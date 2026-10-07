# 9. Sınıf Türk Dili ve Edebiyatı — Temalar

Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, <https://tymm.meb.gov.tr/ogretim-programlari/turk-dili-ve-edebiyati-dersi/11> (7 Ekim 2026'da alındı). MEB bu düzeye "tema" diyor; sitede ve bu dosyalarda da aynı ad kullanılır.

Adlandırma (Ders → Tema → Konu → Kısa ders) bütün derslerde aynıdır: `../matematik/TEMALAR.md`.

## Temalar

Tema numaraları ve ders saatleri her temanın kendi MEB sayfasından alındı (7 Ekim 2026). Toplam 172 ders saati. "Site dışı" sütunu, denetim tablosunda sitede karşılanmayan isteklerin yaklaşık payıdır (`../KURALLAR.md` 2.2).

| # | Tema | Klasör | MEB sayfası | Ders saati | Konu | Kısa ders | Site dışı | Durum |
|---|---|---|---|---|---|---|---|---|
| 1 | Sözün İnceliği | `sozun-inceligi` | <https://tymm.meb.gov.tr/turk-dili-ve-edebiyati-dersi/unite/76> | 43 | 5 | 18 | %46 | plan taslağı; işleme alınmayı bekliyor |
| 2 | Anlam Arayışı | `anlam-arayisi` | <https://tymm.meb.gov.tr/turk-dili-ve-edebiyati-dersi/unite/101> | 43 | 5 | 20 | %44 | plan taslağı; işleme alınmayı bekliyor |
| 3 | Anlamın Yapı Taşları | `anlamin-yapi-taslari` | <https://tymm.meb.gov.tr/turk-dili-ve-edebiyati-dersi/unite/106> | 43 | 6 | 27 | %40 | plan taslağı; işleme alınmayı bekliyor |
| 4 | Dilin Zenginliği | `dilin-zenginligi` | <https://tymm.meb.gov.tr/turk-dili-ve-edebiyati-dersi/unite/112> | 43 | 6 | 26 | %46 | plan taslağı; işleme alınmayı bekliyor |
| | **Toplam** | | | **172** | **22** | **91** | | |

Planların hepsi taslaktır; konu ve kısa ders sayıları işleme alınırken değişebilir. Her `PLAN.md` dosyasının 6. bölümündeki açık sorular, tema işleme alınınca `../ISLEME.md` içindeki kurallarla kapatılır ve kararlar aynı dosyaya yazılır.

Ders kitabı (içerik için ikinci dayanak, `../KURALLAR.md` 2.1): <https://tymm.meb.gov.tr/kitap/45/turk-dili-ve-edebiyati-9sinif-ders-kitabi>. Kitap proje klasörüne konmaz; tema işleme alınırken alınır (`../ISLEME.md` 2b). Planlarda "Ders kitabı:" diye işaretlenen maddeler oradan, sayfa numarasıyla doldurulur.

Ders ve temaları `ortak/katalog.js` içindedir; hiçbiri yayında değildir.

## Derse özgü durum

- **Bu ders sitede ancak kısmen karşılanıyor.** Program dört beceri üzerine kurulu (dinleme/izleme, okuma, konuşma, yazma); konuşma ve yazma çıktıları performans görevidir ve `site dışı` kalır. Site fiilen okuma çıktılarını (metin tahlili, tür özellikleri, edebî kavramlar, dil bilgisi) ve öteki becerilerin bilgi dayanağını karşılar. Bu yüzden oranlar 0,42–0,63 ile bilerek düşüktür.
- **Dersin yazılıp yazılmayacağı açık sorudur** (`../KURALLAR.md` 2.2: isteklerin çoğu `site dışı` ise tema yazılmaz). Karar dört tema için birlikte verilmelidir; seçenekler: tam plan, yalnızca okuma ve dil bilgisi konuları, ya da hiç.
- **Metinler ve telif:** program hiçbir metni adıyla vermiyor ("Cumhuriyet Dönemi'nden bir hikâye", "bir gezi yazısı"). Ders kitabındaki metinler büyük olasılıkla teliflidir; hangi metinlerin kullanılacağı ve kullanım hakkı kesinleşmeden tahlil dersleri yazılamaz. Telif durumu doğrulanmadı.
- **Çıktı kodları** tema numarası taşımaz (TDE1.1, TDE2.1 …) ve dört temada yinelenir; süreç bileşeni bentleri sayfalarda yoktur.
- Dinleme/izleme metinleri (mülakat, belgesel, şiir kaydı) sitede gösterilemiyor.

## Her temanın dosyaları

`plan/turk-dili-ve-edebiyati/<klasör>/` altında:

- `MUFREDAT.md` — MEB program metni, sayfadan olduğu gibi. Dersler buna göre denetlenir.
- `PLAN.md` — konular, kısa dersler, her kısa derste anlatılacaklar ve müfredat denetimi tablosu (`ders / benzetim / site dışı`).
- `senaryolar/`, `GORSELLER.md`, `DURUM.md` — tema işleme alınınca oluşur.

Site içeriği `turk-dili-ve-edebiyati/<klasör>/` altında duracak. Ortak kurallar: `../KURALLAR.md`; tema ekleme adımları: `ortak/API.md`.
