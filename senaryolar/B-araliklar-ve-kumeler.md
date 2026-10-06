# Bölüm B — Aralıklar ve kümeler: kısa senaryolar (onaylandı, 5 Ekim 2026)

Biçim `plan/PLAN.md`'deki gibi: tek fikir, 3–5 sahne, 2 çıkış sorusu. Altyazılar en çok 12 kelime olacak; aşağıdakiler sahnenin ne yaptığını anlatır, ekranda görünecek metin değildir.

Bölümün hikâyesi lunapark: boy sınırı olan oyuncaklar. Yeni dersler (B1, B6, B7) tam senaryo; mevcut Ders 02'den bölünenler (B2–B5) için hangi sahnenin nereye gittiği ve yeni çıkış soruları yazıldı. Ayrıntılı eski senaryo: `02-araliklar-ve-kume-sembolleri.md`.

## Kararlar (onaylandı, 5 Ekim 2026)

1. **B7 sayıları ve cümlesi videoya uyar.** Pay 1 derece, cümle "Mutlak değer, hedefe uzaklıktır."; formül deftere düşer; "yarıçap" yerine "pay" denir.
2. **B7 dersi lunaparktaki boy tahmini standıyla kurulur;** kombi yalnızca videoda.
3. **Tamir atölyesi sahnesi B5'ten çıktı,** bölüm sonu tekrar oyununa ayrıldı.
4. **B1 tek ders.** Ağır gelirse ikiye bölünür.
5. **Semboller:** A \ B, A′, ⊂. Ders kitabı farklıysa çevrilir.

Yazım sırasında senaryodan sapmalar: B1'de ortak özellik örneği "x beğendiğin bir şarkı" oldu (yıl bilgisi tahtayı kalabalıklaştırıyordu) ve alt küme olmayan durum için ⊄ gösteriliyor. B4'ün üçüncü sahnesi dört kart eşleştirme yerine eski dersteki iki görev oldu (aralığı seç; sayı doğrusunu kur). B6'nın son görevi [2, 5] yerine [2, 5): bir uç boşalır, öteki dolar. B7'de her sahneye birer tahmin sorusu eklendi.

**Müfredat denetimi (6 Ekim 2026).** Dersler program metniyle (`plan/MUFREDAT.md`) karşılaştırıldı ve şunlar değişti; aşağıdaki senaryolarda eski hâli duruyorsa geçerli olan budur:

- **B1** sayı kümeleriyle kuruldu (program: "elemanları sayılar olan küme örnekleri"). Çalma listesi yalnızca açılış sorusu. Sahne 2'ye sayı kümelerinin iki yöntemle gösterimi eklendi (3'ün katı olan doğal sayılar, çift tam sayılar). ⊄ simgesi çıkarıldı.
- **B5** listelenmiş iki sayı kümesinde kesişim ve birleşimle açılıyor (4 sahne). İki ucu aynı aralıklar ve "geçersiz yazımlar" çıkarıldı. Kesişim sonucunun yanında eşitsizlik yazımı da görünüyor.
- **B6** listelenmiş sayı kümelerinde fark ve tümleyenle açılıyor (5 sahne). Aralık sonuçlarının yanında eşitsizlik yazımı var.
- **B7** sahne 3'ün sonunda aralıktan mutlak değer yazımına dönüş var: 10 < x < 20 → |x − 15| < 5.

Derslere bilerek almadıklarım (karar 2, "kafa karıştıran hiçbir şey olmayacak"): boş kümenin her kümenin alt kümesi oluşu, alt küme sayısı (2ⁿ), A \ B = A ∩ B′, |x − a| > r ve |x + 3| türü işaret tuzakları. Programda varsa söyleyin, ilgili derse eklerim.

---

## B1 — Küme dili (YENİ)

**Fikir:** Küme, neyin içinde neyin dışında olduğu kesin olan bir topluluktur; ya elemanları sayılarak ya da kuralı söylenerek yazılır.

**Açılış sorusu:** "Beğendiklerim" listende 5 şarkı var. Birini bir kez daha beğenirsen listede kaç şarkı olur?

**Ana görsel:** Müzik uygulamasındaki "Beğendiklerim" listesi. Bir şarkı ya listededir ya değildir; iki kez beğenilemez, sırası önemli değildir. Kütüphanenin tamamı çerçeve, listeler onun içinde kutu.

