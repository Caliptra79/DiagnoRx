"use strict";
// Data inventory; deliberately does NOT make clinical validity claims.
const fs=require("node:fs"),vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8");
const script=html.match(/<script>([\s\S]*?)<\/script>/);
if(!script)throw Error("Application script missing");
const src=script[1];
const start=src.indexOf("const CTX = ");
const end=src.indexOf("/* ---------- Durum ---------- */");
if(start<0||end<=start)throw Error("Clinical data boundaries changed; manual review needed");
const sandbox={};
vm.runInNewContext(src.slice(start,end)+"\nthis.__audit={rx:RX,kr:KR};",sandbox,{timeout:5000});
const {rx,kr}=sandbox.__audit;
const duplicate=(xs)=>xs.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i);
const missing=(xs,fields)=>xs.flatMap(x=>fields.filter(k=>!x[k]).map(k=>x.id+":"+k));
// Exact-only arithmetic triage: never infer variable, PRN or range-based schedules.
function quantityCheck(x){
 const dose=/^(\d+)x(\d+)(?:\s|$)/i.exec(x.d||"");
 const duration=/^(\d+)\s*gün$/i.exec(x.s||"");
 const supplied=/^(\d+)\s*(tb|kps)(?:\s|$)/i.exec(x.k||"");
 if(!dose||!duration||!supplied||/gerekirse|sonra|ardından|ilk|hafta|en çok|doz artır/i.test(x.d))return null;
 const expected=Number(dose[1])*Number(dose[2])*Number(duration[1]);
 const available=Number(supplied[1]);
 return expected===available?null:{expectedUnits:expected,listedUnits:available,
  note:"Review pack arithmetic only; does not establish correct dose, course or product availability"};
}
const unusual=rx.flatMap(r=>r.ilac.flatMap((x,i)=>{
 const m=[];
 if(!x.n||!x.d||!x.s)m.push("missing medicine/name/dose/duration");
 if(!["ana","alt","destek"].includes(x.g))m.push("unknown group");
 const quantity=quantityCheck(x); if(quantity)m.push("Simple arithmetic discrepancy: "+quantity.expectedUnits+" expected vs "+quantity.listedUnits+" listed");
 return m.map(reason=>({rx:r.id,medicine:i+1,reason}));
}));
// Audit matrix must represent every baseline record without claiming verification.
const matrix=fs.readFileSync("audit/clinical-review-matrix.csv","utf8");
const rows=matrix.trimEnd().split(/\\r?\\n/).slice(1);
const ids=rows.map(row=>{const match=/^"(RX|KR)","([^"]+)"/.exec(row);if(!match)throw Error("Bad audit row");return match[1]+":"+match[2];});
const expected=[...rx.map(r=>"RX:"+r.id),...kr.map(k=>"KR:"+k.id)];
if(rows.length!==96 || ids.length!==new Set(ids).size || expected.some(id=>!ids.includes(id)))
  throw Error("Clinical audit matrix does not match 83 RX and 13 KR records");
if(rows.some(row=>!row.endsWith(',"NOT_REVIEWED",""')))
  throw Error("Unverified baseline rows must stay explicitly marked NOT_REVIEWED");
const report={
 generatedAt:new Date().toISOString(),status:"UNVERIFIED — static inventory only",
 counts:{rx:rx.length,kr:kr.length,medicines:rx.reduce((n,r)=>n+r.ilac.length,0)},
 duplicateIds:{rx:duplicate(rx),kr:duplicate(kr)},
 missingRequired:{rx:missing(rx,["id","kat","ad","icd","uygun","sevk","oneri","kaynak","ilac"]),kr:missing(kr,["id","ad","icd","kontrol","sevk","gruplar","hatirlat","kaynak"])},
 sourceProvenance:{rxWithoutSourceVersion:rx.filter(x=>!x.sourceVersion).map(x=>x.id),krWithoutSourceVersion:kr.filter(x=>!x.sourceVersion).map(x=>x.id)},
 reviewQueue:unusual,
};
if(process.argv.includes("--json"))console.log(JSON.stringify(report,null,2));
else console.log(["Clinical source inventory: NOT VERIFIED",JSON.stringify(report.counts), "Duplicate IDs: "+JSON.stringify(report.duplicateIds),"Missing required fields: "+JSON.stringify(report.missingRequired),"Records needing versioned-source review: "+(report.sourceProvenance.rxWithoutSourceVersion.length+report.sourceProvenance.krWithoutSourceVersion.length),"Heuristic review flags: "+unusual.length].join("\n"));
if(report.duplicateIds.rx.length||report.duplicateIds.kr.length||report.missingRequired.rx.length||report.missingRequired.kr.length)process.exitCode=1;
