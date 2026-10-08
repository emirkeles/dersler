---
workflow: general-video
flow: automation
storyboard: yes
message: "Virgül kayar, üs sayar."
destination: ders-ici-video
aspect: 1920x1080
language: tr
audience: 9. sınıf öğrencileri
length: 74s
narration: yes
---

## Intent

9. sınıf matematik, Sayılar teması, A7 "Bilimsel gösterim" dersinin son sahnesinde oynayan hikâye animasyonu.
Ece durakta beklerken reklam panosunda "3 nm" yazısını görür. Üç nanometre metreyle yazılınca virgülden sonra
sekiz sıfır dizilir; virgül dokuz basamak kayınca 3 × 10⁻⁹ m olur. Bir saç teli ise yaklaşık 7 × 10⁻⁵ m
kalınlığındadır. İki üs arasındaki dört basamak, saç teline dört kez onar kat yaklaşmak demektir; saç telinin
kalınlığına yan yana on binlercesi sığar. Öğrenci izlerken "bilimsel gösterim hayatta burada karşıma çıkacak"
diyebilmeli. Etkileşim yok; izlenir. Ton sakin, hikâye anlatır gibi.

Kaynak plan: `plan/matematik/sayilar/HIKAYE-ANIMASYONLARI.md` (5 numaralı hikâye) ve
`plan/matematik/sayilar/hikaye/A7-3-nanometre.md` (müfredat dayanağı, sayıların sağlaması, riskler).
Dersin senaryosu: `plan/matematik/sayilar/senaryolar/A5-A8-yeni-dersler.md` (A7); ders yayında.

## Customizations

- Tek dünya, tek kompozisyon: film durakta başlar, kamera aynı resmin içinde panoya, oradan saç teline ve telin
  içine iner; kesme yok.
- Kahraman nesne dersteki basamak satırıdır: rakamlar yerinde durur, virgül kayar, 10'un üssündeki sayaç her
  kayışta bir değişir. Dersle aynı davranır.
- Yakınlaşma ölçeklidir: saç teli planında 200 px = 10⁻⁵ m; her adımda görüntü tam 10 kat büyür, ölçek etiketi
  bir basamak değişir. Dört adım sonra 200 px = 10⁻⁹ m, "3 nm" işareti 600 px.
- 9. karede yan yana dizilen işaretler sayılır; sayaç "≈ 23 000" ile biter (kullanıcı onayı, 8 Ekim 2026).
- Çizim dili: risograf baskı. Krem kâğıt üstünde dört mürekkep (koyu, mavi, sarı, mercan), nokta taraması ve
  hafif kayık baskı. Tamamı vektör. A8 (guaj harita), B7 (kuru pastel, kış gecesi) ve E3'ten (kâğıt kesme)
  bilerek ayrışır; ortak kalanlar yazı tipi (IBM Plex Sans) ve kapanış kartı düzeni. Ayrıntı: `frame.md`.
- Anlatıcı: George (ElevenLabs hazır sesi, `eleven_v4`). Kullanıcı bu hikâye için erkek ses istedi ve beş Türkçe,
  altı İngilizce örnek arasından George'u seçti (8 Ekim 2026); derslerin ve öteki hikâyelerin anlatıcısı değişmedi.
  Klipler `ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb node araclar/hikaye-ses.js a7-3-nanometre` ile üretilir
  (`assets/ses/`). Yönergeler yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.

## Notes

- Ekranda cümle yok; yalnızca ölçü etiketleri (sayı ve birim) ve kapanış kartı.
- Derste geçmeyen kavram, terim ya da formül hikâyeye girmez. "Nanometre" reklamdaki birimin adıdır; anlamı
  dersin cümlesiyle verilir ("metrenin milyarda biri").
- "3 nanometre" çipin üretim kuşağının adıdır, içindeki parçaların gerçek ölçüsü değildir. Hikâye "en küçük parça
  3 nanometre" demez; reklamdaki uzunluğun ne kadar küçük olduğunu anlatır.
- Saç teli kalınlığı kişiye göre yaklaşık 2 × 10⁻⁵ ile 2 × 10⁻⁴ m arasındadır; anlatımda "yaklaşık" sözü zorunlu.
- Gerçek marka, logo, model adı yok; telefon ve reklam yazısızdır ("3 nm" dışında).
- Müzik ve efekt yok (öteki hikâyeler de yalnızca anlatımla işlendi); karar açık.
- Altyazı videoya gömülmez; dersin motoru `.vtt` dosyasını ayrıca gösterir.
- Seslendirme ve işleme ücretli ya da uzun adımlardır; kullanıcı ayrıca ister.
- `flow` ve `storyboard` değerleri kullanıcıya sorulmadı; projenin kendi üretim hattından çıkarıldı (senaryo ve
  kare onayı zorunlu). Bu yüzden tercih belleğine kaydedilmedi.
