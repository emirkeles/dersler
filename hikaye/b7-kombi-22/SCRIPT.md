# SENARYO — Kombi 22 derecede

**Ders:** B7 Mutlak değerle aralık (son sahne)
**Fikir:** |x − a| < r: hedefe uzaklık payın içinde.
**Durum:** Seslendirildi (5 Ekim 2026). Metin değişirse `node araclar/hikaye-ses.js b7-kombi-22` yalnızca değişen satırı yeniden üretir.

**Voice:** Gamze Özdemir (ElevenLabs, `eleven_v4`)
**Voice direction:** Sakin, sıcak, hikâye anlatır gibi. Sayılar tane tane. Gülme ve ses efekti yok.

110 kelime · 14 cümle · 72,6 saniye

---

## Perde 1 — Durum

## Line 1 — Kış akşamı (Frame 1)

**Time:** 0.6 – 6.4s

    Kış akşamı, dışarıda kar yağıyor. Mert'lerin kombisi yirmi iki dereceye ayarlı.

## Line 2 — Oynayan gösterge (Frame 2)

**Time:** 7.0 – 12.1s

    Ama oda hiç tam yirmi ikide durmuyor; biraz iner, biraz çıkar.

## Line 3 — Soru (Frame 2)

**Time:** 12.7 – 17.1s
**Delivery:** [curious]

    Mert merak eder: Kombi ne zaman çalışacağını nereden biliyor?

## Perde 2 — Şaşırtan an

## Line 4 — 21,4 (Frame 3)

**Time:** 18.0 – 21.9s

    Sıcaklık yirmi bir virgül dört. Kombi çalışmıyor.

## Line 5 — 22,8 (Frame 3)

**Time:** 22.5 – 25.8s

    Yirmi iki virgül sekiz. Yine çalışmıyor.

## Line 6 — Pencere (Frame 4)

**Time:** 26.7 – 31.4s

    Mert pencereyi açar. Oda soğur: yirmi virgül dokuz.

## Line 7 — Kombi çalışır (Frame 4)

**Time:** 31.9 – 33.7s

    Kombi hemen çalışır.

## Perde 3 — Demek ki

## Line 8 — Termostatın derdi (Frame 5)

**Time:** 35.0 – 39.3s
**Delivery:** [curious]

    Termostatın derdi tek: Oda yirmi ikiden ne kadar uzaklaştı?

## Line 9 — Pay (Frame 5)

**Time:** 39.9 – 42.4s

    İzin verdiği pay, bir derece.

## Line 10 — 0,6 (Frame 5)

**Time:** 43.1 – 47.0s

    Yirmi bir virgül dört, sıfır virgül altı uzakta.

## Line 11 — 0,8 (Frame 5)

**Time:** 47.6 – 52.7s

    Yirmi iki virgül sekiz, sıfır virgül sekiz. İkisi de payın içinde.

## Line 12 — 1,1 (Frame 5)

**Time:** 53.4 – 58.0s

    Yirmi virgül dokuz ise bir virgül bir uzakta. Pay aşıldı.

## Line 13 — Kombi dinlenir (Frame 6)

**Time:** 59.2 – 63.2s

    Yirmi ikiye uzaklık birden küçükse kombi dinlenir.

## Line 14 — Kapanış (Frame 7)

**Time:** 64.6 – 67.5s

    Mutlak değer, hedefe uzaklıktır.

---

## Sayıların sağlaması

Hedef 22 °C, pay 1 °C: |x − 22| < 1, yani 21 < x < 23 (uçlar dahil değil).

| Oda sıcaklığı | 22'ye uzaklık | Payın içinde mi | Kombi |
|---|---|---|---|
| 21,4 °C | 0,6 | evet | dinlenir |
| 22,8 °C | 0,8 | evet | dinlenir |
| 20,9 °C | 1,1 | hayır | çalışır |

## Doğruluk notu

Kombi yalnızca ısıtır; bu yüzden hikâye payın **soğuk** tarafından dışarı çıkışı gösterir
(20,9 → kombi çalışır). 22,8 örneği, sayının 22'den büyük ya da küçük olmasının değil 22'ye
uzaklığının önemli olduğunu göstermek için var. Sıcak tarafta payın dışına çıkış (23'ün üstü)
hikâyede yok; orada devreye giren cihaz klimadır ve ikinci bir durum anlatmak tek fikri böler.
Anlatımdaki her cümle bu hâliyle doğrudur: "uzaklık birden küçükse kombi dinlenir."

Plan/PLAN.md'de B7'nin ana görseli "22 °C ± 2" diye geçiyor; hikâye planındaki örnek sayılar
(21,4 · 22,8 · 20,9) 1 derecelik paya göre seçildiği için burada pay 1 derece. B7 dersi yazılırken
ikisi aynı sayıya çekilmeli.
