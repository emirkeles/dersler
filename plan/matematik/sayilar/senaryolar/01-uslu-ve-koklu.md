# 9. Sınıf Matematik – 1. Sayılar: Üslü ve Köklü Gösterimlerle İşlemler
## Etkileşimli Ders Senaryosu (web animasyonu için)

---

## 1. KÜNYE

| Alan | İçerik |
|---|---|
| **Ders adı** | Üslü ve Köklü Gösterimlerle İşlemler – "Viral Videoyu Geri Sarmak" |
| **Sınıf / Tema** | 9. sınıf, Matematik, 1. Sayılar |
| **Süre** | Anlatım + animasyon ≈ 11,5 dk (695 sn). Tahmin/sürükle-bırak etkileşimleri ve kapanış sınavı dâhil **yaklaşık 12–14 dk** |
| **Sahne sayısı** | 13 sahne + kapanış (mini sınav ve özet) |
| **Bağlam hikâyesi** | Bir video, her izleyicinin 2 kişiye yollamasıyla yayılıyor: 10 turda 2¹⁰ = 1024 kişi. Köklü sayılar ise videoyu **geri sarmak**: "Yolculuğun tam ortasında kaç kişi vardı?" |

**Kazanımlar (öğrenci ders sonunda şunları yapabilir):**

1. **K1 – Üs yasaları:** Tekrarlı çarpımı üslü gösterimle yazar (2·2·2 = 2³ = 8; 2³ ≠ 6); aᵐ·aⁿ, aᵐ/aⁿ, (aᵐ)ⁿ ve (a·b)ⁿ kurallarını "kaç tane a yan yana?" gerekçesiyle açıklar ve en az üç ifadeyi hatasız sadeleştirir.
2. **K2 – Sıfır ve negatif üs:** a⁰ = 1 (a ≠ 0) ve a⁻ⁿ = 1/aⁿ eşitliklerini, "bir tur geri sar = 2'ye böl" örüntüsünden ve bölüm kuralından gerekçelendirir; 2⁻³ = 1/8 gibi değerleri bulur (−8 değildir).
3. **K3 – Kök = kesirli üs:** √a = a^(1/2) ilişkisini "kendisiyle çarpılınca a veren üs" mantığıyla türetir; √16, √1024 gibi değerleri üslü yazıp hesaplar.
4. **K4 – Köklü işlemler:** √a·√b = √(ab) ve √a/√b = √(a/b) kurallarını kullanır; √72 = 6√2 gibi sadeleştirir; benzer köklü terimleri toplar/çıkarır (√8 + √18 = 5√2).
5. **K5 – Paydayı rasyonel yapma:** Paydası tek terimli köklü ifadeyi rasyonel yapar (6/√3 = 2√3; 1/√2 = √2/2).
6. **K6 – Tuzak:** √(a+b) ≠ √a + √b olduğunu √(9+16) = 5 ≠ 7 = √9 + √16 karşı örneğiyle gösterir ve kuralın neden yalnızca çarpma/bölmede geçerli olduğunu açıklar.

**Ön bilgi:** Doğal sayılarla çarpma-bölme; kesirler ve kesirle bölme; tam kare sayılar (1, 4, 9, …, 225); asal çarpanlara ayırma; karenin alanı ve kenar uzunluğu ilişkisi; tam sayılar. (Pisagor yalnızca Sahne 12'de görsel destek olarak, formül kullanılmadan geçer.)

---

## 2. ANA FİKİR VE KAVRAM HARİTASI

**Ana fikir (tek cümle):** Üs, "kaç kez çarpıldığını" sayan bir sayaçtır; çarpma bu sayaçları toplar, bölme çıkarır, üssün üssü çarpar, geri sarma sıfıra ve negatife götürür, köklü sayı ise sayacı **yarıya bölmektir** (√a = a^(1/2)) – bu yüzden kural ezber değil, aynı fikrin farklı yüzleridir.

**Kavram haritası (okla bağlanan fikirler):**

```
 Tekrarlı çarpma (2·2·2)                      [S1-S2]
        │  "kaç tane çarpan?" = ÜS
        ▼
 aⁿ  (taban, üs)  ───────────────┐
        │                         │
        ├─ yan yana yaz  → aᵐ·aⁿ = aᵐ⁺ⁿ          [S3]  ("toplam kaç tane a?")
        ├─ ortak olanları götür → aᵐ/aⁿ = aᵐ⁻ⁿ   [S4]  ("eşleşenler yok olur")
        ├─ grup grup tekrar → (aᵐ)ⁿ = aᵐ·ⁿ       [S5]  ("satır × sütun")
        └─ çarpım parantezde → (ab)ⁿ = aⁿbⁿ      [S5]  ("her çarpan n kez")
                      │
                      ▼
 Bölüm kuralını sonuna kadar götür / geri sar
        ├─ aᵐ/aᵐ = 1 → a⁰ = 1                    [S6]
        └─ üssü 0'ın ötesine sar → a⁻ⁿ = 1/aⁿ    [S6]
                      │
                      ▼
 Kök = yolculuğun ORTASI                          [S8]
   (kendisiyle çarpılınca a veren sayı)
        │  aˣ·aˣ = a¹  ⇒  2x = 1  ⇒  x = 1/2
        ▼
 √a = a^(1/2)                                     [S9]
        │  (ab)^(1/2) = a^(1/2)·b^(1/2)  [S5'ten]
        ▼
 √a·√b = √(ab), √a/√b = √(a/b)                   [S10]
        ├─ sadeleştirme: √72 = 6√2               [S10]
        ├─ benzer kökleri topla: 3√2+5√2 = 8√2   [S11]
        └─ paydayı rasyonel yap: 6/√3 = 2√3      [S11]
                      │
                      ▼
 Sınır çizgisi: kural ÇARPIMA uyar, TOPLAMA uymaz
 √(a+b) ≠ √a+√b                                   [S12]
                      │
                      ▼
 Sentez: viral videoyu geri sar                   [S13]
```

---

## 3. YANLIŞ KAVRAMALAR LİSTESİ ve ÇÜRÜTÜLDÜĞÜ SAHNE

| # | Tipik hata | Neden yapılır | Çürütüldüğü sahne |
|---|---|---|---|
| Y1 | 2³ = 2·3 = 6 | Üssü çarpan sanmak | S2 (3 tane 2 yan yana = 8) |
| Y2 | 2³·2⁴ = 2¹² (üsleri çarpmak) | "Çarpma var, çarpayım" | S3 (7 tane 2 sayılır) |
| Y3 | 2³·2⁴ = 4⁷ (tabanları çarpmak) | Tabanı da işleme sokmak | S3 (taban 2 kalır, yalnızca sayaç artar) |
| Y4 | 2³ + 2⁴ = 2⁷ (toplamada üs toplamak) | Kuralı genellemek | S3 (8+16 = 24 ≠ 128), S7 |
| Y5 | 5⁶/5² = 5³ (üsleri bölmek) veya 1⁴ (tabanları bölmek) | Bölmeyi her şeye uygulamak | S4 |
| Y6 | (2³)² = 2⁵ (üssün üssünde toplamak) | Çarpım kuralıyla karıştırmak | S5 (2 satır × 3 sütun = 6) |
| Y7 | (2·3)² = 2·3² = 18 | Üssün yalnızca sonuncuya ait sanılması | S5 |
| Y8 | a⁰ = 0 | "Hiç çarpan yok, o hâlde sıfır" | S6 (2³/2³ = 1; geri sarma örüntüsü) |
| Y9 | 2⁻³ = −8 veya −6 | Eksi işaretini sonuca taşımak | S6 (1/8) |
| Y10 | √16 = 8 (kök = yarısı) / a^(1/2) = a/2 | "1/2" ile "yarısı"nı karıştırmak | S8–S9 (8·8 = 64 ≠ 16) |
| Y11 | √72 = 36√2 (dışarı çıkarırken kök almamak) veya √72 = 36 | Sadeleştirme mantığını kavramamak | S10 (çiftler dışarı çıkar, tek kalır) |
| Y12 | 3√2 = √6 (dışarıdaki sayıyı çarpıp içeri atmak) | "Çarp ve yaz" refleksi | S10 (3√2 = √(3²·2) = √18) |
| Y13 | √2 + √8 = √10 ; √a+√b = √(a+b) | Toplamayı kök içinde yapmak | S11, S12 |
| Y14 | 6/√3 = 6√3 (yalnızca paya √3 ile çarpmak) | "1 ile çarpmak" fikrini kaçırmak | S11 |
| Y15 | **√(a+b) = √a + √b** (ana tuzak) | Kökü "dağıtılan bir işlem" sanmak | **S12** (√(9+16) = 5 ≠ 7) |
| Y16 | (a+b)ⁿ = aⁿ + bⁿ (aynı kökenli hata) | Dağılma ile karıştırmak | S12 (yan not: (3+4)² = 49 ≠ 3²+4² = 25) |

---

## 4. SAHNELER

### Ortak yerleşim ve renk anahtarı (tüm sahneler için geçerli)

- **Tuval:** 1280 × 720 px, 16:9. Orijin (0,0) sol üst. Tüm koordinatlar bu tuvale göredir.
- **Üst şerit:** y 20–64. Solda sahne başlığı (x=40), sağda 13 noktalı ilerleme göstergesi (x 900–1240; aktif nokta dolu).
- **Sahne alanı:** (40, 90) – (1240, 470).
- **Altyazı bandı:** (40, 480) – (1090, 540). Anlatım metni burada, cümle cümle belirir.
- **"Devam →" düğmesi:** 120×44 px, sağ alt (1120, 488). Etkileşimsiz sahnelerde anlatım bitince 0,4 sn'de belirir; 10 sn bekleyince hafifçe nabız atar. Sahne otomatik geçmez.
- **Kural kutusu (ekran notu):** (40, 556) – (1240, 690), köşe yarıçapı 16, PANEL zemin, 1,5 px kenar çizgisi. Sahne sonunda aşağıdan 24 px yükselerek (0,5 sn, ease-out) belirir ve **sahne boyunca kalır**; sonraki sahnede kutuya yeni satır eklenir, eskiler küçülüp üstte birikir ("kural defteri").

**Renk anahtarı (renklerin anlamı ders boyunca SABİTTİR):**

| Ad | Hex | Anlamı |
|---|---|---|
| ZEMİN | #0F1420 | Arka plan |
| PANEL | #182033 | Kutular, kartlar |
| METİN | #E8ECF4 | Ana yazı |
| SOLUK | #8B95AB | İkincil yazı, ızgara |
| TABAN | #F2B134 (amber) | Taban ve "çarpan" blokları |
| ÜS | #4DD0E1 (camgöbeği) | Üs sayısı, sayaç, sayma etiketleri |
| SONUÇ | #6BE3A0 (yeşil) | Doğru sonuç, onay |
| UYARI | #FF7A70 (mercan) | Yanlış/tuzak, ≠ işareti |
| KÖK | #B69CFF (mor) | Kök sembolü, "yarı yol", geri sarma ikinci yarısı |
| GERİ | #FFA45C (turuncu) | "Geri sar" okları ve ⏪ simgesi |

**Standart nesneler:**
- **Blok:** 44×44 px yuvarlatılmış kare (r=8), TABAN dolgu, içinde ZEMİN renkli kalın "2" (veya ilgili taban). Bloklar arası boşluk 8 px. "Bir blok = bir çarpan".
- **Kişi düğümü:** r=10 daire; TABAN dolgu. Ağaç çizgileri SOLUK, 2 px.
- **Süre damgası:** Her sahne başında başlık 0,4 sn'de soldan kayarak girer.
- **Geri bildirim:** Doğru cevapta seçilen şık SONUÇ rengine döner, ✓ çıkar, altında SONUÇ renkli geri bildirim satırı belirir. Yanlış cevapta şık UYARI rengine döner, 2 kez 6 px titrer (0,3 sn) ve geri bildirim satırı belirir; **öğrenci doğru şıkkı bulana kadar yeniden deneyebilir** (yanlış şık soluklaşır, tekrar seçilemez). İki yanlıştan sonra "İpucu göster" düğmesi görünür.

---

### Sahne 1 – Bir Video, İki Kişi, Bir Ağaç
**Süre:** 45 sn | **Öğrenme amacı:** Tekrarlı iki katına çıkışın çok hızlı büyüdüğünü sezmek; üssün "tur sayısı" olarak ilk kez ortaya çıkması.

**Anlatım (altyazı/ses):**
- "Bir video düşün: izleyen herkes onu tam 2 kişiye yolluyor, o kişiler de 2'şer kişiye."
- "İlk turda 2, sonra 4, sonra 8… Peki 10. turda videoyu kaç kişi alır? Bir tahmin yürüt."
- "Bu derste tek bir fikrin peşine düşeceğiz: bu büyümeyi ve geriye sarmayı hangi sayılarla yazıyoruz?"

**Görsel & animasyon:**
1. [0–0,8 sn] Ekran ZEMİN. Ortada (640, 130) tek **kişi düğümü** ("Başlatan", etiket SOLUK, 14 px) beliriyor (ölçek 0→1, 0,3 sn). Üst sağda küçük telefon simgesi, "▶ Video" etiketi.
2. [1–6 sn] **Ağaç aşağı doğru büyür.** Düzey k'nin y koordinatı: y = 130 + 70·k. Düzey k'de 2ᵏ düğüm vardır; i. düğümün x değeri: x = 640 + (i − (2ᵏ − 1)/2) · (1000 / 2ᵏ), i = 0…2ᵏ−1. Sırasıyla k=1 (2 düğüm), k=2 (4), k=3 (8), k=4 (16) belirir; her düzey 0,8 sn: önce çizgiler üst düğümden iki alta uzar (0,3 sn), sonra düğümler zıplayarak (scale 0→1.15→1) açılır. Düzeyin sağında ÜS renkli etiket: "1. tur: 2", "2. tur: 4", "3. tur: 8", "4. tur: 16".
3. [7–9 sn] 4. düzeydeki 16 düğümün her birinin altına "…" ve yanıp sönen küçük "×2" rozeti çıkar; ağaç soluklaşıp ekranın dışına doğru devam ettiğini hissettirir (alt kenarda 120 px'lik ZEMİN'e doğru gradyan).
4. [9. sn] Sağ üstte **sayaç paneli** (900, 100) – (1230, 200): "Tur n = 0" ve altında "Videoyu alan kişi: 1".
5. [9. sn–] Sahne **tahmin** durumuna geçer (aşağıda).

**Etkileşim:**
- **Tahmin et (çoktan seçmeli, altyazı bandı yerinde):** "10. turda videoyu kaç kişi alır?"
  - A) 20 B) 100 **C) 1024** D) 2048
  - **A (20) seçilirse:** "Her turda 2 kişi eklenmiyor; sayı **2 katına** çıkıyor. 10 tur × 2 = 20 diyorsan toplama yapmışsın."
  - **B (100):** "Yaklaştın ama tahminle olmaz. Tabloyu kendin doldur, kaç çıkacağını görelim."
  - **D (2048):** "Çok yakın! Ama bir tur fazla saymışsın: 2048 = 11. turun değeri. Kaydırıcıdan bak."
  - **C (1024) seçilirse:** "Harika sezgi! Şimdi kendi gözünle doğrula." (Her durumda doğru şık bulununca kaydırıcı açılır.)
