# DiagnoRx — Tüm tanıların tek çalışmada denetim paketi

Bu sistem, 83 reçete, 13 kronik/SUT notu ve mevcut 282 ilaç satırını TEK çalışmada bir klinik araştırma iş listesine dönüştürür.

## Kullanım

    node tests/one-pass-review-check.cjs
    node scripts/one-pass-review.cjs --write

Github Actions otomatik testlerinde çalışma paketine altı yeni dosya eklenir:
- all-records-review.json: 96 kaydın ve 282 ilaç kullanımının tüm ayrıntıları ve ayrı kontrol listeleri.
- all-records-review.md: 83 tanı ve 13 kronik not için okunabilir genel rapor.
- all-rx-clinical-review.csv: Tanı bazında kaynak, ön tarama ve kontrol sırası.
- all-chronic-sut-review.csv: 13 kronik notta güncel SGK/SUT metni, rapor ve uzmanlık koşulları.
- all-medicine-use-review.csv: Her ilacın bağımsız doz, süre, miktar, kontrendikasyon ve KÜB incelemesi.
- all-product-kub-queue.csv: Tekrarlanan tam ilaç adları için ortak ürün belge araması.

## Ne tek seferde biter, ne bitmez?

Tamamlanan: Kayıt sayımı, ön tarama, tekrarlı ürün gruplama, ilk kaynak araştırmalarının bağlanması, eksik klinik onay alanları ve kapsamlı görev paketinin hazırlanması.

Tamamlanmayan: 80 tanının ayrı rehber/endikasyon karşılaştırması, 13 kronik notun ilgili SUT madde/ekleri, 282 ilaç kullanımının gerçek klinik kontrolü ve bugünkü ürün bazında güncel TİTCK KÜB uygunluğu.

Her RX için 12, her KR için 7 ayrı kontrol konusu REQUIRES_INDEPENDENT_REVIEW olarak işaretlidir. Bu alanlar otomatik VERIFIED yapılamaz. Kaynak başlangıç noktaları TİTCK KÜB/KT ve SGK 02.10.2026 SUT olup her kural ayrı incelenmelidir.

Yeni tanı eklendiğinde aynı araç kapsamı otomatik büyütür. Muadil ilaç özelliği (Issue #2) sonra ele alınacaktır. Mevcut klinik veri asla değiştirilmez.
