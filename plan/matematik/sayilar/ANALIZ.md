# Analiz sonuçları — 9. Sınıf · 1. Tema: Sayılar

Tarih: 5 Ekim 2026. Kapsam: 4 ders (`01`–`04`), 4 senaryo, ders motoru (`ortak/`).

## Özet

1. **Kapsam:** Dört ders, temanın dört öğrenme çıktısıyla bire bir eşleşiyor; ama her çıktının içinde programın açıkça istediği konular eksik. Toplam 11 yeni mikro ders ve 1 ek sahne gerekiyor (aşağıda liste).
2. **Telefon:** Dersler telefonda şu an izlenemiyor. Ders 01–02'de sahnedeki yazıların %78–85'i 11 pikselin altında (en küçüğü 5,5 px). Ders 03–04'te sahne yatay kayıyor ve içeriğin bir kısmı ekran dışında kalıyor. Dört dersin hepsinde giriş ekranındaki başlık ve "Derse başla" düğmesi kırpılıyor.
3. **Yazı yükü:** Öğrenci aynı anda dört ayrı yerden yazı okuyor: sahne, altyazı, soru paneli, Defterim. Ders başına 1100–1750 kelime altyazı var; altyazıların yaklaşık dörtte biri animasyon oynarken 17 karakter/saniyeden hızlı akıyor.
4. **Güçlü taraf:** Görsel dil, renk tutarlılığı, "tahmin et → gör → adlandır" kurgusu ve hikâyeler (viral video, lunapark, matruşka, kasiyer) iyi. Masaüstünde sahneler temiz ve büyük puntolu. 59 sahnenin tamamı hatasız tamamlandı, konsol temiz.

## 1. Müfredat kapsamı

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, Matematik 9. sınıf, 1. Tema: Sayılar (38 ders saati) — <https://tymm.meb.gov.tr/matematik-dersi/unite/21>. Aşağıdaki "eksik" maddeler bu sayfadaki öğrenme-öğretme uygulamaları ve anahtar kavramlar ile ders dosyalarının içeriği karşılaştırılarak çıkarıldı.

| Öğrenme çıktısı | Mevcut ders | Var olan | Eksik |
|---|---|---|---|
| **MAT.9.1.1** Üslü ve köklü gösterimlerle işlemler | 01 | Tam sayı üs kuralları, a⁰, a⁻ⁿ, √a = a^(1/2), kök çarpma/sadeleştirme, benzer kökleri toplama, tek terimli paydayı rasyonel yapma, √(a+b) tuzağı | **Rasyonel üs** a^(m/n) ve n. dereceden kök (yalnızca 1/2 var) · **Eşlenik** (iki terimli payda) · **Bilimsel gösterim** · **Yaklaşık değer ve hata payı** · tanımsız durumlar (zenginleştirme) |
| **MAT.9.1.2** Aralıklar ve küme sembolleri | 02 | Eşitsizlik, dolu/boş nokta, dört aralık türü, ∞, dört temsil, ∩, ∪, boş küme, tek nokta | **Küme temelleri** (∈/∉, eleman sayısı, liste ve ortak özellik yöntemi, alt küme, evrensel küme) · **Fark ve tümleme** · **Mutlak değerle aralık** (\|x − 3\| < 1 ⇔ 2 < x < 4) |
| **MAT.9.1.3** Sayı kümelerinin özellikleri | 03 | ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, kapalılık, ondalık açılım, irrasyoneller, karşı örnek | **Sıralı olma** · **Arada olma** (yalnızca tek cümle geçiyor) · **Doğrudan ispat** (programın örneği: iki rasyonel arasında hep bir rasyonel vardır), hipotez–hüküm |
| **MAT.9.1.4** İşlem özelliklerinin cebirsel ifadesi | 04 | Değişme, birleşme, dağılma, etkisiz ve ters eleman, (a+b)(c+d), karşı örnekle çürütme | **Önerme dili** (her/bazı, ∀/∃, ve, veya, ya da, ise, ancak ve ancak, değil) · **Yutan eleman** · **Özdeşlikler** (a±b)², a²−b² (yalnızca "bonus" satırı var) · **Çarpanlara ayırma** · **a·b = 0 ⇔ a = 0 ∨ b = 0** |

İki ek gözlem:

- **Tekrar:** İşlem özellikleri iki kez anlatılıyor (Ders 03 Sahne 5 ve Ders 04 Sahne 3–6, 10). Ders 03 Sahne 5 aynı zamanda temanın en uzun sahnesi (17 altyazı, 222 kelime).
- **Program dışı derinlik:** Ders 03'teki 0,999… = 1, devirli ondalığı kesre çevirme ve π/22⁄7 sahneleri program tarafından ön bilgi sayılıyor. Değerli ama zorunlu değil; "merak köşesi" olarak isteğe bağlı yapılabilir.

## 2. UI testi — yöntem

Her ders başsız Chrome'da üç boyutta otomatik gezildi: masaüstü 1280×800, telefon dikey 390×844, ayrıca seçili sahneler dizüstü 1366×768 ve telefon yatay 844×390. Her altyazı değişiminde ekran görüntüsü alındı (yaklaşık 800 görüntü) ve sahnedeki görünür yazı öğeleri, punto, taşma, panel yükseklikleri ölçüldü.

Sınırlar: Sorular otomatik ve anında tıklandı, bu yüzden süreler alt sınırdır; sürükle-bırak oyunları gerçek dokunuşla denenmedi; gerçek iOS Safari ve sesli anlatım test edilmedi.