- **Kaydırıcı (n, 0–10):** Doğru cevaptan (veya iki yanlıştan) sonra sayaç panelinin altında yatay kaydırıcı açılır (x 920–1210, y 230). n değiştikçe ağaç n ≤ 4 için gerçekten o düzeye kadar görünür; n > 4 için ağaç 4. düzeyde kalır ve her yaprak düğümün altında ÜS renkli bir kutu "×2^(n−4)" yazar (örn. n=7 için "×8"). Sayaç canlı güncellenir: n=0→1, 1→2, 2→4, 3→8, 4→16, 5→32, 6→64, 7→128, 8→256, 9→512, **10→1024**. n=10'a ulaşılınca sayaç büyür (scale 1.3, 0,4 sn) ve konfeti yerine kısa bir SONUÇ renkli halka dalgası yayılır.
- **Devam** düğmesi kaydırıcı en az bir kez 10'a getirilince aktif olur.

**Ekran notu / kural kutusu:**
> Her turda sayı **2 katına** çıkar: 1 → 2 → 4 → 8 → … → **1024** (10. tur).
> Bunu kısaca nasıl yazarız? → Sonraki sahne.

---

### Sahne 2 – Üs: "Kaç Tane Çarpan?" Sayacı
**Süre:** 40 sn | **Öğrenme amacı:** Tekrarlı çarpımı üslü gösterimle yazmak; taban ve üssü ayırt etmek; 2³ ≠ 2·3 (Y1).

**Anlatım:**
- "10. turu yazmak için 10 tane 2'yi çarpmak gerekir. Çok uzun! Bunun yerine 'kaç tane 2 çarpıldı' bilgisini küçük bir sayaçla yazarız: 2¹⁰."
- "Alttaki sayı **taban**: hangi sayı çarpılıyor. Üstteki sayı **üs**: o sayıdan kaç tane yan yana. Yani üs bir sayaçtır."
- "Dikkat: 2³ demek 2·3 değil; 2·2·2 demek."

**Görsel & animasyon:**
1. [0–1 sn] Sahne alanında (640, 180) büyük **"2·2·2·2·2·2·2·2·2·2"** yazısı (10 tane, METİN 44 px) ekrana sığmaya çalışır; sağa taştığı için sağdaki kısım UYARI rengine döner ve kısa bir "çok uzun!" etiketi çıkar.
2. [1–3 sn] Yazı, altında 10 TABAN **blok** satırına dönüşür (x 120–660; her blok 44 px, 8 px boşluk, y=240). Blokların altında ÜS renkli **küme parantezi** (her blok 0,05 sn arayla) açılır ve üzerinde 1'den 10'a sayma rakamları sırayla ÜS renkli yanıp söner.
3. [3–5 sn] Parantezin altında **"2¹⁰"** oluşur: "2" TABAN renkli (56 px), üstündeki "10" ÜS renkli (32 px). Taban için "TABAN: hangi sayı?" etiketi (amber ok, aşağıdan), üs için "ÜS: kaç tane?" etiketi (camgöbeği ok, yukarıdan).
4. [5–9 sn] İkinci örnek, yan yana: **2³ = 2·2·2 = 8** ve altında üzeri çizilmiş UYARI renkli yanlış satır: "2³ = 2·3 = 6 ✗". 3 blok beliriyor, "8" sonucu SONUÇ renkli çıkıyor, "6" UYARI renkli çarpıyla silinip dağılıyor.
5. [10. sn–] Tahmin soruları (aşağıda).

**Etkileşim:**
- **Tahmin et:** "Hangisi daha büyük: 2³ mü, 3² mi?" Seçenekler: A) 2³ (üs daha büyük) B) **3² (9 > 8)** C) Eşitler.
  - **A seçilirse:** "Büyük üs her zaman büyük sonuç vermez. Önce yaz: 2³ = 2·2·2 = 8; 3² = 3·3 = 9."
  - **C seçilirse:** "İkisi de 'bir şey' ama farklı: 8 ve 9. Taban ile üs yer değiştirince sonuç değişir."
  - **B seçilirse:** blok animasyonu iki taraf için çalışır: solda 3 amber blok ("2" yazılı) → 8; sağda 2 amber blok ("3" yazılı) → 9. Geri bildirim: "Doğru: 3² = 3·3 = 9, 2³ = 2·2·2 = 8. Taban ile üs yer değiştirmez."
