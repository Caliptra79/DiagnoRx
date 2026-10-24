# DiagnoRx — PAROL 500 mg KÜB kaynak karşılaştırması (24.10.2026)

**Durum:** Üretici sitesindeki belge okundu, **güncel TİTCK KÜB sürümü ve klinik uygunluk henüz doğrulanmadı**. Kaynak incelemesini üretici belgesinin varlığıyla, klinik onayı birbirine karıştırmıyoruz.

## Okunan iki üretici dokümanı

1. [Atabay PAROL 500 mg Kısa Ürün Bilgisi](https://www.atabay.com/wp-content/uploads/2022/02/PAROL-500-tablet-KUB.pdf) — PDF 10 sayfa, ürün bileşimi, bölüm 4.2 (doz/süre), 4.3–4.4 (kontrendikasyon ve güvenlik), 4.6 (gebelik/emzirme). URL'deki **2022/02** yükleme yolu belge için resmî revizyon tarihi olarak değerlendirilmedi.
2. [Atabay eski PAROL 500 mg bilgilendirme PDF'si](https://www.atabay.com/wp-content/uploads/2019/01/parol500mgta_file_6088_20133745253.pdf) — 2 sayfa; günlük altı tablet sınırı kaydedilmiş. URL'deki **2019/01** da resmî revizyon tarihi olarak değerlendirilmedi.

## Uygulama ile karşılaştırma — 44 ilgili tanı

- **Süre:** ortak `PCM` şablonu **3–5 gün** yazıyor. Üretici KÜB'ünde *hekim önerisi olmadan* üç günden uzun kullanmama uyarısı var. Klinik gözden geçirme ile reçetelerin hekim önerisi bağlamı belirlenmeli.
- **Alkol/karaciğer:** ortak şablonda alkol veya karaciğer hastalığında **2–3 g/gün** genel ifadesi var. Üretici KÜB, alkol kullananlarda günlük **2 g** sınırını belirtiyor; karaciğer ve böbrek yetmezliğine ilişkin ayrı uyarılar yer alıyor. Daha güvenli ve doğru hasta grubu ifadelerinin yazılması kaynak ve uzman değerlendirmesi bekliyor.
- **Birlikte kullanma:** üretici KÜB bölüm 4.4, başka parasetamol içeren ilaçlarla eş zamanlı kullanımın toplam doz aşımına yol açabileceğini vurguluyor. DiagnoRx'in tam ilaç adıyla yapılan etkileşim taraması farklı marka/kombinasyonları otomatik kapsamaz.
- **Belge sürüm farkı:** eski iki sayfalık üretici PDF'sinde azami günlük altı tablet; daha kapsamlı KÜB PDF'sinde günlük 4 g geçiyor. Bu **farklı dokümanlardan gelen** bilgi; güncel resmî onaylı KÜB sürümü teyit edilmeden hangi belgenin en yeni ruhsat koşulunu yansıttığına karar vermiyoruz.

`audit/manufacturer-parol-kub-research.json` kaynakları, dört inceleme maddesini ve onay beklediğini saklar. `node scripts/manufacturer-parol-review.cjs --write` ilgili 44 tanıyı JSON/CSV iş listelerine dönüştürür; `node tests/manufacturer-parol-review-check.cjs` sayıları ve statüleri doğrular.

## Klinik onay sınırı

- 83 reçete ve 13 kronik notun içeriği değiştirilmedi.
- 44 tanının PAROL KÜB'üyle ilişkilendirilmesi 44 **klinik onay** değildir.
- Üreticideki PDF, doğrudan güncel TİTCK belge eşleştirmesi değildir.
- Genel ortak parasetamol doz şemaları, yaş/karaciğer/böbrek/alkol/gebelik/emzirme/etkileşim değerlendirmeleri klinisyen/eczacı kontrolünden geçene kadar **değiştirilmeyecek ve onaylanmayacak**.
