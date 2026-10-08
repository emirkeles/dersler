# Senaryolar — Konu I · Buhar basıncı

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.9, `../PLAN.md` bölüm 3 (I1, I2), bölüm 7 (karar 2, 3, 12, 15) ve bölüm 8 ("I · Buhar basıncı"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir. Dosya adlarında ve kimliklerde küçük ASCII "i" kullanılır (`i1-buhar-basinci.html`, `cesitlilik-i1`); ekranda "Konu I".

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (mmHg "milimetre cıva", kPa "kilopaskal", Vb "buharlaşma hızı", Vy "yoğuşma hızı", H₂O "su", C₂H₅OH "etil alkol").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Veri bir durumun içinde sunulur ("bir araştırmacı ölçtü").
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir birkaç parçadan oluşuyorsa 3–6. adımlar her parça için yinelenir.
- Sürükle-bırak, eşleştirme ve sıralama sahneleri kart başına seçimle kurulur (kitteki `sinifla` aracı): kart öne çıkar, öğrenci kutuyu seçer, kart tahtada yerine oturur; geri bildirim her kartın altına düşer. Bu dosyada `c.drag`, `c.match`, `c.sort` yoktur. Benzetimde `c.slider` ve `c.choice` kullanılır.
- Renkler tema boyunca aynıdır: artı yük turuncu, eksi yük mavi, çekme kuvveti yeşil, itme kuvveti kırmızı. Bu konuda yük çizilmez; çekim (sıvı molekülleri arasında) yeşildir. Kitaptaki mavi ve kırmızı oklar (buharlaşma, yoğuşma) **kullanılmaz**: mavi eksi yüke, kırmızı itmeye ayrılmıştır. Buharlaşma oku yukarı yönlü koyu gri, yoğuşma oku aşağı yönlü açık gri çizilir; yönleri zıt olduğu için karışmaz, yine de her iki okun yanında ilk görüldüğü yerde etiketi ("buharlaşma", "yoğuşma") durur. Sıvılar nötr açık tonlarda (su ve benzen farklı açık tonda) çizilir; renk anlam taşımaz. Cıva koyu gri.
- Oklar ve molekül sayıları şematiktir: ok sayıları kitaptaki şekilden alınır (buharlaşma ve yoğuşma hızının büyüklük sırasını gösterir); tahtaya "saniyede şu kadar molekül" gibi sayı yazılmaz. Cıva seviyeleri farkı yalnızca benzetimde okunan değerle orantılı çizilir.
- Benzetimde görünen her sayı kitaptaki bir değerdir: su 25 °C 23,8 mmHg; su 40 °C 55,3 mmHg; benzen 25 °C 95,3 mmHg; benzen 40 °C 183 mmHg (s. 171). Ek: 20 °C'ta su 2,33 kPa, etil alkol 5,85 kPa, dietil eter 58,96 kPa (s. 185). Ara sıcaklıkta değer uydurulmaz: sıcaklık kaydırıcısı yalnızca 25 °C ve 40 °C'ta durur (iki konumlu kaydırıcı).

Çizim araçları (kit için; konunun araç dosyası `dersler/i-araclar.js`, `window.KIT_I`):

- `kapliU(opts)`: kapak ve U borulu kap. Seçenekler: sıvı (ad, açık ton), sıvı seviyesi (V ya da 2V), kap biçimi (standart / geniş ve sığ), kap boyu (küçük / büyük), kapak açık-kapalı, cıva seviyeleri farkı (0–183 mmHg ölçeğiyle orantılı; U borunun yanında "okunan değer" kutusu), buhar molekülleri (nötr gri, kısa hareket izi). Sıvı seviyesi ve kap değişince buhar boşluğunun büyüklüğü de değişir.
- `akis(opts)`: sıvı yüzeyinde yukarı oklar (buharlaşma) ve aşağı oklar (yoğuşma); ok sayısı ayarlanır (kitaptaki dört aşama: 3↑1↓, 2↑2↓, 2↑2↓; açık kapta yalnızca yukarı); tek tek işaretlenen iki molekül (biri çıkar, biri döner).
- `asama(n)`: dört aşamalı şerit; yalnızca numaralar (1–4); etkin aşama büyük.
- `cekim(sivi)`: sıvı kesiti: nötr gri moleküller arasında yeşil çekim çizgileri; "kalın" (su, hidrojen bağı etiketi) ve "ince" (benzen, London kuvveti etiketi); yüzeyden ayrılan şematik moleküller. Sıcaklık sahnesi için moleküllere hareket izi (kısa/uzun).
- `sorukarti(metin, etiketler)`: soru kartı ve altına düşen iki etiket ("değiştirdiğimiz", "ölçtüğümüz").
- `degiskenler(satirlar)`: üç sütunlu çerçeve (Bağımlı · Bağımsız · Kontrol); sütunlar tek tek dolar.
- `deneyTablosu()`: satır ekleyen tablo (sütunlar: Sıvı · Sıcaklık · Miktar · Kap · Basınç, mmHg). İlk satır hazırdır (su · 25 °C · V · standart · 23,8). "Tabloya yaz" düğmesi o anki kaydırıcı konumlarını satır yapar; tablonun altında tek satırlık not: ilk satıra göre **tek** değişken değiştiyse "Tek değişken değişti: …", birden çok değiştiyse "Birden çok değişken değişti: etkiyi ayıramazsın." Düğme `c.h('button')` ile kurulur.
- `cubuk(a, b)`: iki çubuk, ortak ölçek, değer etiketi (su 2,33 · etil alkol 5,85; sonra dietil eter).
- `sinifla`: kitte var; kart başına iki kutu seçimi.
- Kaydırıcılar iki konumludur (`min`, `max`, `step: 1`; `fmt` ile "V"/"2V", "Su"/"Benzen", "25 °C"/"40 °C", "Standart"/"Geniş ve sığ", "Küçük"/"Büyük").

## I1 · Buhar basıncı nedir?

- **Fikir:** Farklı sıvılar farklı hızda buharlaşır; kapalı kapta buharlaşmayla birlikte yoğuşma da olur; sıvının üstündeki buharın kabı iten kuvveti buhar basıncıdır ve buharlaşma hızı yoğuşma hızına eşitlenince değişmez bir değere, denge buhar basıncına ulaşır.
- **Giriş ekranı sorusu:** Eline dökülen alkol birkaç saniyede uçar, su kalır; neden?
- **Kaynak:** Ders kitabı s. 166 (buharlaşma, buhar, buharlaşma hızı tanımları; özdeş kaplarda 25 °C'ta 10 mL H₂O ve 10 mL C₂H₅OH), s. 168 (ağzı açık kapta sıvının tamamı buharlaşabilir, kapalı kapta buharlaşmayla birlikte yoğuşma da olur; dört aşamalı U borulu düzenek: açık kap, kapak kapatılıp beklenen üç aşama; oklar buharlaşma ve yoğuşma hızını gösterir), s. 169 (buhar basıncı: buhar moleküllerinin kabın yüzeyine ve U borusunun çeperlerine çarpmasıyla oluşan kuvvet; cıva seviyeleri farkı Vb = Vy olana dek artar; denge ve iki olayın sürmesi; birim hacimdeki buhar molekülü sayısı değişmediği için basınç değişmez; denge buhar basıncı tanımı; saf suyun 25 °C'ta 23,8 mmHg; Etkinlik 2.19 soru kalıbı "Bir sıvının denge buhar basıncını … etkiler mi?"), s. 171 (Vb > Vy ve Vb = Vy şekilleri), s. 172 (Görsel 2.21: aday faktörler). Kaynama ve buharlaşmanın kavramı ön bilgidir (`MUFREDAT.md` temel kabuller); yeniden anlatılmaz. Kitabın buharlaşma hızı tanımı ile yoğuşma, derste yalnızca bu dersin kavramlarını kurmak için bir cümleyle anılır.
- **Sınır:** Aday faktörlerin cevabı yok (I2). Buharlaşma hızını etkileyen faktörler (kitabın Etkinlik 2.17 Şekil 2–3 ve kavram haritası: sıcaklık, kabın biçimi) alınmaz; program yalnızca "özdeş kapta, aynı miktar, farklı sıvı" der. Kaynama, dış basınç, "uçucu", atm, mmHg–cıva sütunu çevrimi yok. mmHg yalnızca birim adı olarak geçer; "sayı büyükse basınç büyüktür".
- **Güç kavramlar ve gösterimi:** (1) Aynı anda iki görünmez olay: kapalı kapta yukarı (buharlaşma) ve aşağı (yoğuşma) oklar, her biri bir molekül; aşama aşama sayıları değişir. (2) Basınç, çarpan moleküllerdir: buhar molekülleri çeperlere kısa izlerle çarpar, cıva sütununu iter; fark yükselir. (3) Denge durgunluk değildir: aşama 3–4'te moleküller hareket etmeyi sürdürür, çıkan ve dönen molekül sayısı eşittir; sıvı seviyesi ve cıva farkı sabittir. (4) Soru kurmak: soru kartı iki etiket alır, "değiştirdiğimiz" ve "ölçtüğümüz".
- **Hedeflenen yanılgı:** "Dengede buharlaşma da yoğuşma da durur" ve "kapalı kapta sıvı tamamen buharlaşır".
- **Akılda kalıcı cümle:** Sıvısıyla dengedeki buharın basıncı, denge buhar basıncıdır.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Sofra tuzu ile buz ısıtılıyor. Hangisi daha yüksek sıcaklıkta erir? **Sofra tuzu** / Buz / İkisi aynı sıcaklıkta erir. (H2) Yanlışta: "Tanecikleri güçlü etkileşim tutan katı daha yüksek sıcaklıkta erir; tuzda iyonlar, buzda moleküller var."
2. Hangisinin molekülleri arasında hidrojen bağı kurulabilir? **H₂O** / CH₄ / CO₂. (G4) Yanlışta: "Hidrojen bağı için H, F, O ya da N'ye doğrudan bağlı olmalı; H₂O'da O–H bağı var."

Sonra: "Bugün sıvıların üstündeki buharın basıncına bakacağız."

### Sahne 2 · Aynı kap, aynı miktar, farklı sıvı

Tahta: iki özdeş kap yan yana; solda su, sağda etil alkol; her kabın altında tek satır: "su · 10 mL · 25 °C", "etil alkol · 10 mL · 25 °C". Kapların altında iki zaman çubuğu (aynı ölçek, boş). Sonra kaplar boşalır; çubuklar dolar: alkolün çubuğu kısa, suyunki uzun. En son tek bir sıvı yüzeyi büyür: yüzeyden ayrılan moleküller yukarı oklarla (alkolde çok, suda az; şematik).

Anlatım:
1. Özdeş kaplarda 10 mL su ve 10 mL etil alkol bekliyor.

Tahmin (`tag: 'Tahmin et'`; gündelik sezgi): Bir süre sonra hangi kap önce boşalır? **Etil alkol** / Su / İkisi aynı anda. Dayandığı anlatım: yok (sezgi; açılış sorusundaki gündelik gözlem). İpuçları: "Eline dökülen alkol ile suyu düşün." · "Kap, miktar ve sıcaklık aynı; fark sıvının kendisinde."

Sonra:
2. Etil alkol, sudan daha hızlı buharlaşıp önce biter.
3. Buharlaşma hızı, birim zamanda sıvıdan ayrılan molekül sayısıdır.
4. Ayrılan moleküller sıvısıyla temas ederse buhar adını alır.
5. Alkolde birim zamanda ayrılan molekül sayısı daha fazladır.
6. Bu farkı ölçmenin bir yolu var.

### Sahne 3 · Kapağı kapat

Tahta: solda ağzı açık kap, sağda aynı kap kapakla kapalı; ikisinde su. Açık kapta yüzeyden çıkan moleküller kabın dışına yayılır; kapalı kapta kapağın altında kalır. Sonra kapalı kapta bazı moleküller sıvıya geri iner (aşağı oklar, "yoğuşma"; yukarı oklar "buharlaşma").

Anlatım:
1. Ağzı açık kapta sıvının tamamı buharlaşabilir.
2. Kapağı kapatınca buhar kabın içinde kalır.
3. Buhar moleküllerinin sıvıya geri dönmesine yoğuşma denir.
4. Kapalı kapta buharlaşma ve yoğuşma birlikte sürer.

Soru (`tag: 'Sıra sende'`): Ağzı kapalı kapta bir süre sonra sıvının tamamı buharlaşır mı? **Hayır; buharın bir kısmı yoğuşarak sıvıya döner** / Evet; buharlaşma hiç durmaz / Hayır; kapak buharlaşmayı durdurur. Dayandığı anlatım: 1–4. İpuçları: "Kapalı kapta buhar nereye gidebilir?" · "Kapak buharlaşmayı durdurmaz; yoğuşma da olur."

Sonra:
5. Bu yüzden kapalı kaptaki sıvının tamamı buharlaşmaz.

### Sahne 4 · Buhar basıncı: çarpan moleküller

Tahta: kapalı kap ve ona bağlı U boru (cıva, iki kolda aynı seviye). Kapak kapanınca buhar molekülleri çeperlere ve boru çeperine kısa izlerle çarpar; cıvanın kaba bağlı kolu iner, öteki kol yükselir; iki seviye arasında ölçü çizgisiyle fark belirir.

Anlatım:
1. Buhar molekülleri hareket eder ve kabın çeperlerine çarpar.
2. Bu çarpmaların oluşturduğu kuvvet, buhar basıncıdır.
3. Kaba bağlı U borusunun içinde cıva vardır.
4. Buhar basıncı büyüdükçe cıva seviyeleri arasındaki fark artar.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Aynı suyla dolu iki kaptan biri açık, biri kapalı; ikisine de U borusu bağlı. Hangisinde cıva seviyeleri arasında fark oluşur? **Kapalı kapta** / Açık kapta / İkisinde de. Dayandığı anlatım: sahne 3, 1–2; bu sahne, 1–4. İpuçları: "Buharın çeperlere çarpabilmesi için kabın içinde kalması gerekir." · "Açık kapta buhar dışarı yayılıyordu."

Gör: açık kapta cıva seviyeleri eşit kalır; kapalı kapta fark belirir.

Sonra:
5. Kapalı kapta buhar çeperlere çarpar ve fark oluşur.

### Sahne 5 · Denge nasıl kurulur

Tahta: üstte dört nokta (aşama 1–4; etkin olan dolu). Ortada kapalı kap, U boru ve oklar; her aşamada kitaptaki ok sayıları: aşama 1 açık kap, ok yok, seviyeler eşit; aşama 2 kapak kapalı, üç yukarı ok (buharlaşma), bir aşağı ok (yoğuşma), küçük fark; aşama 3 ikişer ok, fark büyük; aşama 4 ikişer ok, fark aşama 3 ile aynı. Sıvı seviyesi aşama 1 → 3 arasında biraz iner, 3 → 4 arasında sabittir. Her aşamanın altında tek etiket: "açık kap", "Vb > Vy", "Vb = Vy" (3. aşama), "Vb = Vy" (4. aşama).

Anlatım:
1. Önce ağzı açık kapta cıva seviyeleri eşittir.
2. Kapak kapanınca buharlaşma hızı (Vb), yoğuşma hızından (Vy) büyüktür.
3. Buhar biriktikçe cıva seviyeleri farkı artar.
4. Buhar biriktikçe yoğuşan molekül sayısı da artar.

Birlikte çöz (`tag: 'Birlikte çöz'`): 3. aşama gösterilir, etiket "Vb ? Vy". Üçüncü aşamada buharlaşma hızı ile yoğuşma hızı nasıl? **Eşit** / Buharlaşma hızı büyük / Yoğuşma hızı büyük. Dayandığı anlatım: 2–4. İpuçları: "Yoğuşma 2. aşamadan beri artıyor." · "Oklar eşit sayıda; fark artık büyümüyor."

Sonra:
5. Yoğuşma hızı buharlaşma hızına eşitlenince denge kurulur.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Dengeye ulaşmış kapalı kap, aynı sıcaklıkta bir süre daha bekletiliyor. Cıva seviyeleri farkı ne olur? **Aynı kalır** / Artar / Azalır. Dayandığı anlatım: 2–5. İpuçları: "Hız eşitse buhar fazında net bir değişim olmaz." · "3. ve 4. aşamayı karşılaştır."

Gör: aşama 4 belirir; fark aşama 3 ile aynıdır.

Sonra:
6. Denge kurulunca cıva seviyeleri farkı artık değişmez.

### Sahne 6 · Denge durmak değildir

Tahta: dengedeki kap büyür. Sıvı yüzeyinde iki molekül işaretlenir: biri yukarı çıkar, buhar içinde dolaşır; öbürü buhardan sıvıya iner. İki sayaç kutusu: "çıkan" ve "dönen" (aynı yükseklikte iki çubuk, sürekli dalgalanmadan aynı boyda). Cıva farkı ve sıvı seviyesi çizgisi sabit kalır.

Anlatım:
1. Dengede iki olay eşit hızla sürer.
2. Birim zamanda sıvıdan çıkan molekül sayısı, dönen sayısına eşittir.
3. Buhar fazındaki molekül sayısı değişmez, bu yüzden basınç değişmez.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Denge kurulunca kapta ne olur? **Buharlaşma da yoğuşma da aynı hızla sürer** / İkisi de durur / Yalnızca yoğuşma sürer. Dayandığı anlatım: 1–3. İpuçları: "Cıva farkı sabit; moleküller de hareketsiz mi?" · "Sıvı yüzeyinden molekül çıkışı durmaz."

Gör: işaretli iki molekül sürekli yer değiştirir; çubuklar eşit boyda kalır.

### Sahne 7 · Denge buhar basıncı

Tahta: aşama 4'teki kap; yanında tek satır: "Vb = Vy → basınç sabit". Sonra kabın üstüne etiket: "su · 25 °C · 23,8 mmHg".

Anlatım:
1. Sıvısıyla dengede bulunan buharın basıncına denge buhar basıncı denir.
2. Saf suyun 25 °C'taki denge buhar basıncı 23,8 mmHg'dir.

Defter ("Denge buhar basıncı"): **Vb = Vy iken buharın basıncı.** Örnek: su, 25 °C, 23,8 mmHg.

Dene (sınıflandırma; kart başına seçim, `sinifla`; iki kutu: "Denge kurulmadı", "Denge kuruldu"; kart yerleşince altına bir cümle düşer). Her kartta bir kapalı kap çizimi ve tek satır:
- "Kapak yeni kapandı; Vb > Vy." → **Denge kurulmadı.** "Buharlaşma hâlâ yoğuşmadan hızlı."
- "Vb = Vy." → **Denge kuruldu.** "Hızlar eşit."
- "Cıva seviyeleri farkı büyüyor." → **Denge kurulmadı.** "Buhar hâlâ birikiyor."
- "Cıva farkı sabit; buhar molekülü sayısı sabit." → **Denge kuruldu.** "Buharın basıncı artık değişmiyor."

### Sahne 8 · Soru kur

Tahta: kapalı kap ve U boru (cıva farkı ölçü çizgisiyle). Altta soru kartları tek tek gelir. Her karta iki etiket düşer: "değiştirdiğimiz" ve "ölçtüğümüz".

Anlatım:
1. Denge buhar basıncını cıva seviyeleri farkından okuruz.
2. Neyi değiştirirsek bu fark değişir, diye sorabiliriz.
3. Bir soru, bir şeyi değiştirip ölçerek cevaplanıyorsa araştırılabilir.

Örnek (baştan sona): kart: "Sıcaklık yükselirse cıva seviyeleri farkı değişir mi?" Etiketler: "değiştirdiğimiz: sıcaklık", "ölçtüğümüz: cıva farkı".
4. Burada sıcaklığı değiştirir, cıva farkını ölçeriz.

Birlikte çöz (`tag: 'Birlikte çöz'`): kart: "Sıvı miktarı artarsa cıva seviyeleri farkı değişir mi?" Etiketler: "değiştirdiğimiz: sıvı miktarı", "ölçtüğümüz: ?". Bu soruda ölçtüğümüz nedir? **Cıva seviyeleri farkı** / Sıvının rengi / Kabın biçimi. Dayandığı anlatım: 1–4. İpuçları: "Sorunun sonundaki 'değişir mi?' neyin değişmesini soruyor?" · "Önceki kartta ölçtüğümüz buydu."

Soru (`tag: 'Sıra sende'`): Hangisi araştırılabilir bir sorudur? **Sıvının cinsi değişirse cıva seviyeleri farkı değişir mi?** / Hangi sıvı daha güzel kokar? / Buhar basıncı neden bu kadar önemli? Dayandığı anlatım: 3–4 ve örnek. İpuçları: "Değiştirip ölçebileceğin bir şey var mı?" · "Koku ve önem, cıva farkıyla ölçülmez."

Gör: seçilen kart etiket alır: "değiştirdiğimiz: sıvının cinsi", "ölçtüğümüz: cıva farkı".

Dene (sınıflandırma; kart başına seçim, `sinifla`; iki kutu: "Araştırılabilir", "Araştırılamaz"; her kartın altına bir cümle düşer):
- "Kabın biçimi değişirse cıva seviyeleri farkı değişir mi?" → **Araştırılabilir.** "Kabı değiştirir, farkı ölçeriz."
- "Kabın hacmi değişirse cıva seviyeleri farkı değişir mi?" → **Araştırılabilir.** "Kabı büyütür, farkı ölçeriz."
- "Etil alkol, sudan daha iyi bir sıvı mıdır?" → **Araştırılamaz.** "'İyi'yi ölçemeyiz; değiştirip ölçecek bir şey yok."

Sonra: tahtada beş araştırılabilir soru, tek çerçevede: "Bir sıvının denge buhar basıncını … etkiler mi?" Boşlukta sırayla: sıvının cinsi · sıcaklık · sıvı miktarı · kabın biçimi · kabın hacmi.
5. Beş sorunun hepsi tek tek sınanabilir.

### Çıkış soruları

1. Buhar basıncı nedir? **Buhar moleküllerinin kabın çeperlerine çarpmasıyla oluşan basınç** / Sıvı moleküllerinin kabın tabanına uyguladığı basınç / Kapağın sıvıya uyguladığı basınç. (sahne 4)
2. (yanılgı) Denge kurulduğunda kapalı kapta ne olur? **Buharlaşma ve yoğuşma aynı hızla sürer** / Buharlaşma durur / İkisi de durur. (sahne 6)
3. (yeni durum) Kapalı kapta su henüz dengeye ulaşmadı; buharlaşma hızı yoğuşma hızından büyük. Cıva seviyeleri farkı nasıl değişir? **Artar** / Azalır / Aynı kalır. (sahne 5)
4. (yeni durum) Kapalı kapta etil alkol dengeye ulaştı. Kapağın altındaki buhar molekülü sayısı bundan sonra nasıl değişir? **Değişmez** / Artar / Azalır. (sahne 6)
5. (yeni durum) Hangisi araştırılabilir bir sorudur? **Sıcaklık yükselirse cıva seviyeleri farkı değişir mi?** / Hangi sıvının kabı daha güzel görünür? / Cıva neden gümüş renklidir? (sahne 8)

Özet: Kapalı kapta buharlaşma ve yoğuşma birlikte sürer. · Buhar basıncı, buharın çeperlere çarpmasıdır. · Dengede iki olay durmaz; basınç değişmez. · **Sıvısıyla dengedeki buharın basıncı, denge buhar basıncıdır.**

## I2 · Buhar basıncını ne etkiler: değişkeni tek tek sına

- **Fikir:** Bir faktörün buhar basıncına etkisi, ötekiler sabit tutulup yalnızca o faktör değiştirilerek bulunur; sıvının cinsi ve sıcaklık etkiler, sıvı miktarı, kabın biçimi ve kabın hacmi etkilemez; etki moleküller arası çekimle açıklanır.
- **Giriş ekranı sorusu:** Buhar basıncını neyin değiştirdiğini bulmak istiyorsun; bir denemede kaç şeyi birden değiştirebilirsin?
- **Kaynak:** Ders kitabı s. 171 (3. Yönerge: su Vb = Vy, 25 °C, 1 atm, 23,8 mmHg; 40 °C, 55,3 mmHg; benzen 25 °C 95,3 mmHg; 40 °C 183 mmHg; şekil etiketleri: su "polar yapılı", "H bağı"; benzen "apolar yapılı", "London kuvveti"), s. 170 (deney planı çerçevesi: bağımlı, bağımsız, kontrol değişkenleri sütunları; U borulu düzenek), s. 172 (çekim zayıfladıkça buhar fazına geçen molekül sayısı ve buhar basıncı artar; sıcaklık artınca kinetik enerji ve buhar fazına geçen molekül sayısı artar; Görsel 2.21: sıvının cinsi ve sıcaklığa bağlıdır, sıvı miktarına, kabın biçimine ve hacmine bağlı değildir), s. 173 (Kontrol Noktası 2.9, soru 2: aynı X sıvısı için dört kap, 25 °C'ta V, 2V ve geniş sığ kapta V: hepsinde cıva farkı h; 60 °C'ta V: 2h; "buhar fazının hacmi arttıkça basınç azalır" ve "sıvı miktarı arttıkça değişmez" ifadeleri), s. 185 (Kontrol Noktası 2.10 tablosu: 20 °C'ta su 2,33, etil alkol 5,85, dietil eter 58,96 kPa). Program yalnızca saf sıvıdan söz eder; saflık derecesi alınmaz (karar 12). İki sıvı için moleküller arası etkileşim 1. konulardan (G3, G4) hatırlanır.
- **Sınır:** Faktörler: sıvının cinsi, sıcaklık (etkiler); sıvı miktarı, kabın biçimi, kabın hacmi (etkilemez). "Uçucu", saflık derecesi, çözelti, yüzey alanı adıyla etkileyen ya da etkilemeyen faktör, kaynama ve dış basıncın rolü yok; dış basınç "1 atm" olarak sabit bir etikettir, açıklanmaz (J1). Mol kütlesi, molekül büyüklüğü, London kuvvetinin büyüklüğü yok. Benzetimdeki dört sıvı-sıcaklık değeri dışında sayı yok.
- **Güç kavramlar ve gösterimi:** (1) Bağımlı, bağımsız, kontrol değişkeni: aynı üç sütunlu çerçeve (Bağımlı · Bağımsız · Kontrol) her araştırmada yeniden dolar; kaydırıcıyla oynanan değişken "bağımsız" sütununa, okunan değer "bağımlı" sütununa, kilitli kalanlar "kontrol" sütununa düşer. (2) İki değişkeni birden değiştirmenin neden hata olduğu: aynı tablo iki satırı yan yana gösterir; farklı sütunlar vurgulanır. (3) "Değişmedi" sonucu: benzetimde kaydırıcı oynar, kap değişir, cıva farkı ve okunan değer yerinde kalır. (4) Çekimin buhar basıncına etkisi: kalın yeşil çizgili su kesiti ile ince yeşil çizgili benzen kesiti yan yana; yüzeyden ayrılan molekül sayısı şematik (su az, benzen çok).
- **Hedeflenen yanılgı:** "Kapta daha çok sıvı varsa buhar basıncı daha büyüktür" (ve "kap büyüyünce basınç azalır"); "iki şeyi birden değiştirip hangisinin etkisi olduğunu söyleyebiliriz".
- **Akılda kalıcı cümle:** Tek değişkeni değiştir, ötekileri sabit tut.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Kapalı kaptaki U borusunda cıva seviyeleri farkı neyi gösterir? **Buhar basıncını** / Sıvının sıcaklığını / Sıvının miktarını. (I1) Yanlışta: "Buhar molekülleri çeperlere çarpıp cıvayı iter; fark buhar basıncını gösterir."
2. Apolar moleküller arasında hangi etkileşim bulunur? **London kuvveti** / Hidrojen bağı / İyon-dipol. (G3) Yanlışta: "Apolar moleküllerde indüklenmiş dipoller arasındaki London kuvveti etkir."

Sonra: "Bugün bu basıncı neyin değiştirdiğini sınayacağız."

### Sahne 2 · Sıvının cinsi: iki sıvı, bir ölçüm

Tahta: iki kapalı kap yan yana, her birine U boru bağlı; solda su, sağda benzen; ikisinin üstünde aynı etiket "25 °C · 1 atm". Cıva farkları sırayla belirir (su kısa, benzen uzun; ölçekli) ve yanlarında değer kutuları dolar.

Anlatım:
1. Bir araştırmacı su ve benzeni kapalı kaplarda 25 °C'ta dengeye getirdi.
2. Suyun denge buhar basıncı 23,8 mmHg çıktı.
3. Benzeninki 95,3 mmHg çıktı.
4. Dış basınç, sıcaklık ve kaplar aynıydı.
5. Yalnızca sıvı farklıydı.

Soru (`tag: 'Sıra sende'`): Bu veriden hangi neden-sonuç cümlesi çıkar? **Sıvının cinsi değişince buhar basıncı değişti** / Buhar basıncı değişince sıvının cinsi değişti / Sıcaklık değişince buhar basıncı değişti. Dayandığı anlatım: 1–5. İpuçları: "Hangisini değiştirdik, hangisini ölçtük?" · "Sıcaklık iki kapta da aynıydı."

Gör: iki kart belirir: "neden: sıvının cinsi değişti" → "sonuç: buhar basıncı değişti".

Sonra:
6. Sıvının cinsi değişince buhar basıncı değişir.

### Sahne 3 · Sıcaklık

Tahta: su dolu kapalı kap ve U boru; üstte "25 °C" (cıva farkı kısa, "23,8 mmHg"). Sonra kap ısınır, etiket "40 °C" olur; fark uzar, "55,3 mmHg" yazar. Kapın üstünde değişmeyenler etiketi: "aynı su · aynı kap".

Anlatım:
1. Araştırmacı aynı suyun sıcaklığını 40 °C'a çıkardı.
2. Denge buhar basıncı 23,8'den 55,3 mmHg'ye yükseldi.

Birlikte çöz (`tag: 'Birlikte çöz'`): iki satırlı neden-sonuç tablosu. "Değişen: sıcaklık" ve "Değişmeyen: sıvı, kap" dolu; "Sonuç: ?". Sıcaklık arttıkça su için denge buhar basıncı ne oldu? **Arttı** / Azaldı / Aynı kaldı. Dayandığı anlatım: 1–2. İpuçları: "23,8 ile 55,3'ü karşılaştır." · "Sayı büyüdü mü, küçüldü mü?"

Sonra:
3. Sıcaklık arttıkça buhar basıncı arttı.

### Sahne 4 · Değişkenler: ölç, değiştir, sabit tut

Tahta: kapalı kap ve U boru çizimi (küçük). Yanında üç sütunlu boş çerçeve: Bağımlı · Bağımsız · Kontrol. Sıcaklık araştırması (örnek) tek tek dolar.

Anlatım:
1. Araştırmada ölçtüğümüz değişkene bağımlı değişken denir.
2. Değiştirdiğimiz değişkene bağımsız değişken denir.
3. Sabit tuttuğumuz değişkenlere kontrol değişkenleri denir.

Örnek (baştan sona; sıcaklığın etkisi): çerçeve dolar: Bağımlı: buhar basıncı · Bağımsız: sıcaklık · Kontrol: sıvı, sıvı miktarı, kap, dış basınç (1 atm).
4. Sıcaklığın etkisini araştırırken buhar basıncını ölçeriz.
5. Değiştirdiğimiz sıcaklıktır; bağımsız değişken odur.
6. Sabit kalan sıvı, miktar ve kap kontrol değişkenleridir.

Birlikte çöz (`tag: 'Birlikte çöz'`): çerçeve yeni araştırma için: "Sıvının cinsinin etkisi". Bağımlı: buhar basıncı (dolu) · Bağımsız: ? · Kontrol: sıcaklık, sıvı miktarı, kap, dış basınç (dolu). Bu araştırmada bağımsız değişken hangisidir? **Sıvının cinsi** / Sıcaklık / Buhar basıncı. Dayandığı anlatım: 1–6. İpuçları: "Bağımsız değişken, değiştirdiğin şeydir." · "Sıcaklık bu araştırmada sabit kalıyor."

Karşı örnek: tahtada iki ölçüm yan yana: "su · 40 °C · 55,3 mmHg" ve "benzen · 25 °C · 95,3 mmHg"; iki sütun (sıvı, sıcaklık) iki ölçümde de farklı, vurgulanır.
7. Bu iki ölçümde sıvı da sıcaklık da farklı.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Araştırmacı su 40 °C ile benzen 25 °C'ı karşılaştırdı. Bu iki ölçüm sıvının cinsinin etkisini gösterir mi? **Göstermez; sıcaklık da farklı** / Gösterir; iki sıvının basıncı farklı / Gösterir; benzenin basıncı daha büyük. Dayandığı anlatım: 1–3, 7. İpuçları: "Kaç şey birden değişmiş?" · "Fark sıvıdan mı, sıcaklıktan mı geldi, bilebilir misin?"

Sonra:
8. Etkiyi görmek için tek değişkeni değiştirir, ötekileri sabit tutarız.

Defter ("Değişkenleri sınamak"): **Tek değişkeni değiştir, ötekileri sabit tut.** Örnek: sıcaklık değişir, sıvı sabit.

### Sahne 5 · Deneme 1: sıvı miktarı

Tahta: solda kapalı kap + U boru (`kapliU`), kabın altında kilitli etiketler "su · 25 °C · standart kap"; altında tek kaydırıcı. Sağda `deneyTablosu` (ilk satır hazır: su · 25 °C · V · standart · 23,8). Çerçeve üstte küçük: Bağımsız: sıvı miktarı.

Anlatım:
1. Sıvı miktarının etkisini sınayalım.
2. Sıvı miktarı bağımsız, ötekiler kontrol değişkenidir.

Dene (`c.slider`, "Sıvı miktarı"; iki konum "V" ve "2V"; `noWait` yönerge: "Miktarı değiştir; cıva seviyeleri farkına ve okunan değere bak."): kaydırıcı 2V'ye gelince kaptaki sıvı seviyesi yükselir ve buhar boşluğu küçülür; cıva farkı ve "23,8 mmHg" yerinde kalır. "Tabloya yaz" düğmesi ikinci satırı ekler (su · 25 °C · 2V · standart · 23,8); not satırı "Tek değişken değişti: sıvı miktarı." "Devam", bir satır eklenince açılır.

Soru (`tag: 'Sıra sende'`): Sıvı miktarı V'den 2V'ye çıkınca denge buhar basıncı ne oldu? **Değişmedi; 23,8 mmHg** / Arttı / Azaldı. Dayandığı anlatım: sahne 4, 1–8 ve tablonun iki satırı. İpuçları: "Tablodaki iki satırı karşılaştır." · "Okunan değer değişti mi?" Doğruda: "Miktar iki katına çıktı, basınç aynı kaldı."

Sonra:
3. Sıvı miktarı değişti, buhar basıncı değişmedi.

### Sahne 6 · Deneme 2: kabın biçimi ve hacmi

Tahta: sahne 5'in düzeni; iki kaydırıcı. Üstte çerçeve: Bağımsız: kabın biçimi ya da hacmi (hangisi oynandıysa o). Tablo sahne 5'ten devam eder.

Anlatım:
1. Şimdi kabın biçimini ve hacmini sınayalım.
2. Her denemede yalnızca birini değiştirip ötekini sabit tut.

Dene (iki `c.slider`: "Kabın biçimi", "Standart" / "Geniş ve sığ"; "Kabın hacmi", "Küçük" / "Büyük"; `noWait` yönerge: "Birini değiştir, tabloya yaz; sonra ötekini dene."): kap çizimi kaydırıcıyla değişir (geniş ve sığ kapta sıvı ince bir tabaka; büyük kapta buhar boşluğu büyür); cıva farkı ve okunan değer yerinde kalır. Her "Tabloya yaz" bir satır ekler; not satırı hangi değişkenin değiştiğini söyler, ikisi birden değişirse "Birden çok değişken değişti: etkiyi ayıramazsın." "Devam", her kaydırıcıyla ayrı birer satır eklenince açılır.

Soru (`tag: 'Sıra sende'`): Kabın biçimi ve hacmi değişince denge buhar basıncı ne oldu? **İkisinde de değişmedi** / Geniş kapta arttı / Hacim büyüyünce azaldı. Dayandığı anlatım: sahne 4, 1–8; bu sahne, 1–2 ve tablo. İpuçları: "Tablodaki satırların son sütununa bak." · "Okunan değer hep aynı mı?"

Sonra:
3. Kabın biçimi ve hacmi de buhar basıncını değiştirmedi.

### Sahne 7 · Deneme 3: sıvı ve sıcaklık

Tahta: sahne 6'nın düzeni; iki kaydırıcı (Sıvı: "Su" / "Benzen"; Sıcaklık: "25 °C" / "40 °C"); tablo sürer. Çerçeve: Bağımsız: sıvının cinsi ya da sıcaklık.

Anlatım:
1. Şimdi benzeni 40 °C'ta deneyelim.

Tahmin (`tag: 'Tahmin et'`; gözlemlenmemiş duruma tahmin): Benzenin 25 °C'taki değeri 95,3 mmHg idi. 40 °C'ta denge buhar basıncı ne olur? **95,3 mmHg'den büyük** / 95,3 mmHg'den küçük / 95,3 mmHg. Dayandığı anlatım: sahne 3 (su için sıcaklık arttıkça basınç arttı). İpuçları: "Suda sıcaklık artınca basınç ne olmuştu?" · "Benzen de bir sıvı; neden farklı davransın?"

Dene (iki `c.slider`; `noWait` yönerge: "Benzeni seç, sıcaklığı 40 °C'a getir; tabloya yaz."): kap, sıvı ve sıcaklığa göre çizilir; okunan değerler yalnızca kitaptaki dört değerdir: su 25 °C 23,8 · su 40 °C 55,3 · benzen 25 °C 95,3 · benzen 40 °C 183 mmHg. Not satırı değişen değişkeni söyler (su · 25 °C ilk satıra göre). "Devam", benzen · 40 °C satırı yazılınca açılır.

Gör: tablo tamamlanır; benzen 40 °C satırı vurgulanır; öğrencinin tahmin kutusunun yanına "gözlem: 183 mmHg" düşer.

Soru (`tag: 'Sıra sende'`): Tabloya göre denge buhar basıncını hangi iki değişken değiştirdi? **Sıvının cinsi ve sıcaklık** / Sıvı miktarı ve sıcaklık / Kabın biçimi ve sıvının cinsi. Dayandığı anlatım: sahne 2–3; sahne 5–6 ve tablo. İpuçları: "Hangi satırlarda değer değişti, hangilerinde aynı kaldı?" · "Miktar ve kap değişince değer aynıydı."

Gör: tahtada beş etiket iki gruba ayrılır: "değiştirir": sıvının cinsi, sıcaklık (kalın çerçeve); "değiştirmez": sıvı miktarı, kabın biçimi, kabın hacmi (ince, soluk çerçeve).

Defter ("Buhar basıncını ne etkiler"): **Cins ve sıcaklık etkiler; miktar, kap biçimi, kap hacmi etkilemez.**

### Sahne 8 · Neden: çekim ve sıcaklık

Tahta: solda su, sağda benzen sıvı kesiti (`cekim`): su moleküllerinin arasında kalın yeşil çizgiler ("hidrojen bağı"), benzen moleküllerinin arasında ince yeşil çizgiler ("London kuvveti"); yüzeyden ayrılan moleküller (suda az, benzende çok; şematik). Sonra aynı su 25 °C ve 40 °C: 40 °C'ta moleküllere uzun hareket izleri, yüzeyden ayrılan molekül sayısı daha fazla.

Anlatım:
1. Moleküller arası çekim, yüzeyden ayrılmayı zorlaştırır.
2. Çekim zayıfladıkça buhar fazına geçen molekül sayısı artar.
3. Buhar fazındaki molekül sayısı arttıkça buhar basıncı da artar.
4. Suyun buhar basıncı küçük olduğuna göre çekimi daha büyüktür.
5. Su molekülleri birbirine hidrojen bağıyla bağlanır.
6. Benzen molekülleri arasında yalnızca London kuvveti vardır.
7. Sıcaklık artınca moleküllerin kinetik enerjisi artar.
8. Buhar fazına geçen molekül sayısı artınca buhar basıncı yükselir.

Önermeyi destekle (üç `c.choice`, her biri bir önerme kartı; öğrenci o önermeyi destekleyen gerekçeyi seçer):
- Önerme: "Benzenin buhar basıncı suyunkinden büyüktür." Gerekçe: **Benzende moleküller arası çekim daha zayıftır; buhar fazına daha çok molekül geçer** / Benzende moleküller arası çekim daha kuvvetlidir / Benzenin kabı daha geniştir. Dayandığı anlatım: 2–3, 6. Geri bildirim: "Çekim zayıflayınca buhar fazına geçen molekül artar." · "Kaplar aynıydı; kap biçimi basıncı değiştirmedi."
- Önerme: "Su, 40 °C'ta 25 °C'takinden büyük basınç yapar." Gerekçe: **Kinetik enerji artar; buhar fazına geçen molekül sayısı artar** / Moleküller arası çekim güçlenir / Sıvı miktarı artar. Dayandığı anlatım: 7–8. Geri bildirim: "Sıcaklık artınca moleküller daha hızlı hareket eder." · "Sıvı miktarı değişmedi; basıncı etkilemez."
- Önerme: "Su, aynı sıcaklıkta benzenden küçük basınç yapar." Gerekçe: **Su molekülleri hidrojen bağıyla bağlanır; çekim daha büyüktür** / Su molekülleri arasında çekim yoktur / Su benzenden daha sıcaktır. Dayandığı anlatım: 4–5. Geri bildirim: "Hidrojen bağı çekimi büyütür; ayrılan molekül azalır." · "Sıcaklık aynıydı."

Defter ("Çekim ve basınç"): **Çekim zayıfladıkça buhar basıncı artar.** Örnek: benzen > su.

### Sahne 9 · Başa dön: alkol neden önce bitti?

Tahta: iki çubuk (`cubuk`), ortak ölçek, üstte "20 °C": su ve etil alkol; değer etiketleri "2,33" ve "5,85" (kPa). Sonra üçüncü çubuk gelir: dietil eter "58,96".

Anlatım:
1. Baştaki kaplara dönelim: etil alkol suyun önünde bitmişti.
2. Basınç kPa ile de yazılır.
3. 20 °C'ta suyun denge buhar basıncı 2,33 kPa'dır.
4. Etil alkolünki 5,85 kPa'dır.
5. Etil alkolün buhar basıncı büyük olduğuna göre çekimi daha zayıftır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): 20 °C'ta dietil eterin denge buhar basıncı 58,96 kPa, etil alkolünki 5,85 kPa'dır. Hangisinde moleküller arası çekim daha zayıftır? **Dietil eterde** / Etil alkolde / İkisinde eşit. Dayandığı anlatım: sahne 8, 1–3; bu sahne, 3–5. İpuçları: "Çekim zayıfladıkça buhar basıncı ne olur?" · "Basıncı büyük olan hangisi?"

Gör: dietil eter çubuğu en uzun; ardından üç çubuğun yanında "çekim: en zayıf" ok işareti dietil etere düşer.

### Çıkış soruları

1. Kabın hacminin etkisi araştırılırken bağımsız değişken hangisidir? **Kabın hacmi** / Buhar basıncı / Sıcaklık. (sahne 4)
2. (yanılgı) Aynı sudan dolu iki kapalı kap 25 °C'ta dengede; birinde sıvı miktarı V, ötekinde 2V. Denge buhar basınçları için hangisi doğrudur? **Eşittir** / 2V olanda büyüktür / V olanda büyüktür. (sahne 5)
3. (yeni durum) Kapalı kapta dengedeki bir X sıvısının sıcaklığı 25 °C'tan 60 °C'a çıkarılıp yeniden dengeye getiriliyor. Cıva seviyeleri farkı nasıl olur? **Büyür** / Küçülür / Aynı kalır. (sahne 3, 8)
4. (yeni durum) Aynı sıcaklıkta Y sıvısının buhar basıncı Z sıvısınınkinden büyük. Hangisi doğrudur? **Y'nin molekülleri arasındaki çekim daha zayıftır** / Y'nin molekülleri arasındaki çekim daha kuvvetlidir / Y'nin miktarı Z'ninkinden azdır. (sahne 8)
5. (yeni durum) Bir öğrenci su 25 °C ile etil alkol 40 °C'ı karşılaştırıp sıvının cinsinin etkisini bulmaya çalışıyor. Sorun nedir? **Sıvı ve sıcaklık birlikte değişmiş** / Kaplar kapalı / Su kullanılmış. (sahne 4)

Özet: Etkiyi bulmak için tek değişken değişir, ötekiler sabit kalır. · Sıvının cinsi ve sıcaklık buhar basıncını değiştirir; miktar, kabın biçimi ve hacmi değiştirmez. · Çekim zayıfladıkça ve sıcaklık arttıkça buhar basıncı artar. · **Tek değişkeni değiştir, ötekileri sabit tut.**

## I3 · Konu tekrarı: Buhar basıncı (`i3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): dört panel 2×2 hâlinde sırayla dolar, her biri küçük çizimiyle ve deftere düşer: (1) kapalı kap ve oklar (denge), (2) iki grup etiket (değiştirir / değiştirmez), (3) üç sütunlu değişken çerçevesi, (4) iki sıvı kesiti ve çekim çizgileri (kalın / ince). Her panelin yanında tek satır.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Kapalı kapta buharlaşma ve yoğuşma birlikte sürer.
3. Buhar basıncı, buharın çeperlere çarpmasıyla oluşan basınçtır.
4. Denge kurulunca iki olay aynı hızla sürer, basınç değişmez.
5. Sıvının cinsi ve sıcaklık denge buhar basıncını etkiler.
6. Miktar, kabın biçimi ve kabın hacmi etkilemez.
7. Etkiyi bulmak için tek değişken değişir, ötekiler sabit kalır.
8. Çekim zayıfladıkça ve sıcaklık arttıkça buhar basıncı artar.

Sorular (`quiz`, karışık sırada):

1. Kapalı kapta buharlaşma hızı yoğuşma hızından büyük. Cıva seviyeleri farkı nasıl değişir? **Artar** / Azalır / Aynı kalır. — I1
2. Dengeye ulaşmış kapalı kapta hangisi doğrudur? **Buharlaşma ve yoğuşma aynı hızla sürer** / Buharlaşma durur / Yoğuşma durur. — I1
3. Aynı suyla dolu iki kapalı kap 25 °C'ta dengede; biri geniş ve sığ, öbürü dar ve yüksek. Denge buhar basınçları için hangisi doğrudur? **Eşittir** / Geniş olanda büyüktür / Dar olanda büyüktür. — I2
4. 25 °C'ta dengedeki benzenin sıcaklığı 40 °C'a çıkarılıp yeniden dengeye getiriliyor. Denge buhar basıncı nasıl değişir? **Artar** / Azalır / Değişmez. — I2
5. Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden küçük. Hangisi doğrudur? **K'nin molekülleri arasındaki çekim daha kuvvetlidir** / K'nin molekülleri arasındaki çekim daha zayıftır / İkisinde çekim eşittir. — I2
6. Sıvı miktarının etkisi araştırılıyor. Hangisi kontrol değişkenidir? **Sıcaklık** / Sıvı miktarı / Buhar basıncı. — I2
7. Bir öğrenci kaba daha çok sıvı koyarak 25 °C'taki denge buhar basıncını artırmaya çalışıyor. Ne olur? **Basınç değişmez; sıvı miktarı etkilemez** / Basınç artar / Basınç azalır. — I2
8. Hangisi araştırılabilir bir sorudur? **Sıvının cinsi değişirse cıva seviyeleri farkı değişir mi?** / Hangi sıvı daha güzel kokar? / Buhar basıncı neden bu kadar önemlidir? — I1

Akılda kalıcı cümle: Dengede iki olay sürer; basıncı sıvının cinsi ve sıcaklık belirler.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.9) | Karşılığı |
|---|---|
| a) Buhar basıncını etkileyebilecek faktörleri belirlemek amacıyla sorular oluşturur | I1 sahne 8 (soru kartı, araştırılabilir ayrımı, beş aday soru; `benzetim`). Öğrencinin kendi sorusunu yazması `site dışı` |
| b) Faktörlerin etkilerini neden-sonuç ilişkileri kurarak belirtir | I2 sahne 2 (neden-sonuç cümlesi), sahne 3 (neden-sonuç tablosu), sahne 5–7 (sonuç soruları ve tablo) |
| c) Bağımlı, bağımsız ve kontrol değişkenlerini belirler | I2 sahne 4 (çerçeve, örnek, birlikte çöz, karşı örnek); sahne 5–7 çerçevenin üst satırı |
| ç) Değişkenler arasındaki ilişkiyi belirlemek üzere denemeler yapar | I2 sahne 5–7 (benzetim: kaydırıcı, tabloya yazma, tahmin) |
| d) Önermeleri bilimsel kuramlarla destekler | I2 sahne 8 (önermeyi destekleyen gerekçeyi seçme), sahne 9 |
| Uygulama: özdeş kaplar, aynı miktar, farklı saf sıvı; buharlaşma hızı neden farklı | I1 sahne 2 (gözlem ve tahmin); nedenin cevabı I2 sahne 8–9 (çekim) |
| Uygulama: buhar basıncı tanımı | I1 sahne 3–4 (kapalı kap, çarpan moleküller, U borulu düzenek) |
| Uygulama: denge buhar basıncı tanımı | I1 sahne 5–7 |
| Uygulama: faktörleri belirlemek amacıyla sorular; faktörlerin ne olabileceğine dair tespit | I1 sahne 8 (beş aday soru); I2 sahne 2–3 ve 7 (tespit) |
| Uygulama: 25 °C ve 1 atm'deki hazır veriler; neden-sonuç bağlamında değerlendirme | I2 sahne 2–3 (su, benzen; "bir araştırmacı ölçtü" durumu içinde) |
| Uygulama: bağımlı-bağımsız ve kontrol değişkenlerini tespit etme | I2 sahne 4 |
| Uygulama: değişkenleri kontrol altına alarak denemeler | I2 sahne 5–7 (tek değişkenli deneme, birden çok değişken uyarısı) |
| Uygulama: önermeleri bilimsel kuramlarla destekleme | I2 sahne 8 |
| Uygulama: faktörlerin moleküller arası etkileşimler temelinde açıklanması | I2 sahne 8 (hidrojen bağı, London; sıcaklıkta kinetik enerji), sahne 9 |
| Uygulama: açıklamaları sınıf arkadaşlarıyla paylaşma | `site dışı` (sınıfta yapılır) |
| Uygulama: deney tasarlama, ön ve son form, öz değerlendirme | `site dışı` (sınıfta yapılır); deneyin yerine I2 sahne 5–7 benzetimi geçer |
| Kitabın şırınga ve erlenmayerli deney planı (Etkinlik 2.19, 2. Yönerge) | `site dışı` (sınıfta yapılır); düzenek benzetimde U borulu kapalı kap olarak kurulur |
| Anahtar kavram: buhar basıncı | I1 sahne 4–7; I3 |
| Konu tekrarı (`KURALLAR.md` 3.4) | I3 |

