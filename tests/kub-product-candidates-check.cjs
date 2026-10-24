"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const {RX,KR}=require("../js/clinical-data.js");
const {buildReport}=require("../scripts/bulk-audit-engine.cjs");
const {queue,validateCandidates,titckUrl}=require("../scripts/kub-product-candidates.cjs");
const report=buildReport({rx:RX,kr:KR});
const known=new Set(report.medicines.map(x=>x.name));
const input=JSON.parse(fs.readFileSync("audit/kub-product-candidates.json","utf8"));
const base=queue(report,input,"2026-10-24");
assert.equal(base.counts.targetNames,report.medicines.length);
assert.equal(base.counts.candidateProducts,0);
assert.equal(base.counts.locatedDocuments,0);
assert(base.targets.every(x=>x.clinicalStatus==="NOT_CLINICALLY_VERIFIED"));
const item={medicineName:report.medicines[0].name,productName:"SYNTHETIC TEST ONLY",
 licenseHolder:"Synthetic holder",strengthAndForm:"Synthetic 100 mg tablet",
 gtin13:"4006381333931",status:"CANDIDATE_UNVERIFIED"};
const config=items=>({schemaVersion:1,candidates:items});
assert.equal(validateCandidates(config([item]),known,"2026-10-24").length,0);
assert(!titckUrl("https://titck.gov.tr.attacker.example/kub.pdf"));
assert(!titckUrl("https://example.org/kub.pdf"));
assert(titckUrl("https://www.titck.gov.tr/storage/kub/test.pdf"));
assert(validateCandidates(config([{...item,gtin13:"4006381333932"}]),known,"2026-10-24").length>0);
assert(validateCandidates(config([item,item]),known,"2026-10-24").length>0);
const withDoc={...item,status:"KUB_DOCUMENT_LOCATED",
 kubUrl:"https://www.titck.gov.tr/storage/kub/synthetic-test.pdf",
 kubRevisionDate:"2026-01-01",checkedOn:"2026-10-24",checkedBy:"Synthetic tester"};
assert.equal(validateCandidates(config([withDoc]),known,"2026-10-24").length,0);
assert(validateCandidates(config([{...withDoc,kubUrl:"https://example.org/kub.pdf"}]),known,"2026-10-24").length>0);
assert(validateCandidates(config([{...withDoc,checkedOn:"2025-01-01"}]),known,"2026-10-24").length>0);
assert(validateCandidates(config([{...withDoc,clinicalApproval:true}]),known,"2026-10-24").length>0);
const populated=queue(report,config([withDoc]),"2026-10-24");
assert.equal(populated.counts.locatedDocuments,1);
assert.equal(populated.targets.find(x=>x.medicineName===item.medicineName).clinicalStatus,"NOT_CLINICALLY_VERIFIED");
const extended=buildReport({rx:[...RX,{
  id:"test-new-diagnosis",kat:"Test",ad:"Test",icd:"Z00",uygun:"n/a",
  kaynak:"Test",sevk:["n/a"],oneri:["n/a"],
  ilac:[{g:"ana",n:"New test medicine 50 mg",d:"1x1",s:"1 gün",k:"1 tb"}]}],kr:KR});
assert.equal(queue(extended,config([]),"2026-10-24").counts.targetNames,base.counts.targetNames+1);
console.log("PASS: candidate evidence stays unapproved; fake hosts, GTIN errors and future dates rejected");
