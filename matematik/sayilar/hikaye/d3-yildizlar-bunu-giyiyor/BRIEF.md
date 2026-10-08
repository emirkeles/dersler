---
workflow: general-video
flow: automation
storyboard: yes
message: "İse tek yön, ancak ve ancak çift yön."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 75s
narration: yes
---

## Intent

9. sınıf matematik, Sayılar teması, D3 "İse, ancak ve ancak" dersinin son sahnesinde oynayan hikâye animasyonu.
Azra BLACKPINK hayranı. Okul dönüşü bir reklam panosu görür: "Yıldızlar bu ayakkabıyı giyiyor." Cümle doğru olsun:
sahnenin yıldızıysan bu ayakkabıyı giyiyorsun. Azra harçlığını biriktirir, ayakkabıyı alır, giyer; aynada ayakkabı
aynıdır ama Azra hâlâ odasındadır. Reklamı tersinden okumuştur: yol tek yönlüdür ve ters yönün karşı örneği Azra'nın
kendisidir. Bir ay sonra konser kapısında yol iki yöne de açıktır: bileti olan girer, giren herkesin bileti vardır.
Öğrenci izlerken "p ise q doğruyken q ise p doğru olmayabilir" fikrini bir reklamda ve bir bilet denetiminde
tanıyabilmeli. Etkileşim yok; izlenir. Ton sakin, hikâye anlatır gibi; Azra'yla alay edilmez.

Kaynak plan: `plan/matematik/sayilar/HIKAYE-ANIMASYONLARI.md` (6 numaralı hikâye) ve
`plan/matematik/sayilar/hikaye/D3-yildizlar-bunu-giyiyor.md` (hikâyenin işi, kararlar, riskler).
Dersin senaryosu: `plan/matematik/sayilar/senaryolar/D-islem-ozellikleri-ve-cebir.md` (D3); ders yayında, dört sahne.

## Customizations

- Tek dünya, tek kompozisyon: film Azra'nın hayran defterinin tek bir geniş sayfasında geçer. Solda sokak ve pano,
  ortada oda ve ayna, sağda konser kapısı. Kamera sayfanın üstünde soldan sağa kayar; kesme yok.
- Kahraman nesne "ok-yol": dersteki ⇒ simgesinin iki çizgisi bir yolun iki kenarıdır. Tek başlı ok tek yönlü yoldur,
  çift başlı ok (⇔) iki yöne açık yol. Okun iki ucunda yazı değil resim durur: yıldız ve ayakkabı, sonra bilet ve kapı.
  Yolun üstünde küçük bir ışık yürür; ters yönde yürüyemez.
- Reklamın cümlesi ekrana yazılmaz. Panoda cümlenin yerinde üç kalem çizgisi durur; 3. karede o çizgiler ok-yola
  dönüşür (cümle, önermenin kendisi olur).
- Çizim dili: çıkartma defteri. Noktalı defter kâğıdı; her nesne beyaz kenarlı, kalın siyah konturlu bir çıkartma;
  oklar keçeli kalemle çizilir, fosforlu sarı kalemle işaretlenir. Renkler siyah, pembe, açık pembe; vurgu sarı.
  Tamamı vektör. A8 (guaj harita), B7 (kuru pastel), E3 (kâğıt kesme) ve A7'den (risograf baskı) bilerek ayrışır;
  ortak kalanlar yazı tipi (IBM Plex Sans) ve kapanış kartı düzeni. Ayrıntı: `frame.md`.
- Anlatıcı: Gamze Özdemir (`eleven_v4`), derslerin ve öteki hikâyelerin sesi. Klipler
  `node araclar/hikaye-ses.js d3-yildizlar-bunu-giyiyor` ile üretilir (`assets/ses/`). Yönergeler yalnızca
  `[curious]`, `[thoughtful]`, `[short pause]`.

## Notes

- Ekranda cümle yok; yalnızca kapanış kartı (cümle, ⇒ ve ⇔). Tek istisna grubun logosudur (bir sözcük).
- Derste geçmeyen kavram, terim ya da simge hikâyeye girmez: "tek yön", "ters yön", "karşı örnek" ve "ancak ve ancak"
  D3'ün 1. ve 2. sahnesinin sözcükleridir. p ve q harfleri ekrana yazılmaz.
- Azra, reklam, ayakkabı ve konser kurgudur. BLACKPINK gerçek bir gruptur. Kullanıcı kararı (8 Ekim 2026): grup
  tanınır biçimde çizilir ve logosu görünür. Panodaki yıldızlar grubun dört üyesidir (şematik vektör, yüz ayrıntısı
  yok; saç ve kıyafetle ayrışırlar); logo panoda ve defterde bir çıkartmada durur. Reklam böylece gruba bağlanmış
  olur: gerçek bir grup kurgu bir ayakkabının reklamında görünür. Anlatım metni değişmedi ("Yıldızlar" der).
  Üyelerin üretilmiş gerçekçi portresi yapılmaz (`plan/KURALLAR.md` 5.1). Ayakkabı markasızdır; ışık çubuğu çizilmedi.
- Konserin yeri ve tarihi yok; gerçek bir konsere gönderme yapılmaz.
- Müzik ve efekt yok (öteki hikâyeler de yalnızca anlatımla işlendi); karar açık.
- Altyazı videoya gömülmez; dersin motoru `.vtt` dosyasını ayrıca gösterir.
- Seslendirme ve işleme ücretli ya da uzun adımlardır; kullanıcı ayrıca ister.
- `flow` ve `storyboard` değerleri kullanıcıya sorulmadı; projenin kendi üretim hattından çıkarıldı (senaryo ve
  kare onayı zorunlu). Bu yüzden tercih belleğine kaydedilmedi.
- Çizim dili ve anlatıcı bu oturumda seçildi (8 Ekim 2026). Kullanıcı ilk iki kareyi gördü, grubun ve logonun
  eklenmesini istedi, sonra "bu hikâyeyi tamamla" dedi; çizim dili, kare planı ve anlatıcı bu sözle geçerli sayıldı.
