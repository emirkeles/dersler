# Senaryolar — Konu E · Molekül polarlığı

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.5, `../PLAN.md` bölüm 3 (E1, E2), bölüm 7 (karar 6, 7, 14) ve bölüm 8 ("E · Polarlık"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (δ⁻ "delta eksi", δ⁺ "delta artı").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir iki parçalıysa 3–6. adımlar her parça için yinelenir.
- Renkler tema boyunca aynıdır: artı yük (çekirdek, δ⁺, artı kutup) turuncu, eksi yük (elektron, δ⁻, elektron yoğunluğu) mavi, çekme kuvveti yeşil, itme kuvveti kırmızı.
- Atom küreleri (uzay-dolgu gösterimi) nötr gri tonlarında çizilir, simgesi içinde durur. Kitaptaki element renkleri (oksijen kırmızı, flor yeşil, azot mavi) kullanılmaz: kırmızı itmeye, yeşil çekmeye, mavi eksi yüke ayrılmıştır. Renk yalnızca yük içindir.
- Dipol momentinin sayısı, birimi ve oku (vektör) hiçbir tahtada yoktur; yalnızca "sıfır" ve "sıfırdan farklı" yazar. Bağ açısı ve geometri adı ("doğrusal", "açısal", "piramit") yazılmaz; biçim uzay-dolgu modelinin kendisiyle gösterilir.
- Elektronegatiflik değerleri (kitaptan): H 2,20 · B 2,04 · C 2,55 · N 3,04 · O 3,44 · F 4,00 · P 2,19 · S 2,58 · Cl 3,16. Brom için kitapta değer yoktur; HBr bu yüzden kullanılmadı.

Çizim araçları (kit için; D konusunun Lewis ve uzay-dolgu çizicisiyle ortak olması gerekir):

- `lewis(molekül)`: sembol ve noktalar; bağ çifti ile ortaklanmamış çift ayrı gruplanır; merkez atomun etrafına halka konabilir; merkez atomun ortaklanmamış çiftleri kalın çerçeveyle vurgulanabilir.
- `uzayDolgu(molekül)`: örtüşen nötr gri küreler, simge içinde (H₂, F₂, N₂, O₂, HF, CH₄, NH₃, H₂O, CO₂, CCl₄, CF₄, BH₃, H₂S, NCl₃, PF₃). Kitabın s. 134 ve s. 136'daki modellerinin biçimi esas alınır (NH₃ ve H₂O'da atomlar aynı düzlemde değil, CO₂'de üç atom yan yana).
- `yukBulutu(molekül, yogunluk)`: uzay-dolgu modelinin üstüne yarı saydam mavi gölge (eksi yük yoğunluğu); polar molekülde bir tarafta koyu, öbür tarafta açık turuncu; apolarda her atom çevresinde eşit. Gölge şematiktir, sayı taşımaz.
- `halatCekme(gucA, gucB)`: iki figürün halatı çektiği küçük çizim; halatın ortası işareti güçlü tarafa kayar.
- `kutupEtiketi(atom, '+'|'-')`: δ⁺ turuncu, δ⁻ mavi.
- Kaydırıcı sahnesi için: iki atomlu bağ çizici (H–Y; Y = H, C, N, O, F); bulut Y'ye doğru kayar, kayma farkla orantılı.

## E1 · Elektronegatiflik farkı: elektronlar eşit paylaşılmaz

- **Fikir:** Bağ yapan iki atomun elektronegatifliği aynıysa ortak elektronlar eşit çekilir (apolar kovalent bağ); farklıysa elektronegatifliği büyük atomun çevresinde daha yoğun durur (polar kovalent bağ). Polarlığın birinci ölçütü bu farktır.
- **Giriş ekranı sorusu:** İki kişi bir halatı çekerken güçlü olan halatı kendine kaydırır; atomlar ortak elektronları hep eşit mi çeker?
- **Kaynak:** Ders kitabı s. 130 (apolar ve polar kovalent bağ; "fark arttıkça polarlık artar"; δ⁻ ve δ⁺; Görsel 2.10 ve 2.11; H₂, O₂, N₂, Cl₂ apolar; H₂O, HCl, NH₃ polar), s. 131 (Kontrol Noktası 2.3: H 2,20, N 3,04, O 3,44, F 4,00, Cl 3,16), s. 136 (H 2,20, C 2,55, N 3,04, O 3,44, F 4,00; tablo molekülleri H₂, F₂, N₂, O₂, HF, CH₄, NH₃, H₂O), s. 150 (kısmen eksi ve kısmen artı kutuplu yapı: kalıcı dipol), s. 84 (elektronegatiflik tanımı; halat çekme benzetmesi; S 2,58). Elektronegatiflik 1. temada anlatıldı (Etkileşim H4); tek cümleyle hatırlatılır, yeniden anlatılmaz.
- **Sınır:** Yalnızca elektronegatiflik farkının olup olmaması ve büyüdükçe polarlığın artması. Sayısal eşik ("şu değerden büyükse iyonik"), iyonik karakter yüzdesi, dipol momentinin hesabı yok. Ders bağa bakar; molekülün bütününün polar ya da apolar olduğu E2'dedir ve bu derste söylenmez. Polar bağlı molekül için "polar molekül" denmez.
- **Güç kavramlar ve gösterimi:** (1) "Eşit olmayan paylaşım": önce tanıdık durum (halat çekme), sonra atomların ortak elektron bulutu; bulutun kayması ve δ⁺, δ⁻ etiketleri. (2) "Fark": iki sayının farkı tahtada yazılır (3,16 − 2,20 = 0,96); bulutun kayma miktarı farkla birlikte büyür.
- **Hedeflenen yanılgı:** "Polar bağda elektronlar bütünüyle büyük atoma geçer" ve "Bağ yapan atomlar ortak elektronları hep eşit çeker."
- **Akılda kalıcı cümle:** Elektronegatifliği büyük olan atom, ortak elektronları kendine çeker.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Merkez atomdaki ortaklanmamış çift, bağ elektronlarına ne yapar? **İter** / Çeker / Etkilemez. (D3) Yanlışta: "Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür."
2. Kovalent bağda iki çekirdek, ortak elektronlara ne yapar? **İkisi de çeker** / Yalnızca biri çeker / İkisi de iter. (C2) Yanlışta: "İki çekirdek de ortak elektronları çeker; bağ budur."

Sonra: "Bugün bu çekişin her zaman eşit olup olmadığına bakacağız."

### Sahne 2 · Aynı atomlar: ortak elektronlar ortada

Tahta: solda küçük halat çekme çizimi: iki özdeş figür halatı eşit çekiyor, halatın işareti ortada duruyor. Sağda iki hidrojen atomu (H–H): iki turuncu çekirdek, aralarında iki mavi ortak elektron; her çekirdekten elektronlara eşit boyda yeşil çekme oku. Altta "H 2,20 | H 2,20". Cümleler ilerledikçe elektron bulutu iki çekirdeğin çevresinde eşit yoğunlukta belirir.

Anlatım:
1. Bir bağda iki atom, ortak elektronları halat çeker gibi çeker.
2. Bir atomun bağ elektronlarını çekme gücüne elektronegatiflik denir. (1. temadan hatırlatma)
3. Hidrojenin elektronegatifliği 2,20'dir.
4. İki hidrojen atomunun elektronegatifliği aynıdır.
5. Aynı elementin atomlarının elektronegatifliği hep aynıdır.
6. İkisi de ortak elektronları eşit kuvvetle çeker.
7. Elektronlar iki çekirdeğin çevresinde eşit zaman geçirir.
8. Yük dağılımı dengelidir; elektronlar bir tarafa yığılmaz.
9. Elektronegatifliği aynı atomların bağına apolar kovalent bağ denir.
10. H₂, N₂, O₂ ve Cl₂ moleküllerindeki bağlar böyledir.

Soru (`tag: 'Sıra sende'`; tahtada "O 3,44 | O 3,44" ve iki oksijen atomu): Oksijen molekülünde iki oksijen atomu ortak elektronları nasıl çeker? **Eşit kuvvetle** / Biri daha kuvvetle / Hiç çekmez. Dayandığı anlatım: 5–6. İpuçları: "İki atom da oksijen." · "Aynı elementin atomlarının elektronegatifliği aynıdır."

Sonra:
11. İki oksijen atomu eşit çeker; bağ apolardır.

### Sahne 3 · Farklı atomlar: elektronlar kayar

Tahta: hidrojen ve flor atomu yan yana (H–F). Altta "H 2,20 | F 4,00". Halat çizimi: sağdaki figür daha güçlü, halatın işareti ona doğru kayar. Hidrojenden elektrona ince, florden elektrona kalın yeşil çekme oku. Ortak elektron bulutu flora doğru kayar. Sonra flor üstünde mavi δ⁻, hidrojen üstünde turuncu δ⁺. Soluk bir yan panelde H₂ ile HF'nin Lewis yapıları ("1 ortak çift" etiketli), soru için.

Anlatım:
1. Şimdi hidrojen ile flor bağ yapsın: HF molekülü.
2. Florun elektronegatifliği 4,00; hidrojeninki 2,20.
3. Flor, ortak elektronları hidrojenden daha kuvvetle çeker.
4. Elektronlar florun çevresinde daha yoğun durur.
5. Elektronlar yine ortaktır; yalnızca flora daha yakındır.
6. Flor kısmen eksi yüklenir; gösterimi δ⁻.
7. Hidrojen kısmen artı yüklenir; gösterimi δ⁺.
8. Kalıcı artı ve eksi kutuplu bu yapıya dipol denir.
9. Elektronegatiflikleri farklı atomların bağına polar kovalent bağ denir.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada HCl (H–Cl), "H 2,20 | Cl 3,16", "Fark var → polar kovalent bağ" yazılı; ikinci adım boş: "Kısmen eksi (δ⁻) olan atom: ?". Kısmen eksi olan atom hangisi? **Klor** / Hidrojen / İkisi de. Dayandığı anlatım: 3–7. İpuçları: "Elektronları kim daha kuvvetle çekiyor?" · "Elektronegatifliği büyük olan atom δ⁻ olur."

Sonra:
10. Klor daha kuvvetle çeker: klor δ⁻, hidrojen δ⁺.

Soru (`tag: 'Sıra sende'`; yan paneldeki iki Lewis yapısı öne gelir, ikisinde de "1 ortak çift" ve iki atom): H₂ ve HF molekülünde de iki atom ve bir ortak elektron çifti var; ilkinde bağ apolar, ötekinde polar. Bağın polarlığını ne belirler? **Atomların elektronegatiflik farkı** / Ortak elektron çifti sayısı / Moleküldeki atom sayısı. Dayandığı anlatım: sahne 2, 5–9; bu sahne, 2–9. İpuçları: "İki molekülde de ortak çift ve atom sayısı aynı." · "İkisini ayıran, atomların çekme gücüdür."

Sonra:
11. Bağın polarlığını elektronegatiflik farkı belirler.
12. Fark yoksa bağ apolar, varsa polardır.

### Sahne 4 · Fark büyüdükçe polarlık artar

Tahta: iki bağ yan yana, H–Cl ve H–F. Altlarında fark: "3,16 − 2,20 = 0,96" ve "4,00 − 2,20 = 1,80". Her birinin üstünde elektron bulutu; HF'de bulut flora daha çok kaymış, δ işaretleri daha belirgin. Sonra N–H ve O–H için ikinci çift (soru).

Anlatım:
1. Klorun elektronegatifliği 3,16; HCl'de fark 0,96'dır.
2. HF'de fark 1,80'dir: HCl'dekinden büyük.
3. HF'de elektronlar flora, HCl'dekinden daha çok kayar.
4. Fark büyüdükçe bağın polarlığı artar.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada "H 2,20 | N 3,04 | O 3,44"): N–H bağı ile O–H bağından hangisi daha polardır? **O–H** / N–H / İkisi eşit. Dayandığı anlatım: 1–4. İpuçları: "Önce iki bağın farkını bul." · "Fark hangisinde daha büyük?"

