/* Konu G (Moleküller arası etkileşimler) çizim araçları: window.KIT_G. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Renkler tema boyunca aynıdır: artı yük (iyon, δ⁺, çekirdek) turuncu, eksi yük (iyon, δ⁻, elektron bulutu) mavi,
   etkileşim çizgisi yeşil kesikli, itme kırmızı. Atom ve molekül küreleri nötr gri tonlardadır.
   Gölge, ok ve çizgiler şematiktir: kuvvet değeri, uzaklık ya da sayı taşımaz.
   Araçlar:
     FORM, html, TUR, cf, ch         formül yazımı (tahta ve HTML), tanecik türü ('atom' | 'iyon' | 'polar' | 'apolar'), çift adı
     delta                           δ⁺ / δ⁻ rozeti
     uzayDolgu                       iki boyutlu uzay-dolgu modeli (gri küreler, gölge, δ etiketleri)
     tanecik, cift, cekim, itmeOklari  tek tanecik (iyon, atom, molekül ya da dipol şeridi), iki tanecik ve aralarında yeşil kesikli çekim
     serit                           dipol şeridi (artı ucu turuncu, eksi ucu mavi); döner
     bulutAtom                       soy gaz atomu: çekirdek, elektronlar ve bir yana yığılabilen elektron bulutu
     lewis                           Lewis yapısı (F–H, O–H, N–H bağlarını vurgulama seçeneğiyle)
     kartTahtasi                     kart başına seçimle sınıflama tahtası (kutular + öne çıkan kart)
     maddeTablosu                    iki sütunlu seçmeli tablo (çift → etkileşim)
     matris5                         üçgen tablo: beş etkileşimin adı
     hidrojenBagiZinciri             üç su molekülü, molekül içi bağ düz, moleküller arası hidrojen bağı yeşil kesikli
     dnaMerdiven                     iki zincir, dört baz, bazlar arası hidrojen bağları
     geckoAyak, bardakSu             G1 sahne 6 ve sahne 2 çizimleri */
