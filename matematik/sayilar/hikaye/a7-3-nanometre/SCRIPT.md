# SCRIPT — a7-3-nanometre

**Ders:** A7 Bilimsel gösterim (son sahne)
**Fikir:** Üs, virgülün kaç basamak kaydığını sayar; çok küçük sayı böyle okunur.
**Durum:** Seslendirildi (8 Ekim 2026). Metin değişirse `ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb node araclar/hikaye-ses.js a7-3-nanometre` yalnızca değişen satırı yeniden üretir; ortam değişkeni verilmezse araç derslerin anlatıcısıyla üretir.

**Voice:** George (ElevenLabs hazır sesi, `JBFqnCBsd6RMkjVDRZzb`, `eleven_v4`). İngilizce etiketli erkek ses; kullanıcı on bir örnek arasından seçti (8 Ekim 2026). Derslerin anlatıcısı Gamze Özdemir değişmedi; onunla üretilen ilk klipler `assets/ses-gamze/` içinde.
**Voice settings:** modelin varsayılanı; dil `tr` (`araclar/ses-uret.js`, derslerle aynı)
**Ses düzeyi:** ham klipler `assets/ses/`; filmde düzeyi eşitlenmiş kopyalar çalar (`assets/ses-esit/`, ortalama −22 dB, tepe en çok −2 dB; ölçüm `olcum.json`)
**Voice direction:** Sakin, sıcak, hikâye anlatır gibi. Sayılar tane tane. Gülme ve ses efekti yok.

123 kelime · 10 satır · 61,7 saniye konuşma · film 73,5 saniye.
Zaman aralıkları kliplerin filmdeki gerçek yerleridir (`index.html` içindeki `<audio>` öğeleriyle aynı).

---

## Kanca

## Line 1 — Durak (Frame 1)

**Time:** 0.6 – 8.4s

    Ece durakta otobüs beklerken reklam panosundaki telefona baktı. Üstünde kocaman bir yazı vardı: üç nanometre.

## Line 2 — Soru (Frame 2)

**Time:** 9.3 – 12.7s
**Delivery:** [curious]

    Kulağa küçük geliyor. Peki ne kadar küçük?

## İddia

## Line 3 — Sıfırlar (Frame 3)

**Time:** 13.4 – 22.8s

    Nanometre, metrenin milyarda biridir. Üç nanometreyi metreyle yazarsak virgülden sonra sekiz sıfır, ardından bir üç gelir.

## Line 4 — Virgül dokuz basamak (Frame 4)

**Time:** 23.5 – 31.1s

    Virgülü dokuz basamak sağa kaydıralım. Sayaç eksi dokuzu gösterir: üç çarpı on üzeri eksi dokuz metre.

## Kanıt

## Line 5 — Saç teli (Frame 5)

**Time:** 31.9 – 39.1s

    Şimdi rüzgârın savurduğu tek bir saç teline bakalım. Kalınlığı yaklaşık olarak metrenin yüz binde yedisidir.

## Line 6 — Virgül beş basamak (Frame 6)

**Time:** 39.7 – 45.9s

    Burada virgül yalnızca beş basamak kayar: yedi çarpı on üzeri eksi beş metre.

## Sağlama

## Line 7 — İki üs (Frame 7)

**Time:** 46.6 – 51.8s
**Delivery:** [thoughtful]

    Üslere bak: eksi beş ve eksi dokuz. Aralarında dört basamak var.

## Line 8 — Dört yakınlaşma (Frame 8)

**Time:** 52.4 – 57.0s

    Öyleyse saç teline dört kez, her seferinde on kat yaklaşalım.

## Line 9 — Yan yana (Frame 9)

**Time:** 59.3 – 67.1s

    Üç nanometre ancak şimdi görünüyor. Tek bir saç telinin kalınlığına bunlardan yan yana on binlercesi sığar.

## Kapanış

## Line 10 — Kapanış kartı (Frame 10)

**Time:** 68.4 – 70.9s

    Virgül kayar, [short pause] üs sayar.

---

## Sayıların sağlaması

| Nicelik | Değer |
|---|---|
| Reklamdaki uzunluk | 3 nm = 0,000 000 003 m = 3 × 10⁻⁹ m |
| Saç telinin kalınlığı (kurgu, yaklaşık) | 0,00007 m = 7 × 10⁻⁵ m |

- 0,000 000 003: virgülden sonra sekiz sıfır ve bir 3; virgül 9 basamak sağa kayınca 3 kalır, üs −9.
- 0,00007: virgülden sonra dört sıfır ve bir 7; virgül 5 basamak sağa kayınca 7 kalır, üs −5.
- "Yüz binde yedi" = 7 ÷ 100 000 = 0,00007. "Milyarda üç" = 3 ÷ 1 000 000 000 = 0,000 000 003.
- Üsler arası fark: −5 − (−9) = 4 basamak; dört kez 10 kat = 10 000 kat.
- 7 × 10⁻⁵ ÷ 3 × 10⁻⁹ ≈ 23 333; anlatımda "on binlerce".

## Doğruluk notu

- Okunan metinde rakam ve simge yok; birimler yalnızca ekrandaki etiketlerde yazar.
- "3 nanometre" çipin üretim kuşağının adıdır; hikâye "en küçük parça 3 nanometre" demez.
- Saç teli kalınlığı kişiye göre yaklaşık 2 × 10⁻⁵ ile 2 × 10⁻⁴ m arasındadır; "yaklaşık olarak" sözü zorunludur.
- Sıra E3'teki gibi: kanca → iddia → kanıt → sağlama → kapanış. Hikâye dersten sonra oynar; öğrenci virgül ve
  sayaç fikrini görmüştür, bu yüzden 3 × 10⁻⁹ dördüncü satırda söylenir, sona saklanmaz.
- "Sayaç" dersin sözcüğüdür (A7, 1. ve 2. sahne): "Her kayışta on'un üssündeki sayaç bir artar."
