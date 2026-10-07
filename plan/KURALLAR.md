# Ortak kurallar

Bütün dersler ve üniteler için bağlayıcıdır. Sayılar ünitesi yazılırken alınan kararlardan derlendi (`plan/matematik/sayilar/PLAN.md`); bir üniteye özgü kararlar o ünitenin `PLAN.md` dosyasında durur.

## 1. Kime, nerede

Lise öğrencisi, dizüstü bilgisayarda, 5 dakikalık parçalarla. Tasarım 1366×768 dizüstünün tarayıcı penceresine (≈1366×657) göre yapılır; telefonda yalnızca bozulmaması yeter.

## 2. Müfredat bağlayıcıdır

- Programın istemediği konu derse girmez, istediği konu eksik kalmaz. Dayanak ünitenin `MUFREDAT.md` dosyasıdır (MEB sayfasından alınan metin).
- Programdaki sınırlamalara ("değinilmez", "girilmez", "ile sınırlı tutulur") uyulur.
- Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez.
- Kafa karıştıran, "merak" türü yan konu olmaz.
- Her ünitenin `PLAN.md` dosyasında müfredat denetimi tablosu vardır: programın her isteği bir kısa derse bağlanır, tabloda yeri olmayan kısa ders olmaz. Ders yazılınca sahne numaraları tabloya işlenir.

## 3. Kısa ders

Bir kısa ders = bir fikir, 4–6 dakika, 3–5 sahne, sonunda 2 çıkış sorusu. İskelet her derste aynıdır, öğrenci ritmi öğrenir:

1. **Kanca** (≤ 15 sn): hayattan tek soru, tek görsel.
2. **Tahmin et:** öğrenci önce tahmin eder (`c.choice`).
3. **Gör:** animasyon cevabı gösterir; bu sırada altyazı en çok bir satır.
4. **Adlandır:** kural tek cümle ve tek formül olarak gelir, deftere düşer.
5. **Dene:** bir kaydırıcı ya da sürükle-bırak.
6. **Çıkış soruları:** 2 soru.

Her ders bir akılda kalıcı cümleyle biter.

## 4. Yazı bütçesi

| Öğe | Sınır |
|---|---|
| Altyazı | en çok 12 kelime, tek cümle |
| Tahtada aynı anda yazı | en çok ~25 kelime ya da 12 öğe; biten adım soluklaşır |
| Punto | en az 12 px |
| Defter kuralı | formül + tek örnek, en çok 12 kelime |
| Giriş ekranı | açılış sorusu + düğme |
| Çıkış sorusu geri bildirimi | en çok 2 cümle |

Rakam ve sembol cümleden iyidir. Bir altyazıda tek yeni fikir olur. Aynı bilgi iki kanalda tekrar edilmez: sahnede yazıyorsa altyazıda yazmaz. Önce hareket, sonra cümle.

## 5. Görsel dil

Tahta ekrandaki tek renkli yüzeydir; çevresi düz ve sessizdir. Degrade, parlama, sürekli titreşen düğme, emoji ve büyük harfli etiket hapı kullanılmaz. Yazı tipi IBM Plex Sans. Bir kavrama bir renk verilir ve ders boyunca aynı kalır. Ayrıntı: `ortak/API.md`.

## 6. Bir ünitenin yazım sırası

Müfredat → plan → kararlar → senaryolar → iskelet → kısa dersler → denetim. Adımların tamamı ve her adımda neyin "bitti" sayıldığı `ISLEME.md` dosyasındadır. Kullanıcı "şu üniteyi işleme al" dediğinde o dosya baştan sona, ara onay beklemeden uygulanır; kullanıcı bitmiş üniteyi inceler.

Yayın (`ortak/katalog.js` içinde `yayinda: true`), seslendirme ve hikâye videoları işleme almanın dışındadır; kullanıcı ayrıca ister. Seslendirme en sonda, tüm içerik bittikten sonra yapılır ve yalnızca tahtada bir şey olurken okunan açıklama altyazılarını kapsar.

## 7. Paralel çalışma

Her ünite kendi iki klasöründe yaşar: içerik `<ders>/<ünite>/`, plan `plan/<ders>/<ünite>/`. Bir ünite üzerinde çalışan kişi ya da ajan:

- yalnızca bu iki klasöre yazar;
- `ortak/`, `araclar/`, `index.html` ve başka ünitelerin klasörlerine dokunmaz. Motorda ya da araçlarda bir eksik görürse düzeltmez, raporlar;
- üniteyi yayına almaz (`ortak/katalog.js` içindeki `yayinda` satırı); ünite sayfası yayında olmadan da açılır, önizleme oradan yapılır;
- git'te commit, push ya da dal değiştirme yapmaz; bunlar ana oturumun işidir.

Ünitenin kendi çizim araçları, stil dosyası ve kısa dersleri kendi `dersler/` klasöründe durur; başka üniteden dosya yüklenmez.