- **Hızlı alıştırma (sürükle):** "2⁵" kartı ekranda; altında 5 boş yuva. Öğrenci "2" bloklarını yuvalara sürüklüyor (5 tane). 5 blok dolunca 2·2·2·2·2 = **32** SONUÇ renkli belirir. (Hatalı sayıda blokta uyarı: "2⁵ için 5 tane 2 gerekir; şimdi ... tane var".)

**Ekran notu / kural kutusu:**
> **aⁿ = a·a·…·a** (n tane a) – **a:** taban, **n:** üs (sayaç)
> 2³ = 2·2·2 = 8   (2·3 = 6 **değil**)

---

### Sahne 3 – Yan Yana Yazınca Sayaçlar Toplanır (Çarpım Kuralı)
**Süre:** 55 sn | **Öğrenme amacı:** aᵐ·aⁿ = aᵐ⁺ⁿ kuralını "toplam kaç tane a?" sayımıyla bulmak; Y2, Y3, Y4'ü çürütmek.

**Anlatım:**
- "Video önce 3 tur yayıldı: 2³ = 8 kişi. Sonra bu 8 kişinin her biri videoyu 4 tur daha yaydı; herkesten 2⁴ = 16 kişi çıktı."
- "Toplamı bulmak için 8 ile 16'yı çarpıyoruz: 2³·2⁴. Ama 2³ üç tane 2, 2⁴ dört tane 2 demek. Yan yana yazınca kaç tane 2 olur?"
- "Evet: 3 + 4 = 7 tane. Yani çarpmada tabanı değil **sayaçları** toplarız."

**Görsel & animasyon:**
1. [0–3 sn] Üstte iki ağaç parçası, küçük ölçekli: sol parça 3 düzeyli (8 yaprak), her yapraktan sağa ince bir ok ile aşağıya 4 düzeyli alt ağaç (16 yaprak). Etiket: "ilk 3 tur: 2³ = 8 kişi", "sonra her biri 4 tur: 2⁴ = 16".
2. [3–5 sn] Ağaç diyagramı yukarı doğru küçülür (scale 0.5), sahne alanının ortasında **iki blok grubu** belirir: **Grup A:** 3 TABAN blok (x 240–400, y 250), altında "2³" (3 ÜS renkli). **Grup B:** 4 blok biraz açık amber (#FFD98A), (x 520–720), altında "2⁴". Aralarında METİN renkli "×".
3. [5–8 sn] Gruplar yakınlaşıp birleşir: B grubu A grubunun sağına 8 px boşlukla yapışır (0,8 sn ease-in-out). Tüm bloklar aynı TABAN rengine döner. Üstlerinde tek ÜS renkli parantez açılır.
4. [8–11 sn] Bloklar soldan sağa **1, 2, 3, 4, 5, 6, 7** diye sayılır (her rakam bloğun üstünde ÜS renkli, 0,3 sn arayla). Parantez altında "**7 tane 2 = 2⁷**" belirir.
5. [11–14 sn] Denklem satırı: "2³ · 2⁴ = (2·2·2)·(2·2·2·2) = **2⁷**" – parçalar bloklarla eşleşirken renk vurgusu yapılır. Sonuç değeri: "**128**" (8·16 = 128) SONUÇ renkli.
6. [14–17 sn] **Genel kural** soldan sağa yazılır: "aᵐ · aⁿ = aᵐ⁺ⁿ", m ve n ÜS rengi, a TABAN rengi. Altta "Tabanı değil, SAYAÇLARI topla."
7. [17–20 sn] Tuzak şeridi (alt yarıda, UYARI renkli): iki hesap yan yana: **Toplama:** "2³ + 2⁴ = 8 + 16 = **24**" ve karşısında "2⁷ = **128** ✗". Terazi görseli: sol kefede 8+16 blok yığını, sağ kefede 128; sol kefe yukarıda kalır, "≠" belirir.

**Etkileşim:**
- **Tahmin et:** "2³·2⁴ = ?" Seçenekler: A) 2¹² B) **2⁷** C) 4⁷ D) 2³⁴
  - **A (2¹²):** "3·4 = 12 mi yaptın? Bloklara bak: 3 tane 2 ile 4 tane 2'yi yan yana koyunca 12 değil, **7** tane 2 olur. Çarpmada sayaçlar çarpılmaz, toplanır." (Y2)
  - **C (4⁷):** "2·2 = 4 diyerek tabanı değiştirdin. Ama bloklar hâlâ '2' yazıyor, sadece **daha çok** blok var. Taban aynı kalır, sayaç artar." (Y3)
  - **D (2³⁴):** "Rakamları yan yana yapıştırdın. Üsler sayıdır, yazı değil: 3 + 4 = 7."
  - **B:** "Doğru! 3 + 4 = 7 tane 2 → 2⁷ = 128."
- **Küçük kontrol (kaydırıcılar m ve n, 1–6):** Öğrenci m ve n'yi değiştirir; blok grupları canlı birleşir, "2ᵐ·2ⁿ = 2^(m+n)" ve değeri gösterilir (örn. m=2, n=5 → 4·32 = 128 = 2⁷ ✓).
- **Not (kısa, bilgi balonu):** "Taban farklıysa birleşmez: 2³·3² = 8·9 = 72, 6⁵ (= 7776) değil." (Bloklar iki farklı renkte: "2" amber, "3" açık mavi #8FB8FF; birleşmeye çalışınca geri iter.)

**Ekran notu / kural kutusu:**
> **aᵐ · aⁿ = aᵐ⁺ⁿ**  (aynı tabanda çarparken **üsler toplanır**)
> 2³·2⁴ = 2⁷ = 128     |     2³ + 2⁴ = 24 ≠ 2⁷

---

### Sahne 4 – Bölmek Eşleşenleri Götürmektir (Bölüm Kuralı)
**Süre:** 45 sn | **Öğrenme amacı:** aᵐ/aⁿ = aᵐ⁻ⁿ kuralını eşleşen çarpanların sadeleşmesi olarak görmek; Y5.

**Anlatım:**
- "Şimdi tersini yapalım: 128 kişiye ulaşmış videoyu 4 tur geriye sararsak ne olur? 2⁷ / 2⁴."
- "Bölme, pay ve paydadaki aynı çarpanların birbirini götürmesi demek. 4 tane 2 gider, geriye kaç tane kalır?"
- "Üstteki 7 tane 2'den alttaki 4'ü çıkarırız: 3 tane 2 kaldı. Yani bölmede sayaçlar **çıkarılır**."

**Görsel & animasyon:**
1. [0–2 sn] Büyük bir kesir çizgisi (y=250, x 380–900). Üstte 7 TABAN blok, altta 4 TABAN blok, blokların altında/üstünde "2⁷" ve "2⁴" ÜS renkli yazılar. Sol tarafta "2⁷ / 2⁴ =".
2. [2–5 sn] Alttaki her blok sırayla, üstteki aynı sıradaki bloğa **ince bir çizgiyle** bağlanır (4 çizgi). Bağlı çift (üst-alt) parlar (SOLUK→METİN), sonra çiftler **solarak yok olur** (opaklık 1→0, 0,25 sn arayla, çizgi "x" işareti çıkar).
3. [5–7 sn] Geriye üstte 3 blok kalır; alttaki boşluk "1" olur. Kesir yerine bloklar "2³" olarak yeniden yazılır: "2⁷/2⁴ = **2³** = 8".
4. [7–10 sn] Sayısal doğrulama: "128 / 16 = 8 ✓" (SONUÇ renk). Yanında küçük **GERİ renkli ⏪** simgesi: "4 tur geri sar": 128 → 64 → 32 → 16 → 8 zinciri bir sayı doğrusunda 4 sıçrayışla (her sıçrayış GERİ ok, ÷2 etiketli).
5. [10–13 sn] Genel kural: "aᵐ / aⁿ = aᵐ⁻ⁿ  (a ≠ 0)". Yanında küçük not: "a ≠ 0 çünkü 0'a bölünemez."

**Etkileşim:**
- **Tahmin et:** "5⁶ / 5² = ?" – A) 5⁸ B) **5⁴** C) 5³ D) 1⁴
  - **A (5⁸):** "Bölerken toplamışsın. Alttaki 2 tane 5, üstteki 6 tane 5'ten 2'sini **götürür**."
  - **C (5³):** "6 ÷ 2 = 3 yaptın; ama sayaçlar bölünmez, **çıkarılır**: 6 − 2 = 4." (Y5)
  - **D (1⁴):** "5/5 = 1 diye tabanları böldün. Tabanlar ortak ve sadeleşmedi; sadece eşleşen **çarpan** sayısı kadar gitti. Taban 5 olarak kalır."
  - **B:** "Doğru: 5⁶ / 5² = 5⁴ = 625." (15625 / 25 = 625 doğrulaması ikinci satırda)

**Ekran notu / kural kutusu:**
> **aᵐ / aⁿ = aᵐ⁻ⁿ**  (a ≠ 0)  – bölmede **üsler çıkarılır**
> 2⁷ / 2⁴ = 2³ = 8

---

### Sahne 5 – Grup Grup Tekrar: Üssün Üssü ve Çarpımın Üssü
**Süre:** 55 sn | **Öğrenme amacı:** (aᵐ)ⁿ = aᵐ·ⁿ ve (a·b)ⁿ = aⁿ·bⁿ kurallarını gerekçelendirmek; Y6, Y7.

**Anlatım:**
- "(2³)² ne demek? 2³ olan bir grubu 2 kez yazıyoruz: 2³·2³. Her grupta 3 tane 2 var, 2 grup var."
- "Toplam: 2 grup × 3 tane = 6 tane 2. Yani üssün üssünde sayaçlar **çarpılır**."
- "Peki (2·3)² ne olur? Bu, (2·3)·(2·3). Çarpma sırası serbest: iki 2 ve iki 3 çıkar. Üs, parantezin içindeki **her çarpana** dağılır."

