# Gerçek Sayı Aralıkları ve Küme Sembolleri — Etkileşimli Ders Senaryosu

> Kaynak hikâye: Lunapark boy sınırı. "140 cm ve üzeri" girer (dolu nokta), "190 cm'den kısa" girer (boş nokta). Görevli sayı doğrusunda kapı tutuyor.
> Taktik: Köşeli parantez = dahil = dolu nokta. Sonsuzun yanında hep açık (yuvarlak) parantez. ∩ "ve", ∪ "veya" demek.

---

## 1. Künye

| Alan | İçerik |
|---|---|
| **Ders adı** | 9. Sınıf Matematik / 1. Sayılar / Gerçek Sayı Aralıkları ve Küme Sembolleri |
| **Süre** | Yaklaşık 13 dk etkileşimli (sahneler ≈ 10 dk 20 sn, kapanış sınavı + özet ≈ 3 dk) |
| **Format** | Tek sayfa web animasyonu; sahneler sırayla ilerler, sahne içi etkileşimler tamamlanmadan "Devam" düğmesi açılmaz (sahne 1 hariç). |

### Kazanımlar (ölçülebilir)
Bu dersin sonunda öğrenci:

1. Bir eşitsizliği (ör. `−3 < x ≤ 2`) sayı doğrusunda doğru dolu/boş noktalarla gösterir ve tersini yapar.
2. Verilen bir gerçek sayı aralığını `(a,b)`, `[a,b]`, `[a,b)`, `(a,b]` türlerine ayırır; uç noktanın aralığa dahil olup olmadığını gerekçesiyle söyler.
3. Tek yönlü aralıkları (`[a,∞)`, `(−∞,b)`) yazar ve ∞ sembolünün yanında neden daima açık parantez kullanıldığını açıklar.
4. Aynı kümeyi dört biçimde yazar ve biçimler arasında dönüşüm yapar: eşitsizlik ⇄ aralık ⇄ sayı doğrusu ⇄ küme gösterimi (`x ∈ [140,190)` ve `{x : 140 ≤ x < 190, x ∈ ℝ}`).
5. İki aralığın kesişimini (∩) ve birleşimini (∪) sayı doğrusu üzerinden bulur; uç noktaların dahil/hariç durumunu doğru belirler.
6. Boş küme sonuçlarını (`5 < x < 2`, `[2,5) ∩ [5,9]`) ve tek elemanlı küme sonuçlarını (`[2,5] ∩ [5,9] = {5}`) ayırt eder.

### Ön bilgi
- Sayı doğrusu, sayıların sıralanması; ℕ, ℤ, ℚ, ℝ sembolleri (ℝ: sayı doğrusunun tamamı).
- `<`, `>`, `≤`, `≥` işaretlerinin okunuşu.
- Küme, eleman (`∈`), küme tanımı kavramları; ∩ ve ∪ sembolünü ilk kez duymuş olmak yeterli (ders bunları kurar).
- Ondalık sayılar da gerçek sayıdır (139,9 cm bir boydur).

---

## 2. Ana fikir ve kavram haritası

**Ana fikir (tek cümle):** Bir gerçek sayı aralığı, sayı doğrusunda kesintisiz bir parçadır ve uç noktaların "içeride mi, dışarıda mı" olduğu dolu/boş nokta ile (köşeli/yuvarlak parantezle) söylenir; ∩ "ikisi birden (ve)", ∪ "en az biri (veya)" demektir.

**Kavram haritası**

```
                 Boy kuralı (günlük dil: "140 ve üzeri", "190'dan kısa")
                                   │
                 EŞİTSİZLİK   x ≥ 140 ,  x < 190
                      │  (uç nokta dahil mi?  evet → ≥ ≤ | hayır → < >)
                      ▼
         SAYI DOĞRUSU: dolu nokta ● (dahil)  /  boş nokta ○ (hariç)  /  → ∞
                      │
      ┌───────────────┼──────────────────────────┐
      ▼               ▼                          ▼
ARALIK GÖSTERİMİ   KÜME GÖSTERİMİ          SONSUZ UÇLAR
 [a,b] kapalı     {x : a ≤ x < b, x∈ℝ}      ∞ sayı değil, ulaşılmaz
 (a,b) açık        x ∈ [a,b)                 → hep "(" ya da ")"
 [a,b) (a,b] yarı açık                       (−∞,b)  [a,∞)  (−∞,∞)=ℝ
      │
      ▼
  İŞLEMLER:  ∩ KESİŞİM ("ve": iki kapıdan da geçen)   ∪ BİRLEŞİM ("veya": en az birinden geçen)
      │
      ▼
  SONUÇ TÜRLERİ: aralık | iki parçalı küme | tek nokta {5} | boş küme ∅
```

---

## 3. Yanlış kavramalar listesi

| Kod | Yanlış kavrama | Hangi sahnede çürütülür | Çürütme yöntemi |
|---|---|---|---|
| Y1 | `(2,5)` ile `[2,5]` aynı sanılır; uç nokta farkı önemsenmez | S3, S5, S6 | Tam 140 cm'lik çocuk kapıda: girer / girmez. Sayı doğrusunda dolu-boş nokta farkı canlı gösterilir. |
| Y2 | `≥` ile `>` karıştırılır; "ve üzeri" ile "den uzun" aynı sanılır | S2, S3 | İki ayrı tabela yan yana: tek fark 140 cm'deki ampul. |
| Y3 | "190'dan kısa en uzun boy 189'dur" (gerçek sayılarda "bir sonraki sayı" yoktur) | S4, S8 | Büyüteç: 189,9 → 189,99 → 189,999 … sonu yok. Aynı kural ℤ ile gerçekten 189 olur (S8 karşılaştırması). |
| Y4 | ∞ için köşeli parantez: `[140,∞]` | S7 | "Hep ileri git" koşucusu: ∞ yaklaştıkça uzaklaşır; ∞'a nokta konamaz. |
| Y5 | ∩ ile ∪ karıştırılır ("ve" / "veya" karışır) | S9, S10 | ∩ kapı kemeri (iki kapıdan da geçmek), ∪ bardak (iki koldan da toplamak) metaforu; slider ile test. |
| Y6 | Eşitsizlik yönü ters okunur: `x ≥ 140` yazıp `(−∞,140]` seçmek | S2, S8 | Çocuk slider'ı: 150 geçiyor, ışık sağ yönde yanıyor. |
| Y7 | Küçük olan sağa yazılır: `[5,2]`, `5 < x < 2` | S11, S12 | "Önce küçük, sonra büyük" kuralı; 5<x<2'yi sağlayan sayı bulma denemesi başarısız olur. |
| Y8 | Kesişim boşken boş küme yerine "0" ya da "{0}" yazma; boş kümeyi tek noktayla karıştırma | S11 | `[2,5) ∩ [5,9] = ∅` ile `[2,5] ∩ [5,9] = {5}` karşılaştırması. |
| Y9 | Birleşimde ayrık parçaları tek aralıkmış gibi yazma: `[100,130] ∪ [140,190)` → `[100,190)` | S10 | 135 cm'lik çocuk hiçbir oyuncağa giremez; boşluk görünür kalır. |
| Y10 | Birleşimde iki aralığın birleştiği noktayı unutma: `[100,140) ∪ (140,190)` aralıksız sanılır | S10, S11 | 140 cm'lik çocuk her iki kapıda da dışarıda; "delik" animasyonu. |
| Y11 | ℝ'deki aralık ile ℤ'deki noktaları karıştırma (`x ∈ ℝ` yazmayı unutma) | S8 | `{x : 140 ≤ x < 190, x ∈ ℤ}` seçilince aralık noktalara dağılır. |
| Y12 | "veya" tek seçenekli ("ya biri ya öteki") sanılır | S10 | Her iki oyuncağa da girebilen çocuk "veya"da yine içeride kalır. |

