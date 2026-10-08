# Senaryolar — Konu K · Viskozite

Yazıldı: 8 Ekim 2026. Dayanak: `../MUFREDAT.md` KİM.9.2.11, `../PLAN.md` bölüm 3 (K1, K2), bölüm 7 (karar 3, 15) ve bölüm 8 ("K · Viskozite"). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-metalik-bag.md` örneğindeki gibidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (OH "o ha", °C "derece", 10⁻³ "on üzeri eksi üç"; tablo başlığındaki birim okunmaz).
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Veri bir durumun içinde sunulur ("bir laboratuvar ölçmüş", "bir grup öğrenci denedi").
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Fikir birkaç parçadan oluşuyorsa 3–6. adımlar her parça için yinelenir.
- Sürükle-bırak, eşleştirme ve sıralama sahneleri kart başına seçimle kurulur (kitteki `sinifla` aracı): kart öne çıkar, öğrenci kutuyu seçer, kart tahtada yerine oturur; geri bildirim her kartın altına düşer. Bu dosyada `c.drag`, `c.match`, `c.sort` yoktur. Benzetimde `c.slider`, `c.choice` ve bir düğme (`c.h('button')`) kullanılır.
- Renkler tema boyunca aynıdır: artı yük turuncu, eksi yük mavi, çekme yeşil, itme kırmızı. Bu konuda yük çizilmez; moleküller arası çekim (hidrojen bağı) yeşil kesiktir. Sıvılar nötr açık tonlarda çizilir (her sıvı ayrı açık ton; renk anlam taşımaz; mavi yalnızca eksi yüke ayrılmıştır, su da açık gri-yeşil tonda çizilir). Seçilmiş sıvıyı ya da tüpü işaretlemek için kalın çerçeve kullanılır, renk değil.
- Viskozite sayıları kitaptaki tek tablodan gelir; tahtaya tek üsle yazılır (tablo başlığı "Viskozite, 20 °C · 10⁻³ Pa·s"): su 1,01 · etil alkol 1,20 · propanol 1,94 · etilen glikol 19,83 · gliserin 1490 (kitapta 1,49 Pa·s) · zeytinyağı 81 · bal 2000–10000 (kitapta 2–10 Pa·s). Birim yalnızca tablo başlığında görünür; hiçbir altyazıda anılmaz ve tanımlanmaz.
- Benzetimde süre ya da yol için sayı uydurulmaz. K1'de süre gösterilmez: akışın sonucu lekenin büyüklüğüdür ve lekelerin sırası Tablo değerlerinin sırasından türetilir (yarıçaplar ekranda sayı olarak yazılmaz, yalnızca sırayı taşır). K2'de bilyenin 10 saniyedeki yolu kitabın şeklinden okunan bölme sayısıdır (her bölme 2 cm); okuma yaklaşıktır ve altta ayrıntısı vardır.

Çizim araçları (kit için; konunun araç dosyası `dersler/k-araclar.js`, `window.KIT_K`):

- `buret(opts)`: özdeş büret ve musluk; sıvının adı ve açık tonu, sıvı düzeyi, altında yere düşen leke. Seçenekler: `leke` (1–5; yalnızca büyüklük sırasını taşır: 1 en iri), `ac()` (musluk açılır, aynı sabit süre sonra kapanır; leke büyür). Birden çok büret aynı anda `ac()` ile açılır. Lekenin yanında yarıçap çizgisi (kesikli) olabilir; sayı yazılmaz.
- `yapi(sivi)`: sıvının yapı formülü, kitaptaki dizilişle (su H–OH; etil alkol CH₃–CH₂–OH; propanol CH₃–CH₂–CH₂–OH; etilen glikol CH₂–CH₂ ve altında iki OH; gliserin CH₂–CH–CH₂ ve altında üç OH; propilen glikol CH₃–CH–CH₂ ve altında iki OH). OH grupları koyu çerçevede; `vurgula('OH')` çerçeveleri açar ve yanda sayı rozeti (1, 2, 3) belirir.
- `viskTablo(satirlar)`: iki sütunlu tablo (sıvı · viskozite); satırlar tek tek ya da hepsi birden açılır; başlıkta birim yazılıdır.
- `kayma(opts)`: sıvı kesiti; iki katman molekül (üst ve alt, nötr gri daireler ya da kısa çubuklar). `bag` seçeneği (0–3): katmanlar arasında yeşil kesikli hidrojen bağı çizgisi sayısı. `hiz` seçeneği (`yavas`, `orta`, `hizli`): üst katman sağa kayar; hareket izi uzunluğu hıza göre (yalnızca üç düzey, sayı yok). Üst katmanı iten oku ve "kayma" etiketi var.
- `bisiklet()`: sade bisiklet çizimi, el freni vurgulu (fren sıkı: ok kısa; fren yok: ok uzun).
- `tup(opts)`: özdeş deney tüpü. Tüp dıştan 10 bölmelidir; sıvı yüzeyi 2. bölme çizgisindedir; yanda bölme çizgileri ve "1 bölme = 2 cm" etiketi. Seçenekler: sıvı (ad, açık ton), sıcaklık etiketi (alt köşede, "25 °C" gibi), `bolme` (bilyenin sıvı yüzeyinden aldığı yol: 1, 2, 4, 7; 0–8,5 arası), `dibe` (bilye tüpün dibinde), `birak()` (bilye yüzeyden iner; animasyon hızlandırılmıştır, köşede "10 s" sayacı 0'dan 10'a sayar, sayaç kitabın verdiği sabit süredir), `isaret(bolme)` (bilyenin son konumunu ölçekte işaretleyen kısa çizgi ve "yol" oku). Bilye çelik gri.
- `deneyTablosu()`: satır ekleyen tablo (sütunlar: Tüp · Sıvı · Sıcaklık · Bilyenin yolu: bölme, cm). "Tabloya yaz" düğmesi `c.h('button')` ile kurulur; aynı tüp ikinci kez yazılamaz. `dibe` satırında yol hücresi "dibe ulaştı" yazar.
- `yolGrafik(noktalar)`: dağılım grafiği. Yatay eksen "Sıcaklık (°C)", dikey eksen "Bilyenin yolu (cm)" (0–18). Üç sıvı üç işaret biçimiyle (daire, kare, üçgen) ve sıvı adıyla çizilir; aynı sıvının iki noktası ince düz çizgiyle birleşir ve çizginin ucunda yalnızca yön oku (→) durur; iki nokta arasında okunacak değer yoktur (ara sıcaklıkta nokta, değer ya da etiket yazılmaz). `dibe` noktası yukarı oklu ve "dibe ulaştı" etiketlidir.
- `sorukarti`, `sinifla`: kitte var. `sinifla` kart başına kutu seçimi kurar.
- Kaydırıcılar iki konumludur (`min: 0`, `max: 1`, `step: 1`; `fmt` ile sıcaklık etiketi). Sıvı değişince kaydırıcının iki etiketi yeniden yazılır: propil alkol "25 °C" / "30 °C"; propilen glikol "15 °C" / "25 °C"; gliserin "25 °C" / "60 °C". Ara sıcaklıkta durmaz.

## K1 · Viskozite: akmaya karşı direnç

- **Fikir:** Viskozite, sıvının akmaya karşı gösterdiği dirençtir; akışkanlıkla ters yönde değişir. Saf sıvılar arasında fark vardır: su, etil alkol ve propanol kolay, etilen glikol zor, gliserin çok zor akar. Bu örüntü, moleküller arası etkileşimle açıklanır: hidrojen bağı sayısı arttıkça moleküller birbirinin üzerinden zor kayar.
- **Giriş ekranı sorusu:** Bal kavanozdan neden sudan çok daha yavaş akar?
- **Kaynak:** Ders kitabı s. 187 (viskozite ve viskoz sıvı tanımı; sıvıların akışkan olma nedeni taneciklerin birbiri üzerinde kayması; bisiklet el freni benzetmesi; viskozitesi yüksek sıvının akmaya direnci yüksek, akışkanlığı düşüktür; Tablo 2.6: su 1,01·10⁻³, bal 2–10, zeytinyağı 81·10⁻³, pekmez 5–10, aseton 0,316·10⁻³, etanol 1,20·10⁻³, propanol 1,94·10⁻³, benzen 0,625·10⁻³, karbon tetraklorür 0,969·10⁻³, etilen glikol 19,83·10⁻³, gliserin 1,49; Etkinlik 2.23: özdeş büretlerde su, zeytinyağı ve bal, muslukların aynı anda kısa süre açılıp kapatılması, damla yarıçapları r₁ > r₂ > r₃, şekilde su, zeytinyağı, bal sırasıyla), s. 188 (günlük hayat: domates sosunun şişeden çıkması, bal, pekmez, şampuan; viskozitesi çok yüksek sıvının şişeden akma süresi uzundur, akan kısım şişede kalandan zor kopar; viskozite düşükse miktar kontrolü zorlaşır; Etkinlik 2.24'teki gliserin molekülleri arasındaki hidrojen bağı şekli), s. 189 (moleküller arası etkileşim türü ve kuvveti akışkanlığı belirler; su ve gliserin ikisinde de hidrojen bağı vardır, sayı ve kuvvet farklıdır; aynı sürede akan hacim ya da akma süresi ölçülebilir), s. 190 (yapı formülleri: su H–OH, etil alkol CH₃–CH₂–OH, propil alkol CH₃–CH₂–CH₂–OH, etilen glikol CH₂–CH₂ ve altında OH OH, gliserin CH₂–CH–CH₂ ve altında OH OH OH), s. 191 (etkileşim büyükse akışkanlık azalır, viskozite artar; hidrojen bağı sayısı arttıkça moleküller birbirinin üzerinden kolayca kayamaz; gliserinde hidrojen bağı sayısı su ve etilen glikolden fazla). Hidrojen bağı için F–H, O–H, N–H bağı (G4) ve etkileşim güçlendikçe kaynama noktasının yükselmesi (J2) önceki derslerdendir.
- **Sınır:** Yalnızca viskozite, akışkanlık ve etkileşim. Birim "Pa·s" tablo başlığında görünür, tanımlanmaz. Yok: Newton tipi akışkanlar, viskozimetre adları (Ostwald), molekül biçimi ve mol kütlesiyle ilişki, hidrokarbon tablosu (Tablo 2.7), motor yağı ve sınıfları (s. 186), karşılaştırmada aseton, benzen, karbon tetraklorür, pekmez. Etil alkol ile propanol arasındaki küçük fark ve su ile bir OH'lu alkoller arasındaki fark açıklanmaz; kitap bunu mol kütlesine bağlar (s. 191), program kapsamı dışıdır. Derste bu üç sıvı "birbirine yakın" diye anılır.
- **Güç kavramlar ve gösterimi:** (1) Akışkanlık ile viskozite zıt yönde: bal–su çiftinde iki ok (direnç, akış), bisiklet freni ile bağlanır; en sonda "viskozite büyükse akışkanlık küçük" cümlesi tahtaya düşer. (2) Gözlemden sıralamaya: büretten akıp yere yayılan leke; leke büyük → aynı sürede çok aktı → akışkan → viskozitesi küçük; her adım okla bağlanır. (3) OH sayısı ile viskozite örüntüsü: beş yapı formülü yan yana, OH grupları çerçeveli; rozetler 1·1·1·2·3. (4) Neden: iki katman molekül, aralarında 1, 2, 3 yeşil kesikli çizgi (hidrojen bağı); çizgi sayısı arttıkça üst katmanın kayması yavaşlar.
- **Hedeflenen yanılgı:** "Viskozitesi büyük sıvı daha kolay akar" (ters kurma) ve "iki sıvıda da hidrojen bağı varsa akışkanlıkları aynıdır".
- **Akılda kalıcı cümle:** Viskozite arttıkça akışkanlık azalır.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. İki sıvı aynı dış basınçta kaynıyor; birinin molekülleri arasındaki etkileşim daha kuvvetli. Hangisi daha yüksek sıcaklıkta kaynar? **Etkileşimi kuvvetli olan** / Etkileşimi zayıf olan / İkisi aynı sıcaklıkta kaynar. (J2) Yanlışta: "Etkileşim güçlendikçe moleküller zor ayrılır; kaynama noktası yükselir."
2. Hangi bağ, hidrojen bağı kurulabileceğini gösterir? **O–H** / C–H / S–H. (G4, daha eski) Yanlışta: "F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir."

Sonra: "Bugün sıvıların ne kadar kolay aktığına bakacağız."

### Sahne 2 · Bal ve su: viskozite

Tahta: iki özdeş eğik kap yan yana, aynı eğimde: solda su, sağda bal. İkisi aynı anda eğilir; su hemen akar, bal kalın bir iplik gibi çok yavaş uzar. Altlarında etiketler "su", "bal". Sonra tahtaya "viskozite = akmaya karşı direnç" çerçevesi gelir. Ardından iki küçük çubuk çifti: balda uzun "direnç", kısa "akış"; suda kısa "direnç", uzun "akış".

Anlatım:
1. Süt, su, bal, pekmez, zeytinyağı: hepsi akar.
2. Aynı koşulda hepsi aynı kolaylıkla akmaz.
3. Bal, sudan çok daha yavaş akar.
4. Sıvının akmaya karşı gösterdiği dirence viskozite denir.
5. Viskozitesi büyük sıvıya viskoz sıvı denir.
6. Bal çok direnir: viskozitesi büyüktür.
7. Akması kolay sıvının akışkanlığı büyüktür.

Soru (`tag: 'Sıra sende'`): Aynı koşulda su ile bal karşılaştırılıyor. Hangisinin viskozitesi büyüktür? **Balın** / Suyun / İkisinin eşit. Dayandığı anlatım: 3–6. İpuçları: "Viskozite akmaya karşı dirençtir." · "Hangisi daha zor akıyor?"

Sonra:
8. Direnç büyükse akışkanlık küçüktür: ikisi ters yöndedir.

Defter ("Viskozite ve akışkanlık"): **Viskozite arttıkça akışkanlık azalır.** Örnek: bal, su.

### Sahne 3 · Akış: tanecikler birbiri üzerinde kayar

Tahta: sıvı kesiti, iki sıra tanecik (üst ve alt katman). Üst katman sağa kayar; solda taneciklerin hareket izi uzun ("hızlı kayma"), sağda kısa ("yavaş kayma"). Altta bisiklet çizimi: el freni sıkı (fren çizgisi vurgulu), bisiklet çok az ilerler.

Anlatım:
1. Sıvı akarken tanecikleri birbirinin üzerinde kayar.
2. Taneciklerin kayması hızlıysa sıvı kolay akar.
3. Kayma yavaşsa sıvı akmaya direnç gösterir.
4. El freni çekili bisiklet zor ilerler.
5. Viskoz sıvıda tanecikler de böyle zor kayar.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir sıvının tanecikleri birbirinin üzerinde çok yavaş kayıyor. Bu sıvı için hangisi doğrudur? **Viskozitesi büyük, akışkanlığı küçüktür** / Viskozitesi küçük, akışkanlığı büyüktür / Viskozitesi ve akışkanlığı büyüktür. Dayandığı anlatım: sahne 2, 4–8; bu sahne, 1–5. İpuçları: "Yavaş kayma, akmaya karşı büyük direnç demektir." · "Direnç büyükse akışkanlık ne olur?"

Sonra:
6. Yavaş kayan taneciklerin sıvısında viskozite büyük, akışkanlık küçüktür.

### Sahne 4 · Aynı sürede kim ne kadar akar?

Tahta: üç özdeş büret yan yana (su, zeytinyağı, bal), hepsi aynı düzeyde dolu; her büretin altında yer düzlemi. Üç musluk aynı anda kısa süre açılır, kapanır. Sıvılar akıp yere yayılır: su en geniş leke (r₁), zeytinyağı daha küçük (r₂), bal en küçük (r₃); lekelerin içinde kesikli yarıçap çizgileri. Büret düzeylerinden su en çok inmiştir. Sonra lekelerin altında sırayla üç satır belirir: "akışkanlık: en çok, orta, en az"; ardından "viskozite: en az, orta, en çok". Son adımda tablo gelir: su 1,01 · zeytinyağı 81 · bal 2000–10000 (başlıkta birim).

Anlatım (baştan sona çözülmüş örnek):
1. Özdeş üç büretin içinde su, zeytinyağı ve bal var.
2. Muslukları aynı anda kısa süre açıp kapatıyoruz.
3. Akan sıvı yere yayılıp bir leke bırakır.
4. Su en geniş, bal en küçük lekeyi bıraktı.
5. Aynı sürede en çok su aktı: en akışkan o.
6. En az bal aktı: en az akışkan o.
7. Viskozite bunun tersidir: önce bal, sonra zeytinyağı, sonra su.
8. Bir laboratuvar bu üç sıvının viskozitesini 20 °C'ta ölçmüş.
9. Ölçülen değerler bu sıralamayı doğrular.

Birlikte çöz (`tag: 'Birlikte çöz'`): iki büret, etil alkol ve etilen glikol; leke yarıçapları gizli. Yanında satırlar: "Viskozite (20 °C): etil alkol 1,20 · etilen glikol 19,83" (başlıkta birim); "1. Viskozitesi büyük olan: etilen glikol" dolu; "2. Aynı sürede daha çok akan: ?" boş. Aynı sürede hangi sıvı daha çok akar? **Etil alkol** / Etilen glikol / İkisi aynı miktarda. Dayandığı anlatım: 5–7. İpuçları: "Viskozitesi küçük olan daha kolay akar." · "19,83 ile 1,20'yi karşılaştır; büyük olanda direnç büyük."

Gör: iki leke belirir; etil alkolünki geniş, etilen glikolünki belirgin küçük.

Sonra:
10. Viskozitesi küçük olan sıvı, aynı sürede daha çok akar.

Soru (`tag: 'Sıra sende'`; yeni durum): Dört özdeş büretin muslukları aynı anda açılıp kapatıldı. K sıvısı en küçük lekeyi bıraktı. K sıvısı için hangisi doğrudur? **Dördü arasında viskozitesi en büyüktür** / Dördü arasında viskozitesi en küçüktür / Dördü arasında akışkanlığı en büyüktür. Dayandığı anlatım: 4–7. İpuçları: "En küçük leke, aynı sürede en az akmak demektir." · "En az akan sıvıda direnç en büyüktür."

### Sahne 5 · Günlük hayatta viskozite

Tahta: üç küçük çizim yan yana: ters çevrilmiş domates sosu şişesi (sos çıkmıyor, ucu şişede asılı), şampuan şişesi, bir kavanozdan akan bal. Altlarında iki kutu: "viskozitesi çok yüksek", "viskozitesi düşük".

Anlatım:
1. Viskozite günlük hayatta da işe karışır.
2. Domates sosunun şişeden çıkışını viskozite belirler.
3. Viskozitesi çok yüksek sıvı şişeden uzun sürede akar.
4. Akan kısım, şişede kalandan zor kopar.
5. Viskozitesi düşük sıvıda miktarı ayarlamak güçleşir.

Dene (kart başına seçim; `tag: 'Sınıflandır'`; seçenekler iki kutunun adı; kart doğru kutuya oturunca altına cümle düşer):
- "Şişeden akması uzun sürer" → **viskozitesi çok yüksek**. "Direnci büyük; akışkanlığı küçük."
- "Akan kısım şişede kalandan zor kopar" → **viskozitesi çok yüksek**. "Tanecikler zor kayar; akış kesilirken de direnir."
- "Dökülen miktarı ayarlamak güçtür" → **viskozitesi düşük**. "Çok kolay akar; miktar kontrolü zorlaşır."
- "Şişeden çabucak boşalır" → **viskozitesi düşük**. "Akışkanlığı büyük; akma süresi kısa."

Dayandığı anlatım: 3–5; sahne 2, 3–8.

Sonra:
6. Viskozite, sıvıların nasıl akıp döküldüğünü belirler.

### Sahne 6 · Beş saf sıvı, aynı büret

Tahta: beş özdeş büret yan yana: su, etil alkol, propanol, etilen glikol, gliserin (adları büretlerin üstünde); hepsi aynı düzeyde dolu. Altlarında yer düzlemi. Sağda boş iki sütunlu tablo ("Sıvı · Leke"). Yapı formülleri bu sahnede yoktur (sahne 7).

Anlatım:
1. Şimdi beş saf sıvıyı aynı koşulda deneyelim.
2. Su, etil alkol, propanol, etilen glikol ve gliserin.
3. Muslukları aynı anda açıp aynı süre sonra kapatacağız.

Dene 1 (düğme "Muslukları aç"; `noWait` yönerge: "Muslukları aç; lekelerin büyüklüğünü karşılaştır."): beş musluk aynı anda açılır, aynı süre sonra kapanır; lekeler büyür. Leke sırası: su (1, en iri), etil alkol (2), propanol (3), etilen glikol (4, belirgin küçük), gliserin (5, çok küçük); ilk üçün büyüklüğü birbirine yakın, dördüncü ve beşinci belirgin küçüktür (yalnızca sıra; sayı ve yarıçap değeri yazılmaz). "Devam", musluklar bir kez açılınca açılır.

Dene 2 (kart başına seçim; `tag: 'Sınıflandır'`; üç kutu: "iri leke (çok aktı)", "orta leke", "küçük leke (az aktı)"; kart doğru kutuya oturunca satır tabloya yazılır ve altına cümle düşer):
- Su → **iri leke**. "Aynı sürede çok aktı."
- Etil alkol → **iri leke**. "Lekesi suyunkine yakın."
- Propanol → **iri leke**. "Lekesi bu ikisininkine yakın."
- Etilen glikol → **orta leke**. "Lekesi ilk üçünden belirgin küçük."
- Gliserin → **küçük leke**. "Lekesi en küçük; en az aktı."

Dayandığı anlatım: sahne 4, 3–7; bu sahne, 1–3 ve lekeler.

Gör: lekelerin altında tablo gelir (başlıkta birim): su 1,01 · etil alkol 1,20 · propanol 1,94 · etilen glikol 19,83 · gliserin 1490. Üstte kısa ok: "leke küçüldükçe viskozite büyür".

Anlatım (sonra):
4. Bir laboratuvar bu sıvıların viskozitesini 20 °C'ta ölçmüş.
5. Leke küçüldükçe viskozite büyüdü.
6. Gliserin en az aktı; viskozitesi en büyük.
7. Su, etil alkol ve propanolün viskoziteleri birbirine yakın ve küçük.

Soru (`tag: 'Sıra sende'`): Tabloya göre hangisi doğrudur? **Gliserin, etilen glikolden daha az akışkandır** / Etil alkol, etilen glikolden daha az akışkandır / Su ile gliserinin akışkanlığı eşittir. Dayandığı anlatım: 5–7; tablo. İpuçları: "Viskozitesi daha büyük olan, daha az akışkandır." · "Gliserinin değeri 1490, etilen glikolünki 19,83."

### Sahne 7 · Yapılara bak: OH grubu sayısı

Tahta: dört sıvının yapı formülü yan yana (`yapi`; su bu sahnede gösterilmez, ana oturum kararı: su molekülünde iki O–H bağı vardır, "bir OH" sayılması J2'deki "su dört hidrojen bağı kurar" bilgisiyle çelişirdi), altlarında küçük leke ikonu (sahne 6'daki büyüklükte) ve viskozite satırı. Formüllerde OH grupları çerçeveli; her formülün altında sayı rozeti: etil alkol 1 · propanol 1 · etilen glikol 2 · gliserin 3. Sonra rozetlerin altında lekeler soldan sağa küçülür.

Anlatım:
1. Şimdi dört sıvının yapı formülüne bakalım.
2. Dördünde de OH grubu var.
3. Etil alkol ve propanolde bir OH var.
4. Etilen glikolde iki, gliserinde üç OH var.

Soru (`tag: 'Sıra sende'`; örüntü): OH grubu sayısıyla leke büyüklüğü arasında hangi örüntü var? **OH sayısı arttıkça leke küçülür** / OH sayısı arttıkça leke büyür / OH sayısı ile leke arasında ilişki yok. Dayandığı anlatım: sahne 6, 4–7; bu sahne, 2–4. İpuçları: "Bir, iki, üç OH'lu sıvıların lekelerini sırayla karşılaştır." · "Gliserinin lekesi en küçüktü."

Sonra:
5. OH sayısı arttıkça akışkanlık azalıyor, viskozite artıyor.

### Sahne 8 · Neden: hidrojen bağı sayısı

Tahta: üç sıvı kesiti yan yana (`kayma`): etil alkol (iki molekül arasında 1 yeşil kesikli çizgi), etilen glikol (2 çizgi), gliserin (3 çizgi). Her kesitte üst katman sağa itilir: etil alkolde hızlı, etilen glikolde orta, gliserinde yavaş (hareket izi uzunluğu). Altlarında "bağ: 1", "bağ: 2", "bağ: 3". Sol üstte soluk küçük "H–OH" ve "gliserin" çifti (su ve gliserin).

Anlatım:
1. Her OH grubu, komşu molekülle hidrojen bağı kurabilir.
2. OH sayısı arttıkça hidrojen bağı sayısı da artar.
3. Hidrojen bağı çoksa moleküller birbirinin üzerinden zor kayar.
4. Zor kayan moleküllerde akışkanlık azalır, viskozite artar.
5. Gliserinde hidrojen bağı en çoktur: viskozitesi en büyüktür.
6. Su da gliserin de hidrojen bağı kurar; sayıları farklıdır.

Soru (`tag: 'Sıra sende'`; yeni durum): Aynı sıcaklıktaki iki sıvıdan A'nın molekülünde 1, B'nin molekülünde 3 OH grubu var. Hangisi daha akışkandır? **A** / B / İkisi eşit. Dayandığı anlatım: 1–5. İpuçları: "OH sayısı arttıkça hidrojen bağı çoğalır." · "Bağ çoksa moleküller zor kayar."

Gör: üç kesitte katmanlar kayar; gliserindeki üst katman en az yol alır.

Sonra:
7. Etkileşim büyüdükçe moleküller zor kayar; viskozite büyür.

Defter ("Etkileşim ve viskozite"): **Etkileşim büyüdükçe viskozite artar.** Örnek: gliserin, 3 OH.

### Çıkış soruları

1. Viskozite nedir? **Sıvının akmaya karşı gösterdiği direnç** / Sıvının kaynamaya başladığı sıcaklık / Sıvı yüzeyindeki buharın basıncı. (sahne 2)
2. (yanılgı) Bir sıvının viskozitesi büyüdükçe akışkanlığı nasıl değişir? **Azalır** / Artar / Değişmez. (sahne 2, 3)
3. (yeni durum) Üç özdeş büretin muslukları aynı anda açılıp kapatıldı; lekelerin yarıçapları P < Q < R çıktı. Viskozite sıralaması hangisidir? **P > Q > R** / R > Q > P / Üçü eşit. (sahne 4, 6)
4. (yeni durum) Aynı sıcaklıkta M sıvısının molekülünde 2, N sıvısının molekülünde 3 OH grubu var. Hangisi doğrudur? **N'nin viskozitesi daha büyüktür** / M'nin viskozitesi daha büyüktür / İkisinin viskozitesi eşittir. (sahne 8)
5. (yanılgı) Su ve gliserin ikisi de hidrojen bağı kurar. Viskoziteleri hakkında hangisi doğrudur? **Gliserinde hidrojen bağı sayısı fazla olduğundan viskozitesi daha büyüktür** / İkisinde de hidrojen bağı olduğundan viskoziteleri eşittir / Suyun viskozitesi daha büyüktür. (sahne 8)

Özet: Viskozite, akmaya karşı dirençtir. · Viskozite büyüdükçe akışkanlık küçülür. · OH sayısı ve hidrojen bağı arttıkça sıvı zor akar. · **Viskozite arttıkça akışkanlık azalır.**

## K2 · Sıcaklık ve viskozite

- **Fikir:** Aynı sıvının akışkanlığı sıcaklıkla değişir: sıcaklık arttıkça moleküller arası etkileşim kuvvetleri zayıflar, akışkanlık artar, viskozite azalır. Etkiyi görmek için tek değişken değişir.
- **Giriş ekranı sorusu:** Buzdolabından çıkan bal ile ılık bal kaşıktan aynı hızda mı akar?
- **Kaynak:** Ders kitabı s. 189 (sıvılara bırakılan çelik bilyenin tüpün dibine iniş süresi viskoziteyi gösterir; sıcaklık akışkanlığı belirleyen etkenlerdendir), s. 192 (Etkinlik 2.26: iki sıvı, farklı sıcaklıklar, ölçülen akışkanlık; zeytinyağının viskozitesi 81·10⁻³, suyunki 1,01·10⁻³; zeytinyağının viskozitesi nasıl suya yaklaştırılır sorusu), s. 193 (sıcaklık arttıkça moleküller arası etkileşim kuvvetleri zayıflar, akışkanlık artar, viskozite azalır; asfalt dökülürken zift ısıtılır, reçel kavanoza sıcak doldurulur; Kontrol Noktası 2.11: özdeş tüplerde eşit miktarda propil alkol (C₃H₈O), propilen glikol (C₃H₈O₂), gliserin (C₃H₈O₃) ve yapı formülleri; özdeş çelik bilyeler aynı anda ve aynı yükseklikten bırakılır; 10 saniye sonra bilyelerin konumu; I–III. tüpler 25 °C, IV–VI. tüpler 30, 15 ve 60 °C; tüpler eşit bölmeli, her bölme 2 cm), s. 194 (tüp seçimi: sıvı türünün etkisi için aynı sıcaklıkta farklı sıvılar, sıcaklığın etkisi için aynı sıvıda farklı sıcaklıklar; yol–sıcaklık grafiği; "etkileşim arttıkça akışkanlık azalır, sıcaklık arttıkça akışkanlık artar" tamamlama), s. 188 (Etkinlik 2.24: serum etiketinde buzdolabında ya da doğrudan güneş ışığında saklamama uyarısı). Bilyenin 10 saniyedeki yolu kitapta sayı olarak verilmez; şeklin görüntüsünden bölme sayısı okundu (aşağıda "Okuma").
- **Sınır:** Yalnızca sıcaklık. Bilyenin hız ya da iniş süresi hesabı yok; "Pa·s" ve viskozite hesabı yok. Ara sıcaklıkta veri yok: her sıvı için kitabın iki sıcaklığı vardır, başka sıcaklık gösterilmez. Newton tipi akışkanlar, viskozimetre, motor yağı çok dereceli yağları yok.
- **Okuma (şekilden):** Tüplerde sıvı yüzeyi 2. bölme çizgisindedir; bilyeler yüzeyden bırakılır. Bilyenin merkezinin yüzeyden uzaklığı (bölme; 1 bölme = 2 cm; okuma yaklaşıktır, en çok yarım bölme belirsizlik): I (propil alkol, 25 °C) 7 bölme, yaklaşık 14 cm; II (propilen glikol, 25 °C) 4 bölme, yaklaşık 8 cm; III (gliserin, 25 °C) 1 bölme, yaklaşık 2 cm; IV (propil alkol, 30 °C) bilye dibe ulaşmış (tüpün derinliği yaklaşık 8,5 bölme, yaklaşık 17 cm; yol bunun üstünde okunamaz); V (propilen glikol, 15 °C) 2 bölme, yaklaşık 4 cm; VI (gliserin, 60 °C) 4 bölme, yaklaşık 8 cm. Kontrol: aynı sıvıda sıcaklık arttıkça yol artıyor (I < IV, V < II, III < VI), 25 °C'ta üç sıvıda OH sayısı arttıkça yol azalıyor (I > II > III); iki okuma kitabın ifadesiyle uyumlu. Derste her yerde "bölme" ve "cm" okunan değer olarak anılır; tahtada tüp çizimi bu bölmelere göre ölçekli çizilir.
- **Güç kavramlar ve gösterimi:** (1) Bilyenin yolu ile akışkanlık: aynı süre, aynı başlangıç; ne kadar inerse o kadar akışkan. İki tüp yan yana, bilye izleri ölçekte işaretlenir. (2) Sıcaklığı değiştirirken "başka her şey aynı": tüp, miktar, bilye; çerçevede "değişen: sıcaklık" ve "sabit: sıvı, miktar, bilye". (3) Hangi tüpleri karşılaştırmalı: altı tüpün şeması, iki kutu: "sıvı sabit", "sıcaklık sabit". (4) Neden: gliserin kesiti 25 °C (kalın yeşil kesikli çizgiler, kısa hareket izi) ve 60 °C (ince, seyrek çizgiler, uzun hareket izi); üst katmanın kayması 60 °C'ta daha hızlıdır.
- **Hedeflenen yanılgı:** "Isınınca sıvı koyulaşır, viskozite artar" ve "farklı sıvıları farklı sıcaklıklarda karşılaştırarak sıcaklığın etkisi bulunur".
- **Akılda kalıcı cümle:** Sıvı ısındıkça daha kolay akar.

### Sahne 1 · Hatırla

Açılış cümlesi (her derste aynı): "Başlamadan önce iki şeyi hatırlayalım."

1. Bir sıvının viskozitesi büyükse akışkanlığı nasıldır? **Küçüktür** / Büyüktür / Değişmez. (K1) Yanlışta: "Viskozite arttıkça akışkanlık azalır."
2. Kapalı kapta dengedeki bir sıvının sıcaklığı artırılıyor. Denge buhar basıncı ne olur? **Artar** / Azalır / Değişmez. (I2, daha eski) Yanlışta: "Sıcaklık artınca buhar fazına geçen molekül sayısı artar; basınç yükselir."

Sonra: "Bugün sıcaklığın sıvının akışına etkisine bakacağız."

### Sahne 2 · Bilye ile akışkanlık ölçmek

Tahta: bir deney tüpü (`tup`, 10 bölme, "1 bölme = 2 cm"), içinde sıvı. Üstten çelik bir bilye bırakılır; sıvıda yavaşça iner; köşede sayaç 0'dan 10 s'ye sayar. Sonra ikinci tüp yan yana gelir: aynı süre sonunda bilye bu tüpte daha az inmiştir; iki konum ölçekte işaretlenir ("A" ve "B").

Anlatım:
1. Akışkanlığı ölçmenin bir yolu: sıvıya çelik bilye bırakmak.
2. Özdeş tüplere eşit miktarda sıvı koyup bilyeleri aynı anda bırakırız.
3. Bilye, viskoz sıvıda yavaş iner.
4. On saniye sonra bilyenin aldığı yola bakarız.
5. Tüpler eşit bölmelidir; her bölme 2 cm'dir.
6. Bilye ne kadar çok inerse sıvı o kadar akışkandır.

Soru (`tag: 'Sıra sende'`): İki tüpte 10 saniye sonra A tüpündeki bilye, B tüpündekinden daha çok yol aldı. Hangisi doğrudur? **A'daki sıvının akışkanlığı daha büyüktür** / A'daki sıvının viskozitesi daha büyüktür / İkisinin akışkanlığı eşittir. Dayandığı anlatım: 3, 6; K1 sahne 2. İpuçları: "Bilye çok iniyorsa sıvı kolay akıyor." · "Kolay akan sıvıda direnç küçüktür."

Sonra:
7. Bilyenin yolu büyükse akışkanlık büyük, viskozite küçüktür.

### Sahne 3 · Üç sıvı, 25 °C

Tahta: üç özdeş tüp yan yana, I, II, III (`tup`; her birinde alt köşede "25 °C"); üstlerinde sıvı adı ve yapı formülü (`yapi`; propil alkol, propilen glikol, gliserin; OH grupları çerçeveli ve rozetler 1, 2, 3). Bilyeler aynı anda iner (`birak`); sayaç 10 s'de durur. Son konumlar ölçekte işaretlenir: I: 7 bölme, II: 4 bölme, III: 1 bölme. Sağda tablo (`deneyTablosu`): satırlar tek tek yazılır; "yol (cm)" sütunu boş.

Anlatım:
1. Bir grup öğrenci özdeş tüplere üç sıvı koydu.
2. Propil alkol, propilen glikol, gliserin: üçü de 25 °C'ta.
3. Çelik bilyeler aynı anda, aynı yükseklikten bırakıldı.
4. Propil alkolde bir, propilen glikolde iki, gliserinde üç OH var.
5. On saniye sonra bilyeler 7, 4 ve 1 bölme inmişti.
6. Her bölme 2 cm'dir; yollar 14, 8 ve 2 cm.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloda yol sütunu dolu (14, 8, 2 cm); altında iki adım: "1. Bilye en çok propil alkolde, en az gliserinde indi: akışkanlık en çok propil alkolde." dolu; "2. Viskozite en büyük olan: ?" boş. Hangi sıvının viskozitesi en büyüktür? **Gliserin** / Propil alkol / Propilen glikol. Dayandığı anlatım: sahne 2, 6–7; bu sahne, 5–6. İpuçları: "Bilyenin yolu en kısa olan sıvı en az akışkandır." · "Akışkanlık en küçükse viskozite en büyüktür."

Sonra:
7. Bilye gliserinde en az indi; viskozitesi en büyük olan o.

Soru (`tag: 'Sıra sende'`; K1'in yeni sıvılara uygulanması): OH grubu sayısı ile bilyenin yolu arasında hangi örüntü var? **OH sayısı arttıkça yol azalır** / OH sayısı arttıkça yol artar / OH sayısı ile yol arasında ilişki yok. Dayandığı anlatım: 4–7. İpuçları: "Bir, iki, üç OH'lu tüpleri sırayla karşılaştır." · "Gliserinde bilye en az indi."

Sonra:
8. Hidrojen bağı arttıkça sıvı zor akar; bilye az iner.

### Sahne 4 · Aynı gliserini ısıtırsak

Tahta: III. tüp (gliserin, 25 °C, bilye 1 bölme) solda hazır; sağda boş tüp "gliserin, 60 °C" (sıvı rengi değişmez; yalnızca sıcaklık etiketi ve küçük bir termometre ikonu). Altta çerçeve: "Değişen: sıcaklık · Sabit: sıvı, miktar, bilye".

Anlatım:
1. Aynı gliserini 60 °C'a kadar ısıttık.
2. Başka her şey aynı: tüp, miktar ve bilye.

Tahmin (`tag: 'Tahmin et'`; gündelik sezgi): Isınan gliserinde bilye 10 saniyede 25 °C'takinden nasıl iner? **Daha çok** / Daha az / Aynı kadar. Dayandığı anlatım: yok (sezgi; ılık balın daha kolay akması). İpuçları: "Isıtılmış bal kaşıktan nasıl akar?" · "Gliserin de bal gibi koyu bir sıvı."

Gör: VI. tüp: bilye 4 bölme (yaklaşık 8 cm) iner; III.'ün yanına konur.

Sonra:
3. 25 °C'ta bilye 1 bölme, 60 °C'ta 4 bölme indi.
4. Isınan gliserin daha kolay akıyor.

### Sahne 5 · Hangi iki tüpü karşılaştırmalı?

Tahta: altı tüpün şeması (I–VI; her birinin altında sıvı adı ve sıcaklık: I propil alkol 25 °C, II propilen glikol 25 °C, III gliserin 25 °C, IV propil alkol 30 °C, V propilen glikol 15 °C, VI gliserin 60 °C; bilyeler gizli). Üstte iki kutu: "sıvı sabit, sıcaklık değişir", "sıcaklık sabit, sıvı değişir".

Anlatım:
1. Altı tüpte üç sıvı, farklı sıcaklıklarda duruyor.
2. Sıcaklığın etkisini görmek için sıvı sabit kalmalıdır.
3. Sıvı türünün etkisini görmek için sıcaklık sabit kalmalıdır.
4. Etkiyi görmek için tek değişkeni değiştiririz.

Soru (`tag: 'Sıra sende'`; yeni durum): Sıcaklığın etkisini bulmak için hangi iki tüp seçilmelidir? **II ve V** / II ve III / I ve VI. Dayandığı anlatım: 2, 4. İpuçları: "Sıvı aynı, sıcaklık farklı olan iki tüp ara." · "II ve III'te sıvılar farklı; I ve VI'da hem sıvı hem sıcaklık farklı."

Soru (`tag: 'Sıra sende'`): Sıvı türünün etkisini bulmak için hangi iki tüp seçilmelidir? **I ve II** / II ve V / III ve VI. Dayandığı anlatım: 3–4. İpuçları: "Sıcaklık aynı, sıvı farklı olan iki tüp ara." · "II ve V'te sıvı aynı."

Sonra:
5. Tek değişkeni değiştirince fark, o değişkenden gelir.

### Sahne 6 · Sıvıyı ve sıcaklığı seç

Tahta: ortada tek büyük tüp (`tup`); solda iki denetim: sıvı seçimi (`c.choice`: "Propil alkol", "Propilen glikol", "Gliserin") ve sıcaklık kaydırıcısı (`c.slider`, iki konumlu; konumların etiketi seçilen sıvıya göre yazılır; kaydırıcı yalnızca bu iki konumda durur). Altında düğmeler: "Bilyeyi bırak", "Tabloya yaz". Sağda `deneyTablosu`: ilk dört satır hazır (I, II, III, VI); IV ve V satırlarını öğrenci ekler. Üstte çerçeve: "Sabit: tüp, miktar, bilye".

Anlatım:
1. Sıcaklığı değiştirerek ölçmediğimiz tüpleri de deneyelim.
2. Sıvıyı ve sıcaklığı seç; bilyeyi bırak.
3. Sonucu tabloya yaz.

Dene (`c.choice` ve `c.slider`; `noWait` yönerge: "Propil alkolü 30 °C'ta, propilen glikolü 15 °C'ta dene; sonuçları tabloya yaz."): seçilen sıvı ve sıcaklığa göre tüp çizilir; `birak()` bilyeyi indirir; yalnızca şekilden okunan değerler vardır (yukarıdaki "Okuma" listesi). Propil alkol 30 °C'ta bilye dibe ulaşır (tablo: "dibe ulaştı"). "Tabloya yaz" aynı tüpü ikinci kez eklemez; satır numarası I–VI olur. "Devam", IV ve V satırları yazılınca açılır.

Gör: tablo altı satırla tamamlanır; yan tarafta `yolGrafik`: altı nokta, üç işaret biçimi; iki noktası olan her sıvının noktaları ince çizgiyle birleşir, çizginin ucunda yön oku (→).

Anlatım (sonra):
4. Üç sıvıda da sıcaklık arttıkça bilyenin yolu arttı.
5. Propil alkolde bilye 30 °C'ta dibe ulaştı.

Soru (`tag: 'Sıra sende'`): Tabloya göre hangi sonuç çıkar? **Sıcaklık arttıkça üç sıvıda da akışkanlık arttı** / Sıcaklık arttıkça üç sıvıda da akışkanlık azaldı / Sıcaklık yalnızca gliserinde etkili oldu. Dayandığı anlatım: sahne 5, 4; bu sahne, 4–5 ve tablo. İpuçları: "Her sıvının iki satırını karşılaştır." · "Sıcaklık yüksek olan satırda yol uzun mu, kısa mı?"

Sonra:
6. Sıcaklık arttıkça sıvılar daha kolay akıyor.

### Sahne 7 · Neden: ısınınca etkileşim zayıflar

Tahta: gliserin kesiti iki kez yan yana (`kayma`): solda "25 °C": üç kalın yeşil kesikli çizgi, kısa hareket izi, üst katmanın kayması yavaş; sağda "60 °C": aynı moleküller, çizgiler ince ve seyrek, uzun hareket izi, üst katman daha hızlı kayar. Altında iki küçük çizim: ısıtılan zift (kazan, dökülen koyu sıvı) ve sıcak doldurulan reçel (kavanoz).

Anlatım:
1. Sıvı ısındıkça moleküller arası etkileşim kuvvetleri zayıflar.
2. Moleküller birbirinin üzerinden daha kolay kayar.
3. Akışkanlık artar, viskozite azalır.
4. Asfalt dökülürken zift ısıtılır: viskozitesi azalır.
5. Reçel de kavanoza sıcak doldurulur.

Soru (`tag: 'Sıra sende'`; yeni durum, başa dönüş): Buzdolabından yeni çıkan bal ile ılık bal kaşıktan akıtılıyor. Hangisi daha yavaş akar? **Buzdolabından çıkan** / Ilık olan / İkisi aynı hızda akar. Dayandığı anlatım: 1–3. İpuçları: "Soğuyan sıvıda etkileşim ne olur?" · "Etkileşim büyükse moleküller zor kayar."

Gör: iki bal kesiti; soğuk olanda hidrojen bağı çizgileri kalın, üst katman az kayar; ılıkta çizgiler ince, üst katman çok kayar.

Sonra:
6. Soğuk balda etkileşim güçlüdür; ılık balda zayıftır.

Defter ("Sıcaklık ve akışkanlık"): **Sıcaklık arttıkça akışkanlık artar, viskozite azalır.** Örnek: sıcak bal.

### Sahne 8 · İki etki yan yana

Tahta: iki tüp yan yana: I (propil alkol, 25 °C, bilye 7 bölme) ve VI (gliserin, 60 °C, bilye 4 bölme); aralarında "?" işareti. Sağda hatırlatma satırı: "gliserin, 25 °C: 1 bölme".

Anlatım:
1. Gliserin 25 °C'ta bir, 60 °C'ta dört bölme indi.
2. Propil alkolde bilye, 25 °C'ta yedi bölme indi.

Soru (`tag: 'Sıra sende'`; yeni duruma uygulama; iki değişkenin birlikte okunması): Isıtılmış gliserin (60 °C) ile soğuk propil alkol (25 °C) karşılaştırılıyor. Bilye 10 saniyede hangisinde daha çok iner? **Propil alkolde** / Gliserinde / İkisinde aynı kadar. Dayandığı anlatım: sahne 3, 4–8; sahne 4, 3; bu sahne, 1–2. İpuçları: "Tablodaki iki yolu karşılaştır." · "Isınma gliserinin yolunu artırdı; ama ne kadar?"

Gör: iki tüp yan yana: 7 bölme ve 4 bölme.

Sonra:
3. Isınan gliserin kolay akıyor; ama propil alkole yetişemedi.
4. Gliserindeki hidrojen bağı fazlalığı 60 °C'ta da fark yaratıyor.

### Çıkış soruları

1. Sıcaklık arttıkça sıvının akışkanlığı ve viskozitesi nasıl değişir? **Akışkanlık artar, viskozite azalır** / Akışkanlık azalır, viskozite artar / İkisi de artar. (sahne 6, 7)
2. (yanılgı) Bir sıvı ısıtılıyor. Viskozitesi için hangisi doğrudur? **Azalır; moleküller arası etkileşim zayıflar** / Artar; sıvı koyulaşır / Değişmez; sıcaklık etkileşimi etkilemez. (sahne 7)
3. (yeni durum) Bir öğrenci zeytinyağının viskozitesini azaltmak istiyor. Ne yapmalıdır? **Isıtmalıdır** / Soğutmalıdır / Aynı sıcaklıkta bekletmelidir. (sahne 7)
4. (yeni durum) Bir cilt serumunun etiketinde "buzdolabında saklamayın" yazıyor. Serum soğuyunca ne olur? **Viskozitesi artar; daha zor akar** / Viskozitesi azalır; daha kolay akar / Viskozitesi değişmez. (sahne 7)
5. (yeni durum) Üç tüp var: P (X sıvısı, soğuk), Q (X sıvısı, sıcak), R (Y sıvısı, soğuk). Sıcaklığın etkisini hangi iki tüp gösterir? **P ve Q** / P ve R / Q ve R. (sahne 5)

Özet: Bilyenin yolu büyükse akışkanlık büyüktür. · Tek değişkeni değiştirip ötekileri sabit tutarız. · Sıcaklık arttıkça etkileşim zayıflar, viskozite azalır. · **Sıvı ısındıkça daha kolay akar.**

## K3 · Konu tekrarı: Viskozite (`k3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): dört panel 2×2 hâlinde sırayla dolar, her biri küçük çizimiyle ve deftere düşer: (1) bal ve su, iki ok (direnç, akış), (2) iki katman molekül, 1 ve 3 yeşil çizgili (hidrojen bağı), (3) tüpte bilye, iki sıcaklık (soğuk, sıcak), (4) iki tüp, sıvı sabit, sıcaklık değişir (tek değişken). Her panelin yanında tek satır.

