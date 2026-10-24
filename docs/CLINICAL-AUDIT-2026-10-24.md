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

## Second engineering pass
Added `tests/clinical-inventory.cjs` to generate a machine-readable inventory (`node tests/clinical-inventory.cjs --json`) without changing clinical prescriptions. The inventory enumerates every existing RX and chronic-care record, checks missing core fields and duplicate identifiers, and flags missing versioned source provenance. Quantity-versus-duration checks are only heuristics and must not be interpreted as verified dose calculations. The check is part of the GitHub Actions workflow. Clinical review remains outstanding.

## Official SGK checkpoints identified on 24 October 2026 (not yet applied)
The following published sources should be checked item by item against the chronic-care and reimbursement notes. Listing them here **does not establish that any DiagnoRx SUT statement is currently correct or incorrect**.

1. SGK 02/10/2026 change-incorporated SUT: https://www.sgk.gov.tr/duyuru/detay/02102026-SUT-Degisiklik-Tebligi-Islenmis-Guncel-2013-SUT-2026-10-02-02-50-06
2. SGK 16/10/2026 reimbursement commission announcement: https://bingol.sgk.gov.tr/duyuru/detay/20261-Donem-Ilac-Geri-Odeme-Komisyonu-ve-2026-Yili-3-Olaganustu-Ilac-Geri-Odeme-Komisyonu-Kararlarina-Istinaden-Bedeli-Odenecek-Ilaclar-Listesinde-2026-10-16-11-37-43
3. SGK 21/10/2026 reimbursable drugs list announcement 2026/41: https://ankara.sgk.gov.tr/duyuru/detay/Bedeli-Odenecek-Ilaclar-Listesinde-Yapilan-Duzenlemeler-Hakkinda-Duyuru-202641-2026-10-21-04-46-33

Use `audit/clinical-review-matrix.csv` as the 96-record audit worksheet; all records begin with `NOT_REVIEWED` and evidence/version fields are intentionally blank. The baseline source text in the sheet is **not** a validated source citation.

## Data modularization (engineering-only; still NOT CLINICALLY VERIFIED)
All 83 original RX and 13 original KR records, including common templates, have been moved without changing their contents into `js/clinical-data.js`. The original clinical data source block carries FNV-1a/32 fingerprint `62495db7` enforced in `tests/static-check.cjs`. This is a regression tripwire for unintended data edits, not cryptographic integrity attestation and not a clinical validity test. The data file is pre-cached with the same service-worker snapshot as the HTML. Source verification statuses in `audit/clinical-review-matrix.csv` remain `NOT_REVIEWED`.

## Local note hygiene
The settings page now offers explicitly confirmed deletion of DiagnoRx-only notes under `not:rx:` and `not:kr:` storage keys. Other origin storage, including unrelated apps and appearance preferences, is untouched. This is not secure erasure of browser backups; users must avoid entering patient identifiers in the first place. The behaviour is covered by `tests/privacy-check.cjs`.
