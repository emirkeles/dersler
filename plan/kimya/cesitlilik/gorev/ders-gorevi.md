# Görev: bir konunun kısa derslerini bitmiş senaryodan yaz (Kimya · Çeşitlilik)

Proje kökü: /Users/emirkeles/matematik-sayilar (komutlar buradan çalışır). 9. sınıf için bağımlılıksız, etkileşimli kısa dersler (saf HTML/JS/SVG, Türkçe).

## Önce oku (sırayla)
1. `plan/KURALLAR.md` bölüm 3–3.4 ve 4.
2. Konunun senaryosu (görev iletisinde yolu verilir): baştaki okuma kılavuzu, kodlayan için notlar ve bütün dersler. Senaryo bağlayıcıdır: sahneler, anlatım cümleleri (altyazılar), sorular, şıklar, ipuçları, defter satırları, çıkış soruları oradan alınır.
3. Örnek dersler (üslup, yapı, kit kullanımı): `kimya/cesitlilik/dersler/a1-itme-ve-cekme.js`, `a2-metalik-bag.js`, `a3-tekrar.js` ve sayfaları (`kimya/cesitlilik/a1-itme-ve-cekme.html`).
4. `kimya/cesitlilik/dersler/kit.js` (temanın çizim araçları: `yazi` (üs ve indis için `{ math: true }`), `renkli`, `cizgi`, `kutu`, `ok`, `isaret`, `yuk`, `atom`, `etkilesim`, `metal`, `cubuk`, `gizle`, `belir`, `par`, `tahminAl`, `sinifla`).
5. `ortak/API.md` (ders motoru).

## Yazılacak dosyalar
Her kısa ders için `kimya/cesitlilik/<kod>-<ad>.html` ve `kimya/cesitlilik/dersler/<kod>-<ad>.js` (adlar görev iletisinde). Konunun derslerinde ortak kullanılan çizim araçları için tek bir dosya açabilirsin: `kimya/cesitlilik/dersler/<harf>-araclar.js` (`window.KIT_<HARF>` olarak; sayfada `kit.js` satırından sonra, ders dosyasından önce yüklenir). Ders kimliği `cesitlilik-<kod>`; `kicker: 'Konu <HARF> · <konu adı>'`; `accent` görev iletisindeki renk; `back: 'index.html'`; her derste `nextLesson` konunun sıradaki dersine gider (konu tekrarı dersinde yazılmaz). Sayfaya `ses/…js` satırı konmaz.

## Derste bulunması gerekenler
- İlk sahnenin başlığı tam olarak "Hatırla" (konu tekrarı dersi dışında): senaryodaki `c.choice` soruları; açılış cümlesi "Başlamadan önce iki şeyi hatırlayalım." (tek soru varsa "Başlamadan önce bir şeyi hatırlayalım.").
- Yarısı çözülmüş örnek `tag: 'Birlikte çöz'` etiketini taşır.
- Hiçbir soru, gereken bilgi anlatılmadan sorulmaz (senaryodaki sıra korunur).
- `quiz`: senaryodaki çıkış soruları; her şık için `why` (en çok 2 cümle, şıkkın neden doğru ya da yanlış olduğunu söyler); `scene` 0'dan başlayan sahne indeksi; doğru şıkkın yeri sorudan soruya değişir.
- Defter satırları (`c.note`; en çok 12 kelime) ve özetin kalın satırı olarak akılda kalıcı cümle.
- Anlaşılması güç her kavram tahtada çizilir ve anlatımla birlikte adım adım kurulur.
- Tahta ile altyazı her an aynı şeyi anlatır. Yeni bir örneğe ya da soruya geçerken tahtayı değiştirmeden önce `c.clearSay()` çağır (eski örneğin altyazısı yeni çizimin altında kalmasın). Soru cevaplanınca tahta cevabı gösterirken o örneği anlatan altyazı gelir; senaryoda böyle bir "Sonra" cümlesi yoksa kısa bir tane ekle ve raporla. Sahnenin son karesinde tahta, son altyazının anlattığı şeyi gösterir. Ölçüm aracı bu uyumsuzluğu yakalamaz; görüntülere bakarken her karede altyazı ile tahtayı karşılaştır.
- Konu tekrarı dersi: tek sahne (kurallar tahtada ve defterde), ardından senaryodaki sorular `quiz` içinde; örnek `a3-tekrar.js`.

