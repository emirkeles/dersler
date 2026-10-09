# Durum — Etkileşim

7 Ekim 2026 · İşleme tamamlandı. 8 konu, 18 kısa ders, 80 içerik sahnesi, 36 çıkış sorusu.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti; mevcut MEB metni korundu |
| 2 Plan | bitti; taslak kararlarla kesinleşti |
| 2b Ders kitabı | bitti; sayfa kaynakları PLAN.md 3/8 |
| 3 Kararlar | bitti; 15 soru kapandı, denetim türleri ve kaynak/görsel işaretleri eklendi |
| 4 Senaryolar | bitti; 8 konu dosyası, her sorunun bilgi öncülü ve açılış biçimi |
| 5 İskelet | bitti; tema sayfası, tema.js, KIT ve tema.css |
| 6 Dersler | bitti; 18 doğrudan Ders.start tanımı |
| 7 Denetim | bitti; olc/denetle/ek durumlar/görsel inceleme temiz |
| 8 Rapor | hazır; kullanıcıya teslim |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 5 sahne; 15 ek durum ziyareti; son PNGler incelendi |
| A2 | bitti | bitti | temiz | 5 sahne; 15 ek durum ziyareti; son PNGler incelendi |
| B1 | bitti | bitti | temiz | 4 sahne; 8 ek durum ziyareti; son PNGler incelendi |
| B2 | bitti | bitti | temiz | 5 sahne; 18 ek durum ziyareti; son PNGler incelendi |
| C1 | bitti | bitti | temiz | 5 sahne; 16 ek durum ziyareti; son PNGler incelendi |
| C2 | bitti | bitti | temiz | 5 sahne; 10 ek durum ziyareti; son PNGler incelendi |
| D1 | bitti | bitti | temiz | 5 sahne; 17 ek durum ziyareti; son PNGler incelendi |
| E1 | bitti | bitti | temiz | 4 sahne; 8 ek durum ziyareti; son PNGler incelendi |
| E2 | bitti | bitti | temiz | 4 sahne; 7 ek durum ziyareti; son PNGler incelendi |
| E3 | bitti | bitti | temiz | 4 sahne; 13 ek durum ziyareti; son PNGler incelendi |
| F1 | bitti | bitti | temiz | 4 sahne; 11 ek durum ziyareti; son PNGler incelendi |
| F2 | bitti | bitti | temiz | 4 sahne; 9 ek durum ziyareti; son PNGler incelendi |
| F3 | bitti | bitti | temiz | 4 sahne; 21 ek durum ziyareti; son PNGler incelendi |
| G1 | bitti | bitti | temiz | 5 sahne; 16 ek durum ziyareti; son PNGler incelendi |
| H1 | bitti | bitti | temiz | 5 sahne; 19 ek durum ziyareti; son PNGler incelendi |
| H2 | bitti | bitti | temiz | 5 sahne; 33 ek durum ziyareti; son PNGler incelendi |
| H3 | bitti | bitti | temiz | 3 sahne; 9 ek durum ziyareti; son PNGler incelendi |
| H4 | bitti | bitti | temiz | 4 sahne; 53 ek durum ziyareti; son PNGler incelendi |

## Son kanıtlar

- Ayrıntılı tablo ve dosya yolları: `DENETIM.md`.
- Tema denetimi: 18 kısa ders, yayında değil, sorun yok.
- Ek denetim: 298 durum ziyareti; tüm yazı/yerleşim/konsol göstergeleri sıfır. En küçük masaüstü punto 22.9 px.
- Tema masaüstü ve telefon görünümü: bütün konular/dersler listede, yatay taşma sıfır.
- Bağımsız son inceleme: açık Critical/Important/Minor bulgu yok. E2/H3 ipucu, yanlış şık, doğru şık, animasyonda geçiş ve yeniden açma testi temiz.

## Kaynak ve kararlar