---

## 4. Sahneler

**Genel koordinat sistemi (yazılımcı notu):** Tuval mantıksal olarak 1280×720'dir. Sayı doğrusu yatay çizgisi `y = 400`'dedür. Bir değerin ekran konumu `X(v) = x0 + k·(v − vmin)` ile verilir; her sahnede `x0`, `k`, `vmin`, `vmax` ayrıca belirtilmiştir. Çizgi kalınlığı 4 px, ana tik yüksekliği 24 px (y 388–412), etiketler `y = 440`. Dolu nokta: çap 22 px içi dolu daire. Boş nokta: çap 22 px, iç rengi arka planla aynı, kenar 4 px (renk, nokta rengiyle aynı). Dolu/boş ayrımı yalnızca renkle değil **şekille** verilir (erişilebilirlik).

---

### Sahne 1 – Lunapark kapısı | 40 sn | Amaç: Bir kuralın "kimin geçtiği" sorusu olduğunu ve boy değerlerinin sürekli (ondalıklı) olabileceğini fark etmek

**Anlatım (altyazı/ses metni):**
"Lunaparkın en hızlı treni için kapıdaki görevli boy kontrolü yapıyor. Tabelada yazan: boy 140 cm ve üzeri, 190 cm'den kısa. Kimin geçeceğini bir de sayı doğrusuyla görebilir miyiz? Önce çocuğu hareket ettirip kapıyı kendin dene."

