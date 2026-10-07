---
format: 1920x1080
duration: 62s
message: "Gösterge anı söyler, ortalama bütün yolu."
arc: Kanca → İddia → Kanıt → Sağlama → Kapanış
audience: 9. sınıf öğrencileri
mode: collaborative
---

Sürüm: v1 (7 Ekim 2026). Plan aşaması; bütün kareler `outline`. Çizim, ses ve kompozisyon başlamadı.

## Kararlar

- **Mesaj:** Göstergede okunan sürat yalnızca bir anındır; bütün yolun süratini yol ve süre birlikte söyler.
- **Kitle ve yay:** 9. sınıf öğrencisi, E3 dersini yeni bitirmiş. Çelişki (iki kez 85, yine ceza) → neden (kameralar
  saate bakar) → yolculuk → hesap → iki sayının adı.
- **Biçim:** 1920×1080, yaklaşık 62 saniye, anlatım var, müzik ve efekt yok. Altyazı videoya gömülmez; alt bant
  boş bırakılmaz.
- **Omurga:** iki kamera direği arasındaki yol şeridi. İlk kareden son kareye ekrandadır; sol direk başlangıç,
  sağ direk bitiştir. Kesme yok; kamera aynı resimde yaklaşır ve uzaklaşır.
- **Kahraman nesne:** sürat göstergesi. 1. karede iki tane görünür, 10. karede geri gelir ve şeridin üstünde
  birer noktaya iner.
- **Yön kuralı:** sağ ileri demektir; araba ve zaman soldan sağa akar. Hiçbir şey sola doğru girmez.
- **Görsel kimlik:** `frame.md` henüz yazılmadı. Çizim dili onaylanınca yazılır; yazı tipi, kapanış kartı düzeni ve
  renk rolleri B7 projesinden ve `ortak/` altındaki stil dosyalarından alınır, hafızadan yazılmaz.
- **Durağan kare:** 2. kare. Zarf düştükten sonra "Neden?" söylenirken hiçbir şey kıpırdamaz.

## Ölçek

Şerit 1440 px = 12 km, yani 120 px = 1 km. Sol direk x = 240, sağ direk x = 1680. Arabaların konumu sayaçtaki
dakikadan hesaplanır: gerçek araba 6. dakikada 1680'de; sınıra uyan araba sabit 90 km/h ile 6. dakikada 9. kilometrede
(x = 1320), 8. dakikada 1680'de.

## Ekrandaki sözcükler

Yalnızca ölçü etiketleri: "90", "85", "130", "14.00", "14.06", "14.08", "12 km", "6 dk", "8 dk", "2 dk",
"12 km ÷ 6 dk", "120 km/h", "90 km/h". Kapanış kartı: "Gösterge anı söyler, ortalama bütün yolu." ve
"ortalama sürat = alınan toplam yol ÷ hareket süresi". Başka sözcük yok.

## Yasaklar

- Sürat–zaman ya da yol–zaman grafiği yok; eksen çizilmez.
- Ekranda cümle yok (kapanış kartı dışında). "Hız", "yer değiştirme", "ivme" sözcükleri yok.
- Gerçek kurum adı, logo, plaka, ceza tutarı yok. Zarf yazısızdır.
- Öğüt veren kare yok; ceza olayın sonucudur, ders değil.
- Slayt gösterisi yok: her kare yeni bir kart açmaz, aynı şeridin üstünde bir şey değişir.
- Ekran koruyucu yok: hiçbir hareket sayı ya da konum taşımadan süs olarak dönmez.

## Hâlâ açık

- Sıra: bu sürüm cezayı başa aldı (kanca). İlk taslaktaki "durum → şaşırtan an → demek ki" sırası istenirse
  1–3. kareler 6. kareden sonraya taşınır; sayılar ve çizimler değişmez.
