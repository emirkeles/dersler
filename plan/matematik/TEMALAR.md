# 9. Sınıf Matematik — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/matematik-dersi/11> (7 Ekim 2026'da alındı). MEB bu düzeye "tema" diyor; sitede ve bu dosyalarda da aynı ad kullanılır.

## Adlandırma

| Düzey | Ad | Örnek |
|---|---|---|
| 1 | Ders | Matematik |
| 2 | Tema (eski adı: ünite) | Sayılar |
| 3 | Konu (eski adı: bölüm) | A · Üslü ve köklü gösterimler |
| 4 | Kısa ders | A1 · Üs bir sayaçtır |

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 206 ders saati.

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Durum |
|---|---|---|---|---|---|---|---|
| 1 | Sayılar | `sayilar` | <https://tymm.meb.gov.tr/matematik-dersi/unite/21> | 38 | 4 | 28 | yazıldı, yayında |
| 2 | Nicelikler ve Değişimler | `nicelikler-ve-degisimler` | <https://tymm.meb.gov.tr/matematik-dersi/unite/23> | 38 | 3 | 32 | yazıldı (7 Ekim 2026); yayında değil |
| 3 | Geometrik Şekiller | `geometrik-sekiller` | <https://tymm.meb.gov.tr/matematik-dersi/unite/25> | 12 | 3 | 10 | plan taslağı; işleme alınmayı bekliyor |
| 4 | Eşlik ve Benzerlik | `eslik-ve-benzerlik` | <https://tymm.meb.gov.tr/matematik-dersi/unite/83> | 36 | 5 | 18 | plan taslağı; işleme alınmayı bekliyor |
| 5 | Algoritma ve Bilişim | `algoritma-ve-bilisim` | <https://tymm.meb.gov.tr/matematik-dersi/unite/24> | 30 | 7 | 31 | plan taslağı; işleme alınmayı bekliyor |
| 6 | İstatistiksel Araştırma Süreci | `istatistiksel-arastirma-sureci` | <https://tymm.meb.gov.tr/matematik-dersi/unite/91> | 34 | 6 | 24 | plan taslağı; işleme alınmayı bekliyor |
| 7 | Veriden Olasılığa | `veriden-olasiliga` | <https://tymm.meb.gov.tr/matematik-dersi/unite/97> | 18 | 3 | 16 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **206** | **31** | **159** | |

3–7. temaların planları taslaktır; konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

## Her temanın dosyaları

`plan/matematik/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu.
- `senaryolar/` — kısa derslerin sahne sahne senaryoları.
- `DURUM.md` — tema işleme alınınca oluşur; hangi adımın ve hangi kısa dersin bittiğini tutar.

Site içeriği (tema sayfası, `tema.js`, kısa dersler, ses, hikâye) `matematik/<klasör>/` altında durur. Temaların sırası ve yayın durumu `ortak/katalog.js` dosyasındadır. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.

## Kural

Müfredat bağlayıcıdır: programın istemediği konu derse girmez, istediği konu eksik kalmaz. Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez. Tamamı: `../KURALLAR.md`.
