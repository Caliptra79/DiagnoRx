/* DiagnoRx baseline prescription data extracted verbatim from index.html.
 * Every clinical statement is UNVERIFIED pending independent source review.
 * This file does NOT make a medical validity or SUT compliance claim.
 */
(function(root){
"use strict";
/* BEGIN UNMODIFIED CLINICAL DATA */
const NS = ["nsaid","renal","preg","cvd"];

/* ---------- Ortak ilaç satırları ---------- */
const PCM = {g:"destek",n:"Parasetamol 500 mg tablet",d:"3x1 (gerekirse 4x1; en çok 4 g/gün)",s:"3–5 gün",k:"1 kutu",t:"Karaciğer hastalığı veya düzenli alkol kullanımında günlük üst sınırı 2–3 g tutun."};
const IBU = {g:"destek",n:"İbuprofen 400 mg tablet",d:"3x1 (tok karnına)",s:"3–5 gün",k:"15 tb",t:"En kısa süre, en düşük dozla kullanın.",x:NS};
const PPI = {g:"destek",n:"Pantoprazol 40 mg tablet",d:"1x1, sabah aç karnına",s:"NSAİİ süresince",k:"7–14 tb",t:"Yaşlı, ülser öyküsü, steroid veya antikoagülan kullanımı gibi GİS risk varsa ekleyin."};
const ORS = {g:"ana",n:"Oral rehidratasyon tuzu (ORS) poşet",d:"Her sulu dışkı veya kusmadan sonra 200–400 ml (1 poşet 1 litre suda)",s:"İshal sürdükçe",k:"10 poşet (2 poşetlik 5 kutu)"};

/* ---------- Reçete verisi ---------- */
const RX = [
{id:"usye",kat:"Solunum / KBB",ad:"Akut Viral Üst Solunum Yolu Enfeksiyonu ve Farenjit",icd:"J06.9, J02.9",
 uygun:"Genel durum iyi, solunum sıkıntısı yok, sıvı alabiliyor, semptomlar 10 günden kısa.",
 sevk:["Nefes darlığı, SpO2 %94'ün altında, stridor","Trismus, uvula deviasyonu, tek taraflı tonsil şişliği (peritonsiller apse şüphesi)","Ense sertliği, bilinç değişikliği","3 günden uzun süren yüksek ateş veya 10 günü aşan semptom"],
 ilac:[ {...PCM},
  {g:"destek",n:"Benzidamin %0,15 oral sprey",d:"4 püskürtme, günde 3–6 kez",s:"5–7 gün",k:"1 şişe (30 ml)",t:"Astım öyküsü olanlarda dikkatli kullanın. Gebelik ve emzirmede prospektüse bakın.",x:["preg"]},
  {g:"destek",n:"Burun serum fizyolojik veya deniz suyu spreyi",d:"Günde 3–4 kez",s:"Semptom süresince",k:"1 adet",t:"Reçetesiz."},
  {...IBU,g:"alt"} ],
 oneri:["Bol sıvı ve dinlenme.","Viral tablo 7–10 günde düzelir; antibiyotik gerekmez.","Ateş 3 günü geçerse veya nefes darlığı gelişirse yeniden başvurması söylenmeli."],
 kaynak:"Akılcı antibiyotik kullanımı ilkeleri; farenjit ve ÜSYE için NICE/IDSA yaklaşımı (genel)"},

{id:"gas",kat:"Solunum / KBB",ad:"Akut Tonsilofarenjit (A Grubu Streptokok Şüphesi)",icd:"J03.0, J02.0",
 uygun:"Centor/McIsaac puanı 3 ve üzeri veya hızlı antijen testi pozitif; hasta oral alabiliyor, hava yolu sorunu yok.",
 sevk:["Peritonsiller apse bulguları (trismus, uvula deviasyonu)","Yutamama, salya akıtma, boyunda şişlik","Stridor veya siyanoz","Bağışıklık baskılanması veya akut romatizmal ateş öyküsü"],
 ilac:[
  {g:"ana",n:"Fenoksimetilpenisilin 1.000.000 IU tablet",d:"3x1",s:"10 gün",k:"30 tb (24'lük kutudan 2 kutu)",x:["pcn"]},
  {g:"ana",n:"Benzatin penisilin G 1.200.000 IU flakon (IM)",d:"Tek doz, derin IM",s:"Tek doz",k:"1 flakon",t:"Tedaviye uyumu şüpheli hastada tercih edilir; enjeksiyon ağrılıdır.",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Azitromisin 500 mg tablet",d:"1x1",s:"3 gün",k:"3 tb",t:"Makrolid direnci bölgesel olarak değişir."},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"10 gün",k:"60 kps (16'lık 4 kutu)"},
  {...PCM}, {...IBU} ],
 oneri:["Antibiyotik tedavisi tamamlanmalı; belirtiler geçse de erken bırakılmamalı.","Hasta ilk 24 saat antibiyotikten sonra bulaştırıcılığını yitirir."],
 kaynak:"IDSA A grubu streptokok farenjit rehberi; Centor/McIsaac skorlaması"},

{id:"sinuzit",kat:"Solunum / KBB",ad:"Akut Rinosinüzit",icd:"J01.9",
 uygun:"Orbital veya nörolojik bulgu yok; genel durum iyi.",
 sevk:["Göz çevresinde şişlik, görme bozukluğu, çift görme","Şiddetli baş ağrısı, ense sertliği, nörolojik bulgu","Yüksek ateşle birlikte hızla kötüleşme"],
 ilac:[
  {g:"ana",n:"Mometazon furoat nazal sprey 50 mcg",d:"Her buruna 2 püskürtme, 1x1",s:"2–3 hafta",k:"1 şişe"},
  {g:"ana",c:"Yalnızca antibiyotik endikasyonu varsa (10 günü aşan semptom, ağır başlangıç, çift dalga)",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Doksisiklin 100 mg kapsül",d:"2x1 (günlük toplam 200 mg)",s:"5–7 gün",k:"10–14 kps (14'lük kutu)",t:"Gebelikte ve 8 yaş altında kullanılmaz.",x:["preg"]},
  {g:"destek",n:"Burun serum fizyolojik yıkama",d:"Günde 2–3 kez",s:"Semptom süresince",k:"1 adet",t:"Reçetesiz."},
  {...PCM} ],
 oneri:["Bakteriyel sinüzit seyrektir; çoğu olgu antibiyotiksiz düzelir.","Topikal dekonjestan (oksimetazolin) 3 günden uzun kullanılmamalı."],
 kaynak:"IDSA/AAO-HNS rinosinüzit yaklaşımı (genel)"},

{id:"otit",kat:"Solunum / KBB",ad:"Akut Otitis Media",icd:"H66.9",
 uygun:"Mastoidit, yüz felci veya santral bulgu yok; genel durum iyi.",
 sevk:["Mastoid bölgede şişlik ve hassasiyet","Yüz felci, vertigo, işitme kaybı","Ense sertliği, yüksek ateş ve toksik görünüm"],
 ilac:[
  {g:"ana",c:"Antibiyotik endikasyonu varsa (şiddetli ağrı veya ateş, bilateral, otore, 48–72 saatte düzelmeme)",n:"Amoksisilin 1000 mg tablet",d:"2x1",s:"5–7 gün",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Amoksisilin yanıtsız veya son 30 günde antibiyotik kullanmış",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"7 gün",k:"14 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Azitromisin 500 mg tablet",d:"1x1",s:"3 gün",k:"3 tb"},
  {...PCM},{...IBU} ],
 oneri:["Antibiyotiksiz izlem seçilecekse 48–72 saat sonra yeniden değerlendirme planlanmalı.","Kulak içine su kaçırılmamalı."],
 kaynak:"AAP/NICE akut otitis media yaklaşımı (genel)"},

{id:"dis-kulak",kat:"Solunum / KBB",ad:"Akut Dış Kulak Yolu Enfeksiyonu",icd:"H60.3",
 uygun:"Kulak çevresinde yayılan selülit yok; diyabet veya bağışıklık sorunu yok.",
 sevk:["Diyabetik veya yaşlı hastada şiddetli ağrı ve granülasyon (malign otitis externa şüphesi)","Kulak kepçesi veya yüze yayılan selülit","Fasiyal paralizi"],
 ilac:[
  {g:"ana",n:"Siprofloksasin + deksametazon kulak damlası %0,3 + %0,1",d:"3 damla, günde 2 kez",s:"7 gün",k:"1 şişe (5 ml)",t:"Timpan zarı perforasyonu olasılığında aminoglikozitli damla kullanmayın."},
  {...PCM},{...IBU,g:"alt"} ],
 oneri:["Kulak kuru tutulmalı; duş ve yüzmede kulak tıkanmalı.","Kulak çubuğu kullanılmamalı."],
 kaynak:"AAO-HNS dış kulak yolu enfeksiyonu rehberi (genel)"},

{id:"alerjik",kat:"Solunum / KBB",ad:"Alerjik Rinit",icd:"J30.4",
 uygun:"Nefes darlığı yok; tek taraflı burun tıkanıklığı veya kanama yok.",
 sevk:["Nefes darlığı veya hışıltı (astım alevlenmesi)","Tek taraflı kalıcı burun tıkanıklığı, burun kanaması"],
 ilac:[
  {g:"ana",n:"Setirizin 10 mg tablet",d:"1x1 (akşam)",s:"2–4 hafta",k:"28 tb",t:"Böbrek yetmezliğinde doz yarıya indirilir; sedasyon yapabilir.",w:["renal"]},
  {g:"ana",n:"Mometazon furoat nazal sprey 50 mcg",d:"Her buruna 2 püskürtme, 1x1",s:"2–4 hafta",k:"1 şişe"},
  {g:"alt",n:"Feksofenadin 180 mg tablet",d:"1x1",s:"2–4 hafta",k:"28 tb",t:"Daha az sedasyon yapar.",w:["renal"]},
  {g:"alt",n:"Desloratadin 5 mg film tablet",d:"1x1",s:"2–4 hafta",k:"20 tb (1 kutu)",t:"Gebelik ve emzirmede önerilmez (KT); şiddetli böbrek yetmezliğinde dikkatli kullanın.",x:["preg"],w:["renal"]} ],
 oneri:["Bilinen tetikleyiciden (polen, toz akarı, hayvan tüyü) kaçınma önerilir.","Nazal steroidin etkisi birkaç günde tam ortaya çıkar."],
 kaynak:"ARIA alerjik rinit yaklaşımı (genel)"},

{id:"bronsit",kat:"Solunum / KBB",ad:"Akut Bronşit",icd:"J20.9",
 uygun:"SpO2 %94 ve üzeri, solunum sayısı normal, ateş 3 günü aşmıyor, pnömoni bulgusu yok.",
 sevk:["Takipne, SpO2 %94'ün altında, yan ağrısı, lokal ral","Kanlı balgam","Kronik akciğer hastalığı veya yaşlılıkla birlikte ateş (akciğer grafisi gerekir)"],
 ilac:[
  {g:"destek",n:"Asetilsistein 600 mg efervesan tablet",d:"1x1",s:"5–7 gün",k:"7 tb",t:"Kanıt düzeyi sınırlıdır; isteğe bağlıdır."},
  {g:"destek",n:"Ambroksol 30 mg tablet",d:"3x1",s:"5–7 gün",k:"20 tb (1 kutu)",t:"Balgamlı öksürükte; kanıt düzeyi sınırlıdır, isteğe bağlıdır. Gebelik ve emzirmede önerilmez.",w:["preg","renal"]},
  {g:"alt",c:"Yalnızca kuru ve uykuyu bölen öksürükte",n:"Butamirat sitrat 50 mg depo tablet",d:"2x1 (12 yaş üstü)",s:"En çok 7 gün",k:"14 tb (10'luk 2 kutu)",t:"Asetilsistein ve ambroksol gibi ekspektoranlarla birlikte kullanılmaz; gebeliğin ilk 3 ayında kaçının; dikkat azalmasına neden olabilir.",w:["preg"]},
  {...PCM} ],
 oneri:["Antibiyotik önerilmez; öksürük 2–3 hafta sürebilir.","Sigara ve dumandan uzak durmalı, bol sıvı almalı."],
 kaynak:"NICE alt solunum yolu enfeksiyonları; Sağlık Bakanlığı akılcı antibiyotik ilkeleri (genel)"},

{id:"tkp",kat:"Solunum / KBB",ad:"Toplum Kökenli Pnömoni (Hafif, Ayaktan Tedavi)",icd:"J18.9",
 uygun:"CURB-65 puanı 0–1, SpO2 %94 ve üzeri, oral alabiliyor, yakın izlem sağlanabiliyor. Akciğer grafisi ile doğrulanmalı.",
 sevk:["CURB-65 puanı 2 ve üzeri","SpO2 %94'ün altında, takipne, hipotansiyon, konfüzyon","Oral ilaç alamama, sosyal destek yokluğu","Önemli komorbidite (KKY, ileri KOAH, immünsüpresyon)"],
 ilac:[
  {g:"ana",c:"Komorbidite yok, 65 yaş altı",n:"Amoksisilin 1000 mg tablet",d:"3x1",s:"5–7 gün",k:"15–21 tb",x:["pcn"]},
  {g:"ana",c:"Komorbidite var veya 65 yaş üstü",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"7 gün",k:"14 tb",x:["pcn"]},
  {g:"ana",c:"Komorbidite var veya 65 yaş üstü (üstteki ilaca ekleyin)",n:"Azitromisin 500 mg tablet",d:"1x1",s:"3 gün",k:"3 tb",t:"QT uzaması riski olan hastada dikkatli olun.",w:["cvd"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Levofloksasin 750 mg tablet",d:"1x1",s:"5 gün",k:"5 tb",t:"Tendon, QT ve CNS yan etkileri açısından uyarın; doz böbrek fonksiyonuna göre ayarlanır. SUT: pnömonide kısıtlama yok; diğer endikasyonlarda kültür-antibiyogram sonucu gerekir.",x:["preg"],w:["renal","cvd"]},
  {...PCM} ],
 oneri:["48–72 saatte klinik düzelme olmazsa yeniden başvuru veya sevk.","Bol sıvı, dinlenme; sigara bırakma önerisi."],
 kaynak:"TTD/EKMUD ve IDSA/ATS toplum kökenli pnömoni rehberleri; CURB-65"},

{id:"astim",kat:"Solunum / KBB",ad:"Hafif Astım Alevlenmesi",icd:"J45.9",
 uygun:"Başlangıç tedavisine yanıt alınmış, SpO2 %94 ve üzeri, cümle kurabiliyor, tepe akım hızı kişisel en iyinin yaklaşık %70'inin üzerinde.",
 sevk:["Konuşamama, yardımcı solunum kası kullanımı","SpO2 %92'nin altında, bilinç değişikliği","Başlangıç tedavisine yetersiz yanıt","Önceden yoğun bakım veya entübasyon öyküsü"],
 ilac:[
  {g:"ana",n:"Salbutamol 100 mcg/püskürtme inhaler",d:"2–4 püskürtme (hazneyle), 4–6 saatte bir; sonra gerektiğinde",s:"2–3 gün",k:"1 inhaler",t:"Tremor ve çarpıntı olabilir.",w:["cvd"]},
  {g:"ana",n:"Metilprednizolon 16 mg tablet (prednizolon eşdeğeri)",d:"Sabah 2 tb (32 mg), tek doz",s:"5 gün",k:"10 tb",t:"Diyabetlilerde kan şekeri yükselebilir; 5 günde azaltmadan kesilebilir.",w:["nsaid"]} ],
 oneri:["Kontrolör (inhaler steroid) tedavisinin başlanması veya ayarlanması için 1–2 hafta içinde aile hekimi veya göğüs hastalıkları kontrolü.","İnhaler tekniği gösterilmeli."],
 kaynak:"GINA astım alevlenmesi yaklaşımı (genel)"},

{id:"age",kat:"Sindirim",ad:"Akut Gastroenterit (Erişkin)",icd:"A09, K52.9",
 uygun:"Dehidratasyon yok veya hafif, oral alabiliyor, ateş yüksek değil, kan yok.",
 sevk:["Orta-ağır dehidratasyon, oral sıvı alamama","Kanlı dışkı, yüksek ateş, şiddetli karın ağrısı","7 günü aşan ishal","Gebe, yaşlı, bağışıklığı baskılanmış veya yeni antibiyotik/hastane öyküsü"],
 ilac:[ {...ORS},
  {g:"destek",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 1–2 gün",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]},
  {g:"destek",c:"Yalnızca ateşsiz ve kansız ishalde",n:"Loperamid 2 mg tablet",d:"İlk doz 4 mg, sonra her sulu dışkıdan sonra 2 mg (en çok 8 mg/gün)",s:"En çok 48 saat",k:"10 tb",x:["preg"]},
  {g:"destek",n:"Saccharomyces boulardii 250 mg kapsül",d:"2x1",s:"5 gün",k:"10 kps",t:"İsteğe bağlı; etkisi sınırlıdır."},
  {...PCM,t:"Ateş veya ağrı için; NSAİİ'den kaçının."} ],
 oneri:["Sıvı ve tuz kaybı yerine konmalı; küçük yudumlarla sık sıvı.","Antibiyotik rutin gerekmez; kanlı ishal veya seyahat öyküsünde ayrıca değerlendirilmeli.","Tuvalet sonrası el hijyeni vurgulanmalı."],
 kaynak:"ACG/ESPGHAN-IDSA gastroenterit yaklaşımı (genel)"},

{id:"dispepsi",kat:"Sindirim",ad:"Dispepsi / Gastroözofageal Reflü",icd:"K30, K21.9",
 uygun:"Alarm semptom yok; göğüs ağrısı kardiyak nedenden ayrılmış.",
 sevk:["Disfaji, kilo kaybı, tekrarlayan kusma, hematemez/melena, anemi","50 yaş üstü yeni başlangıç","Eforla artan göğüs ağrısı (önce kardiyak değerlendirme)"],
 ilac:[
  {g:"ana",n:"Pantoprazol 40 mg tablet",d:"1x1, sabah aç karnına",s:"4 hafta",k:"28 tb"},
  {g:"alt",n:"Esomeprazol 20 mg enterik kaplı tablet",d:"1x1, sabah aç karnına",s:"4 hafta",k:"28 tb (1 kutu)",t:"Pantoprazolün yerine kullanılır; ikisini birlikte yazmayın."},
  {g:"destek",n:"Alginat/antasit süspansiyon",d:"Yemeklerden sonra ve yatarken 10–20 ml, gerektiğinde",s:"2 hafta",k:"1 şişe"} ],
 oneri:["Tetikleyici yiyecekler, sigara, alkol ve gece geç yemekten kaçınılmalı.","NSAİİ kullanımı varsa sorgulanıp kesilmeli.","4 haftada düzelme olmazsa kontrol."],
 kaynak:"ACG dispepsi ve GÖRH rehberleri (genel)"},

{id:"kolik",kat:"Sindirim",ad:"Spazmodik Karın Ağrısı (Fonksiyonel / İBS Alevlenmesi)",icd:"R10.4, K58",
 uygun:"Akut batın dışlanmış; peritonizm, defans ve ateş yok; ağrı karakteri tipik.",
 sevk:["Defans, rebound, ateş, ısrarlı kusma","Sağ alt kadran veya epigastrik şiddetli ağrı (apandisit, pankreatit, safra yolu)","Yaşlıda yeni başlangıç ağrı; gebelik şüphesi","Kanlı dışkı veya siyah dışkı"],
 ilac:[
  {g:"ana",n:"Hiyosin butilbromür 10 mg kaplı tablet (draje)",d:"3x1 (gerekirse 4–5x1)",s:"3–5 gün",k:"15 tb",t:"Glokom, prostat büyümesi, ileus ve taşikardide kullanmayın."},
  {...PCM,t:"Ağrı için; muayene tamamlanmadan NSAİİ'den kaçınılması uygundur."},
  {g:"alt",c:"Hiyosin ve parasetamolü tek tabletle vermek için (ikisini ayrıca yazmayın)",n:"Hiyosin butilbromür + parasetamol 10 mg/500 mg film tablet",d:"3x1",s:"3–4 günü aşmayın",k:"20 tb (1 kutu)",t:"Başka parasetamol içeren ilaçla birlikte kullanmayın; alkol kullananlarda günlük parasetamol 2 g'ı aşmamalı (KÜB); glokom, prostat büyümesi, ileus ve taşikardide kullanmayın.",w:["preg"]} ],
 oneri:["Ağrı kötüleşir veya ateş eklenirse hemen yeniden başvuru.","Yağlı ve gazlı gıdalardan kaçınma önerilir."],
 kaynak:"Roma IV fonksiyonel bağırsak bozuklukları; acil batın değerlendirmesi ilkeleri"},

{id:"konst",kat:"Sindirim",ad:"Kabızlık",icd:"K59.0",
 uygun:"Obstrüksiyon bulgusu yok; alarm semptom yok.",
 sevk:["Şiddetli karın ağrısı, distansiyon, gaz-gaita çıkaramama","Rektal kanama, kilo kaybı, 50 yaş üstü yeni başlangıç"],
 ilac:[
  {g:"ana",n:"Laktuloz şurubu",d:"15–30 ml, 1x1 (gerekirse 2x1)",s:"2–4 hafta",k:"1 şişe",t:"Gebelikte güvenle kullanılabilir."}, ],
 oneri:["Lif, sıvı ve hareketi artırma.","İlaç etkisi için 1–2 gün beklenmeli."],
 kaynak:"ACG kronik kabızlık rehberi (genel)"},

{id:"hemoroid",kat:"Sindirim",ad:"Akut Hemoroid Atağı",icd:"K64",
 uygun:"Tromboze büyük nodül, abse veya aktif kanama yok.",
 sevk:["Şiddetli ağrılı tromboze hemoroid, perianal abse","Anemiye yol açan veya durmayan kanama","40 yaş üstü ilk kez rektal kanama (kolonoskopi değerlendirmesi)"],
 ilac:[
  {g:"ana",n:"Mikronize diosmin + hesperidin 500 mg tablet",d:"İlk 4 gün 3x2, sonraki 3 gün 2x2",s:"7 gün",k:"36 tb (60'lık kutu)",t:"KÜB gebelik süresince kaçınılmasını öneriyor.",x:["preg"]},
  {g:"ana",n:"Kortikosteroid + lokal anestezik supozituvar",d:"Günde 1–2 kez, defekasyon sonrası (ürün prospektüsüne göre)",s:"En çok 7 gün",k:"1 kutu (10 supozituvar)",t:"Gebelikte yalnızca tıbbi gereklilik halinde kullanın."},
  {g:"destek",n:"Laktuloz şurubu",d:"15 ml, 1–2x1",s:"2 hafta",k:"1 şişe"} ],
 oneri:["Mıkırdama, uzun tuvalet oturuşu ve ıkınmadan kaçınılmalı.","Oturma banyosu rahatlama sağlar."],
 kaynak:"ASCRS hemoroid hastalığı rehberi (genel)"},

{id:"sistit",kat:"Üriner ve Jinekoloji",ad:"Komplike Olmayan Akut Sistit (Gebe Olmayan Kadın)",icd:"N30.0",
 uygun:"Ateş, yan ağrısı, bulantı-kusma yok; gebe değil; kateter, diyabet veya bağışıklık sorunu yok.",
 sevk:["Ateş, yan ağrısı, kusma (piyelonefrit)","Gebelik, erkek hasta, çocuk","Tekrarlayan veya 3 gün tedaviye yanıtsız (kültür gerekir)"],
 ilac:[
  {g:"ana",n:"Fosfomisin trometamol 3 g poşet",d:"Tek doz, akşam mesaneyi boşalttıktan sonra aç karna",s:"Tek doz",k:"1 poşet"},
  {g:"alt",c:"Fosfomisin kullanılamıyorsa",n:"Sefuroksim aksetil 500 mg film tablet",d:"2x1 (tok karnına)",s:"5 gün",k:"10 tb",t:"Yerel direnç durumuna bakın; penisilin alerjisinde çapraz duyarlılık olabilir.",w:["pcn","renal"]},
  {...IBU,t:"Yakınma ağırsa kısa süreli; gerektiğinde."},
  {...PCM} ],
 oneri:["Bol sıvı alınmalı; tam idrar tahlili alınabilir.","Siprofloksasin ve levofloksasin ilk seçenek değildir.","Yerel direnç durumuna göre trimetoprim-sülfametoksazol önerilmeyebilir."],
 kaynak:"IDSA/ESCMID ve EAU komplike olmayan idrar yolu enfeksiyonu rehberleri (genel)"},

{id:"renal",kat:"Üriner ve Jinekoloji",ad:"Renal Kolik (Ağrısı Kontrol Altına Alınmış, Enfeksiyonsuz)",icd:"N23",
 uygun:"Ağrı kontrol altında, ateş yok, oral alabiliyor, taş çapı yaklaşık 10 mm'nin altında, tek böbrek veya böbrek yetmezliği yok.",
 sevk:["Ateş, titreme (obstrüksiyon + enfeksiyon, acil)","Anüri, tek böbrek, böbrek yetmezliği, gebelik","Ağrı kontrol edilemiyor, ısrarlı kusma","Taş çapı 10 mm ve üzeri"],
 ilac:[
  {g:"ana",n:"Diklofenak potasyum 50 mg tablet",d:"3x1 (tok karnına)",s:"5–7 gün",k:"15–21 tb",x:NS},
  {g:"alt",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",c:"NSAİİ kullanılamıyorsa",n:"Parasetamol 500 mg tablet",d:"2 tb, 3x1 (en çok 4 g/gün)",s:"5–7 gün",k:"2 kutu"},
    {g:"destek",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 1–2 gün",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]} ],
 oneri:["Bol sıvı; idrar süzme önerilebilir.","Üroloji polikliniğine 1–2 hafta içinde başvuru. Tamsulosin, SUT gereği uzman hekim reçetesi istediği için bu listeye alınmadı.","Ateş, titreme veya ağrının artması halinde hemen acile dönmeli."],
 kaynak:"EAU ürolitiazis rehberi (genel)"},

{id:"kandida",kat:"Üriner ve Jinekoloji",ad:"Vajinal Kandidiyazis",icd:"B37.3",
 uygun:"Tipik tablo (kaşıntı, peynirimsi akıntı), alt karın ağrısı ve ateş yok.",
 sevk:["Alt karın ağrısı, ateş, düzensiz kanama (PID, gebelik)","Yılda 4'ten fazla tekrar","Kokulu akıntı (bakteriyel vajinoz, trikomonas açısından değerlendirme)"],
 ilac:[
  {g:"ana",n:"Flukonazol 150 mg kapsül",d:"Tek doz",s:"Tek doz",k:"1 kps",t:"Gebelikte kullanılmaz; ilaç etkileşimlerini kontrol edin.",x:["preg"],w:["renal"]},
  {g:"alt",c:"Gebelik veya oral tedavi istenmiyorsa",n:"Klotrimazol vajinal tablet 500 mg",d:"Tek doz, akşam yatarken",s:"Tek doz",k:"1 tb",t:"Gebelikte ilk trimesterde hekim önerisi olmadan kullanılmaz; gebelikte aplikatörsüz uygulanır."} ],
 oneri:["Cinsel partnerin rutin tedavisi gerekmez.","Sentetik iç çamaşırı ve aşırı yıkamadan kaçınma."],
 kaynak:"CDC STI tedavi rehberi (kandidiyazis bölümü)"},

{id:"dismenore",kat:"Üriner ve Jinekoloji",ad:"Primer Dismenore",icd:"N94.6",
 uygun:"Bilinen tipik adet ağrısı; gebelik şüphesi, ateş ve anormal akıntı yok.",
 sevk:["Yeni başlayan şiddetli ağrı, gebelik şüphesi (ektopik)","Ateş, kokulu akıntı (PID)","Aşırı kanama, bayılma"],
 ilac:[
  {g:"ana",n:"İbuprofen 400 mg tablet",d:"3x1 (tok karnına), ağrı başlar başlamaz",s:"2–3 gün (adet başlangıcından)",k:"9 tb",x:NS},
  {g:"alt",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"2–3 gün",k:"6 tb",x:NS},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"2–3 gün",k:"9 tb",x:NS},
  {g:"alt",n:"Flurbiprofen 100 mg film tablet",d:"İlk doz 100 mg, sonra gerekirse 4–6 saatte bir 50–100 mg (en çok 300 mg/gün)",s:"2–3 gün",k:"10 tb (15'lik kutu)",t:"Böbrek yetmezliğinde düşük doz gerekir.",x:NS},
  {...PCM,g:"alt",c:"NSAİİ kullanılamıyorsa"},
  {g:"alt",c:"Spazm ve ağrı birlikte baskınsa",n:"Hiyosin butilbromür + parasetamol 10 mg/500 mg film tablet",d:"3x1",s:"3–4 günü aşmayın (adet ağrısı için)",k:"20 tb (1 kutu)",t:"Başka parasetamol içeren ilaçla birlikte kullanmayın; alkol kullananlarda günlük parasetamol 2 g'ı aşmamalı (KÜB); glokom, prostat büyümesi, ileus ve taşikardide kullanmayın.",w:["preg"]} ],
 oneri:["Karın bölgesine sıcak uygulama.","Her adet döneminde tekrar eden şiddetli ağrıda jinekolojik değerlendirme."],
 kaynak:"ACOG dismenore yaklaşımı (genel)"},

{id:"bel",kat:"Kas-İskelet ve Ağrı",ad:"Akut Mekanik Bel Ağrısı",icd:"M54.5",
 uygun:"Nörolojik defisit yok, kırmızı bayrak yok; ağrı mekanik karakterde.",
 sevk:["Atnalı tarzı his kaybı, idrar veya gaita kontrol kaybı (kauda ekina)","İlerleyici güç kaybı","Ateş, kanser öyküsü, travma, osteoporoz, gece dinlenmede artan ağrı","50 yaş üstü ilk atak, IV ilaç kullanımı"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"5 gün",k:"15 tb",x:NS},
  {g:"alt",c:"NSAİİ kullanılamıyorsa",n:"Parasetamol 500 mg tablet",d:"2 tb, 3x1 (en çok 4 g/gün)",s:"5–7 gün",k:"2 kutu"},
  {...PPI},
  {g:"destek",n:"Tiokolşikozid 8 mg kapsül",d:"2x1 (günde en çok 16 mg)",s:"5–7 gün",k:"10–14 kps",t:"Gebelik, emzirme ve epilepsi öyküsünde kullanılmaz.",x:["preg"]},
  {g:"destek",n:"Diklofenak %1 jel",d:"Ağrılı bölgeye günde 3–4 kez",s:"7–10 gün",k:"1 tüp",t:"Oral NSAİİ ile birlikte kullanımda toplam NSAİİ yükünü göz önünde tutun.",w:["nsaid","renal"]} ],
 oneri:["Yatak istirahati önerilmez; aktivite ağrı sınırlarında sürdürülmeli.","Sıcak uygulama yararlı olabilir.","6 haftadan uzun sürerse ileri değerlendirme."],
 kaynak:"ACP ve NICE bel ağrısı rehberleri (genel)"},

{id:"burkulma",kat:"Kas-İskelet ve Ağrı",ad:"Ayak Bileği Burkulması (Ottawa Kuralı Negatif)",icd:"S93.4",
 uygun:"Ottawa ayak bileği/ayak kuralına göre grafi gerekmiyor; nörovasküler muayene normal; yük verebiliyor.",
 sevk:["Ottawa kuralı pozitif (grafi gerekir)","Deformite, yük veremeyen, nörovasküler bozukluk","Şiddetli şişlik ve instabilite (cerrahi/ortopedi değerlendirmesi)"],
 ilac:[
  {g:"ana",n:"Diklofenak %1 jel",d:"Günde 3–4 kez, ağrılı bölgeye",s:"7–10 gün",k:"1 tüp",w:["nsaid","renal"]},
  {g:"alt",c:"Diklofenak jel yerine",n:"Ketoprofen %2,5 jel",d:"Günde 2 kez, ağrılı bölgeye ince tabaka",s:"7–10 gün",k:"1 tüp (50 g)",t:"Tedavi sırasında güneş ve solaryum ışığından korunun; açık yara ve egzamalı cilde sürmeyin; gebelikte ilk iki trimester ve emzirmede kaçının.",x:["preg"],w:["nsaid","renal"]},
  {g:"destek",n:"Parasetamol 500 mg tablet",d:"3x1 (gerekirse 4x1)",s:"3–5 gün",k:"1 kutu"},
  {...IBU,g:"alt",c:"Topikal yetersizse"} ],
 oneri:["İlk 48 saat: istirahat, soğuk uygulama, elastik bandaj, bacağı yükseltme.","Erken ve kademeli yük verme önerilir.","1–2 hafta içinde düzelme olmazsa kontrol."],
 kaynak:"Ottawa ayak bileği kuralları; ACFAS/ortopedi yaklaşımı (genel)"},

{id:"tendinit",kat:"Kas-İskelet ve Ağrı",ad:"Tendinit / Bursit (Omuz, Dirsek, Diz)",icd:"M75, M77, M70",
 uygun:"Septik artrit ve tendon rüptürü şüphesi yok; travma öyküsü yok.",
 sevk:["Sıcak, kızarık, hareketsiz şiş eklem veya ateş (septik artrit)","Tendon rüptürü şüphesi, belirgin güç kaybı","Travma sonrası ağrı (grafi)"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",n:"İbuprofen 400 mg tablet",d:"3x1 (tok karnına)",s:"5–7 gün",k:"15–21 tb",x:NS},
  {g:"alt",n:"Flurbiprofen 100 mg film tablet",d:"2x1 (günlük 150–200 mg; en çok 300 mg/gün)",s:"5–7 gün",k:"14 tb (15'lik kutu)",t:"Böbrek yetmezliğinde düşük doz gerekir.",x:NS},
  {...PPI},
  {g:"destek",n:"Diklofenak %1 jel",d:"Günde 3–4 kez",s:"7–10 gün",k:"1 tüp",w:["nsaid","renal"]} ],
 oneri:["Etkilenen bölgeyi dinlendirme, aşırı kullanımdan kaçınma.","İki hafta içinde düzelme olmazsa fizik tedavi değerlendirmesi."],
 kaynak:"Kas-iskelet sistemi aşırı kullanım yaralanmaları yaklaşımı (genel)"},

{id:"gerilim",kat:"Kas-İskelet ve Ağrı",ad:"Gerilim Tipi Baş Ağrısı",icd:"G44.2",
 uygun:"Bilinen veya tipik tablo, nörolojik muayene normal, kırmızı bayrak yok.",
 sevk:["Gök gürültüsü gibi ani şiddetli baş ağrısı","Ateş + ense sertliği, nörolojik defisit, bilinç değişikliği","Travma, antikoagülan kullanımı, 50 yaş üstü yeni başlangıç","Gebelikte yeni baş ağrısı ve hipertansiyon"],
 ilac:[
  {g:"ana",n:"Parasetamol 500 mg tablet",d:"2 tb tek doz, gerekirse 6 saat sonra tekrar (en çok 4 g/gün)",s:"Gerektiğinde, kısa süre",k:"1 kutu"},
  {g:"alt",n:"İbuprofen 400 mg tablet",d:"1 tb (400 mg), gerektiğinde; günde en çok 3 tb",s:"Kısa süre",k:"10 tb",x:NS},
  {g:"alt",n:"Naproksen sodyum 550 mg tablet",d:"1 tb, gerektiğinde (günde en çok 2)",s:"Kısa süre",k:"6 tb",x:NS} ],
 oneri:["Analjezik ayda 10–15 günden fazla kullanılırsa aşırı kullanım baş ağrısı gelişebilir.","Uyku, sıvı ve stres yönetimi önerilir."],
 kaynak:"IHS ICHD-3 ve EFNS baş ağrısı yaklaşımı (genel)"},

{id:"migren",kat:"Kas-İskelet ve Ağrı",ad:"Migren Atağı (Bilinen veya Tipik)",icd:"G43.9",
 uygun:"Bilinen migren veya tipik tablo, nörolojik muayene normal, ilk atak veya aura-değişimi değil.",
 sevk:["Yeni veya atipik aura, ilk ve en kötü baş ağrısı","Ateş, ense sertliği, nörolojik defisit","İnme riski yüksek hastada hemiplejik/bazilar migren"],
 ilac:[
  {g:"ana",n:"İbuprofen 400 mg tablet",d:"1 tb (400 mg) atak başında; gerekirse 6 saat sonra tekrar",s:"Gerektiğinde, en çok 3 tb/gün",k:"6 tb",x:NS},
  {g:"destek",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 5 gün",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]},
  {...PCM,g:"alt",c:"NSAİİ kullanılamıyorsa"} ],
 oneri:["Ağrı şiddetlenmeden erken kullanım daha etkilidir.","Ayda 4'ten fazla atakta profilaksi için aile hekimi veya nöroloji değerlendirmesi.","Triptanlar (sumatriptan vb.) SUT 4.2.19 gereği yalnızca nöroloji uzmanı tarafından reçete edilir; bu yüzden listeye alınmadı."],
 kaynak:"AAN/AHS ve EHF migren akut tedavi yaklaşımı (genel)"},

{id:"vertigo",kat:"Kas-İskelet ve Ağrı",ad:"Akut Periferik Vertigo (BPPV / Vestibüler Nörit)",icd:"H81.1, H81.2",
 uygun:"HINTS muayenesi periferik; nörolojik defisit yok; inme açısından düşük risk.",
 sevk:["Santral bulgular: yeni baş ağrısı, çift görme, dizartri, ataksi, tek taraflı güçsüzlük","Yüksek vasküler risk faktörleriyle ani başlangıç","Yeni işitme kaybı","Yürüyememe veya oturamama"],
 ilac:[
  {g:"ana",n:"Betahistin 24 mg tablet",d:"2x1",s:"2–4 hafta",k:"28–56 tb",t:"Peptik ülser ve astımda dikkatli olun.",w:["nsaid"]},
    {g:"destek",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 1–2 gün",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]} ],
 oneri:["BPPV'de ilk tedavi Epley manevrasıdır; Dix-Hallpike pozitifse uygulanmalı.","Vestibüler baskılayıcı ilaçlar uzun süre kullanılmamalı.","Düşme riski açısından uyarın."],
 kaynak:"AAO-HNS BPPV rehberi; HINTS muayenesi (genel)"},

{id:"urtiker",kat:"Cilt, Göz ve Diş",ad:"Akut Ürtiker",icd:"L50.9",
 uygun:"Anjiyoödem, stridor veya hipotansiyon yok; ilaç/gıda anafilaksisi şüphesi yok.",
 sevk:["Dil, dudak veya boğaz şişliği, stridor","Hipotansiyon, bayılma (anafilaksi, epinefrin gerekir)","Ağrılı, 24 saatten uzun süren, morarma bırakan lezyonlar (vaskülit)"],
 ilac:[
  {g:"ana",n:"Setirizin 10 mg tablet",d:"1x1 (akşam; gerekirse 2x1)",s:"2–4 hafta veya semptom düzelene kadar",k:"28 tb",w:["renal"]},
  {g:"alt",n:"Feksofenadin 180 mg tablet",d:"1x1",s:"2–4 hafta",k:"28 tb",w:["renal"]},
  {g:"alt",n:"Desloratadin 5 mg film tablet",d:"1x1",s:"Semptom süresince, en çok 2–4 hafta",k:"20 tb (1 kutu)",t:"Gebelik ve emzirmede önerilmez (KT); şiddetli böbrek yetmezliğinde dikkatli kullanın.",x:["preg"],w:["renal"]},
  {g:"alt",c:"Kaşıntı geceleri uykuyu bölüyorsa (sedasyonlu)",n:"Hidroksizin 25 mg film tablet",d:"Yatmadan önce 25 mg; gerekirse en çok 100 mg/gün (3–4 dozda)",s:"1–2 hafta",k:"30 tb (1 kutu)",t:"Sedasyon yapar; araç kullanımından ve alkolden kaçının. QT uzaması riski: kalp hastalığı, elektrolit bozukluğu veya QT uzatan ilaç kullananlarda kullanmayın. Gebelikte kullanılmaz, emzirmede önerilmez; yaşlıda en çok 50 mg/gün.",x:["preg"],w:["cvd","renal"]},
  {g:"destek",c:"Yaygın veya şiddetli ise",n:"Metilprednizolon 16 mg tablet",d:"Sabah 2 tb (32 mg), tek doz",s:"3–5 gün",k:"6–10 tb",w:["nsaid"]} ],
 oneri:["Tetikleyici ilaç/gıda sorgulanmalı; şüpheli ilaç kesilmeli.","Dil-dudak şişliği veya nefes darlığında hemen acil."],
 kaynak:"EAACI/WAO ürtiker rehberi (genel)"},

{id:"selulit",kat:"Cilt, Göz ve Diş",ad:"Hafif Selülit / Erizipel (Apsesiz)",icd:"L03.1, A46",
 uygun:"Ateş yok veya düşük, yaygın yayılım yok, abse yok, genel durum iyi, oral alabiliyor.",
 sevk:["Hızlı yayılım, büllöz veya nekrotik görünüm, ağrı klinikle uyumsuz (nekrotizan enfeksiyon)","Ateş, sepsis bulguları","Yüz, göz çevresi, genital bölge; diyabetik ayak","Abse (drenaj gerekir)"],
 ilac:[
  {g:"ana",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"7 gün",k:"14 tb",x:["pcn"]},
  {g:"ana",n:"Sefaleksin 500 mg film tablet",d:"3–4x1 (6–8 saatte bir 500 mg)",s:"5–7 gün",k:"20–28 tb (16'lık 2 kutu)",t:"Penisilin alerjisinde çapraz reaktivite açısından dikkatli olun.",w:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"7 gün",k:"42 kps (16'lık 3 kutu)"},
  {...PCM} ],
 oneri:["Etkilenen uzvu yükseltme; ödem varsa kompresyon.","48–72 saatte düzelme olmazsa yeniden değerlendirme."],
 kaynak:"IDSA deri ve yumuşak doku enfeksiyonları rehberi (genel)"},

{id:"dermatit",kat:"Cilt, Göz ve Diş",ad:"Kontakt veya Atopik Dermatit Alevlenmesi",icd:"L25, L20",
 uygun:"İkincil enfeksiyon veya yaygın tutulum yok.",
 sevk:["Bal rengi kabuklanma, püstül (sekonder enfeksiyon)","Ağrılı veziküller, ateş (egzema herpetikum)","Eritroderma veya yaygın tutulum"],
 ilac:[
  {g:"ana",n:"Metilprednizolon aseponat %0,1 krem",d:"Günde 1 kez, ince tabaka",s:"En çok 2 hafta",k:"1 tüp",t:"Yüzde ve katlantı bölgelerinde uzun süre kullanmayın."},
  {g:"alt",n:"Betametazon valerat %0,1 krem",d:"Günde 2 kez",s:"7–10 gün",k:"1 tüp"},
  {g:"alt",n:"Mometazon furoat %0,1 krem",d:"Günde 1 kez, ince tabaka",s:"En çok 2 hafta",k:"1 tüp (30 g)",t:"Yüz, katlantı ve çocuklarda uzun süre kullanmayın; mukozalara sürülmez; 2 haftada düzelme yoksa yeniden değerlendirin."},
  {g:"alt",c:"Bakteriyel enfeksiyon eşlik ediyorsa veya şüphe varsa",n:"Fusidik asit + betametazon krem",d:"Günde 2–3 kez ince tabaka",s:"Kısa süreli (genelde 1–2 hafta)",k:"1 tüp (30 g)",t:"Uzun süreli ve geniş alanda kullanmayın; yüzde ve göze yakın bölgede dikkatli olun; bebeklerde pişikte kullanılmaz."},
  {g:"alt",c:"Yüz ve katlantı bölgeleri",n:"Hidrokortizon %1 krem",d:"Günde 2 kez",s:"En çok 7 gün",k:"1 tüp"},
  {g:"destek",n:"Emolient krem",d:"Günde 2–3 kez, yaygın uygulama",s:"Sürekli",k:"1 adet",t:"Reçetesiz; cilt bariyeri için temel tedavidir."},
  {g:"destek",n:"Setirizin 10 mg tablet",d:"1x1, akşam (kaşıntı için)",s:"1–2 hafta",k:"14 tb",w:["renal"]},
  {g:"alt",c:"Kaşıntı geceleri uykuyu bölüyorsa (sedasyonlu)",n:"Hidroksizin 25 mg film tablet",d:"Yatmadan önce 25 mg; gerekirse en çok 100 mg/gün (3–4 dozda)",s:"1–2 hafta",k:"30 tb (1 kutu)",t:"Sedasyon yapar; araç kullanımından ve alkolden kaçının. QT uzaması riski: kalp hastalığı, elektrolit bozukluğu veya QT uzatan ilaç kullananlarda kullanmayın. Gebelikte kullanılmaz, emzirmede önerilmez; yaşlıda en çok 50 mg/gün.",x:["preg"],w:["cvd","renal"]} ],
 oneri:["Tetikleyici maddeden uzak durulmalı.","Sıcak duş ve sert sabundan kaçınılmalı."],
 kaynak:"AAD atopik dermatit rehberi (genel)"},

{id:"skabiyes",kat:"Cilt, Göz ve Diş",ad:"Skabiyes (Uyuz)",icd:"B86",
 uygun:"Tipik gece kaşıntısı, kıvrım lezyonları; yakın temaslıda benzer yakınma.",
 sevk:["Kabuklu (Norveç) uyuz, bağışıklık baskılanması","2 aylıktan küçük bebek","Yaygın sekonder enfeksiyon"],
 ilac:[
  {g:"ana",n:"Permetrin %5 krem",d:"Boyundan ayak tabanına tüm vücuda ince sürülür, 8–14 saat sonra yıkanır; 7 gün sonra tekrarlanır",s:"2 uygulama",k:"2 tüp (kişi başı yaklaşık 30 g)",t:"Gebelikte ve emzirmede genelde güvenli kabul edilir."},
  {g:"destek",n:"Setirizin 10 mg tablet",d:"1x1, akşam",s:"1–2 hafta",k:"14 tb",w:["renal"]},
  {g:"alt",c:"Kaşıntı geceleri uykuyu bölüyorsa (sedasyonlu)",n:"Hidroksizin 25 mg film tablet",d:"Yatmadan önce 25 mg; gerekirse en çok 100 mg/gün (3–4 dozda)",s:"1–2 hafta",k:"30 tb (1 kutu)",t:"Sedasyon yapar; araç kullanımından ve alkolden kaçının. QT uzaması riski: kalp hastalığı, elektrolit bozukluğu veya QT uzatan ilaç kullananlarda kullanmayın. Gebelikte kullanılmaz, emzirmede önerilmez; yaşlıda en çok 50 mg/gün.",x:["preg"],w:["cvd","renal"]} ],
 oneri:["Evdeki tüm yakın temaslılar aynı gün tedavi edilmeli.","Çamaşır ve yatak takımları 60°C'de yıkanmalı.","Kaşıntı tedaviden sonra 2–4 hafta sürebilir."],
 kaynak:"CDC ve Avrupa skabiyes rehberleri (genel)"},

{id:"konjonktivit",kat:"Cilt, Göz ve Diş",ad:"Akut Bakteriyel Konjonktivit",icd:"H10.3",
 uygun:"Görme normal, ağrı ve ışık hassasiyeti yok, kontakt lens kullanmıyor, travma yok.",
 sevk:["Görmede azalma, belirgin ağrı, fotofobi","Kontakt lens kullanıcısı (Pseudomonas riski)","Travma, kimyasal teması, kornea tutulumu şüphesi","Yenidoğan"],
 ilac:[
  {g:"ana",n:"Fusidik asit %1 viskoz göz damlası",d:"2x1 damla",s:"7 gün",k:"1 tüp",t:"SUT gereği moksifloksasin ve levofloksasin göz damlaları yalnızca göz hastalıkları uzmanı tarafından reçete edilir."},
  {g:"alt",n:"Tobramisin %0,3 göz damlası",d:"Her 4 saatte bir 1–2 damla",s:"7 gün",k:"1 şişe (5 ml)",t:"Kontakt lens takılmaz; benzalkonyum klorür içerir; gebelikte kesin gerekmedikçe kullanılmaz."},
  {g:"destek",c:"Göz hastalıkları uzman raporu varsa",n:"Suni gözyaşı damlası",d:"Günde 4 kez",s:"Semptom süresince",k:"1 adet",t:"SUT EK-4/F: raporsuz yalnızca göz hastalıkları uzmanı yazar; diğer hekimler göz uzmanı raporuna dayanarak yazabilir."} ],
 oneri:["El hijyeni; havlu ve yastık ortak kullanılmamalı.","Göz çevresi serin kompresle temizlenebilir.","48–72 saatte düzelme olmazsa göz hastalıkları değerlendirmesi."],
 kaynak:"AAO konjonktivit tercih edilen uygulama modeli (genel)"},

{id:"dis",kat:"Cilt, Göz ve Diş",ad:"Akut Diş Ağrısı / Periapikal Abse",icd:"K04.7, K08.8",
 uygun:"Yüz şişliği, trismus ve disfaji yok; genel durum iyi. Diş hekimine yönlendirme zorunludur.",
 sevk:["Trismus, disfaji, boyun veya dil altı şişliği (Ludwig anjini)","Yüksek ateş, göz çevresi şişliği","Bağışıklık baskılanması"],
 ilac:[
  {g:"ana",n:"İbuprofen 400 mg tablet",d:"3x1 (tok karnına)",s:"3–5 gün",k:"15 tb",x:NS},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"3–5 gün",k:"15 tb",x:NS},
  {...PCM,g:"alt",c:"NSAİİ kullanılamıyorsa"},
  {g:"ana",c:"Yalnızca yüz şişliği, ateş veya yayılım varsa",n:"Amoksisilin 1000 mg tablet",d:"2x1",s:"5–7 gün",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Antibiyotiğe ek veya geniş kapsam gerekirse",n:"Metronidazol 500 mg tablet",d:"3x1",s:"5–7 gün",k:"15–21 tb",t:"Alkolle birlikte kullanmayın; gebelikte ilk trimesterde kaçının.",w:["preg"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"5–7 gün",k:"30–42 kps"} ],
 oneri:["Antibiyotik diş tedavisinin yerini tutmaz; ilk gün içinde diş hekimine başvurmalı.","Yüz şişliği artarsa veya yutma güçleşirse hemen acil."],
 kaynak:"ADA ve NICE odontojenik enfeksiyon yaklaşımı (genel)"},

{id:"aft",kat:"Cilt, Göz ve Diş",ad:"Aftöz Stomatit (Ağız Yarası)",icd:"K12.0",
 uygun:"Tipik tekrarlayan aft; ateş ve yaygın tutulum yok, sıvı alabiliyor.",
 sevk:["Üç haftadan uzun iyileşmeyen yara (malignite açısından)","Yutmayı engelleyen yaygın lezyonlar, ateş","Genital yara veya göz tutulumu (Behçet açısından değerlendirme)","Sık tekrar (demir, B12, folat eksikliği ve sistemik hastalık araştırması)"],
 ilac:[
  {g:"ana",n:"Benzidamin %0,15 gargara",d:"15 ml (1 yemek kaşığı) sulandırmadan, günde 2–3 kez, 30 saniye gargara",s:"5–7 gün",k:"1 şişe (120 ml)",t:"Yutulmamalı. Astım öyküsünde dikkatli kullanın.",w:["preg"]},
  {...PCM,g:"destek"} ],
 oneri:["Baharatlı, asitli ve sert gıdalardan kaçınma; yumuşak diş fırçası.","Aft genellikle 7–14 günde kendiliğinden iyileşir.","Sık tekrarlıyorsa kan tetkiki için aile hekimine başvurmalı."],
 kaynak:"Aftöz stomatit yönetimi (genel); ilaç bilgileri TİTCK KÜB/KT"},

{id:"kurugoz",kat:"Cilt, Göz ve Diş",ad:"Kuru Göz Sendromu",icd:"H04.1",
 uygun:"Görme normal; şiddetli ağrı, fotofobi ve kontakt lens komplikasyonu yok. Pratisyen hekim için: suni gözyaşı reçetesi ancak göz hastalıkları uzman raporu varsa yazılabilir; rapor yoksa göz polikliniğine yönlendirin.",
 sevk:["Ani görme azalması, şiddetli ağrı, fotofobi","Ağrılı kırmızı göz (keratit, uveit, akut glokom)","Kimyasal temas veya travma","Ağız kuruluğu ve eklem ağrısı birlikte (Sjögren açısından ileri değerlendirme)"],
 ilac:[
  {g:"ana",c:"Göz hastalıkları uzman raporu varsa",n:"Suni gözyaşı damlası",d:"Her göze 1 damla, günde 4–6 kez (gerektiğinde)",s:"En az 2–4 hafta",k:"1 şişe veya 1 kutu tek dozluk flakon",t:"SUT EK-4/F: raporsuz yalnızca göz hastalıkları uzmanı yazar; diğer hekimler göz uzmanı raporuna dayanarak yazabilir. Sık kullanımda koruyucusuz tek dozluk formlar tercih edilir."} ],
 oneri:["Ekran başında sık ara verme ve bilinçli göz kırpma.","Klima ve rüzgârlı ortamlardan kaçınma; ortam nemini artırma.","İki haftada düzelme olmazsa göz hastalıkları değerlendirmesi."],
 kaynak:"TFOS DEWS II kuru göz rehberi (genel)"},

{id:"hordeolum",kat:"Cilt, Göz ve Diş",ad:"Arpacık (Hordeolum) ve Blefarit",icd:"H00.0, H01.0",
 uygun:"Lokalize kapak şişliği; selülit bulgusu ve görme sorunu yok.",
 sevk:["Göz çevresinde yaygın kızarıklık ve şişlik (preseptal veya orbital selülit)","Görme azalması, göz hareketlerinde ağrı, çift görme","Ateş","Haftalardır süren veya tekrarlayan şalazyon (göz hastalıkları)"],
 ilac:[
  {g:"ana",n:"Fusidik asit %1 viskoz göz damlası",d:"Her göze günde 2 kez 1 damla",s:"7 gün",k:"1 tüp",t:"Kontakt lens takılıyken kullanmayın."},
  {...PCM,g:"destek"} ],
 oneri:["Günde 3–4 kez 10 dakika ılık kompres.","Kapak kenarı temizliği; lezyon sıkılmamalı.","Tedavi süresince kontakt lens ve göz makyajı kullanılmamalı."],
 kaynak:"AAO blefarit ve hordeolum yaklaşımı (genel)"},

{id:"bocek",kat:"Cilt, Göz ve Diş",ad:"Böcek Isırığı ve Arı Sokması (Lokal Reaksiyon)",icd:"T14.0, T63.4",
 uygun:"Yalnızca lokal reaksiyon; sistemik bulgu yok.",
 sevk:["Yaygın ürtiker, yüz-dudak-dil şişliği, nefes darlığı, hipotansiyon (anafilaksi, epinefrin)","Ağız veya boğaz çevresinde sokma","Hızla yayılan kızarıklık ve ateş (selülit)","Çok sayıda sokma"],
 ilac:[
  {g:"ana",n:"Setirizin 10 mg tablet",d:"1x1 (akşam)",s:"3–5 gün",k:"5 tb",w:["renal"]},
  {g:"ana",n:"Metilprednizolon aseponat %0,1 krem",d:"Günde 1 kez, ince tabaka",s:"3–7 gün",k:"1 tüp (30 g)",t:"Yüz ve katlantılarda uzun süre kullanmayın."},
  {...PCM,g:"destek"} ],
 oneri:["Arı iğnesi görünüyorsa kazıyarak çıkarın; sıkmayın.","İlk saatlerde soğuk uygulama.","Kaşımamak ikincil enfeksiyonu önler.","Adrenalin otoenjektör, SUT EK-4/F gereği immünoloji/alerji uzman raporuna dayanılarak reçete edilir."],
 kaynak:"Böcek ısırığı ve sokması yönetimi (genel)"},

{id:"impetigo",kat:"Cilt, Göz ve Diş",ad:"İmpetigo (Yüzeyel Deri Enfeksiyonu)",icd:"L01.0",
 uygun:"Sınırlı lezyon; ateş ve sistemik bulgu yok.",
 sevk:["Yaygın veya büllöz yaygın lezyon, ateş","Selülit, apse veya lenfanjit belirtisi","Bağışıklık baskılanması, yenidoğan","İdrar renginde koyulaşma, ödem (böbrek tutulumu)"],
 ilac:[
  {g:"ana",n:"Fusidik asit %2 krem",d:"Günde 3 kez ince tabaka; kabuklar yumuşatılıp temizlendikten sonra",s:"7 gün",k:"1 tüp (20 g)",t:"Direnç riski nedeniyle 10 günü aşmayın."},
  {g:"alt",c:"Fusidik asit yerine",n:"Mupirosin %2 pomad",d:"Günde 3 kez ince tabaka",s:"5–10 gün",k:"1 tüp (15 g)",t:"Gözlere sürmeyin; diğer krem ve merhemlerle karıştırmayın; KT: hamilelikte hekim önermedikçe kullanmayın.",w:["preg"]},
  {g:"ana",c:"Yaygın lezyon veya topikal tedavi yetersizse",n:"Sefaleksin 500 mg film tablet",d:"3–4x1 (6–8 saatte bir 500 mg)",s:"5–7 gün",k:"20–28 tb (16'lık 2 kutu)",t:"Penisilin alerjisinde çapraz reaktivite açısından dikkatli olun.",w:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"7 gün",k:"42 kps (16'lık 3 kutu)"} ],
 oneri:["El hijyeni; havlu ve çarşaf ortak kullanılmamalı.","Tedaviden 24 saat sonra okula veya işe dönülebilir.","Kabuklar ılık suyla yumuşatılıp temizlenir."],
 kaynak:"IDSA deri ve yumuşak doku enfeksiyonları rehberi (genel)"},

{id:"tinea",kat:"Cilt, Göz ve Diş",ad:"Dermatofit Enfeksiyonu (Tinea Pedis, Korporis, Kruris)",icd:"B35.3, B35.4, B35.6",
 uygun:"Sınırlı, tipik lezyon; saçlı deri ve tırnak tutulumu yok.",
 sevk:["Saçlı deri, tırnak veya yaygın tutulum (sistemik tedavi)","Bağışıklık baskılanması, diyabetik ayak","İkincil bakteriyel enfeksiyon, selülit","Tanı şüphesi veya tedaviye yanıtsızlık"],
 ilac:[
  {g:"ana",n:"Terbinafin %1 krem",d:"Günde 1–2 kez, lezyon ve çevresine",s:"1–2 hafta (iyileşmeden sonra 1 hafta daha devam)",k:"1 tüp (30 g)",t:"KÜB gebelikte yalnızca gerekirse kullanılmasını öneriyor.",w:["preg"]},
  {g:"alt",c:"Terbinafin yerine (aynı bölgede ikisini birlikte kullanmayın)",n:"Klotrimazol %1 krem",d:"Günde 2–3 kez, lezyon ve çevresine ince tabaka",s:"2–4 hafta (iyileşmeden sonra 1–2 hafta daha)",k:"1 tüp (20 g)",t:"Genital bölgede lateks prezervatif ve diyaframın etkinliğini geçici olarak azaltabilir; KT: hamilelikte yalnızca hekim önerisiyle kullanılır.",w:["preg"]} ],
 oneri:["Bölgeyi kuru tutma; pamuklu çorap ve nefes alan ayakkabı.","Havlu ve terlik ortak kullanılmamalı.","Evcil hayvan ve aile temaslıları değerlendirilmeli."],
 kaynak:"AAD ve BAD dermatofit enfeksiyonu rehberleri (genel)"},

{id:"seboreik",kat:"Cilt, Göz ve Diş",ad:"Seboreik Dermatit (Kepek, Yüz ve Gövde)",icd:"L21.0, L21.9",
 uygun:"Tipik tablo; ikincil enfeksiyon ve yaygın tutulum yok.",
 sevk:["Yaygın veya eritrodermik tutulum","Ani, ağır başlangıç (altta yatan hastalık açısından değerlendirme)","Tedaviye yanıtsızlık veya sık nüks","Enfeksiyon belirtisi"],
 ilac:[
  {g:"ana",n:"Ketokonazol %2 şampuan",d:"Haftada 2 kez, 3–5 dakika bekletip durulayın",s:"2–4 hafta",k:"1 şişe (100 ml)"},
  {g:"ana",c:"Yüz ve gövde lezyonları",n:"Ketokonazol %2 krem",d:"Günde 1–2 kez",s:"2–4 hafta",k:"1 tüp (30 g)"},
  {g:"alt",c:"Alevlenme ve belirgin kızarıklık",n:"Hidrokortizon %1 krem",d:"Günde 1–2 kez",s:"En çok 1 hafta",k:"1 tüp",t:"Yüzde uzun süre kullanmayın."} ],
 oneri:["Kronik, nüks eğilimli bir durumdur; bakım amacıyla şampuan haftada 1 kez sürdürülebilir.","Stres, uykusuzluk ve soğuk-kuru hava tetikleyebilir."],
 kaynak:"AAD seboreik dermatit yaklaşımı (genel)"},

{id:"herpes",kat:"Cilt, Göz ve Diş",ad:"Herpes Labialis (Uçuk)",icd:"B00.1",
 uygun:"Tipik perioral lezyon; bağışıklık sorunu yok.",
 sevk:["Göz tutulumu veya göz çevresinde lezyon (herpetik keratit)","Bağışıklığı baskılanmış hasta, yaygın veya ağır lezyon","Atopik dermatitli hastada yaygın vezikül (egzema herpetikum)","Sık tekrarlama"],
 ilac:[
  {g:"ana",n:"Asiklovir %5 krem",d:"4 saat arayla günde 5 kez; belirti başlar başlamaz",s:"4–5 gün",k:"1 tüp",t:"Gözlere sürmeyin."},
  {...PCM,g:"destek"} ],
 oneri:["Lezyon varken öpüşme ve eşya paylaşımından kaçınma.","Güneş koruyucu dudak koruması tekrarı azaltabilir."],
 kaynak:"Herpes simpleks deri enfeksiyonu yaklaşımı (genel)"},

{id:"bv",kat:"Üriner ve Jinekoloji",ad:"Bakteriyel Vajinoz",icd:"N76.0, N89.8",
 uygun:"Kokulu gri akıntı; alt karın ağrısı ve ateş yok; gebe değil.",
 sevk:["Gebelik (hekim değerlendirmesi)","Alt karın ağrısı, ateş (PID)","Yılda 3'ten fazla tekrar","Cinsel yolla bulaşan enfeksiyon şüphesi (test)"],
 ilac:[
  {g:"ana",n:"Metronidazol 500 mg film tablet",d:"2x1",s:"7 gün",k:"14 tb (20'lik kutu)",t:"Tedavi sırasında ve sonrasında 48 saat alkol almayın.",w:["preg"]} ],
 oneri:["Vajinal duştan kaçınma.","Partnerin rutin tedavisi gerekmez.","Belirtiler tekrarlarsa jinekolojik değerlendirme."],
 kaynak:"CDC STI tedavi rehberi (bakteriyel vajinoz bölümü)"},

{id:"seyyahishali",kat:"Sindirim",ad:"Enfeksiyöz İshal (Kansız, Hafif-Orta; Seyahat İshali)",icd:"A09, A04.9",
 uygun:"Dehidratasyon yok veya hafif, kansız, oral alabiliyor.",
 sevk:["Kanlı ishal, yüksek ateş, şiddetli karın ağrısı","Orta-ağır dehidratasyon","7 günü aşan ishal; yaşlı veya bağışıklığı baskılanmış hasta","Gebelik veya yakın zamanda antibiyotik/hastane öyküsü"],
 ilac:[ {...ORS},
  {g:"ana",c:"Günlük yaşamı bozan orta şiddetli ishalde",n:"Azitromisin 500 mg tablet",d:"1x1",s:"1–3 gün",k:"3 tb"},
  {g:"destek",c:"Yalnızca ateşsiz ve kansız ishalde",n:"Loperamid 2 mg tablet",d:"İlk doz 4 mg, sonra her sulu dışkıdan sonra 2 mg (en çok 8 mg/gün)",s:"En çok 48 saat",k:"10 tb",x:["preg"]},
  {g:"destek",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 1–2 gün",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]},
  {...PCM,g:"destek",t:"Ateş veya ağrı için; NSAİİ'den kaçının."} ],
 oneri:["Sıvı ve tuz kaybı yerine konmalı; küçük yudumlarla sık sıvı.","El hijyeni ve güvenli su-gıda önerileri.","Antibiyotik tüm ishallerde değil, seçili olgularda gerekir."],
 kaynak:"IDSA ve ACG enfeksiyöz ishal / seyahat ishali yaklaşımı (genel)"},

{id:"enterobiyaz",kat:"Sindirim",ad:"Enterobiyazis (Kıl Kurdu, Oksiyür)",icd:"B80",
 uygun:"Tipik gece anal kaşıntısı; genel durum iyi.",
 sevk:["Ateş veya şiddetli karın ağrısı (başka tanı)","Vajinal veya idrar yolu şikâyeti ile birlikte","Gebelik (hekim değerlendirmesi)"],
 ilac:[
  {g:"ana",n:"Mebendazol 100 mg çiğneme tableti",d:"Tek doz 1 tablet; 2 hafta sonra tekrarlayın",s:"Toplam 2 doz",k:"2 tb",t:"KÜB tek doz diyor; 2 hafta sonra tekrar dozu yeniden bulaşmayı önlemek için yaygın uygulamadır. Gebelikte kullanmayın.",x:["preg"]} ],
 oneri:["Evdeki tüm yakın temaslılar aynı gün tedavi edilmeli.","Çamaşır ve yatak takımları 60°C'de yıkanmalı; tırnaklar kısa tutulmalı.","Sabah ilk iş anüs bölgesini yıkama, el hijyeni."],
 kaynak:"CDC enterobiyazis yaklaşımı (genel); ilaç bilgileri TİTCK KÜB/KT"},

{id:"gut",kat:"Kas-İskelet ve Ağrı",ad:"Akut Gut Artriti Atağı",icd:"M10.9",
 uygun:"Bilinen veya tipik tek eklem atağı; ateş ve septik artrit şüphesi yok.",
 sevk:["Sıcak, kızarık eklemde ateş (septik artrit, sinovyal sıvı gerekir)","İlk atak ve tanı belirsiz","Böbrek yetmezliği veya aktif ülser/kanama (NSAİİ kullanılamaz)","Çok eklem tutulumu, tofüs veya sık atak (ürat düşürücü tedavi kontrolü)"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",c:"NSAİİ kullanılamıyorsa",n:"Metilprednizolon 16 mg tablet (prednizolon eşdeğeri)",d:"Sabah 2 tb (32 mg), tek doz",s:"5 gün",k:"10 tb",t:"Diyabetlilerde kan şekeri yükselebilir.",w:["nsaid"]},
  {...PPI} ],
 oneri:["Etkilenen eklemi dinlendirme ve soğuk uygulama.","Bol sıvı; alkol (özellikle bira), fruktozlu içecek ve sakatattan kaçınma.","Atak geçince ürik asit ve kronik tedavi için aile hekimi kontrolü."],
 kaynak:"ACR ve EULAR gut yönetimi rehberleri (genel)"},

{id:"dizoa",kat:"Kas-İskelet ve Ağrı",ad:"Diz Osteoartriti Alevlenmesi",icd:"M17.9",
 uygun:"Bilinen veya tipik mekanik ağrı; ateş, sıcak şişlik ve travma yok.",
 sevk:["Sıcak, şiş eklem ve ateş (septik artrit)","Travma sonrası ağrı (grafi)","Kilitlenme veya instabilite","Gece ağrısı ve hızla ilerleyen deformite"],
 ilac:[
  {g:"ana",n:"Diklofenak %1 jel",d:"Dize günde 3–4 kez",s:"2 hafta",k:"1 tüp (50 g)",w:["nsaid","renal"]},
  {g:"ana",n:"Parasetamol 500 mg tablet",d:"2 tb, 3x1 (en çok 4 g/gün)",s:"1–2 hafta",k:"2 kutu"},
  {g:"alt",c:"Yetersiz yanıtta kısa süreli",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {...PPI} ],
 oneri:["Kilo verme ve düzenli, yük bindirmeyen egzersiz (yüzme, bisiklet) temel tedavidir.","Sıcak uygulama; merdiven ve çömelmeden kaçınma.","Uzun süreli oral NSAİİ önerilmez."],
 kaynak:"OARSI ve ACR osteoartrit rehberleri (genel)"},

{id:"siyatalji",kat:"Kas-İskelet ve Ağrı",ad:"Akut Siyatalji (Hafif Lomber Radikülopati)",icd:"M54.3, M54.4",
 uygun:"Hafif-orta ağrı; motor defisit ve idrar/gaita bozukluğu yok.",
 sevk:["Eyer tipi his kaybı, idrar veya gaita kontrol kaybı (kauda ekina)","İlerleyen veya belirgin güç kaybı","Ateş, kanser öyküsü, travma, 50 yaş üstü ilk atak","Altı haftada düzelmeyen ağrı (görüntüleme, nöroloji/beyin cerrahisi)"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"5 gün",k:"15 tb",x:NS},
  {g:"alt",c:"NSAİİ kullanılamıyorsa",n:"Parasetamol 500 mg tablet",d:"2 tb, 3x1 (en çok 4 g/gün)",s:"5–7 gün",k:"2 kutu"},
  {...PPI},
  {g:"destek",n:"Tiokolşikozid 8 mg kapsül",d:"2x1",s:"5–7 gün",k:"10–14 kps",t:"Gebelik, emzirme ve epilepsi öyküsünde kullanılmaz.",x:["preg"]} ],
 oneri:["Yatak istirahati önerilmez; ağrı sınırında aktif kalma.","Ağır kaldırmadan ve uzun süre oturmadan kaçınma.","Çoğu olgu 4–6 haftada düzelir."],
 kaynak:"ACP ve NICE siyatalji/bel ağrısı rehberleri (genel)"},

{id:"boyun",kat:"Kas-İskelet ve Ağrı",ad:"Akut Boyun Ağrısı / Tortikolis",icd:"M54.2, M43.6",
 uygun:"Travma yok; nörolojik defisit, ateş ve ense sertliği yok.",
 sevk:["Ateş ile birlikte ense sertliği (menenjit)","Kola yayılan ağrı ile güç veya his kaybı","Travma sonrası ağrı (servikal grafi)","Yürüme bozukluğu veya şiddetli baş ağrısı"],
 ilac:[
  {g:"ana",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"5 gün",k:"15 tb",x:NS},
  {g:"ana",n:"Tiokolşikozid 8 mg kapsül",d:"2x1",s:"5–7 gün",k:"10–14 kps",t:"Gebelik, emzirme ve epilepsi öyküsünde kullanılmaz.",x:["preg"]},
  {g:"destek",n:"Diklofenak %1 jel",d:"Ağrılı bölgeye günde 3–4 kez",s:"7 gün",k:"1 tüp",w:["nsaid","renal"]},
  {...PPI} ],
 oneri:["Sıcak uygulama ve hafif boyun hareketleri.","Ekran ve telefon duruşu, yastık yüksekliği gözden geçirilmeli.","Çoğu olgu bir hafta içinde düzelir."],
 kaynak:"Mekanik boyun ağrısı yönetimi (genel)"},

{id:"gastrit",kat:"Sindirim",ad:"Akut Gastrit / Epigastrik Yanma (Alarm Semptomsuz)",icd:"K29.7, K30",
 uygun:"Alarm semptom yok; kardiyak ağrı dışlandı, hemodinami stabil.",
 sevk:["Hematemez veya melena","Şiddetli epigastrik ağrı ve defans (perforasyon, pankreatit)","Eforla artan göğüs ağrısı (önce kardiyak değerlendirme)","Anemi, kilo kaybı, 50 yaş üstü yeni başlangıç"],
 ilac:[
  {g:"ana",n:"Pantoprazol 40 mg tablet",d:"1x1, sabah aç karnına",s:"2–4 hafta",k:"14–28 tb"},
  {g:"alt",n:"Esomeprazol 20 mg enterik kaplı tablet",d:"1x1, sabah aç karnına",s:"2–4 hafta",k:"14–28 tb (14'lük veya 28'lik kutu)",t:"Pantoprazolün yerine kullanılır; ikisini birlikte yazmayın."},
  {g:"ana",n:"Alginat/antasit süspansiyon",d:"Yemeklerden sonra ve yatarken 10–20 ml, gerektiğinde",s:"2 hafta",k:"1 şişe"},
  {g:"destek",n:"Hiyosin butilbromür 10 mg kaplı tablet (draje)",d:"3x1",s:"3 gün",k:"9 tb",t:"Glokom, prostat büyümesi, ileus ve taşikardide kullanmayın."} ],
 oneri:["NSAİİ, alkol ve sigara kesilmeli.","Küçük ve sık öğünler; gece geç yemekten kaçınma.","Yakınma tekrarlarsa H. pylori testi planlanmalı."],
 kaynak:"ACG dispepsi rehberi (genel)"},

{id:"bulanti",kat:"Sindirim",ad:"Akut Bulantı-Kusma (Dehidratasyonsuz)",icd:"R11",
 uygun:"Oral alabiliyor; şiddetli karın ağrısı, ateş ve nörolojik bulgu yok; gebe değil.",
 sevk:["Dehidratasyon veya oral alamama","Şiddetli karın ağrısı, defans (akut batın)","Baş ağrısı ile nörolojik bulgu veya ense sertliği","Gebelik, diyabetik hasta (ketoasidoz), safralı kusma"],
 ilac:[
  {g:"ana",n:"Metoklopramid 10 mg tablet",d:"Gerektiğinde 8 saatte bir",s:"En çok 1–2 gün (en çok 5 gün)",k:"6 tb",t:"Genç hastalarda distonik reaksiyon riski vardır.",w:["renal"]},
  {...ORS} ],
 oneri:["Küçük yudumlarla sık sıvı; yağlı ve ağır gıdalardan kaçınma.","Kusma 24 saatten uzun sürerse yeniden başvuru.","Ondansetron SUT EK-4/F gereği rapora bağlı olduğundan bu listeye alınmadı."],
 kaynak:"Akut bulantı-kusma yaklaşımı (genel)"},

{id:"postnazal",kat:"Solunum / KBB",ad:"Üst Solunum Yolu Öksürük Sendromu (Postnazal Akıntı)",icd:"R05, J30.4",
 uygun:"Kuru veya boğazda gıdıklanmaya bağlı öksürük; nefes darlığı ve ateş yok.",
 sevk:["Nefes darlığı, hırıltı, düşük SpO2","Kanlı balgam, kilo kaybı","Üç haftadan uzun öksürük (akciğer grafisi)","ACE inhibitörü kullanımı (ilaç değişimi için hekimine)"],
 ilac:[
  {g:"ana",n:"Mometazon furoat nazal sprey 50 mcg",d:"Her buruna 2 püskürtme, 1x1",s:"2–4 hafta",k:"1 şişe"},
  {g:"ana",n:"Setirizin 10 mg tablet",d:"1x1 (akşam)",s:"2 hafta",k:"14 tb",t:"Böbrek yetmezliğinde doz yarıya indirilir.",w:["renal"]},
  {g:"destek",n:"Burun serum fizyolojik yıkama",d:"Günde 2 kez",s:"Semptom süresince",k:"1 adet",t:"Reçetesiz."} ],
 oneri:["Tetikleyici (toz, polen, sigara) kontrolü; yatak başı yükseltme.","Bol sıvı; öksürük baskılayıcı gereksizdir."],
 kaynak:"ACCP öksürük rehberi (genel)"},

{id:"perikoronit",kat:"Cilt, Göz ve Diş",ad:"Akut Perikoronit / Diş Eti Enfeksiyonu",icd:"K05.0, K05.2",
 uygun:"Yüz şişliği, trismus ve ateş yok. Diş hekimine yönlendirme zorunludur.",
 sevk:["Trismus, disfaji, dil altı veya boyun şişliği (derin boyun enfeksiyonu)","Ateş, yüz veya göz çevresi şişliği","Bağışıklık baskılanması"],
 ilac:[
  {g:"ana",c:"Yalnızca sistemik bulgu, yüz şişliği veya yayılım varsa",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"5–7 gün",k:"30–42 kps"},
  {g:"destek",n:"Benzidamin %0,15 gargara",d:"15 ml sulandırmadan, günde 2–3 kez",s:"5–7 gün",k:"1 şişe (120 ml)",w:["preg"]},
  {...IBU},{...PCM,g:"alt",c:"NSAİİ kullanılamıyorsa"} ],
 oneri:["Antibiyotik diş tedavisinin yerini tutmaz; 24–48 saat içinde diş hekimine başvuru.","Ağız hijyeni ve ılık tuzlu su gargarası.","Yüz şişliği artarsa veya yutma güçleşirse hemen acil."],
 kaynak:"ADA ve NICE odontojenik enfeksiyon yaklaşımı (genel)"},

{id:"fissur",kat:"Sindirim",ad:"Akut Anal Fissür",icd:"K60.2",
 uygun:"Tipik defekasyon ağrısı ve parlak kırmızı kanama; apse veya fistül yok.",
 sevk:["Perianal apse veya fistül","Şiddetli ağrı, yoğun kanama, anemi","40 yaş üstü ilk kanama (kolonoskopi)","Altı haftadan uzun süren kronik fissür (uzman değerlendirmesi)"],
 ilac:[
  {g:"ana",n:"Laktuloz şurubu",d:"15–30 ml, 1–2x1",s:"2–4 hafta",k:"1 şişe",t:"Gebelikte güvenle kullanılabilir."},
  {g:"ana",n:"Kortikosteroid + lokal anestezik supozituvar",d:"Günde 1–2 kez, defekasyon sonrası (ürün prospektüsüne göre)",s:"En çok 7 gün",k:"1 kutu (10 supozituvar)",t:"Gebelikte yalnızca tıbbi gereklilik halinde kullanın."},
  {...PCM,g:"destek"} ],
 oneri:["Günde 2–3 kez 10–15 dakika ılık oturma banyosu.","Lif ve sıvı artırma; ıkınmadan ve uzun tuvalet oturuşundan kaçınma.","Çoğu akut fissür 4–6 haftada iyileşir."],
 kaynak:"ASCRS anal fissür rehberi (genel)"},

{id:"grip",kat:"Solunum / KBB",ad:"Grip (İnfluenza) ve COVID-19 Benzeri Hastalık",icd:"J11.1, U07.1",
 uygun:"Genel durum iyi, SpO2 %94 ve üzeri, solunum sıkıntısı yok, oral alabiliyor.",
 sevk:["Nefes darlığı, SpO2 %94'ün altında, takipne","Göğüs ağrısı, bayılma, konfüzyon","3 günden uzun yüksek ateş veya düzeldikten sonra yeniden ateş (pnömoni, bakteriyel süperenfeksiyon)","Yüksek riskli hasta: gebe, 65 yaş üstü, KOAH/kalp/böbrek hastalığı, bağışıklık baskılanması"],
 ilac:[
  {...PCM,g:"ana"},
  {g:"ana",c:"Yalnızca influenza şüphesi ve risk grubu veya ağır seyir; belirtilerin ilk 48 saatinde",n:"Oseltamivir 75 mg kapsül",d:"2x1",s:"5 gün",k:"10 kps (1 kutu)",t:"Böbrek yetmezliğinde doz azaltılır. EK-4/F ve EK-4/E listelerinde yer almaz; ödeme koşulları için güncel SUT'a bakın.",w:["renal"]},
  {...IBU,g:"alt",c:"Parasetamol yetersizse"},
  {g:"destek",n:"Benzidamin %0,15 oral sprey",d:"4 püskürtme, günde 3–6 kez",s:"5–7 gün",k:"1 şişe (30 ml)",t:"Astım öyküsü olanlarda dikkatli kullanın.",w:["preg"]} ],
 oneri:["Dinlenme, bol sıvı, 5 gün veya ateşsiz 24 saate kadar izolasyon.","Çoğu olgu 5–7 günde düzelir; antibiyotik gerekmez.","Nefes darlığı veya ateşin yeniden yükselmesinde hemen başvuru."],
 kaynak:"WHO ve CDC influenza/COVID-19 ayaktan yönetim yaklaşımı (genel)"},

{id:"ates",kat:"Solunum / KBB",ad:"Ateş (Kaynağı Belirsiz, Genel Durumu İyi)",icd:"R50.9",
 uygun:"Genel durum iyi, hemodinami stabil, ateş 3 günden kısa, belirgin odak yok.",
 sevk:["Ateşle birlikte ense sertliği, peteşi, bilinç değişikliği","Takipne, hipotansiyon, taşikardi (sepsis)","Üç günü aşan ateş","Bağışıklık baskılanması, gebelik, yeni ameliyat veya kateter, sıtma bölgesi seyahati"],
 ilac:[
  {...PCM,g:"ana"},
  {...IBU,g:"alt",c:"Parasetamol yetersizse"} ],
 oneri:["Bol sıvı; ateş kaynağı için kan sayımı, CRP ve idrar tahlili düşünülmeli.","Antibiyotik odak saptanmadan başlanmamalı.","48–72 saatte düzelme olmazsa yeniden değerlendirme."],
 kaynak:"Erişkinde ateş yaklaşımı (genel)"},

{id:"kafatravma",kat:"Kas-İskelet ve Ağrı",ad:"Hafif Kafa Travması (Taburculuk Sonrası Reçete)",icd:"S09.9",
 uygun:"Glasgow 15, bilinç kaybı ve amnezi yok veya çok kısa; kırmızı bayrak yok; 24 saat yakın izlem sağlayacak yetişkin var.",
 sevk:["Bilinç kaybı, amnezi, tekrarlayan kusma, nöbet","Şiddetli baş ağrısı, artan uyku hali, konfüzyon","Antikoagülan veya antiplatelet kullanımı, 65 yaş üstü, alkol/madde etkisi","Kafatası kırığı bulguları (kulak/burun akıntısı, göz çevresinde veya kulak arkasında morarma), nörolojik defisit"],
 ilac:[
  {...PCM,g:"ana",t:"İlk 24 saat NSAİİ'den kaçının (kanama riski). Karaciğer hastalığı ve alkolde günlük üst sınırı düşürün."} ],
 oneri:["İlk 24 saat yetişkin bir yakınla kalınmalı.","Dinlenme; alkol, ağır egzersiz ve temas sporlarından birkaç gün uzak durma.","Kırmızı bayraklardan biri çıkarsa hemen acile dönülmeli.","Tekrarlayan kusma sevk nedenidir; bulantı için reçete yazılmaz."],
 kaynak:"NICE ve Kanada CT-Head hafif kafa travması yaklaşımları (genel)"},

{id:"yara",kat:"Cilt, Göz ve Diş",ad:"Yüzeysel Yara, Kesi ve Sıyrık",icd:"T14.1, S01",
 uygun:"Sığ ve temizlenebilir yara; tendon, sinir ve damar yaralanması yok; kanama durmuş.",
 sevk:["Derin, kirli yara veya hayvan/insan ısırığı","Tendon, sinir veya damar yaralanması şüphesi; his veya hareket kaybı","Yüz, el veya genital bölgede geniş yara; sütür gereksinimi","Yabancı cisim, ateş veya selülit bulgusu"],
 ilac:[
  {g:"ana",n:"Povidon iyot %10 topikal çözelti",d:"Yara çevresine günde 1–2 kez",s:"Yara kuruyana kadar, en çok 7–10 gün",k:"1 şişe (30 ml)",t:"İyot duyarlılığında ve tiroid hastalığında dikkatli kullanın. Reçetesiz de alınabilir."},
  {g:"ana",n:"Fusidik asit %2 krem",d:"Günde 2–3 kez ince tabaka, pansuman altında",s:"5–7 gün",k:"1 tüp (20 g)"},
  {g:"alt",c:"Fusidik asit yerine",n:"Mupirosin %2 pomad",d:"Günde 3 kez ince tabaka",s:"5–10 gün",k:"1 tüp (15 g)",t:"Gözlere sürmeyin; diğer krem ve merhemlerle karıştırmayın; KT: hamilelikte hekim önermedikçe kullanmayın.",w:["preg"]},
  {g:"destek",c:"Enfeksiyon yoksa, yara iyileşmesi için",n:"Centella asiatica ekstresi %1 pomad",d:"Günde 1–2 kez ince tabaka",s:"Yara iyileşene kadar",k:"1 tüp (40 g)",t:"Enfekte ağır lezyonlarda ve gözlere veya yumuşama eğilimli dokulara sürülmez; hamilelikte kullanılabilir (KT)."},
  {g:"alt",c:"Enfeksiyon bulguları varsa",n:"Sefaleksin 500 mg film tablet",d:"3–4x1 (6–8 saatte bir 500 mg)",s:"5–7 gün",k:"20–28 tb (16'lık 2 kutu)",t:"Penisilin alerjisinde çapraz reaktivite açısından dikkatli olun.",w:["pcn"]},
  {...PCM,g:"destek"} ],
 oneri:["Yarayı akan suyla yıkama; günlük pansuman.","Tetanoz aşı durumu sorgulanmalı (son doz 10 yıldan eski; kirli yarada 5 yıldan eski ise Td).","Kızarıklık, şişlik, akıntı veya ateşte yeniden başvuru."],
 kaynak:"Yara bakımı ve tetanoz profilaksisi yaklaşımı (genel)"},

{id:"kontuzyon",kat:"Kas-İskelet ve Ağrı",ad:"Kontüzyon ve Kas Zorlanması (Kırık Dışlanmış)",icd:"S30, M62.6",
 uygun:"Klinik kurallara göre grafi gerekmiyor; nörovasküler muayene normal.",
 sevk:["Deformite, yük verememe, belirgin şişlik","Nörovasküler bozukluk veya kompartman sendromu şüphesi","Üç günde belirgin kötüleşme","Antikoagülan kullanımı, geniş hematom"],
 ilac:[
  {g:"ana",n:"Diklofenak %1 jel",d:"Ağrılı bölgeye günde 3–4 kez",s:"7–10 gün",k:"1 tüp",w:["nsaid","renal"]},
  {g:"alt",c:"Diklofenak jel yerine",n:"Ketoprofen %2,5 jel",d:"Günde 2 kez, ağrılı bölgeye ince tabaka",s:"7–10 gün",k:"1 tüp (50 g)",t:"Tedavi sırasında güneş ve solaryum ışığından korunun; açık yara ve egzamalı cilde sürmeyin; gebelikte ilk iki trimester ve emzirmede kaçının.",x:["preg"],w:["nsaid","renal"]},
  {...PCM,g:"ana",d:"2 tb, 3x1 (en çok 4 g/gün)",k:"2 kutu"},
  {...IBU,g:"alt",c:"Topikal ve parasetamol yetersizse"} ],
 oneri:["İlk 48 saat: istirahat, soğuk uygulama (15–20 dk), bandaj, bölgeyi yükseltme.","Ağrı elverdikçe erken ve kademeli harekete dönülmeli.","Morarma günler içinde renk değiştirerek geçer."],
 kaynak:"Yumuşak doku yaralanması yaklaşımı (genel)"},

{id:"koah",kat:"Solunum / KBB",ad:"KOAH Alevlenmesi (Hafif-Orta, Ayaktan Tedavi)",icd:"J44.1",
 uygun:"Bilinen KOAH; SpO2 %92 ve üzeri, konuşabiliyor, bilinç net, evde izlem mümkün.",
 sevk:["SpO2 %90'ın altı, siyanoz, konfüzyon, yardımcı solunum kası kullanımı","Başlangıç tedavisine yanıtsızlık veya saatler içinde kötüleşme","Pnömoni bulgusu veya ağır komorbidite","Uykuya meyil (hiperkapni şüphesi)"],
 ilac:[
  {g:"ana",n:"Salbutamol 100 mcg/püskürtme inhaler",d:"2–4 püskürtme (hazneyle), 4–6 saatte bir; sonra gerektiğinde",s:"3–5 gün",k:"1 inhaler",t:"Tremor ve çarpıntı olabilir.",w:["cvd"]},
  {g:"ana",n:"Metilprednizolon 16 mg tablet (prednizolon eşdeğeri)",d:"Sabah 2 tb (32 mg), tek doz",s:"5 gün",k:"10 tb",t:"Diyabetlilerde kan şekeri yükselebilir.",w:["nsaid"]},
  {g:"ana",c:"Balgam miktarı ve pürülansı ile nefes darlığı artmışsa",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Azitromisin 500 mg tablet",d:"1x1",s:"3 gün",k:"3 tb",w:["cvd"]} ],
 oneri:["Sigara bırakma ve inhaler tekniğinin kontrolü.","48–72 saatte düzelme olmazsa yeniden değerlendirme; 1–2 hafta içinde kontrol.","Yıllık grip ve pnömokok aşıları önerilir."],
 kaynak:"GOLD KOAH rehberi alevlenme yönetimi (genel)"},

{id:"demir",kat:"Kan ve Vitamin Eksiklikleri",ad:"Demir Eksikliği Anemisi (Tanılı, Hafif-Orta)",icd:"D50.9",
 uygun:"Kan sayımı ve ferritinle tanılı; kanama kaynağı araştırılıyor veya biliniyor; hemodinami stabil.",
 sevk:["Semptomatik anemi (çarpıntı, nefes darlığı, bayılma) veya Hb 8 g/dL'nin altı","Aktif kanama, melena, hematemez","Erkek veya postmenopozal kadında nedeni bilinmeyen demir eksikliği (GİS değerlendirmesi)","Dört haftalık tedaviye yanıtsızlık"],
 ilac:[
  {g:"ana",n:"Demir(II) glisin sülfat 100 mg kapsül",d:"1x1 (gerekirse 2x1), aç karnına",s:"1 aylık reçete; kontrolde toplam en az 3 ay veya ferritin normale gelene kadar sürdürülür",k:"30 kps (aylık)",t:"Dışkı koyulaşır. Çay, kahve, süt ve kalsiyumla birlikte almayın; florokinolon ve tetrasiklinle arasını açın."} ],
 oneri:["C vitamini içeren gıdalarla (portakal suyu) birlikte alım emilimi artırır.","4 hafta sonra Hb kontrolü; yanıt varsa depolar dolana kadar sürdürme.","Altta yatan nedenin (kanama, çölyak, beslenme) araştırılması gerekir."],
 kaynak:"WHO ve ASH demir eksikliği anemisi yaklaşımı (genel); ilaç bilgileri ilacabak ve TİTCK"},

{id:"vitd",kat:"Kan ve Vitamin Eksiklikleri",ad:"D Vitamini Eksikliği (Tanılı)",icd:"E55.9",
 uygun:"25(OH)D düzeyiyle tanılı; hiperkalsemi yok.",
 sevk:["Hiperkalsemi, böbrek taşı veya sarkoidoz öyküsü","Böbrek yetmezliği, malabsorpsiyon hastalığı","Kemik ağrısı ve halsizlikle osteomalazi şüphesi","Gebelik ve emzirmede yüksek doz kullanımı (hekim değerlendirmesi)"],
 ilac:[
  {g:"ana",n:"Vitamin D3 (kolekalsiferol) 50.000 IU yumuşak kapsül",d:"Haftada 1 kapsül",s:"8 hafta",k:"8 kps (1 kutu)",t:"Gebelikte yüksek doz kullanmayın.",w:["preg"]},
  {g:"destek",c:"Doldurma tedavisinden sonra idame",n:"Vitamin D3 (kolekalsiferol) 2.000 IU yumuşak kapsül",d:"1x1",s:"Kan düzeyine göre",k:"60 kps",w:["preg"]} ],
 oneri:["Tedaviden 8–12 hafta sonra 25(OH)D kontrolü planlanabilir.","Güneşe makul maruziyet ve kalsiyumdan zengin beslenme önerilir.","Kolekalsiferol EK-4/F listesinde yer almaz (kalsitriol ve alfakalsidol yer alır); ödeme koşulları için güncel SUT'a bakın."],
 kaynak:"Endocrine Society D vitamini eksikliği yaklaşımı (genel); ilaç bilgileri ilacabak"},

{id:"b12",kat:"Kan ve Vitamin Eksiklikleri",ad:"B12 Vitamini Eksikliği (Tanılı)",icd:"E53.8",
 uygun:"Serum B12 düzeyiyle tanılı; nörolojik bulgu yok; hemodinami stabil.",
 sevk:["Nörolojik bulgu (parestezi, ataksi, bilişsel bozulma)","Pernisiyöz anemi şüphesi veya pansitopeni","Hb belirgin düşük","Folat eksikliğinde tek başına folik asit verilmemeli (nörolojik tabloyu maskeleyebilir)"],
 ilac:[
  {g:"ana",n:"Siyanokobalamin (B12 vitamini) 1000 mcg/ml IM ampul",d:"Günaşırı 1 ampul IM (1–2 hafta); sonra haftada 1; düzelince ayda 1",s:"Kan düzeyi normale gelene kadar",k:"5 ampul (1 kutu)",t:"Kas içine uygulanır; uygulama için sağlık personeli gerekir."} ],
 oneri:["Metformin, PPI veya vejetaryen beslenme gibi nedenler sorgulanmalı.","4–8 hafta sonra B12 ve kan sayımı kontrolü.","Kalıcı eksikliklerde ömür boyu aylık idame gerekebilir."],
 kaynak:"BSH B12 eksikliği rehberi (genel); ilaç bilgileri ilacabak ve TİTCK"},

{id:"erkekiye",kat:"Üriner ve Jinekoloji",ad:"Erkekte İdrar Yolu Enfeksiyonu (Febril Olmayan)",icd:"N39.0",
 uygun:"Ateş yok, genel durum iyi; kateter, taş ve obstrüksiyon yok; idrar kültürü alınmış.",
 sevk:["Ateş, titreme, yan veya perine ağrısı (piyelonefrit, prostatit)","İdrar retansiyonu, hematüri, kateter","İdrar yapamama","Tekrarlayan enfeksiyon, diyabet, 65 yaş üstü veya bağışıklık baskılanması"],
 ilac:[
  {g:"ana",n:"Siprofloksasin 500 mg film tablet",d:"2x1",s:"7 gün",k:"14 tb (14'lük kutu)",t:"Tendon, QT ve CNS yan etkileri açısından uyarın. SUT: oral siprofloksasin kısıtlamasız.",w:["renal","cvd"]},
  {g:"alt",c:"Kültür sonucuna göre veya siprofloksasin kullanılamıyorsa",n:"Sefuroksim aksetil 500 mg film tablet",d:"2x1 (tok karnına)",s:"7 gün",k:"14 tb",w:["pcn","renal"]},
  {...PCM,g:"destek"},
  {g:"alt",c:"Florokinolon kullanılamıyorsa (yerel direnç durumuna ve kültüre göre)",n:"Trimetoprim + sülfametoksazol 160 mg/800 mg tablet",d:"2x1 (forte tablet)",s:"7 gün (kültüre göre)",k:"14 tb (20'lik kutu)",t:"Sülfonamid alerjisi, böbrek ve karaciğer yetmezliğinde kullanılmaz; yeterli sıvı alın. SUT EK-4/E: kısıtlama yok. Ürünün güncel satış durumunu net doğrulayamadım.",w:["renal"]} ],
 oneri:["İdrar kültürü sonucuna göre tedavi gözden geçirilmeli.","Bol sıvı; tedavi süresi tamamlanmalı.","Prostat büyümesi veya taş açısından üroloji değerlendirmesi düşünülebilir."],
 kaynak:"EAU üriner enfeksiyon rehberi (genel)"},

{id:"hpylori",kat:"Sindirim",ad:"Helicobacter pylori Eradikasyonu (Tanılı)",icd:"B96.81, K29.7",
 uygun:"Üre nefes testi, dışkı antijeni veya endoskopi/patolojiyle doğrulanmış ilk eradikasyon; penisilin alerjisi yok; testten önce PPI ve antibiyotik kullanımı gözetilmiş.",
 sevk:["Alarm semptom: disfaji, kilo kaybı, GİS kanama, anemi","50 yaş üstü yeni başlangıç dispepsi (endoskopi)","Önceki eradikasyon başarısız (ikinci basamak tedavi)","Gebelik veya emzirme; ağır karaciğer ya da böbrek hastalığı"],
 ilac:[
  {g:"ana",c:"14 günlük üçlü tedavi",n:"Pantoprazol 40 mg tablet",d:"2x1, yemekten 30 dakika önce",s:"14 gün",k:"28 tb"},
  {g:"ana",c:"14 günlük üçlü tedavi",n:"Klaritromisin 500 mg film tablet",d:"2x1",s:"14 gün",k:"28 tb (14'lük 2 kutu)",t:"SUT EK-4/E: kısıtlama yok. QT uzaması ve ilaç etkileşimleri açısından dikkat.",w:["cvd"]},
  {g:"ana",c:"14 günlük üçlü tedavi",n:"Amoksisilin 1000 mg tablet",d:"2x1",s:"14 gün",k:"28 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi (amoksisilin yerine)",n:"Metronidazol 500 mg film tablet",d:"2x1",s:"14 gün",k:"28 tb",t:"Tedavi sırasında ve sonrasında 48 saat alkol almayın.",w:["preg"]} ],
 oneri:["Tedavi eksiksiz tamamlanmalı; ilaçlar erken bırakılmamalı.","Başarı kontrolü: tedaviden en az 4 hafta sonra (PPI en az 2 hafta kesilmiş olarak) nefes veya dışkı testi.","Yerel klaritromisin direnci yüksekse bizmutlu dörtlü tedavi tercih edilir; bizmut ürünü doğrulanmadığı için listeye alınmadı.","Sigara ve NSAİİ kullanımından kaçınma."],
 kaynak:"Maastricht VI/Florence ve ACG H. pylori rehberleri (genel)"},

{id:"trikomonas",kat:"Üriner ve Jinekoloji",ad:"Trikomonas Vajiniti / Üretriti",icd:"A59.0",
 uygun:"Tipik tablo veya mikroskopi/NAAT pozitif; PID bulgusu yok; partner tedavisi mümkün.",
 sevk:["Alt karın ağrısı, ateş (PID)","Gebelik","Tekrarlayan veya tedaviye yanıtsız olgu","Eşlik eden cinsel yolla bulaşan enfeksiyon şüphesi (HIV, sifiliz, klamidya, gonore testi)"],
 ilac:[
  {g:"ana",c:"Kadın",n:"Metronidazol 500 mg film tablet",d:"2x1",s:"7 gün",k:"14 tb (20'lik kutu)",t:"Tedavi sırasında ve sonrasında 48 saat alkol almayın.",w:["preg"]},
  {g:"ana",c:"Erkek",n:"Metronidazol 500 mg film tablet",d:"4 tablet (2 g), tek doz",s:"Tek doz",k:"4 tb",w:["preg"]} ],
 oneri:["Partner veya partnerler aynı anda tedavi edilmeli.","Tedavi bitene ve belirtiler geçene kadar cinsel ilişkiden kaçınma.","Diğer cinsel yolla bulaşan enfeksiyonlar için test ve danışmanlık."],
 kaynak:"CDC STI tedavi rehberi (trikomoniyazis bölümü)"},

{id:"mastit",kat:"Üriner ve Jinekoloji",ad:"Laktasyonel Mastit",icd:"O91.2",
 uygun:"Apse yok, sistemik bulgular hafif, emzirmeye devam edilebiliyor.",
 sevk:["Fluktüan kitle (apse: ultrason ve drenaj)","Yüksek ateş veya sepsis bulguları","48 saatlik tedaviye yanıtsızlık","Emzirmeyen kadında mastit veya tekrarlayan mastit (meme kanseri açısından değerlendirme)"],
 ilac:[
  {g:"ana",n:"Sefaleksin 500 mg film tablet",d:"3–4x1 (6–8 saatte bir 500 mg)",s:"10 gün",k:"30–40 tb (16'lık 2–3 kutu)",t:"Penisilin alerjisinde çapraz reaktivite açısından dikkatli olun. Emzirmeyle uyumludur.",w:["pcn"]},
  {...IBU,x:["nsaid","renal","cvd"],t:"Emzirme döneminde kısa süreli kullanılabilir; en düşük dozla."},
  {g:"alt",c:"Yanıtsız veya beta-laktamaz üreten etken şüphesi",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"10 gün",k:"20 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Klindamisin 150 mg kapsül",d:"2 kapsül (300 mg), 3x1",s:"10 gün",k:"60 kps (16'lık 4 kutu)"},
  {...PCM,g:"destek"} ],
 oneri:["Emzirmeye ve sütü sık, etkili boşaltmaya devam edilmeli; enfeksiyon bebeğe zarar vermez.","Soğuk kompres, destekli sütyen, iyi emzirme pozisyonu.","Kitle, ateş veya artan ağrıda hemen yeniden başvuru."],
 kaynak:"ABM emzirme ve mastit protokolü (genel)"},

{id:"paronisi",kat:"Cilt, Göz ve Diş",ad:"Paronişi (Tırnak Çevresi Enfeksiyonu)",icd:"L03.0",
 uygun:"Abse veya yaygın selülit yok; genel durum iyi.",
 sevk:["Fluktüan koleksiyon (insizyon ve drenaj)","Fleksör tendon kılıfı enfeksiyonu: parmakta ağrılı fleksiyon, simetrik şişlik","Yaygın selülit veya ateş","Diyabet, bağışıklık baskılanması; kronik ve tekrarlayan paronişi (mantar)"],
 ilac:[
  {g:"ana",n:"Fusidik asit %2 krem",d:"Günde 3 kez ince tabaka",s:"7 gün",k:"1 tüp (20 g)"},
  {g:"alt",c:"Fusidik asit yerine",n:"Mupirosin %2 pomad",d:"Günde 3 kez ince tabaka",s:"5–10 gün",k:"1 tüp (15 g)",t:"Gözlere sürmeyin; diğer krem ve merhemlerle karıştırmayın; KT: hamilelikte hekim önermedikçe kullanmayın.",w:["preg"]},
  {g:"ana",c:"Selülit bulgusu varsa",n:"Sefaleksin 500 mg film tablet",d:"3–4x1 (6–8 saatte bir 500 mg)",s:"5–7 gün",k:"20–28 tb (16'lık 2 kutu)",w:["pcn"]},
  {...PCM,g:"destek"} ],
 oneri:["Günde 3–4 kez 15 dakika ılık su banyosu.","Tırnak kenarını kesme, ısırma ve itme alışkanlığından kaçınma.","Eller sık nemli kalıyorsa koruyucu eldiven kullanma."],
 kaynak:"Akut paronişi yönetimi (genel)"},

{id:"oralkandida",kat:"Cilt, Göz ve Diş",ad:"Oral Kandidiyaz (Pamukçuk)",icd:"B37.0",
 uygun:"Tipik beyaz plaklar; yutma güçlüğü ve sistemik bulgu yok.",
 sevk:["Disfaji veya retrosternal ağrı (özofagus kandidiyazisi)","Açıklanamayan veya tekrarlayan olgu (diyabet, bağışıklık sorunu araştırması)","Uzun süre geçmeyen plak (lökoplaki ayırımı)","Emzirme dönemi: anne ve bebek birlikte değerlendirilmeli"],
 ilac:[
  {g:"ana",n:"Nistatin 100.000 IU/ml oral süspansiyon",d:"1–2 ml (gerekirse en çok 6 ml), günde 4 kez; ağızda tutup yutun",s:"Belirtiler geçtikten sonra en az 48 saat; toplam yaklaşık 7–14 gün",k:"2 şişe (48 ml)"},
  {g:"alt",c:"Yaygın veya nistatine yanıtsız",n:"Flukonazol 150 mg kapsül",d:"1x1",s:"7–14 gün",k:"7–14 kps",t:"Gebelikte kullanılmaz; ilaç etkileşimlerine dikkat.",x:["preg"],w:["renal"]} ],
 oneri:["İnhaler steroid sonrası ağzı çalkalama; protez varsa gece çıkarıp temizleme.","Diş fırçası tedaviye başlarken yenilenmeli.","Diyabet kontrolü gözden geçirilmeli."],
 kaynak:"IDSA kandidiyaz rehberi (orofaringeal bölüm)"},

{id:"versikolor",kat:"Cilt, Göz ve Diş",ad:"Pitriyazis Versikolor",icd:"B36.0",
 uygun:"Tipik hipo/hiperpigmente, ince pullu lezyonlar; sınırlı veya orta yaygınlık.",
 sevk:["Tanı şüphesi (vitiligo, seboreik dermatit, sekonder sifiliz)","Çok yaygın veya sık tekrarlayan olgu","Bağışıklık baskılanması"],
 ilac:[
  {g:"ana",n:"Ketokonazol %2 şampuan",d:"Günde 1 kez lezyonlu bölgeye sürüp 5–10 dakika bekletip durulayın",s:"5 gün",k:"1 şişe (100 ml)"},
  {g:"alt",c:"Topikal tedaviye yanıtsız veya yaygın",n:"Flukonazol 150 mg kapsül",d:"2 kapsül (300 mg), haftada 1 kez",s:"2 hafta",k:"4 kps",t:"Gebelikte kullanılmaz.",x:["preg"],w:["renal"]} ],
 oneri:["Renk değişikliği tedaviden sonra haftalar-aylar sürebilir; bu başarısızlık değildir.","Sıcak ve nemli dönemlerde nüks sık; şampuanla koruyucu uygulama düşünülebilir.","Terlemeyi azaltan, nefes alan giysi."],
 kaynak:"AAD ve BAD pitriyazis versikolor yaklaşımı (genel)"},

{id:"yanik",kat:"Cilt, Göz ve Diş",ad:"Küçük Yüzeysel Yanık (1. ve Yüzeysel 2. Derece)",icd:"T30.0, T31.0",
 uygun:"Erişkinde vücut yüzeyinin %5'inden küçük; yüz, el, ayak, perine ve eklem bölgesi dışında; elektrik, kimyasal veya inhalasyon yanığı değil; derin değil.",
 sevk:["Yüz, el, ayak, perine veya eklem üzerinde ya da çevresel yanık","Derin (3. derece) veya geniş yanık","Elektrik, kimyasal veya inhalasyon yanığı","Çocuk, yaşlı, diyabet, enfeksiyon belirtisi veya tetanoz durumu bilinmiyor"],
 ilac:[
  {g:"ana",n:"Gümüş sülfadiazin %1 krem",d:"Günde 1–2 kez, 3–5 mm kalınlığında; steril gazlı bezle kapatın",s:"Yara iyileşene kadar, genelde 7–14 gün",k:"1 tüp (40 g)",t:"Sülfonamid alerjisinde ve G6PD eksikliğinde kullanılmaz; kabuk atılımını geciktirebilir."},
  {g:"alt",c:"Enfeksiyon yoksa, yüzeysel yanıkta iyileşme için",n:"Centella asiatica ekstresi %1 pomad",d:"Günde 1–2 kez ince tabaka",s:"Yara iyileşene kadar",k:"1 tüp (40 g)",t:"Enfekte ağır lezyonlarda ve gözlere veya yumuşama eğilimli dokulara sürülmez; hamilelikte kullanılabilir (KT)."},
  {...PCM,g:"destek"},{...IBU,g:"alt",c:"Parasetamol yetersizse"} ],
 oneri:["İlk 20 dakika akan serin suyla soğutma; buz kullanılmaz.","Kabarcıklar patlatılmamalı; günlük pansuman.","Tetanoz aşı durumu sorgulanmalı; enfeksiyon belirtisinde yeniden başvuru."],
 kaynak:"ABA ve NICE yanık ilk yardım ve ayaktan yönetim yaklaşımı (genel)"},

{id:"plantar",kat:"Kas-İskelet ve Ağrı",ad:"Plantar Fasiit",icd:"M72.2",
 uygun:"Tipik topuk ağrısı (sabah ilk adımlarda); travma ve kırık şüphesi yok.",
 sevk:["Travma sonrası ani ağrı, yük verememe (kırık, rüptür)","Ateş, kızarıklık, şişlik","Gece ağrısı veya iki taraflı tutulum ile sistemik hastalık belirtisi","Üç ayda yanıtsızlık (ortopedi veya fizik tedavi)"],
 ilac:[
  {g:"ana",n:"Diklofenak %1 jel",d:"Topuk ve ayak tabanına günde 3–4 kez",s:"2–3 hafta",k:"1 tüp",w:["nsaid","renal"]},
  {g:"alt",c:"Diklofenak jel yerine",n:"Ketoprofen %2,5 jel",d:"Günde 2 kez, ağrılı bölgeye ince tabaka",s:"2–3 hafta",k:"1 tüp (50 g)",t:"Tedavi sırasında güneş ve solaryum ışığından korunun; açık yara ve egzamalı cilde sürmeyin; gebelikte ilk iki trimester ve emzirmede kaçının.",x:["preg"],w:["nsaid","renal"]},
  {g:"alt",c:"Topikal yetersizse kısa süreli",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {...PPI},{...PCM,g:"destek"} ],
 oneri:["Aşil tendonu ve plantar fasya germe egzersizleri; yumuşak, destekli ayakkabı veya silikon topuk.","Kilo kontrolü, sert zeminde uzun süre ayakta kalmaktan kaçınma.","Belirtiler aylar içinde yavaş düzelir."],
 kaynak:"APTA plantar fasiit klinik rehberi (genel)"},

{id:"karpal",kat:"Kas-İskelet ve Ağrı",ad:"Karpal Tünel Sendromu (Hafif-Orta)",icd:"G56.0",
 uygun:"Gece parestezisi ve el bileği belirtileri; tenar atrofi ve belirgin güç kaybı yok.",
 sevk:["Tenar kas atrofisi veya belirgin güç kaybı","Sürekli his kaybı","Boyun kaynaklı radikülopati veya polinöropati şüphesi (diyabet, tiroid, B12)","Altı haftalık atel tedavisine yanıtsızlık (EMG, ortopedi)"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",t:"NSAİİ etkisi sınırlıdır; asıl tedavi gece el bileği ateli ve yüklenme azaltmadır.",x:NS},
  {g:"alt",n:"Diklofenak %1 jel",d:"Günde 3–4 kez el bileği ve avuç içine",s:"1–2 hafta",k:"1 tüp",w:["nsaid","renal"]},
  {...PPI} ],
 oneri:["Nötr pozisyonda gece el bileği ateli en az 4–6 hafta.","Tekrarlayan el bileği hareketlerini ve ergonomiyi gözden geçirme.","Gebelikte belirtiler genelde doğumdan sonra düzelir."],
 kaynak:"AAOS karpal tünel sendromu rehberi (genel)"},

{id:"tme",kat:"Kas-İskelet ve Ağrı",ad:"Temporomandibular Eklem Ağrısı",icd:"M26.6",
 uygun:"Çene ağrısı veya çıtırtı; ateş, şişlik ve travma yok.",
 sevk:["Çene çıkığı veya kilitlenme (ağız açamama)","Travma sonrası ağrı (kırık)","Ateş, şişlik, kızarıklık (enfeksiyon)","Yaşlıda şakak ağrısı ve görme sorunu (dev hücreli arterit); kulak veya diş kaynaklı ağrı ayırımı"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"ana",n:"Tiokolşikozid 8 mg kapsül",d:"2x1",s:"5–7 gün",k:"10–14 kps",t:"Gebelik, emzirme ve epilepsi öyküsünde kullanılmaz.",x:["preg"]},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"5 gün",k:"15 tb",x:NS},
  {...PPI} ],
 oneri:["Yumuşak gıda, sakız ve sert çiğnemeden kaçınma; ağzı çok geniş açmama.","Sıcak kompres ve hafif çene egzersizleri.","Gece diş sıkma (bruksizm) için diş hekimi değerlendirmesi."],
 kaynak:"Temporomandibular bozukluklar yönetimi (genel)"},

{id:"akne",kat:"Cilt, Göz ve Diş",ad:"Hafif-Orta Akne Vulgaris",icd:"L70.0",
 uygun:"Komedonal veya hafif-orta inflamatuvar akne; nodülokistik veya skar riski olan akne değil.",
 sevk:["Nodülokistik veya skar bırakan akne (izotretinoin için dermatoloji)","Ani ve ağır başlangıç, androjen fazlalığı belirtileri","Gebelik veya gebelik planı (topikal retinoid kullanılmaz)","Belirgin psikolojik etkilenme"],
 ilac:[
  {g:"ana",c:"Akşamları",n:"Adapalen %0,1 jel",d:"Yatmadan önce yüze ince tabaka, gözlerden ve dudaktan kaçınarak",s:"12 hafta",k:"1 tüp (30 g)",t:"Gebelikte ve gebelik planında kullanılmaz; güneş koruyucu kullanın; ilk haftalarda kuruluk ve tahriş olabilir. SUT ödeme koşulunu ayrıca doğrulayın.",x:["preg"]},
  {g:"ana",c:"Sabahları",n:"Klindamisin + benzoil peroksit %1 + %5 jel",d:"Sabah yüze ince tabaka",s:"12 hafta",k:"1 tüp (25 g)",t:"Tretinoin/izotretinoin içeren başka akne ürünleriyle aynı anda kullanmayın; çamaşırları ağartabilir."} ],
 oneri:["Nemlendirici ve güneş koruyucu kullanımı; sivilceyi sıkmama.","Etki 8–12 haftada tam görülür; erken bırakılmamalı.","Düzenli adet bozukluğu veya hirsutizm varsa hormonal değerlendirme."],
 kaynak:"AAD akne rehberi (genel); ilaç bilgileri ilacabak ve TİTCK"},

{id:"zona",kat:"Cilt, Göz ve Diş",ad:"Herpes Zoster (Zona)",icd:"B02.9",
 uygun:"Tipik tek taraflı dermatomal vezikülobüllöz döküntü; başlangıçtan 72 saat içinde; göz tutulumu ve bağışıklık sorunu yok.",
 sevk:["Göz tutulumu (burun ucunda vezikül, V1 dermatomu), kulakta döküntü ve yüz felci (Ramsay Hunt)","Bağışıklık baskılanması veya yaygın lezyon","Şiddetli nörolojik bulgu","Gebelik"],
 ilac:[
  {g:"ana",n:"Asiklovir 800 mg tablet",d:"5x1 (yaklaşık 4 saatte bir, gece dozu atlanarak)",s:"7 gün",k:"35 tb (20'lik 2 kutu)",t:"Böbrek yetmezliğinde doz azaltılır; yeterli sıvı alın.",w:["renal"]},
  {...PCM,g:"destek"},{...IBU,g:"alt",c:"Ağrı için parasetamol yetersizse"} ],
 oneri:["Lezyonlar temiz ve kuru tutulmalı.","Suçiçeği geçirmemiş, gebe veya bağışıklığı zayıf kişilerle temastan kaçınma.","Ağrı döküntü geçtikten sonra sürerse (postherpetik nevralji) yeniden değerlendirme."],
 kaynak:"IDSA ve CDC zona tedavi yaklaşımı (genel); SUT EK-4/F'de yalnızca parenteral asiklovir rapora bağlıdır"},

{id:"larenjit",kat:"Solunum / KBB",ad:"Akut Larenjit (Ses Kısıklığı)",icd:"J04.0",
 uygun:"Stridor, nefes darlığı ve yüksek ateş yok; belirtiler 3 haftadan kısa.",
 sevk:["Stridor, nefes darlığı, salya akıtma (epiglottit, krup)","Ses kısıklığı 3–4 haftadan uzun (laringoskopi)","Yutma güçlüğü veya boyun şişliği","Sigara öyküsü ile kronik ses kısıklığı"],
 ilac:[
  {...PCM,g:"ana"},
  {g:"destek",n:"Benzidamin %0,15 oral sprey",d:"4 püskürtme, günde 3–6 kez",s:"5–7 gün",k:"1 şişe (30 ml)",t:"Astım öyküsü olanlarda dikkatli kullanın.",w:["preg"]} ],
 oneri:["Ses istirahati (fısıldamak da sesi yorar), bol sıvı, nemli ortam.","Sigara, alkol ve boğazı temizleme alışkanlığından kaçınma.","Çoğu olgu viraldir; antibiyotik gerekmez."],
 kaynak:"AAO-HNS disfoni rehberi (genel)"},

{id:"aadishal",kat:"Sindirim",ad:"Antibiyotik İlişkili İshal",icd:"K52.1",
 uygun:"Hafif-orta, ateşsiz ve kansız; dehidratasyon yok; yatış veya yoğun antibiyotik öyküsü yok.",
 sevk:["Şiddetli ishal, karın ağrısı, ateş (C. difficile şüphesi; test ve özel tedavi)","Kanlı ishal veya dehidratasyon","Yaşlı, bağışıklığı baskılanmış veya hastane/bakım evi öyküsü","Antibiyotik kesilemiyor ve ishal sürüyor"],
 ilac:[ {...ORS},
  {g:"ana",n:"Saccharomyces boulardii 250 mg kapsül",d:"2x1",s:"Antibiyotik süresince ve sonrasında 5–7 gün",k:"10–20 kps",t:"Merkezi venöz kateteri olan veya bağışıklığı baskılanmış hastada kullanmayın."} ],
 oneri:["Antibiyotik gereksizse hekim kararıyla sonlandırılmalı.","Küçük yudumlarla sık sıvı.","İshal antibiyotik bittikten sonra da sürerse veya şiddetlenirse yeniden başvuru."],
 kaynak:"ACG ve IDSA antibiyotik ilişkili ishal yaklaşımı (genel)"},

{id:"pedikuloz",kat:"Cilt, Göz ve Diş",ad:"Pedikülozis (Baş Biti)",icd:"B85.0",
 uygun:"Canlı bit veya yumurta (nit) görülmüş.",
 sevk:["İkincil bakteriyel enfeksiyon (impetigo)","Gebelik veya 2 yaş altı (hekim değerlendirmesi)","İki uygulamaya rağmen yanıtsızlık"],
 ilac:[
  {g:"ana",n:"Permetrin %1 şampuan",d:"Saça yeterli miktarda uygulayıp 10 dakika bekletin, durulayın; 7–10 gün sonra tekrarlayın",s:"2 uygulama",k:"2 şişe (60–120 ml)",t:"Piretrin ve piretroidlere duyarlılıkta kullanılmaz."} ],
 oneri:["Evdeki tüm yakın temaslılar kontrol edilip gerekirse aynı gün tedavi edilmeli.","Tarak, şapka ve yatak takımları 60°C'de yıkanmalı; tarak ve fırçalar paylaşılmamalı.","Sık dişli tarakla saç taranması bitlerin ve nitlerin uzaklaştırılmasına yardımcı olur."],
 kaynak:"CDC ve AAP pedikülozis yaklaşımı (genel)"},

{id:"kostokondrit",kat:"Kas-İskelet ve Ağrı",ad:"Kostokondrit / Göğüs Duvarı Ağrısı",icd:"M94.0, R07.4",
 uygun:"Kardiyak, pulmoner ve diğer ciddi nedenler klinik ve gerekirse tetkikle dışlanmış; palpasyonla ağrı yeniden oluşuyor.",
 sevk:["Eforla artan, yayılan veya terleme/bulantı eşlik eden göğüs ağrısı (kardiyak neden önce dışlanmalı)","Nefes darlığı, öksürük, kanlı balgam (pulmoner emboli, pnömoni, pnömotoraks)","Ateş, kızarıklık, belirgin şişlik (enfeksiyon, Tietze)","Travma sonrası ağrı (kaburga kırığı), kardiyovasküler risk faktörü yüksek hasta"],
 ilac:[
  {g:"ana",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {g:"alt",n:"Deksketoprofen 25 mg tablet",d:"3x1 (tok karnına)",s:"5 gün",k:"15 tb",x:NS},
  {g:"destek",n:"Diklofenak %1 jel",d:"Ağrılı bölgeye günde 3–4 kez",s:"7–10 gün",k:"1 tüp",w:["nsaid","renal"]},
  {...PPI},{...PCM,g:"alt",c:"NSAİİ kullanılamıyorsa"} ],
 oneri:["Tanı dışlama tanısıdır; ağrı özellikleri değişirse yeniden değerlendirme.","Sıcak uygulama; ağrıyı artıran hareket ve zorlayıcı egzersizden birkaç gün kaçınma.","Çoğu olgu haftalar içinde düzelir."],
 kaynak:"Göğüs duvarı ağrısı yönetimi (genel)"},

{id:"prostatit",kat:"Üriner ve Jinekoloji",ad:"Akut Bakteriyel Prostatit (Febril Olmayan, Retansiyonsuz)",icd:"N41.0",
 uygun:"Ateş ve sepsis bulgusu yok; idrar yapabiliyor; idrar kültürü alınmış; hasta kısa sürede kontrole gelebilir.",
 sevk:["Yüksek ateş, titreme, sepsis bulguları (acil)","İdrar retansiyonu veya yapamama","Diyabet, bağışıklık baskılanması, kateter veya yakın zamanda üriner girişim","Tedaviye 48–72 saatte yanıtsızlık; tekrarlayan olgu"],
 ilac:[
  {g:"ana",n:"Siprofloksasin 500 mg film tablet",d:"2x1",s:"14 gün (kültüre göre 2–4 haftaya uzatılabilir)",k:"28 tb (14'lük 2 kutu)",t:"Tendon, QT ve CNS yan etkileri açısından uyarın. SUT: oral siprofloksasin kısıtlamasız.",w:["renal","cvd"]},
  {...PCM,g:"destek"},{...IBU,g:"alt",c:"Parasetamol yetersizse"},
  {g:"alt",c:"Florokinolon kullanılamıyorsa (yerel direnç durumuna ve kültüre göre)",n:"Trimetoprim + sülfametoksazol 160 mg/800 mg tablet",d:"2x1 (forte tablet)",s:"14 gün (kültüre göre uzatılabilir)",k:"28 tb (20'lik 2 kutu)",t:"Sülfonamid alerjisi, böbrek ve karaciğer yetmezliğinde kullanılmaz; yeterli sıvı alın. SUT EK-4/E: kısıtlama yok. Ürünün güncel satış durumunu net doğrulayamadım.",w:["renal"]} ],
 oneri:["İdrar kültürü sonucuna göre tedavi gözden geçirilmeli.","Bol sıvı; alkol ve baharattan kaçınma.","Cinsel yolla bulaşan enfeksiyon açısından değerlendirme düşünülmeli.","Alfa bloker (tamsulosin) SUT'ta uzman raporu istediği için bu listeye alınmadı."],
 kaynak:"EAU üriner enfeksiyon rehberi (genel)"},

{id:"isirik",kat:"Cilt, Göz ve Diş",ad:"Hayvan ve İnsan Isırığı (Yüzeysel Yara)",icd:"W54, W55",
 uygun:"Yüzeysel yara; el, yüz, genital bölge ve eklem dışında; tendon, kemik ve eklem tutulumu yok; kuduz riski değerlendirilmiş.",
 sevk:["Bilinmeyen, sahipsiz, yabani veya aşısız hayvan ısırığı: kuduz riskli temas değerlendirmesi, aşı ve immünglobulin (aynı gün)","El, yüz, genital bölge veya eklem ısırığı; derin, ezilmiş veya kedi ısırığı","Tendon, sinir, damar veya kemik yaralanması şüphesi","Ateş, selülit, bağışıklık baskılanması, diyabet, karaciğer hastalığı"],
 ilac:[
  {g:"ana",n:"Amoksisilin-klavulanat 1000 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün (profilaksi 3–5 gün)",k:"10–14 tb",x:["pcn"]},
  {g:"alt",c:"Penisilin alerjisi",n:"Doksisiklin 100 mg kapsül",d:"2x1",s:"5–7 gün",k:"10–14 kps",t:"Gebelikte kullanılmaz.",x:["preg"]},
  {g:"alt",c:"Penisilin alerjisi (insan ısırığında doksisikline ek)",n:"Metronidazol 500 mg film tablet",d:"2x1",s:"5–7 gün",k:"14 tb",w:["preg"]},
  {g:"destek",n:"Povidon iyot %10 topikal çözelti",d:"Yara çevresine günde 1–2 kez",s:"Yara kuruyana kadar",k:"1 şişe (30 ml)",t:"Reçetesiz de alınabilir."},
  {...PCM,g:"destek"} ],
 oneri:["Yara hemen bol akan suyla ve sabunla 10–15 dakika yıkanmalı.","Enfekte olmayan yaralar genelde dikilmez; 24–48 saatte kontrol.","Tetanoz aşı durumu sorgulanmalı; hayvanın izlenebilmesi ve kuduz değerlendirmesi hemen yapılmalı."],
 kaynak:"IDSA deri yumuşak doku enfeksiyonları ve WHO kuduz profilaksisi yaklaşımları (genel)"},

{id:"alveolit",kat:"Cilt, Göz ve Diş",ad:"Alveolit (Diş Çekimi Sonrası Ağrı)",icd:"K10.3",
 uygun:"Çekim sonrası 2–4. günde artan şiddetli ağrı; yüz şişliği, ateş ve trismus yok. Diş hekimine yönlendirme zorunludur.",
 sevk:["Yüz veya boyun şişliği, ateş, yutma güçlüğü, trismus (enfeksiyon)","Çekim sonrası durmayan kanama","Bağışıklık baskılanması, diyabet, bifosfonat kullanımı","Alveol temizliği ve pansuman için diş hekimi değerlendirmesi (esas tedavi)"],
 ilac:[
  {...IBU,g:"ana",d:"3x1 (tok karnına)",s:"3–5 gün"},
  {g:"alt",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"3–5 gün",k:"10 tb",x:NS},
  {g:"alt",n:"Flurbiprofen 100 mg film tablet",d:"İlk doz 100 mg, sonra gerekirse 4–6 saatte bir 50–100 mg (en çok 300 mg/gün)",s:"3–5 gün",k:"15 tb (1 kutu)",t:"Böbrek yetmezliğinde düşük doz gerekir.",x:NS},
  {g:"destek",n:"Benzidamin %0,15 gargara",d:"15 ml sulandırmadan, günde 2–3 kez; ilk 24 saatten sonra",s:"5–7 gün",k:"1 şişe (120 ml)",w:["preg"]},
  {...PCM,g:"destek"} ],
 oneri:["Antibiyotik rutin gerekmez.","Çekim bölgesini kuvvetle çalkalama, pipetle içme ve sigara kullanımından kaçınma.","Ağrı birkaç günde belirgin azalmazsa diş hekimine tekrar başvurma."],
 kaynak:"Alveolit yaklaşımı (genel)"},

{id:"tetikparmak",kat:"Kas-İskelet ve Ağrı",ad:"Tetik Parmak ve De Quervain Tenosinoviti (Hafif)",icd:"M65.3, M65.4",
 uygun:"Parmak veya başparmak tendonlarında ağrı ve takılma/kilitlenme; sürekli kilitli değil, güç kaybı yok.",
 sevk:["Parmağın kilitli kalması veya zorla açılması","Belirgin güç kaybı veya sinir belirtisi","Kızarıklık, sıcaklık, ateş (enfeksiyon)","Altı haftalık atel ve ilaç tedavisine yanıtsızlık (enjeksiyon veya cerrahi için ortopedi/fizik tedavi)"],
 ilac:[
  {g:"ana",n:"Diklofenak %1 jel",d:"Ağrılı bölgeye günde 3–4 kez",s:"2 hafta",k:"1 tüp",w:["nsaid","renal"]},
  {g:"alt",c:"Topikal yetersizse kısa süreli",n:"Naproksen sodyum 550 mg tablet",d:"2x1 (tok karnına)",s:"5–7 gün",k:"14 tb",x:NS},
  {...PPI},{...PCM,g:"destek"} ],
 oneri:["Başparmak/el bileği atelinin (De Quervain) veya parmak atelinin 4–6 hafta kullanımı temel tedavidir.","Tekrarlayan kavrama ve sıkıştırma hareketlerini azaltma.","Aylar içinde yavaş düzelir."],
 kaynak:"AAOS el ve el bileği tendinopati yaklaşımı (genel)"},

{id:"acilkontrasepsiyon",kat:"Üriner ve Jinekoloji",ad:"Acil Kontrasepsiyon (Korunmasız İlişki Sonrası)",icd:"Z30.0",
 uygun:"Korunmasız ilişki veya yöntem yetersizliğinden sonra mümkün olan en erken (en geç 72 saat içinde); gebelik yok.",
 sevk:["Gebelik şüphesi veya gecikmiş adet","72 saati aşmış başvuru (120 saate kadar bakır RİA veya ulipristal daha etkilidir; ulipristal bu listede doğrulanmadı)","Cinsel saldırı: adli, tıbbi ve psikososyal destek; cinsel yolla bulaşan enfeksiyon ve HIV profilaksisi değerlendirmesi","Vücut kitle indeksi 30 ve üzeri veya enzim indükleyici ilaç kullanımı (rifampisin, karbamazepin, fenitoin, kantaron): etkinlik azalabilir, bakır RİA düşünülmeli"],
 ilac:[
  {g:"ana",n:"Levonorgestrel 1,5 mg tablet",d:"Tek doz, mümkün olan en erken zamanda",s:"Tek doz",k:"1 tb",t:"İlacı aldıktan sonra 3 saat içinde kusulursa doz tekrarlanır. Emziren kadında ürün bilgisine bakın.",w:["preg"]} ],
 oneri:["Bir sonraki adet 1 hafta kadar erken veya geç gelebilir; 7 günden fazla gecikirse gebelik testi.","Rutin kontrasepsiyon yöntemi değildir; kalıcı yöntem için danışmanlık verilmeli.","Cinsel yolla bulaşan enfeksiyonlara karşı koruma sağlamaz."],
 kaynak:"WHO ve FSRH acil kontrasepsiyon rehberleri (genel); ilaç bilgileri ilacabak ve TİTCK"},

{id:"sigara",kat:"Solunum / KBB",ad:"Sigara Bırakma Tedavisi (Farmakolojik Destek)",icd:"F17.2",
 uygun:"18 yaş ve üzeri, bırakmaya istekli, gebe/emziren değil; aktif psikiyatrik hastalık ve intihar düşüncesi yok; izlem sağlanabilir. Davranışsal destekle birlikte kullanılmalı.",
 sevk:["Aktif psikiyatrik hastalık, intihar düşüncesi veya öyküsü","Gebelik veya emzirme","Ağır böbrek yetmezliği (doz azaltma gerekir); nöbet öyküsü","Alkol veya madde bağımlılığı ile birlikte olan olgular"],
 ilac:[
  {g:"ana",c:"İlk 4 hafta (bırakma günü 8. gün)",n:"Vareniklin 0,5 mg (11 tb) + 1 mg (42 tb) başlangıç paketi",d:"1.–3. gün 0,5 mg 1x1; 4.–7. gün 0,5 mg 2x1; 8. günden itibaren 1 mg 2x1",s:"4 hafta",k:"1 başlangıç paketi (53 tb)",t:"Ruh hali, davranış değişikliği, intihar düşüncesi veya alerjik belirti olursa bırakıp başvurun. KT: gebelikte kullanılmaz, anne sütüne geçebilir, alkolün etkisini artırabilir. SUT ödeme koşulunu doğrulayamadım.",x:["preg"],w:["renal"]},
  {g:"ana",c:"Devam (toplam 12 hafta)",n:"Vareniklin 1 mg film tablet",d:"2x1",s:"8 hafta",k:"112 tb (56'lık 2 kutu)",x:["preg"],w:["renal"]} ],
 oneri:["Bırakma günü tedavinin 8. günü (1–2 hafta içinde) seçilir.","Bulantı sık yan etkidir; ilaç yemekten sonra bol suyla alınabilir.","Sigarayı bırakan hastada 12 hafta daha devam seçeneği hekimle konuşulabilir.","Davranışsal destek ve düzenli izlem başarıyı artırır."],
 kaynak:"WHO ve NICE tütün bırakma yaklaşımları; ilaç bilgileri ilacabak ve TİTCK"},

{id:"alerjikkonj",kat:"Cilt, Göz ve Diş",ad:"Alerjik Konjonktivit",icd:"H10.1",
 uygun:"Çift taraflı kaşıntı, sulanma ve hafif kızarıklık; görme ve ağrı sorunu yok; kontakt lens komplikasyonu yok.",
 sevk:["Ağrı, ışık hassasiyeti, görmede azalma","Tek taraflı kırmızı göz veya belirgin akıntı (enfeksiyon, keratit)","Kontakt lens kullanıcısında kornea tutulumu şüphesi","Şiddetli veya kronik (vernal, atopik) olgular"],
 ilac:[
  {g:"ana",n:"Olopatadin %0,1 göz damlası",d:"Her göze 2x1 damla (8–12 saat ara)",s:"2–4 hafta (mevsim boyunca)",k:"1 şişe (5 ml)",t:"Kontakt lens takılıyken kullanmayın; benzalkonyum klorür içerir. SUT ödeme koşulunu doğrulayamadım."},
  {g:"alt",n:"Setirizin 10 mg tablet",d:"1x1 (akşam)",s:"2–4 hafta",k:"14–28 tb",w:["renal"]} ],
 oneri:["Gözü ovmamak; soğuk kompres rahatlatır.","Bilinen alerjenden (polen, toz akarı, hayvan tüyü) kaçınma.","Damlalıklar gözle ve ellerle temas ettirilmemeli."],
 kaynak:"AAO ve EAACI alerjik konjonktivit yaklaşımı (genel)"}
];

/* ---------- Raporlu ilaç reçeteleri (kronik hasta yenileme notları) ---------- */
const KR = [
{id:"ht",ad:"Hipertansiyon",icd:"I10",
 rapor:["ARB'ler (valsartan, losartan, irbesartan, telmisartan, olmesartan vb.): EK-4/F gereği sağlık raporuna dayanılarak reçete edilir; raporda doz ve süre belirtilmesi zorunlu değildir","ARB'nin diğer antihipertansiflerle kombinasyonlarında, hastanın monoterapiyle kan basıncının yeterince kontrol altına alınamadığı raporda belirtilmelidir"],
 kontrol:["Son 3 ay içinde kan basıncı ölçümü ve ev ölçüm kayıtları (hedef genellikle 140/90 mmHg altı; iyi tolere ediliyorsa 130/80 civarı)","İlaca uyum ve yan etkiler (ACE inhibitörü öksürüğü, kalsiyum kanal blokeri ödemi, diüretik kasılması)","Son 12 ay içinde kreatinin/eGFR, potasyum ve tam idrar tahlili","Gebelik veya gebelik planı (ACE inhibitörü ve ARB kullanılmaz)"],
 sevk:["Kan basıncı 180/110 mmHg ve üzeri veya göğüs ağrısı, nörolojik bulgu, nefes darlığı (acil)","Üç ilaçla bile hedefe ulaşılamıyor","Yeni böbrek fonksiyon bozukluğu veya potasyum yüksekliği","Bayılma, belirgin ortostatik hipotansiyon veya ilaç yan etkisi nedeniyle bırakma isteği"],
 gruplar:[{g:"ACE inhibitörleri",e:"ramipril, enalapril, perindopril"},{g:"ARB'ler",e:"valsartan, losartan, irbesartan, telmisartan",t:"SUT EK-4/F: ARB'ler rapora bağlıdır; raporun geçerliliğini ve kombinasyonlarda monoterapi yetersizliği ifadesini kontrol edin."},{g:"Kalsiyum kanal blokerleri",e:"amlodipin"},{g:"Tiazid ve benzeri diüretikler",e:"hidroklorotiyazid, indapamid"},{g:"Beta blokerler",e:"metoprolol, bisoprolol, nebivolol"}],
 hatirlat:["Tuz kısıtı, kilo kontrolü ve düzenli hareket.","İlacı kendi kendine bırakmama; ölçüm değerlerini kaydetme.","Baş dönmesi, ayak şişliği veya öksürük olursa bildirme."],
 kaynak:"ESC/ESH ve ACC/AHA hipertansiyon rehberleri (genel)"},

{id:"dm",ad:"Tip 2 Diyabet",icd:"E11",
 rapor:["DPP-4 inhibitörleri (sitagliptin, vildagliptin, saksagliptin, linagliptin, alogliptin): metformin ve/veya sülfonilürenin en yüksek tolere edilen dozunda yetersiz kontrol koşuluyla; endokrinoloji veya iç hastalıkları uzmanlarınca ya da bu uzmanların düzenlediği uzman raporuyla tüm hekimlerce reçete edilir","SGLT2 inhibitörleri (dapagliflozin, empagliflozin): aynı yetersiz kontrol koşuluyla; endokrinoloji uzmanının düzenlediği uzman raporuyla tüm hekimlerce reçete edilir","Repaglinid, nateglinid ve oral kombine preparatlar: endokrinoloji, iç hastalıkları, çocuk, kardiyoloji ve aile hekimliği uzmanlarınca veya bu hekimlerin raporuyla tüm hekimlerce reçete edilir","DPP-4 tedavisi sırasında akut pankreatit geçirilirse ilaç kesilir ve tekrar kullanılmaz"],
 kontrol:["Son 3 ay içinde HbA1c (hedef genellikle %7 civarı, hastaya göre bireysel) ve kan şekeri kayıtları","Hipoglisemi öyküsü ve belirtileri","Son 12 ay içinde kreatinin/eGFR, idrarda albümin, lipid paneli, göz dibi ve ayak muayenesi","Sindirim yan etkisi, kilo değişimi, genital mantar veya idrar yolu enfeksiyonu"],
 sevk:["Semptomatik hiperglisemi veya HbA1c belirgin yüksek (yaklaşık %9 üzeri)","Tekrarlayan veya ağır hipoglisemi","Ketoz belirtisi, ayak yarası veya enfeksiyonu","eGFR düşüşü (metformin eGFR 30'un altında kullanılmaz); gebelik veya gebelik planı"],
 gruplar:[{g:"Metformin",e:"metformin"},{g:"Sülfonilüreler",e:"gliklazid, glimepirid",t:"Hipoglisemi riski taşır."},{g:"DPP-4 inhibitörleri",e:"sitagliptin, vildagliptin, linagliptin"},{g:"SGLT2 inhibitörleri",e:"empagliflozin, dapagliflozin",t:"Hastalık günlerinde (kusma, ishal) hekime danışılmalı."},{g:"İnsülinler",e:"hastanın mevcut insülin tipi ve dozu"}],
 hatirlat:["Kan şekeri ölçüm sıklığı ve hipoglisemi belirtileri (terleme, titreme, açlık).","Günlük ayak bakımı ve ayak muayenesi.","Beslenme ve düzenli hareket."],
 sut:"2024 SUT değişikliğiyle aile hekimleri, sağlık raporuna istinaden iç hastalıkları uzmanlarının yazabildiği bazı ilaçları (4.2.38 dahil) yazabilir (SUT 4.1.1).",
 kaynak:"ADA ve EASD tip 2 diyabet yönetimi (genel)"},

{id:"lipid",ad:"Dislipidemi",icd:"E78",
 rapor:["Statinler ve kolestiramin (SUT 4.2.28): daha önce kullanmayan hastalarda uzman hekim raporuna dayanılarak başlanır; bu ilaçlar uzman raporuyla tüm hekimlerce reçete edilir","Fenofibrat, gemfibrozil, ezetimib (statin kombinasyonları dahil; EK-4/F) ve niasin: iç hastalıkları veya kardiyoloji uzmanlarının düzenlediği uzman raporuyla tüm hekimlerce reçete edilir","Kolestiramin: kardiyoloji, kalp ve damar cerrahisi, endokrinoloji, iç hastalıkları veya nöroloji uzmanlarının raporuyla"],
 kontrol:["Son 12 ay içinde lipid paneli (LDL hedefi kardiyovasküler riske göre) ve karaciğer enzimleri (ALT)","Kas ağrısı veya güçsüzlük","İlaç etkileşimleri (makrolidler, azol antifungaller, siklosporin)","Gebelik veya gebelik planı (statin kullanılmaz)"],
 sevk:["ALT normalin üç katından yüksek","Yaygın kas ağrısı ve koyu idrar (rabdomiyoliz şüphesi)","Statin yeni başlanacak ve geçerli uzman raporu yok (uzmana yönlendirin)","LDL hedefte değil (doz veya ilaç değişimi için hekim değerlendirmesi)","Çok yüksek LDL veya ailevi hiperkolesterolemi şüphesi"],
 gruplar:[{g:"Statinler",e:"atorvastatin, rosuvastatin, simvastatin"},{g:"Kolesterol emilim inhibitörü",e:"ezetimib"},{g:"Fibratlar",e:"fenofibrat",t:"Yüksek trigliserit için."}],
 hatirlat:["Düzenli kullanım; kas ağrısı olursa bildirme.","Beslenme ve hareket önerileri.","Greyfurt suyu bazı statinlerin etkisini artırır."],
 kaynak:"ESC/EAS dislipidemi rehberi (genel)"},

{id:"tiroid",ad:"Hipotiroidi",icd:"E03.9",
 rapor:["Levotiroksin EK-4/F listesinde yer almaz; okuduğum SUT sayfalarında rapor koşulu çıkmadı. Güncel SUT'u yine de kontrol edin"],
 kontrol:["Son 6–12 ay içinde TSH","İlacın aç karnına alınması; kalsiyum, demir ve antasitle arasındaki süre","Yeni belirti: çarpıntı, kilo değişimi, halsizlik, üşüme","Gebelik veya gebelik planı; yaşlı ve kalp hastası hastada dikkat"],
 sevk:["TSH hedef dışı (doz ayarı için hekim değerlendirmesi)","Gebelik (doz artışı gerekebilir)","Göğüs ağrısı veya çarpıntı","Yeni guatr veya nodül"],
 gruplar:[{g:"Tiroid hormonu",e:"levotiroksin sodyum",t:"Marka değiştirmeden aynı ürünle sürdürmek tercih edilir."}],
 hatirlat:["Sabah aç karnına, kahvaltıdan 30–60 dakika önce, su ile alınmalı.","Kalsiyum, demir ve antasitle en az 4 saat ara bırakılmalı.","TSH kontrolü atlanmamalı."],
 kaynak:"ATA ve ETA hipotiroidi rehberleri (genel)"},

{id:"astimkoah",ad:"Astım ve KOAH İdame Tedavisi",icd:"J45, J44",
 rapor:["Uzun etkili β2 agonistler ve antikolinerjikler (formoterol, salmeterol, indakaterol, glikopironyum, tiotropium) ile kombinasyonları (SUT 4.2.24): göğüs hastalıkları, göğüs cerrahisi, iç hastalıkları, çocuk sağlığı veya kardiyoloji uzmanlarınca ya da bu uzmanların düzenlediği uzman raporuyla diğer hekimlerce reçete edilir","Formoterol veya salmeterolün inhaler kortikosteroidlerle kombinasyonları: iç hastalıkları, çocuk sağlığı, göğüs hastalıkları veya göğüs cerrahisi uzmanlarınca ya da bu uzmanlardan birinin raporuyla diğer hekimlerce reçete edilir","Montelukast + antihistaminik kombinasyonları: KBB, iç hastalıkları, çocuk sağlığı, göğüs hastalıkları veya alerji uzmanlarınca ya da bu uzmanların raporuyla; tek başına inhaler kortikosteroid ve kısa etkili β2 agonist için okuduğum sayfalarda rapor koşulu çıkmadı"],
 kontrol:["İnhaler tekniği","Kısa etkili β2 agonist kullanım sıklığı (haftada 2 günden fazla ise kontrol yetersiz olabilir)","Gece uyanma ve aktivite kısıtlanması","Son 3 ayda alevlenme veya oral steroid ihtiyacı; sigara kullanımı"],
 sevk:["Son 3 ayda alevlenme veya oral steroid kullanımı","Hızlı etkili inhaler ihtiyacında artış","Belirgin nefes darlığı veya SpO2 düşüklüğü","Tedavi kademesini artırma kararı (hekim değerlendirmesi)"],
 gruplar:[{g:"İnhaler kortikosteroidler",e:"budesonid, flutikazon, beklometazon"},{g:"ICS/LABA kombinasyonları",e:"formoterol, salmeterol içeren kombinasyonlar"},{g:"Uzun etkili antikolinerjikler (KOAH)",e:"tiotropiyum"},{g:"Kısa etkili β2 agonist",e:"salbutamol"}],
 hatirlat:["İnhaler steroid sonrası ağzı çalkalama.","İnhaler tekniğinin düzenli kontrolü.","Sigarayı bırakma; grip ve pnömokok aşıları."],
 kaynak:"GINA ve GOLD rehberleri (genel)"},

{id:"ppi",ad:"Uzun Süreli Proton Pompa İnhibitörü (GÖRH / Mide Koruma)",icd:"K21.9",
 rapor:["Proton pompa inhibitörleri EK-4/F listesinde yer almaz; okuduğum SUT sayfalarında rapor koşulu çıkmadı. Güncel SUT'u yine de kontrol edin"],
 kontrol:["Endikasyonun sürüp sürmediği (Barrett, ülser öyküsü, NSAİİ koruması, şiddetli reflü)","En düşük etkin doz","Alarm semptom sorgusu","Uzun süreli kullanımda B12, magnezyum ve kemik sağlığı"],
 sevk:["Alarm semptom: disfaji, kilo kaybı, GİS kanama, anemi, tekrarlayan kusma","8 haftalık tedaviye yanıtsızlık","Barrett veya ülser öyküsü varken ilacı kesme kararı"],
 gruplar:[{g:"Proton pompa inhibitörleri",e:"pantoprazol, esomeprazol, lansoprazol, omeprazol, rabeprazol"}],
 hatirlat:["Aç karnına, kahvaltıdan önce alınmalı.","Gereksiz uzun kullanım sorgulanmalı; uygunsa doz azaltma veya kesme denemesi.","Yeme alışkanlıkları ve sigara/alkol düzenlenmeli."],
 kaynak:"ACG GÖRH rehberi; PPI deprescribing yaklaşımı (genel)"},

{id:"gut",ad:"Hiperürisemi / Gut İdame Tedavisi",icd:"M10, E79.0",
 rapor:["Allopurinol ve febuksostat EK-4/F listesinde yer almaz; okuduğum SUT sayfalarında rapor koşulu çıkmadı. Güncel SUT'u yine de kontrol edin"],
 kontrol:["Ürik asit düzeyi (hedef genellikle 6 mg/dL altı) ve atak sıklığı","Böbrek fonksiyonu","Döküntü veya ilaç reaksiyonu öyküsü","Atak sırasında idame ilacı kesilmez"],
 sevk:["Yeni döküntü, ateş, ağız yarası (ağır ilaç reaksiyonu: ilacı bırakıp acile yönlendirin)","Sık atak veya tofüs","Böbrek fonksiyonunda belirgin düşüş"],
 gruplar:[{g:"Ksantin oksidaz inhibitörleri",e:"allopurinol, febuksostat",t:"Febuksostat kalp-damar hastalığında dikkatli kullanılır."}],
 hatirlat:["Bol su; alkol (özellikle bira), fruktozlu içecek ve sakatattan kaçınma.","Atakta antienflamatuvar tedavi için başvuru.","Düzenli kan kontrolü."],
 kaynak:"ACR ve EULAR gut yönetimi rehberleri (genel)"},

{id:"depresyon",ad:"Depresyon ve Anksiyete İdame Tedavisi",icd:"F32, F41",
 rapor:["Duloksetin yalnızca erişkin kadında orta-şiddetli stres üriner inkontinansta rapora bağlıdır (EK-4/F); depresyon endikasyonunda bu kısıt aranmaz"],
 kontrol:["PHQ-9 veya GAD-7 gibi skorlar ve intihar düşüncesi sorgusu","Yan etkiler ve ilaç uyumu","Alkol ve madde kullanımı","Etkileşimler (tramadol, triptan, linezolid ile serotonin sendromu riski)"],
 sevk:["İntihar düşüncesi veya planı (acil değerlendirme, psikiyatri)","Mani/hipomani veya psikoz belirtileri","4–6 haftada yanıtsızlık","Gebelik veya emzirme"],
 gruplar:[{g:"SSRI'lar",e:"sertralin, essitalopram, fluoksetin, paroksetin"},{g:"SNRI'lar",e:"venlafaksin, duloksetin",t:"SUT EK-4/F: duloksetin, stres üriner inkontinansta rapora bağlıdır."}],
 sut:"Benzodiazepinler renkli reçeteye tabidir; bu nota dahil değildir.",
 hatirlat:["Düzenli kullanım; ilaç aniden bırakılmamalı (kesme belirtileri).","Etki 2–4 haftada başlar.","İntihar düşüncesi olursa hemen başvurma."],
 kaynak:"NICE ve APA depresyon/anksiyete tedavi rehberleri (genel)"},

{id:"antikoag",ad:"Atriyal Fibrilasyon ve Venöz Tromboembolizm (Oral Antikoagülan)",icd:"I48, I82, I26",
 rapor:["Dabigatran, rivaroksaban, apiksaban ve edoksaban SUT 4.2.15.D-1 ve D-2 kapsamında sağlık raporuna bağlıdır; rapor süresi bitince tedavi sürecekse yeni sağlık kurulu raporu gerekir","2024 SUT değişikliğiyle aile hekimleri bu ilaçları sağlık raporuna dayanarak reçete edebilir (SUT 4.1.1)","Kalça ve diz protezi sonrası profilaksi için ortopedi raporu gerekir (kısa süreli, kutu sayısı sınırlı)"],
 kontrol:["Rapor geçerliliği ve rapordaki ilaç adı","Son 12 ay içinde kreatinin/eGFR ve hemoglobin; yaş, kilo ve böbrek fonksiyonuna göre doz uygunluğu","Kanama belirtileri (dışkıda kan, idrarda kan, burun/diş eti kanaması, morarma)","İlaç etkileşimleri (NSAİİ, antiagregan, bazı antifungal ve antibiyotikler) ve ilaç uyumu"],
 sevk:["Majör kanama veya düşme sonrası kafa travması","eGFR belirgin düşmüş veya doz uygunluğu belirsiz","Girişim, diş çekimi veya ameliyat planı","Planlanan kardiyoversiyon veya ilaç dozu uzun süre atlanmış","Gebelik veya gebelik planı"],
 gruplar:[{g:"Doğrudan oral antikoagülanlar",e:"apiksaban, rivaroksaban, dabigatran, edoksaban"},{g:"K vitamini antagonisti",e:"varfarin",t:"INR izlemi gerektirir; hastanın hedef INR aralığı bilinmeli."}],
 hatirlat:["Doz atlanmamalı, bir sonraki dozda çift doz alınmamalı.","Ağrı kesici olarak NSAİİ yerine parasetamol tercih edilmeli.","Kanama belirtisi, siyah dışkı veya düşme olursa hemen başvurma.","Ameliyat ve diş işlemlerinden önce ilaç kullanımını bildirme."],
 kaynak:"ESC atriyal fibrilasyon ve CHEST VTE rehberleri (genel); SUT 4.2.15"},

{id:"kahky",ad:"Koroner Arter Hastalığı ve Kalp Yetmezliği",icd:"I25, I50",
 rapor:["Klopidogrel (SUT 4.2.15.A): akut koroner olay sonrası belirli durumlarda taburculuk sonrası 4 haftayı geçmemek üzere uzman hekimlerce raporsuz; sonrası için kullanım süresinin (en çok 12 ay) belirtildiği uzman raporuyla diğer hekimlerce","Ivabradin (SUT 4.2.15.C): ejeksiyon fraksiyonu %45'in altındaki kronik kalp yetmezliğinde kardiyoloji uzmanının düzenlediği 1 yıllık rapor gerekir","Eplerenon (EK-4/F): yalnızca spironolakton altında jinekomasti gelişen veya spironolaktonu tolere edemeyenlerde, kardiyoloji uzmanı raporuyla tüm hekimlerce reçete edilir","ARB'ler rapora bağlıdır (EK-4/F)"],
 kontrol:["Göğüs ağrısı, nefes darlığı ve efor kapasitesi; ödem ve kilo (kalp yetmezliğinde 3 günde 2 kg üzeri artış)","Kan basıncı ve nabız","Kreatinin/eGFR ve potasyum (ACE inhibitörü, ARB, spironolakton kullananlarda)","Antiagregan ve antikoagülan uyumu; rapor süresi ve rapordaki ilaçlar"],
 sevk:["Yeni veya artan göğüs ağrısı, bayılma, istirahatte nefes darlığı (acil)","Hızlı kilo artışı veya belirgin ödem","Belirgin hipotansiyon, bradikardi, potasyum yüksekliği veya böbrek fonksiyon bozulması","Rapor süresi bitmiş veya ilaç değişikliği gerekiyor"],
 gruplar:[{g:"Antiagregan",e:"asetilsalisilik asit, klopidogrel"},{g:"Beta blokerler",e:"metoprolol, bisoprolol, karvedilol"},{g:"ACE inhibitörü veya ARB",e:"ramipril, enalapril, valsartan, losartan"},{g:"Mineralokortikoid reseptör antagonisti",e:"spironolakton"},{g:"Diüretikler",e:"furosemid, indapamid"},{g:"Statinler",e:"atorvastatin, rosuvastatin",t:"SUT 4.2.28: yeni başlanacaksa uzman raporu gerekir."}],
 hatirlat:["Ağrı kesici olarak NSAİİ'lerden kaçınma.","Tuz ve sıvı kısıtı (kalp yetmezliğinde), günlük kilo takibi.","İlaçları kendi kendine kesmeme."],
 kaynak:"ESC koroner arter hastalığı ve kalp yetmezliği rehberleri (genel); SUT 4.2.15"},

{id:"demans",ad:"Alzheimer Tipi Demans",icd:"G30, F00",
 rapor:["Donepezil, galantamin, memantin ve rivastigmin (EK-4/F): nöroloji, geriatri ve psikiyatri uzmanlarınca raporsuz; bu hekimlerin düzenlediği uzman raporuyla tüm hekimlerce reçete edilir"],
 kontrol:["Rapor geçerliliği ve rapordaki ilaç","Bilişsel durum ve günlük yaşam aktiviteleri, davranışsal belirtiler (bakım verenden öykü)","Yan etkiler: bulantı, kilo kaybı, bradikardi, bayılma","Düşme riski ve eşlik eden ilaçlar (antikolinerjikler bilişi kötüleştirir)"],
 sevk:["Ani kötüleşme veya deliryum belirtileri (enfeksiyon, ilaç, metabolik neden araştırılmalı)","Bradikardi, senkop veya düşme","Ciddi davranış bozukluğu veya bakım verenin tükenmişliği","Tedaviyi bırakma veya değiştirme kararı"],
 gruplar:[{g:"Kolinesteraz inhibitörleri",e:"donepezil, rivastigmin, galantamin"},{g:"NMDA antagonisti",e:"memantin"}],
 hatirlat:["İlaçlar düzenli ve bakım veren gözetiminde alınmalı.","Yan etkiler ve kilo kaybı bildirilmeli.","Düzenli kontrol ve bakım verene destek önerilir."],
 kaynak:"NICE demans rehberi (genel); SUT EK-4/F"},

{id:"oab",ad:"Aşırı Aktif Mesane",icd:"N32.8",
 rapor:["Solifenasin, tolterodin, trospiyum, darifenasin, propiverin, fesoterodin, mirabegron ve transdermal oksibutinin (EK-4/F): oral oksibutinine yanıt alınamayan veya tolere edemeyen hastalarda, uzman hekimlerce raporsuz; uzman raporuna dayanılarak tüm hekimlerce reçete edilir"],
 kontrol:["Rapor geçerliliği ve rapordaki ilaç","Antikolinerjik yan etkiler: ağız kuruluğu, kabızlık, bulanık görme, yaşlıda bilişsel etki","İdrar retansiyonu, rezidüel idrar şikâyeti, tekrarlayan idrar yolu enfeksiyonu","Erkekte prostat büyümesi belirtileri; glokom öyküsü"],
 sevk:["İdrar retansiyonu veya yapamama","Hematüri veya tekrarlayan idrar yolu enfeksiyonu","Bilişsel bozulma veya düşme","Yanıtsızlık veya tedavi değişikliği"],
 gruplar:[{g:"Antimuskarinikler",e:"solifenasin, tolterodin, trospiyum, fesoterodin, darifenasin"},{g:"Beta-3 agonist",e:"mirabegron"}],
 hatirlat:["Sıvıyı gün içine yaymak; kafein ve alkolü azaltmak.","Mesane eğitimi ve pelvik taban egzersizleri.","Kabızlık ve ağız kuruluğu için bildirme."],
 kaynak:"EAU ve NICE aşırı aktif mesane yaklaşımı (genel); SUT EK-4/F"},

{id:"osteoporoz",ad:"Osteoporoz",icd:"M81",
 rapor:["Bifosfonatlar (alendronat, risedronat, zoledronik asit ve kombinasyonları), raloksifen, kalsitonin, stronsiyum ve denosumab SUT 4.2.17 ve EK-4/F gereği rapora bağlıdır","Tedavi planı, rapor tarihinden önceki son 2 yıl içinde yapılan kemik mineral yoğunluğu (KMY) ölçümüne dayanır","Aktif D vitaminleri (kalsitriol, alfakalsidol) osteoporoz tedavisinde ödenmez","Denosumab prostat/meme kanseri tedavisi görenlerde onkoloji uzmanının yer aldığı sağlık kurulu raporuyla tüm uzman hekimlerce reçete edilir"],
 kontrol:["Rapor geçerliliği ve rapordaki ilaç; son KMY tarihi","Yeni kırık, boy kısalması ve sırt ağrısı","Kalsiyum, 25(OH)D ve kreatinin/eGFR","Yutma sorunu, retrosternal ağrı (oral bifosfonat), diş sorunu veya planlanan diş cerrahisi"],
 sevk:["Yeni kırık veya belirgin sırt ağrısı","eGFR belirgin düşük","Disfaji, retrosternal ağrı veya mide-bağırsak kanaması","Uzun süreli tedavide (yaklaşık 5 yıl) ilaç tatili veya değişiklik kararı"],
 gruplar:[{g:"Bifosfonatlar",e:"alendronat, risedronat, zoledronik asit"},{g:"Seçici östrojen reseptör modülatörü",e:"raloksifen"},{g:"Destek",e:"kalsiyum ve D3 vitamini (kolekalsiferol)"}],
 hatirlat:["Haftalık oral bifosfonat sabah aç karnına, tam bardak suyla alınmalı; 30 dakika yatmamalı.","Düzenli kalsiyum ve D vitamini alımı, ağırlık taşıyıcı egzersiz.","Düşme önlemleri ve sigara-alkolü bırakma."],
 kaynak:"IOF/ESCEO osteoporoz rehberi (genel); SUT 4.2.17"}
];

/* END UNMODIFIED CLINICAL DATA */
const data = Object.freeze({RX, KR});
if(typeof module !== "undefined" && module.exports) module.exports = data;
root.DXData = data;
})(typeof window !== "undefined" ? window : globalThis);
