---
format: 1920x1080
duration: 72.5s
message: "Aynı kuvvet, küçük yüzeyde daha çok bastırır."
arc: Durum → Şaşırtan an → Demek ki
audience: 9. sınıf öğrencileri
mode: collaborative
---

Resimli taslak. Tek dünya (yan yana üç durak: ev, okul yolu, vitrin), tek kompozisyon (`index.html`); kareler
arasında kesme yok, kamera aynı resimde gezer. 5–7. karelerde ekranı kareli defter sayfası kaplar. Süreler tahmindir
(`plan/fizik/akiskanlar/hikaye/A1-cantanin-askisi.md`, bölüm 6); ses üretilince gerçek değerlere çekilir.
Hareket adları `hyperframes-animation` kurallarından. Sekiz kare de çizildi ve hareketlendirildi (7 Ekim 2026);
seslendirildi, zamanlama gerçek klip sürelerine göre (`index.html` içindeki `T`); aşağıdaki `duration`, `poster` ve
`voiceover` satırları ilk taslaktan kalmadır, okunan metin `SCRIPT.md` içindedir. Plandan ayrılan iki yer: 3. kare yolda değil evde geçer (iz ancak açık
omuzda görünür), 4. kare iki parçadır (masada kitaplar, sonra yolda sırt çantası).

## Frame 1 — Sabah

- scene: Elif'in odası. Balkonda ipte asılı, damlayan sırt çantası (geniş askılar). Masada ipli spor torbası ve kitaplar; Elif beşinci kitabı yığından alıyor
- duration: 7.4s
- poster: 5s
- status: animated
- voiceover: "Elif'in sırt çantası yıkanmış, daha kurumamış. Kitaplarını ipli spor torbasına doldurur."
- src: index.html
- rules: viewport-change, sine-wave-loop

Kamera eve yavaşça yaklaşır, çantadan damla düşer, perde ve yapraklar salınır; beş kitap tek tek torbaya girer,
torba her kitapta hafifçe esner.

## Frame 2 — Yol

- scene: Okul yolu, Elif arkadan; torba sırtında, ipler iki omuzda. İpler yürüdükçe omza gömülür
- duration: 4.4s
- poster: 10s
- status: animated
- voiceover: "Okul yolunun yarısında ipler omuzlarını kesmeye başlar."
- src: index.html
- rules: viewport-change, sine-wave-loop

## Frame 3 — Akşam

- scene: Akşam ışığı, yine oda. Elif arkadan, omuzları açık; yakın planda iki kırmızı çizgi çizilir
- duration: 4.1s
- poster: 15s
- status: animated
- voiceover: "Akşam omuzlarında iki kırmızı çizgi vardır."
- src: index.html
- rules: coordinate-target-zoom, svg-path-draw

## Frame 4 — Ertesi gün

- scene: Sabah, yine oda: aynı beş kitap torbadan çıkar, masadaki sırt çantasına girer. Sonra aynı yol, aynı açı: askı omuzda geniş ve düz durur
- duration: 4.8s
- poster: 19s
- status: animated
- voiceover: "Ertesi gün aynı kitaplar sırt çantasında. Omuzları acımaz."
- src: index.html
- rules: viewport-change, spring-pop-entrance

## Frame 5 — Soru

- scene: Kareli defter sayfası alttan girer. İki çanta yan yana; altlarında aynı beş kitabın silueti, arada soru işareti
- duration: 3.7s
- poster: 23.5s
- status: animated
- voiceover: "Kitaplar hafiflemedi. Peki ne değişti?"
- src: index.html
- rules: nudge-curve, spring-pop-entrance

## Frame 6 — Omuz kesiti

- scene: Yan yana, aynı ölçekte iki omuz kesiti: solda ip (1 cm), sağda askı (5 cm). Onar özdeş ok; solda tek karoya yığılır, sağda beş karoya dağılır
- duration: 23.3s
- poster: 45s
- status: animated
- voiceover: "Yük aynı; omuzlarına binen kuvvet de aynı. Değişen, kuvvetin etki ettiği yüzey. İp bir santimetre genişliğinde. Bütün kuvvet o dar şeride biner. Askı beş santimetre. Aynı kuvvet beş kat geniş yüzeye yayılır. Yüzey küçüldükçe basınç büyür; ip bu yüzden keser."
- src: index.html
- rules: svg-path-draw, control-target-sync, stat-bars-and-fills

Ölçekli: 60 px = 1 cm. İp 60 px, askı 300 px; iki tarafta 10 ok, karo başına 10 ve 2.

## Frame 7 — Poşet

- scene: Aynı sayfada küçük çizim: dolu market poşeti, ince sap, parmaklarda aynı kırmızı çizgi
- duration: 5.3s
- poster: 51s
- status: animated
- voiceover: "Dolu market poşetinin ince sapı da parmaklarını böyle acıtır."
- src: index.html
- rules: scale-swap-transition, svg-path-draw

## Frame 8 — Kapanış

- scene: Defter iner; mağaza vitrini, sıra sıra çantalar. Elif geniş askılı olana uzanır. Kart: kapanış cümlesi
- duration: 13s
- poster: 63s
- status: animated
- voiceover: "Elif artık çantanın rengine değil, askısına bakıyor. Aynı kuvvet, küçük yüzeyde daha çok bastırır."
- src: index.html
- rules: viewport-change, waterfall-entry

Ekrandaki tek cümle budur.
