# SCRIPT — d3-yildizlar-bunu-giyiyor

**Ders:** D3 İse, ancak ve ancak (son sahne)
**Fikir:** "p ise q" doğruyken "q ise p" doğru olmayabilir; iki yön de doğruysa "ancak ve ancak" denir.
**Durum:** Seslendirildi (8 Ekim 2026): 11 klip, 778 karakter. Metin değişirse
`node araclar/hikaye-ses.js d3-yildizlar-bunu-giyiyor` yalnızca değişen satırı yeniden üretir; ardından düzey
eşitlenir ve `index.html` içindeki `S`, `C` tabloları ile `<audio>` satırları yeni sürelere çekilir.

**Voice:** Gamze Özdemir (`eleven_v4`), derslerin anlatıcısı
**Voice settings:** modelin varsayılanı; dil `tr` (`araclar/ses-uret.js`, derslerle aynı)
**Ses düzeyi:** ham klipler `assets/ses/`; filmde düzeyi eşitlenmiş kopyalar çalar (`assets/ses-esit/`, ortalama
−22,4 dB, tepe −2,9 ile −6,7 dB arası; ölçüm ve cümle içi duraklamalar `olcum.json`). Eşitleme `ffmpeg` ile:
her klibe, ortalaması −22 dB'ye gelecek ve tepesi −2 dB'yi geçmeyecek kadar kazanç.
**Voice direction:** Sakin, sıcak, hikâye anlatır gibi. Azra'yla alay eden ton yok. Gülme ve ses efekti yok.

113 kelime · 11 satır · 62,8 saniye konuşma · film 74,5 saniye.
Zaman aralıkları kliplerin filmdeki gerçek yerleridir (`index.html` içindeki `<audio>` öğeleriyle aynı).
Okunan metinde rakam ve simge yok.

---

## Durum

## Line 1 — Pano (Frame 1)

**Time:** 0.6 – 6.1s

    Azra, BLACKPINK hayranı. Okul dönüşü bir reklam panosunun önünde durdu.

## Line 2 — Reklamın cümlesi (Frame 2)

**Time:** 6.9 – 14.8s

    Panoda sahne ışıkları, bir çift ayakkabı ve tek bir cümle vardı: Yıldızlar bu ayakkabıyı giyiyor.

## Line 3 — Doğru olsun (Frame 3)

**Time:** 16.1 – 20.5s

    Doğru olsun: sahnenin yıldızıysan bu ayakkabıyı giyiyorsun.

## Line 4 — Azra alır (Frame 4)

**Time:** 21.4 – 25.8s

    Azra harçlığını biriktirdi, ayakkabıyı aldı ve giydi.

## Şaşırtan an

## Line 5 — Ayna (Frame 5)

**Time:** 26.6 – 33.0s
**Delivery:** [thoughtful]

    Aynaya baktı. Ayakkabı aynıydı; ama Azra hâlâ odasındaydı, sahnede değil.

## Line 6 — Tersinden okumak (Frame 6)

**Time:** 33.7 – 41.6s

    Reklam, yıldızsan giyersin diyordu. Azra onu tersinden okumuştu: giyersen yıldız olursun.

## Line 7 — Karşı örnek (Frame 7)

**Time:** 42.4 – 49.2s

    Oysa bu yol tek yönlü. Ters yönü çürütmeye tek karşı örnek yeter: Azra'nın kendisi.

## Demek ki

## Line 8 — Konser kapısı (Frame 8)

**Time:** 50.2 – 56.8s

    Bir ay sonra Azra, BLACKPINK konserinin kapısında. Burada yol iki yöne de açık.

## Line 9 — Bilet (Frame 9)

**Time:** 57.5 – 62.1s

    Bileti olan içeri girer; içeri giren herkesin de bileti vardır.

## Line 10 — Ancak ve ancak (Frame 10)

**Time:** 62.9 – 67.0s

    Azra salona girer, ancak ve ancak bileti varsa.

## Line 11 — Kapanış kartı (Frame 11)

**Time:** 68.1 – 72.3s

    İse tek yön, [short pause] ancak ve ancak çift yön.

---

## Önermelerin sağlaması

| | Önerme | Hikâyede |
|---|---|---|
| p | "Sahnenin yıldızısın." | Panodaki silüet |
| q | "Bu ayakkabıyı giyiyorsun." | Panodaki ve Azra'nın ayağındaki ayakkabı |
| p ⇒ q | "Yıldızsan giyersin." | Reklamın cümlesi; hikâye doğru kabul eder (3. satır) |
| q ⇒ p | "Giyersen yıldız olursun." | Azra'nın okuması (6. satır); yanlış |
| Karşı örnek | q doğru, p yanlış | Azra: ayakkabı ayağında, kendisi odasında (5. ve 7. satır) |
| r ⇔ s | "İçeri girdin" ⇔ "biletin var" | Kapıdaki bilet denetimi (9. ve 10. satır) |

- 9. satır iki yönü ayrı ayrı söyler: "bileti olan içeri girer" (s ⇒ r), "içeri giren herkesin de bileti vardır" (r ⇒ s).
- 10. satır ikisini tek cümlede birleştirir; dersin 2. sahnesindeki okunuşla aynı: "ancak ve ancak".
- 7. satırdaki "tek karşı örnek yeter" dersin 1. sahnesinin cümlesidir ("Tek karşı örnek, ters yön yanlış").

## Doğruluk notu

- Azra, reklam, ayakkabı ve konser kurgudur. BLACKPINK gerçek bir gruptur; metin grup hakkında adından başka bilgi
  vermez ve reklamı gruba bağlamaz (reklam "Yıldızlar" der).
- "Bileti olan içeri girer": cümle kapıdaki sıra için söylenir. Bileti olup gelmeyen kişi itirazı doğarsa satır
  "Kapıda bileti olan içeri girer" yapılır.
- "BLACKPINK" anlatıcıda yanlış okunursa 1. ve 8. satır okunuş yazımıyla ("Blekpink") yeniden üretilir; görüntü
  değişmez. Klipler kulakla dinlenmedi; otomatik döküm (Whisper, `small`) iki klipte de sözcüğü "Blackpink" diye
  tanıdı. Aynı döküm 6. klibin ilk sözcüğünü "Reknam" diye yazdı ("Reklam"): dinlenmesi gereken tek yer.
- Hipotezi yanlış olan "ise" önermesine girilmez (dersin kararı): hikâye Azra yıldız değilken reklam cümlesinin
  doğruluğunu tartışmaz; yalnızca ters yönü çürütür.