**Görsel & animasyon:**
*Bölüm A – (2³)²*
1. [0–2 sn] Ortada "(2³)²" – iç üs 3 ÜS renkli, dış üs 2 KÖK renkli (dış–iç ayrımı için). Parantezin etrafında hafif bir PANEL kutusu.
2. [2–5 sn] "(2³)² = 2³ · 2³" – ifade açılır. Altında iki satır halinde **blok ızgarası**: 2 satır × 3 sütun (hücre 52 px; sol üst köşe (480, 220)). Her satır bir "2³" grubu (köşede KÖK renkli satır numarası 1., 2.), her sütun grubun içindeki bir çarpan (ÜS renkli sütun numarası 1, 2, 3).
3. [5–8 sn] Izgaranın solunda "2 satır", üstünde "3 sütun" etiketleri; ızgara alanı "2 × 3 = 6 blok" (6 blok sırayla ışıldar, numaralar 1–6). Altında "**2⁶ = 64**" SONUÇ renkli.
4. [8–10 sn] Karşılaştırma şeridi: sol: "2³·2² → **yan yana yaz** → 2⁵ (toplam)" (5 blok tek satır); sağ: "(2³)² → **grup grup tekrar** → 2⁶ (çarpım)". Fark vurgusu: tek satır vs. ızgara.
*Bölüm B – (2·3)²*
5. [10–14 sn] "(2·3)² = (2·3)·(2·3)" – altında 2 amber blok ("2") ve 2 açık-mavi blok ("3"). Sonra çarpanlar **yer değiştirir**: 3'ler ortada, 2'ler sola kayar (0,6 sn; eğri yollar): "2·2·3·3". Altında "= 2² · 3² = 4 · 9 = **36**" ve karşısında (6)² = 36 ✓.
6. [14–16 sn] Yan not UYARI renkli: "(2·3)² ≠ 2·3² = 18" (üs yalnızca 3'e ait değil).

**Etkileşim:**
- **Tahmin et:** "(2²)³ = ?" – A) 2⁵ **B) 2⁶** C) 4⁶ D) 2⁸
  - **A (2⁵):** "2 + 3 mü topladın? O, yan yana yazma kuralı. Burada 3 grup var ve her grupta 2 tane 2 var: 3 × 2 = 6." (Y6)
  - **C (4⁶):** "(2²) zaten 4. Üs 3 ise 4³ olur (= 64). 4⁶ = 4096 olurdu; içteki üsü iki kez saymışsın."
  - **D (2⁸):** "Üssü kule gibi 2^(2³) okumuşsun. Burada parantez var: önce 2² = 4, sonra 4³ = 64 = 2⁶."
  - **B:** "Doğru. (2²)³ = 4³ = 64 = 2⁶. İkisini de sayabilirsin."
- **Küçük ızgara oyunu:** Öğrenci "satır" ve "sütun" kaydırıcılarını (1–5) oynatır; ızgara büyür ve "(2ˢ)ʳ = 2^(s·r)" canlı yazılır.

**Ekran notu / kural kutusu:**
> **(aᵐ)ⁿ = aᵐ·ⁿ**  (grup grup tekrar → **üsler çarpılır**)  (2³)² = 2⁶ = 64
> **(a·b)ⁿ = aⁿ · bⁿ**  (2·3)² = 2²·3² = 36  (ama (a**+**b)ⁿ için böyle bir kural **yok**)

---

### Sahne 6 – Geri Sar: a⁰ = 1 ve a⁻ⁿ
**Süre:** 65 sn | **Öğrenme amacı:** Bölüm kuralı ve "her geri adımda ikiye böl" örüntüsünden a⁰ = 1 ve a⁻ⁿ = 1/aⁿ sonucuna ulaşmak; Y8, Y9.

**Anlatım:**
- "Videoyu geri sarıyoruz. 10. turda 1024 vardı. Bir tur geri sarınca? 512. Bir tur daha: 256… Her adımda sayı yarıya iniyor, üs ise 1 azalıyor."
- "Sarmaya devam edelim: 2³ = 8, 2² = 4, 2¹ = 2… sıradaki 2⁰ kaç olmalı? Örüntü der ki 2'yi ikiye böl: 1. Aynı şeyi bölüm kuralı da söylüyor: 2³/2³ = 2³⁻³ = 2⁰, ama 8/8 = 1."
- "Daha da geri saralım: 2⁻¹ = 1/2, 2⁻² = 1/4, 2⁻³ = 1/8. Eksi işareti sayıyı negatif yapmaz; **ters çevirir**: 2⁻³ = 1/2³."

**Görsel & animasyon:**
1. [0–2 sn] Dikey bir **merdiven** (x=520–760, y 90–470): satır başına 28 px. Satırlar yukarıdan aşağıya üs değerleri 10, 9, 8, …, 0, −1, −2, −3 (14 satır). Sol sütun: üs (ÜS renkli, "2¹⁰" gibi). Sağ sütun: değer. Başlangıçta yalnızca 10. satır dolu: "1024".
2. [2–8 sn] **Geri sar düğmesi** (⏪, GERİ renkli, sahne sağında (900, 280)); animasyon otomatik bir kez çalışır: her adım 0,45 sn. Her adımda merdivende bir sonraki satır açılır, aralarında sağ tarafta GERİ renkli ok "÷2" yazar. Değerler: 10→1024, 9→512, 8→256, 7→128, 6→64, 5→32, 4→16, 3→8, 2→4, 1→2.
3. [8–10 sn] Animasyon "1" satırında duraklar. Ekranda soru: "2⁰ = ?" (tahmin penceresi, aşağıda). Doğru cevaptan sonra 0. satır açılır: "2⁰ = **1**". Satır SONUÇ renkli parlar.
4. [10–13 sn] Sağ panelde ikinci gerekçe: "2³ / 2³ = ?" – iki tarafta: bölüm kuralı "2³⁻³ = 2⁰" ve sayılarla "8 / 8 = 1" → "2⁰ = 1" eşitliği (iki okun uçları birleşir).
5. [13–19 sn] Geri sarma devam eder: satırlar −1, −2, −3 açılır; değerler **kesir kutuları** olarak çizilir (çubuk modeli): 2⁰ için bütün çubuk (160 px), 2⁻¹ için yarım, 2⁻² için çeyrek, 2⁻³ için sekizde bir (çubuk uzunluğu = 160/2^k, KÖK renkli dolgu). Yanlarında "1/2", "1/4", "1/8" yazar. Satır etiketleri "2⁻¹ = 1/2¹ = 1/2", "2⁻² = 1/2² = 1/4", "2⁻³ = 1/2³ = 1/8".
6. [19–22 sn] Bölüm kuralıyla ikinci tutarlılık kontrolü: "2³ / 2⁵ = 2³⁻⁵ = 2⁻²" ve sayılarla "8 / 32 = 1/4" → "2⁻² = 1/4 ✓".
7. [22–25 sn] Kesirli taban örneği: "(2/3)⁻² = (3/2)² = 9/4" – kesir tersine döner (animasyonla pay-payda yer değiştirir, üs işareti eksiden artıya geçer).
8. [25. sn–] Not (UYARI küçük balon): "a⁰ = 1 için a ≠ 0 olmalı."

**Etkileşim:**
- **Tahmin et 1 (2⁰):** "Örüntüye göre 2⁰ kaç olmalı?" – A) 0 **B) 1** C) 2 D) Tanımsız
  - **A (0):** "'Hiç çarpan yok' diye 0 demek cazip. Ama 8/8 = 1 ve bölüm kuralı bu sayıyı 2⁰ yapıyor: 2⁰ = 1."  (Y8)
  - **C (2):** "2¹ = 2 idi. Bir adım daha geri sarınca 2'yi ikiye böleriz: 1."
  - **D:** "Tanımsız değil: örüntü ve bölüm kuralı kesin söylüyor. (Tanımsız olan 0⁰'dır; bu derste a ≠ 0.)"
- **Tahmin et 2 (2⁻³):** "2⁻³ nedir?" – A) −8 B) −6 **C) 1/8** D) 1/6
  - **A (−8):** "Eksi işareti sayıyı negatif yapmaz, sonucu **ters çevirir**. Geri sararken sayı hiçbir zaman negatif olmadı: 1, 1/2, 1/4, 1/8…" (Y9)
  - **B (−6):** "2·3 gibi çarpıp eksi mi koydun? 2⁻³ üç tane 2'nin çarpımının tersi: 1/(2·2·2) = 1/8."
  - **D (1/6):** "Paydada 2·3 = 6 mı? Paydada 3 tane 2 çarpılır: 2³ = 8."
  - **C:** "Doğru! 2⁻³ = 1/2³ = 1/8."
- **Kaydırıcı (üs, −3…10):** Ekranın altında bir kaydırıcı merdivende o satırı vurgular ve değeri gösterir.

**Ekran notu / kural kutusu:**
> **a⁰ = 1**  (a ≠ 0)   – çünkü  aᵐ / aᵐ = aᵐ⁻ᵐ = a⁰  ve  aᵐ / aᵐ = 1
> **a⁻ⁿ = 1 / aⁿ**   2⁻³ = 1/8   (eksi işareti sayıyı negatif yapmaz, **ters çevirir**)

---

### Sahne 7 – Üs Yasaları Arenası (Pekiştirme)
**Süre:** 50 sn | **Öğrenme amacı:** Beş kuralı karışık biçimde uygulamak ve toplamada kural uygulanmadığını fark etmek (Y4 pekiştirme).

**Anlatım:**
- "Şimdi kuralları sen kullan. Altı ifadeyi, doğru sonuçların üzerine sürükle."
- "Dikkat: biri bir tuzak. Her ifadede önce işleme bak: çarpma mı, bölme mi, üssün üssü mü… yoksa toplama mı?"

