# DiagnoRx — Ortak Ürün KÜB ve Tanı Bazlı Rejim İş Listesi

**Temel ilke:** Aynı ilaç tam adı için kaynak belge araması tekrar edilmeyebilir. Ancak her tanıda doz, süre, endikasyon ve özel popülasyon incelemesi **ayrıdır**. Kod hiçbir reçeteyi değiştirmez ve otomatik klinik onay vermez.

## Kullanım

```bash
node tests/review-worklist-check.cjs
node scripts/review-worklist.cjs --write
```

GitHub Actions `diagnorx-clinical-triage` artefaktına şu dosyaları ekler: `medicine-document-queue.csv`, `regimen-review.csv`, `diagnosis-review-queue.csv`, `review-worklist.md` ve `review-worklist.json`. İlk CSV aynı tam ilaç adlarını tek kaynak-belge kontrolünde toplar. İkinci CSV her tanı–ilaç kombinasyonunu ayrı tutar. Üçüncü CSV tanı inceleme sırasıdır.

## Kaynak araştırma başlangıç noktaları

- **TİTCK güncel KÜB**: Resmî ürün, barkod/ruhsat, gücü, formu, revizyon tarihi ve tam KÜB dosyası tek tek eşleştirilmelidir. Sağlık Bakanlığı İTS Mobil ürün KÜB/KT bilgilerine erişimi açıklar: https://play.google.com/store/apps/details?id=tr.gov.saglik.itsmobil (bu genel tanıtım, belirli bir ilacın KÜB'ü değildir).
- **Sağlık Bakanlığı — Erişkin Hastada Antibiyotik Kullanımına Akılcı Yaklaşım**, 23.02.2021: https://amasyaism.saglik.gov.tr/TR-203779/eriskin-hastada-antibiyotik-kullanimina-akilci-yaklasim.html (güncel klinik rehberlerle karşılaştırılmalıdır).
- **SGK — 02/10/2026 değişikliği işlenmiş SUT**: https://www.sgk.gov.tr/duyuru/detay/02102026-SUT-Degisiklik-Tebligi-Islenmis-Guncel-2013-SUT-2026-10-02-02-50-06 (ürün bazında son mevzuat ve ekler ayrıca kontrol edilir).

## İnsan tarafından doldurulacak belge kaydı

`audit/medicine-document-register.json` içine her **tam ilaç adı** için gerektiğinde `medicineName`, `status` (`DOCUMENT_FOUND` veya `NEEDS_CLINICAL_REVIEW`), `productName`, `strengthAndForm`, `kubUrl`, `kubRevisionDate`, `checkedOn`, `reviewer` kaydedilir. Belgenin otomatik bulunuşu klinik doğruluk kanıtı değildir; aynı tanımlı tam adın farklı ruhsatlı ürünleri ayrıca kontrol edilmelidir.

**Önemli:** Tam adı aynı olan ilaçlar bile farklı hastalıkta farklı doz/süre gerektirebilir. Otomatik etkileşim, risk, ürün eşleştirme ve SUT kuralları kapsamlı değildir. Bu mekanizma uzman klinik incelemesi için iş yükünü düzenler.