- Çizim dili: kâğıt kesme önerisi onay bekliyor.
- 10 ve 11. karelerde "anlık" ve "ortalama" sözcükleri etiket olarak yazılsın mı? Şu an yazılmıyor ("ekranda
  cümle yok" kuralı); yalnızca sesle söyleniyor.
- Müzik ve efekt: yok. Kamera çakması için tek bir efekt istenir mi?

## Frame 1 — iki-gosterge (0,0–5,5 sn, ~5,5 sn)

- scene: Yol şeridi kuş bakışı, iki ucunda kamera direği. Her direğin üstünde bir gösterge: ikisi de 85. Ortada tabela: 90
- duration: 5.5s
- poster: 4.5s
- transition_in: cut
- status: outline
- voiceover: "İki kamera. Gösterge ikisinde de seksen beş. Sınır doksan."
- src: index.html
- rules: spring-pop-entrance, svg-icon-enrichment
- hero: gösterge (ilk görünüş)
- seam_out: aynı kare; zarf yukarıdan düşer
- constraint: araba yok, insan yok; yalnızca iki ölçüm ve bir sınır
- why: Çelişkiyi öğrencinin diliyle kurar: iki sayı da sınırın altında.

Kanca. Direkler sırayla çakar (sol, sonra sağ); her çakmada üstündeki gösterge belirir ve ibresi 85'e oturur.
"Sınır doksan" denirken tabela belirir. İlk hareket 0,2 saniye içinde.

## Frame 2 — ceza (5,5–9,0 sn, ~3,5 sn)

- scene: İki göstergenin ortasına yazısız bir zarf düşer; üstünde küçük kamera simgesi
- duration: 3.5s
- poster: 8s
- transition_in: none
- status: outline
- voiceover: "Yine de ceza geldi. Neden?"
- src: index.html
- rules: spring-pop-entrance
- hero: zarf
- seam_out: zarf küçülüp sol direğe gider; göstergeler soluklaşır
- constraint: zarfta yazı ve tutar yok; "Neden?" sırasında hiçbir şey hareket etmez
- why: Soruyu sorar. Durağan kare: soru boşlukta kalır.

Zarf "ceza" sözcüğünde iner ve oturur; sonra kare donar.

## Frame 3 — saat (9,0–13,0 sn, ~4 sn)

- scene: Göstergeler soluk. Her direğin üstünde bir saat damgası: 14.00 ve 14.06
- duration: 4s
- poster: 12s
- transition_in: none
- status: outline
- voiceover: "Çünkü kameralar göstergeye bakmaz; saate bakar."
- src: index.html
- rules: scale-swap-transition, spring-pop-entrance
- hero: saat damgası
- seam_out: kamera sol direğe yaklaşır
- constraint: göstergeler silinmez, soluklaşır; 10. karede geri gelecekler
- why: İddia. Filmin geri kalanı bunun kanıtıdır.

"Göstergeye bakmaz"da göstergeler küçülüp soluklaşır, "saate bakar"da yerlerine damgalar gelir.

## Frame 4 — ilk-kamera (13,0–19,0 sn, ~6 sn)

- scene: Kamera şeridin sol ucuna iner. Araba kuş bakışı, içinde iki figür. Köşede büyük gösterge: ibre 130'dan 85'e iner. Direk çakar
- duration: 6s
- poster: 18s
- transition_in: none
- status: outline
- voiceover: "Deniz dayısının arabasında. İlk kamerada dayısı frene basar: seksen beş."
- src: index.html
- rules: viewport-change, control-target-sync, svg-icon-enrichment
- hero: gösterge (büyük)
- seam_out: araba sağa doğru hızlanır, kamera peşinden gider
- constraint: yüz ayrıntısı yok; fren lambası yanar ama "yavaşlama" hesabı yok
- why: Kanıtın ilk yarısı: kameranın önünde gösterge sahiden 85.

İbrenin inişi ile arabanın şeritteki yavaşlaması aynı tween'i paylaşır. Çakma anında 14.00 damgası direğe iğnelenir.

## Frame 5 — gaz (19,0–22,5 sn, ~3,5 sn)

- scene: Araba şeridin ortasında; ibre 130'da. Kilometre taşları hızla geçer
- duration: 3.5s
- poster: 21.5s
- transition_in: none
- status: outline
- voiceover: "Kamerayı geçince yeniden gaza: yüz otuz."
- src: index.html
- rules: viewport-change, control-target-sync, motion-blur-streak
- hero: gösterge (büyük)
- seam_out: kamera arabayla birlikte sağ uca kayar
- constraint: başka araç yok; sollama, yarış duygusu yok
- why: Gösterge ile bütün yol arasındaki farkın kaynağı: arada 130.

## Frame 6 — ikinci-kamera (22,5–29,5 sn, ~7 sn)

- scene: Şeridin sağ ucu. İbre yine 85'e iner, direk çakar. Şeridin altında "12 km" ayracı çizilir
- duration: 7s
- poster: 28.5s
- transition_in: none
- status: outline
- voiceover: "On iki kilometre sonra ikinci kamera. Yine fren, yine seksen beş."
- src: index.html
- rules: viewport-change, control-target-sync, svg-path-draw
- hero: gösterge (büyük)
- seam_out: kamera geri çekilir, bütün şerit görünür
- constraint: 4. karenin birebir yansıması; yeni bir şey eklenmez
- why: Kanıtın ikinci yarısı; 1. karedeki iki 85 buradan geliyor.

"On iki kilometre"de ayraç soldan sağa çizilir. Çakma anında 14.06 damgası direğe iğnelenir.

## Frame 7 — damgalar (29,5–35,0 sn, ~5,5 sn)

- scene: Bütün şerit. Uçlarda 14.00 ve 14.06, altta "12 km", damgaların arasında "6 dk"
- duration: 5.5s
- poster: 34s
- transition_in: none
- status: outline
- voiceover: "Kameralar yalnızca saati yazdı: on iki kilometre, altı dakika."
- src: index.html
- rules: viewport-change, counting-dynamic-scale, svg-path-draw
- hero: saat damgası (3. kareye cevap)
- seam_out: iki etiket ortada birleşir
- constraint: büyük gösterge kadrajdan çıkar; ekranda yalnızca kameraların bildiği iki şey kalır
- why: Kameranın elindeki veriyi sayar: bir yol, bir süre.

Damgalar arasındaki sayaç 0'dan 6'ya sayar ve "6 dk" olarak oturur.

## Frame 8 — bolme (35,0–39,0 sn, ~4 sn)

- scene: Şeridin üstünde "12 km ÷ 6 dk"; "120 km/h"e döner
- duration: 4s
- poster: 38.5s
- transition_in: none
- status: outline
- voiceover: "Dakikada iki kilometre: saatte yüz yirmi."
- src: index.html
- rules: scale-swap-transition, counting-dynamic-scale
- hero: 120 km/h etiketi
- seam_out: şeridin soluna soluk bir araba gelir
- constraint: işlem tek satır; ara adım yazılmaz, sesle söylenir
- why: Hesap. Cezanın sayısı ortaya çıkar.

## Frame 9 — sinira-uyan (39,0–45,0 sn, ~6 sn)

- scene: Şeritte iki araba ve bir sayaç. Gerçek araba 14.06'da sağ direkte; soluk araba o anda 9. kilometrede, 14.08'de varır. Aradaki "2 dk" işaretlenir
- duration: 6s
- poster: 44s
- transition_in: none
- status: outline
- voiceover: "Sınıra uyan araba aynı yolu en az sekiz dakikada geçerdi."
- src: index.html
- rules: control-target-sync, counting-dynamic-scale, spring-pop-entrance
- hero: soluk araba
- seam_out: soluk araba ve sayaç silinir; göstergeler geri gelir
- constraint: konumlar sayaçtan hesaplanır; soluk araba sabit ilerler, gerçek araba uçlarda yavaş ortada hızlıdır
- why: 120'yi 90 ile yan yana koyar: fark iki dakika olarak görülür.

Sayaç ile iki arabanın konumu tek değerden sürülür. Soluk arabanın üstünde "90 km/h", vardığında "8 dk".

## Frame 10 — anlik (45,0–50,0 sn, ~5 sn)

- scene: 1. karedeki iki gösterge geri gelir, şeridin iki ucunda birer noktaya iner; ikisi de 85
- duration: 5s
- poster: 49s
- transition_in: none
- status: outline
- voiceover: "Seksen beş, yalnızca o anın süratiydi: anlık sürat."
- src: index.html
- rules: scale-swap-transition, coordinate-target-zoom
- hero: gösterge (geri dönüş; 1. kareye cevap)
- seam_out: şeridin üstünde bir ayraç açılır
- constraint: göstergenin şeritte kapladığı yer bir nokta kadardır; çizgi ya da bölge değildir
- why: 1. karedeki sayıya adını verir.

## Frame 11 — ortalama (50,0–55,0 sn, ~5 sn)

- scene: Bütün şeridi saran bir ayraç; üstünde 120 km/h. Uçlardaki iki nokta yerinde
- duration: 5s
- poster: 54s
- transition_in: none
- status: outline
- voiceover: "Yüz yirmi ise bütün yolun sürati: ortalama sürat."
- src: index.html
- rules: svg-path-draw, spring-pop-entrance
- hero: 120 km/h etiketi (8. kareye cevap)
- seam_out: kamera geri çekilir, kart gelir
- constraint: ayraç şeridin tamamını kapsar; nokta ile ayraç aynı karede kalır, karşıtlık bozulmaz
- why: Öbür sayıya adını verir; mesajın görüntüsü budur: iki nokta ve bir ayraç.

## Frame 12 — kapanis (55,0–62,0 sn, ~7 sn)

- scene: Şerit küçülüp arkada kalır. Kart: kapanış cümlesi ve model
- duration: 7s
- poster: 60s
- transition_in: none
- status: outline
- voiceover: "Gösterge anı söyler, ortalama bütün yolu."
- src: index.html
- rules: viewport-change, waterfall-entry
- hero: şerit (arkada, küçük)
- seam_out: son
- constraint: ekrandaki tek cümle budur; cümle bittikten sonra kart en az 3 saniye durur
- why: Mesajı dersin cümlesiyle bağlar.

Cümle iki parça hâlinde gelir ("Gösterge anı söyler," / "ortalama bütün yolu."); model altında belirir.
