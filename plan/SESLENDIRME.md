# Bir temayı seslendirmek

Bütün temalar için ortak adımlar. Seslendirme işleme almanın dışındadır (`ISLEME.md`); kullanıcı "şu temayı seslendir" ya da "şu konuyu seslendir" dediğinde bu dosya baştan sona uygulanır. İlk uygulama: Sayılar, A konusu (7 Ekim 2026).

## Kararlar

| Konu | Karar |
|---|---|
| Servis | ElevenLabs; anahtar kökteki `.env` dosyasında (`ELEVENLABS_API_KEY`), depoya girmez |
| Anlatıcı | Gamze Özdemir (`Hvrobr8BhLPfiaSv2cHi`), bütün derslerde aynı ses |
| Model | `eleven_v4` |
| Biçim | `mp3_44100_64`. 128 kbps ile yan yana dinlendi, fark duyulmadı; boyut yarısı. Örnekler: `matematik/sayilar/ses/ornekler/dinle.html` |
| Ne seslendirilir | Tahtada bir şey olurken beklenerek okunan açıklama altyazıları (`c.say`). `noWait` ile gösterilen yönergeler, soru panelleri, geri bildirimler, sınav ve özet seslendirilmez |
| Yönergeler | Kullanıcı dinleyip seçti (8 Ekim 2026). **Kullanılır:** `[curious]` (öğrenciye sorulan gerçek soru), `[thoughtful]` (yanılgı, tuzak ve "neden" anlatımları), `[short pause]` (cevaptan önce ve kuralın hemen öncesinde, cümle içinde). **Kullanılmaz:** `[excited]` (fazla coşkulu geldi). Yaklaşık on satırda bir; bir derste en çok iki üç tane. Gülme, ses efekti, başka yönerge yok; yeni bir etiket denenecekse önce `ses/ornekler/dinle.html` gibi bir örnekle dinlenir |

Ses, model ve biçim `araclar/ses-uret.js` içindeki `VARSAYILAN` alanındadır. Üçünden biri değişirse eski klipler geçersiz sayılır ve bir sonraki çalıştırmada yeniden üretilir.

## Klip nasıl eşleşir

Her klibin adı, okunan metnin özetidir (`speak:` varsa o, yoksa altyazının düz metni). Metinde tek harf değişirse klip boşa gider ve yeniden üretilir. Bu yüzden sıra hep aynıdır: önce metin kesinleşir, sonra seslendirilir. Klibi olan bir dersin `speak:` metnine sonradan dokunulmaz; dokunmak gerekiyorsa o satırın yeniden üretileceği bilinerek yapılır.

Ses açıkken altyazı okuma süresi kadar değil, klip bitene kadar bekler. Sahnenin temposunu artık klip belirler.

## Adımlar

### 0. Ön koşul

Tema yazılmış, kullanıcı dersleri izlemiş, metin değişmeyecek. `node araclar/olc.js <tema>/<kod>` her derste ve `node araclar/denetle.js <ders>/<tema>` temiz.

Çalışma klasöründe başka oturum varsa dal değiştirilmez; yalnızca temanın kendi klasörlerine yazılır.

### 1. Döküm

Her ders için `node araclar/ses-uret.js <tema>/<kod> --liste --metin` (API çağrısı yok, ücretsiz). Ders başına satır ve karakter sayısı `plan/<ders>/<tema>/DURUM.md` içinde "Seslendirme" başlığı altına tablo olarak yazılır. Araç "sahne otomatik tamamlanamadı" derse o sahnenin satırları eksik toplanmıştır; önce o düzeltilir.

Bitti: her dersin satır ve karakter sayısı tabloda, uyarı yok.

### 2. Metin denetimi

Dökümdeki her satır okunur. Model yazıyı olduğu gibi okur; yanlış okunacak her şey `speak:` metninde kelimeyle yazılır. Ekrandaki altyazı değişmez.

