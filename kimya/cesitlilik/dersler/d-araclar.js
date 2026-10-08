/* Konu D · Lewis nokta yapısı — ortak çizim araçları (window.KIT_D). kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Her nokta bir elektrondur ve mavidir (RENK.eksi). Sembol açık nötr renktedir.
   Dört yan: 0 üst, 1 sağ, 2 alt, 3 sol; bir yanda en çok iki nokta durur.
   Parçalar (parca): konumu (x, y) olan <g> öğeleridir; git(x, y) ile taşınır, tasi(c, liste, ms) ile birlikte yürütülür.
   Araçlar:
     parca, tasi, nokta, cift           temel parçalar: yer değiştiren grup, tek nokta, iki noktalı çift (kapsüllü ya da kapsülsüz)
     lewis(c, p, P, sembol, o)          sembol + dört yan: ekle, ekleParca, hemen, diz, yuvalar
     molekul(c, p, tanim)               Lewis yapısı: atomlar, ortaklanmış çiftler (kapsüllü), ortaklanmamış çiftler (kapsülsüz);
                                        atomikGoster() atomların ayrı noktalarını gösterir, bagla(ms) noktaları çiftlere taşır; halka(i, R)
     sablon(ad, ox, oy, D, o)           ad: H2 F2 Cl2 N2 O2 HF HCl H2O NH3 CH4 NF3 NCl3 CF4 CCl4 CO2 → molekul tanımı
     kure, model(c, p, ad, x, y, k)     iki boyutlu uzay-dolgu modeli: düz gri tonlu, harf etiketli küreler
     miniSvg(sembol, [üst, sağ, alt, sol]) soru şıkları için küçük Lewis çizimi (HTML dizgesi) */
