# Plan — Hikâye animasyonları · 2. tema: Nicelikler ve Değişimler

Ölçütler (üç koşul, ek kurallar), biçim, derse yerleşim ve üretim hattı: `../sayilar/HIKAYE-ANIMASYONLARI.md` bölüm 1–3 ve 5. Burada yinelenmedi.

**Durum (7 Ekim 2026): hakem incelemesinden geçti; düzeltmeler işlendi (bölüm 7; rapor: `../HIKAYE-HAKEM.md`).** Tema henüz işleme alınmadı; ders kodları ve adları `PLAN.md` taslağındaki hâlleridir.

32 dersin 3'ünde hikâye var; kalanlarında yok. Sayı düşük, çünkü program bu temada gerçek yaşam bağlamını derslerin kendisine koyuyor (taksi, ücret tarifesi, buz, arz-talep); derslerin çoğu zaten hayattan bir örnekle açılıyor ya da kuruluyor.

## 1. Hikâyesi olan dersler (müfredattaki önem sırasıyla)

Sıralama ölçütü 1. temadakiyle aynı: (1) program o fikir için gerçek yaşam bağlamını açıkça istiyor mu, (2) fikir çıktının kendi içeriği mi, (3) programdaki değer ve okuryazarlıklarla bağlı mı.

| Sıra | Ders | Fikir | Hayatta nerede | Hikâye | Kapanış cümlesi |
|---|---|---|---|---|---|
| 1 | C10 Modelin sınırı | Doğrusal model, ölçüldüğü aralıkta doğrudur; dışına uzatılınca saçmalar | Kapı pervazındaki boy çizgileri | Pervazda kalem çizgileri: 12 yaşında 150 cm, 13'te 157, 14'te 164. Her yıl 7 cm; boy = 150 + 7 · (yaş − 12) kuralı üç çizgiyi de tutturuyor. Aynı kural 20 yaş için 206 cm, 30 yaş için 276 cm veriyor: ölçülmüş en uzun insandan (272 cm) uzun. Kural yanlış değil; ölçüldüğü 12–14 aralığında doğru, dışında değil. | "Model, doğru olduğu aralıkta kullanılır." |
| 2 | A16 Parçalı gösterim | Tek doğru yetmez; her aralıkta başka bir doğrusal kural işler | Telefonun şarj ekranı: önce hızlı, %80'den sonra yavaş | Telefon %0'da prize takılır. İlk 25 dakikada %50'ye çıkar: dakikada 2 puan. Sonraki 30 dakikada 30 puan daha gelir, %80: dakikada 1 puan. Son yüzde yirmi 40 dakika sürer: dakikada yarım puan. Grafik yaklaşık olarak tek doğru değil, uç uca eklenmiş üç doğru parçasıdır: üç aralık, üç kural. "50. dakikada yüzde kaç?" diye sorulunca önce hangi aralıkta olduğuna bakılır: ikinci aralık, 50 + 25 = %75. Herkesin bildiği "son yüzde yirmi bitmiyor" hissi, kuralın aralıktan aralığa değişmesidir. | "Her aralığın kendi kuralı vardır." |
| 3 | B4 \|ax + b\|'nin sıfırı | Uzaklık önce azalır, sıfıra iner, sonra yeniden artar; grafik tam sıfırda kırılır | Otobüste harita: işaretli durağa uzaklık | Otobüstesin; haritada ineceğin durağı işaretledin, ekranda durağa uzaklık yazıyor: 4 km. Otobüs dakikada yarım km gidiyor; kafandan hesaplıyorsun: kalan yol 4 − 0,5t. 6. dakikada 1 km, 8. dakikada 0. Uyuyakaldın. 12. dakikada hesabın 4 − 6 = −2 diyor; uzaklık eksi olmaz, ekranda 2 km yazıyor: durağı 2 km geçtin. Uzaklık \|4 − 0,5t\|'dir; grafiği 8. dakikaya kadar iner, tam sıfırda kırılıp yeniden çıkar. | "\|ax + b\|'nin sıfırı ax + b'nin sıfırıdır; grafik orada kırılır." |

