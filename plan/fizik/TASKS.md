# Yapılacaklar — Fizik

## Hikâye animasyonları (7 Ekim 2026)

- [x] Dört temanın `MUFREDAT.md` ve `PLAN.md` dosyalarını oku
- [x] Adayları ders kitabı metniyle karşılaştır (sayfa numaraları)
- [x] Gerçek dünya olgularına web'de bak (ortalama hız denetimi, berber koltuğu, maytap)
- [x] Sıralı listeyi yaz: `HIKAYE-ANIMASYONLARI.md` (20 hikâye, üç kademe)
- [ ] Kullanıcı onayı: liste, sıra, kaç hikâye üretileceği
- [ ] Karar: hikâye derste nereye girer (`HIKAYE-ANIMASYONLARI.md` bölüm 8, soru 1)
- [ ] Hakem incelemesi (matematikteki `HIKAYE-HAKEM.md` gibi)
- [ ] Doğrulanmayanlar: kardan adam ve mont; peronda trene çekilme; ortalama hız denetimi için resmî kaynak; berber koltuğunun iç düzeni
- [ ] Arşimet özetini kitaptaki metnin tamamıyla karşılaştır (s. 170)
- [ ] Senaryo metinleri (110–150 kelime); her tema işlenirken ders kodları ve kapanış cümleleri güncellenir

## Hikâye: E3 İki kamera arası

Plan: `kuvvet-ve-hareket/hikaye/E3-iki-kamera-arasi.md`

- [x] Plan: senaryo taslağı (13 satır, 101 kelime), resimli taslak (8 kare), sayılar, üretim adımları
- [x] HyperFrames 0.8.140 iş akışına göre yeniden düzenleme (`general-video`, `storyboard: yes`)
- [x] Proje iskeleti (`fizik/kuvvet-ve-hareket/hikaye/e3-iki-kamera/`, `hyperframes init`)
- [x] `BRIEF.md`, `SCRIPT.md` (12 satır, 94 kelime), `STORYBOARD.md` (12 kare, `outline`, 62 sn)
- [x] 1. kare kuruldu (`index.html`, 0–5,5 sn) ve çizim dili önerisi yazıldı (`frame.md`); `check` geçti, görüntü `snapshots/kare-01-iki-gosterge.png`
- [x] Kullanıcı onayı: 1. karenin görünüşü (7 Ekim 2026: beğendi; çizim dili kâğıt kesme olarak kesinleşti)
- [x] 2 ve 3. kareler kuruldu (zarf, saat damgaları; 0–13 sn); `check` geçti; `snapshots/kare-02-ceza.png`, `kare-03-saat.png`
- [x] Kullanıcı onayı: 2 ve 3. kareler (7 Ekim 2026)
- [x] 4–6. kareler kuruldu: araba, büyük gösterge, kamera takibi, şerit metre ve kilometre sayacı (0–29,5 sn); `check` geçti; görüntüler `kareler/`
- [x] Kullanıcı onayı: 4–6. kareler (7 Ekim 2026)
- [x] 7–12. kareler kuruldu: süre ayracı, bölme, ölçekli tekrar (yeşil araba), göstergelerin dönüşü, ortalama ayracı, kapanış kartı; film 62 sn; `check` geçti
- [ ] Kullanıcı onayı: 7–12. kareler ve filmin bütünü (Studio önizlemesi)
- [x] Seslendirme: metin doğal anlatıma çekildi (114 kelime), 12 klip üretildi (ElevenLabs `eleven_v4`, 794 karakter, 58,9 sn), düzeyler eşitlendi, film kliplere göre yeniden zamanlandı (71 sn); `check` geçti
- [ ] Kullanıcı: seslendirmeyi dinle (Studio önizlemesi); yanlış okunan satır varsa yalnızca o satır yeniden üretilir
- [ ] `index.html` 350 satırı geçti (lint uyarısı); dünya ayrı bir alt kompozisyona taşınsın mı
- [ ] Kullanıcı onayı (plan durağı): sıra (kanca başta mı, üç perde mi), senaryo, karakterler, sayılar
- [ ] Kullanıcı kararı: eskiz sayfası (`storyboard.html`) çizilsin mi
- [ ] Kullanıcı onayı: çizim dili; sonra `frame.md`
- [ ] Eskiz sayfası ve yerleşim onayı
- [ ] Ses (ücretli; kullanıcı ister; 646 karakter)
- [ ] Kompozisyon; `T` tablosunu gerçek klip sürelerine çek
- [ ] `npm run check`, kare görüntüleri, son önizleme, işleme, kapak, altyazı
- [ ] Derse bağlama (tema işlenince)

## Hikâye: A1 Çantanın askısı

Plan: `akiskanlar/hikaye/A1-cantanin-askisi.md`

