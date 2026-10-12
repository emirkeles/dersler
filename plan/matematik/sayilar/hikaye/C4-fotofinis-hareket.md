# Plan — Fotofiniş: hareket tasarımı yükseltmesi

**Durum (12 Ekim 2026):** yalnızca plan. `index.html` değişmedi, işleme yapılmadı. Uygulayan oturum bu dosya ve depo ile başlar.
**İstek:** "Ses aynı kalsın; daha profesyonel bir hareket tasarımı."
**Proje:** `matematik/sayilar/hikaye/c4-fotofinis/` (HyperFrames 0.8.149; tek `index.html`, tek duraklatılmış GSAP zaman çizelgesi; stadyum SVG, sayı doğrusu tuval).

Önce oku (yeniden anlatılmadı): proje klasöründe `STORYBOARD.md`, `frame.md`, `SCRIPT.md`; `plan/matematik/sayilar/hikaye/C4-fotofinis.md` (bölüm 5 kaynaklar, 9 doğrulanmayanlar); `plan/matematik/sayilar/HIKAYE-ANIMASYONLARI.md` bölüm 1–2. Skill'ler: `~/.claude/skills/hyperframes-core/SKILL.md` ve `references/determinism-rules.md`; `hyperframes-animation/rules-index.md`, `adapters/gsap-easing-and-stagger.md`, `references/motion-blur.md`; `hyperframes-keyframes/SKILL.md`; `hyperframes-creative/references/motion-principles.md`. Aşağıda geçen kural adları bu dizinlerdendir (`rules/<ad>.md`).

## 0. Sabitler ve çapalar

Değişmez: 11 klip ve `<audio data-start>` değerleri (0,5 · 5,3 · 12,2 · 18,6 · 21,5 · 31,3 · 41,4 · 47,6 · 54,4 · 62,3 · 68,5), süre 74,6 sn, `T` tablosu, senaryo, sayılar, `STORYBOARD.md` "Ekrandaki sözcükler" ve "Yasaklar", renkler ve yazı boyutları (`frame.md`), ölçek matematiği (`K = nk·10^z`, etiket eşikleri).

Kodun deyimi (korunur): görüntü her an yalnızca `st` nesnesinden hesaplanır; `git(t, süre, hedef, ease)` `st` üzerinde `fromTo` kurar ve `simdi` içinde son değeri tutar; tek yazıcı `ciz()` (stadyum kamerası, koşucular, tarama) ve `cizDogru()` (tuval). Yeni hareket de böyle eklenir: yeni durum anahtarı + `ciz()` içinde saf hesap. `ciz()` içinde önceki kareden değer saklanmaz. Yerler: `yay` 253, `poz` 354, `st` 379, `cizDogru` 391, `ciz` 537, `git` 563, `T` 576, kare blokları 581–677.

Söz pencereleri (klip başlangıcı + `assets/ses-esit/olcum.json` sessizlikleri; cümle içindeki kelime yerleri **tahmindir**):

| Klip | Pencereler (sn) |
|---|---|
| 1 | "Paris, iki bin yirmi dört." 0,50–2,23 · sessiz 2,23–2,63 · "Olimpiyatlarda yüz metre finali." 2,63–4,82 |
| 2 | "Sekiz koşucu … vardı." 5,30–8,36 · sessiz –8,73 · "Öndeki ikisini … imkânsızdı." 8,73–11,62 |
| 3 | "Tabela da ayıramadı." 12,20–13,48 · "İkisinin derecesi aynıydı:" 13,76–15,39 · "dokuz virgül yetmiş dokuz saniye." 15,75–17,96 |
| 4 | "Peki altın madalya kimin?" 18,60–20,56 |
| 5 | "Bitiş çizgisindeki kamera … okudu:" 21,50–24,73 · sessiz –25,31 · iki sayı 25,31–30,70 |
| 6 | "Sayı doğrusunda soldaki küçüktür." 31,30–33,95 · "Küçük süre," 34,49–35,32 · "önce varan demek." 35,64–36,80 · "Altın," 37,37–37,88 · "saniyenin binde beşiyle kazanıldı." 38,14–40,48 |
| 7 | "Peki kazanan … hangisi?" 41,40–45,16 · "Binde bir fazlası mı?" 45,61–47,00 |
| 8 | "Yaklaşalım." 47,60–48,31 · "İkisinin arasında bir sayı daha var." 48,68–51,09 · "Daha da yaklaşalım:" 51,47–52,62 · "yine var." 52,90–53,84 |
| 9 | "Kamera bir yerde durur;" 54,40–55,85 · "sayılar durmaz." 56,20–57,31 · "Ne kadar … girer." 57,67–61,60 |
| 10 | 62,30–67,58 (iç sessizlik yok) |
| 11 | "Kesirlerde" 68,50–69,48 · "bir sonraki sayı yoktur." 69,96–71,78 |

## 1. Teşhis

**Nasıl bakıldı.** Film oynatılamadı; `renders/c4-fotofinis.mp4` üzerinden ffmpeg ile kare tabakaları çıkarıldı: bütün film 0,5 sn arayla (8 tabaka), her geçiş ve her vuruş 1–6 kare arayla (19 tabaka), beş tam çözünürlüklü kare. `animation-map.mjs` ile tween dökümü alındı (113 tween). **G** = karelerde görülen, **Ç** = sayıdan ya da koddan çıkarım.

### 1.1 Sorunlar, "profesyonel" okumaya maliyet sırasıyla

