---
format: 1920x1080
duration: 75s
message: "Kesirlerde “bir sonraki sayı” yoktur."
arc: Kanca → İddia → Kanıt → Sağlama → Kapanış
audience: 9. sınıf öğrencileri
mode: autonomous
---

Sürüm: v1 (12 Ekim 2026). On kare kurulu (`animated`) ve seslendirildi (Gamze Özdemir, 11 klip, 64,7 sn konuşma);
film 74,6 saniye. Kare başlangıçları kliplerin gerçek sürelerinden ve cümle içi duraklamalarından çıkarıldı
(`assets/ses-esit/olcum.json`); geçerli zamanlar `index.html` içindeki `T` tablosundadır:
0 · 5,0 · 11,9 · 21,1 · 30,9 · 41,0 · 47,3 · 54,1 · 61,9 · 67,9 sn.

## Kararlar

- **Mesaj:** iki farklı ondalık sayının arasında her zaman bir başkası vardır; "bir sonraki sayı" yoktur.
- **Kitle ve yay:** 9. sınıf öğrencisi, C4 dersini yeni bitirmiş. Gerçek bir yarış (iki koşucu, aynı derece) →
  altın kimin? → kamera bir basamak daha okur → sayı doğrusunda soldaki küçüktür → peki bir sonraki sayı? →
  yaklaş, araya giren sayı → kamera durur, sayılar durmaz → geri çekil, aralık dolar → kapanış.
- **Biçim:** 1920×1080, 74,6 saniye, anlatım var, müzik ve efekt yok. Altyazı videoya gömülmez.
- **Omurga:** tek dünya, tek kamera, kesme yok. Stadyum → bitiş çizgisi → tabela → kamera paneli → panelin
  cetveli → sayı doğrusu.
- **Kahraman nesne:** dersteki sayı doğrusu ve sonsuz yakınlaşma (C4, 1. ve 3. sahne).
- **Hatırlanacak nesne:** tabeladaki iki eş derece ve fotofiniş.
- **Yön kuralı:** pistte sağ ileri; doğruda küçük solda. İkisi aynı karede gösterilmez.
- **Görsel kimlik:** `frame.md`.
- **Durağan kareler:** 3. karenin sonu ("Peki altın madalya kimin?") ve 6. karenin sonu ("Binde bir fazlası mı?").

## Ölçek

Sayı doğrusunda `z = 0` iken 150 px = 0,001 sn (9,78 ile 9,79 arası 1500 px). Her `z` artışı tam 10 kattır;
`z` üzerinde yumuşatma yapıldığı için yakınlaşma logaritmik ölçekte, gözle eşit hızda yürür. 9,784 sabit
noktadır. Bir düzeyin çizgileri aralık 20 px'i geçince belirir, etiketleri 200–300 px arasında açılır; daha ince
düzeyin etiketi açılınca kabası söner (9,784 → 9,7840 → 9,78400). Araya giren sayı j. düzeyde
9,784 + 5 · 10^−(3+j)'dir: 9,7845 · 9,78405 · 9,784005 …

Pistte 1 px ≈ 1,2 cm (koşucu 160 px). Bitişte lidere uzaklıklar gerçek derece farklarıyla orantılıdır:
ikinci 4 px, sonuncu 106 px geridedir (9,784 · 9,789 · 9,81 · 9,82 · 9,85 · 9,86 · 9,88 · 9,91).

## Ekrandaki sözcükler

Tabela: "9,79 sn" (iki satır), sonra "9,784 sn" ve "9,789 sn". Sayı doğrusu: "9,78", "9,79", "9,784", "9,789", "<",
"0,005 sn", "?", "9,785", çizgi etiketleri, araya giren sayılar ("9,7845", "9,78405" …), aralık göstergesi
("0,001 sn" … ), madalyadaki "1". Kapanış kartı: "Kesirlerde “bir sonraki sayı” yoktur." ve
"9,784 < 9,7845 < 9,785". Başka sözcük yok.

## Yasaklar

- Ekranda cümle yok (kapanış kartı dışında).
- Gerçek koşucuların adı, yüzü, forması, ülke rengi, kulvar numarası; olimpiyat halkaları, logo.
- Derste geçmeyen işlem ve terim yok ("yoğunluk", "limit", "sonsuz" denmez; "arada olma" dersin sözüdür).
- Koşucular sayı doğrusunun üstünde gösterilmez.
- Süs olarak dönen hareket yok; her hareket konum, ölçek ya da sayı taşır.

