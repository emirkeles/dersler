# 9. Sınıf Coğrafya — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/cografya-dersi/11> (7 Ekim 2026'da alındı). MEB coğrafya dersinde bu düzeye "ünite" diyor; sitede ve bu dosyalarda bütün derslerde olduğu gibi "tema" denir.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 68 ders saati. "Site dışı" sütunu, denetim tablosunda sitede karşılanmayan isteklerin yaklaşık payıdır (`../KURALLAR.md` 2.2).

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Site dışı | Durum |
|---|---|---|---|---|---|---|---|---|
| 1 | Coğrafyanın Doğası | `cografyanin-dogasi` | <https://tymm.meb.gov.tr/cografya-dersi/unite/28> | 6 | 3 | 5 | %37 | plan taslağı; işleme alınmayı bekliyor |
| 2 | Mekânsal Bilgi Teknolojileri | `mekansal-bilgi-teknolojileri` | <https://tymm.meb.gov.tr/cografya-dersi/unite/31> | 10 | 3 | 8 | %18 | plan taslağı; işleme alınmayı bekliyor |
| 3 | Doğal Sistemler ve Süreçler | `dogal-sistemler-ve-surecler` | <https://tymm.meb.gov.tr/cografya-dersi/unite/34> | 20 | 5 | 17 | %23 | plan taslağı; işleme alınmayı bekliyor |
| 4 | Beşerî Sistemler ve Süreçler | `beseri-sistemler-ve-surecler` | <https://tymm.meb.gov.tr/cografya-dersi/unite/37> | 16 | 4 | 12 | %31 | plan taslağı; işleme alınmayı bekliyor |
| 5 | Ekonomik Faaliyetler ve Etkileri | `ekonomik-faaliyetler-ve-etkileri` | <https://tymm.meb.gov.tr/cografya-dersi/unite/40> | 4 | 1 | 3 | %50 | plan taslağı; işleme alınmayı bekliyor |
| 6 | Afetler ve Sürdürülebilir Çevre | `afetler-ve-surdurulebilir-cevre` | <https://tymm.meb.gov.tr/cografya-dersi/unite/42> | 8 | 3 | 6 | %32 | plan taslağı; işleme alınmayı bekliyor |
| 7 | Bölgeler, Ülkeler ve Küresel Bağlantılar | `bolgeler-ulkeler-ve-kuresel-baglantilar` | <https://tymm.meb.gov.tr/cografya-dersi/unite/47> | 4 | 1 | 3 | %27 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **68** | **20** | **54** | | |

Planların hepsi taslaktır; konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

Ders kitabı (içerik için ikinci dayanak, `../KURALLAR.md` 2.1): <https://tymm.meb.gov.tr/kitap/37/cografya-dersi-9sinif-ders-kitabi>. Kitap proje klasörüne konmaz; tema işleme alınırken alınır (`../ISLEME.md` 2b). Planlarda "Ders kitabı:" diye işaretlenen maddeler oradan, sayfa numarasıyla doldurulur.

Ders ve temaları `ortak/katalog.js` içindedir; hiçbiri yayında değildir.

## Derse özgü durum

- **Tema adı ile kapsam:** 3. tema yalnızca hava ve iklimi, 4. tema yalnızca nüfusu, 7. tema yalnızca "bölge ve bölge sınırı"nı istiyor; 6. temada "sürdürülebilir çevre" program metninde geçmiyor. Planlar program metniyle sınırlıdır.
- **5. tema** isteklerinin yarısı `site dışı`; yazılıp yazılmayacağı açık sorudur (`../KURALLAR.md` 2.2).
- **Haritalar** bütün temalarda vektör çizilir; taban harita verisinin kaynağı ve lisansı (il, ülke sınırları) dersin ortak açık sorusudur.
- **3. tema** 0,85 oranıyla tam sınırdadır; birleştirme adayları planında yazılı.

## Her temanın dosyaları

`plan/cografya/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu (`ders / benzetim / site dışı`).
- `senaryolar/`, `GORSELLER.md`, `DURUM.md` — tema işleme alınınca oluşur.

Site içeriği `cografya/<klasör>/` altında duracak. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.
