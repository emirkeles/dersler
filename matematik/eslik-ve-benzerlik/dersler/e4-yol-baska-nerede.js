/* E4 — Bu yol başka nerede işe yarar?
   Bir problemde işe yarayan yol başka problemde sınanır (iki lamba direği); sayılar değişince yol aynı kalır; yol genellenir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/E-problemler.md (E4)
   Sıra: hatırla, iki lamba direği, gölge direği geçmesin, sayılar değişince (kule), hangi yol hangi probleme (tablo), sınıflandırma. */
(() => {
  'use strict';
  const { RENK, ara, uz, ileri, yon, yazi, renkli, parcaKoy, cizgi, koy, gizle, belir, par, cevapla, cokgen, aciYayi, zemin, agirlik } = window.KIT;
  const B = window.KIT_B, E = window.KIT_E;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil
  const SAYI = RENK.yazi, ARA = RENK.iyi, ISTEN = RENK.merkez, ISIK = 'var(--c6)', GRI = RENK.soluk;
  const liste = (x) => [x].flat(Infinity);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };

  /* Ölçü çizgisi: P–Q doğru parçasından kay kadar ötede, uçlarında çentik; yazı çizginin ortasında yazi kadar kaymış. */
  function olcu(c, p, P, Q, metin, renk, o = {}) {
    const g = c.S('g', {}, p), k = o.kay || [0, 52], P2 = [P[0] + k[0], P[1] + k[1]], Q2 = [Q[0] + k[0], Q[1] + k[1]], n = yon(P2, Q2) + Math.PI / 2;
    const hat = cizgi(c, g, P2, Q2, renk, o.w || 2.5);
    [P2, Q2].forEach((X) => cizgi(c, g, ileri(X, n, 7), ileri(X, n, -7), renk, o.w || 2.5));
    const M = ara(P2, Q2, 0.5), y = o.yazi || [0, 28];
    const t = yazi(c, g, M[0] + y[0], M[1] + y[1], metin, { size: o.size || 24, kalin: 700, renk: o.yazirenk || renk });
    return { g, hat, yazi: t };
  }
  const tik = (c, p, cx, cy, s = 1) => c.S('path', { d: `M${cx - 11 * s},${cy + s} L${cx - 3 * s},${cy + 10 * s} L${cx + 12 * s},${cy - 10 * s}`, fill: 'none', stroke: ARA, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  const capraz = (c, p, cx, cy, s = 1) => {
    const g = c.S('g', {}, p);
    [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach((d) => cizgi(c, g, [cx + d[0] * 13 * s, cy + d[1] * 13 * s], [cx + d[2] * 13 * s, cy + d[3] * 13 * s], GRI, 6));
    return g;
  };

  /* ---- Lamba direkleri: 22 × 11 zemin, 1 birim = 1 m = 36 px ---- */
  function lambaZemin(c, svg) {
    const Z = zemin(c, svg, { sutun: 22, satir: 11, b: 36, x0: 104, y0: 60 });
    const pt = { P: Z.P(2, 4), Q: Z.P(20, 0), A: Z.P(2, 10), K: Z.P(8, 10), B: Z.P(20, 10), L: Z.P(5, 10), M: Z.P(11, 10), N: Z.P(8, 8) };
    const yer = cizgi(c, svg, [Z.x0 + 8, pt.A[1]], [Z.x0 + 22 * 36 - 8, pt.A[1]], RENK.cizgi, 3);
    return { Z, pt, yer };
  }
  function direk(c, p, T, Y) {
    const g = c.S('g', {}, p);
    cizgi(c, g, Y, T, RENK.cizgi, 6);
    c.S('circle', { cx: T[0], cy: T[1], r: 10, fill: ISIK, stroke: RENK.yazi, 'stroke-width': 2 }, g);
    return g;
  }
  function necati(c, p, K, N) {
    const g = c.S('g', {}, p);
    cizgi(c, g, K, [K[0], N[1] + 16], RENK.yazi, 5);
    c.S('circle', { cx: K[0], cy: N[1] + 8, r: 8, fill: RENK.yuzey, stroke: RENK.yazi, 'stroke-width': 3 }, g);
    return g;
  }

  /* ---- Gözlem kulesi: A'da değil B'de dik açı; H, B'den AC'ye inen dikmenin ayağı ---- */
  function kule(c, p, A, Bp, C) {
    const g = c.S('g', {}, p), m = agirlik([A, Bp, C]);
    const t = (uz(A, Bp) ** 2) / (uz(A, C) ** 2);
    const H = [A[0] + t * (C[0] - A[0]), A[1] + t * (C[1] - A[1])];
    const tri = cokgen(c, g, [A, Bp, C], RENK.sekil, { harf: ['A', 'B', 'C'], harfSize: 26 });
    const dikB = aciYayi(c, g, Bp, A, C, RENK.cizgi, 28, { dik: true });
    const bh = cizgi(c, g, Bp, H, ISTEN, 4);
    const dikH = aciYayi(c, g, H, Bp, C, RENK.cizgi, 24, { dik: true });
    const u = [(C[0] - A[0]) / uz(A, C), (C[1] - A[1]) / uz(A, C)];
    let n = [-u[1], u[0]]; if ((Bp[0] - H[0]) * n[0] + (Bp[1] - H[1]) * n[1] > 0) n = [-n[0], -n[1]];
    const hL = yazi(c, g, H[0] + n[0] * 26, H[1] + n[1] * 26 + 8, 'H', { size: 26, kalin: 700, renk: RENK.sekil });
    const mid = ara(Bp, H, 0.5), v = [(H[0] - Bp[0]) / uz(Bp, H), (H[1] - Bp[1]) / uz(Bp, H)];
    let n2 = [-v[1], v[0]]; if ((A[0] - mid[0]) * n2[0] + (A[1] - mid[1]) * n2[1] < 0) n2 = [-n2[0], -n2[1]];
    const q = E.istenenKutu(c, g, mid[0] + n2[0] * 40, mid[1] + n2[1] * 40, '?', { size: 30 });
    const et = (P1, Q1, metin, renk, size = 28) => { const tx = B.kenarEtiketi(c, g, P1, Q1, metin, renk, { merkez: m, size }); gizle(tx); return tx; };
    gizle(tri.g, dikB, bh, dikH, hL, q.g);
    return { g, tri, A, B: Bp, C, H, dikB, bh, dikH, hL, q, et };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Gözlem kulesi: destek direği dik köşeden hipotenüse iner.
    const g1 = c.S('g', {}, svg);
    const A = [380, 450], Bp = [632, 450], C = [632, 114];
    const k = kule(c, g1, A, Bp, C);
    gizle(g1); k.g.style.opacity = 1;
    [k.tri.g, k.dikB, k.bh, k.dikH, k.hL, k.q.g].forEach((e) => { e.style.opacity = 1; });
    await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Gözlem kulesinde destek direğinin boyunu hangi iki yol buldu?',
      options: ['Tales ve Öklid', 'Benzerlik ve Öklid', 'ABH’de Pisagor ve Tales'], answer: 1,
      hints: ['Kulede benzerlik ve Öklid sonuca vardı; Tales için paralel doğru, ABH’de Pisagor için ikinci bilgi eksikti.', '', 'Kulede benzerlik ve Öklid sonuca vardı; Tales için paralel doğru, ABH’de Pisagor için ikinci bilgi eksikti.'],
      right: 'Evet. Benzerlik ve Öklid.',
    });
    await c.say('Kulede benzerlik ve Öklid sonuca vardı.');
    c.clearSay();
    await sil(c, g1, 350);

    // Bir açı ortak, birer dik açı: iki dik üçgen.
    const g2 = c.S('g', {}, svg);
    const Bb = [250, 450], Cc = [700, 450], Aa = [250, 150], D = [430, 270], Ee = [430, 450];
    cokgen(c, g2, [Aa, Bb, Cc], EL[0], { harf: ['A', 'B', 'C'], harfSize: 26 });
    const kucuk = cokgen(c, g2, [D, Ee, Cc], EL[1], { harf: ['D', 'E'], harfSize: 26, dolgu: 0.3 });
    kucuk.adlar[0].setAttribute('x', D[0] + 18); kucuk.adlar[0].setAttribute('y', D[1] - 14);
    B.esitYay(c, g2, Cc, Bb, Aa, 1, EL[0], { r: 46 });
    B.esitYay(c, g2, Bb, Aa, Cc, 1, EL[1], { r: 28, dik: true });
    B.esitYay(c, g2, Ee, D, Cc, 1, EL[1], { r: 28, dik: true });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki üçgende bir açı ortak ve ikisinde de birer dik açı var. Bu üçgenler için hangisi söylenir?',
      options: ['Eştirler', 'Benzer değildirler, çünkü üçüncü açı verilmemiş', 'Benzerdirler: Açı-Açı'], answer: 2,
      hints: ['İki açı eşitse üçgenler benzerdir (Açı-Açı); üçüncü açı kendiliğinden eşit olur.', 'İki açı eşitse üçgenler benzerdir (Açı-Açı); üçüncü açı kendiliğinden eşit olur.', ''],
      right: 'Evet. İki açı eşitse üçgenler benzerdir.',
    });
    await c.say('Ortak açı ve dik açılar: Açı-Açı.');
  }

  /* ---- 2. Başka problemde sınama: iki lamba direği ---- */
  async function lamba(c) {
    const svg = c.svg(1000, 562);
    const { Z, pt, yer } = lambaZemin(c, svg);
    const { P, Q, A, K, B: Bn, L, M, N } = pt;
    gizle(Z.g, yer);
    const yz = (x, y, m, o) => { const t = yazi(c, svg, x, y, m, Object.assign({ size: 24, kalin: 700 }, o)); gizle(t); return t; };
    // Alttan üste: üçgen dolguları, ışınlar, gölge çizgileri, direkler, Necati, işaretler, yazılar.
    const triPAM = cokgen(c, svg, [P, A, M], EL[0], { dolgu: 0.16 }), triNKM = cokgen(c, svg, [N, K, M], EL[1], { dolgu: 0.3 });
    const triQBL = cokgen(c, svg, [Q, Bn, L], EL[0], { dolgu: 0.16 }), triNKL = cokgen(c, svg, [N, K, L], EL[1], { dolgu: 0.3 });
    const rP = cizgi(c, svg, P, M, ISIK, 3), rQ = cizgi(c, svg, Q, L, ISIK, 3);
    const gKL = cizgi(c, svg, K, L, EL[2], 6), gKM = cizgi(c, svg, K, M, EL[2], 6), gAM = cizgi(c, svg, A, M, EL[2], 6), gBL = cizgi(c, svg, Bn, L, EL[2], 6);
    const dA = direk(c, svg, P, A), dB = direk(c, svg, Q, Bn), nk = necati(c, svg, K, N);
    const bP = cizgi(c, svg, A, P, EL[0], 6), bQ = cizgi(c, svg, Bn, Q, EL[0], 6), bN = cizgi(c, svg, K, N, EL[0], 6);
    const dikA = aciYayi(c, svg, A, P, M, RENK.cizgi, 28, { dik: true }), dikK = aciYayi(c, svg, K, N, M, RENK.cizgi, 28, { dik: true });
    const dikKL = aciYayi(c, svg, K, N, L, RENK.cizgi, 28, { dik: true }), dikB = aciYayi(c, svg, Bn, Q, L, RENK.cizgi, 28, { dik: true });
    const arcM = B.esitYay(c, svg, M, A, P, 1, EL[0], { r: 44 }), arcL = B.esitYay(c, svg, L, Bn, Q, 1, EL[0], { r: 44 });
    const d18 = olcu(c, svg, A, Bn, '18', RENK.cizgi, { kay: [0, 88], yazi: [0, 32], yazirenk: SAYI });
    const dAK = olcu(c, svg, A, K, '2s', RENK.cizgi, { kay: [0, 42], yazirenk: ARA }), dKB = olcu(c, svg, K, Bn, '4s', RENK.cizgi, { kay: [0, 42], yazirenk: ARA });
    const dAM = olcu(c, svg, A, M, '3s', RENK.cizgi, { kay: [0, 88], yazi: [0, 32], yazirenk: ARA }), dBL = olcu(c, svg, L, Bn, '5s', RENK.cizgi, { kay: [0, 88], yazi: [0, 32], yazirenk: ARA });
    const tA = yz(A[0], A[1] + 28, 'A'), tB = yz(Bn[0], Bn[1] + 28, 'B'), tK = yz(K[0], K[1] + 28, 'K'), tL = yz(L[0], L[1] + 28, 'L'), tM = yz(M[0], M[1] + 28, 'M');
    const tP = yz(P[0] - 22, P[1] - 6, 'P'), tQ = yz(Q[0] + 24, Q[1] + 8, 'Q'), tN = yz(N[0], N[1] - 26, 'N');
    const t6 = yz(A[0] - 24, 318, '6'), t10 = yz(Bn[0] + 28, 248, '10'), t2 = yz(K[0] - 22, 392, '2');
    const s1 = yz((K[0] + L[0]) / 2, 448, 's', { renk: ARA }), s2 = yz((K[0] + M[0]) / 2, 448, 's', { renk: ARA });
    const eq = yz(420, 130, '', { size: 28 });
    const okl = yz(420, 130, 'Öklid', { size: 34 }), cik = E.cikmaz(c, svg, [okl], [420, 120], { boyut: 30 });
    const gizliler = [triPAM.g, triNKM.g, triQBL.g, triNKL.g, rP, rQ, gKL, gKM, gAM, gBL, dA, dB, nk, bP, bQ, bN, dikA, dikK, dikKL, dikB, arcM, arcL, d18.g, dAK.g, dKB.g, dAM.g, dBL.g];
    gizle(gizliler);

    await par(c.say('Bir yolun işe yarayıp yaramadığını başka problemde sınarız.'), belir(c, [Z.g, yer], 600));
    await par(c.say('Yolda A ve B’de iki lamba direği var: 6 ve 10 metre.', { speak: 'Yolda A ve B’de iki lamba direği var: altı ve on metre.' }), belir(c, [dA, dB, tA, tB, t6, t10], 600));
    await par(c.say('A ile B arası 18 metre.', { speak: 'A ile B arası on sekiz metre.' }), belir(c, d18.g, 500));
    await par(c.say('Aralarında 2 metre boyunda Necati duruyor: K noktası.', { speak: 'Aralarında iki metre boyunda Necati duruyor: K noktası.' }), belir(c, [nk, tK, t2], 500));
    await par(c.say('İki lambanın gölgesi, Necati’nin iki yanında eşit uzunlukta.'), belir(c, [rP, rQ, tL, tM], 700));
    await par(c.say('İstenen: bir gölgenin boyu, |KL| = |KM| = s.', { speak: 'İstenen: bir gölgenin boyu, K L uzunluğu eşittir K M uzunluğu eşittir s.' }), (async () => {
      await belir(c, [gKL, gKM, s1, s2], 500); await E.parla(c, [s1, s2], 700);
    })());
    // Öklid çıkmaz.
    await par(c.say('Önce Öklid’i deneyelim: dik köşeden hipotenüse inen yükseklik gerekir.'), belir(c, okl, 500));
    await par(c.say('Şekilde böyle bir yükseklik yok: Öklid burada çıkmaz.'), cik.kapat(800));
    // Benzerlik.
    await par(c.say('Benzerliği deneyelim: direkler ve Necati yere dik.'), (async () => {
      await sil(c, [okl, cik.g], 300);
      await par(belir(c, [t10, tB, d18.g], 300, 0), belir(c, [dikA, dikK, dikB], 500));
    })());
    await par(c.say('M açısı ortak; A ve K’de dik açı: PAM ~ NKM.', { speak: 'M açısı ortak; A ve K’de dik açı: P A M, N K M’ye benzerdir.' }), par(belir(c, [triPAM.g, triNKM.g, arcM, tP, tN], 700), belir(c, [rQ, dB, dikB], 700, 0.25)));
    await par(c.say('Karşılıklı kenarlar: PA ile NK, AM ile KM.', { speak: 'Karşılıklı kenarlar: P A ile N K, A M ile K M.' }), (async () => {
      await belir(c, [bP, bN], 400); await E.parla(c, [bP, bN], 600);
      await belir(c, gAM, 400); await E.parla(c, [gAM, gKM], 700);
    })());
    parcaKoy(c, eq, ['|PA| / |NK| = |AM| / |KM|']);
    await par(c.say('Oran: |PA| / |NK| = |AM| / |KM|.', { speak: 'Oran: P A uzunluğu bölü N K uzunluğu eşittir A M uzunluğu bölü K M uzunluğu.' }), belir(c, eq, 500));
    parcaKoy(c, eq, ['6 / 2 = |AM| / s']);
    await par(c.say('Yani 6 / 2 = |AM| / s.', { speak: 'Yani altı bölü iki eşittir A M uzunluğu bölü s.' }), E.parla(c, eq, 600));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '6 / 2 = |AM| / s. |AM|, s’nin kaç katıdır?',
      options: ['6 katı', '2 katı', '3 katı'], answer: 2,
      hints: ['6 ÷ 2 kaç eder? |AM|, s’nin o kadar katıdır.', '2, |NK|’dir; |AM|, s’nin 6 ÷ 2 katıdır.', ''],
      right: 'Evet. 6 ÷ 2 = 3.',
    });
    parcaKoy(c, eq, [['|AM| = 3s', ARA]]);
    await par(c.say('Yani |AM|, s’nin üç katı: |AM| = 3s.', { speak: 'Yani A M uzunluğu, s’nin üç katı: A M uzunluğu eşittir üç s.' }), belir(c, dAM.g, 500));
    parcaKoy(c, eq, [['|AK| = 3s − s = 2s', ARA]]);
    await par(c.say('|AM| = |AK| + s olduğundan |AK| = 2s.', { speak: 'A M uzunluğu eşittir A K uzunluğu artı s olduğundan A K uzunluğu eşittir iki s.' }), par(belir(c, [t6, t2], 300, 0), belir(c, dAK.g, 500)));
    // B lambası için aynı yol.
    parcaKoy(c, eq, ['10 / 2 = |BL| / s']);
    await par(c.say('B lambası için aynı yol: 10 / 2 = |BL| / s.', { speak: 'B lambası için aynı yol: on bölü iki eşittir B L uzunluğu bölü s.' }), (async () => {
      await belir(c, [tA, tP, tM, s2, dAM.g, dAK.g, triPAM.g, triNKM.g, arcM, bP, gAM, gKM, dikA, dikK], 350, 0);
      await par(belir(c, rP, 350, 0.25), belir(c, [tB, tQ, t10, t2, triQBL.g, triNKL.g, arcL, bQ, gBL, dikB, dikKL, rQ, dB], 600));
    })());
    parcaKoy(c, eq, [['|BL| = 5s', ARA]]);
    await par(c.say('Yani |BL| = 5s.', { speak: 'Yani B L uzunluğu eşittir beş s.' }), belir(c, dBL.g, 500));
    parcaKoy(c, eq, [['|BK| = 5s − s = 4s', ARA]]);
    await par(c.say('|BL| = |BK| + s olduğundan |BK| = 4s.', { speak: 'B L uzunluğu eşittir B K uzunluğu artı s olduğundan B K uzunluğu eşittir dört s.' }), belir(c, dKB.g, 500));
    // İki parça 18'i verir.
    parcaKoy(c, eq, ['2s + 4s = 18']);
    await par(c.say('|AK| + |KB| = 18: 2s + 4s = 18.', { speak: 'A K uzunluğu artı K B uzunluğu eşittir on sekiz: iki s artı dört s eşittir on sekiz.' }), (async () => {
      await belir(c, [tQ, t10, t2, tN, tL, s1, dBL.g, triQBL.g, triNKL.g, arcL, bQ, gBL, gKL, dikB, dikKL], 350, 0);
      await par(belir(c, rP, 350, 0.2), belir(c, rQ, 350, 0.2));
      await par(belir(c, [tA, dAK.g, d18.g], 500));
    })());
    parcaKoy(c, eq, ['6s = 18   ', ['s = 3', ARA]]);
    await par(c.say('6s = 18; yani s = 3 metre.', { speak: 'Altı s eşittir on sekiz; yani s eşittir üç metre.' }), E.parla(c, eq, 700));
    dAK.yazi.textContent = '6'; dKB.yazi.textContent = '12';
    parcaKoy(c, eq, [['6 + 12 = 18', ARA]]);
    await par(c.say('Denetim: |AK| = 6, |BK| = 12; 6 + 12 = 18.', { speak: 'Denetim: A K uzunluğu eşittir altı, B K uzunluğu eşittir on iki; altı artı on iki eşittir on sekiz.' }), E.parla(c, [dAK.yazi, dKB.yazi, d18.yazi], 800));
    // Necati'nin oranıyla karşılaştırma.
    await sil(c, [eq], 300);
    await belir(c, [tA, tK, tB, d18.g], 300, 0);
    const satir = (y, parcalar) => { const t = renkli(c, svg, 250, y, parcalar, { hiza: 'start', size: 26, kalin: 600 }); gizle(t); return t; };
    const l1 = satir(100, ['Necati: 2 / 3']), l2 = satir(144, ['A: 6 / 9 = 2 / 3']), l3 = satir(188, ['B: 10 / 15 = 2 / 3']);
    const tikYan = (t, y) => { const w = t.getBBox().width; const k = tik(c, svg, 250 + w + 30, y - 9, 0.9); gizle(k); return k; };
    const k2 = tikYan(l2, 144), k3 = tikYan(l3, 188);
    await par(c.say('A için 6 / 9 = 2 / 3: Necati’nin oranıyla aynı.', { speak: 'A için altı bölü dokuz eşittir iki bölü üç: Necati’nin oranıyla aynı.' }), (async () => {
      await belir(c, l1, 450); await belir(c, l2, 450); await belir(c, k2, 350);
    })());
    await par(c.say('B için 10 / 15 = 2 / 3: o da tutuyor.', { speak: 'B için on bölü on beş eşittir iki bölü üç: o da tutuyor.' }), (async () => {
      await belir(c, l3, 450); await belir(c, k3, 350);
    })());
  }

  /* ---- 3. Gölge direği geçmesin ---- */
  async function golge(c) {
    const svg = c.svg(1000, 562);
    const { Z, pt, yer } = lambaZemin(c, svg);
    const { P, A, K, B: Bn, M, N } = pt, K2 = Z.P(14, 10), N2 = Z.P(14, 8);
    const yz = (x, y, m, o) => { const t = yazi(c, svg, x, y, m, Object.assign({ size: 24, kalin: 700 }, o)); gizle(t); return t; };
    const raySon = cizgi(c, svg, P, Bn, ISIK, 3, { 'stroke-dasharray': '10 8', 'stroke-opacity': 0.8 }), rP = cizgi(c, svg, P, M, ISIK, 3);
    const dA = direk(c, svg, P, A), dB = direk(c, svg, pt.Q, Bn);
    const hayalet = necati(c, svg, K2, N2), nk = necati(c, svg, K, N);
    hayalet.style.opacity = 0;
    const d18 = olcu(c, svg, A, Bn, '18', RENK.cizgi, { kay: [0, 88], yazi: [0, 32], yazirenk: SAYI });
    const d6 = olcu(c, svg, K, K2, '6', RENK.cizgi, { kay: [0, 42], yazirenk: ARA });
    const tA = yz(A[0], A[1] + 28, 'A'), tB = yz(Bn[0], Bn[1] + 28, 'B'), tK = yz(K[0], K[1] + 28, 'K'), tK2 = yz(K2[0], K2[1] + 28, 'K′'), tP = yz(P[0] - 22, P[1] - 6, 'P');
    const tN = yz(N[0], N[1] - 26, 'N'), tN2 = yz(N2[0], N2[1] - 26, 'N′');
    const t6 = yz(A[0] - 24, 318, '6'), t2 = yz(K[0] - 22, 395, '2');
    gizle(Z.g, yer, dA, dB, nk, rP, raySon, d18.g, d6.g);
    await par(c.say('Necati B’ye doğru yürüyor.'), belir(c, [Z.g, yer, dA, dB, nk, rP, tA, tB, tK, tP, tN, t6, t2], 700));
    await par(c.say('A lambasının gölgesi B direğini geçmesin.'), E.parla(c, dB, 900));
    await par(c.say('En uzak durumda gölgenin ucu tam B’nin dibinde.'), (async () => {
      await par(belir(c, hayalet, 500, 0.4), belir(c, raySon, 500, 0.8));
      await belir(c, [tK2, tN2], 400);
    })());
    tB.textContent = 'B = M';
    await par(c.say('O zaman |AM| = 18.', { speak: 'O zaman A M uzunluğu eşittir on sekiz.' }), belir(c, d18.g, 500));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Necati en fazla kaç metre yürüyebilir?',
      options: ['3 m', '6 m', '12 m'], answer: 1,
      hints: ['3 m, ilk gölgenin boyudur. Yürüdüğü yol |AK′| − |AK| farkıdır.', '', '12 m, |AK′|’dür. Başlangıçtaki |AK| = 6 çıkarılmalı.'],
      right: 'Evet. |K′M| = 6, |AK′| = 12 ve yürünen yol 12 − 6 = 6.',
    });
    // Necati K'den K′ne yürür; gölgenin ucu B'nin dibine oturur.
    await par(c.say('Necati K′ noktasına yürür; gölgenin ucu B’nin dibine oturur.', { speak: 'Necati K üssü noktasına yürür; gölgenin ucu B’nin dibine oturur.' }), (async () => {
      await belir(c, [t6, t2, tN2], 300, 0); tN2.remove();
      const dx = K2[0] - K[0];
      await c.tween(1600, (e) => {
        const tr = `translate(${dx * e},0)`;
        nk.setAttribute('transform', tr); tN.setAttribute('transform', tr);
        koy(rP, P, Z.P(11 + 9 * e, 10));
      }, Ders.ease.inOut);
      hayalet.remove(); raySon.remove();
      await belir(c, d6.g, 500);
    })());
    c.clearSay();
    await c.say('Aynı benzerlik yolu bu soruya da yetti.');
  }

  /* ---- 4. Sayılar değişince ---- */
  async function sayilar(c) {
    const svg = c.svg(1000, 562);
    const gF = c.S('g', {}, svg);
    const k = kule(c, gF, [60, 480], [312, 480], [312, 144]);
    const l9 = k.et(k.A, k.B, '9', SAYI), l12 = k.et(k.B, k.C, '12', SAYI), l15 = k.et(k.A, k.C, '15', ARA), l54 = k.et(k.A, k.H, '5,4', ARA);
    const hbc = c.S('polygon', { points: [k.B, k.H, k.C].map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.25, stroke: EL[1], 'stroke-width': 3, 'stroke-linejoin': 'round' }, gF);
    gizle(hbc);
    const tab = E.ikiYol(c, svg, { x: 396, y: 110, genislik: 600, basliklar: ['Benzerlik', 'Öklid'], renkler: [EL[0], EL[1]], size: 22, aralik: 44 });
    tab.ayrac.setAttribute('y2', 110 + 14 + 5 * 44);
    gizle(tab.g);
    // Satırlar kendi sırasında dizilir; biten satır silinir, kalanlar yukarı kayar.
    const canli = [[], []], yOf = (s) => 110 + (s + 1) * 44;
    const satirEkle = async (k, parcalar, ms = 450) => {
      const t = c.S('text', { x: 396 + k * 300, y: yOf(canli[k].length), 'text-anchor': 'start', 'font-size': 22, 'font-weight': 600, style: 'fill:' + RENK.yazi }, tab.g);
      parcalar.forEach((q, j) => { const [m, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m }, t); if (j === 0) ts.setAttribute('x', 396 + k * 300); if (r) ts.style.fill = r; });
      t.style.opacity = 0; canli[k].push(t); await belir(c, t, ms); return t;
    };
    const cikar = async (k, adet) => {
      await sil(c, canli[k].splice(0, adet), 300);
      const kalan = canli[k], y0 = kalan.map((t) => +t.getAttribute('y'));
      await c.tween(350, (e) => kalan.forEach((t, i) => t.setAttribute('y', y0[i] + (yOf(i) - y0[i]) * e)), Ders.ease.inOut);
    };
    await par(c.say('Gözlem kulesinde çıkarımı başka sayılarla sınayalım: dik kenarlar 9 ve 12.', { speak: 'Gözlem kulesinde çıkarımı başka sayılarla sınayalım: dik kenarlar dokuz ve on iki.' }), belir(c, [k.tri.g, k.dikB, l9, l12], 600));
    await par(c.say('Pisagor: 81 + 144 = 225; |AC| = 15.', { speak: 'Pisagor: seksen bir artı yüz kırk dört eşittir iki yüz yirmi beş; A C uzunluğu eşittir on beş.' }), belir(c, l15, 500));
    await par(c.say('Benzerlik: |BC| / |BH| = |AC| / |AB|.', { speak: 'Benzerlik: B C uzunluğu bölü B H uzunluğu eşittir A C uzunluğu bölü A B uzunluğu.' }), (async () => {
      await belir(c, [tab.g, k.bh, k.dikH, k.hL, k.q.g, hbc], 600);
      await satirEkle(0, ['|BC| / |BH| = |AC| / |AB|']);
    })());
    await par(c.say('Yani 12 / |BH| = 15 / 9.', { speak: 'Yani on iki bölü B H uzunluğu eşittir on beş bölü dokuz.' }), satirEkle(0, ['12 / |BH| = 15 / 9']));
    await par(c.say('Buradan |BH| = 12 · 9 ÷ 15 = 7,2.', { speak: 'Buradan B H uzunluğu eşittir on iki çarpı dokuz bölü on beş eşittir yedi virgül iki.' }), (async () => {
      await cikar(0, 1);
      const r = await satirEkle(0, ['|BH| = 12 · 9 ÷ 15 = ', ['7,2', ARA]]);
      k.q.kutu.remove(); cevapla(k.q.yazi, '7,2');
      await par(E.parla(c, k.q.yazi, 700), E.parla(c, r, 700));
      await par(cikar(0, 1), belir(c, [l12, hbc], 350, 0));
      l12.remove();
    })());
    await par(c.say('Öklid: 81 = |AH| · 15; |AH| = 5,4.', { speak: 'Öklid: seksen bir eşittir A H uzunluğu çarpı on beş; A H uzunluğu eşittir beş virgül dört.' }), (async () => {
      await satirEkle(1, ['81 = |AH| · 15']);
      await belir(c, l9, 300, 0); l9.remove();
      await par(satirEkle(1, ['|AH| = ', ['5,4', ARA]]), belir(c, l54, 450));
    })());
    await par(c.say('|HC| = 15 − 5,4 = 9,6.', { speak: 'H C uzunluğu eşittir on beş eksi beş virgül dört eşittir dokuz virgül altı.' }), (async () => {
      await cikar(1, 1);
      await satirEkle(1, ['|HC| = 15 − 5,4 = ', ['9,6', ARA]]);
    })());
    await par(c.say('|BH|² = 5,4 · 9,6 = 51,84.', { speak: 'B H uzunluğunun karesi eşittir beş virgül dört çarpı dokuz virgül altı eşittir elli bir virgül seksen dört.' }), (async () => {
      await par(cikar(1, 2), belir(c, l54, 350, 0));
      l54.remove();
      await satirEkle(1, ['|BH|² = 5,4 · 9,6']);
      await satirEkle(1, ['= ', ['51,84', ARA]]);
    })());
    await par(c.say('7,2 × 7,2 = 51,84; iki yol yine aynı: 7,2.', { speak: 'Yedi virgül iki çarpı yedi virgül iki eşittir elli bir virgül seksen dört; iki yol yine aynı: yedi virgül iki.' }), (async () => {
      const r = await satirEkle(1, ['7,2 × 7,2 = ', ['51,84', ARA]]);
      await E.parla(c, [k.q.yazi, canli[0][0], r], 800);
    })());
    await c.say('Sayılar değişti, yollar değişmedi; sonuçlar yine aynı çıktı.');
    c.clearSay();
    await sil(c, [gF, tab.g], 400);

    // Dik kenarları 3 ve 4 olan kule.
    const gF2 = c.S('g', {}, svg);
    const k2 = kule(c, gF2, [110, 470], [320, 470], [320, 190]);
    k2.q.g.setAttribute('transform', 'translate(44, -59)');   // küçük kulede kutu AB kenarına biniyordu: yüksekliğin öbür yanına
    const m3 = k2.et(k2.A, k2.B, '3', SAYI), m4 = k2.et(k2.B, k2.C, '4', SAYI), m5 = k2.et(k2.A, k2.C, '5', ARA);
    await belir(c, [k2.tri.g, k2.dikB, k2.bh, k2.dikH, k2.hL, k2.q.g, m3, m4], 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Dik kenarları 3 ve 4 olan bir kulede, hipotenüse inen destek direği kaç birimdir?',
      options: ['2,4 birim', '2,5 birim', '1,8 birim'], answer: 0,
      hints: ['', '2,5, hipotenüsün yarısıdır. Önce hipotenüs: 9 + 16 = 25, yani 5; sonra oran: 4 / |BH| = 5 / 3.', '1,8, 9 ÷ 5 işleminden çıkar; bu |AH| parçasıdır. Oran kur: 4 / |BH| = 5 / 3.'],
      right: 'Evet. Hipotenüs 5; 4 / |BH| = 5 / 3 ve |BH| = 2,4.',
    });
    k2.q.kutu.remove(); cevapla(k2.q.yazi, '2,4');
    await par(c.say('Dik kenarlar 3 ve 4 iken hipotenüs 5, yükseklik 2,4.', { speak: 'Dik kenarlar üç ve dört iken hipotenüs beş, yükseklik iki virgül dört.' }), (async () => {
      await belir(c, m5, 450); await E.parla(c, k2.q.yazi, 700);
    })());
    const sat = (y, parcalar) => { const t = renkli(c, svg, 560, y, parcalar, { hiza: 'start', size: 28, kalin: 600 }); gizle(t); return t; };
    const r1 = sat(250, ['9–12–15  →  ', ['7,2', ARA]]), r2 = sat(320, ['3–4–5  →  ', ['2,4', ARA]]);
    const kk1 = tik(c, svg, 800, 241, 1), kk2 = tik(c, svg, 800, 311, 1); gizle(kk1, kk2);
    await par(c.say('Bir yolun işe yaradığını bir örnekle değil, birçok örnekle sınarız.'), (async () => {
      await belir(c, [r1, kk1], 450); await belir(c, [r2, kk2], 450);
    })());
  }

  /* ---- 5. Hangi yol hangi probleme? ---- */
  function simgeKule(c, p, cx, cy) {
    const g = c.S('g', {}, p), A = [cx - 55, cy + 30], Bp = [cx + 45, cy + 30], C = [cx + 45, cy - 30], t = 10000 / 13600;
    const H = [A[0] + t * (C[0] - A[0]), A[1] + t * (C[1] - A[1])];
    c.S('polygon', { points: [A, Bp, C].map((q) => q.join(',')).join(' '), fill: RENK.sekil, 'fill-opacity': 0.18, stroke: RENK.sekil, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    cizgi(c, g, Bp, H, ISTEN, 3);
    return g;
  }
  function simgeLamba(c, p, cx, cy) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [cx - 60, cy + 30], [cx + 60, cy + 30], RENK.cizgi, 2.5);
    cizgi(c, g, [cx - 45, cy + 30], [cx - 45, cy - 5], RENK.cizgi, 4); cizgi(c, g, [cx + 45, cy + 30], [cx + 45, cy - 35], RENK.cizgi, 4);
    cizgi(c, g, [cx, cy + 30], [cx, cy + 10], RENK.yazi, 3);
    cizgi(c, g, [cx - 45, cy - 5], [cx + 60, cy + 30], ISIK, 2.5);
    return g;
  }
  function simgePerde(c, p, cx, cy) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [cx - 55, cy + 30], [cx + 50, cy + 30], RENK.cizgi, 2.5); cizgi(c, g, [cx + 50, cy - 32], [cx + 50, cy + 30], RENK.cizgi, 2.5);
    cizgi(c, g, [cx - 50, cy - 30], [cx + 10, cy + 30], ISIK, 2.5); cizgi(c, g, [cx - 10, cy - 30], [cx + 50, cy + 30], ISIK, 2.5);
    cizgi(c, g, [cx - 24, cy - 30], [cx - 24, cy + 2], RENK.cizgi, 4);
    return g;
  }

  async function tablo(c) {
    const svg = c.svg(1000, 562);
    const RY = [230, 330, 430], CX = [640, 850];
    const g = c.S('g', {}, svg);
    yazi(c, g, CX[0], 140, 'Öklid', { size: 28, kalin: 700, renk: EL[1] }); yazi(c, g, CX[1], 140, 'Benzerlik', { size: 28, kalin: 700, renk: EL[0] });
    c.S('line', { x1: 60, y1: 166, x2: 940, y2: 166, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
    [280, 380].forEach((y) => c.S('line', { x1: 60, y1: y, x2: 940, y2: y, stroke: RENK.kenarlik, 'stroke-width': 1.5, 'stroke-opacity': 0.5 }, g));
    const AD = ['Gözlem kulesi', 'Lamba direkleri', 'Stor perde'];
    AD.forEach((a, i) => yazi(c, g, 225, RY[i] + 9, a, { hiza: 'start', size: 26, kalin: 600 }));
    const simgeler = [simgeKule(c, g, 125, RY[0]), simgeLamba(c, g, 125, RY[1]), simgePerde(c, g, 125, RY[2])];
    const isaret = [[null, null], [null, null], [null, null]];
    const koyIsaret = (i, j, tur) => { const o = tur ? tik(c, g, CX[j], RY[i] - 4, 1.2) : capraz(c, g, CX[j], RY[i] - 4, 1.2); gizle(o); isaret[i][j] = o; return o; };
    // satır, sütun (0 Öklid, 1 Benzerlik): kule ✓ ✓; lamba ✗ ✓; perde ✗ ✓
    const ister = [[0, 0, 1], [0, 1, 1], [1, 0, 0], [1, 1, 1], [2, 0, 0], [2, 1, 1]].map(([i, j, t]) => koyIsaret(i, j, t));
    gizle(g);
    await par(c.say('Üç problemi iki yola göre inceleyelim.'), belir(c, g, 700));
    await par(c.say('Benzerlik üçünde de işe yaradı.'), (async () => { for (const i of [1, 3, 5]) { await belir(c, ister[i], 350); } })());
    await par(c.say('Öklid yalnızca dik köşeden hipotenüse yükseklik varken çalıştı.'), (async () => { for (const i of [0, 2, 4]) { await belir(c, ister[i], 350); } })());
    await par(c.say('Işık, gölge ve paralel ışınlarda benzer üçgen aranır.'), E.parla(c, [simgeler[1], simgeler[2]], 900));
    await par(c.say('Yükseklik varsa iki yol da denenebilir.'), E.parla(c, simgeler[0], 900));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi problemde Öklid yolu işe yaramaz?',
      options: ['Dik üçgende hipotenüse inen yüksekliği bulma', 'Bir direğin gölgesinden direğin boyunu bulma', 'Dik kenarın hipotenüs üzerindeki parçasını bulma'], answer: 1,
      hints: ['Bu problemde hipotenüse inen yükseklik var; Öklid çalışır.', '', 'Öklid, hipotenüse inen yükseklikle çalışır; bu parça onun ürünüdür.'],
      right: 'Evet. Gölge probleminde dik köşeden inen yükseklik yok.',
    });
    await par(c.say('Gölge problemlerinde dik köşeden inen yükseklik yok.'), E.parla(c, simgeler[1], 900));
    c.clearSay();
    await par(c.say('Yolu, problemin ipucuna göre seçeriz.'), E.parla(c, [g.children[0], g.children[1]], 800));
  }

  /* ---- 6. Hangi yol hangi problemde sonuca varır? ---- */
  async function siniflandir(c) {
    const svg = c.svg(1000, 562);
    const BX = 340, BW = 630, KY = [112, 322], BYK = 184;
    const kutular = c.S('g', {}, svg);
    [['Sonuca varır', ARA], ['Sonuca varmaz', GRI]].forEach(([a, r], i) => {
      c.S('rect', { x: BX, y: KY[i], width: BW, height: BYK, rx: 14, fill: RENK.yuzey, stroke: r, 'stroke-width': 3 }, kutular);
      yazi(c, kutular, BX + 28, KY[i] + 42, a, { hiza: 'start', size: 28, kalin: 700, renk: r });
    });
    gizle(kutular);
    await par(c.say('Şimdi yolları problemlere göre ayıralım.'), belir(c, kutular, 600));
    const KART = [
      { satir: ['Lambayı Öklid', 'ile çözmek'], metin: 'Lambayı Öklid ile çözmek', kutu: 1, sira: [0, 1], ipucu: 'Dik köşeden hipotenüse inen yükseklik yok.', son: 'Lambada dik köşeden hipotenüse inen yükseklik yok; Öklid çıkmaz.', speak: null },
      { satir: ['9–12–15 kuleyi', 'Öklid ile çözmek'], metin: '9–12–15 kuleyi Öklid ile çözmek', kutu: 0, sira: [0, 1], ipucu: 'Kulede dik köşeden hipotenüse inen yükseklik var.', sonuc: '7,2', son: 'Kulede yükseklik var; Öklid 7,2 buldu.', speak: 'Kulede yükseklik var; Öklid yedi virgül iki buldu.' },
      { satir: ['Lambayı', 'benzerlikle çözmek'], metin: 'Lambayı benzerlikle çözmek', kutu: 0, sira: [1, 0], ipucu: 'Lambada PAM ~ NKM benzerliği gölge boyunu buldu.', sonuc: 's = 3', son: 'Lambada benzerlik işe yaradı: gölge boyu 3 metre.', speak: 'Lambada benzerlik işe yaradı: gölge boyu üç metre.' },
      { satir: ['Stor perdeyi', 'Öklid ile çözmek'], metin: 'Stor perdeyi Öklid ile çözmek', kutu: 1, sira: [1, 0], ipucu: 'Perdede dik köşeden hipotenüse inen yükseklik var mı?', son: 'Perdede dik köşeden hipotenüse inen yükseklik yok.', speak: null },
    ];
    const ADLAR = ['Sonuca varır', 'Sonuca varmaz'], doluluk = [0, 0];
    for (let n = 0; n < KART.length; n++) {
      const K = KART[n], kart = c.S('g', {}, svg);
      c.S('rect', { x: 30, y: 190, width: 280, height: 170, rx: 14, fill: RENK.yuzey, stroke: ISTEN, 'stroke-width': 3 }, kart);
      K.satir.forEach((s, i) => yazi(c, kart, 170, 262 + i * 46, s, { size: 26, kalin: 600 }));
      gizle(kart); await belir(c, kart, 400);
      const opts = K.sira.map((i) => ADLAR[i]);
      await c.choice({
        tag: 'Sıra sende', q: `Kart: “${K.metin}”. Hangi kutuya girer?`,
        options: opts, answer: K.sira.indexOf(K.kutu),
        hints: K.sira.map((i) => (i === K.kutu ? '' : K.ipucu)),
        right: `Evet. ${ADLAR[K.kutu]}.`,
      });
      // Kart kutudaki yerinde belirir.
      const y = KY[K.kutu] + 92 + 54 * doluluk[K.kutu]; doluluk[K.kutu]++;
      const metin = yazi(c, kutular, BX + 78, y, K.metin, { hiza: 'start', size: 24, kalin: 600 }); gizle(metin); metin.style.opacity = 0;
      const ikon = [BX + 40, y - 8];
      await par(c.say(K.son, K.speak ? { speak: K.speak } : undefined), (async () => {
        await sil(c, kart, 300);
        await belir(c, metin, 450);
        if (K.kutu === 0) {
          const t = tik(c, kutular, ikon[0], ikon[1], 1); gizle(t); await belir(c, t, 350);
          const s = yazi(c, kutular, BX + BW - 28, y, K.sonuc, { hiza: 'end', size: 26, kalin: 700, renk: ARA }); gizle(s); await belir(c, s, 400);
        } else {
          const cm = E.cikmaz(c, kutular, [metin], ikon, { boyut: 14 }); await cm.kapat(700);
        }
      })());
      c.clearSay();
    }
    // Kutular tahtaya ortalanır.
    await par(c.say('Işık ve gölgede benzerlik; yükseklik varsa Öklid de denenir.'), c.tween(700, (e) => kutular.setAttribute('transform', `translate(${-155 * e},0)`), Ders.ease.inOut));
    c.note('<b>Işık ve gölgede benzerlik; yükseklik varsa Öklid de denenir.</b>', 'Yol seçimi', 'e4-yol-secimi');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-e4', kicker: 'Konu E · Eşlik ve benzerlik problemleri', title: 'Bu yol başka nerede işe yarar?', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Bu yol başka nerede işe yarar?',
      hook: 'Bir problemde işe yarayan yol, <b>başka hangi problemlerde</b> de işe yarar?',
      button: 'Derse başla ›',
    },
    goals: ['Bir problemde işe yarayan yolu başka bir problemde sınar.', 'Sayılar değişince yolun aynı kaldığını görür.', 'Yolun hangi problemde sonuca vardığını, hangisinde varmadığını ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Gözlem kulesinin iki yolu; Açı-Açı.', run: hatirla },
      { title: 'Başka problemde sınama: iki lamba direği', goal: 'Lamba problemini benzerlikle çöz; Öklid çıkmaz.', run: lamba },
      { title: 'Gölge direği geçmesin', goal: 'Aynı benzerlik yolu yeni soruda.', run: golge },
      { title: 'Sayılar değişince', goal: 'Kulede iki yol yeni sayılarla aynı sonucu verir.', run: sayilar },
      { title: 'Hangi yol hangi probleme?', goal: 'Üç problemi iki yola göre incele.', run: tablo },
      { title: 'Hangi yol hangi problemde sonuca varır?', goal: 'Yolları problemlere göre ayır.', run: siniflandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir öğrenci “Kulede Öklid işe yaradı, lamba problemlerinde de işe yarar” diyor. Hangisi doğrudur?',
        options: ['Doğru, Öklid her problemde çalışır', 'Öklid yalnızca dik köşeden hipotenüse yükseklik varken çalışır; lambada yok', 'Yanlış, çünkü Öklid hiçbir problemde çalışmaz'], answer: 1,
        why: ['Öklid her problemde çalışmaz; lamba şeklinde dik köşeden hipotenüse inen yükseklik yok.', 'Kulede böyle bir yükseklik vardı; lambada yok, orada benzerlik çalışır.', 'Kulede Öklid sonuca vardı; yani bazı problemlerde çalışır.'],
        scene: 4,
      },
      {
        q: 'Dik kenarları 12 ve 16 olan dik üçgende hipotenüse inen yükseklik kaç birimdir?',
        options: ['7,2 birim', '10 birim', '9,6 birim'], answer: 2,
        why: ['7,2, yüksekliğin hipotenüs üzerinde ayırdığı bir parçadır (144 ÷ 20); yükseklik değil.', '10, hipotenüsün (20) yarısıdır; yükseklik buna eşit değildir.', 'Hipotenüs 20; benzerlikten 12 / h = 20 / 16 ve h = 9,6.'],
        scene: 3,
      },
      {
        q: 'Lamba problemi aynı lambalarla (6 m ve 10 m), ama A ile B arası 24 m olsaydı gölge boyu s kaç metre olurdu?',
        options: ['4 m', '3 m', '6 m'], answer: 0,
        why: ['|AK| = 2s ve |KB| = 4s olduğundan 6s = 24 ve s = 4 m.', '3 m, 18 m’lik durumun cevabıdır; toplam 24 olunca s değişir.', '6 m, 18 m’lik durumda |AK|’dir; s değil.'],
        scene: 1,
      },
      {
        q: 'Lamba problemindeki Necati A lambasından 6 m, B lambasından 12 m uzakta duruyor (lambalar 6 m ve 10 m, Necati 2 m, A ile B arası 18 m). Bu kez B lambasının gölgesi A direğini geçmesin diye Necati A’ya doğru yürüyor. Gölgenin ucu tam A’nın dibine gelene kadar en fazla kaç metre yürüyebilir?',
        options: ['14,4 m', '3,6 m', '2,4 m'], answer: 2,
        why: ['14,4 m, Necati’nin son durumda B’ye uzaklığıdır; başlangıçtaki 12 m çıkarılmalı.', '3,6 m gölgenin boyudur (10 / 2 = 18 / ℓ); Necati’nin yürüdüğü yol değil.', 'Gölge ucu A’dayken Necati A’dan 3,6 m uzakta; başta 6 m uzaktaydı: 6 − 3,6 = 2,4 m.'],
        scene: 2,
      },
    ],
    summary: [
      'Bir yol her probleme uymaz; <b>ipucuna göre</b> seçilir.',
      'Öklid yalnızca dik köşeden inen yükseklik varken çalışır; benzerlik ışık ve gölgede çalışır.',
      'Yol, birçok örnekle sınanır.',
      '<b>Yolu ipucuna göre seç, birçok örnekle sına.</b>',
    ],
    nextLesson: { href: 'e5-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
