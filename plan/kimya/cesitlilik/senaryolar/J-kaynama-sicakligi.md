# Senaryolar — Konu J · Kaynama sıcaklığı

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.10, `../PLAN.md` bölüm 3 (J1, J2), bölüm 7 (karar 3, 15) ve bölüm 8 ("J · Kaynama sıcaklığı"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir; buhar basıncı bilgisi `I-buhar-basinci.md`, polarlık ve etkileşim bilgisi `E-molekul-polarligi.md` ve `G-molekuller-arasi-etkilesimler.md` dosyalarındaki gibi kullanılır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Simge ve rakam içeren satırların okunuşu ders yazılırken `speak` ile verilir (°C "derece", K "kelvin", mmHg "milimetre cıva", kPa "kilopaskal", atm "atmosfer", H₂O "su", CH₄ "metan", H₂S "hidrojen sülfür", NH₃ "amonyak", HF "hidrojen florür", HCl "hidrojen klorür", HBr "hidrojen bromür", δ⁺ "delta artı", δ⁻ "delta eksi"; "112,65" "yüz on iki virgül altmış beş").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Veri bir durumun içinde sunulur ("bir araştırmacı ölçtü", "bir öğretmen ısıttı").
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler (aynı sahnenin numaraları; başka sahne "sahne N, madde" diye anılır).
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir birkaç parçadan oluştuğu için 2–6. adımlar her parçada yinelenir.
- **Sürükle-bırak, eşleştirme ve sıralama yok.** Motorda böyle çağrı bulunmaz; "Dene" sahnelerindeki sınıflandırmalar **kart başına seçim** olarak kurulur (kitteki `sinifla`): kutular tahtada adlarıyla durur; kartlar sırayla öne çıkar (ortada büyür); öğrenci `c.choice` ile kartın kutusunu seçer; doğruysa kart küçülüp kendi kutusuna ya da tablodaki satırına oturur ve kartın geri bildirimi tahtada belirir, yanlışta ipucu çıkar ve kart ortada kalır. Her "Dene" bölümünde kartlar, her kartın doğru kutusu ve geri bildirimi yazılıdır. Bu dosyada `c.drag`, `c.match`, `c.sort` yoktur. Benzetimde `c.slider` ve `c.choice` kullanılır; `tag` sınıflandırmada `'Sınıflandır'`.
- Renkler tema boyunca aynıdır: artı yük turuncu, eksi yük mavi, çekme yeşil, itme kırmızı. Bu konuda yük çizilmez; moleküller arası çekim (sıvıda, hidrojen bağı) yeşildir (ince çizgi: zayıf çekim, kalın ya da sık çizgi: güçlü çekim). Basınç okları (dış basınç, iç basınç) **koyu gridir**: kitaptaki kırmızı ve mavi oklar kullanılmaz (kırmızı itmeye, mavi eksi yüke ayrılmıştır); dış basınç dıştan içe, iç basınç içten dışa gösterilir, ilk görüldüğü yerde etiketi durur ("dış basınç", "iç basınç"). Ok kalınlığı basıncın büyüklük sırasını gösterir, tahtaya ok için sayı yazılmaz. Moleküller ve çubuklar nötr tonlardadır (su, etil alkol, dietil eter üç ayrı açık gri tonda); renk anlam taşımaz. Hidrojen bağı yeşil kesikli, kovalent bağ düz koyu çizgidir (G konusundaki gibi).
- Benzetimlerde ve tablolarda görünen her sayı kitaptaki bir değerdir. Kaydırıcılar yalnızca verisi olan konumlarda durur; ara değer uydurulmaz:
  - Suyun kaynama sıcaklığı (dış basınç mmHg → °C): 760 → 100; 931 → 106; 1448 → 119; 1862 → 127; 2069 → 131; 2482 → 137; 2896 → 142; 3517 → 149 (s. 181). 1 atm = 760 mmHg = 101,325 kPa (s. 180, 185). Deniz seviyesinde 1 atm, 100 °C; Everest'in zirvesinde 0,3 atm, 70 °C (s. 180); bu iki durumun mmHg karşılığı derste yazılmaz (0,3 atm için kitap sayı vermez).
  - Buhar basıncı (kPa; 0, 20, 40, 60, 80, 100 °C): su 0,61 · 2,33 · 7,37 · 19,92 · 47,34 · 101,33; etil alkol 1,63 · 5,85 · 18,04 · 47,02 · 108,34 · 225,75; dietil eter 24,70 · 58,96 · 122,80 · 230,65 · 399,11 · 647,87 (s. 185). Bu üç sıvının kaynama sıcaklığı kitapta yazılı değildir (suyunki hariç); 101,3 kPa'a ulaşılan sıcaklık **aralık** olarak okunur: dietil eter 20 ile 40 arasında, etil alkol 60 ile 80 arasında, su 100 °C.
  - Kaynama sıcaklığı (K): metan 112,65 (London), hidrojen sülfür 213,15 (dipol-dipol), su 373,15 (hidrojen bağı) (s. 179). Kelvin değerleri °C'a çevrilmez.
  - Kaynama sıcaklığı (°C, 1 atm) ve elektronegatiflik: H₂O 100 (H 2,20; O 3,44); HF 19,5 (H 2,20; F 4,00); NH₃ −33,3 (H 2,20; N 3,04) (s. 179).
  - On altı hidrojenli bileşiğin kaynama sıcaklığı grafiği (s. 178): kitap yalnızca üç değeri sayıyla yazar (yukarıdaki metan, hidrojen sülfür, su). Tahtada bu üç çubuğun değeri yazılır; ötekilerin yüksekliği grafikten okunan yaklaşık sıradır ve **hiçbir çubuğa sayı yazılmaz** (çizim notlarına bakın).

Çizim araçları (kit için; konunun araç dosyası `dersler/j-araclar.js`, `window.KIT_J`; ayrıntı en sonda "Çizim notları" bölümünde):

- `sirinca(opts)`, `kabarcikModeli(opts)`, `buharGrafigi(opts)`, `kaynamaDeney(opts)` (J1); `cubukKpa(opts)`, `kaynamaCubuklari(opts)`, `hidrurGrafigi(opts)`, `hidrojenBagiSayisi(opts)`, `tekTablo(opts)` (J2); `iddiaCercevesi()` (J1 ve J2); kitte var olanlar: `sinifla`, `kartSecim`; E ve G konularından `tanecik`, `ciftCiz`, `hidrojenBagiZinciri` yeniden kullanılır.

## J1 · Kaynama: buhar basıncı dış basınca eşitlenince

- **Fikir:** Su yalnızca 100 °C'ta kaynamaz: sıvı, buhar basıncı sıvının yüzeyine etki eden dış basınca eşit olduğu sıcaklıkta kaynar; dış basınç değişirse kaynama noktası da değişir.
- **Giriş ekranı sorusu:** Yüksek bir dağın tepesinde çay suyu da 100 °C'ta mı kaynar?
- **Kaynak:** Ders kitabı s. 175 (kaynamanın ve kaynama noktasının tanımı; Etkinlik 2.20: 100 mL su yaklaşık 50 °C'a ısıtılır, şırıngaya çekilir, havası boşaltılır, ucu parmakla kapatılır), s. 176 (değerlendirme: piston çekilince ne olur, basınç nasıl değişir), s. 180 (Etkinlik 2.22, 1. Yönerge: saf suyun iki ortamdaki sıcaklık–buhar basıncı grafikleri ve kaynama tanecikli modeli; 1 atm = 76 cmHg = 760 mmHg = 101,325 kPa; deniz seviyesi 1 atm 100 °C; Everest'in zirvesi 0,3 atm 70 °C), s. 181 (soru 2–6; 2. Yönerge: basınç–kaynama sıcaklığı tablosu), s. 183 (Görsel 2.23–2.26: su molekülü, ısınınca hareket, buhar molekülleriyle kabarcık oluşumu, iç basınç ve dış basınç, kaynama noktası tanımı), s. 184 (Görsel 2.27–2.28: dış basınç artınca kabarcığın küçülmesi, azalınca oluşması; dış basınç arttıkça kaynama sıcaklığı artar; sabit basınçta kaynarken saf sıvının sıcaklığı değişmez, verilen ısı çekimi kırmak için kullanılır). Kaynama ve buharlaşmanın kavram olarak ne olduğu ön bilgidir (`MUFREDAT.md` temel kabuller); ders yalnızca kaynama noktasının nedenini kurar. Buhar basıncı I konusundan hatırlatılır.
- **Sınır:** Saf sıvı. Çözeltide kaynama noktası yükselmesi (s. 185), gayzerler (s. 174), bağıl nem, "kaynama ile buharlaşmanın farkı" tablosu yok. Etkileşim türünün etkisi J2'dedir. Basınç yalnızca atm ve mmHg'dir (kPa J2'de). Kitaptaki 20 °C'lık kap görselleri ve grafiklerin 20 °C noktaları alınmaz (kitabın şeması ölçekli değildir). 0,3 atm'in mmHg karşılığı hesaplanıp yazılmaz.
- **Güç kavramlar ve gösterimi:** (1) Kabarcığın içindeki basınç: ısınan sıvının içinde bazı moleküller çekimi aşıp buhar olur, hızlı buhar molekülleri çevreyi iterek bir boşluk (kabarcık) açar; içten dışa "iç basınç", dıştan içe "dış basınç" okları; kabarcık, iki basınç arasındaki dengeye göre büyür ya da küçülür (`kabarcikModeli`). (2) "Basınç düşünce kaynama": şırınga ve piston, pistonla birlikte dış basınç okları incelir, kabarcıklar oluşur. (3) Grafikten kaynama noktası okumak: aynı su eğrisi üzerinde iki yatay kesikli çizgi ("1 atm", "0,3 atm"), her biri eğriyi kestiği yerden düşey bir çizgiyle sıcaklık eksenine iner (100 °C, 70 °C); kesişme noktasında kabarcık küçük bir çizimle gösterilir (`buharGrafigi`). (4) Veriden ilişki çıkarmak: dış basıncı seçilen konumlarda değiştiren kaydırıcı, kapaktaki oklar, termometre, tablo ve nokta grafiği birlikte çalışır (`kaynamaDeney`). (5) İddia–kanıt–gerekçe: üç kutu, her biri tek tek dolar (`iddiaCercevesi`).
- **Hedeflenen yanılgı:** "Su her yerde 100 °C'ta kaynar" ve "kaynatmak için sıvıyı 100 °C'a getirmek şarttır".
- **Akılda kalıcı cümle:** Buhar basıncı dış basınca eşitlenince sıvı kaynar.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Aynı sıvının sıcaklığı yükseltiliyor. Denge buhar basıncı nasıl değişir? **Artar** / Azalır / Değişmez. (I2) Yanlışta: "Sıcaklık artınca buhar fazına geçen molekül sayısı artar; buhar basıncı yükselir."
2. Buhar basıncı nasıl oluşur? **Buhar moleküllerinin kabın çeperlerine çarpmasıyla** / Sıvı moleküllerinin kabın tabanına çarpmasıyla / Kapağın sıvıyı itmesiyle. (I1, daha eski) Yanlışta: "Buhar molekülleri çeperlere çarpar; bu çarpmaların basıncı buhar basıncıdır."

Sonra: "Bugün sıvıların hangi sıcaklıkta kaynadığına bakacağız."

### Sahne 2 · Yaklaşık 50 °C'ta kaynayan su

Tahta: solda ocak üstünde beherglas, içinde su ve termometre ("yaklaşık 50 °C"). Beherden şırıngaya bir miktar su çekilir; şırıngadaki hava boşaltılır; şırınganın ucu bir parmakla kapatılır. Sonra şırınga büyür: içinde yalnızca su, pistonun yeri işaretli; üstünde "yaklaşık 50 °C".

Anlatım:
1. Bir öğretmen suyu beherde yaklaşık 50 °C'a kadar ısıttı.
2. Bir şırıngaya biraz su çekip havasını boşalttı.
3. Şırınganın ucunu parmağıyla sıkıca kapattı.

Tahmin (`tag: 'Tahmin et'`; gündelik sezgi): Öğretmen şırınganın pistonunu geri çekiyor. Yaklaşık 50 °C'taki su ne yapar? **Kaynar** / Donar / Hiçbir şey olmaz. Dayandığı anlatım: yok (sezgi). İpuçları: "Pistonu çekince şırınganın içi genişliyor." · "Isıtıcı yok; yine de bir şey olabilir." Geri bildirim (yanlışta): "Pistonu çekince suyun üstündeki basınç azalır; su kaynar."

Gör: piston geri çekilir; suyun içinde kabarcıklar oluşur ve yükselir; şırınganın üstündeki etiket "yaklaşık 50 °C" olarak kalır.

Sonra:
4. Su yaklaşık 50 °C'ta kaynadı; kaynamak için 100 °C şart değil.
5. Pistonu çekince suyun yüzeyine etki eden basınç azaldı.
6. Demek ki kaynama, sıcaklığın yanında basınca da bağlıdır.

### Sahne 3 · Kabarcığın içinde ne var?

Tahta: solda kaynayan bir su kabı (kabarcıklar yüzeye çıkıyor); bir bölgesi büyür ve su molekülleri görünür: nötr gri küreler, aralarında ince yeşil çekim çizgileri. Anlatım ilerledikçe: moleküllere kısa hareket izleri gelir (ısınma); iç kısımdan birkaç molekül yeşil çizgilerden kopar (buhar); hızlı buhar molekülleri çevredeki sıvıyı iter, bir kabarcık açılır. Kabarcığın içinde dıştan içe oklar "dış basınç" (koyu gri), içten dışa oklar "iç basınç" (koyu gri). Biten adım soluklaşır.

Anlatım:
1. Su ısınınca molekülleri daha hızlı hareket eder.
2. İç kısımdaki bazı moleküller çekimi aşıp buhar olur.
3. Hızlı buhar molekülleri çevresindeki sıvıyı iterek bir kabarcık açar.
4. Kabarcığın içindeki buharın basıncına iç basınç diyelim.
5. Sıvının yüzeyine havanın ve buharın uyguladığı basınç, dış basınçtır.
6. Kabarcıklar yüzeye çıkar; bu olaya kaynama denir.

Soru (`tag: 'Sıra sende'`): Kabarcığın içindeki basıncı ne oluşturur? **Buhar moleküllerinin çarpması** / Sıvı moleküllerinin çarpması / Kabın ağırlığı. Dayandığı anlatım: 2–4; hatırla sahnesi, 2. İpuçları: "Kabarcığın içinde buhar var." · "Basınç, moleküllerin çarpmasından doğar."

Sonra:
7. İç basınç, kabarcığın içindeki buharın basıncıdır.

### Sahne 4 · Dış basınç kabarcığı yönetir

Tahta: iki yan yana kap kesiti. Solda "dış basınç artar": koyu gri oklar kalınlaşır, kabarcık küçülür, içindeki buhar molekülleri birbirine yaklaşır ve sıvıya döner. Sağda "dış basınç azalır": oklar incelir, buhar molekülleri yayılır, kabarcık büyür ve yüzeye çıkar. Altta şırınga: piston geri çekilmiş, üstündeki dış basınç okları ince.

Anlatım:
1. Dış basınç artarsa kabarcıktaki buhar sıkışır.
2. Buhar molekülleri yaklaşır; kabarcık küçülüp kaybolur.
3. Dış basınçtan küçük iç basınçlı kabarcık oluşamaz.
4. Dış basınç azalırsa buhar yayılır ve kabarcık oluşur.
5. Böyle bir sıvı kaynamaya başlar.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada şırınga; yanında iki satır: "Piston çekildi → şırınganın içi genişledi" yazılı, "Suyun yüzeyine etki eden basınç: ?" boş. Piston çekilince suyun yüzeyine etki eden basınç nasıl değişti? **Azaldı** / Arttı / Değişmedi. Dayandığı anlatım: sahne 2, 5; bu sahne, 4–5. İpuçları: "Pistonu çekince şırınganın içi genişliyor." · "Basınç azalınca kabarcıklar oluşuyordu."

Sonra:
6. Şırıngada dış basınç azaldı; su bu yüzden 50 °C'ta kaynadı.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Kabarcıklı bir kaba dışarıdan uygulanan basınç artırılıyor. Kabarcığa ne olur? **Küçülür** / Büyür / Değişmez. Dayandığı anlatım: 1–3. İpuçları: "Dış basınç buharı sıkıştırır." · "Buhar molekülleri yaklaşınca sıvıya döner."

Gör: kabarcık küçülüp kaybolur; moleküller sıvıya karışır.

Sonra:
7. Dış basınç yüksekse kabarcık oluşamaz, kaynama gecikir.

### Sahne 5 · Grafik: buhar basıncı dış basınca eşitlenir

Tahta: sıcaklık (°C, yatay) – buhar basıncı (mmHg, düşey; işaretli değerler 200, 400, 600, 760) grafiği; suyun buhar basıncı eğrisi yükselerek ilerler. Önce sol altta deniz seviyesi küçük çizimi (kap, "1 atm", "100 °C"): "1 atm = 760 mmHg" yazar; 760 düzeyinde yatay kesikli çizgi eğriyi keser, kesişme noktasından düşey çizgi inip "100 °C"ta durur. Sonra sağ altta Everest'in zirvesi çizimi ("0,3 atm", "70 °C"): ikinci kesikli çizgi ("0,3 atm") eğriyi daha erken keser, düşey çizgi "70 °C"ta durur.

Anlatım:
1. Eğri, suyun buhar basıncının sıcaklıkla arttığını gösterir.
2. Deniz seviyesinde su 100 °C'ta kaynar; dış basınç 1 atm'dir.
3. Bir atmosfer, 760 mmHg'ye eşittir.
4. Grafikte 100 °C'ın karşılığı 760 mmHg'dir.

Tahmin (`tag: 'Tahmin et'`; anlatılandan çıkar): Everest'in zirvesinde dış basınç 0,3 atm; su 70 °C'ta kaynar. Bu sıcaklıkta suyun buhar basıncı kaç atm'dir? **0,3 atm** / 1 atm / 0,7 atm. Dayandığı anlatım: 2–4 (deniz seviyesinde buhar basıncı dış basınca eşit çıktı). İpuçları: "Deniz seviyesinde kaynarken buhar basıncı ile dış basınç nasıldı?" · "Aynı örüntü burada da geçerli olabilir."

Gör: 70 °C'ta eğri 0,3 atm çizgisine ulaşır.

Sonra:
5. İki yerde de kaynarken buhar basıncı dış basınca eşit.
6. Su, buhar basıncı dış basınca eşit olduğu sıcaklıkta kaynar.
7. Bu sıcaklığa kaynama noktası denir.
8. Dış basınç düşünce kaynama noktası da düşer.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Dış basıncın 1 atm olduğu bir kapta su kaynıyor. Kabarcıktaki buharın basıncı kaç atm'dir? **1 atm** / 0,3 atm / 100 atm. Dayandığı anlatım: 5–6. İpuçları: "Kaynarken buhar basıncı dış basınca eşittir." · "100, kaynama sıcaklığıydı; basınç değil."

Sonra:
9. Saf sıvı, sabit basınçta kaynarken sıcaklığı değişmez.
10. Verilen ısı, sıvı moleküllerinin arasındaki çekimi kırmaya gider.

Defter ("Kaynama noktası"): **Kaynama: buhar basıncı = dış basınç.** Örnek: 1 atm, 100 °C.

### Sahne 6 · Dış basınç ve kaynama sıcaklığı: veriyi düzenle

Tahta: solda kapaklı bir kap; kapağın üstünde dış basınç okları (kalınlığı basınçla orantılı), içinde su ve termometre. Üstünde basınç etiketi. Sağda iki sütunlu tablo (Dış basınç, mmHg · Kaynama sıcaklığı, °C), altında nokta grafiği (yatay: dış basınç, düşey: kaynama sıcaklığı; eksenler boş). Basınç sütunu başta küçükten büyüğe sıralı değil, kaydırıcı sırasıyla dolar.

Anlatım:
1. Bir araştırmacı suyu farklı dış basınçlarda kaynattı.
2. Her basınçta kaynama sıcaklığını ölçüp tabloya yazdı.

Tahmin (`tag: 'Tahmin et'`): Dış basınç 760'tan 3517 mmHg'ye çıkarılırsa suyun kaynama sıcaklığı nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: sahne 4, 1–3; sahne 5, 5–6. İpuçları: "Dış basınç yüksekken kabarcık oluşması zordu." · "Buhar basıncının daha yüksek bir değere ulaşması gerekir."

Dene (`c.slider`, "Dış basınç"; sekiz konum: 760, 931, 1448, 1862, 2069, 2482, 2896, 3517 mmHg; `fmt` ile "760 mmHg" gibi; `noWait` yönerge: "Basıncı değiştir; kaynama sıcaklığına bak. Her konumu tabloya yaz."): kaydırıcı konumuna göre kapaktaki oklar kalınlaşır ve termometre kitaptaki değeri gösterir (100, 106, 119, 127, 131, 137, 142, 149 °C). "Tabloya yaz" düğmesi (`c.h('button')`) o konumun satırını tabloya ekler ve grafiğe bir nokta koyar; aynı konum ikinci kez yazılmaz. "Devam", en az dört satır yazılınca açılır.

Gör: sekiz satır ya da yazılan satırlar basınca göre sıralanır; noktalar yukarı doğru, yükselen bir dizi oluşturur; tahmin kutusunun yanına "gözlem: arttı" düşer.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Su 2482 mmHg dış basınçta kaynıyor. Basınç 2069 mmHg'ye düşürülürse kaynama sıcaklığı nasıl olur? **137 °C'tan düşük** / 137 °C'tan yüksek / 137 °C. Dayandığı anlatım: tablonun ve grafiğin satırları. İpuçları: "Tabloda 2069'un karşısına bak." · "Basınç azalınca kaynama sıcaklığı ne oluyordu?"

Sonra:
3. Dış basınç arttıkça suyun kaynama sıcaklığı yükselir.
4. Yüksek dış basınca ulaşmak için buhar basıncı daha çok artmalıdır.
5. Bunun için sıvı daha çok ısı almalıdır.

Defter ("Dış basınç ve kaynama"): **Basınç arttıkça kaynama noktası yükselir.** Örnek: su, 100 → 149 °C.

### Sahne 7 · İddiayı kanıtla

Tahta: üç kutu yan yana: "İddia", "Kanıt", "Gerekçe"; başta boş. Her kutu kendi sırasında dolar; dolan kutu çerçevelenir, öncekiler soluklaşmaz (üç kutu birlikte görünür).

Anlatım:
1. Bilimde iddia, kanıtla birlikte söylenir.
2. İddia: dış basınç düşünce suyun kaynama noktası düşer.
3. Kanıt, ölçülmüş bir veridir; gerekçe, o verinin nedenidir.

Birlikte çöz (`tag: 'Birlikte çöz'`): İddia kutusu dolu (cümle 2). Kanıt kutusu boş. Bu iddiayı hangi veri destekler? **Everest'in zirvesinde (0,3 atm) su 70 °C'ta, deniz seviyesinde (1 atm) 100 °C'ta kaynar** / Su 1 atm'de 100 °C'ta kaynar / Everest'in zirvesinde hava soğuktur. Dayandığı anlatım: sahne 5, 2–8; bu sahne, 1–3. İpuçları: "İki ayrı dış basıncı yan yana koyan veri hangisi?" · "Tek bir ölçüm iki basıncı karşılaştırmaz." Geri bildirim: "İki basınç, iki kaynama noktası: ilişki bu ikisinden görülür." · "Hava sıcaklığı ölçülmüş bir dış basınç verisi değildir."

Sonra:
4. İki ölçüm yan yana gelince iddia kanıt bulur.

Soru (`tag: 'Sıra sende'`): İddia ve kanıt dolu: "Su 760 mmHg'de 100 °C'ta, 3517 mmHg'de 149 °C'ta kaynadı." Gerekçe hangisidir? **Dış basınç arttıkça buhar basıncının ona ulaşması için sıvı daha çok ısınmalıdır** / Dış basınç arttıkça sıvı molekülleri küçülür / Su ısındıkça buhar basıncı azalır. Dayandığı anlatım: sahne 6, 4–5; sahne 5, 5–6. İpuçları: "Kaynama için buhar basıncı neye eşitlenmeliydi?" · "Isı, buhar basıncını artırıyordu."

Sonra:
5. Dış basınç yüksekse kaynama için gereken sıcaklık da yüksektir.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Bir öğrenci "Su her yerde 100 °C'ta kaynar" diyor. Hangi veri bu iddiayı çürütür? **Everest'in zirvesinde su 70 °C'ta kaynar** / Su 1 atm'de 100 °C'ta kaynar / Su ısındıkça buharlaşır. Dayandığı anlatım: sahne 5, 2–8. İpuçları: "İddia 'her yerde' diyor; farklı bir yerde farklı sonuç aranır." · "Çürütmek için 100 °C'tan farklı bir kaynama sıcaklığı gerekir."

Sonra:
6. Su her yerde değil, 1 atm'de 100 °C'ta kaynar.

Dayandığı bilimsel bilgi (tahtada kısa karşılaştırma): öğrencinin iddiası ve "Sıvı yüzeyine etki eden dış basınç arttıkça kaynama sıcaklığı artar, azaldıkça düşer." cümlesi yan yana. Altyazı: "Bilimsel bilgi de aynı sonucu söyler."

### Çıkış soruları

1. Bir sıvının kaynama noktası nedir? **Buhar basıncının dış basınca eşit olduğu sıcaklık** / Buhar basıncının sıfır olduğu sıcaklık / Sıvının donmaya başladığı sıcaklık. (sahne 5)
2. (yanılgı) Su her yerde 100 °C'ta kaynar mı? **Hayır; kaynama noktası dış basınca göre değişir** / Evet; kaynama noktası suyun değişmez özelliğidir / Evet; yalnızca saf su 100 °C'ta kaynar. (sahne 5, 6)
3. (yeni durum) Kaynayan bir sıvının üstündeki dış basınç artırılıyor. Kabarcıklara ne olur? **Küçülür; kaynama durur** / Büyür; kaynama hızlanır / Değişmez. (sahne 4)
4. (yeni durum) Bir dağın tepesinde dış basınç deniz seviyesinden azdır. Orada suyun kaynama sıcaklığı nasıldır? **100 °C'tan düşüktür** / 100 °C'tır / 100 °C'tan yüksektir. (sahne 5, 6)
5. (yeni durum) Su 2069 mmHg dış basınçta kaynıyor. Kabarcıktaki buharın basıncı kaç mmHg'dir? **2069 mmHg** / 760 mmHg / 131 mmHg. (sahne 5, 6)

Özet: Dış basınç düşünce su 50 °C'ta bile kaynar. · Kabarcığın iç basıncı dış basınca ulaşınca kaynama başlar. · Dış basınç arttıkça kaynama noktası yükselir. · **Buhar basıncı dış basınca eşitlenince sıvı kaynar.**

## J2 · Kaynama noktası ve etkileşim türü: hidrojen bağının etkisi

- **Fikir:** Aynı dış basınçta farklı sıvıların kaynama noktası, moleküller arası etkileşimin türüne bağlıdır: etkileşim güçlendikçe kaynama noktası yükselir. Hidrojen bağı içeren üç sıvı arasındaki fark, hidrojen bağı sayısı ile F, O ve N atomlarının elektronegatifliğiyle açıklanır. Saf bir sıvının kaynama noktasını dış basınç ve etkileşimin türü belirler.
- **Giriş ekranı sorusu:** Aynı ocakta, aynı mutfakta su ile etil alkol neden farklı sıcaklıkta kaynar?
- **Kaynak:** Ders kitabı s. 178 (Etkinlik 2.21: 4A–7A gruplarının hidrojenli bileşiklerinin kaynama sıcaklığı grafiği; "kaynama sıcaklığı moleküller arası etkileşim kuvveti ile doğru orantılıdır"; soru 1–2), s. 179 (soru 3–4: beklenenden farklı olanlar; metan 112,65 K London, hidrojen sülfür 213,15 K dipol-dipol, su 373,15 K hidrojen bağı; hidrojen bağı en güçlü etkileşimdir ve hidrojen bağlı maddelerin kaynama sıcaklığı yüksektir; HF iki, su dört hidrojen bağı; hidrojen bağı sayısı arttıkça etkinlik artar; F, O, N ile H arasındaki elektronegatiflik farkı; en büyük fark HF'de, HF'nin NH₃'ten yüksek kaynaması bununla açıklanır; Görsel 2.22; H₂O, HF, NH₃ için kaynama sıcaklıkları ve elektronegatiflik tablosu), s. 184 (saf sıvının kaynama sıcaklığı dış basınca ve etkileşim türüne bağlıdır; aynı ortamda kaynayan farklı sıvıların buhar basınçları eşittir), s. 185 (Kontrol Noktası 2.10: su, etil alkol, dietil eter için 0–100 °C buhar basıncı tablosu; çekim büyükse buhar basıncı düşük, buhar basıncının dış basınca eşitlenmesi için daha çok ısı gerekir, kaynama noktası yükselir; "kaynama sıcaklığı ısıtıcının gücüne, sıvının miktarına ve kabın şekline bağlı değildir"), s. 176–177 (Etkinlik 2.20 yönerge 2 ve deney planı: su, etanol, aseton; kitap sıvıların kaynama sıcaklığını sayıyla vermez, kullanılmaz). Hidrojen bağının ölçütü (F–H, O–H, N–H) G4'ten, buhar basıncı ile çekim ilişkisi I2'den, kaynama koşulu J1'den hatırlanır.
- **Sınır:** Ölçütler yalnızca ikidir: dış basınç (J1) ve moleküller arası etkileşimin türü. Mol kütlesi, molekül büyüklüğü, London kuvvetinin büyüklüğü, çözeltide kaynama noktası yükselmesi yok. Kitabın s. 178 soru 1'i (4A grubunda aşağı inildikçe artışın nedeni) açıklanmaz: 4A'daki artış yalnızca grafikte görülen bir örüntü olarak anılır (kitap cevabı yazmaz; açıklaması programın kapsamı dışındaki mol kütlesi ve London kuvvetinin büyüklüğüne dayanır). Kloroform ve etanoik asitli s. 181–182 grafik ve tablosu kullanılmaz (etkileşim türleri kitapta yazılı değildir). "London < dipol-dipol < hidrojen bağı" sırası yalnızca metan, hidrojen sülfür ve su örneğinde söylenir; genel kural olarak verilmez. Su ile NH₃ arasındaki farkın gerekçesi kitapta yazılı olmadığı için sorulmaz. Kelvin–°C çevrimi, kJ/mol değeri yok.
- **Güç kavramlar ve gösterimi:** (1) "Aynı sıcaklıkta büyük buhar basıncı = aynı dış basınçta düşük kaynama noktası": üç sıvının buhar basıncı çubukları sıcaklık kaydırıcısıyla yükselir; yatay kesikli "1 atm" çizgisini ilk aşan sıvı kaynar işareti alır (`cubukKpa`). (2) Üç etkileşim türü, üç kaynama sıcaklığı: üç çubuk ve her çubuğun yanında iki molekül ve aralarındaki çekim çizgisi (London: ince, dipol-dipol: orta, hidrojen bağı: kalın; hepsi yeşil kesikli) (`kaynamaCubuklari`). (3) "Beklenenden yüksek": dört gruplu çubuk grafiği, her grubun ilk üyesi çerçeveli; 4A'da ilk çubuk en kısa, ötekilerde ilk çubuk ikinciden yüksektir (`hidrurGrafigi`). (4) Hidrojen bağı sayısı: su molekülünün çevresinde dört, HF molekülünün çevresinde iki yeşil kesikli çizgi (Görsel 2.22'nin sadeleştirilmişi) (`hidrojenBagiSayisi`). (5) Elektronegatiflik farkı: H–O, H–F, H–N bağları üç satırda; fark yanında bir çubuk (1,24 · 1,80 · 0,84). (6) Tek tablo: üç sütun (sıvı · dış basınç · kaynama sıcaklığı); iki grup satır, "dış basınç değişir (sıvı sabit)" ve "sıvı değişir (dış basınç sabit)" (`tekTablo`).
- **Hedeflenen yanılgı:** "Hidrojen bağı kuran bütün sıvılar aynı sıcaklıkta kaynar" ve "ısıtıcıyı güçlendirince sıvı daha yüksek sıcaklıkta kaynar".
- **Akılda kalıcı cümle:** Etkileşim güçlendikçe kaynama noktası yükselir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Bir sıvı kaynarken buhar basıncı ile dış basınç nasıldır? **Eşittir** / Buhar basıncı daha büyüktür / Buhar basıncı sıfırdır. (J1) Yanlışta: "Sıvı, buhar basıncı dış basınca eşit olduğunda kaynar."
2. Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden büyük. Hangisinde moleküller arası çekim daha zayıftır? **K'de** / L'de / İkisinde eşit. (I2, daha eski) Yanlışta: "Çekim zayıfladıkça buhar fazına geçen molekül artar; buhar basıncı büyür."

Sonra: "Bugün aynı dış basınçta farklı sıvıların neden farklı sıcaklıkta kaynadığına bakacağız."

### Sahne 2 · Aynı dış basınç, üç sıvı

Tahta: sol yarıda üç sütunlu çubuk grafiği: dietil eter, etil alkol, su (üç ayrı açık gri ton); çubuk yüksekliği buhar basıncı (kPa), her çubuğun üstünde değer etiketi. Üç çubuğu kesen yatay kesikli çizgi: "1 atm ≈ 101,3 kPa". Altında sıcaklık kaydırıcısı (0–100 °C, altı konum). Sağ yarıda başta boş bir tablo: sıvı · "kaynama sıcaklığı". Çizgiyi aşan ya da ona ulaşan çubuğun üstüne "kaynar" etiketi gelir.

Anlatım:
1. Deniz seviyesinde dış basınç 1 atm, yaklaşık 101,3 kPa'dır.
2. Bir araştırmacı üç sıvının buhar basıncını sıcaklık artırarak ölçtü.
3. Sıvı, buhar basıncı 101,3 kPa'a ulaşınca kaynar.

Dene (`c.slider`, "Sıcaklık"; altı konum: 0, 20, 40, 60, 80, 100 °C; `noWait` yönerge: "Sıcaklığı artır; hangi sıvının çubuğu çizgiye önce ulaşıyor?"): çubuklar kitaptaki kPa değerlerine göre yükselir (konumlara göre yukarıdaki üç satır); etiketlerde sayılar görünür; çubuğun değeri 101,3'ü aşınca ya da 100 °C'ta suyun değeri 101,33'e ulaşınca "kaynar" etiketi çıkar. Çubuk ölçeği 0–650 kPa; küçük değerler (su 2,33 gibi) küçük çizilir, etiketten okunur. "Devam", kaydırıcı 100 °C'a getirilince açılır.

Soru (`tag: 'Sıra sende'`): Hangi sıvı 1 atm'de en düşük sıcaklıkta kaynar? **Dietil eter** / Etil alkol / Su. Dayandığı anlatım: 1–3 ve dene. İpuçları: "101,3 kPa'a hangi sıvı en önce ulaştı?" · "40 °C'ta hangi çubuk çizgiyi geçmişti?"

Gör: tablo dolar: dietil eter "20 ile 40 °C arasında", etil alkol "60 ile 80 °C arasında", su "100 °C"; her satırda çubuğun çizgiyi geçtiği ilk iki konum işaretlenir (eter: 20 altında, 40 üstünde; alkol: 60 altında, 80 üstünde; su: 80 altında, 100'de ulaşır).

Sonra:
4. Aynı dış basınçta üç sıvı üç ayrı sıcaklıkta kaynar.
5. Buhar basıncı büyük olan sıvı daha düşük sıcaklıkta kaynar.
6. Aynı sıcaklıkta buhar basıncı büyükse çekim zayıftır.
7. Çekimi güçlü sıvının buhar basıncının yükselmesi için daha çok ısı gerekir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada üç sıvının 20 °C'taki buhar basıncı (dietil eter 58,96 · etil alkol 5,85 · su 2,33 kPa) ve altında "moleküller arası çekim" satırı; satırda yalnızca dietil eter kutusu sorulur ("?"), öbür iki kutu soru çözülünce dolar ("daha güçlü", "en güçlü"). Moleküller arası çekimi en zayıf sıvı hangisidir? **Dietil eter** / Etil alkol / Su. Dayandığı anlatım: 5–7; hatırla sahnesi, 2. İpuçları: "Aynı sıcaklıkta buhar basıncı en büyük olan hangisi?" · "Buhar basıncı büyükse çekim zayıftır."

Sonra:
8. Çekimi en zayıf dietil eter, en düşük sıcaklıkta kaynar.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden büyük. Aynı dış basınçta hangisi daha yüksek sıcaklıkta kaynar? **L** / K / İkisi aynı sıcaklıkta. Dayandığı anlatım: 4–7. İpuçları: "Buhar basıncı büyük olan daha önce kaynıyordu." · "K'nin buhar basıncı L'ninkinden büyük."

Sonra:
9. Etkileşim güçlendikçe sıvı daha yüksek sıcaklıkta kaynar.

Defter ("Etkileşim ve kaynama"): **Etkileşim güçlendikçe kaynama noktası yükselir.** Örnek: eter, alkol, su.

### Sahne 3 · Üç sıvı, üç etkileşim türü

Tahta: üç çubuk yan yana, yükseklik kelvin sırasıyla: metan, hidrojen sülfür, su. Çubukların üstünde "112,65 K", "213,15 K", "373,15 K". Her çubuğun altında iki molekül (E ve G konularındaki gibi nötr gri küreler) ve aralarında yeşil kesikli çekim çizgisi: metan için ince, hidrojen sülfür için orta, su için kalın (iki su molekülü, O···H çizgisi, δ⁺ ve δ⁻ etiketli). Etkileşim adları başta gizli; anlatım ilerledikçe çubukların altına yazılır.

Anlatım:
1. Aynı şartlarda üç sıvının kaynama sıcaklıkları ölçüldü.
2. Metan 112,65 K'de kaynar; molekülleri apolardır.
3. Hidrojen sülfür 213,15 K'de kaynar; molekülleri polardır.
4. Su 373,15 K'de kaynar; molekülleri hidrojen bağı kurar.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada üç satırlı tablo (sıvı · molekül · etkileşim): metan "apolar → London" dolu; su "O–H → hidrojen bağı" dolu; hidrojen sülfür "polar; S–H, hidrojen bağı ölçütünde yok → ?" boş. Hidrojen sülfür molekülleri arasında hangi etkileşim etkindir? **Dipol-dipol** / London kuvveti / Hidrojen bağı. Dayandığı anlatım: 3; G2 ve G4'ten (dipol-dipol; F–H, O–H, N–H ölçütü). İpuçları: "Hidrojen sülfür polar bir moleküldür." · "Hidrojen kükürte bağlı; F, O ya da N'ye değil."

Sonra:
5. Üç sıvıda kaynama sıcaklığı London'dan hidrojen bağına doğru yükselir.
6. Saf maddelerde en güçlü etkileşim hidrojen bağıdır.
7. Hidrojen bağlı sıvıların kaynama sıcaklığı yüksektir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Aynı dış basınçta hidrojen sülfür ile su kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar ve neden? **Su; molekülleri hidrojen bağı kurar** / Hidrojen sülfür; molekülleri polardır / İkisi aynı; ikisi de polardır. Dayandığı anlatım: 3–4, 6–7. İpuçları: "Hangisinde hidrojen bağı var?" · "Hidrojen bağı en güçlü etkileşimdi."

Gör: su çubuğu hidrojen sülfür çubuğunun çok üstünde kalır; iki çubuğun yanında "dipol-dipol" ve "hidrojen bağı" etiketleri.

### Sahne 4 · Beklenenden yüksek olanlar

Tahta: kaynama sıcaklığı (K) grafiği, dört grup çubuk (4A, 5A, 6A, 7A) yan yana, her çubuğun üstünde bileşik adı; eksende sayı yok. İlk önce yalnızca 4A (CH₄, SiH₄, GeH₄, SnH₄) belirir: çubuklar soldan sağa yükselir; CH₄ çubuğunun üstünde "112,65 K". Sonra 5A, 6A, 7A belirir; her grubun ilk üyesi (NH₃, H₂O, HF) çerçevelidir; H₂S çubuğunun üstünde "213,15 K", H₂O çubuğunun üstünde "373,15 K". Çubuk yüksekliği grafikten okunan yaklaşık sıradır (çizim notları).

Anlatım:
1. Grafik, dört gruptaki hidrojenli bileşiklerin kaynama sıcaklığını gösterir.
2. 4A'da yukarıdan aşağı inildikçe kaynama sıcaklığı artar.
3. 5A, 6A ve 7A'da ilk bileşik ikinciden daha yüksektir.

Soru (`tag: 'Sıra sende'`; grafik okuma): 5A, 6A ve 7A'da, ilk bileşiği ikinciden yüksek olan üç bileşik hangileridir? **NH₃, H₂O, HF** / PH₃, H₂S, HCl / AsH₃, H₂Se, HBr. Dayandığı anlatım: 2–3. İpuçları: "Her grupta ilk iki çubuğu karşılaştır." · "4A'da ilk çubuk en kısaydı; burada öyle değil."

Gör: NH₃, H₂O ve HF çubukları vurgulanır; ikinci çubuklarla aralarında bir ok.

Sonra:
4. NH₃'te N–H, H₂O'da O–H, HF'de F–H bağı vardır.
5. Bu üçü hidrojen bağı kurar; ötekiler kuramaz.

Soru (`tag: 'Sıra sende'`): Hidrojen bağı, sıvının kaynama sıcaklığını nasıl etkiler? **Yükseltir** / Düşürür / Etkilemez. Dayandığı anlatım: 3–5; sahne 3, 5–7. İpuçları: "NH₃, H₂O ve HF'nin çubukları beklenenden yüksek." · "Üçünde de hidrojen bağı var."

Sonra:
6. Hidrojen bağı, kaynama noktasını beklenenden yüksek yapar.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): HF ile HBr aynı dış basınçta kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar? **HF** / HBr / İkisi aynı sıcaklıkta. Dayandığı anlatım: 3–6. İpuçları: "Hangisinde F–H, O–H ya da N–H bağı var?" · "Grafikte HF çubuğu 7A'nın ilk çubuğuydu."

Defter ("Hidrojen bağı"): **Hidrojen bağı kaynama noktasını yükseltir.** Örnek: H₂O, HF, NH₃.

### Sahne 5 · Hidrojen bağı sayısı ve elektronegatiflik farkı

Tahta: üç satırlı tablo: bileşik · kaynama sıcaklığı (°C, 1 atm; başta gizli) · atomların elektronegatifliği (başta gizli): H₂O · 100 · "H 2,20 · O 3,44"; HF · 19,5 · "H 2,20 · F 4,00"; NH₃ · −33,3 · "H 2,20 · N 3,04". Tablonun yanında düşey bir sıcaklık çubuğu (üç çubuk, °C ekseni, değerleri etiketli; başta boş). Anlatım ilerledikçe sağda su ve HF molekül çiftleri: bir su molekülünün çevresinde dört, bir HF molekülünün çevresinde iki yeşil kesikli çizgi (Görsel 2.22'nin sadeleştirilmişi; δ⁺ ve δ⁻ etiketli).

Anlatım:
1. Su, HF ve NH₃ hidrojen bağı kurar.
2. Üçü de aynı dış basınçta, 1 atm'de kaynatıldı.
3. Her su molekülü dört, her HF molekülü iki hidrojen bağı kurabilir.

Tahmin (`tag: 'Tahmin et'`; anlatılandan çıkar): Su ile HF 1 atm'de kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar? **Su** / HF / İkisi aynı sıcaklıkta. Dayandığı anlatım: 1–3; sahne 3, 6–7. İpuçları: "Hidrojen bağı çoksa çekim daha güçlüdür." · "Çekim güçlü olunca kaynama sıcaklığı yükselir."

Gör: tablonun kaynama sütunu dolar (100, 19,5, −33,3 °C); düşey çubuklarda su en yüksektedir; su ve HF molekülleri çevresindeki çizgiler sayılır (4 ve 2).

Sonra:
4. Su 100 °C'ta, HF 19,5 °C'ta, NH₃ −33,3 °C'ta kaynar.
5. Hidrojen bağı sayısı arttıkça hidrojen bağının etkinliği artar.
6. Su, daha çok hidrojen bağı kurduğu için HF'den yüksek kaynar.
7. HF ile NH₃ arasındaki farka elektronegatifliklerden bakalım.
8. Hidrojenin elektronegatifliği 2,20; F, O, N bundan büyüktür.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada üç satır: "H–O: 3,44 − 2,20 = 1,24"; "H–N: 3,04 − 2,20 = 0,84"; "H–F: 4,00 − 2,20 = ?". H–F bağında elektronegatiflik farkı kaçtır? **1,80** / 1,24 / 6,20. Dayandığı anlatım: 8 ve tablo. İpuçları: "Büyük değerden küçüğü çıkar." · "F'nin değeri 4,00, hidrojenin 2,20."

Sonra:
9. En büyük elektronegatiflik farkı H–F bağındadır.
10. Fark büyüdükçe kısmi yük yoğunluğu ve moleküller arası çekim artar.
11. Bu yüzden HF, NH₃'ten daha yüksek sıcaklıkta kaynar.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; üç kutu: "Etkileşimin türü", "Hidrojen bağı sayısı", "Elektronegatiflik farkı"; her kartta iki sıvı ve kaynama sıcaklıkları; kart doğru kutuya oturunca altına cümle düşer). Soru: bu iki sıvının kaynama sıcaklığı farkını hangi ölçüt açıklar?
- Metan (112,65 K) ile hidrojen sülfür (213,15 K) → **Etkileşimin türü**. "London ve dipol-dipol; etkileşimin türü farklı."
- Hidrojen sülfür (213,15 K) ile su (373,15 K) → **Etkileşimin türü**. "Dipol-dipol ve hidrojen bağı; etkileşimin türü farklı."
- Su (100 °C) ile HF (19,5 °C) → **Hidrojen bağı sayısı**. "İkisi de hidrojen bağı kurar; su dört, HF iki bağ kurar."
- HF (19,5 °C) ile NH₃ (−33,3 °C) → **Elektronegatiflik farkı**. "İkisi de hidrojen bağı kurar; H–F bağında fark en büyük."

Dayandığı anlatım: bu sahne, 3–11; sahne 3, 5–7.

Defter ("Hidrojen bağlı sıvılar"): **Bağ sayısı ve elektronegatiflik farkı belirler.** Örnek: su, HF, NH₃.

### Sahne 6 · Tek tabloda: dış basınç ve sıvı türü

Tahta: tek bir tablo, üç sütun: sıvı · dış basınç · kaynama sıcaklığı. İki grup satırı için iki bölüm başlığı: "dış basınç değişir (sıvı sabit)" ve "sıvı değişir (dış basınç sabit)"; başta boş. Kartlar sırayla ortaya gelir; doğru seçilince kartın satırları ilgili bölüme düşer. Dış basınç birimleri tabloda olduğu gibi yazılır ("1 atm = 760 mmHg" tablonun altında sabit).

Anlatım:
1. Kaynama sıcaklığını iki şey değiştirebilir: dış basınç ve sıvı.
2. Bir etkiyi görmek için yalnızca birini değiştirmek gerekir.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; iki kutu: "Dış basıncın etkisi", "Sıvı türünün etkisi"; kart doğru kutuya oturunca altına cümle düşer ve satırlar tabloya yazılır):
- "Su: 760 mmHg'de 100 °C, 3517 mmHg'de 149 °C" → **Dış basıncın etkisi**. "Sıvı aynı, dış basınç farklı."
- "Su, HF, NH₃ (1 atm): 100 °C, 19,5 °C, −33,3 °C" → **Sıvı türünün etkisi**. "Dış basınç aynı, sıvı farklı."
- "Su: 1 atm'de 100 °C, 0,3 atm'de 70 °C" → **Dış basıncın etkisi**. "Sıvı aynı, dış basınç farklı."
- "Dietil eter, etil alkol, su (1 atm): 101,3 kPa'a 20–40, 60–80, 100 °C'ta ulaşırlar" → **Sıvı türünün etkisi**. "Dış basınç aynı, sıvı farklı."

Dayandığı anlatım: bu sahne, 1–2; J1 sahne 5–6; bu dersin sahne 2, 5.

Sonra:
3. Aynı sıvıda dış basınç değişince kaynama sıcaklığı değişti.
4. Aynı dış basınçta sıvı değişince kaynama sıcaklığı değişti.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Bir öğrenci "Sıvı türü, kaynama sıcaklığını değiştirir" iddiasını sınamak istiyor. Hangi iki ölçüm yeterlidir? **Aynı dış basınçta iki farklı sıvının kaynama sıcaklığı** / Aynı sıvının iki farklı dış basınçta kaynama sıcaklığı / Farklı sıvıların farklı dış basınçlardaki kaynama sıcaklığı. Dayandığı anlatım: 1–4. İpuçları: "Sıvı türünün etkisini görmek için hangisi sabit kalmalı?" · "Son seçenekte iki şey birden değişiyor."

Defter ("İki ölçüt"): **Dış basınç ve etkileşim türü kaynama noktasını belirler.** Örnek: su, 1 atm, 100 °C.

### Sahne 7 · Neler belirler, neler belirlemez?

Tahta: iki kutu: "Kaynama noktasını belirler", "Belirlemez". Beş kart sırayla öne çıkar.

Anlatım:
1. Kaynama noktası ısıtıcının gücüne bağlı değildir.
2. Sıvının miktarına ve kabın şekline de bağlı değildir.
3. Saf sıvının kaynama noktasını iki ölçüt belirler.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; kart doğru kutuya oturunca altına cümle düşer):
- "Sıvı yüzeyine etki eden dış basınç" → **Belirler**. "Dış basınç arttıkça kaynama noktası yükselir."
- "Moleküller arası etkileşimin türü" → **Belirler**. "Etkileşim güçlendikçe kaynama noktası yükselir."
- "Isıtıcının gücü" → **Belirlemez**. "Daha güçlü ısıtınca sıvı daha çabuk kaynar, daha yüksek sıcaklıkta değil."
- "Sıvının miktarı" → **Belirlemez**. "Miktar değişse de kaynama noktası aynı kalır."
- "Kabın şekli" → **Belirlemez**. "Kap değişse de kaynama noktası aynı kalır."

Dayandığı anlatım: bu sahne, 1–3; J1 sahne 5, 9; bu dersin sahne 6, 3–4.

Sonra:
4. Gerisi sabit kalırsa kaynama noktasını bu iki ölçüt belirler.

### Sahne 8 · İddiayı kanıtla

Tahta: üç kutu: "İddia", "Kanıt", "Gerekçe" (J1 sahne 7'deki çerçeve); başta boş, kutular tek tek dolar. Her seçimden sonra dolu kutu çerçevelenir.

Anlatım:
1. İddia: hidrojen bağı, sıvının kaynama noktasını yükseltir.

Birlikte çöz (`tag: 'Birlikte çöz'`): İddia kutusu dolu. Bu iddiayı hangi veri destekler? **Su 373,15 K'de, hidrojen sülfür 213,15 K'de, metan 112,65 K'de kaynar** / Metan 112,65 K'de kaynar / Su 100 °C'ta, 0,3 atm'de 70 °C'ta kaynar. Dayandığı anlatım: sahne 3, 1–7; sahne 4, 4–6. İpuçları: "Hidrojen bağı kuran bir sıvıyı, kurmayanlarla karşılaştıran veri hangisi?" · "Bir tek sıvının değeri karşılaştırma vermez."
Geri bildirim: "Üç sıvı yan yana: hidrojen bağlı olan en yüksekte." · "Tek bir değer karşılaştırma sunmaz." · "Bu veri dış basıncın etkisini gösteriyor, hidrojen bağının değil."

Sonra:
2. Kanıt hazır; şimdi gerekçeyi bulalım.

Soru (`tag: 'Sıra sende'`): İddia ve kanıt dolu. Gerekçe hangisidir? **Hidrojen bağı çekimi güçlendirir; buhar basıncının dış basınca ulaşması için daha çok ısı gerekir** / Hidrojen bağı dış basıncı artırır / Hidrojen bağı sıvıyı soğutur. Dayandığı anlatım: sahne 2, 5–9; sahne 3, 6–7. İpuçları: "Çekim güçlüyse buhar basıncı nasıldı?" · "Kaynama için buhar basıncı neye eşitlenmeliydi?"

Sonra:
3. İddia, kanıt ve gerekçe birlikte tam bir açıklama oluşturur.

Soru (`tag: 'Sıra sende'`; yeni durum, yanılgı): Bir öğrenci "HF ile HCl aynı dış basınçta aynı sıcaklıkta kaynar" diyor. Hangi veri bu iddiayı çürütür? **Grafikte HF çubuğu HCl çubuğundan yüksektir** / HF'de F–H bağı vardır / HCl'nin elektronegatifliği 3,16'dır. Dayandığı anlatım: sahne 4, 3–6. İpuçları: "Çürütmek için iki sıvının kaynama sıcaklığını karşılaştıran bir veri gerekir." · "Bağ ya da elektronegatiflik, ölçülmüş bir kaynama sıcaklığı değildir."

Sonra:
4. Saf sıvının kaynama sıcaklığı dış basınca ve etkileşim türüne bağlıdır.

Tahtada kısa karşılaştırma: öğrencinin iki iddiası ("Dış basınç düşünce kaynama noktası düşer." · "Hidrojen bağı kaynama noktasını yükseltir.") ile bilimsel bilgi cümlesi "Saf sıvının kaynama sıcaklığı sıvı yüzeyine etki eden dış basınca ve moleküller arası etkileşimin türüne bağlıdır." yan yana. Altyazı: "Bilimsel bilgi iki iddiayı da doğrular."

### Çıkış soruları

1. (yeni durum) İki sıvının buhar basıncı aynı sıcaklıkta farklıdır; birinin moleküller arası çekimi daha kuvvetlidir. Aynı dış basınçta bu sıvının kaynama noktası nasıldır? **Daha yüksektir** / Daha düşüktür / Aynıdır. (sahne 2)
2. (yeni durum) HF ile HBr aynı dış basınçta kaynatılıyor. HF'nin daha yüksek kaynamasının nedeni nedir? **HF hidrojen bağı kurar** / HF daha büyük bir moleküldür / HF'nin buhar basıncı daha büyüktür. (sahne 4)
3. (yanılgı) Su, HF ve NH₃ hidrojen bağı kurar. Kaynama sıcaklıkları için hangisi doğrudur? **Hidrojen bağı sayısı ve elektronegatiflik farkı yüzünden farklıdır** / Hepsi hidrojen bağı kurduğu için aynıdır / Hepsi 100 °C'ta kaynar. (sahne 5)
4. (yeni durum) Bir öğrenci dış basıncın etkisini sınamak istiyor. Hangi ölçümleri karşılaştırmalıdır? **Aynı sıvının iki farklı dış basınçta kaynama sıcaklığını** / İki farklı sıvının aynı dış basınçta kaynama sıcaklığını / İki farklı sıvının iki farklı basınçta kaynama sıcaklığını. (sahne 6)
5. (yanılgı) Bir öğrenci "Isıtıcıyı güçlendirirsem su 1 atm'de daha yüksek sıcaklıkta kaynar" diyor. Doğru mu? **Hayır; kaynama noktası ısıtıcının gücüne bağlı değildir** / Evet; ısı arttıkça kaynama noktası yükselir / Hayır; yalnızca kabın şekline bağlıdır. (sahne 7)

Özet: Çekim güçlendikçe kaynama noktası yükselir. · Hidrojen bağı kaynama noktasını beklenenden yüksek yapar. · Hidrojen bağı sayısı ve F, O, N'nin elektronegatifliği hidrojen bağlı sıvılar arasındaki farkı açıklar. · **Etkileşim güçlendikçe kaynama noktası yükselir.**

## J3 · Konu tekrarı: Kaynama sıcaklığı (`j3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (kabarcık ve iki basınç oku · grafikte buhar basıncı eğrisi ve kesikli çizgi · basınç–sıcaklık tablosundan iki satır · üç çubuk ve çekim çizgileri · hidrojenli bileşik grafiğinden üç yüksek çubuk · iki ölçüt kutusu) ve deftere düşer; biten kural soluklaşır. Altı kuralın yanındaki çizimler tek çerçevede görünür; küçük çizimlerin yazısı etiketten ibarettir.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Buhar basıncı dış basınca eşitlenince sıvı kaynar.
3. Dış basınç arttıkça kaynama noktası yükselir.
4. Etkileşim güçlendikçe kaynama noktası yükselir.
5. Hidrojen bağı, kaynama noktasını beklenenden yüksek yapar.
6. Hidrojen bağı sayısı ve elektronegatiflik farkı aralarındaki farkı açıklar.
7. Saf sıvının kaynama noktasını dış basınç ve etkileşim türü belirler.

Sorular (`quiz`, karışık sırada):

1. Kaynayan bir sıvıda kabarcığın içindeki buharın basıncı için hangisi doğrudur? **Dış basınca eşittir** / Dış basınçtan küçüktür / Dış basınçtan büyüktür. — J1
2. Kapaklı bir kapta suyun üstündeki dış basınç artırılıyor. Kaynama sıcaklığı nasıl değişir? **Yükselir** / Düşer / Değişmez. — J1
3. Bir dağın tepesinde su 100 °C'tan düşük bir sıcaklıkta kaynıyor. Bunun nedeni nedir? **Dış basınç deniz seviyesinden azdır** / Su orada daha saftır / Isıtıcı orada daha zayıftır. — J1
4. Su 1862 mmHg'de 127 °C'ta kaynıyor. Basınç 2896 mmHg'ye çıkarılırsa kaynama sıcaklığı nasıl olur? **127 °C'tan yüksek** / 127 °C'tan düşük / 127 °C. — J1
5. Aynı sıcaklıkta K sıvısının buhar basıncı L'ninkinden büyük. Aynı dış basınçta hangisi daha düşük sıcaklıkta kaynar? **K** / L / İkisi aynı sıcaklıkta. — J2
6. HF ile HCl aynı dış basınçta kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar? **HF** / HCl / İkisi aynı sıcaklıkta. — J2
7. Su 100 °C'ta, HF 19,5 °C'ta kaynar (1 atm). Aradaki farkı hangi ölçüt açıklar? **Su dört, HF iki hidrojen bağı kurabilir** / HF'de hidrojen yoktur / Su daha yüksek dış basınçta kaynar. — J2
8. Hangisi saf bir sıvının kaynama noktasını belirleyen ölçütlerden biridir? **Moleküller arası etkileşimin türü** / Kabın şekli / Ocağın gücü. — J2

Akılda kalıcı cümle: Kaynama noktasını dış basınç ve etkileşimin türü belirler.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.10) | Karşılığı |
|---|---|
| a) Sıvıların kaynama sıcaklığını etkileyen faktörleri belirlemeye yönelik ölçütler (moleküller arası etkileşimin türü ve açık hava basıncı) belirler | J1 sahne 3–6 (dış basınç ölçütü); J2 sahne 2–5 (etkileşim ölçütü), sahne 6–7 (iki ölçütün ayrıştırılması ve kaynama noktasını belirleyenler / belirlemeyenler). Ölçütü öğrencinin kendisinin yazması ve tartışması `site dışı (sınıfta yapılır)`; sitede seçenekli sınıflandırma (`benzetim`) |
| b) Gözlem veya hazır veri setinden seçtiği verileri değişkenler arası ilişkileri belirleyecek şekilde düzenler | J1 sahne 6 (basınç–kaynama sıcaklığı tablosu ve nokta grafiği); J2 sahne 6 (dış basınç ve sıvı türü, tek tablo) |
| c) Kaynama sıcaklığını etkileyen faktörlere yönelik iddialarını kanıtlara dayalı açıklar | J1 sahne 7 (iddia, kanıt, gerekçe; iddiayı çürütme); J2 sahne 8 |
| Uygulama: suyun 100 °C'tan farklı sıcaklıklarda kaynayabildiği gösteri deneyi ya da video | J1 sahne 2 (şırınga deneyi, benzetim); sahne 5 (Everest'in zirvesi) |
| Uygulama: saf sıvıların kaynama özelliği ve kaynama sıcaklığına etki eden faktörlerin ölçütleri; sınıf içi tartışma | J1 sahne 3–5; J2 sahne 7. Sınıf içi tartışma `site dışı (sınıfta yapılır)` |
| Uygulama: ölçütler (sıvı yüzeyine etki eden açık hava basıncı ve moleküller arası etkileşimin türü) | J1 sahne 4–6; J2 sahne 2–7 |
| Uygulama: hidrojen bağının sıvıların kaynama noktasına etkisinin verilen kanıtlar üzerinden değerlendirilmesi | J2 sahne 3 (metan, hidrojen sülfür, su), sahne 4 (hidrojenli bileşiklerin grafiği) |
| Uygulama: hidrojen bağı içeren sıvıların kaynama noktası farkı; hidrojen bağı sayısı ve F, O, N atomlarının elektronegatiflik değerleri | J2 sahne 5 |
| Uygulama: saf bir sıvının sıcaklık–buhar basıncı grafiği ve kaynamanın tanecikli modeli | J1 sahne 3–4 (tanecikli model), sahne 5 (grafik) |
| Uygulama: sıvının buhar basıncının dış basınca eşit olduğu sıcaklıkta kaynadığı çıkarımı | J1 sahne 5 (tahmin, gör, sonuç) |
| Uygulama: hem dış basıncın hem sıvı türünün kaynama noktasına etkisini açıklamak için verilerin düzenlenmesi | J1 sahne 6; J2 sahne 6 |
| Uygulama: dış basıncın kaynama noktasına etkisini gösteren kanıtlarla iddia | J1 sahne 6–7 |
| Uygulama: açıklamayı bilimsel bilgilerle destekleme; dış basınç ve sıvı türünün etkisinin sınıf içi tartışmada belirtilmesi ve bilimsel bilgiyle karşılaştırılması | J1 sahne 7 (son karşılaştırma); J2 sahne 8 (son karşılaştırma). Sınıf içi tartışma `site dışı (sınıfta yapılır)` |
| Uygulama: grup arkadaşlarıyla dayanışma içinde çalışma, saygı kuralları | Derslerde yok (`site dışı (sınıfta yapılır)`) |
| Kitabın Etkinlik 2.20 yönerge 2 deneyi (su, etanol, aseton; erlenmayer ve ısıtıcıyla) | `site dışı (sınıfta yapılır)`; kitap sonuçları sayıyla vermediği için yerine J2 sahne 2'deki buhar basıncı tablosu geçer |
| Anahtar kavram: kaynama noktası | J1 sahne 3–5 |
| Konu tekrarı (`KURALLAR.md` 3.4) | J3 |

