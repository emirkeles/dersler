# Yürütme planı

Bu dosya `YOL-HARITASI.md` içindeki sıranın nasıl yürütüleceğini anlatır: hangi işi ana oturum yapar, hangisi Sonnet, hangisi Haiku alt ajanına gider, her adım ne zaman bitmiş sayılır. Temiz bir oturumda "yürütme planını uygula" denince bu dosya baştan sona, ilk bitmemiş adımdan sürdürülür. 8 Ekim 2026'da yazıldı.

## Kurallar

- Bağlayıcı dosyalar: `KURALLAR.md` (3–3.4 yeni anlatım kuralları), `ISLEME.md`, `SESLENDIRME.md`, `../ortak/API.md`, `../CLAUDE.md`.
- Onay beklenmez; yalnızca aşağıda "kullanıcı" yazan yerde durulur. Ücretli iş (seslendirme, görsel üretimi) yalnızca "izin" satırında yazanlar için yapılır.
- Çalışma klasörünü başka oturumlar da kullanıyor. Dal değiştirilmez; yalnızca işin kendi dosyaları commit edilir (`git add <dosya>`; `git add -A` kullanılmaz). `ortak/ders.js`, `ortak/ders.css`, `ortak/API.md` üzerinde başkasının bitmemiş değişikliği olabilir; onlar commit'e alınmaz.
- Commit ve push doğrudan `main`'e. `main` canlı siteyi yayınlar: seslendirilmemiş ya da ölçümü temiz olmayan ders commit edilmez.
- İlerleme `TASKS.md` ve temanın `DURUM.md` dosyasına yazılır; alt ajanlar bu iki dosyaya, `tema.js` ve `kit.js` dosyalarına yazmaz.

## Kim ne yapar

Alt ajanlar Agent aracıyla, `model` alanı verilerek açılır. Ana oturum alt ajanın raporuna güvenmez: her dersten en az iki sahnenin görüntüsüne kendisi bakar.

| İş | Kim | Neden |
|---|---|---|
| Müfredatı ve ders kitabını okuma, `PLAN.md` kararları, kapsam | ana oturum | Program dışı içerik burada girer ya da kalır; hata pahalıdır |
| Konunun ilk senaryosu ve ilk dersi (örnek olur) | ana oturum | Üslup, kit ve örnek-birlikte çöz-tek başına sırası burada oturur |
| Öteki senaryolar (örnek senaryoya göre) | `model: "sonnet"` | Kuralı ve örneği verilmiş, yapılandırılmış yazı |
| Ders kodu (bitmiş senaryodan), konu tekrarı dersleri, ek çıkış soruları | `model: "sonnet"` | Senaryo belirliyken uygulama işi; `olc.js` ile kendini denetler |
| Seslendirme metni denetimi (`speak`, yönergeler) | `model: "sonnet"` | `SESLENDIRME.md` adım 1–2 |
| Klip üretimi, dizin ve süre doğrulaması, `olc.js` / `denetle.js` / `sure.js` çalıştırıp raporlama, sayfaya ses satırı | `model: "haiku"` | Komut çalıştırma ve sayma; karar yok |
| Alt ajan çıktısının denetimi, `tema.js`, `kit.js`, kayıt, commit | ana oturum | Ortak dosyalar ve son söz |

Denetim noktası (8 Ekim 2026): Sonnet'in yeni kurallarla yazdığı ilk dersler (Kimya Çeşitlilik A2 ve A3) pilot derslerle yan yana konup karşılaştırıldı; yeterli bulundu, ders kodu Sonnet'te kalır. Alt ajan raporundaki "senaryodan sapmalar" yine de her derste okunur.

### Alt ajan görevinin kalıbı

Her görev tek derslik ve kendi başına anlaşılır olur; okuma, çıktı ve görüntü sınırları "Bağlam bütçesi" bölümündedir. Temanın ortak görev tanımı `plan/<ders>/<tema>/gorev/` altında durur (oturuma özgü geçici klasörde değil: sonraki oturum da kullanır) ve `plan/gorev/ders-gorevi.md` şablonundan kopyalanıp temaya uyarlanır; görev iletisi yalnızca o derse özgü olanı söyler. Pilotta işe yarayan kalıp:

1. Ne yazılacağı: dosya yolu, ders kimliği, dersin fikri.
2. Önce okunacaklar, sırayla: senaryoda baştaki okuma kılavuzu ile yalnızca o dersin bölümü (satır aralığı görev iletisinde verilir); tek örnek ders (temanın kendi ilk dersi, yoksa `matematik/geometrik-sekiller/dersler/a1-olcmek-ispat-degildir.js`); temanın `kit.js` dosyası ve konunun araç dosyası; `ortak/API.md`. `KURALLAR.md` 3–3.4 ve 4'ün gereken maddeleri görev tanımına yazılır, ajan o dosyayı okumaz.
3. Derste bulunması gerekenler: "Hatırla" sahnesi (başlığı tam böyle), `tag: 'Birlikte çöz'`, 4–5 çıkış sorusu ve her şık için `why`, akılda kalıcı cümle.
4. Sınırlar: altyazı tek cümle ve en çok 12 kelime; tahtada en çok 25 kelime ve 12 öğe; rakam ve simge içeren altyazıda `speak`; yönerge yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; öğrenciye kitap, sayfa, sınıf denmez.
5. Kapsam: yalnızca kendi dosyası. `tema.js`, `kit.js`, sayfalar, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik araç yerelde yazılır ve raporlanır.
6. Doğrulama: `node araclar/olc.js <tema>/<kod> --goruntu <geçici klasör>`; "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz"; her sahnenin son görüntüsüne bakılır. En çok üç ölç-düzelt turu.
7. Rapor: sahne adları ve sayısı, son `olc` satırları, temiz olmayan her şey, senaryodan her sapma, içerikle ilgili her kuşku, görev tanımında cevabını bulamayıp kaynakta aradığı her şey.

## Bağlam bütçesi

Her istek o andaki bağlamın tamamını yeniden okur; maliyet bağlamın boyuyla büyür. 8 Ekim 2026 ölçümü (Kimya Çeşitlilik): konu başına açılan ders ajanları (3–5 ders) 340–450 bin token'a, ana oturum 864 bin token'a çıktı; ajanlar ilk satırı yazmadan önce okumayla 150 bine ulaştı. Aşağıdaki kurallar bunun içindir; hedef ajan başına en çok 150–200 bin, ana oturumda en çok 300 bin token.

### Alt ajan

- **Bir ajan, bir kısa ders** (sayfası ve ders dosyası). Konu tekrarı dersi ayrı ajandır. Konunun araç dosyasını (`<harf>-araclar.js`) konunun ilk dersini yazan ajan açar; o bitince konunun kalan dersleri paralel yazılır. Kalan ajanlar araç dosyasını okur, değiştirmez; eksik aracı kendi ders dosyasında yazar ve raporlar.
- **Okuma listesi kapalıdır:** kalıbın 2. maddesindekiler. `KURALLAR.md`, `ISLEME.md`, `ortak/ders.js`, `ortak/ders.css`, `araclar/` ve öteki konuların ders dosyaları okunmaz. Görev tanımında cevabı olmayan bir şey için `grep -n` ile tek işleve bakılır ve eksik raporlanır.
- **Görev tanımı büyür, ajan aramaz:** ajanların kaynakta aradığı her şeyi (ölçüm aracı sahneyi nasıl geçer, kaydırıcı ve düğme nasıl kurulur, sık yapılan hata) ana oturum görev tanımına ekler.
- **Komut çıktısı kısaltılır:** `| tail -20`, `grep -n`, `sed -n a,bp`. Dosya `cat` ile dökülmez; yüz satırı aşan çıktı alınmaz.
- **Görüntü:** her sahnenin son karesi (`sNN-son.png`) ve soru sahnelerinde bir ara kare. Aynı kareye iki kez bakılmaz; düzeltmeden sonra yalnızca değişen sahne yeniden görülür.
- **Dur kuralı:** en çok üç ölç-düzelt turu. Üçüncüden sonra temiz değilse ajan kalanı raporlar ve durur.
- **Geri dönüş:** ana oturum bir ajana `SendMessage` ile en çok bir kez döner. Sonraki düzeltme, dosya yolunu ve düzeltme listesini alan yeni bir ajanla yapılır.

### Ana oturum

