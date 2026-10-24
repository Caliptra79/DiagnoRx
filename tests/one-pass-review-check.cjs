"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const {RX,KR}=require("../js/clinical-data.js");
const newDx=require("../js/clinical-additions.js").RX;
const {assemble,RX_CHECKS,KR_CHECKS}=require("../scripts/one-pass-review-engine.cjs");
const input={
 rx:[...RX,...newDx],kr:KR,asOf:"2026-10-24",
 matrixText:fs.readFileSync("audit/clinical-review-matrix.csv","utf8"),
 preliminary:JSON.parse(fs.readFileSync("audit/clinical-source-research-2026-10-24.json","utf8")),
 parol:JSON.parse(fs.readFileSync("audit/manufacturer-parol-kub-research.json","utf8")),
 license:JSON.parse(fs.readFileSync("audit/titck-dated-license-evidence.json","utf8")),
 sourceCatalog:JSON.parse(fs.readFileSync("audit/clinical-source-catalog.json","utf8")).sources,
 productDocuments:JSON.parse(fs.readFileSync("audit/medicine-document-register.json","utf8")).documents
};
const result=assemble(input);
assert.equal(RX.length,83);assert.equal(KR.length,13);
assert.equal(result.counts.allRecords,RX.length+KR.length+newDx.length);
assert.equal(result.counts.rx,83+newDx.length);
assert.equal(result.counts.kr,13);
assert.equal(result.counts.medicineLines,input.rx.reduce((n,r)=>n+(r.ilac||[]).length,0));
assert.equal(result.counts.medicineLines,282+newDx.reduce((n,r)=>n+(r.ilac||[]).length,0));
assert.equal(result.counts.rxWithPreliminaryResearch,3);
assert.equal(result.counts.rxStillAwaitingGuidelineResearch,result.counts.rx-3);
assert.equal(result.counts.krPendingUpdatedSut,13);
assert.equal(result.counts.manufacturerComparisonLinkedRx,44);
assert.equal(result.counts.clinicalApprovals,0);
assert.equal(result.counts.clinicallyApprovedMedicineRegimens,0);
assert.equal(result.counts.currentOfficialKubApprovals,0);
assert.equal(result.rxRows.length,result.counts.rx);
assert.equal(result.krRows.length,13);
assert.equal(result.medicineRows.length,result.counts.medicineLines);
assert.equal(result.products.length,result.counts.exactMedicineNames);
assert(result.rxRows.every(d=>d.clinicalState==="NOT_APPROVED"&&Object.keys(d.checklist).length===RX_CHECKS.length));
assert(result.krRows.every(d=>d.clinicalState==="NOT_APPROVED"&&Object.keys(d.checklist).length===KR_CHECKS.length));
assert(result.medicineRows.every(d=>d.clinicalState==="REGIMEN_REVIEW_PENDING"));
assert(result.krRows.every(d=>d.latestSutChecked==="NO"));
const gas=result.rxRows.find(d=>d.id==="gas");
assert(gas.preliminarySourceUrls.length>0);
const sinuzit=result.rxRows.find(d=>d.id==="sinuzit");
assert(sinuzit.preliminarySourceUrls.length>0);
const amox=result.medicineRows.find(d=>d.medicineName==="Amoksisilin-klavulanat 1000 mg tablet");
assert(amox&&amox.datedGtinsFound.length>0);
assert.deepEqual(assemble(input),result);
const dx={id:"future-test-diagnosis",ad:"Synthetic",kat:"Test",icd:"Z00",uygun:"Synthetic",
 kaynak:"Synthetic",sevk:["Synthetic"],oneri:["Synthetic"],
 ilac:[{g:"ana",n:"Synthetic future drug",d:"1x1",s:"1 gün",k:"1 tb"}]};
const next=assemble({...input,rx:[...input.rx,dx]});
assert.equal(next.counts.rx,result.counts.rx+1);
assert.equal(next.counts.medicineLines,result.counts.medicineLines+1);
assert.equal(next.counts.clinicalApprovals,0);
console.log("PASS: one pass covers all 83 RX, 13 KR and 282 medicine uses without medical approval");