Fazla olan: (1) Şırıngada piston çekilince suyun yüzeyine etki eden basıncın azaldığı (J1 sahne 2, 4): kitap sonucu (su kaynar) açıkça yazmaz; sonuç s. 184'teki Görsel 2.28 cümlesinden ("basınç azaltılırsa kabarcık oluşur ve kaynama gerçekleşir") ve Etkinlik 2.20'nin soru 3'ünden çıkarıldı. (2) "Saf sıvı sabit basınçta kaynarken sıcaklığı değişmez; ısı çekimi kırmaya gider" (J1 sahne 5, madde 9–10; kitap s. 184): program "saf sıvıların kaynama özelliği"ni anar, bu bilgi kaynama noktasının tek bir değer olmasının dayanağıdır. (3) "Isıtıcının gücüne, sıvının miktarına ve kabın şekline bağlı değildir" (J2 sahne 7; kitap s. 185): programın ölçütleri iki; bu cümle ölçüt eklemez, yalnızca "belirlemez" kutusunu doldurur ve yanılgıyı hedefler. (4) "Saf maddelerde en güçlü etkileşim hidrojen bağıdır" (J2 sahne 3; kitap s. 179): program "hidrojen bağının sıvıların kaynama noktasına etkisi"ni ister; G4 yalnızca "dipol-dipolden güçlü" demişti. (5) Elektronegatiflik farklarının hesabı (3,44 − 2,20 gibi; J2 sahne 5): kitap yalnızca değerleri verip "en büyük fark HF'de" der; çıkarma işlemi dersin kendisidir. (6) Buhar basıncı tablosunun (s. 185) I2'de kullanılmış olması: J2 sahne 2'de aynı tablo kaynama okuması için yeniden kullanıldı (karar 15'in izin verdiği ölçüde). (7) 4A grubunda artış örüntüsü (J2 sahne 4, madde 2): açıklaması verilmeden yalnızca grafik okuması olarak anılır. Eksik olan: öğrencinin kendi ölçütünü yazması, sınıf içi tartışma, gerçek gösteri deneyi ve video, kitabın Etkinlik 2.20 yönerge 2 deneyi, grup çalışması, kitabın s. 181–182'deki dört sıvılı grafik ve tablo (kloroform, etanol, su, etanoik asit; etkileşim türleri kitapta yazılı değil) — hepsi `site dışı` ya da kullanılmadı.

