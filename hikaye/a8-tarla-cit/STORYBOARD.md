---
format: 1920x1080
duration: 66s
message: "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz."
arc: Durum → Şaşırtan an → Demek ki
audience: 9. sınıf öğrencileri
mode: autonomous
---

Resimli taslak. Tek dünya (resimli harita), tek kompozisyon (`index.html`); kareler arasında
kesme yok, kamera aynı haritada gezer. Hareket adları `hyperframes-animation` kurallarından.

## Frame 1 — Dede ve Elif

- scene: Yol kenarında dede ile Elif; arkada ev, solda tarlanın köşesi
- duration: 4s
- poster: 2s
- status: animated
- voiceover: "Elif'in dedesi tarlasını çitle çevirecek."
- src: index.html
- rules: viewport-change, sine-wave-loop

Orta plan. Dede koluyla tarlayı gösterir. Bacadan duman, ağaçlar hafif sallanır.

## Frame 2 — Kare tarla

- scene: Tarla üstten; tebeşir çizgisi kareyi çizer, ortada "1000 m²", sağda "? m" kartı
- duration: 8s
- poster: 11s
- status: animated
- voiceover: "Tarla tam bir kare. Alanı bir dönüm; yani bin metrekare. Dedesi sorar: Kaç metre çit alayım?"
- src: index.html
- rules: viewport-change, svg-path-draw, spring-pop-entrance

Kamera yükselir, tarla tam üstten görünür. Köşelere dik açı, kenarlara eşitlik işareti.
Soruyla birlikte çevrede hayalî direkler belirir; kart "? m" der.

## Frame 3 — Bitmeyen rakamlar

- scene: Telefon hesap makinesi; √1000'in rakamları ekrandan taşıp kâğıdın üstünde sürer
- duration: 12.6s
- poster: 22s
- status: animated
- voiceover: "Elif önce bir kenarı bulmalı: karekök bin. Telefona yazar. Otuz bir virgül altı, iki, iki, yedi… Rakamlar bitmiyor. Kök tam çıkmadı."
- src: index.html
- rules: press-release-spring, discrete-text-sequence

Şaşırtan an. Tuşlara basılır, sonuç satırı ekrana sığmaz; rakamlar telefonun dışına yürür.

## Frame 4 — 31 desek

- scene: Çit tarlanın çevresini dolanır, sayaç 124 m'de durur; köşede 2,5 m açıklık, keçi içeri girer
- duration: 9.5s
- poster: 33s
- status: animated
- voiceover: "Otuz bir metre desek? Dört kenar, yüz yirmi dört metre eder. Çit yetmez. İki buçuk metre açık kalır."
- src: index.html
- rules: svg-path-draw, counting-dynamic-scale, spring-pop-entrance

Çit ölçekli çizilir (600 px = 31,62 m); açıklık gerçekten 2,5 metrelik yer kaplar.

## Frame 5 — 32 desek

- scene: Çit bu kez kapanır ve köşeden taşar; artan 1,5 m kırmızıyla işaretli
- duration: 8.5s
- poster: 41s
- status: animated
- voiceover: "Otuz iki desek? Yüz yirmi sekiz metre. Bu kez bir buçuk metre çit artar. Boşa para."
- src: index.html
- rules: svg-path-draw, counting-dynamic-scale

Keçi dışarıda bekler. Artan tel makarasıyla birlikte köşenin dışında kalır.

## Frame 6 — 31,6 alalım

- scene: Çit kapanır gibi; büyüteç köşeye iner: 9 cm açıklık, üstünde bir karış
- duration: 14.5s
- poster: 55s
- status: animated
- voiceover: "Otuz bir virgül altı alalım: yüz yirmi altı virgül dört metre. Eksik, yalnızca dokuz santim. Bir karış bile değil. Otuz bir virgül altı tam değer değil; ama işi görüyor."
- src: index.html
- rules: svg-path-draw, coordinate-target-zoom, spring-pop-entrance

Büyüteçte direk, telin ucu ve aradaki boşluk yandan görünür. El karışla ölçer; bağ teli boşluğu
kapatır. Keçi köşeye gelir, giremez.

## Frame 7 — Kapanış

- scene: Kamera geri çekilir; gün batımı, ufukta tepeler. Kâğıt kart: cümle + √1000 ≈ 31,6
- duration: 8.7s
- poster: 63s
- status: animated
- voiceover: "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz."
- src: index.html
- rules: viewport-change, waterfall-entry, svg-path-draw

Ekrandaki tek cümle budur.
