# Bir temayı işleme alma

Kullanıcı "şu temayı işleme al" dediğinde (örnek: "geometrik-sekiller temasını işleme al") bu dosyadaki adımlar baştan sona, sırayla uygulanır. Adımlar arasında onay beklenmez, soru sorulmaz; karar gereken yerde aşağıdaki kurallarla karar verilir ve yazılır. Kullanıcı sonucu en sonda, bitmiş tema üzerinde inceler.

Temaların `PLAN.md` dosyalarında "senaryo onayla yazılır", "açık sorular kapanmadan başlanmaz" gibi cümleler varsa bu dosya onların yerine geçer.

Ortak kurallar `KURALLAR.md`, motor ve dosya biçimleri `../ortak/API.md` dosyasındadır; ikisi de bağlayıcıdır. Çalışma yalnızca temanın iki klasöründe yapılır: içerik `<ders>/<tema>/`, plan `plan/<ders>/<tema>/`.

## 0. Durumu oku, kaldığın yerden sür

`plan/<ders>/<tema>/DURUM.md` varsa oku ve ilk bitmemiş adımdan devam et; yoksa aşağıdaki biçimde oluştur. Her adım ve her kısa ders bitince bu dosyayı güncelle; iş yarıda kalırsa başka bir oturum buradan sürdürür.