window.KIT_D = (() => {
  'use strict';
  const { RENK, yazi, gizle, belir, par } = window.KIT;
  const NR = 6.5;       // nokta yarıçapı
  const AYRIM = 8;      // çiftte iki nokta arasındaki yarı uzaklık
  const VALANS = { H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7, He: 2, Ne: 8, Al: 3 };

  /* ---- temel parçalar ---- */
  function parca(c, p, x, y) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p);
    const o = { g, x, y, git(X, Y) { o.x = X; o.y = Y; g.setAttribute('transform', `translate(${X},${Y})`); } };
    return o;
  }
  /* liste = [[parça, x, y], …]: hepsini ms süresince hedefe götürür. */
  function tasi(c, liste, ms = 600, ease = Ders.ease.inOut) {
    const bas = liste.map(([q]) => [q.x, q.y]);
    return c.tween(ms, (e) => liste.forEach(([q, x, y], i) => q.git(bas[i][0] + (x - bas[i][0]) * e, bas[i][1] + (y - bas[i][1]) * e)), ease);
  }
  /* Tek nokta (elektron). isaret(true) çevresine sarı halka çizer. */
  function nokta(c, p, x, y, o = {}) {
    const q = parca(c, p, x, y);
    q.hale = c.S('circle', { r: NR + 6, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, q.g);
    q.hale.style.opacity = 0;
    q.daire = c.S('circle', { r: o.r || NR, fill: o.renk || RENK.eksi }, q.g);
    q.isaret = (a) => { q.hale.style.opacity = a ? 1 : 0; };
    return q;
  }
  /* İki noktalı çift. kapsul true ise iki noktanın çevresine yumuşak bir kapsül çizilir. */
  function cift(c, nokG, kapG, P1, P2, kapsul) {
    const d1 = nokta(c, nokG, P1[0], P1[1]), d2 = nokta(c, nokG, P2[0], P2[1]);
    let kap = null;
    if (kapsul) {
      const mx = (P1[0] + P2[0]) / 2, my = (P1[1] + P2[1]) / 2, yatay = Math.abs(P2[0] - P1[0]) > Math.abs(P2[1] - P1[1]);
      const uzun = 2 * AYRIM + 2 * NR + 8, kisa = 2 * NR + 10, w = yatay ? uzun : kisa, h = yatay ? kisa : uzun;
      kap = parca(c, kapG, mx, my);
      kap.sekil = c.S('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: Math.min(w, h) / 2, fill: RENK.eksi, 'fill-opacity': 0.16, stroke: RENK.eksi, 'stroke-opacity': 0.75, 'stroke-width': 2 }, kap.g);
      kap.isaret = (a) => { kap.sekil.setAttribute('stroke', a ? RENK.vurgu : RENK.eksi); kap.sekil.setAttribute('stroke-opacity', a ? 1 : 0.75); kap.sekil.setAttribute('stroke-width', a ? 3.5 : 2); };
    }
    return { dots: [d1, d2], kapsul: kap, parcalar: kap ? [d1, d2, kap] : [d1, d2] };
  }

  /* ---- Lewis atomu: sembol + dört yan ---- */
  function sembolParca(c, p, x, y, metin, size) {
    const q = parca(c, p, x, y);
    q.yazi = yazi(c, q.g, 0, size * 0.35, metin, { size, kalin: 700 });
    return q;
  }
  function lewis(c, p, P, sembol, o = {}) {
    const size = o.size || 44, genis = size * (sembol.length > 1 ? 0.95 : 0.74);
    const hx = genis / 2 + 16, hy = size * 0.35 + 16;
    const g = c.S('g', {}, p), yuvaG = c.S('g', {}, g);
    const sem = sembolParca(c, g, P[0], P[1], sembol, size);
    const nokG = c.S('g', {}, g);
    const a = { g, P, sembol: sem, size, genis, hx, hy, noktalar: [], yuvaG, ad: sembol, nokG };
    /* yan: 0 üst, 1 sağ, 2 alt, 3 sol; n o yandaki nokta sayısı; k kaçıncı nokta */
    a.yer = (yan, n = 2, k = 0) => {
      const f = n === 1 ? 0 : (k === 0 ? -AYRIM : AYRIM);
      return [[P[0] + f, P[1] - hy], [P[0] + hx, P[1] + f], [P[0] + f, P[1] + hy], [P[0] - hx, P[1] + f]][yan];
    };
    a.yuvalar = [0, 1, 2, 3].map((s) => {
      const [x, y] = a.yer(s, 1, 0), yatay = s % 2 === 0;
      return c.S('rect', { x: x - (yatay ? 22 : 12), y: y - (yatay ? 12 : 22), width: yatay ? 44 : 24, height: yatay ? 24 : 44, rx: 12, fill: 'none', stroke: RENK.ince, 'stroke-width': 2, 'stroke-dasharray': '4 5' }, yuvaG);
    });
    yuvaG.style.opacity = 0;
    /* Noktaları yanlara göre yeniden dizer; tek nokta yanın ortasında, iki nokta yan yana durur. */
    a.diz = (ms = 450) => {
      const say = [0, 0, 0, 0], sira = [0, 0, 0, 0];
      a.noktalar.forEach((d) => { say[d.yan]++; });
      const lis = a.noktalar.map((d) => { const [x, y] = a.yer(d.yan, say[d.yan], sira[d.yan]++); return [d.parca, x, y]; });
      if (!ms) { lis.forEach(([q, x, y]) => q.git(x, y)); return Promise.resolve(); }
      return tasi(c, lis, ms);
    };
    /* Var olan bir noktayı (başka yerden gelen elektron) o yana ekler. */
    a.ekleParca = (q, yan, ms = 550) => { a.noktalar.push({ parca: q, yan }); return a.diz(ms); };
    /* Yeni nokta: kaynak verilirse oradan gelir, verilmezse yanın içinde belirir. */
    a.ekle = (yan, o2 = {}) => {
      const ms = o2.ms == null ? 450 : o2.ms;
      const q = nokta(c, nokG, ...(o2.kaynak || a.yer(yan, 1, 0)));
      if (!o2.kaynak) q.g.style.opacity = 0;
      a.noktalar.push({ parca: q, yan });
      return par(a.diz(ms), o2.kaynak ? null : belir(c, q.g, ms));
    };
    /* Animasyonsuz nokta ekler. */
    a.hemen = (yan) => { const q = nokta(c, nokG, ...a.yer(yan, 1, 0)); a.noktalar.push({ parca: q, yan }); a.diz(0); return q; };
    return a;
  }

  /* ---- molekül: Lewis yapısı ----
     tanim: { size, atomlar: [{ s, x, y, sira?, size? }], baglar: [[atom a, atom b, ortaklanmış çift sayısı]], yalniz: [[atom, yan], …] }
     yalniz: bir giriş, o yanda bir ortaklanmamış çift (iki nokta). Her atomda valans = ortaklanmış çift sayısı + 2 × ortaklanmamış çift sayısı. */
  function molekul(c, p, t) {
    const size = t.size || 40;
    const g = c.S('g', {}, p), halkaG = c.S('g', {}, g), kapG = c.S('g', {}, g), atomG = c.S('g', {}, g), nokG = c.S('g', {}, g), atomikG = c.S('g', {}, g);
    const atomlar = t.atomlar.map((a) => {
      const L = lewis(c, atomG, [a.x, a.y], a.s, { size: a.size || size });
      L.valans = VALANS[a.s]; L.sira = a.sira || [0, 1, 2, 3];
      return L;
    });
    const baglar = [], yalnizlar = [], slot = atomlar.map(() => []);
    t.baglar.forEach(([ia, ib, n]) => {
      const A = atomlar[ia], B = atomlar[ib], dx = B.P[0] - A.P[0], dy = B.P[1] - A.P[1], D = Math.hypot(dx, dy);
      const u = [dx / D, dy / D], v = [-u[1], u[0]], yatay = Math.abs(u[0]) > 0.5;
      const eA = yatay ? A.genis / 2 : A.size * 0.35, eB = yatay ? B.genis / 2 : B.size * 0.35, orta = (eA + (D - eB)) / 2;
      for (let j = 0; j < n; j++) {
        const s = (j - (n - 1) / 2) * 30, m = [A.P[0] + u[0] * (orta + s), A.P[1] + u[1] * (orta + s)];
        const p1 = [m[0] - v[0] * AYRIM, m[1] - v[1] * AYRIM], p2 = [m[0] + v[0] * AYRIM, m[1] + v[1] * AYRIM];
        const cf = cift(c, nokG, kapG, p1, p2, true);
        baglar.push(Object.assign({ a: ia, b: ib, j }, cf));
        slot[ia].push({ P: p1, d: cf.dots[0] }); slot[ib].push({ P: p2, d: cf.dots[1] });
      }
    });
    t.yalniz.forEach(([ia, yan]) => {
      const A = atomlar[ia], p1 = A.yer(yan, 2, 0), p2 = A.yer(yan, 2, 1);
      const cf = cift(c, nokG, kapG, p1, p2, false);
      yalnizlar.push(Object.assign({ atom: ia, yan }, cf));
      slot[ia].push({ P: p1, d: cf.dots[0] }); slot[ia].push({ P: p2, d: cf.dots[1] });
    });
    atomlar.forEach((A, i) => { if (slot[i].length !== A.valans) console.error(`valans tutmuyor: ${A.ad} (${i}) ${A.valans} ≠ ${slot[i].length}`); });

    /* Atomların ayrı noktaları: önce dört yana birer, fazlası çift; sonra çiftlerdeki yerlerine en yakın noktaya taşınır. */
    const atomik = atomlar.map((A, i) => {
      const yanlar = []; for (let k = 0; k < A.valans; k++) yanlar.push(A.sira[k % 4]);
      const say = [0, 0, 0, 0], sira = [0, 0, 0, 0]; yanlar.forEach((y) => { say[y]++; });
      const konum = yanlar.map((y) => A.yer(y, say[y], sira[y]++));
      const adaylar = [];
      konum.forEach((K, di) => slot[i].forEach((S, si) => adaylar.push([Math.hypot(K[0] - S.P[0], K[1] - S.P[1]), di, si])));
      adaylar.sort((x, y) => x[0] - y[0]);
      const hedef = [], alinan = new Set();
      adaylar.forEach(([, di, si]) => { if (hedef[di] === undefined && !alinan.has(si)) { hedef[di] = slot[i][si].P; alinan.add(si); } });
      const dots = konum.map((K) => nokta(c, atomikG, K[0], K[1]));
      dots.forEach((d) => { d.g.style.opacity = 0; });
      return { A, dots, konum, hedef };
    });
    const tumAtomik = atomik.flatMap((q) => q.dots), tumCiftler = [...baglar, ...yalnizlar];
    const opak = (liste, a) => liste.forEach((q) => { q.g.style.opacity = a; });
    const m = { g, atomlar, baglar, yalnizlar, atomik: tumAtomik, halkaG, kapG, slot };
    /* Atomların ayrı noktalarını göster (çiftleri gizle). */
    m.atomikGoster = () => {
      tumCiftler.forEach((q) => opak(q.parcalar, 0));
      atomik.forEach((q) => q.dots.forEach((d, k) => { d.git(q.konum[k][0], q.konum[k][1]); d.g.style.opacity = 1; }));
    };
    /* Ayrı noktalar çiftlerdeki yerlerine gider; sonra çiftler (kapsülsüz) yerini alır. Kapsüller kapsulGoster ile gelir. */
    m.bagla = async (ms = 1200) => {
      await tasi(c, atomik.flatMap((q) => q.dots.map((d, k) => [d, q.hedef[k][0], q.hedef[k][1]])), ms);
      tumCiftler.forEach((q) => opak(q.dots, 1));
      opak(tumAtomik, 0);
    };
    m.kapsulGoster = (ms = 450) => belir(c, baglar.map((b) => b.kapsul.g), ms);
    m.kapsulGizle = () => baglar.forEach((b) => { b.kapsul.g.style.opacity = 0; });
    m.baglariGizle = () => baglar.forEach((b) => opak(b.parcalar, 0));
    m.yalnizlariGizle = () => yalnizlar.forEach((q) => opak(q.parcalar, 0));
    m.bagGoster = (ms = 450) => belir(c, baglar.flatMap((b) => b.parcalar.map((q) => q.g)), ms);
    m.yalnizGoster = (ms = 450) => belir(c, yalnizlar.flatMap((b) => b.parcalar.map((q) => q.g)), ms);
    m.hepsiniGizle = () => { gizle(atomlar.map((A) => A.sembol.g), tumCiftler.flatMap((q) => q.parcalar.map((x) => x.g))); };
    m.hepsiniGoster = (ms = 450) => belir(c, [...atomlar.map((A) => A.sembol.g), ...tumCiftler.flatMap((q) => q.parcalar.map((x) => x.g))], ms);
    m.atomBaglari = (i) => baglar.filter((b) => b.a === i || b.b === i);
    m.atomYalniz = (i) => yalnizlar.filter((b) => b.atom === i);
    /* Atomun kendi noktaları: ortaklanmış çiftlerden gelen, ortaklanmamış olanlar. */
    m.atomPaylasilan = (i) => baglar.flatMap((b) => (b.a === i ? [b.dots[0]] : b.b === i ? [b.dots[1]] : []));
    m.atomYalnizNokta = (i) => m.atomYalniz(i).flatMap((q) => q.dots);
    m.kapsulIsaret = (liste, a) => liste.forEach((b) => b.kapsul.isaret(a));
    m.noktaIsaret = (liste, a) => liste.forEach((d) => d.isaret(a));
    /* Atomun çevresine kesikli halka; sayaç halkanın yanında sayıyı yazar. o.sayac: atom merkezine göre [dx, dy]. */
    m.halka = (i, R, o = {}) => {
      const A = atomlar[i], hg = c.S('g', {}, halkaG);
      c.S('circle', { cx: A.P[0], cy: A.P[1], r: R, fill: RENK.vurgu, 'fill-opacity': 0.07, stroke: RENK.vurgu, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' }, hg);
      const yer = o.sayac || [0, -R - 16];
      const sayac = yazi(c, hg, A.P[0] + yer[0], A.P[1] + yer[1] + 9, o.metin == null ? '' : o.metin, { size: 26, kalin: 700, renk: RENK.vurgu });
      hg.style.opacity = 0;
      return { g: hg, sayac };
    };
    return m;
  }

  /* ---- hazır moleküller: ad → molekul tanımı ----
     a: [sembol, kolon, satır] (birim D ile çarpılır), b: bağlar, y: ortaklanmamış çiftler [atom, yan], k: bağ uzaklığı çarpanı */
  const SABLON = {
    H2: { a: [['H', -0.5, 0], ['H', 0.5, 0]], b: [[0, 1, 1]], y: [] },
    F2: { a: [['F', -0.5, 0], ['F', 0.5, 0]], b: [[0, 1, 1]], y: [[0, 0], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]] },
    Cl2: { a: [['Cl', -0.5, 0], ['Cl', 0.5, 0]], b: [[0, 1, 1]], y: [[0, 0], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]] },
    N2: { a: [['N', -0.5, 0], ['N', 0.5, 0]], b: [[0, 1, 3]], y: [[0, 3], [1, 1]], k: 1.5 },
    O2: { a: [['O', -0.5, 0], ['O', 0.5, 0]], b: [[0, 1, 2]], y: [[0, 0], [0, 2], [1, 0], [1, 2]], k: 1.2 },
    HF: { a: [['H', -0.5, 0], ['F', 0.5, 0]], b: [[0, 1, 1]], y: [[1, 0], [1, 1], [1, 2]] },
    HCl: { a: [['H', -0.5, 0], ['Cl', 0.5, 0]], b: [[0, 1, 1]], y: [[1, 0], [1, 1], [1, 2]] },
    H2O: { a: [['H', -1, 0], ['O', 0, 0], ['H', 1, 0]], b: [[0, 1, 1], [1, 2, 1]], y: [[1, 0], [1, 2]] },
    NH3: { a: [['N', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], y: [[0, 0]] },
    CH4: { a: [['C', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, -1], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], y: [] },
    NF3: { a: [['N', 0, 0], ['F', -1, 0], ['F', 1, 0], ['F', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], y: [[0, 0], [1, 0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [3, 1], [3, 2], [3, 3]] },
    NCl3: { a: [['N', 0, 0], ['Cl', -1, 0], ['Cl', 1, 0], ['Cl', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], y: [[0, 0], [1, 0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [3, 1], [3, 2], [3, 3]] },
    CF4: { a: [['C', 0, 0], ['F', -1, 0], ['F', 1, 0], ['F', 0, -1], ['F', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], y: [[1, 0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 3], [4, 1], [4, 2], [4, 3]] },
    CCl4: { a: [['C', 0, 0], ['Cl', -1, 0], ['Cl', 1, 0], ['Cl', 0, -1], ['Cl', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], y: [[1, 0], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 3], [4, 1], [4, 2], [4, 3]] },
    CO2: { a: [['O', -1, 0], ['C', 0, 0], ['O', 1, 0]], b: [[0, 1, 2], [1, 2, 2]], y: [[0, 0], [0, 2], [2, 0], [2, 2]], k: 1.2 },
  };
  function sablon(ad, ox, oy, D, o = {}) {
    const s = SABLON[ad], k = (s.k || 1) * D;
    const atomlar = s.a.map(([sem, gx, gy]) => ({ s: sem, x: ox + gx * k, y: oy + gy * k }));
    atomlar.forEach((q, i) => {
      const yon = []; s.b.forEach(([a, b]) => {
        const j = a === i ? b : (b === i ? a : -1); if (j < 0) return;
        const dx = atomlar[j].x - q.x, dy = atomlar[j].y - q.y;
        yon.push(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
      });
      /* Çift oluşturma sırası: önce ortaklanmamış çiftlerin yanları, sonra öteki boş yanlar, en son bağa bakan yanlar. */
      const yal = s.y.filter(([a]) => a === i).map(([, yan]) => yan);
      const bos = [0, 1, 2, 3].filter((y) => !yon.includes(y) && !yal.includes(y));
      q.sira = VALANS[q.s] < 4 ? [...new Set([...yon, ...yal, ...bos])] : [...new Set([...yal, ...bos, ...yon])];
    });
    return { size: o.size || 40, atomlar, baglar: s.b, yalniz: s.y };
  }

  /* ---- iki boyutlu uzay-dolgu modeli: düz gri tonlu, harf etiketli küreler ---- */
  const TON = { H: '#e6e9f2', C: '#7d8397', N: '#a0a6ba', O: '#c3c8d9', Cl: '#8f95a9' };
  const YARICAP = { H: 29, C: 41, N: 37, O: 36, Cl: 42 };
  function kure(c, p, x, y, harf, k = 1) {
    const q = parca(c, p, x, y), r = YARICAP[harf] * k, s = Math.max(20, r * 0.7);
    c.S('circle', { r, fill: TON[harf], stroke: '#10162b', 'stroke-width': 2 }, q.g);
    yazi(c, q.g, 0, s * 0.35, harf, { size: s, kalin: 700, renk: '#10162b' });
    return q;
  }
  /* Merkez (0,0); her satır [harf, dx, dy]. Büyük küre arkada, hidrojenler önde çizilir. */
  const MODEL = {
    CH4: [['C', 0, 0], ['H', -40, -40], ['H', 40, -40], ['H', -40, 40], ['H', 40, 40]],
    NH3: [['N', 0, -18], ['H', -47, 9], ['H', 0, 36], ['H', 47, 9]],
    H2O: [['O', 0, 24], ['H', -45, -13], ['H', 45, -13]],
    CO2: [['O', -64, 0], ['C', 0, 0], ['O', 64, 0]],
  };
  /* model(c, p, 'H2O', x, y, k): { g (parça), kureler, merkez } */
  function model(c, p, ad, x, y, k = 1) {
    const g = parca(c, p, x, y), kureler = MODEL[ad].map(([h, dx, dy]) => kure(c, g.g, dx * k, dy * k, h, k));
    const im = ad === 'CO2' ? 1 : MODEL[ad].findIndex(([h]) => h !== 'H');
    g.kureler = kureler; g.merkez = kureler[im]; g.merkezR = YARICAP[MODEL[ad][im][0]] * k; g.ad = ad;
    return g;
  }

  /* ---- soru şıkları için küçük Lewis çizimi (HTML dizgesi) ---- */
  function miniSvg(sembol, yanlar) {
    const W = 84, H = 64, cx = W / 2, cy = H / 2;
    const yer = [(f) => [cx + f, cy - 22], (f) => [cx + 24, cy + f], (f) => [cx + f, cy + 22], (f) => [cx - 24, cy + f]];
    let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="vertical-align:middle">`;
    yanlar.forEach((n, yan) => {
      for (let k = 0; k < n; k++) { const [x, y] = yer[yan](n === 1 ? 0 : (k === 0 ? -5 : 5)); s += `<circle cx="${x}" cy="${y}" r="3.6" fill="#3cc8e8"/>`; }
    });
    s += `<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor">${sembol}</text></svg>`;
    return s;
  }

  return { NR, AYRIM, VALANS, parca, tasi, nokta, cift, lewis, sembolParca, molekul, sablon, SABLON, kure, model, miniSvg };
})();
