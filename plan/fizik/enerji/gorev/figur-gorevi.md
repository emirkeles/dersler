# Görev: bir izometrik figür yap (Fizik · Enerji)

Proje kökü: `/Users/emirkeles/matematik-sayilar` (Türkçe; saf HTML/JS/SVG, bağımlılıksız statik site). 9. sınıf fizik derslerinin deney düzenekleri "anatomy" skill'iyle (izometrik, çok parçalı SVG) çizilir ve ders motoruna bağlanan bir JS modülü olarak üretilir. İlk figür (Ş2, ikiz ısıtma düzeneği) bitti; bu görev aynı yolla bir sonrakini yapar. Yeniden keşfetme: Ş2'nin dosyaları örnektir.

## Önce oku (sırayla)
1. `plan/fizik/enerji/IZOMETRIK.md`: bölüm 4 (projeye uyum), 5 (dosya düzeni), **6b (arayüz sözleşmesi; kendi figürünün satırı bağlayıcıdır)**, 7 (bitiş ölçütleri).
2. `plan/fizik/enerji/sekil/parcalar.mjs` baş yorumu (ilk 40 satır) ve kullanacağın parçaların imzaları (`grep -n '^export' plan/fizik/enerji/sekil/parcalar.mjs`): `atolye`, `tabanPlakasi`, `beher`, `icerikSutunu`, `termometre`, `statif`, `tahtaCss`, `siviCss`, `kitCss`, `sayfaYaz`, `dersModuluYaz`, `kadrajOf`.
3. Örnek figür: `plan/fizik/enerji/sekil/s2-isitma/build.mjs` (yapı: dünya, kamera, parçalar, yuvalar, `yerles`, sayfa ve modül üretimi), `ciz.js` (sayfa ve ders modülünün ortak canlı çizim kodu: `cizimKur(kok, D)` → `{ arayuz, yer(ad) }`), `deneme-ders.js` (modülü ders motorunda deneyen geçici ders). Üretilmiş modülün baş yorumu: `head -c 5000 fizik/enerji/dersler/isitma-sekil.js`.
4. Skill: `~/.claude/skills/anatomy/SKILL.md` (tamamı); `references/craft.md` bölüm 1–8 ve 10; `references/kit.md` bölüm 1–8 ve 10–12; `references/verify.md` (Capture, Drive, Line ends, Audit, Close-ups, review checklist, Common faults). `webgl.md`, `3d.md`, `react.md` okunmaz. Büyük dosyaları bölüm bölüm oku.
5. Figürün derste nasıl kullanılacağı: görev iletisindeki senaryo dosyasında `grep -n '^Figür:'` ile figürün geçtiği sahnelere bak (her birinden 3–6 satır yeter): hangi ayarlar, hangi noktalar, hangi kadraj isteniyor.
6. `ortak/API.md` (ders motoru: tahta 1000 × 562, `c.S`, `c.tween`; görsel dil: degrade ve parlama yok).