- Kitap MEB bağlantısından 7 Ekim 2026’da alındı: `/private/tmp/etkilesim-kimya-9.pdf`, 287 sayfa; PDF ve basılı numara aynı. Projeye konmadı. Kitap sayfaları, sayısal veri/listeler/formüller PLAN.md’de kayıtlı.
- Gerçek gözlem ve veri toplama site dışı; A1 kaynaklı hazır kayıtlarla yorum benzetimi. Boş pH deney sonuçları doldurulmadı, hastalık nedenselliği eklenmedi.
- Çalışma sırasında başka oturum ortak kuralların 3.1’ini değiştirdi. Son sürüme uyum sağlandı: ad/tanım/veri isteyen her sorudan önce gereken bilgi; senaryolarda açılış ve her soru öncülü.
- Tek fikir: H2 çentik/küresel simetri açıklamasını taşır (5 sahne); H3 yalnız ardışık enerji/valans/kararlı iyon (3 sahne). E2 Pauli/Hund geçerli yerleşimin tamamlayıcı koşulları. 18 ders ve 80 sahne korunur.
- Resim bekleyen sahne yok; SVG şemaları yeterli. GORSELLER.md bu kararı belgeler.

## Yazma ve yayın sınırı

Bu oturum yalnız `kimya/etkilesim/` ve `plan/kimya/etkilesim/` altında çalıştı. Aynı çalışma alanında diğer oturumların ortak kural, biyoloji, fizik ve ses örneği değişikliklerine müdahale edilmedi.

`plan/kimya/TEMALAR.md` güncellemesi kullanıcı tarafından izin verilen iki klasörün dışındadır; yapılmadı. Son sayılar ve durum burada kayıtlıdır.

Tema yayında değil. Seslendirme, görsel üretimi, commit/push bu oturumda çalıştırılmadı. Kullanıcı girdisi bekleyen veya açık kalan iş yok.

## Yayın (7 Ekim 2026, sonraki oturum)

Tema yayında: `ortak/katalog.js` içinde `yayinda: true`. `denetle.js` temiz, ana sayfada 8 konu bağlantısıyla görünüyor. Yukarıdaki "Tema yayında değil" satırı bu tarihten önceki durumdur.

## Seslendirme

`plan/SESLENDIRME.md` adımları. 7 Ekim 2026: adım 1 ve 2 bitti (iki alt ajan: A–E, F–H); adım 3 pilot A1 üretildi, kullanıcının dinlemesi bekleniyor.

| Adım | Durum |
|---|---|
| 0 Ön koşul | `olc.js` 18 derste, `denetle.js` temada temiz; kullanıcının dersleri izlediği doğrulanmadı |
| 1 Döküm | bitti; 270 satır, 16.316 karakter (yönergeler dahil), "sahne otomatik tamamlanamadı" uyarısı yok |
| 2 Metin denetimi | bitti; 125 satıra `speak`, 30 yönerge; dökümde rakam, simge, büyük harfli kısaltma kalmadı (betikle tarandı) |
| 3 Pilot (A1) | üretildi (8 klip, 33,5 sn, 280 KB, 470 karakter); süre aykırısı yok (ortanca 0,073 sn/karakter); sayfaya `ses/etkilesim-a1.js` eklendi; `olc.js` temiz. Kullanıcı dinleyip onaylayacak |
| 4–7 | pilot onayından sonra |

Bütçe tahmini (`SESLENDIRME.md` oranlarıyla): yaklaşık 22,6 dk ses, 10,9 MB.

