/* E2 — Strateji kur, uygula, kontrol et
   Problemdeki ipucu hangi aracı çağırır (eşlik, benzerlik, Tales, Öklid, Pisagor); strateji kurulur, uygulanır, sonuç denetlenir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/E-problemler.md (E2)
   Sıra: hatırla, araç seçimi, tepe ve ayna (benzerlik + Pisagor), sonucu denetle, çiçek deseni (eşlik), stor perde (benzerlik),
   yapı ve kitap (Öklid), hangi araç (sınıflandırma). */
(() => {
  'use strict';
  const { RENK, ara, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, cokgen, aciYayi, aciIci, araHepsi, agirlik, dondur } = window.KIT;
  const B = window.KIT_B, E = window.KIT_E;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil
  const SAYI = RENK.yazi, ARA = RENK.iyi, ISTEN = RENK.merkez, ISIK = 'var(--c6)', GRI = RENK.soluk;
  const liste = (x) => [x].flat(Infinity);
  const sil = async (c, el, ms = 300) => { await belir(c, liste(el), ms, 0); liste(el).forEach((e) => e.remove()); };

  /* Ölçü çizgisi: P–Q doğru parçasından kay kadar ötede, uçlarında çentik; yazı çizginin ortasında yazi kadar kaymış. */
  function olcu(c, p, P, Q, metin, renk, o = {}) {
    const g = c.S('g', {}, p), k = o.kay || [0, 52], P2 = [P[0] + k[0], P[1] + k[1]], Q2 = [Q[0] + k[0], Q[1] + k[1]], n = yon(P2, Q2) + Math.PI / 2;
    if (o.uzat) { cizgi(c, g, P, P2, renk, 1.5, { 'stroke-opacity': 0.4 }); cizgi(c, g, Q, Q2, renk, 1.5, { 'stroke-opacity': 0.4 }); }
    const hat = cizgi(c, g, P2, Q2, renk, o.w || 2.5);
    [P2, Q2].forEach((X) => cizgi(c, g, ileri(X, n, 7), ileri(X, n, -7), renk, o.w || 2.5));
    const M = ara(P2, Q2, 0.5), y = o.yazi || [0, 28];
    const t = yazi(c, g, M[0] + y[0], M[1] + y[1], metin, { size: o.size || 24, kalin: 700, renk: o.yazirenk || renk, hiza: o.hiza });
    return { g, hat, yazi: t };
  }

  /* "İpucu → araç" satırı (küçük). */
  const ipucu = (c, p, x, y, a, b, renk = EL[1]) => renkli(c, p, x, y, [a, [' → ', GRI], [b, renk]], { hiza: 'start', size: 24, kalin: 600 });

  /* Beş aracın küçük simgesi (merkez cx, cy; yaklaşık 110 × 64 birim). */
  function simge(c, p, tur, cx, cy, k = 1) {
    const g = c.S('g', { transform: `translate(${cx},${cy}) scale(${k})` }, p);
    const poly = (pts, renk, dolgu = 0.2, w = 2.5) => c.S('polygon', { points: pts.map((q) => q.join(',')).join(' '), fill: renk, 'fill-opacity': dolgu, stroke: renk, 'stroke-width': w, 'stroke-linejoin': 'round' }, g);
    if (tur === 'aa') {
      const T1 = [[-50, 24], [-12, 24], [-38, -2]], T2 = T1.map((q) => [12 + (q[0] + 50) * 1.35, 24 + (q[1] - 24) * 1.35]);
      poly(T1, EL[1]); poly(T2, EL[0]);
      [T1, T2].forEach((T, i) => { aciYayi(c, g, T[0], T[1], T[2], EL[0], i ? 15 : 11); aciYayi(c, g, T[1], T[0], T[2], EL[2], i ? 15 : 11); });
    } else if (tur === 'tales') {
      [-14, 14].forEach((y) => cizgi(c, g, [-52, y], [52, y], RENK.dogru, 3.5, { 'stroke-dasharray': '8 6' }));
      cizgi(c, g, [-36, -30], [-12, 30], RENK.cizgi, 2.5); cizgi(c, g, [8, -30], [40, 30], RENK.cizgi, 2.5);
    } else if (tur === 'oklid') {
      const A = [-16, -13], Bp = [-40, 24], C = [40, 24], H = [-16, 24];
      poly([A, Bp, C], EL[0]); cizgi(c, g, A, H, ISTEN, 3.5);
      aciYayi(c, g, A, Bp, C, RENK.cizgi, 16, { dik: true }); aciYayi(c, g, H, A, C, RENK.cizgi, 14, { dik: true });
    } else if (tur === 'pisagor') {
      const A = [-34, -22], Bp = [-34, 24], C = [34, 24];
      poly([A, Bp, C], EL[0], 0.12, 1.5); cizgi(c, g, A, Bp, EL[0], 5); cizgi(c, g, Bp, C, EL[0], 5); cizgi(c, g, A, C, ISTEN, 5);
      aciYayi(c, g, Bp, A, C, RENK.cizgi, 16, { dik: true });
    } else {
      const T = [[-52, 24], [-10, 24], [-40, -16]];
      poly(T, EL[0]); poly(T.map((q) => [q[0] + 62, q[1]]), EL[1]);
    }
    return g;
  }

  /* ---- Hakan'ın tepesi şeması (E1'deki ile aynı; b piksel = 100 m). Parçalar h.p içinde adla durur. ---- */
  function hakan(c, p, o) {
    const b = o.b, x0 = o.x0, yz = o.yz, X = (u) => x0 + u * b;
    const Pb = [X(1), yz], Ph = [X(7.75), yz], Pd = [X(14.5), yz], Pa = [X(19.75), yz], Pl = [X(19.77), yz], Pt = [X(7.75), yz - 9 * b];
    const g = c.S('g', {}, p), pp = {};
    const dalga = (S, Tt, faz) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return ileri(ara(S, Tt, t), yon(S, Tt) + Math.PI / 2, i === 0 || i === 12 ? 0 : 7 * Math.sin(t * 9 + faz) * (0.4 + b / 40)); });
    const kenar = [...dalga(Pb, Pt, 0), ...dalga(Pt, Pd, 2).slice(1)];
    pp.sil = c.S('polygon', { points: kenar.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' '), fill: '#2a3869', 'fill-opacity': 0.6, stroke: '#4a5a9c', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    pp.yer = cizgi(c, g, [X(0.2), yz], [X(21.2), yz], RENK.cizgi, 3);
    pp.yamac = c.S('g', {}, g); cizgi(c, pp.yamac, Pb, Pt, RENK.cizgi, 2.5); cizgi(c, pp.yamac, Pt, Pd, RENK.cizgi, 2.5);
    pp.tha = c.S('polygon', { points: [Pt, Ph, Pa].map((q) => q.join(',')).join(' '), fill: EL[0], 'fill-opacity': 0.2, stroke: EL[0], 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const harf = (ad, P, dx, dy) => yazi(c, g, P[0] + dx, P[1] + dy, ad, { size: 26, kalin: 700 });
    pp.D = harf('D', Pd, 0, 32); pp.H = harf('H', Ph, 0, 32); pp.T = harf('T', Pt, 0, -16); pp.A = harf('A', Pa, -13, 32);
    pp.nD = nokta(c, g, Pd, SAYI, 5); pp.nH = nokta(c, g, Ph, SAYI, 5); pp.nT = nokta(c, g, Pt, SAYI, 5); pp.nA = nokta(c, g, Pa, SAYI, 5);
    pp.TH = cizgi(c, g, Pt, Ph, ISTEN, 3.5);
    pp.dikH = aciYayi(c, g, Ph, Pt, Pa, RENK.cizgi, 28, { dik: true });
    pp.isikT = cizgi(c, g, Pt, Pa, ISIK, 3);
    pp.yayA = aciYayi(c, g, Pa, Pt, Ph, EL[0], 38);
    pp.insan = c.S('g', {}, g); cizgi(c, pp.insan, [Pl[0] + 10, yz], [Pl[0] + 10, yz - 12], RENK.yazi, 2.5); c.S('circle', { cx: Pl[0] + 10, cy: yz - 16, r: 3.5, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2 }, pp.insan);
    pp.ayna = cizgi(c, g, [Pa[0] - 7, yz - 2], [Pa[0] + 7, yz - 2], RENK.yazi, 3.5);
    // Büyüteç kutusu: 1 birim = 0,5 m (kutunun kendi ölçeği); A–L 4 birim, L–K 3 birim.
    const bk = E.buyutec(c, g, { kutu: [o.kutu[0], o.kutu[1], 270, 200], nokta: Pa, r: 9 }), ic = bk.ic;
    const KA = bk.P(60, 150), KL = bk.P(220, 150), KK = bk.P(220, 30), Sol = bk.P(0, 150), Sag = bk.P(270, 150), Gelen = [KA[0] - 44, KA[1] - 33];
    pp.kutu = [bk.kutu, bk.hat, bk.halka];
    pp.kYer = cizgi(c, ic, Sol, Sag, RENK.cizgi, 2.5);
    pp.kAyna = cizgi(c, ic, [KA[0] - 16, KA[1] - 4], [KA[0] + 16, KA[1] - 4], RENK.yazi, 6);
    pp.kA = yazi(c, ic, KA[0] - 4, KA[1] + 32, 'A', { size: 24, kalin: 700 });
    pp.kL = yazi(c, ic, KL[0], KL[1] + 32, 'L', { size: 24, kalin: 700 });
    pp.kK = yazi(c, ic, KK[0] + 26, KK[1] + 8, 'K', { size: 24, kalin: 700 });
    pp.kGovde = cizgi(c, ic, KL, KK, RENK.yazi, 3.5);
    pp.kKafa = c.S('circle', { cx: KK[0], cy: KK[1] - 12, r: 10, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2.5 }, ic);
    pp.kIsik1 = cizgi(c, ic, KA, Gelen, ISIK, 3);
    pp.kIsik2 = cizgi(c, ic, KA, KK, ISIK, 3);
    pp.k2m = yazi(c, ic, (KA[0] + KL[0]) / 2, KA[1] + 34, '2 m', { size: 24, kalin: 700 });
    pp.k150 = yazi(c, ic, KL[0] - 14, KA[1] - 22, '150 cm', { size: 22, kalin: 700, hiza: 'end' });
    pp.kYay = c.S('g', {}, ic); B.esitYay(c, pp.kYay, KA, Gelen, Sol, 1, EL[0], { r: 34 }); B.esitYay(c, pp.kYay, KA, KK, Sag, 1, EL[0], { r: 34 });
    pp.kDikL = aciYayi(c, ic, KL, KK, KA, RENK.cizgi, 26, { dik: true });
    pp.kla = c.S('polygon', { points: [KK, KL, KA].map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.22, stroke: EL[1], 'stroke-width': 3, 'stroke-linejoin': 'round' }, ic);
    const ac = o.ac || [];
    Object.keys(pp).forEach((ad) => { if (!ac.includes(ad)) gizle(pp[ad]); else liste(pp[ad]).forEach((e) => { e.style.opacity = 1; }); });
    return { g, p: pp, tum: (...adlar) => adlar.flatMap((a) => liste(pp[a])), P: { B: Pb, H: Ph, D: Pd, A: Pa, L: Pl, T: Pt }, K: { A: KA, L: KL, K: KK } };
  }

  /* İki benzer dik üçgen yan yana, aynı duruşta: dik köşe solda altta, dikey kenar yukarı, yatay kenar sağa.
     harf: [üst, dik köşe, sağ]. Dik işareti ve sağ köşedeki eşit açı görünür; karşılıklı kenar çiftleri (dikey: yeşil, yatay: turkuaz) gizli başlar. */
  function ikiUcgen(c, p, o) {
    const g = c.S('g', {}, p), y = o.y, sz = o.size || 26;
    const kur = (x, w, h, harf, renk) => {
      const P = [[x, y - h], [x, y], [x + w, y]];
      const t = cokgen(c, g, P, renk, { harf, harfSize: sz });
      aciYayi(c, g, P[1], P[0], P[2], RENK.cizgi, 30, { dik: true });
      aciYayi(c, g, P[2], P[1], P[0], EL[2], o.yayR || 34);
      const v = cizgi(c, g, P[0], P[1], EL[2], 6), hh = cizgi(c, g, P[1], P[2], ISIK, 6);
      gizle(v, hh);
      return { P, t, v, h: hh, m: agirlik(P) };
    };
    return { g, b: kur(o.x1, o.w1, o.h1, o.harf1, EL[0]), k: kur(o.x2, o.w2, o.h2, o.harf2, EL[1]) };
  }
  const kenarYaz = (c, p, T, i, j, metin, renk, size = 26) => { const t = B.kenarEtiketi(c, p, T.P[i], T.P[j], metin, renk, { merkez: T.m, size }); gizle(t); return t; };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Bir problem kâğıdı: önce ne yapılır?
    const g1 = c.S('g', {}, svg);
    c.S('rect', { x: 330, y: 90, width: 340, height: 380, rx: 14, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2.5 }, g1);
    yazi(c, g1, 500, 148, 'Problem', { size: 34, kalin: 700 });
    [[360, 200, 280], [360, 238, 250], [360, 276, 270], [360, 314, 190], [360, 352, 240]].forEach(([x, y, w]) => c.S('rect', { x, y, width: w, height: 12, rx: 6, fill: RENK.kenarlik }, g1));
    yazi(c, g1, 500, 440, '?', { size: 46, kalin: 700, renk: ISTEN });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir problemi çözmeye başlarken ilk iş hangisidir?',
      options: ['Hemen bir oran yazmak', 'Verilenleri ve istenen şeyi ayırıp şekle dökmek', 'Sonucu tahmin edip yazmak'], answer: 1,
      hints: ['Önce verilen ve istenen ayrılır; sonra ilişkiler bulunur, durum şekle dökülür.', '', 'Önce verilen ve istenen ayrılır; sonra ilişkiler bulunur, durum şekle dökülür.'],
      right: 'Evet. Önce verilen ve istenen ayrılır, sonra durum şekle dökülür.',
    });
    await c.say('Önce verilen ve istenen ayrılır, sonra durum şekle dökülür.');
    c.clearSay();
    await sil(c, g1, 350);

    // Dik üçgende dik köşeden hipotenüse inen yükseklik.
    const g2 = c.S('g', {}, svg);
    const Bp = [266, 410], Cp = [734, 410], H = [410, 410], A = [410, 194], m = agirlik([A, Bp, Cp]);
    cokgen(c, g2, [A, Bp, Cp], RENK.sekil);
    cizgi(c, g2, A, H, ISTEN, 4);
    aciYayi(c, g2, A, Bp, Cp, RENK.cizgi, 34, { dik: true });
    aciYayi(c, g2, H, A, Cp, RENK.cizgi, 28, { dik: true });
    B.kenarEtiketi(c, g2, Bp, H, '4', SAYI, { merkez: A, size: 30 });
    B.kenarEtiketi(c, g2, H, Cp, '9', SAYI, { merkez: A, size: 30 });
    const soru = yazi(c, g2, H[0] + 24, 312, '?', { hiza: 'start', size: 34, kalin: 700, renk: ISTEN });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Dik üçgende dik köşeden hipotenüse inen yükseklik, hipotenüsü 4 ve 9 birimlik iki parçaya ayırıyor. Yükseklik kaç birimdir?',
      options: ['13 birim', '36 birim', '6 birim'], answer: 2,
      hints: ['Yüksekliğin karesi, iki parçanın çarpımıdır: h² = p · k.', 'Yüksekliğin karesi, iki parçanın çarpımıdır: h² = p · k.', ''],
      right: 'Evet. h² = 4 · 9 = 36 ve h = 6.',
    });
    cevapla(soru, '6');
    await c.say('Yüksekliğin karesi iki parçanın çarpımıdır: h² = 4 × 9.', { speak: 'Yüksekliğin karesi, iki parçanın çarpımıdır: h kare eşittir dört çarpı dokuz.' });
  }

  /* ---- 2. Araç seçimi ---- */
  async function arac(c) {
    const svg = c.svg(1000, 562);
    const tab = E.ipucuArac(c, svg, { x: 300, y: 92, ikinci: 350, size: 26, aralik: 82, genislik: 230 });
    gizle(tab.basliklar, tab.ayrac);
    const SATIR = [['İki açı eşit', 'Açı-Açı', 'aa'], ['Paralel doğrular', 'Tales', 'tales'], ['Dik köşeden yükseklik', 'Öklid', 'oklid'], ['Dik üçgenin iki kenarı', 'Pisagor', 'pisagor'], ['Eş parçalar', 'Eşlik', 'eslik']];
    const ikon = SATIR.map((s, i) => { const g = simge(c, svg, s[2], 190, 92 + (i + 1) * 82 - 9); gizle(g); return g; });
    await par(c.say('Çözmeden önce bir strateji kurarız: hangi üçgenler, hangi araç.', { speak: '[curious] Çözmeden önce bir strateji kurarız: hangi üçgenler, hangi araç.' }), belir(c, [...tab.basliklar, tab.ayrac], 500));
    await c.say('Şekildeki ipuçları aracı gösterir.');
    const soz = ['İki üçgende iki açı eşitse Açı-Açı benzerliğini kullanırız.', 'Paralel doğrular parçaları orantılı böler: Tales.', 'Dik köşeden hipotenüse yükseklik inmişse Öklid işe yarar.', 'Dik üçgenin iki kenarı biliniyorsa üçüncüsünü Pisagor verir.', 'Aynı kalıptan çıkan parçalar eş üçgendir: eşliği kullanırız.'];
    for (let i = 0; i < 5; i++) {
      await par(c.say(soz[i]), tab.ekle(i, SATIR[i][0], SATIR[i][1], 500), belir(c, ikon[i], 500));
    }
    await par(c.say('Bir problemde birden çok araç gerekebilir.'), E.parla(c, tab.tablo.satirlar.slice(1).map((s) => s.el), 900));
  }

  /* ---- 3. Tepe ve ayna: strateji ve uygulama ---- */
  async function tepe(c) {
    const svg = c.svg(1000, 562);
    const BAZ = ['yer', 'sil', 'yamac', 'T', 'D', 'H', 'A', 'nT', 'nD', 'nH', 'nA', 'insan', 'ayna', 'isikT', 'tha', 'kutu', 'kYer', 'kAyna', 'kA', 'kL', 'kK', 'kGovde', 'kKafa', 'kIsik1', 'kIsik2', 'kla'];
    const h = hakan(c, svg, { b: 40, x0: 45, yz: 445, kutu: [700, 85], ac: [] });
    const P = h.p;
    const satir = ipucu(c, svg, 20, 42, 'İki açı eşit', 'Açı-Açı'); gizle(satir);
    await par(c.say('Hakan’ın şemasına dönelim: iki dik üçgen, THA ve KLA.', { speak: 'Hakan’ın şemasına dönelim: iki dik üçgen, T H A ve K L A.' }), (async () => {
      await belir(c, h.tum(...BAZ), 600);
      await par(E.parla(c, P.tha, 700), E.parla(c, P.kla, 700));
    })());
    await par(c.say('Tablodaki ipucu: iki açı eşit, yani Açı-Açı.'), belir(c, satir, 500));
    await par(c.say('Dik açılar eşit; aynadaki iki açı da eşit.'), (async () => {
      await belir(c, h.tum('dikH', 'kDikL'), 450);
      await belir(c, h.tum('kYay'), 450);
    })());
    await par(c.say('D, H ile A arasında: TAD açısı, TAH açısının aynısı.', { speak: 'D, H ile A arasında: T A D açısı, T A H açısının aynısı.' }), (async () => {
      await belir(c, h.tum('yayA'), 500);
      await E.parla(c, P.yayA, 700);
    })());
    c.clearSay();

    // İki üçgen ayrı ve aynı duruşta.
    const ayri = ikiUcgen(c, svg, { y: 395, x1: 70, w1: 240, h1: 180, x2: 390, w2: 160, h2: 120, harf1: ['T', 'H', 'A'], harf2: ['K', 'L', 'A'] });
    gizle(ayri.g);
    const eTH = kenarYaz(c, ayri.g, ayri.b, 0, 1, '?', ISTEN), eHA = kenarYaz(c, ayri.g, ayri.b, 1, 2, '1200', SAYI);
    const eKL = kenarYaz(c, ayri.g, ayri.k, 0, 1, '1,5', SAYI), eLA = kenarYaz(c, ayri.g, ayri.k, 1, 2, '2', SAYI);
    const oran = yazi(c, svg, 560, 150, 'THA ~ KLA', { hiza: 'start', size: 30, kalin: 600 }); gizle(oran);
    await par(c.say('Açı-Açı: THA ve KLA üçgenleri benzerdir.', { speak: 'Açı-Açı: T H A ve K L A üçgenleri benzerdir.' }), (async () => {
      await belir(c, [h.g, satir], 500, 0);
      h.g.remove(); satir.remove();
      await par(belir(c, ayri.g, 500), belir(c, oran, 500));
    })());
    await par(c.say('Karşılıklı kenarlar: TH ile KL, HA ile LA.', { speak: 'Karşılıklı kenarlar: T H ile K L, H A ile L A.' }), (async () => {
      await belir(c, [ayri.b.v, ayri.k.v], 500);
      await belir(c, [ayri.b.h, ayri.k.h], 500);
    })());
    await par(c.say('Benzer üçgenlerde karşılıklı kenarlar orantılıdır.'), E.parla(c, [ayri.b.v, ayri.k.v, ayri.b.h, ayri.k.h], 900));
    await par(c.say('Oran: TH / KL = HA / LA.', { speak: 'Oran: T H bölü K L eşittir H A bölü L A.' }), (async () => {
      await belir(c, oran, 250, 0);
      parcaKoy(c, oran, [['TH', EL[2]], ' / ', ['KL', EL[2]], ' = ', ['HA', ISIK], ' / ', ['LA', ISIK]]);
      await belir(c, oran, 350);
    })());
    await par(c.say('Sayıları yerine koyalım: TH / 1,5 = 1200 / 2.', { speak: 'Sayıları yerine koyalım: T H bölü bir virgül beş eşittir bin iki yüz bölü iki.' }), (async () => {
      parcaKoy(c, oran, [['TH', ISTEN], ' / 1,5 = 1200 / 2']);
      await belir(c, [eTH, eHA, eKL, eLA], 500);
    })());
    const ikinci = yazi(c, svg, 560, 215, '', { hiza: 'start', size: 30, kalin: 600 }); gizle(ikinci);
    parcaKoy(c, ikinci, [['TH', ISTEN], ' = 1,5 × 600']);
    await par(c.say('1200 bölü 2, 600 eder: TH = 1,5 × 600 = 900.', { speak: 'Bin iki yüz bölü iki, altı yüz eder: T H eşittir bir virgül beş çarpı altı yüz eşittir dokuz yüz.' }), (async () => {
      await belir(c, ikinci, 450);
      await c.wait(500);
      parcaKoy(c, ikinci, [['TH = 900', ARA]]);
      cevapla(eTH, '900');
      await E.parla(c, [eTH], 600);
    })());
    await par(c.say('Tepe 900 metre yüksekliğinde.', { speak: 'Tepe dokuz yüz metre yüksekliğinde.' }), E.parla(c, [ikinci], 700));
    c.clearSay();

    // THD dik üçgeni: Pisagor.
    const gD = c.S('g', {}, svg);
    const T = [170, 100], H = [170, 388], D = [386, 388], m = agirlik([T, H, D]);
    cokgen(c, gD, [T, H, D], EL[0], { harf: ['T', 'H', 'D'], harfSize: 26 });
    aciYayi(c, gD, H, T, D, RENK.cizgi, 30, { dik: true });
    const td = cizgi(c, gD, T, D, ISTEN, 5);
    const e900 = B.kenarEtiketi(c, gD, T, H, '900', ARA, { merkez: m, size: 26 }), e675 = B.kenarEtiketi(c, gD, H, D, '675', ARA, { merkez: m, size: 26 }), eTD = B.kenarEtiketi(c, gD, T, D, '?', ISTEN, { merkez: m, size: 28, uzak: 44 });
    gizle(gD, e900, e675); gizle(td, eTD);
    const eq = yazi(c, svg, 520, 250, '', { hiza: 'start', size: 30, kalin: 600 }); gizle(eq);
    parcaKoy(c, eq, [['TD', ISTEN], '² = ', ['900', ARA], '² + ', ['675', ARA], '²']);
    await par(c.say('Şimdi zirveden D’ye doğrusal yol: TD.', { speak: 'Şimdi zirveden D’ye doğrusal yol: T D.' }), (async () => {
      await belir(c, [oran, ikinci, ayri.g], 450, 0);
      [oran, ikinci, ayri.g].forEach((e) => e.remove());
      gD.style.opacity = 0;
      await belir(c, gD, 450);
      await belir(c, [td, eTD], 500);
    })());
    await par(c.say('THD dik üçgeninde TH ve HD biliniyor: Pisagor.', { speak: 'T H D dik üçgeninde T H ve H D biliniyor: Pisagor.' }), (async () => {
      await belir(c, [e900, e675], 500);
      await belir(c, eq, 500);
    })());
    c.clearSay();
    parcaKoy(c, eq, [['TD', ISTEN], '² = ', ['900', ARA], '² + ', ['675', ARA], '² = 1 265 625']);
    await c.choice({
      tag: 'Birlikte çöz', q: 'TD² = 900² + 675² = 1 265 625. TD kaç metredir?',
      options: ['1575 m', '1125 m', '225 m'], answer: 1,
      hints: ['Pisagor kenarları toplamaz; kareleri toplar.', '', 'Pisagor kenarları toplamaz; kareleri toplar. 1125 × 1125 = 1 265 625.'],
      right: 'Evet. 1125 × 1125 = 1 265 625.',
    });
    cevapla(eTD, '1125');
    await par(c.say('Yürünecek yol 1125 metre.', { speak: 'Yürünecek yol bin yüz yirmi beş metre.' }), E.parla(c, [td, eTD], 800));
    await par(c.say('TH önce bulundu; TD onsuz bulunamazdı.', { speak: 'T H önce bulundu; T D onsuz bulunamazdı.' }), E.parla(c, [e900], 800));
  }

  /* ---- 4. Sonucu denetle ---- */
  async function denetle(c) {
    const svg = c.svg(1000, 562);
    const yz = 240;
    const h = hakan(c, svg, { b: 20, x0: 20, yz, kutu: [300, 305], ac: ['yer', 'sil', 'yamac', 'T', 'D', 'H', 'nT', 'nD', 'nH', 'ayna', 'kutu', 'kYer', 'kAyna', 'kGovde', 'kKafa', 'kIsik1', 'kIsik2', 'kYay', 'kla', 'kDikL', 'TH', 'dikH'] });
    h.p.TH.setAttribute('stroke', ARA);
    const PP = h.P;
    const lis = E.denetim(c, svg, { x: 600, y: 90, maddeler: ['Şekle uyuyor mu?', 'Verilenlerle çelişiyor mu?', 'Birim doğru mu?'], size: 22, aralik: 56 });
    const td = cizgi(c, svg, PP.T, PP.D, ISTEN, 4.5); gizle(td);
    const mid = ara(PP.T, PP.D, 0.5);
    const e900 = yazi(c, svg, PP.H[0] - 12, (PP.T[1] + PP.H[1]) / 2 + 8, '900', { hiza: 'end', size: 22, kalin: 700, renk: ARA });
    const e675 = yazi(c, svg, (PP.H[0] + PP.D[0]) / 2, yz + 30, '675', { size: 22, kalin: 700, renk: ARA });
    const e1125 = yazi(c, svg, mid[0] + 28, mid[1] - 20, '1125', { size: 22, kalin: 700, renk: ISTEN });
    gizle(e900, e675, e1125);
    await c.say('Çözümü bitirince sonucu denetleriz.', { speak: '[thoughtful] Çözümü bitirince sonucu denetleriz.' });
    await par(c.say('Birincisi: sonuç şekle uyuyor mu?'), E.parla(c, [lis.maddeler[0].yazi], 800));
    await par(c.say('TD hipotenüs: 1125 metre; dik kenarlar 900 ve 675.', { speak: 'T D hipotenüs: bin yüz yirmi beş metre; dik kenarlar dokuz yüz ve altı yüz yetmiş beş.' }), belir(c, [td, e900, e675, e1125], 600));
    await par(c.say('Hipotenüs en uzun kenar: şekle uyuyor.'), lis.tikle(0, 600));
    await par(c.say('İkincisi: sonuç verilenlerle çelişiyor mu?'), (async () => {
      await E.parla(c, [lis.maddeler[1].yazi], 800);
      await belir(c, [e900, e675, e1125], 400, 0);
      [e900, e675, e1125].forEach((e) => e.remove());
    })());
    const r1 = renkli(c, svg, 600, 300, ['KL ÷ LA = 1,5 ÷ 2 = ', ['0,75', ARA]], { hiza: 'start', size: 24 });
    const r2 = renkli(c, svg, 600, 350, ['TH ÷ HA = 900 ÷ 1200 = ', ['0,75', ARA]], { hiza: 'start', size: 24 });
    gizle(r1, r2);
    await par(c.say('Küçük üçgende KL ÷ LA = 1,5 ÷ 2 = 0,75.', { speak: 'Küçük üçgende K L bölü L A eşittir bir virgül beş bölü iki, eşittir sıfır virgül yetmiş beş.' }), (async () => {
      await belir(c, h.p.D, 300, 0); h.p.D.remove();
      await belir(c, h.tum('A', 'nA', 'kK', 'kL', 'kA'), 450);
      await belir(c, r1, 500);
    })());
    await par(c.say('Büyükte TH ÷ HA = 900 ÷ 1200 = 0,75: aynı.', { speak: 'Büyükte T H bölü H A eşittir dokuz yüz bölü bin iki yüz, eşittir sıfır virgül yetmiş beş: aynı.' }), (async () => {
      await belir(c, r2, 500);
      await lis.tikle(1, 600);
    })());
    await par(c.say('Üçüncüsü: birim. Her uzunluk metre olmalıydı.'), (async () => {
      await belir(c, [r1, r2], 350, 0);
      r1.remove(); r2.remove();
      await belir(c, h.tum('k2m', 'k150'), 450);
      await E.parla(c, [lis.maddeler[2].yazi, h.p.k150, h.p.k2m], 900);
    })());
    await par(c.say('150’yi 1,5 yapmasaydık sonuç yüz kat şişerdi.', { speak: 'Yüz elliyi bir virgül beş yapmasaydık sonuç yüz kat şişerdi.' }), (async () => {
      h.p.k150.textContent = '1,5 m'; h.p.k150.style.fill = ARA;
      await E.parla(c, [h.p.k150], 700);
      await lis.tikle(2, 600);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir öğrenci |KL| yerine 150 yazıp TH = 150 × 600 = 90 000 m buldu. Kontrol ne gösterir?',
      options: ['Sonuç doğru; oran doğru kurulmuş', 'Tepe 90 000 m olamaz; birim hatası var, 150 cm yerine 1,5 m yazılmalı', 'Sonuç yanlış; Açı-Açı kullanılmamalıydı'], answer: 1,
      hints: ['BD yalnızca 1350 m; yükseklik bunun kat kat üstünde olamaz.', '', '150 santimetre 1,5 metreydi.'],
      right: 'Evet. 150 cm = 1,5 m; birim hatası sonucu yüz kat şişirir.',
    });
    await c.say('Üç denetimden biri hata yakalayabilir.');
  }

  /* ---- 5. Çiçek deseni: eşlik ---- */
  const S5 = 68, C5 = [65, 340];
  function ucgen5(c, p) {
    const C = C5, A = [C[0] + 5 * S5, C[1]], Bp = [C[0] + 3.62 * S5, C[1] - 1.5 * S5], B2 = [Bp[0], C[1] + 1.5 * S5];
    const g = c.S('g', {}, p);
    const t1 = cokgen(c, g, [C, A, Bp], EL[0], { harf: ['C', 'A', 'B'], harfSize: 26 });
    return { g, C, A, B: Bp, B2, t1 };
  }
  function cicek5(c, p, O, s) {
    const g = c.S('g', {}, p);
    const A0 = [O[0] + 5 * s, O[1]], Bu0 = [O[0] + 3.62 * s, O[1] - 1.5 * s], Bl0 = [Bu0[0], O[1] + 1.5 * s];
    const kites = [], yaylar = [];
    for (let i = 0; i < 8; i++) {
      const d = 45 * i, A = dondur(A0, O, d), Bu = dondur(Bu0, O, d), Bl = dondur(Bl0, O, d), kg = c.S('g', {}, g);
      cokgen(c, kg, [O, A, Bu], EL[0], { w: 2 }); cokgen(c, kg, [O, A, Bl], EL[1], { w: 2 });
      gizle(kg); kites.push(kg);
    }
    for (let k = 0; k < 16; k++) {
      const a0 = -22.5 + 22.5 * k + 1.8, a1 = -22.5 + 22.5 * (k + 1) - 1.8, r = 24, P0 = ileri(O, rad(a0), r), P1 = ileri(O, rad(a1), r);
      const y = c.S('path', { d: `M${P0[0]},${P0[1]} A${r},${r} 0 0 1 ${P1[0]},${P1[1]}`, fill: 'none', stroke: ISTEN, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      gizle(y); yaylar.push(y);
    }
    return { g, kites, yaylar, O, A: A0, B: Bu0 };
  }

  async function cicekDeseni(c) {
    const svg = c.svg(1000, 562);
    const tab = E.verilenIstenen(c, svg, { x: 600, y: 105, ikinci: 215, size: 24, aralik: 44 });
    gizle(tab.baslik, tab.ayrac);
    let T = ucgen5(c, svg);
    const t2 = cokgen(c, T.g, [T.C, T.A, T.B], EL[1], {});
    gizle(t2.g);
    const bYay = aciYayi(c, T.g, T.B, T.A, T.C, RENK.cizgi, 28), bYaz = yazi(c, T.g, ...(([x, y]) => [x, y + 8])(aciIci(T.B, T.A, T.C, 38)), '110°', { size: 24, kalin: 700 });
    const kisa = B.kenarEtiketi(c, T.g, T.A, T.B, 'kısa', SAYI, { merkez: agirlik([T.C, T.A, T.B]), size: 22 });
    const uzun = B.kenarEtiketi(c, T.g, T.B, T.C, 'uzun', SAYI, { merkez: agirlik([T.C, T.A, T.B]), size: 22 });
    const ac = cizgi(c, T.g, T.C, T.A, RENK.yazi, 5);
    gizle(bYay, bYaz, kisa, uzun, ac); gizle(T.g);
    await par(c.say('Bir nakışçı aynı kartondan eş üçgenler kesiyor.'), belir(c, T.g, 600));
    await par(c.say('Üçgenin B açısı 110°; AB kenarı BC’den kısa.', { speak: 'Üçgenin B açısı yüz on derece; A B kenarı B C’den kısa.' }), (async () => {
      await belir(c, [tab.baslik[0], tab.baslik[1], tab.ayrac], 450);
      await par(tab.verilen(0, 'm(ABC) = 110°', 450), belir(c, [bYay, bYaz], 450));
      await par(tab.verilen(1, '|AB| < |BC|', 450), belir(c, [kisa, uzun], 450));
    })());
    await par(c.say('Eş üçgenleri en uzun kenarları çakışacak biçimde birleştiriyor.'), (async () => {
      await belir(c, ac, 400);
      await belir(c, t2.g, 300);
      await c.tween(1200, (e) => t2.koy(araHepsi([T.C, T.A, T.B], [T.C, T.A, T.B2], e)), Ders.ease.inOut);
    })());
    c.clearSay();

    // Sekiz dörtgenle çiçek.
    const fl = cicek5(c, svg, [290, 285], 40);
    const O = fl.O, A = fl.A, Bn = fl.B;
    const hlAC = cizgi(c, fl.g, O, A, RENK.yazi, 4.5), hlAB = cizgi(c, fl.g, Bn, A, RENK.yazi, 4.5);
    const fA = yazi(c, fl.g, A[0] + 20, A[1] + 8, 'A', { size: 24, kalin: 700 }), fB = yazi(c, fl.g, Bn[0] + 30, Bn[1] - 14, 'B', { size: 24, kalin: 700 });
    const fYay = aciYayi(c, fl.g, Bn, A, O, RENK.cizgi, 22), f110 = yazi(c, fl.g, Bn[0] - 27, Bn[1] + 42, '110°', { size: 22, kalin: 700 });
    gizle(hlAC, hlAB, fA, fB, fYay, f110);
    await par(c.say('Her birleşim bir dörtgen veriyor; sekiz dörtgen çiçeği oluşturuyor.'), (async () => {
      await belir(c, T.g, 450, 0);
      T.g.remove();
      for (let i = 0; i < 8; i++) await belir(c, fl.kites[i], 160);
    })());
    await par(c.say('İstenen: BAC açısı.', { speak: 'İstenen: B A C açısı.' }), tab.istenen(0, 'm(BAC) = ?', 500));
    const ip = ipucu(c, svg, 600, 300, 'Eş parçalar', 'Eşlik'); gizle(ip);
    await par(c.say('İpucu: aynı kalıptan parçalar; araç eşlik.'), belir(c, ip, 500));
    await par(c.say('Bir dörtgende iki üçgen var: sekiz dörtgende 16 üçgen.', { speak: 'Bir dörtgende iki üçgen var: sekiz dörtgende on altı üçgen.' }), E.parla(c, fl.kites, 1000));
    await par(c.say('110° en büyük açı; karşısındaki AC en uzun kenar.', { speak: 'Yüz on derece en büyük açı; karşısındaki A C en uzun kenar.' }), (async () => {
      await belir(c, [fA, fB, fYay, f110], 450);
      await belir(c, hlAC, 450);
      await E.parla(c, [hlAC], 600);
    })());
    await par(c.say('AB kısa kenar: karşısındaki C açısı en küçük.', { speak: 'A B kısa kenar: karşısındaki C açısı en küçük.' }), (async () => {
      await belir(c, [hlAC], 300, 0);
      await belir(c, hlAB, 450);
      await belir(c, fl.yaylar[0], 450);
      await E.parla(c, [hlAB, fl.yaylar[0]], 700);
    })());
    const eq1 = yazi(c, svg, 600, 390, '16 × α = 360°', { hiza: 'start', size: 28, kalin: 600 }); gizle(eq1);
    await par(c.say('Ortada 16 küçük açı tam açı yapar: 16 × α = 360°.', { speak: 'Ortada on altı küçük açı tam açı yapar: on altı çarpı alfa eşittir üç yüz altmış derece.' }), (async () => {
      await belir(c, hlAB, 300, 0);
      await belir(c, fl.yaylar.slice(1), 700);
      await belir(c, eq1, 450);
    })());
    const eq2 = renkli(c, svg, 600, 440, [['α = 22,5°', ARA]], { hiza: 'start', size: 28 }); gizle(eq2);
    await par(c.say('Bölersek α = 22,5° çıkar.', { speak: 'Bölersek alfa eşittir yirmi iki virgül beş derece çıkar.' }), belir(c, eq2, 500));
    c.clearSay();

    // Yine tek üçgen: B = 110°, C = 22,5°.
    await belir(c, [fl.g, eq1, eq2, ip], 450, 0);
    [fl.g, eq1, eq2, ip].forEach((e) => e.remove());
    T = ucgen5(c, svg);
    aciYayi(c, T.g, T.B, T.A, T.C, RENK.cizgi, 28);
    yazi(c, T.g, ...(([x, y]) => [x, y + 8])(aciIci(T.B, T.A, T.C, 38)), '110°', { size: 24, kalin: 700 });
    aciYayi(c, T.g, T.C, T.A, T.B, ARA, 48);
    yazi(c, T.g, T.C[0] + 90, T.C[1] + 34, '22,5°', { size: 22, kalin: 700, renk: ARA });
    aciYayi(c, T.g, T.A, T.B, T.C, ISTEN, 40);
    const aYaz = yazi(c, T.g, T.A[0] - 68, T.A[1] - 14, '?', { size: 22, kalin: 700, renk: ISTEN });
    gizle(T.g);
    await par(c.say('Her üçgenin iç açıları toplamı 180°.', { speak: 'Her üçgenin iç açıları toplamı yüz seksen derece.' }), belir(c, T.g, 500));
    await c.choice({
      tag: 'Birlikte çöz', q: 'B = 110°, C = 22,5°. m(BAC) kaç derecedir?',
      options: ['70°', '47,5°', '22,5°'], answer: 1,
      hints: ['110 ile 22,5’u 180’den çıkar.', '', '22,5° C açısıydı; A açısı daha büyük çıkmalı.'],
      right: 'Evet. 180 − 110 − 22,5 = 47,5.',
    });
    cevapla(aYaz, '47,5°');
    const sum = renkli(c, svg, 600, 300, ['110 + 47,5 + 22,5 = ', ['180', ARA]], { hiza: 'start', size: 26 }); gizle(sum);
    await par(c.say('Kontrol: toplam 180°; kısa AB karşısında küçük C.', { speak: 'Kontrol: toplam yüz seksen derece; kısa A B karşısında küçük C.' }), (async () => {
      await E.parla(c, [aYaz], 700);
      await belir(c, sum, 500);
    })());
    await c.say('Aynı kalıptan parçalarla kurulan desende eşlik işe yarar.');
  }

  /* ---- 6. Stor perde: benzerlik (E1'deki şema; 1 birim = 15 cm) ---- */
  const PB = 26, PX0 = 150, PYZ = 452;
  function perde(c, p, o) {
    const b = PB, X = (u) => PX0 + u * b, Y = (v) => PYZ - (16 - v) * b, pp = {}, g = c.S('g', {}, p);
    const C = [X(3), Y(2)], K0 = [X(3), Y(7)], K1 = [X(3), Y(5)], Bb = [X(3), Y(11)], A = [X(9), Y(11)], D0 = [X(5 + 2 / 3), Y(11)], D1 = [X(7), Y(11)];
    const K = K0.slice(), D = D0.slice();
    const ek = (S, Tt, d) => ileri(S, yon(S, Tt) + Math.PI, d);
    pp.yer = cizgi(c, g, [X(-1), PYZ], [X(12.5), PYZ], RENK.cizgi, 3);
    pp.duvar = cizgi(c, g, C, [X(3), Y(16)], RENK.cizgi, 2, { 'stroke-dasharray': '5 7', 'stroke-opacity': 0.55 });
    pp.rail = cizgi(c, g, [X(2.2), Y(0.2)], [X(3.8), Y(0.2)], RENK.cizgi, 5);
    pp.perde = cizgi(c, g, [X(3), Y(0.2)], K, '#aeb8e6', 7);
    pp.masa = c.S('rect', { x: X(5), y: Y(11), width: 6 * b, height: 5 * b, fill: '#1d2850', 'fill-opacity': 0.7, stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
    pp.masaUst = cizgi(c, g, [X(5), Y(11)], [X(11), Y(11)], RENK.yazi, 5);
    pp.abc = c.S('polygon', { points: [A, Bb, C].map((q) => q.join(',')).join(' '), fill: EL[0], 'fill-opacity': 0.2, stroke: EL[0], 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    pp.dbk = c.S('polygon', { points: [D, Bb, K].map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.28, stroke: EL[1], 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    pp.isin1 = c.S('g', {}, g); const r1 = cizgi(c, pp.isin1, C, A, RENK.cizgi, 3.5), e1 = cizgi(c, pp.isin1, ek(C, A, 30), C, RENK.cizgi, 2.5, { 'stroke-dasharray': '4 6', 'stroke-opacity': 0.7 });
    pp.isin2 = c.S('g', {}, g); const r2 = cizgi(c, pp.isin2, K, D, RENK.cizgi, 3.5), e2 = cizgi(c, pp.isin2, ek(K, D, 24), K, RENK.cizgi, 2.5, { 'stroke-dasharray': '4 6', 'stroke-opacity': 0.7 });
    pp.dikB = aciYayi(c, g, Bb, C, A, RENK.cizgi, 34, { dik: true });
    pp.yayA = aciYayi(c, g, A, C, Bb, EL[2], 34);
    pp.yayD = aciYayi(c, g, D, K, Bb, EL[2], 34);
    const harf = (ad, P, dx, dy) => yazi(c, g, P[0] + dx, P[1] + dy, ad, { size: 26, kalin: 700 });
    pp.C = harf('C', C, 18, -8); pp.K = harf('K', K, 18, -8); pp.B = harf('B', Bb, -22, 30); pp.A = harf('A', A, 4, -16); pp.D = harf('D', D, 20, -16);
    pp.nC = nokta(c, g, C, SAYI, 5); pp.nK = nokta(c, g, K, SAYI, 5); pp.nB = nokta(c, g, Bb, SAYI, 5); pp.nA = nokta(c, g, A, SAYI, 5); pp.nD = nokta(c, g, D, SAYI, 5);
    const ac = o.ac || [];
    Object.keys(pp).forEach((ad) => { if (!ac.includes(ad)) gizle(pp[ad]); else liste(pp[ad]).forEach((e) => { e.style.opacity = 1; }); });
    const guncelle = () => {
      pp.dbk.setAttribute('points', [D, Bb, K].map((q) => q.join(',')).join(' '));
      koy(r2, K, D); koy(e2, ek(K, D, 24), K);
      pp.perde.setAttribute('y2', K[1]);
      pp.nK.setAttribute('cy', K[1]); pp.K.setAttribute('y', K[1] - 8);
      pp.nD.setAttribute('cx', D[0]); pp.D.setAttribute('x', D[0] + 20);
    };
    return {
      g, p: pp, tum: (...adlar) => adlar.flatMap((a) => liste(pp[a])), X, Y, N: { C, K: K0, K1, B: Bb, A, D: D0, D1 },
      isinRenk(renk, kesik) { [r1, r2].forEach((l) => { l.setAttribute('stroke', renk); if (kesik) l.setAttribute('stroke-dasharray', '12 8'); else l.removeAttribute('stroke-dasharray'); }); },
      kaydir(e) { K[1] = K0[1] + (K1[1] - K0[1]) * e; D[0] = D0[0] + (D1[0] - D0[0]) * e; guncelle(); },
    };
  }
  const PERDE_TUM = ['yer', 'duvar', 'rail', 'perde', 'masa', 'masaUst', 'isin1', 'isin2', 'C', 'K', 'B', 'A', 'D', 'nC', 'nK', 'nB', 'nA', 'nD'];

  async function storPerde(c) {
    const svg = c.svg(1000, 562);
    const f = perde(c, svg, { ac: PERDE_TUM });
    f.isinRenk(RENK.dogru, true);
    const N = f.N;
    await c.say('Stor perde problemine dönelim: iki ışın paralel.');
    await par(c.say('Işın ile yer arasındaki açı iki üçgende de aynı.'), belir(c, f.tum('yayA', 'yayD'), 600));
    const oran = yazi(c, svg, 560, 110, 'ABC ~ DBK', { hiza: 'start', size: 30, kalin: 600 }); gizle(oran);
    await par(c.say('İkisinde de B’de dik açı var: Açı-Açı, ABC ~ DBK.', { speak: 'İkisinde de B’de dik açı var: Açı-Açı, A B C, D B K’ye benzerdir.' }), (async () => {
      f.isinRenk(RENK.cizgi, false);
      await belir(c, f.tum('abc', 'dbk', 'dikB'), 600);
      await belir(c, oran, 450);
    })());
    c.clearSay();

    // İki üçgen ayrı ve aynı duruşta.
    const ayri = ikiUcgen(c, svg, { y: 430, x1: 90, w1: 180, h1: 270, x2: 340, w2: 80, h2: 120, harf1: ['C', 'B', 'A'], harf2: ['K', 'B', 'D'] });
    gizle(ayri.g);
    const eBC = kenarYaz(c, ayri.g, ayri.b, 0, 1, '135', SAYI), eAB = kenarYaz(c, ayri.g, ayri.b, 1, 2, '90', SAYI);
    const eBK = kenarYaz(c, ayri.g, ayri.k, 0, 1, '60', SAYI), eDB = kenarYaz(c, ayri.g, ayri.k, 1, 2, '?', ISTEN);
    await par(c.say('Karşılıklı kenarlar: BK ile BC, DB ile AB.', { speak: 'Karşılıklı kenarlar: B K ile B C, D B ile A B.' }), (async () => {
      await belir(c, f.g, 450, 0);
      f.g.remove();
      await belir(c, ayri.g, 500);
      await belir(c, [ayri.b.v, ayri.k.v], 500);
      await belir(c, [ayri.b.h, ayri.k.h], 500);
    })());
    await par(c.say('Oran: BK / BC = DB / AB.', { speak: 'Oran: B K bölü B C eşittir D B bölü A B.' }), (async () => {
      await belir(c, oran, 250, 0);
      parcaKoy(c, oran, [['BK', EL[2]], ' / ', ['BC', EL[2]], ' = ', ['DB', ISIK], ' / ', ['AB', ISIK]]);
      await belir(c, oran, 350);
    })());
    await par(c.say('|BC| = 135 ve |BK| = 60; |AB| = 90.', { speak: 'B C uzunluğu yüz otuz beş ve B K uzunluğu altmış; A B uzunluğu doksan.' }), (async () => {
      parcaKoy(c, oran, ['60 / 135 = ', ['DB', ISTEN], ' / 90']);
      await belir(c, [eBC, eAB, eBK, eDB], 500);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '60 / 135 = DB / 90. |DB| kaç santimetredir?',
      options: ['202,5 cm', '40 cm', '60 cm'], answer: 1,
      hints: ['Küçük üçgen küçüktür: DB, AB = 90’dan kısa olmalı.', '', '60 / 135 sadeleşince 4 / 9; DB, 90’ın 4 / 9’u.'],
      right: 'Evet. 90 × 4 ÷ 9 = 40.',
    });
    cevapla(eDB, '40');
    parcaKoy(c, oran, ['60 / 135 = ', ['40', ARA], ' / 90']);
    await c.say('Bulduğumuz |DB|, ışığın masada kat ettiği yoldur.', { speak: 'Bulduğumuz D B uzunluğu, ışığın masada kat ettiği yoldur.' });
    c.clearSay();

    // Perde şemasına dönüş: |DB| = 30 + x.
    const f2 = perde(c, svg, { ac: [...PERDE_TUM, 'abc', 'dbk', 'dikB'] });
    gizle(f2.g);
    const o30 = olcu(c, f2.g, N.B, [f2.X(5), N.B[1]], '30', RENK.cizgi, { kay: [0, 30], yazi: [0, 28], yazirenk: SAYI });
    const ox = olcu(c, f2.g, [f2.X(5), N.B[1]], N.D, 'x', RENK.cizgi, { kay: [0, 30], yazi: [0, 28], yazirenk: ISTEN });
    const oDB = olcu(c, f2.g, N.B, N.D, 'DB', RENK.cizgi, { kay: [0, 74], yazi: [0, 28], yazirenk: SAYI, uzat: true });
    // 60: perde açıkken ışığın masa kenarından sonra ulaştığı uzaklık (|AB| − 30 = 90 − 30).
    const o60 = olcu(c, f2.g, [f2.X(5), N.B[1]], N.A, '60', RENK.cizgi, { kay: [0, 74], yazi: [0, 28], yazirenk: SAYI });
    gizle(o30.g, ox.g, oDB.g, o60.g);
    await par(c.say('|DB|, masaya 30 ve x’in toplamı: |DB| = 30 + x.', { speak: 'D B uzunluğu, masaya otuz ve iks’in toplamı: D B uzunluğu eşittir otuz artı iks.' }), (async () => {
      await belir(c, [oran, ayri.g], 400, 0);
      oran.remove(); ayri.g.remove();
      await belir(c, f2.g, 450);
      await belir(c, [o30.g, ox.g, oDB.g], 500);
    })());
    const denk = yazi(c, svg, 600, 150, '', { hiza: 'start', size: 30, kalin: 600 }); gizle(denk);
    parcaKoy(c, denk, ['DB = 30 + ', ['x', ISTEN]]);
    await belir(c, denk, 450);
    await par(c.say('40 = 30 + x; x = 10 santimetre.', { speak: 'Kırk eşittir otuz artı iks; iks eşittir on santimetre.' }), (async () => {
      cevapla(oDB.yazi, '40');
      parcaKoy(c, denk, ['40 = 30 + ', ['x', ISTEN]]);
      await c.wait(600);
      cevapla(ox.yazi, '10');
      parcaKoy(c, denk, [['x = 10', ARA]]);
      await E.parla(c, [ox.yazi], 700);
    })());
    await par(c.say('Denetim: 10, ilk durumdaki 60’tan küçük.', { speak: 'Denetim: on, ilk durumdaki altmıştan küçük.' }), (async () => { await belir(c, oDB.g, 300, 0); await belir(c, o60.g, 500); })());
    await par(c.say('Perde indikçe ışık masada daha az ilerler: sonuç şekle uyuyor.'), E.parla(c, [ox.yazi, o60.yazi], 800));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı perde 75 cm yerine 45 cm indirilseydi x kaç cm olurdu?',
      options: ['60 cm', '30 cm', '90 cm'], answer: 1,
      hints: ['DB, masa kenarından 30 daha uzun; x onu çıkarır.', '', 'Önce yeni |BK|’yı bul: 135 − 45.'],
      right: 'Evet. BK = 90, DB = 60 ve x = 60 − 30 = 30.',
    });
    // Perde az indi: K yukarı, D sağa.
    const o30b = olcu(c, f2.g, N.B, [f2.X(5), N.B[1]], '30', RENK.cizgi, { kay: [0, 30], yazi: [0, 28], yazirenk: SAYI });
    const oxb = olcu(c, f2.g, [f2.X(5), N.B[1]], N.D1, '30', RENK.cizgi, { kay: [0, 30], yazi: [0, 28], yazirenk: ARA });
    const oDBb = olcu(c, f2.g, N.B, N.D1, '60', RENK.cizgi, { kay: [0, 74], yazi: [0, 28], yazirenk: ARA, uzat: true });
    const o90 = olcu(c, f2.g, [190, N.K1[1]], [190, N.B[1]], '90', RENK.cizgi, { kay: [0, 0], yazi: [-10, 8], hiza: 'end', yazirenk: ARA });
    gizle(o30b.g, oxb.g, oDBb.g, o90.g);
    const son = renkli(c, svg, 600, 150, [['x = 60 − 30 = 30', ARA]], { hiza: 'start', size: 30 }); gizle(son);
    await par(c.say('Perde daha az indi, ışık masada daha uzağa ulaştı.'), (async () => {
      await belir(c, [o30.g, ox.g, oDB.g, o60.g, denk], 350, 0);
      [o30.g, ox.g, oDB.g, o60.g, denk].forEach((e) => e.remove());
      await c.tween(900, (e) => f2.kaydir(e), Ders.ease.inOut);
      await belir(c, [o30b.g, oxb.g, oDBb.g, o90.g, son], 500);
    })());
  }

  /* ---- 7. Yapı ve kitap: Öklid ---- */
  function kutuGuncelle(k, cx, metin) {
    k.yazi.textContent = metin;
    const w = k.yazi.getBBox().width + 18;
    k.kutu.setAttribute('x', cx - w / 2); k.kutu.setAttribute('width', w);
  }
  async function abide(c) {
    const svg = c.svg(1000, 562);
    const s = 23, X = (u) => 90 + u * s, Y = (v) => 24 + v * s;
    const Bp = [X(7), Y(21)], Cp = [X(7), Y(0.2)], Hp = [X(7), Y(20.2)], Ap = [X(3), Y(20.2)];
    const g = c.S('g', {}, svg);
    const yer = cizgi(c, g, [X(0.5), Bp[1]], [Bp[0] + 30, Bp[1]], RENK.cizgi, 3);
    const ab = cizgi(c, g, Bp, Cp, '#aeb8e6', 10);
    const kisi = c.S('g', {}, g); cizgi(c, kisi, [Ap[0], Bp[1]], Ap, RENK.yazi, 3); c.S('circle', { cx: Ap[0], cy: Ap[1], r: 5, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2.5 }, kisi);
    const uAB = [Math.cos(yon(Ap, Bp)), Math.sin(yon(Ap, Bp))], uAC = [Math.cos(yon(Ap, Cp)), Math.sin(yon(Ap, Cp))];
    const kt = [Ap, [Ap[0] + 20 * uAC[0], Ap[1] + 20 * uAC[1]], [Ap[0] + 20 * uAC[0] + 14 * uAB[0], Ap[1] + 20 * uAC[1] + 14 * uAB[1]], [Ap[0] + 14 * uAB[0], Ap[1] + 14 * uAB[1]]];
    const kitap = c.S('polygon', { points: kt.map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.5, stroke: EL[1], 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
    const lAB = cizgi(c, g, Ap, Bp, RENK.cizgi, 2), lAC = cizgi(c, g, Ap, Cp, RENK.cizgi, 2);
    const dikA = aciYayi(c, g, Ap, Bp, Cp, RENK.cizgi, 40, { dik: true });
    const AH = cizgi(c, g, Ap, Hp, ISTEN, 4), dikH = aciYayi(c, g, Hp, Ap, Cp, RENK.cizgi, 30, { dik: true });
    const hA = yazi(c, g, Ap[0] - 18, Ap[1] - 6, 'A', { size: 24, kalin: 700 }), hB = yazi(c, g, Bp[0] + 20, Bp[1] + 30, 'B', { size: 24, kalin: 700 });
    const hC = yazi(c, g, Cp[0] + 20, Cp[1] + 8, 'C', { size: 24, kalin: 700 }), hH = yazi(c, g, Hp[0] + 18, Hp[1] - 10, 'H', { size: 24, kalin: 700 });
    // Ölçüler
    const oBH = olcu(c, g, Hp, Bp, '', RENK.cizgi, { kay: [26, 0], w: 2 });
    const tBH = yazi(c, g, Bp[0] + 42, Hp[1] + 17, '|BH| = 1,6', { hiza: 'start', size: 20, kalin: 700 });
    const oAH = olcu(c, g, [Ap[0], Bp[1]], [Bp[0], Bp[1]], '|AH| = 8', RENK.cizgi, { kay: [0, 18], yazi: [0, 26], size: 20, yazirenk: SAYI, uzat: true, w: 2 });
    const oBC = olcu(c, g, Bp, Cp, '', RENK.cizgi, { kay: [182, 0], w: 2 });
    oBC.yazi.remove();
    const kutu = E.istenenKutu(c, g, 520, 380, '|BC| = ?', { size: 24 });
    const tCH = yazi(c, g, Bp[0] + 194, 262, '|CH| = 40', { hiza: 'start', size: 22, kalin: 700, renk: ARA });
    const tik = cizgi(c, g, [Bp[0] + 174, Hp[1]], [Bp[0] + 190, Hp[1]], RENK.cizgi, 2.5);
    gizle(ab, kisi, kitap, lAB, lAC, dikA, AH, dikH, hA, hB, hC, hH, oBH.g, tBH, oBC.g, kutu.g, tCH, tik, oAH.g);
    await par(c.say('Arda, Çanakkale Şehitler Abidesi’nin boyunu ölçmek istiyor.'), belir(c, [ab, kisi, hA, hB, hC], 600));
    await par(c.say('Elindeki dik köşeli kitabı gözüne yaklaştırıyor.'), belir(c, kitap, 500));
    await par(c.say('Kitabın bir kenarı abidenin tepesine, öbürü dibine bakıyor.'), belir(c, [lAB, lAC], 600));
    await par(c.say('Gözden tepeye ve dibe giden iki doğru dik açı yapar.'), belir(c, dikA, 500));
    await par(c.say('Gözden abideye inen AH, abideye dik.', { speak: 'Gözden abideye inen A H, abideye dik.' }), belir(c, [AH, dikH, hH], 600));
    await par(c.say('Göz yerden 1,6 metre yüksekte: |BH| = 1,6.', { speak: 'Göz yerden bir virgül altı metre yüksekte: B H uzunluğu bir virgül altı.' }), belir(c, [oBH.g, tBH], 500));
    await par(c.say('Gözün abideye uzaklığı 8 metre: |AH| = 8.', { speak: 'Gözün abideye uzaklığı sekiz metre: A H uzunluğu sekiz.' }), belir(c, oAH.g, 500));
    await par(c.say('İstenen: abidenin boyu, yani |BC|.', { speak: 'İstenen: abidenin boyu, yani B C uzunluğu.' }), belir(c, [oBC.g, kutu.g], 500));
    const ip = ipucu(c, svg, 600, 90, 'Dik köşeden yükseklik', 'Öklid'); gizle(ip);
    await par(c.say('ABC dik üçgeninde dik köşeden hipotenüse yükseklik var: Öklid.', { speak: 'A B C dik üçgeninde dik köşeden hipotenüse yükseklik var: Öklid.' }), (async () => {
      await belir(c, ip, 500);
      await E.parla(c, [AH], 700);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Abidenin boyu kaç metredir?',
      options: ['9,6 m', '41,6 m', '40 m'], answer: 1,
      hints: ['AH² = BH · CH yazılır; önce CH bulunur.', '', 'CH yalnızca üst parça; BC = BH + CH.'],
      right: 'Evet. CH = 40 ve BC = 1,6 + 40 = 41,6.',
    });
    // Gör: |CH| = 40, ardından |BC| = 41,6.
    const l1 = yazi(c, svg, 600, 160, '8² = 1,6 · |CH|', { hiza: 'start', size: 28 }); gizle(l1);
    await par(c.say('8² = 1,6 · |CH|; yani |CH| = 40 metre.', { speak: 'Sekiz kare eşittir bir virgül altı çarpı C H uzunluğu; yani C H uzunluğu kırk metre.' }), (async () => {
      await belir(c, [tBH, oBH.g, oAH.g, ip], 350, 0);
      [tBH, oBH.g, oAH.g, ip].forEach((e) => e.remove());
      await belir(c, l1, 450);
      await belir(c, [tCH, tik], 500);
    })());
    const l2 = renkli(c, svg, 600, 160, ['|BC| = 1,6 + 40'], { hiza: 'start', size: 28 }); gizle(l2);
    await par(c.say('Abidenin boyu |BC| = 1,6 + 40 = 41,6 metre.', { speak: 'Abidenin boyu B C uzunluğu eşittir bir virgül altı artı kırk eşittir kırk bir virgül altı metre.' }), (async () => {
      await belir(c, l1, 300, 0);
      l1.remove();
      await belir(c, l2, 450);
      kutuGuncelle(kutu, 520, '|BC| = 41,6');
      cevapla(kutu.yazi, '|BC| = 41,6');
      await E.parla(c, [kutu.yazi], 700);
    })());
    const l3 = yazi(c, svg, 600, 230, '1,6 × 40 = 64 = 8²', { hiza: 'start', size: 28 }); gizle(l3);
    await par(c.say('Denetim: 1,6 × 40 = 64 = 8²; sonuç tutuyor.', { speak: 'Denetim: bir virgül altı çarpı kırk eşittir altmış dört eşittir sekiz kare; sonuç tutuyor.' }), belir(c, l3, 500));
  }

  /* ---- 8. Hangi araç? ---- */
  async function hangiArac(c) {
    const svg = c.svg(1000, 562);
    const ADLAR = ['Açı-Açı', 'Tales', 'Öklid', 'Pisagor', 'Eşlik'], SIM = ['aa', 'tales', 'oklid', 'pisagor', 'eslik'];
    const EK = ['Açı-Açı’nın', 'Tales’in', 'Öklid’in', 'Pisagor’un', 'Eşlik’in'];
    const IPUCU = ['iki açı eşit', 'paralel doğrular', 'dik köşeden yükseklik', 'dik üçgenin iki kenarı', 'eş parçalar'];
    const yc = (i) => 106 + 88 * i;
    const kutular = c.S('g', {}, svg);
    ADLAR.forEach((ad, i) => {
      c.S('rect', { x: 500, y: yc(i) - 34, width: 460, height: 68, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, kutular);
      yazi(c, kutular, 526, yc(i) + 9, ad, { hiza: 'start', size: 28, kalin: 700 });
    });
    const ikon = SIM.map((s, i) => { const g = simge(c, kutular, s, 880, yc(i), 0.9); gizle(g); return g; });
    gizle(kutular);
    await par(c.say('Her ipucu bir aracı gösterir.'), belir(c, kutular, 600));
    await c.say('Şimdi ipuçlarını araçlarla eşleştirelim.');
    const KART = [
      { satir: ['Güneş ışınları paralel;', 'iki dik üçgende', 'bir açı ortak'], sira: [2, 4, 0, 1, 3], son: 'Ortak açı ve dik açılar: Açı-Açı.' },
      { satir: ['Üç paralel sokağı', 'kesen iki cadde'], sira: [3, 1, 0, 4, 2], son: 'Paralel sokakları kesen caddeler: Tales.' },
      { satir: ['Dik köşeden hipotenüse', 'inen yükseklik', 've iki parça'], sira: [1, 3, 4, 0, 2], son: 'Dik köşeden inen yükseklik: Öklid.' },
      { satir: ['Dik üçgenin iki kenarı', 'belli, üçüncüsü', 'aranıyor'], sira: [0, 4, 1, 3, 2], son: 'Dik üçgenin iki kenarı belli: Pisagor.' },
      { satir: ['Aynı kalıptan kesilmiş', 'üçgenlerle kurulan', 'desen'], sira: [2, 0, 4, 1, 3], son: 'Aynı kalıptan kesilen üçgenler: eşlik.' },
    ];
    for (let k = 0; k < 5; k++) {
      const kart = c.S('g', {}, svg);
      c.S('rect', { x: 40, y: 180, width: 420, height: 190, rx: 14, fill: RENK.yuzey, stroke: ISTEN, 'stroke-width': 3 }, kart);
      KART[k].satir.forEach((s, i) => yazi(c, kart, 250, 240 + i * 46, s, { size: 28, kalin: 600 }));
      gizle(kart); await belir(c, kart, 400);
      const sira = KART[k].sira;
      await c.choice({
        tag: 'Sıra sende', q: 'Bu ipucu hangi aracı gösterir?',
        options: sira.map((i) => ADLAR[i]), answer: sira.indexOf(k),
        hints: sira.map((i) => (i === k ? '' : `${EK[i]} ipucu: ${IPUCU[i]}.`)),
        right: `Evet. ${ADLAR[k]}.`,
      });
      await par(c.say(KART[k].son), (async () => {
        await sil(c, kart, 300);
        await belir(c, ikon[k], 450);
      })());
      c.clearSay();
    }
    // Kutular tahtaya ortalanır.
    await par(c.say('İpucunu bulan, aracı da bulur.'), c.tween(700, (e) => kutular.setAttribute('transform', `translate(${-240 * e},0)`), Ders.ease.inOut));
    c.note('<b>Aracı seç, uygula, denetle:</b> şekle, verilene, birime bak.', 'Strateji', 'e2-strateji');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-e2', kicker: 'Konu E · Eşlik ve benzerlik problemleri', title: 'Strateji kur, uygula, kontrol et', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Strateji kur, uygula, kontrol et',
      hook: 'Aynı şekilde hem <b>Pisagor</b> hem <b>benzerlik</b> kullanılabiliyorsa hangisinden başlarsın?',
      button: 'Derse başla ›',
    },
    goals: ['Şekildeki ipucuna bakıp eşlik, Açı-Açı, Tales, Öklid ya da Pisagor’dan uygun aracı seçer.', 'Seçtiği aracı uygular; bir hesabın sonucunu sonraki hesapta kullanır.', 'Sonucu şekle, verilenlere ve birime göre denetler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Çözmeye nasıl başlanır; dik üçgende yükseklik.', run: hatirla },
      { title: 'Araç seçimi', goal: 'İpucu hangi aracı çağırır.', run: arac },
      { title: 'Tepe ve ayna: strateji ve uygulama', goal: 'Önce benzerlik, sonra Pisagor.', run: tepe },
      { title: 'Sonucu denetle', goal: 'Şekle, verilenlere ve birime bak.', run: denetle },
      { title: 'Çiçek deseni: eşlik', goal: 'Aynı kalıptan parçalarda eşlik işe yarar.', run: cicekDeseni },
      { title: 'Stor perde: benzerlik', goal: 'Işınlar paralelse Açı-Açı ve oran.', run: storPerde },
      { title: 'Yapı ve kitap: Öklid', goal: 'Dik köşeden inen yükseklik Öklid’i çağırır.', run: abide },
      { title: 'Hangi araç?', goal: 'İpuçlarını araçlarla eşleştir.', run: hangiArac },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir öğrenci dik kenarları 6 ve 8 olan dik üçgende hipotenüsü 14 buldu ve kontrol etmeden bıraktı. Hangisi hatayı gösterir?',
        options: ['14, 8’den büyük olduğu için sonuç doğru', '14² = 196, oysa 6² + 8² = 100; hipotenüs 10 olmalı', 'Hipotenüs hiç denetlenmez'], answer: 1,
        why: ['Hipotenüsün 8’den büyük olması gerekir ama bu 14’ü doğrulamaz; kareler toplamına bakılır.', '6² + 8² = 100 ve √100 = 10; 14 verilenlerle çelişir.', 'Her sonuç şekle, verilenlere ve birime göre denetlenir.'],
        scene: 3,
      },
      {
        q: 'Aynı anda 2 m’lik bir sopanın gölgesi 3 m, bir direğin gölgesi 12 m. Direk kaç metredir?',
        options: ['8 m', '18 m', '9 m'], answer: 0,
        why: ['2 / 3 = h / 12 ve h = 8 m.', '18 m, oranı ters kurmaktan çıkar (12 × 3 ÷ 2); direk gölgesinden kısa olmalı.', '9 m, gölgelerin farkından (12 − 3) çıkar; benzer üçgenlerde oran kurulur, fark alınmaz.'],
        scene: 2,
      },
      {
        q: 'Eş üçgenlerden kurulan bir desende 12 üçgenin en küçük açıları ortada tam açıyı dolduruyor. En küçük açı kaç derecedir?',
        options: ['12°', '60°', '30°'], answer: 2,
        why: ['12, üçgen sayısıdır; açı ölçüsü değil.', '60°, 360 ÷ 6 işleminden çıkar; ortada 12 açı vardır, 6 değil.', '12 · α = 360° ve α = 30°.'],
        scene: 4,
      },
      {
        q: 'Arda’nın yöntemiyle bir abide ölçülüyor: göz yerden 1,5 m yüksekte, abideye uzaklık 6 m. Abide kaç metredir?',
        options: ['24 m', '25,5 m', '9 m'], answer: 1,
        why: ['24 m yalnızca CH’dir; BC = BH + CH olduğundan 1,5 eklenmelidir.', '6² = 1,5 · CH ve CH = 24; BC = 1,5 + 24 = 25,5 m.', '9 m, 6 × 1,5 çarpımıdır; Öklid bağıntısı 6² = 1,5 · CH diye yazılır.'],
        scene: 6,
      },
      {
        q: 'Hakan’ın problemindeki iki hesaptan hangisi önce yapılır ve neden?',
        options: ['TD önce: Pisagor her zaman ilk kullanılır', 'İkisinin sırası yoktur', 'TH önce: TD’yi bulmak için TH gerekir ve onu benzerlik verir'], answer: 2,
        why: ['Pisagor her zaman ilk kullanılmaz; bir kenar bilinmiyorsa önce o bulunur.', 'Bir hesap öbürünün girdisidir; bu yüzden sıra vardır.', 'TD, TH ve HD ile bulunur; TH ise Açı-Açı benzerliğinden çıkar.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>İpucu</b> aracı gösterir: Açı-Açı, Tales, Öklid, Pisagor ya da eşlik.',
      'Bir hesap öbürünün girdisi olabilir.',
      'Sonucu şekle, verilenlere ve birime göre denetle.',
      '<b>Aracı seç, uygula, sonucu denetle.</b>',
    ],
    nextLesson: { href: 'e3-kisa-yol-cikmaz-yol.html', label: 'Sonraki: Kısa yol ve çıkmaz yol ›' },
  });
})();