```
# Durum — <tema>
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

`MUFREDAT.md` yoksa temanın MEB sayfasından (adres `plan/<ders>/TEMALAR.md` içinde) `curl` ile al ve metni olduğu gibi yaz. Hafızadan yazılmaz; sayfa alınamıyorsa dur ve bildir. Varsa bu adım bitmiştir.

## 2. Plan

`PLAN.md` yoksa yaz: kapsam özeti, konular, her kısa ders için tek fikir, anlatılacaklar, program dayanağı, açılış sorusu, akılda kalıcı cümle; müfredat denetimi tablosu; bilerek alınmayanlar; açık sorular. Örnek: `plan/matematik/geometrik-sekiller/PLAN.md`. Varsa bu adım bitmiştir.

Denetim tablosunda her istek `ders`, `benzetim` ya da `site dışı` diye işaretlenir (`KURALLAR.md` 2.2). Eski planlarda bu sütun yoksa 3. adımda eklenir.

## 2b. Ders kitabı

Plan, içeriği programda yazmayan bir şeye dayanıyorsa (formül, tanım, liste, deney düzeneği, veri, tarih, ad) dersin MEB ders kitabı alınır; adresi `plan/<ders>/TEMALAR.md` içindedir. Kitap proje klasörüne konmaz. Gereken her bilgi kitapta bulunur ve `PLAN.md` içine sayfa numarasıyla yazılır (`KURALLAR.md` 2.1). Kitap alınamıyorsa dur ve bildir; hafızadan doldurulmaz. Matematikte olduğu gibi içeriğin tamamı program metnindeyse bu adım atlanır.

## 3. Açık soruları kapat

`PLAN.md` içindeki her açık soruya şu sırayla karar ver:

1. Program metni konuyu adıyla sayıyorsa (örnek olarak, "gibi" diyerek saysa da) alınır; yalnızca sayılan kadarı.
2. Program metninde geçmiyorsa alınmaz. Geleneksel olarak anlatılıyor ya da ders kitabında yer alıyor olması gerekçe değildir.
3. Program bir sınır koyuyorsa sınır geçilmez.
4. Program bir şeyi anıyor ama içeriğini vermiyorsa içerik ders kitabından, sayfa numarasıyla alınır (2b). Bu, programın bir çıktıyla istediği şeyler içindir: bir modelin formülü, bir sınıflandırmanın ögeleri, bir deneyin düzeneği. Programın yalnızca andığı şeyler (bir kişinin adı, bir kitap, tarihî bir olay, "söz edilebilir" denen örnek) program metninde yazdığı kadarıyla anılır. Hiçbir durumda ayrıntı hafızadan eklenmez; kitapta da yoksa konu program kadarıyla kalır.
4b. Sitede karşılanamayan istek (ürün, sınıf etkinliği, gerçek deney) derse çevrilmez; denetim tablosunda `site dışı` yazılır (`KURALLAR.md` 2.2). Deney ve gözlem `benzetim` olur.
5. Birleştir ya da ayır sorularında: kısa ders sayısı ders saati başına 0,85'i geçiyorsa planın önerdiği birleştirmeler uygulanır. Bir kısa derste iki fikir varsa ayrılır; tek fikir, öğretilmesi gereken bilgi yüzünden 5 sahneyi aşıyorsa ayrılmaz, sahne eklenir (`KURALLAR.md` 3).
6. Bu kararlardan sonra bir kısa dersin içeriği 3 sahneyi doldurmuyorsa ayrı ders olmaz; en yakın kısa derse sahne olarak katılır.
7. Geri kalan, yalnızca anlatım tercihine dair sorularda en sade seçenek alınır: en az yeni kavram ve en az adım isteyen.

Kurallar numara sırasıyla uygulanır; ikisi çelişirse küçük numaralı geçerlidir.

Kararları `PLAN.md` sonuna "## 7. Kararlar" başlığıyla yaz: soru, karar, hangi kurala dayandığı, tarih. Kısa ders listesini ve denetim tablosunu kararlara göre güncelle. Hiçbir soru açık bırakılmaz; kullanıcı beğenmediği kararı sonradan değiştirir.

## 4. Senaryolar

Her konu için bir dosya: `plan/<ders>/<tema>/senaryolar/<harf>-<konu-adi>.md`. Her kısa ders yarım sayfa: fikir, açılış sorusu, ana görsel, açılış biçimi (kanca ya da öğret) ve her sorudan önce öğretilen bilgi (`KURALLAR.md` 3.1), sahneler (çoğu derste 3–5, gerekirse daha çok; sahnede ne olduğu, ekran metni değil), hedeflenen yanılgı, akılda kalıcı cümle, 2 çıkış sorusu ve çeldiricileri. Örnek: `plan/matematik/sayilar/senaryolar/D-islem-ozellikleri-ve-cebir.md`.

Resim gereken sahne (`KURALLAR.md` 5.1) senaryoda "Resim:" satırıyla işaretlenir: ne görünecek, sahnedeki işi ne, üstüne hangi etiketler gelecek. Bu sahnelerin istemleri `plan/<ders>/<tema>/GORSELLER.md` dosyasında toplanır: temanın üslup cümlesi, her resim için dosya adı, istem, ders kitabında karşılaştırılacağı sayfa. Vektörle çizilebilen şey için resim istenmez.

Her sahne `PLAN.md` içindeki bir "anlatılacak" maddesine dayanır. Senaryo bitince konu bir kez daha program metniyle karşılaştırılır: fazla olan çıkarılır, eksik olan eklenir.

## 5. Temanın iskeleti

Çalışan bir şablon `ortak/sablon/` klasöründedir (tema sayfası, `tema.js`, `dersler/kit.js` ve örnek bir kısa ders). İçeriğini `<ders>/<tema>/` altına kopyala; `'sablon'` yazan yerlere temanın klasör adını yaz, örnek dersi kendi ilk dersinle değiştir.

- `index.html` ve `tema.js`: `tema.js` başta konuları ve boş ders listelerini içerir; her kısa ders yazıldıkça satırı eklenir.
- `dersler/kit.js`: temanın derslerinde tekrar eden çizim araçları ve renkler (`window.KIT`). Küçük başlar; ikinci kez gereken çizim buraya taşınır. `dersler/tema.css`: gerekiyorsa temaya özel stil.
- Konu renkleri motorun paletinden seçilir, bir temada iki konu aynı rengi almaz.

## 6. Kısa dersler

Konu konu, senaryodaki sırayla. Her kısa ders kendi dosyasındadır: `<kod>-<ad>.html` ve `dersler/<kod>-<ad>.js` (`Ders.start` doğrudan çağrılır). İskelet örneği: `ortak/sablon/a1-ornek.html` ve `dersler/a1-ornek.js`. Zengin sahne örnekleri için `matematik/sayilar/dersler/d1-onerme.js` ve `d7-ozdeslikler.js` dosyalarına bak; oradaki `DERS_EK` ve `DERS_PARCA` düzeni Sayılar'a özgüdür, kopyalanmaz.

Ders sayfasına `ses/<id>.js` satırı konmaz; seslendirme üretilince eklenir (olmayan dosya konsol hatası verir). Aynı nedenle üretilmemiş resim dosyasına bağlantı verilmez: resmin yerine aynı boyutta vektör bir yer tutucu çizilir, `DURUM.md` notuna "resim bekliyor" yazılır.

Her kısa ders için:

1. Senaryoya göre yaz; yazı bütçesine uy (`KURALLAR.md`).
2. `tema.js` içine satırını ekle.
3. Proje kökünden `node araclar/olc.js <tema>/<kod> --goruntu "$(mktemp -d)"` çalıştır (Chrome kendiliğinden bulunur). Şunlar sıfır olmalı: sayfa kayması, sığmayan altyazı, yana taşan panel, tahtadan taşan yazı, üst üste yazı, 12 kelimeyi aşan altyazı, 12 pikselden küçük punto, konsol hatası. Tahtada 25 kelime sınırı aşılıyorsa sahne adım adım açılır ya da bölünür; ölçücü matematik simgelerini de kelime saydığı için formül ağırlıklı bir sahnede aşım kalırsa `DURUM.md` notuna yazılır.
4. Ekran görüntülerine bak: her sahnenin son hâli okunuyor mu, çizim senaryodaki fikri gösteriyor mu, matematik doğru mu. Görüntüler proje klasörüne konmaz.
5. Sorun varsa düzelt ve 3. adıma dön. Temiz çıkınca `DURUM.md` satırını güncelle.

Ölçüm temiz çıkmadan sonraki derse geçilmez. Bir dersin sorunu çözülemiyorsa `DURUM.md` notuna yazılır ve sürülür; ders yarım bırakılıp "bitti" denmez.

Tema 12 kısa dersten büyükse ilk konuyu kendin yaz (kit ve üslup otursun), sonraki konuları konu başına bir alt ajana ver. `kit.js`, `tema.css` ve `tema.js` dosyalarını yalnızca işi yürüten oturum yazar; alt ajanlar birer konunun kısa derslerini yazar, ölçer ve `tema.js` satırlarını rapor olarak döndürür. Kite eklenmesi gereken bir araç varsa onu da rapor ederler.

## 7. Tema denetimi

1. `node araclar/sure.js <ders>/<tema>` çalıştır: her kısa dersin yaklaşık süresini içerikten hesaplar ve `tema.js` satırına yazar (beşinci öğe, saniye). Uyarı vermemeli. Sonradan bir dersin anlatımı, sahnesi ya da seslendirmesi değişirse yeniden çalıştırılır; `tema.js` dosyasını yazdığı için alt ajan değil, işi yürüten oturum çalıştırır.
2. `node araclar/denetle.js <ders>/<tema>` temiz çıkmalı.
3. Tema sayfasını aç, ekran görüntüsüne bak: her konu ve kısa ders listede mi.
4. `PLAN.md` denetim tablosuna sahne numaralarını işle. Programın her isteğinin bir sahnesi, her sahnenin bir dayanağı olmalı; yoksa ders düzeltilir.
5. `plan/<ders>/TEMALAR.md` içinde temanın konu ve kısa ders sayısını, durumunu güncelle.

## 8. Rapor

Kullanıcıya kısa bir özet: kaç konu ve kısa ders yazıldı, hangi kararlar verildi (özellikle programda açık olmayanlar), ölçümde kalan uyarılar, gözle bakılması gereken dersler.

## İşleme almanın kapsamadıkları

- **Yayın:** `ortak/katalog.js` içindeki `yayinda: true` satırı. Kullanıcı temayı izledikten sonra "yayına al" der.
- **Seslendirme:** ücretli dış servis kullanır; kullanıcı ayrıca ister.
- **Görsel üretimi:** ücretli dış servis kullanır; kullanıcı ayrıca ister. İşleme alma yalnızca `GORSELLER.md` içindeki istemleri ve yer tutucuları hazırlar.
- **Hikâye videoları:** ayrı iş; `PLAN.md` içinde aday olarak not edilebilir.
- **Commit ve push:** kullanıcı ister.