Anlatım:
1. Bu konuda öğrendiklerimizi kurallarda toplayalım.
2. Viskozite, sıvının akmaya karşı gösterdiği dirençtir.
3. Viskozite arttıkça akışkanlık azalır.
4. OH sayısı arttıkça hidrojen bağı çoğalır, moleküller zor kayar.
5. Etkileşim büyüdükçe viskozite artar.
6. Sıcaklık arttıkça etkileşim zayıflar; viskozite azalır.
7. Bir etkiyi görmek için tek değişkeni değiştiririz.

Sorular (`quiz`, karışık sırada):

1. Viskozite aşağıdakilerden hangisidir? **Sıvının akmaya karşı gösterdiği direnç** / Sıvının kaynamaya başladığı sıcaklık / Sıvı yüzeyindeki buharın basıncı. — K1
2. Özdeş büretlerin muslukları aynı anda açılıp kapatıldı. A sıvısı B sıvısından daha küçük leke bıraktı. Hangisi doğrudur? **A'nın viskozitesi daha büyüktür** / A'nın akışkanlığı daha büyüktür / İkisinin viskozitesi eşittir. — K1
3. Aynı sıcaklıkta X sıvısının molekülünde 1, Y sıvısının molekülünde 2 OH grubu var. Hangisi doğrudur? **Y daha viskozdur** / X daha viskozdur / İkisinin viskozitesi eşittir. — K1
4. (yanılgı) Su ve gliserinin ikisi de hidrojen bağı kuruyor. Hangisi doğrudur? **Gliserinde hidrojen bağı sayısı fazla; viskozitesi daha büyük** / Etkileşim türü aynı olduğundan akışkanlıkları eşittir / Suyun viskozitesi gliserininkinden büyüktür. — K1
5. Bir sıvının ısıtılmış hâliyle soğuk hâlinde bilye 10 saniyede ne kadar iner? **Isıtılmışta daha çok iner** / Soğukta daha çok iner / İkisinde aynı kadar iner. — K2
6. Üç tüp: P (X sıvısı, soğuk), Q (X sıvısı, sıcak), R (Y sıvısı, soğuk). Sıvı türünün etkisini hangi iki tüp gösterir? **P ve R** / P ve Q / Q ve R. — K2
7. (yeni durum) Kavanozdaki bal çok yavaş akıyor. Daha kolay akması için ne yapılır? **Kavanoz ılık suda bekletilir** / Kavanoz buzdolabına konur / Kavanoz aynı sıcaklıkta bırakılır. — K2
8. (yeni durum) Aynı sıcaklıkta K sıvısında bilye, L sıvısındakinden daha çok iniyor. Hangisi doğrudur? **K'nin molekülleri arasındaki etkileşim daha zayıftır** / K'nin molekülleri arasındaki etkileşim daha kuvvetlidir / K'nin viskozitesi daha büyüktür. — K1, K2

