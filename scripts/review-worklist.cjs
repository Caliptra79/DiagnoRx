"use strict";
// Document discovery triage only; no medicine or regimen is certified by this script.
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js");
const additions=require("../js/clinical-additions.js").RX;
const {buildReport,parseStatusMatrix}=require("./bulk-audit-engine.cjs");
function isDate(s){
 return typeof s==="string" && /^\d{4}-\d{2}-\d{2}$/.test(s) &&
 !Number.isNaN(Date.parse(s+"T00:00:00Z")) &&
 new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
}
function validGTIN13(code){
 if(!/^\\d{13}$/.test(code))return false;
 const digits=code.split("").map(Number);
 const sum=digits.slice(0,12).reduce((s,n,i)=>s+n*(i%2===0?1:3),0);
 return (10-sum%10)%10===digits[12];
}
function validateRegister(reg,names){
 const errors=[],seen=new Set();
 if(reg?.schemaVersion!==1||!Array.isArray(reg.documents))return ["Invalid document registry"];
 for(const item of reg.documents){
  const name=item?.medicineName;
  if(!names.has(name))errors.push("Unknown exact medicine name: "+name);
  if(seen.has(name))errors.push("Duplicate document record: "+name);
  seen.add(name);
  if(!["DOCUMENT_FOUND","NEEDS_CLINICAL_REVIEW"].includes(item.status))errors.push("Invalid document status: "+name);
  for(const k of ["productName","strengthAndForm","reviewer","licenseHolder"])
   if(typeof item[k]!=="string"||item[k].trim().length<4)errors.push("Missing "+k+": "+name);
  // Without a specific licensed presentation, a generic medicine name is
  // insufficient to associate a KÜB with a prescription safely.
  if(!/^\d{13}$/.test(String(item.gtin||""))||!validGTIN13(String(item.gtin||"")))
   errors.push("Valid exact product GTIN-13 required: "+name);
  if(item.documentKind!=="TITCK_KUB")errors.push("KÜB provenance field required: "+name);
  if(!isDate(item.kubRevisionDate)||!isDate(item.checkedOn))errors.push("Missing dated KUB: "+name);
  try{
   const u=new URL(item.kubUrl);
   if(u.protocol!=="https:"||u.username||u.password)throw Error();
  }catch(e){errors.push("KUB must link an exact HTTPS document: "+name);}
 }
 return errors;
}
function makeQueue(report,register){
 const known=new Set(report.medicines.map(m=>m.name));
 const problems=validateRegister(register,known);
 if(problems.length)throw Error("Invalid KUB register: "+problems.join("; "));
 const documented=new Map(register.documents.filter(x=>x.status==="DOCUMENT_FOUND").map(x=>[x.medicineName,x]));
 const products=report.medicines.map(m=>{
  const priorityCount=report.diagnoses.filter(d=>m.diagnosisIds.includes(d.id)&&d.reviewQueue==="REVIEW_FIRST").length;
  const score=(m.categories.length?30:0)+(m.diagnosisCount>1?10:0)+3*m.diagnosisCount+priorityCount;
  const doc=documented.get(m.name);
  return {medicineName:m.name,linkedDiagnoses:m.diagnosisIds,diagnosisCount:m.diagnosisCount,
    classifications:m.categories,regimenVariants:m.regimenVariants,patientFlags:m.patientFlags,
    priorityScore:score,documentStatus:doc?"DOCUMENT_RECORDED_NOT_CLINICALLY_VERIFIED":"KUB_DOCUMENT_PENDING",
    kubUrl:doc?.kubUrl||"",clinicalApproval:"PENDING"};
 }).sort((a,b)=>b.priorityScore-a.priorityScore||a.medicineName.localeCompare(b.medicineName,"tr"));
 const regimens=report.medicines.flatMap(m=>m.uses.map(u=>({
   diagnosisId:u.diagnosisId,medicineIndex:u.index,medicineName:m.name,
   group:u.group,dose:u.dose,duration:u.duration,quantity:u.quantity,
   documentStatus:documented.has(m.name)?"DOCUMENT_RECORDED":"DOCUMENT_PENDING",
   clinicalApproval:"INDICATION_SPECIFIC_REVIEW_PENDING"
 }))).sort((a,b)=>a.diagnosisId.localeCompare(b.diagnosisId)||a.medicineIndex-b.medicineIndex);
 const diagnoses=report.diagnoses.map(d=>({
   id:d.id,name:d.name,category:d.category,priority:d.reviewQueue,
   sourceResearch:d.reviewStatus,clinicalApproval:"PENDING",
   medicineCount:d.medicineCount,findingsCount:d.findings.length
 })).sort((a,b)=>(a.priority===b.priority?0:a.priority==="REVIEW_FIRST"?-1:1)||b.findingsCount-a.findingsCount||a.id.localeCompare(b.id));
 return {kind:"ENGINEERING_DOCUMENT_LOOKUP_QUEUE_NOT_CLINICAL_APPROVAL",
   counts:{diagnoses:diagnoses.length,medicineOccurrences:regimens.length,
    uniqueExactMedicineNames:products.length,repeatedMedicineNames:products.filter(m=>m.diagnosisCount>1).length,
    documentedProducts:documented.size,missingProductKUB:products.length-documented.size,
    regimenReviewsPending:regimens.length},
   products,regimens,diagnoses};
}
function csv(rows,fields){
 const quote=x=>'"'+String(x??"").replace(/"/g,'""').replace(/\r?\n/g," ")+'"';
 return [fields.map(quote).join(","),...rows.map(r=>fields.map(k=>quote(Array.isArray(r[k])?r[k].join("; "):r[k])).join(","))].join("\n")+"\n";
}
function markdown(q){
 const lines=["# DiagnoRx — Ortak KÜB belgesi ve endikasyon inceleme listesi","",
 "**TÜM VERİLER KLİNİK ONAY BEKLİYOR.** Aynı tam ilaç adının belge incelemesi ortaklaştırılır, her kullanımın endikasyon/doz/süre değerlendirmesi ayrı kalır.","",
 "## İş yükü","",
 "- Tanı: "+q.counts.diagnoses,
 "- İlaç satırı: "+q.counts.medicineOccurrences,
 "- Farklı tam ilaç adı: "+q.counts.uniqueExactMedicineNames,
 "- Birden fazla tanıda tekrarlanan tam ilaç adı: "+q.counts.repeatedMedicineNames,
 "- Belge araması bekleyen ürün tanımı: "+q.counts.missingProductKUB,
 "- Ayrı endikasyon/doz incelemesi bekleyen satır: "+q.counts.regimenReviewsPending,"",
 "## İlk 25 ortak KÜB arama işi (algoritmik iş sırası)","",
 "| Tam ilaç tanımı | Tanı sayısı | Öncelik skoru | Belge durumu |",
 "|---|---:|---:|---|",
 ...q.products.slice(0,25).map(p=>"| "+p.medicineName.replace(/\|/g,"/")+" | "+p.diagnosisCount+" | "+p.priorityScore+" | "+p.documentStatus+" |"),
 "","## Nasıl kullanılmalı?","",
 "1. medicine-document-queue.csv dosyasından ortak ürün belgelerini bulup resmi KÜB URL/sürüm ve gerçek ürün/barkod eşleşmesini inceleyin.",
 "2. Her klinik kullanım ayrı tutulduğundan regimen-review.csv içindeki endikasyon, doz, süre ve kontrendikasyonları uzmanla inceleyin.",
 "3. diagnosis-review-queue.csv içindeki tanılar için sevk, kılavuz ve SGK/SUT kontrollerini tamamlayın.",
 "4. Belge varlığı klinik doğruluk veya SUT uygunluğu demek değildir; bağımsız klinik gözden geçirme şarttır.","",
 "İş sırası klinik risk değerlendirmesi değil, otomatik inceleme organizasyonudur."];
 return lines.join("\n")+"\n";
}
function main(){
 const statuses=parseStatusMatrix(fs.readFileSync("audit/clinical-review-matrix.csv","utf8"));
 const report=buildReport({rx:[...RX,...additions],kr:KR,reviewStatuses:statuses});
 const register=JSON.parse(fs.readFileSync("audit/medicine-document-register.json","utf8"));
 const q=makeQueue(report,register);
 if(process.argv.includes("--write")){
  const dir="audit/generated";fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"medicine-document-queue.csv"),csv(q.products,["medicineName","diagnosisCount","linkedDiagnoses","classifications","regimenVariants","priorityScore","documentStatus","kubUrl"]));
  fs.writeFileSync(path.join(dir,"regimen-review.csv"),csv(q.regimens,["diagnosisId","medicineIndex","medicineName","group","dose","duration","quantity","documentStatus","clinicalApproval"]));
  fs.writeFileSync(path.join(dir,"diagnosis-review-queue.csv"),csv(q.diagnoses,["id","name","category","priority","sourceResearch","medicineCount","findingsCount","clinicalApproval"]));
  fs.writeFileSync(path.join(dir,"review-worklist.md"),markdown(q));
  fs.writeFileSync(path.join(dir,"review-worklist.json"),JSON.stringify(q,null,2)+"\n");
 }else if(process.argv.includes("--json"))process.stdout.write(JSON.stringify(q,null,2)+"\n");
 else if(process.argv.length>2)throw Error("Usage: --write or --json");
 console.log("Source reuse worklist [NOT CLINICALLY VERIFIED]: "+JSON.stringify(q.counts));
}
if(require.main===module)main();
module.exports={makeQueue,validateRegister,validGTIN13,csv,markdown};
