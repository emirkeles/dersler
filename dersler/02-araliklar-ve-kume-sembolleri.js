/* Ders 02 — Gerçek Sayı Aralıkları ve Küme Sembolleri
   Metafor: gece lunaparkı. Sayı doğrusu bir ampul şeridi; dolu nokta = yanan ampul (dahil),
   boş nokta = sönük halka (hariç). ∩ bir kapı kemeri, ∪ bir bardak.
   Renk rolleri: mint = geçer / dahil / kesişim sonucu · koral = geçmez / uyarı · amber = A kuralı / ampul
   gökmavisi = B kuralı · turuncu = Mini Tren (M) · lila = birleşim. */
(function () {
  'use strict';
  const D = window.Ders;
  const S = D.s, h = D.h, ease = D.ease, lerp = D.lerp, clamp = D.clamp;
  const Cancelled = D.Cancelled;

  const COL = {
    axis: '#3A4560', axis2: '#6b7aa8', mint: '#3DDC97', coral: '#FF6B6B', amber: '#FFC857', sky: '#5CC8FF',
    orange: '#FFA94D', lilac: '#B388FF', text: '#E8ECF5', mute: '#9fb0dc', hole: '#121a3e', ink: '#0F1420',
  };
  const NB = ' ';
  const MINUS = '−';

  /* ------------------------------------------------------------------ sayı biçimi */
  function num(v, d) {
    if (v === Infinity) return '∞';
    if (v === -Infinity) return MINUS + '∞';
    let s = d == null ? String(+v.toFixed(6)) : v.toFixed(d);
    s = s.replace('-', MINUS).replace('.', ',');
    const m = s.match(/^(−?)(\d+)(,\d+)?$/);
    if (m && m[2].length >= 4) s = m[1] + m[2].replace(/\B(?=(\d{3})+(?!\d))/g, NB) + (m[3] || '');
    return s;
  }
  const hexToRgb = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
  function mix(a, b, t) {
    const A = hexToRgb(a), B = hexToRgb(b);
    return '#' + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, '0')).join('');
  }

  /* ------------------------------------------------------------------ aralık modeli */
  const INF = Infinity;
  const IV = (a, b, la, lb) => ({ a, b, la: isFinite(a) ? la !== false : false, lb: isFinite(b) ? lb !== false : false });
  const has = (iv, x) => (x > iv.a || (iv.la && x === iv.a)) && (x < iv.b || (iv.lb && x === iv.b));
  const isEmpty = (iv) => iv.a > iv.b || (iv.a === iv.b && !(iv.la && iv.lb));
  function inter(A, B) {
    let a, la, b, lb;
    if (A.a > B.a) { a = A.a; la = A.la; } else if (A.a < B.a) { a = B.a; la = B.la; } else { a = A.a; la = A.la && B.la; }
    if (A.b < B.b) { b = A.b; lb = A.lb; } else if (A.b > B.b) { b = B.b; lb = B.lb; } else { b = A.b; lb = A.lb && B.lb; }
    return { a, b, la, lb };
  }
  function ivStr(iv) {
    if (isEmpty(iv)) return '∅';
    if (iv.a === iv.b) return '{' + num(iv.a) + '}';
    return (iv.la ? '[' : '(') + num(iv.a) + ', ' + num(iv.b) + (iv.lb ? ']' : ')');
  }
  /* aralığı eşitsizlik olarak yaz (x değişkeniyle) */
  function ineqStr(iv) {
    const lo = isFinite(iv.a), hi = isFinite(iv.b);
    if (lo && hi) return num(iv.a) + (iv.la ? ' ≤ ' : ' < ') + 'x' + (iv.lb ? ' ≤ ' : ' < ') + num(iv.b);
    if (lo) return 'x ' + (iv.la ? '≥ ' : '> ') + num(iv.a);
    if (hi) return 'x ' + (iv.lb ? '≤ ' : '< ') + num(iv.b);
    return 'x ∈ ℝ';
  }

  /* ------------------------------------------------------------------ SVG yardımcıları */
  function T(parent, x, y, str, o = {}) {
    const e = S('text', {
      x, y, 'text-anchor': o.a || 'middle', 'font-size': o.s || 24, 'font-weight': o.w || 600,
      style: 'fill:' + (o.f || COL.text) + (o.st ? ';' + o.st : ''),
    }, parent);
    if (o.math) D.mathText(e, str); else e.textContent = str;
    if (o.op != null) e.setAttribute('opacity', o.op);
    return e;
  }
  function multi(parent, x, y, lines, o = {}) {
    const lh = o.lh || (o.s || 22) * 1.3;
    return lines.map((ln, i) => T(parent, x, y + i * lh, ln, o));
  }
  function R(parent, x, y, w, hh, attrs) {
    return S('rect', Object.assign({ x, y, width: w, height: hh }, attrs), parent);
  }
  const setOp = (el, v) => el.setAttribute('opacity', v);
  const G = (parent, attrs) => S('g', attrs || {}, parent);
  /* öğeyi konumlandır */
  const at = (el, x, y, sc) => el.setAttribute('transform', `translate(${x},${y})` + (sc != null ? ` scale(${sc})` : ''));

  function defs(svg) {
    const d = S('defs', {}, svg);
    const grad = (id, stops, x2, y2) => {
      const g = S('linearGradient', { id, x1: 0, y1: 0, x2: x2 || 0, y2: y2 == null ? 1 : y2 }, d);
      stops.forEach(([o, c, a]) => S('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g));
    };
    grad('gBoard', [[0, '#3a4676'], [1, '#1c2552']]);
    grad('gCard', [[0, '#1d2858'], [1, '#141c42']]);
    grad('gPlate', [[0, '#ffd978'], [1, '#e9a92c']]);
    const f = S('filter', { id: 'glow', x: '-60%', y: '-60%', width: '220%', height: '220%' }, d);
    S('feGaussianBlur', { stdDeviation: 4.5, result: 'b' }, f);
    const m = S('feMerge', {}, f);
    S('feMergeNode', { in: 'b' }, m); S('feMergeNode', { in: 'SourceGraphic' }, m);
    const f2 = S('filter', { id: 'shadow', x: '-20%', y: '-20%', width: '140%', height: '150%' }, d);
    S('feDropShadow', { dx: 0, dy: 5, stdDeviation: 6, 'flood-color': '#000', 'flood-opacity': 0.45 }, f2);
    return d;
  }
  /* yıldızlı gece zemini (deterministik) */
  function stars(svg, n) {
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const g = G(svg);
    for (let i = 0; i < (n || 26); i++) {
      S('circle', { cx: rnd() * 1000, cy: rnd() * 562, r: 0.8 + rnd() * 1.4, fill: '#cfd9ff', opacity: 0.12 + rnd() * 0.28 }, g);
    }
    return g;
  }
  function canvas(c, o = {}) {
    const svg = c.svg(1000, 562);
    defs(svg);
    if (!o.noStars) stars(svg);
    return svg;
  }

  /* ------------------------------------------------------------------ nokta (ampul) */
  function dot(parent, x, y, color, filled, o = {}) {
    const r = o.r || 12;
    const g = S('g', {}, parent);
    const halo = S('circle', { r: r * 2.1, fill: color, opacity: 0 }, g);
    const ring = S('circle', { r, fill: COL.hole, stroke: color, 'stroke-width': 4 }, g);
    const core = S('circle', { r: r - 1.5, fill: color, opacity: 0 }, g);
    const d = { g, x, y, color, filled: !!filled, sc: 1, r, f: filled ? 1 : 0 };
    d.place = () => at(g, d.x, d.y, d.sc);
    d.look = (f) => { d.f = f; setOp(core, f); setOp(halo, o.noHalo ? 0 : f * 0.3); };
    d.set = (v) => { d.filled = !!v; d.look(v ? 1 : 0); };
    d.recolor = (col) => { d.color = col; halo.setAttribute('fill', col); ring.setAttribute('stroke', col); core.setAttribute('fill', col); };
    d.move = (nx, ny) => { d.x = nx; if (ny != null) d.y = ny; d.place(); };
    d.pop = (c, ms) => c.tween(ms || 360, (e) => { d.sc = e; d.place(); }, ease.back);
    d.flip = async (c, v, ms) => {
      const f0 = d.f, f1 = v ? 1 : 0;
      d.filled = !!v;
      await c.tween(ms || 260, (e) => d.look(lerp(f0, f1, e)));
    };
    d.hide = () => { d.sc = 0; d.place(); };
    d.set(filled); d.place();
    return d;
  }

  /* ------------------------------------------------------------------ çocuk figürü */
  const ARMS = {
    idle: 'M0 -68 L-20 -48 M0 -68 L20 -48',
    ok: 'M0 -68 L-25 -98 M0 -68 L25 -98',
    no: 'M-18 -66 L18 -50 M18 -66 L-18 -50',
  };
  function kid(parent, o = {}) {
    const g = S('g', {}, parent);
    const u = S('g', {}, g);
    const col = o.color || '#dfe6ff';
    const st = { stroke: col, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' };
    S('path', Object.assign({ d: 'M0 -42 L-13 -2 M0 -42 L13 -2' }, st), u);
    S('path', Object.assign({ d: 'M0 -74 L0 -42' }, st), u);
    const arms = S('path', Object.assign({ d: ARMS.idle }, st), u);
    const head = S('circle', { cx: 0, cy: -88, r: 13, fill: col }, u);
    S('circle', { cx: -4.5, cy: -90, r: 2, fill: COL.ink }, u);
    S('circle', { cx: 4.5, cy: -90, r: 2, fill: COL.ink }, u);
    const mouth = S('path', { d: 'M-5 -83 Q0 -79 5 -83', stroke: COL.ink, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }, u);
    const k = { g, x: 0, y: 0, H: 100 };
    k.at = (x, y, H) => { k.x = x; k.y = y; if (H != null) k.H = H; at(g, k.x, k.y, k.H / 100); };
    k.mood = (m) => {
      arms.setAttribute('d', ARMS[m] || ARMS.idle);
      mouth.setAttribute('d', m === 'no' ? 'M-5 -80 Q0 -85 5 -80' : 'M-5 -83 Q0 -78 5 -83');
      const cc = m === 'ok' ? COL.mint : m === 'no' ? COL.coral : col;
      u.querySelectorAll('path[stroke-width="8"]').forEach((p) => p.setAttribute('stroke', cc));
      head.setAttribute('fill', cc);
    };
    k.at(0, 0, 100);
    return k;
  }

  /* ------------------------------------------------------------------ kapı kemeri */
  function gate(parent, cx, by, w, hgt, o = {}) {
    const g = S('g', {}, parent);
    const r = w / 2, top = by - hgt;
    const outer = `M${cx - r} ${by} L${cx - r} ${top + r} A${r} ${r} 0 0 1 ${cx + r} ${top + r} L${cx + r} ${by}`;
    const glow = S('path', { d: outer + ' Z', fill: COL.mint, opacity: 0 }, g);
    S('path', { d: outer, fill: 'none', stroke: '#2f3a68', 'stroke-width': o.fw || 16, 'stroke-linejoin': 'round' }, g);
    const lamp = S('path', { d: outer, fill: 'none', stroke: COL.mint, 'stroke-width': o.lw || 8, 'stroke-dasharray': '0.1 15', 'stroke-linecap': 'round', filter: 'url(#glow)' }, g);
    let plate = null;
    if (o.label) {
      plate = G(g);
      const pw = o.plateW || 150;
      R(plate, cx - pw / 2, top - 30, pw, 32, { rx: 8, fill: 'url(#gPlate)', stroke: '#8a5a10', 'stroke-width': 2 });
      T(plate, cx, top - 6, o.label, { s: o.labelS || 22, w: 800, f: '#3a2605' });
    }
    const gt = { g, lamp, glow, color: COL.mint, plate };
    gt.light = (col, on) => {
      gt.color = col;
      lamp.setAttribute('stroke', col);
      glow.setAttribute('fill', col);
      setOp(glow, on === false ? 0 : 0.13);
      setOp(lamp, on === false ? 0.25 : 1);
    };
    gt.off = () => gt.light(COL.axis2, false);
    gt.lightTo = (c, col) => {
      const c0 = gt.color;
      return c.tween(150, (e) => gt.light(mix(c0, col, e)), ease.linear);
    };
    gt.off();
    return gt;
  }

  /* ------------------------------------------------------------------ sayı doğrusu */
  function axis(parent, o) {
    const X = (v) => o.x0 + (o.x1 - o.x0) * (v - o.vmin) / (o.vmax - o.vmin);
    const g = S('g', {}, parent);
    const y = o.y;
    const left = o.left != null ? o.left : o.x0 - 24;
    const right = o.right != null ? o.right : o.x1 + 24;
    const line = S('line', { x1: left, y1: y, x2: right, y2: y, stroke: COL.axis, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    (o.minor || []).forEach((v) => S('line', { x1: X(v), x2: X(v), y1: y - 7, y2: y + 7, stroke: COL.axis, 'stroke-width': 2 }, g));
    const ticks = [];
    (o.major || []).forEach((v) => {
      const tl = S('line', { x1: X(v), x2: X(v), y1: y - 12, y2: y + 12, stroke: COL.axis2, 'stroke-width': 3 }, g);
      const lb = T(g, X(v), y + 42, o.fmt ? o.fmt(v) : num(v), { s: o.ls || 22, f: COL.mute, w: 500 });
      ticks.push({ v, tl, lb });
    });
    const ax = { g, X, line, ticks, y, left, right, o };
    ax.inv = (px) => o.vmin + (px - o.x0) * (o.vmax - o.vmin) / (o.x1 - o.x0);
    ax.draw = (c, ms) => c.tween(ms || 800, (e) => {
      g.setAttribute('opacity', Math.min(1, e * 2.5));
      line.setAttribute('x2', lerp(left, right, e));
    }, ease.out);
    return ax;
  }
  const AX100 = (y, extra) => Object.assign({
    x0: 60, x1: 900, vmin: 100, vmax: 200, y, left: 30, right: 935,
    major: [100, 120, 140, 160, 180, 200], minor: [110, 130, 150, 170, 190],
  }, extra || {});
  const AX10 = (y, extra) => Object.assign({
    x0: 80, x1: 920, vmin: 0, vmax: 10, y, left: 40, right: 960,
    major: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], minor: [],
  }, extra || {});

  /* aralığı eksen üzerinde bant + uç noktalarla çiz */
  function ivShape(parent, ax, iv, y, color, o = {}) {
    const th = o.th || 10;
    const g = S('g', {}, parent);
    const inf1 = !isFinite(iv.a), inf2 = !isFinite(iv.b);
    const xa = inf1 ? ax.left + 22 : ax.X(iv.a);
    const xb = inf2 ? ax.right - 22 : ax.X(iv.b);
    const line = S('line', { x1: xa, x2: xb, y1: y, y2: y, stroke: color, 'stroke-width': th }, g);
    const sh = { g, line, xa, xb, iv, y, color, th };
    if (inf1) sh.arrL = S('polygon', { points: `${xa},${y - th * 1.4} ${xa - 24},${y} ${xa},${y + th * 1.4}`, fill: color }, g);
    if (inf2) sh.arrR = S('polygon', { points: `${xb},${y - th * 1.4} ${xb + 24},${y} ${xb},${y + th * 1.4}`, fill: color }, g);
    if (!o.nodots) {
      if (!inf1) sh.d1 = dot(g, xa, y, color, iv.la, { r: o.r || 12 });
      if (!inf2 && !(iv.a === iv.b)) sh.d2 = dot(g, xb, y, color, iv.lb, { r: o.r || 12 });
    }
    sh.set = (f) => {
      line.setAttribute('x2', lerp(xa, xb, f));
      if (sh.arrR) setOp(sh.arrR, f > 0.98 ? 1 : 0);
      if (sh.arrL) setOp(sh.arrL, f > 0 ? 1 : 0);
    };
    sh.hide = () => {
      sh.set(0);
      if (sh.d1) sh.d1.hide();
      if (sh.d2) sh.d2.hide();
      if (sh.arrL) setOp(sh.arrL, 0);
    };
    sh.grow = async (c, ms) => {
      if (sh.d1) await sh.d1.pop(c, 300);
      if (sh.arrL) setOp(sh.arrL, 1);
      await c.tween(ms || 1000, (e) => sh.set(e), ease.inOut);
      if (sh.d2) await sh.d2.pop(c, 300);
    };
    sh.show = () => { sh.set(1); if (sh.d1) { sh.d1.sc = 1; sh.d1.place(); } if (sh.d2) { sh.d2.sc = 1; sh.d2.place(); } };
    sh.fade = (f) => setOp(g, f);
    if (o.hidden) sh.hide(); else sh.show();
    return sh;
  }

  /* konuşma balonu */
  function balloon(parent, x, y, lines, o = {}) {
    const g = G(parent);
    const s = o.s || 22, lh = s * 1.3;
    const w = o.w || 300, hh = lines.length * lh + 22;
    R(g, x - w / 2, y - hh, w, hh, { rx: 14, fill: '#1b2554', stroke: o.stroke || COL.amber, 'stroke-width': 2.5, filter: 'url(#shadow)' });
    S('path', { d: `M${x - 10} ${y - 1} L${x} ${y + 14} L${x + 10} ${y - 1} Z`, fill: '#1b2554', stroke: o.stroke || COL.amber, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    R(g, x - 12, y - 4, 24, 5, { fill: '#1b2554' });
    multi(g, x, y - hh + s + 8, lines, { s, f: o.f || COL.text, w: 600, lh });
    return g;
  }
  /* kural/etiket hapı */
  function chip(parent, x, y, w, str, o = {}) {
    const g = G(parent);
    const hh = o.h || 40;
    R(g, x - w / 2, y - hh / 2, w, hh, { rx: hh / 2, fill: o.fill || 'rgba(255,255,255,.06)', stroke: o.stroke || COL.axis2, 'stroke-width': 2 });
    T(g, x, y + (o.s || 24) * 0.35, str, { s: o.s || 24, f: o.f || COL.text, w: o.w || 700 });
    return g;
  }
  /* tabela panosu */
  function board(parent, x, y, w, hh, lines, o = {}) {
    const g = G(parent);
    S('line', { x1: x + 40, y1: y, x2: x + 40, y2: y - 40, stroke: COL.axis2, 'stroke-width': 3 }, g);
    S('line', { x1: x + w - 40, y1: y, x2: x + w - 40, y2: y - 40, stroke: COL.axis2, 'stroke-width': 3 }, g);
    R(g, x, y, w, hh, { rx: 14, fill: 'url(#gBoard)', stroke: o.stroke || '#55639a', 'stroke-width': 2.5, filter: 'url(#shadow)' });
    const ts = (o.lines || []).length;
    const tx = [];
    lines.forEach((ln, i) => {
      tx.push(T(g, x + w / 2, y + (o.top || 36) + i * (o.lh || 38), ln.t, { s: ln.s || 28, f: ln.f || COL.text, w: ln.w || 700 }));
    });
    return { g, tx };
  }

  /* ------------------------------------------------------------------ zaman / etkileşim yardımcıları */
  function spawn(c, fn) {
    Promise.resolve().then(fn).catch((e) => { if (!(e instanceof Cancelled)) console.error(e); });
  }
  /* animasyonları sırayla çalıştıran kuyruk (hızlı tıklamalarda çakışmayı önler) */
  function serial(c) {
    let chain = Promise.resolve();
    let pending = 0;
    return {
      run(fn) {
        pending++;
        chain = chain.then(fn).catch((e) => { if (!(e instanceof Cancelled)) console.error(e); }).then(() => { pending--; });
      },
      async idle() { while (pending > 0) await c.wait(60); },
    };
  }
  async function until(c, cond, o = {}) {
    let t = 0, btn = null, skipped = false;
    while (!cond()) {
      await c.wait(100); t += 100;
      if (!btn && o.solve && t >= (o.delay || 18000)) {
        btn = h('button', { class: 'btn ghost', onclick: () => { skipped = true; } }, o.label || 'Çözümü göster ›');
        c.act.prepend(btn);
      }
      if (skipped) { btn.remove(); btn = null; await o.solve(); break; }
    }
    if (btn) btn.remove();
  }
  /* sahne içi kısa süreli kayma: değerden değere */
  const slide = (c, ms, from, to, fn, e) => c.tween(ms, (k) => fn(lerp(from, to, k)), e);

  /* pointer koordinatını SVG koordinatına çevir */
  function svgPt(svg, ev) {
    const p = svg.createSVGPoint();
    p.x = ev.clientX; p.y = ev.clientY;
    const m = svg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }

  /* tıklanabilir nokta (boş ↔ dolu), klavye destekli */
  function toggler(c, svg, d, onChange, label) {
    const hit = S('circle', { r: 30, fill: 'transparent', style: 'cursor:pointer' }, d.g);
    d.g.setAttribute('tabindex', 0);
    d.g.setAttribute('role', 'button');
    d.g.setAttribute('aria-label', label || 'Noktayı değiştir');
    d.g.style.outline = 'none';
    d.locked = false;
    const flip = () => {
      if (d.locked) return;
      d.filled = !d.filled;
      spawn(c, async () => { d.sc = 0.8; d.place(); await Promise.all([d.flip(c, d.filled, 180), c.tween(260, (e) => { d.sc = lerp(0.8, 1, e); d.place(); }, ease.back)]); });
      onChange && onChange(d);
    };
    c.on(d.g, 'click', flip);
    c.on(d.g, 'keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); flip(); } });
    d.hit = hit;
    return d;
  }

  /* sürükle-bırak (fare + dokunmatik) ve tıkla-seç / tıkla-yerleştir */
  function dnd(c, svg, items, slots, hooks) {
    let sel = null;
    const place = (it) => at(it.el, it.x, it.y, it.sc || 1);
    const mark = (it, on) => { it.el.classList.toggle('sel', on); it.el.style.filter = on ? 'drop-shadow(0 0 8px #ffc857)' : ''; };
    const hitSlot = (px, py) => {
      let best = null, bd = 1e9;
      slots.forEach((s) => {
        const inside = s.rect ? (px >= s.rect.x - 14 && px <= s.rect.x + s.rect.w + 14 && py >= s.rect.y - 14 && py <= s.rect.y + s.rect.h + 14)
          : Math.hypot(px - s.cx, py - s.cy) <= (s.r || 40);
        const d = s.rect ? Math.hypot(px - (s.rect.x + s.rect.w / 2), py - (s.rect.y + s.rect.h / 2)) : Math.hypot(px - s.cx, py - s.cy);
        if (inside && d < bd) { best = s; bd = d; }
      });
      return best;
    };
    const home = (it) => spawn(c, async () => {
      const x0 = it.x, y0 = it.y;
      await c.tween(380, (e) => { it.x = lerp(x0, it.hx, e); it.y = lerp(y0, it.hy, e); place(it); }, ease.back);
    });
    const tryPlace = (it, slot) => {
      const res = hooks.onDrop(it, slot);
      if (res === 'ok') {
        it.locked = true; mark(it, false); sel = null;
        const tx = slot.sx != null ? slot.sx : slot.cx, ty = slot.sy != null ? slot.sy : slot.cy;
        const x0 = it.x, y0 = it.y;
        spawn(c, async () => { await c.tween(320, (e) => { it.x = lerp(x0, tx, e); it.y = lerp(y0, ty, e); place(it); }, ease.out); hooks.after && hooks.after(it, slot); });
        it.el.style.cursor = 'default';
      } else {
        home(it); mark(it, false); sel = null;
      }
    };
    items.forEach((it) => {
      it.x = it.hx; it.y = it.hy; place(it);
      it.el.classList.add('drag');
      it.el.setAttribute('tabindex', 0);
      it.el.setAttribute('role', 'button');
      it.el.style.outline = 'none';
      c.on(it.el, 'pointerdown', (ev) => {
        if (it.locked) return;
        ev.preventDefault();
        const p = svgPt(svg, ev);
        it.drag = { sx: p.x, sy: p.y, ox: it.x, oy: it.y, moved: false };
        if (it.el.parentNode.lastChild !== it.el) it.el.parentNode.appendChild(it.el);
        try { it.el.setPointerCapture(ev.pointerId); } catch (e) { /* yoksay */ }
      });
      c.on(it.el, 'pointermove', (ev) => {
        if (!it.drag) return;
        const p = svgPt(svg, ev);
        const dx = p.x - it.drag.sx, dy = p.y - it.drag.sy;
        if (Math.hypot(dx, dy) > 6) it.drag.moved = true;
        if (it.drag.moved) { it.x = it.drag.ox + dx; it.y = it.drag.oy + dy; place(it); }
      });
      const up = (ev) => {
        if (!it.drag) return;
        const d = it.drag; it.drag = null;
        if (!d.moved) {
          if (sel === it) { mark(it, false); sel = null; } else { if (sel) mark(sel, false); sel = it; mark(it, true); }
          return;
        }
        const slot = hitSlot(it.x, it.y);
        if (slot && !slot.full) tryPlace(it, slot); else { if (slot && slot.full) hooks.onFull && hooks.onFull(it, slot); home(it); }
      };
      c.on(it.el, 'pointerup', up);
      c.on(it.el, 'pointercancel', () => { if (it.drag) { it.drag = null; home(it); } });
      c.on(it.el, 'keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (it.locked) return; if (sel === it) { mark(it, false); sel = null; } else { if (sel) mark(sel, false); sel = it; mark(it, true); } }
      });
    });
    slots.forEach((s) => {
      if (!s.el) return;
      s.el.style.cursor = 'pointer';
      c.on(s.el, 'click', () => { if (sel && !s.full) tryPlace(sel, s); });
    });
    return { items, slots };
  }

  /* hesaplama için yardımcı: bir satır yaz, token'ları ölçerek ortala */
  function layoutRow(tokens, cx, gap) {
    const ws = tokens.map((t) => t.getComputedTextLength());
    const total = ws.reduce((a, b) => a + b, 0) + gap * (tokens.length - 1);
    let x = cx - total / 2;
    return ws.map((w, i) => { const r = { x, w }; x += w + gap; return r; });
  }

  /* HTML içi mini sayı doğrusu (sınav görselleri) */
  function miniSvg(spec) {
    // spec: {min,max,ticks:[...],items:[{iv,color,dy}], w}
    const W = 600, x0 = 40, x1 = 560, y = 74;
    const X = (v) => x0 + (x1 - x0) * (v - spec.min) / (spec.max - spec.min);
    let s = `<svg viewBox="0 0 ${W} ${spec.h || 120}" style="width:100%;max-width:560px;display:block;margin:6px 0 4px">`;
    s += `<line x1="14" y1="${y}" x2="586" y2="${y}" stroke="${COL.axis}" stroke-width="4" stroke-linecap="round"/>`;
    (spec.ticks || []).forEach((v) => {
      s += `<line x1="${X(v)}" x2="${X(v)}" y1="${y - 10}" y2="${y + 10}" stroke="${COL.axis2}" stroke-width="3"/>`;
      s += `<text x="${X(v)}" y="${y + 36}" text-anchor="middle" font-size="22" style="fill:${COL.mute}">${num(v)}</text>`;
    });
    (spec.items || []).forEach((it) => {
      const iv = it.iv, yy = y - (it.dy || 0);
      const a = isFinite(iv.a) ? X(iv.a) : 14, b = isFinite(iv.b) ? X(iv.b) : 586;
      s += `<line x1="${a}" x2="${b}" y1="${yy}" y2="${yy}" stroke="${it.color}" stroke-width="9"/>`;
      if (!isFinite(iv.a)) s += `<polygon points="${a},${yy - 12} ${a - 18},${yy} ${a},${yy + 12}" fill="${it.color}"/>`;
      if (!isFinite(iv.b)) s += `<polygon points="${b},${yy - 12} ${b + 18},${yy} ${b},${yy + 12}" fill="${it.color}"/>`;
      [[iv.a, iv.la], [iv.b, iv.lb]].forEach(([v, f]) => {
        if (!isFinite(v)) return;
        s += `<circle cx="${X(v)}" cy="${yy}" r="10" fill="${f ? it.color : COL.hole}" stroke="${it.color}" stroke-width="4"/>`;
      });
    });
    return s + '</svg>';
  }


  /* ================================================================== SAHNELER */
  const SC = [];
  /* anlatım ile görseli birlikte başlat: altyazı hemen, görsel kısa bir gecikmeyle */
  const par = (c, html, opts, anim, lead) => Promise.all([
    c.say(html, opts || {}),
    (async () => { await c.wait(lead == null ? 350 : lead); if (anim) await anim(); })(),
  ]);
  const fadeTo = (c, el, ms, a, b) => c.tween(ms || 600, (e) => setOp(el, lerp(a == null ? 0 : a, b == null ? 1 : b, e)), ease.out);

  /* ------------------------------------------------------------------ 1. Lunapark kapısı */
  SC.push({
    title: 'Lunapark kapısı',
    goal: 'Bir kural, "kimin geçtiği" sorusudur; boylar ondalıklı da olabilir.',
    run: async (c) => {
      const svg = canvas(c);
      /* ampul girlandı */
      const gar = G(svg);
      S('path', { d: 'M40 26 Q500 92 960 26', fill: 'none', stroke: '#39466f', 'stroke-width': 3 }, gar);
      const bulbs = [];
      for (let i = 0; i < 12; i++) {
        const t = i / 11;
        const px = (1 - t) * (1 - t) * 40 + 2 * t * (1 - t) * 500 + t * t * 960;
        const py = (1 - t) * (1 - t) * 26 + 2 * t * (1 - t) * 92 + t * t * 26;
        const halo = S('circle', { cx: px, cy: py + 11, r: 20, fill: COL.amber, opacity: 0 }, gar);
        const b = S('circle', { cx: px, cy: py + 11, r: 9, fill: COL.amber, opacity: 0.18 }, gar);
        bulbs.push({ halo, b });
      }
      const lit = (i, f) => { setOp(bulbs[i].b, 0.18 + 0.82 * f); setOp(bulbs[i].halo, 0.28 * f); };

      /* kapı, tabela, eksen */
      const gx = 560, gby = 300, GK = 0.6;
      const gGate = G(svg);
      const gt = gate(gGate, gx, gby, 200, 190, { label: 'HIZ TRENİ', plateW: 150 });
      [140, 190].forEach((b) => {
        const yy = gby - GK * b;
        S('line', { x1: gx - 92, x2: gx + 92, y1: yy, y2: yy, stroke: COL.amber, 'stroke-width': 2.5, 'stroke-dasharray': '7 6' }, gGate);
        T(gGate, gx - 112, yy + 7, b + ' cm', { a: 'end', s: 22, f: COL.amber, w: 600 });
      });
      const kG = kid(gGate);
      const gBoard = G(svg);
      board(gBoard, 40, 100, 290, 150, [
        { t: 'BOY KURALI', s: 22, f: COL.amber, w: 800 },
        { t: 'boy 140 cm ve üzeri', s: 28 },
        { t: "190 cm'den kısa", s: 28 },
      ], { top: 40, lh: 44 });
      /* sağdaki okuma alanı */
      const gRead = G(svg);
      const readout = T(gRead, 842, 150, '', { s: 46, w: 800, f: COL.text });
      const vIcon = S('circle', { cx: 745, cy: 232, r: 25, fill: COL.coral }, gRead);
      const vMark = T(gRead, 745, 242, '✗', { s: 32, w: 900, f: COL.ink });
      const vText = T(gRead, 782, 244, 'GEÇEMEZ', { a: 'start', s: 34, w: 800, f: COL.coral });
      const ax = axis(svg, AX100(470));
      const gAx = ax.g;
      /* iz boyaması: gezilen boylar yeşil/kırmızı belirir */
      const trail = G(svg);
      const bins = [];
      for (let i = 0; i < 200; i++) {
        bins.push(R(trail, ax.X(100 + i / 2), 466, ax.X(100.5) - ax.X(100) + 0.4, 8, { fill: 'none', opacity: 0.9 }));
      }
      const kA = kid(svg);
      const track = R(svg, 20, 330, 960, 180, { fill: 'transparent', style: 'cursor:ew-resize;touch-action:none' });
      [gGate, gBoard, gRead, gAx, trail, kA.g].forEach((e) => setOp(e, 0));

      let v = 120, prevIdx = null, interactive = false, bal = null;
      const paint = (val) => {
        const idx = clamp(Math.floor((val - 100) * 2), 0, 199);
        const lo = prevIdx == null ? idx : Math.min(prevIdx, idx), hi = prevIdx == null ? idx : Math.max(prevIdx, idx);
        for (let i = lo; i <= hi; i++) {
          const bv = 100 + i / 2;
          bins[i].setAttribute('fill', bv >= 140 && bv < 190 ? COL.mint : COL.coral);
        }
        prevIdx = idx;
      };
      const setBoy = (nv) => {
        v = Math.round(nv * 10) / 10;
        const ok = v >= 140 && v < 190;
        kA.at(ax.X(v), 462, 0.5 * v);
        kG.at(gx, gby, GK * v);
        kA.mood(ok ? 'ok' : 'no'); kG.mood(ok ? 'ok' : 'no');
        gt.light(ok ? COL.mint : COL.coral);
        readout.textContent = num(v, 1) + ' cm';
        vIcon.setAttribute('fill', ok ? COL.mint : COL.coral);
        vMark.textContent = ok ? '✓' : '✗';
        vText.textContent = ok ? 'GEÇER' : 'GEÇEMEZ';
        vText.style.fill = ok ? COL.mint : COL.coral;
        paint(v);
      };
      setBoy(120);

      /* 1) kapı ve girlanda */
      await par(c, 'Lunaparkın en hızlı treni için kapıda <b>boy kontrolü</b> var.', { ms: 2600 }, async () => {
        await c.tween(1500, (e) => { for (let i = 0; i < 12; i++) lit(i, clamp(e * 12 - i, 0, 1)); }, ease.linear);
        await fadeTo(c, gGate, 700);
      });
      /* 2) tabela */
      await par(c, 'Tabelada yazıyor: boy <b>140 cm ve üzeri</b>, <b>190 cm\'den kısa</b> olanlar geçer.', { ms: 3600, speak: "Tabelada yazıyor: boy yüz kırk santimetre ve üzeri, yüz doksan santimetreden kısa olanlar geçer." }, async () => {
        await fadeTo(c, gBoard, 800);
        await fadeTo(c, gRead, 500);
        kG.at(gx, gby, GK * v);
      });
      /* 3) sayı doğrusu */
      await par(c, 'Kimin geçeceğini bir de <b>sayı doğrusunda</b> görelim.', { ms: 2600 }, async () => {
        await ax.draw(c, 900);
        setOp(trail, 1);
        await fadeTo(c, kA.g, 500);
      });

      /* 4) gösterim: bilinçli değerler */
      const go = (to, ms) => { const from = v; return c.tween(ms, (e) => setBoy(lerp(from, to, e)), ease.inOut); };
      await par(c, '120 cm: kapı kırmızı. Bu boy <b class="bad">geçemez</b>.', { ms: 2200 });
      await par(c, '140\'a yaklaşalım...', { ms: 1500, noWait: true }, () => go(139.9, 1500));
      await par(c, '<b>139,9 cm</b>: çok yakın ama yine geçemez. Boylar ondalıklı da olabilir!', { ms: 3200, speak: 'Yüz otuz dokuz virgül dokuz santimetre: çok yakın ama yine geçemez. Boylar ondalıklı da olabilir!' }, async () => {
        bal = balloon(svg, ax.X(139.9), 335, ['Boy 139,9 da olabilir.', 'Aralarda sonsuz çok sayı var!'], { w: 340, s: 22 });
        setOp(bal, 0); await fadeTo(c, bal, 400);
      });
      await fadeTo(c, bal, 400, 1, 0); bal.remove();
      await par(c, 'Tam <b>140,0 cm</b>: kapı açılıyor, <b class="good">geçer</b>.', { ms: 2400 }, () => go(140, 450));
      await par(c, '189,9 cm hâlâ geçer...', { ms: 1600, noWait: true }, () => go(189.9, 1900));
      await par(c, 'Ama tam <b>190,0 cm</b> geçemez: 140 girer, 190 girmez.', { ms: 3600, speak: 'Ama tam yüz doksan santimetre geçemez! İki uç bir değil: yüz kırk girer, yüz doksan girmez.' }, () => go(190, 450));

      /* 5) serbest keşif */
      interactive = true;
      const sl = c.slider({ label: 'Boy (cm)', min: 100, max: 200, step: 0.1, value: 190, fmt: (x) => num(x, 1), onInput: (x) => setBoy(x) });
      const onTrack = (ev) => { if (!interactive) return; sl.set(clamp(Math.round(ax.inv(svgPt(svg, ev).x) * 10) / 10, 100, 200)); };
      let dragging = false;
      c.on(track, 'pointerdown', (ev) => { dragging = true; try { track.setPointerCapture(ev.pointerId); } catch (e) { /* yoksay */ } onTrack(ev); });
      c.on(track, 'pointermove', (ev) => { if (dragging) onTrack(ev); });
      c.on(track, 'pointerup', () => { dragging = false; });
      c.on(track, 'pointercancel', () => { dragging = false; });
      c.say('Şimdi sen dene: çocuğu sürükle ya da kaydırıcıyı kullan. Hangi boylar geçiyor?', { noWait: true });
      c.note('Tabela bir <b>sayı kümesini</b> tarif eder.', 'Kural', 'k1');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 2. Kuralı eşitsizlikle yaz */
  SC.push({
    title: 'Kuralı eşitsizlikle yaz',
    goal: '"Ve üzeri" = ≥ ; büyük sayılar sağda durur.',
    run: async (c) => {
      const svg = canvas(c);
      const FS = 42;
      /* cümle belirteçleri */
      const gS = G(svg);
      const tok = {
        boy: T(gS, 0, 130, 'Boy', { a: 'start', s: FS, f: COL.text }),
        n: T(gS, 0, 130, '140', { a: 'start', s: FS, f: COL.amber, w: 800 }),
        cm: T(gS, 0, 130, 'cm', { a: 'start', s: FS, f: COL.text }),
        ve: T(gS, 0, 130, 've üzeri', { a: 'start', s: FS, f: COL.text }),
      };
      const rowA = layoutRow([tok.boy, tok.n, tok.cm, tok.ve], 500, 16);
      [tok.boy, tok.n, tok.cm, tok.ve].forEach((t, i) => t.setAttribute('x', rowA[i].x));
      const uline = S('line', { x1: rowA[3].x, x2: rowA[3].x, y1: 146, y2: 146, stroke: COL.amber, 'stroke-width': 5, 'stroke-linecap': 'round' }, gS);
      /* sonuç yazısı: x ≥ 140 */
      const BIG = 76;
      const eq = { x: T(gS, 0, 150, 'x', { a: 'start', s: BIG, f: COL.text, w: 700 }), ge: T(gS, 0, 150, '≥', { a: 'start', s: BIG, f: COL.amber, w: 800 }), n: T(gS, 0, 150, '140', { a: 'start', s: BIG, f: COL.amber, w: 800 }) };
      const rowB = layoutRow([eq.x, eq.ge, eq.n], 500, 22);
      [eq.x, eq.ge, eq.n].forEach((t, i) => { t.setAttribute('x', rowB[i].x); setOp(t, 0); });
      const chipX = chip(svg, 150, 58, 250, 'x = boy (cm)', { s: 24, f: COL.mute });
      setOp(chipX, 0);
      /* mini kapı + sonuç */
      const gG = G(svg);
      const gt = gate(gG, 880, 235, 110, 105, {});
      const vtxt = T(gG, 880, 275, 'GEÇER', { s: 26, w: 800, f: COL.mint });
      setOp(gG, 0);
      const chk = T(svg, 500, 262, '', { s: 46, w: 800 });
      /* eksen */
      const ax = axis(svg, AX100(395));
      setOp(ax.g, 0);
      const ray = ivShape(svg, ax, IV(140, INF), 395, COL.mint, { nodots: true, hidden: true });
      const rayL = ivShape(svg, ax, IV(-INF, 140), 395, COL.mint, { nodots: true, hidden: true });
      const kA = kid(svg);
      let v = 120;
      const place = (val) => {
        v = val;
        const ok = val >= 140;
        kA.at(ax.X(val), 386, 0.5 * val); kA.mood(ok ? 'ok' : 'no');
        gt.light(ok ? COL.mint : COL.coral);
        vtxt.textContent = ok ? 'GEÇER' : 'GEÇEMEZ'; vtxt.style.fill = ok ? COL.mint : COL.coral;
      };
      place(120); setOp(kA.g, 0);
      const move = (to, ms) => { const from = v; return c.tween(ms, (e) => place(lerp(from, to, e))); };

      await par(c, '"140 cm ve üzeri": boy <b>140\'a eşit ya da büyük</b>.', { ms: 4200, speak: 'Boy yüz kırk santimetre ve üzeri demek, boy yüz kırka eşit ya da daha büyük demek.' }, async () => {
        await c.tween(700, (e) => uline.setAttribute('x2', rowA[3].x + rowA[3].w * e), ease.out);
      });
      /* dönüşüm animasyonu: cümle → x ≥ 140 */
      await par(c, 'Matematikte bunu kısaca <b>x ≥ 140</b> yazarız.', { ms: 3000, speak: 'Matematikte bunu kısaca x büyük eşittir yüz kırk yazarız.' }, async () => {
        const n0 = rowA[1].x, n1 = rowB[2].x, v0 = rowA[3].x, g1 = rowB[1].x;
        await c.tween(1300, (e) => {
          setOp(tok.boy, 1 - e); setOp(tok.cm, 1 - e);
          tok.boy.setAttribute('y', 130 - 20 * e); tok.cm.setAttribute('y', 130 - 20 * e);
          tok.n.setAttribute('x', lerp(n0, n1, e)); tok.n.setAttribute('y', lerp(130, 150, e)); tok.n.setAttribute('font-size', lerp(FS, BIG, e));
          tok.ve.setAttribute('x', lerp(v0, g1, e)); tok.ve.setAttribute('y', lerp(130, 150, e)); setOp(tok.ve, 1 - clamp(e * 1.6, 0, 1));
          setOp(uline, 1 - e);
          setOp(eq.ge, clamp(e * 1.6 - 0.4, 0, 1));
          setOp(eq.x, clamp(e * 2 - 1, 0, 1));
        }, ease.inOut);
        setOp(tok.n, 0); setOp(eq.n, 1);
        await fadeTo(c, chipX, 500);
      });
      c.note('"…ve üzeri / en az" → <b>≥</b>', 'Dil çevirisi', 'k2a');

      /* sayı doğrusu + tahmin */
      await par(c, '<b>x ≥ 140</b> olanlar sayı doğrusunda nerede? Önce tahmin et.', { ms: 3200, speak: 'Peki x büyük eşittir yüz kırk koşulunu sağlayanlar sayı doğrusunda nerede toplanır? Önce tahmin et.' }, async () => {
        await ax.draw(c, 900);
        await Promise.all([fadeTo(c, kA.g, 500), fadeTo(c, gG, 500)]);
      });
      const q = serial(c);
      const r = await c.choice({
        tag: 'Tahmin et', q: '<span class="m">x ≥ 140</span> koşulunu sağlayanlar hangi tarafta?',
        options: ['140\'ın solunda', '140\'ın sağında', 'Yalnız 140\'ta'], answer: 1,
        right: 'Evet. <b>≥</b> işareti "büyük ya da eşit" demek; büyükler sağda durur.',
        hints: [
          'Sola doğru gidince boy kısalıyor, kapı açılmıyor. Büyük sayılar sağda.',
          '',
          'Yalnız 140 olsaydı 150 cm\'lik çocuk geçemezdi. Ama 150 geçiyor, dene!',
        ],
        onPick: (i) => q.run(async () => {
          if (i === 0) {
            rayL.line.setAttribute('x2', rayL.xb);
            await c.tween(900, (e) => { rayL.line.setAttribute('x1', lerp(rayL.xb, rayL.xa, e)); setOp(rayL.arrL, e > 0.98 ? 1 : 0); }, ease.inOut);
            await move(120, 600); await c.wait(900);
            await fadeTo(c, rayL.g, 500, 1, 0);
            rayL.hide(); setOp(rayL.g, 1);
          }
          else if (i === 2) { await move(150, 900); }
          else { await move(140, 600); ray.set(0); await ray.grow(c, 1500); }
        }),
      });
      await q.idle();
      /* deneme: üç farklı değer */
      const lab = T(svg, ax.X(140), 478, 'x = 140', { s: 22, f: COL.amber, w: 700 });
      await fadeTo(c, lab, 400);
      await c.say('Şimdi çocuğu üç farklı boya götür ve eşitsizliği dene.', { noWait: true });
      let count = 0;
      const opts = h('div', { class: 'opts' });
      [150, 139, 140].forEach((val) => {
        const b = h('button', { class: 'opt', html: `<span class="m">${val} cm</span>` });
        b.addEventListener('click', () => {
          b.disabled = true; count++;
          spawn(c, async () => {
            await move(val, 700);
            const ok = val >= 140;
            chk.textContent = `${val} ≥ 140  ${ok ? '✓' : '✗'}`; chk.style.fill = ok ? COL.mint : COL.coral;
            b.innerHTML = `<span class="m">${val} ≥ 140</span> ${ok ? '<b class="good">✓</b>' : '<b class="bad">✗</b>'}`;
          });
        });
        opts.appendChild(b);
      });
      const pn = c.panel('Dene', h('p', { class: 'q' }, 'Üç boyu sırayla dene: hangisi ', h('span', { class: 'm' }, 'x ≥ 140'), ' koşulunu sağlıyor?'), opts);
      await until(c, () => count >= 3, { solve: async () => { opts.querySelectorAll('button:not(:disabled)').forEach((b) => b.click()); await c.wait(1800); count = 3; } });
      await c.wait(1100);
      pn.remove();
      c.note('<b>x ≥ 140</b>: 140 ve sağındaki her sayı.', 'Kural', 'k2');
      await c.say('Kural bu: <b>"ve üzeri" ⇒ ≥</b>. Büyük sayılar sağda durur.', { ms: 2800, speak: 'Kural bu: ve üzeri demek büyük eşittir. Büyük sayılar sağda durur.' });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 3. Dolu nokta / boş nokta */
  SC.push({
    title: 'Tam 140 cm ise? Dolu ve boş nokta',
    goal: 'Uç nokta dahil mi? Dahilse ● dolu, değilse ○ boş nokta.',
    run: async (c) => {
      const svg = canvas(c);
      const rows = [
        { y: 178, by: 50, name: 'A', ln: ['Boy 140 cm', 've üzeri'], rule: 'x ≥ 140', filled: true, hi: 've üzeri' },
        { y: 396, by: 268, name: 'B', ln: ['Boy 140 cm', "'den uzun"], rule: 'x > 140', filled: false, hi: 'uzun' },
      ];
      rows.forEach((r) => {
        r.g = G(svg);
        const bd = board(r.g, 40, r.by, 300, 76, [
          { t: r.name === 'A' ? 'Boy 140 cm ve üzeri' : "Boy 140 cm'den uzun", s: 25 },
        ], { top: 46 });
        r.bt = bd.tx[0];
        r.ax = axis(r.g, AX100(r.y, { major: [100, 120, 140, 160, 180, 200], minor: [] }));
        r.ruleT = T(r.g, 640, r.by + 52, r.rule, { s: 54, w: 800, f: COL.mint });
        r.ray = ivShape(r.g, r.ax, IV(140, INF), r.y, COL.mint, { nodots: true });
        r.k = kid(r.g); r.k.at(r.ax.X(140), r.y - 14, 62);
        r.lab = T(r.g, r.ax.X(140) + 34, r.y - 40, 'tam 140,0 cm', { a: 'start', s: 22, f: COL.mute });
        r.ver = T(r.g, 870, r.by + 50, '', { s: 34, w: 800 });
        /* uç nokta yuvası */
        r.slot = S('circle', { cx: r.ax.X(140), cy: r.y, r: 17, fill: 'none', stroke: COL.mute, 'stroke-width': 2.5, 'stroke-dasharray': '5 5' }, r.g);
        r.q = T(r.g, r.ax.X(140), r.y + 7, '?', { s: 22, f: COL.mute, w: 800 });
        r.hit = S('circle', { cx: r.ax.X(140), cy: r.y, r: 34, fill: 'transparent' }, r.g);
        setOp(r.g, 0);
      });
      const verdict = (r, ok) => { r.ver.textContent = ok ? '✓ GEÇER' : '✗ GEÇEMEZ'; r.ver.style.fill = ok ? COL.mint : COL.coral; r.k.mood(ok ? 'ok' : 'no'); };

      await par(c, 'Kapıdaki görevlinin önünde <b>tam 140 cm</b> boyunda bir çocuk var. Girebilir mi?', { ms: 3600, speak: 'Kapıdaki görevlinin önünde tam yüz kırk santimetre boyunda bir çocuk var. Girebilir mi?' }, async () => {
        await fadeTo(c, rows[0].g, 700);
        await fadeTo(c, rows[1].g, 700);
      });
      await c.say('İki tabela: "<b>ve üzeri</b>" ile "<b>uzun</b>". Çocuk tam 140 cm.', { ms: 3600 });

      /* tahmin A */
      const qa = serial(c);
      const A = rows[0], B = rows[1];
      await c.choice({
        tag: 'Tahmin et · A', q: 'Tam 140,0 cm\'lik çocuk <b>A</b> kapısından geçer mi?', options: ['Geçer', 'Geçmez'], answer: 0,
        right: 'Tabela "ve üzeri" diyor; 140 de üzerindekilerin içinde sayılır.',
        hints: ['', 'Eşitlik de kuralın içinde; dolu nokta bunu söyleyecek. "ve üzeri" ifadesi 140\'ı da kapsar.'],
        onPick: (i, ok) => qa.run(async () => {
          if (!ok) { A.bt.style.fill = COL.amber; await c.wait(500); }
          verdict(A, true);
          await c.tween(900, (e) => A.k.at(lerp(A.ax.X(140), A.ax.X(140) + 70, e), A.y - 14, 62), ease.inOut);
          A.k.mood('ok');
          A.lab.setAttribute('x', A.ax.X(140) + 104);
        }),
      });
      await qa.idle();
      A.bt.style.fill = '';
      /* tahmin B */
      await c.choice({
        tag: 'Tahmin et · B', q: 'Tam 140,0 cm\'lik çocuk <b>B</b> kapısından geçer mi?', options: ['Geçer', 'Geçmez'], answer: 1,
        right: '"Uzun", 140\'tan büyük demek; 140\'ın kendisi 140\'tan büyük değil.',
        hints: ['Uzun, 140\'a eşit olanı kapsamaz. Boş nokta: "bu noktaya kadar gel, ama kendisi dahil değil".', ''],
        onPick: (i, ok) => qa.run(async () => { verdict(B, false); if (!ok) { B.k.mood('no'); await c.wait(600); } }),
      });
      await qa.idle();

      /* sürükle-bırak: doğru sembolü uç noktaya koy */
      const tray = G(svg);
      const mkTok = (id, x, filled) => {
        const g = G(tray);
        const d = dot(g, 0, 0, COL.mint, filled, { r: 24, noHalo: true });
        S('circle', { r: 40, fill: 'transparent' }, g);
        at(g, x, 505);
        return { id, el: g, hx: x, hy: 505, d };
      };
      const tFull = mkTok('full', 120, true), tHol = mkTok('hollow', 560, false);
      T(tray, 162, 500, 'dolu nokta', { a: 'start', s: 26, w: 800, f: COL.mint });
      T(tray, 162, 530, 'bu sayı DAHİL (≤ ≥)', { a: 'start', s: 22, f: COL.mute });
      T(tray, 602, 500, 'boş nokta', { a: 'start', s: 26, w: 800, f: COL.mint });
      T(tray, 602, 530, 'bu sayı HARİÇ (< >)', { a: 'start', s: 22, f: COL.mute });
      setOp(tray, 0);
      await par(c, 'Şimdi uç noktayı <b>sembolle</b> söyleyelim. Doğru sembolü doğru şeridin ucuna sürükle.', { ms: 3400, speak: 'Şimdi uç noktayı sembolle söyleyelim. Doğru sembolü doğru şeridin ucuna sürükle.' }, () => fadeTo(c, tray, 600));
      const fb = h('div');
      const pn = c.panel('Sürükle-bırak', h('p', { class: 'q', html: '<b>●</b> ve <b>○</b> simgelerinden birini <b>A</b> ya da <b>B</b> şeridinin ucundaki <b>?</b> yuvasına bırak. (Dokunarak da yapabilirsin: önce simgeyi, sonra yuvayı seç.)' }), fb);
      let placed = 0;
      const slotA = { id: 'A', cx: A.ax.X(140), cy: A.y, r: 52, el: A.hit }, slotB = { id: 'B', cx: B.ax.X(140), cy: B.y, r: 52, el: B.hit };
      const finish = (r, filled) => {
        const d = dot(r.g, r.ax.X(140), r.y, COL.mint, filled, { r: 12 });
        setOp(r.slot, 0); setOp(r.q, 0);
        spawn(c, async () => { d.sc = 0; d.place(); await d.pop(c, 380); });
        r.ray.g.parentNode.insertBefore(r.ray.g, d.g);
        placed++;
        if (r === A) { verdict(A, true); } else { verdict(B, false); }
      };
      const dd = dnd(c, svg, [tFull, tHol], [slotA, slotB], {
        onDrop: (it, slot) => {
          const ok = (it.id === 'full' && slot.id === 'A') || (it.id === 'hollow' && slot.id === 'B');
          if (ok) {
            slot.full = true;
            c.feedback(fb, 'ok', slot.id === 'A' ? 'Evet. <b>A</b>: "ve üzeri" ⇒ 140 <b>dahil</b> ⇒ dolu nokta ●.' : 'Evet. <b>B</b>: "uzun" ⇒ 140 <b>hariç</b> ⇒ boş nokta ○. "Bu noktaya kadar gel, kendisi dahil değil."');
            return 'ok';
          }
          c.feedback(fb, 'no', it.id === 'full' ? 'B tabelası "uzun" diyor: 140\'ın kendisi dahil değil. Orada <b>boş</b> nokta ○ gerekir.' : 'A tabelası "ve üzeri" diyor: 140 dahil. Orada <b>dolu</b> nokta ● gerekir.');
          return 'bad';
        },
        after: (it, slot) => { setOp(it.el, 0); finish(slot.id === 'A' ? A : B, slot.id === 'A'); },
      });
      await until(c, () => placed >= 2, { solve: async () => { if (!slotA.full) { slotA.full = true; tFull.locked = true; setOp(tFull.el, 0); finish(A, true); } if (!slotB.full) { slotB.full = true; tHol.locked = true; setOp(tHol.el, 0); finish(B, false); } await c.wait(500); } });
      await c.wait(900);
      pn.remove();
      c.note('● dolu: <b>≤ , ≥</b> (dahil) · ○ boş: <b>< , ></b> (hariç)', 'Kural', 'k3');
      await c.say('Dolu nokta: <b>sayı içeride</b>. Boş nokta: <b>sayı dışarıda</b>.', { ms: 3600 });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 4. 190'dan kısa: en uzun kim? */
  SC.push({
    title: "190'dan kısa: en uzun kim?",
    goal: 'Gerçek sayılarda "bir sonraki sayı" yoktur; bu yüzden uç nokta boş nokta olur.',
    run: async (c) => {
      const svg = canvas(c);
      const defsEl = svg.querySelector('defs');
      const AY = 478;
      const ax = axis(svg, AX100(AY));
      setOp(ax.g, 0);
      const rayB = ivShape(svg, ax, IV(-INF, 190, false, false), AY, COL.sky, { hidden: true, th: 10 });
      const ruleB = T(svg, 40, 100, 'x < 190', { a: 'start', s: 58, w: 800, f: COL.sky });
      setOp(ruleB, 0);

      await par(c, 'İkinci kural: <b>190 cm\'den kısa</b>, yani <b>x < 190</b>.', { ms: 3800, speak: "Tabelada ikinci kural: yüz doksan santimetreden kısa. Yani x küçüktür yüz doksan. Burada yüz doksan dahil değil." }, async () => {
        await ax.draw(c, 700);
        await fadeTo(c, ruleB, 500);
        await rayB.grow(c, 1300);
      });

      /* büyüteç */
      const L = { cx: 650, cy: 230, r: 138 };
      const clip = S('clipPath', { id: 'lensclip' }, defsEl);
      S('circle', { cx: L.cx, cy: L.cy, r: L.r - 4 }, clip);
      const gCone = G(svg), gLens = G(svg), gList = G(svg);
      const dotX = ax.X(190);
      S('line', { x1: dotX, y1: AY - 16, x2: L.cx + L.r * 0.72, y2: L.cy + L.r * 0.68, stroke: COL.amber, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }, gCone);
      S('line', { x1: dotX, y1: AY - 16, x2: L.cx + L.r * 0.98, y2: L.cy + L.r * 0.2, stroke: COL.amber, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }, gCone);
      S('circle', { cx: dotX, cy: AY, r: 28, fill: 'none', stroke: COL.amber, 'stroke-width': 3 }, gCone);
      S('circle', { cx: L.cx, cy: L.cy, r: L.r, fill: '#0b1130', stroke: COL.amber, 'stroke-width': 8 }, gLens);
      S('line', { x1: L.cx + L.r * 0.7, y1: L.cy + L.r * 0.72, x2: L.cx + L.r * 1.18, y2: L.cy + L.r * 1.22, stroke: '#a77a1c', 'stroke-width': 14, 'stroke-linecap': 'round' }, gLens);
      const inner = G(gLens, { 'clip-path': 'url(#lensclip)' });
      const ly = L.cy + 40, lx = L.cx + 86, ts = 92;
      S('line', { x1: L.cx - L.r, x2: lx, y1: ly, y2: ly, stroke: COL.sky, 'stroke-width': 9 }, inner);
      S('line', { x1: lx, x2: L.cx + L.r, y1: ly, y2: ly, stroke: COL.axis, 'stroke-width': 4 }, inner);
      const dL = dot(inner, lx, ly, COL.sky, false, { r: 12 });
      T(inner, lx, ly + 44, '190', { s: 26, w: 800, f: COL.sky });
      const mkLayer = (col, H) => {
        const g = G(inner);
        const ticks = [1, 2, 3].map(() => S('line', { y1: ly - 14, y2: ly + 14, stroke: COL.axis2, 'stroke-width': 3 }, g));
        const k = kid(g, col ? { color: col } : {}); k.at(0, ly - 7, H || 58);
        const lab = T(g, 0, ly - 82, '', { s: 25, w: 700, f: COL.text });
        return { g, ticks, k, lab };
      };
      const lay = (ly_, s, op) => {
        ly_.ticks.forEach((t, i) => { const x = lx - (i + 1) * ts * s; t.setAttribute('x1', x); t.setAttribute('x2', x); });
        const x1 = lx - ts * s;
        ly_.k.at(x1, ly - 7, 58);
        ly_.lab.setAttribute('x', x1);
        setOp(ly_.g, op);
      };
      const layers = [mkLayer(), mkLayer()];
      let cur = 0;
      const ex = mkLayer(COL.amber, 46); ex.ticks.forEach((t) => setOp(t, 0)); ex.lab.style.fill = COL.amber; ex.lab.setAttribute('y', ly - 108);
      setOp(ex.g, 0);
      let lev = 0;
      const unit = (l) => Math.pow(10, -l);
      const setLevelLabel = (ly_, l) => { ly_.lab.textContent = num(190 - unit(l), l) + ' cm'; ly_.k.mood('ok'); };
      setLevelLabel(layers[0], 0); lay(layers[0], 1, 1); lay(layers[1], 1, 0);
      setOp(gCone, 0); setOp(gLens, 0); setOp(gList, 0);

      /* soldaki liste */
      T(gList, 40, 160, 'Girebilen boylar:', { a: 'start', s: 26, w: 800, f: COL.mute });
      let nrows = 0;
      const addRow = (txt, col) => {
        const y = 204 + nrows * 40; nrows++;
        const t = T(gList, 40, y, txt, { a: 'start', s: 27, w: 700, f: col || COL.text });
        setOp(t, 0);
        spawn(c, () => fadeTo(c, t, 400));
        return t;
      };

      await par(c, '190\'dan kısa <b>en uzun</b> çocuk kaç cm? Büyüteçle bakalım.', { ms: 3800, speak: "Yüz doksandan kısa olup girebilen en uzun çocuk kaç santimetre? Yüz seksen dokuz mu? Büyüteçle bakalım." }, async () => {
        await Promise.all([fadeTo(c, gCone, 600), c.tween(800, (e) => { at(gLens, 0, 0); gLens.setAttribute('transform', `translate(${L.cx},${L.cy}) scale(${e}) translate(${-L.cx},${-L.cy})`); setOp(gLens, e); }, ease.back)]);
        await fadeTo(c, gList, 400);
        addRow('189 cm  ✓', COL.mint);
      });

      let exRow = null;
      const zoomStep = async () => {
        const from = layers[cur], to = layers[1 - cur];
        lev++;
        setLevelLabel(to, lev);
        setOp(ex.g, 0);
        if (exRow) { exRow.remove(); exRow = null; nrows--; }
        await c.tween(1500, (e) => {
          lay(from, lerp(1, 10, e), 1 - e);
          lay(to, lerp(0.1, 1, e), e);
        }, ease.inOut);
        cur = 1 - cur;
        addRow(num(190 - unit(lev), lev) + ' cm  ✓', COL.mint);
      };
      const zoomTo = async (t) => { while (lev < t) await zoomStep(); };
      const showExtra = async () => {
        const x = lx - ts * 0.5;
        ex.k.at(x, ly - 7, 58);
        ex.lab.setAttribute('x', x);
        ex.lab.textContent = num(190 - unit(lev) / 2, lev + 1) + ' cm';
        await c.tween(500, (e) => setOp(ex.g, e));
        if (exRow) { exRow.remove(); exRow = null; nrows--; }
        exRow = addRow(num(190 - unit(lev) / 2, lev + 1) + ' cm  ✓ daha uzun!', COL.amber);
      };

      const q = serial(c);
      let big = null;
      await c.choice({
        tag: 'Tahmin et', q: '190\'dan kısa girebilen <b>en uzun</b> boy kaç?',
        options: ['189 cm', '189,9 cm', '189,99 cm', 'En uzun boy diye bir şey yok'], answer: 3,
        right: 'Evet! 190\'a ne kadar yaklaşırsan yaklaş, aralarında daha büyük bir sayı var. En büyük elemanı olmayan bir parça; o yüzden uç nokta <b>boş nokta</b>.',
        hints: [
          'Bak, senden uzun biri daha girebiliyor: <b>189,5 < 190</b>. Bu böyle sonsuza kadar gider.',
          'Senden uzun biri daha var: <b>189,95 < 190</b>. Yakınlaştıkça yeni sayılar çıkıyor.',
          'Hâlâ biri daha sığıyor: <b>189,995 < 190</b>. Bu böyle sonsuza kadar gider.',
        ],
        onPick: (i) => q.run(async () => {
          if (i < 3) { await zoomTo(i); await showExtra(); return; }
          await zoomTo(3);
          big = T(svg, 880, 300, '?', { s: 130, w: 800, f: COL.amber });
          setOp(big, 0); await fadeTo(c, big, 600);
          T(svg, 880, 350, 'en büyük yok', { s: 28, w: 700, f: COL.amber });
        }),
      });
      await q.idle();
      c.note('<b>x < 190</b>: en büyük eleman yok; 190 boş nokta.', 'Kural', 'k4a');

      /* ince eksen oyunu */
      [gCone, gLens, gList].forEach((e) => spawn(c, () => fadeTo(c, e, 500, 1, 0)));
      if (big) { setOp(big, 0); }
      svg.querySelectorAll('text').forEach((t) => { if (t.textContent === 'en büyük yok') t.remove(); });
      await c.wait(600);
      const gF = G(svg);
      const FY = 330;
      const axf = axis(gF, { x0: 90, x1: 880, vmin: 189, vmax: 190, y: FY, left: 50, right: 920, major: [189, 189.2, 189.4, 189.6, 189.8, 190], fmt: (v) => num(v, 1), minor: [189.1, 189.3, 189.5, 189.7, 189.9] });
      const rayF = ivShape(gF, axf, IV(-INF, 190, false, false), FY, COL.sky, { th: 10 });
      const kF = kid(gF);
      const rd = T(gF, 500, 130, '', { s: 54, w: 800 });
      const vd = T(gF, 500, 186, '', { s: 30, w: 700 });
      setOp(gF, 0);
      let fv = 189.5;
      const setF = (x) => {
        fv = x;
        const ok = x < 190;
        kF.at(axf.X(x), FY - 12, 82); kF.mood(ok ? 'ok' : 'no');
        rd.textContent = num(x, 3) + ' cm'; rd.style.fill = ok ? COL.mint : COL.coral;
        vd.textContent = ok ? `${num(x, 3)} < 190  ✓ girer` : '190,000 < 190 değil  ✗ girmez'; vd.style.fill = ok ? COL.mint : COL.coral;
        if (x >= 189.99) seenHigh = true;
        if (x >= 190) seen190 = true;
      };
      let seenHigh = false, seen190 = false;
      setF(189.5);
      await par(c, 'Şimdi sen dene: çocuğu <b>190\'a</b> getirmeye çalış. Nereye kadar yeşil kalıyor?', { ms: 3200 }, () => fadeTo(c, gF, 600));
      const sl = c.slider({ label: 'Boy (cm)', min: 189, max: 190, step: 0.001, value: 189.5, fmt: (x) => num(x, 3), onInput: (x) => setF(x) });
      await until(c, () => seenHigh && seen190, { solve: async () => { const f0 = fv; await c.tween(1200, (e) => sl.set(lerp(f0, 189.999, e))); await c.wait(500); sl.set(190); await c.wait(500); } });
      await c.wait(900);
      sl.remove();
      await c.say('189,999 bile girer; <b>190,0 girmez</b>. Aradaki boşluğu hiçbir "son sayı" doldurmuyor.', { ms: 3400 });

      /* iki kuralı "ve" ile birleştir */
      await fadeTo(c, gF, 500, 1, 0);
      const FS = 54;
      const mkTok = (str, col) => T(svg, 0, 150, str, { a: 'start', s: FS, f: col, w: 800 });
      const A = [mkTok('x', COL.amber), mkTok('≥', COL.amber), mkTok('140', COL.amber)];
      const B = [mkTok('x', COL.sky), mkTok('<', COL.sky), mkTok('190', COL.sky)];
      const ve = T(svg, 500, 150, 've', { s: 38, w: 700, f: COL.mute });
      const rowA = layoutRow(A, 230, 14), rowB = layoutRow(B, 770, 14);
      A.forEach((t, i) => t.setAttribute('x', rowA[i].x)); B.forEach((t, i) => t.setAttribute('x', rowB[i].x));
      const fin = [mkTok('140', COL.mint), mkTok('≤', COL.mint), mkTok('x', COL.mint), mkTok('<', COL.mint), mkTok('190', COL.mint)];
      const rowF = layoutRow(fin, 500, 16);
      fin.forEach((t, i) => { t.setAttribute('x', rowF[i].x); setOp(t, 0); });
      [...A, ...B, ve].forEach((t) => setOp(t, 0));
      setOp(ruleB, 0);
      /* ince şeritler */
      const rA = ivShape(svg, ax, IV(140, INF, true), AY - 70, COL.amber, { th: 7, r: 10, hidden: true });
      const rB = ivShape(svg, ax, IV(-INF, 190, false, false), AY - 36, COL.sky, { th: 7, r: 10, hidden: true });
      setOp(rayB.g, 0);
      await par(c, 'İki kuralı <b>"ve"</b> ile birleştirelim: <b>x ≥ 140</b> ve <b>x < 190</b>.', { ms: 4200, speak: 'İki kuralı ve ile birleştirelim: hem x büyük eşittir yüz kırk, hem x küçüktür yüz doksan olsun.' }, async () => {
        await Promise.all([...A, ...B, ve].map((t) => fadeTo(c, t, 600)));
        await rA.grow(c, 1000);
        await rB.grow(c, 1000);
      });
      const result = ivShape(svg, ax, IV(140, 190, true, false), AY, COL.mint, { th: 12, hidden: true });
      const beams = G(svg);
      [140, 190].forEach((v) => S('line', { x1: ax.X(v), x2: ax.X(v), y1: AY - 62, y2: AY - 12, stroke: COL.mint, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, beams));
      setOp(beams, 0);
      await par(c, 'Yalnızca <b>ortak kısım</b> kalır: sol uç dolu, sağ uç boş.', { ms: 3200, speak: 'Yalnızca ikisinin ortak kısmı kalır: sol uç dolu nokta, sağ uç boş nokta.' }, async () => {
        await fadeTo(c, beams, 500);
        await result.grow(c, 1100);
        rA.fade(0.35); rB.fade(0.35);
        const l1 = multi(svg, ax.X(140), 300, ['140 dahil', 'sol uç dolu ●'], { s: 26, w: 800, f: COL.mint, lh: 32 });
        const l2 = multi(svg, ax.X(190), 300, ['190 hariç', 'sağ uç boş ○'], { s: 26, w: 800, f: COL.mint, lh: 32 });
        [...l1, ...l2].forEach((t) => setOp(t, 0));
        await Promise.all([...l1, ...l2].map((t) => fadeTo(c, t, 600)));
      });
      await par(c, 'Tek satırda yazalım: <b>140 ≤ x < 190</b>.', { ms: 3000, speak: 'Tek satırda yazalım: yüz kırk küçük eşittir x küçüktür yüz doksan.' }, async () => {
        await c.tween(1300, (e) => {
          setOp(ve, 1 - e);
          const mv = (t, from, to) => { t.setAttribute('x', lerp(from, to, e)); };
          mv(A[2], rowA[2].x, rowF[0].x); mv(A[1], rowA[1].x, rowF[1].x); mv(A[0], rowA[0].x, rowF[2].x);
          mv(B[0], rowB[0].x, rowF[2].x); mv(B[1], rowB[1].x, rowF[3].x); mv(B[2], rowB[2].x, rowF[4].x);
          [A[2], A[1], A[0], B[0], B[1], B[2]].forEach((t) => setOp(t, 1 - clamp(e * 1.4 - 0.2, 0, 1)));
          fin.forEach((t) => setOp(t, clamp(e * 1.6 - 0.5, 0, 1)));
        }, ease.inOut);
      });
      c.note('<b>140 ≤ x < 190</b>: sol uç ● dahil, sağ uç ○ hariç.', 'Kural', 'k4');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 5. Aralığı sen kur: parantez dili */
  SC.push({
    title: 'Aralığı sen kur: parantez dili',
    goal: 'Köşeli parantez [ ] = dahil ●, yuvarlak parantez ( ) = hariç ○.',
    run: async (c) => {
      const svg = canvas(c);
      /* 1. bölüm: [140, 190) yazılışı */
      const g1 = G(svg);
      const AY = 250;
      const ax = axis(g1, AX100(AY));
      const band = ivShape(g1, ax, IV(140, 190, true, false), AY, COL.mint, { th: 12, hidden: true });
      setOp(ax.g, 0);
      const BS = 86;
      const tk = [
        T(g1, 0, 430, '[', { a: 'start', s: BS, f: COL.mint, w: 400 }), T(g1, 0, 430, '140', { a: 'start', s: BS, f: COL.mint, w: 800 }),
        T(g1, 0, 430, ',', { a: 'start', s: BS, f: COL.mint, w: 400 }), T(g1, 0, 430, '190', { a: 'start', s: BS, f: COL.mint, w: 800 }),
        T(g1, 0, 430, ')', { a: 'start', s: BS, f: COL.mint, w: 400 }),
      ];
      const rowN = layoutRow(tk, 500, 12);
      tk.forEach((t, i) => { t.setAttribute('x', rowN[i].x); setOp(t, 0); });
      const capL = multi(g1, rowN[0].x + rowN[0].w / 2, 478, ['köşeli: sayıyı', 'kucaklar'], { s: 22, f: COL.mute, lh: 27 });
      const capR = multi(g1, rowN[4].x + rowN[4].w / 2, 478, ['yuvarlak: sayıyı', 'dışarıda bırakır'], { s: 22, f: COL.mute, lh: 27 });
      [...capL, ...capR].forEach((t) => setOp(t, 0));
      const numX = (i) => rowN[i].x;

      await par(c, 'Bu çizgiyi tek sembolle yazalım: sol uç <b>140</b>, sağ uç <b>190</b>.', { ms: 3400, speak: 'Şimdi bu çizgiyi tek bir sembolle yazalım. Sol uç yüz kırk, sağ uç yüz doksan.' }, async () => {
        await ax.draw(c, 700);
        await band.grow(c, 1100);
      });
      await par(c, 'Önce sayılar: <b>140</b> ve <b>190</b>.', { ms: 2200 }, async () => {
        await Promise.all([fadeTo(c, tk[1], 600), fadeTo(c, tk[3], 600), fadeTo(c, tk[2], 600)]);
      });
      /* sol parantez: dolu noktadan doğar */
      const flyBracket = async (idx, dotObj, dest) => {
        const fl = T(g1, dotObj.x, AY + 10, tk[idx].textContent, { a: 'middle', s: 36, f: COL.amber, w: 800 });
        setOp(fl, 0);
        const wdt = rowN[idx].w;
        await c.tween(1300, (e) => {
          setOp(fl, Math.min(1, e * 3));
          fl.setAttribute('x', lerp(dotObj.x, rowN[idx].x + wdt / 2, e));
          fl.setAttribute('y', lerp(AY + 10, 430, e));
          fl.setAttribute('font-size', lerp(36, BS, e));
        }, ease.inOut);
        fl.remove(); setOp(tk[idx], 1);
      };
      await par(c, 'Uç noktayı alıyorsak <b>köşeli parantez</b> kullanırız: sayıyı kucaklar. Bizde 140 <b>dahil</b>.', { ms: 4400, speak: 'Uç noktayı alıyorsak köşeli parantez kullanırız: sayıyı kucaklar. Bizde yüz kırk dahil.' }, async () => {
        await band.d1.pop(c, 300);
        await flyBracket(0, band.d1);
        await fadeTo(c, capL[0], 400); await fadeTo(c, capL[1], 400);
      });
      await par(c, 'Almıyorsak <b>yuvarlak parantez</b>: sayıyı dışarıda bırakır. 190 <b>hariç</b>. Yani <b>[140, 190)</b>.', { ms: 4600, speak: 'Almıyorsak yuvarlak parantez: sayıyı dışarıda bırakır. Yüz doksan hariç. Yani köşeli yüz kırk virgül yüz doksan yuvarlak.' }, async () => {
        await flyBracket(4, band.d2);
        await fadeTo(c, capR[0], 400); await fadeTo(c, capR[1], 400);
      });
      c.note('<b>[ ]</b> dahil ● · <b>( )</b> hariç ○ · örnek: <b>[140, 190)</b>', 'Kural', 'k5');
      await c.wait(700);

      /* 2. bölüm: aralığı sen kur */
      await fadeTo(c, g1, 600, 1, 0);
      g1.remove();
      const tasks = [
        { given: '3 ≤ x < 7', a: 3, b: 7, init: [false, false], target: [true, false], mode: 'iv', say: 'Kuralı sayı doğrusunda göster: noktalara dokun.' },
        { given: '2 < x ≤ 9', a: 2, b: 9, init: [false, false], target: [false, true], mode: 'iv', say: 'Bu kural için uç noktaları ayarla.' },
        { given: '(1, 6)', a: 1, b: 6, init: [true, true], target: [false, false], mode: 'ineq', say: 'Tersini yap: aralığa göre noktaları ayarla.' },
      ];
      for (let ti = 0; ti < tasks.length; ti++) {
        const t = tasks[ti];
        const g = G(svg);
        const ay = 300;
        const ax2 = axis(g, AX10(ay));
        const tIV = IV(t.a, t.b, t.target[0], t.target[1]);
        const th = ivShape(g, ax2, IV(t.a, t.b, false, false), ay, COL.mint, { th: 12, nodots: true });
        const d1 = dot(g, ax2.X(t.a), ay, COL.mint, t.init[0], { r: 14 }), d2 = dot(g, ax2.X(t.b), ay, COL.mint, t.init[1], { r: 14 });
        T(g, 500, 62, t.mode === 'iv' ? 'Kural' : 'Verilen aralık', { s: 22, f: COL.mute, w: 600 });
        T(g, 500, 132, t.given, { s: 66, w: 800, f: COL.amber });
        T(g, 500, 400, t.mode === 'iv' ? 'Senin yazdığın aralık' : 'Senin yazdığın eşitsizlik', { s: 22, f: COL.mute, w: 600 });
        const live = T(g, 500, 470, '', { s: 70, w: 800, f: COL.mint });
        const cur = () => IV(t.a, t.b, d1.filled, d2.filled);
        const refresh = () => { const iv = cur(); live.textContent = t.mode === 'iv' ? ivStr(iv) : ineqStr(iv); };
        refresh();
        let solved = false;
        const fb = h('div');
        const tryK = kid(g); tryK.at(ax2.X(t.a), ay - 18, 70); setOp(tryK.g, 0);
        toggler(c, svg, d1, refresh, `${t.a} noktasını değiştir`); toggler(c, svg, d2, refresh, `${t.b} noktasını değiştir`);
        setOp(g, 0);
        await par(c, t.say, { ms: 3600 }, () => fadeTo(c, g, 600));
        const check = () => {
          if (solved) return;
          const okA = d1.filled === t.target[0], okB = d2.filled === t.target[1];
          if (okA && okB) {
            solved = true; d1.locked = d2.locked = true;
            c.feedback(fb, 'ok', 'Doğru! <b>Köşeli</b>: sayı içeride. <b>Yuvarlak</b>: sayı dışarıda.');
            [d1, d2].forEach((d) => spawn(c, () => d.pop(c, 450)));
            return;
          }
          const msgs = [];
          [[d1, t.a, t.target[0], 0], [d2, t.b, t.target[1], 1]].forEach(([d, v, tg, k]) => {
            if (d.filled === tg) return;
            if (t.mode === 'iv') {
              msgs.push(d.filled
                ? `Bu aralıkta <b>${v}</b> de var. Oysa kural <b>${t.given}</b>; ${v}'nin kendisi aralığa girmiyor.`
                : `<b>${v}</b> aralığa dahil olmalı: kuralda eşitlik var (≤ ya da ≥). Köşeli parantez, dolu nokta ●.`);
            } else {
              msgs.push(d.filled
                ? `<b>${v}</b> yanında yuvarlak parantez var: ${v} içeride değil. Boş nokta ○ olmalı.`
                : `<b>${v}</b> yanında köşeli parantez olsaydı dahil olurdu.`);
            }
          });
          live.style.fill = COL.coral;
          c.feedback(fb, 'no', msgs.join('<br>'));
          spawn(c, async () => {
            await c.wait(1100);
            await Promise.all([d1.flip(c, t.target[0], 300), d2.flip(c, t.target[1], 300)]);
            refresh(); live.style.fill = COL.mint;
          });
        };
        const hint = () => {
          spawn(c, async () => {
            setOp(tryK.g, 1);
            const lines = [];
            for (const [v, inc, k] of [[t.a, tIV.la, 'a'], [t.b, tIV.lb, 'b']]) {
              const from = tryK.x, to = ax2.X(v);
              await c.tween(700, (e) => tryK.at(lerp(from, to, e), ay - 18, 70), ease.inOut);
              tryK.mood(inc ? 'ok' : 'no');
              const op = (k === 'a' ? (inc ? '≤' : '<') : (inc ? '≤' : '<'));
              lines.push(`<b>${num(v)}</b> boyundaki test çocuğu: ${num(v)} ${op} ${num(v)} → ${inc ? '<span class="good">✓ içeride</span> (dolu nokta ●)' : '<span class="bad">✗ dışarıda</span> (boş nokta ○)'}`);
              c.feedback(fb, 'info', lines.join('<br>'));
              await c.wait(900);
            }
          });
        };
        const bCheck = h('button', { class: 'btn', onclick: check }, 'Kontrol et');
        const bHint = h('button', { class: 'btn ghost', onclick: hint }, 'İpucu: test çocuğu');
        const pn = c.panel(`Aralığı sen kur · ${ti + 1}/3`, h('p', { class: 'q', html: t.mode === 'iv' ? `Kural <b>${t.given}</b>. Uç noktaları ayarla, sonra <b>Kontrol et</b>.` : `Aralık <b>${t.given}</b>. Eşitsizlikteki işaretler için uç noktaları ayarla, sonra <b>Kontrol et</b>.` }),
          h('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } }, bCheck, bHint), fb);
        await until(c, () => solved, { solve: async () => { await Promise.all([d1.flip(c, t.target[0], 250), d2.flip(c, t.target[1], 250)]); d1.filled = t.target[0]; d2.filled = t.target[1]; refresh(); check(); await c.wait(500); } });
        await new Promise((res) => { pn.append(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, ti < 2 ? 'Sonraki görev ›' : 'Bitir ›')); });
        pn.remove();
        await fadeTo(c, g, 450, 1, 0);
        g.remove();
      }
      /* özet pano: üç görevin üç dili */
      const rc = G(svg);
      T(rc, 40, 64, 'eşitsizlik', { a: 'start', s: 24, w: 700, f: COL.mute }); T(rc, 545, 64, 'sayı doğrusu', { s: 24, w: 700, f: COL.mute }); T(rc, 960, 64, 'aralık', { a: 'end', s: 24, w: 700, f: COL.mute });
      [['3 ≤ x < 7', IV(3, 7, true, false)], ['2 < x ≤ 9', IV(2, 9, false, true)], ['1 < x < 6', IV(1, 6, false, false)]].forEach(([tx, iv], i) => {
        const y = 170 + i * 130;
        R(rc, 20, y - 62, 960, 112, { rx: 18, fill: 'url(#gCard)', stroke: '#33417a', 'stroke-width': 2 });
        T(rc, 44, y + 16, tx, { a: 'start', s: 44, w: 800, f: COL.amber });
        const axr = axis(rc, { x0: 400, x1: 690, vmin: 0, vmax: 10, y: y + 8, left: 370, right: 720, major: [], minor: [], ls: 22 });
        ivShape(rc, axr, iv, y + 8, COL.mint, { th: 10, r: 11 });
        T(rc, 956, y + 18, ivStr(iv), { a: 'end', s: 50, w: 800, f: COL.mint });
      });
      setOp(rc, 0); await fadeTo(c, rc, 700);
      await c.say('Aralığı kurmayı öğrendin: <b>köşeli içeride, yuvarlak dışarıda</b>.', { ms: 2800 });
      await c.cont('Devam ›');
    },
  });

  /* tek düğmeli "dene" paneli: tıklayınca animasyon çalışır, geri bildirim gelir */
  function tryIt(c, o) {
    return new Promise((res) => {
      const fb = h('div');
      const opts = h('div', { class: 'opts' });
      const b = h('button', { class: 'opt', html: o.label });
      let pn = null;
      b.addEventListener('click', () => {
        b.disabled = true;
        spawn(c, async () => {
          await o.run();
          c.feedback(fb, o.kind || 'info', o.fb);
          pn.append(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: () => { pn.remove(); res(); } }, o.next || 'Devam ›'));
        });
      });
      opts.appendChild(b);
      pn = c.panel(o.tag || 'Dene', h('p', { class: 'q', html: o.q }), opts, fb);
    });
  }
  function flagAt(parent, poleX, yTop, yBot, str, dir, col) {
    const g = G(parent);
    S('line', { x1: poleX, x2: poleX, y1: yTop, y2: yBot, stroke: COL.axis2, 'stroke-width': 4 }, g);
    const w = 70, x = dir > 0 ? poleX + 2 : poleX - w - 2;
    R(g, x, yTop, w, 46, { rx: 8, fill: '#26325f', stroke: col || COL.amber, 'stroke-width': 3 });
    T(g, x + w / 2, yTop + 34, str, { s: 32, w: 800, f: col || COL.amber });
    return g;
  }

  /* ------------------------------------------------------------------ 6. Dört kapı, dört tür aralık */
  SC.push({
    title: 'Dört kapı, dört tür aralık',
    goal: 'Açık, kapalı ve yarı açık aralıkları uç noktalara bakarak adlandır.',
    run: async (c) => {
      const svg = canvas(c);
      const cards = [
        { id: 'k1', sign: 'Boy 140 ve üzeri, 190 ve altı', iv: IV(140, 190, true, true), name: 'kapalı aralık', sub: '', cx: 10, cy: 8 },
        { id: 'k2', sign: "Boy 140'tan uzun, 190'dan kısa", iv: IV(140, 190, false, false), name: 'açık aralık', sub: '', cx: 510, cy: 8 },
        { id: 'k3', sign: "Boy 140 ve üzeri, 190'dan kısa", iv: IV(140, 190, true, false), name: 'yarı açık aralık', sub: 'sol kapalı · sağ açık', cx: 10, cy: 216 },
        { id: 'k4', sign: "Boy 140'tan uzun, 190 ve altı", iv: IV(140, 190, false, true), name: 'yarı açık aralık', sub: 'sol açık · sağ kapalı', cx: 510, cy: 216 },
      ];
      const CW = 480, CH = 202;
      cards.forEach((k) => {
        k.g = G(svg);
        k.bg = R(k.g, k.cx, k.cy, CW, CH, { rx: 18, fill: 'url(#gCard)', stroke: '#33417a', 'stroke-width': 2.5, filter: 'url(#shadow)' });
        T(k.g, k.cx + CW / 2, k.cy + 38, k.sign, { s: 25, w: 700 });
        const x0 = k.cx + 50, x1 = k.cx + 430, y = k.cy + 92;
        k.ax = axis(k.g, { x0, x1, vmin: 100, vmax: 200, y, left: k.cx + 24, right: k.cx + 456, major: [140, 190], minor: [], ls: 22 });
        k.ray = ivShape(k.g, k.ax, k.iv, y, COL.mint, { nodots: true, th: 9 });
        k.slots = [140, 190].map((v) => {
          const sx = k.ax.X(v);
          const ring = S('circle', { cx: sx, cy: y, r: 15, fill: COL.hole, stroke: COL.mute, 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }, k.g);
          return { v, ring, x: sx, y };
        });
        k.d = null;
        k.nm = T(k.g, k.cx + 236, k.cy + (k.sub ? 170 : 182), k.name, { a: 'start', s: 26, w: 800, f: COL.mint });
        if (k.sub) k.sb = T(k.g, k.cx + 236, k.cy + 194, k.sub, { a: 'start', s: 22, f: COL.mute });
        setOp(k.nm, 0); if (k.sb) setOp(k.sb, 0);
        setOp(k.g, 0);
      });
      const toks = [
        { id: 'k4', t: '(140, 190]', iv: IV(140, 190, false, true), hx: 125 },
        { id: 'k1', t: '[140, 190]', iv: IV(140, 190, true, true), hx: 375 },
        { id: 'k3', t: '[140, 190)', iv: IV(140, 190, true, false), hx: 625 },
        { id: 'k2', t: '(140, 190)', iv: IV(140, 190, false, false), hx: 875 },
      ];
      const tray = G(svg);
      toks.forEach((t) => {
        const g = G(tray);
        R(g, -102, -26, 204, 52, { rx: 14, fill: '#232f66', stroke: COL.amber, 'stroke-width': 3, filter: 'url(#shadow)' });
        T(g, 0, 10, t.t, { s: 30, w: 800, f: COL.text, st: 'font-family:ui-monospace,Menlo,Consolas,monospace' });
        t.el = g; t.hy = 506; at(g, t.hx, 506);
      });
      setOp(tray, 0);

      await par(c, 'Uç noktaların dahil olup olmamasına göre <b>dört tür aralık</b> çıkar.', { ms: 3000 }, async () => {
        for (const k of cards) { spawn(c, () => fadeTo(c, k.g, 500)); await c.wait(220); }
        await c.wait(400);
      });
      await par(c, 'İki uç dışarıda: <b>açık</b>. İkisi içeride: <b>kapalı</b>. Biri içeride: <b>yarı açık</b>.', { ms: 5400 }, async () => {
        await c.wait(300);
      });
      await par(c, 'Lunaparkta dört tabelayı etiketlerle eşleştirelim: etiketi doğru tabelaya sürükle.', { ms: 3600 }, () => fadeTo(c, tray, 600));

      const fb = h('div');
      const pn = c.panel('Eşleştir', h('p', { class: 'q', html: 'Her etiketi, uç noktaları uyan tabelaya bırak. (Dokunarak da olur: önce etiketi, sonra tabelayı seç.)' }), fb);
      let matched = 0;
      const slots = cards.map((k) => ({ id: k.id, rect: { x: k.cx, y: k.cy, w: CW, h: CH }, sx: k.cx + 122, sy: k.cy + 176, el: k.bg, card: k }));
      const lock = (k, tok) => {
        const [sl1, sl2] = k.slots;
        sl1.ring.remove(); sl2.ring.remove();
        k.ray.g.parentNode.insertBefore(k.ray.g, k.ray.g);
        k.d1 = dot(k.g, sl1.x, sl1.y, COL.mint, k.iv.la, { r: 12 });
        k.d2 = dot(k.g, sl2.x, sl2.y, COL.mint, k.iv.lb, { r: 12 });
        spawn(c, async () => { k.d1.sc = 0; k.d2.sc = 0; k.d1.place(); k.d2.place(); await Promise.all([k.d1.pop(c, 400), k.d2.pop(c, 400)]); });
        spawn(c, async () => { await Promise.all([fadeTo(c, k.nm, 500), k.sb ? fadeTo(c, k.sb, 500) : null]); });
        matched++;
      };
      const wrongAnim = (k, tok) => {
        spawn(c, async () => {
          const bad = k.iv.la !== tok.iv.la ? 0 : 1;
          const sl = k.slots[bad];
          const kk = kid(k.g); kk.at(sl.x, sl.y - 14, 54); setOp(kk.g, 0);
          const inCard = bad === 0 ? k.iv.la : k.iv.lb;
          kk.mood(inCard ? 'ok' : 'no');
          await c.tween(450, (e) => setOp(kk.g, e));
          for (let i = 0; i < 3; i++) { sl.ring.setAttribute('stroke', COL.coral); await c.wait(160); sl.ring.setAttribute('stroke', COL.mute); await c.wait(160); }
          await c.tween(400, (e) => setOp(kk.g, 1 - e));
          kk.g.remove();
        });
      };
      dnd(c, svg, toks, slots, {
        onDrop: (tok, slot) => {
          const k = slot.card;
          if (k.id === tok.id) {
            slot.full = true;
            const a = k.iv;
            c.feedback(fb, 'ok', `Doğru. Sol ${a.la ? 'köşeli' : 'yuvarlak'}: 140 ${a.la ? 'içeride' : 'dışarıda'}. Sağ ${a.lb ? 'köşeli' : 'yuvarlak'}: 190 ${a.lb ? 'içeride' : 'dışarıda'}.`);
            return 'ok';
          }
          const badL = k.iv.la !== tok.iv.la;
          const v = badL ? 140 : 190;
          const inCard = badL ? k.iv.la : k.iv.lb, inTok = badL ? tok.iv.la : tok.iv.lb;
          c.feedback(fb, 'no', `<b>${v}</b> bu tabelada ${inCard ? 'içeride' : 'dışarıda'}, bu etikette ${inTok ? 'içeride' : 'dışarıda'}. Bu başka bir tabela.`);
          wrongAnim(k, tok);
          return 'bad';
        },
        after: (tok, slot) => { tok.sc = 0.8; at(tok.el, tok.x, tok.y, 0.8); lock(slot.card, tok); },
      });
      await until(c, () => matched >= 4, {
        solve: async () => {
          for (const s of slots) {
            if (s.full) continue;
            const tok = toks.find((t) => t.id === s.id);
            s.full = true; tok.locked = true; at(tok.el, s.sx, s.sy); lock(s.card, tok);
            await c.wait(200);
          }
          await c.wait(500);
        },
      });
      await c.wait(1100);
      pn.remove();
      c.note('<b>[a, b]</b> kapalı · <b>(a, b)</b> açık · <b>[a, b)</b>, <b>(a, b]</b> yarı açık', 'Kural', 'k6');
      await c.say('Adlar belli oldu. Şimdi hızlı bir kontrol sorusu.', { ms: 2400 });
      await c.choice({
        tag: 'Hızlı soru', q: '<span class="m">[−2, 3)</span> aralığında <b>−2</b> var mı, <b>3</b> var mı?',
        options: ['−2 var, 3 yok', '−2 yok, 3 var', 'İkisi de var', 'İkisi de yok'], answer: 0,
        right: 'Doğru. <b>[</b> köşeli: −2 içeride. <b>)</b> yuvarlak: 3 dışarıda.',
        hints: ['', 'Ters düşündün: köşeli parantez sayıyı içeri alır, yuvarlak dışarıda bırakır. −2 yanında köşeli [ var.', 'Sağ uç yuvarlak parantezle bitiyor: 3 aralığın dışında.', 'Sol uç köşeli: −2 içeride. Her uca kendi parantezine göre bak.'],
      });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 7. Sonsuz neden hep açık? */
  SC.push({
    title: 'Sonsuz neden hep açık?',
    goal: '∞ bir sayı değildir; ulaşılamaz. Yanında hep yuvarlak parantez.',
    run: async (c) => {
      const svg = canvas(c);
      const AY = 395;
      const ax = axis(svg, AX100(AY, { left: 30, right: 930 }));
      const ray = ivShape(svg, ax, IV(140, INF, true), AY, COL.mint, { th: 10, hidden: true });
      const flagR = flagAt(svg, 952, 250, AY, '∞', -1, COL.amber);
      setOp(flagR, 0);
      const kA = kid(svg); setOp(kA.g, 0);
      const cnt = G(svg);
      const cnt0 = T(cnt, 500, 150, 'Gittiğin yer', { s: 28, w: 600, f: COL.mute });
      const cnt1 = T(cnt, 500, 225, '200', { s: 84, w: 800, f: COL.mint });
      const cnt2 = T(cnt, 500, 285, "∞'a uzaklık: hâlâ sonsuz", { s: 32, w: 700, f: COL.amber });
      setOp(cnt, 0);
      const labelVal = (k, j) => (100 + 20 * j) * Math.pow(10, k);
      const setLabels = (k) => ax.ticks.forEach((t, j) => { t.lb.textContent = num(labelVal(k, j)); });
      let K = 0;
      const kidAt = (x) => kA.at(x, AY - 8, 70);
      kidAt(ax.X(140));

      await par(c, '"<b>140 cm ve üzeri</b>" kuralında üst sınır yok.', { ms: 4200 }, async () => {
        await ax.draw(c, 600);
        ray.show(); ray.hide();
        await ray.grow(c, 1400);
        await Promise.all([fadeTo(c, kA.g, 400), fadeTo(c, flagR, 600)]);
        kA.mood('ok');
      });

      const runStage = async (ms) => {
        const x0 = ax.X(100) + 30;
        await c.tween(ms, (e) => { kidAt(lerp(x0, ax.X(200) - 30, e)); }, ease.inOut);
      };
      const relabel = async (k, ms) => {
        const ofs = (t, j, e) => t.lb.setAttribute('y', AY + 42 - 14 * e);
        await c.tween(ms / 2, (e) => { ax.ticks.forEach((t) => { ofs(t, 0, e); setOp(t.lb, 1 - e); }); setOp(kA.g, 1 - e); }, ease.in);
        setLabels(k);
        kidAt(ax.X(100) + 30);
        await c.tween(ms / 2, (e) => { ax.ticks.forEach((t) => { t.lb.setAttribute('y', AY + 28 + 14 * e); setOp(t.lb, e); }); setOp(kA.g, e); }, ease.out);
      };
      const setCnt = (k) => { cnt1.textContent = num(2 * Math.pow(10, k + 2)); };
      await par(c, '<b>∞</b> bir sayı değil; "bitmeyen gidiş" demek.', { ms: 6200, speak: 'Sonsuz simgesi bir sayı değil; bitmeyen gidiş demek. Koşucuyu salalım, ölçek her seferinde on kat büyüsün.' }, async () => {
        await fadeTo(c, cnt, 500);
        for (let k = 0; k <= 4; k++) {
          K = k;
          kidAt(ax.X(100) + 30);
          await runStage(1000);
          setCnt(k);
          if (k < 4) await relabel(k + 1, 500);
        }
      });
      await c.say('Hâlâ ∞ bayrağı aynı uzaklıkta. Koşucu hiçbir zaman varamıyor.', { ms: 3000, speak: 'Hâlâ sonsuz bayrağı aynı uzaklıkta. Koşucu hiçbir zaman varamıyor.' });

      /* 1) tahmin */
      const q = serial(c);
      await c.choice({
        tag: 'Tahmin et', q: 'Koşucu <b>∞</b>\'a varabilir mi?', options: ['Varır', 'Hiçbir zaman varamaz'], answer: 1,
        right: 'Evet: hiçbir zaman. Her sayının ötesinde daha büyük bir sayı var; ∞ bunların hiçbiri değil.',
        hints: ['Her sayının ötesinde daha büyük bir sayı var; ∞ bunların hiçbiri değil. Koşucu hızlansa da yetişemez.', ''],
        onPick: (i) => q.run(async () => {
          if (i !== 0) return;
          for (let k = 5; k <= 7; k++) {
            kidAt(ax.X(100) + 30);
            await runStage(450);
            cnt1.textContent = num(2 * Math.pow(10, k + 2));
            if (k < 7) await relabel(k + 1, 300);
          }
        }),
      });
      await q.idle();
      setOp(cnt, 0);
      await c.wait(150);
      if (K !== 0 || true) { await relabel(0, 500); }
      kA.mood('ok');

      /* 2) dolu nokta koy */
      const bounceDot = async (filled) => {
        const dd = dot(svg, 640, 300, COL.mint, filled, { r: 14 });
        dd.sc = 0; dd.place();
        await dd.pop(c, 300);
        const tx = ax.right + 6, ty = AY;
        await c.tween(700, (e) => { dd.move(lerp(640, 905, e), lerp(300, AY - 52, e)); }, ease.inOut);
        for (let i = 0; i < 4; i++) { await c.tween(120, (e) => dd.move(905 + (i % 2 ? 1 : -1) * 16 * e, AY - 52), ease.linear); }
        const mark = T(svg, 905, AY - 78, '✗', { s: 40, w: 900, f: COL.coral });
        await c.wait(500);
        await c.tween(600, (e) => { dd.move(lerp(905, 640, e), lerp(AY - 52, 300, e)); setOp(dd.g, 1 - e); setOp(mark, 1 - e); }, ease.in);
        dd.g.remove(); mark.remove();
      };
      await tryIt(c, {
        tag: 'Dene', q: '∞ işaretinin yanına bir <b>dolu nokta</b> koymayı dene.', label: '∞ noktasına dolu nokta koy',
        run: () => bounceDot(true), kind: 'no',
        fb: 'Nokta yapışmadı. Dolu nokta "bu sayı içeride" demek. <b>∞ bir sayı değil</b>; içeride olabileceği bir yer yok.',
      });

      /* 3) doğru yazım */
      const noteTxt = T(svg, 500, 520, '', { s: 64, w: 800, f: COL.mint });
      await c.say('Peki <b>x ≥ 140</b> kuralının aralık yazımı hangisi?', { ms: 2600, speak: 'Peki x büyük eşittir yüz kırk kuralının aralık yazımı hangisi?' });
      await c.choice({
        tag: 'Seç', q: '<span class="m">x ≥ 140</span> için doğru yazım hangisi?',
        options: ['<span class="m">[140, ∞]</span>', '<span class="m">[140, ∞)</span>', '<span class="m">(140, ∞)</span>', '<span class="m">(∞, 140]</span>'], answer: 1,
        right: '140 dahil → köşeli <b>[</b>, ∞ hariç → yuvarlak <b>)</b>.',
        hints: ['∞ bir sayı değil; kapatılamaz. Yanında yuvarlak parantez olmalı.', '', '140 dahil mi? Evet, ≥ var. Sol uç köşeli olmalı.', '∞ soldan başlamaz; büyük sayılar sağda.'],
        onPick: (i, ok) => q.run(async () => {
          if (ok) { noteTxt.textContent = '[140, ∞)'; return; }
          if (i === 0) await bounceDot(true);
          else if (i === 2) { await ray.d1.flip(c, false, 300); await c.wait(500); await ray.d1.flip(c, true, 300); }
          else { await c.tween(300, (e) => setOp(ray.g, 1 - 0.6 * e)); await c.tween(300, (e) => setOp(ray.g, 0.4 + 0.6 * e)); }
        }),
      });
      await q.idle();
      c.note('∞ sayı değildir, hep yuvarlak: <b>[140, ∞)</b>', 'Kural', 'k7');

      /* 4) sola doğru: x < 190 */
      await Promise.all([fadeTo(c, ray.g, 500, 1, 0), fadeTo(c, noteTxt, 500, 1, 0), fadeTo(c, kA.g, 500, 1, 0), fadeTo(c, flagR, 500, 1, 0)]);
      const rayL = ivShape(svg, ax, IV(-INF, 190, false, false), AY, COL.sky, { th: 10, hidden: true });
      const flagL = flagAt(svg, 24, 250, AY, '−∞', 1, COL.amber); setOp(flagL, 0);
      const flagR2 = flagAt(svg, 952, 250, AY, '∞', -1, COL.axis2); setOp(flagR2, 0.0);
      const ruleT = T(svg, 300, 150, 'x < 190  ⇒', { s: 58, w: 800, f: COL.sky });
      setOp(ruleT, 0);
      const slotR = R(svg, 480, 100, 330, 76, { rx: 14, fill: 'rgba(255,255,255,.04)', stroke: COL.mute, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
      const slotT = T(svg, 645, 148, 'buraya bırak', { s: 24, f: COL.mute, w: 600 });
      setOp(slotR, 0); setOp(slotT, 0);
      await par(c, 'Şimdi sola doğru: <b>x < 190</b>. Sol uçta <b>−∞</b> bayrağı.', { ms: 4200, speak: 'Şimdi sola doğru: x küçüktür yüz doksan kuralı. Boş nokta yüz doksanda, sol uçta eksi sonsuz bayrağı.' }, async () => {
        await Promise.all([fadeTo(c, flagL, 500), fadeTo(c, ruleT, 500)]);
        await rayL.d2.pop(c, 300);
        rayL.line.setAttribute('x2', rayL.xb);
        await c.tween(1300, (e) => { rayL.line.setAttribute('x1', lerp(rayL.xb, rayL.xa, e)); setOp(rayL.arrL, e > 0.98 ? 1 : 0); }, ease.inOut);
      });
      rayL.line.setAttribute('x1', rayL.xa);
      const toks = [
        { id: 'ok', t: '(−∞, 190)', hx: 140 }, { id: 'a', t: '(−∞, 190]', hx: 380 }, { id: 'b', t: '(190, ∞)', hx: 620 }, { id: 'd', t: '[−∞, 190)', hx: 860 },
      ];
      const tray = G(svg);
      toks.forEach((t) => {
        const g = G(tray);
        R(g, -108, -26, 216, 52, { rx: 14, fill: '#232f66', stroke: COL.amber, 'stroke-width': 3, filter: 'url(#shadow)' });
        T(g, 0, 10, t.t, { s: 30, w: 800, f: COL.text, st: 'font-family:ui-monospace,Menlo,Consolas,monospace' });
        t.el = g; t.hy = 490; at(g, t.hx, 490);
      });
      setOp(tray, 0);
      await Promise.all([fadeTo(c, tray, 500), fadeTo(c, slotR, 500), fadeTo(c, slotT, 500)]);
      const fb = h('div');
      const pn = c.panel('Eşleştir', h('p', { class: 'q', html: '<b>x < 190</b> kuralının aralık yazımını boşluğa sürükle.' }), fb);
      let done = false;
      const slot = { id: 's', rect: { x: 480, y: 100, w: 330, h: 76 }, sx: 645, sy: 138, el: slotR };
      const hintsTok = {
        a: '190 hariç (x < 190): sağ uç yuvarlak parantez olmalı.',
        b: 'Yön ters: x < 190 sola doğru gider, büyük sayılar sağda.',
        d: '−∞ için köşeli parantez olmaz: ∞ sayı değil.',
      };
      dnd(c, svg, toks, [slot], {
        onDrop: (tok) => {
          if (tok.id === 'ok') { c.feedback(fb, 'ok', 'Doğru: <b>(−∞, 190)</b>. Sol uçta −∞ → yuvarlak, 190 hariç → yuvarlak.'); return 'ok'; }
          c.feedback(fb, 'no', hintsTok[tok.id]); return 'bad';
        },
        after: () => { done = true; setOp(slotT, 0); },
      });
      await until(c, () => done, { solve: async () => { const t0 = toks[0]; t0.locked = true; t0.x = 645; t0.y = 138; at(t0.el, 645, 138); done = true; setOp(slotT, 0); await c.wait(400); } });
      await c.wait(900);
      pn.remove();

      /* son ekran: tüm doğru = R */
      await Promise.all([fadeTo(c, tray, 400, 1, 0), fadeTo(c, ruleT, 400, 1, 0), fadeTo(c, slotR, 400, 1, 0), fadeTo(c, slotT, 400, 1, 0), fadeTo(c, rayL.g, 500, 1, 0)]);
      setOp(flagR2, 0);
      const full = ivShape(svg, ax, IV(-INF, INF), AY, COL.mint, { th: 12, nodots: true, hidden: true });
      const R1 = T(svg, 500, 170, '(−∞, ∞) = ℝ', { s: 84, w: 800, f: COL.mint });
      setOp(R1, 0);
      await par(c, 'İki yönde de sınır yoksa: <b>(−∞, ∞) = ℝ</b>.', { ms: 3600, speak: 'Her iki yönde de sınır yoksa tüm sayı doğrusu: eksi sonsuzdan sonsuza, gerçek sayılar.' }, async () => {
        await Promise.all([fadeTo(c, flagR, 400), fadeTo(c, flagL, 100, 1, 1)]);
        await c.tween(1400, (e) => { full.line.setAttribute('x2', lerp(full.xa, full.xb, e)); full.line.setAttribute('x1', lerp(full.xb, full.xa, e) * 0 + full.xa); setOp(full.arrL, 1); setOp(full.arrR, e > 0.98 ? 1 : 0); }, ease.inOut);
        await fadeTo(c, R1, 600);
      });
      const bal = balloon(svg, 500, 330, ['Gerçek hayatta boy negatif olamaz; ama kuralı', 'x < 190 diye yazınca solda sınır yok.'], { w: 680, s: 24 });
      setOp(bal, 0); await fadeTo(c, bal, 600);
      await c.wait(1500);
      c.note('<b>(−∞, ∞) = ℝ</b>', 'Kural', 'k7b');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 8–10. Dörtlü dönüşüm (B4: üç sahne aynı dört paneli kullanır) */
  function dortlu(c) {
    const svg = canvas(c);
    const PW = 472, PH = 228;
    const defsP = {
      ineq: { x: 12, y: 8, name: 'Eşitsizlik', col: COL.amber },
      iv: { x: 516, y: 8, name: 'Aralık', col: COL.sky },
      line: { x: 12, y: 300, name: 'Doğru', col: COL.mint },
      set: { x: 516, y: 300, name: 'Küme', col: COL.lilac },
    };
    const P = {};
    Object.keys(defsP).forEach((k) => {
      const d = defsP[k];
      const g = G(svg);
      const rect = R(g, d.x, d.y, PW, PH, { rx: 18, fill: 'url(#gCard)', stroke: d.col, 'stroke-opacity': 0.55, 'stroke-width': 2.5, filter: 'url(#shadow)' });
      T(g, d.x + 20, d.y + 36, d.name, { a: 'start', s: 22, w: 700, f: d.col });
      const body = G(g);
      P[k] = { g, rect, body, d };
      setOp(g, 0);
    });
    const Q = { svg, P, PW, st: null };
    const clear = (g) => { while (g.firstChild) g.removeChild(g.firstChild); };
    const cxP = (k) => P[k].d.x + PW / 2;
    Q.clear = clear;
    Q.flash = async (k, col) => {
      const r = P[k].rect;
      for (let i = 0; i < 3; i++) {
        r.setAttribute('stroke', col || '#fff'); r.setAttribute('stroke-opacity', 1);
        await c.wait(160);
        r.setAttribute('stroke', P[k].d.col); r.setAttribute('stroke-opacity', 0.55);
        await c.wait(160);
      }
    };
    const dstr = (st) => (st.dom === 'R' ? 'ℝ' : 'ℤ');
    const zRange = (iv) => [iv.la ? Math.ceil(iv.a) : Math.floor(iv.a) + 1, iv.lb ? Math.floor(iv.b) : Math.ceil(iv.b) - 1];

    /* panel içerikleri */
    const fill = {
      ineq: (st) => { T(P.ineq.body, cxP('ineq'), P.ineq.d.y + 140, ineqStr(st.iv), { s: 54, w: 800 }); },
      iv: (st) => {
        const b = P.iv.body, y = P.iv.d.y;
        if (st.dom === 'R') T(b, cxP('iv'), y + 140, 'x ∈ ' + ivStr(st.iv), { s: 50, w: 800 });
        else {
          T(b, cxP('iv'), y + 124, 'aralık değil', { s: 40, w: 800, f: COL.coral });
          T(b, cxP('iv'), y + 168, 'aralık yalnızca ℝ için', { s: 22, f: COL.mute });
        }
      },
      set: (st) => {
        const b = P.set.body, y = P.set.d.y, cx = cxP('set');
        const z = st.dom === 'Z' && isFinite(st.iv.a) && isFinite(st.iv.b);
        T(b, cx, y + (z ? 116 : 140), `{x : ${ineqStr(st.iv)}, x ∈ ${dstr(st)}}`, { s: 30, w: 800 });
        if (z) { const [lo, hi] = zRange(st.iv); T(b, cx, y + 168, `= {${lo}, ${lo + 1}, …, ${hi}}`, { s: 30, w: 800, f: COL.mint }); }
      },
    };
    const zInfo = {};
    fill.line = (st) => {
      const b = P.line.body, pn = P.line.d;
      const x0 = pn.x + 40, x1 = pn.x + PW - 40, y = pn.y + 150;
      const ticks = [];
      if (isFinite(st.iv.a)) ticks.push(st.iv.a);
      if (isFinite(st.iv.b)) ticks.push(st.iv.b);
      const ax = axis(b, { x0, x1, vmin: st.win[0], vmax: st.win[1], y, left: pn.x + 18, right: pn.x + PW - 18, major: ticks, minor: [], ls: 24 });
      const sh = ivShape(b, ax, st.iv, y, COL.mint, { th: 10, r: 11 });
      zInfo.sh = sh; zInfo.ax = ax; zInfo.dots = []; zInfo.ring = null;
      if (isFinite(st.iv.a) && isFinite(st.iv.b)) {
        const [lo, hi] = zRange(st.iv);
        const zg = G(b);
        for (let v = lo; v <= hi; v++) zInfo.dots.push(S('circle', { cx: ax.X(v), cy: y, r: 3, fill: COL.mint, opacity: 0 }, zg));
        if (!st.iv.lb) zInfo.ring = S('circle', { cx: ax.X(st.iv.b), cy: y, r: 8, fill: COL.hole, stroke: COL.mute, 'stroke-width': 2.5, 'stroke-dasharray': '4 3', opacity: 0 }, zg);
        zInfo.lab = T(b, pn.x + PW / 2, y - 46, 'yalnız tam sayılar', { s: 22, f: COL.mute, w: 600, op: 0 });
      }
      if (st.dom === 'Z') zInfo.apply(1);
    };
    zInfo.apply = (f) => {
      if (!zInfo.sh) return;
      setOp(zInfo.sh.line, 1 - f);
      [zInfo.sh.d1, zInfo.sh.d2].forEach((d) => { if (d) setOp(d.g, 1 - f); });
      const n = zInfo.dots.length;
      zInfo.dots.forEach((d, i) => setOp(d, clamp(f * (n + 6) - i, 0, 1)));
      if (zInfo.ring) setOp(zInfo.ring, clamp((f - 0.8) * 5, 0, 1));
      if (zInfo.lab) setOp(zInfo.lab, clamp((f - 0.6) * 2.5, 0, 1));
    };
    Q.blank = (k) => {
      clear(P[k].body);
      const d = P[k].d;
      T(P[k].body, d.x + PW / 2, d.y + 150, '?', { s: 96, w: 800, f: COL.axis2 });
    };
    Q.show = async (k, ms) => { clear(P[k].body); fill[k](Q.st); setOp(P[k].body, 0); await fadeTo(c, P[k].body, ms || 400); };
    /* dört boş paneli getir, sonra verilenleri sırayla doldur */
    Q.open = async (keys) => {
      for (const k of ['line', 'ineq', 'iv', 'set']) { clear(P[k].body); spawn(c, () => fadeTo(c, P[k].g, 500)); await c.wait(200); }
      for (const k of keys) { await Q.show(k, 450); await c.wait(200); }
    };
    Q.reset = () => Promise.all(['ineq', 'iv', 'line', 'set'].map((k) => fadeTo(c, P[k].body, 300, 1, 0)));
    Q.toZ = async () => {
      Q.st = { ...Q.st, dom: 'Z' };
      await Promise.all([
        c.tween(2000, (e) => zInfo.apply(e), ease.inOut),
        (async () => { await c.wait(500); await Q.show('iv', 400); await Q.show('set', 500); })(),
      ]);
    };
    Q.toR = async () => {
      Q.st = { ...Q.st, dom: 'R' };
      await Promise.all([
        c.tween(1400, (e) => zInfo.apply(1 - e), ease.inOut),
        (async () => { await Q.show('iv', 400); await Q.show('set', 500); })(),
      ]);
    };
    return Q;
  }

  SC.push({
    title: 'Dört yazım',
    goal: 'Aynı küme dört biçimde yazılır.',
    run: async (c) => {
      const Q = dortlu(c);
      Q.st = { iv: IV(140, 190, true, false), dom: 'R', win: [132, 198] };
      await par(c, 'Aynı küme <b>dört biçimde</b> yazılır.', { ms: 4200 }, () => Q.open(['line', 'ineq', 'iv', 'set']));
      await par(c, 'Küme yazımında x\'in nereden seçildiği de yazılır: <b>x ∈ ℝ</b>.', { ms: 4200, speak: 'Küme yazımında x in nereden seçildiği de yazılır: x, gerçek sayılar kümesinin elemanı.' }, () => Q.flash('set', COL.lilac));
      c.note('<b>140 ≤ x < 190</b> = <b>[140, 190)</b> = <b>{x : 140 ≤ x < 190, x ∈ ℝ}</b>', 'Dört dil, tek küme', 'k8');

      await Q.reset();
      Q.st = { iv: IV(-3, 2, false, true), dom: 'R', win: [-5, 5] };
      Q.blank('ineq'); Q.blank('iv'); Q.blank('set');
      await Promise.all([Q.show('line', 500), ...['ineq', 'iv', 'set'].map((k) => fadeTo(c, Q.P[k].body, 400))]);
      await c.say('Doğru verildi: −3 boş, 2 dolu. Öteki üçünü tamamla.', { ms: 3400, speak: 'Sayı doğrusu verildi: eksi üç boş, iki dolu. Öteki üçünü tamamla.' });
      await c.choice({
        tag: 'Eşitsizlik', q: 'Sayı doğrusuna bakarak <b>eşitsizliği</b> seç:',
        options: ['<span class="m">−3 < x ≤ 2</span>', '<span class="m">−3 ≤ x < 2</span>', '<span class="m">−3 < x < 2</span>', '<span class="m">2 < x ≤ −3</span>'], answer: 0,
        right: '−3 boş: <b><</b>. 2 dolu: <b>≤</b>.',
        hints: ['', '−3 boş nokta: eşitlik yok. 2 ise dolu.', '2 dolu nokta: x ≤ 2 olmalı.', 'Küçük sayı solda yazılır: önce −3, sonra 2.'],
        onPick: (i, ok) => { if (!ok) spawn(c, () => Q.flash('ineq', COL.coral)); },
      });
      await Q.show('ineq', 400); spawn(c, () => Q.flash('ineq'));
      await c.choice({
        tag: 'Aralık', q: 'Şimdi <b>aralığı</b> seç:',
        options: ['<span class="m">x ∈ (−3, 2]</span>', '<span class="m">x ∈ [−3, 2)</span>', '<span class="m">x ∈ (−3, 2)</span>', '<span class="m">x ∈ (2, −3]</span>'], answer: 0,
        right: '−3 hariç: <b>(</b>. 2 dahil: <b>]</b>.',
        hints: ['', 'Parantezler ters yerde: −3 boş, 2 dolu.', '2 dolu nokta: köşeli parantezle bitmeli.', 'Önce küçük sayı yazılır: (−3, 2].'],
        onPick: (i, ok) => { if (!ok) spawn(c, () => Q.flash('iv', COL.coral)); },
      });
      await Q.show('iv', 400);
      await par(c, 'Küme yazımı da tamamlandı.', { ms: 2600 }, () => Q.show('set', 500));
      await c.cont('Devam ›');
    },
  });

  SC.push({
    title: 'ℝ mi, ℤ mi?',
    goal: 'x ∈ ℤ yazılınca aralık noktalara dağılır.',
    run: async (c) => {
      const Q = dortlu(c);
      Q.st = { iv: IV(140, 190, true, false), dom: 'R', win: [132, 198] };
      await par(c, 'Bu kümede x bir <b>gerçek sayı</b>.', { ms: 3200 }, () => Q.open(['line', 'ineq', 'iv', 'set']));
      await c.choice({
        tag: 'Tahmin et', q: '<span class="m">x ∈ ℝ</span> yerine <span class="m">x ∈ ℤ</span> yazarsak şerit ne olur?',
        options: ['Aynı kalır', 'Noktalara dağılır', 'Tamamen silinir'], answer: 1,
        right: 'Evet: yalnızca tam sayılar kalır.',
        hints: ['140,5 gibi sayılar tam sayı değil; onlar çıkar.', '', '140, 141, 142… hâlâ kümede.'],
      });
      await par(c, 'Şerit <b>noktalara dağıldı</b>: 140, 141, …, 189.', { ms: 4200, speak: 'Şerit noktalara dağıldı: yüz kırk, yüz kırk bir ve böyle yüz seksen dokuza kadar.' }, () => Q.toZ());
      await c.choice({
        tag: 'Soru', q: '<b>ℤ</b>\'de 190\'dan kısa en uzun boy kaç cm?', options: ['189 cm', '189,9 cm', 'En uzun yok'], answer: 0,
        right: 'Evet: <b>189</b>. Tam sayılarda bir sonraki sayı vardır.',
        hints: ['', '189,9 tam sayı değil.', 'Tam sayılarda 189\'dan sonra 190 gelir; en uzun 189.'],
      });
      await c.say('Aralık yazımı yalnızca <b>gerçek sayılar</b> içindir.', { ms: 3200 });
      c.note('<b>{x : 140 ≤ x < 190, x ∈ ℤ}</b> = {140, 141, …, 189}', 'ℝ mi, ℤ mi', 'k8z');
      await par(c, 'Gerçek sayılarda şerit yeniden <b>kesintisiz</b>.', { ms: 3200 }, () => Q.toR());
      await c.cont('Devam ›');
    },
  });

  SC.push({
    title: 'Sıra sende: eksik yazımı tamamla',
    goal: 'Bir yazım verilince öteki üçünü kur.',
    run: async (c) => {
      const Q = dortlu(c);
      const { P, PW, svg } = Q;
      Q.st = { iv: IV(-1, INF, true), dom: 'R', win: [-5, 5] };
      Q.blank('iv'); Q.blank('line'); Q.blank('set');
      const acik = ['line', 'ineq', 'iv', 'set'].map((k) => fadeTo(c, P[k].g, 500));
      await par(c, 'Eşitsizlik verildi: <b>x ≥ −1</b>. Aralığını seç.', { ms: 3200, speak: 'Eşitsizlik verildi: x büyük eşittir eksi bir. Aralığını seç.' }, async () => { await Promise.all(acik); await Q.show('ineq', 500); });
      await c.choice({
        tag: 'Aralık', q: '<span class="m">x ≥ −1</span> için aralık hangisi?',
        options: ['<span class="m">[−1, ∞)</span>', '<span class="m">[−1, ∞]</span>', '<span class="m">(−∞, −1]</span>'], answer: 0,
        right: '−1 dahil: köşeli. ∞ hep yuvarlak.',
        hints: ['', '∞ bir sayı değil; yanında yuvarlak olmalı.', 'Yön ters: büyük sayılar sağdadır.'],
        onPick: (i, ok) => { if (!ok) spawn(c, () => Q.flash('iv', COL.coral)); },
      });
      await Q.show('iv', 400);
      await par(c, 'Sayı doğrusu ve küme de tamamlandı.', { ms: 2800 }, async () => { await Q.show('line', 500); await Q.show('set', 500); });

      await Q.reset();
      Q.st = { iv: IV(-INF, 4, false, false), dom: 'R', win: [0, 8] };
      Q.blank('ineq'); Q.blank('iv'); Q.clear(P.line.body);
      await Promise.all([Q.show('set', 500), fadeTo(c, P.ineq.body, 400), fadeTo(c, P.iv.body, 400)]);
      await c.say('Küme verildi. Sayı doğrusunu sen kur: noktaya ve oka dokun.', { ms: 3800 });
      {
        const pn3 = P.line.d, b = P.line.body, y = pn3.y + 150;
        const ax3 = axis(b, { x0: pn3.x + 40, x1: pn3.x + PW - 40, vmin: 0, vmax: 8, y, left: pn3.x + 18, right: pn3.x + PW - 18, major: [0, 4, 8], minor: [], ls: 24 });
        let dir = 1;
        const rayG = G(b);
        const x4 = ax3.X(4);
        const drawRay = () => {
          Q.clear(rayG);
          const xe = dir > 0 ? ax3.right - 22 : ax3.left + 22;
          S('line', { x1: x4, x2: xe, y1: y, y2: y, stroke: COL.mint, 'stroke-width': 10 }, rayG);
          S('polygon', { points: dir > 0 ? `${xe},${y - 14} ${xe + 22},${y} ${xe},${y + 14}` : `${xe},${y - 14} ${xe - 22},${y} ${xe},${y + 14}`, fill: COL.mint }, rayG);
          S('rect', { x: dir > 0 ? x4 : ax3.left, y: y - 24, width: dir > 0 ? ax3.right - x4 : x4 - ax3.left, height: 48, fill: 'transparent', style: 'cursor:pointer' }, rayG);
        };
        drawRay();
        const d4 = dot(b, x4, y, COL.mint, true, { r: 12 });
        toggler(c, svg, d4, null, '4 noktasını değiştir');
        c.on(rayG, 'click', () => { if (!d4.locked) { dir = -dir; drawRay(); } });
        setOp(b, 0); await fadeTo(c, b, 400);
        let ok3 = false;
        const fb = h('div');
        const check = () => {
          const okDot = !d4.filled, okDir = dir < 0;
          if (okDot && okDir) {
            ok3 = true; d4.locked = true;
            c.feedback(fb, 'ok', '4 <b>hariç</b> (boş nokta), ok sola: <b>(−∞, 4)</b>.');
            return;
          }
          const m = [];
          if (!okDot) m.push('<b>x < 4</b>: 4 dışarıda, nokta boş olmalı.');
          if (!okDir) m.push('4\'ten <b>küçük</b> sayılar solda.');
          c.feedback(fb, 'no', m.join('<br>'));
          spawn(c, () => Q.flash('line', COL.coral));
        };
        const bc = h('button', { class: 'btn', onclick: check }, 'Kontrol et');
        const pn = c.panel('Sıra sende', h('p', { class: 'q', html: '<b>x < 4</b> için sayı doğrusunu kur, sonra <b>Kontrol et</b>.' }), bc, fb);
        await until(c, () => ok3, { solve: async () => { if (d4.filled) { d4.filled = false; await d4.flip(c, false, 250); } dir = -1; drawRay(); check(); await c.wait(400); } });
        await c.wait(800);
        pn.remove();
      }
      await par(c, 'Aralık <b>(−∞, 4)</b>, eşitsizlik <b>x < 4</b>.', { ms: 3000, speak: 'Aralık eksi sonsuzdan dörde, dört dışarıda; eşitsizlik x küçüktür dört.' }, async () => { await Q.show('iv', 400); await Q.show('ineq', 500); });
      await c.say('Eşitsizlik, aralık, doğru, küme: <b>aynı şey</b>.', { ms: 3200 });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ B5 açılışı: kesişim ve birleşim, listelenmiş sayı kümelerinde */
  SC.push({
    title: 'Önce sayarak: ortak olanlar, hepsi',
    goal: 'Kesişim ve birleşimi listelenmiş iki sayı kümesinde gör.',
    run: async (c) => {
      const svg = canvas(c);
      const A = [1, 2, 3, 4], B = [3, 4, 5, 6];
      const ortak = A.filter((v) => B.includes(v));
      const hepsi = [...new Set([...A, ...B])].sort((a, b) => a - b);
      const X = (v) => 225 + (v - 1) * 110;
      const row = (set, y, col, name) => {
        const g = G(svg);
        T(g, 110, y + 12, name + ' =', { s: 36, w: 800, f: col });
        const chips = {};
        set.forEach((v) => {
          chips[v] = S('circle', { cx: X(v), cy: y, r: 32, fill: COL.hole, stroke: col, 'stroke-width': 4 }, g);
          T(g, X(v), y + 11, String(v), { s: 32, w: 800 });
        });
        setOp(g, 0);
        return { g, chips };
      };
      const rA = row(A, 120, COL.amber, 'A'), rB = row(B, 230, COL.sky, 'B');
      const setStr = (xs) => '{' + xs.join(', ') + '}';
      const tI = T(svg, 500, 380, 'A ∩ B = ' + setStr(ortak), { s: 46, w: 800, f: COL.mint, op: 0 });
      const tU = T(svg, 500, 470, 'A ∪ B = ' + setStr(hepsi), { s: 46, w: 800, f: COL.lilac, op: 0 });
      const paint = (vals, col) => c.tween(500, (e) => vals.forEach((v) => [rA, rB].forEach((r) => { if (r.chips[v]) r.chips[v].setAttribute('fill', mix(COL.hole, col, e * 0.55)); })));

      await par(c, 'İki sayı kümesi: <b>A</b> ve <b>B</b>.', { ms: 3200 }, async () => { await fadeTo(c, rA.g, 500); await fadeTo(c, rB.g, 500); });
      await c.choice({
        tag: 'Tahmin et', q: '<b>Hem</b> A’da <b>hem</b> B’de olan sayılar hangileri?', options: ['1 ve 2', '3 ve 4', '5 ve 6'], answer: 1,
        right: 'Evet: 3 ve 4 iki kümede de var.',
        hints: ['1 ve 2 yalnızca A’da.', '', '5 ve 6 yalnızca B’de.'],
      });
      await par(c, 'İkisinde de olanlar: <b>kesişim</b>, A ∩ B.', { ms: 4200, speak: 'İkisinde de olanlar kesişimdir: A kesişim B.' }, async () => { await paint(ortak, COL.mint); await fadeTo(c, tI, 500); });
      await c.choice({
        tag: 'Soru', q: '<b>En az birinde</b> olan kaç sayı var?', options: ['4', '6', '8'], answer: 1,
        right: 'Evet: 1, 2, 3, 4, 5, 6.',
        hints: ['Yalnızca A’yı saydın; B’dekiler de var.', '', '3 ve 4 iki kümede de var; bir kez sayılır.'],
      });
      await par(c, 'En az birinde olanlar: <b>birleşim</b>, A ∪ B.', { ms: 4200, speak: 'En az birinde olanlar birleşimdir: A birleşim B.' }, async () => { await paint(hepsi.filter((v) => !ortak.includes(v)), COL.lilac); await fadeTo(c, tU, 500); });
      c.note(`<b>${setStr(A)} ∩ ${setStr(B)} = ${setStr(ortak)}</b>`, 'Kesişim', 'k9s');
      await c.say('Şimdi aynı işlemler <b>aralıklarda</b>.', { ms: 3000 });
      await c.cont('Devam ›');
    },
  });

  /* iki kapılı sahne satırı (sahne 9 ve 10) */
  function gatesRow(parent, o) {
    const g = G(parent);
    const fy = 168;
    S('line', { x1: 30, x2: 970, y1: fy, y2: fy, stroke: COL.axis, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const g1 = gate(g, o.c1, fy, 140, 128, { label: o.label1, plateW: o.pw1 || 130, fw: 14, lw: 7 });
    const g2 = gate(g, o.c2, fy, 140, 128, { label: o.label2, plateW: o.pw2 || 130, fw: 14, lw: 7 });
    const sym = G(g);
    const path = o.symbol === 'cap' ? 'M-34 36 V0 A34 34 0 0 1 34 0 V36' : 'M-36 -34 V4 A36 36 0 0 0 36 4 V-34';
    const sp = S('path', { d: path, fill: 'none', stroke: o.symCol, 'stroke-width': 11, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#glow)' }, sym);
    at(sym, 445, o.symbol === 'cap' ? 66 : 62);
    const len = sp.getTotalLength();
    sp.setAttribute('stroke-dasharray', len);
    sp.setAttribute('stroke-dashoffset', len);
    return {
      g, g1, g2, sym, c1: o.c1, c2: o.c2, fy,
      drawSym: (c, ms) => c.tween(ms || 1000, (e) => sp.setAttribute('stroke-dashoffset', len * (1 - e)), ease.inOut),
      symGlow: (f) => { sp.style.opacity = 0.35 + 0.65 * f; },
    };
  }
  /* küçük işaret üçgeni + değer etiketi (eksen üzerinde) */
  function marker(parent, ax, y, below) {
    const g = G(parent);
    const tri = S('polygon', { points: below ? '0,0 -11,18 11,18' : '-11,-22 11,-22 0,-4', fill: COL.text }, g);
    const lab = T(g, 0, below ? 46 : -32, '', { s: 24, w: 800, f: COL.text });
    const m = { g, set: (v, col, txt) => { at(g, ax.X(v), y); tri.setAttribute('fill', col || COL.text); lab.style.fill = col || COL.text; lab.textContent = txt != null ? txt : num(v) + ' cm'; } };
    return m;
  }

  /* ------------------------------------------------------------------ 9. Kesişim */
  SC.push({
    title: 'Kesişim ∩: iki kapıdan da geçen',
    goal: '∩ = "ve": ortak kısım. Uç noktada biri bile dışarıda bırakıyorsa boş nokta.',
    run: async (c) => {
      const svg = canvas(c);
      const A = IV(140, 190, true, false), B = IV(160, 200, false, true), AB = inter(A, B);
      const up = G(svg);
      const row = gatesRow(up, { c1: 250, c2: 640, label1: 'BİLET', label2: 'KEMER', symbol: 'cap', symCol: COL.mint, pw1: 110, pw2: 110 });
      const lblA = T(up, 250, 205, 'A: 140 ≤ x < 190', { s: 24, w: 800, f: COL.amber });
      const lblB = T(up, 640, 205, 'B: 160 < x ≤ 200', { s: 24, w: 800, f: COL.sky });
      const kk = kid(up); kk.at(95, 166, 87);
      setOp(up, 0);
      const low = G(svg);
      const AY = 372;
      const ax = axis(low, AX100(AY));
      const sA = ivShape(low, ax, A, 262, COL.amber, { th: 11, r: 11, hidden: true });
      const sB = ivShape(low, ax, B, 300, COL.sky, { th: 11, r: 11, hidden: true });
      const tA = T(low, ax.X(140) - 38, 270, 'A', { s: 28, w: 800, f: COL.amber });
      const tB = T(low, ax.X(160) - 38, 308, 'B', { s: 28, w: 800, f: COL.sky });
      const beams = G(low);
      [160, 190].forEach((v) => S('line', { x1: ax.X(v), x2: ax.X(v), y1: 306, y2: AY - 14, stroke: COL.mint, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, beams));
      const res = ivShape(low, ax, AB, AY, COL.mint, { th: 15, r: 13, hidden: true });
      const mk = marker(low, ax, AY + 56, true); setOp(mk.g, 0);
      [tA, tB, beams].forEach((e) => setOp(e, 0)); setOp(ax.g, 0);
      const eq = T(svg, 500, 462, 'A ∩ B = [140, 190) ∩ (160, 200] = (160, 190)', { s: 34, w: 800, f: COL.mint });
      setOp(eq, 0);
      const ana = G(svg); setOp(ana, 0);

      const walk = async (v, fast) => {
        const okA = has(A, v), okB = has(B, v), H = 0.5 * v;
        const mv = (a, b, ms) => c.tween(fast ? 1 : ms, (e) => kk.at(lerp(a, b, e), 166, H), ease.inOut);
        row.g1.off(); row.g2.off(); kk.mood('idle'); kk.at(95, 166, H);
        mk.set(v, COL.text);
        await mv(95, row.c1 - 100, 800);
        await row.g1.lightTo(c, okA ? COL.mint : COL.coral);
        if (!okA) { kk.mood('no'); return { okA, okB: null }; }
        await mv(row.c1 - 100, row.c2 - 100, 1100);
        await row.g2.lightTo(c, okB ? COL.mint : COL.coral);
        if (!okB) { kk.mood('no'); return { okA, okB }; }
        await mv(row.c2 - 100, 905, 900);
        kk.mood('ok'); row.symGlow(1);
        return { okA, okB };
      };
      const prep = (v) => { row.g1.off(); row.g2.off(); kk.mood('idle'); kk.at(95, 166, 0.5 * v); mk.set(v, COL.text); row.symGlow(0.2); };

      await par(c, 'Hız trenine binmek için <b>iki kapıdan</b> geçmek gerekiyor.', { ms: 3000 }, async () => {
        await fadeTo(c, up, 700);
        await fadeTo(c, ax.g, 500);
      });
      await par(c, 'Birincisi <b>bilet kapısı (A)</b>: boy 140 ve üzeri, 190\'dan kısa.', { ms: 3400, speak: "Birincisi bilet kapısı, A: boy yüz kırk ve üzeri, yüz doksandan kısa." }, async () => {
        row.g1.light(COL.amber); setOp(tA, 1);
        await sA.grow(c, 1200);
        row.g1.off();
      });
      await par(c, 'İkincisi <b>kemer kontrolü (B)</b>: boy 160\'tan uzun, 200 ve altı.', { ms: 3400, speak: "İkincisi kemer kontrolü, B: boy yüz altmıştan uzun, iki yüz ve altı." }, async () => {
        row.g2.light(COL.sky); setOp(tB, 1);
        await sB.grow(c, 1200);
        row.g2.off();
      });
      await par(c, 'Deneyelim: <b>175 cm</b>\'lik çocuk iki kapıdan da geçiyor mu?', { ms: 3200 }, async () => {
        setOp(mk.g, 1); prep(175);
        await walk(175);
      });
      await par(c, 'İkisinden de geçenler: <b>kesişim</b>, <b>∩</b> ile yazılır.', { ms: 5600, speak: 'İkisinden de geçenlerin kümesine kesişim deriz ve kesişim sembolüyle yazarız. Bu sembol zaten bir kapı kemerine benziyor.' }, async () => {
        await row.drawSym(c, 1100);
        row.symGlow(1);
      });
      await par(c, 'Sayı doğrusunda ortak kısım: iki şeridin <b>üst üste bindiği</b> yer.', { ms: 3600 }, async () => {
        await fadeTo(c, beams, 500);
        await res.grow(c, 1300);
      });
      await par(c, 'Sonuç: <b>A ∩ B = (160, 190)</b>. Uçlar neden boş nokta?', { ms: 3200, speak: 'Sonuç: A kesişim B eşittir, yüz altmış ile yüz doksan arası, uçlar dışarıda. Uçlar neden boş nokta?' }, async () => { await fadeTo(c, mk.g, 300, 1, 0); await fadeTo(c, eq, 600); });
      /* uç nokta analizi */
      const rows = [
        { v: 160, txt: '160:  A\'da var ✓, B\'de yok ✗  →  birlikte yok  →  boş ○' },
        { v: 190, txt: '190:  A\'da yok ✗, B\'de var ✓  →  birlikte yok  →  boş ○' },
      ];
      ana.appendChild(T(ana, 500, 510, rows[0].txt, { s: 24, w: 700, f: COL.text }));
      ana.appendChild(T(ana, 500, 544, rows[1].txt, { s: 24, w: 700, f: COL.text }));
      setOp(ana, 1);
      const [a1, a2] = ana.querySelectorAll('text'); setOp(a1, 0); setOp(a2, 0);
      const ring = S('circle', { r: 24, fill: 'none', stroke: COL.coral, 'stroke-width': 3.5 }, low); setOp(ring, 0);
      for (let i = 0; i < 2; i++) {
        const r = rows[i];
        ring.setAttribute('cx', ax.X(r.v)); ring.setAttribute('cy', AY);
        await par(c, i === 0 ? '<b>160</b>: A\'da var, B\'de yok. Biri bile dışarıda bırakıyorsa <b>boş nokta</b>.' : '<b>190</b>: A\'da yok, B\'de var. Yine birlikte yok: <b>boş nokta</b>.', { ms: 3600 }, async () => {
          await Promise.all([fadeTo(c, ring, 400), fadeTo(c, i === 0 ? a1 : a2, 500)]);
        });
        await fadeTo(c, ring, 300, 1, 0);
      }
      c.note('<b>A ∩ B</b>: hem A\'da hem B\'de olanlar ("ve").', 'Kural', 'k9');

      /* etkileşim 1: dört özel değer */
      setOp(ana, 0); setOp(eq, 0); setOp(mk.g, 1);
      await c.say('Şimdi dört özel boyu sına. Çocuk iki kapıdan da geçer mi?', { ms: 2600 });
      const q = serial(c);
      const trials = [
        { v: 150, a: 1, hint: ['Bilet kapısı açık (A ✓) ama kemer kapalı: 150, 160\'tan uzun değil.', ''], right: 'Doğru: bilet kapısı açık, kemer kapalı → birlikte yok.' },
        { v: 160, a: 1, hint: ['Kemer "uzun" diyor; tam 160 yetmiyor. Boş nokta!', ''], right: 'Doğru: 160, B\'de boş nokta → kemer kapalı.' },
        { v: 175, a: 0, hint: ['', 'İki kapı da açık: 175, hem [140, 190) içinde hem (160, 200] içinde.'], right: 'Doğru: iki kapıdan da geçer, 175 ortak kısımda.' },
        { v: 190, a: 1, hint: ['Bilet kapısı 190\'dan kısa istiyor; tam 190 yetmiyor.', ''], right: 'Doğru: 190, A\'da yok → bilet kapısı kapalı.' },
      ];
      for (const t of trials) {
        prep(t.v);
        await c.choice({
          tag: 'Tahmin et', q: `Çocuk tam <b>${t.v} cm</b>. İki kapıdan da geçer mi?`, options: ['Geçer', 'Geçemez'], answer: t.a,
          right: t.right, hints: t.hint, onPick: () => q.run(() => walk(t.v)),
        });
        await q.idle();
      }
      /* serbest kaydırıcı */
      let sv = 175;
      const instant = (v) => {
        const okA = has(A, v), okB = has(B, v);
        row.g1.light(okA ? COL.mint : COL.coral); row.g2.light(okB ? COL.mint : COL.coral);
        mk.set(v, okA && okB ? COL.mint : COL.coral);
        const px = !okA ? row.c1 - 100 : (!okB ? row.c2 - 100 : 905);
        kk.at(px, 166, 0.5 * v); kk.mood(okA && okB ? 'ok' : 'no');
        row.symGlow(okA && okB ? 1 : 0.2);
      };
      await c.say('Şimdi serbestçe dene: her konumda iki kapı lambası <b>ayrı ayrı</b> yanar.', { ms: 3200 });
      const sl = c.slider({ label: 'Boy (cm)', min: 100, max: 200, step: 0.5, value: 175, fmt: (x) => num(x, 1), onInput: (x) => { sv = x; instant(x); } });
      await c.cont('Devam ›');
      sl.remove();

      /* etkileşim 2: ∩ hangi sözcük */
      const un = ivShape(low, ax, IV(140, 200, true, true), AY, COL.lilac, { th: 15, nodots: true, hidden: true });
      await c.choice({
        tag: 'Eşleştir', q: '<b>∩</b> hangi sözcüğe karşılık gelir?', options: ['ve', 'veya'], answer: 0,
        right: 'Evet: <b>ve</b>. Kemer = iki kapıdan da geçmek.',
        hints: ['', 'Bu "en az birinden geçen" olurdu. Biz "ikisinden de" geçmesini istiyoruz.'],
        onPick: (i) => { if (i === 1) q.run(async () => { await un.grow(c, 1200); eq.textContent = 'veya: [140, 200]  ✗  (bu birleşim olurdu)'; eq.style.fill = COL.lilac; await fadeTo(c, eq, 300); await c.wait(900); await fadeTo(c, un.g, 400, 1, 0); await fadeTo(c, eq, 300, 1, 0); }); },
      });
      await q.idle();

      /* soyutlama: [1,5) ∩ (3,8] */
      await Promise.all([fadeTo(c, up, 600, 1, 0), fadeTo(c, low, 600, 1, 0)]);
      up.remove(); low.remove(); ring.remove();
      const g2 = G(svg);
      const ax2 = axis(g2, AX10(318));
      const A2 = IV(1, 5, true, false), B2 = IV(3, 8, false, true), R2 = inter(A2, B2);
      const s2A = ivShape(g2, ax2, A2, 190, COL.amber, { th: 11, r: 11, hidden: true });
      const s2B = ivShape(g2, ax2, B2, 242, COL.sky, { th: 11, r: 11, hidden: true });
      const bm2 = G(g2);
      [3, 5].forEach((v) => S('line', { x1: ax2.X(v), x2: ax2.X(v), y1: 248, y2: 304, stroke: COL.mint, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, bm2));
      setOp(bm2, 0);
      const s2R = ivShape(g2, ax2, R2, 318, COL.mint, { th: 15, r: 13, hidden: true });
      T(g2, ax2.X(1) - 40, 198, 'A', { s: 28, w: 800, f: COL.amber }); T(g2, ax2.X(3) - 40, 250, 'B', { s: 28, w: 800, f: COL.sky });
      const eq2 = T(g2, 500, 438, `${ivStr(A2)} ∩ ${ivStr(B2)} = ${ivStr(R2)}`, { s: 44, w: 800, f: COL.mint });
      setOp(eq2, 0);
      const why = G(g2); setOp(why, 0);
      multi(why, 500, 490, ['3, (3, 8] içinde yok  →  boş ○', '5, [1, 5) içinde yok  →  boş ○'], { s: 26, w: 700, lh: 38 });
      setOp(ax2.g, 0);
      await par(c, 'Aynı mantık sayılarla da çalışır: <b>[1, 5) ∩ (3, 8]</b>.', { ms: 3000, speak: 'Aynı mantık sayılarla da çalışır: bir ile beş arası, beş dışarıda, kesişim, üç ile sekiz arası, üç dışarıda.' }, async () => {
        await fadeTo(c, ax2.g, 500);
        await s2A.grow(c, 900);
        await s2B.grow(c, 900);
      });
      await par(c, 'Ortak kısım <b>(3, 5)</b>: 3 ikinci aralıkta yok, 5 birinci aralıkta yok.', { ms: 3800 }, async () => {
        await fadeTo(c, bm2, 400);
        await s2R.grow(c, 1100);
        await fadeTo(c, eq2, 500);
        await fadeTo(c, why, 500);
      });
      await c.wait(600);

      /* etkileşim 3: [2,6] ∩ (4,9) */
      await Promise.all([fadeTo(c, g2, 500, 1, 0)]);
      g2.remove();
      const g3 = G(svg);
      const ax3 = axis(g3, AX10(318));
      const A3 = IV(2, 6, true, true), B3 = IV(4, 9, false, false), T3 = inter(A3, B3);
      ivShape(g3, ax3, A3, 190, COL.amber, { th: 11, r: 11 }); ivShape(g3, ax3, B3, 242, COL.sky, { th: 11, r: 11 });
      T(g3, ax3.X(2) - 40, 198, 'A', { s: 28, w: 800, f: COL.amber }); T(g3, ax3.X(4) - 40, 250, 'B', { s: 28, w: 800, f: COL.sky });
      S('line', { x1: ax3.X(4), x2: ax3.X(6), y1: 318, y2: 318, stroke: COL.mint, 'stroke-width': 15 }, g3);
      const e4 = dot(g3, ax3.X(4), 318, COL.mint, true, { r: 13 }), e6 = dot(g3, ax3.X(6), 318, COL.mint, false, { r: 13 });
      const live = T(g3, 500, 440, '', { s: 42, w: 800, f: COL.mint });
      const liveIneq = T(g3, 500, 494, '', { s: 32, w: 700 });   // aynı sonucun eşitsizlik yazımı
      const refresh = () => {
        const r = IV(4, 6, e4.filled, e6.filled);
        live.textContent = `${ivStr(A3)} ∩ ${ivStr(B3)} = ${ivStr(r)}`;
        liveIneq.textContent = ineqStr(r);
      };
      refresh();
      toggler(c, svg, e4, refresh, '4 noktasını değiştir'); toggler(c, svg, e6, refresh, '6 noktasını değiştir');
      setOp(g3, 0);
      await par(c, 'Sıra sende: <b>[2, 6] ∩ (4, 9)</b> ortak kısmının uçlarını işaretle.', { ms: 3200, speak: 'Sıra sende: iki ile altı arası kapalı, kesişim, dört ile dokuz arası açık. Ortak kısmın uçlarını işaretle.' }, () => fadeTo(c, g3, 600));
      const fb = h('div'); let solved = false;
      const check = () => {
        const m = [];
        if (e4.filled) m.push('<b>4</b>: [2, 6] içinde var ama (4, 9) içinde yok. Biri bile dışarıda bırakıyorsa → boş nokta ○.');
        if (!e6.filled) m.push('<b>6</b>: [2, 6] içinde de, (4, 9) içinde de var. İkisinde de varsa → dolu nokta ●.');
        if (!m.length) { solved = true; e4.locked = e6.locked = true; c.feedback(fb, 'ok', 'Doğru: <b>(4, 6]</b>. x ∈ [2, 6] ve x ∈ (4, 9) → 4 < x ≤ 6.'); return; }
        c.feedback(fb, 'no', m.join('<br>'));
      };
      const bc = h('button', { class: 'btn', onclick: check }, 'Kontrol et');
      const pn = c.panel('Sen bul', h('p', { class: 'q', html: '4 ve 6 noktalarına dokunarak <b>boş ↔ dolu</b> ayarla, sonra <b>Kontrol et</b>.' }), bc, fb);
      await until(c, () => solved, { solve: async () => { await Promise.all([e4.flip(c, false, 250), e6.flip(c, true, 250)]); e4.filled = false; e6.filled = true; refresh(); check(); await c.wait(500); } });
      await c.wait(900);
      pn.remove();
      await c.say('Ortak kısım <b>(4, 6]</b>: 4 hariç (boş nokta), 6 dahil (dolu nokta).', { ms: 3000, speak: 'Ortak kısım: dört ile altı arası; dört hariç, altı dahil.' });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 10. Birleşim */
  SC.push({
    title: 'Birleşim ∪: en az birinden geçen',
    goal: '∪ = "veya": toplam kısım. Ayrık parçalar tek aralık gibi yazılamaz.',
    run: async (c) => {
      const svg = canvas(c);
      const M = IV(100, 130, true, true), Rr = IV(140, 190, true, false);
      const up = G(svg);
      const row = gatesRow(up, { c1: 215, c2: 675, label1: 'MİNİ TREN', label2: 'ROLLER COASTER', symbol: 'cup', symCol: COL.lilac, pw1: 150, pw2: 220 });
      const lblM = T(up, 215, 205, 'M: 100 ≤ x ≤ 130', { s: 24, w: 800, f: COL.orange });
      const lblR = T(up, 675, 205, 'R: 140 ≤ x < 190', { s: 24, w: 800, f: COL.sky });
      const status = T(up, 445, 242, '', { s: 26, w: 700 });
      const kk = kid(up); kk.at(445, 166, 61);
      setOp(up, 0);
      const low = G(svg);
      const AY = 372;
      const ax = axis(low, AX100(AY));
      setOp(ax.g, 0);
      const bandsG = G(low);
      const unG = G(low);
      let shapes = [];
      const drawBands = (defsB) => {
        while (bandsG.firstChild) bandsG.removeChild(bandsG.firstChild);
        shapes = defsB.map((d) => {
          const sh = ivShape(bandsG, ax, d.iv, d.y, d.col, { th: 11, r: 11, hidden: !!d.hidden });
          T(bandsG, ax.X(d.iv.a) - 38, d.y + 8, d.name, { s: 28, w: 800, f: d.col });
          return sh;
        });
        return shapes;
      };
      const unionSegs = (P, Q) => {
        if (P.a > Q.a) { const t = P; P = Q; Q = t; }
        const touch = Q.a < P.b || (Q.a === P.b && (P.lb || Q.la));
        if (touch) {
          const top = P.b > Q.b ? { b: P.b, lb: P.lb } : P.b < Q.b ? { b: Q.b, lb: Q.lb } : { b: P.b, lb: P.lb || Q.lb };
          return [{ a: P.a, b: top.b, la: P.la, lb: top.lb }];
        }
        return [P, Q];
      };
      const unionStr = (segs) => segs.map(ivStr).join(' ∪ ');
      const drawUnion = async (segs, animate) => {
        while (unG.firstChild) unG.removeChild(unG.firstChild);
        const sh = segs.map((sg) => ivShape(unG, ax, IV(sg.a, sg.b, sg.la, sg.lb), AY, COL.lilac, { th: 15, r: 13, hidden: !!animate }));
        if (animate) { for (const s_ of sh) await s_.grow(c, 900); }
        return sh;
      };
      const mk = marker(low, ax, AY + 56, true); setOp(mk.g, 0);
      const lamps = (v) => {
        const okM = has(M, v), okR = has(Rr, v);
        row.g1.light(okM ? COL.mint : COL.coral); row.g2.light(okR ? COL.mint : COL.coral);
        row.symGlow(okM || okR ? 1 : 0.15);
        kk.mood(okM || okR ? 'ok' : 'no');
        return { okM, okR };
      };
      const setKid = (v) => { kk.at(445, 166, 0.45 * v); mk.set(v, COL.text); };
      const eq = T(svg, 500, 524, '', { s: 34, w: 800, f: COL.lilac });
      setOp(eq, 0);

      await par(c, '<b>Mini Tren</b>: boyu 100 ile 130 cm arasındakilere; uçlar dahil.', { ms: 5000, speak: 'Lunaparkta iki ayrı oyuncak var. Mini Tren: boyu yüz ile yüz otuz santimetre arasındaki çocuklara; yüz ve yüz otuz dahil.' }, async () => {
        await Promise.all([fadeTo(c, up, 700), fadeTo(c, ax.g, 600)]);
        drawBands([{ iv: M, y: 262, col: COL.orange, name: 'M', hidden: true }, { iv: Rr, y: 300, col: COL.sky, name: 'R', hidden: true }]);
        row.g1.light(COL.orange);
        await shapes[0].grow(c, 1200);
        row.g1.off();
      });
      await par(c, '<b>Dev Roller Coaster</b>: 140 cm ve üzeri, 190\'dan kısa olanlara.', { ms: 3800, speak: 'Dev Roller Coaster: yüz kırk santimetre ve üzeri, yüz doksandan kısa olanlara.' }, async () => {
        row.g2.light(COL.sky);
        await shapes[1].grow(c, 1200);
        row.g2.off();
      });
      await par(c, 'En az birine binebilenler: <b>birleşim</b>, <b>∪</b> ile yazılır.', { ms: 7600, speak: 'Bir çocuk bu iki oyuncaktan en az birine binebiliyorsa veya mantığı çalışır. Buna birleşim deriz. Birleşim sembolü, kollarıyla her şeyi toplayan bir bardağa benziyor.' }, async () => {
        await row.drawSym(c, 1100); row.symGlow(0.6);
      });
      await par(c, 'Sayı doğrusunda iki şeridi <b>toplarız</b>: ana doğruya lila çizgi olarak yansır.', { ms: 3600 }, async () => {
        await drawUnion(unionSegs(M, Rr), true);
      });
      /* 135 cm: boşluk */
      const gapG = G(low);
      S('polygon', { points: `${ax.X(135) - 9},${AY + 52} ${ax.X(135) + 9},${AY + 52} ${ax.X(135)},${AY + 36}`, fill: COL.coral }, gapG);
      T(gapG, ax.X(135), AY + 82, '135 cm: hiçbirine giremez', { s: 24, w: 800, f: COL.coral });
      setOp(gapG, 0);
      eq.textContent = 'M ∪ R = [100, 130] ∪ [140, 190)';
      await par(c, 'Aradaki <b>boşluğa</b> bak: 135 cm\'lik çocuk hiçbirine giremez. Birleşim <b>iki parça</b>.', { ms: 4200 }, async () => {
        setKid(135); lamps(135);
        await Promise.all([fadeTo(c, gapG, 500), fadeTo(c, eq, 600)]);
      });
      c.note('<b>A ∪ B</b>: en az birinde olanlar ("veya").', 'Kural', 'k10a');

      /* etkileşim 1: 135 cm */
      const q = serial(c);
      await c.choice({
        tag: 'Tahmin et', q: '<b>135 cm</b>\'lik çocuk hangi oyuncağa binebilir?', options: ['Mini Tren', 'Roller Coaster', 'İkisi de', 'Hiçbiri'], answer: 3,
        right: 'Doğru: 135, M\'nin de R\'nin de dışında. Birleşimde yok.',
        hints: ['Mini Tren 130 cm\'de bitiyor.', 'R, 140\'ta başlıyor.', 'İkisinde de olması kesişim (∩) olurdu; burada hiçbirinde.', ''],
        onPick: (i, ok) => q.run(async () => { if (!ok) { kk.mood('no'); await c.wait(700); } }),
      });
      await q.idle();

      /* etkileşim 2: sadeleştir */
      const merged = ivShape(unG, ax, IV(100, 190, true, false), AY - 36, COL.coral, { th: 8, r: 9, hidden: true });
      await c.choice({
        tag: 'Sadeleştir', q: '<span class="m">[100, 130] ∪ [140, 190)</span> ifadesi tek parçaya sadeleşir mi?', options: ['Evet: <span class="m">[100, 190)</span>', 'Hayır, sadeleşmez (iki ayrı parça)'], answer: 1,
        right: 'Doğru: arada boşluk var. Ayrık parçalar tek aralık gibi yazılamaz.',
        hints: ['Peki 135 nerede? [100, 190) 135\'i de içerir ama 135 hiçbir oyuncağa giremiyor.', ''],
        onPick: (i) => { if (i === 0) q.run(async () => { await merged.grow(c, 900); await c.wait(800); await fadeTo(c, merged.g, 400, 1, 0); }); },
      });
      await q.idle();
      merged.g.remove();

      /* dönüşüm: 140 noktası kaynaşır */
      await Promise.all([fadeTo(c, up, 600, 1, 0), fadeTo(c, gapG, 400, 1, 0), fadeTo(c, mk.g, 400, 1, 0), fadeTo(c, bandsG, 500, 1, 0), fadeTo(c, unG, 500, 1, 0)]);
      let A1 = IV(100, 140, true, false), B1 = IV(140, 190, true, false);
      drawBands([{ iv: A1, y: 262, col: COL.orange, name: 'A' }, { iv: B1, y: 300, col: COL.sky, name: 'B' }]);
      let segs = unionSegs(A1, B1);
      await drawUnion(segs, false);
      const dB = shapes[1].d1;
      const beam140 = S('line', { x1: ax.X(140), x2: ax.X(140), y1: 270, y2: AY - 18, stroke: COL.lilac, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, low);
      eq.textContent = `${ivStr(A1)} ∪ ${ivStr(B1)} = ${unionStr(segs)}`; eq.style.fill = COL.lilac;
      const eqY = 190;
      eq.setAttribute('y', eqY); eq.setAttribute('font-size', 40);
      const note140 = T(svg, 500, 232, '', { s: 26, w: 700, f: COL.mute });
      const txtFor = () => (segs.length === 1 ? '140 ikinci aralıkta var: parçalar kaynaştı.' : '140 hiçbirinde yok: lila çizgide delik kaldı.');
      note140.textContent = txtFor();
      await Promise.all([fadeTo(c, bandsG, 500), fadeTo(c, unG, 500), fadeTo(c, eq, 500), fadeTo(c, note140, 500)]);
      await c.say('Aralıklar <b>değiyor</b>: 140 ikincisinde var, parçalar kaynaşır: <b>[100, 190)</b>.', { ms: 6200, speak: 'Şimdi iki aralık birbirine değiyor. Yüz kırk ikinci aralıkta var; parçalar tek aralıkta kaynaşır: yüz ile yüz doksan arası, yüz doksan dışarıda.' });
      let seenF = true, seenE = false;
      const upd = async () => {
        B1 = IV(140, 190, dB.filled, false);
        segs = unionSegs(A1, B1);
        await drawUnion(segs, false);
        eq.textContent = `${ivStr(A1)} ∪ ${ivStr(B1)} = ${unionStr(segs)}`;
        note140.textContent = txtFor();
        if (!dB.filled) seenE = true; else seenF = true;
        eq.style.fill = COL.lilac;
      };
      toggler(c, svg, dB, () => { q.run(upd); }, '140 noktasını değiştir');
      await c.say('B şeridinin sol ucundaki <b>140</b>\'a dokun. Birleşim nasıl değişiyor?', { ms: 3800, speak: 'Şimdi B şeridinin sol ucundaki yüz kırk noktasına dokun: dolu ya da boş. Birleşim nasıl değişiyor?' });
      await until(c, () => seenE && seenF && dB.filled === false || (seenE && seenF), { solve: async () => { dB.filled = false; dB.set(false); await upd(); dB.filled = true; dB.set(true); await upd(); } });
      await q.idle();
      await c.choice({
        tag: 'Tahmin et', q: '<b>140 cm</b>\'lik çocuk hangi durumda bir oyuncağa biner?', options: ['Yalnız B\'de 140 dolu iken', 'Yalnız B\'de 140 boş iken', 'Her iki durumda', 'Hiçbirinde'], answer: 0,
        right: 'Doğru: A\'da 140 boş. Yalnız B\'de 140 dolu iken birleşimde olur; boşsa iki kapıda da dışarıda kalır.',
        hints: ['', 'Tersi: B\'de 140 boşsa A\'da da yok, yani hiçbirinde yok.', 'A\'da 140 boş nokta. Her iki durumda olmaz.', 'B\'de 140 dolu olunca biner.'],
      });
      c.note('<b>[100, 140) ∪ [140, 190) = [100, 190)</b>: ortak uç doluysa kaynaşır.', 'Kural', 'k10');

      /* "veya" tek seçenek mi? */
      await Promise.all([fadeTo(c, bandsG, 400, 1, 0), fadeTo(c, unG, 400, 1, 0), fadeTo(c, beam140, 400, 1, 0), fadeTo(c, eq, 300, 1, 0), fadeTo(c, note140, 300, 1, 0)]);
      beam140.remove();
      const A4 = IV(120, 160, true, true), B4 = IV(150, 180, true, true);
      drawBands([{ iv: A4, y: 262, col: COL.orange, name: 'A' }, { iv: B4, y: 300, col: COL.sky, name: 'B' }]);
      const seg4 = unionSegs(A4, B4);
      await drawUnion(seg4, false);
      eq.textContent = `[120, 160] ∪ [150, 180] = ${unionStr(seg4)}`; eq.style.fill = COL.lilac;
      eq.setAttribute('y', 190);
      setOp(bandsG, 0); setOp(unG, 0);
      await Promise.all([fadeTo(c, bandsG, 400), fadeTo(c, unG, 400), fadeTo(c, eq, 400)]);
      setOp(mk.g, 1); mk.set(125, COL.text);
      await c.choice({
        tag: 'Tahmin et', q: '<b>125 cm</b> Mini Tren\'e biner, Roller Coaster\'a binemez. 125 birleşimin içinde mi?', options: ['Evet', 'Hayır'], answer: 0,
        right: 'Evet: birleşimde en az birinde olması yeter.', hints: ['', 'Mini Tren\'e biniyor: bir parçada olması yeter.'],
      });
      mk.set(155, COL.mint);
      await c.choice({
        tag: 'Tahmin et', q: '<b>A = [120, 160]</b> ve <b>B = [150, 180]</b> için 155 cm: <b>iki oyuncağa da</b> biner. Birleşimde içeride mi?', options: ['Evet, yine içeride', 'Hayır, "veya" tek seçenek demektir'], answer: 0,
        right: 'Evet. Matematikte "veya", <b>en az biri</b> demek; ikisi de olabilir.', hints: ['', 'Matematikte "veya" tek seçenek anlamına gelmez: en az biri yeterli, ikisi de olabilir.'],
      });
      await c.say('Birleşim için <b>en az biri</b> yeter; kesişim için ikisi de gerekir.', { ms: 3200 });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 11. Tuzaklar */
  SC.push({
    title: 'Boş küme ve tek nokta',
    goal: '∅ ile {5} farklıdır; aralıkta önce küçük, sonra büyük sayı yazılır.',
    run: async (c) => {
      const svg = canvas(c);
      const clearG = (g) => { while (g.firstChild) g.removeChild(g.firstChild); };
      const statusRow = (parent, y, parts) => {
        const g = G(parent);
        const toks = parts.map((p) => T(g, 0, y, p.t, { a: 'start', s: 30, w: 700, f: p.f || COL.text }));
        const lay = layoutRow(toks, 500, 30);
        toks.forEach((t, i) => t.setAttribute('x', lay[i].x));
        return g;
      };

      /* ---------- Bölüm A: 5 < x < 2 ---------- */
      const gA = G(svg);
      const axA = axis(gA, AX10(392));
      const rMint = ivShape(gA, axA, IV(5, INF, false), 296, COL.mint, { th: 10, r: 12, hidden: true });
      const rAmb = ivShape(gA, axA, IV(-INF, 2, false, false), 338, COL.amber, { th: 10, r: 12, hidden: true });
      const topT = G(gA);
      const t1 = T(topT, 0, 120, "5'ten büyük", { a: 'start', s: 40, w: 800, f: COL.mint });
      const t2 = T(topT, 0, 120, 've', { a: 'start', s: 36, w: 600, f: COL.mute });
      const t3 = T(topT, 0, 120, "2'den küçük", { a: 'start', s: 40, w: 800, f: COL.amber });
      const t4 = T(topT, 0, 120, '?', { a: 'start', s: 44, w: 800, f: COL.text });
      const lA = layoutRow([t1, t2, t3, t4], 500, 22);
      [t1, t2, t3, t4].forEach((t, i) => t.setAttribute('x', lA[i].x));
      const eqA = T(gA, 500, 215, '5 < x < 2', { s: 60, w: 800, f: COL.text });
      setOp(gA, 0); setOp(topT, 0); setOp(eqA, 0);
      const mkA = marker(gA, axA, 392 - 14); setOp(mkA.g, 0);
      await par(c, '<b>5\'ten büyük</b> ve <b>2\'den küçük</b> bir sayı: <b>5 < x < 2</b>.', { ms: 6200, speak: 'Bazen hiçbir çocuk iki kuralı birden sağlayamaz. Boy beşten büyük ve aynı zamanda ikiden küçük olsun: beş küçüktür x küçüktür iki.' }, async () => {
        await Promise.all([fadeTo(c, gA, 500), fadeTo(c, topT, 600), fadeTo(c, eqA, 600)]);
        rMint.hide(); rAmb.hide();
        await Promise.all([rMint.grow(c, 1300), rAmb.grow(c, 1300)]);
      });
      await c.say('İki çizgi <b>uzaklaşıyor</b>; hiçbir yerde üst üste binmiyor.', { ms: 4400 });
      const attempts = [
        { v: 6, a: true, b: false }, { v: 1, a: false, b: true }, { v: 3.5, a: false, b: false },
      ];
      let stRow = null;
      for (const at_ of attempts) {
        if (stRow) stRow.remove();
        setOp(mkA.g, 1); mkA.set(at_.v, COL.text);
        stRow = statusRow(gA, 262, [
          { t: `x = ${num(at_.v)}:`, f: COL.text },
          { t: `5'ten büyük ${at_.a ? '✓' : '✗'}`, f: at_.a ? COL.mint : COL.coral },
          { t: `2'den küçük ${at_.b ? '✓' : '✗'}`, f: at_.b ? COL.mint : COL.coral },
        ]);
        await c.say(`<b>${num(at_.v)}</b>: ${at_.a ? '5\'ten büyük' : '5\'ten büyük değil'}, ${at_.b ? '2\'den küçük' : '2\'den küçük değil'}.`, { ms: 2600 });
      }
      stRow.remove(); setOp(mkA.g, 0);
      const emp = G(gA);
      const eT = T(emp, 380, 258, '∅', { s: 120, w: 800, f: COL.coral });
      T(emp, 500, 232, '=', { s: 60, w: 700, f: COL.mute });
      const eB = T(emp, 640, 258, '{ }', { s: 90, w: 800, f: COL.coral });
      setOp(emp, 0);
      await par(c, 'Böyle bir sayı yok: <b>∅</b>. Boş küme <b>{0}</b> değildir.', { ms: 5600, speak: 'Böyle bir sayı yok. Çözüm kümesi boştur. Boş küme, içinde sıfır olan küme değildir; içinde hiçbir şey yok.' }, () => fadeTo(c, emp, 700));
      c.note('Elemanı olmayan küme: <b>∅</b>. <b>{0}</b> boş küme değildir.', 'Kural', 'k11a');
      await c.wait(900);

      /* ---------- Bölüm B: dokunan aralıklar ---------- */
      await fadeTo(c, gA, 500, 1, 0); gA.remove();
      const gB = G(svg);
      const cases = [
        { A: IV(2, 5, true, false), B: IV(5, 9, true, true), tag: 'Durum 1' },
        { A: IV(2, 5, true, true), B: IV(5, 9, true, true), tag: 'Durum 2' },
        { A: IV(2, 5, false, false), B: IV(5, 9, false, false), tag: 'Durum 3' },
      ];
      const X0 = 70, X1 = 700;
      const rows = cases.map((cs, i) => {
        const oy = 6 + i * 168;
        const g = G(gB);
        const ax = axis(g, { x0: X0, x1: X1, vmin: 0, vmax: 10, y: oy + 124, left: 36, right: 724, major: [2, 5, 9], minor: [], ls: 24 });
        T(g, 30, oy + 36, cs.tag, { a: 'start', s: 24, w: 800, f: COL.mute });
        const ex = T(g, 400, oy + 40, `${ivStr(cs.A)} ∩ ${ivStr(cs.B)}`, { s: 36, w: 800 });
        const sA = ivShape(g, ax, cs.A, oy + 70, COL.amber, { th: 9, r: 9, hidden: true });
        const sB = ivShape(g, ax, cs.B, oy + 96, COL.sky, { th: 9, r: 9, hidden: true });
        const R_ = inter(cs.A, cs.B);
        const rk = kid(g); rk.at(790, oy + 122, 54);
        const lampC = S('circle', { cx: 850, cy: oy + 90, r: 18, fill: COL.axis }, g);
        const lampT = T(g, 850, oy + 98, '', { s: 26, w: 900, f: COL.ink });
        const rt = T(g, 925, oy + 96, '= ' + ivStr(R_), { s: 44, w: 800, f: COL.mint });
        setOp(rt, 0); setOp(g, 0); setOp(rk.g, 0); setOp(lampC, 0); setOp(lampT, 0);
        return { g, ax, sA, sB, R_, rt, rk, lampC, lampT, oy, cs, ex };
      });
      /* 5 cm kesen imleç */
      const cur = G(gB);
      const curLine = S('line', { x1: 0, x2: 0, y1: 20, y2: 500, stroke: COL.text, 'stroke-width': 2.5, 'stroke-dasharray': '6 6', opacity: 0.8 }, cur);
      const curLab = T(cur, 0, 14, '', { s: 24, w: 800, f: COL.text });
      setOp(cur, 0);
      const X10 = (v) => X0 + (X1 - X0) * v / 10;
      const setCur = (v) => {
        curLine.setAttribute('x1', X10(v)); curLine.setAttribute('x2', X10(v)); curLab.setAttribute('x', X10(v)); curLab.textContent = num(v) + ' cm';
        rows.forEach((r) => {
          const inn = !isEmpty(r.R_) && has(r.R_, v);
          r.lampC.setAttribute('fill', inn ? COL.mint : COL.coral); r.lampT.textContent = inn ? '✓' : '✗';
          r.rk.mood(inn ? 'ok' : 'no');
        });
      };
      const showCase = async (r, withResult) => {
        await fadeTo(c, r.g, 500);
        await Promise.all([r.sA.grow(c, 900), r.sB.grow(c, 900)]);
        if (withResult) await fadeTo(c, r.rt, 500);
      };
      const showLamp = (r) => Promise.all([fadeTo(c, r.lampC, 300), fadeTo(c, r.lampT, 300), fadeTo(c, r.rk.g, 300)]);

      await par(c, '<b>Dokunan aralıklar</b>: biri 5\'te bitiyor, öteki 5\'te başlıyor.', { ms: 5000 }, () => showCase(rows[0], false));
      const q = serial(c);
      await c.choice({
        tag: 'Tahmin et', q: '<span class="m">[2, 5) ∩ [5, 9]</span> sonucu ne?', options: ['<span class="m">{5}</span>', '<span class="m">∅</span>', '<span class="m">[2, 9]</span>'], answer: 1,
        right: 'Doğru: 5, [2, 5) içinde yok; ortak eleman yok → <b>∅</b>.',
        hints: ['5, [2, 5) kümesinin elemanı değil (orada boş nokta). Biri bile dışarıda bırakıyorsa ortak değil.', '', 'Bu birleşim (∪) olurdu. Biz ortak kısmı (∩) arıyoruz.'],
        onPick: (i, ok) => q.run(async () => {
          if (i === 0) { const rg = ring5(rows[0]); await fadeTo(c, rg, 300); await c.wait(900); await fadeTo(c, rg, 300, 1, 0); rg.remove(); }
        }),
      });
      await q.idle();
      await fadeTo(c, rows[0].rt, 500); await showLamp(rows[0]);
      await showCase(rows[1], false);
      await c.choice({
        tag: 'Bul', q: '<span class="m">[2, 5] ∩ [5, 9]</span> kümesinde kaç eleman var?', options: ['0', '1', 'Sonsuz'], answer: 1,
        right: 'Doğru: 5 ikisinde de dolu nokta → tam <b>bir</b> eleman: {5}.',
        hints: ['5 iki aralıkta da dolu nokta: ortak bir eleman var.', '', 'İki aralık yalnız bir noktada değiyor; ortak kısım sonsuz değil, tek nokta.'],
      });
      await fadeTo(c, rows[1].rt, 500); await showLamp(rows[1]);
      await par(c, 'Üçüncüde iki uç da boş: <b>(2, 5) ∩ (5, 9) = ∅</b>.', { ms: 3200, speak: 'Üçüncü durumda iki uç da boş: iki ile beş arası, kesişim, beş ile dokuz arası, eşittir boş küme.' }, async () => { await showCase(rows[2], true); await showLamp(rows[2]); });
      function ring5(r) {
        const rg = G(r.g);
        S('circle', { cx: X10(5), cy: r.oy + 70, r: 24, fill: 'none', stroke: COL.coral, 'stroke-width': 3.5 }, rg);
        setOp(rg, 0);
        return rg;
      }
      /* imleç: tam 5 cm */
      await c.say('Çocuğu <b>tam 5</b>\'e getir: lamba yalnız bir durumda yanar.', { ms: 3800 });
      await fadeTo(c, cur, 400);
      setCur(4);
      let at5 = false;
      const sl = c.slider({ label: 'Boy (cm)', min: 0, max: 10, step: 0.5, value: 4, fmt: (x) => num(x, 1), onInput: (x) => { setCur(x); if (x === 5) at5 = true; } });
      await until(c, () => at5, { solve: async () => { sl.set(5); await c.wait(500); } });
      await c.wait(1500);
      await c.cont('Devam ›');
      sl.remove();
      c.note('<b>[2, 5] ∩ [5, 9] = {5}</b> · <b>[2, 5) ∩ [5, 9] = ∅</b>', 'Kural', 'k11b');

      await c.say('Tek parantez farkı: biri <b>{5}</b>, öteki <b>∅</b>.', { ms: 3400 });
    },
  });

  /* ------------------------------------------------------------------ 12. Tamir atölyesi */
  SC.push({
    title: 'Tamir atölyesi: hatalı tabelalar',
    goal: 'Tüm yanlış kavramaları bir arada yakala: hatalı tabelayı bul ve düzelt.',
    run: async (c) => {
      const svg = canvas(c);
      const gar = G(svg);
      S('path', { d: 'M40 14 Q500 40 960 14', fill: 'none', stroke: '#39466f', 'stroke-width': 3 }, gar);
      const bulbs = [];
      for (let i = 0; i < 12; i++) {
        const t = i / 11;
        const px = (1 - t) * (1 - t) * 40 + 2 * t * (1 - t) * 500 + t * t * 960, py = (1 - t) * (1 - t) * 14 + 2 * t * (1 - t) * 40 + t * t * 14;
        const halo = S('circle', { cx: px, cy: py + 10, r: 18, fill: COL.amber, opacity: 0 }, gar);
        const b = S('circle', { cx: px, cy: py + 10, r: 8, fill: COL.amber, opacity: 0.15 }, gar);
        bulbs.push({ halo, b });
      }
      const lit = (i, f) => { setOp(bulbs[i].b, 0.15 + 0.85 * f); setOp(bulbs[i].halo, 0.3 * f); };

      const CW = 308, CH = 222;
      const defs12 = [
        { lines: ['x ≥ 140', '→ [140, ∞]'], faulty: true, col2: COL.coral, win: [100, 200], items: [{ iv: IV(140, INF, true), col: COL.mint }],
          fix: ['→ [140, ∞)'], opts: ['[140, ∞)', '(140, ∞)', '(∞, 140]'], ans: 0,
          hints: ['', '140 dahil mı? ≥ var → sol uç köşeli olmalı.', '∞ soldan başlamaz; büyük sayılar sağda.'], dogru: '∞ için köşeli parantez olmaz.' },
        { lines: ['[1,5) ∩ (3,8]', '= (3, 5)'], faulty: false, win: [0, 10], items: [{ iv: IV(1, 5, true, false), col: COL.amber, row: 2 }, { iv: IV(3, 8, false, true), col: COL.sky, row: 1 }, { iv: IV(3, 5, false, false), col: COL.mint, row: 0 }],
          opts: ['(3, 5]', '[3, 5)', '[1, 8]'], ans: -1, hints: ['5, [1, 5) içinde yok; bu tabela zaten doğru.', '3, (3, 8] içinde yok; bu tabela zaten doğru.', 'Bu birleşim olurdu; tabela kesişimi doğru yazmış.'] },
        { lines: ['x < 4', '→ (−∞, 4)'], faulty: true, win: [0, 8], items: [{ iv: IV(-INF, 4, false, true), col: COL.mint, fillEnd: true }],
          opts: ['Şeritte 4\'ü boş nokta yap ○', 'Yazıyı [−∞, 4) yap', 'Oku sağa çevir'], ans: 0,
          hints: ['', '−∞ için köşeli parantez olmaz; sorun şeritte.', 'x < 4 sola gider; yön doğru. Sorun nokta türünde.'], dogru: 'Şeride bak: x < 4 için 4 dışarıda olmalı, ama dolu nokta yanıyor.', fixPrev: [{ iv: IV(-INF, 4, false, false), col: COL.mint }] },
        { lines: ['[1,5) ∪ (3,8]', '= (3, 5)'], faulty: true, win: [0, 10], items: [{ iv: IV(1, 5, true, false), col: COL.amber, row: 2 }, { iv: IV(3, 8, false, true), col: COL.sky, row: 1 }, { iv: IV(3, 5, false, false), col: COL.mint, row: 0 }],
          fixPrev: [{ iv: IV(1, 5, true, false), col: COL.amber, row: 2 }, { iv: IV(3, 8, false, true), col: COL.sky, row: 1 }, { iv: IV(1, 8, true, true), col: COL.lilac, row: 0 }],
          opts: ['= [1, 8]', '= [1, 5)', '= (3, 8]'], ans: 0, fix: ['= [1, 8]'],
          hints: ['', '∪ iki aralığı toplar: 5 yine de 3 ile 8 arasında var.', '1 ilk aralıkta var; birleşime girmeli.'], dogru: '∪ iki aralığı toplar; (3, 5) kesişimdir.' },
        { lines: ['5 < x < 2', 'çözüm = {0}'], faulty: true, win: [0, 10], items: [{ iv: IV(5, INF, false), col: COL.mint, row: 1 }, { iv: IV(-INF, 2, false, false), col: COL.amber, row: 0 }],
          opts: ['çözüm = ∅', 'çözüm = {5}', 'çözüm = (2, 5)'], ans: 0, fix: ['çözüm = ∅'],
          hints: ['', '5, "5\'ten büyük" şartını bile sağlamaz; hiçbir sayı iki şartı birden sağlamaz.', '(2, 5) şartların tersini sağlar; çözüm bu değil.'], dogru: 'Hem 5\'ten büyük hem 2\'den küçük sayı yok. Çözüm {0} değil, boş küme ∅.' },
        { lines: ['[2,5] ∩ [5,9]', '= {5}'], faulty: false, win: [0, 10], items: [{ iv: IV(2, 5, true, true), col: COL.amber, row: 2 }, { iv: IV(5, 9, true, true), col: COL.sky, row: 1 }, { iv: IV(5, 5, true, true), col: COL.mint, row: 0 }],
          opts: ['= ∅', '= [5, 9]', '= (5, 5)'], ans: -1, hints: ['5 iki aralıkta da dolu nokta; ∅ olmaz. Bu tabela doğru.', 'Bu yalnız ikinci aralık; kesişim tek nokta. Tabela doğru.', 'Bu tabela zaten doğru: ortak eleman 5.'] },
      ];
      const cards = defs12.map((d, i) => {
        const col = i % 3, rw = Math.floor(i / 3);
        const x = 14 + col * 332, y = 44 + rw * 250;
        const g = G(svg);
        g.style.cursor = 'pointer';
        g.setAttribute('tabindex', 0); g.setAttribute('role', 'button'); g.setAttribute('aria-label', `Tabela ${i + 1}: ${d.lines.join(' ')}`);
        g.style.outline = 'none';
        const rect = R(g, x, y, CW, CH, { rx: 18, fill: 'url(#gCard)', stroke: '#4a5a96', 'stroke-width': 2.5, filter: 'url(#shadow)' });
        S('line', { x1: x + 60, x2: x + 60, y1: y, y2: y - 14, stroke: COL.axis2, 'stroke-width': 3 }, g);
        S('line', { x1: x + CW - 60, x2: x + CW - 60, y1: y, y2: y - 14, stroke: COL.axis2, 'stroke-width': 3 }, g);
        const l1 = T(g, x + CW / 2, y + 50, d.lines[0], { s: 30, w: 800 });
        const l2 = T(g, x + CW / 2, y + 94, d.lines[1], { s: 30, w: 800, f: COL.amber });
        /* önizleme şeridi */
        const px0 = x + 36, px1 = x + CW - 36, py = y + 196;
        const mx = axis(g, { x0: px0, x1: px1, vmin: d.win[0], vmax: d.win[1], y: py, left: x + 18, right: x + CW - 18, major: [], minor: [], ls: 20 });
        const pg = G(g);
        const drawPrev = (its) => {
          while (pg.firstChild) pg.removeChild(pg.firstChild);
          its.forEach((it) => { ivShape(pg, mx, it.iv, py - (it.row || 0) * 26, it.col, { th: 6, r: 7 }); });
        };
        drawPrev(d.items);
        const badge = T(g, x + CW - 26, y + 40, '', { s: 34, w: 900 });
        const card = { i, d, g, rect, l1, l2, badge, solved: false, drawPrev, x, y };
        return card;
      });
      cards.forEach((cd) => setOp(cd.g, 0));
      let nSolved = 0;
      const total = cards.length;
      const win = async () => {
        await c.tween(1600, (e) => { for (let i = 0; i < 12; i++) lit(i, clamp(e * 13 - i, 0, 1)); }, ease.linear);
      };
      const markSolved = (cd, ok) => {
        cd.solved = true; nSolved++; cd.l2.style.fill = COL.mint;
        cd.rect.setAttribute('stroke', COL.mint);
        cd.badge.textContent = '✓'; cd.badge.style.fill = COL.mint;
        cd.g.style.cursor = 'default';
      };

      await par(c, 'Lunaparkın tabelacısı bugün çok yorgun; birkaç tabelayı <b>yanlış</b> yazmış. Sen matematik görevlisisin: hatalı olanları bul ve tamir et.', { ms: 5600 }, async () => {
        for (const cd of cards) { spawn(c, () => fadeTo(c, cd.g, 500)); await c.wait(200); }
        await c.wait(500);
      });
      c.say('Bir tabelaya dokun. <b>Doğruysa</b> "dokunma" de, <b>hatalıysa</b> doğru düzeltmeyi seç.', { noWait: true });
      let menu = null;
      const closeMenu = () => { if (menu) { menu.remove(); menu = null; } };
      const solveCard = async (cd, viaFix) => {
        if (cd.solved) return;
        if (viaFix && cd.d.fix) { cd.l2.textContent = cd.d.fix[0]; }
        if (viaFix && cd.d.fixPrev) cd.drawPrev(cd.d.fixPrev);
        markSolved(cd);
        await c.tween(300, (e) => cd.g.setAttribute('transform', `translate(0,${-6 * Math.sin(e * Math.PI)})`));
      };
      const openMenu = (cd) => {
        if (cd.solved) return;
        closeMenu();
        const d = cd.d;
        const fb = h('div');
        const opts = h('div', { class: 'opts', style: { gridTemplateColumns: '1fr' } });
        const labels = ['✓ Tabela doğru, dokunma', ...d.opts.map((o) => 'Düzelt: ' + o)];
        labels.forEach((lb, k) => {
          const b = h('button', { class: 'opt', html: k === 0 ? lb : lb.replace(/^(Düzelt: )(.*)$/, '$1<span class="m">$2</span>') });
          b.addEventListener('click', () => {
            if (k === 0) {
              if (!d.faulty) { c.feedback(fb, 'ok', 'Doğru gözlem: bu tabela doğru, ışığı yanık kalsın.'); [...opts.children].forEach((x) => (x.disabled = true)); spawn(c, async () => { await solveCard(cd, false); await c.wait(900); closeMenu(); }); }
              else { c.feedback(fb, 'no', '<b>Burada bir hata var.</b> ' + d.dogru); b.disabled = true; cd.rect.setAttribute('stroke', COL.coral); spawn(c, async () => { await c.wait(800); if (!cd.solved) cd.rect.setAttribute('stroke', '#4a5a96'); }); }
              return;
            }
            const fi = k - 1;
            if (!d.faulty) { c.feedback(fb, 'no', 'Bu tabela <b>doğru</b>. ' + (d.hints[fi] || '')); b.disabled = true; return; }
            if (fi === d.ans) {
              c.feedback(fb, 'ok', 'Tamir edildi! ' + (d.dogru || '')); [...opts.children].forEach((x) => (x.disabled = true));
              spawn(c, async () => { await solveCard(cd, true); await c.wait(1000); closeMenu(); });
            } else { c.feedback(fb, 'no', d.hints[fi] || 'Bu düzeltme doğru değil.'); b.disabled = true; }
          });
          opts.appendChild(b);
        });
        menu = c.panel(`Tabela ${cd.i + 1}: ${d.lines.join('  ')}`, opts, fb);
      };
      cards.forEach((cd) => {
        c.on(cd.g, 'click', () => openMenu(cd));
        c.on(cd.g, 'keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openMenu(cd); } });
      });
      await until(c, () => nSolved >= total, {
        solve: async () => {
          closeMenu();
          for (const cd of cards) { if (!cd.solved) { await solveCard(cd, cd.d.faulty); await c.wait(250); } }
        },
      });
      closeMenu();
      c.note('<b>●</b> köşeli = dahil · <b>○</b> yuvarlak = hariç · ∞ yanında hep yuvarlak · <b>∩</b> = ve · <b>∪</b> = veya · <b>a < b</b>', 'Özet panosu', 'k12');
      await par(c, 'Hepsi tamir edildi: <b>tüm ampuller yandı</b>!', { ms: 2800 }, win);
      await c.cont('Devam ›');
    },
  });

  /* ================================================================== SINAV, ÖZET, BAŞLAT */
  const M_ = (x) => `<span class="m">${x}</span>`;
  /* Bölüm B kısa derslere ayrılır. Sayfa, hangi parçayı oynatacağını window.DERS_PARCA ile söyler.
     B2–B5 bu dosyadaki sahnelerden kurulur. Yeni dersler (B1, B6, B7) kendi dosyalarında durur ve
     window.DERS_EK[anahtar] = (K) => ({ title, hook, scenes, quiz, summary, next }) ile kaydolur;
     K, bu dosyanın çizim araçlarıdır (aşağıdaki KIT). Eski sahne 12 (tamir atölyesi, SC[14]) bölüm sonu tekrarı için duruyor. */
  const KIT = {
    D, S, h, ease, lerp, clamp, Cancelled, COL, NB, MINUS, num, mix, INF, IV, has, isEmpty, inter, ivStr, ineqStr,
    T, multi, R, setOp, G, at, defs, stars, canvas, dot, kid, gate, axis, AX100, AX10, ivShape, balloon, chip, board,
    spawn, serial, until, slide, svgPt, toggler, dnd, layoutRow, miniSvg, par, fadeTo, tryIt, flagAt, gatesRow, marker, M_,
  };
  const PARCALAR = {
    b2: {
      title: 'Dolu nokta, boş nokta',
      hook: 'Hız treninin kapısında <b>140 cm ve üzeri</b> yazıyor. Boyu tam 140 cm olan biner mi?',
      scenes: SC.slice(0, 4),
      quiz: [
        {
          q: `${M_('x > 3')} sayı doğrusunda nasıl görünür?`,
          options: ['3’te dolu nokta, sağa doğru şerit', '3’te boş nokta, sağa doğru şerit', '3’te boş nokta, sola doğru şerit', '3’te dolu nokta, sola doğru şerit'], answer: 1,
          why: [
            'Dolu nokta 3’ü de alır; oysa işaret &gt;, eşitlik yok.',
            'Eşitlik yok: 3 hariç, nokta boş. Büyük sayılar sağda.',
            'Yön ters: 3’ten büyük sayılar sağdadır.',
            'Hem nokta hem yön ters.'],
          scene: 2,
        },
        {
          q: '5’ten küçük en büyük gerçek sayı hangisidir?',
          options: ['4', '4,9', 'Böyle bir sayı yoktur.', '4,99'], answer: 2,
          why: [
            'Tam sayılarda öyle. Gerçek sayılarda 4,5 de 5’ten küçük.',
            '4,95 ondan büyük ve hâlâ 5’ten küçük.',
            'Hangisini söylesen, 5 ile arasında bir sayı daha var.',
            '4,995 ondan büyük ve hâlâ 5’ten küçük.'],
          scene: 3,
        },
      ],
      summary: [
        '<b>Eşitlik varsa nokta dolu.</b> ≥ ve ≤ dolu, &gt; ve &lt; boş nokta.',
        `<b>Büyükler sağda:</b> ${M_('x ≥ 140')} şeridi 140’tan sağa uzanır.`,
        '<b>En uzun yok:</b> 190’dan kısa boyların en büyüğü yoktur; 190’a boş nokta konur.',
      ],
      next: { href: 'b3-parantez-dili.html', label: 'Sonraki: Parantez dili ›' },
    },
    b3: {
      title: 'Parantez dili ve sonsuz',
      hook: `${M_('140 ≤ x < 190')} kuralını her seferinde çizmek zorunda mıyız? İki sayı ve iki parantez yeter mi?`,
      scenes: SC.slice(4, 7),
      quiz: [
        {
          q: `${M_('−2 ≤ x < 4')} hangi aralıktır?`,
          options: [M_('(−2, 4)'), M_('[−2, 4)'), M_('(−2, 4]'), M_('[−2, 4]')], answer: 1,
          why: [
            '−2 dahil (≤); solda köşeli olmalı.',
            '−2 dahil: köşeli. 4 hariç: yuvarlak.',
            'Parantezler ters yerde.',
            '4 hariç (&lt;); sağda yuvarlak olmalı.'],
          scene: 0,
        },
        {
          q: `${M_('x ≥ 7')} hangi aralıktır?`,
          options: [M_('[7, ∞]'), M_('(7, ∞)'), M_('(−∞, 7]'), M_('[7, ∞)')], answer: 3,
          why: [
            '∞ bir sayı değil; yanında köşeli olmaz.',
            '7 dahil (≥); köşeli olmalı.',
            'Yön ters: 7’den büyükler sağda.',
            '7 dahil: köşeli. ∞ hep yuvarlak.'],
          scene: 2,
        },
      ],
      summary: [
        '<b>Köşeli dahil, yuvarlak hariç; sonsuz hep yuvarlak.</b>',
        `<b>Dört tür:</b> ${M_('[a, b]')} · ${M_('(a, b)')} · ${M_('[a, b)')} · ${M_('(a, b]')}`,
        `<b>Ucu olmayan:</b> ${M_('x ≥ 140')} → ${M_('[140, ∞)')}`,
      ],
      next: { href: 'b4-dort-dil-tek-kume.html', label: 'Sonraki: Dört dil, tek küme ›' },
    },
    b4: {
      title: 'Dört dil, tek küme',
      hook: `${M_('x ∈ ℝ')} yerine ${M_('x ∈ ℤ')} yazarsak ${M_('140 ≤ x < 190')} aynı küme mi kalır?`,
      scenes: SC.slice(7, 10),
      quiz: [
        {
          q: `${M_('{x : 1 < x ≤ 3, x ∈ ℝ}')} hangi aralıktır?`,
          options: [M_('[1, 3)'), M_('(1, 3)'), M_('(1, 3]'), M_('[1, 3]')], answer: 2,
          why: [
            'Parantezler ters yerde.',
            '3 dahil (≤); sağda köşeli olmalı.',
            '1 hariç: yuvarlak. 3 dahil: köşeli.',
            '1 hariç (&lt;); solda yuvarlak olmalı.'],
          scene: 0,
        },
        {
          q: `${M_('{x : 1 < x ≤ 3, x ∈ ℤ}')} hangi kümedir?`,
          options: [M_('{1, 2, 3}'), M_('{2, 3}'), M_('(1, 3]'), M_('{2}')], answer: 1,
          why: [
            '1 hariç: 1 &lt; x yazıyor.',
            '1’den büyük, 3’ü geçmeyen tam sayılar: 2 ve 3.',
            'Aralık gerçek sayılar içindir; burada yalnızca tam sayılar var.',
            '3 dahil: x ≤ 3 yazıyor.'],
          scene: 1,
        },
      ],
      summary: [
        '<b>Eşitsizlik, aralık, doğru, küme: aynı şey.</b>',
        `${M_('140 ≤ x < 190')} = ${M_('[140, 190)')} = ${M_('{x : 140 ≤ x < 190, x ∈ ℝ}')}`,
        `<b>ℝ mi, ℤ mi:</b> ${M_('x ∈ ℤ')} yazınca şerit noktalara dağılır.`,
      ],
      next: { href: 'b5-kesisim-ve-birlesim.html', label: 'Sonraki: Kesişim ve birleşim ›' },
    },
    b5: {
      title: 'Kesişim ve birleşim',
      hook: 'İki oyuncağın boy kuralı farklı. <b>İkisine de</b> binebilenler kimler?',
      scenes: SC.slice(10, 14),
      quiz: [
        {
          q: `${M_('[2, 6] ∩ [4, 9]')} işleminin sonucu nedir?`,
          options: [M_('[2, 9]'), M_('[4, 6]'), M_('(4, 6)'), M_('∅')], answer: 1,
          why: [
            'Bu birleşim (∪). Kesişim yalnızca ortak parçadır.',
            'İki aralıkta da olanlar: 4’ten 6’ya, uçlar dahil.',
            '4 ve 6 iki aralıkta da var; uçlar dolu.',
            'Ortak sayılar var: örneğin 5.'],
          scene: 1,
        },
        {
          q: `${M_('[1, 4) ∪ [4, 7]')} işleminin sonucu nedir?`,
          options: [M_('[1, 4) ∪ (4, 7]'), M_('∅'), M_('[1, 7]'), M_('{4}')], answer: 2,
          why: [
            '4, ikinci aralıkta var; birleşimde de var.',
            'Bu kesişimin sonucu. Birleşim iki aralığı toplar.',
            '4 ikinci aralıkta dolu: iki parça kaynaşır.',
            'Birleşim en az birinde olan bütün sayılardır.'],
          scene: 2,
        },
      ],
      summary: [
        '<b>∩ ve, ∪ veya.</b>',
        '<b>Kesişim:</b> iki aralıkta da olanlar. Uç nokta ikisinde de varsa dahil.',
        `<b>Tek parantez farkı:</b> ${M_('[2, 5) ∩ [5, 9] = ∅')} ama ${M_('[2, 5] ∩ [5, 9] = {5}')}`,
      ],
      next: { href: 'b6-fark-ve-tumleme.html', label: 'Sonraki: Fark ve tümleme ›' },
    },
  };
  const anahtar = window.DERS_PARCA || 'b2';
  const ek = (window.DERS_EK || {})[anahtar];
  const parca = PARCALAR[anahtar] || ek(KIT);
  D.start({
    id: 'sayilar-' + anahtar,
    kicker: 'Bölüm B · Aralıklar ve kümeler',
    title: parca.title,
    accent: '#ffc857',
    back: 'index.html',
    intro: { title: parca.title, hook: parca.hook, button: 'Derse başla ›' },
    scenes: parca.scenes,
    quiz: parca.quiz,
    quizTitle: 'Çıkış soruları',
    summary: parca.summary,
    nextLesson: parca.next,
  });
})();