Fazla olan: (1) Buharlaşma hızı tanımı, buhar ve yoğuşma (I1 sahne 2–3): program "buharlaşma hızlarının neden farklı olduğu"nu ve buhar basıncı tanımını ister; kitap bu üç kavramı tanımın ön koşulu olarak yazar (s. 166, 168); yoğuşma kitapta tanımlanmaz, ön bilgidir ve derste bir cümleyle anılır. (2) Araştırılabilir soru kavramı (I1 sahne 8): programın 9.2.9 a bendi "sorular oluşturur" der; "araştırılabilir" sözü yalnızca 9.2.13 a'da geçer ve kitapta tanımı yoktur; bu derste soru kurma bendini seçenekli sınıflandırmayla karşılamak için kullanıldı. (3) Bağımlı, bağımsız, kontrol değişkeni tanımları (I2 sahne 4): kitap s. 170'te yalnızca üç sütun başlığını verir, tanım yoktur; program bu üçünü belirlemeyi ister; tanımlar fen bilimleri ders bilgisiyle ("ölçülen", "değiştirilen", "sabit tutulan") yazıldı, kullanıcı karar versin (rapora bakın). (4) kPa ve dietil eter (I2 sahne 9): kitabın J konusunun Kontrol Noktası 2.10 tablosudur (s. 185); programın "25 °C ve 1 atm hazır veri" cümlesine ek, etil alkolle başa dönüş için; J konusunun yazarı aynı veriyi kullanırsa tekrar çıkabilir. Eksik olan: öğrencinin kendi araştırma sorusunu yazması, kendi deney düzeneğini kurması, alt mikro çizim (kitap Etkinlik 2.17 ve 2.18), sınıf arkadaşlarıyla paylaşım ve öz değerlendirme formu; hepsi `site dışı`. Sıvı miktarı, kabın biçimi ve hacminin neden etkilemediğinin açıklaması kitapta yoktur; derste yalnızca sonuç ("değişmedi") verilir.
