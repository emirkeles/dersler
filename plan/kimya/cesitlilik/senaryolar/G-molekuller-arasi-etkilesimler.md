# Senaryolar — Konu G · Moleküller arası etkileşimler

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.7, `../PLAN.md` bölüm 3 (G1–G4), bölüm 7 (karar 9, 10, 17) ve bölüm 8 ("G · Moleküller arası etkileşimler"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir; polarlık bilgisi `E-molekul-polarligi.md`, iyon bilgisi `B-iyonik-bag.md`, ortaklanmamış çift `D-lewis-nokta-yapisi.md` dosyalarındaki gibi kullanılır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Simge içeren satırların okunuşu ders yazılırken `speak` ile verilir (δ⁺ "delta artı", δ⁻ "delta eksi"; "London" kitaptaki gibi "Landın", "van der Waals" "van der Vals"; Na⁺ "sodyum artı", Cl⁻ "klorür", Mg²⁺ "magnezyum iki artı"). Hidrojen bağı tahtada "hidrojen bağı" yazar; "F–H, O–H, N–H" okunuşu "flor hidrojen, oksijen hidrojen, azot hidrojen".
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler (aynı sahnenin numaraları; başka sahne "sahne N, madde" diye anılır).
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → çıkış soruları. Fikir birkaç parçadan oluştuğu için 2–6. adımlar her parçada yinelenir.
- **Sürükle-bırak, eşleştirme ve sıralama yok.** Motorda böyle çağrı bulunmaz; "Dene" sahnelerinin hepsi **kart başına seçim** olarak kurulur: kutular tahtada adlarıyla durur; kartlar sırayla öne çıkar (ortada büyür); öğrenci `c.choice` ile kartın kutusunu (ya da eşini) seçer; doğruysa kart küçülüp kendi kutusuna oturur ve kartın geri bildirimi tahtada belirir, yanlışta ipucu çıkar ve kart ortada kalır. Her "Dene" bölümünde kartlar, her kartın doğru kutusu ve geri bildirimi yazılıdır. `tag` her yerde `'Sınıflandır'` (ya da `'Adlandır'`).
- Renkler tema boyunca aynıdır: artı yük (iyon, δ⁺, artı kutup) turuncu, eksi yük (elektron bulutu, δ⁻, eksi kutup) mavi, çekme (etkileşim çizgisi) yeşil kesikli, itme kırmızı. Atom ve molekül küreleri `E` konusundaki gibi nötr griyle çizilir, simgesi içinde durur (element renkleri kullanılmaz).
- **Dipol şeridi:** polar molekül tahtada gerektiğinde küçük bir şeritle de gösterilir; artı ucu turuncu, eksi ucu mavidir ve uçlarında δ⁺ ile δ⁻ yazar. Şerit ilk kez G2 sahne 2'de tanıtılır ("Dipoli kısaca şerit olarak çizeriz").
- Etkileşimler arasında çekme kuvveti hep yeşil kesikli çizgiyle gösterilir; kuvvet sayısı ya da kJ değeri hiçbir tahtada yok. Hidrojen bağı için de aynı yeşil kesikli çizgi kullanılır; molekül içindeki kovalent bağ (O–H gibi) düz koyu çizgidir.
- Etkileşimin adını veren kural (kitap s. 148'deki adlandırma): **polar molekül "dipol", apolar molekül ve soy gaz atomu "indüklenmiş dipol", iyon "iyon" olarak girer; iki tanecik türünün adı yan yana yazılınca etkileşimin adı çıkar.** Bütün derslerde bu kural kullanılır (G1'de tanecik türleri, G2–G3'te adlar).
- Hatırla sorularının dayanağı: G1'den önceki ders F konusudur (adlandırma); G konusu F'ye değil E (polar, apolar molekül) ve B'ye (iyon) dayandığı için G1'in hatırla soruları oradan seçildi.
- Bütün örnek tanecikler ve polarlık kararları (E'nin iki ölçütüyle çıkarılır):
  - Soy gaz atomları: He, Ne, Ar. İyonlar: Na⁺, K⁺, Li⁺, Mg²⁺, Ca²⁺ (katyon); Cl⁻, Br⁻ (anyon).
  - Polar moleküller: HF, HCl, H₂O, NH₃, H₂S, NCl₃ ve CO (iki atomlu, elektronegatifliği farklı: C 2,55, O 3,44).
  - Apolar moleküller: H₂, O₂, N₂, F₂, CH₄, CF₄, CCl₄, CO₂, BH₃.
  - Elektronegatiflik değerleri (E ile aynı): H 2,20 · B 2,04 · C 2,55 · N 3,04 · O 3,44 · F 4,00 · P 2,19 · S 2,58 · Cl 3,16. CH₂O (kitabın Kontrol Noktası 2.7 kutucuğunda var) ve C₂H₆, C₃H₈ (s. 148 ikinci tablo) alınmaz: uçtaki atomları özdeş olmayan ya da merkez atomu bulunmayan bu moleküllerin polarlığı E'nin iki ölçütüyle çıkmaz.
  - Hidrojen bağı için iki molekülün de F–H, O–H ya da N–H bağı taşıması gerekir (H₂O, NH₃, HF); H₂S, HCl, CH₄ ve H₂ bu bağlardan taşımaz.

Çizim araçları (kit için; ayrıntı en sonda "Çizim notları" bölümünde):

- `tanecik(tür)` (soy gaz atomu, iyon, polar molekül, apolar molekül), `dipolSeridi`, `ciftCiz(a, b)` (iki tanecik ve aralarında etkileşim çizgisi), `bulutKaydir` (elektron bulutunu bir yana yığar, geçici δ etiketleri), `kartCevir` (kanıt kartı), `kartSecim` (kart başına seçim), `secmeliTablo`, `hidrojenBagiZinciri`, `dnaMerdiven`, `geckoAyak`.

## G1 · Tanecikler arası etkileşim: kim kiminle?

- **Fikir:** Etkileşim yalnızca iki molekül arasında olmaz; moleküller ile iyonlar ve soy gaz atomları arasında da olur. Etkileşimleri sınıflandırmanın ölçütü, karşılaşan taneciklerin türüdür: atom, iyon, polar molekül, apolar molekül. Buna göre etkileşimler molekül-molekül, iyon-molekül ve atom-atom olarak ayrılır.
- **Giriş ekranı sorusu:** Gecko kertenkelesi dik ve düz bir yüzeyde yapıştırıcı olmadan nasıl yürür?
- **Kaynak:** Ders kitabı s. 146 (gecko: ayağı mikroskobik, çok ince tüycüklerle kaplı; uçları yüzeyle moleküler düzeyde etkileşir; milyonlarca moleküler etkileşimle yaklaşık 10 N yapışma kuvveti; yapışkan madde salgılamaz), s. 147 (moleküller arası etkileşimler elektrostatik çekime dayanır; temel tanecikler atom, molekül ya da iyondur; bu etkileşimler metalik, iyonik ve kovalent bağdan daha zayıftır; Etkinlik 2.13: aynı moleküller, farklı moleküller, iyon ile molekül, soy gaz atomları arasında çekim var mı), s. 148 (Etkinlik 2.14: madde çiftleri, ölçüt belirleme, tanecik türüne göre sınıflandırma, "iyon-molekül etkileşimi" örneği), s. 150 (moleküller arası etkileşimler katı ve sıvı maddeleri bir arada tutar), s. 128 (molekül: kovalent bağla bağlı atom grubu). Polar ve apolar molekül E'den, iyon B'den; tek cümleyle hatırlatılır.
- **Sınır:** Etkileşimlerin bilimsel adları (dipol-dipol, London vb.) bu derste verilmez; G2 ve G3'tedir. Yalnızca üç sınıf: molekül-molekül, iyon-molekül, atom-atom. "Bağlardan daha zayıf" tek cümledir (kitap s. 147); güçlü–zayıf sınıflaması ve kuvvet değerleri yok. Bilgisayar ekranına toz yapışması sorusu, GeckoBot ve biyomimikri alınmaz (karar 9).
- **Güç kavramlar ve gösterimi:** (1) Dört tür tanecik: dört kart yan yana; soy gaz atomu tek küre, iyon yüklü küre, polar molekül uzay-dolgu modeli ve δ etiketleriyle (altında "dipol momenti sıfırdan farklı"), apolar molekül uzay-dolgu modeli ve eşit gölgeyle (altında "dipol momenti sıfır"). (2) "Etkileşim iki tanecik arasındadır": her çift için iki tanecik ve aralarında yeşil kesikli çekim çizgisi; çiftin altına sınıfın adı yazılır. (3) Gecko'nun tutunması: ayak, tüycükler ve tüycük ucunun yüzeyle buluşması üç büyütmeyle; çok sayıda küçük çekim oku toplanıp tek kalın oka dönüşür.
- **Hedeflenen yanılgı:** "Moleküller arası etkileşim yalnızca iki molekül arasında olur; iyonlar ve soy gaz atomları etkileşmez."
- **Akılda kalıcı cümle:** Etkileşimin türünü, karşılaşan taneciklerin türü belirler.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Dipol momenti sıfırdan farklı olan molekül nasıl adlandırılır? **Polar molekül** / Apolar molekül / İyon. (E2) Yanlışta: "Dipol momenti sıfırdan farklıysa kalıcı kutuplar vardır; molekül polardır."
2. Cl⁻ hangi tür iyondur? **Anyon** / Katyon / Apolar molekül. (B1, daha eski) Yanlışta: "Elektron alan ametal atomu, eksi yüklü anyona dönüşür."

Sonra: "Bugün bu taneciklerin birbirini nasıl çektiğine bakacağız."

### Sahne 2 · Taneciklerin arasındaki çekim

Tahta: solda bir bardak su; büyütülür, içinde gri küreli su molekülleri görünür, aralarında ince yeşil kesikli çekim çizgileri belirir. Sağda iki çizgi örneği yan yana: kalın koyu çizgi "bağ", ince yeşil kesikli çizgi "tanecikler arası çekim".

Anlatım:
1. Maddeyi oluşturan temel tanecikler atom, molekül ya da iyondur.
2. Taneciklerin arasında, zıt yüklerin çekimine dayanan elektrostatik kuvvetler vardır.
3. Bu çekimler, katı ve sıvı maddeleri bir arada tutan kuvvetlerdir.
4. Bir bardak suyun molekülleri de bu çekimle bir arada durur.
5. Tanecikler arası çekimler metalik, iyonik ve kovalent bağdan daha zayıftır.

### Sahne 3 · Dört tür tanecik

Tahta: dört kart soldan sağa sırayla belirir; biten kart soluklaşır ama tahtada kalır. Kart 1 "soy gaz atomu": He, tek gri küre. Kart 2 "iyon": Na⁺ turuncu küre, Cl⁻ mavi küre. Kart 3 "polar molekül": H₂O, uzay-dolgu modeli, oksijen tarafında koyu mavi gölge ve δ⁻, hidrojenlerde δ⁺; altında "dipol momenti: sıfırdan farklı". Kart 4 "apolar molekül": O₂, iki gri küre, eşit gölge; altında "dipol momenti: sıfır".

Anlatım:
1. Soy gazlar tek atomludur; helyum bir soy gaz atomudur.
2. İyon, elektron alıp vermiş yüklü taneciktir: Na⁺, Cl⁻.
3. Molekül, kovalent bağlı atom grubudur.
4. Dipol momenti sıfırdan farklı molekül polardır: H₂O.
5. Dipol momenti sıfır olan molekül apolardır: O₂.
6. Etkileşen taneciklerin her biri bu dört türden biridir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada NH₃'ün Lewis yapısı (N merkez, bir ortaklanmamış çift kalın çerçeveli); yanında iki adım yazılı: "Merkez atomda ortaklanmamış çift: var" ve "Yük dağılımı: dengede değil"; üçüncü adım boş: "Tanecik türü: ?". NH₃ hangi tür taneciktir? **Polar molekül** / Apolar molekül / Soy gaz atomu. Dayandığı anlatım: 4–5 ve sahne dışında E2 (merkez atomda çift varsa polar). İpuçları: "Yük dengede değilse dipol momenti sıfırdan farklıdır." · "Dipol momenti sıfırdan farklı olan molekül hangisiydi?"

Sonra:
7. Merkez azotta çift var: NH₃ polar moleküldür.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada CO₂'nin Lewis yapısı: C merkez, oksijenlerin çiftleri soluk): CO₂ hangi tür taneciktir? **Apolar molekül** / Polar molekül / İyon. Dayandığı anlatım: 4–5, 7. İpuçları: "Önce merkez atomda ortaklanmamış çift ara." · "Oksijenlerin çifti merkez atomda değil."

Sonra:
8. Merkez karbonda çift yok: CO₂ apolar moleküldür.

### Sahne 4 · İki tanecik karşılaşınca

Tahta: üç kutu yan yana. Kutu 1: iki He atomu, aralarında yeşil kesikli çekim çizgisi. Kutu 2: Na⁺ ve H₂O. Kutu 3: iki O₂ molekülü. Her kutunun altına, anlatım ilerledikçe sınıfın adı yazılır: "atom-atom", "iyon-molekül", "molekül-molekül". Sonra dördüncü satır için bir tablo: üç sütun (atom-atom · iyon-molekül · molekül-molekül), ilk üç örnek yerlerine oturur.

Anlatım:
1. İki helyum atomu yaklaşınca aralarında çekim oluşur.
2. Soy gaz atomları arasındaki etkileşim, atom-atom etkileşimidir.
3. Na⁺ iyonu ile H₂O molekülü de birbirini çeker.
4. İyon ile molekül arasındaki etkileşim, iyon-molekül etkileşimidir.
5. İki O₂ molekülü arasındaki etkileşim, molekül-molekül etkileşimidir.
6. Etkileşim yalnızca moleküller arasında olmaz; iyonlar ve atomlar da etkileşir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloda He–He, Na⁺–H₂O, O₂–O₂ yerlerine oturmuş; dördüncü satırda He–Ne, "Ne de bir soy gaz atomu; iki tanecik de: atom" yazılı, sınıf boş. He ile Ne arasındaki etkileşim hangi sınıfa girer? **Atom-atom** / Molekül-molekül / İyon-molekül. Dayandığı anlatım: 1–2. İpuçları: "İki tanecik de soy gaz atomu." · "Soy gaz atomları arasındaki etkileşimin adı yukarıda."

Sonra:
7. He ile Ne de atom-atom etkileşimi kurar.

Soru (`tag: 'Sıra sende'`; ölçüt): Bu üç etkileşimi birbirinden ayıran nedir? **Karşılaşan taneciklerin türü** / Taneciklerin rengi / Tanecik sayısı. Dayandığı anlatım: 2, 4, 5. İpuçları: "Üç kutuda da etkileşen taneciklerin türü farklı." · "Atom, iyon ve molekül arasındaki fark ne?"

Sonra:
8. Etkileşimleri taneciklerin türüne göre sınıflandırırız.

Soru (`tag: 'Sıra sende'`; yeni durum): Mg²⁺ ile CO₂ arasındaki etkileşim hangi sınıfa girer? **İyon-molekül** / Molekül-molekül / Atom-atom. Dayandığı anlatım: 3–4, 8. İpuçları: "Mg²⁺ bir iyondur, CO₂ bir molekül." · "İyon ile molekül karşılaşıyor."

Sonra:
9. Mg²⁺ iyon, CO₂ molekül: iyon-molekül etkileşimi.

### Sahne 5 · Çiftleri ayır

Tahta: üç kutu: "atom-atom", "iyon-molekül", "molekül-molekül". Kartlar sırayla ortaya gelir; her kartta iki tanecik ve aralarında yeşil kesikli çizgi.

Anlatım:
1. On çifti, karşılaşan taneciklerin türüne göre üç kutuya ayıralım.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; seçenekler üç kutunun adı; kart doğru kutuya oturunca altına cümle düşer):
- He–He → **atom-atom**. "İkisi de soy gaz atomu."
- Na⁺–H₂O → **iyon-molekül**. "Na⁺ iyon, H₂O molekül."
- O₂–O₂ → **molekül-molekül**. "İkisi de molekül."
- Mg²⁺–CO₂ → **iyon-molekül**. "Mg²⁺ iyon, CO₂ molekül."
- H₂S–H₂S → **molekül-molekül**. "İkisi de molekül."
- He–Ne → **atom-atom**. "İkisi de soy gaz atomu."
- Cl⁻–H₂O → **iyon-molekül**. "Cl⁻ iyon, H₂O molekül."
- CH₄–HF → **molekül-molekül**. "İkisi de molekül; biri apolar, biri polar olması sınıfı değiştirmez."
- N₂–O₂ → **molekül-molekül**. "İkisi de molekül; farklı türden olabilir."
- NH₃–HF → **molekül-molekül**. "İkisi de molekül."

Dayandığı anlatım: sahne 3, 1–6; sahne 4, 1–8.

Sonra:
2. On çift üç sınıfa ayrıldı; ölçüt taneciklerin türüydü.

Defter ("Etkileşimin sınıfı"): **Etkileşimin sınıfını, karşılaşan taneciklerin türü belirler.** Örnek: Na⁺–H₂O iyon-molekül.

### Sahne 6 · Gecko'ya dönüş

Tahta: dik bir cam yüzeyde vektör çizimiyle gecko (şematik siluet); ayak büyütülür, altında çok sayıda ince tüycük görünür; bir tüycüğün ucu daha büyütülür: ucunda yüzeyin moleküllerine yaklaşan küçük taneciklerle aralarında çok sayıda ince yeşil kesikli çekim çizgisi. Çizgiler sırayla çoğalır; sonda hepsi toplanıp yanında "yaklaşık 10 N" yazan tek kalın yeşil oka dönüşür.

Anlatım:
1. Geckonun ayağı mikroskobik, çok ince tüycüklerle kaplıdır.
2. Tüycüklerin uçları o kadar incedir ki yüzeyle moleküler düzeyde etkileşir.
3. Ayaktaki milyonlarca etkileşimin her biri zayıf bir çekimdir.
4. Milyonlarcası toplanınca yaklaşık 10 newtonluk güçlü bir tutunma olur.
5. Gecko, yapıştırıcı olmadan bu çekimlerle yüzeye tutunur.

### Çıkış soruları

1. (yeni durum) Argon bir soy gazdır. İki argon atomu arasındaki etkileşim hangi sınıfa girer? **Atom-atom** / Molekül-molekül / İyon-molekül. (sahne 4)
2. (yanılgı) Moleküller arası etkileşimler için hangisi doğrudur? **İyon ile molekül arasında da etkileşim olur** / Etkileşim yalnızca iki molekül arasında olur / Soy gaz atomları arasında etkileşim olmaz. (sahne 4)
3. (yeni durum) K⁺ ile NH₃ arasındaki etkileşim hangi sınıfa girer? **İyon-molekül** / Molekül-molekül / Atom-atom. (sahne 4, 5)
4. (yeni durum; tahtada CF₄'ün Lewis yapısı: C merkez, merkezde ortaklanmamış çift yok) CF₄ hangi tür taneciktir? **Apolar molekül** / Polar molekül / Soy gaz atomu. (sahne 3)
5. Gecko, yapıştırıcı olmadan yüzeye nasıl tutunur? **Ayağındaki milyonlarca zayıf çekimin toplamıyla** / Ayağındaki tek bir güçlü çekimle / Yüzeyle iyonik bağ kurarak. (sahne 6)

Özet: Tanecikler arasında elektrostatik çekim vardır. · Etkileşen tanecikler atom, iyon, polar molekül ya da apolar moleküldür. · Etkileşimler molekül-molekül, iyon-molekül ve atom-atom olarak ayrılır. · **Etkileşimin türünü, karşılaşan taneciklerin türü belirler.**

## G2 · Dipol-dipol ve iyon-dipol

- **Fikir:** Polar moleküllerin kalıcı dipolü vardır. İki polar molekül zıt kutuplarıyla birbirini çeker: dipol-dipol etkileşimi. Bir iyon ile bir polar molekül arasındaki çekim iyon-dipol etkileşimidir.
- **Giriş ekranı sorusu:** Bir ucu artı, bir ucu eksi olan iki molekül yan yana gelince birbirine hangi uçlarıyla döner?
- **Kaynak:** Ders kitabı s. 150 (kalıcı dipol: molekülün bir bölümü kısmen eksi, öteki kısmen artı; Görsel 2.13), s. 151 (dipol-dipol: polar moleküller bir araya gelince ayrı moleküllerdeki zıt kutuplu atomlar arasında çekim; polar molekül içeren saf maddenin kendi molekülleri arasında ve farklı tür polar moleküller arasında görülür; Görsel 2.14; iyon-dipol: iyonlar ve polar moleküller arasında, tuz suda çözününce anyon ve katyonun polar moleküldeki kısmi yüklü bölgelerle etkileşimi; Görsel 2.15), s. 149 (Etkinlik 2.14 yönerge 2 görselleri: HCl–HCl, KBr ve H₂O; "dipol-dipol: aynı ya da farklı polar moleküller arasında görülür"), s. 148 (adlandırma kuralı: polar molekül "dipol"), s. 153 (HCl–HCl, H₂S–H₂S çiftleri ve H, S, Cl elektronegatiflikleri). Kısmi yük gösterimi E'de tanıtıldı; tek cümleyle hatırlatılır.
- **Sınır:** Yalnızca dipol-dipol ve iyon-dipol; hidrojen bağı G4'tedir, apolar tanecikli etkileşimler G3'tedir. Kuvvet değeri ve kuvvet sıralaması yok. Tuzun suda çözünmesi yalnızca iyon-dipol örneği olarak anılır; çözünürlük, "benzer benzeri çözer" yok. Kanıt kartlarında hidrojen bağı kurabilen çiftler (HF–HF gibi) kullanılmaz; bu çiftler G4'tedir.
- **Güç kavramlar ve gösterimi:** (1) Kalıcı dipol: HCl'nin uzay-dolgu modeli üstünde mavi gölge klor tarafında yığılır, δ⁻ ve δ⁺ belirir; sonra aynı yapı bir şeride dönüşür. (2) "Zıt uçlar birbirine döner": iki şerit önce aynı uçlarla karşılaşır (kırmızı itme okları), sonra zıt uçlarla dizilir (yeşil kesikli çekim). (3) İyon-dipol: bir su molekülünün oksijen ucu (δ⁻) Na⁺'a, hidrojen ucu (δ⁺) Cl⁻'ye döner.
- **Hedeflenen yanılgı:** "Bağları polar olan ya da hidrojen içeren her molekül polardır, dolayısıyla iyonla iyon-dipol kurar" (CO₂). Ve "dipol-dipol yalnızca aynı tür moleküller arasında olur."
- **Akılda kalıcı cümle:** Polar molekül polar molekülle dipol-dipol, iyonla iyon-dipol etkileşir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Na⁺ ile H₂O arasındaki etkileşim hangi sınıfa girer? **İyon-molekül** / Molekül-molekül / Atom-atom. (G1) Yanlışta: "Bir iyon ile bir molekül karşılaşıyor; bu iyon-molekül etkileşimidir."
2. H–Cl bağında ortak elektronlar hangi atomun çevresinde daha yoğundur? **Klor** / Hidrojen / İkisinde eşit. (E1, daha eski) Yanlışta: "Elektronegatifliği büyük olan klor, ortak elektronları kendine çeker."

Sonra: "Bugün polar moleküllerin birbirini nasıl çektiğine bakacağız."

### Sahne 2 · Polar molekülün iki ucu

Tahta: HCl'nin uzay-dolgu modeli; üstünde mavi yük gölgesi klor tarafında koyu, hidrojen tarafında açık. Klor üstünde δ⁻ (mavi), hidrojen üstünde δ⁺ (turuncu). Cümleler ilerledikçe model küçülüp bir şeride dönüşür: sol ucu turuncu "δ⁺", sağ ucu mavi "δ⁻"; altında "kalıcı dipol".

Anlatım:
1. HCl'de ortak elektronlar klor çevresinde daha yoğundur.
2. Klor ucu kısmen eksi (δ⁻), hidrojen ucu kısmen artıdır (δ⁺).
3. Bu iki kutup kalıcıdır; bu yapıya kalıcı dipol denir.
4. Polar moleküller, kalıcı dipolü olan moleküllerdir.
5. Dipoli kısaca şerit olarak çizeriz: turuncu artı, mavi eksi.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada NH₃ ve "N 3,04 · H 2,20"): NH₃ molekülünde hangi uç kısmen eksidir? **Azot ucu** / Hidrojen ucu / İkisi de. Dayandığı anlatım: 1–2. İpuçları: "Elektronlar elektronegatifliği büyük atomun çevresinde yoğundur." · "Elektron bulutunun yoğun olduğu uç eksi kutuptur."

Sonra:
6. Azot elektronegatiftir: azot ucu δ⁻, hidrojen uçları δ⁺.

### Sahne 3 · İki polar molekül yaklaşınca

Tahta: iki HCl şeridi yan yana. Önce aynı uçlar karşı karşıya (klor ucu klor ucuna): aralarında iki kırmızı itme oku. Sonra ikinci molekül döner; zıt uçlar karşı karşıya gelir, aralarında yeşil kesikli çekim çizgisi belirir. Altta iki HCl'nin uzay-dolgu modeli ve gölgeleri (Görsel 2.14'ün sadeleştirilmişi).

Anlatım:
1. İki HCl molekülü yan yana gelsin.
2. Aynı kutuplar birbirini iter, zıt kutuplar çeker.
3. Moleküller, zıt kutupları karşı karşıya gelecek biçimde dizilir.
4. Ayrı moleküllerdeki zıt kutuplar arasında elektriksel çekim kurulur.

Soru (`tag: 'Sıra sende'`): Bir HCl molekülünün hidrojen ucuna, öteki molekülün hangi ucu yönelir? **Klor ucu (δ⁻)** / Hidrojen ucu (δ⁺) / Hiçbir ucu. Dayandığı anlatım: 2–4. İpuçları: "Hidrojen ucu artıdır; zıt kutup çeker." · "Aynı kutuplar itiyordu."

Sonra:
5. Artı uç, öteki molekülün eksi ucuna döner.

### Sahne 4 · Üç kart: ortak olan ne?

Tahta: üç kapalı kart yan yana ("1", "2", "3"); öğrenci karta basınca kart çevrilir. Kart 1: iki HCl, şeritleri zıt uçlarla dizili, yeşil kesikli çekim. Kart 2: iki H₂S, aynı. Kart 3: HCl ile H₂S, aynı. Kartların altına çevrildikçe taneciklerin türü yazılır: "polar molekül – polar molekül".

Dene (`kartCevir`, `noWait` yönerge: "Üç kartı da çevir."): üç kart çevrilince devam edilir.

Anlatım:
1. Birinci ve ikinci kartta iki molekül aynı türdendir.
2. Üçüncü kartta farklı türden iki molekül karşılaşmıştır.
3. Üç kartta da etkileşen iki taneciğin kalıcı dipolü vardır.

Soru (`tag: 'Sıra sende'`; ölçüt): Üç kartta etkileşen taneciklerin ortak özelliği nedir? **İkisi de polar molekül** / İkisi de aynı türden molekül / İkisi de iyon. Dayandığı anlatım: 1–3. İpuçları: "Üçüncü kartta moleküller farklı türden." · "Üç kartta da iki taneciğin de kalıcı dipolü var."

Sonra:
4. Aynı ya da farklı tür fark etmez: iki polar molekül yeter.
5. Polar molekül–polar molekül grubunun bilimdeki adı dipol-dipol etkileşimidir.

Defter ("Dipol-dipol"): **Polar molekül ile polar molekül: dipol-dipol.** Örnek: HCl–HCl.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada H₂S ve NCl₃. Birinci adım yazılı: "H₂S: polar (merkez kükürtte iki çift)". İkinci adım yazılı: "NCl₃: polar (merkez azotta bir çift)". Üçüncü adım boş: "Etkileşim: ?". H₂S ile NCl₃ arasında hangi etkileşim olur? **Dipol-dipol** / İyon-dipol / Etkileşim olmaz. Dayandığı anlatım: 3–5. İpuçları: "İkisi de polar molekül." · "Polar molekül ile polar molekül karşılaşıyor."

Sonra:
6. İkisi de polar: farklı tür olsalar da dipol-dipol kurarlar.

### Sahne 5 · İyon ile polar molekül

Tahta: bir su molekülü (uzay-dolgu, oksijen tarafı mavi gölge, δ⁻; hidrojenler turuncu, δ⁺). Solda Na⁺ (turuncu), oksijen ucuna yaklaşır; sağda Cl⁻ (mavi), hidrojen uçlarına yaklaşır. Aralarında yeşil kesikli çekim çizgileri.

Anlatım:
1. Polar molekül, iyonla da çekim kurar.
2. Na⁺ artı yüklüdür; suyun eksi ucu olan oksijene yaklaşır.
3. Cl⁻ eksi yüklüdür; suyun artı ucu olan hidrojenlere yaklaşır.
4. İyon ile polar molekül arasındaki çekime iyon-dipol etkileşimi denir.
5. Tuz suda çözünürken iyonlar su moleküllerinin kutuplarıyla etkileşir.

Defter ("İyon-dipol"): **İyon ile polar molekül: iyon-dipol.** Örnek: Na⁺–H₂O.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada K⁺ ve H–Cl (δ⁺ hidrojende, δ⁻ klorda). İlk adım yazılı: "K⁺ artı yüklü: eksi ucu çeker". İkinci adım boş: "K⁺'ya dönük uç: ?". HCl'nin hangi ucu K⁺'ya döner? **Klor ucu (δ⁻)** / Hidrojen ucu (δ⁺) / Fark etmez. Dayandığı anlatım: 2–3. İpuçları: "Artı iyon eksi kutba yaklaşır." · "HCl'de eksi kutup klorda."

Sonra:
6. K⁺ iyonuna klor ucu döner.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada NH₃ ve "N 3,04 · H 2,20"): Ca²⁺ iyonu NH₃ molekülüne yaklaşıyor. NH₃'ün hangi ucu Ca²⁺'ya döner? **Azot ucu (δ⁻)** / Hidrojen ucu (δ⁺) / Fark etmez. Dayandığı anlatım: 2–4; sahne 2, 6. İpuçları: "Ca²⁺ artı yüklü bir iyon." · "NH₃'te eksi kutup azotta."

