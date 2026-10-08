# frame.md — Yıldızlar bunu giyiyor

Durum: uygulandı (8 Ekim 2026). Kullanıcı ilk iki kareyi gördü ve hikâyenin tamamlanmasını istedi; on bir kare bu kimlikle kuruldu.

## Üslup

Çıkartma defteri: film, Azra'nın hayran defterinin tek bir geniş sayfasında geçer. Kâğıt noktalıdır. Her nesne bir
çıkartmadır: kalın siyah kontur (6 px), çevresinde beyaz kesim payı (9 px), altında kâğıda düşen kısa ve sert bir
gölge. Kesim payı ve gölge tek bir SVG süzgecidir (`#cikartma`); çıkartma olan her grup `ck` sınıfını taşır.
Çıkartmalar sayfaya hafif eğik yapıştırılır. Oklar ve işaretler keçeli kalemle elle çizilir; önemli yerin üstünden
fosforlu sarı kalem geçer. Köşelerde kâğıt bant.

Neden bu: hikâye bir hayranın hikâyesidir ve hayranlar defter süsler, çıkartma ve kart biriktirir. Ok da defterde
kalemle çizilen şeydir; dersin ⇒ ve ⇔ simgeleri bu dünyada yabancı durmaz. Siyah ve pembe, grubun adından ve
logosundan gelir. A8 (guaj harita), B7 (kuru pastel, kış gecesi), E3 (konturu olmayan kâğıt kesme) ve A7'den
(risograf baskı, krem kâğıt) bilerek ayrışır: burada kontur kalın, kâğıt soğuk beyaz, her şey kesilip yapıştırılmış.

## Renkler

| Rol | Ad | Değer |
|---|---|---|
| Zemin | defter kâğıdı | `#F4F1F7` |
| Kâğıdın noktaları, kalem izi | gri mor | `#B9B2C6` |
| Kontur, sahne, gece, yazı | siyah mürekkep | `#1B1720` |
| Kimlik rengi: Azra'nın kazağı, ayakkabının tabanı, sahne ışığı | pembe | `#E0347F` |
| Açık yüzey, ışık konisi, kâğıt bant | açık pembe | `#F8C6DC` |
| Uzak yüzey: kaldırım, arkadaki bina | açık gri mor | `#DDD7E7` |
| Çıkartmanın kesim payı, ayakkabının yüzü | beyaz | `#FFFFFF` |
| Vurgu (tek) | fosforlu sarı | `#FFD93B` |
| Yalnızca panoda: sahne ışığı | çok açık pembe | `#FCE6F0` |
| Yalnızca panoda: bir üyenin saçı | sarışın | `#F1D9A6` |

Vurgu yalnızca şunlarda: ok-yolun zemini, yolda yürüyen ışık, karşı örneği çevreleyen halka, kapanış kartının gölgesi.
Başka yerde sarı yok. Pembe vurgu değildir; dünyanın rengidir.

## Yazı

IBM Plex Sans (`assets/fonts/`, öteki hikâyelerle aynı dosyalar). Ekranda yalnızca kapanış kartında ve grubun
logosunda yazı var.

| Rol | Ağırlık | Boyut |
|---|---|---|
| Kapanış cümlesi | 600 | 80 px |
| Kapanış kartındaki ⇒ ve ⇔ | çizim (yazı değil) | 120 px yükseklik |
| Grubun logosu | 700 | 54 px (çıkartma), 38 px (pano) |

Logo: "BLACKPINK" büyük harflerle, pembe, siyah zeminde; C ve N aynalı, A çizgisiz (ters çevrilmiş V). Resmî
çizim dosyası değil, Plex Sans ile yaklaşık dizgidir (`logoYaz`); harf biçimleri özgün logodan ayrışır.

## Ölçek ve yerleşim

Sayfa 5760 × 1080 pikseldir (üç ekran genişliği). Bölge 1 (x = 0–1920) sokak ve pano; bölge 2 (x = 1920–3840) oda ve
ayna; bölge 3 (x = 3840–5760) konser kapısı. Sağ ileri demektir: Azra, kamera ve tek yönlü ok soldan sağa gider.

3. kareden sonra kamera resmi ekranın üst üçte ikisinde tutar (bakılan nokta y = 492, büyütme 1,1; yer çizgisi
ekranda y ≈ 770). Alt bölüm ok-yol şeridinindir (y = 796–1008): ekrana sabit, beyaz bir çıkartma; solunda bir resim,
sağında bir resim, aralarında ok-yol. Şerit 3. karede açılır.

Ok-yol: iki paralel keçeli kalem çizgisi (aralık 36 px, kalınlık 12 px) ve bir ok başı; çizgilerin arasında sarı
zemin. Çift yönde ikinci ok başı sola eklenir. Azra'nın ters okuması aynı biçimin pembe ve kesik çizgili hâlidir.
Kapanış kartındaki simgeler aynı çizimdir. Kapanış kartı beyazdır: koyu çerçeve, sarı kayık gölge.

Azra: yüz ayrıntısı yok; at kuyruğu, pembe kazak, siyah etek, sırt çantası. 4. kareye kadar ayağında düz siyah
ayakkabı vardır; sonra reklamdaki ayakkabı. Sahnedeki yıldızlar: grubun dört üyesi, yan yana, ayaklarında reklamdaki ayakkabı. Şematik ve yüzsüzdür;
saçla ayrışırlar: uzun düz siyah saç, at kuyruğu, uzun dalgalı sarışın saç, kâkül. Kıyafetler siyah, pembe, beyaz.
İkisinin elinde mikrofon var. Çizim betikte kurulur (`uye`); 5. karedeki afiş ve 8. karedeki salon aynı çizimi kullanır.
Ayakkabı her yerde aynı çizimdir (aynı `<symbol>`): beyaz, pembe tabanlı, yanında küçük pembe bir kalp; marka
çağrıştıran şerit ya da yuvarlak arma yok.

## Hareket

Çıkartma yapışır: biraz büyük ve eğik gelir, yerine oturur (`power3.out`; taşma ve zıplama yok). Kalem çizer: çizgi baştan
sona uzar (`power2.inOut`). Fosforlu kalem soldan sağa sürülür. Kamera sayfada yatay kayar (`power2.inOut`), hiçbir
zaman kesmez. Yoldaki ışık sabit hızla yürür (`none`); ters yönde yürümeye kalkınca durur ve geri döner.
Durağan an: 5. kare, "sahnede değil" denirken hiçbir şey kıpırdamaz.

## Yapma

- Degrade, parlama, neon, 3B gölge. Gölge tek renkli ve serttir.
- Yüz ayrıntısı, gerçek kişinin üretilmiş portresi ya da fotoğrafı, ayakkabıda marka ya da model adı.
- Ekranda cümle, harf (p, q) ya da reklam sloganı; panoda cümlenin yerinde kalem çizgileri durur. Logo dışında sözcük yok.
- Sarıyı süs olarak kullanmak.
- Azra'yı küçük düşüren jest (ağlama, gülünç düşme). Azra yanılmıştır, o kadar.
