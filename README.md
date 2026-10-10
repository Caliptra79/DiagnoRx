# Tanıya Göre Hazır Reçete (PWA)

Acil servis ve aile hekimliği için tanıya göre hazır reçete önerileri. Tek sayfalık, çevrimdışı çalışabilen ve telefonun ana ekranına eklenebilen web uygulaması.

## Dosyalar
- `index.html`: uygulamanın kendisi
- `manifest.webmanifest`: uygulama adı, renkleri ve simgeleri
- `sw.js`: çevrimdışı çalışmayı sağlayan service worker
- `icons/`: uygulama simgeleri (192, 512, maskable 512, Apple 180, favicon)

## GitHub Pages'te yayınlama
1. GitHub'da yeni bir depo (repository) oluşturun, örneğin `hazir-recete`. Depo herkese açık (public) olmalı.
2. Bu klasördeki tüm dosyaları ve `icons` klasörünü depoya yükleyin (Add file > Upload files). `index.html` deponun ana dizininde olmalı.
3. Settings > Pages bölümünde "Deploy from a branch" seçin; Branch olarak `main`, klasör olarak `/ (root)` seçip Save'e basın.
4. Bir iki dakika sonra adres hazır olur: `https://KULLANICI-ADINIZ.github.io/hazir-recete/`

## Telefona ekleme
- **Android (Chrome):** menü (⋮) > "Ana ekrana ekle" veya "Uygulamayı yükle".
- **iPhone (Safari):** Paylaş düğmesi > "Ana Ekrana Ekle".

Birkaç saniye internet bağlantısıyla bir kez açıldıktan sonra uygulama çevrimdışı da çalışır.

## İçerik güncelleme
`index.html` dosyasını değiştirip depoya yükledikten sonra `sw.js` içindeki `CACHE` sürümünü artırın (`hazir-recete-v1` yerine `hazir-recete-v2`). Böylece kullanıcıların telefonundaki eski kopya yenilenir.

## Önemli not
Bu bir karar destek taslağıdır. Dozlar ve piyasa adları yayın öncesinde güncel prospektüs ve ilaç listeleriyle doğrulanmalıdır; reçete sorumluluğu hastayı muayene eden hekime aittir.
