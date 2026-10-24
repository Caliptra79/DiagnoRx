# DiagnoRx — Toplu Klinik Ön Denetim Motoru

Bu çalışma `scripts/bulk-clinical-audit.cjs` komutu ile bütün mevcut 83 RX, ileride eklenecek `js/clinical-additions.js` kayıtları ve 13 kronik notu **tek geçişte** envantere alır.

**Amaç:** Hekim ve eczacı değerlendirmesinin yükünü azaltmak. **Sınır:** Çıktı tıbbi doğrulama, uygunluk veya klinik güvenlik belgesi değildir.

## Çalıştırma

```bash
node tests/bulk-clinical-audit-check.cjs
node scripts/bulk-clinical-audit.cjs --write
```

Dosyalar `audit/generated/bulk-clinical-audit.json` ve `audit/generated/bulk-clinical-audit.md` altında üretilir. GitHub Actions, taslak Pull Request için bunları **Clinical triage reports** adlı indirilebilir test çıktısı olarak sunar. Raporların klinik bilgilerinin tamamı mevcut kaynak dosyalarından okunur, reçeteler değiştirilmez.

## Otomatik yapılan işlemler

- Tüm tanıların kapsamı, kategori bazında sayılar, kaynak metni grupları ve ilk kaynak ön inceleme durumları
- Birebir adı aynı olan ilaçların tanılar arası tekrarlarının bulunması
- Aynı ilaç adına bağlı doz/süre şemalarının birlikte gösterilmesi (**farklı şema tek başına hata değildir**)
- Basit ve değişken olmayan sayısal doz/miktar uyuşmazlıklarının yalnız aritmetik ön taraması
- Tanımlı etkileşim kombinasyonlarının koşullu olarak işaretlenmesi; alternatif tedaviler birlikte kullanılıyor varsayılmaz
- Sistemik antimikrobiyal, sistemik steroid ve NSAİİ gibi örüntülerle **önce incelenecek** tanıların sıralanması
- Eksik temel alanlar, tekrar eden ilaç satırları ve yapılandırılmış hasta durumu etiketlerinin envanteri

## Tıbbi doğrulamaya giden yol

1. **Ön tarama**: Tüm tanılar otomatik raporlanır; içerik değişmez.
2. **Kaynak eşleştirme**: Güncel Türkiye TİTCK KÜB'leri, uygun tarihli rehberler ve resmî SGK/SUT metinleri kayıt bazında karşılaştırılır.
3. **Uzman incelemesi**: Endikasyon, doz, süre, yaş, gebelik, emzirme, renal/hepatik durum, etkileşim ve sevk kriterleri kontrol edilir.
4. **Düzeltme ve ikinci inceleme**: Her gerçek tıbbi değişiklik gerekçesi, belge bağlantısı, tarih ve bağımsız inceleyen ile kaydedilir.
5. **Yayın**: CI'nin yapısal testleri başarılı olmalı; ancak tıbbi geçerlilik için insan kararı ve PR onayı ayrıca gereklidir.

**Hiç uyarı üretmeyen tanı 'güvenli' değildir.** Algoritma ürünleri tam isim üzerinden gruplar; farklı marka/etken madde eşdeğerlikleri ve tüm etkileşimler kendiliğinden çözümlenmez. Rapor klinisyen tarafından incelenmek üzere bir iş listesi üretir. Yeni tanı eklendiğinde bu liste otomatik büyür; ayrıca `tests/new-diagnosis-gate.cjs` kaynak ve inceleme metaverisini zorunlu tutar.
