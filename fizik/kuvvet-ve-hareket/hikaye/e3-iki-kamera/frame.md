# frame.md — İki kamera arası

Durum: onaylandı (7 Ekim 2026; kullanıcı 1–3. kareleri görüp beğendi).

## Üslup

Kâğıt kesme: düz renkli katmanlar üst üste yapıştırılmış gibi durur, her katman altındakine ince bir gölge düşürür.
Kuş bakışı kır yolu, öğleden sonra ışığı. Çizgi yok, degrade yok; biçimler dolguyla ayrılır. Üstte hafif kâğıt dişi.
A8 (guaj harita, gündüz) ve B7'den (kuru pastel, kış gecesi) bilerek ayrışır.

## Renkler

| Rol | Ad | Değer |
|---|---|---|
| Zemin | buğday | `#E3B85A` |
| Zemin, ikinci | hardal | `#C99532` |
| Zemin, üçüncü | zeytin | `#8A9450` |
| Koyu doğa | koyu zeytin | `#5F6B3A` |
| Yol | asfalt | `#2E3340` |
| Yol, banket | açık asfalt | `#454B5C` |
| Yüzey (gösterge, kart) | lacivert | `#1B2845` |
| Yazı ve açık yüzey | kâğıt | `#F4EAD5` |
| Şerit çizgisi | şerit sarısı | `#F1C84B` |
| Vurgu (tek) | kiremit | `#C5492F` |
| Gölge | koyu toprak | `#2A2010` |

Vurgu yalnızca şunlarda: gösterge ibresi, tabelanın halkası, sınır çentiği, zarfın mührü, arabanın fren lambası.
Başka yerde kiremit yok.

## Yazı

IBM Plex Sans (`assets/fonts/`, B7 ile aynı dosyalar). Yalnızca rakam ve birim.

| Rol | Ağırlık | Boyut |
|---|---|---|
| Göstergedeki okuma | 700 | 96 px |
| Tabela rakamı | 700 | 78 px |
| Ölçü etiketi (12 km, 6 dk, saat) | 600 | 54 px |
| Birim, kadran rakamı | 500 | 28 px |
| Kapanış cümlesi | 600 | 72 px |

Rakamlar `tabular-nums`. 24 pikselden küçük yazı yok.

## Ölçek ve yerleşim

Yol şeridi yatay, y = 700–840. Sol direk x = 240, sağ direk x = 1680; 120 px = 1 km. Kilometre taşları her 120 pikselde.
Göstergeler şeridin üstünde, yarıçap 205 px. Sağ ileri demektir.

İki plan var. Genel plan: bütün şerit (0–1920). Yakın plan (4–6. kareler): iki kat büyütme, kamera arabayı ekranın
ortasında tutar; arabanın göstergesi ekrana sabit olarak sağ üstte durur, saat damgaları direğin üstünde ortalanır,
kilometre sayacı şeridin altında arabayla birlikte ilerler.

## Hareket

Girişler yumuşak oturur (`power3.out`, `expo.out`); zıplama yok. İbre `power2.out` ile gelir. Kesme yok; kamera aynı
dünyada gezer.

## Yapma

- Kontur çizgisi, degrade, parlama, neon.
- Yüz ayrıntısı, gerçek marka, logo, plaka.
- Kiremiti süs olarak kullanmak.
- Eksenli grafik.
