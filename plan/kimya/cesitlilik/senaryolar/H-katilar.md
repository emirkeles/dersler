# Senaryolar — Konu H · Katılar

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.8, `../PLAN.md` bölüm 3 (H1, H2), bölüm 7 (karar 11, 15, 17) ve bölüm 8 ("H · Katılar"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("°C" "santigrat derece", eksi işareti "eksi", ondalık sayı "bir buçuk", "iki virgül yetmiş beş" gibi okunur).
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Ölçümler bir durumun içinde sunulur: bir malzeme laboratuvarı on bir kristal katıyı ölçmüştür.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 5 çıkış sorusu. Fikir birkaç parçadan oluşuyorsa 3–6. adımlar her parça için yinelenir.
- Sınıflandırma ve eşleştirme sahneleri kart başına seçimle kurulur (kitteki `sinifla`): kart öne çıkar, öğrenci kutuyu seçer, kart tahtada yerine oturur, altına geri bildirim düşer. Sürükle-bırak yoktur.
- Renkler tema boyunca aynıdır: artı yük (katyon, çekirdek) turuncu, eksi yük (anyon, elektron) mavi, çekme yeşil, itme kırmızı. Atom ve molekül küreleri nötr gri tonlardadır; kitaptaki element renkleri kullanılmaz. Katı türleri renkle değil adla ve çerçeveyle ayrılır (renk yalnızca yük içindir). Çubuk grafiklerde çubuklar nötr griyle çizilir.
- Çizimler şematiktir: yüzeysel kesit, tanecik boyları oranlı değildir. Birim hücre, kristal örgü, geometrik şekil adları, bağ uzunluğu yoktur; düzenin yinelendiği hizalama çizgileriyle gösterilir (düzenli çizimde soluk çizgiler tanecikleri tutar; düzensizde tutmaz).
- Kuvarsın formülü hiçbir yerde yazılmaz. Cam ve kuvars "silisyum ve oksijen atomları" diye anılır.

Çizim araçları (kit için; konu araçları `dersler/h-araclar.js` içinde):

- `katiCizimi(katı, duzen)`: büyüteç dairesi içinde alt mikro çizim. Kartlar: sofra tuzu (turuncu Na⁺ ve mavi Cl⁻ dizisi, hizalama çizgileriyle), potasyum iyodür (K⁺, I⁻), kalsiyum oksit (Ca²⁺, O²⁻), magnezyum oksit; buz ve kuru buz (düzenli dizilmiş gri moleküller; H₂O ve CO₂ uzay-dolgu biçimi `uzayDolgu` aracından); sodyum, magnezyum, alüminyum, demir, çinko (turuncu katyonlar, aralarında dolaşan mavi elektronlar; `metal` aracından); elmas, grafit, kuvars (düzenli gri atom ağı; kuvarsta iki cins atom); cam (aynı iki cins atom, düzensiz ağ, hizalama çizgisi yok). `duzen: 'duzenli' | 'duzensiz'` hizalama çizgilerini açıp kapatır.
- `terazi(değerler, eksen)`: tek eksen üzerinde yatay çubuk ya da nokta dizisi (erime noktası: −100 … 4000 °C, sertlik: 0 … 10). Çubuk adı ve değeri yanında yazar; çubuklar grup grup, istenen sırayla belirir; biten grup soluklaşır. Etiket: katı adı ve küçük tür etiketi ("iyonik", "moleküler", "kovalent", "metalik").
- `olcumTablosu(satırlar, sütunlar)`: katı adı, tür, erime noktası, iletkenlik ("iletir" kalın, "iletmez" soluk), sertlik; satırlar gruplar hâlinde belirir. Ayrıca iki sütunlu karşılaştırma tablosu (öğrencinin genellemesi ile bilim insanlarının genellemesi yan yana; eşleşen satırda ✓).
- `ingotCizimi()`: iki koni uçlu silindir külçe silueti ve küçük güneş paneli ızgarası (düz vektör; gerçek fotoğraf üretilmez).
- Resim gerekir (yalnızca H1 sahne 2; `GORSELLER.md`): yedi katının yan yana görüntüsü (sofra tuzu, çelik kaşık, bilgisayar ekranı, kurşun kalem ucu, elmas, kar tanesi, cam). Resim bu sahnede karşılaştırılır; yer tutucu aynı boyutta vektör kutulardır.

## H1 · Kristal katı, amorf katı

- **Fikir:** Katılar, taneciklerinin dizilişine göre kristal ve amorf olarak ikiye ayrılır: kristal katıda tanecikler yinelenen düzenli bir yapıda dizilir ve belirli bir erime noktası vardır, amorf katıda tanecikler düzensizdir ve belirli bir erime noktası yoktur.
- **Giriş ekranı sorusu:** Kar tanesi, elmas ve cam birer katı; tanecikleri aynı biçimde mi dizilir? (`PLAN.md` bölüm 3'teki açılış "saydam ve kırılgan" diyordu; kitapta bu nitelikler yok, soru değiştirildi.)
- **Kaynak:** Ders kitabı s. 159 (katının genel nitelikleri: tanecikler arası çekim çok güçlü, tanecikler yalnızca titreşim hareketi yapar, belirli şekil ve hacim; on iki katının görselleri ve alt mikro çizimleri; Etkinlik 2.16), s. 160–161 (aynı görseller; "düzenli bir yapı oluşturup oluşturmadığına" bakma sorusu), s. 161 (kristal ve amorf tanımı; amorf: cam, lastik, plastik, mum, tereyağı; kristal katıların belirli erime ve donma noktası; günlük hayattaki katıların çoğu kristaldir), s. 162 (buz 0 °C, sofra tuzu 801 °C erime noktası), s. 158 (silisyum ingot külçesi). Kar tanesi, kitabın "buz (katı H₂O)" görseliyle eşlenir (`PLAN.md` karar 11). Katının temel nitelikleri ön bilgidir (`MUFREDAT.md` temel kabuller); tek cümleyle hatırlatılır. Alt mikro çizimlerin görüntüsü sayfa 159–161 ve 165'ten alındı.
- **Sınır:** Yalnızca düzenli ya da düzensiz dizilim ve belirli erime noktası. Birim hücre, kristal örgü, "belirli geometrik şekil", kristal türlerinin adları (iyonik, moleküler vb.), elmas ile grafitin farkı yoktur; çelik kaşık ve bilgisayar ekranı yalnızca sahne 2'de adıyla anılır, sınıflandırılmaz (`PLAN.md` karar 11). Kuvarsın formülü yazılmaz.
- **Güç kavramlar ve gösterimi:** (1) "Düzenli yinelenen yapı": önce tanıdık görünüm (yedi katı), sonra büyüteçle tanecikler; düzenli çizimde soluk hizalama çizgileri belirir ve taneciklerin hepsi çizgi kesişimine oturur; düzensiz çizimde çizgiler tutmaz. (2) "Belirli erime noktası": kristal katının yanında bir sıcaklık değeri, amorf katının yanında "belirli erime noktası yok" yazar. (3) "Aynı atomlar, farklı dizilim": cam ve kuvars yan yana, ikisinde de silisyum ve oksijen.
- **Hedeflenen yanılgı:** "Katı hâlde tanecikler hep düzenli dizilir" ve "Her katının belirli bir erime noktası vardır." (Kitap s. 159 katının "en düzenli hâl" olduğunu söyler; bu cümle yanılgıyı besleyebilir, derste kullanılmaz.)
- **Akılda kalıcı cümle:** Kristalde tanecikler düzenli, amorf katıda düzensiz dizilir.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Yapısında O–H bağı olan moleküller arasında hangi etkileşim kurulabilir? **Hidrojen bağı** / İyon-dipol / Metalik bağ. (G4) Yanlışta: "F–H, O–H ya da N–H bağı olan moleküller hidrojen bağı kurabilir."
2. Sofra tuzunu bir arada tutan çekim hangi tanecikler arasındadır? **Katyonlar ile anyonlar** / Atomlar ile ortak elektronlar / Katyonlar ile elektron denizi. (B2) Yanlışta: "İyonik bağ, katyon ile anyonun elektrostatik çekimidir."

Sonra: "Bugün bu taneciklerin katıda nasıl dizildiğine bakacağız."

### Sahne 2 · Yedi katı, yedi görünüm

Tahta: yedi küçük görsel yan yana, altlarında adları: sofra tuzu, çelik kaşık, bilgisayar ekranı, kurşun kalem ucu, elmas, kar tanesi, cam (yedi öğe, on dört kelime; resim, bkz. çizim araçları). Sonra ortada tek bir katının üzerine büyüteç gelir; büyüteç içinde tanecikler titreşir.

Anlatım:
1. Sofra tuzu, çelik kaşık ve bilgisayar ekranı birer katıdır.
2. Kurşun kalem ucu, elmas, kar tanesi ve cam da öyle.
3. Hepsi katı; görünümleri ve özellikleri yine de çok farklı.
4. Katıda tanecikler birbirini çok güçlü çeker.
5. Tanecikler yerlerinden ayrılmaz, yalnızca titreşir.
6. Katıların farkını taneciklerin dizilişinde arayalım.

### Sahne 3 · Düzenli ve düzensiz dizilim

Tahta: iki büyüteç dairesi yan yana. Solda sofra tuzu: turuncu Na⁺ ve mavi Cl⁻ dizisi; soluk hizalama çizgileri her taneciği bir kesişime oturtur. Sağda cam: gri silisyum ve oksijen atomları, çizgi yok, atomlar gelişigüzel ağ kurar. Köşelerde "Na⁺ Cl⁻" ve "Si O" etiketi. Cümleler ilerledikçe dairelerin altına "kristal katı" ve "amorf katı" yazar.

Anlatım:
1. Büyüteçle tanecik düzeyine inelim: önce sofra tuzu.
2. Sodyum ve klorür iyonları düzenli bir desende dizilir.
3. Aynı desen katının her yerinde yinelenir.
4. Şimdi cam: silisyum ve oksijen atomları desen kurmaz.
5. İkisi de katıdır; yalnızca dizilişleri farklıdır.
6. Tanecikleri yinelenen düzenli yapıda dizilen katıya kristal katı denir.
7. Düzensiz dizilen katıya amorf katı denir.
8. Sofra tuzu kristal katıdır, cam amorf katıdır.

### Sahne 4 · Belirli erime noktası

Tahta: iki sütun. Solda "kristal katı": buz ve yanında "0 °C", sofra tuzu ve yanında "801 °C"; her değerin yanında küçük termometre çentiği. Sağda "amorf katı": cam ve yanında "belirli erime noktası yok"; altında lastik, plastik, mum, tereyağı etiketleri (sonradan belirir).

Anlatım:
1. Kristal katının tanecikleri hep aynı düzendedir.
2. Bu yüzden kristal katının belirli bir erime noktası vardır.
3. Buzun erime noktası 0 °C, sofra tuzunun 801 °C'tır.
4. Amorf katının tanecikleri düzensizdir.
5. Bu yüzden amorf katının belirli bir erime noktası yoktur.
6. Cam, lastik, plastik, mum ve tereyağı amorf katıdır.
7. Günlük hayatta gördüğümüz katıların çoğu kristaldir.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir katının belirli bir erime noktası var. Tanecikleri hakkında ne söylenir? **Yinelenen düzenli yapıda dizilmişlerdir** / Düzensiz dizilmişlerdir / Birbirini çekmezler. Dayandığı anlatım: 1–5. İpuçları: "Belirli erime noktası kristal katıda vardı." · "Düzensiz dizilen katıda belirli erime noktası yoktu."

Sonra:
8. Belirli erime noktası olan katının tanecikleri düzenlidir.

### Sahne 5 · Çizimden sınıflandır

Tahta: üç sütunlu tablo: "katı · çizim · tür". Satırlar: sofra tuzu (küçük düzenli çizim, "kristal"), cam (küçük düzensiz çizim, "amorf"), elmas (gri atomlar yinelenen düzende; tür "?"). Soru gelince dördüncü satır belirir: kurşun kalem ucu (grafit çizimi: gri atomlar yinelenen düzende; tür "?").

Anlatım:
1. Bir katının türünü, çizimdeki dizilişe bakarak bulursun.
2. Desen yinelenirse kristal, yinelenmezse amorf katıdır.
3. Elmasta karbon atomları yinelenen bir desende dizilir.

Birlikte çöz (`tag: 'Birlikte çöz'`; tabloda sofra tuzu ve cam dolu, elmas satırının türü "?"): Elmas hangi tür katıdır? **Kristal katı** / Amorf katı / Kristal de amorf da değil. Dayandığı anlatım: sahne 3, 6–7; bu sahne, 1–3. İpuçları: "Atomlar yinelenen bir desende." · "Desen yinelenen katı kristaldir."

Soru (`tag: 'Sıra sende'`; yeni durum): Kurşun kalem ucundaki grafitte atomlar yinelenen bir desende dizilir. Grafit için hangisi doğrudur? **Kristal katıdır; belirli erime noktası vardır** / Amorf katıdır; belirli erime noktası yoktur / Amorf katıdır; belirli erime noktası vardır. Dayandığı anlatım: sahne 3, 6–8; sahne 4, 1–5. İpuçları: "Düzen yinelenirse kristal." · "Amorf katıda belirli erime noktası yoktu."

Gör: grafit satırının türü "kristal" olur; erime noktası sütunu yoktur, yalnızca "düzenli" yazar.

Sonra:
4. Elmas ve kurşun kalem ucu da kristal katıdır.

Defter ("Kristal ve amorf"): **Kristal düzenli, amorf düzensiz dizilir.** Örnek: tuz kristal, cam amorf.

### Sahne 6 · Çizimlere bak, ayır

Tahta: iki kutu: "kristal katı" ve "amorf katı". Yedi kart sırayla öne çıkar; çizimli kartlarda büyüteç çizimi, ad kartlarında yalnızca ad: kar tanesi (düzenli su molekülleri), kuvars (düzenli, iki cins atom), mum (ad kartı), sodyum (turuncu katyonlar düzenli, aralarında elektronlar), lastik (ad kartı), kuru buz (düzenli CO₂ molekülleri), plastik (ad kartı). Köşede "Si O" etiketi kuvars kartında.

Anlatım:
1. Çizime bak: desen yinelenir mi?

Dene (kart başına seçim, `sinifla`; her yerleştirmede kartın altına bir cümle düşer):
- Kar tanesi → kristal. "Su molekülleri yinelenen düzende; kar tanesi kristaldir."
- Kuvars → kristal. "Camdakiyle aynı atomlar, ama yinelenen düzende; kuvars kristaldir."
- Mum → amorf. "Mum amorf katıdır; tanecikleri düzensizdir."
- Sodyum → kristal. "Katyonlar düzenli diziliyor; sodyum kristaldir."
- Lastik → amorf. "Lastik amorf katıdır; belirli erime noktası yoktur."
- Kuru buz → kristal. "Moleküller yinelenen düzende; kuru buz kristaldir."
- Plastik → amorf. "Plastik amorf katıdır; tanecikleri düzensizdir."

Dayandığı anlatım: sahne 3, 6–8; sahne 4, 4–6; sahne 5, 2.

Sonra:
2. Çizimi olan dört katı da yinelenen düzende; hepsi kristaldir.
3. Kuvars ile cam aynı atomlardan oluşur; fark yalnızca dizilişte.

### Sahne 7 · Kristal silisyum ingot külçesi

Tahta: solda iki koni uçlu silindir külçe silueti; sağda küçük güneş paneli ızgarası. Üstte "kristal silisyum ingot külçesi", yanında "2022". Cümleler ilerledikçe külçenin altına "ilk endüstriyel boyut" yazar. (Gerçek fotoğraf üretilmez; çizim düzdür.)

Anlatım:
1. Güneş pillerinde en yaygın kullanılan madde kristal silisyumdur.
2. Güneş hücresi pazarının yüzde 85'inden fazlası kristal silisyumdandır.
3. 2022'de Türkiye'nin ilk endüstriyel boyutta kristal silisyum ingot külçesi üretildi.
4. Niğde Ömer Halisdemir Üniversitesi ile KOP Bölge Kalkınma İdaresi üretti.
5. Projeyi değerli kılan, külçenin kristal özellikleridir.
6. Yerli ve millî projeler ülkemizin kalkınmasında büyük önem taşır.

### Çıkış soruları

1. Kristal katı hangi özelliğiyle tanınır? **Tanecikleri yinelenen düzenli bir yapıda dizilir** / Tanecikleri gelişigüzel dizilir / Tanecikleri hiç titreşmez. (sahne 3)
2. (yanılgı) Bir katının belirli bir erime noktası yoktur. Bu katı için hangisi doğrudur? **Amorf katıdır; tanecikleri düzensizdir** / Kristal katıdır; tanecikleri düzenlidir / Katı hâlde bulunamaz. (sahne 4)
3. (yeni durum; tahtada K⁺ ve I⁻ iyonlarının yinelenen düzende dizildiği çizim) Potasyum iyodür için hangisi doğrudur? **Kristal katıdır; belirli erime noktası vardır** / Amorf katıdır; belirli erime noktası vardır / Amorf katıdır; belirli erime noktası yoktur. (sahne 3, 4)
4. (yeni durum) Tereyağı amorf bir katıdır. Hangisi doğrudur? **Tanecikleri düzensizdir; belirli erime noktası yoktur** / Tanecikleri düzenlidir; belirli erime noktası vardır / Tanecikleri düzensizdir; belirli erime noktası vardır. (sahne 4)
5. (yeni durum; tahtada kuvars ve cam yan yana, ikisinde de silisyum ve oksijen atomları) Kuvars kristal, cam amorf katıdır. Aradaki fark nereden gelir? **Atomların dizilişinden** / Atomların cinsinden / Atomların sayısından. (sahne 3, 6)

Özet: Kristalde tanecikler yinelenen düzende dizilir; belirli erime noktası vardır. · Amorf katıda tanecikler düzensizdir; belirli erime noktası yoktur. · Cam, lastik, plastik, mum ve tereyağı amorf katıdır. · **Kristalde tanecikler düzenli, amorf katıda düzensiz dizilir.**

## H2 · Katının özelliğini etkileşim belirler

- **Fikir:** Kristal katılar, taneciklerini bir arada tutan etkileşimin türüne göre dört gruba ayrılır (iyonik, moleküler, kovalent, metalik); bir kristal katının erime noktası, elektrik iletkenliği ve sertliği bu türe bağlıdır. Öğrenci ölçümlerden her türün niteliklerini çıkarır, çıkarımını bilim insanlarının genellemesiyle karşılaştırır.
- **Giriş ekranı sorusu:** Buz 0 °C'ta erir, sofra tuzu 801 °C'ta; ikisi de kristal katı. Fark nereden gelir? (`PLAN.md` bölüm 3'teki "kızgın tavada bile erimez" kitapta olmadığı için değiştirildi; sayılar kitaptan.)
- **Kaynak:** Ders kitabı s. 162 (dört kristal tür: iyonik katı: iyonlar, iyonik bağ; moleküler katı: moleküller, hidrojen bağı, dipol-dipol ve London; kovalent katı: kovalent bağlı atomlar; metalik katı: metal katyonları ve elektron denizi, metalik bağ; örnekler; on bir katının erime noktası, elektrik iletkenliği, Mohs sertliği; sertlik dipnotu: değer büyüdükçe katı sert, en sert mineral 10), s. 163 (genelleme tablosu: taneciklerin düzeni, tanecikleri tutan kuvvetler, katının fiziksel özellikleri, örnekler; "genelleme, bilimsel bilgilerle karşılaştırma" soruları), s. 159–161 ve 165 (alt mikro çizimler), s. 147 (moleküller arası etkileşimler metalik, iyonik ve kovalent bağdan zayıftır; G konusunda verilir, burada tek cümleyle hatırlatılır), s. 120 ve 128 (iyonik ve kovalent bağ güçlü etkileşimdir), s. 112 (A2: iyon yükü ve serbest elektron sayısı arttıkça metalik bağ kuvvetlenir). Programın "sertlik, erime noktası, iletkenlik" üçlüsü verinin sütunlarıdır.
- **Sınır:** Isı iletkenliği, Young katsayısı sütunları ve S/m cinsinden iletkenlik değerleri yoktur (yalnızca "iletir / iletmez"). Parlaklık ve kırılganlık yalnızca bilim insanlarının genellemesinde (sahne 9) geçer; ölçülen nitelik değildir. Birim hücre, kristal örgü, elmas ile grafitin farkı, grafitin neden ilettiği yoktur: grafit, "kovalent katılar genellikle yalıtkandır" genellemesinin aykırı durumu olarak yalnızca verinin içinde görünür. Kuvarsın formülü yazılmaz. Kristal örnek listesindeki (s. 163) yalnızca CaF₂, MgO, I₂, naftalin, Fe, Zn kullanılır; öteki formüller (P₄, NH₃, SO₂, C₆H₁₂O₆, ZnS, Ca, Cu) alınmaz. İyonik bağın kuvvetinin iyon yüküyle ilişkisi anlatılmaz (programda yok); iyonik katıların erime noktaları arasındaki fark açıklanmaz.
- **Güç kavramlar ve gösterimi:** (1) Dört tür: dört büyüteç çizimi, her birinde tanecik türü ve altında etkileşimin adı; sonra tek tablo. (2) Veri okuma: önce yalnızca erime noktası, tek eksende çubuklar, grup grup belirir; sonra iletkenlik (yalnızca "iletir/iletmez"), sonra sertlik (0–10 ölçeğinde noktalar). Aynı on bir katı üç kez, üç ayrı nitelikle görülür; tür etiketi her satırda yazar. (3) Metalik katıda erime noktası ve bağ kuvveti: sodyum, magnezyum, alüminyum yan yana; iyon yükü 1+, 2+, 3+ ve çubuklar aynı sırada uzar. (4) Öğrencinin genellemesi ile bilim insanlarınınki: iki sütun yan yana, eşleşen satıra ✓.
- **Hedeflenen yanılgı:** "Kristal olan her katının erime noktası yüksektir."
- **Akılda kalıcı cümle:** Katının niteliklerini, taneciklerini tutan etkileşimin türü belirler. (`PLAN.md`'deki "etkileşim güçlüyse katı zor erir" kitapta açık yazılı değildir; derste yalnızca moleküler katı ile metalik katı için, kitaptaki bilgilerin birleşimiyle kurulur.)

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Kristal katının tanecikleri nasıl dizilir? **Yinelenen düzenli bir yapıda** / Düzensiz bir yapıda / Yalnızca birkaç taneciğin düzeninde. (H1) Yanlışta: "Kristal katıda tanecikler yinelenen düzenli bir yapı kurar."
2. H₂O ve CO₂ moleküllerinden hangisi hidrojen bağı kurabilir? **H₂O** / CO₂ / İkisi de. (G4) Yanlışta: "O–H bağı olan molekül hidrojen bağı kurabilir; CO₂'de yok."

Sonra: "Bugün katının tanecikleri arasındaki etkileşimin neye yol açtığına bakacağız."

### Sahne 2 · Dört gruptan ilk ikisi: iyonik ve moleküler katı

Tahta: iki büyüteç dairesi yan yana. Solda sofra tuzu (turuncu Na⁺, mavi Cl⁻, düzenli); altında "iyonik katı · iyonlar · iyonik bağ". Sağda buz (düzenli gri H₂O molekülleri); altında "moleküler katı · moleküller · hidrojen bağı, dipol-dipol, London". Çizimler cümleler ilerledikçe birer birer belirir.

Anlatım:
1. Kristal katılar, taneciklerinin türüne göre dört gruba ayrılır.
2. Birinci grup iyonik katıdır: tanecikleri katyonlar ve anyonlardır.
3. İyonları iyonik bağ, yani zıt yüklerin çekimi tutar.
4. Sofra tuzu iyonik katıdır.
5. İkinci grup moleküler katıdır: tanecikleri moleküllerdir.
6. Molekülleri hidrojen bağı, dipol-dipol ve London etkileşimleri tutar.
7. Buz, yani katı su, moleküler katıdır.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada düzenli dizilmiş CO₂ molekülleri): Kuru buz, katı karbon dioksittir. Hangi gruptadır? **Moleküler katı** / İyonik katı / Metalik katı. Dayandığı anlatım: 5–7. İpuçları: "Kuru buzun tanecikleri CO₂ molekülleri." · "İyonik katıda tanecikler iyonlardır."

Gör: kuru buz çizimi sağ daireye eklenir; altında "moleküler katı".

Sonra:
8. Buz ve kuru buz moleküler katıdır.

### Sahne 3 · Öteki iki grup: kovalent ve metalik katı

Tahta: önceki iki daire soluk; yeni iki daire. Solda elmas (düzenli gri atom ağı); altında "kovalent katı · atomlar · kovalent bağ". Sağda sodyum (turuncu katyonlar, aralarında mavi elektronlar); altında "metalik katı · katyonlar ve elektron denizi · metalik bağ". Sonra dört tür tek tabloda toplanır: sütunlar "tür · tanecik · etkileşim · örnek"; satırlar: iyonik katı · katyon, anyon · iyonik bağ · sofra tuzu / moleküler katı · molekül · moleküller arası etkileşimler · buz / kovalent katı · atom · kovalent bağ · elmas / metalik katı · katyon, elektron denizi · metalik bağ · sodyum. (Tablo; 25 kelime sınırı tablo istisnasıyla aşılır.)

Anlatım:
1. Üçüncü grup kovalent katıdır: tanecikleri kovalent bağlı atomlardır.
2. Atomları kovalent bağ bir arada tutar.
3. Elmas, grafit ve kuvars kovalent katıdır.
4. Dördüncü grup metalik katıdır: tanecikleri metal katyonları ve elektron denizidir.
5. Katyonları ve elektron denizini metalik bağ bir arada tutar.
6. Sodyum metalik katıdır.
7. Dört grubu bir tabloda toplayalım.

Birlikte çöz (`tag: 'Birlikte çöz'`; tabloda sofra tuzu, buz, elmas, sodyum satırları dolu; beşinci satır: "kalsiyum oksit · Ca²⁺ ve O²⁻ iyonları · ?"): Kalsiyum oksit hangi gruptadır? **İyonik katı** / Moleküler katı / Metalik katı. Dayandığı anlatım: sahne 2, 2–4. İpuçları: "Tanecikleri katyon ve anyon." · "Ne molekül var ne elektron denizi."

Soru (`tag: 'Sıra sende'`; yeni durum): Alüminyum, Al³⁺ katyonları ve serbest dolaşan elektronlardan oluşur. Hangi gruptadır? **Metalik katı** / İyonik katı / Kovalent katı. Dayandığı anlatım: 4–6. İpuçları: "Katyonlar ve elektron denizi birlikte." · "Anyon yok; iyonik olamaz."

Gör: alüminyum satırı tabloya eklenir, "metalik katı".

Sonra:
8. Etkileşimin türü, katının hangi gruba girdiğini belirler.

### Sahne 4 · Erime noktası (örnek göster)

Tahta: yatay sıcaklık ekseni (−100 °C … 4000 °C). On bir katının çubukları, grup grup belirir; her çubuğun yanında katının adı, sayısı ve küçük tür etiketi (sayı ve kısa etiketten oluşan çizim; 25 kelime sınırı tablo istisnasıyla aşılır). Sıra: moleküler (buz 0, kuru buz −79), iyonik (potasyum iyodür 681, sofra tuzu 801, kalsiyum oksit 2572), kovalent (elmas 3550, grafit 3927, kuvars 1785); metalik katılar sahne 5'te eklenir.

Anlatım:
1. Bir malzeme laboratuvarı on bir kristal katıyı ölçtü.
2. Her katı için erime noktasını, iletkenliği ve sertliği yazdı.
3. Önce erime noktalarını çubuklarla çizelim.
4. Buzun erime noktası 0 °C, kuru buzunki −79 °C.
5. Moleküller arası etkileşimler bağlardan zayıftır; moleküler katılar düşük sıcaklıkta erir.
6. Potasyum iyodür 681, sofra tuzu 801, kalsiyum oksit 2572 °C'ta erir.
7. İyonik bağ güçlüdür; iyonik katılar yüksek sıcaklıkta erir.
8. Elmas 3550, grafit 3927, kuvars 1785 °C'ta erir.
9. Kovalent bağ da güçlüdür; kovalent katıların erime noktası çok yüksektir.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir moleküler katı ile bir iyonik katıdan hangisinin erime noktasının düşük olması beklenir? **Moleküler katının** / İyonik katının / İkisinin de aynı olması. Dayandığı anlatım: 4–7. İpuçları: "Moleküller arası etkileşimler bağlardan zayıf." · "Buz ile sofra tuzunu karşılaştır."

Sonra:
10. İki kristal katının erime noktası, etkileşim türüne göre çok farklı olabilir.

### Sahne 5 · Metalik katıların erime noktası

Tahta: üç kutu: sodyum (Na⁺, "1+", çubuk 98 °C), magnezyum (Mg²⁺, "2+", çubuk 650 °C), alüminyum (Al³⁺, "3+", çubuk yok, "?"). Kutuların üstünde sola doğru ince ok: "metalik bağ kuvvetlenir". Her kutuda iyonlar ve elektron denizi küçük çizimle.

Anlatım:
1. Metalik katılarda erime noktaları birbirinden çok farklıdır.
2. Sodyum 98 °C'ta, magnezyum 650 °C'ta erir.
3. İyon yükü ve serbest elektron sayısı arttıkça metalik bağ kuvvetlenir.
4. Sodyum 1+, magnezyum 2+, alüminyum 3+ iyon verir.
5. Bağ kuvveti sodyumdan alüminyuma doğru artar.

Birlikte çöz (`tag: 'Birlikte çöz'`; sodyum ve magnezyum çubukları çizili, alüminyum "?"): Alüminyumun erime noktası magnezyumunkine göre nasıl olur? **Daha yüksek** / Daha düşük / Aynı. Dayandığı anlatım: 2–5. İpuçları: "Alüminyumda iyon yükü ve serbest elektron sayısı daha büyük." · "Bağ daha kuvvetli; erimesi daha zor."

Gör: alüminyum çubuğu 660 °C'a uzar; çubuklar eksende yan yana: 98 · 650 · 660; alt satır "Na < Mg < Al".

Sonra:
6. Alüminyum 660 °C'ta erir; sıra bağ kuvvetiyle aynıdır.
7. Metalik katının erime noktası düşük de olur, yüksek de.

### Sahne 6 · Elektrik iletkenliği

Tahta: on bir katının listesi, her satırda ad ve küçük tür etiketi; "iletir" kalın, "iletmez" soluk yazılır. Satırlar gruplar hâlinde belirir (sayı ve kısa etiketten oluşan tablo; 25 kelime sınırı tablo istisnasıyla aşılır). Sıra: metalik (sodyum, magnezyum, alüminyum: iletir), iyonik (üçü iletmez), moleküler (ikisi iletmez), kovalent (elmas ve kuvars iletmez; grafit satırı gizli).

Anlatım:
1. Şimdi elektrik iletkenliğine bakalım.
2. Sodyum, magnezyum ve alüminyum elektriği iletir.
3. Elektriği iletmeyen katıya yalıtkan denir.
4. İyonik katıların üçü de yalıtkandır.
5. Buz ve kuru buz da yalıtkandır.
6. Elmas ve kuvars de elektriği iletmez.

Soru (`tag: 'Sıra sende'`; yeni durum): Demir de metalik bir katıdır. Elektrik iletkenliği için ne beklenir? **İletir** / İletmez / Erime noktası yüksekse iletir. Dayandığı anlatım: 2. İpuçları: "Metalik üç katının üçü de iletti." · "İletkenlik erime noktasına bağlı çıkmadı."

Gör: grafit satırı belirir: "iletir". Vurgulanır, yalnızca bu satır kalın.

Sonra:
7. Grafit de kovalent katıdır, ama elektriği iletir.
8. Kovalent katılar genellikle yalıtkandır; grafit bu düzenin dışında kalır.

### Sahne 7 · Sertlik

Tahta: yatay ölçek 0–10; her katı bir nokta, adıyla. Sıra: kovalent (elmas 10, kuvars 7), sonra moleküler (buz 1,5, kuru buz 2), iyonik (potasyum iyodür 2, sofra tuzu 2,5, kalsiyum oksit 3,5), metalik (sodyum 0,5, magnezyum 2,5, alüminyum 2,75), en son grafit (1,5). Her grup küçük parantezle gösterilir.

Anlatım:
1. Üçüncü nitelik sertliktir; sayı büyüdükçe katı daha serttir.
2. En sert mineralin değeri 10 sayılır.
3. Elmasın sertliği 10, kuvarsınki 7'dir.
4. Öteki dokuz katının sertliği 3,5'i geçmez.
5. Moleküler katılar 1,5 ile 2 arasındadır.
6. İyonik katılar 2 ile 3,5 arasındadır.
7. Metalik katılar 0,5 ile 2,75 arasındadır.
8. Grafit de kovalent katıdır; sertliği 1,5'tir.

Soru (`tag: 'Sıra sende'`): Kovalent katılardan hangi ikisi ölçekte en yukarıdadır? **Elmas ve kuvars** / Elmas ve grafit / Kuvars ve grafit. Dayandığı anlatım: 3, 8. İpuçları: "Sertliği en büyük iki katıya bak." · "Grafitin değeri 1,5."

Sonra:
9. Çok sert katılar yalnızca kovalent katılar arasında çıktı.

### Sahne 8 · Her tür için genelleme

Tahta: dört sütunlu özet: "iyonik katı · moleküler katı · kovalent katı · metalik katı". Her sütun, öğrenci doğru genellemeyi seçtikçe dolar. Her sütunun başında o türün üç katısı küçük etiketle ("sofra tuzu, potasyum iyodür, kalsiyum oksit" gibi).

Anlatım:
1. Ölçümleri türlere göre toplayıp her tür için genelleme yapalım.

Sorular (`tag: 'Genelle'`; dört `c.choice`, her biri bir sütun):
- İyonik katı: **Erime noktası yüksek; elektriği iletmez** / Erime noktası düşük; elektriği iletmez / Erime noktası yüksek; elektriği iletir. Dayandığı anlatım: sahne 4, 6–7; sahne 6, 4.
- Moleküler katı: **Erime noktası düşük; yumuşak; elektriği iletmez** / Erime noktası yüksek; çok sert; elektriği iletmez / Erime noktası düşük; elektriği iletir. Dayandığı anlatım: sahne 4, 4–5; sahne 6, 5; sahne 7, 5.
- Metalik katı: **Elektriği iletir; erime noktası düşük de olur, yüksek de** / Elektriği iletmez; erime noktası çok yüksek / Elektriği iletir; erime noktası hep çok düşük. Dayandığı anlatım: sahne 5, 1–7; sahne 6, 2.
- Kovalent katı: **Erime noktası çok yüksek; çoğu çok sert ve yalıtkan** / Erime noktası düşük; yumuşak / Elektriği hep iletir. Dayandığı anlatım: sahne 4, 8–9; sahne 6, 6–8; sahne 7, 3, 8.

Geri bildirim (doğru seçimde, tek cümle): iyonik: "Üç iyonik katının ortak yanı budur." · moleküler: "İki moleküler katıda da aynı çıktı." · metalik: "Üçü de iletti; erime noktaları 98 ile 660 arasında." · kovalent: "Grafit hariç; o iletiyor ve yumuşak."

Soru (`tag: 'Sıra sende'`; farklı etkileşim): Sofra tuzu ile buz hangi nitelikte ayrılır? **Erime noktasında: tuzunki çok yüksek, buzunki çok düşük** / İletkenlikte: tuz iletir, buz iletmez / Hiç ayrılmazlar. Dayandığı anlatım: sahne 4, 4–7. İpuçları: "İkisi de yalıtkan; başka bir niteliğe bak." · "Erime noktası sütunu."

Gör: sütunlar dolu, her sütunun altına "aynı türden katılar benzer niteliklerdedir; farklı türler ayrılır" ince yazılır.

Sonra:
2. Aynı etkileşime sahip katılar benzer niteliklere sahiptir.
3. Farklı etkileşimli katıların nitelikleri ayrılır.

### Sahne 9 · Bilim insanlarının genellemesiyle karşılaştır

Tahta: iki sütunlu karşılaştırma tablosu, dört satır (dört tür). Sol sütun "ölçümlerden çıkan" (sahne 8'in sonucu), sağ sütun "bilim insanlarının genellemesi": iyonik: yüksek erime noktası, sert, kırılgan, yalıtkan · moleküler: düşük erime noktası, yumuşak, yalıtkan · kovalent: yüksek erime noktası, genellikle sert ve yalıtkan · metalik: düşük ya da yüksek erime noktası, yumuşak ya da sert, parlak, iletken. Eşleşen satırlara ✓ konur. "Kırılgan" ve "parlak" kelimeleri vurgulanır. Satırlar sırayla belirir; biten satır soluklaşır (tablo; 25 kelime sınırı tablo istisnasıyla aşılır).

Anlatım:
1. Bilim insanları da katıları bu dört türe ayırır.
2. Onların genellemesi, ölçümlerden çıkardığımızla aynı yöndedir.
3. İyonik katı: yüksek erime noktası, sert, kırılgan, yalıtkan.
4. Moleküler katı: düşük erime noktası, yumuşak, yalıtkan.
5. Kovalent katı: yüksek erime noktası, genellikle sert ve yalıtkan.
6. Metalik katı: erime noktası düşük ya da yüksek; iletken, parlak.
7. Kırılganlık ve parlaklık ölçtüğümüz üç nitelikte yoktu.
8. Grafit hem yumuşak hem iletken; bu yüzden "genellikle" denir.

Soru (`tag: 'Sıra sende'`): Genellemede olup ölçülen üç nitelikte olmayan hangisidir? **Kırılganlık** / Erime noktası / Elektrik iletkenliği. Dayandığı anlatım: sahne 4, 2; bu sahne, 3, 6–7. İpuçları: "Ölçülenler: erime noktası, iletkenlik, sertlik." · "Hangisinin ölçümü yoktu?"

Soru (`tag: 'Sıra sende'`): Kovalent katılar için genellemede neden "genellikle yalıtkan" denir? **Grafit elektriği iletir** / Elmas elektriği iletir / Kuvars elektriği iletir. Dayandığı anlatım: sahne 6, 6–8. İpuçları: "Hangisi iletkenlikte ötekilerden ayrıldı?" · "Elmas ve kuvars iletmiyordu."

Gör: kovalent satırında grafit işaretlenir; ✓ ile birlikte "genellikle" kelimesi vurgulanır.

Sonra:
9. Etkileşimi bilirsen katının niteliklerini önceden kestirirsin.

Defter ("Etkileşim ve katı"): **Etkileşim türü katının niteliklerini belirler.** Örnek: iyonik katı yüksek sıcaklıkta erir.

### Sahne 10 · Yeni katılarda dene

Tahta: dört kutu: "iyonik katı", "moleküler katı", "kovalent katı", "metalik katı". Yedi kart sırayla öne çıkar; her kartta katının adı ve tanecik bilgisi: kalsiyum florür (CaF₂: Ca²⁺ ve F⁻ iyonları), naftalin (moleküllerden oluşur), demir (Fe katyonları ve elektron denizi), katı iyot (I₂ molekülleri), magnezyum oksit (MgO: Mg²⁺ ve O²⁻ iyonları), çinko (Zn katyonları ve elektron denizi), elmas (kovalent bağlı karbon atomları).

Anlatım:
1. Tanecikleri bilirsen grubunu, grubundan da niteliklerini kestirirsin.

Dene (kart başına seçim, `sinifla`; her yerleştirmede kartın altına bir cümle düşer):
- Kalsiyum florür → iyonik katı. "Katyon ve anyon var; yüksek erime noktası, yalıtkan beklenir."
- Naftalin → moleküler katı. "Moleküller var; düşük erime noktası, yumuşak, yalıtkan beklenir."
- Demir → metalik katı. "Katyonlar ve elektron denizi var; iletir."
- Katı iyot → moleküler katı. "I₂ molekülleri var; düşük erime noktası beklenir."
- Magnezyum oksit → iyonik katı. "Katyon ve anyon var; yalıtkan, yüksek erime noktalı beklenir."
- Çinko → metalik katı. "Katyonlar ve elektron denizi var; iletir."
- Elmas → kovalent katı. "Kovalent bağlı atomlar; çok yüksek erime noktalı, çok sert."

Dayandığı anlatım: sahne 2, 2–6; sahne 3, 1–5; sahne 8 (genellemeler).

### Çıkış soruları

1. (yeni durum) Kovalent katılar genellikle yalıtkandır. Hangi katı bu genellemenin dışında kalır? **Grafit** / Elmas / Kuvars. (sahne 6)
2. (yanılgı) Buz ve sofra tuzu iki kristal katıdır; buz 0 °C'ta, sofra tuzu 801 °C'ta erir. Hangisi doğrudur? **Kristal olmak erime noktasını belirlemez; tanecikleri tutan etkileşim belirler** / İkisinin erime noktası da yüksektir çünkü ikisi kristaldir / Erime noktası düşük olan katı amorftur. (sahne 4)
3. (yeni durum) Bir X katısının erime noktası çok düşüktür; yumuşaktır ve elektriği iletmez. X hangi gruptadır? **Moleküler katı** / İyonik katı / Metalik katı. (sahne 8)
4. (yeni durum) Bir Y katısı elektriği iletmez, çok sert ve çok yüksek sıcaklıkta erir. Y hangi gruptadır? **Kovalent katı** / Moleküler katı / Metalik katı. (sahne 8)
5. (yeni durum) Potasyumun bir, kalsiyumun iki valans elektronu vardır; ikisi de metalik katıdır. Hangisinin erime noktasının yüksek olması beklenir? **Kalsiyum; iyon yükü ve serbest elektron sayısı büyük, bağ kuvvetli** / Potasyum; iyon yükü küçük / İkisinin erime noktası eşittir. (sahne 5)

Özet: Kristal katılar iyonik, moleküler, kovalent ve metalik olmak üzere dört gruba ayrılır. · Her grubun erime noktası, iletkenliği ve sertliği ayrı bir örüntü gösterir. · Metalik bağ kuvvetlendikçe erime noktası yükselir. · **Katının niteliklerini, taneciklerini tutan etkileşimin türü belirler.**

## H3 · Konu tekrarı: Katılar (`h3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (düzenli ve düzensiz büyüteç daireleri · dört tür ve etkileşim adları · erime noktası ekseninde dört tür · iletir ve iletmez satırı · sertlik ölçeği · grafit satırı) ve deftere düşer; biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Kristal katıda tanecikler düzenli, amorf katıda düzensiz dizilir.
3. Kristal katının belirli erime noktası vardır, amorf katınınki yoktur.
4. Kristal katılar iyonik, moleküler, kovalent ve metalik olarak dört gruptur.
5. Moleküler katının erime noktası düşüktür; iyonik ve kovalentinki yüksektir.
6. Metalik katılar elektriği iletir; öteki gruplar genellikle iletmez.
7. Grafit, kovalent katıların "genellikle yalıtkan" kuralının dışında kalır.

Sorular (`quiz`, karışık sırada):

1. Bir katının çiziminde tanecikler gelişigüzel dizilmiştir; belirli bir desen yoktur. Bu katı için hangisi doğrudur? **Amorf katıdır; belirli erime noktası yoktur** / Kristal katıdır; belirli erime noktası vardır / Kristal katıdır; belirli erime noktası yoktur. — H1
2. Hangisi amorf katıdır? **Lastik** / Kar tanesi / Kurşun kalem ucu. — H1
3. Çinko, Zn katyonları ve elektron denizinden oluşur. Çinko için hangisi beklenir? **Elektriği iletir** / Elektriği iletmez / Çok sert ve yalıtkandır. — H2
4. Magnezyum oksit Mg²⁺ ve O²⁻ iyonlarından oluşur. Hangi grup ve hangi etkileşim? **İyonik katı; iyonik bağ** / Moleküler katı; hidrojen bağı / Metalik katı; metalik bağ. — H2
5. Katı iyot, I₂ moleküllerinden oluşur. Hangi nitelikler beklenir? **Düşük erime noktası, yumuşak, yalıtkan** / Yüksek erime noktası, çok sert, yalıtkan / Elektriği iyi iletir. — H2
6. Elmas, grafit ve kuvarsın ortak yanı hangisidir? **Üçü de kovalent bağlı atomlardan oluşur** / Üçü de elektriği iletir / Üçünün sertliği aynıdır. — H2
7. Buz 0 °C'ta, sofra tuzu 801 °C'ta erir; ikisi de kristal katıdır. Fark nereden gelir? **Taneciklerini tutan etkileşim farklıdır** / Biri kristal, öteki amorftur / Biri katı, öteki değildir. — H2
8. Sodyum ile alüminyumun ikisi de metalik katıdır. Hangisinin erime noktası daha yüksektir? **Alüminyum; iyon yükü ve serbest elektron sayısı daha büyük** / Sodyum; iyon yükü daha küçük / İkisi aynıdır. — H2

Akılda kalıcı cümle: Dizilişe bakarak kristal ile amorfu, etkileşime bakarak kristal katının türünü ve niteliklerini bulursun.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.8) | Karşılığı |
|---|---|
| a) Aynı ya da farklı etkileşimlere sahip katılara ilişkin niteliklerin farkı | H2 sahne 4–7 (aynı türde ortak nitelik, farklı türde fark), sahne 8 (sofra tuzu–buz karşılaştırması ve "aynı etkileşim, benzer nitelik") |
| b) Etkileşimlerle katılar arasındaki ilişkiyi belirlemek için gözlem verileri ya da hazır veri seti | H2 sahne 4–7 (on bir kristal katının ölçümleri: erime noktası, iletkenlik, sertlik; bir malzeme laboratuvarının ölçümü olarak sunulur) |
| c) Çıkarımları bilim insanlarının çıkarımlarıyla karşılaştırma | H2 sahne 9 (öğrencinin genellemesi ile bilim insanlarınınki yan yana; ✓) |
| Uygulama: sofra tuzu, çelik kaşık, bilgisayar ekranı, kurşun kalem ucu, elmas, kar tanesi, cam | H1 sahne 2 (yedisi de anılır); sofra tuzu, cam (sahne 3), elmas, kurşun kalem ucu (sahne 5), kar tanesi (sahne 6) sınıflandırılır; çelik kaşık ve bilgisayar ekranı yalnızca anılır (`PLAN.md` karar 11) |
| Uygulama: kristal ve amorf katılara ilişkin tartışma | H1 sahne 3–6 (kristal–amorf ayrımı, belirli erime noktası, çizimden sınıflandırma). Sınıf içi tartışma `site dışı` |
| Uygulama: etkileşim türünün sertlik, erime noktası, iletkenlik niteliklerine etkisi | H2 sahne 4 (erime noktası), 5 (metalik katıda bağ kuvveti ve erime noktası), 6 (iletkenlik), 7 (sertlik) |
| Uygulama: hangi kristal katının ne tür niteliklere sahip olduğu; genelleme | H2 sahne 8 |
| Uygulama: farklı katı türlerinin genel özelliklerini açıklama | H2 sahne 8–10 |
| Uygulama: Türkiye'nin ilk endüstriyel boyutta kristal silisyum ingot külçesi; projeyi değerli kılan kristal özellikleri | H1 sahne 7 |
| Anahtar kavramlar: kristal katı, amorf katı | H1 sahne 3–4 |
| Anahtar kavramlar: iyonik katı, metalik katı, moleküler katı | H2 sahne 2–3 |
| Çerçeve: Katılar ve Özellikleri (Amorf ve Kristal Katılar) | H1; H2 |
| Köprü kurma: tuz gibi kristal katılar | H1 sahne 3 (giriş ekranı sorusu ve sofra tuzu), H2 giriş ekranı sorusu ve sahne 4 |
| Etkinlik kâğıdı ve dereceli puanlama anahtarı; öz değerlendirme | `site dışı` |

