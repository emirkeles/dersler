# D raporu — 7 Ekim 2026

6 kısa ders, 21 özgün sahne, her derste 2 çıkış sorusu. Kimlikler yasam-d1…d6; renk KIT.renkler.D. Ortak dosyalar, kit, tema listesi ve PLAN değiştirilmedi. Ek kit aracı gerekmedi. İlk sorudan önce her derste 3 bağlam altyazısı; öğrenciye açık kitap gerektiren anlatım ve sayfa etiketleri yoktur. Görseller hazır gerçek kitap kırpımlarıdır. SVG modeller temsili olarak belirtilir.

## Ana oturumun tema.js içine ekleyeceği satırlar

```js
['d1-gozlem-duzeni.html','İki canlı, üç gün: gözlem düzeni','İki canlıyı üç gün gözlerken deftere ne yazarsın?',4],
['d2-beslenme-buyume.html','Özellik ortak, yolu farklı','Hayvan besin alıyor; bitkinin kaydı nasıl değerlendirilir?',4],
['d3-tepki-ureme-uyum.html','Tepki ve kalıtsal uyum','Işığa yönelme, kalıtsal uyumun tek başına kanıtı mı?',4],
['d4-hucre-organizasyon.html','Hücre ve organizasyon','Bir yaprak fotoğrafı hücreyi göstermek için yeterli mi?',3],
['d5-metabolizma-enerji.html','Metabolizma ve iç denge','Terleme kaydı iç dengeyle nasıl ilişkilendirilir?',3],
['d6-virus-siniri.html','Virüs ve canlılık sınırı','Virüsü bir hücreyle aynı biçimde değerlendirebilir miyiz?',3]
```

## Anlatım, gerekçe ve kaynak

| Ders | Anlatım ve etkileşim | Gerekçe | İçerik kaynağı |
|---|---|---|---|
| D1 | Canlı fotoğrafları → boş üç günlük plan → örnek kayıt → gözlenememe; kayıt/yorum seçimi | Gerçek gözlem yerine hazır sonuç sunmaz; gözlenmedi/yok ayrımını öğretir. | s.33,40–41 |
| D2 | Üretici/tüketici fotoğraf karşılaştırması, öglena iki yol şeması, atık ve büyüme/gelişme sınıflandırması | Ortak özellik ön bilgisini farklı yolların kanıtlarına uygular; boşaltım atlanmaz. | s.35,37,40 |
| D3 | Işığa yönelen temsili bitki, iki üreme yolu, kelebek desenleri ve ördek ayağı | Anlık tepkiyi kalıtsal uyumdan, farkı genetik neden iddiasından ayırır. | s.37–39 |
| D4 | Fotoğraf→inceleme aracı, çekirdek var/yok, hücresel organizasyon | Prokaryot/ökaryot yalnız çekirdek düzeyinde; organel öğretimi yok. | s.34–35,41 |
| D5 | Yapım/yıkım, besin→ATP→kas, terleme→iç denge; nitel ilişki seçimi | Metabolizma iki yönüyle kullanılır; kaynaksız sıcaklık veya ölçüm sonucu üretilmez. | s.36–39 |
| D6 | Hücre karşılaştırması, ölçekli olmayan boyut şeritleri, iki sınıf arasında virüs | s.41 biyolojik bilgisiyle sınıflandırma sınırını öğretir; kaynak denetimi dersine dönüşmez. | s.34,41–42; s.88 yalnız kapsam kontrolü |

Fotoğraflar: D1/D2/D4 menekşe ve tavşan s.33; D3 kelebekler ve ördek s.39. Fotoğraf tek başına davranışın, genetik nedenin veya kalıtsallığın kanıtı olarak sunulmaz.

## Müfredat ve sahne eşlemesi

