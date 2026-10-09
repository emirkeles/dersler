# Durum — Matematik · Eşlik ve Benzerlik

Son güncelleme: 9 Ekim 2026. Tema `plan/YURUTME.md` 3. adımın ilk temasıdır (2a ile aynı düzen). İlk oturum (2a.1, 2a.2) bitti: plan, konu A senaryosu, iskelet, `kit.js`, A1.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti (7 Ekim 2026) |
| 2 Plan | bitti (9 Ekim 2026'da yeniden yazıldı: örnekler, güç kavramlar, yanılgılar, konu tekrarları; 22 ders + 5 tekrar) |
| 2b Ders kitabı | bitti (2. Kitap s. 10–95; `PLAN.md` bölüm 8). A bölümünü ana oturum, B–E bölümlerini dört Sonnet ajanı okudu |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7, 13 karar) |
| 4 Senaryolar | A bitti (`senaryolar/A-geometrik-donusumler.md`); B, C, D, E bekliyor |
| 5 İskelet | bitti: `index.html`, `tema.js` (`kural: 2`), `dersler/kit.js` |
| 6 Dersler | A1 bitti; A2–A6 ve B–E bekliyor |
| 7 Denetim | bekliyor |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 5 sahne, 46 altyazı, 7:10; ana oturum yazdı; her sahnenin son karesine bakıldı |
| A2 | bitti | bekliyor | | |
| A3 | bitti | bekliyor | | |
| A4 | bitti | bekliyor | | zeminsiz, açıyla çizim |
| A5 | bitti | bekliyor | | |
| A6 tekrar | bitti | bekliyor | | |
| B1–B6, C1–C4, D1–D7, E1–E4 | bekliyor | bekliyor | | ders listesi ve dosya adları `PLAN.md` bölüm 3 sonunda |

`denetle.js` şu an tek sorun veriyor: "Konu A: son ders konu tekrarı değil" (A6 yazılınca kapanır). A1'in `nextLesson` bağlantısı `a2-donme.html` dosyasını gösteriyor; dosya A2 yazılınca oluşur.

## Kullanıcıya açık notlar

