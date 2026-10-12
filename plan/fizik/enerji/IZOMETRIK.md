# Enerji temasında izometrik figürler: plan

12 Ekim 2026'da yazıldı. Bu dosya tek başına yeter. Tema henüz işleme alınmadı; bu plan `../../ISLEME.md` adımlarının yerine geçmez, onlara eklenen figür işini tanımlar. Tema işleme alınınca `PLAN.md` bölüm 6, soru 14 bu dosyaya bakar.

## 1. Amaç

Enerji teması yalnızca ısıyla ilgilenir ve deney ağırlıklıdır (`PLAN.md` bölüm 1): dört çıktıda öğrenci düzenek kurar, ölçer, veriden kurala gider. Sitede deneyin yerini benzetim tutar. Bu benzetimlerin düzenekleri, Anatomy skill'iyle (`~/.claude/skills/anatomy/`, MIT) izometrik, çok parçalı, gerçek bir laboratuvar aleti olarak çizilir; öğrenci alete bakınca ne ölçüldüğünü tanır. Figür süs değildir (`../../KURALLAR.md` 3.3, 5): her figürde hareket eden şey, dersin kuralıdır.

## 2. Dayanak: Akışkanlar pilotları

İki pilot 12 Ekim 2026'da yapıldı ve depoda (`030c424`): `fizik/akiskanlar/pilot/torricelli/`, `fizik/akiskanlar/pilot/kaldirma-kuvveti/` (ayrıntı o klasördeki `PLAN.md`, bölüm 12). Enerji bu yolu izler; yeniden keşfedilmez.

Kanıtlanan bağ:

- `build.mjs` (Node, skill'in kiti) iki şey üretir: tek başına sayfa (skill'in denetimleri için) ve `dersler/<ad>-sekil.js` (ders motoru için, `window.<AD>`).
- Modülün arayüzü: `kur(c, svg, { x, y, h })` tahtaya yerleştirir; `poz(...)` düzeneği bir duruma getirir; `nokta(ad)` bir parçanın tahtadaki yerini verir (etiket ve ölçü çizgisi buraya bağlanır); `bak(kutu)` ve `kadraj` yakınlaşma; `sabit` modelin sayıları.
- Figür kendi başına hareket etmez: `requestAnimationFrame`, CSS animasyonu ve boşta tur yoktur. Her hareket `c.tween` ya da sürgüyle `poz` çağrılarak verilir (`ortak/API.md`).
- Tonlar tahtanın rengine çekilir (`--anatomy-*` değişkenleri `--board` üstüne); kart, gölge bulanıklığı ve 12 pikselin altında kalan kazınmış yazı çıkarılır.
- Yazı, sayı ve ölçü çizgisi figürün içinde değil, dersin kendi düz SVG katmanındadır.
- `olc.js` iki pilotta 1366×657 ve 750×402'de temiz çıktı.

Ölçülen maliyet: Arşimet düzeneği (60 katı) plandan denetime yaklaşık bir saat sürdü; üretilen modüller 110 KB (Torricelli) ve 277 KB (Arşimet).

Doğrulanmayanlar: Akışkanlar'da C2 ve D2'nin düz vektörle yazılması kararının (karar 20) gerekçesi dosyalarda yazılı değil (`plan/fizik/akiskanlar/PLAN.md` ve `DURUM.md` içinde arandı). Modül boyutunun ne kadarının kit kodu, ne kadarının yol verisi olduğu ölçülmedi.

## 3. Figürler

Altı figür, 15 kısa dersin 13'ünü karşılar. Düzenekler ders kitabıyla karşılaştırıldı (12 Ekim 2026; `PLAN.md` bölüm 8, kararlar 14, 15, 17, 18); "Kitap" sütunu dayanağı gösterir. Kitap dışı düzenek yalnızca kitabın saydığı değişkenleri gösterecek kadar kurulur.