## Sınırlar
- Altyazı tek cümle ve en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 öğe (biten adım soluklaşır ya da silinir); punto en az 12 px (tahtada 18 birimden küçük yazı kullanma).
- Rakam, simge ya da formül içeren altyazıda `speak:` ile okunuş kelimeyle yazılır ("Na⁺" → "sodyum iyonu", "H₂O" → "su" ya da "H iki O", "2+" → "iki artı", "25 °C" → "yirmi beş derece"). Yönerge yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; derste en çok iki üç tane; `[excited]` yok.
- Senaryoda "sürükle-bırak", `c.drag`, `c.match`, `c.sort` diye geçen sahneler sürüklemeyle KURULMAZ (motorda böyle çağrılar yok; ölçüm ve seslendirme araçları sahneyi kendiliğinden geçebilmeli): kart başına seçimle kurulur; kit'teki `sinifla(c, { soru, kutular, kartlar, sec, yerlestir })` bunun içindir (kart öne çıkar, öğrenci kutuyu seçer, kart tahtada kutusuna yerleşir). Kaydırıcı (`c.slider`) ve `c.cont('Devam ›')` kullanılabilir.
- Öğrenciye kitap, sayfa, sınıf, "veri verildi" denmez. Senaryoda olmayan bilgi eklenmez; senaryodaki "Sınır" satırlarına uyulur.
- Formül ve iyon yazımı: tahtada `yazi(..., { math: true })` ile `'H_{2}O'`, `'Na^{+}'`; soru ve geri bildirim metinlerinde (HTML) `H<sub>2</sub>O`, `Na<sup>+</sup>`.
- Renkler: artı yük turuncu (`RENK.arti`), eksi yük mavi (`RENK.eksi`), çekme yeşil (`RENK.cekme`), itme kırmızı (`RENK.itme`). Atom küreleri için bu dört rengi kullanma (nötr gri tonlar).
- Zamanlama yalnızca `c.wait` / `c.tween` ile; `setTimeout`, `setInterval`, CSS animasyonu, `requestAnimationFrame` yok. Çizimler her açılışta aynı görünmeli (`Math.random` yerine kit'teki `rastgele(tohum)`).

## Kapsam
Yalnızca kendi konunun ders dosyalarına, sayfalarına ve `<harf>-araclar.js` dosyasına yaz. `tema.js`, `kit.js`, `tema.css`, öteki konuların dosyaları, `plan/`, `ortak/`, `araclar/`, `TASKS.md` ve git (add, commit, stash, checkout, restore) yasak. Aynı anda başka ajanlar öteki konuları yazıyor. `tema.js` satırlarını yazma; raporda ver.

## Doğrulama (her ders için)
    node araclar/olc.js cesitlilik/<kod> --goruntu "$(mktemp -d)"

(Bu makinede `timeout` komutu yok; komutun kendi süre sınırını 10 dakika ver.) "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0 ve "konsol temiz" olmalı; tabloda her sahne görünmeli ("sahne otomatik tamamlanamadı" olmamalı). Her sahnenin son görüntüsüne (`sNN-son.png`) ve ara görüntülerden birkaçına Read ile bak: yazılar okunuyor mu, üst üste binen çizim var mı, çizim senaryodaki fikri gösteriyor mu, kimya doğru mu. Sorun varsa düzelt ve yeniden ölç. Bir ders temiz çıkmadan sonrakine geçme.

## Rapor
Ders başına: sahne adları ve sayısı; son `olc` çıktısındaki tablo ile "yerleşim", "bütçe", "defter", "konsol" satırları (aynen); `tema.js` satırı (`['<dosya>.html', 'başlık', 'açılış sorusu', sahne sayısı]`). Ayrıca: araç dosyasındaki araçların listesi; senaryodan her sapma ve nedeni; içerikle ilgili her kuşku; temiz olmayan her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