Sonra:
7. Artı iyon, polar molekülün eksi ucuna yönelir.

### Sahne 6 · Hangi çift hangi etkileşim?

Tahta: üç kutu: "dipol-dipol", "iyon-dipol", "ikisi de değil". Kartlar sırayla ortaya gelir; her kartta iki tanecik (polar moleküller şeritle, iyonlar yüklü küreyle) ve aralarında yeşil kesikli çizgi.

Anlatım:
1. On çifti, taneciklerin türüne göre üç kutuya ayıralım.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; kart doğru kutuya oturunca altına cümle düşer):
- HCl–HCl → **dipol-dipol**. "İki polar molekül; aynı tür."
- H₂S–H₂S → **dipol-dipol**. "İki polar molekül; merkez kükürtte iki çift var."
- NCl₃–H₂S → **dipol-dipol**. "İki polar molekül; farklı tür olması fark etmez."
- Na⁺–H₂O → **iyon-dipol**. "İyon ile polar molekül."
- Cl⁻–H₂O → **iyon-dipol**. "İyon ile polar molekül."
- Ca²⁺–NH₃ → **iyon-dipol**. "İyon ile polar molekül."
- O₂–O₂ → **ikisi de değil**. "O₂ apolardır; polar molekül yok."
- He–He → **ikisi de değil**. "Helyum bir atomdur; polar molekül yok."
- Mg²⁺–CO₂ → **ikisi de değil**. "CO₂ polar bağlıdır ama apolardır; iyon-dipol için polar molekül gerekir."
- CH₄–HF → **ikisi de değil**. "CH₄ apolardır; iki polar molekül yok."