Üretim sırası tablodaki sıradır. Süre ya da bütçe daralırsa ilk vazgeçilecek olan 3 numaradır (program yalnızca "araştırma ödevi verilebilir" diyor).

## 2. Müfredat dayanağı

| Sıra | Hikâye | Programdaki dayanak | Program gerçek yaşam bağlamı istiyor mu |
|---|---|---|---|
| 1 | Kapı pervazındaki çizgiler | MAT.9.2.3 uygulama: "Tüm bu süreçlerde elde edilen matematiksel modellerin sınırlılıkları, güçlü ve zayıf yönleri; bu denklem ve eşitsizliklerin çözümleri bağlamında değerlendirilir." "Bu matematiksel modellemeler toplumsal fayda sağlayacak durumlar üzerinden (ekoloji, sağlıklı aşam gibi) geliştirilebilir" (yazım kaynaktaki gibi). | **Evet, açıkça.** Çıktının tamamı gerçek yaşam problemi üzerine; büyüme "sağlıklı yaşam" bağlamına girer. |
| 2 | Şarjın son yüzde yirmisi | MAT.9.2.1 uygulama: "Ayrıca gerçek sayılar kümesinin aralıklara ayrılması ile her aralıkta başka bir doğrusal fonksiyonun tanımlı olduğu parçalı gösterimli fonksiyon elde edilir. Fonksiyonun parçalı gösteriminin anlamlandırılması için gerçek yaşam durumları incelenir." | **Evet, açıkça.** Programın kendi örneği ısıtılan buz kütlesidir; hikâye onu tekrar etmez, ikinci bir "gerçek yaşam durumu" verir. |
| 3 | Durağı kaçırdın | MAT.9.2.2 uygulama: "Özel olarak gerçek sayılarda tanımlı, cebirsel temsili t(x) = ± \|ax + b\| (a, b ∈ ℝ, a ≠ 0) şeklinde verilen fonksiyonun sıfırı ile grafik temsili arasındaki ilişki gözlemlenir." | **Zorunlu değil.** Yalnızca: "Öğrencilere gerçek yaşam durumlarında mutlak değer fonksiyonu ile modellenebilen örneklerin belirlenmesine yönelik bir araştırma ödevi verilebilir." Hikâye bu ödevin bir cevabıdır. |

## 3. Üç koşul

| Sıra | Koşul 1 · Gerçekten hayatta var | Koşul 2 · Öğrenci karşılaşacak | Koşul 3 · Konu soyut kalıyor |
|---|---|---|---|
| 1 | Büyüme eğrileri ve her tür tahmin (nüfus, satış, su seviyesi) tam bu hatayla sınanır. | Boyunun ölçülmesi ve "bu gidişle…" tahmini her evde yapılır. | **Sınırda.** Dersin açılışı (çekilen göl, 100 gün sonrası) aynı fikri hayattan bir durumla soruyor; ama göl öğrencinin hayatından değil ve saçma sonuca sayıyla varmıyor. "Sınır" fikri sayı görmeden soyut kalır. |
| 2 | Şarj, tasarım gereği aşamalıdır: pil dolana yakın akım düşürülür; kural gerçekten aralığa göre değişir (son bölüm yaklaşık olarak doğrusal; bölüm 4). | Her gün, kendi telefonunda. | **Sınırda.** Ders programın buz deneyiyle kurulu. A6–A10 ve C1–C4 "ders hayattan bir örnekle kurulu" gerekçesiyle hikâyesiz bırakıldı; fark şu: onların örnekleri (otopark, kargo, taksi) öğrencinin kendi hayatından, buz ise bir laboratuvar grafiği. Öğrencinin parçalı kuralla kendi hayatında karşılaştığı yer şarj ekranı. |
| 3 | **Sınırda.** Haritada işaretli bir noktaya uzaklık işaretsiz bir sayıdır; nokta geçilince yeniden büyür. Mutlak değeri gerektiren uygulama değil, öğrencinin kafasındaki 4 − 0,5t hesabıdır; uygulama uzaklığı doğrudan ölçer. | Otobüs, servis, metro; durağı kaçırmak dahil. | **Sınırda.** Çekirdek fikir (mutlak değer = uzaklık) 1. temanın kombi hikâyesinde ve B1 ile B3'ün açılışlarında var. Yeni olan zamanla değişim ve grafiğin sıfırda **kırılması**; hikâye bunu öne çıkarır. |