## Kurallar
- Figür yalnızca **gösterir**: ayar çağrıları anında uygulanır; kendi başına hareket etmez. Ders modülünde kart, kendi döngüsü, `requestAnimationFrame`, zamanlayıcı, CSS animasyonu ve yazı (`<text>`) olmaz. Tek başına sayfa skill'in kartıyla ve küçük bir gösteri turuyla olabilir (denetimler için).
- Arayüz sözleşmedeki gibidir: `<AD>.kur(c, svg, { x, y, h })`, sözleşmedeki ayar işlevleri, `f.nokta(ad)`, `f.gorunur(ad)`, `f.bak(kutu)`, `<AD>.kadraj`, `<AD>.oran`, `<AD>.sabit`. Sözleşmedeki her nokta ve kadraj adı bulunmalı. Sözleşmede eksik ya da uygulanamayan bir şey varsa en yakın çözümü uygula ve raporla; `IZOMETRIK.md` dosyasına dokunma.
- Ortak parçalar `parcalar.mjs` içinden kullanılır (aynı termometre, beher, plaka, statif bütün figürlerde aynı görünür). **`parcalar.mjs` ve `kit/` dosyalarını değiştirme** (aynı anda başka figürler de onları kullanıyor); eksik parçayı kendi klasöründe yaz ve raporla.
- Renk: figür tek tonludur; renk yalnızca konunun kendisi olan üç şeydedir ve `parcalar.mjs` içindeki tahta tonlarından gelir: termometre sütunu sarı (`var(--c5)`), su mavi tonlu (`var(--c1)`), alev ve ısı kaynağının kızgın yüzeyi turuncu (`var(--c2)`). Kendi figüründe başka renk kullanma; ısı kaynağı için `.ip-isi` sınıfını kullan (tahta tonlarında turuncu, tek başına sayfada `lit`). `tahtaCss` bu görev sürerken güncelleniyor olabilir: iş bitmeden önce son bir kez yeniden derle.
- Termometre düşey durur; sütunun boyu sıcaklıkla doğru orantılıdır (–20 … 120 °C). Aynı figürdeki termometreler aynı ölçektedir.
- Ayrıntı düzeyi skill'in istediği gibidir (vida, ayak, etiket plakası, cetvel şeridi; her parça başka bir parçanın üstünde durur; her çizgi bir şeyde biter). Kitabın ya da senaryonun saymadığı bir fizik ögesi eklenmez (ek ölçü aleti, ek ısı kaynağı gibi); eklenenler düzeneği taşıyan parçalardır.
- Modül 300 KB'ı aşmasın (`dersModuluYaz` aşılırsa hata verir). Tahtadaki etiketler en az 24 birimdir (deneme dersinde de).

## Dosyalar (yalnızca bunlara yaz)
```
plan/fizik/enerji/sekil/<klasör>/        build.mjs, ciz.js, canli.js (isteğe bağlı), deneme-ders.js, üretilmiş <ad>.html ve <ad>-light.html
fizik/enerji/dersler/<ad>-sekil.js       ÜRETİLMİŞ modül: window.<AD>
```
Klasör, dosya ve modül adı görev iletisindedir. Üretilmiş modülün baş yorumu arayüzü tam yazsın (ders yazan ajanlar modülün gövdesini okumayacak, yalnızca bu yorumu): ayarlar, değer aralıkları, başlangıç durumu, nokta adları ve etiketin nereye konacağı, kadraj kutuları, tuzaklar.

## Doğrulama (hepsi sağlanmadan bitmiş sayma; sağlanamayanı açıkça raporla)
- Chrome: `export CHROME_PATH="$(find ~/.cache/hyperframes/chrome -type f -name chrome-headless-shell | head -1)"`.
- `node build.mjs --audit` ve `node build.mjs --light --audit`: `audit passed`.
- `node ~/.claude/skills/anatomy/scripts/lines.mjs <sayfa>` iki temada ve her dinlenme pozunda `line ends: 0`.
- Görüntüler (`scripts/capture.mjs`, `scripts/drive.mjs`): masaüstü ve her birleşimin 4× yakın çekimi. Ürettiğin her PNG'ye bak.
- Ders motorunda deneme: geçici bir ders yaz (`fizik/enerji/<p-kodu>-<ad>-deneme.html` ve `fizik/enerji/dersler/<p-kodu>-<ad>-deneme.js`; kod görev iletisinde; iskelet `s2-isitma/deneme-ders.js`; sayfa sırasıyla `../../ortak/ders.js`, `dersler/kit.js`, `dersler/<ad>-sekil.js`, deneme dosyasını yükler). İki üç sahnede bütün ayarları, bütün noktaları (her birine 24 birimlik düz bir etiket bağla) ve bütün kadrajları gezdir; senaryodaki gerçek kullanımlardan en az ikisini aynen kur. Sonra proje kökünden:
  `node araclar/olc.js enerji/<p-kodu> --goruntu "$(mktemp -d)" 2>&1 | tail -20` ve `--boyut 750x402` ile bir kez daha. "yerleşim" ve "bütçe" sayaçları 0, "konsol temiz" olmalı. Karelere bak: figür `tum` kadrajında tahtada okunuyor mu, etiketler doğru yere düşüyor mu, hareket eden parça görünür biçimde değişiyor mu. **Deneme dersinin iki dosyasını iş bitince sil** (temanın denetimi fazladan dosya istemez); kaynağını `plan/fizik/enerji/sekil/<klasör>/deneme-ders.js` olarak sakla.
