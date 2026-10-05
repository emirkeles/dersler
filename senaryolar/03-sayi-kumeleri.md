# 03 – Sayı Kümeleri ve İşlem Özellikleri: "Matruşka Sayılar"

> 9. Sınıf Matematik · 1. Sayılar teması · Alt konu 03
> Bu belge, web animasyonuna (interaktif ders) dönüştürülecek ders senaryosudur. Matematiksel tüm örnekler tek tek doğrulanmıştır.
>
> **Güncelleme (5 Ekim 2026):** Sahne 9 (0,999… = 1 ve devirliden kesre) ve Sahne 12 (π ve 22/7 tuzağı) dersten çıkarıldı: program bunları ön bilgi sayıyor ve öğrencinin kafasını karıştırıyordu. Derste sonraki sahneler birer/ikişer numara yukarı kaydı (eski 10 → 9, 11 → 10, 13 → 11, 14 → 12). Sınıflandırma oyunundaki 0,9̄ kartının yerine −8/2 geldi; özetteki "merak köşesi" kaldırıldı.

---

## 1. Künye

| Alan | İçerik |
|---|---|
| **Ders adı** | Sayı Kümeleri ve İşlem Özellikleri: N ⊂ Z ⊂ Q ⊂ R (Matruşka Sayılar) |
| **Sınıf / tema** | 9. sınıf Matematik, 1. Sayılar |
| **Süre** | Yaklaşık 14 dk etkileşimli: 14 sahne ≈ 12 dk (720 sn) + mini sınav ve özet ≈ 2 dk. Hızlı ilerleyen öğrenci 10–11 dk'da bitirir. Sahne sürelerine etkileşim bekleme payı dahildir. Öğrenci cevap verene kadar oynatma durur, bu yüzden süre ±%30 oynar. |
| **Öğretim yaklaşımı** | Problem → ihtiyaç → yeni kutu. Her kümenin neden doğduğu, "kapalılık testi" ile görsel olarak sınanır. |

### 1.1 Kazanımlar (ölçülebilir)

Ders sonunda öğrenci:

1. **K1 – Sınıflandırma:** N, Z, Q, Q′ (irrasyonel) ve R kümelerini sembolle gösterir. Verilen 10 sayıdan en az 8'ini doğru "en küçük kutuya" yerleştirir (Sahne 14).
2. **K2 – Kapalılık:** Bir kümenin bir işleme göre kapalı olup olmadığına, gerekirse bir karşı örnek bularak karar verir. N, Z, Q için 4 işlemlik kapalılık tablosunu hatasız doldurur (Sahne 6).
3. **K3 – Genişleme nedeni:** Her genişlemenin hangi eksikten doğduğunu açıklar. N→Z: çıkarma (3−5). Z→Q: bölme (3÷4). Q→R: kenarı 1 olan karenin köşegeni √2'nin hiçbir kesirle yazılamaması (Sahne 2–4, 10).
4. **K4 – Rasyonel ↔ ondalık:** Kesri uzun bölmeyle ondalığa çevirir. Kalanlara bakarak neden biteceğini ya da devredeceğini gerekçelendirir. Devirli ondalığı kesre çevirir (örn. 0,4545… = 5/11) (Sahne 7–9).
5. **K5 – İrrasyonel:** √2 ve π'nin ondalık açılımının ne bittiğini ne devrettiğini, bu yüzden irrasyonel olduklarını söyler. 22/7 ve 3,14'ün π olmadığını bilir. √4 ve √9'un rasyonel olduğunu gösterir (Sahne 10–12, 14).
6. **K6 – İşlem özellikleri:** Değişme, birleşme, etkisiz eleman, ters eleman özelliklerini toplama ve çarpma için her kümede doğru/yanlış olarak belirler. Çıkarma ve bölmede değişme/birleşme olmadığını karşı örnekle gösterir. "Ters eleman var → ters işlem kapalı" bağlantısını kurar (Sahne 5).

### 1.2 Ön bilgi

- Doğal sayılar, tam sayılar, kesirler ve dört işlem (8. sınıf düzeyi).
- Sayı doğrusunda sayı yerleştirme. Uzun bölme algoritması.
- Karenin alanı. Pisagor bağıntısı 8. sınıftan bilinir. Ancak köşegen fikri **alan yoluyla da** anlaşılacak biçimde tasarlandı (Sahne 10).

### 1.3 Bu senaryonun tutarlı kabulleri (tüm sahnelerde aynen kullanılacak)

| Kabul | Gösterim |
|---|---|
| **0 doğal sayıdır** (müfredata uygun). | N = {0, 1, 2, 3, …}. Pozitif doğal sayılar: N⁺ = {1, 2, 3, …}. |
| Tam sayılar | Z = {…, −2, −1, 0, 1, 2, …} |
| Rasyonel sayılar | Q = { a/b : a, b ∈ Z, b ≠ 0 } |
| İrrasyonel sayılar | Q′ = R − Q. Kesir olarak yazılamayan reel sayılardır. |
| Reel sayılar | R = Q ∪ Q′ ve Q ∩ Q′ = ∅ |
| Ondalık gösterim | Virgüllü (0,25). Devreden kısım **üst çizgiyle** gösterilir: 0,3̅ ; 0,4̅5̅ . Ekranda ayrıca "0,333…" biçimi de yazılır. |
| 0'a bölme | **Tanımsızdır.** "Bölme" denince "0'dan farklı bölenle bölme" kastedilir. |
| Kapalılık | Bir A kümesi bir işleme göre kapalıdır ⇔ A'dan alınan **her** iki elemanın işlem sonucu A'dadır. **Tek bir karşı örnek** kapalılığı bozar. Tek bir olumlu örnek kapalılığı **kanıtlamaz.** |
| Kapsam dışı | Cebirsel ifadeler, dağılma özelliği, karekök kuralları, mutlak değer, aralıklar, √2'nin resmî ispatı (yalnızca isteğe bağlı "Merak kutusu"nda 4 adım). |

---

## 2. Ana fikir ve kavram haritası

### 2.1 Ana fikir (tek cümle)

**Her yeni sayı kümesi, bir öncekinde "sonucu kutunun dışına çıkan" bir işlemi (ya da bir uzunluğu) kurtarmak için doğdu. Ondalık açılımı bitiyor ya da devrediyorsa sayı rasyoneldir. Ne bitiyor ne devrediyorsa sayı hiçbir kesir kutusuna sığmaz, yani irrasyoneldir.**

### 2.2 Kavram haritası

```
                         ┌───────────────────────────── R (Gerçek sayılar) ───────────────────────────────┐
                         │  = Q ∪ Q′   (sayı doğrusunun TÜM noktaları, delik yok)                          │
                         │                                                                                 │
                         │   ┌────────────── Q (Rasyonel) ──────────────┐     ┌── Q′ (İrrasyonel) ──┐     │
                         │   │ a/b, a,b ∈ Z, b≠0                        │     │ √2, √3, √5, π, …     │     │
                         │   │ ondalık açılım: BİTER ya da DEVREDER     │     │ ondalık: ne biter    │     │
                         │   │                                          │     │ ne devreder          │     │
                         │   │   ┌──────── Z (Tam sayılar) ────────┐    │     │ toplama/çarpmada     │     │
                         │   │   │ …,−2,−1,0,1,2,…                 │    │     │ KAPALI DEĞİL         │     │
                         │   │   │ toplama ters elemanı VAR        │    │     └──────────────────────┘     │
                         │   │   │   ┌──── N (Doğal) ────┐         │    │                                  │
                         │   │   │   │ 0,1,2,3,…         │         │    │                                  │
                         │   │   │   │ +,× kapalı        │         │    │                                  │
                         │   │   │   └───────────────────┘         │    │                                  │
                         │   │   └─────────────────────────────────┘    │                                  │
                         │   └──────────────────────────────────────────┘                                  │
                         └─────────────────────────────────────────────────────────────────────────────────┘

Genişleme zinciri ("ihtiyaç oku"):
  N  ──(3 − 5 yapılamıyor: toplamanın ters elemanı yok)──▶  Z
  Z  ──(3 ÷ 4 yapılamıyor: çarpmanın ters elemanı yok)───▶  Q
  Q  ──(kenarı 1 olan karenin köşegeni √2 hiçbir kesir değil; sayı doğrusunda delik)──▶  R

Köprü kavramlar:
  ters eleman var  ⇒  ters işlem kapalı      (a − b = a + (−b),  a ÷ b = a · (1/b))
  kesir  ⇄  ondalık açılım                   (uzun bölme + "kalan defteri")
  kapalılık testi = "sonuç hangi kutuda?"    (yeşil: kutuda kalır, kırmızı: kutudan çıkar)
```

---

## 3. Yanlış kavramalar listesi

| Kod | Yanlış kavrama | Doğrusu | Hangi sahnede çürütülür |
|---|---|---|---|
| **M1** | "0 doğal sayı değildir." | Bu derste ve müfredatta 0 ∈ N. Gerekçe: toplamada etkisiz eleman 0 olmalıdır. "Kaç elma var?" sorusunun cevabı 0 olabilir. | **S2**, S5 |
| **M2** | "−3 (ve tüm tam sayılar, 5 gibi) rasyonel değildir. Rasyonel = üstte-altta sayı olan." | Her tam sayı n = n/1 ile yazılır. Z ⊂ Q. | **S4**, S14 |
| **M3** | "Devreden ondalık rasyonel değildir. Sonsuza gidiyorsa irrasyoneldir." | 0,333… = 1/3. Devreden her ondalık bir kesirdir. | **S8, S9** |
| **M4** | "Ondalığı çok uzun (ya da karmaşık) görünen sayı irrasyoneldir." (Tersi: "Kalıbı olan sayı rasyoneldir.") | Ölçüt uzunluk değil, **devretme**dir. 1/7'nin devri 6 basamak, 1/17'nin 16 basamaktır, yine rasyoneldir. 0,1010010001… kalıp var ama devretmez, irrasyoneldir. | **S8**, S14 (bonus) |
| **M5** | "π = 22/7" (ya da π = 3,14). | 22/7 = 3,142857… (devreden, rasyonel). π = 3,14159265… irrasyonel. 3,14 yalnız yaklaşık değerdir. | **S12** |
| **M6** | "Kök içi olan her sayı irrasyoneldir." | √4 = 2, √9 = 3, √(1/4) = 1/2 rasyoneldir. Kök içi tam kare (ya da tam kare bir kesir) değilse irrasyoneldir (√2, √3, √5…). | **S10**, S14 |
| **M7** | "İrrasyonel sayılar azdır, bir iki tane vardır." | Sonsuz çoktur. İki rasyonel sayının arasında hep bir irrasyonel de vardır. √1…√20 içinde 16'sı irrasyoneldir. | **S13** |
| **M8** | "Bir örnekte sonuç kümede kaldıysa küme o işlemde kapalıdır." / "Bir işlemde kapalıysa hepsinde kapalıdır." | Kapalılık **her** çift için doğru olmalıdır. Tek karşı örnek yeter. (8÷2=4 ama 3÷4 ∉ Z.) | **S2**, S3, **S6** |
| **M9** | "3 − 5 yapılamaz / sonuç yoktur." | Sonuç var (−2). Yalnız N'de yok. "Yapılamaz" değil, "sonuç kutunun dışında." | **S2, S3** |
| **M10** | "Çıkarma ve bölmede de değişme/birleşme özelliği vardır." | 7−3 ≠ 3−7. (10−4)−3 ≠ 10−(4−3). (8÷4)÷2 ≠ 8÷(4÷2). | **S5** |
| **M11** | "İki irrasyonelin toplamı/çarpımı yine irrasyoneldir." | √2+(−√2)=0 ve √2·√2=2. Q′ toplama ve çarpmada kapalı değildir. | **S13** |
| **M12** | "0,999… 1'e çok yakındır ama 1 değildir." | 0,999… = 1 (aynı sayının iki yazılışı). | **S9** |
| **M13** | "Q'da bölme her zaman yapılır, 5/0 de bir rasyoneldir." | b ≠ 0 koşulu vardır. Sıfıra bölme tanımsızdır. | **S4**, S6 |
| **M14** | "√2 = 1,414 (hesap makinesindeki değer tam değerdir)." | Ekrandaki değer yaklaşıktır. √2'nin ondalık açılımı bitmez ve devretmez. | **S11** |
| **M15** | "Her sayının çarpma tersi vardır (0'ın bile) / tam sayıların hepsinin çarpma tersi Z'dedir." | 0'ın çarpma tersi hiçbir kümede yoktur. Z'de yalnız 1 ve −1'in çarpma tersi Z'dedir. | **S5** |
| **M16** | "Biten/devreden ayrımı rastgeledir ya da payda çift ise devreder." (Uzun bölmede kalan takibini yanlış yapmak.) | Kalan 0 olursa biter. Kalan tekrar ederse devreder. Sadeleşmiş kesirde payda yalnızca 2 ve 5 asal çarpanlarını taşıyorsa biter. | **S7, S8** |

---

## 4. Sahneler

**Sahne listesi ve süre tablosu**

