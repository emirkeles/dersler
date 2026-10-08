# 9. Sınıf Kimya — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/kimya-dersi/11> (7 Ekim 2026'da alındı). MEB bu düzeye "tema" diyor; sitede ve bu dosyalarda da aynı ad kullanılır.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 68 ders saati.

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Durum |
|---|---|---|---|---|---|---|---|
| 1 | Etkileşim | `etkilesim` | <https://tymm.meb.gov.tr/kimya-dersi/unite/92> | 22 | 8 | 18 | yazıldı, yayında (7 Ekim 2026); anlatım aynı gün yeniden yazıldı (121 sahne); seslendirildi (1.126 klip, 93 dk), kullanıcı henüz dinlemedi |
| 2 | Çeşitlilik | `cesitlilik` | <https://tymm.meb.gov.tr/kimya-dersi/unite/121> | 38 | 13 | 44 | yazıldı (8 Ekim 2026; 31 ders + 13 konu tekrarı, yaklaşık 6 sa 38 dk); yayında değil, seslendirilmedi, commit edilmedi; H1 sahne 2 için yedi resim bekliyor (`cesitlilik/GORSELLER.md`) |
| 3 | Sürdürülebilirlik | `surdurulebilirlik` | <https://tymm.meb.gov.tr/kimya-dersi/unite/137> | 8 | 2 | 6 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **68** | **23** | **68** | |

Planların hepsi taslaktır; konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

Ders kitabı (içerik için ikinci dayanak, `../KURALLAR.md` 2.1): <https://tymm.meb.gov.tr/kitap/39/kimya-9sinif-ders-kitabi>. Kitap proje klasörüne konmaz; tema işleme alınırken alınır (`../ISLEME.md` 2b).

Ders ve temaları `ortak/katalog.js` içindedir; yayında olan yalnızca 1. temadır.

Bu planlar 7 Ekim 2026'da, ortak kurallar genişletilmeden önce yazıldı: denetim tablolarında `ders / benzetim / site dışı` sütunu ve "Ders kitabı:", "Görsel:" işaretleri yoktur. Tema işleme alınırken 3. adımda eklenir.

## Her temanın dosyaları

`plan/kimya/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu.
- `senaryolar/` — kısa derslerin sahne sahne senaryoları (tema işleme alınınca).
- `DURUM.md` — tema işleme alınınca oluşur; hangi adımın ve hangi kısa dersin bittiğini tutar.

Site içeriği (tema sayfası, `tema.js`, kısa dersler) `kimya/<klasör>/` altında duracak. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.

## Kural

Müfredat bağlayıcıdır: programın istemediği konu derse girmez, istediği konu eksik kalmaz. Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez. Tamamı: `../KURALLAR.md`.

## Bütün temalarda ortak durum

Program metni birçok yerde içeriği adıyla anıp ayrıntısını vermiyor (formüller, listeler, veri setleri, deney yöntemleri). Bunlar ders kitabından sayfa numarasıyla alınır; hafızadan yazılmaz. Deney isteyen çıktılar benzetimle, ürün ve sınıf etkinliği isteyenler `site dışı` olarak karşılanır (`../KURALLAR.md` 2.1–2.2). Her temanın `PLAN.md` 6. bölümündeki açık soruların çoğu bu iki kuralla kapanır.
