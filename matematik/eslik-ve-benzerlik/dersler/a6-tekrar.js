/* A6 — Konu tekrarı: Geometrik dönüşümler
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz karışık soru gelir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md (A6). */
(() => {
  'use strict';
  const { RENK, ara, ileri, yon, uz, rad, yansit, otele, dondur, yazi, cizgi, gizle, belir, par, cokgen, dogru, ok, dolasma, aciYayi, aciIci } = window.KIT;
  const { merkezNokta, donenCokgen, donuyor, yayIz, merkezAci } = window.KIT_A;

  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };
  const alt = (c, g, metin) => yazi(c, g, 500, 520, metin, { size: 30, kalin: 700 });
  const KESIK = { 'stroke-dasharray': '6 6' };

  /* ---- 2. Yansıma: şekil ters çevrilir; köşe ile görüntüsü doğruya eşit uzaklıkta ---- */
  async function yansima(c, g) {
    const T = [[250, 150], [330, 380], [430, 290]], U = [500, 70], V = [500, 450], T2 = T.map((q) => yansit(q, U, V));
    const d = dogru(c, g, U, V, { ad: 'd', adKay: [20, 26] });
    const mavi = cokgen(c, g, T, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const tur = cokgen(c, g, T2, RENK.goruntu, { harf: ['A′', 'B′', 'C′'] });
    const o1 = dolasma(c, g, T, RENK.sekil), o2 = dolasma(c, g, T2, RENK.goruntu);
    const seg = cizgi(c, g, T[0], T2[0], RENK.cizgi, 2.5, KESIK);
    const tik = [375, 625].map((x) => cizgi(c, g, [x, 140], [x, 160], RENK.yazi, 3));
    const cap = alt(c, g, 'Yansıma: ters çevirir');
    gizle(d.g, mavi.g, tur.g, o1, o2, seg, tik, cap);
    await belir(c, [d.g, mavi.g, cap], 450);
    await belir(c, tur.g, 500);
    await belir(c, [o1, o2], 400);
    await belir(c, [seg, ...tik], 450);
  }

  /* ---- 3. Öteleme: her nokta aynı yönde, aynı uzaklıkta ---- */
  async function oteleme(c, g) {
    const T = [[140, 170], [120, 360], [280, 290]], T2 = T.map((q) => otele(q, [420, 20]));
    const mavi = cokgen(c, g, T, RENK.sekil), tur = cokgen(c, g, T2, RENK.goruntu);
    const oklar = T.map((q, i) => ok(c, g, ara(q, T2[i], 0.03), ara(q, T2[i], 0.97)).g);
    const cap = alt(c, g, 'Öteleme: kaydırır');
    gizle(mavi.g, tur.g, oklar, cap);
    await belir(c, [mavi.g, cap], 450);
    await belir(c, oklar, 600);
    await belir(c, tur.g, 500);
  }

  /* ---- 4. Dönme: merkez çevresinde, bir açı kadar ---- */
  async function donme(c, g) {
    const O = [500, 280], T = [[330, 140], [430, 170], [380, 250]];
    const mavi = cokgen(c, g, T, RENK.sekil), tur = donenCokgen(c, g, O, T, RENK.goruntu);
    const aci = merkezAci(c, g, O, T[0], 0, { r: 34, etiketR: 66 }), iz = yayIz(c, g, O, T[0], { renk: RENK.cizgi });
    const m = merkezNokta(c, g, O, null), mAd = yazi(c, g, O[0], O[1] + 36, 'O', { size: 24, kalin: 700, renk: RENK.merkez }), cap = alt(c, g, 'Dönme: merkez, açı');
    gizle(mavi.g, tur.g, aci.g, iz.g, m.g, mAd, cap);
    await belir(c, [mavi.g, m.g, mAd, cap], 450);
    await belir(c, aci.g, 350);
    await belir(c, [tur.g, iz.g], 300);
    await donuyor(c, [tur, aci, iz], 0, 90, 1800);
  }

  /* ---- 5. Üç dönüşümde de görüntü şekle eştir ---- */
  async function esler(c, g) {
    const T = [[0, 0], [30, 90], [98, 60]], yer = (ox, oy) => T.map((p) => [p[0] + ox, p[1] + oy]);
    const bas = yazi(c, g, 500, 90, 'görüntü şekle eştir', { size: 36, kalin: 700, renk: RENK.iyi });
    // yansıma
    const g1 = c.S('g', {}, g), S1 = yer(60, 190), U = [190, 140], V = [190, 330];
    dogru(c, g1, U, V);
    cokgen(c, g1, S1, RENK.sekil); cokgen(c, g1, S1.map((q) => yansit(q, U, V)), RENK.goruntu);
    yazi(c, g1, 190, 420, 'yansıma', { size: 28, kalin: 700, renk: RENK.dogru });
    // öteleme
    const g2 = c.S('g', {}, g), S2 = yer(370, 190), I2 = S2.map((q) => otele(q, [150, 0]));
    cokgen(c, g2, S2, RENK.sekil); cokgen(c, g2, I2, RENK.goruntu);
    ok(c, g2, ara(S2[0], I2[0], 0.04), ara(S2[0], I2[0], 0.96));
    yazi(c, g2, 495, 420, 'öteleme', { size: 28, kalin: 700, renk: RENK.ok });
    // dönme
    const g3 = c.S('g', {}, g), S3 = [[700, 200], [730, 290], [798, 260]], O = [810, 310];
    cokgen(c, g3, S3, RENK.sekil); cokgen(c, g3, S3.map((q) => dondur(q, O, 90)), RENK.goruntu);
    yayIz(c, g3, O, S3[0], { renk: RENK.cizgi, derece: 90 });
    merkezNokta(c, g3, O, null);
    yazi(c, g3, 810, 420, 'dönme', { size: 28, kalin: 700, renk: RENK.merkez });
    gizle(bas, g1, g2, g3);
    await belir(c, g1, 500);
    await belir(c, g2, 500);
    await belir(c, g3, 500);
    await belir(c, bas, 500);
  }

  /* ---- 6. Paralel iki yansıma: öteleme, uzaklık iki katı ---- */
  async function paralel(c, g) {
    const X1 = 380, X2 = 560, U1 = [X1, 135], V1 = [X1, 450], U2 = [X2, 135], V2 = [X2, 450];
    const T = [[280, 170], [300, 340], [355, 260]], T1 = T.map((q) => yansit(q, U1, V1)), T2 = T1.map((q) => yansit(q, U2, V2));
    const d1 = dogru(c, g, U1, V1, { ad: 'd₁', adKay: [16, 24] }), d2 = dogru(c, g, U2, V2, { ad: 'd₂', adKay: [16, 24] });
    const mavi = cokgen(c, g, T, RENK.sekil);
    const ara1 = cokgen(c, g, T1, RENK.goruntu, { dolgu: 0.08 }); ara1.yuz.setAttribute('stroke-opacity', 0.45);
    const tur = cokgen(c, g, T2, RENK.goruntu);
    const uzk = c.S('g', {}, g);
    ok(c, uzk, [470, 420], [X1, 420], RENK.cizgi, 2.5); ok(c, uzk, [470, 420], [X2, 420], RENK.cizgi, 2.5);
    yazi(c, uzk, 470, 406, 'a', { size: 26, kalin: 700 });
    const buyuk = c.S('g', {}, g);
    cizgi(c, buyuk, [280, 170], [280, 108], RENK.cizgi, 2, KESIK); cizgi(c, buyuk, [640, 170], [640, 108], RENK.cizgi, 2, KESIK);
    ok(c, buyuk, [282, 108], [638, 108]);
    yazi(c, buyuk, 460, 88, '2 × a', { size: 28, kalin: 700, renk: RENK.ok });
    const cap = alt(c, g, 'Paralel iki yansıma: öteleme');
    gizle(d1.g, d2.g, mavi.g, ara1.g, tur.g, uzk, buyuk, cap);
    await belir(c, [d1.g, d2.g, mavi.g, cap], 450);
    await belir(c, ara1.g, 500);
    await belir(c, tur.g, 500);
    await belir(c, uzk, 400);
    await belir(c, buyuk, 450);
  }

  /* ---- 7. Kesişen iki yansıma: dönme, açı iki katı ---- */
  async function kesisen(c, g) {
    const O = [470, 300], A = 35, dir = [Math.cos(rad(-A)), Math.sin(rad(-A))];
    const U1 = [800, 300], V1 = [170, 300], U2 = [O[0] + 360 * dir[0], O[1] + 360 * dir[1]], V2 = [O[0] - 220 * dir[0], O[1] - 220 * dir[1]];
    const T = [[584, 282], [675, 275], [637, 204]], T1 = T.map((q) => yansit(q, U1, V1)), T2 = T1.map((q) => yansit(q, U2, V2));
    const d1 = dogru(c, g, U1, V1, { ad: 'd₁', adKay: [18, 26] }), d2 = dogru(c, g, U2, V2, { ad: 'd₂', adKay: [18, 26] });
    const mavi = cokgen(c, g, T, RENK.sekil);
    const ara1 = cokgen(c, g, T1, RENK.goruntu, { dolgu: 0.08 }); ara1.yuz.setAttribute('stroke-opacity', 0.45);
    const tur = cokgen(c, g, T2, RENK.goruntu);
    const m = merkezNokta(c, g, O, 'O');
    const P1 = [O[0] + 100, O[1]], P2 = ileri(O, rad(-A), 100), a = c.S('g', {}, g);
    aciYayi(c, a, O, P1, P2, RENK.merkez, 55);
    const q = aciIci(O, P1, P2, 85);
    yazi(c, a, q[0], q[1] + 8, 'α', { size: 26, kalin: 700, renk: RENK.merkez });
    const dn = c.S('g', {}, g), V = T[1], r = uz(O, V), mid = yon(O, V) + rad(-A), y = ileri(O, mid, r + 30);
    yayIz(c, dn, O, V, { renk: RENK.merkez, w: 3, derece: -2 * A });
    yazi(c, dn, y[0], y[1] + 8, '2α', { size: 26, kalin: 700, renk: RENK.merkez });
    const cap = alt(c, g, 'Kesişen iki yansıma: dönme');
    gizle(d1.g, d2.g, mavi.g, ara1.g, tur.g, m.g, a, dn, cap);
    await belir(c, [d1.g, d2.g, mavi.g, m.g, cap], 450);
    await belir(c, ara1.g, 500);
    await belir(c, tur.g, 500);
    await belir(c, a, 400);
    await belir(c, dn, 450);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const bos = () => c.S('g', {}, svg);
    const kural = async (yap, cumle) => {
      const g = bos();
      await par(c.say(cumle), yap(c, g));
      await c.wait(500);
      return g;
    };
    const gec = async (g) => { c.clearSay(); await kaldir(c, g); };

    const g0 = bos(); yazi(c, g0, 500, 290, 'Geometrik dönüşümler', { size: 46, kalin: 700 }); gizle(g0);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, g0, 450));
    await gec(g0);

    await gec(await kural(yansima, 'Yansıma şekli ters çevirir; köşe ile görüntüsü doğruya eşit uzaklıktadır.'));
    await gec(await kural(oteleme, 'Öteleme her noktayı aynı yönde, aynı uzaklıkta kaydırır.'));
    await gec(await kural(donme, 'Dönme bir merkez çevresinde, bir açı kadar çevirir.'));

    const g4 = await kural(esler, 'Üç dönüşümde de görüntü şekle eştir.');
    c.note('<b>Görüntü şekle eştir.</b>', 'Dönüşümler', 'eb-a6-es');
    await gec(g4);

    const g5 = await kural(paralel, 'Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.');
    c.note('Paralel iki yansıma: öteleme, <b>2 × uzaklık</b>.', 'Dönüşümler', 'eb-a6-paralel');
    await gec(g5);

    await kural(kesisen, 'Kesişen iki yansıma bir dönme eder; açı iki katıdır.');
    c.note('Kesişen iki yansıma: dönme, <b>2 × açı</b>.', 'Dönüşümler', 'eb-a6-kesisen');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a6', kicker: 'Konu A · Geometrik dönüşümler', title: 'Konu tekrarı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Geometrik dönüşümler',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      {
        q: 'Aralarında 7 cm olan paralel iki doğruya göre art arda yansıtılan bir şekil kaç cm ötelenir?',
        options: ['7 cm', '14 cm', '21 cm'], answer: 1,
        why: ['7 cm, doğrular arasındaki uzaklıktır; öteleme bunun iki katıdır.', 'Öteleme, doğrular arasındaki uzaklığın iki katıdır: 2 × 7 = 14.', '21 cm, uzaklığın üç katıdır; iki yansıma iki kat öteler.'], scene: 0,
      },
      {
        q: 'Çevresi 30 cm olan bir beşgen 120° döndürüldü. Görüntünün çevresi kaç cm’dir?',
        options: ['30 cm', '120 cm', '150 cm'], answer: 0,
        why: ['Dönme kenar uzunluklarını değiştirmez; görüntü şekle eştir, çevre aynı kalır.', '120, dönme açısıdır; çevreyle ilgisi yoktur.', 'Dönme çevreye bir şey eklemez; 30 + 120 anlamsızdır.'], scene: 0,
      },
      {
        q: 'Bir motif ile görüntüsü aynı duruşta; bütün köşeler aynı uzaklıkta yer değiştirmiş. Hangi dönüşüm uygulanmıştır?',
        options: ['Yansıma', 'Dönme', 'Öteleme'], answer: 2,
        why: ['Yansıma motifi ters çevirir; görüntü aynı duruşta olmaz.', 'Dönmede motifin baktığı yön değişir; köşeler farklı uzaklıklarda yer değiştirir.', 'Aynı duruş ve aynı uzaklıkta kayma ötelemenin işaretidir.'], scene: 0,
      },
      {
        q: 'Aralarındaki açı 25° olan kesişen iki doğruya göre art arda yansıtılan bir şekil kaç derece döner?',
        options: ['25°', '50°', '100°'], answer: 1,
        why: ['25°, doğrular arasındaki açıdır; dönme bunun iki katıdır.', 'Dönme açısı, doğrular arasındaki açının iki katıdır: 2 × 25° = 50°.', '100° dört katıdır; iki yansıma iki kat döndürür.'], scene: 0,
      },
      {
        q: 'K noktası yansıma doğrusuna 4 cm uzakta. K ile görüntüsü K′ arasındaki uzaklık kaç cm’dir?',
        options: ['4 cm', '16 cm', '8 cm'], answer: 2,
        why: ['4 cm yalnızca K’nın doğruya uzaklığıdır; K′ da öteki yanda 4 cm uzaktadır.', '16 cm, 4 cm’nin dört katıdır; araları iki katıdır.', 'K doğruya 4 cm, K′ öteki yandan 4 cm uzaktadır: 4 + 4 = 8.'], scene: 0,
      },
      {
        q: 'Bir merkez çevresinde eşit açılarla dizilmiş 10 motif tam turu dolduruyor. Her adımın dönme açısı kaç derecedir?',
        options: ['10°', '36°', '18°'], answer: 1,
        why: ['10, motif sayısıdır; açı değildir.', 'Tam tur 360°dir ve 10 eşit adıma bölünür: 360° ÷ 10 = 36°.', '18°, tam turun 20 eşit adıma bölünmesiyle bulunur.'], scene: 0,
      },
      {
        q: 'Bir şekil O çevresinde döndürülüyor. O’ya 2 cm uzaktaki M noktası ile 9 cm uzaktaki N noktası için hangisi doğrudur?',
        options: ['N daha büyük açıyla döner', 'İkisi de aynı uzunlukta yay çizer', 'İkisi de aynı açıyla döner; N daha uzun yay çizer'], answer: 2,
        why: ['Bütün noktalar aynı açıyla döner; merkeze uzaklık açıyı değiştirmez.', 'Merkezden uzak nokta daha büyük bir çember üzerinde döner; yayı daha uzundur.', 'Açı herkes için aynıdır; N merkezden uzak olduğu için yayı daha uzundur.'], scene: 0,
      },
      {
        q: 'Bir şeritte komşu iki motiften biri ötekinin ters çevrilmiş hâli. Birinci motiften üçüncüye hangi dönüşümle geçilir?',
        options: ['Öteleme', 'Yansıma', 'Dönme'], answer: 0,
        why: ['İki adım iki yansımadır; paralel iki yansıma bir öteleme eder.', 'Tek yansıma motifi ters çevirir; üçüncü motif ise birincinin aynı duruşundadır.', 'Dönme motifin baktığı yönü değiştirir; şeritte birinci ve üçüncü motif aynı duruştadır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Dönüşümler yeri değiştirir, ölçüyü değiştirmez.</b>',
      'Yansıma ters çevirir, öteleme kaydırır, dönme döndürür.',
      'Paralel iki yansıma: öteleme, <b>2 × uzaklık</b>.',
      'Kesişen iki yansıma: dönme, <b>2 × açı</b>.',
    ],
  });
})();