**Görsel & animasyon:**
1. [0–2 sn] Sol sütunda (x=100–460) 6 **ifade kartı**, 56 px yükseklik, PANEL, 12 px boşluk, y=100 başlayarak:
   - K1: **3² · 3⁵**
   - K2: **5⁶ / 5²**
   - K3: **(2²)⁴**
   - K4: **7⁰**
   - K5: **2⁻²**
   - K6: **2³ + 2³** (tuzak; sol kenarında çok soluk bir "!" işareti – bu ipucu yok: ipucu 2 yanlıştan sonra çıkar)
2. [0–2 sn] Sağ sütunda (x=760–1120) 6 **hedef yuva** (karıştırılmış sırayla): "3⁷", "5⁴", "2⁸", "1", "1/4", "2⁴". Yuvalar kesikli çerçeve.
3. Bir kart yuvaya bırakılınca yuva içinde 0,3 sn kontrol animasyonu çalışır.

**Etkileşim (sürükle-bırak):**
- **Doğru eşleşmeler:** 3²·3⁵ → **3⁷** (2+5 = 7); 5⁶/5² → **5⁴** (6−2 = 4); (2²)⁴ → **2⁸** (2·4 = 8); 7⁰ → **1**; 2⁻² → **1/4**; 2³ + 2³ → **2⁴** (8 + 8 = 16 = 2⁴).
- **Doğruysa:** kart yuvaya oturur, SONUÇ renkli çerçeve, kısa "ding" ve kartın altında çözüm satırı (örn. "3²·3⁵ = 3²⁺⁵ = 3⁷").
- **Yanlışsa:** kart UYARI rengine döner, başlangıç konumuna zıplayarak döner. Kısa ipucu: K1 yanlışsa "Çarpma: sayaçları topla." K2: "Bölme: sayaçları çıkar." K3: "Üssün üssü: sayaçları çarp." K4: "Geri sararken 2⁰ neydi?" K5: "Eksi işareti: ters çevir." **K6 yanlışsa (ve doğru bulununca) özel geri bildirim:** "Toplamada üsler toplanmaz! Önce hesapla: 2³ + 2³ = 8 + 8 = 16. Bunu 2 · 2³ = 2¹ · 2³ = 2⁴ diye de yazabilirsin." (iki 8 bloğu birleşip 16 olur.)
- Hepsi eşleşince ekranda kısa "6/6 ✓" rozeti çıkar.

**Ekran notu / kural kutusu (özet tablo):**
> aᵐ·aⁿ = aᵐ⁺ⁿ | aᵐ/aⁿ = aᵐ⁻ⁿ | (aᵐ)ⁿ = aᵐ·ⁿ | (ab)ⁿ = aⁿbⁿ | a⁰ = 1 | a⁻ⁿ = 1/aⁿ
> **Toplama/çıkarmada** bu kurallar işlemez: önce hesapla veya ortak çarpan al.

---

### Sahne 8 – Kök: Yolculuğun Tam Ortası
**Süre:** 50 sn | **Öğrenme amacı:** Karekökün "kendisiyle çarpılınca a veren (negatif olmayan) sayı" olduğunu ve bunun, eşit iki yarıya bölünmüş bir büyüme yolunun ortası olduğunu görmek; Y10.

**Anlatım:**
- "Video 10 turda 1024 kişiye ulaştı. Bu yolculuğu eşit iki yarıya böl: 5 tur + 5 tur. Tam ortada, 5. turda kaç kişi vardı?"
- "İkinci yarıda bu kişilerin **her biri** ilk yarıdaki kadar büyüdü. Yani ortadaki sayı kendisiyle çarpılınca 1024 olmalı. İşte karekök bu: **√1024**."
- "Kare olarak düşün: alanı 1024 olan karenin bir kenarı kaç? 32. Çünkü 32·32 = 1024."

**Görsel & animasyon:**
1. [0–3 sn] Sahne alanının üst yarısında **zaman şeridi** (x 160–1120, y 150): 0'dan 10'a işaretli, her tur 96 px (x = 160 + 96·n). Şerit altında 11 tik. Şeridin en sağında işaretçi 10. turda "1024 kişi" (TABAN renkli büyük etiket).
2. [3–5 sn] Sol alt köşede (x 120–420, y 260–460) **kare**: kenarı 200 px, "alan = 1024" etiketi (ÜS renkli). Ortasında "?" kenar uzunluğu işareti.
3. [5. sn] **Kaydırıcı tutamacı** (KÖK renkli, daire r=14) 10. turdan başlar ve öğrencinin elinde: şerit üzerinde sürüklenebilir (1…10 tam sayı konumlarına yapışır). Sağ panelde canlı hesap: "k. turda: 2ᵏ kişi" ve alt satır "2ᵏ · 2ᵏ = ?" (örn. k=4 → 16·16 = 256; k=6 → 64·64 = 4096; k=5 → 32·32 = **1024 ✓**).
4. [Tahmin sonrası] Doğru konuma (k=5) gelince: şerit 5. turda mor halka; "32" büyük KÖK renkli etiket; 0–5 ve 5–10 aralıkları aynı uzunlukta iki **KÖK renkli ayna ok** olur. Kare animasyonu: 1024 küçük kare (32×32 ızgara, bölünmüş görünüm) kenar etiketleri "32" ve "32". Yazı: "**√1024 = 32**" (kök sembolü KÖK rengi). Yanda "32 · 32 = 1024".
5. [Son 3 sn] Küçük kök tablosu (sağ alt): √1=1, √4=2, √9=3, √16=4, √25=5, √36=6 (her satır 0,2 sn arayla). Altında KÖK renkli not: "√a ≥ 0 olan sayıdır."

**Etkileşim:**
- **Tahmin/bulma:** "Yolculuğun öyle bir noktasını bul ki, orada kaç kişi varsa kendisiyle çarpılınca 1024 olsun. Tutamacı sürükle."
  - **k=4 (16) veya k=6 (64) bırakılırsa:** canlı çarpım: "16·16 = 256 – çok küçük" / "64·64 = 4096 – çok büyük". Tutamaç geri yerine kayar (UYARI sönük). Mesaj: "Çarpım 1024'e eşit olmalı. Sol/sağa kaydır."
  - **k=5 bırakılırsa:** "Tam ortası! 32·32 = 1024, yani √1024 = 32 = 2⁵."
  - **Ek mini soru (tutamaç doğru yere gelince):** "√16 = ?" – A) 8 **B) 4** C) 256. A seçilirse: "8 yarıya bölünmüş 16 ama kök 'yarısı' değil: 8·8 = 64 ≠ 16. Aranan sayı kendisiyle çarpılınca 16 olan: 4." (Y10)

**Ekran notu / kural kutusu:**
> **√a**: kendisiyle çarpılınca **a** veren **negatif olmayan** sayı.  √1024 = 32 çünkü 32·32 = 1024
> Kök = çarpma yolculuğunun **tam ortası**.

---

### Sahne 9 – Ortadaki Üs Kaç? √a = a^(1/2)
**Süre:** 60 sn | **Öğrenme amacı:** aˣ·aˣ = a¹ eşitliğinden x = 1/2 sonucunu çıkararak √a = a^(1/2) kuralını türetmek; kökün aslında kesirli üs olduğunu görmek.

**Anlatım:**
- "Ortadaki noktada üs ne olur? Başlangıçta üs 0 (a⁰ = 1), sonda üs 1 (a¹ = a). Tam ortada üs, 0 ile 1'in ortası: yarım."
- "Kuralla da bulabiliriz: aˣ · aˣ = a diyorsak, üsleri toplayınca x + x = 1 olmalı. Yani x = 1/2."
- "Demek ki √a = a^(1/2). Kök, 'sayacı yarıya bölmek'. √(2¹⁰) = 2⁵ de bu yüzden çıktı."

**Görsel & animasyon:**
1. [0–3 sn] Alt yarıda yatay bir **üs ekseni** (x 240–1040, y 300): sol uçta "üs = 0", sağ uçta "üs = 1"; ortada tik "1/2". Kutular: sol uçta "a⁰ = 1", sağ uçta "a¹ = a" (a'nın değeri sağ üstte seçilebilir: 2, 4, 9, 16).
2. [3–6 sn] **Üs tutamacı** (mor daire) 0'dan 1'e doğru yavaşça kayar; üzerinde canlı değer "aˣ". a=4 için: x=0 → 1; x=1/2 → **2**; x=1 → 4. Değer çubuğu (yükseklik) çizilir: 1, 2, 4 (her adımda **×2**: eşit çarpanlı iki adım, ok animasyonu "×2" "×2"). Bu, "eşit iki adımda 1'den 4'e" mantığını gösterir.
3. [6–10 sn] Üst satırda türetme (adım adım belirir, her satır 0,8 sn):
   - "aˣ · aˣ = a" (ÜS rengi x)
   - "aˣ⁺ˣ = a¹"
   - "2x = 1"
   - "**x = 1/2**" (SONUÇ rengi)
   - "Demek ki: **a^(1/2) = √a**" (KÖK rengi çerçeve)
4. [10–14 sn] Örnekler (üç kart, sırayla): **4^(1/2) = √4 = 2** (1 → 2 → 4); **9^(1/2) = √9 = 3** (1 → 3 → 9); **2^(1/2) = √2 ≈ 1,41** (1 → 1,41 → 2; kontrol: 1,41·1,41 ≈ 1,99 ≈ 2). Her kartın altında eksen üzerinde nokta.
5. [14–17 sn] Geri bağlama: "√(2¹⁰) = (2¹⁰)^(1/2) = 2^(10·1/2) = **2⁵** = 32 ✓" (S5'in "üsler çarpılır" kuralı mor oklarla vurgulanır).
6. [17–19 sn] Küçük not: "a ≥ 0 olmalı; çünkü reel sayıda hiçbir sayının karesi negatif olmaz (√(−4) tanımsız)."

**Etkileşim:**
- **Tahmin et:** "16^(1/2) = ?" – A) 8 **B) 4** C) 32 D) 256
  - **A (8):** "1/2'yi 'yarısı' sanmışsın (16 ÷ 2). Üs 1/2 ise, **iki kez çarpınca** 16 verecek sayıyı arıyoruz: 4·4 = 16." (Y10)
  - **C (32):** "16·2 yapmışsın. Üs çarpan değil, sayaçtır; 1/2 sayaç yarım adım demektir."
  - **D (256):** "16² ile karıştırdın. Üs 1/2, 2 değil: kök alıyoruz, kare değil."
  - **B:** "Doğru: 16^(1/2) = √16 = 4 çünkü 4·4 = 16."
