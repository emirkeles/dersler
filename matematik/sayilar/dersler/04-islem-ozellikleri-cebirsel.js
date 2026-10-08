/* Bölüm D – İşlem özellikleri ve cebir: D4 değişme ve birleşme, D5 dağılma, D6 birim, ters, yutan.
   D1–D3, D7 ve D8 kendi dosyalarında durur ve bu dosyanın çizim araçlarını (KIT) kullanır.
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
  /* Okunacak metin: ekran yazısı kelimeye çevrilir (rakam, simge, ek). Kendi okunuşu olan satır { speak } ile verilir.
     Oyunculuk yönergesi { ton: 'curious' | 'thoughtful' } ile, cümle içi duraklama metinde [short pause] ile eklenir. */
  const BIR = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
  const ON = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
  function sayiKelime(n) {
    if (n === 0) return BIR[0];
    const ucluk = (k) => {
      const y = Math.floor(k / 100), o = Math.floor((k % 100) / 10), b = k % 10;
      return [y ? (y === 1 ? '' : BIR[y] + ' ') + 'yüz' : '', ON[o], b ? BIR[b] : ''].filter(Boolean).join(' ');
    };
    const bin = Math.floor(n / 1000), kalan = n % 1000;
    return [bin ? (bin === 1 ? '' : ucluk(bin) + ' ') + 'bin' : '', kalan ? ucluk(kalan) : ''].filter(Boolean).join(' ');
  }
  function ekle(kelime, ek) { // "dört" + "ü" -> "dördü"
    return (/t$/.test(kelime) && /^[aeıioöuü]/.test(ek) ? kelime.slice(0, -1) + 'd' : kelime) + ek;
  }
  function spk(html) {
    const d = document.createElement('div'); d.innerHTML = html;
    return (d.textContent || '')
      .replace(/\b([A-ZÇĞİÖŞÜ])(\d+)[’'](?:da|te)ki/g, (m, h, n) => h + ' ' + sayiKelime(+n) + ' dersindeki')
      .replace(/(\d)([a-z]+)\b/g, (m, n, h) => n + ' ' + h.split('').join(' '))
      .replace(/ℕ[’'][a-zçğıöşü]+/g, 'doğal sayılarda').replace(/ℤ[’'][a-zçğıöşü]+/g, 'tam sayılarda').replace(/ℚ[’'][a-zçğıöşü]+/g, 'rasyonel sayılarda')
      .replace(/²[’']([a-zçğıöşü]+)/g, (m, ek) => ' kare' + ek).replace(/\bTL\b/g, 'lira')
      .replace(/(\d+)[’']([a-zçğıöşü]+)/g, (m, n, ek) => ekle(sayiKelime(+n), ek))
      .replace(/(\d+),(\d+)/g, (m, i, k) => i + ' virgül ' + k.split('').map((x) => BIR[x]).join(' '))
      .replace(/(\d+)\/(\d+)/g, '$1 bölü $2')
      .replace(/\d+/g, (n) => sayiKelime(+n))
      .replace(/\s*[×·]\s*/g, ' çarpı ').replace(/\s*÷\s*/g, ' bölü ').replace(/−/g, ' eksi ').replace(/\+/g, ' artı ')
      .replace(/≠/g, ' eşit değildir ').replace(/=/g, ' eşittir ').replace(/\(/g, ' parantez aç ').replace(/\)/g, ' parantez kapa ')
      .replace(/</g, ' küçüktür ').replace(/>/g, ' büyüktür ').replace(/≤/g, ' küçük eşittir ').replace(/≥/g, ' büyük eşittir ')
      .replace(/⇔/g, ' ancak ve ancak ').replace(/⇒/g, ' ise ').replace(/⊻/g, ' ya da ').replace(/∧/g, ' ve ').replace(/∨/g, ' veya ')
      .replace(/∀/g, 'her simgesi').replace(/∃/g, 'bazı simgesi').replace(/′/g, ' değili')
      .replace(/ℕ/g, 'doğal sayılar').replace(/ℤ/g, 'tam sayılar').replace(/ℚ/g, 'rasyonel sayılar').replace(/ℝ/g, 'gerçek sayılar')
      .replace(/²/g, ' kare ').replace(/³/g, ' küp ')
      .replace(/\s+([,.:;?!])/g, '$1').replace(/\s+/g, ' ').trim();
  }
  const say = (c, html, o) => c.say(html, Object.assign({ speak: (o && o.ton ? '[' + o.ton + '] ' : '') + (o && o.dur ? spk(html).replace(':', ': [short pause]') : spk(html)) }, o));

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
    const tt = T(gg, 668, 56, title || 'İfade', { size: 22, fill: MUTE, w: 600 });
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
    T(sign, 90, 54, 'Kasa 1', { anchor: 'middle', size: 24, fill: B, w: 800 });

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
    T(rec, 125, 30, 'Kasa fişi', { anchor: 'middle', size: 22, fill: '#6b6f86', w: 700 });
    T(rec, 125, 74, '7 × 98 = ?', { anchor: 'middle', size: 36, fill: '#1b2140', w: 800 });

    const pc = pill(svg, 166, 196, 104, 44, '0:00'); hide(pc.g);
    const pk = pill(svg, 736, 196, 104, 44, '0:00'); hide(pk.g);
    const bc = g(svg); bubble(bc, 36, 96, 108, 66, 96, 214, B); T(bc, 90, 144, '?!', { anchor: 'middle', size: 44, fill: B, w: 800 }); hide(bc);
    const bk = g(svg); bubble(bk, 770, 44, 190, 84, 896, 214, A); T(bk, 865, 106, '686', { anchor: 'middle', size: 54, fill: A, w: 800 }); hide(bk);
    const okc = g(svg, { transform: 'translate(240 238)' }); Ci(okc, 0, 0, 20, { fill: OK }); P(okc, 'M-9,0 L-3,7 L10,-8', { stroke: '#06101f', sw: 4 }); hide(okc);
    const okk = g(svg, { transform: 'translate(948 56)' }); Ci(okk, 0, 0, 20, { fill: OK }); P(okk, 'M-9,0 L-3,7 L10,-8', { stroke: '#06101f', sw: 4 }); hide(okk);

    await par(say(c, 'Tanesi <b>98 TL</b> olan <b>7 ürün</b> kasada.'), (async () => {
      for (let i = 0; i < 7; i++) { fire(popIn(c, boxes[i].g, boxes[i].cx, boxes[i].cy + 20, 520)); await c.wait(150); }
      await c.wait(500);
    })());

    await par(say(c, 'Hesap makinesinden önce kasiyer söylüyor: <b>686</b>.'), (async () => {
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
    const t1 = T(ov, 500, 292, 'Sihir mi?', { anchor: 'middle', size: 76, w: 800 }); hide(t1);
    const t2 = T(ov, 500, 372, 'Hayır. İşlem özelliği.', { anchor: 'middle', size: 46, fill: B, w: 800 }); hide(t2);
    await par(say(c, 'Ezberlemedi. Peki ne yaptı?', { ton:'curious' }), (async () => {
      await c.wait(900);
      await fade(c, ov, 800, 1, 0);
      t1.style.opacity = 1; await c.tween(700, (e) => aboutC(t1, 500, 270, 0.6 + 0.4 * e), ease.back);
      await c.wait(500); await fade(c, t2, 600);
    })());

    await c.choice({
      tag: 'Tahmin et', q: 'Kasiyer 7 × 98’i nasıl yaptı?',
      options: ['<b>A)</b> 98 × 7 sonucunu ezberlemiş.', '<b>B)</b> 98’i 100 − 2 gibi düşünüp parçalamış.', '<b>C)</b> Gizli bir hesap makinesi kullanmış.', '<b>D)</b> Tahmin edip şans eseri tutturmuş.'],
      answer: 1,
      hints: ['Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?', '', 'Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?', 'Yakın değil. İpucu: 98 hangi yuvarlak sayıya çok yakın?'],
      right: 'Evet: 98, 100’e çok yakın.',
    });
    await say(c, 'Kasiyerin sırrı: <b>98 = 100 − 2</b>.', { ms: 2200 });
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

    await par(say(c, '7 × 98: yüksekliği 7, genişliği 98 olan bir dikdörtgen.'), (async () => {
      await rectDraw(c, body, 1200);
      body.setAttribute('fill-opacity', 0);
      await par(c.tween(700, (e) => body.setAttribute('fill-opacity', 0.28 * e)), fade(c, rowLines, 700), fade(c, [lb, tb, brk, note], 700));
      const r1 = TS(pr, 668, 112, [['7', A], ' × ', ['98', B], ' = ?'], { size: 36, w: 800 });
      void r1; await c.wait(300);
    })());

    const r2 = TS(pr, 668, 188, [['7', A], ' × ', ['100', INK], ' = '], { size: 36, w: 800 });
    const r2v = SV('tspan', {}, r2); r2v.textContent = ''; r2v.style.fill = INK;
    await par(say(c, 'Genişliği 100 yap: <b>7 × 100 = 700</b>.'), (async () => {
      await c.tween(900, (e) => { strip.setAttribute('transform', `translate(${sx0} ${OY}) scale(${Math.max(0.001, e)} 1)`); }, ease.out);
      await fade(c, sLab, 400);
      await fade(c, tot, 500);
      await c.tween(700, (e) => { totT.textContent = String(Math.round(lerp(98, 100, e))); }, ease.inOut);
      await count(c, r2v, 0, 700, 1000);
    })());

    await say(c, 'Ama 2 birim fazla ekledik.', { ms: 2000 });
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
    await par(say(c, 'Fazlayı keseriz: <b>700 − 14 = 686</b>.', { dur:1 }), (async () => {
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
    await par(say(c, '7, hem 100 ile hem 2 ile çarpıldı.'), (async () => {
      for (const t of lines) { await fade(c, t, 500); await c.wait(300); }
      const tc = lines[2].textContent;
      const sevenA = lines[2].getStartPositionOfChar(tc.indexOf('7')), sevenB = lines[2].getStartPositionOfChar(tc.lastIndexOf('7'));
      const ar = P(pr, `M${sevenA.x + 8},${cy[2] + 14} Q${(sevenA.x + sevenB.x) / 2},${cy[2] + 58} ${sevenB.x + 8},${cy[2] + 14}`, { stroke: A, sw: 3.5 });
      P(pr, `M${sevenB.x + 2},${cy[2] + 26} L${sevenB.x + 8},${cy[2] + 12} L${sevenB.x + 18},${cy[2] + 22}`, { stroke: A, sw: 3.5 });
      const cap = g(pr); T(cap, 668, 486, '7, hem 100 ile', { size: 24, fill: A, w: 700 }); T(cap, 668, 518, 'hem 2 ile çarpılıyor', { size: 24, fill: A, w: 700 }); hide(cap);
      await drawIn(c, ar, 600); await fade(c, cap, 400);
    })());

    c.note('<span class="ca">7</span> × 98 = 7 × (<span class="cb">100</span> − <span class="cc">2</span>) = 700 − 14 = <b>686</b>', 'Kasiyerin yolu', 'kural-s2');

    /* yanlış yol */
    const wrong = TS(svg, OX, 478, [['700 ' + MIN + ' 2 = 698', BAD]], { size: 34, w: 800 }); hide(wrong);
    const cross = L(svg, OX - 6, 468, OX + 262, 468, '#fff', 3); hide(cross);
    const msg = T(svg, OX, 520, 'Şeridin 7 satırı da atılmalı: 7 × 2 = 14', { size: 26, fill: A, w: 800 }); hide(msg);
    await par(say(c, 'Sık hata: <b>700 − 2</b>. Şeridin 7 satırı da gider.', { ton:'thoughtful' }), (async () => {
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
    await par(say(c, 'Bloklar yer değiştirir; toplam uzunluk yine <b>8</b>.'), (async () => {
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

    await fade(c, gA, 500, 0);

    const gG = g(svg);
    const lab1 = T(gG, 330, 150, '4 satır × 6 sütun', { anchor: 'middle', size: 32, fill: MUTE, w: 700 });
    const grid = g(gG); const dots = [];
    for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) dots.push(Ci(grid, (k - 2.5) * 44, (r - 1.5) * 44, 16, { fill: 'url(#gB)', stroke: mix(B, 0.5), sw: 2 }));
    place(grid, 330, 300);
    const cnt = TS(gG, 330, 482, [['24', A], [' nokta', MUTE]], { anchor: 'middle', size: 48, w: 800 });
    hide(gG);
    await par(say(c, 'Çarpmada da öyle: 4 × 6 nokta dönünce 6 × 4 olur.'), (async () => {
      await fade(c, gG, 500); await c.wait(900);
      await c.tween(1300, (e) => place(grid, 330, 300, 1, 90 * e), ease.inOut);
      lab1.textContent = '6 satır × 4 sütun'; place(grid, 330, 300, 1, 90);
      TS(pr, 668, 352, [['4', A], ' · ', ['6', B], ' = 24 = ', ['6', B], ' · ', ['4', A]], { size: 32, w: 800 });
      await c.wait(900);
    })());
    await fade(c, gG, 500, 0);

    /* C: harfe geçiş */
    const gen = g(svg); hide(gen);
    TS(gen, 330, 190, [['a', A], ' + ', ['b', B], ' = ', ['b', B], ' + ', ['a', A]], { anchor: 'middle', size: 52, w: 800 });
    TS(gen, 330, 290, [['a', A], ' · ', ['b', B], ' = ', ['b', B], ' · ', ['a', A]], { anchor: 'middle', size: 52, w: 800 });
    const all = TS(gen, 330, 400, [['∀', OK], ['a', A], ', ', ['b', B], ' ∈ ℝ'], { anchor: 'middle', size: 42, w: 700 }); hide(all);
    await par(say(c, '<span class="ca">a</span> ve <span class="cb">b</span> herhangi iki sayı olsun: kural yine tutar.'), fade(c, gen, 600));
    await par(say(c, 'Önerme diliyle: <b>her</b> a ve b için doğru.'), fade(c, all, 600));
    await c.choice({
      tag: 'Tahmin et', q: '37 + 58 = 58 + 37 mi? Hesaplamadan karar ver.', options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Sıra değişince toplam değişmez.'],
      right: 'Doğru: a + b = b + a. Hesaplamaya gerek yok.',
    });
    c.note('<span class="ca">a</span> + <span class="cb">b</span> = <span class="cb">b</span> + <span class="ca">a</span><br><span class="ca">a</span> · <span class="cb">b</span> = <span class="cb">b</span> · <span class="ca">a</span><br>3 + 5 = 5 + 3', 'Değişme', 'kural-degisme');
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
    await par(say(c, 'Çıkarmada? <b>5 − 3</b> = 2, ama <b>3 − 5</b> = −2.', { ton: 'curious' }), (async () => {
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


    await say(c, 'Tek bir <b>karşı örnek</b>, kuralı çürütmeye yeter.', { ms: 2400 });
    c.note('Çıkarmada <b>değişme yok</b>:<br>5 − 3 = 2 &nbsp;ama&nbsp; 3 − 5 = −2', 'Çıkarmada değişme yok', 'kural-cikarma-degisme');

    const q10 = TS(scene, 60, 504, [['10 ' + MIN + ' 4 = 6', OK], '   ', ['4 ' + MIN + ' 10 = ' + MIN + '6', BAD]], { size: 30, w: 800 }); hide(q10);
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

    await par(say(c, 'Önce hangi ikisini toplarsan topla: <b>(2 + 3) + 4</b> = 9.'), (async () => {
      await fade(c, gT, 600); await c.wait(300); await fade(c, cap, 500);
      eq2(110, ['(', ['2', A], ' + ', ['3', B], ') + ', ['4', C]], ['5 + 4 = 9']);
      await c.wait(700);
    })());
    await par(say(c, 'Parantez kayar: <b>2 + (3 + 4)</b> = 9. Toplam değişmez.'), (async () => {
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
    await par(say(c, 'Çarpmada da öyle: kutuyu <b>katman katman</b> ya da <b>dilim dilim</b> say.'), (async () => {
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
    await par(say(c, 'Harfle: parantez kayar, sonuç değişmez.'), (async () => {
      await fade(c, gen, 600); place_hl(f1, idxL, idxR, 230, 0); await c.wait(500);
      await c.tween(1000, (e) => place_hl(f1, idxL, idxR, 230, e), ease.inOut); await c.wait(300);
      await c.tween(1000, (e) => place_hl(f2, idxL2, idxR2, 360, e), ease.inOut);
      await c.wait(400);
    })());


    await c.choice({
      tag: 'Tahmin et', q: 'Kasada 17 + 28 + 12. Hangi gruplama zihinden kolay?',
      options: ['(17 + 28) + 12', '17 + (28 + 12)'], answer: 1,
      hints: ['İkisi de 57 verir, ama 17 + 28 zahmetli. Yuvarlak sayı veren ikiliyi ara.', ''],
      right: '28 + 12 = 40, sonra 17 + 40 = 57.',
    });
    c.note('(<span class="ca">a</span> + <span class="cb">b</span>) + <span class="cc">c</span> = <span class="ca">a</span> + (<span class="cb">b</span> + <span class="cc">c</span>)<br>(<span class="ca">a</span> · <span class="cb">b</span>) · <span class="cc">c</span> = <span class="ca">a</span> · (<span class="cb">b</span> · <span class="cc">c</span>)<br>17 + (28 + 12) = 17 + 40', 'Birleşme', 'kural-birlesme');
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

    await par(say(c, 'Önce <b>(10 − 5) − 2</b>: 5 çıkar, sonra 2 çıkar.'), (async () => {
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
    await c.choice({
      tag: 'Tahmin et', q: 'Parantezi kaydıralım: 10 − (5 − 2). Kalan kaç olur?', options: ['3', '5', '7'], answer: 2,
      hints: ['Önce parantezin içi: 5 − 2 = 3. 10’dan yalnızca 3 çıkar.', 'Önce parantezin içi: 5 − 2 = 3. 10’dan yalnızca 3 çıkar.', ''],
      right: 'Evet: 10 − 3 = 7. Az önce 3 kalmıştı.',
    });

    await par(say(c, 'Parantez kayınca çubuktan yalnızca 3 birim çıkar: <b>kalan 7</b>.'), (async () => {
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

    await say(c, 'Parantezin yeri, neyin çıkarılacağını değiştirdi.', { ton:'thoughtful', ms: 2600 });
    c.note('Çıkarmada <b>birleşme yok</b>:<br>(10 − 5) − 2 = 3 &nbsp;ama&nbsp; 10 − (5 − 2) = 7', 'Çıkarmada birleşme yok', 'kural-cikarma-birlesme');
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
    await par(say(c, 'Yüksekliği 4, genişliği 3 + 5 olan bir dikdörtgen.'), (async () => {
      await fade(c, mg, 700); await par(fade(c, M.top, 500), fade(c, M.left, 500));
      TS(pr, 668, 112, [['4', A], ' · (', ['3', B], ' + ', ['5', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 152, [['= ', OK], '4 · 8 = 32'], { size: 32, w: 800 });
      await c.wait(900);
    })());
    const div = L(svg, OXm + 3 * UA, OYm - 6, OXm + 3 * UA, OYm - 6, INK, 3.5, '7 5');
    await par(say(c, 'Bütün ya da iki parça: alan yine <b>32</b>.'), (async () => {
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

    /* B: birkaç örnek */
    await fade(c, [mg, sumT, oneT], 400, 0);
    pr.innerHTML = '';

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
    await par(say(c, 'Harfle: dışarıdaki <span class="ca">a</span>, parantezdeki <b>herkesle</b> çarpılır.'), (async () => {
      mg.style.opacity = 0; await fade(c, mg, 500); await par(fade(c, M.top, 400), fade(c, M.left, 400), fade(c, M.lblL, 500), fade(c, M.lblR, 500));
      await fade(c, live, 500);
      M.arrowG.style.opacity = 1; M.arrows.forEach((q) => { q.path.style.opacity = 0; q.head.style.opacity = 0; });
      for (const q of M.arrows) { await drawIn(c, q.path, 500); q.head.style.opacity = 1; await c.wait(150); }
    })());

    px.title.textContent = '∀a, b, c ∈ ℝ'; px.title.setAttribute('letter-spacing', 0); px.title.style.fill = OK;
    await say(c, 'Her a, b ve c için doğru.', { ms: 2200 });

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

    c.note('<span class="ca">a</span> · (<span class="cb">b</span> + <span class="cc">c</span>) = <span class="ca">a</span>·<span class="cb">b</span> + <span class="ca">a</span>·<span class="cc">c</span><br>4 · (3 + 5) = 4 · 3 + 4 · 5', 'Dağılma', 'kural-dagilma');
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
    await par(say(c, 'Kasiyerin yaptığı: <b>fazla şeridi kes</b>. Örnek: 8 · (10 − 3).'), (async () => {
      await fade(c, mg, 700);
      TS(pr, 668, 112, [['8', A], ' · (', ['10', B], ' ' + MIN + ' ', ['3', C], ')'], { size: 34, w: 800 });
      await c.wait(900);
      TS(pr, 668, 168, [['= ', OK], ['8', A], '·', ['10', B], ' ' + MIN + ' ', ['8', A], '·', ['3', C]], { size: 32, w: 800 });
      await c.wait(600);
    })());
    await par(say(c, 'Bütün 80, şerit 24. Kesince <b>56</b> kalır.'), (async () => {
      const sx = M.OX + M.wB + M.wS / 2;
      sc.setAttribute('transform', `translate(${sx} ${M.OY - 54})`); await fade(c, sc, 250);
      await c.tween(400, (e) => sc.open(Math.sin(e * Math.PI * 2)), ease.linear); fire(fade(c, sc, 250, 0));
      M.frame.style.opacity = 1;
      await par(c.tween(800, (e) => { M.setDx(70 * e); setOp(M.tot, 1 - e); }, ease.inOut), fade(c, M.bodyG, 600));
      await par(fade(c, M.lbB, 500), fade(c, M.lbS, 500));
      TS(pr, 668, 224, [['= ', OK], '80 ' + MIN + ' 24 = ', ['56', OK]], { size: 32, w: 800 });
      await c.wait(700);
    })());
    await par(say(c, 'Harfle de aynı: kesilen şerit a · c kadar.'), (async () => {
      TS(pr, 668, 300, [['a', A], ' · (', ['b', B], ' ' + MIN + ' ', ['c', C], ')'], { size: 34, w: 800 });
      TS(pr, 668, 344, [['= ', OK], ['a', A], '·', ['b', B], ' ' + MIN + ' ', ['a', A], '·', ['c', C]], { size: 32, w: 800 });
      await c.wait(900);
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
    await par(say(c, 'İşaret tuzağı: <b>10 − (3 + 2)</b>. Parantezin içi birlikte çıkar.', { ton:'thoughtful' }), (async () => {
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
    await par(say(c, 'Eksi, parantezdeki <b>herkese</b> ulaşır: 10 − 3 − 2.'), (async () => {
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
    await par(say(c, 'Eksiyi yalnızca 3’e uygularsan 9 bulursun: <b>yanlış</b>.'), (async () => {
      const wc = barCells(wrongG, X0, 440, 9, U, A, 44);
      for (let i = 7; i < 9; i++) paintCell(wc[i], BAD, true);
      T(wrongG, X0 + 9 * U + 20, 440 + 34, '9 ✗', { size: 34, fill: BAD, w: 800 });
      T(wrongG, X0, 430, '10 − 3 + 2', { size: 24, fill: BAD, w: 700 });
      await fade(c, wrongG, 500);
      const w = TS(pr, 668, 262, [['10 ' + MIN + ' 3 + 2 = 9', BAD]], { size: 32, w: 800 });
      L(pr, 664, 251, 664 + 270, 251, 'rgba(255,255,255,.75)', 2);
      await c.wait(900);
    })());



    /* tahmin: 100 − (60 + 25) */
    await fade(c, gb, 400, 0); pr.innerHTML = '';
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
      hints: ['Eksiyi 25’e uygulamadın: 100 − 60 + 25 oldu.', '', 'Parantezin içi 60 + 25 = 85. Hepsi çıkar.'],
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
    c.note('<span class="ca">a</span> · (<span class="cb">b</span> − <span class="cc">c</span>) = <span class="ca">a</span>·<span class="cb">b</span> − <span class="ca">a</span>·<span class="cc">c</span><br>a − (b + c) = a − b − c<br>100 − (60 + 25) = 15', 'Çıkarmayla dağılma', 'kural-dagilma-cikarma');
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
  ];
  async function s11(c) {
    const svg = base(c);
    const px = sidePanel(svg, 'Kasa'); const pr = px.rows;
    T(pr, 668, 100, 'Meydan okuma', { size: 22, fill: MUTE, w: 600 });
    const chT = T(pr, 668, 140, '1 / 2', { size: 34, w: 800 });
    T(pr, 668, 280, 'Adım sayacı', { size: 22, fill: MUTE, w: 600 });
    const stepN = T(pr, 668, 340, '0', { size: 58, fill: A, w: 800 });
    const resT = T(pr, 668, 396, '', { size: 34, w: 800 });
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
    T(fis, 60, 54, 'Kasa fişi', { size: 22, fill: '#6b6f86', w: 700 });
    const fisT = T(fis, 60, 98, '25 × 36 = ?', { size: 40, fill: '#1b2140', w: 800 });
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
      chT.textContent = (ci + 1) + ' / 2'; stepsG.innerHTML = ''; resT.textContent = ''; stepN.textContent = '0'; fire(fade(c, idle, 300, 1));
      setParts(fisT, [ch.q[0] + ' × ' + ch.q[1] + ' = ?']);
      if (ci === 0) await say(c, 'Kasiyerin yerine geç: sayıyı nasıl ayıracağını sen seç.', { ms: 3200 });
      else await say(c, `Sıradaki: <b>${ch.q[0]} × ${ch.q[1]}</b>. En kısa doğru yolu seç.`, { ms: 2600 });
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
      const msg = gotStars === 3 ? ch.star3 : gotStars === 2 ? 'Sonuç doğru. Daha kısa bir yol da var.' : 'Doğru yol oynatıldı.';
      c.feedback(fb, gotStars >= 2 ? 'ok' : 'info', msg);
      if (gotStars === 2) {
        const hintB = h('button', { class: 'tool', style: { marginTop: '8px' }, onclick: () => { hintB.disabled = true; c.feedback(fb, 'info', ch.fast); } }, 'İpucu: daha kısa yol?');
        panel.appendChild(hintB);
      }
      await new Promise((res) => panel.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, ci < CHALLENGES.length - 1 ? 'Sonraki meydan okuma ›' : 'Devam ›')));
      panel.remove();
    }


    /* kasiyer geri döner */
    await par(fade(c, pr, 400, 0), fade(c, stepsG, 400, 0));
    const fg = figure(cashG, 820, 520, 1.0, '#2f7f9c', A);
    const bub = bubble(cashG, 690, 270, 260, 90, 820, 400, A); T(cashG, 820, 332, '99 × 13 = 1287', { anchor: 'middle', size: 32, fill: A, w: 800 });
    T(cashG, 820, 252, 'Sıradaki müşteri hazır!', { anchor: 'middle', size: 24, fill: MUTE, w: 700 });
    await par(say(c, 'Doğru özelliği seçersen hesap saniyede biter.', { ms: 3000 }), fade(c, cashG, 700));
    c.note('25 · 36 = (25 · 4) · 9 = 900<br>99 · 13 = 13 · (100 − 1) = 1287', 'Kasiyerin araçları', 'kural-hile-ustasi');
  }

  /* ============ D4 – Sıra sende: 4 · 17 · 25 ve iki önerme ============ */
  async function d4Sira(c) {
    const svg = base(c);
    const gk = g(svg);
    const head = T(gk, 500, 96, '4 · 17 · 25 = ?', { anchor: 'middle', size: 44, w: 800 });
    const W = 150, H = 84, Y = 190, xs = [215, 425, 635];
    const bl = [block(gk, W, H, 'A', '4', A), block(gk, W, H, 'B', '17', B), block(gk, W, H, 'C', '25', C)];
    bl.forEach((b, k) => { place(b.g, xs[k], Y); b.t.setAttribute('font-size', 40); b.t.setAttribute('y', H / 2 + 14); });
    const dots = [T(gk, 395, Y + 56, '·', { anchor: 'middle', size: 50, w: 800 }), T(gk, 605, Y + 56, '·', { anchor: 'middle', size: 50, w: 800 })];
    const cap = R(gk, xs[0] - 14, Y - 14, 2 * W + 60 + 28, H + 28, { rx: 26, fill: '#fff', fo: 0.08, stroke: '#fff', sw: 3 }); hide(cap);
    const yuz = T(gk, xs[0] + W + 30, Y + H + 62, '100', { anchor: 'middle', size: 40, fill: OK, w: 800 }); hide(yuz);
    const son = TS(gk, 500, 440, ['(', ['4', A], ' · ', ['25', C], ') · ', ['17', B], ' = 100 · 17 = ', ['1700', OK]], { anchor: 'middle', size: 38, w: 800 }); hide(son);
    hide(gk);
    await par(say(c, 'Kasiyer <b>4 · 17 · 25</b>’i zihinden çarpacak.'), fade(c, gk, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'Önce hangi ikisini çarparsın?', options: ['4 · 17', '17 · 25', '4 · 25'], answer: 2,
      hints: ['68 çıkar; sonra 68 · 25 zor. Yuvarlak sayı veren ikiliyi ara.', '425 çıkar; sonra 4 · 425 zor. Yuvarlak sayı veren ikiliyi ara.', ''],
      right: '4 · 25 = 100. Geriye 100 · 17 kalır.',
    });
    await par(say(c, 'Değişme 25’i öne aldı, birleşme 4 · 25’i grupladı.'), (async () => {
      await c.tween(1000, (e) => {
        place(bl[1].g, lerp(xs[1], xs[2], e), Y - Math.sin(e * Math.PI) * 70);
        place(bl[2].g, lerp(xs[2], xs[1], e), Y + Math.sin(e * Math.PI) * 70);
      }, ease.inOut);
      await fade(c, cap, 400); await fade(c, yuz, 400); await c.wait(300);
      head.textContent = '4 · 17 · 25 = 1700'; await fade(c, son, 500);
    })());
    await c.cont('Devam ›');

    /* iki önerme: doğru mu, yanlış mı? */
    await fade(c, gk, 400, 0);
    const go = g(svg);
    const stT = TS(go, 500, 230, [''], { anchor: 'middle', size: 44, w: 700 });
    const stR = T(go, 500, 330, '', { anchor: 'middle', size: 34, w: 800 });
    const damga = T(go, 500, 440, '', { anchor: 'middle', size: 40, w: 800 });
    const sor = async (parts, dogru, kanit, hint, right) => {
      setParts(stT, parts); stR.textContent = ''; damga.textContent = '';
      await c.choice({
        tag: 'Önerme', q: 'Bu önerme doğru mu, yanlış mı?', options: ['Doğru', 'Yanlış'], answer: dogru ? 0 : 1,
        hints: dogru ? ['', hint] : [hint, ''], right,
        onPick: (k, ok) => { if (ok) { stR.textContent = kanit; stR.style.fill = dogru ? OK : BAD; damga.textContent = dogru ? 'Doğru' : 'Yanlış'; damga.style.fill = dogru ? OK : BAD; } },
      });
    };
    await say(c, 'Şimdi iki önerme: doğru mu, yanlış mı?', { ms: 2200 });
    await sor([['∀', OK], ['a', A], ', ', ['b', B], ' ∈ ℤ,   ', ['a', A], ' ' + MIN + ' ', ['b', B], ' = ', ['b', B], ' ' + MIN + ' ', ['a', A]], false,
      '5 ' + MIN + ' 3 = 2,   3 ' + MIN + ' 5 = ' + MIN + '2', '“Her” diyor: tek karşı örnek yeter. 5 − 3 ile 3 − 5’i dene.', 'Tek karşı örnek yetti: çıkarmada değişme yok.');
    await sor([['∀', OK], ['a', A], ', ', ['b', B], ' ∈ ℕ,   ', ['a', A], ' · ', ['b', B], ' = ', ['b', B], ' · ', ['a', A]], true,
      'Çarpmada değişme var.', 'Karşı örnek bulabilir misin? 4 satır × 6 sütun noktayı hatırla.', 'Doğru: çarpmada değişme her sayı kümesinde var.');
  }

  /* ============ D6 – Birim, ters, yutan ============ */
  const satir = (pr, y, parts, sz = 30) => { const t = TS(pr, 668, y, parts, { size: sz, w: 800 }); t.style.opacity = 0; fitText(t, 300); return t; };
  async function d6Birim(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const R1 = satir(pr, 112, [['a', A], ' + ', ['0', OK], ' = ', ['a', A]], 36);
    const R2 = satir(pr, 172, [['a', A], ' · ', ['1', OK], ' = ', ['a', A]], 36);
    const g1 = g(svg); hide(g1);
    const U = 24, bx = 90, by = 130;
    R(g1, bx, by, 10 * U, 58, { rx: 10, fill: 'url(#gA)', stroke: mix(A, 0.5), sw: 2.5 });
    T(g1, bx + 5 * U, by + 40, 'a', { anchor: 'middle', size: 38, fill: '#0b1230', w: 800 });
    const br1 = g(g1); brH(br1, bx, bx + 10 * U, by + 74, A, false, 4); T(br1, bx + 5 * U, by + 118, 'uzunluk: a', { anchor: 'middle', size: 26, fill: A, w: 800 });
    const zero = g(g1); R(zero, 0, 0, 64, 58, { rx: 12, fill: OK, fo: 0.15, stroke: OK, sw: 3, dash: '7 5' }); T(zero, 32, 41, '0', { anchor: 'middle', size: 38, fill: OK, w: 800 });
    place(zero, 440, by); hide(zero);
    const lab1 = T(g1, bx + 10 * U + 20, by + 40, '', { size: 26, fill: OK, w: 800 });
    const m1y = 400;
    const cl = [];
    for (let i = 0; i < 10; i++) { const r = R(g1, bx + i * U, m1y, U - 2, U - 2, { rx: 5, fill: A, fo: 0.9 }); r.style.opacity = 0; cl.push(r); }
    const brA = g(g1); brH(brA, bx, bx + 10 * U, m1y - 12, A, true, 4); T(brA, bx + 5 * U, m1y - 30, 'a', { anchor: 'middle', size: 32, fill: A, w: 800 }); hide(brA);
    const brOne = g(g1); brV(brOne, bx - 14, m1y, m1y + U - 2, OK, true, 4); T(brOne, bx - 34, m1y + U / 2 + 10, '1', { anchor: 'end', size: 32, fill: OK, w: 800 }); hide(brOne);
    const cnt1 = T(g1, bx + 10 * U + 20, m1y + 22, '', { size: 26, fill: A, w: 800 });
    await par(say(c, 'Bazı sayılar hiçbir şeyi değiştirmez. Toplamada bu sayı <b>0</b>.'), (async () => {
      await fade(c, g1, 500); await fade(c, zero, 400);
      await c.tween(900, (e) => place(zero, lerp(440, bx + 10 * U + 10, e), by), ease.inOut);
      await c.tween(500, (e) => { aboutC(zero, bx + 10 * U + 10, by + 29, Math.max(0.02, 1 - e), 1); }, ease.in); zero.style.opacity = 0;
      lab1.textContent = '+ 0: uzunluk hâlâ a'; await fade(c, R1, 500);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Hesap makinesinde 5 var. “×” tuşundan sonra hangisine basarsan ekran değişmez?', options: ['0', '1', '5'], answer: 1,
      hints: ['5 × 0 = 0: ekran değişir.', '', '5 × 5 = 25: ekran değişir.'],
      right: '5 × 1 = 5.',
    });
    await par(say(c, 'Çarpmada bu sayı <b>1</b>: a · 1 = a.'), (async () => {
      await fade(c, brA, 400); await fade(c, brOne, 400);
      for (const r of cl) { r.style.opacity = 1; await c.wait(70); }
      cnt1.textContent = '1 satır: a hücre'; await fade(c, R2, 500);
      await c.wait(600);
    })());
    c.note('Birim (etkisiz) eleman:<br><span class="ca">a</span> + 0 = <span class="ca">a</span> &nbsp;ve&nbsp; <span class="ca">a</span> · 1 = <span class="ca">a</span>', 'Birim eleman', 'kural-birim');
  }

  async function d6Ters(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const R3 = satir(pr, 112, ['5 + (' + MIN + '5) = ', ['0', OK]]);
    const R4 = satir(pr, 156, [['a', A], ' + (' + MIN, ['a', A], ') = ', ['0', OK]]);
    const R5 = satir(pr, 224, ['4 · ', ['1/4', B], ' = ', ['1', OK]]);
    const R6 = satir(pr, 268, [['a', A], ' · ', ['1/a', B], ' = ', ['1', OK], '  (a ≠ 0)']);
    const R7 = satir(pr, 344, [['∀', OK], ['a', A], ' ≠ 0,  ', ['∃', OK], ['b', B], ':  ', ['a', A], ' · ', ['b', B], ' = 1'], 28);
    const R8 = satir(pr, 440, ['a ' + MIN + ' b = a + (' + MIN + 'b)'], 26);
    const R9 = satir(pr, 484, ['a ÷ b = a · (1/b)'], 26);
    const g2 = g(svg); hide(g2);
    const NX = (v) => 330 + v * 46, NY = 280;
    L(g2, NX(-6) - 16, NY, NX(6) + 16, NY, '#6d7bb8', 3);
    for (let v = -6; v <= 6; v++) { L(g2, NX(v), NY - (v === 0 ? 12 : 8), NX(v), NY + (v === 0 ? 12 : 8), v === 0 ? INK : '#6d7bb8', v === 0 ? 4 : 2.5); T(g2, NX(v), NY + 42, v < 0 ? MIN + String(-v) : String(v), { anchor: 'middle', size: 22, fill: v === 0 ? INK : MUTE, w: v === 0 ? 800 : 500 }); }
    const dot = Ci(g2, NX(0), NY, 13, { fill: A, stroke: '#fff', sw: 3 });
    const j1 = arcJump(g2, NX(0), NX(5), NY - 16, 62, A, '+5');
    const j2 = arcJump(g2, NX(5), NX(0), NY - 16, 110, B, MIN + '5');
    await par(say(c, '<b>Ters eleman</b> işlemi geri alır: 5 + (−5) = 0.'), (async () => {
      await fade(c, g2, 500); await c.wait(300);
      await drawIn(c, j1.path, 800); await par(fade(c, j1.head, 150), fade(c, j1.lab, 250));
      await c.tween(500, (e) => dot.setAttribute('cx', lerp(NX(0), NX(5), e)), ease.inOut);
      await c.wait(400);
      await drawIn(c, j2.path, 1100); await par(fade(c, j2.head, 150), fade(c, j2.lab, 250));
      await c.tween(600, (e) => dot.setAttribute('cx', lerp(NX(5), NX(0), e)), ease.inOut);
      dot.setAttribute('fill', OK);
      await fade(c, R3, 500); await c.wait(300); await fade(c, R4, 500);
      await c.wait(500);
    })());
    await fade(c, g2, 400, 0);
    const g3 = g(svg); hide(g3);
    const QX = 100, QW = 400, QY = 170, QH = 70;
    R(g3, QX, QY, QW, QH, { rx: 12, fill: 'url(#gB)', fo: 0.3, stroke: B, sw: 3 });
    T(g3, QX + QW / 2, QY - 16, '1 bütün', { anchor: 'middle', size: 28, fill: B, w: 800 });
    const parts = [];
    for (let i = 0; i < 4; i++) {
      const pg = g(g3); R(pg, 0, 0, QW / 4 - 4, QH, { rx: 10, fill: 'url(#gB)', stroke: mix(B, 0.5), sw: 2.5 }); T(pg, QW / 8 - 2, QH / 2 + 10, '1/4', { anchor: 'middle', size: 30, fill: '#0b1230', w: 800 });
      place(pg, QX + i * (QW / 4) + 2, QY); parts.push(pg);
    }
    const ghost = g(g3); R(ghost, QX, 340, QW, QH, { rx: 12, stroke: '#6d7bb8', sw: 2.5, dash: '8 6' }); hide(ghost);
    const cnt4 = T(g3, QX + QW / 2, 480, '', { anchor: 'middle', size: 40, fill: OK, w: 800 });
    await par(say(c, 'Çarpmada: <b>4 · 1/4 = 1</b>. Dört çeyrek bir bütün eder.'), (async () => {
      await fade(c, g3, 500); await c.wait(400);
      await fade(c, ghost, 400);
      for (let i = 0; i < 4; i++) {
        const sx = QX + i * (QW / 4) + 2;
        await c.tween(650, (e) => place(parts[i], sx, lerp(QY, 340, e) - Math.sin(e * Math.PI) * 30), ease.inOut);
        cnt4.textContent = (i + 1) + ' · 1/4 = ' + (i + 1) + '/4'; await c.wait(150);
      }
      cnt4.textContent = '4 · 1/4 = 1';
      await fade(c, R5, 500); await c.wait(300); await fade(c, R6, 500);
    })());
    await par(say(c, 'Sıfır dışında <b>her</b> sayının çarpmaya göre tersi vardır.'), fade(c, R7, 600));
    await par(say(c, 'Çıkarma, tersiyle toplamaktır; bölme, tersiyle çarpmaktır.'), (async () => { await fade(c, R8, 500); await fade(c, R9, 500); })());
    c.note('Ters eleman:<br><span class="ca">a</span> + (−<span class="ca">a</span>) = 0 &nbsp;ve&nbsp; <span class="ca">a</span> · <span class="cb">1/a</span> = 1 &nbsp;(a ≠ 0)', 'Ters eleman', 'kural-ters');
  }

  async function d6Yutan(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const R1 = satir(pr, 112, [['∀', OK], ['a', A], ' ∈ ℝ,  ', ['a', A], ' · 0 = ', ['0', OK]], 30);
    const R2 = satir(pr, 190, [['0 · ? = 1', BAD], '  olmaz'], 30);
    const R3 = satir(pr, 240, ['1/0 tanımsız'], 26);
    const gA_ = g(svg);
    const rows = [['7', 150], ['123', 250], ['(' + MIN + '4)', 350]].map(([v, y]) => {
      const gg = g(gA_);
      const sol = T(gg, 130, y, v + ' · 0', { size: 50, w: 800 }); sol.style.fill = A;
      const es = T(gg, 370, y, '=', { size: 50, w: 800 });
      const sif = T(gg, 430, y, '0', { size: 56, fill: OK, w: 800 });
      hide(gg, es, sif); return { gg, es, sif };
    });
    await par(say(c, 'Neyle çarparsan çarp, sonuç <b>0</b>.'), (async () => {
      for (const r of rows) { await fade(c, r.gg, 400); await c.wait(250); r.es.style.opacity = 1; await popIn(c, r.sif, 446, +r.sif.getAttribute('y') - 18, 400); await c.wait(250); }
      await fade(c, R1, 500);
    })());
    await say(c, '0, çarpmanın <b>yutan elemanıdır</b>.', { ms: 2400 });
    await c.choice({
      tag: 'Tahmin et', q: 'Geri almayı dene: 0 · ? = 1. Hangi sayı işe yarar?', options: ['1', '0', 'Hiçbiri'], answer: 2,
      hints: ['0 · 1 = 0. 1 çıkmadı.', '0 · 0 = 0. 1 çıkmadı.', ''],
      right: '0 ile çarpınca hep 0 çıkar; 1 olamaz.',
    });
    await fade(c, gA_, 400, 0);
    const g4 = g(svg); hide(g4);
    const bxx = g(g4); R(bxx, 120, 180, 380, 120, { rx: 20, fill: '#10193d', stroke: BAD, sw: 3 });
    T(bxx, 160, 258, '0 ·', { size: 56, w: 800 });
    const qm = T(bxx, 280, 258, '?', { size: 64, fill: BAD, w: 800 });
    T(bxx, 350, 258, '= 1', { size: 56, w: 800 });
    const tryT = T(g4, 310, 370, '', { anchor: 'middle', size: 34, w: 800 });
    await par(say(c, '0’ın çarpmaya göre <b>tersi yoktur</b>.'), (async () => {
      await fade(c, g4, 500);
      for (const v of ['3', '17', '0,5']) {
        qm.textContent = v; await shake(c, bxx, 400);
        tryT.textContent = '0 · ' + v + ' = 0'; tryT.style.fill = BAD; await c.wait(500);
      }
      qm.textContent = '?'; await fade(c, R2, 500); await fade(c, R3, 500);
    })());
    await say(c, 'Toplamada yutan eleman yoktur.', { ms: 2200 });
    c.note('Yutan eleman: <span class="ca">a</span> · 0 = 0<br>0’ın çarpmaya göre tersi yoktur.', 'Yutan eleman', 'kural-yutan');
  }

  async function d6Kutu(c) {
    const svg = base(c);
    const px = sidePanel(svg, 'Hangi kümede var?'); const pr = px.rows;
    const kg = g(svg); hide(kg);
    const KQ = '#6c8cf0', KZ = OK, KN = A;
    R(kg, 40, 70, 580, 440, { rx: 26, fill: KQ, fo: 0.07, stroke: KQ, sw: 3 }); T(kg, 64, 110, 'ℚ', { size: 34, fill: KQ, w: 800 });
    R(kg, 120, 140, 420, 300, { rx: 22, fill: KZ, fo: 0.07, stroke: KZ, sw: 3 }); T(kg, 144, 180, 'ℤ', { size: 34, fill: KZ, w: 800 });
    R(kg, 200, 210, 260, 160, { rx: 18, fill: KN, fo: 0.09, stroke: KN, sw: 3 }); T(kg, 224, 250, 'ℕ', { size: 34, fill: KN, w: 800 });
    const tok = (str, x, y, col) => { const gg = g(svg); R(gg, -44, -30, 88, 60, { rx: 14, fill: '#10193d', stroke: col, sw: 3 }); T(gg, 0, 12, str, { anchor: 'middle', size: 32, fill: col, w: 800 }); place(gg, x, y); hide(gg); return gg; };
    const t3 = tok('3', 290, 310, KN), t2 = tok('2', 380, 310, KN);
    const tm3 = tok(MIN + '3', 290, 310, KZ), th = tok('1/2', 380, 310, KQ);
    const t0 = tok('0', 290, 310, OK), t1 = tok('1', 380, 310, OK);
    await par(say(c, 'Bu özellikler her sayı kümesinde var mı?', { ton:'curious' }), (async () => { await fade(c, kg, 600); await par(fade(c, t3, 400), fade(c, t2, 400)); })());
    await c.choice({
      tag: 'Tahmin et', q: '3’ün toplamaya göre tersi −3. İlk kez hangi kümede var?', options: ['ℕ', 'ℤ', 'ℚ'], answer: 1,
      hints: ['ℕ = {0, 1, 2, …}: negatif sayı yok.', '', 'Daha küçük bir kümede de var: −3 bir tam sayı.'],
      right: '−3 ∉ ℕ, −3 ∈ ℤ.',
    });
    await par(say(c, 'ℕ’de 3’ün toplamaya göre tersi yok; ℤ’de var.'), (async () => {
      tm3.style.opacity = 1; await c.tween(900, (e) => place(tm3, lerp(290, 190, e), lerp(310, 405, e) - Math.sin(e * Math.PI) * 40), ease.inOut);
      await fade(c, satir(pr, 112, ['3 + (' + MIN + '3) = 0']), 400);
      await fade(c, satir(pr, 156, [[MIN + '3 ∉ ℕ', BAD], '   ', [MIN + '3 ∈ ℤ', OK]], 28), 400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: '2’nin çarpmaya göre tersi 1/2. İlk kez hangi kümede var?', options: ['ℕ', 'ℤ', 'ℚ'], answer: 2,
      hints: ['1/2 bir doğal sayı değil.', '1/2 bir tam sayı değil.', ''],
      right: '1/2 ∉ ℤ, 1/2 ∈ ℚ.',
    });
    await par(say(c, 'ℤ’de 2’nin çarpmaya göre tersi yok; ℚ’da var.'), (async () => {
      th.style.opacity = 1; await c.tween(900, (e) => place(th, lerp(380, 560, e), lerp(310, 475, e) - Math.sin(e * Math.PI) * 40), ease.inOut);
      await fade(c, satir(pr, 240, ['2 · 1/2 = 1']), 400);
      await fade(c, satir(pr, 284, [['1/2 ∉ ℤ', BAD], '   ', ['1/2 ∈ ℚ', OK]], 28), 400);
    })());
    await par(say(c, '0 ve 1 her kutuda: birim eleman hep var.'), (async () => {
      await par(fade(c, t3, 300, 0), fade(c, t2, 300, 0)); await par(fade(c, t0, 400), fade(c, t1, 400));
      await fade(c, satir(pr, 368, [['0 ∈ ℕ', OK], '   ', ['1 ∈ ℕ', OK]], 28), 400);
    })());
    c.note('Ters eleman her kümede yok:<br>−3 ∉ ℕ &nbsp;ve&nbsp; 1/2 ∉ ℤ', 'Hangi kümede var?', 'kural-kume-ters');
  }

  async function d6Sira(c) {
    const svg = base(c);
    const kart = g(svg);
    R(kart, 200, 170, 600, 180, { rx: 24, fill: '#10193d', stroke: '#33437f', sw: 2 });
    const esT = TS(kart, 500, 282, [''], { anchor: 'middle', size: 64, w: 800 });
    const alt = T(kart, 500, 430, '', { anchor: 'middle', size: 30, fill: OK, w: 700 });
    const sor = async (once, sonra, cevap, ad, o) => {
      setParts(esT, [once, ['?', A], sonra]); alt.textContent = '';
      await c.choice(Object.assign({ tag: 'Boşluğu doldur', q: once + '? ' + sonra.trim(), onPick: (k, ok) => { if (ok) { setParts(esT, [once, [cevap, OK], sonra]); alt.textContent = ad; } } }, o));
    };
    await say(c, 'Sıra sende: boşluğa hangi sayı gelir?', { ms: 2200 });
    await sor('5 + ', ' = 0', '(' + MIN + '5)', 'toplamaya göre ters', { options: ['−5', '0', '5'], answer: 0, hints: ['', '5 + 0 = 5. Sıfıra dönmek için ters yöne git.', '5 + 5 = 10. Sıfıra dönmek için ters yöne git.'], right: '5 + (−5) = 0.' });
    await sor('5 · ', ' = 1', '1/5', 'çarpmaya göre ters', { options: ['1/5', '5', '−5'], answer: 0, hints: ['', '5 · 5 = 25.', '5 · (−5) = −25.'], right: '5 · 1/5 = 1.' });
    await sor('', ' · 7 = 0', '0', 'yutan eleman', { options: ['1', '0', '1/7'], answer: 1, hints: ['1 · 7 = 7.', '', '1/7 · 7 = 1.'], right: '0 · 7 = 0.' });
    await sor('', ' + 7 = 7', '0', 'birim eleman', { options: ['0', '1', '7'], answer: 0, hints: ['', '1 + 7 = 8.', '7 + 7 = 14.'], right: '0 + 7 = 7.' });
  }

  /* tek kartlık soru tahtası: ifade büyük yazılır; doğru cevapta altına gerekçe ve damga gelir */
  function soruTahtasi(c, svg) {
    const gg = g(svg);
    R(gg, 110, 150, 780, 170, { rx: 24, fill: '#10193d', stroke: '#33437f', sw: 2 });
    const ifade = TS(gg, 500, 250, [''], { anchor: 'middle', size: 44, w: 700 });
    const alt = T(gg, 500, 392, '', { anchor: 'middle', size: 30, w: 700 });
    const damga = T(gg, 500, 462, '', { anchor: 'middle', size: 38, w: 800 });
    return {
      g: gg, ifade, alt,
      /* o: { tag, q, options, answer, hints, right, kanit, damga, renk, sonra } */
      sor(parts, o) {
        setParts(ifade, parts); fitText(ifade, 730); alt.textContent = ''; damga.textContent = '';
        return c.choice({
          tag: o.tag || 'Sıra sende', q: o.q, options: o.options, answer: o.answer, hints: o.hints, right: o.right,
          onPick: (k, ok) => {
            if (!ok) return;
            const col = o.renk || OK;
            if (o.sonra) { setParts(ifade, o.sonra); fitText(ifade, 730); }
            alt.textContent = o.kanit || ''; alt.style.fill = col; fitText(alt, 760);
            damga.textContent = o.damga || ''; damga.style.fill = col;
          },
        });
      },
    };
  }

  /* ============ KISA DERSLER ============ */
  /* Bölüm D kısa derslere ayrılır. Sayfa, hangi parçayı oynatacağını window.DERS_PARCA ile söyler.
     Yeni dersler (d1–d3, d7, d8) kendi dosyalarında durur: window.DERS_EK[anahtar] = (K) => ({ … }); K aşağıdaki KIT. */
  const KIT = {
    h, SV, lerp, clamp, ease, A, B, C, D, OK, BAD, INK, MUTE, MIN, num, mix, fire, par, say,
    g, T, TS, setParts, R, L, P, Ci, place, aboutC, setOp, hide, base, sidePanel, satir,
    fade, popIn, count, drawIn, rectDraw, shake, pulse, cells, brH, brV, fitText, block, drag, sliders, ask,
    arcJump, areaBuild, subBuild, barCells, figure, bubble, scissors, soruTahtasi,
  };
  const PARCALAR = {
    d4: {
      title: 'Değişme ve birleşme',
      hook: 'Kasada üç ürün var: 17, 28 ve 12 lira. Kasiyer <b>önce hangi ikisini</b> toplar?',
      scenes: [
        { title: 'Değişme', goal: 'a + b = b + a ve a · b = b · a; önce örnek, sonra harf.', run: s3 },
        { title: 'Çıkarmada değişme yok', goal: 'Tek karşı örnek kuralı çürütür: 5 − 3 ≠ 3 − 5.', run: s4 },
        { title: 'Birleşme', goal: 'Parantez kayar, toplam ve çarpım değişmez.', run: s5 },
        { title: 'Çıkarmada birleşme de yok', goal: 'Parantezin yeri, neyin çıkarılacağını değiştirir.', run: s6 },
        { title: 'Sıra sende: 4 · 17 · 25', goal: 'Değişme ve birleşmeyi zihinden hesapta kullan; iki önermeyi sına.', run: d4Sira },
      ],
      quiz: [
        {
          q: 'Hangisi <b>her</b> a ve b için doğrudur?',
          options: ['a − b = b − a', 'a + b = b + a', '(a − b) − c = a − (b − c)', 'a − b = b + a'], answer: 1,
          why: [
            'Çıkarmada değişme yok: 5 − 3 = 2 ama 3 − 5 = −2.',
            'Toplamada değişme vardır.',
            'Çıkarmada birleşme yok: (10 − 5) − 2 = 3 ama 10 − (5 − 2) = 7.',
            'a = 5, b = 3 için 2 ≠ 8.'],
          scene: 1,
        },
        {
          q: '<b>4 · 17 · 25</b> işlemini zihinden en kolay hangisi verir?',
          options: ['(4 · 17) · 25 = 68 · 25', '(4 · 25) · 17 = 100 · 17', '4 · (17 · 25) = 4 · 425'], answer: 1,
          why: [
            'Sonuç doğru çıkar ama 68 · 25 zihinden zor.',
            'Değişme 25’i öne alır, birleşme 4 · 25’i gruplar: 100 · 17 = 1700.',
            'Sonuç doğru çıkar ama 17 · 25 zihinden zor.'],
          scene: 4,
        },
        {
          q: 'Kasada 25, 38 ve 75 lira var. Toplamı zihinden <b>en kolay</b> hangisi verir?',
          options: ['(25 + 38) + 75 = 63 + 75', '25 + (38 + 75) = 25 + 113', '(25 + 75) + 38 = 100 + 38'], answer: 2,
          why: [
            'Sonuç doğru çıkar ama 63 + 75 zihinden zor.',
            'Sonuç doğru çıkar ama 38 + 75 zihinden zor.',
            'Değişme 75’i öne alır, birleşme 25 + 75’i gruplar: 100 + 38 = 138.'],
          scene: 4,
        },
        {
          q: '<b>(20 − 8) − 5</b> ve <b>20 − (8 − 5)</b> işlemlerinin sonuçları sırasıyla kaçtır?',
          options: ['7 ve 7', '17 ve 7', '7 ve 17', '12 ve 3'], answer: 2,
          why: [
            'İkinci işlemde parantezi yok saymışsın. 8 − 5 = 3 önce yapılır: 20 − 3 = 17.',
            'Sonuçlar ters yazılmış: (20 − 8) − 5 = 12 − 5 = 7.',
            '(20 − 8) − 5 = 7 ve 20 − (8 − 5) = 17. Çıkarmada birleşme yok.',
            'Yalnızca ilk adımları yazmışsın: 12 − 5 = 7 ve 20 − 3 = 17.'],
          scene: 3,
        },
      ],
      summary: [
        '<b>Toplama ve çarpmada var, çıkarmada yok.</b>',
        '<b>Değişme:</b> a + b = b + a, a · b = b · a. <b>Birleşme:</b> (a + b) + c = a + (b + c), (a · b) · c = a · (b · c).',
        'Çıkarmada ikisi de yok: 5 − 3 ≠ 3 − 5 ve (10 − 5) − 2 ≠ 10 − (5 − 2).',
      ],
      next: { href: 'd5-dagilma.html', label: 'Sonraki: Dağılma ›' },
    },
    d5: {
      title: 'Dağılma',
      hook: 'Tanesi 98 lira olan 7 ürün. Kasiyer hesap makinesinden önce <b>“686”</b> diyor. Nasıl?',
      scenes: [
        { title: 'Hesap makinesiz kasiyer', goal: 'Kasiyer 7 × 98’i nasıl bu kadar hızlı buldu?', run: s1 },
        { title: 'Fazlayı kes: 7 × 98', goal: '7 × 100’den 7 × 2’lik şeridi kes: 700 − 14.', run: s2 },
        { title: 'a · (b + c)', goal: 'Dışarıdaki çarpan, parantezdeki herkesle çarpılır.', run: s7 },
        { title: 'Çıkarmayla, ve eksi', goal: 'a · (b − c) = a · b − a · c; eksi de içerideki herkese ulaşır.', run: s8 },
        { title: 'Sıra sende: hile ustası', goal: 'Doğru özelliği seçerek zihinden çarp.', run: s11 },
      ],
      quiz: [
        {
          q: '<b>12 · 99</b>’u zihinden hangisi doğru verir?',
          options: ['12 · (100 − 1) = 1200 − 12 = 1188', '12 · 100 − 1 = 1199', '12 · (100 + 1) = 1212'], answer: 0,
          why: [
            '12, hem 100 ile hem 1 ile çarpılır: 1200 − 12.',
            'Çıkarılan 1 de 12 ile çarpılmalı: 1200 − 12 = 1188.',
            '99 = 100 − 1; artı değil eksi.'],
          scene: 1,
        },
        {
          q: '<b>a − (b + c)</b> açılımı hangisidir?',
          options: ['a − b + c', 'a − b − c', 'a + b + c'], answer: 1,
          why: [
            'Eksi yalnızca b’ye uygulandı: 10 − (3 + 2) = 5 ama 10 − 3 + 2 = 9.',
            'Eksi, parantezdeki herkese ulaşır: 10 − 3 − 2 = 5.',
            'Eksi yok sayıldı: 10 + 3 + 2 = 15.'],
          scene: 3,
        },
        {
          q: '<b>6 · 103</b>’ü zihinden hangisi doğru verir?',
          options: ['6 · 100 + 3 = 603', '6 · (100 − 3) = 582', '6 · (100 + 3) = 6 · 100 + 6 · 3 = 618'], answer: 2,
          why: [
            '3, 6 ile çarpılmadı. 6, hem 100 ile hem 3 ile çarpılır.',
            '103 = 100 + 3; eksi değil artı.',
            '6, parantezdeki herkesle çarpılır: 600 + 18 = 618.'],
          scene: 2,
        },
        {
          q: '<b>4 · (a − 6)</b> açılımı hangisidir?',
          options: ['4a − 24', '4a − 6', '4a + 24'], answer: 0,
          why: [
            '4, parantezdeki herkesle çarpılır: 4 · a − 4 · 6 = 4a − 24.',
            '4 yalnızca a ile çarpılmış; 6’ya ulaşmadı. 4 · (10 − 6) = 16 ama 40 − 6 = 34.',
            'Eksi artıya dönmez: 4 · (10 − 6) = 16 ama 40 + 24 = 64.'],
          scene: 3,
        },
      ],
      summary: [
        '<b>Dışarıdaki, içerideki herkesle çarpılır.</b>',
        'a · (b + c) = a · b + a · c ve a · (b − c) = a · b − a · c.',
        'Kasiyerin yolu: 7 · 98 = 7 · (100 − 2) = 700 − 14 = 686.',
      ],
      next: { href: 'd6-birim-ters-yutan.html', label: 'Sonraki: Birim, ters, yutan ›' },
    },
    d6: {
      title: 'Birim, ters, yutan',
      hook: 'Hesap makinesinde 5 var. “+” tuşundan sonra hangi sayıya basarsan <b>ekran değişmez</b>? Ya “×” tuşundan sonra?',
      scenes: [
        { title: 'Birim eleman', goal: 'Toplamada 0, çarpmada 1 sayıyı değiştirmez.', run: d6Birim },
        { title: 'Ters eleman', goal: 'Ters eleman işlemi geri alır: a + (−a) = 0, a · 1/a = 1.', run: d6Ters },
        { title: 'Yutan eleman', goal: 'a · 0 = 0; bu yüzden 0’ın çarpmaya göre tersi yoktur.', run: d6Yutan },
        { title: 'Hangi kutuda var?', goal: 'Ters eleman her sayı kümesinde bulunmaz.', run: d6Kutu },
        { title: 'Sıra sende: boşluğu doldur', goal: 'Birim, ters ve yutan elemanı kendin bul.', run: d6Sira },
      ],
      quiz: [
        {
          q: 'Hangi gerçek sayının <b>çarpmaya göre tersi yoktur</b>?',
          options: ['1', '0', '−1', '1/2'], answer: 1,
          why: [
            '1 · 1 = 1: 1’in tersi kendisidir.',
            '0 ile çarpınca hep 0 çıkar; 0 · ? = 1 olamaz.',
            '(−1) · (−1) = 1: −1’in tersi kendisidir.',
            '1/2 · 2 = 1: tersi 2’dir.'],
          scene: 2,
        },
        {
          q: '“Her tam sayının çarpmaya göre tersi yine bir tam sayıdır.” Bu önermeyi hangisi çürütür?',
          options: ['1', '−1', '2', 'Çürütülemez'], answer: 2,
          why: [
            '1’in tersi 1: tam sayı. Bu örnek önermeyi destekler, çürütmez.',
            '−1’in tersi −1: tam sayı. Bu örnek önermeyi destekler, çürütmez.',
            '2’nin tersi 1/2 ve 1/2 ∉ ℤ. Tek karşı örnek yeter.',
            'Bir karşı örnek var: 2’nin tersi 1/2 tam sayı değil.'],
          scene: 3,
        },
        {
          q: '−3/4 sayısının <b>çarpmaya göre tersi</b> hangisidir?',
          options: ['3/4', '4/3', '−3/4', '−4/3'], answer: 3,
          why: [
            'Bu, toplamaya göre ters: −3/4 + 3/4 = 0.',
            'İşaret unutulmuş: (−3/4) · (4/3) = −1, 1 değil.',
            'Sayının kendisi: (−3/4) · (−3/4) = 9/16, 1 değil.',
            '(−3/4) · (−4/3) = 12/12 = 1.'],
          scene: 1,
        },
        {
          q: '“0, çarpmanın birim (etkisiz) elemanıdır.” iddiasını hangi örnek <b>çürütür</b>?',
          options: ['0 + 5 = 5', '5 · 0 = 0', '1 · 5 = 5', '5 + (−5) = 0'], answer: 1,
          why: [
            'Bu, toplamada 0’ın etkisiz olduğunu gösterir; çarpma hakkında bir şey söylemez.',
            '5 · 0 = 0: 5 değişti. Çarpmada 0 etkisiz değil, yutandır.',
            '1 · 5 = 5: çarpmanın birim elemanı 1’dir; iddiayı çürütmez.',
            'Bu, toplamaya göre ters elemanı gösterir; çarpmanın birimiyle ilgisi yok.'],
          scene: 2,
        },
      ],
      summary: [
        '<b>0 toplamada etkisiz, çarpmada yutan.</b>',
        '<b>Birim:</b> a + 0 = a, a · 1 = a. <b>Ters:</b> a + (−a) = 0, a · 1/a = 1 (a ≠ 0).',
        'Ters eleman her kümede yok: −3 ∉ ℕ, 1/2 ∉ ℤ.',
      ],
      next: { href: 'd7-ozdeslikler.html', label: 'Sonraki: Özdeşlikler ›' },
    },
  };

  const anahtar = window.DERS_PARCA || 'd4';
  const ek = (window.DERS_EK || {})[anahtar];
  const parca = PARCALAR[anahtar] || ek(KIT);
  Ders.start({
    id: 'sayilar-' + anahtar,
    kicker: 'Konu D · İşlem özellikleri ve cebir',
    title: parca.title,
    accent: '#3CC8E8',
    back: 'index.html',
    intro: { title: parca.title, hook: parca.hook, button: 'Derse başla ›' },
    scenes: parca.scenes,
    quiz: parca.quiz,
    quizTitle: 'Çıkış soruları',
    summary: parca.summary,
    nextLesson: parca.next,
  });
})();