Dayandığı anlatım: sahne 4, 3–5; sahne 5, 4. (CO₂ ve CH₄ için sahne dışında E2.)

Sonra:
2. Polar molekül olmayan çiftler bu iki gruba girmedi.

### Çıkış soruları

1. HCl moleküllerinin kendi aralarındaki etkileşim hangisidir? **Dipol-dipol** / İyon-dipol / Atom-atom. (sahne 3, 4)
2. (yeni durum) Li⁺ iyonu NH₃ molekülüne yaklaşıyor. Aralarındaki etkileşim hangisidir? **İyon-dipol** / Dipol-dipol / Etkileşim olmaz. (sahne 5)
3. (yanılgı, yeni durum) Mg²⁺ ile CO₂ arasında iyon-dipol etkileşimi oluşur mu? **Oluşmaz; CO₂ apolar bir moleküldür** / Oluşur; Mg²⁺ bir iyondur / Oluşur; CO₂'de polar bağlar vardır. (sahne 6)
4. (yanılgı, yeni durum) Dipol-dipol etkileşimi için hangisi doğrudur? **İki polar molekül aynı ya da farklı türden olabilir** / Yalnızca aynı türden iki molekül arasında olur / Bir polar molekül ile bir iyon arasında olur. (sahne 4)
5. (yeni durum) Br⁻ iyonu bir H₂O molekülüne yaklaşıyor. Suyun hangi ucu Br⁻'ya döner? **Hidrojen ucu (δ⁺)** / Oksijen ucu (δ⁻) / İki ucu da. (sahne 5)

