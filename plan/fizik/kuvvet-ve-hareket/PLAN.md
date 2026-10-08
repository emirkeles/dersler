# Plan — 9. Sınıf Fizik · 2. Tema: Kuvvet ve Hareket

Dayanak: `MUFREDAT.md` (MEB sayfasından 7 Ekim 2026'da alındı; MEB bu düzeye "ünite" diyor) ve MEB 9. Sınıf Fizik Ders Kitabı, 2. Ünite (s. 50–129). Ortak kurallar: `../../KURALLAR.md`; adımlar: `../../ISLEME.md`.

Bu dosya 7 Ekim 2026'da yeniden yazıldı. İlk taslak 20 kısa dersti ve 15 açık soru taşıyordu; kullanıcı temanın "müfredata göre en kapsamlı şekilde", "öğrencinin anladığından emin olarak" ve "açıklayıcı örneklerle" ele alınmasını istedi. Bu sürümde ders kitabı okundu, açık sorular kapatıldı (bölüm 7), her kısa derse örnekler, hedeflenen yanılgılar ve anlama denetimi eklendi (bölüm 2b ve 3). Kapsam değişmedi: programda olmayan konu eklenmedi.

## 1. Kapsam özeti

Tema 24 ders saati. Yedi öğrenme çıktısı var: **FİZ.9.2.1 – FİZ.9.2.7**. Çıktıların fiilleri hesap değil, düzenleme ve akıl yürütme fiilleri: sınıflandırma (9.2.1, 9.2.7), karşılaştırma (9.2.2, 9.2.5), bilimsel çıkarım (9.2.3), tümevarımsal akıl yürütme (9.2.4, 9.2.6). Program bunu sınırlarla da pekiştiriyor: trigonometri yok, temel kuvvetlerde ve hareket türlerinde matematiksel model yok, hareketin kavramlarında grafik ve ivmeli hareket hesabı yok. Dersler buna göre kurulur: öğrenci örneklere bakar, ayırır, gruplar, örüntüyü bulur; ad en sonda gelir.

Programda laboratuvar deneyi istenmiyor; istenen gözlem, görsel ve dijital içerik incelemesidir (9.2.4 için açıkça "simülasyon ve animasyon gibi dijital içerikler"). Bunlar sitede etkileşimli benzetimle karşılanır. Sitede karşılanamayanlar ürün ve sınıf etkinlikleridir: drama, poster ya da broşür, pano (bölüm 4'te `site dışı`).

| Öğrenme çıktısı | Konu | Kısa dersler |
|---|---|---|
| FİZ.9.2.1 temel ve türetilmiş nicelikleri sınıflandırma | A · Temel ve türetilmiş nicelikler | A1–A2 |
| FİZ.9.2.2 skaler ve vektörel nicelikleri karşılaştırma | B · Skaler ve vektörel nicelikler | B1–B2 |
| FİZ.9.2.3 aynı doğrultudaki vektörlerin yönü ve büyüklüğü; eşit, zıt, gerçek sayıyla çarpılmış vektör | C · Vektörler | C1–C3 |
| FİZ.9.2.4 uç uca ekleme, paralelkenar yöntemi, bileşenlerine ayırma | C · Vektörler | C4–C9 |
| FİZ.9.2.5 doğadaki temel kuvvetleri karşılaştırma | D · Doğadaki temel kuvvetler | D1–D2 |
| FİZ.9.2.6 hareketin temel kavramları | E · Hareketin temel kavramları | E1–E7 |
| FİZ.9.2.7 hareket türlerini sınıflandırma | F · Hareket türleri | F1–F2 |

Toplam 6 konu, 24 kısa ders (A 2, B 2, C 9, D 2, E 7, F 2). İlk taslağa göre dört ders eklendi, her biri taslakta bir dersin içine sıkışmış ikinci fikirdi:

| Yeni ders | Nereden ayrıldı | İkinci fikir |
|---|---|---|
| B2 | B1 | Benzerlik ve farklılık listesi; temel–türetilmiş ile skaler–vektörel ayrımının ayrı sorular olması |
| C4 | eski C4 | Aynı doğrultuda toplama (bir boyut) ve bileşke kavramı; iki boyuttaki uç uca eklemeden önce |
| C8 | eski C7 | Bileşenleri toplayarak bileşke bulma (üçüncü yol); genellemeden önce öğretilmesi gerekir |
| E6 | E2–E4 | Aynı yolculukta yol, yer değiştirme, ortalama sürat ve ortalama hızın birlikte hesaplanması |

Saat başına 24 / 24 = 1,00. `ISLEME.md` 3. adım 5. kuraldaki sınır 0,85'tir (en çok 20 ders); bu tema sınırı kullanıcının "en kapsamlı" isteğiyle aşıyor (bölüm 7, karar 1). Kullanıcı sınırın korunmasını isterse birleştirme sırası: F2 → F1, C8 → C9, B2 → B1, E6 → E4.

## 2. Konular

Kural "her öğrenme çıktısı bir konu"dur. Tek ayrılık: FİZ.9.2.3 ile FİZ.9.2.4 tek konuda (C) toplandı, çünkü içerik çerçevesi ikisini tek başlıkla veriyor ("Vektörler") ve 9.2.4'teki toplama, 9.2.3'teki yön ve büyüklük okumasının üstüne kuruluyor. İçerik çerçevesinin son başlığı ("Hareket ve Hareket Türleri") iki çıktıya karşılık geldiği için iki konuya (E, F) ayrıldı.

**A · Temel ve türetilmiş nicelikler** (FİZ.9.2.1). SI birim sistemi, nicelik–birim eşleştirmesi; niceliklerin niteliklerine göre ayrılması, gruplanması ve grupların "temel", "türetilmiş" diye adlandırılması.

**B · Skaler ve vektörel nicelikler** (FİZ.9.2.2). İki tür niceliğin özellikleri, benzerlikleri ve farklılıkları; iki sınıflandırmanın bir arada kullanılması.

**C · Vektörler** (FİZ.9.2.3, FİZ.9.2.4). Kareli düzlemde vektörün yönü ve büyüklüğü; eşit, zıt ve gerçek sayıyla çarpılmış vektör; iki vektörün aynı doğrultuda ve farklı doğrultularda toplanması; uç uca ekleme, paralelkenar, bileşenlerine ayırma; yöntemlerin aynı bileşkeyi verdiği genellemesi.

**D · Doğadaki temel kuvvetler** (FİZ.9.2.5). Kuvvetin etkileri (hatırlatma); dört temel kuvvetin etkileri, özellikleri, benzerlikleri ve farklılıkları; matematiksel model yok.

**E · Hareketin temel kavramları** (FİZ.9.2.6). Programın saydığı on bir kavram: referans noktası, konum, alınan yol, yer değiştirme, sürat, anlık sürat, ortalama sürat, hız, anlık hız, ortalama hız, ivme; skaler ve vektörel niceliklerle ilişkileri, matematiksel modelleri ve trafik bağlamı (sürat sınırı, yeşil dalga).

**F · Hareket türleri** (FİZ.9.2.7). Öteleme, dönme ve titreşim hareketinin nitelikleri; hareketlerin ayrıştırılması, gruplanması, adlandırılması; aynı anda birden fazla hareket türü.

Ders sırası programın sırasıdır: A1 → A2 → B1 → B2 → C1 → … → C9 → D1 → D2 → E1 → … → E7 → F1 → F2.

Bağımlılıklar:

| Ders | Dayandığı dersler | Neden |
|---|---|---|
| A2 | A1 | A1'deki nicelik–birim tablosunu ayırır |
| B1, B2 | A1, A2 | Aynı nicelik listesi; B2 iki ayrımı birlikte kullanır |
| C1 | B1 | "Yön isteyen nicelik" okla gösterilir |
| C2, C3 | C1 | C1'de toplanan yön ve büyüklük verisini yorumlar |
| C4 | C1–C3, B1 | Zıt vektör ve B1'deki 70 N / 10 N örneği |
| C5, C6 | C2 (taşıma), C4 (bileşke) | Vektör taşınınca değişmez; bileşke tanımı |
| C7 | C5 | Bileşenler uç uca eklenince vektörün kendisi çıkar |
| C8 | C4, C7 | Aynı eksendeki bileşenler C4'teki gibi toplanır |
| C9 | C4–C8 | Üç yolu karşılaştırır |
| D1 | B1, C1 | Kuvvet vektörel bir niceliktir |
| E1 | B1, C1 | Konum vektörü |
| E2 | E1, C3, C4 | Yer değiştirme = son konum − ilk konum; eksi işareti yönü çevirir |
| E3 | E2 | Sürat alınan yoldan |
| E4 | E2, E3 | Hız yer değiştirmeden; süratle karşılaştırılır |
| E5 | E4 | İvme hız değişiminden |
| E6 | E2–E4 | Dört niceliği bir yolculukta birleştirir |
| E7 | E1–E6 | Kavramları trafikte kullanır |
| F1 | E1 | Hareket referans noktasına göre tanımlanır |
| F2 | F1 | F1'deki niteliklerle ayrıştırır |

## 2b. Anlatım ilkeleri (bu temaya özgü)

Kullanıcının üç isteğinin (kapsam, anlama, örnek) derse nasıl döküldüğü. Senaryolar ve dersler bu maddelere göre yazılır; `KURALLAR.md` ile çelişen madde yoktur, oradaki kurallar bu tema için sayıya dökülmüştür.

1. **Ders kendi başına yeter.** Öğrencinin önünde ders kitabı yok sayılır; altyazıda, tahtada, soruda ve geri bildirimde kitaba, sayfaya, sınıfa gönderme olmaz (`KURALLAR.md` 2.1). Sayfa numaraları yalnızca bu dosyada ve senaryolarda durur.
2. **Her ders "öğret" açılışıyla başlar.** Dersin ilk sorusundan önce en az 5, her sorudan önce aynı sahnede en az 3 anlatım cümlesi olur; sorudan sonra en az 1 cümle "neden"i söyler. Ölçü kimya Etkileşim temasından alındı (kullanıcının onayladığı örnek: `kimya/etkilesim/dersler/a1-urunlerin-ozellikleri.js`). Bu temada kanca açılışı kullanılmaz; aşağıdaki "açılış sorusu" dersin ilk sorusudur ve anlatımdan sonra gelir.
3. **Örnek merdiveni.** Her fikir en az dört basamakla işlenir:
   - *gündelik durum:* öğrencinin tanıdığı bir sahne (otobüs, pazar, halat çekme, stadyum);
   - *çözülmüş örnek:* tahtada adım adım, her adım ayrı altyazıyla;
   - *öğrencinin örneği:* aynı kalıp, yeni sayılarla ya da yeni bir durumla öğrenci yapar;
   - *sınır durumu:* kuralın şaşırttığı yer (bileşkenin sıfır çıkması, başladığın yere dönmek, özel adlı birim gibi).
4. **Hedeflenen yanılgı.** Her kısa dersin planında en az iki yanılgı yazılıdır. Derste en az bir soru, çeldiricisi bu yanılgının kendisi olacak biçimde kurulur; yanlış şıkkın geri bildirimi yanılgıyı adıyla düzeltir ("büyüklükler toplanmaz, yönlere bakılır" gibi).
5. **Anlama denetimi.** "Dene" adımında en az üç madde olur: kolay, orta, sınır durumu. İki çıkış sorusundan biri uygulama, öteki yanılgı ya da ters sorudur (sonuç verilir, koşul sorulur). Motor doğru şık seçilene kadar sürdürdüğü için her yanlış denemenin geri bildirimi kuralı bir kez daha, başka sözcüklerle söyler.
6. **Geri çağırma.** Bir derse dayanan ders (bölüm 2'deki tablo), açılışının ilk iki üç cümlesinde o dersin kuralını bir örnekle hatırlatır; yeni fikir ondan sonra başlar.
7. **Konu sonu dersleri toplar.** Her konunun son dersi konuyu bir tabloda ya da tek bir durumda birleştirir: A2 (sınıflandırma tablosu), B2 (iki ayrım bir arada), C9 (üç yol, tek bileşke), D2 (karşılaştırma tablosu), E6–E7 (bir yolculukta ve trafikte bütün kavramlar), F2 (bileşik hareket).
8. **Uzunluk içeriğe göredir.** Ders başına 5–8 sahne ve yaklaşık 30–60 anlatım cümlesi beklenir; tavan değildir. Yazı bütçesi aynıdır: altyazı en çok 12 kelime, tahtada aynı anda en çok ~25 kelime. Uzayan şey sahne ve adım sayısıdır. Tablolu sahnelerdeki istisna: bölüm 7, karar 23.
9. **Sayılar ve veriler.** Tanım, sembol, birim, model ve sınıflandırma ders kitabından sayfa numarasıyla alınır (bölüm 6b). Alıştırma için kurulan durumlar "örnek veri"dir; gerçek bir ölçüm gibi sunulmaz (`KURALLAR.md` 2.3). Her örnek tek birimle yürür; birim dönüştürme hesabı yapılmaz (bölüm 5).
10. **Bir kavram, bir renk.** Vektör derslerinde birinci vektör, ikinci vektör ve bileşke tema boyunca aynı üç renkle çizilir; bileşen çizgileri kesiklidir. Renkler iskelet adımında motorun paletinden seçilir.
11. **Çizim.** Bütün görseller vektördür: kareli düzlem, kroki, gösterge, çekirdek şeması, hareket animasyonu. Bu temada üretilmiş resim gerekmiyor; `GORSELLER.md` açılmaz (bölüm 7, karar 20).

## 3. Kısa dersler

Her ders için: tek fikir, anlatılacaklar, örnekler (kaynağıyla), hedeflenen yanılgılar, anlama denetimi, program dayanağı, açılış sorusu, akılda kalıcı cümle. "Kitap" ders kitabıdır; sayfaların dökümü bölüm 6b'de. "Kurgu" bu plan için kurulmuş, kaynağı olmayan durumdur.

### Konu A · Temel ve türetilmiş nicelikler

#### A1 · Her niceliğin bir SI birimi var

- **Tek fikir:** Ölçmek, bir büyüklüğü aynı cinsten standart bir büyüklükle karşılaştırmaktır; SI bu standartları herkes için ortak kılar ve her niceliğe bir birim verir.
- **Anlatılacaklar:**
  1. Ölçme: 8 kg'lık karpuz, standart 1 kg'ın 8 katıdır (kitap s. 54).
  2. Farklı birimlerin yol açtığı karışıklık ve ortak birim sistemi ihtiyacı: toplumlar arası etkileşim, ticaret, bilim (s. 54).
  3. SI (Uluslararası Birimler Sistemi): 1960'ta Paris'te tanımlandı; uzunluk metre, kütle kilogram, zaman saniye ile ölçülür (s. 54). Farkındalık düzeyi; SI'nın tarihi bundan öteye anlatılmaz.
  4. Öteki derslerden bilinen nicelikler ve birimleri bir tabloda listelenir: hacim, zaman, kuvvet, yoğunluk, kütle, sürat, hız, alan, uzunluk (s. 53); sıcaklık (s. 55).
  5. Listedeki birimler SI ile eşleştirilir: her niceliğin SI birimi ve birimin sembolü.
  6. Gündelik birim SI birimi olmayabilir: litre, km/h, °C, gram (s. 54, 58, 123). Eşleştirilir, dönüştürme hesabı yapılmaz.
  7. Her niceliğin bir ölçüm aleti vardır: terazi, dinamometre, termometre, dereceli silindir, sürat göstergesi, kronometre (s. 55, 58).
- **Örnekler:** standart kütlelerle karpuz tartma (kitap s. 54); tarifteki "bir bardak un" (kurgu); otobüs şoförünün duyurusu: Sivas–Çanakkale yaklaşık 1.100 km, 16 saat, sürat sınırı 100 km/h, rakım 15 m, hava 21 °C (kitap s. 58) — duyurudaki nicelikleri ve birimlerini bulma; ölçüm aleti–nicelik–birim eşleştirmesi (kitap s. 58).
- **Hedeflenen yanılgılar:** (a) birim ile niceliği karıştırmak ("metre bir niceliktir"); (b) gündelik birimi SI birimi sanmak (litre, km/h, °C, gram); (c) terazi ile dinamometrenin aynı şeyi ölçtüğünü sanmak (biri kütleyi kg, öteki kuvveti N ile ölçer).
- **Anlama denetimi:** Dene: dokuz niceliği SI birimiyle eşleştirme (sürükle-bırak), ardından üç ölçüm aletini nicelikle eşleştirme. Çıkış: (1) duyurudan bir cümle verilir, nicelik ve SI birimi sorulur; (2) "hangisi nicelik değil, birimdir?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.1 uygulama: "Öğretmen SI birim sistemi ile ilgili bilgilendirme yapar. Öğrenciler SI birim sistemi hakkında farkındalık kazanır." "…listelerde yer alan birimleri ve nicelikleri SI birim sistemini kullanarak (E3.2) eşleştirir…" Köprü kurma: "Öğrencilerin günlük hayatlarında karşılaştıkları fiziksel nicelikler ve bu niceliklerin birimlerini kuvvet ve hareket konusu ile ilişkilendirmeleri sağlanabilir…"
- **Açılış sorusu:** Tarifte "bir bardak un" yazıyor; senin bardağınla tarifi yazanın bardağı aynı mı?
- **Akılda kalıcı cümle:** Ortak birim, herkesin aynı şeyi ölçmesidir.
- **Ölçek:** 6 sahne.

#### A2 · Temel mi, türetilmiş mi?

- **Tek fikir:** Temel nicelik doğrudan ölçülür ve kendi başına ifade edilir; türetilmiş nicelik temel niceliklerle kurulan matematiksel modelle tanımlanır (kitap s. 57). Ayrımı birim ele verir.
- **Anlatılacaklar:**
  1. Birime bakma: sürat m/s → uzunluk ve zaman; yoğunluk kg/m³ → kütle ve uzunluk; uzunluk m, kütle kg, zaman s tek başına durur (kitap s. 56 tablosundaki yöntem; oradaki ivme ve basınç yerine öğrencinin tanıdığı nicelikler).
  2. Ayrıştırma: birimi tek başına duranlar (m, kg, s, K, A) ve birimi başka birimlerden kurulanlar (m/s, kg/m³, m², m³). Alan ve hacim sınır durumudur: birimlerinde tek tür nicelik vardır ama uzunluktan kurulurlar.
  3. Gruplama: iki grup.
  4. Adlandırma: "temel nicelikler", "türetilmiş nicelikler" (ad en sonda).
  5. Nitelikler tanımlanır (s. 57).
  6. Yedi temel nicelik ve SI birimleri: uzunluk (m), kütle (kg), zaman (s), elektrik akımı (A), sıcaklık (K), ışık şiddeti (cd), madde miktarı (mol) (s. 55, Tablo 2.1).
  7. Bazı türetilmiş nicelikler: alan (m²), sürat (m/s), kuvvet (kg·m/s², newton), enerji (kg·m²/s², joule), basınç (kg/m·s², pascal), elektrik yükü (A·s, coulomb); hacim, hız, yoğunluk (s. 57, Tablo 2.2; s. 59).
  8. Özel adlı birim yanıltır: newton tek sözcüktür ama kg·m/s²'dir.
  9. Türetilmiş birimi çözme: güç kg·m²/s³ → kütle, uzunluk, zaman (s. 57 örneği).
- **Örnekler:** koşu bandı ekranı: süre, yol, sürat; hangisi öbür ikisinden hesaplanır (kurgu); kitabın s. 56 tablosu; güç birimi (s. 57); bisiklet amortisörü etiketi: 100 g, 11,8 cm³, 8,47 g/cm³, 1.250 N (s. 122–123) — dört niceliği adlandır, temel ve türetilmiş diye ayır.
- **Hedeflenen yanılgılar:** (a) özel adı olan birim (N, J, Pa) temel niceliğe aittir; (b) çok kullanılan nicelik (hız, kuvvet) temeldir; (c) sıcaklığın SI birimi °C'tur; (d) hacim temeldir, çünkü "litre" tek sözcüktür.
- **Anlama denetimi:** Dene: on üç nicelik kartını iki kutuya ayırma (s. 59 tablosundaki nicelikler); ardından ters soru: birimi verilen niceliğin hangi temel niceliklerden kurulduğu (üç madde). Çıkış: (1) etiketteki dört nicelikten temel olanı seç; (2) "kuvvetin birimi newton tek sözcük; kuvvet temel mi?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.1 a) "…niteliklerini tanımlar." b) "…niteliklerine göre ayrıştırır." c) "…niteliklerine göre gruplandırır." ç) "…temel ve türetilmiş nicelikler olarak adlandırır." Öğrenme kanıtı: "…temel-türetilmiş ve skaler-vektörel olarak sınıflandırmaları için yapılandırılmış grid kullanılabilir."
- **Açılış sorusu:** Koşu bandının ekranında süre, yol ve sürat yazıyor; bu üçünden hangisi öbür ikisinden hesaplanmıştır?
- **Akılda kalıcı cümle:** Temel nicelik ölçülür, türetilmiş nicelik temellerden kurulur.
- **Ölçek:** 7 sahne.

### Konu B · Skaler ve vektörel nicelikler

#### B1 · Bazı nicelikler yön ister

- **Tek fikir:** Skaler nicelik bir sayı ve bir birimle tam anlatılır; vektörel nicelikte sayı ve birimin yanında yön de gerekir (kitap s. 61, 63).
- **Anlatılacaklar:**
  1. Yönsüz toplama: ısıtıcıya 1 L, sonra 0,5 L su; 20 °C'taki su 70 °C ısınıyor (kitap s. 59–60). Pazardan 3 kg sebze ve 2 kg meyve: 5 kg (s. 61). Sayılar doğrudan toplanır.
  2. Eksik bilgi: iki araç 60 km/h büyüklüğünde hızla, eşit süre gidiyor; varış noktaları farklı (s. 60). Eksik olan yön.
  3. Aynı iki kuvvet, iki sonuç: 30 N ve 40 N bir kez 70 N, bir kez 10 N ediyor (s. 60).
  4. Kanepe: 60 N ve 40 N aynı yönde 100 N; zıt yönde 20 N, doğuya (s. 61). Sonuç yönlere bağlı.
  5. Özellikler belirlenir ve iki tür tanımlanır: skaler nicelik, vektörel nicelik (s. 61, 63).
  6. Nicelikler ayrılır: skaler olanlar kütle, sıcaklık, yoğunluk, hacim, uzunluk, enerji, zaman; vektörel olanlar kuvvet, hız (s. 63).
- **Örnekler:** kaybolan arkadaşa "okuldan 200 metre uzaktayım" mesajı (kurgu); gözü kapalı öğrenci ve çanta: "2 m, 1 m, 3 m yürü" komutu yön olmadan çantaya ulaştırmaz (kitap s. 117); pusula ve haritayla 10 km uzaktaki noktaya yürüyüş (s. 59); üç cümle: suyun yoğunluğu 1.000 kg/m³, kuzeybatı yönünde 12 km/h rüzgâr, 0 K sıcaklık (s. 62).
- **Hedeflenen yanılgılar:** (a) "30 N ile 40 N her zaman 70 N eder" (vektörü skaler gibi toplamak); (b) sürat ile hız aynı şeydir; (c) sayısı büyük ya da önemli olan nicelik vektöreldir.
- **Anlama denetimi:** Dene: kanepe benzetimi — iki kişinin itme yönünü seç, toplam kuvveti tahmin et, gör (üç durum: aynı yön, zıt yön, eşit ve zıt). Ardından altı cümlede geçen niceliği skaler ya da vektörel diye ayırma. Çıkış: (1) "kuzeybatı yönünde 12 km/h" cümlesindeki nicelik; (2) 30 N ve 40 N'ın toplamı için "kesin 70 N" diyen birine ne eksik (yanılgı a).
- **Program dayanağı:** FİZ.9.2.2 a) "Skaler ve vektörel niceliklerin özelliklerini belirler." Uygulama: "…örnek metin veya örnek olayda (OB4) ssunulan ve ön öğrenmelerinde yer alan fiziksel niceliklere ilişkin bilgilerle skaler ve vektörel niceliklerin özelliklerini ilişkilendirerek (SDB1.1) belirler (OB1)."
- **Açılış sorusu:** Kaybolan arkadaşına "okuldan 200 metre uzaktayım" yazdın; seni bulabilir mi?
- **Akılda kalıcı cümle:** Skaler "ne kadar" der, vektörel "ne kadar ve nereye".
- **Ölçek:** 6 sahne.

#### B2 · Skaler ile vektörel: nerede benzer, nerede ayrı?

- **Tek fikir:** İki tür nicelik de bir sayı ve bir birimle yazılır; ayrıldıkları yer yöndür ve bu, toplanma biçimlerini değiştirir. Skaler–vektörel ayrımı ile temel–türetilmiş ayrımı iki ayrı sorudur.
- **Anlatılacaklar:**
  1. Benzerlikler listesi: ikisi de fiziksel niceliktir, ölçülür, büyüklüğü bir sayı ve bir birimle yazılır (kitap s. 63 tanımları); ikisinde de yalnızca aynı tür nicelikler toplanır (s. 72: kuvvet kuvvetle, hız hızla).
  2. Farklılıklar listesi: yön bilgisi; toplamada skalerde sayılar toplanır, vektörelde yönlere bakılır (s. 61).
  3. İki soru, bir tablo: zaman, sıcaklık, uzunluk, hacim, hız, kütle, kuvvet, yoğunluk, enerji; her biri için "temel mi, türetilmiş mi?" ve "skaler mi, vektörel mi?" (s. 63, 5. Alıştırma).
  4. Çıkarım: bu listedeki temel niceliklerin hepsi skalerdir; türetilmişlerin bir kısmı skaler (hacim, yoğunluk, enerji), bir kısmı vektöreldir (hız, kuvvet). İki ayrım birbirinin yerine geçmez.
- **Örnekler:** rüzgâr santrali metni: deniz seviyesinden 50 m yükseklik, 7,5 m/s sürat, kuzeydoğu yönünde 8,1 m/s rüzgâr hızı, 2.741 h güneşlenme süresi, 0,5–1 °C sıcaklık farkı (kitap s. 62) — aynı metinde sürat skaler, hız vektörel; A1'deki otobüs duyurusu ve A2'deki amortisör etiketi bu kez iki soruyla yeniden ayrılır (s. 58, 122–123).
- **Hedeflenen yanılgılar:** (a) türetilmiş nicelik vektöreldir, temel nicelik skalerdir (iki ayrımı tek saymak); (b) vektörel niceliğin birimi skalerinkinden farklıdır (sürat ve hızın birimi aynıdır: m/s); (c) iki tür nicelik hiçbir bakımdan benzemez.
- **Anlama denetimi:** Dene: dokuz niceliği dört gözlü tabloya yerleştirme (temel–skaler, temel–vektörel, türetilmiş–skaler, türetilmiş–vektörel; bir göz boş kalır ve nedeni sorulur). Çıkış: (1) "yoğunluk türetilmiş bir nicelik; öyleyse vektörel mi?" (yanılgı a); (2) verilen dört ifadeden benzerlik olanı seç.
- **Program dayanağı:** FİZ.9.2.2 b) "Skaler ve vektörel niceliklerin benzerliklerini listeler." c) "Skaler ve vektörel niceliklerin farklılıklarını listeler." Öğrenme kanıtı: "Öğrencilerin fiziksel nicelikleri temel-türetilmiş ve skaler-vektörel olarak sınıflandırmaları için yapılandırılmış grid kullanılabilir."
- **Açılış sorusu:** Hava durumunda "rüzgârın sürati 8 m/s" ile "rüzgâr kuzeydoğuya 8 m/s hızla esiyor" aynı bilgiyi mi verir?
- **Akılda kalıcı cümle:** Sayı ve birim ortak, yön ayırır.
- **Ölçek:** 5 sahne.