| Ders | Satır | Karakter | `speak` | Yönerge |
|---|---|---|---|---|
| A1 | 8 | 470 | 2 | 1 curious |
| A2 | 9 | 560 | 0 | 0 |
| B1 | 14 | 943 | 4 | 1 thoughtful, 1 short pause |
| B2 | 33 | 1.832 | 2 | 1 short pause, 1 curious |
| C1 | 8 | 466 | 1 | 1 curious |
| C2 | 18 | 1.041 | 6 | 1 thoughtful, 1 short pause |
| D1 | 8 | 455 | 2 | 1 curious |
| E1 | 10 | 623 | 5 | 1 short pause |
| E2 | 14 | 788 | 3 | 1 short pause, 1 thoughtful |
| E3 | 15 | 912 | 10 | 1 short pause, 1 thoughtful |
| F1 | 25 | 1.553 | 22 | 1 thoughtful, 1 short pause |
| F2 | 17 | 1.030 | 15 | 1 thoughtful, 1 short pause |
| F3 | 35 | 1.880 | 31 | 2 thoughtful, 1 short pause |
| G1 | 12 | 780 | 7 | 1 curious, 1 short pause |
| H1 | 11 | 667 | 2 | 1 thoughtful, 1 short pause |
| H2 | 8 | 557 | 5 | 1 thoughtful |
| H3 | 12 | 890 | 4 | 1 thoughtful, 1 short pause |
| H4 | 13 | 869 | 4 | 1 thoughtful, 1 short pause |
| **Toplam** | **270** | **16.316** | **125** | **30** (5 curious, 12 thoughtful, 13 short pause) |

### Okunuş kararları (hiçbiri dinlenmedi)

- pH → "pehaş" (kullanıcı kararı, 7 Ekim 2026). Bu temada tek satır: A1.
- Orbital harfleri: s "se", p "pe", d "de", f "fe" ("1s²" → "bir se iki"; "s bloğu" → "se bloğu"). Ek alan orbital açılır: "2p’ye" → "iki pe orbitaline".
- Kuantum sayısı n → "ne" ("en yüksek n" → "en yüksek ne değeri"; "ns" → "ne se"). İki ajan da aynı okunuşu kullandı.
- Element simgesi → elementin adı, ek ada göre ("Li’nin" → "lityumun"). İyon: "Na⁺" → "artı bir yüklü sodyum iyonu", "Cl⁻" → "eksi bir yüklü klor iyonu", "X²⁺" → "artı iki yüklü iks iyonu".
- Bileşik formülü harf harf: NaClO → "ne a ce le o", HCl → "ha ce le" (B1).
- Grup: "1A" → "bir A", ek açılır ("2A’dır" → "iki A grubudur"); "2. gruptur" → "ikinci gruptur".
- İE₁, İE₂, İE₃ → "birinci, ikinci, üçüncü iyonlaşma enerjisi".
- Yabancı adlar: Bohr → "Bor", Heisenberg → "Hayzenberg", Pauling → "Poling", IUPAC → "ayupak", TENMAK → "Tenmak". Aufbau, Pauli, Hund yazıldığı gibi bırakıldı.

Pilotta ve ilk dinlemede kulak verilecekler: "pehaş" (A1), "ne se" (E3, F2), "ne a ce le o" ve "ha ce le" (B1), "Bor" (C2), "de ile biter" (F3; bağlaç gibi okunabilir), tek harf "A"/"B" grupları.

### Metin düzeltmesi (seslendirmeden önce)

B2 `kurallar` dizisinde iki dil bilgisi hatası düzeltildi; `olc.js` temiz: "kimyasal ve malzemelere" → "kimyasallara ve malzemelere"; "Maddeyi kullanmadan önce etiketi dikkatle okunur" → "Madde kullanılmadan önce etiketi dikkatle okunur".

### Açık bulgular (dokunulmadı; içerik kararı)

