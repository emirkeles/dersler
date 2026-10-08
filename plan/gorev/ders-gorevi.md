# Görev şablonu: bir kısa dersi bitmiş senaryodan yaz

Bu dosya şablondur. Temayı yürüten oturum onu `plan/<ders>/<tema>/gorev/ders-gorevi.md` olarak kopyalar, `<…>` yerlerini ve "Temaya özgü" bölümünü doldurur, ajanların kaynakta aradığı her şeyi oraya ekler (`YURUTME.md` "Bağlam bütçesi"). Ajana giden görev iletisi kısa kalır: bu dosyanın yolu, dersin kodu ve dosya adı, senaryo dosyası ile dersin satır aralığı, `accent`, `nextLesson`, derse özgü notlar, konunun araç dosyasını bu ajanın açıp açmayacağı.

Kaynak: Kimya · Çeşitlilik'te kullanılan görev tanımı (8 Ekim 2026). Çizginin altı ajana giden metindir.

---

# Görev: bir kısa dersi bitmiş senaryodan yaz (<Ders> · <Tema>)

Proje kökü: `<mutlak yol>` (komutlar buradan çalışır). 9. sınıf için bağımlılıksız, etkileşimli kısa dersler (saf HTML/JS/SVG, Türkçe). Tek bir kısa ders yazacaksın: sayfası ve ders dosyası.

