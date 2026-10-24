"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const doc=JSON.parse(fs.readFileSync("audit/titck-dated-license-evidence.json","utf8"));
const history=JSON.parse(fs.readFileSync("audit/kub-historical-leads.json","utf8"));
assert.equal(doc.schemaVersion,1);
assert.equal(doc.sourceDate,"2026-08-07");
assert.equal(doc.checkedOn,"2026-10-24");
assert.equal(doc.records.length,history.leads.length);
assert.equal(new Set(doc.records.map(x=>x.gtin13)).size,history.leads.length);
assert.equal(doc.records.filter(x=>x.excelRow!=null).length,7);
assert.equal(doc.records.filter(x=>x.excelRow==null).length,1);
const leadLookup=new Map(history.leads.map(x=>[x.gtin13,x]));
for(const r of doc.records){
 assert(leadLookup.has(r.gtin13),"Every dated row must originate from historical tracking");
 assert.equal(r.medicineName,leadLookup.get(r.gtin13).medicineName);
 assert.equal(r.sourceListDate,doc.sourceDate);
 assert.equal(r.sourceUrl,doc.sourceUrl);
 assert.equal(r.currentLicenseVerified,false);
 assert.equal(r.productKUBVerified,false);
 assert.equal(r.clinicallyApproved,false);
 assert.equal(r.humanSourceReviewed,false);
 if(r.excelRow==null){
   assert.equal(r.snapshotStatus,"GTIN_NOT_FOUND_IN_DATED_LIST_INCONCLUSIVE");
   assert.equal(r.listProductName,null);
 }else{
   assert.equal(r.snapshotStatus,"GTIN_PRESENT_IN_DATED_LIST_REVIEW_PENDING");
   assert(r.listProductName&&r.listedIngredient&&r.listedFirm);
   assert.equal(r.sheetXml,"xl/worksheets/sheet1.xml");
 }
}
assert.equal(doc.records.find(x=>x.gtin13==="8699548121753").excelRow,null);
assert(doc.records.filter(x=>x.listProductName?.includes("AUGMENTIN")).every(x=>x.listProductName.includes("875 MG/125 MG")));
console.log("PASS: date-bounded official license snapshot comparisons; no false KÜB or clinical approvals");