| # | Figür | Dersler | Hareket eden ve anlamı | Kitap | Boyut |
|---|---|---|---|---|---|
| Ş1 | Üç ölçekli termometre: tek hazne ve sütun, yanında Celsius, Fahrenheit, Kelvin cetvelleri | B1 | Sütun yükselir; üç cetvelde üç ayrı sayı okunur. Sabit noktalar: 0 °C, 32 °F, 273 K ve 100 °C, 212 °F, 373 K | s. 218 (ölçekler); düzenek kitap dışı | Figür |
| Ş2 | İkiz ısıtma düzeneği: iki özdeş istasyon; her birinde üçayak, tel tabla, hortumlu gaz ocağı, beher, statifte termometre; ortada süreölçer | B2, B3, B4, C1, C2, C3 | Süre ilerler, iki termometre ayrı hızla yükselir (kütle, madde, ısıtıcı); buzlu beherde buz bitene kadar termometre durur. Alev düz tonlarla, parlamasız | Görsel 4.10–4.11 (s. 219); s. 224–225 ölçümleri; s. 227 araç gereci | Hero |
| Ş3 | Isıl denge düzeneği: su dolu beherin içinde sıcak su dolu erlenmayer, ikisinde birer termometre | D1, D2 | İki sütun birbirine yaklaşır ve aynı çizgide durur; nerede durduğu kütleye, maddeye ve ilk sıcaklıklara bağlı | s. 237 (60 °C erlenmayer beherin içinde) | Figür |
| Ş4 | Kesit oda: soba, zemine yakın kalorifer peteği, pencere, tavanda ve tabanda birer termometre | E1, E2 | Tavan ve taban termometreleri ayrışır; pencere açılır; oda havasız bırakılınca petek ısıtmaz, elektrikli ısıtıcı ısıtır | s. 244–245 (ev kesiti, petek ve ısıtıcının zemine yakın konması); oda düzeni kitap dışı | Hero |
| Ş5 | Isı iletim düzeneği: bir ucu sıcak su kabında duran, öteki ucunda termometre olan çubuklar; çubuğun cinsi, kalınlığı, kesiti ve suyun sıcaklığı değişir | F1 | Uçtaki termometreler ayrı hızla yükselir: dört etmenin her biri bir sahne | Etmenler s. 250, katsayılar Tablo 4.2; düzenek kitap dışı (karar 18) | Figür |
| Ş6 | Duvar kesiti (katmanlar, iç ve dış termometre) ve çift cam kesiti | F2 | Yalıtım katmanı takılır ve çıkarılır; iç termometrenin değişme hızı düşer; kışın ve yazın yön değişir | Görsel 4.21 (s. 250), çift cam (s. 252). Termos kesiti yok (karar 18) | Figür |

Figür kullanılmayan yerler, düz vektörle kalır:

- A1, A2: kavram ayrımı ve sınıflama tablosu; ortada bir alet yok.
- C2 ve C3'teki sıcaklık–ısı grafiği, bütün tablolar, formüller: ölçülen ve sayı taşıyan çizim düzdür (`KURALLAR.md` 5.1). Grafik, figürün yanında aynı modelden çizilir.
- E1'deki Güneş ve Dünya; hava akımını gösteren oklar (figürün üstüne dersin katmanında).
- Çıkış soruları ve konu tekrarı dersleri figürü yalnızca hazır pozuyla kullanır; yeni figür istemez.

Ş5: program "ısı iletim maşası" diyor; kitap bu düzeneği çizmiyor ve adını anmıyor. Figür, mum ya da raptiye yerine uçtaki termometreyle okunur: kitabın dört etmeni de aynı düzenekte değiştirilebilsin diye.

## 4. Projeye uyum

Skill'in kurallarıyla projenin kuralları çeliştiğinde proje kazanır; skill'in zanaat kuralları (katı parçalar, ton sırası, boyama sırası, her çizgi bir şeyin üstünde biter) olduğu gibi kalır.

