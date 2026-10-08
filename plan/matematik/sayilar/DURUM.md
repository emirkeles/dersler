# Durum — sayilar

## Yürütme planı 2b: sese dokunmayan ekler (8 Ekim 2026)

`plan/YURUTME.md` 2b. Anlatım, altyazı, sahne ve `speak` değişmedi; klip yeniden üretilmedi. Görev tanımı: `plan/matematik/sayilar/gorev/ek-soru-gorevi.md`.

| Konu | Ek sorular | Konu tekrarı | Kim | Durum |
|---|---|---|---|---|
| A Üslü ve köklü gösterimler | A1–A8, 16 soru (dört şıklı) | `a9-tekrar` (sekiz kural, on soru) | ana oturum (örnek) | bitti |
| B Aralıklar ve kümeler | B1–B7, 14 soru | `b8-tekrar` (yedi kural, on soru; kural 2 sayı doğrusu çizimiyle) | Sonnet | bitti |
| C Sayı kümeleri | C1–C5, 10 soru | `c6-tekrar` (yedi kural, on soru; kural 1 iç içe kümeler çizimiyle) | Sonnet | bitti |
| D İşlem özellikleri ve cebir | D1–D8, 16 soru | `d9-tekrar` (sekiz kural, on soru) | Sonnet | bitti |

Denetim (8 Ekim 2026): `olc.js` 32 derste sayfa kayması, panel taşması ve konsol hatası göstermedi; dört tekrar dersinde bütün sayaçlar 0. `sure.js` tema 173:52 (A 46:21, B 54:56, C 26:54, D 45:41). `denetle.js`: "32 kısa ders, yayında. Sorun yok." Karşılaştırmada yalnızca `quiz` dizileri ve dört `next` satırı değişti; `c.say` ve `speak` eklenmedi.

## Notlar

- Ana oturumun düzeltmeleri: C2'nin yanılgı sorusunda şıkta "irrasyonel" geçiyordu (terim C3'te öğretiliyor), "rasyonel değildir" oldu. B konusunda yedi dersin altısında son sorunun doğru cevabı son şıktı; B2 ve B4'te şık sırası değiştirildi.
- Kullanıcının bakabileceği sorular: D8 "a · b = 12 ise a = 12 ∨ b = 12" (sıfır çarpımın yalnızca 0 için geçerli olduğu derste açık cümle değil); D9 soru 7 (x + y = 7, x · y = 12 ise x² + y²: özdeşliği tersinden kullandırıyor); D4 ve D9'daki "zihinden en kolay" soruları (üç şık da doğru sonucu verir; var olan 4 · 17 · 25 sorusuyla aynı kalıp); D3'ün yanılgı sorusu "Şampiyonlar bu ayakkabıyı giyer" (hikâyenin eski adı); B4'ün ℕ'li sorusu ℕ'nin 0'ı içermesine dayanıyor (B1 ve C1'de öyle).

- Bu temada kit yok; tekrar dersleri kendi başına çalışır (bölüm dosyası yüklenmez): tahtada sıra, başlık ve en çok üç satır, `Ders.mathText` ile.
- Tahtadaki SVG yazısının rengi `style: 'fill:…'` ile verilir; `fill` özniteliğini `ortak/ders.css` (`.stage svg text`) eziyor.
- Eski A derslerinin sahnelerinde `olc.js` önceden de bulgu veriyordu (A1 sahne 5, A4 sahne 1–2, A6 sahne 3'te üst üste yazı; A1 ve A4'te bütçe aşımı). Bu işte sahnelere dokunulmadı; `YOL-HARITASI.md` 4. adımdaki yeniden yazımda kapanır.
- Tekrar dersinin sonuç ekranında yanlış cevaplanan her soru için aynı "Tekrar et: Sahne 1" bağlantısı alt alta çıkıyor (tek sahneli derste hepsi aynı sahneyi gösterir). Motorun davranışı; `ortak/ders.js` içinde yinelenenler tek satıra indirilebilir.

## Sıradaki

- Bu temada 2b bitti ve yayında (`fbfaf43`). Açık iş yok; kullanıcı yukarıdaki "bakabileceği sorular"a bakabilir.
- Yürütme sırası: `plan/YURUTME.md` 2b, sıradaki tema Geometrik Şekiller B ve C (7 ders: B1–B4, C1–C3; iki konu tekrarı). Bu temada kit var (`matematik/geometrik-sekiller/dersler/kit.js`) ve tekrar dersi örneği hazır (`dersler/a6-tekrar.js`); görev tanımı `plan/matematik/nicelikler-ve-degisimler/gorev/ek-soru-gorevi.md` dosyasından kopyalanıp uyarlanır (`plan/matematik/geometrik-sekiller/gorev/`). Önce derslerin şık sayısına ve dosya düzenine bakılır.
- Görev tanımına eklenecek iki kural (bu temada ana oturum düzeltti): şıkta ve geri bildirimde sonraki dersin terimi geçmez (terimin ilk geçtiği dersi `grep` ile doğrula); bir konuda eklenen soruların doğru şıkkı aynı yerde toplanmaz.
- Toplu ölçüm ajanlar çalışırken boş döndü (aynı anda birden çok Chrome); `olc.js` toplu çalıştırması ajanlar bittikten sonra yapılır.
