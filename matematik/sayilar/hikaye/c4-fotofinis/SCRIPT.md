# SCRIPT — c4-fotofinis

**Ders:** C4 Sıralama ve arada olma (son sahne)
**Fikir:** İki farklı ondalık sayının arasında her zaman bir başkası vardır; "bir sonraki sayı" yoktur.
**Durum:** Seslendirildi (12 Ekim 2026). `node araclar/hikaye-ses.js c4-fotofinis` yalnızca eksik ya da metni değişmiş satırı üretir.

**Voice:** Gamze Özdemir (ElevenLabs, `eleven_v4`; derslerin ve öteki hikâyelerin anlatıcısı)
**Voice settings:** modelin varsayılanı; dil `tr` (`araclar/ses-uret.js`, derslerle aynı)
**Ses düzeyi:** ham klipler `assets/ses/`; filmde düzeyi eşitlenmiş kopyalar çalar (`assets/ses-esit/`, ortalama −22 dB, tepe en çok −2 dB; ölçüm `olcum.json`)
**Voice direction:** Sakin, sıcak, hikâye anlatır gibi. Sayılar tane tane. Gülme ve ses efekti yok.

128 kelime · 11 satır · 64,7 saniye konuşma · film 74,6 saniye.
Zaman aralıkları kliplerin filmdeki gerçek yerleridir (`index.html` içindeki `<audio>` öğeleriyle aynı).

---

## Kanca

## Line 1 — Stadyum (Frame 1)

**Time:** 0.5 – 4.8s

    Paris, iki bin yirmi dört. Olimpiyatlarda yüz metre finali.

## Line 2 — Bitiş (Frame 2)

**Time:** 5.3 – 11.6s

    Sekiz koşucu çizgiye neredeyse birlikte vardı. Öndeki ikisini gözle ayırmak imkânsızdı.

## Line 3 — Tabela (Frame 3)

**Time:** 12.2 – 18.0s

    Tabela da ayıramadı. İkisinin derecesi aynıydı: dokuz virgül yetmiş dokuz saniye.

## Line 4 — Soru (Frame 3)

**Time:** 18.6 – 20.8s

**Delivery:** [curious]

    Peki altın madalya kimin?

## İddia

## Line 5 — Bir basamak daha (Frame 4)

**Time:** 21.5 – 30.7s

    Bitiş çizgisindeki kamera bir basamak daha okudu: dokuz virgül yedi yüz seksen dört ve dokuz virgül yedi yüz seksen dokuz.

## Line 6 — Sayı doğrusu (Frame 5)

**Time:** 31.3 – 40.7s

    Sayı doğrusunda soldaki küçüktür. Küçük süre, önce varan demek. Altın, saniyenin binde beşiyle kazanıldı.

## Kanıt

## Line 7 — Bir sonraki sayı? (Frame 6)

**Time:** 41.4 – 47.0s

**Delivery:** [thoughtful]

    Peki kazanan dereceden hemen sonraki sayı hangisi? Binde bir fazlası mı?

## Line 8 — Yaklaş (Frame 7)

**Time:** 47.6 – 53.8s

    Yaklaşalım. İkisinin arasında bir sayı daha var. Daha da yaklaşalım: yine var.

## Line 9 — Kamera durur, sayılar durmaz (Frame 8)

**Time:** 54.4 – 61.6s

    Kamera bir yerde durur; sayılar durmaz. Ne kadar yaklaşırsan yaklaş, araya hep yenisi girer.

## Sağlama

## Line 10 — Geri çekil (Frame 9)

**Time:** 62.3 – 67.6s

    İki derece birbirine ne kadar yakın olursa olsun, aralarına bir başkası sığar.

## Kapanış

## Line 11 — Kapanış kartı (Frame 10)

**Time:** 68.5 – 71.8s

    Kesirlerde [short pause] bir sonraki sayı yoktur.

---

## Sayıların sağlaması

| Nicelik | Değer |
|---|---|
| Tabeladaki derece (iki koşucu) | 9,79 sn |
| Kameranın okuduğu dereceler | 9,784 sn ve 9,789 sn |
| Fark | 9,789 − 9,784 = 0,005 sn (saniyenin binde beşi) |
| 9,784 ile 9,785'in ortası | 9,7845 |
| 9,7840 ile 9,7841'in ortası | 9,78405 |
| Kameranın sınırı | saniyede en çok 40 000 kare: iki kare arası 0,000 025 sn |

- 9,784 < 9,7845 < 9,785 ve 9,784 < 9,78405 < 9,7841 < 9,7845: her yakınlaşmada araya giren sayı bir öncekinden
  kazananın derecesine daha yakındır.
- Atletizmde derece yüzde bire **yukarı** yuvarlanır: 9,784 de 9,789 da tabelada 9,79 olur. Bu yüzden iki derece
  9,78 ile 9,79'un arasındadır; sayı doğrusu bu aralıkla açılır.

## Doğruluk notu

- Yarış gerçektir: Paris 2024, erkekler 100 metre finali, 4 Ağustos 2024. Birinci 9,784, ikinci 9,789; ikisi de
  9,79 olarak yayımlandı. Kaynaklar `plan/matematik/sayilar/hikaye/C4-fotofinis.md` bölüm 2.
- Anlatım ve görüntü koşucuların adını, ülkesini, forma rengini ve kulvar numarasını vermez; figürler şematiktir.
- "Sekiz koşucu neredeyse birlikte": sekiz finalistin dereceleri 9,79 ile 9,91 arasındadır.
- "Kamera bir yerde durur": bitiş kamerası saniyede en çok 40 000 kare çeker; daha ince bir farkı ayıramaz.
  Hikâye bu sayıyı söylemez, yalnızca sınırın varlığını söyler.
- Okunan metinde rakam ve simge yok; dereceler yalnızca ekrandaki etiketlerde yazar.
- "Soldaki küçüktür" ve "bir sonraki sayı" dersin sözleridir (C4, 1. ve 2. sahne).