- [x] Ders kitabı s. 131–142 metni ve s. 133 görüntüsü (iki çanta kitabın kendi açılış görseli)
- [x] Plan: senaryo taslağı (14 satır, 100 kelime), resimli taslak (8 kare), sayılar, üretim adımları
- [x] HyperFrames yapısı: dosyalar, katmanlar ve izler, tahminî `T` tablosu, karelerin hareket kuralları, doğrulama
- [x] Senaryo: kullanıcı seslendirmeyi istedi (7 Ekim 2026); metin `SCRIPT.md`
- [ ] Karar: "beşte bir" sesle söylenmeyecek mi, yoksa hikâye A2'ye mi taşınacak
- [ ] Kullanıcı onayı: çizim dili (mürekkep ve suluboya), 2 ve 6. kareler üzerinden
- [x] Proje iskeleti (`fizik/akiskanlar/hikaye/a1-canta-askisi/`): `hyperframes init` 0.8.112, `BRIEF.md`, `frame.md`, `STORYBOARD.md`, yazı tipleri
- [x] 1. kare çizildi, hareketsiz (`snapshots/kare-1-sabah.png`); lint temiz
- [x] Sekiz karenin çizimi ve hareketi (ses yok; zamanlama tahminî `T` tablosuna göre); `check` geçti, dört uyarı
- [ ] Kullanıcı izler: Studio ön izlemesi ya da sessiz taslak işleme; çizim dili (suluboya) buna göre kesinleşir
- [ ] `check` uyarıları: `damlaUygula` için DOM ölçümü uyarısı (yanlış alarm gibi; nedeni bulunmadı), dosya boyu ve iç içe klip uyarıları (B7 ile aynı yapı)
- [x] Ses: 14 klip, 767 karakter, 58,9 sn (`eleven_v4`, Gamze Özdemir); üç yönerge. Senaryo seslendirmeden önce yeniden yazıldı (`SCRIPT.md`)
- [x] `T` tablosu ve `<audio>` satırları gerçek klip sürelerine çekildi; film 72,5 sn; cümle içi eşlemeler sessizlikten ölçüldü
- [ ] Kullanıcı dinler: yazıya dökümde beş satır metinden farklı çıktı (4, 5, 7, 9, 12); küçük modelin hatası olabilir, kulakla doğrulanmadı
- [x] İşleme: `renders/a1-canta-askisi.mp4`, CRF 23 (kullanıcı kararı, 7 Ekim 2026), 48,3 MB, 72,5 sn, hızlı başlatma var; işleme 2,5 dk. Ayar `package.json` içindeki `render` komutunda
- [ ] `renders/` altındaki iki taslak (180 ve 198 MB) depoya girmemeli; silinsin mi?
- [ ] Kapak görseli, altyazı dosyası
- [ ] Derse bağlama (tema işlenince)

## Temalar

- [ ] Kuvvet ve Hareket: işleme al (durum: `kuvvet-ve-hareket/DURUM.md`)
  - [x] Ders kitabı 2. ünite okundu (s. 50–129)
  - [x] Plan yeniden yazıldı: 24 kısa ders, her derste örnekler, yanılgılar, anlama denetimi (7 Ekim 2026)
  - [x] 15 açık soru kapatıldı (`PLAN.md` bölüm 7)
  - [x] Kullanıcı onayı: karar 1 (24 ders, 0,85 sınırı aşılıyor), karar 10 (yeşil dalga: kurgu ve örnek veri), karar 22 (E6'da dik üçgen örneği) — 7 Ekim 2026
  - [ ] Yeşil dalganın işleyişi için resmî kaynak (bulunamadı; kullanıcı kurgu ve örnek veriyle yürümeyi onayladı)
  - [x] Senaryolar A–F: 24 ders, 154 sahne, 1.477 anlatım cümlesi; `senaryo-denetle.cjs` temiz
  - [ ] Kullanıcı senaryoları okur; `PLAN.md` bölüm 8'deki açık notlar (uranyum kartı, s. 88 tablosu, E7'de "10 saniye yeşil")
  - [x] İskelet: tema sayfası, `tema.js`, `dersler/kit.js`
  - [x] 24 kısa ders (A1 ana oturum, 23 ders dokuz alt ajan); her biri `olc.js` temiz
  - [x] Tema denetimi: `denetle.js` temiz, tema sayfası görüntüsü
  - [ ] Kullanıcı temayı izler (gözle bakılacak sahneler: `kuvvet-ve-hareket/DURUM.md`)
  - [x] Tablolu sahnelerde 25 kelime istisnası (karar 23; `KURALLAR.md` bölüm 4)
  - [x] Seslendirme: 24 ders, 1.472 klip, 115,7 dk, 57 MB (8 Ekim 2026)
  - [ ] Kullanıcı sesli izler: 14 uzun klip ve kulakla doğrulanmamış okunuşlar (`kuvvet-ve-hareket/DURUM.md`)
  - [x] Yayın: `ortak/katalog.js` içinde `yayinda: true` (8 Ekim 2026)
  - [ ] E3 hikâyesinin derse bağlanması (kullanıcı ister; film henüz işlenmedi)
- [ ] Akışkanlar: işleme al
- [ ] Enerji: işleme al