| No | Başlık | Süre (sn) |
|---|---|---|
| S1 | İç içe matruşkalar | 35 |
| S2 | N: Saymak ve ilk kapalılık testi | 50 |
| S3 | Z: Borç, ya da 3 − 5'in cevabı | 50 |
| S4 | Q: Paylaşmak, ya da 3 ÷ 4'ün cevabı | 50 |
| S5 | İşlem özellikleri: "Geri alma düğmesi" | 65 |
| S6 | Kapalılık laboratuvarı | 60 |
| S7 | Kesir ondalığa dönüşünce: biten ondalıklar | 40 |
| S8 | Devreden ondalıklar: kalan defteri | 70 |
| S9 | 0,999… = 1 ve devirliden kesre | 45 |
| S10 | Kare, köşegen ve sayı doğrusundaki delik | 60 |
| S11 | √2'nin ondalığı: hiç bitmeyen yaklaşım | 55 |
| S12 | π: tekerlek ve 22/7 tuzağı | 35 |
| S13 | Asiler ve R: irrasyonellerde kapalılık | 45 |
| S14 | Büyük sınıflandırma: Bu sayı hangi kutuya girer? | 60 |
| | **Toplam** | **720 sn = 12 dk** |

---

### 4.0 Ortak sahne sabitleri (tüm sahneler için)

**Sahne tuvali:** 1280 × 720 birim (16:9). Tüm koordinatlar sol üst köşe (0,0) kabulüyle. Güvenli kenar boşluğu 48. **Altyazı bandı** y = 652–708 (yükseklik 56, tam genişlik, ortalı, yarı saydam zemin). Anlatım sesi ve altyazı birlikte akar, okunan kelime vurgulanır.

**Renk jetonları** (hex değerleri Bölüm 6.1): `--n`, `--z`, `--q`, `--r`, `--irr`, `--ok`, `--err`, `--ink`, `--bg`.

**Matruşka geometrisi (iç içe halkalar).** Her kutu, üstü büyük yarıçaplı yuvarlatılmış, altı küçük yarıçaplı (36) bir "matruşka siluetidir". Hepsinin tabanı aynı çizgide (y = 620), yatayda ortalı (x merkezi 640):

| Kutu | x | y | Genişlik | Yükseklik | Üst köşe yarıçapı | Dolgu | Çizgi |
|---|---|---|---|---|---|---|---|
| R | 120 | 50 | 1040 | 570 | 200 | `--r` %10 opaklık | `--r` 3 px |
| Q | 200 | 130 | 880 | 490 | 170 | `--q` %12 | `--q` 3 px |
| Z | 280 | 210 | 720 | 410 | 140 | `--z` %14 | `--z` 3 px |
| N | 360 | 290 | 560 | 330 | 110 | `--n` %16 | `--n` 3 px |

