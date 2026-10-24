# DiagnoRx klinik kaynak ön karşılaştırması — İkinci toplu grup (24.10.2026)

**İncelenen ilaçlar:** İbuprofen 400 mg (20 tanı kullanımı), pantoprazol 40 mg (14 kullanım), amoksisilin-klavulanat 1000 mg (8 kullanım). Toplam **42 kullanım için ürüne özgü araştırma bağlamı** tanımlandı. Bu sayı onay sayısı değildir.

**Kaynakların niteliği:** Bunlar ulaşılabilen Türkçe *eski KÜB kopyalarıdır*; üçüncü taraf web sayfalarında yayımlanmıştır. Resmî 2026 TİTCK KÜB sürümünü veya ruhsat statüsünü teyit etmedik. Bu yüzden tamamı `THIRD_PARTY_LEGACY_KUB_COPY` olarak işaretlendi. İlaç dozları, süreleri, reçeteler ve SGK notları değiştirilmedi.

## İbuprofen (20)
- Gebelik dönemleri, emzirme ve gerekirse renal/GİS/KV riskleri KÜB başlıklarında vurgulanıyor. Uygulamadaki her NSAİİ satırında bu risklerin hasta bazında kontrol edilmesi gerekiyor.
- Dismenore, migren ve diğer tanılardaki farklı doz/sıklık ifadeleri tek bir standart dozla otomatik eşitlenemez.
- [BRUFEN 400 mg 20 draje KÜB arşiv kopyası](https://www.ilacrehberi.com/v/brufen-400-mg-20-draje-a9b4/kub/) (bölümler 4.2–4.6).

## Pantoprazol (14)
- Önceki PANTO KÜB kopyasında NSAİİ ilişkili gastroduodenal ülser profilaksisi; **sürekli NSAİİ tedavisi gereksinimi ve yüksek GİS risk faktörleri** kapsamıyla sınırlanıyor. Reçete şablonundaki tüm kısa NSAİİ kullanımlarında otomatik olarak mide koruyucu gerektiği iddia edilmemeli.
- `hpylori` tanısındaki 2x1 uygulaması diğer PPI endikasyonlarının 1x1 şemalarıyla birleştirilmemeli. Kombinasyon antibiyotiklerinin uygunluğu ve güncel H. pylori rehberi ayrıca değerlendirilmelidir.
- [PANTO 40 mg Türkçe KÜB kopyası](https://www.ilacrehberi.com/v/panto-40-mg-enterik-kapli-tablet-9e51/kub/) (17 Kasım 2011 etiketli arşiv).

## Amoksisilin-klavulanat (8)
- `1000 mg` olarak bilinen AUGMENTIN-BID tabletin eski KÜB kopyasında bileşimi **875 mg amoksisilin + 125 mg klavulanik asit** olarak belirtiliyor. Uygulama verisindeki adlandırmayı ürün ve endikasyon açısından doğrulamak gerekir.
- Beta-laktam alerjisi, önceden ilaca bağlı hepatik reaksiyon ve renal fonksiyon konuları uygun tanı/ilaç satırında ayrı kontrol gerektiriyor.
- `selulit` reçetesinde hem amoksisilin-klavulanat hem sefaleksin 'ana' grupta. Birlikte mi, alternatif mi olduklarının yanlış anlaşılma ihtimali **özellikle klinisyen incelemesine** açıldı; kendi kendine iki antibiyotik kullanımı önerisi değildir.
- [AUGMENTIN-BID 1000 mg Türkçe KÜB arşiv kopyası](https://www.ilacrehberi.com/v/augmentinbid-1000-mgfilm-tablet-a91f/kub/) (9 Mayıs 2011 etiketli arşiv).

## Yeniden kullanılabilir çıktı
`audit/clinical-product-research-batch-02.json` 3 belge kimliği ve 10 klinik inceleme sorusu içerir. `scripts/product-research-batch-02.cjs --write` 42 ilgili tanı–ilaç satırını bağlayan JSON/CSV/Markdown raporu üretir. Aynı bilgiler `scripts/one-pass-review.cjs` ile üretilen genel 96 kayıt inceleme paketine de bağlandı; yeni tanılar için kapsam dinamik artar.

**Sonuç:** Önceki 44 PAROL kullanımı + bu 42 kullanım için ürün bilgi kaynakları üzerinden **araştırma başlıkları** oluştu; tıbbi doz/uygunluk onaylanmadı. Muadil ilaç sistemi son aşamada (Issue #2) kalır.
