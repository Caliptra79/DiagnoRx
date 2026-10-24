# DiagnoRx — TİTCK Ürün Adayları ve Belge İnceleme İş Akışı

**24 Ekim 2026 — durum: Ürün eşleştirme bekliyor; klinik olarak doğrulanan KÜB/ilaç yok.**

İlk sekiz jenerik ilaç ismi birer *ruhsatlı ürün/marka* değildir. Ürün eşleştirmek için [TİTCK KÜB/KT listesi](https://www.titck.gov.tr/kubkt) ve ilgili ruhsat/ürün listeleri kullanılır. TİTCK listesi ilaç adı, etkin madde, firma, KÜB onay tarihi ve KÜB dokümanını ayrı gösterir. Kurumun HTML görünümünden güvenilir biçimde çekilemeyen belge URL'leri tahmin edilmez.

## Üç durum

1. **Belge yok:** Reçetede jenerik ilaç adı var ama spesifik marka/barkod bilinmiyor. `kub-product-matching-queue.csv` içinde `FIND_LICENSED_PRODUCT_AND_GTIN`.
2. **Ürün adayı:** Tanımlı bir üretici ve GTIN ile TİTCK kataloğunda araştırılacak spesifik ürün `audit/kub-product-candidates.json` içine `CANDIDATE_UNVERIFIED` olarak girilir; *KÜB bulundu* denmez.
3. **Resmî belge bulundu:** Belgede tam TİTCK HTTPS URL, ürün ruhsatı, güç/form, KÜB revizyon tarihi ve kontrol eden kişi kaydedilir. Durum `KUB_DOCUMENT_LOCATED` olabilir, fakat **klinik onay hâlâ yoktur**. Doz, süre, endikasyon ve SUT uzman tarafından bağımsız değerlendirilecektir.

İlk adaylar için `medicineName` jenerik tam ad, `productName` ruhsatlı marka/ürün, `licenseHolder` ruhsat sahibi, `strengthAndForm` güç ve farmasötik form, `gtin13` doğrulanmış GTIN yazılır. Bir jenerik adın birden çok marka adayı olabilir. Sistem, barkod kontrol basamağını doğrular; **GTIN'in gerçek bir ruhsatlı ürüne ait olduğunu kendi başına doğrulayamaz**.

`KUB_DOCUMENT_LOCATED` için ayrıca `kubUrl` (tam, spesifik resmî TİTCK belge linki), `kubRevisionDate`, `checkedOn`, `checkedBy` zorunludur. Testlerdeki örnek markalar, GTIN'ler ve URL'ler **sentetiktir; gerçek ürün veya belge değildir**.

## Rapor üretimi

```bash
node tests/kub-product-candidates-check.cjs
node scripts/kub-product-candidates.cjs --write
```

GitHub Actions artefaktında `kub-product-matching-queue.csv`, `kub-product-candidates.csv` ve `kub-product-matching.json` bulunur. Bunlar 83 ve ileride eklenecek tüm tanılara yeniden uygulanır.

### Güvenlik sınırı

- Ürün adı benzerliği, jenerik/marka eşdeğerliği veya GTIN matematik testi tek başına KÜB/doz doğrulaması değildir.
- Bir ürün için kaynak bulunduğunda bile başka endikasyon ve dozlar aynı şekilde onaylanmış sayılmaz.
- TİTCK KÜB dokümanı olmayan veya başka kuruma ait URL, otomatik "resmî belge" konumuna geçmez.
- SGK/SUT veya klinik güncellik denetlenmeden hiçbir reçeteye klinik `VERIFIED` statüsü verilmez.
