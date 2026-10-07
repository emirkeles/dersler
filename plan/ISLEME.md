# Bir üniteyi işleme alma

Kullanıcı "şu üniteyi işleme al" dediğinde (örnek: "geometrik-sekiller ünitesini işleme al") bu dosyadaki adımlar baştan sona, sırayla uygulanır. Adımlar arasında onay beklenmez, soru sorulmaz; karar gereken yerde aşağıdaki kurallarla karar verilir ve yazılır. Kullanıcı sonucu en sonda, bitmiş ünite üzerinde inceler.

Ünitelerin `PLAN.md` dosyalarında "senaryo onayla yazılır", "açık sorular kapanmadan başlanmaz" gibi cümleler varsa bu dosya onların yerine geçer.

Ortak kurallar `KURALLAR.md`, motor ve dosya biçimleri `../ortak/API.md` dosyasındadır; ikisi de bağlayıcıdır. Çalışma yalnızca ünitenin iki klasöründe yapılır: içerik `<ders>/<ünite>/`, plan `plan/<ders>/<ünite>/`.

## 0. Durumu oku, kaldığın yerden sür

`plan/<ders>/<ünite>/DURUM.md` varsa oku ve ilk bitmemiş adımdan devam et; yoksa aşağıdaki biçimde oluştur. Her adım ve her kısa ders bitince bu dosyayı güncelle; iş yarıda kalırsa başka bir oturum buradan sürdürür.

```
# Durum — <ünite>
| Adım | Durum |
|---|---|
| 1 Müfredat | bitti |
| 2 Plan | bitti |
| 3 Kararlar | bitti |
| 4 Senaryolar | A bitti, B sürüyor |
| 5 İskelet | bekliyor |
| 6 Dersler | bekliyor |
| 7 Denetim | bekliyor |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | |
```

## 1. Müfredat

`MUFREDAT.md` yoksa ünitenin MEB sayfasından (adres `plan/<ders>/UNITELER.md` içinde) `curl` ile al ve metni olduğu gibi yaz. Hafızadan yazılmaz; sayfa alınamıyorsa dur ve bildir. Varsa bu adım bitmiştir.

## 2. Plan

`PLAN.md` yoksa yaz: kapsam özeti, konular, her kısa ders için tek fikir, anlatılacaklar, program dayanağı, açılış sorusu, akılda kalıcı cümle; müfredat denetimi tablosu; bilerek alınmayanlar; açık sorular. Örnek: `plan/matematik/geometrik-sekiller/PLAN.md`. Varsa bu adım bitmiştir.

## 3. Açık soruları kapat

`PLAN.md` içindeki her açık soruya şu sırayla karar ver:

1. Program metni konuyu adıyla sayıyorsa (örnek olarak, "gibi" diyerek saysa da) alınır; yalnızca sayılan kadarı.
2. Program metninde geçmiyorsa alınmaz. Geleneksel olarak anlatılıyor olması gerekçe değildir.
3. Program bir sınır koyuyorsa sınır geçilmez.
4. Program bir şeyi anıyor ama içeriğini vermiyorsa (bir kişinin adı, bir kitap, tarihî bir olay) program metninde yazdığı kadarıyla anılır; ayrıntısı hafızadan ya da başka kaynaktan eklenmez.
5. Birleştir ya da ayır sorularında: kısa ders sayısı ders saati başına 0,85'i geçiyorsa planın önerdiği birleştirmeler uygulanır. Bir fikir 5 sahneye sığmıyorsa ayrılır.
6. Bu kararlardan sonra bir kısa dersin içeriği 3 sahneyi doldurmuyorsa ayrı ders olmaz; en yakın kısa derse sahne olarak katılır.
7. Geri kalan, yalnızca anlatım tercihine dair sorularda en sade seçenek alınır: en az yeni kavram ve en az adım isteyen.

Kurallar numara sırasıyla uygulanır; ikisi çelişirse küçük numaralı geçerlidir.

Kararları `PLAN.md` sonuna "## 7. Kararlar" başlığıyla yaz: soru, karar, hangi kurala dayandığı, tarih. Kısa ders listesini ve denetim tablosunu kararlara göre güncelle. Hiçbir soru açık bırakılmaz; kullanıcı beğenmediği kararı sonradan değiştirir.

## 4. Senaryolar

Her konu için bir dosya: `plan/<ders>/<ünite>/senaryolar/<harf>-<konu-adi>.md`. Her kısa ders yarım sayfa: fikir, açılış sorusu, ana görsel, 3–5 sahne (sahnede ne olduğu; ekran metni değil), hedeflenen yanılgı, akılda kalıcı cümle, 2 çıkış sorusu ve çeldiricileri. Örnek: `plan/matematik/sayilar/senaryolar/D-islem-ozellikleri-ve-cebir.md`.

Her sahne `PLAN.md` içindeki bir "anlatılacak" maddesine dayanır. Senaryo bitince konu bir kez daha program metniyle karşılaştırılır: fazla olan çıkarılır, eksik olan eklenir.

