# Senaryolar — Konu L · Adezyon ve kohezyon

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.12, `../PLAN.md` bölüm 3 (L1, L2), bölüm 7 (karar 15, 17) ve bölüm 8 ("L · Adezyon ve kohezyon"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir. Önceki konulardan dayanılanlar: G (`G-molekuller-arasi-etkilesimler.md`: hidrojen bağı, London, dipol-dipol), I (`I-buhar-basinci.md`: çekim zayıfladıkça buhar basıncı artar), K (viskozite ve sıcaklık; K senaryosu başka ajanca yazılıyor, `PLAN.md` bölüm 3'teki fikirlere dayanıldı: sıvı ısındıkça daha kolay akar).

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırların okunuşu ders yazılırken `speak` ile verilir ("dyn/cm" "din bölü santimetre", "°C" "derece", "H₂O" "su", "CH₃–CH₂–OH" "etil alkol").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Veri bir durumun içinde sunulur ("bir araştırmacı ölçtü").
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler (aynı sahnenin numaraları; başka sahne "sahne N, madde" diye anılır).
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir birkaç parçadan oluştuğu için 3–6. adımlar her parçada yinelenir.
- **Sürükle-bırak, eşleştirme ve sıralama sahneleri yok.** Motorda böyle çağrılar bulunmaz; "Dene" sahnelerinin sınıflandırma olanları **kart başına seçim** olarak kurulur (kit'teki `kartSecim`): kutular tahtada adlarıyla durur; kartlar sırayla öne çıkar (ortada büyür); öğrenci `c.choice` ile kartın kutusunu seçer; doğruysa kart küçülüp kutusuna oturur ve kartın geri bildirimi tahtada belirir; yanlışta ipucu çıkar ve kart ortada kalır. Her bölümde kartlar, her kartın doğru kutusu ve geri bildirimi yazılıdır. `tag` her yerde `'Sınıflandır'`. Benzetimde yalnızca `c.slider` ve `c.choice` kullanılır; kaydırıcılar kesikli konumludur (`step: 1`, `fmt` ile adlandırılmış), ara değer yoktur.
- Renkler tema boyunca aynıdır: çekme kuvveti yeşil, itme kırmızı, artı yük turuncu, eksi yük mavi. Bu konuda yük çizilmez, itme yoktur. **Kohezyon ve adezyon ikisi de çekmedir, ikisi de yeşildir;** ayrım yerleştirmeyle yapılır: kohezyon çizgileri sıvının molekülleri arasındadır ve yanında "kohezyon" etiketi durur; adezyon çizgileri sıvının molekülleri ile yüzeyin tanecikleri arasındadır ve yanında "adezyon" etiketi durur. Çizgi kalınlığı büyüklük sırasını gösterir (kalın = büyük); tahtaya kuvvet değeri yazılmaz.
- Moleküller nötr açık gri, yüzeyin (cam, yaprak, kumaş, yağlı kâğıt) tanecikleri nötr koyu gri; cıva atomları koyu gümüş gri. Mavi ve kırmızı bu konuda renk olarak sıvıya ya da yüzeye verilmez (mavi eksi yüke, kırmızı itmeye ayrılmıştır); kitaptaki mavi cam taneciği ve kırmızı su modeli yerine nötr tonlar kullanılır.
- Sayı: yalnızca kitaptaki değerler görünür. 25 °C'ta cıva 480, su 72 dyn/cm (L2 sahne 6); 20 °C'ta su 73, gliserin 63, etil alkol 22, n-hekzan 18 dyn/cm (L2 sahne 4). İki sıcaklık aynı tahtada karıştırılmaz (su için 72 ve 73 farklı sıcaklıklardandır). "dyn/cm" yalnızca verinin birimi olarak yazar, tanımlanmaz.
- Hatırla sorularının dayanağı: L1'den önceki ders K2 (sıcaklık ve viskozite) olduğu için bir soru oradan, biri G4'ten (su moleküllerinin kohezyonu hidrojen bağıdır); L2'de bir önceki ders L1, daha eski ders I2.

Çizim araçları (kit için; konunun araç dosyası `dersler/l-araclar.js`, `window.KIT_L`):

- `damlaYuzey(opts)`: yatay bir yüzey (cam, yaprak, kumaş, yağlı kâğıt; yüzeyin adı altında durur) ve üstünde yan görünüşte bir damla. Seçenekler: baskın kuvvet (`'kohezyon'`: yuvarlak damla; `'adezyon'`: yayılmış ince tabaka; `'x'`, `'y'`, `'z'`: L2 sahne 8'in üç damlası, Z en yuvarlak ve en yüksek, X yuvarlak, Y en yassı ve en geniş), sıvı (su, cıva), "büyüt" (damlanın yüzeyle buluştuğu yeri bir daire içinde alt mikro gösterir: yüzeyin tanecik dizisi, sıvının molekül ya da atomları, `kuvvetCizgisi`).
- `kuvvetCizgisi(a, b, {tur: 'kohezyon' | 'adezyon', kalinlik})`: iki tanecik arasına yeşil çizgi; yanına ilk görüldüğünde etiket yazar.
- `kuvvetCubuklari(adezyon, kohezyon)`: yan yana iki yeşil çubuk ("adezyon", "kohezyon"); boylar şematik; üstte hangisi büyükse küçük bir işaret. Değerler `'kucuk' | 'esit' | 'buyuk'` gibi kesikli (kaydırıcıya bağlanır).
- `tup(opts)`: kesit görünüşte dar cam tüp ve içindeki sıvının yüzeyi. Seçenekler: yüzey (`'icbukey'`, `'duz'`, `'disbukey'`), kap (tüp bir kaba daldırılmışsa kabın seviye çizgisi tüpten geçen ince çizgidir; tüpteki seviye bu çizginin üstünde, aynı hizada ya da altında), sıvı (su, cıva).
- `yuzeyMolekulu()`: sıvının kesiti; bir iç molekül ve bir yüzey molekülü işaretlenir (büyütülmüş, kalın çerçeve). İç molekülden altı eşit yeşil ok; yüzey molekülünden yalnızca yanlara ve alta oklar; yüzey molekülünde birleşke ok (kalın yeşil, aşağı) görünür; iç molekülde birleşke yerine küçük "0" işareti çıkar. Gör adımında yüzey molekülleri içeri çekilir ve yüzeydeki molekül sayısı azalır (şematik, sayı yazılmaz).
- `kartCevir(ön, arka)` (G konusundaki gibi): dört sıvı kartı; ön yüzü ad ve formül, arka yüzü yüzey gerilimi (dyn/cm, 20 °C) ve etkileşim satırı. Etkileşim satırında O–H bağları kalın çerçeveli, molekül çifti arasında yeşil çizgi (hidrojen bağında kalın, London'da ince).
- `kartSecim(kartlar, kutular)` (G konusundaki gibi).
- `cubuk4`: dört yatay çubuk, ortak ölçek, büyükten küçüğe sıralı, değer etiketli (I konusunun `cubuk` aracının dört çubuklu hâli).
- `kapliTup(sivi)`: iki kap yan yana (su ve cıva), her birine ince cam tüp daldırılmış; seviye ve yüzey eğimi sıvıya göre (su: tüpte kabın üstünde ve içbükey; cıva: tüpte kabın altında ve dışbükey). Kitaptaki görsele uygun şematik çizim yeterli.
- `bitkiSu()` ve `kanTupu()`: kök–gövde–yaprak şeması ile gövdenin içindeki ince borunun büyütülmüş kesiti (su molekülleri zincir, moleküller arası yeşil çizgi "kohezyon", boru duvarına yeşil çizgi "adezyon"); parmak ucundan ince tüple kan alma (tüp kana değince kan tüpte yükselir). Vektör şematik çizim yeterli; resim gerekmez.

## L1 · Kohezyon ve adezyon: ıslatır mı, ıslatmaz mı?

- **Fikir:** Sıvının kendi molekülleri arasındaki çekim (kohezyon) ile sıvının yüzeyin tanecikleriyle çekimi (adezyon) karşılaştırılır. Adezyon büyükse sıvı yüzeyde yayılır (ıslatır) ve kapta içbükey durur; kohezyon büyükse sıvı damla kalır (ıslatmaz) ve kapta dışbükey durur; eşitse yüzey düz kalır.
- **Giriş ekranı sorusu:** Yağmurluk ıslanmaz, pamuklu tişört ıslanır; fark suda mı, kumaşta mı?
- **Kaynak:** Ders kitabı s. 196 (kohezyon: aynı tür moleküllerin birbirine uyguladığı çekim; adezyon: farklı maddelerin tanecikleri arasındaki çekim; yapraktaki su damlası: yuvarlaklığı kohezyonu, yaprağa yapışması adezyonu gösterir), s. 198 (görsel: cam yüzeyde su ve cıva damlası; büyütmede cam, su ve cıva taneciklerinin dizilişi), s. 197 (görsel: tüpte su içbükey, cıva dışbükey), s. 201 (adezyon kohezyondan büyükse sıvı yayılır ve yüzeyi ıslatır; kohezyon büyükse damlacık kalır ve ıslatmaz; kapta kohezyon büyükse dışbükey, adezyon büyükse içbükey, eşitse düz), s. 201 Kontrol Noktası 2.12 (ördeğin tüyleri; ıslanmayan kıyafet), s. 199 soru 2 (yağlı kâğıt apolar bir yüzey olarak düşünülür). Suyun polar olduğu ve molekülleri arasında hidrojen bağı bulunduğu G ve E konularından hatırlanır.
- **Sınır:** Temas açısı, hidrofilik ve hidrofobik malzeme, süperhidrofobik yüzey yok (zenginleştirme). Yüzey gerilimi ve kılcallık L2'dedir; bu derste sayı ve "yüzey gerilimi" geçmez. "Yüzey gerilimi büyükse ıslatmaz" gibi bir kural verilmez: su da yüksek yüzey gerilimine karşın camı ıslatır, belirleyici olan adezyon ile kohezyonun karşılaştırmasıdır. Cıvanın metalik bağı anlatılmaz; cıva için "atomları arasındaki çekim" denir. "Eşit" durumunda damlanın şekli verilmez (kitap yazmaz); yalnızca kapta yüzeyin düz kalması verilir.
- **Güç kavramlar ve gösterimi:** (1) İki çekimin ayrımı: aynı damlada iki çeşit yeşil çizgi, biri sıvının içinde ("kohezyon"), biri sıvı ile yüzey arasında ("adezyon"). (2) "Kim baskın?": iki çubuk ve damla yan yana; çubuklardan biri uzayınca damla ya yayılır ya yuvarlak kalır; alt mikro büyütmede kalın ve ince çizgiler. (3) Ölçeksiz kuvvet karşılaştırması: sayısız değer yok, yalnızca "küçük / eşit / büyük" konumlu kaydırıcı. (4) Kapta yüzeyin eğriliği: üç tüp yan yana, içbükey, düz, dışbükey; altında çubuklar.
- **Hedeflenen yanılgı:** "Damla yuvarlak kalıyorsa sıvı ile yüzey arasında çekim yoktur" (yaprakta damla hem yuvarlaktır hem yapışır: adezyon vardır, kohezyon daha büyüktür).
- **Akılda kalıcı cümle:** Adezyon baskınsa sıvı yayılır, kohezyon baskınsa damla kalır.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Bir sıvı ısıtılırsa akışkanlığı nasıl değişir? **Artar; daha kolay akar** / Azalır / Değişmez. (K2) Yanlışta: "Sıcaklık artınca moleküller arası etkileşim zayıflar; sıvı daha kolay akar."
2. Su molekülleri arasındaki etkileşim hangisidir? **Hidrojen bağı** / London kuvveti / İyon-dipol. (G4) Yanlışta: "Su molekülünde O–H bağı var; moleküller arasında hidrojen bağı kurulur."

Sonra: "Bugün sıvıların yüzeylerle nasıl çekiştiğine bakacağız."

### Sahne 2 · Aynı su, iki kumaş

Tahta: iki kumaş şeridi yan yana, altlarında adları ("yağmurluk", "pamuklu tişört"); üstlerinde aynı boyda iki su damlası.

Anlatım:
1. Aynı su damlası iki kumaşa düşüyor: yağmurluk ve pamuklu tişört.

Tahmin (`tag: 'Tahmin et'`; gündelik sezgi): Damla hangi kumaşta yuvarlak kalır? **Yağmurlukta** / Pamuklu tişörtte / İkisinde de. Dayandığı anlatım: yok (yağmur altındaki gündelik gözlem). İpuçları: "Hangi kumaş seni yağmurda ıslatmaz?" · "Tişörte düşen damlaya ne olduğunu düşün."

Gör: yağmurlukta damla top gibi durur ve kayar; tişörtte damla kumaşa yayılır, yayıldığı yer koyulaşır.

Sonra:
2. Yağmurlukta damla yuvarlak kalır; kumaşı ıslatmaz.
3. Tişörtte damla yayılır; kumaşı ıslatır.
4. Aynı su iki kumaşta farklı davrandı; nedeni çekim kuvvetlerindedir.

### Sahne 3 · İki çekim: kohezyon ve adezyon

Tahta: bir yaprak üstünde su damlası; damla büyütülür: nötr gri su molekülleri, altında yaprağın koyu gri tanecik dizisi. Önce moleküller arasında yeşil çizgiler ("kohezyon"), sonra damlanın alt sırası ile yaprak arasında yeşil çizgiler ("adezyon") çizilir. Biten çizgi soluklaşır.

Anlatım:
1. Yaprağın üzerindeki su damlası yuvarlaktır ve yaprağa yapışır.
2. Aynı tür moleküllerin birbirini çekmesine kohezyon denir.
3. Farklı maddelerin tanecikleri arasındaki çekime adezyon denir.
4. Damlanın yuvarlak olması kohezyondan, yapışması adezyondan gelir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada iki satır; birincisi dolu: "damla yuvarlak → kohezyon"; ikincisi: "damla yaprağa yapışır → ?". Damlanın yaprağa yapışması hangi kuvvetten gelir? **Adezyon** / Kohezyon / İkisinden de değil. Dayandığı anlatım: 2–4. İpuçları: "Yaprak ile su farklı maddeler." · "Aynı tür moleküller arasındaki çekim kohezyondu."

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bir bal damlasının molekülleri birbirini çekiyor. Bu çekim hangisidir? **Kohezyon** / Adezyon / İkisi de. Dayandığı anlatım: 2–3. İpuçları: "Moleküllerin hepsi aynı maddeden." · "Farklı madde yok; yüzey de yok."

Gör: iki çeşit çizgi damla üzerinde birlikte durur; her çizginin ucunda hangi iki taneciğin çektiği belli.

Defter ("Kohezyon ve adezyon"): **Kohezyon: aynı tür moleküller arası. Adezyon: farklı madde tanecikleri arası.** Örnek: yapraktaki su damlası.

### Sahne 4 · Islatan ve ıslatmayan sıvı

Tahta: solda cam yüzey ve üstünde `kuvvetCubuklari` (iki çubuk: "adezyon" uzun, "kohezyon" kısa) ile yayılmış ince bir damla; yanında "ıslatır". Sağda aynı yüzey, çubuklar ters (kohezyon uzun) ve yuvarlak damla; yanında "ıslatmaz". Biten yarım soluklaşır.

Anlatım:
1. Adezyon kohezyondan büyükse sıvı yüzeyde yayılır.
2. Yayılan sıvı yüzeyi ıslatır.
3. Kohezyon adezyondan büyükse sıvı damlacık olarak kalır.
4. Damlacık kalan sıvı yüzeyi ıslatmaz.

Birlikte çöz (`tag: 'Birlikte çöz'`): cam yüzeyde yayılan bir su damlası; çubuklar boş. Su camda yayılıyor. Hangi kuvvet büyüktür? **Su ile cam arasındaki adezyon** / Su moleküllerinin kohezyonu / İkisi eşit. Dayandığı anlatım: 1–2. İpuçları: "Yayılan sıvıda hangi kuvvet baskındı?" · "Cam ile su farklı maddeler."

Gör (`damlaYuzey` büyüt): damlanın cama değdiği yer büyür: cam tanecikleri dizisi, su molekülleri; moleküller arasında ince "kohezyon", camla arasında kalın "adezyon" çizgileri.

Sonra:
5. Camda su molekülleri, birbirinden çok camın taneciklerine çekilir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Cıva cam yüzeyde yayılmayıp damla kalıyor. Hangisi doğrudur? **Cıva atomları arasındaki kohezyon, cam ile adezyondan büyüktür** / Cam ile cıva arasındaki adezyon, kohezyondan büyüktür / İkisi eşittir. Dayandığı anlatım: sahne 3, 2–3; bu sahne, 3–4. İpuçları: "Damla kalan sıvıda hangi kuvvet baskındı?" · "Cıva yüzeyi ıslatmıyor."

Gör: cıva için büyütme: koyu gümüş gri cıva atomları birbirine kalın çizgiyle, camın taneciklerine ince çizgiyle bağlı.

Sonra:
6. Cıva atomları birbirini, camın taneciklerinden daha çok çeker.
7. Islatmayan sıvıda da adezyon vardır; yalnızca kohezyondan küçüktür.

### Sahne 5 · Kapta yüzey: içbükey ve dışbükey

Tahta: dar cam tüp kesiti. Önce yüzey düz çizgi; sonra üç tüp yan yana, her birinin altında bir çubuk çifti: solda kohezyon uzun (yüzey dışa kavisli), ortada eşit (düz), sağda adezyon uzun (içe kavisli). Adlar hepsi birden değil, anlatım ilerledikçe yazılır: "dışbükey", "düz", "içbükey".

Anlatım:
1. Dar cam tüpte sıvının yüzeyi kenarlardan eğilir.
2. Kohezyon büyükse yüzey dışa doğru kavislenir: dışbükey.
3. Adezyon büyükse yüzey içe doğru kavislenir: içbükey.
4. Kuvvetler eşitse sıvı yüzeyi düz kalır.

Birlikte çöz (`tag: 'Birlikte çöz'`): iki tüp; cıva tüpü dolu ("dışbükey → kohezyon büyük"), su tüpü: yüzey içbükey, çubuklar boş. Su cam tüpte içbükey duruyor. Hangi kuvvet büyüktür? **Adezyon** / Kohezyon / İkisi eşit. Dayandığı anlatım: 2–3. İpuçları: "İçbükey, içe doğru kavis demekti." · "Cıvada kohezyon büyük, yüzey dışbükeydi."

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bir sıvı cam yüzeyde yayılıyor. Aynı sıvı cam tüpte nasıl durur? **İçbükey** / Dışbükey / Düz. Dayandığı anlatım: sahne 4, 1–2; bu sahne, 3. İpuçları: "Yayılan sıvıda hangi kuvvet baskın?" · "Adezyon büyükse yüzey içe kavislenir."

Gör: tüpteki sıvı yüzeyi içbükey olur; yanında yayılan damla.

Dene (`c.slider`, "Cam ile adezyon"; üç konum: "Küçük", "Kohezyonla eşit", "Büyük"; kohezyon sabit; `noWait` yönerge: "Adezyonu değiştir; damlaya ve tüpteki yüzeye bak."): üç panel: `kuvvetCubuklari` (kohezyon sabit orta boy, adezyon çubuğu kaydırıcıyla küçük/eşit/büyük), cam üstünde `damlaYuzey` ve `tup`. Konum "Küçük": damla yuvarlak ("ıslatmaz"), tüpte dışbükey. Konum "Büyük": damla yayılmış ("ıslatır"), tüpte içbükey. Konum "Kohezyonla eşit": tüpte düz yüzey; damla paneli silikleşir ve boş kalır (eşit durumunda damlanın şekli verilmez). "Devam", üç konum da görülünce açılır.

Defter ("Islatma ve yüzey"): **Adezyon büyükse sıvı yayılır, içbükey durur; kohezyon büyükse damla kalır, dışbükey durur.** Örnek: su camda, cıva camda.

### Sahne 6 · Bu hangisi?

Tahta: üç kutu: "Adezyon büyük", "Kohezyon büyük", "İkisi eşit". Altı kart sırayla ortaya gelir; her kartın küçük bir çizimi var. Doğru seçilen kart kutusuna oturur ve geri bildirimi altına düşer.

Anlatım:
1. Her olayda adezyon ile kohezyon karşılaştırılır.

Dene (kart başına seçim, `kartSecim`; `tag: 'Sınıflandır'`; seçenekler üç kutunun adı):
- "Su, cam yüzeyde yayılır." → **Adezyon büyük.** "Yayılan sıvıda adezyon baskındır."
- "Cıva, cam yüzeyde damla kalır." → **Kohezyon büyük.** "Damla kalan sıvıda kohezyon baskındır."
- "Suda yüzen ördeğin tüyleri ıslanmaz." → **Kohezyon büyük.** "Suyun kohezyonu, su ile tüy arasındaki adezyondan büyüktür."
- "Su, pamuklu tişörte yayılır ve kumaşı ıslatır." → **Adezyon büyük.** "Kumaş suyu kendine çeker; adezyon kohezyondan büyüktür."
- "Su, yağlı kâğıt üzerinde damlalar hâlinde durur." → **Kohezyon büyük.** "Yağlı kâğıt apolar bir yüzeydir; su ile adezyonu küçüktür."
- "Cam tüpte sıvının yüzeyi düz kalıyor." → **İkisi eşit.** "Kuvvetler eşitse yüzey düz kalır."

Dayandığı anlatım: sahne 4, 1–4; sahne 5, 2–4.

### Sahne 7 · Çıkarımını bilim insanlarınınkiyle karşılaştır

Tahta: üç sütunlu tablo: sıvı · yüzey (cam) · gözlem. Satırlar: su: "yayılır, tüpte içbükey"; cıva: "damla kalır, tüpte dışbükey". Tablo olduğu için 25 kelime sınırı aşılabilir (`DURUM.md`'ye yazılır). Soru çözülünce sağ yanda "Bilim insanları" başlığıyla üç satır belirir: "adezyon > kohezyon: yayılır, içbükey"; "kohezyon > adezyon: damla kalır, dışbükey"; "eşit: yüzey düz". Kuvvet işareti olarak yalnızca ">" ve "=" kullanılır.

Anlatım:
1. Su ve cıva gözlemlerinden ortak bir kural çıkaralım.

Soru (`tag: 'Sıra sende'`): İki gözlemden hangi kural çıkar? **Yayılan ve içbükey duran sıvıda adezyon, damla kalan ve dışbükey duran sıvıda kohezyon büyüktür** / Yayılan sıvıda kohezyon, damla kalan sıvıda adezyon büyüktür / İkisinde de kuvvetler hep eşittir. Dayandığı anlatım: sahne 4, 1–4; sahne 5, 2–3. İpuçları: "Su yayılıyordu; hangi kuvvet baskındı?" · "Cıva damla kalıyordu."

Gör: öğrencinin seçtiği kural, bilim insanlarının satırlarının yanına gelir; iki sütun yan yana, uyan satırlar işaretlenir.

Sonra:
2. Bilim insanları da aynı kurala varmıştır.
3. Kuvvetler eşitse yüzey düz kalır; kural bunu da kapsar.

### Sahne 8 · Başa dön: yağmurluk ve tişört

Tahta: iki kumaş yeniden; her birinin altında `kuvvetCubuklari`. Su aynı olduğu için "kohezyon" çubuğu iki yanda da aynı boyda; "adezyon" tişörtte uzun, yağmurlukta kısa.

Anlatım:
1. Su aynıdır; suyun kohezyonu iki kumaşta da aynıdır.
2. Değişen, kumaşla su arasındaki adezyondur.
3. Tişörtte adezyon büyüktür: su yayılır, kumaş ıslanır.
4. Yağmurlukta adezyon küçüktür: damla yuvarlak kalır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bir üretici ıslanmayan bir kıyafet tasarlıyor. Kumaş ile su arasındaki adezyon, suyun kohezyonuna göre nasıl olmalı? **Daha küçük** / Daha büyük / Eşit. Dayandığı anlatım: 3–4; sahne 4, 3–4. İpuçları: "Islatmayan sıvıda hangi kuvvet baskındı?" · "Su kumaşta yayılmasın istiyoruz."

Sonra:
5. Islanmayan kumaşta damla kalır; ıslanan kumaşta su yayılır.

### Çıkış soruları

1. Kohezyon nedir? **Aynı tür moleküllerin birbirini çekmesi** / Farklı maddelerin tanecikleri arasındaki çekim / Bir molekülün içindeki atomları tutan kovalent bağ. (sahne 3)
2. (yeni durum) Bir sıvı bir yüzeyde damlacıklar hâlinde kalıyor. Hangisi doğrudur? **Kohezyon adezyondan büyüktür; yüzey ıslanmaz** / Adezyon kohezyondan büyüktür; yüzey ıslanır / Kuvvetler eşittir. (sahne 4)
3. (yanılgı) Yaprağın üzerinde duran su damlası yuvarlaktır. Hangisi doğrudur? **Hem kohezyon hem adezyon vardır; kohezyon daha büyüktür** / Yalnızca kohezyon vardır; yaprakla çekim yoktur / Yalnızca adezyon vardır. (sahne 3, 4)
4. (yeni durum) Bir sıvı dar cam tüpte içbükey duruyor. Hangisi doğrudur? **Adezyon kohezyondan büyüktür** / Kohezyon adezyondan büyüktür / Kuvvetler eşittir. (sahne 5)
5. (yeni durum) Bir sıvı camda damla kalıyor, ama başka bir malzemede yayılıyor. Hangisi doğrudur? **Bu malzeme ile sıvı arasındaki adezyon, camdakinden büyüktür** / Sıvının kohezyonu bu malzemede küçülmüştür / Bu malzemede sıvıyla hiç adezyon yoktur. (sahne 6, 8)

Özet: Kohezyon aynı tür moleküller, adezyon farklı maddeler arasındaki çekimdir. · Adezyon büyükse sıvı yayılır ve içbükey durur. · Kohezyon büyükse damla kalır ve dışbükey durur. · **Adezyon baskınsa sıvı yayılır, kohezyon baskınsa damla kalır.**

## L2 · Yüzey gerilimi ve kılcallık

- **Fikir:** Sıvının yüzeyi, kohezyon yüzünden gergin bir zar gibi davranır: yüzey gerilimi kohezyonun sonucudur; kohezyon büyüdükçe yüzey gerilimi büyür. İnce tüpte adezyon yeterince büyükse sıvı kendiliğinden yükselir (kılcallık); suyun bitkide kökten yaprağa taşınması ve ince tüple kan alma bu iki özelliğe dayanır. Etkileşimi belirtilen bir sıvının yüzey gerilimi, kılcallığı, görünümü ve ıslatması tahmin edilir.
- **Giriş ekranı sorusu:** Bir böcek suyun üzerinde batmadan nasıl durur?
- **Kaynak:** Ders kitabı s. 196 (Etkinlik 2.27: yüzeyi gergin bir streç filme düşen nesneler gibi böcek su yüzeyinde batmadan durur; görsel: iç ve yüzey moleküllerine etkiyen çekim okları), s. 197 (ataşın yoğunluğu suyunkinden fazla olduğu hâlde yüzeyde kalması; 25 °C'ta cıva 480, su 72 dyn/cm; tüpte su içbükey, cıva dışbükey), s. 198 (görsel: su ve cıva dolu kaplara daldırılmış ince cam tüpler: tüpte suyun seviyesi kabın üstünde, cıvanın altında; görselden okundu), s. 199 (Etkinlik 2.29, kanıt kartları: su, etil alkol, n-hekzan, gliserin; formül, 20 °C'ta yüzey gerilimi 73, 22, 18, 63 dyn/cm ve etkileşimi gösteren molekül çifti görseli), s. 200 (yüzey gerilimi kohezyonun sonucudur; içteki molekül her yönden eşit çekilir, net kuvvet sıfırdır; yüzeydeki molekül yalnızca alttan ve yanlardan çekilir, net kuvvet sıfırdan büyüktür; yüzeydeki moleküller içeri girmeye çalışır, yüzey küçülür; yüzey gerilimi suyu dış kuvvetlere karşı dayanıklı kılar), s. 201 (kılcallık: ince tüpte adezyon yeterince büyükse sıvı kendiliğinden yükselir; adezyon kohezyondan zayıfsa az yükselir, hatta alçalır; kan alma; bitkide su molekülleri birbirine ve hücre duvarlarına yapışır), s. 202 (Kontrol Noktası 2.12 soru 2: X, Y, Z sıvılarının damla görüntüsü; biri polar, biri apolar, biri hidrojen bağı yapar). Kohezyon, adezyon, ıslatma ve içbükey–dışbükey L1'den; hidrojen bağı, London ve dipol-dipol G'den; çekim zayıfladıkça buhar basıncı artması I2'den hatırlanır.
- **Sınır:** Yüzey gerilimini etkileyen faktörler (sıcaklık, çözünen madde) M konusudur; bu derste yüzey gerilimi yalnızca "nedir ve kohezyonla ilişkisi" olarak geçer. Sayı yalnızca verinin kendisi olarak görünür; dyn/cm tanımlanmaz. Temas açısı, yüzey gerilimi için "enerji" açıklaması (s. 200'ün düşük enerjili hâl cümlesi), dik bırakılan ataşın neden battığı (kitap sorar, cevabı yok), kâğıt havlunun suyu çekmesi (Kontrol Noktası 2.12 soru 1 b; cevabı yazılı değil), çentikli gül deneyi (s. 202 ç–d'nin gül sorusu), cıvanın metal yüzeyi ıslatması ve metalik bağı (Kontrol Noktası 2.12 soru 1 d) alınmaz. Suyun canlılardaki rolü tek sahne, kitabın yazdığı kadar (karar 17).
- **Güç kavramlar ve gösterimi:** (1) Yüzeydeki molekülün net kuvveti: iki molekül büyütülür, biri sıvının içinde (altı eşit ok, birleşke sıfır), biri yüzeyde (üstte ok yok, birleşke içe); yüzey molekülleri içeri çekilince yüzey daralır. (2) Kılcallık: aynı tüp iki kaba daldırılır; suda seviye yükselir, cıvada alçalır; yanında adezyon ve kohezyon çubukları. (3) Yüzey gerilimi değerinin kohezyonla ilişkisi: dört kart (kart çevir) ve büyükten küçüğe sıralı dört çubuk; etkileşim türü kartın arkasında. (4) Bitkide su: ince boru içinde molekül zinciri, molekül–molekül ve molekül–duvar çizgileri. (5) Tahmin tablosu: aynı yüzeyde üç damla.
- **Hedeflenen yanılgı:** "Ataş ya da böcek sudan hafif olduğu için batmaz" (ataşın yoğunluğu suyunkinden fazladır; yüzeyi gergin tutan yüzey gerilimidir) ve "ince tüpte her sıvı yükselir" (cıva alçalır).
- **Akılda kalıcı cümle:** Yüzeyi kohezyon gerer; ince boruda sıvıyı adezyon tırmandırır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Cam yüzeyde yayılan bir sıvıda hangi kuvvet baskındır? **Adezyon** / Kohezyon / İkisi eşit. (L1) Yanlışta: "Yayılan sıvıda yüzeyle çekim, kendi içindeki çekimden büyüktür: adezyon baskındır."
2. Moleküller arası çekim zayıfladıkça sıvının buhar basıncı nasıl değişir? **Artar** / Azalır / Değişmez. (I2) Yanlışta: "Çekim zayıflayınca buhar fazına geçen molekül artar; buhar basıncı yükselir."

Sonra: "Bugün sıvı yüzeyinin neden gergin durduğuna bakacağız."

### Sahne 2 · Böcek ve ataş

Tahta: su yüzeyi yan görünüşte. Solda bir böceğin ayağı: yüzey ayağın altında hafifçe çukurlaşır, böcek batmaz. Sağda bir ataş: yüzeyde yatay durur; yanında "yoğunluk: sudan fazla". Sonra yüzey, gergin bir film çizgisi olarak vurgulanır.

Anlatım:
1. Bir böcek, suyun yüzeyinde batmadan durabilir.
2. Suya dikkatle bırakılan ataş da yüzeyde kalır.
3. Ataşın yoğunluğu suyunkinden fazladır; yine de batmaz.
4. Su yüzeyi, gergin bir streç film gibi davranır.
5. Bu gerginliğe yüzey gerilimi denir.

### Sahne 3 · Yüzey gerilimi nereden gelir?

Tahta: sıvının kesiti (`yuzeyMolekulu`), üstte yüzey çizgisi. İki molekül büyütülür: biri sıvının içinde, biri yüzeyde. Önce yalnızca iç molekül ve çevresine altı eşit yeşil ok; sonra yüzey molekülü ve ona etkiyen oklar. Okların yanında "kohezyon" etiketi.

Anlatım:
1. Sıvının içindeki molekül, her yönden eşit çekilir.

Birlikte çöz (`tag: 'Birlikte çöz'`): iç molekül; yanında "net kuvvet: ?". İçteki moleküle etki eden net kuvvet nasıl? **Sıfır; çekimler birbirini dengeler** / Yukarı yönlü / Aşağı yönlü. Dayandığı anlatım: 1 (eşit çekimler dengelenir; A1'deki net kuvvet kuralı). İpuçları: "Altı yönde de eşit çekim var." · "Eşit çekimler birbirini dengeler; bağ da böyle kurulmuştu."

Sonra:
2. Yüzeydeki molekülün üstünde sıvı molekülü yoktur.
3. Yüzeydeki molekül yalnızca yanlardan ve alttan çekilir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Yüzeydeki molekülün net kuvveti hangi yöndedir? **Sıvının içine doğru** / Yukarı doğru / Net kuvvet sıfırdır. Dayandığı anlatım: 2–3. İpuçları: "Üstten çekim yok; alttan ve yanlardan var." · "Yan çekimler birbirini dengeler; alttaki kalır."

Gör: yüzey molekülleri içeri çekilir; yüzeyde kalan molekül sayısı azalır, yüzey çizgisi kısalır.

Sonra:
4. Yüzeydeki moleküller içeri girmeye çalışır; yüzey küçülür.
5. Yüzey gerilimi, kohezyonun doğrudan sonucudur.
6. Gergin yüzey, suyu dış kuvvetlere karşı dayanıklı yapar.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Yoğunluğu sudan fazla olan ataş, suda neden batmadan durur? **Yüzey gerilimi suyun yüzeyini dış kuvvetlere dayanıklı yapar** / Ataş sudan hafif olduğu için / Yüzeydeki moleküller dışa doğru çekildiği için. Dayandığı anlatım: sahne 2, 3; bu sahne, 3–6. İpuçları: "Ataşın yoğunluğu sudan fazlaydı." · "Yüzeydeki molekülün net kuvveti içe doğruydu."

Defter ("Yüzey gerilimi"): **Yüzey gerilimi kohezyonun sonucudur; yüzey küçülmeye çalışır.** Örnek: su yüzeyinde ataş.

### Sahne 4 · Dört sıvının yüzey gerilimi

Tahta: dört kart yan yana (`kartCevir`): önü sıvının adı ve formülü (su H₂O; etil alkol CH₃–CH₂–OH; n-hekzan CH₃–CH₂–CH₂–CH₂–CH₂–CH₃; gliserin CH₂–CH–CH₂ ve altında OH OH OH). Çevrilince arka yüzde "20 °C · yüzey gerilimi (dyn/cm)": 73, 22, 18, 63. Dört kart çevrilince alta `cubuk4`: büyükten küçüğe su, gliserin, etil alkol, n-hekzan.

Anlatım:
1. Bir araştırmacı dört sıvının yüzey gerilimini 20 °C'ta ölçtü.
2. Su 73, gliserin 63, etil alkol 22, n-hekzan 18 dyn/cm çıktı.
3. Yüzey gerilimi kohezyonun sonucudur.
4. Yüzey gerilimi büyük olan sıvıda kohezyon da büyüktür.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada sıralı iki satır: "su · 73 · kohezyon: en büyük"; "gliserin · 63 · kohezyon: ?". Gliserinin kohezyonu suyunkine göre nasıl? **Daha küçük** / Daha büyük / Aynı. Dayandığı anlatım: 2, 4. İpuçları: "63 ile 73'ü karşılaştır." · "Yüzey gerilimi küçükse kohezyon da küçüktür."

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Etil alkol ile n-hekzandan hangisinin molekülleri birbirini daha çok çeker? **Etil alkol** / n-hekzan / İkisi eşit. Dayandığı anlatım: 2, 4. İpuçları: "22 ile 18'i karşılaştır." · "Yüzey gerilimi büyük olanda kohezyon büyüktür."

Gör: dört çubuk soldan sağa büyükten küçüğe dizilir; çubukların üstünde "kohezyon" oku, en büyükten en küçüğe.

### Sahne 5 · Etkileşim türü ve kohezyon

Tahta: sahne 4'ün dört kartı; arka yüzlerinde "moleküller arası etkileşim" satırı: her kartta iki molekülün formülünde O–H bağları kalın çerçeveli; su, etil alkol ve gliserinde molekül çifti arasında kalın yeşil çizgi ("hidrojen bağı"); n-hekzanda ince yeşil çizgi ("London"). Altta yine `cubuk4` (soluk).

Anlatım:
1. Su, etil alkol ve gliserinin moleküllerinde O–H bağı vardır.
2. Bu üç sıvının molekülleri arasında hidrojen bağı kurulur.
3. n-hekzan apolardır; moleküller arasında yalnızca London kuvveti vardır.

Soru (`tag: 'Sıra sende'`): Moleküller arasında yalnızca London kuvveti olan n-hekzanın kohezyonu, hidrojen bağlı üç sıvıya göre nasıl? **Daha küçüktür** / Daha büyüktür / Aynıdır. Dayandığı anlatım: sahne 4, 2–4; bu sahne, 2–3. İpuçları: "n-hekzanın yüzey gerilimi en küçüktü." · "Yüzey gerilimi küçükse kohezyon da küçüktür."

Gör: dört kartın etkileşim çizgileri çubukların yanına gelir; en kalın çizgiler en uzun çubuklarda, en ince çizgi en kısa çubukta görünür.

Sonra:
4. Moleküller arası etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar.

Defter ("Etkileşim ve yüzey gerilimi"): **Etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar.** Örnek: su > n-hekzan.

### Sahne 6 · Kılcallık: su yükselir, cıva alçalır

Tahta: iki kap yan yana (`kapliTup`): solda su, sağda cıva; her birine ince bir cam tüp daldırılmış, başlangıçta tüpte seviye kabınkine eşit. Üstte iki etiket: "su · 25 °C · 72 dyn/cm", "cıva · 25 °C · 480 dyn/cm". Önce yalnızca etiketler; sonra tüpler.

Anlatım:
1. Cıvanın yüzey gerilimi 25 °C'ta 480 dyn/cm'dir.
2. Suyun yüzey gerilimi ise 72 dyn/cm'dir.
3. Cıvanın atomları arasındaki çekim, suyunkinden çok büyüktür.
4. Cam yüzeyde su yayılır; cıva damla kalır.

Gör: tüpte suyun seviyesi kabın seviyesinin üstüne çıkar, yüzey içbükeydir; cıvanın seviyesi kabın altına iner, yüzey dışbükeydir. Yanlarında adezyon ve kohezyon çubukları (suda adezyon, cıvada kohezyon uzun).

Sonra:
5. İnce tüpte su kendiliğinden yükselir; cıva ise alçalır.
6. İnce tüpte adezyon yeterince büyükse sıvı kendiliğinden yükselir.
7. Bu olaya kılcallık denir.
8. Adezyon kohezyondan zayıfsa sıvı çok az yükselir ya da alçalır.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada iki satır; birincisi dolu: "su tüpte yükselir → adezyon büyük"; ikincisi: "cıva tüpte alçalır → ?". Cıva tüpte alçalıyor. Hangi kuvvet büyüktür? **Kohezyon** / Adezyon / İkisi eşit. Dayandığı anlatım: 4, 6–8. İpuçları: "Adezyon büyük olsaydı sıvı yükselirdi." · "Cıva camda yayılmıyordu."

Dene (`c.slider`, "Sıvı"; iki konum: "Su", "Cıva"; `noWait` yönerge: "Sıvıyı değiştir; tüpteki seviyeye ve yüzeyin eğimine bak."): `kapliTup` sıvıya göre değişir; yanında adezyon ve kohezyon çubukları, tüpün yüzeyi (içbükey ya da dışbükey) ve yazı: "tüpte yükselir" ya da "tüpte alçalır". Yüzey gerilimi etiketi sıvıya göre 72 ya da 480 dyn/cm (başka değer yok). "Devam", iki konum da görülünce açılır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bir sıvı ince cam tüpte kendiliğinden yükseliyor. Yüzeyi tüpte nasıl durur? **İçbükey** / Dışbükey / Düz. Dayandığı anlatım: 6; sahne 5 (L1), 3. İpuçları: "Sıvı yükseliyorsa hangi kuvvet büyük?" · "Adezyon büyükse yüzey içe kavislenir."

Defter ("Kılcallık"): **İnce tüpte adezyon büyükse sıvı yükselir: kılcallık.** Örnek: su cam tüpte.

### Sahne 7 · Suyun canlılardaki rolü

Tahta (tek sahne): solda parmak ucundan kan alma: ince bir tüp (`kanTupu`), tüpün ucu kana değince kan tüpte yükselir. Sağda `bitkiSu`: kök, gövde, yaprak; gövdenin bir parçası büyütülür: ince boruda su molekülleri zinciri; moleküller arasında yeşil çizgi ("kohezyon"), moleküller ile boru duvarı arasında yeşil çizgi ("adezyon"). Öğe sayısı 12'yi geçmez.

Anlatım:
1. Sağlık görevlisi, parmağından kanı ince bir tüple alır.
2. Tüpün ucu kana değince kan tüpe kılcallıkla çıkar.
3. Aynı güç suyun bitkide kökten yaprağa taşınmasında da rol oynar.
4. Su molekülleri birbirine ve hücre duvarlarına yapışır.
5. Kohezyon ve adezyon, suyu yer çekimine karşı yapraklara çıkarır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bitkide su moleküllerinin hücre duvarlarına tutunmasını hangi kuvvet sağlar? **Adezyon** / Kohezyon / Yüzey gerilimi. Dayandığı anlatım: 4–5; sahne 3, 2–3 (L1). İpuçları: "Su ile hücre duvarı farklı maddeler." · "Aynı tür moleküller arasındaki çekim kohezyondu."

Sonra:
6. Suyun bu özellikleri bitkinin hayatta kalmasını sağlar.

### Sahne 8 · Etkileşimi bilinen sıvıyı tahmin et

Tahta: yatay bir cam yüzey; üstünde eşit hacimli üç damla (`damlaYuzey`, `'x'`, `'y'`, `'z'`): X yuvarlak, Y en yassı ve geniş, Z en yuvarlak ve en yüksek. Altlarında harfler. Üstte tek satır: "biri polar · biri apolar · biri hidrojen bağı yapar". Altta üç kutu: "X", "Y", "Z".

Anlatım:
1. Eşit hacimli X, Y, Z sıvıları aynı cam yüzeye damlatıldı.
2. Biri polar, biri apolar, biri hidrojen bağı kurar.
3. Damla ne kadar yuvarlaksa, sıvının kohezyonu o kadar baskındır.
4. Damla ne kadar yayılırsa, adezyon o kadar baskındır.

Dene (kart başına seçim, `kartSecim`; `tag: 'Sınıflandır'`; seçenekler üç kutunun adı: X, Y, Z; yedi kart):
- "Yüzeyi en çok ıslatır." → **Y.** "En çok yayılan damlada adezyon baskındır."
- "Molekülleri arasında hidrojen bağı vardır." → **Z.** "En yuvarlak damla en büyük kohezyonu gösterir; en güçlü etkileşim hidrojen bağıdır."
- "Molekülleri arasında yalnızca London kuvveti vardır." → **Y.** "Kohezyonu en küçük sıvıda etkileşim en zayıftır."
- "Cam tüpte içbükey durur." → **Y.** "Adezyonu baskın sıvı tüpte içbükey durur."
- "Yüzey gerilimi en büyüktür." → **Z.** "Kohezyonu en büyük sıvıda yüzey gerilimi de en büyüktür."
- "Su yüzeyinde yürüyen bir böcek en kolay bunda yürür." → **Z.** "Yüzey gerilimi en büyük sıvının yüzeyi en dayanıklıdır."
- "Molekülleri arasında dipol-dipol etkileşimi vardır." → **X.** "Biri hidrojen bağlı, biri apolar; kalan polar sıvı X'tir."

Dayandığı anlatım: sahne 3, 4–6; sahne 4, 4; sahne 5, 4; sahne 6, 6–8; bu sahne, 1–4 (ve G konularındaki etkileşim bilgisi).

Gör: kartlar yerleşince tahtada tablo kurulur (tablo olduğu için 25 kelime sınırı aşılabilir; `DURUM.md`'ye yazılır): sütunlar X · Y · Z; satırlar: etkileşim (dipol-dipol · London · hidrojen bağı); kohezyon (orta · en küçük · en büyük); yüzey gerilimi (orta · en küçük · en büyük); adezyon, cam ile (orta · en büyük · en küçük); cam üstünde (Y ile Z arasında · yayılır · yuvarlak kalır); tüpte (Y ile Z arasında · içbükey · dışbükey); ince tüpte (Y ile Z arasında · yükselir · az yükselir ya da alçalır). Hücreler kartlar yerleştikçe dolar.

Sonra:
5. Etkileşim güçlüyse kohezyon ve yüzey gerilimi büyüktür.

### Çıkış soruları

1. Yüzey gerilimi hangi kuvvetin sonucudur? **Kohezyon** / Adezyon / Yer çekimi. (sahne 3)
2. (yanılgı) Hangisi doğrudur? **Yüzey gerilimi, sudan yoğun bir nesneyi de yüzeyde tutabilir** / Su yüzeyinde yalnızca sudan hafif nesneler durabilir / Yüzey gerilimi yalnızca böcekler için vardır. (sahne 2, 3)
3. (yeni durum) K sıvısının molekülleri arasında hidrojen bağı, L sıvısının moleküllerinde yalnızca London kuvveti var. Hangisinin yüzey gerilimi büyüktür? **K'nin** / L'nin / İkisinin eşittir. (sahne 5)
4. (yeni durum) Bir sıvı ince cam tüpte kabın seviyesinin altına iniyor. Hangisi doğrudur? **Kohezyon, adezyondan büyüktür** / Adezyon, kohezyondan büyüktür / Kuvvetler eşittir. (sahne 6)
5. (yeni durum) Bir böcek 20 °C'ta n-hekzan (18 dyn/cm) ve su (73 dyn/cm) yüzeylerinde yürümeye çalışıyor. Hangisinde daha kolay yürür? **Suda** / n-hekzanda / İkisinde aynı. (sahne 3, 4)

Özet: Yüzey gerilimi kohezyonun sonucudur; yüzey küçülmeye çalışır. · Etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar. · İnce tüpte adezyon büyükse sıvı yükselir. · **Yüzeyi kohezyon gerer; ince boruda sıvıyı adezyon tırmandırır.**

## L3 · Konu tekrarı: Adezyon ve kohezyon (`l3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): dört kural tahtada sırayla toplanır, her biri küçük çizimiyle (iki çeşit yeşil çizgili damla · içbükey, düz, dışbükey üç tüp · yüzey molekülü ve içe doğru ok · ince tüpte yükselen su) ve deftere düşer; biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Kohezyon aynı tür moleküller, adezyon farklı maddeler arasındaki çekimdir.
3. Adezyon büyükse sıvı yayılır; kohezyon büyükse damla kalır.
4. Adezyon büyükse yüzey içbükey, kohezyon büyükse dışbükey durur.
5. Yüzey gerilimi kohezyonun sonucudur; etkileşim güçlendikçe artar.
6. İnce tüpte adezyon büyükse sıvı kendiliğinden yükselir.

Sorular (`quiz`, karışık sırada):

1. Bir sıvı camın üzerinde yayılıyor. Aynı sıvı dar cam tüpte nasıl durur? **İçbükey** / Dışbükey / Düz. — L1
2. Yüzeydeki bir sıvı molekülünün net kuvveti hangi yöndedir? **Sıvının içine doğru** / Yukarı doğru / Sıfırdır. — L2
3. (yanılgı) Yaprağın üzerindeki su damlası yuvarlaktır. Hangisi doğrudur? **Yaprakla adezyon vardır; kohezyon daha büyüktür** / Yaprakla hiç çekim yoktur / Yalnızca adezyon vardır. — L1
4. K sıvısının molekülleri arasında hidrojen bağı, T sıvısının moleküllerinde yalnızca London kuvveti var. Hangisinin yüzey gerilimi büyüktür? **K'nin** / T'nin / İkisinin eşittir. — L2
5. Bir sıvı ince cam tüpte kendiliğinden yükseliyor. Hangisi doğrudur? **Cam ile adezyon yeterince büyüktür** / Sıvının kohezyonu adezyondan büyüktür / Sıvı camı ıslatmaz. — L2
6. Bir üretici su geçirmeyen bir kumaş yapıyor. Kumaş ile su arasındaki adezyon nasıl olmalı? **Suyun kohezyonundan küçük** / Suyun kohezyonundan büyük / Suyun kohezyonuna eşit. — L1
7. Cıva cam yüzeyde damla kalıyor. Aynı cıva ince cam tüpe daldırılırsa tüpte nasıl davranır? **Kabın seviyesinin altına iner** / Kabın seviyesinin üstüne çıkar / Kabın seviyesinde kalır. — L1, L2
8. Bitkinin hücre duvarlarına yapışan su molekülleri arasındaki çekim hangisidir? **Adezyon** / Kohezyon / İyon-dipol. — L2

Akılda kalıcı cümle: Aynı tür çeker, farklı maddeyle çeker; hangisi baskınsa sıvının davranışını o belirler.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.12) | Karşılığı |
|---|---|
| a) Aynı ya da farklı etkileşimlere sahip sıvıların özellikleri ile ilgili farkları ortaya koyar | L1 sahne 4–6 (su, cıva, yağlı kâğıt ve kumaşta farklı davranış); L2 sahne 4–5 (dört sıvı), sahne 6 (su ve cıva), sahne 8 (hidrojen bağlı, polar, apolar sıvı) |
| b) Etkileşimler ile sıvıların özellikleri arasındaki ilişkiyi gözlem verileri ve hazır veri setiyle belirler | L1 sahne 4–5, 7 (su ve cıva gözlemleri; kural çıkarma); L2 sahne 4–5 (yüzey gerilimi verileri ve etkileşim türü), sahne 6 (kılcallık gözlemi), sahne 8 |
| c) Çıkarımlarını bilim insanlarının çıkarımları ile karşılaştırır | L1 sahne 7 (öğrencinin seçtiği kural ile bilim insanlarının üç satırı yan yana) |
| Uygulama: gözlem ve veri setinden adezyon, kohezyon, yüzey gerilimi, kılcallık, ıslatmazlık niteliklerini fark etme | L1 sahne 3–4; L2 sahne 2–6 |
| Uygulama: farklı sıvıların belirli sıcaklıktaki yüzey gerilimi verileri ve alt mikro gösterimleri | L2 sahne 4–5 (dört kart: değer ve molekül çifti), sahne 6 (25 °C'ta cıva ve su; büyütmede cam, su, cıva: L1 sahne 4) |
| Uygulama: adezyon-kohezyon ile yüzey gerilimi ilişkisi | L2 sahne 3–5 |
| Uygulama: adezyon-kohezyon ile kılcallık (kapiler etki) ilişkisi | L2 sahne 6 |
| Uygulama: adezyon-kohezyon ile içbükey-dışbükey görünüm ilişkisi | L1 sahne 5; L2 sahne 6, 8 |
| Uygulama: adezyon-kohezyon ile yüzeyi ıslatma/ıslatmama ilişkisi | L1 sahne 4, 6, 8; L2 sahne 8 |
| Uygulama: suyun organizmalardaki hayati rolü; adezyon-kohezyon, kılcallık, yüzey gerilimiyle ilişkilendirme | L2 sahne 7 (kan alma, bitkide su taşınması; yüzey gerilimi böcek ve ataş: sahne 2–3) |
| Uygulama: tanecikler arası etkileşim kuvveti belirtilen sıvılar için boşluk doldurma (yüzey gerilimi, adezyon-kohezyon, kılcallık, görünüm, ıslatma) | L2 sahne 8 (tahmin tablosu; kart başına seçim) |
| Köprü kurma: yağmurluk ve ıslanan malzemeler | L1 giriş sorusu, sahne 2, 6, 8 |
| Köprü kurma: yapraktaki su damlasının küre oluşturması | L1 sahne 3 |
| Köprü kurma: böceğin su üzerinde batmadan durması | L2 giriş sorusu, sahne 2–3 |
| Köprü kurma: bitkilerin köklerinden yapraklarına su taşıması | L2 sahne 7 |
| Anahtar kavramlar: adezyon kuvveti, kohezyon kuvveti | L1 sahne 3–6 |
| Anahtar kavramlar: kılcallık (kapiler etki), yüzey gerilimi | L2 sahne 3, 6 (yüzey geriliminin etkileyen faktörleri M konusudur) |
| Konu tekrarı | L3 |

Fazla olan: (1) Ördeğin tüyleri ve ıslanmayan kıyafet (L1 sahne 6, 8): kitabın Kontrol Noktası 2.12 sorularıdır (s. 201); program ıslatmazlığı ve yağmurluğu anar, ördek ve kıyafet kitaptan gelir. (2) Yağlı kâğıt örneği (L1 sahne 6): kitap s. 199 soru 2; program anmaz, kitabın sorusudur, "apolar yüzey" kitabın verdiği düşünce. (3) "Damla ne kadar yuvarlaksa kohezyon o kadar baskındır" ve "ne kadar yayılırsa adezyon o kadar baskındır" cümleleri (L2 sahne 8): kitap s. 201 yalnızca iki uçlu kuralı verir (büyükse yayılır / büyükse damla kalır); karşılaştırmalı biçimi kitabın s. 202 sorusu (a ve b) gerektirir. (4) Böceğin n-hekzanda ve suda yürümesi (L2 çıkış sorusu 5): kitabın s. 202 ç sorusunun uyarlaması. Eksik olan: öğrencinin kendi gözlemini yapması (damla, ataş, kılcal tüp deneyleri), yazılı açıklamalar, sınıf arkadaşlarıyla paylaşım ve kâğıt havlu ile gül örnekleri (hepsi `site dışı (sınıfta yapılır)`; kâğıt havlu ve gül kitapta yanıtsız).

## Raporda bildirilecekler (ana oturum için)

Bu bölüm yazarın notudur; ders yazılırken öğrenciye gösterilmez.

- **Ders listesi:** L1 `l1-kohezyon-adezyon` (8 sahne); L2 `l2-yuzey-gerilimi-kilcallik` (8 sahne); L3 `l3-tekrar` (1 sahne + 8 soru).
- **`PLAN.md` bölüm 8'de olmayan, kitaptan alınan bilgiler:** (1) s. 196: Etkinlik 2.27'de yüzeyi gergin bir streç filme düşen nesneler gibi böceğin batmadan durması; görselde iç ve yüzey molekülüne etkiyen çekim okları. (2) s. 197: ataşın yoğunluğunun suyunkinden fazla olduğu; ataşın yüzeyde durduğu. (3) s. 198: görselde kaplara daldırılmış ince tüplerde suyun seviyesinin kabın üstünde, cıvanın altında olduğu (metinde yazılı değil, görselden okundu; s. 201 metni "alçalma bile gözlenebilir" ile uyumlu). (4) s. 199: dört kanıt kartı ve formülleri (gliserin CH₂–CH–CH₂ ve üç OH; etil alkol CH₃–CH₂–OH; n-hekzan CH₃–CH₂–CH₂–CH₂–CH₂–CH₃). (5) s. 200: yüzey gerilimi açıklamasının ayrıntısı (içteki molekülün net kuvvetinin sıfır, yüzeydekinin sıfırdan büyük olması; "suyu dış kuvvetlere karşı dayanıklı hâle getirir"; düşük enerjili hâl cümlesi alınmadı). (6) s. 201: "adezyon kohezyondan zayıfsa sıvı çok az yükselir hatta alçalma gözlenebilir"; kılcallığın "ayrıca su molekülleri arasındaki etkileşimlere (kohezyon) bağlı" olduğu; kanın kılcal hareketle ince tüpe çekilmesi; bitkide su moleküllerinin birbirine ve hücre duvarlarına yapışması; Kontrol Noktası 2.12'nin ördek ve kıyafet sorusu. (7) s. 202: X, Y, Z damlaları ve soruları (a–d); damla biçimi görselden okundu (Z en yuvarlak ve yüksek, X yuvarlak, Y en yassı ve geniş).
- **`PLAN.md` bölüm 8 ile kitap arasındaki tutarsızlıklar:** (1) Bölüm 8 "kılcallık: ince tüpte adezyon yeterince büyükse sıvı yükselir (s. 201)" der; kitap ayrıca kılcallığın kohezyona da bağlı olduğunu yazar (s. 201). Derste yalnızca adezyon koşulu ve "zayıfsa az yükselir ya da alçalır" cümlesi verildi, kohezyonun payı ayrıca anlatılmadı. (2) Bölüm 8 su için "72 dyn/cm" (25 °C, s. 197–198) ve "73" (20 °C, s. 199) der; kitapta iki değer farklı sıcaklıktadır, çelişki değildir; derste iki sıcaklık ayrı sahnelerde ve hep sıcaklığıyla verildi. (3) Kitap s. 198 soru 2 "yüzey gerilimi fazla olan sıvıların kohezyonu mu adezyonu mu daha fazladır?" diye sorar; suyun yüzey gerilimi de yüksektir ama camı ıslatır (adezyon baskın). Bu yüzden derste "yüzey gerilimi büyük olan sıvı ıslatmaz" kuralı verilmedi; yüzey gerilimi yalnızca kohezyonun büyüklüğü ile ilişkilendirildi, ıslatma adezyon ile kohezyonun karşılaştırmasına bırakıldı.
- **Kitapta bulunamadığı için ya da cevabı olmadığı için yazılmayanlar:** (1) Kontrol Noktası 2.12 soru 1 b (kâğıt havlu), s. 197 soru 3 (dik ataşın batması), s. 202 ç–d'nin gül sorusu: kitapta cevap anahtarı yok; ders bunlara cevap uydurmadı. (2) "Eşit" durumunda damlanın şekli ve ıslatma durumu (kitap yalnızca kapta yüzeyin düz kalmasını yazar). (3) Kitap s. 199'daki etkileşim türleri yazıyla verilmemiştir; kartlarda yalnızca molekül çiftleri ve kesikli çizgiler vardır. Su, etil alkol ve gliserin için "hidrojen bağı" G4'ün O–H kuralından; n-hekzan için "apolar, yalnızca London" formülden (yalnızca C–H ve C–C) çıkarıldı; hekzanın apolar olduğu kitapta yazılı değil ve E konusunun iki ölçütüyle çıkmaz (merkez atomu yok), ders bunu bilgi olarak verir. Ana oturum bu satırı onaylamalı. (4) Etil alkolün yüzey gerilimi (22) hidrojen bağı kurmasına karşın n-hekzana (18) çok yakındır; kitap açıklamaz. Derste etil alkol yalnızca "hidrojen bağlı sıvıların hepsi n-hekzandan büyük" ve sıralama sorularında kullanıldı; "hidrojen bağı sayısı arttıkça yüzey gerilimi artar" gibi bir kural verilmedi (su 73, gliserin 63 ile de uyuşmaz). Ana oturum isterse etil alkol kartı çıkarılabilir. (5) s. 200'deki "düşük enerjili hâl" cümlesi programda yok, alınmadı.
- **Programa göre kuşkulu içerik:** (1) L2 sahne 8'in "damla ne kadar yuvarlaksa kohezyon o kadar baskındır" cümlesi kitabın uçlu kuralının karşılaştırmalı genişletmesidir; temas açısı gibi bir ölçüye gitmeden yalnızca damlanın yuvarlaklığı üzerinden verildi. (2) X, Y, Z için etkileşim atamasının (en yuvarlak damla hidrojen bağı; en yassı damla apolar; ortadaki polar) kitapta cevabı yoktur: kitap yalnızca "biri polar, biri apolar, biri hidrojen bağı yapar" der. Atama damla görselinden ve "etkileşim güçlendikçe kohezyon büyür" kuralından çıkarıldı; London ve dipol-dipol büyüklük aralıkları kitapta çakışır (Tablo 2.5), bu yüzden atama programın kendi sorusunun beklediği yönde bir çıkarımdır. X için kılcallık, tüpte görünüm ve ıslatma yazılmadı ("Y ile Z arasında"). (3) Yüzey gerilimi bu konuda yalnızca "kohezyonun sonucu" olarak anlatıldı; sıcaklık ve çözünen madde M'ye bırakıldı.
- **Dersin gerektireceği yeni çizim araçları (kit):** yukarıda "Çizim araçları" bölümündedir; özet: `damlaYuzey` (yuvarlak, yayılmış, X–Y–Z damlaları; alt mikro büyütme), `kuvvetCizgisi`, `kuvvetCubuklari`, `tup` ve `kapliTup`, `yuzeyMolekulu`, `cubuk4`, `bitkiSu`, `kanTupu`; G'den `kartCevir` ve `kartSecim`, I'den `cubuk` yeniden kullanılır.
