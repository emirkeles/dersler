/* Konu E (Molekül polarlığı) çizim araçları: window.KIT_E. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Renkler tema boyunca aynıdır: artı yük (çekirdek, δ⁺) turuncu, eksi yük (elektron, δ⁻,
   yük gölgesi) mavi, çekme yeşil. Atom küreleri nötr gri tonlarındadır; renk yalnızca yük içindir.
   Gölge, ok ve halat şematiktir: sayı, birim ve dipol oku taşımaz. */
window.KIT_E = (() => {
  'use strict';
  const { RENK, ileri, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, yuk } = window.KIT;

  /* ---- veri ---- */
  /* Elektronegatiflik değerleri (ders kitabından). */
  const EN = { H: 2.20, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 4.00, P: 2.19, S: 2.58, Cl: 3.16 };
  const virgul = (n) => n.toFixed(2).replace('.', ',');
  const fark = (a, b) => Math.abs(EN[a] - EN[b]);
  /* Tahtada ('H_{2}O') ve HTML'de ('H<sub>2</sub>O') formül yazımı. */
  const FORM = {
    H2: 'H_{2}', F2: 'F_{2}', N2: 'N_{2}', O2: 'O_{2}', HF: 'HF', HCl: 'HCl', CH4: 'CH_{4}', NH3: 'NH_{3}', H2O: 'H_{2}O',
    H2S: 'H_{2}S', CO2: 'CO_{2}', CCl4: 'CCl_{4}', CF4: 'CF_{4}', NCl3: 'NCl_{3}', PF3: 'PF_{3}', BH3: 'BH_{3}',
  };
  const html = (ad) => FORM[ad].replace(/_\{([^}]*)\}/g, '<sub>$1</sub>');

  /* ---- Lewis yapıları ----
     a: [sembol, x, y] (birim uzunluk bağ boyu); b: [i, j, ortaklanmış çift sayısı]; c: atom sırası → ortaklanmamış çiftlerin açıları
     (derece; 0 sağ, 90 aşağı, −90 yukarı). Her çift iki nokta. */
  const sagC = [-90, 90, 0], solC = [-90, 90, 180], ustC = [180, 0, -90], altC = [180, 0, 90];
  const LEWIS = {
    H2: { a: [['H', 0, 0], ['H', 1, 0]], b: [[0, 1, 1]], c: {} },
    HF: { a: [['H', 0, 0], ['F', 1, 0]], b: [[0, 1, 1]], c: { 1: sagC } },
    HCl: { a: [['H', 0, 0], ['Cl', 1, 0]], b: [[0, 1, 1]], c: { 1: sagC } },
    H2O: { a: [['O', 0, 0], ['H', -1, 0], ['H', 1, 0]], b: [[0, 1, 1], [0, 2, 1]], c: { 0: [-90, 90] } },
    H2S: { a: [['S', 0, 0], ['H', -1, 0], ['H', 1, 0]], b: [[0, 1, 1], [0, 2, 1]], c: { 0: [-90, 90] } },
    NH3: { a: [['N', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], c: { 0: [-90] } },
    CH4: { a: [['C', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, -1], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], c: {} },
    BH3: { a: [['B', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], c: {} },
    CO2: { a: [['C', 0, 0], ['O', -1, 0], ['O', 1, 0]], b: [[0, 1, 2], [0, 2, 2]], c: { 1: [-90, 90], 2: [-90, 90] } },
    CCl4: { a: [['C', 0, 0], ['Cl', -1, 0], ['Cl', 1, 0], ['Cl', 0, -1], ['Cl', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], c: { 1: solC, 2: sagC, 3: ustC, 4: altC } },
    CF4: { a: [['C', 0, 0], ['F', -1, 0], ['F', 1, 0], ['F', 0, -1], ['F', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], c: { 1: solC, 2: sagC, 3: ustC, 4: altC } },
    NCl3: { a: [['N', 0, 0], ['Cl', -1, 0], ['Cl', 1, 0], ['Cl', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], c: { 0: [-90], 1: solC, 2: sagC, 3: altC } },
    PF3: { a: [['P', 0, 0], ['F', -1, 0], ['F', 1, 0], ['F', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], c: { 0: [-90], 1: solC, 2: sagC, 3: altC } },
  };
  const rad = (d) => (d * Math.PI) / 180;

  /* Lewis yapısı: sembol ve mavi noktalar; ortaklanmış çift kapsüllü, ortaklanmamış çift kapsülsüz.
     o: { olcek, d (bağ boyu), size (sembol puntosu), merkez: atom sırası (halka), cerceve: atom sırası (o atomun çiftleri kalın çerçeveli),
          soluk: [atom sıraları] (çiftleri soluk) }
     Dönen: { g, P (atom konumları), harf (sembol öğeleri), cift (atom başına grup), halka, cerceve, bag (ortaklanmış çiftler grubu) }. */
  function lewis(c, p, ad, cx, cy, o = {}) {
    const t = LEWIS[ad], k = o.olcek || 1, D = (o.d || 90) * k, boy = (o.size || 34) * k;
    const xs = t.a.map((a) => a[1]), ys = t.a.map((a) => a[2]);
    const ox = cx - ((Math.min(...xs) + Math.max(...xs)) / 2) * D, oy = cy - ((Math.min(...ys) + Math.max(...ys)) / 2) * D;
    const g = c.S('g', {}, p), gBag = c.S('g', {}, g), gHarf = c.S('g', {}, g);
    const P = t.a.map((a) => [ox + a[1] * D, oy + a[2] * D]);
    const nokta = (grup, x, y) => c.S('circle', { cx: x, cy: y, r: Math.max(3.4, 4.4 * k), fill: RENK.eksi }, grup);
    const yarim = (s, a) => { // sembolün a yönündeki yarı boyu + pay
      const w = (s.length === 1 ? 0.34 : 0.58) * boy, h = 0.4 * boy;
      return 1 / Math.sqrt((Math.cos(a) / w) ** 2 + (Math.sin(a) / h) ** 2) + 11 * k;
    };
    const harf = t.a.map((a, i) => yazi(c, gHarf, P[i][0], P[i][1] + boy * 0.36, a[0], { size: boy, kalin: 700 }));
    // Ortaklanmış çiftler: ikişer nokta, kapsüllü.
    t.b.forEach(([i, j, n]) => {
      const a = Math.atan2(P[j][1] - P[i][1], P[j][0] - P[i][0]), M = [(P[i][0] + P[j][0]) / 2, (P[i][1] + P[j][1]) / 2];
      for (let m = 0; m < n; m++) {
        const off = (m - (n - 1) / 2) * 17 * k, q = ileri(M, a, off);
        const kg = c.S('g', { transform: `translate(${q[0]},${q[1]}) rotate(${(a * 180) / Math.PI})` }, gBag);
        c.S('rect', { x: -8 * k, y: -15 * k, width: 16 * k, height: 30 * k, rx: 8 * k, fill: RENK.eksi, 'fill-opacity': 0.14, stroke: RENK.eksi, 'stroke-opacity': 0.6, 'stroke-width': 1.5 }, kg);
        nokta(kg, 0, -6.5 * k); nokta(kg, 0, 6.5 * k);
      }
    });
    // Ortaklanmamış çiftler.
    const cift = t.a.map(() => null), cerceveler = [];
    t.a.forEach((a, i) => {
      const grup = c.S('g', {}, g); cift[i] = grup;
      (t.c[i] || []).forEach((deg) => {
        const q = ileri(P[i], rad(deg), yarim(a[0], rad(deg)));
        const kg = c.S('g', { transform: `translate(${q[0]},${q[1]}) rotate(${deg})` }, grup);
        nokta(kg, 0, -6.5 * k); nokta(kg, 0, 6.5 * k);
        if (o.cerceve === i) cerceveler.push(c.S('rect', { x: -9 * k, y: -16 * k, width: 18 * k, height: 32 * k, rx: 9 * k, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.2 }, kg));
      });
      if ((o.soluk || []).includes(i)) grup.style.opacity = 0.35;
    });
    const halka = o.merkez == null ? null : c.S('circle', { cx: P[o.merkez][0], cy: P[o.merkez][1], r: boy * 0.78, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.2 }, g);
    return { g, P, harf, cift, halka, bag: gBag, boy, cerceveler };
  }

  /* ---- uzay-dolgu modeli ----
     İki boyutlu, düz gri kürelerle, simge içinde. Atom: [sembol, x, y]; ilk atom ilk çizilir, sonrakiler üstüne biner. */
  const KURE = {
    H: { r: 30, g: '#e6e6e6' }, B: { r: 44, g: '#a2a2a2' }, C: { r: 46, g: '#9c9c9c' }, N: { r: 42, g: '#b2b2b2' }, O: { r: 40, g: '#bdbdbd' },
    F: { r: 36, g: '#d2d2d2' }, P: { r: 54, g: '#a9a9a9' }, S: { r: 52, g: '#b9b9b9' }, Cl: { r: 54, g: '#ababab' },
  };
  const MODEL = {
    H2: [['H', -22, 0], ['H', 22, 0]],
    F2: [['F', -25, 0], ['F', 25, 0]],
    N2: [['N', -27, 0], ['N', 27, 0]],
    O2: [['O', -26, 0], ['O', 26, 0]],
    HF: [['H', -30, 0], ['F', 22, 0]],
    HCl: [['H', -38, 0], ['Cl', 24, 0]],
    CH4: [['C', 0, 0], ['H', -42, -38], ['H', 42, -38], ['H', -42, 38], ['H', 42, 38]],
    NH3: [['N', 0, -24], ['H', -46, 22], ['H', 46, 22], ['H', 0, 48]],
    H2O: [['O', 0, -20], ['H', -49, 18], ['H', 49, 18]],
    H2S: [['S', 0, -22], ['H', -53, 26], ['H', 53, 26]],
    CO2: [['C', 0, 0], ['O', -72, 0], ['O', 72, 0]],
    CCl4: [['C', 0, 0], ['Cl', -52, -48], ['Cl', 52, -48], ['Cl', -52, 48], ['Cl', 52, 48]],
    CF4: [['C', 0, 0], ['F', -44, -40], ['F', 44, -40], ['F', -44, 40], ['F', 44, 40]],
    NCl3: [['N', 0, -30], ['Cl', -70, 26], ['Cl', 70, 26], ['Cl', 0, 58]],
    PF3: [['P', 0, -30], ['F', -62, 22], ['F', 62, 22], ['F', 0, 54]],
    BH3: [['B', 0, 0], ['H', 0, -56], ['H', 48, 28], ['H', -48, 28]],
  };

  /* Kaç birimlik bir kutuya sığar: { w, h } (olcek 1'de). */
  const modelBoyu = (ad) => {
    const a = MODEL[ad].map(([s, x, y]) => [x - KURE[s].r, x + KURE[s].r, y - KURE[s].r, y + KURE[s].r]);
    return { w: Math.max(...a.map((q) => q[1])) - Math.min(...a.map((q) => q[0])), h: Math.max(...a.map((q) => q[3])) - Math.min(...a.map((q) => q[2])) };
  };

  /* o: { olcek, harf (false: simge yazma), golge: [atom başına yoğunluk 0–1] (verilirse gölge çizilir, ama gizli değildir),
          delta: [[atom sırası, '+' | '-', 'ust' | 'alt']] }
     Dönen: { g, atomlar: [{ x, y, r, s }], harfG, golgeG, daireler (gölge daireleri), deltaG, golge(yog, ms) }. */
  function uzayDolgu(c, p, ad, cx, cy, o = {}) {
    const k = o.olcek || 1, g = c.S('g', {}, p), gK = c.S('g', {}, g), gG = c.S('g', {}, g), gH = c.S('g', {}, g), gD = c.S('g', {}, g);
    const dizi = MODEL[ad], bb = dizi.map(([s, x, y]) => [x - KURE[s].r, x + KURE[s].r, y - KURE[s].r, y + KURE[s].r]);
    const mx = (Math.min(...bb.map((q) => q[0])) + Math.max(...bb.map((q) => q[1]))) / 2, my = (Math.min(...bb.map((q) => q[2])) + Math.max(...bb.map((q) => q[3]))) / 2;
    const atomlar = dizi.map(([s, x, y]) => ({ s, x: cx + (x - mx) * k, y: cy + (y - my) * k, r: KURE[s].r * k }));
    atomlar.forEach((a) => c.S('circle', { cx: a.x, cy: a.y, r: a.r, fill: KURE[a.s].g, stroke: '#4d4d4d', 'stroke-width': 1.6 }, gK));
    const daireler = atomlar.map((a) => c.S('circle', { cx: a.x, cy: a.y, r: a.r - 1, fill: RENK.eksi, 'fill-opacity': 0, 'pointer-events': 'none' }, gG));
    const yogun = (yog) => daireler.forEach((d, i) => d.setAttribute('fill-opacity', yog[i]));
    if (o.golge) yogun(o.golge);
    const harfler = o.harf === false ? [] : atomlar.map((a) => yazi(c, gH, a.x, a.y + 7, a.s, { size: Math.max(18, Math.min(30, a.r * 0.62)), kalin: 700, renk: '#10162b' }));
    (o.delta || []).forEach(([i, tur, yer]) => {
      const a = atomlar[i];
      if (yer === 'sol') delta(c, gD, a.x - a.r - 36, a.y + 10, tur); else if (yer === 'sag') delta(c, gD, a.x + a.r + 36, a.y + 10, tur);
      else delta(c, gD, a.x, yer === 'alt' ? a.y + a.r + 34 : a.y - a.r - 12, tur);
    });
    return {
      g, atomlar, harfler, harfG: gH, golgeG: gG, daireler, deltaG: gD, gK,
      golge(yog, ms = 700) { const bas = daireler.map((d) => +d.getAttribute('fill-opacity')); return c.tween(ms, (e) => daireler.forEach((d, i) => d.setAttribute('fill-opacity', bas[i] + (yog[i] - bas[i]) * e))); },
    };
  }

  /* δ⁺ (turuncu) ya da δ⁻ (mavi) etiketi; koyu zeminli, kenar çizgili küçük rozet içinde. */
  function delta(c, p, x, y, tur, size = 30) {
    const g = c.S('g', {}, p), renk = tur === '+' ? RENK.arti : RENK.eksi;
    c.S('rect', { x: x - 28, y: y - size + 4, width: 56, height: size + 8, rx: 10, fill: '#10162b', stroke: renk, 'stroke-opacity': 0.7, 'stroke-width': 1.6 }, g);
    const t = yazi(c, g, x, y + 2, tur === '+' ? 'δ^{+}' : 'δ^{−}', { size, kalin: 700, renk, math: true });
    return g;
  }

  /* ---- iki atomlu bağ: çekirdekler, ortak elektronlar ve elektron bulutu ----
     A, B: element simgeleri. Bulut iki yarı saydam daireyle gösterilir; kayma (−1…1, B'ye doğru artı) bulutu ve ortak elektronları kaydırır.
     Çekme okları (yeşil) her çekirdekten elektronlara doğrudur; boyları elektronegatifliğe göredir. Şematiktir, sayı taşımaz.
     o: { olcek, deltaY }  Dönen: { g, ayarla(kayma, la, lb), git(A, B, ms), sembol(A, B), delta(a, b), kaymaOf(A, B), ... } */
  function bag(c, p, cx, cy, A, B, o = {}) {
    const k = o.olcek || 1, D = 230 * k, R = 130 * k, g = c.S('g', {}, p), xa = cx - D / 2, xb = cx + D / 2, xm = cx;
    const buG = c.S('g', {}, g);
    const bA = c.S('circle', { cx: xa, cy, r: R, fill: RENK.eksi, 'fill-opacity': 0.22 }, buG), bB = c.S('circle', { cx: xb, cy, r: R, fill: RENK.eksi, 'fill-opacity': 0.22 }, buG);
    const nA = yuk(c, g, [xa, cy], 'arti', Math.max(11, 17 * k)), nB = yuk(c, g, [xb, cy], 'arti', Math.max(11, 17 * k));
    const re = Math.max(7, 10 * k);
    const e1 = yuk(c, g, [xm, cy - 13 * k], 'eksi', re), e2 = yuk(c, g, [xm, cy + 13 * k], 'eksi', re);
    const yO = cy - 44 * k, oA = ok(c, g, [xa, yO], [xa + 40, yO], RENK.cekme, Math.max(3, 4 * k)), oB = ok(c, g, [xb, yO], [xb - 40, yO], RENK.cekme, Math.max(3, 4 * k));
    const fs = Math.max(20, 30 * k), yS = cy + 62 * k + fs * 0.4;
    const sA = yazi(c, g, xa, yS, A, { size: fs, kalin: 700 }), sB = yazi(c, g, xb, yS, B, { size: fs, kalin: 700 });
    const dY = o.deltaY == null ? cy - R * 1.2 - 8 * k : o.deltaY;
    const dA = c.S('g', {}, g), dB = c.S('g', {}, g);
    const durum = { A, B, s: 0, la: 0, lb: 0 };
    const kaymaOf = (a, b) => ((EN[b] - EN[a]) / 1.8) * 0.85;
    const boyOf = (a) => 24 * EN[a] * k * 0.95;
    function ayarla(s, la, lb) {
      durum.s = s; durum.la = la; durum.lb = lb;
      bA.setAttribute('r', R * (1 - 0.18 * s)); bB.setAttribute('r', R * (1 + 0.18 * s));
      bA.setAttribute('fill-opacity', 0.22 * (1 - 0.85 * s)); bB.setAttribute('fill-opacity', 0.22 * (1 + 0.85 * s));
      const x = xm + s * (D / 2) * 0.6;
      e1.tasi([x, cy - 13 * k]); e2.tasi([x, cy + 13 * k]);
      oA.ciz([xa + 22 * k, yO], [xa + 22 * k + la, yO]); oB.ciz([xb - 22 * k, yO], [xb - 22 * k - lb, yO]);
    }
    function sembol(a, b) { durum.A = a; durum.B = b; sA.textContent = a; sB.textContent = b; }
    /* a, b: '+' | '-' (etiketi kur) | null (sil) | undefined (dokunma). op verilirse etiketin saydamlığı. */
    function etiket(a, b, op) {
      [[dA, a, xa], [dB, b, xb]].forEach(([grup, tur, x]) => {
        if (tur === undefined) return;
        grup.textContent = '';
        if (tur) delta(c, grup, x, dY, tur);
        if (op != null) grup.style.opacity = op;
      });
    }
    function git(a, b, ms = 900, s = kaymaOf(a, b)) {
      const s0 = durum.s, la0 = durum.la, lb0 = durum.lb, la1 = boyOf(a), lb1 = boyOf(b);
      sembol(a, b);
      return c.tween(ms, (e) => ayarla(s0 + (s - s0) * e, la0 + (la1 - la0) * e, lb0 + (lb1 - lb0) * e));
    }
    ayarla(kaymaOf(A, B), boyOf(A), boyOf(B));
    return {
      g, ayarla, git, sembol, etiket, kaymaOf, boyOf, xa, xb, cy, durum, dA, dB, bulut: buG,
      cekirdek: [nA.g, nB.g, sA, sB], elektron: [e1.g, e2.g], oklar: [oA.g, oB.g],
      hepsi: [buG, nA.g, nB.g, sA, sB, e1.g, e2.g, oA.g, oB.g, dA, dB],
    };
  }

  /* ---- halat çekme ----
     gA, gB: iki figürün gücü (1 normal, 1.3 güçlü); halatın işareti güçlü tarafa doğru kayar. ayarla(t) işareti t (−1…1) konumuna alır. */
  function halat(c, p, cx, cy, gA, gB) {
    const g = c.S('g', {}, p), el = 92;
    cizgi(c, g, [cx - 190, cy + 100], [cx + 190, cy + 100], RENK.ince, 2);
    cizgi(c, g, [cx, cy - 22], [cx, cy + 22], RENK.ince, 2, { 'stroke-dasharray': '3 5' });
    const ip = cizgi(c, g, [cx - el, cy], [cx + el, cy], RENK.cizgi, 4);
    const figur = (hx, f, s) => { // hx: elin x'i; f: halata doğru yön (+1 sağ, −1 sol)
      const w = 5 * s, ren = RENK.metal;
      const omuz = [hx - f * 44 * s, cy + 6 * s], bas = [omuz[0] - f * 16 * s, omuz[1] - 28 * s], kalca = [omuz[0] + f * 8 * s, omuz[1] + 50 * s];
      c.S('circle', { cx: bas[0], cy: bas[1], r: 14 * s, fill: ren }, g);
      cizgi(c, g, omuz, kalca, ren, w); cizgi(c, g, omuz, bas, ren, w * 0.8); cizgi(c, g, omuz, [hx, cy], ren, w * 0.85);
      cizgi(c, g, kalca, [kalca[0] + f * 28 * s, cy + 100], ren, w); cizgi(c, g, kalca, [kalca[0] - f * 6 * s, cy + 100], ren, w);
    };
    figur(cx - el, 1, gA); figur(cx + el, -1, gB);
    const isaret = c.S('path', { fill: RENK.vurgu, stroke: '#10162b', 'stroke-width': 1.5 }, g);
    let t = 0;
    const ayarla = (v) => { t = v; const x = cx + v * 55; isaret.setAttribute('d', `M${x},${cy - 15} l11,15 l-11,15 l-11,-15 Z`); };
    ayarla(0);
    return { g, ayarla, git(v, ms = 800) { const t0 = t; return c.tween(ms, (e) => ayarla(t0 + (v - t0) * e)); } };
  }

  /* ---- elektronegatiflik değerleri satırı ---- */
  function enSatiri(c, p, simgeler, x0, y, ara, o = {}) {
    const g = c.S('g', {}, p), ogeler = {};
    simgeler.forEach((s, i) => { ogeler[s] = renkli(c, g, x0 + i * ara, y, [[s, RENK.soluk], '  ' + virgul(EN[s])], { size: o.size || 24, kalin: 600 }); });
    /* liste içindekiler tam görünür, ötekiler soluk (soluk değerler tahta yazı sayımına girmez). */
    const vurgula = (liste, ms = 300, soluk = 0.12) => c.tween(ms, (e) => Object.keys(ogeler).forEach((s) => {
      const hedef = liste.includes(s) ? 1 : soluk, bas = ogeler[s].__a == null ? 1 : ogeler[s].__a;
      ogeler[s].style.opacity = bas + (hedef - bas) * e; if (e === 1) ogeler[s].__a = hedef;
    }));
    return { g, ogeler, vurgula };
  }

  /* ---- "dipol momenti" kutusu: başlık ve değer (sıfır / sıfırdan farklı); sayı ve birim yoktur ---- */
  function dipolKutusu(c, p, x, y, w, deger, renk) {
    const g = c.S('g', {}, p);
    kutu(c, g, x - w / 2, y - 34, w, 68, { rx: 12 });
    yazi(c, g, x, y - 6, 'dipol momenti', { size: 20, kalin: 500, renk: RENK.soluk });
    const d = yazi(c, g, x, y + 24, deger, { size: 24, kalin: 700, renk: renk || RENK.yazi });
    return { g, deger: d };
  }

  /* ---- kart başına seçimle sınıflama tahtası ----
     Kartı tahtada öne çıkarır (sec), öğrenci kutuyu seçince kart kutusunda küçük bir etiket olarak yerleşir (yerlestir).
     o: { kutular: [{ x, y, w, h, baslik, kol (yerleşim sütunu) }], kart: { x, y }, ciz(k, g) (kartın içeriği; formülü ayrıca yazar),
          formulY (kart formülünün y'si), chipPunto }  */
  function siniflaTahtasi(c, p, o) {
    const kutularEl = o.kutular.map((q) => {
      const g = c.S('g', {}, p);
      kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      if (q.baslik) yazi(c, g, q.x + q.w / 2, q.y + q.h - 20, q.baslik, { size: q.punto || 22, kalin: 700, renk: q.renk || RENK.yazi });
      return { g, n: 0 };
    });
    let kartG = null, formul = null;
    return {
      kutularEl,
      async sec(i, k) {
        kartG = c.S('g', {}, p); gizle(kartG);
        formul = yazi(c, kartG, o.kart.x, o.kart.y, k.f, { size: 46, kalin: 700, math: true });
        if (o.ciz) o.ciz(k, kartG);
        await belir(c, kartG, 350);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kutularEl[k.kutu], kol = q.kol || 4, cw = q.w / kol, sat = Math.floor(e.n / kol), sut = e.n % kol;
        const hx = q.x + cw * (sut + 0.5), hy = q.y + (q.ust || 52) + sat * 44;
        e.n++;
        const chip = yazi(c, p, o.kart.x, o.kart.y, k.f, { size: 46, kalin: 700, math: true }), x0 = o.kart.x, y0 = o.kart.y;
        // Kartın öteki öğeleri silinir; formül kutusundaki yerine küçülerek gider.
        formul.style.opacity = 0;
        await c.tween(250, (e2) => { [...kartG.children].forEach((ch) => { if (ch !== formul) ch.style.opacity = 1 - e2; }); });
        kartG.remove();
        await c.tween(550, (e2) => { chip.setAttribute('x', x0 + (hx - x0) * e2); chip.setAttribute('y', y0 + (hy - y0) * e2); chip.setAttribute('font-size', 46 + ((o.chipPunto || 26) - 46) * e2); });
        return chip;
      },
    };
  }

  return { EN, virgul, fark, FORM, html, LEWIS, MODEL, KURE, modelBoyu, lewis, uzayDolgu, delta, bag, halat, enSatiri, dipolKutusu, siniflaTahtasi };
})();
