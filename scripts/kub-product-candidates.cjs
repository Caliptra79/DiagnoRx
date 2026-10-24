"use strict";
/* Preclinical source discovery only; NEVER labels a product or treatment safe. */
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js");
const added=require("../js/clinical-additions.js").RX;
const {buildReport,parseStatusMatrix}=require("./bulk-audit-engine.cjs");
const {makeQueue,validGTIN13}=require("./review-worklist.cjs");
const DOC_PORTAL="https://www.titck.gov.tr/kubkt";
const needs=x=>typeof x==="string"&&x.trim().length>=4;
function titckUrl(url){
 try{
  const u=new URL(url);
  return u.protocol==="https:"&&!u.username&&!u.password&&
     (u.hostname==="titck.gov.tr"||u.hostname.endsWith(".titck.gov.tr"));
 }catch(e){return false;}
}
function date(s){
 return typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&
  !Number.isNaN(Date.parse(s+"T00:00:00Z"))&&new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
}
function validateCandidates(data,validNames,today=new Date().toISOString().slice(0,10)){
 const issues=[],seenProducts=new Map();
 if(data?.schemaVersion!==1||!Array.isArray(data.candidates))return ["Invalid candidate schema"];
 for(const c of data.candidates){
  const label=c?.medicineName||"Unknown";
  if(!validNames.has(label))issues.push("No matching generic medicine: "+label);
  for(const k of ["productName","licenseHolder","strengthAndForm"])
   if(!needs(c?.[k]))issues.push(label+": missing product identity "+k);
  const gtin=String(c?.gtin13??"");
  if(!validGTIN13(gtin))issues.push(label+": invalid GTIN-13");
  if(seenProducts.has(gtin))issues.push(label+": same GTIN already assigned to "+seenProducts.get(gtin));
  else seenProducts.set(gtin,label);
  if(!["CANDIDATE_UNVERIFIED","KUB_DOCUMENT_LOCATED"].includes(c?.status))
    issues.push(label+": unsupported evidence status");
  if(c?.clinicalApproval===true||c?.status==="VERIFIED")
    issues.push(label+": cannot assert clinical approval in candidate registry");
  if(c?.status==="KUB_DOCUMENT_LOCATED"){
    if(!titckUrl(c.kubUrl)||c.kubUrl===DOC_PORTAL)
      issues.push(label+": direct official TİTCK KÜB document URL required");
    if(!date(c.kubRevisionDate)||!date(c.checkedOn)||
      c.checkedOn<c.kubRevisionDate||c.checkedOn>today)
      issues.push(label+": KÜB revision and checked dates must be valid and chronological");
    if(!needs(c.checkedBy))issues.push(label+": named human document checker required");
  }else if(c?.kubUrl && !titckUrl(c.kubUrl)){
    issues.push(label+": a candidate URL must not impersonate TİTCK");
  }
 }
 return issues;
}
function queue(report,data,today=new Date().toISOString().slice(0,10)){
 const names=new Set(report.medicines.map(m=>m.name));
 const problems=validateCandidates(data,names,today);
 if(problems.length)throw Error("KÜB candidate record rejected:\n"+problems.join("\n"));
 const byName=new Map();
 for(const item of data.candidates){
  if(!byName.has(item.medicineName))byName.set(item.medicineName,[]);
  byName.get(item.medicineName).push(item);
 }
 const targets=report.medicines.slice().sort((a,b)=>b.diagnosisCount-a.diagnosisCount||
   a.name.localeCompare(b.name,"tr")).map(m=>{
    const rows=byName.get(m.name)||[];
    return {medicineName:m.name,diagnosisCount:m.diagnosisCount,diagnosisIds:m.diagnosisIds,
     candidateCount:rows.length,officialDocumentsLocated:rows.filter(x=>x.status==="KUB_DOCUMENT_LOCATED").length,
     nextAction:rows.length?"VERIFY_DOCUMENT_AND_PRODUCT_IDENTITY":"FIND_LICENSED_PRODUCT_AND_GTIN",
     clinicalStatus:"NOT_CLINICALLY_VERIFIED"};
   });
 const documents=data.candidates.slice().sort((a,b)=>a.medicineName.localeCompare(b.medicineName,"tr"))
 .map(x=>({medicineName:x.medicineName,productName:x.productName,gtin13:String(x.gtin13),
    licenseHolder:x.licenseHolder,strengthAndForm:x.strengthAndForm,status:x.status,
    kubUrl:x.kubUrl||"",kubRevisionDate:x.kubRevisionDate||"",checkedOn:x.checkedOn||"",
    clinicalStatus:"NOT_CLINICALLY_VERIFIED"}));
 return {kind:"KUB_PRODUCT_IDENTITY_REVIEW_NOT_CLINICAL_APPROVAL",portal:DOC_PORTAL,
  counts:{targetNames:targets.length,candidateProducts:documents.length,
   locatedDocuments:documents.filter(x=>x.status==="KUB_DOCUMENT_LOCATED").length,
   unlinkedMedicineNames:targets.filter(x=>!x.candidateCount).length},
  targets,documents};
}
function csv(rows,fields){
 const esc=x=>'"'+String(x??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
 return [fields.map(esc).join(","),...rows.map(r=>fields.map(k=>esc(Array.isArray(r[k])?r[k].join("; "):r[k])).join(","))].join("\n")+"\n";
}
function main(){
 const clinical=buildReport({rx:[...RX,...added],kr:KR,
   reviewStatuses:parseStatusMatrix(fs.readFileSync("audit/clinical-review-matrix.csv","utf8"))});
 const data=JSON.parse(fs.readFileSync("audit/kub-product-candidates.json","utf8"));
 const result=queue(clinical,data);
 if(process.argv.includes("--write")){
  const dir="audit/generated";fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"kub-product-matching-queue.csv"),csv(result.targets,
   ["medicineName","diagnosisCount","diagnosisIds","candidateCount","officialDocumentsLocated","nextAction","clinicalStatus"]));
  fs.writeFileSync(path.join(dir,"kub-product-candidates.csv"),csv(result.documents,
   ["medicineName","productName","gtin13","licenseHolder","strengthAndForm","status","kubUrl","kubRevisionDate","checkedOn","clinicalStatus"]));
  fs.writeFileSync(path.join(dir,"kub-product-matching.json"),JSON.stringify(result,null,2)+"\n");
 }else if(process.argv.includes("--json"))process.stdout.write(JSON.stringify(result,null,2)+"\n");
 else if(process.argv.length>2)throw Error("Use --write or --json");
 console.log("KÜB product matching [NO CLINICAL APPROVAL]: "+JSON.stringify(result.counts));
}
if(require.main===module)main();
module.exports={titckUrl,validateCandidates,queue,csv};
