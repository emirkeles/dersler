/* 03 — Sayı Kümeleri ve İşlem Özellikleri: "Matruşka Sayılar"
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
  const CELL = { '?': ['?', 'var(--muted)', 'rgba(255,255,255,.04)', 'var(--line)'], '..': ['…', 'var(--warn)', 'rgba(255,200,87,.10)', 'var(--warn)'], x: ['', 'var(--err)', 'rgba(255,77,94,.16)', 'var(--err)'], v: ['', 'var(--ok)', 'rgba(61,220,151,.14)', 'var(--ok)'], na: ['—', 'var(--muted)', 'rgba(255,255,255,.03)', 'var(--line)'], lock: ['', 'var(--muted)', 'rgba(255,255,255,.03)', 'var(--line)'] };
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
    t.set = (r, cl, st, animate = true) => {
      const ce = t.cells[r + '|' + cl]; if (!ce) return Promise.resolve();
      const d = CELL[st]; ce.state = st; ce.rect.setAttribute('fill', d[2]); ce.rect.setAttribute('stroke', d[3]);
      ce.tx.textContent = d[0]; ce.tx.style.fill = d[1]; ce.ic.innerHTML = '';
      if (st === 'v' || st === 'x') icon(ce.ic, st === 'v' ? 'ok' : 'no', 0, 0, 0.9);
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
    T(g, x0 + 6, y0 - 16, 'KAPALILIK KAPISI', 22, MUTED, { anchor: 'start', bold: 700 });
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
    gt.setKey = (k) => { gt.key = k; gt.keyLab.textContent = 'seçili kutu: ' + LET[k]; gt.keyLab.style.fill = COLV[k]; };
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
      const lbl = tag(root, sx, sy - 40, 'dışarıda!', 22, 'var(--err)'); gt.landed.push(rp, lbl); gt.r = null;
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
      const num = T(rg, 36, 0, String(i), 22, MUTED, {});
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
    const xv = colX(ncol - 1) + dx / 2 + 8;
    const col0 = 'var(--ink)';
    // bölünen
    String(a).split('').forEach((d, i) => T(g, colX(i), 0, d, fs, col0, { bold: 700, mono: true }));
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
    const numG = (str, endCol, row, colr, opts2 = {}) => {
      const gg = E('g', {}, g);
      String(str).split('').reverse().forEach((d, i) => { const cidx = endCol - i; T(gg, colX(cidx), row * rh, d, fs, (opts2.lastCol && i === 0) ? opts2.lastCol : colr, { bold: 700, mono: true }); });
      return gg;
    };
    const hiBox = (str, endCol, row, col) => {
      const n = String(str).length; const x1 = colX(endCol - n + 1) - dx * 0.5 - 3, x2 = colX(endCol) + dx * 0.5 + 3;
      return E('rect', { x: x1, y: row * rh - rh * 0.5, width: x2 - x1, height: rh, rx: 10, fill: 'none', stroke: col, 'stroke-width': 3.5, opacity: 0, filter: 'url(#sh)' }, g);
    };
    const cend = (k) => la - 1 + k;
    ld.start = async () => {
      op(g, 0); await fade(c, g, 1, 500 * sp);
      if (ip === 0) { const t = T(g, qX(-1), qy, '0,', fs + 2, 'var(--ok)', { bold: 700, mono: true }); op(t, 0); await fade(c, t, 1, 300 * sp); ld.qdigits.push(t); }
      if (o.ledger) { ld.row0 = await o.ledger.add(info.r0, 'başlangıç', 'var(--q)'); o.ledger.ring(0, 'var(--q)'); }
    };
    ld.stepInt = async () => {
      if (ip === 0 || ld.intDone) return; ld.intDone = true;
      const hb = hiBox(a, la - 1, 0, 'var(--warn)'); await fade(c, hb, 1, 250 * sp);
      ld.eq.textContent = `${a} ÷ ${b} = ${ip}, kalan ${info.r0}`;
      const qd = G(g, qX(-1), qy); T(qd, 0, 0, String(ip), fs + 2, 'var(--ok)', { bold: 700, mono: true }); await pop(c, qd, 1, 350 * sp);
      const cm = T(g, qX(-1) + dx * 0.62, qy + 5, ',', fs + 2, 'var(--ok)', { bold: 700, mono: true }); ld.qdigits.push(qd, cm);
      const pr = String(ip * b); const gg = numG(pr, la - 1, prodRow(0) || 1, col0); T(gg, colX(la - 1 - pr.length), (1) * rh, MINUS, fs, MUTED, { mono: true });
      op(gg, 0); await fade(c, gg, 1, 350 * sp);
      E('line', { x1: colX(la - 1 - pr.length) - dx * 0.4, x2: colX(la - 1) + dx * 0.5, y1: rh * 1.5, y2: rh * 1.5, stroke: 'var(--ink)', 'stroke-width': 2.5 }, g);
      const rs = String(info.r0 * 10); const rg = numG(rs, la, 2, col0, { lastCol: 'var(--q)' }); op(rg, 0); await fade(c, rg, 1, 350 * sp);
      op(hb, 0); ld.zeros[0] && op(ld.zeros[0], 0.1);
    };
    ld.step = async () => {
      if (ld.k >= K) return null;
      if (ip > 0 && !ld.intDone) await ld.stepInt();
      const k = ++ld.k; const s2 = info.steps[k - 1]; const ec = cend(k);
      const curRow = k === 1 ? (ip > 0 ? 2 : 0) : prodRow(k) - 1;
      const hb = hiBox(s2.cur, ec, curRow, 'var(--warn)'); await fade(c, hb, 1, 250 * sp);
      ld.eq.textContent = `${s2.cur} ÷ ${b} = ${s2.dg}, kalan ${s2.rem}`;
      const qd = G(g, qX(k - 1), qy); T(qd, 0, 0, String(s2.dg), fs + 2, 'var(--ok)', { bold: 700, mono: true }); ld.qdigits.push(qd); await pop(c, qd, 1, 380 * sp);
      const pr = String(s2.prod); const pg = numG(pr, ec, prodRow(k), col0); T(pg, colX(ec - pr.length), prodRow(k) * rh, MINUS, fs, MUTED, { mono: true });
      op(pg, 0); await fade(c, pg, 1, 350 * sp);
      E('line', { x1: colX(ec - pr.length) - dx * 0.4, x2: colX(ec) + dx * 0.5, y1: prodRow(k) * rh + rh * 0.5, y2: prodRow(k) * rh + rh * 0.5, stroke: 'var(--ink)', 'stroke-width': 2.5 }, g);
      const rr = prodRow(k) + 1; let rg;
      if (k < K) rg = numG(String(s2.rem * 10), ec + 1, rr, col0, { lastCol: 'var(--q)' });
      else { rg = numG(String(s2.rem), ec, rr, s2.rem === 0 ? 'var(--ok)' : col0); }
      op(rg, 0); await fade(c, rg, 1, 350 * sp);
      if (k < K && ld.zeros[k - 1]) op(ld.zeros[k - 1], 0.1);
      if (k === K && s2.rem === 0) { const fr = hiBox('0', ec, rr, 'var(--ok)'); await fade(c, fr, 1, 300 * sp); }
      op(hb, 0);
      if (o.ledger) {
        const row = await o.ledger.add(s2.rem, s2.rem === 0 ? 'kalan 0 → bitti' : '', s2.rem === 0 ? 'var(--ok)' : 'var(--q)');
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

  /* ================= SAHNE 1 — İç içe matruşkalar ================= */
  SCENES.push({
    title: 'İç içe matruşkalar',
    goal: 'Dört kutunun iç içe ilişkisini sez: N ⊂ Z ⊂ Q ⊂ R. Her kutu neden doğdu?',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const df = svg.querySelector('defs');
      const SPLIT = {};
      KEYS.forEach((k) => {
        const b = GEO[k]; SPLIT[k] = b.y + 0.42 * (BASE - b.y);
        E('rect', { x: 0, y: SPLIT[k], width: 1280, height: 720 - SPLIT[k] }, E('clipPath', { id: 'cb-' + k }, df));
        E('rect', { x: 0, y: 0, width: 1280, height: SPLIT[k] }, E('clipPath', { id: 'ct-' + k }, df));
      });
      const cam = E('g', {}, root);
      const setCam = (s) => cam.setAttribute('transform', `translate(${640 * (1 - s)} ${620 * (1 - s)}) scale(${s})`);
      setCam(0.5);
      const mat = Mat(c, svg, cam, { s: 1, tx: 0, ty: 0 }); op(mat.root, 0);
      const dollsG = E('g', {}, cam); op(dollsG, 0);
      const dolls = {};
      ['N', 'Z', 'Q', 'R'].forEach((k) => {
        const b = GEO[k], d = { k }; d.body = E('g', {}, dollsG);
        const bot = E('g', { 'clip-path': `url(#cb-${k})` }, d.body);
        E('path', { d: boxPath(k), fill: '#0d1330' }, bot);
        E('path', { d: boxPath(k), fill: COLV[k], 'fill-opacity': 0.3, stroke: COLV[k], 'stroke-width': 4 }, bot);
        // süs: kuşak ve çiçek
        E('line', { x1: b.x + 10, x2: b.x + b.w - 10, y1: SPLIT[k] + 34, y2: SPLIT[k] + 34, stroke: COLV[k], 'stroke-width': 5, opacity: 0.45 }, bot);
        const fy = (SPLIT[k] + BASE) / 2 + 24;
        E('circle', { cx: 640, cy: fy, r: 8 + (k === 'R' ? 8 : k === 'Q' ? 5 : k === 'Z' ? 2 : 0), fill: COLV[k], opacity: 0.5 }, bot);
        E('line', { x1: b.x + 6, x2: b.x + b.w - 6, y1: SPLIT[k], y2: SPLIT[k], stroke: COLV[k], 'stroke-width': 5, opacity: 0.9 }, bot);
        d.top = E('g', {}, d.body);
        const ti = E('g', { 'clip-path': `url(#ct-${k})` }, d.top);
        E('path', { d: boxPath(k), fill: '#0d1330' }, ti);
        E('path', { d: boxPath(k), fill: COLV[k], 'fill-opacity': 0.42, stroke: COLV[k], 'stroke-width': 4 }, ti);
        E('circle', { cx: 640, cy: SPLIT[k] - (SPLIT[k] - b.y) * 0.42, r: 6, fill: COLV[k], opacity: 0.55 }, ti);
        d.hx = b.x + 40; d.hy = SPLIT[k];
        d.open = (e) => d.top.setAttribute('transform', `translate(0 ${-90 * e}) rotate(${-14 * e} ${d.hx} ${d.hy})`);
        d.rise = (e) => d.body.setAttribute('transform', `translate(0 ${-80 * e})`);
        dolls[k] = d;
      });
      // başlık
      const ttl = G(root, 640, 330); const tt = T(ttl, 0, 0, 'Matruşka Sayılar', 72, 'var(--ink)', { bold: 800 });
      const tsub = T(ttl, 0, 66, 'Sayı kümeleri ve işlem özellikleri', 34, MUTED);
      op(ttl, 0);
      await fade(c, ttl, 1, 1100);
      await c.wait(900);
      c.say('Matruşkaları bilirsin: büyük olanı aç, içinden bir küçüğü çıkar.', { noWait: true });
      await par(mv(c, ttl, 640, 80, 1000, ease.inOut, { s: 0.58 }), c.tween(900, (e) => op(dollsG, e)));
      op(dollsG, 1);
      // matruşka süzülerek gelir (cam içinde)
      await c.tween(800, (e) => { dollsG.setAttribute('transform', `translate(0 ${-60 * (1 - e)})`); }, ease.back);
      dollsG.removeAttribute('transform');
      await c.wait(600);
      // sağda etiket listesi
      const lbls = {}; const names = { R: 'Gerçek sayılar', Q: 'Rasyonel sayılar', Z: 'Tam sayılar', N: 'Doğal sayılar' };
      ['R', 'Q', 'Z', 'N'].forEach((k, i) => {
        const g = G(root, 1000, 410 + i * 62); op(g, 0);
        E('rect', { x: -6, y: -24, width: 270, height: 48, rx: 24, fill: 'rgba(10,15,30,.7)', stroke: COLV[k], 'stroke-width': 3 }, g);
        const cc = E('circle', { cx: 24, cy: 0, r: 17, fill: COLV[k] }, g); T(g, 24, 1, LET[k], 24, '#0F1420', { bold: 800 });
        T(g, 52, 1, names[k], 25, 'var(--ink)', { anchor: 'start', bold: 600 });
        lbls[k] = g;
      });
      const order = ['R', 'Q', 'Z', 'N'];
      const say2 = c.say('Sayılar da böyle iç içe yaşıyor: doğal sayılar, tam sayıların içinde; tam sayılar, rasyonellerin içinde; rasyoneller de gerçek sayıların içinde.', { ms: 6500 });
      for (let i = 0; i < 4; i++) {
        const k = order[i], nxt = order[i + 1];
        const jobs = [c.tween(800, (e) => dolls[k].open(e)), fade(c, lbls[k], 1, 500)];
        if (nxt) jobs.push(c.tween(900, (e) => dolls[nxt].rise(e)));
        await par(...jobs);
        if (k === 'N') {
          // N'nin içinden 0,1,2,3 jetonları zıplar
          const tk = [0, 1, 2, 3].map((v, j) => { const p = pill(cam, q(v), { x: 560 + j * 54, y: 400, size: 24 }); put(p, { s: 0.001 }); return p; });
          for (let j = 0; j < 4; j++) { pop(c, tk[j], 0.9, 380); await c.wait(160); }
          dolls._tk = tk;
        }
        await c.wait(250);
      }
      await say2;
      // kapan
      if (dolls._tk) await fadeAll(c, dolls._tk, 0, 300);
      if (dolls._tk) dolls._tk.forEach((p) => p.remove());
      await par(...['N', 'Z', 'Q', 'R'].map((k) => c.tween(800, (e) => dolls[k].open(1 - e))), ...['Z', 'Q', 'R'].map((k) => c.tween(800, (e) => dolls[k].rise(1 - e))), c.tween(800, (e) => dolls.N.rise(1 - e)));
      c.say('Ama kimse bu kutuları bir günde yapmadı. Her yeni kutu, bir öncekinde <b>yapılamayan bir işlem</b> yüzünden doğdu. Bugün bunun hikâyesine bakacağız.', { noWait: true });
      // kesit görünümüne geçiş
      op(mat.root, 0);
      await par(
        c.tween(1100, (e) => setCam(lerp(0.5, 1, e))),
        fade(c, ttl, 0, 600),
        fadeAll(c, Object.values(lbls), 0, 600),
        c.tween(1100, (e) => { op(dollsG, 1 - Math.min(1, e * 1.6)); op(mat.root, Math.max(0, e * 1.4 - 0.4)); }));
      op(dollsG, 0); op(mat.root, 1); dollsG.remove();
      for (const k of ['N', 'Z', 'Q', 'R']) { mat.lit(k, true); mat.pulse(k, COLV[k], 1, 300); await c.wait(300); }
      await c.wait(400);
      // N ⊂ Z ⊂ Q ⊂ R
      const ex = G(root, 640, 672); const seq = ['N', '⊂', 'Z', '⊂', 'Q', '⊂', 'R']; const parts = [];
      seq.forEach((s2, i) => { const t = T(ex, (i - 3) * 72, 0, s2, 54, s2.length === 1 && COLV[s2] ? COLV[s2] : 'var(--ink)', { bold: 800 }); op(t, 0); parts.push(t); });
      const spkSub = 'Doğal sayılar tam sayıların, tam sayılar rasyonel sayıların, rasyonel sayılar da gerçek sayıların alt kümesidir.';
      c.say('<b>N ⊂ Z ⊂ Q ⊂ R</b>: her kutu bir öncekinden gerçekten daha büyük, çünkü her biri bir ihtiyaçtan doğdu.', { speak: spkSub, noWait: true });
      for (let i = 0; i < seq.length; i++) {
        await fade(c, parts[i], 1, 260);
        if (seq[i] === '⊂') { const k = ['N', 'Z', 'Q', 'R'][(i - 1) / 2]; mat.pulse(k, COLV[k], 1, 420); await c.wait(300); }
      }
      await c.wait(1600);
      await fade(c, ex, 0, 400);
      // --- ısınma tahmini ---
      const toks = [q(5), q(-3), q(1, 2), irr('√2', 1.4142)];
      const xs = [400, 560, 720, 880];
      const pills = toks.map((t, i) => { const p = pill(root, t, { x: xs[i], y: 668, size: 28 }); put(p, { s: 0.001 }); return p; });
      for (const p of pills) { pop(c, p, 1, 380); await c.wait(120); }
      const kutu = ['Doğal sayılar (N)', 'Tam sayılar (Z)', 'Rasyonel sayılar (Q)'];
      let wrong = 0; const used = new Set();
      const choiceP = c.choice({
        tag: 'Isınma tahmini', q: 'Hangi sayı yalnızca <b>en büyük kutuya (R)</b> sığar? Bir sayıya dokun.',
        options: ['5', MINUS + '3', F(1, 2), M.sqrt(2)], answer: 3,
        hints: kutu.map((kk) => `Bu sayı daha küçük bir kutuya da sığıyor: <b>${kk}</b>. Hepsini kutuya yerleştirdiğinde hangisinin “kaçak” olduğunu göreceksin.`),
        right: 'Doğru sezgi! √2 hiçbir kesir kutusuna sığmıyor. Birazdan nedenini göreceğiz.',
        onPick: (i, ok) => {
          if (used.has(i)) return; used.add(i);
          const t = toks[i], k = smallest(t); const [sx, sy] = mat.slot(k);
          mv(c, pills[i], sx, sy, 900, ease.inOut, { s: 0.9 }).catch(() => {});
          pills[i].setCol(COLV[k]);
          mat.pulse(k, COLV[k], 2, 260).catch(() => {});
          if (k === 'Qp') { mat.bandLine.setAttribute('opacity', 1); mat.band.setAttribute('fill-opacity', 0.12); }
          if (!ok) { wrong++; if (wrong >= 2) { const sp = pills[3]; c.tween(900, (e) => put(sp, { s: 1 + 0.22 * Math.abs(Math.sin(e * Math.PI * 3)) })).catch(() => {}); } }
        },
      });
      const btns = [...c.act.querySelectorAll('.opts .opt')];
      pills.forEach((p, i) => { p.style.cursor = 'pointer'; c.on(p, 'click', () => { if (!btns[i].disabled) btns[i].click(); }); });
      Sorter(c, svg, {
        items: pills.map((p, i) => ({ g: p, home: { x: xs[i], y: 668, s: 1 }, id: 'tok' + i, aria: lab(toks[i]) })),
        zones: [{ id: 'mat', el: mat.box.R, hit: (x, y) => inside('R', x, y) }],
        onDrop: async (it) => { const i = pills.indexOf(it.g); if (btns[i].disabled) return false; btns[i].click(); return true; },
      });
      const r = await choiceP;
      c.note('<b>N ⊂ Z ⊂ Q ⊂ R</b>: her küme bir sonrakinin içindedir.<br>Her genişleme, bir öncekinde <b>yapılamayan</b> bir işlem ya da uzunluk yüzünden doğdu.', 'Matruşka Sayılar', 's1');
      await c.say('Hazır mısın? İlk kutudan başlayalım: <b>doğal sayılar</b>.', { ms: 2000 });
    },
  });

  /* ---- kapı sahneleri için ortak parçalar ---- */
  const GL = { s: 0.64, tx: 4.4, ty: 253.2 };
  const OPS = ['+', MINUS, '×', '÷'];
  function yn(c, q2, truth, hint, right, next) {
    return c.choice({ tag: 'Tahmin et', q: q2, options: ['Evet', 'Hayır'], answer: truth ? 0 : 1, hints: truth ? ['', hint] : [hint, ''], right, next: next || 'Test et ›' });
  }
  function basket(p, x, y, k = 1) {
    const g = G(p, x, y); g._p.s = k; place(g);
    E('path', { d: 'M-62,-26 Q0,-104 62,-26', fill: 'none', stroke: 'var(--n)', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    E('path', { d: 'M-72,-26 H72 L58,50 Q56,60 46,60 H-46 Q-56,60 -58,50 Z', fill: 'url(#pg2)', stroke: 'var(--n)', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    for (let i = -3; i <= 3; i++) E('line', { x1: i * 20, x2: i * 17, y1: -22, y2: 56, stroke: 'var(--n)', 'stroke-width': 2, opacity: 0.35 }, g);
    for (let j = 0; j < 3; j++) E('line', { x1: -66 + j * 5, x2: 66 - j * 5, y1: -4 + j * 22, y2: -4 + j * 22, stroke: 'var(--n)', 'stroke-width': 2, opacity: 0.35 }, g);
    return g;
  }
  function balloon(p, x, y, w, hh, str, size = 32, col = 'var(--ink)') {
    const g = G(p, x, y);
    E('path', { d: `M${-w / 2},${-hh / 2 + 18} Q${-w / 2},${-hh / 2} ${-w / 2 + 18},${-hh / 2} H${w / 2 - 18} Q${w / 2},${-hh / 2} ${w / 2},${-hh / 2 + 18} V${hh / 2 - 18} Q${w / 2},${hh / 2} ${w / 2 - 18},${hh / 2} H${-w / 2 + 40} L${-w / 2 - 14},${hh / 2 + 24} L${-w / 2 + 14},${hh / 2} Q${-w / 2},${hh / 2} ${-w / 2},${hh / 2 - 18} Z`, fill: 'url(#pg)', stroke: 'var(--line)', 'stroke-width': 2, filter: 'url(#sh)' }, g);
    T(g, 0, 0, str, size, col, { bold: 700 });
    return g;
  }
  /* kapalılık tablosu için standart konum */
  const TBL_POS = { x: 836, y: 122, cw: 86, ch: 72, hw: 74, hh: 54 };
  function stdTbl(c, root, rows) {
    const t = Tbl(c, root, { ...TBL_POS, rows, cols: OPS });
    const ly = TBL_POS.y + TBL_POS.hh + rows.length * TBL_POS.ch + 38;
    const lg = G(root, TBL_POS.x, ly); t.legend = lg;
    icon(lg, 'ok', 20, 0, 0.8); T(lg, 52, 0, 'sonuç kutuda kalır', 26, 'var(--ok)', { anchor: 'start', bold: 600 });
    icon(lg, 'no', 20, 46, 0.8); T(lg, 52, 46, 'sonuç kutudan çıkar', 26, 'var(--err)', { anchor: 'start', bold: 600 });
    T(lg, 20, 92, '…', 30, 'var(--warn)', { bold: 800 }); T(lg, 52, 92, 'daha çok örnek gerek', 26, 'var(--warn)', { anchor: 'start', bold: 600 });
    return t;
  }
  function clsTxt(tbl, rows) { return rows; }

  /* ================= SAHNE 2 — N: Saymak ve ilk kapalılık testi ================= */
  SCENES.push({
    title: 'N: Saymak ve ilk kapalılık testi',
    goal: 'N’yi (0 dahil) tanı; kapalılık testini ilk kez gör: sonuç kutuda kalıyor mu?',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { s: 1, tx: 0, ty: 0 }); op(mat.root, 0); mat.lit('N', true);
      await fade(c, mat.root, 1, 600);
      const sp1 = c.say('İlk kutu <b>saymak</b> için yapıldı: sıfır, bir, iki, üç…', { ms: 3200 });
      await par(mat.tweenTo(mat.focus('N', 1.7), 1300), c.tween(1300, (e) => ['R', 'Q', 'Z'].forEach((k) => mat.dim(k, 1 - 0.85 * e))));
      await sp1;
      // sayı doğrusu
      const nl = G(root, 0, 0);
      const lineY = 520, nx = (n) => 290 + 76 * n;
      const ln = E('line', { x1: 262, x2: 1044, y1: lineY, y2: lineY, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': 'url(#ar-ink)' }, nl); op(ln, 0);
      await fade(c, ln, 1, 400);
      const dots = [];
      for (let n = 0; n <= 9; n++) {
        const d = G(nl, nx(n), lineY);
        if (n === 0) E('circle', { r: 28, fill: 'var(--n)', opacity: 0.25, filter: 'url(#blur6)' }, d);
        E('circle', { r: n === 0 ? 17 : 12, fill: 'var(--n)', stroke: '#0F1420', 'stroke-width': 3 }, d);
        T(d, 0, 44, String(n), 32, n === 0 ? 'var(--n)' : 'var(--ink)', { bold: 700 });
        dots.push(d); pop(c, d, 1, 300); await c.wait(n === 0 ? 480 : 230);
      }
      T(nl, 1020, lineY + 40, '…', 40, MUTED, { bold: 700 });
      await c.say('Sıfır da bu kutuda: sepette hiç elma yoksa “kaç elma var?” sorusunun cevabı <b>sıfırdır</b>.', { ms: 4200, speak: 'Sıfır da bu kutuda: sepette hiç elma yoksa, kaç elma var sorusunun cevabı sıfırdır.' });
      // sepet
      const bk = basket(root, 380, 330, 1.25); op(bk, 0);
      const bl = balloon(root, 640, 280, 250, 76, 'kaç elma?  0', 34, 'var(--n)'); op(bl, 0);
      const wire = E('path', { d: `M${nx(0)},${lineY - 22} C${nx(0)},${lineY - 90} 380,${lineY - 60} 380,420`, fill: 'none', stroke: 'var(--n)', 'stroke-width': 3, 'stroke-dasharray': '7 6', opacity: 0 }, root);
      await par(fade(c, bk, 1, 600), fade(c, wire, 0.8, 600));
      await fade(c, bl, 1, 500);
      const form = G(root, 860, 330); op(form, 0); T(form, 0, 0, 'a + 0 = a', 50, 'var(--ink)', { bold: 700 });
      await fade(c, form, 1, 500);
      await c.say('Toplamada hiçbir şeyi değiştirmeyen bir sayı olabilmesi için <b>0, N’de olmalı</b>.', { ms: 3600 });
      await par(fade(c, nl, 0, 500), fade(c, bk, 0, 500), fade(c, bl, 0, 500), fade(c, form, 0, 500), fade(c, wire, 0, 500));
      // kapı düzeni
      c.say('Şimdi bir test kuralı öğrenelim: iki sayıyı al, işlem yap. Sonuç hâlâ kutunun içindeyse <b class="good">yeşil</b>, dışına çıkıyorsa <b class="bad">kırmızı</b> yanar. Buna <b>kapalılık testi</b> diyoruz.', { ms: 8200, speak: 'Şimdi bir test kuralı öğrenelim: iki sayıyı al, işlem yap. Sonuç hâlâ kutunun içindeyse yeşil, dışına çıkıyorsa kırmızı yanar. Buna kapalılık testi diyoruz.', noWait: true });
      await par(mat.tweenTo(GL, 1200), c.tween(1200, (e) => ['R', 'Q', 'Z'].forEach((k) => mat.dim(k, 0.15 + 0.85 * e))));
      mat.glow('N', 0.7, 'var(--n)');
      const gate = Gate(c, root, mat, { key: 'N' }); op(gate.g, 0);
      const tbl = stdTbl(c, root, ['N']); op(tbl.g, 0);
      await par(fade(c, gate.g, 1, 600), fade(c, tbl.g, 1, 600));
      mat.glow('N', 0, 'var(--ok)');
      await c.wait(4500);

      // --- deneme 1 ve 2 ---
      const T12 = [[q(2), '+', q(7), 0], [q(4), '×', q(6), 2]];
      for (const [a, o2, b, col] of T12) {
        await gate.load(a, o2, b);
        await yn(c, `<b>${a.n} ${o2} ${b.n}</b> işleminin sonucu N’nin içinde mi?`, true, `${a.n} ${o2} ${b.n} = ${calc(a, o2, b).n} ve ${calc(a, o2, b).n} bir doğal sayı. Test edince göreceksin.`, `Evet: sonuç bir doğal sayı olacak. Haydi test edelim.`);
        const r = await gate.run(calc(a, o2, b));
        tbl.set('N', o2, '..');
        await c.wait(900);
      }
      // --- deneme 3: 3 − 5 ---
      const a3 = q(3), b3 = q(5);
      await gate.load(a3, MINUS, b3);
      await c.choice({
        tag: 'Tahmin et', q: `<b>3 ${MINUS} 5</b> sonucu ne olur?`, options: [MINUS + '2', '2', 'Yapılamaz, sonuç yok'], answer: 0,
        hints: ['', '5 − 3 olsaydı 2 olurdu. Burada 3’ten 5 çıkarıyoruz: 3’ten 5 adım geri gidince sıfırı geçip <b>−2</b>’ye ineriz. N’de sıfırın solu yok.', '<b>Yapılabiliyor.</b> Sonuç var: −2. Sorun işlemde değil; sonucun yaşayacağı yer N’de yok.'],
        right: 'Evet, sonuç −2. Peki −2 bu kutuda mı? Test edelim.', next: 'Test et ›',
      });
      const r3 = await gate.run(calc(a3, MINUS, b3));
      tbl.set('N', MINUS, 'x');
      await c.say('3 − 5 = −2, ama <b>−2 ∉ N</b>: kırmızı. Tek bir kırmızı örnek, N’nin çıkarmada kapalı olmadığını gösterir.', { ms: 5200, speak: 'Üç eksi beş eşittir eksi iki, ama eksi iki, N kümesinin elemanı değil: kırmızı. Tek bir kırmızı örnek, N kümesinin çıkarmada kapalı olmadığını gösterir.' });
      // --- toplama ve çarpma için karar ---
      await c.choice({
        tag: 'Düşün', q: 'Toplama ve çarpma için <b>“kapalı”</b> diyebilir miyiz?',
        options: ['<b>2 + 7</b> yeşil çıktı; yeter.', '<b>Her çiftte</b> yeşil olmalı.'], answer: 1,
        hints: ['Bir örnek yeterli değil! Bunu laboratuvarda deneyeceğiz. Ama şu kadarı kesin: iki doğal sayının toplamı ve çarpımı her zaman doğal sayıdır.', ''],
        right: 'Doğru: kapalılık için <b>her</b> çift yeşil olmalı. İki doğal sayının toplamı ve çarpımı her zaman doğal sayıdır.', next: 'Tabloyu tamamla ›',
      });
      await tbl.set('N', '+', 'v'); await tbl.set('N', '×', 'v');
      tbl.set('N', '÷', '?'); op(tbl.cells['N|÷'].g, 0.35);
      await c.wait(900);
      c.note(`<b>N = {0, 1, 2, 3, …}</b> (bu derste 0 ∈ N). N⁺ = {1, 2, 3, …}.<br><b>Kapalılık:</b> her çift için sonuç kümede kalıyorsa küme o işlemde kapalıdır. <b>Tek karşı örnek</b> kapalılığı bozar.<br>N, toplama ve çarpmada <b>kapalı</b>; çıkarmada <b>değil</b>: 3 − 5 = −2 ∉ N.`, 'N ve kapalılık', 's2');
      await c.say('Çıkarma kırmızı yandı. Peki sonuç −2’nin yaşayacağı bir kutu yapsak?', { ms: 2600 });
    },
  });

  /* ================= SAHNE 3 — Z: Borç, ya da 3 − 5'in cevabı ================= */
  SCENES.push({
    title: 'Z: Borç, ya da 3 − 5’in cevabı',
    goal: 'Z’nin, N’de yapılamayan çıkarmayı kurtarmak için doğduğunu gör; Z’de kapalılığı sına.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { s: 1, tx: 0, ty: 0 }); op(mat.root, 0); mat.lit('N'); mat.lit('Z');
      await fade(c, mat.root, 1, 600);
      mat.glow('Z', 0.8, 'var(--z)');
      const neg = pill(root, q(-2), { x: 340, y: 400, size: 28 }); put(neg, { s: 0.001 });
      await pop(c, neg, 0.95, 400);
      const nt = tag(root, 340, 350, '−2 ∉ N', 24, 'var(--err)');
      c.say('Cüzdanında 3 lira var ve 5 liralık bir şey alıyorsun. Geriye ne kalır?', { ms: 3600 });
      await c.wait(1600);
      await par(fade(c, neg, 0, 400), fade(c, nt, 0, 400), c.tween(900, (e) => mat.dimAll(1 - 0.92 * e)));
      mat.glow('Z', 0, 'var(--z)');
      // --- cüzdan animasyonu ---
      const st = E('g', {}, root);
      const wl = wallet(st, 210, 430); op(wl, 0);
      const rc = receipt(st, 760, 360, '5 lira'); op(rc, 0);
      const coins = [0, 1, 2].map((i) => { const cn = coin(st, 180 + i * 30, 380, 24, '1'); op(cn, 0); return cn; });
      await par(fade(c, wl, 1, 500), fade(c, rc, 1, 500));
      T(st, 210, 530, 'cüzdan: 3 lira', 28, 'var(--n)', { bold: 600 });
      await par(...coins.map((cn) => fade(c, cn, 1, 400)));
      await c.say('Cüzdanındaki 3 lirayı fişe veriyorsun… ama fişte hâlâ <b class="bad">2 lira eksik</b>.', { ms: 1200, noWait: true });
      for (let i = 0; i < 3; i++) { await mv(c, coins[i], 700 + i * 52, 250, 650, ease.inOut); }
      const need = T(st, 760, 470, '2 lira eksik', 34, 'var(--err)', { bold: 700 }); op(need, 0);
      await fade(c, need, 1, 500);
      await c.say('Geriye ne kalır? <b>Borcun</b> kalır: eksi iki lira.', { ms: 2800 });
      const dbt = pill(st, q(-2), { x: 1010, y: 470, size: 34 }); put(dbt, { s: 0.001 });
      const ar = arrow(st, 912, 470, 972, 470, 'z', 4); op(ar, 0);
      await par(fade(c, ar, 1, 300), pop(c, dbt, 1, 500));
      await c.say('İşte yeni kutuyu doğuran şey bu: <b>sıfırın soluna uzanan sayılar</b>.', { ms: 3600 });
      await fade(c, st, 0, 500); st.remove();

      // --- sayı doğrusu ---
      const nlG = E('g', {}, root);
      const nl = numLine(nlG, { y: 400, x0: 640, u: 100, a: -5, b: 5, size: 32, col: (v) => (v < 0 ? 'var(--z)' : v === 0 ? 'var(--ink)' : 'var(--n)') });
      const neg_ticks = nl.ticks.filter((t) => t.v < 0).reverse();
      neg_ticks.forEach((t) => { op(t.tk, 0); op(t.lb, 0); });
      nl.ticks.filter((t) => t.v >= 0).forEach((t) => { t.tk.setAttribute('stroke', 'var(--n)'); });
      nl.ticks.filter((t) => t.v < 0).forEach((t) => { t.tk.setAttribute('stroke', 'var(--z)'); });
      const lineGlow = E('line', { x1: nl.X(-5.2), x2: nl.X(-0.05), y1: 400, y2: 400, stroke: 'var(--z)', 'stroke-width': 8, opacity: 0, filter: 'url(#blur6)' }, nlG);
      op(nlG, 0); await fade(c, nlG, 1, 500);
      c.say('Doğal sayılara eksi sayıları ekleyince <b>tam sayılar</b>, yani <b>Z</b> kutusu oluştu.', { ms: 1000, noWait: true });
      for (const t of neg_ticks) { await par(fade(c, t.tk, 1, 200), fade(c, t.lb, 1, 200), fade(c, lineGlow, 0.7, 200)); await c.wait(120); }
      await fade(c, lineGlow, 0, 300);
      await c.say('3’ten başlayıp 5 adım geri gidelim: 2, 1, 0… sıfırı geçince hâlâ yol var.', { ms: 700, noWait: true });
      const hop = G(nlG, nl.X(3), 400 - 52);
      E('circle', { r: 24, fill: 'var(--n)', stroke: '#0F1420', 'stroke-width': 3 }, hop);
      const hopT = T(hop, 0, 1, '3', 28, '#0F1420', { bold: 800 });
      pop(c, hop, 1, 400); await c.wait(500);
      for (let v = 3; v > -2; v--) {
        const x1 = nl.X(v), x2 = nl.X(v - 1);
        const arc = E('path', { d: `M${x1},${400 - 30} Q${(x1 + x2) / 2},${400 - 110} ${x2},${400 - 30}`, fill: 'none', stroke: v - 1 < 0 ? 'var(--z)' : 'var(--n)', 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': 'url(#ar-ink)', opacity: 0.9 }, nlG);
        await par(drawIn(c, arc, 420, ease.linear), c.tween(420, (e) => put(hop, { x: lerp(x1, x2, e), y: 400 - 52 - 30 * Math.sin(e * Math.PI) })));
        hopT.textContent = String(v - 1 < 0 ? MINUS + Math.abs(v - 1) : v - 1); nlG.appendChild(hop);
        if (v - 1 === 0) { const ring = E('circle', { cx: nl.X(0), cy: 400, r: 20, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 }, nlG); await c.wait(550); ring.remove(); }
      }
      hop.firstChild.setAttribute('fill', 'var(--z)');
      const res2 = tag(nlG, nl.X(-2), 400 - 128, '3 − 5 = −2', 28, 'var(--z)');
      await c.say('Cevap var: <b>−2</b>. Sorun işlemde değil; sonucun yaşayacağı yer N’de yoktu.', { ms: 1200, noWait: true });
      await c.wait(2400);
      // ters eleman tohumu
      const lw = G(root, 640, 575); op(lw, 0);
      T(lw, -300, 0, '5 + (−5) = 0', 40, 'var(--ink)', { bold: 700 });
      T(lw, 190, 0, '3 − 5  =  3 + (−5)', 40, 'var(--z)', { bold: 700 });
      E('line', { x1: -80, x2: -80, y1: -26, y2: 26, stroke: 'var(--line)', 'stroke-width': 2 }, lw);
      await fade(c, lw, 1, 600);
      await c.say('Çıkarmak, tersini eklemektir: 3 − 5 = 3 + (−5). Bu “geri alma” fikrine biraz sonra döneceğiz.', { speak: 'Çıkarmak, tersini eklemektir: üç eksi beş, üç artı eksi beşe eşittir. Bu geri alma fikrine biraz sonra döneceğiz.', ms: 4500 });
      await fade(c, nlG, 0, 500); await fade(c, lw, 0, 300); nlG.remove(); lw.remove();

      // --- kapı düzenine geç ---
      mat.glow('Z', 0, 'var(--ok)');
      await par(mat.tweenTo(GL, 1200), c.tween(1200, (e) => mat.dimAll(0.08 + 0.92 * e)));
      const gate = Gate(c, root, mat, { key: 'Z' }); op(gate.g, 0);
      const tbl = stdTbl(c, root, ['N', 'Z']); op(tbl.g, 0);
      tbl.set('N', '+', 'v', false); tbl.set('N', MINUS, 'x', false); tbl.set('N', '×', 'v', false); tbl.set('N', '÷', '?', false); op(tbl.cells['N|÷'].g, 0.5);
      await par(fade(c, gate.g, 1, 600), fade(c, tbl.g, 1, 600));
      await c.say('Şimdi aynı testi <b>Z</b> kutusunda yapalım. Çıkarma yeşil yanacak mı?', { ms: 3200 });

      // --- testler ---
      const trials = [
        [q(3), MINUS, q(5), MINUS, 'Dün kırmızıydı; bugün yeşil: −2 ∈ Z.'],
        [q(-2), '+', q(-3), '+', ''],
        [q(-2), '×', q(-3), '×', 'Eksi × eksi = artı.'],
      ];
      for (const [a, o2, b, colk, msg] of trials) {
        await gate.load(a, o2, b);
        const r0 = calc(a, o2, b);
        await yn(c, `<b>${fh(a)} ${o2} ${a.n < 0 || b.n < 0 ? '' : ''}${b.n < 0 ? '(' + fh(b) + ')' : fh(b)}</b> sonucu Z’nin içinde mi?`, true, `İki tam sayı üzerinde işlem yapıyoruz; sonuç ${fh(r0)} yine bir tam sayı. Test edelim.`, `Evet: sonuç ${fh(r0)}, bir tam sayı. Test edelim.`);
        await gate.run(r0);
        tbl.set('Z', colk, '..');
        if (msg) await c.say(msg, { ms: 2200 }); else c.clearSay();
        await c.wait(500);
      }
      // 3 ÷ 4
      const a4 = q(3), b4 = q(4);
      await gate.load(a4, '÷', b4);
      await yn(c, `<b>3 ÷ 4</b> sonucu Z’nin içinde mi?`, false, '3 ÷ 4 = 0,75: iki tam sayının bölümü her zaman tam sayı değildir. 3 ile 4 arasında bir sayı… Test et, göreceksin.', 'Hayır: 3 ÷ 4 = 3/4, iki tam sayı arasında bir yerde. Bakalım nereye düşecek?');
      await gate.run(calc(a4, '÷', b4), { no: '' });
      tbl.set('Z', '÷', 'x');
      await c.say('<b>3/4 ∉ Z</b>, Q’ya ait. Jeton Z halkasından çıkıp Q halkasına süzüldü.', { speak: 'Dörtte üç, Z kümesinin elemanı değil; Q kümesine ait.', ms: 3600 });
      // --- bonus akıl yürütme ---
      await c.choice({
        tag: 'Düşün', q: `<b>8 ÷ 2 = 4 ∈ Z</b>. Peki bölmede Z kapalı mı?`, options: ['Evet', 'Hayır'], answer: 1,
        hints: ['Bir örnek yeterli değil! 8 ÷ 2 yeşil ama 3 ÷ 4 kırmızı. <b>Tek bir kırmızı örnek bile yeter.</b>', ''],
        right: 'Aynen. Karşı örnek: <b>3 ÷ 4</b>. Z, bölmede kapalı değil.', next: 'Tabloyu tamamla ›',
      });
      await tbl.set('Z', '+', 'v'); await tbl.set('Z', MINUS, 'v'); await tbl.set('Z', '×', 'v');
      c.note(`<b>Z = {…, −2, −1, 0, 1, 2, …}</b>. N ⊂ Z.<br>Z, <b>toplama, çıkarma, çarpma</b>da kapalıdır. <b>Bölmede kapalı değildir:</b> 3 ÷ 4 ∉ Z.<br>Z doğdu, çünkü N’de yapılamayan 3 − 5 gibi işlemlerin sonucuna bir yer gerekiyordu.`, 'Z kümesi', 's3');
      await c.say('Z doğdu, çünkü 3 − 5 gibi işlemlerin sonucuna bir yer gerekiyordu. Şimdi sıra bölmede.', { ms: 3600 });
    },
  });

  /* ================= SAHNE 4 — Q: Paylaşmak, ya da 3 ÷ 4'ün cevabı ================= */
  SCENES.push({
    title: 'Q: Paylaşmak, ya da 3 ÷ 4’ün cevabı',
    goal: 'Q’nun, Z’de yapılamayan bölmeyi kurtarmak için doğduğunu gör; Q = {a/b} tanımını ve b ≠ 0 koşulunu kavra.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { s: 1, tx: 0, ty: 0 }); op(mat.root, 0); ['N', 'Z', 'Q'].forEach((k) => mat.lit(k));
      await fade(c, mat.root, 1, 600);
      mat.glow('Q', 0.8, 'var(--q)');
      const t34 = pill(root, q(3, 4), { x: 220, y: 400, size: 28 }); put(t34, { s: 0.001 });
      await pop(c, t34, 0.95, 400);
      const nt = tag(root, 220, 330, '3/4 ∉ Z', 24, 'var(--err)');
      await c.say('Z’de <b>3 ÷ 4</b> yapılamıyordu. Üç çikolatayı dört kişiye eşit paylaştır: herkese 3 bölü 4 düşer.', { ms: 4500, speak: 'Z kümesinde üç bölü dört yapılamıyordu. Üç çikolatayı dört kişiye eşit paylaştır: herkese dörtte üç düşer.' });
      await par(fade(c, t34, 0, 400), fade(c, nt, 0, 400), c.tween(900, (e) => mat.dimAll(1 - 0.92 * e)));
      mat.glow('Q', 0, 'var(--q)');

      // --- çikolata paylaşımı ---
      const st = E('g', {}, root);
      const SQW = 38, SQH = 64;
      const bars = [0, 1, 2].map((b) => {
        const bx = 70 + b * 190, g = G(st, bx, 500); const sq = [];
        for (let j = 0; j < 4; j++) {
          const s2 = G(g, j * (SQW + 2) + SQW / 2, 0);
          E('rect', { x: -SQW / 2, y: -SQH / 2, width: SQW, height: SQH, rx: 7, fill: '#7a4a2a', stroke: '#c78a55', 'stroke-width': 3 }, s2);
          E('rect', { x: -SQW / 2 + 8, y: -SQH / 2 + 9, width: SQW - 16, height: SQH - 18, rx: 4, fill: 'none', stroke: '#c78a55', 'stroke-width': 2, opacity: 0.5 }, s2);
          sq.push(s2);
        }
        op(g, 0); return { g, sq, bx };
      });
      for (const b of bars) { await fade(c, b.g, 1, 350); }
      const ppl = [0, 1, 2, 3].map((j) => { const pg = person(st, 740 + j * 130, 410, 'var(--q)', 1.25); op(pg, 0); return pg; });
      await par(...ppl.map((pp) => fade(c, pp, 1, 500)));
      const ppx = (j) => 740 + j * 130;
      const sp = c.say('Her çikolata 4 eşit parçaya bölünüyor ve herkes <b>her çikolatadan bir parça</b> alıyor.', { ms: 5200 });
      for (let b = 0; b < 3; b++) {
        await par(...bars[b].sq.map((s2, j) => {
          const gx = bars[b].bx + s2._p.x, gy = 500;
          s2._abs = [gx, gy];
          const wrap = s2; st.appendChild(wrap);
          put(wrap, { x: gx, y: gy });
          return mv(c, wrap, ppx(j) + (b - 1) * 42, 500, 800, ease.inOut);
        }));
      }
      await sp;
      const ex = rich(root, 640, 222, 60, [{ t: '3 ÷ 4  =  ' }, { frac: ['3', '4'], col: 'var(--q)' }], {}); op(ex, 0);
      T(st, ppx(0) + 0, 580, 'bir kişinin payı:', 26, MUTED, { anchor: 'middle' });
      await fade(c, ex, 1, 500);
      await c.wait(1500);
      await par(fade(c, st, 0, 500), fade(c, ex, 0, 500));
      st.remove(); ex.remove();

      // --- Q tanımı ---
      const defn = rich(root, 640, 210, 56, [{ t: 'Q = { ', col: 'var(--q)' }, { frac: ['a', 'b'], col: 'var(--ink)' }, { t: '  :  a, b ∈ Z ,   ' }, { t: 'b ≠ 0', col: 'var(--warn)', hl: 'var(--warn)' }, { t: ' }' }]);
      op(defn, 0);
      c.say('İşte rasyonel sayılar kutusu böyle doğdu: üstü ve altı tam sayı olan, <b>altı sıfır olmayan</b> her kesir.', { ms: 5000, noWait: true });
      await fade(c, defn, 1, 800);
      await c.wait(4600);
      await fade(c, defn, 0, 500); defn.remove();

      // --- Sürükle-bırak: bu sayı Q'ya girer mi? ---
      await c.tween(700, (e) => mat.dimAll(0.08 + 0.92 * e));
      mat.glow('Q', 0.5, 'var(--q)');
      const binG = G(root, 0, 0);
      const bin = E('rect', { x: 900, y: 636, width: 340, height: 72, rx: 20, fill: 'rgba(255,77,94,.10)', stroke: 'var(--err)', 'stroke-width': 3, 'stroke-dasharray': '10 7' }, binG);
      icon(binG, 'no', 940, 672, 0.8); T(binG, 1100, 672, 'Q’ya girmez', 32, 'var(--err)', { bold: 700 });
      const toks = [{ t: q(5), id: '5' }, { t: q(-3), id: '-3' }, { t: q(0), id: '0' }, { t: { k: 'x', fn: '5', fd: '0', color: 'var(--irr)', dashed: false }, id: '5/0', bad: true }];
      const xs0 = [190, 350, 510, 670];
      const items = toks.map((tk, i) => {
        const g = pill(root, tk.t, { x: xs0[i], y: 672, size: 30, color: tk.bad ? 'var(--ink)' : undefined });
        return { g, id: tk.id, tok: tk, home: { x: xs0[i], y: 672, s: 1 }, aria: 'jeton ' + tk.id };
      });
      const pn = c.panel('Sürükle', h('p', { class: 'q', html: '<b>Bu sayı Q’ya girer mi?</b> Jetonu Q kutusuna ya da “girmez” kutusuna sürükle (ya da jetona, sonra kutuya dokun).' }));
      const fb = h('div'); pn.appendChild(fb);
      let remaining = 4; let doneRes; const donep = new Promise((r) => { doneRes = r; });
      const morphTo = async (it, nn) => {
        const spec = it.id === '0' ? { fn: '0', fd: '7' } : { fn: String(Math.abs(nn)), fd: '1', neg: nn < 0 };
        const base = it.g._p.s;
        reface(it.g, { k: 'x', ...spec, n: nn, d: 1, color: 'var(--q)' }, { size: 28, color: 'var(--q)' });
        await c.tween(450, (e) => put(it.g, { s: base * (1 + 0.28 * Math.sin(e * Math.PI)) }));
      };
      const sorter = Sorter(c, svg, {
        items, zones: [{ id: 'Q', hit: (x, y) => inside('Q', x, y), el: mat.box.Q }, { id: 'bin', hit: (x, y) => x > 880 && y > 620, el: bin }],
        onDrop: async (it, zid) => {
          const done = (okk, html) => c.feedback(fb, okk ? 'ok' : 'no', html);
          if (it.id === '5/0') {
            if (zid === 'Q') { done(false, '<b>5/0 tanımsız:</b> payda sıfır olamaz, yani <b>b ≠ 0</b> olmalı.'); await shake(c, root, 5, 260); return false; }
            done(true, 'Doğru: 5/0 tanımsız, Q’ya giremez.'); remaining--; if (remaining <= 0) doneRes(); return { x: 1120, y: 672, s: 0.8 };
          }
          const nn = it.tok.t.n;
          if (zid === 'bin') {
            done(false, `<b>Girer!</b> Her tam sayı <b>n = n/1</b> biçiminde yazılır: ${fh(it.tok.t)} = ${fh(it.tok.t)}/1.`);
            await morphTo(it, nn); return false;
          }
          const [sx, sy] = mat.slot('Q');
          await mv(c, it.g, sx, sy, 400, ease.inOut, { s: 0.9 });
          await morphTo(it, nn);
          done(true, `Doğru: ${nn < 0 ? MINUS + Math.abs(nn) : nn} = ${nn < 0 ? MINUS + Math.abs(nn) : nn}/1 olduğundan Q’ya girer. Her tam sayı rasyoneldir.`);
          remaining--; if (remaining <= 0) doneRes(); mat.pulse('Q', 'var(--ok)', 1, 300);
          return { x: sx, y: sy, s: 0.9 };
        },
      });
      // tamamlanana kadar bekle
      await withSkip(c, donep);
      pn.remove(); sorter.items.forEach((it) => it.g.classList.remove('dd'));
      await c.say('5 = 5/1, −3 = −3/1, 0 = 0/7… Yani <b>tam sayılar da rasyoneldir</b>: Z ⊂ Q.', { ms: 3800, speak: 'Beş eşittir beş bölü bir; eksi üç eşittir eksi üç bölü bir. Yani tam sayılar da rasyoneldir: Z, Q kümesinin alt kümesidir.' });
      await par(...sorter.items.map((it) => fade(c, it.g, 0, 400)), fade(c, binG, 0, 400), fade(c, mat.root, 0.0, 0));
      sorter.items.forEach((it) => it.g.remove()); binG.remove();
      mat.glow('Q', 0, 'var(--q)'); op(mat.root, 1); mat.used = {}; mat.dimAll(0.08);

      // --- yoğunluk ---
      const nlG = E('g', {}, root); op(nlG, 0);
      const nl = numLine(nlG, { y: 420, x0: 240, u: 800, a: 0, b: 1, step: 1, size: 34, arrow: false, pad: 40, padR: 40 });
      await fade(c, nlG, 1, 500);
      const pts = [[0, 1], [1, 1], [1, 2], [1, 4], [3, 4], [1, 3], [2, 3]];
      c.say('İki kesrin arasında hep başka bir kesir var. Kesirler sayı doğrusunu doldurmuş gibi görünüyor…', { ms: 7500, noWait: true });
      for (let i = 0; i < pts.length; i++) {
        const [nn, dd] = pts[i]; const x = nl.X(nn / dd);
        const dg = G(nlG, x, 420);
        E('circle', { r: i < 2 ? 12 : 11, fill: 'var(--q)', stroke: '#0F1420', 'stroke-width': 3 }, dg);
        if (i >= 2) { const f = fracG(dg, 0, -62, String(nn), String(dd), 28, 'var(--q)'); E('line', { x1: 0, x2: 0, y1: -30, y2: -10, stroke: 'var(--q)', 'stroke-width': 2, opacity: 0.6 }, dg); }
        await pop(c, dg, 1, 350); await c.wait(i < 2 ? 200 : 650);
      }
      const mid = rich(root, 640, 250, 40, [{ t: 'arası hep bir kesir:  ' }, { frac: ['a + b', '2'], col: 'var(--warn)' }]); op(mid, 0);
      await fade(c, mid, 1, 600);
      await c.wait(2800);
      await par(fade(c, nlG, 0, 500), fade(c, mid, 0, 400)); nlG.remove(); mid.remove();

      // --- kapı: dört işlem ---
      await par(mat.tweenTo(GL, 1200), c.tween(1200, (e) => mat.dimAll(0.08 + 0.92 * e)));
      mat.glow('Q', 0.5, 'var(--q)');
      const gate = Gate(c, root, mat, { key: 'Q' }); op(gate.g, 0);
      const tbl = stdTbl(c, root, ['N', 'Z', 'Q']); op(tbl.g, 0);
      [['N', ['v', 'x', 'v', '?']], ['Z', ['v', 'v', 'v', 'x']]].forEach(([r, st4]) => OPS.forEach((o2, j) => tbl.set(r, o2, st4[j], false)));
      op(tbl.cells['N|÷'].g, 0.5);
      await par(fade(c, gate.g, 1, 600), fade(c, tbl.g, 1, 600));
      mat.glow('Q', 0, 'var(--ok)');
      await c.say('Rasyonel kutusunda dört işlem de yeşil yanıyor mu? Deneyelim.', { ms: 2600 });
      const A = q(1, 2), B = q(1, 3), C = q(3, 4), D = q(2, 3);
      await autoTrial(c, gate, tbl, 'Q', '+', A, '+', B);
      await c.say('1/2 + 1/3 = 5/6. Pay ve payda yine tam sayı, payda sıfır değil.', { ms: 2600 });
      await autoTrial(c, gate, tbl, 'Q', MINUS, A, MINUS, C, {
        predict: async () => { await yn(c, `Q’da <b>${fh(A)} ${MINUS} ${fh(C)}</b> yapınca sonuç kutuda kalır mı? (Sonucu görmeden karar ver.)`, true, 'İki rasyonel sayıyı çıkarıyoruz; sonuç yine bir kesir olacak: −1/4. Test edelim.', 'Evet: sonuç −1/4, yani yine bir kesir. Test edelim.'); },
      });
      await autoTrial(c, gate, tbl, 'Q', '×', D, '×', C);
      await autoTrial(c, gate, tbl, 'Q', '÷', A, '÷', C);
      // --- sıfıra bölme ---
      await c.say('Tek bir kural var: <b>sıfıra bölemeyiz</b>. 5 ÷ 0’ı deneyelim.', { ms: 3000 });
      await gate.load(q(5), '÷', q(0));
      await c.cont('5 ÷ 0 dene ›');
      await gate.run(undefined);
      const bl = balloon(root, 1040, 652, 380, 100, '', 26); T(bl, 0, -22, '5 ÷ 0 = ? olsaydı', 28, 'var(--ink)', { bold: 700 }); T(bl, 0, 18, '0 × ? = 5 olmalı…', 28, 'var(--warn)', { bold: 700 });
      op(bl, 0); await fade(c, bl, 1, 500);
      await c.say('0 × ? = 5 olmalı. <b>Hiçbir sayı</b> 0 ile çarpılınca 5 vermez: sıfıra bölme tanımsızdır.', { ms: 4500 });
      await fade(c, bl, 0, 400);
      await tbl.set('Q', '+', 'v'); await tbl.set('Q', MINUS, 'v'); await tbl.set('Q', '×', 'v'); await tbl.set('Q', '÷', 'v');
      const zt = T(tbl.legend, 20, 150, '(0’a bölme hariç)', 26, 'var(--q)', { anchor: 'start', bold: 700 });
      c.note(`<b>Q = { a/b : a, b ∈ Z, b ≠ 0 }</b>. Her tam sayı rasyoneldir: <b>n = n/1</b>. Yani <b>Z ⊂ Q</b>.<br>Q, <b>dört işlemde kapalıdır</b> (0’a bölme hariç; a/0 tanımsızdır).<br>Q doğdu, çünkü Z’de yapılamayan 3 ÷ 4 gibi işlemlerin sonucuna bir yer gerekiyordu.`, 'Q kümesi', 's4');
      await c.say('Q doğdu, çünkü 3 ÷ 4 gibi işlemlerin sonucuna bir yer gerekiyordu. Peki bu ters işlemler neden hep birine bağlanıyor? Bir sonraki sahnede göreceğiz.', { ms: 4200 });
    },
  });

  /* ================= SAHNE 5 — İşlem özellikleri: "Geri alma düğmesi" ================= */
  const fS = (t) => (t.d === 1 ? fmtN(t.n) : `${fmtN(t.n)}/${t.d}`);
  function opApply(a, o2, b) { return calc(a, o2, b); }

  /* değişme demosu: iki terim yer değiştirir */
  function SwapDemo(c, p, x0, y, A, o2, B, size, resNode) {
    const g = E('g', {}, p); const st = size * 1.15;
    const slots = [x0, x0 + st, x0 + 2 * st];
    const tA = T(g, slots[0], y, A, size, 'var(--c1)', { bold: 800 });
    const tO = T(g, slots[1], y, o2, size, 'var(--ink)', { bold: 800 });
    const tB = T(g, slots[2], y, B, size, 'var(--c2)', { bold: 800 });
    const eq = T(g, slots[2] + st * 0.95, y, '=', size, MUTED, { bold: 800 });
    const rx = slots[2] + st * 1.65;
    const demo = { g, tA, tB, tO, y, rx, res: null };
    demo.setRes = (val, col) => {
      if (demo.res) demo.res.remove();
      const rg = E('g', {}, g);
      if (Array.isArray(val)) { const fr = fracG(rg, rx + 22, y, String(val[0]), String(val[1]), size * 0.8, col); } else T(rg, rx, y, val, size, col, { anchor: 'start', bold: 800 });
      demo.res = rg; return rg;
    };
    demo.swap = async () => {
      const ax = slots[0], bx = slots[2];
      await c.tween(950, (e) => {
        tA.setAttribute('x', lerp(ax, bx, e)); tB.setAttribute('x', lerp(bx, ax, e));
        tA.setAttribute('y', y - 34 * Math.sin(e * Math.PI)); tB.setAttribute('y', y + 34 * Math.sin(e * Math.PI));
      });
      tA.setAttribute('y', y); tB.setAttribute('y', y);
    };
    return demo;
  }
  /* birleşme demosu: parantez kayar */
  function AssocDemo(c, p, x0, y, a, o2, b, o3, d, size) {
    const g = E('g', {}, p); const st = size * 1.35;
    const items = [String(a), o2, String(b), o3, String(d)];
    const pos = items.map((_, i) => x0 + st * i);
    items.forEach((s2, i) => T(g, pos[i], y, s2, size, i % 2 ? 'var(--ink)' : 'var(--c1)', { bold: 800 }));
    const br = E('rect', { x: pos[0] - st * 0.5, y: y - size * 0.85, width: st * 2.05, height: size * 1.7, rx: 14, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 4 }, g);
    const A = q(a), B = q(b), C = q(d);
    const f1 = (u, v) => calc(u, o2, v), f2 = (u, v) => calc(u, o3, v);
    const first = f1(A, B), left = f2(first, C), second = f2(B, C), right = f1(A, second);
    const vy = y + size * 1.55; const vg = E('g', {}, g);
    const show = (str, col) => { vg.innerHTML = ''; T(vg, x0 - st * 0.5, vy, str, size * 0.92, col || 'var(--ink)', { anchor: 'start', bold: 700 }); };
    show(`= ${fS(first)} ${o3} ${d} = ${fS(left)}`);
    const demo = { g, br, left, right, show };
    demo.slide = async () => {
      const x1 = br.getAttribute('x'); const x2 = pos[2] - st * 0.5;
      await c.tween(1000, (e) => br.setAttribute('x', lerp(+x1, x2, e)));
      show(`= ${a} ${o2} ${fS(second)} = ${fS(right)}`);
    };
    return demo;
  }

  /* ters eleman tarayıcısı: aday jetonları tek tek dener */
  function InvLab(c, root) {
    const L = { };
    L.g = G(root, 0, 60);
    card(L.g, 200, 100, 880, 140, { rx: 28 });
    L.eq = E('g', {}, L.g);
    L.chk = T(L.g, 640, 280, '', 36, MUTED, { bold: 700 });
    L.tray = E('g', {}, L.g);
    L.tabs = {};
    ['N', 'Z', 'Q'].forEach((k, i) => {
      const tg = G(L.g, 120 + i * 100, 40);
      E('rect', { x: -38, y: -24, width: 76, height: 48, rx: 24, fill: 'rgba(10,15,30,.7)', stroke: COLV[k], 'stroke-width': 3 }, tg);
      T(tg, 0, 1, LET[k], 30, COLV[k], { bold: 800 }); L.tabs[k] = tg; op(tg, 0.4);
    });
    L.mode = (k) => Object.entries(L.tabs).forEach(([kk, tg]) => { op(tg, kk === k ? 1 : 0.35); put(tg, { s: kk === k ? 1.1 : 1 }); });
    L.setEq = (a, o2, target) => {
      L.eq.innerHTML = ''; L.atok = a; L.ttok = target; L.o2 = o2;
      tokNode(L.eq, 350, 170, L.atok, 64, 'var(--ink)');
      T(L.eq, 462, 174, o2, o2 === '·' ? 96 : 64, 'var(--ink)', { bold: 800 });
      L.box = E('rect', { x: 530, y: 132, width: 110, height: 76, rx: 18, fill: 'rgba(255,255,255,.05)', stroke: 'var(--warn)', 'stroke-width': 4, 'stroke-dasharray': '9 6' }, L.eq);
      L.boxC = E('g', {}, L.eq);
      T(L.eq, 720, 170, '=', 64, MUTED, { bold: 800 }); tokNode(L.eq, 820, 170, L.ttok, 64, 'var(--ink)');
      L.boxC.innerHTML = ''; T(L.boxC, 585, 172, '?', 54, MUTED, { bold: 800 });
      L.chk.textContent = '';
    };
    L.setTray = (cands, key) => {
      L.tray.innerHTML = ''; L.pills = [];
      const n = cands.length, sp = Math.min(104, 1120 / n), x0 = 640 - sp * (n - 1) / 2;
      cands.forEach((t, i) => { const pl = pill(L.tray, t, { x: x0 + i * sp, y: 420, size: 26, color: COLV[key] }); L.pills.push(pl); op(pl, 0); });
      return par(...L.pills.map((pl) => fade(c, pl, 1, 350)));
    };
    L.scan = async (cands, key, fast = 1) => {
      let found = null;
      for (let i = 0; i < cands.length; i++) {
        const t = cands[i]; const pl = L.pills[i];
        const ringed = E('rect', { x: -pl._w / 2 - 6, y: -pl._h / 2 - 6, width: pl._w + 12, height: pl._h + 12, rx: pl._h / 2 + 6, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 4 }, pl);
        L.boxC.innerHTML = ''; const bp = pill(L.boxC, t, { x: 585, y: 170, size: 30, color: 'var(--warn)', shadow: false }); put(bp, { s: 0.92 });
        const val = calc(L.av, L.o2, t);
        const okk = val.n === L.tv.n && val.d === L.tv.d;
        L.chk.textContent = `${fS(L.av)} ${L.o2} ${t.n < 0 ? '(' + fS(t) + ')' : fS(t)} = ${fS(val)}${okk ? '' : '  ≠  ' + fS(L.tv)}`;
        L.chk.style.fill = okk ? 'var(--ok)' : 'var(--err)';
        L.box.setAttribute('stroke', okk ? 'var(--ok)' : 'var(--err)');
        await c.wait((okk ? 700 : 340) * fast);
        ringed.remove();
        if (okk) { found = t; pl.setCol('var(--ok)'); break; }
        op(pl, 0.35);
      }
      return found;
    };
    return L;
  }

  SCENES.push({
    title: 'İşlem özellikleri: “Geri alma düğmesi”',
    goal: 'Değişme, birleşme, etkisiz ve ters eleman; “ters eleman var ⇒ ters işlem kapalı” bağı.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      /* ---------- A: değişme ve birleşme ---------- */
      const A = E('g', {}, root); op(A, 0);
      const hdr = (x, w, txt, col) => { E('rect', { x, y: 24, width: w, height: 58, rx: 18, fill: 'rgba(10,15,30,.7)', stroke: col, 'stroke-width': 3 }, A); T(A, x + w / 2, 54, txt, 32, col, { bold: 800 }); };
      hdr(40, 590, 'Toplama  ·  Çarpma', 'var(--ok)'); hdr(650, 590, 'Çıkarma  ·  Bölme', 'var(--err)');
      E('line', { x1: 640, x2: 640, y1: 100, y2: 630, stroke: 'var(--line)', 'stroke-width': 2, 'stroke-dasharray': '6 8' }, A);
      const rowT1 = tag(A, 640, 118, 'DEĞİŞME', 26, 'var(--warn)', { fill: '#0F1420' });
      const rowT2 = tag(A, 640, 378, 'BİRLEŞME', 26, 'var(--warn)', { fill: '#0F1420' });
      await fade(c, A, 1, 700);
      c.say('Toplama ve çarpmanın dört güzel özelliği var. Birincisi: <b>sıra fark etmez</b>.', { ms: 3500, noWait: true });
      // --- değişme: sol
      const sw1 = SwapDemo(c, A, 62, 190, '3', '+', '5', 40); sw1.setRes('8', 'var(--ink)');
      const blocks = E('g', {}, A);
      const mkBlocks = (n, x, col) => { const bg = G(blocks, x, 258); for (let i = 0; i < n; i++) E('rect', { x: i * 34, y: 0, width: 30, height: 30, rx: 6, fill: col, stroke: '#0F1420', 'stroke-width': 2 }, bg); return bg; };
      const bB = mkBlocks(3, 62, 'var(--c1)'), bO = mkBlocks(5, 62 + 3 * 34, 'var(--c2)');
      const sw2 = SwapDemo(c, A, 350, 190, '3', '×', '5', 40); sw2.setRes('15', 'var(--ink)');
      const grid = G(A, 400, 296); // 3 satır × 5 sütun
      for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) E('rect', { x: -60 + k * 24, y: -36 + r * 24, width: 21, height: 21, rx: 4, fill: 'var(--c3)', stroke: '#0F1420', 'stroke-width': 1.5 }, grid);
      await c.wait(1400);
      await par(sw1.swap(), mv(c, bB, 62 + 5 * 34, 258, 950, ease.inOut), mv(c, bO, 62, 258, 950, ease.inOut), sw2.swap(), mv(c, grid, 400, 296, 950, ease.inOut, { r: 90 }));
      const ok1 = icon(A, 'ok', 296, 190, 0.8); const ok2 = icon(A, 'ok', 604, 190, 0.8);
      T(A, 180, 336, '3 + 5 = 5 + 3', 30, 'var(--ok)', { bold: 700 });
      T(A, 535, 296, '15 = 15', 30, 'var(--ok)', { bold: 700 });
      await c.wait(1200);
      // --- değişme: sağ
      c.say('Çıkarma ve bölmede ise <b>sıra önemli</b>: 7 − 3 ile 3 − 7 aynı değil.', { ms: 3000, noWait: true });
      const sw3 = SwapDemo(c, A, 672, 190, '7', MINUS, '3', 40); sw3.setRes('4', 'var(--ink)');
      const sw4 = SwapDemo(c, A, 992, 190, '6', '÷', '3', 40); sw4.setRes('2', 'var(--ink)');
      op(sw3.g, 0); op(sw4.g, 0); await par(fade(c, sw3.g, 1, 400), fade(c, sw4.g, 1, 400));
      await c.wait(1000);
      await par(sw3.swap(), sw4.swap());
      sw3.setRes(MINUS + '4', 'var(--err)'); sw4.setRes([1, 2], 'var(--err)');
      icon(A, 'no', 912, 190, 0.8); icon(A, 'no', 1244, 190, 0.8);
      T(A, 790, 262, '4 ≠ −4', 34, 'var(--err)', { bold: 700 }); T(A, 1100, 262, '2 ≠ 1/2', 34, 'var(--err)', { bold: 700 });
      await c.wait(1800);
      // --- birleşme
      c.say('İkincisi: <b>gruplama fark etmez</b>. Parantezi kaydır: toplamada da çarpmada da sonuç aynı kalır.', { ms: 4500, noWait: true });
      const as1 = AssocDemo(c, A, 80, 440, 2, '+', 3, '+', 4, 38);
      const as2 = AssocDemo(c, A, 370, 440, 2, '×', 3, '×', 4, 38);
      await c.wait(1500);
      await par(as1.slide(), as2.slide());
      icon(A, 'ok', 300, 590, 0.8); icon(A, 'ok', 598, 590, 0.8);
      await c.wait(1400);
      c.say('Çıkarma ve bölmede ise <b>gruplama sonucu değiştirir</b>.', { ms: 3000, noWait: true });
      const as3 = AssocDemo(c, A, 690, 440, 10, MINUS, 4, MINUS, 3, 38);
      const as4 = AssocDemo(c, A, 995, 440, 8, '÷', 4, '÷', 2, 38);
      await c.wait(1400);
      await par(as3.slide(), as4.slide());
      icon(A, 'no', 934, 590, 0.8); icon(A, 'no', 1226, 590, 0.8);
      T(A, 820, 600, '3 ≠ 9', 30, 'var(--err)', { bold: 700 }); T(A, 1115, 600, '1 ≠ 4', 30, 'var(--err)', { bold: 700 });
      await c.say('Toplama ve çarpmada ✓, çıkarma ve bölmede ✗: değişme de birleşme de yalnızca toplama ve çarpmada var.', { ms: 4800, speak: 'Toplama ve çarpmada değişme ve birleşme var; çıkarma ve bölmede yok.' });
      await fade(c, A, 0, 600); A.remove();

      /* ---------- B1: etkisiz eleman ---------- */
      const B1 = E('g', {}, root); op(B1, 0);
      const nl = numLine(B1, { y: 400, x0: 160, u: 100, a: 0, b: 10, size: 30, col: () => 'var(--ink)', ly: 38 });
      nl.ticks.forEach((t) => { if (t.v !== 4) { op(t.lb, 0.55); } });
      const pt4 = G(B1, nl.X(4), 400 - 48); E('circle', { r: 26, fill: 'var(--n)', stroke: '#0F1420', 'stroke-width': 3 }, pt4); const pt4t = T(pt4, 0, 1, '4', 30, '#0F1420', { bold: 800 });
      const bt = (x, str) => { const g = G(B1, x, 220); E('rect', { x: -90, y: -34, width: 180, height: 68, rx: 20, fill: 'url(#pg2)', stroke: 'var(--ok)', 'stroke-width': 3, filter: 'url(#sh)' }, g); T(g, 0, 1, str, 38, 'var(--ink)', { bold: 800 }); return g; };
      const bPlus = bt(360, '+ 0'), bTimes = bt(640, '× 1');
      const eqI = T(B1, 920, 220, '', 44, 'var(--ink)', { bold: 700 });
      await fade(c, B1, 1, 600);
      c.say('Üçüncüsü: öyle bir sayı var ki hiçbir şeyi değiştirmez; toplamada bu <b>0</b>, çarpmada <b>1</b>. Buna <b>etkisiz eleman</b> denir.', { ms: 7000, noWait: true });
      for (const [bb, txt] of [[bPlus, '4 + 0 = 4'], [bTimes, '4 × 1 = 4']]) {
        await c.tween(260, (e) => put(bb, { s: 1 - 0.1 * Math.sin(e * Math.PI) }));
        eqI.textContent = txt;
        await c.tween(520, (e) => put(pt4, { x: nl.X(4) + Math.sin(e * 40) * 5 * (1 - e) }));
        await c.wait(700);
      }
      const eti = rich(B1, 640, 560, 38, [{ t: 'Etkisiz eleman', col: 'var(--warn)' }, { t: ':  toplamada ' }, { t: '0', col: 'var(--n)' }, { t: ',  çarpmada ' }, { t: '1', col: 'var(--n)' }]);
      op(eti, 0); await fade(c, eti, 1, 600);
      await c.say('Bu yüzden 0’ın <b>N’de</b> olması gerekir: N’de toplamanın etkisiz elemanı 0’dır.', { ms: 4000 });
      await fade(c, B1, 0, 500); B1.remove();

      /* ---------- B2: ters eleman ---------- */
      const inv = InvLab(c, root); op(inv.g, 0);
      const NN = Array.from({ length: 9 }, (_, i) => q(i));
      const ZZ = Array.from({ length: 13 }, (_, i) => q(i - 6));
      const QQ = [q(-3), q(-2), q(-1), q(-1, 2), q(-1, 3), q(0), q(1, 3), q(1, 2), q(1), q(2), q(3)];
      const run1 = async (key, cands, a, o2, tv, msgNo, msgOk, mult) => {
        inv.mode(key); inv.av = a; inv.tv = tv; inv.setEq(a, o2, tv);
        await inv.setTray(cands, key);
        const found = await inv.scan(cands, key);
        if (found) { icon(inv.g, 'ok', 1010, 170, 1.1); await c.say(msgOk, { ms: 3600 }); }
        else { inv.box.setAttribute('stroke', 'var(--err)'); icon(inv.g, 'no', 1010, 170, 1.1); await c.say(msgNo, { ms: 3600 }); }
        const ic = inv.g.lastChild; await par(fade(c, ic, 0, 300)); ic.remove();
        return found;
      };
      c.say('Dördüncüsü: her sayının bir <b>“geri alma düğmesi”</b> var. 5’ten başlayıp 0’a dönmek için kaç eklemeliyiz? Kutudaki sayıyı bulalım.', { ms: 1000, noWait: true });
      await fade(c, inv.g, 1, 600);
      await run1('N', NN, q(5), '+', q(0), '<b>N’de 5’in toplama tersi yok</b>: aday sayıların hiçbiri 5’i 0’a döndürmüyor.', '');
      await c.wait(400);
      await run1('Z', ZZ, q(5), '+', q(0), '', '<b>−5</b>, 5’in toplamaya göre tersi: 5 + (−5) = 0. Z’de var!');
      await c.wait(500);
      c.say('Çarpmada geri dönmek için hedef <b>1</b> (çarpmanın etkisiz elemanı): 3 · □ = 1.', { ms: 1000, noWait: true });
      await run1('Z', ZZ, q(3), '·', q(1), '<b>1/3 ∉ Z</b>: tam sayılarda 3’ün çarpma tersi yok.', '');
      await c.wait(400);
      await run1('Q', QQ, q(3), '·', q(1), '', '<b>1/3</b>, 3’ün çarpma tersi: 3 · 1/3 = 1. Q’da var!');
      await c.wait(400);
      await run1('Q', QQ, q(0), '·', q(1), '<b>0’ın çarpma tersi hiçbir kümede yok:</b> 0 ile çarpınca her şey 0 olur, geri dönüş yok.', '');
      await c.wait(400);
      await fade(c, inv.g, 0, 400);

      /* ---------- Ters eleman avı (3 görev) ---------- */
      await fade(c, inv.g, 1, 400);
      const tasks = [
        { key: 'Z', a: q(7), o2: '+', tv: q(0), opts: [q(7), q(-7), q(0), q(1, 7)], ans: 1, right: '<b>−7 ∈ Z</b>, toplama tersi var.' },
        { key: 'Z', a: q(2), o2: '·', tv: q(1), opts: [q(-2), q(1), q(-1), q(2), 'none'], ans: 4, right: '<b>1/2 ∉ Z</b>. Tam sayılarda 2’nin çarpma tersi yok.' },
        { key: 'Q', a: q(-2, 3), o2: '·', tv: q(1), opts: [q(3, 2), q(-3, 2), q(2, 3), q(-2, 3)], ans: 1, right: '(−2/3)·(−3/2) = 6/6 = 1. 0 dışındaki her rasyonelin çarpma tersi Q’dadır.' },
      ];
      let ti = 0;
      for (const tk of tasks) {
        inv.mode(tk.key); inv.av = tk.a; inv.tv = tk.tv; inv.setEq(tk.a, tk.o2, tk.tv);
        inv.tray.innerHTML = ''; inv.chk.textContent = '';
        const trayP = tk.opts.map((o, i) => { const pl = o === 'none' ? pill(inv.tray, { k: 'x', txt: 'Yok', color: 'var(--ok)' }, { size: 26, color: 'var(--ok)' }) : pill(inv.tray, o, { size: 26, color: COLV[tk.key] }); return pl; });
        trayP.forEach((pl, i) => put(pl, { x: 640 + (i - (trayP.length - 1) / 2) * 150, y: 430 }));
        const optHtml = tk.opts.map((o) => (o === 'none' ? 'Hiçbiri (Yok)' : fh(o)));
        const hints = tk.opts.map((o) => {
          if (o === 'none') return '';
          const val = calc(tk.a, tk.o2, o); const aS = fh(tk.a), oS = fh(o);
          return `${aS} ${tk.o2} ${o.n < 0 ? '(' + oS + ')' : oS} = ${fh(val)}; ${fh(tk.tv)} değil.${(tk.o2 === '·' && tk.a.n * o.n < 0 && Math.abs(val.n) === Math.abs(val.d)) ? ' Eksi işaretini de çevir.' : ''}`;
        });
        const lbl = `${tk.key} kümesinde: <b>${fh(tk.a)} ${tk.o2} □ = ${fh(tk.tv)}</b>. Kutuya hangisi gelir?`;
        const chP = c.choice({ tag: `Ters eleman avı ${++ti}/3`, q: lbl, options: optHtml, answer: tk.ans, hints, right: tk.right, next: ti < 3 ? 'Sonraki görev ›' : 'Devam ›',
          onPick: (i, ok) => { if (tk.opts[i] !== 'none') { inv.boxC.innerHTML = ''; pill(inv.boxC, tk.opts[i], { x: 585, y: 170, size: 30, color: ok ? 'var(--ok)' : 'var(--err)', shadow: false }); inv.box.setAttribute('stroke', ok ? 'var(--ok)' : 'var(--err)'); } else { inv.boxC.innerHTML = ''; T(inv.boxC, 585, 172, '∅', 54, 'var(--ok)', { bold: 800 }); inv.box.setAttribute('stroke', 'var(--ok)'); } } });
        const obtn = [...c.act.querySelectorAll('.opts .opt')]; trayP.forEach((pl, i) => { pl.style.cursor = 'pointer'; c.on(pl, 'pointerdown', () => { if (!obtn[i].disabled) obtn[i].click(); }); });
        await chP;
      }
      await fade(c, inv.g, 0, 500); inv.g.remove();

      /* ---------- Büyük bağ ---------- */
      const BG = E('g', {}, root); op(BG, 0);
      const l1 = rich(BG, 640, 70, 44, [{ t: 'a − b  =  a + (−b)', col: 'var(--ink)' }]); T(BG, 640, 126, 'Çıkarma, tersini eklemektir.', 30, MUTED);
      const l2 = rich(BG, 640, 210, 44, [{ t: 'a ÷ b  =  a · ' , col: 'var(--ink)' }, { frac: ['1', 'b'], col: 'var(--ink)' }]); T(BG, 640, 276, 'Bölme, tersiyle çarpmaktır.', 30, MUTED);
      await fade(c, BG, 1, 700);
      c.say('Asıl hikâye şu: 3 − 5 ve 3 ÷ 4 yapılamıyordu; çünkü geri alma düğmesi, yani <b>ters eleman</b>, kutuda yoktu.', { ms: 6000, noWait: true });
      const chain = (y, a1, a2, b1, b2, c1, col1, col2, colEnd) => {
        const bx = (x, w, l1s, l2s, col, big) => { const g = G(BG, x, y); E('rect', { x: -w / 2, y: -46, width: w, height: 92, rx: 22, fill: 'url(#pg)', stroke: col, 'stroke-width': 3.5, filter: 'url(#sh)' }, g); if (l2s) { T(g, 0, -17, l1s, 27, 'var(--ink)', { bold: 700 }); T(g, 0, 19, l2s, 27, 'var(--ink)', { bold: 700 }); } else T(g, 0, 1, l1s, 36, col, { bold: 800 }); op(g, 0); return g; };
        const g1 = bx(215, 360, a1, a2, col1), g2 = bx(640, 360, b1, b2, col1), g3 = bx(1055, 330, c1, '', colEnd);
        const ar1 = arrow(BG, 408, y, 450, y, 'ink', 4), ar2 = arrow(BG, 833, y, 870, y, 'ink', 4); op(ar1, 0); op(ar2, 0);
        return [g1, ar1, g2, ar2, g3];
      };
      const ch1 = chain(420, 'Toplama tersi', 'N’de yok', 'Çıkarma N’de', 'kapalı değil', 'Z doğdu', 'var(--n)', 'var(--n)', 'var(--z)');
      const ch2 = chain(560, 'Çarpma tersi', 'Z’de yok', 'Bölme Z’de', 'kapalı değil', 'Q doğdu', 'var(--z)', 'var(--z)', 'var(--q)');
      for (const ch of [ch1, ch2]) { for (const el of ch) { await fade(c, el, 1, 450); } await c.wait(500); }
      await c.say('Ters eleman varsa ters işlem kapalıdır; yoksa yeni bir küme gerekir.', { ms: 3600 });
      c.note(`<table class="ptab"><tr><th>Özellik</th><th class="tn">N</th><th class="tz">Z</th><th class="tq">Q</th><th class="tr">R</th></tr>
        <tr><td>+ ve × değişme</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>+ ve × birleşme</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>+ etkisiz (0)</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>× etkisiz (1)</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>+ ters (−a)</td><td>✗<sup>1</sup></td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td>× ters (1/a)</td><td>✗<sup>2</sup></td><td>✗<sup>3</sup></td><td>✓<sup>4</sup></td><td>✓<sup>4</sup></td></tr>
        <tr><td>− ÷ değişme, birleşme</td><td>✗</td><td>✗</td><td>✗</td><td>✗</td></tr></table>
        <p style="font-size:.78rem" class="muted"><sup>1</sup> yalnız 0’ın var · <sup>2</sup> yalnız 1’in var · <sup>3</sup> yalnız 1 ve −1 · <sup>4</sup> 0 hariç</p>
        <p><b>Ters eleman varsa, ters işlem (çıkarma/bölme) kapalıdır.</b> 0’ın çarpma tersi hiçbir kümede yoktur.</p>`, 'İşlem özellikleri', 's5');
      await c.say('Genişlemelerin asıl nedeni budur. Şimdi kapalılık laboratuvarı sende.', { ms: 3000 });
    },
  });

  /* ================= SAHNE 6 — Kapalılık laboratuvarı ================= */
  const LAB_TRAY = {
    N: [0, 1, 2, 3, 4, 5, 6, 8, 12].map((n) => q(n)),
    Z: [-6, -3, -2, -1, 0, 1, 2, 3, 6].map((n) => q(n)),
    Q: [q(-3, 4), q(-1, 2), q(-1, 3), q(0), q(1, 4), q(1, 3), q(1, 2), q(2, 3), q(3, 4), q(5)],
  };
  const WHY = {
    'N|+': 'Doğal sayı kadar şeyi, doğal sayı kadar şeyle <b>birleştirirsen</b> yine doğal sayı kadar şey olur.',
    'N|×': 'Doğal sayı kadar satır ve sütundan bir <b>tablo (satır × sütun)</b> kurarsan yine doğal sayı kadar kare olur.',
    'Z|−': `a − b = a + (−b). Z’de <b>her sayının toplama tersi var</b>, bu yüzden sonuç yine tam sayı.`,
    'Z|+': 'İki tam sayının toplamı yine tam sayıdır (borç + borç da borçtur).',
    'Z|×': 'İki tam sayının çarpımı yine tam sayıdır (eksi × eksi = artı da tam sayı).',
    'Q|+': `${F('a', 'b')} + ${F('c', 'd')} = ${F('ad + bc', 'bd')}: pay ve payda yine tam sayı, payda sıfır olmaz.`,
    'Q|−': `${F('a', 'b')} ${MINUS} ${F('c', 'd')} = ${F('ad ' + MINUS + ' bc', 'bd')}: pay ve payda yine tam sayı, payda sıfır olmaz.`,
    'Q|×': `${F('a', 'b')} · ${F('c', 'd')} = ${F('ac', 'bd')}: pay ve payda yine tam sayı, payda sıfır olmaz.`,
    'Q|÷': `${F('a', 'b')} ÷ ${F('c', 'd')} = ${F('a', 'b')} · ${F('d', 'c')}: c ≠ 0 ise ${F('d', 'c')} vardır, çarpım yine rasyonel.`,
  };

  SCENES.push({
    title: 'Kapalılık laboratuvarı',
    goal: 'Kendi denemelerinle kapalılık tablosunu doldur: tek karşı örnek yeter, olumlu örnekler kanıtlamaz.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { ...GL }); op(mat.root, 0);
      mat.names = false; mat.apply();
      const gate = Gate(c, root, mat, { key: 'N' }); op(gate.g, 0);
      const tbl = Tbl(c, root, { ...TBL_POS, rows: ['N', 'Z', 'Q', 'R'], cols: OPS }); op(tbl.g, 0);
      ['+', MINUS, '×', '÷'].forEach((o2) => tbl.set('R', o2, 'lock', false));
      mat.lit('N');
      await par(fade(c, mat.root, 1, 700), fade(c, gate.g, 1, 700), fade(c, tbl.g, 1, 700));
      const evG = E('g', {}, root);
      T(evG, TBL_POS.x, 518, 'Karşı örnekler', 24, MUTED, { anchor: 'start', bold: 700 });
      const evLines = [];
      const addEv = (str) => { evLines.push(str); T(evG, TBL_POS.x, 550 + (evLines.length - 1) * 34, str, 26, 'var(--err)', { anchor: 'start', bold: 600 }); };
      const sp = c.say('Şimdi laboratuvar sende. Bir kutu seç, iki sayı seç, işlemi seç, sonuca bak. Kırmızıyı bir kere görmen yeter; ama hep yeşil görmen yetmez: <b>“neden hep yeşil?”</b> sorusunu da sormalısın.', { ms: 1200, noWait: true, speak: 'Şimdi laboratuvar sende. Bir kutu seç, iki sayı seç, işlemi seç, sonuca bak. Kırmızıyı bir kere görmen, o kutunun o işlemde kapalı olmadığını göstermeye yeter. Ama hep yeşil görmen yetmez: neden hep yeşil sorusunu da sormalısın.' });

      /* ---- durum ---- */
      const cell = {};
      ['N', 'Z', 'Q'].forEach((r) => OPS.forEach((o2) => { cell[r + '|' + o2] = { r, o2, s: '?', seen: new Set(), explained: false }; }));
      const st = { key: 'N', A: null, B: null, op: '+', busy: false, m8: false };
      let doneRes; const donep = new Promise((r) => { doneRes = r; });

      /* ---- HTML denetimleri ---- */
      const pn = c.panel('Laboratuvar');
      const rowSet = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'Küme'));
      const setBtns = {};
      ['N', 'Z', 'Q'].forEach((k) => { const b = h('button', { class: 'lb' + (k === 'N' ? ' on' : ''), onclick: () => chooseSet(k) }, k); setBtns[k] = b; rowSet.append(b); });
      const trayRow = h('div', { class: 'rowc' }); const trayLbl = h('span', { class: 'lbl' }, 'A ve B sayısı');
      const rowOp = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'İşlem'));
      const opBtns = {};
      OPS.forEach((o2) => { const b = h('button', { class: 'lb' + (o2 === '+' ? ' on' : ''), onclick: () => { st.op = o2; Object.values(opBtns).forEach((x) => x.classList.remove('on')); b.classList.add('on'); sum(); } }, o2); opBtns[o2] = b; rowOp.append(b); });
      const summ = h('span', { style: { margin: '0 8px', fontSize: '1.05rem' } }); const goBtn = h('button', { class: 'lb go', onclick: () => doTest() }, 'Test et ›');
      rowOp.append(summ, goBtn);
      const task = h('div', { class: 'rowc', style: { color: 'var(--muted)', fontSize: '.9rem' } });
      const fb = h('div'); const whyBox = h('div');
      pn.append(rowSet, h('div', { class: 'rowc' }, trayLbl), trayRow, rowOp, task, fb, whyBox);
      const sum = () => { summ.innerHTML = `<b>${st.A ? fh(st.A) : '□'}</b> ${st.op} <b>${st.B ? fh(st.B) : '□'}</b>`; };
      const buildTray = () => {
        trayRow.innerHTML = '';
        LAB_TRAY[st.key].forEach((t) => trayRow.append(h('button', { class: 'lb', html: fh(t), onclick: () => pick(t) })));
      };
      const pick = (t) => { if (st.busy) return; if (!st.A || st.B) { st.A = t; st.B = null; } else st.B = t; sum(); };
      const chooseSet = (k) => { if (st.busy) return; st.key = k; st.A = st.B = null; Object.entries(setBtns).forEach(([kk, b]) => b.classList.toggle('on', kk === k)); buildTray(); sum(); gate.setKey(k); mat.lit('N', k === 'N'); ['N', 'Z', 'Q'].forEach((kk) => mat.lit(kk, kk === k)); };
      buildTray(); sum(); mat.lit('N', true);
      const refreshTask = () => {
        const reds = ['N|' + MINUS, 'N|÷', 'Z|÷'].filter((k) => cell[k].s === 'x').length;
        const greens = Object.values(cell).filter((x) => x.explained && x.s === 'v').length;
        task.innerHTML = `<span>Görev 1 — Kırmızıyı bul (N−, N÷, Z÷): <b class="${reds === 3 ? 'good' : ''}">${reds}/3</b></span><span>·</span><span>Görev 2 — “Neden hep yeşil?” de (en az 3 hücre): <b class="${greens >= 3 ? 'good' : ''}">${Math.min(3, greens)}/3</b></span>`;
        if (reds === 3 && greens >= 3) doneRes('done');
      };
      refreshTask();

      const showWhy = (key) => {
        const cl = cell[key]; if (cl.s === 'x' || cl.explained) return;
        whyBox.innerHTML = '';
        const box = h('div', { class: 'fb info' });
        box.innerHTML = `<b>Neden hep yeşil? (${cl.r}, ${cl.o2})</b><br>${WHY[key]}<br>`;
        const okb = h('button', { class: 'lb go', style: { marginTop: '8px' }, onclick: async () => { cl.explained = true; cl.s = 'v'; box.remove(); await tbl.set(cl.r, cl.o2, 'v'); tbl.hilite(cl.r, cl.o2, false); refreshTask(); } }, 'Okudum, tamam ✓');
        box.append(okb); whyBox.append(box);
      };
      // tablodaki hücreye dokunarak da aç
      Object.keys(cell).forEach((key) => { const cl = cell[key]; c.on(tbl.cells[key].g, 'pointerdown', () => { if (cl.seen.size >= 3 && !cl.explained && cl.s !== 'x') showWhy(key); }); tbl.cells[key].g.style.cursor = 'pointer'; });

      const doTest = async () => {
        if (st.busy) return;
        if (!st.A || !st.B) { c.feedback(fb, 'info', 'Önce iki sayı seç: ilk dokunuş <b>A</b>, ikincisi <b>B</b> olur.'); return; }
        st.busy = true; goBtn.disabled = true;
        const A2 = st.A, B2 = st.B, o2 = st.op, key = st.key + '|' + o2;
        try {
          gate.setKey(st.key);
          await gate.load(A2, o2, B2);
          const r0 = calc(A2, o2, B2);
          if (r0 === undefined) {
            await gate.run(undefined);
            c.feedback(fb, 'info', '<b>0’a bölme tanımsız;</b> kapalılık testine girmez. Başka bir sayı dene.');
          } else {
            const res = await gate.run(r0);
            const cl = cell[key];
            const txt = `${lab(A2)} ${o2} ${lab(B2)} = ${lab(r0)}`;
            if (!res.ok) {
              if (cl.s !== 'x') { cl.s = 'x'; cl.explained = true; await tbl.set(cl.r, o2, 'x'); addEv(`${cl.r}, ${o2}:  ${txt} ∉ ${cl.r}`); }
              c.feedback(fb, 'ok', `<b>Karşı örnek bulundu:</b> ${txt} ∉ ${st.key}. ${st.key} bu işlemde kapalı değil. <b>Tek karşı örnek yetti.</b>`);
            } else if (cl.s !== 'x' && !cl.explained) {
              if (cl.r === 'N' && o2 === '÷' && cl.seen.size === 0 && !st.m8) { st.m8 = true; c.feedback(fb, 'info', `Bu deneme yeşil. Bu, N’nin bölmede kapalı olduğu anlamına gelir mi? <b>Birkaç farklı çift daha dene.</b>`); }
              else c.feedback(fb, 'info', `${txt} ∈ ${st.key}: yeşil. Ama tek olumlu örnek kapalılığı <b>kanıtlamaz</b>.`);
              cl.seen.add(txt); await tbl.set(cl.r, o2, '..');
              if (cl.seen.size >= 3) { tbl.hilite(cl.r, o2, true); fb.innerHTML += `<br><button class="lb go" style="margin-top:6px" id="why-${cl.r}${OPS.indexOf(o2)}">Neden hep yeşil?</button>`; const bb = fb.querySelector('button'); if (bb) bb.onclick = () => showWhy(key); }
            }
          }
        } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; return; }
        st.busy = false; goBtn.disabled = false; refreshTask();
      };

      await sp;
      const hintBtn = h('button', { class: 'lb', style: { marginLeft: 'auto' }, onclick: () => c.feedback(fb, 'info', 'İpucu: N’de küçük bir sayıdan büyüğünü çıkar (3 − 5). Bölmede 3 ÷ 4 dene. Z’de de 3 ÷ 4 işe yarar.') }, 'İpucu');
      task.append(hintBtn);
      const r = await withSkip(c, donep, 'Laboratuvarı atla ›');
      st.busy = true;
      pn.remove();
      if (r === 'skip') await c.say('Tablo dolduruldu. Ama unutma: <b>bir olumlu örnek kapalılığı kanıtlamaz</b>; yeşil için “neden?” gerekir.', { ms: 3600 });
      // tabloyu tamamla
      mat.glow('N', 0);
      const final = { 'N|+': 'v', ['N|' + MINUS]: 'x', 'N|×': 'v', 'N|÷': 'x', 'Z|+': 'v', ['Z|' + MINUS]: 'v', 'Z|×': 'v', 'Z|÷': 'x', 'Q|+': 'v', ['Q|' + MINUS]: 'v', 'Q|×': 'v', 'Q|÷': 'v' };
      for (const [k, v] of Object.entries(final)) { const [rr, oo] = k.split('|'); if (tbl.cells[k].state !== v) await tbl.set(rr, oo, v); tbl.hilite(rr, oo, false); }
      await c.say('<b>Kırmızı bir örnek yeter. Yeşil örnekler yetmez, “neden?” gerekir.</b> R satırı kilitli: onu birkaç sahne sonra açacağız.', { ms: 4800, speak: 'Kırmızı bir örnek yeter. Yeşil örnekler yetmez, neden sorusunun cevabı gerekir. R satırı kilitli: onu birkaç sahne sonra açacağız.' });
      c.note(`<table class="ptab"><tr><th>Küme</th><th>+</th><th>−</th><th>×</th><th>÷ (b≠0)</th></tr>
        <tr><td class="tn"><b>N</b></td><td>✓</td><td>✗ (3−5)</td><td>✓</td><td>✗ (3÷4)</td></tr>
        <tr><td class="tz"><b>Z</b></td><td>✓</td><td>✓</td><td>✓</td><td>✗ (3÷4)</td></tr>
        <tr><td class="tq"><b>Q</b></td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
        <tr><td class="tr"><b>R</b></td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr></table>
        <p><b>Kırmızı bir örnek yeter.</b> Yeşil örnekler yetmez, “neden?” gerekir. (R satırı S11’de açılır.)</p>`, 'Kapalılık tablosu', 's6');
    },
  });

  /* ================= SAHNE 7 — Kesir ondalığa dönüşünce: biten ondalıklar ================= */
  const terminates = (a, b) => factorize(reduceDen(a, b)).every((f) => f === 2 || f === 5);
  const facTxt = (a, b) => { const d = reduceDen(a, b); return `${d} = ${factorize(d).join(' · ')}`; };
  function fracCard(c, p, x, y, a, b, o = {}) {
    const g = G(p, x, y);
    card(g, 0, 0, 270, 250, { rx: 22, stroke: o.col || 'var(--line)' });
    fracG(g, 135, 70, String(a), String(b), 54, 'var(--ink)');
    const ft = T(g, 135, 150, o.hide ? '?' : facTxt(a, b), 32, o.hide ? MUTED : 'var(--ink)', { bold: 600 });
    const bd = G(g, 135, 206);
    return { g, bd, reveal: () => { ft.textContent = facTxt(a, b); ft.style.fill = 'var(--ink)'; } };
  }
  function badge(c, host, ok, txt) {
    host.innerHTML = '';
    const col = ok ? 'var(--ok)' : 'var(--err)';
    E('rect', { x: -112, y: -26, width: 224, height: 52, rx: 26, fill: ok ? 'rgba(61,220,151,.14)' : 'rgba(255,77,94,.14)', stroke: col, 'stroke-width': 3 }, host);
    icon(host, ok ? 'ok' : 'no', -78, 0, 0.62); T(host, 18, 1, txt, 28, col, { bold: 700 });
  }

  SCENES.push({
    title: 'Kesir ondalığa dönüşünce: biten ondalıklar',
    goal: 'Her rasyonel sayının bir ondalık adresi var: payı paydaya böl. Kalan 0 olursa ondalık biter.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const head = T(root, 640, 52, 'Her rasyonel sayının bir ondalık adresi var', 40, 'var(--ink)', { bold: 700 }); op(head, 0);
      await fade(c, head, 1, 600);
      c.say('Her rasyonel sayının bir ondalık adresi var: payı paydaya bölersen bulursun.', { ms: 3200, noWait: true });
      // büyük kesir
      const big = E('g', {}, root); const fr = fracG(big, 640, 330, '1', '4', 120, 'var(--q)');
      const eqq = T(big, 790, 330, '=  ?', 100, 'var(--ink)', { bold: 700, anchor: 'start' }); op(big, 0);
      await fade(c, big, 1, 600); await c.wait(1400);
      const ledger = Ledger(c, root, { x: 690, y: 110, w: 520, h: 470, rowH: 60 }); op(ledger.g, 0);
      const ld = LongDiv(c, root, { x: 110, y: 250, a: 1, b: 4, K: 6, ledger, fs: 34, dx: 40, rh: 44 });
      // pay ve payda bölme düzenine uçar
      const nT = T(root, 640, 330 - 74, '1', 120 * 0.8, 'var(--q)', { bold: 600 }), dT = T(root, 640, 330 + 80, '4', 120 * 0.8, 'var(--q)', { bold: 600 });
      op(big, 0);
      await par(mv0(c, nT, 640, 256, ld.pos.dividend[0], ld.pos.dividend[1], 34), mv0(c, dT, 640, 410, ld.pos.divisor[0], ld.pos.divisor[1], 38), fade(c, head, 0, 500));
      nT.remove(); dT.remove();
      await par(ld.start(), fade(c, ledger.g, 1, 500));
      await c.say('Bir bölü dört: bölmeyi yap. 1 < 4 olduğu için bölüme <b>0,</b> yazıp bölünene bir 0 ekliyoruz: 10.', { ms: 4200, speak: 'Bir bölü dört: bölmeyi yap. Bir, dörtten küçük olduğu için bölüme sıfır virgül yazıp bölünene bir sıfır ekliyoruz: on.' });
      await ld.step();
      await c.say('On bölü dört: iki, kalan iki. Kalanı deftere yazdık.', { ms: 2600 });
      await ld.step();
      await c.say('Yirmi bölü dört: beş, <b>kalan sıfır</b>. Kalan 0 olunca bölme biter.', { ms: 3200 });
      const res1 = rich(root, 380, 630, 60, [{ frac: ['1', '4'], col: 'var(--q)' }, { t: '  =  0,25', col: 'var(--ok)' }]); op(res1, 0); await fade(c, res1, 1, 600);
      await c.wait(1500);
      // ikinci örnek 3/8
      await par(fade(c, ld.g, 0, 500), fade(c, ledger.g, 0, 500), fade(c, res1, 0, 500));
      ld.destroy(); ledger.g.remove(); res1.remove();
      const ledger2 = Ledger(c, root, { x: 690, y: 110, w: 520, h: 470, rowH: 60 }); op(ledger2.g, 0);
      const ld2 = LongDiv(c, root, { x: 110, y: 250, a: 3, b: 8, K: 6, ledger: ledger2, fs: 34, dx: 40, rh: 44, fast: true });
      c.say('Hızlı bir ikinci örnek: <b>3/8</b>. 30 ÷ 8 = 3, kalan 6; 60 ÷ 8 = 7, kalan 4; 40 ÷ 8 = 5, kalan 0.', { ms: 5200, noWait: true, speak: 'Hızlı bir ikinci örnek: üç bölü sekiz. Otuz bölü sekiz üç, kalan altı; altmış bölü sekiz yedi, kalan dört; kırk bölü sekiz beş, kalan sıfır.' });
      await par(ld2.start(), fade(c, ledger2.g, 1, 400));
      for (let i = 0; i < 3; i++) { await ld2.step(); await c.wait(250); }
      const res2 = rich(root, 380, 630, 60, [{ frac: ['3', '8'], col: 'var(--q)' }, { t: '  =  0,375', col: 'var(--ok)' }]); op(res2, 0); await fade(c, res2, 1, 600);
      await c.say('Kalanlar 6, 4, 0: kalan sıfıra ulaştı, bölme bitti. Biten ondalıklar, rasyonelin en kolay hâli.', { ms: 4200 });
      await par(fade(c, ld2.g, 0, 500), fade(c, ledger2.g, 0, 500), fade(c, res2, 0, 500));
      ld2.destroy(); ledger2.g.remove(); res2.remove();

      // --- paydadaki çarpanlar ---
      const t2 = T(root, 640, 52, 'Paydaya bak: hangi asal çarpanlar var?', 40, 'var(--ink)', { bold: 700 }); op(t2, 0); await fade(c, t2, 1, 500);
      c.say('Neden bazıları biter, bazıları bitmez? <b>Paydaya</b> bakalım.', { ms: 2400, noWait: true });
      const defs2 = [[1, 4], [3, 8], [1, 6], [7, 20]];
      const cards = defs2.map(([a, b], i) => fracCard(c, root, 40 + i * 300, 150, a, b, { hide: i === 3 }));
      cards.forEach((cd) => op(cd.g, 0));
      for (let i = 0; i < 3; i++) { await fade(c, cards[i].g, 1, 400); await c.wait(250); badge(c, cards[i].bd, terminates(...defs2[i]), terminates(...defs2[i]) ? 'biter' : 'bitmez'); await c.wait(500); }
      await fade(c, cards[3].g, 1, 400);
      const bd3 = cards[3].bd; E('rect', { x: -112, y: -26, width: 224, height: 52, rx: 26, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 3, 'stroke-dasharray': '7 5' }, bd3); T(bd3, 0, 1, 'biter mi?', 28, 'var(--warn)', { bold: 700 });
      const rule = T(root, 640, 470, 'Payda yalnızca 2 ve 5 çarpanlarından oluşuyorsa (sadeleşmiş kesirde) ondalık biter.', 28, MUTED); op(rule, 0);
      await fade(c, rule, 1, 600);
      await c.say('Paydası yalnızca 2 ve 5 çarpanlarından oluşan kesirler biter; 1/6’da 3 çarpanı var.', { ms: 4200, speak: 'Paydası yalnızca 2 ve 5 çarpanlarından oluşan kesirler biter; altıda birde 3 çarpanı var.' });
      // --- tahmin: 7/20 ---
      await c.choice({
        tag: 'Tahmin et', q: `${F(7, 20)} biter mi, devreder mi?`, options: ['Biter', 'Devreder'], answer: 0,
        hints: ['', 'Payda 20 = 2² · 5; <b>3 ya da 7 gibi başka çarpan yok</b> → biter.'], right: 'Evet, biter: payda 20 = 2 · 2 · 5. Uzun bölmeyle doğrulayalım.', next: 'Doğrula ›',
      });
      await par(fade(c, cards[0].g, 0, 400), fade(c, cards[1].g, 0, 400), fade(c, cards[2].g, 0, 400), fade(c, cards[3].g, 0, 400), fade(c, rule, 0, 300), fade(c, t2, 0, 300));
      // öğrenci adımları çalıştırır
      const ledger3 = Ledger(c, root, { x: 690, y: 150, w: 520, h: 330, rowH: 60 }); op(ledger3.g, 0);
      const ld3 = LongDiv(c, root, { x: 110, y: 330, a: 7, b: 20, K: 6, ledger: ledger3, fs: 34, dx: 40, rh: 44 });
            await par(ld3.start(), fade(c, ledger3.g, 1, 400));
      for (let i = 0; i < ld3.K; i++) { await c.cont(`Adım ${i + 1}’i çalıştır ›`); await ld3.step(); }
      await c.say(`70 ÷ 20 = 3 (kalan 10), 100 ÷ 20 = 5 (kalan 0) → ${F(7, 20)} = 0,35 biter.`, { ms: 3600, speak: 'Yetmiş bölü yirmi üç, kalan on; yüz bölü yirmi beş, kalan sıfır. Yani yedi bölü yirmi, sıfır virgül otuz beş: biter.' });
      await par(fade(c, ld3.g, 0, 400), fade(c, ledger3.g, 0, 400), fade(c, rule, 0, 10));
      ld3.destroy(); ledger3.g.remove();
      // sadeleştirme mikro görevi
      op(cards[3].g, 0); cards[3].bd.innerHTML = '';
      const c12 = fracCard(c, root, 500, 160, 3, 12, { hide: true }); c12.g.setAttribute('transform', 'translate(500 160)'); op(c12.g, 0); await fade(c, c12.g, 1, 400);
      await c.choice({
        tag: 'Mikro görev', q: `${F(3, 12)} biter mi? (Sadeleştirmeden bakma!)`, options: ['Biter', 'Devreder'], answer: 0,
        hints: ['', 'Önce sadeleştir: 3/12 = 1/4. Payda 4 = 2²’dir, yani biter.'], right: '3/12 = 1/4 ve payda 4 = 2 · 2 → 0,25. <b>Önce sadeleştir, sonra payda çarpanlarına bak.</b>', next: 'Devam ›',
      });
      c12.reveal(); badge(c, c12.bd, true, 'biter');
      c.note(`Her rasyonel sayının bir ondalık açılımı vardır (payı paydaya böl).<br>Uzun bölmede <b>kalan 0 olursa</b> ondalık <b>biter</b>: ${F(1, 4)} = 0,25 ; ${F(3, 8)} = 0,375 ; ${F(7, 20)} = 0,35.<br>Sadeleşmiş kesirde payda yalnızca <b>2 ve 5</b> çarpanlarını taşıyorsa ondalık biter.`, 'Biten ondalıklar', 's7');
      await c.say('Peki kalan hiç sıfır olmazsa? Sıradaki sahne tam bunu soruyor.', { ms: 2800 });
    },
  });

  /* ================= SAHNE 8 — Devreden ondalıklar: kalan defteri ================= */
  /* kalan zinciri: r0 → r1 → r2 … tekrar eden kalan halkalanır */
  async function remChain(c, p, x, y, a, b, k) {
    const inf = divInfo(a, b, k, false);
    const rems = [inf.r0, ...inf.steps.map((s2) => s2.rem)];
    const g = E('g', {}, p); const pills = [];
    for (let i = 0; i < rems.length; i++) {
      const pl = pill(g, { k: 'x', txt: String(rems[i]), color: i === 0 ? 'var(--q)' : 'var(--ink)' }, { x: x + i * 120, y, size: 30, color: rems[i] === 0 ? 'var(--ok)' : 'var(--q)' });
      put(pl, { s: 0.001 }); pills.push(pl);
      if (i > 0) { const ar = arrow(g, x + (i - 1) * 120 + 40, y, x + i * 120 - 42, y, 'muted', 3); op(ar, 0); await fade(c, ar, 1, 150); }
      await pop(c, pl, 1, 300);
    }
    const last = rems[rems.length - 1];
    const firstIdx = rems.indexOf(last);
    const lg = G(g, 0, 0);
    if (last === 0) { T(lg, x + (rems.length - 1) * 120, y + 56, 'kalan 0 → biter', 26, 'var(--ok)', { bold: 700 }); }
    else if (firstIdx < rems.length - 1) {
      pills[firstIdx].setCol('var(--warn)'); pills[rems.length - 1].setCol('var(--warn)');
      T(lg, x + (firstIdx + rems.length - 1) * 60, y + 56, `${last} tekrar etti → devreder`, 26, 'var(--warn)', { bold: 700 });
    }
    return g;
  }
  const dTxt = (a, b) => decPlain(a, b, 3);

  SCENES.push({
    title: 'Devreden ondalıklar: kalan defteri',
    goal: 'Kalan tekrar edince ondalık devreder. Devir uzun olabilir; uzun olması irrasyonel yapmaz.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      /* ---------- 1/3 ---------- */
      const ledger = Ledger(c, root, { x: 690, y: 80, w: 520, h: 360, rowH: 56 }); op(ledger.g, 0);
      const ld = LongDiv(c, root, { x: 110, y: 170, a: 1, b: 3, K: 3, stop: false, ledger, fs: 34, dx: 40, rh: 44 });
      const sp = c.say('Peki kalan hiç sıfır olmazsa? Bir bölü üç: on bölü üç, üç, kalan bir. Yine bir! Yine on bölü üç, üç, kalan bir. Başladığımız kalana geri döndük.', { ms: 11000, speak: 'Peki kalan hiç sıfır olmazsa? Bir bölü üç: on bölü üç, üç, kalan bir. Yine bir! Yine on bölü üç, üç, kalan bir. Başladığımız kalana geri döndük.', noWait: true });
      await par(ld.start(), fade(c, ledger.g, 1, 500));
      await c.wait(900);
      await ld.step();
      const alarm = tag(root, 950, 470, 'Aynı kalan! Döngü.', 30, 'var(--q)'); op(alarm, 0); await fade(c, alarm, 1, 400);
      await c.wait(1300);
      await ld.step(); await c.wait(500); await ld.step();
      await ld.over(0, 2, 'var(--q)');
      const r13 = rich(root, 330, 520, 56, [{ frac: ['1', '3'], col: 'var(--q)' }, { t: '  =  0,333…  =  ' }]);
      const dd = decG(root, 560, 520, 56, [{ t: '0,' }, { t: '3', over: true, col: 'var(--q)' }], 'var(--ink)', 'start'); op(r13, 0); op(dd.g, 0);
      await par(fade(c, r13, 1, 500), fade(c, dd.g, 1, 500));
      await sp;
      const why = G(root, 110, 590); card(why, 0, 0, 1000, 84, { rx: 18, stroke: 'var(--q)' });
      T(why, 500, 28, '“Neden döngü?”  Bölme yalnızca kalana bakar.', 30, 'var(--q)', { bold: 700 });
      T(why, 500, 60, 'Aynı kalan gelince, aynı adımlar yeniden gelir.', 28, 'var(--ink)', { bold: 600 }); op(why, 0);
      await fade(c, why, 1, 500);
      await c.say('Üçler sonsuza kadar sürecek: <b>0,333…</b> Buna <b>devreden ondalık</b> denir. Bölme yalnız <b>kalana</b> bakar; aynı kalan gelince aynı adımlar tekrar gelir.', { ms: 6200, speak: 'Üçler sonsuza kadar sürecek: sıfır virgül üç üç üç. Buna devreden ondalık denir. Bölme yalnız kalana bakar; aynı kalan gelince aynı adımlar tekrar gelir.' });
      // --- tahmin: kaç farklı kalan? ---
      await par(fade(c, ld.g, 0, 400), fade(c, ledger.g, 0, 400), fade(c, r13, 0, 400), fade(c, dd.g, 0, 400), fade(c, why, 0, 400));
      ld.destroy(); ledger.g.remove(); r13.remove(); dd.g.remove(); why.remove(); alarm.remove();
      await c.choice({
        tag: 'Tahmin et', q: 'Bölen <b>7</b> ise, sıfır olmayan <b>kaç farklı kalan</b> çıkabilir? (Kalan her zaman bölenden küçüktür.)', options: ['5', '6', '7', 'Sonsuz'], answer: 1,
        hints: ['Kalanlar 1, 2, 3, 4, 5, 6 olabilir: 6 farklı değer.', '', 'Kalan 0 olsaydı bölme biterdi; devreden bölmede 0 çıkmaz. 0 hariç yalnız 6 değer (1, 2, 3, 4, 5, 6) kalıyor.', 'Kalan her zaman 7’den küçük. <b>Sonsuz çeşit olamaz.</b>'],
        right: 'Evet: 6 farklı kalan. Bakalım 1/7’de hepsi sırayla çıkacak mı?', next: 'Bölmeyi başlat ›',
      });

      /* ---------- 1/7 ---------- */
      const ledger7 = Ledger(c, root, { x: 700, y: 60, w: 510, h: 500, rowH: 56 }); op(ledger7.g, 0);
      const ld7 = LongDiv(c, root, { x: 100, y: 110, a: 1, b: 7, K: 8, ledger: ledger7, fs: 30, dx: 34, rh: 37 });
      const sp7 = c.say('Bir bölü yedi daha uzun bir döngü: bir, dört, iki, sekiz, beş, yedi, sonra yine baştan.', { ms: 16000, noWait: true, speak: 'Bir bölü yedi daha uzun bir döngü: bir, dört, iki, sekiz, beş, yedi, sonra yine baştan.' });
      await par(ld7.start(), fade(c, ledger7.g, 1, 500));
      for (let i = 0; i < ld7.K; i++) { await ld7.step(); await c.wait(350); }
      await par(ld7.ring(0, 5, 'var(--q)'));
      const tl = rich(root, 100, 612, 40, [{ frac: ['1', '7'], col: 'var(--q)' }, { t: '  =  0,142857142857…' }], { anchor: 'start' }); op(tl, 0);
      const tl2 = rich(root, 100, 668, 40, [{ frac: ['1', '7'], col: 'var(--q)' }, { t: '  =  ' }], { anchor: 'start' });
      const dd7 = decG(root, 100 + tl2._w + 4, 668, 40, [{ t: '0,' }, { t: '142857', over: true, col: 'var(--q)' }], 'var(--ink)', 'start');
      op(tl2, 0); op(dd7.g, 0);
      await par(fade(c, tl, 1, 500), fade(c, tl2, 1, 500), fade(c, dd7.g, 1, 500));
      await sp7;
      await c.say('Altıncı adımda kalan 1, başlangıç kalanıyla eşleşti: devir <b>142857</b>, tam 6 basamak.', { ms: 3800, speak: 'Altıncı adımda kalan bir, başlangıç kalanıyla eşleşti: devir bir dört iki sekiz beş yedi, tam altı basamak.' });
      await par(fade(c, ld7.g, 0, 450), fade(c, ledger7.g, 0, 450), fade(c, tl, 0, 450), fade(c, tl2, 0, 450), fade(c, dd7.g, 0, 450));
      ld7.destroy(); ledger7.g.remove(); tl.remove(); tl2.remove(); dd7.g.remove();

      /* ---------- güvercin yuvası ---------- */
      const PG = E('g', {}, root); op(PG, 0);
      T(PG, 640, 56, 'Neden en fazla 6 adımda döngü başlar?', 40, 'var(--ink)', { bold: 700 });
      const boxes = [];
      for (let i = 1; i <= 6; i++) {
        const bg = G(PG, 175 + (i - 1) * 186, 340);
        E('rect', { x: -66, y: -66, width: 132, height: 132, rx: 22, fill: 'rgba(255,255,255,.04)', stroke: 'var(--line)', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, bg);
        T(bg, 0, 90, `kalan ${i}`, 24, MUTED, {}); boxes.push(bg);
      }
      await fade(c, PG, 1, 500);
      const inf7 = divInfo(1, 7, 7, false); const seq = inf7.steps.map((s2) => s2.rem);
      c.say('Kalan 0’dan farklı ve bölenden küçük. 7’de en fazla 6 farklı kalan var; <b>her yeni kalan bir kutuyu doldurur</b>.', { ms: 5800, noWait: true, speak: 'Kalan sıfırdan farklı ve bölenden küçük. Yedide en fazla altı farklı kalan var; her yeni kalan bir kutuyu doldurur.' });
      for (let i = 0; i < seq.length; i++) {
        const rv = seq[i]; const bx = boxes[rv - 1];
        const pl = pill(PG, { k: 'x', txt: String(rv), color: 'var(--q)' }, { x: 640, y: 160, size: 34, color: 'var(--q)' });
        put(pl, { s: 0.001 }); await pop(c, pl, 1, 250);
        const filled = bx._filled;
        await mv(c, pl, bx._p.x, bx._p.y, 650, ease.inOut, { s: 1.25 });
        if (!bx._filled) { bx._filled = true; bx.firstChild.setAttribute('stroke', 'var(--q)'); bx.firstChild.setAttribute('fill', 'rgba(108,140,240,.16)'); bx.firstChild.removeAttribute('stroke-dasharray'); }
        else { bx.firstChild.setAttribute('stroke', 'var(--warn)'); bx.firstChild.setAttribute('stroke-width', 6); T(PG, bx._p.x, 250, 'dolu → tekrar!', 28, 'var(--warn)', { bold: 700 }); }
        await c.wait(250);
      }
      const gh = tag(PG, 640, 520, 'Altı kutu dolunca, yedinci kalan mutlaka biriyle aynı olur.', 30, 'var(--warn)'); op(gh, 0); await fade(c, gh, 1, 500);
      await c.wait(2400);
      await fade(c, PG, 0, 450); PG.remove();

      /* ---------- 1/17 şeridi ---------- */
      const d17 = decOf(1, 17); const rep17 = d17.rep.join('');
      const RB2 = E('g', {}, root); op(RB2, 0);
      const clipId = 'clip-rib'; E('rect', { x: 50, y: 150, width: 1180, height: 260 }, E('clipPath', { id: clipId }, svg.querySelector('defs')));
      T(RB2, 640, 70, '1/17 nasıl bir sayı?', 40, 'var(--ink)', { bold: 700 });
      const win = E('g', { 'clip-path': `url(#${clipId})` }, RB2);
      const strip = G(win, 0, 0);
      const FS17 = 36, cw = FS17 * 0.6; const blockW = rep17.length * cw;
      let bxx = 60;
      T(strip, bxx, 250, '0,', FS17, 'var(--ink)', { anchor: 'start', mono: true, bold: 700 }); bxx += 2 * cw + 6;
      const blocks17 = [];
      for (let j = 0; j < 3; j++) {
        const bg = G(strip, 0, 0); blocks17.push(bg); const colj = j % 2 ? 'var(--q)' : 'var(--z)';
        T(bg, bxx, 250, rep17, FS17, colj, { anchor: 'start', mono: true, bold: 700 });
        E('path', { d: `M${bxx + 2},280 v12 H${bxx + blockW - 2} v-12`, fill: 'none', stroke: colj, 'stroke-width': 4, 'stroke-linecap': 'round' }, bg);
        T(bg, bxx + blockW / 2, 324, '16 basamak', 28, colj, { bold: 700 });
        op(bg, 0); bxx += blockW + 18;
      }
      T(strip, bxx, 250, '…', FS17, 'var(--ink)', { anchor: 'start', bold: 700 });
      await fade(c, RB2, 1, 500);
      c.say('1/17’nin devri tam 16 basamak: <b>0,0588235294117647 0588235294117647…</b> Çok uzun görünüyor ama kalıp tekrar ediyor.', { ms: 6500, noWait: true, speak: 'Bir bölü on yedinin devri tam on altı basamak. Çok uzun görünüyor ama kalıp tekrar ediyor.' });
      for (const bg of blocks17) { await par(fade(c, bg, 1, 700), c.tween(700, (e) => put(bg, { x: 80 * (1 - e) }))); await c.wait(1100); }
      const msg17 = T(RB2, 640, 450, 'Ne kadar uzun olursa olsun, tekrar ediyorsa rasyoneldir.', 34, 'var(--ok)', { bold: 700 }); op(msg17, 0); await fade(c, msg17, 1, 500);
      await c.say('Uzun olması irrasyonel yapmaz: <b>ölçüt uzunluk değil, devretmedir</b>.', { ms: 3600 });
      await fade(c, RB2, 0, 450); RB2.remove();

      /* ---------- sürükle-bırak: biter mi, devreder mi? ---------- */
      const zoneDefs = [{ id: 'term', x: 70, label: 'BİTER', col: 'var(--ok)' }, { id: 'rep', x: 670, label: 'DEVREDER', col: 'var(--q)' }];
      const zones = zoneDefs.map((z) => {
        const g = G(root, 0, 0);
        const r = E('rect', { x: z.x, y: 90, width: 540, height: 290, rx: 26, fill: z.id === 'term' ? 'rgba(61,220,151,.07)' : 'rgba(108,140,240,.08)', stroke: z.col, 'stroke-width': 3, 'stroke-dasharray': '10 7' }, g);
        T(g, z.x + 270, 128, z.label, 38, z.col, { bold: 800 });
        op(g, 0); return { ...z, g, el: r, n: 0, hit: (x, y) => x > z.x && x < z.x + 540 && y > 90 && y < 380 };
      });
      await par(...zones.map((z) => fade(c, z.g, 1, 500)));
      const cardsD = [[1, 8], [5, 6], [2, 5], [4, 9]];
      const itemsD = sh(cardsD).map(([a, b], i) => {
        const xx = 215 + i * 280, g = pill(root, { k: 'q', n: a, d: b, color: 'var(--ink)' }, { x: xx, y: 590, size: 36, color: 'var(--ink)' });
        return { g, a, b, id: a + '/' + b, home: { x: xx, y: 590, s: 1 }, aria: `${a}/${b}` };
      });
      const pnD = c.panel('Sürükle', h('p', { class: 'q', html: 'Her kesri <b>BİTER</b> ya da <b>DEVREDER</b> kutusuna sürükle. Karar için paydaya ve kalanlara bak.' }));
      const fbD = h('div'); pnD.appendChild(fbD);
      let left = itemsD.length; let doneD; const pD = new Promise((r) => { doneD = r; });
      let chainG = null;
      const sorterD = Sorter(c, svg, {
        items: itemsD, zones,
        onDrop: async (it, zid) => {
          const truth = terminates(it.a, it.b) ? 'term' : 'rep';
          if (chainG) { chainG.remove(); chainG = null; }
          if (zid !== truth) {
            const inf = divInfo(it.a, it.b, 3, false);
            const rs = [inf.r0, ...inf.steps.map((s2) => s2.rem)];
            c.feedback(fbD, 'no', `Kalanlara bak: <b>${rs.join(', ')}${inf.term ? '' : '…'}</b> — ${inf.term ? 'kalan 0 oldu, bölme biter.' : 'aynı kalan tekrar ediyor, bölme devreder.'}`);
            chainG = await remChain(c, root, 330, 470, it.a, it.b, 3);
            await c.wait(1600);
            if (chainG) { chainG.remove(); chainG = null; }
            return false;
          }
          const z = zones.find((zz) => zz.id === zid); const k = z.n++;
          const sx = z.x + 90 + (k % 2) * 255, sy = 200 + Math.floor(k / 2) * 100;
          const dg = decG(root, sx + 62, sy, 28, (() => { const d = decOf(it.a, it.b); const parts = [{ t: '= ' + d.ip + ',' + d.pre.join('') }]; if (d.rep.length) parts.push({ t: d.rep.join(''), over: true, col: 'var(--q)' }); return parts; })(), 'var(--ink)', 'start'); op(dg.g, 0);
          fade(c, dg.g, 1, 600).catch(() => {});
          c.feedback(fbD, 'ok', `Doğru: ${it.a}/${it.b} = <b>${dTxt(it.a, it.b)}</b> — ${zid === 'term' ? 'kalan 0 olunca biter.' : 'kalan tekrar edince devreder.'}`);
          left--; if (left <= 0) doneD();
          return { x: sx, y: sy, s: 0.9 };
        },
      });
      await withSkip(c, pD);
      pnD.remove();
      await c.say('Dördü de <b>rasyonel</b>: ondalık açılımı bitiyor ya da devrediyor.', { ms: 3200 });
      c.note(`Uzun bölmede <b>kalan 0</b> olursa ondalık <b>biter</b>, <b>kalan tekrar ederse devreder</b>.<br><b>${F(1, 3)} = 0,${ov('3')}</b> ; <b>${F(1, 7)} = 0,${ov('142857')}</b> (devir 6 basamak). Paydası <i>b</i> olan kesirde devir en fazla <i>b − 1</i> basamaktır.<br><b>Her rasyonelin ondalık açılımı ya biter ya devreder.</b> Devreden ondalık da rasyoneldir.`, 'Devreden ondalıklar', 's8');
    },
  });

  /* ================= SAHNE 10 — Kare, köşegen ve sayı doğrusundaki delik ================= */
  /* doğru/yanlış olmayan, her seçeneğe geri bildirim veren soru */
  function softChoice(c, o) {
    return new Promise((res) => {
      const pn = c.panel(o.tag || 'Tahmin et', h('p', { class: 'q', html: o.q }));
      const row = h('div', { class: 'opts' }); const fb = h('div'); let done = false;
      o.options.forEach((t, i) => {
        const b = h('button', { class: 'opt', html: t });
        b.addEventListener('click', () => {
          [...row.children].forEach((x) => x.classList.remove('right')); b.classList.add('right');
          if (o.onPick) o.onPick(i);
          c.feedback(fb, 'info', o.msgs[i]);
          if (!done) { done = true; pn.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: () => { pn.remove(); res(i); } }, o.next || 'Devam ›')); }
        });
        row.appendChild(b);
      });
      pn.append(row, fb);
    });
  }

  SCENES.push({
    title: 'Kare, köşegen ve sayı doğrusundaki delik',
    goal: 'Kenarı 1 olan karenin köşegeni var ama hiçbir kesirle yazılamaz: rasyoneller sayı doğrusunu doldurmuyor. R doğuyor.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      /* ---------- birim kare ---------- */
      const V = E('g', {}, root); op(V, 0);
      const uq = E('rect', { x: 90, y: 230, width: 160, height: 160, rx: 4, fill: 'rgba(108,140,240,.15)', stroke: 'var(--q)', 'stroke-width': 4 }, V);
      T(V, 170, 418, '1', 34, 'var(--q)', { bold: 700 }); T(V, 62, 310, '1', 34, 'var(--q)', { bold: 700 });
      const dgl = E('line', { x1: 90, y1: 390, x2: 250, y2: 230, stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '10 8' }, V);
      const dq = T(V, 225, 360, 'd = ?', 40, 'var(--irr)', { bold: 800 }); op(dq, 0);
      const sp = c.say('Kenarı bir birim olan bir kare düşün. Köşegeni kaç birim?', { ms: 3200, noWait: true });
      await fade(c, V, 1, 600);
      await c.tween(900, (e) => { dgl.setAttribute('stroke-dasharray', `${10 + 100 * e} ${8 - 8 * e}`); });
      dgl.removeAttribute('stroke-dasharray'); await fade(c, dq, 1, 400);
      await c.wait(2400);

      /* ---------- alan yöntemi ---------- */
      c.say('Alan yoluyla bakalım: dört birim kareyi 2×2 yan yana koy, kenar orta noktalarını birleştir: ortada yamuk duran bir kare çıkıyor.', { ms: 1000, noWait: true, speak: 'Alan yoluyla bakalım: dört birim kareyi iki çarpı iki yan yana koy, kenar orta noktalarını birleştir: ortada yamuk duran bir kare çıkıyor.' });
      const BIG = E('g', {}, root);
      const cells = [[400, 140], [560, 140], [400, 300], [560, 300]].map(([x, y]) => { const r = E('rect', { x, y, width: 160, height: 160, fill: 'rgba(108,140,240,.12)', stroke: 'var(--q)', 'stroke-width': 3 }, BIG); op(r, 0); return r; });
      for (const r of cells) { await fade(c, r, 1, 350); }
      await c.wait(900);
      const tris = [[[400, 140], [560, 140], [400, 300]], [[560, 140], [720, 140], [720, 300]], [[720, 300], [720, 460], [560, 460]], [[400, 300], [400, 460], [560, 460]]];
      const triEls = tris.map((tp) => { const pl = E('polygon', { points: tp.map((p2) => p2.join(',')).join(' '), fill: 'rgba(160,170,200,.28)', stroke: 'rgba(160,170,200,.5)', 'stroke-width': 2 }, BIG); op(pl, 0); return pl; });
      const half = tris.map((tp) => { const cx = (tp[0][0] + tp[1][0] + tp[2][0]) / 3, cy = (tp[0][1] + tp[1][1] + tp[2][1]) / 3; const tt = T(BIG, cx, cy, '½', 36, 'var(--ink)', { bold: 700 }); op(tt, 0); return tt; });
      const rot = E('polygon', { points: '560,140 720,300 560,460 400,300', fill: 'rgba(233,107,168,.38)', stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linejoin': 'round' }, BIG); op(rot, 0);
      const mids = [[560, 140], [720, 300], [560, 460], [400, 300]].map(([x, y]) => { const d2 = E('circle', { cx: x, cy: y, r: 9, fill: 'var(--irr)', stroke: '#0F1420', 'stroke-width': 2 }, BIG); op(d2, 0); return d2; });
      await par(...mids.map((m) => fade(c, m, 1, 400)));
      await fade(c, rot, 1, 800);
      await par(...triEls.map((t) => fade(c, t, 1, 500)), ...half.map((t) => fade(c, t, 1, 500)));
      // yamuk karenin bir kenarı = bir birim karenin köşegeni
      const dside = E('line', { x1: 560, y1: 140, x2: 720, y2: 300, stroke: 'var(--ink)', 'stroke-width': 7, 'stroke-linecap': 'round' }, BIG);
      await drawIn(c, dside, 600);
      const eqs = [['Büyük kare:  2 × 2 = 4', 200, 'var(--ink)'], ['4 köşe üçgeni:  4 · ½ = 2', 270, 'var(--ink)'], ['Yamuk kare:  4 − 2 = 2', 340, 'var(--irr)']];
      for (const [tx, ty, cl] of eqs) { const t = T(root, 770, ty, tx, 34, cl, { anchor: 'start', bold: 700 }); op(t, 0); await fade(c, t, 1, 450); await c.wait(900); }
      const fin = G(root, 770, 440); op(fin, 0);
      T(fin, 0, 0, 'Kenarı d  ⇒  d · d = 2', 42, 'var(--irr)', { anchor: 'start', bold: 800 });
      await fade(c, fin, 1, 600);
      await c.say('Bu karenin alanı 4’ün yarısı, yani <b>2</b>. Kenarı da bizim köşegenimiz: <b>d · d = 2</b>. Kendisiyle çarpılınca 2 veren sayı: karekök 2.', { ms: 6500, speak: 'Bu karenin alanı dörtten dört eksi iki, yani iki. Kenarı da bizim köşegenimiz: d çarpı d eşittir iki. Kendisiyle çarpılınca iki veren sayı: karekök iki.' });

      /* ---------- tahmin ---------- */
      await softChoice(c, {
        q: '<b>d’yi tam bir kesirle yazabilir miyiz?</b>', options: ['Evet, büyük bir kesir bulabiliriz', 'Hayır, hiçbir kesir olmaz', 'Bilmiyorum'],
        msgs: ['İşte tam da bunu deneyeceğiz (Sahne 11). Çok yakın kesirler bulunur ama hiçbiri tam eşit olmaz.', 'Doğru sezgi. Birazdan ondalık yaklaşımlarla bunu göreceğiz.', 'Sorun değil, birlikte bakacağız.'],
      });
      await par(fade(c, V, 0, 500), fade(c, BIG, 0, 500), ...[...root.children].filter((el) => el !== V && el !== BIG).map((el) => fade(c, el, 0, 500)));
      root.innerHTML = '';

      /* ---------- sayı doğrusuna taşı ---------- */
      const NLg = E('g', {}, root); op(NLg, 0);
      const nl = numLine(NLg, { y: 590, x0: 240, u: 300, a: 0, b: 3, size: 36, pad: 30, padR: 90 });
      const Rr = 300 * Math.SQRT2, cx0 = 240, cy0 = 590;
      const a0 = (50 * Math.PI) / 180;
      const sx = cx0 + Rr * Math.cos(a0), sy = cy0 - Rr * Math.sin(a0), ex = cx0 + Rr;
      await fade(c, NLg, 1, 500);
      c.say('Köşegenin uzunluğunu pergelle ölçüp 0’dan sağa yay çizelim.', { ms: 1000, noWait: true });
      const radius = E('line', { x1: cx0, y1: cy0, x2: sx, y2: sy, stroke: 'var(--irr)', 'stroke-width': 5, 'stroke-linecap': 'round' }, NLg);
      const dlab = T(NLg, (cx0 + sx) / 2 - 30, (cy0 + sy) / 2, 'd', 44, 'var(--irr)', { bold: 800 });
      op(radius, 0); op(dlab, 0); await par(fade(c, radius, 1, 500), fade(c, dlab, 1, 500));
      const arc = E('path', { d: `M${sx},${sy} A${Rr},${Rr} 0 0 1 ${ex},${cy0}`, fill: 'none', stroke: 'var(--irr)', 'stroke-width': 4, 'stroke-dasharray': '9 7', 'stroke-linecap': 'round' }, NLg);
      const pen = E('circle', { r: 11, fill: 'var(--irr)', stroke: '#0F1420', 'stroke-width': 2 }, NLg);
      await c.tween(1800, (e) => {
        const th = a0 * (1 - e); pen.setAttribute('cx', cx0 + Rr * Math.cos(th)); pen.setAttribute('cy', cy0 - Rr * Math.sin(th));
        arc.setAttribute('d', `M${sx},${sy} A${Rr},${Rr} 0 0 1 ${cx0 + Rr * Math.cos(th)},${cy0 - Rr * Math.sin(th)}`);
      });
      const hole = G(NLg, ex, cy0);
      const glow = E('circle', { r: 26, fill: 'var(--irr)', opacity: 0.35, filter: 'url(#blur6)' }, hole);
      E('circle', { r: 13, fill: 'none', stroke: 'var(--irr)', 'stroke-width': 4 }, hole);
      pen.remove(); await pop(c, hole, 1, 500);
      const dl = tag(NLg, ex + 20, cy0 - 150, 'd = √2', 38, 'var(--irr)'); const ll = E('line', { x1: ex, y1: cy0 - 28, x2: ex + 10, y2: cy0 - 128, stroke: 'var(--irr)', 'stroke-width': 2, opacity: 0.7 }, NLg);
      await c.say('Yay, doğruyu 1,41… civarında bir noktada kesiyor. Bu <b>√2</b>: sayı doğrusunda var, kimse inkâr edemez.', { ms: 4600, speak: 'Yay, doğruyu bir virgül kırk bir civarında bir noktada kesiyor. Bu karekök iki: sayı doğrusunda var, kimse inkâr edemez.' });
      // yakın kesirler
      const fracs = [[7, 5, 500], [17, 12, 690], [3, 2, 880]];
      const fg = E('g', {}, NLg);
      for (const [a, b, lx] of fracs) {
        const fx = 240 + 300 * (a / b), colr = 'var(--q)';
        E('line', { x1: fx, x2: fx, y1: 590 - 20, y2: 590 + 20, stroke: colr, 'stroke-width': 3 }, fg);
        E('line', { x1: fx, y1: 590 + 22, x2: lx, y2: 668 - 26, stroke: colr, 'stroke-width': 2, opacity: 0.8 }, fg);
        const fl = G(fg, lx, 676); fracG(fl, 0, 0, String(a), String(b), 26, colr);
        await c.wait(600);
      }
      await c.say('7/5, 17/12, 3/2… hepsi çok yakın ama <b>hiçbiri tam üstüne oturmuyor</b>. √2 için kesir bulamayacağız (Sahne 11’de deneyeceğiz).', { ms: 5600, speak: 'Yedi bölü beş, on yedi bölü on iki, üç bölü iki… hepsi çok yakın ama hiçbiri tam üstüne oturmuyor. Karekök iki için kesir bulamayacağız.' });
      await fade(c, NLg, 0, 500); NLg.remove();

      /* ---------- hangi kare düzgün kenarlı? ---------- */
      const SQ = E('g', {}, root); op(SQ, 0);
      T(SQ, 640, 52, 'Kare alanı  →  kenar uzunluğu', 40, 'var(--ink)', { bold: 700 });
      const areas = [1, 2, 3, 4];
      const sideTxt = { 1: '1', 2: '√2', 3: '√3', 4: '2' };
      const zonesS = [{ id: 'ok', x: 80, col: 'var(--ok)', label: 'kenarı düzgün sayı (kesir)', fill: 'rgba(61,220,151,.07)' }, { id: 'new', x: 670, col: 'var(--irr)', label: 'kenarı yeni sayı', fill: 'rgba(233,107,168,.08)' }];
      const zEls = zonesS.map((z) => {
        const g = G(SQ, 0, 0);
        const r = E('rect', { x: z.x, y: 400, width: 530, height: 270, rx: 24, fill: z.fill, stroke: z.col, 'stroke-width': 3, 'stroke-dasharray': z.id === 'new' ? '10 7' : null }, g);
        T(g, z.x + 265, 436, z.label, 30, z.col, { bold: 700 });
        return { ...z, g, el: r, n: 0, hit: (x, y) => x > z.x && x < z.x + 530 && y > 400 };
      });
      const sqItems = sh(areas).map((ar, i) => {
        const side = 80 * Math.sqrt(ar), xx = 200 + i * 290; const g = G(SQ, xx, 220);
        const hl = E('rect', { x: -side / 2 - 8, y: -side / 2 - 8, width: side + 16, height: side + 16, rx: 6, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, opacity: 0, filter: 'url(#blur3)' }, g); g._hl = hl;
        E('rect', { x: -side / 2, y: -side / 2, width: side, height: side, rx: 4, fill: 'rgba(108,140,240,.22)', stroke: 'var(--q)', 'stroke-width': 4, filter: 'url(#sh)' }, g);
        T(g, 0, 0, 'alan ' + ar, 28, 'var(--ink)', { bold: 700 });
        return { g, ar, side, home: { x: xx, y: 220, s: 1 }, id: 'sq' + ar, aria: 'alan ' + ar + ' olan kare' };
      });
      await fade(c, SQ, 1, 500);
      c.say('Alanı 1, 2, 3, 4 olan dört kare. Kenarlarını hangi kutuya koyarsın?', { ms: 1000, noWait: true });
      const pnS = c.panel('Sürükle', h('p', { class: 'q', html: 'Her karenin <b>kenar uzunluğu</b> düzgün bir sayı mı (kesir), yoksa yeni bir sayı mı? Kareyi kutuya sürükle.' }));
      const fbS = h('div'); pnS.appendChild(fbS);
      let leftS = 4, doneS; const pS = new Promise((r) => { doneS = r; });
      const sorterS = Sorter(c, svg, {
        items: sqItems, zones: zEls,
        onDrop: async (it, zid) => {
          const rootSq = Math.round(Math.sqrt(it.ar)); const perfect = rootSq * rootSq === it.ar;
          const truth = perfect ? 'ok' : 'new';
          if (zid !== truth) {
            if (it.ar === 4) c.feedback(fbS, 'no', 'Alan 4 olan karenin kenarı <b>2</b>; kök içi tam kare olduğu için √4 = 2 rasyoneldir (düzgün sayı).');
            else if (it.ar === 1) c.feedback(fbS, 'no', 'Alan 1 olan karenin kenarı <b>1</b>: √1 = 1, düzgün sayı.');
            else c.feedback(fbS, 'no', `Alan ${it.ar}: hiçbir kesir kendisiyle çarpılınca ${it.ar} vermez (${Math.sqrt(it.ar).toFixed(3).replace('.', ',')}… ne biter ne devreder). Kenar yeni bir sayı: <b>√${it.ar}</b>.`);
            return false;
          }
          const z = zEls.find((zz) => zz.id === zid); const k = z.n++;
          const sx2 = z.x + 130 + k * 260, sy2 = 560;
          const lab2 = T(SQ, sx2, sy2 + 78, 'kenar = ' + sideTxt[it.ar], 30, z.col, { bold: 700 }); op(lab2, 0); fade(c, lab2, 1, 600).catch(() => {});
          c.feedback(fbS, 'ok', `Doğru: alan ${it.ar} → kenar <b>${perfect ? '√' + it.ar + ' = ' + sideTxt[it.ar] : '√' + it.ar}</b>${perfect ? ' (kök içi tam kare)' : ' (tam kare değil)'}.`);
          leftS--; if (leftS <= 0) doneS();
          return { x: sx2, y: sy2 - 20, s: 0.8 };
        },
      });
      await withSkip(c, pS);
      pnS.remove();
      await c.say('<b>Kök içi tam kare ise sonuç düzgün bir sayı</b>: √1 = 1, √4 = 2. Alan 2 ve 3 olan karelerin kenarı ise hiçbir kesir değil.', { ms: 5200, speak: 'Kök içi tam kare ise sonuç düzgün bir sayı: karekök bir eşittir bir, karekök dört eşittir iki. Alanı iki ve üç olan karelerin kenarı ise hiçbir kesir değil.' });
      await fade(c, SQ, 0, 500); SQ.remove();

      /* ---------- R doğuyor ---------- */
      const RG = E('g', {}, root); op(RG, 0);
      const nl2 = numLine(RG, { y: 400, x0: 240, u: 300, a: 0, b: 3, size: 36, pad: 30, padR: 90 });
      const holes = [[Math.SQRT2, '√2'], [Math.sqrt(3), '√3'], [Math.PI, 'π']];
      const hX = holes.map(([v]) => nl2.X(v));
      // rasyonel noktalar (küçük, yoğun): her 1/24'te bir; deliklere yakın olanlar atlanır
      const dotsG = E('g', {}, RG);
      for (let k = 0; k <= 72; k++) {
        const v = k / 24; const x = nl2.X(v);
        if (hX.some((hx) => Math.abs(hx - x) < 7)) continue;
        E('circle', { cx: x, cy: 400, r: 4.5, fill: 'var(--q)', opacity: 0.9 }, dotsG);
      }
      await fade(c, RG, 1, 500);
      c.say('Rasyonel kutusu sonsuz kalabalık olsa bile, sayı doğrusunda <b>delikler</b> kalıyor: √2, √3, π…', { ms: 1000, noWait: true });
      const hol = holes.map(([v, nm], i) => { const g = G(RG, hX[i], 400); E('circle', { r: 22, fill: 'var(--irr)', opacity: 0.3, filter: 'url(#blur6)' }, g); E('circle', { r: 12, fill: '#0F1420', stroke: 'var(--irr)', 'stroke-width': 4 }, g); T(g, 0, -52, nm, 38, 'var(--irr)', { bold: 800 }); return g; });
      for (const g of hol) { await pop(c, g, 1, 450); await c.wait(450); }
      await c.say('O delikleri dolduran kutu: <b>gerçek sayılar</b>.', { ms: 2600 });
      // doğruyu doldur
      const fill = E('line', { x1: nl2.X(0) - 22, x2: nl2.X(0) - 22, y1: 400, y2: 400, stroke: 'var(--r)', 'stroke-width': 12, 'stroke-linecap': 'round', opacity: 0.85, filter: 'url(#blur3)' }, RG);
      await c.tween(1800, (e) => fill.setAttribute('x2', lerp(nl2.X(0) - 22, nl2.X(3) + 70, e)), ease.inOut);
      hol.forEach((g) => { g.firstChild.nextSibling && g.firstChild.nextSibling.setAttribute('fill', 'var(--r)'); });
      const rl = G(RG, 640, 230);
      rich(rl, 0, 0, 72, [{ t: 'R  =  ', col: 'var(--r)' }, { t: 'Q', col: 'var(--q)' }, { t: '  ∪  ' }, { t: 'Q′', col: 'var(--irr)' }]); op(rl, 0);
      await fade(c, rl, 1, 700);
      await c.say('Sayı doğrusunun her noktası bir reel sayı: <b>R = Q ∪ Q′</b>. Delik kalmadı.', { ms: 4200, speak: 'Sayı doğrusunun her noktası bir reel sayı: R, Q birleşim Q üssü. Delik kalmadı.' });
      // Merak kutusu (isteğe bağlı)
      const steps = [
        'Varsayalım √2 = <b>p/q</b> ve kesir sadeleşmiş olsun (p ile q ortak çarpansız).',
        'Karesini al: <b>p² = 2q²</b>. Demek ki p² çift, dolayısıyla <b>p çift</b>: p = 2k.',
        'Yerine koy: 4k² = 2q² ⇒ <b>q² = 2k²</b>. Yani q² çift, <b>q de çift</b>.',
        'p ve q ikisi de çift: ortak çarpan 2. Bu, “sadeleşmiş” varsayımıyla <b>çelişir</b>. O hâlde √2 hiçbir kesir değildir.',
      ];
      const mk = h('div', { class: 'panel' }, h('span', { class: 'tag explore' }, 'Merak kutusu (isteğe bağlı)'));
      const mkBody = h('p', { class: 'q', html: '√2 neden hiçbir kesir olamaz? 4 adımda bir bakış.' }); mk.appendChild(mkBody);
      let si = -1;
      const mkBtn = h('button', { class: 'lb go', onclick: () => { si++; if (si < steps.length) { mkBody.innerHTML = `<b>Adım ${si + 1}/4.</b> ${steps[si]}`; mkBtn.textContent = si < steps.length - 1 ? 'Sonraki adım ›' : 'Kapat'; } else { mk.remove(); } } }, 'Açılışı gör ›');
      mk.appendChild(mkBtn); c.act.appendChild(mk);
      c.note(`Kenarı 1 olan karenin köşegeni <b>√2</b>'dir (alanı 2 olan karenin kenarı). √2 sayı doğrusunda vardır ama <b>hiçbir kesirle yazılamaz</b>.<br><b>Q′ (irrasyonel):</b> kesir olarak yazılamayan reel sayılar. <b>R = Q ∪ Q′.</b><br><b>Kök içi tam kare ise sonuç rasyoneldir</b> (√4 = 2, √9 = 3); tam kare değilse irrasyoneldir (√2, √3, √5…).`, 'Köşegen ve R', 's10');
      await c.say('Merak edersen “Merak kutusu”nu aç; bir sonraki sahnede √2’yi ondalıklarla sıkıştıracağız.', { ms: 3200 });
    },
  });

  /* ================= SAHNE 11 — √2'nin ondalığı: hiç bitmeyen yaklaşım ================= */
  const decStrN = (n, k) => { const s2 = String(n).padStart(k + 1, '0'); return s2.slice(0, s2.length - k) + ',' + s2.slice(s2.length - k); };
  function sqDecN(n, k) { const sq = BigInt(n) * BigInt(n); const s2 = sq.toString().padStart(2 * k + 1, '0'); return s2.slice(0, s2.length - 2 * k) + ',' + s2.slice(s2.length - 2 * k); }
  const cmp2N = (n, k) => { const sq = BigInt(n) * BigInt(n); const two = 2n * 10n ** BigInt(2 * k); return sq < two ? -1 : sq > two ? 1 : 0; };
  function isqrtDigits(count) {
    const N = 2n * 10n ** BigInt(2 * count); let x = N, y = (x + 1n) / 2n;
    while (y < x) { x = y; y = (x + N / x) / 2n; }
    const s2 = x.toString(); return s2[0] + ',' + s2.slice(1);
  }
  function decApprox(a, b, k) { const inf = divInfo(a, b, k, false); return inf.ip + ',' + inf.steps.map((s2) => s2.dg).join('').padEnd(k, '0'); }

  SCENES.push({
    title: '√2’nin ondalığı: hiç bitmeyen yaklaşım',
    goal: '√2’yi ondalıklarla sıkıştır: ne biter ne devreder. Yaklaşık değer, değerin kendisi değildir.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const S2 = Math.SQRT2;
      const NS = [14, 141, 1414, 14142], KK = [1, 2, 3, 4];
      const lo = [1.0, 1.4, 1.41, 1.414, 1.4142], wd = [1, 0.1, 0.01, 0.001, 0.0001];
      const AX = 330, X0 = 160, XW = 960;
      let vLo = 1, vHi = 2;
      const AG = E('g', {}, root); op(AG, 0);
      E('line', { x1: 120, x2: 1160, y1: AX, y2: AX, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round' }, AG);
      const band = E('rect', { y: AX - 15, height: 30, rx: 8, fill: 'var(--irr)', 'fill-opacity': 0.5, stroke: 'var(--irr)', 'stroke-width': 2, opacity: 0 }, AG);
      const stg = lo.map((l0, s) => {
        const ticks = [];
        for (let i = 0; i <= 10; i++) {
          const tk = E('line', { y1: AX - 10, y2: AX + 10, stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round' }, AG);
          const lb = i % 2 === 0 ? T(AG, 0, AX + 40, '', 26, 'var(--ink)', { bold: 700 }) : null;
          if (lb) lb.textContent = (l0 + (i * wd[s]) / 10).toFixed(s + 1).replace('.', ',');
          ticks.push({ tk, lb, v: l0 + (i * wd[s]) / 10 });
        }
        return { ticks };
      });
      const pt = G(AG, 0, AX);
      E('circle', { r: 26, fill: 'var(--irr)', opacity: 0.35, filter: 'url(#blur6)' }, pt); E('circle', { r: 11, fill: 'var(--irr)', stroke: '#0F1420', 'stroke-width': 3 }, pt);
      const ptl = T(AG, 0, AX - 52, '√2', 40, 'var(--irr)', { bold: 800 });
      let bandRange = null;
      const X = (v) => X0 + ((v - vLo) / (vHi - vLo)) * XW;
      const render = () => {
        const W = vHi - vLo, lg = Math.log10(W);
        stg.forEach((st, s) => {
          const al = clamp(1 - Math.abs(lg + s), 0, 1);
          st.ticks.forEach((t, i) => {
            const x = X(t.v); const vis = al > 0.02 && x > 130 && x < 1150;
            t.tk.setAttribute('x1', x); t.tk.setAttribute('x2', x); t.tk.setAttribute('opacity', vis ? al : 0);
            if (t.lb) { t.lb.setAttribute('x', x); t.lb.setAttribute('opacity', vis ? al : 0); }
          });
        });
        put(pt, { x: X(S2) }); ptl.setAttribute('x', X(S2));
        if (bandRange) { const x1 = X(bandRange[0]), x2 = X(bandRange[1]); band.setAttribute('x', x1); band.setAttribute('width', Math.max(2, x2 - x1)); }
      };
      render();
      const zoom = async (s, ms) => {
        const lo0 = vLo, hi0 = vHi, lo1 = lo[s + 1], hi1 = lo[s + 1] + wd[s + 1];
        const r = (hi1 - lo1) / (hi0 - lo0); const ps = (lo1 - lo0 * r) / (1 - r);
        await c.tween(ms, (e) => { const re = Math.pow(r, e); vLo = ps + (lo0 - ps) * re; vHi = ps + (hi0 - ps) * re; render(); }, ease.inOut);
        vLo = lo1; vHi = hi1; render();
      };
      const head = T(root, 640, 70, '', 56, 'var(--ink)', { bold: 800 });
      const setHead = (s) => { head.textContent = `${decStrN(NS[s], KK[s])}  <  √2  <  ${decStrN(NS[s] + 1, KK[s])}`; };
      const cardsG = E('g', {}, root);
      const sqCards = async (s) => {
        cardsG.innerHTML = '';
        const n = NS[s], k = KK[s];
        const defs3 = [[n, '<', 'küçük', 'var(--ok)', 230], [n + 1, '>', 'büyük', 'var(--warn)', 740]];
        for (const [nn, sg, wd2, col, xx] of defs3) {
          const g = G(cardsG, xx, 470); card(g, 0, 0, 440, 130, { rx: 22, stroke: col }); op(g, 0);
          T(g, 220, 42, `${decStrN(nn, k)}²  =  ${sqDecN(nn, k)}`, 36, 'var(--ink)', { bold: 700 });
          T(g, 220, 94, `${sqDecN(nn, k)}  ${sg}  2   (${wd2})`, 34, col, { bold: 700 });
          fade(c, g, 1, 500).catch(() => {});
        }
        await c.wait(600);
      };
      await fade(c, AG, 1, 600);
      c.say('√2’yi sayı doğrusunda sıkıştıralım. Önce 1 ile 2 arasına bakalım.', { ms: 1000, noWait: true });
      await c.wait(1800);
      /* --- adım 1: bir basamak --- */
      bandRange = [lo[1], lo[1] + wd[1]]; setHead(0);
      await fade(c, band, 1, 500);
      await c.choice({
        tag: 'Tahmin et', q: '<b>1,4²</b> kaçtır? (hesap makinesi yok: 14 × 14 = ?)', options: ['1,96', '1,69', '2,16'], answer: 0,
        hints: ['', '1,4 × 1,4 = 14 × 14 = 196 → iki ondalık basamak → 1,96. (1,69 = 1,3² değil; 1,3² = 1,69)', '1,4 × 1,4 = 14 × 14 = 196 → iki ondalık basamak → <b>1,96</b>.'],
        right: 'Evet: 1,4² = 1,96 < 2. Aynı şekilde 1,5² = 2,25 > 2. √2 ikisinin arasında.', next: 'Sıkıştır ›',
      });
      await sqCards(0);
      await c.say('1,4’ün karesi 1,96; 1,5’in karesi 2,25. Demek ki <b>1,4 &lt; √2 &lt; 1,5</b>.', { ms: 3800, speak: 'Bir virgül dördün karesi bir virgül doksan altı; bir virgül beşin karesi iki virgül yirmi beş. Demek ki √2, bir virgül dört ile bir virgül beş arasında.' });
      for (let s = 1; s <= 3; s++) {
        cardsG.innerHTML = '';
        await zoom(s - 1, 1400);
        bandRange = [lo[s + 1], lo[s + 1] + wd[s + 1]]; setHead(s);
        await fade(c, band, 1, 300);
        await sqCards(s);
        if (s === 1) await c.say(`Bir basamak daha: <b>${decStrN(NS[1], 2)} &lt; √2 &lt; ${decStrN(NS[1] + 1, 2)}</b>. Yine arasında.`, { ms: 3000 });
        else if (s === 2) await c.say('Sıkıştırma devam ediyor: 1,414 ve 1,415; ardından 1,4142 ve 1,4143.', { ms: 3200 });
        else await c.say('Her adımda yeni bir rakam daha çıkıyor ve <b>hiçbir kalıp yok</b>.', { ms: 3200 });
      }
      await par(fade(c, AG, 0, 500), fade(c, cardsG, 0, 500), fade(c, head, 0, 500));
      AG.remove(); cardsG.remove(); head.remove();

      /* ---------- rakam makinesi ---------- */
      const DG = E('g', {}, root); op(DG, 0);
      T(DG, 640, 66, 'Rakam makinesi', 42, MUTED, { bold: 700 });
      const dig = isqrtDigits(34); // "1,4142…"
      const FSZ = 40, cwd = FSZ * 0.6; const left = 640 - (dig.length * cwd) / 2;
      T(DG, left - 30, 200, '√2 =', FSZ, 'var(--irr)', { anchor: 'end', bold: 800 });
      const dgs = [...dig].map((ch, i) => { const t = T(DG, left + i * cwd + cwd / 2, 200, ch, FSZ, ch === ',' ? 'var(--ink)' : 'var(--ink)', { mono: true, bold: 700 }); op(t, 0); return t; });
      // 1/7 şeridi
      T(DG, left - 30, 350, '1/7 =', FSZ, 'var(--q)', { anchor: 'end', bold: 800 });
      const s7 = '0,' + '142857'.repeat(5);
      const d7 = [...s7].map((ch, i) => { const t = T(DG, left + i * cwd + cwd / 2, 350, ch, FSZ, 'var(--ink)', { mono: true, bold: 700 }); op(t, 0); return t; });
      await fade(c, DG, 1, 500);
      c.say('Hesap makinesindeki 1,41421356…, kendisi değil, ilk birkaç basamağıdır. Rakamlar teker teker düşüyor, hiçbir yerde tekrar yok.', { ms: 1000, noWait: true });
      for (let i = 0; i < dgs.length; i++) { await c.tween(110, (e) => op(dgs[i], e), ease.linear); }
      await c.wait(600);
      c.say('Karşılaştır: 1/7’de 142857 bloğu sürekli tekrar ediyor.', { ms: 1000, noWait: true });
      for (let i = 0; i < d7.length; i++) { await c.tween(70, (e) => op(d7[i], e), ease.linear); }
      // devir halkaları
      for (let b = 0; b < 4; b++) {
        const x1 = left + (2 + b * 6) * cwd + 1, w2 = 6 * cwd - 2;
        const rr = E('rect', { x: x1, y: 350 - 30, width: w2, height: 60, rx: 18, fill: 'none', stroke: 'var(--q)', 'stroke-width': 3.5 }, DG); await drawIn(c, rr, 400);
      }
      const l1 = T(DG, 640, 490, '1/7  →  devreder  →  rasyonel', 40, 'var(--q)', { bold: 800 });
      const l2 = T(DG, 640, 570, '√2  →  ne biter ne devreder  →  irrasyonel', 40, 'var(--irr)', { bold: 800 }); op(l1, 0); op(l2, 0);
      await fade(c, l1, 1, 500); await c.wait(500); await fade(c, l2, 1, 500);
      await c.say('<b>Ne biten ne devreden</b> ondalık açılım → irrasyonel. Biten ya da devreden → rasyonel.', { ms: 4400 });
      await fade(c, DG, 0, 500); DG.remove();

      /* ---------- kesir avcıları ---------- */
      const HG = E('g', {}, root); op(HG, 0);
      T(HG, 640, 60, 'Kesir avcıları: karesi 2 olan kesri bul', 40, 'var(--ink)', { bold: 700 });
      const mach = G(HG, 640, 140);
      const mr = E('rect', { x: -330, y: 0, width: 660, height: 300, rx: 28, fill: 'rgba(108,140,240,.07)', stroke: 'var(--q)', 'stroke-width': 3, 'stroke-dasharray': '11 8' }, mach);
      T(mach, 0, 36, 'kare makinesi', 32, 'var(--q)', { bold: 700 });
      const out = E('g', {}, mach);
      T(out, 0, 160, 'kesri buraya sürükle', 30, MUTED, {});
      const hunters = [[3, 2], [7, 5], [17, 12], [41, 29], [99, 70]];
      const hItems = hunters.map(([a, b], i) => {
        const xx = 160 + i * 240, g = pill(HG, { k: 'q', n: a, d: b, color: 'var(--ink)' }, { x: xx, y: 590, size: 36, color: 'var(--ink)' });
        return { g, a, b, home: { x: xx, y: 590, s: 1 }, id: a + '/' + b, aria: a + '/' + b };
      });
      await fade(c, HG, 1, 500);
      const pnH = c.panel('Kesir avcısı', h('p', { class: 'q', html: 'En az <b>3 kesri</b> sürükleyip karesine bak. Karesi tam 2 olan var mı?' }));
      const fbH = h('div'); pnH.appendChild(fbH);
      const tried = new Set(); let doneH; const pH = new Promise((r) => { doneH = r; });
      Sorter(c, svg, {
        items: hItems, zones: [{ id: 'm', el: mr, hit: (x, y) => x > 310 && x < 970 && y > 140 && y < 440 }],
        onDrop: async (it) => {
          out.innerHTML = '';
          const a2 = it.a * it.a, b2 = it.b * it.b; const cmp = a2 < 2 * b2 ? -1 : a2 > 2 * b2 ? 1 : 0;
          const dec = terminates(a2, b2) ? decPlain(a2, b2) : '≈ ' + decApprox(a2, b2, 6);
          rich(out, 0, 120, 44, [{ t: '(' }, { frac: [String(it.a), String(it.b)] }, { t: ')²  =  ' }, { frac: [String(a2), String(b2)], col: 'var(--q)' }, { t: (terminates(a2, b2) ? '  =  ' : '  ') + dec }]);
          const cmpT = T(out, 0, 220, cmp < 0 ? `küçük:  < 2   (2’ye ulaşamadı)` : cmp > 0 ? `büyük:  > 2   (2’yi aştı)` : 'tam 2!', 38, cmp < 0 ? 'var(--ok)' : 'var(--warn)', { bold: 800 });
          out.setAttribute('transform', 'translate(0 0)');
          tried.add(it.id);
          c.feedback(fbH, 'info', `${a2} ile 2·${b2} = ${2 * b2} arasındaki fark ${Math.abs(a2 - 2 * b2)}: tam eşit olmuyor.`);
          if (tried.size >= 3) { c.feedback(fbH, 'ok', '<b>Hiçbir kesrin karesi tam 2 olmuyor.</b> (Bunun sebebi √2’nin kesir olmamasıdır.) Hepsini dene ya da devam et.'); doneH(); }
          return false;
        },
      });
      const rH = await withSkip(c, pH, 'Devam ›');
      pnH.remove();
      const hunt2 = T(HG, 640, 470, '99² = 9801 = 2 · 4900 + 1  →  bir fark hep kalıyor', 34, 'var(--warn)', { bold: 700 }); op(hunt2, 0); await fade(c, hunt2, 1, 600);
      await c.say('Özellikle 99² = 9801 = 2·4900 + 1: <b>bir fark kalıyor</b>. Daha iyi kesirler bulunur ama hiçbiri tam 2 vermez.', { ms: 4600, speak: 'Özellikle doksan dokuzun karesi dokuz bin sekiz yüz bir, yani iki çarpı dört bin dokuz yüz artı bir: bir fark kalıyor. Daha iyi kesirler bulunur ama hiçbiri tam iki vermez.' });
      await fade(c, HG, 0, 500); HG.remove();

      /* ---------- Doğru / Yanlış ---------- */
      const TF = E('g', {}, root); op(TF, 0);
      const stm = T(TF, 640, 250, '√2 = 1,414', 96, 'var(--ink)', { bold: 800 });
      const chk = T(TF, 640, 380, '', 44, 'var(--warn)', { bold: 700 });
      await fade(c, TF, 1, 500);
      await c.choice({
        tag: 'Doğru mu, yanlış mı?', q: '<b>√2 = 1,414</b>', options: ['Doğru', 'Yanlış'], answer: 1,
        hints: ['Doğru yazım: <b>√2 ≈ 1,414</b>. Tam eşitlik değil, çünkü 1,414² = 1,999396 ≠ 2.', ''],
        right: 'Yanlış, doğru yazım: <b>√2 ≈ 1,414</b>. Tam eşitlik değil, çünkü 1,414² = 1,999396 ≠ 2.', next: 'Devam ›',
        onPick: (i) => { chk.textContent = `1,414²  =  ${sqDecN(1414, 3)}  ≠  2`; if (i === 1) { stm.textContent = '√2 ≈ 1,414'; stm.style.fill = 'var(--ok)'; } else stm.style.fill = 'var(--err)'; },
      });
      await fade(c, TF, 0, 400); TF.remove();
      const fin = T(root, 640, 330, 'Yaklaşık değer, değerin kendisi değildir.', 46, 'var(--warn)', { bold: 800 }); op(fin, 0); await fade(c, fin, 1, 700);
      c.note(`<b>√2 = 1,41421356…</b> Ondalık açılımı <b>ne biter ne devreder</b>.<br>Ondalık açılımı <b>ne biten ne devreden</b> sayılar irrasyoneldir. Biten ya da devreden sayılar rasyoneldir.<br><b>Yaklaşık değer ≠ değerin kendisi:</b> √2 ≈ 1,414.`, '√2’nin ondalığı', 's11');
      await c.say('Yaklaşık değer, değerin kendisi değildir.', { ms: 3200 });
    },
  });

  /* ================= SAHNE 13 — Asiler ve R: irrasyonellerde kapalılık ================= */
  const sqT = (m, cf = 1) => ({ k: 'i', ty: 's', m, c: cf, txt: (cf < 0 ? MINUS : '') + (Math.abs(cf) === 1 ? '' : Math.abs(cf)) + '√' + m, val: cf * Math.sqrt(m) });
  const piT = (cf = 1) => ({ k: 'i', ty: 'p', c: cf, txt: (cf < 0 ? MINUS : '') + (Math.abs(cf) === 1 ? '' : Math.abs(cf)) + 'π', val: cf * Math.PI });
  const sqFree = (m) => { let s2 = 1; for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; s2 *= f; } return [s2, m]; };
  const fmtV = (v) => v.toFixed(4).replace('.', ',').replace(/,?0+$/, '');
  function irrOp(a, o2, b) {
    const sameBase = a.ty === b.ty && (a.ty === 'p' || a.m === b.m);
    if (o2 === '+' || o2 === MINUS) {
      const sg = o2 === '+' ? 1 : -1;
      if (sameBase) {
        const sc = a.c + sg * b.c; if (sc === 0) return q(0);
        return a.ty === 's' ? sqT(a.m, sc) : piT(sc);
      }
      return { k: 'i', ty: 'g', txt: `${a.txt} ${o2} ${b.c < 0 && sg > 0 ? '(' + b.txt + ')' : b.txt}`, val: a.val + sg * b.val };
    }
    if (o2 === '×') {
      if (a.ty === 's' && b.ty === 's') {
        const [s2, t] = sqFree(a.m * b.m); const cf = a.c * b.c * s2;
        return t === 1 ? q(cf) : sqT(t, cf);
      }
      if (a.ty === 'p' && b.ty === 'p') return { k: 'i', ty: 'g', txt: 'π²' , val: a.val * b.val };
      return { k: 'i', ty: 'g', txt: `${a.txt}·${b.txt}`, val: a.val * b.val };
    }
    if (o2 === '÷') {
      if (a.ty === 'p' && b.ty === 'p') return q(a.c, b.c);
      if (a.ty === 's' && b.ty === 's') {
        const [s2, t] = sqFree(a.m * b.m);
        if (t === 1) return q(a.c * s2, b.c * b.m);
        return { k: 'i', ty: 'g', txt: `${a.txt}/${b.txt}`, val: a.val / b.val };
      }
      return { k: 'i', ty: 'g', txt: `${a.txt}/${b.txt}`, val: a.val / b.val };
    }
  }
  const valStr = (t) => (t.k === 'i' ? '≈ ' + t.val.toFixed(4).replace('.', ',') : lab(t));

  SCENES.push({
    title: 'Asiler ve R: irrasyonellerde kapalılık',
    goal: 'Q′ toplama ve çarpmada kapalı değildir; R = Q ∪ Q′ dört işlemde kapalıdır. İrrasyoneller az değildir.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { s: 1, tx: 0, ty: 0, band: true }); op(mat.root, 0);
      ['N', 'Z', 'Q', 'R'].forEach((k) => mat.lit(k));
      mat.band.setAttribute('fill-opacity', 0.14);
      await fade(c, mat.root, 1, 600);
      const asi = [sqT(2), sqT(3), piT()];
      const asiP = asi.map((t, i) => { const [sx, sy] = mat.slot('Qp'); const p = pill(root, t, { x: sx, y: sy, size: 30 }); put(p, { s: 0.001 }); return p; });
      for (const p of asiP) { await pop(c, p, 0.9, 350); }
      mat.pulse('Qp', 'var(--irr)', 2, 300);
      await c.say('Asi sayıların kendi kutusu var mı? <b>Q′</b>: rasyonellerin dışında, gerçek sayıların içinde kalan kesikli bant.', { ms: 4600, speak: 'Asi sayıların kendi kutusu var mı? Q üssü: rasyonellerin dışında, gerçek sayıların içinde kalan kesikli bant.' });
      c.say('Hayır: çünkü iki asiyi toplayınca ya da çarpınca kutuyu terk edebilirler.', { ms: 1000, noWait: true });

      /* --- kapı düzeni --- */
      await par(mat.tweenTo(GL, 1200), ...asiP.map((p, i) => fade(c, p, 0, 500)));
      asiP.forEach((p) => p.remove()); mat.used = {};
      mat.chip.R._name.setAttribute('opacity', 0);
      const gate = Gate(c, root, mat, { key: 'Qp' }); op(gate.g, 0);
      const tbl = Tbl(c, root, { ...TBL_POS, ch: 62, rows: ['N', 'Z', 'Q', 'Qp', 'R'], cols: OPS }); op(tbl.g, 0);
      const pre = { N: ['v', 'x', 'v', 'x'], Z: ['v', 'v', 'v', 'x'], Q: ['v', 'v', 'v', 'v'] };
      Object.entries(pre).forEach(([r, arr]) => OPS.forEach((o2, j) => tbl.set(r, o2, arr[j], false)));
      OPS.forEach((o2) => { tbl.set('Qp', o2, '?', false); tbl.set('R', o2, 'lock', false); });
      await par(fade(c, gate.g, 1, 600), fade(c, tbl.g, 1, 600));
      mat.band.setAttribute('fill-opacity', 0.18);
      const evG = E('g', {}, root);
      const doRun = async (a, o2, b, tokRes) => {
        await gate.load(a, o2, b);
        const r0 = tokRes !== undefined ? tokRes : irrOp(a, o2, b);
        return { r0 };
      };
      /* --- iki hazır deneme --- */
      const auto = [[sqT(2), '+', sqT(2, -1), '+', '√2 + (−√2) = 0'], [sqT(2), '×', sqT(2), '×', '√2 · √2 = 2']];
      for (const [a, o2, b, col, txt] of auto) {
        await gate.load(a, o2, b);
        const r0 = irrOp(a, o2, b);
        await c.cont('Test et ›');
        const res = await gate.run(r0, { no: 'Q′ bu işlemde kapalı değil' });
        tbl.set('Qp', o2, 'x');
        await c.say(`<b>${txt}</b>: sonuç rasyonel (0 ∈ Z ⊂ Q, 2 ∈ N). Karşı örnek bulundu: <b>Q′ bu işlemde kapalı değil</b>.`, { ms: 3800, speak: txt === '√2 + (−√2) = 0' ? 'Karekök iki artı eksi karekök iki eşittir sıfır: sonuç rasyonel. Karşı örnek bulundu: Q üssü, toplamada kapalı değil.' : 'Karekök iki çarpı karekök iki eşittir iki: sonuç rasyonel. Karşı örnek bulundu: Q üssü, çarpmada kapalı değil.' });
      }

      /* --- öğrenci: karşı örnek bulma --- */
      const pn = c.panel('Karşı örnek ara');
      const toks = [sqT(2), sqT(3), piT(), sqT(2, -1), piT(-1)];
      const st = { A: null, B: null, op: '+', busy: false };
      const sumEl = h('span', { style: { margin: '0 8px', fontSize: '1.05rem' } }); const goBtn = h('button', { class: 'lb go', onclick: () => run() }, 'Test et ›');
      const trayRow = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'Sayılar'));
      const opRow = h('div', { class: 'rowc' }, h('span', { class: 'lbl' }, 'İşlem'));
      const sumF = () => { sumEl.innerHTML = `<b>${st.A ? st.A.txt : '□'}</b> ${st.op} <b>${st.B ? st.B.txt : '□'}</b>`; };
      toks.forEach((t) => trayRow.append(h('button', { class: 'lb', html: t.txt === '√2' ? M.sqrt(2) : t.txt === '√3' ? M.sqrt(3) : t.txt === MINUS + '√2' ? MINUS + M.sqrt(2) : t.txt, onclick: () => { if (st.busy) return; if (!st.A || st.B) { st.A = t; st.B = null; } else st.B = t; sumF(); } })));
      const opBs = {};
      OPS.forEach((o2) => { const b = h('button', { class: 'lb' + (o2 === '+' ? ' on' : ''), onclick: () => { st.op = o2; Object.values(opBs).forEach((x) => x.classList.remove('on')); b.classList.add('on'); sumF(); } }, o2); opBs[o2] = b; opRow.append(b); });
      opRow.append(sumEl, goBtn);
      const fb = h('div');
      pn.append(h('p', { class: 'q', html: 'Kapı <b>Q′</b> seçili. İki <b>irrasyonel</b> sayı ve bir işlem seç; sonucu bak. Amaç: <b>karşı örnek</b> bul. Kalan − ve ÷ hücrelerini kırmızı yap.' }), trayRow, opRow, fb);
      sumF();
      const redDone = { '+': true, '×': true, [MINUS]: false, '÷': false };
      let doneRes; const donep = new Promise((r) => { doneRes = r; });
      const run = async () => {
        if (st.busy) return;
        if (!st.A || !st.B) { c.feedback(fb, 'info', 'Önce iki irrasyonel sayı seç (A ve B).'); return; }
        st.busy = true; goBtn.disabled = true;
        const a = st.A, o2 = st.op, b = st.B;
        try {
          await gate.load(a, o2, b);
          const r0 = irrOp(a, o2, b);
          const res = await gate.run(r0, { ok: valStr(r0) });
          if (!res.ok) {
            c.feedback(fb, 'ok', `<b>Karşı örnek bulundu:</b> ${a.txt} ${o2} ${b.txt} = ${lab(r0)} ∈ ${LET[smallest(r0)]}. Q′ bu işlemde kapalı değil.`);
            if (!redDone[o2]) { redDone[o2] = true; await tbl.set('Qp', o2, 'x'); }
            if (Object.values(redDone).every(Boolean)) doneRes('done');
          } else {
            c.feedback(fb, 'info', `Bu seferki irrasyonel çıktı (${r0.txt} ${valStr(r0)}) ama <b>tek örnek kapalılığı kanıtlamaz</b>. Başka çift dene: √2 ile −√2.`);
          }
        } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; return; }
        st.busy = false; goBtn.disabled = false;
      };
      await withSkip(c, donep, 'Atla ›');
      st.busy = true; pn.remove();
      for (const o2 of OPS) if (tbl.cells['Qp|' + o2].state !== 'x') await tbl.set('Qp', o2, 'x');
      await gate.clear();
      await c.say('Q′ dört işlemde de <b>kapalı değil</b>: √2 + (−√2) = 0, √2 · √2 = 2, √2 − √2 = 0, √2 ÷ √2 = 1.', { ms: 4400, speak: 'Q üssü dört işlemde de kapalı değil: karekök iki artı eksi karekök iki sıfır, karekök iki çarpı karekök iki iki, karekök iki eksi karekök iki sıfır, karekök iki bölü karekök iki bir.' });
      await c.choice({
        tag: 'Tahmin et', q: 'İki irrasyonelin çarpımı <b>her zaman</b> irrasyonel midir?', options: ['Evet', 'Hayır'], answer: 1,
        hints: ['√2 · √2 = 2 rasyonel! Tek karşı örnek yetti.', ''], right: 'Hayır: √2 · √2 = 2. Tek karşı örnek yeter.', next: 'Devam ›',
      });

      /* --- R tamamlama --- */
      c.say('Ama rasyonellerle birlikte tam bir takım oluşturuyorlar: <b>gerçek sayılar</b>.', { ms: 1000, noWait: true });
      mat.glow('R', 0.6, 'var(--r)'); mat.glow('Qp', 0.6, 'var(--irr)');
      await mat.pulse('R', 'var(--r)', 2, 400);
      const un = G(root, 415, 175);
      rich(un, 0, 0, 44, [{ t: 'R  =  ', col: 'var(--r)' }, { t: 'Q', col: 'var(--q)' }, { t: '  ∪  ' }, { t: 'Q′', col: 'var(--irr)' }]);
      const un2 = T(root, 415, 232, 'Q ∩ Q′ = ∅', 36, 'var(--ink)', { bold: 700 });
      for (const o2 of OPS) { await tbl.set('R', o2, 'v'); }
      const rnote = G(root, 0, 0); T(rnote, TBL_POS.x + 20, 580, 'R’de dört işlem yeşil', 28, 'var(--ok)', { anchor: 'start', bold: 700 }); T(rnote, TBL_POS.x + 20, 618, '(0’a bölme hariç)', 26, 'var(--ok)', { anchor: 'start', bold: 600 });
      await c.say('<b>R = Q ∪ Q′</b> ve Q ∩ Q′ = ∅. R’de dört işlem de yeşil; sayı doğrusunda delik kalmadı, her işlem sonucu doğru üzerinde bir noktadır.', { ms: 6200, speak: 'R, Q birleşim Q üssü ve Q kesişim Q üssü boş küme. R kümesinde dört işlem de yeşil; sayı doğrusunda delik kalmadı, her işlem sonucu doğru üzerinde bir noktadır.' });
      mat.glow('R', 0, 'var(--r)'); mat.glow('Qp', 0, 'var(--irr)');
      await par(fade(c, un, 0, 400), fade(c, un2, 0, 400), fade(c, rnote, 0, 400), fade(c, gate.g, 0, 400), fade(c, tbl.g, 0, 400), fade(c, mat.root, 0.1, 500));

      /* --- rasyonel + irrasyonel --- */
      const RI = E('g', {}, root); op(RI, 0);
      const dg = isqrtDigits(11); const cwd = 40 * 0.6;
      const mkRow = (y, label, str, col) => { const g = E('g', {}, RI); T(g, 330, y, label, 40, 'var(--ink)', { anchor: 'end', bold: 800 }); T(g, 350, y, str, 40, col || 'var(--ink)', { anchor: 'start', mono: true, bold: 700 }); return g; };
      const tail = dg.slice(2);
      mkRow(190, '√2  =', '1,' + tail + '…', 'var(--ink)');
      const r2 = mkRow(280, '1 + √2  =', '2,' + tail + '…', 'var(--irr)');
      const r3 = mkRow(370, '2√2  =', (2 * Math.SQRT2).toFixed(7).replace('.', ',') + '…', 'var(--ink)');
      op(r2, 0); op(r3, 0);
      await fade(c, RI, 1, 500);
      c.say('1 + √2 yazarsak, √2’nin ondalık kısmı aynen kalır: hâlâ devretmiyor.', { ms: 1000, noWait: true });
      await c.wait(1200); await fade(c, r2, 1, 600); await c.wait(1500); await fade(c, r3, 1, 600);
      const rule = T(RI, 640, 500, 'Rasyonel + irrasyonel  →  her zaman irrasyonel', 40, 'var(--irr)', { bold: 800 });
      const rule2 = T(RI, 640, 560, 'Sıfırdan farklı rasyonel × irrasyonel  →  irrasyonel', 36, 'var(--irr)', { bold: 700 }); op(rule, 0); op(rule2, 0);
      await fade(c, rule, 1, 500); await fade(c, rule2, 1, 500);
      await c.say('<b>Rasyonel + irrasyonel her zaman irrasyoneldir</b>; sıfırdan farklı rasyonel × irrasyonel de.', { ms: 4400 });
      await fade(c, RI, 0, 500); RI.remove();

      /* --- asiler az mı? --- */
      const SG = E('g', {}, root); op(SG, 0);
      T(SG, 640, 66, 'Asiler az mı?  √1 … √20', 42, 'var(--ink)', { bold: 700 });
      const sq20 = [];
      for (let i = 1; i <= 20; i++) {
        const r = Math.round(Math.sqrt(i)); const rat = r * r === i;
        const col = (i - 1) % 10, row = Math.floor((i - 1) / 10);
        const g = pill(SG, { k: 'x', txt: '√' + i, color: 'var(--ink)' }, { x: 120 + col * 120, y: 200 + row * 100, size: 32, color: 'var(--ink)' });
        sq20.push({ g, rat, i }); put(g, { s: 0.001 });
      }
      await fade(c, SG, 1, 300);
      c.say('√1’den √20’ye kadar bakalım: hangileri rasyonel?', { ms: 1000, noWait: true });
      for (const it of sq20) { pop(c, it.g, 1, 200); await c.wait(70); }
      await c.wait(900);
      for (const it of sq20) { it.g.setCol(it.rat ? 'var(--ok)' : 'var(--irr)'); if (it.rat) { const rr = Math.round(Math.sqrt(it.i)); T(it.g, 0, 44, '= ' + rr, 24, 'var(--ok)', { bold: 700 }); } else it.g._body.setAttribute('stroke-dasharray', '8 5'); await c.wait(100); }
      const ratN = sq20.filter((x) => x.rat).length, irrN = 20 - ratN;
      const cnt = T(SG, 640, 410, `${ratN} rasyonel  ·  ${irrN} irrasyonel`, 52, 'var(--ink)', { bold: 800 }); op(cnt, 0); await fade(c, cnt, 1, 600);
      const zoomT = T(SG, 640, 500, '1,41 ile 1,42 arasında √2 (irrasyonel) var;  1,414 ile 1,415 arasında da kesirler var.', 30, MUTED, {}); op(zoomT, 0); await fade(c, zoomT, 1, 600);
      const eachT = T(SG, 640, 560, 'Her aralıkta ikisi de bulunur.', 38, 'var(--warn)', { bold: 800 }); op(eachT, 0); await fade(c, eachT, 1, 600);
      await c.say(`Tam kareler (√1, √4, √9, √16) rasyonel; geri kalan <b>${irrN}</b> tanesi irrasyonel. İki rasyonelin arasında hep bir irrasyonel, iki irrasyonelin arasında hep bir rasyonel var: irrasyoneller <b>az değil</b>.`, { ms: 7000, speak: `Tam kareler rasyonel; geri kalan ${irrN} tanesi irrasyonel. İki rasyonelin arasında hep bir irrasyonel, iki irrasyonelin arasında hep bir rasyonel var: irrasyoneller az değil.` });
      c.note(`<b>Q′ toplama ve çarpmada (ve çıkarma, bölmede) kapalı değildir:</b> √2 + (−√2) = 0 ; √2 · √2 = 2.<br><b>R = Q ∪ Q′ ; Q ∩ Q′ = ∅.</b> R dört işlemde kapalıdır (0’a bölme hariç).<br>İrrasyoneller az değildir: her iki rasyonelin arasında irrasyonel, her iki irrasyonelin arasında rasyonel vardır. <b>Rasyonel + irrasyonel = irrasyonel.</b>`, 'Q′ ve R', 's13');
    },
  });

  /* ================= SAHNE 14 — Büyük sınıflandırma ================= */
  SCENES.push({
    title: 'Büyük sınıflandırma: hangi kutuya girer?',
    goal: 'Her sayıyı “en küçük kutuya” yerleştir. Bazıları kılık değiştirmiş: sadeleştir, sonra karar ver.',
    run: async (c) => {
      const svg = newSvg(c); const root = E('g', {}, svg);
      const mat = Mat(c, svg, root, { s: 1, tx: 0, ty: 0, band: true }); op(mat.root, 0);
      ['N', 'Z', 'Q', 'R'].forEach((k) => mat.lit(k));
      mat.band.setAttribute('fill-opacity', 0.1);
      const notes = { N: 'sayma sayıları', Z: 'eksi sayılar da', Q: 'kesirler', R: 'Q′ = kesikli bant' };
      KEYS.forEach((k) => { const nm = mat.chip[k]._name; nm.textContent = notes[k]; nm.setAttribute('opacity', 1); nm.setAttribute('font-size', 22); });
      const qtag = tag(root, 100, 196, 'Q′', 30, 'var(--irr)');
      await fade(c, mat.root, 1, 600);
      c.say('Son görev: sayıları en küçük kutularına yerleştir. Ama dikkat, bazıları <b>kılık değiştirmiş</b>.', { ms: 1000, noWait: true });
      // skor
      const scoreG = G(root, 1190, 50);
      const scoreT = T(scoreG, 0, 0, '0/10', 40, 'var(--ink)', { bold: 800 });
      E('rect', { x: -70, y: 30, width: 140, height: 10, rx: 5, fill: 'rgba(255,255,255,.12)' }, scoreG);
      const bar = E('rect', { x: -70, y: 30, width: 0, height: 10, rx: 5, fill: 'var(--ok)' }, scoreG);
      const D = (parts) => ({ k: 'x', dec: parts, color: 'var(--ink)' });
      const T0 = (txt, sz) => ({ k: 'x', txt, color: 'var(--ink)' });
      const cards = [
        { id: '0', tok: T0('0'), truth: 'N', reason: '0 doğal sayıdır (0 ∈ N).', scene: 'S2, S5', w: {} },
        { id: '-7', tok: T0(MINUS + '7'), truth: 'Z', reason: 'Eksi tam sayı: Z’de, N’de değil.', scene: 'S3', w: { N: '−7 eksi bir sayı; N’de eksi sayı yok.', Qp: '−7 = −7/1 bir kesir; irrasyonel olamaz.' } },
        { id: '12/4', tok: { k: 'x', fn: '12', fd: '4', color: 'var(--ink)' }, truth: 'N', reason: '12 ÷ 4 = 3 → bir doğal sayıdır. Kılık değiştirmiş!', scene: 'S4', wide: '12/4 = 3 ∈ N', w: { Qp: '12/4 = 3 bir kesir olarak yazılabiliyor; irrasyonel olamaz.' } },
        { id: '0,25', tok: T0('0,25'), truth: 'Q', reason: '0,25 = 1/4: biten ondalık → rasyonel; tam sayı değil.', scene: 'S7', w: { N: '0,25 tam sayı değil; N’de yok.', Z: '0,25 tam sayı değil; Z’de yok.', Qp: '0,25 = 1/4 bir kesir → rasyonel.' } },
        { id: '0,3d', tok: D([{ t: '0,' }, { t: '3', over: true }]), truth: 'Q', reason: 'Devreden ondalık: 0,3̅ = 1/3 → rasyonel.', scene: 'S8', w: { N: '0,3̅ = 1/3 tam sayı değil.', Z: '0,3̅ = 1/3 tam sayı değil.', Qp: 'Devreden ondalık irrasyonel olmaz: 0,3̅ = 1/3 bir kesirdir.' } },
        { id: 'm8/2', tok: { k: 'x', fn: MINUS + '8', fd: '2', color: 'var(--ink)' }, truth: 'Z', reason: '−8 ÷ 2 = −4 → bir tam sayıdır. Kılık değiştirmiş!', scene: 'S3–S4', wide: '−8/2 = −4 ∈ Z', w: { N: '−8/2 = −4 eksi bir sayı; N’de eksi sayı yok.', Qp: '−8/2 = −4 bir kesir olarak yazılabiliyor; irrasyonel olamaz.' } },
        { id: 'sqrt9', tok: T0('√9'), truth: 'N', reason: '√9 = 3 → doğal sayı. Kök içi tam kare.', scene: 'S9', wide: '√9 = 3 ∈ N', w: { Qp: '√9 = 3 irrasyonel olamaz; 3 = 3/1.' } },
        { id: '22/7', tok: { k: 'x', fn: '22', fd: '7', color: 'var(--ink)' }, truth: 'Q', reason: '22/7 = 3,142857…: devreden → rasyonel.', scene: 'S7–S8', w: { N: '22/7 tam sayı değil.', Z: '22/7 tam sayı değil.', Qp: '22/7 bir kesir: kesir olarak yazılan sayı rasyoneldir.' } },
        { id: 'sqrt2', tok: T0('√2'), truth: 'Qp', reason: 'Ondalık açılımı ne biter ne devreder: irrasyonel.', scene: 'S9–S10', w: {}, wAny: '√2’nin ondalığı ne biter ne devreder: hiçbir kesir değil → Q′.' },
        { id: 'pi', tok: T0('π'), truth: 'Qp', reason: 'π ≈ 3,14159265…: ne biter ne devreder: irrasyonel.', scene: 'S10', w: {}, wAny: 'π ≈ 3,14159265… ne biter ne devreder → Q′.' },
      ];
      const bonus = [
        { id: 'm16', tok: T0(MINUS + '√16'), truth: 'Z', reason: '√16 = 4 → −√16 = −4 ∈ Z.', scene: 'S9', w: { N: '−4 eksi bir sayı: N’de değil.', Qp: '√16 = 4 olduğundan −√16 = −4 tam sayıdır.' } },
        { id: 'rq', tok: T0('√(1/4)'), truth: 'Q', reason: '√(1/4) = 1/2 → rasyonel.', scene: 'S9', w: { N: '√(1/4) = 1/2 tam sayı değil.', Z: '√(1/4) = 1/2 tam sayı değil.', Qp: '√(1/4) = 1/2 bir kesir → rasyonel.' } },
        { id: 'lw', tok: T0('0,101001…'), truth: 'Qp', reason: '0,101001000100001… biçiminde aralardaki sıfırlar her seferinde artıyor: kalıp var ama devreden bir blok yok → irrasyonel.', scene: 'S8', w: {}, wAny: 'Kalıp var ama devreden bir blok yok; ne biter ne devreder → Q′.' },
      ];
      const valid = { N: ['N', 'Z', 'Q'], Z: ['Z', 'Q'], Q: ['Q'], Qp: ['Qp'] };
      const mkItems = (list, y, xs, size) => list.map((cd, i) => { const g = pill(root, cd.tok, { x: xs[i], y, size }); put(g, { s: 0.001 }); return { g, cd, id: cd.id, home: { x: xs[i], y, s: 1 }, aria: cd.id }; });
      const xs10 = sh([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).map((k) => k); // karışık sıra
      const order = [3, 8, 0, 6, 1, 9, 4, 2, 7, 5];
      const items = mkItems(order.map((k) => cards[k]), 672, order.map((_, i) => 100 + i * 120), 28);
      for (const it of items) { pop(c, it.g, 1, 250); await c.wait(90); }
      const zones = ['N', 'Z', 'Q', 'Qp'].map((k) => ({ id: k, el: k === 'Qp' ? mat.box.R : mat.box[k], hit: (x, y) => regionAt(x, y) === k }));
      const pn = c.panel('Sürükle', h('p', { class: 'q', html: 'Sayıyı <b>en küçük kutuya</b> sürükle (ya da sayıya, sonra kutuya dokun): <b>N</b>, <b>Z</b>, <b>Q</b> ya da kesikli <b>Q′</b> bandı.' }));
      const fb = h('div'); pn.appendChild(fb);
      let score = 0, placed = 0; const total = items.length; const first = {}; const wrongCards = [];
      let doneRes; const donep = new Promise((r) => { doneRes = r; });
      const updScore = () => { scoreT.textContent = `${score}/10`; bar.setAttribute('width', 140 * (score / 10)); };
      const handler = (scored) => async (it, zid) => {
        const cd = it.cd; const ok = zid === cd.truth;
        if (!ok && valid[cd.truth].includes(zid)) {
          c.feedback(fb, 'info', `<b class="warn">Doğru ama daha küçük bir kutu var:</b> ${cd.wide || cd.reason}`);
          const [sx, sy] = mat.slot(cd.truth);
          mat.pulse(zid, 'var(--warn)', 1, 350);
          if (first[cd.id] === undefined) first[cd.id] = true;
          if (scored) { if (first[cd.id]) score++; updScore(); placed++; if (placed >= total) doneRes(); }
          await mv(c, it.g, it.g._p.x, it.g._p.y, 10); 
          it.g.setCol(COLV[cd.truth]);
          return { x: sx, y: sy, s: Math.min(0.9, 112 / it.g._w) };
        }
        if (!ok) {
          first[cd.id] = false; if (!wrongCards.includes(cd)) wrongCards.push(cd);
          c.feedback(fb, 'no', (cd.w && cd.w[zid]) || cd.wAny || cd.reason);
          mat.pulse(zid, 'var(--err)', 1, 250).catch(() => {});
          await shake(c, root, 6, 280);
          return false;
        }
        if (first[cd.id] === undefined) first[cd.id] = true;
        const [sx, sy] = mat.slot(cd.truth);
        c.feedback(fb, 'ok', `<b>Doğru.</b> ${cd.reason}`);
        mat.pulse(zid, 'var(--ok)', 1, 350).catch(() => {});
        it.g.setCol(COLV[cd.truth]);
        if (scored) { if (first[cd.id]) score++; updScore(); placed++; if (placed >= total) doneRes(); }
        return { x: sx, y: sy, s: Math.min(0.9, 112 / it.g._w) };
      };
      const sorter = Sorter(c, svg, { items, zones, onDrop: handler(true) });
      const r = await withSkip(c, donep);
      if (r === 'skip') {
        scoreT.textContent = '—';
        for (const it of items) if (!it.placed) { const [sx, sy] = mat.slot(it.cd.truth); it.g.setCol(COLV[it.cd.truth]); mv(c, it.g, sx, sy, 600, ease.inOut, { s: 0.9 }); it.placed = true; }
        await c.wait(700);
      }
      pn.remove();
      // sonuç
      const rg = G(root, 640, 330); op(rg, 0);
      const good = r === 'skip' ? true : score >= 8;
      card(rg, -310, -105, 620, 210, { rx: 28, stroke: good ? 'var(--ok)' : 'var(--warn)' });
      T(rg, 0, -50, good ? '★  Kutu ustası  ★' : 'Biraz daha çalış', 52, good ? 'var(--ok)' : 'var(--warn)', { bold: 800 });
      T(rg, 0, 12, r === 'skip' ? 'Cevaplar yerleştirildi' : `${score} / 10 doğru yerleştirme`, 38, 'var(--ink)', { bold: 700 });
      T(rg, 0, 64, good ? 'Sınıflandırmayı tamamladın!' : 'Aşağıdaki sahnelere tekrar bak.', 28, MUTED, {});
      await fade(c, rg, 1, 600);
      if (!good && wrongCards.length) {
        const sc2 = [...new Set(wrongCards.map((x) => x.scene))].join(', ');
        c.feedback(fb, 'info', `Tekrar için: <b>${sc2}</b>. (Kılık değiştirenler: 12/4, −8/2, √9.)`);
        c.act.appendChild(h('div', { class: 'fb info', html: `İpucu sahneleri: <b>${sc2}</b>` }));
      }
      await c.say(good ? 'Harika! Kılık değiştiren sayıları da yakaladın.' : 'Küçük bir tekrarla bu kutular oturur.', { ms: 2600 });
      await fade(c, rg, 0, 500); rg.remove();
      // bonus
      const bx = [310, 640, 970];
      const itemsB = mkItems(bonus, 672, bx, 24);
      for (const it of itemsB) { pop(c, it.g, 1, 250); await c.wait(120); }
      const pnB = c.panel('Bonus', h('p', { class: 'q', html: '<b>Bonus (puansız):</b> 3 zor kart daha. Aynı kuralı uygula.' }));
      const fbB = h('div'); pnB.appendChild(fbB);
      let bl = 3, bdone; const bp = new Promise((rr) => { bdone = rr; });
      const hb = handler(false);
      Sorter(c, svg, { items: itemsB, zones, onDrop: async (it, zid) => { const res = await hb.call(null, it, zid); const _ = res; if (res && typeof res === 'object') { bl--; if (bl <= 0) bdone(); } return res; } });
      // handler yazdığı geri bildirimi fb'ye yazar; bonus için aynı kutuyu kullan
      fbB.appendChild(fb);
      await withSkip(c, bp, 'Bonusu atla ›');
      pnB.remove();
      c.note(`<b>En küçük kutu kuralı:</b> sayının önce kesir/ondalık/kök biçimini sadeleştir (12/4 = 3, −8/2 = −4, √9 = 3), sonra yerleştir.<br><b>Biten ya da devreden ondalık → Q. Ne biten ne devreden ondalık → Q′. Kök içi tam kare → rasyonel; değilse irrasyonel.</b>`, 'Büyük sınıflandırma', 's14');
      await c.say('<b>Biten ya da devreden → Q. Ne biter ne devreder → Q′.</b> Kök içi tam kare rasyoneldir. Mini sınava hazırsın!', { ms: 4400, speak: 'Biten ya da devreden ondalık, Q. Ne biten ne devreden ondalık, Q üssü. Kök içi tam kare ise sonuç rasyoneldir. Mini sınava hazırsın!' });
    },
  });

  const QUIZ = [
    {
      q: 'Aşağıdaki ifadelerden hangisi <b>doğrudur</b>?',
      options: [
        'N, çıkarma işlemine göre kapalıdır, çünkü 5 − 3 = 2 ∈ N.',
        'Z, bölme işlemine göre kapalıdır, çünkü 8 ÷ 2 = 4 ∈ Z.',
        'Q, sıfırdan farklı bir sayıya bölmeye göre kapalıdır.',
        `Q′, toplamaya göre kapalıdır, çünkü ${M.sqrt(2)} + ${M.sqrt(3)} irrasyoneldir.`,
      ],
      answer: 2,
      why: [
        '5 − 3 yeşil, ama 3 − 5 = −2 ∉ N. Kapalılık için her çiftin yeşil olması gerekir.',
        '8 ÷ 2 yeşil, ama 3 ÷ 4 = 3/4 ∉ Z. Tek karşı örnek yeter.',
        `a/b ÷ c/d = a/b · d/c (c ≠ 0) yine rasyoneldir.`,
        `√2 + √3 gerçekten irrasyonel, ama kapalılık için <b>her</b> çiftte irrasyonel olmalı. √2 + (−√2) = 0 ∉ Q′.`,
      ],
      scene: 5,
    },
    {
      q: 'Aşağıdaki sayılardan hangisi <b>irrasyoneldir</b>?',
      options: [`0,${ov('27')} (yani 0,2727…)`, F(22, 7), M.sqrt(16), M.sqrt(7)],
      answer: 3,
      why: [
        `0,${ov('27')} = ${F(27, 99)} = ${F(3, 11)}: devreden ondalık rasyoneldir.`,
        `22/7 bir kesirdir (= 3,142857…, devreden); her kesir rasyoneldir.`,
        '√16 = 4 ∈ N ⊂ Q. Kök içi tam kare.',
        '7 tam kare değil: √7 = 2,6457513… ne biter ne devreder.',
      ],
      scene: 9,
    },
    {
      q: `${F(3, 8)} ve ${F(5, 6)} sayılarının ondalık açılımları için hangisi <b>doğrudur</b>?`,
      options: [
        'İkisi de biter.',
        `${F(3, 8)} biter (0,375), ${F(5, 6)} devreder (0,8${ov('3')}); ikisi de rasyoneldir.`,
        `${F(3, 8)} biter, ${F(5, 6)} bitmediği için irrasyoneldir.`,
        `${F(3, 8)} devreder, ${F(5, 6)} biter.`,
      ],
      answer: 1,
      why: [
        '5/6: 50÷6 = 8 kalan 2; 20÷6 = 3 kalan 2 → kalan tekrar ediyor, 0,8333… devreder. Payda 6 = 2·3 (3 çarpanı var).',
        `Doğru. 3/8: 30÷8 = 3 kalan 6; 60÷8 = 7 kalan 4; 40÷8 = 5 kalan 0 → 0,375. 5/6 = 0,8${ov('3')} devirli → rasyonel.`,
        `Devreden ondalık irrasyonel olmaz: 0,8333… = 5/6, bir kesir.`,
        'Tersini söylüyor; 3/8’de kalan 0’a ulaşıyor (biter), 5/6’da ulaşmıyor. Uzun bölmede kalanlara bak.',
      ],
      scene: 7,
    },
    {
      q: `${M.sqrt(4)}, ${M.sqrt(5)}, ${M.sqrt(9)}, ${M.sqrt(F(1, 4))} sayılarından kaç tanesi <b>rasyoneldir</b>?`,
      options: ['0', '2', '3', '4'],
      answer: 2,
      why: [
        '√4 = 2, √9 = 3 ve √(1/4) = 1/2 rasyonel. “Kök içi → irrasyonel” yanlış.',
        '√4 = 2 ve √9 = 3’ü buldun; √(1/4) = 1/2’yi atladın: kesir de tam kare olabilir (1/4 = (1/2)²).',
        '√4 = 2, √9 = 3, √(1/4) = 1/2. √5 = 2,2360679… irrasyonel.',
        '√5’in hesap makinesindeki değeri (2,236068) yaklaşıktır; ondalık açılımı bitmez, devretmez.',
      ],
      scene: 8,
    },
    {
      q: `3’ün <b>çarpma işlemine göre tersi</b> olan ${F(1, 3)} sayısının bulunabilmesi için kümenin <b>en küçüğü</b> hangisidir?`,
      options: ['N', 'Z', 'Q', 'Q′'],
      answer: 2,
      why: [
        '3 ∈ N olsa da 1/3 ∉ N. Çarpma tersi, yalnız 1’in N’de vardır.',
        '1/3 ∉ Z. Z’de yalnız 1 ve −1’in çarpma tersi vardır.',
        'Doğru: 3 · (1/3) = 1 ve 1/3 ∈ Q. Bu yüzden bölmeyi kurtarmak için Q doğdu.',
        '1/3 rasyoneldir (kesirdir); Q′ kesir olarak yazılamayan sayıları içerir. Üstelik Q′’de çarpmanın etkisiz elemanı 1 bile yok.',
      ],
      scene: 4,
    },
  ];
  const SUMMARY = [
    `<b>Her kutu bir ihtiyaçtan doğdu:</b> 3 − 5 yapılamayınca <b class="tz">Z</b>, 3 ÷ 4 yapılamayınca <b class="tq">Q</b>, kenarı 1 olan karenin köşegeni (√2) hiçbir kesirle yazılamayınca <b class="tr">R</b> geldi. Ters eleman yoksa ters işlem kapalı değildir.`,
    `<b>Kapalılık testi:</b> sonuç hep kutuda kalıyorsa kapalıdır; <b>tek karşı örnek</b> yeter. N: +, × ; Z: +, −, × ; Q ve R: dört işlem (0’a bölme hariç). Q′ hiçbirinde kapalı değildir (√2 + (−√2) = 0 ; √2 · √2 = 2).`,
    `<b>Ondalık açılım adresi:</b> biten ya da devreden → rasyonel (${F(1, 4)} = 0,25 ; ${F(1, 3)} = 0,${ov('3')}). Ne biter ne devreder → irrasyonel (√2, π). R = Q ∪ Q′.`,
  ];

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

  /* ================= QUIZ, ÖZET, BAŞLAT ================= */
  Ders.start({
    id: 'sayilar-03', kicker: '9. Sınıf · Sayılar', title: 'Sayı Kümeleri ve İşlem Özellikleri',
    accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Matruşka Sayılar',
      hook: 'Her yeni sayı kümesi, bir öncekinde <b>yapılamayan</b> bir işlemi kurtarmak için doğdu. İç içe kutuları açıp nedenini göreceksin.',
      button: 'Derse başla ›',
    },
    goals: [
      'N, Z, Q, Q′ ve R kümelerini sembolle gösterip sayıları “en küçük kutuya” yerleştirir',
      'Kapalılık testini uygular: tek karşı örnek yeter, olumlu örnekler kanıtlamaz',
      'Her genişlemenin hangi eksikten doğduğunu açıklar (3 − 5, 3 ÷ 4, √2)',
      'Kesri uzun bölmeyle ondalığa çevirir; biten, devreden ve irrasyoneli ayırt eder',
    ],
    scenes: SCENES.map(wrapScene),
    quiz: QUIZ,
    summary: SUMMARY,
    nextLesson: { href: '04-islem-ozellikleri-cebirsel.html', label: 'Sonraki ders ›' },
  });
})();
