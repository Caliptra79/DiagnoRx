# DiagnoRx — Klinik Kaynak Karşılaştırması / İlk Grup
**Tarih:** 24 Ekim 2026
**Kayıtlar:** `usye`, `gas`, `sinuzit` (83 hazır reçeteden ilk üçü)
**Durum:** KAYNAK ÖN İNCELEMESİ, KLİNİK ONAY DEĞİL.

Tespitler orijinal reçete, doz, süre veya SUT metnini değiştirmez. Kaynakların yayın tarihini ve görünen önerilerini karşılaştırır; Türkiye ruhsatlı ürün KÜB'leri, güncel SGK kuralları, karşılaştırılmayan ilaçlar ve bağımsız klinisyen/eczacı denetimi tamamlanmadan `VERIFIED` denemez.

## 1. Akut Viral ÜSYE / Farenjit (`usye`)
- **Uyumlu ön bulgu:** Reçetede antibiyotik bulunmuyor ve açıklamada viral enfeksiyon için antibiyotik gerekmediği belirtiliyor. CDC'nin 11 Mart 2026 tarihli soğuk algınlığı yaklaşımı antibiyotiklerin viral enfeksiyonda yarar sağlamadığını vurguluyor.
- **Açık alan:** Benzidamin %0,15 ürününün püskürtme sıklığı, gebelik/emzirme işaretlemesi ve diğer destek ürünleri için Türkiye'de geçerli KÜB doğrulanmadı. NICE NG84, viral farenjitte kendi kendine bakım yaklaşımını destekliyor; tek tek yerel ürünleri doğrulamıyor.
- **Sonuç:** `RESEARCHED_PENDING_CLINICAL_REVIEW`. Klinik kaynak araştırması yapıldı, reçete bütünü **onaylanmadı**.

## 2. A grubu streptokok farenjiti (`gas`)
- **YÜKSEK öncelik — Test/tedavi eşiği:** Uygulama `Centor/McIsaac ≥3 veya hızlı antijen pozitif` ifadesini kullanıyor. CDC 18 Kasım 2025 rehberi, belirgin viral bulgu yoksa mikrobiyolojik doğrulamayı vurguluyor; NICE NG84 ise Centor/FeverPAIN ile hemen veya ertelenmiş reçete kararı sunabiliyor. Bu iki yaklaşım birlikte sanki aynı tanısal doğrulama düzeyindeymiş gibi kullanılmamalı; hekim hangi algoritmanın benimsenmesine karar vermeli.
- **YÜKSEK öncelik — Azitromisin:** Mevcut reçetede `500 mg 1x1, 3 gün` yazıyor. CDC'nin GAS alternatifi erişkinde `ilk gün 500 mg, sonraki dört gün 250 mg` olarak geçiyor. Fark gerçek; **hangi rejimin Türkiye ürün KÜB'üne ve yerel dirence uygun olduğu bağımsız denetlenmeli**. Doz otomatik değiştirilmedi.
- **Orta öncelik — Fenoksimetilpenisilin:** Uygulama `1.000.000 IU, 3x1, 10 gün` içeriyor. CDC mg bazında seçenekler sunuyor. Yerel ürünün IU–mg eşdeğerliği, tedarik edilebilirliği ve miktarı henüz doğrulanmadı.
- **Kaynaklar:** CDC 2025 GAS; NICE NG84; IDSA 2025 GAS güncellemesi. IDSA güncellemesinin bu turdaki tüm ilaç ayrıntılarını kapsadığı varsayılmadı.

## 3. Akut Rinosinüzit (`sinuzit`)
- **YÜKSEK öncelik — Antibiyotik kararı:** AAO-HNSF 31 Temmuz 2025 güncellemesi, takip güvencesi sağlanmış komplikasyonsuz erişkin ABRS'de başlangıçta antibiyotiksiz izlem seçeneğini açıkça öneriyor; antibiyotik gerekirse çoğu erişkin için amoksisilin ± klavulanat 5–7 günü belirtiyor. Uygulamadaki antibiyotik seçiminin gerekçesi ve izlem algoritması yeniden değerlendirilmelidir.
- **Orta öncelik — Nazal steroid:** Mevcut mometazon talimatı `her buruna 2 püskürtme 1x1`; NICE NG79'da araştırılan yüksek doz örneği `200 mcg günde iki kez, 14 gün` olarak belirtilmiş ve ilgili uygulamanın ruhsat dışı olabileceği uyarılmış. Bunlar eşdeğer tedaviler değildir; kullanım amacı/ürün KÜB'ü ayrıca incelenmelidir.
- **Orta öncelik — Doksisiklin:** NICE NG79 ilk gün 200 mg ardından 4 gün 100 mg şeklinde alternatif sunar, uygulamadaki 100 mg iki kez 5–7 günden farklıdır. Farklı ülkelerin rehberleri ve Türkiye KÜB'ü karşılaştırılmalı.

## İncelenen tarihli belgeler
- [CDC Common Cold, 11.03.2026](https://www.cdc.gov/common-cold/treatment/)
- [CDC GAS pharyngitis, 18.11.2025](https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html)
- [NICE NG84, 26.01.2018](https://www.nice.org.uk/guidance/ng84/chapter/Recommendations)
- [NICE NG79, 27.10.2017](https://www.nice.org.uk/guidance/ng79/chapter/Recommendations)
- [AAO-HNSF Adult Sinusitis Update, 31.07.2025](https://aao-hnsfjournals.onlinelibrary.wiley.com/doi/10.1002/ohn.1344)
- [IDSA GAS Part 1 Update, 14.10.2025](https://www.idsociety.org/practice-guideline/streptococcal-pharyngitis2/)

## İzleme ve onay sınırı
Bu raporun makine okunabilir kaydı `audit/clinical-source-research-2026-10-24.json` içindedir. Üç satır `audit/clinical-review-matrix.csv` içinde `RESEARCHED_PENDING_CLINICAL_REVIEW` konumuna ilerletildi; kalan 93 satır `NOT_REVIEWED` durumunda kaldı. **Doğrulanmış/klinik onaylı tanı sayısı: 0**. TİTCK KÜB, SGK SUT ve hekim/eczacı imzalı değerlendirmeler tamamlandığında farklı, kontrollü bir onay aşamasına geçilecek.
