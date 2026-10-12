# frame.md — Fotofiniş

Durum: uygulandı (12 Ekim 2026). Kullanıcı kareleri görmeden kuruldu; onayı bekliyor.

## Üslup

Gece stadyumu, düz biçimli spor afişi: kontur yok, degrade yok; biçimler dolguyla ayrılır, ışık ayrı bir biçimdir
(projektör konileri). Koşucular tek renkli piktogramdır: baş, gövde ve kalın, yuvarlak uçlu kol ve bacaklar; yüz,
forma, numara yok. Pist mordur (Paris 2024'ün pisti mordu). Tabela yedi parçalı LED rakamlarla yazar. Üstte hafif
kâğıt dişi.

Neden bu: hikâyenin yarısı stadyumda, yarısı bir sayı doğrusunda geçer; düz biçim ve az renk ikisini aynı dünyada
tutar. Bitiş kamerasının görüntüsü de yan yana dizilmiş ince dikey şeritlerdir; sayı doğrusunun çizgileri onun
devamı gibi durur. A8 (guaj harita), B7 (kuru pastel, kış gecesi), E3 (kâğıt kesme, gündüz), A7 (risograf, krem
kâğıt) ve D3'ten (çıkartma defteri) bilerek ayrışır: burada zemin koyu, ışık konu, hareket kamera.

## Renkler

| Rol | Ad | Değer |
|---|---|---|
| Zemin, gök | gece | `#14112B` |
| Tribün, tabela gövdesi | koyu mor | `#211B4A` |
| Pist | mor | `#7E69D2` |
| Çizgi, ışık, yazı | krem | `#F4EEDF` |
| Birinci koşucu ve derecesi | turuncu | `#FF7A3D` |
| İkinci koşucu ve derecesi | nane | `#4FD8B4` |
| Vurgu (tek): araya giren sayılar, madalya, LED | altın | `#FFC94A` |

Turuncu ve nane veri rengidir: film boyunca aynı iki koşucuyu ve onların iki sayısını taşır (koşucu → tabela
satırı → kamera şeridi → sayı doğrusundaki işaret). İki koşucu biçimle de ayrılır: turuncu daire, nane eşkenar
dörtgen. Renkler ülke ve forma renklerinden bilerek uzak seçildi. Altın yalnızca "araya giren" şeylerdedir.

## Yazı

IBM Plex Sans (`assets/fonts/`, öteki hikâyelerle aynı dosyalar). Yalnızca rakam, "<", "?" ve "sn".

| Rol | Ağırlık | Boyut |
|---|---|---|
| İşaretlerin derecesi (9,784 · 9,789) | 700 | 54 px |
| Araya giren sayı | 700 | 46 px |
| Çizgi etiketleri | 600 | 34 px |
| Aralık göstergesi (0,001 sn …) | 700 | 44 px |
| Kapanış cümlesi | 600 | 80 px |

Tabeladaki rakamlar yazı tipi değil, çizimdir (yedi parça). 28 pikselden küçük yazı yalnızca kamera panelindeki
küçültülmüş cetvelde var (30 px).

## Yerleşim

Stadyum: gök y < 120, tribün 120–470, reklam bandı 470–520, pist 520–1000 (sekiz kulvar, her biri 60 px), iç saha
1000–1080. Bitiş çizgisi x = 1420. Sağ ileri demektir: koşucular soldan sağa koşar. Tabela tribünün üstünde,
gökte durur; kamera yukarı kalkınca görünür.

Sayı doğrusu: taban çizgisi y = 640. Küçük sayı solda. Kazananın derecesi (9,784) yakınlaşmanın sabit noktasıdır.
Çizgi etiketleri doğrunun altında, işaretlerin dereceleri üstünde. Aralık göstergesi sağ üstte, ekrana sabit.

## Hareket

- Kamera tek bir bakış noktasıdır; kesme yok. Yarış → bitişe yaklaşma → tabelaya kalkış → kamera paneli → panelin
  cetvelinin içine giriş → sayı doğrusu.
- Yakınlaşma logaritmik ölçekte yürür: her adım tam 10 kattır ve gözle eşit hızda görünür.
- Girişler yavaşlayarak oturur (`power3.out`, `expo.out`), çıkışlar hızlanarak gider ve girişlerden kısadır.
  Yaylanma yalnızca küçük, tek nesnelerde (işaret, madalya, altın nokta). Kamera yaylanmaz.
- Aynı anda tek büyük hareket. Soru sorulan iki karede (3 ve 6) ekran durur.
- LED rakam çevrilmez, yanar: parçalar 25 ms arayla sırayla yanar.
- Bitiş kamerasının taraması sabit hızlıdır (makine); başka sabit hızlı hareket yok.

## Yapma

- Gerçek koşucuların adı, yüzü, forması, ülke rengi, kulvar numarası; olimpiyat halkaları ve logosu.
- Neon parlama, renk geçişli yazı, cam efekti.
- Koşucuları sayı doğrusunun üstüne yerleştirmek: pistte öndeki sağdadır, doğruda küçük olan soldadır; ikisi
  aynı karede karışır.
- Altını süs olarak kullanmak.