| Skill | Bu temada |
|---|---|
| Kart, başlık, canlı gösterge | Yok; gösterge dersin panelinde ve tahtada düz yazıyla |
| Boşta tur, işaretçiyle sürükleme, kendi döngüsü | Yok; `c.tween`, `c.slider`, `c.choice` |
| WebGL (alev, su, buhar) | Yok. Isıtıcı kitabın çizdiği gaz ocağıdır; alev düz tonlarla çizilir, degrade ve parlama kullanılmaz (`ortak/API.md`) |
| 3D kipi | Yok |
| Açık ve koyu tema | Tek başına sayfa iki temada (skill'in denetimi bunu ister); ders modülü yalnızca tahta tonlarında |
| Tek renk, tek `lit` parça | Figür tek tonludur; renk yalnızca konunun kendisi olan üç şeydedir ve temanın renk rollerinden gelir (Ş2 tahtada görüldükten sonra, 12 Ekim 2026): termometre sütunu sarı, su mavi tonlu, alev ve ısı kaynağının kızgın yüzeyi turuncu (`.ip-isi`). Tek başına sayfada skill'in tonları kalır |
| Çizimde yazı yok | Kalır; etiketler `nokta(ad)` ile figüre bağlanan düz SVG yazısıdır, en az 22 tahta birimi |

Termometre ölçeği düşey eksendedir; izometrik görünüşte düşey uzunluk bozulmaz, sütun boyu sıcaklıkla doğru orantılı okunur. Sayı yine de düz yazıyla yanında verilir.

## 5. Dosya düzeni

```
plan/fizik/enerji/sekil/
  kit/                    iso-kit.mjs, lathe.mjs, tube.mjs, audit.mjs, LICENSE (tek kopya, altı figür ortak)
  parcalar.mjs            ortak parçalar: termometre, beher, ısıtıcı, statif, taban plakası
  s2-isitma/              model.mjs, model-sina.mjs, build.mjs, ciz.js, üretilmiş sayfalar
  s5-iletim/ …
fizik/enerji/dersler/
  isitma-sekil.js         ÜRETİLMİŞ; window.ISITMA
  iletim-sekil.js …
```

Kaynak `plan/` altında durur (yalnızca geliştirme), siteye yalnızca üretilmiş modül girer. Pilotta kaynak tema klasöründeydi; burada ayrıldı. Kit `ortak/` altına alınmaz ve Akışkanlar'daki kopyadan yüklenmez (`KURALLAR.md` 7); `TASKS.md` içindeki "kit `ortak/` altına mı" sorusu kullanıcıda açık, karar değişirse yalnızca içe aktarma yolu değişir.

Ortak parçalar tek yerde yazılır: termometre dört figürde, beher üç figürde geçer. Bir temada aynı aletin iki ayrı çizimi olmaz.

## 6. İş sırası

Figür işi `ISLEME.md` adımlarına şöyle oturur:

1. **2b Ders kitabı.** Öteki içerikle birlikte her düzeneğin kitaptaki çizimi ve sayıları alınır, `PLAN.md` içine sayfa numarasıyla yazılır: ısıtma deneyi, hâl değişimi deneyi, ısıl denge deneyi, ısı iletim düzeneği, öz ısı ve iletim katsayısı tabloları. Kitapta olmayan ölçü örnek veridir ve modelden hesaplanır.
2. **3 Kararlar.** `PLAN.md` bölüm 7'ye figür kararı yazılır: altı figür (bölüm 8), ısıtıcının türü, renk rolleri.
3. **4 Senaryolar.** Figür kullanan sahne "Figür:" satırıyla işaretlenir: hangi figür, hangi poz, hangi kadraj, üstüne hangi etiket. Senaryo yazarı figürün arayüzünü bu dosyadan ve figürün `model.mjs` dosyasından okur.
4. **5 İskelet, figürler.** Sıra: Ş2 (altı ders, ortak parçaları kurar) → Ş5 → Ş1 → Ş3 → Ş6 → Ş4. Her figür skill'in iş akışıyla (SKILL.md 1–10), ayrı ve temiz bağlamlı bir oturumda ya da alt ajanda yapılır (kullanıcı 12 Ekim 2026'da bu tema için bağlam bütçesi sınırını kaldırdı: iş tek oturumda, alt ajanlarla sürer); okuma listesi `fizik/akiskanlar/pilot/kaldirma-kuvveti/PLAN.md` bölüm 2'deki gibidir. Ş2 bitmeden öteki figürlere başlanmaz. Figürler ana oturumun modeliyle yapılır; pilotlar da öyle yapıldı ve iş, Sonnet'e verilen ders yazımından farklı (bu bir yorum; `YURUTME.md` yalnızca yazım ve sayımı ayırıyor).
5. **6 Dersler.** Dersi yazan ajan `*-sekil.js` dosyasını **okumaz** (110–277 KB; `YURUTME.md` bağlam bütçesi). Arayüz, poz adları, nokta adları ve kadraj kutuları temanın `gorev/ders-gorevi.md` kopyasına yazılır. Ders sayfası modülü ders dosyasından önce yükler.
6. **7 Denetim.** Aşağıdaki ölçütler.