- **Etiket çipleri** (yuvarlak, 56×56, harf 28 px kalın): R (640, 82), Q (640, 162), Z (640, 242), N (640, 322). Çiplerin altında küçük ad yazısı: "Gerçek", "Rasyonel", "Tam sayı", "Doğal" (14 px).
- **Q′ (irrasyonel) bölgesi:** R'nin içinde, Q'nun **dışında** kalan banttır (R ile Q arasındaki 80 px'lik halka). Bu bant kesikli çizgi (8 px çizgi, 6 px boşluk) ve `--irr` tonuyla çizilir.
- **Sayı jetonu:** Yuvarlatılmış hap şekli, yükseklik 40, yarıçap 20, yatay dolgu 16, yazı 22 px tabular rakam. Sürüklenince 1,08 ölçeğine büyür ve gölge alır. Jeton yazısı kesir ise "pay/payda" biçiminde ve iç içe (yatay çizgili) gösterilir.

**Kapalılık Kapısı (yeniden kullanılan test bileşeni).** Ekranın üst ortasında (x 340–940, y 40–110) bir "formül çubuğu": `[ A ]  [ işlem ]  [ B ]  =  [ sonuç ]`.
- A ve B yuvalarına jeton sürüklenir (ya da tıklanır).
- İşlem butonları: **+ − × ÷** (48×48).
- "Test et" tuşuna basılınca sonuç hesaplanır (tam kesir aritmetiği). Sonuç jetonu çubuktan çıkıp **seçili kutu** halkasına doğru uçar (0,6 sn, easeInOutCubic).
- **Sonuç kutunun içindeyse (yeşil):** Halka `--ok` ile 3 kez nabız atar (0,2 sn aralıkla), jeton halkanın içine yerleşir, yanında ✓ simgesi belirir ve kısa yükselen iki notalı ses çalar.
- **Sonuç kutunun dışındaysa (kırmızı):** Jeton halka çizgisine çarpar (5 px geri sekme). Halka çizgisi `--err` ile yanıp söner ve çizgi üzerinde kesikli kırmızı bir "kapı" ışığı yanar. Jeton çizgiyi geçip **kendi gerçek kutusuna** (örn. −2'yi Z halkasına) süzülür. Orada "dışarıda!" etiketi ve ✗ simgesi çıkar. Ekran 8 px, 3 kez sarsılır (300 ms). Alçak "bzzt" sesi çalar.
- Renk körlüğü için her zaman simge de kullanılır: ✓ ve ✗ (yalnız renk yok).
- **Sıfıra bölme:** Sonuç çubuğunda gri "tanımsız" rozeti çıkar. Ne yeşil ne kırmızı sayılır, deneme sayılmaz.

**Sayı doğrusu sabitleri.** Yatay çizgi y = 400, kalınlık 4, uçlarda ok. Her sahne kendi ölçeğini belirtir.

**Kural kutusu (ekran notu) ortak davranışı.** Sahne bittiğinde görsel alan sola, ölçek 0,55'e küçülür (0,6 sn, easeInOutCubic). Sağda 520×440 bir panel açılır (x 700, y 90, köşe yarıçapı 20). Başlık 22 px, madde 20 px. Madde madde 0,5 sn arayla belirir. "Deftere ekle" otomatik çalışır, panel sağ üstte "Defter" sekmesine (üst sağ köşe, sayaç rozetli) küçülerek gider. Öğrenci istediği an Defter'i açıp tüm kural kutularını görür.

**Geri bildirim kuralı.** Doğru: yeşil şerit + ✓ + kısa onay cümlesi. Yanlış: kırmızı şerit + ✗ + "nedenini" söyleyen cümle ve görsel ipucu. 2. yanlışta çözüm animasyonu kendiliğinden oynar. Hiçbir geri bildirimde "yanlış!" tek başına verilmez.

---

### Sahne 1 – İç içe matruşkalar

**Süre:** 35 sn · **Öğrenme amacı:** Dört kutunun iç içe ilişkisini (N ⊂ Z ⊂ Q ⊂ R) sezdirmek, derslik sorusunu koymak: "Bu kutuları kim, neden büyüttü?"

**Anlatım (altyazı/ses metni):**
"Matruşkaları bilirsin: büyük olanı aç, içinden bir küçüğü çıkar. Sayılar da böyle iç içe yaşıyor: doğal sayılar, tam sayıların içinde; tam sayılar, rasyonellerin içinde; rasyoneller de gerçek sayıların içinde. Ama kimse bu kutuları bir günde yapmadı. Her yeni kutu, bir öncekinde yapılamayan bir işlem yüzünden doğdu. Bugün bunun hikâyesine bakacağız."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–1,5 sn | Koyu zemin (`--bg`) belirir. Başlık "Matruşka Sayılar" ortada 48 px, 0 → 1 opaklık. Alt başlık: "Sayı kümeleri ve işlem özellikleri". |
| 1,5–4,0 sn | Başlık yukarı kayıp küçülür (y=40, 24 px). Ekranın ortasında (x merkezi 640, taban y=620) **tek, kapalı** bir matruşka belirir: R siluet, ölçek 0,5 (genişlik 520, yükseklik 285). Sakin bir giriş (yukarıdan 30 px süzülerek, easeOutBack, 0,8 sn). Üstünde R çipi. |
| 4,0–8,0 sn | Matruşka **açılır:** siluetin üst %45'i (y = taban − 0,45·yükseklik çizgisinin üstü, clip-path) 40 px yukarı kalkıp 12° saat yönünün tersine döner (0,8 sn). İçinden Q siluet (ölçek 0,5·(880/1040)=0,42 hâlinde) yükselir, Q çipi yanar. Aynı hareket Z (4,0→5,8 sn) ve N (5,8→7,6 sn) için tekrarlanır. Her açılışta kısa tahta "tık" sesi. En içte kalan N matruşkasının içinde 0,1,2,3… jetonları kıpırdar. |
| 8,0–11,0 sn | Üst yarılar kapanıp geri iner. Kamera "kesit" görünümüne geçer: dört siluet, 4.0'daki iç içe halka geometrisine **tam ölçekte** dönüşür (ölçek 0,5→1; 1,0 sn, easeInOutCubic). Etiket çipleri sırayla (N, Z, Q, R; 0,3 sn arayla) dolar. |
| 11,0–14,0 sn | Halkalar arasında yazı: N ⊂ Z ⊂ Q ⊂ R, her ⊂ simgesi belirdikçe sol küme kısaca parlar. Altta ince metin: "Her kutu bir öncekinden gerçekten daha büyük: her biri bir ihtiyaçtan doğdu." |
| 14,0–35,0 sn | **Tahmin kartı** (etkileşim). |

**Etkileşim (ısınma tahmini, puanlanmaz):**
- Soru kartı (üst orta): **"Hangi sayı yalnızca en büyük kutuya (R) sığar?"**
- Dört jeton alta dizilir (x = 340, 520, 700, 880; y=560): **5**, **−3**, **1/2**, **√2**. Öğrenci birine tıklar ya da kutuya sürükler.
- **√2'ye tıklarsa (doğru):** Jeton R bandına yerleşir (Q′ bandı kesikli çizgiyle yanar). Metin: "Doğru sezgi! √2 hiçbir kesir kutusuna sığmıyor. Birazdan nedenini göreceğiz."
- **5, −3 veya 1/2'ye tıklarsa:** Jeton, bulunduğu en küçük kutuya gider (5→N, −3→Z, 1/2→Q) ve ilgili halka yanar. Metin: "Bu sayı daha küçük bir kutuya da sığıyor: <kutu>. Hepsini kutuya yerleştirdiğinde hangisinin ‘kaçak’ olduğunu göreceksin." (Hâlâ yeşil/kırmızı yok. Bu nötr bir ısınma. 2. denemeye izin verilir, 2. yanlışta √2 kendiliğinden yanıp söner.)

**Ekran notu / kural kutusu:**
- **N ⊂ Z ⊂ Q ⊂ R:** her küme bir sonrakinin içindedir.
- Her genişleme, bir öncekinde **yapılamayan** bir işlem ya da uzunluk yüzünden doğdu.

---

### Sahne 2 – N: Saymak ve ilk kapalılık testi

**Süre:** 50 sn · **Öğrenme amacı:** N kümesini (0 dahil) tanımak; kapalılık testini ilk kez görmek; N'nin toplamada ve çarpmada kapalı, çıkarmada kapalı olmadığını görmek. **Çürüttüğü kavramalar:** M1, M8, M9.

**Anlatım:**
"İlk kutu saymak için yapıldı: sıfır, bir, iki, üç… Sepette hiç elma yoksa da ‘kaç elma var?’ sorusunun cevabı sıfırdır, bu yüzden sıfır da bu kutuda. Şimdi bir test kuralı öğrenelim: iki sayıyı al, işlem yap. Sonuç hâlâ kutunun içindeyse yeşil, dışına çıkıyorsa kırmızı yanar. Buna kapalılık testi diyoruz."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–2,0 sn | Kamera N halkasına yakınlaşır (ölçek 1→2,2, merkez: N halkasının merkezi; 1,2 sn). Dış halkalar (Z, Q, R) %15 opaklığa solar. |
| 2,0–7,0 sn | Alt kısımda bir **sayı doğrusu** (y=500). Ölçek: `x = 200 + 100·n`, n = 0…9 (x = 200…1100). Noktalar sırayla (0,25 sn arayla) dolar. 0 noktası ilk dolar ve **biraz daha parlak** (`--n`, halka efektli). Üstünde etiketler 0, 1, 2, …, 9 ve sağ uçta "…" (sonsuz). |
| 7,0–12,0 sn | **0 vurgusu:** Boş bir sepet (basit çizim, 120×90, x=140,y=330) belirir. Yanında "kaç elma?" balonu → "0". 0 noktasından sepete ince bir çizgi. Altta mini formül: `a + 0 = a`. "Toplamada etkisiz eleman olabilmek için 0 N'de olmalı." (Etkisiz eleman S5'te ayrıntılanır.) |
| 12,0–14,0 sn | Sepet solar. Üstte **Kapalılık Kapısı** açılır. Seçili kutu = N (N halkası kalın, çip yanıyor). |
| 14,0–50,0 sn | Rehberli kapalılık testi (aşağıda). |

**Etkileşim: rehberli kapalılık testi.** Üç hazır deneme sırayla gelir, öğrenci her birinde "Test et"e basar (ya da jeton seçer). Sistem önce **tahmin** sorar.

1. **Deneme 1: 2 + 7.** Tahmin kartı: "Sonuç N'nin içinde mi? Evet / Hayır". Doğru: Evet → sonuç 9 N'ye yerleşir, **yeşil nabız**. "9 ∈ N: yeşil."
2. **Deneme 2: 4 × 6.** Aynı. Sonuç 24 → yeşil.
3. **Deneme 3: 3 − 5.** Tahmin kartı: "Sonuç ne olur?" Üç seçenek: **(a) −2**, **(b) 2**, **(c) Yapılamaz, sonuç yok.** Seçenek üzerinden akış:
   - **(a) −2 seçilirse:** "Evet, sonuç −2. Peki −2 bu kutuda mı?" Jeton −2 N halkasına doğru uçar, çizgiye çarpar, **kırmızı** olur ve Z'nin halkasına süzülür. (Kırmızı uyarı: "−2 ∉ N")
   - **(b) 2 seçilirse:** Geri bildirim: "5 − 3 olsaydı 2 olurdu. Burada 3'ten 5 çıkarıyoruz; 3'ten geriye gittiğimiz için sıfırın soluna düşüyoruz." Sayı doğrusunda 3'ten 5 adım sola oklar gösterilir. 0'ı geçip −2'ye iner ve doğrunun sol ucu "buradan sonrası N'de yok" duvarıyla biter.
   - **(c) Yapılamaz seçilirse:** Geri bildirim (M9): "Yapılabiliyor. Sonuç var: −2. Sorun işlemde değil; sonucun yaşayacağı yer N'de yok." Sonra (a) animasyonu oynar.
4. **Soru:** "Toplama ve çarpma için ‘kapalı’ diyebilir miyiz?" Ekranda iki kart: **"2 + 7 yeşil çıktı; yeter."** / **"Her çiftte yeşil olmalı."** Doğru kart ikincisi. İlk seçilirse geri bildirim (M8): "Bir örnek yeterli değil! Bunu laboratuvarda deneyeceğiz. Ama şu kadarı kesin: iki doğal sayının toplamı ve çarpımı her zaman doğal sayıdır." Ardından tablo kutusu açılır:

| N | + | − | × | ÷ |
|---|---|---|---|---|
| Kapalı mı? | ✓ | ✗ (3−5=−2) | ✓ | ? (bekliyor) |

   ÷ sütunu "?" kalır ve soluk görünür (S3'te açılacak).

**Ekran notu / kural kutusu:**
- **N = {0, 1, 2, 3, …}** (bu derste 0 ∈ N). N⁺ = {1, 2, 3, …}.
- **Kapalılık:** her çift için sonuç kümede kalıyorsa küme o işlemde kapalıdır. **Tek karşı örnek** kapalılığı bozar.
- N, toplama ve çarpmada **kapalı**dır. Çıkarmada **kapalı değildir:** 3 − 5 = −2 ∉ N.

---

### Sahne 3 – Z: Borç, ya da 3 − 5'in cevabı

**Süre:** 50 sn · **Öğrenme amacı:** Z'nin, N'de yapılamayan çıkarmayı (toplamanın ters elemanını) kurtarmak için doğduğunu görmek; Z'nin toplama, çıkarma, çarpmada kapalı, bölmede kapalı olmadığını görmek. **Çürüttüğü kavramalar:** M8, M9.

**Anlatım:**
"Cüzdanında 3 lira var ve 5 liralık bir şey alıyorsun. Geriye ne kalır? Borcun kalır: eksi iki lira. İşte yeni kutuyu doğuran şey bu: sıfırın soluna uzanan sayılar. Doğal sayılara eksi sayıları ekleyince tam sayılar, yani Z kutusu oluştu. Şimdi aynı testi bu kutuda yapalım. Çıkarma yeşil yandı. Peki bölmede ne olacak?"

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–2,0 sn | Kamera N'den Z'ye geri çekilir (ölçek 2,2→1,5). Z halkası `--z` rengiyle parlar. Önceki sahnedeki kırmızı "−2 ∉ N" jetonu Z halkasında bekler. |
| 2,0–9,0 sn | **Cüzdan animasyonu:** Sol altta cüzdan çizimi (x=120,y=470,100×70). İçinde 3 madeni para (her biri 28 px, `--n` tonu). 5 liralık bir etiket (kasa fişi, `--ink`) sağdan gelir. Cüzdandan 3 madeni para fişin üzerine gider. Fişte hâlâ "2 lira eksik" yazısı yanar. Yanında "−2" jetonu `--z` renginde belirir. |
| 9,0–16,0 sn | **Sayı doğrusu** (y=400). Ölçek: `x = 640 + 100·k`, k = −5…5 (x = 140…1140). Sağ taraf (0…5) `--n` renkli, **sol taraf (−1…−5) `--z` renkli ve sağdan sola 0,2 sn aralıkla doğar.** 3'ten (x=940) başlayan 5 adımlık kavisli ok sola atlar: 2, 1, 0 (0'da kısa duraklama) −1, −2 (x=440). Ok ucu jeton gibi −2'de (x=440) kalır. |
| 16,0–18,0 sn | **Ters eleman bağı:** 5'in altında yeni etiket "−5" (x=140), iki ok: `5 + (−5) = 0` (kısa formül). Mavi vurgulu "3 − 5 = 3 + (−5)". (Ters eleman S5'te işlenecek; burada yalnız tohum.) |
| 18,0–22,0 sn | Kamera Z'ye döner. Kapalılık Kapısı açılır. Seçili kutu: Z. |
| 22,0–50,0 sn | Kapalılık testi (aşağıda). |

**Etkileşim: kapalılık testi (Z'de).**

| Sıra | Deneme | Tahmin | Sonuç / animasyon |
|---|---|---|---|
| 1 | 3 − 5 | "Z'de kalır mı?" | −2 ∈ Z → **yeşil nabız.** "Dün kırmızıydı; bugün yeşil." |
| 2 | (−2) + (−3) | tahmin | −5 ∈ Z → yeşil. |
| 3 | (−2) × (−3) | tahmin | 6 ∈ Z → yeşil. (Not balonu: eksi × eksi = artı.) |
| 4 | **3 ÷ 4** | tahmin (Evet/Hayır) | 3/4 = 0,75 → **kırmızı.** Jeton Z halkasından çıkar, Q halkasına süzülür. Etiket: "3/4 ∉ Z, Q'ya ait." |

- **Bonus akıl yürütme (4. denemeden sonra):** Kartta "8 ÷ 2 = 4 ∈ Z. Peki bölmede Z kapalı mı?" Seçenekler: **Evet** / **Hayır**. **Evet** seçilirse geri bildirim (M8): "Bir örnek yeterli değil! 8÷2=4 yeşil ama 3÷4 kırmızı. Tek bir kırmızı örnek bile yeter." **Hayır** seçilirse onay: "Aynen. Karşı örnek: 3 ÷ 4."
- Tablo güncellenir (N satırının altına Z satırı):

| Küme | + | − | × | ÷ |
|---|---|---|---|---|
| N | ✓ | ✗ | ✓ | ? |
| Z | ✓ | ✓ | ✓ | ✗ (3÷4) |

**Ekran notu / kural kutusu:**
- **Z = {…, −2, −1, 0, 1, 2, …}.** N ⊂ Z.
- Z, **toplama, çıkarma, çarpma**da kapalıdır. **Bölmede kapalı değildir:** 3 ÷ 4 ∉ Z.
- Z doğdu, çünkü N'de yapılamayan 3 − 5 gibi işlemlerin sonucuna bir yer gerekiyordu.

---

### Sahne 4 – Q: Paylaşmak, ya da 3 ÷ 4'ün cevabı

**Süre:** 50 sn · **Öğrenme amacı:** Q'nun, Z'de yapılamayan bölmeyi kurtarmak için doğduğunu görmek; Q = {a/b} tanımını, her tam sayının rasyonel olduğunu (n = n/1), 0'a bölmenin tanımsız olduğunu kavramak; Q'nun dört işlemde kapalı olduğunu görmek. **Çürüttüğü kavramalar:** M2, M13.

**Anlatım:**
"Üç çikolatayı dört kişiye eşit paylaştır: herkese 3 bölü 4 düşer. Bu sayı tam sayı değil, ama gerçek bir paylaşım sonucu. İşte rasyonel sayılar kutusu böyle doğdu: üstü ve altı tam sayı olan, altı sıfır olmayan her kesir. Peki 5 ya da −3 bu kutuya girer mi? Evet: 5 = 5/1, −3 = −3/1. Yani tam sayılar da rasyoneldir. Rasyonel kutusunda dört işlem de yeşil yanar. Yalnız bir kural var: sıfıra bölemeyiz."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–2,0 sn | Kamera Q'ya geri çekilir (ölçek 1,5→1,2). Q halkası `--q` ile parlar. Z'den süzülen "3/4" jetonu hâlâ Q halkasında. |
| 2,0–9,0 sn | **Çikolata animasyonu:** Üç dikdörtgen çikolata barı (her biri 120×50, 4 kareli; x=120,260,400; y=470). Her barın 4. karesi parlayarak ayrılır. 4 kişi simgesi (daireli "baş" + gövde; x=640…820) belirir. Her kişiye üç çeyrek kare akar. Son durumda bir kişinin elinde 3 parça. Etiket: "3 ÷ 4 = 3/4". |
| 9,0–14,0 sn | **Q tanımı yazılır** (üst orta, 30 px): `Q = { a/b : a, b ∈ Z, b ≠ 0 }`. "b ≠ 0" kısmı turuncu çerçeveyle vurgulanır. |
| 14,0–22,0 sn | **Tam sayılar kutuya bürünür:** Üç jeton alttan gelir: **5**, **−3**, **0**. Her biri Q halkasına sürüklenir. Jeton yazısı kesre dönüşür (0,5 sn morf): 5 → 5/1, −3 → −3/1, 0 → 0/7. Etiket: "Her tam sayı n = n/1." |
| 22,0–30,0 sn | **Yoğunluk:** Sayı doğrusu (y=400) 0…1 aralığı ölçek: `x = 240 + 800·t` (0 → x=240, 1 → x=1040). Önce 0 ve 1. Sonra 1/2 (x=640), ardından 1/4 (x=440), 3/4 (x=840), 1/3 (x≈507), 2/3 (x≈773) doğar. Ortada yazı: "İki kesrin arası her zaman başka bir kesir içerir: (a+b)/2." Bu bir ön sezgidir: kesirler doğruyu dolduruyormuş gibi görünür (S10'daki sürpriz için). |
| 30,0–38,0 sn | Kapalılık Kapısı açılır, Q seçili. Dört hazır deneme **otomatik** (öğrenci "Test et"e basar): 1/2 + 1/3 = 5/6 ✓, 1/2 − 3/4 = −1/4 ✓, 2/3 × 3/4 = 1/2 ✓, (1/2) ÷ (3/4) = 2/3 ✓. Dört yeşil nabız. |
| 38,0–50,0 sn | **Sıfıra bölme:** Öğrenci 5 ÷ 0 dener (kapıya 0 jetonu yerleştirilir). Sonuç gri rozet: "tanımsız". Balon: "5 ÷ 0 = ? olsaydı 0 × ? = 5 olmalı. Hiçbir sayı 0 ile çarpılınca 5 vermez." Tablo satırı eklenir. |

**Etkileşim:**
1. **Sürükle-bırak: "Bu sayı Q'ya girer mi?"** Dört jeton: **5**, **−3**, **0**, **5/0**. Öğrenci hangilerinin Q'ya girdiğini belirler (Q halkasına sürükler ya da "girmez" çöpüne atar).
   - 5, −3, 0 → Q'ya girer. ✓ "Doğru: n = n/1."
   - **5/0** → "girmez" çöpüne gitmeli. Q'ya bırakırsa (M13): jeton geri sekmeyle çıkar, kırmızı: "5/0 tanımsız: b ≠ 0 olmalı."
   - 5, −3 ya da 0'ı "girmez" çöpüne atarsa (M2): jeton geri döner. Kırmızı: "Girer! Her tam sayı n/1 biçiminde yazılır: −3 = −3/1." Morf animasyonu oynar.
2. **Tahmin:** "Q'da 1/2 − 3/4 yapınca sonuç kutuda kalır mı?" (sonucu görmeden). Evet/Hayır. Doğru: Evet.

Tablo (N, Z satırlarının altına Q):

| Küme | + | − | × | ÷ |
|---|---|---|---|---|
| N | ✓ | ✗ | ✓ | ? |
| Z | ✓ | ✓ | ✓ | ✗ |
| Q | ✓ | ✓ | ✓ | ✓ (0'a bölme hariç) |

**Ekran notu / kural kutusu:**
- **Q = { a/b : a, b ∈ Z, b ≠ 0 }.** Her tam sayı rasyoneldir: n = n/1. Yani **Z ⊂ Q.**
- Q, **dört işlemde kapalı**dır (0'a bölme hariç; a/0 tanımsızdır).
- Q doğdu, çünkü Z'de yapılamayan 3 ÷ 4 gibi işlemlerin sonucuna bir yer gerekiyordu.

---

### Sahne 5 – İşlem özellikleri: "Geri alma düğmesi"

**Süre:** 65 sn · **Öğrenme amacı:** Değişme, birleşme, etkisiz eleman ve ters eleman özelliklerini sezgisel olarak anlamak; "ters eleman var ⇒ ters işlem kapalı" bağını kurmak. N→Z ve Z→Q genişlemelerinin nedeninin ters eleman eksikliği olduğunu görmek. **Çürüttüğü kavramalar:** M1, M10, M15. (Cebirsel ifade ve dağılma özelliği bu senaryonun konusu değildir.)

**Anlatım:**
"Toplama ve çarpmanın dört güzel özelliği var. Birincisi: sıra fark etmez, 3 + 5 ile 5 + 3 aynı. İkincisi: gruplama fark etmez. Üçüncüsü: öyle bir sayı var ki hiçbir şeyi değiştirmez; toplamada bu 0, çarpmada 1. Dördüncüsü: her sayının bir ‘geri alma düğmesi’ var. Çıkarma ve bölmede ise sıra da gruplama da önemli. Asıl hikâye şu: 3 − 5 ve 3 ÷ 4 yapılamıyordu; çünkü geri alma düğmesi, yani ters eleman, kutuda yoktu."

**Görsel & animasyon (iki bölüm):**

**Bölüm A – Değişme ve birleşme (0–22 sn).**

| Zaman | Ne olur |
|---|---|
| 0,0–1,5 sn | Ekran 2 sütuna ayrılır: sol **"Toplama / Çarpma"** (`--ok` tonlu başlık), sağ **"Çıkarma / Bölme"** (`--err` tonlu başlık). Kutu geometrisi küçülüp üst ortada (ölçek 0,25) kalır. |
| 1,5–6,0 sn | **Değişme:** Solda iki blok (3 mavi, 5 turuncu; her biri 1 birim=24 px kare yığını) yan yana. "3 + 5" yazısı. Bloklar yer değiştirir (0,8 sn, eğrisel yol) → "5 + 3". İkisi de 8: yeşil ✓. Aynı şey "3 × 5 = 15 = 5 × 3" için, 3×5 satır-sütun ızgarası **90° döner.** Sağda aynı bloklarla "7 − 3 = 4" yazılır, bloklar yer değiştirir → "3 − 7 = −4" (kırmızı ✗: "4 ≠ −4"). Bölme için "6 ÷ 3 = 2", yer değişince "3 ÷ 6 = 1/2" (✗). |
| 6,0–14,0 sn | **Birleşme:** Solda `(2 + 3) + 4` parantezi 2+3 bloğunu çevreler (=5), sonra `2 + (3 + 4)` parantezi kayar (=9) → ikisi de 9 ✓ (çarpma için `(2 × 3) × 4 = 24 = 2 × (3 × 4)`). Sağda `(10 − 4) − 3`: 10 bloğundan 4, sonra 3 çıkar → 3. Parantez kayınca `10 − (4 − 3)`: önce 4−3=1, sonra 10−1 → 9. 3 ≠ 9: ✗. Aynı biçimde bölme: `(8 ÷ 4) ÷ 2 = 1`, `8 ÷ (4 ÷ 2) = 4` → ✗. |
| 14,0–22,0 sn | Soldaki iki kutuda "Değişme ✓, Birleşme ✓". Sağdaki iki kutuda "Değişme ✗, Birleşme ✗" yazar. Altında özet: **"Toplama ve çarpmada ✓, çıkarma ve bölmede ✗."** |

**Bölüm B – Etkisiz eleman ve ters eleman: "Geri alma düğmesi" (22–65 sn).**

| Zaman | Ne olur |
|---|---|
| 22,0–29,0 sn | **Etkisiz eleman:** Sayı doğrusunda 4 noktası. "+ 0" düğmesine basılır: nokta yerinden oynamaz (0,4 sn titreşme, sonra durur). "× 1" düğmesi: 4 yine 4'te. Etiket: "Etkisiz eleman: işleme katılınca sayıyı **değiştirmeyen** sayı." Toplamada 0, çarpmada 1. Not: "Bu yüzden 0'ın N'de olması gerekir: N'de toplamanın etkisiz elemanı 0." (M1 pekiştirme.) |
| 29,0–36,0 sn | **Ters eleman (toplama):** Ekranda sayı doğrusu (y=400, ölçek: `x=640+100k`, k=−5…5). Nokta 5'te (x=1140). Soru: "5'ten **başlangıca (0'a)** dönmek için kaç eklemeliyiz?" Yazı: `5 + □ = 0`. Kutuya "−5" yazılır. **Z modunda (z rengi, sol taraf var)** −5 jetonu kutuya yerleşir, ok 0'a döner: ✓ "−5, 5'in toplamaya göre tersi." **N modunda** (sayı doğrusunun sol tarafı karartılır): kutu boş kalır, ok sol uca çarpıp duvarda durur: **✗ "N'de 5'in toplama tersi yok."** |
| 36,0–45,0 sn | **Ters eleman (çarpma):** Başlangıç 3 → "× 4" ile 12 → geri almak için "× □" . Yazı: `3 · □ = 1` (çarpmanın etkisiz elemanı 1'e dönmek). **Z modu:** kutuya sayı yok (1/3 ∉ Z) → ✗. **Q modu:** 1/3 jetonu kutuya yerleşir, ok 1'e döner ✓ "3'ün çarpma tersi 1/3." Sonra **0** için deneme: `0 · □ = 1` → hiçbir jeton uymaz, Q modunda bile ✗. Etiket: "0'ın çarpma tersi hiçbir kümede yok. (0 ile çarpınca her şey 0 olur, geri dönüş yok.)" |
| 45,0–55,0 sn | **Büyük bağ ("ters eleman ⇒ ters işlem"):** İki satır belirir. `a − b = a + (−b)`: "Çıkarma, tersini eklemektir." `a ÷ b = a · (1/b)`: "Bölme, tersiyle çarpmaktır." Altında iki ok: **"Toplama tersi N'de yok → çıkarma N'de kapalı değil → Z doğdu."** / **"Çarpma tersi Z'de yok → bölme Z'de kapalı değil → Q doğdu."** Ok renkleri `--n→--z` ve `--z→--q`. |
| 55,0–65,0 sn | **Özellik kartı** (aşağıdaki tablo) sağ tarafta kural kutusu olarak yazılır. |

**Etkileşim: "Ters eleman avı" (Bölüm B içinde, 3 görev).** Üstte küme sekmeleri N / Z / Q. Altta jeton tepsisi. Soldaki yuvada "a + □ = 0" ya da "a · □ = 1" eşitliği; öğrenci tepsiden uygun jetonu sürükler.

| Görev | Küme sekmesi | Eşitlik | Doğru cevap | Geri bildirim |
|---|---|---|---|---|
| 1 | **Z** | `7 + □ = 0` | **−7** | ✓ "−7 ∈ Z, toplama tersi var." Yanlış jeton (örn. 7): kırmızı, "7 + 7 = 14, sıfır değil." |
| 2 | **Z** | `2 · □ = 1` | **Hiçbiri** (tepsi: −2, 1, −1, 2) | Tepside doğru jeton yok; öğrenci "Yok" düğmesine basmalı. ✓ "1/2 ∉ Z. Tam sayılarda 2'nin çarpma tersi yok." Eğer −1 ya da 1'i seçerse: ✗ "2 · 1 = 2; 1 değil." |
| 3 | **Q** | `(−2/3) · □ = 1` | **−3/2** | ✓ "(−2/3)·(−3/2) = 6/6 = 1." Yanlış: 3/2 seçilirse ✗ "(−2/3)·(3/2) = −1. Eksi işaretini de çevir." (M15 pekiştirme: "0 dışındaki her rasyonelin çarpma tersi Q'dadır.") |

**Ekran notu / kural kutusu (özellik tablosu, "✓ var / ✗ yok"):**

| Özellik | N | Z | Q | R |
|---|---|---|---|---|
| Toplama ve çarpmada **değişme** | ✓ | ✓ | ✓ | ✓ |
| Toplama ve çarpmada **birleşme** | ✓ | ✓ | ✓ | ✓ |
| Toplamada **etkisiz eleman** (0) | ✓ | ✓ | ✓ | ✓ |
| Çarpmada **etkisiz eleman** (1) | ✓ | ✓ | ✓ | ✓ |
| Toplamaya göre **ters eleman** (−a) | ✗ (yalnız 0) | ✓ | ✓ | ✓ |
| Çarpmaya göre **ters eleman** (1/a) | ✗ (yalnız 1) | ✗ (yalnız 1 ve −1) | ✓ (0 hariç) | ✓ (0 hariç) |
| Çıkarma, bölmede değişme/birleşme | ✗ | ✗ | ✗ | ✗ |

- **Ters eleman varsa, ters işlem (çıkarma/bölme) kapalıdır.** Genişlemelerin asıl nedeni budur.
- 0'ın çarpma tersi hiçbir kümede yoktur.

---

### Sahne 6 – Kapalılık laboratuvarı

**Süre:** 60 sn · **Öğrenme amacı:** Öğrencinin kapalılık tablosunu kendi denemeleriyle keşfetmesi; "tek karşı örnek yeter, olumlu örnekler kanıtlamaz" fikrinin yerleşmesi. **Çürüttüğü kavramalar:** M8, M13.

**Anlatım:**
"Şimdi laboratuvar sende. Bir kutu seç, iki sayı seç, işlemi seç, sonuca bak. Kırmızıyı bir kere görmen, o kutunun o işlemde kapalı olmadığını göstermeye yeter. Ama hep yeşil görmen yetmez: ‘neden hep yeşil?’ sorusunu da sormalısın."

**Görsel & animasyon:**
- Sol (x 48–680): küçültülmüş matruşka (ölçek 0,6). Üst orta: **Kapalılık Kapısı.** Alt orta: **jeton tepsisi** (y 540–620).
- Sağ (x 700–1232, y 90–470): **3×4 kapalılık tablosu** (satır: N, Z, Q; sütun: +, −, ×, ÷). Hücreler başlangıçta "?" (gri). Hücre boyutu 120×64. Her hücrede ayrıca küçük bir "karşı örnek" ya da "neden?" satırı belirebilir.
- **Tepsi içeriği (kümeye göre):**
  - N: 0, 1, 2, 3, 4, 5, 6, 8, 12
  - Z: −6, −3, −2, −1, 0, 1, 2, 3, 6
  - Q: −3/4, −1/2, −1/3, 0, 1/4, 1/3, 1/2, 2/3, 3/4, 5
- **Deneme sonuç kuralları:**
  - **Kırmızı sonuç:** İlgili hücre hemen ✗ olur, hücrede deneme yazılır (örn. "3 − 5 = −2 ∉ N"). Bir daha test gerekmez.
  - **Yeşil sonuç:** Hücre "…" (ara durum) olur, yeşil deneme sayacı artar (1/3, 2/3, 3/3). 3 farklı yeşil denemeden sonra hücrede **"Neden hep yeşil?"** düğmesi çıkar.
  - **Neden?** düğmesi kısa bir açıklama kartı açar. Öğrenci kartı okuyunca hücre ✓ olur ve kilitlenir.
    - N,+ ve N,×: "Doğal sayı kadar şey ile doğal sayı kadar şeyi birleştirirsen / ya da bir tablo (satır×sütun) kurarsan yine doğal sayı kadar şey olur."
    - Z,−: "a − b = a + (−b). Z'de her sayının toplama tersi var."
    - Z,+ ve Z,×: "Tam sayıların toplamı/çarpımı yine tam sayı."
    - Q,+,−,×: "a/b ± c/d = (ad ± bc)/bd, a/b · c/d = ac/bd; pay ve payda yine tam sayı, payda sıfır olmaz."
    - Q,÷: "a/b ÷ c/d = a/b · d/c; c ≠ 0 ise d/c vardır."
  - **Sıfıra bölme:** Gri rozet, tabloya işlenmez; kart: "0'a bölme tanımsız; kapalılık testine girmez."

**Etkileşim (hedefli görevler):**
1. **Görev 1 – "Kırmızıyı bul."** Tabloda N satırının ✗ hücrelerini (−, ÷) ve Z satırının ÷ hücresini ✗ yap. Doğru: ilgili hücre ✗ olur. İpucu (60 sn sonra): "N'de küçük bir sayıdan büyüğünü çıkar." / "Z'de 3 ÷ 4 dene."
2. **Görev 2 – "Yeşil için neden iste."** En az 3 hücreyi (örn. Z,−, Q,+, Q,÷) ✓ yap (Neden? kartı okunmalı).
3. **Tuzak sorusu (M8):** Öğrenci N satırı ÷ sütununda ilk denemesi olarak 8 ÷ 2 = 4 (yeşil) yaparsa kart: "Bu deneme yeşil. Bu, N'nin bölmede kapalı olduğu anlamına gelir mi? Birkaç farklı çift daha dene." Öğrenci 3 ÷ 4'ü denerse hücre ✗ olur, "Tek karşı örnek yetti."
4. **Atla seçeneği:** "Laboratuvarı atla"; tablo otomatik doldurulur, ancak M8 uyarısı bir kez gösterilir.

**Ekran notu / kural kutusu (tablo, doğru sonuçlar):**

| Küme | + | − | × | ÷ (b ≠ 0) |
|---|---|---|---|---|
| **N** | ✓ | ✗ (3−5) | ✓ | ✗ (3÷4) |
| **Z** | ✓ | ✓ | ✓ | ✗ (3÷4) |
| **Q** | ✓ | ✓ | ✓ | ✓ |
| **R** | ✓ | ✓ | ✓ | ✓ |

- **Kırmızı bir örnek yeter. Yeşil örnekler yetmez, “neden?” gerekir.**
- (R satırı kilitli görünür. S13'te açılır. Q′ sütunu da S13'te eklenir.)

---

### Sahne 7 – Kesir ondalığa dönüşünce: biten ondalıklar

**Süre:** 40 sn · **Öğrenme amacı:** Her rasyonel sayının bir ondalık açılımı olduğunu, bazılarının bittiğini görmek; uzun bölmede "kalan defteri" aracını tanıtmak. **Çürüttüğü kavramalar:** M16 (kısmen).

**Anlatım:**
"Her rasyonel sayının bir ondalık adresi var: payı paydaya bölersen bulursun. Bir bölü dört: bölmeyi yap. On bölü dört, iki, kalan iki. Yirmi bölü dört, beş, kalan sıfır. Kalan sıfır olunca bölme biter: 0,25. Biten ondalık sayılar, rasyonelin en kolay hâlidir."

**Görsel & animasyon:**

**Uzun bölme yerleşimi (Türkiye'de alışık biçim):** Sol panel (x 80–620, y 120–560). **Bölünen** solda, dikey bir çizgi, çizginin sağında **bölen**, bölenin altında yatay çizgi ve onun altında **bölüm.** Örn. bölünen "1,00", bölen "4". Sağ panel (x 660–1200, y 120–560): **"Kalan Defteri"**: defter görünümlü kart; her adımda kalan, alt alta bir satıra yazılır (başlık: "Kalanlar").

| Zaman | Ne olur |
|---|---|
| 0,0–4,0 sn | Matruşka köşeye çekilir. Başlık "1/4 = ?" Kesrin üstü bölünene, altı bölene "uçar." Uzun bölme düzeni kurulur. Bölüm alanına "0," yazılır (1 < 4 olduğu için; virgül konur ve bölünene bir 0 eklenir → 10). |
| 4,0–11,0 sn | **Adım 1:** "10 ÷ 4 = 2, kalan 2" yazılır. Bölüme **2** (0,25 sn'de büyüyüp yerleşir). 2×4=8 bölünende 10'un altına yazılır, çıkarılır, kalan **2** kalan defterine düşer. |
| 11,0–18,0 sn | **Adım 2:** Kalan 2'nin yanına 0 eklenir → 20. "20 ÷ 4 = 5, kalan 0." Bölüme **5** yazılır. 5×4=20, çıkarma, kalan **0** deftere yazılır. **0 yeşil çerçeveyle parlar,** "kalan 0 → bitti" etiketi çıkar. Sonuç: **1/4 = 0,25.** |
| 18,0–28,0 sn | Hızlı ikinci örnek, **3/8 = 0,375:** Adımlar tek ekranda yan yana belirir: 30÷8=3 kalan 6; 60÷8=7 kalan 4; 40÷8=5 kalan 0. Kalan defteri: 6, 4, 0 → biter. |
| 28,0–40,0 sn | **İpucu kartı (isteğe bağlı "Neden?"):** Paydaları 1/4 (2²), 3/8 (2³), 7/20 (2²·5) ve 1/6 (2·3) yan yana. İlk üçünde yeşil "biter", 1/6'da kırmızı "? bitmez" (S8'e geçiş). Metin: "Payda yalnızca 2 ve 5 çarpanlarından oluşuyorsa (sadeleşmiş kesirde) ondalık biter." |

**Etkileşim:**
- **Tahmin:** "7/20 biter mi devreder mi?" (2 seçenek.) Doğru: biter (7/20 = 0,35). Öğrenci uzun bölmeyi kendisi yaparak doğrular: 70÷20=3 kalan 10; 100÷20=5 kalan 0 → 0,35. 
  - "Devreder" seçerse: "Payda 20 = 2²·5; 3 ya da 7 gibi başka çarpan yok → biter."
- **İsteğe bağlı mikro görev:** 3/12 = 1/4: "Sadeleştirmeden bakma!" ipucu: "Önce sadeleştir, sonra payda çarpanlarına bak." (3/12'de payda 12 = 2²·3 görünür, ama sadeleşince 1/4'tür → 0,25.)

**Ekran notu / kural kutusu:**
- Her rasyonel sayının bir ondalık açılımı vardır (payı paydaya böl).
- Uzun bölmede **kalan 0 olursa** ondalık **biter:** 1/4 = 0,25 ; 3/8 = 0,375 ; 7/20 = 0,35.

---

### Sahne 8 – Devreden ondalıklar: kalan defteri

**Süre:** 70 sn · **Öğrenme amacı:** 1/3 ve 1/7 örnekleriyle "neden devreder?" sorusuna **kalan tekrarı** ile cevap vermek; devrin en fazla (bölen − 1) basamak olduğunu görmek. Uzun görünen ondalığın irrasyonel olmadığını kavramak. **Çürüttüğü kavramalar:** M3, M4, M16.

**Anlatım:**
"Peki kalan hiç sıfır olmazsa? Bir bölü üç: on bölü üç, üç, kalan bir. Yine bir. Yine on bölü üç, üç, kalan bir. Başladığımız kalana geri döndük, yani aynı adımları tekrar edeceğiz; üçler sonsuza kadar sürecek: 0,333… Buna devreden ondalık denir. Bir bölü yedi ise daha uzun bir döngü: bir, dört, iki, sekiz, beş, yedi, sonra yine baştan. Önemli nokta şu: döngü varsa sayı rasyoneldir; uzun görünmesi onu irrasyonel yapmaz."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–3,0 sn | Uzun bölme düzeni (S7 ile aynı yerleşim, bölünen "1,0000…", bölen 3). Kalan Defteri sağda. İlk kalan satırı: "başlangıç kalanı: 1" (altı çizili `--q` tonunda). |
| 3,0–15,0 sn | **1/3:** Her adım 2,5 sn: "10 ÷ 3 = 3, kalan 1". Bölüme 3, defterde kalan **1**. Birinci adımın kalanı olan defter satırı "1" yazıldığında, önceki **"1" satırı** (başlangıç kalanı) ile **kıvrımlı bir ok** bağlanır, ikisi `--q` tonunda parlar: **"Aynı kalan! Döngü."** Bölümde "3"ler art arda yanar ve üst çizgiyle işaretlenir: 0,3̅. Alt metin: **1/3 = 0,333… = 0,3̅.** |
| 15,0–19,0 sn | **"Neden döngü?"** kartı: "Bölme, yalnız kalana bakar. Aynı kalan gelince, aynı adımlar yeniden gelir." |
| 19,0–23,0 sn | **Tahmin sorusu (duraklar):** Bölen 7 ise, sıfır olmayan kaç farklı kalan çıkabilir? Seçenekler: **5 / 6 / 7 / sonsuz.** (Kalan her zaman bölenden küçük olmalıdır.) |
| 23,0–50,0 sn | **1/7:** Altı adım, her biri 3,5 sn. Defter satırları: 1 (başlangıç) → 3 → 2 → 6 → 4 → 5 → **1**. Adım dökümü: 10÷7=1 kalan 3 ; 30÷7=4 kalan 2 ; 20÷7=2 kalan 6 ; 60÷7=8 kalan 4 ; 40÷7=5 kalan 5 ; 50÷7=7 kalan 1. Altıncı adımda kalan 1, başlangıç kalanı 1 ile eşleşir. Ok çizilir, **döngü halkası** bölümde 142857 rakamlarının etrafında çizilir (dairesel animasyon). Sonuç: **1/7 = 0,142857142857… = 0,1̅4̅2̅8̅5̅7̅** (devir: 142857). |
| 50,0–60,0 sn | **Neden en fazla 6?** Defterin yanında 6 küçük kutucuk (1..6); her yeni kalan bir kutuyu doldurur. Yedinci adımda kutucukların hepsi dolu: yeni kalan mutlaka bir önceki kalanlardan biri olmak zorunda (güvercin yuvası sezgisi). Metin: "Kalan 0'dan farklı ve bölenden küçük. 7'de en fazla 6 farklı kalan var; en geç 6 adım sonra tekrar eder." |
| 60,0–70,0 sn | **"Uzun ≠ irrasyonel":** 1/17 kartı belirir: "1/17 = 0,0588235294117647 0588235294117647…", devir 16 basamak. Metin: "Ne kadar uzun olursa olsun, tekrar ediyorsa rasyoneldir." (Bu uzun dizi yalnız sayfada kayan bir şerit olarak gösterilir; öğrenci hesaplamaz.) |

**Etkileşim:**
1. **Tahmin (yukarıda):** doğru **6**. 
   - 5 seçilirse: "Kalanlar 1, 2, 3, 4, 5, 6 olabilir: 6 farklı değer." 
   - 7 seçilirse: "Kalan 0 olsaydı bölme biterdi; devreden bölmede 0 çıkmaz. 0 hariç yalnız 6 değer (1, 2, 3, 4, 5, 6) kalıyor."
   - sonsuz seçilirse (M16): "Kalan her zaman 7'den küçük. Sonsuz çeşit olamaz."
2. **Sürükle-bırak: "Biter mi, devreder mi?"** Dört kesir kartı: **1/8**, **5/6**, **2/5**, **4/9**. Öğrenci "BİTER" ya da "DEVREDER" kutusuna sürükler. (Kontrol: 1/8=0,125 biter; 5/6=0,8333… devreder (0,83̅); 2/5=0,4 biter; 4/9=0,444… devreder (0,4̅).)
   - Yanlış kutuya bırakırsa uzun bölme kendiliğinden ilk 3 adımı oynatır. Geri bildirim: "Kalanlara bak: <kalan dizisi>."
   - **Tüm kartlar doğru yerleştiğinde:** Yeşil şerit: "Dördü de rasyonel: ondalık açılımı bitiyor ya da devrediyor."

**Ekran notu / kural kutusu:**
- Uzun bölmede kalan **0** olursa ondalık **biter**, kalan **tekrar ederse devreder.**
- **1/3 = 0,3̅ ; 1/7 = 0,1̅4̅2̅8̅5̅7̅** (devir 6 basamak). Paydası *b* olan kesirde devir en fazla *b − 1* basamaktır.
- **Her rasyonelin ondalık açılımı ya biter ya devreder.** Devreden ondalık da rasyoneldir.

---

### Sahne 9 – 0,999… = 1 ve devirliden kesre

**Süre:** 45 sn · **Öğrenme amacı:** Devirli ondalığın tamamen bir kesir olduğunu sezmek; 0,999… = 1 şaşırtmacası ile "devrediyor ama kesir" bağlantısını güçlendirmek. **Çürüttüğü kavramalar:** M3, M12.

**Anlatım:**
"Şimdi bir şaşırtmaca: 0,999… sayısı acaba 1'den küçük mü? Bir bölü üç, 0,333…. Bunu üçle çarp: bir, 0,999…. Yani bu iki yazılış aynı sayı: 0,999… = 1. Devreden her ondalık bir kesir; bunu bulmak için devri ‘örtüştürüp’ çıkarıyoruz."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–3,0 sn | Büyük soru: **"0,999… < 1 mi?"** (60 px). Yanında 0,9 → 0,99 → 0,999 sayı dizisi sağa kayar: sayı doğrusunda 0…1 aralığı (ölçek `x = 240 + 800t`, 1 → x=1040). Noktalar 0,9 (x=960), 0,99 (x=1032), 0,999 (x=1039,2)… 1'e yaklaşır, 1 noktasının üstüne yığılır. |
| 3,0–10,0 sn | **Kanıt 1 (ilişki):** Satır 1: `1/3 = 0,333…` ; satır 2 (×3): `3 · (1/3) = 3 · 0,333…` ; sonuç satırı: `1 = 0,999…`. Her satır ayrı ayrı belirir, ×3 ok animasyonu soldan yazılır. |
| 10,0–20,0 sn | **Kanıt 2 (örtüştürme):** `x = 0,999…`. İkinci satır `10x = 9,999…`. Alt alta yazılıp ondalık virgüller hizalanır, kuyruklar (999…) aynı renge boyanır. Çıkarma: `10x − x = 9,999… − 0,999… = 9` → `9x = 9` → `x = 1`. Kuyruklar "kayıp gider" (soluklaşır). |
| 20,0–35,0 sn | **Devirliden kesre – 0,4̅5̅:** `x = 0,4545…`. Öğrenci tahmin eder: "Kuyrukların örtüşmesi için x'i kaçla çarpmalıyız?" (10 / 100 / 1000). Doğru: **100**. `100x = 45,4545…` ; `100x − x = 45` ; `99x = 45` ; `x = 45/99 = 5/11`. Uzun bölme küçük bir kutuda doğrular: 5 ÷ 11 = 0,4545… |
| 35,0–45,0 sn | **Pratik kural kartı:** `0,3̅ = 3/9 = 1/3` ; `0,4̅5̅ = 45/99 = 5/11` ; "Devir kaç basamaksa o kadar 9: devir/99…9". |

**Etkileşim:**
1. **Tahmin:** "0,4545… için x'i kaçla çarpmalıyız?" Seçenekler: **10 / 100 / 1000.**
   - **100** doğru. ✓ 
   - **10** seçilirse: `10x = 4,5454…` ve `x = 0,4545…`: kuyruklar farklı (5454… ≠ 4545…); çıkarınca devir yok olmuyor. Animasyon çıkarmayı gösterir: kuyruklar çakışmaz. ✗ "Devir iki basamak, 100 ile çarp."
   - **1000** seçilirse: `1000x = 454,5454…`; `1000x − x = 454,0909…` (kuyruk yine yok olmuyor) → ✗ "Kuyruğu yok etmek için devrin basamak sayısı kadar kaydır: devir 2 basamak, 100 ile çarp." (Animasyon çıkarmayı gösterir, 0,0909… kuyruğu ekranda kalır.)
2. **Sürükle-bırak (mini, 3 kart):** Devirli ondalık kartlarını kesir kartlarıyla eşleştir: 0,6̅ ↔ 2/3 (= 6/9) ; 0,1̅ ↔ 1/9 ; 0,7̅ ↔ 7/9. Kesir kartları karışık gelir; her doğru eşleşmede uzun bölme küçük kutuda doğrulama yapar (2 ÷ 3 = 0,666…).
   - Yanlış eşleşirse (örn. 0,6̅ ↔ 6/10): "6/10 = 0,6 biter. 0,666… = 6/9 = 2/3." 
3. **M12 kartı (pasif):** "0,999… 1'e çok yaklaşıyor ama 1 değil" diyen bir öğrenci balonu ekranda belirir; tıklanınca cevap: "‘Çok yakın’ ile ‘eşit’ farklı şeyler; aralarında hiçbir fark kalmıyor. Aynı sayının iki yazılışı."

**Ekran notu / kural kutusu:**
- **0,9̅ = 1** (aynı sayının iki yazılışı).
- Devirli ondalık = kesir: devir kadar 9. **0,3̅ = 3/9 = 1/3 ; 0,4̅5̅ = 45/99 = 5/11.**

---

### Sahne 10 – Kare, köşegen ve sayı doğrusundaki delik

**Süre:** 60 sn · **Öğrenme amacı:** Kenarı 1 olan karenin köşegeninin (√2) bir uzunluk olarak var olduğunu, ama hiçbir kesirle yazılamadığını sezmek; "rasyoneller sayı doğrusunu doldurmuyor" fikrine varmak; R'nin doğuşu. Kök içi tam kareyse sonucun rasyonel olduğunu görmek. **Çürüttüğü kavramalar:** M6.

**Anlatım:**
"Kenarı bir birim olan bir kare düşün. Köşegeni kaç birim? Alan yoluyla bakalım: dört tane birim kareyi 2×2 olacak şekilde yan yana koy, büyük karenin kenar orta noktalarını birleştir: ortada yamuk duran bir kare çıkıyor. Bu karenin alanı 4'ün yarısı, yani 2. Kenarı da bizim köşegenimiz. Kendisiyle çarpılınca 2 veren sayı: karekök 2. Sayı doğrusunda var, kimse inkâr edemez. Ama hiçbir kesirle yazamayacağız. Rasyonel kutusu sonsuz kalabalık olsa bile, sayı doğrusunda delik kalıyor. O delikleri dolduran kutu: gerçek sayılar."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–6,0 sn | **Birim kare:** Sol ortada 160×160 kare (x 120–280, y 240–400), kenar etiketleri "1". Köşegen çizilir (sol alttan sağ üste, `--irr` rengi, 3 px, kesikli → çizgi). Etiket: **d = ?** |
| 6,0–18,0 sn | **Alan yöntemi:** 4 birim kare 2×2 düzeninde birleşir (kenar 320, x 480–800, y 160–480). Orta noktalar (800,320), (640,160), (480,320), (640,480) birleştirilir. Ortada **yamuk duran kare** (dönmüş) `--irr` tonuyla dolar. Dışarda kalan 4 üçgen soluk gri. Alan hesabı yazılır: dönmüş kare = 4 − 4·(1/2) = 2 ya da "4 köşe üçgeni, her biri yarım birim kare = 2; 4 − 2 = 2". Sağ yan metin: **dönmüş karenin alanı = 2** ; kenarı = köşegenimiz = d. **d · d = 2.** |
| 18,0–28,0 sn | **Köşegeni sayı doğrusuna taşıma:** Alt kısımda sayı doğrusu (y=600). Ölçek: `x = 240 + 300·u` (0 → x=240; 1 → x=540; 2 → x=840; 3 → x=1140). Pergel animasyonu: köşegenin uzunluğu pergelle ölçülüp 0'dan sağa yay çizilir. Yay, doğrunun x ≈ 664 noktasına (240 + 300·1,41421… ≈ 664,3) iner. Orada **parlayan boş nokta** belirir (`--irr`), etiketi **"d = √2"**. |
| 28,0–36,0 sn | Etraftaki kesir etiketleri sırayla yanar: **7/5** (x=660), **3/2** (x=690), 17/12 (x=665). Hiçbiri tam üstüne oturmaz (çok yakın ama değil). Metin: "Çok yakın; ama hiçbiri tam değil. √2 için kesir bulamayacağız (S11'de deneyeceğiz)." |
| 36,0–46,0 sn | **Kare–kenar ilişkisi (M6):** Alt panelde kenar uzunluğu ve alan ilişkisi: dört kare yan yana, alanlar **1, 2, 3, 4** (kenar uzunlukları 80, 113, 139, 160 birim piksel; yani `80·√alan`). Üstlerinde kenar etiketleri: **1 , √2 , √3 , 2**. Alanı 1 ve 4 olan kareler yeşil çerçeve ("kenar kesir: 1, 2"), alanı 2 ve 3 olan kareler `--irr` çerçeve ("kenar kesir değil"). Başlık: **"Kök içi tam kare ise sonuç düzgün bir sayı."** √4 = 2 çıkar, vurgulanır. |
| 46,0–60,0 sn | **R doğuyor:** Sayı doğrusundaki boş nokta (√2) ile birlikte diğer irrasyonel noktalar (√3 ≈ 1,732 → x≈759,6; π ≈ 3,14159 → x≈1182, doğrunun sağ ucunda) yavaşça belirir ve doğru **sürekli bir çizgi** hâlini alır (boşlukları dolduran ışıltılı yeni parçalar). Üstte matruşka geometrisinin **R halkası** parlar. Etiket: **R = Q ∪ Q′.** |

**Etkileşim:**
1. **Tahmin (18. sn'de, animasyon durur):** "d'yi tam bir kesirle yazabilir miyiz?" Üç seçenek: **Evet, büyük bir kesir bulabiliriz** / **Hayır, hiçbir kesir olmaz** / **Bilmiyorum.**
   - **Hayır:** "Doğru sezgi. Birazdan ondalık yaklaşımlarla bunu göreceğiz." 
   - **Evet:** "İşte tam da bunu deneyeceğiz (Sahne 11). Çok yakın kesirler bulunur ama hiçbiri tam eşit olmaz." (Hata değil, ön yargı notu.)
   - **Bilmiyorum:** "Sorun değil, birlikte bakacağız."
2. **Sürükle-bırak: "Hangi kare düzgün kenarlı?"** (36. sn civarı.) Sağ alttaki 4 kare kartı (alan 1, 2, 3, 4); öğrenci kenarı "düzgün sayı (kesir)" ya da "yeni sayı" kutusuna sürükler. Doğru: alan 1,4 → "düzgün"; alan 2,3 → "yeni sayı".
   - Yanlış: "Alan 4 olan karenin kenarı 2; kök içi tam kare olduğu için √4 = 2 rasyoneldir." (M6)
3. **İsteğe bağlı "Merak kutusu" (soluk düğme, 4 adım, ispat zorunlu değil):** Varsayalım √2 = p/q (sadeleşmiş). → p² = 2q². → p² çift ⇒ p çift, p = 2k. → 4k² = 2q² ⇒ q² = 2k² ⇒ q de çift. → p ve q ikisi de çift: sadeleşmiş varsayımıyla çelişir. Açılırsa 4 adım slayt gösterilir, 20 sn ek süre. **Zorunlu değil.** Sahne süresi hesabına katılmaz.

**Ekran notu / kural kutusu:**
- Kenarı 1 olan karenin köşegeni √2'dir (alanı 2 olan karenin kenarı). √2 sayı doğrusunda vardır ama **hiçbir kesirle yazılamaz.**
- **Q′ (irrasyonel):** kesir olarak yazılamayan reel sayılar. **R = Q ∪ Q′.** Sayı doğrusunun her noktası bir reel sayıdır.
- **Kök içi tam kare ise sonuç rasyoneldir:** √4 = 2, √9 = 3. Tam kare değilse irrasyoneldir: √2, √3, √5…

---

### Sahne 11 – √2'nin ondalığı: hiç bitmeyen yaklaşım

**Süre:** 55 sn · **Öğrenme amacı:** √2'nin ondalık açılımının ne bittiğini ne de devrettiğini sezmek (sıkıştırma yaklaşımı); en iyi kesir avcılığının bile √2'ye tam isabet edemediğini görmek. "Yaklaşık değer ≠ tam değer" (M14). **Çürüttüğü kavramalar:** M14, M4.

**Anlatım:**
"√2'yi sayı doğrusunda sıkıştıralım. 1,4'ün karesi 1,96; 1,5'in karesi 2,25. İkisinin arasında bir yerde. Bir basamak daha: 1,41 ve 1,42. Yine arasında. Sıkıştırma devam ediyor: 1,414 ve 1,415; 1,4142 ve 1,4143. Her adımda yeni bir rakam daha çıkıyor, ve hiçbir kalıp yok. Hesap makinesindeki 1,41421356…, kendisi değil, ilk birkaç basamağıdır."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–4,0 sn | Ekran ortada büyük sayı doğrusu parçası. Ölçek: 1,0 → 2,0 aralığı `x = 240 + 800·(v − 1)` (1,0 → x=240; 2,0 → x=1040). √2 noktası (x≈ 240+800·0,41421356 = 571,4) parlayan nokta olarak durur. |
| 4,0–12,0 sn | **Adım 1 – bir basamak:** 1,4 (x=560) ve 1,5 (x=640) işaretleri belirir. Üstlerinde karelerin hesabı: **1,4² = 1,96 < 2** (küçük) ve **1,5² = 2,25 > 2** (büyük). Aradaki bant `--irr` tonuyla dolar. Başlık: **1,4 < √2 < 1,5**. |
| 12,0–24,0 sn | **Zoom ×10:** Bant tüm doğruyu doldurur (ölçek ×10, 1,4→1,5 arası ekran genişliğine açılır; 0,8 sn). Yeni işaretler 1,41 ve 1,42: **1,41² = 1,9881 < 2** ; **1,42² = 2,0164 > 2** → **1,41 < √2 < 1,42**. Ardından zoom ×10: **1,414² = 1,999396 < 2** ; **1,415² = 2,002225 > 2** → **1,414 < √2 < 1,415**. Sonra zoom ×10: **1,4142² = 1,99996164 < 2** ; **1,4143² = 2,00024449 > 2** → **1,4142 < √2 < 1,4143**. Her zoom sonrası bant yeniden doldurulur. |
| 24,0–34,0 sn | **Rakam makinesi:** Ekranın ortasında bir "rakam şeridi" yatay kayar: **√2 = 1,41421356237309…** Rakamlar teker teker düşer, hiçbir yerde bir tekrar kalıbı (devir) oluşmaz. Karşılaştırma için üstte 1/7'nin şeridi: **0,142857 142857 142857…** (her devir halkalı). Altta iki satır: "1/7 → devreder → rasyonel" ; "√2 → ne biter ne devreder → irrasyonel." |
| 34,0–50,0 sn | **Kesir avcıları:** Sağ tarafta 5 kesir kartı yanar, her kartın altında karesi: **3/2** → 9/4 = **2,25** (>2) ; **7/5** → 49/25 = **1,96** (<2) ; **17/12** → 289/144 ≈ **2,00694** (>2) ; **41/29** → 1681/841 ≈ **1,99881** (<2) ; **99/70** → 9801/4900 ≈ **2,000204** (>2). Her kart karesine doğru "2"ye ulaşmaya çalışır; hiçbiri tam 2 olmaz (özellikle 99² = 9801 = 2·4900 + 1: bir fark kalıyor). |
| 50,0–55,0 sn | Alt yazı: **"Yaklaşık değer, değerin kendisi değildir."** |

**Etkileşim:**
1. **Tahmin (4. sn):** "1,4² nedir?" (hesap makinesi yok, uzun çarpma ipucu). Çoktan seçmeli: 1,96 / 1,69 / 2,16. Doğru: 1,96. Yanlış: "1,4 × 1,4 = 14 × 14 = 196 → iki ondalık basamak → 1,96."
2. **Kesir avcısı mini oyunu (34–50 sn):** Öğrenci 5 kesirden birini sürükleyip "kare makinesine" atar. Makine, karesini hesaplayıp **2 ile karşılaştırır** (> / < / =). Hiçbiri "=" vermez. 3 kesir denendikten sonra mesaj: "Hiçbir kesirin karesi tam 2 olmuyor. (Bunun sebebi, √2'nin kesir olmamasıdır.)"
3. **Gerçek/yanlış (M14):** Kart: "√2 = 1,414" ifadesi. Öğrenci **D / Y** seçer. Doğru: **Y** (yaklaşık değer). Geri bildirim: "Doğru yazım: √2 ≈ 1,414. Tam eşitlik değil, çünkü 1,414² = 1,999396 ≠ 2."

**Ekran notu / kural kutusu:**
- **√2 = 1,41421356…** Ondalık açılımı **ne biter ne devreder.**
- Ondalık açılımı **ne biten ne devreden** sayılar irrasyoneldir. Biten ya da devreden sayılar rasyoneldir.
- **Yaklaşık değer ≠ değerin kendisi:** √2 ≈ 1,414.

---

### Sahne 12 – π: tekerlek ve 22/7 tuzağı

**Süre:** 35 sn · **Öğrenme amacı:** π'nin çevre/çap oranı olarak sayı doğrusunda var olan, fakat irrasyonel bir sayı olduğunu görmek; 22/7 ve 3,14'ün π olmadığını, yalnız yaklaşım olduğunu görmek. **Çürüttüğü kavramalar:** M5.

**Anlatım:**
"Çapı bir birim olan bir tekerleği sayı doğrusunda bir tur yuvarla. Tekerleğin çevresi kadar yol gider: işte π. Yaklaşık 3,14159265… Okulda 22 bölü 7 diye öğrendik, ama o π değil: 22/7 = 3,142857…, devreden bir rasyonel sayı. π ise ne biter ne devreder. 22/7 sadece iyi bir yaklaşım."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–10,0 sn | Sayı doğrusu (y=560). Ölçek: `x = 240 + 250·u` (0 → x=240; 1 → x=490; 2 → x=740; 3 → x=990; π → x≈1025,4). Çap=1 olan tekerlek çizilir (daire, çap 250 px, merkez (240+0, 560−125)=(240,435); tekerleğin alt noktası 0'da). Çevresine bir **kırmızı işaret** konur. Tekerlek bir tur yuvarlanır (3 sn, lineer), işaret doğruya iz bırakır ve π noktasında durur (x≈1025). Etiket: **π ≈ 3,14159265…** (çevre / çap). |
| 10,0–17,0 sn | Yanda iki yaklaşım kartı: **3,14** ve **22/7**. 22/7'ye uzun bölme küçük bir kutuda yapılır: 22 ÷ 7 = 3 kalan 1; 10÷7=1 kalan 3; ... **22/7 = 3,142857142857…** (devir 142857; 1/7'deki devrin aynısı, 22/7 = 3 + 1/7). |
| 17,0–29,0 sn | **Büyüteç:** π'nin etrafında 3,140–3,145 aralığı ekran genişliğine açılır. Ölçek: `x = 240 + 160000·(v − 3,140)` (3,140 → x=240; 3,145 → x=1040). Noktalar: **π** (3,14159265 → x≈494,8), **3,14** (x=240), **22/7** (3,142857 → x≈697,1). Üçü ayrı noktalar olarak görünür. Aralarında uzaklık etiketi: **22/7 − π ≈ 0,00126.** |
| 29,0–35,0 sn | Sonuç tablosu: **π = 3,14159265358979…** (ne biter ne devreder) → **irrasyonel.** **22/7 → rasyonel**, **3,14 → rasyonel**, ikisi de π'ye yakın ama π değil. |

**Etkileşim:**
1. **Tahmin (10. sn):** "22/7 ile π aynı sayı mı?" **Evet / Hayır / Yakın ama aynı değil.** Doğru: Hayır (ya da "Yakın ama aynı değil"). Geri bildirim: "22/7 devreden bir kesir; π'nin ondalığı devretmiyor."
   - **Evet** seçilirse (M5): büyüteç animasyonu erkenden oynar, iki nokta ayrı gösterilir. ✗ "Büyüteç altında ayrılıyorlar."
2. **Sürükle-bırak (mini):** Üç kart (π, 22/7, 3,14) iki kutuya: **Rasyonel** / **İrrasyonel.** Doğru: π→irrasyonel, 22/7 ve 3,14 → rasyonel (3,14 = 314/100 = 157/50).

**Ekran notu / kural kutusu:**
- **π = çevre / çap ≈ 3,14159265…** İrrasyoneldir.
- **22/7 ≈ 3,142857… ve 3,14** yalnız π'ye yakın **rasyonel** sayılardır. π ≠ 22/7.

---

### Sahne 13 – Asiler ve R: irrasyonellerde kapalılık

**Süre:** 45 sn · **Öğrenme amacı:** Q′'nün toplama ve çarpmada kapalı **olmadığını** karşı örnekle görmek; R'nin Q ∪ Q′ olduğunu ve dört işlemde kapalı olduğunu kavramak; irrasyonellerin "az" olmadığını anlamak. **Çürüttüğü kavramalar:** M7, M11.

**Anlatım:**
"Asi sayıların kendi kutusu var mı? Hayır, çünkü iki asiyi toplayınca ya da çarpınca kutuyu terk edebilirler. Kök iki artı eksi kök iki sıfır; kök iki çarpı kök iki, iki. İkisi de rasyonel. Yani irrasyoneller kendi başına kapalı değil. Ama rasyonellerle birlikte tam bir takım oluşturuyorlar: gerçek sayılar. Ve asiler az değil: iki rasyonel sayının arasında hep bir irrasyonel var."

**Görsel & animasyon:**

| Zaman | Ne olur |
|---|---|
| 0,0–3,0 sn | Matruşka tam ekran geometrisine döner. **Q′ bandı** (R ile Q arasındaki halka) kesikli çizgiyle belirginleşir. İçinde √2, √3, π jetonları titreşir ("asiler"). |
| 3,0–16,0 sn | **Laboratuvar yeniden açılır,** tablo sağda. Yeni **Q′ sütunu** (kilit açılır) ve **R satırı.** Kapalılık Kapısı'nda seçili kutu: Q′ (kesikli halka). **Deneme 1:** √2 + (−√2) = **0.** Sonuç jetonu 0, Q′ halkasından geçerek Q halkasına (içeri) süzülür: kırmızı ✗ "0 ∈ Q, Q′ değil." **Deneme 2:** √2 × √2 = **2** → 2 jetonu Q (hatta N) bölgesine iner: ✗. **Deneme 3:** √2 − √2 = **0** ✗ ; **Deneme 4:** √2 ÷ √2 = **1** ✗. Tablo: Q′ → +, −, ×, ÷ hepsi ✗. |
| 16,0–24,0 sn | **Tamamlama:** Q ve Q′ halkaları "uçlarını" birleştirir; R'nin tek parça halkası parlar. Yazı: **R = Q ∪ Q′** ; **Q ∩ Q′ = ∅.** Tablodaki **R satırı** açılır: dört işlem de ✓ ("R'de dört işlem yeşil; 0'a bölme hariç"). Sezgi notu: "Sayı doğrusunda delik kalmadı; her işlem sonucu doğru üzerinde bir noktadır." |
| 24,0–34,0 sn | **"Rasyonel + irrasyonel" notu:** 1 + √2 = 2,41421356… yazılır (√2'nin ondalık kısmı aynen). Ondalık kısım değişmedi, hâlâ devretmiyor → irrasyonel. Metin: **"Rasyonel + irrasyonel her zaman irrasyoneldir; sıfırdan farklı rasyonel × irrasyonel de."** (Örnek: 2√2 = 2,8284271…) |
| 34,0–45,0 sn | **"Asiler az mı?"** √1, √2, …, √20 jetonları iki satırda dizilir. Tam kareler yeşil (rasyonel: √1, √4, √9, √16 → 4 tane), kalanlar `--irr` (irrasyonel: 16 tane). Sayaç: **4 rasyonel · 16 irrasyonel.** Ardından zoom: 1,41 ile 1,42 arasında √2 (irrasyonel) var; 1,414 ile 1,415 arasında da kesirler var. Metin: "Her aralıkta ikisi de bulunur." |

**Etkileşim:**
1. **Karşı örnek bulma (M11):** Kapı Q′ seçiliyken öğrenci iki irrasyonel (√2, √3, π, −√2, −π jetonlarından) ve bir işlem seçer. Sistem sonucu hesaplar.
   - **Rasyonel sonuç çıkarsa (örn. √2 + (−√2), π − π, √2·√2):** kırmızı ✗ + Q'ya süzülme animasyonu. "Karşı örnek bulundu: Q′ bu işlemde kapalı değil."
   - **İrrasyonel sonuç çıkarsa (örn. √2 + √3 ≈ 3,146; √2·√3 = √6):** yeşil (tek örnek). Mesaj: "Bu seferki irrasyonel çıktı ama tek örnek kapalılığı kanıtlamaz. Başka çift dene: √2 ile −√2." (M8)
   - Her durumda tablo, ilk ✗'de hücreyi kilitler.
2. **Tahmin:** "İki irrasyonelin çarpımı her zaman irrasyonel midir?" **Evet / Hayır.** Doğru: Hayır (√2·√2 = 2).
3. **Sürükle-bırak (isteğe bağlı):** √1…√20 jetonlarını "Rasyonel" / "İrrasyonel" kutularına ayır. Doğru: tam kareler (√1, √4, √9, √16) rasyonel, diğerleri irrasyonel. Yanlışta: "√9 = 3 ∈ N ⊂ Q." 

**Ekran notu / kural kutusu:**
- **Q′ toplama ve çarpmada (ve çıkarma, bölmede) kapalı değildir:** √2 + (−√2) = 0 ; √2 · √2 = 2.
- **R = Q ∪ Q′ ; Q ∩ Q′ = ∅.** R dört işlemde kapalıdır (0'a bölme hariç).
- İrrasyoneller **azdır** değil: her iki rasyonelin arasında irrasyonel, her iki irrasyonelin arasında rasyonel vardır. Rasyonel + irrasyonel = irrasyonel.

---

### Sahne 14 – Büyük sınıflandırma: Bu sayı hangi kutuya girer?

**Süre:** 60 sn · **Öğrenme amacı:** Tüm kavramları birleştirip, sayıları "en küçük kutu" kuralıyla yerleştirmek. Gizli tuzaklarla (12/4, 0,9̅, √9) M2, M3, M5, M6, M12'yi son kez sınamak. **Ölçüt:** K1 (10 sayıdan en az 8).

**Anlatım:**
"Son görev: sayıları en küçük kutularına yerleştir. Ama dikkat, bazıları kılık değiştirmiş. Bir sayının kutusunu ondalık açılımına, kök içine, bölme sonucuna bakarak bul. Küçük kutuya sığıyorsa, büyük kutular onu zaten içerir."

**Görsel & animasyon:**
- Matruşka tam geometri (ölçek 1). **Bölgeler:**
  - **N** (iç kutu), **Z halkası**, **Q halkası** ve **R−Q (Q′) halkası.** Yani sayı bırakılacak bölgeler dört taneden oluşur: N, Z, Q, Q′. R, tüm bölgenin toplamıdır.
  - Her bölge adını ve rengini taşır; bırakma bölgesinin üstünde kısa not: "N: sayma sayıları" / "Z: eksi sayılar da" / "Q: kesirler" / "Q′: kesir olmayanlar."
- Alt şeritte (y 560–620) 10 sayı kartı yan yana. Sıra karışık gelir. Kartlar jeton biçimindedir (40 px yüksek).
- Skor sayacı sağ üstte (0/10), ilerleme çubuğu.
- **Doğru bırakma:** Yeşil nabız, kart yerleşir. **Hatalı bırakma:** kırmızı sarsılma, kart geri döner + kısa gerekçe.
- **Çok geniş kutuya bırakma** (örn. 3'ü Z bölgesine): sarı uyarı: "Doğru ama daha küçük bir kutuya sığıyor." Kart otomatik olarak en küçük kutuya taşınır (puan yarım değil, tam olur; sadece bir ipucu gösterilir).

**Etkileşim: sürükle-bırak sınıflandırma (10 kart).**

| # | Kart | Doğru bölge | Gerekçe (hata/uyarı sonrası gösterilir) | Çürüttüğü kavrama |
|---|---|---|---|---|
| 1 | **0** | N | "0 doğal sayıdır (0 ∈ N)." | M1 |
| 2 | **−7** | Z | "Eksi tam sayı: Z'de, N'de değil." | |
| 3 | **12/4** | N | "12 ÷ 4 = 3 → bir doğal sayıdır. Kılık değiştirmiş!" | M2 |
| 4 | **0,25** | Q | "0,25 = 1/4: biten ondalık → rasyonel; tam sayı değil." | |
| 5 | **0,3̅** | Q | "Devreden ondalık: 0,3̅ = 1/3 → rasyonel." | M3 |
| 6 | **0,9̅** | N | "0,9̅ = 1 → doğal sayı!" | M12 |
| 7 | **√9** | N | "√9 = 3 → doğal sayı. Kök içi tam kare." | M6 |
| 8 | **22/7** | Q | "22/7 = 3,142857…: devreden → rasyonel; π değil." | M5 |
| 9 | **√2** | Q′ | "Ondalık açılımı ne biter ne devreder: irrasyonel." | |
| 10 | **π** | Q′ | "π ≈ 3,14159265…: ne biter ne devreder: irrasyonel." | M5 |

**Ek (isteğe bağlı) zor kartlar** (bitiren öğrenciye "bonus" olarak 3 kart): 
- **−√16** → Z ("√16 = 4 → −4 ∈ Z"), 
- **√(1/4)** → Q ("√(1/4) = 1/2 rasyonel"), 
- **0,101001000100001…** → Q′ ("Aralardaki sıfırlar her seferinde artıyor, **devreden bir blok yok;** kalıp var ama devir yok → irrasyonel"; M4).

**Geri bildirim (hatalı bırakmalarda özel metinler):**
- 12/4'ü Q'ya bırakırsa: "Doğru ama daha küçük bir kutu var: 12/4 = 3 ∈ N."
- 0,9̅'yi Q veya Q′'ye bırakırsa: "0,9̅ = 1. En küçük kutu: N."
- √9'u Q′'ye bırakırsa: "√9 = 3 irrasyonel olamaz; 3 = 3/1." 
- 22/7'yi Q′'ye bırakırsa: "22/7 bir kesir: kesir olarak yazılan sayı rasyoneldir."
- 0,25'i Z'ye bırakırsa: "0,25 tam sayı değil; Z'de yok."

**Sonuç ekranı (60. sn):** Skor ≥ 8/10 → "Kutu ustası" rozeti. Skor < 8 → ilgili sahneye ipucu bağlantıları (örn. M3: "Sahne 8–9"). 

**Ekran notu / kural kutusu:**
- **En küçük kutu kuralı:** sayının önce kesir/ondalık/kök biçimini sadeleştir (12/4 = 3, 0,9̅ = 1, √9 = 3), sonra yerleştir.
- **Biten ya da devreden ondalık → Q. Ne biten ne devreden ondalık → Q′. Kök içi tam kare → rasyonel; değilse irrasyonel.**

---

## 5. Kapanış

### 5.1 Mini sınav (5 soru, çoktan seçmeli, ≈ 100 sn)

Her soruda tek doğru vardır. Yanlış seçimde **o şıkka özel** açıklama gösterilir, ardından ilgili sahneye bağlantı verilir. Başarı eşiği: 4/5. Altında kalanlar yanlış yaptıkları sahnenin kısa tekrarına yönlendirilir.

---

**Soru 1 (Kapalılık).** Aşağıdaki ifadelerden hangisi **doğrudur?**

- **A)** N, çıkarma işlemine göre kapalıdır, çünkü 5 − 3 = 2 ∈ N.
- **B)** Z, bölme işlemine göre kapalıdır, çünkü 8 ÷ 2 = 4 ∈ Z.
- **C) ✓ Q, sıfırdan farklı bir sayıya bölmeye göre kapalıdır.**
- **D)** Q′, toplamaya göre kapalıdır, çünkü √2 + √3 irrasyoneldir.

| Şık | Açıklama | Kaynak yanılgı |
|---|---|---|
| A | 5−3 yeşil, ama 3−5 = −2 ∉ N. Kapalılık için her çiftin yeşil olması gerekir. | M8 |
| B | 8÷2 yeşil, ama 3÷4 = 3/4 ∉ Z. Tek karşı örnek yeter. | M8 |
| **C** | Doğru: a/b ÷ c/d = a/b · d/c (c ≠ 0) yine rasyonel. | |
| D | √2 + √3 gerçekten irrasyonel, ama kapalılık için her çiftte irrasyonel olmalı. √2 + (−√2) = 0 ∉ Q′. | M8, M11 |

---

**Soru 2 (Rasyonel–irrasyonel).** Aşağıdaki sayılardan hangisi **irrasyoneldir?**

- **A)** 0,2727… (yani 0,2̅7̅)
- **B)** 22/7
- **C)** √16
- **D) ✓ √7**

| Şık | Açıklama | Kaynak yanılgı |
|---|---|---|
| A | 0,2̅7̅ = 27/99 = 3/11: devreden ondalık rasyoneldir. | M3 |
| B | 22/7 bir kesirdir (= 3,142857…, devreden). π değil, π'ye yakın bir rasyonel. | M5 |
| C | √16 = 4 ∈ N ⊂ Q. Kök içi tam kare. | M6 |
| **D** | 7 tam kare değil: √7 = 2,6457513… ne biter ne devreder. | |

---

**Soru 3 (Biten/devreden).** 3/8 ve 5/6 sayılarının ondalık açılımları için hangisi doğrudur?

- **A)** İkisi de biter.
- **B) ✓ 3/8 biter (0,375), 5/6 devreder (0,83̅); ikisi de rasyoneldir.**
- **C)** 3/8 biter, 5/6 bitmediği için irrasyoneldir.
- **D)** 3/8 devreder, 5/6 biter.

| Şık | Açıklama | Kaynak yanılgı |
|---|---|---|
| A | 5/6: 50÷6=8 kalan 2; 20÷6=3 kalan 2 → kalan tekrar ediyor, 0,8333… devreder. Payda 6 = 2·3 (3 çarpanı var). | M16 |
| **B** | Doğru. 3/8: 30÷8=3 kalan 6; 60÷8=7 kalan 4; 40÷8=5 kalan 0 → 0,375. 5/6 = 0,8333… devirli → rasyonel. | |
| C | Devreden ondalık irrasyonel olmaz: 0,8333… = 5/6, bir kesir. | M3 |
| D | Tersini söylüyor; 3/8'de kalan 0'a ulaşıyor (biter), 5/6'da ulaşmıyor. Uzun bölmede kalanlara bak. | M16 |

---

**Soru 4 (Kök içi).** √4, √5, √9, √(1/4) sayılarından kaç tanesi **rasyoneldir?**

- **A)** 0
- **B)** 2
- **C) ✓ 3**
- **D)** 4