## 4. Doğruluk notları

- **Şarj.** 0–25 dk: 50 ÷ 25 = 2 puan/dk; 25–55 dk: (80 − 50) ÷ 30 = 1; 55–95 dk: (100 − 80) ÷ 40 = 0,5. Parçalı gösterim: f(t) = 2t, 0 ≤ t ≤ 25; f(t) = 50 + (t − 25), 25 < t ≤ 55; f(t) = 80 + 0,5(t − 55), 55 < t ≤ 95. f(50) = 75.
- Sürelerin tamamı **kurgudur**; hızlar sesle söylenebilsin diye yuvarlak seçildi (2, 1, yarım). Gerçek değerlere yakın: Apple, iPhone 8 ve sonrası için uygun adaptörle "yaklaşık 30 dakikada %50" veriyor (doğrulandı: Apple Destek). Süreler modele ve adaptöre göre değişir.
- Gerçek şarj eğrisi son bölümde doğru parçası değildir, giderek yatıklaşan bir eğridir (önce sabit akım, sonra sabit gerilim). Hikâye "üç doğru parçası" diye yaklaşık bir model çizer; anlatımda **"yaklaşık olarak" sözü zorunludur**, yoksa hikâye parçalı doğruyu yanlış örnekle öğretir. Bu, C10'un fikriyle (model sınırı) çelişmez.
- **Boy.** 150 + 7 · (13 − 12) = 157; 150 + 7 · 2 = 164; 150 + 7 · 8 = 206; 150 + 7 · 18 = 276. Çocuğun ölçüleri **kurgudur**; ergenlikte yılda 6–8 cm uzama olağandır, ancak Türk çocukları için büyüme eğrisi tablosundan (Neyzi ve ark.) doğrulanamadı.
- Ölçülmüş en uzun insan Robert Wadlow'dur: 272 cm (son ölçüm 27 Haziran 1940; Guinness World Records; doğrulandı). Hikâyede ad verilmesi gerekmez.
- İsteğe bağlı ek soru (hakem önerisi): "Bu gidişle 180'i kaç yaşında geçerim?" 150 + 7 · (y − 12) = 180, y ≈ 16,3. Çıktının "denklem çözümü bağlamında" ifadesine değer; süre yetmezse girmez.
- **Durak.** 4 − 0,5 · 6 = 1; 4 − 0,5 · 8 = 0; 4 − 0,5 · 12 = −2, \|−2\| = 2. a = −0,5, b = 4; sıfır t = −b/a = 8. Sayıların tamamı **kurgudur** (saatte 30 km, şehir içi otobüs için hızlı ama olanaklı).
- Program kalıbı m(x) = ± \|ax ± b\| ± c'dir; hikâyedeki \|4 − 0,5t\| bu kalıba uyar (dışarıda çarpan yok).
- Uygulamaya hesap atfedilmez: 4 − 0,5t öğrencinin hesabıdır, ekrandaki sayı ölçülen uzaklıktır. Sahne yol tarifi kipi değil, haritada işaretli durak olmalı: yol tarifi açıkken uygulamalar durak geçilince yeni rota çizer. İşaretli noktaya uzaklığın ekranda bu biçimde yazdığı **doğrulanmadı**; senaryo aşamasında bir harita uygulamasında denenmeli.

