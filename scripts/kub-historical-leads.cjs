"use strict";
// Historical leads are NOT current license status, product KÜB or clinical validation.
const fs=require("node:fs"),path=require("node:path");
const {RX,KR}=require("../js/clinical-data.js"),added=require("../js/clinical-additions.js").RX;
const {buildReport}=require("./bulk-audit-engine.cjs");
const {validGTIN13}=require("./review-worklist.cjs");
function validateLeads(document,report){
 const errors=[];
 if(document?.schemaVersion!==1||!Array.isArray(document.leads))return ["Invalid archival lead schema"];
 const known=new Set(report.medicines.map(m=>m.name)),unique=new Set();
 for(const e of document.leads){
  if(!known.has(e.medicineName))errors.push("Unknown generic medicine: "+e.medicineName);
  if(!validGTIN13(String(e.gtin13||"")))errors.push("Invalid historical GTIN: "+e.gtin13);
  if(unique.has(e.gtin13))errors.push("Duplicate historical GTIN: "+e.gtin13);
  unique.add(e.gtin13);
  if(!/^A\d{5}$/.test(e.sgkProductCode||""))errors.push("Missing historical SGK code");
  if(!Number.isInteger(e.sourcePage)||e.sourcePage<1||e.sourcePage>300)errors.push("Invalid archival page");
  if(typeof e.archivalProductName!=="string"||e.archivalProductName.length<8)errors.push("Missing product name");
  try{const u=new URL(e.sourceUrl);
   if(u.protocol!=="https:"||u.hostname!=="www.sgk.gov.tr"||!u.pathname.startsWith("/Download/"))throw Error();
  }catch(err){errors.push("Source must be official archival SGK PDF URL");}
  if(e.evidenceClass!=="HISTORICAL_SGK_REIMBURSEMENT_NOT_KUB" ||
   e.status!=="ARCHIVAL_LEAD_NEEDS_CURRENT_TITCK_CHECK" ||
   e.currentLicenseVerified!==false || e.officialKUBVerified!==false ||
   e.clinicalRegimenApproved!==false || e.visualSourceChecked!==false)
    errors.push("Cannot upgrade historical record to current KÜB or clinical approval");
 }
 return errors;
}
function reportLeads(report,document){
 const errs=validateLeads(document,report);
 if(errs.length)throw Error(errs.join("; "));
 const medMap=new Map(report.medicines.map(m=>[m.name,m]));
 const leads=document.leads.map(e=>({...e,diagnosisCount:medMap.get(e.medicineName).diagnosisCount,
    linkedDiagnoses:medMap.get(e.medicineName).diagnosisIds,
    nextTask:"Find current licensed product and exact TİTCK KÜB; confirm historical product/GTIN visually"}));
 const grouped=[...new Set(leads.map(e=>e.medicineName))];
 return {status:"HISTORICAL_IDENTITY_RESEARCH_NOT_CURRENT_KUB",
  disclaimer:"Old SGK reimbursement listing is not a current license or KÜB record; visual PDF check and 2026 TİTCK verification are outstanding.",
  counts:{archivalLeads:leads.length,genericMedicineNamesWithHistoricalLead:grouped.length,
   genericNamesWithoutHistoricalLead:report.medicines.length-grouped.length,
   coveredDiagnosisMedicinePairs:grouped.reduce((s,n)=>s+medMap.get(n).diagnosisCount,0),
   clinicalApprovals:0,verifiedCurrentProductKUBs:0},leads};
}
function csv(rows,fields){
 const esc=s=>'"'+String(s??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
 return [fields.map(esc).join(","),...rows.map(r=>fields.map(k=>esc(Array.isArray(r[k])?r[k].join("; "):r[k])).join(","))].join("\n")+"\n";
}
function md(q){
 const lines=["# DiagnoRx — SGK tarihsel ürün/barkod araştırma ipuçları","",
 "**KLİNİK VE KÜB DOĞRULAMASI DEĞİLDİR.** Bu eşleşmeler eski SGK listesine dayanır. 2026 ruhsat durumu, ruhsat sahibi, üretici, güncel barkod ve TİTCK KÜB bilgisi teyit edilmedi. PDF'nin görsel kontrolü de beklemede.","",
 "## Ön tarama kapsamı","",
 "- Tarihsel ürün/barkod ipucu: "+q.counts.archivalLeads,
 "- Bağlantılı jenerik ilaç adı: "+q.counts.genericMedicineNamesWithHistoricalLead,
 "- Bu adların geçtiği tanı–ilaç eşleşmesi: "+q.counts.coveredDiagnosisMedicinePairs,
 "- Güncel KÜB doğrulaması: 0","",
 "| Jenerik tanım | Tarihsel SGK ürün adı | Tarihsel GTIN | PDF sayfası |",
 "|---|---|---|---:|",
 ...q.leads.map(x=>"| "+x.medicineName+" | "+x.archivalProductName+" | "+x.gtin13+" | "+x.sourcePage+" |"),
 "","Orijinal SGK belge bağlantısı: "+(q.leads[0]?.sourceUrl||""),
 "","Her aday TİTCK KÜB/KT üzerinde resmî, güncel sürüm ve ürün kimliğiyle ayrıca eşleştirilmelidir. Doğrulanmadan audit/kub-product-candidates.json içine güncel ürün olarak aktarılmaz."
 ];return lines.join("\n")+"\n";
}
function main(){
 const report=buildReport({rx:[...RX,...added],kr:KR});
 const historical=JSON.parse(fs.readFileSync("audit/kub-historical-leads.json","utf8"));
 const output=reportLeads(report,historical);
 if(process.argv.includes("--write")){
  fs.mkdirSync("audit/generated",{recursive:true});
  fs.writeFileSync(path.join("audit/generated","kub-historical-leads.csv"),csv(output.leads,
   ["medicineName","archivalProductName","gtin13","sgkProductCode","sourcePage","sourceUrl","status","diagnosisCount","linkedDiagnoses","nextTask"]));
  fs.writeFileSync(path.join("audit/generated","kub-historical-leads.json"),JSON.stringify(output,null,2)+"\n");
  fs.writeFileSync(path.join("audit/generated","kub-historical-leads.md"),md(output));
 }else if(process.argv.includes("--json"))console.log(JSON.stringify(output,null,2));
 else if(process.argv.length>2)throw Error("Use --write or --json");
 console.log("Historical SGK evidence leads (NOT KÜB): "+JSON.stringify(output.counts));
}
if(require.main===module)main();
module.exports={validateLeads,reportLeads,csv};
