# Senaryolar — Konu M · Yüzey gerilimi

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.13, `../PLAN.md` bölüm 3 (M1, M2), bölüm 7 (karar 2, 3, 13, 15) ve bölüm 8 ("M · Yüzey gerilimi"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir. Temanın son konusudur; M3 temanın son dersidir ve yalnızca M konusunun kurallarını toplar.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (N/m "newton bölü metre", °C "derece", Na⁺ "sodyum iyonu", Cl⁻ "klorür iyonu").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Veri bir durumun içinde sunulur ("bir kimya kulübü denedi", "bir laboratuvar ölçtü").
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir birkaç parçadan oluşuyorsa 3–6. adımlar her parça için yinelenir.
- Sürükle-bırak, eşleştirme ve sıralama sahneleri kart başına seçimle kurulur (kitteki `sinifla` aracı): kutular tahtada adlarıyla durur; kart öne çıkar (ortada büyür); öğrenci `c.choice` ile kartın kutusunu seçer; doğruysa kart küçülüp kendi kutusuna oturur ve kartın geri bildirimi altında belirir; yanlışta ipucu çıkar ve kart ortada kalır. Bu dosyada `c.drag`, `c.match`, `c.sort` yoktur. Benzetimde `c.slider` ve `c.choice` kullanılır. Sınıflandırma sahnelerinde `tag: 'Sınıflandır'`.
- Renkler tema boyunca aynıdır: artı yük (Na⁺) turuncu, eksi yük (Cl⁻) mavi, çekme yeşil, itme kırmızı. Bu konuda çekim (sıvı molekülleri arasında, iyon ile su arasında) yeşil çizilir; kalın çizgi güçlü, ince ve kesikli çizgi zayıf çekimdir. Sabun ve deterjan molekülü mor çizilir (yeni bir kavram, yeni renk; ders boyunca aynı kalır). Sıvılar nötr açık tonlardadır; su, etanol, gliserin, etilen glikol açık tonlarla ayrılır, renk anlam taşımaz. Madenî para nötr gri.
- **Benzetimin sayıları.** Kitapta damla sayısı yoktur (gözlem tabloları boştur). Benzetimde görünen damla sayıları kitaptaki yüzey gerilimi değerlerinin (s. 209) sıralamasından türetilir: damla sayısı = 300 × (N/m değeri), en yakın tam sayıya yuvarlanır. Sonuç: 20 °C'ta su 22, gliserin 19, etilen glikol 14, sabunlu su 8, etanol 7; 50 °C'ta su 20, gliserin 17, etilen glikol 13, etanol 6. Sıralama (ve sıcaklıkla azalma yönü) bu değerlerle korunur; sayıların oranı ve büyüklüğü anlam taşımaz. Damla sayısı görünen her yerde (tabloda, sayaçta) "örnek veri" etiketi durur. Kubbe yüksekliği de aynı N/m değerleriyle orantılı çizilir; tahtaya kubbe için sayı yazılmaz. Kaydırıcılar yalnızca verisi olan konumlarda durur: sıvı (su, gliserin, etilen glikol, etanol) ve sıcaklık (20 °C, 50 °C); çözünen madde (saf su, sıvı sabun; yalnızca 20 °C). Ara sıcaklık, tuzlu su ya da başka bir çözünen için değer uydurulmaz. Tuz için yalnızca yön vardır (bkz. M2 sahne 5).

Çizim araçları (kit için; konunun araç dosyası `dersler/m-araclar.js`, `window.KIT_M`):

- `para(opts)`: madenî para (yandan görünüş: kalın elips kenarı), üstünde damlalık ve kubbe. Seçenekler: sıvı (ad, açık ton), damla sayısı (0 → taşma sınırı; sayaç etiketi "damla: n · örnek veri"), kubbe yüksekliği (N/m değeriyle orantılı; kubbeye sayı yazılmaz), taşma (son damlada sıvı paradan akar; "taştı" etiketi), hayalet kubbe (önceki denemenin ince kesikli dış çizgisi; sıcaklık karşılaştırması için). Yan yana iki para çizebilir (`para2`).
- `beher(opts)`: beherglas ve ısıtıcı; sıvı seviyesi, sıcaklık etiketi ("20 °C", "50 °C"), damlalık sıvıyı buradan alır.
- `deneyTablosu()`: satır ekleyen tablo; sütunlar Sıvı · Çözünen · Sıcaklık · Damla (örnek veri). "Tabloya yaz" düğmesi `c.h('button')` ile kurulur; o anki kaydırıcı konumlarını satır yapar. Not satırı: ilk satıra göre **tek** değişken değiştiyse "Tek değişken değişti: …", birden çok değiştiyse "Birden çok değişken değişti: etkiyi ayıramazsın." İki ardışık satırın damla sayıları arasında küçük ok (azaldı/arttı) gösterilebilir.
- `degiskenler(satirlar)`: üç sütunlu çerçeve (Bağımlı · Bağımsız · Kontrol); sütunlar tek tek dolar. Konu I'daki aracın aynısıdır (`i-araclar.js`); temalar arası ortak kullanılmadığı için M kendi kopyasını taşır.
- `sorukarti(metin, etiketler)`: soru kartı ve altına düşen iki etiket ("değiştirdiğimiz", "ölçtüğümüz"); I'daki araçla aynı.
- `cekim(sivi)`: sıvı kesiti: nötr gri molekülleri arasında yeşil çekim çizgileri (kalın/ince/kesikli); yüzeydeki molekülde yalnızca yan ve alt çizgiler, içteki molekülde dört yön (L'den hatırlatma); sıcaklık için hareket izi (kısa/uzun).
- `iyonsu()`: Na⁺ (turuncu) ve Cl⁻ (mavi) iyonlarının su moleküllerini çektiği kesit; iyon–su çizgileri su–su çizgilerinden kalın yeşil.
- `sabun(opts)`: sabun molekülü (mor yuvarlak baş + dalgalı kuyruk; etiketler "hidrofil: suyu sever", "hidrofob: suyu sevmez"); su yüzeyi kesiti: başlar suda, kuyruklar dışarıda, başların yüzeydeki su moleküllerini çekmesi; ikinci aşamada moleküllerin sıvının içine girmesi ve içteki çizgilerin kesikli ("zayıf hidrojen bağı") olması. Saf su kesiti yanında kalın çizgilerle ("hidrojen bağı").
- `tekne(opts)`: ebru teknesi (üstten): açık renkli sıvı, üç boya damlası; sığır ödü eklenince damlaların yayılması.
- `tabak(opts)`: süt tabağı (üstten): üç yuvarlak boya damlası; deterjan damlası gelince boyaların ve sütün dağılması (iki durum yan yana: önce, sonra).
- `gol(opts)`: gölet (yandan): yüzen ördek (tüy kuru: suyun üstünde damla kalır); deterjan karışınca tüy ıslanır, ördek suya gömülür.
- `olcumTablosu()`: dokuz değerli ölçüm tablosu (Madde · Sıcaklık · Yüzey gerilimi, N/m); satırlar M2 sahne 6'da sırayla belirir.
- `sinifla`: kitte var; kart başına kutu seçimi.
- Kaydırıcılar `step: 1`; `fmt` ile konum adları: "Su"/"Gliserin"/"Etilen glikol"/"Etanol"; "20 °C"/"50 °C"; "Yok (saf su)"/"Sıvı sabun".

## M1 · Yüzey gerilimi ve sıcaklık: soruyu kur, sına

- **Fikir:** "Yüzey gerilimini ne değiştirir?" araştırılabilir bir sorudur; önerme moleküller arası çekimle kurulur, sıcaklığın etkisi dolaylı bir deneyle sınanır: madenî paranın üstüne damla damla sıvı eklenir, taşmadan duran damla sayısına ve kubbenin yüksekliğine bakılır; kubbe yüksekse yüzey gerilimi büyüktür. Isındıkça çekim zayıflar, yüzey gerilimi azalır.
- **Giriş ekranı sorusu:** Suyu ısıtırsan yüzeyi daha mı gergin olur, daha mı gevşek?
- **Kaynak:** Ders kitabı s. 204 (Etkinlik 2.31, 1. Yönerge: damla büyüklüğü ve şekli yüzey gerilimiyle ilişkilidir; metal paranın üzerine damlatılan sıvının damla sayısı ve duruş şekliyle yüzey gerilimi ölçülür; sıvı ya da damla ne kadar bombeli duruyorsa yüzey gerilimi o kadar yüksektir; paranın üstünde damlalı üç fotoğraf), s. 205 (kitabın araştırma düzeni: araştırma sorusu, önerme; "dökülmeden duran damla"; malzemeler: aynı büyüklükte para, damlalık, etil alkol, su, etilen glikol, gliserin, ısıtıcı, beherglas, sıvı sabun), s. 206–207 (deney tablosu: bağımlı, bağımsız, kontrol değişkenleri; üç deneme ve ortalama damla sayısı; sıcaklık deneyinde "en az iki farklı sıvı"), s. 209 (20 ve 50 °C'ta su 0,073 ve 0,068; etanol 0,022 ve 0,020; etilen glikol 0,048 ve 0,044; gliserin 0,063 ve 0,058 N/m; sayılar yalnızca damla sayılarının sıralamasını türetmek için), s. 210 (sıcaklık arttığında moleküller arasındaki çekim zayıflar, kohezyon azalır, yüzey gerilimi azalır; moleküller arası etkileşimin gücü arttıkça kohezyon ve yüzey gerilimi artar). L'den hatırlanır: yüzey gerilimi kohezyonun sonucudur; içteki molekül her yönden, yüzeydeki yalnızca yandan ve alttan çekilir (s. 200). K2'den: sıcaklık arttıkça etkileşim zayıflar (s. 193). I2'den: bağımlı, bağımsız, kontrol değişkeni ve araştırılabilir soru.
- **Sınır:** Faktör sıcaklıktır; çözünen madde M2'dedir. Yalnızca madenî para yöntemi: stalagmometre (Traube), pipet ve büret ile damla sayma, ince cam boru, temas açısı yok. Kitabın iki yönteminde damla sayısı ile yüzey gerilimi ilişkisi zıttır (stalagmometrede sabit hacimden düşen damla sayısı artınca gerilim küçülür); ders yalnızca para yöntemini kullanır, "taşmadan duran damla sayısı" der. Ara sıcaklık yok; yalnızca 20 ve 50 °C. Kubbe için sayı yok. "Sıvı cinsi" bu derste araştırılan faktör değildir; yalnızca yöntemi tanıtmak için iki sıvı karşılaştırılır (S3), cevabı L2'dedir.
- **Güç kavramlar ve gösterimi:** (1) Dolaylı yöntem: görünmeyen bir büyüklüğü (yüzey gerilimi), görünen başka bir şeye (kubbe yüksekliği, damla sayısı) bakarak karşılaştırmak. Para, damlalık ve sayaç aynı tahtada; kubbe yükselir, sonunda taşar; yan yana iki sıvıda kubbe boyları karşılaştırılır. (2) Önermenin kuramdan türemesi: üç basamak (çekim → kohezyon → yüzey gerilimi) zincir olarak tahtada; öğrenci sıcaklığın etkisini bu zincirden çıkarır. (3) Tek değişken: "Tabloya yaz" düğmesi ve not satırı I2'deki gibidir. (4) Küçük fark: 20 → 50 °C farkı küçüktür; 50 °C'ta önceki kubbe hayalet çizgiyle durur, fark gözle okunur.
- **Hedeflenen yanılgı:** "Isınan sıvıda moleküller hızlanır, yüzey daha gergin olur"; "çok damla taşıyan sıvının yüzey gerilimi küçüktür".
- **Akılda kalıcı cümle:** Isındıkça çekim zayıflar; yüzey gerilimi azalır.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Su yüzeyindeki bir molekül nasıl çekilir? **Yalnızca yandan ve alttan** / Her yönden eşit / Yalnızca yukarıdan. (L2) Yanlışta: "Yüzeydeki molekülün üstünde su molekülü yoktur; yandan ve alttan çekilir."
2. Bir faktörün etkisini sınarken sabit tuttuğumuz değişkene ne denir? **Kontrol değişkeni** / Bağımsız değişken / Bağımlı değişken. (I2) Yanlışta: "Değiştirdiğimiz bağımsız, ölçtüğümüz bağımlı, sabit tuttuğumuz kontrol değişkenidir."

Sonra: "Bugün sıcaklığın yüzey gerilimine etkisini araştıracağız."

### Sahne 2 · Dolaylı yöntem: para ve damla

Tahta: yandan görünüş: bir madenî para, üstünde damlalık; yanında sayaç "damla: 0 · örnek veri". Damlalıktan su damlar; para üstünde bombeli bir kubbe oluşur ve damla eklendikçe yükselir; sayaç 1, 2, 3 … 22'ye çıkar; sonraki damlada su paradan taşar ("taştı"). Taşmadan hemen önceki durum dondurulur, "taşmadan duran damla" oku sayacı gösterir.

Anlatım:
1. Yüzey gerilimini doğrudan göremeyiz; dolaylı bir yol kullanırız.
2. Madenî paranın üstüne damlalıkla damla damla sıvı eklenir.
3. Sıvı, paranın üstünde bombeli bir kubbe oluşturur.
4. Damla eklendikçe kubbe yükselir; sonunda sıvı taşar.
5. Taşmadan duran damla sayısına ve kubbenin yüksekliğine bakılır.
6. Kubbe ne kadar yüksekse yüzey gerilimi o kadar büyüktür.

Sonra:
7. Kubbesi yüksek olan sıvı, para üstünde daha çok damla taşır.

### Sahne 3 · İki sıvıyı karşılaştır

Tahta: iki para yan yana (`para2`): solda su, sağda etanol; ikisinin altında "20 °C". Önce damlalar eklenir: su kubbesi yüksek, 22 damlada taşar; etanol kubbesi alçak, 7 damlada taşar. Sağda dört sütunlu tablo (Sıvı · Kubbe · Damla (örnek veri) · Yüzey gerilimi), satırlar sırayla dolar.

Örnek (baştan sona):
1. Aynı para, aynı damlalık, aynı sıcaklık: yalnızca sıvı farklıdır.
2. Suyun kubbesi yüksek, etanolün kubbesi alçaktır.
3. Su 22 damla taşır; etanol yalnızca 7 damla.
4. Kubbesi yüksek olan suyun yüzey gerilimi daha büyüktür.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloya iki satır eklenir: gliserin (kubbe: yüksek, damla 19) ve etilen glikol (kubbe: daha alçak, damla 14); "Yüzey gerilimi" hücreleri boş. Gliserin ile etilen glikolden hangisinin yüzey gerilimi daha büyüktür? **Gliserinin** / Etilen glikolün / İkisininki eşit. Dayandığı anlatım: sahne 2, 5–7; bu sahne, 1–4. İpuçları: "Hangisinin kubbesi daha yüksek, hangisi daha çok damla taşıyor?" · "Kubbesi yüksek olanın yüzey gerilimi büyüktür."

Sonra:
5. Gliserinin kubbesi daha yüksek: yüzey gerilimi daha büyüktür.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama, hedeflenen yanılgı): P sıvısı para üstünde Q sıvısından daha çok damla taşıyor. Hangisinin yüzey gerilimi daha büyüktür? **P'nin** / Q'nun / İkisininki eşit. Dayandığı anlatım: sahne 2, 6–7; bu sahne, 2–4. İpuçları: "Daha çok damla taşıyan sıvının kubbesi nasıl duruyordu?" · "Su 22, etanol 7 damla taşımıştı; hangisinin gerilimi büyüktü?"

Gör: P ve Q para çizimleri belirir; P'nin kubbesi yüksek.

Defter ("Dolaylı yöntem"): **Kubbe yüksekse yüzey gerilimi büyüktür.** Örnek: su, etanolden yüksek.

### Sahne 4 · Araştırılabilir soru

Tahta: sol üstte para ve damlalık küçük; altta soru kartları tek tek gelir; her karta iki etiket düşer: "değiştirdiğimiz" ve "ölçtüğümüz".

Anlatım:
1. Yüzey gerilimini neyin değiştirdiğini araştırmak istiyoruz.
2. Bir şeyi değiştirip ölçerek cevaplanan soru araştırılabilirdir.

Örnek (baştan sona): kart: "Sıcaklık artarsa taşmadan duran damla sayısı değişir mi?" Etiketler: "değiştirdiğimiz: sıcaklık", "ölçtüğümüz: damla sayısı".
3. Sıcaklığı değiştirir, taşmadan duran damla sayısını ölçeriz.

Birlikte çöz (`tag: 'Birlikte çöz'`): kart: "Suya sabun katılırsa taşmadan duran damla sayısı değişir mi?" Etiketler: "değiştirdiğimiz: ?", "ölçtüğümüz: damla sayısı" (dolu). Bu soruda değiştirdiğimiz nedir? **Suya katılan madde** / Paranın büyüklüğü / Damla sayısı. Dayandığı anlatım: 2–3. İpuçları: "Soruda neyi eklemekten söz ediliyor?" · "Önceki kartta değiştirdiğimiz sıcaklıktı."

Gör: kart etiket alır: "değiştirdiğimiz: suya katılan madde".

Dene (`tag: 'Sınıflandır'`; kart başına seçim, `sinifla`; iki kutu: "Araştırılabilir", "Araştırılamaz"; her kartın altına bir cümle düşer):
- "Su ısıtılırsa para üstünde taşmadan duran damla sayısı değişir mi?" → **Araştırılabilir.** "Sıcaklığı değiştirir, damla sayısını ölçeriz."
- "Suya sofra tuzu katılırsa taşmadan duran damla sayısı değişir mi?" → **Araştırılabilir.** "Katılan maddeyi değiştirir, damla sayısını ölçeriz."
- "Hangi sıvının damlası daha güzel görünür?" → **Araştırılamaz.** "'Güzel'i ölçemeyiz; değiştirip ölçecek bir şey yok."
- "Yüzey gerilimi neden bu kadar önemlidir?" → **Araştırılamaz.** "Bir şeyi değiştirip ölçerek cevaplanmaz."

Sonra:
4. Sıcaklık ve çözünen madde, yüzey gerilimini araştırdığımız iki faktördür.

### Sahne 5 · Önerme: çekimden yüzey gerilimine

Tahta: üç kutu soldan sağa zincir olarak sırayla dolar: "moleküller arası çekim" → "kohezyon" → "yüzey gerilimi" (üçünün üstünde aynı yönde yeşil ok; "büyür" etiketi). Altta sıvı kesiti (`cekim`): yüzeydeki molekülde yan ve alt çizgiler, içteki molekülde dört yön. Sonra kesitin yanına ikinci bir kesit gelir: moleküllerde uzun hareket izi ve seyrek çekim çizgileri; üstünde "ısınan sıvı".

Anlatım:
1. Yüzey gerilimi, kohezyonun sonucudur.
2. Moleküller arası çekim büyüdükçe kohezyon ve yüzey gerilimi büyür.
3. Isınan sıvıda moleküller arası çekim zayıflar.

Tahmin (`tag: 'Tahmin et'`; önerme kurma): Bu bilgilere göre ısınan sıvının yüzey gerilimi için hangi önerme kurulur? **Çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır** / Çekim zayıflar; yüzey gerilimi artar / Isınma yüzey gerilimini değiştirmez. Dayandığı anlatım: 1–3. İpuçları: "Çekim zayıflayınca kohezyona ne olur?" · "Yüzey gerilimi kohezyonun sonucuydu; o da değişir."

Sonra:
4. Önerme, bilgilerden çıkarılan ve deneyle sınanabilen bir açıklamadır.
5. Bizim önermemiz: ısındıkça yüzey gerilimi azalır.

### Sahne 6 · Araştırmayı planla

Tahta: solda düzenek: beherglas ve ısıtıcı, damlalık, madenî para. Sağda üç sütunlu `degiskenler` çerçevesi (Bağımlı · Bağımsız · Kontrol). Önermeyi sınamak için çerçeve dolar.

Anlatım:
1. Önermeyi sınamak için sıcaklığı değiştirip kubbeye bakacağız.
2. Çerçeveyi bu araştırma için dolduralım.

Örnek (baştan sona): çerçevede önce "Bağımsız: sıcaklık" ve "Bağımlı: taşmadan duran damla sayısı ve kubbe" dolar.
3. Değiştirdiğimiz sıcaklıktır; ölçtüğümüz damla sayısı ve kubbedir.

Birlikte çöz (`tag: 'Birlikte çöz'`): "Kontrol" sütunu: "madenî para, damlalık, ?" Üçüncü kontrol değişkeni hangisi olmalı? **Sıvının cinsi** / Sıcaklık / Taşmadan duran damla sayısı. Dayandığı anlatım: sahne 4, 3 ve bu sahne, 1–3 (sıcaklık değişiyor, damla sayısı ölçülüyor). İpuçları: "Sıcaklığın etkisini görmek için hangisini sabit tutmalısın?" · "Sıcaklık ve damla sayısı zaten başka sütunda."

Sonra:
4. Sıvının cinsi, para ve damlalık sabit kalan kontrol değişkenleridir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Hangi düzenek sıcaklığın etkisini doğru sınar? **Aynı sıvıdan iki örnek: biri 20 °C, biri 50 °C; aynı para ve damlalık** / İki farklı sıvı: biri 20 °C, biri 50 °C / Aynı sıcaklıkta iki farklı sıvı. Dayandığı anlatım: bu sahne, 1–4; I2'den "tek değişkeni değiştir". İpuçları: "Kaç şey birden değişiyor?" · "Sıvı farklıysa fark sıvıdan mı sıcaklıktan mı gelir?"

Gör: doğru düzenek çizilir: solda 20 °C, sağda 50 °C beherglas; aynı sıvı, aynı para.

### Sahne 7 · Araştırmayı uygula

Tahta: solda `beher` + `para` (damlalık, kubbe, sayaç "damla: n · örnek veri"); altında iki kaydırıcı: "Sıvı" ve "Sıcaklık". Sağda `deneyTablosu` (boş; "Tabloya yaz" düğmesi). Üstte çerçevenin küçük hâli: Bağımsız: sıcaklık.

Anlatım:
1. Şimdi planı uygulayalım: sıvıyı seç, sıcaklığı değiştir.

Tahmin (`tag: 'Tahmin et'`; önermeden türeyen tahmin): Önerme doğruysa suyu 20 °C'tan 50 °C'a ısıtınca taşmadan duran damla sayısı nasıl değişir? **Azalır** / Artar / Değişmez. Dayandığı anlatım: sahne 5, 1–5. İpuçları: "Önermemiz ısınınca yüzey gerilimi azalır diyordu." · "Yüzey gerilimi azalırsa kubbe nasıl olur?"

Dene (iki `c.slider`: "Sıvı", konumlar Su / Gliserin / Etilen glikol / Etanol, başlangıç Su; "Sıcaklık", 20 °C / 50 °C; `noWait` yönerge: "Bir sıvıyı 20 °C ve 50 °C'ta dene; sonra bir sıvı daha seç. Her denemeyi tabloya yaz."): para çizimi seçime göre değişir; sayaç damlaları 0'dan saymaya başlayıp taşma noktasında durur; 50 °C konumunda 20 °C kubbesi hayalet çizgiyle kalır. Damla sayıları: su 22 / 20, gliserin 19 / 17, etilen glikol 14 / 13, etanol 7 / 6 (20 °C / 50 °C). "Tabloya yaz" bir satır ekler; not satırı hangi değişkenin değiştiğini söyler (sıvı değişirse "Tek değişken değişti: sıvı"; sıvı ve sıcaklık birlikte değişirse "Birden çok değişken değişti: etkiyi ayıramazsın."). "Devam", en az iki farklı sıvı için hem 20 °C hem 50 °C satırı yazılınca açılır.

Gör: tablo vurgulanır; her sıvıda iki satır arasında "azaldı" oku; öğrencinin tahmin kutusunun yanına "gözlem: azaldı" düşer.

### Sahne 8 · Veriyi yorumla

Tahta: üstte zincir (sahne 5) yeniden: "sıcaklık artar → çekim zayıflar → kohezyon azalır → yüzey gerilimi azalır"; kutular sırayla yanar. Altta tablonun özeti: dört sıvı için 20 °C ve 50 °C kubbe boyları yan yana (kesikli hayalet çizgiyle).

Anlatım:
1. Dört sıvıda da sıcaklık artınca kubbe alçaldı, damla sayısı azaldı.
2. Kubbe alçalınca yüzey gerilimi azalır.
3. Veri, önermemizi destekledi.
4. Isınan sıvıda çekim zayıflar, kohezyon azalır.

Soru (`tag: 'Sıra sende'`; veriyi yorumlama): Isıtılan dört sıvıda da damla sayısı azaldı. Veri "ısındıkça yüzey gerilimi azalır" önermesini nasıl etkiler? **Destekler** / Çürütür / Önermeyle ilgisizdir. Dayandığı anlatım: sahne 2, 6; sahne 5, 5; bu sahne, 1–2. İpuçları: "Önerme azalma diyordu; veri ne gösterdi?" · "Veri ile önerme aynı yönü gösteriyor mu?"

Defter ("Sıcaklık"): **Sıcaklık arttıkça yüzey gerilimi azalır.** Örnek: su, 20 °C'tan 50 °C'a.

### Sahne 9 · Değişkenleri ayır

Tahta: üç kutu: "Bağımlı", "Bağımsız", "Kontrol"; kartlar sırayla öne çıkar.

Dene (`tag: 'Sınıflandır'`; kart başına seçim, `sinifla`; üç kutu):
- "Sıcaklık" → **Bağımsız.** "Değiştirdiğimiz değişken."
- "Taşmadan duran damla sayısı" → **Bağımlı.** "Ölçtüğümüz değişken."
- "Sıvının cinsi" → **Kontrol.** "Aynı sıvıyı iki sıcaklıkta denedik."
- "Madenî para" → **Kontrol.** "İki denemede de aynı para."
- "Damlalık" → **Kontrol.** "İki denemede de aynı damlalık."

### Çıkış soruları

1. Sıvı A para üstünde sıvı B'den daha yüksek bir kubbe oluşturuyor. Hangisi doğrudur? **A'nın yüzey gerilimi daha büyüktür** / B'nin yüzey gerilimi daha büyüktür / İkisininki eşittir. (sahne 2, 3)
2. (yanılgı) Bir sıvı ısıtılırsa yüzey gerilimi nasıl değişir? **Azalır** / Artar, çünkü moleküller hızlanır / Değişmez. Geri bildirim: "Isınan sıvıda moleküller arası çekim zayıflar; kohezyon ve yüzey gerilimi azalır." (sahne 5, 8)
3. (yeni durum) Bir öğrenci etanolün 20 °C'taki ve 50 °C'taki yüzey gerilimini karşılaştırıyor. Hangisi kontrol değişkenidir? **Madenî para** / Sıcaklık / Taşmadan duran damla sayısı. (sahne 6)
4. (yeni durum) Bir öğrenci 20 °C'taki gliseriniyle 50 °C'taki suyu karşılaştırıp sıcaklığın etkisini bulmaya çalışıyor. Sorun nedir? **Sıvı da sıcaklık da farklı** / Gliserin kullanılmış / Para kullanılmış. (sahne 6)
5. (yeni durum) Isıtılan sıvıda yüzey geriliminin azalmasının nedeni nedir? **Moleküller arası çekim zayıflar, kohezyon azalır** / Moleküller arası çekim güçlenir / Sıvının miktarı azalır. (sahne 5, 8)

Özet: Kubbe yüksekse yüzey gerilimi büyüktür. · Önerme çekimden kurulur, deneyle sınanır. · Tek değişken değişir, ötekiler sabit kalır. · **Isındıkça çekim zayıflar; yüzey gerilimi azalır.**

## M2 · Çözünen madde ve günlük hayat

- **Fikir:** Suda çözünen maddenin cinsi yüzey gerilimini değiştirir: sofra tuzu artırır, sabun ve deterjan azaltır; sonuç moleküller arası çekimin büyüklüğüyle gerekçelendirilir, laboratuvar ölçümleriyle karşılaştırılır ve günlük hayatta ebruda, sütte ve gölette görülür.
- **Giriş ekranı sorusu:** Suya bir madde çözersen yüzeyi aynı gerginlikte kalır mı?
- **Kaynak:** Ders kitabı s. 205–206, 208 (Etkinlik 2.31: sıvı sabun malzeme listesinde; "çözünen maddenin sıvının yüzey gerilimine etkisi" deneyi, saf su ile karşılaştırma; s. 205 soru 4: saf su yerine sabunlu su kullanılırsa damla sayısı), s. 209 (3. Yönerge: sabunlu su 20 °C 0,025 N/m; su 0,073 ve 0,068; etanol 0,022 ve 0,020; etilen glikol 0,048 ve 0,044; gliserin 0,063 ve 0,058; "deney sonucu bilimsel bilgi ile uyumlu / uyumlu değil, nedeni" çerçevesi), s. 210 (yüzey gerilimi sıvının cinsine, sıcaklığa ve çözünen maddeye bağlıdır; suya tuz eklenince su ve tuz iyonları arasında su molekülleri arasındakinden daha kuvvetli bir etkileşim oluşur, yüzey gerilimi artar; sabun ve deterjan yüzey gerilimini azaltır, yüzey aktif madde denir; sabun ve deterjan molekülü hidrofil (suyu seven) ve hidrofob (suyu sevmeyen) kısımlardan oluşur; hidrofil kısımlar yüzeydeki su moleküllerini kendine doğru çeker, molekül suyun yüzey gerilimini aşıp sıvı içine girer, sıvı içindeki kohezyon kuvvetleri azalır; Görsel 2.32 ve 2.33: sabunsuz suda "hidrojen bağı", sabunlu suda "zayıf hidrojen bağı"), s. 203 (ebru: boyaların çökmeden yayılması için sıvının yüzey gerilimini azaltan sığır ödü kullanılır), s. 211 (Kontrol Noktası 2.13: süte damlatılan gıda boyaları dağılmadan durur, birkaç damla deterjan eklenince boyalar ve süt dağılır; yüzemeyip batan ördekler, ördeklerde sorun yoktur), s. 201 (soru 1c: ördeğin tüyleri ıslanmaz, çünkü suyun kohezyon kuvveti su ile tüy arasındaki adezyon kuvvetinden büyüktür; adezyon kuvveti kohezyondan büyükse sıvı yayılır, yüzeyi ıslatır). M1'den: yöntem, tek değişken, sıcaklık yönü. G2'den: iyon-dipol etkileşimi (s. 151: tuzun suda çözünmesi, Na⁺ ve Cl⁻ ile su).
- **Sınır:** Çözünenler: sofra tuzu, sıvı sabun, deterjan (ve ebruda sığır ödü). Tuz için sayı yok, yalnızca yön; benzetimde tuz için damla sayısı gösterilmez. Kitabın "çok çözünen madde artırır, az çözünen ya da çözünmeyen madde azaltır" genellemesi alınmaz (hangi maddenin hangisi olduğu kitapta yok). Misel, yüzey aktif maddenin yapısı ve kuyruk uzunluğu, sabunun temizleme mekanizması, kritik misel derişimi yok; sabun molekülü yalnızca kitabın yazdığı kadar, tek sahne. "Denizden çıkınca saçların sertliği" ve "sütün kaymağı" soruları (s. 211) kitapta cevapsız olduğu için kullanılmaz. Ebruda mürekkep tepkimeleri, ebrunun tarihi ve boya kimyası yok.
- **Güç kavramlar ve gösterimi:** (1) Sabun molekülünün iki kısmı: mor yuvarlak baş (hidrofil) suya dönük, dalgalı kuyruk (hidrofob) suyun dışında; baş yüzeydeki su moleküllerini çeker; sonra moleküller sıvının içine girer ve içteki çekim çizgileri kalın yeşilden kesikli ve ince yeşile döner. Saf su kesiti hep yanındadır. (2) Tuz: Na⁺ ve Cl⁻ çevresinde su molekülleri; iyon–su çizgileri su–su çizgilerinden kalın; "çekim büyüdükçe yüzey gerilimi büyür" zinciri M1'dekiyle aynı. (3) Aynı olgunun iki yönü: tuz ↑, sabun ↓; tahtada iki ok ve iki kesit. (4) Kuramla ölçümün karşılaştırılması: ölçüm tablosu ve karttaki sonuç yan yana; kart "uyumlu" ya da "uyumlu değil" kutusuna seçilir.
- **Hedeflenen yanılgı:** "Suya katılan her madde yüzey gerilimini azaltır" (ya da "değiştirmez").
- **Akılda kalıcı cümle:** Tuz artırır; sabun ve deterjan yüzey gerilimini azaltır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Bir sıvı ısıtılınca yüzey gerilimi nasıl değişir? **Azalır** / Artar / Değişmez. (M1) Yanlışta: "Isınan sıvıda çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır."
2. Na⁺ iyonu ile su molekülü arasında hangi etkileşim olur? **İyon-dipol** / Dipol-dipol / London. (G2) Yanlışta: "İyon ile polar molekül arasındaki etkileşim iyon-dipoldür; su polar bir moleküldür."

Sonra: "Bugün suya katılan maddelerin yüzey gerilimine etkisine bakacağız."

### Sahne 2 · Suya madde çözülürse

Tahta: iki beherglas yan yana: solda saf su, sağda içinde sıvı sabun çözülmüş su; ikisinin üstünde "20 °C". Altında `degiskenler` çerçevesi (Bağımlı · Bağımsız · Kontrol) ve küçük para/damlalık çizimi.

Anlatım:
1. Suda çözülen maddeye çözünen madde denir.
2. Suya bir madde çözülünce yüzey gerilimi değişir mi?
3. Bunu da para ve damla yöntemiyle araştıracağız.

Örnek (baştan sona): çerçevede "Bağımlı: taşmadan duran damla sayısı" ve "Kontrol: sıcaklık 20 °C, sıvı miktarı, para, damlalık" dolar.
4. Ölçtüğümüz damla sayısıdır; sıcaklık ve para sabit kalır.

Birlikte çöz (`tag: 'Birlikte çöz'`): "Bağımsız" sütunu "?" Bu araştırmada bağımsız değişken hangisidir? **Suda çözülen maddenin cinsi** / Taşmadan duran damla sayısı / Sıcaklık. Dayandığı anlatım: 1–4; M1 sahne 6. İpuçları: "Bağımsız değişken, değiştirdiğin şeydir." · "Sıcaklık bu araştırmada sabit kalıyor."

Sonra:
5. Değiştirdiğimiz, suda çözülen maddenin cinsidir.

### Sahne 3 · Saf su ve sabunlu su

Tahta: iki para yan yana (`para2`): solda saf su, sağda sabunlu su; üstte "20 °C". Altında kaydırıcı ve `deneyTablosu` (sütunlar Sıvı · Çözünen · Sıcaklık · Damla (örnek veri)).

Anlatım:
1. Bir kimya kulübü saf suyu ve sabunlu suyu para üstünde denedi.

Dene (`c.slider`, "Çözünen madde"; iki konum "Yok (saf su)" ve "Sıvı sabun"; `noWait` yönerge: "İki durumu da dene; her birini tabloya yaz."): para çizimi seçime göre değişir; sayaç damlaları sayar ve taşma noktasında durur. Saf su 22 damla, yüksek kubbe; sabunlu su 8 damla, alçak kubbe (örnek veri). Not satırı: "Tek değişken değişti: çözünen madde." "Devam", iki satır yazılınca açılır.

Soru (`tag: 'Sıra sende'`): Suya sabun katılınca yüzey gerilimi nasıl değişti? **Azaldı** / Arttı / Değişmedi. Dayandığı anlatım: bu sahne, tablo; M1 sahne 2, 6–7 (kubbe ne kadar alçaksa yüzey gerilimi o kadar küçük). İpuçları: "Hangisinin kubbesi alçak, hangisi daha az damla taşıyor?" · "Alçak kubbe, küçük yüzey gerilimidir."

Gör: iki satır arasında "azaldı" oku; sabunlu suyun kubbesi alçak.

Sonra:
2. Sabunlu suyun yüzey gerilimi saf suyunkinden küçüktür.

### Sahne 4 · Sabun molekülü ne yapar?

Tahta: soldan sağa üç aşama. (1) tek bir sabun molekülü: mor yuvarlak baş, dalgalı kuyruk; etiketler "hidrofil: suyu sever", "hidrofob: suyu sevmez". (2) su yüzeyi kesiti: sabun molekülleri başları suya, kuyrukları dışarı dönük; başlardan yüzeydeki su moleküllerine kısa yeşil çekim okları. (3) iki beher kesiti yan yana: solda saf su (iç çizgiler kalın yeşil, "hidrojen bağı"), sağda sabunlu su (moleküller sıvının içinde de; iç çizgiler ince ve kesikli, "zayıf hidrojen bağı").

Anlatım:
1. Sabun ve deterjan molekülünün iki farklı kısmı vardır.
2. Hidrofil kısım suyu sever; hidrofob kısım suyu sevmez.
3. Hidrofil kısımlar yüzeydeki su moleküllerini kendine doğru çeker.
4. Sabun, yüzeyi aşıp sıvının içine de girer.
5. Sıvının içindeki kohezyon kuvvetleri azalır.
6. Yüzey gerilimini azaltan böyle maddelere yüzey aktif madde denir.

Soru (`tag: 'Sıra sende'`): Sabunlu suyun yüzey gerilimi saf sudan neden küçüktür? **Sabun, sıvı içinde su molekülleri arasındaki çekimi azaltır** / Sabun, su moleküllerini birbirine daha çok bağlar / Sabun suyun sıcaklığını yükseltir. Dayandığı anlatım: 3–5. İpuçları: "Yüzey gerilimi kohezyona bağlıydı; sabun kohezyona ne yapıyor?" · "Sabunlu suyun içindeki çizgiler kesikli, yani zayıf."

Gör: sabunlu su kesitinde çizgiler kesikli kalır; saf su kesitinde kalın.

Sonra:
7. Kohezyon azalınca yüzey gerilimi de azalır.

Defter ("Sabun ve deterjan"): **Sabun ve deterjan yüzey gerilimini azaltır.** Örnek: sabunlu su, saf sudan alçak kubbe.

### Sahne 5 · Tuz ters yönde etkiler

Tahta: solda saf su kesiti (su–su kalın yeşil çizgiler); sağda tuzlu su kesiti (`iyonsu`): Na⁺ (turuncu) ve Cl⁻ (mavi) çevresinde su molekülleri; iyon–su çizgileri daha kalın yeşil. Altında iki para (`para2`) boş durur.

Anlatım:
1. Suya sofra tuzu katılınca Na⁺ ve Cl⁻ iyonları suda dağılır.
2. İyonlar ile su molekülleri arasında yeni bir etkileşim oluşur.
3. Bu etkileşim, su molekülleri arasındakinden daha kuvvetlidir.
4. Çekim büyüdükçe kohezyon ve yüzey gerilimi büyür.

Tahmin (`tag: 'Tahmin et'`): Suya tuz katılırsa yüzey gerilimi ne olur? **Artar** / Azalır / Değişmez. Dayandığı anlatım: 1–4. İpuçları: "Yeni çekim, su–su çekiminden büyük mü küçük mü?" · "Çekim büyüdükçe yüzey gerilimi ne oluyordu?"

Gör: tuzlu su parasında kubbe saf suyunkinden biraz daha yüksek durur (damla sayısı ve sayı yazılmaz; yalnızca yön oku "artar").

Sonra:
5. Tuz, suyun yüzey gerilimini artırır.
6. Tuz artırır, sabun azaltır: çözünen maddenin cinsi belirler.

Dene (`tag: 'Sınıflandır'`; kart başına seçim, `sinifla`; iki kutu: "Artırır", "Azaltır"; her kartın altına bir cümle düşer):
- "Suya katılan sofra tuzu" → **Artırır.** "İyon–su çekimi, su–su çekiminden kuvvetlidir."
- "Suya katılan sıvı sabun" → **Azaltır.** "Sıvı içindeki kohezyon azalır."
- "Suya katılan deterjan" → **Azaltır.** "Sabun gibi yüzey aktif maddedir."
- "Yüzeyde ve sıvının içinde zayıf çizgiler bırakan yüzey aktif madde" → **Azaltır.** "Kohezyonu azaltan maddeler yüzey gerilimini azaltır."

Defter ("Çözünen madde"): **Tuz artırır; sabun ve deterjan azaltır.** Örnek: tuzlu su, sabunlu su.

### Sahne 6 · Ölçümlerle karşılaştır

Tahta: sağda `olcumTablosu` (Madde · Sıcaklık · N/m): su 20 °C 0,073; su 50 °C 0,068; sabunlu su 20 °C 0,025; etanol 20 °C 0,022; etanol 50 °C 0,020; etilen glikol 20 °C 0,048; etilen glikol 50 °C 0,044; gliserin 20 °C 0,063; gliserin 50 °C 0,058. Satırlar sırayla belirir. Solda iki kutu: "Uyumlu", "Uyumlu değil".

Anlatım:
1. Bir laboratuvar bazı sıvıların yüzey gerilimini ölçtü.
2. Yüzey gerilimi N/m ile verilir; sayı büyükse gerilim büyüktür.
3. Deney sonuçlarımızı bu ölçümlerle karşılaştıralım.

Dene (`tag: 'Sınıflandır'`; kart başına seçim, `sinifla`; iki kutu: "Uyumlu", "Uyumlu değil"; her kartın altına nedeni düşer; kartlar deneylerde elde edilebilecek sonuç cümleleridir):
- "Isıtılan suyun para üstünde taşıdığı damla azaldı." → **Uyumlu.** "Su: 0,073'ten 0,068'e düştü; sıcaklık arttıkça çekim zayıflar."
- "Isıtılan etanolün kubbesi alçaldı." → **Uyumlu.** "Etanol: 0,022'den 0,020'ye düştü."
- "Isıtılan gliserinin kubbesi yükseldi." → **Uyumlu değil.** "Gliserin: 0,063'ten 0,058'e düştü; ısınınca azalır."
- "Sabunlu suyun kubbesi saf suyunkinden alçak çıktı." → **Uyumlu.** "Sabunlu su 0,025, saf su 0,073."
- "Sabunlu suyun kubbesi 20 °C'taki etanolünkinden alçak çıktı." → **Uyumlu değil.** "Sabunlu su 0,025, etanol 0,022: sabunlu suyun gerilimi daha büyük."

Sonra:
4. İki faktörün yönü de ölçümlerle uyumlu çıktı.

### Sahne 7 · Günlük hayat: ebru

Tahta: ebru teknesi (`tekne`, üstten): açık renkli sıvı yüzeyi; üç boya damlası damlar. Önce damlalar yuvarlak ve toplu kalır; sığır ödü şişesi gelir, sıvıya birkaç damla düşer; boyalar çökmeden yayılır ve desen oluşturur.

Anlatım:
1. Ebru sanatında boyalar su yüzeyinde yayılarak desen oluşturur.
2. Boyaların çökmeden yayılması için yüzey gerilimi azaltılır.
3. Bunun için sıvıya sığır ödü katılır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Sığır ödü katılmış sıvı ile saf su para üstünde deneniyor. Hangisi daha çok damla taşır? **Saf su** / Sığır ödülü sıvı / İkisi aynı sayıda. Dayandığı anlatım: bu sahne, 2–3; M1 sahne 2, 6–7. İpuçları: "Sığır ödü yüzey gerilimini ne yapıyor?" · "Yüzey gerilimi küçük olan sıvının kubbesi alçaktır."

Gör: iki para yan yana: saf su yüksek kubbe, sığır ödülü sıvı alçak kubbe.

Sonra:
4. Yüzey gerilimi azalınca boya yayılır; ebru ustası bunu kullanır.

### Sahne 8 · Günlük hayat: süt ve deterjan

Tahta: süt tabağı (`tabak`, üstten) iki durumda yan yana: solda üç renkli boya damlası yuvarlak ve dağılmadan durur; sağda birkaç damla deterjan eklendikten sonra boyalar ve süt dağılmıştır. Ortada deterjan damlalığı.

Anlatım:
1. Süte damlayan gıda boyaları dağılmadan, damla gibi durur.
2. Birkaç damla deterjan eklenince boyalar ve süt dağılır.
3. Deterjan, sıvının yüzey gerilimini azaltır.
4. Kohezyon büyükken damla toplu kalır; azalınca yayılır.

Soru (`tag: 'Sıra sende'`): Deterjan damlatılınca boyalar neden dağılır? **Deterjan kohezyonu azaltır; damla toplu kalamaz** / Deterjan yüzey gerilimini artırır / Deterjan sütü ısıtır. Dayandığı anlatım: 3–4; sahne 4, 4–7. İpuçları: "Deterjan yüzey gerilimini ne yapıyor?" · "Kohezyon azalınca damla toplu kalıyor muydu?"

Gör: sağdaki tabakta boyalar yayılır.

### Sahne 9 · Günlük hayat: gölette ördekler

Tahta: bir gölet (`gol`, yandan): yüzen bir ördek; tüyünün üstünde su damla gibi durur ("suyun kohezyonu büyük"). Sonra gölete deterjan karışır; tüy ıslanır, ördek suya gömülür.

Anlatım:
1. Ördeğin tüyleri ıslanmaz; su tüyün üstünde damla kalır.
2. Çünkü suyun kohezyonu, su ile tüy arasındaki adezyondan büyüktür.
3. Bir göletteki ördekler birkaç gündür yüzemeyip batıyor.
4. Ördeklerde sorun yok; gölete deterjan karışmış.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Deterjan karışan suda ördeğin tüylerine ne olur? **Suyun kohezyonu azalır, su tüyleri ıslatır** / Suyun kohezyonu artar, tüyler ıslanmaz / Tüyün su ile adezyonu azalır, tüyler ıslanmaz. Dayandığı anlatım: bu sahne, 1–4; sahne 4, 5–7; sahne 8, 3–4. İpuçları: "Deterjan suyun kohezyonunu ne yapar?" · "Adezyon kohezyondan büyük olunca sıvı yayılır, yüzeyi ıslatır."

Gör: tüy ıslanır; ördek suya gömülür.

Sonra:
5. Deterjan yüzey gerilimini azaltır; tüyler ıslanır, ördek yüzemez.

### Çıkış soruları

1. Saf su ve sabunlu su para üstünde deneniyor. Hangisi daha az damla taşır? **Sabunlu su** / Saf su / İkisi aynı sayıda. (sahne 3)
2. (yanılgı) Suya sofra tuzu katılırsa yüzey gerilimi nasıl değişir? **Artar** / Azalır / Değişmez. Geri bildirim: "Tuz iyonları ile su arasındaki çekim, su molekülleri arasındakinden kuvvetlidir; yüzey gerilimi artar. Her madde azaltmaz." (sahne 5)
3. (yeni durum) Ebru teknesine sığır ödü katılıyor. Boyaların yayılmasının nedeni nedir? **Sıvının yüzey gerilimi azalır** / Sıvının yüzey gerilimi artar / Sıvı ısınır. (sahne 7)
4. (yeni durum) Gölete deterjan karışırsa suyun yüzey gerilimi ve ördeğin tüylerinin ıslanması nasıl olur? **Yüzey gerilimi azalır; su tüyleri daha kolay ıslatır** / Yüzey gerilimi artar; tüyler ıslanmaz / Yüzey gerilimi değişmez; tüyler ıslanmaz. (sahne 8, 9)
5. Sabun molekülünün hangi kısmı suyu sever? **Hidrofil kısmı** / Hidrofob kısmı / İki kısmı da sever. (sahne 4)

Özet: Çözünen maddenin cinsi yüzey gerilimini değiştirir. · Tuz artırır; sabun ve deterjan azaltır. · Ölçümler iki faktörün yönünü doğruladı. · **Tuz artırır; sabun ve deterjan yüzey gerilimini azaltır.**

## M3 · Konu tekrarı: Yüzey gerilimi (`m3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): beş panel sırayla dolar, her biri küçük çizimiyle ve deftere düşer: (1) para ve yüksek kubbe (damlalık, sayaç yok); (2) üç sütunlu değişken çerçevesi; (3) iki sıvı kesiti, 20 °C ve 50 °C (kalın ve seyrek çizgiler); (4) tuz (turuncu ve mavi iyonlar, kalın iyon–su çizgileri) ve sabun (mor molekül, kesikli iç çizgiler) yan yana; (5) sabun molekülü (baş ve kuyruk). Her panelin yanında tek satır.

Anlatım:
1. Bu konuda öğrendiklerimizi beş kuralda toplayalım.
2. Kubbe ne kadar yüksekse yüzey gerilimi o kadar büyüktür.
3. Araştırmada tek değişken değişir, ötekiler sabit kalır.
4. Sıcaklık arttıkça çekim zayıflar, yüzey gerilimi azalır.
5. Tuz yüzey gerilimini artırır; sabun ve deterjan azaltır.
6. Sabun molekülü, sıvı içindeki kohezyonu azaltır.

Sorular (`quiz`, karışık sırada):

1. Para üstünde denenen üç sıvıdan X en yüksek, Z en alçak kubbeyi yapıyor. Yüzey gerilimi en küçük olan hangisidir? **Z** / X / Hepsinin yüzey gerilimi eşittir. — M1
2. Hangisi araştırılabilir bir sorudur? **Suya tuz katılırsa para üstünde taşmadan duran damla sayısı değişir mi?** / Hangi sıvının damlası daha güzel görünür? / Yüzey gerilimi neden bu kadar önemlidir? — M1
3. Sıvıyı ısıtmanın yüzey gerilimine etkisi araştırılıyor. Hangisi kontrol değişkenidir? **Madenî para ve damlalık** / Sıcaklık / Taşmadan duran damla sayısı. — M1
4. Bir öğrenci 20 °C'taki suyu, 50 °C'taki sabunlu suyla karşılaştırıp çözünen maddenin etkisini bulmaya çalışıyor. Sorun nedir? **Çözünen madde de sıcaklık da farklı** / Sabun kullanılmış / Su kullanılmış. — M1, M2
5. Isıtılan gliserinin yüzey gerilimi nasıl değişir? **Azalır** / Artar / Değişmez. — M1
6. Suya sofra tuzu katılıyor. Para üstünde taşmadan duran damla sayısı nasıl değişir? **Artar** / Azalır / Değişmez. — M2
7. Deterjan suyun yüzey gerilimini neden azaltır? **Sıvı içindeki kohezyonu azaltır** / Su moleküllerini birbirine daha çok bağlar / Suyu ısıtır. — M2
8. Süt tabağındaki boyalara deterjan damlatılınca boyalar dağılıyor. Bu olayda yüzey gerilimi nasıl değişmiştir? **Azalmıştır** / Artmıştır / Değişmemiştir. — M2

Akılda kalıcı cümle: Isındıkça ve sabunla yüzey gerilimi azalır; tuzla artar.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.13) | Karşılığı |
|---|---|
| a) Yüzey gerilimini etkileyen faktörlere ilişkin araştırılabilir sorular oluşturur | M1 sahne 4 (soru kartı, araştırılabilir ayrımı; `benzetim`). Öğrencinin kendi sorusunu yazması `site dışı` |
| b) Araştırma sorularını cevaplamak üzere moleküller arası etkileşim teorileriyle önermeler sunar | M1 sahne 5 (çekim → kohezyon → yüzey gerilimi zinciri; önermeyi seçme); M2 sahne 5 (tuz için gerekçe) |
| c) Faktörleri belirlemeye yönelik planladığı araştırmayı uygular | M1 sahne 6 (değişkenler, düzenek seçimi), sahne 7 (benzetim: sıvı ve sıcaklık); M2 sahne 2–3 (çözünen madde). Malzeme seçme ve gerçek uygulama `site dışı` |
| ç) Araştırmadan elde ettiği verileri yorumlar | M1 sahne 7–8; M2 sahne 3–5 |
| d) Ulaştığı sonuçları bilimsel bilgilerle karşılaştırır | M2 sahne 6 (ölçüm tablosu, uyumlu/uyumlu değil) |
| e) Günlük hayatta yüzey geriliminden kaynaklanan problemlerin çözüm sürecini bilimsel bilgilerle ilişkilendirir | M2 sahne 7 (ebru), sahne 8 (süt ve deterjan), sahne 9 (ördekler) |
| Uygulama: faktörlere ilişkin tartışma ortamı, grup çalışması, akran değerlendirme | `site dışı` (sınıfta yapılır) |
| Uygulama: araştırılabilir sorular; soruların moleküller arası etkileşimler temelinde cevaplanması için önermeler | M1 sahne 4–5 |
| Uygulama: gerekli malzemeyi seçme, araştırmayı planlama ve gerçekleştirme | M1 sahne 6–7 (benzetim); malzeme seçme `site dışı` |
| Uygulama: sıcaklığın ve çözünen madde cinsinin etkisini dolaylı olarak belirlemek için yöntem; deney | M1 sahne 2–3 (para ve damla yöntemi), sahne 7; M2 sahne 3 |
| Uygulama: gözlemleri veya ölçüm verilerini kaydetme | M1 sahne 7 ve M2 sahne 3 (tablo satırları) |
| Uygulama: sonuçlar çıkarıp yorumlama | M1 sahne 8; M2 sahne 3–5 |
| Uygulama: çıkarımların sıvının moleküller arası etkileşim kuvvetlerinin büyüklüğü temelinde gerekçelendirilmesi | M1 sahne 5, 8; M2 sahne 4–5 |
| Uygulama: sonuçların bilimsel bilgilerle karşılaştırılması | M2 sahne 6 |
| Uygulama: günlük hayat problemlerinin bilimsel bilgilerle ilişkilendirilmesi | M2 sahne 7–9 |
| Uygulama: öğretim sürecindeki deneyden farklı bir deney tasarlama, uygulama, raporlama; öz değerlendirme | `site dışı` (sınıfta yapılır) |
| Anahtar kavram: yüzey gerilimi | M1, M2 (L2'de tanıtıldı) |
| Konu tekrarı (`KURALLAR.md` 3.4) | M3 |

Fazla olan: (1) Yüzey aktif madde adı ve sabun molekülünün hidrofil ile hidrofob kısımları (M2 sahne 4): program 13 için "çözünen madde cinsi" der ve bunları anmaz; kitap s. 210 yazar, `PLAN.md` karar 13 tek sahne olarak izin verir. Ancak `PLAN.md` bölüm 5 madde 12 "yüzey aktif maddelerin yapısı ve misel oluşumu"nu programda olmayan başlıklar arasında sayar; iki yer çelişir (rapora bakın). (2) Bağımlı, bağımsız, kontrol değişkeni (M1 sahne 6, M2 sahne 2) ve araştırılabilir soru (M1 sahne 4): I konusunda tanıtıldı, burada uygulanır. (3) İyon-dipol hatırlatması (M2 sahne 1 ve 5): tuzun artırma gerekçesi kitapta s. 210'da "su ve tuz iyonları arasındaki etkileşim" diye geçer; ad G2'den gelir. Eksik olan: öğrencinin kendi sorusunu yazması, kendi malzemesini seçmesi, gerçek ölçüm ve rapor, farklı bir deney tasarlama, grup çalışması ve akran değerlendirme (hepsi `site dışı`); tuz için sayısal veri (kitapta yok; yalnızca yön); sabunlu su için 50 °C değeri (kitapta yok; sabun yalnızca 20 °C'ta denenir).