| Şık | Açıklama | Kaynak yanılgı |
|---|---|---|
| A | √4 = 2, √9 = 3 ve √(1/4) = 1/2 rasyonel. "Kök içi → irrasyonel" yanlış. | M6 |
| B | √4 = 2 ve √9 = 3'ü buldun; √(1/4) = 1/2'yi atladın: kesir de tam kare olabilir (1/4 = (1/2)²). | M6 |
| **C** | Doğru: √4 = 2, √9 = 3, √(1/4) = 1/2. √5 = 2,2360679… irrasyonel. | |
| D | √5'in hesap makinesindeki değeri (2,236068) yaklaşıktır; ondalık açılımı bitmez, devretmez. | M14 |

---

**Soru 5 (Ters eleman).** 3'ün **çarpma işlemine göre tersi** olan 1/3 sayısının bulunabilmesi için kümenin **en küçüğü** hangisidir?

- **A)** N
- **B)** Z
- **C) ✓ Q**
- **D)** Q′

| Şık | Açıklama | Kaynak yanılgı |
|---|---|---|
| A | 3 ∈ N olsa da 1/3 ∉ N. Çarpma tersi, yalnız 1'in N'de vardır. | M15 |
| B | 1/3 ∉ Z. Z'de yalnız 1 ve −1'in çarpma tersi vardır. | M15 |
| **C** | Doğru: 3 · (1/3) = 1 ve 1/3 ∈ Q. Bu yüzden bölmeyi kurtarmak için Q doğdu. | |
| D | 1/3 rasyoneldir (kesirdir), Q′ kesir olarak yazılamayan sayıları içerir; üstelik Q′'de çarpmanın etkisiz elemanı 1 bile yok. | M3 (kesir/ondalık görüneni irrasyonel sanma) |

