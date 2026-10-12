/* B4 — Açı-Açı: iki açı yeter
   İki üçgenin karşılıklı iki açısı eşitse üçgenler benzerdir; benzer üçgenlerde karşılıklı kenarlar orantılıdır.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B4)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, uz, yazi, renkli, parcaKoy, cizgi, gizle, belir, par, cevapla, zemin, aciIci, agirlik, nokta } = window.KIT;
  const B = window.KIT_B;
  const [MAVI, TURUNCU, YESIL] = B.ESLEME;               // 1., 2., 3. karşılıklı çift
  const TX = 706;                                         // sağdaki sütunun sol kenarı
  const L = (...x) => x.flat(Infinity);
  const sil = async (c, el, ms = 300) => { const es = L(el); await belir(c, es, ms, 0); es.forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700, ek = 4) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + ek * Math.sin(Math.PI * e)))); };
  const sag = (c, p, y, parcalar, size = 26) => renkli(c, p, TX, y, parcalar, { hiza: 'start', size, kalin: 700 });

  /* Köşe açısının değeri: köşenin açıortayı üzerinde, yayın dışında. */
  const deger = (c, p, V, X, Y, metin, renk, d) => { const q = aciIci(V, X, Y, d); return yazi(c, p, q[0], q[1] + 8, metin, { size: 22, kalin: 700, renk }); };
  /* Kenarın üstüne çizilen renkli çizgi ve n çentik (karşısındaki açının rengi). */
  const kenar = (c, p, P, Q, renk, n, t = 0.5, w = 5) => { const g = c.S('g', {}, p); const line = cizgi(c, g, P, Q, renk, w); B.esitCentik(c, g, P, Q, n, renk, { t, w: 3.5 }); return { g, line }; };
  /* Aynı açılı iki üçgen: ikincisi birincinin k katı; esleme ile açı ve kenar işaretleri. */
  const ikiUcgen = (c, p, A, D, uzunluk, aA, aB, k = 1.5) => {
    const P = B.ucgenKur('AKA', [uzunluk, aA, aB], A, { olcek: 1 }), Q = B.ucgenKur('AKA', [uzunluk * k, aA, aB], D, { olcek: 1 });
    return Object.assign({ P, Q }, B.esleme(c, p, P, Q));
  };
  const virgul = (x) => x.toFixed(1).replace('.', ',');

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Benzer iki üçgen: oran 2.
    const g1 = c.S('g', {}, svg);
    const P = B.ucgenKur('AKA', [300, 55, 65], [130, 450], { olcek: 1 }), Q = B.ucgenKur('AKA', [150, 55, 65], [560, 450], { olcek: 1 });
    B.notrUcgen(c, g1, P, ['A', 'B', 'C']); B.notrUcgen(c, g1, Q, ['D', 'E', 'F']);
    const ab = B.kenarEtiketi(c, g1, P[0], P[1], '?', RENK.yazi, { merkez: agirlik(P), size: 28 });
    B.kenarEtiketi(c, g1, Q[0], Q[1], '6 cm', RENK.yazi, { merkez: agirlik(Q) });
    yazi(c, g1, 500, 80, '|AB| / |DE| = 2', { size: 34, kalin: 700 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC ~ DEF, |AB| / |DE| = 2 ve |DE| = 6 cm. |AB| kaç cm’dir?',
      options: ['12 cm', '3 cm', '8 cm'], answer: 0,
      hints: ['', 'Oran 2: ABC’nin kenarı DEF’in karşılığının iki katıdır.', 'Oran 2: ABC’nin kenarı DEF’in karşılığının iki katıdır.'],
      right: 'Evet. AB, DE’nin iki katı: 12 cm.',
    });
    cevapla(ab, '12 cm');
    await c.say('AB, DE’nin iki katı olduğundan 12 cm.', { speak: 'A B, D E’nin iki katı olduğundan on iki santimetre.' });
    c.clearSay();
    await sil(c, g1, 350);

    // Üç açısı eşit iki üçgen: boyları farklı.
    const g2 = c.S('g', {}, svg);
    const P2 = B.ucgenKur('AKA', [170, 60, 70], [150, 440], { olcek: 1 }), Q2 = B.ucgenKur('AKA', [320, 60, 70], [430, 440], { olcek: 1 });
    const e = B.esleme(c, g2, P2, Q2); gizle(e.kenarlar);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Karşılıklı üç açısı eşit iki üçgen için hangisi doğrudur?',
      options: ['Eştirler', 'Eş olmayabilirler', 'Birbirine benzemezler'], answer: 1,
      hints: ['Aynı açılarla büyük ve küçük üçgen çizilebilir.', '', 'Aynı açılarla büyük ve küçük üçgen çizilebilir.'],
      right: 'Evet. Açılar aynı kalsa da boylar farklı olabilir.',
    });
    await c.say('Açıları aynı olan büyük ve küçük üçgen çizilebilir.');
  }

  /* ---- 2. İki açı üçüncüyü de verir ---- */
  async function ikiAci(c) {
    const svg = c.svg(1000, 562);
    const T = ikiUcgen(c, svg, [50, 440], [320, 440], 200, 50, 60), P = T.P, Q = T.Q;
    const vA1 = deger(c, svg, P[0], P[1], P[2], '50°', MAVI, 62), vB1 = deger(c, svg, P[1], P[2], P[0], '60°', TURUNCU, 60), vC1 = deger(c, svg, P[2], P[0], P[1], '70°', YESIL, 76);
    const vA2 = deger(c, svg, Q[0], Q[1], Q[2], '50°', MAVI, 62), vB2 = deger(c, svg, Q[1], Q[2], Q[0], '60°', TURUNCU, 60), vC2 = deger(c, svg, Q[2], Q[0], Q[1], '70°', YESIL, 76);
    const hes = sag(c, svg, 140, [['A', MAVI], ' + ', ['B', TURUNCU], ' + ', ['C', YESIL], ' = 180°'], 24);
    gizle(T.g, T.yaylar, T.kenarlar, vA1, vB1, vC1, vA2, vB2, vC2, hes);
    const ilkIki = [T.yaylar[0], T.yaylar[1], T.yaylar[3], T.yaylar[4]];

    await par(c.say('İki üçgenin karşılıklı iki açısı eşit olsun: 50° ve 60°.', { speak: 'İki üçgenin karşılıklı iki açısı eşit olsun: elli derece ve altmış derece.' }), (async () => {
      await belir(c, T.g, 450); await belir(c, [...ilkIki, vA1, vB1, vA2, vB2], 500);
    })());
    await par(c.say('Üçgenin iç açıları toplamı 180°’dir.', { speak: 'Üçgenin iç açıları toplamı yüz seksen derecedir.' }), belir(c, hes, 450));
    await par(c.say('Birinci üçgende üçüncü açı 180° − 50° − 60° = 70°.', { speak: 'Birinci üçgende üçüncü açı yüz seksen eksi elli eksi altmış eşittir yetmiş derece.' }), (async () => {
      parcaKoy(c, hes, ['180°', ' − ', ['50°', MAVI], ' − ', ['60°', TURUNCU], ' = ', ['70°', YESIL]]);
      await belir(c, [T.yaylar[2], vC1], 500);
    })());
    await par(c.say('İkinci üçgende de aynı hesap: 70°.', { speak: 'İkinci üçgende de aynı hesap: yetmiş derece.' }), belir(c, [T.yaylar[5], vC2], 500));
    await par(c.say('İki açı eşitse üçüncüler de eşit: üç açının hepsi eşit.'), belir(c, hes, 400, 0));
    hes.remove();

    // Kenarlar: oranlar çizilen uzunluklardan hesaplanır; açı değerleri tahtada kalır.
    const degerler = [vA1, vB1, vC1, vA2, vB2, vC2];
    const oranlar = [['EF/BC', 1, 2, MAVI], ['FD/CA', 2, 0, TURUNCU], ['DE/AB', 0, 1, YESIL]];
    const oranDeger = oranlar.map(([, i, j]) => virgul(uz(Q[i], Q[j]) / uz(P[i], P[j])));
    const satirlar = oranlar.map(([m, , , r], i) => sag(c, svg, 190 + i * 52, [[m, r]]));
    gizle(satirlar);
    await par(c.say('Şimdi karşılıklı kenarları ölçüp oranlayalım.'), (async () => {
      await belir(c, T.kenarlar, 500); await belir(c, satirlar, 450);
    })());
    await par(c.say('Üçü de 1,5: kenarlar orantılı.', { speak: 'Üçü de bir buçuk: kenarlar orantılı.' }), (async () => {
      oranlar.forEach(([m, , , r], i) => parcaKoy(c, satirlar[i], [[m + ' = ' + oranDeger[i], r]]));
      await c.wait(900);
    })());
    c.clearSay();
    await sil(c, [T.g, degerler, satirlar], 350);

    // Dene: iki açıyı seç, oranlara bak.
    let a = 50, b = 60, dg = null, ilk = true, son = null;
    const ciz = () => {
      if (dg) dg.remove();
      dg = c.S('g', {}, svg);
      const t = ikiUcgen(c, dg, [100, 470], [320, 470], 140, a, b), p = t.P, q = t.Q;
      const hesap = sag(c, dg, 140, ['180° − ', [a + '°', MAVI], ' − ', [b + '°', TURUNCU], ' = ', [(180 - a - b) + '°', YESIL]], 24);
      const ad = [['EF/BC', 1, 2, MAVI], ['FD/CA', 2, 0, TURUNCU], ['DE/AB', 0, 1, YESIL]];
      const rows = ad.map(([m, i, j, r], k) => sag(c, dg, 210 + k * 52, [[m + ' = ' + virgul(uz(q[i], q[j]) / uz(p[i], p[j])), r]]));
      son = { hes: hesap, rows, t };
      if (ilk) { gizle(dg); }
    };
    const sA = c.slider({ label: 'A açısı', min: 30, max: 80, step: 10, value: 50, fmt: (v) => v + '°', onInput: (v) => { a = v; ciz(); } });
    const sB = c.slider({ label: 'B açısı', min: 40, max: 70, step: 10, value: 60, fmt: (v) => v + '°', onInput: (v) => { b = v; ciz(); } });
    await c.say('İki açıyı seç; oranlara bak.', { noWait: true });
    if (ilk) { ilk = false; await belir(c, dg, 450); }
    await c.cont('Devam ›');
    sA.remove(); sB.remove(); c.clearSay();

    await c.say('İki açı hangi değerde olursa olsun oranlar eşit çıktı.');
    const esl = B.eslemeYazisi(c, svg, TX, 140, 'ABC', 'DEF', '~', { size: 30, hiza: 'start' });
    gizle(esl);
    await par(c.say('Karşılıklı iki açısı eşit olan üçgenler benzerdir.'), (async () => {
      await belir(c, son.hes, 350, 0); await belir(c, esl, 450);
    })());
    const ad = yazi(c, svg, TX, 400, 'Açı-Açı (A.A.)', { hiza: 'start', size: 28, kalin: 700 });
    gizle(ad);
    await par(c.say('Bu koşulun adı Açı-Açı benzerliğidir.'), belir(c, ad, 450));
    await c.say('Benzerlik bulununca karşılıklı kenarlar orantılıdır.');
    c.note('<b>A.A.:</b> iki açı eşitse üçgenler benzerdir; kenarlar orantılıdır.', 'Açı-Açı', 'b4-aci-aci');
  }

  /* ---- 3. Gemiler ---- */
  async function gemiler(c) {
    const svg = c.svg(1000, 562), Y = 190;
    const A = [50, Y], Bp = [350, Y], C = [510, Y], D = [610, Y], E = [350, 310], F = [510, 374], G = [610, 414];
    const yap = c.S('g', {}, svg);
    cizgi(c, yap, [30, Y], [660, Y], RENK.cizgi, 3);
    cizgi(c, yap, A, [650, Y + 600 * 0.4], RENK.cizgi, 3);
    [A, Bp, C, D].forEach((q) => nokta(c, yap, q, RENK.yazi, 5));
    const harf = [yazi(c, yap, 36, 176, 'A', { size: 24, kalin: 700 }), yazi(c, yap, 368, 214, 'B', { size: 24, kalin: 700 }), yazi(c, yap, 528, 214, 'C', { size: 24, kalin: 700 }), yazi(c, yap, 628, 214, 'D', { size: 24, kalin: 700 })];
    const gemi = (x, ad) => {
      const g = c.S('g', {}, yap);
      c.S('polygon', { points: `${x - 22},176 ${x + 22},176 ${x + 14},190 ${x - 14},190`, fill: RENK.cizgi, 'fill-opacity': 0.5, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      cizgi(c, g, [x, 176], [x, 146], RENK.cizgi, 2.5);
      c.S('polygon', { points: `${x + 3},148 ${x + 3},172 ${x + 19},172`, fill: RENK.cizgi, 'fill-opacity': 0.3, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      const t = yazi(c, g, x, 138, ad, { size: 24, kalin: 700 });
      return { g, t };
    };
    const gm = [gemi(350, 'I'), gemi(510, 'II'), gemi(610, 'III')], num = gm.map((s) => s.t);
    const olcu = (x1, x2, y, metin) => {
      const g = c.S('g', {}, svg);
      cizgi(c, g, [x1, y], [x2, y], RENK.cizgi, 2); cizgi(c, g, [x1, y - 7], [x1, y + 7], RENK.cizgi, 2); cizgi(c, g, [x2, y - 7], [x2, y + 7], RENK.cizgi, 2);
      yazi(c, g, (x1 + x2) / 2, y - 12, metin, { size: 22, kalin: 700 });
      return g;
    };
    const aralik = [olcu(372, 488, 100, '770 m'), olcu(532, 588, 100, '470 m')], boy = yazi(c, svg, 350, 240, '30 m', { size: 22, kalin: 700 });
    const merkez = [olcu(350, 510, 100, '800 m'), olcu(510, 610, 100, '500 m')];
    // Derinlik çizgileri ve işaretleri.
    const BE = cizgi(c, svg, Bp, E, RENK.cizgi, 2.5), CF = cizgi(c, svg, C, F, RENK.cizgi, 2.5), DG = cizgi(c, svg, D, G, RENK.cizgi, 2.5);
    const nE = L(nokta(c, svg, E, RENK.yazi, 5), nokta(c, svg, G, RENK.yazi, 5)), nF = nokta(c, svg, F, RENK.yazi, 5);
    const hE = yazi(c, svg, 334, 342, 'E', { size: 24, kalin: 700 }), hF = yazi(c, svg, 494, 406, 'F', { size: 24, kalin: 700 }), hG = yazi(c, svg, 594, 446, 'G', { size: 24, kalin: 700 });
    const d15 = yazi(c, svg, 362, 256, '15 m', { hiza: 'start', size: 22, kalin: 700 }), d28 = yazi(c, svg, 622, 306, '28 m', { hiza: 'start', size: 22, kalin: 700 });
    const dikler = [B.esitYay(c, svg, Bp, A, E, 1, TURUNCU, { dik: true }), B.esitYay(c, svg, C, A, F, 1, TURUNCU, { dik: true }), B.esitYay(c, svg, D, A, G, 1, TURUNCU, { dik: true })];
    const t90 = yazi(c, svg, 316, 228, '90°', { size: 22, kalin: 700, renk: TURUNCU });
    const yayA = B.esitYay(c, svg, A, Bp, E, 1, MAVI, { r: 44 });
    const pol = (P, r, op) => c.S('polygon', { points: P.map((q) => q.join(',')).join(' '), fill: r, 'fill-opacity': op }, svg);
    const tris = [pol([A, Bp, E], RENK.cizgi, 0.1), pol([A, C, F], RENK.cizgi, 0.1), pol([A, D, G], RENK.cizgi, 0.1)];
    const triRenk = [pol([A, Bp, E], MAVI, 0.2), pol([A, D, G], TURUNCU, 0.14)];
    const esl = B.eslemeYazisi(c, svg, TX, 120, 'ABE', 'ADG', '~', { size: 28, hiza: 'start' });
    gizle(num, aralik, boy, merkez, BE, CF, DG, nE, nF, hE, hF, hG, d15, d28, dikler, t90, yayA, tris, triRenk, esl, harf, yap);

    await par(c.say('Deniz tabanı doğrusal derinleşiyor; üç gemi aynı sırada demirlemiş.', { speak: '[curious] Deniz tabanı doğrusal derinleşiyor; üç gemi aynı sırada demirlemiş.' }), (async () => {
      await belir(c, yap, 450); await belir(c, harf, 300); await belir(c, num, 400);
    })());
    await par(c.say('Gemiler 30 m boyunda; arada 770 m ve 470 m var.', { speak: 'Gemiler otuz metre boyunda; arada yedi yüz yetmiş metre ve dört yüz yetmiş metre var.' }), belir(c, [boy, ...aralik], 500));
    await par(c.say('Bu yüzden BC 800 m, CD 500 m.', { speak: 'Bu yüzden B C sekiz yüz metre, C D beş yüz metre.' }), (async () => {
      await belir(c, [boy, ...aralik], 300, 0); await belir(c, merkez, 500);
    })());
    await par(c.say('B noktasında deniz 15 m derin, D noktasında 28 m.', { speak: 'B noktasında deniz on beş metre derin, D noktasında yirmi sekiz metre.' }), (async () => {
      await belir(c, L(BE, DG, nE, hE, hG, d15, d28), 500);
    })());
    await par(c.say('Derinlik yüzeye dik ölçülür: B, C ve D’deki açılar 90°.', { speak: 'Derinlik yüzeye dik ölçülür: B, C ve D’deki açılar doksan derece.' }), (async () => {
      await belir(c, [CF, nF, hF], 400); await belir(c, [...dikler, t90], 500);
    })());
    await belir(c, num, 300, 0);
    await par(c.say('A açısı ABE, ACF ve ADG üçgenlerinde ortak.', { speak: 'A açısı A B E, A C F ve A D G üçgenlerinde ortak.' }), (async () => {
      await belir(c, tris, 450); await belir(c, yayA, 450);
    })());
    await par(c.say('Üçgenlerde iki açı eşit: ABE ~ ADG (Açı-Açı).', { speak: 'Üçgenlerde iki açı eşit: A B E benzerdir A D G (Açı-Açı).' }), (async () => {
      await belir(c, [...triRenk, esl], 500);
    })());

    // Karşılıklı kenarlar.
    const kAB = kenar(c, svg, A, Bp, YESIL, 3), kAD = kenar(c, svg, A, D, YESIL, 3, 0.62), kBE = kenar(c, svg, Bp, E, MAVI, 1, 0.3), kDG = kenar(c, svg, D, G, MAVI, 1, 0.3);
    gizle(kAB.g, kAD.g, kBE.g, kDG.g);
    await par(c.say('Karşılıklı kenarlar: AB ile AD, BE ile DG.', { speak: 'Karşılıklı kenarlar: A B ile A D, B E ile D G.' }), (async () => {
      await belir(c, [kAB.g, kAD.g], 450); await vurgula(c, [kAB.line, kAD.line]);
      await belir(c, [kBE.g, kDG.g], 450); await vurgula(c, [kBE.line, kDG.line]);
    })());
    await belir(c, [esl, boy], 300, 0);
    const e1 = sag(c, svg, 190, [['|AB| = x', YESIL]]), e2 = sag(c, svg, 236, [['|AD| = x + 1300', YESIL]]);
    gizle(e1, e2);
    await par(c.say('|AB| = x ise |AD| = x + 1300.', { speak: 'A B uzunluğu iks ise A D uzunluğu iks artı bin üç yüz.' }), belir(c, [e1, e2], 450));
    // Oran.
    await belir(c, merkez, 350, 0);
    await belir(c, [e1, e2], 300, 0); e1.remove(); e2.remove();
    const o1 = sag(c, svg, 190, [['x / (x + 1300)', YESIL]]), o2 = sag(c, svg, 236, ['= ', ['15 / 28', MAVI]]);
    gizle(o1, o2);
    await par(c.say('Oran: x / (x + 1300) = 15 / 28.', { speak: 'Oran: iks bölü iks artı bin üç yüz, eşittir on beş bölü yirmi sekiz.' }), (async () => {
      await belir(c, [o1, o2], 450); await vurgula(c, [kAD.line, kDG.line], 600);
    })());
    await belir(c, [o1, o2], 300, 0); o1.remove(); o2.remove();
    const h1 = sag(c, svg, 190, ['28x = 15x + 19 500']), h2 = sag(c, svg, 236, [['x = 1 500', YESIL]]);
    gizle(h1, h2);
    await par(c.say('28x = 15x + 19 500 ise x = 1 500.', { speak: 'Yirmi sekiz iks eşittir on beş iks artı on dokuz bin beş yüz ise iks eşittir bin beş yüz.' }), (async () => {
      await belir(c, h1, 450); await c.wait(500); await belir(c, h2, 450);
    })());
    const abG = olcu(50, 350, 100, '1 500 m');
    gizle(abG);
    await belir(c, h1, 300, 0); h1.remove();
    await par(c.say('I numaralı gemi A noktasından 1 500 m uzakta.', { speak: 'Bir numaralı gemi A noktasından bin beş yüz metre uzakta.' }), (async () => {
      await belir(c, [abG, num[0]], 500);
    })());
    c.clearSay();

    // Birlikte çöz: C noktasındaki derinlik.
    await belir(c, [abG, num[0], h2, kAD.g, kDG.g], 350, 0); h2.remove();
    const kAC = kenar(c, svg, A, C, YESIL, 3, 0.8), kCF = kenar(c, svg, C, F, MAVI, 1, 0.3);
    const dy = yazi(c, svg, 522, 290, 'y', { hiza: 'start', size: 24, kalin: 700, renk: MAVI });
    const q1 = sag(c, svg, 190, [['1 500 / 2 300', YESIL]]), q2 = sag(c, svg, 236, ['= ', ['15 / y', MAVI]]);
    gizle(kAC.g, kCF.g, dy, q1, q2);
    await belir(c, [kAC.g, kCF.g, dy, q1, q2], 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'C noktasındaki derinliği bulalım: ABE ~ ACF. |AC| = 1 500 + 800 = 2 300 m. Oran: |AB| / |AC| = |BE| / |CF| ise 1 500 / 2 300 = 15 / y. y kaç metredir?',
      options: ['28 m', '23 m', '21,5 m'], answer: 1,
      hints: ['15 ile 1 500, 100 katı; y, 2 300’ün yüzde biri.', '', 'y = 15 × 2 300 ÷ 1 500.'],
      right: 'Evet. y, 2 300’ün yüzde biri: 23 m.',
    });
    cevapla(dy, '23 m');
    parcaKoy(c, q2, ['= 15 / ', [ '23', RENK.iyi]]);
    await c.say('C noktasında deniz 23 m derin.', { speak: 'C noktasında deniz yirmi üç metre derin.' });
  }

  /* ---- 4. Karşılıklı kenarı bulmak ---- */
  async function karsilikli(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { b: 56, sutun: 11, satir: 8 });
    const Bp = z.P(3.3, 6.5), D = z.P(6, 6.5), E = z.P(7.5, 6.5), A = z.P(7.7, 4);
    const yap = c.S('g', {}, svg);
    const pol = (P, op) => c.S('polygon', { points: P.map((q) => q.join(',')).join(' '), fill: RENK.cizgi, 'fill-opacity': op }, yap);
    pol([A, Bp, E], 0.07); pol([A, D, E], 0.1);
    [[Bp, E], [A, Bp], [A, D], [A, E]].forEach(([P, Q]) => cizgi(c, yap, P, Q, RENK.cizgi, 2.5));
    [A, Bp, D, E].forEach((q) => nokta(c, yap, q, RENK.yazi, 5));
    const kamera = (x, y) => { c.S('rect', { x: x - 13, y: y - 8, width: 26, height: 16, rx: 3, fill: RENK.cizgi, 'fill-opacity': 0.45, stroke: RENK.cizgi, 'stroke-width': 2 }, yap); c.S('circle', { cx: x, cy: y, r: 4.5, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2 }, yap); };
    kamera(A[0], A[1] - 20); kamera(Bp[0] - 26, Bp[1] - 12);
    const harf = [yazi(c, yap, A[0] + 26, A[1] - 6, 'A', { size: 24, kalin: 700 }), yazi(c, yap, Bp[0] - 6, Bp[1] + 30, 'B', { size: 24, kalin: 700 }), yazi(c, yap, D[0], D[1] + 30, 'D', { size: 24, kalin: 700 }), yazi(c, yap, E[0] + 8, E[1] + 30, 'E', { size: 24, kalin: 700 })];
    const olcek = yazi(c, svg, 44, 494, '1 kare = 10 m', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    // Açı işaretleri.
    const mavi = [B.esitYay(c, svg, A, E, D, 1, MAVI, { r: 40 }), B.esitYay(c, svg, Bp, A, E, 1, MAVI, { r: 48 })];
    const yesil = B.esitYay(c, svg, E, A, Bp, 3, YESIL, { r: 40 });
    const turuncu = [B.esitYay(c, svg, A, Bp, E, 2, TURUNCU, { r: 72 }), B.esitYay(c, svg, D, A, E, 2, TURUNCU, { r: 38 })];
    const esl = renkli(c, svg, TX, 120, ['△', ['A', TURUNCU], ['B', MAVI], ['E', YESIL], ' ~ △', ['D', TURUNCU], ['A', MAVI], ['E', YESIL]], { hiza: 'start', size: 28, kalin: 700 });
    // Renkli kenarlar (karşısındaki açının rengi); ortak AE iki ince çizgi olarak.
    const at = (dx) => [[A[0] + dx, A[1]], [E[0] + dx, E[1]]];
    const cAEm = at(-3.5), cAEt = at(3.5);
    const ks = [
      kenar(c, svg, A, Bp, YESIL, 3), kenar(c, svg, A, D, YESIL, 3, 0.55),
      kenar(c, svg, [Bp[0], Bp[1] + 3.5], [E[0], E[1] + 3.5], TURUNCU, 2, 0.3, 4), kenar(c, svg, [D[0], D[1] - 3.5], [E[0], E[1] - 3.5], MAVI, 1, 0.5, 4),
      kenar(c, svg, cAEm[0], cAEm[1], MAVI, 1, 0.3, 4), kenar(c, svg, cAEt[0], cAEt[1], TURUNCU, 2, 0.7, 4),
    ];
    gizle(yap, olcek, mavi, yesil, turuncu, esl, ks.map((k) => k.g));

    await par(c.say('İki kameranın görüş açısı aynı: EAD ile ABE eşit.', { speak: 'İki kameranın görüş açısı aynı: E A D ile A B E eşit.' }), (async () => {
      await belir(c, [yap, olcek], 450); await belir(c, mavi, 500);
    })());
    await par(c.say('E açısı iki üçgende ortak.'), belir(c, yesil, 500));
    await par(c.say('İki açı eşit: ABE ~ DAE (Açı-Açı).', { speak: 'İki açı eşit: A B E benzerdir D A E (Açı-Açı).' }), (async () => {
      await belir(c, esl, 450); await belir(c, turuncu, 500);
    })());
    await par(c.say('Kenarlar karşılarındaki açının rengini alıyor: aynı renkliler karşılıklı.'), belir(c, ks.map((k) => k.g), 600));
    await par(c.say('|AE| karşılıklı |DE| ile; |AB| karşılıklı |AD| ile eşlenir.', { speak: 'A E uzunluğu karşılıklı D E uzunluğu ile; A B uzunluğu karşılıklı A D uzunluğu ile eşlenir.' }), (async () => {
      await vurgula(c, [ks[4].line, ks[3].line], 800);
      await vurgula(c, [ks[0].line, ks[1].line], 800);
    })());
    await c.say('Oranı aynı renkli kenarlar arasında kur.', { speak: '[thoughtful] Oranı aynı renkli kenarlar arasında kur.' });
    c.clearSay();

    // Sıra sende: uzunluklar tahtaya yazılır.
    await belir(c, esl, 300, 0); esl.remove();
    const uA = yazi(c, svg, A[0] + 22, A[1] + 76, '25 m', { hiza: 'start', size: 22, kalin: 700, renk: MAVI });
    const uD = yazi(c, svg, (D[0] + E[0]) / 2, D[1] + 62, '15 m', { size: 22, kalin: 700, renk: MAVI });
    const uAD = yazi(c, svg, 327, 402, '30 m', { size: 22, kalin: 700, renk: YESIL });
    const ux = yazi(c, svg, 318, 326, 'x', { size: 26, kalin: 700, renk: YESIL });
    gizle(uA, uD, uAD, ux); await belir(c, [uA, uD, uAD, ux], 450);
    await c.choice({
      tag: 'Sıra sende', q: '|AE| = 25 m, |DE| = 15 m, |AD| = 30 m ve |AB| = x. x kaç metredir?',
      options: ['18 m', '40 m', '50 m'], answer: 2,
      hints: ['18 çıkarsa oranı tersine kurmuşsun: 15 / 25 = x / 30.', '25 / 15 = x / 30; renkli kenarları eşle.', ''],
      right: 'Evet. 25 / 15 = x / 30 ise x = 50.',
    });
    const sat = sag(c, svg, 190, [['25', MAVI], ' / ', ['15', MAVI]], 30);
    gizle(sat);
    await par(c.say('Aynı renkli kenarlar eşleniyor: 25 / 15 = x / 30.', { speak: 'Aynı renkli kenarlar eşleniyor: yirmi beş bölü on beş eşittir iks bölü otuz.' }), (async () => {
      await belir(c, sat, 400); await vurgula(c, [ks[4].line, ks[3].line], 800);
      parcaKoy(c, sat, [['25', MAVI], ' / ', ['15', MAVI], ' = ', ['x', YESIL], ' / ', ['30', YESIL]]);
      await vurgula(c, [ks[0].line, ks[1].line], 800);
    })());
    cevapla(ux, '50 m');
    parcaKoy(c, sat, [['25', MAVI], ' / ', ['15', MAVI], ' = ', ['50', RENK.iyi], ' / ', ['30', YESIL]]);
    await c.say('Böylece x = 50 m.', { speak: 'Böylece iks eşittir elli metre.' });
    await c.say('Oran kurarken önce aynı renkli kenarları eşle.');
    c.note('<b>Oran kurarken</b> aynı renkli kenarları eşle.', 'Karşılıklı kenar', 'b4-karsilikli');
  }

  /* ---- 5. Gölge ---- */
  /* Yere dik bir cisim (boy h) ve gölgesi (uzunluk s); ışın cismin ucundan gölgenin ucuna iner. Parçalar ayrı gruplarda döner. */
  function golgeCifti(c, p, x, h, s, f, o = {}) {
    const Y = 470, taban = [x, Y], uc = [x, Y - h], iz = [x + s, Y];
    const yapi = c.S('g', {}, p), dikG = c.S('g', {}, p), triG = c.S('g', {}, p);
    c.S('polygon', { points: [taban, uc, iz].map((q) => q.join(',')).join(' '), fill: RENK.cizgi, 'fill-opacity': 0.1 }, triG);
    cizgi(c, yapi, [x - f * s, Y - h - f * h], iz, RENK.dogru, 3, { 'stroke-dasharray': '10 8' });
    cizgi(c, yapi, taban, iz, YESIL, 5);
    cizgi(c, yapi, taban, uc, MAVI, 5);
    if (o.bas) c.S('circle', { cx: x, cy: Y - h - 8, r: 8, fill: 'none', stroke: MAVI, 'stroke-width': 4 }, yapi);
    if (o.tac) c.S('circle', { cx: x, cy: Y - h + 22, r: 22, fill: RENK.cizgi, 'fill-opacity': 0.25, stroke: RENK.cizgi, 'stroke-width': 3 }, yapi);
    B.esitYay(c, yapi, iz, taban, uc, 1, MAVI, { r: o.r2 || 40 });
    B.esitYay(c, dikG, taban, uc, iz, 1, TURUNCU, { dik: true, r: o.r1 || 26 });
    return { yapi, dikG, triG };
  }

  async function golge(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    cizgi(c, g1, [30, 470], [660, 470], RENK.cizgi, 3);
    const pole = golgeCifti(c, g1, 90, 360, 240, 0.25, { r2: 48 }), kid = golgeCifti(c, g1, 410, 90, 60, 1.2, { bas: true, r1: 22, r2: 36 });
    const lh = yazi(c, g1, 78, 300, 'h', { hiza: 'end', size: 26, kalin: 700, renk: MAVI });
    const lc = yazi(c, g1, 446, 410, '150 cm', { hiza: 'start', size: 22, kalin: 700, renk: MAVI });
    const lg = yazi(c, g1, 440, 506, '100 cm', { size: 22, kalin: 700, renk: YESIL }), ld = yazi(c, g1, 210, 506, '400 cm', { size: 22, kalin: 700, renk: YESIL });
    const r1 = renkli(c, g1, 540, 190, [['150', MAVI], ' / ', ['100', YESIL], ' = ', ['h', MAVI], ' / ', ['400', YESIL]], { hiza: 'start', size: 28, kalin: 700 });
    const r2 = renkli(c, g1, 540, 250, ['h = ', ['150', MAVI], ' × ', ['400', YESIL], ' ÷ ', ['100', YESIL]], { hiza: 'start', size: 26, kalin: 700 });
    const r3 = renkli(c, g1, 540, 290, ['= 600 cm'], { hiza: 'start', size: 26, kalin: 700 });
    gizle(pole.yapi, kid.yapi, pole.dikG, kid.dikG, pole.triG, kid.triG, lh, lc, lg, ld, r1, r2, r3);

    await par(c.say('Işınlar paralel: yerle yaptıkları açı her yerde aynı.'), belir(c, [pole.yapi, kid.yapi], 600));
    await par(c.say('Direk de çocuk da yere dik: iki üçgende 90° var.', { speak: 'Direk de çocuk da yere dik: iki üçgende doksan derece var.' }), belir(c, [pole.dikG, kid.dikG], 500));
    await par(c.say('İki açı eşit: iki gölge üçgeni benzerdir.'), belir(c, [pole.triG, kid.triG], 500));
    await par(c.say('Çocuk 150 cm, gölgesi 100 cm; direğin gölgesi 400 cm.', { speak: 'Çocuk yüz elli santimetre, gölgesi yüz santimetre; direğin gölgesi dört yüz santimetre.' }), belir(c, [lc, lg, ld, lh], 500));
    await par(c.say('Boy bölü gölge aynı: 150 / 100 = h / 400.', { speak: 'Boy bölü gölge aynı: yüz elli bölü yüz eşittir he bölü dört yüz.' }), belir(c, r1, 500));
    await par(c.say('h = 150 × 400 ÷ 100 = 600 cm.', { speak: 'He eşittir yüz elli çarpı dört yüz bölü yüz eşittir altı yüz santimetre.' }), (async () => {
      await belir(c, r2, 450); await c.wait(400); await belir(c, r3, 450);
    })());
    cevapla(lh, '6 m');
    await c.say('Direk 6 m yüksekliğinde.', { speak: 'Direk altı metre yüksekliğinde.' });
    c.clearSay();

    // Sıra sende: ağaç ve çubuk.
    await belir(c, g1, 400, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    cizgi(c, g2, [30, 470], [660, 470], RENK.cizgi, 3);
    golgeCifti(c, g2, 100, 200, 300, 0.2, { tac: true, r2: 48 }); golgeCifti(c, g2, 470, 50, 75, 1.0, { r1: 20, r2: 32 });
    const th = yazi(c, g2, 70, 380, 'h', { hiza: 'end', size: 26, kalin: 700, renk: MAVI });
    yazi(c, g2, 250, 506, '12 m', { size: 22, kalin: 700, renk: YESIL }); yazi(c, g2, 452, 450, '2 m', { hiza: 'end', size: 22, kalin: 700, renk: MAVI }); yazi(c, g2, 507, 506, '3 m', { size: 22, kalin: 700, renk: YESIL });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir ağacın gölgesi 12 m. Yanındaki 2 m’lik çubuğun gölgesi 3 m. Ağaç kaç metredir?',
      options: ['18 m', '8 m', '10 m'], answer: 1,
      hints: ['18 çıkarsa oranı ters kurmuşsun.', '', 'Boy bölü gölge aynı: 2 / 3 = h / 12.'],
      right: 'Evet. Boy bölü gölge aynı: 2 / 3 = h / 12.',
    });
    cevapla(th, '8 m');
    const e = renkli(c, g2, 620, 200, [['2', MAVI], ' / ', ['3', YESIL], ' = ', ['h', MAVI], ' / ', ['12', YESIL]], { hiza: 'start', size: 28, kalin: 700 });
    gizle(e);
    await par(c.say('2 / 3 = h / 12 ise h = 8 m.', { speak: 'İki bölü üç eşittir he bölü on iki ise he eşittir sekiz metre.' }), belir(c, e, 450));
    await c.say('Gölge üçgenleri benzer olduğu için boy gölgeden bulunur.');
    c.note('<b>Gölge:</b> iki açı eşit; boy bölü gölge aynıdır.', 'Gölge', 'b4-golge');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b4', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Açı-Açı: iki açı yeter', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Açı-Açı: iki açı yeter',
      hook: 'Yan yana duran bir direk ile bir çocuğun gölge üçgenleri neden <b>aynı biçimdedir</b>?',
      button: 'Derse başla ›',
    },
    goals: ['İki üçgenin karşılıklı iki açısı eşitse üçgenlerin benzer olduğunu söyler.', 'Benzer üçgenlerde karşılıklı kenarları aynı renkli kenarlardan bulup oran kurar.', 'Gemi ve gölge gibi durumlarda bilinmeyen uzunluğu Açı-Açı ile bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Benzer üçgenlerde kenar oranı ve üç açının eşitliği.', run: hatirla },
      { title: 'İki açı üçüncüyü de verir', goal: 'İki açı eşitse üçüncü açı da eşittir ve kenarlar orantılıdır.', run: ikiAci },
      { title: 'Gemiler', goal: 'Derinlik ve uzaklık, Açı-Açı ile benzer üçgenlere dönüşür.', run: gemiler },
      { title: 'Karşılıklı kenarı bulmak', goal: 'Oranı aynı renkli kenarlar arasında kur.', run: karsilikli },
      { title: 'Gölge', goal: 'Gölge üçgenleri benzerdir; boy bölü gölge aynıdır.', run: golge },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'KLM ~ PRT, |KL| = 6, |LM| = 9 ve |PR| = 8. |RT| kaçtır?',
        options: ['11', '13,5', '12'], answer: 2,
        why: ['11, farkı (2) ekleyince çıkar; benzerlikte kenarlar orantılıdır, fark sabit kalmaz.', '13,5, oran ters kurulunca çıkar; KL ile PR, LM ile RT karşılıklıdır.', 'KL, PR’nin; LM, RT’nin karşılığı: 6 / 8 = 9 / |RT| ise |RT| = 12.'],
        scene: 3,
      },
      {
        q: 'ABC üçgeninde D noktası BC kenarı üstünde; |AB| = 12 cm, |BD| = 4 cm ve m(BAD) = m(ACD). |DC| kaç cm’dir?',
        options: ['32 cm', '36 cm', '8 cm'], answer: 0,
        why: ['B açısı ortak, m(BAD) = m(BCA): ABD ~ CBA. 4 / 12 = 12 / |BC| ise |BC| = 36 ve |DC| = 36 − 4 = 32 cm.', '36 cm, BC’nin uzunluğudur; DC için BD = 4 cm çıkarılmalı.', '8 cm, 12 − 4 işleminden çıkar; benzerlik oranı kullanılmamış.'],
        scene: 2,
      },
      {
        q: 'Bir direğin gölgesi 15 m. Yanındaki 2 m’lik çubuğun gölgesi 3 m. Direk kaç metredir?',
        options: ['22,5 m', '10 m', '12 m'], answer: 1,
        why: ['22,5 m oranı ters kurunca çıkar; boy bölü gölge aynıdır: 2 / 3 = h / 15.', 'Boy bölü gölge aynı: 2 / 3 = h / 15 ise h = 10 m.', '12 m, 15 − 3 işleminden çıkar; fark değil oran korunur.'],
        scene: 4,
      },
      {
        q: 'ABC ve DEF üçgenlerinde m(A) = m(D) = 40° ve m(B) = m(E) = 75°. Hangisi doğrudur?',
        options: ['Üçüncü açılar farklı olabilir', 'Eştirler', 'm(C) = m(F) = 65° ve ABC ~ DEF'], answer: 2,
        why: ['İki açı eşitse üçüncü açılar da eşittir: 180° − 40° − 75° = 65°.', 'İki açının eşitliği benzerlik verir; boyları aynı olduğu söylenemez, eşlik için kenar da gerekir.', 'İki açı eşit olduğundan üçüncü açılar 65° ve üçgenler Açı-Açı ile benzerdir.'],
        scene: 1,
      },
      {
        q: 'Hangi bilgi iki üçgenin benzer olduğunu söylemek için yeterlidir?',
        options: ['İkisinin de bir açısı 60°', 'İkisinin de iki açısı 35° ve 80°', 'İkisinin de bir kenarı 5 cm'], answer: 1,
        why: ['Tek açı yetmez; ikinci bir açının da eşit olması gerekir.', 'İki açı eşit olduğundan Açı-Açı ile üçgenler benzerdir.', 'Bir kenar açı hakkında bilgi vermez; üçgenin biçimi belli olmaz.'],
        scene: 1,
      },
    ],
    summary: [
      'İki açı eşitse üçüncü açı da eşittir.',
      'Benzer üçgenlerde karşılıklı kenarlar orantılıdır; oranı aynı renkli kenarlar arasında kur.',
      '<b>İki açı eşitse üçgenler benzerdir.</b>',
      'Gölge ve derinlik gibi durumlar benzer üçgenlere dönüşür.',
    ],
    nextLesson: { href: 'b5-kenarlarla-benzerlik.html', label: 'Sonraki: Kenarlarla benzerlik ›' },
  });
})();
