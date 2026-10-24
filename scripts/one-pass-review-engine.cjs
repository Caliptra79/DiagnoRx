"use strict";
// Engineering evidence inventory: no source availability or checklist means clinical approval.
const {buildReport,parseStatusMatrix}=require("./bulk-audit-engine.cjs");
const RX_CHECKS=[
 "diagnosis_and_differential","guideline_and_indication","medicine_choice_alternatives",
 "dose_frequency","duration_quantity","contraindications",
 "interactions_and_total_exposure","pregnancy_lactation","renal_hepatic_age",
 "referral_red_flags","current_product_kub","sut_reimbursement"
];
const KR_CHECKS=[
 "diagnosis_guideline","report_prescriber_eligibility","sut_article_annex",
 "monitoring_and_labs","medicine_group_safety","referral_followup","effective_date"
];
const pending=names=>Object.fromEntries(names.map(n=>[n,"REQUIRES_INDEPENDENT_REVIEW"]));
const unique=xs=>[...new Set(xs)].sort((a,b)=>String(a).localeCompare(String(b),"tr"));
const val=x=>String(x??"").trim();
function assemble({rx,kr,matrixText,preliminary,parol,license,sourceCatalog=[],productDocuments=[],asOf="2026-10-24"}){
 if(!Array.isArray(rx)||!Array.isArray(kr))throw Error("Invalid RX/KR input");
 const matrix=parseStatusMatrix(matrixText);
 const inventory=buildReport({rx,kr,reviewStatuses:matrix,research:preliminary,approvedSources:[]});
 const byId=new Map(inventory.diagnoses.map(x=>[x.id,x]));
 const research=new Map((preliminary?.diagnoses||[]).map(x=>[x.id,x]));
 const guidelineUrls=new Map((preliminary?.sources||[]).map(x=>[x.id,x.url]));
 const dated=new Map();
 for(const row of license?.records||[]){
  if(!dated.has(row.medicineName))dated.set(row.medicineName,[]);
  dated.get(row.medicineName).push(row);
 }
 const documented=new Map(productDocuments.map(x=>[x.medicineName,x]));
 const parolName=parol?.medicineDescription;
 const rxRows=rx.map(r=>{
  const inv=byId.get(r.id);
  if(!inv)throw Error("Inventory missing diagnosis "+r.id);
  const first=research.get(r.id);
  const medNames=unique((r.ilac||[]).map(m=>val(m.n)).filter(Boolean));
  return {
   type:"RX",id:r.id,name:r.ad,icd:r.icd,category:r.kat,
   originalSourceDescription:val(r.kaynak),
   sourceDescriptionState:"ORIGINAL_FREE_TEXT_UNVERIFIED",
   preliminaryGuidelineState:first?"RESEARCHED_NOT_CLINICALLY_VERIFIED":"NOT_RESEARCHED",
   preliminarySourceUrls:(first?.sourceIds||[]).map(id=>guidelineUrls.get(id)).filter(Boolean),
   originalMatrixStatus:matrix.get("RX:"+r.id)||"NOT_REVIEWED",
   algorithmicQueue:inv.reviewQueue,technicalFindings:inv.findings,
   affectedByManufacturerComparison:medNames.includes(parolName),
   datedLicenseEvidenceNames:medNames.filter(n=>dated.has(n)),
   exactNamesWithDocumentRecords:medNames.filter(n=>documented.has(n)),
   medicineCount:(r.ilac||[]).length,
   clinicalState:"NOT_APPROVED",
   checklist:pending(RX_CHECKS)
  };
 });
 const krRows=kr.map(r=>({
   type:"KR",id:r.id,name:r.ad,icd:r.icd,
   originalSourceDescription:val(r.kaynak),
   originalSutText:val(r.sut),
   originalReportRules:(r.rapor||[]).map(val),
   monitoringRuleCount:(r.kontrol||[]).length,
   referralCount:(r.sevk||[]).length,
   medicineGroups:(r.gruplar||[]).map(g=>({name:g.g,examples:g.e})),
   originalMatrixStatus:matrix.get("KR:"+r.id)||"NOT_REVIEWED",
   latestSutChecked:"NO",
   clinicalState:"NOT_APPROVED",
   checklist:pending(KR_CHECKS)
 }));
 const medRows=rx.flatMap(r=>(r.ilac||[]).map((m,i)=>{
   const n=val(m.n), ref=(dated.get(n)||[]);
   return {diagnosisId:r.id,diagnosis:r.ad,medicineIndex:i,medicineName:n,
    group:val(m.g),condition:val(m.c),dose:val(m.d),duration:val(m.s),
    quantity:val(m.k),originalNote:val(m.t),
    patientSafetyTags:unique([...(Array.isArray(m.x)?m.x:[]),...(Array.isArray(m.w)?m.w:[])]),
    manufacturerComparison:n===parolName?"MANUFACTURER_DOCUMENT_NOT_LATEST_KUB":"NOT_RESEARCHED",
    datedGtinsFound:ref.filter(x=>x.excelRow!=null).map(x=>x.gtin13),
    datedGtinsNotFound:ref.filter(x=>x.excelRow==null).map(x=>x.gtin13),
    documentState:documented.has(n)?"DOCUMENT_RECORDED_NOT_APPROVED":"EXACT_CURRENT_KUB_MISSING",
    clinicalState:"REGIMEN_REVIEW_PENDING"};
 }));
 const products=inventory.medicines.map(m=>({
   medicineName:m.name,usageCount:m.uses.length,diagnosisCount:m.diagnosisCount,
   sourceDescriptionStatus:"DOES_NOT_PROVE_KUB",
   datedLicenseGtins:(dated.get(m.name)||[]).map(x=>({barcode:x.gtin13,listDate:x.sourceListDate,status:x.snapshotStatus})),
   manufacturerComparison:m.name===parolName,
   currentDirectKubStatus:documented.has(m.name)?"DOCUMENT_RECORDED_NEEDS_CONFIRMATION":"MISSING",
   clinicalState:"NOT_APPROVED"
 }));
 const distinctSourceDescriptions=unique([...rxRows,...krRows].map(x=>x.originalSourceDescription).filter(Boolean));
 const prelimCount=rxRows.filter(x=>x.preliminaryGuidelineState!=="NOT_RESEARCHED").length;
 return {
  schemaVersion:1,asOf,status:"ONE_PASS_RESEARCH_PACKAGE_NOT_CLINICAL_VALIDATION",
  notice:"All tests and research statuses are preliminary. Zero clinical or SUT approvals inferred.",
  counts:{
   rx:rxRows.length,kr:krRows.length,allRecords:rxRows.length+krRows.length,
   medicineLines:medRows.length,exactMedicineNames:products.length,
   rxWithPreliminaryResearch:prelimCount,
   rxStillAwaitingGuidelineResearch:rxRows.length-prelimCount,
   krPendingUpdatedSut:krRows.filter(x=>x.latestSutChecked==="NO").length,
   manufacturerComparisonLinkedRx:rxRows.filter(x=>x.affectedByManufacturerComparison).length,
   clinicalApprovals:0,clinicallyApprovedMedicineRegimens:0,currentOfficialKubApprovals:0,
   originalSourcePhrases:distinctSourceDescriptions.length
  },
  sharedSourceHints:(preliminary?.sources||[]).map(x=>({id:x.id,title:x.title,url:x.url,
   evidenceStatus:"RESEARCH_ONLY_NOT_CLINICAL_APPROVAL"})),
  officialSutBaselineHint:{url:"https://trabzon.sgk.gov.tr/duyuru/detay/02102026-SUT-Degisiklik-Tebligi-Islenmis-Guncel-2013-SUT-2026-10-02-02-50-06",
   date:"2026-10-02",status:"SOURCE_IDENTIFIED_NOT_ARTICLE_REVIEWED"},
  sourceCatalogRecords:sourceCatalog.length,
  requiredRxChecks:RX_CHECKS,requiredKrChecks:KR_CHECKS,
  originalSourceDescriptions:distinctSourceDescriptions,
  rxRows,krRows,medicineRows:medRows,products
 };
}
module.exports={assemble,RX_CHECKS,KR_CHECKS};
