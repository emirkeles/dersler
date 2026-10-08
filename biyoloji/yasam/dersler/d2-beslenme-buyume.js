/* D2 · BİY.9.1.4 · Yazar notu: içerik MEB Biyoloji 9 s. 35 (beslenme, ototrof, heterotrof, öglena) ve s. 37 (boşaltım,
   büyüme ve gelişme). Anlatım 8 Ekim 2026'da yeniden düzenlendi (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden
   geçirilmesi"): bilgi sorudan önce verilir; öğrenciye "fotoğraf kanıtlamaz", "ölçüm verilmedi" gibi uyarılar söylenmez. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.D, IKINCI = 'var(--c2)';

  /* ---- Sahne 1 · Besin nereden gelir? ---- */
  async function beslen(c) {
    const s = c.svg(1000, 562);
    K.resim(c, s, 'menekse.webp', 70, 60, 350, 320); K.resim(c, s, 'tavsan.webp', 580, 60, 350, 320);
    K.yazi(c, s, 245, 430, 'Bitki'); K.yazi(c, s, 755, 430, 'Hayvan');
    await c.say('Canlılar yapılarını oluşturmak ve enerji elde etmek için beslenmek zorundadır.');
    await c.say('Ama her canlı aynı yolla beslenmez.');
    await K.belir(c, K.yazi(c, s, 245, 478, 'Üretici · ototrof', { size: 28, renk: R }), 350);
    await c.say('Bitkiler ihtiyaç duydukları besini kendileri üretir; bunlara üretici, yani ototrof denir.');
    await K.belir(c, K.yazi(c, s, 755, 478, 'Tüketici · heterotrof', { size: 28, renk: IKINCI }), 350);
    await c.say('Hayvanlar besinlerini dışarıdan hazır alır; bunlar tüketici, yani heterotroftur.');
    await c.choice({ tag: 'Uygula', q: 'Mantarlar besinlerini bulundukları ortamdan hazır alır. Mantarlar hangi gruptadır?',
      options: ['Üretici (ototrof)', 'Tüketici (heterotrof)', 'İkisi de değil'], answer: 1,
      hints: ['Üreticiler besinini kendisi üretir; mantar hazır alıyor.', '', 'Besinini hazır alan canlılar bir gruba giriyordu.'],
      right: 'Besinini dışarıdan hazır alan canlı tüketicidir.' });
    await c.say('Bitki de tavşan da beslenir; farklı olan, besini elde etme yoludur.');
    c.note('<b>Özellik ortak, yolu farklı.</b><br>Bitki besinini üretir, hayvan hazır alır.', 'Beslenme');
  }

  /* ---- Sahne 2 · Bir canlı, iki yol ---- */
  async function iki(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    c.S('ellipse', { cx: 250, cy: 250, rx: 80, ry: 135, fill: '#244d3e', stroke: R, 'stroke-width': 4 }, g);
    c.S('path', { d: 'M 290 125 Q 410 45 415 160', fill: 'none', stroke: R, 'stroke-width': 4 }, g);
    K.yazi(c, g, 250, 445, 'Öglena');
    await K.belir(c, g);
    await c.say('Bazı tek hücreli canlılar iki yolu da kullanabilir.');
    await K.belir(c, K.kart(c, s, 470, 90, 450, 150, 'Işık var', ['Fotosentezle besin üretir'], { renk: R }));
    await c.say('Öglena, ışık varken fotosentez yaparak kendi besinini üretir.');
    const bos = K.kart(c, s, 470, 280, 450, 150, 'Işık yok', ['?'], { renk: IKINCI });
    await K.belir(c, bos);
    await c.choice({ q: 'Işık olmadığında öglena ne yapar?',
      options: ['Beslenmeyi tamamen bırakır.', 'Yine fotosentez yapar.', 'Besinini dış ortamdan hazır alır.'], answer: 2,
      hints: ['Beslenme canlı için zorunludur; bırakılamaz.', 'Fotosentez için ışık gerekir.', ''],
      right: 'Öglena ikinci yolu kullanır: besinini hazır alır.' });
    bos.remove();
    K.kart(c, s, 470, 280, 450, 150, 'Işık yok', ['Besinini hazır alır'], { renk: IKINCI });
    await c.say('Işık yokken öglena besinini dış ortamdan hazır alır.');
    await c.say('Yani aynı canlı, koşula göre üretici de tüketici de olabilir.');
  }

  /* ---- Sahne 3 · Atıkların uzaklaştırılması ---- */
  async function atik(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.yazi(c, g, 500, 70, 'Boşaltım: atıkların uzaklaştırılması', { size: 30, renk: R }), 350);
    await c.say('Yaşamsal faaliyetler sonucunda canlıda atık maddeler oluşur.');
    await c.say('Bu atıkların vücuttan uzaklaştırılmasına boşaltım denir.', { speak: 'Bu atıkların vücuttan uzaklaştırılmasına [short pause] boşaltım denir.' });
    await c.say('Boşaltım, canlının iç dengesinin korunmasını sağlar.');
    const insan = K.kart(c, g, 90, 130, 380, 250, 'İnsan', ['Böbrek: idrar', 'Akciğer: CO₂, su buharı'], { renk: R });
    await K.belir(c, insan);
    await c.say('İnsanda böbrekler idrar oluşturur; akciğerler karbondioksit ve su buharı atar.');
    await K.belir(c, K.yazi(c, insan, 280, 308, 'Deri: ter', { size: 28 }), 350);
    await c.say('Terleme de su ve bazı atıkları uzaklaştırır.');
    const bitki = K.kart(c, g, 530, 130, 380, 250, 'Bitki', ['?'], { renk: IKINCI });
    await K.belir(c, bitki);
    await c.choice({ q: 'Bitkilerin böbreği ya da akciğeri yoktur. Hangisi bitkide boşaltım olabilir?',
      options: ['Yaprak dökümü', 'Çiçek açma', 'Kök salma'], answer: 0,
      hints: ['', 'Çiçek açmak bir atığı uzaklaştırmaz.', 'Kök salmak bir atığı uzaklaştırmaz.'],
      right: 'Dökülen yaprakla birlikte bazı atıklar da bitkiden uzaklaşır.' });
    bitki.remove();
    K.kart(c, g, 530, 130, 380, 250, 'Bitki', ['Terleme', 'Damlama', 'Yaprak dökümü'], { renk: IKINCI });
    await c.say('Bitkilerde boşaltım terleme, damlama ve yaprak dökümüyle gerçekleşir.');
    await K.belir(c, K.yazi(c, g, 500, 450, 'Tek hücreli: atık hücre zarından atılır', { size: 28 }), 350);
    await c.say('Tek hücreli canlılar atıklarını doğrudan hücre zarından atar.');
    c.note('<b>Boşaltım: atıkların canlıdan uzaklaştırılması.</b><br>İnsanda idrar ve ter, bitkide yaprak dökümü.', 'Boşaltım');
  }

  /* ---- Sahne 4 · Büyüme mi, gelişme mi? ---- */
  async function buyu(c) {
    const s = c.svg(1000, 562);
    await K.belir(c, K.kart(c, s, 80, 90, 380, 170, 'Büyüme', ['Hacim ve kütle artışı'], { renk: R }));
    await c.say('Büyüme, canlının hacminin ve kütlesinin artmasıdır.');
    await K.belir(c, K.kart(c, s, 540, 90, 380, 170, 'Gelişme', ['Görev yapma olgunluğu'], { renk: IKINCI }));
    await c.say('Gelişme, yapıların zamanla belirli bir görevi yapacak olgunluğa erişmesidir.');
    const bebek = K.yazi(c, s, 500, 340, 'Bebek: kilo alıyor · emeklemeye başlıyor', { size: 28 });
    await K.belir(c, bebek, 350);
    await c.choice({ tag: 'Uygula', q: 'Bir bebeğin kilo alması ve emeklemeye başlaması nasıl sınıflandırılır?',
      options: ['İkisi de büyüme', 'Kilo alma: gelişme; emekleme: büyüme', 'Kilo alma: büyüme; emekleme: gelişme'], answer: 2,
      hints: ['Emeklemek bir kütle artışı değildir.', 'Kilo almak kütlenin artmasıdır.', ''],
      right: 'Kütle artışı büyüme, yeni bir görevi yapabilmek gelişmedir.' });
    bebek.remove();
    K.yazi(c, s, 270, 320, 'Kilo alma', { size: 28, renk: R }); K.yazi(c, s, 730, 320, 'Emekleme', { size: 28, renk: IKINCI });
    await c.say('Kilo almak kütle artışıdır; emeklemek yeni bir görevi yapabilmektir.', { speak: '[thoughtful] Kilo almak kütle artışıdır; emeklemek yeni bir görevi yapabilmektir.' });
    await K.belir(c, K.yazi(c, s, 500, 420, 'Hayvan: büyüme sınırlı · Bitki: yaşam boyu', { size: 28 }), 350);
    await c.say('Hayvanlarda büyüme sınırlıdır; bitkiler yaşamları boyunca büyür.');
    await c.say('Beslenme, boşaltım, büyüme ve gelişme bütün canlılarda ortaktır; yolları farklıdır.',
      { speak: 'Beslenme, boşaltım, büyüme ve gelişme bütün canlılarda ortaktır; [short pause] yolları farklıdır.' });
  }

  Ders.start({
    id: 'yasam-d2', kicker: 'Konu D · Canlıların ortak özellikleri', title: 'Özellik ortak, yolu farklı', accent: R, back: 'index.html',
    intro: { title: 'Özellik ortak, yolu farklı', hook: 'Tavşan ot yer; peki bitki nasıl beslenir?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Besin nereden gelir?', goal: 'Üretici ile tüketiciyi ayır.', run: beslen },
      { title: 'Bir canlı, iki yol', goal: 'Öglenanın iki beslenme yolunu gör.', run: iki },
      { title: 'Atıkların uzaklaştırılması', goal: 'Boşaltımı farklı canlılarda tanı.', run: atik },
      { title: 'Büyüme mi, gelişme mi?', goal: 'İki değişimi ayır.', run: buyu },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Öglenanın beslenmesi nasıl açıklanır?', options: ['Yalnız tüketicidir.', 'Yalnız üreticidir.', 'Koşula göre üretici de tüketici de olabilir.'], answer: 2,
        why: ['Işık varken kendi besinini de üretir.', 'Işık yokken besinini hazır alır.', 'Işık varken üretir, ışık yokken hazır alır.'], scene: 1 },
      { q: 'Bebeğin emeklemeye başlaması neye örnektir?', options: ['Büyüme', 'Gelişme', 'Boşaltım'], answer: 1,
        why: ['Büyüme hacim ve kütle artışıdır.', 'Yeni bir görevi yapacak olgunluğa erişmektir.', 'Boşaltım atıkların uzaklaştırılmasıdır.'], scene: 3 },
      { q: 'Selin, “Bitki ağzıyla bir şey yemediği için beslenmez; beslenme yalnız hayvanlarda vardır.” diyor. Hangisi doğrudur?',
        options: ['Bitki de beslenir; ama besinini hazır almaz, kendisi üretir.', 'Selin haklı; besinini kendisi üreten canlı beslenmiş sayılmaz.', 'Selin haksız; bitki de hayvan gibi besinini dışarıdan hazır alır.'], answer: 0,
        why: ['Beslenme bütün canlılarda ortaktır; bitki besinini üretir, yani üreticidir.', 'Besinini kendisi üretmek de bir beslenme yoludur; bu canlıya üretici denir.', 'Besinini hazır alan hayvandır; bitki besinini kendisi üretir.'], scene: 0 },
      { q: 'Bir meşe fidanı beş yılda 20 cm’den 2 metreye çıktı. Bu değişim neye örnektir?',
        options: ['Gelişme', 'Boşaltım', 'Büyüme'], answer: 2,
        why: ['Gelişme, yapıların bir görevi yapacak olgunluğa erişmesidir; boy uzaması bir görev değildir.', 'Boşaltım atıkların uzaklaştırılmasıdır; boy uzamasıyla ilgisi yoktur.', 'Boyun ve kütlenin artması büyümedir; bitkiler yaşamları boyunca büyür.'], scene: 3 },
    ], summary: ['<b>Özellik ortak, yolu farklı.</b>', 'Beslenme, boşaltım, büyüme ve gelişme her canlıda vardır; biçimi değişir.'],
    nextLesson: { href: 'd3-tepki-ureme-uyum.html', label: 'Sonraki: Tepki ve kalıtsal uyum ›' },
  });
})();