- Taslağa göre değişenler (`PLAN.md` bölüm 7): 18 ders 22 oldu. Eklenenler: A5 (süslemede dönüşümler), B2 (eşlik koşulları ayrı ders), C1 (iki kenarı aynı oranda bölme), D3 (Öklid'in yükseklik bağıntısı; kitapta teoremin ifadesi budur). Kenar-Açı-Kenar benzerliği alındı.
- D6'da ters yön (kenar karelerinden açının türünü bulma) programda ve kitapta yazılı olmadığı için kural olarak verilmiyor (karar 4). İstenirse eklenir.
- Kitap üç teoremin ispatını yazmıyor (etkinlik olarak bırakıyor) ve hiçbir problemi iki yolla çözmüyor; D ve E senaryolarında bu adımlar öğretilmiş araçlarla kurulacak ve tek tek denetlenecek.
- `HIKAYE-ANIMASYONLARI.md` 7 Ekim'deki 18 derslik taslağa göre yazılmış; ders kodları kaydı (hikâye işi işleme almanın dışında, güncellenmedi).

## Sıradaki

Sıra `YURUTME.md` 2a.3 (denetim noktası) ve 2a.4. Bu oturumda en çok sekiz ajan açılır, sonra oturum biter.

1. **A2–A6 dersleri (Sonnet, ders başına bir ajan).** Görev tanımı: `plan/matematik/eslik-ve-benzerlik/gorev/ders-gorevi.md`. Senaryo: `senaryolar/A-geometrik-donusumler.md`; baştaki okuma kılavuzu satır 1–14. Önce A2 tek başına (dönme araçlarını `dersler/a-araclar.js` içinde, `window.KIT_A` olarak o açar: merkez çevresinde dönen çokgen, köşe yayı, merkezdeki açı, üç dönüşümlü bölme); bitince A3, A4, A5, A6 birlikte.

   | Ders | Dosya | Senaryo satırları | `nextLesson` |
   |---|---|---|---|
   | A2 | `a2-donme` | 145–262 | `a3-oteleme-iki-yansima.html`, "Sonraki: Öteleme, iki yansımadır ›" |
   | A3 | `a3-oteleme-iki-yansima` | 263–365 | `a4-donme-iki-yansima.html`, "Sonraki: Dönme, iki yansımadır ›" |
   | A4 | `a4-donme-iki-yansima` | 366–486 | `a5-suslemede-donusumler.html`, "Sonraki: Süslemede dönüşümler ›" |
   | A5 | `a5-suslemede-donusumler` | 487–613 | `a6-tekrar.html`, "Sonraki: Konu tekrarı ›" |
   | A6 | `a6-tekrar` | 614–641 | yok |

   `accent: '#6ea8ff'`, `kicker: 'Konu A · Geometrik dönüşümler'`. A6 için örnek ders `matematik/geometrik-sekiller/dersler/a6-tekrar.js`. A4 zeminsiz çizilir (O çevresinde açıyla); A3'ün ve A4'ün son sahnelerindeki küçük çizimler için ajan kendi dosyasında yardımcı yazar.
2. **Denetim noktası.** Her dersten en az iki sahnenin görüntüsüne ana oturum bakar ve A1 ile karşılaştırır; raporlardaki "senaryodan sapmalar" okunur. Sonra `tema.js` satırları, `sure.js`, `denetle.js`; kite taşınacak araçlar.
3. **B, C, D, E senaryoları (Sonnet, konu başına bir ajan; 2a.4).** Görev tanımı: `gorev/senaryo-gorevi.md`. Her ajana verilecekler: senaryo dosyasının adı (`senaryolar/B-eslik-ve-benzerlik-kosullari.md`, `C-benzer-ucgenler-olusturma.md`, `D-tales-oklid-pisagor.md`, `E-problemler.md`), konunun `PLAN.md` kararları (B: 1, 3; C: 9, 6; D: 2, 4, 5, 6; E: 10), kitap metninin satır aralığı ve kitap klasörü. Her senaryo bitince ana oturum program metniyle karşılaştırır; D ve E'de ispat adımları ve iki yollu çözüm ayrıca okunur.
4. A dersleri ve dört senaryo ile sekiz ajan dolar (A2, A3–A6, B–E: dokuz; A6 tekrar dersi son ajan olarak sonraki oturuma kalabilir). Oturum biter; B–E dersleri sonraki oturumlarda sekizer ajanla yazılır.

**Ders kitabı dosyaları.** PDF ve çıkarılmış metin geçici klasördedir: `/private/tmp/claude-501/-Users-emirkeles-matematik-sayilar/9bc44fb5-23dc-4c73-875a-ae5981381ec3/scratchpad` (`kitap2/k2.pdf`, `metin/tema4.txt`, `venv` yok: Python `/private/tmp/claude-501/-Users-emirkeles-matematik-sayilar/b5e26d3f-6133-4c6e-aa63-87279fbfed0f/scratchpad/venv/bin/python`). Metinde satır aralıkları: A 224–1335 (s. 13–35), B 1336–3756 (s. 36–52), C 3757–4932 (s. 53–59), D 4933–7989 (s. 60–75), E 7990–9540 (s. 76–95). Klasör silinmişse yeniden kurulur: yeni scratchpad'de `python3 -m venv venv && venv/bin/pip install pymupdf`; PDF bağlantısı <https://tymm.meb.gov.tr/kitap/42/matematik-9sinif-ders-kitabi-2kitap> sayfasındaki `/assets/pdf/….pdf`; `venv/bin/python -I plan/matematik/eslik-ve-benzerlik/gorev/dok.py kitap2/k2.pdf 10 95 metin/tema4.txt` metni, `gorev/png.py` sayfa görüntüsünü üretir (PDF kendi boş klasöründe durur, betikler ayrı klasörde; Python `-I` ile çalışır).

**Açık sorunlar:** yok. İlk oturumun dosyaları kullanıcı isteğiyle 9 Ekim 2026'da commit edildi ve `main`'e gönderildi; tema katalogda kapalıdır (`yayinda` yok), seslendirilmedi. Sonraki commit'ler yine yalnızca kullanıcı isteyince yapılır.
