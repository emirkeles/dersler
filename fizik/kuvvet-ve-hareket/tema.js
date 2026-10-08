/* Kuvvet ve Hareket temasının kısa dersleri. Biçim: ortak/katalog.js başındaki açıklama.
   Her satır: [dosya, başlık, açılış sorusu, sahne sayısı]. Plan: plan/fizik/kuvvet-ve-hareket/PLAN.md. */
KATALOG.tema('fizik', 'kuvvet-ve-hareket', {
  tanitim: 'Nicelikler nasıl sınıflandırılır, vektörler nasıl toplanır, doğadaki temel kuvvetler nelerdir ve hareket hangi kavramlarla anlatılır?',
  konular: [
    { harf: 'A', ad: 'Temel ve türetilmiş nicelikler', renk: '#f5b04c', dersler: [
      ['a1-si-birimleri.html', 'Her niceliğin bir SI birimi var', 'Tarifte “bir bardak un” yazıyor; senin bardağınla tarifi yazanın bardağı aynı mı?', 6, 578],
      ['a2-temel-ve-turetilmis.html', 'Temel mi, türetilmiş mi?', 'Koşu bandının ekranında süre, yol ve sürat yazıyor; bu üçünden hangisi öbür ikisinden hesaplanmıştır?', 7, 782],
    ] },
    { harf: 'B', ad: 'Skaler ve vektörel nicelikler', renk: '#3ddc97', dersler: [
      ['b1-yon-isteyen-nicelikler.html', 'Bazı nicelikler yön ister', 'Kaybolan arkadaşına “okuldan 200 metre uzaktayım” yazdın; seni bulabilir mi?', 6, 594],
      ['b2-benzer-ve-ayri.html', 'Skaler ile vektörel: nerede benzer, nerede ayrı?', '“Rüzgârın sürati 8 m/s” ile “Rüzgâr kuzeydoğuya 8 m/s hızla esiyor” aynı bilgiyi mi verir?', 5, 532],
    ] },
    { harf: 'C', ad: 'Vektörler', renk: '#6ea8ff', dersler: [
      ['c1-vektor.html', 'Vektör: yönlü bir doğru parçası', 'Halat çekmede iki takım da aynı ip boyunca çekiyor; bu iki çekişi kâğıda nasıl çizersin?', 6, 660],
      ['c2-esit-ve-zit.html', 'Eşit vektör, zıt vektör', 'Yan yana iki yürüyen merdivenden biri yukarı, öbürü aşağı gidiyor; ikisi de saniyede yarım metre ilerliyor. Bu iki hızın nesi aynı, nesi farklı?', 6, 626],
      ['c3-sayiyla-carpma.html', 'Vektörü bir sayıyla çarpmak', 'Arabayı tek başına itiyordun; yanına aynı büyüklükte kuvvetle iten bir arkadaşın geldi. İtme okunu nasıl değiştirirsin?', 6, 629],
      ['c4-ayni-dogrultuda-bileske.html', 'Aynı doğrultuda iki vektör: bileşke', 'Halat çekmede iki takım da var gücüyle çekiyor ama ip kıpırdamıyor; kuvvetler nereye gitti?', 7, 711],
      ['c5-uc-uca-ekleme.html', 'Uç uca ekleme', 'Önce 3 kare doğuya, sonra 4 kare kuzeye yürüdün; başladığın yerden bakan biri seni hangi yönde görür?', 7, 596],
      ['c6-paralelkenar.html', 'Paralelkenar yöntemi', 'İki kişi bir sandığı iki ayrı iple, farklı yönlere çekiyor; sandık hangi yöne gider?', 6, 576],
      ['c7-bilesenlerine-ayirma.html', 'Bir vektörü bileşenlerine ayırmak', 'Satranç tahtasında fil çapraz gider; aynı kareye yalnızca yatay ve düşey adımlarla nasıl varırsın?', 6, 629],
      ['c8-bilesenlerle-toplama.html', 'Bileşenleri toplayarak bileşke', 'İki oku çizmeden, yalnızca “kaç sağ, kaç yukarı” bilgisiyle toplayabilir misin?', 6, 615],
      ['c9-yontem-degisir.html', 'Yöntem değişir, bileşke değişmez', 'İki arkadaş aynı iki oku farklı yöntemlerle topladı; sonuçları farklı çıkabilir mi?', 6, 649],
    ] },
    { harf: 'D', ad: 'Doğadaki temel kuvvetler', renk: '#ff8a5b', dersler: [
      ['d1-dort-temel-kuvvet.html', 'Kuvvet ve doğadaki dört temel kuvvet', 'Elinden bıraktığın anahtarı yere çeken ile buzdolabındaki mıknatısı kapıda tutan aynı kuvvet mi?', 7, 930],
      ['d2-benzer-ve-ayri-kuvvetler.html', 'Dört kuvvet: nerede benzer, nerede ayrı?', 'Dört temel kuvvetten hangilerinin etkisini gündelik hayatta doğrudan fark edersin?', 6, 724],
    ] },
    { harf: 'E', ad: 'Hareketin temel kavramları', renk: '#3cc8e8', dersler: [
      ['e1-referans-ve-konum.html', 'Nereye göre? Referans noktası ve konum', 'Otobüste oturuyorsun; yanındaki yolcuya göre mi hareket ediyorsun, duraktaki birine göre mi?', 6, 716],
      ['e2-yol-ve-yer-degistirme.html', 'Alınan yol ve yer değiştirme', 'Stadyumda tam bir tur koştun ve başladığın çizgide durdun; ne kadar yol aldın, yerin ne kadar değişti?', 7, 739],
      ['e3-surat.html', 'Sürat: ortalama ve anlık', 'Arabanın göstergesi şu an 90 gösteriyor, ama 90 kilometrelik yol iki saat sürdü; hangisi arabanın sürati?', 8, 729],
      ['e4-hiz.html', 'Hız: yönü olan sürat', 'Yüzücü havuzda gidip geldi ve başladığı duvara dokundu; sürati sıfır değildi, peki ortalama hızı?', 8, 839],
      ['e5-ivme.html', 'İvme: hız değişiyorsa', 'Otobüs kalkarken geriye, fren yapınca öne savruluyorsun; ikisinde ortak olan ne?', 6, 561],
      ['e6-dort-hesap.html', 'Bir yolculuk, dört hesap', 'İki arkadaş aynı yolculuk için biri “saniyede 3,5 metre”, öteki “saniyede 2,5 metre” diyor; ikisi de haklı olabilir mi?', 7, 838],
      ['e7-trafikte-hareket.html', 'Trafikte hareketin kavramları: sürat sınırı ve yeşil dalga', 'Bir caddede hiç kırmızıya yakalanmadan bütün ışıklardan geçmek şans mı, hesap mı?', 7, 780],
    ] },
    { harf: 'F', ad: 'Hareket türleri', renk: '#c792ff', dersler: [
      ['f1-oteleme-donme-titresim.html', 'Öteleme, dönme, titreşim', 'Asansör, dönme dolap ve gitar teli: üçü de hareket ediyor, ama aynı biçimde mi?', 7, 926],
      ['f2-birden-fazla-hareket.html', 'Aynı anda birden fazla hareket', 'Yolda giden bisikletin tekerleği dönüyor mu, ilerliyor mu?', 5, 635],
    ] },
  ],
});
