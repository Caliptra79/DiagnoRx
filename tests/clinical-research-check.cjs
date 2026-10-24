"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {RX,KR}=require("../js/clinical-data.js");
const report=JSON.parse(fs.readFileSync("audit/clinical-source-research-2026-10-24.json","utf8"));
const catalog=JSON.parse(fs.readFileSync("audit/clinical-source-catalog.json","utf8"));
assert.equal(report.status,"RESEARCH_ONLY_NOT_APPROVED");
assert.equal(report.checkedOn,"2026-10-24");
assert.equal(RX.length,83);assert.equal(KR.length,13);
assert(Array.isArray(report.sources) && report.sources.length>=3);
const sources=new Map();
for(const src of report.sources){
 assert(!sources.has(src.id),"Source ID reused");
 sources.set(src.id,src);
 assert.equal(src.status,"RESEARCHED_NOT_CLINICALLY_VERIFIED");
 assert.equal(src.clinicianVerified,false,"Research never equals medical clearance");
 assert.match(src.url,/^https:\/\//);
 assert.match(src.documentDate,/^\d{4}-\d{2}-\d{2}$/);
 assert.match(src.lookedUpOn,/^\d{4}-\d{2}-\d{2}$/);
 assert(src.publisher && src.version && src.title);
}
const checks=new Set();
for(const record of report.diagnoses){
 assert(!checks.has(record.id),"Duplicate research review");
 checks.add(record.id);
 assert(RX.some(x=>x.id===record.id),"Research review must reference baseline diagnosis");
 assert.equal(record.status,"RESEARCHED_PENDING_CLINICAL_REVIEW");
 assert(record.sourceIds.length>0&&record.observations.length>0);
 for(const s of record.sourceIds)assert(sources.has(s),"Missing evidence reference: "+s);
 for(const issue of record.observations){
  assert(["LOW","MEDIUM","HIGH"].includes(issue.severity));
  for(const key of ["aspect","code","evidence","action"])assert(typeof issue[key]==="string"&&issue[key].length>10);
 }
}
assert.deepEqual([...checks].sort(),["gas","sinuzit","usye"]);
assert(Array.isArray(catalog.sources) && catalog.sources.length===0,
 "Research-only material must not automatically become a clinically VERIFIED source");
console.log("PASS: sourced preliminary review of three diagnoses; zero clinical approvals implied");