- Açıklama niteliğinde olup `noWait` ile gösterilen, yani seslendirilmeyecek altyazılar: B2 "Program, düzenlemelere ve tehditleri tespit eden projeye dikkat çeker."; D1 "Sırayı numara değil, bağıl enerji belirler." (dersin ana kuralı); E3 "P yarı, Ar tam dolu; Cl bu iki duruma uymaz."; F1 "Son yazılan orbital yerine bütün dizilimdeki en yüksek n’yi kullan."; G1 "Elektron değişir; proton sayısı elementin kimliğini korur."; F3 "Bloğu yerleşim türü, grup adını ortak özellikleriyle birlikte düşün.". Seslendirilecekse ders bekleyerek gösterecek biçimde düzeltilir ve `speak` yazılır.
- C1 sahne 2: "Şekilleri değiştir; …" bekleyerek okunuyor, kaydırıcı ise sorudan sonra geliyor.
- B1 sahne 1: 3. ve 4. satır aynı şeyi iki kez söylüyor. E3: "Yarı veya tam doluluk dengeli yerleşim sağlar." iki sahnede yineleniyor.
- H derslerinde seslendirilen anlatım az; bazı sahneler tahmin sorusuyla açılıyor (H1 sahne 1, 2, 4; H2 sahne 1, 4, 5) ve H4 sahne 4 anlatımsız bitiyor. Sesli izlemede bu sahneler uzun süre sessiz kalır.
- F2: "Gridde" sözcüğü (jargon).

## Anlatımın yeniden planlanması (7 Ekim 2026)

Kullanıcı yayındaki dersleri izleyip anlatımı geri çevirdi (tek cümleyle soruya geçme, "kitapta verilmiştir"). Kurallar ve sonuç tablosu: `PLAN.md` bölüm 12.

| Adım | Durum |
|---|---|
| Kurallar (`PLAN.md` 12, `KURALLAR.md` 2.1 ve 3.1) | bitti |
| Senaryolar A–H | bitti; 18 ders, 121 sahne, 1.126 anlatım cümlesi (eski: 80 sahne, 270 cümle); `senaryo-denetle.cjs` temiz |
| Kullanıcı onayı | A1'i sitede izleyip onayladı: "a1 güzel. bundan sonrakiler de böyle olsun." (7 Ekim 2026). Bölünme adayları tek ders kaldı; öteki kararlar senaryodaki hâliyle uygulandı |
| Derslerin yeniden yazımı (18 ders) | bitti; A1 ana oturum, öteki 17 ders yedi alt ajan. Sonuç aşağıda |
| Bölüm 4 denetim tablosunda sahne numaraları | bitti (8 Ekim 2026): 82 satır yeni derslere göre eşlendi; sınır dışı numara yok, 121 sahnenin hepsi en az bir satırda |
| Seslendirme | üretildi (7–8 Ekim 2026); ayrıntı aşağıda "Seslendirme, yeni anlatım" |

Yayındaki 18 dersin hepsi yeni anlatımla.

### Yeniden yazım sonucu (7 Ekim 2026)

Ana oturumun son ölçümü (1366×657): 18 derste yerleşim ve bütçe sayaçlarının hepsi 0, konsol temiz; `denetle.js`: 18 kısa ders, sorun yok. Altyazılar senaryo cümleleriyle birebir (alt ajanlar betikle karşılaştırdı). Öğrenciye görünen metinde kitap, sayfa, "hazır veri", "sınıfta" taraması boş.

| Ders | Sahne | Altyazı | Seslendirilen satır | Karakter | `olc.js` |
|---|---|---|---|---|---|
| A1 | 6 | 55 | 54 | 3.337 | temiz |
| A2 | 7 | 55 | 55 | 3.392 | temiz |
| B1 | 7 | 65 | 65 | 3.627 | temiz |
| B2 | 8 | 74 | 74 | 4.469 | temiz |
| C1 | 7 | 68 | 66 | 4.496 | temiz |
| C2 | 7 | 66 | 65 | 4.072 | temiz |
| D1 | 6 | 61 | 61 | 3.979 | temiz |
| E1 | 7 | 67 | 66 | 4.429 | temiz |
| E2 | 7 | 60 | 59 | 3.562 | temiz |
| E3 | 7 | 59 | 58 | 4.025 | temiz |
| F1 | 8 | 72 | 72 | 4.456 | temiz |
| F2 | 6 | 60 | 60 | 3.658 | temiz |
| F3 | 7 | 67 | 67 | 3.856 | temiz |
| G1 | 7 | 69 | 68 | 4.589 | temiz |
| H1 | 6 | 73 | 71 | 5.120 | temiz |
| H2 | 6 | 59 | 57 | 4.139 | temiz |
| H3 | 6 | 55 | 54 | 4.211 | temiz |
| H4 | 6 | 56 | 54 | 3.602 | temiz |
| **Toplam** | **121** | | **1.126** | **73.019** | |

