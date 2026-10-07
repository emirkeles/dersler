# G konusu çalışma raporu

Tarih: 7 Ekim 2026. Kapsam: BİY.9.1.7 a–b, G1–G3. Kaynak: MEB Biyoloji 9 2026 s.74–78; `/tmp/yasam-kitap/p074.txt`–`p078.txt` okundu. Kaynak alınma: 7 Ekim 2026. Öğrenci metni bağımsız kurstur; kitap sayfası/kartı araması gerekmez. Sayfa numarası öğrenciye görünmez.

## Tema.js satırları — ana oturum ekleyecek

```js
['g1-ayrac-ve-renk.html', 'Ayraç: görünmeyeni renkle gösterir', 'Bir renk değişimi, besinin içeriği hakkında ne söyler?', 4],
['g2-deneyi-tasarla.html', 'Deneyi tasarla: hangi besin, hangi ayraç', 'Bir besinde nişasta ararken deneyi nasıl planlarsın?', 4],
['g3-sonucu-analiz-et.html', 'Deneyi yap, sonucu analiz et', 'Sonuç beklenmedikse önce neyi kontrol edersin?', 4],
```

Bağlantı zinciri G1→G2→G3→`h1-deneyi-tasarla.html`; F12 için G1 adı ana oturuma ve F ajanına bildirildi.

## Program–sahne eşlemesi

| İstek | Yer | Karşılama |
|---|---|---|
| Ayraçların tanıtılması; nitel gözlem | G1 s1–4 | ders/benzetim: hedef içeren modelde ayraç seçme, renk tepkimesi |
| Besin etiketi + test ilişkisi | G1 s1 | ders |
| BİY.9.1.7 a: besin/ayraç/gözlem seçerek deney tasarlama | G2 s1–4 | benzetim: seçilen besin, hedef, ayraç, renk gözlem planı |
| Programdaki besin örnekleri | G2 s1,4 | ders/benzetim: programın saydığı on bir besin, örnek seçimi |
| BİY.9.1.7 b: ayraç kullanma ve analiz | G3 s1–2 | model benzetimi: hedefi bilinen örneklerin nitel tepkime ve kayıtları |
| Deneysel/yöntem hatasında tekrar | G3 s3–4 | benzetim: yanlış hedef–ayraç eşleşmesini düzeltme, yeniden uygulama |
| Gerçek besin deneyi; ekip çalışması, rapor, sunu, dijital paylaşım | G3 s4 / sınıf | site dışı; hazır model gerçek laboratuvarı tamamlamaz |

## Kaynaklanan bütün içerik

| Yer | Kitap sayfası | İçerik |
|---|---|---|
| G1 s1 | 74 | Ayraç hedef molekülle etkileşip renk değiştirir; besin etiketi ile basit testin ilişkisi |
| G1 s2–4, G2 s2–4, G3 s1–3 | 75 | Lugol–nişasta–mavi-mor; Benedict–glikoz/fruktoz–kiremit kırmızısı; Biüret–protein–açık mavi veya mor; Sudan III/IV–yağ–kırmızı veya turuncu |
| G1 s1–4, G2 s3, G3 s1–2 | 75–77 + program | Nitel tayin; renk bulgusu varlık için yorumlanır, gram miktarı verilmez |
| G2 s1,4 | 76 + BİY.9.1.7 uygulama a | Ekmek, patates, süt, meyve, yumurta, peynir, nohut, mercimek, zeytinyağı, fındık, fıstık: program örneklerinin tamamı; bir besin birden fazla grupta olabilir |
| G2 s1–4 | 76 | Besin, ayraç ve deney planı önceden seçilir; tahmin sonucuyla gerçek ölçüm ayrılır |
| G3 s1–2,4 | 77 | Kayıt alanları: besin/örnek, ayraç, gözlem-renk, sonuç; gerçek besin tablosunun boş olması |
| G3 s3–4 | 77 + BİY.9.1.7 uygulama b | Sonuç alınamıyorsa yöntemi/ayracı kontrol edip tekrar; ekipler arası farklı bulguların olası nedenleri |
| G3 s4 | 77 | Gerçek uygulama, öğretmen/laboratuvar rehberliği, rapor/sunu/dijital paylaşım |

S.75 tablosunda başka ayraçlar da var; dört ayraç ailesi yeterlidir ve bütün tablo zorunlu ezber sayılmadı. Lugol’ün nişasta eşleşmesi bütün karbohidratlara genellenmedi. “Lipit” bilimsel grup, s.75 renk tablosundaki hedef “yağ” olarak gösterildi. Açık mavi/mor ve kırmızı/turuncu alternatifleri korunur; tek renk zorunlu sonuç iddiası yok.