## 5. Ünitenin iskeleti

Çalışan bir şablon `ortak/sablon/` klasöründedir (ünite sayfası, `unite.js`, `dersler/kit.js` ve örnek bir kısa ders). İçeriğini `<ders>/<ünite>/` altına kopyala; `'sablon'` yazan yerlere ünitenin klasör adını yaz, örnek dersi kendi ilk dersinle değiştir.

- `index.html` ve `unite.js`: `unite.js` başta konuları ve boş ders listelerini içerir; her kısa ders yazıldıkça satırı eklenir.
- `dersler/kit.js`: ünitenin derslerinde tekrar eden çizim araçları ve renkler (`window.KIT`). Küçük başlar; ikinci kez gereken çizim buraya taşınır. `dersler/unite.css`: gerekiyorsa üniteye özel stil.
- Konu renkleri motorun paletinden seçilir, bir ünitede iki konu aynı rengi almaz.

## 6. Kısa dersler

Konu konu, senaryodaki sırayla. Her kısa ders kendi dosyasındadır: `<kod>-<ad>.html` ve `dersler/<kod>-<ad>.js` (`Ders.start` doğrudan çağrılır). İskelet örneği: `ortak/sablon/a1-ornek.html` ve `dersler/a1-ornek.js`. Zengin sahne örnekleri için `matematik/sayilar/dersler/d1-onerme.js` ve `d7-ozdeslikler.js` dosyalarına bak; oradaki `DERS_EK` ve `DERS_PARCA` düzeni Sayılar'a özgüdür, kopyalanmaz.

Ders sayfasına `ses/<id>.js` satırı konmaz; seslendirme üretilince eklenir (olmayan dosya konsol hatası verir).

Her kısa ders için:

1. Senaryoya göre yaz; yazı bütçesine uy (`KURALLAR.md`).
2. `unite.js` içine satırını ekle.
3. Proje kökünden `node araclar/olc.js <ünite>/<kod> --goruntu "$(mktemp -d)"` çalıştır (Chrome kendiliğinden bulunur). Şunlar sıfır olmalı: sayfa kayması, sığmayan altyazı, yana taşan panel, tahtadan taşan yazı, üst üste yazı, 12 kelimeyi aşan altyazı, 12 pikselden küçük punto, konsol hatası. Tahtada 25 kelime sınırı aşılıyorsa sahne adım adım açılır ya da bölünür; ölçücü matematik simgelerini de kelime saydığı için formül ağırlıklı bir sahnede aşım kalırsa `DURUM.md` notuna yazılır.
4. Ekran görüntülerine bak: her sahnenin son hâli okunuyor mu, çizim senaryodaki fikri gösteriyor mu, matematik doğru mu. Görüntüler proje klasörüne konmaz.
5. Sorun varsa düzelt ve 3. adıma dön. Temiz çıkınca `DURUM.md` satırını güncelle.

Ölçüm temiz çıkmadan sonraki derse geçilmez. Bir dersin sorunu çözülemiyorsa `DURUM.md` notuna yazılır ve sürülür; ders yarım bırakılıp "bitti" denmez.

Ünite 12 kısa dersten büyükse ilk konuyu kendin yaz (kit ve üslup otursun), sonraki konuları konu başına bir alt ajana ver. `kit.js`, `unite.css` ve `unite.js` dosyalarını yalnızca işi yürüten oturum yazar; alt ajanlar birer konunun kısa derslerini yazar, ölçer ve `unite.js` satırlarını rapor olarak döndürür. Kite eklenmesi gereken bir araç varsa onu da rapor ederler.

## 7. Ünite denetimi

1. `node araclar/denetle.js <ders>/<ünite>` temiz çıkmalı.
2. Ünite sayfasını aç, ekran görüntüsüne bak: her konu ve kısa ders listede mi.
3. `PLAN.md` denetim tablosuna sahne numaralarını işle. Programın her isteğinin bir sahnesi, her sahnenin bir dayanağı olmalı; yoksa ders düzeltilir.
4. `plan/<ders>/UNITELER.md` içinde ünitenin konu ve kısa ders sayısını, durumunu güncelle.

## 8. Rapor

Kullanıcıya kısa bir özet: kaç konu ve kısa ders yazıldı, hangi kararlar verildi (özellikle programda açık olmayanlar), ölçümde kalan uyarılar, gözle bakılması gereken dersler.

## İşleme almanın kapsamadıkları

- **Yayın:** `ortak/katalog.js` içindeki `yayinda: true` satırı. Kullanıcı üniteyi izledikten sonra "yayına al" der.
- **Seslendirme:** ücretli dış servis kullanır; kullanıcı ayrıca ister.
- **Hikâye videoları:** ayrı iş; `PLAN.md` içinde aday olarak not edilebilir.
- **Commit ve push:** kullanıcı ister.