### Konu C · Vektörler

Bütün vektör dersleri kareli düzlemde, kenarı 1 birim olan karelerle yürür; yönler doğu, batı, kuzey, güney ile ya da +x, −x, +y, −y ile söylenir (kitap s. 65, 80). Trigonometri, açı ve köşegen uzunluğu hesabı yoktur.

#### C1 · Vektör: yönlü bir doğru parçası

- **Tek fikir:** Vektörel nicelik okla çizilir; okun gösterdiği taraf yönü, okun boyu büyüklüğü verir.
- **Anlatılacaklar:**
  1. Gösterim: yönlü doğru parçası; harfin üstündeki ok niceliğin vektörel olduğunu söyler; büyüklük oksuz harfle yazılır: F = 30 N, v = 20 m/s (kitap s. 64).
  2. Doğrultu ve yön: bir doğrultu (okun üzerinde durduğu doğru), o doğrultuda iki yön. Doğu–batı doğrultusu; doğu yönü, batı yönü (s. 64, Görsel 2.3; s. 65'teki yön gülü).
  3. Büyüklük kareden okunur: 1 kare = 1 birim; ölçek verilince birim niceliğe çevrilir (1 kare = 10 N gibi; s. 65, 69).
  4. Aynı doğrultudaki farklı vektörler incelenir; her birinin yönü ve büyüklüğü bir tabloya kaydedilir (s. 65). Bu tablo C2 ve C3'te yorumlanır.
- **Örnekler:** halat çekmede iki takımın çekişi (kurgu); beş kulvarlı pistte koşucuların hareketi, kulvar aralığı 50 m (kitap s. 70); yatay zemindeki koliye etki eden 20 N ve 10 N'lık kuvvetler (s. 69).
- **Hedeflenen yanılgılar:** (a) doğrultu ile yön aynı şeydir; (b) okun çizildiği yer, vektörün büyüklüğünü ya da yönünü değiştirir; (c) uzun ok "daha uzaktaki" cismi gösterir (boy büyüklüktür, konum değil); (d) büyüklük negatif olabilir.
- **Anlama denetimi:** Dene: kareli düzlemde altı vektörün yönünü ve büyüklüğünü okuyup tabloya yazma; ardından verilen yön ve büyüklükte bir oku sürükleyerek çizme (üç madde). Çıkış: (1) çizili okun büyüklüğü, ölçek 1 kare = 5 N iken; (2) "iki ok aynı doğrultuda ama yönleri farklı olabilir mi?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.3 a) "Aynı doğrultu üzerinde yer alan farklı vektörlerin yön ve büyüklüklerini tanımlar." b) "…yön ve büyüklükleri ile ilgili verileri toplayarak kaydeder."
- **Açılış sorusu:** Halat çekmede iki takım da aynı ip boyunca çekiyor; bu iki çekişi kâğıda nasıl çizersin?
- **Akılda kalıcı cümle:** Okun ucu yönü, boyu büyüklüğü söyler.
- **Ölçek:** 6 sahne.

#### C2 · Eşit vektör, zıt vektör

- **Tek fikir:** Yönü ve büyüklüğü aynı olan vektörler eşittir; büyüklüğü aynı, yönü ters olanlar zıttır. Vektör yönü ve büyüklüğü değişmeden taşınabilir.
- **Anlatılacaklar:**
  1. C1'deki tablo yorumlanır: yönü de büyüklüğü de aynı olan satırlar.
  2. Eşit vektör tanımı ve gösterimi: A = B (kitap s. 68).
  3. Taşıma: eşit vektör, vektörün hiçbir özelliği değişmeden paralel olarak başka bir noktaya taşınmasıdır (s. 68). C5 ve C6 bunu kullanır.
  4. Zıt vektör: büyüklük aynı, yön ters; D = −E (s. 68).
  5. Dört durum yan yana: aynı yön–aynı boy (eşit), ters yön–aynı boy (zıt), aynı yön–farklı boy, ters yön–farklı boy (son ikisi ne eşit ne zıt; C3'e köprü).
- **Örnekler:** yan yana iki yürüyen merdiven: biri yukarı, öbürü aynı hızla aşağı (kurgu); kitabın örneği: A batıya 2 birim; ona eşit olan B, zıt olan D; kuzeye 2 birimlik F ile güneye 2 birimlik E zıt (s. 68–69); kulvarlardaki koşucuların vektörlerinden eşit olanlar (s. 70); koliye etki eden altı kuvvetten eşit ve zıt çiftler (s. 69–70).
- **Hedeflenen yanılgılar:** (a) büyüklükleri aynı olan vektörler eşittir; (b) farklı yerde duran ok farklı bir vektördür; (c) zıt olmak için yönün ters olması yeter, boy farklı olabilir; (d) paralel olan oklar eşittir.
- **Anlama denetimi:** Dene: sekiz oklu bir düzlemde eşit çiftleri ve zıt çiftleri bulma; ardından verilen vektörün zıddını sürükleyerek çizme. Çıkış: (1) "A doğuya 3 birim, B batıya 3 birim, C doğuya 3 birim başka bir yerde": hangisi A'ya eşit (yanılgı b); (2) "aynı boyda iki ok her zaman eşit midir?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.3 c) "Verileri yorumlayarak eşit vektör, zıt vektör ve gerçek sayıyla çarpılmış vektörlere ilişkin değerlendirmeler yapar." Uygulama: "Öğretmen kareli düzlem üzerinde eşit, zıt ve gerçek sayı ile çarpılmış vektörleri görseller kullanarak gösterebilir."
- **Açılış sorusu:** Yan yana iki yürüyen merdivenden biri yukarı, öbürü aşağı gidiyor; ikisi de saniyede yarım metre ilerliyor. Bu iki hızın nesi aynı, nesi farklı?
- **Akılda kalıcı cümle:** Eşit: aynı boy, aynı yön. Zıt: aynı boy, ters yön.
- **Ölçek:** 6 sahne.

#### C3 · Vektörü bir sayıyla çarpmak

- **Tek fikir:** Bir vektör gerçek sayıyla çarpılınca doğrultusu değişmez; sayının büyüklüğü okun boyunu ayarlar, sayının işareti yönü belirler.
- **Anlatılacaklar:**
  1. Pozitif ve 1'den büyük sayı: yön aynı, büyüklük artar (2A) (kitap s. 68).
  2. Pozitif ve 1'den küçük sayı: yön aynı, büyüklük azalır (½A) (s. 68).
  3. Negatif sayı: yön ters döner (−A, −3/2 A) (s. 68).
  4. Beş durumun tablosu: 1'den büyük; 0 ile 1 arası; −1 ile 0 arası; −1; −1'den küçük (s. 71, Kontrol Noktası).
  5. Zıt vektörle bağ: −1 ile çarpmak zıt vektörü verir.
  6. Bir vektörü ötekinin cinsinden yazma: A batıya 2 birim, C doğuya 4 birim → A = −C/2 (s. 69).
- **Örnekler:** arabayı tek başına iten kişinin yanına aynı güçte bir arkadaşı geliyor: 2F (kurgu); kitabın görseli: A, 2A, ½A, −A, −3/2 A (s. 68); koliye etki eden kuvvetleri F₁ cinsinden yazma: 20 N ve 10 N'lık, aynı ve zıt yönlü kuvvetler (s. 69–70); kulvarlarda iki koşucunun vektörlerinin birbirinin katı olması (s. 70–71).
- **Hedeflenen yanılgılar:** (a) negatif sayıyla çarpmak vektörü küçültür; (b) −2A'nın büyüklüğü negatiftir; (c) kesirli sayıyla çarpmak yönü çevirir; (d) sayıyla çarpınca doğrultu da değişir.
- **Anlama denetimi:** Dene: çarpan kaydırıcısı (−2, −1,5, −1, −0,5, 0,5, 1, 1,5, 2): öğrenci önce yönü ve boyu tahmin eder, sonra oku görür; ardından iki ok verilir, birini ötekinin cinsinden yazan çarpanı bulur (üç madde). Çıkış: (1) A doğuya 4 birim ise −½A; (2) "−3A, A'dan küçük müdür?" (yanılgı a, b).
- **Program dayanağı:** FİZ.9.2.3 c) (yukarıdaki cümle). Öğrenme kanıtı: "Öğrencilere vektörlerin toplanması ve gerçek sayı ile çarpılması konularında bir çalışma yaprağı verilebilir."
- **Açılış sorusu:** Arabayı tek başına itiyordun; yanına aynı büyüklükte kuvvetle iten bir arkadaşın geldi. İtme okunu nasıl değiştirirsin?
- **Akılda kalıcı cümle:** Sayı okun boyunu ayarlar, eksi işareti yönünü çevirir.
- **Ölçek:** 6 sahne.

#### C4 · Aynı doğrultuda iki vektör: bileşke

- **Tek fikir:** İki vektörün yaptığı etkiyi tek başına yapan vektöre bileşke denir; aynı doğrultuda bileşke, yönler aynıysa büyüklüklerin toplamı, zıtsa farkı kadardır ve büyük olanın yönündedir.
- **Anlatılacaklar:**
  1. Bileşke vektör tanımı ve gösterimi: R (kitap s. 72).
  2. Yalnızca aynı tür nicelikler toplanır: kuvvet kuvvetle, hız hızla; hız ile kuvvet toplanmaz (s. 72).
  3. Aynı yönde iki vektör: oklar art arda dizilir, bileşke ikisinin toplamı kadardır (60 N + 40 N = 100 N, doğu; s. 61).
  4. Zıt yönde iki vektör: bileşke fark kadardır, büyük olanın yönündedir (60 N − 40 N = 20 N, doğu; s. 61).
  5. Eşit büyüklükte ve zıt yönde: iki etki birbirini götürür; cisim olduğu yerde kalır (s. 122, 5c).
  6. Örüntü: art arda dizilen okların ilk başlangıcından son ucuna çizilen ok (C5'e köprü; bir boyutta toplama).
- **Örnekler:** kanepeyi iten iki kişi (kitap s. 61); rafting botu: akıntı 50 N, kürekler akıntıyla aynı yönde 70 N; kürekler akıntıya karşı 70 N; botu sabit tutmak için gereken kuvvet (s. 122); halat çekme (kurgu); B1'deki 30 N ve 40 N'ın 70 N ve 10 N etmesinin açıklaması (s. 60).
- **Hedeflenen yanılgılar:** (a) büyüklükler her durumda toplanır; (b) bileşke her zaman toplanan vektörlerin ikisinden de büyüktür; (c) zıt yönde bileşkenin yönü ilk söylenen vektörün yönüdür; (d) iki kuvvet varsa cisim mutlaka hareket eder.
- **Anlama denetimi:** Dene: halat çekme benzetimi — iki takımın kuvvetini kaydırıcıyla seç, bileşkenin yönünü ve büyüklüğünü tahmin et, gör (aynı yön, zıt yön, eşit ve zıt). Çıkış: (1) batıya 50 N ile doğuya 80 N'ın bileşkesi; (2) "bileşke, iki vektörün ikisinden de küçük çıkabilir mi?" (yanılgı b).
- **Program dayanağı:** FİZ.9.2.4 uygulama: "…kareli düzlem üzerinde aynı ve farklı doğrultulardaki iki vektörün toplanmasında…" "…vektörlerin bir boyutta ve iki boyutta toplanmasına yönelik yöntemlerin temel özelliklerini…" Anahtar kavram: bileşke vektör.
- **Açılış sorusu:** Halat çekmede iki takım da var gücüyle çekiyor ama ip kıpırdamıyor; kuvvetler nereye gitti?
- **Akılda kalıcı cümle:** Aynı yön toplar, zıt yön çıkarır; bileşke büyüğün yönündedir.
- **Ölçek:** 7 sahne.

#### C5 · Uç uca ekleme

- **Tek fikir:** İki vektör, biri ötekinin bitiş noktasına taşınarak toplanır; bileşke, ilk vektörün başlangıcından son vektörün bitişine çizilen vektördür.
- **Anlatılacaklar:**
  1. Farklı doğrultulardaki iki vektör: C4'teki kural tek başına yetmez.
  2. İşlem basamakları: (a) B, yönü ve büyüklüğü değişmeden A'nın bitiş noktasına taşınır; (b) A'nın başlangıcından B'nin bitişine yönlü doğru parçası çizilir; (c) bu vektör bileşkedir: R = A + B (kitap s. 75).
  3. Bileşke kareli düzlemde bileşenleriyle okunur: "3 sağ, 4 yukarı". Köşegenin uzunluğu sayıyla istenmez.
  4. Sıra değişir, bileşke değişmez: A + B = B + A (s. 76).
  5. Aynı doğrultuda da çalışır: C4'teki art arda dizme, uç uca eklemenin tek doğrultudaki hâlidir.
  6. Örüntü: farklı vektör çiftleriyle denenir.
- **Örnekler:** önce 3 kare doğuya, sonra 4 kare kuzeye yürüyen kişi (kurgu); rüzgârlı havada uçak: motorun sağladığı hız ile rüzgârın sürükleme hızı toplanır, uçak istikametinden farklı bir yöne gider (kitap s. 72; nitel, sayı verilmez); kitabın Görsel 2.7'deki A ve B vektörleri (s. 75).
- **Hedeflenen yanılgılar:** (a) bileşkenin büyüklüğü büyüklüklerin toplamıdır (3 + 4 = 7); (b) bileşke son uçtan başlangıca doğru çizilir (yön ters); (c) taşırken ok döndürülebilir ya da boyu değişebilir; (d) vektörlerin sırası değişirse bileşke değişir.
- **Anlama denetimi:** Dene: öğrenci ikinci oku sürükleyip birincinin ucuna bırakır, bileşkeyi çizer (üç çift: dik, eğik, aynı doğrultu); ardından sırayı değiştirip aynı bileşkeyi görür. Çıkış: (1) çizili iki vektörün bileşkesi dört seçenekten hangisi (çeldiricilerden biri ters yönlü ok: yanılgı b); (2) "3 kare doğu ve 4 kare kuzey yürüyen kişi başlangıçtan 7 kare uzakta mıdır?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.4 a) "…uç uca ekleme ve paralelkenar yöntemi ile bileşenlerine ayırma işlemini inceleyerek toplama yöntemlerinde kullanılan örüntüleri bulur." Uygulama: "Öğrenciler simülasyon ve animasyon gibi dijital içerikler ya da görseller yardımıyla…" Sınır: "Trigonometrik hesaplamalardan kaçınılır."
- **Açılış sorusu:** Önce 3 kare doğuya, sonra 4 kare kuzeye yürüdün; başladığın yerden bakan biri seni hangi yönde görür?
- **Akılda kalıcı cümle:** Okları uç uca diz, baştan sona bir ok çek.
- **Ölçek:** 7 sahne.

#### C6 · Paralelkenar yöntemi

- **Tek fikir:** Başlangıçları aynı noktaya getirilen iki vektörün bileşkesi, bu iki vektörle kurulan paralelkenarın o noktadan çıkan köşegenidir.
- **Anlatılacaklar:**
  1. Aynı noktaya etki eden iki vektör: iki ip, bir cisim.
  2. İşlem basamakları: (a) vektörler yönleri ve büyüklükleri değişmeden aynı başlangıç noktasına getirilir; (b) her vektörün bitiş noktasından ötekine paralel çizilir; (c) başlangıç noktasından paralellerin kesişme noktasına vektör çizilir; (ç) bu vektör bileşkedir (kitap s. 76–77).
  3. Bileşke yine bileşenleriyle okunur.
  4. Hangi köşegen: başlangıç noktasından çıkan.
  5. Aynı doğrultudaki iki vektörle paralelkenar kurulamaz; orada C4 ve C5 kullanılır (s. 85, 7. soru).
  6. Örüntü: farklı vektör çiftleriyle denenir.
- **Örnekler:** sandığı iki ayrı iple, farklı yönlere çeken iki kişi (kurgu); yatay zemindeki kancaya uygulanan F₁ ve F₂: kancanın hareket yönü (kitap s. 78, 9. Alıştırma); kitabın Görsel 2.8 ve s. 77 örneği.
- **Hedeflenen yanılgılar:** (a) bileşke, iki vektörün uçlarını birleştiren öteki köşegendir; (b) başlangıçlar birleştirilmeden paralel çizilebilir; (c) yöntem yalnızca birbirine dik vektörlerde çalışır; (d) cisim, daha büyük kuvvetin yönünde gider.
- **Anlama denetimi:** Dene: öğrenci iki vektörü aynı noktaya taşır, paralelleri çizer, köşegeni seçer (üç çift; biri dar, biri geniş açılı). Sonra vektörlerden birinin boyunu kaydırıcıyla değiştirip bileşkenin o vektöre doğru yattığını görür. Çıkış: (1) çizili paralelkenarda bileşke hangi ok (yanılgı a); (2) "sandık büyük kuvvetin yönünde mi gider?" (yanılgı d).
- **Program dayanağı:** FİZ.9.2.4 a) (yukarıdaki cümle). Uygulama: "…iki vektörün toplanmasında kullanılan uç uca ekleme ve paralelkenar yöntemleri…"
- **Açılış sorusu:** İki kişi bir sandığı iki ayrı iple, farklı yönlere çekiyor; sandık hangi yöne gider?
- **Akılda kalıcı cümle:** Bileşke, paralelkenarın köşegenidir.
- **Ölçek:** 6 sahne.

#### C7 · Bir vektörü bileşenlerine ayırmak

- **Tek fikir:** Kareli düzlemdeki her vektör, biri x ekseninde biri y ekseninde iki vektörün toplamıdır; bunlar vektörün bileşenleridir.
- **Anlatılacaklar:**
  1. Bileşen: vektörün koordinat sisteminin eksenleri üzerindeki iz düşümü; bileşenlerin vektörel toplamı vektörün kendisidir (kitap s. 79).
  2. Dik kartezyen koordinat sistemi: birbirine dik iki eksen, orijin (s. 80). Yalnızca x ve y; z ekseni anılmaz.
  3. İşlem basamakları: (a) vektörün başlangıç noktası orijine getirilir; (b) bitiş noktasından eksenlere paraleller çizilir; (c) orijinden paralellerin eksenleri kestiği noktalara A<sub>x</sub> ve A<sub>y</sub> çizilir (s. 80).
  4. Bileşenin de yönü ve büyüklüğü vardır: "A<sub>x</sub>, −x yönünde 3 birim; A<sub>y</sub>, +y yönünde 3 birim" (s. 80 örneği).
  5. Geri dönüş: bileşenler uç uca eklenince (ya da paralelkenarla) vektörün kendisi çıkar (s. 83, 1d).
  6. Eksen üzerindeki vektör: öteki eksende bileşeni yoktur.
- **Örnekler:** satranç tahtasında çapraz giden filin vardığı kareye yalnızca yatay ve düşey adımlarla gitmek (kurgu); evden okula giden öğrenci: yalnızca x ve y eksenleri boyunca kaç birim, hangi yönde (kitap s. 82, 13. Alıştırma); kitabın s. 80 örneği.
- **Hedeflenen yanılgılar:** (a) bileşenlerin büyüklükleri toplanınca vektörün büyüklüğü bulunur; (b) bileşenin yönü yoktur, hep pozitiftir; (c) bileşenler vektörün "yarıları"dır (ikisi eşit olur); (d) vektör orijine taşınınca değişir.
- **Anlama denetimi:** Dene: altı vektörün bileşenlerini yön ve büyüklükle yazma (dördü farklı bölgelerde, ikisi eksen üzerinde); ters soru: bileşenleri verilen vektörü çizme (üç madde). Çıkış: (1) çizili vektörün A<sub>x</sub> ve A<sub>y</sub> bileşeni; (2) "A<sub>x</sub> 3 birim, A<sub>y</sub> 4 birim; vektörün boyu 7 birim midir?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.4 a) "…bileşenlerine ayırma işlemini inceleyerek…" Sınır: "Trigonometrik hesaplamalardan kaçınılır. Bileşenlerine ayırma işleminde dik kartezyen koordinat sistemi ile sınırlı kalınır."
- **Açılış sorusu:** Satranç tahtasında fil çapraz gider; aynı kareye yalnızca yatay ve düşey adımlarla nasıl varırsın?
- **Akılda kalıcı cümle:** Her ok, bir yatay ve bir düşey okun toplamıdır.
- **Ölçek:** 6 sahne.

#### C8 · Bileşenleri toplayarak bileşke

- **Tek fikir:** İki vektör, bileşenlerine ayrılıp aynı eksendeki bileşenler kendi aralarında toplanarak da toplanır; çıkan iki bileşen bileşkenin bileşenleridir.
- **Anlatılacaklar:**
  1. Üçüncü yol: vektörler uç uca ekleme ve paralelkenarla toplandığı gibi bileşenlerine ayrılarak da toplanır (kitap s. 81).
  2. İşlem basamakları: (a) iki vektör bileşenlerine ayrılır; (b) x eksenindeki bileşenler kendi arasında, y eksenindekiler kendi arasında toplanır: R<sub>x</sub>, R<sub>y</sub>; (c) R<sub>x</sub> ile R<sub>y</sub> birleştirilerek R bulunur (s. 81).
  3. Aynı eksendeki bileşenler aynı doğrultudadır: C4'teki kural uygulanır (aynı yön toplar, zıt yön çıkarır).
  4. x bileşeni y bileşeniyle toplanmaz.
  5. Örüntü: farklı vektör çiftleriyle denenir; bir eksende bileşenlerin birbirini götürdüğü durum.
- **Örnekler:** iki yürüyüş art arda: "2 sağ, 3 yukarı" ve "4 sağ, 1 aşağı"; sonuç "6 sağ, 2 yukarı" (kurgu); kitabın Görsel 2.10'daki A ve B vektörleri (s. 81).
- **Hedeflenen yanılgılar:** (a) x ve y bileşenleri birbiriyle toplanır; (b) zıt yönlü bileşenler de büyüklükçe toplanır; (c) bu yol yaklaşık sonuç verir, çizimle bulunan bileşkeden farklı çıkar.
- **Anlama denetimi:** Dene: iki vektörün bileşen tablosunu doldurma (A<sub>x</sub>, B<sub>x</sub>, R<sub>x</sub>; A<sub>y</sub>, B<sub>y</sub>, R<sub>y</sub>), ardından R'yi çizme (üç çift; birinde y bileşenleri zıt yönlü). Çıkış: (1) bileşenleri verilen iki vektörün bileşkesinin bileşenleri; (2) "A<sub>y</sub> 3 birim yukarı, B<sub>y</sub> 3 birim aşağı ise bileşke nereye bakar?" (sınır durumu).
- **Program dayanağı:** FİZ.9.2.4 a) (yukarıdaki cümle). Uygulama: "…uç uca ekleme ve paralelkenar yöntemleri ile bileşenlerine ayırma işlemini ve görsellerde yer alan bileşke vektörleri inceler (OB7)."
- **Açılış sorusu:** İki oku çizmeden, yalnızca "kaç sağ, kaç yukarı" bilgisiyle toplayabilir misin?
- **Akılda kalıcı cümle:** Yatay yatayla, düşey düşeyle toplanır.
- **Ölçek:** 6 sahne.

