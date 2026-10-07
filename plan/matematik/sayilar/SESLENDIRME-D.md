# Sayılar D — seslendirme planı ve kayıt (7 Ekim 2026)

Kurallar `plan/SESLENDIRME.md` ile aynı (Gamze Özdemir, `eleven_v4`, `mp3_44100_64`).

1. Döküm: `node araclar/ses-uret.js sayilar/dN --liste --metin` (D1–D8: 122 satır).
2. Okunuş: D dersleri tek `say` yardımcısından geçtiği için satır satır `speak:` yazılmadı; `spk` yeniden yazıldı: rakam → kelime (`3’ün` → "üçün", `dört` + ek → "dördü"), `6x` → "altı x", `2ab` → "iki a b", ∀ ∃ ∧ ∨ ⊻ ⇒ ⇔ ′ ℕ ℤ ℚ < > ² TL, `A6’daki` → "A altı dersindeki". Metin tek tek okundu; yanlış okunan kalıp yok.
3. Yönergeler: `say(c, html, { ton: 'curious' | 'thoughtful' })` ve `{ dur: 1 }` (ilk ":" sonrası `[short pause]`). Toplam 18 (D1 4, D2 2, D3 2, D4 2, D5 4, D6 1, D7 2, D8 1; ders başına en çok 4). `[excited]` yok.
4. Üretim: D1 pilot, sonra D2–D8. Hepsi için `--liste` "Üretilecek: 0 klip".
5. Doğrulama: `olc.js` (8 ders) ve `denetle.js` temiz; sayfalarda `ses/sayilar-dN.js` bağlantısı baştan vardı.

Sonuç: 122 klip, 9,4 dk, 4,58 MB, 6.718 karakter. Bekleyen: kullanıcı D1'i ve her konudan bir dersi sesli izleyecek; yanlış okunan klip için `ses/sayilar-dN/<anahtar>.mp3` silinip dersin komutu yeniden çalıştırılır.