Özet: Polar molekülün kalıcı dipolü vardır. · Zıt kutuplar birbirini çeker. · Polar–polar dipol-dipol, iyon–polar iyon-dipol etkileşimidir. · **Polar molekül polar molekülle dipol-dipol, iyonla iyon-dipol etkileşir.**

## G3 · İndüklenmiş dipol: apolar tanecikler de etkileşir

- **Fikir:** Apolar moleküllerde ve soy gaz atomlarında yük dağılımı geçici olarak bozulabilir (indüklenmiş dipol). Böylece üç etkileşim daha doğar: dipol-indüklenmiş dipol, iyon-indüklenmiş dipol ve indüklenmiş dipol-indüklenmiş dipol (London). Beş etkileşimin adı, etkileşen taneciklerin türünden çıkar.
- **Giriş ekranı sorusu:** Soy gaz atomlarının artı ya da eksi ucu yok; yine de birbirlerini çekebilirler mi?
- **Kaynak:** Ders kitabı s. 150 (apolar moleküller ve soy gaz atomlarında elektron yoğunluğu dengelidir; dalgalanma sonucu anlık olarak yoğunluğun arttığı bölge negatif yüklenir; geçici dipol ya da indüklenmiş dipol), s. 151 (London kuvveti: soy gaz atomları ve apolar moleküllerde fiziksel özellikleri belirleyen çekim; yaklaşan atom, iyon ya da molekülle simetrik yük dağılımı bozulur), s. 152 (iyon-indüklenmiş dipol: anyona yakın bölge kısmen artı, katyona yakın bölge kısmen eksi; Görsel 2.17, Na⁺ ve He; dipol-indüklenmiş dipol: polar molekül apolar moleküle ya da soy gaz atomuna yaklaşınca; Görsel 2.18, HCl ve He; London: Görsel 2.16, H₂ molekülleri; elektron sayısı fazla ve elektron bulutu dağılmışsa kutuplanma kolaylaşır, London kuvveti artar; London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimlerine IUPAC'ın verdiği ad van der Waals kuvvetleri), s. 148 (adlandırma kuralı; Etkinlik 2.14 madde çiftleri), s. 149 (H₂–H₂ görseli).
- **Sınır:** Etkileşim türleri yalnızca bu beşidir. London için kuvvet sıralaması alıştırması, mol kütlesi ve temas yüzeyi yok; "elektron sayısı fazla ve bulut yaygınsa London kuvveti artar" yalnızca tek cümledir, soruya dönüşmez. "Dağılma kuvveti" adı verilmez. "Van der Waals" tek cümle ve defter satırıdır; hidrojen bağı bu cümleye katılmaz (kitap saymaz). Kuvvet değerleri (kJ/mol) yok.
- **Güç kavramlar ve gösterimi:** (1) İndüklenmiş dipol: helyum atomunun elektron bulutu simetrik; bulut bir yana yığılır (geçici δ⁻ ve δ⁺), geri döner, öbür yana yığılır. (2) "İndüklenme": yaklaşan taneciğin bulutu kaydırması; Na⁺ yaklaşınca bulut iyona doğru, Cl⁻ yaklaşınca iyondan uzağa kayar; polar molekülün klor ucu yaklaşınca bulut uzağa kayar. (3) London'da iki geçici dipolün zıt uçlarının birbirine dönmesi (iki H₂, Görsel 2.16'nın sadeleştirilmişi). (4) Beş adın üçgen bir tabloda toplanması: satır ve sütun başlıkları "polar molekül · iyon · apolar molekül ya da soy gaz atomu".
- **Hedeflenen yanılgı:** "Dipolü olmayan (apolar) taneciklerin arasında etkileşim olmaz."
- **Akılda kalıcı cümle:** Dipolü olmayan tanecikte de dipol indüklenir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. İki polar molekül arasındaki etkileşimin adı nedir? **Dipol-dipol** / İyon-dipol / Atom-atom. (G2) Yanlışta: "Polar molekül polar molekülle dipol-dipol etkileşir."
2. CH₄ molekülü polar mı, apolar mı? **Apolar; merkez karbonda ortaklanmamış çift yok** / Polar; C–H bağları polar / Polar; hidrojen içerir. (E2, daha eski) Yanlışta: "Merkez atomda ortaklanmamış çift yoksa dipol momenti sıfırdır; molekül apolardır."

Sonra: "Bugün apolar taneciklerin de nasıl etkileştiğine bakacağız."

### Sahne 2 · Soy gaz atomunda anlık kutuplaşma

Tahta: helyum atomu: turuncu çekirdek, çevresinde iki mavi elektron, mavi gölge her yanda eşit. Anlatım ilerledikçe gölge sağ yana yığılır: sağ uç koyu mavi "δ⁻", sol uç açık turuncu "δ⁺"; sonra gölge simetriğe döner, ardından sola yığılır (δ işaretleri yer değiştirir). Altta "geçici dipol = indüklenmiş dipol".

Anlatım:
1. Helyum bir soy gaz atomudur; elektron bulutu dengeli dağılır.
2. Elektron dağılımı dalgalanır; bir an bir yanda yoğunlaşır.
3. Elektronların yığıldığı uç kısmen eksi, karşı uç kısmen artı olur.
4. Bu geçici kutuplaşmaya geçici dipol ya da indüklenmiş dipol denir.
5. Yük dağılımı sürekli değişir; kutuplaşma kalıcı değildir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada helyum, bulut sağa yığılmış; "Bulut sağa yığıldı" yazılı, "Sağ uç: ?" boş. Sağ uç nasıl yüklenir? **Kısmen eksi** / Kısmen artı / Yüksüz. Dayandığı anlatım: 2–3. İpuçları: "Elektronlar eksi yüklüdür." · "Yığıldıkları yerde eksi yük fazlalaşır."

Sonra:
6. Elektronların yığıldığı sağ uç kısmen eksidir.

Soru (`tag: 'Sıra sende'`): Bir an sonra elektronlar sola yığılıyor. Sağ uç nasıl olur? **Kısmen artı** / Kısmen eksi / Yüksüz. Dayandığı anlatım: 2–3, 5. İpuçları: "Elektronlar sağdan ayrıldı." · "Elektronlar azaldığında artı yük baskın olur."

Sonra:
7. Elektronlar sola geçince sağ uç kısmen artı olur.

### Sahne 3 · İyon yaklaşınca

Tahta: helyum atomu, bulutu simetrik. Soldan Na⁺ yaklaşır; bulut iyona doğru kayar: iyona yakın uç mavi "δ⁻", uzak uç turuncu "δ⁺"; iyon ile yakın uç arasında yeşil kesikli çizgi. Sonra Na⁺ gider, Cl⁻ gelir; bulut iyondan uzaklaşır: yakın uç turuncu "δ⁺", uzak uç mavi "δ⁻"; yeşil kesikli çizgi.

Anlatım:
1. Helyumun yanına bir iyon gelsin: Na⁺.
2. Artı yüklü iyon, elektronları kendine doğru çeker.
3. Helyumun iyona yakın ucu kısmen eksi, uzak ucu kısmen artı olur.
4. İyon, helyumda bir dipol indüklemiştir.
5. İyon ile bu indüklenmiş dipol birbirini çeker.
6. Buna iyon-indüklenmiş dipol etkileşimi denir.
7. Eksi yüklü bir iyon gelseydi, elektronlar iyondan uzaklaşırdı.
8. O zaman helyumun iyona yakın ucu kısmen artı olurdu.

Soru (`tag: 'Sıra sende'`; yeni durum): Cl⁻ iyonu bir neon atomuna yaklaşıyor. Neonun iyona yakın ucu nasıl yüklenir? **Kısmen artı** / Kısmen eksi / Yüksüz. Dayandığı anlatım: 7–8. İpuçları: "Eksi iyon elektronları kendinden uzağa iter." · "Elektronlar karşı uca yığılır."

Sonra:
9. Cl⁻ elektronları iter: neonun yakın ucu kısmen artı olur.

Defter ("İndüklenmiş dipol"): **Yaklaşan tanecik, apolar taneciğin yük dağılımını geçici bozar.** Örnek: Na⁺–He.

### Sahne 4 · Polar molekül yaklaşınca

Tahta: solda HCl (uzay-dolgu, şerit gölgesi: klor ucu mavi δ⁻, hidrojen ucu turuncu δ⁺), sağda helyum atomu. Helyum yaklaşırken bulutu HCl'nin klor ucundan uzaklaşır: yakın uç turuncu "δ⁺", uzak uç mavi "δ⁻". İki dipol arasında yeşil kesikli çizgi.

Anlatım:
1. Şimdi helyuma polar bir molekül yaklaşsın: HCl.
2. HCl'nin klor ucu eksidir; helyumun elektronlarını iter.
3. Helyumun yakın ucu kısmen artı, uzak ucu kısmen eksi olur.
4. HCl'nin kalıcı dipolü, helyumda dipol indüklemiştir.
5. Bu iki dipolün zıt uçları birbirini çeker.
6. Buna dipol-indüklenmiş dipol etkileşimi denir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada Ne atomuna HCl'nin hidrojen ucu yaklaşıyor; "Hidrojen ucu artıdır: elektronları kendine çeker" yazılı, "Neonun yakın ucu: ?" boş. Neonun HCl'ye yakın ucu nasıl yüklenir? **Kısmen eksi** / Kısmen artı / Yüksüz. Dayandığı anlatım: 2–4; sahne 3, 2–3. İpuçları: "Artı uç elektronları kendine çeker." · "Elektronlar yakın uca yığılır."

Sonra:
7. Elektronlar artı uca yığılır: yakın uç kısmen eksi olur.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada HCl ile CH₄): HCl ile CH₄ arasındaki etkileşim hangisidir? **Dipol-indüklenmiş dipol** / Dipol-dipol / İyon-indüklenmiş dipol. Dayandığı anlatım: 1–6; sahne 1, 2. İpuçları: "HCl polar; CH₄ apolar." · "Apolar tanecikte dipol indüklenir."