#### C9 · Yöntem değişir, bileşke değişmez

- **Tek fikir:** Aynı iki vektör hangi yöntemle toplanırsa toplansın aynı bileşke bulunur.
- **Anlatılacaklar:**
  1. Aynı iki vektör üç yolla toplanır: uç uca ekleme, paralelkenar, bileşenlerle toplama; işlem basamakları ve sonuçlar yan yana karşılaştırılır (kitap s. 72–74, 4. Etkinlik).
  2. İlişki: paralelkenarın karşı kenarı, uç uca eklemedeki taşınmış vektördür; iki çizim aynı üçgeni içerir.
  3. Farklı vektör çiftleriyle sistematik deneme: her seferinde üç yol, tek bileşke.
  4. Genellemeler: (a) yöntem bileşkeyi değiştirmez (s. 83, 1b); (b) toplama sırası bileşkeyi değiştirmez (s. 76); (c) taşımada yön ve büyüklük korunur; (ç) bir vektörün bileşenlerinin bileşkesi kendisidir (s. 83, 1d); (d) bir boyutta toplama, iki boyuttaki toplamanın tek doğrultudaki hâlidir.
  5. Yöntemlerin temel özellikleri tablosu: nereden başlar, ne taşınır, bileşke nereden nereye çizilir (s. 85, Kontrol Noktası).
