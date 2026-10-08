# Senaryolar — Konu F · Bileşiklerin adlandırılması

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.6, `../PLAN.md` bölüm 3 (F1, F2, F3), bölüm 7 (karar 5, 8, 14) ve bölüm 8 ("F · Adlandırma"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim ve üslup `A-metalik-bag.md` ile aynıdır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (Fe²⁺ "demir iki artı", (III) "üç", Na₂S "na iki es"). "Sonra" satırları aynı numaralamayı sürdürür.
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı, "tablo" numarasını (Tablo 2.1 gibi) ya da "veri verildi" gibi bir sözü hiçbir yerde görmez; tahtadaki listeler "iyon listesi", "basamak listesi", "ön ekler" gibi adlarla anılır.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Çeldiriciler öğretilmemiş bir konuya dayanmaz: F1 ve F2'de ön ek ("di", "tri") çeldirici olarak geçmez, sayı "iki", "üç" gibi sözcükle yazılır; F3'te ön ek öğretildikten sonra geçer. F3'te kitabın "pentaoksit" yazımı hiçbir yerde gösterilmez (raporda: kitaptaki çelişki).
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 5 çıkış sorusu. Fikir birkaç parçadan oluştuğu için 2–6. adımlar parça parça yinelenir.
- **Sınıflandırma, eşleştirme ve sıralama sahneleri kart başına seçimle kurulur** (motorda sürükle-bırak yoktur): kart tahtada öne çıkar, öğrenci kutuyu ya da eşini seçer (`kit.sinifla`; ad seçmeli sahnelerde kart başına üç şıklı `c.choice`), doğru seçilince kart tahtada yerine oturur. Her sahnede hangi kartlar, hangi kutular, her kartın doğru kutusu ve geri bildirimi yazılıdır.
- Renkler tema boyunca aynıdır: artı yük (katyon) turuncu, eksi yük (anyon) mavi, çekme yeşil, itme kırmızı. Adlandırmada ek renk kullanılmaz: ad parçaları yalnızca kendi iyonunun rengini taşır (katyon adı turuncu, anyon adı mavi); kovalent bileşiklerde ön ekler koyu, element ve anyon adı normal yazılır; Romen rakamı turuncudur (metalin yükü).
- Elektronegatiflik değerleri (kitaptan): H 2,20 · C 2,55 · N 3,04 · O 3,44 · F 4,00 · P 2,19 · S 2,58 · Cl 3,16. Yalnızca F3 sahne 6'da kullanılır.
- Bütün formül ve adlar kitabın örneklerinden ya da kitabın kuralının uygulanmasından gelir; kuralın uygulanmasıyla kurulan yeni durumlar (kitapta yazılı olmayanlar) aşağıda "yeni durum" diye anılır ve raporda sayılır.

Çizim araçları (kit için; B3'ün yük terazisi ve iyon kutularıyla ortak olması gerekir):

- `formulSerit(formül, {katyon, anyon})`: formül büyük yazılır; katyon parçası turuncu, anyon parçası mavi; her alt indisten bir çizgi o iyonun çizimine iner (iyon sayısı). Çok atomlu iyon tek bir yüklü kutu olarak çizilir (B3 `iyonKutusu`); parantez ve dış indis kutunun çevresindedir.
- `adKutulari(katyonAdi, anyonAdi)`: iki kutu yan yana (turuncu, mavi); kutulardaki sözcükler birleşip bileşiğin adını oluşturur; alt indisler formülde soluk kalır, ad kutularına geçmez ("indis düşer" hareketi: indis gri olur ve silinir).
- `romenSerit()`: 1 I · 2 II · 3 III · 4 IV · 6 VI · 7 VII; seçilen basamağın rakamı parlar.
- `basamakListesi()`: yedi satırlı liste (metal adı · sembol · olası basamaklar); satır satır belirir, satır seçilince basamak rozetleri (+2, +3) yanar.
- `adParcalari(formül)`: formülden kovalent adı kurar: ilk element, ikinci element; her elementin üstünde atom sayısı, altında ön ek; ön ek elementin adıyla birleşir; "tetra" + "oksit" birleşirken `a` harfi söner ve ad "tetroksit" olur.
- `onEkListesi()`: 1 mono · 2 di · 3 tri · 4 tetra · 5 penta · 6 hekza · 7 hepta · 8 okta; yardımcı olarak köşede küçük kalabilir.
- `elektronegatiflikSirasi(atomlar)`: iki atomun elektronegatifliği yan yana; küçük olan sola kayar (E ile ortak).
- `yapboz(yuvalar)`: tarsia tahtası; sekiz yuva, her yuvanın bir kenarında formül, öbür kenarında ad; kart seçilince öne çıkar, doğru eş seçilince yuvaya oturur ve çifti birbirine bağlayan çizgi belirir. Sürükleme yok.
- Yük terazisi (B3): F2 sahne 5–6'da metalin yükünü bulmak için kullanılır; kefelere metal sayısı ve anyon sayısı konur.

## F1 · İyonik bileşiğin adı: katyonun adı, anyonun adı

- **Fikir:** Tek bir tür katyonu olan metallerin iyonik bileşiklerinde ad, katyonun adı ve ardından anyonun adıdır; formüldeki sayılar ada girmez. Çok atomlu iyon içeren bileşik de aynı kuralla adlandırılır.
- **Giriş ekranı sorusu:** Bir bileşiğin adını ilk kez duyuyorsun; yalnızca adından formülünü çıkarabilir misin?
- **Kaynak:** Ders kitabı s. 139 (Etkinlik 2.11: NaCl sodyum klorür, Na₂S sodyum sülfür, Al₂S₃ alüminyum sülfür, MgBr₂ magnezyum bromür, MgCl₂ magnezyum klorür; bileşikten katyon ve anyonu belirleme; K⁺ potasyum, Li⁺ lityum, Ba²⁺ baryum, Ca²⁺ kalsiyum; F⁻ florür, I⁻ iyodür, N³⁻ nitrür), s. 140 (çok atomlu iyon içeren CaCO₃, Mg(NO₃)₂, (NH₄)₂SO₄, K₃PO₄; "adlandırma kuralını değiştirmez"), s. 141 (iyon adları listesi), s. 142 ("bileşiği oluşturan katyon ve anyon adı sırasıyla belirtilir; formüldeki atom sayıları dikkate alınmaz"; Na₂S sodyum sülfür şeması), s. 144 (MgH₂, Ca(OH)₂, NH₄Br, Al₂(SO₄)₃). Ön bilgi: iyon simgeleri, yükleri ve adları ile yük toplamının sıfır olması B3'te anlatıldı; tek cümleyle hatırlatılır.
- **Sınır:** Yalnızca tek katyonlu metaller (Li, Na, K, Rb, Cs, Mg, Ca, Sr, Ba, Al, Zn) ve amonyum. Demir, bakır gibi çok katyonlu metaller F2'dedir; Fe²⁺ ve Fe³⁺ bu derste geçmez. Çok atomlu iyonlar B3'ün sekiziyle sınırlıdır; CN⁻ yok. Asit ve baz adlandırması, hidratlar, yaygın adlar (tuz, kireç gibi) yok; Ca(OH)₂ ve NH₄Br yalnızca iyon adlarının birleşmesi olarak adlandırılır. Kovalent bileşik adı F3'tedir.
- **Güç kavramlar ve gösterimi:** (1) Formülden iyonlara geçiş: formül şeridinde katyon kısmı turuncu, anyon kısmı mavi; alt indisten iyon sayısına inen çizgiler; iyonlar ayrılınca iki kutu: "sodyum" ve "sülfür". (2) "Sayılar ada girmez": CaI₂'de iki iyodür çizilir ama ad kutusunda tek "iyodür" vardır; indis soluklaşıp silinir. (3) Çok atomlu iyon: tek parçalı yüklü kutu; adı da tek sözcük. (4) Ad → formül yönü: ad iki sözcüğe bölünür, her sözcük iyon kutusuna dönüşür, yük terazisi (B3) dengelenir.
- **Hedeflenen yanılgı:** "Formüldeki sayılar ada yazılır" (kalsiyum iki iyodür) ve "anyonun adı önce yazılır".
- **Akılda kalıcı cümle:** Önce katyonun adı, sonra anyonun adı.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Li⁺ ve S²⁻ iyonlarından oluşan bileşiğin formülü hangisidir? **Li₂S** / LiS / LiS₂. (B3) Yanlışta: "Toplam yük sıfır olmalı; iki Li⁺, bir S²⁻ ile dengelenir."
2. Elektron alan ametal atomu hangi iyona dönüşür? **Anyona** / Katyona / Elektron denizine. (B1) Yanlışta: "Elektron alan atom eksi yüklenir; eksi yüklü iyona anyon denir."

Sonra: "Bugün bu bileşiklerin adlarını nasıl kurduğumuza bakacağız." (E'nin hiçbir bilgisi F1'e dayanmaz; iki soru da, dayanılan bilgi olduğu için B'dendir.)

### Sahne 2 · Formülden iyonlara

Tahta: köşede küçük bir iyon listesi: Na⁺ sodyum · Mg²⁺ magnezyum · Al³⁺ alüminyum · Cl⁻ klorür · Br⁻ bromür · S²⁻ sülfür. Ortada formül şeridi: önce NaCl (Na turuncu, Cl mavi; altlarında birer iyon). Sonra Na₂S: Na₂ turuncu, S mavi; "2" indisinden iki Na⁺ çizimine iki çizgi iner; terazi gibi küçük bir toplam satırı: "2+ ve 2− → toplam 0". Biten adım soluklaşır.

Anlatım:
1. Bir iyonik bileşiğin formülü, içindeki iyonları saklar.
2. Formülde önce katyon, sonra anyon yazılır.
3. NaCl'de ilk simge katyonu, ikinci simge anyonu gösterir.
4. Yükleri iyon listesinden okuruz: Na⁺ ve Cl⁻.
5. Na₂S'de de ilk simge katyon, ikincisi anyondur.
6. Listeye göre iyonlar Na⁺ ve S²⁻'dir.
7. Alt indis 2, iki Na⁺ iyonu olduğunu söyler.
8. İki Na⁺ toplam 2+, bir S²⁻ 2− eder.
9. Toplam yük sıfır: iyonlar doğru bulundu.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada MgBr₂, "Katyon: Mg²⁺ · Br sayısı: 2 · Anyon: ?" yazılı; terazide sol kefede bir Mg²⁺ (2+), sağda iki boş yer. Soru: MgBr₂ bileşiğindeki anyon hangisidir? **Br⁻** / Br²⁻ / Br²⁺. Dayandığı anlatım: 2, 6–9. İpuçları: "Mg²⁺'nın 2+ yükünü iki Br⁻ dengeler." · "Anyon eksi yüklüdür."

Sonra:
10. MgBr₂'de bir Mg²⁺ ile iki Br⁻ iyonu vardır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Al₂S₃ bileşiğini oluşturan iyonlar hangileridir? **Al³⁺ ve S²⁻** / Al²⁺ ve S³⁻ / Al³⁺ ve S³⁻. Dayandığı anlatım: 2, 5–9 (indis sayıdır, yük değildir). İpuçları: "Alt indis iyon sayısını verir, yükü değil." · "İki Al³⁺ 6+, üç S²⁻ 6− eder."

Gör: Al₂S₃ şeridinde "2" ve "3" indislerinden iki Al³⁺ ve üç S²⁻ çizimine çizgiler iner; toplam satırı "6+ ve 6− → toplam 0".

Sonra:
11. İndisler iyonların sayısını söyler; yükleri listeden alırız.

### Sahne 3 · İyonların adı, bileşiğin adı

Tahta: beş satırlı tablo (sayı ve kısa etiketten oluşan tablo; `KURALLAR.md` 4): formül · bileşiğin adı. NaCl sodyum klorür · Na₂S sodyum sülfür · Al₂S₃ alüminyum sülfür · MgBr₂ magnezyum bromür · MgCl₂ magnezyum klorür. Köşede iyon listesi (önceki sahnedeki). Anlatım ilerledikçe adların ilk sözcüğü turuncu, ikinci sözcüğü mavi boyanır; ilk sözcükten listede iyonun adına, ikinciden anyonun adına ince çizgi çekilir.

Anlatım:
1. Beş iyonik bileşiğin formülü ve adı yan yana.
2. Adın ilk sözcüğü, katyonun adıdır.
3. Katyonun adı, metalin adıyla aynıdır.
4. İkinci sözcük, anyonun adıdır.
5. Tek atomlu anyonların adı çoğunlukla "-ür" ile biter.
6. Oksijenin anyonu oksit adını alır.
7. Al₂S₃'te üç sülfür var, ama ad "alüminyum sülfür".
8. MgCl₂'de iki klorür var; ad yine "magnezyum klorür".
9. Adlarda atom sayısı yazılmaz.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada KF; "K⁺ potasyum · F⁻ florür · Ad: potasyum ?" yazılı. Soru: Bileşiğin adındaki ikinci sözcük hangisidir? **florür** / flor / iyodür. Dayandığı anlatım: 2–5. İpuçları: "İkinci sözcük anyonun adıdır." · "Anyon F⁻ iyonudur; adı listede yazılı."

Sonra:
10. KF'nin adı potasyum florürdür.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama, yanılgı): CaI₂ bileşiğinin adı hangisidir? **Kalsiyum iyodür** / Kalsiyum iki iyodür / İyodür kalsiyum. Dayandığı anlatım: 2–4, 7–9. İpuçları: "Önce katyonun adı, sonra anyonun adı." · "Adlarda sayı yoktu."

Gör: CaI₂ şeridinde iki I⁻ çizilir; ad kutularında yalnızca bir "iyodür" yazar; "2" indisi soluklaşıp silinir.

Sonra:
11. Sayılar formülde kalır; ad yalnız iyonların adlarından kurulur.

Defter ("İyonik bileşiğin adı"): **Önce katyonun adı, sonra anyonun adı; sayılar yazılmaz.** Örnek: Na₂S: sodyum sülfür.

### Sahne 4 · Çok atomlu iyon içeren bileşikler

Tahta: dört satırlı tablo: formül · katyon · anyon · ad. Satırlar sırayla dolar: CaCO₃ (Ca²⁺ · CO₃²⁻ · kalsiyum karbonat), Mg(NO₃)₂ (Mg²⁺ · NO₃⁻ · magnezyum nitrat), (NH₄)₂SO₄ (NH₄⁺ · SO₄²⁻ · amonyum sülfat), K₃PO₄ (K⁺ · PO₄³⁻ · potasyum fosfat). Çok atomlu iyonlar yüklü kutu olarak çizilir; parantez ve dış indis kutunun çevresindedir ve ad satırında silinir.

Anlatım:
1. Çok atomlu iyonlar da aynı kurala uyar.
2. CaCO₃'te Ca²⁺ ve CO₃²⁻ vardır.
3. Karbonat tek parçalı bir anyondur; adı da tek sözcüktür.
4. Ad yine katyon, sonra anyondur: kalsiyum karbonat.
5. Mg(NO₃)₂'de iki nitrat var; ad "magnezyum nitrat".
6. Parantez ve dış indis ada girmez.
7. (NH₄)₂SO₄'ta katyon da çok atomludur: amonyum.
8. Ad: amonyum sülfat.

Birlikte çöz (`tag: 'Birlikte çöz'`): Mg(NO₃)₂ satırı yarım: "Katyon: Mg²⁺ magnezyum · Anyon: NO₃⁻ ?". Soru: NO₃⁻ iyonunun adı nedir? **Nitrat** / Nitrür / Azot. Dayandığı anlatım: 2–5 ve B3 (çok atomlu iyon adları). İpuçları: "Nitrür tek atomlu N³⁻ iyonunun adıdır." · "Çok atomlu iyonun adı tek sözcüktür."

Sonra:
9. Mg(NO₃)₂ bileşiğinin adı magnezyum nitrattır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): K₃PO₄ bileşiğinin adı hangisidir? **Potasyum fosfat** / Potasyum üç fosfat / Fosfat potasyum. Dayandığı anlatım: 3–6. İpuçları: "Fosfat tek parçalı bir anyondur." · "İndis ada girmez."

Gör: K₃PO₄ şeridinde üç K⁺ ve bir PO₄³⁻ kutusu; ad kutularında "potasyum" ve "fosfat".

### Sahne 5 · Sekiz formülü adlandır

Tahta: sekiz kart (formül), köşede iyon listesi (tek atomlu ve çok atomlu iyonların hepsi). Kart tahtada öne çıkar; üç ad seçeneği altında görünür; doğru ad seçilince kartın altına yerleşir.

Anlatım:
1. Sekiz formülü, kuralı uygulayarak adlandıralım.

Dene (kart başına seçim, `c.choice`; her kartta üç ad şıkkı; doğru şık ilk sırada yazılmıştır, tahtada sırası karıştırılır): Dayandığı anlatım: sahne 2, 2–6; sahne 3, 2–9; sahne 4, 1–6.
- NaF → **sodyum florür** / sodyum flor / florür sodyum. "Katyon sodyum, anyon florür."
- CaBr₂ → **kalsiyum bromür** / kalsiyum iki bromür / bromür kalsiyum. "Adda sayı yazılmaz."
- Al₂O₃ → **alüminyum oksit** / alüminyum oksijen / oksit alüminyum. "Oksijenin anyonu oksit."
- Mg₃N₂ → **magnezyum nitrür** / magnezyum azot / nitrür magnezyum. "N³⁻ nitrürdür."
- MgH₂ → **magnezyum hidrür** / magnezyum hidrojen / hidrür magnezyum. "Metalle bileşikte hidrojen H⁻ iyonudur: hidrür."
- Ca(OH)₂ → **kalsiyum hidroksit** / kalsiyum iki hidroksit / hidroksit kalsiyum. "Parantez ve indis ada girmez."
- NH₄Br → **amonyum bromür** / amonyum brom / bromür amonyum. "Katyon amonyum, anyon bromür."
- Al₂(SO₄)₃ → **alüminyum sülfat** / alüminyum üç sülfat / sülfat alüminyum. "Üç sülfat var ama ad yalnız 'sülfat'."

Yanlışta her kartta tek cümle: "Önce katyonun adı, sonra anyonun adı; sayı yazılmaz." İpucu: "Önce iyonları ayır." (MgH₂ kartında ipucu: "Hidrojen metalle yaptığı bileşikte 1− yüklüdür.")

Sonra:
2. Sekiz bileşik de aynı kuralla adlandırıldı.

### Sahne 6 · Addan formüle

Tahta: ad iki sözcüğe bölünür (turuncu, mavi); her sözcük iyon kutusuna döner; altında yük terazisi (B3). Örnekler sırayla: "magnezyum nitrür" → Mg²⁺ ve N³⁻ → üç Mg²⁺ (6+), iki N³⁻ (6−) → Mg₃N₂.

Anlatım:
1. Adı okuyarak formülü de yazabiliriz.
2. Önce ad iki sözcüğe bölünür: katyon, anyon.
3. "Magnezyum nitrür" Mg²⁺ ve N³⁻ iyonlarını verir.
4. Üç Mg²⁺ toplam 6+, iki N³⁻ 6− eder.
5. Toplam yük sıfır: formül Mg₃N₂.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "kalsiyum fosfat": "Ca²⁺ ve PO₄³⁻ · üç Ca²⁺ = 6+ · ? PO₄³⁻ = 6−". Soru: Kaç PO₄³⁻ iyonu gerekir? **2** / 3 / 6. Dayandığı anlatım: 2–5. İpuçları: "PO₄³⁻ 3− yüklü; 6− için kaç tane gerekir?" · "Altı artı yükü altı eksi yük dengeler."

Sonra:
6. İki PO₄³⁻ parantez içine alınır: Ca₃(PO₄)₂.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Sodyum sülfat bileşiğinin formülü hangisidir? **Na₂SO₄** / NaSO₄ / Na(SO₄)₂. Dayandığı anlatım: 2–6 ve sahne 4, 1–6. İpuçları: "Sodyum Na⁺, sülfat SO₄²⁻ iyonudur." · "SO₄²⁻'den bir tane yeter; iki Na⁺ dengeler."

### Sahne 7 · Doğru kural hangisi?

Tahta: dört öğrenci, dört konuşma balonu (kartlar tek tek belirir; değerlendirilen kart soluklaşır, yanına ✓ ya da ✗ gelir). İfadeler:

- A: "Adlandırırken önce anyonun adı yazılır."
- B: "Adlar, katyonun ve anyonun adlarından kurulur."
- C: "Formüldeki alt indisler ada yazılır."
- D: "Çok atomlu iyon içeren bileşik de aynı kuralla adlandırılır."

Anlatım:
1. Dört öğrenci adlandırma kuralını anlatıyor.
2. Hangisi doğru söylüyor, bakalım.

Sorular (dört `c.choice`, her biri bir kart; seçenekler "Doğru" / "Yanlış"):
- A → **Yanlış**. Geri bildirim: "Önce katyonun adı yazılır."
- B → **Doğru**. Geri bildirim: "Kuralın kendisi."
- C → **Yanlış**. Geri bildirim: "Sayılar formülde kalır; adda yer almaz."
- D → **Doğru**. Geri bildirim: "Karbonat, nitrat gibi çok atomlu iyonlar tek sözcüklük anyon adıdır."

Dayandığı anlatım: sahne 3, 2–9; sahne 4, 1–6.

Sonra:
3. İyonik bileşiğin adı iyonların adlarından kurulur.

### Çıkış soruları

1. (yeni durum) K₂O bileşiğinin adı hangisidir? **Potasyum oksit** / Oksit potasyum / Potasyum iki oksit. (sahne 3)
2. (yeni durum) Li₃N bileşiğini oluşturan iyonlar hangileridir? **Li⁺ ve N³⁻** / Li³⁺ ve N⁻ / Li⁺ ve N⁻. (sahne 2)
3. (yeni durum) Sr(NO₃)₂ bileşiğinin adı hangisidir? **Stronsiyum nitrat** / Stronsiyum iki nitrat / Nitrat stronsiyum. (sahne 4)
4. (yanılgı) Bir öğrenci MgBr₂'yi "magnezyum iki bromür" diye adlandırıyor. Hangisi bu düşünceyi düzeltir? **İyonik bileşiğin adında formüldeki sayılar yazılmaz** / Anyonun adı önce yazılır / Katyonun adı ada girmez. (sahne 3, 7)
5. Alüminyum klorürün formülü hangisidir? **AlCl₃** / AlCl / Al₃Cl. (sahne 6)

Özet: Formül iyonları saklar; iyon adları ad olur. · Önce katyonun, sonra anyonun adı yazılır. · Sayılar ada girmez; çok atomlu iyon kuralı değiştirmez. · **Önce katyonun adı, sonra anyonun adı.**

## F2 · Birden fazla katyonu olan metaller: ad yükü söyler

- **Fikir:** Bir metal birden fazla katyon verebiliyorsa bileşiğin adı hangi katyonun bulunduğunu da söyler: metalin adından sonra, yükü Romen rakamıyla yazılır (demir(III) klorür). Bu yük, formülden yük toplamının sıfır olması kuralıyla bulunur.
- **Giriş ekranı sorusu:** Demirin klorla iki ayrı bileşiği var; ikisine de "demir klorür" denirse hangisi olduğu nasıl anlaşılır? (Plan'daki "oksijenle" yerine "klorla": kitabın örneği FeCl₂ ve FeCl₃'tür.)
- **Kaynak:** Ders kitabı s. 140 (Etkinlik 2.11, soru 3: Cu⁺, Cu²⁺, Fe²⁺, Fe³⁺ "bazı metaller bileşiklerinde birden fazla katyon formunda bulunabilir"; FeCl₂ ve FeCl₃'ün adlandırma kuralıyla yetmediği; CuO bakır(II) oksit, Cu₂O bakır(I) oksit, CuF₂ bakır(II) florür, CuBr bakır(I) bromür; FeCl₂, FeCl₃, CuBr₂, FeO'nun adlandırılması), s. 141 (Cr +2, +3, +6 · Mn +2, +4, +7 · Cu +1, +2 · Pb +2, +4 · Sn +2, +4 · Fe +2, +3 · Co +2, +3 basamak listesi), s. 142 ("metal iyonunun bileşikteki yükseltgenme basamağı Romen rakamıyla belirtilir"; FeCl₃ demir(III) klorür, "demir üç klorür" okunur), s. 144 (CuCl, FeO). Ön bilgi: yük toplamı sıfır (B3, sahne 5–6; tek cümleyle hatırlatılır), tek katyonlu metallerin adı (F1).
- **Sınır:** Metaller yalnızca programın yedisidir: Cr, Mn, Cu, Pb, Sn, Fe, Co. Gümüş, kitabın listesinde (Ag +1, +2) ve s. 142'de yer alsa da alınmaz. Basamaklar listedeki gibidir; derste Cr için +6 ve Mn için +7 ile bileşik kurulmaz (kitap örnek vermez), listede yer alır. Listede kırmızıyla işaretli "en yaygın basamak" gösterilmez (yalnız gümüşün adlandırmasında anlam taşıyor, o da alınmıyor). Yükseltgenme-indirgenme tepkimeleri, basamak hesabının genel kuralları yok; yalnızca iyonik bileşikte metalin yükü. Asit, baz, hidrat yok.
- **Güç kavramlar ve gösterimi:** (1) "Aynı ad, iki madde" sorunu: iki kutu (FeCl₂, FeCl₃) aynı etiketi taşır ve kırmızı bir işaretle çakışır; etiketler değişince çakışma kalkar. (2) Metalin yükünü formülden bulma: yük terazisi; anyon tarafının toplamı, metal sayısına bölünür (Cu₂O: 2−'yi iki bakıra bölünce her biri 1+). (3) Romen rakamı atom sayısı değil yüktür: Cu₂O'da iki bakır var, rakam I; iki bakır ve I yan yana çizilir. (4) Tek ve çok katyonlu metallerin ad farkı: iki sütun, rakamsız ve rakamlı adlar.
- **Hedeflenen yanılgı:** "Romen rakamı formüldeki atom sayısıdır" (Cu₂O: bakır(II) oksit; Fe₂O₃: demir(II) oksit).
- **Akılda kalıcı cümle:** Metalin birden çok yükü varsa ad, yükü de söyler.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Ca(OH)₂ bileşiğinin adı hangisidir? **Kalsiyum hidroksit** / Kalsiyum iki hidroksit / Hidroksit kalsiyum. (F1) Yanlışta: "Önce katyonun adı, sonra anyonun adı; sayı yazılmaz."
2. Al³⁺ ve O²⁻ iyonlarından oluşan bileşiğin formülü hangisidir? **Al₂O₃** / AlO / Al₃O₂. (B3, daha eski) Yanlışta: "İki Al³⁺ 6+, üç O²⁻ 6− eder; toplam yük sıfırdır."

Sonra: "Bugün aynı metalin iki ayrı bileşiğine bakacağız."

### Sahne 2 · Aynı ad, iki ayrı madde

Tahta: iki kutu yan yana. Solda FeCl₂: bir Fe²⁺ (turuncu) ve iki Cl⁻ (mavi), altında "2+ ve 2− → toplam 0". Sağda FeCl₃: bir Fe³⁺ ve üç Cl⁻, altında "3+ ve 3− → toplam 0". Önce kutular adsız; sonra ikisinin üstüne de aynı etiket gelir: "demir klorür", yanında kırmızı bir çakışma işareti. Demir iyonları vurgulu, klorürler soluk.

Anlatım:
1. Demir bazen Fe²⁺, bazen Fe³⁺ iyonu olur.
2. Fe²⁺ ile Cl⁻ iyonları FeCl₂'yi verir.
3. Fe³⁺ ile Cl⁻ iyonları FeCl₃'ü verir.
4. İki ayrı bileşik, iki ayrı formül.
5. Önceki kurala göre ikisinin adı da "demir klorür" olur.
6. Aynı ad, iki ayrı maddeyi göstermez.

Tahmin (`tag: 'Tahmin et'`; durum tanıtıldıktan sonra, anlatılanla yapılan tahmin): İki bileşiği adla ayırmak için ada ne eklenmelidir? **Demirin yükü** / Klorün yükü / Formülün uzunluğu. Dayandığı anlatım: 1–5. İpuçları: "İki bileşikte klorür aynı; ne değişiyor?" · "Farklı olan, demir iyonudur."

Gör: iki kutuda yalnız demir iyonları yanıp söner (Fe²⁺, Fe³⁺); klorürler soluk.

Sonra:
7. Ad, demirin hangi iyon olduğunu da söylemelidir.

### Sahne 3 · Romen rakamı yükü söyler

Tahta: iki kutu önceki sahnedekiyle aynı. Etiketler değişir: "demir(II) klorür" ve "demir(III) klorür"; parantezdeki rakam turuncu, demir iyonunun yanına oku iner. Altta Romen rakamı şeridi: 1 I · 2 II · 3 III · 4 IV · 6 VI · 7 VII; kutudaki iyonun yüküne denk rakam parlar.

Anlatım:
1. Çözüm: metalin adından sonra parantez içinde Romen rakamı yazılır.
2. Rakam, metalin bileşikteki yükseltgenme basamağını gösterir.
3. Fe²⁺'nin yükü 2+; yükseltgenme basamağı +2'dir.
4. FeCl₂'nin adı demir(II) klorür olur.
5. FeCl₃'te demir Fe³⁺'tür; basamak +3.
6. Basamak 2 ise II, 3 ise III yazılır.

Birlikte çöz (`tag: 'Birlikte çöz'`): FeCl₃ kutusunda "Fe³⁺ → basamak +3 → Romen rakamı: ?" yazılı. Soru: Adındaki Romen rakamı hangisidir? **III** / II / IV. Dayandığı anlatım: 2, 5–6. İpuçları: "Romen rakamı demirin yükünü gösterir." · "Fe³⁺'nin yükü 3+."

Sonra:
7. FeCl₃'ün adı demir(III) klorürdür; "demir üç klorür" diye okunur.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Cu²⁺ iyonu içeren bir bileşiğin adında bakırdan sonra hangi rakam yazılır? **(II)** / (I) / (III). Dayandığı anlatım: 2–6. İpuçları: "Rakam metalin yükünü gösterir." · "Cu²⁺'nın yükü 2+."

### Sahne 4 · Yedi metal, birden çok katyon

Tahta: yedi satırlı liste, satır satır belirir (tablo istisnası; `KURALLAR.md` 4): metal · sembol · olası basamaklar. Krom Cr +2, +3, +6 · Mangan Mn +2, +4, +7 · Bakır Cu +1, +2 · Kurşun Pb +2, +4 · Kalay Sn +2, +4 · Demir Fe +2, +3 · Kobalt Co +2, +3. Liste ders boyunca köşede küçük kalır. Sağda küçük bir karşıt kutu: Na⁺, Mg²⁺, Al³⁺ (yalnız bir katyon).

Anlatım:
1. Bazı metaller birden fazla katyon verir.
2. Yedisini tanıyalım: krom, mangan, bakır, kurşun, kalay, demir, kobalt.
3. Her metalin olası basamakları yan sütunda yazılıdır.
4. Demir +2 ve +3, bakır +1 ve +2 basamağında bulunur.
5. Kurşun ve kalay +2 ve +4 basamağındadır.
6. Kobalt +2 ve +3 basamağındadır.
7. Krom ile mangan üçer basamakta bulunabilir.
8. Sodyum, magnezyum, alüminyum gibi metallerin yalnız bir katyonu vardır.

Soru (`tag: 'Sıra sende'`; tahtada liste görünür): Bakır hangi basamaklarda bulunabilir? **+1 ve +2** / +2 ve +3 / +2 ve +4. Dayandığı anlatım: 3–4. İpuçları: "Bakırın satırına bak." · "Bakır iki basamaklı bir metal."

Gör: listede bakır satırı vurgulanır; "+1" ve "+2" rozetleri yanar.

Sonra:
9. Bu yedi metalin adında, yük Romen rakamıyla söylenir.

### Sahne 5 · Metalin yükünü formülden bul

Tahta: üç satırlı tablo kurulur (formül · yük hesabı · ad), yük terazisiyle birlikte. Örnekler sırayla: CuO (bir O²⁻ → toplam 2−; bir bakır → Cu²⁺; bakır(II) oksit); Cu₂O (bir O²⁻ → 2−; iki bakır → her biri 1+; bakır(I) oksit); CuF₂ (sahne içinde Birlikte çöz). İki bakır ile "I" yan yana çizilir ve "atom sayısı 2, rakam I" notu belirir.

Anlatım:
1. Metalin yükünü formülden bulabiliriz.
2. CuO'da bir O²⁻ var: toplam eksi yük 2−.
3. Toplam yük sıfır; tek bakır 2+ taşır: Cu²⁺.
4. Ad: bakır(II) oksit.
5. Cu₂O'da da bir O²⁻ var: toplam eksi yük 2−.
6. İki bakır 2+ taşır; her biri 1+ olur.
7. Ad: bakır(I) oksit; iki bakır var ama rakam I.
8. Romen rakamı atom sayısını değil, metalin yükünü gösterir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada CuF₂ satırı yarım: "2 F⁻ → toplam 2− · bakır sayısı: 1 · Cu yükü: ?". Soru: CuF₂'de bakırın yükü nedir? **2+** / 1+ / 2−. Dayandığı anlatım: 1–4. İpuçları: "İki F⁻ toplam 2− eder." · "Tek bakır bu yükü dengelemeli."

Sonra:
9. CuF₂'de bakır Cu²⁺'dır: ad bakır(II) florür.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): CuBr bileşiğinin adı hangisidir? **Bakır(I) bromür** / Bakır(II) bromür / Bakır bromür. Dayandığı anlatım: 1–9. İpuçları: "Bir Br⁻ toplam 1− eder." · "Tek bakır 1+ taşır."

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama, yanılgı): Fe₂O₃ bileşiğinde demirin yükü nedir? **3+** / 2+ / 6+. Dayandığı anlatım: 5–8. İpuçları: "Üç O²⁻ toplam 6− eder." · "6+ iki demire bölünür."

Gör: Fe₂O₃ terazisinde sol kefede iki Fe³⁺ (6+), sağ kefede üç O²⁻ (6−); ad "demir(III) oksit" yazılır.

Sonra:
10. Fe₂O₃'te iki demir var ama rakam III.

### Sahne 6 · Addan formüle

Tahta: ad, rakamıyla birlikte iyonlara ayrılır; yük terazisi. Örnekler: kalay(IV) klorür (Sn⁴⁺ ve Cl⁻ → SnCl₄); demir(III) oksit (iki Fe³⁺ 6+, üç O²⁻ 6− → Fe₂O₃).

Anlatım:
1. Romen rakamı, metalin yükünü söyler.
2. Kalay(IV) klorür: Sn⁴⁺ ve Cl⁻ iyonları.
3. 4+ yükünü dört Cl⁻ dengeler: SnCl₄.
4. Demir(III) oksit: Fe³⁺ ve O²⁻ iyonları.
5. İki Fe³⁺ 6+, üç O²⁻ 6− eder: Fe₂O₃.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "kurşun(II) klorür: Pb²⁺ ve Cl⁻ · 2+ için kaç Cl⁻?". Soru: Kaç Cl⁻ gerekir? **2** / 1 / 4. Dayandığı anlatım: 1–3. İpuçları: "Pb²⁺ 2+ yüklü; Cl⁻ 1− yüklü." · "İki Cl⁻ toplam 2− eder."

Sonra:
6. Formül PbCl₂'dir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama): Mangan(IV) oksit bileşiğinin formülü hangisidir? **MnO₂** / MnO / Mn₂O. Dayandığı anlatım: 1–6. İpuçları: "4+ yükü kaç O²⁻ dengeler?" · "İki O²⁻ toplam 4− eder."

### Sahne 7 · Rakam ne zaman yazılır?

Tahta: iki sütun: "Yalnız bir katyonu olan metal" (örnek: magnezyum klorür · sodyum sülfür · alüminyum oksit) ve "Birden çok katyonu olan metal" (örnek: demir(III) klorür · bakır(I) oksit · kalay(II) klorür). Satırlar sırayla belirir; Romen rakamları turuncu.

Anlatım:
1. İki tür metalin adlarını karşılaştıralım.
2. Sodyum, magnezyum, alüminyum tek katyon verir.
3. Adlarında Romen rakamı yoktur.
4. Demir, bakır, kalay birden çok katyon verir.
5. Adlarında Romen rakamı vardır.
6. Rakam, hangi katyonun bulunduğunu söyler.

Dene (`kit.sinifla`, kart başına seçim; iki kutu: "Adında Romen rakamı yazılır" / "Adında Romen rakamı yazılmaz"; kart tahtada öne çıkar, doğru seçilince kutusuna oturur; yedi metalin listesi köşede görünür): Dayandığı anlatım: sahne 4, 1–8; bu sahne, 2–6.
- MgCl₂ → **yazılmaz**. "Magnezyum yalnız Mg²⁺ verir."
- FeO → **yazılır**. "Demir birden çok katyon verir; FeO'da Fe²⁺: demir(II) oksit."
- Al₂O₃ → **yazılmaz**. "Alüminyum yalnız Al³⁺ verir."
- SnCl₂ → **yazılır**. "Kalay birden çok katyon verir; SnCl₂'de Sn²⁺: kalay(II) klorür."
- NaBr → **yazılmaz**. "Sodyum yalnız Na⁺ verir."
- CuCl → **yazılır**. "Bakır birden çok katyon verir; CuCl'de Cu⁺: bakır(I) klorür."
- ZnS → **yazılmaz**. "Çinko yalnız Zn²⁺ verir."
- CoCl₂ → **yazılır**. "Kobalt birden çok katyon verir; CoCl₂'de Co²⁺: kobalt(II) klorür."

Yanlışta her kartta: "Metalin tek katyonu mu var, birden çok katyonu mu var? Listeye bak."

Sonra:
7. Birden çok katyonu olan yedi metalde ad, yükü de söyler.

Defter ("Çok katyonlu metal"): **Çok katyonlu metalde ad, yükü Romen rakamıyla söyler.** Örnek: FeCl₃: demir(III) klorür.

### Çıkış soruları

1. (yeni durum) FeO bileşiğinin adı hangisidir? **Demir(II) oksit** / Demir(III) oksit / Demir oksit. (sahne 5)
2. (yanılgı) Cu₂O bileşiği "bakır(I) oksit" diye adlandırılır. Romen rakamı I neyi gösterir? **Bakırın yükünü** / Bakır atomlarının sayısını / Oksijenin yükünü. (sahne 5)
3. (yeni durum) PbO₂ bileşiğinin adı hangisidir? **Kurşun(IV) oksit** / Kurşun(II) oksit / Kurşun oksit. (sahne 5)
4. (yeni durum) Hangi bileşiğin adında Romen rakamı kullanılmaz? **ZnCl₂** / SnCl₂ / CoCl₂. (sahne 7)
5. (yeni durum) Krom(III) oksit bileşiğinin formülü hangisidir? **Cr₂O₃** / CrO₃ / Cr₃O₂. (sahne 6)

Özet: Bazı metaller birden fazla katyon verir. · Ad, metalin yükünü Romen rakamıyla söyler. · Yük, formülden yük toplamıyla bulunur. · **Metalin birden çok yükü varsa ad, yükü de söyler.**

## F3 · Kovalent bileşiğin adı: ön ekler atomları sayar

- **Fikir:** Kovalent bağlı bileşiklerin adında atom sayıları Latince ön eklerle söylenir; birinci ametal element adıyla, ikinci ametal anyon adıyla yazılır. Dersin sonunda iyonik ve kovalent bileşiklerin ad–formül eşleştirmesi yapılır.
- **Giriş ekranı sorusu:** Karbon monoksit ile karbon dioksit arasındaki tek hecelik fark neyi anlatır?
- **Kaynak:** Ders kitabı s. 142 (N₂O₃ diazot trioksit, SO₃ kükürt trioksit, CS₂ karbon disülfür, CCl₄ karbon tetraklorür, N₂O diazot monoksit, CO karbon monoksit; Etkinlik 2.12: elektronegatiflik değerleri N 3,04, O 3,44, S 2,58, C 2,55, Cl 3,16, H 2,20; NCl₃, S₂C/CS₂, PCl₃ formüllerinin doğru yazılışı), s. 143 (Tablo 2.4: 1 mono · 2 di · 3 tri · 4 tetra · 5 penta · 6 hekza · 7 hepta · 8 okta; "formüllerde genellikle elektronegatifliği az olan element öne yazılır"; ad sırası; ilk elementte "mono" kullanılmaz, ikinci elementte kullanılır; oksit önünde ön ekin son ünlüsü düşer: monoksit, tetroksit, pentoksit; su ve amonyak geleneksel adlarıyla; SO₂ ve N₂O₅'in adlandırılması, SO₃ ile CS₂'de kükürt için adlandırma farkı), s. 144 (Kontrol Noktası: Al₂(SO₄)₃, MgH₂, SF₆, N₂O, CuCl, FeO, Ca(OH)₂, NH₄Br; tarsia yapboz), s. 174 (karbon dioksit adının geçişi), s. 153 (fosfor P 2,19). Ön bilgi: elektronegatifliğin anlamı E1'de, iyonik bileşik adı F1 ve F2'de anlatıldı.
- **Sınır:** Ön ekler 1–8. Asit ve baz adlandırması, hidrat, yaygın adlar tablosu, organik bileşik, siyanür yok. Su ve amonyak geleneksel adlarıyla anılır (sistematik adları öğretilmez). "Hekza", "hepta", "okta" ile oksit bir arada kullanılmaz (kitap bu üç ön ek için ünlü düşmesini söylemiyor). Ön ek ile ünlüyle başlayan bir element adının birleştiği adlar (tetraazot gibi) kullanılmaz; kitap bu durumda ünlü düşmesini söylemiyor. "Diazot" yalnız di + azot olarak geçer. H₂S gibi hidrojenli bileşiklerin adı verilmez (kitap kendi içinde çelişiyor; raporda). Bor yarı metaldir (kitap); BH₃ metal–ametal ayrımıyla sınıflanamadığı için yalnız E'de molekül olarak geçer, burada kullanılmaz.
- **Güç kavramlar ve gösterimi:** (1) Ön ek ile atom sayısı: formülde sayı, adda ön ek; her elementin üstünde atom sayısı, altında ön ek; yeni ön ek eklenince tablo büyür. (2) Birinci ve ikinci ametalin farkı: ilk element adı olduğu gibi (kükürt), ikinci element anyon adıyla (sülfür); CS₂ ve SO₃ yan yana. (3) "Mono" kuralı: karbon monoksit'te ilk elementin altındaki "mono" kutusu boş ve soluk; ikinci elementin altında dolu. (4) Ünlü düşmesi: "tetra" ile "oksit" birleşirken `a` harfi söner. (5) Formülde sıra: iki atomun elektronegatifliği yan yana; küçük olan öne yazılır.
- **Hedeflenen yanılgı:** "Kovalent bileşiğin adında sayı yazılmaz (iyonik kuralı)", "ilk elementte de mono kullanılır (monokarbon monoksit)" ve "iyonik bileşiğin adında da ön ek kullanılır (magnezyum diklorür)".
- **Akılda kalıcı cümle:** Ön ek, o atomdan kaç tane olduğunu söyler.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. CuO bileşiğinin adındaki (II) neyi gösterir? **Bakırın yükünü** / Bakır atomu sayısını / Oksijenin yükünü. (F2) Yanlışta: "Romen rakamı metalin yükünü gösterir; atom sayısını değil."
2. Hidrojen (2,20) ile flor (4,00) bağ yapıyor. Ortak elektronları hangi atom daha kuvvetle çeker? **Flor** / Hidrojen / İkisi eşit. (E1, daha eski; formülde atom sırası bu bilgiye dayanır) Yanlışta: "Elektronegatifliği büyük olan atom ortak elektronları kendine çeker."

Sonra: "Bugün iki ametalden oluşan bileşiklerin adlarına bakacağız."

### Sahne 2 · Sayı adda yer alır

Tahta: solda iki iyonik bileşik ve adları (NaCl sodyum klorür · MgCl₂ magnezyum klorür), üstünde "metal + ametal". Sağda üç kovalent bileşik: N₂O, N₂O₃, N₂O₅; her birinde azot (iki) ve oksijen atomları sayılarıyla çizilir (iki N ile bir, üç, beş O). Üçünün üstüne de aynı etiket gelir: "azot oksit", yanında kırmızı çakışma işareti (F2 sahne 2'deki gibi).

Anlatım:
1. Metal ile ametal bileşiğinin adına sayı girmez.
2. İki ametal arasında kovalent bağ kurulur.
3. Azot ile oksijen, birkaç kovalent bileşik verir.
4. N₂O, N₂O₃ ve N₂O₅ ayrı maddelerdir.
5. İyonik kuralla üçüne de "azot oksit" denir.
6. Üç ayrı madde, aynı adı taşıyamaz.

Tahmin (`tag: 'Tahmin et'`): Üç bileşiği adla ayırmak için ada ne söylenmelidir? **Her elementten kaç atom olduğu** / Atomların elektronegatifliği / Bileşiğin rengi. Dayandığı anlatım: 3–6. İpuçları: "Üçünde de azot ve oksijen var; ne değişiyor?" · "Değişen, atom sayılarıdır."

Gör: üç şekilde atom sayıları vurgulanır: N₂O (2 azot, 1 oksijen), N₂O₃ (2 azot, 3 oksijen), N₂O₅ (2 azot, 5 oksijen).

Sonra:
7. Kovalent bileşiklerin adı, atom sayılarını da söyler.

### Sahne 3 · Sayıların Latince adları

Tahta: altı satırlı tablo (tablo istisnası): formül · bileşiğin adı. N₂O diazot monoksit · N₂O₃ diazot trioksit · SO₃ kükürt trioksit · CO karbon monoksit · CS₂ karbon disülfür · CCl₄ karbon tetraklorür. Ön ekler (mono, di, tri, tetra) koyu, formüldeki sayının yanına çekilen çizgilerle bağlanır. Sonra sağda ön ek listesi belirir: 1 mono · 2 di · 3 tri · 4 tetra · 5 penta · 6 hekza · 7 hepta · 8 okta; liste köşede küçük kalır.

Anlatım:
1. Atom sayısını söyleyen eklere Latince ön ek denir.
2. Ön ek, elementin adının önüne gelir.
3. CS₂'de iki kükürt var: disülfür.
4. CCl₄'te dört klor var: tetraklorür.
5. SO₃'te üç oksijen var: trioksit.
6. CO'da bir oksijen var: monoksit.
7. Bir, iki, üç, dört için mono, di, tri, tetra.
8. Beş, altı, yedi, sekiz için penta, hekza, hepta, okta.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada N₂O₅; "N: 2 atom → di · O: 5 atom → ?" yazılı, ön ek listesi köşede. Soru: Beş atomun ön eki hangisidir? **Penta** / Tetra / Hekza. Dayandığı anlatım: 1–2, 8. İpuçları: "Beş için ön ek listesine bak." · "Tetra dörttür."

Sonra:
9. Beş atom için ön ek pentadır.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama; tahtada ön ek listesi): SF₆ bileşiğindeki flor sayısının ön eki hangisidir? **Hekza** / Penta / Hepta. Dayandığı anlatım: 1–2, 7–8. İpuçları: "Flor atomlarını say: altı." · "Altı için ön ek listesine bak."

Defter ("Ön ekler"): **Ön ek atom sayısını söyler.** Örnek: CCl₄: karbon tetraklorür (tetra: 4).

### Sahne 4 · Birinci ve ikinci ametal

Tahta: iki formül: N₂O₅ ve CO. N₂O₅ için şema: iki ok, biri N₂'den "di + azot = diazot", öbürü O₅'ten "penta + oksit"; ardından CO için aynı şema; karbonun altında "mono" kutusu boş ve soluk, oksijenin altında "mono" dolu. Sonra SO₃ ve CS₂ yan yana: kükürt SO₃'te ilk, CS₂'de ikinci element; adlarında "kükürt" ve "sülfür".

Anlatım:
1. N₂O₅'te ilk element azottur: iki atom, ön ek di.
2. Ad "diazot" olur: ön ek ve element adı.
3. İkinci element oksijendir: beş atom, ön ek penta.
4. Ad "penta" ile "oksit"ten kurulur: ön ek ve anyon adı.
5. Birinci elementin adı aynen kalır; ikincisi anyon adını alır.
6. CO'da tek karbon var ama "monokarbon" denmez.
7. İlk elementte "mono" kullanılmaz.
8. İkinci elementte "mono" kullanılır: monoksit.
9. SO₃'te kükürt ilktir: kükürt trioksit.
10. CS₂'de kükürt ikincidir: karbon disülfür.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "SF₆: S ilk element → ? · F ikinci element → hekza + florür". Soru: SF₆'da kükürt ilk elementtir. Adında hangisi kullanılır? **Kükürt** / Sülfür / Monokükürt. Dayandığı anlatım: 5–7, 9. İpuçları: "İlk elementin adı olduğu gibi kalır." · "İlk elementte mono kullanılmaz."

Sonra:
11. SF₆'nın adı kükürt hekzaflorürdür.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama, yanılgı): SO₂ bileşiğinin adı hangisidir? **Kükürt dioksit** / Monokükürt dioksit / Kükürt disülfür. Dayandığı anlatım: 5–10. İpuçları: "Kükürt ilk element: element adı, ön ek yok." · "İkinci element oksijendir; iki atom."

Gör: SO₂ → "kükürt" (ön eksiz) + "di" + "oksit"; kutular yerine oturur.

### Sahne 5 · Oksit önünde ünlü düşer

Tahta: üç birleşme: "mono + oksit", "tetra + oksit", "penta + oksit"; her birinde ön ekin son harfi `a` ya da `o` söner, parçalar kayıp birleşir: monoksit, tetroksit, pentoksit. Yanında "di + oksit → dioksit" ve "tri + oksit → trioksit": ünlü sönmez.

Anlatım:
1. "Oksit" sözcüğü ünlüyle başlar.
2. Mono, tetra ya da penta oksidin önüne gelirse son ünlü düşer.
3. Mono ve oksit: monoksit.
4. Tetra ve oksit: tetroksit.
5. Penta ve oksit: pentoksit.
6. Di ve tri için ünlü düşmez: dioksit, trioksit.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada N₂O₄; "N: 2 atom → di → diazot · O: 4 atom → tetra + oksit → ?" yazılı. Soru: N₂O₄ bileşiğinin adı hangisidir? **Diazot tetroksit** / Diazot tetraoksit / Azot tetroksit. Dayandığı anlatım: 2–4 ve sahne 4, 1–5. İpuçları: "Tetra, oksidin önünde son ünlüsünü bırakır." · "Azot iki atom; ilk elementte de ön ek var."

Sonra:
7. N₂O₄'ün adı diazot tetroksittir.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama, yanılgı): NO bileşiğinin adı hangisidir? **Azot monoksit** / Monoazot monoksit / Azot monooksit. Dayandığı anlatım: sahne 4, 6–8; bu sahne, 2–3. İpuçları: "İlk elementte mono kullanılmaz." · "Mono, oksit önünde son ünlüsünü bırakır."

### Sahne 6 · Formülde hangi atom önce?

Tahta: elektronegatiflik değerleri üç satırda yan yana: N 3,04 | O 3,44; C 2,55 | Cl 3,16; S 2,58 | O 3,44. Her satırda küçük olan sola kayar ve formülün başına gelir: N₂O₃, CCl₄, SO₃. Sonra iki yanlış yazılış belirir ve silinir (Cl₃N, S₂C).

Anlatım:
1. Formülde genellikle elektronegatifliği az olan atom öne yazılır.
2. N₂O₃'te azot 3,04, oksijen 3,44: azot önde.
3. CCl₄'te karbon 2,55, klor 3,16: karbon önde.
4. Ad, formüldeki sırayı izler.
5. Önce yazılan atom birinci, sonra yazılan ikinci elementtir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "C 2,55 | S 2,58"; altında iki yazılış: CS₂ ve S₂C. Soru: Hangi formül doğru yazılmıştır? **CS₂** / S₂C / İkisi de. Dayandığı anlatım: 1, 4–5. İpuçları: "Elektronegatifliği az olan öne yazılır." · "Karbon 2,55, kükürt 2,58."

Sonra:
6. Karbon önde: CS₂; adı karbon disülfür.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama; tahtada "P 2,19 | Cl 3,16"): Fosfor ile klorun bileşiğinde üç klor atomu vardır. Formül hangisidir? **PCl₃** / Cl₃P / P₃Cl. Dayandığı anlatım: 1, 4–5. İpuçları: "Hangi atomun elektronegatifliği az?" · "Fosfor 2,19, klor 3,16."