Fazla olan: (1) Kovalent katı (H2 sahne 3, 6, 7, 8, 9) ve elmas, grafit, kuvars: programın anahtar kavramlarında yok, kitap s. 162 dört tür sayar ve programın saydığı elmas ile kurşun kalem ucu bu türe girer (`PLAN.md` karar 11). (2) Kitaba göre amorf örnekler (lastik, plastik, mum, tereyağı; H1 sahne 4, 6): program yalnızca camı sayar; kitap s. 161 örnekleri verir ve camdan başka amorf katının sınıflandırmada bulunması için gerekli. (3) "Moleküller arası etkileşimler bağlardan zayıftır" ve "iyonik ve kovalent bağ güçlüdür" cümleleri (H2 sahne 4): kitap s. 147, 120, 128; erime noktasının etkileşimle ilişkisini açıklamak için gerekli, G ve B konularında geçer. (4) Metalik bağ kuvveti ile erime noktası arasındaki ilişki (H2 sahne 5): A2'nin kuralı (kitap s. 112) ile ölçümlerin birleşimi; kitap bu bağlantıyı H bölümünde yazmaz. (5) Sertlik ölçeğinin tanımı (H2 sahne 7): kitap s. 162 dipnotu. (6) Silisyum ingot külçesinde pazar payı cümlesi (H1 sahne 7): kitap s. 158, program "kısaca" der. Eksik olan: öğrencinin kendi önermesini yazması (`site dışı`; sitede seçenekli genelleme ve ✓ ile karşılaştırma vardır); gözlem verisi olarak "görsel, video" (sitede yalnızca ölçüm verisi var); sınıf içi tartışma (`site dışı`).