## Çizim notları (kit için)

- `sirinca(opts)`: beherglas (su, termometre "yaklaşık 50 °C", ocak), şırınga (su, ucu parmakla kapalı), piston (konumu değişir). Seçenekler: piston konumu (yerinde / geri çekilmiş), kabarcıklar (yok / var), dış basınç okları (kalın / ince). Etiketsiz bırakılır; gerekli yazı tahta düzeninden eklenir.
- `kabarcikModeli(opts)`: sıvı kesiti: nötr gri su molekülleri (iki atomlu küre modelinin sadeleştirilmişi), aralarında ince yeşil çekim çizgileri; hareket izi (yok / kısa / uzun); iç kısımdan kopan buhar molekülleri (izli); kabarcık (çevresinde açık daire; içinde yalnızca buhar molekülleri). Oklar: dış basınç (dıştan içe, koyu gri), iç basınç (içten dışa, koyu gri); okların kalınlığı seçenektir (artar / azalır). Animasyon: kabarcığın oluşması, büyümesi, küçülüp kaybolması (J1 sahne 4'te iki yan yana).
- `buharGrafigi(opts)`: eksenler (sıcaklık °C; buhar basıncı mmHg: 200, 400, 600, 760); su eğrisi (tek, yükselen); yatay kesikli çizgi (seçenek: "1 atm" ya da "0,3 atm"); eğriyi kestiği noktadan düşey çizgi ve eksende "100 °C" ya da "70 °C"; kesişme noktasında küçük kabarcık simgesi. Eğri ölçekli bir ilişki iddiasında değildir, yalnızca artış gösterir; 0,3 atm çizgisi 200 ile 400 işaretleri arasında bir yerde durur, yanına sayı yazılmaz.
- `kaynamaDeney(opts)`: kapaklı kap (üstünde dış basınç okları, kalınlığı konuma göre), termometre, sağda tablo (iki sütun) ve altında nokta grafiği. Kaydırıcı sekiz konumludur (J1 sahne 6'daki sayılar). "Tabloya yaz" düğmesi satır ekler ve noktayı grafiğe koyar; satırlar basınca göre sıralı görünür.
- `iddiaCercevesi()`: yan yana üç kutu ("İddia", "Kanıt", "Gerekçe"); kutular tek tek dolar; dolan kutu çerçevelenir.
- `cubukKpa(opts)`: üç sıvı çubuğu (dietil eter, etil alkol, su; üç açık gri ton), ortak ölçek 0–650 kPa, değer etiketleri, yatay kesikli "1 atm ≈ 101,3 kPa" çizgisi, altı konumlu sıcaklık kaydırıcısı; çubuk çizgiye ulaşınca ya da aşınca üstüne "kaynar" etiketi. Sağda sıvı–kaynama sıcaklığı tablosu (aralıklar).
- `kaynamaCubuklari(opts)`: üç çubuk (metan, hidrojen sülfür, su; kelvin ölçeği; değerler yalnızca bu üç çubukta yazılı); altlarında iki molekül ve yeşil kesikli çekim çizgisi (ince / orta / kalın). Su için δ⁺ ve δ⁻ etiketleri; metan ve hidrojen sülfür molekülleri E ve G konularındaki uzay-dolgu gösteriminin küçültülmüş hâlidir.
- `hidrurGrafigi(opts)`: dört grup, on altı çubuk, ortak "kaynama sıcaklığı (K)" ekseni, eksende sayı yok. Çubuk adları: 4A CH₄, SiH₄, GeH₄, SnH₄; 5A NH₃, PH₃, AsH₃, SbH₃; 6A H₂O, H₂S, H₂Se, H₂Te; 7A HF, HCl, HBr, HI. Grafikten okunan yaklaşık yükseklikler (yalnızca çizim için; hiçbir çubuğa yazılmaz; kitabın şeklindeki sırayı ve farkları korur): CH₄ 112,65 (metin değeri; grafikte biraz altında görünür) · SiH₄ ≈160 · GeH₄ ≈190 · SnH₄ ≈225 · NH₃ ≈240 · PH₃ ≈175 · AsH₃ ≈212 · SbH₃ ≈260 · H₂O 373,15 · H₂S 213,15 · H₂Se ≈235 · H₂Te ≈275 · HF ≈290 · HCl ≈188 · HBr ≈205 · HI ≈225. Seçenekler: gruplar sırayla belirir; ilk üyeleri çerçeveleme; üç yüksek çubuğu vurgulama.
- `hidrojenBagiSayisi(opts)`: bir su molekülünün çevresinde dört, bir HF molekülünün çevresinde iki yeşil kesikli hidrojen bağı çizgisi (kitaptaki Görsel 2.22'nin sadeleştirilmişi); çizgiler tek tek belirir ve sayılır; oksijen ve flor δ⁻ (mavi), hidrojen δ⁺ (turuncu). G konusundaki `hidrojenBagiZinciri` yeniden kullanılabilir.
- `tekTablo(opts)`: üç sütunlu tablo (sıvı · dış basınç · kaynama sıcaklığı); iki bölüm başlığı; kart seçimi doğru olunca satırlar ilgili bölüme yerleşir. Altta sabit satır: "1 atm = 760 mmHg".
- `sinifla`/`kartSecim`: kitte var (kart başına seçim). Karşılaştırma kartlarında iki sıvı yan yana ve kaynama sıcaklıkları (K ya da °C, kitaptaki birimle) yazılıdır.

## Raporda bildirilecekler (ana oturum için)

Bu bölüm yazarın notudur; ders yazılırken öğrenciye gösterilmez.

- **`PLAN.md` bölüm 8'de olmayan, kitaptan alınan bilgiler:** (1) s. 175: kaynama ve buharlaşma tanımları (ön bilgi; yalnızca kaynama noktasının tanımı alınır); Etkinlik 2.20'nin işlem basamakları (100 mL su, 250 mL beherglas, ispirto ocağı, termometre; havası boşaltılmış şırıngaya su çekilir). (2) s. 176–177: Etkinlik 2.20 yönerge 2 ve deney planı (su, etanol, aseton; 150 mL; üç dakikada bir sıcaklık okuma); kitap kaynama sıcaklıklarını sayıyla vermez; derste kullanılmadı. (3) s. 178: Etkinlik 2.21'in grafiği (4A–7A hidrojenli bileşikleri, 16 çubuk) ve kitabın "kaynama sıcaklığı moleküller arası etkileşim kuvveti ile doğru orantılıdır" cümlesi. (4) s. 179: "saf maddelerdeki etkileşimlerin en güçlüsü hidrojen bağıdır; bu özellik hidrojen bağlı maddelerin yüksek kaynama sıcaklığına sahip olmasını sağlar"; "hidrojen bağı sayısı arttıkça etkinliği artar"; F, O, N ile H arasındaki elektronegatiflik farkının kısmi yük yoğunluğunu ve çekimi artırması; Görsel 2.22 (H₂O, NH₃, HF zincirleri). (5) s. 180: 1 atm = 76 cmHg = 760 mmHg = 101,325 kPa; Grafik 1 ve 2'nin eksen işaretleri (20–100 °C; 200, 400, 600, 760, 800 mmHg); iki ortamdaki 20 °C'lık kapların kaynamadığı (alınmadı). (6) s. 181: soru 2–6 (cevap anahtarı yok) ve 2. Yönerge'nin dört sıvılı grafiği (kloroform, etanol, su, etanoik asit; 101,325 kPa çizgisi) ile s. 182'deki tablo (kullanılmadı). (7) s. 183: Görsel 2.23–2.26'daki oluşum basamakları (hızlanma, buhar molekülleri, kabarcık, iç ve dış basınç). (8) s. 184: Görsel 2.27–2.28 (basıncın artması ve azalması); "aynı ortamda kaynayan farklı sıvıların buhar basınçları eşittir" (bölüm 8'de var); "sabit basınç altında kaynarken saf sıvıların sıcaklıkları değişmez; ısı çekimi kırmaya gider"; "kaynama sıcaklığı dış basınca ve moleküller arası etkileşim türüne bağlıdır". (9) s. 185: "kaynama sıcaklığı ısıtıcının gücüne, sıvının miktarına ve kabın şekline bağlı değildir"; Kontrol Noktası 2.10'un elektrostatik potansiyel haritaları (kullanılmadı) ve soru 1–4.
- **`PLAN.md` bölüm 8 ile kitap arasındaki tutarsızlıklar:** (1) Bölüm 8 "yaklaşık 50 °C'taki su şırıngaya çekilir, ucu kapatılıp piston çekilince su kaynar (s. 175–176)" der; kitap sonuç cümlesini yazmaz (s. 175 işlem basamakları şırınganın ucunun kapatılmasıyla biter; s. 176'da yalnızca değerlendirme soruları vardır). Sonuç, program metni ("100 °C'tan farklı sıcaklıkta kaynadığı gözlemlenir") ve s. 184'teki Görsel 2.28'den çıkarıldı. (2) Bölüm 8 metan için 112,65 K diyor ve kitabın s. 179'u da öyle yazıyor; s. 178'deki grafikte metan çubuğu bu değerin biraz altında görünüyor (yaklaşık 100 K). Derste çubuğa metindeki değer yazıldı. (3) Bölüm 3'te J1 madde 4 "kaydırıcı: dış basınç; kaynama noktası grafikten okunur" der; kitabın basınç–kaynama sıcaklığı verisi grafik değil tablodur (s. 181, sekiz satır); grafik (s. 181 sol) dört sıvının buhar basıncı eğrileridir, suyun farklı basınçlardaki kaynama noktası grafiği yoktur. Derste sıcaklık tablodan okunur, nokta grafiği öğrencinin kendi satırlarından çizilir. (4) Kitabın Etkinlik 2.22 soru 4'ü (Everest'te buhar basıncı kaç mmHg?) cevabı için 0,3 × 760 işlemini gerektirir; kitap 228 yazmaz; derste "0,3 atm" olarak bırakıldı. (5) Program 10.a'da "açık hava basıncı" der; kitap yalnızca "dış basınç" ve "sıvı yüzeyine etki eden basınç" terimlerini kullanır. Ders kitabın terimini izler; "açık hava basıncı" sözü geçmez.
- **Kitapta bulunamadığı için yazılmayanlar:** etil alkol ve dietil eterin kaynama sıcaklıkları (sayı olarak yazılı değil; yalnızca kPa tablosundan aralık okunur); etanol ve asetonun kaynama sıcaklıkları; NH₃ molekülünün kaç hidrojen bağı kurabildiği; su ile NH₃ arasındaki kaynama sıcaklığı farkının gerekçesi; 4A grubunda artışın nedeni (kitabın sorusu, cevabı yok); Everest'te buhar basıncının mmHg karşılığı; yirmişer derece arasındaki ara sıcaklıklarda buhar basıncı ve basınç tablosundaki ara basınçlarda kaynama sıcaklığı; sıvıların elektrostatik potansiyel haritalarının yorumu.
- **Programa göre kuşkulu içerik:** (1) J2 sahne 7'deki "ısıtıcı gücü, miktar, kap şekli belirlemez" kartları ve J1 sahne 5'teki "kaynarken sıcaklık değişmez": programın yazmadığı, kitabın yazdığı bilgilerdir; ölçüt sayısını (iki) değiştirmez, ama kullanıcı gerekli görmezse çıkarılabilir (derslerin çıkış soruları J2 5. soru ve J1 sahne 5 madde 9–10 etkilenir). (2) "London < dipol-dipol < hidrojen bağı" yalnızca üç sıvıda görülen bir sıradır; derste genel kural olarak söylenmez; kitap London ile dipol-dipol arasında genel bir sıralama yazmaz. (3) J2 sahne 4'te 4A'daki artış, "beklenen" örüntüyü kurmak için gözlem olarak kullanılır; nedeni (mol kütlesi, London kuvvetinin büyüklüğü) programda yoktur ve açıklanmaz. (4) Elektronegatiflik farkı hesabı (J2 sahne 5): kitap yalnızca "en büyük fark HF'dedir" der; çıkarma derste yapılır. Hidrojen bağı bulunan üç sıvıda sıra (H₂O > HF > NH₃) iki ayrı ölçütle açıklanır; H₂O'nun elektronegatiflik farkı (1,24) HF'ninkinden (1,80) küçüktür, ama su HF'den yüksek kaynar; kitap bunu hidrojen bağı sayısıyla açıklar. Ders bu iki karşılaştırmayı ayrı tutar (su–HF: bağ sayısı; HF–NH₃: fark) ve "su ile NH₃ arasındaki farkı" sormaz. (5) Etil alkol ile dietil eter arasındaki fark yalnızca çekim sırası olarak anılır; etkileşim türleri (etil alkolde O–H var, dietil eterde yok) derste söylenmez; kitabın cevabı yok ve dietil eterin polarlığı E'nin iki ölçütüyle verilmedi.
- **Dersin gerektireceği yeni çizim araçları (kit):** yukarıdaki "Çizim notları" bölümündedir; özet: `sirinca`, `kabarcikModeli` (iç ve dış basınç okları, kabarcığın büyüyüp küçülmesi), `buharGrafigi`, `kaynamaDeney`, `iddiaCercevesi` (J1); `cubukKpa`, `kaynamaCubuklari`, `hidrurGrafigi` (on altı çubuk, grup grup belirme), `hidrojenBagiSayisi`, `tekTablo` (J2); kitteki `sinifla` ve G konusundaki `hidrojenBagiZinciri`, E ve G konularının `tanecik`, `ciftCiz` araçlarının yeniden kullanımı.
- **Süre:** J2 sekiz sahnedir; `sure.js` ölçümü 15 dakikayı geçerse ders bir kez daha okunmalıdır (iki fikir taşıyıp taşımadığına bakılır: kaynama–etkileşim ilişkisi ve hidrojen bağının iki gerekçesi tek fikir sayıldı; sahne 6–7 ayrılabilir adaylardır). Sonuç temanın `DURUM.md` dosyasına yazılır.