- **Seçici (a = 2, 4, 9, 16):** Öğrenci a'yı seçer; eksen ve çubuk canlı değişir, ortadaki değer yazılır (2, 3, 4).

**Ekran notu / kural kutusu:**
> **√a = a^(1/2)**  (a ≥ 0)  – çünkü  a^(1/2) · a^(1/2) = a^(1/2+1/2) = a¹ = a
> √4 = 2, √9 = 3, √16 = 4 …  Kök, sayacı **yarıya bölmektir**.

---

### Sahne 10 – Köklerle Çarpma ve Sadeleştirme (Çiftler Dışarı!)
**Süre:** 65 sn | **Öğrenme amacı:** √a·√b = √(ab) ve √a/√b = √(a/b) kurallarını (ab)ⁿ = aⁿbⁿ kuralından çıkarmak; √72 = 6√2 gibi sadeleştirmeyi "çiftler dışarı çıkar" mantığıyla yapmak; Y11, Y12.

**Anlatım:**
- "Kökün üs olduğunu biliyoruz. O hâlde √4·√9 = 4^(1/2)·9^(1/2). Çarpımın üssü kuralı: bunu (4·9)^(1/2) yapabiliriz, yani √36 = 6. Gerçekten de 2·3 = 6!"
- "Sadeleştirme için bir hile: sayıyı asal çarpanlarına ayır. √72 = √(2·2·2·3·3). İkişerli **çiftler** kökten dışarı çıkar, çift olmayan içeride kalır."
- "Çiftler: (2,2) → 2 ve (3,3) → 3. Dışarı 2·3 = 6 çıktı, içeride tek 2 kaldı: 6√2."

**Görsel & animasyon:**
*Bölüm A – Çarpma kuralı*
1. [0–3 sn] Sol tarafta iki kare: alanı 4 (kenarı 2) ve alanı 9 (kenarı 3), kenar etiketleri √4 = 2 ve √9 = 3. Karelerin kenarlarından bir **dikdörtgen** oluşur: kenarları 2 ve 3, alan = 6 (ÜS renkli "6 birim kare" dolgu çizgili).
2. [3–6 sn] Dikdörtgenin **karesi** (6·6) alanı olan büyük kare çizilir: "6² = 36"; altında "36 = 4 · 9" eşitliği: iki küçük karenin alanları çarpılıyor. Sonuç: "√4·√9 = √36 = 6" ve genel: "**√a·√b = √(ab)**". Kısa türetme satırı: "a^(1/2)·b^(1/2) = (ab)^(1/2)".
3. [6–8 sn] Bölme için yan satır: "√36 / √9 = 6/3 = 2 = √4 = √(36/9)" → "**√a/√b = √(a/b)**" (b > 0).
*Bölüm B – Çiftler dışarı*
4. [8–14 sn] "√72" yazısı. Altında 72, **asal çarpan zincirine** ayrılır: 72 → 8·9 → (2·2·2)·(3·3) (her kıyılma 0,4 sn; çarpanlar TABAN renkli daire/chip: 2,2,2 amber; 3,3 açık mavi). Kök sembolü (KÖK rengi) bütün chipleri kuşatır.
5. [14–18 sn] Aynı sayılar **eşleşir**: (2,2) bir çift, (3,3) bir çift, tek 2 yalnız. Çiftler kök çatısından **yukarı** fırlayıp tek bir chip olarak dışarı çıkar: 2 ve 3. Dışarıda "2·3 = 6" birleşir. İçeride "√2". Sonuç: "√72 = **6√2**" (SONUÇ).
6. [18–20 sn] Sayısal doğrulama: "6√2 ≈ 8,49" ve "√72 ≈ 8,49" (aynı sayı doğrusu noktası).
7. [20–23 sn] İkinci örnek: **√50 = √(2·5·5) = 5√2** (çift (5,5) → 5; 2 içeride).
8. [23–26 sn] **Ters yön:** "3√2 = √(3²·2) = √18" – dışarıdaki 3, kökün içine **iki kopya** hâlinde girer (3·3 = 9, 9·2 = 18). Tuzak: 3√2 = √6 ✗ (UYARI): "3·2 = 6 değil, 3 çifti içeri girerse 3² = 9 olur." (Y12)

**Etkileşim:**
- **Tahmin et (çarpma):** "√2·√8 = ?" – A) √10 **B) 4** C) 16 D) 8
  - **A (√10):** "2 + 8 mi yaptın? Kök çarpmayı korur, toplamayı değil: √2·√8 = √(2·8) = √16."
  - **C (16):** "2·8 = 16 doğru ama bu kökün **içindeki** sayı. √16'yı da almalısın: 4."
  - **D (8):** "√16 = 16/2 mi? Kök yarısı değildir. 4·4 = 16, yani √16 = 4." (Y10)
  - **B:** "Doğru: √2·√8 = √16 = 4."
- **Sürükle-bırak (çiftleme):** "√48'i sadeleştir." Ekranda 48 = 2·2·2·2·3 chipleri; öğrenci chipleri çiftler hâlinde işaretler (ya da sürükler). Beklenen: (2,2)(2,2) → 2·2 = 4 dışarı; 3 içeride → **4√3**.
  - Yanlış eşleşme (örn. (2,3)): "Çift, **aynı** sayıdan iki tane olmalı."
  - Kullanıcı yalnızca bir çift çıkarıp bitirirse (2√12): "2√12'de hâlâ çift var: 12 = 2·2·3. Devam et." (kısmi sadeleştirme uyarısı)
  - Yanlış yol "√48 = 24" için: "Kök, yarısı değildir (Y10)".
  - Doğru: "4√3 ✓ ( 16·3 = 48 )."

**Ekran notu / kural kutusu:**
> **√a·√b = √(ab)**,  **√a/√b = √(a/b)**   (a, b ≥ 0; paydada b > 0)
> **Sadeleştirme:** asal çarpanlara ayır, **çiftleri dışarı çıkar** → √72 = √(2·2·2·3·3) = 6√2
> Ters yön: 3√2 = √18

---

### Sahne 11 – Köklerle Toplama ve Paydayı Rasyonel Yapma
**Süre:** 65 sn | **Öğrenme amacı:** Benzer köklü terimleri (aynı kök) toplamak; √8 + √18 gibi toplamlarda önce sadeleştirmek; tek terimli köklü paydayı 1 ile genişleterek rasyonel yapmak; Y13, Y14.

**Anlatım:**
- "3√2 + 5√2 nedir? √2'yi bir birim gibi düşün, tıpkı 3 elma + 5 elma = 8 elma gibi: 8√2. Ama √2 + √3, elma + armut gibi birleşmez."
- "√8 + √18 birleşmiyor gibi görünür, çünkü kök içleri farklı. Önce sadeleştir: √8 = 2√2, √18 = 3√2. Şimdi hepsi √2 'elması': 2√2 + 3√2 = 5√2."
- "Bir de paydada kök sevmeyiz. 6/√3'ü 1'e eşit olan √3/√3 ile çarparız: 6√3/3 = 2√3. Neden işe yarar? Çünkü √3·√3 = 3."

**Görsel & animasyon:**
*Bölüm A – Benzer terimler*
1. [0–4 sn] Sol tarafta: **3 tane "√2" kutusu** (KÖK rengi, 48×48 px) ve **5 tane "√2" kutusu** yan yana; "3√2 + 5√2" yazısı. Kutular tek bir sıraya birleşir: 8 tane → "**8√2**". Altta kural: "katsayılar toplanır, kök aynı kalır".
2. [4–6 sn] Yan örnek: "√2 + √3" – bir √2 kutusu (mor) ve bir √3 kutusu (açık yeşil) yan yana, birleşmeye çalışınca geri iter (UYARI titremesi). Etiket: "farklı kök → birleşmez".
3. [6–12 sn] **Asıl örnek:** "√8 + √18". Önce kök içleri farklı olduğu için kutular farklı renk. Her biri **çiftler dışarı** animasyonuyla (S10'dan) kısa oynar: √8 = √(2·2·2) = 2√2; √18 = √(2·3·3) = 3√2. Sonra iki kutu grubu (2 ve 3 tane √2) birleşir: "2√2 + 3√2 = **5√2**". Sayısal doğrulama: "√8 + √18 ≈ 2,83 + 4,24 = 7,07 ≈ 5√2".
4. [12–14 sn] Tuzak (UYARI): "√8 + √18 = √26 ✗" – sayısal olarak √26 ≈ 5,10 ≠ 7,07 (S12'ye köprü).
*Bölüm B – Paydayı rasyonel yapma*
5. [14–16 sn] "6/√3" – sayı doğrusunda 3,46 civarında nokta. Paydadaki √3 mor çerçevede (soru: "kök payda kalsın mı?").
6. [16–21 sn] Kesrin üstüne/altına **eşit bir çarpan** gelir: "× √3/√3" (değeri 1; bu kutu SONUÇ renkli parlar, "1'e eşit!" etiketi). Pay: 6·√3 = 6√3. Payda: √3·√3 = 3 (S9'dan: 3^(1/2)·3^(1/2) = 3¹ = 3). Sonuç: "6√3/3 = **2√3**" (≈ 3,46, nokta aynı yerde). 
7. [21–24 sn] İkinci örnek: **1/√2 = √2/2** (≈ 0,71). 
8. [24–25 sn] Yanlış yöntem (UYARI): "6/√3 = 6√3" ✗ – "Yalnızca paya √3 ile çarpmak değeri değiştirir; hem paya hem paydaya çarp."

**Etkileşim:**
- **Sınıflandır (sürükle):** Beş chip: 3√2, 5√2, 2√3, √2, 4√3. İki sepet: "√2 elmaları", "√3 armutları". Doğru: 3√2, 5√2, √2 → √2 sepeti (toplam 3+5+1 = 9 → 9√2); 2√3, 4√3 → √3 sepeti (toplam 6√3). Her sepet toplamını canlı yazar.
- **Tahmin et:** "√2 + √8 = ?" – A) √10 **B) 3√2** C) 5
  - **A (√10):** "Toplama kök içinde yapılmaz. √8'i sadeleştir: 2√2. Sonra √2 + 2√2 = 3√2." (Y13)
  - **C (5):** "√2 = 1, √8 = 4 gibi 'yarısı' mı aldın? √2 ≈ 1,41 ve √8 ≈ 2,83; toplamı ≈ 4,24 = 3√2."
  - **B:** "Doğru: √2 + 2√2 = 3√2 ≈ 4,24."