Sonra:
8. Polar HCl, apolar CH₄'te dipol indükler.

Defter ("Dipol-indüklenmiş dipol"): **Polar molekül ile apolar tanecik: dipol-indüklenmiş dipol.** Örnek: HCl–He.

### Sahne 5 · İki apolar tanecik: London kuvveti

Tahta: iki H₂ molekülü yan yana, simetrik gölgeli. Soldaki molekülün gölgesi sola yığılır (sol uç δ⁻, sağ uç δ⁺ olur). Sağdaki molekülün gölgesi, soldakinin artı ucuna doğru kayar: sol ucu δ⁻, sağ ucu δ⁺ olur. Soldakinin δ⁺ ucu ile sağdakinin δ⁻ ucu arasında yeşil kesikli çizgi ve "London kuvveti" etiketi belirir. Sonra iki He atomu ve iki O₂ için aynı çizim küçük ölçekte gösterilir.

Anlatım:
1. İki H₂ molekülü yan yana gelsin; ikisi de apolardır.
2. Birinde elektron bulutu bir an yığılır ve geçici dipol oluşur.
3. Bu geçici dipol, komşu molekülde de bir dipol indükler.
4. İki dipolün zıt uçları arasında çekim kurulur.
5. Buna indüklenmiş dipol-indüklenmiş dipol etkileşimi, yani London kuvveti denir.
6. Soy gaz atomları ve apolar moleküller arasında bu çekim etkindir.
7. Elektron sayısı fazla ve bulut yaygınsa London kuvveti artar.

Soru (`tag: 'Sıra sende'`; yeni durum): O₂ molekülleri arasında etkin olan çekim hangisidir? **London kuvveti** / Dipol-dipol / İyon-dipol. Dayandığı anlatım: 1–6. İpuçları: "O₂ apolar bir moleküldür." · "Apolar moleküller arasında hangi çekim vardı?"

Sonra:
8. O₂ apolardır: moleküller arasında London kuvveti etkindir.

Defter ("London kuvveti"): **Apolar tanecikler arasında London kuvveti etkindir.** Örnek: He–He.

### Sahne 6 · Beş etkileşim, tek tablo

Tahta: üçgen tablo; satır başlıkları ve sütun başlıkları aynı: "polar molekül", "iyon", "apolar molekül ya da soy gaz atomu". Hücreler anlatım ilerledikçe dolar: polar–polar "dipol-dipol"; iyon–polar "iyon-dipol"; polar–apolar "dipol-indüklenmiş dipol"; iyon–apolar "iyon-indüklenmiş dipol"; apolar–apolar "indüklenmiş dipol-indüklenmiş dipol (London)". İyon–iyon hücresi "—" kalır. Başlıkların yanında küçük çizim: polar için şerit, iyon için yüklü küre, apolar için simetrik gölgeli küre.

Anlatım:
1. Etkileşimin adı, etkileşen taneciklerin türünden çıkar.
2. Polar molekül, etkileşimin adına “dipol” olarak girer.
3. Apolar molekül ve soy gaz atomu “indüklenmiş dipol” olarak girer.
4. İyon, adına “iyon” olarak girer.
5. İki tanecik türü yan yana gelince etkileşimin adı çıkar.
6. London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimlerine birlikte van der Waals kuvvetleri denir.

(Satır 6 on iki kelimedir; "dipol-indüklenmiş dipol" iki kelime sayıldı.)

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada Na⁺ ve He. İlk adım yazılı: "Na⁺: iyon · He: soy gaz atomu → indüklenmiş dipol". Son adım boş: "Etkileşim: ?". Na⁺ ile He arasındaki etkileşimin adı nedir? **İyon-indüklenmiş dipol** / İyon-dipol / İndüklenmiş dipol-indüklenmiş dipol. Dayandığı anlatım: 2–5. İpuçları: "İyon, iyon olarak girer." · "Soy gaz atomu, indüklenmiş dipol olarak girer."

Sonra:
7. İyon ile soy gaz atomu: iyon-indüklenmiş dipol.

Soru (`tag: 'Sıra sende'`; yeni durum): NH₃ ile CH₄ arasındaki etkileşimin adı nedir? **Dipol-indüklenmiş dipol** / Dipol-dipol / İndüklenmiş dipol-indüklenmiş dipol. Dayandığı anlatım: 2–5; sahne 1, 2. İpuçları: "NH₃ polardır, CH₄ apolardır." · "Polar molekül dipol, apolar molekül indüklenmiş dipol olarak girer."

Sonra:
8. Polar NH₃ ile apolar CH₄: dipol-indüklenmiş dipol.

Defter ("Etkileşimin adı"): **Polar: dipol. Apolar, soy gaz: indüklenmiş dipol. İyon: iyon.** Na⁺–He: iyon-indüklenmiş dipol.

Defter ("van der Waals"): **van der Waals: London, dipol-dipol, dipol-indüklenmiş dipol.** Örnek: He–He.

### Sahne 7 · Madde çiftlerini adlandır

Tahta: on iki satırlı seçmeli tablo: sol sütun "madde çifti", sağ sütun "etkileşim". Başta bütün satırlarda yalnızca çiftler yazılıdır, etkileşim boştur. Kartlar sırayla ortaya gelir; doğru seçilince kartın adı ilgili satıra yazılır; sonda tablo tam görünür.

Anlatım:
1. On iki çiftin etkileşimini tabloya yazalım.

Dene (kart başına seçim; `tag: 'Adlandır'`; seçenekler beş etkileşimin adı: dipol-dipol · iyon-dipol · dipol-indüklenmiş dipol · iyon-indüklenmiş dipol · indüklenmiş dipol-indüklenmiş dipol (London); doğru olunca altına tanecik türleri düşer):
- He–He → **indüklenmiş dipol-indüklenmiş dipol (London)**. "İkisi de soy gaz atomu."
- O₂–O₂ → **London**. "İki apolar molekül."
- H₂S–H₂S → **dipol-dipol**. "İki polar molekül."
- CH₄–HF → **dipol-indüklenmiş dipol**. "HF polar, CH₄ apolar."
- Mg²⁺–CO₂ → **iyon-indüklenmiş dipol**. "Mg²⁺ iyon, CO₂ apolar."
- CH₄–N₂ → **London**. "İki apolar molekül."
- Na⁺–H₂O → **iyon-dipol**. "Na⁺ iyon, H₂O polar."
- He–Ne → **London**. "İki soy gaz atomu."
- Cl⁻–H₂O → **iyon-dipol**. "Cl⁻ iyon, H₂O polar."
- HF–BH₃ → **dipol-indüklenmiş dipol**. "HF polar, BH₃ apolar."
- NH₃–HF → **dipol-dipol**. "İki polar molekül."
- CO–BH₃ → **dipol-indüklenmiş dipol**. "CO polar (iki atomlu, elektronegatifliği farklı), BH₃ apolar."

Dayandığı anlatım: sahne 6, 1–5; sahne 3, 6; sahne 4, 6; sahne 5, 5.

Sonra:
2. On iki çiftin hepsinde etkileşim, taneciklerin türünden çıktı.

### Çıkış soruları

1. (yeni durum) İki argon atomu arasındaki etkileşim hangisidir? **İndüklenmiş dipol-indüklenmiş dipol (London)** / Dipol-dipol / İyon-dipol. (sahne 5, 6)
2. (yeni durum) K⁺ iyonu bir CF₄ molekülüne yaklaşıyor. Etkileşim hangisidir? **İyon-indüklenmiş dipol** / İyon-dipol / Dipol-indüklenmiş dipol. (sahne 3, 6)
3. (yeni durum) H₂O ile Ne arasındaki etkileşim hangisidir? **Dipol-indüklenmiş dipol** / Dipol-dipol / İyon-dipol. (sahne 4, 6)
4. (yanılgı) CH₄ molekülleri arasında etkileşim olur mu? **Olur; London kuvveti etkindir** / Olmaz; CH₄ apolardır / Olmaz; CH₄'ün dipol momenti sıfırdır. (sahne 2, 5)
5. (yeni durum) Hangisi van der Waals kuvvetlerinden biridir? **Dipol-indüklenmiş dipol** / İyon-dipol / İyon-indüklenmiş dipol. (sahne 6)

Özet: Apolar tanecikte yük dağılımı geçici bozulur. · Yaklaşan tanecik dipol indükler. · Beş etkileşimin adı taneciklerin türünden çıkar. · **Dipolü olmayan tanecikte de dipol indüklenir.**

## G4 · Hidrojen bağı

- **Fikir:** Yapısında F–H, O–H ya da N–H bağlarından en az biri bulunan moleküller hidrojen bağı kurabilir. Hidrojen bağı, dipol-dipol etkileşimlerinin içinde ayrı bir gruptur ve dipol-dipol etkileşiminden güçlüdür; aynı ya da farklı moleküller arasında kurulur. DNA'nın iki zincirini de bu bağlar birleştirir.
- **Giriş ekranı sorusu:** DNA'nın iki zincirini bir fermuar gibi bir arada tutan ne?
- **Kaynak:** Ders kitabı s. 154 (hidrojen bağı: H atomu doğrudan F, O ya da N atomuna bağlıysa; hidrojende kısmi artı, ortaklanmamış çiftli F, O ya da N atomunda kısmi eksi yük yoğunluğu fazladır; moleküller arası çekim dipol-dipol etkileşiminden oldukça güçlüdür; komşu moleküller arasında oluşur; Görsel 2.19; yapısında en az bir F–H, O–H ya da N–H bağı bulunan moleküller hidrojen bağı kurabilir; Etkinlik 2.15 soru 6–7: aynı ve farklı moleküller arasında), s. 153 (Etkinlik 2.15 madde çiftleri: F₂–HF, NH₃–H₂O, H₂O–H₂O, HF–HF, H₂S–H₂S, HCl–HCl, NH₃–NH₃ ve elektronegatiflik tablosu), s. 155 (okuma parçası: DNA kalıtsal özellikleri taşır; sarmal bir merdiven gibi iki zincirden oluşur; şeker ve fosfat zinciri dışta, azotlu bazlar basamaklarda; dört baz adenin A, timin T, guanin G, sitozin C; G–C ve A–T arasındaki hidrojen bağları iki zinciri birleştirir ve genetik kodu korur), s. 156 (Kontrol Noktası 2.7: hidrojen bağı yapabilen moleküller).
- **Sınır:** Ölçüt yalnızca F–H, O–H ve N–H bağıdır. Hidrojen bağının dipol-dipol etkileşiminden güçlü olduğu tek cümledir; kJ/mol değerleri, kuvvet sıralaması alıştırması, suyun yoğunluk anomalisi, buzun yapısı, çözünürlük yok. DNA tek sahnedir ve s. 155'in yazdığı kadardır: bazların yapı formülleri çizilmez, "G–C daha güçlü" gibi karşılaştırma (s. 157) alınmaz, nükleotit ve adların kökeni anlatılmaz. Kitabın "elektronegatiflik farkı F–H, O–H, N–H bağlarında diğer kovalent bağlardan fazladır" cümlesi alınmaz (bölüm "Tutarsızlıklar").
- **Güç kavramlar ve gösterimi:** (1) Kovalent bağ ile hidrojen bağı: üç su molekülü bir zincirde; molekül içindeki O–H düz koyu çizgi ("bağ"), komşu moleküller arasındaki O···H yeşil kesikli çizgi ("hidrojen bağı"). (2) "Hidrojen içeren her molekül değil": Lewis yapılarında F–H, O–H, N–H bağları kalın çerçeveyle vurgulanır; H₂S, HCl, CH₄, H₂'deki hidrojenlerin bağlı olduğu atom (S, Cl, C, H) çerçevesiz kalır. (3) DNA merdiveni: iki zincir dikey, aralarda dört baz (A, T, G, C) renkli dikdörtgenlerle; A–T ve G–C arasında yeşil kesikli çizgiler.
- **Hedeflenen yanılgı:** "Hidrojen içeren her molekül hidrojen bağı kurar" ve "hidrojen bağı, O–H gibi molekül içi bir bağdır."
- **Akılda kalıcı cümle:** F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Apolar moleküller arasında etkin olan çekim hangisidir? **London kuvveti** / Dipol-dipol / İyon-dipol. (G3) Yanlışta: "Apolar tanecikler arasında London kuvveti etkindir."
2. H₂O'da oksijenin kaç ortaklanmamış çifti vardır? **2** / 1 / 4. (D2, daha eski) Yanlışta: "Oksijenin kalan dört elektronu iki ortaklanmamış çift olur."