| İstek | Sahne | Karşılanma |
|---|---|---|
| BİY.9.1.4 a, ortak özellik gözleminden tanımlama | D2.1–4, D3.1–4 | ders; gözlem örnekleri üzerinde sınıflandırma |
| BİY.9.1.4 b, canlı seçimi/düzenli kayıt | D1.1–4 | benzetim; gerçek üç günlük gözlem site dışı |
| Benzerlik/farklılık keşfi | D2.1–4, D3.3–4 | ders |
| Doğrudan gözlenemeyen özellikler için tahmin/doğrulama | D1.4, D4.1–3, D5.1–3 | hazır bilgi üzerinde benzetim; bağımsız araştırma site dışı |
| Hücresel yapı, prokaryot/ökaryot, organizasyon | D4.1–3 | ders; yalnız çekirdek ayrımı |
| Beslenme çeşitleri, boşaltım, büyüme/gelişme | D2.1–4 | ders |
| Uyarılara tepki, üreme, varyasyon/adaptasyon | D3.1–4 | ders |
| Metabolizma, enerji üretimi/tüketimi, homeostazi | D5.1–3 | ders |
| BİY.9.1.4 c, virüs sınıflandırma nedenleri | D6.1–3 | kısmî ders: hücre tanımı/boyut/sınıflandırma sınırı |
| Virüs yapısı ve çoğalma mekanizmasının genel tespiti | D6.3 kapsam notu | kaynak doğrulaması bekliyor; öğretilmiş sayılmaz |
| Sınıf tartışması, gözlem raporu ve zihin haritası | D1.4 / D6 konu notu | site dışı |

## Ölçüm ve görsel kanıt

Her ders sırayla `node araclar/olc.js biyoloji/yasam/dN --goruntu /tmp/yasam-olc/dN` ile ölçüldü. Sandbox Chrome açılışını engelledi; onaylı require_escalated ile çalıştırıldı. 1366×657, tahta 820×461. Tüm yerleşim sayaçları, altyazı/tahta/punto bütçesi sayaçları **0**; konsol temiz, tamamlanamayan sahne yok. D1 kaynak etiketleri kaldırıldıktan sonra; D3 bitki yaprağının dala bağlı görünümü düzeltildikten sonra yeniden ölçüldü.

| Ders | Sahne | Altyazı | Kelime | Son görüntülerin incelemesi |
|---|---:|---:|---:|---|
| D1 | 4 | 29 | 210 | s01–s04-son: canlı fotoğrafları, boş plan, örnek kayıt, gözlenmedi/yok ayrımı okunur. |
| D2 | 4 | 29 | 208 | s01–s04-son: iki beslenme yolu, öglena, yaprak/terleme, büyüme/gelişme okunur. |
| D3 | 4 | 28 | 206 | s01–s04-son: yönelme, üreme şeması, desenler, perdeli ayak; kırpımlar ve etiketler açık. |
| D4 | 3 | 24 | 168 | s01–s03-son: araç, çekirdek, tek/çok hücreli organizasyon okunur. |
| D5 | 3 | 27 | 192 | s01–s03-son: yapım/yıkım, ATP bağlantısı, etki/iç denge okunur. |
| D6 | 3 | 24 | 178 | s01–s03-son: hücre tanımı, boyut yeterli değil, canlı/cansız arasında karşılaştırma okunur. |

JSON kanıtı `/tmp/yasam-olc/dN/olcum.json`; PNG kanıtı aynı dizinde. Tema listesini ve tema çapında denetimi ana oturum yapacak. D6 sonraki bağlantısı `e1-inorganik-ozellikler.html` olarak kararlaştırıldı.

## Doğrulanamayanlar ve sınırlar

- D1 örnek cümleler benzetimdir; gerçek üç günlük olay/ölçüm serisi yoktur. Öğrencinin üç günlük gözlemi, bağımsız araştırması ve raporu tamamlanmış sayılmaz.
- D3 tek fotoğraf genetik kökeni veya kalıtsallığı doğrulamaz; varyasyonun nedenleri ek bilgi gerektirir.
- D6 yapı/çoğalma EBA videosu s.42'deki karekoddan giriş ekranına yönlendi; içeriği doğrulanamadı. Kapsit, genetik yapı ve çoğalma aşamaları yazılmadı. Beslenme/enerji/metabolizma gibi virüs özellikleri için ayrıntılı sonuç listesi doldurulmadı. BİY.9.1.4 c ve uygulama c **tam karşılanmış değildir**. Derste son sahnede açık kısa kapsam notu var.
- Virüs kaynak sınırı: `https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=cea5d7aa622370b61fa89ad5d43f3166&resourceType=1&resourceLocation=2`. s.88 soru metni virüsün bütün yapı ve çoğalma ayrıntılarını vermez.
- Hastalık ve bakteriyofaj fırsatı programda anıldığı kadar iki kısa altyazıyla eklendi; hastalık adı, tedavi yöntemi ve ayrıntısı yok. Resim üretimi, seslendirme, yayın, commit/push yapılmadı.
