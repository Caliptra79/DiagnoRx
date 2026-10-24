"use strict";
/* Technical triage only. A missing flag or zero findings NEVER means clinically safe.
 * Keep this pure: test the same code for baseline and future diagnoses.
 */
const {interactionWarnings}=require("../js/clinical-safety.js");
const CATEGORIES=[
 ["ANTIMICROBIAL_SYSTEMIC",/^(?:Amoksisilin|Fenoksimetilpenisilin|Benzatin penisilin|Sef[a-zçğıöşü]*|Cef[a-zçğıöşü]*|Azitromisin|Klaritromisin|Klindamisin|Doksisiklin|Siprofloksasin|Levofloksasin|Metronidazol|Nitrofurantoin|Fosfomisin|Trimetoprim|Sülfametoksazol|Ko-trimoksazol)/i],
 ["SYSTEMIC_STEROID",/^(?:Metilprednizolon|Prednizolon|Prednizon|Deksametazon|Betametazon)(?:\s|$)/i],
 ["NSAID_SYSTEMIC",/^(?:Naproksen|İbuprofen|Diklofenak|Deksketoprofen|Ketoprofen|Flurbiprofen)(?:\s|$)/i]
];
const TOPICAL=/\b(?:jel|krem|merhem|pomad|losyon|sprey|damla)\b/i;
const stripped=x=>String(x||"").trim().replace(/\s+/g," ");
const key=x=>stripped(x).toLocaleLowerCase("tr-TR").normalize("NFC");
const uniq=xs=>[...new Set(xs)].sort((a,b)=>String(a).localeCompare(String(b),"tr"));
function quantityCheck(m){
 const dose=/^(\d+)x(\d+)(?:\s|$)/i.exec(m.d||"");
 const dur=/^(\d+)\s*gün$/i.exec(m.s||"");
 const qty=/^(\d+)\s*(?:tb|kps)(?:\s|$)/i.exec(m.k||"");
 if(!dose||!dur||!qty||/gerekirse|gerektiğinde|ardından|sonra|ilk|en çok|veya|hafta|günlük toplam|artır|azalt|yavaş/i.test(m.d||""))return null;
 const expected=+dose[1]*+dose[2]*+dur[1],listed=+qty[1];
 if(expected===listed)return null;
 return {expected,listed,note:"Yalnız basit aritmetik; kutu, reçete miktarı ve tıbbi doz doğrulanmadı"};
}
function classify(m){
 const n=stripped(m?.n);
 const types=[];
 for(const [type,regex] of CATEGORIES)if(regex.test(n)&&(!TOPICAL.test(n)||type==="ANTIMICROBIAL_SYSTEMIC"&&!/damla|sprey|krem|merhem|jel/i.test(n)))types.push(type);
 return types;
}
function parseStatusMatrix(csv){
 const result=new Map();
 for(const line of String(csv||"").trim().split(/\r?\n/).slice(1)){
  const cols=[];let pos=0;
  const rx=/"((?:[^"]|"")*)"(?:,|$)/g;let m;
  while((m=rx.exec(line))){if(m.index!==pos)throw Error("Bad matrix CSV");cols.push(m[1].replace(/""/g,'"'));pos=rx.lastIndex;}
  if(pos!==line.length||cols.length!==15)throw Error("Bad matrix columns");
  result.set(cols[0]+":"+cols[1],cols[13]);
 }
 return result;
}
function buildReport({rx,kr,reviewStatuses=new Map(),research=null,approvedSources=[]}){
 if(!Array.isArray(rx)||!Array.isArray(kr))throw Error("Invalid clinical collections");
 const catalog=new Map(),sourceUsage=new Map(),diagnoses=[],categoryCounts=new Map();
 const dupids=[],ids=new Set();
 for(const record of rx){
  const id=String(record?.id||"");
  if(ids.has(id))dupids.push(id);ids.add(id);
  const cat=stripped(record?.kat)||"Bilinmeyen";
  categoryCounts.set(cat,(categoryCounts.get(cat)||0)+1);
  const warnings=[],tags=new Set(),medNames=[];
  const meds=Array.isArray(record?.ilac)?record.ilac:[];
  const required=["id","kat","ad","icd","uygun","kaynak","ilac","sevk","oneri"];
  for(const f of required)if(!record?.[f]||(Array.isArray(record[f])&&!record[f].length))warnings.push({code:"MISSING_REQUIRED_FIELD",field:f,detail:"Veri bütünlüğü incelemesi"});
  meds.forEach((m,i)=>{
   const name=stripped(m?.n);
   if(!name||!stripped(m?.d)||!stripped(m?.s)||!stripped(m?.k))
    warnings.push({code:"INCOMPLETE_MEDICINE",medicineIndex:i,detail:name||"İlaç adı eksik"});
   const group=m?.g||"";
   if(!["ana","alt","destek"].includes(group))
    warnings.push({code:"INVALID_MEDICINE_GROUP",medicineIndex:i,detail:group});
   if(name){
    const k=key(name);medNames.push(name);
    if(!catalog.has(k))catalog.set(k,{name,diagnosisIds:new Set(),uses:[],regimens:new Set(),flags:new Set(),categories:new Set()});
    const entry=catalog.get(k);
    entry.diagnosisIds.add(id);
    entry.regimens.add(stripped(m.d)+" | "+stripped(m.s));
    const riskCategories=classify(m);
    riskCategories.forEach(c=>{entry.categories.add(c);tags.add(c);});
    const flags=uniq([...(Array.isArray(m.x)?m.x:[]),...(Array.isArray(m.w)?m.w:[])]);
    flags.forEach(f=>{entry.flags.add(f);tags.add("PATIENT_FLAG_"+String(f).toUpperCase());});
    entry.uses.push({diagnosisId:id,index:i,group,dose:stripped(m.d),duration:stripped(m.s),quantity:stripped(m.k)});
    const math=quantityCheck(m);
    if(math)warnings.push({code:"QUANTITY_ARITHMETIC_REVIEW",medicineIndex:i,medicine:name,detail:math});
   }
  });
  const same=new Map();
  meds.filter(m=>m&&m.g!=="alt").forEach(m=>{if(m.n){const k=key(m.n);same.set(k,(same.get(k)||0)+1);}});
  for(const [n,count] of same)if(count>1)warnings.push({code:"REPEATED_NON_ALTERNATIVE_DRUG",detail:n,count});
  // Potential combinations may be conditional, not simultaneous prescriptions.
  const candidate=meds.filter(m=>m&&m.g!=="alt");
  for(const w of interactionWarnings(candidate))
   warnings.push({code:"CONDITIONAL_PAIR_INTERACTION_REVIEW",detail:w});
  const source=stripped(record?.kaynak);
  if(source)sourceUsage.set(source,(sourceUsage.get(source)||0)+1);
  const attention=tags.has("ANTIMICROBIAL_SYSTEMIC")||tags.has("SYSTEMIC_STEROID")
     ||warnings.some(w=>["QUANTITY_ARITHMETIC_REVIEW","CONDITIONAL_PAIR_INTERACTION_REVIEW","INCOMPLETE_MEDICINE"].includes(w.code));
  diagnoses.push({id,category:cat,name:stripped(record?.ad),
    reviewStatus:reviewStatuses.get("RX:"+id)||"NOT_REVIEWED",
    reviewQueue:attention?"REVIEW_FIRST":"STANDARD_REVIEW",
    reviewLenses:uniq([...tags]),medicineCount:meds.length,medicineNames:medNames,
    findings:warnings});
 }
 const medicines=[...catalog.values()].map(c=>({name:c.name,diagnosisCount:c.diagnosisIds.size,
  diagnosisIds:uniq([...c.diagnosisIds]),regimenVariants:uniq([...c.regimens]),
  categories:uniq([...c.categories]),patientFlags:uniq([...c.flags]),
  uses:c.uses.sort((a,b)=>a.diagnosisId.localeCompare(b.diagnosisId)||a.index-b.index)}))
 .sort((a,b)=>b.diagnosisCount-a.diagnosisCount||a.name.localeCompare(b.name,"tr"));
 const groups=[...categoryCounts].map(([category,count])=>({category,count})).sort((a,b)=>a.category.localeCompare(b.category,"tr"));
 const statuses={};for(const d of diagnoses)statuses[d.reviewStatus]=(statuses[d.reviewStatus]||0)+1;
 const flagCounts={};for(const d of diagnoses)for(const w of d.findings)flagCounts[w.code]=(flagCounts[w.code]||0)+1;
 const chronicStatus=kr.reduce((acc,k)=>{const status=reviewStatuses.get("KR:"+k.id)||"NOT_REVIEWED";acc[status]=(acc[status]||0)+1;return acc;},{});
 return {schemaVersion:1,classification:"ENGINEERING_TRIAGE_NOT_CLINICALLY_VERIFIED",
  disclaimer:"Ön tarama, güvenlik veya klinik onay değildir. Rehber/KÜB/SUT doğruluğu ve reçete uygunluğu klinisyen tarafından değerlendirilmelidir.",
  counts:{diagnoses:rx.length,chronicNotes:kr.length,medicineLines:medicines.reduce((a,m)=>a+m.uses.length,0),
    distinctMedicineNames:medicines.length,repeatMedicineNames:medicines.filter(m=>m.diagnosisCount>1).length,
    diagnosesForPriorityReview:diagnoses.filter(d=>d.reviewQueue==="REVIEW_FIRST").length,
    diagnosesWithStructuralFindings:diagnoses.filter(d=>d.findings.length).length,
    researchedDiagnoses:diagnoses.filter(d=>d.reviewStatus==="RESEARCHED_PENDING_CLINICAL_REVIEW").length,
    approvedClinicalSources:approvedSources.filter(s=>s.status==="VERIFIED").length},
  reviewStatuses:statuses,chronicReviewStatuses:chronicStatus,
  categoryCounts:groups,findingsByCode:flagCounts,duplicateDiagnosisIds:uniq(dupids),
  sourcePhraseGroups:[...sourceUsage].map(([description,occurrences])=>({description,occurrences,status:"UNVERIFIED_FREE_TEXT"}))
   .sort((a,b)=>b.occurrences-a.occurrences||a.description.localeCompare(b.description,"tr")),
  preliminaryResearchIds:Array.isArray(research?.diagnoses)?uniq(research.diagnoses.map(x=>x.id)):[],
  diagnoses,medicines};
}
module.exports={buildReport,parseStatusMatrix,quantityCheck,classify};