## Oku (yalnızca bunlar, sırayla)
1. Senaryo dosyasında baştaki okuma kılavuzu ile kendi dersinin bölümü (satır aralığı görev iletisinde; Read'e `offset` ve `limit` ver). Senaryo bağlayıcıdır: sahneler, anlatım cümleleri (altyazılar), sorular, şıklar, ipuçları, defter satırları, çıkış soruları oradan alınır.
2. Örnek ders (üslup, yapı, kit kullanımı): `<ders>/<tema>/dersler/<ilk ders>.js` ve sayfası `<ders>/<tema>/<ilk ders>.html`. Konu tekrarı dersi yazıyorsan onun yerine `<ders>/<tema>/dersler/<ilk tekrar dersi>.js`.
3. `<ders>/<tema>/dersler/kit.js`; konunun araç dosyası varsa `<ders>/<tema>/dersler/<harf>-araclar.js`.
4. `ortak/API.md` (ders motoru).

Başka dosya okuma. `plan/KURALLAR.md`, `plan/ISLEME.md`, `ortak/ders.js`, `ortak/ders.css`, `araclar/` ve öteki derslerin dosyaları bu listede yok; gereken kurallar aşağıda yazılı. Burada cevabını bulamadığın bir şey için `grep -n` ile tek işleve bak ve raporda "görev tanımında eksik" başlığıyla yaz.

## Yazılacak dosyalar
`<ders>/<tema>/<kod>-<ad>.html` ve `<ders>/<tema>/dersler/<kod>-<ad>.js` (adlar görev iletisinde; dosya adlarında yalnızca ASCII harf). Ders kimliği `<tema>-<kod>`; `kicker: 'Konu <HARF> · <konu adı>'`; `accent` görev iletisindeki renk; `back: 'index.html'`; `nextLesson` görev iletisindeki gibi (konu tekrarı dersinde yazılmaz). Sayfaya `ses/…js` satırı konmaz.

Konunun araç dosyası (`<harf>-araclar.js`, `window.KIT_<HARF>`; sayfada `kit.js` satırından sonra, ders dosyasından önce yüklenir): görev iletisi "araç dosyasını sen aç" diyorsa konunun derslerinde ortak kullanılacak çizim araçlarını oraya yaz. Demiyorsa dosyayı oku, değiştirme; eksik aracı kendi ders dosyanda yaz ve raporla. Başka konunun araç dosyasından yükleme.

## Derste bulunması gerekenler
- İlk sahnenin başlığı tam olarak "Hatırla" (konu tekrarı dersi dışında): senaryodaki `c.choice` soruları; açılış cümlesi "Başlamadan önce iki şeyi hatırlayalım." (tek soru varsa "Başlamadan önce bir şeyi hatırlayalım.").
- Yarısı çözülmüş örnek `tag: 'Birlikte çöz'` etiketini taşır.
- Hiçbir soru, gereken bilgi anlatılmadan sorulmaz (senaryodaki sıra korunur).
- `quiz`: senaryodaki çıkış soruları; her şık için `why` (en çok 2 cümle, şıkkın neden doğru ya da yanlış olduğunu söyler); `scene` 0'dan başlayan sahne indeksi; doğru şıkkın yeri sorudan soruya değişir.
- Defter satırları (`c.note`; en çok 12 kelime) ve özetin kalın satırı olarak akılda kalıcı cümle.
- Anlaşılması güç her kavram tahtada çizilir ve anlatımla birlikte adım adım kurulur.
- Tahta ile altyazı her an aynı şeyi anlatır. Yeni bir örneğe ya da soruya geçerken tahtayı değiştirmeden önce `c.clearSay()` çağır. Soru cevaplanınca tahta cevabı gösterirken o örneği anlatan altyazı gelir; senaryoda böyle bir cümle yoksa kısa bir tane ekle ve raporla. Sahnenin son karesinde tahta, son altyazının anlattığı şeyi gösterir. Ölçüm aracı bu uyumsuzluğu yakalamaz.
- Konu tekrarı dersi: tek sahne (kurallar tahtada ve defterde), ardından senaryodaki sorular `quiz` içinde.

## Sınırlar
- Altyazı tek cümle ve en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 öğe (biten adım soluklaşır ya da silinir); punto en az 12 px.
- Rakam, simge ya da formül içeren altyazıda `speak:` ile okunuş kelimeyle yazılır ("25 °C" → "yirmi beş derece", "2+" → "iki artı"). Yönerge yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; derste en çok iki üç tane; `[excited]` yok.
- Öğrenciye kitap, sayfa, sınıf, "veri verildi" denmez. Senaryoda olmayan bilgi eklenmez; senaryodaki "Sınır" satırlarına uyulur.
- Benzetimde gösterilen her sayı senaryodaki değerdir; kaydırıcı yalnızca verisi olan konumlarda durur, ara değer hesaplanmaz.

## Motor ve ölçüm aracı notları
- Motorda sürükle-bırak, eşleştirme ve sıralama çağrısı yok (`c.drag`, `c.match`, `c.sort` yazma). Senaryoda böyle geçen sahneler kart başına seçimle kurulur: kart öne çıkar, öğrenci kutuyu ya da eşini seçer, kart tahtada yerine oturur. Kaydırıcı (`c.slider`), seçenek (`c.choice`) ve `c.cont('Devam ›')` kullanılabilir.
- Ölçüm ve seslendirme araçları sahneyi kendiliğinden geçer: yalnızca motorun düğmelerine ve şıklara basar. `c.h('button')` ile kendi düğmeni koyarsan sahne tamamlanmaz; "Tabloya yaz", "Kartı çevir" gibi düğmeler `c.cont('… ›')` ya da `c.choice` ile kurulur.
- Zamanlama yalnızca `c.wait` / `c.tween` ile; `setTimeout`, `setInterval`, CSS animasyonu, `requestAnimationFrame` yok. Çizim her açılışta aynı görünür: `Math.random` kullanılmaz.
- Bu makinede `timeout` komutu yok; uzun komutta aracın kendi süre sınırını 10 dakika ver.
- <ajanların sorduğu ya da kaynakta aradığı her şey buraya eklenir>

## Temaya özgü
- Kit araçları: <`kit.js` içindeki araçların adları ve birer satırlık kullanımları>
- Renkler: <temanın anlam taşıyan renkleri ve hangi çizimde kullanılmayacakları>
- Yazım: <formül, simge, birim yazımı; tahtada ve HTML metinde>
- Okunuş: <temada karar verilmiş `speak` okunuşları>

## Kapsam
Yalnızca kendi dersinin sayfasına ve ders dosyasına (ve görev iletisi söylüyorsa konunun araç dosyasına) yaz. `tema.js`, `kit.js`, `tema.css`, öteki derslerin dosyaları, `plan/`, `ortak/`, `araclar/`, `TASKS.md` ve git (add, commit, stash, checkout, restore) yasak. Aynı anda başka ajanlar öteki dersleri yazıyor. `tema.js` satırını yazma; raporda ver.

## Doğrulama
    node araclar/olc.js <tema>/<kod> --goruntu "$(mktemp -d)" 2>&1 | tail -20

"yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0 ve "konsol temiz" olmalı; tabloda her sahne görünmeli ("sahne otomatik tamamlanamadı" olmamalı).

Görüntüler: her sahnenin son karesine (`sNN-son.png`) ve soru sahnelerinde bir ara kareye Read ile bak: yazılar okunuyor mu, üst üste binen çizim var mı, altyazı ile tahta aynı şeyi anlatıyor mu, çizim senaryodaki fikri gösteriyor mu, içerik doğru mu. Aynı kareye iki kez bakma; düzeltmeden sonra yalnızca değişen sahneyi yeniden gör.

Komut çıktısını kısalt (`| tail -20`, `grep -n`, `sed -n a,bp`); dosyayı `cat` ile dökme, yüz satırı aşan çıktı alma.

En çok üç ölç-düzelt turu. Üçüncüden sonra temiz değilse kalanı raporla ve dur.

## Rapor
Sahne adları ve sayısı; son `olc` çıktısındaki tablo ile "yerleşim", "bütçe", "defter", "konsol" satırları (aynen); `tema.js` satırı (`['<dosya>.html', 'başlık', 'açılış sorusu', sahne sayısı]`). Ayrıca: araç dosyasına ya da ders dosyasına yazdığın araçların listesi; senaryodan her sapma ve nedeni; içerikle ilgili her kuşku; temiz olmayan her şey; görev tanımında eksik bulduğun her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