| Sahne | Ne olur |
|---|---|
| 1. İçinde mi, dışında mı | Tahmin: yine 5. Şarkı ya listede (∈) ya değil (∉). Aynı eleman iki kez sayılmaz: s(A) = 5. |
| 2. Say ya da kuralını söyle | Aynı liste iki biçimde: tek tek yazarak {…} ya da kuralla {x : x 2020'den sonra çıkan şarkı}. Sayılara geçiş: {x : x < 5, x ∈ ℕ} = {0, 1, 2, 3, 4}. |
| 3. Liste içinde liste | "Sabah" listesinin her şarkısı Beğendiklerim'de de var: Sabah ⊂ Beğendiklerim. Bir şarkı dışarıda kalırsa alt küme olmaz. |
| 4. Boş liste, tüm kütüphane | Hiç şarkısı olmayan liste: ∅, s(∅) = 0. Bütün şarkılar: evrensel küme E. ∅ ile {0} aynı şey değil: birinde eleman yok, ötekinde bir eleman var. |
| 5. Sıra sende | Kartlar "doğru / yanlış" kutularına sürüklenir: 3 ∈ A · {3} ⊂ A · 3 ⊂ A (yanlış) · ∅ = {0} (yanlış). |

**Hedeflenen yanılgı:** ∈ ile ⊂'yi karıştırmak (eleman mı, küme mi); ∅ ile {0}'ı aynı sanmak; tekrar eden elemanı iki kez saymak.
**Akılda kalıcı cümle:** "Küme bir listedir; ya sayarsın ya kuralını söylersin."
**Çıkış soruları:** {x : x < 4, x ∈ ℕ} kümesinin kaç elemanı var? (4) · A = {1, 2, 3} için hangisi doğru? ({2} ⊂ A; çeldiriciler: 2 ⊂ A, {2} ∈ A, 4 ∈ A)
**Hikâye:** Yok (dersteki örnek zaten öğrencinin telefonunda).
**Not:** Sahne 2'deki {x : …, x ∈ ℕ} yazımı B4'te aralıklar için yeniden kullanılacak; "x hangi kümeden" sorusu orada asıl işini görüyor.

---

## B2 — Dolu nokta, boş nokta (Ders 02, sahne 1–4)

**Fikir:** Bir kural sayı doğrusunda bir parçadır; uç nokta içerideyse nokta dolu, dışarıdaysa boş çizilir.

**Açılış sorusu:** Hız treninin kapısında "140 cm ve üzeri" yazıyor. Boyu tam 140 cm olan biner mi?

**Ana görsel:** Kapıdaki boy çubuğu, yana yatınca sayı doğrusu olur.

| Sahne | Kaynak | Ne olur |
|---|---|---|
| 1. Kapıdaki kural | S1 | Çocuklar kapıdan geçer ya da geçemez; boylar ondalıklı da olabilir (141,5). |
| 2. Kuralı eşitsizlikle yaz | S2 | "140 ve üzeri" → x ≥ 140. Sayı doğrusunda sağa doğru şerit. |
| 3. Tam 140 ise | S3 | İki tabela yan yana: "140 ve üzeri" (dolu nokta) ile "140'tan uzun" (boş nokta). Tek fark 140'taki nokta. |
| 4. En uzun kim | S4 | "190'dan kısa": en uzun boy 189 değil; 189,9, 189,99… sonu yok. Bu yüzden 190'a boş nokta konur. İki kural birlikte: 140 ≤ x < 190. |

**Hedeflenen yanılgı:** ≥ ile >'i aynı sanmak; "190'dan kısa en uzun boy 189'dur" demek.
**Akılda kalıcı cümle:** "Eşitlik varsa nokta dolu."
**Çıkış soruları:** x > 3 sayı doğrusunda nasıl görünür? (3'te boş nokta, sağa şerit) · 5'ten küçük en büyük gerçek sayı hangisidir? (Yoktur)
**Hikâye:** Yok (ders zaten lunaparkla kurulu).

---

## B3 — Parantez dili ve sonsuz (Ders 02, sahne 5–7)

**Fikir:** Dolu nokta köşeli, boş nokta yuvarlak parantezle yazılır; sonsuz bir sayı olmadığı için hep yuvarlaktır.

**Açılış sorusu:** 140 ≤ x < 190'ı her seferinde çizmek zorunda mıyız? İki sayı ve iki parantezle yazılabilir mi?

**Ana görsel:** Dört kapı: aynı iki sayı, dört farklı uç nokta düzeni.

| Sahne | Kaynak | Ne olur |
|---|---|---|
| 1. Aralığı sen kur | S5 | Sayı doğrusundaki noktaya dokununca dolu/boş değişir, parantez de onunla döner: [140, 190). |
| 2. Dört kapı | S6 | [a, b] kapalı, (a, b) açık, [a, b) ve (a, b] yarı açık. Uçtaki çocuk hangi kapılardan geçer? |
| 3. Sonsuz neden yuvarlak | S7 | Sağa giden şeridin ucu yok; ∞'a nokta konamaz. [140, ∞) ve (−∞, 190). |

**Hedeflenen yanılgı:** (2, 5) ile [2, 5]'i aynı sanmak; [140, ∞] yazmak.
**Akılda kalıcı cümle:** "Köşeli dahil, yuvarlak hariç; sonsuz hep yuvarlak."
**Çıkış soruları:** −2 ≤ x < 4 hangi aralıktır? ([−2, 4)) · x ≥ 7 hangi aralıktır? ([7, ∞))
**Hikâye:** Yok.

---

## B4 — Dört dil, tek küme (Ders 02, sahne 8)

**Fikir:** Eşitsizlik, aralık, sayı doğrusu ve küme gösterimi aynı kümenin dört yazımıdır.

**Açılış sorusu:** x ∈ ℝ yerine x ∈ ℤ yazarsak 140 ≤ x < 190 kümesi aynı mı kalır?

**Ana görsel:** Dörtlü çevirici: dört kutudan biri değişince öteki üçü de onu izler.

| Sahne | Kaynak | Ne olur |
|---|---|---|
| 1. Dört yazım | S8 (ilk yarı) | 140 ≤ x < 190 · [140, 190) · sayı doğrusu · {x : 140 ≤ x < 190, x ∈ ℝ}. Bir uç değişir, dördü birden güncellenir. |
| 2. ℝ mi, ℤ mi | S8 (ikinci yarı) | Tahmin, sonra gösteri: ℤ seçilince şerit noktalara dağılır. Artık en büyük eleman var: 189. Aralık yazımı yalnızca ℝ için. |
| 3. Sıra sende | yeni | Dört kart doğru eşine sürüklenir; biri tuzak (uç noktası ters parantezli). |

**Hedeflenen yanılgı:** x ∈ ℝ'yi yazmayı gereksiz sanmak; tam sayı noktalarıyla aralığı karıştırmak.
**Akılda kalıcı cümle:** "Eşitsizlik, aralık, doğru, küme: aynı şey."
**Çıkış soruları:** {x : 1 < x ≤ 3, x ∈ ℝ} hangi aralıktır? ((1, 3]) · {x : 1 < x ≤ 3, x ∈ ℤ} hangi kümedir? ({2, 3})
**Hikâye:** Yok.
**Not:** Bölümün en kısa dersi (yaklaşık 3 dakika). Tek sahneden üç sahne çıkıyor; yeni içerik yalnızca sahne 3.

---

## B5 — Kesişim ve birleşim (Ders 02, sahne 9–11)

**Fikir:** Kesişim iki koşulu birden sağlayanları, birleşim en az birini sağlayanları toplar.

**Açılış sorusu:** Hız treni 140 cm ve üzerini, çarpışan araba 160 cm ve altını alıyor. İkisine de binebilenler kimler?

**Ana görsel:** Aynı sayı doğrusunun üstünde iki renkli şerit. Üst üste bindikleri yer kesişim, ikisinin kapladığı her yer birleşim.

| Sahne | Kaynak | Ne olur |
|---|---|---|
| 1. İkisinden de geçen | S9 | ∩ "ve": yalnızca üst üste binen parça kalır. Uç nokta ancak iki kümede de varsa dahil. |
| 2. En az birinden geçen | S10 | ∪ "veya": iki şeridin kapladığı her yer. İkisine de binen yine içeride. Arada boşluk varsa boşluk kalır: 135 cm'lik çocuk ikisine de binemez. |
| 3. Hiç kimse ya da tek kişi | S11 | [2, 5) ∩ [5, 9] = ∅ ama [2, 5] ∩ [5, 9] = {5}. Fark tek bir parantez. |
| 4. Hikâye | hikâye 5 | "Alışveriş filtresi" videosu. Henüz üretilmedi; üretilene kadar ders 3. sahnede biter. |

**Hedeflenen yanılgı:** ∩ ile ∪'yu karıştırmak; ayrık iki parçayı tek aralık yazmak; boş kesişime 0 ya da {0} demek.
**Akılda kalıcı cümle:** "∩ ve, ∪ veya."
**Çıkış soruları:** [2, 6] ∩ [4, 9] = ? ([4, 6]) · [1, 4) ∪ [4, 7] = ? ([1, 7])
**Hikâye:** Var (5 numara, başlanmadı). Videonun kapanış cümlesi "Ve dediğinde liste daralır, veya dediğinde genişler."
**Not:** Eski sahne 12 (tamir atölyesi) bu dersten çıkar, bölüm sonu tekrar oyununa gider (karar 3).

---

## B6 — Fark ve tümleme (YENİ)

**Fikir:** A \ B, A'da olup B'de olmayanlardır; tümleyen, kümenin dışında kalan her şeydir ve uç noktalar tersine döner.

**Açılış sorusu:** Hız treni [140, 190), çarpışan araba [120, 160]. Hız trenine binebilen ama çarpışan arabaya binemeyenler kimler?

**Ana görsel:** B5'teki iki şerit. B'nin örttüğü kısım A'dan silinir. Tümleyende şeridin rengi ve uç noktaları tersine çevrilir.

| Sahne | Ne olur |
|---|---|
| 1. Biri var, öteki yok | Tahmin, sonra silme: A'dan B'ye değen parça çıkar. A \ B = (160, 190). |
| 2. Uç nokta ve sıra | 160 B'de dahildi, farkta hariç kaldı. Sıra değişince sonuç da değişir: B \ A = [120, 140). |
| 3. Dışarıda kalanlar | Hız trenine binemeyenler: A′ = (−∞, 140) ∪ [190, ∞). Dolu nokta boşalır, boş nokta dolar; sonuç iki parça. |
| 4. Sıra sende | Verilen aralığın tümleyeni sayı doğrusunda kurulur (uçlara dokunarak): (−∞, 3] ve [2, 5]. |

**Hedeflenen yanılgı:** A \ B ile B \ A'yı aynı sanmak; tümleyende uç noktayı olduğu gibi bırakmak; tümleyeni tek parça sanmak.
**Akılda kalıcı cümle:** "Tümleyende dolu boşalır, boş dolar."
**Çıkış soruları:** [1, 6] \ [4, 9] = ? ([1, 4)) · (2, 5] kümesinin tümleyeni hangisidir? ((−∞, 2] ∪ (5, ∞))
**Hikâye:** Yok.
**Not:** Evrensel küme burada ℝ; B1'deki "tüm kütüphane" ile bağlanır.

---

## B7 — Mutlak değerle aralık (YENİ)

**Fikir:** |x − a|, x'in a'ya uzaklığıdır; |x − a| < r, a'ya r'den yakın olan sayıların aralığıdır.

**Açılış sorusu:** Lunaparktaki boy tahmini standı: görevli boyunu 165 cm diye tahmin ediyor, 3 cm'den az yanılırsa o kazanıyor. Hangi boylarda görevli kazanır?

**Ana görsel:** Sayı doğrusunda merkezdeki tahmin ve ondan iki yana eşit açılan şerit. Şeridin yarı genişliği pay.

| Sahne | Ne olur |
|---|---|
| 1. Uzaklık yön sormaz | Gerçek boy 163 de olsa 167 de olsa yanılgı 2 cm: \|163 − 165\| = \|167 − 165\| = 2. |
| 2. Uzaklıktan aralığa | Yanılgı 3'ten az: \|x − 165\| < 3. Şerit merkezden iki yana açılır: 162 < x < 168, yani (162, 168). Uçlar boş. |
| 3. Merkez ve pay | İki kaydırıcı: merkez a ve pay r. Programın örneği: \|x − 3\| < 1 → (2, 4). İşaret ≤ olunca uçlar dolar: [2, 4]. |
| 4. Hikâye | "Kombi 22 derecede" videosu (hazır: `hikaye/b7-kombi-22/renders/b7-kombi-22.mp4`). |

**Hedeflenen yanılgı:** |x − 3| < 1'i tek yönlü çözmek (x < 4 deyip bırakmak); mutlak değeri "eksiyi atmak" sanıp uzaklık olduğunu görmemek.
**Akılda kalıcı cümle:** "Mutlak değer, hedefe uzaklıktır." (karar 1; planda "|x − a| < r: merkez a, yarıçap r.")
**Deftere düşen formül:** |x − a| < r ⇔ a − r < x < a + r
**Çıkış soruları:** |x − 5| < 2 hangi aralıktır? ((3, 7)) · 21,4 sayısı |x − 22| < 1'i sağlar mı? (Evet; 22'ye uzaklığı 0,6)
**Hikâye:** Var (3 numara, video hazır; altyazı dosyası eksik).
**Not:** İkinci çıkış sorusu videodaki sayıyı kullanır; öğrenci az önce izlediğini formülle yeniden okur. Aralıktan mutlak değere dönüş ((10, 20) → |x − 15| < 5) derse alınmadı; isterseniz sahne 3'ün sonuna tek soru olarak eklenir.

---

## Yapım sırası (öneri)

1. **B1** yazılır (bağımsız; B4 ona dayanıyor).
2. **Ders 02 bölünür:** B2 → B3 → B4 → B5. Ana sayfada B bölümü yedi kısa ders olarak görünür.
3. **B6**, sonra **B7** yazılır; B7'ye hazır video bağlanır.
4. Her ders için `node araclar/olc.js` ölçümü, ardından izlemeniz.

Bu turda yapılmayanlar: B5 hikâyesinin (alışveriş filtresi) anlatım metni ve videosu; ders başı hatırlama soruları ve bölüm sonu tekrar oyunu (Faz 3).
