---
format: 1920x1080
duration: 72.6s
message: "Mutlak değer, hedefe uzaklıktır."
arc: Durum → Şaşırtan an → Demek ki
audience: 9. sınıf öğrencileri
mode: autonomous
---

Resimli taslak. Tek dünya (kış gecesinde kesit ev), tek kompozisyon (`index.html`); kareler arasında
kesme yok, kamera aynı resimde gezer. Sıcaklık şeridi ve kapanış kartı ekrana sabit katmandır.
Hareket adları `hyperframes-animation` kurallarından.

## Frame 1 — Kış akşamı

- scene: Kesit ev geniş planda. Dışarıda ay, kar, çıplak ağaç; içeride kombi, pencere, petek, termostat "22°", koltukta Mert
- duration: 6.4s
- poster: 2s
- status: animated
- voiceover: "Kış akşamı, dışarıda kar yağıyor. Mert'lerin kombisi yirmi iki dereceye ayarlı."
- src: index.html
- rules: viewport-change, sine-wave-loop

Kamera yavaşça eve yaklaşır. Kar yağar, bardaktan buğu tüter, kedi pervazda uyur.

## Frame 2 — Oynayan gösterge

- scene: Kamera termostata ve Mert'e iner; ekrandaki sayı 22,3 → 21,8 → 22,1 diye oynar
- duration: 10.8s
- poster: 9s
- status: animated
- voiceover: "Ama oda hiç tam yirmi ikide durmuyor; biraz iner, biraz çıkar. Mert merak eder: Kombi ne zaman çalışacağını nereden biliyor?"
- src: index.html
- rules: viewport-change, discrete-text-sequence

Mert başını termostata çevirir. Soruyla birlikte başının üstünde soru işareti belirir, kamera geri açılır,
kombi yeniden kadraja girer; termostattan kombiye kesik bir yay uzanır.

## Frame 3 — Sıcaklık şeridi

- scene: Altta kâğıt şerit: 20–24 arası sayı doğrusu, 22'de hedef çentiği. İmleç 21,4'e, sonra 22,8'e kayar
- duration: 8.7s
- poster: 24s
- status: animated
- voiceover: "Sıcaklık yirmi bir virgül dört. Kombi çalışmıyor. Yirmi iki virgül sekiz. Yine çalışmıyor."
- src: index.html
- rules: spring-pop-entrance, counting-dynamic-scale

Her iki okumada kombinin karanlık alev penceresini bir halka çevreler. Kedi kıpırdamaz.

## Frame 4 — Pencere açılır

- scene: Mert kupayı koltuğun koluna bırakıp pencereye yürür, kanadı açar; soğuk hava içeri dolar, oda mavileşir, perdeler uçuşur. İmleç 20,9'a düşer, kombide alev yanar
- duration: 8.7s
- poster: 33s
- status: animated
- voiceover: "Mert pencereyi açar. Oda soğur: yirmi virgül dokuz. Kombi hemen çalışır."
- src: index.html
- rules: svg-path-draw, counting-dynamic-scale, spring-pop-entrance

Şaşırtan an. Alev penceresi turuncuya döner, sıcak su gidiş borusunda peteğe yürür, dışarıdaki bacadan buhar çıkar.
Kedi başını kaldırır.

## Frame 5 — 22'ye uzaklık

- scene: Şerit yukarı doğru büyür, oda loşlaşır. 22 turuncu hedef; 21 ve 23'te boş nokta, arası "pay" (iki yana 1°). Üç okuma için uzaklık yayları: 0,6 · 0,8 · 1,1
- duration: 23.7s
- poster: 57s
- status: animated
- voiceover: "Termostatın derdi tek: Oda yirmi ikiden ne kadar uzaklaştı? İzin verdiği pay, bir derece. Yirmi bir virgül dört, sıfır virgül altı uzakta. Yirmi iki virgül sekiz, sıfır virgül sekiz. İkisi de payın içinde. Yirmi virgül dokuz ise bir virgül bir uzakta. Pay aşıldı."
- src: index.html
- rules: coordinate-target-zoom, svg-path-draw, spring-pop-entrance

Demek ki. İlk iki yay sıcak renkte ve payın içinde biter; üçüncüsü soğuk mavide, 21'deki boş noktayı
aşar; aşan parça kalın maviyle işaretlenir, yanında küçük bir alev belirir. Şerit ölçeklidir (350 px = 1 °C):
uzaklıklar gerçekten 0,6 · 0,8 · 1,1 birim yer kaplar.

## Frame 6 — Kombi dinlenir

- scene: Mert pencereyi kapatır. İmleçten 22'ye uzanan çubuk kısalır; 21'deki boş noktadan içeri girince maviden turuncuya döner, alev söner, kedi yeniden uyur
- duration: 5.3s
- poster: 61s
- status: animated
- voiceover: "Yirmi ikiye uzaklık birden küçükse kombi dinlenir."
- src: index.html
- rules: counting-dynamic-scale, sine-wave-loop

## Frame 7 — Kapanış

- scene: Kamera geri çekilir; ev karlı gecenin içinde ışıl ışıl. Lacivert kart: cümle + |x − 22| < 1
- duration: 9s
- poster: 70s
- status: animated
- voiceover: "Mutlak değer, hedefe uzaklıktır."
- src: index.html
- rules: viewport-change, waterfall-entry, svg-path-draw

Ekrandaki tek cümle budur.
