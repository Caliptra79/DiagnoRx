"use strict";
// Checks evidence traceability and sign-offs, NOT clinical correctness.
const ASPECTS=["indication","choiceAndAlternatives","adultDose","durationAndQuantity",
 "contraindications","interactions","pregnancy","lactation",
 "renalAndHepatic","redFlagsAndReferral","sut"];
const KINDS=new Set(["GUIDELINE","KUB","SUT","OTHER_OFFICIAL"]);
const good=(s,n=3)=>typeof s==="string"&&s.trim().length>=n;
const date=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&
 !Number.isNaN(Date.parse(s+"T00:00:00Z"))&&new Date(s+"T00:00:00Z").toISOString().slice(0,10)===s;
function validatePolicy(baseRX,additions,catalog,audit){
 const errors=[];const bad=s=>errors.push(s);
 const sources=catalog?.sources, reviews=audit?.reviews, added=additions?.RX;
 if(catalog?.schemaVersion!==1||!Array.isArray(sources))bad("Invalid source catalog schema");
 if(audit?.schemaVersion!==1||!Array.isArray(reviews))bad("Invalid review schema");
 if(!Array.isArray(added))bad("New diagnoses must be an RX array");
 if(errors.length)return errors;
 const sourceMap=new Map();
 for(const src of sources){
   if(!good(src.id)||!/^[A-Za-z0-9_-]+$/.test(src.id)){bad("Invalid source id");continue;}
   if(sourceMap.has(src.id))bad("Duplicate source "+src.id);
   sourceMap.set(src.id,src);
   if(!KINDS.has(src.kind))bad(src.id+": bad source type");
   for(const k of ["title","publisher","version"])if(!good(src[k]))bad(src.id+": missing "+k);
   if(!date(src.documentDate)||!date(src.checkedOn))bad(src.id+": undated document/recheck");
   try{const u=new URL(src.url);if(u.protocol!=="https:"||u.username||u.password)throw Error();}
   catch(e){bad(src.id+": HTTPS document link required");}
   if(src.status!=="VERIFIED"||!good(src.verifiedBy?.name,5)||!good(src.verifiedBy?.qualification,5))
     bad(src.id+": lacks documented verification");
 }
 const revMap=new Map();
 for(const r of reviews){
   if(!good(r.id)){bad("Review missing ID");continue;}
   if(revMap.has(r.id))bad("Duplicate review "+r.id);
   revMap.set(r.id,r);
 }
 const baseline=new Set(baseRX.map(x=>x.id)),seen=new Set();
 const refs=(ids,label)=>{
   if(!Array.isArray(ids)||!ids.length){bad(label+": source references missing");return;}
   for(const id of ids)if(!sourceMap.has(id)||sourceMap.get(id).status!=="VERIFIED")
     bad(label+": source "+id+" is missing or unverified");
 };
 for(const dx of added){
   const id=dx?.id;
   if(!good(id)||!/^[a-z0-9-]+$/.test(id)){bad("New diagnosis ID invalid");continue;}
   if(baseline.has(id)||seen.has(id))bad("Diagnosis ID duplicate "+id);
   seen.add(id);
   for(const k of ["kat","ad","icd","uygun","kaynak"])if(!good(dx[k]))bad(id+": missing "+k);
   for(const k of ["sevk","oneri","ilac"])if(!Array.isArray(dx[k])||!dx[k].length)bad(id+": missing "+k);
   const meds=Array.isArray(dx.ilac)?dx.ilac:[];
   meds.forEach((m,i)=>{
     for(const k of ["g","n","d","s","k"])if(!good(m?.[k]))bad(id+": medicine "+i+" missing "+k);
     if(!["ana","alt","destek"].includes(m?.g))bad(id+": invalid medicine group "+i);
   });
   const rev=revMap.get(id);
   if(!rev){bad(id+": no independent clinical review");continue;}
   if(rev.status!=="VERIFIED"||!date(rev.reviewedAt))bad(id+": review incomplete");
   for(const key of ["primaryReviewer","independentReviewer"])
     if(!good(rev[key]?.name,5)||!good(rev[key]?.qualification,5))bad(id+": missing "+key);
   if(rev.primaryReviewer?.name===rev.independentReviewer?.name)bad(id+": reviewers must be different");
   for(const aspect of ASPECTS){
     const a=rev.aspects?.[aspect];
     if(!a||!["VERIFIED","NOT_APPLICABLE"].includes(a.status)||!good(a.finding,12)){
       bad(id+": missing clinical assessment "+aspect);continue;
     }
     if(a.status==="NOT_APPLICABLE"){if(aspect!=="sut")bad(id+": only SUT may be non-applicable");}
     else refs(a.sourceIds,id+"/"+aspect);
   }
   if(!Array.isArray(rev.medications)||rev.medications.length!==meds.length){
      bad(id+": every drug requires a review");continue;
   }
   rev.medications.forEach((m,i)=>{
     if(m.index!==i||m.name!==meds[i]?.n)bad(id+": medicine review/name mismatch "+i);
     refs(m.sourceIds,id+"/medication/"+i);
     for(const k of ["doseAndFrequency","durationAndQuantity","pregnancyAndLactation","renalAndHepatic","interactionsAndWarnings"])
       if(!good(m[k],12))bad(id+": missing drug assessment "+i+"/"+k);
   });
 }
 for(const id of revMap.keys())if(!seen.has(id))bad("Orphan clinical review "+id);
 return errors;
}
module.exports={validatePolicy,ASPECTS};