1. **Dünya değişimi bir geçiş değil, bir erime (30,9–32,4).** G: panel 0,45 sn'de, stadyum 0,7 sn'de solar; cetvel 1,9 kat büyüyüp 290 px yukarı kayar; tabela yerinden oynamadan söner; 31,3–31,7 arasında cetvel sönmekte olan tribünün üstünde çerçevesiz yüzer. Ç: `cy` `power3.in`, cetvel `power3.inOut` yürüdüğü için iki dünya kilitli değil. `STORYBOARD.md` burayı "alt çerçevenin içine giriş" diye tanımlıyor; filmin menteşesi olan an en zayıf okunan an.
2. **Derin yakınlaşma ve geri çekilme kare kare tutarsız (56,2–63,8).** G: geri çekilmede (62,5–63,1) art arda kareler birbiriyle ilgisiz çizgi sıklıkları gösteriyor. Ç: 7,2 düzey 1,8 sn'de, tepe hız ≈ 16 düzey/sn, kare başına ≈ 3,4 kat ölçek. G: 60,5–61,9'da 11 haneli çizgi etiketleri sıkışık; altın etiket sağ kenarda kesiliyor (57,4 ve 61,6); en derin karede (61,5–61,9) altın sayı yok (Ç: `z = 7,3` olduğu için 7. sayı kadrajın dışında). G: ortak çizgilerde iki düzeyin etiketi üst üste eriyor ("9,784" ile "9,7840"; 52,0 ve 62,x). Ç: altın sayılar ve gösterge okunurken sürekli kayıyor; son 2 sn'de her biri 0,8 sn'den az görünüyor (yazı kuralına aykırı).
3. **Filmin %38'inde hiçbir şey kımıldamıyor.** Ç (tween dökümü, `sal` hariç): 28,6 sn; ≥ 1,6 sn'lik beş aralık: 2,76–5,23 · 16,7–18,75 · 33,58–35,78 · 39,03–41,03 · 71,78–74,6 (LED'in 0,07 sn'lik tween'leri elle sayıldı). G: 32,5–67,9 arası her şey ekranın ortasındaki ~300 px'lik tek bir şeritte; zemin 10 katlık yakınlaşmada bile kıpırdamıyor (derinlik yok).
4. **Filmin sorusu küçük resim ölçeğinde sahneleniyor (43,2–47,3).** G: sıçrayış yayı 150 × 46 px; "?" "9,784" etiketinin taban çizgisinde, bitişiğinde ("9,784 ?" diye okunuyor); kadraj 16 sn boyunca hiç değişmiyor.
5. **Tek tip giriş sözlüğü.** G: madalya, işaretler, altın noktalar, "<" sıfır ölçekten `back.out` ile geliyor (35,75–36,0); kendi ilkesi "0,4–0,7 ölçekten" diyor. Ç: DOM'da 7 `back.out`, tuvalde bütün girişler `yay`; skill doktrini "smooth beats bouncy". G: kapanış kartı 0,7 sn yarı saydam geliyor, arkasından sayı doğrusu görünüyor (68,0–68,7).
6. **Stadyum bölümünde kadraj ve sıra kusurları.** G: koşucular 0–4,5 sn boyunca sol kenarda donuk duruyor ("boş pist" boş değil); tabelanın direkleri 0. karede siyahın üstünde görünüyor; projektör lambaları 13,5–21,1 arasında alt kenara teğet; panel 21,5–21,9'da tabelanın alt satırının üstüne yarı saydam biniyor; iki okun turuncusu nane koşucunun gölgesine değiyor (10,0+). Ç: 3. karenin "sonra ekran durur" duruşu yok (madalya salınımı 21,05'te biter, kamera 21,1'de kalkar). Ç: dünya tek katman (yalnız yıldızlarda paralaks); tabelaya kalkışta tepe hız ≈ 115–140 px/kare, 26 px'lik seyirci deseni üstünde.
7. **Açılış 2,8 sn'de bitiyor, ses 4,8'e kadar sürüyor.** G: 2,76–5,23 arası tek kare. Işık tek adımda açılıyor; pisti aydınlatmıyor.
8. **Sağlamanın ödülü ufak (63,9–67,1).** G: 14 px'ten 3 px'e küçülen noktalar, sonunda 9 px'lik çizgiye çapraz erime (noktalar çizgi olmuyor, yerini bırakıyor).

### 1.2 Kare kare

| Kare | Gözlem | Çıkarım |
|---|---|---|
| F1 0–5,0 | Sıra doğru (yer, çizgi, ışık) ama 2,8 sn'de bitiyor; koşucular ve tabela direkleri görünür; koniler düz yamuk | Işık anlatının "finali" sözüne denk gelmiyor |
| F2 5,0–11,9 | Sekiz koşucu üst üste bir öbek; hız rampası birleşim yerinde pürüzsüz; flaş ve yaklaşma temiz; oklar küçük ve çakışıyor; 10,6–11,9 durağan | Rampa eklemi 18,8 → 18,3 px/kare (hesap); öbek kulvar 60 px / figür 160 px oranından, düzen sorunu |
| F3 11,9–21,1 | Kalkış düz bir dikey kayma; tabela 1,4 sn karanlık bekler; LED sıralaması iyi; "?" halkası küçük, sağ kenarda | Durağan bitiş yok; kalkışta desen titreşimi olası |
| F4 21,1–30,9 | Panel tabelanın üstüne solarak gelir; tarama iyi; 24,9'dan sonra 6 sn'de dört küçük olay | Dinlenen sayıya eşlik eden duruşlar kabul edilebilir; giriş ve çıkış zayıf |
| F5 30,9–41,0 | Erime (sorun 1); sonra tek şerit; "Küçük süre" sözünde ekranda karşılık yok | 9 sn'de üç küçük giriş |
| F6 41,0–47,3 | Sorun 4; son 1,4 sn'lik duruş yerinde | — |
| F7 47,3–54,1 | 10 katlık iki adım düzgün; altın sayı aynı ekran yerine (x = 1230) iner (iyi bir kafiye); etiket bindirmesi | Zemin sabit olduğu için derinlik hissi yok |
| F8 54,1–61,9 | İlk 1,2 sn neredeyse hareketsiz ("sayılar durmaz" denirken); sonra sorun 2 | `power1.in` başlangıcı çok yavaş |
| F9 61,9–67,9 | Sorun 2 ve 8 | — |
| F10 67,9–74,6 | Yarı saydam giriş; iki satır aynı hareketle; kart 2,8 sn durur (kurala uygun) | Model satırı "araya girme"yi göstermiyor |

### 1.3 Sağlam olan (dokunulmayacak)

LED parçalarının 25 ms'lik sıralaması ve `incelt`; taramanın sabit hızı; F5–F7'deki söz çapaları ("<" 33,05 · madalya 35,75 · "?" · iki yakınlaşma); logaritmik yakınlaşma ve altının hep x = 1230'a inmesi; renk ve biçim kodu; koşu döngüsünün pozları (`poz`).

## 2. Yön

Tek bakış noktası sürer; **dünya hareket eder, yazı etmez.** Kamera her seferinde tek, yavaşlayarak oturan bir hareket yapar ve yaylanmaz; nesneler en az 0,6 ölçekten gelir ve aşmadan oturur (yalnız madalya ve altın nokta %1,5'e kadar aşar); makine (tarama) doğrusal kalır; yere inmiş sayı, LED rakamı ve kart yazısı bir daha kımıldamaz. Derinlik katmanların farklı hızından, hız çizgilerin akışından gelir; süs için dönen ya da nefes alan hiçbir şey eklenmez. "Profesyonel"in ölçüsü: (a) bütün tween'ler tek bir ease ve süre sözlüğünden, `back.out` sayısı 0; (b) ≥ 1,6 sn'lik hareketsiz aralık 5'ten 2'ye iner ve ikisi de adı konmuş okuma duruşudur (16,7–18,7 tabela · kapanış kartı); duruşların çoğu anlatımın okuma payıdır, hedef onları silmek değil, adsız uzun olanları kapatmaktır; (c) yakınlaşma hızı hiçbir karede 2,5 düzey/sn'yi geçmez, ince çizgiler görünürken; (d) dünya değişiminde cetvel, panel ve stadyum tek dönüşümden gelir, ara karede kayma ≤ 2 px; (e) hareket ederken okunması gereken yazı ve kenarda kesilen etiket yok; (f) stadyumda en az üç, sayı düzleminde iki katman farklı hızda; (g) sıfır ölçekten giriş yok.

## 3. Değişiklikler

### 3.1 Sistem

- **S1 · Sözlük.** `const D = { cabuk: 0.25, orta: 0.45, agir: 0.8, kamera: 1.4 }`, `const E = { gir: "power3.out", otur: "expo.out", cik: "power2.in", tasi: "power3.inOut", yakin: "power2.inOut", makine: "none", nefes: "sine.inOut" }`. Bütün `git`, `gir`, `cik` çağrıları buradan okur; çıkış süresi girişin en çok %65'i; grup gecikmesi toplamı ≤ 0,5 sn (lamba gecikmesi 0,018 → 0,013). Dayanak: `adapters/gsap-easing-and-stagger.md` (power3 ev varsayılanı, "smooth beats bouncy").
- **S2 · Giriş eğrisi.** `yay` (0'dan, `back.out` 1,9) yerine `pop(t, zeta = 1)`: ölçek `0.6 + 0.4·s(t)`, `s` aynı adaptördeki `springEase` kapalı biçimi (`zeta = 1` aşmasız; madalya ve altın nokta için `0.8`), saydamlık `min(1, 4t)`. Tuvaldeki her `yay` kullanımı (işaret, "<", "?", halka, madalya, altın nokta, dolma noktaları) buna geçer; sürücü tween'ler `none` kalır. DOM'daki 7 `back.out` → `scale: 0.6 → 1`, `E.otur`. Kural: `spring-pop-entrance`.
- **S3 · Stadyum katmanları.** `ciz()` içinde `#tribun` ve `#isiklar` grubuna `translate((st.cx − 960)·0.12, 0)` (yalnız yatay: F3 ve F4'te `cx = 960` olduğu için o kadrajlar değişmez); yıldızlar olduğu gibi. Kural: `multi-phase-camera` (tek yazıcı, mikro salınım `sal` kalır).
- **S4 · Dünya geçişi dönüşümü.** `ciz()` içinde `s = st.nk/80`, `G = matrix(s, 0, 0, s, st.ax − 880·s, st.ny − 930·s)`; `#dunya` ve `#panel` SVG köklerine `style.transform` olarak yazılır (`transform-origin: 0 0`). F4'te (`ax = 880, nk = 80, ny = 930`) birim dönüşümdür; F5'te cetvelle aynı değerlerden türediği için kayma tanım gereği 0'dır. Yeni durum anahtarı gerekmez. Panelin dikdörtgeni alt kenarı kadrajdan çıksın diye `height = 470 + 200·kis((st.nk − 80)/70, 0, 1)`.
- **S5 · Sayı düzlemi.** (a) `#duzlem`'deki çizgili desen CSS'ten çıkar, `cizDogru` başında çizilir: iki oktav dikey ince çizgi, dönem `P = 30·10^frac(0.3·z)` ve `P/10` (ikincinin saydamlığı `frac`), çapa `960 + (ax − 960)·0.4`; ön plan 10 kat yakınlaşırken zemin 2 kat yakınlaşır. Işıma CSS'te kalır. (b) `st.et` (çizgi etiketleri çarpanı) ve `st.ince` (k ≥ 1 çizgileri çarpanı). (c) Ortak çizgide (`n % 10 === 0`) iki ayrı dizgi eritilmez: ortak önek bir kez yazılır, yalnızca eklenen "0" belirir. (d) Altın etiketler tek yardımcıyla hane hane çizilir (`altinYaz(dizgi, solX, y, sonHaneAlfa)`, hane genişliği `measureText("0")`). Dayanak: `techniques.md` bölüm 2 (tuval, saf fonksiyon).
- **S6 · Yeni adlar.** Durum: `bul, uc, pan, los, bes, bas, et, ince, top`. DOM: `#kam-dis` (`#kam`'ı saran dönüşümsüz grup), filtre `#kam-bulanik`, `#los`, `#ucan-a`, `#ucan-b`, `#pan-kirp`, `#panel-ust` (simge, şerit, izler, kıllar, tarama çizgisi; dikdörtgen dışarıda kalır), `#m1 #m2 #m3 #vurgu`. Silinen: `#ok-a`, `#ok-b`, `#cip-a`, `#cip-b`.

### 3.2 Kare kare (zamanlar mevcut çizelgede, sn)

| No | Kare | Öğe: neyden → neye | Başlangıç · süre | Ease | Ses çapası | Kural | Uygulama |
|---|---|---|---|---|---|---|---|
| 1 | F1 | Koşucular: 0. kareden beri sol kenarda → F1 boyunca kadraj dışı | — | — | — | `hyperframes-keyframes` (ilk kare animasyonun parçası) | `ciz()`: `lider = kar(-180, FX − GOGUS, st.p)` |
| 2 | F1 | `#tabela`: 0. karede görünür → tribünle birlikte belirir | 0,15 · 0,7 | `power2.out` | — | aynı | `tl.fromTo("#tabela", {opacity:0}, …)` |
| 3 | F1 | Işık 1,9–2,76'da tek adım → sözle üç adım: lambalar, koniler ve pistin aydınlanması, bitiş çizgisi, kamera | lamba 2,60 · gecikme ≤ 0,46; koni 2,75; `#los` 0,45 → 0 2,75 · 0,7 (koniyle aynı kırpışma); `#bitis` 3,55 · 0,5; `#bitis-kamera` 4,15 · 0,4 (`y −18 → 0`, 0,6 → 1) | `none` / `E.gir` / `E.otur` | "Olimpiyatlarda" 2,63; "yüz metre finali" (tahmin 3,5–4,8) | `motion-principles` build / breathe / resolve; `svg-path-draw` (kulvarlar aynen) | `#los`: `#kam` içinde pistten sonra, koşuculardan önce, gece rengi dikdörtgen (y ≥ 100) |
| 4 | F2 | Tribün ve ışıklar pistle tek parça → yatayda 0,88 hızla | sürekli | — | — | `multi-phase-camera` | S3 |
| 5 | F2 | İki ok → kimlik çipleri (turuncu daire r 30, nane eşkenar dörtgen), çizginin sağında göğüs hizasında: (FX + 90, ayak − 110) | 10,0 ve 10,15 · 0,35 | `E.otur` | "gözle ayırmak imkânsızdı" | `spring-pop-entrance` | `#ucan-a/b` `#kam`'ın sonunda; konum `ciz()` içinde `st.uc`'tan |
| 6 | F2→F3 | Çipler tabelada yeniden beliriyor (13,9) → koşucuların yanından tabeladaki yerlerine uçar: (1510, 816) → (630, −280) ve (1510, 636) → (630, −460) | 11,64 · 1,75 (kameradan 2 kare önce) | `E.tasi` | "Tabela da ayıramadı." | `hyperframes-keyframes` paylaşılan öğe ("kimlik sürsün") | `git(11.64, 1.75, {uc: 1}, E.tasi)`; `#cip-a/b` ve 13,9 girişleri silinir |
| 6b | F3 | Çipler yerine oturunca tabela 2,2 sn boş bekler → "ikisinin" sözünde iki çip sırayla bir kez basılır (1 → 1,18 → 1) | 13,80 ve 13,95 · 0,3 | `power2.out` | "İkisinin derecesi aynıydı:" 13,76 | `physics-press-reaction` | `#ucan-a/b` içindeki biçime GSAP `scale` (konumu `ciz()` dış gruba yazar; çakışma yok) |
| 7 | F3 | Kamera kalkışı 11,9 · 1,9, `cy −385` → 11,70 · 1,75, `cy −410` (lambalar kadrajın altında kalır: (14 + 410)·1,28 + 540 = 1083) | 11,70 · 1,75 | `E.tasi` | "ayıramadı" 13,48'de biter; varış 13,45 | `viewport-change` | `git(11.7, 1.75, {cs: 1.28, cx: 960, cy: -410}, E.tasi)` |
| 8 | F3 | (Karar K1) Kalkışta desen titreşimi → yalnız dikey çekme bulanıklığı, yalnız stadyumda | `bul` 0 → 14: 11,70 · 0,85; 14 → 0: 12,55 · 0,9 | `power2.in` / `power2.out` | sessizlik ve "Tabela da" | `motion-blur-streak` (Camera-Travel Carve-Out) | `#kam-dis` üstünde `filter="url(#kam-bulanik)"`, `stdDeviation = "0 " + st.bul`; `bul < 0.3` iken öznitelik kaldırılır |
| 9 | F3 | "?" girişi `back.out` → 0,6'dan oturur; salınım 19,25–21,05 → 19,20–20,45 (0,35 · 0,55 · 0,35); **20,45–21,10 durağan** | 18,75 · 0,4; 19,20 · 1,25 | `E.otur`; `E.nefes` | "Peki altın madalya kimin?" 18,60–20,56 | `STORYBOARD.md` durağan kare | mevcut iki `#kimin` tween'i |
| 10 | F4 | Kamera 1,1 sn → 0,85 sn (tabela panelden önce otursun) | 21,10 · 0,85 | `E.tasi` | sessizlik 20,76–21,50 | `viewport-change` | `git(T.k4, 0.85, {cs: 1, cy: -150}, E.tasi)` |
| 11 | F4 | Panel: aşağıdan solarak ve tabelaya binerek → önce kamera simgesi, sonra simgenin yanından sağa doğru açılır; saydamlık ikili | simge 21,70 · 0,35; `pan` 0 → 1: 21,85 · 0,5 | `E.otur` | "Bitiş çizgisindeki kamera" 21,50 | `anchored-layout-expand` (maske); `waterfall-entry` (varış solmaz) | `#pan-kirp` simge dışındaki her şeyi kırpar: x = 290'dan, genişlik `ciz()` içinde `1340·st.pan`; `tl.set("#panel-govde", {opacity: 1}, 21.7)` |
| 12 | F4 | İşaret ve etiket girişleri (`ma, mb, la, lb`): S2 eğrisi; zamanlar aynı | 23,45 · 24,28 · 25,4 · 27,9 | `none` + `pop` | aynı | S2 | `cizDogru` |
| 13 | F4→F5 | Erime → kilitli itiş: cetvel sabit kalır, panelin çerçevesi kadrajın dışına büyür, tabela üstten çıkar | cetvel 30,95 · 1,4; `#panel-ust` 1 → 0: 30,95 · 0,45; `#duzlem` 0 → 1: 31,2 · 0,6 (panelin altında); `#dunya` → 0: 31,95 · 0,15; `#panel-govde` 1 → 0: 32,15 · 0,5 | `E.tasi`; `E.cik`; `none`; `power1.out` | sessizlik 30,70–31,30; varış "soldaki küçüktür" sırasında | `card-morph-anchor`; `transitions/css-scale.md` Zoom Through; `control-target-sync` (tek pencere, tek ease) | S4. Silinenler: `cik("#panel-govde", T.k5, …)`, `#dunya` 0,7 sn solması, `git(…, {cy: 260}, "power3.in")`. `#panel` köküne `data-layout-allow-overflow` |
| 14 | F5 | (İsteğe bağlı) itişte stadyum ve şerit netlikten düşer, cetvel keskin kalır | 30,95 · 0,6, 0 → 6 px | `E.cik` | — | `depth-of-field-blur` | `#kam-dis` ve `#panel-ust` üstünde `filter: blur()` tween'i |
| 15 | F5 | "Küçük süre" sözüne karşılık yok → 9,784 işaretinde tek halka | `halka` 0 → 1: 34,50 · 0,7; 35,30'da 0'a alınır | `power2.out` | "Küçük süre," 34,49 | — (mevcut `halka` çizimi) | `git(34.5, 0.7, {halka: 1}, …)`; `git(35.3, 0.01, {halka: 0}, "none")` |
| 16 | F5 | Madalya: yerinde sıfırdan şişer → yukarıdan iner (`y −46u → 0`, 0,6 → 1, `zeta 0.8`) | 35,75 · 0,55 | `none` + `pop` | "önce varan demek." 35,64 | `spring-pop-entrance` | `cizDogru` madalya bloğu; 37,35'teki sallanma aynen |
| 17 | F5 | Fark ayracı aynen; ardından beş binde birlik adım ayracın altında sırayla yanar | `bes` 0 → 5: 39,10 · 0,55 | `none` | "binde beşiyle" (tahmin 38,9–39,7) | `stat-bars-and-fills` (gecikme toplamı ≤ 0,5) | `ay` bloğunda beş kısa altın çizgi, saydamlık `rampa(st.bes, i, i + 0.6)` |
| 18 | F6 | Çıkış: `{ay: 0, kucuk: 0, bes: 0}` | 41,00 · 0,3 | `E.cik` | — | çıkış girişten kısa | mevcut satır |
| 19 | F6 | Halka 42,3 → 41,9 | 41,90 · 0,8 | `power2.out` | "kazanan" (tahmin) | — | mevcut satır |
| 20 | F6 | Sıçrayış: 150 × 46 px sessiz yay → işaret bir kez basılır, küçük bir nokta 90u yükseklikte atlar ve noktalı izini bırakır; konduğu yerde halka | `bas` 0 → 1 → 0: 43,02 · 0,18; `sek` 43,20 · 0,8; `soru` 44,00 · 0,35 | `power2.out`; `power1.inOut`; `none` + `pop` | "hemen sonraki sayı hangisi?" 45,16'da biter | `physics-press-reaction` (beklenti); `hyperframes-keyframes` yol hareketi | `cizDogru` `sekA` bloğu: yay yüksekliği `46u → 90u`, yay ucunda `r = 7u` nokta, işaret yarıçapı `·(1 − 0.16·st.bas)` |
| 21 | F6 | "?": `y − 78u` ("9,784"e bitişik) → `y − 150u`, 9,785'in üstünde | — | — | — | yerleşim | aynı blok; F6 sonundaki 46,0–47,4 duruşu aynen |
| 22 | F7 | İki yakınlaşma aynen; zemin 0,3 hızla eşlik eder; ortak etiket düzeltmesi | 47,85 · 1,7; 51,5 · 1,5 | `E.yakin` | "Yaklaşalım." · "Daha da yaklaşalım:" | `coordinate-target-zoom` | S5a, S5c |
| 23 | F7 | Altın nokta: sıfırdan şişer → yukarıdan düşer (`y −34u → 0`, 0,6 → 1, `zeta 0.8`); etiketi 0,12 sn sonra belirir ve durur | 49,55 · 0,45; 53,00 · 0,45 | `none` + `pop` | "bir sayı daha var" · "yine var." 52,90 | `spring-pop-entrance` | `g1`, `g2` süreleri; `altinYaz` |
| 24 | F8 | `z` 2 → 7,3 `power1.in` (ilk 1,2 sn durgun, son kare altınsız) → 2 → **6**, hızlanan ve her tam düzeyde yavaşlayan ama hiç durmayan eğri; düzeylere varış ≈ 58,1 · 59,4 · 60,5 · 61,5; ilk saniyede 0,38 düzey (bugün 0,19) | 56,20 · 5,3 | fonksiyon: `p => { const L = 4*p**1.35; return (L - 0.6*Math.sin(2*Math.PI*L)/(2*Math.PI))/4; }` | "sayılar durmaz." 56,20; "hep yenisi girer" –61,60 | `coordinate-target-zoom`; ease olarak saf fonksiyon (`gsap-easing-and-stagger.md`, Spring Eases gerekçesi) | `git(56.2, 5.3, {z: 6}, nefesli)`; tepe hız ≈ 1,6 düzey/sn, tam düzeylerde ≈ 0,4 |
| 25 | F8 | Çizgi etiketleri akarken okunmaz → kapanır | `et` 1 → 0: 56,20 · 0,35; geri 63,70 · 0,4 | `E.cik` / `E.gir` | — | yazı kuralı (`HIKAYE-ANIMASYONLARI.md` bölüm 2) | S5b |
| 26 | F8 | Kayan altın etiketler → sabit yerde tek altın okuma: sol kenarı 53,0'daki "9,78405" etiketinin sol kenarı, her düzeyde bir "0" eklenir, "5" bir hane sağa geçer; noktalar etiketsiz akar | `z = j − 0,5`'te dizgi değişir, `z ∈ [j − 0,5, j − 0,3]` aralığında yeni hane belirir | `z`'nin saf fonksiyonu | son değer "9,784000005" ≈ 61,0'dan 61,95'e durur (≥ 0,8 sn) | `counting-dynamic-scale` (`STORYBOARD.md` F8'in kendi notu: "etiket bir basamak uzar") | `cizDogru` altın döngüsü: `j ≥ 3` için nokta `rampa(z, j − 0.55, j − 0.3)`, etiket yok; okuma `n = kis(floor(z + 0.5), 2, 6)` |
| 27 | F9 | Geri çekilme 62,0 · 1,8 `power3.inOut`, bütün çizgiler → ince çizgiler önce söner; yalnız eksen, işaret ve altın noktalar kalır; noktalar 9,784'e doğru toplanıp ona 40 px kala söner; 9,789 sağdan girer | `ince` 1 → 0: 61,70 · 0,25; `top` 0 → 1: 61,90; `z, ax`: 61,95 · 1,9; `top` → 0: 63,45 · 0,3; `ince` → 1: 63,90 | `E.cik`; `E.yakin` | "İki derece birbirine ne kadar yakın" 62,30– | blueprint `zoom-out-workspace-reveal` (tek geri çekilme, sonra kadraj kilitlenir, ödül öğe hareketiyle gelir) | altın döngüsü: `g = max(g, st.top)`, saydamlık `rampa(x − ax, 8, 40)`; `mer` ve okuma 62,0'da mevcut satırla söner; `z: 0.12, ax: 465` aynen |
| 28 | F9 | Dolma: noktalar söner, çizgi belirir → noktalar çizgi olur: yarıçap tabanı `4.5u` (7. kuşakta aralık 7,7 px, noktalar değer); `dol > 6,9` iken bütün yarıçaplar `4.5u`'ya iner, çizgi altlarında belirir; noktalardaki `(1 − rampa(dol, 7.2, 7.9))` kalkar | 63,90 · 3,2 (aynen) | `power1.in` (aynen) + `pop` | "aralarına bir başkası sığar." | `hyperframes-keyframes`: "biçim başka biçime dönüşür; çapraz erime yalnız yer değiştirmede" | `cizDogru` `dol` bloğu |
| 29 | F10 | Perde 0,86 → 0,94 saydamsızlık, 0,7 → 0,5 sn; kart 0,7 sn yarı saydam → saydamlık 0,2 sn, konum ve ölçek ayrı (`y 56 → 0`, 0,96 → 1); altın gölge sonradan kayar (`0 0 0` → `18px 18px 0`) | perde 67,95 · 0,5; kart 68,10 (saydamlık 0,2 `power1.out`, dönüşüm 0,8 `E.otur`); gölge 68,55 · 0,4 `E.gir` | — | sessizlik 67,58–68,50 | `spring-pop-entrance` (Firm settle); ikincil hareket | `#perde` CSS, `#kart` iki tween, `boxShadow` |
| 30 | F10 | İki satır aynı `opacity + y 30` → satır maskesi içinden yükselir (`yPercent 105 → 0`), saydamlık ikili | 68,45 · 0,5; 69,90 · 0,5 | `power4.out` | "Kesirlerde" 68,50 · "bir sonraki" 69,96 | `waterfall-entry`; `techniques.md` bölüm 12 (maskede glif payı) | her `.satir` taşması gizli bir satır kutusuna sarılır; iç `span` hareket eder |
| 31 | F10 | Model tek parça → uçlar önce ("9,784", "9,785"), ortası sonra araya girer ("< 9,7845 <") ve arkasından altın vurgu geçer; son metin aynı | uçlar 71,25 · 0,3; orta 71,60 · 0,4 (0,8 → 1); vurgu 71,75 · 0,4 (`scaleX`, soldan) | `E.gir`; `E.otur`; `E.gir` | söz 71,78'de biter; model 72,15–74,6 durur (2,45 sn ≥ 5 × 0,3 + 0,5) | `css-marker-patterns` (highlight) | `#model` üç `inline-block` parçaya bölünür (yerleri sabit), `#vurgu` `#m2` içindeki sayının arkasında; `#cizgi` aynen |

### 3.3 Dokunulmayanlar ve nedeni

Ses ve `T` tablosu (sabit). LED yanışı, `incelt`, tarama, flaş, seyirci flaşları, hız rampası (`p`), kulvarların çizilişi, `sal` salınımı: iyi çalışıyor ve sözle çakışık. `poz` koşu döngüsü: pozlar kabul edilebilir, koşu 3,5 sn ve küçük ölçekte; kazanç düşük, risk yüksek. Kâğıt dişi (`#doku`): `frame.md` durağan doku istiyor. Aralık göstergesinin kayan listesi ve kamera simgesi: fikir okunuyor; yeni `z` eğrisiyle her düzeyde kendiliğinden yavaşlar. F9 kadrajı (`z = 0,12`): çizgi etiketlerinin eşiğinin hemen altında, bilerek. Kulvar ve figür ölçüleri: `frame.md` yerleşimi. F5–F6 kadrajı (sorun 4'te kadraj değişmiyor dendi): soruya doğru itmek `z`'yi oynatır, ardından gelen "her adım tam 10 kat" ve gösterge bozulur; bu yüzden kadraj kalır, sahneleme büyür (satır 20–21) ve aradaki boşluklar anlam taşıyan küçük olaylarla dolar (satır 15, 17).

## 4. Sıra ve bütçe

Her adımın sonunda proje klasöründe `npm run check`: 0 hata; uyarı yalnız bugünkü dosya uzunluğu uyarısı olmalı. Görüntüler bölüm 5'teki yolla depo dışına alınır.

| Adım | İçerik | Bitiş ölçütü | Bağımlılık |
|---|---|---|---|
| A0 | Taban: `check` çıktısı ve v1 filminden bölüm 5'teki tabakalar | Tabakalar ve `check` özeti not edildi | — |
| A1 ★ | S1, S2; satır 1, 2, 7 (yalnız `cy`), 9 | `grep -c "back.out" index.html` = 0; 0,0 · 3,0 · 17,0 · 20,8 anlık görüntüleri: koşucu ve direk yok, alt kenarda lamba yok, 20,5 ile 21,0 özdeş (`sal` salınımı dışında, ≤ 1 px) | ilk |
| A2 | S3; satır 3–6b, 7–8, 10–12 | Tabakalar: 2,4–4,8 · 9,8–10,6 · 11,6–13,6 · 21,0–22,5; çipler her karede kadrajda; panel hiçbir karede tabelaya binmiyor | A1 |
| A3 ★ | S4; satır 13 (14 isteğe bağlı) | 30,9–32,7 her 2 karede: "9,784" işareti ile panelin `#kil-a` çizgisi aynı x'te (≤ 2 px); panelin dört kenarı sırayla kadrajdan çıkıyor; yarı saydam tabela yok | A2 (`#panel-ust`) |
| A4 | S5a, S5c, S5d; satır 15–23 | 33–47 tabakaları; "?" ile "9,784" arasında ≥ 50 px; 52,0'da ortak çizgide tek dizgi; zemin çizgileri 47,85–49,55'te kayıyor | A1 |
| A5 ★ | S5b; satır 24–28 | 56–64 her karede: art arda kareler tutarlı; kenarda kesilen yazı yok; 61,6'da altın nokta x ≈ 1230'da ve okuma "9,784000005"; 62,0–63,9'da ince çizgi yok | A4 |
| A6 | Satır 29–31 | 67,9–72,2 her 2 karede: kart hiçbir karede yarı saydamken arkasında okunur çizgi yok; son kare bugünküyle aynı metin | bağımsız |
| A7 | Bütün: tam `check`, taslak işleme, bölüm 5'in tamamı; sonra kesin işleme ve `HIKAYE-ANIMASYONLARI.md` bölüm 2'deki −14 LUFS adımı | Bölüm 2'deki (a)–(g) ölçülerinin her biri sayıyla doğrulandı; `STORYBOARD.md` içinde yalnız `motion:` satırları ve "Hareket ilkeleri", `frame.md` içinde yalnız "Hareket" güncellendi ("Ekrandaki sözcükler" ve "Yasaklar" değişmez) | hepsi |

A2, A4 ve A6 birbirinden bağımsızdır (A1'den sonra); A3 A2'ye, A5 A4'e bağlıdır. **En az riskle en çok kazanç (★):** A3 (filmin menteşesi; yeni durum yok, her şey cetvelin değerlerinden türer), A5 (yalnız tuval; filmin en bozuk 8 saniyesini düzeltir), A1 (sözlük ve dört açık kusur; neredeyse risksiz).

## 5. Doğrulama

Video izlenemediği için hareket kare tabakalarıyla okunur. Bu makinedeki ffmpeg'de `drawtext` yok; zaman, karenin tabakadaki sırasından hesaplanır (i. kare = t0 + i·adım/30).

    #!/bin/zsh
    # kullanım: tabaka.sh <video> <ad> <t0> <t1> <kare adımı> <sütun> <satır> [genişlik] [w:h:x:y kırpma]
    f0=$(printf '%.0f' $(( $3*30.0 ))); cr=${9:+crop=$9,}
    ffmpeg -v error -y -i "$1" -vf "select='gte(n,$f0)*lte(t,$4)*not(mod(n-$f0,$5))',${cr}scale=${8:-384}:-1,tile=$6x$7:padding=4:color=red" -fps_mode vfr -frames:v 1 "$2.png"

Kaynak video: taslak işleme, depo dışına (`npx hyperframes@0.8.149 render -q draft -o <karalama>/taslak.mp4`). İşleme beklenmeden tek tek anlar için `npx hyperframes@0.8.149 snapshot --at <t1,t2,…> --no-end --describe false -o <karalama>/an` (`--describe false`: görüntü dış servise gitmesin; `--against renders/c4-fotofinis.mp4` v1 ile yan yana tabaka verir). Tuvalin içindeki hareket için `keyframes . --shot <dosya> --ghost --from <t0> --to <t1>`.

| Pencere (sn) | Adım | Bakılacak |
|---|---|---|
| 0–2,7 | 4 kare | İlk kare temiz siyah; koşucu ve direk yok |
| 2,4–4,8 | 4 kare | Işık üç adımda; pist ışıkla açılıyor; son öğe 4,6'da |
| 5,2–6,0 | her kare, kırpma `960:560:0:480` | Koşucular soldan giriyor; tribün pistten yavaş kayıyor |
| 8,5–10,6 | 3 kare | Flaş, yaklaşma; çipler çizginin sağında, hiçbir şeye değmiyor |
| 11,6–13,6 | 2 kare | Çipler kameradan önce kalkıyor ve yerine oturuyor; (K1 varsa) bulanıklık 13,2'de 0, "sn" yazısı keskin |
| 18,7–21,2 | 4 kare | Salınım 20,45'te bitiyor; sonraki kareler özdeş (≤ 1 px) |
| 21,0–22,5 | 2 kare | Simge, sonra panel soldan açılıyor; yarı saydam kare yok |
| 30,8–32,8 | 2 kare | A3 ölçütü; 32,4'ten sonra kare bugünkü 32,5 ile aynı yerleşim |
| 33–41 ve 41–47,4 | 6 kare | Halka 34,5; madalya iniyor; beş adım; sıçrayan nokta; duruşlar |
| 47,3–54 | 4 kare | Zemin kayıyor; altın nokta düşüyor; etiketler tek dizgi |
| 56–62 | 3 kare, son 1 sn her kare | 57,2'de çizgi aralığı 56,2'dekinin ≥ 2 katı; her düzeyde yavaşlama; okuma yerinde |
| 61,6–64,0 | her kare | Art arda kareler tutarlı; noktalar 9,784'e toplanıyor |
| 63,9–67,3 | 5 kare, kırpma `1400:480:260:400` | Noktalar çizgiye dönüşüyor, erime yok |
| 67,8–72,3 | 2 kare | Kart, maskeli satırlar, modelin ortası sonradan |

Sayısal denetimler: (1) hareketsiz aralıklar: `HYPERFRAMES_SKILL_BOOTSTRAP_DEPS=1 HYPERFRAMES_SKILL_PKG_VERSION=0.8.149 TMPDIR=<karalama> node ~/.claude/skills/hyperframes-animation/scripts/animation-map.mjs . --out <karalama>/anim` çıktısındaki tween'lerden (`sal` ve 6 sn'den uzun olanlar hariç) ≥ 1,6 sn boşlukları say: hedef 2 (bugün 5). Araç 0,1 sn'den kısa tween'leri atlar; LED anlarını elle ekle. (2) `back.out` 0; `ease:` değerlerinin hepsi `E.` ya da `"none"`. (3) Yazı kuralı: her yeni ya da zamanı değişen yazı için görünme süresi ≥ kelime × 0,3 + 0,5.

Belirlenimlilik: (1) `Math.random`, `Date.now`, `performance.now` aranır: 0. (2) Aynı an iki yoldan alınır ve dosyalar karşılaştırılır (`md5 -q`): `snapshot --at 12.4,31.6,58.9,62.7,66.0` ile `snapshot --at 66.0,62.7,58.9,31.6,12.4` (geri sarma) ve `--at 70,31.6`; beş anın görüntüsü üç çağrıda da özdeş olmalı. Her çağrı `--no-browser-gpu` ile. (3) Taslak işleme iki kez alınmaz; (2) yeter.

## 6. Riskler ve açık kararlar

Kullanıcının kararı gerekenler (varsayılan: onay yoksa parantezdeki uygulanır, plan aksamaz):

- **K1 · Çekme bulanıklığı (satır 8, 14).** `STORYBOARD.md` "Hareket ilkeleri" "hareket bulanıklığı yok" diyor; gerekçesi temas anı. Öneri ilkeyi "koşucularda ve bitiş anında yok"a daraltır. (Onay yoksa: uygulanmaz; satır 7 `power2.inOut` ile yürür.)
- **K2 · En derin düzey 7,3 → 6.** Ekrandaki en uzun sayı "9,7840000005" yerine "9,784000005", gösterge "0,000000001 sn"de biter. `STORYBOARD.md` listesi "…" ile açık uçlu; yine de ekrandaki sayı kümesi değişir. (Varsayılan: 6.)
- **K3 · Altın okuma yazı kuralına uygun mu.** Yeri sabit, içeriği her düzeyde bir hane uzayan tek yazı sayıldı; son değer 0,95 sn durur. (Varsayılan: uygula.)
- **K4 · Kapanış kartı.** Sözcükler aynı; model üç parçada gelir ve "9,7845"in arkasından altın vurgu geçer. (Varsayılan: uygula.)
- **K5 · Çıktı adı.** v1 karşılaştırma için kalsın mı? (Varsayılan: `renders/c4-fotofinis-v2.mp4`; v1'e dokunulmaz.)
- **K6 · Ses efekti ve müzik.** Bu planda yok; ayrı onay ister (ücretli ya da dış kaynak). Onaylanırsa işaret anları hazır: 2,60 ışık · 8,62 flaş · 15,7 ve 16,25 LED · 22,3–24,9 tarama · 30,95 itiş · 47,85 ve 51,5 yakınlaşma · 56,2–61,5 dalış · 63,9–67,1 dolma · 68,1 kart.
- **K7 · Alt kompozisyonlara bölme.** Öneri: bölünmesin. Film tek kamera ve tek durum nesnesi; bölmek geçişleri (A3) zorlaştırır. Bedeli: dosya uzunluğu uyarısı sürer.
- **K8 · Tüm filme deklanşör bulanıklığı** (120 kare/sn işleyip `tmix` ile 30'a indirmek). Öneri: hayır (işleme 4 kat uzar, okunacak yazıyı da bulandırır).
- **K9 · Koşucu öbeği.** `BAS` aralıkları 2 katına çıkarılırsa koşucular başta ayrışır, çizgide gerçek farklara toplanır. Küçük; istenirse A2'ye eklenir.

Riskler: S4'te SVG köküne CSS dönüşümü `check`'in yerleşim denetimini tetikleyebilir (çare: `data-layout-allow-overflow`). Tam kadraj SVG bulanıklığı işlemeyi yavaşlatabilir (K1, yalnız 1,75 sn). S3'te koniler pistin üstünde 44 px kayar; kadrajı A2'de gözle doğrula. Satır 3'te `#los` koşuculardan önce çizilmezse koşucuları da karartır. Satır 26'da hane genişliği yanlış ölçülürse 53,0'daki devirde etiket 1–2 px sıçrar (A5 ölçütünde bak). F4'teki iki LED anı (27,0 ve 30,2) eskisi gibi ±0,2 sn belirsiz.

Doğrulayamadıklarım: (1) Film oynatılmadı; akıcılık ve titreşim yargıları kare dizilerinden ve hız hesabından. F8'in 2 düzey/sn hızı art arda karelerde tutarlı göründü, oynatmada doğrulanmadı. (2) Cümle içindeki kelime anları: yalnız `olcum.json` sessizlikleri var; "tahmin" yazanlar ±0,4 sn kayabilir. (3) Koşu döngüsünde ayak kayması ölçülmedi (formülden duruş başına ≈ 20 px çıkıyor). (4) `check` bu oturumda çalıştırılmadı; "geçiyor" bilgisi `C4-fotofinis.md`'den. (5) `references/motion-blur.md` motorun `motionBlur` işleme seçeneğinden söz ediyor; `render --help` (0.8.149) ve `hyperframes-cli` skill'inde karşılığını bulamadım; plan ona dayanmıyor. (6) `snapshot`'ın `--at` sırasını koruyup korumadığı denenmedi. (7) Plex Sans rakamlarının eş genişlikli olup olmadığına bakılmadı; bu yüzden hane hane çizim. (8) `check`'in hareket denetiminin yeni dönüşümlere tepkisi bilinmiyor.

Kayıt defterine bakıldı (`npx hyperframes catalog --query … --json`), hiçbiri alınmıyor: `motion-blur` (DOM `transform` okur; koşucular SVG özniteliği, doğru tuval), `zoom-through-transition` (iki ayrı kart arasında; burada aynı cetvel sürmeli), `grain-overlay` (hareketli gren; `frame.md` durağan diş), `number-wheel` (dönen rakam; `frame.md` "LED çevrilmez, yanar"), `camera-shake` (`frame.md` "kamera yaylanmaz"), `editorial-flash-overlay` ve `vignette` (mevcut üç satır yetiyor).

## 7. Kapsam dışı

Ses (yeniden okuma, zamanlama, müzik, efekt), senaryo, sayılar ve ekrandaki sözcükler; koşucuların ve kulvarların yeniden çizimi, Lottie karakter, 3B kamera, shader geçişleri; `ortak/`, `araclar/`, öteki hikâyeler; altyazı (`.vtt`), derse bağlama, `HIKAYE-ANIMASYONLARI.md` bölüm 4'ün eşitlenmesi, yayın, commit ve push.