Gör: iki bağ çizilir; N–H'de fark 0,84, O–H'de fark 1,24; O–H'nin bulutu daha çok kayar.

Sonra:
5. O–H'de fark 1,24, N–H'de 0,84: O–H daha polardır.

Dene (`c.slider`, "Y atomu": H, C, N, O, F beş adım; `noWait` yönerge: "Y atomunu değiştir; bulutun nereye kaydığına bak."): tahtada H–Y bağı, iki atomun elektronegatifliği, fark ve bulut. Y = H iken fark sıfır, bulut ortada, "apolar"; sonraki adımlarda fark 0,35 · 0,84 · 1,24 · 1,80, bulut Y'ye doğru kayar, δ işaretleri belirir, "polar" yazar. "Devam" ile biter.

Sonra:
6. Fark büyüdükçe bulut, elektronegatifliği büyük atoma kayar.

Defter ("Bağın polarlığı"): **Elektronegatiflik farkı yoksa bağ apolar, varsa polardır.** Örnek: H–H apolar, H–F polar.

### Sahne 5 · Sekiz bağı ayır

Tahta: üstte elektronegatiflik tablosu "H 2,20 · C 2,55 · N 3,04 · O 3,44 · F 4,00 · Cl 3,16". Altta sekiz kart: "H₂: H ve H", "F₂: F ve F", "N₂: N ve N", "O₂: O ve O", "HF: H ve F", "CH₄: C ve H", "NH₃: N ve H", "H₂O: O ve H". İki kutu: "apolar kovalent bağ", "polar kovalent bağ".