## Anlatım seçimi — PLAN bölüm 10’a eklenecek

| Ders | Anlatım | Gerekçe | Kaynak |
|---|---|---|---|
| G1 | Damla→model tüp→renk animasyonu; hedef–ayraç seçimi | Nitel tepkime görülebilir olur; gerçek besin sonucu uydurulmaz. | s.74–75 |
| G2 | Besin seçimi kaydırıcısı ve besin→hedef→ayraç planı; ayrı pozitif model | Öğrenci deney tasarlar, hedef seçimi ayracı gerekçelendirir; planın tahmin olduğu korunur. | s.75–76 |
| G3 | Model sonucu kaydı, nitel tablo, yanlış ayraçtan düzeltip tekrar yolu | Sonuç analizi ile yöntem hatası ayrılır; model sonucu gerçek ölçüme taşınmaz. | s.75–77 |

## Ölçüm ve görsel doğrulama

G1: `node araclar/olc.js biyoloji/yasam/g1 --goruntu /tmp/yasam-olc/g1` tamamlandı. 4 özgün sahne, 22 altyazı, 163 kelime; en uzun altyazı 10 kelime, tahta en çok 12 kelime; en küçük punto 20,5 px. Bütün yerleşim/bütçe sayaçları 0, konsol temiz, tamamlanamayan sahne yok. `s01-son.png`–`s06-son.png` açılıp incelendi.

G2: `node araclar/olc.js biyoloji/yasam/g2 --goruntu /tmp/yasam-olc/g2` tamamlandı. 4 özgün sahne, 13 altyazı, 100 kelime; en uzun altyazı 9 kelime, tahta en çok 13 kelime; en küçük punto 22,1 px. Bütün yerleşim/bütçe sayaçları 0, konsol temiz, tamamlanamayan sahne yok.

G3: `node araclar/olc.js biyoloji/yasam/g3 --goruntu /tmp/yasam-olc/g3` tamamlandı. 4 özgün sahne, 14 altyazı, 113 kelime; en uzun altyazı 10 kelime, tahta en çok 24 kelime; en küçük punto 20,5 px. Bütün yerleşim/bütçe sayaçları 0, konsol temiz, tamamlanamayan sahne yok.

Her dersin `s01-son.png`–`s04-son.png` özgün sahne, `s05-son.png` çıkış, `s06-son.png` özet görüntüleri açılıp incelendi: toplam 18 son görüntü. Tüpler, damla sonrası renk, renk alternatifleri, plan okları ve sonuç tablosu görünür; kırpılma/çakışma yok. Görüntüler ve olcum.json `/tmp/yasam-olc/g1/`, `/tmp/yasam-olc/g2/`, `/tmp/yasam-olc/g3/` içindedir. Üç dosyada `node --check` geçti.

Başsız Chrome ölçümü, sandbox izin sınırı nedeniyle ana oturumun yetkilendirdiği yükseltilmiş `node araclar/olc.js` komutuyla yapıldı. Her derste dört özgün sahne, iki çıkış sorusu, bir defter kuralı vardır. İlk 2–3 bilgilendirme altyazısı ilk sorunun önündedir. İlk ölçümler üç derste de temiz çıktı.

`h1-deneyi-tasarla.html` hedefinin oluştuğu dosya listesiyle doğrulandı. Tema kayıt/kimlik/sahne sayısı denetimi bütün tema tamamlandığında ana oturum tarafından yapılacaktır.

## Doğrulanamayanlar ve sınırlar

S.76 tahmin tablosu ve s.77 gerçek besin sonuç tablosu boş; gerçek besinlere pozitif/negatif tepkime atanmadı. Model örneğin hedef molekülü içerdiği açık koşuldur; model sonucu gerçek ölçüm diye sunulmaz. Ön-tepkime nötr sıvı rengi şematiktir ve ayracın gerçek başlangıç rengi olarak adlandırılmaz. Renk miktar/tüm içerik göstermez. Gerçek deney, sınıf raporu ve dijital paylaşım site dışında kalır. Kimyasal hazırlama oranı, ısıtma süresi veya ölçülmemiş miktar eklenmedi. S.74 karekod animasyonu bu dersler için gerekli değildir; yazılı s.75 tablo doğrudan yeterlidir.

Son kapsam düzeltmesi: G2 besin seçimi programda adıyla geçen 11 örneğin tamamını içerir; yalnız ad olarak eklenen besinler için ölçüm sonucu veya besin içeriği ataması yoktur. Ana oturum G2 son ölçümünü yineler.
