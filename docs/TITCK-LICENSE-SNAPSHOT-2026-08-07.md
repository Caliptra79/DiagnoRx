# TİTCK tarihli ruhsatlı ürün listesiyle barkod ön karşılaştırması

**Kaynak:** [TİTCK Ruhsatlı Ürünler Listesi](https://www.titck.gov.tr/dinamikmodul/85) — 07.08.2026 tarihli resmî XLSX; 24.10.2026'da canlı durum olduğu ileri sürülmez.

İş akışı: `python3 -m unittest discover -s tests -p test_titck_license_snapshot.py`; `python3 scripts/titck_license_snapshot.py --fetch`. GitHub Actions, tarihli resmi kaynağı yalnız veri kontrol amacıyla indirmeyi dener; indirme başarısızlığı sessiz bir başarıya dönüşmez: raporda `OFFICIAL_SNAPSHOT_UNAVAILABLE_NOT_VERIFIED` görünür. İşin yapısal testleri internetten bağımsızdır.

### Çıktı nasıl yorumlanır?
- `GTIN_PRESENT_IN_DATED_LICENSE_LIST_REQUIRES_REVIEW`: Barkod, **7 Ağustos 2026 listesinde** bulundu; hücre, ürün ismi, marka, form ve ruhsat bilgileri manuel karşılaştırılmalıdır.
- `GTIN_NOT_FOUND_IN_DATED_LICENSE_LIST_INCONCLUSIVE`: Bulunamadı; **güncel ruhsat iptali ya da piyasada bulunmama anlamına gelmez**.
- `OFFICIAL_SNAPSHOT_UNAVAILABLE_NOT_VERIFIED`: TİTCK dosyası otomatik erişilemedi. Kaynağı insan kontrolüyle indirmek ve `--input` seçeneğini kullanmak gerekir.

**Hiçbir statü güncel TİTCK KÜB doğrulaması ya da doz/endikasyon/SGK-SUT uygunluğu değildir.** KÜB kaynağını belirlemek için [TİTCK KÜB/KT](https://www.titck.gov.tr/kubkt) kullanılır. Tarihli ruhsat listesi ayrı kaynaktır.

Bu dosyada kod değişikliği yalnız önceki `audit/kub-historical-leads.json` kaynaklarından araştırma yapar; 83 RX, 13 KR, ilaç dozları, etkileşim ve reçeteler aynen korunur. GitHub Actions raporu indirilebilir dosya olarak üretir.
