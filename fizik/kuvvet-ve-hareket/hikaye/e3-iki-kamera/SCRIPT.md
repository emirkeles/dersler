# SCRIPT — e3-iki-kamera

**Ders:** E3 Sürat: ortalama ve anlık (son sahne)
**Fikir:** Anlık sürat tek bir anı, ortalama sürat bütün yolu anlatır.
**Durum:** Seslendirildi (7 Ekim 2026). Metin değişirse `node araclar/hikaye-ses.js e3-iki-kamera` yalnızca değişen satırı yeniden üretir.

**Voice:** Gamze Özdemir (ElevenLabs, `eleven_v4`)
**Voice settings:** modelin varsayılanı; dil `tr` (`araclar/ses-uret.js`, derslerle aynı)
**Ses düzeyi:** ham klipler `assets/ses/`; filmde düzeyi eşitlenmiş kopyalar çalar (`assets/ses-esit/`, ortalama −21,5 dB, tepe en çok −1,5 dB)
**Voice direction:** Sakin, sıcak, hikâye anlatır gibi. Sayılar tane tane. Gülme ve ses efekti yok.

114 kelime · 12 satır · 58,9 saniye konuşma · film 71 saniye.
Zaman aralıkları kliplerin filmdeki gerçek yerleridir (`index.html` içindeki `<audio>` öğeleriyle aynı).

---

## Kanca

## Line 1 — İki gösterge (Frame 1)

**Time:** 0.5 – 6.1s

    Deniz'in dayısı iki kameranın önünden de seksen beşle geçti. Sınır doksandı.

## Line 2 — Ceza (Frame 2)

**Time:** 6.5 – 9.1s
**Delivery:** [curious]

    Yine de ceza geldi. Neden?

## İddia

## Line 3 — Saat (Frame 3)

**Time:** 9.7 – 15.5s

    Çünkü o kameralar arabanın göstergesini görmez. Yalnızca geçtiği saati kaydeder.

## Kanıt

## Line 4 — İlk kamera (Frame 4)

**Time:** 16.2 – 21.4s

    İlk kameraya yaklaşırken dayısı frene bastı, gösterge seksen beşe indi.

## Line 5 — Gaz (Frame 5)

**Time:** 21.8 – 25.8s

    Kamerayı geçer geçmez yine gaza bastı, yüz otuza çıktı.

## Line 6 — İkinci kamera (Frame 6)

**Time:** 26.4 – 31.9s

    On iki kilometre sonra ikinci kamera göründü. Yine fren, yine seksen beş.

## Sağlama

## Line 7 — Damgalar (Frame 7)

**Time:** 32.7 – 38.9s
**Delivery:** [thoughtful]

    İki kameranın kaydettiği saatlere bakılırsa araba on iki kilometreyi altı dakikada geçmişti.

## Line 8 — Bölme (Frame 8)

**Time:** 39.5 – 44.5s

    Bu da dakikada iki kilometre, yani saatte yüz yirmi eder.

## Line 9 — Sınıra uyan araba (Frame 9)

**Time:** 45.0 – 49.7s

    Sınıra uyan bir araba aynı yolu en az sekiz dakikada geçerdi.

## Kapanış

## Line 10 — Anlık (Frame 10)

**Time:** 50.4 – 57.1s

    Göstergedeki seksen beş, arabanın yalnızca o andaki süratiydi; yani anlık sürati.

## Line 11 — Ortalama (Frame 11)

**Time:** 57.7 – 61.3s

    Yüz yirmi ise bütün yoldaki ortalama sürati.

## Line 12 — Kapanış kartı (Frame 12)

**Time:** 63.2 – 67.0s

    Gösterge anı söyler, [short pause] ortalama bütün yolu.

---

## Sayıların sağlaması

Hepsi kurgudur; kolay bölünsün diye seçildi.

| Nicelik | Değer |
|---|---|
| Tabeladaki sürat sınırı | 90 km/h |
| İki kamera arası | 12 km |
| Kamera saatleri | 14.00 ve 14.06 |
| Kameraların önünde gösterge | 85 km/h |
| Arada gösterge | 130 km/h |

- 12 km ÷ 6 dk = dakikada 2 km = 120 km/h.
- Sınıra uyan araba: 12 km ÷ 90 km/h = 2/15 saat = 8 dakika; 14.08'de varır.
- 14.06'da sınıra uyan araba 9. kilometrededir: 90 km/h × 0,1 saat = 9 km.
- Uçlarda birer kilometre ortalama 95 km/h ile (2 × 0,63 dk), ortadaki 10 km yaklaşık 127 km/h ile (4,72 dk)
  geçilirse toplam 5,98 dakika eder; göstergede uçlarda 85, ortada 130 görünmesi ortalama 120 ile çelişmez.

## Doğruluk notu

- Okunan metinde rakam ve simge yok; "km/h" hiç okunmaz, birim yalnızca ekrandaki etiketlerde yazar.
- Anlık sürat ve ortalama sürat tanımları ders kitabındandır (s. 106): "Sürat göstergesinde anlık olarak okunan
  60 km/h aracın anlık süratidir"; "Ortalama sürat: Bir hareketlinin tüm hareketi boyunca aldığı yolun tamamının
  hareket süresine oranıdır."
- İki nokta arasında ortalama hız denetimi Türkiye'de uygulanıyor (haber ve TR Dizin makalesi, 7 Ekim 2026);
  resmî bir kaynaktan doğrulanmadı. Şehirler arası yolda sınırın 90 olması kurgudur; hikâye yasaya değil tabelaya dayanır.
- Seslendirmeden önce metin bir kez daha elden geçti (7 Ekim 2026): kesik kesik cümleler ve iki nokta üst üsteyle
  biten "açıklama" kalıpları azaltıldı, anlatım baştan sona geçmiş zamana çekildi, Deniz ve dayısı ilk cümlede
  tanıtıldı. Amaç, bir öğretmenin olayı anlatması gibi duyulması.
- İlk taslakta sıra "durum → şaşırtan an → demek ki" idi ve ceza beşinci satırda geliyordu. HyperFrames'in
  anlatı kuralına göre (kanca izleyicinin diliyle açılır, iddia ikinci vuruşa kadar söylenir) ceza başa alındı.
  Hikâye dersten sonra oynadığı için cevabı sona saklamaya gerek yok; öğrenci kavramı zaten görmüş olur.
