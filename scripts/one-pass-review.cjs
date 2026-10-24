"use strict";
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js");
const additions=require("../js/clinical-additions.js").RX;
const {assemble}=require("./one-pass-review-engine.cjs");
const packet=assemble({
 rx:[...RX,...additions],kr:KR,
 asOf:new Date().toISOString().slice(0,10),
 matrixText:fs.readFileSync("audit/clinical-review-matrix.csv","utf8"),
 preliminary:JSON.parse(fs.readFileSync("audit/clinical-source-research-2026-10-24.json","utf8")),
 parol:JSON.parse(fs.readFileSync("audit/manufacturer-parol-kub-research.json","utf8")),
 license:JSON.parse(fs.readFileSync("audit/titck-dated-license-evidence.json","utf8")),
 sourceCatalog:JSON.parse(fs.readFileSync("audit/clinical-source-catalog.json","utf8")).sources,
 labelBatch:JSON.parse(fs.readFileSync("audit/clinical-product-research-batch-02.json","utf8")),
 productDocuments:JSON.parse(fs.readFileSync("audit/medicine-document-register.json","utf8")).documents
});
function csv(rows,fields){
 const quote=x=>'"'+String(x??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
 return [fields.map(quote).join(","),...rows.map(r=>fields.map(f=>quote(Array.isArray(r[f])?
 r[f].join("; "):r[f])).join(","))].join("\n")+"\n";
}
function markdown(a){
 const lines=["# DiagnoRx - TEK SEFERDE tum 83 RX + 13 KR arastirma ve klinik inceleme paketi","",
 "**KLINIK ONAY DEGILDIR.** Bu rapor 96 kayit icin arastirma/kontrol islerini organize eder, kaynagi ve hekim onayini taklit etmez.","",
 "## Tum kapsam","",
 "| Gosterge | Adet |","|---|---:|",
 "| Tani | "+a.counts.rx+" |",
 "| Kronik SUT notu | "+a.counts.kr+" |",
 "| Recete-ilac satiri | "+a.counts.medicineLines+" |",
 "| Farkli tam ilac tanimi | "+a.counts.exactMedicineNames+" |",
 "| On kaynak arastirmasi olan tani | "+a.counts.rxWithPreliminaryResearch+" |",
 "| Arastirma bekleyen tani | "+a.counts.rxStillAwaitingGuidelineResearch+" |",
 "| Ayrintili SUT incelemesi bekleyen KR | "+a.counts.krPendingUpdatedSut+" |",
 "| Klinik onayli kayit | "+a.counts.clinicalApprovals+" |","",
 "## Tek seferde yapilacak islemler","",
 "1. all-rx-clinical-review.csv: her taninin 12 ayri klinik kontrol basligini kaynaklarla incele.",
 "2. all-chronic-sut-review.csv: 13 KR icin guncel SUT madde/ekleri ve uzman raporu gerekliliklerini denetle.",
 "3. all-medicine-use-review.csv: 282 satirin her birinde endikasyon, doz, sure, miktar, hasta riskleri ve KUB karsilastirmasi yap.",
 "4. all-product-kub-queue.csv: tekrar eden tam urun adlarinin kaynak aramasini ortaklastir; farkli endikasyonlari otomatik ayni sayma.",
 "5. Klinisyen/eczaci bagimsiz kontrolu ve sahip onayi olmadan klinik olarak dogrulandi ya da yayina hazir deme.","",
 "## Butun RX kayitlari","",
 "| ID | Tani | Algoritmik sira | Kilavuz on arastirmasi | KUB konusu |",
 "|---|---|---|---|---|",
 ...a.rxRows.map(r=>"| "+r.id+" | "+r.name.replace(/\|/g,"/")+" | "+r.algorithmicQueue+
 " | "+r.preliminaryGuidelineState+" | "+(r.affectedByManufacturerComparison?"PAROL urun bilgi karsilastirmasi":"Bekliyor")+" |"),
 "","## Butun KR kayitlari","",
 "| ID | Not | SUT |","|---|---|---|",
 ...a.krRows.map(r=>"| "+r.id+" | "+r.name+" | INDEPENDENT_REVIEW_PENDING |"),
 "","Kaynaklar ve tum ilac satiri ayrintilari JSON/CSV dosyalarinda mevcuttur.","",
 "Not: Teknik tarama bitmesi, herhangi bir ilacin dogru, guvenli veya SGK acisindan uygun oldugu anlamina gelmez.",""];
 return lines.join("\n");
}
if(process.argv.includes("--write")){
 const out="audit/generated";fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,"all-records-review.json"),JSON.stringify(packet,null,2)+"\n");
 fs.writeFileSync(path.join(out,"all-records-review.md"),markdown(packet));
 fs.writeFileSync(path.join(out,"all-rx-clinical-review.csv"),csv(packet.rxRows,
  ["id","name","icd","category","originalSourceDescription","preliminaryGuidelineState",
   "labelResearchMedicineNames",
   "originalMatrixStatus","algorithmicQueue","medicineCount","affectedByManufacturerComparison","clinicalState"]));
 fs.writeFileSync(path.join(out,"all-chronic-sut-review.csv"),csv(packet.krRows,
  ["id","name","icd","originalSourceDescription","originalSutText","originalMatrixStatus",
   "latestSutChecked","clinicalState"]));
 fs.writeFileSync(path.join(out,"all-medicine-use-review.csv"),csv(packet.medicineRows,
  ["diagnosisId","medicineIndex","medicineName","group","condition","dose","duration",
   "quantity","originalNote","patientSafetyTags","manufacturerComparison","archivalLabelResearch","documentState","clinicalState"]));
 fs.writeFileSync(path.join(out,"all-product-kub-queue.csv"),csv(packet.products,
  ["medicineName","usageCount","diagnosisCount","manufacturerComparison","archivalLabelResearch","currentDirectKubStatus","clinicalState"]));
}else if(process.argv.includes("--json"))process.stdout.write(JSON.stringify(packet,null,2)+"\n");
else if(process.argv.length>2)throw Error("Usage: --write or --json");
console.log("ONE-PASS ALL-RECORDS EVIDENCE PACK [UNVERIFIED]: "+JSON.stringify(packet.counts));
if(packet.counts.clinicalApprovals!==0)throw Error("No automatic medical approval");
