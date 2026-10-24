"use strict";
const fs=require("node:fs");
const DRUG_STATUS="LEGACY_PRODUCT_INFORMATION_RESEARCH_ONLY";
const checked=x=>typeof x==="string"&&x.trim().length>=5;
function buildBatch(rx,batch){
 const errors=[];
 if(batch?.schemaVersion!==1||batch?.status!=="ARCHIVAL_LABEL_RESEARCH_NOT_CURRENT_TITCK_OR_CLINICAL_APPROVAL"||
  !Array.isArray(batch.sources)||!Array.isArray(batch.findings))throw Error("Bad clinical research schema");
 const sources=new Map();
 for(const s of batch.sources){
  if(sources.has(s.id))errors.push("Duplicate source "+s.id);sources.set(s.id,s);
  if(!checked(s.medicineName)||!checked(s.url)||!s.url.startsWith("https://")||
   s.sourceType!=="THIRD_PARTY_LEGACY_KUB_COPY"||s.currentTitckVerified!==false||
   s.medicalApproval!==false)errors.push("Source improperly represented as approved: "+s.id);
 }
 const byMedicine=new Map();
 for(const s of batch.sources)byMedicine.set(s.medicineName,s);
 const identifiers=new Set();
 for(const f of batch.findings){
  if(identifiers.has(f.id))errors.push("Duplicate finding "+f.id);identifiers.add(f.id);
  if(!sources.has(f.sourceId)||!["HIGH","MEDIUM","LOW"].includes(f.priority)||
   !(typeof f.labelSection==="string"&&f.labelSection.trim().length>0)||!checked(f.finding)||!checked(f.requiredReview))
   errors.push("Incomplete medical evidence research finding: "+f.id);
  if(f.diagnosisId&&!rx.some(d=>d.id===f.diagnosisId&&d.ilac.some(m=>m.n===sources.get(f.sourceId)?.medicineName)))
   errors.push("Diagnosis-specific finding cannot be linked: "+f.id);
 }
 if(errors.length)throw Error(errors.join("; "));
 const occurrences=rx.flatMap(d=>(d.ilac||[]).flatMap((med,index)=>{
  const source=byMedicine.get(med.n);
  if(!source)return [];
  const match=batch.findings.filter(f=>f.sourceId===source.id&&(!f.diagnosisId||f.diagnosisId===d.id));
  return [{diagnosisId:d.id,diagnosis:d.ad,medicineIndex:index,medicineName:med.n,
   group:med.g||"",condition:med.c||"",dose:med.d||"",duration:med.s||"",quantity:med.k||"",
   sourceId:source.id,sourceUrl:source.url,sourceStatus:DRUG_STATUS,
   reviewTopics:match.map(f=>f.id),clinicalStatus:"INDEPENDENT_CLINICAL_REVIEW_PENDING"}];
 }));
 const countByMedicine=Object.fromEntries(batch.sources.map(s=>[s.medicineName,
  occurrences.filter(o=>o.medicineName===s.medicineName).length]));
 return {schemaVersion:1,status:"THREE_PRODUCT_SOURCE_COMPARISONS_NOT_CLINICALLY_VERIFIED",
  checkedOn:batch.asOf,
  counts:{sourceRecords:batch.sources.length,clinicalQuestions:batch.findings.length,
   medicineUseComparisons:occurrences.length,distinctAffectedDiagnoses:new Set(occurrences.map(o=>o.diagnosisId)).size,
   clinicallyApprovedUses:0,currentTitckVerifiedKubs:0,
   byMedicine:countByMedicine},
  sources:batch.sources,findings:batch.findings,occurrences};
}
function csv(rows){
 const fields=["diagnosisId","diagnosis","medicineIndex","medicineName","group","condition",
  "dose","duration","quantity","sourceId","sourceUrl","reviewTopics","clinicalStatus"];
 const val=x=>'"'+String(x??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
 return [fields.map(val).join(","),...rows.map(row=>fields.map(k=>val(Array.isArray(row[k])?
  row[k].join("; "):row[k])).join(","))].join("\n")+"\n";
}
function markdown(result){
 return ["# DiagnoRx — Üç ürün bilgisi kaynak karşılaştırması","",
 "> Eski ürün KÜB kopyaları üzerinden ön incelemedir. Güncel resmî TİTCK KÜB/doz/SGK onayı **değildir**.","",
 "## Kapsam","",
 "- Ürün bilgi kaynağı: "+result.counts.sourceRecords,
 "- İnceleme konusu: "+result.counts.clinicalQuestions,
 "- Tanı-ilaç kullanım eşleşmesi: "+result.counts.medicineUseComparisons,
 "- Etkilenen farklı tanı: "+result.counts.distinctAffectedDiagnoses,
 "- Onaylı klinik kullanım: 0","",
 "## Öncelikli bulgular","",
 ...result.findings.map(f=>"### "+f.id+" ("+f.priority+")\n"+f.finding+
  "\n\nKontrol: "+f.requiredReview+"\n"),
 "## Kaynaklar","",
 ...result.sources.map(s=>"- "+s.medicineName+": "+s.url+" ("+s.version+")"),
 "","İlgili bütün tanılar/ilaç satırları eşlik eden CSV ve JSON çıktısında bulunur.",""].join("\n");
}
function main(){
 const {RX}=require("../js/clinical-data.js");
 const added=require("../js/clinical-additions.js").RX;
 const data=JSON.parse(fs.readFileSync("audit/clinical-product-research-batch-02.json","utf8"));
 const report=buildBatch([...RX,...added],data);
 if(process.argv.includes("--write")){
  fs.mkdirSync("audit/generated",{recursive:true});
  fs.writeFileSync("audit/generated/product-research-batch-02.json",JSON.stringify(report,null,2)+"\n");
  fs.writeFileSync("audit/generated/product-research-batch-02.csv",csv(report.occurrences));
  fs.writeFileSync("audit/generated/product-research-batch-02.md",markdown(report));
 }else if(process.argv.includes("--json"))console.log(JSON.stringify(report,null,2));
 else if(process.argv.length>2)throw Error("Usage: --write or --json");
 console.log("SOURCE COMPARISON ONLY [NO CLINICAL APPROVAL]: "+JSON.stringify(report.counts));
}
if(require.main===module)main();
module.exports={buildBatch,csv,markdown,DRUG_STATUS};