- Simge kalmaz: `<`, `=`, `√`, `°C`, üs ve alt simgeler kelimeyle ("iki üzeri üç", "karekök iki", "dört derece").
- Rakamlar kelimeyle yazılır ("1024" değil "bin yirmi dört"); ondalıklar "otuz bir virgül altı".
- Bitişik cebir açılır: "2ab" yerine "iki a b", "(a+b)²" yerine "a artı b, bütünün karesi".
- Tek harfli adlara gelen ekler açık yazılır: "f’nin" yerine "f fonksiyonunun", "A6’daki" yerine "A altı dersindeki".
- pH "pehaş" okunur (kullanıcı kararı, 7 Ekim 2026): "pH’si" yerine "pehaşı", "pH 7" yerine "pehaş yedi". Ekrandaki yazım değişmez.
- Vurgu büyük harfle verilebilir ("DEĞİL"); seyrek kullanılır.
- Yönergeler yukarıdaki kurala göre eklenir.
- Açıklama niteliğinde olduğu hâlde `noWait` ile gösterilen altyazı seslendirilmez. Seslendirilmesi isteniyorsa ders, o altyazıyı bekleyerek gösterecek biçimde düzeltilir.

Metin değişen her derste `olc.js` yeniden çalıştırılır.

Bitti: dökümde simge ve rakam içeren satır yok; yönerge sayısı ders başına tabloya işlendi.

### 3. Pilot

Temanın ilk dersi üretilir: `node araclar/ses-uret.js <tema>/<kod>`. Kullanıcı dersi sesli izler. Yanlış okunan kelime varsa metin düzeltilir ve o satır yeniden üretilir; aynı kalıp öteki derslerin metninde de aranıp düzeltilir.

Bitti: kullanıcı pilotu onayladı.

### 4. Üretim

Konu konu, ders ders aynı komut. Araç var olan klibi atlar; yarıda kesilirse kaldığı yerden sürer. Metni artık derste geçmeyen eski klipleri kendisi siler ve `ses/<ders-id>.js` dizinini yazar.

Bitti: her derste `--liste` "Üretilecek: 0 klip" diyor.

### 5. Sayfa bağlantısı

Ders sayfasına, `ders.js` satırından sonra ve ders dosyasından önce:

```html
<script src="ses/<ders-id>.js"></script>
```

Sayılar'ın sayfalarında bu satır baştan vardır; öteki temalarda seslendirme üretilince eklenir (`ISLEME.md` 6. adım).

### 6. Doğrulama

1. Dizindeki her klibin dosyası var; klasörde dizinde olmayan klip yok.
2. Her klibin süresi ölçülür (`ffprobe`). Karakter başına süre, dersin ortancasından %30'dan fazla sapan klipler listelenir ve dinlenir: çok kısa klip yutulmuş kelime, çok uzun klip uzun sessizlik ya da tekrar demektir.
3. `olc.js` (her ders) ve `denetle.js` (tema) temiz.
4. Kullanıcı her konudan en az bir dersi sesli izler; animasyonla sesin koptuğu sahneler not edilir.

Kötü çıkan klip: `ses/<ders-id>/<anahtar>.mp3` silinir ve dersin komutu yeniden çalıştırılır; yalnızca o klip üretilir.

Bitti: dört madde de temiz ya da kalanlar `DURUM.md` içinde yazılı.

### 7. Kayıt ve rapor

- `DURUM.md` "Seslendirme" tablosu: ders, klip sayısı, süre, durum.
- Aşağıdaki "Durum" tablosu.
- Kullanıcıya: kaç klip, kaç dakika, kaç MB, harcanan karakter, dinlenmesi gereken klipler.

Commit ve push kullanıcı isteyince; klipler depoya girer.

## Bütçe

Sayılar A'da ölçülen: karakter başına 0,083 sn ses ve 0,67 KB (64 kbps). Bin karakter yaklaşık 83 sn ve 0,67 MB eder. ElevenLabs ücreti karakter sayısıyla işler; yeniden üretilen her klip yeniden ücretlenir.

## Durum

Karakter sayıları 7 Ekim 2026 dökümünden; metin denetiminde rakamlar kelimeye çevrilince artar.

