"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const baseline=require("../js/clinical-data.js").RX;
const additions=require("../js/clinical-additions.js");
const catalog=JSON.parse(fs.readFileSync("audit/clinical-source-catalog.json","utf8"));
const audit=JSON.parse(fs.readFileSync("audit/new-diagnosis-reviews.json","utf8"));
const {validatePolicy,ASPECTS}=require("../scripts/new-diagnosis-policy.cjs");
const errors=validatePolicy(baseline,additions,catalog,audit);
if(errors.length){console.error("CLINICAL EVIDENCE GATE FAILED:\n- "+errors.join("\n- "));process.exitCode=1;}
else console.log("PASS: new diagnoses have required evidence metadata; added count "+additions.RX.length);
// Synthetic fixture: checks fail-closed behaviour, NOT a real medical source.
const doc={id:"test-doc",kind:"KUB",title:"Synthetic test",publisher:"Test only",
 url:"https://example.org/test",version:"TEST",documentDate:"2026-01-01",
 checkedOn:"2026-01-02",status:"VERIFIED",
 verifiedBy:{name:"Synthetic Person",qualification:"Test clinician"}};
const dx={id:"synthetic-only",kat:"Solunum / KBB",ad:"Synthetic test diagnosis",icd:"Z00.0",
 uygun:"Test scenario",kaynak:"test-doc",sevk:["Example"],oneri:["Example"],
 ilac:[{g:"ana",n:"Synthetic drug",d:"1x1",s:"1 gün",k:"1 tb"}]};
const aspects=Object.fromEntries(ASPECTS.map(k=>[k,{status:"VERIFIED",sourceIds:["test-doc"],
 finding:"Synthetic check for structural test ONLY"}]));
const review={id:dx.id,status:"VERIFIED",reviewedAt:"2026-01-03",
 primaryReviewer:{name:"Synthetic Clinician A",qualification:"Test clinician"},
 independentReviewer:{name:"Synthetic Clinician B",qualification:"Test pharmacist"},
 aspects,medications:[{index:0,name:"Synthetic drug",sourceIds:["test-doc"],
 doseAndFrequency:"Synthetic test observation",
 durationAndQuantity:"Synthetic test observation",
 pregnancyAndLactation:"Synthetic test observation",
 renalAndHepatic:"Synthetic test observation",
 interactionsAndWarnings:"Synthetic test observation"}]};
const check=(r,docs=[doc])=>validatePolicy(baseline,{RX:[dx]},
 {schemaVersion:1,sources:docs},{schemaVersion:1,reviews:[r]});
assert.equal(check(review).length,0,"Full synthetic review must pass schema");
assert(check({...review,independentReviewer:review.primaryReviewer}).length>0);
assert(check({...review,medications:[]}).length>0);
assert(check({...review,aspects:{...aspects,adultDose:null}}).length>0);
assert(check(review,[{...doc,status:"PENDING"}]).length>0);
console.log("PASS: gate rejects missing source validation, clinician checks and drug reviews");
