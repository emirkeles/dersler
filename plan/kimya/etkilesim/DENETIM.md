# Denetim — Etkileşim

7 Ekim 2026. Son içerik ve güncel KURALLAR 3.1 ile denetlendi. 8 konu, 18 kısa ders, 80 içerik sahnesi, 36 çıkış sorusu.

| Ders | Sahne | Altyazı | En uzun altyazı | En çok tahta kelimesi | En küçük punto | Ek durum ziyareti | Sonuç |
|---|---|---|---|---|---|---|---|
| A1 | 5 | 11 | 8 | 17 | 22.9 px | 15 | temiz |
| A2 | 5 | 11 | 9 | 13 | 22.9 px | 15 | temiz |
| B1 | 4 | 15 | 10 | 16 | 24.6 px | 8 | temiz |
| B2 | 5 | 35 | 9 | 16 | 24.6 px | 18 | temiz |
| C1 | 5 | 11 | 8 | 23 | 24.6 px | 16 | temiz |
| C2 | 5 | 20 | 10 | 20 | 24.6 px | 10 | temiz |
| D1 | 5 | 10 | 10 | 24 | 24.6 px | 17 | temiz |
| E1 | 4 | 11 | 9 | 15 | 24.6 px | 8 | temiz |
| E2 | 4 | 15 | 10 | 17 | 24.6 px | 7 | temiz |
| E3 | 4 | 18 | 10 | 25 | 24.6 px | 13 | temiz |
| F1 | 4 | 26 | 11 | 24 | 24.6 px | 11 | temiz |
| F2 | 4 | 17 | 12 | 22 | 24.6 px | 9 | temiz |
| F3 | 4 | 38 | 11 | 23 | 24.6 px | 21 | temiz |
| G1 | 5 | 18 | 10 | 19 | 24.6 px | 16 | temiz |
| H1 | 5 | 11 | 9 | 24 | 24.6 px | 19 | temiz |
| H2 | 5 | 8 | 9 | 25 | 22.9 px | 33 | temiz |
| H3 | 3 | 12 | 9 | 23 | 22.9 px | 9 | temiz |
| H4 | 4 | 13 | 9 | 19 | 22.9 px | 53 | temiz |

## Kanıt

- `node araclar/olc.js kimya/etkilesim/<kod> --goruntu /private/tmp/...`: her kısa derste sayfa kayması, altyazı/panel/yazı taşması, üst üste yazı, 12/25 kelime ve 12 px sınırı, konsol hatası sıfır; tamamlanmayan sahne yok.
- `node araclar/denetle.js kimya/etkilesim`: 18 kısa ders, yayında değil, sorun yok.
- `node plan/kimya/etkilesim/denetim.js`: bütün kart/kaydırıcı değerleri; menü olan sahnelerde veri kümesi × özellik seçenekleri. 298 durum ziyareti, sıfır sorun. Kayıtlar `/private/tmp/etkilesim-etkilesim-denetimi/<kod>.json`.
- `node plan/kimya/etkilesim/denetim.js --tema`: 1366×657 ve 390×844 tema görünümü, 8 konu/18 bağlantı, yatay taşma ve konsol hatası sıfır. Telefon E2 ilk sahnesi tamamlandı; yatay taşma/konsol sıfır.
- Ders ve tema son PNG’leri gözle incelendi. Piktogram şekilleri, orbital kutu-okları, He istisnası, B grubu dönüşümleri, grafik ölçekleri ve kaynak tabloları kontrol edildi.
- Bağımsız inceleme: Critical/Important yok; küçük senaryo ifadeleri düzeltildi. E2 ve H3 yanlış/doğru seçenek, tween sırasında sahne değişimi ve seçim beklerken yeniden açma testleri temiz. Kanıt `/private/tmp/etkilesim-son-inceleme-runtime.json`.
- JS tanımları: kimlik, 3–5 sahne, iki quiz, answer/why/scene ve next bağlantıları kontrol edildi. `node --check` ve kapsam içi `git diff --check` temiz.

## Son ölçüm dosyaları

- A1: `/private/tmp/etkilesim-olc-a1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- A2: `/private/tmp/etkilesim-olc-a2/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- B1: `/private/tmp/etkilesim-olc-b1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- B2: `/private/tmp/etkilesim-olc-b2/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- C1: `/private/tmp/etkilesim-olc-c1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- C2: `/private/tmp/etkilesim-olc-c2/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- D1: `/private/tmp/etkilesim-olc-d1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- E1: `/private/tmp/etkilesim-olc-e1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- E2: `/private/tmp/etkilesim-olc-e2/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- E3: `/private/tmp/etkilesim-olc-e3/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- F1: `/private/tmp/etkilesim-olc-f1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- F2: `/private/tmp/etkilesim-olc-f2/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- F3: `/private/tmp/etkilesim-olc-f3/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- G1: `/private/tmp/etkilesim-olc-g1/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- H1: `/private/tmp/etkilesim-olc-h1-ogretim/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- H2: `/private/tmp/etkilesim-olc-h2-ogretim/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- H3: `/private/tmp/etkilesim-olc-h3-ogretim/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.
- H4: `/private/tmp/etkilesim-olc-h4-ogretim/olcum.json`; aynı klasörde içerik sahnelerinin `sNN-son.png` dosyaları.

## Kapsam sınırı

Tema yayına alınmadı. Seslendirme ve görsel üretimi yapılmadı; bütün çizimler SVG. Bu oturum commit/push çalıştırmadı. `plan/kimya/TEMALAR.md` izin verilen iki klasör dışında olduğu için güncellenmedi. Gerçek deney/gözlem ve sınıf ürünleri PLAN denetiminde site dışı olarak belirtilir. Açık ölçüm veya inceleme sorunu kalmadı.
