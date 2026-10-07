# TASKS

## Geometrik Şekiller temasını işleme al (dal: `tema/geometrik-sekiller`)

Ayrıntılı ilerleme: `plan/matematik/geometrik-sekiller/DURUM.md`.

- [x] Dalı aç
- [x] 1 Müfredat (vardı)
- [x] 2 Plan (vardı)
- [x] 3 Açık soruları kapat, kararları `PLAN.md` bölüm 7'ye yaz
- [x] 4 Senaryolar: A, B, C
- [x] 5 İskelet: `index.html`, `tema.js`, `dersler/kit.js`
- [x] 6 Kısa dersler (her biri `olc.js` temiz)
  - [x] A1 Ölçmek ispat değildir
  - [x] A2 İspat doğru bilgilerin üstüne kurulur
  - [x] A3 İç açıların toplamı 180°dir
  - [x] A4 Dış açıların toplamı 360°dir
  - [x] A5 Dış açı, uzaktaki iki iç açının toplamıdır
  - [x] B1 En uzun kenarın karşısı en büyük açıdır
  - [x] B2 Üçgen eşitsizliği
  - [x] C1 Bu ispat her üçgende çalışır mı?
  - [x] C2 Doğrulanmış önermeler iş görür
- [x] 7 Tema denetimi: `denetle.js` temiz, tema sayfası görüntüsü, denetim tablosuna sahne numaraları, `TEMALAR.md`
- [x] 8 Rapor

## Fizik, kimya, biyoloji: müfredat ve plan (7 Ekim 2026)

Matematikte yapılanın aynısı: her tema için `MUFREDAT.md` (MEB sayfasından) ve `PLAN.md` (taslak, açık sorular açık). Tema başına bir alt ajan.

- [x] MEB'den 9. sınıf tema listelerini al (fizik 4, kimya 3, biyoloji 2)
- [x] Fizik: `fizik-bilimi-ve-kariyer-kesfi`, `kuvvet-ve-hareket`, `akiskanlar`, `enerji`
- [x] Kimya: `etkilesim`, `cesitlilik`, `surdurulebilirlik`
- [x] Biyoloji: `yasam`, `organizasyon`
- [x] Alt ajan çıktısını denetle (müfredat metni sayfayla uyuşuyor mu, plan bölümleri tam mı)
- [x] `plan/<ders>/TEMALAR.md` (fizik, kimya, biyoloji)
- [x] Rapor

## Kurallar, katalog ve öteki dersler (7 Ekim 2026)

- [x] `plan/KURALLAR.md` ve `plan/ISLEME.md`: içerik kaynağı (ders kitabı), ders/benzetim/site dışı, veri, formülsüz ders, metin, çizim mi resim mi (GPT görsel üretimi), `CLAUDE.md` satırları
- [x] `ortak/katalog.js`: fizik, kimya, biyoloji, Türk dili ve edebiyatı, tarih, coğrafya
- [x] Coğrafya (7 tema), tarih (3), Türk dili ve edebiyatı (4): `MUFREDAT.md` + `PLAN.md` (alt ajanlar)
- [x] Çıktıları denetle; `plan/<ders>/TEMALAR.md` (cografya, tarih, turk-dili-ve-edebiyati)
- [x] Fizik, kimya, biyoloji `TEMALAR.md`: ders kitabı adresi, katalog notu
- [x] Ana sayfa görüntüsüne bak (yedi ders)
- [x] Rapor

## Fizik Bilimi ve Kariyer Keşfi temasını işleme al (7 Ekim 2026)

Ayrıntılı ilerleme: `plan/fizik/fizik-bilimi-ve-kariyer-kesfi/DURUM.md`. Doğrudan `main`'e commitlendi.