**Ekran notu / kural kutusu:**
> **Aynı kökler** toplanır: 3√2 + 5√2 = 8√2.  Farklıysa önce sadeleştir: √8 + √18 = 2√2 + 3√2 = **5√2**
> **Paydayı rasyonel yap:** 6/√3 = (6·√3)/(√3·√3) = 6√3/3 = **2√3**,   1/√2 = √2/2
> (√a·√a = a  olduğu için payda tam sayı olur.)

---

### Sahne 12 – Tuzak: √(a+b) ≠ √a + √b
**Süre:** 55 sn | **Öğrenme amacı:** √(a+b) = √a + √b yanılgısını sayısal karşı örnekle çürütmek; kökün çarpmaya "dağıldığını" ama toplamaya dağılmadığını anlamak; Y15, Y16.

**Anlatım:**
- "Şimdi en klasik tuzak. Soru: √(9+16) ile √9 + √16 aynı mı? Tahmin et."
- "Bakalım: √(9+16) = √25 = 5. Ama √9 + √16 = 3 + 4 = 7. 5 ≠ 7! Kök, çarpmaya dağılır ama **toplamaya dağılmaz**."
- "Neden? Üs kuralı (ab)^(1/2) = a^(1/2)·b^(1/2) çarpım için çıkmıştı. Toplam için böyle bir kural kurmadık, kuramayız da."

**Görsel & animasyon:**
1. [0–3 sn] Ortada iki ifade yan yana, aralarında yanıp sönen "?" : **√(9+16)** (sol, KÖK) ve **√9 + √16** (sağ). Alttan "Aynı mı?" sorusu belirir.
2. [Tahmin sonrası, 3–8 sn] İki sütunda **hesap**:
   - Sol: "√(9+16) → 9+16 = 25 → √25 = **5**"
   - Sağ: "√9 = 3, √16 = 4 → 3 + 4 = **7**"
   İki sonuç aşağı iner; ortada büyük UYARI renkli "**5 ≠ 7**" belirir (≠ işareti sallanır).
3. [8–14 sn] **Dik yol görseli:** Sahnenin altında (x 380–880, y 250–440) bir koordinat ızgarası; (0,0)'dan sağa 3 birim (SOLUK-mavi çizgi, "3 = √9"), oradan yukarı 4 birim (açık-mavi çizgi, "4 = √16"): toplam yürüme = 7. Sonra A'dan B'ye **kestirme çizgisi** (KÖK renkli köşegen): uzunluk 5. Etiket: "Kestirme: 5 = √(9+16) · Yürüyerek: 3 + 4 = 7". Yan not (SOLUK, küçük): "Kenarları 3 ve 4 olan karelerin alanları 9 ve 16; kestirme çizgisi üzerine kurulan karenin alanı da 25 (9 + 16), kenarı 5." (Pisagor formülü verilmez; yalnızca görsel, 5 = kestirme uzunluğu ölçekli çizilir.)
4. [14–18 sn] Üs dilinde: "(9+16)^(1/2) ≠ 9^(1/2) + 16^(1/2)" ve altında (UYARI) "üs toplama dağılmaz". Yan not (SOLUK): "Aynı hata: (3+4)² = 49 ama 3² + 4² = 25."
5. [18–24 sn] **Hangi kural çarpmada işler?** İki sütunlu tablo belirir:
   - ✓ (SONUÇ): √(a·b) = √a·√b, √(a/b) = √a/√b
   - ✗ (UYARI): √(a + b) ≠ √a + √b, √(a − b) ≠ √a − √b
   Örnek eşleme: "√(4·9) = √36 = 6 = 2·3 ✓" ve "√(4+9) = √13 ≈ 3,61 ≠ 5 = 2 + 3 ✗".

**Etkileşim:**
- **Tahmin et (başta):** "√(9+16) ile √9 + √16 aynı mı?" – A) Evet, kök toplamaya dağılır **B) Hayır, farklı sayılar** C) Bazen
  - **A seçilirse:** (hesap yapılınca) "Hesap yapalım: 5 ve 7 – eşit değil. Tek bir karşı örnek, kuralın genel olmadığını gösterir."
  - **C seçilirse:** "Çok iyi bir sezgi! Gerçekten yalnızca özel durumda eşit (şimdi gör)." Sonra B ile birleşir.
  - **B seçilirse:** "Doğru sezgi; şimdi kanıtlayalım."
- **Keşif paneli (kaydırıcılar a ve b):** Değerler {0, 1, 4, 9, 16, 25}. Panel: "√(a+b) = …, √a + √b = …" ondalık (2 basamak). Örnek: a=1, b=1 → 1,41 vs 2; a=4, b=9 → 3,61 vs 5; a=9, b=16 → 5 vs 7; a=16, b=25 → 6,40 vs 9. **Yalnızca a = 0 veya b = 0** olduğunda eşitlik "=" olarak yeşil yanar. Pozitif çiftlerde panel sürekli "≠" gösterir (soldaki her zaman daha küçüktür) ve mesaj: "İkisi de 0'dan büyükken hiç eşit olmadı." (Ayrıntılı kanıta girilmez.) Öğrenciye görev: "Eşit olduğu bir çift bul." Bulduğunda a=0 veya b=0 fark edilir ve geri bildirim verilir.

**Ekran notu / kural kutusu:**
> **√(a·b) = √a·√b** ✓   **√(a/b) = √a/√b** ✓
> **√(a + b) ≠ √a + √b** ✗   Örnek: √(9+16) = 5, ama √9 + √16 = 7.
> Kök (kesirli üs) **çarpmaya** dağılır, **toplamaya** dağılmaz.

---

### Sahne 13 – Videoyu Geri Sar: Sentez
**Süre:** 45 sn | **Öğrenme amacı:** Tüm kuralları tek bir hikâyede kullanmak; "kök = geri sarma" fikrini pekiştirmek; kural defterini tamamlamak.

**Anlatım:**
- "Yeni bir video. Bu kez 12 turda 2¹² = 4096 kişiye ulaştı. Yolculuğun tam ortasında kaç kişi vardı?"
- "√4096 = √(2¹²) = 2⁶ = 64. Ortadaki 64 kişi; her biri 64 kişi daha yaptı."
- "Başka bir zincirde herkes 3 kişiye yolluyor. 4. turda 3⁴ = 81 kişi var. 2. turda (ortada) kaç kişi vardı? √81 = 9 = 3². Gördün mü: kök, videoyu geri sarmak ve sayacı yarıya bölmek."

**Görsel & animasyon:**
1. [0–3 sn] Zaman şeridi (S8'deki gibi) 0–12 tur; sağ uçta "4096 kişi (2¹²)". Tutamaç (KÖK) başlangıçta sağ uçtadır.
2. [3–7 sn] Öğrenci tutamacı yarıya kadar sürükler (6. tur). Canlı hesap: "√4096 = √(2¹²) = (2¹²)^(1/2) = 2⁶ = 64". Kontrol: "64 · 64 = 4096 ✓" (4096 = 64·64: 64·60 = 3840, 64·4 = 256, toplam 4096 ✓).
3. [7–12 sn] İkinci zincir: taban 3, 4 tur, "81" sağ uçta. Ortada (2. tur) "9 = 3²" belirir; "√81 = 9 çünkü 9·9 = 81".
4. [12–18 sn] **Kural defteri** sahnede büyür: önceki 12 sahnenin kural satırları tek bir panoda 3 sütun halinde toplanır (üs yasaları | sıfır-negatif üs | kök). Her satır KÖK renkli halka ile "yankılanır".
5. [18. sn–] Kapanışa geçiş: "Şimdi kendini dene" düğmesi.

**Etkileşim:**
- **Çoktan seçmeli:** "Bir videoda 3 kişiye yollanıyor; 6. turda 3⁶ = 729 kişi var. Ortada (3. turda) kaç kişi vardı?" – A) 243 **B) 27** C) 364,5 D) 18
  - **A (243):** "243 = 3⁵ (5. tur). Ortada olmayan bir tur seçmişsin."
  - **C (364,5):** "729/2 mi aldın? Kök, bölmek değil. 27·27 = 729."
  - **D (18):** "729 = 27² ve 18² = 324; hatalı. √729 = 27."
  - **B:** "Doğru: √729 = 27 = 3³."
