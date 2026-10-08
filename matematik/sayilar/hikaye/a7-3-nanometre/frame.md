# frame.md — 3 nanometre ne kadar küçük?

Durum: onaylandı (8 Ekim 2026; kullanıcı 1. kareyi görüp onayladı).

## Üslup

Risograf baskı: krem kâğıdın üstüne dört mürekkep sırayla basılmış gibi durur. Ara tonlar nokta taramasıyla
(yarım ton) verilir; degrade yok. Sarı mürekkep konturun birkaç piksel yanına düşer (kayık baskı). Koyu mürekkeple
kalın, eşit kontur. Akşamüstü, alçak güneş, rüzgâr. Kâğıt geniş boş bırakılır; resim aydınlıktır.

Neden bu: hikâyenin kancası basılı bir reklamdır; baskıya yaklaşınca nokta görünür, film de yaklaştıkça küçüğü
gösterir. Dört düz mürekkep rakamları her ölçekte keskin tutar. A8 (guaj harita), B7 (kuru pastel, kış gecesi) ve
E3'ten (konturu olmayan kâğıt kesme) bilerek ayrışır.

## Renkler

| Rol | Ad | Değer |
|---|---|---|
| Zemin | krem kâğıt | `#F3EBDC` |
| Kontur, koyu yüzey, yazı | koyu mürekkep | `#191C45` |
| Gök, uzak şehir, gölge | mavi mürekkep | `#3560C4` |
| Işık, Ece'nin montu, reklamın zemini | sarı mürekkep | `#F6C231` |
| Vurgu (tek) | mercan mürekkep | `#D8334A` |

Vurgu yalnızca şunlarda: reklamdaki "3 nm", virgül, 10'un üssündeki sayaç (ve onun dört pipi), saç telinin
içindeki 3 nm işaretleri.
Başka yerde mercan yok.

## Yazı

IBM Plex Sans (`assets/fonts/`, B7 ve E3 ile aynı dosyalar). Yalnızca rakam ve birim.

| Rol | Ağırlık | Boyut |
|---|---|---|
| Reklamdaki "3 nm" (genel planda) | 700 | 112 px |
| Basamak satırı | 700 | 96 px |
| Üs sayacı | 700 | 62 px |
| Kıyas satırları | 700 | 88 px |
| Ölçek etiketi, sayaç | 700 | 54–60 px |
| Kapanış cümlesi | 600 | 80 px |

Rakamlar `tabular-nums`. 28 pikselden küçük yazı yok.

## Ölçek ve yerleşim

Genel plan (1–2. kareler): yer çizgisi y = 860, yol y = 996–1080. Ece solda (x ≈ 700), reklam panosu ortanın
sağında (x = 1010–1370), durak sağda. Sağ ileri demektir: rüzgâr, bakış ve virgül soldan sağa gider.

Basamak planı (3–7. kareler): basamak satırı ekranın alt üçte birinde, ekrana sabit; dünya üstünde kalır.

Saç teli planı (5–9. kareler): tel dikey durur, kalınlığı yatayda ölçülür. 200 px = 10⁻⁵ m; tel 1400 px.
Her yakınlaşma tam 10 kattır. Ölçek etiketi üst ortada, ekrana sabittir.

Ekrana sabit yüzeyler (basamak şeridi, etiketler, kapanış kartı) krem kâğıttır: koyu çerçeve, sarı kayık gölge.

## Hareket

Açılışta mürekkepler sırayla basılır: mavi, koyu, sarı (sarı kayık gelir, yerine oturur), en son mercan. Girişler
yumuşak oturur (`power3.out`, `expo.out`); zıplama yok. Virgül dersteki gibi küçük bir yay çizerek kayar. Kesme
yok; kamera aynı dünyada yaklaşır.

## Yapma

- Degrade, parlama, neon, 3B gölge.
- Yüz ayrıntısı, gerçek marka, logo, model adı.
- Mercanı süs olarak kullanmak.
- Devre kartı deseni, parlayan çip, "teknoloji mavisi" arka plan.
