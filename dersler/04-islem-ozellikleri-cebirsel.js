/* 04 – İşlem özelliklerinin cebirsel ifadesi: değişme, birleşme, dağılma
   Renk rolleri (ders boyunca sabit): a = amber, b = camgöbeği, c = mercan, d = mor;
   eşit/doğru = yeşil, ≠/yanlış/kesilen = kırmızı. */
(function () {
  'use strict';
  const { h, s: SV, lerp, clamp, ease } = Ders;
  const A = '#FFB547', B = '#3CC8E8', C = '#FF7A8A', D = '#A78BFA', OK = '#5FD38D', BAD = '#FF5D5D', INK = '#E8ECF8', MUTE = '#9aa6cf';
  const MIN = '−';

  /* ---------- genel yardımcılar ---------- */
  const num = (x) => { const v = Math.round(x * 1000) / 1000; return String(v).replace('.', ',').replace('-', MIN); };
  const sgn = (x) => (x < 0 ? '(' + num(x) + ')' : num(x));
  function mix(hex, t, to) {
    const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    const a = p(hex), b = p(to || (t >= 0 ? '#ffffff' : '#000000')); const k = Math.abs(t);
    return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join('');
  }
  const fire = (p) => { if (p && p.catch) p.catch((e) => { if (!(e instanceof Ders.Cancelled)) console.error(e); }); };
  const par = (...ps) => Promise.all(ps);
  function spk(html) {
    const d = document.createElement('div'); d.innerHTML = html;
    return (d.textContent || '')
      .replace(/\s*[×·]\s*/g, ' çarpı ').replace(/\s*÷\s*/g, ' bölü ').replace(/−/g, ' eksi ').replace(/\+/g, ' artı ')
      .replace(/≠/g, ' eşit değildir ').replace(/=/g, ' eşittir ').replace(/\(/g, ' parantez aç ').replace(/\)/g, ' parantez kapa ')
      .replace(/²/g, ' kare ').replace(/\s+/g, ' ').trim();
  }
  const say = (c, html, o) => c.say(html, Object.assign({ speak: spk(html) }, o));

  /* ---------- SVG yardımcıları ---------- */
  const g = (p, a) => SV('g', a || {}, p);
  function T(p, x, y, str, o = {}) {
    const t = SV('text', { x, y, 'text-anchor': o.anchor || 'start', 'font-size': o.size || 24, 'font-weight': o.w || 600 }, p);
    t.style.fill = o.fill || INK;
    if (o.op != null) t.style.opacity = o.op;
    if (o.mono) t.style.fontFamily = 'var(--mono)';
    if (o.ls) t.setAttribute('letter-spacing', o.ls);
    t.textContent = str;
    return t;
  }
  function setParts(t, parts) {
    t.textContent = '';
    (Array.isArray(parts) ? parts : [parts]).forEach((pt) => {
      const [str, col] = Array.isArray(pt) ? pt : [pt];
      const ts = SV('tspan', {}, t); ts.textContent = str; if (col) ts.style.fill = col;
    });
  }
  function TS(p, x, y, parts, o = {}) { const t = T(p, x, y, '', o); t.style.whiteSpace = 'pre'; setParts(t, parts); return t; }
  function R(p, x, y, w, hh, o = {}) {
    const r = SV('rect', { x, y, width: w, height: hh, rx: o.rx != null ? o.rx : 8, fill: o.fill || 'none' }, p);
    if (o.stroke) { r.setAttribute('stroke', o.stroke); r.setAttribute('stroke-width', o.sw || 2); }
    if (o.dash) r.setAttribute('stroke-dasharray', o.dash);
    if (o.fo != null) r.setAttribute('fill-opacity', o.fo);
    if (o.op != null) r.style.opacity = o.op;
    if (o.filter) r.setAttribute('filter', `url(#${o.filter})`);
    return r;
  }
  function L(p, x1, y1, x2, y2, col, sw, dash) {
    const l = SV('line', { x1, y1, x2, y2, stroke: col || INK, 'stroke-width': sw || 2, 'stroke-linecap': 'round' }, p);
    if (dash) l.setAttribute('stroke-dasharray', dash);
    return l;
  }
  function P(p, d, o = {}) {
    const e = SV('path', { d, fill: o.fill || 'none' }, p);
    if (o.stroke) { e.setAttribute('stroke', o.stroke); e.setAttribute('stroke-width', o.sw || 3); e.setAttribute('stroke-linecap', 'round'); e.setAttribute('stroke-linejoin', 'round'); }
    if (o.dash) e.setAttribute('stroke-dasharray', o.dash);
    if (o.op != null) e.style.opacity = o.op;
    if (o.fo != null) e.setAttribute('fill-opacity', o.fo);
    return e;
  }
  function Ci(p, cx, cy, r, o = {}) {
    const e = SV('circle', { cx, cy, r, fill: o.fill || 'none' }, p);
    if (o.stroke) { e.setAttribute('stroke', o.stroke); e.setAttribute('stroke-width', o.sw || 2); }
    if (o.op != null) e.style.opacity = o.op;
    return e;
  }
  const place = (el, x, y, sc = 1, rot = 0, sy) => el.setAttribute('transform', `translate(${x} ${y}) rotate(${rot}) scale(${sc} ${sy == null ? sc : sy})`);
  const aboutC = (el, cx, cy, sx, sy) => el.setAttribute('transform', `translate(${cx} ${cy}) scale(${sx} ${sy == null ? sx : sy}) translate(${-cx} ${-cy})`);
  const setOp = (els, v) => [].concat(els).forEach((e) => { e.style.opacity = v; });
  const hide = (...els) => els.forEach((e) => setOp(e, 0));

  function lg(svg, id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) {
    const gr = SV('linearGradient', { id, x1, y1, x2, y2 }, svg.querySelector('defs'));
    stops.forEach(([o, col, op]) => SV('stop', { offset: o, 'stop-color': col, 'stop-opacity': op == null ? 1 : op }, gr));
    return gr;
  }
  function base(c) {
    const svg = c.svg(1000, 562);
    const defs = SV('defs', {}, svg);
    [['A', A], ['B', B], ['C', C], ['D', D], ['G', OK], ['R', BAD]].forEach(([n, col]) => lg(svg, 'g' + n, [[0, mix(col, 0.3)], [1, col]]));
    const sh = SV('filter', { id: 'shd', x: '-30%', y: '-30%', width: '160%', height: '170%' }, defs);
    SV('feDropShadow', { dx: 0, dy: 6, stdDeviation: 6, 'flood-color': '#000', 'flood-opacity': 0.45 }, sh);
    const gl = SV('filter', { id: 'glow', x: '-40%', y: '-40%', width: '180%', height: '180%' }, defs);
    SV('feGaussianBlur', { stdDeviation: 5, result: 'b' }, gl);
    const mg = SV('feMerge', {}, gl); SV('feMergeNode', { in: 'b' }, mg); SV('feMergeNode', { in: 'SourceGraphic' }, mg);
    return svg;
  }
  /* sağ ifade paneli */
  function sidePanel(svg, title) {
    const gg = g(svg);
    R(gg, 648, 22, 336, 518, { rx: 18, fill: '#0b1230', fo: 0.82, stroke: '#2a3768', sw: 1.5 });
    const tt = T(gg, 668, 56, title || 'İFADE', { size: 22, fill: MUTE, w: 700, ls: 3 });
    return { g: gg, rows: g(gg), title: tt };
  }
  /* animasyon yardımcıları */
  const fade = (c, els, ms, to = 1, from) => {
    els = [].concat(els);
    const f0 = els.map((e) => (from != null ? from : parseFloat(e.style.opacity === '' ? 1 : e.style.opacity)));
    return c.tween(ms, (e) => els.forEach((el, i) => { el.style.opacity = lerp(f0[i], to, e); }), ease.out);
  };
  const popIn = (c, el, cx, cy, ms = 500) => c.tween(ms, (e, t) => { aboutC(el, cx, cy, Math.max(0.001, e)); el.style.opacity = Math.min(1, t * 3); }, ease.back);
  const count = (c, t, from, to, ms, fn) => c.tween(ms, (e) => { t.textContent = fn ? fn(lerp(from, to, e)) : String(Math.round(lerp(from, to, e))); }, ease.inOut);
  const drawIn = (c, el, ms) => {
    const len = el.getTotalLength ? el.getTotalLength() : 1000;
    el.setAttribute('stroke-dasharray', len); el.setAttribute('stroke-dashoffset', len); el.style.opacity = 1;
    return c.tween(ms, (e) => el.setAttribute('stroke-dashoffset', len * (1 - e)), ease.inOut);
  };
  const rectDraw = (c, r, ms) => {
    const len = 2 * (+r.getAttribute('width') + +r.getAttribute('height'));
    r.setAttribute('stroke-dasharray', len); r.setAttribute('stroke-dashoffset', len);
    return c.tween(ms, (e) => r.setAttribute('stroke-dashoffset', len * (1 - e)), ease.inOut).then(() => r.removeAttribute('stroke-dasharray'));
  };
  const shake = (c, el, ms = 300) => c.tween(ms, (e, t) => { el.style.transform = `translateX(${Math.sin(t * Math.PI * 6) * 8 * (1 - t)}px)`; }, ease.linear).then(() => { el.style.transform = ''; });
  const pulse = (c, els, ms = 400, amt = 0.12) => { els = [].concat(els); return c.tween(ms, (e, t) => { const k = 1 + Math.sin(t * Math.PI) * amt; els.forEach((el) => { const b = el.getBBox(); aboutC(el, b.x + b.width / 2, b.y + b.height / 2, k); }); }, ease.linear).then(() => els.forEach((el) => el.removeAttribute('transform'))); };

  /* ızgara hücreleri */
  function cells(p, x, y, cols, rows, cw, chh, o = {}) {
    const gg = g(p); const arr = [];
    for (let r = 0; r < rows; r++) {
      arr[r] = [];
      for (let k = 0; k < cols; k++) {
        arr[r][k] = SV('rect', { x: x + k * cw, y: y + r * chh, width: cw, height: chh, fill: o.fill || '#fff', 'fill-opacity': o.fo != null ? o.fo : 0.38, stroke: o.stroke || 'rgba(255,255,255,.3)', 'stroke-width': o.sw || 1.2 }, gg);
      }
    }
    return { g: gg, arr, all: arr.flat() };
  }
  /* köşeli ölçü çizgisi (yatay üstte / dikey solda) */
  /* up=true: nesnenin ÜSTÜNDE duran ∩ ölçü çizgisi; false: ALTINDA duran ∪ */
  function brH(p, x1, x2, y, col, up = true, sw = 3) {
    const d = up ? 9 : -9;
    return P(p, `M${x1},${y + d} V${y} H${x2} V${y + d}`, { stroke: col, sw });
  }
  /* left=true: nesnenin SOLUNDA duran [ ; false: SAĞINDA duran ] */
  function brV(p, x, y1, y2, col, left = true, sw = 3) {
    const d = left ? 9 : -9;
    return P(p, `M${x + d},${y1} H${x} V${y2} H${x + d}`, { stroke: col, sw });
  }
  function fitText(t, maxW) {
    if (!t._fs) t._fs = +t.getAttribute('font-size');
    t.setAttribute('font-size', t._fs);
    const w = t.getComputedTextLength ? t.getComputedTextLength() : 0;
    if (w > maxW) t.setAttribute('font-size', Math.max(18, (t._fs * maxW) / w));
  }
  function block(p, w, hh, key, label, col) {
    const bg = g(p);
    const r = R(bg, 0, 0, w, hh, { rx: 9, fill: `url(#g${key})`, stroke: mix(col, 0.45), sw: 2.5, filter: 'shd' });
    const t = T(bg, w / 2, hh / 2 + 10, label, { anchor: 'middle', size: 30, fill: '#0b1230', w: 800 });
    return { g: bg, r, t };
  }
  /* fare/dokunmatik sürükleme (svg koordinatı) */
  function svgPt(svg, e) {
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function drag(c, svg, el, cb) {
    el.style.touchAction = 'none'; el.style.cursor = 'grab';
    let on = false;
    c.on(el, 'pointerdown', (e) => { e.preventDefault(); on = true; try { el.setPointerCapture(e.pointerId); } catch (x) { /* yoksay */ } el.style.cursor = 'grabbing'; cb.start && cb.start(svgPt(svg, e), e); });
    c.on(el, 'pointermove', (e) => { if (on) cb.move && cb.move(svgPt(svg, e), e); });
    const up = (e) => { if (!on) return; on = false; el.style.cursor = 'grab'; cb.end && cb.end(svgPt(svg, e), e); };
    c.on(el, 'pointerup', up); c.on(el, 'pointercancel', up);
  }

  /* ---------- HTML etkileşim yardımcıları ---------- */
  /* kompakt kaydırıcı paneli: specs [{k, min, max, step, v, col}] */
  function sliders(c, tag, specs, onChange, extra) {
    const api = { vals: {}, inputs: {}, outs: {} };
    const show = (sp, v) => (sp.fmt ? sp.fmt(v) : num(v));
    const rows = specs.map((sp) => {
      api.vals[sp.k] = sp.v;
      const inp = h('input', { type: 'range', min: sp.min, max: sp.max, step: sp.step || 1, value: sp.v });
      inp.style.setProperty('--accent', sp.col || B);
      const out = h('output', {}, show(sp, sp.v)); out.style.color = sp.col || B;
      const lab = h('label', { html: `<b style="color:${sp.col || B}">${sp.label || sp.k}</b>` });
      inp.addEventListener('input', () => { api.vals[sp.k] = +inp.value; out.textContent = show(sp, +inp.value); onChange(sp.k, api.vals); });
      api.inputs[sp.k] = inp; api.outs[sp.k] = out; api.specs = specs;
      return h('div', { class: 'ctl' }, lab, inp, out);
    });
    const kids = [h('div', { class: 'ctlgrid' }, ...rows)];
    if (extra) kids.push(extra);
    api.el = c.panel(tag, ...kids);
    api.set = (k, v, silent) => {
      const sp = specs.find((q) => q.k === k); const inp = api.inputs[k];
      if (+inp.max < v) inp.max = v; if (+inp.min > v) inp.min = v;
      inp.value = v; api.vals[k] = +inp.value; api.outs[k].textContent = show(sp, api.vals[k]);
      if (!silent) onChange(k, api.vals);
    };
    return api;
  }
  /* karar paneli (c.choice benzeri; 'free' seçenekler yargılanmaz) */
  function ask(c, o) {
    return new Promise((res) => {
      const panel = c.panel(o.tag || 'Tahmin et', h('p', { class: 'q', html: o.q }));
      const opts = h('div', { class: 'opts' });
      const fb = h('div'); let tries = 0;
      o.options.forEach((op, i) => {
        const b = h('button', { class: 'opt', html: op.html });
        b.addEventListener('click', () => {
          if (op.free) { c.feedback(fb, 'info', op.fb || ''); op.free(); return; }
          tries++;
          if (o.onPick) o.onPick(i, !!op.ok, b);
          if (op.ok) {
            b.classList.add('right'); [...opts.children].forEach((x) => (x.disabled = true));
            c.feedback(fb, 'ok', op.fb || o.right || 'Doğru!');
            panel.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: () => { panel.remove(); res({ tries, picked: i }); } }, o.next || 'Devam ›'));
          } else {
            b.classList.add('wrong'); b.disabled = true;
            c.feedback(fb, 'no', op.fb || 'Tam değil. Bir daha düşün.');
          }
        });
        opts.appendChild(b);
      });
      panel.append(opts, fb);
      if (o.onReady) o.onReady(panel, fb);
    });
  }
  const wait = (c, ms) => c.wait(ms);

  /* ============ SAHNE 1 – Hesap makinesiz kasiyer ============ */
  function figure(p, x, y, sc, body, accent) {
    const gg = g(p, { transform: `translate(${x} ${y}) scale(${sc})` });
    P(gg, 'M-52,0 L-52,-44 Q-52,-94 0,-94 Q52,-94 52,-44 L52,0 Z', { fill: body });
    P(gg, 'M-52,-44 Q-52,-94 0,-94 Q52,-94 52,-44 Q30,-60 0,-60 Q-30,-60 -52,-44 Z', { fill: '#fff', fo: 0.08 });
    Ci(gg, 0, -124, 27, { fill: mix(body, 0.28) });
    P(gg, 'M-17,-94 L0,-70 L17,-94 Z', { fill: accent });
    return gg;
  }
  function pill(p, x, y, w, hh, label, col) {
    const gg = g(p);
    R(gg, x, y, w, hh, { rx: hh / 2, fill: '#0b1230', fo: 0.9, stroke: col || '#3a4a8a', sw: 2 });
    const t = T(gg, x + w / 2, y + hh / 2 + 9, label, { anchor: 'middle', size: 28, mono: true, w: 700, fill: col || INK });
    return { g: gg, t };
  }
  function bubble(p, x, y, w, hh, tx, ty, col) {
    const gg = g(p);
    R(gg, x, y, w, hh, { rx: 18, fill: '#0b1230', fo: 0.95, stroke: col, sw: 3 });
    P(gg, `M${tx - 12},${y + hh - 2} L${tx},${ty} L${tx + 14},${y + hh - 2}`, { fill: '#0b1230', stroke: col, sw: 3 });
    R(gg, tx - 10, y + hh - 5, 22, 7, { rx: 0, fill: '#0b1230' });
    return gg;
  }
  async function s1(c) {
    const svg = base(c);
    lg(svg, 'wall', [[0, '#1b2860'], [1, '#0e1636']]);
    lg(svg, 'ctop', [[0, '#9fb0e6'], [1, '#6676b8']]);
    lg(svg, 'cfront', [[0, '#2b3977'], [1, '#161f48']]);
    lg(svg, 'cardb', [[0, '#e6b97b'], [1, '#b98443']]);
    R(svg, 0, 0, 1000, 562, { rx: 0, fill: 'url(#wall)' });
    const halo = SV('radialGradient', { id: 'halo', cx: 0.5, cy: 0.1, r: 0.6 }, svg.querySelector('defs'));
    SV('stop', { offset: 0, 'stop-color': '#7aa0ff', 'stop-opacity': 0.28 }, halo); SV('stop', { offset: 1, 'stop-color': '#7aa0ff', 'stop-opacity': 0 }, halo);
    R(svg, 0, 0, 1000, 562, { rx: 0, fill: 'url(#halo)' });
    const sign = g(svg);
    R(sign, 24, 22, 132, 46, { rx: 12, fill: '#0b1230', stroke: B, sw: 2 });
    T(sign, 90, 54, 'KASA 1', { anchor: 'middle', size: 24, fill: B, w: 800, ls: 2 });

    figure(svg, 100, 396, 1.3, '#4f62a8', '#8ea0e8');
    figure(svg, 890, 396, 1.3, '#2f7f9c', A);
    R(svg, 24, 380, 952, 22, { rx: 9, fill: 'url(#ctop)', filter: 'shd' });
    R(svg, 24, 402, 952, 140, { rx: 6, fill: 'url(#cfront)' });
    for (let k = 0; k < 5; k++) R(svg, 54 + k * 186, 422, 156, 96, { rx: 12, stroke: '#3a4a8a', sw: 2, fill: '#fff', fo: 0.03 });

    /* hesap makinesi */
    const calc = g(svg, { transform: 'translate(172 252)' });
    R(calc, 0, 0, 94, 128, { rx: 13, fill: '#232c55', stroke: '#5566b0', sw: 2, filter: 'shd' });
    R(calc, 8, 10, 78, 32, { rx: 7, fill: '#08141a' });
    const scr = T(calc, 80, 35, '', { anchor: 'end', size: 24, mono: true, fill: OK, w: 700 });
    const keys = [];
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) keys.push(R(calc, 8 + k * 27, 52 + r * 24, 23, 18, { rx: 5, fill: '#3a4684' }));

    /* ürün kutuları */
    const boxes = [];
    for (let i = 0; i < 7; i++) {
      const bx = 292 + i * 70, by = 332;
      const bg = g(svg);
      P(bg, `M${bx},${by} L${bx + 12},${by - 12} L${bx + 72},${by - 12} L${bx + 60},${by} Z`, { fill: '#f0cf9c' });
      P(bg, `M${bx + 60},${by} L${bx + 72},${by - 12} L${bx + 72},${by + 36} L${bx + 60},${by + 48} Z`, { fill: '#9a6a32' });
      R(bg, bx, by, 60, 48, { rx: 3, fill: 'url(#cardb)' });
      R(bg, bx + 24, by, 12, 48, { rx: 0, fill: '#fff', fo: 0.35 });
      const tag = g(bg);
      R(tag, bx - 2, by - 52, 64, 32, { rx: 9, fill: '#eef2ff' });
      T(tag, bx + 30, by - 29, '98 TL', { anchor: 'middle', size: 22, fill: '#1b2140', w: 800 });
      hide(bg);
      boxes.push({ g: bg, cx: bx + 30, cy: by + 24 });
    }
    /* fiş */
    const rec = g(svg, { transform: 'translate(385 -160)' });
    let d = 'M0,0 H250 V92'; for (let i = 0; i < 12; i++) d += ' l-10.4,10 l-10.4,-10';
    d += ' Z';
    P(rec, d, { fill: '#f4efe0' }).setAttribute('filter', 'url(#shd)');
    T(rec, 125, 30, 'KASA FİŞİ', { anchor: 'middle', size: 22, fill: '#6b6f86', w: 800, ls: 2 });
    T(rec, 125, 74, '7 × 98 = ?', { anchor: 'middle', size: 36, fill: '#1b2140', w: 800 });

    const pc = pill(svg, 166, 196, 104, 44, '0:00'); hide(pc.g);
    const pk = pill(svg, 736, 196, 104, 44, '0:00'); hide(pk.g);
    const bc = g(svg); bubble(bc, 36, 96, 108, 66, 96, 214, B); T(bc, 90, 144, '?!', { anchor: 'middle', size: 44, fill: B, w: 800 }); hide(bc);
    const bk = g(svg); bubble(bk, 770, 44, 190, 84, 896, 214, A); T(bk, 865, 106, '686', { anchor: 'middle', size: 54, fill: A, w: 800 }); hide(bk);
    const okc = g(svg, { transform: 'translate(240 238)' }); Ci(okc, 0, 0, 20, { fill: OK }); P(okc, 'M-9,0 L-3,7 L10,-8', { stroke: '#06101f', sw: 4 }); hide(okc);
    const okk = g(svg, { transform: 'translate(948 56)' }); Ci(okk, 0, 0, 20, { fill: OK }); P(okk, 'M-9,0 L-3,7 L10,-8', { stroke: '#06101f', sw: 4 }); hide(okk);

    await par(say(c, 'Bir markette müşteri, tanesi <b>98 TL</b> olan <b>7 ürün</b> alıyor.'), (async () => {
      for (let i = 0; i < 7; i++) { fire(popIn(c, boxes[i].g, boxes[i].cx, boxes[i].cy + 20, 520)); await c.wait(150); }
      await c.wait(500);
    })());

    await par(say(c, 'Hesap makinesini çıkarana kadar kasiyer <b>“altı yüz seksen altı”</b> diyor.'), (async () => {
      await c.tween(800, (e) => place(rec, 385, lerp(-160, 22, e), 1), ease.out);
      fire(fade(c, [pc.g, pk.g], 300));
      let shown = false, lastK = -1;
      await c.tween(3400, (e) => {
        const sec = e * 6;
        pc.t.textContent = '0:0' + Math.min(6, Math.floor(sec));
        pk.t.textContent = '0:0' + Math.min(2, Math.floor(sec));
        const kk = Math.floor(e * 14) % 9; if (kk !== lastK) { lastK = kk; keys.forEach((k, j) => k.setAttribute('fill', j === kk ? B : '#3a4684')); }
        if (sec >= 2 && !shown) { shown = true; fire(popIn(c, bk, 865, 90, 450)); pk.t.style.fill = OK; }
      }, ease.linear);
      keys.forEach((k) => k.setAttribute('fill', '#3a4684'));
      scr.textContent = '686'; fire(popIn(c, bc, 90, 130, 450)); await c.wait(450);
      setOp(okc, 1); setOp(okk, 1);
    })());

    const ov = g(svg); hide(ov);
    R(ov, 0, 0, 1000, 562, { rx: 0, fill: '#070b1c', fo: 0.965 });
    T(ov, 500, 52, 'Soru: 7 × 98’i zihinden nasıl hesaplarız?', { anchor: 'middle', size: 26, fill: MUTE, w: 700 });
    const t1 = T(ov, 500, 292, 'Sihir mi?', { anchor: 'middle', size: 76, w: 800 }); hide(t1);
    const t2 = T(ov, 500, 372, 'Hayır. İşlem özelliği.', { anchor: 'middle', size: 46, fill: B, w: 800 }); hide(t2);
    await par(say(c, 'Hafızasında bu sonuç var diye düşünebilirsin. Ama kasiyer 98’i hiç ezberlemedi. Peki ne yaptı?'), (async () => {
      await c.wait(900);
      await fade(c, ov, 800, 1, 0);
      t1.style.opacity = 1; await c.tween(700, (e) => aboutC(t1, 500, 270, 0.6 + 0.4 * e), ease.back);
      await c.wait(500); await fade(c, t2, 600);
    })());

    c.note('Soru: 7 × 98’i hesap makinesi olmadan nasıl hesaplarız? (Cevabı bulana kadar bu soru burada duracak.)', 'Ders sorusu', 'soru');
    await c.choice({
      tag: 'Tahmin et', q: 'Kasiyer 7 × 98’i nasıl yaptı?',
      options: ['<b>A)</b> 98 × 7 sonucunu ezberlemiş.', '<b>B)</b> 98’i 100 − 2 gibi düşünüp parçalamış.', '<b>C)</b> Gizli bir hesap makinesi kullanmış.', '<b>D)</b> Tahmin edip şans eseri tutturmuş.'],
      answer: 1,
      hints: ['Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?', '', 'Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?', 'Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?'],
      right: 'Evet. 98’i 100’e yakın bir sayı olarak görmüş. Şimdi bunun nasıl çalıştığını göreceğiz.',
    });
    await say(c, 'Kasiyerin sırrı: <b>98 = 100 − 2</b>. Bakalım bu neden işe yarıyor.', { ms: 2200 });
  }

  /* ============ SAHNE 2 – Alan modeli: 7 × 98 ============ */
  async function s2(c) {
    const svg = base(c);
    const OX = 76, OY = 200, W = 416, RH = 32, N = 7, SWd = 44, H = RH * N;
    const model = g(svg);
    const body = R(model, OX, OY, W, H, { rx: 8, fill: 'url(#gB)', fo: 0, stroke: B, sw: 3.5 });
    const rowLines = []; for (let i = 1; i < N; i++) rowLines.push(L(model, OX, OY + i * RH, OX + W, OY + i * RH, 'rgba(255,255,255,.3)', 1.6)); setOp(rowLines, 0);
    /* kırılma işareti */
    const brk = g(model); const mx = OX + W / 2;
    [OY, OY + H].forEach((yy) => { R(brk, mx - 10, yy - 4, 20, 8, { rx: 0, fill: '#121a3d' }); L(brk, mx - 12, yy + 8, mx - 4, yy - 8, INK, 2.5); L(brk, mx + 2, yy + 8, mx + 10, yy - 8, INK, 2.5); }); hide(brk);
    const lb = g(model); brV(lb, OX - 12, OY, OY + H, A, true, 4); T(lb, OX - 34, OY + H / 2 + 12, '7', { anchor: 'end', size: 38, fill: A, w: 800 }); hide(lb);
    const tb = g(model); brH(tb, OX, OX + W, OY - 12, B, true, 4); T(tb, OX + W / 2, OY - 34, '98', { anchor: 'middle', size: 38, fill: B, w: 800 }); hide(tb);
    const note = T(svg, OX, 548, 'Şerit büyütülmüştür; ölçekli değil.', { size: 22, fill: MUTE, w: 500 }); hide(note);
    /* şerit */
    const sx0 = OX + W;
    const strip = g(svg); place(strip, sx0, OY, 1, 0); strip.setAttribute('transform', `translate(${sx0} ${OY}) scale(0.001 1)`);
    const sfill = R(strip, 0, 0, SWd, H, { rx: 4, fill: 'url(#gC)', fo: 0.35, stroke: C, sw: 3, dash: '9 6' });
    const sc = cells(strip, 0, 0, 2, N, SWd / 2, RH, { fill: C, fo: 0.12, stroke: 'rgba(255,255,255,.35)' });
    const sLab = g(svg); brH(sLab, sx0, sx0 + SWd, OY - 12, C, true, 4); T(sLab, sx0 + SWd / 2, OY - 34, '2', { anchor: 'middle', size: 38, fill: C, w: 800 }); hide(sLab);
    const tot = g(svg); brH(tot, OX, sx0 + SWd, OY - 62, INK, true, 3); const totT = T(tot, (OX + sx0 + SWd) / 2, OY - 84, '98', { anchor: 'middle', size: 40, w: 800 }); hide(tot);
    const scissors = g(svg); hide(scissors);
    const blade1 = g(scissors), blade2 = g(scissors);
    L(blade1, 0, 0, 14, -34, '#dfe6ff', 5); Ci(blade1, -6, 14, 9, { stroke: '#dfe6ff', sw: 4 }); L(blade1, -2, 7, 0, 0, '#dfe6ff', 5);
    L(blade2, 0, 0, -14, -34, '#dfe6ff', 5); Ci(blade2, 6, 14, 9, { stroke: '#dfe6ff', sw: 4 }); L(blade2, 2, 7, 0, 0, '#dfe6ff', 5);
    const stripCount = T(svg, sx0 + 88 + SWd, OY + H + 44, '', { anchor: 'end', size: 30, fill: BAD, w: 800 });
    const px = sidePanel(svg);
    const pr = px.rows;

    await par(say(c, '7 tane 98’i, yüksekliği 7, genişliği 98 olan bir dikdörtgen gibi düşün.'), (async () => {
      await rectDraw(c, body, 1200);
      body.setAttribute('fill-opacity', 0);
      await par(c.tween(700, (e) => body.setAttribute('fill-opacity', 0.28 * e)), fade(c, rowLines, 700), fade(c, [lb, tb, brk, note], 700));
      const r1 = TS(pr, 668, 112, [['7', A], ' × ', ['98', B], ' = ?'], { size: 36, w: 800 });
      void r1; await c.wait(300);
    })());

    const r2 = TS(pr, 668, 188, [['7', A], ' × ', ['100', INK], ' = '], { size: 36, w: 800 });
    const r2v = SV('tspan', {}, r2); r2v.textContent = ''; r2v.style.fill = INK;
    await par(say(c, '98’e 2 ekleyip genişliği 100 yaparsak alanı bulmak kolay: <b>7 × 100 = 700</b>.'), (async () => {
      await c.tween(900, (e) => { strip.setAttribute('transform', `translate(${sx0} ${OY}) scale(${Math.max(0.001, e)} 1)`); }, ease.out);
      await fade(c, sLab, 400);
      await fade(c, tot, 500);
      await c.tween(700, (e) => { totT.textContent = String(Math.round(lerp(98, 100, e))); }, ease.inOut);
      await count(c, r2v, 0, 700, 1000);
    })());

    await say(c, 'Ama 2 birim genişlik fazla ekledik. Şerit kaç birim kare?', { ms: 2400 });
    await c.choice({
      tag: 'Tahmin et', q: 'Kesilecek şeridin alanı kaç?', options: ['2', '7', '9', '14'], answer: 3,
      hints: ['700 − 2 = 698 olurdu. Ama şeridin 7 satırı var; hepsi gidiyor.', 'Bir sütunu saydın. Şerit 2 sütun genişliğinde.', 'Toplama yaptın (7 + 2). Alan için çarpma gerekir.'],
      right: 'Evet. 7 satır × 2 birim = 14. Şeridin her satırı kesilir.',
      onPick: (i, ok) => { if (!ok) fire((async () => {
        if (i === 0) { for (const cl of sc.all) { cl.setAttribute('fill-opacity', 0.9); await c.wait(60); } await c.wait(300); sc.all.forEach((cl) => cl.setAttribute('fill-opacity', 0.12)); }
        else await c.tween(600, (e, t) => { const k = 0.12 + 0.7 * Math.sin(t * Math.PI); (i === 1 ? sc.arr.flatMap((r) => [r[0]]) : sc.all).forEach((cl) => cl.setAttribute('fill-opacity', k)); }, ease.linear);
      })()); },
    });

    /* kes */
    await par(say(c, 'Fazlayı keseriz: <b>700 − 14 = 686</b>.'), (async () => {
      scissors.setAttribute('transform', `translate(${sx0 + SWd / 2} ${OY - 10})`); await fade(c, scissors, 250);
      await c.tween(350, (e) => { place(blade1, 0, 0, 1, -22 * Math.sin(e * Math.PI * 2)); place(blade2, 0, 0, 1, 22 * Math.sin(e * Math.PI * 2)); }, ease.linear);
      fire(fade(c, scissors, 300, 0));
      await c.tween(800, (e) => { strip.setAttribute('transform', `translate(${sx0 + 88 * e} ${OY})`); setOp(tot, 1 - e); setOp(sLab, 1 - e); }, ease.inOut);
      sfill.setAttribute('stroke', BAD); sfill.setAttribute('fill', 'url(#gR)');
      sc.all.forEach((cl) => cl.setAttribute('fill', BAD));
      for (let i = 0; i < sc.all.length; i++) { sc.all[i].setAttribute('fill-opacity', 0.55); if (i % 2) await c.wait(70); }
      stripCount.textContent = '7 × 2 = 14'; stripCount.style.opacity = 0; await fade(c, stripCount, 400);
      const r3 = TS(pr, 668, 264, [['7', A], ' × ', ['2', C], ' = '], { size: 36, w: 800 });
      const r3v = SV('tspan', {}, r3); r3v.textContent = '14'; r3v.style.fill = BAD;
      const r4 = TS(pr, 668, 360, ['700 ', [MIN + ' 14', BAD], ' = '], { size: 36, w: 800 });
      const r4v = SV('tspan', {}, r4); r4v.textContent = '700'; r4v.style.fill = A;
      await count(c, r4v, 700, 686, 1000);
      r4v.style.fontSize = '44px';
    })());

    /* zincir */
    await c.wait(500);
    pr.innerHTML = '';
    const eqs = [['= ', OK]];
    const chain = [
      [['7', A], ' × ', ['98', B]],
      [...eqs, ['7', A], ' × (', ['100', B], ' ' + MIN + ' ', ['2', C], ')'],
      [...eqs, ['7', A], ' × ', ['100', B], ' ' + MIN + ' ', ['7', A], ' × ', ['2', C]],
      [...eqs, '700 ' + MIN + ' 14'],
      [...eqs, ['686', A]],
    ];
    const cy = [110, 184, 258, 332, 410];
    const lines = chain.map((pt, i) => {
      const t = TS(pr, 668, cy[i], pt, { size: i === 4 ? 50 : 32, w: 800 }); hide(t); return t;
    });
    await par(say(c, 'Önce 98 = 100 − 2 yazdık, sonra 7 hem 100 ile hem 2 ile çarpıldı.'), (async () => {
      for (const t of lines) { await fade(c, t, 500); await c.wait(300); }
      const tc = lines[2].textContent;
      const sevenA = lines[2].getStartPositionOfChar(tc.indexOf('7')), sevenB = lines[2].getStartPositionOfChar(tc.lastIndexOf('7'));
      const ar = P(pr, `M${sevenA.x + 8},${cy[2] + 14} Q${(sevenA.x + sevenB.x) / 2},${cy[2] + 58} ${sevenB.x + 8},${cy[2] + 14}`, { stroke: A, sw: 3.5 });
      P(pr, `M${sevenB.x + 2},${cy[2] + 26} L${sevenB.x + 8},${cy[2] + 12} L${sevenB.x + 18},${cy[2] + 22}`, { stroke: A, sw: 3.5 });
      const cap = g(pr); T(cap, 668, 486, '7, hem 100 ile', { size: 24, fill: A, w: 700 }); T(cap, 668, 518, 'hem 2 ile çarpılıyor', { size: 24, fill: A, w: 700 }); hide(cap);
      await drawIn(c, ar, 600); await fade(c, cap, 400);
    })());

    c.note('<span class="ca">7</span> × 98 = 7 × (<span class="cb">100</span> − <span class="cc">2</span>) = 7 × 100 − 7 × 2 = 700 − 14 = <b>686</b><br>Dışarıdaki sayı (7), parantezdeki <b>herkesle</b> çarpılır.', 'Kural: dağılma (ilk bakış)', 'kural-s2');

    /* yanlış yol */
    const wrong = TS(svg, OX, 478, [['700 ' + MIN + ' 2 = 698', BAD]], { size: 34, w: 800 }); hide(wrong);
    const cross = L(svg, OX - 6, 468, OX + 262, 468, '#fff', 3); hide(cross);
    const msg = T(svg, OX, 520, 'Şeridin 7 satırı da atılmalı: 7 × 2 = 14', { size: 26, fill: A, w: 800 }); hide(msg);
    await par(say(c, 'Sık yapılan hata: <b>700 − 2 = 698</b>. Oysa şeridin 7 satırı da atılmalı.'), (async () => {
      stripCount.style.opacity = 0;
      await fade(c, wrong, 400); await fade(c, cross, 300);
      await c.tween(700, (e) => { strip.setAttribute('transform', `translate(${sx0 + 88 * (1 - e)} ${OY})`); }, ease.inOut);
      sc.all.forEach((cl) => cl.setAttribute('fill-opacity', 0.15));
      sc.arr[0].forEach((cl) => cl.setAttribute('fill-opacity', 0.9)); await c.wait(700);
      for (let k = 0; k < 2; k++) { sc.all.forEach((cl) => cl.setAttribute('fill-opacity', 0.9)); await c.wait(250); sc.all.forEach((cl) => cl.setAttribute('fill-opacity', 0.15)); await c.wait(200); }
      sc.all.forEach((cl) => cl.setAttribute('fill-opacity', 0.55));
      await fade(c, msg, 400);
    })());
    await c.wait(600);
  }

  /* ============ SAHNE 3 – Değişme: önce örnek, sonra harf ============ */
  async function s3(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const U = 40, X0 = 90;
    const gA = g(svg);
    const ba = block(gA, 3 * U, 56, 'A', '3', A), bb = block(gA, 5 * U, 56, 'B', '5', B);
    place(ba.g, X0, 150); place(bb.g, X0 + 3 * U, 150);
    const tot = g(gA); brH(tot, X0, X0 + 8 * U, 236, INK, false, 3.5); T(tot, X0 + 4 * U, 290, '8', { anchor: 'middle', size: 46, w: 800 }); T(tot, X0 + 4 * U, 326, 'toplam uzunluk', { anchor: 'middle', size: 22, fill: MUTE, w: 500 });
    hide(ba.g, bb.g, tot);

    /* A: 3 + 5 */
    await par(say(c, '<span class="ca">3</span> + <span class="cb">5</span> ile <span class="cb">5</span> + <span class="ca">3</span> aynı, değil mi? Bloklar yer değiştirse de toplam uzunluk 8 kalıyor.'), (async () => {
      await par(fade(c, ba.g, 500), fade(c, bb.g, 500)); await fade(c, tot, 500);
      const r1 = TS(pr, 668, 118, [['3', A], ' + ', ['5', B], ' = 8'], { size: 38, w: 800 });
      await c.wait(900);
      await c.tween(1100, (e) => {
        place(ba.g, X0 + 5 * U * e, 150 - Math.sin(e * Math.PI) * 62);
        place(bb.g, X0 + 3 * U - 3 * U * e, 150 + Math.sin(e * Math.PI) * 62);
      }, ease.inOut);
      const r2 = TS(pr, 668, 184, [['5', B], ' + ', ['3', A], ' = 8'], { size: 38, w: 800 });
      const r3 = TS(pr, 668, 262, [['3', A], ' + ', ['5', B], ' ', ['=', OK], ' ', ['5', B], ' + ', ['3', A]], { size: 34, w: 800 });
      await c.wait(600);
    })());

    /* B: birkaç örnek + çarpma */
    const gB = g(svg);
    const cardsDef = [
      [['12', A], ' + ', ['7', B], ' = 19 = ', ['7', B], ' + ', ['12', A]],
      [['0,5', A], ' + ', ['2', B], ' = 2,5 = ', ['2', B], ' + ', ['0,5', A]],
      [['(' + MIN + '4)', A], ' + ', ['9', B], ' = 5 = ', ['9', B], ' + ', ['(' + MIN + '4)', A]],
    ];
    const cards = cardsDef.map((pt, i) => {
      const y = 126 + i * 92, cg = g(gB);
      R(cg, 50, y, 560, 68, { rx: 16, fill: '#10193d', stroke: '#33437f', sw: 2, filter: 'shd' });
      TS(cg, 316, y + 45, pt, { anchor: 'middle', size: 32, w: 700 });
      Ci(cg, 580, y + 34, 15, { fill: OK }); P(cg, `M572,${y + 34} L578,${y + 41} L590,${y + 27}`, { stroke: '#06101f', sw: 3.5 });
      hide(cg); return { g: cg, cy: y + 34 };
    });
    await fade(c, gA, 500, 0);
    await par(say(c, 'Peki <b>12 + 7</b> ile <b>7 + 12</b>? Hep aynı çıkıyor. Ondalık ve negatif sayılarda da öyle.'), (async () => {
      for (const cd of cards) { await c.tween(550, (e) => { aboutC(cd.g, 330, cd.cy, 1, Math.max(0.01, e)); cd.g.style.opacity = 1; }, ease.out); await c.wait(450); }
      await c.wait(600);
    })());
    await fade(c, gB, 500, 0);

    const gG = g(svg);
    const lab1 = T(gG, 330, 150, '4 satır × 6 sütun', { anchor: 'middle', size: 32, fill: MUTE, w: 700 });
    const grid = g(gG); const dots = [];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) dots.push(Ci(grid, (k - 2.5) * 44, (r - 1.5) * 44, 16, { fill: 'url(#gB)', stroke: mix(B, 0.5), sw: 2 }));
    place(grid, 330, 300);
    const cnt = TS(gG, 330, 482, [['24', A], [' nokta', MUTE]], { anchor: 'middle', size: 48, w: 800 });
    hide(gG);
    await par(say(c, 'Çarpmada da öyle: 4 satır × 6 sütun noktayı çevirince 6 satır × 4 sütun olur; noktalar kaybolmaz.'), (async () => {
      await fade(c, gG, 500); await c.wait(900);
      await c.tween(1300, (e) => place(grid, 330, 300, 1, 90 * e), ease.inOut);
      lab1.textContent = '6 satır × 4 sütun'; place(grid, 330, 300, 1, 90);
      TS(pr, 668, 352, [['4', A], ' · ', ['6', B], ' = 24 = ', ['6', B], ' · ', ['4', A]], { size: 32, w: 800 });
      await c.wait(900);
    })());
    await fade(c, gG, 500, 0);

    /* C: harfe geçiş */
    pr.innerHTML = '';
    const stack = g(svg);
    ['3 + 5', '12 + 7', '0,5 + 2', '4 · 6'].forEach((tx, i) => { const q = g(stack); R(q, 44 + i * 8, 64 + i * 10, 124, 42, { rx: 11, fill: '#14204a', stroke: '#33437f', sw: 1.5 }); if (i === 3) T(q, 106 + i * 8, 93 + i * 10, tx, { anchor: 'middle', size: 24, w: 700 }); });
    const stackLab = T(svg, 44, 168, '4 örnek', { size: 24, fill: MUTE, w: 600 });
    hide(stack, stackLab);
    const bad = (x, y, letter, col, key) => { const bg = g(svg); Ci(bg, 0, 0, 38, { fill: `url(#g${key})`, stroke: mix(col, 0.5), sw: 3 }).setAttribute('filter', 'url(#shd)'); T(bg, 0, 15, letter, { anchor: 'middle', size: 46, fill: '#0b1230', w: 800 }); place(bg, x, y); return bg; };
    const bgA = bad(350, -60, 'a', A, 'A'), bgB = bad(530, -60, 'b', B, 'B');
    const hb = T(svg, 440, 162, 'herhangi bir sayı', { anchor: 'middle', size: 24, fill: MUTE, w: 600 }); hide(hb);
    await par(say(c, 'Bu kadar örnekten bir kural sezebilirsin. Ama her sayı çiftini tek tek deneyemeyiz. İşte harfin gücü: <span class="ca">a</span> ve <span class="cb">b</span>, <b>herhangi</b> iki sayı demek.'), (async () => {
      await par(fade(c, stack, 500), fade(c, stackLab, 500));
      await c.tween(900, (e) => { place(bgA, 350, lerp(-60, 98, e)); place(bgB, 530, lerp(-60, 98, e)); }, ease.bounce);
      await fade(c, hb, 500);
    })());

    let K = 24; const BX = 56, rowY = [232, 332];
    const gC = g(svg);
    const sel = { a: 7, b: 4 };
    const mk = (key, col) => block(gC, 10, 52, key, '', col);
    const B1a = mk('A', A), B1b = mk('B', B), B2b = mk('B', B), B2a = mk('A', A);
    const lett = (col, s) => T(gC, 0, 0, s, { anchor: 'middle', size: 26, fill: col, w: 800 });
    const l1a = lett(A, 'a'), l1b = lett(B, 'b'), l2b = lett(B, 'b'), l2a = lett(A, 'a');
    const totB = brH(gC, 0, 10, 412, INK, false, 3.5);
    const totT = T(gC, 0, 462, '', { anchor: 'middle', size: 40, w: 800 });
    const eqS = T(gC, 0, 326, '=', { anchor: 'middle', size: 52, fill: OK, w: 800 });
    hide(gC);
    const hd1 = TS(pr, 668, 112, [['a', A], ' + ', ['b', B], ' = ', ['b', B], ' + ', ['a', A]], { size: 38, w: 800 });
    const hd2 = TS(pr, 668, 172, [['a', A], ' · ', ['b', B], ' = ', ['b', B], ' · ', ['a', A]], { size: 38, w: 800 });
    hide(hd1, hd2);
    const live = [262, 312, 382, 432].map((y) => T(pr, 668, y, '', { size: 28, w: 700 })); hide(...live);
    function setBlk(bk, x, y, w, val, lt) {
      bk.r.setAttribute('width', w); bk.t.setAttribute('x', w / 2); bk.t.textContent = num(val); bk.t.style.opacity = w >= 34 ? 1 : 0;
      place(bk.g, x, y); lt.setAttribute('x', x + w / 2); lt.setAttribute('y', y - 10);
    }
    function upd() {
      const { a, b } = sel, s = a + b; K = Math.min(46, 560 / s); const wa = a * K, wb = b * K;
      setBlk(B1a, BX, rowY[0], wa, a, l1a); setBlk(B1b, BX + wa, rowY[0], wb, b, l1b);
      setBlk(B2b, BX, rowY[1], wb, b, l2b); setBlk(B2a, BX + wb, rowY[1], wa, a, l2a);
      totB.setAttribute('d', `M${BX},${403} V412 H${BX + s * K} V403`);
      totT.setAttribute('x', BX + (s * K) / 2); totT.textContent = num(s);
      eqS.setAttribute('x', BX + (s * K) / 2);
      setParts(live[0], [['a', A], ' + ', ['b', B], ' = ', [num(a), A], ' + ', [num(b), B], ' = ' + num(s)]);
      setParts(live[1], [['b', B], ' + ', ['a', A], ' = ', [num(b), B], ' + ', [num(a), A], ' = ' + num(s)]);
      setParts(live[2], [['a', A], ' · ', ['b', B], ' = ', [num(a), A], ' · ', [num(b), B], ' = ' + num(a * b)]);
      setParts(live[3], [['b', B], ' · ', ['a', A], ' = ', [num(b), B], ' · ', [num(a), A], ' = ' + num(a * b)]);
      live.forEach((t) => fitText(t, 296));
    }
    upd();
    await par(say(c, '<span class="ca">a</span> + <span class="cb">b</span> her zaman <span class="cb">b</span> + <span class="ca">a</span>’ya eşit. Çarpmada da aynı: <span class="ca">a</span> · <span class="cb">b</span> = <span class="cb">b</span> · <span class="ca">a</span>. Kaydırıcılarla dene.'), (async () => {
      await par(fade(c, gC, 600), fade(c, hd1, 600), fade(c, hd2, 600)); await fade(c, live, 500);
      await par(fade(c, hb, 400, 0), fade(c, [bgA, bgB], 400, 0.35));
      stackLab.textContent = '4 örnek';
    })());
    const ext = h('label', { class: 'chk' }, h('input', { type: 'checkbox' }), 'Ondalık sayılar (0,5 adım)');
    let sl;
    ext.firstChild.addEventListener('change', (e) => {
      ['a', 'b'].forEach((k) => { sl.inputs[k].step = e.target.checked ? 0.5 : 1; });
      if (!e.target.checked) ['a', 'b'].forEach((k) => sl.set(k, Math.round(sl.vals[k]), k === 'b'));
    });
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 12, step: 1, v: 7, col: A }, { k: 'b', min: 1, max: 12, step: 1, v: 4, col: B }], (k, v) => {
      sel.a = v.a; sel.b = v.b; upd(); fire(c.tween(300, (e, t) => { aboutC(eqS, +eqS.getAttribute('x'), 310, 1 + 0.25 * Math.sin(t * Math.PI)); }, ease.linear));
    }, ext);
    await par(say(c, 'Hangi sayıları seçersen seç iki satır hep eşit. Birkaç örnek bir ipucudur; <b>harf</b> ise sonsuz sayıdaki örneğin hepsini birden söyler.', { ms: 4200 }), (async () => {
      await c.wait(1500);
      stackLab.textContent = '4 örnek'; await fade(c, stackLab, 10, 1);
      await c.tween(500, (e) => { stackLab.style.opacity = 1 - e; }); stackLab.textContent = 'harf: sonsuz örnek'; await fade(c, stackLab, 500, 1);
    })());
    await c.cont('Devam ›');
    sl.el.remove();

    await say(c, '<b>37 + 58 = 58 + 37</b> mi? Hesaplamadan karar ver.', { ms: 2200 });
    let shown = false;
    await c.choice({
      tag: 'Tahmin et', q: '37 + 58 = 58 + 37 mi? Hesaplamadan karar ver.', options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Hesabı yapmadan da karar verebilirsin: sıra değişince toplam değişmez.'],
      right: 'Doğru. Hesap yapmadan biliyoruz, çünkü a + b = b + a. 7 × 98 = 98 × 7 de bu yüzden aynı.',
      onPick: (i, ok) => {
        if (shown) return; shown = true;
        fire((async () => {
          await par(fade(c, gC, 400, 0), fade(c, live, 400, 0), fade(c, [bgA, bgB, hb, stack, stackLab], 400, 0));
          const gR = g(svg); hide(gR);
          R(gR, 70, 150, 520, 80, { rx: 18, fill: '#10193d', stroke: '#33437f', sw: 2 });
          TS(gR, 330, 206, [['37', A], ' + ', ['58', B], ' = 95'], { anchor: 'middle', size: 44, w: 800 });
          T(gR, 330, 300, '=', { anchor: 'middle', size: 60, fill: OK, w: 800 });
          R(gR, 70, 320, 520, 80, { rx: 18, fill: '#10193d', stroke: '#33437f', sw: 2 });
          TS(gR, 330, 376, [['58', B], ' + ', ['37', A], ' = 95'], { anchor: 'middle', size: 44, w: 800 });
          TS(gR, 330, 480, [['95 = 95', OK]], { anchor: 'middle', size: 50, w: 800 });
          await fade(c, gR, 500);
        })());
      },
    });
    await say(c, '<b>Not:</b> Birkaç örnek kuralı kanıtlamaz, yalnızca ipucu verir. Harfle yazmak (ve Sahne 7’deki alan modeli) kanıtlar.', { ms: 4200 });
    c.note('<b>DEĞİŞME</b> (toplama ve çarpma):<br><span class="ca">a</span> + <span class="cb">b</span> = <span class="cb">b</span> + <span class="ca">a</span> &nbsp;ve&nbsp; <span class="ca">a</span> · <span class="cb">b</span> = <span class="cb">b</span> · <span class="ca">a</span><br>Harf, “herhangi bir sayı” demektir.', 'Kural: değişme', 'kural-degisme');
  }

  /* ============ SAHNE 4 – Çıkarma ve bölmede değişme YOK ============ */
  const COOKIE_TAN = '#d9a35f';
  function cookie(p, r, clip) {
    const cg = g(p);
    const inner = g(cg);
    Ci(inner, 0, 0, r, { fill: COOKIE_TAN, stroke: '#a06a2a', sw: 2 });
    [[-0.35, -0.3], [0.3, -0.35], [0.05, 0.3], [-0.4, 0.35], [0.45, 0.2]].forEach(([dx, dy]) => Ci(inner, dx * r, dy * r, r * 0.13, { fill: '#5b3516' }));
    if (clip) inner.setAttribute('clip-path', `url(#${clip})`);
    return cg;
  }
  function arcJump(p, x1, x2, y, hgt, col, label) {
    const xm = (x1 + x2) / 2;
    const path = P(p, `M${x1},${y} Q${xm},${y - hgt * 2} ${x2},${y}`, { stroke: col, sw: 5 });
    const ang = (Math.atan2(2 * hgt, x2 - xm) * 180) / Math.PI;
    const head = g(p, { transform: `translate(${x2} ${y}) rotate(${ang})` });
    P(head, 'M0,0 L-18,-11 L-18,11 Z', { fill: col }); head.style.opacity = 0;
    const lab = T(p, xm, y - hgt - 14, label, { anchor: 'middle', size: 32, fill: col, w: 800 }); lab.style.opacity = 0;
    path.style.opacity = 0;
    return { path, head, lab };
  }
  async function s4(c) {
    const svg = base(c);
    const defs = svg.querySelector('defs');
    const cl = SV('clipPath', { id: 'clipL' }, defs); SV('rect', { x: -40, y: -40, width: 40, height: 80 }, cl);
    const cr = SV('clipPath', { id: 'clipR' }, defs); SV('rect', { x: 0, y: -40, width: 40, height: 80 }, cr);
    const px = sidePanel(svg); const pr = px.rows;
    const AX = 176, XV = (v) => 246 + v * 44;
    const scene = g(svg);
    const nl = g(scene);
    L(nl, XV(-4) - 16, AX, XV(8) + 16, AX, '#6d7bb8', 3);
    for (let v = -4; v <= 8; v++) {
      L(nl, XV(v), AX - (v === 0 ? 12 : 8), XV(v), AX + (v === 0 ? 12 : 8), v === 0 ? INK : '#6d7bb8', v === 0 ? 4 : 2.5);
      T(nl, XV(v), AX + 40, v < 0 ? MIN + String(-v) : String(v), { anchor: 'middle', size: 22, fill: v === 0 ? INK : MUTE, w: v === 0 ? 800 : 500 });
    }
    hide(nl);
    await par(say(c, 'Değişme her işlemde var mı? <b>5 − 3</b> = 2. Peki <b>3 − 5</b>? Sayı doğrusunda sıfırın soluna geçiyoruz: −2.'), (async () => {
      await fade(c, nl, 500);
      const dot0 = Ci(scene, XV(5), AX, 12, { fill: A }); dot0.style.opacity = 0; await popIn(c, dot0, XV(5), AX, 350);
      const j1 = arcJump(scene, XV(5), XV(2), AX - 14, 62, A, MIN + '3');
      await drawIn(c, j1.path, 800); await par(fade(c, j1.head, 150), fade(c, j1.lab, 300));
      const m1 = Ci(scene, XV(2), AX, 14, { fill: OK, stroke: '#fff', sw: 3 }); m1.style.opacity = 0; await popIn(c, m1, XV(2), AX, 350);
      TS(pr, 668, 116, [['5', A], ' ' + MIN + ' 3 = ', ['2', OK]], { size: 38, w: 800 });
      await c.wait(800);
      const dot1 = Ci(scene, XV(3), AX, 12, { fill: A }); dot1.style.opacity = 0; await popIn(c, dot1, XV(3), AX, 350);
      const j2 = arcJump(scene, XV(3), XV(-2), AX - 14, 96, A, MIN + '5');
      await drawIn(c, j2.path, 1000); await par(fade(c, j2.head, 150), fade(c, j2.lab, 300));
      const m2 = Ci(scene, XV(-2), AX, 14, { fill: BAD, stroke: '#fff', sw: 3 }); m2.style.opacity = 0; await popIn(c, m2, XV(-2), AX, 350);
      TS(pr, 668, 176, [['3', A], ' ' + MIN + ' 5 = ', [MIN + '2', BAD]], { size: 38, w: 800 });
      await c.wait(500);
      const cn = g(scene); P(cn, `M${XV(2)},${AX + 62} V${AX + 74} H${XV(-2)} V${AX + 62}`, { stroke: MUTE, sw: 3, dash: '8 6' });
      T(cn, XV(0), AX + 124, '≠', { anchor: 'middle', size: 66, fill: BAD, w: 800 }); cn.style.opacity = 0; await fade(c, cn, 500);
      TS(pr, 668, 244, [['5 ' + MIN + ' 3 ≠ 3 ' + MIN + ' 5', BAD]], { size: 36, w: 800 });
    })());

    /* bölme */
    const dv = g(scene); hide(dv);
    const plateY = 396;
    T(dv, 178, 356, '6 ÷ 3', { anchor: 'middle', size: 32, fill: A, w: 800 });
    T(dv, 494, 356, '3 ÷ 6', { anchor: 'middle', size: 32, fill: B, w: 800 });
    const boxL = [], boxR = [];
    const mkBox = (arr, x, w, y) => { const bx = g(dv); P(bx, `M${x},${y} L${x + 6},${y + 70} H${x + w - 6} L${x + w},${y} `, { stroke: '#8f9bc4', sw: 3, fill: '#fff', fo: 0.05 }); arr.push({ x, w, y }); };
    for (let k = 0; k < 3; k++) mkBox(boxL, 36 + k * 106, 94, 456);
    for (let k = 0; k < 6; k++) mkBox(boxR, 346 + k * 49, 44, 456);
    await par(say(c, 'Bölmede de durum aynı: <b>6 ÷ 3</b> = 2; <b>3 ÷ 6</b> ise yarım. Kurabiyeleri kutulara paylaştır.', { ms: 5600 }), (async () => {
      await fade(c, dv, 500);
      /* sol: 6 kurabiye -> 3 kutu */
      const cs = []; for (let i = 0; i < 6; i++) { const ck = cookie(dv, 17); place(ck, 62 + i * 46, plateY); cs.push(ck); }
      for (let i = 0; i < 6; i++) {
        const bxk = boxL[Math.floor(i / 2)], tx = bxk.x + 28 + (i % 2) * 38, ty = bxk.y + 48;
        const sx = 62 + i * 46;
        await c.tween(380, (e) => place(cs[i], lerp(sx, tx, e), lerp(plateY, ty, e) - Math.sin(e * Math.PI) * 46), ease.inOut);
      }
      TS(pr, 668, 330, [['6', A], ' ÷ 3 = ', ['2', OK]], { size: 38, w: 800 });
      await c.wait(500);
      /* sağ: 3 kurabiye -> 6 kutu (yarımlar) */
      const whole = []; for (let i = 0; i < 3; i++) { const ck = cookie(dv, 22); place(ck, 392 + i * 98, plateY); whole.push(ck); }
      for (let i = 0; i < 3; i++) {
        const cx = 392 + i * 98;
        const cut = L(dv, cx, plateY - 30, cx, plateY + 30, '#fff', 3); cut.style.opacity = 0;
        await fade(c, cut, 200); cut.remove();
        const hl = cookie(dv, 22, 'clipL'), hr = cookie(dv, 22, 'clipR'); whole[i].remove();
        place(hl, cx, plateY); place(hr, cx, plateY);
        await c.tween(250, (e) => { place(hl, cx - 8 * e, plateY); place(hr, cx + 8 * e, plateY); }, ease.out);
        for (const [hh, side, k] of [[hl, -1, i * 2], [hr, 1, i * 2 + 1]]) {
          const bxk = boxR[k], tx = bxk.x + bxk.w / 2 + (side < 0 ? 6 : -6), ty = bxk.y + 52, sx = cx + side * 8;
          fire(c.tween(420, (e) => place(hh, lerp(sx, tx, e), lerp(plateY, ty, e) - Math.sin(e * Math.PI) * 40, 1), ease.inOut));
          await c.wait(160);
        }
        await c.wait(350);
      }
      TS(pr, 668, 390, [['3', B], ' ÷ 6 = ', ['0,5', OK]], { size: 38, w: 800 });
      await c.wait(500);
      TS(pr, 668, 458, [['6 ÷ 3 ≠ 3 ÷ 6', BAD]], { size: 36, w: 800 });
    })());

    await say(c, 'Tek bir <b>karşı örnek</b>, bir kuralı çürütmeye yeter.', { ms: 2400 });
    /* ipucu (isteğe bağlı) */
    const hintOut = g(pr);
    const hintBtn = h('button', { class: 'tool', onclick: () => {
      hintBtn.disabled = true;
      TS(hintOut, 668, 498, [['5 ' + MIN + ' 3 = 5 + (' + MIN + '3) = (' + MIN + '3) + 5', MUTE]], { size: 22, w: 600 });
      T(hintOut, 668, 526, 'Eksi işareti sayıyla birlikte gelir.', { size: 22, fill: MUTE, w: 500 });
    } }, 'İpucu: çıkarmayı toplama gibi yaz');
    c.panel(null, h('div', { class: 'row' }, hintBtn, h('span', { class: 'muted' }, 'İsteğe bağlı')));
    c.note('Çıkarmada ve bölmede <b>DEĞİŞME YOK</b>.<br>5 − 3 ≠ 3 − 5 &nbsp;ve&nbsp; 6 ÷ 3 ≠ 3 ÷ 6<br>Bir kural “her zaman” diyorsa, tek karşı örnek onu çürütür.', 'Kural: karşı örnek', 'kural-cikarma-degisme');

    /* slider */
    await c.cont('Devam ›');
    c.clearAct();
    await fade(c, scene, 500, 0);
    const ex = g(svg); hide(ex);
    const ZX = 322, KS = 26;
    L(ex, ZX, 152, ZX, 224, '#6d7bb8', 2.5, '6 6'); L(ex, ZX, 294, ZX, 366, '#6d7bb8', 2.5, '6 6');
    const lab1 = TS(ex, 60, 150, [''], { size: 30, w: 800 }), lab2 = TS(ex, 60, 292, [''], { size: 30, w: 800 });
    const bar1 = R(ex, ZX, 160, 10, 56, { rx: 10, fill: OK }), bar2 = R(ex, ZX, 302, 10, 56, { rx: 10, fill: OK });
    const sign = T(ex, 560, 272, '', { anchor: 'middle', size: 84, w: 800 });
    const st = { a: 5, b: 3, mode: 'sub' };
    const approx = (v) => (Math.abs(v * 100 - Math.round(v * 100)) < 1e-9 ? '' : '≈ ');
    const fv = (v) => approx(v) + num(Math.round(v * 100) / 100);
    const setBar = (bar, v) => { const w = Math.abs(v) * KS; bar.setAttribute('width', Math.max(2, w)); bar.setAttribute('x', v < 0 ? ZX - w : ZX); bar.setAttribute('fill', v < 0 ? BAD : OK); };
    let fbBox;
    function updX() {
      const { a, b, mode } = st; const op = mode === 'sub' ? MIN : '÷';
      const v1 = mode === 'sub' ? a - b : a / b, v2 = mode === 'sub' ? b - a : b / a;
      setParts(lab1, [['a', A], ' ' + op + ' ', ['b', B], ' = ', [String(a), A], ' ' + op + ' ', [String(b), B], ' = ' + fv(v1)]);
      setParts(lab2, [['b', B], ' ' + op + ' ', ['a', A], ' = ', [String(b), B], ' ' + op + ' ', [String(a), A], ' = ' + fv(v2)]);
      setBar(bar1, v1); setBar(bar2, v2);
      const eq = Math.abs(v1 - v2) < 1e-9;
      sign.textContent = eq ? '=' : '≠'; sign.style.fill = eq ? OK : BAD;
      c.feedback(fbBox, eq ? 'info' : 'no', eq ? 'Eşit çıktı ama bu sadece özel bir durum (a = b). Kural, <b>tüm</b> a ve b için geçerli olmalıydı.' : `Şu an a = ${a}, b = ${b}: sonuçlar <b>farklı</b>. Kuralın bozulduğu bir örnek bulduk: karşı örnek budur.`);
    }
    fbBox = h('div');
    const seg = h('div', { class: 'seg' });
    const bS = h('button', { class: 'on', onclick: () => { st.mode = 'sub'; bS.className = 'on'; bD.className = ''; updX(); } }, 'a − b  ve  b − a');
    const bD = h('button', { onclick: () => { st.mode = 'div'; bD.className = 'on'; bS.className = ''; updX(); } }, 'a ÷ b  ve  b ÷ a');
    seg.append(bS, bD);
    const sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 12, step: 1, v: 5, col: A }, { k: 'b', min: 1, max: 12, step: 1, v: 3, col: B }], (k, v) => { st.a = v.a; st.b = v.b; updX(); }, h('div', {}, seg, fbBox));
    updX();
    await par(say(c, 'Sen de dene: <span class="ca">a</span> ile <span class="cb">b</span>’yi değiştir. Sonuçlar ters işaretli; yalnızca <span class="ca">a</span> = <span class="cb">b</span> iken eşit.', { ms: 4200 }), fade(c, ex, 500));
    await c.cont('Devam ›');
    sl.el.remove();
    const q10 = TS(ex, 60, 504, [['10 ' + MIN + ' 4 = 6', OK], '   ', ['4 ' + MIN + ' 10 = ' + MIN + '6', BAD]], { size: 30, w: 800 }); hide(q10);
    await c.choice({
      tag: 'Tahmin et', q: 'Hangisi daha büyük?', options: ['10 − 4', '4 − 10'], answer: 0,
      hints: ['', '4 − 10 sıfırın altına iniyor: −6. Sıfırın solundaki sayılar daha küçüktür.'],
      right: 'Doğru. 10 − 4 = 6, ama 4 − 10 = −6. Sıra değişince sonuç da değişti.',
      onPick: (i, ok) => { if (ok) fire(fade(c, q10, 500)); },
    });
  }

  /* ============ izometrik küp yardımcıları ============ */
  function isoCubes(parent, I, J, K, s, O) {
    const pt = (i, j, k) => [O.x + (i - j) * 0.866 * s, O.y + (i + j) * 0.5 * s - k * s];
    const list = [];
    for (let i = 0; i < I; i++) for (let j = 0; j < J; j++) for (let k = 0; k < K; k++) list.push({ i, j, k });
    list.sort((p, q) => (p.i + p.j) - (q.i + q.j) || p.k - q.k);
    const gg = g(parent);
    list.forEach((cb) => {
      const poly = (pts) => SV('polygon', { points: pts.map((q) => q.join(',')).join(' '), stroke: '#0b1230', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }, gg);
      const { i, j, k } = cb;
      cb.top = poly([pt(i, j, k + 1), pt(i + 1, j, k + 1), pt(i + 1, j + 1, k + 1), pt(i, j + 1, k + 1)]);
      cb.right = poly([pt(i + 1, j, k), pt(i + 1, j + 1, k), pt(i + 1, j + 1, k + 1), pt(i + 1, j, k + 1)]);
      cb.left = poly([pt(i, j + 1, k), pt(i + 1, j + 1, k), pt(i + 1, j + 1, k + 1), pt(i, j + 1, k + 1)]);
      cb.paint = (col) => {
        cb.top.setAttribute('fill', col ? mix(col, 0.25) : '#5a6aa6');
        cb.right.setAttribute('fill', col || '#3c4a84');
        cb.left.setAttribute('fill', col ? mix(col, -0.3) : '#2b376c');
      };
      cb.paint(null);
    });
    /* ölçü çizgileri: a (i yönü, amber), b (j yönü, camgöbeği), c (dikey, mercan) */
    const dims = g(parent);
    const seg = (p0, p1, off, col, label, lo) => {
      L(dims, p0[0] + off[0], p0[1] + off[1], p1[0] + off[0], p1[1] + off[1], col, 4.5);
      T(dims, (p0[0] + p1[0]) / 2 + off[0] + lo[0], (p0[1] + p1[1]) / 2 + off[1] + lo[1], label, { anchor: 'middle', size: 26, fill: col, w: 800 });
    };
    seg(pt(0, J, 0), pt(I, J, 0), [-8, 10], A, 'a=' + I, [-16, 20]);
    seg(pt(I, 0, 0), pt(I, J, 0), [10, 10], B, 'b=' + J, [22, 18]);
    seg(pt(0, J, 0), pt(0, J, K), [-14, 0], C, 'c=' + K, [-30, 8]);
    return { g: gg, dims, list, pt };
  }

  /* ============ SAHNE 5 – Birleşme ============ */
  async function s5(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const U = 36, BX = 64, BY = 112;
    const gT = g(svg);
    const bl = [block(gT, 2 * U, 56, 'A', '2', A), block(gT, 3 * U, 56, 'B', '3', B), block(gT, 4 * U, 56, 'C', '4', C)];
    const bxs = [BX, BX + 2 * U, BX + 5 * U];
    bl.forEach((b, i) => place(b.g, bxs[i], BY));
    [['a', A], ['b', B], ['c', C]].forEach(([l, col], i) => T(gT, bxs[i] + [2, 3, 4][i] * U / 2, BY - 10, l, { anchor: 'middle', size: 26, fill: col, w: 800 }));
    R(gT, BX, 246, 9 * U, 26, { rx: 9, fill: 'url(#gG)', stroke: mix(OK, 0.4), sw: 2 });
    const totLab = T(gT, BX + 9 * U + 16, 270, '9', { size: 42, fill: OK, w: 800 });
    T(gT, BX + 9 * U + 52, 268, 'toplam', { size: 22, fill: MUTE, w: 500 });
    hide(gT);
    const cap = g(svg); hide(cap);
    const capR = R(cap, 0, BY - 40, 10, 100, { rx: 30, fill: '#fff', fo: 0.1, stroke: '#fff', sw: 3.5 }); capR.setAttribute('filter', 'url(#glow)');
    const capT = T(cap, 0, BY - 54, '', { anchor: 'middle', size: 26, w: 700 });
    const badge = g(cap); Ci(badge, 0, 0, 23, { fill: '#0b1230', stroke: INK, sw: 2.5 }); const badgeT = T(badge, 0, 9, '5', { anchor: 'middle', size: 27, w: 800 });
    const capX = (t) => [lerp(BX - 8, bxs[1] - 8, t), lerp(BX + 5 * U + 8, BX + 9 * U + 8, t)];
    function setCap(t) {
      const [x1, x2] = capX(t); capR.setAttribute('x', x1); capR.setAttribute('width', x2 - x1);
      capT.setAttribute('x', (x1 + x2) / 2); place(badge, (x1 + x2) / 2, BY + 90);
      const L_ = t < 0.5;
      setParts(capT, L_ ? ['(', ['2', A], ' + ', ['3', B], ')'] : ['(', ['3', B], ' + ', ['4', C], ')']);
      badgeT.textContent = L_ ? '5' : '7';
    }
    setCap(0);
    const eq2 = (y, l, r) => [TS(pr, 668, y, l, { size: 34, w: 800 }), TS(pr, 668, y + 40, [['= ', OK], ...r], { size: 32, w: 800 })];

    await par(say(c, 'Üç sayıyı toplarken önce hangi ikisini topladığın sonucu etkiler mi? <b>(2 + 3) + 4</b> = 5 + 4 = 9.'), (async () => {
      await fade(c, gT, 600); await c.wait(300); await fade(c, cap, 500);
      eq2(110, ['(', ['2', A], ' + ', ['3', B], ') + ', ['4', C]], ['5 + 4 = 9']);
      await c.wait(700);
    })());
    await par(say(c, 'Parantezi sağa kaydır: <b>2 + (3 + 4)</b> = 2 + 7 = 9. Toplam çubuğunun uzunluğu hiç değişmiyor.'), (async () => {
      await c.tween(1000, (e) => setCap(e), ease.inOut);
      eq2(214, [['2', A], ' + (', ['3', B], ' + ', ['4', C], ')'], ['2 + 7 = 9']);
      await c.wait(300);
      TS(pr, 668, 318, [['toplam aynı: 9 = 9', OK]], { size: 28, w: 800 });
      await pulse(c, totLab, 500, 0.3);
    })());

    /* çarpma: izometrik kutu */
    const s = 30, O = { x: 200, y: 446 };
    const cb = isoCubes(svg, 2, 3, 4, s, O); hide(cb.g, cb.dims);
    const cg = g(svg); hide(cg);
    const head = TS(cg, 340, 356, [''], { size: 30, w: 800 });
    const big = T(cg, 340, 436, '0', { size: 64, fill: A, w: 800 });
    const unit = T(cg, 340, 470, 'küp', { size: 26, fill: MUTE, w: 600 });
    const sub = T(cg, 340, 510, '', { size: 24, fill: MUTE, w: 600 });
    await par(say(c, 'Çarpmada da aynı: bir kutuyu önce <b>katman katman</b> ya da önce <b>dilim dilim</b> sayabilirsin; küp sayısı değişmez.'), (async () => {
      await par(fade(c, cb.g, 600), fade(c, cb.dims, 600), fade(c, cg, 600));
      const L1 = [B, mix(B, 0.45)], R1 = [A, mix(A, 0.45)];
      setParts(head, ['Önce ', ['2', A], ' · ', ['3', B], ' → 6 küp']);
      await c.wait(500);
      /* 1) katman katman */
      for (let k = 0; k < 4; k++) {
        cb.list.filter((q) => q.k === k).forEach((q) => q.paint(L1[k % 2]));
        const n = 6 * (k + 1);
        await c.tween(600, (e) => { big.textContent = String(Math.round(lerp(k ? 6 * k : 0, n, e))); }, ease.out);
        sub.textContent = k === 0 ? '1 katman = 6 küp' : (k + 1) + ' katman = ' + n + ' küp';
        await c.wait(250);
      }
      setParts(head, ['(', ['2', A], ' · ', ['3', B], ') · ', ['4', C], ' = 6 · 4 = 24']);
      TS(pr, 668, 372, [['(', INK], ['2', A], ' · ', ['3', B], ') · ', ['4', C]], { size: 34, w: 800 });
      TS(pr, 668, 412, [['= ', OK], '6 · 4 = 24'], { size: 32, w: 800 });
      await c.wait(1100);
      /* 2) dilim dilim */
      cb.list.forEach((q) => q.paint(null)); big.textContent = '0'; sub.textContent = '';
      setParts(head, ['Önce ', ['3', B], ' · ', ['4', C], ' → 12 küp']);
      await c.wait(400);
      for (let i = 0; i < 2; i++) {
        cb.list.filter((q) => q.i === i).forEach((q) => q.paint(R1[i % 2]));
        const n = 12 * (i + 1);
        await c.tween(700, (e) => { big.textContent = String(Math.round(lerp(i ? 12 : 0, n, e))); }, ease.out);
        sub.textContent = (i + 1) + ' dilim = ' + n + ' küp';
        await c.wait(300);
      }
      setParts(head, [['2', A], ' · (', ['3', B], ' · ', ['4', C], ') = 2 · 12 = 24']);
      TS(pr, 668, 470, [['2', A], ' · (', ['3', B], ' · ', ['4', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 510, [['= ', OK], '2 · 12 = 24'], { size: 32, w: 800 });
      await c.wait(900);
    })());

    /* harfe geçiş */
    await fade(c, [gT, cap, cb.g, cb.dims, cg], 500, 0);
    const gen = g(svg); hide(gen);
    const f1 = TS(gen, 330, 230, ['(', ['a', A], ' + ', ['b', B], ') + ', ['c', C], ' = ', ['a', A], ' + (', ['b', B], ' + ', ['c', C], ')'], { anchor: 'middle', size: 44, w: 800 });
    const f2 = TS(gen, 330, 360, ['(', ['a', A], ' · ', ['b', B], ') · ', ['c', C], ' = ', ['a', A], ' · (', ['b', B], ' · ', ['c', C], ')'], { anchor: 'middle', size: 44, w: 800 });
    const hl = R(gen, 0, 0, 10, 56, { rx: 22, fill: '#fff', fo: 0.1, stroke: '#fff', sw: 3 });
    const grpBox = (t, i0, i1) => { const p0 = t.getStartPositionOfChar(i0), p1 = t.getEndPositionOfChar(i1); return [p0.x - 10, p1.x + 10]; };
    const place_hl = (t, l, rr, row, e) => { const a = grpBox(t, ...l), b = grpBox(t, ...rr); const y = row - 40; hl.setAttribute('y', y); hl.setAttribute('x', lerp(a[0], b[0], e)); hl.setAttribute('width', lerp(a[1] - a[0], b[1] - b[0], e)); };
    /* karakter indeksleri: "(a + b) + c = a + (b + c)" */
    const idxL = [0, 6], idxR = [f1.textContent.lastIndexOf('('), f1.textContent.length - 1];
    const idxL2 = [0, 6], idxR2 = [f2.textContent.lastIndexOf('('), f2.textContent.length - 1];
    await par(say(c, 'Harfle yazalım: <b>(a + b) + c = a + (b + c)</b> ve <b>(a · b) · c = a · (b · c)</b>. Parantez kayar, sonuç değişmez.'), (async () => {
      await fade(c, gen, 600); place_hl(f1, idxL, idxR, 230, 0); await c.wait(500);
      await c.tween(1000, (e) => place_hl(f1, idxL, idxR, 230, e), ease.inOut); await c.wait(300);
      await c.tween(1000, (e) => place_hl(f2, idxL2, idxR2, 360, e), ease.inOut);
      await c.wait(400);
    })());

    /* etkileşim: kaydırıcılar, sürüklenebilir parantez */
    await fade(c, [gen, pr], 400, 0);
    pr.innerHTML = ''; pr.style.opacity = 1;
    const gI = g(svg);
    const st = { mode: 'add', a: 2, b: 3, c: 4, t: 0 };
    const H1 = TS(pr, 668, 108, [''], { size: 30, w: 800 }), H2 = TS(pr, 668, 146, [''], { size: 30, w: 800 });
    const rowsT = [226, 268, 350, 392].map((y, i) => TS(pr, 668, y, [''], { size: i % 2 ? 30 : 32, w: 800 }));
    const sep = L(pr, 668, 188, 960, 188, '#33437f', 2);
    let fb, sl;
    const op = () => (st.mode === 'add' ? ' + ' : ' · ');
    function updRows() {
      const { a, b, c: cc } = st, p = op(), f = st.mode === 'add' ? (x, y) => x + y : (x, y) => x * y;
      setParts(H1, ['(', ['a', A], p, ['b', B], ')' + p, ['c', C]]); setParts(H2, [['= ', OK], ['a', A], p + '(', ['b', B], p, ['c', C], ')']);
      const ab = f(a, b), bc = f(b, cc), tot = f(ab, cc);
      setParts(rowsT[0], ['(', [String(a), A], p, [String(b), B], ')' + p, [String(cc), C]]);
      setParts(rowsT[1], [['= ', OK], ab + p + cc + ' = ' + tot]);
      setParts(rowsT[2], [[String(a), A], p + '(', [String(b), B], p, [String(cc), C], ')']);
      setParts(rowsT[3], [['= ', OK], a + p + bc + ' = ' + tot]);
      const left = st.t < 0.5;
      rowsT.forEach((r, i) => { r.style.opacity = (i < 2) === left ? 1 : 0.35; fitText(r, 290); });
    }
    function renderAdd() {
      gI.innerHTML = '';
      const { a, b, c: cc } = st, u = Math.min(56, 540 / (a + b + cc)), bx0 = 64, by = 176;
      const wa = a * u, wb = b * u, wc = cc * u, tot = wa + wb + wc;
      const xs = [bx0, bx0 + wa, bx0 + wa + wb], ws = [wa, wb, wc];
      [['A', A, a], ['B', B, b], ['C', C, cc]].forEach(([key, col, v], i) => {
        const bk = block(gI, ws[i], 56, key, String(v), col); place(bk.g, xs[i], by); bk.t.style.opacity = ws[i] >= 30 ? 1 : 0;
        T(gI, xs[i] + ws[i] / 2, by - 10, ['a', 'b', 'c'][i], { anchor: 'middle', size: 26, fill: col, w: 800 });
      });
      R(gI, bx0, 322, tot, 26, { rx: 9, fill: 'url(#gG)', stroke: mix(OK, 0.4), sw: 2 });
      T(gI, bx0 + tot + 14, 346, String(a + b + cc), { size: 42, fill: OK, w: 800 });
      T(gI, bx0, 392, 'Parantezi sürükle: ↔', { size: 24, fill: MUTE, w: 600 });
      const cx = (t) => [lerp(bx0 - 8, bx0 + wa - 8, t), lerp(bx0 + wa + wb + 8, bx0 + tot + 8, t)];
      const cp = g(gI);
      const cr = R(cp, 0, by - 42, 10, 102, { rx: 30, fill: '#fff', fo: 0.12, stroke: '#fff', sw: 3.5 }); cr.setAttribute('filter', 'url(#glow)');
      const ct = T(cp, 0, by - 56, '', { anchor: 'middle', size: 26, w: 700 });
      const bd = g(cp); Ci(bd, 0, 0, 24, { fill: '#0b1230', stroke: INK, sw: 2.5 }); const bdt = T(bd, 0, 9, '', { anchor: 'middle', size: 27, w: 800 });
      const setC = (t) => {
        const [x1, x2] = cx(t); cr.setAttribute('x', x1); cr.setAttribute('width', x2 - x1); ct.setAttribute('x', (x1 + x2) / 2); place(bd, (x1 + x2) / 2, by + 92);
        const Lf = t < 0.5; setParts(ct, Lf ? ['(', [String(a), A], ' + ', [String(b), B], ')'] : ['(', [String(b), B], ' + ', [String(cc), C], ')']);
        bdt.textContent = String(Lf ? a + b : b + cc);
      };
      setC(st.t);
      const hit = R(cp, 0, by - 60, 10, 160, { rx: 30, fill: '#fff', fo: 0.001 });
      const syncHit = () => { hit.setAttribute('x', +cr.getAttribute('x') - 6); hit.setAttribute('width', +cr.getAttribute('width') + 12); };
      syncHit();
      let grab = 0;
      drag(c, svg, hit, {
        start: (p) => { const [x1, x2] = cx(st.t); grab = p.x - (x1 + x2) / 2; },
        move: (p) => { const [l0, l1] = cx(0), [r0, r1] = cx(1); const cL = (l0 + l1) / 2, cR = (r0 + r1) / 2; st.t = clamp((p.x - grab - cL) / (cR - cL), 0, 1); setC(st.t); syncHit(); updRows(); },
        end: () => {
          const from = st.t, to = from < 0.5 ? 0 : 1;
          fire(c.tween(350, (e) => { st.t = lerp(from, to, e); setC(st.t); syncHit(); updRows(); }, ease.out).then(() => {
            c.feedback(fb, 'ok', `Parantez yer değiştirdi, toplam aynı: <b>${a + b + cc}</b>.`);
          }));
        },
      });
    }
    function renderMul() {
      gI.innerHTML = '';
      const { a, b, c: cc } = st;
      const s2 = Math.min(34, 330 / (cc + (a + b) / 2), 540 / ((a + b) * 0.866));
      const O2 = { x: 64 + b * 0.866 * s2 + 40, y: 120 + cc * s2 };
      const ic = isoCubes(gI, a, b, cc, s2, O2);
      const L1 = [B, mix(B, 0.45)], R1 = [A, mix(A, 0.45)];
      const left = st.t < 0.5;
      ic.list.forEach((q) => q.paint(left ? L1[q.k % 2] : R1[q.i % 2]));
      T(gI, 560, 250, String(a * b * cc), { anchor: 'middle', size: 70, fill: OK, w: 800 });
      T(gI, 560, 284, 'küp', { anchor: 'middle', size: 26, fill: MUTE, w: 600 });
      T(gI, 560, 330, left ? 'katman katman' : 'dilim dilim', { anchor: 'middle', size: 24, fill: left ? B : A, w: 700 });
    }
    function render() { (st.mode === 'add' ? renderAdd : renderMul)(); updRows(); }
    const seg = h('div', { class: 'seg' });
    const bAdd = h('button', { class: 'on' }, 'Toplama (+)'), bMul = h('button', {}, 'Çarpma (·)');
    const bG = h('button', { class: 'on', style: { display: 'none' } }, 'Önce a·b'), bG2 = h('button', { style: { display: 'none' } }, 'Önce b·c');
    seg.append(bAdd, bMul, bG, bG2);
    fb = h('div');
    const setMode = (m) => {
      st.mode = m; st.t = 0; bG.className = 'on'; bG2.className = ''; bAdd.className = m === 'add' ? 'on' : ''; bMul.className = m === 'mul' ? 'on' : '';
      bG.style.display = bG2.style.display = m === 'mul' ? '' : 'none';
      const mx = m === 'add' ? 9 : 6;
      ['a', 'b', 'c'].forEach((k) => { sl.inputs[k].max = mx; sl.set(k, Math.min(st[k], mx), true); st[k] = Math.min(st[k], mx); });
      c.feedback(fb, 'info', m === 'add' ? 'Toplama: parantez kapsülünü sürükle.' : 'Çarpma: kutuyu önce katman katman, sonra dilim dilim say.');
      render();
    };
    bAdd.onclick = () => setMode('add'); bMul.onclick = () => setMode('mul');
    bG.onclick = () => { st.t = 0; bG.className = 'on'; bG2.className = ''; render(); };
    bG2.onclick = () => { st.t = 1; bG2.className = 'on'; bG.className = ''; render(); };
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 9, step: 1, v: 2, col: A }, { k: 'b', min: 1, max: 9, step: 1, v: 3, col: B }, { k: 'c', min: 1, max: 9, step: 1, v: 4, col: C }], (k, v) => {
      st.a = v.a; st.b = v.b; st.c = v.c; render();
    }, h('div', {}, seg, fb));
    c.feedback(fb, 'info', 'Toplama: parantez kapsülünü sürükle.');
    render();
    await par(say(c, 'Şimdi sen dene: sayıları değiştir, parantez kapsülünü ve çarpmada gruplamayı oynat. Sonuç hiç değişmez.', { ms: 4200 }), fade(c, gI, 400, 1, 0));
    await c.cont('Devam ›');
    sl.el.remove();

    await c.choice({
      tag: 'Tahmin et', q: '17 + 28 + 12’yi zihinden hesaplamak için hangi gruplama kolay?',
      options: ['(17 + 28) + 12', '17 + (28 + 12)'], answer: 1,
      hints: ['İkisi de 57 verir; ama 17 + 28 = 45, sonra 45 + 12 zihinden daha zahmetli. Daha kolay bir gruplama var.', ''],
      right: 'İkisi de 57. Ama 28 + 12 = 40 yuvarlak sayı verdiği için ikinci gruplama zihinden kolay: 17 + 40 = 57. Birleşmenin işe yaradığı yer burası.',
    });
    c.note('<b>BİRLEŞME</b> (toplama ve çarpma):<br>(<span class="ca">a</span> + <span class="cb">b</span>) + <span class="cc">c</span> = <span class="ca">a</span> + (<span class="cb">b</span> + <span class="cc">c</span>) &nbsp;ve<br>(<span class="ca">a</span> · <span class="cb">b</span>) · <span class="cc">c</span> = <span class="ca">a</span> · (<span class="cb">b</span> · <span class="cc">c</span>)<br>Parantez kayar, sonuç değişmez.', 'Kural: birleşme', 'kural-birlesme');
  }

  /* ============ SAHNE 6 – Çıkarma ve bölmede birleşme YOK ============ */
  async function s6(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const U = 44, X0 = 56, Y1 = 186, Y2 = 350;
    const gm = g(svg);
    /* ifade: 10 − 5 − 2 (parantez kapsülüyle) */
    const ex = TS(gm, X0, 104, [['10', A], ' ' + MIN + ' ', ['5', B], ' ' + MIN + ' ', ['2', C]], { size: 50, w: 800 });
    const capR = R(gm, 0, 58, 10, 62, { rx: 24, fill: '#fff', fo: 0.1, stroke: '#fff', sw: 3.5 }); capR.setAttribute('filter', 'url(#glow)');
    const ext = (i0, i1) => { const a = ex.getStartPositionOfChar(i0), b = ex.getEndPositionOfChar(i1); return [a.x - 12, b.x + 12]; };
    const capAt = (t) => { const a = ext(0, 5), b = ext(5, 9); capR.setAttribute('x', lerp(a[0], b[0], t)); capR.setAttribute('width', lerp(a[1] - a[0], b[1] - b[0], t)); };
    capAt(0);
    /* çubuklar */
    T(gm, X0, Y1 - 24, 'başlangıç', { size: 22, fill: MUTE, w: 600 });
    T(gm, X0, Y2 - 24, 'çıkarılan torba', { size: 22, fill: MUTE, w: 600 });
    R(gm, X0 - 8, Y2 - 8, 10 * U + 16, 80, { rx: 14, stroke: '#4a5a99', sw: 2, dash: '8 6', fill: '#fff', fo: 0.03 });
    const cellsU = []; // 10 birimlik çubuk
    for (let i = 0; i < 10; i++) {
      const cg2 = g(gm); const rc = R(cg2, 0, 0, U - 3, 64, { rx: 8, fill: A, stroke: mix(A, 0.5), sw: 1.5 }); place(cg2, X0 + i * U, Y1); cellsU.push({ g: cg2, r: rc, x: X0 + i * U, y: Y1 });
    }
    const lblK = T(gm, X0 + 10 * U + 16, Y1 + 42, '', { size: 30, w: 800 });
    const lblT = T(gm, X0 + 10 * U + 16, Y2 + 50, '', { size: 28, w: 800, fill: MUTE });
    hide(gm);
    const colU = (idx, col) => { cellsU[idx].r.setAttribute('fill', col); cellsU[idx].r.setAttribute('stroke', mix(col, 0.5)); };
    const moveCell = (idx, tx, ty, ms) => { const q = cellsU[idx]; const sx = q.x, sy = q.y; q.x = tx; q.y = ty; return c.tween(ms, (e) => place(q.g, lerp(sx, tx, e), lerp(sy, ty, e) - Math.sin(e * Math.PI) * 24), ease.inOut); };
    const eq2 = (y, l, r, col) => [TS(pr, 668, y, l, { size: 32, w: 800 }), TS(pr, 668, y + 38, [['= ', OK], ...r], { size: 30, w: 800 })];

    await par(say(c, 'Aynı parantez kaydırmasını çıkarmada deneyelim. Önce <b>(10 − 5) − 2</b>: 10’dan 5, sonra 2 çıkar.'), (async () => {
      await fade(c, gm, 600); await c.wait(400);
      /* ilk 5 birim torbaya */
      for (let i = 9; i >= 5; i--) colU(i, B);
      await c.wait(300);
      await par(...[9, 8, 7, 6, 5].map((i, k) => c.wait(k * 90).then(() => moveCell(i, X0 + (9 - i) * U, Y2 + 8, 800))));
      lblK.textContent = 'kalan 5'; setParts(lblK, [['kalan 5', A]]);
      for (let i = 4; i >= 3; i--) colU(i, C);
      await c.wait(300);
      await par(...[4, 3].map((i, k) => c.wait(k * 90).then(() => moveCell(i, X0 + (5 + 4 - i) * U, Y2 + 8, 800))));
      for (let i = 0; i < 3; i++) colU(i, OK);
      setParts(lblK, [['kalan 3', OK]]); setParts(lblT, [['torba 7', MUTE]]);
      eq2(112, ['(', ['10', A], ' ' + MIN + ' ', ['5', B], ') ' + MIN + ' ', ['2', C]], ['5 ' + MIN + ' 2 = 3']);
      await c.wait(900);
    })());

    await par(say(c, 'Parantezi kaydırınca <b>5 − 2 = 3</b> olur; çubuktan yalnızca 3 birim çıkar. Kalan 7!'), (async () => {
      /* sıfırla */
      await par(...cellsU.map((q, i) => c.tween(600, (e) => place(q.g, lerp(q.x, X0 + i * U, e), lerp(q.y, Y1, e)), ease.inOut)));
      cellsU.forEach((q, i) => { q.x = X0 + i * U; q.y = Y1; colU(i, A); });
      setParts(lblK, ['']); setParts(lblT, ['']);
      await c.wait(400);
      await c.tween(900, (e) => capAt(e), ease.inOut);
      /* torba: 5 çıkar, 2'si geri verilir => 3 */
      const ea = ext(5, 9), bo = g(gm, { transform: `translate(${(ea[0] + ea[1]) / 2} 152)` }); const badge = g(bo); Ci(badge, 0, 0, 26, { fill: '#0b1230', stroke: INK, sw: 2.5 }); T(badge, 0, 10, '3', { anchor: 'middle', size: 30, w: 800 });
      await popIn(c, badge, 0, 0, 400);
      for (let i = 9; i >= 7; i--) colU(i, B);
      await c.wait(300);
      await par(...[9, 8, 7].map((i, k) => c.wait(k * 90).then(() => moveCell(i, X0 + (9 - i) * U, Y2 + 8, 800))));
      for (let i = 0; i < 7; i++) { colU(i, A); cellsU[i].r.setAttribute('stroke', BAD); cellsU[i].r.setAttribute('stroke-width', 3); }
      setParts(lblT, [['torba 3', MUTE]]);
      /* kalan: 3 -> 7 sıçrar */
      lblK.style.opacity = 1;
      await c.tween(800, (e) => { setParts(lblK, [['kalan ' + Math.round(lerp(3, 7, e)), BAD]]); aboutC(lblK, X0 + 10 * U + 60, Y1 + 30, 1 + 0.25 * Math.sin(e * Math.PI)); }, ease.inOut);
      lblK.removeAttribute('transform');
      const neq = T(gm, 570, 330, '≠', { anchor: 'middle', size: 70, fill: BAD, w: 800 }); neq.style.opacity = 0; await fade(c, neq, 400);
      eq2(210, [['10', A], ' ' + MIN + ' (', ['5', B], ' ' + MIN + ' ', ['2', C], ')'], ['10 ' + MIN + ' 3 = 7']);
      T(pr, 934, 258, '≠', { anchor: 'middle', size: 50, fill: BAD, w: 800 });
      await c.wait(600);
    })());

    await say(c, 'Neden? <b>10 − 5 − 2 = 10 − (5 + 2)</b>: torbada 7 birim var. Kaydırınca torba 3 birime düştü. Parantezin yeri, neyin çıkarılacağını değiştirdi.', { ms: 6500 });

    const dv = g(pr); hide(dv);
    TS(dv, 668, 352, ['(24 ÷ 6) ÷ 2'], { size: 30, w: 800 }); TS(dv, 668, 388, [['= ', OK], '4 ÷ 2 = 2'], { size: 30, w: 800 });
    TS(dv, 668, 446, ['24 ÷ (6 ÷ 2)'], { size: 30, w: 800 }); TS(dv, 668, 482, [['= ', OK], '24 ÷ 3 = 8'], { size: 30, w: 800 });
    T(dv, 934, 440, '≠', { anchor: 'middle', size: 50, fill: BAD, w: 800 });
    await par(say(c, 'Bölmede de aynı sorun var: <b>(24 ÷ 6) ÷ 2 = 2</b>, ama <b>24 ÷ (6 ÷ 2) = 8</b>.'), fade(c, dv, 700));
    await c.choice({
      tag: 'Tahmin et', q: '(24 ÷ 6) ÷ 2 ile 24 ÷ (6 ÷ 2) aynı mı?', options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Toplamadaki gibi sandın. Hesapla: 24 ÷ 6 = 4, 4 ÷ 2 = 2. Ama 6 ÷ 2 = 3, 24 ÷ 3 = 8. Sonuçlar farklı.', ''],
      right: 'Doğru: farklı, 2 ve 8. Bölmede birleşme yok.',
    });
    c.note('<b>Çıkarmada ve bölmede BİRLEŞME YOK.</b><br>(10 − 5) − 2 = 3 &nbsp;ama&nbsp; 10 − (5 − 2) = 7<br>Toplama ve çarpmada özellikler var; çıkarma ve bölmede yok.', 'Kural: birleşme yok', 'kural-cikarma-birlesme');
  }

  /* ============ alan modeli yardımcıları ============ */
  const OXm = 96, OYm = 190;
  function arrowQ(p, S, Cp, E, col) {
    const path = P(p, `M${S[0]},${S[1]} Q${Cp[0]},${Cp[1]} ${E[0]},${E[1]}`, { stroke: col, sw: 4 });
    const ang = (Math.atan2(E[1] - Cp[1], E[0] - Cp[0]) * 180) / Math.PI;
    const head = g(p, { transform: `translate(${E[0]} ${E[1]}) rotate(${ang})` });
    P(head, 'M0,0 L-17,-10 L-17,10 Z', { fill: col });
    return { path, head };
  }
  /* a × (b + c) dikdörtgeni: sol parça (b, camgöbeği), sağ parça (c, mercan) */
  function areaBuild(mg, a, b, cc, u, lab, o = {}) {
    mg.innerHTML = '';
    const hh = a * u, wL = b * u, wR = cc * u;
    const gL = g(mg), gR = g(mg);
    const cl = cells(gL, OXm, OYm, b, a, u, u, { fill: B, fo: 0.36 });
    const cr = cells(gR, OXm + wL, OYm, cc, a, u, u, { fill: C, fo: 0.36 });
    const left = g(mg); brV(left, OXm - 14, OYm, OYm + hh, A, true, 4);
    T(left, OXm - 34, OYm + hh / 2 + 12, lab.a, { anchor: 'end', size: 36, fill: A, w: 800 });
    const top = g(mg);
    R(top, OXm, OYm - 22, wL, 8, { rx: 3, fill: B }); R(top, OXm + wL, OYm - 22, wR, 8, { rx: 3, fill: C });
    T(top, OXm + wL / 2, OYm - 34, lab.b, { anchor: 'middle', size: 34, fill: B, w: 800 });
    T(top, OXm + wL + wR / 2, OYm - 34, lab.c, { anchor: 'middle', size: 34, fill: C, w: 800 });
    const lblL = g(gL), lblR = g(gR);
    const M = { a, b, c: cc, u, hh, wL, wR, gL, gR, cl, cr, lblL, lblR, left, top, lab, gap: 0 };
    M.setGap = (gp) => { M.gap = gp; gR.setAttribute('transform', `translate(${gp} 0)`); };
    /* parça etiketleri */
    const mkLbl = (grp, x, w, parts1, val, colMix) => {
      if (hh >= 64 && w >= 76) {
        TS(grp, x + w / 2, OYm + hh / 2 - 4, parts1, { anchor: 'middle', size: 26, w: 800 });
        if (val != null) T(grp, x + w / 2, OYm + hh / 2 + 34, String(val), { anchor: 'middle', size: 36, w: 800 });
      } else if (hh >= 34 && w >= 56 && val != null) T(grp, x + w / 2, OYm + hh / 2 + 10, String(val), { anchor: 'middle', size: 30, w: 800 });
    };
    if (o.num) {
      mkLbl(lblL, OXm, wL, [[lab.a, A], ' · ', [lab.b, B]], a * b); mkLbl(lblR, OXm + wL, wR, [[lab.a, A], ' · ', [lab.c, C]], a * cc);
    } else {
      mkLbl(lblL, OXm, wL, [['a', A], '·', ['b', B]], a * b); mkLbl(lblR, OXm + wL, wR, [['a', A], '·', ['c', C]], a * cc);
    }
    if (o.arrows) {
      const ar = g(mg); M.arrows = [];
      const S = [OXm - 30, OYm - 34];
      [[OXm + wL / 2], [OXm + wL + wR / 2]].forEach(([tx], i) => {
        const E = [tx, OYm - 70], Cp = [(S[0] + E[0]) / 2, OYm - 112 - i * 8];
        const q = arrowQ(ar, S, Cp, E, A); M.arrows.push(q);
      });
      M.arrowG = ar;
    }
    return M;
  }

  /* ============ SAHNE 7 – Dağılma: a·(b + c) ============ */
  async function s7(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const mg = g(svg); hide(mg);
    const UA = 44;
    let M = areaBuild(mg, 4, 3, 5, UA, { a: '4', b: '3', c: '5' }, { num: true });
    hide(M.lblL, M.lblR, M.top, M.left);
    const sumT = TS(svg, OXm + 4 * UA, OYm + 4 * UA + 66, [''], { anchor: 'middle', size: 42, w: 800 }); hide(sumT);
    const oneT = T(svg, OXm + 4 * UA, OYm + 4 * UA + 112, 'tek parça = iki parçanın toplamı', { anchor: 'middle', size: 24, fill: MUTE, w: 600 }); hide(oneT);

    /* A: 4 × (3 + 5) */
    await par(say(c, 'Şimdi dersin merkezi: <b>dağılma</b>. Yüksekliği 4, genişliği 3 + 5 olan bir dikdörtgen düşün. Alanı iki şekilde bulabiliriz.'), (async () => {
      await fade(c, mg, 700); await par(fade(c, M.top, 500), fade(c, M.left, 500));
      TS(pr, 668, 112, [['4', A], ' · (', ['3', B], ' + ', ['5', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 152, [['= ', OK], '4 · 8 = 32'], { size: 32, w: 800 });
      await c.wait(900);
    })());
    const div = L(svg, OXm + 3 * UA, OYm - 6, OXm + 3 * UA, OYm - 6, INK, 3.5, '7 5');
    await par(say(c, 'Bütünü ölçersek <b>4 · 8</b>; ya da 3. sütundan bölüp <b>4 · 3 + 4 · 5</b>. İkisi de 32.'), (async () => {
      await c.tween(600, (e) => div.setAttribute('y2', lerp(OYm - 6, OYm + 4 * UA + 6, e)), ease.inOut);
      await c.tween(700, (e) => M.setGap(14 * e), ease.back);
      div.style.opacity = 0;
      await par(fade(c, M.lblL, 500), fade(c, M.lblR, 500));
      TS(pr, 668, 214, [['=', OK]], { size: 40, w: 800 });
      TS(pr, 668, 270, [['4', A], '·', ['3', B], ' + ', ['4', A], '·', ['5', C]], { size: 34, w: 800 });
      TS(pr, 668, 310, [['= ', OK], '12 + 20 = 32'], { size: 32, w: 800 });
      sumT.style.opacity = 0; setParts(sumT, [['12', B], ' + ', ['20', C], ' = ', ['32', OK]]); await fade(c, sumT, 500);
      await c.wait(700);
      await c.tween(600, (e) => M.setGap(14 * (1 - e)), ease.inOut);
      await fade(c, oneT, 500); await c.wait(500);
    })());
    c.note('4 · (3 + 5) = 4 · 3 + 4 · 5 = 32<br>Bütün dikdörtgen = iki parçanın toplamı.', 'Alan modeli', 'alan-ilk');

    /* B: birkaç örnek */
    await fade(c, [mg, sumT, oneT], 400, 0);
    pr.innerHTML = '';
    const gB = g(svg);
    const ex = [
      { a: 6, b: 2, cc: 7, l1: [['6', A], ' · (', ['2', B], ' + ', ['7', C], ') = 6 · 9 = 54'], l2: [['6', A], '·', ['2', B], ' + ', ['6', A], '·', ['7', C], ' = 12 + 42 = 54'] },
      { a: 5, b: 10, cc: 4, l1: [['5', A], ' · (', ['10', B], ' + ', ['4', C], ') = 5 · 14 = 70'], l2: [['5', A], '·', ['10', B], ' + ', ['5', A], '·', ['4', C], ' = 50 + 20 = 70'] },
    ];
    const cardsB = ex.map((q, i) => {
      const y = 70 + i * 220, cg = g(gB);
      R(cg, 44, y, 570, 190, { rx: 18, fill: '#10193d', stroke: '#33437f', sw: 2, filter: 'shd' });
      /* eskiz (ölçekli değil) */
      const sw = 120, shh = 78, sx = 70, sy = y + 70, k = q.b / (q.b + q.cc);
      const wl = Math.max(30, sw * k), wr = sw - wl;
      R(cg, sx, sy, wl, shh, { rx: 4, fill: B, fo: 0.4, stroke: B, sw: 2 }); R(cg, sx + wl + 6, sy, wr - 6 < 20 ? 20 : wr - 6, shh, { rx: 4, fill: C, fo: 0.4, stroke: C, sw: 2 });
      T(cg, sx - 8, sy + shh / 2 + 9, String(q.a), { anchor: 'end', size: 26, fill: A, w: 800 });
      T(cg, sx + wl / 2, sy - 10, String(q.b), { anchor: 'middle', size: 26, fill: B, w: 800 });
      T(cg, sx + wl + 6 + (wr - 6) / 2, sy - 10, String(q.cc), { anchor: 'middle', size: 26, fill: C, w: 800 });
      T(cg, sx + sw / 2, sy + shh + 28, 'ölçekli değil', { anchor: 'middle', size: 22, fill: MUTE, w: 500 });
      TS(cg, 232, y + 84, q.l1, { size: 28, w: 800 });
      TS(cg, 232, y + 132, q.l2, { size: 28, w: 800 });
      Ci(cg, 586, y + 28, 15, { fill: OK }); P(cg, `M578,${y + 28} L584,${y + 35} L596,${y + 21}`, { stroke: '#06101f', sw: 3.5 });
      hide(cg); return { g: cg, cy: y + 95 };
    });
    await par(say(c, 'Birkaç örnek: <b>6 · (2 + 7)</b> ve <b>5 · (10 + 4)</b>. İki yoldan da aynı sonuç çıkıyor.'), (async () => {
      for (const cd of cardsB) { await c.tween(600, (e) => { aboutC(cd.g, 330, cd.cy, 1, Math.max(0.01, e)); cd.g.style.opacity = 1; }, ease.out); await c.wait(700); }
      await c.wait(500);
    })());
    await fade(c, gB, 400, 0);

    /* C: harfle */
    const st = { a: 3, b: 2, c: 4, trap: false };
    const unitFor = () => Math.min(56, 520 / (st.b + st.c), 230 / st.a);
    const live = [
      TS(pr, 668, 108, [['a', A], ' · (', ['b', B], ' + ', ['c', C], ')'], { size: 34, w: 800 }),
      T(pr, 668, 148, '', { size: 30, w: 800 }),
      TS(pr, 668, 208, [['=', OK]], { size: 44, w: 800 }),
      TS(pr, 668, 262, [['a', A], '·', ['b', B], ' + ', ['a', A], '·', ['c', C]], { size: 34, w: 800 }),
      T(pr, 668, 302, '', { size: 28, w: 800 }),
    ];
    hide(...live);
    const trapG = g(pr); hide(trapG);
    let trapTexts = null;
    function updLive() {
      const { a, b, c: cc } = st;
      setParts(live[1], [['= ', OK], [String(a), A], ' · (', [String(b), B], ' + ', [String(cc), C], ') = ' + a * (b + cc)]);
      setParts(live[4], [['= ', OK], [String(a), A], '·', [String(b), B], ' + ', [String(a), A], '·', [String(cc), C], ' = ' + a * b + ' + ' + a * cc + ' = ' + (a * b + a * cc)]);
      fitText(live[1], 300); fitText(live[4], 300);
    }
    function rebuild(keepArrows) {
      const u = unitFor();
      M = areaBuild(mg, st.a, st.b, st.c, u, { a: 'a', b: 'b', c: 'c' }, { arrows: true });
      mg.style.opacity = 1;
      if (st.trap) applyTrap(1);
      updLive();
    }
    /* tuzak: a·b + c  -> sağ parça tek satıra düşer */
    function applyTrap(e) {
      const k = lerp(1, 1 / st.a, e);
      M.gR.setAttribute('transform', `matrix(1 0 0 ${k} 0 ${OYm * (1 - k)})`);
      M.lblR.style.opacity = 1 - e;
      if (M.arrowG) M.arrowG.style.opacity = 1 - e;
    }
    rebuild();
    hide(M.top, M.left, M.lblL, M.lblR, M.arrowG);
    const hint = T(svg, OXm, 540, 'Slider’la a, b, c’yi değiştir; iki taraf hep aynı.', { size: 24, fill: MUTE, w: 500 }); hide(hint);
    await par(say(c, 'Harfle: yükseklik <span class="ca">a</span>, genişlik <span class="cb">b</span> + <span class="cc">c</span>. Alan <b>a · (b + c)</b>, parçalara bölünce <b>a · b + a · c</b>.'), (async () => {
      mg.style.opacity = 0; await fade(c, mg, 500); await par(fade(c, M.top, 400), fade(c, M.left, 400), fade(c, M.lblL, 500), fade(c, M.lblR, 500));
      await fade(c, live, 500);
      M.arrowG.style.opacity = 1; M.arrows.forEach((q) => { q.path.style.opacity = 0; q.head.style.opacity = 0; });
      for (const q of M.arrows) { await drawIn(c, q.path, 500); q.head.style.opacity = 1; await c.wait(150); }
    })());
    await say(c, 'Dışarıdaki <span class="ca">a</span>, parantezdeki <b>herkesle</b> tek tek çarpılır.', { ms: 2600 });

    let sl;
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 9, step: 1, v: 3, col: A }, { k: 'b', min: 1, max: 9, step: 1, v: 2, col: B }, { k: 'c', min: 1, max: 9, step: 1, v: 4, col: C }], (k, v) => {
      st.a = v.a; st.b = v.b; st.c = v.c; st.trap = false; rebuild();
    });
    fire(fade(c, hint, 500));
    await par(say(c, 'Kaydırıcılarla dene: hücreleri sayabilirsin. İki satır her zaman birlikte değişir ve eşit kalır.', { ms: 4200 }));
    await c.cont('Devam ›');
    sl.el.remove(); hide(hint);

    /* tuzak tahmini */
    const claim = g(pr); hide(claim);
    R(claim, 662, 326, 312, 78, { rx: 14, fill: BAD, fo: 0.08, stroke: BAD, sw: 2.5, dash: '7 5' });
    T(claim, 676, 354, 'Kolay görünen bir yol:', { size: 22, fill: MUTE, w: 600 });
    TS(claim, 676, 390, [['a', A], ' · (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], '·', ['b', B], ' + ', ['c', C]], { size: 28, w: 800 });
    await fade(c, claim, 500);
    let tested = false;
    const doTest = () => {
      if (tested) return; tested = true;
      fire((async () => {
        st.a = 3; st.b = 2; st.c = 4; st.trap = false;
        rebuild();
        await c.tween(900, (e) => applyTrap(e), ease.inOut);
        const u = M.u, ghost = g(mg);
        R(ghost, OXm + M.wL, OYm + u, M.wR, (st.a - 1) * u, { rx: 6, fill: BAD, fo: 0.07, stroke: BAD, sw: 3, dash: '9 6' });
        T(ghost, OXm + M.wL + M.wR / 2, OYm + u + ((st.a - 1) * u) / 2 + 10, 'kayıp a·c', { anchor: 'middle', size: 28, fill: BAD, w: 800 });
        ghost.style.opacity = 0; await fade(c, ghost, 400);
        trapG.innerHTML = ''; trapG.style.opacity = 1;
        R(trapG, 662, 418, 312, 116, { rx: 14, fill: '#0e1a40', stroke: '#33437f', sw: 2 });
        TS(trapG, 676, 452, [['3', A], ' · (', ['2', B], ' + ', ['4', C], ') = ', ['18', OK]], { size: 26, w: 700 });
        TS(trapG, 676, 484, [['3', A], '·', ['2', B], ' + ', ['4', C], ' = 6 + 4 = ', ['10', BAD]], { size: 26, w: 700 });
        TS(trapG, 818, 520, [['18 ≠ 10', BAD]], { anchor: 'middle', size: 30, w: 800 });
      })());
    };
    await ask(c, {
      tag: 'Tuzak', q: 'Sence <b>a · (b + c) = a · b + c</b> doğru mu?',
      options: [
        { html: 'Evet', ok: false, fb: 'Bu bir tuzak: c’yi a ile çarpmayı unuttun. Alan modelinde sağ parçanın yüksekliği a olmalı.' },
        { html: 'Hayır', ok: true, fb: 'Doğru karar. Dışarıdaki a, c ile de çarpılmalıydı; eksik kalan a·c alanına bak.' },
        { html: 'Test et (a = 3, b = 2, c = 4)', free: doTest, fb: 'Sayıları yerine koydum: 3 · (2 + 4) = 18 ama 3 · 2 + 4 = 10. Alan modelinde sağ parça küçüldü.' },
      ],
      onPick: (i, ok) => { if (!tested) doTest(); },
    });

    /* ters yön */
    await say(c, 'Ters yönde de çalışır (<b>ortak çarpan</b>): <b>7·13 + 7·87 = 7·(13 + 87) = 700</b>.', { ms: 3200 });
    await par(fade(c, [mg, claim, trapG], 400, 0), fade(c, live, 400, 0));
    const rv = g(svg); hide(rv);
    const tw = 400, th = 70, tx0 = 90, ty0 = 200;
    const wl = tw * 0.13, wr = tw * 0.87;
    const pL = g(rv), pRr = g(rv);
    R(pL, tx0, ty0, wl, th, { rx: 6, fill: 'url(#gB)', fo: 0.55, stroke: B, sw: 3 }); R(pRr, tx0 + wl, ty0, wr, th, { rx: 6, fill: 'url(#gC)', fo: 0.55, stroke: C, sw: 3 });
    T(pL, tx0 + wl / 2, ty0 - 12, '13', { anchor: 'middle', size: 28, fill: B, w: 800 }); T(pRr, tx0 + wl + wr / 2, ty0 - 12, '87', { anchor: 'middle', size: 28, fill: C, w: 800 });
    const lA = g(rv); brV(lA, tx0 - 14, ty0, ty0 + th, A, true, 4); T(lA, tx0 - 34, ty0 + th / 2 + 12, '7', { anchor: 'end', size: 36, fill: A, w: 800 });
    T(pL, tx0 + wl / 2, ty0 + th + 38, '91', { anchor: 'middle', size: 30, w: 800 }); T(pRr, tx0 + wl + wr / 2, ty0 + th + 38, '609', { anchor: 'middle', size: 30, w: 800 });
    const rvT = TS(rv, tx0 + tw / 2, ty0 + th + 100, [['91', B], ' + ', ['609', C], ' = ', ['700', OK]], { anchor: 'middle', size: 40, w: 800 });
    pL.setAttribute('transform', 'translate(-18 0)'); pRr.setAttribute('transform', 'translate(18 0)');
    TS(pr, 668, 112, [['7', A], '·', ['13', B], ' + ', ['7', A], '·', ['87', C]], { size: 32, w: 800 });
    TS(pr, 668, 156, [['= ', OK], ['7', A], ' · (', ['13', B], ' + ', ['87', C], ')'], { size: 32, w: 800 });
    TS(pr, 668, 200, [['= ', OK], '7 · 100 = 700'], { size: 32, w: 800 });
    await par(fade(c, rv, 500), c.wait(900));
    await c.tween(800, (e) => { pL.setAttribute('transform', `translate(${-18 * (1 - e)} 0)`); pRr.setAttribute('transform', `translate(${18 * (1 - e)} 0)`); }, ease.inOut);
    TS(pr, 668, 270, [['(b + c) · a = b · a + c · a', MUTE]], { size: 24, w: 600 });
    await say(c, 'Sağdan da çalışır: <b>(b + c) · a = b · a + c · a</b>. Bölmede ise yalnızca sağdan: (b + c) ÷ a = b ÷ a + c ÷ a.', { ms: 4200 });
    c.note('<b>DAĞILMA:</b> <span class="ca">a</span> · (<span class="cb">b</span> + <span class="cc">c</span>) = <span class="ca">a</span>·<span class="cb">b</span> + <span class="ca">a</span>·<span class="cc">c</span><br>Dışarıdaki, parantezdeki <b>herkesle</b> tek tek çarpılır.<br>Alan modeli: bütün dikdörtgen = iki parçanın toplamı.', 'Kural: dağılma', 'kural-dagilma');
  }

  /* ============ makas ============ */
  function scissors(p) {
    const gg = g(p), b1 = g(gg), b2 = g(gg);
    L(b1, 0, 0, 15, -36, '#e4eaff', 5.5); Ci(b1, -7, 15, 10, { stroke: '#e4eaff', sw: 4.5 }); L(b1, -3, 8, 0, 0, '#e4eaff', 5.5);
    L(b2, 0, 0, -15, -36, '#e4eaff', 5.5); Ci(b2, 7, 15, 10, { stroke: '#e4eaff', sw: 4.5 }); L(b2, 3, 8, 0, 0, '#e4eaff', 5.5);
    gg.open = (e) => { place(b1, 0, 0, 1, -24 * e); place(b2, 0, 0, 1, 24 * e); };
    return gg;
  }

  /* ============ a·(b − c) şerit-kesme modeli ============ */
  function subBuild(mg, a, b, cc, lab, o = {}) {
    mg.innerHTML = '';
    const big = b > 12;
    const u = big ? 24 : Math.min(32, 360 / b, 250 / a);
    const hh = a * u, wB = big ? 300 : (b - cc) * u, wS = big ? 48 : cc * u;
    const OX = OXm, OY = 190;
    const gBd = g(mg), gS = g(mg);
    if (!big) {
      cells(gBd, OX, OY, b - cc, a, u, u, { fill: B, fo: 0.36 });
      cells(gS, OX + wB, OY, cc, a, u, u, { fill: C, fo: 0.34 });
    } else {
      R(gBd, OX, OY, wB, hh, { rx: 6, fill: 'url(#gB)', fo: 0.34, stroke: B, sw: 3 });
      R(gS, OX + wB, OY, wS, hh, { rx: 4, fill: 'url(#gC)', fo: 0.38, stroke: C, sw: 3 });
      for (let i = 1; i < a; i++) { L(gBd, OX, OY + i * u, OX + wB, OY + i * u, 'rgba(255,255,255,.28)', 1.5); L(gS, OX + wB, OY + i * u, OX + wB + wS, OY + i * u, 'rgba(255,255,255,.28)', 1.5); }
      const mx = OX + wB / 2;
      [OY, OY + hh].forEach((yy) => { R(gBd, mx - 10, yy - 4, 20, 8, { rx: 0, fill: '#121a3d' }); L(gBd, mx - 12, yy + 8, mx - 4, yy - 8, INK, 2.5); L(gBd, mx + 2, yy + 8, mx + 10, yy - 8, INK, 2.5); });
    }
    const frame = R(gS, OX + wB, OY, wS, hh, { rx: 4, stroke: BAD, sw: 3.5, dash: '9 6' }); frame.style.opacity = 0;
    const left = g(mg); brV(left, OX - 14, OY, OY + hh, A, true, 4); T(left, OX - 34, OY + hh / 2 + 12, lab.a, { anchor: 'end', size: 36, fill: A, w: 800 });
    const tot = g(mg); brH(tot, OX, OX + wB + wS, OY - 14, INK, true, 3.5); T(tot, OX + (wB + wS) / 2, OY - 34, lab.b, { anchor: 'middle', size: 36, w: 800 });
    const bodyG = g(mg); brH(bodyG, OX, OX + wB, OY - 14, B, true, 3.5); T(bodyG, OX + wB / 2, OY - 34, lab.bc, { anchor: 'middle', size: 34, fill: B, w: 800 });
    const stripG = g(gS); brH(stripG, OX + wB, OX + wB + wS, OY - 14, C, true, 3.5); T(stripG, OX + wB + wS / 2, OY - 34, lab.c, { anchor: 'middle', size: 34, fill: C, w: 800 });
    const lbB = TS(mg, OX + wB / 2, OY + hh + 40, lab.bodyParts, { anchor: 'middle', size: 28, w: 800 });
    const lbS = TS(gS, OX + wB + wS / 2, OY + hh + 78, lab.stripParts, { anchor: 'middle', size: 28, w: 800 });
    const M = { big, u, hh, wB, wS, gBd, gS, frame, tot, bodyG, stripG, lbB, lbS, left, OX, OY, dx: 0 };
    M.setDx = (dx) => { M.dx = dx; gS.setAttribute('transform', `translate(${dx} 0)`); };
    return M;
  }

  /* ============ çubuk hücreleri ============ */
  function barCells(p, x0, y, n, U, col, hgt = 56) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      const cg2 = g(p); const r = R(cg2, 0, 0, U - 3, hgt, { rx: 7, fill: col, stroke: mix(col, 0.5), sw: 1.5 });
      place(cg2, x0 + i * U, y); arr.push({ g: cg2, r, x: x0 + i * U, y });
    }
    return arr;
  }
  const paintCell = (q, col, dash) => { q.r.setAttribute('fill', col); q.r.setAttribute('stroke', dash ? BAD : mix(col, 0.5)); q.r.setAttribute('stroke-dasharray', dash ? '6 4' : ''); q.r.setAttribute('stroke-width', dash ? 3 : 1.5); };
  const flyCell = (c, q, tx, ty, ms, lift = 26) => { const sx = q.x, sy = q.y; q.x = tx; q.y = ty; return c.tween(ms, (e) => place(q.g, lerp(sx, tx, e), lerp(sy, ty, e) - Math.sin(e * Math.PI) * lift), ease.inOut); };

  /* ============ SAHNE 8 – Dağılma çıkarmayla ============ */
  async function s8(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const mg = g(svg);
    /* A: 8 · (10 − 3) */
    let M = subBuild(mg, 8, 10, 3, { a: '8', b: '10', bc: '7', c: '3', bodyParts: [[ '8', A], '·', ['7', B], ' = 56'], stripParts: [['8', A], '·', ['3', C], ' = 24'] });
    hide(M.bodyG, M.lbB, M.lbS, M.frame); hide(mg);
    const sc = scissors(svg); hide(sc);
    await par(say(c, 'Kasiyerin yaptığı tam olarak bu: büyük dikdörtgeni al, <b>fazla şeridi kes</b>. Örnek: <b>8 · (10 − 3)</b>.'), (async () => {
      await fade(c, mg, 700);
      TS(pr, 668, 112, [['8', A], ' · (', ['10', B], ' ' + MIN + ' ', ['3', C], ')'], { size: 34, w: 800 });
      await c.wait(900);
      TS(pr, 668, 168, [['= ', OK], ['8', A], '·', ['10', B], ' ' + MIN + ' ', ['8', A], '·', ['3', C]], { size: 32, w: 800 });
      await c.wait(600);
    })());
    await par(say(c, '8 · 10 = 80 bütün alan. Fazla şerit <b>8 · 3 = 24</b>. Kesip atınca <b>80 − 24 = 56</b> kalır.'), (async () => {
      const sx = M.OX + M.wB + M.wS / 2;
      sc.setAttribute('transform', `translate(${sx} ${M.OY - 54})`); await fade(c, sc, 250);
      await c.tween(400, (e) => sc.open(Math.sin(e * Math.PI * 2)), ease.linear); fire(fade(c, sc, 250, 0));
      M.frame.style.opacity = 1;
      await par(c.tween(800, (e) => { M.setDx(70 * e); setOp(M.tot, 1 - e); }, ease.inOut), fade(c, M.bodyG, 600));
      await par(fade(c, M.lbB, 500), fade(c, M.lbS, 500));
      TS(pr, 668, 224, [['= ', OK], '80 ' + MIN + ' 24 = ', ['56', OK]], { size: 32, w: 800 });
      await c.wait(700);
    })());

    /* B: eksinin dağılması */
    await par(fade(c, mg, 400, 0));
    pr.innerHTML = '';
    const gb = g(svg); hide(gb);
    const U = 30, X0 = 70, Y1 = 190, Y2 = 330;
    const ex = TS(gb, X0, 120, ['10 ' + MIN + ' (', ['3', B], ' + ', ['2', C], ')'], { size: 50, w: 800 });
    const capR = R(gb, 0, 70, 10, 62, { rx: 24, fill: '#fff', fo: 0.1, stroke: '#fff', sw: 3.5 }); capR.setAttribute('filter', 'url(#glow)');
    const ext = (i0, i1) => { const a0 = ex.getStartPositionOfChar(i0), b0 = ex.getEndPositionOfChar(i1); return [a0.x - 10, b0.x + 10]; };
    const setCapB = () => { const e0 = ext(5, 11); capR.setAttribute('x', e0[0]); capR.setAttribute('width', e0[1] - e0[0]); };
    setCapB();
    T(gb, X0, Y1 - 22, 'başlangıç: 10', { size: 22, fill: MUTE, w: 600 });
    T(gb, X0, Y2 - 22, 'çıkarılan', { size: 22, fill: MUTE, w: 600 });
    R(gb, X0 - 8, Y2 - 8, 10 * U + 16, 72, { rx: 14, stroke: '#4a5a99', sw: 2, dash: '8 6', fill: '#fff', fo: 0.03 });
    const cellsB = barCells(gb, X0, Y1, 10, U, A);
    const lblK = T(gb, X0 + 10 * U + 22, Y1 + 38, '', { size: 30, w: 800 });
    const lblT = T(gb, X0 + 10 * U + 22, Y2 + 42, '', { size: 28, w: 800, fill: MUTE });
    const wrongG = g(gb); hide(wrongG);
    await fade(c, gb, 600);
    await par(say(c, 'Şimdi bir işaret tuzağı: <b>10 − (3 + 2)</b>. Parantezin içindekilerin hepsi birlikte çıkarılır.'), (async () => {
      await c.wait(600);
      [7, 8, 9].forEach((i) => paintCell(cellsB[i], B)); [5, 6].forEach((i) => paintCell(cellsB[i], C));
      await c.wait(400);
      await par(...[9, 8, 7, 6, 5].map((i, k) => c.wait(k * 80).then(() => flyCell(c, cellsB[i], X0 + (9 - i) * U, Y2 + 8, 800))));
      for (let i = 0; i < 5; i++) paintCell(cellsB[i], OK);
      setParts(lblK, [['kalan 5', OK]]); setParts(lblT, [['5 birim', MUTE]]);
      TS(pr, 668, 112, ['10 ' + MIN + ' (', ['3', B], ' + ', ['2', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 152, [['= ', OK], '10 ' + MIN + ' 5 = ', ['5', OK]], { size: 32, w: 800 });
      await c.wait(700);
    })());

    /* eksi işareti iki yöne dağılır */
    await par(say(c, 'Eksi işareti parantezdeki <b>herkese</b> etki eder: <b>10 − 3 − 2 = 5</b>.'), (async () => {
      const mpos = ex.getStartPositionOfChar(3), p3 = ex.getStartPositionOfChar(6), p2 = ex.getStartPositionOfChar(10);
      const y0 = 120 + 14;
      const a1 = P(gb, `M${mpos.x + 12},${y0} Q${(mpos.x + p3.x) / 2 + 6},${y0 + 48} ${p3.x + 12},${y0 + 4}`, { stroke: A, sw: 4 });
      const a2 = P(gb, `M${mpos.x + 12},${y0} Q${(mpos.x + p2.x) / 2},${y0 + 70} ${p2.x + 12},${y0 + 4}`, { stroke: A, sw: 4 });
      await par(drawIn(c, a1, 600), drawIn(c, a2, 800));
      await c.wait(400);
      await fade(c, ex, 250, 0);
      setParts(ex, ['10 ' + MIN + ' ', ['3', B], ' ' + MIN + ' ', ['2', C]]); capR.style.opacity = 0; a1.remove(); a2.remove();
      await fade(c, ex, 300, 1);
      TS(pr, 668, 192, [['= ', OK], '10 ' + MIN + ' ', ['3', B], ' ' + MIN + ' ', ['2', C], ' = 5'], { size: 32, w: 800 });
      await c.wait(600);
    })());

    /* yanlış yol: 10 − 3 + 2 = 9 */
    await par(say(c, 'Eksiyi yalnızca 3’e uygularsan <b>10 − 3 + 2 = 9</b> bulursun. Bu yanlış: 2 birim fazladan yapıştı.'), (async () => {
      const wc = barCells(wrongG, X0, 440, 9, U, A, 44);
      for (let i = 7; i < 9; i++) paintCell(wc[i], BAD, true);
      T(wrongG, X0 + 9 * U + 20, 440 + 34, '9 ✗', { size: 34, fill: BAD, w: 800 });
      T(wrongG, X0, 430, '10 − 3 + 2', { size: 24, fill: BAD, w: 700 });
      await fade(c, wrongG, 500);
      const w = TS(pr, 668, 262, [['10 ' + MIN + ' 3 + 2 = 9', BAD]], { size: 32, w: 800 });
      L(pr, 664, 251, 664 + 270, 251, 'rgba(255,255,255,.75)', 2);
      await c.wait(900);
    })());

    /* 10 − (5 − 2) */
    await par(say(c, 'Bir de <b>10 − (5 − 2)</b>: içi 5 − 2 = 3 olduğundan çubuktan 3 birim gider, kalan <b>7</b>. Eksi içeri girince işaretler döner.'), (async () => {
      await fade(c, wrongG, 300, 0);
      await par(...cellsB.map((q, i) => flyCell(c, q, X0 + i * U, Y1, 600, 0)));
      cellsB.forEach((q) => paintCell(q, A)); setParts(lblK, ['']); setParts(lblT, ['']);
      await fade(c, ex, 250, 0); setParts(ex, ['10 ' + MIN + ' (', ['5', B], ' ' + MIN + ' ', ['2', C], ')']); capR.style.opacity = 1; setCapB(); await fade(c, ex, 300, 1);
      await c.wait(500);
      for (let i = 5; i < 10; i++) paintCell(cellsB[i], B);
      await par(...[9, 8, 7, 6, 5].map((i, k) => c.wait(k * 80).then(() => flyCell(c, cellsB[i], X0 + (9 - i) * U, Y2 + 8, 800))));
      setParts(lblT, [['5 çıktı', MUTE]]);
      await c.wait(500);
      /* 2 birim geri verilir */
      const back = [cellsB[6], cellsB[5]];
      back.forEach((q) => paintCell(q, OK));
      await par(...back.map((q, k) => c.wait(k * 120).then(() => flyCell(c, q, X0 + (5 + k) * U, Y1, 900, 40))));
      for (let i = 0; i < 5; i++) paintCell(cellsB[i], A);
      setParts(lblT, [['3 birim', MUTE]]); setParts(lblK, [['kalan 7', OK]]);
      TS(pr, 668, 332, ['10 ' + MIN + ' (', ['5', B], ' ' + MIN + ' ', ['2', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 372, [['= ', OK], '10 ' + MIN + ' 3 = ', ['7', OK]], { size: 32, w: 800 });
      TS(pr, 668, 412, [['= ', OK], '10 ' + MIN + ' 5 + 2'], { size: 32, w: 800 });
      await c.wait(900);
    })());
    T(gb, X0, 522, 'Eksi içeri girince işaretler döner.', { size: 26, fill: A, w: 700 });
    await c.wait(600);

    /* slider: a·(b − c) */
    await fade(c, gb, 400, 0);
    pr.innerHTML = '';
    const st = { a: 8, b: 10, c: 3 };
    const labFor = () => ({ a: 'a', b: 'b', bc: 'b−c', c: 'c', bodyParts: [['a', A], '·(', ['b', B], MIN, ['c', C], ')'], stripParts: [['a', A], '·', ['c', C]] });
    const note2 = T(svg, OXm, 546, 'Ölçekli değil: şerit ve ölçek büyütülmüştür.', { size: 22, fill: MUTE, w: 500 });
    const live = [
      TS(pr, 668, 108, [['a', A], ' · (', ['b', B], ' ' + MIN + ' ', ['c', C], ')'], { size: 34, w: 800 }),
      T(pr, 668, 148, '', { size: 30, w: 800 }),
      TS(pr, 668, 208, [['=', OK]], { size: 44, w: 800 }),
      TS(pr, 668, 262, [['a', A], '·', ['b', B], ' ' + MIN + ' ', ['a', A], '·', ['c', C]], { size: 34, w: 800 }),
      T(pr, 668, 302, '', { size: 28, w: 800 }),
    ];
    function updAll() {
      const { a, b, c: cc } = st;
      const lab = labFor();
      M = subBuild(mg, a, b, cc, lab);
      M.setDx(M.big ? 70 : 56); M.tot.style.opacity = 0; M.frame.style.opacity = 1;
      M.lbB.remove(); M.lbS.remove();
      mg.style.opacity = 1; note2.style.opacity = M.big ? 1 : 0;
      setParts(live[1], [['= ', OK], [String(a), A], ' · (', [String(b), B], ' ' + MIN + ' ', [String(cc), C], ') = ' + a * (b - cc)]);
      setParts(live[4], [['= ', OK], [String(a), A], '·', [String(b), B], ' ' + MIN + ' ', [String(a), A], '·', [String(cc), C], ' = ' + a * b + ' ' + MIN + ' ' + a * cc + ' = ' + (a * b - a * cc)]);
      fitText(live[1], 300); fitText(live[4], 300);
      /* hücre / şerit değer yazıları */
      const hv = M.hh;
      T(M.gBd, M.OX + M.wB / 2, M.OY + hv / 2 + 10, String(a * (b - cc)), { anchor: 'middle', size: 36, w: 800 });
      T(M.gS, M.OX + M.wB + M.wS / 2, M.OY + hv + 40, String(a * cc), { anchor: 'middle', size: 30, fill: BAD, w: 800 });
    }
    hide(...live);
    let sl;
    const pre = h('button', { class: 'tool', onclick: () => { sl.inputs.b.max = 100; sl.inputs.c.max = 99; sl.set('a', 7, true); sl.set('b', 100, true); sl.set('c', 2, true); st.a = 7; st.b = 100; st.c = 2; updAll(); } }, '🧾 Kasiyer: 7 · (100 − 2)');
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 9, step: 1, v: 8, col: A }, { k: 'b', min: 2, max: 12, step: 1, v: 10, col: B }, { k: 'c', min: 1, max: 9, step: 1, v: 3, col: C }], (k, v) => {
      if (k === 'b') { sl.inputs.c.max = v.b - 1; if (v.c > v.b - 1) sl.set('c', v.b - 1, true); }
      st.a = v.a; st.b = v.b; st.c = Math.min(v.c, v.b - 1); updAll();
    }, h('div', { class: 'row', style: { marginTop: '8px' } }, pre, h('span', { class: 'muted' }, 'b = 100 olursa model ölçeksiz çizilir')));
    updAll();
    await par(say(c, 'Sen de dene: <b>a · (b − c) = a · b − a · c</b>. Kasiyer düğmesi 7 · (100 − 2)’yi yükler.', { ms: 4200 }), fade(c, live, 600));
    await c.cont('Devam ›');
    sl.el.remove();

    /* tahmin: 100 − (60 + 25) */
    await par(fade(c, mg, 300, 0), fade(c, live, 300, 0), fade(c, note2, 300, 0)); pr.innerHTML = '';
    const mb = g(svg);
    function miniBar(kind) {
      mb.innerHTML = ''; mb.style.opacity = 1;
      const x0 = 70, k = 3.6, y = 220;
      T(mb, x0, 130, '100 − (60 + 25)', { size: 40, w: 800 });
      if (kind === 'wrong') {
        R(mb, x0, y, 40 * k, 60, { rx: 8, fill: 'url(#gA)', stroke: mix(A, 0.5), sw: 2 }); T(mb, x0 + 20 * k, y + 40, '40', { anchor: 'middle', size: 32, fill: '#0b1230', w: 800 });
        R(mb, x0 + 40 * k, y, 25 * k, 60, { rx: 8, fill: BAD, fo: 0.15, stroke: BAD, sw: 3, dash: '8 5' }); T(mb, x0 + 52.5 * k, y + 40, '+25', { anchor: 'middle', size: 30, fill: BAD, w: 800 });
        T(mb, x0, y + 110, '100 − 60 + 25 = 65', { size: 34, fill: BAD, w: 800 });
        T(mb, x0, y + 156, '25 birim fazladan geri yapıştı.', { size: 26, fill: A, w: 700 });
      } else {
        R(mb, x0, y, 15 * k, 60, { rx: 8, fill: 'url(#gG)', stroke: mix(OK, 0.5), sw: 2 }); T(mb, x0 + 7.5 * k, y + 40, '15', { anchor: 'middle', size: 32, fill: '#0b1230', w: 800 });
        R(mb, x0 + 15 * k, y, 25 * k, 60, { rx: 8, fill: 'url(#gC)', stroke: mix(C, 0.5), sw: 2 }); T(mb, x0 + 27.5 * k, y + 40, '25', { anchor: 'middle', size: 32, fill: '#0b1230', w: 800 });
        R(mb, x0 + 40 * k, y, 60 * k, 60, { rx: 8, fill: 'url(#gB)', stroke: mix(B, 0.5), sw: 2 }); T(mb, x0 + 70 * k, y + 40, '60', { anchor: 'middle', size: 32, fill: '#0b1230', w: 800 });
        T(mb, x0, y + 110, '100 − 60 − 25 = 15', { size: 34, fill: OK, w: 800 });
        T(mb, x0, y + 156, 'Eksi, parantezdeki herkese dağıldı.', { size: 26, fill: A, w: 700 });
      }
    }
    await c.choice({
      tag: 'Tahmin et', q: '100 − (60 + 25) = ?', options: ['65', '15', '35'], answer: 1,
      hints: ['100 − 60 + 25 yaptın; eksi işaretini 25’e uygulamadın. Çubukta 25 birim fazla göründü.', '', '100 − 60 = 40 bulup yalnızca 5 çıkarmış olabilirsin; ama parantezin içi 60 + 25 = 85. Hepsi çıkarılır: 100 − 85 = 15.'],
      right: '100 − 60 − 25 = 15. Eksi herkese dağıldı.',
      onPick: (i, ok) => {
        miniBar(ok ? 'ok' : (i === 0 ? 'wrong' : 'ok'));
        if (ok) {
          TS(pr, 668, 112, [['100', A], ' ' + MIN + ' (', ['60', B], ' + ', ['25', C], ')'], { size: 34, w: 800 });
          TS(pr, 668, 152, [['= ', OK], '100 ' + MIN + ' ', ['60', B], ' ' + MIN + ' ', ['25', C]], { size: 32, w: 800 });
          TS(pr, 668, 192, [['= ', OK], ['15', OK]], { size: 32, w: 800 });
        }
      },
    });
    c.note('<span class="ca">a</span> · (<span class="cb">b</span> − <span class="cc">c</span>) = <span class="ca">a</span>·<span class="cb">b</span> − <span class="ca">a</span>·<span class="cc">c</span> &nbsp;<b>(fazlayı kes!)</b><br>a − (b + c) = a − b − c<br>a − (b − c) = a − b + c<br>Eksi, parantezdeki herkese işaret değiştirerek etki eder.', 'Kural: çıkarmayla dağılma', 'kural-dagilma-cikarma');
  }

  /* ============ (a + b)(c + d) dört parça modeli ============ */
  function quadBuild(mg, v, u, ox, oy, o = {}) {
    mg.innerHTML = '';
    const defs = mg.ownerSVGElement.querySelector('defs');
    const pid = 'qg' + (quadBuild.n = (quadBuild.n || 0) + 1);
    const pat = SV('pattern', { id: pid, x: ox, y: oy, width: u, height: u, patternUnits: 'userSpaceOnUse' }, defs);
    SV('path', { d: `M${u},0 V${u} H0`, fill: 'none', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1.3 }, pat);
    const wa = v.a * u, wb = v.b * u, hc = v.c * u, hd = v.d * u;
    const labs = o.labs || { a: 'a', b: 'b', c: 'c', d: 'd' };
    const Q = { v, u, ox, oy, wa, wb, hc, hd, reg: {}, labs };
    const vc = o.sq ? [A, B] : [C, D], vg = o.sq ? ['A', 'B'] : ['C', 'D'];
    const def = {
      ac: [0, 0, wa, hc, A, vc[0], 'rA' + vg[0]], bc: [wa, 0, wb, hc, B, vc[0], 'rB' + vg[0]],
      ad: [0, hc, wa, hd, A, vc[1], 'rA' + vg[1]], bd: [wa, hc, wb, hd, B, vc[1], 'rB' + vg[1]],
    };
    Q.outline = R(mg, ox, oy, wa + wb, hc + hd, { rx: 4, fill: '#fff', fo: 0.05, stroke: INK, sw: 3 });
    Q.lines = g(mg);
    Q.vline = L(Q.lines, ox + wa, oy - 6, ox + wa, oy + hc + hd + 6, INK, 3.5, '8 6');
    Q.hline = L(Q.lines, ox - 6, oy + hc, ox + wa + wb + 6, oy + hc, INK, 3.5, '8 6');
    Q.lines.style.opacity = 0;
    Object.entries(def).forEach(([key, [x, y, w, hh, hcol, vcol, grad]]) => {
      const rg = g(mg, { 'data-r': key }); rg.style.cursor = 'pointer';
      const X = ox + x, Y = oy + y;
      R(rg, X, Y, w, hh, { rx: 3, fill: `url(#${grad})` });
      R(rg, X, Y, w, hh, { rx: 3, fill: `url(#${pid})` });
      const rim = R(rg, X, Y, w, hh, { rx: 3, stroke: '#fff', sw: 3 }); rim.style.opacity = 0;
      L(rg, X, Y, X + w, Y, hcol, 5); L(rg, X, Y, X, Y + hh, vcol, 5);
      const lab = g(rg);
      const P_ = o.sq
        ? { ac: [['a²', A]], bc: [['a', A], ['b', B]], ad: [['a', A], ['b', B]], bd: [['b²', B]] }[key]
        : { ac: [[labs.a, A], '·', [labs.c, C]], bc: [[labs.b, B], '·', [labs.c, C]], ad: [[labs.a, A], '·', [labs.d, D]], bd: [[labs.b, B], '·', [labs.d, D]] }[key];
      const val = { ac: v.a * v.c, bc: v.b * v.c, ad: v.a * v.d, bd: v.b * v.d }[key];
      const cx = X + w / 2, cy = Y + hh / 2;
      if (w >= 70 && hh >= 70) { TS(lab, cx, cy - 6, P_, { anchor: 'middle', size: 26, w: 800 }); T(lab, cx, cy + 34, String(val), { anchor: 'middle', size: 36, w: 800 }); }
      else if (hh >= 40 && w >= 130) TS(lab, cx, cy + 10, [...P_, ' = ' + val], { anchor: 'middle', size: 28, w: 800 });
      else if (w >= 40 && hh >= 34) {
        T(lab, cx, cy + 11, String(val), { anchor: 'middle', size: 30, w: 800 });
        if (o.num && key === 'bd') TS(lab, X + w + 16, cy + 10, [...P_, ' = ' + val], { size: 26, w: 800 });
      }
      Q.reg[key] = { g: rg, lab, rim, x: X, y: Y, w, h: hh, cx, cy };
    });
    /* ölçü bantları */
    const tb = g(mg), lb = g(mg);
    R(tb, ox, oy - 26, wa, 8, { rx: 3, fill: A }); R(tb, ox + wa, oy - 26, wb, 8, { rx: 3, fill: B });
    T(tb, ox + wa / 2, oy - 38, labs.a, { anchor: 'middle', size: 34, fill: A, w: 800 }); T(tb, ox + wa + wb / 2, oy - 38, labs.b, { anchor: 'middle', size: 34, fill: B, w: 800 });
    R(lb, ox - 26, oy, 8, hc, { rx: 3, fill: vc[0] }); R(lb, ox - 26, oy + hc, 8, hd, { rx: 3, fill: vc[1] });
    T(lb, ox - 38, oy + hc / 2 + 12, labs.c, { anchor: 'end', size: 34, fill: vc[0], w: 800 }); T(lb, ox - 38, oy + hc + hd / 2 + 12, labs.d, { anchor: 'end', size: 34, fill: vc[1], w: 800 });
    Q.bands = [tb, lb];
    Q.setGap = (gx, gy) => {
      Q.reg.bc.g.setAttribute('transform', `translate(${gx} 0)`); Q.reg.ad.g.setAttribute('transform', `translate(0 ${gy})`); Q.reg.bd.g.setAttribute('transform', `translate(${gx} ${gy})`);
    };
    if (o.merged) { Object.values(Q.reg).forEach((r) => { r.g.style.opacity = 0; }); } else Q.outline.style.opacity = 0;
    return Q;
  }

  /* ============ SAHNE 9 ============ */
  async function s9(c) {
    const svg = base(c);
    [['rAC', A, C], ['rBC', B, C], ['rAD', A, D], ['rBD', B, D], ['rAA', A, A], ['rBA', B, A], ['rAB', A, B], ['rBB', B, B]].forEach(([id, c1, c2]) => lg(svg, id, [[0, c1, 0.5], [1, c2, 0.5]], 0, 0, 1, 1));
    const px = sidePanel(svg); const pr = px.rows;
    const mg = g(svg);
    const U = 26, OXn = 150, OYn = 150;
    let Q = quadBuild(mg, { a: 10, b: 3, c: 10, d: 2 }, U, OXn, OYn, { num: true, merged: true, labs: { a: '10', b: '3', c: '10', d: '2' } });
    hide(mg);
    const rows = [
      TS(pr, 668, 112, ['(', ['10', A], ' + ', ['3', B], ')(', ['10', C], ' + ', ['2', D], ')'], { size: 34, w: 800 }),
      TS(pr, 668, 156, [['= ', OK], ['10', A], '·', ['10', C], ' + ', ['10', A], '·', ['2', D]], { size: 30, w: 800 }),
      TS(pr, 668, 194, ['   + ', ['3', B], '·', ['10', C], ' + ', ['3', B], '·', ['2', D]], { size: 30, w: 800 }),
      TS(pr, 668, 240, [['= ', OK], '100 + 20 + 30 + 6'], { size: 30, w: 800 }),
      TS(pr, 668, 298, [['= ', OK], ['156', OK]], { size: 46, w: 800 }),
    ];
    hide(...rows);
    const preview = async () => {
      Q.lines.style.opacity = 1; Q.vline.setAttribute('y2', Q.oy - 6); Q.hline.setAttribute('x2', Q.ox - 6);
      await c.tween(500, (e) => Q.vline.setAttribute('y2', lerp(Q.oy - 6, Q.oy + Q.hc + Q.hd + 6, e)), ease.inOut);
      await c.tween(500, (e) => Q.hline.setAttribute('x2', lerp(Q.ox - 6, Q.ox + Q.wa + Q.wb + 6, e)), ease.inOut);
      const nums = ['ac', 'bc', 'ad', 'bd'].map((k, i) => T(mg, Q.reg[k].x + Q.reg[k].w / 2, Q.reg[k].y + Q.reg[k].h / 2 + 18, String(i + 1), { anchor: 'middle', size: 48, fill: OK, w: 800 }));
      nums.forEach((t) => { t.style.opacity = 0; });
      for (const t of nums) { await fade(c, t, 220); }
      await c.wait(900);
      await par(fade(c, nums, 300, 0), fade(c, Q.lines, 300, 0)); nums.forEach((t) => t.remove());
    };
    await par(say(c, 'Peki parantezin dışındaki de bir toplamsa? <b>13 · 12</b>’yi <b>(10 + 3)(10 + 2)</b> olarak ayır.'), (async () => {
      await par(fade(c, mg, 600), fade(c, rows[0], 600)); await c.wait(600);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu dikdörtgen kaç parçaya bölünecek?', options: ['2', '3', '4'], answer: 2,
      hints: ['Önce dikey, sonra yatay çizgi iner. Bak, kaç parça oldu?', 'Önce dikey, sonra yatay çizgi iner. Bak, kaç parça oldu?'],
      right: '2 × 2 = 4: her terim, diğer parantezdeki her terimle bir kez çarpılıyor.',
      onPick: (i, ok) => { if (!ok) fire(preview()); },
    });
    await par(say(c, 'Dikdörtgen <b>dört parçaya</b> bölünüyor: 100, 20, 30 ve 6. Hepsini topla: <b>156</b>.'), (async () => {
      Q.lines.style.opacity = 1; Q.vline.setAttribute('y2', Q.oy - 6); Q.hline.setAttribute('x2', Q.ox - 6);
      await c.tween(600, (e) => Q.vline.setAttribute('y2', lerp(Q.oy - 6, Q.oy + Q.hc + Q.hd + 6, e)), ease.inOut);
      await c.tween(600, (e) => Q.hline.setAttribute('x2', lerp(Q.ox - 6, Q.ox + Q.wa + Q.wb + 6, e)), ease.inOut);
      Object.values(Q.reg).forEach((r) => { r.lab.style.opacity = 0; });
      await par(fade(c, Object.values(Q.reg).map((r) => r.g), 600), fade(c, Q.outline, 400, 0), fade(c, Q.lines, 500, 0));
      await c.tween(800, (e) => Q.setGap(12 * e, 12 * e), ease.back);
      for (const k of ['ac', 'ad', 'bc', 'bd']) { await fade(c, Q.reg[k].lab, 450); await c.wait(150); }
      for (const r of rows.slice(0, 4)) { await fade(c, r, 500); await c.wait(250); }
      await fade(c, rows[4], 500);
      await c.wait(500);
    })());
    const chk = h('button', { class: 'tool', onclick: () => {
      chk.disabled = true; TS(pr, 668, 358, [['13 × 12 = 156 ', INK], ['✓', OK]], { size: 30, w: 800 });
    } }, 'Doğrula: 13 × 12 = ?');
    const chkPanel = c.panel(null, h('div', { class: 'row' }, chk, h('span', { class: 'muted' }, 'Hesap makinesiyle kontrol et')));
    await c.wait(2500);
    chkPanel.remove();

    /* harfli model */
    await par(fade(c, mg, 400, 0), fade(c, pr, 400, 0));
    pr.innerHTML = ''; pr.style.opacity = 1;
    const st = { a: 3, b: 4, c: 2, d: 3, sel: -1, bonus: false };
    const uFor = () => Math.min(52, 470 / (st.a + st.b + 0.5), 310 / (st.c + st.d + 0.5));
    const termIdx = { ac: 0, ad: 1, bc: 2, bd: 3 };
    const head = TS(pr, 668, 108, ['(', ['a', A], ' + ', ['b', B], ')(', ['c', C], ' + ', ['d', D], ')'], { size: 34, w: 800 });
    const expand = T(pr, 668, 150, '', { size: 32, w: 800 });
    const termsTs = [];
    const mkTerm = (l1, c1, l2, c2) => [[l1, c1], [l2, c2]];
    const termParts = [mkTerm('a', A, 'c', C), mkTerm('a', A, 'd', D), mkTerm('b', B, 'c', C), mkTerm('b', B, 'd', D)];
    (function () {
      const parts = [['= ', OK]];
      termParts.forEach((tp, i) => { if (i) parts.push(' + '); tp.forEach((q) => parts.push(q)); });
      setParts(expand, parts);
      /* tspan'ları terimlere ayır: ['= ', t0a, t0b, ' + ', t1a, t1b ...] */
      const kids = [...expand.childNodes]; let p = 1;
      for (let i = 0; i < 4; i++) { termsTs[i] = [kids[p], kids[p + 1]]; p += i < 3 ? 3 : 2; }
    })();
    const cnt4 = TS(pr, 668, 196, [['2 × 2 = 4 parça', OK]], { size: 28, w: 800 });
    const L1a = T(pr, 668, 266, '', { size: 30, w: 800 }), L1b = T(pr, 668, 304, '', { size: 30, w: 800 });
    const eqS = T(pr, 668, 358, '=', { size: 40, fill: OK, w: 800 });
    const L2a = T(pr, 668, 410, '', { size: 30, w: 800 }), L2b = T(pr, 668, 448, '', { size: 30, w: 800 });
    const bonusL = g(pr); hide(bonusL);
    hide(head, expand, cnt4, L1a, L1b, eqS, L2a, L2b);
    const setSel = (k) => {
      st.sel = k == null ? -1 : termIdx[k];
      termsTs.forEach((pair, i) => pair.forEach((t) => { t.style.fillOpacity = st.sel < 0 || st.sel === i ? 1 : 0.3; }));
      Object.entries(Q.reg).forEach(([key, r]) => { r.rim.style.opacity = st.sel >= 0 && termIdx[key] === st.sel ? 1 : 0; });
    };
    const updLive = () => {
      const { a, b, c: cc, d } = st;
      setParts(L1a, [['(', INK], [String(a), A], ' + ', [String(b), B], ')(', [String(cc), C], ' + ', [String(d), D], ')']);
      setParts(L1b, [['= ', OK], (a + b) + ' · ' + (cc + d) + ' = ' + (a + b) * (cc + d)]);
      setParts(L2a, [[String(a), A], '·', [String(cc), C], ' + ', [String(a), A], '·', [String(d), D], ' + ', [String(b), B], '·', [String(cc), C], ' + ', [String(b), B], '·', [String(d), D]]);
      setParts(L2b, [['= ', OK], a * cc + ' + ' + a * d + ' + ' + b * cc + ' + ' + b * d + ' = ' + (a * cc + a * d + b * cc + b * d)]);
      [L1a, L1b, L2a, L2b].forEach((t) => fitText(t, 300));
    };
    function rebuild(extra) {
      const u = uFor();
      Q = quadBuild(mg, { a: st.a, b: st.b, c: st.c, d: st.d }, u, 150, 150, Object.assign({}, extra || {}));
      Q.setGap(12, 12); mg.style.opacity = 1;
      updLive(); setSel(st.sel >= 0 ? Object.keys(termIdx)[st.sel] : null);
    }
    rebuild();
    hide(mg);
    c.on(mg, 'click', (e) => {
      const rg = e.target.closest && e.target.closest('[data-r]'); if (!rg) return;
      const k = rg.getAttribute('data-r'); setSel(termIdx[k] === st.sel ? null : k);
    });
    await par(say(c, 'Harfli model: <b>(a + b)(c + d)</b>. Her bölge bir çarpım: <b>a·c, b·c, a·d, b·d</b>.'), (async () => {
      await par(fade(c, mg, 500), fade(c, head, 500));
      await fade(c, expand, 600);
      for (const k of ['ac', 'bc', 'ad', 'bd']) {
        setSel(k); await c.wait(750);
      }
      setSel(null);
      await fade(c, cnt4, 500);
    })());

    /* kaydırıcılar */
    let sl;
    const bonusBtn = h('button', { class: 'tool', onclick: () => doBonus() }, 'Bonus: (a + b)² (isteğe bağlı)');
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 8, step: 1, v: 3, col: A }, { k: 'b', min: 1, max: 8, step: 1, v: 4, col: B }, { k: 'c', min: 1, max: 8, step: 1, v: 2, col: C }, { k: 'd', min: 1, max: 8, step: 1, v: 3, col: D }], (k, v) => {
      if (st.bonus) {
        if (k === 'c' || k === 'd') { sl.set('c', v.a, true); sl.set('d', v.b, true); } else { sl.set('c', v.a, true); sl.set('d', v.b, true); }
        v = sl.vals;
      }
      st.a = v.a; st.b = v.b; st.c = v.c; st.d = v.d;
      if (st.bonus) rebuild({ sq: true, labs: { a: 'a', b: 'b', c: 'a', d: 'b' } }); else rebuild();
    }, h('div', { class: 'row', style: { marginTop: '8px' } }, bonusBtn, h('span', { class: 'muted' }, 'Bir bölgeye dokun: karşılık gelen terim yanar')));
    fire(fade(c, [L1a, L1b, eqS, L2a, L2b], 600));
    async function doBonus() {
      if (st.bonus) return; st.bonus = true; bonusBtn.disabled = true;
      sl.set('a', 3, true); sl.set('b', 4, true); sl.set('c', 3, true); sl.set('d', 4, true);
      st.a = 3; st.b = 4; st.c = 3; st.d = 4; st.sel = -1;
      sl.inputs.c.disabled = sl.inputs.d.disabled = true;
      await fade(c, mg, 300, 0);
      rebuild({ sq: true, labs: { a: 'a', b: 'b', c: 'a', d: 'b' } }); hide(mg);
      setParts(head, ['(', ['a', A], ' + ', ['b', B], ')²']);
      hide(L1a, L1b, eqS, L2a, L2b, cnt4); expand.style.opacity = 0;
      const bt = [
        TS(pr, 668, 160, [['= ', OK], ['a²', A], ' + 2', ['a', A], ['b', B], ' + ', ['b²', B]], { size: 32, w: 800 }),
        TS(pr, 668, 230, [['a²', A], ' + ', ['b²', B], ' = 9 + 16 = 25'], { size: 28, w: 800 }),
        TS(pr, 668, 276, [['2', INK], ['a', A], ['b', B], ' = 12 + 12 = ', ['24', BAD]], { size: 28, w: 800 }),
        TS(pr, 668, 332, [['(3 + 4)² = 49', OK]], { size: 32, w: 800 }),
        TS(pr, 668, 396, [['(a + b)² ≠ a² + b²', BAD]], { size: 30, w: 800 }),
      ];
      hide(...bt);
      await fade(c, mg, 500);
      await say(c, '<b>Bonus:</b> (a + b)² de bir alan. a = 3, b = 4 için kare 7 × 7 = 49.', { ms: 3200 });
      fire(fade(c, bt[0], 400));
      /* a² ve b² vurgulanır */
      const dim = (keys, v) => keys.forEach((k) => { Q.reg[k].g.style.opacity = v; });
      dim(['bc', 'ad'], 0.25); await fade(c, bt[1], 500); await c.wait(900);
      dim(['bc', 'ad'], 1); dim(['ac', 'bd'], 0.25);
      const fr = g(mg); [Q.reg.bc, Q.reg.ad].forEach((r) => R(fr, r.x + (r === Q.reg.bc ? 12 : 0), r.y + (r === Q.reg.ad ? 12 : 0), r.w, r.h, { rx: 4, stroke: BAD, sw: 4, dash: '9 6' }));
      /* tx/ty gap: bc sağa 12, ad aşağı 12 */
      T(mg, Q.ox + (Q.wa + Q.wb) / 2 + 6, Q.oy + Q.hc + Q.hd + 62, 'eksik kalan: iki ab dikdörtgeni', { anchor: 'middle', size: 26, fill: BAD, w: 800 });
      await fade(c, bt[2], 500); await c.wait(900);
      dim(['ac', 'bd'], 1);
      await fade(c, bt[3], 500); await fade(c, bt[4], 500);
      const q = await ask(c, {
        tag: 'Bonus', q: '(3 + 4)² = 3² + 4² mi?',
        options: [{ html: 'Evet', ok: false, fb: '3² + 4² = 9 + 16 = 25, ama 7² = 49. Eksik kalan iki ab dikdörtgenine bak.' }, { html: 'Hayır', ok: true, fb: '49 ≠ 25. Eksik kalan iki ab dikdörtgenine bak: 2ab = 24.' }],
      });
    }
    await par(say(c, 'Her terim, diğer parantezdeki her terimle <b>bir kez</b> çarpıldı: 2 × 2 = 4 parça. Kaydırıcılarla dene; bir bölgeye dokunabilirsin.', { ms: 5000 }));
    await c.cont('Devam ›');

    c.note('(<span class="ca">a</span> + <span class="cb">b</span>)(<span class="cc">c</span> + <span class="cd">d</span>) = <span class="ca">a</span><span class="cc">c</span> + <span class="ca">a</span><span class="cd">d</span> + <span class="cb">b</span><span class="cc">c</span> + <span class="cb">b</span><span class="cd">d</span><br>Her terim, diğer parantezdeki her terimle bir kez çarpılır: 2 × 2 = 4 parça.<br>Bonus: (a + b)² = a² + 2ab + b² (a² + b² değil)', 'Kural: iki toplamın çarpımı', 'kural-4parca');
  }

  /* ============ SAHNE 10 – Etkisiz ve ters eleman ============ */
  async function s10(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const mkRow = (y, parts, sz = 30) => { const t = TS(pr, 668, y, parts, { size: sz, w: 800 }); t.style.opacity = 0; fitText(t, 300); return t; };
    const R1 = mkRow(112, [['a', A], ' + ', ['0', OK], ' = ', ['a', A]]);
    const R2 = mkRow(158, [['a', A], ' · ', ['1', OK], ' = ', ['a', A]]);
    const R3 = mkRow(222, ['5 + (' + MIN + '5) = ', ['0', OK]]);
    const R4 = mkRow(268, [['a', A], ' + (' + MIN, ['a', A], ') = ', ['0', OK]]);
    const R5 = mkRow(332, ['4 · ', ['1/4', B], ' = ', ['1', OK]]);
    const R6 = mkRow(378, [['a', A], ' · (', ['1/a', B], ') = ', ['1', OK], '  (a ≠ 0)']);
    const R7 = mkRow(442, [['0 · ? = 1', BAD]]);
    const R8 = mkRow(490, [['a ' + MIN + ' b = a + (' + MIN + 'b)', MUTE]], 24);
    const R9 = mkRow(522, [['a ÷ b = a · (1/b)  (b ≠ 0)', MUTE]], 24);
    const stage = g(svg);

    /* --- 1) etkisiz eleman --- */
    const g1 = g(stage); hide(g1);
    const U = 24, bx = 90, by = 130;
    R(g1, bx, by, 10 * U, 58, { rx: 10, fill: 'url(#gA)', stroke: mix(A, 0.5), sw: 2.5, filter: 'shd' });
    T(g1, bx + 5 * U, by + 40, 'a', { anchor: 'middle', size: 38, fill: '#0b1230', w: 800 });
    const br1 = g(g1); brH(br1, bx, bx + 10 * U, by + 74, A, false, 4); T(br1, bx + 5 * U, by + 118, 'uzunluk: a', { anchor: 'middle', size: 26, fill: A, w: 800 });
    const zero = g(g1); const zr = R(zero, 0, 0, 64, 58, { rx: 12, fill: OK, fo: 0.15, stroke: OK, sw: 3, dash: '7 5' }); T(zero, 32, 41, '0', { anchor: 'middle', size: 38, fill: OK, w: 800 });
    place(zero, 440, by); hide(zero);
    const lab1 = T(g1, bx + 10 * U + 20, by + 40, '', { size: 26, fill: OK, w: 800 });
    const m1y = 400;
    const cellsG = g(g1); const cl = [];
    for (let i = 0; i < 10; i++) { const r = R(cellsG, bx + i * U, m1y, U - 2, U - 2, { rx: 5, fill: A, fo: 0.9 }); r.style.opacity = 0; cl.push(r); }
    const brA = g(g1); brH(brA, bx, bx + 10 * U, m1y - 12, A, true, 4); T(brA, bx + 5 * U, m1y - 30, 'a', { anchor: 'middle', size: 32, fill: A, w: 800 }); hide(brA);
    const brOne = g(g1); brV(brOne, bx - 14, m1y, m1y + U - 2, OK, true, 4); T(brOne, bx - 34, m1y + U / 2 + 10, '1', { anchor: 'end', size: 32, fill: OK, w: 800 }); hide(brOne);
    const cnt1 = T(g1, bx + 10 * U + 20, m1y + 22, '', { size: 26, fill: A, w: 800 });
    await par(say(c, 'Bazı sayılar sahnede olup hiçbir şeyi değiştirmez. Toplamada bu sayı <b>sıfır</b>: a + 0 = a. Çarpmada <b>bir</b>: a · 1 = a.'), (async () => {
      await fade(c, g1, 500); await fade(c, zero, 400);
      await c.tween(900, (e) => place(zero, lerp(440, bx + 10 * U + 10, e), by), ease.inOut);
      await c.tween(500, (e) => { aboutC(zero, bx + 10 * U + 10, by + 29, Math.max(0.02, 1 - e), 1); }, ease.in); zero.style.opacity = 0;
      lab1.textContent = '+ 0 → uzunluk hâlâ a'; await fade(c, R1, 500);
      await fade(c, brA, 400); await fade(c, brOne, 400);
      for (const r of cl) { r.style.opacity = 1; await c.wait(70); }
      cnt1.textContent = 'a · 1 = a hücre'; await fade(c, R2, 500);
      await c.wait(900);
    })());

    /* --- 2) ters toplama --- */
    await fade(c, g1, 400, 0);
    const g2 = g(stage); hide(g2);
    const NX = (v) => 330 + v * 46, NY = 280;
    L(g2, NX(-6) - 16, NY, NX(6) + 16, NY, '#6d7bb8', 3);
    for (let v = -6; v <= 6; v++) { L(g2, NX(v), NY - (v === 0 ? 12 : 8), NX(v), NY + (v === 0 ? 12 : 8), v === 0 ? INK : '#6d7bb8', v === 0 ? 4 : 2.5); T(g2, NX(v), NY + 42, v < 0 ? MIN + String(-v) : String(v), { anchor: 'middle', size: 22, fill: v === 0 ? INK : MUTE, w: v === 0 ? 800 : 500 }); }
    const dot = Ci(g2, NX(0), NY, 13, { fill: A, stroke: '#fff', sw: 3 });
    const j1 = arcJump(g2, NX(0), NX(5), NY - 16, 62, A, '+5');
    const j2 = arcJump(g2, NX(5), NX(0), NY - 16, 150, B, MIN + '5');
    j2.path.setAttribute('stroke-dasharray', '1 0');
    const fin = T(g2, NX(0), NY - 150 - 62, '', { anchor: 'middle', size: 34, fill: OK, w: 800 });
    await par(say(c, '<b>Ters eleman</b> sayıyı başlangıca döndürür: 5 + (−5) = 0. Sıfıra gitmek için ters yöne aynı kadar gidersin.'), (async () => {
      await fade(c, g2, 500); await c.wait(300);
      await drawIn(c, j1.path, 800); await par(fade(c, j1.head, 150), fade(c, j1.lab, 250));
      await c.tween(500, (e) => dot.setAttribute('cx', lerp(NX(0), NX(5), e)), ease.inOut);
      await c.wait(400);
      await drawIn(c, j2.path, 1100); await par(fade(c, j2.head, 150), fade(c, j2.lab, 250));
      await c.tween(600, (e) => dot.setAttribute('cx', lerp(NX(5), NX(0), e)), ease.inOut);
      dot.setAttribute('fill', OK); fin.textContent = '5 + (' + MIN + '5) = 0'; await fade(c, fin, 400);
      await fade(c, R3, 500); await c.wait(300); await fade(c, R4, 500);
      await c.wait(700);
    })());

    /* --- 3) ters çarpma --- */
    await fade(c, g2, 400, 0);
    const g3 = g(stage); hide(g3);
    const QX = 100, QW = 400, QY = 170, QH = 70;
    R(g3, QX, QY, QW, QH, { rx: 12, fill: 'url(#gB)', fo: 0.3, stroke: B, sw: 3 });
    T(g3, QX + QW / 2, QY - 16, '1 bütün', { anchor: 'middle', size: 28, fill: B, w: 800 });
    const parts = [];
    for (let i = 0; i < 4; i++) {
      const pg = g(g3); R(pg, 0, 0, QW / 4 - 4, QH, { rx: 10, fill: 'url(#gB)', stroke: mix(B, 0.5), sw: 2.5, filter: 'shd' }); T(pg, QW / 8 - 2, QH / 2 + 10, '1/4', { anchor: 'middle', size: 30, fill: '#0b1230', w: 800 });
      place(pg, QX + i * (QW / 4) + 2, QY); parts.push(pg);
    }
    const ghost = g(g3); R(ghost, QX, 340, QW, QH, { rx: 12, stroke: '#6d7bb8', sw: 2.5, dash: '8 6' }); T(ghost, QX + QW / 2, 326, '1 bütün', { anchor: 'middle', size: 26, fill: MUTE, w: 600 }); hide(ghost);
    const cnt4 = T(g3, QX + QW / 2, 492, '', { anchor: 'middle', size: 40, fill: OK, w: 800 });
    await par(say(c, 'Çarpma tersi: <b>4 · 1/4 = 1</b>. Bütünü 4 eşit parçaya böl, 4 parçayı yan yana koy: tam 1 çubuğu doldurur.'), (async () => {
      await fade(c, g3, 500); await c.wait(600);
      await fade(c, ghost, 400);
      for (let i = 0; i < 4; i++) {
        const sx = QX + i * (QW / 4) + 2;
        await c.tween(650, (e) => place(parts[i], sx, lerp(QY, 340, e) - Math.sin(e * Math.PI) * 30), ease.inOut);
        cnt4.textContent = (i + 1) + ' · 1/4 = ' + (i + 1) + '/4'; await c.wait(150);
      }
      cnt4.textContent = '4 · 1/4 = 1'; await pulse(c, cnt4, 500, 0.25);
      await fade(c, R5, 500); await c.wait(300); await fade(c, R6, 500);
      await c.wait(600);
    })());

    /* --- 4) 0 · ? = 1 --- */
    await fade(c, g3, 400, 0);
    const g4 = g(stage); hide(g4);
    const bxx = g(g4); R(bxx, 120, 180, 380, 120, { rx: 20, fill: '#10193d', stroke: BAD, sw: 3, filter: 'shd' });
    T(bxx, 160, 258, '0 ·', { size: 56, w: 800 });
    const qm = T(bxx, 280, 258, '?', { size: 64, fill: BAD, w: 800 });
    T(bxx, 350, 258, '= 1', { size: 56, w: 800 });
    const tryT = T(g4, 310, 360, '', { anchor: 'middle', size: 34, w: 800 });
    const warn = T(g4, 310, 430, '', { anchor: 'middle', size: 30, fill: A, w: 800 });
    await par(say(c, 'Sıfırın çarpma tersi yok: <b>0 · ? = 1</b> olacak hiçbir sayı bulunamaz.', { ms: 3200 }), (async () => {
      await fade(c, g4, 500);
      for (const v of ['3', '17', '100', '0,5']) {
        qm.textContent = v; await par(shake(c, bxx, 400));
        tryT.textContent = '0 · ' + v + ' = 0  ≠  1'; tryT.style.fill = BAD; await c.wait(550);
      }
      qm.textContent = '?'; warn.textContent = '0 ile çarpınca hep 0 çıkar.'; await c.wait(900);
      warn.textContent = '1/0 tanımsızdır.'; await fade(c, R7, 500);
      await c.wait(500);
      await par(fade(c, R8, 500)); await fade(c, R9, 500);
    })());
    await say(c, 'Ek olarak: <b>çıkarma = ters ile toplama</b> (a − b = a + (−b)), <b>bölme = ters ile çarpma</b> (a ÷ b = a · 1/b).', { ms: 5200 });

    /* --- sorular --- */
    await c.choice({
      tag: 'Boşluğu doldur', q: '5 + ? = 0', options: ['−5', '0', '5'], answer: 0,
      hints: ['', '5 + 0 = 5: 0 etkisiz eleman, sıfıra döndürmez. Ters yöne gitmelisin.', '5 + 5 = 10: 10’a gittin. Sıfıra dönmek için ters yöne aynı kadar gitmelisin.'],
      right: 'Evet: 5 + (−5) = 0. Toplamaya göre ters eleman −5.',
    });
    await c.choice({
      tag: 'Boşluğu doldur', q: '5 · ? = 1', options: ['1/5', '5', '−5'], answer: 0,
      hints: ['', '5 · 5 = 25. Çarpmada 1’e dönmek için 5’in tersi gerekir.', '5 · (−5) = −25. Çarpma tersi, çarpınca 1 veren sayıdır.'],
      right: 'Evet: 5 · 1/5 = 1. Çarpmaya göre ters eleman 1/5.',
    });
    await c.choice({
      tag: 'Boşluğu doldur', q: 'x + 7 = 7 ise x = ?', options: ['0', '1', '7'], answer: 0,
      hints: ['', 'x = 1 olsaydı 1 + 7 = 8 olurdu. Toplamada etkisiz eleman 1 değil.', 'x = 7 olsaydı 7 + 7 = 14 olurdu. Sayıyı değiştirmeyen toplanan sıfırdır.'],
      right: 'Evet: x = 0. Toplamada etkisiz eleman 0. Not: 0’ın çarpma tersi yok; 1/0 tanımsızdır.',
    });
    c.note('Etkisiz eleman: <span class="ca">a</span> + 0 = <span class="ca">a</span> &nbsp;ve&nbsp; <span class="ca">a</span> · 1 = <span class="ca">a</span><br>Ters eleman: <span class="ca">a</span> + (−<span class="ca">a</span>) = 0 &nbsp;ve&nbsp; <span class="ca">a</span> · (1/<span class="ca">a</span>) = 1 &nbsp;(a ≠ 0)<br>0’ın çarpma tersi yoktur.', 'Kural: etkisiz ve ters eleman', 'kural-etkisiz-ters');
  }

  /* ============ SAHNE 11 – Hile ustası modu ============ */
  const CHALLENGES = [
    {
      q: [25, 36], ans: 900, best: 1,
      cards: [
        { ex: '25 × (30 + 6)', badge: 'dağılma', steps: ['25 × (30 + 6)', '25·30 + 25·6', '750 + 150', '900'], res: 900, ok: true, stars: 2, sk: [25, 30, 6, '+'] },
        { ex: '(25 × 4) × 9', note: 'çünkü 36 = 4 · 9', badge: 'birleşme', steps: ['(25 × 4) × 9', '100 × 9', '900'], res: 900, ok: true, stars: 3, pre: '36 = 4 · 9' },
        { ex: '36 × (20 + 5)', badge: 'değişme + dağılma', steps: ['36 × (20 + 5)', '36·20 + 36·5', '720 + 180', '900'], res: 900, ok: true, stars: 2, sk: [36, 20, 5, '+'], pre: '25 · 36 = 36 · 25' },
        { ex: '25 × 30 + 6', badge: 'yanlış dağılma', steps: ['25 × 30 + 6', '750 + 6', '756'], res: 756, ok: false, stars: 0 },
      ],
      trapHint: '756 ≠ 900. Dışarıdaki 25, 6 ile de çarpılmalı: 25·30 + <b>25·6</b>.',
      fast: 'Daha kısa yol var: 36 = 4 · 9 diye ayır, (25 × 4) × 9 = 100 × 9. Yuvarlak çarpım hesabı kolaylaştırır.',
      star3: 'Usta işi! 25 · 4 = 100 gibi yuvarlak çarpımlar zihinden hesabı kolaylaştırır.',
    },
    {
      q: [99, 13], ans: 1287, best: 0,
      cards: [
        { ex: '13 × (100 − 1)', badge: 'değişme + dağılma', steps: ['13 × (100 − 1)', '13·100 − 13·1', '1300 − 13', '1287'], res: 1287, ok: true, stars: 3, sk: [13, 100, 1, '−'], pre: '99 · 13 = 13 · 99' },
        { ex: '(90 + 9) × 13', badge: 'dağılma', steps: ['(90 + 9) × 13', '90·13 + 9·13', '1170 + 117', '1287'], res: 1287, ok: true, stars: 2 },
        { ex: '99 × (10 + 3)', badge: 'dağılma', steps: ['99 × (10 + 3)', '99·10 + 99·3', '990 + 297', '1287'], res: 1287, ok: true, stars: 2, sk: [99, 10, 3, '+'] },
        { ex: '13 × 100 − 1', badge: 'eksik çarpma', steps: ['13 × 100 − 1', '1300 − 1', '1299'], res: 1299, ok: false, stars: 0 },
      ],
      trapHint: '1299 ≠ 1287. Çıkarılan 1 de 13 ile çarpılmalı: 13·100 − <b>13·1</b>.',
      fast: 'Daha kısa yol var: 99 = 100 − 1. 13 · 100 yuvarlak, geriye yalnızca 13 çıkarmak kalır.',
      star3: 'Usta işi! 100’e yakın sayıyı 100 − 1 diye yazmak çarpmayı çok kolaylaştırır.',
    },
    {
      q: [17, 12], ans: 204, best: 2,
      cards: [
        { ex: '17 × (10 + 2)', badge: 'dağılma', steps: ['17 × (10 + 2)', '17·10 + 17·2', '170 + 34', '204'], res: 204, ok: true, stars: 2, sk: [17, 10, 2, '+'] },
        { ex: '12 × (20 − 3)', badge: 'çıkarmayla dağılma', steps: ['12 × (20 − 3)', '12·20 − 12·3', '240 − 36', '204'], res: 204, ok: true, stars: 2, sk: [12, 20, 3, '−'], pre: '17 · 12 = 12 · 17' },
        { ex: '(17 × 4) × 3', note: 'çünkü 12 = 4 · 3', badge: 'birleşme', steps: ['(17 × 4) × 3', '68 × 3', '204'], res: 204, ok: true, stars: 3, pre: '12 = 4 · 3' },
        { ex: '17 × 10 + 2', badge: 'yanlış dağılma', steps: ['17 × 10 + 2', '170 + 2', '172'], res: 172, ok: false, stars: 0 },
      ],
      trapHint: '172 ≠ 204. 17, 2 ile de çarpılmalı: 17·10 + <b>17·2</b>.',
      fast: 'Daha kısa yol var: 12 = 4 · 3 diye ayır. 17 × 4 = 68, sonra 68 × 3 = 204: yalnızca iki adım.',
      star3: 'Usta işi! Doğru ayrıştırma hesabı iki adıma indirdi.',
    },
  ];
  /* serbest mod önerileri */
  function suggestions(x, y) {
    const out = []; const prod = x * y;
    [[x, y], [y, x]].forEach(([p, q]) => {
      for (const base of [100, 10]) {
        const r = Math.round(p / base) * base, d = p - r;
        if (r > 0 && d !== 0 && Math.abs(d) <= 3) {
          out.push(d < 0
            ? `${q} × (${r} − ${-d}) = ${q}·${r} − ${q}·${-d} = ${q * r} − ${q * -d} = <b>${prod}</b>  <span class="muted">(çıkarmayla dağılma)</span>`
            : `${q} × (${r} + ${d}) = ${q}·${r} + ${q}·${d} = ${q * r} + ${q * d} = <b>${prod}</b>  <span class="muted">(dağılma)</span>`);
          break;
        }
      }
    });
    const map = { 25: 4, 125: 8, 5: 2 };
    [[x, y], [y, x]].forEach(([p, q]) => {
      const m = map[p];
      if (m && q % m === 0 && q !== m) out.push(`${p} × ${q} = ${p} × ${m} × ${q / m} = ${p * m} × ${q / m} = <b>${prod}</b>  <span class="muted">(birleşme + değişme)</span>`);
    });
    if (!out.length) {
      const big = Math.max(x, y), small = Math.min(x, y), t = Math.floor(big / 10) * 10, r = big - t;
      if (t > 0 && r > 0) out.push(`${small} × (${t} + ${r}) = ${small}·${t} + ${small}·${r} = ${small * t} + ${small * r} = <b>${prod}</b>  <span class="muted">(10 + kalan ayrışımı)</span>`);
      else out.push(`${x} × ${y} = <b>${prod}</b>`);
    }
    return [...new Set(out)].slice(0, 3);
  }
  function star(p, cx, cy, r, filled) {
    const pts = []; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, a = (Math.PI / 5) * i - Math.PI / 2; pts.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); }
    const pl = SV('polygon', { points: pts.join(' '), 'stroke-linejoin': 'round' }, p);
    pl.setAttribute('fill', filled ? A : 'none'); pl.setAttribute('stroke', filled ? mix(A, 0.5) : '#4a5a99'); pl.setAttribute('stroke-width', 3);
    return pl;
  }
  async function s11(c) {
    const svg = base(c);
    const px = sidePanel(svg, 'USTALIK'); const pr = px.rows;
    T(pr, 668, 100, 'Meydan okuma', { size: 22, fill: MUTE, w: 600 });
    const chT = T(pr, 668, 140, '1 / 3', { size: 34, w: 800 });
    const starsG = g(pr), starEls = [0, 1, 2].map((i) => star(starsG, 702 + i * 64, 204, 26, false));
    T(pr, 668, 280, 'Adım sayacı', { size: 22, fill: MUTE, w: 600 });
    const stepN = T(pr, 668, 340, '0', { size: 58, fill: A, w: 800 });
    const resT = T(pr, 668, 396, '', { size: 34, w: 800 });
    const totT = T(pr, 668, 470, 'Toplam: 0 / 9 yıldız', { size: 26, fill: MUTE, w: 700 });
    const cashG = g(px.g); hide(cashG);
    const stage = g(svg), stepsG = g(svg);
    /* bekleme hâli: kasiyer soruyor */
    const idle = g(svg);
    figure(idle, 120, 548, 1.0, '#2f7f9c', A);
    bubble(idle, 190, 262, 330, 100, 140, 386, A);
    T(idle, 355, 304, 'Hangi ayrıştırma', { anchor: 'middle', size: 28, fill: A, w: 800 });
    T(idle, 355, 342, 'daha hızlı olur?', { anchor: 'middle', size: 28, fill: A, w: 800 });
    /* fiş */
    const fis = g(stage); R(fis, 40, 26, 300, 86, { rx: 10, fill: '#f4efe0' }).setAttribute('filter', 'url(#shd)');
    T(fis, 60, 54, 'KASA FİŞİ', { size: 22, fill: '#6b6f86', w: 800, ls: 2 });
    const fisT = T(fis, 60, 98, '25 × 36 = ?', { size: 40, fill: '#1b2140', w: 800 });
    let totalStars = 0;
    const setStars = (n, anim) => {
      starEls.forEach((s_, i) => { s_.setAttribute('fill', i < n ? A : 'none'); s_.setAttribute('stroke', i < n ? mix(A, 0.5) : '#4a5a99'); });
      if (anim && n) fire(pulse(c, starsG, 500, 0.25));
    };
    const mini = (p, x0, y0, [pp, q, r, sg]) => {
      const W = 150, H = 96, wl = Math.max(26, W * (q / (q + r)) * (sg === '−' ? 0.85 : 0.78)), wr = Math.max(26, W - wl - 6);
      const gg = g(p);
      R(gg, x0, y0, wl, H, { rx: 6, fill: B, fo: 0.4, stroke: B, sw: 3 });
      R(gg, x0 + wl + 6, y0, wr, H, { rx: 6, fill: sg === '−' ? BAD : C, fo: 0.35, stroke: sg === '−' ? BAD : C, sw: 3, dash: sg === '−' ? '8 5' : null });
      T(gg, x0 - 12, y0 + H / 2 + 10, String(pp), { anchor: 'end', size: 28, fill: A, w: 800 });
      T(gg, x0 + wl / 2, y0 - 12, String(q), { anchor: 'middle', size: 26, fill: B, w: 800 });
      T(gg, x0 + wl + 6 + wr / 2, y0 - 12, (sg === '−' ? '−' : '') + r, { anchor: 'middle', size: 26, fill: sg === '−' ? BAD : C, w: 800 });
      T(gg, x0 + W / 2, y0 + H + 28, 'ölçekli değil', { anchor: 'middle', size: 22, fill: MUTE, w: 500 });
      return gg;
    };
    async function play(card, ch) {
      stepsG.innerHTML = ''; setOp(stepsG, 1); resT.textContent = ''; stepN.textContent = '0';
      let sx = 60, y = 190;
      if (card.sk) { mini(stepsG, 74, 190, card.sk); sx = 290; }
      if (card.pre) { const pt = T(stepsG, sx, 160, card.pre, { size: 26, fill: A, w: 700 }); pt.style.opacity = 0; await fade(c, pt, 350); }
      const lines = [];
      for (let i = 0; i < card.steps.length; i++) {
        const t = TS(stepsG, sx, y + 62 * i + 24, i ? [['= ', OK], card.steps[i]] : [card.steps[i]], { size: i === card.steps.length - 1 ? 44 : 36, w: 800 });
        if (i === card.steps.length - 1) t.style.fill = card.ok ? OK : BAD;
        t.style.opacity = 0; lines.push(t);
      }
      for (let i = 0; i < lines.length; i++) {
        await fade(c, lines[i], 450); stepN.textContent = String(i); await c.wait(300);
      }
      setParts(resT, card.ok ? [['✓ ' + card.res, OK]] : [['✗ ' + card.res + ' ≠ ' + ch.ans, BAD]]);
      await c.wait(400);
    }
    for (let ci = 0; ci < CHALLENGES.length; ci++) {
      const ch = CHALLENGES[ci];
      chT.textContent = (ci + 1) + ' / 3'; setStars(0); stepsG.innerHTML = ''; resT.textContent = ''; stepN.textContent = '0'; fire(fade(c, idle, 300, 1));
      setParts(fisT, [ch.q[0] + ' × ' + ch.q[1] + ' = ?']);
      if (ci === 0) await say(c, 'Şimdi kasiyerin yerine geç. Sana bir çarpma veriyorum; sayıyı hangi parçalara ayıracağını sen seç. Her seçimin arkasında bir işlem özelliği var.', { ms: 5600 });
      else await say(c, `Yeni meydan okuma: <b>${ch.q[0]} × ${ch.q[1]}</b>. En kısa ve doğru yolu seç.`, { ms: 2600 });
      const grid = h('div', { class: 'cards opts' });
      const fb = h('div');
      const panel = c.panel(`Meydan okuma ${ci + 1}`, h('p', { class: 'q', html: `<b>${ch.q[0]} × ${ch.q[1]}</b> işlemini hangi ayrıştırmayla yapmak istersin?` }), grid, fb);
      let pending = null; const btns = [];
      ch.cards.forEach((cd, i) => {
        const b = h('button', { class: 'opt cardopt', html: `<span class="rz">${cd.badge}</span><span>${cd.ex.replace(/×/g, '×')}${cd.note ? ` <small class="muted">${cd.note}</small>` : ''}</span>` });
        b.addEventListener('click', () => { if (pending) { const r = pending; pending = null; r(i); } });
        grid.appendChild(b); btns.push(b);
      });
      let tries = 0, done = false, wrongSet = new Set(); let gotStars = 0;
      while (!done) {
        btns.forEach((b, i) => { b.disabled = wrongSet.has(i); });
        const idx = await new Promise((res) => { pending = res; });
        btns.forEach((b) => { b.disabled = true; });
        await fade(c, idle, 200, 0);
        const card = ch.cards[idx];
        await play(card, ch);
        if (card.ok) {
          btns[idx].classList.add('right'); gotStars = card.stars; done = true;
        } else {
          tries++; wrongSet.add(idx); btns[idx].classList.add('wrong'); fire(shake(c, btns[idx]));
          c.feedback(fb, 'no', ch.trapHint);
          if (tries >= 2) {
            c.feedback(fb, 'no', ch.trapHint + ' Doğru yolu birlikte oynatalım.');
            const bi = ch.best; btns[bi].classList.add('right'); await c.wait(900);
            await play(ch.cards[bi], ch); gotStars = 1; done = true;
          }
        }
      }
      setStars(gotStars, true); totalStars += gotStars;
      totT.textContent = `Toplam: ${totalStars} / 9 yıldız`;
      const msg = gotStars === 3 ? ch.star3 : gotStars === 2 ? 'Sonuç doğru (2 yıldız). Daha kısa bir yol da var.' : 'Doğru yol oynatıldı (1 yıldız). Bir sonrakinde dene!';
      c.feedback(fb, gotStars >= 2 ? 'ok' : 'info', msg);
      if (gotStars === 2) {
        const hintB = h('button', { class: 'tool', style: { marginTop: '8px' }, onclick: () => { hintB.disabled = true; c.feedback(fb, 'info', ch.fast); } }, 'İpucu: daha kısa yol?');
        panel.appendChild(hintB);
      }
      await new Promise((res) => panel.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, ci < CHALLENGES.length - 1 ? 'Sonraki meydan okuma ›' : 'Devam ›')));
      panel.remove();
    }

    /* serbest mod */
    stepsG.innerHTML = ''; fire(fade(c, idle, 200, 0));
    const free = g(stepsG);
    T(free, 60, 190, 'Serbest mod', { size: 40, fill: B, w: 800 });
    T(free, 60, 238, 'İki çarpan gir; sana hile önerileri üreteyim.', { size: 26, fill: MUTE, w: 500 });
    await say(c, 'İstersen <b>serbest mod</b>: kendi çarpanlarını gir, sistem sana zihinden hesap önerileri çıkarsın.', { ms: 3600 });
    const inA = h('input', { class: 'numin', type: 'number', min: 2, max: 200, value: 48 }), inB = h('input', { class: 'numin', type: 'number', min: 2, max: 200, value: 25 });
    const out = h('div', { style: { marginTop: '10px', display: 'grid', gap: '8px' } });
    const go_ = h('button', { class: 'tool', onclick: () => {
      const x = Math.round(+inA.value), y = Math.round(+inB.value);
      if (!(x >= 2 && y >= 2 && x <= 200 && y <= 200 && x * y <= 20000)) { out.innerHTML = '<div class="fb no">Her çarpan 2 ile 200 arasında, çarpım en çok 20 000 olmalı.</div>'; return; }
      out.innerHTML = suggestions(x, y).map((s_) => `<div class="fb info" style="margin:0">${s_.replace(/·/g, ' · ')}</div>`).join('');
    } }, 'Öner');
    const fp = c.panel('Serbest mod (isteğe bağlı)', h('div', { class: 'row' }, inA, '×', inB, go_), out);
    go_.click();
    await new Promise((res) => fp.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, 'Bitir ›')));
    fp.remove();

    /* kasiyer geri döner */
    await par(fade(c, pr, 400, 0), fade(c, stepsG, 400, 0));
    const fg = figure(cashG, 820, 520, 1.0, '#2f7f9c', A);
    const bub = bubble(cashG, 690, 270, 260, 90, 820, 400, A); T(cashG, 820, 332, '17 × 12 = 204', { anchor: 'middle', size: 32, fill: A, w: 800 });
    T(cashG, 820, 252, 'Sıradaki müşteri hazır!', { anchor: 'middle', size: 24, fill: MUTE, w: 700 });
    await par(say(c, 'Kasiyerin sırrı artık senin de sırrın: doğru özelliği seçersen hesap saniyeler içinde biter.', { ms: 4200 }), fade(c, cashG, 700));
    c.note('Hile ustasının üç aracı:<br>• Birleşme + değişme: 25 · 36 = (25 · 4) · 9 = 100 · 9 = 900<br>• Dağılma (toplama): 17 · 12 = 17 · (10 + 2) = 170 + 34 = 204<br>• Dağılma (çıkarma): 99 · 13 = 13 · (100 − 1) = 1300 − 13 = 1287', 'Hile ustası', 'kural-hile-ustasi');
  }

  /* ============ SAHNE 12 – Doğru mu, yanlış mı? ============ */
  const CLAIMS = [
    {
      disp: [['a', A], ' · (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], '·', ['b', B], ' + ', ['c', C]],
      L: (a, b, c) => a * (b + c), R: (a, b, c) => a * b + c,
      sL: (a, b, c) => `${a}·(${b} + ${c})`, sR: (a, b, c) => `${a}·${b} + ${c}`,
      truth: false, ce: [2, 3, 4],
      wrong: 'Aldanma: bazı sayılarda (örneğin a = 1) eşit çıkabilir. “Test et” ile a = 2, b = 3, c = 4’ü dene: 14 ≠ 10.',
      right: 'Doğru. Tek bir karşı örnek yeter. Eksik kalan <b>a·c</b> alanına bak.',
      fix: [['Doğrusu: ', MUTE], ['a', A], ' · (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], '·', ['b', B], ' + ', ['a', A], '·', ['c', C]],
    },
    {
      disp: [['a', A], ' ' + MIN + ' (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], ' ' + MIN + ' ', ['b', B], ' + ', ['c', C]],
      L: (a, b, c) => a - (b + c), R: (a, b, c) => a - b + c,
      sL: (a, b, c) => `${a} ${MIN} (${b} + ${c})`, sR: (a, b, c) => `${a} ${MIN} ${b} + ${c}`,
      truth: false, ce: [10, 3, 2],
      wrong: 'Karşı örnek ara: a = 10, b = 3, c = 2 → sol 10 − 5 = 5, sağ 10 − 3 + 2 = 9.',
      right: 'Doğru. Eksi işareti parantezdeki herkese etki eder: a − (b + c) = a − b − c.',
      fix: [['Doğrusu: ', MUTE], ['a', A], ' ' + MIN + ' (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], ' ' + MIN + ' ', ['b', B], ' ' + MIN + ' ', ['c', C]],
    },
    {
      disp: [['a', A], ' ÷ (', ['b', B], ' + ', ['c', C], ') = ', ['a', A], ' ÷ ', ['b', B], ' + ', ['a', A], ' ÷ ', ['c', C]],
      L: (a, b, c) => a / (b + c), R: (a, b, c) => a / b + a / c,
      sL: (a, b, c) => `${a} ÷ (${b} + ${c})`, sR: (a, b, c) => `${a} ÷ ${b} + ${a} ÷ ${c}`,
      truth: false, ce: [12, 2, 4],
      wrong: 'Karşı örnek ara: a = 12, b = 2, c = 4 → sol 12 ÷ 6 = 2, sağ 6 + 3 = 9.',
      right: 'Doğru. Bölme paydaya dağılmaz. Sağdan bölme dağılır: (b + c) ÷ a = b ÷ a + c ÷ a.',
      fix: [['Doğrusu: ', MUTE], '(', ['b', B], ' + ', ['c', C], ') ÷ ', ['a', A], ' = ', ['b', B], ' ÷ ', ['a', A], ' + ', ['c', C], ' ÷ ', ['a', A]],
      fix2: '(4 + 6) ÷ 2 = 5 = 2 + 3 ✓',
    },
    {
      disp: [['a', A], ' · (', ['b', B], ' ' + MIN + ' ', ['c', C], ') = ', ['a', A], '·', ['b', B], ' ' + MIN + ' ', ['a', A], '·', ['c', C]],
      L: (a, b, c) => a * (b - c), R: (a, b, c) => a * b - a * c,
      sL: (a, b, c) => `${a}·(${b} ${MIN} ${c})`, sR: (a, b, c) => `${a}·${b} ${MIN} ${a}·${c}`,
      truth: true, ce: [3, 7, 2],
      wrong: '20 denemede karşı örnek bulunamadı. Karşı örnek bulunamıyorsa şüphelen, kuralı kanıtla: alan modeline bak.',
      right: 'Doğru. Denediğin örnekler tuttu, ama emin olmak için kuralın nedenini (alan modelini) biliyoruz.',
      fix: [['Kanıt: ', MUTE], 'a × b dikdörtgeninden a × c şeridini kes.'],
    },
  ];
  const near = (x, y) => Math.abs(x - y) < 1e-9;
  const AUTO10 = [[3, 7, 2], [5, 9, 4], [2, 6, 1], [8, 5, 3], [4, 8, 7], [9, 3, 1], [6, 9, 5], [7, 4, 2], [1, 9, 8], [5, 5, 3]];

  async function s12(c) {
    const svg = base(c);
    const px = sidePanel(svg, 'DENEMELER'); const pr = px.rows;
    const logG = g(pr);
    const logs = [];
    const logTest = (a, b, cc, vL, vR) => {
      if (logs.length && logs[0][0] === a && logs[0][1] === b && logs[0][2] === cc) return;
      logs.unshift([a, b, cc, vL, vR]); if (logs.length > 8) logs.pop();
      logG.innerHTML = '';
      logs.forEach(([a_, b_, c_, l_, r_], i) => {
        const eq = near(l_, r_);
        TS(logG, 668, 98 + i * 52, [[`${a_}, ${b_}, ${c_}`, MUTE], [' → ', MUTE], [fv(l_) + (eq ? ' = ' : ' ≠ ') + fv(r_), eq ? OK : BAD]], { size: 24, w: 700 });
      });
    };
    const fv = (v) => { const r = Math.round(v * 100) / 100; return (near(v, r) ? '' : '≈') + num(r); };
    const cardG = g(svg);
    R(cardG, 40, 22, 580, 96, { rx: 18, fill: '#10193d', stroke: '#33437f', sw: 2.5, filter: 'shd' });
    const claimT = TS(cardG, 330, 86, CLAIMS[0].disp, { anchor: 'middle', size: 40, w: 800 });
    const tag = T(cardG, 60, 48, 'İDDİA', { size: 22, fill: MUTE, w: 800, ls: 3 });
    const ev = g(svg);
    const valT = TS(ev, 60, 182, [''], { size: 32, w: 800 });
    const lT = TS(ev, 60, 238, [''], { size: 34, w: 800 });
    const rT = TS(ev, 60, 292, [''], { size: 34, w: 800 });
    const sign = T(ev, 560, 276, '', { anchor: 'middle', size: 96, w: 800 });
    const stamp = g(ev, { transform: 'translate(330 356) rotate(-7)' });
    R(stamp, -190, -36, 380, 66, { rx: 12, stroke: BAD, sw: 5, fill: BAD, fo: 0.1 }); T(stamp, 0, 12, 'KARŞI ÖRNEK', { anchor: 'middle', size: 44, fill: BAD, w: 800, ls: 3 });
    stamp.style.opacity = 0;
    const lower = g(svg);
    const q1 = T(svg, 330, 372, '', { anchor: 'middle', size: 34, fill: A, w: 800 });
    let cur = 0; const st = { a: 1, b: 5, c: 7 };
    function showEval(a, b, cc, k) {
      const cl = CLAIMS[k !== undefined ? k : cur];
      setParts(valT, [['a', A], ' = ', [String(a), A], '     ', ['b', B], ' = ', [String(b), B], '     ', ['c', C], ' = ', [String(cc), C]]);
      const vL = cl.L(a, b, cc), vR = cl.R(a, b, cc), eq = near(vL, vR);
      setParts(lT, [['Sol: ', MUTE], cl.sL(a, b, cc) + ' = ', [fv(vL), eq ? OK : INK]]);
      setParts(rT, [['Sağ: ', MUTE], cl.sR(a, b, cc) + ' = ', [fv(vR), eq ? OK : INK]]);
      fitText(lT, 470); fitText(rT, 470);
      sign.textContent = eq ? '=' : '≠'; sign.style.fill = eq ? OK : BAD;
      return { vL, vR, eq };
    }
    async function stampIn(hold = 1000) { stamp.style.opacity = 0; await c.tween(450, (e) => { stamp.setAttribute('transform', `translate(330 356) rotate(-7) scale(${1.5 - 0.5 * e})`); stamp.style.opacity = e; }, ease.out); await c.wait(hold); await fade(c, stamp, 300, 0); }
    /* --- giriş: arkadaşın iddiası --- */
    sign.style.opacity = 0;
    await par(say(c, 'Son sahne: kuralları sınama zamanı. Bir arkadaşın <b>a · (b + c) = a · b + c</b> diyor ve a = 1 ile deniyor: oluyor!', { ms: 5600 }), (async () => {
      await fade(c, cardG, 500);
      await par(fade(c, ev, 400)); sign.style.opacity = 0;
      const r1 = showEval(1, 5, 7, 0); logTest(1, 5, 7, r1.vL, r1.vR);
      sign.style.opacity = 1; await c.wait(1500);
      q1.textContent = 'Bu bir kanıt mı?'; q1.style.opacity = 0; await fade(c, q1, 400); await pulse(c, q1, 600, 0.15); await c.wait(700);
    })());
    await par(say(c, 'Hayır. Bir eşitliğin doğru olduğunu birkaç örnek göstermez; yanlış olduğunu ise <b>tek bir karşı örnek</b> gösterir. Bir de a = 2, b = 3, c = 4’ü dene.', { ms: 6500 }), (async () => {
      await fade(c, q1, 300, 0);
      const r2 = showEval(2, 3, 4, 0); logTest(2, 3, 4, r2.vL, r2.vR);
      await stampIn(1500);
    })());

    /* --- etkileşim araçları --- */
    let sl; let busy = false;
    const upd = () => { const r = showEval(st.a, st.b, st.c); return r; };
    const setAll = (a, b, cc, silent) => { st.a = a; st.b = b; st.c = cc; sl.set('a', a, true); sl.set('b', b, true); sl.set('c', cc, true); upd(); };
    const tBtn = h('button', { class: 'tool', onclick: () => { const ce = CLAIMS[cur].ce; setAll(...ce); const r = upd(); logTest(...ce, r.vL, r.vR); if (!r.eq) fire(stampIn()); else c.feedback(fbBox, 'info', 'Bu üçlüde eşit çıktı. Başka üçlüler de dene.'); } }, 'Test et');
    const sBtn = h('button', { class: 'tool', onclick: () => fire(searchCE()) }, 'Karşı örnek ara');
    const fbBox = h('div');
    async function searchCE() {
      if (busy) return; busy = true;
      const cl = CLAIMS[cur]; let found = null;
      for (let i = 1; i <= 20; i++) {
        const a = 1 + Math.floor(Math.random() * 9), b = 1 + Math.floor(Math.random() * 9), cc = 1 + Math.floor(Math.random() * 9);
        setAll(a, b, cc); c.feedback(fbBox, 'info', `Deneme ${i} / 20…`);
        await c.wait(90);
        if (!near(cl.L(a, b, cc), cl.R(a, b, cc))) { found = [a, b, cc, i]; break; }
      }
      if (found) { const [a, b, cc, i] = found; const r = upd(); logTest(a, b, cc, r.vL, r.vR); c.feedback(fbBox, 'no', `${i}. denemede karşı örnek bulundu: a = ${a}, b = ${b}, c = ${cc}.`); fire(stampIn()); }
      else c.feedback(fbBox, 'ok', '20 deneme: karşı örnek yok. (Bu bir kanıt değil, yalnızca ipucu.)');
      busy = false;
    }
    sl = sliders(c, 'Dene', [{ k: 'a', min: 1, max: 9, step: 1, v: st.a, col: A }, { k: 'b', min: 1, max: 9, step: 1, v: st.b, col: B }, { k: 'c', min: 1, max: 9, step: 1, v: st.c, col: C }], (k, v) => { st.a = v.a; st.b = v.b; st.c = v.c; upd(); },
      h('div', {}, h('div', { class: 'row', style: { marginTop: '8px' } }, tBtn, sBtn, h('span', { class: 'muted' }, 'Slider’la kendi üçlünü dene')), fbBox));
    ['a', 'b', 'c'].forEach((k) => sl.inputs[k].addEventListener('change', () => { const r = upd(); logTest(st.a, st.b, st.c, r.vL, r.vR); }));
    setAll(2, 3, 4);

    const lowerMsg = (parts, y = 440, sz = 30) => { lower.innerHTML = ''; const t = TS(lower, 330, y, parts, { anchor: 'middle', size: sz, w: 800 }); fitText(t, 560); return t; };
    /* claim 1 için alan modeli: eksik a·c */
    function trapModel() {
      lower.innerHTML = '';
      const u = 26, a = 3, b = 2, cc = 4, ox = 150, oy = 392;
      cells(lower, ox, oy, b, a, u, u, { fill: B, fo: 0.36 }); cells(lower, ox + b * u, oy, cc, 1, u, u, { fill: C, fo: 0.36 });
      R(lower, ox + b * u, oy + u, cc * u, (a - 1) * u, { rx: 4, fill: BAD, fo: 0.08, stroke: BAD, sw: 3, dash: '8 5' });
      T(lower, ox + b * u + (cc * u) / 2, oy + u + ((a - 1) * u) / 2 + 9, 'kayıp a·c', { anchor: 'middle', size: 24, fill: BAD, w: 800 });
      T(lower, ox + b * u + cc * u + 24, oy + 40, 'a · b + c: sağ parça tek satır', { size: 22, fill: MUTE, w: 600 });
      T(lower, ox - 14, oy + (a * u) / 2 + 9, 'a', { anchor: 'end', size: 30, fill: A, w: 800 });
    }
    async function auto10() {
      lower.innerHTML = ''; const row = g(lower); const dts = [];
      for (let i = 0; i < 10; i++) dts.push(Ci(row, 90 + i * 50, 480, 15, { fill: 'none', stroke: '#4a5a99', sw: 2.5 }));
      for (let i = 0; i < AUTO10.length; i++) {
        const [a, b, cc] = AUTO10[i]; setAll(a, b, cc); const r = upd(); logTest(a, b, cc, r.vL, r.vR);
        dts[i].setAttribute('fill', OK); dts[i].setAttribute('stroke', mix(OK, 0.5)); await c.wait(380);
      }
      T(lower, 330, 540, '10 farklı üçlü denendi: hepsi tuttu', { anchor: 'middle', size: 26, fill: OK, w: 800 });
    }
    function proofModel() {
      /* alan modeli kısa tekrar: a×b dikdörtgeninden a×c şeridi çıkar */
      lower.innerHTML = '';
      const u = 22, a = 4, b = 8, cc = 3, ox = 150, oy = 390;
      cells(lower, ox, oy, b - cc, a, u, u, { fill: B, fo: 0.36 }); cells(lower, ox + (b - cc) * u + 24, oy, cc, a, u, u, { fill: BAD, fo: 0.12, stroke: BAD });
      L(lower, ox + (b - cc) * u + 12, oy - 4, ox + (b - cc) * u + 12, oy + a * u + 4, MUTE, 2, '5 4');
      T(lower, ox + ((b - cc) * u) / 2, oy + a * u + 30, 'a·(b − c)', { anchor: 'middle', size: 24, fill: B, w: 800 });
      T(lower, ox + (b - cc) * u + 24 + (cc * u) / 2, oy + a * u + 62, 'a·c (kesilen)', { anchor: 'middle', size: 22, fill: BAD, w: 800 });
      T(lower, ox - 14, oy + (a * u) / 2 + 9, 'a', { anchor: 'end', size: 28, fill: A, w: 800 });
    }

    for (let k = 0; k < CLAIMS.length; k++) {
      cur = k; const cl = CLAIMS[k];
      lower.innerHTML = ''; q1.textContent = '';
      if (k > 0) {
        await fade(c, cardG, 250, 0.2);
        setParts(claimT, cl.disp); fitText(claimT, 540);
        upd();
        await fade(c, cardG, 250, 1);
        if (k === 3) setAll(5, 8, 3);
      } else { fitText(claimT, 540); }
      await say(c, `<b>İddia ${k + 1}:</b> ${k === 3 ? 'Bu doğru mu, yanlış mı?' : 'Doğru mu, yanlış mı?'} Karar ver; istersen önce “Test et” ya da “Karşı örnek ara”yı kullan.`, { ms: 3200 });
      const res = await ask(c, {
        tag: `İddia ${k + 1} / ${CLAIMS.length}`, q: 'Bu eşitlik her a, b, c için doğru mu?',
        options: [
          { html: 'DOĞRU', ok: cl.truth, fb: cl.truth ? cl.right : cl.wrong },
          { html: 'YANLIŞ', ok: !cl.truth, fb: !cl.truth ? cl.right : cl.wrong },
          { html: 'Emin değilim', free: () => {}, fb: 'Sayı koyarak dene; ama a = 1 ya da c = 0 gibi “kolay” sayılar seni yanıltabilir.' },
        ],
        onPick: (i, ok, btn) => {
          if (!ok) {
            fire(shake(c, btn));
            if (!cl.truth) { setAll(...cl.ce); const r = upd(); logTest(...cl.ce, r.vL, r.vR); fire(stampIn()); }
            else fire(searchCE());
          } else if (!cl.truth) { setAll(...cl.ce); const r = upd(); logTest(...cl.ce, r.vL, r.vR); fire(stampIn()); }
        },
      });
      /* doğru karar sonrası açıklama */
      if (k === 0) trapModel();
      else if (k === 1) lowerMsg(cl.fix, 440, 30);
      else if (k === 2) { lowerMsg(cl.fix, 420, 30); const t2 = T(lower, 330, 476, cl.fix2, { anchor: 'middle', size: 30, fill: OK, w: 800 }); void t2; }
      else { await auto10(); await c.wait(1400); proofModel(); await say(c, 'Hepsi tuttu ama bu bir kanıt değil; <b>kanıt</b> alan modelidir: a × b dikdörtgeninden a × c şeridini kes.', { ms: 5200 }); }
      if (k < CLAIMS.length - 1) await c.wait(900);
    }
    sl.el.remove();

    /* kural defteri */
    await par(fade(c, [cardG, ev, lower, q1], 400, 0));
    const rules = [
      [[['Değişme: ', MUTE], ['a', A], ' + ', ['b', B], ' = ', ['b', B], ' + ', ['a', A], '   ', ['a', A], '·', ['b', B], ' = ', ['b', B], '·', ['a', A]]],
      [[['Birleşme: ', MUTE], '(', ['a', A], ' + ', ['b', B], ') + ', ['c', C], ' = ', ['a', A], ' + (', ['b', B], ' + ', ['c', C], ')']],
      [[['Dağılma: ', MUTE], ['a', A], '·(', ['b', B], ' ± ', ['c', C], ') = ', ['a', A], '·', ['b', B], ' ± ', ['a', A], '·', ['c', C]]],
      [[['Etkisiz: ', MUTE], 'a + 0 = a,  a · 1 = a'], [['Ters: ', MUTE], 'a + (' + MIN + 'a) = 0,  a · 1/a = 1']],
      [[['Çıkarma ve bölmede değişme / birleşme yok', MUTE]]],
    ];
    const kd = g(svg);
    let ky = 74;
    const items = [];
    for (const rg of rules) {
      const row = g(kd); row.style.opacity = 0;
      Ci(row, 66, ky - 9, 17, { fill: OK }); P(row, `M57,${ky - 9} L63,${ky - 2} L76,${ky - 18}`, { stroke: '#06101f', sw: 4 });
      rg.forEach((parts, j) => { const t = TS(row, 100, ky + j * 36, parts, { size: j ? 24 : 27, w: 700 }); fitText(t, 500); });
      items.push(row); ky += rg.length > 1 ? 100 : 64;
    }
    const last = g(kd); R(last, 44, ky + 8, 576, 68, { rx: 16, fill: A, fo: 0.12, stroke: A, sw: 3 }); T(last, 332, ky + 54, 'Örnek kanıt değildir, karşı örnek çürütür.', { anchor: 'middle', size: 28, fill: A, w: 800 }); last.style.opacity = 0;
    const cex = [
      TS(pr, 668, 112, [['a', A], '·(', ['b', B], ' + ', ['c', C], ') ≠ ', ['a', A], '·', ['b', B], ' + ', ['c', C]], { size: 26, w: 800 }),
      TS(pr, 668, 160, [['a', A], ' ' + MIN + ' (', ['b', B], ' + ', ['c', C], ') ≠ ', ['a', A], ' ' + MIN + ' ', ['b', B], ' + ', ['c', C]], { size: 26, w: 800 }),
      TS(pr, 668, 208, [['a', A], ' ÷ (', ['b', B], ' + ', ['c', C], ') ≠ ', ['a', A], '÷', ['b', B], ' + ', ['a', A], '÷', ['c', C]], { size: 26, w: 800 }),
    ];
    logG.innerHTML = '';
    hide(...cex);
    px.title.textContent = 'ÇÜRÜTÜLEN İDDİALAR'; px.title.setAttribute('letter-spacing', 2);
    await par(say(c, 'Kural defterini kapatırken: değişme, birleşme, dağılma, etkisiz ve ters eleman. Çıkarma ve bölmede değişme ile birleşme yok. <b>Örnek kanıt değildir, karşı örnek çürütür.</b>', { ms: 8000 }), (async () => {
      for (const it of items) { await fade(c, it, 450); await c.wait(450); }
      for (const t of cex) { await fade(c, t, 350); await c.wait(200); }
      await fade(c, last, 600);
    })());
    c.note('Eşitliği çürütmek için tek bir karşı örnek yeter.<br>Doğrulamak için örnek yetmez: harfle genel yazım ya da alan modeli gerekir.<br>a·(b + c) ≠ a·b + c &nbsp;|&nbsp; a − (b + c) ≠ a − b + c &nbsp;|&nbsp; a ÷ (b + c) ≠ a÷b + a÷c', 'Kural: karşı örnek', 'kural-karsi-ornek');
  }

  /* ============ DERS TANIMI ============ */
  Ders.start({
    id: 'sayilar-04-islem-ozellikleri',
    kicker: '9. Sınıf · Sayılar',
    title: 'İşlem Özelliklerinin Cebirsel İfadesi',
    accent: '#3CC8E8',
    back: 'index.html',
    intro: {
      title: 'Kasiyer 7 × 98’i neden saniyede çözer?',
      hook: 'Hesap makinesi çıkmadan kasiyer “686” diyor. Hafızasında değil; <b>işlem özelliklerinde</b> saklı bir sır var. Değişme, birleşme ve dağılmayı canlı modellerle keşfedeceksin.',
      button: 'Derse başla ›',
    },
    goals: [
      'Toplama ve çarpmanın değişme ve birleşme özelliklerini harflerle yazarsın.',
      'Çıkarma ve bölmede bu özelliklerin olmadığını karşı örnekle gösterirsin.',
      'a·(b + c) = a·b + a·c ve a·(b − c) = a·b − a·c kuralını alan modeliyle açıklarsın.',
      '(a + b)(c + d) çarpımını dört terimli açarsın.',
      'Etkisiz ve ters elemanı bulursun (0’ın çarpma tersi yoktur).',
      'Zihinden çarpmada özellik seçer, yanlış eşitliği tek karşı örnekle çürütürsün.',
    ],
    scenes: [
      { title: 'Hesap Makinesiz Kasiyer', goal: 'Merak: kasiyer 7 × 98’i nasıl bu kadar hızlı hesapladı?', run: s1 },
      { title: 'Sırrın Alan Modeli: 7 × 98', goal: 'Çarpmanın çıkarmaya dağılmasını “fazlayı kes” ile gör.', run: s2 },
      { title: 'Değişme: Önce Örnek, Sonra Harf', goal: 'a + b = b + a ve a · b = b · a; örnekler ipucu, harf genel yazım.', run: s3 },
      { title: 'Çıkarma ve Bölmede Değişme Yok', goal: 'Tek bir karşı örnek bir kuralı çürütür.', run: s4 },
      { title: 'Birleşme: Parantez Kayarken Toplam Değişmez', goal: '(a + b) + c = a + (b + c) ve çarpmada aynısı.', run: s5 },
      { title: 'Çıkarma ve Bölmede Birleşme de Yok', goal: 'Aynı parantez kaymasının çıkarmada sonucu bozduğunu gör.', run: s6 },
      { title: 'Dağılma: a · (b + c)', goal: 'Dışarıdaki çarpan, parantezdeki herkesle çarpılır; alan modeliyle gör.', run: s7 },
      { title: 'Dağılma Çıkarmayla ve Eksinin Dağılması', goal: 'a·(b − c) = a·b − a·c; eksi işareti herkese etki eder.', run: s8 },
      { title: '(a + b)(c + d): Dört Parça', goal: 'Her terim, diğer parantezdeki her terimle çarpılır: 2 × 2 = 4 parça.', run: s9 },
      { title: 'Etkisiz ve Ters Eleman', goal: 'Toplamada 0, çarpmada 1 etkisizdir; ters elemanlar başa döndürür.', run: s10 },
      { title: 'Hile Ustası Modu', goal: 'Doğru özelliği seçerek zihinden hızlı çarpma.', run: s11 },
      { title: 'Doğru mu, Yanlış mı? Karşı Örnekle Çürütme', goal: 'Örnek kanıtlamaz; tek karşı örnek çürütür.', run: s12 },
    ],
    quiz: [
      {
        q: '8 · (50 + 3) işleminin sonucu kaçtır?',
        options: ['403', '424', '74', '61'], answer: 1, scene: 6,
        why: [
          '8 yalnızca 50 ile çarpıldı (8·50 + 3). Dışarıdaki 8, 3 ile de çarpılmalı.',
          '8·50 + 8·3 = 400 + 24 = 424.',
          '8 yalnızca 3 ile çarpıldı (50 + 8·3). 50 de 8 ile çarpılmalı.',
          'Çarpma toplama gibi yapıldı (8 + 50 + 3). Dağılmada dışarıdaki, parantezdeki herkesle çarpılır.',
        ],
      },
      {
        q: '12 · 99’u zihinden hesaplamak için en uygun ayrıştırma ve sonuç hangisidir?',
        options: ['12 · (100 − 1) = 1200 − 12 = 1188', '12 · 100 − 1 = 1199', '12 · (100 + 1) = 1212', '12 · (90 + 9) = 12·90 + 9 = 1089'], answer: 0, scene: 1,
        why: [
          'Dağılma çıkarma üzerinden: 12·100 − 12·1 = 1188.',
          'Çıkarılan terim (1) 12 ile çarpılmadı. Doğrusu 1200 − 12 = 1188.',
          '99 = 100 − 1 iken artı yazıldı. İşaret hatası.',
          'Yalnızca ilk terimle çarpıldı. Doğrusu 12·90 + 12·9 = 1080 + 108 = 1188.',
        ],
      },
      {
        q: 'Aşağıdakilerden hangisi a ve b’nin her değeri için doğrudur?',
        options: ['a − b = b − a', 'a ÷ b = b ÷ a', 'a + b = b + a', '(a − b) − c = a − (b − c)'], answer: 2, scene: 3,
        why: [
          'Çıkarmada değişme yok: 5 − 3 = 2 ama 3 − 5 = −2.',
          'Bölmede değişme yok: 6 ÷ 3 = 2 ama 3 ÷ 6 = 0,5.',
          'Toplamada değişme özelliği vardır.',
          'Çıkarmada birleşme yok: (10 − 5) − 2 = 3 ama 10 − (5 − 2) = 7.',
        ],
      },
      {
        q: 'Ayşe, a · (b + c) = a·b + c eşitliğini a = 1, b = 5, c = 7 ile denedi: 1·12 = 12 ve 5 + 7 = 12 çıktı. Hangisi doğrudur?',
        options: ['Eşitlik kanıtlandı.', 'Eşitlik her zaman doğru değildir; a = 2, b = 3, c = 4 için 14 ≠ 10 olduğundan çürütülür.', 'Bir örnekte tuttuğuna göre çoğu durumda doğrudur.', 'Çürütmek için tüm sayıları tek tek denemek gerekir.'], answer: 1, scene: 11,
        why: [
          'Tek örnek kanıt değildir; a = 1 özel bir durumdur.',
          'Tek bir karşı örnek eşitliği çürütmeye yeter.',
          'Tutan örnek kuralı doğrulamaz; a = 1 gibi özel sayılar yanıltır.',
          'Çürütmek için tüm sayıları denemek gerekmez; tek karşı örnek yeter.',
        ],
      },
      {
        q: 'a − (b + c) ifadesinin açılımı hangisidir? (Kontrol: a = 10, b = 3, c = 2 için sonuç 5 olmalı.)',
        options: ['a − b + c', 'a − b − c', 'a + b + c', 'a − bc'], answer: 1, scene: 7,
        why: [
          'Eksi işareti yalnızca b’ye uygulandı: 10 − 3 + 2 = 9 bulunur.',
          '10 − 3 − 2 = 5. Eksi, parantezdeki herkese etki eder.',
          'İşaret yok sayıldı, parantez sadece kaldırıldı: 10 + 3 + 2 = 15 bulunur.',
          'Eksi işareti çarpma sanıldı: 10 − 6 = 4 bulunur.',
        ],
      },
    ],
    summary: [
      '<b>Toplama ve çarpmada</b> değişme ve birleşme vardır: a + b = b + a, a·b = b·a, (a + b) + c = a + (b + c), (a·b)·c = a·(b·c). <b>Çıkarma ve bölmede yoktur</b>; tek karşı örnek yeter (5 − 3 ≠ 3 − 5, (10 − 5) − 2 ≠ 10 − (5 − 2)).',
      '<b>Dağılma:</b> a·(b ± c) = a·b ± a·c ve (a + b)(c + d) = ac + ad + bc + bd. Dışarıdaki, parantezdeki herkesle çarpılır. Alan modeli bunun nedenini gösterir.',
      '<b>Kasiyerin sırrı</b> sihir değil işlem özelliğidir: 7·98 = 7·(100 − 2) = 686. Örnek bir kuralı kanıtlamaz; harf ya da alan modeli kanıtlar, karşı örnek çürütür.',
    ],
  });
})();