Akılda kalıcı cümle: Etkileşim büyüdükçe viskozite artar; sıcaklık artınca azalır.

## Program metniyle karşılaştırma (8 Ekim 2026)

| Programın istediği (KİM.9.2.11) | Karşılığı |
|---|---|
| a) Sıvıların viskozitesine ilişkin niteliklerin farkını ortaya koyar | K1 sahne 2 (viskoz ve akışkan sıvı), sahne 4 (leke ve akışkanlık), sahne 5 (günlük niteliklerin sınıflandırması); K2 sahne 2 (bilyenin yolu) |
| b) Viskozite ile nitelikler arasındaki ilişkiyi tespit etmek üzere veri toplar ve kaydeder | K1 sahne 6 (benzetim: beş sıvı, lekeler, tablo); K2 sahne 3, 6 (tüpler, tabloya yazma, grafik) |
| c) Benzer verilerden keşfettiği örüntüleri açıklar | K1 sahne 7–8 (OH sayısı, hidrojen bağı); K2 sahne 6–7 (sıcaklık, etkileşimin zayıflaması) |
| Uygulama: viskozite, akmaya karşı direnç olarak tanımlanır | K1 sahne 2 |
| Uygulama: akışkanlığı etkileyen faktörlerin tartışmaya açılması | Faktörler K1 sahne 7–8 (etkileşim) ve K2 sahne 5–7 (sıcaklık); sınıf içi tartışma `site dışı` (sınıfta yapılır) |
| Uygulama: akışkanlık ile viskozite arasında ilişki, niteliklerin farkı | K1 sahne 2–5 |
| Uygulama: farklı saf sıvıların (su, etil alkol, propanol, glikol, gliserin) akışkanlığını karşılaştıran deney | K1 sahne 6 (benzetim). Programdaki "glikol", kitaptaki iki glikoldur: etilen glikol K1'de, propilen glikol K2'de |
| Uygulama: moleküller arası etkileşimlerin akışkanlığa etkisine ilişkin örüntüleri açıklama | K1 sahne 7–8 |
| Uygulama: sıcaklığın akışkanlığa etkisi için yeni deney, veri toplama ve kaydetme | K2 sahne 3–6 |
| Uygulama: sıcaklıkla ilgili keşfedilen örüntüyü açıklama | K2 sahne 6–7 |
| Uygulama: verileri etkileşim kuvvetlerinin büyüklüğü ve sıcaklıkla ilişkilendirme soruları | K2 sahne 7–8; K1 sahne 8 |
| Uygulama: planlı olma, deneyi planlama | K2 sahne 5 (hangi tüpler karşılaştırılır); deneyin kendisini tasarlama `site dışı` |
| Uygulama: performans görevi (deney tasarla, uygula, raporla); ön ve son form; öz değerlendirme | `site dışı` (sınıfta yapılır); deneyin yerine K1 sahne 6 ve K2 sahne 6 benzetimleri geçer |
| Köprü kurma: balın kavanozdan yavaş akması | K1 giriş sorusu ve sahne 2; K2 giriş sorusu ve sahne 7 |
| Anahtar kavramlar: viskozite, akışkanlık | K1 sahne 2–4; K3 |
| Konu tekrarı (`KURALLAR.md` 3.4) | K3 |

