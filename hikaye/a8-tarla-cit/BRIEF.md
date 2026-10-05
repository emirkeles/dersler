---
workflow: general-video
flow: automation
storyboard: no
message: "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 70s
narration: yes
---

## Intent

A8 "Yaklaşık değer" dersinin son sahnesinde oynayan hikâye animasyonu. Elif'in dedesi bir
dönümlük kare tarlasını çitle çevirecek; kenar √1000 tam çıkmıyor. 31 alınırsa çit yetmiyor,
32 alınırsa artıyor, 31,6 alınırsa eksik bir karış bile etmiyor. Öğrenci izlerken "yaklaşık
değer hayatta burada karşıma çıkacak" diyebilmeli. Etkileşim yok; izlenir.

Kaynak plan: `plan/HIKAYE-ANIMASYONLARI.md` (1 numaralı hikâye, pilot).
Dersin senaryosu: `senaryolar/A5-A8-yeni-dersler.md` (A8, 4. sahne).

## Customizations

- Çizim dili: resimli harita. Tarla üstten, insanlar, ev, ağaçlar ve keçi yandan; kâğıt kesme
  biçimler, guaj renkleri, kâğıt dokusu. Tamamı vektör (ölçüler kesin olsun diye).
- Çit, sayaçla birlikte ölçekli çizilir: 600 px = 31,62 m.
- Anlatıcı: Gamze Özdemir, `eleven_v4`. Klipler `node araclar/hikaye-ses.js a8-tarla-cit` ile üretilir (`assets/ses/`).

## Notes

- Ekranda cümle yok; yalnızca ölçü etiketleri (sayı + birim) ve kapanış kartı.
- Derste geçmeyen kavram, terim ya da formül hikâyeye girmez.
- Fiyat (TL) söylenmez; çabuk eskir. "Boşa para" demek yeterli.
- Zamanlama gerçek klip sürelerine göre kuruldu (`index.html` içindeki `T` tablosu ve `<audio>` öğeleri).
