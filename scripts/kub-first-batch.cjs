"use strict";
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js");
const additions=require("../js/clinical-additions.js").RX;
const {buildReport,parseStatusMatrix}=require("./bulk-audit-engine.cjs");
const {makeQueue}=require("./review-worklist.cjs");
const PORTAL="https://www.titck.gov.tr/kubkt";
function firstBatch(report,reviewQueue,limit=8){
 if(!Number.isInteger(limit)||limit<1)throw Error("Positive batch size required");
 const lookup=new Map(reviewQueue.products.map(p=>[p.medicineName,p]));
 const selected=report.medicines.slice().sort((a,b)=>b.diagnosisCount-a.diagnosisCount||
   a.name.localeCompare(b.name,"tr")).slice(0,limit);
 const products=selected.map(m=>{
   const linked=lookup.get(m.name);
   if(!linked)throw Error("Worklist missing medicine "+m.name);
   return {
     genericDescription:m.name,diagnoses:m.diagnosisIds,diagnosisCount:m.diagnosisCount,
     variants:m.regimenVariants,productDocumentState:linked.documentStatus,
     exactLicensedProduct:"",gtin13:"",licenseHolder:"",
     officialKubDocument:"",kubApprovalDate:"",
     portal:PORTAL,
     nextTask:"TİTCK KÜB/KT listesinde ruhsatlı müstahzar ve barkodu eşleştir; " +
              "tam KÜB URL ve onay tarihini belgele; klinik doz/endikasyon ayrıca değerlendirilecek.",
     clinicalState:"NOT_CLINICALLY_VERIFIED"
   };
 });
 return {status:"OFFICIAL_KUB_DOCUMENT_LOOKUP_PENDING",method:"Exact description grouping, not generic interchangeability",
    sourcePortal:PORTAL,
    counts:{targets:products.length,diagnosisOccurrences:products.reduce((sum,p)=>sum+p.diagnosisCount,0),
      foundProductDocuments:products.filter(p=>p.productDocumentState==="DOCUMENT_RECORDED_NOT_CLINICALLY_VERIFIED").length},
    products};
}
function csv(rows,columns){
 const esc=x=>'"'+String(x??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
 return [columns.map(esc).join(","),...rows.map(x=>columns.map(k=>esc(Array.isArray(x[k])?x[k].join("; "):x[k])).join(","))].join("\n")+"\n";
}
function markdown(batch){
 const rows=[
 "# DiagnoRx — İlk KÜB belge eşleştirme grubu","",
 "> **Ürün/ruhsat veya klinik doğrulama henüz yapılmadı.** İlk hedef, jenerik reçete açıklamalarını tekil ruhsatlı ilaç ve güncel TİTCK KÜB belgesiyle doğru eşleştirmek.","",
 "Resmî TİTCK KÜB/KT arama başlangıcı: "+PORTAL,"",
 "## İlk "+batch.counts.targets+" ürün tanımı","",
 "| Reçetedeki ilaç tanımı | Tanı sayısı | KÜB eşleştirme |","|---|---:|---|",
 ...batch.products.map(p=>"| "+p.genericDescription.replace(/\|/g,"/")+" | "+p.diagnosisCount+" | "+p.productDocumentState+" |"),
 "","İlk listedeki "+batch.counts.targets+" jenerik tanım, toplam "+batch.counts.diagnosisOccurrences+" tanı-ilac eşleşmesine uzanıyor.",
 "Bu rakamlar klinik onay veya benzersiz ruhsatlı ürün sayısı değildir.","",
 "## Gerekli manuel inceleme","",
 "1. Türkiye'de ruhsatlı spesifik ürün/marka ve farmasötik formu belirle.",
 "2. Gerçek 13 haneli ürün barkodu (GTIN), ruhsat sahibi, tam TİTCK KÜB belge URL'si ve revizyon tarihini kaydet.",
 "3. Belgeyi ikinci bir kişiyle içerik ve sürüm açısından kontrol et.",
 "4. Klinik uygulama için tüm tanı/ilaç satırlarını ayrı gözden geçir (doz, süre, endikasyon, gebelik/emzirme, renal/hepatik, etkileşim, SUT).",
 "5. Bu teknik raporun boş alanlarını otomatik olarak 'onaylandı' diye doldurma.","",
 "TİTCK KÜB/KT portalındaki liste tarayıcı tarafında yüklendiğinden bu ön taramada jenerik açıklamalar için doğrudan doğrulanmış ruhsatlı ürün bağlantısı alınmadı.",""
 ];
 return rows.join("\n");
}
function run(){
 const matrix=parseStatusMatrix(fs.readFileSync("audit/clinical-review-matrix.csv","utf8"));
 const report=buildReport({rx:[...RX,...additions],kr:KR,reviewStatuses:matrix});
 const registry=JSON.parse(fs.readFileSync("audit/medicine-document-register.json","utf8"));
 const q=makeQueue(report,registry);
 const batch=firstBatch(report,q);
 if(process.argv.includes("--write")){
   const dir="audit/generated";fs.mkdirSync(dir,{recursive:true});
   fs.writeFileSync(path.join(dir,"kub-first-batch.json"),JSON.stringify(batch,null,2)+"\n");
   fs.writeFileSync(path.join(dir,"kub-first-batch.md"),markdown(batch));
   fs.writeFileSync(path.join(dir,"kub-first-batch.csv"),csv(batch.products,
     ["genericDescription","diagnosisCount","diagnoses","variants","productDocumentState",
      "exactLicensedProduct","gtin13","licenseHolder","officialKubDocument","kubApprovalDate","clinicalState"]));
 }else if(process.argv.includes("--json"))process.stdout.write(JSON.stringify(batch,null,2)+"\n");
 else if(process.argv.length>2)throw Error("Usage: --write or --json");
 console.log("First KÜB matching batch [NOT VERIFIED]: "+JSON.stringify(batch.counts));
}
if(require.main===module)run();
module.exports={firstBatch,csv,markdown,PORTAL};
