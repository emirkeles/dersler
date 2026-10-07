# frame.md — Çantanın askısı

Durum: öneri (7 Ekim 2026). 1. kare bu dosyaya göre çizildi; kullanıcı onaylayınca kesinleşir.

## Üslup

Mürekkep kontur ve suluboya: önce ince, hafif titrek mürekkep çizgi; sonra çizgiye tam oturmayan, kenarında pigment
birikmiş boya lekeleri. Boya çizginin dışına taşar ya da içinde beyaz bırakır; hikâye de bir şeyin yüzeye
yayılmasını anlatır. Krem kâğıt, sabah ışığı. Tamamı vektör; doku SVG süzgeciyle verilir.
A8 (guaj harita), B7 (kuru pastel, kış gecesi) ve E3'ten (kâğıt kesme, çizgisiz) bilerek ayrışır.

## Renkler

| Rol | Ad | Değer |
|---|---|---|
| Zemin | kâğıt | `#F4ECD9` |
| Çizgi ve yazı | mürekkep | `#2B2733` |
| Duvar | saman | `#EFD59A` |
| Ahşap | bal | `#C98F58` |
| Gök, cam, su | sabah mavisi | `#9CC8E3` |
| Işık | güneş | `#F6D36B` |
| Sırt çantası | petrol | `#2F8C88` |
| Torba | lacivert | `#35508F` |
| İp | kâğıt | `#F4ECD9` |
| Elif | adaçayı (kazak), `#4C5A78` (pantolon), `#E9B996` (ten), `#3A2D2A` (saç) | `#8FB58A` |
| Kitaplar | mavi, hardal, mor, turuncu, koyu yeşil | `#4A78C2` `#E0B040` `#8E68B0` `#E58A3A` `#3F7D5A` |
| Vurgu (tek) | iz kırmızısı | `#D7372F` |

Vurgu yalnızca şunlarda: omuzdaki ve parmaktaki iz, okların yığıldığı karo. Başka hiçbir nesne kırmızı değildir.

## Yazı

IBM Plex Sans (`assets/fonts/`, B7 ile aynı dosyalar). Yalnızca ölçü etiketi ve kapanış cümlesi.

| Rol | Ağırlık | Boyut |
|---|---|---|
| Ölçü etiketi (1 cm, 5 cm) | 600 | 54 px |
| Kapanış cümlesi | 600 | 68 px |

24 pikselden küçük yazı yok. Rakamlar süzgeçsiz katmanda durur.

## Çizgi ve boya

- Kontur 3,5 px, yuvarlak uçlu; ayrıntı çizgisi 2,2 px. Çizgi katmanı hafifçe titretilir (4–5 px).
- Her nesne üç katmandır: kâğıt renginde örtü (arkadaki çizgiyi kapatır), boya lekesi (çizgiden birkaç piksel kaymış,
  süzgeçli), kontur.
- Boya düz değildir: içinde bulutlanma, kenarında koyulaşma, üstünde kâğıt dişi.
- Figürde yüz ayrıntısı yok.

## Ölçek ve yerleşim

Dünya 5760 × 1080: ev 0–1920, okul yolu 1920–3840, vitrin 3840–5760. Evde duvar–zemin çizgisi y = 800, masa üstü
y = 600. Kesit karesinde 60 px = 1 cm.

## Hareket

Girişler yumuşak oturur (`power2.out`, `sine.inOut`); kamera yavaş. Zıplama yalnızca soru işaretinde. Kesme yok.

## Yapma

- Degrade dolgu, parlama, gölge düşürme, neon.
- Yüz ayrıntısı, gerçek marka, logo.
- Kırmızıyı süs olarak kullanmak.
- Kesitte ölçü etiketi dışında yazı; formül.
