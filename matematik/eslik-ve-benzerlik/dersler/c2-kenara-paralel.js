/* C2 — Kenara paralel çiz
   Üçgenin bir kenarına paralel çizilen doğru, üçgenin içinde, dışında ya da köşenin öbür yanında ona benzer bir üçgen oluşturur.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/C-benzer-ucgenler-olusturma.md (C2)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, rad, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciYayi, aciIci } = window.KIT;
  const B = window.KIT_B;
  const C = window.KIT_C;
  const EL = C.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift
  const GRI = 'var(--muted)';
  const TUR = 'var(--c6)';                          // bilinmeyen açı
  const DASH = { 'stroke-dasharray': '10 8' };
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
  /* Tek tek çizgilerin (ya da yolların) kalınlığı bir kez artıp azalır. */
  const kalinlas = (c, hatlar, w0 = 4, ms = 900) => c.tween(ms, (e) => hatlar.forEach((h) => h.setAttribute('stroke-width', w0 + 3.5 * Math.sin(Math.PI * e))));
  const halka = (c, p, P, renk = RENK.merkez, r = 12) => c.S('circle', { cx: P[0], cy: P[1], r, fill: 'none', stroke: renk, 'stroke-width': 3.5 }, p);
  const harf = (c, p, P, ad, dx, dy, renk = RENK.yazi, size = 24) => yazi(c, p, P[0] + dx, P[1] + dy, ad, { size, kalin: 700, renk });
  const ucAcik = (c, p, pts, renk, dolgu = 0.2) => { const t = cokgen(c, p, pts, renk, { dolgu }); t.yuz.setAttribute('stroke-width', 0); return t; };
  /* P'den Q'ya doğru uzayan kesikli uzantı: { l, git(ms) }. */
  const uzat = (c, p, P, Q) => {
    const l = cizgi(c, p, P, P, RENK.cizgi, 3, { 'stroke-dasharray': '8 8' });
    return { l, git: (ms = 700) => c.tween(ms, (e) => koy(l, P, ara(P, Q, e))) };
  };
  const ucgenKenar = (c, p, Q, w = 4) => [cizgi(c, p, Q[1], Q[2], EL[0], w), cizgi(c, p, Q[2], Q[0], EL[1], w), cizgi(c, p, Q[0], Q[1], EL[2], w)];
  /* P–Q doğrusunun yanına kay kadar kaydırılmış, uçlarında kısa çizgi olan parantez ve ortasında yazı (bir uzunluğun kaç parça olduğunu gösterir). */
  const parantez = (c, p, P, Q, kay, metin, renk = RENK.yazi) => {
    const gb = c.S('g', {}, p), d = Math.hypot(kay[0], kay[1]), u = [kay[0] / d, kay[1] / d];
    const P2 = [P[0] + kay[0], P[1] + kay[1]], Q2 = [Q[0] + kay[0], Q[1] + kay[1]];
    cizgi(c, gb, P2, Q2, renk, 2.5);
    [[P, P2], [Q, Q2]].forEach(([X, X2]) => cizgi(c, gb, X2, [X[0] + kay[0] * 0.55, X[1] + kay[1] * 0.55], renk, 2.5));
    const M = ara(P2, Q2, 0.5);
    yazi(c, gb, M[0] + u[0] * 46, M[1] + u[1] * 46 + 8, metin, { size: 24, kalin: 700, renk });
    return gb;
  };
  /* Tabanı A'da, taban açıları al ve be olan üçgen (ekran y aşağı). */
  const ucAci = (A, L, al, be) => {
    const ac = (L * Math.sin(rad(be))) / Math.sin(rad(al + be));
    return [A, [A[0] + L, A[1]], [A[0] + ac * Math.cos(rad(al)), A[1] - ac * Math.sin(rad(al))]];
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Soru 1: benzerlik oranından küçük kenar.
    const g1 = c.S('g', {}, svg);
    const A = [500, 110], Bn = [250, 430], Cn = [750, 430], D = ara(A, Bn, 1 / 3), E = ara(A, Cn, 1 / 3);
    cokgen(c, g1, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g1, [A, D, E], RENK.goruntu, 0.22);
    cizgi(c, g1, D, E, RENK.goruntu, 4);
    C.bolNoktalar(c, g1, A, Bn, 3, { cent: true, nokta: false, renk: RENK.yazi });
    C.bolNoktalar(c, g1, A, Cn, 3, { cent: true, nokta: false, renk: RENK.yazi });
    nokta(c, g1, D, RENK.goruntu, 7); nokta(c, g1, E, RENK.goruntu, 7);
    harf(c, g1, D, 'D', -26, -2, RENK.goruntu); harf(c, g1, E, 'E', 26, -2, RENK.goruntu);
    B.kenarEtiketi(c, g1, Bn, Cn, '12 m', RENK.yazi, { merkez: A, uzak: 18 });
    const s1 = yazi(c, g1, 640, 232, '|DE| = ?', { hiza: 'start', size: 28, kalin: 700, renk: RENK.goruntu });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC üçgeninde D, AB üzerinde; E, AC üzerinde ve |AD|/|AB| = |AE|/|AC| = 1/3. |BC| = 12 m ise |DE| kaç metredir?',
      options: ['9 m', '4 m', '36 m'], answer: 1,
      hints: ['Benzerlik oranı 1/3: |DE| = 1/3 × 12 = 4.', '', 'Benzerlik oranı 1/3: |DE| = 1/3 × 12 = 4.'],
      right: 'Evet. Oran 1/3, |DE| = 4 m.',
    });
    cevapla(s1, '|DE| = 4 m');
    await c.say('Oran 1/3: |DE| = 1/3 × 12 = 4.', { speak: 'Oran üçte bir: D E uzunluğu, üçte bir çarpı on iki, dört.' });
    c.clearSay();
    await sil(c, g1, 350);

    // Soru 2: iki açı eşitse üçüncü de eşit.
    const g2 = c.S('g', {}, svg);
    const T1 = ucAci([120, 420], 240, 50, 60), T2 = ucAci([580, 420], 260, 60, 70);
    cokgen(c, g2, T1, RENK.sekil); cokgen(c, g2, T2, RENK.goruntu);
    const acilar = [[T1, 0, 50, RENK.sekil], [T1, 1, 60, RENK.sekil], [T2, 0, 60, RENK.goruntu], [T2, 1, 70, RENK.goruntu]];
    acilar.forEach(([T, i, d, renk]) => {
      const V = T[i], P = T[(i + 1) % 3], Q = T[(i + 2) % 3];
      aciYayi(c, g2, V, P, Q, renk, 30);
      const m = aciIci(V, P, Q, 64);
      yazi(c, g2, m[0], m[1] + 8, d + '°', { size: 24, kalin: 700, renk });
    });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir üçgenin iki açısı 50° ve 60°; başka bir üçgenin iki açısı 60° ve 70°. İki üçgen için hangisi doğrudur?',
      options: ['Benzer değildir; açıları farklıdır', 'Bilinemez; kenarlar verilmedi', 'Benzerdir; ikisinin de açıları 50°, 60°, 70°'], answer: 2,
      hints: ['İki açı eşitse üçüncü de eşittir: 180° − 110° = 70° ve 180° − 130° = 50°.', 'İki açı eşitse üçüncü de eşittir: 180° − 110° = 70° ve 180° − 130° = 50°.', ''],
      right: 'Evet. Üçüncü açılar 70° ve 50°.',
    });
    const ucuncu = [[T1, 2, 70, RENK.sekil], [T2, 2, 50, RENK.goruntu]].map(([T, i, d, renk]) => {
      const V = T[i], P = T[(i + 1) % 3], Q = T[(i + 2) % 3], gg = c.S('g', {}, g2);
      aciYayi(c, gg, V, P, Q, RENK.iyi, 30);
      const m = aciIci(V, P, Q, 64);
      yazi(c, gg, m[0], m[1] + 8, d + '°', { size: 24, kalin: 700, renk: RENK.iyi });
      return gg;
    });
    gizle(ucuncu);
    await par(c.say('Üçüncü açılar 70° ve 50°: iki üçgenin de açıları aynı.', { speak: 'Üçüncü açılar yetmiş ve elli derece: iki üçgenin de açıları aynı.' }), belir(c, ucuncu, 450));
  }

  /* ---- 2. Çatıya ara çubuk ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const A = z.P(8, 2), Bn = z.P(3, 7), Cn = z.P(13, 7), D = z.P(6, 4), E = z.P(10, 4);
    const roof = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const et10 = B.kenarEtiketi(c, g, Bn, Cn, '10 m', RENK.yazi, { merkez: A, uzak: 18 });
    const tint = ucAcik(c, g, [A, D, E], RENK.cizgi, 0.14);
    const pr = C.paralel(c, g, Bn, Cn, A, D, { sinir: [A, Bn, Cn] });
    const nk = c.S('g', {}, g);
    nokta(c, nk, D, RENK.yazi, 6); nokta(c, nk, E, RENK.yazi, 6);
    harf(c, nk, D, 'D', -26, -2, EL[1]); harf(c, nk, E, 'E', 26, 0, EL[2]);
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, D, E], { yayR: 26 });
    // Küçük F: iki paralel doğru ve bir kesen, yöndeş açılar eşit işaretli.
    const f = c.S('g', {}, g), X1 = [880, 190], X2 = [810, 300], U1 = [970, 190], U2 = [900, 300];
    cizgi(c, f, [770, 190], [985, 190], RENK.dogru, 3.5, DASH); cizgi(c, f, [750, 300], [985, 300], RENK.dogru, 3.5, DASH);
    cizgi(c, f, ara(X1, X2, -0.25), ara(X1, X2, 1.25), RENK.cizgi, 3.5);
    const cf = C.aciCift(c, f, 'F', X1, X2, U1, U2, { ust: true, renk: RENK.merkez, r: 30 });
    const hAD = cizgi(c, g, A, D, EL[2], 8);
    const tAB = C.bolNoktalar(c, g, A, Bn, 5, { cent: true, nokta: false, renk: RENK.yazi });
    const r1 = sag(c, g, 150, [['A', EL[0]], ['D', EL[1]], ['E', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
    const r2 = sag(c, g, 190, ['(Açı-Açı)']);
    const f1 = sag(c, g, 260, [['|AD|/|AB|', EL[2]]]), f2 = sag(c, g, 300, ['= ', ['|AE|/|AC|', EL[1]]]), f3 = sag(c, g, 340, ['= ', ['|DE|/|BC|', EL[0]]]);
    const h1 = sag(c, g, 400, ['|DE| = 2/5 × 10']), h2 = sag(c, g, 440, [['= 4 m', RENK.iyi]]);
    const et4 = B.kenarEtiketi(c, g, D, E, '4 m', RENK.iyi, { merkez: A, uzak: 18 });
    gizle(roof.g, et10, tint.g, nk, kk.kenarB, kk.kenarK, kk.yayB, kk.yayK, f, hAD, tAB.g, r1, r2, f1, f2, f3, h1, h2, et4);

    await par(c.say('Bir çatı makasında BC kirişi yatay.', { speak: 'Bir çatı makasında B C kirişi yatay.' }), belir(c, [roof.g, et10], 500));
    await par(c.say('Usta kirişe paralel bir ara çubuk takıyor: DE.', { speak: 'Usta kirişe paralel bir ara çubuk takıyor: D E.' }), (async () => {
      await pr.kaydir(1700);
      await par(belir(c, nk, 350), belir(c, tint.g, 400));
    })());
    await par(c.say('İki paralel doğruyu bir doğru keserse yöndeş açılar eşittir.'), (async () => {
      await belir(c, f, 500); await kalinlas(c, cf.yay, 3, 900);
    })());
    await par(c.say('AB doğrusu keser: ADE açısı ile ABC açısı yöndeş.', { speak: 'A B doğrusu keser: A D E açısı ile A B C açısı yöndeş.' }), (async () => {
      await belir(c, [kk.yayB[1], kk.yayK[1]], 450); await nabiz(c, [kk.yayB[1], kk.yayK[1]], 800);
    })());
    await par(c.say('AC doğrusu da keser: AED açısı ile ACB açısı yöndeş.', { speak: 'A C doğrusu da keser: A E D açısı ile A C B açısı yöndeş.' }), (async () => {
      await belir(c, [kk.yayB[2], kk.yayK[2]], 450); await nabiz(c, [kk.yayB[2], kk.yayK[2]], 800);
    })());
    await par(c.say('Böylece ADE açısı ABC açısına, AED açısı ACB açısına eşit.', { speak: 'Böylece A D E açısı A B C açısına, A E D açısı A C B açısına eşit.' }), (async () => {
      await sil(c, f, 400);
      await nabiz(c, [kk.yayB[1], kk.yayK[1], kk.yayB[2], kk.yayK[2]], 900);
    })());
    await par(c.say('A açısı iki üçgende ortak.', { speak: 'A açısı iki üçgende ortak.' }), (async () => {
      await belir(c, kk.yayB[0], 450); await nabiz(c, [kk.yayB[0]], 800);
    })());
    await par(c.say('İki açı eşit: ADE ~ ABC (Açı-Açı).', { speak: 'İki açı eşit: A D E, A B C’ye benzerdir, Açı-Açı.' }), par(belir(c, r1, 450), belir(c, r2, 450)));
    await par(c.say('Benzer üçgenlerde karşılıklı kenarlar orantılıdır.'), (async () => {
      await belir(c, [...kk.kenarB, ...kk.kenarK], 500);
      await kalinlas(c, [...kk.kenarB, ...kk.kenarK], 4, 900);
    })());
    await par(c.say('|AD|/|AB| = |AE|/|AC| = |DE|/|BC|.', { speak: 'A D uzunluğu bölü A B uzunluğu, eşittir A E uzunluğu bölü A C uzunluğu, eşittir D E uzunluğu bölü B C uzunluğu.' }), (async () => {
      await par(belir(c, r1, 350, 0), belir(c, r2, 350, 0));
      r1.remove(); r2.remove();
      await belir(c, f1, 350); await belir(c, f2, 350); await belir(c, f3, 350);
    })());
    await par(c.say('D, AB’nin beş eşit parçasından ikisinde: |AD|/|AB| = 2/5.', { speak: 'D, A B’nin beş eşit parçasından ikisinde: A D uzunluğu bölü A B uzunluğu eşittir beşte iki.' }), (async () => {
      await par(belir(c, tAB.g, 400), vurgula(c, [hAD], 1100));
      parcaKoy(c, f1, [['|AD|/|AB|', EL[2]], ' = ', ['2/5', RENK.merkez]]);
    })());
    await par(c.say('|BC| = 10 m ise |DE| = 2/5 × 10 = 4.', { speak: 'B C uzunluğu on metre ise D E uzunluğu, beşte iki çarpı on, dört.' }), (async () => {
      await belir(c, h1, 450); await c.wait(400); await par(belir(c, h2, 450), belir(c, et4, 450));
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Birlikte çöz: ara çubuk aşağı kaymış, oran 3/5.
    const g2 = c.S('g', {}, svg);
    const D2 = z.P(5, 5), E2 = z.P(11, 5);
    cokgen(c, g2, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g2, [A, D2, E2], RENK.cizgi, 0.14);
    cizgi(c, g2, D2, E2, RENK.dogru, 3.5, DASH);
    const k2 = C.ortakKose(c, g2, [A, Bn, Cn], [A, D2, E2], { yayR: 26 });
    [...k2.kenarB, ...k2.kenarK].forEach((e) => e.remove());
    nokta(c, g2, D2, RENK.yazi, 6); nokta(c, g2, E2, RENK.yazi, 6);
    harf(c, g2, D2, 'D', -26, -2, EL[1]); harf(c, g2, E2, 'E', 26, -2, EL[2]);
    sag(c, g2, 150, ['DE // BC']);
    sag(c, g2, 200, [['A', EL[0]], ['D', EL[1]], ['E', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]], ' (A.A.)']);
    sag(c, g2, 260, ['|AD|/|AB| = ', ['3/5', RENK.merkez]]);
    sag(c, g2, 310, ['|BC| = 10 m']);
    const soru = sag(c, g2, 360, [['|DE| = ?', EL[0]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: '|DE| kaç metredir?', options: ['7 m', '6 m', '16 m'], answer: 1,
      hints: ['Çıkarma değil çarpma: 3/5 × 10.', '', 'Benzerlik oranı 3/5: |DE|, |BC|’nin beşte üçüdür.'],
      right: 'Evet. Beşte üç çarpı on: 6 m.',
    });
    parcaKoy(c, soru, [['|DE| = 6 m', RENK.iyi]]);
    await c.say('|DE| = 3/5 × 10 = 6 m.', { speak: 'D E uzunluğu, beşte üç çarpı on, altı metre.' });
    c.clearSay();
    await sil(c, g2, 350);

    // Sıra sende: A açısı 60°, ADE açısı 70°.
    const g3 = c.S('g', {}, svg);
    const Bs = z.P(3, 9), Cs = z.P(12, 9), As = z.P(5.72, 1.52), Ds = z.P(4.63, 4.51), Es = z.P(8.23, 4.51);
    cokgen(c, g3, [As, Bs, Cs], RENK.sekil, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g3, [As, Ds, Es], RENK.cizgi, 0.14);
    cizgi(c, g3, Ds, Es, RENK.dogru, 3.5, DASH);
    nokta(c, g3, Ds, RENK.yazi, 6); nokta(c, g3, Es, RENK.yazi, 6);
    harf(c, g3, Ds, 'D', -26, -2, EL[1]); harf(c, g3, Es, 'E', 26, -2, EL[2]);
    const aciEt = (V, P, Q, d, r, renk, dis = 62) => {
      const gg = c.S('g', {}, g3), m = aciIci(V, P, Q, dis);
      aciYayi(c, gg, V, P, Q, renk, r); yazi(c, gg, m[0], m[1] + 8, d + '°', { size: 24, kalin: 700, renk });
      return gg;
    };
    const gA = c.S('g', {}, g3);
    aciYayi(c, gA, As, Bs, Cs, RENK.merkez, 34); yazi(c, gA, As[0] + 50, As[1] + 22, '60°', { size: 24, kalin: 700, renk: RENK.merkez });
    aciEt(Ds, As, Es, 70, 26, RENK.merkez, 56);
    sag(c, g3, 150, ['DE // BC']);
    const s3 = sag(c, g3, 200, [['ACB açısı = ?', TUR]]);
    const gor = [aciEt(Bs, As, Cs, 70, 30, RENK.iyi, 66), aciEt(Cs, As, Bs, 50, 30, RENK.iyi, 66), aciEt(Es, Ds, As, 50, 22, RENK.iyi, 46)];
    gizle(g3, gor); await belir(c, g3, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'DE // BC çizildi. A açısı 60°, ADE açısı 70°. ACB açısı kaç derecedir?', options: ['50°', '60°', '70°'], answer: 0,
      hints: ['', 'Yöndeş açılar eşit: ABC açısı da 70°.', 'ABC’de iç açılar toplamı 180°: 180° − 60° − 70°.'],
      right: 'Evet. 180° − 60° − 70° = 50°.',
    });
    parcaKoy(c, s3, [['ACB açısı = 50°', RENK.iyi]]);
    await par(c.say('ABC’nin açıları 60°, 70°, 50°; ADE’nin açıları aynı.', { speak: 'A B C’nin açıları altmış, yetmiş, elli derece; A D E’nin açıları aynı.' }), belir(c, gor, 450));
    c.note('<b>Paralel çizgi:</b> ADE ~ ABC (Açı-Açı); |AD|/|AB| = |DE|/|BC|.', 'Paralel çizgi', 'c2-paralel-cizgi');
  }

  /* ---- 3. Hangi kenar hangisi? ---- */
  async function kenarlar(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const A = z.P(2, 1), Bn = z.P(2, 9), Cn = z.P(14, 9), D = z.P(2, 7), E = z.P(11, 7);
    const tri = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const tint = ucAcik(c, g, [A, D, E], RENK.cizgi, 0.14);
    const de = cizgi(c, g, D, E, RENK.dogru, 3.5, DASH);
    const nk = c.S('g', {}, g);
    nokta(c, nk, D, RENK.yazi, 6); nokta(c, nk, E, RENK.yazi, 6);
    harf(c, nk, D, 'D', -26, 6, EL[1]); harf(c, nk, E, 'E', 16, -14, EL[2]);
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, D, E], { w: 4 });
    [...kk.yayB, ...kk.yayK].forEach((e) => e.remove());
    const db = cizgi(c, g, D, Bn, GRI, 7);
    // Yan kutu: iki üçgen, karşılıklı kenarlar aynı renkte.
    const gs = c.S('g', {}, g);
    c.S('rect', { x: 700, y: 108, width: 275, height: 340, rx: 8, fill: 'none', stroke: RENK.kenarlik, 'stroke-width': 2 }, gs);
    const mK = [[760, 150], [760, 234], [886, 234]], mB = [[760, 290], [760, 402], [928, 402]];
    const kenK = ucgenKenar(c, gs, mK), kenB = ucgenKenar(c, gs, mB);
    [['A', mK[0], -22, 6], ['D', mK[1], -22, 8], ['E', mK[2], 6, 28], ['A', mB[0], -22, 6], ['B', mB[1], -22, 8], ['C', mB[2], 6, 28]].forEach(([s, P, dx, dy]) => harf(c, gs, P, s, dx, dy, RENK.yazi, 22));
    const e6 = B.kenarEtiketi(c, g, A, D, '6 m', RENK.yazi, { merkez: Cn, uzak: 10 });
    const e2 = B.kenarEtiketi(c, g, D, Bn, '2 m', RENK.yazi, { merkez: Cn, uzak: 10 });
    const e12 = B.kenarEtiketi(c, g, Bn, Cn, '12 m', RENK.yazi, { merkez: A, uzak: 18 });
    const o1 = sag(c, g, 150, [['|AD|/|AB|', EL[2]]]), o2 = sag(c, g, 190, ['= ', ['|DE|/|BC|', EL[0]]]);
    const ab = sag(c, g, 150, ['|AB| = 8']);
    const p1 = sag(c, g, 250, [['|AD|/|AB| = 6/8', EL[2]]]), p2 = sag(c, g, 290, ['= ', ['3/4', RENK.merkez]]);
    const q1 = sag(c, g, 350, ['|DE| = 3/4 × 12']), q2 = sag(c, g, 390, [['= 9 m', RENK.iyi]]);
    gizle(tri.g, tint.g, de, nk, kk.kenarB, kk.kenarK, db, gs, e6, e2, e12, o1, o2, ab, p1, p2, q1, q2);

    await par(c.say('ADE ile ABC benzer: ADE küçük, ABC büyük üçgendir.', { speak: 'A D E ile A B C benzer: A D E küçük, A B C büyük üçgendir.' }), (async () => {
      await belir(c, tri.g, 450); await par(belir(c, tint.g, 350), belir(c, de, 450), belir(c, nk, 450));
    })());
    await par(c.say('Oran kurarken küçük üçgenin kenarı büyüğündeki karşılığıyla eşlenir.'), (async () => {
      await par(belir(c, [...kk.kenarB, ...kk.kenarK], 450), belir(c, gs, 450));
    })());
    await par(c.say('AD, ADE’nin kenarı; karşılığı ABC’de AB’dir.', { speak: 'A D, A D E’nin kenarı; karşılığı A B C’de A B’dir.' }), kalinlas(c, [kk.kenarK[2], kk.kenarB[2], kenK[2], kenB[2]], 4, 1200));
    await par(c.say('DB, AB’nin ADE’nin dışında kalan parçasıdır; karşılığı yoktur.', { speak: 'D B, A B’nin A D E’nin dışında kalan parçasıdır; karşılığı yoktur.' }), belir(c, db, 500));
    await par(c.say('Doğru oran: |AD|/|AB| = |DE|/|BC|.', { speak: 'Doğru oran: A D uzunluğu bölü A B uzunluğu eşittir D E uzunluğu bölü B C uzunluğu.' }), (async () => {
      await belir(c, gs, 400, 0); await par(belir(c, o1, 400), belir(c, o2, 400));
    })());
    await par(c.say('|AD| = 6, |DB| = 2 ise |AB| = 8.', { speak: 'A D uzunluğu altı, D B uzunluğu iki ise A B uzunluğu sekiz.' }), (async () => {
      await par(belir(c, [e6, e2], 400), belir(c, [o1, o2], 350, 0));
      await belir(c, ab, 400);
    })());
    await par(c.say('Oran |AD|/|AB| = 6/8 = 3/4.', { speak: 'Oran: A D uzunluğu bölü A B uzunluğu, sekizde altı, yani dörtte üç.' }), (async () => {
      await belir(c, ab, 300, 0); await belir(c, p1, 400); await belir(c, p2, 400);
    })());
    await par(c.say('|BC| = 12 m ise |DE| = 3/4 × 12 = 9.', { speak: 'B C uzunluğu on iki metre ise D E uzunluğu, dörtte üç çarpı on iki, dokuz.' }), (async () => {
      await par(belir(c, e12, 400), belir(c, [p1, p2], 300, 0));
      await belir(c, q1, 400); await c.wait(400); await belir(c, q2, 400);
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Sıra sende: |AD| = 3, |DB| = 5, |DE| = 3.
    const g2 = c.S('g', {}, svg);
    const A2 = z.P(2, 1), B2 = z.P(2, 9), C2 = z.P(10, 9), D2 = z.P(2, 4), E2 = z.P(5, 4);
    cokgen(c, g2, [A2, B2, C2], RENK.sekil, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g2, [A2, D2, E2], RENK.cizgi, 0.14);
    cizgi(c, g2, D2, E2, RENK.dogru, 3.5, DASH);
    nokta(c, g2, D2, RENK.yazi, 6); nokta(c, g2, E2, RENK.yazi, 6);
    harf(c, g2, D2, 'D', -26, 6, EL[1]); harf(c, g2, E2, 'E', 16, -10, EL[2]);
    B.kenarEtiketi(c, g2, A2, D2, '3 m', RENK.yazi, { merkez: C2, uzak: 10 });
    B.kenarEtiketi(c, g2, D2, B2, '5 m', RENK.yazi, { merkez: C2, uzak: 10 });
    B.kenarEtiketi(c, g2, D2, E2, '3 m', RENK.yazi, { merkez: A2, uzak: 18 });
    const sq = sag(c, g2, 150, [['|BC| = ?', EL[0]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'DE // BC. |BC| kaç metredir?', options: ['5 m', '8 m', '15 m'], answer: 1,
      hints: ['|AD|/|DB| ile oran kurmak yanlış: DB’nin karşılığı yok.', '', 'Önce |AB|’yi bul: 3 + 5. Sonra |AD|/|AB| = |DE|/|BC|.'],
      right: 'Evet. |AB| = 8; oran 3/8; |BC| = 8 m.',
    });
    const t1 = sag(c, g2, 200, ['|AB| = 3 + 5 = 8']), t2 = sag(c, g2, 250, ['3/8 = 3/|BC|']);
    gizle(t1, t2);
    await par(c.say('|AB| = 3 + 5 = 8.', { speak: 'A B uzunluğu, üç artı beş, sekiz.' }), belir(c, t1, 400));
    parcaKoy(c, sq, [['|BC| = 8 m', RENK.iyi]]);
    await par(c.say('3/8 = 3/|BC| ise |BC| = 8.', { speak: 'Sekizde üç eşittir üç bölü B C uzunluğu ise B C uzunluğu sekiz.' }), belir(c, t2, 400));
    c.note('<b>Oranı kenarla kur:</b> |AD|/|AB| = |DE|/|BC|. DB kullanılmaz.', 'Oranı kenarla kur', 'c2-orani-kenarla-kur');
  }

  /* ---- 4. Kirişin altına inerse ---- */
  async function alt(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const A = z.P(8, 2), Bn = z.P(3, 7), Cn = z.P(13, 7), P = z.P(1, 9), Q = z.P(15, 9);
    const tri = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    tri.adlar[1].setAttribute('x', Bn[0] + 6); tri.adlar[1].setAttribute('y', Bn[1] + 32);
    tri.adlar[2].setAttribute('x', Cn[0] - 6); tri.adlar[2].setAttribute('y', Cn[1] + 32);
    const et10 = B.kenarEtiketi(c, g, Bn, Cn, '10 m', RENK.yazi, { merkez: A, uzak: 18 });
    const uP = uzat(c, g, Bn, P), uQ = uzat(c, g, Cn, Q);
    const pr = C.paralel(c, g, Bn, Cn, Bn, P, { sinir: [A, P, Q] });
    const nk = c.S('g', {}, g);
    nokta(c, nk, P, RENK.yazi, 6); nokta(c, nk, Q, RENK.yazi, 6);
    harf(c, nk, P, 'P', -24, 6, EL[1]); harf(c, nk, Q, 'Q', 24, 6, EL[2]);
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, P, Q], { yayR: 26 });
    const tint = ucAcik(c, g, [A, P, Q], EL[1], 0.1);
    const tk = C.bolNoktalar(c, g, A, P, 7, { cent: true, nokta: false, renk: RENK.yazi });
    const e5 = parantez(c, g, A, Bn, [21, 21], '5 parça');
    const e7 = parantez(c, g, A, P, [-27, -27], '7 parça');
    const r1 = sag(c, g, 150, [['A', EL[0]], ['P', EL[1]], ['Q', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
    const r2 = sag(c, g, 210, ['|AP|/|AB| = ', ['7/5', RENK.merkez]]);
    const r3 = sag(c, g, 270, ['|PQ| = 7/5 × 10']), r4 = sag(c, g, 310, [['= 14 m', RENK.iyi]]);
    const e14 = B.kenarEtiketi(c, g, P, Q, '14 m', RENK.iyi, { merkez: A, uzak: 18 });
    gizle(g, pr.g, nk, kk.kenarB, kk.kenarK, kk.yayB, kk.yayK, tint.g, tk.g, e5, e7, r1, r2, r3, r4, e14);

    await par(c.say('Kenarlar uzatılırsa kirişin altında yeni bir paralel çizilebilir.'), belir(c, g, 450));
    await par(c.say('AB’yi P’ye, AC’yi Q’ya kadar uzatalım; PQ // BC.', { speak: 'A B’yi P’ye, A C’yi Q’ya kadar uzatalım; P Q, B C’ye paralel.' }), (async () => {
      await par(uP.git(800), uQ.git(800));
      await par(belir(c, nk, 350), belir(c, pr.g, 1, 1));
      await pr.kaydir(1500);
    })());
    await par(c.say('Yöndeş açılar yine eşit: APQ açısı ABC açısına eşit.', { speak: 'Yöndeş açılar yine eşit: A P Q açısı A B C açısına eşit.' }), (async () => {
      await belir(c, [kk.yayB[1], kk.yayK[1]], 450); await nabiz(c, [kk.yayB[1], kk.yayK[1]], 800);
    })());
    await par(c.say('AQP açısı ACB açısına eşit; A açısı ortak.', { speak: 'A Q P açısı A C B açısına eşit; A açısı ortak.' }), (async () => {
      await belir(c, [kk.yayB[2], kk.yayK[2], kk.yayB[0]], 450); await nabiz(c, [kk.yayB[2], kk.yayK[2], kk.yayB[0]], 800);
    })());
    await par(c.say('İki açı eşit: APQ ~ ABC; bu kez büyük üçgen.', { speak: 'İki açı eşit: A P Q, A B C’ye benzerdir; bu kez büyük üçgen.' }), par(belir(c, tint.g, 450), belir(c, r1, 450)));
    await par(c.say('AB beş parçadır; AP aynı parçalardan yedi tanedir.', { speak: 'A B beş parçadır; A P aynı parçalardan yedi tanedir.' }), par(belir(c, tk.g, 450), belir(c, [e5, e7], 450)));
    await par(c.say('|AP|/|AB| = 7/5: oran 1’den büyük.', { speak: 'A P uzunluğu bölü A B uzunluğu eşittir beşte yedi: oran birden büyük.' }), (async () => {
      await par(belir(c, [e5, e7, tk.g], 350, 0), belir(c, r1, 350, 0));
      await belir(c, r2, 450);
    })());
    await par(c.say('|PQ| = 7/5 × |BC| = 7/5 × 10 = 14.', { speak: 'P Q uzunluğu, beşte yedi çarpı B C uzunluğu, beşte yedi çarpı on, on dört.' }), (async () => {
      await belir(c, r3, 450); await c.wait(400); await par(belir(c, r4, 450), belir(c, e14, 450));
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Sıra sende: |AB| = 6, |AP| = 9, |BC| = 8.
    const g2 = c.S('g', {}, svg);
    const A2 = z.P(2, 1), B2 = z.P(2, 7), C2 = z.P(10, 7), P2 = z.P(2, 10), Q2 = z.P(14, 10);
    const t2 = cokgen(c, g2, [A2, B2, C2], RENK.sekil, { harf: ['A', 'B', 'C'] });
    t2.adlar[1].setAttribute('x', B2[0] - 26); t2.adlar[1].setAttribute('y', B2[1] - 6);
    t2.adlar[2].setAttribute('x', C2[0] - 6); t2.adlar[2].setAttribute('y', C2[1] - 14);
    cizgi(c, g2, B2, P2, RENK.cizgi, 3, { 'stroke-dasharray': '8 8' }); cizgi(c, g2, C2, Q2, RENK.cizgi, 3, { 'stroke-dasharray': '8 8' });
    cizgi(c, g2, P2, Q2, RENK.dogru, 3.5, DASH);
    nokta(c, g2, P2, RENK.yazi, 6); nokta(c, g2, Q2, RENK.yazi, 6);
    harf(c, g2, P2, 'P', -26, 6, EL[1]); harf(c, g2, Q2, 'Q', 24, 6, EL[2]);
    sag(c, g2, 150, ['|AB| = 6']); sag(c, g2, 200, ['|AP| = 9']); sag(c, g2, 250, ['|BC| = 8']);
    const sq = sag(c, g2, 310, [['|PQ| = ?', EL[0]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'PQ // BC çizildi. |PQ| kaç metredir?', options: ['16 m', '11 m', '12 m'], answer: 2,
      hints: ['Toplama değil çarpma: 3/2 × 8.', 'Oran |AP|/|AB| = 9/6 = 3/2: büyük üçgen.', ''],
      right: 'Evet. Oran 3/2; |PQ| = 3/2 × 8 = 12 m.',
    });
    const u1 = sag(c, g2, 360, ['9/6 = 3/2']), u2 = sag(c, g2, 400, ['3/2 × 8 = 12']);
    const tn = ucAcik(c, g2, [A2, P2, Q2], EL[1], 0.1);
    gizle(u1, u2, tn.g);
    await par(c.say('Oran |AP|/|AB| = 9/6 = 3/2.', { speak: 'Oran: A P uzunluğu bölü A B uzunluğu, altıda dokuz, yani ikide üç.' }), par(belir(c, u1, 400), belir(c, tn.g, 450)));
    parcaKoy(c, sq, [['|PQ| = 12 m', RENK.iyi]]);
    await par(c.say('|PQ| = 3/2 × 8 = 12 m.', { speak: 'P Q uzunluğu, ikide üç çarpı sekiz, on iki metre.' }), par(belir(c, u1, 300, 0), belir(c, u2, 400)));
    c.clearSay();
    await sil(c, g2, 350);

    await dene(c, svg, z);
    c.note('<b>Dışta da çalışır:</b> APQ ~ ABC; |AP|/|AB| = |PQ|/|BC|.', 'Dışta paralel', 'c2-dista-paralel');
  }

  /* Dene: ara çubuğun yeri r = 3 … 9 (D (10 − r, r), E (6 + r, r)); tablo ziyaret edilen satırları gösterir. */
  async function dene(c, svg, z) {
    const g = c.S('g', {}, svg);
    const A = z.P(8, 2), Bn = z.P(3, 7), Cn = z.P(13, 7), P = z.P(1, 9), Q = z.P(15, 9);
    const faint = { 'stroke-dasharray': '8 8', 'stroke-opacity': 0.45 };
    cizgi(c, g, A, P, RENK.cizgi, 2.5, faint); cizgi(c, g, A, Q, RENK.cizgi, 2.5, faint);
    const tri = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'], dolgu: 0.1 });
    tri.adlar[1].setAttribute('x', Bn[0] + 6); tri.adlar[1].setAttribute('y', Bn[1] + 32);
    tri.adlar[2].setAttribute('x', Cn[0] - 6); tri.adlar[2].setAttribute('y', Cn[1] + 32);
    const stat = c.S('g', {}, g);
    aciYayi(c, stat, A, Bn, Cn, EL[0], 30, { dik: true });
    [24, 31].forEach((r) => aciYayi(c, stat, Bn, A, Cn, EL[1], r));
    [24, 31, 38].forEach((r) => aciYayi(c, stat, Cn, A, Bn, EL[2], r));
    const ade = cokgen(c, g, [A, A, A], EL[1], { dolgu: 0.2 });
    const dyn = c.S('g', {}, g);
    const dD = nokta(c, g, A, RENK.yazi, 6), dE = nokta(c, g, A, RENK.yazi, 6);
    const lD = harf(c, g, A, 'D', 0, 0, EL[1]), lE = harf(c, g, A, 'E', 0, 0, EL[2]);
    const veri = [['1/5', '2 m'], ['2/5', '4 m'], ['3/5', '6 m'], ['4/5', '8 m'], ['1', '10 m'], ['6/5', '12 m'], ['7/5', '14 m']];
    const tb = C.tablo(c, g, { x: TX, y: 118, adim: 40, size: 24, kolon: [0, 120], satir: [['oran', '|DE|'], ...veri.map((v) => [v[0], v[1]])] });
    const es = sag(c, g, 470, [['oran 1: eş', RENK.iyi]]);
    const ziyaret = new Array(7).fill(false);
    const boya = (cur) => veri.forEach((v, i) => {
      const renk = i === cur ? RENK.merkez : RENK.yazi;
      tb.hucre(i + 1, 0, v[0], renk); tb.hucre(i + 1, 1, v[1], renk);
      tb.satir[i + 1].style.opacity = ziyaret[i] ? 1 : 0.35;
    });
    const ayarla = (v) => {
      const r = +v, i = r - 3, D = z.P(10 - r, r), E = z.P(6 + r, r);
      ziyaret[i] = true;
      ade.koy([A, D, E]);
      [[dD, D], [dE, E]].forEach(([n, X]) => { n.setAttribute('cx', X[0]); n.setAttribute('cy', X[1]); });
      lD.setAttribute('x', D[0] - 26); lD.setAttribute('y', D[1] - 4); lE.setAttribute('x', E[0] + 26); lE.setAttribute('y', E[1] - 4);
      while (dyn.firstChild) dyn.removeChild(dyn.firstChild);
      [24, 31].forEach((rr) => aciYayi(c, dyn, D, A, E, EL[1], rr));
      [24, 31, 38].forEach((rr) => aciYayi(c, dyn, E, A, D, EL[2], rr));
      boya(i);
      es.style.opacity = r === 7 ? 1 : 0;
    };
    tb.satir.forEach((t) => { t.style.opacity = 1; });
    gizle(g); ayarla(3); await belir(c, g, 450);
    await c.say('Çubuğu kaydır; açılara ve oranlara bak.', { noWait: true });
    const sl = c.slider({ label: 'Ara çubuğun yeri', min: 3, max: 9, step: 1, value: 3, fmt: () => '', onInput: ayarla });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await par(c.say('Çubuk nerede olursa olsun açılar hiç değişmedi.'), nabiz(c, [stat, dyn], 1000));
    await par(c.say('Çubuk kirişe gelince oran 1 oldu: üçgenler eş.', { speak: 'Çubuk kirişe gelince oran bir oldu: üçgenler eş.' }), (async () => { ayarla(7); await nabiz(c, [dyn], 900); })());
    ayarla(9);
    const hayalet = cokgen(c, g, [A, z.P(6, 4), z.P(10, 4)], EL[1], { dolgu: 0.18, w: 3 });
    hayalet.yuz.setAttribute('stroke-dasharray', '6 6');
    ziyaret.fill(true); boya(6);
    await c.say('Kirişin altında üçgen büyür, üstünde küçülür.');
  }

  /* ---- 5. Köşenin öbür yanında ---- */
  async function ote(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const Bn = z.P(3, 9), Cn = z.P(13, 9), A = z.P(8, 4), D = z.P(10, 2), E = z.P(6, 2);
    const tri = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    tri.adlar[0].setAttribute('x', A[0] + 28); tri.adlar[0].setAttribute('y', A[1] + 8);
    const et10 = B.kenarEtiketi(c, g, Bn, Cn, '10 m', RENK.yazi, { merkez: A, uzak: 18 });
    const uD = uzat(c, g, A, D), uE = uzat(c, g, A, E);
    const tint = ucAcik(c, g, [A, D, E], RENK.cizgi, 0.14);
    const pr = C.paralel(c, g, Bn, Cn, A, D, { sinir: [A, D, E] });
    const nk = c.S('g', {}, g);
    nokta(c, nk, D, RENK.yazi, 6); nokta(c, nk, E, RENK.yazi, 6);
    harf(c, nk, D, 'D', 24, 6, EL[1]); harf(c, nk, E, 'E', -24, 6, EL[2]);
    const kk = C.ortakKose(c, g, [A, Bn, Cn], [A, D, E], { yayR: 26 });
    const dae = aciYayi(c, g, A, D, E, EL[0], 26);
    const hal = [[D, EL[1]], [Bn, EL[1]], [E, EL[2]], [Cn, EL[2]]].map(([X, r]) => halka(c, g, X, r, 14));
    // Z: iç ters açılar.
    const f = c.S('g', {}, g), X1 = [910, 180], X2 = [840, 290], U1 = [810, 180], U2 = [740, 290];
    cizgi(c, f, [790, 180], [985, 180], RENK.dogru, 3.5, DASH); cizgi(c, f, [760, 290], [985, 290], RENK.dogru, 3.5, DASH);
    cizgi(c, f, ara(X1, X2, -0.25), ara(X1, X2, 1.25), RENK.cizgi, 3.5);
    const cz = C.aciCift(c, f, 'Z', X1, X2, U1, U2, { renk: RENK.merkez, r: 30 });
    const tBA = C.bolNoktalar(c, g, Bn, A, 5, { cent: true, nokta: false, renk: RENK.yazi });
    const tAD = C.bolNoktalar(c, g, A, D, 2, { cent: true, nokta: false, renk: RENK.yazi });
    const r1 = sag(c, g, 340, [['A', EL[0]], ['D', EL[1]], ['E', EL[2]], ' ~ ', ['A', EL[0]], ['B', EL[1]], ['C', EL[2]]]);
    const f1 = sag(c, g, 150, [['|AD|/|AB|', EL[2]]]), f2 = sag(c, g, 190, ['= ', ['|AE|/|AC|', EL[1]]]), f3 = sag(c, g, 230, ['= ', ['|DE|/|BC|', EL[0]]]);
    const h1 = sag(c, g, 400, ['|DE| = 2/5 × 10']), h2 = sag(c, g, 440, [['= 4 m', RENK.iyi]]);
    const et4 = B.kenarEtiketi(c, g, D, E, '4 m', RENK.iyi, { merkez: A, uzak: 18 });
    gizle(g, nk, tint.g, kk.kenarB, kk.kenarK, kk.yayB, kk.yayK, dae, hal, f, tBA.g, tAD.g, r1, f1, f2, f3, h1, h2, et4);

    await par(c.say('Paralel çizgi köşenin öbür yanından da geçebilir.'), belir(c, g, 450));
    await par(c.say('BA’yı A’nın ötesinde D’ye, CA’yı E’ye uzatalım.', { speak: 'B A’yı A’nın ötesinde D’ye, C A’yı E’ye uzatalım.' }), par(uD.git(800), uE.git(800)));
    await par(c.say('DE, BC’ye paralel olsun.', { speak: 'D E, B C’ye paralel olsun.' }), (async () => {
      await pr.kaydir(1600); await par(belir(c, nk, 350), belir(c, tint.g, 400));
    })());
    await par(c.say('DAE açısı ile BAC açısı ters açılardır; eşittir.', { speak: 'D A E açısı ile B A C açısı ters açılardır; eşittir.' }), (async () => {
      await belir(c, [dae, kk.yayB[0]], 450); await kalinlas(c, [dae, kk.yayB[0]], 3, 900);
    })());
    await par(c.say('DE // BC: ADE açısı ile ABC açısı iç ters açılardır.', { speak: 'D E, B C’ye paralel: A D E açısı ile A B C açısı iç ters açılardır.' }), (async () => {
      await belir(c, f, 500); await kalinlas(c, cz.yay, 3, 900);
      await belir(c, [kk.yayB[1], kk.yayK[1]], 450); await nabiz(c, [kk.yayB[1], kk.yayK[1]], 800);
    })());
    await par(c.say('İç ters açılar eşittir; AED açısı ile ACB açısı da öyle.', { speak: 'İç ters açılar eşittir; A E D açısı ile A C B açısı da öyle.' }), (async () => {
      await belir(c, [kk.yayB[2], kk.yayK[2]], 450); await nabiz(c, [kk.yayB[2], kk.yayK[2]], 800);
      await sil(c, f, 350);
    })());
    await par(c.say('İki açı eşit: ADE ~ ABC; D, B’ye; E, C’ye karşılık gelir.', { speak: 'İki açı eşit: A D E, A B C’ye benzerdir; D, B’ye; E, C’ye karşılık gelir.' }), (async () => {
      await belir(c, hal, 350); await belir(c, r1, 400); await c.wait(500); await belir(c, hal, 350, 0);
    })());
    await par(c.say('Üçgen karşı yana geçmiş görünür, ama benzerdir.'), (async () => {
      await belir(c, [...kk.kenarB, ...kk.kenarK], 500); await kalinlas(c, [...kk.kenarB, ...kk.kenarK], 4, 900);
    })());
    await par(c.say('|AD|/|AB| = |AE|/|AC| = |DE|/|BC|.', { speak: 'A D uzunluğu bölü A B uzunluğu, eşittir A E uzunluğu bölü A C uzunluğu, eşittir D E uzunluğu bölü B C uzunluğu.' }), (async () => {
      await belir(c, r1, 350, 0); r1.remove();
      await belir(c, f1, 350); await belir(c, f2, 350); await belir(c, f3, 350);
    })());
    await par(c.say('AD, AB’nin beşte ikisi: |AD|/|AB| = 2/5.', { speak: 'A D, A B’nin beşte ikisi: A D uzunluğu bölü A B uzunluğu eşittir beşte iki.' }), (async () => {
      await belir(c, [tBA.g, tAD.g], 450);
      parcaKoy(c, f1, [['|AD|/|AB|', EL[2]], ' = ', ['2/5', RENK.merkez]]);
    })());
    await par(c.say('|BC| = 10 m ise |DE| = 2/5 × 10 = 4.', { speak: 'B C uzunluğu on metre ise D E uzunluğu, beşte iki çarpı on, dört.' }), (async () => {
      await belir(c, h1, 450); await c.wait(400); await par(belir(c, h2, 450), belir(c, et4, 450));
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Sıra sende: |AB| = 6, |AD| = 2, |DE| = 3.
    const g2 = c.S('g', {}, svg);
    const B2 = z.P(4, 9), A2 = z.P(4, 3), C2 = z.P(13, 9), D2 = z.P(4, 1), E2 = z.P(1, 1);
    const t2 = cokgen(c, g2, [A2, B2, C2], RENK.sekil, { harf: ['A', 'B', 'C'] });
    t2.adlar[0].setAttribute('x', A2[0] + 28); t2.adlar[0].setAttribute('y', A2[1] + 6);
    cizgi(c, g2, A2, D2, RENK.cizgi, 3, { 'stroke-dasharray': '8 8' }); cizgi(c, g2, A2, E2, RENK.cizgi, 3, { 'stroke-dasharray': '8 8' });
    cizgi(c, g2, D2, E2, RENK.dogru, 3.5, DASH);
    nokta(c, g2, D2, RENK.yazi, 6); nokta(c, g2, E2, RENK.yazi, 6);
    harf(c, g2, D2, 'D', 24, 6, EL[1]); harf(c, g2, E2, 'E', -24, 6, EL[2]);
    sag(c, g2, 150, ['|AB| = 6']); sag(c, g2, 200, ['|AD| = 2']); sag(c, g2, 250, ['|DE| = 3']);
    const sq = sag(c, g2, 310, [['|BC| = ?', EL[0]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'DE // BC. |BC| kaç metredir?', options: ['8 m', '9 m', '1 m'], answer: 1,
      hints: ['Oran |AD|/|AB| = 2/6 = 1/3; DE, BC’nin üçte biridir.', '', 'Küçük üçgen 3 m ise büyük üçgen 3 × 3 m.'],
      right: 'Evet. Oran 1/3; |BC| = 3 × 3 = 9 m.',
    });
    const v1 = sag(c, g2, 360, ['|AD|/|AB| = 2/6 = 1/3']), v2 = sag(c, g2, 400, ['3 × 3 = 9']);
    gizle(v1, v2);
    await par(c.say('Oran |AD|/|AB| = 2/6 = 1/3.', { speak: 'Oran: A D uzunluğu bölü A B uzunluğu, altıda iki, yani üçte bir.' }), belir(c, v1, 400));
    parcaKoy(c, sq, [['|BC| = 9 m', RENK.iyi]]);
    await par(c.say('|BC| = 3 × 3 = 9 m.', { speak: 'B C uzunluğu, üç çarpı üç, dokuz metre.' }), par(belir(c, v1, 300, 0), belir(c, v2, 400)));
    c.note('<b>Öbür yanda:</b> iç ters açılar eşit; yine ADE ~ ABC.', 'Öbür yan', 'c2-obur-yan');
  }

  /* ---- 6. Paralel çiz, benzerlik kur ---- */
  async function paralelCiz(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const Bn = z.P(1, 7), Cn = z.P(15, 7), A = z.P(3.05, 1.36), D = z.P(9.03, 4.18), E = z.P(11, 7), K = z.P(8, 7);
    const tri = cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    const de = cizgi(c, g, D, E, RENK.cizgi, 3.5);
    const tD = B.esitCentik(c, g, A, D, 1, RENK.yazi), tC = B.esitCentik(c, g, D, Cn, 1, RENK.yazi);
    const nk = c.S('g', {}, g);
    nokta(c, nk, D, RENK.yazi, 6); nokta(c, nk, E, RENK.yazi, 6);
    harf(c, nk, D, 'D', 14, -14, EL[1]); harf(c, nk, E, 'E', 0, 38, EL[2]);
    const e6 = B.kenarEtiketi(c, g, Bn, A, '6', RENK.yazi, { merkez: Cn, uzak: 10 });
    const e10 = B.kenarEtiketi(c, g, Bn, E, '10', RENK.yazi, { merkez: A, uzak: 20 });
    const e4 = B.kenarEtiketi(c, g, E, Cn, '4', RENK.yazi, { merkez: A, uzak: 20 });
    const aB = c.S('g', {}, g), mB = aciIci(Bn, A, Cn, 66);
    aciYayi(c, aB, Bn, A, Cn, RENK.merkez, 34); yazi(c, aB, mB[0], mB[1] + 8, '70°', { size: 24, kalin: 700, renk: RENK.merkez });
    const aE = c.S('g', {}, g), mE = aciIci(E, D, Cn, 44);
    aciYayi(c, aE, E, D, Cn, TUR, 30); yazi(c, aE, mE[0], mE[1] + 8, '?', { size: 26, kalin: 700, renk: TUR });
    const soru = sag(c, g, 150, [['DEC açısı = ?', TUR]]);
    const dec = ucAcik(c, g, [D, E, Cn], TUR, 0.3);
    const pr = C.paralel(c, g, A, Bn, Cn, D, { sinir: [A, Bn, Cn] });
    const nK = c.S('g', {}, g);
    nokta(c, nK, K, RENK.yazi, 6); harf(c, nK, K, 'K', 0, 38, EL[2]);
    const aK = c.S('g', {}, g), mK = aciIci(K, D, Cn, 66);
    aciYayi(c, aK, K, D, Cn, RENK.merkez, 34); yazi(c, aK, mK[0], mK[1] + 8, '70°', { size: 24, kalin: 700, renk: RENK.merkez });
    const kk = C.ortakKose(c, g, [Cn, A, Bn], [Cn, D, K], { yayR: 26 });
    const w1 = sag(c, g, 210, [['|DC|/|AC| = 1/2', EL[2]]]);
    const w2 = sag(c, g, 260, [['|CK|/|CB|', EL[1]]]), w3 = sag(c, g, 300, ['= ', ['|DK|/|AB|', EL[0]]]), w4 = sag(c, g, 340, ['= ', ['1/2', RENK.merkez]]);
    const x1 = sag(c, g, 210, ['|CB| = 14']), x2 = sag(c, g, 250, ['|CK| = 1/2 × 14']), x3 = sag(c, g, 290, [['= 7', RENK.iyi]]);
    const y1 = sag(c, g, 210, ['|DK| = 1/2 × 6']), y2 = sag(c, g, 250, [['= 3', RENK.iyi]]);
    const c7 = sag(c, g, 210, [['CDK ~ CAB', RENK.yazi]]);
    parcaKoy(c, c7, [['C', EL[0]], ['D', EL[1]], ['K', EL[2]], ' ~ ', ['C', EL[0]], ['A', EL[1]], ['B', EL[2]]]);
    gizle(g, nk, de, tD, tC, e6, e10, e4, aB, aE, soru, dec.g, nK, aK, kk.kenarB, kk.kenarK, kk.yayB, kk.yayK, w1, w2, w3, w4, x1, x2, x3, y1, y2, c7);

    await par(c.say('|AD| = |DC|, |AB| = 6, |BE| = 10, |EC| = 4.', { speak: 'A D uzunluğu eşittir D C uzunluğu, A B uzunluğu altı, B E uzunluğu on, E C uzunluğu dört.' }), (async () => {
      await belir(c, g, 450); await par(belir(c, nk, 350), belir(c, de, 400), belir(c, [tD, tC], 400));
      await belir(c, [e6, e10, e4], 400);
    })());
    await par(c.say('B açısı 70°. DEC açısı kaç derecedir?', { speak: 'B açısı yetmiş derece. [curious] D E C açısı kaç derecedir?' }), par(belir(c, aB, 450), belir(c, aE, 450), belir(c, soru, 450)));
    await par(c.say('Bu açı hiçbir üçgende doğrudan bulunamıyor.', { speak: '[thoughtful] Bu açı hiçbir üçgende doğrudan bulunamıyor.' }), vurgula(c, [dec.g], 1400));
    await par(c.say('D’den AB’ye paralel çizelim; BC’yi K’de kessin.', { speak: 'D’den A B’ye paralel çizelim; B C’yi K’de kessin.' }), (async () => {
      await pr.kaydir(1700); await belir(c, nK, 400);
    })());
    await par(c.say('DK // AB: DKC açısı ile ABC açısı yöndeş; DKC = 70°.', { speak: 'D K, A B’ye paralel: D K C açısı ile A B C açısı yöndeş; D K C, yetmiş derece.' }), (async () => {
      await belir(c, aK, 450); await nabiz(c, [aB, aK], 900);
    })());
    await par(c.say('C açısı CDK ve CAB üçgenlerinde ortak.', { speak: 'C açısı C D K ve C A B üçgenlerinde ortak.' }), (async () => {
      await belir(c, kk.yayB[0], 450); await nabiz(c, [kk.yayB[0]], 800);
    })());
    await par(c.say('İki açı eşit: CDK ~ CAB.', { speak: 'İki açı eşit: C D K, C A B’ye benzerdir.' }), (async () => {
      await par(belir(c, [aB, aK], 400, 0), belir(c, [kk.yayB[1], kk.yayK[1], kk.yayB[2], kk.yayK[2]], 450), belir(c, c7, 450));
    })());
    await par(c.say('D, AC’nin ortası: |DC|/|AC| = 1/2.', { speak: 'D, A C’nin ortası: D C uzunluğu bölü A C uzunluğu eşittir ikide bir.' }), (async () => {
      await belir(c, c7, 300, 0);
      await belir(c, [kk.kenarB[2], kk.kenarK[2]], 450); await par(belir(c, w1, 450), kalinlas(c, [kk.kenarB[2], kk.kenarK[2]], 4, 900));
    })());
    await par(c.say('Öyleyse |CK|/|CB| = |DK|/|AB| = 1/2.', { speak: 'Öyleyse C K uzunluğu bölü C B uzunluğu eşittir D K uzunluğu bölü A B uzunluğu eşittir ikide bir.' }), (async () => {
      await belir(c, w1, 300, 0);
      await belir(c, [kk.kenarB[0], kk.kenarK[0], kk.kenarB[1], kk.kenarK[1]], 450);
      await belir(c, w2, 350); await belir(c, w3, 350); await belir(c, w4, 350);
    })());
    await par(c.say('|CB| = 14 olduğundan |CK| = 7.', { speak: 'C B uzunluğu on dört olduğundan C K uzunluğu yedi.' }), (async () => {
      await belir(c, [w2, w3, w4], 350, 0);
      await belir(c, x1, 350); await belir(c, x2, 350); await belir(c, x3, 350);
    })());
    await par(c.say('|AB| = 6 olduğundan |DK| = 3.', { speak: 'A B uzunluğu altı olduğundan D K uzunluğu üç.' }), (async () => {
      await belir(c, [x1, x2, x3], 350, 0);
      await belir(c, y1, 350); await belir(c, y2, 350);
    })());
    c.note('<b>Yeni üçgen gerekirse</b> bir kenara paralel çiz.', 'Açı bulmak için', 'c2-aci-bulmak');
  }

  /* ---- 7. Açıyı bul ---- */
  async function aciBul(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const Bn = z.P(1, 7), Cn = z.P(15, 7), A = z.P(3.05, 1.36), D = z.P(9.03, 4.18), E = z.P(11, 7), K = z.P(8, 7);
    cokgen(c, g, [A, Bn, Cn], RENK.sekil, { harf: ['A', 'B', 'C'] });
    cizgi(c, g, D, E, RENK.cizgi, 3.5);
    cizgi(c, g, D, K, RENK.dogru, 3.5, DASH);
    nokta(c, g, D, RENK.yazi, 6); nokta(c, g, E, RENK.yazi, 6); nokta(c, g, K, RENK.yazi, 6);
    harf(c, g, D, 'D', 14, -14, EL[1]); harf(c, g, E, 'E', 0, 38, EL[2]); harf(c, g, K, 'K', 0, 38, EL[2]);
    const e4 = B.kenarEtiketi(c, g, E, Cn, '4', RENK.yazi, { merkez: A, uzak: 20 });
    const e3 = B.kenarEtiketi(c, g, K, E, '3', RENK.merkez, { merkez: A, uzak: 20 });
    const tDK = B.esitCentik(c, g, D, K, 1, RENK.merkez), tKE = B.esitCentik(c, g, K, E, 1, RENK.merkez);
    const dke = cokgen(c, g, [D, K, E], RENK.merkez, { dolgu: 0.1, w: 3 });
    const aK = c.S('g', {}, g), aD = c.S('g', {}, g), aE = c.S('g', {}, g), aC = c.S('g', {}, g);
    aciYayi(c, aK, K, D, E, RENK.merkez, 34);
    aciYayi(c, aD, D, K, E, RENK.goruntu, 30); aciYayi(c, aE, E, D, K, RENK.goruntu, 30);
    aciYayi(c, aC, E, D, Cn, TUR, 40);
    const r1 = sag(c, g, 150, ['|KE| = 7 − 4 = 3']), r2 = sag(c, g, 200, ['DKE ikizkenar']);
    const r3 = sag(c, g, 250, [['70°', RENK.merkez]]), r4 = sag(c, g, 300, [['55° ve 55°', RENK.goruntu]]);
    const r5 = sag(c, g, 350, [['DEC = ?', TUR]]);
    gizle(e4, e3, tDK, tKE, dke.g, aK, aD, aE, aC, r1, r2, r3, r4, r5);
    gizle(g); await belir(c, g, 450);

    await par(c.say('|CE| = 4 olduğundan |KE| = 7 − 4 = 3.', { speak: 'C E uzunluğu dört olduğundan K E uzunluğu, yedi eksi dört, üç.' }), par(belir(c, [e4, e3], 450), belir(c, r1, 450)));
    await par(c.say('|DK| = |KE| = 3: DKE ikizkenar üçgen.', { speak: 'D K uzunluğu eşittir K E uzunluğu eşittir üç: D K E ikizkenar üçgen.' }), par(belir(c, [tDK, tKE, dke.g], 450), belir(c, r2, 450)));
    await par(c.say('DKE açısı, DKC açısıyla aynı: 70°.', { speak: 'D K E açısı, D K C açısıyla aynı: yetmiş derece.' }), par(belir(c, aK, 450), belir(c, r3, 450)));
    await par(c.say('İkizkenarın taban açıları (180° − 70°) ÷ 2 = 55°.', { speak: 'İkizkenarın taban açıları, yüz seksen eksi yetmiş bölü iki, elli beş derece.' }), (async () => {
      await par(belir(c, [r1, r2], 350, 0), belir(c, [aD, aE], 450), belir(c, r4, 450));
    })());
    await par(c.say('DEK açısı 55°.', { speak: 'D E K açısı elli beş derece.' }), nabiz(c, [aE], 900));
    await par(c.say('K, E, C doğrusal: DEC = 180° − 55° = 125°.', { speak: 'K, E, C doğrusal: D E C, yüz seksen eksi elli beş, yüz yirmi beş derece.' }), (async () => {
      await par(belir(c, [aD, aE, tDK, tKE, dke.g], 400, 0.3), belir(c, aC, 450), belir(c, r5, 450));
      aC.querySelectorAll('path').forEach((p) => { p.style.stroke = RENK.iyi; });
      parcaKoy(c, r5, [['DEC = 125°', RENK.iyi]]);
    })());

    // Sıra sende: |AD| = |DC|, |AB| = 4, |BE| = 8, |EC| = 4, B açısı 80°.
    c.clearSay();
    await sil(c, g, 350);
    const g2 = c.S('g', {}, svg);
    const B2 = z.P(1, 7), C2 = z.P(13, 7), A2 = z.P(1.69, 3.06), D2 = z.P(7.35, 5.03), K2 = z.P(7, 7), E2 = z.P(9, 7);
    cokgen(c, g2, [A2, B2, C2], RENK.sekil, { harf: ['A', 'B', 'C'] });
    cizgi(c, g2, D2, E2, RENK.cizgi, 3.5);
    B.esitCentik(c, g2, A2, D2, 1, RENK.yazi); B.esitCentik(c, g2, D2, C2, 1, RENK.yazi);
    nokta(c, g2, D2, RENK.yazi, 6); nokta(c, g2, E2, RENK.yazi, 6);
    harf(c, g2, D2, 'D', 14, -14, EL[1]); harf(c, g2, E2, 'E', 0, 38, EL[2]);
    B.kenarEtiketi(c, g2, B2, A2, '4', RENK.yazi, { merkez: C2, uzak: 10 });
    B.kenarEtiketi(c, g2, B2, E2, '8', RENK.yazi, { merkez: A2, uzak: 20 });
    B.kenarEtiketi(c, g2, E2, C2, '4', RENK.yazi, { merkez: A2, uzak: 20 });
    const a80 = c.S('g', {}, g2), m80 = aciIci(B2, A2, C2, 66);
    aciYayi(c, a80, B2, A2, C2, RENK.merkez, 34); yazi(c, a80, m80[0], m80[1] + 8, '80°', { size: 24, kalin: 700, renk: RENK.merkez });
    const sq = sag(c, g2, 150, [['DEC açısı = ?', TUR]]);
    const aq = c.S('g', {}, g2), mq = aciIci(E2, D2, C2, 44);
    aciYayi(c, aq, E2, D2, C2, TUR, 30); yazi(c, aq, mq[0], mq[1] + 8, '?', { size: 26, kalin: 700, renk: TUR });
    const pk = C.paralel(c, g2, A2, B2, C2, D2, { sinir: [A2, B2, C2] });
    const nK = c.S('g', {}, g2); nokta(c, nK, K2, RENK.yazi, 6); harf(c, nK, K2, 'K', 0, 38, EL[2]);
    const tDK2 = B.esitCentik(c, g2, D2, K2, 1, RENK.merkez), tKE2 = B.esitCentik(c, g2, K2, E2, 1, RENK.merkez);
    const dke2 = cokgen(c, g2, [D2, K2, E2], RENK.merkez, { dolgu: 0.1, w: 3 });
    const aK2 = c.S('g', {}, g2), aD2 = c.S('g', {}, g2), aE2 = c.S('g', {}, g2), aC2 = c.S('g', {}, g2);
    aciYayi(c, aK2, K2, D2, E2, RENK.merkez, 34);
    aciYayi(c, aD2, D2, K2, E2, RENK.goruntu, 26); aciYayi(c, aE2, E2, D2, K2, RENK.goruntu, 26);
    aciYayi(c, aC2, E2, D2, C2, TUR, 40);
    const q1 = sag(c, g2, 210, ['|DK| = 2']), q2 = sag(c, g2, 250, ['|CK| = 6']);
    const q3 = sag(c, g2, 210, ['|KE| = 6 − 4 = 2']), q4 = sag(c, g2, 250, [['tepe açısı 80°', RENK.merkez]]);
    const q5 = sag(c, g2, 210, [['taban 50° ve 50°', RENK.goruntu]]);
    gizle(g2, pk.g, nK, tDK2, tKE2, dke2.g, aK2, aD2, aE2, aC2, q1, q2, q3, q4, q5);
    await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Başka bir çizimde |AD| = |DC|, |AB| = 4, |BE| = 8, |EC| = 4 ve B açısı 80°. DEC açısı kaç derecedir?',
      options: ['130°', '50°', '100°'], answer: 0,
      hints: ['', '|KE| = 6 − 4 = 2; DKE ikizkenar, tepe açısı 80°.', 'Yine D’den AB’ye paralel çiz: |DK| = 2 ve |CK| = 6.'],
      right: 'Evet. Taban açıları 50°; DEC = 130°.',
    });
    await par(c.say('DK // AB çizilince |DK| = 2 ve |CK| = 6.', { speak: 'D K, A B’ye paralel çizilince D K uzunluğu iki ve C K uzunluğu altı.' }), (async () => {
      await pk.kaydir(1500); await par(belir(c, nK, 400), belir(c, q1, 400)); await belir(c, q2, 400);
    })());
    await par(c.say('|KE| = 6 − 4 = 2; DKE ikizkenar, tepe açısı 80°.', { speak: 'K E uzunluğu, altı eksi dört, iki; D K E ikizkenar, tepe açısı seksen derece.' }), (async () => {
      await par(belir(c, [q1, q2], 300, 0), belir(c, [tDK2, tKE2, dke2.g, aK2], 450));
      await par(belir(c, q3, 400), belir(c, q4, 400));
    })());
    await par(c.say('Taban açıları 50°; DEC = 180° − 50° = 130°.', { speak: 'Taban açıları elli derece; D E C, yüz seksen eksi elli, yüz otuz derece.' }), (async () => {
      await par(belir(c, [q3, q4], 300, 0), belir(c, [aD2, aE2], 450));
      await par(belir(c, q5, 400), belir(c, [aq], 300, 0));
      await belir(c, aC2, 450);
      aC2.querySelectorAll('path').forEach((p) => { p.style.stroke = RENK.iyi; });
      parcaKoy(c, sq, [['DEC açısı = 130°', RENK.iyi]]);
    })());
    c.note('<b>Yeni üçgen gerekirse</b> bir kenara paralel çiz.', 'Açı bulmak için', 'c2-aci-bulmak');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-c2', kicker: 'Konu C · Benzer üçgenler oluşturma', title: 'Kenara paralel çiz', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Kenara paralel çiz',
      hook: 'Bir çatı makasına kirişe <b>paralel bir ara çubuk</b> takılınca üstte kalan küçük üçgen çatıya benzer mi?',
      button: 'Derse başla ›',
    },
    goals: ['Üçgenin bir kenarına paralel çizilen doğrunun benzer bir üçgen oluşturduğunu söyler.', 'Paralel doğruların yöndeş ve iç ters açılarından Açı-Açı koşuluna ulaşır.', 'Benzer üçgenin karşılıklı kenarlarını oranlayıp bilinmeyen uzunluğu hesaplar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Benzerlik oranını ve iki açı eşitse üçüncünün eşit olduğunu hatırla.', run: hatirla },
      { title: 'Çatıya ara çubuk', goal: 'Kirişe paralel çubuk, çatıya benzer bir üçgen verir.', run: cati },
      { title: 'Hangi kenar hangisi?', goal: 'Oranı karşılıklı bütün kenarlarla kur.', run: kenarlar },
      { title: 'Kirişin altına inerse', goal: 'Paralel doğru dışarıda da benzer, büyük bir üçgen verir.', run: alt },
      { title: 'Köşenin öbür yanında', goal: 'Köşenin ötesindeki paralel de benzer üçgen verir.', run: ote },
      { title: 'Paralel çiz, benzerlik kur', goal: 'Bulunamayan bir açı için paralel çizip yeni bir benzer üçgen kur.', run: paralelCiz },
      { title: 'Açıyı bul', goal: 'Paralelden gelen ikizkenar üçgenle açıyı hesapla.', run: aciBul },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'ABC üçgeninde D, AB üzerinde; E, AC üzerinde ve DE // BC. Hangi eşitlik doğrudur?',
        options: ['|AD|/|DB| = |DE|/|BC|', '|AD|/|AB| = |DE|/|BC|', '|AD|/|BC| = |DE|/|AB|'], answer: 1,
        why: ['DB, ADE üçgeninin kenarı değildir; oranda karşılığı olmayan bir parça kullanılamaz.', 'Oran karşılıklı bütün kenarlarla kurulur: AD ile AB, DE ile BC.', 'AD ile BC karşılıklı kenar değildir; oran karşılıklı kenarlar arasında kurulur.'],
        scene: 2,
      },
      {
        q: 'ABC üçgeninde P, AB doğrusu üzerinde B’nin ötesinde; Q, AC doğrusu üzerinde ve PQ // BC. |AB| = 4 m, |AP| = 10 m, |BC| = 6 m ise |PQ| kaç metredir?',
        options: ['2,4 m', '12 m', '15 m'], answer: 2,
        why: ['Oran ters kurulmuş: 6 × 4/10 = 2,4. APQ büyük üçgendir, PQ, BC’den uzun olmalı.', 'Oran 10/4 = 5/2’dir, 2 değil; 5/2 × 6 = 15.', '|AP|/|AB| = 10/4 = 5/2 olduğundan |PQ| = 5/2 × 6 = 15 m.'],
        scene: 3,
      },
      {
        q: 'D, BA doğrusu üzerinde A’nın ötesinde; E, CA doğrusu üzerinde A’nın ötesinde ve DE // BC. |AD| = 3 m, |AB| = 12 m, |DE| = 5 m ise |BC| kaç metredir?',
        options: ['20 m', '14 m', '1,25 m'], answer: 0,
        why: ['|AD|/|AB| = 3/12 = 1/4 olduğundan |BC| = 4 × 5 = 20 m.', 'Toplama ya da çıkarma kullanılamaz; oran 1/4 olduğundan BC, DE’nin 4 katıdır.', 'Oran ters kullanılmış: 5 × 1/4 = 1,25. BC, DE’den uzun olmalı.'],
        scene: 4,
      },
      {
        q: 'DE // BC çizilince ADE üçgeni ile ABC üçgeni hangi koşula göre benzerdir?',
        options: ['Kenar-Açı-Kenar', 'Kenar-Kenar-Kenar', 'Açı-Açı'], answer: 2,
        why: ['Bu çizimde kenar uzunlukları verilmedi; aradaki açı ve iki kenar oranı yoktur.', 'Üç kenar oranı verilmedi; kenarlar sonradan oranlanır.', 'Yöndeş açılar eşit ve A açısı ortak: iki açı eşit, yani Açı-Açı.'],
        scene: 1,
      },
      {
        q: 'Bir merdivenin ayağı yerde G’de, ucu duvarda T’dedir; T yerden 6 m yüksekte, G duvardan 8 m uzakta, merdivenin boyu 10 m’dir. Merdivende G’den başlayıp uçta biten 15 eşit aralıklı basamak vardır; 7. basamak ayaktan 7 aralık yukarıdadır. 7. basamaktan yere duvara paralel bir dikme iniyor. Basamak yerden kaç metre yüksekte?',
        options: ['7 m', '2,8 m', '3,2 m'], answer: 1,
        why: ['7, basamak sayısıdır; yükseklik duvar yüksekliğinin 7/15’i olmalı.', 'Dikme duvara paraleldir: küçük üçgen büyüğüne benzer, oran 7/15 ve yükseklik 7/15 × 6 = 2,8 m.', '3,2 m, 8/15 × 6 işleminin sonucudur; 7. basamak için oran 7/15’tir.'],
        scene: 1,
      },
    ],
    summary: [
      'Bir kenara paralel çizilen doğru benzer bir üçgen verir: içte, dışta ya da köşenin öbür yanında.',
      'Benzerlik Açı-Açı ile kurulur.',
      'Oran bütün kenarla kurulur.',
      '<b>Kenara paralel çizersen benzer üçgen çıkar.</b>',
    ],
    nextLesson: { href: 'c3-yukseklik-uc-benzer-ucgen.html', label: 'Sonraki: Dik köşeden inen yükseklik üç benzer üçgen verir ›' },
  });
})();