Süre tahmini (skill'in ölçeği ve pilot): Ş2 2–3 saat, Ş4 2–4 saat, öteki dördü birer saat dolayı; toplam 8–11 saat figür işi. Ders yazımı bunun dışındadır.

## 6b. Arayüz sözleşmesi

12 Ekim 2026. Figürler ile senaryolar aynı anda yazılabilsin diye arayüz önceden sabitlendi: figürü yapan bunu uygular, senaryo ve ders yazan buna göre yazar. Figür yalnızca **gösterir**: fizik sayıları (hangi sürede kaç derece) senaryodadır, ders figürün ayarlarını `c.tween` içinde çağırarak hareketi verir. Figürde yazı ve rakam yoktur; etiket, sayı ve ok dersin düz SVG katmanındadır ve `nokta(ad)` ile figüre bağlanır.

Ortak: `const f = <AD>.kur(c, svg, { x, y, h })` figürü tahtaya (1000 × 562) sol üst köşesi `x, y`, yüksekliği `h` olacak biçimde yerleştirir; genişlik `h × <AD>.oran` olur. `f.el` kök `<g>` öğesi (saydamlık buradan verilir). `f.nokta(ad)` → `[x, y]` tahta birimiyle, figürün o anki durumuna göre. `f.bak(kutu)` figürün bir bölgesine yaklaşır; hazır kutular `<AD>.kadraj.{tum, …}`; arası `c.tween` ile yumuşatılır. Ayar çağrıları anında uygulanır, eksik alan değişmez; figür kendi başına hareket etmez. Sıcaklık ayarı termometre sütununun boyudur ve doğrusaldır; ölçek Ş1, Ş2 ve Ş3'te –20 … 120 °C, küçük termometreli figürlerde dardır (Ş4 0 … 50, Ş5 0 … 100, Ş6 –10 … 50 °C; kesin aralık modülün `sabit` alanında ve baş yorumunda). Ortak ekler (Ş2'den): `f.gorunur(ad)` nokta şu anki kadrajın içinde mi; `f.durum(...)` o anki ayarlar. Tahtadaki etiketler en az 24 birimdir (22 birim telefonda 12 px'in altında kalıyor). Bir modülün baş yorumu bu tabloyla çelişirse baş yorum geçerlidir: figürü yapan, uygulayamadığı yeri orada yazar.

| Figür | Modül, dosya, oran (en / boy) | Ayarlar | Noktalar ve kadraj |
|---|---|---|---|
| Ş1 | `TERMO`, `dersler/termometre-sekil.js`, 0,75 | `f.sicaklik(C)`; `f.goster({ c, f, k })` üç cetveli ayrı ayrı açar ya da gizler (0…1 saydamlık) | `f.nokta('sutun')` sütunun tepesi; `f.olcek('c' veya 'f' veya 'k', deger)` o cetvelde verilen değerin yeri; değer çentik olmak zorunda değildir, cetvelin aralığındaki her sayı doğrusal olarak yerleşir (cetvel aralıkları: °C –20…120, çentik 10'da bir; °F 0…240, çentik 20'de bir; K 250…390, çentik 10'da bir). Üç cetvel aynı sütuna göre hizalıdır: 0 °C, 32 °F ve 273 K aynı yüksekliktedir; 100 °C, 212 °F ve 373 K da öyle. Kadraj: `tum`, `hazne`, `ust` |
| Ş2 | `ISITMA`, `dersler/isitma-sekil.js`, 1,45 | İstasyon `'sol'` ve `'sag'`. `f.ayar(ist, { icerik: 'su' veya 'yag' veya 'buz' veya 'mum' veya 'blok' veya 'bos', seviye: 0…1, sicaklik: C, alev: 0 veya 1 veya 2, kati: 0…1, kaynama: 0…1, faz: 0…1 })`. `seviye` kabın doluluğu (blokta bloğun boyu); `alev` 0 kapalı, 1 kısık, 2 açık; `kati` erimemiş buz ya da mum oranı (1 hepsi katı, 0 hepsi sıvı; `'buz'` ve `kati: 0` görünüşü `'su'` ile aynıdır); `kaynama` sıvıda yükselen kabarcıkların yoğunluğu, `faz` kabarcıkların yükselme evresi (0 → 1 bir döngü; ders döngüyle ilerletir). Buhar çizilmez. `f.goster(ist, 0…1)` istasyonu gizler ya da açar. `f.sure(sn)` süreölçerin ibresi (bir tur 60 sn) | `'sol.termometre'`, `'sag.termometre'` sütun tepesi; `'sol.kap'`, `'sag.kap'` kabın üst kenarının ortası; `'sol.etiket'`, `'sag.etiket'` istasyonun altı; `'sol.alev'`, `'sag.alev'`; `'sureolcer'`. Kadraj: `tum`, `sol`, `sag`, `kaplar` |
| Ş3 | `DENGE`, `dersler/denge-sekil.js`, 0,9 | `f.ayar({ ic: C, dis: C, icSeviye: 0…1, disSeviye: 0…1, icIcerik: 'su' veya 'yag', disIcerik: 'su' veya 'yag', icte: 0…1 })`. `ic` erlenmayerdeki, `dis` beherdeki termometre; `icte` erlenmayerin konumu (0 beherin yanında tezgâhta, 1 beherin içinde) | `'ic.termometre'`, `'dis.termometre'`, `'ic.etiket'`, `'dis.etiket'`, `'temas'` (erlenmayer ile suyun değdiği yer). Kadraj: `tum`, `kaplar` |
| Ş4 | `ODA`, `dersler/oda-sekil.js`, 1,3 | `f.ayar({ soba: 0 veya 1, petek: 0 veya 1, isitici: 0 veya 1, pencere: 0…1, tavan: C, taban: C, hava: 0…1, termometre: 0…1 })`. `soba`, `petek`, `isitici` çalışıyor mu; `pencere` açıklık (pencere sağ arka duvardadır; dışarısı o duvarın ötesidir); `tavan`, `taban` iki termometre; `termometre` bu iki termometrenin görünürlüğü (havasız odada 0); `hava` 1 havalı oda, 0 havası boşaltılmış (ton değişir) | `'soba'`, `'petek'`, `'isitici'`, `'pencere.ust'`, `'pencere.alt'`, `'tavan.termometre'`, `'taban.termometre'`, `'el'` (ısıtıcının karşısındaki ölçüm yeri). `f.yol('dongu' veya 'petekDongu' veya 'pencereUst' veya 'pencereAlt' veya 'isima')` hava akımı ve ışıma oklarının izleyeceği tahta noktaları dizisi, akış yönünde sıralı: `dongu` sobanın üstünden yükselir, tavan boyunca gider, karşı duvardan iner, taban boyunca sobaya döner (kapalı döngü; ilk yarısı yükselen kol); `petekDongu` aynısı petek için; `pencereUst` içeriden dışarıya (pencerenin üst yarısından), `pencereAlt` dışarıdan içeriye (alt yarısından); `isima` elektrikli ısıtıcıdan `'el'` noktasına düz yol. Kadraj: `tum`, `soba`, `pencere` |
| Ş5 | `ILETIM`, `dersler/iletim-sekil.js`, 1,4 | Üç çubuk yuvası `0, 1, 2`. `f.cubuk(i, { cins: 'aluminyum' veya 'demir' veya 'cam' veya 'tahta' (kitabın ısı iletim katsayısı tablosundaki maddeler; bakır tabloda yok), boy: 1 veya 2, kesit: 1 veya 2, uc: C, gorunur: 0…1 })`. `boy` ısının geçtiği kalınlık, `kesit` yüzey alanı, `uc` çubuğun serbest ucundaki termometre. `f.su(C)` sıcak su kabının termometresi | `'cubuk0.uc'`, `'cubuk0.orta'`, `'cubuk0.etiket'` (1 ve 2 için de), `'su.termometre'`, `'su.etiket'`. Kadraj: `tum`, `uclar` |
| Ş6 | `DUVAR`, `dersler/duvar-sekil.js`, 1,1 | `f.ayar({ yalitim: 0…1, cam: 1 veya 2, ic: C, dis: C })`. `yalitim` yalıtım katmanının takılı olma oranı (0 çıkarılmış ve yanda duruyor, 1 duvarda); `cam` pencerede tek ya da çift cam; `ic`, `dis` iki yandaki termometreler | `'ic.termometre'`, `'dis.termometre'`, `'duvar.ic'`, `'duvar.dis'` (yüzeylerin ortası), `'yalitim'`, `'cam'`, `'kalinlik.a'`, `'kalinlik.b'` (duvar kalınlığının iki ucu). Kadraj: `tum`, `duvar`, `cam` |

Figürün gösteremediği şey (buzdolabı, grafik, tablo, tanecik, Güneş) dersin düz vektör katmanında çizilir. Arayüzde olmayan bir ayar gerekiyorsa senaryo ajanı raporlar; sözleşme ana oturumda değişir.

## 7. Bitiş ölçütleri (her figür)

- `node model-sina.mjs` temiz: sayılar kitaptaki modelle uyuşuyor (Ş2'de Q = m · c · ΔT ve hâl değişimi, kitaptaki yazılışla).
- `node build.mjs --audit` ve `--light --audit`: `audit passed`.
- `node ~/.claude/skills/anatomy/scripts/lines.mjs` iki temada ve her dinlenme pozunda `line ends: 0`. Chrome yolu: `CHROME_PATH="$(find ~/.cache/hyperframes/chrome -type f -name chrome-headless-shell | head -1)"`.
- 4× yakın çekimler iki temada açılıp bakıldı.
- Figürü kullanan her ders: `node araclar/olc.js enerji/<kod>` 1366×657 ve 750×402'de temiz; ekran görüntüsünde figür ile dersin etiketleri üst üste gelmiyor.
- Tema sonunda `sure.js` ve `denetle.js` temiz.

## 8. Kararlar

Kullanıcı 12 Ekim 2026'da varsayılanları onayladı ("varsayılanlarla yürü").

1. **Kapsam.** Altı figürün hepsi yapılır (Ş1–Ş6).
2. **Zaman.** Figürler tema işleme alınınca yapılır; Enerji `../../YOL-HARITASI.md` sırasında yeni temaların yedincisidir. Öne alınan iş yok.
3. **Alev.** Kitap gaz ocağı çiziyor (Görsel 4.10, s. 219): ısıtıcı gaz ocağıdır, alev düz tonlarla çizilir. Onaylanan varsayılan elektrikli tablaydı; aynı kararın ikinci cümlesi ("kitap ocak çiziyorsa düz tonlu alev") uygulandı.
4. **Akışkanlar.** Oradaki düz vektör kararına (karar 20) dokunulmaz; C2 ve D2'nin pilot figürlerle değiştirilmesi ayrı iştir, kullanıcı ayrıca ister.

## 9. Yapılacaklar

- [x] Kullanıcı kararları (bölüm 8; 12 Ekim 2026)
- [x] 2b: düzeneklerin kitaptaki çizimi ve sayıları (12 Ekim 2026; `PLAN.md` bölüm 8)
- [x] `PLAN.md` bölüm 7: figür kararı (14), ısıtıcı (bölüm 8, karar 3), renk rolleri (19), kitap dışı düzenekler (18)
- [x] Senaryolarda "Figür:" satırları (12 Ekim 2026; B–F senaryolarında 38 satır, A konusu figürsüz)
- [x] `sekil/kit/` ve `sekil/parcalar.mjs` (12 Ekim 2026)
- [x] Ş2 İkiz ısıtma düzeneği → `dersler/isitma-sekil.js` (12 Ekim 2026; 131 katı, 253 KB, 45 dakika; geometri ve çizgi denetimi iki temada 0; `olc.js` iki boyutta temiz). Tahtada kontrast ve konu renkleri için bir düzeltme turu açıldı. Bilinen sınır: iki istasyonun termometreleri ekranda aynı yükseklikte değil ve `tum` kadrajında 1 °C yaklaşık 0,66 px; karşılaştırma sayı etiketiyle ve `sol` / `sag` kadrajıyla yapılır
- [x] Ş5 Isı iletim düzeneği → `dersler/iletim-sekil.js` (12 Ekim 2026; 279 KB, sınıra 21 KB kaldı)
- [x] Ş1 Üç ölçekli termometre → `dersler/termometre-sekil.js` (12 Ekim 2026; 104 KB)
- [x] Ş3 Isıl denge düzeneği → `dersler/denge-sekil.js` (12 Ekim 2026; 198 KB)
- [x] Ş6 Duvar ve çift cam kesiti → `dersler/duvar-sekil.js` (12 Ekim 2026; 155 KB; termos kesiti çıktı, çift cam girdi)
- [x] Ş4 Kesit oda → `dersler/oda-sekil.js` (12 Ekim 2026; 230 KB)
- [x] `gorev/ders-gorevi.md` kopyasına figür arayüzleri (12 Ekim 2026; ajan modülün baş yorumunu okur, kullanım kalıbı görev tanımında)
- [x] Dersler ve tema denetimi (`ISLEME.md` 6–7; 12 Ekim 2026: 13 ders figürlü, 21 / 21 dosyada `olc.js` temiz, `denetle.js` "sorun yok"; ayrıntı `DURUM.md`)
