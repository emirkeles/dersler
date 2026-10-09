/* F3 — Konu tekrarı: Hareket türleri
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, ok, belir } = window.KIT;
  const renk = '#c792ff';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    /* Başlıklı kart: çerçeve, renkli başlık ve ortalı satırlar. */
    const kart = (g, x, y, w, h, baslik, satirlar, o = {}) => {
      kutu(c, g, x, y, w, h, { renk: o.renk });
      yazi(c, g, x + w / 2, y + 52, baslik, { size: o.size || 30, kalin: 700, renk: o.renk });
      satirlar.forEach((m, i) => yazi(c, g, x + w / 2, y + 118 + i * 52, m, { size: o.size || 30 }));
    };
    /* Soru ve cevap tek yazı öğesidir: cevap parçaları [metin, renk] çiftleridir. */
    const satir = (g, y, soru, parcalar) => {
      const t = c.S('text', { x: 250, y, 'text-anchor': 'start', 'font-size': 34, 'font-weight': 600, style: 'fill:' + RENK.yazi }, g);
      c.S('tspan', { text: soru }, t);
      parcalar.forEach(([m, r], i) => c.S('tspan', Object.assign(i ? {} : { x: 580 }, { style: 'fill:' + (r || RENK.yazi), text: m }), t));
    };

    // Öteleme
    const g1 = yeni();
    yazi(c, g1, 500, 85, 'Öteleme', { size: 40, kalin: 700, renk: RENK.a });
    kutu(c, g1, 350, 140, 300, 200, { renk: RENK.a });
    [190, 240, 290].forEach((y) => ok(c, g1, 400, y, 600, y, { renk: RENK.a }));
    yazi(c, g1, 500, 405, 'bütün parçalar birlikte, aynı yönde', { size: 34 });
    yazi(c, g1, 500, 465, 'yer değiştirmeleri eşit', { size: 32, renk: RENK.soluk });
    await goster(g1, 'Öteleme: cismin bütün parçaları birlikte ve aynı yönde ilerler.');
    await c.say('Ötelemede bütün parçalar eşit yer değiştirme yapar.');
    await c.say('İstasyondan kalkan trenin bütün parçaları aynı yönde ilerler.');
    c.note('<b>Öteleme:</b> bütün parçalar birlikte, aynı yönde hareket eder; yer değiştirmeleri eşittir.<br>Örnek: istasyondan kalkan tren.', 'Öteleme', 'kuvvet-oteleme');
    await sil(g1);

    // Dönme
    const g2 = yeni();
    yazi(c, g2, 500, 85, 'Dönme', { size: 40, kalin: 700, renk: RENK.b });
    daire(c, g2, 500, 250, 100, { renk: RENK.b, kalin: 4 });
    cizgi(c, g2, 500, 250, 570.7, 179.3, { renk: RENK.b, kesik: true });
    daire(c, g2, 500, 250, 7, { renk: RENK.b, fill: RENK.b });
    daire(c, g2, 570.7, 179.3, 10, { renk: RENK.b, fill: RENK.b });
    yazi(c, g2, 500, 420, 'bir eksenin çevresinde çember çizer', { size: 34 });
    yazi(c, g2, 500, 480, 'eksene uzaklık değişmez', { size: 32, renk: RENK.soluk });
    await goster(g2, 'Dönmede parçalar, bir eksene uzaklıkları değişmeden çember çizer.');
    await c.say('Bilgisayar fanında bu eksen, pervanenin merkezinden geçen mildir.');
    c.note('<b>Dönme:</b> parçalar bir eksene uzaklıkları değişmeden çember çizer.<br>Örnek: fanın pervanesi.', 'Dönme', 'kuvvet-donme');
    await sil(g2);

    // Titreşim
    const g3 = yeni();
    yazi(c, g3, 500, 85, 'Titreşim', { size: 40, kalin: 700, renk: RENK.r });
    cizgi(c, g3, 300, 250, 700, 250, { renk: RENK.soluk, kesik: true });
    yol(c, g3, 'M 300 250 Q 500 150 700 250', { renk: RENK.r, kalin: 4 });
    yol(c, g3, 'M 300 250 Q 500 350 700 250', { renk: RENK.r, kalin: 4 });
    yazi(c, g3, 730, 260, 'denge konumu', { size: 28, hiza: 'start', renk: RENK.soluk });
    yazi(c, g3, 500, 420, 'bir denge konumundan geçerek', { size: 34 });
    yazi(c, g3, 500, 480, 'gidip gelir', { size: 34 });
    await goster(g3, 'Titreşimde cisim, bir denge konumundan geçerek gidip gelir.');
    await c.say('Telin vurulmadan önceki düz hâli, denge konumudur.');
    c.note('<b>Titreşim:</b> cisim bir denge konumundan geçerek gidip gelir.<br>Örnek: vurulan gitar teli.', 'Titreşim', 'kuvvet-titresim');
    await sil(g3);

    // Yer değiştirmek ve tekrar etmek yetmez
    const g4 = yeni();
    yazi(c, g4, 500, 85, 'Tek başına yetmez', { size: 38, kalin: 700, renk });
    kart(g4, 60, 150, 420, 170, 'Yer değiştirmek', ['öteleme demek değil'], { size: 32 });
    kart(g4, 520, 150, 420, 170, 'Tekrar etmek', ['titreşim demek değil'], { size: 32 });
    yazi(c, g4, 500, 430, 'Parçaların nasıl hareket ettiğine bak', { size: 32, renk: RENK.soluk });
    await goster(g4, 'Yer değiştirmek tek başına türü söylemez.');
    await c.say('Dönen cismin parçaları yer değiştirse de cisim öteleme yapmış olmaz.');
    await c.say('“Tekrar eder” demek de yetmez; dönme de tekrar eder.');
    c.note('<b>Yer değiştirmek, tek başına türü söylemez.</b><br>Dönme dolabın kabinleri yer değiştirir ama dolap ötelenmez; dönme de tekrar eder.', 'Tek başına yetmez', 'kuvvet-yetmez');
    await sil(g4);

    // Birden fazla tür
    const g5 = yeni();
    yazi(c, g5, 500, 85, 'Aynı anda birden fazla tür', { size: 38, kalin: 700, renk });
    [['öteleme', RENK.a, 'dönme', RENK.b], ['öteleme', RENK.a, 'titreşim', RENK.r], ['dönme', RENK.b, 'titreşim', RENK.r]].forEach(([s, rs, d, rd], i) => {
      const y = 200 + i * 80;
      yazi(c, g5, 450, y, s, { size: 40, kalin: 700, renk: rs, hiza: 'end' });
      yazi(c, g5, 500, y, '+', { size: 40, kalin: 700 });
      yazi(c, g5, 550, y, d, { size: 40, kalin: 700, renk: rd, hiza: 'start' });
    });
    yazi(c, g5, 500, 480, 'Dördüncü bir tür yok', { size: 34, renk: RENK.soluk });
    await goster(g5, 'Bir cisim aynı anda birden fazla hareket türünü yapabilir.');
    await c.say('Üç hareket türü, ikişer ikişer üç biçimde bir araya gelebilir.');
    await c.say('Yeni bir tür yoktur; türler yine öteleme, dönme ve titreşimdir.');
    c.note('<b>Bir cisim aynı anda birden fazla hareket türünü yapabilir.</b><br>Örnek: bisiklet tekerleği hem döner hem ilerler.', 'Birden fazla hareket', 'kuvvet-birlikte');
    await sil(g5);

    // Üç soru
    const g6 = yeni();
    yazi(c, g6, 500, 90, 'Hareketi üç soruyla ayır', { size: 38, kalin: 700, renk });
    satir(g6, 210, 'Hangi parça?', [['tekerlek']]);
    satir(g6, 295, 'Neye göre?', [['yola göre']]);
    satir(g6, 380, 'Nasıl?', [['dönme', RENK.b], [' ve ', RENK.yazi], ['öteleme', RENK.a]]);
    yazi(c, g6, 500, 490, 'Tür, referans noktasına göre belirlenir', { size: 30, renk: RENK.soluk });
    await goster(g6, 'Bir hareketin türünü üç soruyla belirleriz: hangi parça, neye göre, nasıl?');
    await c.say('Tekerlekler yola göre hem dönüyor hem ilerliyor.');
    await c.say('Hareketin türü, seçilen referans noktasına göre belirlenir.');
    c.note('<b>Türü söylerken üç soru sorulur: hangi parça, neye göre, nasıl?</b><br>Hareketin türü referans noktasına göre belirlenir.', 'Üç soru', 'kuvvet-uc-soru');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-f3', kicker: 'Konu F · Hareket türleri', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Hareket türleri',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Masanın kenarından sarkıtılan plastik cetvelin ucu aşağı çekilip bırakılınca, cetvelin düz hâlinin altına ve üstüne gidip geliyor. Cetvelin ucu hangi hareketi yapar?',
        options: ['Dönme; ucu masaya sabit olduğu için bir eksen çevresinde döner', 'Titreşim; ucu denge konumundan geçip iki yana gidip gelir', 'Öteleme; ucu bir yerden başka bir yere doğru ilerler'], answer: 1,
        why: ['Sabit bir ucun olması yetmez; dönen cisim çember çizer. Cetvelin ucu çemberi tamamlamadan geri döner.', 'Evet. Cetvelin ucu denge konumundan geçip geri döner; bu titreşimdir.', 'Cetvelin ucu bir yere gitmiyor; aynı yolda gidip geliyor.'], scene: 0,
      },
      {
        q: 'Yolda ilerleyen bir kamyonun kasasındaki gevşek bir levha, sürekli aşağı yukarı gidip geliyor. Levha yola göre hangi hareketleri yapar?',
        options: ['Yalnızca titreşim; levha bir yere ilerlemez', 'Dönme ve öteleme; levha kamyonla birlikte ilerler', 'Öteleme ve titreşim; levha ilerlerken gidip gelir'], answer: 2,
        why: ['Levha yola göre kamyonla birlikte ilerliyor; titreşim tek başına değil.', 'Levha çember çizmiyor; denge konumundan geçip geri dönüyor. Bu dönme değil, titreşimdir.', 'Evet. Levha kamyonla birlikte ilerlerken denge konumunun iki yanına gidip gelir; iki tür birlikte.'], scene: 0,
      },
      {
        q: 'Hoparlörün zarı, ses çıkarırken durma konumunun iki yanına çok kısa gidip geliyor. Kerem: “Zar sürekli aynı yolu tekrar ediyor. Tekrar eden her hareket dönmedir; o hâlde zar dönüyor.” Doğru karşılık hangisidir?',
        options: ['Haksız; zar denge konumundan geçip geri dönüyor, bu titreşimdir', 'Haksız; zar yer değiştirdiğine göre öteleme yapıyordur', 'Haklı; zar tekrar ettiği için bir eksen çevresinde dönüyordur'], answer: 0,
        why: ['Evet. Dönme de titreşim de tekrar eder; ayıran, zarın denge konumundan geçip geri dönmesidir.', 'Zar bir yere ilerlemiyor; aynı yolda gidip geliyor. Parçaları hep aynı yöne gitmiyor.', 'Tekrar etmek yetmez. Dönen cisim çember çizer; zar çember çizmeden geri dönüyor.'], scene: 0,
      },
      {
        q: 'Limandan kalkıp doğrultusunu bozmadan giden bir vapurun pervanesi, vapura bağlı bir milin çevresinde dönüyor. Vapura göre pervane hangi hareketi yapar?',
        options: ['Dönme ve öteleme; pervane vapurla birlikte de ilerler', 'Yalnızca dönme; vapura göre pervanenin mili yerinde durur', 'Yalnızca öteleme; pervane vapurla birlikte gider'], answer: 1,
        why: ['Mil limana göre ilerler; ama bakış vapura göre. Hareketin türü seçilen referans noktasına göre belirlenir.', 'Evet. Vapura göre mil yerinde durur; geriye yalnızca dönme kalır.', 'Vapura göre pervane ilerlemiyor; mil yerinde duruyor, kanatlar milin çevresinde dolanıyor.'], scene: 0,
      },
      {
        q: 'Eğimli bir yokuştan aşağı yuvarlanan boş bir varil yere göre hangi hareketleri yapar?',
        options: ['Yalnızca öteleme; varil yokuş boyunca aşağı ilerliyor', 'Önce dönme, sonra öteleme; hareketler sırayla yapılıyor', 'Dönme ve öteleme; varil ilerlerken aynı anda dönüyor'], answer: 2,
        why: ['Varil yalnızca ilerlemiyor; yuvarlanırken ekseni çevresinde de dönüyor.', 'İki hareket sırayla değil, aynı anda yapılır.', 'Evet. Varil yokuş boyunca ilerlerken ekseni çevresinde de dönüyor; iki bildik tür birlikte.'], scene: 0,
      },
      {
        q: 'Bir işçi, sandığı eğimli bir rampadan dümdüz aşağı kaydırıyor. Sandık yere göre hangi hareketi yapar?',
        options: ['Öteleme; sandığın bütün parçaları birlikte, aynı yönde ilerler', 'Dönme; sandık eğimli yolda yer değiştirdiği için döner', 'Öteleme olmaz; öteleme yalnızca yatay bir yolda görülür'], answer: 0,
        why: ['Evet. Sandığın bütün parçaları aynı yönde ilerliyor; bu ötelemedir.', 'Yer değiştirmek tek başına dönme yapmaz; sandığın parçaları çember çizmiyor, aynı yönde ilerliyor.', 'Ötelemede yönün ne olduğu önemli değildir; aşağı doğru da olur.'], scene: 0,
      },
      {
        q: 'Arda: “Bir cismin hareket türü, kim neye göre bakarsa baksın aynıdır.” Doğru karşılık hangisidir?',
        options: ['Haklı; tür cismin kendisine bağlıdır, bakışa bağlı değildir', 'Haksız; tür yalnızca cismin ne kadar yer değiştirdiğine bağlıdır', 'Haksız; hareketin türü seçilen referans noktasına göre belirlenir'], answer: 2,
        why: ['Tür bakışa göre değişebilir: aynı cisim bir referans noktasına göre iki tür, ötekine göre tek tür yapabilir.', 'Yer değiştirmek tek başına türü söylemez; neye göre baktığın da belirleyicidir.', 'Evet. Referans noktası değişince cismin türü de değişebilir.'], scene: 0,
      },
      {
        q: 'Hangisinde cismin parçaları yer değiştirdiği hâlde cisim öteleme yapmaz?',
        options: ['Bant üzerinde düz ilerleyen koli', 'Çamaşır makinesinde yerinde dönen tambur', 'Buz üzerinde düz kayan kızak'], answer: 1,
        why: ['Kolinin bütün parçaları aynı yönde ilerliyor; bu ötelemedir.', 'Evet. Tamburun parçaları yer değiştirir ama aynı yönde değil, eksen çevresinde çember çizer.', 'Kızağın bütün parçaları aynı yönde ilerliyor; bu ötelemedir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Ötelenen ilerler, dönen bir eksen çevresinde döner, titreşen gidip gelir.</b>',
      'Yer değiştirmek ya da tekrar etmek <b>tek başına türü söylemez;</b> parçaların nasıl hareket ettiğine bakılır.',
      'Bir cisim aynı anda <b>birden fazla tür</b> yapabilir; yeni bir tür doğmaz. Türü söylerken: hangi parça, neye göre, nasıl?',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
