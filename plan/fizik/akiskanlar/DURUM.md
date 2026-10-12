# Durum — Fizik · Akışkanlar

Son güncelleme: 12 Ekim 2026 (birinci oturum). Tema `plan/YURUTME.md` 3. adımın ikinci temasıdır (2a ile aynı düzen). Birinci oturumda 2a.1 ve 2a.2 bitti: ders kitabı (A bölümünü ana oturum, B–E bölümlerini dört Sonnet ajanı döküme çevirdi; ajan başına 75–100 bin token), `PLAN.md` kararları, konu A senaryosu, iskelet, kit, A1.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti (7 Ekim 2026) |
| 2 Plan | bitti (taslak 7 Ekim 2026; kararlardan sonraki ders listesi 12 Ekim 2026) |
| 2b Ders kitabı | bitti (s. 130–195; `PLAN.md` bölüm 8) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7, 24 karar) |
| 4 Senaryolar | A bitti (`senaryolar/A-basinc.md`: A1, A2, A3 tekrar); B, C, D, E bekliyor |
| 5 İskelet | bitti: `index.html`, `tema.js` (`kural: 2`), `dersler/kit.js`, `dersler/a-araclar.js` |
| 6 Dersler | A1 bitti; 19 dosya bekliyor (14 kısa ders, 5 konu tekrarı) |
| 7 Denetim | bekliyor |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 6 sahne, 43 altyazı, 8:48; ana oturum yazdı; altı sahnenin son karesine ve üç ara kareye bakıldı |
| A2 | bitti | bekliyor | | 7 sahne (tablolu üç sahne 25 kelimeyi aşabilir) |
| A3 tekrar | bitti | bekliyor | | 1 sahne + 8 soru |
| B1–B4, B5 tekrar | bekliyor | bekliyor | | |
| C1–C3, C4 tekrar | bekliyor | bekliyor | | |
| D1–D4, D5 tekrar | bekliyor | bekliyor | | |
| E1–E2, E3 tekrar | bekliyor | bekliyor | | |

Ölçüm (12 Ekim 2026): `olc.js akiskanlar/a1` bütün sayaçlar 0, konsol temiz, defter 12 kelime. `sure.js`: A1 8:48. `denetle.js` üç sorun gösteriyor, üçü de beklenen: iki pilot sayfası (`p1-…`, `p2-…`) `tema.js` içinde yok (karar 20), Konu A'nın konu tekrarı henüz yazılmadı.

## Kullanıcıya açık notlar