- **Oturum sınırları.** Şu noktalarda kayıt yazılır ve oturum biter; iş temiz oturumda "yürütme planını uygula" ile sürer:
  - temanın planı, ilk senaryosu ve ilk dersi bitince (2a.2);
  - senaryolar bitince (2a.4);
  - ders yazımında her sekiz ders ajanından sonra (2a.5);
  - tema denetiminden önce (2a.7);
  - 2b'de her temadan sonra.
- **Devir.** Oturum biterken temanın `DURUM.md` dosyasına "Sıradaki" bölümü yazılır: biten dersler, sıradaki ajanlar ve görev iletileri için gereken bilgi, görev tanımının yolu, açık sorunlar. Yeni oturum bu dosya, `YURUTME.md` ve görev tanımıyla sürdürebilmelidir; `TASKS.md` baştan sona okunmaz.
- **Ana oturum ders dosyasını baştan sona okumaz.** Denetim ajan raporu, görüntüler ve `grep` ile yapılır; ölçüm çıktısı Haiku ajanından özet olarak gelir.
- Oturumun son iletisi kullanıcıya şunu söyler: `/clear`, sonra "yürütme planını uygula".

## Adımlar

### 1. Pilotu kapat: Geometrik Şekiller A konusu (bitti: 8 Ekim 2026)

**İzin:** kullanıcı 8 Ekim 2026'da verdi: "seslendirme, commit ve yayına geçebilirsin." Bu adımda başka onay beklenmez.

**Başlangıç durumu:** A1–A5 yeniden yazıldı, `a6-tekrar.html` eklendi; hepsi çalışma klasöründe, commit edilmedi. Sayfalardan ses satırı çıkarıldı. Ayrıntı `plan/matematik/geometrik-sekiller/DURUM.md` "Pilot" bölümü. Üretilecek: 131 klip, yaklaşık 7.000 karakter (A1 17, A2 12, A3 41, A4 24, A5 29, A6 8; metin denetiminde artabilir). `ses-uret.js --liste` dersi gerçek zamanda oynatır: ders başına bir iki dakika sürer, uzun süre sınırıyla çalıştırılır.

| # | İş | Kim | Bitti sayılır |
|---|---|---|---|
| 1.1 | Altı dersin metin dökümü ve `speak` denetimi (`SESLENDIRME.md` adım 1–2). Yalnızca `speak` değişir; altyazı ve kod değişmez | Sonnet, iki ajan (A1–A3, A4–A6) | Dökümde rakam ve simge yok; altyazılar `git diff` ile aynı; `olc.js` altı derste temiz |
| 1.2 | Ajan çıktısını tara: yönergeler izinli üçlüden mi, okunuşlar derslerde aynı mı (α, β, γ, "//", derece) | ana oturum | Tarama boş |
| 1.3 | Üretim: `node araclar/ses-uret.js geometrik-sekiller/<kod>` altı ders için. Pilot dinleme adımı atlanır (ses ve yönergeler bu temada onaylı) | Haiku, iki ajan | Her derste `--liste` "Üretilecek: 0 klip" |
| 1.4 | Altı sayfaya `ses/<ders-id>.js` satırı (`ders.js` satırından sonra) | Haiku | Altı sayfada satır var, konsol temiz |
| 1.5 | Doğrulama (`SESLENDIRME.md` adım 6): dizin ile dosyalar, süre aykırıları, `olc.js`, `sure.js`, `denetle.js` | Haiku; `sure.js` çıktısını ana oturum yazar | Liste `DURUM.md` içinde |
| 1.6 | Kayıt: `DURUM.md`, `SESLENDIRME.md` durum satırı, `plan/matematik/TEMALAR.md`, `TASKS.md` | Sonnet ya da ana oturum | Dosyalar güncel |
| 1.7 | Commit ve push: `matematik/geometrik-sekiller/` altındaki pilot dosyaları, `ses/` klipleri, plan dosyaları | ana oturum | `main` üzerinde; canlı sitede A1 sesli açılıyor |

Sonra kullanıcıya: kaç klip, kaç dakika, harcanan karakter, dinlenmesi gereken klipler. Açık kalan içerik sorusu da hatırlatılır: A2'de "bir noktadan tek paralel" ve "doğru açı 180°dir" taşları "başka bilgilere dayanan" bilgi olarak duruyor.

### 2. İki iş birlikte

**İzin:** yazım için var (yol haritası onaylı). Seslendirme ve yayın her tema için ayrıca istenir.

