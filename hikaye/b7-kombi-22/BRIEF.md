---
workflow: general-video
flow: automation
storyboard: no
message: "Mutlak değer, hedefe uzaklıktır."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 73s
narration: yes
---

## Intent

B7 "Mutlak değerle aralık" dersinin son sahnesinde oynayan hikâye animasyonu. Mert'lerin kombisi
22 dereceye ayarlı; oda 21,4 ya da 22,8 olunca kombi dinlenir, pencere açılıp 20,9'a düşünce
çalışır. Çünkü termostat sayının kendisine değil 22'ye uzaklığına bakar: |x − 22| < 1. Öğrenci
izlerken "mutlak değer hayatta burada karşıma çıkacak" diyebilmeli. Etkileşim yok; izlenir.

Kaynak plan: `plan/HIKAYE-ANIMASYONLARI.md` (3 numaralı hikâye).
B7 dersi henüz yazılmadı (`plan/PLAN.md`, Bölüm B); hikâye dersin akılda kalıcı fikrine göre kuruldu.

## Customizations

- Çizim dili: lacivert fon kartonu üstünde kuru pastel. Kış gecesinde kesit ev: dışarısı kâğıdın
  kendi laciverdi ve tebeşir beyazı kar, içerisi sıcak kayısı, kiremit, hardal. Soğuk-sıcak karşıtlığı
  hikâyenin konusu olduğu için renk de onu taşır. Tamamı vektör; pastel dokusu SVG süzgeciyle
  (titrek kenar + kâğıt dişi) ve elle atılmış tarama çizgileriyle verilir.
- A8 hikâyesinden (resimli harita, guaj, gündüz) bilerek ayrışır; ortak kalanlar yazı tipi (Plex Sans),
  figürlerin yalın biçimi ve kapanış kartı düzeni.
- Rakamlar süzgeçsiz ayrı katmanda durur (her karede kesin okunsun).
- Sıcaklık şeridi ölçekli çizilir: sayı doğrusu, 22 hedef, 21 ve 23 boş nokta (uçlar dahil değil).
- Anlatıcı: Gamze Özdemir, `eleven_v4`. Klipler `node araclar/hikaye-ses.js b7-kombi-22` ile üretilir (`assets/ses/`).

## Notes

- Ekranda cümle yok; yalnızca ölçü etiketleri (sayı + birim) ve kapanış kartı.
- Derste geçmeyen kavram, terim ya da formül hikâyeye girmez.
- Kombi yalnızca ısıtır: hikâye payın soğuk tarafından çıkışı gösterir (ayrıntı `SCRIPT.md`, Doğruluk notu).
- Anlatıcı değişmedi: anlatım üçüncü şahıs, Mert'in repliği yok; erkek ses gerekmedi (kullanıcı gerekirse
  değiştirmeye izin vermişti, 5 Ekim 2026).
- Zamanlama gerçek klip sürelerine göre kuruldu (`index.html` içindeki `T` tablosu ve `<audio>` öğeleri).
  Cümle içi eşlemeler kliplerdeki sessizliklerden ölçüldü.