- **Örnekler:** iki arkadaş aynı iki oku farklı yöntemlerle topluyor (kurgu); kitabın doğru–yanlış ifadeleri (s. 83): "bileşke daima vektörlerden birine eşittir", "iki yöntem aynı iki vektör için farklı sonuç verir", "paralelkenar yönteminde başlangıç noktaları aynı noktaya getirilir".
- **Hedeflenen yanılgılar:** (a) farklı yöntem farklı bileşke verebilir; (b) yöntemler ancak yaklaşık olarak uyuşur; (c) bir boyuttaki toplama ile iki boyuttaki toplama ayrı kurallardır.
- **Anlama denetimi:** Dene: öğrenci iki vektörü kendisi seçer (uçlarını sürükler); üç panel aynı anda üç yöntemi çizer ve bileşkeler üst üste getirilir. Ardından beş doğru–yanlış ifadesi (s. 83'teki ifadelerden). Çıkış: (1) yöntem–tanım eşleştirmesi (s. 84); (2) "üç yöntemle üç ayrı bileşke bulan öğrenci nerede hata yapmış olabilir?" (seçenekli).
- **Program dayanağı:** FİZ.9.2.4 b) "…genelleme yapar." Uygulama: "Her yöntemin işlem basamaklarını ve sonuçlarını karşılaştırarak toplama işlemleri arasındaki ilişkiyi bulur (E3.4). Sistematik bir şekilde farklı vektörler ve farklı yöntemlerle yapılan toplama işlemleri neticesinde bulunan bileşke vektörlere dayanarak (E3.7) … geneller." Öğrenme kanıtı: "…doğru yanlış, boşluk doldurma, eşleştirme sorularından oluşan bir çalışma yaprağı verilebilir."
- **Açılış sorusu:** İki arkadaş aynı iki oku farklı yöntemlerle topladı; sonuçları farklı çıkabilir mi?
- **Akılda kalıcı cümle:** Yol üç, bileşke tek.
- **Ölçek:** 6 sahne.

### Konu D · Doğadaki temel kuvvetler

#### D1 · Kuvvet ve doğadaki dört temel kuvvet

- **Tek fikir:** Doğada dört temel kuvvet vardır: güçlü nükleer kuvvet, elektromanyetik kuvvet, zayıf nükleer kuvvet, kütle çekim kuvveti; her biri kendine özgü olaylarda tanınır.
- **Anlatılacaklar:**
  1. Kuvvetin etkileri (ön bilgi, tek sahne): bir cismi harekete geçirebilir, hızlandırabilir, yavaşlatabilir, durdurabilir; hareket yönünü ya da şeklini değiştirebilir. Birimi newton, sembolü F (kitap s. 89).
  2. Kütle çekim kuvveti: bütün maddelerin kütleleri nedeniyle birbirine uyguladığı kuvvet; elmanın düşmesi, gezegenlerin Güneş'in etrafında dolanması, gelgit; bir cismin ağırlığının sebebi (s. 87, 88, 90).
  3. Elektromanyetik kuvvet: elektrik yüklerinin ve manyetik kutupların etkileşimi; itme ya da çekme; saça sürtülen tarağın kâğıt parçalarını çekmesi, mıknatıs, pusula, şimşek, maglev treni (s. 87, 89, 90–91).
  4. Güçlü nükleer kuvvet: atom çekirdeğindeki proton ve nötronları bir arada tutar; etki mesafesi çekirdekle sınırlıdır; en güçlü kuvvettir; Güneş'te hidrojen çekirdeklerinin birleşip helyuma dönüşmesi (s. 86, 89).
  5. Zayıf nükleer kuvvet: atom çekirdeğinin kararsız olmasına yol açar, proton ve nötronların başka parçacıklara dönüşmesini sağlar; çekirdek parçalanması, yaş tayininde karbonun azota dönüşmesi (s. 87, 90).
  6. Olay–kuvvet eşleştirmesi.
- **Örnekler:** elinden bırakılan anahtar ve buzdolabı mıknatısı (kurgu); kitabın yedi olayı: gelgit, pusula, gezegenler, karbonun azota dönüşmesi, havalanan topun sahaya düşmesi, iğneleri toplayan mıknatıs, demir çekirdeğinin bir arada kalması (s. 90); dört olay daha: düşen yaprak, şimşek, uranyum çekirdeğinin parçalanması, çekirdekteki protonların birbirini itmesi (s. 91); adadaki dört gözlem (s. 123).
- **Hedeflenen yanılgılar:** (a) kütle çekimi yalnızca Dünya'nın cisimleri çekmesidir; (b) mıknatısın çekmesi ile yer çekimi aynı kuvvettir; (c) güçlü nükleer kuvvet en güçlü olduğuna göre gündelik hayatta en çok onu hissederiz; (d) çekirdekte yalnızca çekme vardır (protonlar birbirini iter, yine de çekirdek dağılmaz).
- **Anlama denetimi:** Dene: on bir olay kartını dört kuvvet kutusuna ayırma (iki turda: önce gündelik yedi olay, sonra çekirdekle ilgili dört olay). Çıkış: (1) "karbon atomunun azota dönüşmesi" hangi kuvvet; (2) "dalından kopan yaprak ile Güneş'in etrafında dolanan gezegen aynı kuvvetin etkisinde midir?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.5 a) "Doğadaki temel kuvvetlere ilişkin özellikleri belirler." Uygulama: "Öğretmen soru cevap tekniği ile kuvvetin harekete etkilerini hatırlattıktan sonra animasyon, video ya da fotoğraf gibi içeriklerden birini kullanarak doğadaki temel kuvvetlerin etkilerini gösteren görseller sunabilir." Sınır: "…matematiksel model kullanmadan…"
- **Açılış sorusu:** Elinden bıraktığın anahtarı yere çeken ile buzdolabındaki mıknatısı kapıda tutan aynı kuvvet mi?
- **Akılda kalıcı cümle:** Dört temel kuvvet: ikisi çekirdekte çalışır, ikisi çekirdeğin dışında da.
- **Ölçek:** 7 sahne.

#### D2 · Dört kuvvet: nerede benzer, nerede ayrı?