### Sahne 7 · Su ve amonyak

Tahta: iki bileşik: H₂O ve NH₃, modelleriyle (E'nin uzay-dolgu modelleri). Altlarında büyük yazıyla "su" ve "amonyak". Hiçbirinin altında sistematik ad yazılmaz.

Anlatım:
1. Bazı bileşiklerin sistematik adı kullanılmaz.
2. Geleneksel adları çok yaygınlaşmıştır.
3. H₂O'ya su denir.
4. NH₃'e amonyak denir.

Soru (`tag: 'Sıra sende'`): H₂O bileşiği hangi adla anılır? **Su** / Hidrojen dioksit / Oksijen dihidrür. Dayandığı anlatım: 1–3. İpuçları: "Bu bileşiğin adı çok yaygındır." · "Sistematik ad kullanılmaz."

Sonra:
5. Su ve amonyak, geleneksel adlarıyla anılır.

### Sahne 8 · Kuralı topla, yedi bileşikte dene

Tahta: akış şeması, adımlar sırayla belirir (biten adım soluklaşır): "1 Elektronegatifliği az olan atom öne" · "2 İlk element: sayı varsa ön ek + element adı (mono yok)" · "3 İkinci element: ön ek + anyon adı" · "4 Mono, tetra, penta + oksit: son ünlü düşer".

Anlatım:
1. Kovalent bileşiğin adını dört adımda kurarız.
2. Önce formüldeki sıra: elektronegatifliği az olan öne.
3. İlk element: sayı varsa ön ek ve element adı.
4. İlk elementte "mono" yazılmaz.
5. İkinci element: ön ek ve anyon adı.
6. Oksit önünde mono, tetra, penta ünlüsünü bırakır.

Dene (kart başına seçim, `c.choice`; yedi kart, her kartta formül ve üç ad şıkkı; doğru şık ilk sırada yazılmıştır, tahtada sırası karıştırılır; kart doğru seçilince adıyla birlikte tahtaya oturur): Dayandığı anlatım: sahne 3–7, bu sahne 2–6.
- CO₂ → **karbon dioksit** / monokarbon dioksit / karbon dioksijen. "İlk elementte mono yok; iki oksijen: dioksit."
- NCl₃ → **azot triklorür** / monoazot triklorür / azot klorür. "İlk element azot, ön eksiz; üç klor: triklorür."
- PCl₃ → **fosfor triklorür** / fosfor üç klorür / triklorür fosfor. "Üç klor: triklorür; ilk element ön eksiz."
- SF₆ → **kükürt hekzaflorür** / kükürt hekzaflor / hekzakükürt florür. "Altı flor: hekzaflorür."
- N₂O₅ → **diazot pentoksit** / azot pentoksit / diazot beşoksit. "İki azot: diazot; beş oksijen, oksit önünde penta: pentoksit."
- CCl₄ → **karbon tetraklorür** / karbon klorür / tetrakarbon klorür. "Dört klor: tetraklorür; karbon tek atom, ön eksiz."
- N₂O₃ → **diazot trioksit** / azot trioksit / diazot oksit. "İki azot: diazot; üç oksijen: trioksit."

Yanlışta her kartta tek cümle: "Atom sayısına bak; ilk elementte mono yazılmaz." İpucu: "Önce formüldeki atom sayılarını yaz."

Sonra:
7. Yedi bileşik de aynı dört adımla adlandırıldı.

Defter ("Kovalent bileşiğin adı"): **Ön ek atom sayısını söyler; ilk elementte mono yok.** CO: karbon monoksit.

### Sahne 9 · Hangi kuralla adlandırılır?

Tahta: üç kutu: "Katyon adı + anyon adı" · "Romen rakamlı ad" · "Latince ön ekli ad". Sekiz formül kartı. Kart tahtada öne çıkar; öğrenci hangi kutuya girdiğini seçer; doğru seçilince kart kutusuna oturur. Köşede iyon listesi ve yedi metalin listesi küçük durur. İlk üç kutunun üstünde tek satır: "metal + ametal: iyonik · ametal + ametal: kovalent".

Anlatım:
1. Bileşiği adlandırmadan önce türüne bakılır.
2. Metal ve ametal ya da amonyum varsa bileşik iyoniktir.
3. İki ametal varsa bileşik kovalenttir.
4. Metal yedi çok katyonlu metalden biriyse ad rakamlıdır.

Dene (`kit.sinifla`, kart başına seçim; dayandığı anlatım: bu sahne, 1–4; F1 sahne 2–4; F2 sahne 4, 7; F3 sahne 3–8):
- Al₂(SO₄)₃ → **katyon adı + anyon adı**. "Alüminyum tek katyon verir; sülfat çok atomlu anyondur."
- MgH₂ → **katyon adı + anyon adı**. "Magnezyum tek katyonlu metaldir; hidrojen H⁻ olur: hidrür."
- SF₆ → **Latince ön ekli ad**. "İki ametal: kovalent."
- N₂O → **Latince ön ekli ad**. "İki ametal: kovalent."
- CuCl → **Romen rakamlı ad**. "Bakır birden çok katyon verir: Cu⁺."
- FeO → **Romen rakamlı ad**. "Demir birden çok katyon verir: Fe²⁺."
- Ca(OH)₂ → **katyon adı + anyon adı**. "Kalsiyum tek katyonlu metaldir; hidroksit çok atomlu anyondur."
- NH₄Br → **katyon adı + anyon adı**. "Amonyum katyonu ile bromür anyonu: iyonik."

Sonra:
5. Üç ayrı kural vardır; hangisinin kullanılacağını bileşiğin türü belirler.

### Sahne 10 · Ad ve formül yapbozu

Tahta: tarsia tahtası; sekiz yuva, her yuvanın bir kenarında formül, öbür kenarında ad. Formül kartları: Al₂(SO₄)₃ · MgH₂ · SF₆ · N₂O · CuCl · FeO · Ca(OH)₂ · NH₄Br. Kart öne çıkar, altında üç ad şıkkı belirir; doğru ad seçilince kart eşiyle birlikte yuvaya oturur ve iki kart arasında çizgi belirir. Sekiz yuva dolunca yapboz tamamlanır: sekiz çift, her çiftin altında hangi kuralın kullanıldığı küçük bir renk işaretiyle.

Anlatım:
1. Sekiz formülü adlarıyla eşleştirelim.
2. Önce bileşiğin türüne bak, sonra kuralı uygula.

Dene (`yapboz`, kart başına üç ad şıklı `c.choice`; doğru şık ilk sırada yazılmıştır, tahtada sırası karıştırılır; her kartın yanlış şıkları öğretilmiş kuralın yanlış uygulanışıdır): Dayandığı anlatım: sahne 8 ve 9.
1. Al₂(SO₄)₃ → **alüminyum sülfat** / alüminyum üç sülfat / sülfat alüminyum. "İyonik: sayı ve parantez ada girmez."
2. MgH₂ → **magnezyum hidrür** / magnezyum dihidrür / magnezyum hidrojen. "İyonik: katyon adı, anyon adı."
3. SF₆ → **kükürt hekzaflorür** / kükürt florür / monokükürt hekzaflorür. "Kovalent: sayılar ön ekle söylenir; ilk elementte mono yok."
4. N₂O → **diazot monoksit** / azot monoksit / diazot oksit. "İki azot: diazot; bir oksijen: monoksit."
5. CuCl → **bakır(I) klorür** / bakır(II) klorür / bakır klorür. "Bir Cl⁻ var; tek bakır 1+ taşır."
6. FeO → **demir(II) oksit** / demir(III) oksit / demir oksit. "Bir O²⁻ var; tek demir 2+ taşır."
7. Ca(OH)₂ → **kalsiyum hidroksit** / kalsiyum dihidroksit / kalsiyum oksijenhidrojen. "İyonik: sayı ve parantez ada girmez."
8. NH₄Br → **amonyum bromür** / amonyum dibromür / azot bromür. "İyonik: amonyum katyonu, bromür anyonu."

Yanlış seçimde kart ve ad birlikte titrer; tek cümle: "Önce türe bak: iyonik mi, kovalent mi?"

Sonra:
3. Yapboz tamamlandı: sekiz bileşik, üç kural.

### Çıkış soruları

1. (yeni durum) NO₂ bileşiğinin adı hangisidir? **Azot dioksit** / Monoazot dioksit / Diazot oksit. (sahne 4, 5)
2. (yeni durum) CF₄ bileşiğinin adı hangisidir? **Karbon tetraflorür** / Karbon florür / Tetrakarbon florür. (sahne 3, 4, 8)
3. (yanılgı) Bir öğrenci CO'yu "monokarbon monoksit" diye adlandırıyor. Hangisi bu hatayı düzeltir? **İlk elementte "mono" kullanılmaz** / İkinci elementte ön ek kullanılmaz / Oksit sözcüğü yazılmaz. (sahne 4)
4. (yanılgı, yeni durum) Bir öğrenci MgCl₂'yi "magnezyum diklorür" diye adlandırıyor. Hangisi bu hatayı düzeltir? **Metal ve ametalin iyonik bileşiğinde ön ek kullanılmaz** / Magnezyum ilk elementte mono alır / Klorür yerine klor yazılır. (sahne 2, 9)
5. (yeni durum) Difosfor pentoksit bileşiğinin formülü hangisidir? **P₂O₅** / PO₅ / P₅O₂. (sahne 3, 4, 5)

Özet: Kovalent bileşiğin adı atom sayılarını söyler. · İlk element adıyla, ikinci element anyon adıyla yazılır; ilk elementte mono yok. · Oksit önünde mono, tetra, penta ünlüsünü bırakır. · **Ön ek, o atomdan kaç tane olduğunu söyler.**

## F4 · Konu tekrarı: Bileşiklerin adlandırılması (`f4-tekrar.html`, 1 sahne + 10 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (formül şeridi ve iki ad kutusu · çok atomlu iyon kutusu · demir iki kutu ve Romen rakamı · ön ek listesi ve CCl₄ · "tetra + oksit" birleşmesi · iki atomun elektronegatifliği) ve deftere düşer; biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. İyonik bileşikte önce katyonun, sonra anyonun adı yazılır; sayı yazılmaz.
3. Çok atomlu iyon, aynı kuralı değiştirmez.
4. Çok katyonlu metalde ad, yükü Romen rakamıyla söyler.
5. Kovalent bileşikte ön ek, atom sayısını söyler.
6. İlk elementte mono yazılmaz; oksit önünde son ünlü düşer.
7. Formülde elektronegatifliği az olan öne yazılır.

Defter: **İyonik: katyon adı, anyon adı; sayı yok.** **Çok katyonlu metal: Romen rakamı.** **Kovalent: ön ek atom sayısını söyler.** Örnekler: Na₂S sodyum sülfür · FeCl₃ demir(III) klorür · CCl₄ karbon tetraklorür.

Sorular (`quiz`, karışık sırada):

1. Li₂SO₄ bileşiğinin adı hangisidir? **Lityum sülfat** / Dilityum sülfat / Sülfat lityum. — F1
2. Stronsiyum klorürün formülü hangisidir? **SrCl₂** / SrCl / Sr₂Cl. — F1
3. Ba(CH₃COO)₂ bileşiğinin adı hangisidir? **Baryum asetat** / Baryum iki asetat / Asetat baryum. — F1
4. FeS bileşiğinde demirin yükü 2+'dır. Bileşiğin adı hangisidir? **Demir(II) sülfür** / Demir(III) sülfür / Demir sülfür. — F2
5. Kurşun(II) oksit bileşiğinin formülü hangisidir? **PbO** / PbO₂ / Pb₂O. — F2
6. Bir öğrenci Fe₂O₃'e "demir(II) oksit" diyor. Hata nedir? **Romen rakamını demir atomu sayısından almış; demirin yükü 3+** / Oksidin adını yanlış yazmış / Metalin adını sona yazmış. — F2
7. Hangi bileşiğin adında Romen rakamı kullanılmaz? **ZnCl₂** / SnCl₂ / CoCl₂. — F2
8. NF₃ bileşiğinin adı hangisidir? **Azot triflorür** / Monoazot triflorür / Azot flor. — F3
9. CO bileşiğinin adı hangisidir? **Karbon monoksit** / Karbon monooksit / Monokarbon monoksit. — F3
10. Aşağıdakilerden hangi ikisi aynı kuralla adlandırılır? **NH₄Cl ve CaCl₂** / FeO ve N₂O / SF₆ ve CuCl. — F1, F2, F3

Akılda kalıcı cümle: Adın nasıl kurulacağını bileşiğin türü belirler; metalin yükünü ya da atomların sayısını ad söyler.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.6) | Karşılığı |
|---|---|
| a) İyonik ve kovalent bağlı bileşikleri oluşturan atom veya iyonları belirler | F1 sahne 2 (formülden iyonlar), sahne 4 (çok atomlu iyonlar); F3 sahne 2 ve 4 (kovalent bileşikte atomlar ve sayıları), sahne 9 (bileşiğin türünü belirleme) |
| b) İyonik ve kovalent bileşikleri oluşturan atomların veya iyonların adları ile bileşik adları arasında ilişki | F1 sahne 3–6; F2 sahne 3, 5, 6; F3 sahne 3–5, 8 |
| c) İyonik ve kovalent bileşiklerin adlandırma kurallarına ilişkin genelleme | F1 sahne 3 (defter), sahne 7; F2 sahne 7 (defter); F3 sahne 8 (akış şeması ve defter); F4 |
| Tek bir tür katyonu olan metallerin iyonik bileşiklerinin sistematik adları ve formülleri verilir | F1 sahne 2–3, 5 |
| Öğrenciler iyonik bileşiği oluşturan iyonları belirler | F1 sahne 2 (Birlikte çöz, Sıra sende) |
| Bileşikteki pozitif ve negatif yüklü iyonların adlarıyla bileşiğin adı arasında ilişki | F1 sahne 3 |
| Tek katyonlu metallerin iyonik bileşiklerinden yola çıkarak adlandırma kurallarını oluşturma; genelleme | F1 sahne 3, 4, 7 (kural, çok atomlu iyonlarda sınanır) |
| Birden fazla katyonu olan geçiş metalleri (Cr, Mn, Cu, Pb, Sn, Fe, Co); formüller ve adlar birlikte | F2 sahne 2–6 (yedi metalin tamamı F2 sahne 4'te; Fe, Cu sahne 2–5; Sn, Pb, Mn sahne 6; Co sahne 7; Cr çıkış sorusu 5) |
| Sabit ve değişken değerlikli metallerin adlandırılması arasındaki farkı öğrencilerin belirlemesi | F2 sahne 7 (karşılaştırma ve kart başına seçim) |
| Kovalent bileşiklerin sistematik adları, formülleri ve atom sayılarını belirten Latince ön ekler | F3 sahne 3 |
| Kovalent bileşikleri oluşturan atomları belirleme | F3 sahne 2, 4, 6 |
| Ametal atomların adları ile bileşik adları arasında ilişki | F3 sahne 3–5 |
| Birinci ve ikinci ametalin adlandırılması arasındaki farkı belirleme | F3 sahne 4 |
| Kovalent bileşiklerin adlandırma kurallarının genellenmesi | F3 sahne 8 |
| Tarsia yapboz: iyonik ve kovalent bileşiklerin ad–formül eşleştirmesi | F3 sahne 10 (`yapboz`: kart başına seçim) |
| Anahtar kavramlar ve çerçeve: Bileşiklerin Adlandırılması | F1–F3 |
| Konu tekrarı | F4 |
| Öğrencinin kuralı kendi cümlesiyle yazması, arkadaşlarla tartışma (kitabın etkinlikleri), kâğıt tarsia oyunu | `site dışı (sınıfta yapılır)` |

Fazla olan: (1) F2 sahne 5–6'daki "metalin yükünü formülden bulma" ve "addan formüle": program "formülleri ve adları birlikte verilir" diyor; yük hesabı B3'ün yük toplamı kuralının uygulamasıdır, yeni bilgi vermez; tabloda bir yük bulma işlemi olmadan Romen rakamı öğrenciye anlamsız kalırdı. (2) F3 sahne 6, formülde atom sırası (elektronegatiflik): kitap s. 143'te yazılı, programın metninde ayrıca anılmaz; adlandırmanın ön koşuludur. (3) F3 sahne 7, su ve amonyak: kitap s. 143 ve kullanıcının iletisi; programda anılmaz. (4) F1 sahne 3'teki "anyon adı çoğunlukla -ür ile biter" gözlemi: kitap Etkinlik 2.11 b'de bunu öğrencinin çıkarımına bırakır, açık bir cümle yoktur. Eksik olan: öğrencinin kuralı kendi cümlesiyle yazması ve arkadaşlarıyla tartışması (kitap Etkinlik 2.11 c ve 2.12 soru 2–3), kâğıt tarsia: `site dışı`. Kitabın s. 144'teki Kontrol Noktası 2.6'daki BH₃ (bor yarı metal) ve s. 143'teki "NH₃'ün formülü ile sistematik adı arasındaki uyumsuzluğun nedeni" sorusu derse alınmadı (kitapta cevabı yok).
