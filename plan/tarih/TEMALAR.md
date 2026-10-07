# 9. Sınıf Tarih — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/tarih-dersi/11> (7 Ekim 2026'da alındı). MEB tarih dersinde bu düzeye "ünite" diyor; sitede ve bu dosyalarda bütün derslerde olduğu gibi "tema" denir.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 68 ders saati. "Site dışı" sütunu, denetim tablosunda sitede karşılanmayan isteklerin yaklaşık payıdır (`../KURALLAR.md` 2.2).

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Site dışı | Durum |
|---|---|---|---|---|---|---|---|---|
| 1 | Geçmişin İnşa Sürecinde Tarih | `gecmisin-insa-surecinde-tarih` | <https://tymm.meb.gov.tr/tarih-dersi/unite/26> | 18 | 4 | 15 | %27 | plan taslağı; işleme alınmayı bekliyor |
| 2 | Eski Çağ Medeniyetleri | `eski-cag-medeniyetleri` | <https://tymm.meb.gov.tr/tarih-dersi/unite/27> | 24 | 5 | 20 | %20 | plan taslağı; işleme alınmayı bekliyor |
| 3 | Orta Çağ Medeniyetleri | `orta-cag-medeniyetleri` | <https://tymm.meb.gov.tr/tarih-dersi/unite/29> | 26 | 4 | 21 | %27 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **68** | **13** | **56** | | |

Planların hepsi taslaktır; konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

Ders kitabı (içerik için ikinci dayanak, `../KURALLAR.md` 2.1): <https://tymm.meb.gov.tr/kitap/43/tarih-9sinif-ders-kitabi>. Kitap proje klasörüne konmaz; tema işleme alınırken alınır (`../ISLEME.md` 2b). Planlarda "Ders kitabı:" diye işaretlenen maddeler oradan, sayfa numarasıyla doldurulur.

Ders ve temaları `ortak/katalog.js` içindedir; hiçbiri yayında değildir.

## Derse özgü durum

- **İçerik neredeyse tamamen ders kitabına bağlı:** program devlet, kanun, yol ve havza adlarını sayıyor, hiçbirinin tarihini, yerini ya da içeriğini yazmıyor. Kitap alınmadan senaryo yazılamaz.
- **Görseller:** gerçek kişi portresi, tarihî eser, belge ve harita üretilmez; şematik çizim ya da lisanslı gerçek görsel gerekir. Kaynak metinlerinin (kanun maddeleri, yazıtlar) hangi çeviriden alınacağı açık sorudur.
- **Oranlar** 0,81–0,83; birleştirme adayları planlarda yazılı.

## Her temanın dosyaları

`plan/tarih/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu (`ders / benzetim / site dışı`).
- `senaryolar/`, `GORSELLER.md`, `DURUM.md` — tema işleme alınınca oluşur.

Site içeriği `tarih/<klasör>/` altında duracak. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.
