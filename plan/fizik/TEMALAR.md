# 9. Sınıf Fizik — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/fizik-dersi/11> (7 Ekim 2026'da alındı). MEB fizik dersinde bu düzeye "ünite" diyor; sitede ve bu dosyalarda bütün derslerde olduğu gibi "tema" denir.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 68 ders saati.

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Durum |
|---|---|---|---|---|---|---|---|
| 1 | Fizik Bilimi ve Kariyer Keşfi | `fizik-bilimi-ve-kariyer-kesfi` | <https://tymm.meb.gov.tr/fizik-dersi/unite/43> | 8 | 4 | 6 | yayında (7 Ekim 2026; 26 sahne, 93 klip); iki resim bekliyor, klipler dinlenmedi |
| 2 | Kuvvet ve Hareket | `kuvvet-ve-hareket` | <https://tymm.meb.gov.tr/fizik-dersi/unite/57> | 24 | 6 | 24 | yazıldı ve seslendirildi (8 Ekim 2026; 24 ders, 154 sahne, 1.472 klip; `olc.js` ve `denetle.js` temiz); yayında (8 Ekim 2026), kullanıcı henüz izlemedi |
| 3 | Akışkanlar | `akiskanlar` | <https://tymm.meb.gov.tr/fizik-dersi/unite/65> | 18 | 5 | 15 | plan taslağı; işleme alınmayı bekliyor |
| 4 | Enerji | `enerji` | <https://tymm.meb.gov.tr/fizik-dersi/unite/82> | 18 | 6 | 15 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **68** | **21** | **60** | |

1. tema işleme alındı ve yazıldı; öteki üç temanın planı taslaktır, konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

Ders kitabı (içerik için ikinci dayanak, `../KURALLAR.md` 2.1): <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi>. Kitap proje klasörüne konmaz; tema işleme alınırken alınır (`../ISLEME.md` 2b).

Ders ve temaları `ortak/katalog.js` içindedir; 1. ve 2. tema yayındadır.

Bu planlar 7 Ekim 2026'da, ortak kurallar genişletilmeden önce yazıldı: denetim tablolarında `ders / benzetim / site dışı` sütunu ve "Ders kitabı:", "Görsel:" işaretleri yoktur. Tema işleme alınırken 3. adımda eklenir (1. temada eklendi).

## Her temanın dosyaları

`plan/fizik/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu.
- `senaryolar/` — kısa derslerin sahne sahne senaryoları (tema işleme alınınca).
- `DURUM.md` — tema işleme alınınca oluşur; hangi adımın ve hangi kısa dersin bittiğini tutar.

Dersin bütününe ait: `plan/fizik/HIKAYE-ANIMASYONLARI.md` — dört temanın hikâye animasyonu adayları, önem sırasıyla (7 Ekim 2026 taslağı; 20 hikâye, onay bekliyor).

Site içeriği (tema sayfası, `tema.js`, kısa dersler) `fizik/<klasör>/` altında duracak. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.

## Kural

Müfredat bağlayıcıdır: programın istemediği konu derse girmez, istediği konu eksik kalmaz. Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez. Tamamı: `../KURALLAR.md`.

## Bütün temalarda ortak durum

Program metni birçok yerde içeriği adıyla anıp ayrıntısını vermiyor (formüller, listeler, veri setleri, deney yöntemleri). Bunlar ders kitabından sayfa numarasıyla alınır; hafızadan yazılmaz. Deney isteyen çıktılar benzetimle, ürün ve sınıf etkinliği isteyenler `site dışı` olarak karşılanır (`../KURALLAR.md` 2.1–2.2). Her temanın `PLAN.md` 6. bölümündeki açık soruların çoğu bu iki kuralla kapanır.