Fazla olan: (1) K1 sahne 3'teki bisiklet freni benzetmesi ve taneciklerin birbiri üzerinde kayması: program viskozitenin nedenini etkileşimle ister; kitap (s. 187) bu kayma anlatımını viskoziteyle birlikte verir ve K1 sahne 8'in ön koşuludur. (2) K1 sahne 5'teki günlük nitelikler (şişeden akma süresi, miktar kontrolü): 11.a "niteliklerin farkı"nı somutlar; yalnızca s. 188'in yazdığı nitelikler alındı. (3) K2 sahne 2'deki bilye düzeneği: program "sıcaklıkla ilgili yeni bir deney" der, düzeneği saymaz; kitabın s. 193 deneyi alındı. (4) K2 sahne 5'teki tek değişken ilkesi (hangi iki tüp): I2'de verilmiştir, kitabın s. 194 sorusu (2–3) buna dayanır; program metni "yeni deney yapmaları" der. Eksik olan: öğrencinin kendi deneyini tasarlaması, malzeme seçmesi, gerçek ölçüm yapması ve rapor yazması (`site dışı`).

## Tutarsızlıklar ve notlar

- **OH sayısı kitapta s. 190'dan okunur.** `PLAN.md` bölüm 8, "etanol 1, etilen glikol 2, gliserin 3 OH grubu"nu s. 191'e bağlar. s. 191 yalnızca "hidrojen bağı sayısı" ve gliserinin su ile etilen glikolden fazla olduğunu söyler; OH sayıları s. 190'daki yapı formüllerinden ve s. 193'teki formüllerden okunur. "Her OH grubu hidrojen bağı kurabilir" bağı kitapta açık yazılmaz; G4'ün ölçütünden (O–H bağı) ve s. 188'deki gliserin hidrojen bağı şeklinden çıkar.
- **Su ve OH sayısı.** s. 190 suyu H–OH yazar; K1'de su "bir OH" sayıldı. Su molekülü iki O–H bağı taşır; J2 (PLAN bölüm 8) "bir su molekülü dört hidrojen bağı kurabilir" der. K1 hidrojen bağı sayısı yerine "OH grubu sayısı" der, suya hidrojen bağı sayısı yazmaz; ama J2 senaryosuyla çelişki çıkarsa suyun OH sayma satırı K1 sahne 7'den kaldırılır (o zaman rozetler 1·1·2·3 ve su yalnızca iri leke grubunda kalır).
- **Kitap ile PLAN arasında bilye yolu.** `PLAN.md` bölüm 8, bilyenin yolunun "sayı olarak verilmediğini ve cm değerinin örnek veri diye adlandırılacağını" söyler. Bu senaryoda görev iletisine uyularak yol, şeklin sayfa görüntüsünden bölme olarak okundu (I: 7, II: 4, III: 1, IV: dibe, V: 2, VI: 4 bölme; her bölme 2 cm). Okumalar yaklaşıktır (en çok yarım bölme). "Örnek veri" etiketi gerekmez; ama kitapta sayı yoktur, derse kaynağı yazılır.
- **K1'de süre yok.** Görev iletisi süreyi "örnek veri" diye işaretleyerek göstermeye izin veriyordu; K1'de hiç süre gösterilmedi, kayıt leke büyüklüğü sırasıdır (veri uydurmamak için). İsterseniz kodlayan ajan lekeyle birlikte "örnek veri" etiketli saniye ekleyebilir; bu, K1 sahne 6'nın sınıflandırma kutularını değiştirmez.
- **Tablo 2.6 birimi.** Kitap gliserini ve balı Pa·s, ötekileri 10⁻³ Pa·s ile yazar; derste tek üs kullanıldı (gliserin 1490, bal 2000–10000, ·10⁻³ Pa·s). Bu bir aritmetik çevirmedir, yeni veri değildir.
- **Alınmayanlar:** Etil alkol ile propanol arasındaki küçük farkı mol kütlesine bağlayan s. 191 cümleleri, Tablo 2.7, Ostwald viskozimetresi (Görsel 2.29), motor yağı (s. 186), aseton, benzen, karbon tetraklorür, pekmez, Newton tipi akışkanlar, performans görevi.