Sonra: "Bugün dipol-dipol etkileşimlerinin güçlü bir grubuna bakacağız."

### Sahne 2 · Güçlü bir dipol-dipol

Tahta: üç su molekülü bir zincirde (Görsel 2.19'un sadeleştirilmişi): her oksijen mavi gölgeli δ⁻, her hidrojen turuncu δ⁺. Bir su molekülü içindeki O–H düz koyu çizgi; komşu moleküllerin O ve H'si arasındaki yeşil kesikli çizgi. Sol üstte küçük H₂S–H₂S çifti (soluk, karşılaştırma için).

Anlatım:
1. H₂S de H₂O da polardır; ikisi de dipol-dipol kurar.
2. Suda hidrojen, doğrudan elektronegatif bir oksijen atomuna bağlıdır.
3. Böyle bir hidrojen, güçlü bir artı kutup olur.
4. Komşu su molekülünün oksijeni, ortaklanmamış çiftleriyle yoğun eksi kutuptur.
5. Aralarındaki çekim, dipol-dipol etkileşiminden çok daha güçlüdür.
6. Bu güçlü etkileşime hidrojen bağı denir.
7. Hidrojen bağı, dipol-dipol etkileşimlerinin ayrı bir grubudur.
8. Hidrojen bağı komşu moleküller arasındadır; O–H bağı molekülün içindedir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada iki HF molekülü; iki adım yazılı: "1. Hidrojen F'ye bağlı: F–H var." · "2. Komşu molekülde ortaklanmamış çiftli F var." Son adım boş: "Etkileşim: ?". HF molekülleri arasında hangi etkileşim vardır? **Hidrojen bağı** / Dipol-dipol; hidrojen bağı yok / London kuvveti. Dayandığı anlatım: 2–7. İpuçları: "Hidrojen doğrudan florun yanında." · "F, O ya da N'ye bağlı hidrojen güçlü artı kutuptur."

Sonra:
9. HF molekülleri birbirleriyle hidrojen bağı kurar.

### Sahne 3 · Hangi moleküller kurar?

Tahta: yedi molekül kartı; her kartta formül ve Lewis yapısı: H₂O, NH₃, HF, H₂S, HCl, CH₄, H₂. Hidrojenin bağlı olduğu atom her kartta halkalanır; F–H, O–H ve N–H bağları kalın çerçeveyle vurgulanır (H₂O'da iki, NH₃'te üç, HF'de bir). İki kutu: "hidrojen bağı kurabilir", "kuramaz".

Anlatım:
1. Bir molekül F–H, O–H ya da N–H bağı taşıyorsa hidrojen bağı kurabilir.
2. Su iki O–H, amonyak üç N–H, HF bir F–H bağı taşır.
3. H₂S, HCl ve CH₄ hidrojen içerir; ama bu üç bağdan birini taşımaz.
4. Hidrojenin F, O ya da N'ye bağlı olması gerekir.

Soru (`tag: 'Sıra sende'`; ölçüt): Hidrojen bağı kurabilen molekülleri hangi ölçüt ayırır? **Yapısında F–H, O–H ya da N–H bağı bulunması** / Yapısında hidrojen bulunması / Molekülün polar olması. Dayandığı anlatım: 1–4. İpuçları: "H₂S ve HCl de hidrojen içerir ve polardır." · "Hidrojenin bağlı olduğu atoma bak."

Sonra:
5. Ölçüt, hidrojenin bağlı olduğu atomdur: F, O ya da N.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; seçenekler iki kutunun adı; kart doğru kutuya oturunca altına cümle düşer):
- H₂O → **kurabilir**. "O–H bağı var."
- NH₃ → **kurabilir**. "N–H bağı var."
- HF → **kurabilir**. "F–H bağı var."
- H₂S → **kuramaz**. "Hidrojen kükürte bağlı; S–H, ölçütteki üç bağdan değil."
- HCl → **kuramaz**. "Hidrojen klora bağlı; Cl–H, ölçütteki üç bağdan değil."
- CH₄ → **kuramaz**. "Hidrojenler karbona bağlı; C–H, ölçütteki üç bağdan değil."
- H₂ → **kuramaz**. "Hidrojen hidrojene bağlı; H–H, ölçütteki üç bağdan değil."

Dayandığı anlatım: 1–5.

Sonra:
6. Hidrojen içeren her molekül hidrojen bağı kuramaz.

Defter ("Hidrojen bağı"): **F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulur.** Örnek: H₂O–H₂O.

### Sahne 4 · Çiftlere bak

Tahta: üç kutu: "hidrojen bağı", "dipol-dipol (hidrojen bağı yok)", "dipol-dipol değil". Kartlar sırayla ortaya gelir; her kartta iki molekül (Lewis yapısı, F–H, O–H, N–H bağları vurgulu) ve aralarında yeşil kesikli çizgi.

Anlatım:
1. İki molekül de F–H, O–H ya da N–H bağı taşımalıdır.
2. Bu koşul yoksa polar moleküller yalnızca dipol-dipol kurar.
3. Biri apolarsa dipol-indüklenmiş dipol oluşur.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada H₂O ve CH₄): H₂O ile CH₄ arasında hidrojen bağı oluşur mu? **Oluşmaz; CH₄'te F–H, O–H ya da N–H bağı yok** / Oluşur; ikisi de hidrojen içerir / Oluşur; H₂O polardır. Dayandığı anlatım: 1–3; sahne 3, 1–6. İpuçları: "İki molekülün de ölçütteki bağlardan birini taşıması gerekir." · "CH₄'te hidrojenler karbona bağlı."

Sonra:
4. İki taraf da F–H, O–H ya da N–H taşımıyorsa hidrojen bağı yoktur.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; seçenekler üç kutunun adı):
- F₂–HF → **dipol-dipol değil**. "F₂ apolar: HF ile dipol-indüklenmiş dipol kurar; F₂'de F–H bağı yok."
- NH₃–H₂O → **hidrojen bağı**. "İkisi de N–H ya da O–H taşıyor."
- H₂O–H₂O → **hidrojen bağı**. "İkisi de O–H taşıyor."
- HF–HF → **hidrojen bağı**. "İkisi de F–H taşıyor."
- NH₃–NH₃ → **hidrojen bağı**. "İkisi de N–H taşıyor."
- H₂S–H₂S → **dipol-dipol (hidrojen bağı yok)**. "İki polar molekül; S–H, ölçütteki bağlardan değil."
- HCl–HCl → **dipol-dipol (hidrojen bağı yok)**. "İki polar molekül; Cl–H, ölçütteki bağlardan değil."
- HCl–H₂S → **dipol-dipol (hidrojen bağı yok)**. "İki polar molekül; ikisinde de ölçütteki bağlardan yok."

Dayandığı anlatım: sahne 2, 5–7; bu sahne, 1–4; sahne 3, 6.

Sonra:
5. Hidrojen bağı, dipol-dipol etkileşimlerinin içinde ayrı gruptur.

### Sahne 5 · Aynı moleküller mi, farklı moleküller mi?

Tahta: iki kutu: "aynı moleküller arasında", "farklı moleküller arasında". Dört kart: NH₃–NH₃, H₂O–H₂O, HF–HF, NH₃–H₂O; her kartta iki molekül ve aralarındaki hidrojen bağı çizgisi.

Anlatım:
1. Hidrojen bağı aynı ya da farklı moleküller arasında kurulur.
2. Su molekülleri kendi aralarında, su ile amonyak da birbiriyle kurar.

Dene (kart başına seçim; `tag: 'Sınıflandır'`):
- NH₃–NH₃ → **aynı moleküller**. "İkisi de amonyak."
- H₂O–H₂O → **aynı moleküller**. "İkisi de su."
- HF–HF → **aynı moleküller**. "İkisi de HF."
- NH₃–H₂O → **farklı moleküller**. "Biri amonyak, biri su; ikisi de hidrojen bağı kurabilir."

Dayandığı anlatım: bu sahne, 1–2; sahne 4, 5.

Sonra:
3. Hidrojen bağı için moleküllerin aynı türden olması gerekmez.

### Sahne 6 · DNA'nın iki zinciri

Tahta: sarmal bir merdiven şeması (dikey iki zincir; basamaklarda dört baz: A, T, G, C renkli dikdörtgenlerle). Zincirler "şeker ve fosfat", basamaklar "azotlu bazlar" olarak adlandırılır. Bir basamak büyütülür: A–T ve G–C çiftleri; aralarında yeşil kesikli çizgiler (hidrojen bağları). Her cümle ilerledikçe ilgili parça belirir, biten parça soluklaşır.

Anlatım:
1. DNA, kalıtsal özellikleri taşıyan bir moleküldür.
2. Sarmal bir merdivene benzer; iki zincirden oluşur.
3. Şeker ve fosfattan oluşan zincir dışta, azotlu bazlar basamaklardadır.
4. Dört baz vardır: adenin (A), timin (T), guanin (G), sitozin (C).
5. A–T ve G–C arasındaki hidrojen bağları iki zinciri birleştirir.
6. Bu bağlar, genetik kodu korur.

