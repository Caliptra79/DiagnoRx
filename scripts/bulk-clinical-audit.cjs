"use strict";
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js");
const added=require("../js/clinical-additions.js").RX;
const {buildReport,parseStatusMatrix}=require("./bulk-audit-engine.cjs");
const statuses=parseStatusMatrix(fs.readFileSync("audit/clinical-review-matrix.csv","utf8"));
const research=JSON.parse(fs.readFileSync("audit/clinical-source-research-2026-10-24.json","utf8"));
const sources=JSON.parse(fs.readFileSync("audit/clinical-source-catalog.json","utf8")).sources;
const report=buildReport({rx:[...RX,...added],kr:KR,reviewStatuses:statuses,research,approvedSources:sources});
function md(r){
 const lines=[
 "# DiagnoRx — Toplu Klinik Ön Denetim Raporu","",
 "> **KLİNİK OLARAK DOĞRULANMADI.** Bu rapor yalnızca veri taraması, yinelenen ürün ve kaynak envanteridir. Uyarı bulunmaması güvenli kullanım anlamına gelmez.","",
 "## Özet","",
 "| Gösterge | Sayı |","|---|---:|",
 "| Tanı | "+r.counts.diagnoses+" |",
 "| Kronik not | "+r.counts.chronicNotes+" |",
 "| İlaç satırı | "+r.counts.medicineLines+" |",
 "| Farklı tam ilaç adı | "+r.counts.distinctMedicineNames+" |",
 "| Birden fazla tanıda kullanılan ilaç adı | "+r.counts.repeatMedicineNames+" |",
 "| Öncelikli insan incelemesi için işaretlenen tanı | "+r.counts.diagnosesForPriorityReview+" |",
 "| Kaynak ön incelemesi yapılan tanı | "+r.counts.researchedDiagnoses+" |",
 "| Klinik inceleme kaydı doğrulanmış kaynak | "+r.counts.approvedClinicalSources+" |","",
 "## Kategoriler","",
 ...r.categoryCounts.map(x=>"- "+x.category+": "+x.count+" tanı"),"",
 "## Otomatik işaretler (hepsi inceleme önerisidir)","",
 ...Object.entries(r.findingsByCode).sort((a,b)=>b[1]-a[1]).map(([k,v])=>"- "+k+": "+v),"",
 "## Tekrarlanan ilaçlar (tam adla eşleştirme)","",
 "| İlaç | Tanı sayısı | Farklı doz/süre yazımı |","|---|---:|---:|",
 ...r.medicines.filter(m=>m.diagnosisCount>1).map(m=>"| "+m.name.replace(/\|/g,"/")+" | "+m.diagnosisCount+" | "+m.regimenVariants.length+" |"),"",
 "## Tanı inceleme sırası","",
 "| Tanı ID | Tanı | Kategori | Ön tarama sırası | Mevcut kaynak denetimi | Bulgu |",
 "|---|---|---|---|---|---:|",
 ...r.diagnoses.slice().sort((a,b)=>(a.reviewQueue===b.reviewQueue?0:a.reviewQueue==="REVIEW_FIRST"?-1:1)
    ||a.category.localeCompare(b.category,"tr")||a.id.localeCompare(b.id)).map(d=>"| "+[d.id,d.name.replace(/\|/g,"/"),d.category,
    d.reviewQueue,d.reviewStatus,String(d.findings.length)].join(" | ")+" |"),"",
 "## Yorumlama sınırları","",
 "- İnceleme sırası algoritmik bir triyajdır; klinik aciliyet veya 'düşük riskli/güvenli' hükmü değildir.",
 "- Farklı doz/süre yazımları farklı endikasyonlarda doğru olabilir; otomatik hata değildir.",
 "- İlaç adı eşleştirmesi tam yazıma dayanır; eşdeğer moleküller veya müstahzarlar birleştirilmeyebilir.",
 "- Etkileşim taraması yalnızca tanımlı kombinasyonları kapsar; alternatif/koşullu satırlar birlikte kullanılmayabilir.",
 "- SUT, KÜB ve rehber güncelliği internetten otomatik doğrulanmaz. Tüm reçeteler insan klinik incelemesi bekler.",
 "- Ayrıntılı ilaç/süre, uyarı ve tanı ilişkileri eşlik eden JSON raporundadır.",""
 ];return lines.join("\n");
}
const json=JSON.stringify(report,null,2)+"\n",markdown=md(report);
const mode=process.argv[2]||"--summary";
if(mode==="--write"){
 const dir=path.join("audit","generated");fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,"bulk-clinical-audit.json"),json);
 fs.writeFileSync(path.join(dir,"bulk-clinical-audit.md"),markdown);
}
else if(mode==="--json")process.stdout.write(json);
else if(mode!=="--summary")throw Error("Usage: --write|--json|--summary");
console.log("Bulk audit [NOT CLINICALLY VERIFIED]: "+JSON.stringify(report.counts));
if(report.duplicateDiagnosisIds.length)throw Error("Duplicate diagnosis IDs: "+report.duplicateDiagnosisIds.join(","));