Anlatım:
1. Sekiz bağı elektronegatiflik farkına göre iki kutuya ayıralım.

Dene (`c.drag`, sınıflandırma; her yerleştirmede kartın altına bir cümle düşer):
- H₂, F₂, N₂, O₂ → apolar. Geri bildirim: "İki atom aynı elementin atomu; fark yok."
- HF → polar. "Hidrojen ile flor farklı; fark 1,80."
- CH₄ (C ve H) → polar. "Karbon 2,55, hidrojen 2,20; fark var."
- NH₃ (N ve H) → polar. "Azot 3,04, hidrojen 2,20; fark var."
- H₂O (O ve H) → polar. "Oksijen 3,44, hidrojen 2,20; fark var."

Dayandığı anlatım: sahne 2, 5; sahne 3, 11–12.

Sonra:
2. C–H bağı da polardır: karbon hidrojenden daha elektronegatiftir.
3. Polar bağda da elektronlar ortak kalır; yalnızca eşit paylaşılmaz.

### Çıkış soruları

1. Hangisi apolar kovalent bağdır? **Cl–Cl** / H–Cl / O–H. (sahne 2)
2. (yeni durum) Hidrojen (2,20) ile kükürt (2,58) bağ yapıyor. Hangi atom kısmen eksidir (δ⁻)? **Kükürt** / Hidrojen / İkisi de. (sahne 3)
3. (yeni durum) C–H, N–H ve O–H bağlarını polarlığı küçükten büyüğe sırala (H 2,20 · C 2,55 · N 3,04 · O 3,44). **C–H, N–H, O–H** / O–H, N–H, C–H / N–H, C–H, O–H. (sahne 4)
4. (yanılgı) H–F bağındaki ortak elektronlar için hangisi doğrudur? **Ortaktır ama flora daha yakındır** / Tamamen flora geçer, hidrojen elektronsuz kalır / İki atoma eşit uzaklıkta durur. (sahne 3)
5. (yeni durum) Azot molekülünde (N₂) bağın polarlığı için hangisi doğrudur? **Apolar; iki azot atomunun elektronegatifliği aynı** / Polar; azot elektronegatif bir atomdur / Polar; atomlar üç ortak çift kullanır. (sahne 2)

