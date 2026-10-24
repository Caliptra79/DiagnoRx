# DiagnoRx — Clinical safety audit tracker (24 October 2026)

## Verification status
**NOT CLINICALLY VERIFIED.** This is an engineering change set, not medical approval. No unverified dose, indication, or reimbursement text was automatically rewritten.

- Baseline: 83 ready-prescription entries and 13 chronic-care notes (retained).
- Data version displayed in app: 11 October 2026; this is a historical data label, **not** evidence that the records were re-checked on that date.
- Source text commonly uses general guideline names; individual document identifiers, publication dates, KÜB versions and SUT effective dates are not consistently captured.
- The newly separated lactation flag **inherits legacy combined pregnancy/lactation precautions conservatively**. A medication-specific lactation review is still required. This should not be interpreted as a new verified contraindication.
- Pairwise interaction alerts currently address only NSAID + NSAID and systemic fluoroquinolone + systemic steroid combinations; they are **not an exhaustive interaction checker**.
- Dynamic warnings never establish safety when no warning appears.

## Clinical audit still required (d1, d2, d3)
For **each** of the 83 prescription entries: capture indication and exclusion criteria; adult dose/route/frequency/duration/max dose; age, pregnancy, lactation, renal/hepatic precautions; interactions; last confirmed TİTCK KÜB revision and dated guideline URL. Record reviewer initials and reviewed-on date. Preserve previous content and document any change.

For **each** of the 13 chronic-care entries: record current official SUT text, decision/effective date, EK-4/E or EK-4/F relevance, prescriber permissions, specialist report conditions, duration/quantity limits and review date. Do not mark these entries as checked until independently validated.

## Code change scope
- Separate pregnancy and lactation selection in the UI without relaxing prior conservative warnings.
- Improve unsafe option contrast and printing. Continue to display red-flag reasoning.
- Add narrowly scoped interaction warnings for explicitly defined combinations.
- Keep the original app shell, clinical datasets, colors and navigation.
- Update service-worker cache namespace and prevent deletion of unrelated origin caches.
- Add static syntax, data-count and PWA invariant tests.

## Outstanding work and limitations
- **c1/c4:** Clinical rules and pairwise interactions remain partial; drug-specific validated coverage is outstanding.
- **d1/d2/d3:** Actual clinical verification of all records and reimbursement requirements is **pending**, not claimed complete.
- **d4:** Structured dose engine and independent calculation tests are still pending; free-form dose strings cannot be reliably validated automatically.
- **t1:** Existing monolithic HTML remains; modularization should be a separate regression-controlled commit.
- **t3:** Controlled user-facing new-version prompt is not implemented; v2 cache refresh is basic.
- **t4:** No measured on-device speed baseline or Safari audit performed.
- **t5:** Further CSP/hardening and local note threat-model testing needed.
- **u1:** Safety alert presentation improved but complete UX audit is pending.

No patient identifiers should be entered into local notes. Independent clinician/pharmacist review and device testing are required before patient-care reliance.