- [x] 0 `DURUM.md`
- [x] 1 Müfredat (vardı), 2 Plan (vardı)
- [x] 2b Ders kitabını al, 1. üniteyi oku (s. 12–49)
- [x] 3 Açık soruları kapat; kitap içeriğini ve kararları `PLAN.md`'ye yaz; denetim tablosuna durum sütunu
- [x] 4 Senaryolar: A, B, C, D; `GORSELLER.md`
- [x] 5 İskelet: `fizik/fizik-bilimi-ve-kariyer-kesfi/` (`index.html`, `tema.js`, `dersler/kit.js`)
- [x] 6 Kısa dersler (her biri `olc.js` temiz)
  - [x] A1 Fizik, öteki bilimlerle bağından tanınır
  - [x] B1 Görselleri neye göre ayırırsın?
  - [x] B2 Her grubun bir adı var: fiziğin alt dalları
  - [x] C1 Dört bilim insanı, ortak bir çalışma biçimi
  - [x] D1 Bilimsel araştırma merkezinde fizik: merak et, sor
  - [x] D2 Bu bilgi güvenilir mi? Kaynaktan mesleğe
- [x] 7 Tema denetimi: `denetle.js`, tema sayfası görüntüsü, denetim tablosu, `plan/fizik/TEMALAR.md`
- [x] 8 Rapor
- [x] İlk sahnelere soru öncesi bilgilendirme (kullanıcı geri bildirimi; `PLAN.md` karar 17)
- [x] Seslendirme: 6 ders, 93 klip (`plan/SESLENDIRME.md` adım 1, 2, 4, 5, 6); ayrıntı `DURUM.md` "Seslendirme"
- [ ] Seslendirme adım 3 ve 6.4: kullanıcı A1'i ve her konudan bir dersi sesli izler (pilot atlanmıştı)
- [ ] Dinlemeden sonra: yönerge (`[curious]`, `[excited]`) ve okunuş düzeltmeleri, ilgili klipleri yeniden üret
- [x] Yayına al: `ortak/katalog.js` içinde `yayinda: true`; ana sayfa görüntüsüne bakıldı

## Seslendirme: Sayılar A konusu ve ortak plan (7 Ekim 2026)

Kararlar: Gamze Özdemir, `eleven_v4`, 64 kbps; yönergeler seyrek (`[curious]`, `[excited]`).

- [x] Yapıyı incele, 69 dersin kuru dökümünü al
- [x] Bit hızı örnekleri (`matematik/sayilar/ses/ornekler/dinle.html`)
- [x] A2–A8 `speak:` metinlerine yönerge (10 adet); A1 klipleri bozulmadı
- [x] `araclar/ses-uret.js`: 64 kbps, biçimi `uretim.json` içine yaz
- [x] A2–A8 kliplerini üret
- [x] A1'i 64 kbps ile yeniden üret
- [x] Doğrula: eksik klip yok, süre aykırısı yok, `olc.js` ve `denetle.js` temiz
- [x] `plan/matematik/sayilar/PLAN.md` bölüm 5 durumunu güncelle
- [x] Ortak plan: `plan/SESLENDIRME.md`
- [x] Rapor

## Seslendirme: Sayılar C konusu (7 Ekim 2026)

Gamze Özdemir, `eleven_v4`, 64 kbps. Yalnızca C metinleri ve ses dosyaları; main üzerinde, commit/push yok.

- [x] `plan/SESLENDIRME.md` ve B örneğini oku; C1–C5 kuru dökümünü al (80 satır, 3.436 karakter; eksik sahne uyarısı yok)
- [x] Rakamları, simgeleri ve harf eklerini `speak:` ile aç; altyazıları koru (48 satır, 6 yönerge)
- [x] Son metin dökümünü denetle (80 satır, 3.913 karakter; rakam/simge yok)
- [x] C1–C5 kliplerini üret (80 klip, 330,4 sn / 5,5 dk, 2.688.449 bayt / 2,69 MB, 3.913 karakter)
- [x] Her derste `--liste`: “Üretilecek: 0 klip”; 80 klibin dosya/dizin/üretim künyesi eşleşiyor; ffprobe ile bütün süreler ölçüldü
- [x] Son `olc.js` ve `denetle.js` sonuçlarını kaydet (aşağıdaki bulgular; tema denetimi temiz)
- [ ] Kullanıcı C konusundan en az bir dersi sesli izler; pilot/dinleme onayı henüz yok (B yöntemindeki gibi üretimden sonra)