## Hareket ilkeleri (araştırmadan)

Kaynaklar `plan/matematik/sayilar/hikaye/C4-fotofinis.md` bölüm 5.

- Yakınlaşma logaritmik ölçekte yürür (GSAP ExpoScaleEase belgesi: doğrusal ölçek gözle hız değiştirir).
- Girişler yavaşlayarak oturur ve çıkışlardan uzundur (Material, NN/g); doğrusal hareket yalnızca makinede
  (kamera taraması).
- Aynı anda tek büyük hareket; sıra en durağandan en önemliye (Carbon, Material koreografi).
- Sıfırdan büyüyerek giriş yok; küçük nesneler 0,4–0,7 ölçekten yaylanarak gelir (Emil Kowalski).
- Düşünce biten yerde ekran durur (Jellyvision: 1–1,5 sn sessizlik); sürekli hareket yok.
- Görüntü sözcükle birlikte ya da hemen önce iner (ses-görüntü eşzamanlama eşikleri; çıkarım).
- Sayılar yerinden oynamaz: etiketler ortalanır, okunurken yer değiştirmez; en az kelime başına 0,3 sn + 0,5 sn.
- Hareket bulanıklığı yok; hız hissini ağır çekim ve flaş verir (School of Motion: bulanıklık temas anını siler).

## Frame 1 — Stadyum

- status: animated
- src: index.html
- duration: 5.0s
- poster: 3.5s
- transition_in: cut
- scene: Gece, boş mor pist; kulvar çizgileri çizilir, bitiş çizgisi iner, projektörler yanar
- voiceover: "Paris, iki bin yirmi dört. Olimpiyatlarda yüz metre finali."
- motion: svg-path-draw (kulvar çizgileri, 35 ms arayla) · multi-phase-camera (yavaş itiş, salınım)

Önce yer (tribün, pist), sonra çizgiler, en son ışık: lambalar tek tek yanar, koniler bir kez titrer. Bitiş
çizgisinin hizasında küçük bir kamera durur; 4. karenin habercisidir.

## Frame 2 — Bitiş

- status: animated
- src: index.html
- duration: 6.9s
- poster: 5.6s
- transition_in: continuous
- scene: Sekiz koşucu soldan girer, bitişe doğru ağır çekim; çizgide donar, kamera iki lidere yaklaşır
- voiceover: "Sekiz koşucu çizgiye neredeyse birlikte vardı. Öndeki ikisini gözle ayırmak imkânsızdı."
- motion: coordinate-target-zoom (bitiş çizgisine) · hız rampası (`power4.out`) · flaş

Koşu döngüsü alınan yoldan hesaplanır; ağır çekimde bacaklar da yavaşlar. Birinci geriden gelir. Çizgide flaş
patlar, öbür altı koşucu solar, iki liderin üstüne birer ok iner. Aradaki fark 4 pikseldir: görünmez.

## Frame 3 — Tabela

- status: animated
- src: index.html
- duration: 9.2s
- poster: 8.0s
- transition_in: continuous
- scene: Kamera tabelaya kalkar; iki satır aynı sayıyı yakar: 9,79. Aralarında kararsız bir madalya
- voiceover: "Tabela da ayıramadı. İkisinin derecesi aynıydı: dokuz virgül yetmiş dokuz saniye. Peki altın madalya kimin?"
- motion: multi-phase-camera (kalkış ve itiş) · LED parçaları 25 ms arayla yanar

Üçüncü basamağın yeri sönük durur: tabelada bir basamak daha var ama yanmıyor. Soruda madalya iki satır arasında
bir yukarı bir aşağı gider, sonra ekran durur.

## Frame 4 — Bitiş kamerası

- status: animated
- src: index.html
- duration: 9.8s
- poster: 9.4s
- transition_in: continuous
- scene: Kameranın paneli açılır; tarama çizgisi şeridi soldan sağa kurar, iki derece cetvele düşer; tabela 9,784 ve 9,789 olur
- voiceover: "Bitiş çizgisindeki kamera bir basamak daha okudu: dokuz virgül yedi yüz seksen dört ve dokuz virgül yedi yüz seksen dokuz."
- motion: sabit hızlı tarama (tek doğrusal hareket) · LED satırı kırpışır, yeni basamak yanar

