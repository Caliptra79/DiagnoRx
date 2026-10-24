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
const unusual=rx.flatMap(r=>r.ilac.flatMap((x,i)=>{
 const m=[];
 if(!x.n||!x.d||!x.s)m.push("missing medicine/name/dose/duration");
 if(!["ana","alt","destek"].includes(x.g))m.push("unknown group");
 if(x.k&&/^\d+\s*(tb|kps)/i.test(x.k) && /\d+x\d+/.test(x.d))m.push("manual quantity-versus-duration check advised");
 return m.map(reason=>({rx:r.id,medicine:i+1,reason}));
}));
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
