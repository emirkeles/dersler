---
workflow: general-video
flow: automation
storyboard: yes
message: "Gösterge anı söyler, ortalama bütün yolu."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 71s
narration: yes
---

## Intent

9. sınıf fizik, Kuvvet ve Hareket teması, E3 "Sürat: ortalama ve anlık" dersinin son sahnesinde oynayan
hikâye animasyonu. Sürücü iki kameranın önünde de frene basar, gösterge ikisinde de 85'i gösterir, sınır 90'dır;
ceza yine gelir. Çünkü kameralar göstergeye değil saate bakar: 12 kilometre 6 dakikada geçilmiştir, ortalama
sürat 120 km/h eder. Öğrenci izlerken "anlık sürat ile ortalama sürat hayatta burada karşıma çıkacak" diyebilmeli.
Etkileşim yok; izlenir. Ton sakin, hikâye anlatır gibi; öğüt vermez.

Kaynak plan: `plan/fizik/HIKAYE-ANIMASYONLARI.md` (2 numaralı hikâye) ve
`plan/fizik/kuvvet-ve-hareket/hikaye/E3-iki-kamera-arasi.md` (müfredat dayanağı, sayıların sağlaması, riskler).
E3 dersi henüz yazılmadı; hikâye dersin `PLAN.md` taslağındaki akılda kalıcı cümleye göre kuruldu.

## Customizations

- Tek dünya, tek kompozisyon: bütün film iki kamera direği arasındaki 12 kilometrelik yol şeridinde geçer;
  kesme yok, kamera aynı resimde gezer.
- Yol şeridi ölçeklidir (120 px = 1 km). Arabaların konumu sayaçtaki dakikadan hesaplanır, elle yerleştirilmez.
- Sürat göstergesi büyük ve analog; ibre her karede okunur. Rakamlar süzgeçsiz ayrı katmanda durur.
- Çizim dili (öneri, onay bekliyor): kâğıt kesme görünümü, düz renkli katmanlar, öğleden sonra ışığı. Tamamı
  vektör. A8 (guaj harita, gündüz) ve B7'den (kuru pastel, kış gecesi) bilerek ayrışır; ortak kalanlar yazı tipi
  (IBM Plex Sans) ve kapanış kartı düzeni.
- Anlatıcı: Gamze Özdemir, ElevenLabs `eleven_v4`; derslerle ve ilk iki hikâyeyle aynı ses. Klipler
  `node araclar/hikaye-ses.js e3-iki-kamera` ile üretilir (`assets/ses/`). Yönergeler yalnızca `[curious]`,
  `[thoughtful]`, `[short pause]`.

## Notes

- Ekranda cümle yok; yalnızca ölçü etiketleri (sayı ve birim) ve kapanış kartı.
- Sürat–zaman ya da yol–zaman grafiği yok. Program: "Hareketin temel kavramlarına yönelik grafiklerden … kaçınılır."
- "Hız", "yer değiştirme" ve "ivme" sözcükleri geçmez (E4 ve E5'in konusu); tabelada ve anlatımda "sürat sınırı" denir.
- Derste geçmeyen kavram, terim ya da formül hikâyeye girmez.
- Sayıların hepsi kurgudur (90 km/h, 12 km, 14.00 ve 14.06, 85 ve 130). Gerçek kurum adı, logo ya da plaka yok.
- Müzik ve efekt yok (ilk iki hikâye de yalnızca anlatımla işlendi); karar açık.
- Altyazı videoya gömülmez; dersin motoru `.vtt` dosyasını ayrıca gösterir.
- Seslendirme ve işleme ücretli ya da uzun adımlardır; kullanıcı ayrıca ister.
- `flow` ve `storyboard` değerleri kullanıcıya sorulmadı; projenin kendi üretim hattından çıkarıldı (senaryo ve
  resimli taslak onayı zorunlu). Bu yüzden tercih belleğine kaydedilmedi.
