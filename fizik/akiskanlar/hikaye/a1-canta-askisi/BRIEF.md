---
workflow: general-video
flow: automation
storyboard: yes
message: "Aynı kuvvet, küçük yüzeyde daha çok bastırır."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 66s
narration: yes
---

## Intent

9. sınıf fizik, Akışkanlar teması, A1 "Basınç neye bağlı?" dersinin son sahnesinde oynayan hikâye animasyonu.
Elif'in sırt çantası yıkanmış; kitaplarını ipli spor torbasına koyar, ipler omuzlarını keser. Ertesi gün aynı
kitaplar sırt çantasındadır ve omuzları acımaz. Yük aynıdır; değişen, kuvvetin etki ettiği yüzeydir: 1 cm'lik ip,
5 cm'lik askı. Öğrenci izlerken "basınç hayatta burada karşıma çıkacak" diyebilmeli. Etkileşim yok; izlenir.
Ton sakin, hikâye anlatır gibi; öğüt vermez.

Kaynak plan: `plan/fizik/HIKAYE-ANIMASYONLARI.md` (7 numaralı hikâye) ve
`plan/fizik/akiskanlar/hikaye/A1-cantanin-askisi.md` (müfredat dayanağı, senaryo, resimli taslak, HyperFrames yapısı,
riskler). A1 dersi henüz yazılmadı; hikâye dersin `PLAN.md` taslağındaki akılda kalıcı cümleye göre kuruldu.

## Customizations

- Tek dünya, tek kompozisyon: yan yana üç duraklı tek sokak (ev, okul yolu, vitrin); kesme yok, kamera aynı
  resimde gezer. 5–7. karelerde ekranı kareli defter sayfası kaplar.
- Omuz kesiti ölçeklidir (60 px = 1 cm): ip 60 px, askı 300 px; iki tarafta onar özdeş ok. Konumlar sayıdan
  hesaplanır, elle yerleştirilmez.
- Çizim dili `frame.md` içinde: mürekkep kontur ve suluboya, tamamı vektör.
- Anlatıcı: Gamze Özdemir, `eleven_v4`. Klipler `node araclar/hikaye-ses.js a1-canta-askisi` ile üretilir
  (`assets/ses/`); ses ücretlidir, kullanıcı ayrıca ister.

## Notes

- Ekranda cümle yok; yalnızca iki ölçü etiketi ("1 cm", "5 cm") ve kapanış kartı.
- A1'de geçmeyen terim, formül ya da oran hikâyeye girmez: P = F / A, pascal ve "beşte bir" yok.
- İki çanta her karede iki omuzda taşınır; sırt çantasında bel kemeri yoktur.
- Kırmızı yalnızca omuzdaki ve parmaktaki izde ve yığılan karoda kullanılır.
- Kareler kullanıcıya tek tek gösterilir; 1. kare onaylanmadan öbürleri çizilmez (7 Ekim 2026).