| Ders | İlk satır / karakter | Son karakter | Yönerge | Klip | Süre | Durum |
|---|---|---|---|---|---|---|
| C1 | 20 / 800 | 906 | 2 | 20 | 76,16 sn | üretildi; dinleme ve yerleşim bulgusu var |
| C2 | 12 / 468 | 555 | 1 | 12 | 50,40 sn | üretildi; otomatik kontroller temiz |
| C3 | 20 / 968 | 1.112 | 1 | 20 | 90,80 sn | üretildi; otomatik kontroller temiz |
| C4 | 12 / 489 | 577 | 1 | 12 | 46,32 sn | üretildi; otomatik kontroller temiz |
| C5 | 16 / 711 | 763 | 1 | 16 | 66,72 sn | üretildi; otomatik kontroller temiz |

C süre kontrolü: yönergeler karakter sayısından çıkarılarak saniye/karakter oranı dersin ortancasıyla karşılaştırıldı. Kullanıcının %40 eşiğini aşan klip yok. Planın %30 eşiğinde yalnızca C1 sahne 2, `405322c8.mp3` (“İlk kutu saymak için: sıfır, bir, iki, üç…”), 5,28 sn, +%38,8: henüz dinlenmedi, dinleme kontrolü bekliyor.

C ölçüm sonuçları (1366×657): C2–C5 temiz; tüm derslerde konsol ve yazı bütçesi temiz. C1 sahne 2’de bir tahta taşması ön ölçümde de vardı; son ölçümde sahne 3’te bir yazı örtüşmesi de görüldü. Yalnızca `speak:` değiştirildiği kaynak karşılaştırmasıyla doğrulandı; yerleşim bu seslendirme işinde değiştirilmedi. `denetle.js matematik/sayilar`: 28 kısa ders, sorun yok. Pilot/kullanıcı dinlemesi B örneğindeki gibi üretim sonrasına kaldı.

## İşleme almanın dışında kalanlar (kullanıcı isteyince)

- [ ] Sayılar A derslerini sesli izle; A1 sahne 3 "Genel kural" klibini dinle (öbürlerinden yavaş)
- [x] Sayılar B seslendirildi (151 klip, 12,5 dk)
- [ ] Sayılar B derslerini sesli izle; B1 "Üç, A’nın elemanıdır" ve B6 sahne 1 klipleri hızlı okunuyor
- [x] Sayılar C seslendirildi (80 klip, 5,5 dk, 2,69 MB, 6 yönerge)
- [ ] Sayılar C derslerini sesli izle; C1 sahne 2 `405322c8.mp3` klibi %38,8 yavaş; C1 yerleşim bulgularına bak
- [ ] Sayılar D ve öteki temaların seslendirmesi (`plan/SESLENDIRME.md`)
- [ ] Tema sayfasından dersleri izle; `DURUM.md` “Kalanlar” bölümündeki sahnelere elle bak
- [ ] Yerel araçları `dersler/kit.js` içine topla (ayrı temizlik işi)
- [ ] Yayına al (`ortak/katalog.js`), seslendirme, hikâye videoları
- [ ] Fizik Bilimi ve Kariyer Keşfi: dersleri izle; B1'in kutup ışıkları ve kristal görselleri için resim üret (`plan/fizik/fizik-bilimi-ve-kariyer-kesfi/GORSELLER.md`)
- [ ] `kit.js` içindeki `sec`, `sirayla`, `kart`, `etiket`, `sar` araçlarını `ortak/` altına taşımayı değerlendir (sözel temalar için)
- [ ] Commit ve push
