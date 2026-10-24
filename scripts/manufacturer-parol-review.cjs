"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const {RX,KR}=require("../js/clinical-data.js");
const added=require("../js/clinical-additions.js").RX;
const INFO_PATH="audit/manufacturer-parol-kub-research.json";
const DRUG="Parasetamol 500 mg tablet";
function audit(rx,source){
 const applicable=rx.filter(r=>Array.isArray(r.ilac)&&r.ilac.some(m=>m.n===DRUG));
 const affected=applicable.map(r=>{
  const uses=r.ilac.flatMap((m,i)=>m.n===DRUG?[{
    medicineIndex:i,regimen:m.d,duration:m.s,advice:m.t||"",
    checkIds:source.findings.map(f=>f.id),reviewStatus:"INDEPENDENT_CLINICIAN_REVIEW_PENDING"
  }]:[]);
  return {diagnosisId:r.id,name:r.ad,uses};
 });
 return {
  status:"RESEARCH_COMPARISON_NOT_CLINICAL_VERIFICATION",
  sourceDocIds:source.sources.map(s=>s.id),
  counts:{baselineDiagnoses:RX.length,chronicNotes:KR.length,
   affectedDiagnoses:affected.length,
   affectedMedicineLines:affected.reduce((n,r)=>n+r.uses.length,0),
   findings:source.findings.length,clinicallyApprovedDiagnoses:0,
   currentTitckApprovedKubDocuments:0},
  findings:source.findings,affected
 };
}
function csv(rows){
 const quote=x=>'"'+String(x??"").replace(/"/g,'""').replace(/\r?\n/g," ")+'"';
 const columns=["diagnosisId","name","medicineIndex","regimen","duration","advice","findings","reviewStatus"];
 const data=rows.flatMap(r=>r.uses.map(m=>({
  diagnosisId:r.diagnosisId,name:r.name,...m,findings:m.checkIds.join("; ")
 })));
 return [columns.map(quote).join(","),...data.map(r=>columns.map(k=>quote(r[k])).join(","))].join("\n")+"\n";
}
function main(){
 const src=JSON.parse(fs.readFileSync(INFO_PATH,"utf8"));
 assert.equal(src.status,"MANUFACTURER_DOCUMENT_COMPARISON_ONLY_NO_CLINICAL_APPROVAL");
 assert(src.sources.every(s=>s.currentTitckVersionConfirmed===false));
 assert(src.disposition.currentOfficialTITCKKubVerified===false);
 const result=audit([...RX,...added],src);
 if(process.argv.includes("--write")){
  fs.mkdirSync("audit/generated",{recursive:true});
  fs.writeFileSync(path.join("audit/generated","parol-label-comparison.json"),
   JSON.stringify(result,null,2)+"\n");
  fs.writeFileSync(path.join("audit/generated","parol-label-comparison.csv"),csv(result.affected));
 }else if(process.argv.includes("--json"))console.log(JSON.stringify(result,null,2));
 else if(process.argv.length>2)throw Error("Usage: --write|--json");
 console.log("Manufacturer PAROL document comparison [UNVERIFIED]: "+JSON.stringify(result.counts));
}
if(require.main===module)main();
module.exports={audit,csv,DRUG};