**Görsel & animasyon:**
- 0–2 sn: Arka plan koyu lacivert (#0F1420). Üstte lunapark ampul dizisi (12 küçük daire, sarı #FFC857, sırayla 120 ms aralıkla yanıp söner).
- 2–4 sn: Ortada kapı illüstrasyonu (sade çizgisel kemer, ∩ biçiminde, x 560–720, y 150–330). Kemerin altında "HIZ TRENİ" levhası, yanında tabela: "BOY: 140 cm ve üzeri · 190 cm'den kısa".
- 4–6 sn: Alt kısımda sayı doğrusu belirir (soldan sağa çizilir, 800 ms). Ölçek: `vmin=100, vmax=200, x0=140, k=10` (yani `X(100)=140`, `X(140)=540`, `X(190)=1040`, `X(200)=1140`). Ana tikler 100, 120, 140, 160, 180, 200 etiketli (cm), ara tikler 10 cm'de bir.
- Çizginin üzerinde boy göstergesi: sürüklenebilir çocuk simgesi (basit figür, yüksekliği boyla orantılı: 100 cm → 60 px, 200 cm → 120 px; simge çizginin üstünde, tutamak noktası `y=400`). Başlangıç değeri 120.
- Çocuk 120'deyken kapı kemeri **koral** (#FF6B6B) yanar, ekranda "GEÇEMEZ" etiketi.
- Çocuk 140–190 arasına girdiğinde kemer **mint** (#3DDC97) yanar, "GEÇER" etiketi.

**Etkileşim:**
- Serbest keşif: öğrenci çocuğu sürükler (adım 0,1 cm, ekranda boy değeri `139,9 cm` biçiminde ondalıklı yazılır).
- En az 2 farklı geçme durumu (geçer/geçemez) görüldüğünde "Devam" düğmesi açılır. (Zorunlu sınama yok.)
- Ondalık değerler görünürse küçük balon: "Boy 139,9 da olabilir. Aralarda sonsuz çok sayı var!" (yalnızca ilk kez).

**Ekran notu / kural kutusu:** *Kural: Tabela bir sayı kümesini tarif eder: kim geçer, kim geçmez.* (Sahne sonunda sol üst köşede küçük kutu olarak kalır.)

---

### Sahne 2 – Kuralı eşitsizlikle yaz | 50 sn | Amaç: Günlük dildeki kuralı eşitsizliğe çevirmek, sağ/sol yönü sayı doğrusunda görmek

**Anlatım:**
"'Boy 140 cm ve üzeri' demek, boy 140'a eşit ya da daha büyük demek. Matematikte bunu x ≥ 140 yazarız. Peki x ≥ 140 koşulunu sağlayanlar sayı doğrusunda nerede toplanır? Önce tahmin et."

**Görsel & animasyon:**
- Sayı doğrusu sahne 1'dekiyle aynı ölçek (`x0=140, k=10, vmin=100`). Tabela ekranın üstüne taşınır, altında kural kutusu: "x = boy (cm)".
- Tabela cümlesi "140 cm **ve üzeri**" kelimeleri vurgulanır (altı sarı çizilir), sonra dönüşüm animasyonu: cümle → `x ≥ 140` (karakterler tek tek yer değiştirir, 1,2 sn).
- Tahmin sonrası: `X(140)=540`'tan sağa doğru mint renkli kalın çizgi (8 px) çizilir, `X(200)=1140`'a kadar 1,5 sn. Sola doğru kalan kısım gri (#3A4560).
- Çocuk simgesi 540'ta durur; aşağıya "x = 140" yazılı küçük etiket.

**Etkileşim:**
- **Tahmin et:** "x ≥ 140 koşulunu sağlayanlar hangi tarafta?" Seçenekler: (a) 140'ın solunda, (b) 140'ın sağında, (c) yalnız 140'ta.
  - Doğru (b): mint çizgi sağa doğru uzar, çocuk slider'ı serbest bırakılır; geri bildirim: "Evet. ≥ işareti 'büyük ya da eşit' demek; büyükler sağda durur."
  - Yanlış (a): çizgi önce sola çizilir, çocuk 120'ye konur → kemer koral yanar; geri bildirim: "Sola doğru gidince boy kısalıyor, kapı açılmıyor. Büyük sayılar sağda." (Y6)
  - Yanlış (c): geri bildirim: "Yalnız 140 olsaydı 150 cm'lik çocuk geçemezdi. Ama 150 geçiyor, dene!" Slider 150'ye gider.
- Öğrenci bir "deneme" yapar: çocuğu 3 farklı değere sürükler; her seferinde yanında eşitsizlik doğru/yanlış ikonu belirir (150 ≥ 140 ✓, 139 ≥ 140 ✗, 140 ≥ 140 ✓).

**Ekran notu / kural kutusu:** *"... ve üzeri / en az" → `≥`. Büyük sayılar sağda.*

---

### Sahne 3 – Tam 140 cm ise? Dolu nokta ve boş nokta | 50 sn | Amaç: Uç noktanın dahil/hariç olması ihtiyacından dolu ve boş noktayı doğurmak (Y1, Y2)

**Anlatım:**
"Kapıdaki görevlinin önünde tam 140 cm boyunda bir çocuk var. Girebilir mi? 'Ve üzeri' dediği için girer. Bu yüzden 140'ı dolu nokta ile işaretleriz. Ama tabelada 'sadece 140 cm'den uzun olanlar' yazsaydı, 140 cm'lik çocuk girmezdi; o zaman noktayı boş bırakırdık."

**Görsel & animasyon:**
- Ekranda iki tabela alt alta (sol hizalı, y=130 ve y=250):
  - Tabela A: "Boy 140 cm **ve üzeri**" (kural: `x ≥ 140`), altına sayı doğrusu şeridi: `X(140)=540`'tan sağa mint çizgi.
  - Tabela B: "Boy 140 cm'den **uzun**" (kural: `x > 140`), aynı şerit.
- Başlangıçta 540'ta nokta yok, sadece iki şerit. Çocuk simgesi tam 140.0 cm'de duruyor ve ekrana "tam 140,0 cm" yazılıyor.
- Tahmin sonrası: A şeridinin ucunda **dolu daire** (mint, çap 22) büyür (300 ms "pop"). B şeridinin ucunda **boş daire** (mint kenarlı, içi arka plan) belirir.
- Çocuk simgesi A'da kapıdan geçer (yeşil ışık), B'de kapıda durur (koral ışık, kollar çapraz).
- Altta iki küçük kural satırı belirir: "● dolu nokta: bu sayı DAHİL (≤ veya ≥)", "○ boş nokta: bu sayı HARİÇ (< veya >)".

**Etkileşim:**
- **Tahmin et (iki aşamalı):** "Tam 140,0 cm'lik çocuk A kapısından geçer mi?" (Geçer / Geçmez), sonra B için aynısı.
  - A için "Geçer" doğru: dolu nokta yanar. Geri bildirim: "Tabela 've üzeri' diyor; 140 de üzerindekilerin içinde sayılır."
  - A için "Geçmez" yanlış: çocuk kapıya gider, görevli "ve üzeri" ifadesini işaretler, kemer yeşil yanar. Geri bildirim: "Eşitlik de kuralın içinde; dolu nokta bunu söyler." (Y2)
  - B için "Geçmez" doğru: boş nokta oluşur. Geri bildirim: "Uzun demek 140'tan büyük; 140'ın kendisi büyük değil."
  - B için "Geçer" yanlış: kapı kırmızı yanar. Geri bildirim: "Uzun, 140'a eşit olanı kapsamaz. Boş nokta: 'bu noktaya kadar gel, ama kendisi dahil değil'." (Y1)
- Sonra **sürükle-bırak:** Sol tarafta iki sembol (● ve ○) var; öğrenci doğru sembolü A ve B şeritlerinin uç noktasına sürükler (yanlış yere bırakırsa nokta geri döner).

**Ekran notu / kural kutusu:** *● dolu nokta: `≤`, `≥`; sayı DAHİL.  ○ boş nokta: `<`, `>`; sayı HARİÇ.*

---

### Sahne 4 – 190'dan kısa: "En uzun kim?" | 50 sn | Amaç: Boş noktanın neden gerekli olduğunu kavramak; iki kuralı "ve" ile birleştirerek ilk kapalı-açık aralığı oluşturmak (Y3)

**Anlatım:**
"Tabelada ikinci kural: 190 cm'den kısa. Yani x < 190. Burada 190 dahil değil. Merak edelim: 190'dan kısa olup girebilen en uzun çocuk kaç cm? 189 mu? Büyüteçle bakalım."

**Görsel & animasyon:**
- Sayı doğrusu, aynı ölçek (`x0=140, k=10, vmin=100`). `X(190)=1040`.
- 190'a boş nokta konur (mint kenar). Solda 100'e kadar mint çizgi (yani `x<190`), sağda gri.
- **Büyüteç animasyonu** (3,5 sn): 190 çevresinde yuvarlak büyüteç belirir; içinde yerel ölçek 10× büyür, sonra tekrar 10×: etiketler sırayla `189` → `189,9` → `189,99` → `189,999`. Her ölçekte "son nokta" 190'dan hep biraz önce durur ve yeni bir daha büyük sayı sığar.
- Her adımda küçük çocuk simgesi bir adım daha ileri kayar ama kapıya hiçbir zaman "190"ı ulaşamaz.
- Ardından ilk kural (`x ≥ 140`, dolu nokta 540) ile ikinci kural (`x < 190`) aynı şeritte "ve" ile birleşir: yalnızca 540–1040 arası mint çizgi kalır; kalanı griye döner. Sol uç dolu, sağ uç boş.
- Şeridin üstünde süslü yazı: "140 ≤ x **ve** x < 190" → "140 ≤ x < 190" (iki eşitsizlik tek satırda birleşir, 1 sn).

**Etkileşim:**
- **Tahmin et:** "190'dan kısa girebilen en uzun boy kaç?" Seçenekler: (a) 189 cm, (b) 189,9 cm, (c) 189,99 cm, (d) En uzun boy diye bir şey yok.
  - (d) doğru: büyüteç devam eder, son soru işareti belirir. Geri bildirim: "Evet! 190'a ne kadar yaklaşırsan yaklaş, aralarında daha büyük bir sayı var. En büyük elemanı olmayan bir parça, o yüzden uç nokta boş nokta."
  - (a), (b) ya da (c): büyüteç o değerden bir adım ötesini gösterir (ör. (a) için 189,5 çıkar). Geri bildirim: "Bak, senden uzun biri daha girebiliyor: 189,5 < 190. Bu böyle sonsuza kadar gider." (Y3)
- Slider tekrar açılır: öğrenci çocuğu 190'a getirmeyi dener; 189,999'a kadar yeşil, 190,0'da kırmızı.

**Ekran notu / kural kutusu:** *Gerçek sayılarda "bir sonraki sayı" yoktur. Bu yüzden `x < 190` aralığının en büyük elemanı yoktur; 190 boş nokta ○ ile gösterilir.*  
*`140 ≤ x < 190`: sol uç ● dahil, sağ uç ○ hariç.*

---

### Sahne 5 – Aralığı sen kur: parantez dili | 55 sn | Amaç: Dolu/boş nokta düzenini aralık gösterimine bağlamak; köşeli = dahil (Y1)

**Anlatım:**
"Şimdi bu çizgiyi tek bir sembolle yazalım. Sol uç 140, sağ uç 190. Uç noktayı alıyorsak köşeli parantez, almıyorsak yuvarlak parantez kullanırız. Köşeli parantez sayıyı kucaklar, yuvarlak parantez dışarıda bırakır. Bizim kural: 140 dahil, 190 hariç. Yani [140, 190)."

**Görsel & animasyon:**
- Sahne 4'ün çizgisi ekrana oturur: dolu nokta 540, boş nokta 1040. Altına `[ 140 , 190 )` yazısı sırayla belirir:
  1. 0–1 sn: "140" mint renkle belirir.
  2. 1–2 sn: sol nokta ●'den bir "[" parantezi doğar ve sol uca yapışır.
  3. 2–3 sn: "190" belirir; ○'dan ")" parantezi doğar.
- Parantez simgeleri iki biçimde canlandırılır: "[" koşulu sayıya "kapı" gibi dayanır (kapalı), ")" ise kavisli kenarıyla sayıyı dışarıda bırakır.
- Sağ altta "Aralığı sen kur" etkileşim alanı: yeni sayı doğrusu `vmin=0, vmax=10, x0=140, k=100` (yani `X(v)=140+100v`; `X(3)=440`, `X(7)=840`). Noktalar tıklanabilir.

**Etkileşim: "Aralığı sen kur" (3 görev)**
Her görevde sayı doğrusunda iki nokta vardır (varsayılan: boş). Öğrenci noktaya tıklayarak **boş ↔ dolu** değiştirir; altta canlı aralık gösterimi güncellenir.
1. Görev 1: `3 ≤ x < 7` → 3 dolu, 7 boş. Beklenen: `[3, 7)`.
2. Görev 2: `2 < x ≤ 9` → 2 boş, 9 dolu. Beklenen: `(2, 9]`.
3. Görev 3: Tersine: ekranda `(1, 6)` yazılı; öğrenci noktaları doğru ayarlar → 1 ve 6 boş.
- Doğru olunca: nokta yeşil parlar, yazı sabitlenir. Geri bildirim: "Köşeli: sayı içeride. Yuvarlak: sayı dışarıda."
- Yanlış (ör. görev 1'de 7 dolu bırakılır): altta `[3, 7]` yazısı çıkar, kırmızı uyarı: "Bu aralıkta 7 de var. Oysa kural `x < 7`; 7'nin kendisi aralığa girmiyor." Nokta kendi kendine boşalır (Y1).
- İpucu düğmesi (isteğe bağlı): küçük bir "test çocuğu" tam 7 değerini taşır ve uç noktanın "içeride mi dışarıda mı?" olduğunu gösterir.

**Ekran notu / kural kutusu:** *`[` ve `]`: uç nokta DAHİL ●. `(` ve `)`: uç nokta HARİÇ ○. Önce küçük sayı, sonra büyük sayı: `[a, b]` için `a < b`.*

---

### Sahne 6 – Dört kapı, dört tür aralık | 50 sn | Amaç: Açık, kapalı, yarı açık aralıkları tanımak ve adlandırmak (Y1)

**Anlatım:**
"Uç noktaların dahil olup olmamasına göre dört tür aralık çıkar. İkisi de dışarıdaysa açık aralık; ikisi de içerideyse kapalı aralık. Biri içeride, biri dışarıdaysa yarı açık ya da yarı kapalı aralık denir. Lunaparkta dört farklı tabelayı eşleştirelim."

**Görsel & animasyon:**
- Dört kart (2×2 ızgara), her kartta lunapark tabelası ve altında boş bir sayı doğrusu şeridi:
  - K1: "Boy **140 ve üzeri, 190 ve altı**" → `140 ≤ x ≤ 190` (kapalı), mint renkli iki dolu nokta.
  - K2: "Boy **140'tan uzun, 190'dan kısa**" → `140 < x < 190` (açık), iki boş nokta.
  - K3: "Boy **140 ve üzeri, 190'dan kısa**" → `140 ≤ x < 190`.
  - K4: "Boy **140'tan uzun, 190 ve altı**" → `140 < x ≤ 190`.
- Her kartın ölçeği: `vmin=100, vmax=200, x0=140, k=10` ancak kart içinde yarı boyutta çizilir (`k=5`, `x0=200`).
- Alt sırada sürüklenebilir dört etiket: `[140, 190]`, `(140, 190)`, `[140, 190)`, `(140, 190]`.

**Etkileşim: eşleştirme (sürükle-bırak)**
- Öğrenci etiketleri doğru tabelaya sürükler.
- Doğru bırakma: etiket kartın altına yapışır, nokta türleri etikete uygun yanar. Geri bildirim: ör. K3 için "Sol köşeli: 140 içeride. Sağ yuvarlak: 190 dışarıda."
- Yanlış bırakma: etiket geri sıçrar; kartta ilgili uç nokta yanıp söner ve çocuk simgesi o uç nokta boyunda (140 veya 190) kapıya gider; sonuç gösterilir. Örnek: `(140,190]` etiketi K3'e bırakılırsa çocuk 140 cm ile gelir, K3 kapısından geçer, ama etiket 140'ı dışarıda sayıyor; uyuşmazlık okuması: "140 sende içeride, bu etikette dışarıda. Bu başka bir tabela."
- Sonuna doğru ad etiketleri belirir: K1 "kapalı aralık", K2 "açık aralık", K3 "yarı açık aralık (solu kapalı, sağı açık)", K4 "yarı açık aralık (solu açık, sağı kapalı)".
- Mini kontrol (tek soru, hızlı): "[−2, 3) aralığında −2 var mı, 3 var mı?" Doğru: −2 var, 3 yok.

**Ekran notu / kural kutusu:**
*`[a,b]` kapalı · `(a,b)` açık · `[a,b)` ve `(a,b]` yarı açık (yarı kapalı).  Her uç noktaya kendi başına bak: köşeli = dahil, yuvarlak = hariç.*  
*Not: Bazı kitaplarda açık uç `]a,b[` biçiminde yazılır; bu derste yuvarlak parantez kullanıyoruz.*

---

### Sahne 7 – Sonsuz neden hep açık? | 50 sn | Amaç: ∞'nin sayı olmadığını, ulaşılamadığını görmek; (−∞, b) ve [a, ∞) yazmak (Y4)

**Anlatım:**
"Bir de 'boy 140 cm ve üzeri' kuralına bakalım, üst sınır yok. Sağa doğru hep ilerleyebiliriz. Sonsuz simgesi ∞ bir sayı değil; 'bitmeyen gidiş' demek. Ona hiçbir zaman varamayız. Varamadığımız yeri aralığa dahil edemeyiz. O yüzden ∞'un yanında hep yuvarlak parantez olur."

**Görsel & animasyon:**
- Sayı doğrusu, `x0=140, k=10, vmin=100` (sağ uç 1140). `X(140)=540`'tan sağa mint çizgi uzanır, ekranın sağ kenarına kadar gider ve ok ucuyla taşar.
- Sağ kenarda "∞" levhası (bayrak) görünür (x≈1180).
- **Koşucu animasyonu** (5 sn): Çocuk simgesi koşmaya başlar. Her 1 sn'de ölçek 10× küçülür ve eksen etiketleri yeniden yazılır: `200 → 2 000 → 20 000 → 200 000 → 2 000 000`. Çocuk sağa gittikçe "∞" levhası sahnenin sağ kenarında hep aynı uzaklıkta kalır (yaklaştıkça kayar/uzaklaşır).
- Ekranın alt köşesinde sayaç: "Gittiğin yer: 2 000 000 …  ∞'a uzaklık: hâlâ sonsuz".
- **Kural tablosu:** Çizginin soluna `(−∞` ve sağına `∞)` yazılı iki bayrak çıkar.

**Etkileşim:**
1. **Tahmin et:** "Koşucu ∞'a varabilir mi?" (Varır / Hiçbir zaman varamaz). Doğru: "Hiçbir zaman." Yanlışsa koşucu 3 kez daha hızlanır ve yine yetişemez; geri bildirim: "Her sayının ötesinde daha büyük bir sayı var; ∞ bunların hiçbiri değil."
2. **Dene:** Öğrenci "∞ noktasına dolu nokta koy" düğmesini tıklar. Nokta yapışmaz, titreyip geri döner. Geri bildirim: "Dolu nokta 'bu sayı içeride' demek. ∞ bir sayı değil; içeride olabileceği bir yer yok." (Y4)
3. **Seç:** `x ≥ 140` için doğru yazım: (a) `[140, ∞]` (b) `[140, ∞)` (c) `(140, ∞)` (d) `(∞, 140]`.
   - (b) doğru. Geri bildirim: "140 dahil → köşeli, ∞ hariç → yuvarlak."
   - (a) yanlış: "∞ bir sayı değil; kapatılamaz." (Y4)
   - (c) yanlış: "140 dahil mi? Evet, ≥ var. Sol uç köşeli olmalı." (Y1)
   - (d) yanlış: "∞ soldan başlamaz; büyük sayılar sağda." (Y6)
4. **Sola doğru (kısa):** `x < 190` kuralı `(−∞, 190)` ile gösterilir (boş nokta 190, sol uçta −∞ levhası). Öğrenci yalnızca yazım için sürüklemeli eşleştirme yapar: `(−∞, 190)`.
- Son ekran: Tüm sayı doğrusu `(−∞, ∞) = ℝ`.
- Küçük not balonu: "Gerçek hayatta boy negatif olamaz; ama matematiksel kuralı `x < 190` diye yazınca solda sınır yok."

**Ekran notu / kural kutusu:** *∞ ve −∞ sayı değildir, uç olarak asla dahil edilemez. Yanlarında HER ZAMAN yuvarlak parantez: `(−∞, b]`, `[a, ∞)`, `(−∞, ∞) = ℝ`.*

---

### Sahne 8 – Dörtlü dönüşüm: eşitsizlik ⇄ aralık ⇄ sayı doğrusu ⇄ küme | 60 sn | Amaç: Aynı kümeyi dört dille yazmak ve küme gösteriminde `x ∈ ℝ`'nin önemini görmek (Y3, Y11)

**Anlatım:**
"Aynı bilgiyi dört şekilde yazabiliriz: eşitsizlik, aralık, sayı doğrusu ve küme. Küme gösteriminde x'in nereden seçildiğini de yazmamız gerekir. Bizim durumda x gerçek sayı, yani x ∈ ℝ. Eğer x sadece tam sayı olsaydı, durum değişirdi. Bir dönüştürücü makineyle deneyelim."

**Görsel & animasyon:**
- Ekranın ortasında dörtlü "dönüştürücü": dört panel (2×2), her biri bir gösterim:
  - P1 (sol üst): **Eşitsizlik** → `140 ≤ x < 190`
  - P2 (sağ üst): **Aralık** → `x ∈ [140, 190)`
  - P3 (sol alt): **Sayı doğrusu** → ●────○ mint şerit; panel içinde `vmin=100, vmax=200`, panel genişliği 500 px için `X(v) = 40 + 5·(v − 100)` (panel yerel koordinatı)
  - P4 (sağ alt): **Küme** → `{x : 140 ≤ x < 190, x ∈ ℝ}` (okunuşu altında: "x'ler öyle ki 140'a eşit ya da büyük, 190'dan küçük, x bir gerçek sayı").
- Paneller ok çizgileriyle birbirine bağlıdır (4 yönlü). Bir panel düzenlenirse diğer üçü 400 ms'de akıcı dönüşümle güncellenir.
- ℤ karşılaştırması: Küçük bir anahtar "x ∈ ℝ ↔ x ∈ ℤ". ℤ seçilirse P3'teki mint şerit **noktalara** parçalanır (140, 141, 142, …, 189 dolu noktalar; 190 yok), P4 `{x : 140 ≤ x < 190, x ∈ ℤ} = {140, 141, …, 189}` olur ve P2 "aralık değil" uyarısı verir ("Aralık gösterimi gerçek sayılar için; tam sayılarda noktalar tek tek sayılır"). Animasyon süresi 2 sn. Burada ilk kez "en uzun giren 189" doğru olur (Y3 ile ilişki).

**Etkileşim: üç mini görev (her biri tek panelden diğerlerini doldurma)**
1. Verilen: **P3** (doğru üzerinde `−3` boş, `2` dolu). Öğrenci P1 ve P2'yi yazar (seçmeli): P1 `−3 < x ≤ 2`, P2 `x ∈ (−3, 2]`. Doğru: P4 `{x : −3 < x ≤ 2, x ∈ ℝ}` otomatik tamamlanır.
2. Verilen: **P1** `x ≥ −1`. Öğrenci P2'yi seçer: `[−1, ∞)`. Yanlış seçenekler: `[−1, ∞]` (∞'a köşeli: Y4), `(−∞, −1]` (yön ters: Y6).
3. Verilen: **P4** `{x : x < 4, x ∈ ℝ}`. Öğrenci P3'ü çizer (4'e boş nokta + sola ok), P2 otomatik `(−∞, 4)`.
- Doğru her görevde üstte ✓ ve sesli ipucu; yanlışta ilgili panel kırmızı çerçeve ile yanıp söner ve ipucu: "Önce uç noktayı sor: kendisi içeride mi?"
- Dörtlü sonunda "↔ ℝ / ℤ" anahtarı bir kez daha oynatılır, öğrenciye soru: "ℤ'de 190'dan kısa en uzun çocuk kaç cm?" (Cevap 189, açılır not: "Tam sayılarda bir sonraki sayı var, o yüzden." ).

**Ekran notu / kural kutusu:** *Dört dil, tek anlam: `140 ≤ x < 190` ⇄ `x ∈ [140, 190)` ⇄ ●────○ ⇄ `{x : 140 ≤ x < 190, x ∈ ℝ}`.*  
*Küme gösteriminde "x ∈ ℝ" yazılmazsa hangi sayılardan söz edildiği belirsiz kalır.*

---

### Sahne 9 – Kesişim ∩: "iki kapıdan da geçen" | 60 sn | Amaç: ∩'yı "ve" olarak görselleştirmek; uç nokta kuralını bulmak (Y5, Y8)

**Anlatım:**
"Hız trenine binmek için iki kapıdan geçmek gerekiyor. Birincisi bilet kapısı: boy 140 ve üzeri, 190'dan kısa. İkincisi kemer kontrolü: boy 160'tan uzun, 200 ve altı. İkisinden birden geçen çocukların kümesine kesişim deriz ve ∩ ile yazarız. ∩ sembolü de zaten bir kapı kemerine benziyor."

**Görsel & animasyon:**
- Sayı doğrusu: `vmin=100, vmax=200, x0=140, k=10`. İki ayrı şerit üst üste:
  - Şerit A (amber #FFC857): `A = [140, 190)`: `X(140)=540` dolu, `X(190)=1040` boş. (y=330, kalınlık 10)
  - Şerit B (gökmavisi #5CC8FF): `B = (160, 200]`: `X(160)=740` boş, `X(200)=1140` dolu. (y=370, kalınlık 10)
- Ana doğru `y=400` üzerinde ortak kısım **mint** (#3DDC97) ile 740–1040 arası kalın çizgi çizilir (iki şeritten dikey ışık hüzmeleri aşağı iner). Uçlarda: 740'ta **boş nokta**, 1040'ta **boş nokta**.
- Üstte iki kapı kemeri sırayla (A kapısı solda, B kapısı sağda); çocuk simgesi iki kapıdan sırayla geçer. İki kapının ortasında büyük "∩" simgesi (kapı kemeri biçiminde) belirir.
- Sonuç yazısı: `A ∩ B = [140, 190) ∩ (160, 200] = (160, 190)`.
- Mini "uç nokta" analizi (3 sn, önemli noktalar sırayla vurgulanır):
  - 160: A'da var (içeride), B'de yok → birlikte yok → **boş**.
  - 190: A'da yok, B'de var → birlikte yok → **boş**.
  - Kural: "İkisinde de varsa dolu; biri bile dışarıda bırakıyorsa boş."
- Soyutlama (4 sn): Doğru yeni bir ölçeğe geçer (`vmin=0, vmax=10, x0=140, k=100`): `[1,5) ∩ (3,8] = (3,5)` aynı mantıkla gösterilir (`X(1)=240`, `X(3)=440`, `X(5)=640`, `X(8)=940`).

**Etkileşim:**
1. **Slider sınama:** Çocuk slider'ı açılır; her konumda iki kapı lambası ayrı yanar. Öğrenci 4 özel değeri tahmin eder: 150, 160, 175, 190.
   - 150: A ✓, B ✗ (150 > 160 değil) → geçemez. Geri bildirim: "Bilet kapısı açık, kemer kapalı."
   - 160: A ✓ (160 ≥ 140 ve < 190), B ✗ (160 > 160 değil) → geçemez. Geri bildirim: "Kemer 'uzun' diyor; tam 160 yetmiyor. Boş nokta!"
   - 175: A ✓, B ✓ → geçer.
   - 190: A ✗ (190 < 190 değil), B ✓ → geçemez. Geri bildirim: "Bilet kapısı 190'dan kısa istiyor; tam 190 yetmiyor."
   - Her yanlış tahminde slider otomatik o değere gider ve lambalar gösterir (Y8).
2. **Eşleştir:** "∩ hangi sözcüğe karşılık gelir?" (ve / veya). Doğru: ve (kemer = iki kapı). Yanlış "veya" seçilirse mint kısım ekranda genişler ([140,200]), geri bildirim: "Bu 'en az birinden geçen'. Biz 'ikisinden de' geçmesini istiyoruz." (Y5)
3. **Tek tek bul:** Verilen `[2, 6] ∩ (4, 9)` için sayı doğrusu üzerinde sonucu çizdir. Beklenen: `(4, 6]` (4 boş, 6 dolu). Doğrulama: `x ∈ [2,6]` ve `x ∈ (4,9)` → `4 < x ≤ 6`. ✓

**Ekran notu / kural kutusu:** *`A ∩ B`: hem A'da hem B'de olanlar ("ve"). Sayı doğrusunda üst üste binen kısım.*  
*Uç nokta kuralı: sonuç ucunu sınırlayan aralık(lar)dan biri bile o ucu dışarıda bırakıyorsa boş nokta.*

---

### Sahne 10 – Birleşim ∪: "en az birinden geçen" | 55 sn | Amaç: ∪'yı "veya" olarak görselleştirmek; ayrık parçaları ve noktaları birleştirme tuzaklarını görmek (Y5, Y9, Y10, Y12)

**Anlatım:**
"Lunaparkta iki ayrı oyuncak var. Mini Tren, boyu 100 ile 130 cm arasındaki çocuklara; 100 ve 130 dahil. Dev Roller Coaster, 140 cm ve üzeri, 190'dan kısa olanlara. Bir çocuk bu iki oyuncaktan en az birine binebiliyorsa 'veya' mantığı çalışır. Bu kümeye birleşim deriz, ∪ ile yazarız. ∪ sembolü de kollarıyla her şeyi toplayan bir bardağa benziyor."

**Görsel & animasyon:**
- Sayı doğrusu: `vmin=100, vmax=200, x0=140, k=10`.
- Şerit M (turuncu #FFA94D): `M = [100, 130]`: `X(100)=140` dolu, `X(130)=440` dolu.
- Şerit R (gökmavisi #5CC8FF): `R = [140, 190)`: `X(140)=540` dolu, `X(190)=1040` boş.
- Ana doğruda her iki şerit **mor/lila** (#B388FF) çizgi olarak yansıtılır: 140–440 arası ve 540–1040 arası. Aradaki 440–540 aralığı gri kalır ve üzerinde "135 cm: hiçbirine giremez" balonu belirir (çocuk figürü orada durmuş).
- Sonuç yazısı: `M ∪ R = [100, 130] ∪ [140, 190)` (iki parça; "arada boşluk var" notu).
- ∪ sembolü bardak biçiminde, iki şeridin altında büyür.
- **Dönüşüm animasyonu (ikinci bölüm, 15 sn):** Yeni ölçek `vmin=100, vmax=200` aynı. İki yeni şerit:
  - A1 = `[100, 140)` (140'ta **boş**), B1 = `[140, 190)` (140'ta **dolu**). Birleşim: 140'ta dolu nokta ortak noktada kaynaşır → `[100, 190)` tek parça. Mor çizgi kesintisiz.
  - Sonra B1 yerine B2 = `(140, 190)` (140'ta **boş**) gelir. Birleşimde 140 noktasında küçük bir delik belirir (140'ta boş nokta, mor çizgi iki parçaya ayrılır). Yazı: `[100, 140) ∪ (140, 190)`; 140 cm'lik çocuk iki kapıda da dışarıda (Y10).

**Etkileşim:**
1. **Slider sınama (Mini Tren + Roller Coaster):** Çocuk 135 cm'ye getirilir: "Hangi oyuncağa binebilir?" (Mini Tren / Roller Coaster / İkisi de / Hiçbiri). Doğru: Hiçbiri (135 hem M hem R dışında).
   - Yanlış "Mini Tren": ışık sönük, geri bildirim: "Mini Tren 130 cm'de bitiyor." Yanlış "Roller Coaster": "R, 140'ta başlıyor."
   - "İkisi de" bu aralıkta yok; geri bildirim: "İkisinde de olması kesişim (∩) olurdu; burada hiçbirinde." (Y5)
2. **Birleşimi tek parça mı yazdın?** Öğrenci `[100,130] ∪ [140,190)` ifadesini sadeleştirmeye çalışır: Seçenekler: `[100,190)` ya da "sadeleşmez". Doğru: sadeleşmez. Yanlışta 135 cm'lik çocuk gösterilir: "Peki 135 nerede?" (Y9)
3. **Dolu/boş anahtar (140 noktası):** Öğrenci B şeridinin sol ucundaki noktayı tıklayarak dolu/boş yapar; birleşim `[100,190)` ↔ `[100,140) ∪ (140,190)` arasında canlı değişir. Soru: "140 cm'lik çocuk hangi durumda bir oyuncağa biner?" (Doğru: yalnız B'de 140 dolu iken).
4. **"Veya" tek seçenek mi?** 125 cm'lik çocuk Mini Tren'e biner; Roller Coaster'a binemez. Soru: "125 cm birleşimin içinde mi?" (Evet). Sonra, `A=[120,160]` ve `B=[150,180]` için 155 cm'yi test et: iki oyuncağa da biner; "veya"da yine içeride kalır. Geri bildirim: "Matematikte 'veya', 'en az biri' demek; ikisi de olabilir." (Y12)

**Ekran notu / kural kutusu:** *`A ∪ B`: A'da veya B'de (en az birinde) olanlar. Sayı doğrusunda iki şeridin toplamı.*  
*Kesişim = ortak kısım (ve), birleşim = toplam (veya).*  
*Ayrık parçalar tek aralık gibi yazılamaz; ortak uçta biri bile dolu ise parçalar kaynaşır.*

---

### Sahne 11 – Tuzaklar: imkânsız yazımlar, boş küme, tek nokta | 55 sn | Amaç: Boş küme ve tek elemanlı küme sonuçlarını ayırt etmek; geçersiz yazımları görmek (Y7, Y8)

**Anlatım:**
"Bazen hiçbir çocuk iki kuralı birden sağlayamaz. Örneğin boy 5'ten büyük ve aynı zamanda 2'den küçük olsun, 5 < x < 2. Böyle bir sayı yok. Bu durumda çözüm kümesi boştur; ∅ yazarız. Bir de ucuz bir hile var: bazen tek bir nokta kalır."

**Görsel & animasyon:**
- Sayı doğrusu yeni ölçek: `vmin=0, vmax=10, x0=140, k=100` (yani `X(2)=340`, `X(5)=640`, `X(9)=1040`).
- **Bölüm A (15 sn): `5 < x < 2`:**
  - 5'ten sağa doğru mint çizgi (5 boş), 2'den sola doğru amber çizgi (2 boş). İki çizgi birbirine doğru gelmez, uzaklaşır; ortada hiçbir yerde üst üste binmez. Üstte yazı: "5'ten büyük VE 2'den küçük?" Çocuk slider'ı bir değer arar: 6 (5'ten büyük ✓ ama 2'den küçük ✗), 1 (2'den küçük ✓ ama 5'ten büyük ✗) …
  - Sonuç: `∅` belirir, yanında `{ }` yazısı (iki gösterim). Not: "Boş küme `{0}` değildir; içinde 0 bile yok."
- **Bölüm B (20 sn): dokunan aralıklar** (aynı ölçek):
  - Durum 1: `[2, 5) ∩ [5, 9]` → 5 sol aralıkta boş, sağ aralıkta dolu; birlikte yok → `∅`.
  - Durum 2: `[2, 5] ∩ [5, 9]` → 5 iki aralıkta da dolu → `{5}` (tek nokta, küçük mint nokta).
  - Durum 3: `(2, 5) ∩ (5, 9)` → `∅`.
  - Her durumun yanında küçük çocuk simgesi tam 5 cm boyunda kapıya gider: sonuç kapı lambasına yansır.
- **Bölüm C (10 sn): geçersiz yazımlar** (kırmızı çarpı animasyonu): `[5, 2]`, `(7, 3)`, `5 < x < 2` olarak "aralık gibi görünen ama olmayan" ifadeler. Yanlarında "Önce küçük, sonra büyük" ve "a < b olmalı" notu.
- **Bölüm D (10 sn): tek nokta aralığı:** `[3, 3] = {3}` (dolu nokta) ve `(3, 3)`, `[3, 3)` = `∅` kısa gösterimi.

**Etkileşim:**
1. **Tahmin et (Bölüm B):** "`[2,5) ∩ [5,9]` sonucu ne?" (a) `{5}` (b) `∅` (c) `[2,9]`. Doğru (b).
   - (a) yanlış: 5'e bakılır: sol aralıkta 5 boş nokta; "5, [2,5) kümesinin elemanı değil." (Y8)
   - (c) yanlış: birleşim sonucu olurdu; geri bildirim: "Bu birleşim olurdu (∪). Biz ortak kısmı arıyoruz." (Y5)
2. **Bul (Bölüm B):** `[2,5] ∩ [5,9]` için "kaç eleman var?" Seçenekler: 0 / 1 / sonsuz. Doğru: 1.
3. **Hata ayıkla:** "`(7, 3)` yazan öğrenci neyi yanlış yaptı?" (a) parantez türünü yanlış seçti (b) küçük sayıyı sağa yazdı (c) ∞ koymayı unuttu. Doğru: (b). (Y7)
4. **Slider:** Çocuk 5 cm'ye getirilir; her durumda yalnız Durum 2'de kapı yeşil yanar.

**Ekran notu / kural kutusu:** *Hiç elemanı olmayan küme: boş küme `∅ = { }`.  `5 < x < 2` çözümsüzdür.*  
*`[2,5] ∩ [5,9] = {5}` (tek nokta);  `[2,5) ∩ [5,9] = ∅`;  `[a,a] = {a}`.*  
*Aralık yazarken `a < b`: önce küçük sayı, sonra büyük sayı.*

---

### Sahne 12 – Tamir atölyesi: hatalı tabelaları bul | 45 sn | Amaç: Tüm yanlış kavramaları tek bir bulmacada pekiştirmek (Y1–Y12)

**Anlatım:**
"Lunaparkın tabelacısı bugün çok yorgun; birkaç tabelayı yanlış yazmış. Sen matematik görevlisisin. Hatalı olanları bul ve tamir et."

**Görsel & animasyon:**
- Atölye sahnesi: 6 tabela asılı (3×2 ızgara), her biri hafif sallanır. Her tabelada bir ifade ve altında küçük sayı doğrusu önizlemesi bulunur.
- Tabelalar (4'ü hatalı, 2'si doğru):
  1. `x ≥ 140` → `[140, ∞]` — **hatalı** (∞ köşeli) → doğrusu `[140, ∞)`.
  2. `[1,5) ∩ (3,8] = (3,5)` — **doğru**.
  3. `x < 4` için çizilen şeritte 4 dolu nokta, yazı `(−∞, 4)` — **hatalı** (şeritte 4 boş olmalı).
  4. `[1,5) ∪ (3,8] = (3,5)` — **hatalı** (∪, [1,8] verir; (3,5) kesişimdir).
  5. `5 < x < 2` için "çözüm kümesi {0}" — **hatalı** (doğrusu ∅).
  6. `[2,5] ∩ [5,9] = {5}` — **doğru**.
- Tabela düzeltilince: ışıklar yanar, kırmızı çarpı yeşil onaya dönüşür; doğru tabelalarda "dokunma" denirse ışık sönük kalır.

**Etkileşim:**
- Öğrenci hatalı tabelaya dokunur → bir açılır menüden düzeltmeyi seçer (her tabela için 3 seçenek).
- Doğru olan bir tabelaya "hatalı" denirse kırmızı geri bildirim: "Bu tabela doğru." Hatalı tabelada yanlış düzeltme seçilirse hataya özgü kısa ipucu verilir (örn. tabela 1: "∞ için köşeli parantez olmaz.").
- Altı tabelanın tamamı doğru işlendiğinde konfeti yerine **tüm ampuller yanar** (tek ses efekti), kapanışa geçilir.

**Ekran notu / kural kutusu (özet panosu):**
*● köşeli = dahil · ○ yuvarlak = hariç · ∞ yanında hep yuvarlak · ∩ = ve · ∪ = veya · `a < b`.*

---

## 5. Kapanış

### 5.1 Mini sınav (5 soru, çoktan seçmeli)

Her soru sayı doğrusu görseliyle sunulur. Şık sırası kodda rastgele karıştırılabilir; aşağıdaki harfler tasarım içindir. Yanlış cevapta öğrenciye ilgili sahnenin ilgili kısmı 6 saniyelik tekrar olarak oynatılır.

**Soru 1.** `{x : 3 < x ≤ 7, x ∈ ℝ}` kümesi aşağıdakilerden hangisine eşittir?

| Şık | Cevap | Durum / gerekçe |
|---|---|---|
| A | `(3, 7)` | Yanlış. 7'yi hariç sayma: `≤` işareti dahil demektir (Y1/Y2). |
| B | `[3, 7]` | Yanlış. 3'ü dahil sayma: `3 < x` yazıyor, 3 hariç (Y1/Y2). |
| **C** | `(3, 7]` | **Doğru.** 3 hariç (yuvarlak), 7 dahil (köşeli). |
| D | `[3, 7)` | Yanlış. Parantez türleri ters yerde (Y1/Y6). |
| E | `(7, 3]` | Yanlış. Küçük sayı sağa yazılmış (Y7). |

**Soru 2.** `x ≥ −2` koşulunu sağlayan gerçek sayıların aralığı hangisidir?

| Şık | Cevap | Durum / gerekçe |
|---|---|---|
| A | `[−2, ∞]` | Yanlış. ∞ için köşeli parantez kullanılmaz (Y4). |
| B | `(−2, ∞)` | Yanlış. `≥` olduğu için −2 dahil; köşeli olmalı (Y1/Y2). |
| **C** | `[−2, ∞)` | **Doğru.** −2 dahil, ∞ hariç. |
| D | `(−∞, −2]` | Yanlış. Yön ters okunmuş (Y6). |
| E | `(−∞, −2)` | Yanlış. Hem yön ters hem uç nokta hariç (Y6/Y1). |

**Soru 3.** `[1, 5) ∩ (3, 8]` işleminin sonucu nedir?

| Şık | Cevap | Durum / gerekçe |
|---|---|---|
| A | `[1, 8]` | Yanlış. Bu `[1,5) ∪ (3,8]` birleşimidir (Y5). |
| **B** | `(3, 5)` | **Doğru.** 3, ikinci aralıkta boş (hariç); 5, ilk aralıkta boş (hariç). |
| C | `[3, 5]` | Yanlış. Uçları dolu alma: 3 ∉ (3,8] ve 5 ∉ [1,5) (Y1/Y8). |
| D | `(3, 5]` | Yanlış. 5 sağ ucu ilk aralıkta dışarıda, kesişimde de dışarıda (Y8). |
| E | `∅` | Yanlış. Ortak bölge var (örneğin 4); boş küme sanma (Y8). |

**Soru 4.** `(−∞, 2) ∪ [2, 7]` işleminin sonucu nedir?

| Şık | Cevap | Durum / gerekçe |
|---|---|---|
| **A** | `(−∞, 7]` | **Doğru.** 2, ikinci aralıkta dolu; aralıklar kaynaşır. Sol uç −∞ (yuvarlak), sağ uç 7 dolu. |
| B | `(−∞, 2) ∪ (2, 7]` | Yanlış. 2 sayısı ikinci aralıkta vardır; unutulmuş (Y10). |
| C | `(−∞, 7)` | Yanlış. 7 ikinci aralıkta dahil; hariç sanılmış (Y1). |
| D | `[2, 7]` | Yanlış. Yalnız ikinci aralık alınmış; birleşimde ikisi de gerekir (Y5). |
| E | `∅` | Yanlış. Bu `(−∞,2) ∩ [2,7]` kesişiminin sonucudur; ∪ ile ∩ karıştırılmış (Y5). |

**Soru 5.** `[3, 7) ∩ [7, 10]` işleminin sonucu nedir?

| Şık | Cevap | Durum / gerekçe |
|---|---|---|
| A | `{7}` | Yanlış. 7, ikinci aralıkta var ama ilkinde yok (Y8). |
| **B** | `∅` | **Doğru.** [3,7) kümesinde 7 yoktur; ortak eleman yok. |
| C | `[3, 10]` | Yanlış. Bu birleşimdir (∪) (Y5). |
| D | `[3, 7]` | Yanlış. Birinci aralığı kapalı sanma (Y1). |
| E | `[7, 10]` | Yanlış. Yalnız ikinci aralık alınmış; kesişim iki aralığın ortağıdır (Y5). |

### 5.2 "Bugün ne öğrendik?" (3 madde)

1. **Uç nokta dahil mi?** Dahilse dolu nokta ● ve köşeli parantez `[ ]`; değilse boş nokta ○ ve yuvarlak parantez `( )`. ∞ asla dahil edilemez; yanında hep yuvarlak parantez.
2. **Aynı küme, dört dil:** `140 ≤ x < 190` ⇄ `x ∈ [140, 190)` ⇄ sayı doğrusu ●────○ ⇄ `{x : 140 ≤ x < 190, x ∈ ℝ}`.
3. **∩ "ve", ∪ "veya":** Kesişim iki kapıdan da geçenler (ortak kısım), birleşim en az birinden geçenler (toplam kısım). Sonuç bir aralık, iki parça, tek nokta `{5}` ya da boş küme `∅` olabilir.

---

## 6. Görsel tasarım önerisi (konuya özel)

**Metafor:** Gece lunaparkı. Sayı doğrusu bir **ampul şeridi**: dolu nokta = **yanan ampul** (●, bu sayı içeride), boş nokta = **sönük ampul/halka** (○, bu sayı dışarıda). Kesişimdeki ∩ sembolü gerçekten **kapı kemeri** gibi çizilir; ∪ sembolü **bardak/sepet** gibi (iki kolu birleştiren bir kap). Çocuk simgesi sade, çizgisel bir figürdür (çocuksu karikatür değil).

**Renk önerisi (genel tasarım dili sonra eklenecek; bunlar yalnızca konu rolleri):**

| Rol | Renk |
|---|---|
| Arka plan (koyu) | `#0F1420` |
| Eksen ve gri (dışarıda olan) | `#3A4560` |
| Geçer / dahil / sonuç (kesişim) | `#3DDC97` (mint) |
| Geçmez / uyarı | `#FF6B6B` (koral) |
| Aralık A / ampul sarısı | `#FFC857` |
| Aralık B | `#5CC8FF` (gökmavisi) |
| Mini Tren (M) | `#FFA94D` |
| Birleşim | `#B388FF` (lila) |
| Metin | `#E8ECF5` |

**Hareket ve ses:**
- Dolu nokta "pop" (300 ms) ile büyür ve hafif parlar; boş nokta içi boş halka olarak "nefes alır" (opaklık 70-100%).
- Kapı lambası renk değişimi 150 ms; kapı kemeri hafifçe titrer (başarısız denemede 2 kez).
- ∞ sahnesinde eksen ölçek değişiminde etiketler kayarak yenilenir (ease-out, 600 ms).
- Sese bağımlılık yoktur; ses açıksa dolu nokta için kısa tık, boş nokta için kısa boş tını.

**Erişilebilirlik:** Dolu/boş ayrımı yalnızca renkle değil şekille yapılır; geçer/geçemez durumu hem renk hem ikon (✓/✗) hem yazı ile verilir; tüm etkileşimler klavyeyle (ok tuşlarıyla slider, Enter ile nokta değiştirme) yapılabilir; altyazı her zaman açık.

**Tipografi önerisi:** Sayı doğrusu etiketleri ve matematiksel ifadeler eşit genişlikli (tabular) rakamlı; ∞, ∩, ∪, ∅, ℝ, ∈ sembolleri normalden %20 büyük punto ile verilir.

---

## Ek: Matematiksel doğrulama tablosu (yazarın kontrolü)

| İfade | Sonuç | Doğrulama |
|---|---|---|
| `x ≥ 140` | `[140, ∞)` | 140 dahil; üst sınır yok |
| `x < 190` | `(−∞, 190)` | 190 hariç; alt sınır yok |
| `140 ≤ x < 190` | `[140, 190)` | Sol dahil, sağ hariç |
| `{x : 140 ≤ x < 190, x ∈ ℤ}` | `{140, 141, …, 189}` | Tam sayı: 190 hariç, en büyük 189 |
| `[140,190) ∩ (160,200]` | `(160, 190)` | 160 ∈ A ama ∉ B; 190 ∉ A ama ∈ B; ikisi de hariç |
| `[2,6] ∩ (4,9)` | `(4, 6]` | 4 hariç (ikinci aralık); 6 dahil (6 ∈ [2,6] ve 6 ∈ (4,9)) |
| `[1,5) ∩ (3,8]` | `(3, 5)` | 3 ∉ (3,8]; 5 ∉ [1,5) |
| `[1,5) ∪ (3,8]` | `[1, 8]` | Aralıklar kesişiyor; 1 dahil, 8 dahil |
| `[100,130] ∪ [140,190)` | iki parçalı | 130 < 140, arada boşluk (135 dışarıda) |
| `[100,140) ∪ [140,190)` | `[100, 190)` | 140 ikinci aralıkta var; kaynaşır |
| `[100,140) ∪ (140,190)` | `[100,140) ∪ (140,190)` | 140 hiçbirinde yok; tek aralık olmaz |
| `[2,5) ∩ [5,9]` | `∅` | 5 ∉ [2,5) |
| `[2,5] ∩ [5,9]` | `{5}` | 5 ikisinde de var |
| `(2,5) ∩ (5,9)` | `∅` | 5 ikisinde de yok; arada ortak yok |
| `5 < x < 2` | `∅` | x > 5 ve x < 2 aynı anda olamaz |
| `[3,3]` / `(3,3)` / `[3,3)` | `{3}` / `∅` / `∅` | Tek nokta / boş / boş |
| `(−∞,2) ∪ [2,7]` | `(−∞, 7]` | 2 ikinci aralıkta; sağ uç 7 dahil |
| `(−∞,2) ∩ [2,7]` | `∅` | 2 ∉ (−∞,2) |
| `[3,7) ∩ [7,10]` | `∅` | 7 ∉ [3,7) |
| `[3,7) ∪ [7,10]` | `[3, 10]` | 7 ikinci aralıkta var; kaynaşır |
