---
workflow: general-video
flow: automation
storyboard: yes
message: "Kesirlerde “bir sonraki sayı” yoktur."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 75s
narration: yes
---

## Intent

9. sınıf matematik, Sayılar teması, C4 "Sıralama ve arada olma" dersinin son sahnesinde oynayan hikâye animasyonu.
Paris 2024'ün 100 metre finalinde ilk iki koşucunun derecesi tabelada aynıdır: 9,79. Bitiş kamerası bir basamak
daha okur: 9,784 ve 9,789. Sayı doğrusunda soldaki küçüktür; altın binde beş saniyeyle kazanılır. Peki 9,784'ten
sonraki sayı 9,785 mi? Yaklaşınca araya 9,7845 girer; daha da yaklaşınca 9,78405. Kamera bir yerde durur, sayılar
durmaz. Öğrenci izlerken "arada olma hayatta burada karşıma çıkıyor" diyebilmeli. Etkileşim yok; izlenir. Ton
sakin, hikâye anlatır gibi.

Kaynak plan: `plan/matematik/sayilar/HIKAYE-ANIMASYONLARI.md` (2 numaralı hikâye) ve
`plan/matematik/sayilar/hikaye/C4-fotofinis.md` (inceleme, değişiklikler, dayanak, kaynaklar, riskler).
Dersin senaryosu: `plan/matematik/sayilar/senaryolar/C-sayi-kumeleri.md` (C4); ders yayında.

## Customizations

- Tek dünya, tek kamera: film stadyumda açılır, bitiş çizgisine yaklaşır, tabelaya kalkar, bitiş kamerasının
  paneline iner ve panelin cetvelinin içine girer; cetvel sayı doğrusu olur. Kesme yok.
- Kahraman nesne dersteki sayı doğrusudur ve dersteki gibi davranır: yakınlaşınca araya yeni sayı girer.
- Yakınlaşma ölçeklidir: tek bir derinlik değerinden (`z`) hesaplanır; her adım tam 10 kattır. Çizgiler, etiketler
  ve sağ üstteki aralık göstergesi aynı değeri okur. Kazananın derecesi (9,784) yakınlaşmanın sabit noktasıdır.
- İki koşucu film boyunca iki renk ve iki biçimle izlenir: turuncu daire (birinci), nane eşkenar dörtgen (ikinci).
- Yarıştaki farklar ölçeklidir: bitişte birinciyle ikincinin arası 4 pikseldir (yaklaşık 5 cm).
- Çizim dili: gece stadyumu, düz biçimli spor afişi; mor pist, yedi parçalı LED tabela. Ayrıntı: `frame.md`.
- Anlatıcı: Gamze Özdemir (ElevenLabs, `eleven_v4`). Yönergeler yalnızca `[curious]`, `[thoughtful]`,
  `[short pause]`.

## Notes

- Ekranda cümle yok; yalnızca sayılar, "<", "?", "sn" ve kapanış kartı.
- Derste geçmeyen kavram, terim ya da formül hikâyeye girmez.
- Gerçek koşucuların adı, yüzü, forması, ülkesi ve kulvarı verilmez; olimpiyat logosu yok.
- Müzik ve efekt yok (öteki hikâyeler de yalnızca anlatımla işlendi); karar açık.
- Altyazı videoya gömülmez; dersin motoru `.vtt` dosyasını ayrıca gösterir (dosya henüz yok).
- `flow` ve `storyboard` değerleri kullanıcıya sorulmadı; projenin kendi üretim hattından çıkarıldı. Bu yüzden
  tercih belleğine kaydedilmedi. Kullanıcı bu hikâyede kare onayı istemedi ("profesyonel bir iş çıkart");
  senaryo, kareler ve ses onaysız üretildi.