Soru (`tag: 'Sıra sende'`): DNA'nın iki zincirini birleştiren hidrojen bağları hangi bazlar arasındadır? **A–T ve G–C** / A–G ve T–C / A–C ve T–G. Dayandığı anlatım: 4–5. İpuçları: "Metinde iki baz çifti geçti." · "Çiftler A ile T, G ile C."

Sonra:
7. İki zinciri hidrojen bağları bir arada tutar.

### Çıkış soruları

1. (yeni durum) H₂O ile HF karıştırılıyor. Farklı moleküller arasında hidrojen bağı oluşur mu? **Oluşur; ikisi de O–H ya da F–H bağı taşır** / Oluşmaz; moleküller farklı türden / Oluşmaz; yalnızca aynı moleküller arasında oluşur. (sahne 4, 5)
2. (yanılgı, yeni durum) H₂S'te iki hidrojen vardır. H₂S molekülleri arasında hidrojen bağı oluşur mu? **Oluşmaz; hidrojen F, O ya da N'ye değil kükürte bağlı** / Oluşur; H₂S hidrojen içerir / Oluşur; H₂S polardır. (sahne 3)
3. (yanılgı) Su molekülündeki O–H bağı ile komşu su molekülleri arasındaki hidrojen bağı için hangisi doğrudur? **O–H molekülün içindedir; hidrojen bağı komşu moleküller arasındadır** / İkisi de aynı bağdır / İkisi de komşu moleküller arasındadır. (sahne 2)
4. (yeni durum) Hangisi hidrojen bağı kurabilir? **NH₃** / CH₄ / HCl. (sahne 3)
5. DNA'nın iki zincirini ne birleştirir? **A–T ve G–C arasındaki hidrojen bağları** / A–T ve G–C arasındaki iyonik bağlar / Şeker ve fosfat arasındaki London kuvvetleri. (sahne 6)

Özet: Hidrojen bağı için F–H, O–H ya da N–H bağı gerekir. · Hidrojen içeren her molekül kuramaz. · Hidrojen bağı komşu moleküller arasındadır; dipol-dipolden güçlüdür. · **F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir.**

## G5 · Konu tekrarı: Moleküller arası etkileşimler (`g5-tekrar.html`, 1 sahne + 10 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): sekiz kural tahtada sırayla toplanır, her biri küçük çizimiyle (dört tanecik kartı · üç sınıf · adlandırma kuralı · beş etkileşimin üçgen tablosu · van der Waals grubu · hidrojen bağı zinciri) ve deftere düşer; biten kural soluklaşır. Üçgen tablo (G3 sahne 6) bu sahnede bir kez daha, bütün hücreleriyle görünür; tablo olduğu için 25 kelime sınırı aşılabilir.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Etkileşimin sınıfını, karşılaşan taneciklerin türü belirler.
3. Etkileşimler molekül-molekül, iyon-molekül ve atom-atom olarak ayrılır.
4. Etkileşimin adı, iki tanecik türünün adından çıkar.
5. Polar molekül “dipol”, apolar molekül ve soy gaz atomu “indüklenmiş dipol” olur.
6. Beş etkileşim vardır: dipol-dipol, iyon-dipol ve indüklenmiş dipollü üç tür.
7. London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimleri van der Waals kuvvetleridir.
8. F–H, O–H ya da N–H bağı taşıyan moleküller hidrojen bağı kurar.
9. Hidrojen bağı, dipol-dipol etkileşimlerinin ayrı ve daha güçlü grubudur.

Sorular (`quiz`, karışık sırada):

1. Br⁻ iyonu ile H₂O arasındaki etkileşim hangisidir? **İyon-dipol** / Dipol-dipol / İyon-indüklenmiş dipol. — G2
2. Ne ile Ne arasındaki etkileşim hangisidir? **İndüklenmiş dipol-indüklenmiş dipol (London)** / Dipol-dipol / Atom-dipol. — G3
3. (tahtada CCl₄'ün Lewis yapısı: C merkez, merkezde ortaklanmamış çift yok) NH₃ ile CCl₄ arasındaki etkileşim hangisidir? **Dipol-indüklenmiş dipol** / Dipol-dipol / İyon-dipol. — G3
4. K⁺ iyonu bir CH₄ molekülüne yaklaşıyor. Etkileşim hangisidir? **İyon-indüklenmiş dipol** / İyon-dipol / Dipol-indüklenmiş dipol. — G3
5. H₂S ile HCl arasındaki etkileşim hangisidir? **Dipol-dipol** / Hidrojen bağı / London kuvveti. — G2, G4
6. HF ile NH₃ karıştırılıyor. Aralarında hangi etkileşim oluşur? **Hidrojen bağı** / Yalnızca London kuvveti / İyon-dipol. — G4
7. (yanılgı) CH₄ molekülleri arasında hangisi doğrudur? **London kuvveti etkindir** / Etkileşim olmaz, çünkü CH₄ apolardır / Hidrojen bağı kurulur, çünkü CH₄ hidrojen içerir. — G3, G4
8. (yeni durum) Hangi çift iyon-molekül etkileşimidir? **Mg²⁺ ile NH₃** / NH₃ ile NH₃ / Ne ile Ne. — G1
9. (yanılgı, yeni durum) Mg²⁺ ile CO₂ arasında iyon-dipol etkileşimi oluşur mu? **Oluşmaz; CO₂ apolardır, iyon-indüklenmiş dipol oluşur** / Oluşur; CO₂'de polar bağlar vardır / Oluşur; Mg²⁺ bir iyondur. — G2, G3
10. Hangisi van der Waals kuvvetlerinden biridir? **Dipol-indüklenmiş dipol** / İyon-dipol / İyon-indüklenmiş dipol. — G3

Akılda kalıcı cümle: Etkileşimin adını taneciklerin türü verir; F–H, O–H ya da N–H bağı varsa hidrojen bağı da kurulur.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.7) | Karşılığı |
|---|---|
| a) Etkileşimlerin sınıflandırılması için ölçütler belirler: atom, iyon, polar molekül, apolar molekül | G1 sahne 3 (dört tür tanecik), sahne 4 (ölçüt sorusu: seçenekli) |
| b) Aynı ya da farklı kimyasal türler arasındaki etkileşimleri ayrıştırır | G1 sahne 4–5 (molekül-molekül, iyon-molekül, atom-atom); G2 sahne 6; G4 sahne 4–5 |
| c) Etkileşimleri gruplandırır | G2 sahne 4, 6 (dipol-dipol, iyon-dipol); G3 sahne 6–7 (beş tür); G4 sahne 3–4 (hidrojen bağı grubu) |
| ç) Grupları adlandırıp bilimsel karşılığıyla kıyaslar | G2 sahne 4 ("polar molekül–polar molekül grubunun bilimdeki adı"); G3 sahne 6; G4 sahne 2 (adın verilmesi), sahne 4 |
| Uygulama: gecko kertenkelesi sorusu | G1 giriş sorusu ve sahne 6 (kitabın yazdığı kadar cevap) |
| Uygulama: toz parçacıklarının bilgisayar ekranına yapışması sorusu | Alınmadı: cevabı kitapta yok (`PLAN.md` karar 9) |
| Uygulama: moleküller arasında, moleküller ile iyonlar ve soy gaz atomları arasında etkileşim olduğunu fark ettiren sorular | G1 sahne 2, 4, 5; çıkış soruları |
| Uygulama: molekül örneklerinin başka molekül, iyon ve soy gaz atomlarıyla etkileşimini inceleme | G1 sahne 5; G3 sahne 7 |
| Uygulama: etkileşim türüne ilişkin ölçütler belirleme | G1 sahne 4 (ölçüt sorusu); G2 sahne 4 (ölçüt sorusu); G4 sahne 3 (ölçüt sorusu) |
| Uygulama: molekül-molekül, iyon-molekül, atom-atom ayrımı | G1 sahne 4–5 |
| Uygulama: dipol-dipol, dipol-indüklenmiş dipol, iyon-dipol, iyon-indüklenmiş dipol, London gruplandırması | G2 sahne 3–6 (dipol-dipol, iyon-dipol); G3 sahne 2–7 (öteki üçü ve beşinin birlikte tablosu) |
| Uygulama: grupları bilimdeki karşılığıyla kıyaslama | G2 sahne 4; G3 sahne 6 (adlar ve van der Waals cümlesi); G4 sahne 2 |
| Uygulama: biyomimikri araştırma ödevi | `site dışı (sınıfta yapılır)`; GeckoBot alınmadı |
| Uygulama: polar bileşiklerde kanıt kartları; dipol-dipol'ün oluşum ölçütü | G2 sahne 4 (üç kart, kartı çevir, ölçüt sorusu) |
| Uygulama: aynı ya da farklı tür moleküller arası dipol-dipol; F–H, O–H, N–H içerenlerin ayrı grup olması | G2 sahne 4 (aynı ve farklı tür); G4 sahne 4 (dipol-dipol içinde hidrojen bağı grubu) |
| Uygulama: F–H, O–H, N–H bağı bulunduran moleküller "hidrojen bağı oluşturabilen moleküller" olarak gruplanır | G4 sahne 3 |
| Uygulama: gruplar bilimsel karşılığıyla kıyaslanır | G4 sahne 2, 4 |
| Uygulama: DNA'nın ikili sarmalında hidrojen bağları, genetik kodun korunması (okuma parçası) | G4 sahne 6 |
| Uygulama: yapılandırılmış grid ile farklı madde çiftleri arasındaki etkileşimler | G3 sahne 7 (seçmeli tablo, on iki çift); G4 sahne 4–5 |
| Uygulama: fikir belirtme hakkı, etkili iletişim, arkadaşlarla paylaşma | Derslerde yok (`site dışı (sınıfta yapılır)`) |
| Anahtar kavramlar: dipol, dipol-dipol etkileşimi, indüklenmiş dipol, London kuvveti, hidrojen bağı, van der Waals etkileşimi | G2 sahne 2–4; G3 sahne 2–6; G4 sahne 2; G3 sahne 6 (van der Waals) |
| Konu tekrarı | G5 |