- **Tek fikir:** Dört temel kuvvet aynı ölçütlerle yan yana konunca ortak yanları ve ayrıldıkları yerler görünür.
- **Anlatılacaklar:**
  1. Karşılaştırma ölçütleri, yalnızca D1'de öğretilen özelliklerden: neyle ilgili (kütle; elektrik yükü ve manyetik kutup; çekirdek parçacıkları), ne yapar, nerede etkili, etki mesafesi.
  2. Benzerlikler: dördü de kuvvettir (D1'deki etkiler); güçlü ve zayıf nükleer kuvvet yalnızca atom çekirdeği düzeyinde etkilidir; elektromanyetik kuvvet ile kütle çekim kuvveti çekirdeğin dışında da etkilidir ve etki mesafeleri sonsuz kabul edilir (kitap s. 86–88).
  3. Farklılıklar: elektromanyetik kuvvet iter ya da çeker; güçlü nükleer kuvvet çekirdeği bir arada tutar, zayıf nükleer kuvvet çekirdeğin yapısında değişime neden olur; güçlü nükleer kuvvet en güçlü olandır ama etki mesafesi çekirdekle sınırlıdır; zayıf nükleer kuvvetin etki alanı güçlü nükleer kuvvetinkinden daha kısadır (s. 86–88).
  4. Makro ve mikro düzey: makro düzeyde etkili kuvvetler gündelik hayatta kolayca gözlenir, mikro düzeydekiler gözlenemez (s. 86).
  5. Karşılaştırma tablosu: beş özellik × dört kuvvet (s. 88 tablosu): "sadece atom çekirdeği düzeyinde etkilidir", "atom çekirdeğinin dışında da etkilidir", "çekirdeğin yapısında bir değişime neden olur", "çekirdeği ve onu oluşturan parçacıkların yapısını korumakta etkilidir", "bir cismin ağırlığının sebebidir". Formül, sayısal şiddet oranı yok.
- **Örnekler:** demir atomunun çekirdeği: 26 proton, 30 nötron; protonlar birbirini iter, çekirdek yine de dağılmaz (kitap s. 124) — aynı yerde iki temel kuvvet; gündelik hayatta hangi kuvvetlerin fark edildiği (s. 86).
- **Hedeflenen yanılgılar:** (a) güçlü olan kuvvet uzağa da etki eder; (b) dört kuvvet hiçbir bakımdan benzemez; (c) bir olayda yalnızca tek bir temel kuvvet bulunur; (d) göremediğimiz kuvvet etkisizdir.
- **Anlama denetimi:** Dene: kitabın tablosu — beş özelliğin her biri için ilgili kuvvet ya da kuvvetleri işaretleme (bazı özellikte birden fazla). Ardından "benzerlik mi, farklılık mı" kartları (altı ifade). Çıkış: (1) "hangi iki kuvvet çekirdeğin dışında da etkilidir?"; (2) "en güçlü kuvvet neden gezegenleri yörüngede tutmaz?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.5 b) "…benzerlikleri listeler." c) "…farklılıkları listeler." Uygulama: "…benzerliklere ve farklılıklara odaklanarak (E3.2) doğadaki dört temel kuvveti matematiksel model kullanmadan karşılaştırır." Öğrenme kanıtı: çıkış kartı.
- **Açılış sorusu:** Dört temel kuvvetten hangilerinin etkisini gündelik hayatta doğrudan fark edersin?
- **Akılda kalıcı cümle:** En güçlü kuvvet, çekirdeğin dışına ulaşmaz. (İlk yazılan "en kısa mesafede çalışır" kitapla çelişiyordu: s. 87'ye göre etki alanı en kısa olan zayıf nükleer kuvvettir.)
- **Ölçek:** 6 sahne.

### Konu E · Hareketin temel kavramları

Her kavram programın istediği sırayla işlenir: önce birden fazla örnek gösterilir, öğrenci ortak yanı bulur, tanım sonra gelir. Grafik yoktur. Hareket çoğunlukla tek doğrultudadır; iki boyutlu tek hesap E6'dadır.

#### E1 · Nereye göre? Referans noktası ve konum

- **Tek fikir:** Bir cismin yeri ancak seçilen bir referans noktasına göre söylenir; bu yer cismin konumudur ve yönü vardır.
- **Anlatılacaklar:**
  1. İki kroki: bir yerin öteki yerlere göre tarif edilmesi; tariflerdeki ortak yan (kitap s. 92–93).
  2. Referans noktası: cismin konumunu belirtmek için seçilen ve hareket etmediği kabul edilen nokta (s. 105).
  3. Aynı referans noktasına göre birkaç yerin tarifi: yön ve uzaklık birlikte (s. 93).
  4. Konum: cismin herhangi bir anda referans noktasına göre bulunduğu yer; sembolü x, SI birimi metre; referans noktasından cisme çizilen konum vektörüyle gösterilir; vektörel bir niceliktir (s. 105).
  5. Referans noktası değişince konum değişir, cisim yerinden oynamaz (s. 120, 4a: referans B seçilince A'daki aracın konumu).
  6. Hareket: cisim, seçilen referans noktasına göre zamanla yer değiştiriyorsa hareket ediyordur (s. 111).
- **Örnekler:** otobüste oturan yolcu: yanındakine göre ve duraktakine göre (kurgu); kitabın krokileri: Anıtkabir ve çevresi, Çanakkale Şehitliği, Topkapı Sarayı ve çevresi, Sivas'taki müzeler (s. 92–93; şematik kroki olarak yeniden çizilir, harita üretilmez); referans noktasının kuzeybatısındaki alışveriş merkezi, batısındaki benzin istasyonu, güneybatısındaki gençlik merkezi (s. 105); koordinat sisteminde A(4, 2) noktası (s. 105).
- **Hedeflenen yanılgılar:** (a) konum bir uzaklıktır, yön gerekmez; (b) referans noktası her zaman hareketin başladığı yerdir; (c) referans noktası değişince cisim yer değiştirmiş olur; (d) "duruyor" ya da "hareket ediyor" demek için referans noktası gerekmez.
- **Anlama denetimi:** Dene: krokide referans noktasını seç, üç yerin konumunu yön ve uzaklıkla söyle; ardından referans noktasını değiştir, aynı yerin yeni konumunu söyle. Çıkış: (1) doğrusal yolda referans noktasına göre konum (yön ve metre); (2) "otobüsteki yolcu duruyor mu?" (cevap: neye göre; yanılgı d).
- **Program dayanağı:** FİZ.9.2.6 a) "Hareketin temel kavramlarına yönelik örnekleri gözlemleyerek görseller arasındaki benzerlikleri bulur." Uygulama: "…her birine ilişkin öğretmen tarafından sunulan birden fazla görseli inceler. İlgili kavrama ilişkin görsellerdeki benzerlikleri bulur. Öğrenciler bu benzerliklerden yararlanarak hareketin temel kavramlarını tanımlar." "…hareketin temel kavramlarını vektörel ve skaler niceliklerle ilişkilendirmesi sağlanır."
- **Açılış sorusu:** Otobüste oturuyorsun; yanındaki yolcuya göre mi hareket ediyorsun, duraktaki birine göre mi?
- **Akılda kalıcı cümle:** Konum, "nereye göre" sorusuyla başlar.
- **Ölçek:** 6 sahne.

#### E2 · Alınan yol ve yer değiştirme

- **Tek fikir:** Alınan yol izlenen yörüngenin uzunluğudur; yer değiştirme ilk konumdan son konuma çizilen vektördür.
- **Anlatılacaklar:**
  1. Alınan yol örnekleri: iki şehir arasında iki ayrı yol; ev, okul ve kütüphane arasında iki ayrı güzergâh (kitap s. 94).
  2. Alınan yol: cismin hareketi boyunca çizdiği yörüngenin uzunluğu; SI birimi metre; skaler (s. 105).
  3. Yer değiştirme örnekleri: bisiklet ve yürüyüş güzergâhlarında başlangıçtan bitişe çizilen vektör (s. 94–95).
  4. Yer değiştirme: son konum ile ilk konum arasındaki yönlü uzaklık; sembolü Δx; vektörel (s. 106).
  5. Matematiksel model: Δx = x<sub>son</sub> − x<sub>ilk</sub> (s. 106); doğru boyunca gidiş–dönüş işlemleri.
  6. İkisi ne zaman eşit: doğrusal yolda, yön değiştirmeden (s. 108, 16. Alıştırma).
  7. Sınır durumu: başlanan yere dönülünce yer değiştirme sıfır, yol sıfır değil (s. 108).
- **Örnekler:** stadyumda tam tur (kurgu); A ve B şehirleri: bir yol 120 km, öteki 160 km; gidiş–dönüş 280 km (kitap s. 94); kutuyu önce doğuya 4 m, sonra batıya 3 m iten Ece: yer değiştirme doğuya 1 m (s. 102), alınan yol 7 m; odasından çıkıp gün sonunda odasına dönen Kutay: yer değiştirme sıfır (s. 108); üç güzergâhın kara yolu uzunluğu ve kuş uçuşu uzaklığı: Aydın–İzmir 112 km ve 89 km, İzmir–Trabzon 1.309 km ve 1.113 km, Trabzon–Erzurum 262 km ve 179 km (s. 118).
- **Hedeflenen yanılgılar:** (a) yer değiştirme ile alınan yol aynı şeydir; (b) yer değiştirme alınan yoldan büyük olabilir; (c) başladığın yere dönersen yol da sıfırlanır; (d) yer değiştirme izlenen yola bağlıdır.
- **Anlama denetimi:** Dene: sayı doğrusu üzerinde koşucu — öğrenci durakları sürükler; yol ve yer değiştirme ayrı sayaçlarda birikir (üç görev: yalnız ileri, ileri–geri, başa dönüş). Çıkış: (1) doğuya 50 m, batıya 20 m: yol ve yer değiştirme; (2) "yer değiştirmesi sıfır olan biri hiç hareket etmemiş midir?" (yanılgı c).
- **Program dayanağı:** FİZ.9.2.6 a), b). Uygulama: "Öğretmen hareketin temel kavramlarına ait matematiksel modelleri açıklar. Öğrenciler hareketin temel kavramlarına ilişkin matematiksel işlemler yapar."
- **Açılış sorusu:** Stadyumda tam bir tur koştun ve başladığın çizgide durdun; ne kadar yol aldın, yerin ne kadar değişti?
- **Akılda kalıcı cümle:** Yol adım adım sayılır, yer değiştirme baştan sona çizilir.
- **Ölçek:** 7 sahne.

#### E3 · Sürat: ortalama ve anlık

- **Tek fikir:** Sürat birim zamanda alınan yoldur; ortalama sürat bütün yolculuğu, anlık sürat tek bir anı anlatır.
- **Anlatılacaklar:**
  1. Sürat örnekleri: iki araç, alınan yol ve süre; ortak yan (kitap s. 95–96).
  2. Sürat: birim zamanda alınan yol; SI birimi m/s, km/h de kullanılır; skaler; model: sürat = alınan yol / zaman (s. 106).
  3. Bir yolculukta sürat değişir: aynı aracın dört otoyoldaki sürat göstergesi (s. 96).
  4. Ortalama sürat: alınan toplam yolun hareket süresine oranı; skaler; model ve işlem (s. 106).
  5. Ortalama sürat, süratlerin ortalaması değildir: uzun süre gidilen süratin ağırlığı fazladır.
  6. Anlık sürat: sürat göstergesinde o an okunan değer; skaler (s. 97, 106).
  7. Ortalama ile anlığın karşılaştırılması.
- **Örnekler:** göstergesi 90 gösteren ama 90 km'yi iki saatte giden araç (kurgu); A'dan B'ye 240 m'yi 40 s'de (6 m/s), K'den L'ye 150 m'yi 30 s'de (5 m/s) giden araçlar (kitap s. 95–96); dört otoyolda 0,5 h, 1,5 h, 3 h ve 1 h giden araç: toplam 6 h, ortalama sürat 85 km/h (s. 96; dört göstergenin değerleri için bölüm 8); şehir içi, şehirler arası ve otoyoldaki gösterge görüntüleri (s. 97).
- **Hedeflenen yanılgılar:** (a) ortalama sürat, süratlerin aritmetik ortalamasıdır; (b) gösterge ortalama sürati gösterir; (c) ortalama sürati 85 km/h olan araç hiçbir an 85'in üstüne çıkmamıştır; (d) daha çok yol alan daha süratlidir (süreye bakmadan).
- **Anlama denetimi:** Dene: iki bölümlü yolculuk — öğrenci her bölümün süratini ve süresini kaydırıcıyla seçer; toplam yol, toplam süre ve ortalama sürat adım adım hesaplanır; "süratlerin ortalaması" yanında gösterilir ve farkı görülür. Çıkış: (1) 150 km'yi 2 saatte giden aracın ortalama sürati; (2) "bir saat 60, bir saat 100 km/h giden aracın ortalama sürati ile yarım saat 60, bir buçuk saat 100 giden aracınki aynı mıdır?" (yanılgı a).
- **Program dayanağı:** FİZ.9.2.6 a), b); kavramlar: sürat, anlık sürat, ortalama sürat. Sınır: "Hareketin temel kavramlarına yönelik grafiklerden … kaçınılır."
- **Açılış sorusu:** Arabanın göstergesi şu an 90 gösteriyor, ama 90 kilometrelik yol iki saat sürdü; hangisi arabanın sürati?
- **Akılda kalıcı cümle:** Gösterge anı söyler, ortalama bütün yolu.
- **Hikâye:** "İki kamera arası" (kuruldu ve seslendirildi) bu derse bağlanır; bağlama ayrı iştir (`../TASKS.md`).
- **Ölçek:** 8 sahne.

#### E4 · Hız: yönü olan sürat

- **Tek fikir:** Hız birim zamandaki yer değiştirmedir ve yönü vardır; ortalama hız bütün hareketin yer değiştirmesinden, anlık hız tek bir andan söz eder.
- **Anlatılacaklar:**
  1. Hız örnekleri: iki sporcu, yer değiştirme ve süre; ortak yan (kitap s. 97–98).
  2. Hız: birim zamanda yapılan yer değiştirme; SI birimi m/s; vektörel; model: hız = yer değiştirme / zaman (s. 107).
  3. Ortalama hız: toplam yer değiştirmenin hareket süresine oranı; vektörel; model ve işlem (s. 107).
  4. Sürat ile hız ne zaman aynı büyüklükte: doğrusal yolda, yön değiştirmeden (s. 108, 16–17. Alıştırma).
  5. Sınır durumu: başlanan yere dönen cismin ortalama hızı sıfırdır, ortalama sürati sıfır değildir.
  6. Anlık hız: belirli bir andaki hız; vektörel; gösterge 60 km/h gösteriyor ve araç doğuya gidiyorsa anlık hız doğu yönünde 60 km/h'tir (s. 107). Anlık sürat, anlık hızın büyüklüğüdür (s. 106).
  7. Anlık hız değişebilir: aracın her saniyedeki hız büyüklüğü tablosu (s. 99); E5'e köprü.
- **Örnekler:** havuzda gidip gelen ve başladığı duvara dokunan yüzücü (kurgu); A'dan B'ye 50 s'de giden sporcu: hızının büyüklüğü 5 m/s; K'den L'ye 30 s'de giden sporcu: 6 m/s (kitap s. 97–98); 100 m yarıçaplı çembersel yolda yarım tur atan Öykü: 25 s, ortalama hızının büyüklüğü 8 m/s (yer değiştirme çap kadar) (s. 98); doğrusal yolda Yusufhan: 10 s, 3 m/s (s. 98); K aracının anlık hızları: 0, 2, 4, 6, 8 m/s (s. 99).
- **Hedeflenen yanılgılar:** (a) hız ile sürat eş anlamlıdır; (b) ortalama hızı sıfır olan cisim durmuştur; (c) hızın büyüklüğü her zaman sürate eşittir; (d) hızda yön söylemek gerekmez, sayı yeter.
- **Anlama denetimi:** Dene: E2'deki sayı doğrusu koşucusuna süre eklenir; öğrenci aynı hareket için ortalama sürati ve ortalama hızı (yönüyle) bulur (üç görev: yalnız ileri, ileri–geri, başa dönüş). Çıkış: (1) doğuya 80 m, batıya 20 m, toplam 20 s: ortalama hız (büyüklük ve yön); (2) "çembersel pistte tam tur atan koşucunun ortalama hızı ile ortalama sürati eşit midir?" (yanılgı c).
- **Program dayanağı:** FİZ.9.2.6 a), b); kavramlar: hız, anlık hız, ortalama hız. Uygulama: "…vektörel ve skaler niceliklerle ilişkilendirmesi sağlanır."
- **Açılış sorusu:** Yüzücü havuzda gidip geldi ve başladığı duvara dokundu; sürati sıfır değildi, peki ortalama hızı?
- **Akılda kalıcı cümle:** Sürat "ne kadar hızlı" der, hız "nereye doğru"yu da söyler.
- **Ölçek:** 8 sahne.

#### E5 · İvme: hız değişiyorsa

- **Tek fikir:** İvme, birim zamandaki hız değişimidir; hız değişiyorsa ivme vardır ve ivmenin de yönü vardır.
- **Anlatılacaklar:**
  1. İki araç: birinin hızı her saniye artıyor, ötekininki her saniye azalıyor; ortak yan: hız değişiyor (kitap s. 99).
  2. İvme: birim zamandaki hız değişimi; sembolü a, SI birimi m/s²; vektörel (s. 107).
  3. Matematiksel model gösterilir: ivme = hız değişimi / zaman (s. 107). Kitabın iki değeri örnek olarak okunur: hızı 4 s'de 0'dan 8 m/s'ye çıkan araç +2 m/s², 4 m/s'den 0'a inen araç −1 m/s² (s. 99–100).
  4. Hızlanırken hız ile ivme aynı yönlüdür, yavaşlarken zıt yönlüdür (s. 110, 20. Alıştırma).
  5. Hız değişmiyorsa ivme yoktur: sabit hızla giden araç.
  6. Yapılmayanlar: grafik çizilmez; ivmeden yol ya da süre hesaplanmaz; öğrenciden ivme hesabı istenmez (bölüm 7, karar 7).
- **Örnekler:** kalkarken geriye, fren yaparken öne savrulan otobüs yolcusu (kurgu); K ve L araçlarının saniye saniye hız tablosu (kitap s. 99); 3 s'de hızı 12 m/s'ye çıkan, sonra 4 s'de düzgün yavaşlayıp duran araç: iki bölümün ivmelerinin yönü (s. 110).
- **Hedeflenen yanılgılar:** (a) hızlı giden cismin ivmesi büyüktür; (b) ivme ile hız aynı şeydir; (c) yavaşlayan cismin ivmesi yoktur; (d) ivme her zaman hareket yönündedir.
- **Anlama denetimi:** Dene: saniye saniye hız tablosu verilen dört araç — "ivme var mı", "hızlanıyor mu, yavaşlıyor mu", "ivme hareket yönünde mi, ters yönde mi" (dördüncü araç sabit hızlı). Çıkış: (1) "saatte 120 km sabit hızla giden araç ile duraktan kalkan otobüsten hangisinin ivmesi vardır?" (yanılgı a); (2) fren yapan aracın ivmesinin yönü.
- **Program dayanağı:** FİZ.9.2.6 a), b); kavram: ivme. Sınır: "…ivmeli hareket ile ilgili matematiksel işlemlerden kaçınılır."
- **Açılış sorusu:** Otobüs kalkarken geriye, fren yapınca öne savruluyorsun; ikisinde ortak olan ne?
- **Akılda kalıcı cümle:** Hız değişiyorsa ivme vardır.
- **Ölçek:** 6 sahne.

