# TİTCK tarihli ruhsatlı ürün listesiyle barkod ön karşılaştırması

**Kaynak:** [TİTCK Ruhsatlı Ürünler Listesi](https://www.titck.gov.tr/dinamikmodul/85) — 07.08.2026 tarihli resmî XLSX; 24.10.2026'da canlı durum olduğu ileri sürülmez.

İş akışı: `python3 -m unittest discover -s tests -p test_titck_license_snapshot.py`; `python3 scripts/titck_license_snapshot.py --fetch`. GitHub Actions, tarihli resmi kaynağı yalnız veri kontrol amacıyla indirmeyi dener; indirme başarısızlığı sessiz bir başarıya dönüşmez: raporda `OFFICIAL_SNAPSHOT_UNAVAILABLE_NOT_VERIFIED` görünür. İşin yapısal testleri internetten bağımsızdır.

### Çıktı nasıl yorumlanır?
- `GTIN_PRESENT_IN_DATED_LICENSE_LIST_REQUIRES_REVIEW`: Barkod, **7 Ağustos 2026 listesinde** bulundu; hücre, ürün ismi, marka, form ve ruhsat bilgileri manuel karşılaştırılmalıdır.
- `GTIN_NOT_FOUND_IN_DATED_LICENSE_LIST_INCONCLUSIVE`: Bulunamadı; **güncel ruhsat iptali ya da piyasada bulunmama anlamına gelmez**.
- `OFFICIAL_SNAPSHOT_UNAVAILABLE_NOT_VERIFIED`: TİTCK dosyası otomatik erişilemedi. Kaynağı insan kontrolüyle indirmek ve `--input` seçeneğini kullanmak gerekir.

**Hiçbir statü güncel TİTCK KÜB doğrulaması ya da doz/endikasyon/SGK-SUT uygunluğu değildir.** KÜB kaynağını belirlemek için [TİTCK KÜB/KT](https://www.titck.gov.tr/kubkt) kullanılır. Tarihli ruhsat listesi ayrı kaynaktır.

Bu dosyada kod değişikliği yalnız önceki `audit/kub-historical-leads.json` kaynaklarından araştırma yapar; 83 RX, 13 KR, ilaç dozları, etkileşim ve reçeteler aynen korunur. GitHub Actions raporu indirilebilir dosya olarak üretir.

## TİTCK 7 Ağustos 2026 tarihli listesiyle somut karşılaştırma

24 Ekim 2026 GitHub Actions çalışması [#40047832784](https://github.com/Caliptra79/DiagnoRx/actions/runs/40047832784), resmî XLSX dosyasında 3 çalışma sayfası ve 23.376 satır taradı. Sekiz eski SGK barkodundan **yedisi** aynı barkodla eşleşti, **biri** eşleşmedi. Tam resmî listeye ait satır konumları ve ürün tanımları `audit/titck-dated-license-evidence.json` içinde saklanır.

| Tarihsel ürün | GTIN | TİTCK 07.08.2026 listesi | Excel satırı |
|---|---|---|---:|
| PAROL 500 mg 20 tb | 8699717010109 | Göründü | 11649 |
| PAROL 500 mg 30 tb | 8699717010093 | Göründü | 11650 |
| BRUFEN 400 mg 20 drj | 8699548123221 | Göründü | 2389 |
| BRUFEN 400 mg 30 drj | 8699548121753 | Bulunamadı (kesin sonuç değil) | — |
| PANTO 40 mg 14 tb | 8699516042240 | Göründü | 11542 |
| PANTO 40 mg 28 tb | 8699516042257 | Göründü | 11543 |
| AUGMENTIN 875/125 mg 10 tb | 8699522095711 | Göründü | 1543 |
| AUGMENTIN 875/125 mg 14 tb | 8699522095650 | Göründü | 1544 |

Listede AUGMENTIN ürününün **875 mg/125 mg bileşimi** açıkça yazıyor. Uygulamadaki “amoksisilin-klavulanat 1000 mg” kısa adlandırması ile ilişkilendirilen ürün için bu ayrıntı klinik ve ürün bazlı incelemede ayrıca ele alınmalıdır; mevcut dozlar değiştirilmedi.

**Bu 7 eşleşme 24 Ekim 2026 itibarıyla güncel ruhsat, ürün stok durumu, KÜB sürümü veya klinik doğruluk belgesi değildir.** Kaynağın tarihi 07.08.2026'dır. Ürünlerin doğrudan güncel TİTCK KÜB belgeleri hâlâ bulunup incelenmelidir. Listede görünmeyen BRUFEN 30 draje barkodu da ürünün iptal edildiğine kanıt sayılamaz.
