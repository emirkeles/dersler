/* C1 — İki kenarı aynı oranda böl
   Üçgenin iki kenarında ortak köşeden aynı oranda alınan noktalar birleştirilirse küçük üçgen büyüğüne benzer; rastgele noktalar çoğu zaman vermez.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/C-benzer-ucgenler-olusturma.md (C1)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, ileri, yon, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciYayi } = window.KIT;
  const B = window.KIT_B;
  const C = window.KIT_C;
  const EL = C.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift
  const GRI = 'var(--muted)';
  const TX = 706;                                   // sağdaki yazı sütununun sol kenarı

  const sag = (c, p, y, parcalar, size = 25) => renkli(c, p, TX, y, parcalar, { hiza: 'start', size, kalin: 700 });
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); (Array.isArray(el) ? el : [el]).forEach((e) => e.remove()); };
  /* Çizgi (ya da çizgiler) bir kez belirip söner. */
  const vurgula = (c, hatlar, ms = 900) => c.tween(ms, (e) => hatlar.forEach((h) => { h.style.opacity = Math.sin(Math.PI * e); }));
  /* Gruptaki yolların kalınlığı bir kez artıp azalır. */
  const nabiz = (c, gruplar, ms = 800) => {
    const yollar = gruplar.flatMap((g) => [...g.querySelectorAll('path,line')]);
    return c.tween(ms, (e) => yollar.forEach((y) => y.setAttribute('stroke-width', 3 + 3.5 * Math.sin(Math.PI * e))));
  };
  const halka = (c, p, P, renk = RENK.merkez, r = 12) => c.S('circle', { cx: P[0], cy: P[1], r, fill: 'none', stroke: renk, 'stroke-width': 3.5 }, p);
  const harf = (c, p, P, ad, dx, dy, renk = RENK.yazi, size = 24) => yazi(c, p, P[0] + dx, P[1] + dy, ad, { size, kalin: 700, renk });
  const ucAcik = (c, p, pts, renk, dolgu = 0.2) => { const t = cokgen(c, p, pts, renk, { dolgu }); t.yuz.setAttribute('stroke-width', 0); return t; };

  /* Zeminde ABC (A (2, 9), B (6, 1), C (14, 9)) ve üzerinde 1 / 4 ve 1 / 6 bölünmüş noktalar. */
  function anaHavuz(z) {
    const A = z.P(2, 9), Bn = z.P(6, 1), Cn = z.P(14, 9);
    const ab = [0, 1, 2, 3, 4].map((i) => ara(A, Bn, i / 4)), ac = [0, 1, 2, 3, 4, 5, 6].map((i) => ara(A, Cn, i / 6));
    return { A, B: Bn, C: Cn, ab, ac };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Soru 1: Kenar-Açı-Kenar.
    const g1 = c.S('g', {}, svg);
    const P = [[100, 400], [320, 400], [240, 190]], Q = [[560, 400], [670, 400], [630, 295]];
    cokgen(c, g1, P, RENK.sekil, { harf: ['A', 'B', 'C'] }); cokgen(c, g1, Q, RENK.goruntu, { harf: ['D', 'E', 'F'] });
    aciYayi(c, g1, P[0], P[1], P[2], RENK.sekil, 32); aciYayi(c, g1, Q[0], Q[1], Q[2], RENK.sekil, 22);
    renkli(c, g1, 500, 100, ['|DE|/|AB| = |DF|/|AC|'], { size: 30, kalin: 700 });
    renkli(c, g1, 500, 150, ['A açısı = D açısı'], { size: 28, kalin: 700 });
    const kak = yazi(c, g1, 500, 480, 'Kenar-Açı-Kenar', { size: 32, kalin: 700, renk: RENK.iyi });
    gizle(g1, kak); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC ve DEF üçgenlerinde |DE|/|AB| = |DF|/|AC| ve A açısı ile D açısı eşit. Üçgenler hangi koşula göre benzerdir?',
      options: ['Açı-Açı', 'Kenar-Açı-Kenar', 'Kenar-Kenar-Kenar'], answer: 1,
      hints: ['İki kenar orantılı ve aralarındaki açı eşitse üçgenler Kenar-Açı-Kenar ile benzerdir.', '', 'İki kenar orantılı ve aralarındaki açı eşitse üçgenler Kenar-Açı-Kenar ile benzerdir.'],
      right: 'Evet. İki kenar orantılı, aradaki açı eşit.',
    });
    await par(c.say('İki kenar orantılı, aradaki açı eşit: Kenar-Açı-Kenar.'), belir(c, kak, 450));
    c.clearSay();
    await sil(c, g1, 350);

    // Soru 2: benzerlik oranı.
    const g2 = c.S('g', {}, svg);
    const S = [[110, 400], [210, 400], [160, 310]], T = [[450, 400], [750, 400], [600, 130]];
    cokgen(c, g2, S, RENK.sekil); cokgen(c, g2, T, RENK.goruntu);
    yazi(c, g2, 160, 440, '4 cm', { size: 26, kalin: 700, renk: RENK.sekil });
    const soru = yazi(c, g2, 600, 440, '? cm', { size: 26, kalin: 700, renk: RENK.goruntu });
    yazi(c, g2, 330, 330, 'oran 3', { size: 30, kalin: 700 });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Benzer iki üçgenin karşılıklı kenarlarının oranı 3. Küçüğün bir kenarı 4 cm ise büyüğün karşılık gelen kenarı kaç cm’dir?',
      options: ['12 cm', '7 cm', '8 cm'], answer: 0,
      hints: ['', 'Kenarlar aynı çarpanla büyür: 4 × 3 = 12. Aradaki fark aynı kalmaz.', 'Kenarlar aynı çarpanla büyür: 4 × 3 = 12. Aradaki fark aynı kalmaz.'],
      right: 'Evet. Kenarlar aynı çarpanla büyür.',
    });
    cevapla(soru, '12 cm');
    await c.say('Kenarlar aynı çarpanla büyür: 4 × 3 = 12.', { speak: 'Kenarlar aynı çarpanla büyür: dört çarpı üç eşittir on iki.' });
  }

  /* ---- 2. Havuza bölme koy ---- */
  async function havuz(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const A = z.P(2, 9), Bn = z.P(6, 1), Cn = z.P(14, 9), D = z.P(5, 3), E = z.P(11, 9);
    const abc = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const ade = ucAcik(c, g, [A, D, E], RENK.goruntu, 0.22);
    const de = cizgi(c, g, D, E, RENK.goruntu, 4);
    const nk = c.S('g', {}, g);
    nokta(c, nk, D, RENK.goruntu, 7); nokta(c, nk, E, RENK.goruntu, 7);
    harf(c, nk, D, 'D', -26, -2, RENK.goruntu); harf(c, nk, E, 'E', 2, 36, RENK.goruntu);
    const yayA = c.S('g', {}, g); aciYayi(c, yayA, A, Bn, Cn, RENK.sekil, 34); aciYayi(c, yayA, A, Bn, Cn, RENK.sekil, 44);
    const hAB = cizgi(c, g, A, Bn, RENK.sekil, 8), hAC = cizgi(c, g, A, Cn, RENK.sekil, 8), hAD = cizgi(c, g, A, D, RENK.goruntu, 8), hAE = cizgi(c, g, A, E, RENK.goruntu, 8);
    const tAB = C.bolNoktalar(c, g, A, Bn, 4, { cent: true, nokta: false, renk: RENK.yazi }), tAC = C.bolNoktalar(c, g, A, Cn, 4, { cent: true, nokta: false, renk: RENK.yazi });
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, D, E], { yayR: 26 });
    const benz = sag(c, g, 120, ['ADE ~ ABC ?']);
    const f1 = sag(c, g, 190, ['|AD|/|AB|']), es = sag(c, g, 232, ['=']), f2 = sag(c, g, 274, ['|AE|/|AC|']);
    const orn = sag(c, g, 345, [['|DE|/|BC|', EL[0]], ' = ', ['3/4', RENK.merkez]]);
    const bc = sag(c, g, 410, [['|BC| = 12 m', EL[0]]]), dd = sag(c, g, 460, [['|DE| = 9 m', EL[0]]]);
    gizle(abc.g, ade.g, de, nk, yayA, hAB, hAC, hAD, hAE, tAB.g, tAC.g, kk.g, benz, f1, es, f2, orn, bc, dd);

    await par(c.say('Üçgen biçiminde bir balık havuzu var: ABC.', { speak: 'Üçgen biçiminde bir balık havuzu var: A B C.' }), belir(c, abc.g, 500));
    await c.say('Yavrular için aynı biçimde küçük bir bölme yapılacak.');
    await par(c.say('AB kenarında D, AC kenarında E noktası seçilir.', { speak: 'A B kenarında D, A C kenarında E noktası seçilir.' }), belir(c, nk, 500));
    await par(c.say('DE çizgisi küçük bir üçgen ayırır: ADE.', { speak: 'D E çizgisi küçük bir üçgen ayırır: A D E.' }), par(belir(c, de, 450), belir(c, ade.g, 450)));
    await par(c.say('İki üçgenin benzer olması için bir koşul gerekir.', { speak: '[curious] İki üçgenin benzer olması için bir koşul gerekir.' }), belir(c, benz, 450));
    await par(c.say('A açısı iki üçgende ortak; bu açı zaten eşit.', { speak: 'A açısı iki üçgende ortak; bu açı zaten eşit.' }), belir(c, yayA, 450));
    await par(c.say('Kenar-Açı-Kenar için A’yı çevreleyen kenarlar orantılı olmalı.'), vurgula(c, [hAB, hAC, hAD, hAE], 1100));
    await par(c.say('|AD|/|AB| ile |AE|/|AC| eşit olmalı.', { speak: 'A D uzunluğu bölü A B uzunluğu ile A E uzunluğu bölü A C uzunluğu eşit olmalı.' }), par(belir(c, f1, 400), belir(c, es, 400), belir(c, f2, 400)));
    await par(c.say('D, AB’nin dörtte üçünde: |AD|/|AB| = 3/4.', { speak: 'D, A B’nin dörtte üçünde: A D uzunluğu bölü A B uzunluğu eşittir dörtte üç.' }), (async () => {
      await belir(c, tAB.g, 400);
      await belir(c, es, 250, 0);
      parcaKoy(c, f1, ['|AD|/|AB| = ', ['3/4', RENK.merkez]]);
    })());
    await par(c.say('E, AC’nin dörtte üçünde: |AE|/|AC| = 3/4.', { speak: 'E, A C’nin dörtte üçünde: A E uzunluğu bölü A C uzunluğu eşittir dörtte üç.' }), (async () => {
      await belir(c, tAC.g, 400);
      parcaKoy(c, f2, ['|AE|/|AC| = ', ['3/4', RENK.merkez]]);
    })());
    await par(c.say('İki oran eşit, A açısı ortak: ADE ~ ABC.', { speak: 'İki oran eşit, A açısı ortak: A D E, A B C’ye benzerdir.' }), (async () => {
      parcaKoy(c, benz, [['A', EL[0]], ['D', EL[1]], ['E', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
      await par(belir(c, de, 350, 0), belir(c, ade.g, 350, 0.1), belir(c, [kk.g], 450), belir(c, [tAB.g, tAC.g], 350, 0));
    })());
    await par(c.say('Benzerlik oranı 3/4: |DE|/|BC| = 3/4.', { speak: 'Benzerlik oranı dörtte üç: D E uzunluğu bölü B C uzunluğu eşittir dörtte üç.' }), (async () => {
      await par(belir(c, f1, 350, 0), belir(c, f2, 350, 0));
      await belir(c, orn, 450);
    })());
    await par(c.say('|BC| = 12 m ise |DE| = 3/4 × 12 = 9.', { speak: 'B C uzunluğu on iki metre ise D E uzunluğu, dörtte üç çarpı on iki, dokuz.' }), (async () => {
      await belir(c, bc, 450); await c.wait(500); await belir(c, dd, 450);
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Birlikte çöz: oran 1/3, |BC| = 18 m.
    const g2 = c.S('g', {}, svg);
    const D2 = z.P(2 + 4 / 3, 9 - 8 / 3), E2 = z.P(6, 9);
    cokgen(c, g2, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g2, [A, D2, E2], RENK.goruntu, 0.22);
    C.ortakKose(c, g2, [A, Bn, Cn], [A, D2, E2], { yayR: 26 });
    nokta(c, g2, D2, RENK.goruntu, 7); nokta(c, g2, E2, RENK.goruntu, 7);
    harf(c, g2, D2, 'D', -26, -2, RENK.goruntu); harf(c, g2, E2, 'E', 2, 36, RENK.goruntu);
    sag(c, g2, 150, ['|AD|/|AB| = ', ['1/3', RENK.merkez]]);
    sag(c, g2, 200, ['|AE|/|AC| = ', ['1/3', RENK.merkez]]);
    sag(c, g2, 260, [['A', EL[0]], ['D', EL[1]], ['E', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
    sag(c, g2, 330, [['|BC| = 18 m', EL[0]]]);
    const soru = sag(c, g2, 380, [['|DE| = ?', EL[0]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: '|DE| kaç metredir?', options: ['15 m', '6 m', '54 m'], answer: 1,
      hints: ['Fark değil çarpan: 18 × 1/3.', '', 'Benzerlik oranı 1/3: |DE|, |BC|’nin üçte biridir.'],
      right: 'Evet. Üçte bir çarpı on sekiz: 6 m.',
    });
    parcaKoy(c, soru, [['|DE| = 6 m', RENK.iyi]]);
    await c.say('|DE| = 1/3 × 18 = 6 m.', { speak: 'D E uzunluğu, üçte bir çarpı on sekiz, altı metre.' });
    c.clearSay();
    await belir(c, g2, 350, 0);
    g2.remove();


    // Sıra sende: dik üçgen, oran 1/3.
    const g3 = c.S('g', {}, svg);
    const A3 = z.P(1, 10), B3 = z.P(1, 1), C3 = z.P(13, 10), D3 = z.P(1, 7), E3 = z.P(5, 10);
    const t3 = cokgen(c, g3, [A3, B3, C3], RENK.sekil, { harf: ['A', 'B', 'C'] });
    t3.adlar[0].setAttribute('x', A3[0] - 22); t3.adlar[0].setAttribute('y', A3[1] + 30);
    const m3 = [A3[0] + 150, A3[1] - 90];
    ucAcik(c, g3, [A3, D3, E3], RENK.goruntu, 0.22);
    const de3 = cizgi(c, g3, D3, E3, RENK.goruntu, 4);
    nokta(c, g3, D3, RENK.goruntu, 7); nokta(c, g3, E3, RENK.goruntu, 7);
    harf(c, g3, D3, 'D', 26, -6, RENK.goruntu); harf(c, g3, E3, 'E', 2, 34, RENK.goruntu);
    B.kenarEtiketi(c, g3, A3, B3, '9 m', RENK.yazi, { merkez: m3, uzak: 14 });
    B.kenarEtiketi(c, g3, A3, D3, '3 m', RENK.yazi, { merkez: [A3[0] - 100, A3[1]], uzak: 10 });
    B.kenarEtiketi(c, g3, A3, C3, '12 m', RENK.yazi, { merkez: m3, uzak: 22 });
    B.kenarEtiketi(c, g3, A3, E3, '4 m', RENK.yazi, { merkez: [A3[0], A3[1] + 100], uzak: 14 });
    B.kenarEtiketi(c, g3, B3, C3, '15 m', RENK.yazi, { merkez: m3, uzak: 22 });
    const r1 = sag(c, g3, 150, ['|AD|/|AB| = ?']), r2 = sag(c, g3, 200, ['|AE|/|AC| = ?']);
    gizle(g3); await belir(c, g3, 450);
    await c.say('Önce iki oranı yaz, eşit olup olmadığına bak.');
    c.clearSay();
    await par(belir(c, r1, 350, 0), belir(c, r2, 350, 0));
    const dsor = sag(c, g3, 150, [['|DE| = ?', RENK.goruntu]]);
    gizle(dsor); await belir(c, dsor, 350);
    await c.choice({
      tag: 'Sıra sende', q: 'Bu şekilde |DE| kaç metredir?', options: ['5 m', '12 m', '45 m'], answer: 0,
      hints: ['', 'Önce iki oranı yaz: 3/9 ve 4/12.', 'İkisi de 1/3; |DE|, |BC|’nin üçte biridir.'],
      right: 'Evet. Oranlar 1/3; |DE| = 1/3 × 15 = 5 m.',
    });
    parcaKoy(c, dsor, [['|DE| = 5 m', RENK.iyi]]);
    const hes = sag(c, g3, 200, ['1/3 × 15 = 5']); gizle(hes);
    const kk3 = C.ortakKose(c, g3, [A3, B3, C3], [A3, D3, E3], { dik: 0, yayR: 28 }); gizle(kk3.g);
    await par(c.say('Oranlar 1/3: |DE| = 1/3 × 15 = 5 m.', { speak: 'Oranlar üçte bir: D E uzunluğu, üçte bir çarpı on beş, beş metre.' }), par(belir(c, hes, 400), belir(c, kk3.g, 450), belir(c, de3, 350, 0)));
    c.note('<b>Aynı oran:</b> |AD|/|AB| = |AE|/|AC| ise ADE ~ ABC.', 'Aynı oran', 'c1-ayni-oran');
  }

  /* ---- 3. Bölünmüş kenarlar ---- */
  async function bolunmus(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const H = anaHavuz(z), A = H.A, Bn = H.B, Cn = H.C;
    const abc = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const bAB = C.bolNoktalar(c, g, A, Bn, 4, { renk: RENK.yazi }), bAC = C.bolNoktalar(c, g, A, Cn, 6, { renk: RENK.yazi });
    const K = bAB.pts[1], L = bAB.pts[2], M = bAB.pts[3], ac = bAC.pts;
    const ad = ['N', 'P', 'R', 'S', 'T'];
    const hAB = [[K, 'K'], [L, 'L'], [M, 'M']].map(([P, s]) => harf(c, g, P, s, -26, 6));
    const hAC = ad.map((s, i) => harf(c, g, ac[i + 1], s, 0, 34));
    const ucK = cizgi(c, g, A, K, RENK.goruntu, 8), ucB = cizgi(c, g, A, Bn, RENK.sekil, 8);
    const yer = sag(c, g, 110, ['|AK|/|AB|']);
    const tb = C.tablo(c, g, {
      x: TX, y: 150, adim: 46, kolon: [0, 150],
      satir: [[['AB', RENK.sekil], ['AC', RENK.sekil]], ['K 1/4', ''], ['L 2/4', ''], ['M 3/4', ''], ['', ''], ['', '']],
    });
    gizle(bAB.g, bAC.g, hAB, hAC, ucK, ucB, yer);
    gizle(abc.g); await belir(c, abc.g, 400);

    await par(c.say('Başka bir havuzun AB kenarı 4, AC kenarı 6 eşit parçaya bölünmüş.', { speak: 'Başka bir havuzun A B kenarı dört, A C kenarı altı eşit parçaya bölünmüş.' }), par(belir(c, bAB.g, 500), belir(c, bAC.g, 500)));
    await par(c.say('AB’de K, L, M; AC’de N, P, R, S, T noktaları var.', { speak: 'A B’de K, L, M; A C’de N, P, R, S, T noktaları var.' }), par(belir(c, hAB, 450), belir(c, hAC, 450)));
    await par(c.say('Bir noktanın yeri, A’dan uzaklığının kenar boyuna oranıdır.'), (async () => {
      await belir(c, yer, 350);
      await vurgula(c, [ucB, ucK], 1200);
    })());
    await par(c.say('K için |AK|/|AB| = 1/4; L için 2/4; M için 3/4.', { speak: 'K için A K uzunluğu bölü A B uzunluğu eşittir dörtte bir; L için dörtte iki; M için dörtte üç.' }), (async () => {
      await belir(c, yer, 300, 0);
      for (let i = 0; i < 4; i++) { await tb.goster(i, 350); await c.wait(250); }
    })());
    await par(c.say('AC’de N için 1/6 başlar, T için 5/6 biter.', { speak: 'A C’de N için altıda bir başlar, T için altıda beş biter.' }), (async () => {
      await tb.goster(4, 250); await tb.goster(5, 250);
      const v = [['N 1/6', null], ['P 2/6', null], ['R ?', RENK.goruntu], ['S 4/6', null], ['T 5/6', null]];
      for (let i = 0; i < 5; i++) { tb.hucre(i + 1, 1, v[i][0], v[i][1] || RENK.yazi); await c.wait(380); }
    })());
    const tsp = tb.satir.flatMap((t) => [...t.querySelectorAll('tspan')]).filter((t) => t.textContent && t.textContent !== 'AB' && t.textContent !== 'AC');
    await par(c.say('Benzer üçgen için iki kesrin eşit olması gerekir.'), (async () => {
      const eski = tsp.map((t) => t.style.fill);
      tsp.forEach((t) => { t.style.fill = RENK.merkez; }); await c.wait(900);
      tsp.forEach((t, i) => { t.style.fill = eski[i]; });
    })());
    c.clearSay();

    // Birlikte çöz: R'nin yeri.
    const R = ac[3], hr = halka(c, g, R, RENK.goruntu, 13); gizle(hr); await belir(c, hr, 300);
    await c.choice({
      tag: 'Birlikte çöz', q: 'R, AC’nin 6 parçasından 3’ünde. R’nin yeri kaçtır?', options: ['3/4', '3/6', '1/3'], answer: 1,
      hints: ['Pay üçüncü noktayı, payda parça sayısını gösterir: 6.', '', 'R, N’den sonra üçüncü nokta; altı parçadan üçü.'],
      right: 'Evet. Üçüncü nokta, altı parça: 3/6.',
    });
    tb.hucre(3, 1, 'R 3/6', RENK.iyi);
    await c.say('R üçüncü nokta, altı parçadan üçü: 3/6.', { speak: 'R üçüncü nokta, altı parçadan üçü: altıda üç.' });
    c.clearSay();
    await belir(c, hr, 250, 0);

    // Sıra sende: hangi iki nokta aynı yeri gösterir?
    await c.choice({
      tag: 'Sıra sende', q: 'Tabloya bak. Hangi iki nokta aynı yeri gösterir?', options: ['M ve S', 'K ve N', 'L ve R'], answer: 2,
      hints: ['3/4 ile 4/6 aynı değil; 1/4 ile 1/6 da değil.', 'L için 2/4 = 1/2. AC’de 1/2 hangi noktada?', ''],
      right: 'Evet. 2/4 = 1/2 ve 3/6 = 1/2.',
    });
    const hl = halka(c, g, L, RENK.goruntu, 13), hr2 = halka(c, g, R, RENK.goruntu, 13);
    const y1 = harf(c, g, [L[0], L[1]], '1/2', 38, -6, RENK.merkez, 24), y2 = harf(c, g, [R[0], R[1]], '1/2', 0, -22, RENK.merkez, 24);
    gizle(hl, hr2, y1, y2);
    await par(c.say('L, AB’nin yarısında; R, AC’nin yarısında.', { speak: 'L, A B’nin yarısında; R, A C’nin yarısında.' }), par(belir(c, [hl, hr2], 400), belir(c, [y1, y2], 400)));
    // ALR renk alır.
    const LR = cizgi(c, g, L, R, RENK.goruntu, 4), ALR = ucAcik(c, g, [A, L, R], RENK.goruntu, 0.22);
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, L, R], { yayR: 26 });
    const alr = sag(c, g, 150, [['A', EL[0]], ['L', EL[1]], ['R', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
    gizle(alr, LR, ALR.g, kk.g, kk.yayB[1], kk.yayB[2], kk.yayK[1], kk.yayK[2]);
    // L ve B'deki eşit açılar: yöndeş açılar (F), L–R ve B–C paralel.
    const fc = C.aciCift(c, g, 'F', L, Bn, R, Cn, { ust: true, renk: EL[1], r: 28, izRenk: RENK.dogru });
    gizle(fc.g, fc.iz);
    const pLR = cizgi(c, g, L, R, RENK.dogru, 4, { 'stroke-dasharray': '10 8' }), pBC = cizgi(c, g, Bn, Cn, RENK.dogru, 4, { 'stroke-dasharray': '10 8' });
    gizle(pLR, pBC);
    await par(c.say('İki oran eşit, A açısı ortak: ALR ~ ABC.', { speak: 'İki oran eşit, A açısı ortak: A L R, A B C’ye benzerdir.' }), (async () => {
      await par(belir(c, tb.g, 400, 0), belir(c, [hl, hr2, y1, y2], 350, 0), belir(c, [...hAB.filter((_, i) => i !== 1), ...hAC.filter((_, i) => i !== 2)], 350, 0));
      await par(belir(c, LR, 400), belir(c, ALR.g, 400), belir(c, kk.g, 450), belir(c, alr, 450));
    })());
    await par(c.say('Benzer üçgenlerde karşılıklı açılar eşit: ALR açısı ABC açısına eşit.', { speak: 'Benzer üçgenlerde karşılıklı açılar eşit: A L R açısı A B C açısına eşit.' }), (async () => {
      await belir(c, fc.g, 400); await nabiz(c, fc.yay, 900);
    })());
    await par(c.say('Eşit yöndeş açılar: LR çizgisi BC’ye paralel çıkar.', { speak: 'Eşit yöndeş açılar: L R çizgisi B C’ye paralel çıkar.' }), par(belir(c, fc.iz, 500), belir(c, [pLR, pBC], 500)));
    c.note('<b>Hangi çift?</b> Kesirleri yaz; eşit olanları birleştir.', 'Hangi çift?', 'c1-hangi-cift');
  }

  /* ---- 4. Her çift olmaz mı? ---- */
  async function olmaz(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const H = anaHavuz(z), A = H.A, Bn = H.B, Cn = H.C, ab = H.ab, ac = H.ac;
    const K = ab[1], L = ab[2], M = ab[3], S = ac[4];
    const abc = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const nk = C.bolNoktalar(c, g, A, Bn, 4, { renk: RENK.yazi }), nc = C.bolNoktalar(c, g, A, Cn, 6, { renk: RENK.yazi });
    const hk = harf(c, g, K, 'K', -26, 6), hs = harf(c, g, S, 'S', 0, 34);
    const aks = cokgen(c, g, [A, K, S], GRI, { dolgu: 0.22 }); aks.yuz.setAttribute('stroke-width', 3);
    const rast = [[K, ac[5]], [M, ac[1]], [L, ac[4]]].map(([P, Q]) => cizgi(c, g, P, Q, GRI, 2.5, { 'stroke-dasharray': '8 8', 'stroke-opacity': 0.7 }));
    const o1 = sag(c, g, 130, ['|AK|/|AB| = 1/4'], 22), o2 = sag(c, g, 175, ['|AS|/|AC| = 4/6 = 2/3'], 22);
    const o3 = sag(c, g, 230, ['1/4 ≠ 2/3'], 28);
    const kutu = (y, metin) => {
      const gk = c.S('g', {}, g);
      c.S('rect', { x: 700, y, width: 292, height: 50, rx: 8, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, gk);
      const t = renkli(c, gk, 714, y + 33, [metin], { hiza: 'start', size: 23, kalin: 700 });
      return { g: gk, t };
    };
    const k1 = kutu(270, 'AKS: 63°, 101°, 16°'), k2 = kutu(334, 'ABC: 63°, 72°, 45°');
    const bd = sag(c, g, 440, ['benzer değil'], 28);
    gizle(abc.g, nk.g, nc.g, hk, hs, aks.g, rast, o1, o2, o3, k1.g, k2.g, bd);
    await belir(c, [abc.g, nk.g, nc.g], 400);

    await par(c.say('Başka bir çift deneyelim: K ve S.'), par(belir(c, [hk, hs], 350), belir(c, aks.g, 450)));
    await par(c.say('|AK|/|AB| = 1/4; |AS|/|AC| = 4/6 = 2/3.', { speak: 'A K uzunluğu bölü A B uzunluğu eşittir dörtte bir; A S uzunluğu bölü A C uzunluğu eşittir altıda dört, yani üçte iki.' }), par(belir(c, o1, 400), belir(c, o2, 400)));
    await par(c.say('İki kesir eşit değil.'), belir(c, o3, 400));
    await par(c.say('AKS’nin açıları yaklaşık 63°, 101° ve 16°.', { speak: 'A K S’nin açıları yaklaşık altmış üç, yüz bir ve on altı derece.' }), par(belir(c, k1.g, 450), belir(c, [o1, o2], 350, 0)));
    await par(c.say('ABC’nin açıları yaklaşık 63°, 72° ve 45°.', { speak: 'A B C’nin açıları yaklaşık altmış üç, yetmiş iki ve kırk beş derece.' }), belir(c, k2.g, 450));
    await par(c.say('Benzer üçgenlerin açıları karşılıklı eşit olur.'), (async () => {
      const ts = [k1.t, k2.t]; ts.forEach((t) => { t.style.fill = RENK.merkez; }); await c.wait(900); ts.forEach((t) => { t.style.fill = ''; });
    })());
    await par(c.say('Bu açılar tutmuyor: AKS, ABC’ye benzemez.', { speak: 'Bu açılar tutmuyor: A K S, A B C’ye benzemez.' }), (async () => {
      parcaKoy(c, k1.t, ['AKS: 63°, ', ['101°', RENK.merkez], ', ', ['16°', RENK.merkez]]);
      parcaKoy(c, k2.t, ['ABC: 63°, ', ['72°', RENK.merkez], ', ', ['45°', RENK.merkez]]);
      await belir(c, bd, 450);
    })());
    await par(c.say('İki nokta rastgele seçilince çoğu zaman benzer üçgen çıkmaz.', { speak: '[thoughtful] İki nokta rastgele seçilince çoğu zaman benzer üçgen çıkmaz.' }), par(belir(c, [k1.g, k2.g], 350, 0), belir(c, rast, 500, 0.8)));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'K ve S çizgisi neden benzer üçgen vermedi?',
      options: ['İki oran eşit değil: 1/4 ile 2/3', 'A açısı iki üçgende ortak değil', 'K ve S köşe noktası değil'], answer: 0,
      hints: ['', 'A açısı iki üçgende de aynı açıdır.', 'Hangi koşula bakıyorduk? İki kesri karşılaştır.'],
      right: 'Evet. 1/4 ile 2/3 eşit değil.',
    });
    await c.say('1/4 ile 2/3 eşit değil: benzerlik yok.', { speak: 'Dörtte bir ile üçte iki eşit değil: benzerlik yok.' });
    c.note('<b>Rastgele iki nokta</b> çoğu zaman benzer üçgen vermez; oranlar eşit olmalı.', 'Rastgele iki nokta', 'c1-rastgele');
    c.clearSay();
    await sil(c, g, 350);

    // Dene: AB'de sabit nokta, AC'de kayan X.
    await dene(c, svg, z, { ad: 'L', pay: 2, acilar: [27, 53, 72, 83, 90], kesir: '1/2', renk: true, yonerge: 'X’i kaydır; küçük üçgenin renk aldığı yeri bul.' });
    const d2 = await dene(c, svg, z, { ad: 'M', pay: 3, acilar: [17, 36, 53, 66, 76], kesir: '3/4', renk: false, yonerge: 'Şimdi M sabit: renk alan bir yer var mı?', sakla: true });

    // Sıra sende: M için hiçbir nokta yok.
    const g2 = d2.g;
    await belir(c, [d2.pol.g, d2.sec, d2.t2, d2.t3, d2.t4], 300, 0);
    [d2.pol.g, d2.sec, d2.t2, d2.t3, d2.t4].forEach((e) => e.remove());
    const liste = sag(c, g2, 190, ['1/6\u00a0\u00a02/6\u00a0\u00a03/6\u00a0\u00a04/6\u00a0\u00a05/6'], 22);
    gizle(liste); await belir(c, liste, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'AB’de M noktasını (dörtte üç) seçtin. AC’de hangi nokta benzer üçgen verir?',
      options: ['R', 'Hiçbiri; 3/4, AC’deki kesirlerden hiçbirine eşit değil', 'S'], answer: 1,
      hints: ['AC’deki kesirler 1/6’dan 5/6’ya: 1/6, 2/6, 3/6, 4/6, 5/6. 3/4 hangisine eşit?', '', '4/6 = 2/3 ve 5/6; ikisi de 3/4’ten farklı.'],
      right: 'Evet. 3/4 hiçbirine eşit değil.',
    });
    await c.say('AC’deki kesirler 1/6’dan 5/6’ya; 3/4 hiçbirine eşit değil.', { speak: 'A C’deki kesirler altıda birden altıda beşe; dörtte üç hiçbirine eşit değil.' });
    c.clearSay();

    // Sonra: eş bulunmaz / bulunursa.
    const Rr = ac[3];
    const faint = ac.slice(1, 6).map((Q) => cizgi(c, g2, M, Q, GRI, 2.5, { 'stroke-dasharray': '8 8', 'stroke-opacity': 0.7 }));
    gizle(faint);
    await par(c.say('Her nokta için eşit oranlı bir eş bulunmaz.'), belir(c, faint, 450, 0.8));
    const ALR = ucAcik(c, g2, [A, L, Rr], RENK.goruntu, 0.22), kk = C.ortakKose(c, g2, [A, Bn, Cn], [A, L, Rr], { yayR: 26 });
    const hl = harf(c, g2, L, 'L', -26, 6), es = sag(c, g2, 260, [['1/2 = 3/6', RENK.iyi]], 28);
    gizle(ALR.g, kk.g, hl, es);
    await par(c.say('Eş bulunursa küçük üçgen büyüğüne benzer.'), (async () => {
      await par(belir(c, faint, 300, 0), belir(c, liste, 300, 0));
      await par(belir(c, ALR.g, 450), belir(c, kk.g, 450), belir(c, hl, 450), belir(c, es, 450));
    })());
  }

  /* Dene paneli: AB'de sabit nokta (ad; pay/4) ve AC'de kayan X; kaydırıcı 1–5 (N, P, R, S, T).
     o: { ad, pay, acilar (5 değer), kesir ('1/2'), renk (R'de küçük üçgen renk alır), yonerge, sakla (true: tahtayı silme, nesneleri dön) } */
  async function dene(c, svg, z, o) {
    const g = c.S('g', {}, svg), H = anaHavuz(z), A = H.A, Bn = H.B, Cn = H.C, S0 = H.ab[o.pay], ac = H.ac, ad = o.ad;
    cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    nokta(c, g, S0, RENK.yazi, 6); harf(c, g, S0, ad, -26, 6);
    const nm = ['N', 'P', 'R', 'S', 'T'];
    nm.forEach((s, i) => { nokta(c, g, ac[i + 1], RENK.yazi, 5); harf(c, g, ac[i + 1], s, 0, 34); });
    const pol = cokgen(c, g, [A, S0, ac[1]], GRI, { dolgu: 0.22 });
    const kg = o.renk ? C.ortakKose(c, g, [A, Bn, Cn], [A, S0, ac[3]], { yayR: 26 }) : null;
    if (kg) gizle(kg.g);
    const sec = halka(c, g, ac[1], RENK.merkez, 11);
    sag(c, g, 130, ['|A' + ad + '|/|AB| = ' + o.kesir], 23);
    const t2 = sag(c, g, 178, ['|AX|/|AC| = 1/6'], 23), t3 = sag(c, g, 245, [ad + ' açısı = 27°'], 23);
    const t4 = sag(c, g, 292, ['B açısı = 72°'], 23);
    const ayarla = (v) => {
      const i = +v - 1, es = o.renk && i === 2, X = ac[i + 1];
      pol.koy([A, S0, X]);
      sec.setAttribute('cx', X[0]); sec.setAttribute('cy', X[1]);
      pol.yuz.setAttribute('fill', es ? RENK.goruntu : GRI); pol.yuz.setAttribute('stroke', es ? RENK.goruntu : GRI); pol.yuz.setAttribute('stroke-width', es ? 0 : 3);
      if (kg) kg.g.style.opacity = es ? 1 : 0;
      parcaKoy(c, t2, ['|AX|/|AC| = ', [(i + 1) + '/6', es ? RENK.iyi : RENK.yazi]]);
      parcaKoy(c, t3, [[ad + ' açısı = ' + o.acilar[i] + '°', es ? RENK.iyi : RENK.yazi]]);
    };
    gizle(g); ayarla(1); await belir(c, g, 400);
    await c.say(o.yonerge, { noWait: true });
    const sl = c.slider({ label: 'AC üzerindeki X noktası', min: 1, max: 5, step: 1, value: 1, fmt: (v) => nm[+v - 1], onInput: ayarla });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    if (!o.sakla) { await belir(c, g, 300, 0); g.remove(); }
    return { g, pol, sec, t2, t3, t4 };
  }

  /* ---- 5. Tarladaki direkler ---- */
  async function direkler(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    /* Tarla: A (üstte), F (dik köşe), M; AF'de na, FM'de nf aralık; nokta listeleri F'den uzağa doğru. */
    const tarla = (g, A, F, M, na, nf, harfler) => {
      const t = cokgen(c, g, [A, F, M], RENK.sekil);
      const bA = C.bolNoktalar(c, g, F, A, na, { renk: RENK.yazi, r: 4.5 }), bM = C.bolNoktalar(c, g, F, M, nf, { renk: RENK.yazi, r: 4.5 });
      [A, F, M].forEach((P) => nokta(c, g, P, RENK.yazi, 5));
      return { t, bA, bM };
    };
    const g = c.S('g', {}, svg);
    const A = z.P(1, 3), F = z.P(1, 9), M = z.P(10, 9);
    const T = tarla(g, A, F, M, 6, 9);
    const Cd = T.bA.pts[4], J = T.bM.pts[6];                    // F'den 4 aralık yukarıda C, F'den 6 aralık sağda J
    const hA = harf(c, g, A, 'A', -22, 8), hF = harf(c, g, F, 'F', -22, 30), hM = harf(c, g, M, 'M', 22, 30);
    const hC = harf(c, g, Cd, 'C', 26, -8, RENK.goruntu), hJ = harf(c, g, J, 'J', 0, -24, RENK.goruntu);
    const n6 = yazi(c, g, 50, 302, '6 aralık', { size: 24, kalin: 700 }), n9 = yazi(c, g, 330, 456, '9 aralık', { size: 24, kalin: 700 });
    const e108 = B.kenarEtiketi(c, g, A, M, '108 m', RENK.yazi, { merkez: F, uzak: 16 });
    const tel = cizgi(c, g, Cd, J, RENK.goruntu, 5);
    const hCj = [nokta(c, g, Cd, RENK.goruntu, 8), nokta(c, g, J, RENK.goruntu, 8)];
    const q = sag(c, g, 130, [['|CJ| = ?', RENK.goruntu]]);
    const hFC = cizgi(c, g, F, Cd, RENK.merkez, 7), hFJ = cizgi(c, g, F, J, RENK.merkez, 7);
    n6.setAttribute('transform', 'rotate(-90 50 302)');
    const l4 = yazi(c, g, 98, 342, '4', { size: 24, kalin: 700, renk: RENK.merkez }), l6 = yazi(c, g, 190, 452, '6', { size: 24, kalin: 700, renk: RENK.merkez });
    const dik = aciYayi(c, g, F, A, M, EL[0], 30, { dik: true });
    const f1 = sag(c, g, 210, ['|CF|/|AF| = 4/6'], 22), f2 = sag(c, g, 250, ['|FJ|/|FM| = 6/9'], 22);
    const kk = C.ortakKose(c, g, [F, A, M], [F, Cd, J], { dik: 0, yayR: 28 });
    const benz = sag(c, g, 330, [['C', EL[1]], ['F', EL[0]], ['J', EL[2]], ' ~ ', ['A', EL[1]], ['F', EL[0]], ['M', EL[2]]]);
    const g1 = sag(c, g, 210, ['|CJ|/|AM| = 2/3'], 22), g2 = sag(c, g, 250, ['|CJ| = 2/3 × 108'], 22), g3 = sag(c, g, 290, [['|CJ| = 72 m', RENK.iyi]], 25);
    gizle(g, hA, hF, hM, hC, hJ, n6, n9, e108, tel, hCj, q, hFC, hFJ, l4, l6, dik, f1, f2, kk.g, benz, g1, g2, g3);

    await par(c.say('Üçgen biçimli bir tarlanın kenarlarına 16 direk dikilmiş.', { speak: 'Üçgen biçimli bir tarlanın kenarlarına on altı direk dikilmiş.' }), (async () => {
      await belir(c, g, 500); await belir(c, [hA, hF, hM], 350);
    })());
    await par(c.say('Direkler eşit aralıklı: AF kenarında 6, FM kenarında 9 aralık.', { speak: 'Direkler eşit aralıklı: A F kenarında altı, F M kenarında dokuz aralık.' }), belir(c, [n6, n9], 450));
    await par(c.say('A ile M direkleri arası 108 m.', { speak: 'A ile M direkleri arası yüz sekiz metre.' }), belir(c, e108, 450));
    await par(c.say('Mühendis iki direk seçip aralarına tel çekecek.'), par(belir(c, hCj, 350), belir(c, tel, 450)));
    await par(c.say('Teli ölçmeden hesaplamak istiyor.', { speak: '[curious] Teli ölçmeden hesaplamak istiyor.' }), par(belir(c, [hC, hJ], 350), belir(c, q, 400)));
    await par(c.say('C direği F’den 4, J direği F’den 6 aralık uzakta.', { speak: 'C direği F’den dört, J direği F’den altı aralık uzakta.' }), par(belir(c, [hFC, hFJ], 350), belir(c, [l4, l6], 350)));
    await par(c.say('F’deki dik açı ortak: |CF|/|AF| = 4/6 ve |FJ|/|FM| = 6/9.', { speak: 'F’deki dik açı ortak: C F uzunluğu bölü A F uzunluğu eşittir altıda dört ve F J uzunluğu bölü F M uzunluğu eşittir dokuzda altı.' }), par(belir(c, dik, 400), belir(c, f1, 400), belir(c, f2, 400), belir(c, [hFC, hFJ, l4, l6, q, n6, n9], 300, 0)));
    await par(c.say('İki oran da 2/3: CFJ ~ AFM.', { speak: 'İki oran da üçte iki: C F J, A F M’ye benzerdir.' }), (async () => {
      parcaKoy(c, f1, ['|CF|/|AF| = 4/6 = ', ['2/3', RENK.merkez]]); parcaKoy(c, f2, ['|FJ|/|FM| = 6/9 = ', ['2/3', RENK.merkez]]);
      await par(belir(c, kk.g, 450), belir(c, benz, 450), belir(c, tel, 300, 0), belir(c, dik, 300, 0));
    })());
    await par(c.say('|CJ|/|AM| = 2/3 olduğundan |CJ| = 2/3 × 108.', { speak: 'C J uzunluğu bölü A M uzunluğu eşittir üçte iki olduğundan C J uzunluğu, üçte iki çarpı yüz sekiz.' }), (async () => {
      await par(belir(c, [f1, f2], 300, 0));
      await par(belir(c, g1, 400), belir(c, g2, 400));
    })());
    await par(c.say('|CJ| = 72 m: tel ölçmeden bulundu.', { speak: 'C J uzunluğu yetmiş iki metre: tel ölçmeden bulundu.' }), belir(c, g3, 450));
    c.clearSay();
    await sil(c, g, 350);

    // Birlikte çöz: D ve H, oran 1/3.
    const g4 = c.S('g', {}, svg);
    const T4 = tarla(g4, A, F, M, 6, 9), D4 = T4.bA.pts[2], H4 = T4.bM.pts[3];
    harf(c, g4, A, 'A', -22, 8); harf(c, g4, F, 'F', -22, 30); harf(c, g4, M, 'M', 22, 30);
    harf(c, g4, D4, 'D', -22, 8, RENK.goruntu); harf(c, g4, H4, 'H', 0, -24, RENK.goruntu);
    B.kenarEtiketi(c, g4, A, M, '108 m', RENK.yazi, { merkez: F, uzak: 16 });
    C.ortakKose(c, g4, [F, A, M], [F, D4, H4], { dik: 0, yayR: 28 });
    const fa = sag(c, g4, 150, ['|DF|/|AF| = 2/6 = 1/3'], 22), fb = sag(c, g4, 195, ['|FH|/|FM| = 3/9 = 1/3'], 22);
    sag(c, g4, 255, [['D', EL[1]], ['F', EL[0]], ['H', EL[2]], ' ~ ', ['A', EL[1]], ['F', EL[0]], ['M', EL[2]]]);
    const sor4 = sag(c, g4, 320, [['|DH| = ?', RENK.goruntu]]);
    gizle(g4); await belir(c, g4, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'D direği F’den 2, H direği F’den 3 aralıkta. D ile H arasındaki tel kaç metredir?', options: ['72 m', '54 m', '36 m'], answer: 2,
      hints: ['72 m, 2/3 oranının sonucuydu.', 'İki oran da 1/3: tel, 108’in üçte biri.', ''],
      right: 'Evet. Üçte bir çarpı 108: 36 m.',
    });
    parcaKoy(c, sor4, [['|DH| = 1/3 × 108', RENK.iyi]]);
    const s36 = sag(c, g4, 360, [['= 36 m', RENK.iyi]]);
    gizle(s36); await par(belir(c, s36, 350), belir(c, [fa, fb], 350, 0));
    await c.say('Üçte bir çarpı 108: |DH| = 36 m.', { speak: 'Üçte bir çarpı yüz sekiz: D H uzunluğu otuz altı metre.' });
    c.clearSay();
    await sil(c, g4, 350);

    // Sıra sende: yeni tarla; AF 8, FM 12 aralık, |AM| = 52 m.
    const g5 = c.S('g', {}, svg);
    const A5 = z.P(1, 2), F5 = z.P(1, 10), M5 = z.P(13, 10);
    const T5 = tarla(g5, A5, F5, M5, 8, 12), D5 = T5.bA.pts[6], H5 = T5.bM.pts[9];
    harf(c, g5, A5, 'A', -22, 8); harf(c, g5, F5, 'F', -22, 30); harf(c, g5, M5, 'M', 22, 30);
    harf(c, g5, D5, 'D', -22, 8, RENK.goruntu); harf(c, g5, H5, 'H', 0, -24, RENK.goruntu);
    B.kenarEtiketi(c, g5, A5, M5, '52 m', RENK.yazi, { merkez: F5, uzak: 16 });
    const tel5 = cizgi(c, g5, D5, H5, RENK.goruntu, 5);
    const sor5 = sag(c, g5, 150, [['|DH| = ?', RENK.goruntu]]);
    gizle(g5); await belir(c, g5, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Bu tarlada F’den 6 aralıktaki direk ile F’den 9 aralıktaki direk arasına tel çekiliyor. Tel kaç metredir?',
      options: ['13 m', '39 m', '46 m'], answer: 1,
      hints: ['İkisi de 3/4; tel |AM|’nin dörtte üçü.', '', 'Önce oranlar: 6/8 ve 9/12.'],
      right: 'Evet. Oranlar 3/4; tel 3/4 × 52 = 39 m.',
    });
    parcaKoy(c, sor5, [['|DH| = 3/4 × 52', RENK.iyi]]);
    const s39 = sag(c, g5, 190, [['= 39 m', RENK.iyi]]); gizle(s39); await belir(c, s39, 350);
    const kk5 = C.ortakKose(c, g5, [F5, A5, M5], [F5, D5, H5], { dik: 0, yayR: 28 }); gizle(kk5.g);
    await par(belir(c, kk5.g, 450), belir(c, tel5, 350, 0));
    await c.say('Oranlar 3/4: |DH| = 3/4 × 52 = 39 m.', { speak: 'Oranlar dörtte üç: D H uzunluğu, dörtte üç çarpı elli iki, otuz dokuz metre.' });
    await c.say('Bölme noktalarını aynı oranda seçince ölçmeye gerek kalmaz.');
    c.note('<b>Küçük kenar = oran × büyük kenar.</b> 2/3 × 108 = 72.', 'Küçük kenar', 'c1-kucuk-kenar');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-c1', kicker: 'Konu C · Benzer üçgenler oluşturma', title: 'İki kenarı aynı oranda böl', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'İki kenarı aynı oranda böl',
      hook: 'Üçgen bir havuzu <b>tek bir düz bölmeyle</b> ayırıp aynı biçimde küçük bir havuz elde edebilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['İki kenarda ortak köşeden aynı oranda alınan noktaların küçük bir benzer üçgen verdiğini söyler.', 'Rastgele alınan iki noktanın çoğu zaman benzer üçgen vermediğini gösterir.', 'Benzerlik oranından küçük üçgenin kenarını hesaplar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kenar-Açı-Kenar ve benzerlik oranını hatırla.', run: hatirla },
      { title: 'Havuza bölme koy', goal: 'İki kenarda oranlar eşitse küçük üçgen büyüğüne benzer.', run: havuz },
      { title: 'Bölünmüş kenarlar', goal: 'Noktaların yerini kesirle yaz; eşit olanları birleştir.', run: bolunmus },
      { title: 'Her çift olmaz mı?', goal: 'Oranlar eşit değilse küçük üçgen benzer olmaz.', run: olmaz },
      { title: 'Tarladaki direkler', goal: 'Benzer üçgenle ölçmeden uzunluk hesapla.', run: direkler },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Ali, AB üzerinde bir D, AC üzerinde bir E noktası seçip birleştirdi ve “iki nokta da kenar üzerinde, o hâlde ADE üçgeni ABC’ye benzerdir” dedi. Ali için hangisi doğrudur?',
        options: ['Doğru; A açısı iki üçgende ortak', 'Yanlış; |AD|/|AB| ile |AE|/|AC| eşit olmalı', 'Doğru; iki noktanın farklı kenarlarda olması yeter'], answer: 1,
        why: ['A açısının ortak olması tek başına yetmez; onu çevreleyen kenarların oranı da eşit olmalı.', 'Kenar-Açı-Kenar için |AD|/|AB| = |AE|/|AC| olmalı; rastgele iki nokta çoğu zaman bunu sağlamaz.', 'Noktaların farklı kenarlarda olması yetmez; oranlar eşit değilse üçgenler benzer olmaz.'],
        scene: 1,
      },
      {
        q: 'ABC dik üçgeninde |AB| = 12 cm, |AC| = 16 cm ve |BC| = 20 cm’dir. D, AB üzerinde |AD| = 9 cm olacak biçimde; E, AC üzerinde |AE| = 12 cm olacak biçimde alınıyor. |DE| kaç cm’dir?',
        options: ['11 cm', '27 cm', '15 cm'], answer: 2,
        why: ['11 cm bir farktan çıkar; oranlar eşit olduğundan |DE|, |BC|’nin dörtte üçü olmalı.', 'Küçük üçgenin kenarı büyük üçgenin karşılık gelen kenarından uzun olamaz; 27 cm, 20 cm’den büyük.', '9/12 = 12/16 = 3/4 olduğundan |DE| = 3/4 × 20 = 15 cm.'],
        scene: 1,
      },
      {
        q: 'Bir üçgenin AB kenarı 5 eşit, AC kenarı 10 eşit parçaya bölünmüş. AB üzerinde A’dan 2. nokta ile AC üzerinde A’dan kaçıncı nokta birleştirilirse benzer üçgen oluşur?',
        options: ['4. nokta', '2. nokta', '5. nokta'], answer: 0,
        why: ['AB’de yer 2/5; AC’de 4. nokta 4/10 = 2/5 verir, oranlar eşit olur.', 'AC’de 2. nokta 2/10 verir; 2/5 ile eşit değildir.', 'AC’de 5. nokta 5/10 = 1/2 verir; 2/5 ile eşit değildir.'],
        scene: 2,
      },
      {
        q: 'Bir tarlada AF kenarı 9, FM kenarı 12 eşit aralığa bölünmüş ve |AM| = 75 m. F’den 6 aralıktaki direk ile F’den 8 aralıktaki direk arasındaki tel kaç metredir?',
        options: ['25 m', '50 m', '69 m'], answer: 1,
        why: ['25 m, 1/3 oranının sonucudur; burada oran 2/3.', 'Oranlar 6/9 ve 8/12, ikisi de 2/3; tel 2/3 × 75 = 50 m.', 'Kenarlar fark değil çarpanla bulunur; 75 m’nin 2/3’ü 69 m değildir.'],
        scene: 4,
      },
      {
        q: '|AD|/|AB| = |AE|/|AC| ve A açısı ortak olduğuna göre ADE ile ABC hangi koşula göre benzerdir?',
        options: ['Açı-Açı', 'Kenar-Kenar-Kenar', 'Kenar-Açı-Kenar'], answer: 2,
        why: ['Açı-Açı iki açının eşit olmasını ister; burada bir açı ve iki kenar oranı var.', 'Kenar-Kenar-Kenar üç kenar oranını ister; burada iki kenar oranı ve aradaki açı var.', 'İki kenar orantılı ve aralarındaki A açısı ortak: Kenar-Açı-Kenar.'],
        scene: 1,
      },
    ],
    summary: [
      'İki kenarda aynı oranda alınan noktalar küçük bir benzer üçgen verir.',
      'Rastgele alınan noktalar çoğu zaman vermez.',
      '<b>Aynı oranda böl, benzer üçgen çıksın.</b>',
      'Küçük kenar, oran çarpı büyük kenardır.',
    ],
    nextLesson: { href: 'c2-kenara-paralel.html', label: 'Sonraki: Kenara paralel çiz ›' },
  });
})();