#### E6 · Bir yolculuk, dört hesap

- **Tek fikir:** Aynı hareket için alınan yol, yer değiştirme, ortalama sürat ve ortalama hız ayrı ayrı hesaplanır; skaler olanlar yoldan, vektörel olanlar yer değiştirmeden çıkar.
- **Anlatılacaklar:**
  1. Tek doğrultuda çözülmüş örnek: araç A'dan B'ye, B'den C'ye; her aralığın ve bütün hareketin ortalama hızı (kitap s. 110, 19. Alıştırma: iki aralık 240'ar m, 10 s ve 20 s).
  2. Dört adımlı sıra: (1) alınan yol, (2) yer değiştirme, (3) ortalama sürat = yol / süre, (4) ortalama hız = yer değiştirme / süre.
  3. İki doğrultuda çözülmüş örnek: Emine 40 s'de önce 80 m, sonra dik yönde 60 m yürür: yol 140 m, yer değiştirme 100 m, ortalama sürat 3,5 m/s, ortalama hız 2,5 m/s (s. 108–109). 100 m, kenarları 60 m ve 80 m olan dik üçgenin hipotenüsüdür; bağıntı matematik dersinden ön bilgidir ve yalnızca bu örnekte kullanılır (bölüm 7, karar 22).
  4. Hangi bilgi hangisini verir: "7 s'de 35 m'yi aynı tempoda koştu" cümlesinden alınan yol ve ortalama sürat bulunur; yörünge bilinmeden yer değiştirme ve hız bulunamaz (s. 109, 18. Alıştırma).
  5. On bir kavramın tablosu: skaler olanlar alınan yol, sürat, anlık sürat, ortalama sürat; vektörel olanlar konum, yer değiştirme, hız, anlık hız, ortalama hız, ivme; referans noktası nicelik değil, seçilen bir noktadır (s. 111, Kontrol Noktası).
- **Örnekler:** kitabın üç örneği (s. 108–110); doğrusal yolda A, B, C, D noktalarından geçen araç: referans noktasına göre konumlar, aralıklardaki yer değiştirme ve ortalama hız (s. 120–121; konumlar için bölüm 8).
- **Hedeflenen yanılgılar:** (a) ortalama hız da yoldan hesaplanır; (b) ortalama hız ortalama sürattan büyük olabilir; (c) süre ve yol bilinince bütün nicelikler bulunur; (d) referans noktası da bir niceliktir.
- **Anlama denetimi:** Dene: kareli düzlemde iki parçalı yolculuk — öğrenci dört adımı sırayla doldurur (iki görev tek doğrultuda, biri gidiş–dönüş); ardından on bir kavramı skaler ve vektörel kutularına ayırır. Çıkış: (1) doğuya 60 m ve batıya 20 m'yi 20 s'de giden kişinin ortalama sürati ve ortalama hızı; (2) "yalnızca yol ve süre verilmişse hangisi bulunamaz?" (yanılgı c).
- **Program dayanağı:** FİZ.9.2.6 uygulama: "Öğretmen hareketin temel kavramlarına ait matematiksel modelleri açıklar. Öğrenciler hareketin temel kavramlarına ilişkin matematiksel işlemler yapar." "…hareketin temel kavramlarını vektörel ve skaler niceliklerle ilişkilendirmesi sağlanır."
- **Açılış sorusu:** İki arkadaş aynı yolculuk için biri "saniyede 3,5 metre", öteki "saniyede 2,5 metre" diyor; ikisi de haklı olabilir mi?
- **Akılda kalıcı cümle:** Skaler yoldan, vektörel yer değiştirmeden hesaplanır.
- **Ölçek:** 7 sahne.

#### E7 · Trafikte hareketin kavramları: sürat sınırı ve yeşil dalga

- **Tek fikir:** Hareketin temel kavramları trafikteki sürat sınırını ve yeşil dalgayı anlamaya yarar; biri can güvenliği, öbürü yakıt tasarrufu içindir.
- **Anlatılacaklar:**
  1. Sürat sınırı senaryosu (örnek veri): otoyolda sürat sınırı 100 km/h olan bir otobüs (sınır değeri: kitap s. 58); iki nokta arasındaki yol ve süre verilir. Kullanılan kavramlar: alınan yol, ortalama sürat, anlık sürat. Veriler bir tabloya kaydedilir, sınırla karşılaştırılır.
  2. Sürat sınırlamalarına uymanın can güvenliği açısından önemi.
  3. Yeşil dalga senaryosu (örnek veri): art arda ışıkları olan kurgusal bir cadde; ışıklar, belirli bir sabit süratle giden aracın her birine yeşilde varacağı biçimde ayarlanmış. Kullanılan kavramlar: referans noktası (ilk ışık), konum (ışıkların yeri), sürat. Veriler tabloya kaydedilir: araç her ışığa hangi anda varır.
  4. Yeşil dalganın yakıt tasarrufu açısından önemi: durup yeniden kalkmayan araç.
  5. Genelleme: iki senaryoda geçen kavramlar, tanımları ve skaler ya da vektörel oluşları tek tabloda.
- **Örnekler:** iki senaryo da kurgudur ve derste "örnek veri" olarak kurulur; sayıları senaryo yazılırken seçilir ve toplamları elle denetlenir. Yeşil dalganın nasıl işlediği programda ve kitapta anlatılmıyor; ders onu yukarıdaki tek cümleyle tarif eder (bölüm 8).
- **Hedeflenen yanılgılar:** (a) göstergede sınırın altında bir değer görmek, yol boyunca sınıra uyulduğunu gösterir; (b) yeşil dalgada daha hızlı giden daha çok yeşil yakalar; (c) trafik kuralları ile fizik kavramları ayrı şeylerdir.
- **Anlama denetimi:** Dene: yeşil dalga benzetimi — öğrenci aracın sabit süratini kaydırıcıyla seçer, ışıklara varış anlarını tahmin eder, sonucu görür (çok yavaş, önerilen, çok hızlı). Sürat sınırı için: verilen yol ve süreden ortalama sürati bulup sınırla karşılaştırma (iki sürücü). Çıkış: (1) senaryodaki bir veriden hangi kavramın söz ettiğini seçme; (2) "önerilen süratin üstüne çıkan sürücü ışıklara daha erken varır; neden kazanmaz?" (yanılgı b).
- **Program dayanağı:** FİZ.9.2.6 b) "Hareketin temel kavramlarına ilişkin genellemeler yapar." Uygulama: "…hareketin temel kavramlarından üç tanesini sürat cezaları ya da trafikteki yeşil dalga ile ilişkilendirerek bu kavramlara yönelik veriler içeren eğlenceli senaryolar…" "…canlandırmalarda sunulan verileri kaydeder." "…sürat sınırlamalarına uymanın can güvenliği (D16.2, OB6) ve trafikteki yeşil dalga sisteminin yakıt tasarrufu (D17.2, D19.4, OB8) açısından önemini tartışır."
- **Site dışı kalan:** öğrencilerin senaryoyu kendilerinin yazması ve canlandırması, akran gözlemi, tartışma, poster ya da broşür (bölüm 4).
- **Açılış sorusu:** Bir caddede hiç kırmızıya yakalanmadan bütün ışıklardan geçmek şans mı, hesap mı?
- **Akılda kalıcı cümle:** Sürat sınırı canı, yeşil dalga yakıtı korur.
- **Ölçek:** 7 sahne.

### Konu F · Hareket türleri

#### F1 · Öteleme, dönme, titreşim

- **Tek fikir:** Cisimlerin hareketi üç türe ayrılır: öteleme, dönme ve titreşim; her türün ayırt edici bir niteliği vardır.
- **Anlatılacaklar:**
  1. Altı hareket gözlenir; her birinin niteliği tek cümleyle söylenir: düz yolda giden araç, pervanesi dönen rüzgâr türbini, metronom, okçunun attığı ok, yayın ucunda aşağı yukarı gidip gelen cisim, saatin dişli çarkları (kitap s. 112).
  2. Ayrıştırma: "bütün parçaları birlikte, aynı yönde ilerliyor", "bir nokta çevresinde dönüyor", "bir nokta çevresinde gidip geliyor".
  3. Gruplama: üç grup.
  4. Adlandırma (ad en sonda): öteleme, dönme, titreşim.
  5. Öteleme: cismi oluşturan parçalar birlikte ve aynı yönde hareket eder; bütün parçalar eşit yer değiştirme yapar (s. 114, 116).
  6. Dönme: cisim sabit bir nokta etrafında çember çizer; bütün parçalar bir eksene uzaklıkları değişmeden hareket eder (s. 114, 116).
  7. Titreşim: cisim bir denge konumundan geçerek gidip gelir (s. 114, 116).
  8. Hareketin türü referans noktasına göre belirlenir (s. 111). Matematiksel model yok.
- **Örnekler:** asansör, dönme dolap ve gitar teli (kurgu açılış; dönme dolap ve gitar teli kitapta da var); öteleme: istasyondan kalkan tren, balkondan düşen saksı, duvar kenarına itilen masa, buz pistinde ilerleyen patenci; dönme: bilgisayar fanı, dönme dolap, akrep ve yelkovan, helikopter pervanesi; titreşim: gitar teli, salıncak, su yüzeyindeki dalgalar, diyapazon (kitap s. 114).
- **Hedeflenen yanılgılar:** (a) dönen cisim de yer değiştiriyordur, öyleyse öteleme yapar (dönme dolabın kendisi yerinde durur); (b) salıncak dönme hareketi yapar; (c) titreşim ile dönme aynıdır, ikisi de tekrar eder; (d) hareket eden her cisim öteleme yapar.
- **Anlama denetimi:** Dene: on iki hareket animasyonunu üç gruba ayırma — önce adsız üç kutuya (öğrenci grupları niteliğe göre kurar), sonra adlar gelir. Ardından her tür için "ayırt eden nitelik hangisi" eşleştirmesi. Çıkış: (1) "salıncakta sallanan çocuk" hangi tür (yanılgı b); (2) "dönme ile titreşimi ayıran nitelik nedir?" (yanılgı c).
- **Program dayanağı:** FİZ.9.2.7 a) "Hareket türlerinin niteliklerini belirler." b) "…ortak özelliklerine göre ayrıştırır." c) "…ortak özelliklerine göre gruplandırır." ç) "…oluşturduğu grupları adlandırır." Sınır: "Matematiksel modellerden kaçınılır."
- **Açılış sorusu:** Asansör, dönme dolap ve gitar teli: üçü de hareket ediyor, ama aynı biçimde mi?
- **Akılda kalıcı cümle:** Ötelenen ilerler, dönen bir eksen çevresinde döner, titreşen gidip gelir.
- **Ölçek:** 7 sahne.

#### F2 · Aynı anda birden fazla hareket

- **Tek fikir:** Bir cisim aynı anda birden fazla hareket türünü yapabilir; bileşik hareket, F1'deki niteliklerle türlerine ayrılır.
- **Anlatılacaklar:**
  1. Bisiklet: bisikletlinin hareketi temelde ötelemedir; tekerlek aynı anda hem döner hem ötelenir (kitap s. 114).
  2. Ayrıştırma yöntemi: cismin hangi parçası, neye göre, nasıl hareket ediyor.
  3. Üç ikili: öteleme ve dönme (sürgülü dolap kapağının tekerleği), öteleme ve titreşim (zıplama çubuğuyla ilerleyen çocuk), dönme ve titreşim (atlıkarıncaya binen çocuk) (s. 115).
  4. Yeni örnekler türlerine göre sınıflandırılır ve kısa açıklamasıyla eşleştirilir.
- **Örnekler:** yolda giden bisikletin tekerleği (kitap s. 114); düz yolda giden aracın gövdesi ve tekerlekleri (s. 113); altı hareket: çekiçle çakılan çivi, vurulunca yuvarlanan top, tornavidayla sıkılan vida, tavan vantilatörü, salıncaktaki çocuk, ipi çekilen sabit makara (s. 115, 21. Alıştırma); dağ bisikleti süren Kemal: pedal ve tekerlek, bisikletin ilerlemesi, amortisör ve titreşen telefon (s. 113).
- **Hedeflenen yanılgılar:** (a) bir cisim tek bir hareket türü yapar; (b) tekerlek yalnızca döner; (c) bileşik hareket dördüncü bir türdür.
- **Anlama denetimi:** Dene: sekiz hareketin her biri için türleri işaretleme (birden fazla seçilebilir); ardından dört hareketi kısa açıklamasıyla eşleştirme. Çıkış: (1) "yuvarlanan top" hangi türleri yapar; (2) "tavan vantilatörü ile bisiklet tekerleğinin hareketi arasındaki fark nedir?" (yanılgı b).
- **Program dayanağı:** FİZ.9.2.7 uygulama: "Öğretmen, soru cevap tekniğini kullanarak öğrencilerin birden fazla hareket türünü aynı anda yapan cisimlere örnekler vermesini isteyebilir." Öğrenme kanıtı: "…sanal panoya ya da bülten panosuna hareket örnekleri ve kısa açıklamalar gibi yazılar yazmaları istenebilir."
- **Açılış sorusu:** Yolda giden bisikletin tekerleği dönüyor mu, ilerliyor mu?
- **Akılda kalıcı cümle:** Bir cisim aynı anda hem dönebilir hem ilerleyebilir.
- **Ölçek:** 5 sahne.

## 4. Müfredat denetimi

Programın her isteği bir satır. Bu dosyadaki her kısa ders tabloda en az bir kez geçer. Durum sütunu `KURALLAR.md` 2.2'ye göredir: **ders** (doğrudan anlatılır), **benzetim** (öğrenci seçer, ayırır, tahmin eder, sonucu görür), **site dışı** (sınıfta yapılır). Sahne numaraları bu tabloya işlenmedi: her dersin hangi isteği hangi sahnede karşıladığı, senaryo dosyalarında dersin sonundaki "Sayım ve kapsam" paragrafında yazılıdır ve dersler senaryodaki sahne sırasıyla yazılmıştır.

