/* Bölüm C — Sayı kümeleri: "Matruşka Sayılar" (kısa dersler C1–C5; plan/matematik/sayilar/senaryolar/C-sayi-kumeleri.md)
   Tüm hesaplar (kesirler, uzun bölme, kapalılık sonuçları) koddan, tamsayı aritmetiğiyle üretilir. */
(function () {
  'use strict';
  const { h, ease, lerp, clamp, M } = Ders;
  const mathText = Ders.mathText;
  const SCENES = [];
  const par = (...p) => Promise.all(p);

  /* ================= SVG yardımcıları ================= */
  const E = (tag, a, p) => { const o = {}; for (const k in (a || {})) if (a[k] != null) o[k] = a[k]; return Ders.s(tag, o, p); };
  const MINUS = '−';
  const COLV = { N: 'var(--n)', Z: 'var(--z)', Q: 'var(--q)', R: 'var(--r)', Qp: 'var(--irr)' };
  const LET = { N: 'N', Z: 'Z', Q: 'Q', R: 'R', Qp: 'Q′' };
  const NAMES = { R: 'Gerçek', Q: 'Rasyonel', Z: 'Tam sayı', N: 'Doğal' };
  const KEYS = ['R', 'Q', 'Z', 'N'];
  const MUTED = 'var(--muted)';

  function T(p, x, y, str, size, fill, o = {}) {
    const t = E('text', { x, y, 'font-size': size, 'text-anchor': o.anchor || 'middle', 'dominant-baseline': 'central' }, p);
    if (o.math) mathText(t, str); else t.textContent = str;
    t.style.fill = fill || 'var(--ink)';
    if (o.bold) t.style.fontWeight = o.bold === true ? 700 : o.bold;
    if (o.mono) t.style.fontFamily = 'var(--mono)';
    if (o.op != null) t.setAttribute('opacity', o.op);
    t.style.pointerEvents = 'none'; t.style.whiteSpace = 'pre';
    return t;
  }
  /* grup: _p = {x,y,s,r} dönüşüm durumu */
  function G(p, x = 0, y = 0, attrs) {
    const g = E('g', attrs, p); g._p = { x, y, s: 1, r: 0 }; place(g); return g;
  }
  function place(g) { const q = g._p; g.setAttribute('transform', `translate(${q.x} ${q.y})${q.r ? ` rotate(${q.r})` : ''}${q.s !== 1 ? ` scale(${q.s})` : ''}`); }
  function put(g, o) { Object.assign(g._p, o); place(g); }
  const op = (el, v) => el.setAttribute('opacity', v);
  const getOp = (el) => { const v = el.getAttribute('opacity'); return v == null ? 1 : +v; };

  function mv(c, g, x, y, ms = 800, e, extra = {}) {
    const a = { ...g._p }; const to = { s: extra.s != null ? extra.s : a.s, r: extra.r != null ? extra.r : a.r };
    return c.tween(ms, (k) => put(g, { x: lerp(a.x, x, k), y: lerp(a.y, y, k), s: lerp(a.s, to.s, k), r: lerp(a.r, to.r, k) }), e);
  }
  function fade(c, el, to, ms = 500, e) {
    const from = getOp(el);
    return c.tween(ms, (k) => el.setAttribute('opacity', lerp(from, to, k)), e);
  }
  function fadeAll(c, els, to, ms = 500) { return par(...els.map((el) => fade(c, el, to, ms))); }
  function pop(c, g, s = 1, ms = 420) {
    op(g, 1); put(g, { s: 0.001 });
    return c.tween(ms, (k) => put(g, { s: Math.max(0.001, k * s) }), ease.back);
  }
  /* kalem gibi çizim: pathLength=1 hilesi */
  function drawIn(c, el, ms = 700, e) {
    el.setAttribute('pathLength', 1); el.setAttribute('stroke-dasharray', '1 1'); el.setAttribute('stroke-dashoffset', 1); op(el, 1);
    return c.tween(ms, (k) => el.setAttribute('stroke-dashoffset', 1 - k), e).then(() => { el.removeAttribute('stroke-dasharray'); el.removeAttribute('stroke-dashoffset'); });
  }
  const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('unhandledrejection', (e) => { if (e.reason instanceof Ders.Cancelled) e.preventDefault(); });
  function shake(c, g, amp = 7, ms = 320) {
    if (REDUCED) return c.wait(60);
    return c.tween(ms, (k) => g.setAttribute('transform', `translate(${(Math.sin(k * 28) * amp * (1 - k)).toFixed(2)} 0)`), ease.linear).then(() => g.removeAttribute('transform'));
  }
  function icon(p, kind, x, y, sz = 1, col) {
    const g = G(p, x, y); g._p.s = sz; place(g);
    const c0 = col || (kind === 'ok' ? 'var(--ok)' : 'var(--err)');
    if (kind === 'ok') E('path', { d: 'M-12,1 L-4,10 L13,-10', fill: 'none', stroke: c0, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    else E('path', { d: 'M-10,-10 L10,10 M10,-10 L-10,10', fill: 'none', stroke: c0, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    return g;
  }
  function card(p, x, y, w, hh, o = {}) {
    return E('rect', { x, y, width: w, height: hh, rx: o.rx != null ? o.rx : 18, fill: o.fill || 'url(#pg)', stroke: o.stroke || 'var(--line)', 'stroke-width': o.sw || 2, filter: o.shadow === false ? null : 'url(#sh)' }, p);
  }
  function arrow(p, x1, y1, x2, y2, col = 'ink', w = 4) {
    return E('line', { x1, y1, x2, y2, stroke: `var(--${col === 'ink' ? 'ink' : col})`, 'stroke-width': w, 'stroke-linecap': 'round', 'marker-end': `url(#ar-${col})` }, p);
  }
  function defs(svg) {
    const d = E('defs', {}, svg);
    const grad = (id, col, a0, a1) => {
      const lg = E('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, d);
      E('stop', { offset: 0, style: `stop-color:${col};stop-opacity:${a0}` }, lg);
      E('stop', { offset: 1, style: `stop-color:${col};stop-opacity:${a1}` }, lg);
    };
    grad('gr-R', 'var(--r)', 0.16, 0.06); grad('gr-Q', 'var(--q)', 0.19, 0.08);
    grad('gr-Z', 'var(--z)', 0.21, 0.09); grad('gr-N', 'var(--n)', 0.25, 0.1); grad('gr-Qp', 'var(--irr)', 0.2, 0.08);
    const pg = E('linearGradient', { id: 'pg', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
    E('stop', { offset: 0, style: 'stop-color:#1c2759' }, pg); E('stop', { offset: 1, style: 'stop-color:#111936' }, pg);
    const pg2 = E('linearGradient', { id: 'pg2', x1: 0, y1: 0, x2: 0, y2: 1 }, d);
    E('stop', { offset: 0, style: 'stop-color:#243170' }, pg2); E('stop', { offset: 1, style: 'stop-color:#18214d' }, pg2);
    const f1 = E('filter', { id: 'blur6', x: '-20%', y: '-20%', width: '140%', height: '140%' }, d); E('feGaussianBlur', { stdDeviation: 6 }, f1);
    const f2 = E('filter', { id: 'blur3', x: '-20%', y: '-20%', width: '140%', height: '140%' }, d); E('feGaussianBlur', { stdDeviation: 3 }, f2);
    const f3 = E('filter', { id: 'sh', x: '-20%', y: '-20%', width: '140%', height: '150%' }, d);
    E('feDropShadow', { dx: 0, dy: 5, stdDeviation: 6, 'flood-color': '#000', 'flood-opacity': 0.4 }, f3);
    ['ink', 'n', 'z', 'q', 'r', 'irr', 'ok', 'err', 'warn', 'muted'].forEach((nm) => {
      const mk = E('marker', { id: 'ar-' + nm, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto' }, d);
      E('path', { d: 'M0,0 L10,5 L0,10 z', style: `fill:var(--${nm === 'warn' ? 'warn' : nm})` }, mk);
    });
    return d;
  }
  function newSvg(c) {
    const svg = c.svg(1280, 720); defs(svg);
    try { if (window.innerWidth <= 640) { const st = c.stage; st.scrollLeft = Math.max(0, (st.scrollWidth - st.clientWidth) / 2); } } catch (e) { /* yoksay */ }
    return svg;
  }

  /* ================= sayılar: tam kesir aritmetiği ================= */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
  function q(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { k: 'q', n: n / g, d: d / g }; }
  const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
  const sub = (a, b) => q(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => q(a.n * b.n, a.d * b.d);
  const div = (a, b) => q(a.n * b.d, a.d * b.n);
  const fmtN = (n) => (n < 0 ? MINUS + Math.abs(n) : String(n));
  function calc(a, o, b) {
    if (o === '+') return add(a, b);
    if (o === MINUS || o === '-') return sub(a, b);
    if (o === '×' || o === '·') return mul(a, b);
    if (o === '÷') return b.n === 0 ? undefined : div(a, b);
  }
  const inSet = (k, t) => (k === 'N' ? t.k === 'q' && t.d === 1 && t.n >= 0 : k === 'Z' ? t.k === 'q' && t.d === 1 : k === 'Q' ? t.k === 'q' : k === 'Qp' ? t.k === 'i' : true);
  const smallest = (t) => (inSet('N', t) ? 'N' : inSet('Z', t) ? 'Z' : inSet('Q', t) ? 'Q' : 'Qp');
  const lab = (t) => (t.txt != null ? t.txt : t.d === 1 ? fmtN(t.n) : `${fmtN(t.n)}/${t.d}`);
  const irr = (txt, val) => ({ k: 'i', txt, val });
  const tokColor = (t) => COLV[smallest(t)];
  /* HTML kesir / devirli */
  const F = (a, b) => M.frac(a, b);
  const ov = (s) => `<span class="ov">${s}</span>`;
  const fh = (t) => (t.d === 1 ? fmtN(t.n) : (t.n < 0 ? MINUS : '') + F(Math.abs(t.n), t.d));

  /* ================= jeton (hap) ================= */
  const CW = 0.6; // tek karakter genişliği (em)
  function txtW(str, size) {
    let w = 0;
    for (const ch of String(str)) w += (/[0-9]/.test(ch) ? 0.58 : ch === MINUS ? 0.62 : ch === '/' ? 0.4 : ch === '√' ? 0.7 : ch === ',' || ch === '.' ? 0.3 : 0.62) * size;
    return w;
  }
  function fracG(p, cx, cy, ns, ds, fs, fill) {
    const g = E('g', {}, p);
    const w = Math.max(txtW(ns, fs), txtW(ds, fs)) + 10;
    T(g, cx, cy - fs * 0.62, ns, fs, fill, { bold: 600 });
    T(g, cx, cy + fs * 0.66, ds, fs, fill, { bold: 600 });
    E('line', { x1: cx - w / 2, x2: cx + w / 2, y1: cy, y2: cy, stroke: fill || 'var(--ink)', 'stroke-width': Math.max(2, fs * 0.08), 'stroke-linecap': 'round' }, g);
    return { g, w };
  }
  /* tam sayı ya da yatay çizgili kesir olarak sayı jetonu metni */
  function tokNode(p, x, y, t, size, fill) {
    const g = E('g', {}, p);
    if (t.d === 1) { T(g, x, y, fmtN(t.n), size, fill, { bold: 800 }); return g; }
    const fs = size * 0.78, w = Math.max(txtW(String(Math.abs(t.n)), fs), txtW(String(t.d), fs)) + 12;
    if (t.n < 0) { T(g, x - w / 2 - size * 0.38, y, MINUS, size, fill, { bold: 800 }); }
    fracG(g, x, y, String(Math.abs(t.n)), String(t.d), fs, fill); return g;
  }
  /* devirli ondalık yazımı: parts=[{t:'0,83'},{t:'3',over:true}] — tek aralıklı yazı */
  function decG(p, x, y, size, parts, fill, anchor = 'middle') {
    const cw = size * 0.6; const total = parts.reduce((s, q2) => s + q2.t.length, 0) * cw;
    const g = E('g', {}, p); let cx = anchor === 'middle' ? x - total / 2 : anchor === 'end' ? x - total : x;
    parts.forEach((pt) => {
      const w = pt.t.length * cw;
      T(g, cx + w / 2, y, pt.t, size, pt.col || fill, { mono: true, bold: 600 });
      if (pt.over) E('line', { x1: cx + 2, x2: cx + w - 2, y1: y - size * 0.62, y2: y - size * 0.62, stroke: pt.col || fill || 'var(--ink)', 'stroke-width': Math.max(2.5, size * 0.09), 'stroke-linecap': 'round' }, g);
      cx += w;
    });
    return { g, w: total };
  }
  /* spec: jeton ya da {txt} / {fn,fd} / {dec:[parts]} */
  function pill(p, t, o = {}) {
    const size = o.size || 28, hh = o.h || Math.round(size * 2.05);
    const g = G(p, o.x || 0, o.y || 0);
    if (o.cls) g.setAttribute('class', o.cls);
    let w, drawContent;
    const neg = t.k === 'q' && t.n < 0;
    const col = o.color || (t.color) || (t.k ? tokColor(t) : 'var(--ink)');
    if (t.dec) { const tw = t.dec.reduce((s, q2) => s + q2.t.length, 0) * size * 0.6; w = tw + 34; drawContent = () => decG(g, 0, 0, size, t.dec, 'var(--ink)'); }
    else if (t.fn != null || (t.k === 'q' && t.d !== 1)) {
      const ns = t.fn != null ? String(t.fn) : String(Math.abs(t.n)), ds = t.fd != null ? String(t.fd) : String(t.d);
      const fs = size * 0.82; const cwid = Math.max(txtW(ns, fs), txtW(ds, fs)) + 10; const sign = neg || t.neg ? size * 0.7 : 0;
      w = cwid + sign + 30;
      drawContent = () => { const gg = fracG(g, sign / 2, 0, ns, ds, fs, 'var(--ink)'); if (sign) T(g, -cwid / 2 - 2, 0, MINUS, size, 'var(--ink)', { bold: 600 }); };
    } else {
      const s2 = t.txt != null ? t.txt : fmtN(t.n); w = txtW(s2, size) + 38; drawContent = () => T(g, 0, 1, s2, size, 'var(--ink)', { bold: 600 });
    }
    w = Math.max(w, hh);
    const isIrr = t.k === 'i' || o.dashed;
    const hl = E('rect', { x: -w / 2 - 5, y: -hh / 2 - 5, width: w + 10, height: hh + 10, rx: hh / 2 + 5, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, opacity: 0, filter: 'url(#blur3)' }, g);
    const body = E('rect', { x: -w / 2, y: -hh / 2, width: w, height: hh, rx: hh / 2, fill: o.fill || 'url(#pg2)', stroke: col, 'stroke-width': 3, 'stroke-dasharray': isIrr ? '8 5' : null, filter: o.shadow === false ? null : 'url(#sh)' }, g);
    drawContent();
    g._w = w; g._h = hh; g._hl = hl; g._body = body;
    g.setAttribute('role', 'img');
    g.setAttribute('aria-label', t.dec ? t.dec.map((q2) => (q2.over ? q2.t + ' devirli' : q2.t)).join(' ') : t.fn != null ? `${neg || t.neg ? 'eksi ' : ''}${t.fn} bölü ${t.fd}` : (t.k === 'q' && t.d !== 1) ? `${neg ? 'eksi ' : ''}${Math.abs(t.n)} bölü ${t.d}` : String(t.txt != null ? t.txt : fmtN(t.n)).replace('−', 'eksi '));
    g.setCol = (cc) => body.setAttribute('stroke', cc);
    return g;
  }
  /* küçük etiket (HTML ayrıntılarını SVG'ye taşımadan) */
  function tag(p, x, y, str, size, col, o = {}) {
    const w = txtW(str, size) + 28, hh = size * 1.7;
    const g = G(p, x, y);
    E('rect', { x: -w / 2, y: -hh / 2, width: w, height: hh, rx: hh / 2, fill: o.fill || 'rgba(8,12,30,.75)', stroke: col, 'stroke-width': 2 }, g);
    T(g, 0, 1, str, size, o.ink || col, { bold: 700 });
    g._w = w; return g;
  }

  /* ================= matruşka geometrisi ================= */
  const GEO = {
    R: { x: 40, w: 1200, y: 30, rt: 230 }, Q: { x: 160, w: 960, y: 110, rt: 190 },
    Z: { x: 280, w: 720, y: 190, rt: 150 }, N: { x: 400, w: 480, y: 270, rt: 110 },
  };
  const BASE = 620, RB = 36;
  function silPath(x, y, w, hh, rt, rb = RB) {
    return `M${x},${y + rt} A${rt},${rt} 0 0 1 ${x + rt},${y} H${x + w - rt} A${rt},${rt} 0 0 1 ${x + w},${y + rt} V${y + hh - rb} A${rb},${rb} 0 0 1 ${x + w - rb},${y + hh} H${x + rb} A${rb},${rb} 0 0 1 ${x},${y + hh - rb} Z`;
  }
  const boxPath = (k, geo = GEO) => silPath(geo[k].x, geo[k].y, geo[k].w, BASE - geo[k].y, geo[k].rt);
  function inside(k, px, py, geo = GEO) {
    const b = geo[k]; const x0 = b.x, x1 = b.x + b.w, y0 = b.y, y1 = BASE;
    if (px < x0 || px > x1 || py < y0 || py > y1) return false;
    const corner = (cx, cy, r) => (px - cx) ** 2 + (py - cy) ** 2 <= r * r;
    if (py < y0 + b.rt) { if (px < x0 + b.rt) return corner(x0 + b.rt, y0 + b.rt, b.rt); if (px > x1 - b.rt) return corner(x1 - b.rt, y0 + b.rt, b.rt); }
    if (py > y1 - RB) { if (px < x0 + RB) return corner(x0 + RB, y1 - RB, RB); if (px > x1 - RB) return corner(x1 - RB, y1 - RB, RB); }
    return true;
  }
  const regionAt = (px, py, geo = GEO) => (inside('N', px, py, geo) ? 'N' : inside('Z', px, py, geo) ? 'Z' : inside('Q', px, py, geo) ? 'Q' : inside('R', px, py, geo) ? 'Qp' : null);
  /* her bölgede jetonların konacağı yuvalar (matruşka koordinatı) */
  const SLOTS = {
    N: [[520, 410], [640, 410], [760, 410], [520, 480], [640, 480], [760, 480], [520, 550], [640, 550], [760, 550]],
    Z: [[340, 330], [340, 400], [340, 470], [340, 540], [940, 330], [940, 400], [940, 470], [940, 540]],
    Q: [[220, 300], [220, 370], [220, 440], [220, 510], [1060, 300], [1060, 370], [1060, 440], [1060, 510]],
    Qp: [[100, 260], [100, 330], [100, 400], [100, 470], [1180, 260], [1180, 330], [1180, 400], [1180, 470]],
  };

  function Mat(c, svg, parent, o = {}) {
    const m = { s: o.s != null ? o.s : 1, tx: o.tx || 0, ty: o.ty || 0, used: {}, names: o.names !== false };
    m.root = E('g', {}, parent || svg);
    m.world = E('g', {}, m.root);
    m.band = E('path', { d: boxPath('R') + ' ' + boxPath('Q'), 'fill-rule': 'evenodd', fill: 'var(--irr)', 'fill-opacity': 0 }, m.world);
    m.box = {}; m.halo = {}; m.chip = {};
    KEYS.forEach((k) => { m.box[k] = E('path', { d: boxPath(k), fill: `url(#gr-${k})`, stroke: COLV[k], 'stroke-width': 3, 'vector-effect': 'non-scaling-stroke' }, m.world); });
    const mid = silPath(142, 92, 996, 528, 208);
    m.bandLine = E('path', { d: mid, fill: 'none', stroke: 'var(--irr)', 'stroke-width': 3, 'stroke-dasharray': '9 7', 'vector-effect': 'non-scaling-stroke', opacity: o.band ? 1 : 0 }, m.world);
    KEYS.forEach((k) => { m.halo[k] = E('path', { d: boxPath(k), fill: 'none', stroke: 'var(--ok)', 'stroke-width': 9, opacity: 0, filter: 'url(#blur6)', 'vector-effect': 'non-scaling-stroke' }, m.world); });
    m.halo.Qp = E('path', { d: mid, fill: 'none', stroke: 'var(--ok)', 'stroke-width': 12, opacity: 0, filter: 'url(#blur6)', 'vector-effect': 'non-scaling-stroke' }, m.world);
    m.chips = E('g', {}, m.root);
    KEYS.forEach((k) => {
      const g = G(m.chips, 0, 0);
      m.chip[k] = g; g._rect = E('rect', { x: -24, y: -24, width: 48, height: 48, rx: 14, fill: 'rgba(10,15,30,.85)', stroke: COLV[k], 'stroke-width': 3 }, g);
      g._let = T(g, 0, 1, LET[k], 30, COLV[k], { bold: 800 });
      g._name = T(g, 38, 0, NAMES[k], 24, MUTED, { anchor: 'start', op: 0 });
    });
    m.P = (x, y) => [m.tx + x * m.s, m.ty + y * m.s];
    m.apply = () => {
      m.world.setAttribute('transform', `translate(${m.tx} ${m.ty}) scale(${m.s})`);
      KEYS.forEach((k) => { const [x, y] = m.P(640, GEO[k].y + 32); put(m.chip[k], { x, y, s: m.s < 0.8 ? 0.88 : 1 }); m.chip[k]._name.setAttribute('opacity', m.names && m.s > 0.85 ? 1 : 0); });
    };
    m.apply();
    m.set = (v) => { Object.assign(m, v); m.apply(); };
    m.tweenTo = (to, ms = 1100) => {
      const a = { s: m.s, tx: m.tx, ty: m.ty };
      return c.tween(ms, (e) => m.set({ s: lerp(a.s, to.s != null ? to.s : a.s, e), tx: lerp(a.tx, to.tx != null ? to.tx : a.tx, e), ty: lerp(a.ty, to.ty != null ? to.ty : a.ty, e) }));
    };
    m.focus = (k, s) => ({ s, tx: 640 - s * 640, ty: 360 - s * ((GEO[k].y + BASE) / 2) });
    m.lit = (k, on = true) => { const g = m.chip[k]; g._rect.setAttribute('fill', on ? COLV[k] : 'rgba(10,15,30,.85)'); g._let.style.fill = on ? '#0F1420' : COLV[k]; };
    m.dim = (k, v) => { op(m.box[k], v); op(m.chip[k], v); };
    m.dimAll = (v) => KEYS.forEach((k) => m.dim(k, v));
    m.pulse = async (k, col = 'var(--ok)', times = 3, ms = 260) => {
      const hl = m.halo[k]; hl.setAttribute('stroke', col);
      for (let i = 0; i < times; i++) await c.tween(ms, (e) => hl.setAttribute('opacity', (Math.sin(e * Math.PI) * 0.95).toFixed(3)), ease.linear);
      hl.setAttribute('opacity', 0);
    };
    m.glow = (k, v, col) => { if (col) m.halo[k].setAttribute('stroke', col); m.halo[k].setAttribute('opacity', v); };
    m.slot = (k) => { const arr = SLOTS[k]; const i = (m.used[k] = m.used[k] || 0); m.used[k]++; const pt = arr[i % arr.length]; return m.P(pt[0], pt[1]); };
    m.entry = (k) => (k === 'Qp' ? m.P(760, 62) : m.P(760, GEO[k].y - 26));
    return m;
  }

  /* ================= kapalılık tablosu ================= */
  const CELL = { e: ['', 'var(--muted)', 'rgba(255,255,255,.04)', 'var(--line)'], '?': ['?', 'var(--muted)', 'rgba(255,255,255,.04)', 'var(--line)'], '..': ['', 'var(--warn)', 'rgba(255,200,87,.10)', 'var(--warn)'], x: ['', 'var(--err)', 'rgba(255,77,94,.16)', 'var(--err)'], v: ['', 'var(--ok)', 'rgba(61,220,151,.14)', 'var(--ok)'], na: ['—', 'var(--muted)', 'rgba(255,255,255,.03)', 'var(--line)'], lock: ['', 'var(--muted)', 'rgba(255,255,255,.03)', 'var(--line)'] };
  function Tbl(c, p, o) {
    const t = { cells: {} }; const g = G(p, o.x, o.y);
    const cw = o.cw || 88, ch = o.ch || 70, hw = o.hw || 76, hh = o.hh || 56;
    t.g = g; t.cw = cw; t.ch = ch; t.hw = hw; t.hh = hh;
    o.cols.forEach((cl, j) => T(g, hw + j * cw + cw / 2, hh / 2, cl, 40, 'var(--ink)', { bold: 700 }));
    o.rows.forEach((r, i) => {
      T(g, hw / 2 - 2, hh + i * ch + ch / 2, LET[r], 38, COLV[r], { bold: 800 });
      o.cols.forEach((cl, j) => {
        const cg = G(g, hw + j * cw + cw / 2 - 3, hh + i * ch + ch / 2 - 3);
        const rect = E('rect', { x: -cw / 2 + 4, y: -ch / 2 + 4, width: cw - 8, height: ch - 8, rx: 14, fill: 'rgba(255,255,255,.04)', stroke: 'var(--line)', 'stroke-width': 2 }, cg);
        const tx = T(cg, 0, 2, '?', 34, MUTED, { bold: 700 }); const ic = G(cg, 0, 0);
        t.cells[r + '|' + cl] = { g: cg, rect, tx, ic, state: '?' };
      });
    });
    t.set = (r, cl, st, animate = true, note) => {
      const ce = t.cells[r + '|' + cl]; if (!ce) return Promise.resolve();
      const d = CELL[st]; ce.state = st; ce.rect.setAttribute('fill', d[2]); ce.rect.setAttribute('stroke', d[3]);
      ce.tx.textContent = d[0]; ce.tx.style.fill = d[1]; ce.ic.innerHTML = '';
      if (st === 'v' || st === 'x') icon(ce.ic, st === 'v' ? 'ok' : 'no', 0, note ? -11 : 0, note ? 0.62 : 0.9);
      if (st === '..') E('circle', { r: 7, fill: 'var(--warn)' }, ce.ic);
      if (note) T(ce.ic, 0, 17, note, 20, 'var(--err)', { bold: 700 });
      if (st === 'lock') { E('rect', { x: -12, y: -4, width: 24, height: 18, rx: 4, fill: 'var(--muted)' }, ce.ic); E('path', { d: 'M-7,-4 V-10 A7,7 0 0 1 7,-10 V-4', fill: 'none', stroke: 'var(--muted)', 'stroke-width': 3.5 }, ce.ic); }
      if (animate && st !== '?') return c.tween(380, (k) => put(ce.g, { s: 1 + 0.18 * Math.sin(k * Math.PI) }), ease.linear);
      return Promise.resolve();
    };
    t.hilite = (r, cl, on = true) => { const ce = t.cells[r + '|' + cl]; ce.rect.setAttribute('stroke-width', on ? 4 : 2); if (on) ce.rect.setAttribute('stroke', 'var(--ink)'); else ce.rect.setAttribute('stroke', CELL[ce.state][3]); };
    return t;
  }

  /* ================= kapalılık kapısı ================= */
  function Gate(c, root, mat, o = {}) {
    const gt = { landed: [], key: o.key || 'N' };
    const x0 = o.x != null ? o.x : 30, y0 = o.y != null ? o.y : 40;
    const g = G(root, 0, 0); gt.g = g;
    card(g, x0, y0, 780, 78, { rx: 22 });
    if (!o.bare) T(g, x0 + 6, y0 - 16, 'KAPALILIK KAPISI', 22, MUTED, { anchor: 'start', bold: 700 });
    gt.keyLab = T(g, x0 + 774, y0 - 16, '', 24, COLV[gt.key], { anchor: 'end', bold: 700 });
    const cy = y0 + 39; const ax = x0 + 118, opx = x0 + 250, bx = x0 + 382, eqx = x0 + 494, rx = x0 + 640;
    const slot = (cx, w) => E('rect', { x: cx - w / 2, y: cy - 28, width: w, height: 56, rx: 16, fill: 'rgba(255,255,255,.04)', stroke: 'var(--line)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }, g);
    slot(ax, 150); slot(bx, 150); slot(rx, 200);
    const opc = E('circle', { cx: opx, cy, r: 30, fill: 'rgba(255,255,255,.06)', stroke: 'var(--line)', 'stroke-width': 2 }, g);
    gt.opT = T(g, opx, cy + 1, '', 40, 'var(--ink)', { bold: 700 });
    gt.eqT = T(g, eqx, cy + 1, '=', 40, MUTED, { bold: 700, op: 0.5 });
    gt.qT = T(g, rx, cy + 1, '?', 36, MUTED, { bold: 700, op: 0.7 });
    gt.pos = { a: [ax, cy], b: [bx, cy], r: [rx, cy], op: [opx, cy] };
    gt.vg = G(root, o.vx != null ? o.vx : 415, o.vy != null ? o.vy : 175);
    gt.setKey = (k) => { gt.key = k; gt.keyLab.textContent = o.bare ? '' : 'seçili kutu: ' + LET[k]; gt.keyLab.style.fill = COLV[k]; };
    gt.setKey(gt.key);
    gt.clear = async () => {
      const all = [...gt.landed]; gt.landed = [];
      if (gt.a) all.push(gt.a); if (gt.b) all.push(gt.b); if (gt.r) all.push(gt.r);
      gt.a = gt.b = gt.r = null;
      gt.vg.innerHTML = ''; gt.opT.textContent = ''; gt.qT.textContent = '?'; op(gt.qT, 0.7); op(gt.eqT, 0.5);
      mat.glow(gt.key, 0);
      if (all.length) { await par(...all.map((x) => fade(c, x, 0, 260))); all.forEach((x) => x.remove()); }
    };
    gt.load = async (a, opr, b) => {
      await gt.clear(); gt.A = a; gt.B = b; gt.op = opr;
      gt.a = pill(g, a, { x: gt.pos.a[0], y: gt.pos.a[1], size: 28 }); gt.b = pill(g, b, { x: gt.pos.b[0], y: gt.pos.b[1], size: 28 });
      gt.opT.textContent = opr; gt.opT.style.fill = 'var(--ink)';
      await par(pop(c, gt.a, 1, 380), pop(c, gt.b, 1, 380));
      gt.pending = a.k === 'q' && b.k === 'q' ? calc(a, opr, b) : undefined;
    };
    gt.verdict = (str, ok, sub) => {
      gt.vg.innerHTML = '';
      const col = ok === true ? 'var(--ok)' : ok === false ? 'var(--err)' : MUTED;
      const w = txtW(str, 44) + 120;
      if (ok !== null) icon(gt.vg, ok ? 'ok' : 'no', -w / 2 + 30, 0, 1.3);
      T(gt.vg, 20, 0, str, 44, col, { bold: 700 });
      if (sub) T(gt.vg, 20, 48, sub, 28, MUTED, {});
    };
    /* sonucu hesapla ve matruşkaya gönder. res: sonuç jetonu (verilmezse calc) */
    gt.run = async (res, opts = {}) => {
      const key = gt.key;
      if (res === undefined) {
        op(gt.qT, 1); gt.qT.textContent = 'tanımsız'; gt.qT.setAttribute('font-size', 28); gt.qT.style.fill = MUTED;
        gt.verdict('tanımsız', null, 'sıfıra bölme: ne yeşil ne kırmızı'); return { undef: true };
      }
      op(gt.eqT, 1); op(gt.qT, 0);
      const rp = pill(root, res, { x: gt.pos.r[0], y: gt.pos.r[1], size: 28 }); gt.r = rp; await pop(c, rp, 1, 380);
      const inK = inSet(key, res); const tr = smallest(res);
      const [ex, ey] = mat.entry(key);
      await mv(c, rp, ex, ey, 750, ease.inOut, { s: 0.85 });
      const L = lab(res);
      if (inK) {
        const [sx, sy] = mat.slot(tr);
        await mv(c, rp, sx, sy, 650, ease.inOut, { s: 0.9 });
        gt.landed.push(rp); gt.r = null;
        gt.verdict(`${L} ∈ ${LET[key]}`, true, opts.ok);
        await mat.pulse(key, 'var(--ok)');
        return { ok: true, res };
      }
      const rad = rp._h * 0.85 / 2;
      if (key !== 'Qp') {
        const ly = mat.P(760, GEO[key].y)[1];
        await mv(c, rp, ex, ly - rad - 2, 260, ease.in);
        mat.glow(key, 0.95, 'var(--err)');
        await par(mv(c, rp, ex, ly - rad - 24, 300, ease.out), shake(c, root));
        gt.verdict(`${L} ∉ ${LET[key]}`, false, opts.no);
        await mat.pulse(key, 'var(--err)', 2, 200);
      } else {
        gt.verdict(`${L} ∈ ${LET[tr]}, Q′ değil`, false, opts.no);
        await par(mat.pulse('Qp', 'var(--err)', 3, 220), shake(c, root));
      }
      const [sx, sy] = mat.slot(tr);
      await mv(c, rp, sx, sy, 900, ease.inOut, { s: 0.9 });
      rp.setCol(COLV[tr]);
      const lbl = tag(root, sx, sy - 50, 'dışarıda!', 22, 'var(--err)'); gt.landed.push(rp, lbl); gt.r = null;
      return { ok: false, res, true: tr };
    };
    return gt;
  }

  /* ================= sürükle-bırak ================= */
  function withSkip(c, p, label = 'Atla ›') {
    return new Promise((res, rej) => {
      const b = h('button', { class: 'btn ghost', onclick: () => { b.remove(); res('skip'); } }, label);
      c.act.appendChild(b);
      p.then((v) => { b.remove(); res(v); }, (e) => { b.remove(); rej(e); });
    });
  }
  /* items: [{g, home:{x,y,s}, id, ...}]; zones: [{id, hit(x,y), el}]; onDrop(item, zoneId) → false | true | {x,y,s} */
  function Sorter(c, svg, o) {
    const st = { sel: null, busy: false, items: o.items, zones: o.zones };
    const pt = svg.createSVGPoint();
    const toS = (e) => { pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
    const hl = (it, on) => it.g._hl && it.g._hl.setAttribute('opacity', on ? 1 : 0);
    const dropOn = async (it, zid) => {
      st.busy = true; hl(it, false); st.sel = null;
      try {
        const r = await o.onDrop(it, zid);
        if (r === false) await mv(c, it.g, it.home.x, it.home.y, 420, ease.inOut, { s: it.home.s });
        else if (r && typeof r === 'object') { await mv(c, it.g, r.x, r.y, 420, ease.inOut, { s: r.s != null ? r.s : it.g._p.s }); it.placed = true; }
        else if (r === true) it.placed = true;
        if (it.placed) { it.g.classList.remove('dd'); it.g.removeAttribute('tabindex'); }
      } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; }
      st.busy = false;
    };
    o.items.forEach((it) => {
      const g = it.g; g.classList.add('dd'); g.setAttribute('tabindex', 0); g.setAttribute('role', 'button');
      if (it.aria) g.setAttribute('aria-label', it.aria);
      let drag = null;
      c.on(g, 'pointerdown', (e) => {
        if (st.busy || it.placed) return;
        e.preventDefault();
        const p0 = toS(e); drag = { off: [g._p.x - p0.x, g._p.y - p0.y], x0: p0.x, y0: p0.y, moved: false };
        g.parentNode.appendChild(g); // önce öne getir (DOM'da taşımak yakalamayı bozar), sonra yakala
        try { g.setPointerCapture(e.pointerId); } catch (_) { /* yoksay */ }
      });
      c.on(g, 'pointermove', (e) => {
        if (!drag) return; const p0 = toS(e);
        if (!drag.moved && Math.hypot(p0.x - drag.x0, p0.y - drag.y0) > 8) { drag.moved = true; if (st.sel) hl(st.sel, false); st.sel = null; put(g, { s: (it.home.s || 1) * 1.1 }); }
        if (drag.moved) put(g, { x: p0.x + drag.off[0], y: p0.y + drag.off[1] });
      });
      const end = (e) => {
        if (!drag) return; const d = drag; drag = null; const p0 = toS(e);
        if (!d.moved) { if (st.sel === it) { hl(it, false); st.sel = null; } else { if (st.sel) hl(st.sel, false); st.sel = it; hl(it, true); } return; }
        const z = st.zones.find((zz) => zz.hit(p0.x, p0.y));
        if (z) dropOn(it, z.id); else mv(c, g, it.home.x, it.home.y, 380, ease.inOut, { s: it.home.s }).catch(() => {});
      };
      c.on(g, 'pointerup', end); c.on(g, 'pointercancel', end);
      c.on(g, 'keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (st.sel) hl(st.sel, false); st.sel = it; hl(it, true); } });
    });
    o.zones.forEach((z) => {
      if (!z.el) return; z.el.setAttribute('tabindex', 0); z.el.setAttribute('role', 'button');
      const tap = () => { if (st.sel && !st.busy) dropOn(st.sel, z.id); };
      c.on(z.el, 'pointerdown', tap);
      c.on(z.el, 'keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
    });
    return st;
  }
  const sayc = (c, html, speak, ms) => c.say(html, { speak, ms });
  const sh = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const spk = (s2) => s2;

  /* ================= uzun bölme motoru (tamsayı aritmetiği) ================= */
  function divInfo(a, b, maxK, stop = true) {
    const ip = Math.floor(a / b); let r = a % b; const r0 = r;
    const steps = []; const seen = new Map([[r0, 0]]); let cyc = -1, cycStep = -1, term = false;
    for (let k = 1; k <= maxK; k++) {
      const cur = r * 10, dg = Math.floor(cur / b), rem = cur % b;
      steps.push({ cur, dg, rem, prod: dg * b, prev: r }); r = rem;
      if (rem === 0) { term = true; break; }
      if (cyc < 0 && seen.has(rem)) { cyc = seen.get(rem); cycStep = k; if (stop) break; }
      if (!seen.has(rem)) seen.set(rem, k);
    }
    return { a, b, ip, r0, steps, term, cyc, cycStep };
  }
  /* tam ondalık açılım: {ip, pre:[...], rep:[...], term} */
  function decOf(a, b) {
    const inf = divInfo(a, b, 80, true); const dg = inf.steps.map((s2) => s2.dg);
    if (inf.term) return { ip: inf.ip, pre: dg, rep: [], term: true };
    return { ip: inf.ip, pre: dg.slice(0, inf.cyc), rep: dg.slice(inf.cyc), term: false };
  }
  function decHtml(a, b) {
    const d = decOf(a, b); let s2 = d.ip + ',' + d.pre.join('');
    if (d.term && !d.pre.length) return String(d.ip);
    return d.rep.length ? s2 + ov(d.rep.join('')) : s2;
  }
  function decPlain(a, b, reps = 3) {
    const d = decOf(a, b); if (d.term) return d.pre.length ? d.ip + ',' + d.pre.join('') : String(d.ip);
    let s2 = d.ip + ',' + d.pre.join(''); for (let i = 0; i < reps; i++) s2 += d.rep.join(''); return s2 + '…';
  }
  const decParts = (a, b) => { const d = decOf(a, b); const p = [{ t: d.ip + ',' + d.pre.join('') }]; if (d.rep.length) p.push({ t: d.rep.join(''), over: true }); return p; };
  /* sadeleşmiş paydanın asal çarpanları */
  function factorize(n) { const f = []; for (let p = 2; p * p <= n; p++) while (n % p === 0) { f.push(p); n /= p; } if (n > 1) f.push(n); return f; }
  function reduceDen(a, b) { return b / gcd(a, b); }

  /* ================= Kalan Defteri ================= */
  function Ledger(c, root, o) {
    const lg = { rows: [], rowH: o.rowH || 54 };
    const g = G(root, o.x, o.y); lg.g = g;
    card(g, 0, 0, o.w, o.h, { fill: '#161e44', stroke: 'rgba(255,200,87,.5)' });
    for (let y = 92; y < o.h - 20; y += lg.rowH) E('line', { x1: 14, x2: o.w - 14, y1: y + lg.rowH / 2, y2: y + lg.rowH / 2, stroke: 'rgba(160,180,255,.13)', 'stroke-width': 1.5 }, g);
    E('line', { x1: 64, x2: 64, y1: 56, y2: o.h - 14, stroke: 'rgba(255,100,120,.35)', 'stroke-width': 2 }, g);
    T(g, o.w / 2, 30, o.title || 'Kalan Defteri', 30, 'var(--warn)', { bold: 700 });
    lg.top = 92;
    lg.add = async (val, label, col) => {
      const i = lg.rows.length; const y = lg.top + i * lg.rowH; const rg = G(g, 0, y);
      const c0 = col || 'var(--q)';
      
      const t = T(rg, o.w * 0.42, 0, String(val), 38, 'var(--ink)', { bold: 700, mono: true });
      const lb = label ? T(rg, 82, 0, label, 22, MUTED, { anchor: 'start' }) : null;
      if (lb) { lb.setAttribute('x', o.w - 24); lb.setAttribute('text-anchor', 'end'); }
      const row = { i, y, g: rg, t, val, ring: null, c0 }; lg.rows.push(row);
      op(rg, 0); await c.tween(350, (k) => { op(rg, k); put(rg, { y: y - 14 * (1 - k) }); });
      return row;
    };
    lg.ring = (i, col = 'var(--q)') => {
      const r = lg.rows[i]; const w = 20 + String(r.val).length * 24;
      r.ring = E('rect', { x: o.w * 0.42 - w / 2, y: -25, width: w, height: 50, rx: 14, fill: 'none', stroke: col, 'stroke-width': 4, filter: 'url(#sh)' }, r.g); return r.ring;
    };
    lg.link = async (i, j, col = 'var(--q)') => {
      const a = lg.rows[i], b = lg.rows[j]; const xr = o.w * 0.42 + 56;
      lg.ring(i, col); lg.ring(j, col);
      const path = E('path', { d: `M${xr},${b.y} C${xr + 70},${b.y} ${xr + 70},${a.y} ${xr},${a.y}`, fill: 'none', stroke: col, 'stroke-width': 5, 'stroke-linecap': 'round', 'marker-end': 'url(#ar-q)' }, g);
      await drawIn(c, path, 900);
      return path;
    };
    lg.note = (str, col) => { lg._n && lg._n.remove(); lg._n = T(g, o.w / 2, o.h - 26, str, 26, col || 'var(--q)', { bold: 700 }); return lg._n; };
    return lg;
  }

  /* ================= uzun bölme görünümü (Türkiye biçimi) ================= */
  function LongDiv(c, root, o) {
    const info = divInfo(o.a, o.b, o.K, o.stop !== false);
    const a = o.a, b = o.b, ip = info.ip, K = info.steps.length;
    const fs = o.fs || 28, dx = o.dx || 32, rh = o.rh || 36, sp = o.fast ? 0.55 : 1;
    const la = String(a).length, ncol = la + K;
    const g = G(root, o.x, o.y); const ld = { info, g, k: 0, K };
    const colX = (i) => i * dx + (i >= la ? 14 : 0);
    const prodRow = (k) => (ip > 0 ? 2 : 0) + 2 * k - 1;
    const rowsTotal = prodRow(K) + 2;
    const xv = colX(ncol - 1) + dx / 2 + 14;
    const col0 = 'var(--ink)';
    // bölünen
    numG(a, la - 1, 0, col0);
    T(g, colX(la - 1) + dx / 2 + 7, 7, ',', fs, col0, { bold: 700, mono: true });
    ld.zeros = [];
    for (let j = 0; j < K; j++) ld.zeros.push(T(g, colX(la + j), 0, '0', fs, MUTED, { bold: 700, mono: true, op: 0.45 }));
    E('line', { x1: xv, x2: xv, y1: -rh * 0.62, y2: rowsTotal * rh - rh * 0.4, stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    E('line', { x1: xv, x2: xv + dx * 3.6, y1: rh * 0.5, y2: rh * 0.5, stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    T(g, xv + dx * 0.9, 0, String(b), fs + 4, 'var(--q)', { bold: 700, mono: true });
    const qx0 = xv + dx * 0.55, qy = rh * 1.02;
    const qX = (slot) => (slot < 0 ? qx0 : qx0 + dx * 0.55 + dx * 0.62 + slot * dx);
    ld.eq = T(g, xv / 2 + dx, -rh * 1.55, '', fs + 2, 'var(--warn)', { bold: 700 });
    ld.qdigits = [];
    /* çok basamaklı sayı tek yazı öğesidir; her rakamın x'i ayrı verilir (sütun hizası) */
    function numG(str, endCol, row, colr) {
      const s2 = String(str);
      const t = T(g, 0, row * rh, s2, fs, colr, { bold: 700, mono: true });
      t.setAttribute('x', [...s2].map((_, i) => colX(endCol - (s2.length - 1 - i))).join(' '));
      return t;
    }
    const hiBox = (str, endCol, row, col) => {
      const n = String(str).length; const x1 = colX(endCol - n + 1) - dx * 0.5 - 3, x2 = colX(endCol) + dx * 0.5 + 3;
      return E('rect', { x: x1, y: row * rh - rh * 0.5, width: x2 - x1, height: rh, rx: 10, fill: 'none', stroke: col, 'stroke-width': 3.5, opacity: 0, filter: 'url(#sh)' }, g);
    };
    const cend = (k) => la - 1 + k;
    ld.start = async () => {
      op(g, 0); await fade(c, g, 1, 500 * sp);
      if (ip === 0) { const t = T(g, qX(-1), qy, '0,', fs + 2, 'var(--ok)', { bold: 700, mono: true }); op(t, 0); await fade(c, t, 1, 300 * sp); ld.qdigits.push(t); }
      if (o.ledger) { ld.row0 = await o.ledger.add(info.r0, '', 'var(--q)'); o.ledger.ring(0, 'var(--q)'); }
    };
    ld.stepInt = async () => {
      if (ip === 0 || ld.intDone) return; ld.intDone = true;
      const hb = hiBox(a, la - 1, 0, 'var(--warn)'); await fade(c, hb, 1, 250 * sp);
      
      const qd = G(g, qX(-1), qy); T(qd, 0, 0, String(ip), fs + 2, 'var(--ok)', { bold: 700, mono: true }); await pop(c, qd, 1, 350 * sp);
      const cm = T(g, qX(-1) + dx * 0.62, qy + 5, ',', fs + 2, 'var(--ok)', { bold: 700, mono: true }); ld.qdigits.push(qd, cm);
      const pr = String(ip * b); const gg = numG(pr, la - 1, prodRow(0) || 1, col0);
      op(gg, 0); await fade(c, gg, 1, 350 * sp);
      E('line', { x1: colX(la - 1 - pr.length) - dx * 0.4, x2: colX(la - 1) + dx * 0.5, y1: rh * 1.5, y2: rh * 1.5, stroke: 'var(--ink)', 'stroke-width': 2.5 }, g);
      const rs = String(info.r0 * 10); const rg = numG(rs, la, 2, col0); op(rg, 0); await fade(c, rg, 1, 350 * sp);
      op(hb, 0); ld.zeros[0] && op(ld.zeros[0], 0.1);
    };
    ld.step = async () => {
      if (ld.k >= K) return null;
      if (ip > 0 && !ld.intDone) await ld.stepInt();
      const k = ++ld.k; const s2 = info.steps[k - 1]; const ec = cend(k);
      const curRow = k === 1 ? (ip > 0 ? 2 : 0) : prodRow(k) - 1;
      const hb = hiBox(s2.cur, ec, curRow, 'var(--warn)'); await fade(c, hb, 1, 250 * sp);
      
      if (!ld.qT) { ld.qT = T(g, 0, qy, '', fs + 2, 'var(--ok)', { bold: 700, mono: true }); ld.qx = []; }
      ld.qx.push(qX(k - 1)); ld.qT.textContent += String(s2.dg); ld.qT.setAttribute('x', ld.qx.join(' '));
      await c.wait(300 * sp);
      const pr = String(s2.prod); const pg = numG(pr, ec, prodRow(k), col0);
      op(pg, 0); await fade(c, pg, 1, 350 * sp);
      E('line', { x1: colX(ec - pr.length) - dx * 0.4, x2: colX(ec) + dx * 0.5, y1: prodRow(k) * rh + rh * 0.5, y2: prodRow(k) * rh + rh * 0.5, stroke: 'var(--ink)', 'stroke-width': 2.5 }, g);
      const rr = prodRow(k) + 1; let rg;
      if (k < K) rg = numG(String(s2.rem * 10), ec + 1, rr, col0);
      else { rg = numG(String(s2.rem), ec, rr, s2.rem === 0 ? 'var(--ok)' : col0); }
      op(rg, 0); await fade(c, rg, 1, 350 * sp);
      if (k < K && ld.zeros[k - 1]) op(ld.zeros[k - 1], 0.1);
      if (k === K && s2.rem === 0) { const fr = hiBox('0', ec, rr, 'var(--ok)'); await fade(c, fr, 1, 300 * sp); }
      op(hb, 0);
      if (o.ledger) {
        const row = await o.ledger.add(s2.rem, s2.rem === 0 ? 'bitti' : '', s2.rem === 0 ? 'var(--ok)' : 'var(--q)');
        if (s2.rem === 0) o.ledger.ring(row.i, 'var(--ok)');
        else if (info.cycStep === k && o.link !== false) { await o.ledger.link(info.cyc, row.i); }
      }
      return s2;
    };
    ld.ring = (i0, i1, col = 'var(--q)') => {
      const x1 = qX(i0) - dx * 0.55, x2 = qX(i1) + dx * 0.55;
      const r = E('rect', { x: x1, y: qy - rh * 0.6, width: x2 - x1, height: rh * 1.2, rx: rh * 0.6, fill: 'none', stroke: col, 'stroke-width': 4, filter: 'url(#sh)' }, g);
      return drawIn(c, r, 1100);
    };
    ld.over = (i0, i1, col = 'var(--q)') => {
      const r = E('line', { x1: qX(i0) - dx * 0.4, x2: qX(i1) + dx * 0.4, y1: qy - rh * 0.62, y2: qy - rh * 0.62, stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      return drawIn(c, r, 700);
    };
    ld.pos = { dividend: [o.x + colX(0), o.y], divisor: [o.x + xv + dx * 0.9, o.y] };
    ld.destroy = () => g.remove();
    ld.quotient = () => ld.qdigits;
    return ld;
  }

  /* ================= sayı doğrusu yardımcısı ================= */
  function numLine(p, o) {
    const g = G(p, 0, 0), X = (v) => o.x0 + o.u * v, y = o.y;
    const ln = E('line', { x1: X(o.a) - (o.pad != null ? o.pad : 30), x2: X(o.b) + (o.padR != null ? o.padR : 44), y1: y, y2: y, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': o.arrow === false ? null : 'url(#ar-ink)' }, g);
    const step = o.step || 1, ticks = [];
    const n = Math.round((o.b - o.a) / step);
    for (let i = 0; i <= n; i++) {
      const v = o.a + i * step;
      const tk = E('line', { x1: X(v), x2: X(v), y1: y - 9, y2: y + 9, stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      const lb = o.noLabels ? null : T(g, X(v), y + (o.ly || 36), o.fmt ? o.fmt(v) : String(v), o.size || 28, o.col ? o.col(v) : 'var(--ink)', { bold: 700 });
      ticks.push({ v, tk, lb });
    }
    return { g, X, ln, ticks, y };
  }
  function coin(p, x, y, r = 22, txt = '1') {
    const g = G(p, x, y);
    E('circle', { r, fill: 'var(--n)', stroke: '#8a5d10', 'stroke-width': 3 }, g);
    E('circle', { r: r - 6, fill: 'none', stroke: '#8a5d10', 'stroke-width': 2, opacity: 0.6 }, g);
    T(g, 0, 1, txt, r * 0.95, '#3a2705', { bold: 800 });
    return g;
  }
  function wallet(p, x, y) {
    const g = G(p, x, y);
    E('rect', { x: -95, y: -52, width: 190, height: 112, rx: 20, fill: '#26346e', stroke: 'var(--z)', 'stroke-width': 4, filter: 'url(#sh)' }, g);
    E('path', { d: 'M-95,-12 H95', stroke: 'var(--z)', 'stroke-width': 3, opacity: 0.5 }, g);
    E('rect', { x: 40, y: -18, width: 70, height: 46, rx: 14, fill: '#1c2759', stroke: 'var(--z)', 'stroke-width': 4 }, g);
    E('circle', { cx: 66, cy: 5, r: 8, fill: 'var(--z)' }, g);
    return g;
  }
  function receipt(p, x, y, str) {
    const g = G(p, x, y);
    E('path', { d: 'M-105,-150 H105 V150 L84,136 L63,150 L42,136 L21,150 L0,136 L-21,150 L-42,136 L-63,150 L-84,136 L-105,150 Z', fill: '#e6ebfa', filter: 'url(#sh)' }, g);
    T(g, 0, -118, 'FİŞ', 30, '#27315f', { bold: 800 });
    for (let i = 0; i < 3; i++) E('line', { x1: -75, x2: 75, y1: -82 + i * 20, y2: -82 + i * 20, stroke: '#9aa6d6', 'stroke-width': 3, 'stroke-dasharray': '4 6' }, g);
    T(g, 0, -4, str, 54, '#1b2150', { bold: 800 });
    return g;
  }
  function person(p, x, y, col = 'var(--q)', k = 1) {
    const g = G(p, x, y); g._p.s = k; place(g);
    E('circle', { cx: 0, cy: -44, r: 17, fill: col, opacity: 0.9 }, g);
    E('path', { d: 'M-26,16 Q-26,-22 0,-22 Q26,-22 26,16 Z', fill: col, opacity: 0.75 }, g);
    return g;
  }

  /* zengin yazı satırı: parts=[{t, col, hl}, {frac:[a,b], col}] */
  function rich(p, cx, cy, size, parts, o = {}) {
    const g = E('g', {}, p); let x = 0; const boxes = [];
    for (const pt of parts) {
      if (pt.frac) {
        const fs = size * 0.8; const w = Math.max(txtW(pt.frac[0], fs), txtW(pt.frac[1], fs)) + 12;
        fracG(g, x + w / 2 + 3, cy, pt.frac[0], pt.frac[1], fs, pt.col || 'var(--ink)'); x += w + 8;
      } else {
        const t = T(g, x, cy, pt.t, size, pt.col, { anchor: 'start', bold: pt.bold === false ? false : 700 });
        const w = t.getComputedTextLength(); if (pt.hl) boxes.push([x, w, pt.hl]);
        if (pt.over) E('line', { x1: x + 2, x2: x + w - 2, y1: cy - size * 0.68, y2: cy - size * 0.68, stroke: pt.col || 'var(--ink)', 'stroke-width': Math.max(3, size * 0.07), 'stroke-linecap': 'round' }, g);
        x += w;
      }
    }
    boxes.forEach(([bx, bw, col]) => g.insertBefore(E('rect', { x: bx - 8, y: cy - size * 0.75, width: bw + 16, height: size * 1.5, rx: 12, fill: 'none', stroke: col, 'stroke-width': 3 }), g.firstChild));
    const sx = o.anchor === 'start' ? cx : cx - x / 2;
    g.setAttribute('transform', `translate(${sx} 0)`); g._w = x;
    return g;
  }
  /* kapı sahnelerinde otomatik deneme */
  async function autoTrial(c, gate, tbl, row, col, a, o2, b, o = {}) {
    await gate.load(a, o2, b);
    const r0 = calc(a, o2, b);
    if (o.predict) await o.predict(r0);
    else await c.cont('Test et ›');
    const res = await gate.run(r0, o.msgs);
    if (tbl && col && res && !res.undef) tbl.set(row, col, res.ok ? '..' : 'x');
    return res;
  }

  /* var olan jetonun yüzünü (içeriğini) değiştir; dinleyiciler korunur */
  function reface(g, t, o = {}) {
    const tmp = pill(g.parentNode, t, o);
    while (g.firstChild) g.removeChild(g.firstChild);
    while (tmp.firstChild) g.appendChild(tmp.firstChild);
    g._w = tmp._w; g._h = tmp._h; g._hl = tmp._hl; g._body = tmp._body; g.setCol = tmp.setCol; tmp.remove();
  }

  /* metni (x1,y1)'den (x2,y2)'ye uçur */
  function mv0(c, t, x1, y1, x2, y2, size) {
    const s0 = +t.getAttribute('font-size');
    return c.tween(850, (e) => { t.setAttribute('x', lerp(x1, x2, e)); t.setAttribute('y', lerp(y1, y2, e)); t.setAttribute('font-size', lerp(s0, size, e)); });
  }

  /* ================= sahnelerin ortak parçaları ================= */
  const GL = { s: 0.64, tx: 4.4, ty: 253.2 }; // kapı düzeninde matruşkanın yeri (sağda tablo varken)
  const GLC = { s: 0.64, tx: 230.4, ty: 253.2 }, GATE_C = { x: 250, vx: 640 }; // tablosuz sahnede ortada
  const OPS = ['+', MINUS, '×', '÷'];
  const TBL_POS = { x: 836, y: 122, cw: 86, ch: 72, hw: 74, hh: 54 };
  const nf = (p) => { p.catch(() => {}); return p; }; // beklenmeyen (arka planda süren) animasyon
  function yn(c, q2, truth, hint, right, next) {
    return c.choice({ tag: 'Tahmin et', q: q2, options: ['Evet', 'Hayır'], answer: truth ? 0 : 1, hints: truth ? ['', hint] : [hint, ''], right, next: next || 'Test et ›' });
  }
  const terminates = (a, b) => factorize(reduceDen(a, b)).every((f) => f === 2 || f === 5);
  const decStrN = (n, k) => { const s2 = String(n).padStart(k + 1, '0'); return s2.slice(0, s2.length - k) + ',' + s2.slice(s2.length - k); };
  function sqDecN(n, k) { const sq = BigInt(n) * BigInt(n); const s2 = sq.toString().padStart(2 * k + 1, '0'); return s2.slice(0, s2.length - 2 * k) + ',' + s2.slice(s2.length - 2 * k); }
  function isqrtDigits(count) {
    const N = 2n * 10n ** BigInt(2 * count); let x = N, y = (x + 1n) / 2n;
    while (y < x) { x = y; y = (x + N / x) / 2n; }
    const s2 = x.toString(); return s2[0] + ',' + s2.slice(1);
  }
  const fmtD = (v) => String(v).replace('.', ',').replace('-', MINUS);
  /* sayı tanımı: ondalık sayı ya da [pay, payda] */
  const valOf = (sp) => (Array.isArray(sp) ? sp[0] / sp[1] : sp);
  const htmlOf = (sp) => (Array.isArray(sp) ? (sp[0] < 0 ? MINUS : '') + F(Math.abs(sp[0]), sp[1]) : fmtD(sp));
  const lblOf = (sp) => (Array.isArray(sp) ? sp : fmtD(sp));

  /* Yakınlaşan sayı doğrusu: işaretler değerleriyle tutulur, görünen aralık değişince yerleri yeniden hesaplanır. */
  function ZoomLine(c, p, o) {
    const z = { lo: o.lo, hi: o.hi, marks: [] }; const g = G(p, 0, 0); z.g = g;
    E('line', { x1: o.x0 - 50, x2: o.x1 + 50, y1: o.y, y2: o.y, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    z.X = (v) => o.x0 + ((v - z.lo) / (z.hi - z.lo)) * (o.x1 - o.x0);
    z.render = () => z.marks.forEach((m) => { const x = z.X(m._v); put(m, { x }); op(m, x < o.x0 - 30 || x > o.x1 + 30 ? 0 : 1); });
    /* lbl: yazı ya da [pay, payda] · o2.up: etiket üstte · o2.r: nokta yarıçapı */
    z.add = (v, lbl, col = 'var(--ink)', o2 = {}) => {
      const m = G(g, 0, o.y); m._v = v; const ly = o2.up ? -62 : 62;
      E('line', { x1: 0, x2: 0, y1: -12, y2: 12, stroke: col, 'stroke-width': 3, 'stroke-linecap': 'round' }, m);
      E('circle', { r: o2.r || 11, fill: col, stroke: '#0F1420', 'stroke-width': 3 }, m);
      if (Array.isArray(lbl)) {
        const neg = lbl[0] < 0, sx = neg ? 9 : 0;
        const f = fracG(m, sx, ly, String(Math.abs(lbl[0])), String(lbl[1]), 30, col);
        if (neg) T(m, sx - f.w / 2 - 9, ly, MINUS, 32, col, { bold: 700 });
      } else if (lbl != null) T(m, 0, ly, lbl, 32, col, { bold: 700 });
      z.marks.push(m); z.render(); return m;
    };
    z.set = (lo, hi) => { z.lo = lo; z.hi = hi; z.render(); };
    /* genişlik üstel, merkez buna bağlı değişir: yakınlaşma sabit hızda görünür */
    z.zoom = (lo, hi, ms = 1300) => {
      const a = z.lo, b = z.hi, w0 = b - a, w1 = hi - lo;
      return c.tween(ms, (e) => {
        const w = w0 * Math.pow(w1 / w0, e), t = Math.abs(w1 - w0) < 1e-12 ? e : (w - w0) / (w1 - w0);
        const cen = lerp((a + b) / 2, (lo + hi) / 2, t); z.set(cen - w / 2, cen + w / 2);
      }, ease.inOut).then(() => z.set(lo, hi));
    };
    return z;
  }

  /* ================================================================
     C1 — Her kutu bir ihtiyaçtan doğdu
     ================================================================ */
  async function c1Kutular(c) {
    const svg = newSvg(c); const root = E('g', {}, svg); const df = svg.querySelector('defs');
    const SPLIT = {};
    KEYS.forEach((k) => {
      const b = GEO[k]; SPLIT[k] = b.y + 0.42 * (BASE - b.y);
      E('rect', { x: 0, y: SPLIT[k], width: 1280, height: 720 - SPLIT[k] }, E('clipPath', { id: 'cb-' + k }, df));
      E('rect', { x: 0, y: 0, width: 1280, height: SPLIT[k] }, E('clipPath', { id: 'ct-' + k }, df));
    });
    const cam = E('g', {}, root);
    const setCam = (s) => cam.setAttribute('transform', `translate(${640 * (1 - s)} ${640 * (1 - s)}) scale(${s})`);
    setCam(0.6);
    const mat = Mat(c, svg, cam, {}); op(mat.root, 0);
    const dollsG = E('g', {}, cam); op(dollsG, 0);
    const dolls = {};
    ['N', 'Z', 'Q', 'R'].forEach((k) => {
      const b = GEO[k], d = {}; d.body = E('g', {}, dollsG);
      const bot = E('g', { 'clip-path': `url(#cb-${k})` }, d.body);
      E('path', { d: boxPath(k), fill: '#0d1330' }, bot);
      E('path', { d: boxPath(k), fill: COLV[k], 'fill-opacity': 0.3, stroke: COLV[k], 'stroke-width': 4 }, bot);
      E('line', { x1: b.x + 6, x2: b.x + b.w - 6, y1: SPLIT[k], y2: SPLIT[k], stroke: COLV[k], 'stroke-width': 5, opacity: 0.9 }, bot);
      d.top = E('g', {}, d.body);
      const ti = E('g', { 'clip-path': `url(#ct-${k})` }, d.top);
      E('path', { d: boxPath(k), fill: '#0d1330' }, ti);
      E('path', { d: boxPath(k), fill: COLV[k], 'fill-opacity': 0.42, stroke: COLV[k], 'stroke-width': 4 }, ti);
      const hx = b.x + 40, hy = SPLIT[k];
      d.open = (e) => d.top.setAttribute('transform', `translate(0 ${-90 * e}) rotate(${-14 * e} ${hx} ${hy})`);
      d.rise = (e) => d.body.setAttribute('transform', `translate(0 ${-80 * e})`);
      dolls[k] = d;
    });
    await c.tween(800, (e) => { op(dollsG, e); dollsG.setAttribute('transform', `translate(0 ${-50 * (1 - e)})`); }, ease.out);
    dollsG.removeAttribute('transform');
    await c.say('Matruşkayı aç: içinden bir küçüğü çıkar.');
    const order = ['R', 'Q', 'Z', 'N'];
    for (let i = 0; i < 4; i++) {
      const jobs = [c.tween(700, (e) => dolls[order[i]].open(e))];
      if (order[i + 1]) jobs.push(c.tween(800, (e) => dolls[order[i + 1]].rise(e)));
      await par(...jobs); await c.wait(200);
    }
    await c.say('Sayı kümeleri de böyle iç içe durur.');
    await par(...order.map((k) => c.tween(700, (e) => dolls[k].open(1 - e))), ...['Q', 'Z', 'N'].map((k) => c.tween(700, (e) => dolls[k].rise(1 - e))));
    await c.tween(1000, (e) => { setCam(lerp(0.6, 1, e)); op(dollsG, 1 - Math.min(1, e * 1.6)); op(mat.root, Math.max(0, e * 1.4 - 0.4)); }, ease.inOut);
    dollsG.remove(); op(mat.root, 1);
    for (const k of ['N', 'Z', 'Q', 'R']) { mat.lit(k, true); nf(mat.pulse(k, COLV[k], 1, 300)); await c.wait(280); }
    const ex = T(root, 640, 672, 'N ⊂ Z ⊂ Q ⊂ R', 50, 'var(--ink)', { bold: 800 }); op(ex, 0);
    await fade(c, ex, 1, 500);
    await c.say('Her kutu, bir öncekinde yapılamayan bir işlem yüzünden açıldı.');
    await c.choice({
      q: `Cüzdanında 3 lira var, 5 liralık bir şey aldın. <b>3 ${MINUS} 5</b> kaç eder?`,
      options: [MINUS + '2', '2', 'Yapılamaz'], answer: 0,
      hints: ['', '5 − 3 olsaydı 2 olurdu. 3’ten 5 adım geri gidince sıfırın soluna geçersin.', 'Yapılır: sonuç −2. Sorun işlemde değil, sonucun konacağı kutuda.'],
      right: 'Evet, −2. Peki −2 hangi kutuda duracak?',
    });
    c.note('<b>N ⊂ Z ⊂ Q ⊂ R</b><br>Her kutu bir öncekini içerir.', 'İç içe kutular', 'c1-1');
  }

  async function c1N(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const mat = Mat(c, svg, root, { names: false }); op(mat.root, 0); mat.lit('N', true);
    await fade(c, mat.root, 1, 500);
    await par(mat.tweenTo(mat.focus('N', 1.7), 1100), c.tween(1100, (e) => ['R', 'Q', 'Z'].forEach((k) => mat.dim(k, 1 - 0.9 * e))));
    const nl = G(root, 0, 0);
    const lineY = 520, nx = (n) => 290 + 76 * n;
    E('line', { x1: 262, x2: 1044, y1: lineY, y2: lineY, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': 'url(#ar-ink)' }, nl);
    op(nl, 0); await fade(c, nl, 1, 400);
    for (let n = 0; n <= 9; n++) {
      const d = G(nl, nx(n), lineY);
      E('circle', { r: n === 0 ? 16 : 12, fill: 'var(--n)', stroke: '#0F1420', 'stroke-width': 3 }, d);
      T(d, 0, 44, String(n), 32, n === 0 ? 'var(--n)' : 'var(--ink)', { bold: 700 });
      nf(pop(c, d, 1, 300)); await c.wait(n === 0 ? 420 : 200);
    }
    await c.say('İlk kutu saymak için: sıfır, bir, iki, üç…');
    const setT = T(root, 640, 330, 'N = {0, 1, 2, 3, …}', 46, 'var(--n)', { bold: 800 }); op(setT, 0);
    await fade(c, setT, 1, 500);
    await c.say('Sıfır da bir doğal sayıdır.');
    await par(fade(c, nl, 0, 400), fade(c, setT, 0, 400));
    nl.remove(); setT.remove();
    await par(mat.tweenTo(GLC, 1100), c.tween(1100, (e) => ['R', 'Q', 'Z'].forEach((k) => mat.dim(k, 0.1 + 0.9 * e))));
    const gate = Gate(c, root, mat, { key: 'N', bare: true, ...GATE_C }); op(gate.g, 0);
    await fade(c, gate.g, 1, 500);
    await c.say('Kapalılık testi: işlemin sonucu kutuda kalıyor mu?', { speak: '[curious] Kapalılık testi: işlemin sonucu kutuda kalıyor mu?' });
    await gate.load(q(2), '+', q(7));
    await c.cont('Test et ›');
    await gate.run(calc(q(2), '+', q(7)));
    await c.say('9 kutuda kaldı: yeşil.', { speak: 'Dokuz kutuda kaldı: yeşil.' });
    await gate.load(q(4), '×', q(6));
    await c.cont('Test et ›');
    await gate.run(calc(q(4), '×', q(6)));
    await gate.load(q(3), MINUS, q(5));
    await yn(c, `<b>3 ${MINUS} 5 = ${MINUS}2</b>. Bu sonuç N’nin içinde mi?`, false, 'N’de sıfırın solu yok: 0, 1, 2, 3, …', 'Hayır. Bakalım jeton ne yapacak.');
    await gate.run(calc(q(3), MINUS, q(5)));
    await c.say('−2 kutunun dışına düştü: kırmızı.', { speak: 'Eksi iki kutunun dışına düştü: kırmızı.' });
    await c.say('Tek kırmızı yeter: N çıkarmada kapalı değil.', { speak: 'Tek kırmızı yeter: doğal sayılar çıkarmada kapalı değil.' });
    c.note(`<b>N = {0, 1, 2, 3, …}</b><br>3 ${MINUS} 5 = ${MINUS}2 ∉ N: çıkarmada kapalı değil.`, 'Doğal sayılar', 'c1-2');
  }

  async function c1Z(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    /* cüzdan ve fiş */
    const st = E('g', {}, root); op(st, 0);
    wallet(st, 300, 400); receipt(st, 800, 330, '5 lira');
    const coins = [0, 1, 2].map((i) => coin(st, 270 + i * 30, 350, 24, '1'));
    T(st, 300, 500, 'cüzdan: 3 lira', 28, 'var(--n)', { bold: 600 });
    await fade(c, st, 1, 500);
    await c.say('Cüzdanda 3 lira var; fiş 5 lira.', { speak: 'Cüzdanda üç lira var; fiş beş lira.' });
    for (let i = 0; i < 3; i++) await mv(c, coins[i], 748 + i * 52, 268, 550, ease.inOut);
    const need = T(st, 800, 440, '2 lira eksik', 34, 'var(--err)', { bold: 700 }); op(need, 0);
    await fade(c, need, 1, 400);
    const dbt = pill(st, q(-2), { x: 1050, y: 440, size: 34 }); put(dbt, { s: 0.001 });
    const ar = arrow(st, 952, 440, 1008, 440, 'z', 4); op(ar, 0);
    await par(fade(c, ar, 1, 300), pop(c, dbt, 1, 450));
    await c.say('2 lira eksik: borcun −2.', { speak: 'İki lira eksik: borcun eksi iki.' });
    await fade(c, st, 0, 450); st.remove();
    /* sayı doğrusu sola uzar */
    const nlG = E('g', {}, root); op(nlG, 0);
    const nl = numLine(nlG, { y: 400, x0: 640, u: 100, a: -5, b: 5, size: 32, col: (v) => (v < 0 ? 'var(--z)' : v === 0 ? 'var(--ink)' : 'var(--n)') });
    const negs = nl.ticks.filter((t) => t.v < 0).reverse();
    negs.forEach((t) => { op(t.tk, 0); op(t.lb, 0); t.tk.setAttribute('stroke', 'var(--z)'); });
    await fade(c, nlG, 1, 450);
    for (const t of negs) { await par(fade(c, t.tk, 1, 180), fade(c, t.lb, 1, 180)); await c.wait(90); }
    await c.say('Sayı doğrusu sıfırın soluna uzar.');
    const hop = G(nlG, nl.X(3), 400 - 52);
    const hopC = E('circle', { r: 24, fill: 'var(--n)', stroke: '#0F1420', 'stroke-width': 3 }, hop);
    await pop(c, hop, 1, 350);
    for (let v = 3; v > -2; v--) {
      const x1 = nl.X(v), x2 = nl.X(v - 1);
      const arc = E('path', { d: `M${x1},${370} Q${(x1 + x2) / 2},${290} ${x2},${370}`, fill: 'none', stroke: v - 1 < 0 ? 'var(--z)' : 'var(--n)', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.9 }, nlG);
      await par(drawIn(c, arc, 380, ease.linear), c.tween(380, (e) => put(hop, { x: lerp(x1, x2, e), y: 348 - 30 * Math.sin(e * Math.PI) })));
      nlG.appendChild(hop);
    }
    hopC.setAttribute('fill', 'var(--z)');
    tag(nlG, nl.X(-2), 262, `3 ${MINUS} 5 = ${MINUS}2`, 28, 'var(--z)');
    await c.say('3’ten 5 adım geri: −2. Yeni kutu: tam sayılar.', { speak: 'Üçten beş adım geri: eksi iki. Yeni kutu: tam sayılar.' });
    await fade(c, nlG, 0, 450); nlG.remove();
    /* aynı test Z'de */
    const mat = Mat(c, svg, root, { ...GLC, names: false }); op(mat.root, 0); mat.lit('N'); mat.lit('Z');
    const gate = Gate(c, root, mat, { key: 'Z', bare: true, ...GATE_C }); op(gate.g, 0);
    await par(fade(c, mat.root, 1, 500), fade(c, gate.g, 1, 500));
    await gate.load(q(3), MINUS, q(5));
    await c.cont('Test et ›');
    await gate.run(calc(q(3), MINUS, q(5)));
    await c.say('Aynı işlem Z’de yeşil.', { speak: 'Aynı işlem tam sayılarda yeşil.' });
    await gate.load(q(3), '÷', q(4));
    await yn(c, '<b>3 ÷ 4</b> işleminin sonucu Z’nin içinde mi?', false, '3 ÷ 4 = 0,75: 0 ile 1 arasında, tam sayı değil.', 'Hayır: 3/4 bir tam sayı değil.');
    await gate.run(calc(q(3), '÷', q(4)));
    await c.say('3 ÷ 4 tam sayı değil: Z bölmede kapalı değil.', { speak: 'Üç bölü dört tam sayı değil: tam sayılar bölmede kapalı değil.' });
    c.note(`<b>Z = {…, ${MINUS}1, 0, 1, …}</b><br>3 ÷ 4 ∉ Z: bölmede kapalı değil.`, 'Tam sayılar', 'c1-3');
  }

  async function c1Q(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    /* çikolata paylaşımı */
    const st = E('g', {}, root);
    const SQW = 38, SQH = 64, ppx = (j) => 690 + j * 156;
    const bars = [0, 1, 2].map((b) => {
      const bx = 70 + b * 190, g = G(st, bx, 480); const sq = [];
      for (let j = 0; j < 4; j++) {
        const s2 = G(g, j * (SQW + 2) + SQW / 2, 0);
        E('rect', { x: -SQW / 2, y: -SQH / 2, width: SQW, height: SQH, rx: 7, fill: '#7a4a2a', stroke: '#c78a55', 'stroke-width': 3 }, s2);
        sq.push(s2);
      }
      op(g, 0); return { g, sq, bx };
    });
    const ppl = [0, 1, 2, 3].map((j) => { const pg = person(st, ppx(j), 390, 'var(--q)', 1.25); op(pg, 0); return pg; });
    await par(...bars.map((b) => fade(c, b.g, 1, 400)), ...ppl.map((pp) => fade(c, pp, 1, 400)));
    for (let b = 0; b < 3; b++) {
      await par(...bars[b].sq.map((s2, j) => {
        const gx = bars[b].bx + s2._p.x; st.appendChild(s2); put(s2, { x: gx, y: 480 });
        return mv(c, s2, ppx(j) + (b - 1) * 42, 480, 700, ease.inOut);
      }));
    }
    const ex = rich(root, 330, 430, 64, [{ t: '3 ÷ 4  =  ' }, { frac: ['3', '4'], col: 'var(--q)' }]); op(ex, 0);
    await fade(c, ex, 1, 450);
    await c.say('3 çikolata, 4 kişi: herkese 3/4 düşer.', { speak: 'Üç çikolata, dört kişi: herkese üç bölü dört düşer.' });
    await par(fade(c, st, 0, 450), fade(c, ex, 0, 450)); st.remove(); ex.remove();
    /* tanım */
    const defn = rich(root, 640, 330, 56, [{ t: 'Q = { ', col: 'var(--q)' }, { frac: ['a', 'b'], col: 'var(--ink)' }, { t: '  :  a, b ∈ Z ,   ' }, { t: 'b ≠ 0', col: 'var(--warn)', hl: 'var(--warn)' }, { t: ' }' }]);
    op(defn, 0); await fade(c, defn, 1, 600);
    await c.say('Rasyonel sayı: iki tam sayının bölümü; payda sıfır olamaz.');
    await fade(c, defn, 0, 450); defn.remove();
    /* bu sayı Q'ya girer mi? */
    const mat = Mat(c, svg, root, { names: false }); op(mat.root, 0); ['N', 'Z', 'Q'].forEach((k) => mat.lit(k)); mat.dim('R', 0.35);
    const binG = G(root, 0, 0); op(binG, 0);
    const bin = E('rect', { x: 900, y: 636, width: 340, height: 72, rx: 20, fill: 'rgba(255,77,94,.10)', stroke: 'var(--err)', 'stroke-width': 3, 'stroke-dasharray': '10 7' }, binG);
    icon(binG, 'no', 940, 672, 0.8); T(binG, 1060, 672, 'Q’ya girmez', 30, 'var(--err)', { bold: 700 });
    await par(fade(c, mat.root, 1, 500), fade(c, binG, 1, 500));
    const toks = [{ t: q(5), id: '5' }, { t: q(-3), id: '-3' }, { t: { k: 'x', fn: '5', fd: '0', color: 'var(--ink)' }, id: '5/0' }];
    const xs0 = [250, 450, 650];
    const items = toks.map((tk, i) => ({ g: pill(root, tk.t, { x: xs0[i], y: 672, size: 30 }), id: tk.id, tok: tk, home: { x: xs0[i], y: 672, s: 1 }, aria: 'jeton ' + tk.id }));
    const pn = c.panel('Sıra sende', h('p', { class: 'q', html: 'Her sayıyı <b>Q</b> kutusuna ya da <b>“girmez”</b> kutusuna sürükle.' }));
    const fb = h('div'); pn.appendChild(fb);
    let left = items.length, doneRes; const donep = new Promise((r) => { doneRes = r; });
    const asFrac = async (it) => {
      const nn = it.tok.t.n, base = it.g._p.s;
      reface(it.g, { k: 'x', fn: String(Math.abs(nn)), fd: '1', neg: nn < 0, color: 'var(--q)' }, { size: 28, color: 'var(--q)' });
      await c.tween(420, (e) => put(it.g, { s: base * (1 + 0.28 * Math.sin(e * Math.PI)) }));
    };
    const place = async (it) => {
      if (it.id === '5/0') return { x: 1198, y: 672, s: 0.7 };
      const [sx, sy] = mat.slot('Q');
      await mv(c, it.g, sx, sy, 400, ease.inOut, { s: 0.9 }); await asFrac(it);
      return { x: sx, y: sy, s: 0.9 };
    };
    const sorter = Sorter(c, svg, {
      items, zones: [{ id: 'Q', hit: (x, y) => inside('Q', x, y), el: mat.box.Q }, { id: 'bin', hit: (x, y) => x > 880 && y > 620, el: bin }],
      onDrop: async (it, zid) => {
        const truth = it.id === '5/0' ? 'bin' : 'Q';
        if (zid !== truth) {
          c.feedback(fb, 'no', truth === 'bin' ? '<b>5/0 tanımsız.</b> Payda sıfır olamaz.' : `Girer: ${fh(it.tok.t)} = ${fh(it.tok.t)}/1.`);
          if (truth === 'bin') await shake(c, root, 5, 260);
          return false;
        }
        c.feedback(fb, 'ok', truth === 'bin' ? 'Doğru: 5/0 tanımsız, hiçbir kutuya girmez.' : `Doğru: ${fh(it.tok.t)} = ${fh(it.tok.t)}/1.`);
        const pos = await place(it);
        if (--left <= 0) doneRes();
        return pos;
      },
    });
    const r = await withSkip(c, donep);
    if (r === 'skip') for (const it of sorter.items) if (!it.placed) { it.placed = true; const pos = await place(it); await mv(c, it.g, pos.x, pos.y, 300, ease.inOut, { s: pos.s }); }
    pn.remove();
    await c.say('Her tam sayı rasyoneldir: 5 = 5/1.', { speak: 'Her tam sayı rasyoneldir: beş eşittir beş bölü bir.' });
    c.note(`<b>Q = { ${F('a', 'b')} : b ≠ 0 }</b><br>5 = ${F(5, 1)}: her tam sayı rasyoneldir.`, 'Rasyonel sayılar', 'c1-4');
  }

  const LAB_TRAY = {
    N: [0, 1, 2, 3, 4, 5, 6, 8, 12].map((n) => q(n)),
    Z: [-6, -3, -2, -1, 0, 1, 2, 3, 6].map((n) => q(n)),
    Q: [q(-3, 4), q(-1, 2), q(-1, 3), q(0), q(1, 4), q(1, 3), q(1, 2), q(2, 3), q(3, 4), q(5)],
  };
  async function c1Tablo(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const mat = Mat(c, svg, root, { ...GL, names: false }); op(mat.root, 0); mat.lit('N', true);
    const gate = Gate(c, root, mat, { key: 'N', bare: true }); op(gate.g, 0);
    const tbl = Tbl(c, root, { ...TBL_POS, rows: ['N', 'Z', 'Q'], cols: OPS }); op(tbl.g, 0);
    ['N', 'Z', 'Q'].forEach((r) => OPS.forEach((o2) => tbl.set(r, o2, 'e', false)));
    await par(fade(c, mat.root, 1, 600), fade(c, gate.g, 1, 600), fade(c, tbl.g, 1, 600));
    c.say('Tabloda üç kırmızı saklı: onları bul.', { noWait: true });
    const RED = ['N|' + MINUS, 'N|÷', 'Z|÷'];
    const st = { key: 'N', A: null, B: null, op: '+', busy: false };
    let doneRes; const donep = new Promise((r) => { doneRes = r; });
    const pn = c.panel('Sıra sende');
    const rowSet = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'Küme'));
    const setBtns = {};
    ['N', 'Z', 'Q'].forEach((k) => { const b = h('button', { class: 'lb' + (k === 'N' ? ' on' : ''), onclick: () => chooseSet(k) }, k); setBtns[k] = b; rowSet.append(b); });
    const trayRow = h('div', { class: 'rowc' });
    const rowOp = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'İşlem'));
    const opBtns = {};
    const summ = h('span', { style: { margin: '0 8px', fontSize: '1.05rem' } });
    const sum = () => { summ.innerHTML = `<b>${st.A ? fh(st.A) : '□'}</b> ${st.op} <b>${st.B ? fh(st.B) : '□'}</b>`; };
    OPS.forEach((o2) => { const b = h('button', { class: 'lb' + (o2 === '+' ? ' on' : ''), onclick: () => { st.op = o2; Object.values(opBtns).forEach((x) => x.classList.remove('on')); b.classList.add('on'); sum(); } }, o2); opBtns[o2] = b; rowOp.append(b); });
    const goBtn = h('button', { class: 'lb go', onclick: () => doTest() }, 'Test et ›');
    const task = h('div', { class: 'rowc', style: { color: 'var(--muted)', fontSize: '.9rem' } });
    const fb = h('div');
    pn.append(rowSet, h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'İki sayı')), trayRow, rowOp, h('div', { class: 'rowc' }, summ, goBtn), task, fb);
    const pick = (t) => { if (st.busy) return; if (!st.A || st.B) { st.A = t; st.B = null; } else st.B = t; sum(); };
    const buildTray = () => { trayRow.innerHTML = ''; LAB_TRAY[st.key].forEach((t) => trayRow.append(h('button', { class: 'lb', html: fh(t), onclick: () => pick(t) }))); };
    const chooseSet = (k) => { if (st.busy) return; st.key = k; st.A = st.B = null; ['N', 'Z', 'Q'].forEach((kk) => { setBtns[kk].classList.toggle('on', kk === k); mat.lit(kk, kk === k); }); buildTray(); sum(); gate.setKey(k); };
    const found = () => RED.filter((k) => tbl.cells[k].state === 'x').length;
    const refresh = () => {
      task.innerHTML = `<span>Bulunan kırmızı: <b>${found()}/3</b></span>`;
      task.append(h('button', { class: 'lb', style: { marginLeft: 'auto' }, onclick: () => c.feedback(fb, 'info', 'Çıkarmada küçük sayıdan büyüğünü çıkar. Bölmede tam bölünmeyen iki sayı seç.') }, 'İpucu'));
      if (found() === 3) doneRes('done');
    };
    buildTray(); sum(); refresh();
    const doTest = async () => {
      if (st.busy) return;
      if (!st.A || !st.B) { c.feedback(fb, 'info', 'Önce iki sayıya dokun.'); return; }
      st.busy = true; goBtn.disabled = true;
      const A2 = st.A, B2 = st.B, o2 = st.op, key = st.key + '|' + o2;
      try {
        await gate.load(A2, o2, B2);
        const r0 = calc(A2, o2, B2);
        if (r0 === undefined) { await gate.run(undefined); c.feedback(fb, 'info', '0’a bölme tanımsız; teste girmez.'); }
        else {
          const res = await gate.run(r0);
          const txt = `${lab(A2)} ${o2} ${lab(B2)} = ${lab(r0)}`;
          if (!res.ok) {
            if (tbl.cells[key].state !== 'x') await tbl.set(st.key, o2, 'x', true, `${lab(A2)}${o2}${lab(B2)}`);
            c.feedback(fb, 'ok', `<b>Karşı örnek:</b> ${txt} ∉ ${st.key}. Tek kırmızı yeter.`);
          } else {
            if (tbl.cells[key].state === 'e') await tbl.set(st.key, o2, '..');
            c.feedback(fb, 'info', `${txt}: yeşil. Kırmızıyı aramaya devam et.`);
          }
        }
      } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; return; }
      st.busy = false; goBtn.disabled = false; refresh();
    };
    await withSkip(c, donep);
    st.busy = true; pn.remove(); c.clearSay();
    await gate.clear();
    const final = { N: ['v', 'x', 'v', 'x'], Z: ['v', 'v', 'v', 'x'], Q: ['v', 'v', 'v', 'v'] };
    const ornek = { ['N|' + MINUS]: `3${MINUS}5`, 'N|÷': '3÷4', 'Z|÷': '3÷4' };
    for (const r of ['N', 'Z', 'Q']) for (let j = 0; j < 4; j++) {
      const k = r + '|' + OPS[j];
      if (tbl.cells[k].state !== final[r][j]) await tbl.set(r, OPS[j], final[r][j], true, ornek[k]);
    }
    await c.say('Üç kırmızı: N’de çıkarma ve bölme, Z’de bölme.', { speak: 'Üç kırmızı: doğal sayılarda çıkarma ve bölme, tam sayılarda bölme.' });
    await c.say('Yapılamayan işlem yeni kutu açar.', { speak: '[excited] Yapılamayan işlem yeni kutu açar.' });
    c.note('Kapalı: sonuç hep kutuda kalır.<br><b>Yapılamayan işlem yeni kutu açar.</b>', 'Kapalılık', 'c1-5');
  }

  /* ================================================================
     C2 — Ondalık açılımın adresi
     ================================================================ */
  async function c2Biten(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const big = E('g', {}, root); fracG(big, 560, 330, '1', '4', 120, 'var(--q)');
    T(big, 700, 330, '=  ?', 100, 'var(--ink)', { bold: 700, anchor: 'start' }); op(big, 0);
    await fade(c, big, 1, 500);
    await c.say('Kesrin ondalık yazılışı için payı paydaya böl.');
    await fade(c, big, 0, 400); big.remove();
    const ledger = Ledger(c, root, { x: 700, y: 120, w: 500, h: 300, rowH: 60 }); op(ledger.g, 0);
    const ld = LongDiv(c, root, { x: 170, y: 220, a: 1, b: 4, K: 6, ledger, fs: 38, dx: 44, rh: 50 });
    await par(ld.start(), fade(c, ledger.g, 1, 500));
    await ld.step();
    await c.say('10 ÷ 4 = 2, kalan 2.', { speak: 'On bölü dört eşittir iki, kalan iki.' });
    await ld.step();
    await c.say('20 ÷ 4 = 5, kalan 0.', { speak: 'Yirmi bölü dört eşittir beş, kalan sıfır.' });
    const res = rich(root, 640, 600, 60, [{ frac: ['1', '4'], col: 'var(--q)' }, { t: '  =  0,25', col: 'var(--ok)' }]); op(res, 0);
    await fade(c, res, 1, 500);
    await c.say('Kalan 0 olunca bölme biter.', { speak: 'Kalan sıfır olunca bölme biter.' });
    c.note(`Kalan 0 → ondalık <b>biter</b>.<br>${F(1, 4)} = 0,25`, 'Biten ondalık', 'c2-1');
  }

  async function c2Devreden(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const ledger = Ledger(c, root, { x: 700, y: 90, w: 500, h: 350, rowH: 60 }); op(ledger.g, 0);
    const ld = LongDiv(c, root, { x: 150, y: 150, a: 1, b: 3, K: 3, stop: false, ledger, fs: 36, dx: 42, rh: 46 });
    await par(ld.start(), fade(c, ledger.g, 1, 500));
    await ld.step();
    await c.say('10 ÷ 3 = 3, kalan 1.', { speak: 'On bölü üç eşittir üç, kalan bir.' });
    await c.say('Kalan yine 1: aynı adım geri gelir.', { speak: 'Kalan yine bir: aynı adım geri gelir.' });
    await ld.step(); await c.wait(300); await ld.step();
    await ld.over(0, 2, 'var(--q)');
    const r13 = rich(root, 150, 600, 56, [{ frac: ['1', '3'], col: 'var(--q)' }, { t: '  =  0,333…  =  ' }], { anchor: 'start' });
    const dd = decG(root, 150 + r13._w + 6, 600, 56, [{ t: '0,' }, { t: '3', over: true, col: 'var(--q)' }], 'var(--ink)', 'start');
    op(r13, 0); op(dd.g, 0);
    await par(fade(c, r13, 1, 500), fade(c, dd.g, 1, 500));
    await c.say('Üçler bitmez: buna devreden ondalık denir.');
    await c.choice({
      q: '0,333… hiç bitmiyor. Bu sayı hâlâ bir kesir mi?', options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Bitmemesi sorun değil: bu sayı 1/3’ün ta kendisi.'],
      right: 'Evet: 1/3. Yazılışı değişti, sayı değişmedi.',
    });
    c.note(`Kalan tekrar ederse ondalık <b>devreder</b>.<br>${F(1, 3)} = 0,${ov('3')}`, 'Devreden ondalık', 'c2-2');
  }

  async function c2Yedi(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const big = E('g', {}, root); fracG(big, 560, 330, '1', '7', 120, 'var(--q)');
    T(big, 700, 330, '=  ?', 100, 'var(--ink)', { bold: 700, anchor: 'start' }); op(big, 0);
    await fade(c, big, 1, 500);
    await c.choice({
      q: 'Bölen <b>7</b> ise sıfırdan farklı <b>kaç ayrı kalan</b> çıkabilir?', options: ['5', '6', '7', 'Sonsuz'], answer: 1,
      hints: ['Kalan 1, 2, 3, 4, 5 ya da 6 olabilir: altı değer.', '', 'Kalan 0 olsaydı bölme biterdi. Geriye 1’den 6’ya altı değer kalır.', 'Kalan her zaman bölenden küçüktür; sonsuz çeşit olamaz.'],
      right: 'Evet, altı. Bakalım 1/7’de hangileri çıkacak.', next: 'Böl ›',
    });
    await fade(c, big, 0, 400); big.remove();
    /* altı kalan kutusu */
    const BX = E('g', {}, root); op(BX, 0);
    const boxes = {};
    for (let i = 1; i <= 6; i++) {
      const bg = G(BX, 800 + ((i - 1) % 3) * 150, 250 + Math.floor((i - 1) / 3) * 150);
      bg._r = E('rect', { x: -58, y: -58, width: 116, height: 116, rx: 20, fill: 'rgba(255,255,255,.04)', stroke: 'var(--line)', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, bg);
      boxes[i] = bg;
    }
    const fillBox = async (r) => {
      const bg = boxes[r];
      if (bg._full) { bg._r.setAttribute('stroke', 'var(--warn)'); bg._r.setAttribute('stroke-width', 6); return c.tween(420, (k) => put(bg, { s: 1 + 0.14 * Math.sin(k * Math.PI) }), ease.linear); }
      bg._full = true; bg._r.setAttribute('stroke', 'var(--q)'); bg._r.setAttribute('fill', 'rgba(108,140,240,.16)'); bg._r.removeAttribute('stroke-dasharray');
      const g = G(bg, 0, 0); T(g, 0, 2, String(r), 52, 'var(--ink)', { bold: 700, mono: true });
      return pop(c, g, 1, 300);
    };
    const ld = LongDiv(c, root, { x: 110, y: 110, a: 1, b: 7, K: 8, fs: 30, dx: 34, rh: 38, fast: true });
    await par(ld.start(), fade(c, BX, 1, 500));
    await fillBox(1);
    await c.say('Bölen 7: kalan yalnızca 1, 2, 3, 4, 5, 6 olabilir.', { speak: 'Bölen yedi: kalan yalnızca bir, iki, üç, dört, beş, altı olabilir.' });
    for (let i = 0; i < ld.K; i++) { const s2 = await ld.step(); await fillBox(s2.rem); await c.wait(200); }
    await c.say('Altı kutu doldu; kalan 1 geri geldi.', { speak: 'Altı kutu doldu; kalan bir geri geldi.' });
    await ld.ring(0, 5, 'var(--q)');
    await c.say('Aynı kalan aynı rakamları getirir: 142857 tekrar eder.', { speak: 'Aynı kalan aynı rakamları getirir: bir, dört, iki, sekiz, beş, yedi tekrar eder.' });
    await c.say('Kalan ya 0 olur ya tekrar eder: üçüncü yol yok.', { speak: 'Kalan ya sıfır olur ya tekrar eder: üçüncü yol yok.' });
    c.note(`<b>Biten ya da devreden: rasyonel.</b><br>${F(1, 7)} = 0,${ov('142857')}`, 'Üçüncü yol yok', 'c2-3');
  }

  /* kalan zinciri: r0 → r1 → r2 … (yanlış kutuya bırakılan kesrin ipucu) */
  async function remChain(c, p, x, y, a, b, k) {
    const inf = divInfo(a, b, k, false);
    const rems = [inf.r0, ...inf.steps.map((s2) => s2.rem)];
    const g = E('g', {}, p);
    T(g, x - 70, y, 'kalanlar', 26, MUTED, { anchor: 'end', bold: 600 });
    for (let i = 0; i < rems.length; i++) {
      const pl = pill(g, { k: 'x', txt: String(rems[i]) }, { x: x + i * 120, y, size: 30, color: rems[i] === 0 ? 'var(--ok)' : 'var(--q)' });
      put(pl, { s: 0.001 });
      if (i > 0) arrow(g, x + (i - 1) * 120 + 40, y, x + i * 120 - 42, y, 'muted', 3);
      await pop(c, pl, 1, 260);
    }
    return g;
  }
  async function c2Sirala(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const zones = [{ id: 'term', x: 70, label: 'BİTER', col: 'var(--ok)', fill: 'rgba(61,220,151,.07)' }, { id: 'rep', x: 670, label: 'DEVREDER', col: 'var(--q)', fill: 'rgba(108,140,240,.08)' }].map((z) => {
      const g = G(root, 0, 0); op(g, 0);
      const r = E('rect', { x: z.x, y: 70, width: 540, height: 300, rx: 26, fill: z.fill, stroke: z.col, 'stroke-width': 3, 'stroke-dasharray': '10 7' }, g);
      T(g, z.x + 270, 110, z.label, 38, z.col, { bold: 800 });
      return { ...z, g, el: r, n: 0, hit: (x, y) => x > z.x && x < z.x + 540 && y > 70 && y < 370 };
    });
    await par(...zones.map((z) => fade(c, z.g, 1, 500)));
    const items = [[5, 6], [1, 8], [4, 9], [2, 5]].map(([a, b], i) => {
      const xx = 215 + i * 280, g = pill(root, { k: 'q', n: a, d: b }, { x: xx, y: 610, size: 36, color: 'var(--ink)' });
      return { g, a, b, id: a + '/' + b, home: { x: xx, y: 610, s: 1 }, aria: `${a}/${b}` };
    });
    c.say('Kalanlara bak: sıfıra mı varıyor, tekrar mı ediyor?', { noWait: true });
    const pn = c.panel('Sıra sende', h('p', { class: 'q', html: 'Her kesri <b>biter</b> ya da <b>devreder</b> kutusuna sürükle.' }));
    const fb = h('div'); pn.appendChild(fb);
    let left = items.length, doneRes, chain = null; const donep = new Promise((r) => { doneRes = r; });
    const place = (it) => {
      const z = zones.find((zz) => zz.id === (terminates(it.a, it.b) ? 'term' : 'rep')); const k = z.n++;
      const sx = z.x + 100 + (k % 2) * 250, sy = 200 + Math.floor(k / 2) * 100;
      const d = decOf(it.a, it.b); const parts = [{ t: '=' + d.ip + ',' + d.pre.join('') }]; if (d.rep.length) parts.push({ t: d.rep.join(''), over: true, col: 'var(--q)' });
      const dg = decG(root, sx + 56, sy, 28, parts, 'var(--ink)', 'start'); op(dg.g, 0); nf(fade(c, dg.g, 1, 500));
      return { x: sx, y: sy, s: 0.85 };
    };
    const sorter = Sorter(c, svg, {
      items, zones,
      onDrop: async (it, zid) => {
        if (chain) { chain.remove(); chain = null; }
        const term = terminates(it.a, it.b);
        if (zid !== (term ? 'term' : 'rep')) {
          c.feedback(fb, 'no', term ? 'Kalan 0’a varıyor: bölme biter.' : 'Aynı kalan geri geliyor: bölme devreder.');
          chain = await remChain(c, root, 470, 470, it.a, it.b, 3);
          return false;
        }
        c.feedback(fb, 'ok', `Doğru: ${it.a}/${it.b} = <b>${decPlain(it.a, it.b, 3)}</b>`);
        if (--left <= 0) doneRes();
        return place(it);
      },
    });
    const r = await withSkip(c, donep);
    if (chain) chain.remove();
    if (r === 'skip') for (const it of sorter.items) if (!it.placed) { it.placed = true; const pos = place(it); await mv(c, it.g, pos.x, pos.y, 300, ease.inOut, { s: pos.s }); }
    pn.remove();
    await c.say('Dördü de rasyonel: ya bitiyor ya devrediyor.', { speak: '[excited] Dördü de rasyonel: ya bitiyor ya devrediyor.' });
    c.note(`${F(1, 8)} = 0,125 biter · ${F(5, 6)} = 0,8${ov('3')} devreder<br>İkisi de rasyonel.`, 'Biter mi, devreder mi?', 'c2-4');
  }

  /* ================================================================
     C3 — Sayı doğrusundaki delik
     ================================================================ */
  async function c3Kosegen(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    /* birim kare */
    const V = E('g', {}, root); op(V, 0);
    E('rect', { x: 90, y: 230, width: 160, height: 160, rx: 4, fill: 'rgba(108,140,240,.15)', stroke: 'var(--q)', 'stroke-width': 4 }, V);
    T(V, 170, 418, '1', 34, 'var(--q)', { bold: 700 }); T(V, 62, 310, '1', 34, 'var(--q)', { bold: 700 });
    const dgl = E('line', { x1: 90, y1: 390, x2: 250, y2: 230, stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linecap': 'round' }, V); op(dgl, 0);
    await fade(c, V, 1, 500);
    await drawIn(c, dgl, 700);
    T(V, 150, 280, 'd', 40, 'var(--irr)', { bold: 800 });
    await c.say('Kenarı 1 olan karenin köşegenine d diyelim.', { speak: 'Kenarı bir olan karenin köşegenine d diyelim.' });
    /* alan yöntemi */
    const BIG = E('g', {}, root);
    const cells = [[400, 140], [560, 140], [400, 300], [560, 300]].map(([x, y]) => { const r = E('rect', { x, y, width: 160, height: 160, fill: 'rgba(108,140,240,.12)', stroke: 'var(--q)', 'stroke-width': 3 }, BIG); op(r, 0); return r; });
    for (const r of cells) await fade(c, r, 1, 280);
    const rot = E('polygon', { points: '560,140 720,300 560,460 400,300', fill: 'rgba(233,107,168,.38)', stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linejoin': 'round' }, BIG); op(rot, 0);
    await fade(c, rot, 1, 700);
    await c.say('Dört kareyi birleştir, kenar ortalarını bağla.');
    const halves = [[453, 193], [667, 193], [667, 407], [453, 407]].map(([x, y]) => { const t = T(BIG, x, y, '½', 34, 'var(--ink)', { bold: 700 }); op(t, 0); return t; });
    await par(...halves.map((t) => fade(c, t, 1, 400)));
    const e1 = T(root, 780, 220, '4 − 4·½ = 2', 44, 'var(--ink)', { anchor: 'start', bold: 700 }); op(e1, 0);
    await fade(c, e1, 1, 450);
    await c.say('Eğik karenin alanı 2, kenarı d.', { speak: 'Eğik karenin alanı iki, kenarı d.' });
    const e2 = T(root, 780, 310, 'd · d = 2', 48, 'var(--irr)', { anchor: 'start', bold: 800 }); op(e2, 0);
    await fade(c, e2, 1, 450);
    const e3 = T(root, 780, 400, 'd = √2', 56, 'var(--irr)', { anchor: 'start', bold: 800 }); op(e3, 0);
    await fade(c, e3, 1, 450);
    await c.say('Kendisiyle çarpılınca 2 veren sayı: √2.', { speak: 'Kendisiyle çarpılınca iki veren sayı: karekök iki.' });
    await c.choice({
      q: 'd uzunluğu bir <b>kesir</b> olarak yazılabilir mi?', options: ['Evet, uygun bir kesir bulunur', 'Hayır, hiçbir kesir olmaz'], answer: 1,
      hints: ['Çok yakın kesirler var; ama hiçbiri tam oturmuyor. Sayı doğrusunda bakalım.', ''],
      right: 'Doğru sezgi. Sayı doğrusunda görelim.',
    });
    await par(fade(c, V, 0, 450), fade(c, BIG, 0, 450), fade(c, e1, 0, 450), fade(c, e2, 0, 450), fade(c, e3, 0, 450));
    root.innerHTML = '';
    /* pergelle sayı doğrusuna indir */
    const NLg = E('g', {}, root); op(NLg, 0);
    numLine(NLg, { y: 520, x0: 240, u: 300, a: 0, b: 3, size: 36, pad: 30, padR: 90 });
    const Rr = 300 * Math.SQRT2, cx0 = 240, cy0 = 520, a0 = Math.PI / 4;
    const sx = cx0 + Rr * Math.cos(a0), sy = cy0 - Rr * Math.sin(a0), ex = cx0 + Rr;
    E('rect', { x: 240, y: 220, width: 300, height: 300, fill: 'rgba(108,140,240,.10)', stroke: 'var(--q)', 'stroke-width': 3 }, NLg);
    E('line', { x1: cx0, y1: cy0, x2: sx, y2: sy, stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linecap': 'round' }, NLg);
    T(NLg, 360, 350, 'd', 44, 'var(--irr)', { bold: 800 });
    await fade(c, NLg, 1, 500);
    const arc = E('path', { d: '', fill: 'none', stroke: 'var(--irr)', 'stroke-width': 4, 'stroke-dasharray': '9 7', 'stroke-linecap': 'round' }, NLg);
    const pen = E('circle', { r: 11, fill: 'var(--irr)', stroke: '#0F1420', 'stroke-width': 2 }, NLg);
    await c.tween(1600, (e) => {
      const th = a0 * (1 - e), px = cx0 + Rr * Math.cos(th), py = cy0 - Rr * Math.sin(th);
      pen.setAttribute('cx', px); pen.setAttribute('cy', py);
      arc.setAttribute('d', `M${sx},${sy} A${Rr},${Rr} 0 0 1 ${px},${py}`);
    });
    pen.remove();
    const hole = G(NLg, ex, cy0);
    E('circle', { r: 13, fill: '#0F1420', stroke: 'var(--irr)', 'stroke-width': 4 }, hole);
    await pop(c, hole, 1, 450);
    tag(NLg, ex + 40, cy0 - 120, '√2', 38, 'var(--irr)');
    await c.say('Pergelle köşegeni sayı doğrusuna indir.');
    for (const [a, b, lx] of [[7, 5, 560], [3, 2, 790]]) {
      const fx = 240 + 300 * (a / b);
      E('line', { x1: fx, x2: fx, y1: 500, y2: 540, stroke: 'var(--q)', 'stroke-width': 3 }, NLg);
      E('line', { x1: fx, y1: 544, x2: lx, y2: 618, stroke: 'var(--q)', 'stroke-width': 2, opacity: 0.8 }, NLg);
      fracG(NLg, lx, 656, String(a), String(b), 28, 'var(--q)');
      await c.wait(450);
    }
    await c.say('7/5 ve 3/2 yakın; ama üstüne oturmuyor.', { speak: 'Yedi bölü beş ve üç bölü iki yakın; ama üstüne oturmuyor.' });
    c.note('d · d = 2 → <b>d = √2</b><br>Sayı doğrusunda var, kesir değil.', 'Köşegen', 'c3-1');
  }

  async function c3Ondalik(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const S2 = Math.SQRT2, AX = 300, X0 = 160, XW = 960;
    const NS = [14, 141], lo = [1.0, 1.4, 1.41], wd = [1, 0.1, 0.01];
    let vLo = 1, vHi = 2, bandRange = null;
    const AG = E('g', {}, root); op(AG, 0);
    E('line', { x1: 120, x2: 1160, y1: AX, y2: AX, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round' }, AG);
    const band = E('rect', { y: AX - 15, height: 30, rx: 8, fill: 'var(--irr)', 'fill-opacity': 0.5, stroke: 'var(--irr)', 'stroke-width': 2, opacity: 0 }, AG);
    const stg = lo.map((l0, s) => {
      const ticks = [];
      for (let i = 0; i <= 10; i++) {
        const tk = E('line', { y1: AX - 10, y2: AX + 10, stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' }, AG);
        const lb = i % 5 === 0 ? T(AG, 0, AX + 40, (l0 + (i * wd[s]) / 10).toFixed(s + 1).replace('.', ','), 26, 'var(--ink)', { bold: 700 }) : null;
        ticks.push({ tk, lb, v: l0 + (i * wd[s]) / 10 });
      }
      return ticks;
    });
    const pt = G(AG, 0, AX);
    E('circle', { r: 11, fill: 'var(--irr)', stroke: '#0F1420', 'stroke-width': 3 }, pt);
    const ptl = T(AG, 0, AX - 52, '√2', 40, 'var(--irr)', { bold: 800 });
    const X = (v) => X0 + ((v - vLo) / (vHi - vLo)) * XW;
    const render = () => {
      const lg = Math.log10(vHi - vLo);
      stg.forEach((ticks, s) => {
        const al = clamp(1 - Math.abs(lg + s), 0, 1);
        ticks.forEach((t) => {
          const x = X(t.v), vis = al > 0.02 && x > 130 && x < 1150;
          t.tk.setAttribute('x1', x); t.tk.setAttribute('x2', x); t.tk.setAttribute('opacity', vis ? al : 0);
          if (t.lb) { t.lb.setAttribute('x', x); t.lb.setAttribute('opacity', vis ? clamp(2 * al - 1, 0, 1) : 0); } // iki ölçeğin etiketi aynı anda görünmez
        });
      });
      put(pt, { x: X(S2) }); ptl.setAttribute('x', X(S2));
      if (bandRange) { const x1 = X(bandRange[0]), x2 = X(bandRange[1]); band.setAttribute('x', x1); band.setAttribute('width', Math.max(2, x2 - x1)); }
    };
    render();
    const zoom = async (s, ms) => {
      const lo0 = vLo, hi0 = vHi, lo1 = lo[s + 1], hi1 = lo[s + 1] + wd[s + 1];
      const r = (hi1 - lo1) / (hi0 - lo0), ps = (lo1 - lo0 * r) / (1 - r);
      await c.tween(ms, (e) => { const re = Math.pow(r, e); vLo = ps + (lo0 - ps) * re; vHi = ps + (hi0 - ps) * re; render(); }, ease.inOut);
      vLo = lo1; vHi = hi1; render();
    };
    const cardsG = E('g', {}, root);
    const sqCards = (s) => {
      cardsG.innerHTML = '';
      [[NS[s], 'az', 'var(--ok)', 330], [NS[s] + 1, 'fazla', 'var(--warn)', 950]].forEach(([nn, w2, col, xx]) => {
        const g = G(cardsG, xx, 520); op(g, 0);
        T(g, 0, 0, `${decStrN(nn, s + 1)}² = ${sqDecN(nn, s + 1)}`, 40, 'var(--ink)', { bold: 700 });
        T(g, 0, 52, w2, 30, col, { bold: 700 });
        nf(fade(c, g, 1, 450));
      });
    };
    await fade(c, AG, 1, 500);
    bandRange = [1.4, 1.5]; render(); await fade(c, band, 1, 400);
    sqCards(0);
    await c.say('A8’deki gibi sıkıştır: √2, 1,4 ile 1,5 arasında.', { speak: 'A sekiz dersindeki gibi sıkıştır: karekök iki, bir virgül dört ile bir virgül beş arasında.' });
    cardsG.innerHTML = '';
    await zoom(0, 1300);
    bandRange = [1.41, 1.42]; render();
    sqCards(1);
    await c.say('Yakınlaş: şimdi 1,41 ile 1,42 arasında.', { speak: 'Yakınlaş: şimdi bir virgül kırk bir ile bir virgül kırk iki arasında.' });
    await c.say('Her yakınlaşmada yeni bir rakam çıkar.');
    await par(fade(c, AG, 0, 450), fade(c, cardsG, 0, 450)); AG.remove(); cardsG.remove();
    /* rakam şeritleri: her şerit tek yazı öğesi */
    const DG = E('g', {}, root);
    const dig = isqrtDigits(24), FSZ = 44;
    T(DG, 250, 170, '√2 =', FSZ, 'var(--irr)', { anchor: 'end', bold: 800 });
    const d2 = T(DG, 270, 170, '', FSZ, 'var(--ink)', { anchor: 'start', mono: true, bold: 700 });
    for (let i = 1; i <= dig.length; i++) { d2.textContent = dig.slice(0, i) + (i === dig.length ? '…' : ''); await c.wait(90); }
    await c.say('√2’nin rakamlarında tekrar eden blok yok.', { speak: 'Karekök ikinin rakamlarında tekrar eden blok yok.' });
    T(DG, 250, 330, '1/7 =', FSZ, 'var(--q)', { anchor: 'end', bold: 800 });
    const s7 = '0,' + '142857'.repeat(4);
    const d7 = T(DG, 270, 330, '', FSZ, 'var(--ink)', { anchor: 'start', mono: true, bold: 700 });
    for (let i = 1; i <= s7.length; i++) { d7.textContent = s7.slice(0, i) + (i === s7.length ? '…' : ''); await c.wait(60); }
    for (let b = 0; b < 4; b++) {
      const x1 = d7.getStartPositionOfChar(2 + b * 6).x, x2 = d7.getEndPositionOfChar(7 + b * 6).x;
      const rr = E('rect', { x: x1 - 3, y: 330 - 32, width: x2 - x1 + 6, height: 64, rx: 18, fill: 'none', stroke: 'var(--q)', 'stroke-width': 3.5 }, DG);
      await drawIn(c, rr, 350);
    }
    await c.say('1/7’de 142857 bloğu dönüp duruyor.', { speak: 'Bir bölü yedide bir, dört, iki, sekiz, beş, yedi bloğu dönüp duruyor.' });
    const l1 = T(DG, 640, 500, 'devreder → rasyonel', 40, 'var(--q)', { bold: 800 });
    const l2 = T(DG, 640, 580, 'ne biter ne devreder → irrasyonel', 40, 'var(--irr)', { bold: 800 }); op(l1, 0); op(l2, 0);
    await fade(c, l1, 1, 450); await fade(c, l2, 1, 450);
    await c.say('Ne biter ne devreder: buna irrasyonel sayı denir.');
    c.note('<b>Ne biter ne devreder: irrasyonel.</b><br>√2 = 1,41421356…', 'İrrasyonel sayı', 'c3-2');
  }

  async function c3Delik(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const RG = E('g', {}, root); op(RG, 0);
    const nl2 = numLine(RG, { y: 400, x0: 240, u: 300, a: 0, b: 3, size: 36, pad: 30, padR: 90 });
    const holes = [[Math.SQRT2, '√2'], [Math.sqrt(3), '√3'], [Math.PI, 'π']];
    const hX = holes.map(([v]) => nl2.X(v));
    for (let k = 0; k <= 72; k++) {
      const x = nl2.X(k / 24);
      if (hX.some((hx) => Math.abs(hx - x) < 7)) continue;
      E('circle', { cx: x, cy: 400, r: 4.5, fill: 'var(--q)', opacity: 0.9 }, RG);
    }
    await fade(c, RG, 1, 500);
    const hol = holes.map(([, nm], i) => { const g = G(RG, hX[i], 400); g._c = E('circle', { r: 12, fill: '#0F1420', stroke: 'var(--irr)', 'stroke-width': 4 }, g); T(g, 0, -52, nm, 38, 'var(--irr)', { bold: 800 }); put(g, { s: 0.001 }); return g; });
    for (const g of hol) { await pop(c, g, 1, 400); await c.wait(250); }
    await c.say('Kesirler doğruyu doldurmuyor: delikler kalıyor.');
    const fill = E('line', { x1: nl2.X(0) - 22, x2: nl2.X(0) - 22, y1: 400, y2: 400, stroke: 'var(--r)', 'stroke-width': 10, 'stroke-linecap': 'round', opacity: 0.8 }, RG);
    RG.insertBefore(fill, hol[0]);
    await c.tween(1600, (e) => fill.setAttribute('x2', lerp(nl2.X(0) - 22, nl2.X(3) + 70, e)), ease.inOut);
    hol.forEach((g) => g._c.setAttribute('fill', 'var(--irr)'));
    const rl = rich(root, 640, 200, 68, [{ t: 'R  =  ', col: 'var(--r)' }, { t: 'Q', col: 'var(--q)' }, { t: '  ∪  ' }, { t: 'Q′', col: 'var(--irr)' }]); op(rl, 0);
    await fade(c, rl, 1, 600);
    await c.say('Delikleri irrasyoneller doldurur: hepsi birlikte gerçek sayılar.');
    await c.say('Hız ya da kuvvet gibi ölçümler gerçek sayıyla ifade edilir.');
    await par(fade(c, RG, 0, 450), fade(c, rl, 0, 450)); RG.remove(); rl.remove();
    /* alanı 1, 2, 3, 4 olan kareler */
    const SQ = E('g', {}, root);
    const sideTxt = { 1: '1', 2: '√2', 3: '√3', 4: '2' };
    const sq = [1, 2, 3, 4].map((ar, i) => {
      const side = 112 * Math.sqrt(ar), xx = 190 + i * 300, g = G(SQ, xx, 290); op(g, 0);
      const perfect = ar === 1 || ar === 4;
      E('rect', { x: -side / 2, y: -side / 2, width: side, height: side, rx: 4, fill: perfect ? 'rgba(61,220,151,.14)' : 'rgba(233,107,168,.14)', stroke: perfect ? 'var(--ok)' : 'var(--irr)', 'stroke-width': 4, 'stroke-dasharray': perfect ? null : '9 6' }, g);
      T(g, 0, 0, 'alan ' + ar, 28, 'var(--ink)', { bold: 700 });
      g._side = T(g, 0, 165, 'kenar ?', 34, MUTED, { bold: 700 });
      return g;
    });
    for (const g of sq) { await fade(c, g, 1, 300); }
    await c.choice({
      q: 'Alanı <b>4</b> olan karenin kenarı rasyonel mi?', options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Kenar √4 = 2. Kök işareti var diye irrasyonel olmaz.'],
      right: 'Evet: √4 = 2.',
    });
    sq.forEach((g, i) => { g._side.textContent = 'kenar ' + sideTxt[i + 1]; g._side.style.fill = i === 0 || i === 3 ? 'var(--ok)' : 'var(--irr)'; });
    await c.say('Kök içi tam kareyse sonuç rasyonel: √4 = 2.', { speak: 'Kök içi tam kareyse sonuç rasyonel: karekök dört eşittir iki.' });
    await c.say('Tam kare değilse kenar irrasyonel: √2, √3.', { speak: 'Tam kare değilse kenar irrasyonel: karekök iki, karekök üç.' });
    await fade(c, SQ, 0, 450); SQ.remove();
    /* kapalılık tablosuna R satırı */
    const KT = E('g', {}, root); op(KT, 0);
    const tbl = Tbl(c, KT, { x: 250, y: 150, cw: 86, ch: 72, hw: 74, hh: 54, rows: ['N', 'Z', 'Q', 'R'], cols: OPS });
    const onceki = { N: ['v', 'x', 'v', 'x'], Z: ['v', 'v', 'v', 'x'], Q: ['v', 'v', 'v', 'v'] };
    Object.entries(onceki).forEach(([r, arr]) => OPS.forEach((o2, j) => tbl.set(r, o2, arr[j], false)));
    OPS.forEach((o2) => tbl.set('R', o2, 'e', false));
    const gen = T(KT, 900, 330, 'a, b ∈ R  ⇒  a · b ∈ R', 40, 'var(--r)', { bold: 800 }); op(gen, 0);
    await fade(c, KT, 1, 500);
    for (const o2 of OPS) await tbl.set('R', o2, 'v');
    await fade(c, gen, 1, 450);
    await c.say('Gerçek sayılar dört işlemde de kapalıdır; sıfıra bölme hariç.');
    c.note('<b>R = Q ∪ Q′</b><br>R dört işlemde kapalı: a · b ∈ R', 'Gerçek sayılar', 'c3-3');
  }

  async function c3Sirala(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const mat = Mat(c, svg, root, { band: true, names: false }); op(mat.root, 0);
    ['N', 'Z', 'Q', 'R'].forEach((k) => mat.lit(k));
    mat.band.setAttribute('fill-opacity', 0.1);
    tag(mat.root, 100, 196, 'Q′', 30, 'var(--irr)');
    await fade(c, mat.root, 1, 500);
    c.say('Önce sadeleştir, sonra en küçük kutuya koy.', { noWait: true });
    const X0 = (txt) => ({ k: 'x', txt, color: 'var(--ink)' });
    const cards = [
      { id: '0,25', tok: X0('0,25'), truth: 'Q', ok: '0,25 = 1/4: biten ondalık.', no: '0,25 = 1/4: tam sayı değil, ama bir kesir.' },
      { id: 'sqrt2', tok: X0('√2'), truth: 'Qp', ok: 'Ne biter ne devreder: irrasyonel.', no: '√2 hiçbir kesre eşit değil: kesikli Q′ bandına.' },
      { id: '0', tok: X0('0'), truth: 'N', ok: '0 doğal sayıdır.', no: '0 bir doğal sayıdır: en içteki kutu.' },
      { id: 'sqrt9', tok: X0('√9'), truth: 'N', ok: '√9 = 3: doğal sayı.', no: '√9 = 3. Kök içi tam kare.' },
      { id: '-7', tok: X0(MINUS + '7'), truth: 'Z', ok: 'Eksi tam sayı: Z.', no: '−7 eksi bir tam sayı: N’de yok, Z’de var.' },
      { id: 'pi', tok: X0('π'), truth: 'Qp', ok: 'π ne biter ne devreder.', no: 'π = 3,14159…: ne biter ne devreder.' },
      { id: '0,3d', tok: { k: 'x', dec: [{ t: '0,' }, { t: '3', over: true }], color: 'var(--ink)' }, truth: 'Q', ok: 'Devreden ondalık: 1/3.', no: 'Devreden ondalık rasyoneldir: 0,333… = 1/3.' },
      { id: '12/4', tok: { k: 'x', fn: '12', fd: '4', color: 'var(--ink)' }, truth: 'N', ok: '12/4 = 3: doğal sayı.', no: 'Önce sadeleştir: 12/4 = 3.' },
    ];
    const valid = { N: ['N', 'Z', 'Q'], Z: ['Z', 'Q'], Q: ['Q'], Qp: ['Qp'] };
    const items = cards.map((cd, i) => { const g = pill(root, cd.tok, { x: 115 + i * 150, y: 672, size: 28 }); put(g, { s: 0.001 }); return { g, cd, id: cd.id, home: { x: 115 + i * 150, y: 672, s: 1 }, aria: cd.id }; });
    for (const it of items) { nf(pop(c, it.g, 1, 250)); await c.wait(80); }
    const zones = ['N', 'Z', 'Q', 'Qp'].map((k) => ({ id: k, el: k === 'Qp' ? mat.box.R : mat.box[k], hit: (x, y) => regionAt(x, y) === k }));
    const pn = c.panel('Sıra sende', h('p', { class: 'q', html: 'Her sayıyı <b>en küçük kutusuna</b> sürükle: N, Z, Q ya da kesikli Q′ bandı.' }));
    const fb = h('div'); pn.appendChild(fb);
    let left = items.length, doneRes; const donep = new Promise((r) => { doneRes = r; });
    const land = (it) => { const [sx, sy] = mat.slot(it.cd.truth); it.g.setCol(COLV[it.cd.truth]); return { x: sx, y: sy, s: Math.min(0.9, 112 / it.g._w) }; };
    const sorter = Sorter(c, svg, {
      items, zones,
      onDrop: async (it, zid) => {
        const cd = it.cd;
        if (zid !== cd.truth && !valid[cd.truth].includes(zid)) {
          c.feedback(fb, 'no', cd.no); nf(mat.pulse(zid, 'var(--err)', 1, 250)); await shake(c, root, 6, 280); return false;
        }
        c.feedback(fb, zid === cd.truth ? 'ok' : 'info', zid === cd.truth ? `<b>Doğru.</b> ${cd.ok}` : `Olur, ama daha küçük bir kutu var: ${cd.ok}`);
        nf(mat.pulse(cd.truth, 'var(--ok)', 1, 350));
        if (--left <= 0) doneRes();
        return land(it);
      },
    });
    const r = await withSkip(c, donep);
    if (r === 'skip') for (const it of sorter.items) if (!it.placed) { it.placed = true; const pos = land(it); nf(mv(c, it.g, pos.x, pos.y, 500, ease.inOut, { s: pos.s })); }
    pn.remove(); c.clearSay();
    await c.wait(600);
    await c.say('Kılık değiştirenlere dikkat: 12/4 = 3, √9 = 3.', { speak: 'Kılık değiştirenlere dikkat: on iki bölü dört eşittir üç, karekök dokuz eşittir üç.' });
    await c.say('Ne biter ne devreder: irrasyonel.', { speak: '[excited] Ne biter ne devreder: irrasyonel.' });
    c.note('Önce sadeleştir: 12/4 = 3, √9 = 3.<br>Sonra en küçük kutu.', 'Hangi kutu?', 'c3-4');
  }

  /* ================================================================
     C4 — Sıralama ve arada olma
     ================================================================ */
  async function c4Sonraki(c) {
    const svg = newSvg(c); const root = E('g', {}, svg); op(root, 0);
    const z = ZoomLine(c, root, { y: 380, x0: 160, x1: 1120, lo: -0.3, hi: 6.3 });
    for (let n = 0; n <= 6; n++) z.add(n, String(n));
    await fade(c, root, 1, 500);
    const arc = E('path', { d: `M${z.X(3)},350 Q${(z.X(3) + z.X(4)) / 2},250 ${z.X(4)},350`, fill: 'none', stroke: 'var(--n)', 'stroke-width': 5, 'stroke-linecap': 'round', 'marker-end': 'url(#ar-n)' }, root);
    await drawIn(c, arc, 600);
    await c.say('3’ten sonraki tam sayı 4.', { speak: 'Üçten sonraki tam sayı dört.' });
    await fade(c, arc, 0, 300); arc.remove();
    const half = z.add(0.5, '0,5', 'var(--q)', { up: true }); await pop(c, half, 1, 400);
    await z.zoom(0.38, 0.72);
    c.say('Peki 0,5’ten sonraki sayı hangisi?', { noWait: true });
    const cand = [0.6, 0.51, 0.501], mid = [0.55, 0.505, 0.5005];
    let chain = Promise.resolve();
    const show = async (i) => {
      const w = cand[i] - 0.5;
      z.add(cand[i], fmtD(cand[i]), 'var(--warn)');
      await z.zoom(0.5 - w * 0.25, cand[i] + w * 0.25, 1100);
      const m = z.add(mid[i], fmtD(mid[i]), 'var(--ok)', { up: true });
      await pop(c, m, 1, 400);
      await c.wait(500);
    };
    await c.choice({
      q: '<b>0,5’ten sonraki sayı</b> hangisi?', options: ['0,6', '0,51', '0,501', 'Böyle bir sayı yok'], answer: 3,
      hints: ['0,55 daha yakın: 0,5 ile 0,6’nın arasında.', '0,505 daha yakın: 0,5 ile 0,51’in arasında.', '0,5005 daha yakın: 0,5 ile 0,501’in arasında.', ''],
      right: 'Evet. Hangi adayı seçsen araya daha yakın biri girer.',
      onPick: (i, ok) => { if (!ok) chain = nf(chain.then(() => show(i))); },
    });
    await chain.catch(() => {});
    await c.say('Hangi adayı seçersen seç, araya biri daha girer.');
    c.note('0,5 ile 0,51 arasında 0,505 var.<br>“Bir sonraki sayı” yok.', 'Bir sonraki sayı', 'c4-1');
  }

  async function c4Sirala(c) {
    const svg = newSvg(c); const root = E('g', {}, svg); op(root, 0);
    const z = ZoomLine(c, root, { y: 210, x0: 200, x1: 1080, lo: -1, hi: 1 });
    [-1, 0, 1].forEach((v) => z.add(v, fmtD(v)));
    const SL = [0, 1, 2, 3].map((i) => ({ id: i, x: 290 + i * 233, y: 440 }));
    const slotG = G(root, 0, 0);
    SL.forEach((s) => { s.el = E('rect', { x: s.x - 95, y: s.y - 60, width: 190, height: 120, rx: 20, fill: 'rgba(255,255,255,.04)', stroke: 'var(--line)', 'stroke-width': 3, 'stroke-dasharray': '9 7' }, slotG); s.hit = (x, y) => Math.abs(x - s.x) < 95 && Math.abs(y - s.y) < 60; });
    T(slotG, 290, 540, 'en küçük', 26, MUTED, { bold: 600 }); T(slotG, 989, 540, 'en büyük', 26, MUTED, { bold: 600 });
    await fade(c, root, 1, 500);
    await c.say('Sayı doğrusunda soldaki sayı küçüktür.');
    const defs2 = [
      { sp: 0.3, rank: 2, tok: { k: 'x', txt: '0,3', color: 'var(--ink)' }, up: true, hint: '0,3 pozitif; ama 1/3 = 0,333…’ten küçük.' },
      { sp: [-1, 3], rank: 1, tok: q(-1, 3), up: false, hint: '−1/3 ≈ −0,33: −0,5’in sağında, sıfırın solunda.' },
      { sp: [1, 3], rank: 3, tok: q(1, 3), up: false, hint: '1/3 = 0,333…: 0,3’ten biraz büyük.' },
      { sp: [-1, 2], rank: 0, tok: q(-1, 2), up: true, hint: '−1/2 = −0,5: dördünün en solundaki.' },
    ];
    const items = defs2.map((d, i) => { const g = pill(root, d.tok, { x: 290 + i * 233, y: 640, size: 34, color: 'var(--ink)' }); return { g, d, id: 'k' + i, home: { x: 290 + i * 233, y: 640, s: 1 }, aria: Array.isArray(d.sp) ? `${d.sp[0]}/${d.sp[1]}` : fmtD(d.sp) }; });
    const pn = c.panel('Sıra sende', h('p', { class: 'q', html: 'Dört sayıyı <b>küçükten büyüğe</b> kutulara diz.' }));
    const fb = h('div'); pn.appendChild(fb);
    let left = 4, doneRes; const donep = new Promise((r) => { doneRes = r; });
    const land = (it) => { const m = z.add(valOf(it.d.sp), lblOf(it.d.sp), 'var(--q)', { up: it.d.up }); nf(pop(c, m, 1, 350)); return { x: SL[it.d.rank].x, y: SL[it.d.rank].y, s: 1 }; };
    const sorter = Sorter(c, svg, {
      items, zones: SL,
      onDrop: async (it, zid) => {
        if (zid !== it.d.rank) { c.feedback(fb, 'no', it.d.hint); return false; }
        c.feedback(fb, 'ok', 'Doğru. Yerini sayı doğrusunda gör.');
        if (--left <= 0) doneRes();
        return land(it);
      },
    });
    const r = await withSkip(c, donep);
    if (r === 'skip') for (const it of sorter.items) if (!it.placed) { it.placed = true; const pos = land(it); await mv(c, it.g, pos.x, pos.y, 300, ease.inOut, { s: 1 }); }
    pn.remove();
    await c.say('Her sayı sıraya girer: buna sıralı olma denir.');
    await z.zoom(0.24, 0.4, 1400);
    await c.say('0,3 ile 1/3 çok yakın; ama 0,3 solda.', { speak: 'Sıfır virgül üç ile bir bölü üç çok yakın; ama sıfır virgül üç solda.' });
    c.note(`Soldaki küçüktür.<br>${MINUS}${F(1, 2)} &lt; ${MINUS}${F(1, 3)} &lt; 0,3 &lt; ${F(1, 3)}`, 'Sıralama', 'c4-2');
  }

  async function c4Arada(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    /* tam sayılarda arası boş */
    const g0 = E('g', {}, root); op(g0, 0);
    const z0 = ZoomLine(c, g0, { y: 380, x0: 160, x1: 1120, lo: 1.6, hi: 5.4 });
    [2, 3, 4, 5].forEach((v) => z0.add(v, String(v)));
    await fade(c, g0, 1, 500);
    await z0.zoom(2.75, 4.25, 1200);
    const gap = T(g0, 640, 300, 'arası boş', 34, MUTED, { bold: 700 }); op(gap, 0);
    await fade(c, gap, 1, 400);
    await c.say('3 ile 4 arasında başka tam sayı yok.', { speak: 'Üç ile dört arasında başka tam sayı yok.' });
    await fade(c, g0, 0, 450); g0.remove();
    /* kesirlerde arası dolu: orta noktalar */
    const third = q(1, 3); const ms = [q(1, 2)];
    for (let n = 1; n <= 6; n++) ms.push(div(add(third, ms[n - 1]), q(2)));
    const fs2 = (t) => `${t.n}/${t.d}`, v2 = (t) => t.n / t.d;
    const g1 = E('g', {}, root); op(g1, 0);
    const z = ZoomLine(c, g1, { y: 400, x0: 220, x1: 1060, lo: 0, hi: 1 });
    z.add(1 / 3, [1, 3], 'var(--q)'); z.add(0.5, [1, 2], 'var(--q)');
    const head = T(g1, 640, 150, '', 52, 'var(--ink)', { bold: 800 });
    const view = (n) => { const hi = v2(ms[n - 1]), pad = (hi - 1 / 3) * 0.3; return [1 / 3 - pad, hi + pad]; };
    let shown = 0;
    const ensure = (n) => { for (; shown < n; shown++) z.add(v2(ms[shown + 1]), [ms[shown + 1].n, ms[shown + 1].d], 'var(--ok)', { up: true }); head.textContent = `1/3 < ${fs2(ms[n])} < ${fs2(ms[n - 1])}`; };
    z.set(...view(1));
    await fade(c, g1, 1, 500);
    ensure(1); await pop(c, z.marks[z.marks.length - 1], 1, 450);
    await c.say('1/3 ile 1/2’nin tam ortası: 5/12.', { speak: 'Bir bölü üç ile bir bölü ikinin tam ortası: beş bölü on iki.' });
    await z.zoom(...view(2), 1300);
    ensure(2); await pop(c, z.marks[z.marks.length - 1], 1, 450);
    await c.say('Yakınlaş: 1/3 ile 5/12’nin ortası 3/8.', { speak: 'Yakınlaş: bir bölü üç ile beş bölü on ikinin ortası üç bölü sekiz.' });
    c.say('Kaydırıcıyı çek: araya hep yeni bir kesir girer.', { noWait: true });
    c.slider({ label: 'Yakınlaş', min: 2, max: 6, step: 1, value: 2, fmt: (v) => v + '. adım', onInput: (n) => { ensure(n); z.set(...view(n)); } });
    await c.cont('Devam ›');
    c.clearAct();
    await c.say('İki kesrin arasında hep bir kesir var: arada olma.');
    c.note(`a ile b’nin ortası: ${F('a + b', 2)}<br>${F(1, 3)} ile ${F(1, 2)} arası: ${F(5, 12)}`, 'Arada olma', 'c4-3');
  }

  async function c4Sec(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const RND = [
      { a: [1, 4], b: [1, 2], opts: [[1, 5], [3, 8], [3, 5]], ans: 1, hints: ['1/5 = 0,2: 1/4’ün solunda kalır.', '', '3/5 = 0,6: 1/2’nin sağında kalır.'], right: '1/4 = 2/8 ve 1/2 = 4/8; 3/8 tam ortada.' },
      { a: 0.3, b: 0.31, opts: [0.305, 0.295, 0.32], ans: 0, hints: ['', '0,295, 0,3’ten küçük: solunda kalır.', '0,32, 0,31’den büyük: sağında kalır.'], right: '0,300 < 0,305 < 0,310.' },
      { a: -1, b: [-1, 2], opts: [[-1, 4], [-3, 2], [-3, 4]], ans: 2, hints: ['−1/4, −1/2’nin sağında: daha büyük.', '−3/2 = −1,5: −1’in solunda.', ''], right: '−1 < −0,75 < −0,5.' },
    ];
    c.say('İki sayının arasına düşeni seç.', { noWait: true });
    for (const R of RND) {
      const g = E('g', {}, root); op(g, 0);
      const vals = [R.a, R.b, ...R.opts].map(valOf), mn = Math.min(...vals), mx = Math.max(...vals), pad = (mx - mn) * 0.15;
      const z = ZoomLine(c, g, { y: 400, x0: 200, x1: 1080, lo: mn - pad, hi: mx + pad });
      E('rect', { x: z.X(valOf(R.a)), y: 386, width: z.X(valOf(R.b)) - z.X(valOf(R.a)), height: 28, rx: 8, fill: 'var(--q)', 'fill-opacity': 0.35 }, g);
      z.add(valOf(R.a), lblOf(R.a), 'var(--q)'); z.add(valOf(R.b), lblOf(R.b), 'var(--q)');
      await fade(c, g, 1, 450);
      await c.choice({
        tag: 'Sıra sende', q: `${htmlOf(R.a)} ile ${htmlOf(R.b)} <b>arasında</b> hangisi var?`, options: R.opts.map(htmlOf), answer: R.ans, hints: R.hints, right: R.right,
        onPick: (i, ok) => { const m = z.add(valOf(R.opts[i]), lblOf(R.opts[i]), ok ? 'var(--ok)' : 'var(--err)', { up: true }); nf(pop(c, m, 1, 350)); },
      });
      await fade(c, g, 0, 400); g.remove();
    }
    c.clearSay();
    /* küme küme: sıralı olma ve arada olma */
    const KT = E('g', {}, root); op(KT, 0);
    const tbl = Tbl(c, KT, { x: 380, y: 130, cw: 230, ch: 80, hw: 80, hh: 60, rows: ['N', 'Z', 'Q', 'R'], cols: ['sıralı', 'arada'] });
    ['N', 'Z', 'Q', 'R'].forEach((r) => { tbl.set(r, 'sıralı', 'e', false); tbl.set(r, 'arada', 'e', false); });
    await fade(c, KT, 1, 500);
    for (const r of ['N', 'Z', 'Q', 'R']) await tbl.set(r, 'sıralı', 'v');
    await c.say('Dört kümenin dördü de sıralıdır.');
    for (const r of ['N', 'Z', 'Q', 'R']) await tbl.set(r, 'arada', r === 'N' || r === 'Z' ? 'x' : 'v', true, r === 'N' || r === 'Z' ? '3 ile 4' : undefined);
    await c.say('Arada olma yalnızca Q ve R’de var.', { speak: 'Arada olma yalnızca rasyonel ve gerçek sayılarda var.' });
    await c.say('Kesirlerde “bir sonraki sayı” yoktur.', { speak: '[excited] Kesirlerde “bir sonraki sayı” yoktur.' });
    c.note('Sıralı olma: N, Z, Q, R<br>Arada olma: yalnızca Q ve R', 'Sıralı olma, arada olma', 'c4-4');
  }

  /* ================================================================
     C5 — İspat mı, karşı örnek mi?
     ================================================================ */
  /* Mahkeme: üstte iddia, altında tanık sırası, sağda karar mührü */
  function Court(c, root, claim, size = 38) {
    const g = G(root, 0, 0); const ct = { g, n: 0 };
    card(g, 150, 50, 980, 130, { rx: 20 });
    T(g, 640, 82, 'İddia', 24, MUTED, { bold: 700 });
    T(g, 640, 134, claim, size, 'var(--ink)', { bold: 700 });
    ct.witness = async (str, ok) => {
      const w = G(g, 260 + ct.n * 380, 330); ct.n++;
      card(w, -165, -46, 330, 92, { rx: 16, stroke: ok ? 'var(--ok)' : 'var(--err)' });
      icon(w, ok ? 'ok' : 'no', -125, 0, 0.8); T(w, 24, 1, str, 32, 'var(--ink)', { bold: 700 });
      await pop(c, w, 1, 400); return w;
    };
    ct.stamp = async (str, col) => {
      const s = G(g, 640, 500); s._p.r = -6;
      E('rect', { x: -200, y: -44, width: 400, height: 88, rx: 12, fill: 'rgba(15,20,32,.9)', stroke: col, 'stroke-width': 6 }, s);
      T(s, 0, 2, str, 44, col, { bold: 800 });
      await pop(c, s, 1, 450); return s;
    };
    return ct;
  }

  async function c5Taniklar(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    await c.choice({
      q: 'C4’te denediğimiz her iki kesrin arasında yeni bir kesir bulduk. Kaç deneme <b>“her zaman bulunur”</b> demeye yeter?',
      options: ['10 deneme', '1000 deneme', 'Hiçbiri yetmez'], answer: 2,
      hints: ['10 denemenin dışında sonsuz çift daha var.', '1000 denemenin dışında da sonsuz çift var.', ''],
      right: 'Evet. Örnek ne kadar çok olursa olsun “her” demeye yetmez.',
    });
    const ct = Court(c, root, 'İki irrasyonelin çarpımı irrasyoneldir.'); op(ct.g, 0);
    await fade(c, ct.g, 1, 500);
    await c.say('Yeni bir iddia: iki irrasyonelin çarpımı hep irrasyoneldir.');
    await ct.witness('√2·√3 = √6', true);
    await ct.witness('√2·√5 = √10', true);
    await c.say('İki tanık iddiayı doğruluyor.');
    await c.choice({
      q: 'İki örnek doğru çıktı. İddia <b>kanıtlandı</b> mı?', options: ['Evet', 'Hayır'], answer: 1,
      hints: ['İki örnek, sonsuz çiftin yalnızca ikisi. Üçüncü tanığı dinle.', ''],
      right: 'Hayır. Üçüncü tanığı dinleyelim.', next: 'Tanığı çağır ›',
    });
    await ct.witness('√2·√2 = 2', false);
    await c.say('√2 · √2 = 2: sonuç rasyonel.', { speak: 'Karekök iki çarpı karekök iki eşittir iki: sonuç rasyonel.' });
    await ct.stamp('ÇÜRÜTÜLDÜ', 'var(--err)');
    await c.say('Tek karşı örnek iddiayı çürüttü.');
    c.note('<b>Tek karşı örnek çürütür.</b><br>√2 · √2 = 2', 'Karşı örnek', 'c5-1');
  }

  async function c5Av(c) {
    const svg = newSvg(c); const root = E('g', {}, svg); op(root, 0);
    const CL = [
      { id: 0, txt: 'N çıkarmada kapalıdır.' },
      { id: 1, txt: 'Her karekök irrasyoneldir.' },
      { id: 2, txt: 'İki irrasyonelin toplamı irrasyoneldir.' },
    ];
    CL.forEach((cl, i) => {
      cl.y = 70 + i * 200; cl.g = G(root, 0, 0);
      cl.el = card(cl.g, 40, cl.y, 740, 170, { rx: 20 });
      T(cl.g, 380, cl.y + 50, cl.txt, 30, 'var(--ink)', { bold: 700 });
      cl.hit = (x, y) => x > 40 && x < 780 && y > cl.y && y < cl.y + 170;
    });
    const X1 = (txt) => ({ k: 'x', txt, color: 'var(--ink)' });
    const defs2 = [
      { tok: X1('√9 = 3'), claim: 1 },
      { tok: X1(`5${MINUS}3 = 2`), claim: -1 },
      { tok: X1(`√2+(${MINUS}√2) = 0`), claim: 2 },
      { tok: X1(`3${MINUS}5 = ${MINUS}2`), claim: 0 },
    ];
    const items = defs2.map((d, i) => { const g = pill(root, d.tok, { x: 1030, y: 130 + i * 150, size: 30, color: 'var(--ink)' }); return { g, d, id: 'e' + i, home: { x: 1030, y: 130 + i * 150, s: 1 }, aria: d.tok.txt }; });
    await fade(c, root, 1, 500);
    c.say('Her iddiaya onu çürüten örneği götür.', { noWait: true });
    const pn = c.panel('Sıra sende', h('p', { class: 'q', html: 'Sağdaki örneklerden <b>karşı örnek</b> olanları, çürüttüğü iddianın üstüne sürükle. Biri fazla.' }));
    const fb = h('div'); pn.appendChild(fb);
    let left = 3, doneRes; const donep = new Promise((r) => { doneRes = r; });
    const land = (it) => { const cl = CL[it.d.claim]; cl.el.setAttribute('stroke', 'var(--err)'); icon(cl.g, 'no', 740, cl.y + 50, 0.9); return { x: 380, y: cl.y + 120, s: 0.9 }; };
    const sorter = Sorter(c, svg, {
      items, zones: CL,
      onDrop: async (it, zid) => {
        if (it.d.claim !== zid) {
          c.feedback(fb, 'no', it.d.claim < 0 ? '5 − 3 = 2 kutuda kalıyor: bu bir tanık, karşı örnek değil.' : 'Bu örnek o iddiayı bozmuyor. İddianın “hep doğru” dediği şeyi ihlal eden örneği ara.');
          return false;
        }
        c.feedback(fb, 'ok', ['3 − 5 = −2 ∉ N: tek örnek yetti.', '√9 = 3 rasyonel: iddia çürüdü.', '√2 + (−√2) = 0 rasyonel: iddia çürüdü.'][zid]);
        if (--left <= 0) doneRes();
        return land(it);
      },
    });
    const r = await withSkip(c, donep);
    if (r === 'skip') for (const it of sorter.items) if (!it.placed && it.d.claim >= 0) { it.placed = true; const pos = land(it); await mv(c, it.g, pos.x, pos.y, 300, ease.inOut, { s: pos.s }); }
    pn.remove();
    await c.say('Üç iddia da tek örnekle çürüdü.');
    await c.say('5 − 3 = 2 ise yalnızca bir tanık.', { speak: 'Beş eksi üç eşittir iki ise yalnızca bir tanık.' });
    c.note(`“Her” iddiasını tek örnek bozar.<br>√9 = 3: her karekök irrasyonel değil.`, 'Karşı örnek avı', 'c5-2');
  }

  async function c5Ispat(c) {
    const svg = newSvg(c); const root = E('g', {}, svg);
    const ct = Court(c, root, 'İki rasyonelin arasında hep bir rasyonel vardır.', 34); op(ct.g, 0);
    await fade(c, ct.g, 1, 500);
    await c.say('C4’ün iddiası: iki rasyonelin arasında hep bir rasyonel vardır.', { speak: 'C dört dersinin iddiası: iki rasyonelin arasında hep bir rasyonel vardır.' });
    await ct.witness('1/3 < 5/12 < 1/2', true);
    await ct.witness('1/4 < 3/8 < 1/2', true);
    await c.say('Karşı örnek aradık, bulamadık; bu da kanıt değil.');
    await fade(c, ct.g, 0, 450); ct.g.remove();
    /* hipotez ve hüküm */
    const P = E('g', {}, root);
    const row = (y, label, parts, col) => {
      const g = E('g', {}, P); op(g, 0);
      T(g, 120, y, label, 28, MUTED, { anchor: 'start', bold: 700 });
      const r = rich(g, 480, y, 44, parts, { anchor: 'start' }); if (col) r.style.fill = col;
      return g;
    };
    const h1 = row(170, 'Verilen (hipotez)', [{ t: 'a < b,  ikisi rasyonel' }]);
    const h2 = row(270, 'Gösterilecek (hüküm)', [{ t: 'arada bir rasyonel var' }]);
    await fade(c, h1, 1, 450);
    await c.say('Verilen: a ile b rasyonel ve a küçük.');
    await fade(c, h2, 1, 450);
    await c.say('Gösterilecek: aralarında bir rasyonel var.');
    const s0 = row(400, 'Aday', [{ frac: ['a+b', '2'], col: 'var(--ok)' }]);
    await fade(c, s0, 1, 450);
    await c.say('Aday belli: ikisinin tam ortası.');
    await par(fade(c, h1, 0, 400), fade(c, h2, 0, 400)); h1.remove(); h2.remove();
    await c.tween(600, (e) => s0.setAttribute('transform', `translate(0 ${-250 * e})`), ease.inOut);
    const s1 = row(290, 'Rasyonel mi?', [{ t: 'Q toplamada ve bölmede kapalı' }]);
    icon(s1, 'ok', 1180, 290, 0.9);
    await fade(c, s1, 1, 450);
    await c.say('Rasyonel mi? Evet: Q toplamada ve bölmede kapalı.', { speak: 'Rasyonel mi? Evet: rasyonel sayılar toplamada ve bölmede kapalı.' });
    const s2 = row(410, 'Arada mı?', [{ t: '2a < a+b < 2b' }]);
    await fade(c, s2, 1, 450);
    await c.say('a < b olduğundan a + b, 2a ile 2b arasında.', { speak: 'a küçüktür b olduğundan a artı b, iki a ile iki b arasında.' });
    const s3 = row(550, 'İkiye böl', [{ t: 'a <  ' }, { frac: ['a+b', '2'], col: 'var(--ok)' }, { t: '  < b' }]);
    icon(s3, 'ok', 1180, 550, 0.9);
    await fade(c, s3, 1, 450);
    await c.say('İkiye böl: orta nokta a ile b arasında.');
    await fade(c, P, 0, 450); P.remove();
    /* harfler bütün örnekleri taşır: a ve b oynar */
    const L = E('g', {}, root); op(L, 0);
    const nl = numLine(L, { y: 420, x0: 640, u: 220, a: -2, b: 2, size: 30 });
    const mk = (lbl, col) => { const g = G(L, 0, 420); E('circle', { r: 13, fill: col, stroke: '#0F1420', 'stroke-width': 3 }, g); T(g, 0, -46, lbl, 36, col, { bold: 800 }); return g; };
    const ma = mk('a', 'var(--q)'), mb = mk('b', 'var(--q)'), mm = mk('orta', 'var(--ok)');
    const info = T(L, 640, 200, '', 46, 'var(--ink)', { bold: 800 });
    const fr = (k4, d) => { const t = q(k4, d); return t.d === 1 ? fmtN(t.n) : `${fmtN(t.n)}/${t.d}`; };
    let A = -2, B = 3; // çeyrek birim
    const upd = () => { put(ma, { x: nl.X(A / 4) }); put(mb, { x: nl.X(B / 4) }); put(mm, { x: nl.X((A + B) / 8) }); info.textContent = `${fr(A, 4)}  <  ${fr(A + B, 8)}  <  ${fr(B, 4)}`; };
    upd();
    await fade(c, L, 1, 500);
    c.say('a ile b’yi oynat: orta nokta hep arada.', { noWait: true });
    let sb = null;
    const sa = c.slider({ label: 'a', min: -8, max: 7, step: 1, value: A, fmt: (v) => fr(v, 4), onInput: (v) => { A = v; if (B <= A) { B = A + 1; if (sb) sb.set(B); } upd(); } });
    sb = c.slider({ tag: false, label: 'b', min: -7, max: 8, step: 1, value: B, fmt: (v) => fr(v, 4), onInput: (v) => { B = v; if (A >= B) { A = B - 1; sa.set(A); } upd(); } });
    await c.cont('Devam ›');
    c.clearAct();
    const stamp = G(root, 640, 600); stamp._p.r = -5;
    E('rect', { x: -200, y: -42, width: 400, height: 84, rx: 12, fill: 'rgba(15,20,32,.9)', stroke: 'var(--ok)', 'stroke-width': 6 }, stamp);
    T(stamp, 0, 2, 'İSPATLANDI', 44, 'var(--ok)', { bold: 800 });
    await pop(c, stamp, 1, 450);
    await c.say('Harfler bütün örnekleri birden kapsar: iddia kanıtlandı.', { speak: '[excited] Harfler bütün örnekleri birden kapsar: iddia kanıtlandı.' });
    await c.say('Bin örnek kanıtlamaz, tek karşı örnek çürütür.');
    c.note(`a &lt; ${F('a + b', 2)} &lt; b<br><b>Bin örnek kanıtlamaz, tek karşı örnek çürütür.</b>`, 'İspat', 'c5-3');
  }


  /* ================= sesli anlatım: sembolleri kelimeye çevir ================= */
  function speakify(html) {
    const d = document.createElement('div'); d.innerHTML = html;
    let t = (d.textContent || '').replace(/\s+/g, ' ');
    const rules = [
      [/√\((\d+)\/(\d+)\)/g, 'karekök $1 bölü $2'], [/√(\d+)/g, 'karekök $1'], [/π/g, 'pi'],
      [/(\d+)\/(\d+)/g, '$1 bölü $2'], [/Q′/g, 'Q üssü'], [/½/g, 'yarım'], [/□/g, 'kutu'],
      [/\s*∉\s*/g, ' elemanı değildir '], [/\s*∈\s*/g, ' elemanıdır '], [/\s*⊂\s*/g, ' alt kümesidir '], [/\s*∪\s*/g, ' birleşim '], [/\s*∩\s*/g, ' kesişim '],
      [/\s*≠\s*/g, ' eşit değildir '], [/\s*≈\s*/g, ' yaklaşık '], [/\s*=\s*/g, ' eşittir '], [/\s*<\s*/g, ' küçüktür '], [/\s*>\s*/g, ' büyüktür '],
      [/\s*×\s*/g, ' çarpı '], [/\s*·\s*/g, ' çarpı '], [/\s*÷\s*/g, ' bölü '], [/\s*\+\s*/g, ' artı '], [/(\d|\))\s+−\s+/g, '$1 eksi '], [/−/g, 'eksi '],
      [/²/g, ' kare'], [/→/g, ', '], [/…/g, '...'],
    ];
    rules.forEach(([re, rep]) => { t = t.replace(re, rep); });
    return t.replace(/\s+/g, ' ').trim();
  }
  Ders.speakify = speakify;
  const wrapScene = (sc) => ({ ...sc, run: (c) => { const say0 = c.say; c.say = (html, o = {}) => say0(html, o.speak ? o : { ...o, speak: speakify(html) }); return sc.run(c); } });

  /* ================= KISA DERSLER ================= */
  /* Bölüm C kısa derslere ayrılır. Sayfa, hangi parçayı oynatacağını window.DERS_PARCA ile söyler. */
  const PARCALAR = {
    c1: {
      title: 'Her kutu bir ihtiyaçtan doğdu',
      hook: 'Cüzdanında 3 lira var, 5 liralık bir şey aldın. <b>3 − 5</b>’in cevabı mı yok, yoksa cevabın konacağı kutu mu?',
      scenes: [
        { title: 'İç içe kutular', goal: 'N ⊂ Z ⊂ Q ⊂ R sırasını gör.', run: c1Kutular },
        { title: 'N: saymak', goal: 'Kapalılık testini tanı; N’nin çıkarmada kapalı olmadığını gör.', run: c1N },
        { title: 'Z: borç', goal: '3 − 5’in sonucuna yer aç; Z’nin bölmede kapalı olmadığını gör.', run: c1Z },
        { title: 'Q: paylaşmak', goal: 'Q = { a/b : b ≠ 0 }; her tam sayı rasyoneldir.', run: c1Q },
        { title: 'Sıra sende: üç kırmızıyı bul', goal: 'Kapalılık tablosundaki karşı örnekleri kendin bul.', run: c1Tablo },
      ],
      quiz: [
        {
          q: 'Hangi işlem <b>N’de kapalı değildir</b>?',
          options: ['Toplama', 'Çarpma', 'Çıkarma'], answer: 2,
          why: [
            'İki doğal sayının toplamı her zaman doğal sayıdır.',
            'İki doğal sayının çarpımı her zaman doğal sayıdır.',
            '3 − 5 = −2 ∉ N. Tek karşı örnek yeter.'],
          scene: 1,
        },
        {
          q: '<b>−3</b> rasyonel bir sayı mıdır?',
          options: ['Evet', 'Hayır, tam sayıdır', 'Hayır, negatiftir'], answer: 0,
          why: [
            `−3 = −${F(3, 1)}: iki tam sayının bölümü olarak yazılır. Her tam sayı rasyoneldir.`,
            `Tam sayı olması engel değil: −3 = −${F(3, 1)}. Z, Q’nun içindedir.`,
            `Negatif kesirler de rasyoneldir: −3 = −${F(3, 1)}.`],
          scene: 3,
        },
        {
          q: '7 − 11 işleminin sonucu hangi kümelerde yer alır?',
          options: ['N, Z ve Q’da', 'Yalnızca Z’de, Q’da değil', 'Z’de ve Q’da, N’de değil'], answer: 2,
          why: [
            '7 − 11 = −4 ve −4 ∉ N: doğal sayılar negatif olamaz.',
            `Z, Q’nun içindedir: −4 = −${F(4, 1)} olduğundan Q’da da yer alır.`,
            `−4 ∈ Z ve Z ⊂ Q olduğundan −4 ∈ Q; ama −4 ∉ N.`],
          scene: 2,
        },
        {
          q: `12 ÷ 4 = 3 çıktı ve sonuç N’de kaldı. Bu, N’nin bölmede <b>kapalı</b> olduğunu gösterir mi?`,
          options: ['Evet, sonuç N’de kaldı', 'Hayır, 3 ÷ 4 N’de değil; tek karşı örnek kapalılığı bozar', 'Hayır, bölme N’de hiçbir zaman sonuç vermez'], answer: 1,
          why: [
            'Kapalılık her çift için sonucun kutuda kalmasıdır. Tek çiftin tutması yetmez.',
            `${F(3, 4)} ∉ N: bir karşı örnek bulundu. 12 ÷ 4 yalnızca tutan bir örnek.`,
            'Bölme N’de bazen sonuç verir (12 ÷ 4 = 3); sorun her çiftte vermemesi.'],
          scene: 1,
        },
      ],
      summary: [
        '<b>Yapılamayan işlem yeni kutu açar.</b>',
        '3 − 5 = −2 için <b class="tz">Z</b>, 3 ÷ 4 için <b class="tq">Q</b> açıldı.',
        '<b>Kapalı:</b> sonuç hep kutuda kalır. Tek karşı örnek kapalılığı bozar.',
      ],
      next: { href: 'c2-ondalik-acilim.html', label: 'Sonraki: Ondalık açılımın adresi ›' },
    },
    c2: {
      title: 'Ondalık açılımın adresi',
      hook: '1/4 = 0,25 bitiyor. 1/3 = 0,333… hiç bitmiyor. Bitmeyen bir sayı hâlâ kesir midir?',
      scenes: [
        { title: 'Biten ondalık', goal: 'Kalan 0 olunca bölmenin bittiğini gör: 1/4 = 0,25.', run: c2Biten },
        { title: 'Devreden ondalık', goal: 'Kalan tekrar edince rakamların da tekrar ettiğini gör.', run: c2Devreden },
        { title: 'Neden başka yol yok?', goal: 'Kalan sayısı sınırlıdır: ya 0 olur ya tekrar eder.', run: c2Yedi },
        { title: 'Sıra sende: biter mi, devreder mi?', goal: 'Dört kesri kalanlarına bakarak ayır.', run: c2Sirala },
      ],
      quiz: [
        {
          q: `${F(3, 8)} sayısının ondalık açılımı için hangisi doğrudur?`,
          options: ['Biter', 'Devreder', 'Ne biter ne devreder'], answer: 0,
          why: [
            '30 ÷ 8 = 3 kalan 6; 60 ÷ 8 = 7 kalan 4; 40 ÷ 8 = 5 kalan 0. Sonuç 0,375.',
            'Kalanlar 6, 4, 0: kalan sıfıra varıyor, tekrar etmiyor.',
            'Her kesrin ondalık açılımı ya biter ya devreder.'],
          scene: 0,
        },
        {
          q: '0,8333… sayısı için hangisi doğrudur?',
          options: ['Bitmediği için irrasyoneldir', 'Devreder ve rasyoneldir', 'Biten bir ondalıktır'], answer: 1,
          why: [
            'Ölçüt bitmek değil, tekrar etmektir. 3 sürekli tekrar ediyor.',
            `0,8333… = ${F(5, 6)}. Devreden ondalık bir kesirdir.`,
            'Üçler sonsuza kadar sürüyor; bölmede kalan hiç 0 olmuyor.'],
          scene: 1,
        },
        {
          q: 'Hangi kesrin ondalık açılımı <b>biter</b>?',
          options: [F(7, 20), F(5, 9), F(2, 11)], answer: 0,
          why: [
            '70 ÷ 20 = 3 kalan 10; 100 ÷ 20 = 5 kalan 0. Kalan 0 oldu: 0,35.',
            '50 ÷ 9 = 5 kalan 5: aynı kalan geri geldi, rakam sürekli tekrar eder: 0,555…',
            '20 ÷ 11 = 1 kalan 9; 90 ÷ 11 = 8 kalan 2: kalan 2 geri geldi, 0,1818… devreder.'],
          scene: 3,
        },
        {
          q: `${F(1, 13)} = 0,${ov('076923')} olarak yazılır. Tekrar eden öbek 6 basamaklı. Bu sayı için hangisi doğrudur?`,
          options: ['Öbek uzun olduğu için rasyonel değildir','Rakamlar tekrar ettiği için rasyoneldir', 'Yalnızca kısa öbekli devreden ondalıklar rasyoneldir'], answer: 1,
          why: [
            'Ölçüt öbeğin uzunluğu değil, tekrar edip etmemesi. Öbek ne kadar uzun olursa olsun tekrar ediyor.',
            `Rakamlar tekrar ediyor, yani kalan tekrar ediyor. Zaten ${F(1, 13)} bir kesir.`,
            'Öbeğin uzunluğunun rasyonel olmakla ilgisi yok. Devreden her ondalık rasyoneldir.'],
          scene: 2,
        },
      ],
      summary: [
        '<b>Biten ya da devreden: rasyonel.</b>',
        `Kalan 0 olursa biter: ${F(1, 4)} = 0,25. Kalan tekrar ederse devreder: ${F(1, 3)} = 0,${ov('3')}.`,
      ],
      next: { href: 'c3-sayi-dogrusundaki-delik.html', label: 'Sonraki: Sayı doğrusundaki delik ›' },
    },
    c3: {
      title: 'Sayı doğrusundaki delik',
      hook: 'Kenarı 1 olan karenin köşegenini cetvelle ölçebilirsin. Peki bu uzunluğu <b>kesir</b> olarak yazabilir misin?',
      scenes: [
        { title: 'Köşegen', goal: 'Köşegenin √2 olduğunu alanla bul; sayı doğrusundaki yerini gör.', run: c3Kosegen },
        { title: 'Ne biter ne devreder', goal: '√2’nin ondalık açılımını 1/7’ninkiyle karşılaştır.', run: c3Ondalik },
        { title: 'Delikler dolar', goal: 'R = Q ∪ Q′; gerçek sayılar dört işlemde kapalıdır.', run: c3Delik },
        { title: 'Sıra sende: hangi kutu?', goal: 'Sekiz sayıyı en küçük kutusuna yerleştir.', run: c3Sirala },
      ],
      quiz: [
        {
          q: 'Aşağıdaki sayılardan hangisi <b>irrasyoneldir</b>?',
          options: [`0,${ov('27')}`, M.sqrt(16), M.sqrt(7), F(3, 8)], answer: 2,
          why: [
            'Devreden ondalık rasyoneldir: 0,2727… = 3/11.',
            '√16 = 4. Kök içi tam kare.',
            '7 tam kare değil: √7 = 2,6457… ne biter ne devreder.',
            '3/8 = 0,375: biten ondalık, rasyonel.'],
          scene: 1,
        },
        {
          q: `${M.sqrt(4)}, ${M.sqrt(5)}, ${M.sqrt(9)}, ${M.sqrt(F(1, 4))} sayılarından kaç tanesi <b>rasyoneldir</b>?`,
          options: ['0', '2', '3', '4'], answer: 2,
          why: [
            'Kök işareti irrasyonel yapmaz: √4 = 2, √9 = 3.',
            '√4 = 2 ve √9 = 3 doğru; √(1/4) = 1/2’yi atladın.',
            '√4 = 2, √9 = 3, √(1/4) = 1/2. Yalnızca √5 irrasyonel.',
            '5 tam kare değil: √5 = 2,236… ne biter ne devreder.'],
          scene: 2,
        },
        {
          q: 'Alanı 20 cm² olan karenin kenarı için hangisi doğrudur?',
          options: [`Kenarı ${M.sqrt(20)} cm’dir ve irrasyoneldir`, 'Kenarı 4 cm’dir', 'Kenarı 10 cm’dir', `Kenarı ${M.sqrt(20)} cm’dir ama rasyoneldir`], answer: 0,
          why: [
            '20 tam kare değil: √20 = 4,472… ne biter ne devreder.',
            '4 · 4 = 16, alan 20 değil. Kenar 4’ten büyük.',
            '10 · 10 = 100. 10, alanın yarısı; kenar kendisiyle çarpılınca 20 verir.',
            `${M.sqrt(20)} hiçbir kesre eşit değil. Kökün görünmesi tek başına rasyonel yapmaz.`],
          scene: 0,
        },
        {
          q: `${M.sqrt(3)} için hangisi doğrudur?`,
          options: ['Sayı doğrusunda yeri yok, çünkü kesre eşit değil', 'Kesre eşit olduğu için sayı doğrusunda yeri var', 'Sayı doğrusunda yeri yok ama gerçek sayıdır', 'Sayı doğrusunda yeri var ama hiçbir kesre eşit değil'], answer: 3,
          why: [
            'Kesre eşit olmamak, sayı doğrusunda yer almamak demek değil. Delik sayı doğrusunda değil, Q’da.',
            '3 tam kare değil: √3 = 1,732… ne biter ne devreder, kesir olarak yazılamaz.',
            'Gerçek sayılar sayı doğrusunun tamamını doldurur. Yeri olmayan gerçek sayı yok.',
            '√3 sayı doğrusunda 1,7 civarında bir yerdedir; ama kesir değildir. Sayı doğrusundaki delik Q’nun deliği.'],
          scene: 0,
        },
      ],
      summary: [
        '<b>Ne biter ne devreder: irrasyonel.</b>',
        '√2 sayı doğrusunda vardır ama hiçbir kesre eşit değildir.',
        '<b class="tr">R</b> = <b class="tq">Q</b> ∪ <b class="ti">Q′</b>. R dört işlemde de kapalıdır (sıfıra bölme hariç).',
      ],
      next: { href: 'c4-siralama-ve-arada-olma.html', label: 'Sonraki: Sıralama ve arada olma ›' },
    },
    c4: {
      title: 'Sıralama ve arada olma',
      hook: '3’ten sonraki tam sayı 4. Peki <b>0,5’ten sonraki sayı</b> hangisi?',
      scenes: [
        { title: 'Bir sonraki sayı', goal: 'Her adayın önüne daha yakın bir sayı girdiğini gör.', run: c4Sonraki },
        { title: 'Sıraya diz', goal: 'Sayı doğrusunda soldaki küçüktür; negatiflerde de.', run: c4Sirala },
        { title: 'Tam sayıda boş, kesirde dolu', goal: 'İki kesrin ortası yine bir kesirdir: (a + b)/2.', run: c4Arada },
        { title: 'Sıra sende: arasına düşeni seç', goal: 'Arasındaki sayıyı bul; hangi kümelerde arada olma var?', run: c4Sec },
      ],
      quiz: [
        {
          q: `−${F(3, 4)} ile −${F(2, 3)} sayılarından hangisi <b>küçüktür</b>?`,
          options: [`−${F(3, 4)}`, `−${F(2, 3)}`, 'Eşittirler'], answer: 0,
          why: [
            '−9/12 < −8/12. Sayı doğrusunda −3/4 daha soldadır.',
            '3/4 > 2/3 olduğu için negatifinde sıra ters döner: −3/4 daha solda.',
            '−3/4 = −0,75 ve −2/3 = −0,666…: farklı sayılar.'],
          scene: 1,
        },
        {
          q: `${F(1, 5)} ile ${F(1, 3)} <b>arasında</b> hangisi vardır?`,
          options: [F(1, 6), F(4, 15), F(2, 5)], answer: 1,
          why: [
            '1/6 ≈ 0,17: 1/5’in solunda kalır.',
            '1/5 = 3/15 ve 1/3 = 5/15; 4/15 tam ortalarıdır.',
            '2/5 = 0,4: 1/3’ün sağında kalır.'],
          scene: 2,
        },
        {
          q: `${F(1, 4)} ile ${F(1, 2)} sayılarının <b>tam ortasındaki</b> sayı hangisidir?`,
          options: [F(1, 3), F(3, 8), F(3, 4)], answer: 1,
          why: [
            '1/3 iki sayının arasında; ama tam ortası değil. 1/4 = 0,25 ve 1/2 = 0,5; ortası 0,375.',
            `${F(1, 4)} + ${F(1, 2)} = ${F(3, 4)}; ikiye bölününce ${F(3, 8)}.`,
            'Toplamı almışsın, ikiye bölmeyi unutmuşsun. 3/4 zaten 1/2’den büyük.'],
          scene: 2,
        },
        {
          q: '0,5 ile 0,6 arasında kaç sayı vardır?',
          options: ['Sonsuz çok', 'Hiç yok; 0,6, 0,5’ten sonraki sayıdır', 'Yalnızca bir tane: 0,55'], answer: 0,
          why: [
            '0,55, 0,555, 0,5555… hepsi arada. Her iki sayının arasına yeni bir sayı girer.',
            'Kesirlerde “bir sonraki sayı” yoktur. 0,5 ile 0,6’nın arasında 0,55 var.',
            '0,55 arada; ama 0,57 de, 0,501 de arada. Tek bir tane değil.'],
          scene: 0,
        },
      ],
      summary: [
        '<b>Kesirlerde “bir sonraki sayı” yoktur.</b>',
        `Sayı doğrusunda soldaki küçüktür: −${F(1, 2)} &lt; −${F(1, 3)}.`,
        '<b>Sıralı olma</b> dört kümede de var; <b>arada olma</b> yalnızca Q ve R’de.',
        `a ile b’nin ortası ${F('a + b', 2)} her zaman aradadır.`,
      ],
      next: { href: 'c5-ispat-mi-karsi-ornek-mi.html', label: 'Sonraki: İspat mı, karşı örnek mi? ›' },
    },
    c5: {
      title: 'İspat mı, karşı örnek mi?',
      hook: 'Denediğimiz her iki kesrin arasında yeni bir kesir bulduk. Kaç denemeden sonra <b>“her zaman bulunur”</b> diyebiliriz?',
      scenes: [
        { title: 'Tanıklar yetmez', goal: 'Örnekler iddiayı kanıtlamaz; tek karşı örnek çürütür.', run: c5Taniklar },
        { title: 'Sıra sende: karşı örnek avı', goal: 'Üç iddiayı birer örnekle çürüt.', run: c5Av },
        { title: 'İspat', goal: 'İki rasyonelin ortasının rasyonel ve arada olduğunu göster.', run: c5Ispat },
      ],
      quiz: [
        {
          q: '“İki irrasyonelin toplamı <b>her zaman</b> irrasyoneldir.” Bu iddiayı hangisi çürütür?',
          options: [`${M.sqrt(2)} + ${M.sqrt(3)}`, `${M.sqrt(2)} + (−${M.sqrt(2)}) = 0`, '1 + 2 = 3'], answer: 1,
          why: [
            '√2 + √3 irrasyoneldir: bu iddiayı destekleyen bir tanık, çürütmez.',
            'İki irrasyonelin toplamı 0 çıktı; 0 rasyoneldir. Tek karşı örnek yeter.',
            '1 ve 2 irrasyonel değil; iddia bu sayılar hakkında bir şey söylemiyor.'],
          scene: 0,
        },
        {
          q: `a &lt; b iki rasyonel sayı olsun. ${F('a + b', 2)} için hangisi <b>her zaman</b> doğrudur?`,
          options: ['Rasyoneldir ve a ile b’nin arasındadır', 'Rasyoneldir ama b’den büyük olabilir', 'a ile b’nin arasındadır ama irrasyonel olabilir'], answer: 0,
          why: [
            'Q toplamada ve bölmede kapalıdır; 2a < a + b < 2b olduğundan orta nokta aradadır.',
            'a + b < 2b olduğundan yarısı b’den küçüktür.',
            'İki rasyonelin toplamı ve yarısı yine rasyoneldir.'],
          scene: 2,
        },
        {
          q: 'Ayşe “iki rasyonelin çarpımı her zaman tam sayıdır” diyor. Onu çürütmek için hangi iki sayıyı seçmelisin?',
          options: ['2 ve 3', `${F(1, 2)} ve 6`, `${F(1, 2)} ve ${F(1, 3)}`], answer: 2,
          why: [
            '2 · 3 = 6 tam sayı: bu iddiayı destekleyen bir tanık, çürütmez.',
            `${F(1, 2)} · 6 = 3 tam sayı çıkıyor: bu da çürütmez.`,
            `${F(1, 2)} · ${F(1, 3)} = ${F(1, 6)} tam sayı değil. Tek karşı örnek yeter.`],
          scene: 1,
        },
        {
          q: `Selin “iki irrasyonelin çarpımı rasyoneldir” iddiasını ${M.sqrt(2)} · ${M.sqrt(8)} = 4 ve ${M.sqrt(3)} · ${M.sqrt(12)} = 6 ile denedi. İkisi de tuttu. Selin ne söyleyebilir?`,
          options: ['İki örnek tuttuğu için iddia kanıtlandı', `Kanıtlanmadı; ${M.sqrt(2)} · ${M.sqrt(3)} = ${M.sqrt(6)} irrasyonel, bu tek örnek iddiayı çürütür`, 'İki örnek yetmedi; ama on örnek tutarsa iddia kanıtlanır'], answer: 1,
          why: [
            'İki örnek, sonsuz çiftin yalnızca ikisi. Tanıklar kanıtlamaz.',
            `${M.sqrt(2)} · ${M.sqrt(3)} = ${M.sqrt(6)}; 6 tam kare değil, sonuç irrasyonel. Tek karşı örnek yeter.`,
            'Kaç örnek olursa olsun “her zaman” demeye yetmez. Bin tanık da kanıtlamaz.'],
          scene: 0,
        },
      ],
      summary: [
        '<b>Bin örnek kanıtlamaz, tek karşı örnek çürütür.</b>',
        '“Her” iddiasını çürütmek için tek karşı örnek yeter: √2 · √2 = 2.',
        `Kanıtlamak için ispat gerekir: a &lt; b rasyonelse a &lt; ${F('a + b', 2)} &lt; b.`,
      ],
      next: { href: 'c6-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
    },
  };

  const anahtar = window.DERS_PARCA || 'c1';
  const parca = PARCALAR[anahtar];
  Ders.start({
    id: 'sayilar-' + anahtar,
    kicker: 'Konu C · Sayı kümeleri',
    title: parca.title,
    accent: '#c792ff',
    back: 'index.html',
    intro: { title: parca.title, hook: parca.hook, button: 'Derse başla ›' },
    scenes: parca.scenes.map(wrapScene),
    quiz: parca.quiz,
    quizTitle: 'Çıkış soruları',
    summary: parca.summary,
    nextLesson: parca.next,
  });
})();
