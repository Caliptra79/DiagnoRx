# DiagnoRx — Eski resmî SGK kaydından ürün kimliği araştırması

**24 Ekim 2026 | 8 tarihsel ürün kaydı | 4 jenerik ilaç tanımı | 0 güncel KÜB ve 0 klinik onay**

Eski bir [SGK bedeli ödenecek ilaçlar listesinde](https://www.sgk.gov.tr/Download/DownloadFile?d=643de414-8e38-44bd-82cb-7374bdc512f8&f=43584068-00e1-41e1-8936-0ef97a5a60a4.pdf) (yaklaşık 2011 dönemi, tam yayın tarihi doğrulanmadı) PAROL, BRUFEN, PANTO ve AUGMENTIN-BID için barkodla birlikte ürün tanımları bulundu. PDF sayfaları sırasıyla 152, 42, 151 ve 33. Bu veri **yalnız eski listede bu ürün/barkodların yer aldığını** gösterir. Görsel PDF incelemesi teknik erişim nedeniyle tamamlanamadı; metin aktarımı ürün bazında ayrıca kontrol edilmelidir.

`audit/kub-historical-leads.json` sekiz ayrı ürün kaydı tutar. Bu kayıtlar `audit/kub-product-candidates.json` dosyasındaki güncel ürün adaylarıyla **bilinçli biçimde birleştirilmedi**. Güncel ruhsatlı ürün, geçerli barkod, ruhsat sahibi, TİTCK belgesi ve KÜB revizyon tarihi bulunmadan böyle bir birleştirme yapılmamalıdır.

### Araştırma sırası
1. Eski listede görünen ad, ambalaj ve barkodu belgenin ilgili sayfasından gözle kontrol et.
2. TİTCK'nin **güncel** ruhsatlı ürün ve [KÜB/KT](https://www.titck.gov.tr/kubkt) kayıtlarında aynı ürünün hâlâ mevcut olup olmadığını araştır.
3. Gerçek geçerli ürün, GTIN, ruhsat sahibi, farmasötik form ve doğrudan KÜB URL'sini farklı bir kişiyle karşılaştır.
4. Son olarak tanı/ilaç özelinde doz, süre, etkileşim ve SUT hükümlerini ayrıca incele.

### Dosyalar ve durum
`node tests/kub-historical-leads-check.cjs` ve `node scripts/kub-historical-leads.cjs --write`, GitHub Actions artefaktına CSV, JSON ve Markdown raporları ekler. Testler tarihsel bir kanıtın yanlışlıkla `KUB_DOCUMENT_LOCATED` veya `VERIFIED` olarak gösterilmesini engeller. GTIN algoritmik geçerliliği, güncel ruhsat veya barkodun o ürüne ait olduğunu **kanıtlamaz**.

**Reçeteler ve 83 tanı değişmedi.** İlk sekiz jenerik ilaçtan dördü için yalnız araştırmayı hızlandıran tarihsel ürün adayları bulundu; klinik doğrulama tamamlanmadı.