- **Devam:** Kapanışa.

**Ekran notu / kural kutusu (tüm ders):**
> aᵐ·aⁿ = aᵐ⁺ⁿ | aᵐ/aⁿ = aᵐ⁻ⁿ | (aᵐ)ⁿ = aᵐ·ⁿ | (ab)ⁿ = aⁿbⁿ | a⁰ = 1 | a⁻ⁿ = 1/aⁿ | **√a = a^(1/2)**
> √a·√b = √(ab) | 6/√3 = 2√3 | **√(a+b) ≠ √a + √b**

---

## 5. KAPANIŞ

### 5.1 Mini sınav (5 soru, her biri çoktan seçmeli)

**Soru 1.** 3² · 3⁴ işleminin sonucu aşağıdakilerden hangisidir?
- A) 3⁸
- **B) 3⁶** ✓
- C) 9⁶
- D) 6⁶

| Şık | Açıklama |
|---|---|
| **B (doğru)** | Aynı tabanda çarpmada üsler toplanır: 2 + 4 = 6. Kontrol: 9·81 = 729 = 3⁶. |
| A) 3⁸ | **Y2:** Üsleri çarpmış (2·4). Oysa 2 tane 3 ile 4 tane 3 yan yana yazılınca 6 tane 3 olur. |
| C) 9⁶ | **Y3:** 3·3 = 9 diyerek tabanları çarpmış, üsleri toplamış. Taban aynı kalır. |
| D) 6⁶ | Tabanları toplamış (3 + 3 = 6). Üs yasaları tabanlarla işlem yapmaz. |

**Soru 2.** (2³)² / 2⁴ ifadesinin eşiti nedir?
- A) 2¹
- **B) 2²** ✓
- C) 2^(3/2)
- D) 2¹⁰

| Şık | Açıklama |
|---|---|
| **B (doğru)** | (2³)² = 2⁶ (üsler çarpılır); 2⁶ / 2⁴ = 2⁶⁻⁴ = 2² = 4. Kontrol: 64/16 = 4. |
| A) 2¹ | **Y6:** (2³)² için 3 + 2 = 5 almış, sonra 5 − 4 = 1 yapmış; üssün üssünde üsler toplanmaz, çarpılır. |
| C) 2^(3/2) | **Y5:** Önce 6 ÷ 4 demiş (üsleri bölmüş). Bölmede üsler bölünmez, çıkarılır (6 − 4 = 2). |
| D) 2¹⁰ | **Y5:** Bölmede üsleri toplamış (6 + 4). Bölme sayaçları geri sarar (çıkarır). |

**Soru 3.** 9^(1/2) · 5⁰ − 2⁻¹ işleminin sonucu kaçtır?
- **A) 5/2** ✓
- B) 4
- C) −1/2
- D) 5

| Şık | Açıklama |
|---|---|
| **A (doğru)** | 9^(1/2) = √9 = 3; 5⁰ = 1; 2⁻¹ = 1/2. Hesap: 3·1 − 1/2 = 5/2. |
| B) 4 | **Y10:** 9^(1/2)'yi "yarısı" sanıp 4,5 almış (4,5·1 − 0,5 = 4). Üs 1/2 kök demektir, yarıya bölme değil. |
| C) −1/2 | **Y8:** 5⁰ = 0 almış (3·0 − 1/2). Sıfırıncı kuvvet 1'dir. |
| D) 5 | **Y9:** 2⁻¹ = −2 almış, sonra 3 − (−2) = 5 yapmış. Negatif üs sayıyı negatif yapmaz, ters çevirir (1/2). |

**Soru 4.** √8 + √18 ifadesinin eşiti aşağıdakilerden hangisidir?
- **A) 5√2** ✓
- B) √26
- C) 13
- D) 6√2

| Şık | Açıklama |
|---|---|
| **A (doğru)** | √8 = 2√2, √18 = 3√2 (çiftler dışarı). 2√2 + 3√2 = 5√2 ≈ 7,07. |
| B) √26 | **Y13/Y15:** Kök içlerini toplamış (8 + 18 = 26): √(a+b) ≠ √a + √b. √26 ≈ 5,10, oysa toplam ≈ 7,07. |
| C) 13 | **Y10:** Kökü "yarısı" sanmış (8/2 = 4, 18/2 = 9, 4 + 9 = 13). |
| D) 6√2 | Katsayıları çarpmış (2·3 = 6). Benzer köklü terimlerde katsayılar **toplanır** (2 + 3 = 5). |

**Soru 5.** 6/√3 ifadesinin paydası rasyonel yapılırsa sonuç ne olur?
- **A) 2√3** ✓
- B) 2
- C) 6√3
- D) √3/2

| Şık | Açıklama |
|---|---|
| **A (doğru)** | √3/√3 = 1 ile genişletilir: (6·√3)/(√3·√3) = 6√3/3 = 2√3 ≈ 3,46. |
| B) 2 | **Y10/Y14:** √3'ü 3 sanıp 6/3 = 2 almış. √3 ≈ 1,73'tür; 6/1,73 ≈ 3,46, 2 değil. |
| C) 6√3 | **Y14:** Yalnızca paya √3 ile çarpmış, paydayı unutmuş; 6√3 ≈ 10,39 olur, değer değişir. |
| D) √3/2 | Pay ile paydayı ters çevirmiş / karıştırmış. 6/√3 ≈ 3,46, √3/2 ≈ 0,87. |

*(Sınavda her yanlış şık seçiminde ilgili açıklama, doğru şık bulunana kadar ekranda gösterilir; doğru şıkta ilgili sahneye "tekrar izle" bağlantısı sunulur: S1→Soru 1, S5→Soru 2, S6/S9→Soru 3, S10–S12→Soru 4, S11→Soru 5.)*

### 5.2 "Bugün ne öğrendik?" (3 madde)

1. **Üs bir sayaçtır.** Çarpınca sayaçlar toplanır, bölünce çıkarılır, üssün üssünde çarpılır; geri sararak a⁰ = 1 ve a⁻ⁿ = 1/aⁿ bulunur.
2. **Kök, sayacı yarıya bölmektir:** √a = a^(1/2). Bu yüzden köklü sayılar aynı kurallara uyar: √a·√b = √(ab), çiftler kökten dışarı çıkar, benzer kökler toplanır, 6/√3 = 2√3.
3. **Kural çarpmaya dağılır, toplamaya dağılmaz:** √(a+b) ≠ √a + √b; √(9+16) = 5 ama √9 + √16 = 7. Şüphe edersen küçük bir sayısal örnekle kontrol et.

---

## 6. GÖRSEL TASARIM ÖNERİSİ (bu konuya özel)

**Genel yaklaşım:** Koyu, sakin, sade bir "ders defteri" havası. Çocuksu karakter yok. Hikâye (video) yalnızca ağaç diyagramı ve sayaç olarak bulunur. (Genel tasarım dili sonra eklenecek; aşağıdakiler bu konuya özgü metafor ve renk önerileridir.)

1. **Ana metafor – "çarpan blokları ve sayaç":** Her çarpan, aynı boyutta (44×44) bir TABAN renkli blok. Üs, bu blokları sayan ÜS renkli parantez/rakamdır. Soyut kuralların tamamı (toplama, çıkarma, çarpma) **blokları yan yana koymak, eşleştirip götürmek, ızgara kurmak** olarak gösterilir. Böylece "neden?" sorusu görselle cevaplanır.
2. **Renk sözlüğü sabit (bkz. renk anahtarı):** amber = taban/çarpan, camgöbeği = üs/sayaç, yeşil = onay, mercan = tuzak/yanlış, mor = kök/yarı yol, turuncu = geri sarma. Her sahnede renkler aynı anlamı taşır; öğrenci renkten kuralı hatırlar.
3. **Zaman şeridi (S8–S9, S13):** Yatay, 0'dan N'ye işaretli bir çizgi; tutamaç bir "geri sar" düğmesi gibi davranır. Kök = tutamacı tam ortaya çekmek. Bu, "kök = geri sarma" metaforunun tek kalıcı arayüz öğesidir.
4. **Kare alan metaforu (S8, S10):** √a = alanı a olan karenin kenarı. Çarpmadaki kök kuralı için dikdörtgen ve kare alan karşılaştırması kullanılır.
5. **Çiftler dışarı (S10):** Asal çarpan chip'leri "kök çatısı" altında çiftlenir; çiftler yukarı fırlar. Tutarlı bir jest: **çift = dışarı, tek = içeride**.
6. **Elma–armut kutuları (S11):** Aynı kök = aynı renkli kutu; farklı kök = farklı renk ve birleşmeye çalışınca geri iter.
7. **Hareket dili:** Yumuşak ease-in-out, 0,3–0,8 sn aralıklar. Yanlış cevapta sert flaş yok; yalnızca kısa titreşim ve renk değişimi. Konfeti yok; başarıda halka dalgası ve ✓.
8. **Yazı:** Matematik ifadeleri için KaTeX/MathJax benzeri sayfa içi mizanpaj ya da özel SVG; üstler ve kök sembolü net (en az 32 px). Altyazı 20 px, yüksek kontrast, ses metnine birebir.
9. **Erişilebilirlik:** Renk tek başına anlam taşımaz (✓, ✗, ≠ simgeleri ve etiketler her zaman birlikte). Her animasyon "yavaşlat" ve "tekrar oynat" düğmelerine sahip; tüm sürükle-bırak etkileşimlerinin klavye veya dokunmatik tıklama karşılığı bulunur.
10. **Opsiyonel ek (zaman kalırsa, ana akışta yok):** S11'e bağlı kısa bir kart: 1/(√3 − 1) = (√3 + 1)/2, çünkü (√3 − 1)(√3 + 1) = 3 − 1 = 2. ("Paydada toplam olursa eşleniğiyle genişletiriz" – sonraki derse köprü.)
