# DiagnoRx — İlk KÜB Eşleştirme Grubu (24 Ekim 2026)

**Durum: RESMÎ ÜRÜN BELGESİ EŞLEŞTİRME BEKLİYOR, KLİNİK DOĞRULAMA YAPILMADI.**

Doğrulama sürecinde bir darboğaz saptandı: Reçetelerimizdeki jenerik ilaç adları çoğu zaman tek bir Türkiye ruhsatlı müstahzara işaret etmiyor. TİTCK'nin resmî KÜB/KT sayfası ürün adı, firma, KÜB onay tarihi ve belge sütunlarını içeriyor; ancak bu sayfanın halka açık HTML görünümü ürün bazlı listeyi otomatik sunmadığından bu turda hiçbir spesifik belgenin URL'si güvenilir biçimde eşleştirilemedi.

Resmî KÜB/KT arama sayfası: https://www.titck.gov.tr/kubkt
İTS Mobil (Sağlık Bakanlığı): https://play.google.com/store/apps/details?id=tr.gov.saglik.itsmobil

## İlk sekiz araştırma hedefi

| Reçetedeki jenerik tanım | Geçtiği tanı sayısı | Ön aşama |
|---|---:|---|
| Parasetamol 500 mg tablet | 44 | Ürün ve barkod eşleştirme bekliyor |
| İbuprofen 400 mg tablet | 20 | Ürün ve barkod eşleştirme bekliyor |
| Pantoprazol 40 mg tablet | 14 | Ürün ve barkod eşleştirme bekliyor |
| Naproksen sodyum 550 mg tablet | 14 | Ürün ve barkod eşleştirme bekliyor |
| Diklofenak %1 jel | 10 | Ürün ve barkod eşleştirme bekliyor |
| Amoksisilin-klavulanat 1000 mg tablet | 8 | Ürün ve barkod eşleştirme bekliyor |
| Setirizin 10 mg tablet | 7 | Ürün ve barkod eşleştirme bekliyor |
| Deksketoprofen 25 mg tablet | 7 | Ürün ve barkod eşleştirme bekliyor |

Toplam **124 tanı–ilaç eşleşmesinin** ortak belge araştırmasını bu sekiz jenerik tanım üzerinden organize edebiliriz (kullanımlar farklı tanılarda çakışabilir). Ancak 124 kullanımın hiçbirisi henüz tek tek klinik açıdan onaylanmış değildir.

## Belge kabul şartları

Bir ürün adına 'KÜB belgesi bulundu' denebilmesi için: Türkiye ruhsatlı **tam marka/ürün**, ruhsat sahibi, 13 haneli **doğrulanan GTIN**, güç ve form, doğrudan HTTPS KÜB belge bağlantısı, belgenin revizyon/onay tarihi ve belgeyi kontrol eden kişi gerekir. Ortak kayıttaki marka/ürün doğru seçilse bile tanı başına uygunluk, doz, miktar ve SUT denetimi ayrı kalır.

`scripts/kub-first-batch.cjs --write` komutu GitHub Actions içinde CSV, JSON ve Markdown çıktısı oluşturur. CSV'deki boş marka/barkod/belge alanları **bilinçli olarak boş** bırakılmıştır. İleride 83'e yeni tanı eklendiğinde ilk sekiz listesi aynı verilerden yeniden hesaplanır.

**Uyarı:** Bu araştırma notu ilaç seçimi, doz önerisi veya otomatik klinik geçerlilik raporu değildir.