---

### 5.2 "Bugün ne öğrendik?" (3 madde)

1. **Her kutu bir ihtiyaçtan doğdu:** 3 − 5 yapılamayınca Z, 3 ÷ 4 yapılamayınca Q, kenarı 1 olan karenin köşegeni (√2) hiçbir kesirle yazılamayınca R geldi. Ters eleman yoksa ters işlem kapalı değildir.
2. **Kapalılık testi:** Sonuç hep kutuda kalıyorsa kapalıdır; **tek karşı örnek** yeter. N: +, × ; Z: +, −, × ; Q ve R: dört işlem (0'a bölme hariç). Q′ hiçbirinde kapalı değildir (√2 + (−√2) = 0 ; √2 · √2 = 2).
3. **Ondalık açılım adresi:** Biten ya da devreden → rasyonel (1/4 = 0,25 ; 1/3 = 0,3̅ ; 0,9̅ = 1). Ne biter ne devreder → irrasyonel (√2, π). **22/7 ≠ π.** R = Q ∪ Q′.

**Merak köşesi (kapanış sahnesinin son 10 sn'si):** "R'de bile çözülemeyen bir denklem var: x² = −1. Kutular burada bitmiyor: yeni bir matruşka daha var (11. sınıf)." Matruşka geometrisine R'nin dışında soluk bir ek halka çizilir, etiketi "?" kalır.

---

## 6. Görsel tasarım önerisi (konuya özel)

> Genel tasarım dili (koyu, modern, sakin "interaktif ders" estetiği) sonradan eklenecek. Bu bölüm yalnız bu konunun renk ve metafor ihtiyacını belirler.

### 6.1 Renk jetonları

Tüm renkler koyu zemin (`--bg: #0F1420`) üzerinde, metin `--ink: #E8ECF4` ile kontrast ≥ 4,5:1 olacak şekilde seçilmiştir. Hex değerleri öneridir, ortak tema geldiğinde eşleştirilir.

| Jeton | Hex (öneri) | Anlam |
|---|---|---|
| `--n` | `#F2B84B` (kehribar) | Doğal sayılar, en içteki matruşka |
| `--z` | `#4FB3A9` (turkuaz) | Tam sayılar, sol yönde uzanan (negatif) taraf |
| `--q` | `#6C8CF0` (mavi-mor) | Rasyonel sayılar |
| `--r` | `#B58CF0` (lavanta) | Gerçek sayılar, en dış kutu |
| `--irr` | `#E96BA8` (pembe) | "Asi" irrasyonel sayılar; **her zaman kesikli çizgi** ile |
| `--ok` | `#3DDC97` (yeşil) | Kapalılık testi geçti ✓ |
| `--err` | `#FF4D5E` (kırmızı) | Kapalılık testi kutu dışı ✗ |
| `--bg` / `--ink` | `#0F1420` / `#E8ECF4` | Zemin / yazı |

- Kutu renkleri (`--n`, `--z`, `--q`, `--r`) ile sonuç renkleri (`--ok`, `--err`) **birbirine karışmayacak** biçimde ayrışır. Test sonuçları her zaman **simgeyle** (✓/✗) ve **hareketle** (nabız / sarsılma) da bildirilir (renk körlüğü).
- `--irr` ve `--err` ikisi de sıcak tonda olduğundan: irrasyonel = **kesikli** pembe çizgi ve doku; hata = **dolu** kırmızı ve ✗.

### 6.2 Metafor ve nesneler

- **Matruşka = siluet, yüzsüz.** Çocuksu yüz ya da fırça yok; yalnızca dört iç içe, sakin, hafif ışıltılı siluet. Kapanıp açılırken kısa tahta "tık" sesi (düşük ses, kapatılabilir).
- **"Kapı" = kapalılık testi.** Halka çizgisi, "kapı" gibi bir ışık hattı: sonuç içeri girer (yeşil) ya da dışarı çıkar (kırmızı).
- **Kalan Defteri.** Defter/kareli kâğıt dokusunda sakin bir kart. Her kalan yeni satır; tekrar eden kalanlar kıvrımlı ok ve halkayla bağlanır. (Devir fikrinin ana görseli.)
- **Delik = sayı doğrusunda boşluk.** Rasyonel noktalar küçük, yoğun noktalar; √2 yeri **parlayan boş halka.** Sonra R'nin "dolgu" ışığıyla çizgi sürekli hâle gelir.
- **Geri alma düğmesi.** İşlem butonlarının yanında dönen ok ("↶") simgesi; ters eleman kutuda yoksa düğme kilitli ve gri.
- **Asi sayılar.** √2, π: hafifçe titreyen (0,5 px, 2 Hz) pembe jetonlar. Sakin kalmayanlar, ama abartısız.

### 6.3 Hareket ve zamanlama

- Süre ölçeği: küçük geçişler 0,2–0,3 sn, kutu açılış/kapanış 0,8 sn, kamera hareketleri 1,0–1,2 sn.
- Eğri: giriş **easeOutBack** (hafif yaylanma), diğerleri **easeInOutCubic.**
- Her sahne içinde aynı anda en fazla bir odak animasyonu. Altyazı bandı sabit.
- `prefers-reduced-motion` açıksa: titreme/sarsılma kaldırılır, yalnız renk ve simge değişir; zoom geçişleri anlık kesme olur.

### 6.4 Tipografi ve sayı biçimleri

- Sayılar için **tabular rakamlı** bir sans/mono yazı tipi (hizalı uzun bölme ve ondalık dizileri için şart).
- Kesirler ekranda her zaman **yatay çizgili** (pay/payda) yazılır. Devreden kısım **üst çizgi** ile gösterilir: 0,3̅ ; 0,1̅4̅2̅8̅5̅7̅.
- Ondalık ayracı her yerde **virgül.**

### 6.5 Yazılım için veri modeli notu

- Her sayı jetonu `{ id, display, num, den, kind }` olarak tutulur. Rasyoneller için `num/den` (tam kesir aritmetiği, sadeleşmiş). Irrasyoneller (√2, √3, π, …) için `kind: "irr"` ve sembolik `display`. Kapalılık hesabı, rasyonel jetonlar için kesin kesirle, irrasyonel örnekler için **önceden tanımlı sonuç tablosuyla** yapılır. Örn. `√2 + (−√2) → 0`, `√2 · √2 → 2`, `√2 − √2 → 0`, `√2 ÷ √2 → 1`, `√2 + √3 → irr`.
- Küme üyeliği: `isN = (den==1 && num>=0)`, `isZ = (den==1)`, `isQ = true` (rasyonel jetonlar için), `isQprime = (kind=="irr")`.
- Sıfıra bölme `NaN` olarak değil, `undefined` durumu olarak ele alınır (gri rozet).
- Ondalık/devir için uzun bölme motoru: `(kalan -> bölüm basamağı)` sözlüğü tutar. Aynı kalan tekrar görülünce döngü işaretlenir (S8 animasyonu bu verinin üzerine çizilir).
- Sahneler birbirinden bağımsız yüklenebilir; kural kutusu metinleri ve Defter içeriği sahne bazlı JSON'dur.

### 6.6 Erişilebilirlik

- Tüm sürükle-bırak etkileşimlerinin klavye alternatifi vardır (Tab ile jeton seç, Enter, ok tuşlarıyla bölge seç, Enter ile bırak).
- Altyazı varsayılan açık. Ses yoksa tüm bilgi altyazıda. Okuyucu uyumluluğu için kesirler ve üst çizgili devirler `aria-label` taşır ("sıfır virgül üç devirli").