Özet: Aynı atomlar ortak elektronları eşit çeker: bağ apolar. · Fark varsa elektronlar büyük atoma kayar: bağ polar, δ⁺ ve δ⁻. · Fark büyüdükçe polarlık artar. · **Elektronegatifliği büyük olan atom, ortak elektronları kendine çeker.**

## E2 · Polar mı, apolar mı: molekülün bütününe bak

- **Fikir:** Bir molekülün polar ya da apolar olduğuna elektronegatiflik farkı ve merkez atomdaki ortaklanmamış elektron çifti birlikte karar verir; sonuç dipol momentiyle söylenir: sıfırsa apolar, sıfırdan farklıysa polar.
- **Giriş ekranı sorusu:** Bağlarının hepsi polar olan bir molekül, bütün olarak apolar olabilir mi?
- **Kaynak:** Ders kitabı s. 137 (ölçüt: merkez atomu üzerinde elektron çifti bulunan moleküllerde yük dağılımı dengede değildir, dipol momenti sıfırdan farklıdır; bulunmayan ve yük dağılımı dengede olan moleküllerde sıfırdır; dipol moment molekülün kutupsallığının ölçüsüdür; sıfırsa apolar, değilse polar; apolar kovalent bağlı element molekülü apolardır; elektronlar bir atomun çevresinde yoğunsa kalıcı kutuplar, molekül polar; H₂O'da merkez atomdaki çiftler bağ elektronlarını iter; Görsel 2.12), s. 136 (tablo molekülleri ve uzay-dolgu modelleri), s. 134 (merkez atom tanımı; CH₄, NH₃, H₂O, CO₂ Lewis yapıları ve uzay-dolgu modelleri), s. 132–133 (H₂, F₂, N₂, O₂, HF, CH₄, NH₃, H₂O, HCl, Cl₂, NCl₃ Lewis yapıları), s. 138 (alıştırma molekülleri), s. 130 (H₂O, HCl, NH₃ polar kovalent bağlı), s. 84 ve s. 142 (B 2,04; S 2,58; Cl 3,16). Merkez atomdaki ortaklanmamış çift ve elektron itmesi D3'te anlatıldı; tek cümleyle hatırlatılır.
- **İki atomlu moleküller:** Kitabın ölçütü (s. 137) merkez atomdan söz eder; iki atomlu molekülde merkez atom yoktur ve HF için ayrı bir cümle yoktur. Kitap iki durumu iki paragrafla anlatır: bağ apolarsa elektronlar eşit çekilir, yük dağılımı dengelidir, dipol momenti sıfırdır, molekül apolardır; elektronlar bir atomun çevresinde daha yoğunsa molekülün o tarafı kalıcı eksi, öbür tarafı kalıcı artı kutup olur, dipol momenti sıfırdan farklıdır, molekül polardır. Derste iki atomlu molekül bu iki paragrafa göre ele alınır: "bağın polarlığı molekülün polarlığıdır". Kitabın kendi cümlesi değil, iki paragrafın uygulamasıdır (raporda belirtildi).
- **Sınır:** Dipol momentinin hesabı, birimi, vektör toplama, molekül geometrisi adları ve bağ açıları yok. Merkez atomda ortaklanmamış çiftin yokluğu yük dağılımının dengede olmasının ölçütüdür; "neden dengede" için uzay-dolgu modelinin görünüşünden öte açıklama verilmez. Ölçütün yalnızca uçtaki atomları özdeş moleküllerde denendiği (kitabın listesindeki hepsi böyle) bilinir; uçtaki atomları farklı moleküller (örneğin CH₃Cl) kullanılmaz.
- **Güç kavramlar ve gösterimi:** (1) "Yük dağılımının dengesi": uzay-dolgu modelinin üstünde mavi eksi yük gölgesi; polarda bir tarafa yığılır, δ etiketleri belirir; apolarda her atom çevresinde eşit, etiket yok. (2) "Merkez atom ve ortaklanmamış çiftin yeri": merkez atom halkalanır, yalnızca onun çiftleri kalın çerçeveyle vurgulanır; uçtaki atomların çiftleri soluk kalır. (3) "Bağlar polar, molekül apolar": CH₄ ve CO₂'de aynı tahtada hem bağların elektronegatiflik farkı hem molekülün "dipol momenti sıfır" sonucu.
- **Hedeflenen yanılgı:** "Bağları polar olan molekül polardır" ve "Ortaklanmamış çift nerede olursa olsun molekülü polar yapar" (CO₂'de oksijenlerin çiftleri).
- **Akılda kalıcı cümle:** Dipol momenti olan molekül polardır, olmayan apolardır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Elektronegatifliği farklı iki atomun bağında ortak elektronlar nerede daha yoğundur? **Elektronegatifliği büyük atomun çevresinde** / Küçük atomun çevresinde / İki atomun ortasında eşit. (E1) Yanlışta: "Elektronegatifliği büyük atom ortak elektronları kendine çeker."
2. Merkez atomdaki ortaklanmamış çiftler bağ elektronlarını ne yapar? **İter** / Çeker / Etkilemez. (D3) Yanlışta: "Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür."

Sonra: "Bugün bu iki bilgiyi molekülün bütününe uygulayacağız."

### Sahne 2 · İki atomlu moleküller

Tahta: solda H₂, sağda HF; ikisi uzay-dolgu modeliyle, üstlerinde mavi yük gölgesi. H₂'de gölge iki atomda eşit, HF'de flor tarafında koyu; HF'de flor üstünde δ⁻, hidrojen üstünde δ⁺. Altlarında "dipol momenti" kutusu: H₂ için "sıfır", HF için "sıfırdan farklı" (sayı ve birim yok). Cümleler ilerledikçe önce H₂ tarafı, sonra HF tarafı belirir; biten taraf soluklaşır.

Anlatım:
1. Önce H₂ molekülüne bakalım: iki atomun elektronegatifliği aynı.
2. Ortak elektronlar eşit çekilir; yük dağılımı dengelidir.
3. Molekülde kalıcı artı ya da eksi kutup oluşmaz.
4. Molekülün kutupsallığının ölçüsüne dipol momenti denir.
5. H₂'de kalıcı kutup yoktur: dipol momenti sıfırdır.
6. HF'de elektronlar flor çevresinde daha yoğundur.
7. Flor ucu kalıcı eksi, hidrojen ucu kalıcı artı kutuptur.
8. HF'nin dipol momenti sıfırdan farklıdır.
9. Dipol momenti sıfırdan farklı molekül polar, sıfır olan apolardır.
10. İki atomlu moleküllerde bağın polarlığı, molekülün polarlığıdır.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada HCl, "Cl 3,16 | H 2,20", "Fark var: elektronlar klor çevresinde yoğun" yazılı; son adım boş: "Dipol momenti: ?". HCl molekülü için hangisi doğrudur? **Dipol momenti sıfırdan farklı; polar** / Dipol momenti sıfır; apolar / Dipol momenti sıfır; polar. Dayandığı anlatım: 6–10. İpuçları: "Elektronlar klor çevresinde yoğunsa kalıcı kutuplar oluşur." · "Kalıcı kutup varsa dipol momenti sıfır olamaz."

Sonra:
11. HCl'nin dipol momenti sıfırdan farklı: molekül polardır.

Soru (`tag: 'Sıra sende'`; tahtada O₂): Oksijen molekülü (O₂) polar mı, apolar mı? **Apolar; iki atom aynı, elektronlar eşit çekilir** / Polar; oksijen elektronegatif bir atomdur / Polar; molekül iki atomludur. Dayandığı anlatım: 1–5, 9–10. İpuçları: "İki atom da oksijen." · "Eşit çekilirse kalıcı kutup oluşmaz."

Sonra:
12. O₂'de kalıcı kutup yok: dipol momenti sıfır, molekül apolar.

### Sahne 3 · Merkez atom ve ortaklanmamış çift

Tahta: üç molekül yan yana, Lewis yapısı ve uzay-dolgu modeliyle: CH₄, NH₃, H₂O. Her birinde merkez atom (C, N, O) halkalanır. Altta üç satırlı tablo: "CH₄ | C | yok", "NH₃ | N | 1 çift", "H₂O | O | 2 çift" (ortaklanmamış çift sütunu). Merkez atomun çiftleri kalın çerçeveli.

Anlatım:
1. Üç ya da daha çok atomlu moleküllerde bir merkez atom vardır.
2. Merkez atom, öteki atomların bağlandığı atomdur.
3. CH₄'te merkez atom karbondur; ortaklanmamış çifti yoktur.
4. NH₃'te merkez atom azottur; bir ortaklanmamış çifti vardır.
5. H₂O'da merkez atom oksijendir; iki ortaklanmamış çifti vardır.
6. Merkez atomdaki ortaklanmamış çiftler, bağ elektronlarını iter.
7. Yük dağılımı dengede değildir; kalıcı kutuplar oluşur.
8. Su molekülünde oksijen ucu eksi, hidrojen uçları artıdır.
9. Dipol momenti sıfırdan farklıdır; su molekülü polardır.

Gör: H₂O'nun üstüne mavi gölge gelir; oksijen tarafında koyu, hidrojenlerde açık; oksijen üstünde δ⁻, hidrojenler üstünde δ⁺.

Sonra:
10. CH₄'te merkez atomda ortaklanmamış çift yoktur.
11. Yük dağılımı dengededir; dipol momenti sıfırdır.
12. CH₄ apolar bir moleküldür.

Gör: CH₄'ün dört hidrojeni karbonun çevresinde aynı yoğunlukta mavi gölgeyle kaplanır; hiçbir tarafta koyulaşma, etiket yok. Kenarda "C–H bağları polar" notu ve yanında "dipol momenti sıfır" birlikte durur.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloda CH₄ ve H₂O satırları sonuçlarıyla dolu; NH₃ satırında "merkez atom N · ortaklanmamış çift: 1" yazılı, son hücre "Yük dağılımı: ?". NH₃'te yük dağılımı nasıldır? **Dengede değil; dipol momenti sıfırdan farklı** / Dengede; dipol momenti sıfır / Dengede; dipol momenti sıfırdan farklı. Dayandığı anlatım: 4, 6–9. İpuçları: "Merkez atomda ortaklanmamış çift var." · "Çift bağ elektronlarını iter."

Sonra:
13. NH₃ polardır: azotta bir ortaklanmamış çift var.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada H₂S'nin Lewis yapısı, kükürt merkez atom, iki çifti vurgulu): H₂S'de merkez atom kükürttür ve iki ortaklanmamış çifti vardır. Molekül polar mı, apolar mı? **Polar; merkez atomda ortaklanmamış çift var** / Apolar; merkez atomda ortaklanmamış çift var / Apolar; hidrojenler aynı. Dayandığı anlatım: 6–9, 13. İpuçları: "Önce merkez atomun çiftine bak." · "Çiftli merkez atom yük dağılımını bozar."

Sonra:
14. H₂S'de de merkez atom çiftli: molekül polardır.

### Sahne 4 · İki ölçüt: tablodaki sekiz molekül

Tahta: akış şeması, adımlar sırayla belirir (biten adım soluklaşır):
- Adım 1: "Bağda fark yok → apolar".
- Adım 2: "Fark var, merkez atom yok (iki atomlu) → polar".
- Adım 3: "Fark var, merkez atomda çift yok → apolar".
- Adım 4: "Fark var, merkez atomda çift var → polar".
Altta sekiz kart (uzay-dolgu modeli ve formül): H₂, F₂, N₂, O₂, HF, CH₄, NH₃, H₂O. Elektronegatiflik tablosu köşede küçük: H 2,20 · C 2,55 · N 3,04 · O 3,44 · F 4,00.

Anlatım:
1. Bir molekülün polarlığına iki ölçüt birlikte karar verir.
2. Birinci ölçüt: bağda elektronegatiflik farkı var mı?
3. Fark yoksa elektronlar eşit çekilir; molekül apolardır.
4. İkinci ölçüt: merkez atomda ortaklanmamış çift var mı?
5. Fark varsa ve merkez atom yoksa molekül polardır.
6. Fark varsa, merkez atomda çift varsa molekül polardır.
7. Fark varsa ama merkez atomda çift yoksa molekül apolardır.

Dene (`c.drag`, ayrıştırma; dört kutu: "Fark yok" · "Fark var, merkez atom yok" · "Fark var, merkez atomda çift yok" · "Fark var, merkez atomda çift var"; kart yerleşince altına bir cümle düşer):
- H₂, F₂, N₂, O₂ → "Fark yok". "Aynı elementin atomları; elektronlar eşit çekilir."
- HF → "Fark var, merkez atom yok". "İki atomlu; merkez atom yok."
- CH₄ → "Fark var, merkez atomda çift yok". "Merkez karbonda ortaklanmamış çift yok."
- NH₃, H₂O → "Fark var, merkez atomda çift var". "Merkez atomda ortaklanmamış çift var."

Dayandığı anlatım: sahne 2, 1–10; sahne 3, 1–12; bu sahne, 1–7.

Sonra:
8. Ayrıştırma bitti: sekiz molekül dört kutuya dağıldı.

### Sahne 5 · Dipol momentine göre grupla, adlandır

Tahta: iki sütun: "Dipol momenti sıfır" ve "Dipol momenti sıfırdan farklı". Sekiz molekül kartı (formül ve küçük uzay-dolgu modeli, mavi gölgeli). Kartlar önceki sahnenin kutularından gelir.

Anlatım:
1. Sekiz molekülü dipol momentine göre iki gruba ayıralım.
2. Kalıcı kutbu olmayanların dipol momenti sıfırdır.
3. Kalıcı kutbu olanların dipol momenti sıfırdan farklıdır.

Dene (`c.drag`, gruplandırma; her kartta geri bildirim gerekçeyi söyler):
- H₂, F₂, N₂, O₂ → sıfır. "Bağ apolar; elektronlar eşit çekilir."
- CH₄ → sıfır. "Bağlar polar ama merkez atomda çift yok; yük dağılımı dengede."
- HF → sıfırdan farklı. "Elektronlar flora yığılır; kalıcı kutuplar var."
- NH₃, H₂O → sıfırdan farklı. "Merkez atomdaki çift yük dağılımını bozar."

Dayandığı anlatım: bu sahne, 1–3; sahne 4, 8.

Sonra:
4. Sıfır olanlar apolar, sıfırdan farklı olanlar polar moleküldür.

Tahtada iki sütunun başına "apolar molekül" ve "polar molekül" etiketleri gelir.

Defter ("Polar ve apolar molekül"): **Dipol momenti sıfır: apolar. Sıfırdan farklı: polar.** Örnek: CH₄ apolar, H₂O polar.

### Sahne 6 · Bağlar polar, molekül apolar

Tahta: CO₂: Lewis yapısı (O::C::O; her oksijende iki ortaklanmamış çift) ve uzay-dolgu modeli (üç atom yan yana). Köşede "C 2,55 | O 3,44". Merkez atom karbon halkalı; oksijenlerin çiftleri soluk, karbonun etrafı boş ve vurgulu. Gölge: karbonun iki yanında aynı yoğunlukta.

Anlatım:
1. CO₂'de karbon–oksijen bağları polardır; elektronegatiflikleri farklıdır.
2. Merkez atom karbondur; üzerinde ortaklanmamış çift yoktur.
3. Oksijenlerdeki çiftler merkez atomda olmadığı için sayılmaz.
4. Yük dağılımı dengededir; dipol momenti sıfırdır.
5. Bağlar polar olsa da CO₂ molekülü apolardır.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada CCl₄: karbon merkez, dört klor, kloraların çiftleri soluk, "C 2,55 | Cl 3,16"): CCl₄ molekülü polar mı, apolar mı? **Apolar; merkez karbonda ortaklanmamış çift yok** / Polar; C–Cl bağları polar / Polar; klor atomlarında ortaklanmamış çift var. Dayandığı anlatım: 1–5. İpuçları: "Ortaklanmamış çifti merkez atomda ara." · "Kloraların çiftleri merkezde değil."

Gör: CCl₄'ün dört klorunun çevresinde aynı yoğunlukta gölge; etiket yok; "dipol momenti sıfır".

Sonra:
6. Polar bağlı bir molekül yine de apolar olabilir.

### Sahne 7 · Yeni moleküllerde dene

Tahta: yedi kart; her kartta formül, Lewis yapısı ve uzay-dolgu modeli: CCl₄, NCl₃, CO₂, BH₃, H₂S, PF₃, CF₄. İki kutu: "apolar molekül", "polar molekül". Köşede küçük tablo: "B 2,04 · C 2,55 · N 3,04 · O 3,44 · F 4,00 · P 2,19 · S 2,58 · Cl 3,16 · H 2,20".

Anlatım:
1. Önce merkez atomu bul, sonra ortaklanmamış çiftine bak.

Dene (`c.drag`, sınıflandırma; kart yerleşince gerekçe yazar):
- CCl₄ → apolar. "Merkez karbonda çift yok."
- NCl₃ → polar. "Merkez azotta bir çift var."
- CO₂ → apolar. "Merkez karbonda çift yok; oksijenlerinki sayılmaz."
- BH₃ → apolar. "Merkez bordan çift yok."
- H₂S → polar. "Merkez kükürtte iki çift var."
- PF₃ → polar. "Merkez fosforda bir çift var."
- CF₄ → apolar. "Merkez karbonda çift yok."

Dayandığı anlatım: sahne 3, 6–12; sahne 4, 1–7; sahne 6, 2–5.

Sonra:
2. Merkez atomda çift varsa polar, yoksa apolar çıktı.

### Çıkış soruları

1. Hangi molekülün dipol momenti sıfırdır? **Cl₂** / HCl / NH₃. (sahne 2, 3)
2. (yanılgı, yeni durum) CF₄'te karbon–flor bağları polardır (C 2,55 · F 4,00); merkez karbonda ortaklanmamış çift yoktur. CF₄ için hangisi doğrudur? **Bağlar polardır ama molekül apolardır** / Bağlar polar olduğu için molekül polardır / Bağlar apolar olduğu için molekül apolardır. (sahne 3, 6)
3. (yeni durum; tahtada PF₃'ün Lewis yapısı) PF₃'ün merkez atomu fosfordur ve bir ortaklanmamış çifti vardır. Molekül için hangisi doğrudur? **Polar; merkez atomda ortaklanmamış çift var** / Apolar; merkez atomda ortaklanmamış çift var / Apolar; flor atomlarında ortaklanmamış çift var. (sahne 3)
4. (yeni durum; tahtada BH₃'ün Lewis yapısı: bor merkez, üç hidrojen, bor çevresinde ortaklanmamış çift yok) BH₃ molekülü için hangisi doğrudur? **Apolar; merkez atomda ortaklanmamış çift yok** / Polar; bor ile hidrojenin elektronegatifliği farklı / Polar; molekülde üç hidrojen var. (sahne 3, 6)
5. (yeni durum; tahtada NCl₃ ve CCl₄'ün Lewis yapıları) NCl₃ ve CCl₄ moleküllerinden hangisi polardır? **NCl₃** / CCl₄ / İkisi de. (sahne 3, 6, 7)

Özet: Dipol momenti molekülün kutupsallığının ölçüsüdür. · İki atomlu molekülde bağın polarlığı belirler. · Merkez atomda ortaklanmamış çift varsa molekül polar, yoksa apolardır. · **Dipol momenti olan molekül polardır, olmayan apolardır.**

## E3 · Konu tekrarı: Molekül polarlığı (`e3-tekrar.html`, 1 sahne + 9 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): sekiz kural tahtada sırayla toplanır, her biri küçük çizimiyle (halat ve bulut · H–F ve δ⁺, δ⁻ · iki atomlu molekül · merkez atom ve çift · dipol momenti kutusu) ve deftere düşer; biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Elektronegatiflik, atomun bağ elektronlarını çekme gücüdür.
3. Bağda fark yoksa apolar, varsa polar kovalent bağdır.
4. Fark büyüdükçe bağın polarlığı artar.
5. İki atomlu molekülde bağın polarlığı, molekülün polarlığıdır.
6. Merkez atomda ortaklanmamış çift varsa molekül polardır.
7. Merkez atomda çift yoksa yük dağılımı dengedir; molekül apolardır.
8. Dipol momenti sıfırsa molekül apolar, sıfırdan farklıysa polardır.

Sorular (`quiz`, karışık sırada):

1. Karbon (2,55) ile oksijen (3,44) bağ yapıyor. Hangi atom kısmen eksidir (δ⁻)? **Oksijen** / Karbon / İkisi de. — E1
2. Hangisi apolar kovalent bağdır? **F–F** / H–F / C–H. — E1
3. N–H, O–H ve F–H bağlarını polarlığı küçükten büyüğe sırala (H 2,20 · N 3,04 · O 3,44 · F 4,00). **N–H, O–H, F–H** / F–H, O–H, N–H / O–H, N–H, F–H. — E1
4. F₂, HF ve N₂ moleküllerinden hangisinin dipol momenti sıfırdan farklıdır? **HF** / F₂ / N₂. — E2
5. (tahtada CCl₄'ün Lewis yapısı) CCl₄ polar mı, apolar mı? **Apolar; merkez atomda ortaklanmamış çift yok** / Polar; C–Cl bağları polar / Polar; klor atomlarında ortaklanmamış çift var. — E2
6. (tahtada H₂S'nin Lewis yapısı: kükürt merkez, iki çift; H 2,20 · S 2,58) H₂S için hangisi doğrudur? **Polar; merkez atomda ortaklanmamış çift var** / Apolar; merkez atomda ortaklanmamış çift var / Apolar; hidrojenler aynı. — E2
7. (tahtada CO₂'nin Lewis yapısı) CO₂'de oksijenlerde ortaklanmamış çift vardır ve karbon–oksijen bağları polardır. Molekül için hangisi doğrudur? **Apolar; merkez karbonda ortaklanmamış çift yok** / Polar; oksijenlerde ortaklanmamış çift var / Polar; bağlar polar. — E2
8. Bağlarının hepsi polar olan bir molekül, bütün olarak apolar olabilir mi? **Olabilir; merkez atomda ortaklanmamış çift yoksa** / Olamaz; polar bağlar molekülü polar yapar / Yalnızca iki atomlu moleküllerde olabilir. — E2
9. H₂O ve CO₂ moleküllerinin ikisinde de polar bağlar vardır; H₂O polar, CO₂ apolardır. Fark nereden gelir? **H₂O'nun merkez atomunda ortaklanmamış çift vardır, CO₂'nin yoktur** / CO₂'de daha çok atom vardır / H₂O'daki bağlar CO₂'dekinden uzundur. — E2

Akılda kalıcı cümle: Bağ polar olabilir; molekülün polarlığına merkez atomdaki ortaklanmamış çift de karar verir.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.5) | Karşılığı |
|---|---|
| a) Polarlığı belirlemek için ölçütler oluşturur: elektronegatiflik farkı | E1 sahne 3 (ölçüt sorusu), sahne 4; E2 sahne 4 (birinci ölçüt) |
| a) … ölçüt: merkez atomdaki ortaklanmamış elektron çifti | E2 sahne 3, sahne 4 (ikinci ölçüt) |
| b) Elektronegatiflik farkının ve elektron çifti itmesinin etkisiyle oluşan molekül yapılarını ayrıştırır | E2 sahne 4 (dört kutuya ayrıştırma), sahne 3 |
| c) Molekülleri dipol momentine göre gruplandırır | E2 sahne 5 |
| ç) Molekülleri polar ya da apolar olarak adlandırır | E2 sahne 5 (adlandırma ve defter), sahne 7 |
| Uygulama: ad, formül, Lewis yapısı, uzay-dolgu gösterimi ve elektronegatiflik değerleri tablosu | E1 sahne 5 (elektronegatiflik tablosu ve bağ kartları); E2 sahne 3–4 (Lewis yapısı ve uzay-dolgu modeli; elektronegatiflik tablosu köşede). Tablonun tek bir ekranda dökümü ayrı sahne olmadı |
| Uygulama: öğrenciler ölçütleri kendileri oluşturur | E1 sahne 3 (ölçüt sorusu: seçenekli), E2 sahne 4 (ayrıştırma); öğrencinin ölçütü yazması `site dışı` |
| Uygulama: uzay-dolgu modelleri verilen moleküller iki ölçüte göre ayrıştırılır | E2 sahne 4 |
| Uygulama: moleküller dipol momentine göre polar ya da apolar gruplandırılır | E2 sahne 5 |
| Uygulama: her molekül için polar ya da apolar gerekçesi | E2 sahne 4, 5, 6, 7 (her kartın geri bildirimi gerekçeyi söyler); çıkış soruları |
| Uygulama: çalışma yaprağındaki farklı element ve bileşiklerin sınıflandırılması ve gerekçelendirilmesi | E2 sahne 7 (CCl₄, NCl₃, CO₂, BH₃, H₂S, PF₃, CF₄); E3 |
| Anahtar kavramlar: polar kovalent, apolar kovalent, dipol | E1 sahne 2–3 |
| Anahtar kavramlar: polar molekül, apolar molekül, dipol moment | E2 sahne 2, 5 |

Fazla olan: (1) Halat çekme çizimi (E1): kitap s. 84'ün benzetmesi; yalnızca gösterim, ayrı bilgi değil. (2) "Fark büyüdükçe bağın polarlığı artar" ve bağların fark hesabıyla kıyaslanması (E1 sahne 4): kitap s. 130'da var, programın ölçütü yalnızca farkın varlığıdır; kıyas eşiksizdir ve ölçüte ek bilgi değildir, ama programda anılmaz. (3) δ⁺ ve δ⁻ gösterimi (E1): programda anılmaz; `PLAN.md` karar 7 ve kitap s. 130, 150 dayanağıdır. (4) CO₂ ve çok bağlı moleküller (E2): `PLAN.md` karar 6. Eksik olan: öğrencinin kendi ölçütünü ve gerekçesini yazması (`site dışı`: sitede seçenekli gerekçe vardır). Kitabın s. 137'deki kenar sorusu ("Apolar kovalent bağ içeren polar yapılı molekül olabilir mi?") derse alınmadı (rapora bakın).