Altyazı sayısı ile seslendirilen satır arasındaki fark kısa etkileşim yönergeleridir (`noWait`). Yönerge: 111 (8 curious, 48 thoughtful, 55 short pause). Ses bütçesi tahmini: yaklaşık 85–100 dakika, 49 MB.

Bütünleştirmede yapılanlar: `tema.js` sahne sayıları ve açılış soruları; tema tanıtımından ve tema sayfası dipnotundan kitap ve sınıf cümleleri çıkarıldı (dipnotta yalnızca kaynak belirtimi kaldı); on derste "Sonraki" etiketi bir sonraki dersin başlığıyla eşlendi; E derslerinde düz kesme işaretleri düzeltildi; D1 sahne 6'da animasyon sırasında "4s" ve "3d" yazılarının üst üste binmesi giderildi (dört ardışık ölçüm temiz).

Açık kalanlar:

- Yalnızca 1366×657 ölçüldü; dar ekran ve telefon denenmedi. Yanlış şık yollarının hepsi ekranda görülmedi.
- Yukarıdaki "Seslendirme" bölümü (270 satır, A1 pilotu) eski anlatıma aittir. `ses/etkilesim-a1/` altındaki 8 klip artık hiçbir satırla eşleşmiyor; bir sonraki üretimde araç siler.
- Okunuşlar dinlenmedi: "se/pe/de/fe" orbital adları ("de" bağlaçla karışabilir), "i e bir", "Tamsın", "Raterford", "Haysenbörg", "ka be re ne".
- Senaryolardaki yazar çıkarımları ve C1 keşif yılları (`PLAN.md` bölüm 12 sonu) kullanıcı tarafından tek tek onaylanmadı; genel onayla uygulandı.

### Seslendirme, yeni anlatım (7–8 Ekim 2026)

Kullanıcı: "pilotu yeniden üret, sıkıntı yoksa geri kalanları üret." A1 pilotu yeni metinle üretildi; otomatik denetimde sorun çıkmayınca kalan 17 ders üretildi. Kullanıcı henüz dinlemedi; hiçbir klip kulakla denetlenmedi.

| Adım (`SESLENDIRME.md`) | Durum |
|---|---|
| 1–2 Döküm ve metin | dersler yazılırken yapıldı; 1.126 satır, 73.019 karakter, 111 yönerge; dökümde rakam, simge, kısaltma yok |
| 3 Pilot (A1) | üretildi (54 klip, 4,1 dk); kullanıcı dinlemeden devam edildi (kullanıcının talimatıyla) |
| 4 Üretim | bitti; 18 ders, 1.126 klip, 93,1 dk, 43,2 MB; hata ve yeniden deneme yok |
| 5 Sayfa bağlantısı | 18 sayfada `ses/etkilesim-<kod>.js` satırı |
| 6 Doğrulama | dizin ve dosyalar eşleşiyor (eksik 0, fazla 0); `denetle.js` temiz; süre aykırısı 14 klip, hepsi uzun yönde (aşağıda); kullanıcı dinlemesi bekliyor |
| 7 Kayıt | bu bölüm ve `plan/SESLENDIRME.md` |