## 3. UI testi — bulgular

### 3.1 Sayılar

| | Ders 01 | Ders 02 | Ders 03 | Ders 04 |
|---|---|---|---|---|
| Sahne (sınav ve özet hariç) | 13 | 12 | 14 | 12 |
| Altyazı sayısı | 64 | 93 | 124 | 69 |
| Altyazı toplam kelime | 1135 | 1110 | 1735 | 1192 |
| Altyazı ortalama / en uzun (kelime) | 17,7 / 29 | 11,9 / 25 | 14,0 / 28 | 17,3 / 33 |
| 17 kr/sn'den hızlı akan altyazı | 8/54 | 29/91 | 35/122 | 16/68 |
| Sahnede aynı anda en çok kelime | 131 | 60 | 95 | 99 |
| Defterim: kart / kelime | 13 / 451 | 19 / 445 | 14 / 659 | 13 / 464 |
| Giriş ekranı kelime | 106 | 110 | 75 | 100 |
| En kısa izleme süresi (anında tıklama) | 7,7 dk | 14,7 dk | 13,5 dk | 7,6 dk |
| Masaüstü: soru paneli ekranın altında kalan altyazı | 22/64 | 28/93 | 24/124 | 22/69 |
| Telefon: sahnede 11 px altı yazı oranı | %85 | %78 | %0 | %0 |
| Telefon: en küçük punto | 5,5 px | 7,7 px | 11,8 px | 14,1 px |
| Telefon: sayfa yüksekliği (ekran 844 px) | 3118 px | 3109 px | 4077 px | 3238 px |

### 3.2 Telefon (en acil)

- **Ders 01–02 dikey:** Sahne 354×199 px'e küçülüyor, yazılar okunmuyor → `kanit/telefon-dikey-ders01-sahne6.png`.
- **Ders 03–04 dikey:** Sahne yatay kaydırmalı; "Toplama · Çarpma" başlığı gibi içerikler kırpılıyor, öğrenci animasyonun yarısını görüyor → `kanit/telefon-ders03-yatay-kirpma.png`.
- **Yatay çevirme çözmüyor:** Ders 01–02 "telefonu yan çevir" diyor; ama yatayda sahne 455 px, ekran 390 px. Sahne ekrana sığmıyor, altyazı 660. pikselde, kaydırmadan görünmüyor → `kanit/telefon-yatay-sigmiyor.png`.
- **Giriş ekranı:** Başlık üstten, "Derse başla" düğmesi alttan kırpılıyor (dört derste de) → `kanit/telefon-giris-kirpik.png`.
- **Sayfa kendi kendine kayıyor:** Deftere her kural eklendiğinde `scrollIntoView` tüm sayfayı kaydırıyor. Telefonda öğrenci animasyonun ortasında Defterim'e atılıyor; masaüstünde üst çubuk ekrandan çıkıyor → `kanit/telefon-deftere-kayma.png`, `kanit/masaustu-ders01-sahne6-yogun.png`.
- Araç çubuğu üç satır yer kaplıyor; soru panelleri 300–590 px yüksekliğinde.

### 3.3 Yazı yükü ve dikkat bölünmesi

- **Dört yazı kanalı aynı anda açık:** sahne içi etiketler, altyazı, soru paneli, Defterim. Defterim sürekli görünür ve 450–660 kelimeye ulaşıyor; animasyonla yarışıyor.
- **Altyazı hızı:** Motor süreyi karakter başına 52 ms (≈19 kr/sn) hesaplıyor. Ölçümde altyazıların yaklaşık dörtte biri (88/335) 17 kr/sn'den hızlı. Altyazılarda formül var ve göz aynı anda animasyonu izliyor; bu hız 9. sınıf için yüksek.
- **Yoğun sahneler:** Ders 01 S6 (14 satırlı merdiven + 4 kutu, 85 yazı öğesi, 131 kelime), Ders 01 S9 (106 kelime), Ders 04 S12 (99 kelime), Ders 03 S5 (95 kelime). Hepsi doğru ve düzenli, ama hepsi aynı anda ekranda.
- **Tek oturum çok uzun:** Bir ders 12–14 sahne + 5 soruluk sınav. Program bir öğrenme çıktısına ortalama 9–10 ders saati ayırıyor; biz tek oturumda veriyoruz.
- **Giriş ekranı** 75–110 kelime: kanca + 6 kazanım maddesi. Kazanımlar öğretmen dilinde yazılmış.
- **Sınav geri bildirimi** yanlışta iki paragrafa çıkıyor (şıkkın açıklaması + doğrusu).

### 3.4 Masaüstü / dizüstü

- 1280×800 ve 1366×768'de altyazı ~720. pikselde bitiyor; soru ve kaydırıcı panelleri 845–1090. piksele uzanıyor. Öğrenci cevaplamak için aşağı kaydırınca sahnenin üstü kayboluyor → `kanit/dizustu-soru-ekran-disinda.png`, `kanit/masaustu-ders04-sahne12.png`.
- Ciddi yazı çakışması ya da taşması görmedim; otomatik dedektörün işaretlediği yerler geçiş anlarıydı.
- Defterim kalıcı değil: sayfa yenilenince ya da bir sahneye doğrudan atlanınca boş geliyor.

## 4. Sonuç

İçerik pedagojik olarak sağlam; sorun dozda ve ambalajda. Öncelik sırası: (1) telefonda izlenebilir tek ekran yerleşimi, (2) yazı diyeti ve mikro derslere bölme, (3) eksik konular. Ayrıntı `PLAN.md` içinde.
