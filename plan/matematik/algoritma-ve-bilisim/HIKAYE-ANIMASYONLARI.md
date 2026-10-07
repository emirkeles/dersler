# Plan — Hikâye animasyonları · 5. ünite: Algoritma ve Bilişim

Ölçütler (üç koşul, ek kurallar), biçim, derse yerleşim ve üretim hattı: `../sayilar/HIKAYE-ANIMASYONLARI.md` bölüm 1–3 ve 5. Burada yinelenmedi.

**Durum (7 Ekim 2026): hakem incelemesinden geçti; düzeltmeler işlendi (bölüm 7; rapor: `../HIKAYE-HAKEM.md`).** Ünite henüz işleme alınmadı; ders kodları ve adları `PLAN.md` taslağındaki hâlleridir.

31 dersin 3'ünde hikâye var; kalanlarında yok. Program bu ünitede örnek problemleri tek tek sayıyor (nöbet, tokalaşma, çöp arabası, vücut kitle indeksi, sayı tutma oyunu) ve dersler bunlarla kurulu; hikâyeler, öğrencinin her gün kullandığı ama içini görmediği üç yere yazıldı.

## 1. Hikâyesi olan dersler (müfredattaki önem sırasıyla)

Sıralama ölçütü 1. ünitedekiyle aynı: (1) program o fikir için gerçek yaşam bağlamını açıkça istiyor mu, (2) fikir çıktının kendi içeriği mi, (3) programdaki değer ve okuryazarlıklarla bağlı mı.

| Sıra | Ders | Fikir | Hayatta nerede | Hikâye | Kapanış cümlesi |
|---|---|---|---|---|---|
| 1 | C3 Mesajı ikili kodla yaz ve çöz | Yazı sayıya, sayı 0 ve 1'e çevrilip saklanır; ters yoldan okununca geri gelir | Karekod: menü, ödeme, bilet, pano | Menü, bilet, ödeme: her gün bir karekod okutuyorsun. Sınıf panosundaki küçük karekodu okutunca ekranda tek satır yazı çıkıyor. O desen bir resim değil, yazı: özünde her küçük kare bir basamak; siyah 1, beyaz 0. En küçük karekodda 21 × 21 = 441 kare var; üç köşedeki büyük kareler telefona kodun yönünü gösterir. Geri kalan karelerin çoğu mesajı taşır: telefon onları sırayla okur, öbek öbek ayırır; her öbek bir sayı, her sayı bir harf. | "Harf sayıya, sayı sıfır ve bire döner." |
| 2 | D1 Königsberg: bölge nokta, köprü çizgi | Çizgede çizginin boyu ve yönü bir şey söylemez; önemli olan neyin neye bağlı olduğudur | Metro, tramvay, metrobüs hat haritası | Metro haritasında duraklar eşit aralıklı, hatlar cetvelle çizilmiş gibi düz. Şehrin gerçek haritasının üstüne koysan hiçbiri tutmaz: hat kıvrılır, iki durak arası bir yerde kısa, başka yerde çok uzundur. Yine de kaybolmazsın; çünkü sana gereken yalnızca hangi durağın hangisine bağlı olduğu ve nerede aktarma yapılacağı. Bu haritada çizginin boyu bir şey söylemez; söyleyen bağlantıdır. Durak nokta, hat çizgi: cebindeki harita bir çizgedir. | "Çizge, yalnızca bağlantıyı tutar." |
| 3 | F2 Her ve bazı | "Bazı" için algoritma ilk uygun elemanda durur; "her" için hepsine bakmak zorundadır | Hesap açarken parola kutusunun altındaki kurallar | Yeni hesap açıyorsun; parola kutusunun altında iki kural var: "en az bir rakam olsun" ve "boşluk olmasın". kedi2010 yazıyorsun. Birinci kural bir "bazı" sorusu: program karakterleri sırayla geçer, beşincide ilk rakamı görür ve durur; gerisine bakmasına gerek yok. İkinci kural bir "her" sorusu: her karakter boşluktan başka bir şey olmalı; yedisi temiz diye onay veremez, sekizine de bakar. Araya boşluk koysaydın tek o karakter kuralı bozardı. | "Her: hepsine bak. Bazı: biri yeter." |