| Ders | Klip | Süre (dk) | MB |
|---|---|---|---|
| A1 | 54 | 4,1 | 1,91 |
| A2 | 55 | 4,2 | 1,96 |
| B1 | 65 | 4,5 | 2,10 |
| B2 | 74 | 5,6 | 2,59 |
| C1 | 66 | 5,5 | 2,57 |
| C2 | 65 | 5,0 | 2,31 |
| D1 | 61 | 5,2 | 2,42 |
| E1 | 66 | 5,9 | 2,73 |
| E2 | 59 | 4,6 | 2,14 |
| E3 | 58 | 5,2 | 2,42 |
| F1 | 72 | 5,9 | 2,74 |
| F2 | 60 | 4,9 | 2,27 |
| F3 | 67 | 5,0 | 2,33 |
| G1 | 68 | 5,9 | 2,73 |
| H1 | 71 | 6,5 | 3,02 |
| H2 | 57 | 5,3 | 2,44 |
| H3 | 54 | 5,3 | 2,43 |
| H4 | 54 | 4,6 | 2,13 |
| **Toplam** | **1.126** | **93,1** | **43,2** |

Ölçülen oran: karakter başına 0,073–0,080 sn (ders ortancaları).

Süre aykırıları (karakter başına süresi dersin ortancasından %30'dan fazla uzun; kısa yönde aykırı yok, yani yutulmuş kelime işareti yok). Hepsi sayma ya da dizilim okuyan cümleler; dinlenmeli:

- A1 sahne 3: "Üç ayrı sos denendi: A, B ve C."
- D1 sahne 1, 2, 5, 6 (iki klip): orbital adlarını sayan beş cümle ("se, pe, de ve fe"; "bir se, iki se, iki pe…").
- E1 sahne 1 ve 3; E2 sahne 3; E3 sahne 1 ve 2: dizilim ve orbital sayan cümleler.
- F1 sahne 5; F3 sahne 6 ve 7: dizilim ve element sayan cümleler.

Dinlemede kulak verilecek okunuşlar: orbital adları ("se, pe, de, fe"; "de" bağlaçla karışabilir), "i e bir", "Tamsın" (Thomson), "Raterford", "Haysenbörg", "ka be re ne" (KBRN), "pehaş", "ayupak". Kötü çıkan klip: `ses/etkilesim-<kod>/<anahtar>.mp3` silinir, dersin komutu yeniden çalıştırılır; yalnızca o klip üretilir.

Harcanan karakter (bu tema, yeni anlatım): 73.019. Eski anlatımın A1 pilotu (470 karakter, 8 klip) silindi.


## Yürütme planı 2b: sese dokunmayan ekler (9 Ekim 2026)

`plan/YURUTME.md` 2b. Anlatım, altyazı, sahne ve `speak` değişmedi; klip yeniden üretilmedi. Her derse iki çıkış sorusu (2'den 4'e; üç şıklı; biri yeni durum, biri yanılgı), her konunun sonuna konu tekrarı dersi (seslendirilmedi; sayfalarda `ses/…` satırı yok). Görev tanımı ve üç yardımcı araç `gorev/` altında: `ek-soru-gorevi.md`, `ders-ozeti.cjs`, `soru-ekle.cjs`, `sik-sirala.cjs` (Fizik Bilimi ve Kariyer Keşfi'nden kopyalandı, yalnızca klasör yolu değişti; döküm aracı bu temada değişiklik istemedi).

| Konu | Ek sorular | Konu tekrarı | Kim | Durum |
|---|---|---|---|---|
| A Günlük hayatta kimya | A1–A2, 4 soru | `a3-tekrar` (altı kural, sekiz soru) | ana oturum (örnek) | bitti |
| B Kimyasal maddeler ve güvenlik | B1–B2, 4 soru | `b3-tekrar` (altı kural, sekiz soru) | Sonnet | bitti |
| C Atom teorileri | C1–C2, 4 soru | `c3-tekrar` (altı kural, sekiz soru) | Sonnet | bitti |
| D Orbitallerin enerjisi | D1, 2 soru | `d2-tekrar` (beş kural, altı soru) | Sonnet | bitti |
| E Elektron dizilimi | E1–E3, 6 soru | `e4-tekrar` (yedi kural, sekiz soru) | Sonnet | bitti |
| F Periyodik tabloda yer bulma | F1–F3, 6 soru | `f4-tekrar` (yedi kural, sekiz soru) | Sonnet | bitti |
| G İyon oluşumu | G1, 2 soru | `g2-tekrar` (beş kural, altı soru) | Sonnet | bitti |
| H Periyodik özellikler | H1–H4, 8 soru | `h5-tekrar` (sekiz kural, on soru) | Sonnet | bitti |

Toplam: 18 derse 36 ek soru, sekiz tekrar dersinde 62 soru; tema 26 kısa ders.

Denetim: `olc.js` 26 derste (A–G Haiku ajanı, H ana oturum; sırayla) bütün yerleşim ve bütçe sayaçları 0, konsol temiz. `sure.js` tema 246:27 (A 24:34, B 31:33, C 31:20, D 15:37, E 36:55, F 38:40, G 16:57, H 50:51; tekrar dersleri 3:51–6:57). Eski 18 dersin süresi 50–67 sn arttı (iki ek soru). `denetle.js`: "26 kısa ders, yayında. Sorun yok."; `--kural`: çıkış sorusu 4–5 değil 0/26, konu tekrarı yok 0/8. Karşılaştırmada 18 ders dosyasında değişiklik yalnızca `quiz` dizisine ekleme ve sekiz konunun son dersinde `nextLesson` satırı (H4'te alan yoktu, eklendi). Sekiz tekrar dersinden 12 görüntüye bakıldı.

Cevap yerleri (0/1/2): A1 1,0,2,1 · A2 1,2,0,2 · `a3` 0,2,1,1,0,2,2,1; B1 1,2,0,2 · B2 2,1,1,0 · `b3` 2,0,1,1,0,2,0,1; C1 1,2,0,2 · C2 1,2,1,0 · `c3` 1,2,0,2,1,0,2,0; D1 1,2,0,1 · `d2` 2,0,1,0,2,1; E1 1,2,0,2 · E2 1,2,2,0 · E3 1,2,0,1 · `e4` 0,2,1,2,0,1,1,2; F1 2,1,0,2 · F2 1,2,2,0 · F3 1,2,0,1 · `f4` 1,0,2,0,2,1,2,0; G1 1,2,2,0 · `g2` 1,2,0,2,1,0; H1 1,0,2,1 · H2 0,1,2,0 · H3 1,2,0,2 · H4 1,2,0,1 · `h5` 2,1,0,0,2,1,2,0,1,2.

Ana oturumun düzeltmeleri (ajan çıktısı):

- `a3-tekrar` üçüncü kural: tahtada 28 kelime vardı; alt satır silindi.
- C2 soru 3 ve H2 soru 3: doğru şık ötekilerden uzundu, kısaltıldı.
- `c3-tekrar` soru 5: şıklardaki yıllar çıkarıldı (cevap yalnızca tarih karşılaştırmasıyla bulunuyordu); soru 7: soru metnindeki ipucu cümlesi ("Rutherford modelinde çekirdek vardır") çıkarıldı.
- `d2-tekrar` soru 3: "Üç 4p orbitalinin üçü" → "Üç 4p orbitali".
- `h5-tekrar` soru 1: "yan yana durur" → "dizilir" (Al, P ve Cl komşu değil).

Notlar:

- `soru-ekle.cjs` E3 ve G1'de çalışmadı ("son sorunun yeri bulunamadı"): bu iki dosyada sorular `ust('…')` sarmalıyla yazılı. Ajanlar iki soruyu aynı biçimle elle ekledi; karşılaştırmada yalnızca ekleme var, `--sorular` ile okundu. Görev tanımına not düşüldü.
- Seslendirme metinlerinde Heisenberg "Haysenbörg", Thomson "Tamsın", Rutherford "Raterford" okunuyor; yukarıdaki "Okunuş kararları" bölümünde "Hayzenberg" yazıyor (dosyalar başka). Görev tanımı dosyalardaki okunuşa göre düzeltildi.
- Tek dersli konularda (D, G) tekrar dersi dersin hemen ardından gelir: beş kural, altı soru. Kullanıcı gereksiz bulursa iki dosya ve `tema.js` satırı silinir, D1 ve G1'in `nextLesson` satırı eski hâline döner.
- Kullanıcının bakabileceği sorular: `c3-tekrar` soru 6 (berilyum derste geçmiyor; elektron sayısı soruda veriliyor), `d2-tekrar` soru 5 (dördüncü seviyede on altı orbital: toplam derste yazılmıyor, parçalardan bulunuyor), `e4-tekrar` soru 7 ve `h5-tekrar` soru 7 (yarı dolu dizilim karşılaştırması derste N–O ve P–S ile; soruda Si–P ve N–O), `f4-tekrar` soru 4 (14. grup = 4A: derste 3A = 13 veriliyor), B2 soru 4 ile `b3-tekrar` soru 7 (aynı kalıp: iki uyarıyı birlikte karşılayan önlem), `a3-tekrar` soru 2 (sirke 3, süt 6,5, sabunlu su 9: pH değerleri soruda verildi, derste yok).
- Sekiz tekrar dersi seslendirilmedi. `speak` hazır: `a3` 2 (pH), `c3` 6 (yıllar, Bohr), `d2` 7, `e4` 5, `f4` 11, `g2` 3, `h5` 3.
- Ajan başına bağlam: B 132, C 126, D 99, E 153, F 169, G 108, H 158 bin token; ölçüm (Haiku) 52 bin.

## Sıradaki

- Bu temada 2b bitti. Açık iş yok. Push "failed to get: -25308" verirse oturum SSH üzerindendir ve giriş anahtarlığı kilitlidir: kullanıcı `security unlock-keychain ~/Library/Keychains/login.keychain-db` çalıştırır.
- Yürütme sırası: `plan/YURUTME.md` 2b, son tema Kuvvet ve Hareket (`fizik/kuvvet-ve-hareket/`, 6 konu, 24 ders: A 2, B 2, C 9, D 2, E 7, F 2; altı tekrar dersi: `a3`, `b3`, `c10`, `d3`, `e8`, `f3`). Ders dosyaları büyük (toplam 980 KB); kit 17 KB. Bu temanın üç aracı (`plan/kimya/etkilesim/gorev/*.cjs`; içlerindeki klasör yolu ve kimlik öneki değiştirilerek) ve görev tanımı kopyalanıp `plan/fizik/kuvvet-ve-hareket/gorev/` altına uyarlanır. Önce `ders-ozeti.cjs --sorular <harf>` altı konuda denenir; şık sayısı (üç mü dört mü) ve soruların `ust(…)` gibi bir sarmalla yazılıp yazılmadığı (`soru-ekle.cjs` orada çalışmaz) bakılır.
- 2b.1: A konusu ana oturumda (örnek); 2b.2: kalan beş konu. C (9 ders) ve E (7 ders) bağlam bütçesini aşar: soru ekleme iki ajana bölünür, tekrar dersi üçüncü ajana verilir (Biyoloji Yaşam F konusundaki gibi). Aynı anda en çok dört ajan. Sonra `olc.js` Haiku ajanıyla sırayla (21 ders 32 dakika sürdü), `sure.js` ve `denetle.js` ana oturumda.
- Görev iletisinde cevap yerleri sayıyla verilir; ajan raporundaki cevap yerlerine güvenilmez: `ders-ozeti.cjs --sorular <harf>` ile okunur. Sayısal soru isteyen konularda (C, E) "sayı uydurma, yazmadan önce hesapla" kuralı görev iletisine yazılır.
- 2b bitince sıra `YURUTME.md` 3. adıma geçer (yeni temalar; ilk tema Matematik · Eşlik ve Benzerlik). Kimya Çeşitlilik'in seslendirmesi ve yayını kullanıcıyı bekliyor.