| Ders | Tema | Konu | Kısa ders | Satır | Karakter | Durum |
|---|---|---|---|---|---|---|
| Matematik | Sayılar | A | 8 | 109 | 11.531 | seslendirildi (109 klip, 15,8 dk, 7,7 MB) |
| Matematik | Sayılar | B | 7 | 151 | 9.109 | seslendirildi (151 klip, 12,5 dk, 6,1 MB); 18 rakamlı satır kelimeye çevrildi, 9 yönerge; kullanıcı henüz dinlemedi |
| Matematik | Sayılar | C | 5 | 80 | 3.913 | seslendirildi (80 klip, 5,5 dk, 2,69 MB); 48 satıra speak, 6 yönerge; %40 süre aykırısı yok; C1’de yerleşim bulguları, kullanıcı henüz dinlemedi |
| Matematik | Sayılar | D | 8 | 122 | 6.718 | seslendirildi (122 klip, 9,4 dk, 4,58 MB); okunuş `04-islem-ozellikleri-cebirsel.js` içindeki `spk` ile otomatik (rakam, simge, ek), 18 yönerge (`say(c, html, { ton, dur })`); kullanıcı henüz dinlemedi |
| Matematik | Geometrik Şekiller | A–C | 12 | 222 | 11.675 | seslendirildi (222 klip, 15,7 dk, 7,64 MB; 8 Ekim 2026); 52 satıra `speak`, 28 yönerge; A1 pilotunu kullanıcı dinleyip onayladı; kısa yönde süre aykırısı yok, 7 klip uzun yönde aykırı (B ve C); kullanıcı öteki dersleri henüz dinlemedi |
| Matematik | Nicelikler ve Değişimler | A–C | 32 | 526 | 26.807 | seslendirildi (526 klip, 36,1 dk, 16,83 MB); okunuş `dersler/kit.js` içindeki `oku` ile otomatik (rakam, ek, birim, kesir), 102 satıra elle `speak`, 83 yönerge (`soyle(c, html, { ton, dur })`); kısa yönde süre aykırısı yok, 8 klip uzun yönde aykırı; pilot atlandı, kullanıcı henüz dinlemedi |
| Fizik | Fizik Bilimi ve Kariyer Keşfi | A–D | 6 | 93 | 4.787 | üretildi (93 klip, 6,1 dk, 2,8 MB); pilot atlandı, kullanıcı henüz dinlemedi; yönerge yok |
| Fizik | Akışkanlar | hikâye A1 | — | 14 | 767 | üretildi (14 klip, 58,9 sn; `fizik/akiskanlar/hikaye/a1-canta-askisi/assets/ses/`); üç yönerge; kullanıcı henüz dinlemedi |
| Fizik | Kuvvet ve Hareket | A–F | 24 | 1.472 | 89.388 | seslendirildi (1.472 klip, 115,7 dk, 57 MB); okunacak metni altı Sonnet 5.5 alt ajanı hazırladı, 144 yönerge; pilot kullanıcı kararıyla atlandı; kısa yönde süre aykırısı yok, 14 klip uzun yönde aykırı (liste `plan/fizik/kuvvet-ve-hareket/DURUM.md`); kullanıcı henüz dinlemedi |
| Kimya | Etkileşim | A–H | 18 | 1.126 | 73.019 | seslendirildi (1.126 klip, 93,1 dk, 43,2 MB); anlatım 7 Ekim 2026'da yeniden yazıldıktan sonra yeni metinle üretildi, 111 yönerge; kısa yönde süre aykırısı yok, 14 klip uzun yönde aykırı (sayma ve dizilim cümleleri); kullanıcı henüz dinlemedi |
| Biyoloji | Yaşam | A–H | 37 | 940 | 59.071 | seslendirildi (940 klip, 72,5 dk, 33,7 MB; 8 Ekim 2026); okunacak metni beş Sonnet 5.5 alt ajanı hazırladı, üretimi üç Haiku 5.5 alt ajanı yaptı; 115 yönerge; A1 pilotunu kullanıcı dinleyip onayladı; kısa yönde süre aykırısı yok, 12 klip uzun yönde aykırı (liste `plan/biyoloji/yasam/DURUM.md`); 16 ders eski anlatımla seslendirildi; kullanıcı öteki dersleri henüz dinlemedi |

Yazılmamış temalar işleme alındıkça bu tabloya eklenir.

## Araçta eksik olanlar

Bugün elle yapılıyor; iş büyüdükçe `araclar/` içine eklenmeye değer:

- Tema ya da konu düzeyinde toplu çalışma (araç tek ders alır).
- Tek klibi yeniden üretme bayrağı (bugün dosya elle silinir).
- Metin denetimi: okunan metinde simge, rakam ve bilinmeyen yönerge arayan bayrak.
- `denetle.js` içinde ses denetimi: dizindeki klip dosyaları, klibi olan sayfada dizin satırı.
- Süre aykırılarını listeleyen ölçüm ve tema için dinleme sayfası.