- Zaman: `date` ile başla; ilk yarım saat dolmadan tarayıcıda açılan bir sayfa olsun, sonra derinleştir.

## Ş2'yi yapanın notları
- Süre: 131 katılı Ş2 yaklaşık 45 dakika sürdü; ortak parçalar hazır. Bir derleme ve denetim birkaç saniye.
- Kit modüle gömülmez. Canlı kod yalnızca `translate(0 dz·uz)`, bir noktaya göre `scale` ve aç/kapat yazar; dönen ibre iki taban vektörüyle hesaplanır. Modülü küçük tutan budur.
- Özdeş kopya: aynı parçanın ötelenmiş ikincisi, ilkinin SVG'sinin `translate` ile ikinci kez konmasıdır (izometrik izdüşümde dünya ötelemesi ekran ötelemesidir); denetim için ikisi de gerçekten kurulur.
- Tuzaklar: `.iso-solid[data-lit]>.iso-fill` kitin kuralıdır ve düşük özgüllüklü kendi kuralını ezer (uzun seçici yaz). `data-grup` ve `data-name` kopyalanan parçada öneksiz olmalı (`katman(bant, { ad })`). Tek parçalı kısa çentik düz olmalı; eğri çentikte `lines.mjs` iki ucun da bir çizgide bitmesini ister. `seated` / `cut` ile oyulan parça kayıtlı bir şekle oyulmalı. `G.disc` ve `ringBand` varsayılan adım sayısı en az 32'dir; küçük disklerde `steps` verilmezse her biri 2,5–3 KB tutar. Arkada kalan parça öndekinin tam arkasına düşüp kaybolabilir: parçayı biraz döndür ya da kaydır.
- Kayıtsız içerik (sıvı, sütun, alev, ibre, kabarcık) yuvalarda çizilir; sıraları `T.once` ile güvenceye alınır.
- Bir kabın içindeki termometrenin alt kısmı iki kez çizilir: sıvı tonlu kopya ve kendi tonlu kopya; iki kırpma aynı yoldur, düşeyde kayar.
- Tek başına sayfada `#poz` ile dinlenme pozu kurulur; `lines.mjs` ve `capture.mjs` `file://…#poz` adresini kabul eder.
- Tahtada `tum` kadrajında termometre küçük kalır (Ş2'de 1366×657'de 1 °C yaklaşık 0,66 px). Figürünü, izlenecek parça (sütun) tahtada olabildiğince büyük kalacak biçimde kur: gereksiz genişlikten kaçın, kutuyu doldur; termometreyi gerçek ölçüsünden uzun ve kalın çizebilirsin (gösteri termometresi).

## Sınırlar
- Yalnızca yukarıdaki yollara yaz. `ortak/`, `araclar/`, `index.html`, `fizik/enerji/tema.js`, `fizik/enerji/dersler/kit.js`, öteki ders ve figür dosyaları, `plan/` altındaki öteki dosyalar, `TASKS.md` ve git (add, commit, stash, checkout) yasak. Aynı klasörde başka ajanlar çalışıyor.
- Bu makinede `timeout` komutu yok; `sed -i` boş ek ister. Komut çıktısını kısa tut. Alt ajan açma; işi kendin bitir.

## Rapor
Yazılan dosyalar ve boyutları; parça sayısı; süre; her doğrulama satırının sonucu (aynen); modülün arayüzü (baş yorumun kopyası; kadraj ve sabit değerleriyle); kendi klasöründe yazdığın, ortak dosyaya taşınmaya değer parçalar; sözleşmeden her sapma ve nedeni; senaryonun figürden istediği ama karşılanamayan her şey; yapılamayan ya da kuşkulu kalan her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
