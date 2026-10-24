# DiagnoRx — Gelecekte yeni tanı ekleme protokolü

**83 reçete nihai sayı değildir.** Yeni tanı verileri `js/clinical-additions.js` içindeki `RX` dizisine girilir; `js/clinical-data.js` içindeki eski 83 reçete ve 13 kronik hastalık kaydı değiştirilmez.

## Her yeni tanı için zorunlu süreç
1. Mevcut 83 tanının klinik denetimi esnasında doğrulanan TİTCK **KÜB**, uzmanlık/rehber (NICE, IDSA vb., ilgili durumlarda) ve **resmî SGK SUT** belgelerini ortak `audit/clinical-source-catalog.json` kataloğuna aktar. Her kaynak **tam URL**, yayıncı, tür, baskı/sürüm, belge tarihi, kontrol tarihi, kontrol eden kişinin adı ve uzmanlığı ile kaydedilir. Eski bir kılavuzun adını yazmak doğrulama değildir. Yeniden kullanırken güncellik ayrıca kontrol edilir.
2. Yeni tanıyı `js/clinical-additions.js` dosyasına özgün ve tekil `id` ile ekle. Reçete şeması: `id,kat,ad,icd,uygun,sevk,oneri,kaynak,ilac`; ilaç satırları için `g,n,d,s,k`, varsa `x,w,t`.
3. `audit/new-diagnosis-reviews.json` içine aynı tanı ID'siyle **kaynak ve değerlendirme kaydı** ekle. Endikasyon, tercih ve alternatifler, erişkin doz, süre/miktar, kontrendikasyon, etkileşim, gebelik, emzirme, renal/hepatik, taburculuk/sevk ve SUT başlıklarının tamamına tarihli kaynağı ve değerlendirme gerekçesini bağla.
4. **Her ilaç satırına ayrı doğrulama** ekle: sıra indeksi ve ilaç adı, dayanak kaynaklar; doz/sıklık, süre/miktar, gebelik/emzirme, böbrek/karaciğer ve etkileşim değerlendirmeleri. SUT kapsam dışındaysa yalnız `sut` başlığı `NOT_APPLICABLE` olabilir; gerekçe zorunludur.
5. Birincil klinik inceleyen ve ondan farklı bağımsız inceleyen kişi; **adı, yetkinliği ve inceleme tarihi** ile belgelenir.
6. `node tests/new-diagnosis-gate.cjs` ve tüm GitHub Actions kontrolleri başarılı olmalı. Ayrıca gerçek klinisyen/eczacı kaynakları ve tıbbi içeriği insan gözüyle doğrulamalı; PR ana dala ancak sahip onayıyla birleştirilmelidir.

## Kaynak kaydı örneği — yalnızca şema, doğrulanmış belge DEĞİLDİR
```json
{"id":"kub-belge-id","kind":"KUB","title":"Tam belge başlığı",
 "publisher":"Resmî yayıncı","url":"https://resmi-kurum.example/belge",
 "version":"Baskı/sürüm","documentDate":"YYYY-MM-DD",
 "checkedOn":"YYYY-MM-DD","status":"VERIFIED",
 "verifiedBy":{"name":"İnceleyen","qualification":"Uzmanlık"}}
```

## Sınırlar
- **Mevcut 83 kayıt henüz klinik olarak doğrulanmadı.** Kaynak kataloğu bilinçli olarak boş; doğrulama tamamlandıkça gerçek sürümlü kaynaklarla doldurulacak. Yeni reçete henüz eklenmedi.
- CI yalnız **inceleme ve kaynak metaverilerinin eksik olup olmadığını** saptar. İlaçların tıbben doğru olduğunu, kaynak URL'sinin içeriğini veya bir klinisyenin kimliğini otomatik doğrulayamaz.
- Bütün reçeteler için hasta güvenliği, ürün ruhsatı, KÜB geçerliliği ve güncel geri ödeme hükümleri ayrıca teyit edilmelidir.
- Bu kontrolleri aşarak yapılan doğrudan GitHub birleşmeleri sistemin korumalarını geçersiz kılabilir; dal koruma/manuel PR onayı gereklidir.