## 5. Hikâyesi olmayan dersler ve nedeni

| Dersler | Neden yok |
|---|---|
| A1 Değişen iki nicelik · A8 Sabit fonksiyon · A11 ax + b'nin işareti · C2 f(x) = 0, f(x) < 0 ve f(x) > 0 | Konu kendiliğinden anlaşılır ve açılış örnekleri (termometre, sabit ücretli abonelik, eksiye düşen hesap, boşalan tank) yeterince somut. |
| A2 Girdi ve çıktı kümeleri · A3 Sıfır ve işaret: f(x) = x · A4 Artanlık ve uç değerler: f(x) = x · A5 Bire birlik: f(x) = x | Referans fonksiyonun özelliklerini adlandıran dersler. Açılışlar (otomat tuşları, termometre, asansör, okul numarası) fikri taşıyor; hikâye aynı örneği tekrar eder. |
| A6 Doğruyu kaydırmak · A7 Eğimi belirleyen a · A9 Katsayılardan grafiği okumak · A10 Katsayı ve artanlık-azalanlık | Dersin kendisi ücret tarifesiyle kurulu (otopark, hız, kargo, taksi; taksi programın kendi örneği). İkinci bir hikâye tekrar olur. |
| A12 Artanlığın ispatı · A13 Bire birliğin ispatı · A14 Grafik mi, cebir mi? | İspat ve doğrulama tekniği. "Örnek yetmez, ispat gerekir" fikrini 1. temanın siyah kuğu hikâyesi taşıyor. |
| A15 Bir aralıkta en büyük ve en küçük değer | Uç noktanın dahil olup olmaması 1. temada (B2, lunapark boy sınırı) hayattan kurulu; burada yeni olan yalnızca fonksiyona uygulanışı. |
| B1 \|x\| ile f(x) = x · B2 \|x\|'in parçalı gösterimi · B3 ±\|x\|'in nitel özellikleri | Mutlak değerin uzaklık anlamı ön bilgi; 1. temada kombi hikâyesi var. Açılışlar (evin doğusu ve batısı, borç, eve en yakın yer) yeterli. |
| B5 c ile yukarı aşağı · B6 Mutlak değerli fonksiyonun parçalı gösterimi | V biçimli grafiği ve iki parçayı 3 numaralı hikâye (durağı kaçırmak) taşıyor; c ile taşıma işlem tekniği. |
| C1 Problemi fonksiyona çevirmek · C3 f(x) = g(x): iki doğrunun kesişimi · C4 f(x) ≤ g(x) ve f(x) ≥ g(x) | Dersler programın istediği gibi gerçek yaşam problemiyle kurulu (kargo tarifesi, arz-talep; arz-talep programın kendi örneği). Bkz. bölüm 6, ilk aday. |
| C5 \|f(x)\| = k · C6 \|f(x)\| < k ve \|f(x)\| > k | Fikir 1. temanın kombi hikâyesinde (\|x − 22\| < 1); dersler de dolum makinesi ve ilaç dolabı payıyla kurulu. |
| C7 \|f(x)\| = g(x) · C8 \|f(x)\| ≤ g(x) ve \|f(x)\| ≥ g(x) | İşlem tekniği. Öğrencinin gündelik hayatında doğrudan karşılığı yok; hikâye zorlama olur. |
| C9 Çözümü başka yoldan sınamak | Çalışma alışkanlığı; kendiliğinden anlaşılır. |

## 6. Değerlendirip elediğim adaylar