Üretim sırası tablodaki sıradır. Süre ya da bütçe daralırsa ilk vazgeçilecek olan 3 numaradır (üçüncü koşul sınırda: F2'nin açılışı aynı fikri yoklama programıyla soruyor).

## 2. Müfredat dayanağı

| Sıra | Hikâye | Programdaki dayanak | Program gerçek yaşam bağlamı istiyor mu |
|---|---|---|---|
| 1 | Karekodun içinde ne yazıyor? | İçerik çerçevesi: "Şifrelemede ve şifre çözmede algoritmalar kullanılır." MAT.9.5.1 uygulama: "Bilgi teknolojileri ve iletişimde mesajları şifrelemek için algoritmaların nasıl kullanılabileceği sorgulanır; metinlere, sayılara veya sembollere verilen sayısal değerlerle ikili sisteme (binary) dönüştürülmesi bir şifreleme örneği olarak ele alınır". | **Evet.** Bağlam bilgi teknolojileridir; öğrenme kanıtlarında "Gerçek yaşam durumlarında ve bilişim sistemlerinde şifreleme algoritmalarının kullanımlarının araştırılması" geçiyor. Karekod programın kendi örneği değil. |
| 2 | Metro haritası neyi atar? | İçerik çerçevesi: "Çizge ve diyagramlar, etkin problem çözme araçlarıdır." MAT.9.5.1 uygulama: "…köprüler ayrıt, bölgeler düğüm kabul edilerek problem; bir çizge şeması ile temsil edilir." "…şehirleri birbirine bağlayan en kısa yol, … sosyal ağlarda bilginin yayılımı gibi problemlerde farklı bir çözüm yolu olarak çizgelerin kullanılabileceği gösterilir". | **Evet.** Program çizgeyi gerçek problemlerle veriyor; kendi örneği Königsberg'dir (tarihî). Hikâye onu tekrar etmez. |
| 3 | Parola ekranı | MAT.9.5.2 uygulama: "Gerçek yaşam durumlarında ve sözel problem metinlerinde (…) geçen önermelerdeki mantık bağlaçları (ve, veya, ya da, ise) ve niceleyicilerin (her, bazı) anlamları değerlendirilir." "Öğrencilerin algoritma temelli problemlerde mantık bağlaçları ve niceleyicilere olan ihtiyacın sebebini sorgulaması sağlanır." | **Evet, açıkça** ("gerçek yaşam durumlarında"). Programın saydığı örnek türleri sınıflandırma, çizge ve şifreleme problemleridir; parola ekranı bunlardan biri değil, "gibi"nin içinde. Niceleyicilerin anlamı ön bilgi; hikâye anlamı değil, algoritmadaki işlevi gösterir. |

## 3. Üç koşul

| Sıra | Koşul 1 · Gerçekten hayatta var | Koşul 2 · Öğrenci karşılaşacak | Koşul 3 · Konu soyut kalıyor |
|---|---|---|---|
| 1 | Karekod tam olarak budur: verinin 0 ve 1'lerle, kare kare yazılmış hâli. | Her gün: menü, ödeme, bilet, okul duyurusu. | C2 ve C3'ün açılışları varsayımsal ("bilgisayar 25'i nasıl yazar", "sana 0 ve 1'lerden bir satır gönderildi"); ikili kodun nerede durduğu görünmüyor. |
| 2 | Metro haritaları bilerek çizge olarak çizilir; coğrafya atılır. | Metro, Marmaray, tramvay, metrobüs hat şeması. Raylı sistemi olmayan illerde karşılaşma zayıf. | Ders 18. yüzyıl Königsberg'iyle kurulu; "yalnızca bağlantı" fikri öğrencinin kendi kullandığı bir çizgeye bağlanmıyor. D2 çizgenin kullanımlarını sayıyor ama haritayla çizgenin farkını göstermiyor. |
| 3 | Parola kuralları sahiden böyle denetlenir: "en az bir" için tek uygun karakter yeter, "hiç olmasın" için bütün karakterlere bakılır. | Her yeni hesapta: oyun, e-posta, sosyal medya, okul sistemi. | **Sınırda.** F2'nin açılışı (yoklama programı: "herkes burada mı" ile "biri eksik mi") aynı fikri soruyor; ama o bir düşünce sorusu, öğrencinin gözünün önünde çalışan bir denetim değil. Parola ekranında kural tutunca beliren onay işareti, algoritmanın ne zaman durabildiğini görünür kılar. |

## 4. Doğruluk notları

- **Karekod.** En küçük karekod (sürüm 1) 21 × 21 = 441 karedir; en büyüğü 177 × 177. Koyu kare ikili 1, açık kare ikili 0'dır. Üç köşede (sol üst, sağ üst, sol alt) konum bulma desenleri vardır. Karekodu 1994'te Denso Wave'de Masahiro Hara geliştirdi. (Hepsi doğrulandı: karekod standardı özetleri, Keyence ve Accusoft belgeleri.)
- Sadeleştirmeler, anlatımda yanlış söylenmemeli: (a) kareler satır satır değil, sağ alttan başlayan bir yılan yoluyla okunur; "sırayla" demek yeter. (b) 441 karenin hepsi mesaj değildir: en küçük kodda 208'i veri ve hata düzeltme taşır, kalanı konum, zamanlama ve biçim desenidir; bu yüzden "geri kalan karelerin çoğu" denir. (c) Verinin üstüne bir maske deseni uygulanır; kareler doğrudan harfi vermez. Anlatım bu yüzden "özünde" der; öğrenci gerçek bir kodu elle çözmeye kalkarsa tutmaz, hikâye buna davet etmez. (d) "Sekizer gruplama" derste yok (harf-sayı eşleştirmesi henüz seçilmedi); hikâye "öbek öbek" der.
- Ekrandaki kod 21 × 21 çizilecekse içeriği en çok 17 karakterdir (sekizli kip, en düşük hata düzeltme düzeyi; doğrulandı). Bu yüzden kod bir internet adresi değil, kısa bir düz yazı taşır (örnek: "MERHABA 9-C", 11 karakter; Türkçeye özgü harfler iki yer tutar). Üretim önerisi (hakem): ekrandaki karekod gerçek olsun, telefonla okununca o yazıyı versin. Menü karekodları 21 × 21'den büyüktür; hikâye bu yüzden menü kodunu değil panodaki küçük kodu yakından gösterir.
- Karekod gizleme değil kodlamadır: okuyan herkes çözer. Program ikili sisteme çevirmeyi kendi sözüyle "bir şifreleme örneği" olarak anıyor; hikâye bu çerçevede kalır, karekodun bir şeyi "gizlediğini" söylemez.
- Harf-sayı eşleştirmesi `PLAN.md`'de henüz seçilmedi (bölüm 6, soru 12). Hikâye belirli bir eşleştirme göstermez; C1 ve C3 yazılınca kapanış karesindeki örnek dersin eşleştirmesine uydurulur. "Bit", "bayt", "ASCII" sözcükleri `PLAN.md`'de ders dışı; hikâyede geçmez.
- **Metro haritası.** Hikâyede ad ve tarih geçmez (hakem: derste zaten Euler var; ikinci yabancı ad ve tarih tek fikre hizmet etmiyor). Arka plan bilgisi: Londra metro haritasını şema olarak ilk Harry Beck tasarladı (tasarım 1931, ilk baskı 1933; doğrulandı: London Museum). Sahne öğrencinin kendi şehrindeki hat haritasına bakar.
- İki durak arası gerçek mesafeler için İstanbul'dan **doğrulanmış sayı bulunamadı**; hikâyede sayı yok ("bir yerde kısa, başka yerde çok uzun").
- Hikâye "çizge uzaklığı atar" demez, "bu haritada çizginin boyu bir şey söylemez" der: bir sonraki ders (D2) yol ağında uzaklıkları çizgilerin üstüne yazıyor. Çizgede uzaklık tutulabilir; anlam taşımayan, çizimin boyudur.
- "Ayrıt" ve "düğüm" D1'in kendi terimleridir; hikâye "nokta" ve "çizgi" der, yeni terim getirmez. Königsberg'in sonucuna ve çizge teoremlerine girilmez (programın sınırlaması).
- **Parola.** kedi2010 sekiz karakterdir: k, e, d, i, 2, 0, 1, 0; ilk rakam beşinci karakterdedir. "En az bir rakam" için beş karaktere bakmak yeter; "boşluk olmasın" için sekizine de bakılır. Örnek parola **kurgudur** ve güçlü parola önerisi değildir (ad ve yıl); ekranda öneri gibi durmamalı.
- Hikâye kuralın gerektirdiği en az bakışı anlatır. Gerçek programlar çoğu zaman her tuşta parolanın tamamını yeniden tarar; "beşincide durur" bir uygulama ayrıntısı değil, niceleyicinin anlamıdır (F2'nin tek fikri: "bazı için biri bulununca durur"). Senaryoda "durabilir" denmesi daha doğrudur.
- "Her" koşulu da tek istisnada bozulur (F2: "tek istisna koşulu bozar"); hikâyenin son cümlesi bunu söyler. "Boşluk olmasın" kuralı "her karakter boşluktan başka bir şeydir" diye okunur; "hiçbir" ayrı bir niceleyici olarak öğretilmez (program yalnızca "her" ve "bazı" der).
- Kurallarda bağlaç kullanılmadı ("harf ya da rakam" gibi): bağlaçlar F1'in konusu, hikâye tek fikirde kalır.

## 5. Hikâyesi olmayan dersler ve nedeni

| Dersler | Neden yok |
|---|---|
| A1 Algoritma bir tariftir; adı Harizmi'den gelir · A2 Aynı algoritma, üç yazılış · A5 Bu algoritma hangi problemi çözüyor? · A6 Algoritma testi | Algoritmanın ne olduğu ile yazma, okuma ve sınama tekniği; kendiliğinden anlaşılır. A1 için bkz. bölüm 6, ilk aday. |
| A3 Cebirsel ifadeyi algoritmaya çevir · A4 Sözel problemi algoritmaya çevir | Dersin kendisi zaten hayattan bir durumla kurulu (taksi ücreti; vücut kitle indeksi programın kendi örneği). |
| B1 Nöbet ve kalan · B6 Madenî para: en az tartım · B7 Akıldan tutulan sayı · E1 Tokalaşma: strateji kur ve uygula | Dersin kendisi programın verdiği somut durum ya da oyunla kurulu (nöbet listesi, terazi, sayı tutma oyunu, tokalaşma). İkinci bir hikâye tekrar olur; bkz. bölüm 6. |
| B2 Asal çarpanlara ayırma algoritması · B3 Aralarında asal mı? · B4 Eratosthenes kalburu · B5 Bölünebilme kuralı bir algoritmadır | Bilinen sayı işlemlerinin adım adım yazılması; işlem tekniği. Öğrencinin gündelik hayatında doğrudan karşılığı yok. |
| C1 Şifreleme ve çözme · C2 Sayıyı ikili sisteme çevir | C1 mesajlaşma uygulamasıyla açılıyor ve kendiliğinden anlaşılır. İkili sistemin hayattaki yeri 1 numaralı hikâyede (karekod) veriliyor. |
| D2 Çizge başka sorularda da işe yarar · D3 Çizgeyi algoritmanın diliyle oku · E3 Çöp arabası: çizgeyi tasarla | Dersler zaten hayattan kurulu (sosyal ağ, yol ağı, navigasyon; çöp arabası programın kendi örneği). Çizgenin ne olduğunu 2 numaralı hikâye taşıyor. |
| E2 Şifre hangi kuralla yazıldı? · E4 Çözümü kontrol et · E5 Aynı problem, iki strateji · E6 Çıkarım yap, değerlendir | Problem çözme sürecinin adımları; çalışma alışkanlığı. Hayatta ayrı bir karşılaşma anı yok. |
| F1 Karar adımı: ise, ve, veya, ya da · F3 Çizge ve şifreleme problemlerinde bağlaç ve niceleyici | Bağlaçların anlamı ön bilgi; "ve / veya" farkını 1. ünitenin alışveriş filtresi hikâyesi taşıyor. Niceleyicinin algoritmadaki işlevini 3 numaralı hikâye (parola ekranı) gösteriyor. |
| G1 Algoritmalara geri bak · G2 Her tek sayının karesi de tektir · G3 Üç dil, tek önerme | Yansıtma ve ispat. "Denemek kanıtlamaz" fikri 1. ünitenin siyah kuğu hikâyesinde. |

## 6. Değerlendirip elediğim adaylar

| Aday | Ders | Neden elendi |
|---|---|---|
| "Geçersiz numara." Formda T.C. kimlik numarasının bir hanesi yanlış yazılınca çıkan uyarı: bilgisayar kaydı taramaz, üç adım işletir (ilk on haneyi topla, toplamın son basamağına bak, on birinci haneyle karşılaştır). | A1 | **Hakem çıkardı (koşul 3).** A1 ünitenin en kolay dersi; aynı ölçütle A2, A5 ve A6 hikâyesiz. Ayrıca derste olmayan özel bir kuralı (denetim hanesi) öğretiyor, on bir haneli sayı ses için ağır ve örnek numara gerçek bir kişiye ait olabilir. Kural doğrulandı (on birinci hane, ilk on hanenin toplamının son basamağıdır). Yeniden kullanılacaksa yeri A5'tir (üç adım verilir, ne işe yaradığı sorulur); o zaman yeniden puanlanır ve denetimden geçmenin numaranın gerçek olduğunu göstermediği, yalnızca yazım hatasını elediği söylenir. |
| "Doğum günün seneye hangi güne denk gelir?" 365 = 52 · 7 + 1; kalan 1 olduğu için her tarih bir sonraki yıl bir gün kayar. | B1 | Koşul 3. Gerçek ve şaşırtıcı; ama B1 zaten öğrencinin kendi hayatından bir durumla (nöbet listesi) kurulu, fikir aynı. **Sınırda aday.** |
| "Yirmi soruda bir milyon." Her soru seçenekleri yarıya indirirse 20 soru 2²⁰ = 1 048 576 seçeneği ayırır. | B7 | Koşul 3. Ders oyunun kendisiyle kurulu. Ayrıca `PLAN.md` en az soru sayısının genellenmesini ders dışı bırakıyor. |
| "Renk ayarı neden 255'te bitiyor?" Sekiz basamağın hepsi 1 olunca 255 eder. | C2 | Aynı konuda ikinci hikâye olurdu; karekod daha yaygın. Renk seçiciyi her öğrenci kullanmıyor (koşul 2 daha zayıf). Hakem C3 yerine C2'yi yeğlerse yedek adaydır; kapanış cümlesine ("İkiye böl, kalanları ters sırayla yaz") tam oturur: 255'i ikiye böle böle sekiz kez 1 kalır. |
| Lig fikstürü: dört takımlı grupta 3 + 2 + 1 = 6 maç. | E1 | Koşul 3. Tokalaşma probleminin aynısı, yalnızca adı değişik. |

## 7. Hakem incelemesi (7 Ekim 2026)

Bağımsız hakem raporu: `../HIKAYE-HAKEM.md`. Puanlar 0–10 (9–10: 1. ünitenin en güçlü hikâyeleri düzeyi; 7–8: küçük düzeltmeyle üretilir; 5–6: ciddi zaaf). Hakemin istediği düzeltmeler bu dosyaya işlendi; puanlar düzeltmeden önceki taslağa aittir.

| Hikâye | Müfredat | Katkı | Toplam | Karar |
|---|---|---|---|---|
| C3 Karekodun içinde ne yazıyor? | 8 | 9 | 17 | Düzeltilerek kalsın |
| D1 Metro haritası neyi atar? | 8 | 8 | 16 | Düzeltilerek kalsın |
| F2 Parola ekranı | 8 | 7 | 15 | A1'in yerine eklendi (aday olarak puanlandı) |
| A1 Geçersiz numara | 6 | 6 | 12 | **Çıktı** |

| Değişiklik | Gerekçe |
|---|---|
| A1 "Geçersiz numara" çıktı; bölüm 6'ya taşındı | Üçüncü koşuldan kaldı: A1 ünitenin en kolay dersi; derste olmayan bir kural öğretiyordu. |
| F2 "Parola ekranı" eklendi | Elenme gerekçesi (A1 ile aynı tür nesne) A1 çıkınca düştü. Program MAT.9.5.2'de niceleyicileri "gerçek yaşam durumlarında" açıkça istiyor ve bu çıktının hiç hikâyesi yoktu. |
| C3: "öbür kareler" yerine "geri kalan karelerin çoğu"; "özünde" eklendi; "sekizer sekizer" yerine "öbek öbek" | 441 karenin 208'i veri taşır; maske yüzünden kareler doğrudan harfi vermez; sekizli gruplama derste yok. |
| C3: kod menü adresi değil, panodaki kısa düz yazı | 21 × 21 kod en çok 17 karakter alır; menü adresi sığmaz. |
| D1: Harry Beck ve 1931 anlatımdan çıktı; sahne öğrencinin kendi şehri | Derste zaten Euler var; ikinci ad ve tarih tek fikre hizmet etmiyor. |
| D1: "uzaklığı atar" yerine "çizginin boyu bir şey söylemez" | D2 yol ağında uzaklıkları çizgilerin üstüne yazıyor; eski cümle onunla sürtüşüyordu. |

Yedek adaylar (hakem doğru elendi dedi): C2 "Renk ayarı neden 255'te bitiyor?" (8 / 6) ve B1 "Doğum günü bir gün kayar" (7 / 6; ek kusur: artık yıllarda iki gün kayar, "her tarih bir gün kayar" yanlış olurdu).