| Programın istediği | Kısa ders | Durum |
|---|---|---|
| Tema amacı: nicelikleri sınıflandırma | A2, B1, B2 | benzetim |
| Tema amacı: vektörlerde toplama işlemini farklı yöntemlerle gerçekleştirme | C4–C9 | benzetim |
| Tema amacı: temel düzeyde kuvvet kavramı ve doğadaki temel kuvvetlerin özellikleri | D1, D2 | ders |
| Tema amacı: hareketin temel kavramları ve hareket türlerinin temel nitelikleri | E1–E7, F1, F2 | ders |
| FİZ.9.2.1 a) temel ve türetilmiş niceliklerin niteliklerini tanımlama | A2 | ders |
| FİZ.9.2.1 b) nicelikleri niteliklerine göre ayrıştırma | A2 | benzetim |
| FİZ.9.2.1 c) nicelikleri niteliklerine göre gruplandırma | A2 | benzetim |
| FİZ.9.2.1 ç) nicelikleri temel ve türetilmiş olarak adlandırma | A2 | ders |
| FİZ.9.2.1 uygulama: SI birim sistemi hakkında bilgilendirme ve farkındalık | A1 | ders |
| FİZ.9.2.1 uygulama: nicelikleri ve birimlerini tabloda listeleme; SI ile eşleştirme | A1 | benzetim |
| FİZ.9.2.1 uygulama: düşün-eşleş-paylaş, vızıltı, grup tartışması | — | site dışı |
| Köprü kurma: günlük hayattaki nicelikler ve birimleri; sınıflandırmaya geçiş | A1 | ders |
| FİZ.9.2.2 a) skaler ve vektörel niceliklerin özelliklerini belirleme | B1 | ders |
| FİZ.9.2.2 b) benzerliklerini listeleme | B2 | ders |
| FİZ.9.2.2 c) farklılıklarını listeleme | B2 | ders |
| FİZ.9.2.2 uygulama: örnek metin ya da örnek olay üzerinden | B1, B2 | ders |
| Öğrenme kanıtı: nicelikleri temel–türetilmiş ve skaler–vektörel olarak sınıflandırma (yapılandırılmış grid) | A2, B2 | benzetim |
| FİZ.9.2.3 a) aynı doğrultudaki vektörlerin yön ve büyüklüklerini tanımlama | C1 | ders |
| FİZ.9.2.3 b) yön ve büyüklük verilerini toplayıp kaydetme | C1 | benzetim |
| FİZ.9.2.3 c) eşit vektör ve zıt vektöre ilişkin değerlendirme | C2 | ders |
| FİZ.9.2.3 c) gerçek sayıyla çarpılmış vektöre ilişkin değerlendirme | C3 | benzetim |
| FİZ.9.2.3 uygulama: kareli düzlemde eşit, zıt ve gerçek sayıyla çarpılmış vektör görselleri | C1, C2, C3 | ders |
| Öğrenme kanıtı: farklı vektörleri karşılaştırma (açık uçlu test); toplama ve gerçek sayıyla çarpma (çalışma yaprağı) | C2, C3, C9 (seçenekli ve eşleştirmeli olarak) | benzetim |
| FİZ.9.2.4 a) uç uca ekleme: inceleme ve örüntü bulma | C4, C5 | benzetim |
| FİZ.9.2.4 a) paralelkenar yöntemi: inceleme ve örüntü bulma | C6 | benzetim |
| FİZ.9.2.4 a) bileşenlerine ayırma: inceleme ve örüntü bulma | C7, C8 | benzetim |
| FİZ.9.2.4 b) yöntemlere ilişkin genelleme | C9 | ders |
| FİZ.9.2.4 uygulama: aynı doğrultudaki iki vektörün toplanması; bir boyutta toplama | C4 | benzetim |
| FİZ.9.2.4 uygulama: farklı doğrultulardaki iki vektörün toplanması; iki boyutta toplama | C5, C6, C8 | benzetim |
| FİZ.9.2.4 uygulama: bileşke vektörlerin incelenmesi | C4, C5, C6, C8, C9 | ders |
| FİZ.9.2.4 uygulama: işlem basamaklarını ve sonuçları karşılaştırma; toplama işlemleri arasındaki ilişki | C9 | benzetim |
| FİZ.9.2.4 uygulama: simülasyon ve animasyon gibi dijital içerikler | C4–C9 | benzetim |
| FİZ.9.2.4 sınır: trigonometrik hesaplamalardan kaçınılır | C5–C9 (kareler sayılır) | ders |
| FİZ.9.2.4 sınır: bileşenlerine ayırmada dik kartezyen koordinat sistemi | C7, C8 | ders |
| FİZ.9.2.5 a) temel kuvvetlerin özelliklerini belirleme | D1 | ders |
| FİZ.9.2.5 b) benzerliklerini listeleme | D2 | ders |
| FİZ.9.2.5 c) farklılıklarını listeleme | D2 | ders |
| FİZ.9.2.5 uygulama: kuvvetin harekete etkilerinin hatırlatılması | D1 (tek sahne) | ders |
| FİZ.9.2.5 uygulama: temel kuvvetlerin etkilerini gösteren görseller | D1 | benzetim |
| FİZ.9.2.5 sınır: dört temel kuvvet matematiksel model kullanmadan karşılaştırılır | D1, D2 | ders |
| Öğrenme kanıtı: temel kuvvetlerin benzerlikleri ve farklılıkları (çıkış kartı) | D2 (çıkış soruları) | benzetim |
| FİZ.9.2.6 a) örnekleri gözlemleyerek görseller arasındaki benzerlikleri bulma | E1–E5 | benzetim |
| FİZ.9.2.6 b) kavramlara ilişkin genelleme yapma | E1–E5 (tanım), E6, E7 | ders |
| Kavram: referans noktası, konum | E1 | ders |
| Kavram: alınan yol, yer değiştirme | E2 | ders |
| Kavram: sürat, anlık sürat, ortalama sürat | E3 | ders |
| Kavram: hız, anlık hız, ortalama hız | E4 | ders |
| Kavram: ivme | E5 | ders |
| FİZ.9.2.6 uygulama: kavramları vektörel ve skaler niceliklerle ilişkilendirme | E1–E5, E6 (tablo) | ders |
| FİZ.9.2.6 uygulama: kavramlara ait matematiksel modeller | E2, E3, E4, E5 (yalnızca gösterilir) | ders |
| FİZ.9.2.6 uygulama: kavramlara ilişkin matematiksel işlemler | E2, E3, E4, E6 | benzetim |
| FİZ.9.2.6 uygulama: üç kavramı sürat cezaları ya da yeşil dalga ile ilişkilendiren, veri içeren senaryolar; verilerin kaydedilmesi | E7 (hazır senaryolar) | benzetim |
| FİZ.9.2.6 uygulama: öğrencilerin senaryoyu kendilerinin yazması, canlandırması; akran gözlemi; bilimsel tartışma | — | site dışı |
| FİZ.9.2.6 uygulama: sürat sınırlamalarına uymanın can güvenliği açısından önemi | E7 | ders |
| FİZ.9.2.6 uygulama: yeşil dalga sisteminin yakıt tasarrufu açısından önemi | E7 | ders |
| FİZ.9.2.6 uygulama: broşür ya da poster performans görevi; öz ve akran değerlendirme formları | — | site dışı |
| FİZ.9.2.6 sınır: grafiklerden kaçınılır | E1–E7 | ders |
| FİZ.9.2.6 sınır: ivmeli hareketle ilgili matematiksel işlemlerden kaçınılır | E5 | ders |
| FİZ.9.2.7 a) hareket türlerinin niteliklerini belirleme | F1 | ders |
| FİZ.9.2.7 b) ortak özelliklerine göre ayrıştırma | F1, F2 | benzetim |
| FİZ.9.2.7 c) ortak özelliklerine göre gruplandırma | F1 | benzetim |
| FİZ.9.2.7 ç) grupları adlandırma (öteleme, dönme, titreşim) | F1 | ders |
| FİZ.9.2.7 uygulama: birden fazla hareket türünü aynı anda yapan cisimler | F2 | ders |
| FİZ.9.2.7 uygulama: heterojen gruplar, grup içi tartışma | — | site dışı |
| FİZ.9.2.7 sınır: matematiksel modellerden kaçınılır | F1, F2 | ders |
| Öğrenme kanıtı: hareket örnekleri ve kısa açıklamalar (sanal pano ya da bülten panosu) | F2 (eşleştirme olarak); pano | benzetim; pano site dışı |
| İçerik çerçevesi: Temel ve Türetilmiş Nicelikler | A1, A2 | ders |
| İçerik çerçevesi: Skaler ve Vektörel Nicelikler | B1, B2 | ders |
| İçerik çerçevesi: Vektörler | C1–C9 | ders |
| İçerik çerçevesi: Doğadaki Temel Kuvvetler | D1, D2 | ders |
| İçerik çerçevesi: Hareket ve Hareket Türleri | E1–E7, F1, F2 | ders |
| Anahtar kavramlar: temel nicelik, türetilmiş nicelik | A2 | ders |
| Anahtar kavramlar: skaler nicelik, vektörel nicelik | B1, B2 | ders |
| Anahtar kavram: bileşke vektör | C4 (tanım), C5, C6, C8, C9 | ders |
| Anahtar kavram: kuvvet | D1 | ders |
| Anahtar kavramlar: referans noktası, konum, alınan yol, yer değiştirme | E1, E2 | ders |
| Anahtar kavramlar: sürat, anlık sürat, ortalama sürat, hız, anlık hız, ortalama hız, ivme | E3, E4, E5 | ders |
| Anahtar kavramlar: öteleme hareketi, dönme hareketi, titreşim hareketi | F1 | ders |
| Temel kabuller: kuvvet, hareket, sürat, hız, alınan yol kavramları ve birimleri | Ayrı ders yok; A1, D1, E2, E3, E4 açılışlarında hatırlatma | ders |
| Ön değerlendirme: kelime ilişkilendirme testi; sembol–birim eşleştirmesi | Eşleştirme A1'de; test yok | benzetim; test site dışı |

## 5. Bilerek alınmayanlar

**Ön bilgi sayılanlar (ayrı ders yok):**

- Fen bilimleri ve matematik derslerinden kuvvet, hareket, sürat, hız ve alınan yol kavramları ile birimleri. Yeniden anlatılmaz; ilgili dersin açılışında iki üç cümleyle hatırlatılır (A1, D1, E2, E3, E4).
- Kuvvetin harekete etkileri: program "hatırlattıktan sonra" diyor; D1'in ilk sahnesi, ayrı ders değil.
- Öteki derslerde kullanılan fiziksel nicelikler ve birimleri: A1'deki listenin malzemesi.
- Dik üçgende hipotenüs (matematik): yalnızca E6'daki tek çözülmüş örnekte.

**Programın koyduğu sınırlar (geçilmez):**

- "Trigonometrik hesaplamalardan kaçınılır." Sinüs, kosinüs, açı hesabı yok; bileşke kareli düzlemde bileşenleriyle okunur.
- "Bileşenlerine ayırma işleminde dik kartezyen koordinat sistemi ile sınırlı kalınır." Eğik eksen, eğik düzlem yok.
- "…doğadaki dört temel kuvveti matematiksel model kullanmadan karşılaştırır." Kuvvet formülü, sayısal şiddet oranı yok.
- "Hareketin temel kavramlarına yönelik grafiklerden ve ivmeli hareket ile ilgili matematiksel işlemlerden kaçınılır." Konum–zaman, hız–zaman, ivme–zaman grafiği yok; ivmeli hareket hesabı yok.
- "Matematiksel modellerden kaçınılır." (hareket türleri) Açısal hız, periyot, frekans yok.

**Zenginleştirme (derslere girmez):**

- Gerçek sayıyla çarpılmış vektörlerin toplanması (2A + B gibi). Kitapta örneği var (s. 82, 14. Alıştırma); alınmadı.
- Drama senaryolarına üçten fazla kavram katma.
- Sürat göstergesini hız göstergesine dönüştüren teknolojik model önerisi.

**Destekleme:** "Bileşke vektörün bulunmasında iki vektörün toplanması ile sınırlı kalınabilir." Program zaten "iki vektörün toplanması" diyor; dersler iki vektörle sınırlıdır.

**Ders kitabında olup programda olmayanlar (alınmadı; `ISLEME.md` 3. adım, 2. kural):**

- Üç ve daha çok vektörün toplanması (s. 75–76, 78–79).
- Vektörlerde çıkarma: K − L (s. 81–82).
- TÜBİTAK Ulusal Metroloji Enstitüsü bilgi kutusu (s. 54), vektörlerin tarihi (s. 64), Arşimet ve Aristo girişi (s. 86), Muhammed Abdüsselam okuma parçası (s. 91), nükleer santrallerin çalışma prensibi (s. 90; yalnızca "çekirdek parçalanması" örneği kalır).
- Üç boyutlu koordinat sistemi, z ekseni (s. 80).