Şeritte yatay eksen zamandır: her koşucunun izi çizgiye vardığı anda başlar. Tabeladaki 9,79'un 9'u 8'e döner:
tabela yukarı yuvarlamıştı.

## Frame 5 — Sayı doğrusu

- status: animated
- src: index.html
- duration: 10.1s
- poster: 9.0s
- transition_in: zoom-through
- scene: Panelin cetveli ekranı doldurur; 9,784 solda, 9,789 sağda; aralarına "<", kazananın üstüne madalya, altına 0,005 sn
- voiceover: "Sayı doğrusunda soldaki küçüktür. Küçük süre, önce varan demek. Altın, saniyenin binde beşiyle kazanıldı."
- motion: zoom-through (alt çerçevenin içine giriş) · spring-pop-entrance (madalya)

Tabela ve panel solar; cetvel aynı işaretlerle büyür. Geçiş kesme değil, aynı nesnenin büyümesidir.

## Frame 6 — Bir sonraki sayı?

- status: animated
- src: index.html
- duration: 6.3s
- poster: 5.6s
- transition_in: continuous
- scene: 9,784'ten 9,785'e alçak bir sıçrayış çizilir; konduğu çizgide halka ve "?"
- voiceover: "Peki kazanan dereceden hemen sonraki sayı hangisi? Binde bir fazlası mı?"
- motion: svg-path-draw (noktalı yay) · durağan bitiş

Dersin açılış yanılgısı ("0,5'ten sonra 0,6 gelir") burada hikâyenin sayılarıyla sorulur.

## Frame 7 — Yaklaş

- status: animated
- src: index.html
- duration: 6.8s
- poster: 6.2s
- transition_in: continuous
- scene: İki kez 10 kat yakınlaşma; her seferinde araya altın bir sayı girer: 9,7845, sonra 9,78405
- voiceover: "Yaklaşalım. İkisinin arasında bir sayı daha var. Daha da yaklaşalım: yine var."
- motion: coordinate-target-zoom (sabit nokta 9,784, logaritmik) · spring-pop-entrance (altın nokta)

Sağ üstte aralık göstergesi açılır: 0,001 sn → 0,0001 sn → 0,00001 sn. Yanında kamera simgesi durur.

## Frame 8 — Kamera durur, sayılar durmaz

- status: animated
- src: index.html
- duration: 7.8s
- poster: 5.0s
- transition_in: continuous
- scene: Kamera simgesi sınırında kalır; yakınlaşma hızlanarak sürer, her düzeyde araya yeni bir altın sayı girer
- voiceover: "Kamera bir yerde durur; sayılar durmaz. Ne kadar yaklaşırsan yaklaş, araya hep yenisi girer."
- motion: coordinate-target-zoom (hızlanan, `power1.in`) · counting-dynamic-scale (etiket bir basamak uzar)

Kamera bir kez sallanır ve sönükleşir; gösterge onu geride bırakır. Etiket her düzeyde bir sıfır uzar.

## Frame 9 — Geri çekil

- status: animated
- src: index.html
- duration: 6.0s
- poster: 5.2s
- transition_in: continuous
- scene: Hızla geri çekilir; iki derecenin arası, her adımda her boşluğun ortasıyla dolar ve altın bir çizgi olur
- voiceover: "İki derece birbirine ne kadar yakın olursa olsun, aralarına bir başkası sığar."
- motion: coordinate-target-zoom (geri) · orta noktalarla çoğalma (1, 2, 4 … 64 nokta)

Orta nokta dersin kuralıdır: a ile b'nin ortası (a + b)/2 her zaman aradadır.

## Frame 10 — Kapanış kartı

- status: animated
- src: index.html
- duration: 6.7s
- poster: 5.5s
- transition_in: crossfade
- scene: Krem kart: "Kesirlerde “bir sonraki sayı” yoktur." ve "9,784 < 9,7845 < 9,785"
- voiceover: "Kesirlerde bir sonraki sayı yoktur."
- motion: titlecard-reveal (öteki hikâyelerle aynı düzen)

Cümle iki parça hâlinde, sesle birlikte gelir. Kart 3,3 saniye durur.
