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

## İşleme almanın dışında kalanlar (kullanıcı isteyince)

- [ ] Sayılar A derslerini sesli izle; A1 sahne 3 "Genel kural" klibini dinle (öbürlerinden yavaş)
- [ ] Sayılar B, C, D ve öteki temaların seslendirmesi (`plan/SESLENDIRME.md`)
- [ ] Tema sayfasından dersleri izle; `DURUM.md` “Kalanlar” bölümündeki sahnelere elle bak
- [ ] Yerel araçları `dersler/kit.js` içine topla (ayrı temizlik işi)
- [ ] Yayına al (`ortak/katalog.js`), seslendirme, hikâye videoları
- [ ] Commit ve push