window.KIT_G = (() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par, ok, yuk } = window.KIT;
  const INK = '#10162b';
  /* İç içe dizileri düzleştiren belir / gizle. */
  const B = (c, el, ms, hedef) => belir(c, [el].flat(Infinity), ms, hedef);
  const Gz = (...els) => gizle(...els.flat(Infinity));
  const rad = (d) => (d * Math.PI) / 180;

  /* ---- veri ---- */
  const FORM = {
    H2: 'H_{2}', O2: 'O_{2}', N2: 'N_{2}', F2: 'F_{2}', CH4: 'CH_{4}', CF4: 'CF_{4}', CCl4: 'CCl_{4}', CO2: 'CO_{2}', BH3: 'BH_{3}',
    H2O: 'H_{2}O', NH3: 'NH_{3}', HF: 'HF', HCl: 'HCl', H2S: 'H_{2}S', NCl3: 'NCl_{3}', CO: 'CO',
    He: 'He', Ne: 'Ne', Ar: 'Ar',
    'Na+': 'Na^{+}', 'K+': 'K^{+}', 'Li+': 'Li^{+}', 'Mg2+': 'Mg^{2+}', 'Ca2+': 'Ca^{2+}', 'Cl-': 'Cl^{−}', 'Br-': 'Br^{−}',
  };
  const html = (ad) => FORM[ad].replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');
  const TUR = {};
  ['He', 'Ne', 'Ar'].forEach((a) => { TUR[a] = 'atom'; });
  ['Na+', 'K+', 'Li+', 'Mg2+', 'Ca2+', 'Cl-', 'Br-'].forEach((a) => { TUR[a] = 'iyon'; });
  ['HF', 'HCl', 'H2O', 'NH3', 'H2S', 'NCl3', 'CO'].forEach((a) => { TUR[a] = 'polar'; });
  ['H2', 'O2', 'N2', 'F2', 'CH4', 'CF4', 'CCl4', 'CO2', 'BH3'].forEach((a) => { TUR[a] = 'apolar'; });
  const cf = (a, b) => FORM[a] + '–' + FORM[b];
  const ch = (a, b) => html(a) + '–' + html(b);

  const ION = {
    'Na+': { r: 34, t: 'arti' }, 'K+': { r: 40, t: 'arti' }, 'Li+': { r: 28, t: 'arti' }, 'Mg2+': { r: 38, t: 'arti' }, 'Ca2+': { r: 42, t: 'arti' },
    'Cl-': { r: 42, t: 'eksi' }, 'Br-': { r: 46, t: 'eksi' },
  };
  const KURE = {
    H: { r: 30, g: '#e6e6e6' }, B: { r: 44, g: '#a2a2a2' }, C: { r: 46, g: '#9c9c9c' }, N: { r: 42, g: '#b2b2b2' }, O: { r: 40, g: '#bdbdbd' },
    F: { r: 36, g: '#d2d2d2' }, P: { r: 54, g: '#a9a9a9' }, S: { r: 52, g: '#b9b9b9' }, Cl: { r: 54, g: '#ababab' },
    He: { r: 34, g: '#e0e0e0' }, Ne: { r: 40, g: '#d0d0d0' }, Ar: { r: 50, g: '#b8b8b8' },
  };
  const MODEL = {
    H2: [['H', -22, 0], ['H', 22, 0]], F2: [['F', -25, 0], ['F', 25, 0]], N2: [['N', -27, 0], ['N', 27, 0]], O2: [['O', -26, 0], ['O', 26, 0]],
    HF: [['H', -30, 0], ['F', 22, 0]], HCl: [['H', -38, 0], ['Cl', 24, 0]], CO: [['C', -30, 0], ['O', 32, 0]],
    CH4: [['C', 0, 0], ['H', -42, -38], ['H', 42, -38], ['H', -42, 38], ['H', 42, 38]],
    NH3: [['N', 0, -24], ['H', -46, 22], ['H', 46, 22], ['H', 0, 48]],
    H2O: [['O', 0, -20], ['H', -49, 18], ['H', 49, 18]],
    H2S: [['S', 0, -22], ['H', -53, 26], ['H', 53, 26]],
    CO2: [['C', 0, 0], ['O', -72, 0], ['O', 72, 0]],
    CCl4: [['C', 0, 0], ['Cl', -52, -48], ['Cl', 52, -48], ['Cl', -52, 48], ['Cl', 52, 48]],
    CF4: [['C', 0, 0], ['F', -44, -40], ['F', 44, -40], ['F', -44, 40], ['F', 44, 40]],
    NCl3: [['N', 0, -30], ['Cl', -70, 26], ['Cl', 70, 26], ['Cl', 0, 58]],
    BH3: [['B', 0, 0], ['H', 0, -56], ['H', 48, 28], ['H', -48, 28]],
    He: [['He', 0, 0]], Ne: [['Ne', 0, 0]], Ar: [['Ar', 0, 0]],
  };
  /* Polar moleküllerde δ etiketlerinin yeri: [atom sırası, işaret, yer]. */
  const DLT = {
    HF: [[0, '+', 'ust'], [1, '-', 'ust']], HCl: [[0, '+', 'ust'], [1, '-', 'ust']],
    H2O: [[0, '-', 'ust'], [1, '+', 'sol'], [2, '+', 'sag']], H2S: [[0, '-', 'ust'], [1, '+', 'sol'], [2, '+', 'sag']],
    NH3: [[0, '-', 'ust'], [1, '+', 'sol'], [2, '+', 'sag'], [3, '+', 'alt']],
  };
  /* Atom başına gölge yoğunluğu: polar molekülde eksi uç koyu, öteki uçlar açık; apolarda eşit. */
  const golgeOf = (ad) => {
    const n = MODEL[ad].length;
    if (!DLT[ad]) return Array(n).fill(0.34);
    const y = Array(n).fill(0.14);
    DLT[ad].forEach(([i, t]) => { if (t === '-') y[i] = 0.75; });
    return y;
  };
  const modelBoyu = (ad) => {
    const a = MODEL[ad].map(([s, x, y]) => [x - KURE[s].r, x + KURE[s].r, y - KURE[s].r, y + KURE[s].r]);
    return { w: Math.max(...a.map((q) => q[1])) - Math.min(...a.map((q) => q[0])), h: Math.max(...a.map((q) => q[3])) - Math.min(...a.map((q) => q[2])) };
  };

  /* ---- δ rozeti ---- */
  function delta(c, p, x, y, tur, size = 30) {
    const s = size / 30, g = c.S('g', {}, p), renk = tur === '+' ? RENK.arti : RENK.eksi;
    c.S('rect', { x: x - 28 * s, y: y - 26 * s, width: 56 * s, height: 38 * s, rx: 10 * s, fill: INK, stroke: renk, 'stroke-opacity': 0.7, 'stroke-width': 1.6 }, g);
    yazi(c, g, x, y + 2 * s, tur === '+' ? 'δ^{+}' : 'δ^{−}', { size, kalin: 700, renk, math: true });
    return g;
  }

  /* ---- uzay-dolgu modeli ----
     o: { olcek, harf (false: simge yazma), golge: [atom başına yoğunluk] (yoksa gölge çizilmez, ama daireler hazırdır), delta: [[atom, '+'|'-', yer]], ayna (x yönünde çevir), deltaPunto }
     yer: 'ust' | 'alt' | 'sol' | 'sag' ya da derece (0 sağ, 90 aşağı). Dönen: { g, atomlar, harfG, golgeG, daireler, deltaG, w, h, golge(yog, ms) }. */
  function uzayDolgu(c, p, ad, cx, cy, o = {}) {
    const k = o.olcek || 1, g = c.S('g', {}, p), gK = c.S('g', {}, g), gG = c.S('g', {}, g), gH = c.S('g', {}, g), gD = c.S('g', {}, g);
    const dizi = MODEL[ad].map(([s, x, y]) => [s, o.ayna ? -x : x, y]);
    const bb = dizi.map(([s, x, y]) => [x - KURE[s].r, x + KURE[s].r, y - KURE[s].r, y + KURE[s].r]);
    const mx = (Math.min(...bb.map((q) => q[0])) + Math.max(...bb.map((q) => q[1]))) / 2, my = (Math.min(...bb.map((q) => q[2])) + Math.max(...bb.map((q) => q[3]))) / 2;
    const atomlar = dizi.map(([s, x, y]) => ({ s, x: cx + (x - mx) * k, y: cy + (y - my) * k, r: KURE[s].r * k }));
    atomlar.forEach((a) => c.S('circle', { cx: a.x, cy: a.y, r: a.r, fill: KURE[a.s].g, stroke: '#4d4d4d', 'stroke-width': 1.6 }, gK));
    const daireler = atomlar.map((a) => c.S('circle', { cx: a.x, cy: a.y, r: a.r - 1, fill: RENK.eksi, 'fill-opacity': 0, 'pointer-events': 'none' }, gG));
    if (o.golge) daireler.forEach((d, i) => d.setAttribute('fill-opacity', o.golge[i]));
    if (o.harf !== false) atomlar.forEach((a) => yazi(c, gH, a.x, a.y + 7, a.s, { size: Math.max(18, Math.min(30, a.r * 0.62)), kalin: 700, renk: INK }));
    const dp = o.deltaPunto || 30;
    (o.delta || []).forEach(([i, tur, yer]) => {
      const a = atomlar[i];
      if (typeof yer === 'number') delta(c, gD, a.x + Math.cos(rad(yer)) * (a.r + 36), a.y + Math.sin(rad(yer)) * (a.r + 24) + 10, tur, dp);
      else if (yer === 'sol') delta(c, gD, a.x - a.r - 36, a.y + 10, tur, dp);
      else if (yer === 'sag') delta(c, gD, a.x + a.r + 36, a.y + 10, tur, dp);
      else delta(c, gD, a.x, yer === 'alt' ? a.y + a.r + 34 : a.y - a.r - 12, tur, dp);
    });
    const w = (Math.max(...atomlar.map((a) => a.x + a.r)) - Math.min(...atomlar.map((a) => a.x - a.r))) / 2;
    const h = (Math.max(...atomlar.map((a) => a.y + a.r)) - Math.min(...atomlar.map((a) => a.y - a.r))) / 2;
    return {
      g, atomlar, harfG: gH, golgeG: gG, daireler, deltaG: gD, gK, w, h, x: cx, y: cy,
      golge(yog, ms = 700) { const bas = daireler.map((d) => +d.getAttribute('fill-opacity')); return c.tween(ms, (e) => daireler.forEach((d, i) => d.setAttribute('fill-opacity', bas[i] + (yog[i] - bas[i]) * e))); },
    };
  }

  /* ---- dipol şeridi ----
     aci = 0: artı ucu solda (turuncu), eksi ucu sağda (mavi). aci derece; 180: uçlar yer değiştirir.
     o: { olcek, boy, kalin, deltaPunto, ad (altına yazılan ad, math), aci, etiket (false: δ yok) }
     Dönen: { g, x, y, w, h, ayarla(aci), don(aci, ms), arti(), eksi() (uç noktaları), deltaG } */
  function serit(c, p, x, y, o = {}) {
    const k = o.olcek || 1, L = (o.boy || 140) * k, H = (o.kalin || 34) * k, r = H / 2, g = c.S('g', {}, p), sekil = c.S('g', {}, g);
    c.S('path', { d: `M0,${-r} H${-L / 2 + r} A${r},${r} 0 0 0 ${-L / 2 + r},${r} H0 Z`, fill: RENK.arti, 'fill-opacity': 0.92 }, sekil);
    c.S('path', { d: `M0,${-r} H${L / 2 - r} A${r},${r} 0 0 1 ${L / 2 - r},${r} H0 Z`, fill: RENK.eksi, 'fill-opacity': 0.92 }, sekil);
    const dp = o.deltaPunto || 24, ds = dp / 30;
    const dG = c.S('g', {}, g), dA = c.S('g', {}, dG), dE = c.S('g', {}, dG);
    if (o.etiket !== false) { delta(c, dA, 0, 0, '+', dp); delta(c, dE, 0, 0, '-', dp); }
    let aci = o.aci || 0;
    const uclar = () => { const ca = Math.cos(rad(aci)), sa = Math.sin(rad(aci)); return { arti: [x - (ca * L) / 2, y - (sa * L) / 2], eksi: [x + (ca * L) / 2, y + (sa * L) / 2] }; };
    const ayarla = (a) => {
      aci = a; sekil.setAttribute('transform', `translate(${x},${y}) rotate(${a})`);
      const u = uclar();
      dA.setAttribute('transform', `translate(${u.arti[0]},${u.arti[1] - r - 24 + 7 * ds})`);
      dE.setAttribute('transform', `translate(${u.eksi[0]},${u.eksi[1] - r - 24 + 7 * ds})`);
    };
    ayarla(aci);
    if (o.ad) yazi(c, g, x, y + r + 28, o.ad, { size: 22, kalin: 700, math: true });
    return {
      g, x, y, w: L / 2, h: r, deltaG: dG, ayarla, arti: () => uclar().arti, eksi: () => uclar().eksi,
      don(a, ms = 800) { const a0 = aci; return c.tween(ms, (e) => ayarla(a0 + (a - a0) * e)); },
    };
  }

  /* ---- tanecik ----
     ad: FORM anahtarı. Atom, iyon, polar ya da apolar molekül. o: { olcek, serit (polar molekül dipol şeridi olarak), harf, golge, delta, ayna, aci }
     Dönen: { g, x, y, w (yarı genişlik), h (yarı yükseklik), ad, ... (uzayDolgu ya da serit nesnesi) } */
  function tanecik(c, p, ad, x, y, o = {}) {
    const k = o.olcek || 1;
    if (ION[ad]) {
      const q = ION[ad], r = q.r * k, g = c.S('g', {}, p), size = Math.max(18, 24 * k);
      c.S('circle', { cx: x, cy: y, r, fill: RENK[q.t], 'fill-opacity': 0.92 }, g);
      yazi(c, g, x, y + size * 0.36, FORM[ad], { size, kalin: 700, renk: INK, math: true });
      return { g, x, y, w: r, h: r, ad };
    }
    if (o.serit && TUR[ad] === 'polar') {
      const s = serit(c, p, x, y, { olcek: k, boy: o.boy || 150, kalin: 36, ad: FORM[ad], aci: o.aci || 0, deltaPunto: o.deltaPunto || 24, etiket: o.etiket });
      return Object.assign(s, { ad, h: 30 * k });
    }
    const u = uzayDolgu(c, p, ad, x, y, { olcek: k, harf: o.harf, golge: o.golge, delta: o.delta, ayna: o.ayna, deltaPunto: o.deltaPunto });
    return Object.assign(u, { ad });
  }
  const yarimGenislik = (ad, o = {}) => {
    const k = o.olcek || 1;
    if (ION[ad]) return ION[ad].r * k;
    if (o.serit && TUR[ad] === 'polar') return ((o.boy || 150) * k) / 2;
    return (modelBoyu(ad).w / 2) * k;
  };

  /* İki tanecik yan yana ve aralarında yeşil kesikli çekim çizgisi. o: { olcek, bosluk (kenarlar arası), serit, ... tanecik seçenekleri, itme }
     Dönen: { g, A, B, cizgi (çizgi grubu) } */
  function cift(c, p, a, b, x, y, o = {}) {
    const k = o.olcek || 1, bosluk = (o.bosluk || 120) * k, g = c.S('g', {}, p);
    const wa = yarimGenislik(a, o), wb = yarimGenislik(b, o), top = 2 * wa + bosluk + 2 * wb;
    const xa = x - top / 2 + wa, xb = x + top / 2 - wb;
    const A = tanecik(c, g, a, xa, y, o), B = tanecik(c, g, b, xb, y, o);
    const cz = o.cizgi === false ? null : cekim(c, g, [xa + wa + 10 * k, y], [xb - wb - 10 * k, y], { w: o.cw || 4 });
    return { g, A, B, cizgi: cz, xa, xb, wa, wb };
  }
  /* Yeşil kesikli çekim çizgisi. */
  function cekim(c, p, P, Q, o = {}) {
    const g = c.S('g', {}, p);
    cizgi(c, g, P, Q, RENK.cekme, o.w || 4, { 'stroke-dasharray': o.dash || '10 8', 'stroke-linecap': 'butt' });
    return g;
  }
  /* İki ucu karşı karşıya gelen taneciklerin arasında iki kırmızı itme oku (aralarındaki orta noktadan dışa). */
  function itmeOklari(c, p, P, Q, boy = 46) {
    const g = c.S('g', {}, p), M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], a = Math.atan2(Q[1] - P[1], Q[0] - P[0]);
    ok(c, g, ileri(M, a + Math.PI, 8), ileri(M, a + Math.PI, 8 + boy), RENK.itme, 5);
    ok(c, g, ileri(M, a, 8), ileri(M, a, 8 + boy), RENK.itme, 5);
    return g;
  }

  /* ---- soy gaz atomu: çekirdek, elektronlar, bir yana yığılabilen bulut ----
     o: { r, aci (yığılma yönü, derece; 0 sağ), elektron (sayı; 0: çizilmez), ad (altına yazılan simge) }
     ayarla(s): s −1…1, bulutu aci yönünde (s>0) ya da tersine (s<0) yığar; yığılan uçta δ⁻, karşı uçta δ⁺ belirir (|s| ile saydamlık).
     Dönen: { g, x, y, w, h, ayarla, git(s, ms), deltaG } */
  function bulutAtom(c, p, x, y, o = {}) {
    const r = o.r || 78, g = c.S('g', {}, p), aci = rad(o.aci || 0), dx = Math.cos(aci), dy = Math.sin(aci);
    c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: RENK.eksi, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, g);
    const kat = [[r, 0, 0.1], [r * 0.66, 0.3, 0.15], [r * 0.38, 0.58, 0.2]].map(([rr, kay, op]) => ({ kay, el: c.S('circle', { r: rr, fill: RENK.eksi, 'fill-opacity': op }, g) }));
    const cek = yuk(c, g, [x, y], 'arti', 15);
    const n = o.elektron == null ? 2 : o.elektron, TB = [[-0.36, -0.26], [0.3, 0.3], [-0.2, 0.42], [0.34, -0.34]];
    const els = TB.slice(0, n).map((q) => ({ q, e: yuk(c, g, [x, y], 'eksi', 9) }));
    const dG = c.S('g', {}, g), dEksi = c.S('g', {}, dG), dArti = c.S('g', {}, dG), dp = o.deltaPunto || 26, ds = dp / 30;
    delta(c, dEksi, 0, 0, '-', dp); delta(c, dArti, 0, 0, '+', dp);
    if (o.ad) yazi(c, g, x, y + r + 34, o.ad, { size: 24, kalin: 700, math: true });
    let s = 0, eAc = o.etiket !== false;
    const ayarla = (v) => {
      s = v;
      kat.forEach((q) => { q.el.setAttribute('cx', x + dx * s * r * q.kay); q.el.setAttribute('cy', y + dy * s * r * q.kay); });
      els.forEach((q) => q.e.tasi([x + q.q[0] * r + dx * s * r * 0.4, y + q.q[1] * r + dy * s * r * 0.4]));
      const yon = s >= 0 ? 1 : -1, uzak = r + 40, a = Math.min(1, Math.abs(s) * 2);
      dEksi.setAttribute('transform', `translate(${x + dx * yon * uzak},${y + dy * yon * uzak + 7 * ds})`);
      dArti.setAttribute('transform', `translate(${x - dx * yon * uzak},${y - dy * yon * uzak + 7 * ds})`);
      dG.style.opacity = eAc ? a : 0;
    };
    ayarla(0);
    return { g, x, y, w: r, h: r, ayarla, deltaG: dG, etiketAc(v, ms = 500) { eAc = v; const t = Math.min(1, Math.abs(s) * 2); return c.tween(ms, (e) => { dG.style.opacity = v ? t * e : t * (1 - e); }); }, git(v, ms = 900) { const s0 = s; return c.tween(ms, (e) => ayarla(s0 + (v - s0) * e)); } };
  }

  /* ---- Lewis yapıları ----
     a: [sembol, x, y]; b: [i, j, ortaklanmış çift sayısı]; c: atom sırası → ortaklanmamış çiftlerin açıları (derece; 0 sağ, 90 aşağı, −90 yukarı). Her çift iki nokta. */
  const sagC = [-90, 90, 0], solC = [-90, 90, 180];
  const LEWIS = {
    H2: { a: [['H', 0, 0], ['H', 1, 0]], b: [[0, 1, 1]], c: {} },
    F2: { a: [['F', 0, 0], ['F', 1, 0]], b: [[0, 1, 1]], c: { 0: solC, 1: sagC } },
    HF: { a: [['H', 0, 0], ['F', 1, 0]], b: [[0, 1, 1]], c: { 1: sagC } },
    HCl: { a: [['H', 0, 0], ['Cl', 1, 0]], b: [[0, 1, 1]], c: { 1: sagC } },
    H2O: { a: [['O', 0, 0], ['H', -1, 0], ['H', 1, 0]], b: [[0, 1, 1], [0, 2, 1]], c: { 0: [-90, 90] } },
    H2S: { a: [['S', 0, 0], ['H', -1, 0], ['H', 1, 0]], b: [[0, 1, 1], [0, 2, 1]], c: { 0: [-90, 90] } },
    NH3: { a: [['N', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], c: { 0: [-90] } },
    CH4: { a: [['C', 0, 0], ['H', -1, 0], ['H', 1, 0], ['H', 0, -1], ['H', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], c: {} },
    CO2: { a: [['C', 0, 0], ['O', -1, 0], ['O', 1, 0]], b: [[0, 1, 2], [0, 2, 2]], c: { 1: [-90, 90], 2: [-90, 90] } },
    CF4: { a: [['C', 0, 0], ['F', -1, 0], ['F', 1, 0], ['F', 0, -1], ['F', 0, 1]], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], c: { 1: solC, 2: sagC, 3: [180, 0, -90], 4: [180, 0, 90] } },
  };
  /* o: { olcek, d (bağ boyu), size (sembol puntosu), merkez (halka), soluk: [atom sıraları], vurgu (true: H'nin bağlı olduğu atomlar halkalanır, F–H, O–H, N–H bağları kalın çerçevelenir) }
     Dönen: { g, P, harf, cift, bag, halkalar, cerceveler } */
  function lewis(c, p, ad, cx, cy, o = {}) {
    const t = LEWIS[ad], k = o.olcek || 1, D = (o.d || 90) * k, boy = (o.size || 34) * k;
    const xs = t.a.map((a) => a[1]), ys = t.a.map((a) => a[2]);
    const ox = cx - ((Math.min(...xs) + Math.max(...xs)) / 2) * D, oy = cy - ((Math.min(...ys) + Math.max(...ys)) / 2) * D;
    const g = c.S('g', {}, p), gBag = c.S('g', {}, g), gHarf = c.S('g', {}, g), gVurgu = c.S('g', {}, g);
    const P = t.a.map((a) => [ox + a[1] * D, oy + a[2] * D]);
    const nokta = (grup, x, y) => c.S('circle', { cx: x, cy: y, r: Math.max(3.4, 4.4 * k), fill: RENK.eksi }, grup);
    const yarim = (s, a) => {
      const w = (s.length === 1 ? 0.34 : 0.58) * boy, h = 0.4 * boy;
      return 1 / Math.sqrt((Math.cos(a) / w) ** 2 + (Math.sin(a) / h) ** 2) + 11 * k;
    };
    const harf = t.a.map((a, i) => yazi(c, gHarf, P[i][0], P[i][1] + boy * 0.36, a[0], { size: boy, kalin: 700 }));
    const cerceveler = [], halkalar = [], bagGeo = [];
    t.b.forEach(([i, j, n]) => {
      const a = Math.atan2(P[j][1] - P[i][1], P[j][0] - P[i][0]), M = [(P[i][0] + P[j][0]) / 2, (P[i][1] + P[j][1]) / 2];
      bagGeo.push([i, j, M, a]);
      for (let m = 0; m < n; m++) {
        const off = (m - (n - 1) / 2) * 17 * k, q = ileri(M, a, off);
        const kg = c.S('g', { transform: `translate(${q[0]},${q[1]}) rotate(${(a * 180) / Math.PI})` }, gBag);
        c.S('rect', { x: -8 * k, y: -15 * k, width: 16 * k, height: 30 * k, rx: 8 * k, fill: RENK.eksi, 'fill-opacity': 0.14, stroke: RENK.eksi, 'stroke-opacity': 0.6, 'stroke-width': 1.5 }, kg);
        nokta(kg, 0, -6.5 * k); nokta(kg, 0, 6.5 * k);
      }
    });
    const cift = t.a.map(() => null);
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
    if (o.vurgu) {
      const H = (i) => t.a[i][0] === 'H', ONF = ['F', 'O', 'N'], halka = new Set();
      bagGeo.forEach(([i, j, M, a]) => {
        if (H(i) || H(j)) { halka.add(H(i) && !H(j) ? j : H(j) && !H(i) ? i : i); if (H(i) && H(j)) halka.add(j); }
        const x = H(i) ? j : H(j) ? i : -1;
        if ((H(i) !== H(j)) && ONF.includes(t.a[x][0])) {
          const kg = c.S('g', { transform: `translate(${M[0]},${M[1]}) rotate(${(a * 180) / Math.PI})` }, gVurgu);
          cerceveler.push(c.S('rect', { x: -13 * k, y: -21 * k, width: 26 * k, height: 42 * k, rx: 13 * k, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.4 }, kg));
        }
      });
      halka.forEach((i) => halkalar.push(c.S('circle', { cx: P[i][0], cy: P[i][1], r: boy * 0.78, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 2.4, 'stroke-dasharray': '5 5' }, gVurgu)));
    }
    if (o.merkez != null) halkalar.push(c.S('circle', { cx: P[o.merkez][0], cy: P[o.merkez][1], r: boy * 0.78, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.2 }, gVurgu));
    const xr = Math.max(...P.map((q) => q[0])) + boy, xl = Math.min(...P.map((q) => q[0])) - boy;
    return { g, P, harf, cift, bag: gBag, halkalar, cerceveler, boy, w: (xr - xl) / 2, h: (Math.max(...P.map((q) => q[1])) - Math.min(...P.map((q) => q[1])) + 2 * boy) / 2 };
  }

  /* ---- kart başına seçimle sınıflama tahtası ----
     o: { kutular: [{ x, y, w, h, baslik, kol, ust, satir, punto }], kart: { x, y }, ciz(k, g) (kartın çizimi), fY (formül y'si, karta göre), kartPunto, chipPunto }
     k.f: kart adı (math). sec(i, k): kartı öne çıkarır; yerlestir(i, k): kartın adı kutusuna küçülerek yerleşir. */
  function kartTahtasi(c, p, o) {
    const kutularEl = o.kutular.map((q) => {
      const g = c.S('g', {}, p);
      kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      if (q.baslik) yazi(c, g, q.x + q.w / 2, q.y + 34, q.baslik, { size: q.punto || 24, kalin: 700, renk: q.renk || RENK.yazi });
      return { g, n: 0 };
    });
    let kartG = null, chip = null;
    const kp = o.kartPunto || 32;
    return {
      kutularEl,
      async sec(i, k) {
        kartG = c.S('g', {}, p); gizle(kartG);
        if (o.ciz) o.ciz(k, kartG);
        chip = yazi(c, kartG, o.kart.x, o.kart.y + (o.fY == null ? 96 : o.fY), k.f, { size: kp, kalin: 700, math: true });
        await belir(c, kartG, 350);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kutularEl[k.kutu], kol = q.kol || 2, cw = q.w / kol, sat = Math.floor(e.n / kol), sut = e.n % kol;
        const hx = q.x + cw * (sut + 0.5), hy = q.y + (q.ust || 84) + sat * (q.satir || 42);
        e.n++;
        const x0 = o.kart.x, y0 = o.kart.y + (o.fY == null ? 96 : o.fY), ch2 = yazi(c, p, x0, y0, k.f, { size: kp, kalin: 700, math: true });
        const yAra = q.y - (o.ara == null ? 16 : o.ara);
        chip.style.opacity = 0;
        await c.tween(250, (e2) => { [...kartG.children].forEach((x) => { if (x !== chip) x.style.opacity = 1 - e2; }); });
        kartG.remove();
        // Önce kutunun üstüne süzülür (boş şeritte), sonra kendi yerinde belirir: yazılar hiçbir anda üst üste binmez.
        await c.tween(450, (e2) => { ch2.setAttribute('x', x0 + (hx - x0) * e2); ch2.setAttribute('y', y0 + (yAra - y0) * e2); ch2.setAttribute('font-size', kp + ((o.chipPunto || 22) - kp) * e2); });
        const son = yazi(c, p, hx, hy, k.f, { size: o.chipPunto || 22, kalin: 700, math: true }); gizle(son);
        await c.tween(300, (e2) => { ch2.style.opacity = 1 - e2; son.style.opacity = e2; });
        ch2.remove();
        return son;
      },
    };
  }

  /* ---- iki sütunlu seçmeli tablo: sol sütun madde çifti, sağ sütun etkileşim (başta boş) ----
     o: { x, y, w, satir (satır yüksekliği), sol (sol sütun genişliği), puntoSol, puntoSag }
     satirlar: [math metin]. Dönen: { g, doldur(i, metin), soluk(bas, son, a), satirG: [grup] } */
  function maddeTablosu(c, p, satirlar, o = {}) {
    const g = c.S('g', {}, p), x = o.x == null ? 30 : o.x, y = o.y == null ? 40 : o.y, w = o.w || 560, sh = o.satir || 40, solW = o.sol || 190;
    const satirG = satirlar.map((metin, i) => {
      const sg = c.S('g', {}, g), yy = y + i * sh;
      c.S('rect', { x, y: yy, width: w, height: sh - 4, rx: 8, fill: i % 2 ? '#141c37' : RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 1 }, sg);
      yazi(c, sg, x + solW / 2, yy + sh / 2 + 6, metin, { size: o.puntoSol || 22, kalin: 700, math: true });
      return sg;
    });
    const sonuc = [];
    return {
      g, satirG,
      doldur(i, metin) {
        const t = yazi(c, satirG[i], x + solW + (w - solW) / 2, y + i * sh + sh / 2 + 6, metin, { size: o.puntoSag || 20, kalin: 700, renk: RENK.vurgu });
        sonuc[i] = t; gizle(t); return belir(c, t, 350);
      },
      soluk(bas, son, a, ms = 400) { return belir(c, satirG.slice(bas, son), ms, a); },
    };
  }

  /* ---- üçgen tablo: beş etkileşimin adı ----
     Satır ve sütun başlıkları: polar · iyon · apolar/soy gaz. Hücreler: pp, pi, pa, ii, ia, aa (ii: "—").
     o: { x, y, w, h (hücre), ad: false → hücre adları başta yazılmaz }
     Dönen: { g, hucre: { pp, pi, pa, ii, ia, aa }: { g, yaz() }, baslik }. */
  function matris5(c, p, o = {}) {
    const x0 = o.x == null ? 200 : o.x, y0 = o.y == null ? 150 : o.y, cw = o.w || 250, chh = o.h || 100, g = c.S('g', {}, p), ikonG = c.S('g', {}, g);
    const BAS = [['polar'], ['iyon'], ['apolar', 'soy gaz']];
    const ikon = (i, x, y) => {
      if (i === 0) serit(c, ikonG, x, y, { boy: 62, kalin: 22, etiket: false });
      else if (i === 1) { yuk(c, ikonG, [x - 18, y], 'arti', 14); yuk(c, ikonG, [x + 18, y], 'eksi', 14); } else c.S('circle', { cx: x, cy: y, r: 16, fill: '#c9c9c9', stroke: '#4d4d4d', 'stroke-width': 1.6 }, ikonG);
    };
    const baslik = [];
    BAS.forEach((b, i) => {
      const bx = x0 + cw * (i + 0.5), by = y0 - 70;
      ikon(i, bx, by - 12);
      b.forEach((s, j) => baslik.push(yazi(c, g, bx, by + 24 + j * 24, s, { size: 22, kalin: 700 })));
      const ry = y0 + chh * (i + 0.5), rx = x0 - 70;
      ikon(i, rx, ry - 16);

    });
    const AD = { pp: ['dipol-dipol'], pi: ['iyon-dipol'], pa: ['dipol-', 'indüklenmiş dipol'], ii: ['—'], ia: ['iyon-', 'indüklenmiş dipol'], aa: ['indüklenmiş dipol-', 'indüklenmiş dipol', '(London)'] };
    const hucre = {};
    Object.keys(AD).forEach((id) => {
      const cg = c.S('g', {}, g);
      const col = { pp: 0, pi: 1, pa: 2, ii: 1, ia: 2, aa: 2 }[id], row = { pp: 0, pi: 0, pa: 0, ii: 1, ia: 1, aa: 2 }[id];
      const bx = x0 + cw * col, by = y0 + chh * row;
      c.S('rect', { x: bx + 4, y: by + 4, width: cw - 8, height: chh - 8, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, cg);
      const n = AD[id].length, t = AD[id].map((s, j) => yazi(c, cg, bx + cw / 2, by + chh / 2 + 7 + (j - (n - 1) / 2) * 26, s, { size: id === 'aa' ? 20 : 22, kalin: 700, renk: id === 'ii' ? RENK.soluk : RENK.yazi }));
      if (o.ad === false) gizle(t);
      hucre[id] = { g: cg, yaz: () => belir(c, t, 400), yazi: t };
    });
    return { g, hucre, baslik, ikonG };
  }

  /* ---- hidrojen bağı zinciri ----
     Üç su molekülü köşegen bir zincirde: her H·O çubuk ve küre; molekül içi O–H düz açık çizgi, komşu moleküller arası O···H yeşil kesikli.
     o: { olcek, aci (zincir yönü, derece), delta (false: δ etiketi yok) }
     Dönen: { g, mol: [{ g, O: [x,y], H1, H2 }], hb: [yeşil çizgi grupları], ic: [molekül içi çizgiler], deltaG } */
  function hidrojenBagiZinciri(c, p, x0, y0, o = {}) {
    const s = o.olcek || 1, L = 78 * s, HB = 122 * s, a1 = rad(o.aci == null ? -28 : o.aci), a2 = a1 + rad(105);
    const g = c.S('g', {}, p), icG = c.S('g', {}, g), hbG = c.S('g', {}, g), kG = c.S('g', {}, g), dG = c.S('g', {}, g);
    const mol = [], hb = [], ic = [];
    let O = [x0, y0];
    for (let i = 0; i < 3; i++) {
      const H1 = ileri(O, a1, L), H2 = ileri(O, a2, L);
      mol.push({ O, H1, H2 });
      O = ileri(H1, a1, HB);
    }
    mol.forEach((m) => {
      [m.H1, m.H2].forEach((H) => ic.push(cizgi(c, icG, m.O, H, RENK.cizgi, 7 * s)));
    });
    mol.forEach((m, i) => { if (i < 2) hb.push(cekim(c, hbG, ileri(m.H1, a1, 24 * s), ileri(mol[i + 1].O, a1, -34 * s), { w: 5 })); });
    mol.forEach((m) => {
      c.S('circle', { cx: m.O[0], cy: m.O[1], r: 32 * s, fill: '#bdbdbd', stroke: '#4d4d4d', 'stroke-width': 1.6 }, kG);
      c.S('circle', { cx: m.O[0], cy: m.O[1], r: 31 * s, fill: RENK.eksi, 'fill-opacity': 0.55 }, kG);
      if (o.harf !== false) yazi(c, kG, m.O[0], m.O[1] + 8 * s, 'O', { size: 26 * s, kalin: 700, renk: INK });
      [m.H1, m.H2].forEach((H) => {
        c.S('circle', { cx: H[0], cy: H[1], r: 21 * s, fill: '#e6e6e6', stroke: '#4d4d4d', 'stroke-width': 1.6 }, kG);
        if (o.harf !== false) yazi(c, kG, H[0], H[1] + 7 * s, 'H', { size: 20 * s, kalin: 700, renk: INK });
      });
      if (o.delta !== false) {
        delta(c, dG, m.O[0] - Math.cos(a1 + 1.0) * 62 * s - 4, m.O[1] - Math.sin(a1 + 1.0) * 62 * s + 8, '-', 22);
        [m.H1, m.H2].forEach((H, j) => { const ag = j ? a2 + 0.5 : a1 - 0.7; delta(c, dG, H[0] + Math.cos(ag) * 52 * s, H[1] + Math.sin(ag) * 44 * s + 8, '+', 22); });
      }
    });
    return { g, mol, hb, ic, deltaG: dG, hbG, icG, kG };
  }

  /* ---- DNA merdiveni ----
     İki dikey zincir (şeker ve fosfat), basamaklarda bazlar. bazlar: [['A','T'], …]. Bazlar renkli dikdörtgendir; çiftler arasında yeşil kesikli hidrojen bağları
     (A–T iki, G–C üç çizgi). o: { x, y, w (zincirler arası), h, adim }
     Dönen: { g, zincir: [sol, sağ], bazlar: [{ sol, sag, hb }], hb: [grup] } */
  const BAZ = { A: '#c792ff', T: '#f4d35e', G: '#3cc8e8', C: '#e58bb8' };
  function baz(c, p, harf, x, y, w, h, size = 24) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 7, fill: BAZ[harf] }, g);
    yazi(c, g, x, y + size * 0.36, harf, { size, kalin: 700, renk: INK });
    return g;
  }
  function hbCiftBaz(c, p, x1, x2, y, harf1, n) {
    const g = c.S('g', {}, p), sh = n === 3 ? 12 : 9;
    for (let i = 0; i < n; i++) cizgi(c, g, [x1, y + (i - (n - 1) / 2) * sh], [x2, y + (i - (n - 1) / 2) * sh], RENK.cekme, 3.4, { 'stroke-dasharray': '6 5', 'stroke-linecap': 'butt' });
    return g;
  }
  function dnaMerdiven(c, p, bazlar, o = {}) {
    const x = o.x == null ? 250 : o.x, y = o.y == null ? 60 : o.y, w = o.w || 190, h = o.h || 440, n = bazlar.length, adim = h / n, g = c.S('g', {}, p);
    const zG = c.S('g', {}, g), bG = c.S('g', {}, g), hG = c.S('g', {}, g);
    const dalga = (yy, faz) => 12 * Math.sin(yy / 38 + faz);
    const yol = (sx, faz) => { let d = ''; for (let yy = y; yy <= y + h + 0.1; yy += 8) d += (yy === y ? 'M' : 'L') + (sx + dalga(yy, faz)) + ',' + yy + ' '; return d; };
    const sol = c.S('path', { d: yol(x - w / 2, 0), fill: 'none', stroke: RENK.metal, 'stroke-width': 11, 'stroke-linecap': 'round' }, zG);
    const sag = c.S('path', { d: yol(x + w / 2, 0), fill: 'none', stroke: RENK.metal, 'stroke-width': 11, 'stroke-linecap': 'round' }, zG);
    const bw = 46, bh = 34, hb = [], bl = [];
    bazlar.forEach(([a, b], i) => {
      const yy = y + adim * (i + 0.5), xl = x - w / 2 + dalga(yy, 0), xr = x + w / 2 + dalga(yy, 0);
      cizgi(c, bG, [xl, yy], [xl + 12, yy], RENK.metal, 6);
      const A = baz(c, bG, a, xl + 12 + bw / 2, yy, bw, bh), B = baz(c, bG, b, xr - 12 - bw / 2, yy, bw, bh);
      cizgi(c, bG, [xr - 12, yy], [xr, yy], RENK.metal, 6);
      const hh = hbCiftBaz(c, hG, xl + 12 + bw + 2, xr - 12 - bw - 2, yy, a, a === 'A' || a === 'T' ? 2 : 3);
      hb.push(hh); bl.push({ sol: A, sag: B, hb: hh });
    });
    return { g, zincir: [sol, sag], zG, bG, hG, bazlar: bl, hb };
  }
  /* Tek baz çifti, büyük: A–T ya da G–C. Dönen: { g, hb } */
  function bazCifti(c, p, a, b, x, y, w = 260) {
    const g = c.S('g', {}, p), bw = 64, bh = 50, n = a === 'A' || a === 'T' ? 2 : 3;
    baz(c, g, a, x - w / 2 + bw / 2, y, bw, bh, 30); baz(c, g, b, x + w / 2 - bw / 2, y, bw, bh, 30);
    const hb = hbCiftBaz(c, g, x - w / 2 + bw + 4, x + w / 2 - bw - 4, y, a, n);
    return { g, hb };
  }

  /* ---- gecko: siluet, ayak, tüycükler, tüycük ucu ----
     Üç çerçeve soldan sağa: 1 gecko (düşey bir yüzeyde), 2 ayağın altı (tüycükler), 3 tüycük ucu ve yüzey molekülleri.
     Dönen: { g, f: [çerçeve grupları], gecko, ayak, tuy, uc, mol, ince: [yeşil ince çizgiler], kalin (kalın ok ve yazı grubu), zoom: [bağlantı çizgileri] } */
  function geckoAyak(c, p) {
    const g = c.S('g', {}, p), FR = [[20, 70, 300, 380], [350, 70, 300, 380], [680, 70, 300, 380]];
    const f = FR.map(([x, y, w, h]) => { const q = c.S('g', {}, g); kutu(c, q, x, y, w, h, { rx: 14 }); return q; });
    // 1. çerçeve: düşey yüzey (cam) ve gecko
    const G1 = c.S('g', {}, g);
    cizgi(c, G1, [292, 90], [292, 430], RENK.cizgi, 6);
    for (let i = 0; i < 6; i++) cizgi(c, G1, [292, 110 + i * 56], [304, 100 + i * 56], RENK.ince, 3);
    const govde = '#8f9bc4', ayakM = [];
    c.S('ellipse', { cx: 172, cy: 262, rx: 34, ry: 86, fill: govde }, G1);
    c.S('ellipse', { cx: 172, cy: 168, rx: 26, ry: 34, fill: govde }, G1);
    c.S('path', { d: 'M172,346 C176,390 150,410 130,424', fill: 'none', stroke: govde, 'stroke-width': 16, 'stroke-linecap': 'round' }, G1);
    [[148, 214, 112, 180, 92, 192], [196, 214, 246, 190, 270, 200], [148, 300, 112, 330, 92, 322], [196, 300, 240, 332, 266, 326]].forEach(([x1, y1, x2, y2, x3, y3]) => {
      c.S('path', { d: `M${x1},${y1} L${x2},${y2} L${x3},${y3}`, fill: 'none', stroke: govde, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, G1);
      ayakM.push([x3, y3]);
    });
    const odak = c.S('circle', { cx: ayakM[1][0], cy: ayakM[1][1], r: 20, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.4 }, G1);
    // 2. çerçeve: ayak tabanı ve tüycükler
    const G2 = c.S('g', {}, g), tuy = [];
    c.S('rect', { x: 380, y: 100, width: 240, height: 54, rx: 20, fill: govde }, G2);
    cizgi(c, G2, [370, 372], [630, 372], RENK.cizgi, 6);
    for (let i = 0; i < 17; i++) { const tx = 394 + i * 14.2; tuy.push(cizgi(c, G2, [tx, 154], [tx + (i - 8) * 0.7, 366], '#a9b3d6', 3.2)); }
    // 3. çerçeve: tüycük ucu ve yüzey molekülleri
    const G3 = c.S('g', {}, g), ince = [], mol = [];
    cizgi(c, G3, [790, 90], [790, 190], '#a9b3d6', 12);
    const uclar = [[750, 232], [770, 244], [790, 248], [810, 244], [830, 232]];
    uclar.forEach(([ux, uy]) => cizgi(c, G3, [790, 188], [ux, uy], '#a9b3d6', 5));
    for (let i = 0; i < 7; i++) { const mx = 706 + i * 44; mol.push(c.S('circle', { cx: mx, cy: 398, r: 17, fill: '#bdbdbd', stroke: '#4d4d4d', 'stroke-width': 1.6 }, G3)); }
    const hat = c.S('g', {}, G3);
    uclar.forEach(([ux, uy], i) => [0, 1].forEach((d) => {
      const mi = Math.max(0, Math.min(6, 1 + i + d));
      ince.push(cizgi(c, hat, [ux, uy + 10], [706 + mi * 44, 378], RENK.cekme, 2.6, { 'stroke-dasharray': '5 5', 'stroke-linecap': 'butt' }));
    }));
    const kalin = c.S('g', {}, g);
    ok(c, kalin, [790, 262], [790, 364], RENK.cekme, 9);
    const zoom = [cizgi(c, g, [ayakM[1][0] + 20, ayakM[1][1]], [350, 160], RENK.vurgu, 2, { 'stroke-dasharray': '4 6' }), cizgi(c, g, [630, 372], [680, 260], RENK.vurgu, 2, { 'stroke-dasharray': '4 6' })];
    return { g, f, gecko: G1, odak, ayak: G2, tuy, uc: G3, mol, ince, hat, kalin, zoom, yaz: { x: 790, y: 330 } };
  }

  /* ---- bir bardak su ve büyütülmüş su molekülleri ----
     Dönen: { g, bardak, buyutme, mol, cekim: [yeşil ince çizgiler], bag (kalın bağ örneği), cek (ince çekim örneği) } */
  function bardakSu(c, p) {
    const g = c.S('g', {}, p), bardak = c.S('g', {}, g);
    c.S('path', { d: 'M80,150 L260,150 L240,420 Q238,440 218,440 L122,440 Q102,440 100,420 Z', fill: '#2a3560', 'fill-opacity': 0.5, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linejoin': 'round' }, bardak);
    c.S('path', { d: 'M88,210 L252,210 L240,420 Q238,440 218,440 L122,440 Q102,440 100,420 Z', fill: RENK.ince, 'fill-opacity': 0.35 }, bardak);
    const buy = c.S('g', {}, g), cx = 600, cy = 270, R = 160;
    c.S('circle', { cx, cy, r: R, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, buy);
    cizgi(c, buy, [250, 270], [cx - R, cy - 40], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    cizgi(c, buy, [250, 330], [cx - R, cy + 40], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    const yer = [[cx - 70, cy - 70, -20], [cx + 62, cy - 84, 40], [cx + 96, cy + 20, 120], [cx + 18, cy + 18, 200], [cx - 90, cy + 48, 80], [cx - 6, cy + 106, 300]];
    const mol = yer.map(([x, y, a]) => {
      const m = c.S('g', {}, buy), A = rad(a), H1 = ileri([x, y], A, 38), H2 = ileri([x, y], A + rad(105), 38);
      cizgi(c, m, [x, y], H1, RENK.cizgi, 5); cizgi(c, m, [x, y], H2, RENK.cizgi, 5);
      c.S('circle', { cx: x, cy: y, r: 20, fill: '#bdbdbd', stroke: '#4d4d4d', 'stroke-width': 1.4 }, m);
      [H1, H2].forEach((H) => c.S('circle', { cx: H[0], cy: H[1], r: 12, fill: '#e6e6e6', stroke: '#4d4d4d', 'stroke-width': 1.2 }, m));
      return [x, y];
    });
    const cekimG = c.S('g', {}, buy), cek = [];
    [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [0, 4], [1, 2], [2, 5]].forEach(([i, j]) => cek.push(cekim(c, cekimG, ileri(mol[i], Math.atan2(mol[j][1] - mol[i][1], mol[j][0] - mol[i][0]), 30), ileri(mol[j], Math.atan2(mol[i][1] - mol[j][1], mol[i][0] - mol[j][0]), 30), { w: 3, dash: '6 6' })));
    const ornek = c.S('g', {}, g);
    cizgi(c, ornek, [800, 150], [900, 150], RENK.cizgi, 9);
    cizgi(c, ornek, [800, 360], [900, 360], RENK.cekme, 4, { 'stroke-dasharray': '10 8', 'stroke-linecap': 'butt' });
    return { g, bardak, buyutme: buy, mol, cekim: cekimG, cek, ornek, bagY: 150, cekY: 360, ornekX: 850 };
  }

  /* ---- kapalı kart: çevrilince ön yüzü açılır ----
     ciz(g): ön yüzün içeriği. Dönen: { g, on, cevir(ms) } */
  function kartCevir(c, p, x, y, w, h, no, ciz) {
    const g = c.S('g', {}, p), cx = x + w / 2, arka = c.S('g', {}, g), on = c.S('g', {}, g);
    kutu(c, arka, x, y, w, h, { rx: 14 }); yazi(c, arka, cx, y + h / 2 + 22, no, { size: 64, kalin: 700, renk: RENK.vurgu });
    kutu(c, on, x, y, w, h, { rx: 14 }); ciz(on); on.style.opacity = 0;
    const sx = (v) => g.setAttribute('transform', `translate(${cx},0) scale(${v},1) translate(${-cx},0)`);
    return {
      g, on,
      async cevir(ms = 700) {
        await c.tween(ms / 2, (e) => sx(1 - e)); arka.style.opacity = 0; on.style.opacity = 1;
        await c.tween(ms / 2, (e) => sx(e));
      },
    };
  }

  return {
    RENK, B, Gz, kartCevir, FORM, html, TUR, cf, ch, ION, KURE, MODEL, DLT, golgeOf, modelBoyu, delta, uzayDolgu, serit, tanecik, yarimGenislik, cift, cekim, itmeOklari,
    bulutAtom, LEWIS, lewis, kartTahtasi, maddeTablosu, matris5, hidrojenBagiZinciri, dnaMerdiven, bazCifti, baz, BAZ, geckoAyak, bardakSu,
  };
})();