#### 2a. Kimya · Çeşitlilik (31 ders, 13 konu, her konuya bir konu tekrarı) (yazım bitti: 8 Ekim 2026; commit, seslendirme, yayın bekliyor)

`ISLEME.md` baştan sona uygulanır; şablon `ortak/sablon/` (`kural: 2` satırı kalır).

| # | İş | Kim |
|---|---|---|
| 2a.1 | `MUFREDAT.md`, ders kitabı (2b), açık soruların kapatılması, `PLAN.md` kararları, denetim tablosu | ana oturum |
| 2a.2 | Konu A'nın senaryosu, iskelet, `kit.js`, A konusunun ilk dersi | ana oturum |
| 2a.3 | **Denetim noktası:** A konusunun kalan dersleri ve konu tekrarı Sonnet ajanlarıyla yazılır; ana oturum görüntüleri pilotla karşılaştırır. Yeterliyse sürer; değilse ders kodu ana modelin ajanlarına geçer | Sonnet, sonra ana oturum |
| 2a.4 | B–M konularının senaryoları (konu başına bir ajan, A senaryosu örnek) | Sonnet; her senaryoyu ana oturum program metniyle karşılaştırır |
| 2a.5 | B–M dersleri ve konu tekrarları (ders başına bir ajan; aynı anda en çok dört; her konuda ilk ders araç dosyasıyla önce yazılır; sekiz ajanda bir oturum sınırı) | Sonnet |
| 2a.6 | Her konudan sonra: `olc.js` bütün derslerde, raporların denetimi, `tema.js` satırları, kite taşınacak araçlar | Haiku ölçer; ana oturum denetler ve yazar |
| 2a.7 | Tema denetimi (`ISLEME.md` 7): `sure.js`, `denetle.js`, denetim tablosuna sahne numaraları, `TEMALAR.md` | ana oturum; sayım Haiku |
| 2a.8 | Rapor; kullanıcı izler. Seslendirme ve yayın ayrıca istenir | kullanıcı |

#### 2b. Yedi eski temaya sese dokunmayan ekler

Anlatım ve altyazı değişmez; klip yeniden üretilmez. Tema başına iş:

- Her derste çıkış soruları 2'den 4'e çıkar: biri derste görülmemiş bir duruma uygulama, biri dersin hedeflediği yanılgı. Yalnızca derste öğretilenle cevaplanır.
- Her konunun sonuna konu tekrarı dersi (`<kod>-tekrar.html`): tek sahnede konunun kuralları, ardından 6–10 karışık soru. Örnek: `matematik/geometrik-sekiller/dersler/a6-tekrar.js`.
- `tema.js` içine `kural: 2` yazılmaz (hatırla sahnesi ve birlikte çöz bu temalarda yok); denetim `denetle.js --kural` özetiyle izlenir.

Sıra: Nicelikler ve Değişimler (3 konu), Sayılar (4), Geometrik Şekiller B ve C (2), Biyoloji Yaşam (8), Fizik Bilimi ve Kariyer Keşfi (4), Kimya Etkileşim (8), Kuvvet ve Hareket (6).

Biten: Nicelikler ve Değişimler (8 Ekim 2026; görev tanımı örneği `plan/matematik/nicelikler-ve-degisimler/gorev/ek-soru-gorevi.md`, sonraki temada kopyalanıp uyarlanır), Sayılar (8 Ekim 2026; kiti olmayan temada kendi başına çalışan tekrar dersi örneği `matematik/sayilar/dersler/a9-tekrar.js`, görev tanımı `plan/matematik/sayilar/gorev/ek-soru-gorevi.md`), Geometrik Şekiller B ve C (8 Ekim 2026; kiti olan, ders başına dosyalı temada örnek `matematik/geometrik-sekiller/dersler/b5-tekrar.js`, görev tanımı `plan/matematik/geometrik-sekiller/gorev/ek-soru-gorevi.md`). Biyoloji Yaşam (9 Ekim 2026; ders dosyaları üç ayrı biçimde yazılmış temada örnek: ajanlar ders dosyasını okumaz, döküm ve soru ekleme `plan/biyoloji/yasam/gorev/` altındaki araçlarla yapılır; tekrar dersi örneği `biyoloji/yasam/dersler/a4-tekrar.js`, görev tanımı `plan/biyoloji/yasam/gorev/ek-soru-gorevi.md`). Fizik Bilimi ve Kariyer Keşfi (9 Ekim 2026; tek dersli konularda beş kural ve altı soruluk tekrar dersi örneği `fizik/fizik-bilimi-ve-kariyer-kesfi/dersler/a2-tekrar.js`, görev tanımı `plan/fizik/fizik-bilimi-ve-kariyer-kesfi/gorev/ek-soru-gorevi.md`). Kimya Etkileşim (9 Ekim 2026; büyük ve çok satırlı ders dosyalarında örnek: sayısal değer uydurmama ve eğilim sorularında tek cevap kuralları görev tanımında; `ust(…)` sarmalıyla yazılmış iki derste `soru-ekle.cjs` çalışmadı, sorular elle eklendi; tekrar dersi örneği `kimya/etkilesim/dersler/a3-tekrar.js`, görev tanımı `plan/kimya/etkilesim/gorev/ek-soru-gorevi.md`). Sıradaki: Kuvvet ve Hareket (devir notu `plan/kimya/etkilesim/DURUM.md` "Sıradaki").