**Programın sınıf içi etkinlikleri (siteye taşınmaz; bölüm 4'te `site dışı`):** soru cevap, düşün-eşleş-paylaş, vızıltı, grup tartışması, iş birlikli öğrenme; drama, rol oynama, canlandırma, akran gözlemi; poster ya da broşür; öz ve akran değerlendirme formları, gözlem formu; sanal pano ya da bülten panosu; kelime ilişkilendirme testi. Yapılandırılmış grid, çalışma yaprağı ve çıkış kartındaki sınıflandırma, eşleştirme ve doğru–yanlış soruları derslerin "dene" adımında ve çıkış sorularında etkileşimli olarak yaşar.

**Bu konularda geleneksel olarak anlatılan ama programda olmayan başlıklar** (kullanıcı isterse eklesin):

1. Birim dönüştürme, ön ekler (kilo, mili…), bilimsel gösterim, boyut analizi.
2. Ölçme, ölçmede hata, anlamlı rakamlar.
3. Vektörlerde çıkarma; üç ve daha çok vektörün toplanması; çokgen yöntemi.
4. Bileşke büyüklüğünün Pisagor bağıntısı ya da kosinüs teoremiyle hesaplanması; iki vektör arasındaki açıya göre bileşkenin en büyük ve en küçük değeri.
5. Açı verilen vektörlerin sinüs ve kosinüsle bileşenlerine ayrılması; eğik düzlemde bileşenler.
6. Temas gerektiren ve gerektirmeyen kuvvetler; sürtünme, normal kuvvet, gerilme; serbest cisim diyagramı; dengelenmiş ve dengelenmemiş kuvvetler.
7. Newton'ın hareket yasaları (bu temanın çıktıları arasında yok).
8. Temel kuvvetlerin formülleri, taşıyıcı parçacıkları, sayısal şiddet oranları.
9. Konum–zaman, hız–zaman, ivme–zaman grafikleri; grafikten eğim ve alan okuma.
10. Düzgün doğrusal hareket ve sabit ivmeli hareket problemleri; hareket denklemleri; serbest düşme.
11. Bağıl hız, nehir problemleri.
12. Açısal hız, periyot, frekans; basit harmonik hareket.

## 6. Açık sorular

İlk taslaktaki 15 sorunun hepsi kapandı; kararlar bölüm 7'de. Kullanıcının onayını bekleyen üç karar (1, 10 ve 22) ile doğrulanamayan bilgiler bölüm 8'de.

## 6b. Ders kitabından alınan içerik

Kaynak: MEB 9. Sınıf Fizik Ders Kitabı, 2. Ünite (s. 50–129); PDF 7 Ekim 2026'da <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi> sayfasından alındı. Aşağıdakiler dışında kitaptan bilgi kullanılmaz; hiçbir tanım, sembol, sayı ya da sınıflandırma hafızadan yazılmadı. Kitap proje klasörüne konmadı. Metin sayfalardan çıkarıldı; görseldeki düzenler (kareli düzlemler, krokiler, göstergeler) senaryo yazılırken sayfa görüntüsünden alınır.

| Ders | Sayfa | Alınan |
|---|---|---|
| A1 | 53 | Nicelik, sembol, birim, birim sembolü listesi: hacim, zaman, kuvvet, yoğunluk, kütle, sürat, hız, alan, uzunluk |
| A1 | 54 | Ölçme ve standart (8 kg'lık karpuz); ortak birim sistemi ihtiyacı; SI'nın adı, 1960 Paris "Ağırlıklar ve Ölçümler Konferansı"; uzunluk m, kütle kg, zaman s |
| A1, A2 | 55 | Tablo 2.1: yedi temel nicelik, SI birimleri, birim sembolleri, ölçüm aletleri |
| A2 | 56 | Birimle doğrudan ilişkili nicelikler tablosu: ivme, uzunluk, basınç, ağırlık, kütle; gruplanacak nicelikler: sıcaklık, hız, zaman, kuvvet, yoğunluk, elektrik akımı, kütle |
| A2 | 57 | Temel ve türetilmiş nicelik tanımları; Tablo 2.2 (alan, sürat, kuvvet, enerji, basınç, elektrik yükü); güç birimi örneği |
| A1, B2 | 58 | Otobüs duyurusu (1.100 km, 16 saat, 100 km/h, 15 m, 21 °C); ölçüm aletleri tablosu |
| A2 | 59 | Kontrol Noktası: temel ve türetilmiş nicelik listesi |
| B1 | 59–61 | Doğa yürüyüşü; ısıtıcıdaki su; iki araç; 30 N ve 40 N; pazar örneği; kanepe örneği; skaler ve vektörel nicelik tanımları |
| B1, B2 | 62–63 | Üç cümlelik örnek; resmî açıklamalar metni; iki sınıflandırmanın tablosu; Kontrol Noktası listesi |
| B1 | 117 | Gözü kapalı öğrenci ve çanta |
| C1 | 64–65 | Vektörün gösterimi, yön, büyüklük; kareli düzlemde yön ve büyüklük tablosu |
| C2, C3 | 68–71 | Eşit vektör, zıt vektör, gerçek sayıyla çarpma tanımları ve gösterimleri; çözülmüş örnek; koli ve kulvar alıştırmaları; beş durumlu Kontrol Noktası |
| C4, C5 | 72 | Aynı tür niceliklerin toplanması; uçak ve rüzgâr; bileşke vektör tanımı |
| C4 | 61, 122 | Kanepe; rafting botu |
| C5 | 75–76 | Uç uca ekleme basamakları; değişme özelliği |
| C6 | 76–78 | Paralelkenar yöntemi basamakları; çözülmüş örnek; kanca alıştırması |
| C7 | 79–80, 82 | Bileşen tanımı; dik kartezyen koordinat sistemi; basamaklar; çözülmüş örnek; ev–okul alıştırması |
| C8 | 81 | Bileşenlerine ayırarak toplama basamakları |
| C9 | 72–74, 83–85 | 4. Etkinlik'in karşılaştırma soruları; doğru–yanlış ifadeleri; eşleştirme; yöntemlerin Kontrol Noktası özeti |
| D1 | 86–91 | Kuvvet tanımı; dört temel kuvvetin adları, tanımları, etki mesafeleri, örnek olayları; örnek ve alıştırmadaki olaylar; Kontrol Noktası |
| D2 | 86, 88, 124 | Makro ve mikro düzey; beş özellikli karşılaştırma tablosu; demir çekirdeği |
| D1 | 123 | Adadaki dört gözlem |
| E1 | 92–93, 105, 111, 120 | Krokiler; referans noktası ve konum tanımları; konum vektörü; A(4, 2); "hareket ediyor" tanımı; referans noktası değiştirme sorusu |
| E2 | 94–95, 102, 105–106, 108, 118 | Krokiler; alınan yol ve yer değiştirme tanımları; Δx modeli; Ece, Kutay; kara yolu ve kuş uçuşu tablosu |
| E3 | 95–97, 106 | Sürat, ortalama sürat, anlık sürat tanımları ve modelleri; iki araç; dört otoyol; üç gösterge |
| E4 | 97–99, 106–107 | Hız, ortalama hız, anlık hız tanımları ve modelleri; iki sporcu; Öykü ve Yusufhan; anlık hız tablosu |
| E5 | 99–100, 107, 110 | İvme tanımı ve modeli; K ve L araçları; hız ve ivmenin yönü |
| E6 | 108–111, 120–121 | Emine örneği; 18 ve 19. Alıştırma; Kontrol Noktası (on bir kavram, skaler ve vektörel); A–B–C–D aracı |
| E7 | 58, 92, 100–101 | Sürat sınırı değeri (100 km/h); etkinliğin B bölümü (senaryo, veri kaydı, skaler–vektörel tablosu, can güvenliği ve yakıt tasarrufu tartışması) |
| F1 | 111–114, 116 | Altı hareket ve açıklamaları; öteleme, dönme, titreşim tanımları ve örnekleri; Kontrol Noktası |
| F2 | 113–115 | Bisiklet; üç ikili örnek; 21. Alıştırma; Kemal |

## 7. Kararlar

7 Ekim 2026. Kural sütunundaki numaralar `../../ISLEME.md` 3. adımdaki kurallardır; "kullanıcı" kullanıcının bu temaya özgü isteğidir.

| # | Soru | Karar | Kural |
|---|---|---|---|
| 1 | Ders sayısı | 24 kısa ders. İlk taslaktaki birleştirmeler uygulanmadı; iki fikir taşıyan dört ders ayrıldı (B2, C4, C8, E6). Saat başına 1,00; 0,85 sınırı kullanıcının "en kapsamlı" isteğiyle aşıldı. Kullanıcı onayladı (7 Ekim 2026). | kullanıcı; 5 (iki fikir ayrılır) |
| 2 | Hangi nicelikler, hangi temel nicelikler | Kitabın listeleri: s. 53, 55, 57, 59. Yedi temel nicelik tam liste olarak verilir (Tablo 2.1). "Temel"in niteliği s. 57'deki tanımdır. | 4 |
| 3 | Dört temel kuvvetin adları ve özellikleri | Adlar ve özellikler s. 86–91'den. Karşılaştırma ölçütleri yalnızca kitapta yazanlar: neyle ilgili, ne yapar, nerede etkili, etki mesafesi. Şiddet için yalnızca "güçlü nükleer kuvvet en güçlü kuvvettir" (s. 86); sayısal oran ve sıralama yok. | 3, 4 |
| 4 | "Bileşenlerine ayırma" toplama yöntemi mi | İkisi de. Kitap önce tek vektörü bileşenlerine ayırıyor (s. 79–80), sonra bileşenleriyle topluyor (s. 81). C7 birincisi, C8 ikincisi; C9 üç yolu karşılaştırır. | 4 |
| 5 | Bileşkenin büyüklüğü | Aynı doğrultuda sayıyla verilir (s. 61). Farklı doğrultuda bileşke çizimle ve bileşenleriyle verilir ("3 sağ, 4 yukarı"); köşegen uzunluğu C'de hesaplanmaz. | 2, 3 |
| 6 | Gerçek sayıyla çarpmanın kapsamı | Kitabın beş durumu (s. 71): 1'den büyük, 0–1 arası, −1–0 arası, −1, −1'den küçük. Kesirli çarpan var. Sıfırla çarpma kitapta yok; alınmadı. | 4, 2 |
| 7 | Matematiksel modellerin kapsamı (E) | Yer değiştirme, sürat, ortalama sürat, hız, ortalama hız için model ve işlem (s. 106–107). Anlık sürat ve anlık hız için yalnızca tanım. İvmenin modeli gösterilir ve kitabın verdiği iki değer okunur (s. 99–100, 107); öğrenciden ivme hesabı, ivmeden yol ya da süre hesabı istenmez. Hareket tek doğrultudadır; iki boyutlu tek hesap E6'daki çözülmüş örnektir. | 3, 4 |
| 8 | Anlık sürat ve anlık hız, grafik olmadan | Kitabın tanımları: anlık sürat göstergede okunan değerdir; anlık hız göstergedeki değer ile hareket yönüdür (s. 106–107). | 4 |
| 9 | Drama etkinliği | Site dışı. E7 iki hazır senaryo verir; öğrenci veriyi kaydeder, kavramları uygular (benzetim). | 4b |
| 10 | Yeşil dalga ve sürat cezası içeriği | İki senaryo da kurgudur ve "örnek veri" olarak sunulur. Sürat sınırı değeri kitaptaki cümleden (s. 58: otoyolda 100 km/h). Yeşil dalganın işleyişi tek cümleyle tarif edilir; kaynağı doğrulanamadı (bölüm 8). Kullanıcı onayladı (7 Ekim 2026). | 4; `KURALLAR.md` 2.3 |
| 11 | Hareket türlerinin nitelikleri | Kitabın tanımları (s. 114, 116). "Eksen" ve "denge konumu" terimleri kitapta geçiyor; kullanılır. | 4 |
| 12 | "Doğrultu" ve "yön" ayrımı | C1'de bir sahne. Kitap doğrultuyu tanımlamıyor, vektörü bir doğru üzerinde çiziyor (s. 64, Görsel 2.3); ders "okun üzerinde durduğu doğru" der ve iki yönü gösterir. | 4, 7 |
| 13 | Formülsüz derste defter kuralı | `KURALLAR.md` 3.2 madde 4 karşılıyor: cümle ve tek örnek ya da en çok dört satırlık tablo. | — |
| 14 | Saat dağılımı | A 2, B 2, C 9, D 2, E 7, F 2. Ağırlık programın iki akıl yürütme çıktısında (9.2.4 ve 9.2.6). | — |
| 15 | Zenginleştirmedeki yıldız | Planı etkilemiyor. | — |
| 16 | Açılış biçimi | Bütün dersler "öğret" açılışıyla başlar; ilk sorudan önce en az 5, her sorudan önce en az 3 anlatım cümlesi. | kullanıcı (7 Ekim 2026, kimya A1 onayı; `KURALLAR.md` 3.1) |
| 17 | Vektör çıkarma, üç ve daha çok vektör, 2A + B | Alınmadı. Program "iki vektörün toplanması" diyor; üçüncüsü zenginleştirme. | 2 |
| 18 | Birim dönüştürme | Alınmadı. Gündelik birim ile SI birimi eşleştirilir (s. 55, 3. basamak), hesap yapılmaz; her örnek tek birimle yürür. | 2 |
| 19 | Kitaptaki bilgi kutuları ve okuma parçaları | Alınmadı (bölüm 5). | 2 |
| 20 | Resim | Gerekmiyor; bütün görseller vektör. Program D1 için "animasyon, video ya da fotoğraf gibi içeriklerden biri" diyor; animasyon seçildi. `GORSELLER.md` açılmaz. | 7; `KURALLAR.md` 5.1 |
| 21 | Hikâye "İki kamera arası" | E3 kodu korunur; derse bağlama ayrı iştir. E7'nin sürat sınırı senaryosu hikâyeyi tekrar etmez (ayrı bir yol ve ayrı sayılar). | — |
| 22 | Dik üçgenle yer değiştirme | E6'da tek çözülmüş örnek (kitap s. 108–109: 80 m, 60 m, 100 m); öğrenciden bu hesap istenmez, çıkış sorularına girmez. C'de kullanılmaz. Program bağıntıyı anmıyor; dayanak "matematiksel işlemler yapar" cümlesi ve kitabın örneği. Kullanıcı onayladı (7 Ekim 2026). | 4 |
| 23 | Tablolu sahnelerde 25 kelime sınırı | Sınır cümle ve etiket için geçerli kalır. Satırları yan yana görmek için kurulan, sayı ve kısa etiketten oluşan tablolarda aşım kabul edilir; tablo bütün satırlarıyla birlikte görünür. Bu temada: C1 S5, C2 S2 ve S4, C9 S4 ve S6, D2 S2, S3 ve S6, E7 S4, S5 ve S7. Öteki ölçüm sayaçları bu sahnelerde de sıfır kalır. Aşımlar `DURUM.md` içinde yazılı. Kullanıcı kararı (8 Ekim 2026); aynı gün `KURALLAR.md` bölüm 4'e ortak kural olarak eklendi. `araclar/olc.js` değiştirilmedi: araç bu sahneleri yine aşım olarak raporlar. | kullanıcı; `ISLEME.md` 6. adım, 3. madde (aşım `DURUM.md` notuna yazılır) |

## 8. Doğrulanamayanlar

| Konu | Durum | Nereye bakıldı |
|---|---|---|
| Yeşil dalganın işleyişi (ışıkların belirli bir sabit sürate göre eş zamanlanması) | Doğrulanamadı. Program ve kitap yalnızca adını ve yakıt tasarrufuyla ilişkisini veriyor. | Ders kitabı s. 92, 100–101; web araması (7 Ekim 2026): çıkanlar haber siteleri (karar.com, haberler.com, ensonhaber.com), resmî bir kurum sayfası bulunamadı |
| İki nokta arasında ortalama sürat denetimi | E7'de kullanılmıyor; E3 hikâyesinde kullanıldı ve orada da resmî kaynaktan doğrulanmadı (`../HIKAYE-ANIMASYONLARI.md`). | — |
| Dört otoyol örneğindeki gösterge değerleri (s. 96) | Çözüldü (senaryo aşamasında). İbreler ara çizgilerde: 50, 70, 90, 110 km/h. Kitabın süreleriyle (0,5 h, 1,5 h, 3 h, 1 h) 25 + 105 + 270 + 110 = 510 km ve 510 / 6 = 85 km/h ediyor; kitabın verdiği sonuçla aynı. E3 bu değerleri kullanır. | Sayfa görüntüsü, 220 dpi |
| Kitabın cevap anahtarı | Alınmadı (karekodla veriliyor). Sınıflandırma sorularının cevapları (s. 88 tablosu, 21. Alıştırma, s. 123) kitabın tanım cümlelerinden çıkarıldı. | s. 269 |
| A–B–C–D aracının konumları (s. 120) | Çözüldü: A 0, B 45 m, C 105 m, D 180 m; yol batı–doğu. E1 ve E6 kullanır. | Sayfa görüntüsü |
| Temel niceliklerin sembolleri (s. 55) | Çözüldü: ℓ, m, t, i, T, I, n. Derste nicelik sembolleri verilmiyor; yalnızca birim ve birim sembolü (A2 senaryosu). | Sayfa görüntüsü |
| "Atom çekirdeğinin parçalanmasında zayıf nükleer kuvvet etkilidir" (s. 87, 90) | Kitabın cümlesi; D1 sahne 6 ve "uranyum çekirdeğinin parçalanması" kartı buna dayanıyor. Fizik olarak tartışmalı bir ifade (kullanıcı isterse kart ve soru çıkarılır); kitaptan ayrılmamak için bırakıldı. | Ders kitabı s. 87, 90, 91 |
| s. 88 karşılaştırma tablosunun cevapları | Cevap anahtarı yok; tanım cümlelerinden çıkarıldı. "Çekirdeğin yapısında bir değişime neden olur" satırı senaryoda yalnızca zayıf nükleer kuvvete bağlandı; kitap s. 89'da hidrojenin helyuma dönüşmesini güçlü nükleer kuvvete bağladığı için anahtar onu da işaretliyor olabilir. | Ders kitabı s. 87–90 |
| s. 92–93 krokilerindeki gerçek yerler | Kullanılmadı. Yön ve uzaklıklar görselden okunuyor ama krokiler şematik; gerçek coğrafyayla örtüştüğü doğrulanamadı. E1 iki kurgusal kroki kullanır (okul çevresi, çarşı). | Sayfa görüntüsü |
| E7'de "her ışık 10 saniye yeşil kalıyor" | Kurgusal caddenin örnek verisi; onaylanan tek cümlelik tarifin ötesinde bir ayrıntı. "Çok yavaş giden de yeşile yetişemez" maddesi için gerekli; istenmezse o madde ve üç cümle çıkar. | — |

## 9. Sıradaki adımlar

`ISLEME.md` adımlarına göre 1 (müfredat), 2 (plan), 2b (ders kitabı), 3 (kararlar) ve 4 (senaryolar) bitti; durum `DURUM.md` dosyasında.

1. Kullanıcı planı onayladı (karar 1, 10 ve 22; 7 Ekim 2026).
2. Senaryolar (4. adım) yazıldı: `senaryolar/` altında konu başına bir dosya; dersler 40–78 anlatım cümlesi tuttu (bölüm 2b'deki 30–60 beklentisinin üstünde; tavan değildi).
3. İskelet (5. adım) kuruldu: tema sayfası, `tema.js`, `dersler/kit.js`.
4. Kısa dersler (6. adım) yazıldı: A1 ana oturumda, kalan 23 ders dokuz alt ajanda; her ders `olc.js` ile ölçüldü.
5. Denetim (7. adım): `denetle.js` temiz; tema sayfasına bakıldı. Kullanıcının izleyip karar vereceği noktalar `DURUM.md` içinde.

Yayın, seslendirme ve hikâyenin derse bağlanması işleme almanın dışındadır.