| Aday | Ders | Neden elendi |
|---|---|---|
| "Abonman mı, tek biniş mi?" Aylık abonman 600 TL, tek biniş 15 TL: 40 binişte başa baş (fiyatlar kurgu). | C3, C4 | Koşul 3. A9 ve C4 zaten iki ücret tarifesini karşılaştırıyor (C1 de kargo ücretiyle açılıyor); aynı fikir üçüncü kez gelirdi. **Sınırda aday:** öğrencinin kendi verdiği bir karar olduğu için hikâye olarak değil, C4'teki kargo örneğinin yerine dersin kendi örneği olarak düşünülebilir. Gerçek tarifeler sık değiştiği için sayılar zaten kurgu kalırdı. |
| "Bu kullanıcı adı alınmış." İki kişi aynı kullanıcı adını alamaz, aynı görünen adı alabilir. | A5 | Koşul 3. Dersin açılışı (okul numarası) aynı fikir; konu kendiliğinden anlaşılır. |
| Elektrik faturasında kademeli tarife (A16 için başka nesne). | A16 | Koşul 2 zayıf (faturayı öğrenci okumuyor); kademe sınırı ve fiyatlar sık değişiyor, güncel değer doğrulanmadı. Kural tam olarak parçalı doğrusal olduğu için yedek adaydı; hakem şarj hikâyesini "yaklaşık olarak" sözü koşuluyla kabul etti, yedeğe gerek kalmadı. |
| Akort uygulaması: hedef 440 Hz, sapma \|f − 440\|. | B4, B5 | Koşul 1. Uygulama işaretli sapmayı (pes ya da tiz) gösterir, mutlak değeri değil; matematik giydirilmiş olurdu. |
| Dolum makinesi payı: 500 g ± 10 g. | C5, C6 | 1. temanın kombi hikâyesinin tekrarı. |

## 7. Hakem incelemesi (7 Ekim 2026)

Bağımsız hakem raporu: `../HIKAYE-HAKEM.md`. Puanlar 0–10 (9–10: 1. temanın en güçlü hikâyeleri düzeyi; 7–8: küçük düzeltmeyle üretilir; 5–6: ciddi zaaf). Hakemin istediği düzeltmeler bu dosyaya işlendi; puanlar düzeltmeden önceki taslağa aittir.

| Hikâye | Müfredat | Katkı | Toplam | Karar |
|---|---|---|---|---|
| C10 Kapı pervazındaki çizgiler | 9 | 9 | 18 | Kalsın |
| A16 Şarjın son yüzde yirmisi | 9 | 8 | 17 | Düzeltilerek kalsın |
| B4 Durağı kaçırdın | 7 | 7 | 14 | Düzeltilerek kalsın |

| Değişiklik | Gerekçe |
|---|---|
| Sıra değişti: C10 birinci, A16 ikinci | Hakem puanı; C10 temanın (ve bütün listenin) en yüksek puanlı hikâyesi. |
| A16: anlatıma "yaklaşık olarak" girdi | Gerçek şarj eğrisinin son bölümü doğru parçası değil; söylenmezse hikâye parçalı doğruyu yanlış örnekle öğretir. |
| A16: vurgu "60. dakikada dolar tahmini tutmadı"dan "üç aralık, üç kural"a kaydı | Eski şaşırtan an C10 ile aynı kalıptaydı (doğrusal tahmin aralık dışında tutmuyor). |
| A16: süreler 25, 55 ve 95 dakika oldu (hızlar 2, 1, yarım puan) | "Dakikada 5/3 puan" sesle söylenmiyordu; sayılar zaten kurguydu. |
| B4: hesap uygulamaya değil öğrenciye verildi; sahne yol tarifi değil, işaretli durak | "Uygulama işareti atıp uzaklığı gösteriyor" doğru bir mekanizma değildi. |
| A16, C10 ve B4'te sınırda kalan koşullar açık yazıldı; A16'nın A6–A10 ve C1–C4'ten farkı belirtildi | "Ders hayattan kurulu" gerekçesi başka dersleri elerken A16'yı elemiyordu. |

Bütçe daralırsa bu temada ilk vazgeçilecek B4'tür (listenin tamamında ikinci sırada).