Fazla olan: (1) δ⁺ ve δ⁻ gösterimi (E'de tanıtıldı; kitap s. 150–152 dayanak). (2) "Bağlardan daha zayıf" cümlesi (G1 sahne 2, kitap s. 147). (3) Tuzun suda çözünürken iyon-dipol örneği (G2 sahne 5, kitap s. 151; çözünürlük anlatılmaz). (4) "Elektron sayısı fazla ve bulut yaygınsa London kuvveti artar" cümlesi (G3 sahne 5; kitap s. 152; PLAN G3 sınırı tek cümleye izin verir). (5) "Hidrojen bağı dipol-dipolden güçlüdür" cümlesi (G4 sahne 2; kitap s. 154; sayı yok). (6) DNA'nın dört bazının adları (G4 sahne 6; kitap s. 155'te geçiyor). Eksik olan: öğrencinin kendi ölçütünü ve gruplamasını yazması (sitede seçenekli ölçüt soruları ve kart başına seçim var); arkadaşlarıyla fikir paylaşma; biyomimikri ödevi (hepsi `site dışı`); toz parçacığı sorusunun cevabı (kitapta yok).

## Çizim notları (kit için)

- `tanecik(tür, simge)`: dört tür tanecik. Soy gaz atomu: tek nötr gri küre, simgesi içinde, soluk simetrik gölge. İyon: renkli küre (katyon turuncu, anyon mavi), yük üs simgesiyle küre içinde. Polar molekül: E'deki `uzayDolgu` modeli, `yukBulutu` gölgesi bir yanda koyu, öbür yanda açık; uçlarda δ⁻ ve δ⁺ (`kutupEtiketi`). Apolar molekül: aynı model, gölge eşit, etiket yok. Tür adı kartın altına yazılır.
- `dipolSeridi(x, y, açı, boy)`: uçları yuvarlak bir şerit; artı yarısı turuncu, eksi yarısı mavi; uçlarında δ⁺ ve δ⁻. İki şerit yan yana döndürülebilir (G2 sahne 3'te ikinci molekül döner).
- `ciftCiz(a, b, {ilişki: 'çekme' | 'itme', ad})`: iki taneciği yan yana yerleştirir; aralarına yeşil kesikli çekim çizgisi ya da kırmızı itme oku çizer; çizginin üstüne etkileşimin adı yazılabilir.
- `bulutKaydir(tanecik, yön, miktar)`: gölgeyi bir yana yığar; yığılan uç koyu mavi ve δ⁻, öbür uç açık turuncu ve δ⁺ olur. Geri dönüş ve ters yön animasyonu gerekir (G3 sahne 2). Yaklaşan taneciğe göre otomatik yön seçmesi (Na⁺ yaklaşınca iyona doğru; Cl⁻ ya da HCl'nin klor ucu yaklaşınca uzağa) G3 sahne 3–4 için yeterlidir.
- `kartCevir(ön, arka)`: kapalı kart tıklayınca çevrilir; arkasında iki tanecik ve çekim çizgisi. Üç kartın hepsi çevrilince `c.cont` çözülür (G2 sahne 4).
- `kartSecim(kartlar, kutular)`: "kart başına seçim" sahnesinin ortak yardımcısı: kartı ortaya getirir, `c.choice` kurar (seçenekler kutu adları), doğruysa kartı kutuya küçülterek yerleştirir ve kartın cümlesini yazar; yanlışta ipucu gösterir. G1 sahne 5, G2 sahne 6, G3 sahne 7, G4 sahne 3, 4, 5'te kullanılır.
- `secmeliTablo(satırlar, sütunlar)`: G3 sahne 7'nin on iki satırlı tablosu; satır, kart doğru seçilince dolar. G5'teki üçgen beş adlı tablo (`matris5`) aşamalı doldurulan sabit tablodur.
- `hidrojenBagiZinciri(n)`: üç su molekülü; molekül içi O–H düz koyu, moleküller arası O···H yeşil kesikli; oksijen mavi δ⁻, hidrojen turuncu δ⁺ (G4 sahne 2). Lewis kartlarında F–H, O–H, N–H bağlarını kalın çerçeveyle vurgulama seçeneği (`lewis(molekül, {vurgu: 'XH'})`; E ve D konularının `lewis` aracına eklenir).
- `dnaMerdiven()`: sarmal merdiven şeması: iki dikey zincir, aralarda A, T, G, C bazları renkli dikdörtgen olarak; A–T ve G–C arasında yeşil kesikli çizgiler; bir basamağı büyütme. Bazların yapı formülü çizilmez.
- `geckoAyak()`: gecko siluet → ayak → tüycükler → tüycük ucu ve yüzey molekülleri; çok sayıda ince yeşil çekim çizgisi çoğalıp toplanarak tek kalın oka ve "yaklaşık 10 N" yazısına dönüşür. Vektör şematik çizim yeterli; üretilmiş resim gerekmez.
- `bardakSu()`: bardak ve büyütülünce su molekülleri (G1 sahne 2); `ince çekim çizgisi` ile `kalın bağ çizgisi` karşılaştırma örneği.

## Raporda bildirilecekler (ana oturum için)

Bu bölüm yazarın notudur; ders yazılırken öğrenciye gösterilmez.

- **`PLAN.md` bölüm 8'de olmayan, kitaptan alınan bilgiler:** (1) s. 147: maddeyi oluşturan temel taneciklerin atom, molekül ya da iyon olduğu; Etkinlik 2.13 soruları (aynı ve farklı moleküller, iyonik madde ile moleküler madde, soy gaz atomları arasında çekim var mı). (2) s. 148: Etkinlik 2.14'ün iki tablosunun birbirinden farkı (CH₄–N₂ ve HF–BH₃ yalnızca ilk tabloda; C₂H₆–C₃H₈ ve CO–BH₃ yalnızca ikinci tabloda). (3) s. 149: Etkinlik 2.14 yönerge 2 görselleri (HCl–HCl önce ve sonra, KBr ile H₂O'da K⁺ oksijen ucuna, Br⁻ hidrojen uçlarına dönük, H₂–H₂); "dipol-dipol: aynı ya da farklı polar moleküller arasında görülür". (4) s. 151: London kuvvetinin kitaptaki öteki adı "dağılma kuvveti" (alınmadı); yük dağılımının konumunun değişmesinin tüm moleküllerde görüldüğü. (5) s. 152: iyon-indüklenmiş dipol ve dipol-indüklenmiş dipolün kısmi yük yönleri (anyona yakın bölge δ⁺, katyona yakın δ⁻; Görsel 2.17, 2.18'deki dağılım bu yöndedir); "elektron sayısı fazla ve elektron bulutu dağılmışsa kutuplanabilirlik kolaylaşır, London kuvveti artar" (iki koşullu cümle). (6) s. 154: hidrojen bağının iki yanlı koşulu (hidrojen F, O ya da N'ye bağlı ve kısmen artı; öbür tarafta ortaklanmamış çiftli, kısmen eksi F, O ya da N atomu); Etkinlik 2.15 soru 5 (HF ve HCl'deki δ⁻ büyüklüğü; alınmadı). (7) s. 155: DNA'nın bazlarının adları ve harfleri (A, T, G, C), zincirlerin dışta şeker–fosfat, basamaklarda azotlu bazlar olduğu. (8) s. 156: Kontrol Noktası 2.7'nin dokuz kutucuğu (CO, CH₄, CH₂O, HCl, NH₃, NaCl, Cl₂, H₂O, H₂). (9) s. 157: su molekülü modeli (üç molekül, hidrojen bağları) ve soru 3 (DNA'da bazlar arası hidrojen bağları, A–T ile G–C'nin karşılaştırılması; alınmadı).
- **`PLAN.md` bölüm 8 ile kitap arasındaki tutarsızlıklar:** (1) Bölüm 8, s. 148'in on dört çiftini tek liste olarak verir; kitapta iki tablo vardır ve her biri on iki çifttir, ikisi iki çiftte ayrışır (yukarıdaki (2)). (2) Bölüm 8 "London: elektron sayısı arttıkça artar (s. 151–152)" der; kitapta cümle s. 152'dedir ve "elektron sayısı fazla ve elektron bulutu dağılmış ise" koşuludur. (3) Bölüm 8 ve karar 17, DNA'daki bağlara "A–T ve G–C arasındaki hidrojen bağları iki zinciri birleştirir" der; kitap "molekül içi hidrojen bağları" yazar (DNA tek molekül olduğu için). Derste "iki zincir arasında" denir; G4'ün ölçütü komşu moleküller arası olduğundan "molekül içi" sözü kullanılmadı. (4) Karar 9, geckonun "ayaktaki milyonlarca ince tüycüğü" der; kitap "milyonlarca moleküler düzeydeki etkileşim" der (tüycüklerin sayısı yazmaz). Derste "milyonlarca etkileşim" denir, tüycük sayısı verilmez. (5) Kitabın s. 154 metni hidrojen bağında "elektronegatiflik farkı diğer kovalent bağlardan fazladır" der; kitabın kendi değerleriyle H–Cl farkı (3,16 − 2,20 = 0,96), H–N farkından (3,04 − 2,20 = 0,84) büyüktür. Bu cümle derse alınmadı; hidrojen bağının gerekçesi yük yoğunluğu olarak söylendi.
- **Kitapta bulunamadığı için yazılmayanlar:** toz parçacıklarının ekrana yapışmasının cevabı; HF–HCl gibi yalnızca bir tarafı F–H, O–H, N–H taşıyan çiftte hidrojen bağı olup olmadığı (kitabın cevap anahtarı yok; s. 154 ikinci tarafta F, O ya da N atomu ister; ders program düzeyinde iki molekülün de ölçütteki bağı taşımasını ister, HF–HCl çifti kullanılmadı); C₂H₆, C₃H₈ gibi merkez atomu olmayan moleküllerin polarlığı; Etkinlik 2.14 ve 2.15'in cevap anahtarı (cevaplar kitabın tanımlarından ve E konusunun kurallarından türetildi).
- **Programa göre kuşkulu içerik:** (1) Program "atom" ölçütünü sayar, örnek olarak soy gaz atomlarını verir; derste atom yalnızca soy gaz atomudur. (2) Hidrojen bağı, programın uygulama metninde dipol-dipol'ün alt grubudur; van der Waals tanımında (kitap s. 152, IUPAC) dipol-dipol bulunur ama hidrojen bağı anılmaz. Ders bu cümleyi aynen verir; "hidrojen bağı van der Waals kuvveti mi" sorusu sorulmaz (G5 soru 10'da çeldirici olarak da kullanılmadı). (3) Tuzun suda çözünmesi iyon-dipol örneği olarak yer alır (kitap s. 151); programdaki "çözünürlük" yasağı bu cümleyi kapsamaz ama genişlemeye açıktır. (4) G3'te "geçici dipol" (kendiliğinden dalgalanma) ve "indüklenmiş dipol" (yaklaşan taneciğin yol açtığı) kitapta eş anlamlı verilir; ders de aynı şeyi yapar, ayrım yapmaz. (5) Kitap Kontrol Noktası 2.7'deki CH₂O ve s. 148'deki C₂H₆–C₃H₈ kullanılmadı (polarlıkları E'nin iki ölçütüyle çıkmaz).
- **Dersin gerektireceği yeni çizim araçları (kit):** yukarıdaki "Çizim notları" bölümündedir; özet: `tanecik`, `dipolSeridi`, `ciftCiz`, `bulutKaydir`, `kartCevir`, `kartSecim`, `secmeliTablo`, `hidrojenBagiZinciri`, `dnaMerdiven`, `geckoAyak`, `bardakSu`; E ve D konularının `lewis`, `uzayDolgu`, `yukBulutu` ve `kutupEtiketi` araçlarının yeniden kullanımı (Lewis kartlarında F–H, O–H, N–H bağını vurgulama seçeneği eklenir).
