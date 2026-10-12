# 9. Sınıf Fizik — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/fizik-dersi/11> (7 Ekim 2026'da alındı). MEB fizik dersinde bu düzeye "ünite" diyor; sitede ve bu dosyalarda bütün derslerde olduğu gibi "tema" denir.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 68 ders saati.

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Durum |
|---|---|---|---|---|---|---|---|
| 1 | Fizik Bilimi ve Kariyer Keşfi | `fizik-bilimi-ve-kariyer-kesfi` | <https://tymm.meb.gov.tr/fizik-dersi/unite/43> | 8 | 4 | 6 | yayında (7 Ekim 2026; 26 sahne, 93 klip); iki resim bekliyor, klipler dinlenmedi; 9 Ekim 2026: 12 ek çıkış sorusu ve dört konu tekrarı dersi (seslendirilmedi), tema 10 kısa ders |
| 2 | Kuvvet ve Hareket | `kuvvet-ve-hareket` | <https://tymm.meb.gov.tr/fizik-dersi/unite/57> | 24 | 6 | 24 | yazıldı ve seslendirildi (8 Ekim 2026; 24 ders, 154 sahne, 1.472 klip; `olc.js` ve `denetle.js` temiz); yayında (8 Ekim 2026), kullanıcı henüz izlemedi; 9 Ekim 2026: her derste dört çıkış sorusu ve altı konu tekrarı dersi (sessiz), tema 30 kısa ders |
| 3 | Akışkanlar | `akiskanlar` | <https://tymm.meb.gov.tr/fizik-dersi/unite/65> | 18 | 5 | 16 | yazıldı (12 Ekim 2026): plan ve 25 karar, beş konunun senaryosu, 16 kısa ders ve beş konu tekrarı (21 dosya; D4 ikiye bölündü, karar 25; saat başına 0,89); tema denetimi temiz, tema 184:23; katalogda kapalı, seslendirilmedi; izleme, seslendirme ve yayın kullanıcıyı bekliyor; `akiskanlar/DURUM.md` |
| 4 | Enerji | `enerji` | <https://tymm.meb.gov.tr/fizik-dersi/unite/82> | 18 | 6 | 15 | yazıldı (12 Ekim 2026): ders kitabı (s. 206–254), plan ve 23 karar, altı konunun senaryosu, altı izometrik düzenek figürü (13 derste), 15 kısa ders ve altı konu tekrarı (21 dosya; saat başına 0,83); tema denetimi temiz, tema 189:59; E2 15:24 (tek fikir, bölünmedi); katalogda kapalı, seslendirilmedi; izleme, seslendirme ve yayın kullanıcıyı bekliyor; `enerji/DURUM.md` |
| | **Toplam** | | | **68** | **21** | **61** | |

Dört tema da işleme alındı ve yazıldı (3. ve 4. tema yayında değil). Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

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
