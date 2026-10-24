"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const {buildReport,parseStatusMatrix}=require("../scripts/bulk-audit-engine.cjs");
const {makeQueue,validateRegister,csv}=require("../scripts/review-worklist.cjs");
const {RX,KR}=require("../js/clinical-data.js");
const additions=require("../js/clinical-additions.js").RX;
const status=parseStatusMatrix(fs.readFileSync("audit/clinical-review-matrix.csv","utf8"));
const report=buildReport({rx:[...RX,...additions],kr:KR,reviewStatuses:status});
const register=JSON.parse(fs.readFileSync("audit/medicine-document-register.json","utf8"));
const q=makeQueue(report,register);
assert.equal(q.kind,"ENGINEERING_DOCUMENT_LOOKUP_QUEUE_NOT_CLINICAL_APPROVAL");
assert.equal(q.counts.medicineOccurrences,report.counts.medicineLines);
assert.equal(q.counts.uniqueExactMedicineNames,report.counts.distinctMedicineNames);
assert.equal(q.counts.repeatedMedicineNames,report.counts.repeatMedicineNames);
assert.equal(q.counts.diagnoses,RX.length+additions.length);
assert.equal(q.regimens.length,q.counts.medicineOccurrences);
assert(q.regimens.every(r=>r.clinicalApproval==="INDICATION_SPECIFIC_REVIEW_PENDING"));
assert(q.products.every(p=>p.clinicalApproval==="PENDING"));
assert.deepEqual(makeQueue(report,register),q,"Stable worklist output");
const m=q.products[0].medicineName;
const fixture={medicineName:m,status:"DOCUMENT_FOUND",productName:"Synthetic specimen",strengthAndForm:"Test formulation",
 gtin:"4006381333931",licenseHolder:"Synthetic company",
 documentKind:"TITCK_KUB",
 kubUrl:"https://example.org/test-doc",kubRevisionDate:"2025-01-01",checkedOn:"2026-10-24",reviewer:"Synthetic tester"};
const makeRegister=docs=>({schemaVersion:1,documents:docs});
assert(validateRegister(makeRegister([{...fixture,gtin:"4006381333932"}]),new Set(report.medicines.map(x=>x.name))).length>0,
"Invalid GTIN must be rejected");
assert(validateRegister(makeRegister([{...fixture,licenseHolder:""}]),new Set(report.medicines.map(x=>x.name))).length>0,
"Missing marketing authorisation holder must be rejected");
const ok=makeQueue(report,makeRegister([fixture]));
assert.equal(ok.counts.missingProductKUB,q.counts.missingProductKUB-1);
assert(ok.regimens.filter(r=>r.medicineName===m).every(r=>r.clinicalApproval==="INDICATION_SPECIFIC_REVIEW_PENDING"));
assert(validateRegister(makeRegister([fixture,fixture]),new Set(report.medicines.map(x=>x.name))).length>0);
assert(validateRegister(makeRegister([{...fixture,status:"VERIFIED"}]),new Set(report.medicines.map(x=>x.name))).length>0);
assert(validateRegister(makeRegister([{...fixture,kubUrl:"http://example.org"}]),new Set(report.medicines.map(x=>x.name))).length>0);
assert(csv([{name:'some, "quote"'}],["name"]).includes('""quote""'));
console.log("PASS: shared exact-name source review, separate regimen reviews and safe status labeling");