İçerik denetiminde (2b.4) dört şeye ayrıca bakılır: şıkta ya da geri bildirimde sonraki dersin terimi geçiyor mu; eklenen soruların doğru şıkkı hep aynı yerde mi (konu toplamında ve her dersin üçüncü, dördüncü sorusunda); şıkların biçimi cevabı ele veriyor mu ("Haklı; … / Haksız; … / Haklı; …" dizilişinde tek kalan şık); doğru şık ötekilerden belirgin uzun mu.

| # | İş | Kim |
|---|---|---|
| 2b.1 | Temanın ilk konusu: ek sorular ve konu tekrarı (örnek olur) | ana oturum |
| 2b.2 | Kalan konular, konu başına bir ajan | Sonnet |
| 2b.3 | Ölçüm ve tema denetimi; `tema.js` satırları ve süreler | Haiku ölçer; ana oturum yazar |
| 2b.4 | Soruların içerik denetimi: cevap doğru mu, çeldirici öğretilmemiş bir konuya dayanıyor mu | ana oturum (her konudan örnek okur) |
| 2b.5 | Commit ve push tema tema: seslendirme gerektirmediği için ölçüm temizse yayına girer | ana oturum |

### 3. Sonraki yeni temalar

2a ile aynı düzen; sıra `YOL-HARITASI.md` 3. adımdaki tablodadır. Her tema bittiğinde kullanıcı izler, seslendirme ve yayın ayrıca istenir.

### 4. Eski temalarda anlatımın yeniden yazımı

Pilotla aynı düzen (senaryoya "Pilot" bölümü, sonra dersler). Ücretli seslendirme gerektirir; her tema için kullanıcı ayrıca ister. Sıra `YOL-HARITASI.md` 4. adımda.

## Her oturumun sonunda

- `TASKS.md` ve ilgili `DURUM.md` güncel (`DURUM.md` içinde "Sıradaki" bölümü, bkz. "Bağlam bütçesi"); bu dosyada biten adımın satırına tarih düşülür.
- İş panosu güncellenir: <https://claude.ai/artifact/6Kvyof62n92HwsuFyuvfTd> (veriler sayfanın içindeki `ISLER` ve `TEMALAR` dizilerindedir; kaynağın kopyası `plan/is-panosu.html`. Dosya düzenlenir ve Artifact aracıyla bu adres `url` olarak verilerek yeniden yayınlanır; önce `read` ile canlı sürüm alınır).
- Rapor üç başlıkla biter: **Blocked on me**, **Changed**, **Found**.

## Bu plan yazılırken bilinen pürüzler

- `TASKS.md` içinde bir satır başka bir oturumca (ya da bir alt ajanca) yanlışlıkla işaretlenmişti; kullanıcıyı bekleyen satırlar işaretlenmeden önce doğrulanır.
- A3 "İspatı tamamla" ve A5 "İspat" tahtaları tam 25 kelimede; A5 "İkinci yol" tahtasında 13–15 yazı öğesi var.
- Konu tekrarı dersleri planlanan ders sayısını konu başına bir artırır (yedi derste toplam 144 konu); `TEMALAR.md` tablolarındaki sayılar bunu içermez.