- Taslağa göre değişenler (`PLAN.md` bölüm 7): 15 kısa dersin sayısı ve sırası aynı; her konuya bir konu tekrarı eklendi (20 dosya). D2'nin başlığı "yer değiştiren sıvının ağırlığı" oldu. C2'nin açılış sorusu (ters bardak) kitapta olmadığı için senaryoda değişecek (karar 9).
- Ders kitabı dört deneyin hiçbirinde ölçüm vermiyor, benzetimleri açılamayan karekodlara bırakıyor. Benzetim düzenekleri (basınçölçer, dinamometre, taşırma kabı) ve sayıları kitap dışıdır, "örnek veri" olarak modelden hesaplanır (karar 19; `PLAN.md` bölüm 8'in son paragrafı).
- Su cenderesi Pascal Yasası'yla, nitel anlatılacak; F₁/A₁ = F₂/A₂ yazılmayacak (karar 6). Birleşik kaplar, U borusu, su kulesi kitapta var, programda yok: alınmadı.
- Yüzme, askıda kalma, batma D4'te adıyla geçecek (kitapta var, program yalnızca gemi, denizaltı ve yüzen atığı sayıyor; karar 13). Kullanıcı 12 Ekim 2026'da onayladı.
- Kitaptaki "kanadın üstünden geçen hava daha uzun yol kat eder" gerekçesi alınmadı (karar 15); uçak tek cümleyle geçecek.
- İzometrik figür pilotlarına dokunulmadı; C2 ve D2 temanın düz vektör kitiyle yazılacak (karar 20). Kullanıcı 12 Ekim 2026'da onayladı ("önerine göre devam et"): pilot dosyaları olduğu gibi, siteden bağlantısız kalır.
- A1'in iki hikâyesi `ortak/katalog.js` içindeki satırda duruyor; `tema.js` dosyasına taşımak ortak dosyayı değiştirmeyi gerektirir, tema yayına alınırken yapılır (karar 21).

## Sıradaki

`YURUTME.md` 3. adım, 2a.3 ve 2a.4. Bu oturumda altı Sonnet ajanı açılır (A2, dört senaryo, sonra A3), sonra oturum biter (senaryolar bitince oturum sınırı).

**Önce birlikte açılacak beş ajan** (dört ajan sınırı ders ajanları içindir; senaryo ajanları ayrı dosyalara yazar):

| Ajan | Görev tanımı | Yazacağı | Görev iletisine yazılacaklar |
|---|---|---|---|
| A2 dersi | `gorev/ders-gorevi.md` | `a2-olc-kaydet-model.html`, `dersler/a2-olc-kaydet-model.js` | senaryo `senaryolar/A-basinc.md` satır 1–14 (kılavuz) ve 167–298; kimlik `akiskanlar-a2`; `kicker: 'Konu A · Basınç'`; `accent: '#f5b04c'`; `nextLesson: { href: 'a3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' }`; araç dosyası var, değiştirme (`basincOlcer` ilk kez kullanılacak); tablolu sahneler (2–5) 25 kelimeyi aşabilir, başka sahne aşmaz; iki kaydırıcılı "Dene" sahnesi; senaryodaki her sayıyı hesapla |
| B senaryosu | `gorev/senaryo-gorevi.md` | `senaryolar/B-sivilarda-basinc.md` (B1–B4, B5 tekrar) | aşağıdaki satır aralıkları; kararlar 2, 3, 6, 10, 11, 16, 19, 23, 24 |
| C senaryosu | aynı | `senaryolar/C-acik-hava-basinci.md` (C1–C3, C4 tekrar) | kararlar 2, 5, 8, 9, 16, 19, 20, 23, 24 |
| D senaryosu | aynı | `senaryolar/D-kaldirma-kuvveti.md` (D1–D4, D5 tekrar) | kararlar 2, 4, 7, 12, 13, 19, 20, 22, 23, 24 |
| E senaryosu | aynı | `senaryolar/E-bernoulli-ilkesi.md` (E1–E2, E3 tekrar) | kararlar 14, 15, 22, 23, 24 |

A2 bitince: **A3 tekrar** (`a3-tekrar.html`, `dersler/a3-tekrar.js`; senaryo satır 1–14 ve 299–322; `nextLesson` yok; örnek tekrar dersi `matematik/eslik-ve-benzerlik/dersler/a6-tekrar.js`, tamamı okunur; A1 ve A2'nin düzeneği sorularda cümleyle verilmiş).

Senaryo ajanlarının okuma aralıkları:

| Konu | `MUFREDAT.md` | `PLAN.md` taslak | Kitap metni (`metin/tum.txt`) | Döküm |
|---|---|---|---|---|
| B | 17–26, 71–73, 79–81, 91, 95 | 69–118 | 6727–7532 (s. 145–160) | `dokum/B.md` |
| C | 27–32, 71–73, 79–81, 99 | 120–156 | 7532–7913 (s. 161–168) | `dokum/C.md` |
| D | 33–41, 71–73, 79–81, 103, 107 | 158–206 | 7913–8671 (s. 169–184) | `dokum/D.md` |
| E | 42–44, 71–73, 111 | 208–233 | 8671–9177 (s. 185–195) | `dokum/E.md` |

Hepsi ayrıca `PLAN.md` içinde şunları okur: "Kısa ders listesi (kararlardan sonra)" 235–260, bilerek alınmayanlar 338–387, kararlar 412–441 (yalnızca numarası verilenler), bölüm 8'de kendi konusunun satırları ve son paragraf (443–sonu; `grep -n '^| <HARF> |'` ile). Örnek senaryo: `senaryolar/A-basinc.md` satır 1–14 ve 16–166.

Senaryo ajanlarına görev iletisinde ayrıca söylenecekler:

- Bölüm 3'teki ders tanımları 7 Ekim taslağıdır; çelişkide kısa ders listesi ve kararlar geçerlidir (D2 başlığı, C2 açılış sorusu).
- Benzetim sayılarını modelden hesapla ve dersin başına "Örnek veri" satırıyla yaz; her sayıyı iki kez hesapla (g = 9,8 m/s²; su 1.000 kg/m³; cıva 13.600 kg/m³; C2: 0,76 · 13.600 · 9,8 = 101.292,8 ≈ 101.300 Pa).
- Tahta koyudur: siyah çizgi yazma; kırmızı kullanılmaz. Ölçüm aracı rakam ve simgeleri de kelime sayar. Hareketi sayıyla yaz (ne, nereden nereye, kaç ms, hangi eğri).
- Kitabın açıklamasız bıraktığı örnekler (dağcı, balon, pipet; saç kurutma makinesi ve top; baraj duvarı; delikli şişe) derste öğretilen ilkeden açıklanır; yeni ad, sayı, tarih eklenmez.
- B4 sorgulama dersidir: ölçüm aracı yalnızca şıklara ve motorun düğmelerine basar; serbest metin girişi olmaz.
- Rapor: ders listesi ve satır aralıkları, kitaptan alınıp `PLAN.md` bölüm 8'de olmayan her bilgi, hesaplanan sorular, kuşkulu içerik.

Senaryolar gelince ana oturum: her senaryoyu program metniyle karşılaştırır (konunun "Program metniyle karşılaştırma" tablosu ve `PLAN.md` bölüm 4), örnek verileri yeniden hesaplar, kırmızı / siyah çizgi / "hız" / kitap göndermesi için `grep` yapar; A2 ve A3'ün raporunu, `olc` satırlarını ve en az ikişer karesini denetler; `tema.js` satırlarını yazar, `sure.js` çalıştırır; bu dosyayı, `TASKS.md` ve iş panosunu günceller; oturum biter.

**Ders kitabı dosyaları.** Geçici klasör: `/private/tmp/claude-501/-Users-emirkeles-matematik-sayilar/253eaf9c-728b-408b-8f85-63125e4b77db/scratchpad` (`kitap/fizik9.pdf`, `metin/tum.txt` kitabın tamamı, `dokum/B.md` … `E.md`, `png/A` … `png/E` sayfa görüntüleri, `venv` içinde pymupdf, `betik/dok.py`, `betik/png.py`). Basılı sayfa numarası PDF sayfa numarasıyla aynıdır. Klasör silinmişse yeniden kurulur: yeni scratchpad'de `python3 -m venv venv && venv/bin/pip install pymupdf`; PDF bağlantısı <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi> sayfasındaki `/assets/pdf/….pdf` (54 MB); `venv/bin/python -I plan/fizik/akiskanlar/gorev/dok.py kitap/fizik9.pdf 1 272 metin/tum.txt` metni, `gorev/png.py` sayfa görüntüsünü üretir (PDF kendi boş klasöründe durur, betikler ayrı klasörde). Dökümler yeniden üretilemezse senaryo ajanı kitabın satırlarını doğrudan okur (yukarıdaki aralıklar aynı kalır). Ders ajanları kitabı okumaz.

**Açık sorunlar:** yok. Bu oturumun dosyaları kullanıcı isteğiyle commit edildi (12 Ekim 2026): `fizik/akiskanlar/` altında `index.html`, `tema.js`, `a1-basinc-neye-bagli.html`, `dersler/kit.js`, `dersler/a-araclar.js`, `dersler/a1-basinc-neye-bagli.js`; `plan/fizik/akiskanlar/` altında `PLAN.md`, `DURUM.md`, `senaryolar/A-basinc.md`, `gorev/`; ayrıca `TASKS.md`, `plan/fizik/TEMALAR.md`, `plan/YURUTME.md`, `plan/YOL-HARITASI.md`, `plan/is-panosu.html`. Tema katalogda kapalıdır, seslendirilmedi.
