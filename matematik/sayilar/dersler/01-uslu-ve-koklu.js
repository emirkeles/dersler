/* Üslü ve Köklü Gösterimlerle İşlemler — "Viral Videoyu Geri Sarmak"
   Tüm sahneler saf SVG + ortak ders motoru ile çizilir. Sayısal sonuçlar koddan hesaplanır. */
(function () {
  'use strict';
  const { h, M, ease, lerp, clamp } = Ders;

  /* ================= RENKLER (ders boyunca sabit) ================= */
  const C = {
    bg: '#0F1420', panel: '#182033', panel2: '#212C47', text: '#E8ECF4', soft: '#8B95AB',
    base: '#F2B134', light: '#FFD98A', exp: '#4DD0E1', ok: '#6BE3A0', bad: '#FF7A70',
    root: '#B69CFF', back: '#FFA45C', blue: '#8FB8FF', lime: '#A8E6A1',
  };
  const COL = { b: C.base, e: C.exp, k: C.root, g: C.ok, w: C.bad, t: C.text, s: C.soft, r: C.back, u: C.blue, l: C.light, m: C.lime };

  /* ================= HTML (altyazı / defter) yardımcıları ================= */
  const sp = (cls, x) => `<span class="${cls}">${x}</span>`;
  const P = (b, e) => `<span class="m">${b}<sup>${e}</sup></span>`;                       // düz üslü
  const Pc = (b, e) => `<span class="m"><span class="tb">${b}</span><sup class="tu">${e}</sup></span>`; // taban amber, üs camgöbeği
  const RT = (x) => M.m(M.sqrt(x));
  const FR = (a, b) => M.m(M.frac(a, b));
  const fmt = (v, d = 2) => {
    if (Number.isInteger(v)) return v >= 10000 ? v.toLocaleString('tr-TR') : String(v);
    return (Math.round(v * 10 ** d) / 10 ** d).toString().replace('.', ',');
  };

  /* ================= SES ("ding") ================= */
  let actx = null;
  function ding(ok = true) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.value = ok ? 988 : 196;
      o.connect(g); g.connect(actx.destination);
      const t = actx.currentTime;
      g.gain.setValueAtTime(0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      o.start(t); o.stop(t + 0.3);
    } catch (e) { /* ses yoksa sessiz */ }
  }

  const par = (...ps) => Promise.all(ps);
  const nf = (p) => { p.catch(() => {}); return p; };   // ateşle-unut animasyonlarda iptal hatasını yut

  /* "Atla ›" / "Devam ›" düğmesi: etkileşim bitince Devam'a dönüşür */
  function gate(c, label) {
    let res; const p = new Promise((r) => (res = r));
    const b = h('button', { class: 'btn ghost', onclick: () => { b.remove(); res(); } }, label || 'Atla ›');
    c.act.appendChild(b);
    return { wait: p, done(l) { b.className = 'btn pulse'; b.textContent = l || 'Devam ›'; }, el: b };
  }

  /* ================= SVG ARAÇ KİTİ ================= */
  function kit(c, opt = {}) {
    const S = c.S;
    const svg = c.svg(1280, 720);
    svg.style.userSelect = 'none'; svg.style.webkitUserSelect = 'none';
    if (opt.touch) svg.style.touchAction = 'none';
    const defs = S('defs', {}, svg);
    const lg = (id, c1, c2) => {
      const g = S('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      S('stop', { offset: 0, 'stop-color': c1 }, g); S('stop', { offset: 1, 'stop-color': c2 }, g);
    };
    lg('gBase', '#FFCB5E', '#E3991A'); lg('gLight', '#FFE7AD', '#F2C566'); lg('gBlue', '#BCD6FF', '#7EA6EA');
    lg('gRoot', '#CDBBFF', '#9A7BF0'); lg('gExp', '#86E6F2', '#2FB3C6'); lg('gOk', '#93F2BD', '#3FC47D');
    lg('gBad', '#FF9C93', '#E4564A'); lg('gPink', '#FFB3D6', '#E7709F'); lg('gLime', '#D4F5A8', '#93CF55'); lg('gPanel', '#1E2946', '#141C30'); lg('gBack', '#FFBE85', '#F08A33');
    const glow = S('filter', { id: 'glow', x: '-50%', y: '-50%', width: '200%', height: '200%' }, defs);
    S('feGaussianBlur', { stdDeviation: 5, result: 'b' }, glow);
    const mg = S('feMerge', {}, glow); S('feMergeNode', { in: 'b' }, mg); S('feMergeNode', { in: 'SourceGraphic' }, mg);
    const sh = S('filter', { id: 'shadow', x: '-30%', y: '-30%', width: '160%', height: '170%' }, defs);
    S('feDropShadow', { dx: 0, dy: 4, stdDeviation: 5, 'flood-color': '#000', 'flood-opacity': 0.35 }, sh);

    const K = { svg, S, defs };
    const place = (e) => {
      let tr = `translate(${e._x} ${e._y})`;
      if (e._r) tr += ` rotate(${e._r})`;
      if (e._s !== 1) tr += ` scale(${e._s})`;
      e.setAttribute('transform', tr);
      e.setAttribute('opacity', clamp(e._o, 0, 1));
    };
    K.place = place;
    K.g = (p, x = 0, y = 0, o = {}) => {
      const e = S('g', {}, p || svg);
      e._x = x; e._y = y; e._s = o.s != null ? o.s : 1; e._o = o.o != null ? o.o : 1; e._r = o.r || 0;
      place(e); return e;
    };
    K.set = (e, v) => { for (const k in v) e['_' + k] = v[k]; place(e); return e; };
    /* Hareket: props nesne ya da (e,i)=>nesne; x,y,s,o,r  (yalnızca K.g grupları) */
    K.to = (els, props, ms, ez) => {
      const arr = [].concat(els).filter(Boolean);
      const from = arr.map((e) => ({ x: e._x, y: e._y, s: e._s, o: e._o, r: e._r || 0 }));
      const tg = arr.map((e, i) => (typeof props === 'function' ? props(e, i) : props));
      return c.tween(ms, (t) => {
        arr.forEach((e, i) => { for (const k in tg[i]) e['_' + k] = lerp(from[i][k], tg[i][k], t); place(e); });
      }, ez || ease.inOut);
    };
    K.stagger = (arr, delay, fn) => Promise.all(arr.map((e, i) => (async () => { if (i * delay > 0) await c.wait(i * delay); await fn(e, i); })()));
    /* Saydamlık: K.g grupları ve düz SVG öğeleri için */
    K.fade = (els, o, ms = 500) => {
      const arr = [].concat(els).filter(Boolean);
      const from = arr.map((e) => (e._o != null ? e._o : parseFloat(e.getAttribute('opacity') || 1)));
      return c.tween(ms, (t) => arr.forEach((e, i) => { const v = lerp(from[i], o, t); if (e._o != null) { e._o = v; place(e); } else e.setAttribute('opacity', v); }), ease.inOut);
    };
    K.shake = async (e) => {
      const x0 = e._x;
      await c.tween(320, (t) => { e._x = x0 + 7 * Math.sin(t * Math.PI * 4) * (1 - t * 0.4); place(e); }, ease.linear);
      e._x = x0; place(e);
    };
    K.goto = (e, x, y, ms = 380, ez) => {
      const id = (e._tk = (e._tk || 0) + 1); const x0 = e._x, y0 = e._y;
      return c.tween(ms, (t) => { if (e._tk !== id) return; e._x = lerp(x0, x, t); e._y = lerp(y0, y, t); place(e); }, ez || ease.inOut);
    };
    K.pop = async (e, to = 1) => { await K.to(e, { s: to * 1.18 }, 180, ease.out); await K.to(e, { s: to }, 220, ease.inOut); };

    /* ---- metin ---- */
    K.t = (p, x, y, str, o = {}) => {
      const size = o.size || 28;
      const e = S('text', { x, y: y + size * 0.35, 'text-anchor': o.a || 'middle', 'font-size': size, 'font-weight': o.w || 600 }, p);
      e.style.fill = o.fill || C.text;
      if (o.pre) e.style.whiteSpace = 'pre';
      if (o.math) c.mathText(e, str); else e.textContent = str;
      if (o.o != null) e.setAttribute('opacity', o.o);
      return e;
    };
    /* Renkli üslü metin: '{b 2}{e^ 10}{t  = }{g 1024}'
       b taban, e üs, k kök, g sonuç, w uyarı, r geri, s soluk, u mavi, l açık amber, t metin; ^ üst, _ alt */
    K.rich = (p, x, y, size, spec, o = {}) => {
      const e = S('text', { x, y: y + size * 0.35, 'text-anchor': o.a || 'middle', 'font-size': size, 'font-weight': o.w || 700 }, p);
      e.style.fill = o.fill || C.text; e.style.whiteSpace = 'pre';
      const re = /\{(\w*)([\^_])? ([^}]*)\}/g;
      let last = 0, m, cur = 0;
      e._spans = [];
      const add = (txt, fill, mode) => {
        if (!txt) return;
        const off = mode === '^' ? -0.42 * size : mode === '_' ? 0.2 * size : 0;
        const ts = S('tspan', {}, e); ts.textContent = txt;
        if (fill) ts.style.fill = fill;
        if (mode) ts.setAttribute('font-size', size * 0.68);
        if (off !== cur) { ts.setAttribute('dy', off - cur); cur = off; }
        e._spans.push(ts);
      };
      while ((m = re.exec(spec))) {
        add(spec.slice(last, m.index), null, null);
        add(m[3], COL[m[1]] || null, m[2] || null);
        last = re.lastIndex;
      }
      add(spec.slice(last), null, null);
      if (o.o != null) e.setAttribute('opacity', o.o);
      return e;
    };
    K.len = (e) => { try { return e.getComputedTextLength(); } catch (er) { return 0; } };
    K.ext = (ts) => { try { return ts.getExtentOfChar(0); } catch (er) { return { x: 0, y: 0, width: 0, height: 0 }; } };

    /* Kök sembolü + içerik. x: sol kenar, y: dikey orta. Dönen grup ._w = toplam genişlik */
    K.rad = (p, x, y, spec, size, o = {}) => {
      const g = K.g(p, x, y, o);
      const col = o.col || C.root;
      const inner = K.rich(g, 0.66 * size, 0, size, spec, { a: 'start', fill: o.fill, w: o.w });
      let w = 0;
      try { w = inner.getBBox().width; } catch (e) { w = size * 1.2; }
      const x2 = 0.66 * size + w + 0.1 * size;
      S('path', {
        d: `M${0.02 * size},${0.1 * size} L${0.14 * size},${0.03 * size} L${0.3 * size},${0.52 * size} L${0.58 * size},${-0.62 * size} L${x2},${-0.62 * size}`,
        fill: 'none', stroke: col, 'stroke-width': Math.max(2.5, size * 0.07), 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      }, g);
      g._w = x2; g._inner = inner;
      return g;
    };
    /* Kesir: üst/alt rich spec; x merkez */
    K.frac = (p, x, y, top, bot, size, o = {}) => {
      const g = K.g(p, x, y, o);
      const ro = { fill: o.fill, w: o.w };
      const a = K.rich(g, 0, -size * 0.62, size, top, ro);
      const b = K.rich(g, 0, size * 0.62, size, bot, ro);
      const w = Math.max(K.len(a), K.len(b)) + size * 0.4;
      S('line', { x1: -w / 2, x2: w / 2, y1: 0, y2: 0, stroke: o.line || C.text, 'stroke-width': Math.max(2.5, size * 0.07), 'stroke-linecap': 'round' }, g);
      g._w = w; g._top = a; g._bot = b;
      return g;
    };

    /* ---- nesneler ---- */
    K.block = (p, x, y, label, o = {}) => {
      const s = o.size || 52;
      const g = K.g(p, x, y, { o: o.o, s: o.s });
      g._rect = S('rect', { x: -s / 2, y: -s / 2, width: s, height: s, rx: s * 0.2, fill: o.fill || 'url(#gBase)', stroke: o.stroke || 'rgba(255,255,255,.28)', 'stroke-width': 1.5 }, g);
      S('rect', { x: -s / 2 + 4, y: -s / 2 + 3, width: s - 8, height: s * 0.34, rx: s * 0.14, fill: 'rgba(255,255,255,.2)' }, g);
      g._txt = K.t(g, 0, 1, label, { size: o.fs || s * 0.62, fill: o.tf || C.bg, w: 800 });
      g._size = s;
      return g;
    };
    K.person = (p, x, y, s, fill, o = {}) => {
      const g = K.g(p, x, y, o);
      S('circle', { cx: 0, cy: -s * 0.42, r: s * 0.3, fill }, g);
      S('path', { d: `M${-s * 0.52},${s * 0.52} Q${-s * 0.52},${-0.02 * s} 0,${-0.02 * s} Q${s * 0.52},${-0.02 * s} ${s * 0.52},${s * 0.52} Z`, fill }, g);
      return g;
    };
    K.card = (p, x, y, w, hh, o = {}) => S('rect', {
      x, y, width: w, height: hh, rx: o.rx || 18, fill: o.fill || 'url(#gPanel)',
      stroke: o.stroke || 'rgba(255,255,255,.09)', 'stroke-width': o.sw || 1.5, filter: o.shadow ? 'url(#shadow)' : null,
      'stroke-dasharray': o.dash || null,
    }, p);
    K.pill = (p, x, y, str, col, size = 26, o = {}) => {
      const g = K.g(p, x, y, o);
      const t = K.t(g, 0, 0, str, { size, fill: o.tf || C.bg, w: 800 });
      const w = K.len(t) + size * 0.9;
      const r = S('rect', { x: -w / 2, y: -size * 0.8, width: w, height: size * 1.6, rx: size * 0.8, fill: col }, g);
      g.insertBefore(r, t); g._w = w; g._txt = t;
      return g;
    };
    K.brace = (p, x1, x2, y, col, dir = 1, d = 14, w = 3.5) => {
      const m = (x1 + x2) / 2, e = d * dir;
      return S('path', {
        d: `M${x1},${y} Q${x1},${y + e} ${x1 + d},${y + e} L${m - d},${y + e} Q${m},${y + e} ${m},${y + 2 * e} Q${m},${y + e} ${m + d},${y + e} L${x2 - d},${y + e} Q${x2},${y + e} ${x2},${y}`,
        fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      }, p);
    };
    const mkc = {};
    K.mk = (col) => {
      const id = 'ar' + col.replace('#', '');
      if (!mkc[id]) {
        const m = S('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 4.5, markerHeight: 4.5, orient: 'auto' }, defs);
        S('path', { d: 'M0,0 L10,5 L0,10 z', fill: col }, m); mkc[id] = 1;
      }
      return `url(#${id})`;
    };
    K.arrow = (p, x1, y1, x2, y2, col, w = 3) => S('line', { x1, y1, x2, y2, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'marker-end': K.mk(col) }, p);
    K.line = (p, x1, y1, x2, y2, col, w = 2, o = {}) => S('line', { x1, y1, x2, y2, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': o.dash || null }, p);
    K.ring = async (x, y, col, r1 = 140, ms = 900) => {
      const r = S('circle', { 'pointer-events': 'none', cx: x, cy: y, r: 10, fill: 'none', stroke: col, 'stroke-width': 5 }, svg);
      await c.tween(ms, (t) => { r.setAttribute('r', 10 + (r1 - 10) * t); r.setAttribute('opacity', 1 - t); r.setAttribute('stroke-width', 5 * (1 - t) + 1); }, ease.out);
      r.remove();
    };
    /* ortak zemin: hafif nokta ızgarası */
    K.dots = () => {
      const pat = S('pattern', { id: 'dotp', width: 40, height: 40, patternUnits: 'userSpaceOnUse' }, defs);
      S('circle', { cx: 20, cy: 20, r: 1.4, fill: 'rgba(255,255,255,.07)' }, pat);
      return S('rect', { x: 0, y: 0, width: 1280, height: 720, fill: 'url(#dotp)' }, svg);
    };

    /* ---- sürükleme ---- */
    K.pt = (e) => {
      const q = svg.createSVGPoint(); q.x = e.clientX; q.y = e.clientY;
      const r = q.matrixTransform(svg.getScreenCTM().inverse());
      return { x: r.x, y: r.y };
    };
    /* hd: {down(p), move(p, st), up(p, moved, st)} */
    K.drag = (el, hd) => {
      el.style.cursor = 'grab'; el.style.touchAction = 'none';
      let st = null;
      c.on(el, 'pointerdown', (e) => {
        if (e.button > 0) return;
        try { el.setPointerCapture(e.pointerId); } catch (er) { /* yoksay */ }
        const p = K.pt(e); st = { id: e.pointerId, p0: p, moved: false };
        hd.down && hd.down(p, st, e);
      });
      c.on(el, 'pointermove', (e) => {
        if (!st || e.pointerId !== st.id) return;
        const p = K.pt(e);
        if (Math.hypot(p.x - st.p0.x, p.y - st.p0.y) > 6) st.moved = true;
        hd.move && hd.move(p, st, e);
      });
      const end = (e) => {
        if (!st || e.pointerId !== st.id) return;
        const p = K.pt(e); const s0 = st; st = null;
        hd.up && hd.up(p, s0.moved, s0, e);
      };
      c.on(el, 'pointerup', end); c.on(el, 'pointercancel', end);
    };
    return K;
  }

  const kbtn = (label, onclick, extra) => h('button', { class: 'kb' + (extra ? ' ' + extra : ''), onclick }, label);


  /* ============================================================
     SAHNE 1 — Bir video, iki kişi, bir ağaç
     ============================================================ */
  async function scene1(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const OX = 470, W = 700, Y0 = 125, DY = 88;
    const lx = (k, i) => OX + (i - (2 ** k - 1) / 2) * (W / 2 ** k);
    const ly = (k) => Y0 + DY * k;
    const psz = [46, 38, 33, 29, 25];

    const gLines = K.g(svg), gNodes = K.g(svg);
    /* kök (başlatan) */
    const root = K.person(gNodes, lx(0, 0), ly(0), psz[0], C.base, { s: 0 });
    const rootLbl = K.t(svg, OX - 50, ly(0) + 4, 'Başlatan', { a: 'end', size: 26, fill: C.soft, o: 0 });
    const phone = K.g(svg, OX + 112, ly(0), { o: 0 });
    S('rect', { x: -20, y: -32, width: 40, height: 64, rx: 9, fill: C.panel2, stroke: C.exp, 'stroke-width': 2.5 }, phone);
    S('path', { d: 'M-6,-12 L12,0 L-6,12 Z', fill: C.exp }, phone);
    const phoneLbl = K.t(svg, OX + 146, ly(0) + 2, 'Video', { a: 'start', size: 26, fill: C.exp, o: 0 });

    /* düzeyler */
    const levels = [];
    for (let k = 1; k <= 4; k++) {
      const L = { lines: [], nodes: [] };
      for (let i = 0; i < 2 ** k; i++) {
        const px = lx(k - 1, i >> 1), py = ly(k - 1) + 12, cx = lx(k, i), cy = ly(k) - 14;
        const ln = S('line', { x1: px, y1: py, x2: px, y2: py, stroke: C.soft, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0 }, gLines);
        ln._p = [px, py, cx, cy];
        L.lines.push(ln);
        L.nodes.push(K.person(gNodes, lx(k, i), ly(k), psz[k], C.base, { s: 0, o: 0 }));
      }
      L.label = K.t(svg, 836, ly(k), `${k}. tur: ${2 ** k}`, { a: 'start', size: 27, fill: C.exp, w: 700, o: 0 });
      levels.push(L);
    }
    /* yaprak altı rozetleri */
    const badges = [];
    for (let i = 0; i < 16; i++) {
      const g = K.g(svg, lx(4, i), ly(4) + 54, { o: 0 });
      S('rect', { x: -19, y: -15, width: 38, height: 30, rx: 8, fill: 'rgba(77,208,225,.16)', stroke: C.exp, 'stroke-width': 1.5 }, g);
      g._t = K.t(g, 0, 1, '×2', { size: 20, fill: C.exp, w: 800 });
      badges.push(g);
    }
    const dotsT = K.t(svg, OX, ly(4) + 108, '⋮', { size: 40, fill: C.soft, o: 0 });
    const legend = K.t(svg, OX, ly(4) + 150, '', { size: 26, fill: C.exp, o: 0 });

    /* sayaç paneli */
    const panel = K.g(svg, 0, 0, { o: 0 });
    K.card(panel, 975, 56, 285, 190, { shadow: true });
    K.t(panel, 1000, 96, 'Tur  n', { a: 'start', size: 28, fill: C.soft });
    const nTxt = K.t(panel, 1100, 96, '= 0', { a: 'start', size: 32, fill: C.exp, w: 800 });
    K.t(panel, 1117, 138, 'Videoyu alan kişi', { size: 24, fill: C.soft });
    const cntG = K.g(panel, 1117, 200);
    const cnt = K.t(cntG, 0, 0, '1', { size: 72, fill: C.base, w: 800 });
    /* sütun grafiği: 2ⁿ büyümesi */
    const bars = [];
    const barG = K.g(svg, 0, 0, { o: 0 });
    K.t(barG, 1117, 292, 'her tur: sayı 2 katı', { size: 24, fill: C.soft });
    for (let n = 0; n <= 10; n++) {
      const hh = Math.max(3, 140 * (2 ** n) / 1024);
      bars.push(S('rect', { x: 987 + n * 25, y: 470 - hh, width: 20, height: hh, rx: 4, fill: C.soft, opacity: 0.35 }, barG));
    }
    K.line(barG, 982, 472, 1262, 472, C.soft, 2);
    K.t(barG, 997, 496, '0', { size: 22, fill: C.soft });
    K.t(barG, 1237, 496, '10', { size: 22, fill: C.soft });
    K.t(barG, 1117, 522, 'tur sayısı n', { size: 22, fill: C.soft });
    let ribbon = null;

    let teaser = false, shown = 0;
    function view(n) {
      levels.forEach((L, i) => {
        const vis = i + 1 <= n;
        L.lines.forEach((l) => { l.setAttribute('opacity', vis ? 1 : 0); if (vis) { l.setAttribute('x2', l._p[2]); l.setAttribute('y2', l._p[3]); } });
        L.nodes.forEach((nd) => K.set(nd, { o: vis ? 1 : 0, s: 1 }));
        L.label.setAttribute('opacity', vis ? 1 : 0);
      });
      const showB = n > 4;
      badges.forEach((b) => { b._t.textContent = showB ? String(2 ** (n - 4)) : '×2'; K.set(b, { o: showB || teaser ? 1 : 0 }); });
      dotsT.setAttribute('opacity', showB || teaser ? 1 : 0);
      legend.setAttribute('opacity', showB ? 1 : 0);
      if (showB) { legend.textContent = ''; c.mathText(legend, `her yaprağın altında 2^{${n - 4}} = ${2 ** (n - 4)} kişi`); }
      nTxt.textContent = `= ${n}`;
      cnt.textContent = fmt(2 ** n);
      cnt.setAttribute('font-size', n === 10 ? 66 : 72);
      bars.forEach((b, i) => { b.setAttribute('opacity', i === n ? 1 : i < n ? 0.55 : 0.2); b.style.fill = i === n ? C.base : i < n ? C.exp : C.soft; });
      if (ribbon) ribbon.remove();
      const f = Array(n).fill('2').join(' · ');
      ribbon = K.rich(svg, OX, 660, 34, n === 0 ? '{s başlangıç: }{b 1}{t  kişi}' : `{b ${f}}{t  = }{g ${2 ** n}}`);
      shown = n;
    }
    async function growLevel(k) {
      const L = levels[k - 1];
      L.lines.forEach((l) => l.setAttribute('opacity', 1));
      await c.tween(330, (t) => L.lines.forEach((l) => { l.setAttribute('x2', lerp(l._p[0], l._p[2], t)); l.setAttribute('y2', lerp(l._p[1], l._p[3], t)); }), ease.inOut);
      await par(K.to(L.nodes, { s: 1, o: 1 }, 480, ease.back), K.fade(L.label, 1, 400));
    }

    /* --- giriş --- */
    await K.to(root, { s: 1 }, 320, ease.back);
    nf(K.fade([rootLbl, phone, phoneLbl], 1, 400));
    const p1 = nf(c.say('Bir video: izleyen herkes onu <b>2 kişiye</b> yolluyor.', { ms: 4600, speak: 'Bir video düşün. İzleyen herkes onu tam iki kişiye yolluyor; o kişiler de ikişer kişiye.' }));
    await c.wait(500);
    for (let k = 1; k <= 4; k++) { await growLevel(k); await c.wait(120); }
    await p1;

    const p2 = nf(c.say('2, 4, 8… <b>10. turda</b> kaç kişi alır?', { ms: 4800, speak: 'İlk turda iki, sonra dört, sonra sekiz. [curious] Peki onuncu turda videoyu kaç kişi alır? Bir tahmin yürüt.' }));
    teaser = true; view(4);
    K.set(panel, { o: 0 }); K.set(barG, { o: 0 });
    badges.forEach((b) => K.set(b, { o: 0 }));
    await par(K.fade([panel, barG], 1, 600), K.stagger(badges, 40, (b) => K.fade(b, 1, 350)), K.fade(dotsT, 1, 500));
    await p2;

    await c.choice({
      q: '<b>10. turda</b> videoyu kaç kişi alır?',
      options: ['20', '100', '1024', '2048'], answer: 2,
      hints: [
        'Her turda 2 kişi <i>eklenmiyor</i>; sayı <b>2 katına</b> çıkıyor. 10 tur × 2 = 20 diyorsan toplama yapmışsın.',
        'Yaklaştın ama tahminle olmaz. Tabloyu kendin doldur, kaç çıkacağını görelim.',
        '', 'Çok yakın! Ama bir tur fazla saymışsın: 2048 = 11. turun değeri. Kaydırıcıdan bak.'],
      right: 'Harika sezgi! Şimdi kendi gözünle doğrula.',
    });
    teaser = false; view(4);
    c.say('Kaydırıcıyla <b>10. tura</b> ulaş.', { noWait: true });

    let reached = false, g = null;
    c.slider({
      label: 'Tur sayısı <b>n</b>', min: 0, max: 10, step: 1, value: 4, fmt: (v) => v,
      onInput: (n) => {
        const prev = shown;
        view(n);
        if (n > prev && n >= 1 && n <= 4) {
          const L = levels[n - 1];
          L.nodes.forEach((nd) => K.set(nd, { s: 0.2 }));
          nf(K.to(L.nodes, { s: 1 }, 380, ease.back));
        }
        if (n === 10 && !reached) {
          reached = true;
          nf(K.to(cntG, { s: 1.3 }, 400, ease.out).then(() => K.to(cntG, { s: 1 }, 400)));
          nf(K.ring(1117, 190, C.ok, 150, 1000));
          c.say(`İşte bu kadar: ${Pc(2, 10)} = <b class="tg">1024</b> kişi.`, { noWait: true, speak: 'İşte bu kadar: iki üzeri on eşittir bin yirmi dört kişi.' });
          g && g.done();
        }
      },
    });
    g = gate(c, 'Atla ›');
    await g.wait;
    c.note(`Her turda <b>2 katı</b>: 1 → 2 → 4 → 8 → … → <b class="tg">1024</b>`, 'Büyüme');
  }

  /* ============================================================
     SAHNE 2 — Üs: "Kaç tane çarpan?" sayacı
     ============================================================ */
  async function scene2(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const bx = (i) => 640 + (i - 4.5) * 64;

    /* --- faz 1: 10 tane 2 --- */
    const g0 = K.g(svg);
    const digs = [], dots = [];
    for (let i = 0; i < 10; i++) {
      const x = 130 + i * 113;
      digs.push(K.t(g0, x, 112, '2', { size: 64, fill: i >= 6 ? C.bad : C.text, w: 800, o: 0 }));
      if (i < 9) dots.push(K.t(g0, x + 56, 112, '·', { size: 56, fill: i >= 6 ? C.bad : C.soft, w: 800, o: 0 }));
    }
    const p1 = nf(c.say('<b>10 tane 2</b>\'yi çarpmak çok uzun. Kaç tane olduğunu küçük bir sayaçla yazarız.', { ms: 6500, speak: 'Onuncu turu yazmak için on tane ikiyi çarpmak gerekir. Çok uzun! Bunun yerine kaç tane iki çarpıldı bilgisini küçük bir sayaçla yazarız: iki üzeri on.' }));
    await K.stagger([...digs, ...dots], 70, (e) => K.fade(e, 1, 300));
    const toolong = K.pill(g0, 960, 178, 'çok uzun!', C.bad, 26, { o: 0 });
    await K.fade(toolong, 1, 400);
    await c.wait(800);

    /* bloklara dönüş */
    const blocks = [], nums = [];
    for (let i = 0; i < 10; i++) blocks.push(K.block(svg, bx(i), 262, '2', { size: 54, s: 0, o: 0 }));
    for (let i = 0; i < 10; i++) { const ng = K.g(svg, bx(i), 200, { o: 0 }); K.t(ng, 0, 0, String(i + 1), { size: 32, fill: C.exp, w: 800 }); nums.push(ng); }
    await par(K.fade([...digs, ...dots, toolong], 0, 500), K.stagger(blocks, 60, (b) => K.to(b, { s: 1, o: 1 }, 400, ease.back)));
    g0.remove();
    /* parantez ve sayma */
    const clip = S('clipPath', { id: 'brclip' }, K.defs);
    const cr = S('rect', { x: bx(0) - 40, y: 290, width: 0, height: 80 }, clip);
    const brace = K.brace(svg, bx(0) - 28, bx(9) + 28, 306, C.exp, 1, 16, 4);
    brace.setAttribute('clip-path', 'url(#brclip)');
    nf(c.tween(900, (t) => cr.setAttribute('width', t * 760), ease.inOut));
    await K.stagger(nums, 110, async (n) => { await K.to(n, { o: 1, s: 1.3 }, 160, ease.out); await K.to(n, { s: 1 }, 160); });
    await p1;

    /* 2^10 */
    const G1 = K.g(svg);
    const big = K.rich(G1, 640, 480, 120, '{b 2}{e^ 10}');
    big.setAttribute('opacity', 0);
    const p2 = nf(c.say('<b>Taban</b>: çarpılan sayı. <b>Üs</b>: ondan kaç tane. Üs bir <b>sayaçtır</b>.', { ms: 6500, speak: 'Alttaki sayı taban: hangi sayının çarpıldığını söyler. Üstteki sayı üs: o sayıdan kaç tane yan yana olduğunu söyler. Yani... üs bir sayaçtır.' }));
    await c.tween(600, (t) => big.setAttribute('opacity', t));
    const eb = K.ext(big._spans[0]), ee = K.ext(big._spans[1]);
    const tabanL = K.pill(G1, 420, 610, 'TABAN: hangi sayı?', C.base, 28, { o: 0 });
    const usL = K.pill(G1, 910, 400, 'ÜS: kaç tane?', C.exp, 28, { o: 0 });
    const a1 = K.arrow(G1, 500, 580, eb.x + eb.width * 0.35, eb.y + eb.height * 0.85, C.base, 4); a1.setAttribute('opacity', 0);
    const a2 = K.arrow(G1, 840, 420, ee.x + ee.width + 34, ee.y + ee.height * 0.4, C.exp, 4); a2.setAttribute('opacity', 0);
    await par(K.fade(tabanL, 1, 500), c.tween(500, (t) => a1.setAttribute('opacity', t)));
    await c.wait(500);
    await par(K.fade(usL, 1, 500), c.tween(500, (t) => a2.setAttribute('opacity', t)));
    await p2;
    await c.wait(500);

    /* faz 1 temizlik: 2^10 sol üste küçülür */
    await par(K.fade([...blocks, ...nums], 0, 500), c.tween(500, (t) => brace.setAttribute('opacity', 1 - t)));
    brace.remove(); blocks.forEach((b) => b.remove()); nums.forEach((b) => b.remove());
    await par(K.fade([tabanL, usL], 0, 400), c.tween(400, (t) => { a1.setAttribute('opacity', 1 - t); a2.setAttribute('opacity', 1 - t); }));
    await K.to(G1, { x: -184, y: -178, s: 0.6 }, 900, ease.inOut);

    /* --- faz 2: 2³ = 2·2·2 --- */
    const p3 = nf(c.say('Dikkat: <b>2³</b>, 2·3 değil; <b>2·2·2</b>.', { ms: 4500, speak: 'Dikkat! İki üzeri üç, iki çarpı üç demek DEĞİL; iki çarpı iki çarpı iki demek.' }));
    const A = K.g(svg, 0, 0, { o: 0 });
    K.rich(A, 420, 300, 64, '{b 2}{e^ 3}{t  =}');
    const ab = [0, 1, 2].map((i) => K.block(A, 545 + i * 70, 300, '2', { size: 56 }));
    K.rich(A, 800, 300, 64, '{t = }{g 8}');
    await K.fade(A, 1, 600);
    await K.stagger(ab, 160, (b) => K.pop(b));
    const W = K.g(svg, 0, 0, { o: 0 });
    const wr = K.rich(W, 640, 410, 56, '{w 2}{w^ 3}{w  = 2 · 3 = 6  ✗}');
    await K.fade(W, 1, 500);
    const L = K.len(wr);
    const strike = K.line(W, 640 - L / 2 - 10, 412, 640 - L / 2 - 10, 412, C.bad, 5);
    await c.tween(500, (t) => strike.setAttribute('x2', lerp(640 - L / 2 - 10, 640 + L / 2 + 10, t)), ease.inOut);
    await c.wait(400);
    await K.to(W, { y: 40, o: 0 }, 900, ease.in);
    W.remove();
    await p3;

    /* --- tahmin: 2³ mü 3² mi --- */
    let cmpP = Promise.resolve();
    const cmp = K.g(svg, 0, 0, { o: 0 });
    const lb = [0, 1, 2].map((i) => K.block(cmp, 300 + i * 70, 520, '2', { size: 54, o: 0, s: 0 }));
    const rb = [0, 1].map((i) => K.block(cmp, 870 + i * 70, 520, '3', { size: 54, o: 0, s: 0 }));
    const lab1 = K.rich(cmp, 370, 440, 44, '{b 2}{e^ 3}{t  =  2·2·2}');
    const lab2 = K.rich(cmp, 905, 440, 44, '{b 3}{e^ 2}{t  =  3·3}');
    const r8 = K.rich(cmp, 370, 608, 56, '{g 8}'), r9 = K.rich(cmp, 905, 608, 56, '{g 9}');
    const sign = K.rich(cmp, 632, 520, 64, '{t <}');
    [lab1, lab2, r8, r9, sign].forEach((e) => e.setAttribute('opacity', 0));
    async function runCmp() {
      nf(K.fade(A, 0, 400));
      K.set(cmp, { o: 1 });
      await par(K.fade([lab1, lab2], 1, 400), K.stagger(lb, 120, (b) => K.to(b, { o: 1, s: 1 }, 300, ease.back)), K.stagger(rb, 120, (b) => K.to(b, { o: 1, s: 1 }, 300, ease.back)));
      await c.wait(300);
      await par(K.fade([r8, r9], 1, 400));
      await K.fade(sign, 1, 400);
    }
    await c.choice({
      q: 'Hangisi daha büyük: ' + Pc(2, 3) + ' mü, ' + Pc(3, 2) + ' mi?',
      options: [Pc(2, 3) + ' (üs daha büyük)', Pc(3, 2) + ' (9 > 8)', 'Eşitler'], answer: 1,
      hints: ['Büyük üs her zaman büyük sonuç vermez. Önce yaz: 2³ = 2·2·2 = 8; 3² = 3·3 = 9.', '', 'İkisi de "bir şey" ama farklı: 8 ve 9. Taban ile üs yer değiştirince sonuç değişir.'],
      right: 'Doğru: 3² = 3·3 = 9, 2³ = 2·2·2 = 8. <b>Taban ile üs yer değiştirmez.</b>',
      onPick: (i, ok) => { if (ok) cmpP = nf(runCmp()); },
    });
    await cmpP;
    await c.wait(600);

    /* --- hızlı alıştırma: 2⁵ --- */
    await K.fade([A, cmp], 0, 500);
    A.remove(); cmp.remove();
    const ex = K.g(svg, 0, 0, { o: 0 });
    K.rich(ex, 640, 190, 100, '{b 2}{e^ 5}');
    K.t(ex, 640, 262, 'Tam 5 tane 2 yan yana koy.', { size: 28, fill: C.soft });
    K.card(ex, 190, 306, 900, 112, { dash: '10 8', stroke: C.exp, fill: 'rgba(77,208,225,.05)' });
    const info = K.t(ex, 640, 455, 'Şimdi: 0 tane 2', { size: 30, fill: C.exp, w: 700 });
    const resT = K.t(ex, 640, 520, '', { size: 38, fill: C.ok, w: 800 });
    await K.fade(ex, 1, 600);
    c.say('<b>2⁵</b> için blokları sürükle.', { noWait: true, speak: 'Hızlı alıştırma: iki üzeri beş için blokları sürükle.' });

    const placed = [];
    const homeX = (i) => 640 + (i - 3.5) * 74, homeY = 600;
    const zone = { x1: 170, x2: 1110, y1: 290, y2: 440 };
    const relayout = () => {
      placed.forEach((b, j) => nf(K.goto(b, 640 + (j - (placed.length - 1) / 2) * 66, 362, 300)));
      info.textContent = `Şimdi: ${placed.length} tane 2`;
      resT.textContent = '';
    };
    const putIn = (b) => { if (placed.includes(b) || placed.length >= 8) return false; placed.push(b); relayout(); return true; };
    const takeOut = (b) => { const i = placed.indexOf(b); if (i < 0) return; placed.splice(i, 1); nf(K.goto(b, b._hx, b._hy, 320)); relayout(); };
    for (let i = 0; i < 8; i++) {
      const b = K.block(svg, homeX(i), homeY, '2', { size: 58 });
      b._hx = homeX(i); b._hy = homeY;
      K.drag(b, {
        down: () => { b._tk = (b._tk || 0) + 1; },
        move: (p) => { K.set(b, { x: p.x, y: p.y }); },
        up: (p, moved) => {
          const inside = p.x > zone.x1 && p.x < zone.x2 && p.y > zone.y1 && p.y < zone.y2;
          if (!moved) { placed.includes(b) ? takeOut(b) : putIn(b); return; }
          if (inside) { if (!placed.includes(b)) { if (!putIn(b)) nf(K.goto(b, b._hx, b._hy, 300)); } else relayout(); }
          else if (placed.includes(b)) takeOut(b); else nf(K.goto(b, b._hx, b._hy, 300));
        },
      });
    }
    const g = gate(c, 'Atla ›');
    const fb = h('div');
    const pnl = c.panel('Kontrol', h('p', { class: 'q', html: 'Blokları yerleştirdikten sonra kontrol et.' }), kbtn('Kontrol et', () => {
      const n = placed.length;
      if (n === 5) {
        c.feedback(fb, 'ok', 'Tam isabet: <b>2⁵ = 2·2·2·2·2 = 32</b>');
        resT.textContent = '2 · 2 · 2 · 2 · 2 = 32'; ding(true); nf(K.ring(640, 520, C.ok, 120, 800));
        g.done();
      } else {
        c.feedback(fb, 'no', `2⁵ için <b>5 tane 2</b> gerekir; şimdi ${n} tane var.`);
        ding(false);
      }
    }), fb);
    pnl.after(g.el);
    await g.wait;
    c.note(`<b>a<sup>n</sup> = a·a·…·a</b> (n tane a)<br><span class="tb">a: taban</span>, <span class="tu">n: üs (sayaç)</span><br>${Pc(2, 3)} = 2·2·2 = 8`, 'Üs bir sayaçtır');
  }

  /* ============================================================
     SAHNE 3 — Yan yana yazınca sayaçlar toplanır (çarpım kuralı)
     ============================================================ */
  async function scene3(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const lx3 = (k, i) => 640 + (i - (2 ** k - 1) / 2) * (800 / 2 ** k);
    const tyy = [70, 130, 190, 250];

    /* --- faz 1: iki ağaç parçası --- */
    const T = K.g(svg);
    const tLines = K.g(T), tNodes = K.g(T);
    const lvl = [];
    for (let k = 0; k <= 3; k++) {
      const arr = [];
      for (let i = 0; i < 2 ** k; i++) {
        if (k > 0) K.line(tLines, lx3(k - 1, i >> 1), tyy[k - 1] + 8, lx3(k, i), tyy[k] - 10, C.soft, 2);
        arr.push(K.person(tNodes, lx3(k, i), tyy[k], [30, 27, 24, 22][k], C.base, { o: 0 }));
      }
      lvl.push(arr);
    }
    const tri = [];
    for (let i = 0; i < 8; i++) {
      const x = lx3(3, i);
      const g = K.g(T, 0, 0, { o: 0 });
      S('path', { d: `M${x},${268} L${x - 42},${356} L${x + 42},${356} Z`, fill: 'rgba(255,217,138,.16)', stroke: C.light, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      K.t(g, x, 332, '16', { size: 28, fill: C.light, w: 800 });
      tri.push(g);
    }
    const lab1 = K.g(T, 0, 0, { o: 0 });
    K.t(lab1, 30, 150, 'ilk 3 tur', { a: 'start', size: 26, fill: C.soft });
    K.rich(lab1, 30, 192, 32, '{b 2}{e^ 3}{t  = }{g 8}{t  kişi}', { a: 'start' });
    const lab2 = K.g(T, 0, 0, { o: 0 });
    K.t(lab2, 1255, 410, 'sonra her biri', { a: 'end', size: 26, fill: C.soft });
    K.rich(lab2, 1255, 452, 32, '{t 4 tur: }{b 2}{e^ 4}{t  = }{l 16}', { a: 'end' });

    const p1 = nf(c.say(`Önce 3 tur: ${Pc(2, 3)} = 8 kişi. <b>Her biri</b> 4 tur daha yaydı: ${Pc(2, 4)} = 16.`, { ms: 7600, speak: 'Video önce üç tur yayıldı: iki üzeri üç eşittir sekiz kişi. Sonra bu sekiz kişinin her biri videoyu dört tur daha yaydı; herkesten iki üzeri dört, yani on altı kişi çıktı.' }));
    for (let k = 0; k <= 3; k++) { await K.to(lvl[k], { o: 1 }, 260, ease.out); }
    await K.fade(lab1, 1, 400);
    await c.wait(300);
    await K.stagger(tri, 90, (g) => K.fade(g, 1, 350));
    await K.fade(lab2, 1, 400);
    await p1;

    /* küçülüp köşeye */
    const p2 = nf(c.say(`${Pc(2, 3)} · ${Pc(2, 4)}: <b>üç tane</b> 2 ile <b>dört tane</b> 2. Yan yana kaç tane?`, { ms: 8200, speak: 'Toplamı bulmak için sekizle on altıyı çarpıyoruz: iki üzeri üç çarpı iki üzeri dört. Ama iki üzeri üç, üç tane iki; iki üzeri dört, dört tane iki demek. [curious] Yan yana yazınca kaç tane iki olur?' }));
    await K.to(T, { x: 14, y: 4, s: 0.3 }, 900, ease.inOut);

    const by = 300, step = 62;
    const A = [0, 1, 2].map((i) => K.block(svg, 238 + i * step, by, '2', { size: 52, s: 0, o: 0 }));
    const B = [0, 1, 2, 3].map((i) => K.block(svg, 900 + (i - 1.5) * step, by, '2', { size: 52, s: 0, o: 0, fill: 'url(#gLight)' }));
    const labA = K.g(svg, 0, 0, { o: 0 }), labB = K.g(svg, 0, 0, { o: 0 });
    K.rich(labA, 300, 392, 52, '{b 2}{e^ 3}');
    K.rich(labB, 900, 392, 52, '{l 2}{e^ 4}');
    const times = K.g(svg, 600, by, { o: 0 }); K.t(times, 0, 0, '×', { size: 64, fill: C.text, w: 800 });
    await par(K.stagger(A, 120, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)), K.stagger(B, 120, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)));
    await par(K.fade([labA, labB, times], 1, 500));
    await p2;

    /* birleşme */
    const tx = (i) => 640 + (i - 3) * step;
    const p3 = nf(c.say('<b>3 + 4 = 7</b> tane 2. Çarpmada <b>sayaçlar toplanır</b>.', { ms: 5200, speak: '[excited] Evet! Üç artı dört eşittir yedi tane iki. Yani çarpmada tabanı değil, sayaçları toplarız.' }));
    await K.fade([labA, labB, times], 0, 400);
    await par(
      K.stagger(A, 0, (b, i) => K.to(b, { x: tx(i) }, 900, ease.inOut)),
      K.stagger(B, 0, (b, i) => K.to(b, { x: tx(i + 3) }, 900, ease.inOut)));
    B.forEach((b) => { b._rect.setAttribute('fill', 'url(#gBase)'); });
    const all = [...A, ...B];
    const numG = all.map((b, i) => { const g = K.g(svg, tx(i), 238, { o: 0 }); K.t(g, 0, 0, String(i + 1), { size: 32, fill: C.exp, w: 800 }); return g; });
    const clip = S('clipPath', { id: 'brclip3' }, K.defs);
    const cr = S('rect', { x: tx(0) - 40, y: 320, width: 0, height: 80 }, clip);
    const brace = K.brace(svg, tx(0) - 28, tx(6) + 28, 338, C.exp, 1, 16, 4);
    brace.setAttribute('clip-path', 'url(#brclip3)');
    nf(c.tween(700, (t) => cr.setAttribute('width', t * 560), ease.inOut));
    await K.stagger(numG, 280, async (g) => { await K.to(g, { o: 1, s: 1.3 }, 140, ease.out); await K.to(g, { s: 1 }, 140); });
    const seven = K.rich(svg, 640, 428, 52, '{e 7}{t  tane }{b 2}{t  = }{b 2}{e^ 7}', { o: 0 });
    await c.tween(500, (t) => seven.setAttribute('opacity', t));
    await p3;

    /* denklem satırı */
    const eq = K.rich(svg, 640, 500, 38, '{b 2}{e^ 3}{t  · }{b 2}{e^ 4}{t  = (}{b 2·2·2}{t )·(}{l 2·2·2·2}{t ) = }{b 2}{e^ 7}{t  = }{g 128}', { o: 0 });
    await c.tween(600, (t) => eq.setAttribute('opacity', t));
    const chk = K.rich(svg, 640, 552, 30, '{s kontrol: }{t 8 · 16 = }{g 128}{g  ✓}', { o: 0 });
    await c.tween(400, (t) => chk.setAttribute('opacity', t));
    await c.wait(900);

    /* genel kural */
    const ruleG = K.g(svg, 0, 0, { o: 0 });
    K.rich(ruleG, 640, 618, 60, '{b a}{e^ m}{t  · }{b a}{e^ n}{t  = }{b a}{e^ m+n}');
    K.rich(ruleG, 640, 676, 30, '{t Tabanı değil, }{e SAYAÇLARI}{t  topla.}', { w: 600 });
    const pr = nf(c.say('Genel kural: <b>aᵐ · aⁿ = aᵐ⁺ⁿ</b>', { ms: 2600, speak: 'Genel kural: a üzeri m çarpı a üzeri n eşittir a üzeri m artı n.' }));
    await K.fade(ruleG, 1, 600);
    await pr;
    await c.wait(500);

    /* --- tuzak: toplama --- */
    await K.fade([...all, ...numG, T, seven, eq, chk, brace], 0, 600);
    [...all, ...numG, T, seven, eq, chk, brace].forEach((e) => e.remove());
    await K.to(ruleG, { y: -399, s: 0.8, x: 128 }, 900, ease.inOut);
    const p4 = nf(c.say('Yalnızca <b>çarpmada</b>. Toplamada olmaz: 2³ + 2⁴ = 24, oysa 2⁷ = 128.', { ms: 7600, speak: 'Ama dikkat: bu kural yalnızca çarpma için. Toplamada üsler toplanmaz: iki üzeri üç artı iki üzeri dört, sekiz artı on altı eşittir yirmi dört; oysa iki üzeri yedi, yüz yirmi sekiz.' }));

    const PX = 640, PY = 350, HALF = 350, LEN = 130;
    const post = K.g(svg, 0, 0, { o: 0 });
    K.line(post, PX, PY, PX, 640, '#5c6a8c', 9);
    S('rect', { x: PX - 120, y: 636, width: 240, height: 20, rx: 10, fill: '#44527a' }, post);
    const beam = K.g(svg, PX, PY, { o: 0 });
    S('rect', { x: -HALF - 12, y: -7, width: 2 * HALF + 24, height: 14, rx: 7, fill: '#9fb0d8' }, beam);
    S('circle', { cx: 0, cy: 0, r: 15, fill: '#C7D3F0', stroke: '#44527a', 'stroke-width': 4 }, beam);
    const mkPan = () => {
      const g = K.g(svg, 0, 0, { o: 0 });
      K.line(g, 0, 0, -105, LEN, '#7d8db3', 2); K.line(g, 0, 0, 105, LEN, '#7d8db3', 2);
      S('rect', { x: -118, y: LEN, width: 236, height: 12, rx: 6, fill: '#9fb0d8' }, g);
      return g;
    };
    const panL = mkPan(), panR = mkPan();
    /* kefe içerikleri */
    const sqL = [], sqR = [];
    for (let i = 0; i < 24; i++) { const col = i % 8, row = Math.floor(i / 8); sqL.push(S('rect', { x: -64 + col * 16, y: LEN - 16 - row * 16, width: 14, height: 14, rx: 3, fill: i < 8 ? C.base : C.light, opacity: 0 }, panL)); }
    for (let i = 0; i < 128; i++) { const col = i % 16, row = Math.floor(i / 16); sqR.push(S('rect', { x: -88 + col * 11, y: LEN - 11 - row * 11, width: 9.5, height: 9.5, rx: 2, fill: C.base, opacity: 0 }, panR)); }
    const lblL = K.g(panL, 0, LEN + 52), lblR = K.g(panR, 0, LEN + 52);
    K.rich(lblL, 0, 0, 34, '{b 2}{e^ 3}{t  + }{l 2}{e^ 4}{t  = 8 + 16 = }{w 24}');
    K.rich(lblR, 0, 0, 34, '{b 2}{e^ 7}{t  = }{w 128}');
    const bal = (deg) => {
      beam._r = deg; K.place(beam);
      const r = deg * Math.PI / 180;
      K.set(panL, { x: PX - HALF * Math.cos(r), y: PY - HALF * Math.sin(r) });
      K.set(panR, { x: PX + HALF * Math.cos(r), y: PY + HALF * Math.sin(r) });
    };
    bal(0);
    await K.fade([post, beam, panL, panR], 1, 600);
    await par(
      K.stagger(sqL, 55, (q) => c.tween(200, (t) => q.setAttribute('opacity', t), ease.out)),
      K.stagger(sqR, 12, (q) => c.tween(200, (t) => q.setAttribute('opacity', t), ease.out)));
    await c.wait(400);
    await c.tween(1100, (t) => bal(13 * t), ease.elastic);
    const neq = K.g(svg, PX, 232, { o: 0, s: 0.4 });
    K.t(neq, 0, 0, '≠', { size: 110, fill: C.bad, w: 800 });
    await K.to(neq, { o: 1, s: 1 }, 500, ease.back);
    await p4;
    await c.wait(500);

    /* --- tahmin --- */
    await c.choice({
      q: Pc(2, 3) + ' · ' + Pc(2, 4) + ' = ?',
      options: [Pc(2, 12), Pc(2, 7), Pc(4, 7), Pc(2, 34)], answer: 1,
      hints: [
        '3·4 = 12 mi yaptın? Bloklara bak: 3 tane 2 ile 4 tane 2\'yi yan yana koyunca 12 değil, <b>7</b> tane 2 olur. Çarpmada sayaçlar çarpılmaz, <b>toplanır</b>.',
        '',
        '2·2 = 4 diyerek tabanı değiştirdin. Ama bloklar hâlâ "2" yazıyor, sadece <b>daha çok</b> blok var. Taban aynı kalır, sayaç artar.',
        'Rakamları yan yana yapıştırdın. Üsler sayıdır, yazı değil: 3 + 4 = 7.'],
      right: `Doğru! 3 + 4 = 7 tane 2 → ${Pc(2, 7)} = ${2 ** 7}.`,
    });

    /* --- keşif: m ve n --- */
    await K.fade([post, beam, panL, panR, neq, ruleG], 0, 500);
    [post, beam, panL, panR, neq, ruleG].forEach((e) => e.remove());
    const ex = K.g(svg, 0, 0, { o: 0 });
    const gTop = K.g(ex), gBot = K.g(ex);
    const gTxt = K.g(ex);
    K.t(ex, 640, 62, 'm ve n\'yi oynat: blok grupları birleşir', { size: 30, fill: C.soft });
    const dem = K.g(svg, 0, 0, { o: 0 });
    let m = 3, n = 4, interactions = 0, gt = null;
    const bsz = 44, bst = 50;
    function draw() {
      gTop.innerHTML = ''; gBot.innerHTML = ''; gTxt.innerHTML = '';
      const tot = m + n;
      const wTop = tot * bst + 70;
      let x0 = 640 - wTop / 2 + bst / 2;
      for (let i = 0; i < m; i++) K.block(gTop, x0 + i * bst, 150, '2', { size: bsz });
      const xs = x0 + m * bst + 10;
      K.t(gTop, xs + 10, 150, '×', { size: 44, w: 800 });
      for (let i = 0; i < n; i++) K.block(gTop, xs + 50 + i * bst, 150, '2', { size: bsz, fill: 'url(#gLight)' });
      K.rich(gTop, x0 + (m - 1) * bst / 2, 218, 40, `{b 2}{e^ ${m}}`);
      K.rich(gTop, xs + 50 + (n - 1) * bst / 2, 218, 40, `{l 2}{e^ ${n}}`);
      /* birleşik satır */
      const y2 = 340, xb = 640 - (tot - 1) * bst / 2;
      for (let i = 0; i < tot; i++) K.block(gBot, xb + i * bst, y2, '2', { size: bsz, fill: i < m ? undefined : 'url(#gBase)' });
      K.brace(gBot, xb - 26, xb + (tot - 1) * bst + 26, y2 + 34, C.exp, 1, 14, 3.5);
      K.rich(gBot, 640, y2 + 100, 40, `{e ${m} + ${n} = ${tot}}{t  tane }{b 2}`);
      /* denklem */
      K.rich(gTxt, 640, 520, 60, `{b 2}{e^ ${m}}{t  · }{b 2}{e^ ${n}}{t  = }{b 2}{e^ ${m} + ${n}}{t  = }{b 2}{e^ ${tot}}`);
      K.rich(gTxt, 640, 600, 38, `{t ${2 ** m} · ${2 ** n} = }{g ${2 ** tot}}{t  = }{b 2}{e^ ${tot}}{g  ✓}`);
    }
    draw();
    await K.fade(ex, 1, 500);
    c.say('<b>m</b> ve <b>n</b>\'yi değiştir; toplam blok sayısına bak.', { noWait: true });
    const bump = () => { interactions++; if (interactions === 3 && gt) gt.done(); };
    c.slider({ label: `<span class="tb">m</span> (ilk grup)`, min: 1, max: 6, step: 1, value: m, onInput: (v) => { if (v !== m) bump(); m = v; draw(); } });
    c.slider({ label: `<span class="tb">n</span> (ikinci grup)`, min: 1, max: 6, step: 1, value: n, tag: false, onInput: (v) => { if (v !== n) bump(); n = v; draw(); } });
    /* taban farklıysa */
    let demoOn = false;
    const btn = kbtn('Taban farklıysa ne olur?', async () => {
      if (demoOn) return; demoOn = true;
      await K.fade(ex, 0, 400);
      dem.innerHTML = ''; K.set(dem, { o: 0 });
      const d1 = [0, 1, 2].map((i) => K.block(dem, 250 + i * 54, 280, '2', { size: 48 }));
      const d2 = [0, 1].map((i) => K.block(dem, 1030 - i * 54, 280, '3', { size: 48, fill: 'url(#gBlue)' }));
      K.rich(dem, 640, 90, 40, '{t Taban farklıysa birleşmez!}', { o: 1 });
      K.rich(dem, 330, 210, 40, '{b 2}{e^ 3}{t  = 8}');
      K.rich(dem, 960, 210, 40, '{u 3}{e^ 2}{t  = 9}');
      await K.fade(dem, 1, 400);
      await c.wait(500);
      await c.tween(700, (t) => { d1.forEach((b, i) => { b._x = 250 + i * 54 + 283 * t; K.place(b); }); d2.forEach((b, i) => { b._x = 1030 - i * 54 - 283 * t; K.place(b); }); }, ease.inOut);
      await c.tween(500, (t) => { d1.forEach((b, i) => { b._x = 250 + i * 54 + 283 - 110 * t; K.place(b); }); d2.forEach((b, i) => { b._x = 1030 - i * 54 - 283 + 110 * t; K.place(b); }); }, ease.out);
      K.t(dem, 640, 280, '✗', { size: 70, fill: C.bad, w: 800 });
      await c.wait(600);
      K.rich(dem, 640, 400, 46, `{b 2}{e^ 3}{t  · }{u 3}{e^ 2}{t  = 8 · 9 = }{g ${8 * 9}}`);
      K.rich(dem, 640, 470, 36, `{w 6}{w^ 5}{w  = ${6 ** 5}  ✗ }{t (tabanlar çarpılmaz)}`);
      await c.wait(2400);
      await K.fade(dem, 0, 400); dem.innerHTML = '';
      await K.fade(ex, 1, 400);
      demoOn = false;
    });
    c.panel('Merak', btn);
    gt = gate(c, 'Atla ›');
    await gt.wait;
    c.note(`<b>a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup></b> <br>${Pc(2, 3)}·${Pc(2, 4)} = ${Pc(2, 7)} = 128`, 'Çarpmada üsler toplanır');
  }

  /* ============================================================
     SAHNE 4 — Bölmek eşleşenleri götürmektir
     ============================================================ */
  async function scene4(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const step = 60, cx = 650;
    const tX = (i) => cx + (i - 3) * step;
    const bX = (i) => tX(i);                       // alttakiler üsttekilerin altında
    const yT = 168, yB = 336, yBar = 252;

    const lbl = K.frac(svg, 232, yBar, '{b 2}{e^ 7}', '{b 2}{e^ 4}', 56, { o: 0 });
    const eqs = K.t(svg, 330, yBar + 2, '=', { size: 56, w: 800, o: 0 });
    const bar = S('line', { x1: 392, x2: 908, y1: yBar, y2: yBar, stroke: C.text, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }, svg);
    const top = [], bot = [];
    for (let i = 0; i < 7; i++) top.push(K.block(svg, tX(i), yT, '2', { size: 52, s: 0, o: 0 }));
    for (let i = 0; i < 4; i++) bot.push(K.block(svg, bX(i), yB, '2', { size: 52, s: 0, o: 0 }));
    const lT = K.rich(svg, cx, 100, 38, '{b 2}{e^ 7}{s  → 7 tane 2}', { o: 0 });
    const lB = K.rich(svg, cx, 408, 38, '{b 2}{e^ 4}{s  → 4 tane 2}', { o: 0 });

    const p1 = nf(c.say(`128 kişilik videoyu 4 tur geri saralım: ${Pc(2, 7)} / ${Pc(2, 4)}.`, { ms: 5400, speak: 'Şimdi tersini yapalım. [curious] Yüz yirmi sekiz kişiye ulaşmış videoyu dört tur geriye sararsak ne olur? İki üzeri yedi bölü iki üzeri dört.' }));
    await par(K.fade([lbl, eqs, bar], 1, 600), K.stagger(top, 80, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)), K.stagger(bot, 80, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)));
    await K.fade([lT, lB], 1, 400);
    await p1;

    const p2 = nf(c.say('Bölmede aynı çarpanlar <b>birbirini götürür</b>. Geriye kaç tane 2 kalır?', { ms: 5800, speak: 'Bölme, pay ve paydadaki aynı çarpanların birbirini götürmesi demek. Dört tane iki gider. [curious] Geriye kaç tane kalır?' }));
    /* eşleşme çizgileri */
    const links = [];
    for (let i = 0; i < 4; i++) links.push(S('line', { x1: tX(i), y1: yT + 28, x2: tX(i), y2: yT + 28, stroke: C.text, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '2 7', opacity: 0.9 }, svg));
    await K.stagger(links, 220, (l) => c.tween(420, (t) => l.setAttribute('y2', lerp(yT + 28, yB - 28, t)), ease.inOut));
    await par(...[0, 1, 2, 3].map((i) => (async () => {
      await c.wait(i * 80);
      top[i]._rect.setAttribute('stroke', C.text); top[i]._rect.setAttribute('stroke-width', 4);
      bot[i]._rect.setAttribute('stroke', C.text); bot[i]._rect.setAttribute('stroke-width', 4);
      await par(K.pop(top[i]), K.pop(bot[i]));
    })()));
    await c.wait(500);
    /* sadeleşme: çiftler solar, çizgiye ✕ */
    const xmarks = [];
    await K.stagger([0, 1, 2, 3], 250, async (i) => {
      const mk = K.g(svg, tX(i), yBar, { o: 0, s: 0.4 });
      K.line(mk, -14, -14, 14, 14, C.bad, 5); K.line(mk, 14, -14, -14, 14, C.bad, 5);
      xmarks.push(mk);
      await par(K.to(mk, { o: 1, s: 1 }, 220, ease.back), K.fade([top[i], bot[i]], 0, 400));
      links[i].setAttribute('opacity', 0.25);
    });
    await c.wait(300);
    await p2;

    /* geriye 3 blok */
    const p3 = nf(c.say(`7 taneden 4'ü gitti: <b>3 tane 2</b> kaldı. Bölmede <b>sayaçlar çıkarılır</b>.`, { ms: 5400, speak: 'Üstteki yedi tane ikiden alttaki dördü çıkarırız: üç tane iki kaldı. Yani bölmede sayaçlar çıkarılır.' }));
    const one = K.g(svg, cx, yB, { o: 0, s: 0.5 }); K.t(one, 0, 0, '1', { size: 56, fill: C.text, w: 800 });
    await par(K.to(one, { o: 1, s: 1 }, 450, ease.back), K.fade([...xmarks, ...links], 0, 500), K.fade([lT, lB], 0, 400));
    await c.wait(500);
    await par(K.fade([one, bar, lbl, eqs], 0, 500), K.stagger([4, 5, 6], 0, (i) => K.to(top[i], { x: cx + (i - 5) * step, y: 250 }, 900, ease.inOut)));
    const l3 = K.rich(svg, cx, 330, 54, '{b 2}{e^ 3}', { o: 0 });
    await c.tween(500, (t) => l3.setAttribute('opacity', t));
    const eq = K.rich(svg, cx, 430, 54, `{b 2}{e^ 7}{t  / }{b 2}{e^ 4}{t  = }{b 2}{e^ 7−4}{t  = }{b 2}{e^ 3}{t  = }{g ${2 ** 3}}`, { o: 0 });
    await c.tween(600, (t) => eq.setAttribute('opacity', t));
    await p3;

    /* sayısal doğrulama + geri sarma zinciri */
    const chk = K.rich(svg, cx, 492, 36, `{t ${2 ** 7} / ${2 ** 4} = }{g ${2 ** 7 / 2 ** 4}}{g  ✓}`, { o: 0 });
    await c.tween(500, (t) => chk.setAttribute('opacity', t));
    const p4 = nf(c.say('Her geri turda sayı <b>ikiye bölünür</b>: 128 → 64 → 32 → 16 → 8.', { ms: 5000, speak: 'Dört tur geri sarmak, her turda sayıyı ikiye bölmek demek: yüz yirmi sekiz, altmış dört, otuz iki, on altı, sekiz.' }));
    const cy = 610, xs = [330, 500, 670, 840, 1010];
    const chain = K.g(svg, 0, 0, { o: 0 });
    K.t(chain, 150, cy - 6, '⏪', { size: 56, fill: C.back });
    const vals = xs.map((x, i) => {
      const g = K.g(chain, x, cy, { o: 0, s: 0.6 });
      S('circle', { r: 40, fill: i === 4 ? 'rgba(107,227,160,.2)' : C.panel2, stroke: i === 4 ? C.ok : C.back, 'stroke-width': 3 }, g);
      K.t(g, 0, 0, String(2 ** (7 - i)), { size: 32, fill: i === 4 ? C.ok : C.text, w: 800 });
      K.rich(g, 0, 62, 26, `{b 2}{e^ ${7 - i}}`);
      return g;
    });
    const hops = [];
    for (let i = 0; i < 4; i++) {
      const g = K.g(chain, 0, 0, { o: 0 });
      const a = xs[i] + 44, b = xs[i + 1] - 44;
      S('path', { d: `M${a},${cy - 18} Q${(a + b) / 2},${cy - 70} ${b},${cy - 18}`, fill: 'none', stroke: C.back, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'marker-end': K.mk(C.back) }, g);
      K.t(g, (a + b) / 2, cy - 68, '÷2', { size: 28, fill: C.back, w: 800 });
      hops.push(g);
    }
    K.set(chain, { o: 1 });
    await K.stagger(vals, 0, async (g, i) => { await c.wait(i * 420); await par(K.to(g, { s: 1, o: 1 }, 380, ease.back), i > 0 ? K.fade(hops[i - 1], 1, 380) : Promise.resolve()); });
    await p4;
    await c.wait(600);

    /* genel kural */
    await K.fade([chain, chk, l3, top[4], top[5], top[6], eq], 0, 600);
    const ruleG = K.g(svg, 0, 0, { o: 0 });
    K.rich(ruleG, cx, 220, 78, '{b a}{e^ m}{t  / }{b a}{e^ n}{t  = }{b a}{e^ m−n}');
    K.rich(ruleG, cx, 320, 34, '{t (}{b a}{t  ≠ 0)}{s   çünkü 0\'a bölünemez.}');
    K.rich(ruleG, cx, 410, 36, '{t Bölmede sayaçlar }{e ÇIKARILIR}{t .}', { w: 600 });
    const pr = nf(c.say('Genel kural: <b>aᵐ / aⁿ = aᵐ⁻ⁿ</b> (a ≠ 0)', { ms: 3200, speak: 'Genel kural: a üzeri m bölü a üzeri n eşittir a üzeri m eksi n; a sıfırdan farklı. Bölmede üsler çıkarılır.' }));
    await K.fade(ruleG, 1, 700);
    await pr;
    await c.wait(500);

    await c.choice({
      q: Pc(5, 6) + ' / ' + Pc(5, 2) + ' = ?',
      options: [Pc(5, 8), Pc(5, 4), Pc(5, 3), Pc(1, 4)], answer: 1,
      hints: [
        'Bölerken toplamışsın. Alttaki 2 tane 5, üstteki 6 tane 5\'ten 2\'sini <b>götürür</b>.', '',
        '6 ÷ 2 = 3 yaptın; ama sayaçlar bölünmez, <b>çıkarılır</b>: 6 − 2 = 4.',
        '5/5 = 1 diye tabanları böldün. Tabanlar ortak ve sadeleşmedi; sadece eşleşen <b>çarpan</b> sayısı kadar gitti. Taban 5 olarak kalır.'],
      right: `Doğru: ${Pc(5, 6)} / ${Pc(5, 2)} = ${Pc(5, 4)} = ${5 ** 4}. <br>Kontrol: ${5 ** 6} / ${5 ** 2} = ${5 ** 6 / 5 ** 2} ✓`,
    });
    c.note(`<b>a<sup>m</sup> / a<sup>n</sup> = a<sup>m−n</sup></b> &nbsp;(a ≠ 0)<br>${Pc(2, 7)} / ${Pc(2, 4)} = ${Pc(2, 3)} = 8`, 'Bölmede üsler çıkarılır');
  }

  /* ============================================================
     SAHNE 5 — Grup grup tekrar: (aᵐ)ⁿ ve (a·b)ⁿ
     ============================================================ */
  async function scene5(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const A = K.g(svg, 0, 0, { o: 0 });

    /* ---- Bölüm A: (2³)² ---- */
    K.card(A, 50, 64, 540, 150, { shadow: true });
    K.rich(A, 320, 138, 92, '{t (}{b 2}{e^ 3}{t )}{k^ 2}');
    const eq1 = K.g(A, 0, 0, { o: 0 });
    K.rich(eq1, 320, 270, 46, '{t (}{b 2}{e^ 3}{t )}{k^ 2}{t  = }{b 2}{e^ 3}{t  · }{b 2}{e^ 3}');
    const p1 = nf(c.say(`(2³)² = 2³ · 2³: her grupta <b>3 tane</b> 2, <b>2 grup</b>.`, { ms: 6400, speak: 'İki üzeri üç bir grup. Bu grubu iki kez yazıyoruz: iki üzeri üç çarpı iki üzeri üç. Her grupta üç tane iki var, iki grup var.' }));
    await K.fade(A, 1, 600);
    await K.fade(eq1, 1, 600);

    /* blok ızgarası: 2 satır × 3 sütun */
    const gx = (j) => 800 + j * 72, gy = (i) => 250 + i * 72;
    const grid = [];
    const gridG = K.g(svg);
    for (let i = 0; i < 2; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) row.push(K.block(gridG, gx(j), gy(i), '2', { size: 58, s: 0, o: 0 }));
      grid.push(row);
    }
    const rowLbl = [0, 1].map((i) => { const g = K.g(svg, gx(0) - 62, gy(i), { o: 0 }); K.t(g, 0, 0, `${i + 1}.`, { size: 30, fill: C.root, w: 800 }); return g; });
    const colLbl = [0, 1, 2].map((j) => { const g = K.g(svg, gx(j), gy(0) - 56, { o: 0 }); K.t(g, 0, 0, String(j + 1), { size: 30, fill: C.exp, w: 800 }); return g; });
    await K.stagger([0, 1], 0, async (i) => {
      await c.wait(i * 650);
      await par(K.fade(rowLbl[i], 1, 300), K.stagger(grid[i], 120, (b) => K.to(b, { s: 1, o: 1 }, 320, ease.back)));
    });
    await K.fade(colLbl, 1, 400);
    await p1;

    const p2 = nf(c.say('2 grup × 3 tane = <b>6 tane</b> 2. Üssün üssünde <b>sayaçlar çarpılır</b>.', { ms: 5400, speak: 'Toplam: iki grup çarpı üç tane eşittir altı tane iki. Yani üssün üssünde sayaçlar çarpılır.' }));
    const lSat = K.g(svg, 0, 0, { o: 0 });
    K.rich(lSat, 1032, 286, 30, '{k 2 satır}', { a: 'start' });
    K.line(lSat, 1008, 222, 1008, 350, C.root, 3);
    const lSut = K.g(svg, 0, 0, { o: 0 });
    K.rich(lSut, 872, 168, 30, '{e 3 sütun}');
    await par(K.fade(lSat, 1, 400), K.fade(lSut, 1, 400));
    await c.wait(500);
    /* 1–6 numaralama */
    const flat = grid.flat();
    const nums = flat.map((b, i) => { const g = K.g(svg, b._x, b._y, { o: 0 }); K.t(g, 0, 1, String(i + 1), { size: 30, fill: C.bg, w: 800 }); return g; });
    flat.forEach((b) => { b._txt.setAttribute('opacity', 0); });
    await K.stagger(flat, 260, async (b, i) => { await par(K.fade(nums[i], 1, 120), K.pop(b, 1)); b._rect.setAttribute('stroke', C.exp); b._rect.setAttribute('stroke-width', 3.5); });
    const sixT = K.g(A, 0, 0, { o: 0 });
    K.rich(sixT, 320, 358, 36, '{k 2 grup}{t  × }{e 3 tane}{t  = }{e 6}{t  tane 2}');
    K.rich(sixT, 320, 436, 68, `{t (}{b 2}{e^ 3}{t )}{k^ 2}{t  = }{b 2}{e^ ${2 * 3}}{t  = }{g ${2 ** 6}}`, { o: 1 });
    await K.fade(sixT, 1, 700);
    await p2;
    await c.wait(500);

    /* karşılaştırma şeridi */
    const cmpG = K.g(svg, 0, 0, { o: 0 });
    K.card(cmpG, 40, 508, 590, 190, { fill: 'rgba(77,208,225,.06)', stroke: 'rgba(77,208,225,.35)' });
    K.card(cmpG, 650, 508, 590, 190, { fill: 'rgba(182,156,255,.07)', stroke: 'rgba(182,156,255,.4)' });
    K.rich(cmpG, 335, 540, 30, '{b 2}{e^ 3}{t  · }{b 2}{e^ 2}{s   yan yana yaz}{t  → }{b 2}{e^ 5}{s  (toplam)}');
    K.rich(cmpG, 945, 540, 30, '{t (}{b 2}{e^ 3}{t )}{k^ 2}{s   grup grup tekrar}{t  → }{b 2}{e^ 6}{s  (çarpım)}');
    for (let i = 0; i < 5; i++) K.block(cmpG, 335 + (i - 2) * 46, 620, '2', { size: 38 });
    for (let r = 0; r < 2; r++) for (let j = 0; j < 3; j++) K.block(cmpG, 945 + (j - 1) * 46, 595 + r * 46, '2', { size: 38 });
    K.t(cmpG, 335, 672, 'tek satır', { size: 24, fill: C.soft });
    K.t(cmpG, 1190, 645, 'ızgara', { size: 24, fill: C.soft, a: 'end' });
    await K.fade(cmpG, 1, 700);
    await c.wait(2200);

    /* ---- Bölüm B: (2·3)² ---- */
    await K.fade([A, gridG, ...rowLbl, ...colLbl, lSat, lSut, ...nums, cmpG], 0, 600);
    [A, gridG, ...rowLbl, ...colLbl, lSat, lSut, ...nums, cmpG].forEach((e) => e.remove());
    const B = K.g(svg);
    const hd = K.rich(B, 640, 90, 60, '{t (}{b 2}{t ·}{u 3}{t )}{k^ 2}{t  = (}{b 2}{t ·}{u 3}{t )·(}{b 2}{t ·}{u 3}{t )}', { o: 0 });
    const p3 = nf(c.say('<b>(2·3)²</b> = (2·3)·(2·3): iki tane 2, iki tane 3. Üs <b>her çarpana</b> dağılır.', { ms: 8200, speak: '[curious] Peki iki çarpı üç, bütün üzeri iki ne olur? Bu, iki çarpı üç, çarpı iki çarpı üç demek. Çarpma sırası serbest: iki tane iki ve iki tane üç çıkar. Üs, parantezin içindeki her çarpana dağılır.' }));
    await c.tween(600, (t) => hd.setAttribute('opacity', t));
    /* dört blok */
    const x0 = [480, 550, 730, 800];
    const spec = [['2', 'gBase', C.bg], ['3', 'gBlue', C.bg], ['2', 'gBase', C.bg], ['3', 'gBlue', C.bg]];
    const bl = spec.map((s, i) => K.block(B, x0[i], 220, s[0], { size: 62, fill: `url(#${s[1]})`, o: 0, s: 0 }));
    const par1 = K.g(B, 0, 0, { o: 0 });
    K.t(par1, 424, 222, '(', { size: 88, fill: C.soft, w: 300 }); K.t(par1, 606, 222, ')', { size: 88, fill: C.soft, w: 300 });
    K.t(par1, 676, 222, '(', { size: 88, fill: C.soft, w: 300 }); K.t(par1, 856, 222, ')', { size: 88, fill: C.soft, w: 300 });
    K.t(par1, 640, 222, '·', { size: 60, fill: C.text, w: 800 });
    await par(K.stagger(bl, 120, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)), K.fade(par1, 1, 500));
    await c.wait(600);
    /* yer değiştirme: eğri yollar */
    const tgt = [[500, 380], [570, 380], [680, 380], [750, 380]];       // 2,2 , 3,3
    const order = [0, 2, 1, 3];                                          // 2a,2b,3a,3b
    await K.fade(par1, 0, 400);
    bl.forEach((b) => { b._from = [b._x, b._y]; });
    const slot = {}; order.forEach((bi, k) => (slot[bi] = tgt[k]));
    bl[1]._bend = 1; bl[2]._bend = 1; bl[0]._bend = 0.2; bl[3]._bend = 0.2;
    await c.tween(1100, (e) => {
      bl.forEach((b, i) => {
        const [fx, fy] = b._from, [tx, ty] = slot[i];
        const dx = tx - fx, dy = ty - fy, len = Math.hypot(dx, dy) || 1;
        const bend = Math.sin(e * Math.PI) * 55 * (b._bend || 0) * (i === 1 ? 1 : -1);
        b._x = fx + dx * e + (-dy / len) * bend; b._y = fy + dy * e + (dx / len) * bend; K.place(b);
      });
    }, ease.inOut);
    await p3;
    /* 2²·3² */
    const braceG = K.g(B, 0, 0, { o: 0 });
    K.brace(braceG, 500 - 38, 570 + 38, 420, C.base, 1, 12, 3.5);
    K.brace(braceG, 680 - 38, 750 + 38, 420, C.blue, 1, 12, 3.5);
    K.rich(braceG, 535, 478, 44, '{b 2}{e^ 2}');
    K.rich(braceG, 715, 478, 44, '{u 3}{e^ 2}');
    await K.fade(braceG, 1, 600);
    const res = K.rich(B, 640, 560, 50, `{t = }{b 2}{e^ 2}{t  · }{u 3}{e^ 2}{t  = ${2 ** 2} · ${3 ** 2} = }{g ${(2 * 3) ** 2}}`, { o: 0 });
    await c.tween(500, (t) => res.setAttribute('opacity', t));
    const ck = K.rich(B, 640, 620, 32, `{s kontrol: }{t (2·3)}{t^ 2}{t  = 6}{t^ 2}{t  = }{g ${6 ** 2}}{g  ✓}`, { o: 0 });
    await c.tween(400, (t) => ck.setAttribute('opacity', t));
    const wr = K.rich(B, 640, 674, 30, `{w (2·3)}{w^ 2}{w  ≠ 2·3}{w^ 2}{w  = ${2 * 3 ** 2}  }{s üs yalnızca 3'e ait değil}`, { o: 0 });
    await c.tween(400, (t) => wr.setAttribute('opacity', t));
    await c.wait(1500);

    /* ---- tahmin ---- */
    await c.choice({
      q: '(' + Pc(2, 2) + ')' + '<sup class="tk">3</sup> = ?',
      options: [Pc(2, 5), Pc(2, 6), Pc(4, 6), Pc(2, 8)], answer: 1,
      hints: [
        '2 + 3 mü topladın? O, yan yana yazma kuralı. Burada 3 grup var ve her grupta 2 tane 2 var: 3 × 2 = 6.',
        '',
        '(2²) zaten 4. Üs 3 ise 4³ olur (= 64). 4⁶ = 4096 olurdu; içteki üssü iki kez saymışsın.',
        'Üssü kule gibi 2^(2³) okumuşsun. Burada parantez var: önce 2² = 4, sonra 4³ = 64 = 2⁶.'],
      right: `Doğru. (2²)³ = 4³ = ${4 ** 3} = ${Pc(2, 6)}. İkisini de sayabilirsin.`,
    });

    /* ---- ızgara oyunu ---- */
    await K.fade(B, 0, 500); B.remove();
    const G = K.g(svg);
    K.t(G, 640, 50, 'Satır ve sütunu oynat: ızgara büyür', { size: 30, fill: C.soft });
    const gridL = K.g(G), txtL = K.g(G);
    let rr = 2, ss = 3, moves = 0, gt = null;
    function draw() {
      gridL.innerHTML = ''; txtL.innerHTML = '';
      const st = 54, w0 = 640 - (ss - 1) * st / 2, h0 = 200 - (rr - 1) * st / 2 - 30 + 30;
      for (let i = 0; i < rr; i++) {
        K.t(gridL, w0 - 56, h0 + i * st + 100 - 100 + 30, `${i + 1}.`, { size: 28, fill: C.root, w: 800 });
        for (let j = 0; j < ss; j++) K.block(gridL, w0 + j * st, h0 + 30 + i * st, '2', { size: 46 });
      }
      K.rich(txtL, 640, 460, 62, `{t (}{b 2}{e^ ${ss}}{t )}{k^ ${rr}}{t  = }{b 2}{e^ ${ss}·${rr}}{t  = }{b 2}{e^ ${ss * rr}}`);
      K.rich(txtL, 640, 535, 40, `{k ${rr} grup}{t  × }{e ${ss} tane}{t  = }{e ${ss * rr}}{t  tane 2}`);
      K.rich(txtL, 640, 610, 46, `{b 2}{e^ ${ss * rr}}{t  = }{g ${fmt(2 ** (ss * rr))}}`);
    }
    draw();
    c.say('Grup sayısını ve gruptaki 2 sayısını değiştir: <b>üsler çarpılıyor</b>.', { noWait: true });
    const bump = () => { moves++; if (moves === 3 && gt) gt.done(); };
    c.slider({ label: '<span class="tk">r</span> satır (grup)', min: 1, max: 5, step: 1, value: rr, onInput: (v) => { if (v !== rr) bump(); rr = v; draw(); } });
    c.slider({ label: '<span class="tu">s</span> sütun', min: 1, max: 5, step: 1, value: ss, tag: false, onInput: (v) => { if (v !== ss) bump(); ss = v; draw(); } });
    gt = gate(c, 'Atla ›');
    await gt.wait;
    c.note(`<b>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></b> &nbsp;(2³)² = 2⁶ = 64<br><b>(a·b)<sup>n</sup> = a<sup>n</sup>·b<sup>n</sup></b> &nbsp;(2·3)² = 2²·3² = 36`, 'Üssün üssü, çarpımın üssü');
  }

  /* ============================================================
     SAHNE 6 — Geri sar: a⁰ = 1 ve a⁻ⁿ
     ============================================================ */
  async function scene6(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const exps = []; for (let k = 10; k >= -3; k--) exps.push(k);
    const RH = 45, Y0 = 62;
    const ry = (i) => Y0 + i * RH;
    const valTxt = (k) => (k >= 0 ? String(2 ** k) : `1/${2 ** -k}`);
    const BARX = 660, BARW = 150;

    const hl = S('rect', { x: 272, y: ry(0) - 21, width: 520, height: 42, rx: 12, fill: 'rgba(77,208,225,.14)', stroke: C.exp, 'stroke-width': 2, opacity: 0 }, svg);
    const rows = exps.map((k, i) => {
      const g = K.g(svg, 0, 0);
      const lab = K.rich(g, 396, ry(i), 34, `{b 2}{e^ ${k}}`, { a: 'start' });
      lab.setAttribute('opacity', 0.28);
      const eqT = K.t(g, 500, ry(i), '=', { size: 32, fill: C.soft, w: 700, o: 0 });
      const val = K.t(g, 530, ry(i), valTxt(k), { a: 'start', size: 34, fill: C.base, w: 800, o: 0 });
      let bar = null;
      if (k <= 0) {
        S('rect', { x: BARX, y: ry(i) - 11, width: BARW, height: 22, rx: 6, fill: 'rgba(255,255,255,.06)', opacity: 0 }, g);
        bar = S('rect', { x: BARX, y: ry(i) - 11, width: BARW / 2 ** -k, height: 22, rx: 6, fill: 'url(#gRoot)', opacity: 0 }, g);
      }
      return { k, g, lab, eqT, val, bar, i };
    });
    const arrows = [];
    for (let i = 0; i < exps.length - 1; i++) {
      const g = K.g(svg, 0, 0, { o: 0 });
      K.arrow(g, 288, ry(i) + 10, 288, ry(i + 1) - 10, C.back, 3);
      K.t(g, 240, (ry(i) + ry(i + 1)) / 2, '÷2', { size: 22, fill: C.back, w: 800 });
      K.t(g, 336, (ry(i) + ry(i + 1)) / 2, '−1', { size: 22, fill: C.exp, w: 800 });
      arrows.push(g);
    }
    async function openRow(i, ms = 380) {
      const r = rows[i];
      const tasks = [c.tween(ms, (t) => { r.lab.setAttribute('opacity', lerp(0.28, 1, t)); r.eqT.setAttribute('opacity', t); r.val.setAttribute('opacity', t); if (r.bar) { r.bar.setAttribute('opacity', t); r.bar.previousSibling.setAttribute('opacity', t); } }, ease.out)];
      if (i > 0) tasks.push(K.fade(arrows[i - 1], 1, ms));
      await par(...tasks);
    }
    /* ilk satır */
    rows[0].lab.setAttribute('opacity', 1); rows[0].eqT.setAttribute('opacity', 1); rows[0].val.setAttribute('opacity', 1);

    /* sağ kartlar */
    const cards = [];
    const mkCard = (y, h) => { const g = K.g(svg, 0, 0, { o: 0 }); K.card(g, 925, y, 335, h); cards.push(g); return g; };
    const c1 = mkCard(40, 112), c2 = mkCard(166, 156), c3 = mkCard(336, 158), c4 = mkCard(508, 182);
    K.t(c1, 1092, 74, '⏪  Geri sar', { size: 34, fill: C.back, w: 800 });
    K.rich(c1, 1092, 122, 28, '{e üs −1}{t   →   }{r değer ÷2}');

    const p1 = nf(c.say('Geri saralım: 1024 → 512 → 256… Sayı <b>yarıya</b> iner, üs <b>1 azalır</b>.', { ms: 8800, speak: 'Videoyu geri sarıyoruz. Onuncu turda bin yirmi dört vardı. Bir tur geri sarınca beş yüz on iki. Bir tur daha: iki yüz elli altı. Her adımda sayı yarıya iniyor, üs ise bir azalıyor.' }));
    await K.fade(c1, 1, 500);
    await c.wait(500);
    for (let i = 1; i <= 9; i++) { await openRow(i, 330); await c.wait(80); }
    await p1;

    /* tahmin 1: 2^0 */
    const p2 = nf(c.say('2³ = 8, 2² = 4, 2¹ = 2… Sıradaki <b>2⁰</b> kaç?', { ms: 6000, speak: 'Sarmaya devam edelim: iki üzeri üç sekiz, iki üzeri iki dört, iki üzeri bir iki. [curious] Sıradaki iki üzeri sıfır kaç olmalı? Örüntü der ki ikiyi ikiye böl.' }));
    let r0 = Promise.resolve();
    K.set(rows[10].g, { o: 1 });
    rows[10].lab.setAttribute('opacity', 0.9); rows[10].val.textContent = '?'; rows[10].val.setAttribute('opacity', 1); rows[10].val.style.fill = C.soft;
    rows[10].eqT.setAttribute('opacity', 1);
    hl.setAttribute('y', ry(10) - 21); hl.setAttribute('opacity', 1);
    await p2;
    await c.choice({
      q: 'Örüntüye göre ' + Pc(2, 0) + ' kaç olmalı?',
      options: ['0', '1', '2', 'Tanımsız'], answer: 1,
      hints: [
        '"Hiç çarpan yok" diye 0 demek cazip. Ama 8/8 = 1 ve bölüm kuralı bu sayıyı 2⁰ yapıyor: 2⁰ = 1.',
        '', '2¹ = 2 idi. Bir adım daha geri sarınca 2\'yi ikiye böleriz: 1.',
        'Tanımsız değil: örüntü ve bölüm kuralı kesin söylüyor. (Tanımsız olan 0⁰\'dır; bu derste a ≠ 0.)'],
      right: `Doğru! ${Pc(2, 0)} = <b class="tg">1</b>. Hiç çarpan yok, ama sonuç 0 değil: çarpmanın etkisiz elemanı 1.`,
      onPick: (i, ok) => { if (ok) { rows[10].val.textContent = '1'; rows[10].val.style.fill = C.ok; r0 = nf(openRow(10, 600)); nf(K.ring(580, ry(10), C.ok, 90, 800)); } },
    });
    await r0;
    hl.setAttribute('opacity', 0);

    /* gerekçe 2: bölüm kuralı */
    const p3 = nf(c.say('Bölüm kuralı da aynısını der: 2³ / 2³ = 2⁰, ama 8 / 8 = 1.', { ms: 5200, speak: 'Aynı şeyi bölüm kuralı da söylüyor: iki üzeri üç bölü iki üzeri üç eşittir iki üzeri üç eksi üç, yani iki üzeri sıfır; ama sekiz bölü sekiz bir.' }));
    K.rich(c2, 1092, 204, 30, '{b 2}{e^ 3}{t  / }{b 2}{e^ 3}{t  = }{b 2}{e^ 3−3}{t  = }{b 2}{e^ 0}');
    K.rich(c2, 1092, 248, 30, '{t 8 / 8 = }{g 1}{t   ⇒   }{b 2}{e^ 0}{t  = }{g 1}');
    K.rich(c2, 1092, 296, 26, '{w a ≠ 0}{s  olmalı (0\'a bölünemez)}');
    await K.fade(c2, 1, 600);
    await p3;
    await c.wait(500);

    /* negatif üsler: -1, -2 */
    const p4 = nf(c.say('2⁻¹ = 1/2, 2⁻² = 1/4… Küçülür ama <b>hiç negatif olmaz</b>.', { ms: 6000, speak: 'Daha da geri saralım: iki üzeri eksi bir, bir bölü iki; iki üzeri eksi iki, bir bölü dört. Sayı küçülüyor ama hiç negatif olmuyor.' }));
    for (const i of [11, 12]) { hl.setAttribute('y', ry(i) - 21); hl.setAttribute('opacity', 1); await openRow(i, 650); await c.wait(300); }
    hl.setAttribute('opacity', 0);
    await p4;

    /* tahmin 2: 2^-3 */
    let r3 = Promise.resolve();
    rows[13].g._o = 1; K.place(rows[13].g);
    rows[13].lab.setAttribute('opacity', 0.9); rows[13].val.textContent = '?'; rows[13].val.style.fill = C.soft; rows[13].val.setAttribute('opacity', 1); rows[13].eqT.setAttribute('opacity', 1);
    hl.setAttribute('y', ry(13) - 21); hl.setAttribute('opacity', 1);
    await c.choice({
      q: Pc(2, '−3') + ' nedir?',
      options: ['−8', '−6', FR(1, 8), FR(1, 6)], answer: 2,
      hints: [
        'Eksi işareti sayıyı negatif yapmaz, sonucu <b>ters çevirir</b>. Geri sararken sayı hiçbir zaman negatif olmadı: 1, 1/2, 1/4, 1/8…',
        '2·3 gibi çarpıp eksi mi koydun? 2⁻³, üç tane 2\'nin çarpımının tersi: 1/(2·2·2) = 1/8.',
        '',
        'Paydada 2·3 = 6 mı? Paydada 3 tane 2 çarpılır: 2³ = 8.'],
      right: `Doğru! ${Pc(2, '−3')} = 1/${Pc(2, 3)} = ${FR(1, 8)}.`,
      onPick: (i, ok) => { if (ok) { rows[13].val.textContent = '1/8'; rows[13].val.style.fill = C.base; r3 = nf(openRow(13, 600)); } },
    });
    await r3;
    hl.setAttribute('opacity', 0);
    c.say('Eksi işareti sayıyı negatif yapmaz; <b>ters çevirir</b>: 2⁻³ = 1/2³.', { noWait: true, speak: 'Eksi işareti sayıyı negatif yapmaz; ters çevirir: iki üzeri eksi üç, bir bölü iki üzeri üç.' });
    /* çubuk modeli etiketi */
    const tl = K.g(svg, 0, 0, { o: 0 });
    K.t(tl, BARX + BARW / 2, ry(9) - 36 + 2, 'çubuk modeli', { size: 24, fill: C.root });
    await K.fade(tl, 1, 500);

    /* kesirli taban */
    const p5 = nf(c.say('Kesirde eksi üs kesri <b>ters çevirir</b>: (2/3)⁻² = (3/2)² = 9/4.', { ms: 6000, speak: 'Kesirli tabanda eksi üs kesri ters çevirir: üçte iki üzeri eksi iki, ikide üç üzeri iki, dörtte dokuz.' }));
    K.t(c4, 1092, 538, 'kesirli taban', { size: 26, fill: C.soft });
    const cx0 = 1070, cy0 = 606;
    const fz = K.g(c4, 0, 0);
    K.t(fz, cx0 - 78, cy0, '(', { size: 80, fill: C.soft, w: 300 });
    const topG = K.g(fz, cx0 - 40, cy0 - 25), botG = K.g(fz, cx0 - 40, cy0 + 25);
    K.t(topG, 0, 0, '2', { size: 38, fill: C.base, w: 800 }); K.t(botG, 0, 0, '3', { size: 38, fill: C.blue, w: 800 });
    K.line(fz, cx0 - 62, cy0, cx0 - 18, cy0, C.text, 3);
    K.t(fz, cx0 - 2, cy0, ')', { size: 80, fill: C.soft, w: 300 });
    const ex = K.t(fz, cx0 + 22, cy0 - 30, '−2', { size: 30, fill: C.root, w: 800 });
    const rs = K.g(c4, 0, 0, { o: 0 });
    K.rich(rs, 1092, 664, 32, '{t = (}{u 3/2}{t )}{t^ 2}{t  = }{g 9/4}');
    nf(K.fade(c2, 0.35, 400)); // önceki gerekçe soluklaşır: tahtada tek odak
    await K.fade(c4, 1, 600);
    await c.wait(700);
    await par(K.to(topG, { y: cy0 + 25 }, 900, ease.inOut), K.to(botG, { y: cy0 - 25 }, 900, ease.inOut));
    await c.tween(300, (t) => ex.setAttribute('opacity', 1 - t));
    ex.textContent = '2'; ex.style.fill = C.ok;
    await c.tween(300, (t) => ex.setAttribute('opacity', t));
    await K.fade(rs, 1, 600);
    await p5;
    await c.wait(500);

    /* üs kaydırıcısı */
    c.say('Kaydırıcıyla bir üs seç; o satır parlar.', { noWait: true });
    let moved = 0, gt = null;
    const info = K.g(svg, 0, 0, { o: 0 });
    const infoT = K.t(info, 530, 698, '', { size: 30, fill: C.exp, w: 800 });
    c.slider({
      label: 'Üs <b>k</b>', min: -3, max: 10, step: 1, value: 10, fmt: (v) => v,
      onInput: (k) => {
        const i = 10 - k;
        hl.setAttribute('y', ry(i) - 21); hl.setAttribute('opacity', 1);
        K.set(info, { o: 1 }); infoT.textContent = ''; c.mathText(infoT, `2^{${k}} = ${valTxt(k)}`);
        if (k !== 10) { moved++; if (moved >= 2 && gt) gt.done(); }
      },
    });
    hl.setAttribute('opacity', 0);
    gt = gate(c, 'Atla ›');
    await gt.wait;
    c.note(`<b>a<sup>0</sup> = 1</b> &nbsp;(a ≠ 0)<br><b>a<sup>−n</sup> = 1 / a<sup>n</sup></b> &nbsp;2⁻³ = 1/8`, 'Sıfır ve negatif üs');
  }

  /* ============================================================
     SAHNE 7 — Üs yasaları arenası (sürükle-bırak)
     ============================================================ */
  async function scene7(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const CARD_W = 340, CARD_H = 66, GAP = 18, CX = 230, Y0 = 118;
    const cy = (i) => Y0 + i * (CARD_H + GAP);
    const SLOT_X = 870;
    /* kartlar: değerler koddan hesaplanır */
    const defs = [
      { t: '{b 3}{e^ 2}{t  · }{b 3}{e^ 5}', val: 3 ** (2 + 5), ans: '{b 3}{e^ 7}', sol: '{b 3}{e^ 2}{t  ·  }{b 3}{e^ 5}{t  =  }{b 3}{e^ 2+5}{t  =  }{b 3}{e^ 7}', hint: 'Çarpma: sayaçları <b>topla</b>.' },
      { t: '{b 5}{e^ 6}{t  / }{b 5}{e^ 2}', val: 5 ** (6 - 2), ans: '{b 5}{e^ 4}', sol: '{b 5}{e^ 6}{t  /  }{b 5}{e^ 2}{t  =  }{b 5}{e^ 6−2}{t  =  }{b 5}{e^ 4}', hint: 'Bölme: sayaçları <b>çıkar</b>.' },
      { t: '{t (}{b 2}{e^ 2}{t )}{k^ 4}', val: (2 ** 2) ** 4, ans: '{b 2}{e^ 8}', sol: '{t (}{b 2}{e^ 2}{t )}{k^ 4}{t  =  }{b 2}{e^ 2·4}{t  =  }{b 2}{e^ 8}', hint: 'Üssün üssü: sayaçları <b>çarp</b>.' },
      { t: '{b 7}{e^ 0}', val: 7 ** 0, ans: '{g 1}', sol: '{b 7}{e^ 0}{t  =  }{g 1}{t   (geri sarma)}', hint: 'Geri sararken 2⁰ neydi?' },
      { t: '{b 2}{e^ −2}', val: 2 ** -2, ans: '{g 1/4}', sol: '{b 2}{e^ −2}{t  =  1/}{b 2}{e^ 2}{t  =  }{g 1/4}', hint: 'Eksi işareti: <b>ters çevir</b>.' },
      { t: '{b 2}{e^ 3}{t  + }{b 2}{e^ 3}', val: 2 ** 3 + 2 ** 3, ans: '{b 2}{e^ 4}', sol: '{t 8 + 8 = 16 = }{b 2}{e^ 4}', hint: 'Toplamada üsler toplanmaz! Önce hesapla: 2³ + 2³ = 8 + 8 = 16. Bunu 2 · 2³ = 2¹ · 2³ = 2⁴ diye de yazabilirsin.', trap: true },
    ];
    const order = [4, 5, 0, 3, 2, 1];                  // sağ sütundaki (karışık) sıra: kart indeksleri
    const cards = [], slots = [];
    const hdr = K.t(svg, CX, 52, 'İfadeler', { size: 30, fill: C.soft, w: 700 });
    K.t(svg, SLOT_X + 130, 52, 'Doğru sonuç', { size: 30, fill: C.soft, w: 700 });
    /* yuvalar */
    order.forEach((ci, si) => {
      const g = K.g(svg, 0, 0, { o: 0 });
      const r = S('rect', { x: SLOT_X - CARD_W / 2 - 10, y: cy(si) - CARD_H / 2 - 4, width: CARD_W + 20, height: CARD_H + 8, rx: 16, fill: 'rgba(255,255,255,.03)', stroke: C.soft, 'stroke-width': 2, 'stroke-dasharray': '9 7' }, g);
      const lab = K.rich(g, SLOT_X + CARD_W / 2 + 76, cy(si), 40, defs[ci].ans);
      K.t(g, SLOT_X + CARD_W / 2 + 30 - 4, cy(si), '=', { size: 30, fill: C.soft, w: 700, a: 'middle' }).setAttribute('opacity', 0);
      slots.push({ g, r, ci, si, used: false, x: SLOT_X, y: cy(si), lab });
    });
    /* kartlar */
    defs.forEach((d, i) => {
      const g = K.g(svg, CX, cy(i), { o: 0 });
      g._r1 = S('rect', { x: -CARD_W / 2, y: -CARD_H / 2, width: CARD_W, height: CARD_H, rx: 14, fill: 'url(#gPanel)', stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2, filter: 'url(#shadow)' }, g);
      g._tx = K.rich(g, 0, 1, 38, d.t);
      g._home = [CX, cy(i)]; g._i = i; g._done = false;
      if (d.trap) {
        g._bang = K.g(g, -CARD_W / 2 + 6, -CARD_H / 2 + 6, { o: 0 });
        S('circle', { r: 17, fill: C.bad }, g._bang); K.t(g._bang, 0, 1, '!', { size: 26, fill: C.bg, w: 800 });
      }
      cards.push(g);
    });
    const badge = K.g(svg, 1150, 52, { o: 0 });
    const badgeT = K.t(badge, 0, 0, '0/6', { size: 30, fill: C.ok, w: 800 });
    const demo = K.g(svg, 640, 660, { o: 0 });

    const p1 = nf(c.say('Sıra sende: altı ifadeyi doğru sonuca <b>sürükle</b>.', { speak: 'Şimdi kuralları sen kullan. Altı ifadeyi doğru sonuçların üzerine sürükle.', ms: 4200 }));
    await par(K.stagger(cards, 90, (g) => K.fade(g, 1, 400)), K.stagger(slots, 90, (s) => K.fade(s.g, 1, 400)));
    await p1;
    c.say('Dikkat: biri <b>tuzak</b>. Önce işleme bak: çarpma mı, toplama mı?', { noWait: true });
    await K.fade(badge, 1, 400);

    /* etkileşim */
    const fb = h('div', { class: 'fb info', html: 'Bir kartı sürükle ya da kartı ve sonra yuvayı <b>dokun</b>.' });
    c.panel('Arena', fb);
    const g = gate(c, 'Atla ›');
    let matched = 0, wrongs = 0, sel = null;
    const setSel = (card) => {
      if (sel && sel !== card) sel._r1.setAttribute('stroke', 'rgba(255,255,255,.22)');
      sel = card;
      if (card) card._r1.setAttribute('stroke', C.exp);
    };
    const nearestSlot = (p) => {
      let best = null, bd = 1e9;
      slots.forEach((s) => { const inX = Math.abs(p.x - s.x) < CARD_W / 2 + 40, inY = Math.abs(p.y - s.y) < (CARD_H + GAP) / 2; if (inX && inY) { const d = Math.hypot(p.x - s.x, p.y - s.y); if (d < bd) { bd = d; best = s; } } });
      return best;
    };
    async function demo16() {
      demo.innerHTML = ''; K.set(demo, { o: 1 });
      const b1 = K.block(demo, -70, 0, '8', { size: 52 }), b2 = K.block(demo, 70, 0, '8', { size: 52 });
      const pl = K.t(demo, 0, 0, '+', { size: 36, fill: C.text, w: 800 });
      await c.wait(900);
      await par(K.to(b1, { x: -30 }, 600), K.to(b2, { x: 30 }, 600), c.tween(600, (t) => pl.setAttribute('opacity', 1 - t)));
      const m = K.block(demo, 0, 0, '16', { size: 76, o: 0 });
      const lb = K.rich(demo, 190, 0, 34, '{t 8 + 8 = }{g 16}{t  = }{b 2}{e^ 4}', { a: 'start', o: 0 });
      await par(K.fade([b1, b2], 0, 300), K.fade(m, 1, 300), c.tween(300, (t) => lb.setAttribute('opacity', t)));
      await c.wait(2200);
      await K.fade(demo, 0, 500);
    }
    async function place(card, slot) {
      const d = defs[card._i];
      const ok = slot.ci === card._i;
      if (ok && !slot.used) {
        slot.used = true; card._done = true; matched++;
        await K.goto(card, slot.x, slot.y, 280, ease.out);
        card._r1.setAttribute('stroke', C.ok); card._r1.setAttribute('stroke-width', 3);
        card._r1.setAttribute('fill', 'rgba(107,227,160,.14)');
        card.removeChild(card._tx);
        card._tx = K.rich(card, 0, 1, 25, d.sol);
        slot.r.setAttribute('stroke', C.ok); slot.r.setAttribute('stroke-dasharray', '0');
        ding(true); nf(K.ring(slot.x, slot.y, C.ok, 70, 600));
        badgeT.textContent = `${matched}/6`;
        c.feedback(fb, 'ok', d.trap ? d.hint : '<b>Doğru.</b> ' + d.hint.replace('<b>', '<b>'));
        if (d.trap) nf(demo16());
        if (matched === 6) {
          g.done();
          const big = K.g(svg, 640, 360, { o: 0, s: 0.4 });
          S('rect', { x: -130, y: -60, width: 260, height: 120, rx: 60, fill: 'rgba(15,20,32,.92)', stroke: C.ok, 'stroke-width': 4 }, big);
          K.t(big, 0, 2, '6/6 ✓', { size: 66, fill: C.ok, w: 800 });
          await K.to(big, { o: 1, s: 1 }, 500, ease.back);
          nf(K.ring(640, 360, C.ok, 200, 1000));
          await c.wait(1400);
          await K.fade(big, 0, 500);
          const rec = K.g(svg, 0, 0, { o: 0 });
          const RL = ['{b a}{e^ m}{t  · }{b a}{e^ n}{t  = }{b a}{e^ m+n}', '{b a}{e^ m}{t  / }{b a}{e^ n}{t  = }{b a}{e^ m−n}', '{t (}{b a}{e^ m}{t )}{k^ n}{t  = }{b a}{e^ m·n}', '{t (}{b a}{t b)}{k^ n}{t  = }{b a}{e^ n}{b b}{e^ n}', '{b a}{e^ 0}{t  = }{g 1}', '{b a}{e^ −n}{t  = 1/}{b a}{e^ n}'];
          RL.forEach((spec, i) => K.rich(rec, 230, cy(i), 30, spec));
          await K.fade(rec, 1, 700);
        }
      } else {
        wrongs++;
        ding(false);
        card._r1.setAttribute('stroke', C.bad); card._r1.setAttribute('fill', 'rgba(255,122,112,.18)');
        c.feedback(fb, 'no', d.trap ? d.hint : '<b>Olmadı.</b> ' + d.hint);
        await K.goto(card, card._home[0], card._home[1], 650, ease.bounce);
        card._r1.setAttribute('stroke', 'rgba(255,255,255,.22)'); card._r1.setAttribute('fill', 'url(#gPanel)');
        if (wrongs >= 2 && !cards[5]._done && cards[5]._bang) nf(K.fade(cards[5]._bang, 1, 400));
      }
    }
    cards.forEach((card) => {
      K.drag(card, {
        down: () => { if (card._done) return; card._tk = (card._tk || 0) + 1; card._drag = true; },
        move: (p) => { if (card._done || !card._drag) return; K.set(card, { x: p.x, y: p.y }); },
        up: (p, moved) => {
          if (card._done || !card._drag) return;
          card._drag = false;
          if (!moved) { setSel(sel === card ? null : card); return; }
          const s = nearestSlot(p);
          if (s && !s.used) { setSel(null); place(card, s); } else nf(K.goto(card, card._home[0], card._home[1], 380));
        },
      });
    });
    slots.forEach((s) => {
      c.on(s.g, 'pointerup', () => { if (sel && !sel._done && !s.used) { const cd = sel; setSel(null); place(cd, s); } });
      s.g.style.cursor = 'pointer';
    });
    await g.wait;
    c.note(`<b>a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup></b> · <b>a<sup>m</sup>/a<sup>n</sup> = a<sup>m−n</sup></b> · <b>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></b><br><b>a<sup>0</sup> = 1</b> · <b>a<sup>−n</sup> = 1/a<sup>n</sup></b><br><span class="tw">Toplamada bu kurallar <b>işlemez</b>.</span>`, 'Üs kuralları');
  }

  /* ---------- ortak: zaman şeridi (S8 ve S13) ---------- */
  function timeline(K, o) {
    const { svg, S } = K;
    const g = K.g(svg);
    const X = (n) => o.x0 + (o.x1 - o.x0) * n / o.N;
    S('rect', { x: o.x0 - 14, y: o.y - 7, width: o.x1 - o.x0 + 28, height: 14, rx: 7, fill: 'rgba(255,255,255,.1)' }, g);
    const fill = S('rect', { x: o.x0 - 14, y: o.y - 7, width: 0, height: 14, rx: 7, fill: 'url(#gRoot)' }, g);
    const ticks = [];
    for (let n = 0; n <= o.N; n++) {
      const tg = K.g(g, X(n), o.y, { o: 0 });
      K.line(tg, 0, -12, 0, 12, C.soft, 3);
      K.t(tg, 0, 38, String(n), { size: 28, fill: C.exp, w: 800 });
      K.t(tg, 0, 74, fmt(o.base ** n), { size: 26, fill: o.col || C.base, w: 700 });
      ticks.push(tg);
    }
    K.t(g, o.x0 - 56, o.y + 38, 'tur', { size: 24, fill: C.soft, a: 'end' });
    K.t(g, o.x0 - 56, o.y + 74, 'kişi', { size: 24, fill: C.soft, a: 'end' });
    return { g, X, ticks, fill };
  }

  /* ============================================================
     SAHNE 8 — Kök: yolculuğun tam ortası
     ============================================================ */
  async function scene8(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const N = 10, y = 140;
    const tl = timeline(K, { x0: 190, x1: 1110, y, N, base: 2 });
    const X = tl.X;
    const handle = K.g(svg, X(10), y, { o: 0 });
    S('circle', { r: 22, fill: 'url(#gRoot)', stroke: '#fff', 'stroke-width': 3, filter: 'url(#glow)' }, handle);
    K.t(handle, 0, 1, '⟷', { size: 22, fill: C.bg, w: 800 });
    const pill = K.g(svg, X(10), y - 62, { o: 0 });
    const pillBg = S('rect', { x: -95, y: -24, width: 190, height: 48, rx: 24, fill: C.root }, pill);
    const pillT = K.t(pill, 0, 1, '1024 kişi', { size: 28, fill: C.bg, w: 800 });

    /* sol: kare */
    const SQ = { x: 84, y: 330, s: 280 };
    const sq = K.g(svg, 0, 0, { o: 0 });
    S('rect', { x: SQ.x, y: SQ.y, width: SQ.s, height: SQ.s, rx: 8, fill: 'rgba(77,208,225,.14)', stroke: C.exp, 'stroke-width': 3 }, sq);
    const pat = S('pattern', { id: 'sqpat', width: SQ.s / 32, height: SQ.s / 32, patternUnits: 'userSpaceOnUse', x: SQ.x, y: SQ.y }, K.defs);
    S('rect', { width: SQ.s / 32, height: SQ.s / 32, fill: 'none', stroke: 'rgba(77,208,225,.5)', 'stroke-width': 0.8 }, pat);
    const gridRect = S('rect', { x: SQ.x, y: SQ.y, width: SQ.s, height: SQ.s, fill: 'url(#sqpat)', opacity: 0 }, sq);
    const areaT = K.t(sq, SQ.x + SQ.s / 2, SQ.y + SQ.s / 2 - 8, 'alan = 1024', { size: 36, fill: C.exp, w: 800 });
    const qL = K.t(sq, SQ.x - 22, SQ.y + SQ.s / 2, '?', { size: 44, fill: C.root, w: 800 });
    const qB = K.t(sq, SQ.x + SQ.s / 2, SQ.y + SQ.s + 36, '?', { size: 44, fill: C.root, w: 800 });

    /* sağ: canlı hesap */
    const calc = K.g(svg, 0, 0, { o: 0 });
    K.card(calc, 470, 262, 760, 214, { shadow: true });
    const l1 = K.t(calc, 850, 306, '', { size: 34, fill: C.text, w: 700 });
    const l2 = K.t(calc, 850, 372, '', { size: 50, fill: C.text, w: 800 });
    const l3 = K.t(calc, 850, 438, '', { size: 32, fill: C.soft, w: 700 });

    const p1 = nf(c.say('10 tur = 5 tur + 5 tur. Tam ortada, 5. turda kaç kişi vardı?', { ms: 7000, speak: 'Video on turda bin yirmi dört kişiye ulaştı. Bu yolculuğu eşit iki yarıya böl: beş tur artı beş tur. [curious] Tam ortada, beşinci turda kaç kişi vardı?' }));
    await K.stagger(tl.ticks, 70, (t) => K.fade(t, 1, 300));
    nf(c.tween(900, (t) => tl.fill.setAttribute('width', t * (X(10) - X(0) + 28)), ease.inOut));
    await K.fade([handle, pill], 1, 500);
    await p1;
    const p2 = nf(c.say('Ortadaki sayı <b>kendisiyle çarpılınca 1024</b> eder. Karekök bu: √1024.', { ms: 8000, speak: 'İkinci yarıda bu kişilerin her biri ilk yarıdaki kadar büyüdü. Yani ortadaki sayı kendisiyle çarpılınca bin yirmi dört olmalı. İşte karekök bu: karekök bin yirmi dört.' }));
    await par(K.fade(sq, 1, 700), K.fade(calc, 1, 700));
    const showCalc = (k) => {
      const v = 2 ** k, sqv = v * v;
      l1.textContent = ''; c.mathText(l1, `${k}. turda: 2^{${k}} = ${fmt(v)} kişi`);
      l2.textContent = `${fmt(v)} · ${fmt(v)} = ${fmt(sqv)}`;
      const ok = sqv === 1024;
      l2.style.fill = ok ? C.ok : C.text;
      l3.textContent = ok ? 'Tam 1024 ✓' : sqv < 1024 ? 'çok küçük (1024 olmalı)' : 'çok büyük (1024 olmalı)';
      l3.style.fill = ok ? C.ok : C.bad;
    };
    showCalc(10);
    await p2;
    const p3 = nf(c.say('Tutamacı sürükle: hangi turdaki sayı <b>kendisiyle çarpılınca 1024</b> eder?', { speak: 'Kare olarak düşün: alanı bin yirmi dört olan karenin bir kenarı kaç? Tutamacı sürükle: öyle bir tur bul ki, oradaki kişi sayısı kendisiyle çarpılınca bin yirmi dört olsun.', ms: 7000 }));
    await p3;

    /* sürükle: tutamaç */
    const panelFb = h('div', { class: 'fb info', html: 'Tutamacı şerit üzerinde sürükle (ya da bir tura dokun).' });
    const pnlB = c.panel('Bul', h('p', { class: 'q', html: 'Yolculuğun öyle bir noktasını bul ki, orada kaç kişi varsa kendisiyle çarpılınca 1024 olsun.' }), panelFb);
    let solved = false, kNow = 10, resolveSolved = null;
    const solvedP = new Promise((r) => (resolveSolved = r));
    const setH = (x) => { K.set(handle, { x }); K.set(pill, { x }); };
    const kOf = (x) => clamp(Math.round((x - X(0)) / (X(N) - X(0)) * N), 0, N);
    const upd = (k) => { kNow = k; pillT.textContent = `${fmt(2 ** k)} kişi`; showCalc(k); };
    async function drop(k) {
      if (solved) return;
      upd(k);
      if (k === 5) {
        solved = true;
        nf(K.goto(handle, X(5), y, 250)); nf(K.goto(pill, X(5), y - 62, 250));
        c.feedback(panelFb, 'ok', 'Tam ortası! <b>32 · 32 = 1024</b>, yani <b>√1024 = 32 = 2⁵</b>.');
        resolveSolved();
      } else {
        const v = 2 ** k, sqv = v * v;
        c.feedback(panelFb, 'no', `${fmt(v)}·${fmt(v)} = ${fmt(sqv)} – ${sqv < 1024 ? 'çok küçük' : 'çok büyük'}. Çarpım 1024'e eşit olmalı. ${sqv < 1024 ? 'Sağa' : 'Sola'} kaydır.`);
        ding(false);
        await c.wait(500);
        await par(K.goto(handle, X(10), y, 600), K.goto(pill, X(10), y - 62, 600));
        upd(10);
      }
    }
    K.drag(handle, {
      down: () => { handle._tk = (handle._tk || 0) + 1; pill._tk = (pill._tk || 0) + 1; },
      move: (p) => { if (solved) return; const x = clamp(p.x, X(0), X(N)); setH(x); const k = kOf(x); if (k !== kNow) upd(k); },
      up: (p) => { if (solved) return; const k = kOf(clamp(p.x, X(0), X(N))); nf(K.goto(handle, X(k), y, 150)); nf(K.goto(pill, X(k), y - 62, 150)); nf(drop(k)); },
    });
    tl.ticks.forEach((tg, n) => { const hit = S('rect', { x: -40, y: -30, width: 80, height: 110, fill: 'transparent', style: 'cursor:pointer' }, tg); c.on(hit, 'pointerup', () => { if (solved) return; nf(K.goto(handle, X(n), y, 300)); nf(K.goto(pill, X(n), y - 62, 300)); nf(drop(n)); }); });
    const skip = h('button', { class: 'btn ghost', onclick: () => { skip.remove(); if (!solved) { nf(K.goto(handle, X(5), y, 500)); nf(K.goto(pill, X(5), y - 62, 500)); nf(drop(5)); } } }, 'Çözümü göster ›');
    c.act.appendChild(skip);
    await solvedP;
    skip.remove(); pnlB.remove();
    await c.wait(500);

    /* çözüm animasyonu */
    const p4 = nf(c.say('Alanı 1024 olan karenin kenarı <b>32</b>. Kök, yolun <b>tam ortası</b>.', { ms: 7000, speak: 'Kare olarak: alanı bin yirmi dört olan karenin kenarı otuz iki, çünkü otuz iki çarpı otuz iki eşittir bin yirmi dört. Kök, çarpma yolculuğunun tam ortası.' }));
    nf(K.ring(X(5), y, C.root, 120, 1000));
    const mid = K.g(svg, 0, 0, { o: 0 });
    S('circle', { cx: X(5), cy: y, r: 36, fill: 'none', stroke: C.root, 'stroke-width': 4 }, mid);
    const arc = (a, b) => { const p = S('path', { d: `M${X(a)},${y - 40} Q${(X(a) + X(b)) / 2},${y - 118} ${X(b) - 4},${y - 44}`, fill: 'none', stroke: C.root, 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': K.mk(C.root) }, mid); return p; };
    arc(0, 5); arc(5, 10);
    K.t(mid, (X(0) + X(5)) / 2, y - 100, '5 tur', { size: 28, fill: C.root, w: 800 });
    K.t(mid, (X(5) + X(10)) / 2, y - 100, '5 tur', { size: 28, fill: C.root, w: 800 });
    pill.removeChild(pillT); pillBg.setAttribute('x', -60); pillBg.setAttribute('width', 120);
    K.t(pill, 0, 1, '32', { size: 32, fill: C.bg, w: 800 });
    await K.fade(mid, 1, 700);
    /* kare ızgarası */
    areaT.setAttribute('opacity', 0.0);
    await par(c.tween(800, (t) => gridRect.setAttribute('opacity', t)), c.tween(500, (t) => { qL.setAttribute('opacity', 1 - t); qB.setAttribute('opacity', 1 - t); }));
    qL.textContent = '32'; qB.textContent = '32'; qL.style.fill = C.ok; qB.style.fill = C.ok;
    qL.setAttribute('x', SQ.x - 36); qB.setAttribute('y', SQ.y + SQ.s + 40 + 12);
    await c.tween(500, (t) => { qL.setAttribute('opacity', t); qB.setAttribute('opacity', t); });
    areaT.textContent = '32 · 32 = 1024'; areaT.setAttribute('font-size', 32);
    areaT.style.fill = C.text;
    areaT.setAttribute('y', SQ.y + SQ.s / 2 + 12);
    S('rect', { x: SQ.x + 20, y: SQ.y + SQ.s / 2 - 26, width: SQ.s - 40, height: 52, rx: 12, fill: 'rgba(15,20,32,.85)' }, sq);
    sq.appendChild(areaT); areaT.setAttribute('opacity', 1);
    /* sağ panelde sonuç */
    l1.textContent = ''; c.mathText(l1, '√1024 = √(2^{10}) = 2^{5} = 32');
    l1.style.fill = C.root;
    l2.textContent = '32 · 32 = 1024'; l2.style.fill = C.ok;
    l3.textContent = 'Kök = çarpma yolculuğunun tam ortası'; l3.style.fill = C.root;
    await p4;

    /* küçük kök tablosu */
    const tb = K.g(svg, 0, 0, { o: 0 });
    K.card(tb, 470, 500, 760, 190, { fill: 'rgba(182,156,255,.07)', stroke: 'rgba(182,156,255,.35)' });
    const tabRows = [];
    for (let i = 1; i <= 6; i++) {
      const col = (i - 1) % 3, row = Math.floor((i - 1) / 3);
      const gg = K.g(tb, 560 + col * 220, 548 + row * 62, { o: 0 });
      const r = K.rad(gg, -50, 0, `{t ${i * i}}`, 32, { col: C.root });
      K.rich(gg, r._w - 44, 0, 32, `{t  = }{g ${i}}`, { a: 'start' });
      tabRows.push(gg);
    }
    const rule = K.t(tb, 850, 668, '√a  ≥ 0 olan sayıdır.', { size: 28, fill: C.root, w: 700 });
    rule.setAttribute('opacity', 0);
    await K.fade(tb, 1, 400);
    await K.stagger(tabRows, 200, (gg) => K.fade(gg, 1, 300));
    await c.tween(400, (t) => rule.setAttribute('opacity', t));
    await c.wait(600);

    /* mini soru */
    await c.choice({
      q: RT(16) + ' = ?',
      options: ['8', '4', '256'], answer: 1,
      hints: ['8, 16\'nın yarısı ama kök "yarısı" değil: 8·8 = 64 ≠ 16. Aranan sayı kendisiyle çarpılınca 16 olan: 4.', '', '256 = 16·16. Kök, kendisiyle çarpılınca 16 veren sayıdır; çarpımın sonucu değil.'],
      right: 'Doğru: √16 = 4, çünkü 4·4 = 16.',
    });
    c.note(`<b>√a</b>: kendisiyle çarpılınca <b>a</b> veren, negatif olmayan sayı.<br>√1024 = 32, çünkü 32·32 = 1024`, 'Karekök');
  }

  /* ---------- ortak: karışık (kök + yazı) satır. Parça: rich metni ya da { r: kök içi, n: derece, col } ---------- */
  function mixLine(K, p, cx, y, size, segs, o = {}) {
    const g = K.g(p, 0, y, { o: o.o });
    let x = 0;
    segs.forEach((s) => {
      if (typeof s === 'string') { const t = K.rich(g, x, 0, size, s, { a: 'start' }); x += K.len(t); }
      else { const o2 = { col: s.col || C.root }; const r = s.n ? nrad(K, g, x, 0, s.r, size, s.n, o2) : K.rad(g, x, 0, s.r, size, o2); x += r._w + size * 0.08; }
    });
    g._w = x; g._x = cx - x / 2; K.place(g);
    return g;
  }

  /* ---------- ortak: kök çatısı altında çarpan "chip"leri (çiftler dışarı) ---------- */
  function rootChips(K, c, o) {
    const { svg, S } = K;
    const sc = o.scale || 1, R = 29 * sc, SP = 80 * sc, cy = o.cy, x1 = o.x1;
    const g = K.g(svg, 0, 0, { o: 0 });
    const roof = S('path', { fill: 'none', stroke: o.col || C.root, 'stroke-width': 5 * sc, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const yTop = cy - R - 24 * sc;
    let roofR = 0;
    const setRoof = (xr) => { roofR = xr; roof.setAttribute('d', `M${x1 - 20 * sc},${cy + 6 * sc} L${x1 - 6 * sc},${cy - 2 * sc} L${x1 + 14 * sc},${cy + R + 12 * sc} L${x1 + 38 * sc},${yTop} L${xr},${yTop}`); };
    const fillOf = (v) => ({ 2: 'url(#gBase)', 3: 'url(#gBlue)', 5: 'url(#gPink)', 7: 'url(#gLime)' }[v] || 'url(#gOk)');
    const mkChip = (v, x, y, fill) => {
      const cg = K.g(g, x, y, { o: 0, s: 0 });
      cg._circ = S('circle', { r: R, fill: fill || fillOf(v), stroke: 'rgba(255,255,255,.4)', 'stroke-width': 2 * sc }, cg);
      cg._ring = S('circle', { r: R + 6 * sc, fill: 'none', stroke: '#fff', 'stroke-width': 3 * sc, opacity: 0 }, cg);
      cg._lab = K.t(cg, 0, 1, String(v), { size: R * 1.08, fill: C.bg, w: 800 });
      cg._v = v; return cg;
    };
    const innerX = (k) => x1 + 52 * sc + R + k * SP;
    const outX = (m) => x1 - 46 * sc - R - m * (2 * R + 16 * sc);
    const inner = [], out = [];
    o.factors.forEach((v, k) => inner.push(mkChip(v, innerX(k), cy)));
    setRoof(innerX(Math.max(0, inner.length - 1)) + R + 20 * sc);
    const api = {
      g, inner, out, R, SP, cy, x1, mkChip, innerX, outX,
      async show() {
        K.set(g, { o: 1 });
        const full = roofR; setRoof(x1 + 38 * sc);
        await c.tween(500, (t) => setRoof(lerp(x1 + 38 * sc, full, t)), ease.out);
        await K.stagger(inner, 90, (ch) => K.to(ch, { s: 1, o: 1 }, 350, ease.back));
      },
      async relayout(ms = 500) {
        const rFrom = roofR, rTo = inner.length ? innerX(inner.length - 1) + R + 20 * sc : x1 + 60 * sc;
        await par(...inner.map((ch, k) => K.goto(ch, innerX(k), cy, ms)), c.tween(ms, (t) => setRoof(lerp(rFrom, rTo, t)), ease.inOut));
      },
      async pairOut(a, b) {
        const v = a._v;
        a._ring.setAttribute('opacity', 1); b._ring.setAttribute('opacity', 1);
        await par(K.pop(a), K.pop(b));
        const mx = (a._x + b._x) / 2;
        await par(K.goto(a, mx, cy, 350), K.goto(b, mx, cy, 350));
        const m = mkChip(v, mx, cy);
        K.set(m, { o: 1, s: 1 });
        inner.splice(inner.indexOf(a), 1); inner.splice(inner.indexOf(b), 1);
        a.remove(); b.remove();
        const slot = out.length; out.push(m);
        const tx = outX(slot), x0 = m._x;
        const fly = c.tween(950, (e) => { m._x = lerp(x0, tx, e); m._y = cy - Math.sin(e * Math.PI) * (R * 2.8); K.place(m); }, ease.inOut);
        await par(fly, api.relayout(750));
        return m;
      },
      async combine() {
        const prod = out.reduce((s, ch) => s * ch._v, 1);
        const px = outX(out.length - 1);
        const m = mkChip(prod, px, cy, 'url(#gOk)');
        await par(K.fade(out, 0, 400), K.to(m, { s: 1, o: 1 }, 450, ease.back));
        out.forEach((ch) => ch.remove()); out.length = 0; out.push(m);
        await K.to(m, { x: outX(0) }, 300);
        return prod;
      },
      /* dışarıdaki bir katsayıyı iki kopya olarak kök altına sok */
      async absorb(ch) {
        const v = ch._v;
        const a = mkChip(v, ch._x, cy), b = mkChip(v, ch._x, cy);
        K.set(a, { o: 1, s: 1 }); K.set(b, { o: 1, s: 1 });
        inner.unshift(b); inner.unshift(a);
        out.splice(out.indexOf(ch), 1);
        const x0 = ch._x;
        await K.fade(ch, 0, 300); ch.remove();
        const tasks = [api.relayout(1000)];
        [a, b].forEach((q, i) => tasks.push(c.tween(1000, (e) => { q._y = cy - Math.sin(e * Math.PI) * (R * 2.2 + i * 14); K.place(q); }, ease.inOut)));
        await par(...tasks);
        K.set(a, { y: cy }); K.set(b, { y: cy });
      },
    };
    return api;
  }

  /* ============================================================
     SAHNE 9 — Ortadaki üs kaç? √a = a^(1/2)
     ============================================================ */
  async function scene9(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const BASE = 612, H = 170;
    const AX0 = 250, AX1 = 1030, XM = (AX0 + AX1) / 2;
    const xp = (x) => AX0 + (AX1 - AX0) * x;
    let A = 4, curX = 0;

    /* eksen */
    const axis = K.g(svg, 0, 0, { o: 0 });
    K.line(axis, 190, BASE, 1090, BASE, C.soft, 3);
    [[0, 'x = 0'], [0.5, 'x = 1/2'], [1, 'x = 1']].forEach(([x, t]) => {
      K.line(axis, xp(x), BASE - 8, xp(x), BASE + 8, C.soft, 3);
      K.t(axis, xp(x), BASE + 34, t, { size: 28, fill: C.exp, w: 800 });
    });
    K.t(axis, 150, BASE + 34, 'üs', { size: 26, fill: C.soft, a: 'end' });
    const subs = [K.rich(axis, xp(0), BASE + 72, 28, '{b a}{e^ 0}{t  = }{g 1}'), K.rich(axis, xp(0.5), BASE + 72, 28, '{b a}{e^ 1/2}{t  = }{k ?}'), K.rich(axis, xp(1), BASE + 72, 28, '{b a}{e^ 1}{t  = }{b a}')];

    const bars = [0, 0.5, 1].map((x) => S('rect', { x: xp(x) - 34, width: 68, rx: 8, fill: x === 0.5 ? 'url(#gRoot)' : 'url(#gBase)', opacity: 0 }, svg));
    const vals = [0, 0.5, 1].map((x) => K.t(svg, xp(x), BASE - 40, '', { size: 34, fill: x === 0.5 ? C.root : C.base, w: 800, o: 0 }));
    const curve = S('path', { 'pointer-events': 'none', fill: 'none', stroke: C.root, 'stroke-width': 3.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round', opacity: 0 }, svg);
    const ratios = [K.g(svg, (xp(0) + XM) / 2, BASE - 14, { o: 0 }), K.g(svg, (XM + xp(1)) / 2, BASE - 14, { o: 0 })];
    ratios.forEach((g) => { K.line(g, -62, 0, 62, 0, C.back, 3.5); S('path', { d: 'M56,-9 L68,0 L56,9', fill: 'none', stroke: C.back, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g); g._t = K.t(g, 0, -26, '×2', { size: 30, fill: C.back, w: 800 }); });
    const handle = K.g(svg, xp(0), BASE, { o: 0 });
    S('circle', { r: 17, fill: 'url(#gRoot)', stroke: '#fff', 'stroke-width': 3, filter: 'url(#glow)' }, handle);
    const stem = S('line', { 'pointer-events': 'none', stroke: C.root, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0 }, svg);
    const dot = S('circle', { 'pointer-events': 'none', r: 9, fill: '#fff', stroke: C.root, 'stroke-width': 3, opacity: 0 }, svg);
    const live = K.g(svg, 0, 0, { o: 0 }); live.style.pointerEvents = 'none';
    const liveBg = S('rect', { x: -86, y: -22, width: 172, height: 44, rx: 22, fill: C.root }, live);
    const liveT = K.t(live, 0, 1, '', { size: 28, fill: C.bg, w: 800 });

    const unit = () => H / A;
    const hOf = (v) => v * unit();
    function render() {
      const v0 = 1, vh = Math.sqrt(A), v1 = A;
      [v0, vh, v1].forEach((v, i) => { const hh = hOf(v); bars[i].setAttribute('y', BASE - hh); bars[i].setAttribute('height', hh); vals[i].setAttribute('y', BASE - hh - 18 + 12); });
      vals[0].textContent = '1'; vals[1].textContent = fmt(vh); vals[2].textContent = fmt(v1);
      subs[1].remove();
      subs[1] = K.rich(axis, xp(0.5), BASE + 72, 28, `{b a}{e^ 1/2}{t  = }{k ${fmt(vh)}}`);
      subs[2].remove();
      subs[2] = K.rich(axis, xp(1), BASE + 72, 28, `{b a}{e^ 1}{t  = }{b ${A}}`);
      let d = '';
      for (let i = 0; i <= 60; i++) { const x = i / 60; d += (i ? ' L' : 'M') + xp(x).toFixed(1) + ',' + (BASE - hOf(A ** x)).toFixed(1); }
      curve.setAttribute('d', d);
      ratios.forEach((g) => { g._t.textContent = '×' + fmt(vh); });
      moveHandle(curX);
    }
    function moveHandle(x) {
      curX = x;
      const v = A ** x, px = xp(x), py = BASE - hOf(v);
      K.set(handle, { x: px });
      stem.setAttribute('x1', px); stem.setAttribute('x2', px); stem.setAttribute('y1', BASE); stem.setAttribute('y2', py);
      dot.setAttribute('cx', px); dot.setAttribute('cy', py);
      K.set(live, { x: clamp(px, 330, 960), y: py - 72 });
      liveT.textContent = ''; c.mathText(liveT, `${A}^{${x === 0.5 ? '1/2' : fmt(x)}} = ${fmt(v)}`);
    }
    render();

    /* üst sol: türetme */
    const der = K.g(svg, 0, 0, { o: 1 });
    const lines = [
      ['{b a}{e^ x}{t  · }{b a}{e^ x}{t  = }{b a}', 44, 58, false],
      ['{b a}{e^ x+x}{t  = }{b a}{e^ 1}', 44, 120, false],
      ['{e 2x}{t  = }{e 1}', 44, 182, false],
      ['{g x = 1/2}', 52, 250, false],
      ['{t Demek ki: }{b a}{e^ 1/2}{t  = }{k √a}', 40, 322, true],
    ].map(([spec, size, y, frame]) => {
      const g = K.g(der, 0, 0, { o: 0 });
      if (frame) { S('rect', { x: 52, y: y - 34, width: 540, height: 68, rx: 16, fill: 'rgba(182,156,255,.12)', stroke: C.root, 'stroke-width': 3 }, g); }
      K.rich(g, 322, y, size, spec);
      return g;
    });

    const p1 = nf(c.say('Başta üs 0, sonda üs 1. Tam ortada üs <b>yarım</b>.', { ms: 7600, speak: 'Ortadaki noktada üs ne olur? Başlangıçta üs sıfır, a üzeri sıfır bir. Sonda üs bir, a üzeri bir a. Tam ortada üs, sıfır ile birin ortası: yarım.' }));
    await K.fade(axis, 1, 600);
    await par(...[0, 2].map((i) => c.tween(700, (t) => { bars[i].setAttribute('opacity', t); vals[i].setAttribute('opacity', t); })));
    await c.wait(400);
    /* tutamaç 0 → 1 */
    K.set(handle, { o: 1 }); stem.setAttribute('opacity', 1); dot.setAttribute('opacity', 1); K.set(live, { o: 1 });
    nf(c.tween(900, (t) => curve.setAttribute('opacity', 0.9)));
    await c.tween(4200, (t) => {
      moveHandle(t);
      if (t > 0.5 && bars[1].getAttribute('opacity') === '0') { /* orta çubuk */ }
    }, ease.inOut);
    moveHandle(0.5);
    await par(c.tween(700, (t) => { bars[1].setAttribute('opacity', t); vals[1].setAttribute('opacity', t); }), K.fade(ratios, 1, 700));
    await p1;
    moveHandle(1);

    const p2 = nf(c.say('aˣ · aˣ = a ise <b>x + x = 1</b>, yani <b>x = 1/2</b>.', { ms: 7200, speak: 'Kuralla da bulabiliriz: a üzeri x çarpı a üzeri x eşittir a diyorsak, üsleri toplayınca x artı x eşittir bir olmalı. Yani x eşittir yarım.' }));
    for (let i = 0; i < 5; i++) { await K.fade(lines[i], 1, 500); await c.wait(i === 3 ? 700 : 500); }
    await p2;

    /* örnek kartlar: sağ üst */
    const p3 = nf(c.say('<b>4^(1/2) = √4 = 2</b>, <b>9^(1/2) = √9 = 3</b>, <b>2^(1/2) = √2 ≈ 1,41</b>', { ms: 8200, speak: 'Üç örnek: dört üzeri yarım, karekök dört, iki. Dokuz üzeri yarım, karekök dokuz, üç. İki üzeri yarım, karekök iki, yaklaşık bir virgül dört bir. Her biri eşit iki adımda birden a ya gider.' }));
    await K.fade(der, 0.18, 500);
    const exs = [[4, 2], [9, 3], [2, Math.SQRT2]];
    const exG = exs.map(([a, r], i) => {
      const y = 24 + i * 106;
      const g = K.g(svg, 0, 0, { o: 0 });
      K.card(g, 640, y, 600, 98, { fill: 'rgba(182,156,255,.07)', stroke: 'rgba(182,156,255,.35)' });
      const integer = Number.isInteger(r);
      K.rich(g, 664, y + 30, 32, `{b ${a}}{e^ 1/2}{t  = }{k √${a}}{t  = }{g ${integer ? r : '≈ ' + fmt(r)}}`, { a: 'start' });
      const r2 = Math.round(r * 100) / 100;
      K.rich(g, 664, y + 72, 26, integer ? `{s kontrol: }{t ${r} · ${r} = }{b ${a}}` : `{s kontrol: }{t ${fmt(r2)} · ${fmt(r2)} ≈ ${fmt(Math.round(r2 * r2 * 100) / 100)} ≈ }{b ${a}}`, { a: 'start' });
      const nx = [1048, 1120, 1192];
      const labs = ['1', integer ? String(r) : '√' + a, String(a)];
      nx.forEach((x, k) => {
        S('circle', { cx: x, cy: y + 66, r: 25, fill: C.panel2, stroke: k === 1 ? C.root : C.base, 'stroke-width': 3 }, g);
        K.t(g, x, y + 66, labs[k], { size: 26, fill: k === 1 ? C.root : C.base, w: 800 });
      });
      [0, 1].forEach((k) => K.arrow(g, nx[k] + 28, y + 66, nx[k + 1] - 30, y + 66, C.back, 3));
      K.t(g, 1120, y + 24, '1  →  ?  →  ' + a, { size: 26, fill: C.back, w: 800 });
      return g;
    });
    await K.stagger(exG, 1100, (g) => K.fade(g, 1, 500));
    await p3;
    await c.wait(400);

    /* geri bağlama */
    await par(K.fade(exG, 0, 500), K.fade(der, 0, 500));
    const p4 = nf(c.say(`<b>${RT(P(2, 10))} = (${P(2, 10)})<sup>1/2</sup> = 2<sup>10·1/2</sup> = ${P(2, 5)}</b> = 32: üsler çarpılır.`, { ms: 7600, speak: 'Dersin başındaki örneğe dönelim: karekök iki üzeri on, parantez iki üzeri on, üzeri yarım, eşittir iki üzeri on çarpı yarım, yani iki üzeri beş, otuz iki. [excited] İşte üsler çarpılır kuralı!' }));
    const back = mixLine(K, svg, 660, 110, 54, [{ r: '{b 2}{e^ 10}' }, '{t  = (}{b 2}{e^ 10}{t )}{k^ 1/2}{t  = }{b 2}{e^ 10·1/2}{t  = }{b 2}{e^ 5}{t  = }{g 32}'], { o: 0 });
    await K.fade(back, 1, 700);
    const arr = K.g(svg, 0, 0, { o: 0 });
    S('path', { d: 'M560,150 Q640,205 740,150', fill: 'none', stroke: C.root, 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': K.mk(C.root) }, arr);
    K.t(arr, 650, 214, 'üsler çarpılır', { size: 28, fill: C.root, w: 800 });
    await K.fade(arr, 1, 500);
    await p4;
    const warn = K.g(svg, 0, 0, { o: 0 });
    K.rich(warn, 640, 292, 30, '{s a ≥ 0 olmalı: gerçel sayılarda hiçbir sayının karesi negatif olmaz,}');
    K.rich(warn, 640, 336, 30, '{s bu yüzden }{w √(−4)}{s  tanımsızdır.}');
    await K.fade(warn, 1, 600);
    await c.wait(1800);

    /* tahmin */
    await c.choice({
      q: Pc(16, '1/2') + ' = ?',
      options: ['8', '4', '32', '256'], answer: 1,
      hints: [
        '1/2\'yi "yarısı" sanmışsın (16 ÷ 2). Üs 1/2 ise, <b>iki kez çarpınca</b> 16 verecek sayıyı arıyoruz: 4·4 = 16.', '',
        '16·2 yapmışsın. Üs çarpan değil, sayaçtır; 1/2 sayaç yarım adım demektir.',
        '16² ile karıştırdın. Üs 1/2, 2 değil: kök alıyoruz, kare değil.'],
      right: 'Doğru: 16^(1/2) = √16 = 4 çünkü 4·4 = 16.',
    });

    /* seçici: a = 2, 4, 9, 16 */
    await K.fade([back, arr, warn], 0, 500);
    K.set(der, { o: 0 });
    const hint = K.t(svg, 640, 262, 'Tutamacı sürükle ya da a\'yı değiştir', { size: 32, fill: C.soft, w: 700, o: 0 });
    let topF = null;
    const drawTop = () => {
      if (topF) topF.remove();
      const r = Math.sqrt(A);
      topF = mixLine(K, svg, 640, 130, 68, [{ r: `{b ${A}}` }, '{t  = }', `{b ${A}}{k^ 1/2}`, `{t  = }{k ${Number.isInteger(r) ? r : '≈ ' + fmt(r)}}`]);
    };
    drawTop();
    await c.tween(500, (t) => hint.setAttribute('opacity', t));
    const rowB = h('div', { class: 'row' }, h('span', { class: 'lbl' }, 'a ='));
    let moves = 0, gt = null;
    [2, 4, 9, 16].forEach((a) => {
      const b = kbtn(String(a), () => {
        A = a; render(); drawTop();
        [...rowB.querySelectorAll('.kb')].forEach((x) => x.classList.toggle('on', x === b));
        moveHandle(0.5);
        moves++; if (moves >= 2 && gt) gt.done();
      }, a === 4 ? 'on' : '');
      rowB.appendChild(b);
    });
    c.panel('Seçici', rowB);
    gt = gate(c, 'Atla ›');
    K.drag(handle, {
      down: () => { handle._tk = (handle._tk || 0) + 1; },
      move: (p) => { let x = clamp((p.x - AX0) / (AX1 - AX0), 0, 1); if (Math.abs(x - 0.5) < 0.03) x = 0.5; moveHandle(x); },
      up: () => { moves++; if (moves >= 2 && gt) gt.done(); },
    });
    c.say('Seçtiğin <b>a</b> için tutamacı ortaya getir: orta değer her zaman <b>√a</b>.', { noWait: true });
    moveHandle(0.5);
    await gt.wait;
    c.note(`<b>√a = a<sup>1/2</sup></b> &nbsp;(a ≥ 0)<br>√4 = 2, √9 = 3, √16 = 4`, 'Kök = yarım üs');
  }

  /* ============================================================
     SAHNE 10 — Köklerle çarpma ve sadeleştirme (çiftler dışarı)
     ============================================================ */
  async function scene10(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const U = 44;

    /* ---- Bölüm A: çarpma kuralı ---- */
    const A = K.g(svg, 0, 0, { o: 0 });
    const gridRect = (p, x, y, w, hgt, n, m, fill, stroke) => {
      const g = K.g(p);
      S('rect', { x, y, width: w, height: hgt, fill, stroke, 'stroke-width': 3, rx: 4 }, g);
      for (let i = 1; i < n; i++) K.line(g, x + w * i / n, y, x + w * i / n, y + hgt, stroke, 1, { dash: '3 4' });
      for (let j = 1; j < m; j++) K.line(g, x, y + hgt * j / m, x + w, y + hgt * j / m, stroke, 1, { dash: '3 4' });
      return g;
    };
    const sqA = gridRect(A, 70, 190, 2 * U, 2 * U, 2, 2, 'rgba(77,208,225,.18)', C.exp);
    const sqB = gridRect(A, 210, 146, 3 * U, 3 * U, 3, 3, 'rgba(77,208,225,.18)', C.exp);
    K.t(A, 70 + U, 190 + U, '4', { size: 36, fill: C.exp, w: 800 });
    K.t(A, 210 + 1.5 * U, 146 + 1.5 * U, '9', { size: 40, fill: C.exp, w: 800 });
    mixLine(K, A, 114, 310, 30, [{ r: '{t 4}' }, '{t  = 2}']);
    mixLine(K, A, 278, 310, 30, [{ r: '{t 9}' }, '{t  = 3}']);
    K.t(A, 190, 120, 'alanı 4 ve 9 olan kareler', { size: 26, fill: C.soft });
    const rectG = K.g(svg, 0, 0, { o: 0 });
    const rectBody = gridRect(rectG, 520, 190, 3 * U, 2 * U, 3, 2, 'rgba(255,164,92,.16)', C.back);
    K.t(rectG, 520 + 1.5 * U, 190 + U, '6', { size: 44, fill: C.back, w: 800 });
    K.t(rectG, 520 + 1.5 * U, 190 + 2 * U + 30, '3', { size: 30, fill: C.exp, w: 800 });
    K.t(rectG, 520 + 3 * U + 24, 190 + U, '2', { size: 30, fill: C.exp, w: 800 });
    K.t(rectG, 520 + 1.5 * U, 146, 'kenarlar 2 ve 3: alan 6', { size: 26, fill: C.soft });
    const bigG = K.g(svg, 0, 0, { o: 0 });
    gridRect(bigG, 880, 96, 6 * 40, 6 * 40, 6, 6, 'rgba(182,156,255,.14)', C.root);
    K.t(bigG, 880 + 120, 96 + 120, '36', { size: 64, fill: C.root, w: 800 });
    K.rich(bigG, 1000, 96 + 240 + 34, 36, '{k 6}{k^ 2}{t  = }{k 36}{t  = 4 · 9}');

    const pA = nf(c.say('<b>√4 · √9</b> = 4^(1/2)·9^(1/2) = (4·9)^(1/2) = <b>√36 = 6</b>. Gerçekten 2·3 = 6.', { ms: 10000, speak: 'Kökün üs olduğunu biliyoruz. O hâlde karekök dört çarpı karekök dokuz, dört üzeri yarım çarpı dokuz üzeri yarım. Çarpımın üssü kuralı: bunu dört çarpı dokuz, üzeri yarım yapabiliriz, yani karekök otuz altı, altı. [excited] Gerçekten de iki çarpı üç altı!' }));
    await K.fade(A, 1, 700);
    await c.wait(1200);
    await K.fade(rectG, 1, 800);
    await c.wait(1200);
    await K.fade(bigG, 1, 800);
    const e1 = mixLine(K, svg, 500, 430, 46, [{ r: '{t 4}' }, '{t  · }', { r: '{t 9}' }, '{t  = }{t 2 · 3 = }{g 6}{t  = }', { r: '{t 36}' }], { o: 0 });
    await K.fade(e1, 1, 600);
    await pA;

    const rule = mixLine(K, svg, 640, 530, 58, [{ r: '{b a}' }, '{t  · }', { r: '{b b}' }, '{t  = }', { r: '{b a}{b b}' }], { o: 0 });
    const der = K.rich(svg, 640, 616, 36, '{b a}{e^ 1/2}{t  · }{b b}{e^ 1/2}{t  = (}{b ab}{t )}{k^ 1/2}', { o: 0 });
    const pB = nf(c.say('Genel kural: <b>√a · √b = √(ab)</b>', { ms: 5600, speak: 'Genel kural: karekök a çarpı karekök b eşittir karekök a b. Çünkü a üzeri yarım çarpı b üzeri yarım eşittir a b üzeri yarım.' }));
    await K.fade(rule, 1, 700);
    await c.tween(600, (t) => der.setAttribute('opacity', t));
    await pB;
    await c.wait(600);

    /* bölme */
    await K.fade([A, rectG, bigG, e1], 0, 600);
    await par(K.to(rule, { y: 110 }, 800), c.tween(800, (t) => { der.setAttribute('y', lerp(616 + 0.35 * 36, 190 + 0.35 * 36, ease.inOut(t))); }));
    const dv = mixLine(K, svg, 640, 290, 48, [{ r: '{t 36}' }, '{t  / }', { r: '{t 9}' }, '{t  = 6 / 3 = }{g 2}{t  = }', { r: '{t 4}' }, '{t  = }', { r: '{t 36 / 9}' }], { o: 0 });
    const dvRule = mixLine(K, svg, 640, 410, 56, [{ r: '{b a}' }, '{t  / }', { r: '{b b}' }, '{t  = }', { r: '{b a / b}' }], { o: 0 });
    const dvNote = K.t(svg, 640, 480, '(a, b ≥ 0 ve paydada b > 0)', { size: 28, fill: C.soft, o: 0 });
    const pC = nf(c.say('Bölmede de aynı: <b>√36 / √9 = √4 = 2</b>. Yani √a / √b = √(a/b).', { ms: 5600, speak: 'Bölme için de aynı: karekök otuz altı bölü karekök dokuz, altı bölü üç, iki; karekök dörde eşit, yani karekök otuz altı bölü dokuz. Yani karekök a bölü karekök b eşittir karekök a bölü b.' }));
    await K.fade(dv, 1, 700);
    await c.wait(900);
    await K.fade(dvRule, 1, 700);
    await c.tween(500, (t) => dvNote.setAttribute('opacity', t));
    await pC;
    await c.wait(600);

    /* tahmin */
    await c.choice({
      q: RT(2) + ' · ' + RT(8) + ' = ?',
      options: [RT(10), '4', '16', '8'], answer: 1,
      hints: [
        '2 + 8 mi yaptın? Kök çarpmayı korur, toplamayı değil: √2·√8 = √(2·8) = √16.', '',
        '2·8 = 16 doğru ama bu kökün <b>içindeki</b> sayı. √16\'yı da almalısın: 4.',
        '√16 = 16/2 mi? Kök yarısı değildir. 4·4 = 16, yani √16 = 4.'],
      right: 'Doğru: √2·√8 = √16 = 4.',
    });

    /* ---- Bölüm B: çiftler dışarı ---- */
    await K.fade([dv, dvRule, dvNote, rule, der], 0, 600);
    [dv, dvRule, dvNote, rule, der].forEach((e) => e.remove());
    const hd = mixLine(K, svg, 640, 78, 70, [{ r: '{t 72}' }], { o: 0 });
    const cap = K.rich(svg, 640, 168, 38, '{t 72 = 8 · 9}', { o: 0 });
    const pD = nf(c.say('√72 = √(2·2·2·3·3): <b>çiftler</b> dışarı çıkar, tek kalan içeride.', { ms: 8200, speak: 'Sadeleştirmek için sayıyı asal çarpanlarına ayır: karekök yetmiş iki, karekök iki çarpı iki çarpı iki çarpı üç çarpı üç. İkişerli çiftler kökten dışarı çıkar, çift olmayan içeride kalır.' }));
    await K.fade(hd, 1, 600);
    await c.tween(500, (t) => cap.setAttribute('opacity', t));
    await c.wait(700);
    const capNew = K.rich(svg, 640, 168, 38, '{t 72 = 8 · 9 = (}{b 2·2·2}{t )·(}{u 3·3}{t )}');
    cap.remove();
    const rc = rootChips(K, c, { x1: 400, cy: 300, factors: [2, 2, 2, 3, 3] });
    await rc.show();
    await pD;

    const pE = nf(c.say('(2,2) → 2 ve (3,3) → 3. Dışarıda 2·3 = <b>6</b>, içeride 2: <b>6√2</b>.', { ms: 6600, speak: 'Çiftler: iki iki, dışarı iki; üç üç, dışarı üç. Dışarı iki çarpı üç, yani altı çıktı, içeride tek bir iki kaldı: altı karekök iki.' }));
    const [c0, c1, c2, c3, c4] = rc.inner.slice();
    await rc.pairOut(c0, c1);
    await c.wait(300);
    await rc.pairOut(c3, c4);
    await c.wait(300);
    const prod = await rc.combine();
    const mult = K.rich(svg, 640, 404, 36, `{b 2}{t  · }{u 3}{t  = }{g ${prod}}`, { o: 0 });
    await c.tween(500, (t) => mult.setAttribute('opacity', t));
    await pE;
    const res = mixLine(K, svg, 640, 480, 70, [{ r: '{t 72}' }, '{t  = }{g 6}', { r: '{t 2}', col: C.root }], { o: 0 });
    await K.fade(res, 1, 700);
    /* sayısal doğrulama */
    const val = Math.sqrt(72);
    const chk = mixLine(K, svg, 640, 560, 36, [{ r: '{t 72}' }, `{t  ≈ ${fmt(val)}      ve      6}`, { r: '{t 2}' }, `{t  ≈ ${fmt(6 * Math.SQRT2)}}`], { o: 0 });
    await K.fade(chk, 1, 600);
    /* aynı sayı doğrusu noktası */
    const nlg = K.g(svg, 0, 0, { o: 0 });
    const nxx = (v) => 440 + (v - 8) * 400;
    K.line(nlg, nxx(8) - 20, 656, nxx(9) + 20, 656, C.soft, 4);
    [8, 8.5, 9].forEach((v) => { K.line(nlg, nxx(v), 646, nxx(v), 666, C.soft, 3); K.t(nlg, nxx(v), 692, fmt(v), { size: 26, fill: C.soft, w: 700 }); });
    S('circle', { cx: nxx(val), cy: 656, r: 11, fill: C.root, stroke: '#fff', 'stroke-width': 3 }, nlg);
    K.pill(nlg, nxx(val), 618, `√72 = 6√2 ≈ ${fmt(val)}`, C.root, 24);
    await K.fade(nlg, 1, 600);
    await c.wait(1800);

    /* ---- ikinci örnek: √50 ---- */
    await K.fade([hd, capNew, rc.g, mult, res, chk, nlg], 0, 600);
    [hd, capNew, rc.g, mult, res, chk, nlg].forEach((e) => e.remove());
    const hd2 = mixLine(K, svg, 640, 100, 66, [{ r: '{t 50}' }, '{t  = }', { r: '{b 2}{t ·}{t 5}{t ·}{t 5}' }], { o: 0 });
    const rc2 = rootChips(K, c, { x1: 470, cy: 280, factors: [2, 5, 5], scale: 1 });
    const pF = nf(c.say('<b>√50 = √(2·5·5) = 5√2</b>', { ms: 5400, speak: 'İkinci örnek: karekök elli, karekök iki çarpı beş çarpı beş, beş karekök iki. Çift beş beş, dışarı beş; iki içeride kalır.' }));
    await par(K.fade(hd2, 1, 500));
    await rc2.show();
    const [q0, q1, q2] = rc2.inner.slice();
    await rc2.pairOut(q1, q2);
    const res2 = mixLine(K, svg, 640, 470, 64, [{ r: '{t 50}' }, '{t  = }{g 5}', { r: '{t 2}' }], { o: 0 });
    await K.fade(res2, 1, 600);
    await pF;
    await c.wait(900);

    /* ---- ters yön: 3√2 = √18 ---- */
    await K.fade([hd2, rc2.g, res2], 0, 600);
    [hd2, rc2.g, res2].forEach((e) => e.remove());
    const hd3b = mixLine(K, svg, 640, 100, 66, ['{u 3}', { r: '{t 2}' }, '{t  = ?}'], { o: 0 });
    const rc3 = rootChips(K, c, { x1: 560, cy: 280, factors: [2] });
    const pG = nf(c.say('Ters yön: dışarıdaki 3 içeri <b>iki kopya</b> girer: 3√2 = √18.', { ms: 6200, speak: 'Ters yön: dışarıdaki üç, kökün içine iki kopya hâlinde girer: üç karekök iki, karekök üç çarpı üç çarpı iki, karekök on sekiz.' }));
    await par(K.fade(hd3b, 1, 500), rc3.show());
    const outer = rc3.mkChip(3, rc3.outX(0), 280);
    rc3.out.push(outer);
    await K.to(outer, { s: 1, o: 1 }, 400, ease.back);
    await c.wait(700);
    await rc3.absorb(outer);
    const res3 = mixLine(K, svg, 640, 440, 54, ['{u 3}', { r: '{t 2}' }, '{t  = }', { r: '{u 3}{t ·}{u 3}{t ·}{t 2}' }, '{t  = }', { r: '{u 3}{u^ 2}{t ·2}' }, '{t  = }', { r: '{g 18}' }], { o: 0 });
    await K.fade(res3, 1, 700);
    const trap = K.rich(svg, 640, 540, 32, `{w 3}{w √2}{w  = √6  ✗}`, { o: 0 });
    const trap2 = K.t(svg, 640, 592, '3·2 = 6 değil: 3 çifti içeri girerse 3² = 9 olur, 9·2 = 18.', { size: 28, fill: C.bad, w: 700, o: 0 });
    await c.tween(600, (t) => { trap.setAttribute('opacity', t); trap2.setAttribute('opacity', t); });
    await pG;
    await c.wait(1600);

    /* ---- etkileşim: √48 ---- */
    await K.fade([hd3b, rc3.g, res3, trap, trap2], 0, 600);
    [hd3b, rc3.g, res3, trap, trap2].forEach((e) => e.remove());
    const hd4 = mixLine(K, svg, 640, 90, 66, [{ r: '{t 48}' }, '{t  = }', { r: '{t 2·2·2·2·3}' }], { o: 0 });
    const rc4 = rootChips(K, c, { x1: 420, cy: 280, factors: [2, 2, 2, 2, 3] });
    c.say('<b>√48</b> sende: aynı sayıdan iki taneyi eşleştir.', { noWait: true, speak: 'Karekök kırk sekizi sen sadeleştir: aynı sayıdan iki tane olan çipleri sırayla dokun ya da birini diğerinin üstüne sürükle.' });
    await par(K.fade(hd4, 1, 500), rc4.show());
    const fb = h('div', { class: 'fb info', html: 'İki aynı chip\'i eşleştir: dokun, sonra diğerine dokun.' });
    let pairs = 0, busy = false, selChip = null, done = false;
    const maxPairs = 2;
    const resultG = K.g(svg, 0, 0, { o: 0 });
    const setRing = (ch, on) => ch._ring.setAttribute('opacity', on ? 1 : 0);
    async function attempt(a, b) {
      if (busy || done || a === b || !rc4.inner.includes(a) || !rc4.inner.includes(b)) return;
      if (a._v !== b._v) {
        busy = true; setRing(a, false);
        c.feedback(fb, 'no', 'Çift, <b>aynı</b> sayıdan iki tane olmalı.');
        ding(false);
        await par(K.shake(a), K.shake(b));
        selChip = null; busy = false; return;
      }
      busy = true; selChip = null;
      await rc4.pairOut(a, b);
      pairs++;
      c.feedback(fb, 'info', `${pairs}. çift dışarı çıktı. Dışarıdaki: ${rc4.out.map((q) => q._v).join(' · ')}.`);
      busy = false;
    }
    rc4.inner.slice().forEach((ch) => {
      ch.style.cursor = 'pointer';
      K.drag(ch, {
        down: () => { ch._tk = (ch._tk || 0) + 1; ch._dragging = true; },
        move: (p) => { if (busy || !ch._dragging) return; K.set(ch, { x: p.x, y: p.y }); },
        up: (p, moved) => {
          ch._dragging = false;
          if (busy || done || !rc4.inner.includes(ch)) return;
          if (!moved) {
            if (selChip === ch) { setRing(ch, false); selChip = null; }
            else if (selChip) { const a = selChip; setRing(a, false); nf(attempt(a, ch)); }
            else { selChip = ch; setRing(ch, true); }
            return;
          }
          const hit = rc4.inner.find((o2) => o2 !== ch && Math.hypot(o2._x - p.x, o2._y - p.y) < rc4.R * 1.6);
          if (hit) { setRing(ch, false); setRing(hit, false); selChip = null; nf(Promise.resolve(rc4.relayout(1)).then(() => attempt(ch, hit))); }
          else { nf(K.goto(ch, rc4.innerX(rc4.inner.indexOf(ch)), rc4.cy, 350)); }
        },
      });
    });
    const gt = gate(c, 'Atla ›');
    const check = kbtn('Bitirdim, kontrol et', async () => {
      if (busy || done) return;
      if (pairs === 0) { c.feedback(fb, 'no', 'Henüz çift çıkarmadın. 48 = 2·2·2·2·3 içinde aynı sayıdan iki tane olanları bul.'); ding(false); return; }
      if (pairs < maxPairs) { const inn = rc4.inner.map((q) => q._v); c.feedback(fb, 'no', `${rc4.out.map((q) => q._v).reduce((s, v) => s * v, 1)}√${inn.reduce((s, v) => s * v, 1)} hâlinde hâlâ çift var: ${inn.reduce((s, v) => s * v, 1)} = ${inn.join('·')}. <b>Devam et.</b>`); ding(false); return; }
      done = true; busy = true;
      const prod = await rc4.combine();
      c.feedback(fb, 'ok', `Doğru: <b>√48 = ${prod}√3</b> ✓ (${prod}² · 3 = ${prod * prod * 3} = 48).`);
      ding(true);
      const rr = mixLine(K, svg, 640, 470, 70, [{ r: '{t 48}' }, `{t  = }{g ${prod}}`, { r: '{t 3}' }], { o: 0 });
      await K.fade(rr, 1, 700);
      const ck = K.rich(svg, 640, 550, 34, `{t ${prod}² · 3 = ${prod * prod} · 3 = }{g ${prod * prod * 3}}{g  ✓}`, { o: 0 });
      await c.tween(500, (t) => ck.setAttribute('opacity', t));
      gt.done();
    });
    const wrongBtn = kbtn('"√48 = 24" desem?', () => { c.feedback(fb, 'no', 'Kök, yarısı değildir: 24·24 = 576 ≠ 48. Çiftleri dışarı çıkar.'); ding(false); }, 'bad');
    c.panel('Sürükle / dokun', h('div', { class: 'row' }, check, wrongBtn), fb);
    c.act.appendChild(gt.el);
    await gt.wait;
    c.note(`<b>√a·√b = √(ab)</b>, &nbsp;<b>√a/√b = √(a/b)</b><br><b class="tk">Çiftler dışarı:</b> √72 = √(2·2·2·3·3) = 6√2`, 'Köklerle çarpma');
  }

  /* ---------- ortak: kesir (pay / payda mixLine parçalarından) ---------- */
  function fracMix(K, p, cx, cy, size, top, bot, o = {}) {
    const g = K.g(p, cx, cy, o);
    const t = mixLine(K, g, 0, -size * 0.66, size, top);
    const b = mixLine(K, g, 0, size * 0.66, size, bot);
    const w = Math.max(t._w, b._w) + size * 0.4;
    K.line(g, -w / 2, 0, w / 2, 0, C.text, Math.max(3, size * 0.07));
    g._w = w;
    return g;
  }
  const sqrtBox = (K, p, x, y, n, fill) => {
    const g = K.g(p, x, y, { o: 0, s: 0 });
    K.S('rect', { x: -36, y: -28, width: 72, height: 56, rx: 12, fill: fill || 'url(#gRoot)', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 1.5 }, g);
    const r = K.rad(g, 0, 2, `{t ${n}}`, 32, { col: C.bg, fill: C.bg });
    r._x = -r._w / 2 - 1; K.place(r);
    return g;
  };

  /* ============================================================
     SAHNE 11 — Köklerle toplama ve paydayı rasyonel yapma
     ============================================================ */
  async function scene11(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();

    /* ---- Bölüm A1: 3√2 + 5√2 ---- */
    const g1 = K.g(svg);
    const L = [0, 1, 2].map((i) => sqrtBox(K, g1, 140 + i * 84, 150, 2));
    const R = [0, 1, 2, 3, 4].map((i) => sqrtBox(K, g1, 476 + i * 84, 150, 2));
    const plus = K.g(g1, 392, 150, { o: 0 }); K.t(plus, 0, 0, '+', { size: 54, fill: C.text, w: 800 });
    const lab1 = mixLine(K, g1, 640, 250, 56, ['{u 3}', { r: '{t 2}' }, '{t  + }{u 5}', { r: '{t 2}' }], { o: 0 });
    const p1 = nf(c.say('<b>3√2 + 5√2 = 8√2</b>: 3 elma + 5 elma gibi. √2 + √3 ise birleşmez.', { ms: 8800, speak: 'Üç karekök iki artı beş karekök iki nedir? Karekök ikiyi bir birim gibi düşün, tıpkı üç elma artı beş elma eşittir sekiz elma gibi: sekiz karekök iki. Ama karekök iki artı karekök üç, elma artı armut gibi birleşmez.' }));
    await par(K.stagger(L, 110, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)), K.stagger(R, 110, (b) => K.to(b, { s: 1, o: 1 }, 350, ease.back)), K.fade(plus, 1, 500), K.fade(lab1, 1, 600));
    await c.wait(900);
    const xm = (i) => 640 + (i - 3.5) * 84;
    await par(K.stagger([...L, ...R], 0, (b, i) => K.to(b, { x: xm(i) }, 900, ease.inOut)), K.fade(plus, 0, 400));
    const eq8 = mixLine(K, g1, 640, 345, 62, ['{t = }{g 8}', { r: '{t 2}', col: C.ok }], { o: 0 });
    const br = K.brace(g1, xm(0) - 40, xm(7) + 40, 192, C.exp, 1, 14, 4);
    br.setAttribute('opacity', 0);
    await par(K.fade(eq8, 1, 600), K.fade(br, 1, 600));
    const rl = K.rich(g1, 640, 432, 34, '{e katsayılar toplanır}{t , }{k kök aynı kalır}', { o: 0 });
    await c.tween(500, (t) => rl.setAttribute('opacity', t));
    await p1;
    await c.wait(800);

    /* √2 + √3: birleşmez */
    await K.fade(g1, 0, 500); g1.remove();
    const g2 = K.g(svg);
    const b2 = sqrtBox(K, g2, 470, 200, 2), b3 = sqrtBox(K, g2, 810, 200, 3, 'url(#gLime)');
    const pl2 = K.t(g2, 640, 200, '+', { size: 54, fill: C.text, w: 800 });
    await par(K.to(b2, { s: 1, o: 1 }, 400, ease.back), K.to(b3, { s: 1, o: 1 }, 400, ease.back));
    await c.wait(500);
    await par(K.to(b2, { x: 580 }, 600), K.to(b3, { x: 700 }, 600), c.tween(300, (t) => pl2.setAttribute('opacity', 1 - t)));
    K.t(g2, 640, 200, '✗', { size: 64, fill: C.bad, w: 800 });
    await par(K.shake(b2), K.shake(b3));
    await par(K.to(b2, { x: 470 }, 600, ease.out), K.to(b3, { x: 810 }, 600, ease.out));
    K.rich(g2, 640, 290, 38, '{t farklı kök → }{w birleşmez}{t : elma + armut}');
    await c.wait(1600);
    await K.fade(g2, 0, 500); g2.remove();

    /* ---- A3: √8 + √18 ---- */
    const p2 = nf(c.say('Önce sadeleştir: √8 = 2√2, √18 = 3√2. Sonra topla: <b>5√2</b>.', { ms: 9200, speak: 'Karekök sekiz artı karekök on sekiz birleşmiyor gibi görünür, çünkü kök içleri farklı. Önce sadeleştir: karekök sekiz iki karekök iki, karekök on sekiz üç karekök iki. Şimdi hepsi karekök ikinin elması: iki karekök iki artı üç karekök iki eşittir beş karekök iki.' }));
    const hl = mixLine(K, svg, 350, 80, 50, [{ r: '{t 8}' }, '{t  = }', { r: '{b 2·2·2}' }], { o: 0 });
    const hr = mixLine(K, svg, 850, 80, 50, [{ r: '{t 18}' }, '{t  = }', { r: '{b 2}{u ·3·3}' }], { o: 0 });
    const rcA = rootChips(K, c, { x1: 260, cy: 220, factors: [2, 2, 2], scale: 0.85 });
    const rcB = rootChips(K, c, { x1: 760, cy: 220, factors: [2, 3, 3], scale: 0.85 });
    const plus3 = K.t(svg, 600, 220, '+', { size: 54, fill: C.text, w: 800 });
    await par(K.fade([hl, hr], 1, 500), rcA.show(), rcB.show());
    await c.wait(500);
    const [a0, a1] = rcA.inner.slice(0, 2);
    const [b1, b2c] = rcB.inner.slice(1, 3);
    await par(rcA.pairOut(a0, a1), rcB.pairOut(b1, b2c));
    const fin = mixLine(K, svg, 640, 380, 62, ['{u 2}', { r: '{t 2}' }, '{t  + }{u 3}', { r: '{t 2}' }, '{t  = }{g 5}', { r: '{t 2}', col: C.ok }], { o: 0 });
    await K.fade(fin, 1, 700);
    const v8 = Math.sqrt(8), v18 = Math.sqrt(18);
    const num = mixLine(K, svg, 640, 470, 36, [{ r: '{t 8}' }, '{t  + }', { r: '{t 18}' }, `{t  ≈ ${fmt(v8)} + ${fmt(v18)} = }{g ${fmt(v8 + v18)}}{t  ≈ 5}`, { r: '{t 2}' }, `{t  ≈ ${fmt(5 * Math.SQRT2)}}`], { o: 0 });
    await K.fade(num, 1, 600);
    await p2;
    const trap = mixLine(K, svg, 640, 560, 38, [{ r: '{w 8}{w +18}', col: C.bad }, '{w  = }', { r: '{w 26}', col: C.bad }, `{w  ✗}{s    (}`, { r: '{s 26}', col: C.soft }, `{s  ≈ ${fmt(Math.sqrt(26))} ≠ ${fmt(v8 + v18)})}`], { o: 0 });
    const trapNote = K.t(svg, 640, 610, 'Toplama kökün içinde yapılmaz!', { size: 30, fill: C.bad, w: 700, o: 0 });
    await par(K.fade(trap, 1, 600), c.tween(600, (t) => trapNote.setAttribute('opacity', t)));
    await c.wait(2400);
    await K.fade([hl, hr, rcA.g, rcB.g, fin, num, trap, trapNote, plus3], 0, 600);
    plus3.remove();
    [hl, hr, rcA.g, rcB.g, fin, num, trap, trapNote].forEach((e) => e.remove());

    /* ---- Sınıflandır: elma-armut sepetleri ---- */
    const sortG = K.g(svg, 0, 0, { o: 0 });
    K.t(sortG, 640, 50, 'Chip\'leri doğru sepete sürükle (ya da dokun)', { size: 30, fill: C.soft });
    const baskets = [
      { rad: 2, x: 130, y: 300, w: 480, h: 280, title: '√2 elmaları', col: C.root, fill: 'rgba(182,156,255,.1)' },
      { rad: 3, x: 670, y: 300, w: 480, h: 280, title: '√3 armutları', col: C.lime, fill: 'rgba(168,230,161,.1)' },
    ];
    baskets.forEach((b) => {
      b.g = K.g(sortG);
      K.card(b.g, b.x, b.y, b.w, b.h, { fill: b.fill, stroke: b.col, sw: 3, dash: '12 8' });
      K.t(b.g, b.x + b.w / 2, b.y + 36, b.title, { size: 34, fill: b.col, w: 800 });
      b.items = []; b.sum = 0; b.sumG = K.g(b.g, b.x + b.w / 2, b.y + b.h - 40);
    });
    const chipsDef = [[3, 2], [5, 2], [2, 3], [1, 2], [4, 3]];
    const chipG = [];
    const homeP = (i) => [190 + i * 225, 160];
    chipsDef.forEach(([k, r], i) => {
      const [hx, hy] = homeP(i);
      const g = K.g(svg, hx, hy);
      S('rect', { x: -66, y: -34, width: 132, height: 68, rx: 18, fill: C.panel2, stroke: 'rgba(255,255,255,.3)', 'stroke-width': 2, filter: 'url(#shadow)' }, g);
      g._box = g.lastChild;
      const ml = mixLine(K, g, 0, 2, 44, [k === 1 ? '' : `{t ${k}}`, { r: `{t ${r}}` }]);
      g._k = k; g._r = r; g._home = [hx, hy]; g._placed = false; g._sel = false;
      chipG.push(g);
    });
    const fb = h('div', { class: 'fb info', html: 'Aynı kökten olanlar aynı sepete. Farklı kökler birleşmez.' });
    const totals = () => baskets.forEach((b) => {
      b.sumG.innerHTML = '';
      if (b.sum > 0) mixLine(K, b.sumG, 0, 0, 44, [`{g ${b.sum === 1 ? '' : b.sum}}`, { r: `{t ${b.rad}}`, col: C.ok }]);
    });
    let placedN = 0, sel = null, gt = null;
    const setSel = (g) => { if (sel) sel._box.setAttribute('stroke', 'rgba(255,255,255,.3)'); sel = g; if (g) g._box.setAttribute('stroke', C.exp); };
    async function drop(g, b) {
      if (g._placed) return;
      if (b.rad !== g._r) {
        ding(false);
        c.feedback(fb, 'no', `${g._k === 1 ? '' : g._k}√${g._r} bir <b>√${g._r}</b> terimidir; <b>√${b.rad}</b> sepetine girmez. Farklı kökler birleşmez.`);
        g._box.setAttribute('stroke', C.bad);
        await K.goto(g, g._home[0], g._home[1], 600, ease.bounce);
        g._box.setAttribute('stroke', 'rgba(255,255,255,.3)');
        return;
      }
      g._placed = true; placedN++;
      b.items.push(g); b.sum += g._k;
      const idx = b.items.length - 1;
      const tx = b.x + 100 + (idx % 3) * 140, ty = b.y + 110 + Math.floor(idx / 3) * 80;
      await K.goto(g, tx, ty, 420, ease.out);
      g._box.setAttribute('stroke', b.col);
      ding(true);
      totals();
      c.feedback(fb, 'ok', `${g._k === 1 ? '' : g._k}√${g._r} → <b>√${g._r}</b> sepeti.`);
      if (placedN === chipsDef.length) {
        c.feedback(fb, 'ok', `Harika! <b>3+5+1 = 9</b> tane √2 → <b>9√2</b>, <b>2+4 = 6</b> tane √3 → <b>6√3</b>. Elmalar elmalarla, armutlar armutlarla toplanır.`);
        gt && gt.done();
      }
    }
    await K.fade(sortG, 1, 500);
    c.say('Aynı kökleri aynı sepete koy; toplam canlı yazılır.', { noWait: true, speak: 'Sınıflandır: üç karekök iki, beş karekök iki, karekök iki aynı elma; iki karekök üç, dört karekök üç aynı armut. Her sepetin toplamı canlı yazılır.' });
    chipG.forEach((g) => {
      K.drag(g, {
        down: () => { g._tk = (g._tk || 0) + 1; g._drag = true; },
        move: (p) => { if (g._placed || !g._drag) return; K.set(g, { x: p.x, y: p.y }); },
        up: (p, moved) => {
          if (g._placed || !g._drag) return; g._drag = false;
          if (!moved) { setSel(sel === g ? null : g); return; }
          const b = baskets.find((q) => p.x > q.x && p.x < q.x + q.w && p.y > q.y && p.y < q.y + q.h);
          if (b) { setSel(null); nf(drop(g, b)); } else nf(K.goto(g, g._home[0], g._home[1], 380));
        },
      });
    });
    baskets.forEach((b) => c.on(b.g, 'pointerup', () => { if (sel && !sel._placed) { const g = sel; setSel(null); nf(drop(g, b)); } }));
    gt = gate(c, 'Atla ›');
    const pnlS = c.panel('Sepet', fb);
    c.act.appendChild(gt.el);
    await gt.wait;
    pnlS.remove();
    await K.fade(sortG, 0, 500); sortG.remove(); chipG.forEach((g) => g.remove());

    /* ---- Bölüm B: paydayı rasyonel yap ---- */
    const NLY = 120, nx = (v) => 200 + v * 200;
    const nl = K.g(svg, 0, 0, { o: 0 });
    K.line(nl, nx(0) - 20, NLY, nx(4) + 40, NLY, C.soft, 4);
    for (let v = 0; v <= 4; v++) { K.line(nl, nx(v), NLY - 10, nx(v), NLY + 10, C.soft, 3); K.t(nl, nx(v), NLY + 38, String(v), { size: 26, fill: C.soft, w: 700 }); }
    const val = 6 / Math.sqrt(3);
    const dotG = K.g(nl, nx(val), NLY, { o: 0 });
    S('circle', { r: 13, fill: C.root, stroke: '#fff', 'stroke-width': 3, filter: 'url(#glow)' }, dotG);
    const dotLab = K.pill(nl, nx(val), NLY - 56, `≈ ${fmt(val)}`, C.root, 28, { o: 0 });
    const p3 = nf(c.say('<b>6/√3</b>\'ü <b>√3/√3</b> ile çarp: 6√3/3 = <b>2√3</b>. Çünkü √3·√3 = 3.', { ms: 9000, speak: 'Bir de paydada kök sevmeyiz. Altı bölü karekök üçü, bire eşit olan karekök üç bölü karekök üç ile çarparız: altı karekök üç bölü üç, iki karekök üç. Neden işe yarar? Çünkü karekök üç çarpı karekök üç eşittir üç.' }));
    const EY = 330, S1 = 62;
    const f1 = fracMix(K, svg, 190, EY, S1, ['{t 6}'], [{ r: '{t 3}' }], { o: 0 });
    const frame = S('rect', { x: 190 - 56, y: EY + 0.66 * S1 - 38, width: 112, height: 76, rx: 14, fill: 'none', stroke: C.root, 'stroke-width': 3.5, opacity: 0 }, svg);
    await K.fade(nl, 1, 600);
    await par(K.fade(f1, 1, 600), K.fade(dotG, 1, 600), K.fade(dotLab, 1, 600));
    nf(c.tween(500, (t) => frame.setAttribute('opacity', t)));
    const q = K.t(svg, 190, EY + 118, 'kök payda kalsın mı?', { size: 26, fill: C.root, w: 700, o: 0 });
    await c.tween(500, (t) => q.setAttribute('opacity', t));
    await c.wait(1200);
    /* × √3/√3 */
    const mul = K.t(svg, 320, EY, '×', { size: 56, fill: C.text, w: 800, o: 0 });
    const f2 = fracMix(K, svg, 450, EY, S1, [{ r: '{t 3}' }], [{ r: '{t 3}' }], { o: 0 });
    const one = K.pill(svg, 450, EY + 92, '= 1', C.ok, 26, { o: 0 });
    const one2 = K.t(svg, 450, EY + 142, '1\'e eşit!', { size: 26, fill: C.ok, w: 700, o: 0 });
    await par(c.tween(400, (t) => mul.setAttribute('opacity', t)), K.fade(f2, 1, 600));
    nf(K.ring(450, EY, C.ok, 90, 900));
    await par(K.fade(one, 1, 500), c.tween(500, (t) => one2.setAttribute('opacity', t)));
    await c.wait(900);
    const e2 = K.t(svg, 560, EY, '=', { size: 56, fill: C.text, w: 800, o: 0 });
    const f3 = fracMix(K, svg, 710, EY, S1, ['{t 6}', { r: '{t 3}' }], [{ r: '{t 3}' }, '{t ·}', { r: '{t 3}' }], { o: 0 });
    await par(c.tween(400, (t) => e2.setAttribute('opacity', t)), K.fade(f3, 1, 700));
    const why = K.rich(svg, 710, EY + 118, 26, '{k 3}{k^ 1/2}{t · }{k 3}{k^ 1/2}{t  = }{k 3}{k^ 1}{t  = 3}', { o: 0 });
    await c.tween(500, (t) => why.setAttribute('opacity', t));
    await c.wait(900);
    const f3b = fracMix(K, svg, 710, EY, S1, ['{t 6}', { r: '{t 3}' }], ['{t 3}'], { o: 0 });
    await par(K.fade(f3, 0, 500), K.fade(f3b, 1, 500));
    const e3 = K.t(svg, 850, EY, '=', { size: 56, fill: C.text, w: 800, o: 0 });
    const res = mixLine(K, svg, 1010, EY, 66, ['{g 2}', { r: '{t 3}', col: C.ok }], { o: 0 });
    await par(c.tween(400, (t) => e3.setAttribute('opacity', t)), K.fade(res, 1, 700));
    nf(K.to(dotG, { s: 1.5 }, 400, ease.out).then(() => K.to(dotG, { s: 1 }, 400)));
    await p3;
    const ok3 = K.rich(svg, 640, 520, 30, `{s değer değişmedi: }{t 6/√3 = 2√3 ≈ }{g ${fmt(val)}}`, { o: 0 });
    await c.tween(400, (t) => ok3.setAttribute('opacity', t));
    await c.wait(1200);
    /* 1/√2 */
    const sec = K.g(svg, 0, 0, { o: 0 });
    const g1b = fracMix(K, sec, 190, 610, 48, ['{t 1}'], [{ r: '{t 2}' }]);
    K.t(sec, 290, 610, '×', { size: 46, fill: C.text, w: 800 });
    fracMix(K, sec, 400, 610, 48, [{ r: '{t 2}' }], [{ r: '{t 2}' }]);
    K.t(sec, 500, 610, '=', { size: 46, fill: C.text, w: 800 });
    fracMix(K, sec, 600, 610, 48, [{ r: '{t 2}' }], ['{t 2}'], { line: C.ok });
    K.rich(sec, 780, 610, 32, `{t ≈ }{g ${fmt(1 / Math.SQRT2)}}`, { a: 'start' });
    const bad = K.g(svg, 0, 0, { o: 0 });
    K.rich(bad, 1060, 566, 30, '{w 6/√3 = 6√3  ✗}', {});
    K.rich(bad, 1060, 612, 24, '{s yalnızca paya √3 ile çarpmak}', {});
    K.rich(bad, 1060, 644, 24, '{s değeri değiştirir (≈ 10,39)}', {});
    await par(K.fade(sec, 1, 600), K.fade(bad, 1, 600));
    await c.wait(1800);

    /* tahmin */
    await c.choice({
      q: RT(2) + ' + ' + RT(8) + ' = ?',
      options: [RT(10), '3' + RT(2), '5'], answer: 1,
      hints: ['Toplama kök içinde yapılmaz. √8\'i sadeleştir: 2√2. Sonra √2 + 2√2 = 3√2.', '',
        '√2 = 1, √8 = 4 gibi "yarısı" mı aldın? √2 ≈ 1,41 ve √8 ≈ 2,83; toplamı ≈ 4,24 = 3√2.'],
      right: 'Doğru: √2 + 2√2 = 3√2 ≈ ' + fmt(3 * Math.SQRT2) + '.',
    });
    c.note(`<b>Aynı kökler toplanır:</b> √8 + √18 = 2√2 + 3√2 = <b class="tg">5√2</b><br><b>Rasyonel payda:</b> 6/√3 = 6√3/3 = <b class="tg">2√3</b>`, 'Toplama ve rasyonel payda');
  }

  /* ============================================================
     SAHNE 12 — Tuzak: √(a+b) ≠ √a + √b
     ============================================================ */
  async function scene12(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const L = mixLine(K, svg, 330, 230, 66, [{ r: '{t 9+16}' }], { o: 0 });
    const Rr = mixLine(K, svg, 950, 230, 66, [{ r: '{t 9}' }, '{t  + }', { r: '{t 16}' }], { o: 0 });
    const qm = K.g(svg, 640, 230, { o: 0 }); K.t(qm, 0, 0, '?', { size: 90, fill: C.base, w: 800 });
    const p1 = nf(c.say('<b>√(9+16)</b> ile <b>√9 + √16</b> aynı mı?', { ms: 5000, speak: 'Şimdi en klasik tuzak. [curious] Soru: karekök dokuz artı on altı ile karekök dokuz artı karekök on altı aynı mı? Tahmin et.' }));
    await par(K.fade(L, 1, 700), K.fade(Rr, 1, 700), K.fade(qm, 1, 700));
    await p1;
    let tries = 0;
    await c.choice({
      q: RT('9+16') + ' ile ' + RT(9) + ' + ' + RT(16) + ' aynı mı?',
      options: ['Evet, kök toplamaya dağılır', 'Hayır, farklı sayılar', 'Bazen'], answer: 1,
      hints: ['Hesap yapalım: 5 ve 7 – eşit değil. Tek bir <b>karşı örnek</b>, kuralın genel olmadığını gösterir.', '',
        'Çok iyi bir sezgi! Gerçekten yalnızca özel durumda eşit (şimdi gör). Yine de bu örnekte sonuç?'],
      right: 'Doğru sezgi; şimdi kanıtlayalım.',
      onPick: () => { tries++; },
    });

    /* iki sütun hesap */
    const p2 = nf(c.say('<b>√(9+16) = 5</b>, ama <b>√9 + √16 = 7</b>. Kök <b>toplamaya dağılmaz</b>.', { ms: 8000, speak: 'Bakalım: karekök dokuz artı on altı, karekök yirmi beş, beş. Ama karekök dokuz artı karekök on altı, üç artı dört, yedi. Beş eşit değildir yedi! Kök çarpmaya dağılır ama toplamaya dağılmaz.' }));
    const cl = [
      mixLine(K, svg, 330, 340, 40, ['{t 9+16 = }{t 25}'], { o: 0 }),
      mixLine(K, svg, 330, 410, 44, [{ r: '{t 25}' }, '{t  = }{g 5}'], { o: 0 }),
    ];
    const cr = [
      mixLine(K, svg, 950, 340, 40, [{ r: '{t 9}' }, '{t  = }{u 3}{t ,   }', { r: '{t 16}' }, '{t  = }{u 4}'], { o: 0 }),
      mixLine(K, svg, 950, 410, 44, ['{u 3}{t  + }{u 4}{t  = }{w 7}'], { o: 0 }),
    ];
    for (let i = 0; i < 2; i++) { await par(K.fade(cl[i], 1, 600), K.fade(cr[i], 1, 600)); await c.wait(500); }
    const big = K.g(svg, 640, 530, { o: 0, s: 0.5 });
    K.rich(big, 0, 0, 100, '{g 5}{w  ≠ }{w 7}');
    await K.to(big, { o: 1, s: 1 }, 600, ease.back);
    await K.shake(big);
    await p2;
    await c.wait(700);

    /* geometri: kestirme yol */
    await K.fade([L, Rr, qm, ...cl, ...cr, big], 0, 600);
    const geo = K.g(svg, 0, 0, { o: 0 });
    const Ax = 440, Ay = 520, Cx = 590, Cy = 520, Bx = 590, By = 320;
    const sq9 = S('path', { d: `M${Ax},${Ay} L${Cx},${Cy} L${Cx},${Cy + 150} L${Ax},${Ay + 150} Z`, fill: 'rgba(143,184,255,.14)', stroke: C.blue, 'stroke-width': 2 }, geo);
    S('path', { d: `M${Cx},${Cy} L${Bx},${By} L${Bx + 200},${By} L${Cx + 200},${Cy} Z`, fill: 'rgba(168,230,161,.14)', stroke: C.lime, 'stroke-width': 2 }, geo);
    S('path', { d: `M${Ax},${Ay} L${Bx},${By} L${Bx - 200},${By - 150} L${Ax - 200},${Ay - 150} Z`, fill: 'rgba(182,156,255,.16)', stroke: C.root, 'stroke-width': 2 }, geo);
    K.t(geo, (Ax + Cx) / 2, Ay + 75, '9', { size: 40, fill: C.blue, w: 800 });
    K.t(geo, Cx + 100, (Cy + By) / 2 + 40, '16', { size: 44, fill: C.lime, w: 800 });
    K.t(geo, (Ax + Bx) / 2 - 100, (Ay + By) / 2 - 75, '25', { size: 44, fill: C.root, w: 800 });
    /* yollar */
    const walkH = S('line', { x1: Ax, y1: Ay, x2: Ax, y2: Ay, stroke: C.blue, 'stroke-width': 8, 'stroke-linecap': 'round' }, geo);
    const walkV = S('line', { x1: Cx, y1: Cy, x2: Cx, y2: Cy, stroke: C.lime, 'stroke-width': 8, 'stroke-linecap': 'round' }, geo);
    const cut = S('line', { x1: Ax, y1: Ay, x2: Ax, y2: Ay, stroke: C.root, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-dasharray': '2 12' }, geo);
    S('circle', { cx: Ax, cy: Ay, r: 10, fill: C.text }, geo); S('circle', { cx: Bx, cy: By, r: 10, fill: C.text }, geo);
    K.t(geo, Ax - 24, Ay + 30, 'A', { size: 30, w: 800 }); K.t(geo, Bx + 24, By - 18, 'B', { size: 30, w: 800 });
    const sideL = K.g(geo, 0, 0, { o: 0 });
    K.rich(sideL, (Ax + Cx) / 2, Ay - 30, 32, '{u 3}{t  = }{t √9}');
    K.rich(sideL, Cx + 44, (Cy + By) / 2 - 36, 32, '{m 4}{t  = √16}', { a: 'start' });
    const txt = K.g(svg, 0, 0, { o: 0 });
    K.rich(txt, 1030, 300, 36, '{u 3}{t  + }{m 4}{t  = }{w 7}', { a: 'middle' });
    K.t(txt, 1030, 250, 'Yürüyerek', { size: 28, fill: C.soft });
    K.rich(txt, 1030, 440, 36, '{k 5}{t  = }{t √(9+16)}', { a: 'middle' });
    K.t(txt, 1030, 390, 'Kestirme', { size: 28, fill: C.soft });
    const p3 = nf(c.say('Önce 3, sonra 4 yürürsen <b>7</b>; kestirmeden gidersen <b>5</b>.', { ms: 8800, speak: 'Yolculuk gibi düşün: A dan B ye önce üç birim yürü, sonra dört birim çık: yedi. Kestirme çizgisi ise yalnızca beş. Alanlar da dokuz artı on altı eşittir yirmi beş.' }));
    await K.fade(geo, 1, 700);
    await c.tween(1000, (t) => { walkH.setAttribute('x2', lerp(Ax, Cx, t)); }, ease.inOut);
    await c.tween(1100, (t) => { walkV.setAttribute('y2', lerp(Cy, By, t)); }, ease.inOut);
    await K.fade(sideL, 1, 500);
    await c.tween(1100, (t) => { cut.setAttribute('x2', lerp(Ax, Bx, t)); cut.setAttribute('y2', lerp(Ay, By, t)); }, ease.inOut);
    await K.fade(txt, 1, 600);
    const note = K.t(svg, 640, 690, 'Kenarları 3 ve 4 olan karelerin alanları 9 ve 16; kestirme üzerindeki karenin alanı da 25 (9 + 16).', { size: 26, fill: C.soft, o: 0 });
    await c.tween(500, (t) => note.setAttribute('opacity', t));
    await p3;
    await c.wait(800);

    /* üs dili */
    await K.fade([geo, sideL, txt, note], 0, 600);
    const us = K.g(svg, 0, 0, { o: 0 });
    K.rich(us, 640, 190, 60, '{t (}{b 9+16}{t )}{k^ 1/2}{w  ≠ }{b 9}{k^ 1/2}{t  + }{b 16}{k^ 1/2}');
    K.t(us, 640, 270, 'üs toplamaya dağılmaz', { size: 38, fill: C.bad, w: 800 });
    K.rich(us, 640, 380, 44, '{t (3+4)}{k^ 2}{t  = }{t 49}{w  ≠ }{t 3}{k^ 2}{t  + 4}{k^ 2}{t  = }{t 25}');
    K.t(us, 640, 440, 'aynı hata: (a+b)ⁿ ≠ aⁿ + bⁿ', { size: 30, fill: C.soft });
    const p4 = nf(c.say('Aynı hata üste de var: (3+4)² = 49, ama 3² + 4² = 25.', { ms: 6000, speak: 'Aynı hata üslerde de var: üç artı dört, bütünün karesi kırk dokuz; ama üç kare artı dört kare yirmi beş.' }));
    await K.fade(us, 1, 700);
    await p4;
    await c.wait(800);

    /* tablo */
    await K.fade(us, 0, 500);
    const tb = K.g(svg, 0, 0, { o: 0 });
    K.card(tb, 50, 60, 570, 400, { fill: 'rgba(107,227,160,.07)', stroke: C.ok });
    K.card(tb, 660, 60, 570, 400, { fill: 'rgba(255,122,112,.07)', stroke: C.bad });
    K.t(tb, 335, 104, '✓  Çarpmada işler', { size: 36, fill: C.ok, w: 800 });
    K.t(tb, 945, 104, '✗  Toplamada işlemez', { size: 36, fill: C.bad, w: 800 });
    mixLine(K, tb, 335, 190, 44, [{ r: '{b a·b}' }, '{t  = }', { r: '{b a}' }, '{t · }', { r: '{b b}' }]);
    mixLine(K, tb, 335, 280, 44, [{ r: '{b a/b}' }, '{t  = }', { r: '{b a}' }, '{t  / }', { r: '{b b}' }]);
    mixLine(K, tb, 335, 390, 32, [{ r: '{t 4·9}' }, '{t  = }', { r: '{t 36}' }, '{t  = 6 = 2·3 }{g ✓}']);
    mixLine(K, tb, 945, 190, 44, [{ r: '{b a+b}', col: C.bad }, '{w  ≠ }', { r: '{b a}', col: C.bad }, '{t  + }', { r: '{b b}', col: C.bad }]);
    mixLine(K, tb, 945, 280, 44, [{ r: '{b a−b}', col: C.bad }, '{w  ≠ }', { r: '{b a}', col: C.bad }, '{t  − }', { r: '{b b}', col: C.bad }]);
    mixLine(K, tb, 945, 390, 32, [{ r: '{t 4+9}', col: C.bad }, `{t  = }`, { r: '{t 13}', col: C.bad }, `{t  ≈ ${fmt(Math.sqrt(13))} ≠ 5 = 2+3 }{w ✗}`]);
    await K.fade(tb, 1, 700);
    const kural = K.rich(svg, 640, 560, 38, '{k Kök (kesirli üs) }{g çarpmaya}{k  dağılır, }{w toplamaya}{k  dağılmaz.}', { o: 0 });
    await c.tween(600, (t) => kural.setAttribute('opacity', t));
    await c.wait(1800);

    /* keşif paneli: a ve b */
    await K.fade([tb, kural], 0, 600);
    const vals = [0, 1, 4, 9, 16, 25];
    let ia = 3, ib = 4, found = false, gt = null;
    const ex = K.g(svg);
    const top = K.g(ex), bars = K.g(ex), res = K.g(ex);
    K.t(ex, 640, 50, 'Eşit olduğu bir (a, b) çifti bul', { size: 34, fill: C.soft, w: 700 });
    const SC = 62;
    function draw() {
      const a = vals[ia], b = vals[ib];
      top.innerHTML = ''; bars.innerHTML = ''; res.innerHTML = '';
      const l = Math.sqrt(a + b), r = Math.sqrt(a) + Math.sqrt(b);
      mixLine(K, top, 330, 140, 52, [{ r: `{b ${a}}{t +}{b ${b}}` }, `{t  = }{g ${fmt(l)}}`]);
      mixLine(K, top, 950, 140, 52, [{ r: `{b ${a}}` }, '{t  + }', { r: `{b ${b}}` }, `{t  = }{w ${fmt(r)}}`]);
      const x0 = 120;
      K.t(bars, x0, 262, '√(a+b)', { a: 'start', size: 28, fill: C.root, w: 700 });
      S('rect', { x: x0 + 110, y: 244, width: l * SC, height: 36, rx: 10, fill: 'url(#gRoot)' }, bars);
      K.t(bars, x0, 342, '√a + √b', { a: 'start', size: 28, fill: C.bad, w: 700 });
      S('rect', { x: x0 + 110, y: 324, width: Math.sqrt(a) * SC, height: 36, rx: 10, fill: 'url(#gBlue)' }, bars);
      S('rect', { x: x0 + 110 + Math.sqrt(a) * SC, y: 324, width: Math.sqrt(b) * SC, height: 36, rx: 10, fill: 'url(#gLime)' }, bars);
      const eq = Math.abs(l - r) < 1e-9;
      const sign = K.g(res, 640, 470);
      if (eq) { K.rich(sign, 0, 0, 100, '{g =}'); K.t(sign, 0, 76, 'eşit!', { size: 34, fill: C.ok, w: 800 }); }
      else { K.rich(sign, 0, 0, 100, '{w ≠}'); K.t(sign, 0, 76, `soldaki ${l < r ? 'daha küçük' : 'daha büyük'}`, { size: 30, fill: C.bad, w: 700 }); }
      K.rich(res, 640, 590, 36, `{t a = }{b ${a}}{t ,   b = }{b ${b}}{t     →   }{g ${fmt(l)}}{t  ${eq ? '=' : '≠'}  }{w ${fmt(r)}}`);
      if (eq && !found) {
        found = true;
        c.say(`Evet! Yalnızca <b>a = 0</b> ya da <b>b = 0</b> iken eşit.`, { noWait: true, speak: 'Evet! a sıfır ya da b sıfır olduğunda eşit. İkisi de sıfırdan büyükken hiç eşit olmadı.' });
        nf(K.ring(640, 470, C.ok, 120, 900)); ding(true);
        gt && gt.done();
      }
    }
    draw();
    c.say('<b>a</b> ve <b>b</b>\'yi değiştir. İkisi de 0\'dan büyükken hiç eşit olur mu?', { noWait: true });
    c.slider({ label: '<span class="tb">a</span>', min: 0, max: 5, step: 1, value: ia, fmt: (v) => vals[v], onInput: (v) => { ia = v; draw(); } });
    c.slider({ label: '<span class="tb">b</span>', min: 0, max: 5, step: 1, value: ib, tag: false, fmt: (v) => vals[v], onInput: (v) => { ib = v; draw(); } });
    gt = gate(c, 'Atla ›');
    await gt.wait;
    c.note(`<b class="tw">√(a + b) ≠ √a + √b</b><br>√(9+16) = 5, ama √9 + √16 = 7`, 'Tuzak');
  }

  /* ============================================================
     SAHNE 13 — Videoyu geri sar: sentez
     ============================================================ */
  async function scene13(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    /* ---- 1. zincir: taban 2, 12 tur ---- */
    const y1 = 130;
    const tl = timeline(K, { x0: 190, x1: 1110, y: y1, N: 12, base: 2 });
    const H = (tlx) => { const g = K.g(svg, tlx.x, tlx.y, { o: 0 }); S('circle', { r: 21, fill: 'url(#gRoot)', stroke: '#fff', 'stroke-width': 3, filter: 'url(#glow)' }, g); K.t(g, 0, 1, '⟷', { size: 20, fill: C.bg, w: 800 }); return g; };
    const handle = H({ x: tl.X(12), y: y1 });
    const pill = K.g(svg, tl.X(12), y1 - 62, { o: 0 });
    const pillBg = S('rect', { x: -95, y: -24, width: 190, height: 48, rx: 24, fill: C.root }, pill);
    let pillT = K.t(pill, 0, 1, '4096 kişi', { size: 28, fill: C.bg, w: 800 });
    const calc = K.g(svg, 0, 0, { o: 0 });
    K.card(calc, 190, 262, 920, 150, { shadow: true });
    const c1 = K.t(calc, 650, 306, '', { size: 36, fill: C.text, w: 700 });
    const c2 = K.t(calc, 650, 366, '', { size: 44, fill: C.text, w: 800 });

    const p1 = nf(c.say('Yeni video: <b>12 turda 2¹² = 4096</b> kişi. Tam ortada kaç kişi vardı?', { ms: 6000, speak: 'Yeni bir video. Bu kez on iki turda iki üzeri on iki, yani dört bin doksan altı kişiye ulaştı. Yolculuğun tam ortasında kaç kişi vardı?' }));
    await K.stagger(tl.ticks, 55, (t) => K.fade(t, 1, 250));
    nf(c.tween(800, (t) => tl.fill.setAttribute('width', t * (tl.X(12) - tl.X(0) + 28)), ease.inOut));
    await par(K.fade([handle, pill, calc], 1, 500));
    const show = (k, N, base, target, c1_, c2_) => {
      const v = base ** k, sq = v * v;
      c1_.textContent = ''; c.mathText(c1_, `${k}. turda: ${base}^{${k}} = ${fmt(v)} kişi`);
      c2_.textContent = `${fmt(v)} · ${fmt(v)} = ${fmt(sq)}`;
      c2_.style.fill = sq === target ? C.ok : C.text;
      c1_.style.fill = C.text;
    };
    show(12, 12, 2, 4096, c1, c2);
    await p1;
    c.say('Tutamacı ortaya sürükle: <b>kendisiyle çarpımı 4096</b> eden sayıyı bul.', { noWait: true });
    const fb = h('div', { class: 'fb info', html: 'Tutamacı sürükle (ya da bir tura dokun).' });
    const pnl1 = c.panel('Ortayı bul', fb);
    let solved = false, kNow = 12, resolveSolved; const solvedP = new Promise((r) => (resolveSolved = r));
    const X = tl.X;
    const setH = (x) => { K.set(handle, { x }); K.set(pill, { x }); };
    const kOf = (x) => clamp(Math.round((x - X(0)) / (X(12) - X(0)) * 12), 0, 12);
    const upd = (k) => { kNow = k; pillT.textContent = `${fmt(2 ** k)} kişi`; show(k, 12, 2, 4096, c1, c2); };
    async function drop(k) {
      if (solved) return;
      upd(k);
      if (k === 6) {
        solved = true;
        c.feedback(fb, 'ok', 'Tam ortası! <b>64 · 64 = 4096</b> ✓');
        resolveSolved();
      } else {
        const v = 2 ** k, sq = v * v;
        c.feedback(fb, 'no', `${fmt(v)}·${fmt(v)} = ${fmt(sq)} – ${sq < 4096 ? 'çok küçük' : 'çok büyük'}. ${sq < 4096 ? 'Sağa' : 'Sola'} kaydır.`);
        ding(false);
        await c.wait(500);
        await par(K.goto(handle, X(12), y1, 600), K.goto(pill, X(12), y1 - 62, 600));
        upd(12);
      }
    }
    K.drag(handle, {
      down: () => { handle._tk = (handle._tk || 0) + 1; pill._tk = (pill._tk || 0) + 1; },
      move: (p) => { if (solved) return; const x = clamp(p.x, X(0), X(12)); setH(x); const k = kOf(x); if (k !== kNow) upd(k); },
      up: (p) => { if (solved) return; const k = kOf(clamp(p.x, X(0), X(12))); nf(K.goto(handle, X(k), y1, 150)); nf(K.goto(pill, X(k), y1 - 62, 150)); nf(drop(k)); },
    });
    tl.ticks.forEach((tg, n) => { const hit = S('rect', { x: -32, y: -30, width: 64, height: 110, fill: 'transparent', style: 'cursor:pointer' }, tg); c.on(hit, 'pointerup', () => { if (solved) return; nf(K.goto(handle, X(n), y1, 300)); nf(K.goto(pill, X(n), y1 - 62, 300)); nf(drop(n)); }); });
    const skip = h('button', { class: 'btn ghost', onclick: () => { skip.remove(); if (!solved) { nf(K.goto(handle, X(6), y1, 500)); nf(K.goto(pill, X(6), y1 - 62, 500)); nf(drop(6)); } } }, 'Çözümü göster ›');
    c.act.appendChild(skip);
    await solvedP;
    skip.remove(); pnl1.remove();
    await c.wait(500);
    nf(K.ring(X(6), y1, C.root, 120, 1000));
    const mid1 = K.g(svg, 0, 0, { o: 0 });
    [[0, 6], [6, 12]].forEach(([a, b]) => { S('path', { d: `M${X(a)},${y1 - 40} Q${(X(a) + X(b)) / 2},${y1 - 108} ${X(b) - 4},${y1 - 44}`, fill: 'none', stroke: C.root, 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': K.mk(C.root) }, mid1); K.t(mid1, (X(a) + X(b)) / 2, y1 - 92, '6 tur', { size: 28, fill: C.root, w: 800 }); });
    pillT.remove(); pillT = K.t(pill, 0, 1, '64', { size: 32, fill: C.bg, w: 800 }); pillBg.setAttribute('x', -50); pillBg.setAttribute('width', 100);
    c1.textContent = ''; c.mathText(c1, '√4096 = √(2^{12}) = (2^{12})^{1/2} = 2^{6} = 64'); c1.style.fill = C.root;
    c2.textContent = '64 · 64 = 4096 ✓'; c2.style.fill = C.ok;
    await K.fade(mid1, 1, 700);
    await c.say('<b>√4096 = √(2¹²) = 2⁶ = 64</b>', { ms: 5400, speak: 'Karekök dört bin doksan altı, karekök iki üzeri on iki, iki üzeri altı, altmış dört. Ortadaki altmış dört kişi; her biri altmış dört kişi daha yaptı.' });

    /* ---- 2. zincir: taban 3, 4 tur ---- */
    await K.fade([calc, mid1, handle, pill, tl.g], 0, 600);
    [calc, mid1, handle, pill, tl.g].forEach((e) => e.remove());
    const y2 = 190;
    const tl2 = timeline(K, { x0: 330, x1: 950, y: y2, N: 4, base: 3, col: C.blue });
    const X2 = tl2.X;
    const handle2 = H({ x: X2(4), y: y2 });
    const pill2 = K.g(svg, X2(4), y2 - 62, { o: 0 });
    const pill2Bg = S('rect', { x: -80, y: -24, width: 160, height: 48, rx: 24, fill: C.blue }, pill2);
    let pill2T = K.t(pill2, 0, 1, '81 kişi', { size: 28, fill: C.bg, w: 800 });
    const calc2 = K.g(svg, 0, 0, { o: 0 });
    K.card(calc2, 190, 340, 920, 170, { shadow: true });
    const d1 = K.t(calc2, 650, 388, '', { size: 36, fill: C.text, w: 700 });
    const d2 = K.t(calc2, 650, 454, '', { size: 44, fill: C.text, w: 800 });
    const p2 = nf(c.say('Herkes <b>3 kişiye</b> yolluyor: 4. turda 3⁴ = 81. Ortada kaç kişi vardı?', { ms: 6200, speak: 'Başka bir zincirde herkes üç kişiye yolluyor. Dördüncü turda üç üzeri dört, yani seksen bir kişi var. İkinci turda, ortada kaç kişi vardı?' }));
    await K.stagger(tl2.ticks, 80, (t) => K.fade(t, 1, 250));
    nf(c.tween(600, (t) => tl2.fill.setAttribute('width', t * (X2(4) - X2(0) + 28)), ease.inOut));
    await K.fade([handle2, pill2, calc2], 1, 500);
    const show2 = (k) => {
      const v = 3 ** k, sq = v * v;
      d1.textContent = ''; c.mathText(d1, `${k}. turda: 3^{${k}} = ${fmt(v)} kişi`);
      d2.textContent = `${fmt(v)} · ${fmt(v)} = ${fmt(sq)}`; d2.style.fill = sq === 81 ? C.ok : C.text; d1.style.fill = C.text;
    };
    show2(4);
    await p2;
    const fb2 = h('div', { class: 'fb info', html: 'Tutamacı sürükle: kendisiyle çarpımı 81 olan kişi sayısını bul.' });
    const pnl2 = c.panel('Ortayı bul', fb2);
    let solved2 = false, k2 = 4, res2; const solvedP2 = new Promise((r) => (res2 = r));
    const set2 = (x) => { K.set(handle2, { x }); K.set(pill2, { x }); };
    const kOf2 = (x) => clamp(Math.round((x - X2(0)) / (X2(4) - X2(0)) * 4), 0, 4);
    const upd2 = (k) => { k2 = k; pill2T.textContent = `${fmt(3 ** k)} kişi`; show2(k); };
    async function drop2(k) {
      if (solved2) return;
      upd2(k);
      if (k === 2) { solved2 = true; c.feedback(fb2, 'ok', 'Tam ortası! <b>9 · 9 = 81</b>.'); res2(); }
      else {
        const v = 3 ** k, sq = v * v;
        c.feedback(fb2, 'no', `${fmt(v)}·${fmt(v)} = ${fmt(sq)} – ${sq < 81 ? 'çok küçük' : 'çok büyük'}. ${sq < 81 ? 'Sağa' : 'Sola'} kaydır.`); ding(false);
        await c.wait(500);
        await par(K.goto(handle2, X2(4), y2, 600), K.goto(pill2, X2(4), y2 - 62, 600)); upd2(4);
      }
    }
    K.drag(handle2, {
      down: () => { handle2._tk = (handle2._tk || 0) + 1; pill2._tk = (pill2._tk || 0) + 1; },
      move: (p) => { if (solved2) return; const x = clamp(p.x, X2(0), X2(4)); set2(x); const k = kOf2(x); if (k !== k2) upd2(k); },
      up: (p) => { if (solved2) return; const k = kOf2(clamp(p.x, X2(0), X2(4))); nf(K.goto(handle2, X2(k), y2, 150)); nf(K.goto(pill2, X2(k), y2 - 62, 150)); nf(drop2(k)); },
    });
    tl2.ticks.forEach((tg, n) => { const hit = S('rect', { x: -40, y: -30, width: 80, height: 110, fill: 'transparent', style: 'cursor:pointer' }, tg); c.on(hit, 'pointerup', () => { if (solved2) return; nf(K.goto(handle2, X2(n), y2, 300)); nf(K.goto(pill2, X2(n), y2 - 62, 300)); nf(drop2(n)); }); });
    const skip2 = h('button', { class: 'btn ghost', onclick: () => { skip2.remove(); if (!solved2) { nf(K.goto(handle2, X2(2), y2, 500)); nf(K.goto(pill2, X2(2), y2 - 62, 500)); nf(drop2(2)); } } }, 'Çözümü göster ›');
    c.act.appendChild(skip2);
    await solvedP2;
    skip2.remove(); pnl2.remove();
    pill2T.remove(); pill2T = K.t(pill2, 0, 1, '9 = 3²', { size: 28, fill: C.bg, w: 800 });
    d1.textContent = ''; c.mathText(d1, '√81 = √(3^{4}) = 3^{2} = 9'); d1.style.fill = C.blue;
    d2.textContent = '9 · 9 = 81 ✓'; d2.style.fill = C.ok;
    nf(K.ring(X2(2), y2, C.blue, 100, 900));
    await c.say('<b>√81 = 9 = 3²</b>. Kök: <b>geri sarmak</b>, sayacı <b>yarıya bölmek</b>.', { ms: 5200, speak: 'Karekök seksen bir, dokuz, üç kare. Gördün mü: kök, videoyu geri sarmak ve sayacı yarıya bölmek.' });
    await c.wait(500);

    /* ---- kural defteri ---- */
    await K.fade([calc2, tl2.g, handle2, pill2], 0, 600);
    [calc2, tl2.g, handle2, pill2].forEach((e) => e.remove());
    svg.querySelectorAll(':scope > g, :scope > text').forEach((e) => { if (!e.querySelector('defs')) e.remove(); });
    const cols = [
      { t: 'Üs yasaları', x: 40, col: C.base, rules: ['{b a}{e^ m}{t · }{b a}{e^ n}{t  = }{b a}{e^ m+n}', '{b a}{e^ m}{t  / }{b a}{e^ n}{t  = }{b a}{e^ m−n}', '{t (}{b a}{e^ m}{t )}{k^ n}{t  = }{b a}{e^ m·n}', '{t (}{b ab}{t )}{k^ n}{t  = }{b a}{e^ n}{b b}{e^ n}'] },
      { t: 'Sıfır ve negatif üs', x: 450, col: C.back, rules: ['{b a}{e^ 0}{t  = }{g 1}{t   (a ≠ 0)}', '{b a}{e^ −n}{t  = 1/}{b a}{e^ n}', '{t (a/b)}{k^ −n}{t  = (b/a)}{k^ n}', '{b 2}{e^ −3}{t  = }{g 1/8}'] },
      { t: 'Kök', x: 860, col: C.root, rules: ['{k √a}{t  = }{b a}{e^ 1/2}', '{k √a}{t · }{k √b}{t  = }{k √(ab)}', '{t 6/}{k √3}{t  = }{g 2}{k √3}', '{w √(a+b) ≠ √a + √b}'] },
    ];
    const rows = [];
    cols.forEach((cl) => {
      const g = K.g(svg, 0, 0, { o: 0 });
      K.card(g, cl.x, 50, 380, 470, { stroke: cl.col, sw: 2.5 });
      K.t(g, cl.x + 190, 100, cl.t, { size: 34, fill: cl.col, w: 800 });
      cl.rules.forEach((spec, i) => {
        const rg = K.g(g, 0, 0);
        const ring = S('rect', { x: cl.x + 14, y: 154 + i * 90 - 32, width: 352, height: 64, rx: 14, fill: 'none', stroke: cl.col, 'stroke-width': 3, opacity: 0 }, rg);
        K.rich(rg, cl.x + 190, 154 + i * 90, 29, spec);
        rows.push(ring);
      });
      cl.g = g;
    });
    const pend = nf(c.say('<b>Üs bir sayaçtır</b>: çarpınca toplanır, bölünce çıkar, kökte yarıya bölünür.', { ms: 9000, speak: 'Kural defterini birleştirelim: üç sütun, tek fikir. Üs bir sayaçtır; çarpınca toplanır, bölünce çıkar, geri sarınca ters çevrilir, kökte yarıya bölünür.' }));
    await K.stagger(cols.map((q) => q.g), 400, (g) => K.fade(g, 1, 600));
    await K.stagger(rows, 220, async (r) => { await c.tween(350, (t) => r.setAttribute('opacity', t), ease.out); await c.tween(350, (t) => r.setAttribute('opacity', 1 - t)); });
    await pend;
    const closing = K.rich(svg, 640, 600, 36, '{t Üs = sayaç.  Kök = }{k sayacı yarıya bölmek}{t .  Tuzak: }{w toplama}{t .}', { o: 0 });
    await c.tween(600, (t) => closing.setAttribute('opacity', t));
    await c.wait(1200);

    /* ---- son soru ---- */
    await c.choice({
      q: 'Bir videoda <b>3 kişiye</b> yollanıyor; 6. turda ' + Pc(3, 6) + ' = 729 kişi var. Ortada (3. turda) kaç kişi vardı?',
      options: ['243', '27', '364,5', '18'], answer: 1,
      hints: ['243 = 3⁵ (5. tur). Ortada olmayan bir tur seçmişsin.', '',
        '729/2 mi aldın? Kök, bölmek değil. 27·27 = 729.',
        '729 = 27² ve 18² = 324; hatalı. √729 = 27.'],
      right: `Doğru: √729 = 27 = ${Pc(3, 3)}.`,
    });
    c.note(`<b class="tk">√a = a<sup>1/2</sup></b> | √a·√b = √(ab) | 6/√3 = 2√3 | <b class="tw">√(a+b) ≠ √a + √b</b>`, 'Kök kuralları');
  }

  /* ============================================================
     A5–A8 — ORTAK YARDIMCILAR
     ============================================================ */
  /* n. dereceden kök: K.rad + derece. x: sol kenar. Dönen grup ._w = toplam genişlik */
  function nrad(K, p, x, y, spec, size, n, o = {}) {
    const g = K.g(p, x, y, { o: o.o, s: o.s });
    const pad = size * 0.16;
    const r = K.rad(g, pad, 0, spec, size, { col: o.col, fill: o.fill, w: o.w });
    K.t(g, pad + size * 0.06, -size * 0.34, String(n), { size: size * 0.46, fill: o.col || C.root, w: 800 });
    g._w = pad + r._w;
    return g;
  }

  /* Eşit parçalara bölünen yol (A5). o: x0,x1,y,N,base · tur: numarası yazılacak turlar · kisi: baştan görünen değerler
     sade: tur satırı ve satır adları yok (yalnızca değerler) */
  function yol(K, c, o) {
    const { S } = K;
    const g = K.g(K.svg, 0, 0, { o: 0 });
    const X = (n) => o.x0 + (o.x1 - o.x0) * n / o.N;
    const W = o.x1 - o.x0 + 28;
    S('rect', { x: o.x0 - 14, y: o.y - 7, width: W, height: 14, rx: 7, fill: 'rgba(255,255,255,.1)' }, g);
    const dolgu = S('rect', { x: o.x0 - 14, y: o.y - 7, width: 0, height: 14, rx: 7, fill: C.root }, g);
    const deger = {}, yd = o.y + (o.sade ? 44 : 78);
    for (let n = 0; n <= o.N; n++) {
      const buyuk = o.sade || o.tur.includes(n);
      K.line(g, X(n), o.y - (buyuk ? 14 : 8), X(n), o.y + (buyuk ? 14 : 8), C.soft, buyuk ? 3 : 2);
      if (!o.sade && buyuk) K.t(g, X(n), o.y + 40, String(n), { size: 28, fill: C.exp, w: 800 });
      deger[n] = K.t(g, X(n), yd, fmt(o.base ** n), { size: 28, fill: C.base, w: 700, o: o.kisi.includes(n) ? 1 : 0 });
    }
    if (!o.sade) {
      K.t(g, o.x0 - 50, o.y + 40, 'tur', { size: 24, fill: C.soft, a: 'end' });
      K.t(g, o.x0 - 50, o.y + 78, 'kişi', { size: 24, fill: C.soft, a: 'end' });
    }
    /* parca tane eşit yay; her biri etiketli. Dönen gruplar görünmez başlar; ._et etiket metni */
    const yaylar = (parca, etiket, col = C.root) => {
      const adim = o.N / parca, out = [];
      for (let i = 0; i < parca; i++) {
        const a = X(i * adim), b = X((i + 1) * adim), yg = K.g(g, 0, 0, { o: 0 });
        const hgt = Math.min(90, (b - a) * 0.42);
        S('path', { d: `M${a + 6},${o.y - 22} Q${(a + b) / 2},${o.y - 22 - hgt * 1.6} ${b - 8},${o.y - 24}`, fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round', 'marker-end': K.mk(col) }, yg);
        yg._et = K.t(yg, (a + b) / 2, o.y - 22 - hgt * 0.8 - 26, etiket, { size: 28, fill: col, w: 800 });
        out.push(yg);
      }
      return out;
    };
    const doldur = (ms = 900) => c.tween(ms, (t) => dolgu.setAttribute('width', t * W), ease.inOut);
    return { g, X, deger, yaylar, doldur };
  }

  /* Kartları kutulara sürükle (A5, A7). cards: [{ g, bin }] · bins: [{ x, y, w, h }] (merkez ve boyut)
     yer(kart) → bırakılınca duracağı nokta · dogru(kart) · yanlis(kart, kutuNo) */
  function eslestir(K, c, o) {
    let kalan = o.cards.length, bitir;
    const bitti = new Promise((r) => (bitir = r));
    const kutu = (p) => o.bins.findIndex((b) => Math.abs(p.x - b.x) < b.w / 2 && Math.abs(p.y - b.y) < b.h / 2);
    const yerlestir = async (k) => {
      k.tamam = true; k.g.style.cursor = 'default';
      const q = o.yer(k);
      await K.goto(k.g, q.x, q.y, 300);
      if (--kalan === 0) bitir();
    };
    o.cards.forEach((k) => {
      k.ev = { x: k.g._x, y: k.g._y };
      K.drag(k.g, {
        down: (p) => { if (k.tamam) return; k.g._tk = (k.g._tk || 0) + 1; k.dx = k.g._x - p.x; k.dy = k.g._y - p.y; },
        move: (p) => { if (!k.tamam) K.set(k.g, { x: p.x + k.dx, y: p.y + k.dy }); },
        up: () => {
          if (k.tamam) return;
          const b = kutu({ x: k.g._x, y: k.g._y });
          if (b === k.bin) { ding(true); o.dogru && o.dogru(k); nf(yerlestir(k)); return; }
          if (b >= 0) { ding(false); o.yanlis && o.yanlis(k, b); }
          nf(K.goto(k.g, k.ev.x, k.ev.y, 350));
        },
      });
    });
    return { bitti, coz: async () => { for (const k of o.cards) if (!k.tamam) await yerlestir(k); } };
  }

  /* ============================================================
     A5 · SAHNE 1 — Üçe böl: küpkök
     ============================================================ */
  async function sceneA5_1(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const Y = yol(K, c, { x0: 220, x1: 1100, y: 230, N: 9, base: 2, tur: [0, 3, 6, 9], kisi: [0, 9] });
    const p1 = nf(c.say('Video bu kez <b>9 turda 512 kişiye</b> ulaştı.', { speak: 'Video bu kez dokuz turda beş yüz on iki kişiye ulaştı.' }));
    await K.fade(Y.g, 1, 500);
    await Y.doldur();
    await p1;
    const yay = Y.yaylar(3, '3 tur');
    const p2 = nf(c.say('Yolu <b>üç eşit parçaya</b> böl: 3 tur, 3 tur, 3 tur.', { speak: 'Bu yolu üç eşit parçaya bölelim: üç tur, üç tur, üç tur.' }));
    await K.stagger(yay, 350, (a) => K.fade(a, 1, 400));
    await p2;
    const soru = K.t(Y.g, Y.X(3), 308, '?', { size: 34, fill: C.root, w: 800 });
    await c.choice({
      q: 'İlk parçanın sonunda, 3. turda kaç kişi vardı?',
      options: ['171', '8', '64'], answer: 1,
      hints: ['512’yi 3’e bölmüşsün. Her parçada sayı aynı miktar artmaz, aynı <b>katına</b> çıkar.', '', '64 ikinci parçanın sonu, yani 6. tur. İlk parçanın sonu daha küçük.'],
      right: 'Evet: 3. turda 2·2·2 = 8 kişi.',
    });
    soru.remove();
    yay.forEach((a) => { a._et.textContent = '×8'; });
    const p3 = nf(c.say('Her parçada sayı 8 katına çıkar: <b>8·8·8 = 512</b>.', { speak: 'Her parçada sayı sekiz katına çıkar. Sekiz çarpı sekiz çarpı sekiz, beş yüz on iki eder.' }));
    await K.fade([Y.deger[3], Y.deger[6]], 1, 500);
    const e1 = K.rich(svg, 640, 430, 60, '{b 8}{t ·}{b 8}{t ·}{b 8}{t  = }{g 512}', { o: 0 });
    await K.fade(e1, 1, 500);
    await p3;
    const p4 = nf(c.say('Üç kez çarpılınca 512 veren sayı: <b>küpkök</b>.', { speak: 'Üç kez yan yana çarpılınca beş yüz on iki veren sayıya, beş yüz on ikinin küpkökü denir.' }));
    const e2 = mixLine(K, svg, 640, 560, 60, [{ r: '{t 512}', n: 3 }, '{t  = }{g 8}'], { o: 0 });
    await K.fade(e2, 1, 500);
    await p4;

    /* üs dili: x + x + x = 1 */
    await K.fade(e1, 0, 400); e1.remove();
    const p5 = nf(c.say('Üs dilinde: üç eşit üs toplanınca 1 etmeli.', { speak: 'Aynı şeyi üs diliyle yazalım. Üç eşit üs toplanınca bir etmeli.' }));
    const e3 = K.rich(svg, 640, 400, 52, '{b 512}{e^ x}{t ·}{b 512}{e^ x}{t ·}{b 512}{e^ x}{t  = }{b 512}{e^ 1}', { o: 0 });
    await K.fade(e3, 1, 500);
    const e4 = K.rich(svg, 640, 472, 44, '{e x+x+x = 1}', { o: 0 });
    await K.fade(e4, 1, 400);
    await p5;
    const p6 = nf(c.say('Her biri 1/3. Küpkök, <b>üs 1/3</b> demek.', { speak: '[excited] Demek ki her biri üçte bir. Küpkök almak, üssü üçte bir yapmaktır.' }));
    await K.fade([e2, e3, e4], 0, 400); e2.remove(); e3.remove(); e4.remove();
    const e5 = mixLine(K, svg, 640, 480, 68, [{ r: '{t 512}', n: 3 }, '{t  = }{b 512}{e^ 1}{t^ /}{k^ 3}{t  = }{g 8}'], { o: 0 });
    await K.fade(e5, 1, 600);
    await p6;
    c.note(`<b>${M.m(M.sqrt('a', 3))} = ${P('a', '1/3')}</b><br>${M.m(M.sqrt(512, 3))} = 8, çünkü 8·8·8 = 512`, 'Küpkök');
  }

  /* ============================================================
     A5 · SAHNE 2 — n'ye böl: n. kök
     ============================================================ */
  async function sceneA5_2(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const Y = yol(K, c, { x0: 300, x1: 980, y: 230, N: 4, base: 2, tur: [0, 4], kisi: [0, 4] });
    const p1 = nf(c.say('Yeni yol: 4 turda 16 kişi. <b>Dört</b> eşit parçaya böl.', { speak: 'Yeni bir yol: dört turda on altı kişi. Bu kez yolu dört eşit parçaya bölelim.' }));
    await K.fade(Y.g, 1, 500);
    await Y.doldur();
    const yay = Y.yaylar(4, '×?');
    await K.stagger(yay, 200, (a) => K.fade(a, 1, 300));
    await p1;
    await c.choice({
      q: 'Hangi sayı 4 kez yan yana çarpılınca 16 eder?',
      options: ['4', '2', '8'], answer: 1,
      hints: ['4·4·4·4 = 256. Çok büyük.', '', '8·8·8·8 = 4096. Çok büyük.'],
      right: 'Evet: 2·2·2·2 = 16.',
    });
    yay.forEach((a) => { a._et.textContent = '×2'; });
    await K.fade([1, 2, 3].map((n) => Y.deger[n]), 1, 500);
    const p2 = nf(c.say('Dört kez çarpılınca 16 veren sayı: <b>dördüncü kök</b>.', { speak: 'Dört kez yan yana çarpılınca on altı veren sayıya, on altının dördüncü kökü denir.' }));
    const e1 = mixLine(K, svg, 640, 440, 68, [{ r: '{t 16}', n: 4 }, '{t  = }{g 2}'], { o: 0 });
    await K.fade(e1, 1, 500);
    await p2;
    const p3 = nf(c.say('Üs dilinde parça sayısı <b>paydaya</b> iner: 16 üzeri 1/4.', { speak: 'Üs dilinde parça sayısı paydaya iner: on altı üzeri dörtte bir.' }));
    const e2 = mixLine(K, svg, 640, 440, 68, [{ r: '{t 16}', n: 4 }, '{t  = }{b 16}{e^ 1}{t^ /}{k^ 4}{t  = }{g 2}'], { o: 0 });
    await K.fade(e1, 0, 300); e1.remove();
    await K.fade(e2, 1, 500);
    await p3;
    const p4 = nf(c.say('Kural: <b>n. kök</b>, üssü 1/n yapmaktır.', { speak: 'Kural şu: n’inci kökü almak, üssü n’de bir yapmaktır.' }));
    const kural = mixLine(K, svg, 640, 590, 60, [{ r: '{t a}', n: 'n' }, '{t  = }{b a}{e^ 1}{t^ /}{k^ n}'], { o: 0 });
    await K.fade(kural, 1, 500);
    await p4;
    c.note(`<b>${M.m(M.sqrt('a', 'n'))} = ${P('a', '1/n')}</b><br>${M.m(M.sqrt(16, 4))} = 2, çünkü 2·2·2·2 = 16`, 'n. kök');

    /* dene: 64'ü 2, 3 ya da 6 parçaya böl */
    await K.fade([Y.g, e2, kural], 0, 400); Y.g.remove(); e2.remove(); kural.remove();
    const Z = yol(K, c, { x0: 220, x1: 1100, y: 280, N: 6, base: 2, sade: true, kisi: [0, 6] });
    await K.fade(Z.g, 1, 400);
    nf(Z.doldur(500));
    let cizim = [], satir = null;
    const dugme = [2, 3, 6].map((n) => kbtn(n + ' parça', () => sec(n)));
    function sec(n) {
      cizim.forEach((a) => a.remove()); if (satir) satir.remove();
      const r = Math.round(64 ** (1 / n));
      cizim = Z.yaylar(n, '×' + r); cizim.forEach((a) => K.set(a, { o: 1 }));
      for (let k = 0; k <= 6; k++) Z.deger[k].setAttribute('opacity', k % (6 / n) === 0 ? 1 : 0);
      satir = mixLine(K, svg, 640, 540, 68, [n === 2 ? { r: '{t 64}' } : { r: '{t 64}', n }, `{t  = }{b 64}{e^ 1}{t^ /}{k^ ${n}}{t  = }{g ${r}}`]);
      dugme.forEach((b, i) => b.classList.toggle('on', [2, 3, 6][i] === n));
    }
    c.panel('Dene', h('p', { class: 'q', html: '64’e giden yolu kaç eşit parçaya bölelim?' }), h('div', { class: 'row' }, ...dugme));
    sec(2);
    c.say('Parça sayısını değiştir: kök nasıl değişiyor?', { noWait: true });
    await c.cont();
  }

  /* ============================================================
     A5 · SAHNE 3 — m adım yürü: a^(m/n)
     ============================================================ */
  async function sceneA5_3(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    let buyuk = K.rich(svg, 640, 100, 84, '{b 8}{e^ 2}{t^ /}{k^ 3}{t  = ?}', { o: 0 });
    const p1 = nf(c.say('Şimdi üs bir kesir: 8 üzeri 2/3.', { speak: 'Şimdi üs bir kesir olsun: sekiz üzeri üçte iki.' }));
    await K.fade(buyuk, 1, 500);
    await p1;
    await c.choice({
      q: `${P(8, '2/3')} sence kaç eder?`,
      options: [FR(16, 3), '4', '2'], answer: 1,
      hints: ['8 ile 2/3’ü çarpmışsın. Üs çarpan değildir.', '', '2 yalnızca ilk adım. Üssün payı 2: bir adım daha var.'],
      right: 'Evet, 4. Nedenini yolda görelim.',
    });
    const Y = yol(K, c, { x0: 340, x1: 940, y: 340, N: 3, base: 2, tur: [0, 3], kisi: [0, 3] });
    const p2 = nf(c.say('<b>Payda 3:</b> yolu üçe böl. Her adım ×2.', { speak: 'Önce paydaya bak: üç. Sekize giden yolu üç eşit parçaya böl. Her adımda sayı iki katına çıkar.' }));
    await K.fade(Y.g, 1, 500);
    await Y.doldur(600);
    const yay = Y.yaylar(3, '×2');
    await K.stagger(yay, 250, (a) => K.fade(a, 1, 350));
    await p2;
    const p3 = nf(c.say('<b>Pay 2:</b> iki adım yürü. 2·2 = 4.', { speak: 'Sonra paya bak: iki. İki adım yürü: iki çarpı iki, dört.' }));
    const yuru = K.g(svg, Y.X(0), 340, { o: 0 });
    S('circle', { r: 16, fill: C.exp, stroke: '#fff', 'stroke-width': 3 }, yuru);
    await K.fade(yuru, 1, 300);
    for (const n of [1, 2]) { await K.to(yuru, { x: Y.X(n) }, 600); await K.fade(Y.deger[n], 1, 300); }
    await K.fade(yay[2], 0.25, 300);
    buyuk.remove();
    buyuk = K.rich(svg, 640, 100, 84, '{b 8}{e^ 2}{t^ /}{k^ 3}{t  = }{g 4}');
    await p3;
    const p4 = nf(c.say('Önce kök, sonra kuvvet: (∛8)² = 2² = 4.', { speak: 'Yani önce küpkök al, sonra karesini al. Sekizin küpkökü iki, ikinin karesi dört.' }));
    const e1 = mixLine(K, svg, 640, 540, 56, ['{b 8}{e^ 2}{t^ /}{k^ 3}{t  = (}', { r: '{b 8}', n: 3 }, '{t )}{e^ 2}{t  = }{b 2}{e^ 2}{t  = }{g 4}'], { o: 0 });
    await K.fade(e1, 1, 500);
    await p4;
    await K.fade([Y.g, yuru, buyuk], 0, 400); Y.g.remove(); yuru.remove(); buyuk.remove();
    await K.to(e1, { y: 250 }, 500);
    const p5 = nf(c.say('<b>Payda kökü, pay kuvveti söyler.</b>', { speak: 'Kural şu: payda kökü, pay kuvveti söyler.' }));
    const kural = mixLine(K, svg, 640, 430, 72, ['{b a}{e^ m}{t^ /}{k^ n}{t  = (}', { r: '{b a}', n: 'n' }, '{t )}{e^ m}'], { o: 0 });
    await K.fade(kural, 1, 500);
    await p5;
    c.note(`<b>${P('a', 'm/n')} = (${M.m(M.sqrt('a', 'n'))})<sup>m</sup></b><br>${P(8, '2/3')} = 2² = 4`, 'Rasyonel üs');

    /* dene: 64^(m/n) */
    await K.fade([e1, kural], 0, 400); e1.remove(); kural.remove();
    const Z = yol(K, c, { x0: 220, x1: 1100, y: 280, N: 6, base: 2, sade: true, kisi: [0, 6] });
    await K.fade(Z.g, 1, 400);
    nf(Z.doldur(500));
    const top = K.g(svg, Z.X(0), 280);
    S('circle', { r: 16, fill: C.exp, stroke: '#fff', 'stroke-width': 3 }, top);
    const PAYDA = [2, 3, 6];
    let cizim = [], satir = null, hazir = false, n = 3, m = 2, sPay = null;
    const ciz = () => {
      cizim.forEach((a) => a.remove()); if (satir) satir.remove();
      const r = Math.round(64 ** (1 / n)), adim = 6 / n;
      cizim = Z.yaylar(n, '×' + r);
      cizim.forEach((a, i) => { K.set(a, { o: i < m ? 1 : 0.3 }); if (i >= m) a._et.setAttribute('opacity', 0); });
      for (let k = 0; k <= 6; k++) Z.deger[k].setAttribute('opacity', k === 0 || k === 6 || (k % adim === 0 && k <= m * adim) ? 1 : 0);
      K.set(top, { x: Z.X(m * adim) });
      satir = mixLine(K, svg, 640, 540, 60, [`{b 64}{e^ ${m}}{t^ /}{k^ ${n}}{t  = (}`, n === 2 ? { r: '{b 64}' } : { r: '{b 64}', n }, `{t )}{e^ ${m}}{t  = }{b ${r}}{e^ ${m}}{t  = }{g ${fmt(r ** m)}}`]);
    };
    c.slider({ label: 'Payda: kaç parçaya böl', min: 0, max: 2, step: 1, value: 1, fmt: (i) => PAYDA[i], onInput: (i) => { n = PAYDA[i]; if (!hazir) return; if (m > n) sPay.set(n); else ciz(); } });
    sPay = c.slider({ label: 'Pay: kaç adım yürü', tag: false, min: 1, max: 6, step: 1, value: 2, onInput: (v) => { if (!hazir) return; if (v > n) { sPay.set(n); return; } m = v; ciz(); } });
    hazir = true; ciz();
    c.say('Paydayı ve payı değiştir; yolda izle.', { noWait: true });
    await c.cont();
  }

  /* ============================================================
     A5 · SAHNE 4 — Sıra sende: ifadeyi değerine sürükle
     ============================================================ */
  async function sceneA5_4(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const KUTU = [2, 3, 8, 9, 18];
    const bins = KUTU.map((v, i) => {
      const x = 160 + i * 240, y = 500, g = K.g(svg, x, y, { o: 0 });
      g._rect = S('rect', { x: -100, y: -90, width: 200, height: 180, rx: 16, fill: 'rgba(255,255,255,.04)', stroke: C.soft, 'stroke-width': 2, 'stroke-dasharray': '8 8' }, g);
      g._txt = K.t(g, 0, 50, String(v), { size: 52, fill: C.ok, w: 800 });
      return { g, x, y, w: 200, h: 180 };
    });
    const KART = [
      { spec: '{b 27}{e^ 2}{t^ /}{k^ 3}', v: 9, yol: 'Önce ∛27’yi bul, sonra karesini al.', tam: '∛27 = 3, sonra 3² = 9.' },
      { spec: '{b 32}{e^ 1}{t^ /}{k^ 5}', v: 2, yol: 'Hangi sayı 5 kez çarpılınca 32 eder?', tam: '2·2·2·2·2 = 32.' },
      { spec: '{b 4}{e^ 3}{t^ /}{k^ 2}', v: 8, yol: 'Önce √4’ü bul, sonra küpünü al.', tam: '√4 = 2, sonra 2³ = 8.' },
      { spec: '{b 81}{e^ 1}{t^ /}{k^ 4}', v: 3, yol: 'Hangi sayı 4 kez çarpılınca 81 eder?', tam: '3·3·3·3 = 81.' },
    ];
    const cards = KART.map((k, i) => {
      const g = K.g(svg, 250 + i * 260, 170, { o: 0 });
      S('rect', { x: -95, y: -48, width: 190, height: 96, rx: 14, fill: C.panel2, stroke: 'rgba(255,255,255,.25)', 'stroke-width': 2 }, g);
      K.rich(g, 0, 6, 46, k.spec);
      return { ...k, g, bin: KUTU.indexOf(k.v) };
    });
    const p1 = nf(c.say('Dört ifade, beş kutu. Kutulardan biri tuzak.', { speak: 'Dört ifade, beş kutu var. Kutulardan biri tuzak.' }));
    await K.stagger(cards.map((k) => k.g), 120, (g) => K.fade(g, 1, 300));
    await K.stagger(bins.map((b) => b.g), 80, (g) => K.fade(g, 1, 300));
    await p1;
    const fb = h('div', { class: 'fb info', html: 'Payda kökü, pay kuvveti söyler.' });
    const pnl = c.panel('Sıra sende', h('p', { class: 'q', html: 'Her ifadeyi değerine sürükle.' }), fb);
    const E = eslestir(K, c, {
      cards, bins, yer: (k) => ({ x: bins[k.bin].x, y: bins[k.bin].y - 36 }),
      dogru: (k) => c.feedback(fb, 'ok', 'Doğru: ' + k.tam),
      yanlis: (k, b) => c.feedback(fb, 'no', KUTU[b] === 18 && k.v === 9 ? '27 ile 2/3’ü çarpmışsın. Üs çarpan değildir.' : k.yol),
    });
    const goster = h('button', { class: 'btn ghost', onclick: () => { goster.remove(); nf(E.coz()); } }, 'Çözümü göster ›');
    c.act.appendChild(goster);
    await E.bitti;
    goster.remove(); pnl.remove();
    const tuzak = bins[4].g;
    tuzak._rect.setAttribute('stroke', C.bad); tuzak._txt.style.fill = C.bad;
    nf(K.shake(tuzak));
    await c.say('Boş kalan 18 tuzaktı: üs çarpan değildir.', { speak: 'Boş kalan on sekiz tuzaktı. Yirmi yediyi üçte ikiyle çarpmıyoruz; üs çarpan değildir.' });
  }

  /* ============================================================
     A6 · SAHNE 1 — Eski yöntem tutmuyor
     ============================================================ */
  async function sceneA6_1(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    /* hatırlatma: 6/√3 · √3/√3 = 2√3 */
    const g1 = K.g(svg, 0, 0, { o: 0 });
    fracMix(K, g1, 420, 250, 68, ['{t 6}'], [{ r: '{t 3}' }]);
    K.t(g1, 525, 250, '·', { size: 68 });
    fracMix(K, g1, 630, 250, 68, [{ r: '{e 3}', col: C.exp }], [{ r: '{e 3}', col: C.exp }]);
    mixLine(K, g1, 850, 250, 68, ['{t = }{g 2}', { r: '{g 3}', col: C.ok }]);
    const p1 = nf(c.say('Daha önce 6/√3’ü √3 ile genişletip kökten kurtulmuştuk.', { speak: 'Daha önce altı bölü karekök üçü, karekök üçle genişletip paydadaki kökten kurtulmuştuk.' }));
    await K.fade(g1, 1, 500);
    await p1;
    await K.fade(g1, 0, 400); g1.remove();
    const hedef = fracMix(K, svg, 640, 170, 76, ['{t 1}'], [{ r: '{t 3}' }, '{t  − 1}'], { o: 0 });
    const p2 = nf(c.say('Peki payda <b>√3 − 1</b> olursa? Aynısını deneyelim.', { speak: '[curious] Peki payda karekök üç eksi bir olursa? Aynı yöntemi deneyelim.' }));
    await K.fade(hedef, 1, 500);
    await p2;
    await c.choice({
      q: `(${RT(3)} − 1) · ${RT(3)} kaç eder?`,
      options: [`3 − ${RT(3)}`, '2', `${RT(3)} − 1`], answer: 0,
      hints: ['', 'Yalnızca √3·√3 = 3 aldın. −1 de √3 ile çarpılır.', 'Bu, çarpılmamış hâli. Dağıt: √3·√3 − 1·√3.'],
      right: 'Evet: √3·√3 − 1·√3 = 3 − √3.',
    });
    const dene = mixLine(K, svg, 640, 400, 64, ['{t (}', { r: '{t 3}' }, '{t  − 1)·}', { r: '{e 3}', col: C.exp }, '{t  = 3 − }', { r: '{w 3}', col: C.bad }], { o: 0 });
    const p3 = nf(c.say('Olmadı: <b>3 − √3</b>. Kök hâlâ orada.', { speak: 'Olmadı. Sonuç üç eksi karekök üç; kök hâlâ orada.' }));
    await K.fade(dene, 1, 500);
    await K.shake(dene);
    await p3;
    const p4 = nf(c.say('Tek kökle çarpmak yetmiyor. Başka bir çarpan gerek.', { speak: 'Tek bir kökle çarpmak yetmiyor. Başka bir çarpan gerek.' }));
    const ara = mixLine(K, svg, 640, 560, 64, ['{t (}', { r: '{t 3}' }, '{t  − 1)·}{e ?}{t  = }{g köksüz}'], { o: 0 });
    await K.fade(dene, 0.35, 400);
    await K.fade(ara, 1, 500);
    await p4;
  }

  /* ============================================================
     A6 · SAHNE 2 — İkizini bul: dört parça
     ============================================================ */
  async function sceneA6_2(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const bas = mixLine(K, svg, 470, 66, 52, ['{t (}', { r: '{t 3}' }, '{r  − 1}{t )(}', { r: '{t 3}' }, '{e  + 1}{t )}'], { o: 0 });
    const p1 = nf(c.say('Bu kez işareti değişmiş <b>ikiziyle</b> çarp: √3 + 1.', { speak: 'Bu kez onu, işareti değişmiş ikiziyle çarpalım: karekök üç artı bir.' }));
    await K.fade(bas, 1, 500);
    /* çarpım tablosu: sütunlar √3 ve +1, satırlar √3 ve −1 */
    const X0 = 250, Y0 = 200, WA = 280, WB = 160, HA = 200, HB = 116;
    const tab = K.g(svg, 0, 0, { o: 0 });
    const ust = K.rad(tab, 0, Y0 - 44, '{t 3}', 44); K.set(ust, { x: X0 + WA / 2 - ust._w / 2 });
    K.t(tab, X0 + WA + WB / 2, Y0 - 44, '+1', { size: 44, fill: C.exp, w: 800 });
    const sol = K.rad(tab, 0, Y0 + HA / 2, '{t 3}', 44); K.set(sol, { x: X0 - 36 - sol._w });
    K.t(tab, X0 - 36, Y0 + HA + HB / 2, '−1', { size: 44, fill: C.back, w: 800, a: 'end' });
    S('rect', { x: X0, y: Y0, width: WA + WB, height: HA + HB, fill: 'none', stroke: 'rgba(255,255,255,.35)', 'stroke-width': 2 }, tab);
    const hucre = (x, y, w, hh, fill) => {
      const g = K.g(svg, 0, 0, { o: 0 });
      S('rect', { x, y, width: w, height: hh, fill, stroke: 'rgba(255,255,255,.35)', 'stroke-width': 2 }, g);
      return g;
    };
    const mor = 'rgba(182,156,255,.18)';
    const cA = hucre(X0, Y0, WA, HA, 'rgba(107,227,160,.16)');
    K.t(cA, X0 + WA / 2, Y0 + HA / 2, '3', { size: 64, fill: C.ok, w: 800 });
    const cB = hucre(X0 + WA, Y0, WB, HA, mor);
    const tB = mixLine(K, svg, X0 + WA + WB / 2, Y0 + HA / 2, 44, ['{t +}', { r: '{t 3}' }], { o: 0 });
    const cC = hucre(X0, Y0 + HA, WA, HB, mor);
    const tC = mixLine(K, svg, X0 + WA / 2, Y0 + HA + HB / 2, 44, ['{t −}', { r: '{t 3}' }], { o: 0 });
    const cD = hucre(X0 + WA, Y0 + HA, WB, HB, 'rgba(255,164,92,.16)');
    K.t(cD, X0 + WA + WB / 2, Y0 + HA + HB / 2, '−1', { size: 44, fill: C.back, w: 800 });
    await K.fade(tab, 1, 500);
    await p1;
    const p2 = nf(c.say('Her parça, iki kenarının çarpımı. Dört parça var.', { speak: 'Her parça, iki kenarının çarpımıdır. Dört parça var: üç, artı karekök üç, eksi karekök üç ve eksi bir.' }));
    for (const [g, t] of [[cA], [cB, tB], [cC, tC], [cD]]) { await K.fade(t ? [g, t] : g, 1, 400); await c.wait(350); }
    await p2;
    const p3 = nf(c.say('Köklü iki parça birbirini götürür: +√3 ve −√3.', { speak: 'Köklü iki parça birbirini götürür: artı karekök üç ve eksi karekök üç.' }));
    await par(K.pop(tB), K.pop(tC));
    await par(
      K.to(tB, { x: X0 + WA - tB._w / 2, y: Y0 + HA, o: 0 }, 900), K.to(tC, { x: X0 + WA - tC._w / 2, y: Y0 + HA, o: 0 }, 900),
      K.fade([cB, cC], 0.3, 900));
    nf(K.ring(X0 + WA, Y0 + HA, C.root, 90, 700));
    await p3;
    const p4 = nf(c.say('Geriye <b>3 − 1 = 2</b> kaldı. Kök yok.', { speak: '[excited] Geriye üç eksi bir kaldı, yani iki. Kök yok.' }));
    const son = K.rich(svg, 970, 280, 76, '{g 3}{t  − }{r 1}{t  = }{g 2}', { o: 0 });
    await K.fade(son, 1, 500);
    await p4;
    const p5 = nf(c.say('Bu ikize <b>eşlenik</b> denir: yalnızca ortadaki işaret değişir.', { speak: 'Bu ikize eşlenik denir. Eşlenikte yalnızca ortadaki işaret değişir.' }));
    const es = K.g(svg, 0, 0, { o: 0 });
    mixLine(K, es, 970, 420, 52, [{ r: '{t 3}' }, '{r  − }{t 1}']);
    K.t(es, 970, 478, '↕', { size: 34, fill: C.soft });
    mixLine(K, es, 970, 540, 52, [{ r: '{t 3}' }, '{e  + }{t 1}']);
    await K.fade(es, 1, 500);
    await p5;
    await c.choice({
      tag: 'Dene', q: `${RT(5)} + 2 ifadesinin eşleniği hangisi?`,
      options: [`−${RT(5)} − 2`, `${RT(5)} − 2`, `${RT(5)} + 2`], answer: 1,
      hints: ['İki işareti de değiştirdin. Çarpınca kök kalır; yalnızca ortadaki işaret değişir.', '', 'Bu kendisi. Karesi 9 + 4√5 eder, kök kalır.'],
      right: 'Evet: (√5 + 2)(√5 − 2) = 5 − 4 = 1.',
    });
    c.note(`Ortadaki işaret değişir.<br>(${RT(3)} − 1)(${RT(3)} + 1) = 2`, 'Eşlenik');
  }

  /* ============================================================
     A6 · SAHNE 3 — Uygula: pay ve payda birlikte
     ============================================================ */
  async function sceneA6_3(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const v = 1 / (Math.sqrt(3) - 1);
    const f0 = fracMix(K, svg, 250, 210, 64, ['{t 1}'], [{ r: '{t 3}' }, '{t  − 1}'], { o: 0 });
    const carp = K.t(svg, 392, 210, '·', { size: 64, o: 0 });
    const f1 = fracMix(K, svg, 540, 210, 64, [{ r: '{e 3}', col: C.exp }, '{e  + 1}'], [{ r: '{e 3}', col: C.exp }, '{e  + 1}'], { o: 0 });
    const p1 = nf(c.say('Paydayı eşleniğiyle çarp. Değer bozulmasın diye <b>payı da</b>.', { speak: 'Paydayı eşleniğiyle çarp. Değer bozulmasın diye payı da aynı ifadeyle çarp.' }));
    await K.fade(f0, 1, 500);
    await c.wait(500);
    await K.fade([carp, f1], 1, 500);
    await p1;
    const p2 = nf(c.say('Payda 3 − 1 = 2 oldu; pay √3 + 1.', { speak: 'Payda üç eksi bir, yani iki oldu. Pay ise karekök üç artı bir.' }));
    const es = K.t(svg, 720, 210, '=', { size: 64, o: 0 });
    const f2 = fracMix(K, svg, 880, 210, 64, [{ r: '{t 3}' }, '{t  + 1}'], ['{g 3 − 1}'], { o: 0 });
    await K.fade([es, f2], 1, 500);
    await c.wait(1500);
    const f3 = fracMix(K, svg, 880, 210, 64, [{ r: '{t 3}' }, '{t  + 1}'], ['{g 2}'], { o: 0 });
    await par(K.fade(f2, 0, 400), K.fade(f3, 1, 400)); f2.remove();
    await p2;
    const p3 = nf(c.say(`Değer aynı kaldı: ikisi de yaklaşık ${fmt(v)}.`, { speak: 'Değer aynı kaldı: ikisi de yaklaşık bir virgül otuz yedi.' }));
    const y1 = K.t(svg, 250, 350, '≈ ' + fmt(v), { size: 40, fill: C.soft, o: 0 });
    const y2 = K.t(svg, 880, 350, '≈ ' + fmt(v), { size: 40, fill: C.soft, o: 0 });
    await K.fade([y1, y2], 1, 500);
    await p3;
    await c.choice({
      tag: 'Düşün', q: 'Payı çarpmayı unutursak 1/2 buluruz. Bu, baştaki sayıyla aynı mı?',
      options: ['Aynı', 'Farklı'], answer: 1,
      hints: [`Baştaki sayı ≈ ${fmt(v)}, ama 1/2 = 0,5. Pay da çarpılmalı.`, ''],
      right: `Evet: ${fmt(v)} ≠ 0,5. Pay ve payda birlikte çarpılır.`,
    });
    c.note(`${FR(1, RT(3) + ' − 1')} = ${FR(RT(3) + ' + 1', 2)}<br>Pay ve payda eşlenikle çarpılır.`, 'Paydayı kökten kurtar');
  }

  /* ============================================================
     A6 · SAHNE 4 — Sıra sende: 4/(√5 + 1)
     ============================================================ */
  async function sceneA6_4(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const f0 = fracMix(K, svg, 250, 210, 64, ['{t 4}'], [{ r: '{t 5}' }, '{t  + 1}'], { o: 0 });
    const p1 = nf(c.say('Sıra sende: bu ifadenin paydasını kökten kurtar.', { speak: 'Sıra sende. Dört bölü karekök beş artı bir ifadesinin paydasını kökten kurtar.' }));
    await K.fade(f0, 1, 500);
    await p1;
    await c.choice({
      tag: '1. adım', q: 'Pay ve paydayı hangisiyle çarpalım?',
      options: [`${RT(5)} + 1`, RT(5), `${RT(5)} − 1`], answer: 2,
      hints: ['Bu paydanın kendisi. Karesinde 2√5 kalır; işaret değişmeli.', '(√5 + 1)·√5 = 5 + √5. Kök kaldı.', ''],
      right: 'Evet, eşleniği: √5 − 1.',
    });
    const carp = K.t(svg, 392, 210, '·', { size: 64, o: 0 });
    const f1 = fracMix(K, svg, 540, 210, 64, [{ r: '{e 5}', col: C.exp }, '{e  − 1}'], [{ r: '{e 5}', col: C.exp }, '{e  − 1}'], { o: 0 });
    await K.fade([carp, f1], 1, 500);
    await c.choice({
      tag: '2. adım', q: `(${RT(5)} + 1)(${RT(5)} − 1) kaç eder?`,
      options: ['6', '4', '24'], answer: 1,
      hints: ['5 + 1 yapmışsın. Köklü parçalar götürür; geriye 5 − 1 kalır.', '', '5² − 1 almışsın. √5·√5 = 5’tir.'],
      right: 'Evet: 5 − 1 = 4.',
    });
    const es = K.t(svg, 716, 210, '=', { size: 64, o: 0 });
    const f2 = fracMix(K, svg, 930, 210, 64, ['{t 4(}', { r: '{t 5}' }, '{t  − 1)}'], ['{g 4}'], { o: 0 });
    await K.fade([es, f2], 1, 500);
    await c.choice({
      tag: '3. adım', q: 'Dörtler sadeleşince ne kalır?',
      options: [`${RT(5)} − 1`, `4${RT(5)} − 1`, `${RT(5)} − 4`], answer: 0,
      hints: ['', 'Pay 4·(√5 − 1): 4 bütün parantezi çarpıyor, sadeleşince parantez kalır.', 'Sadeleşen 4, parantezin içine girmez.'],
      right: 'Evet: √5 − 1.',
    });
    const son = mixLine(K, svg, 640, 470, 84, ['{t = }', { r: '{g 5}', col: C.ok }, '{g  − 1}'], { o: 0 });
    await K.fade(son, 1, 500);
    nf(K.ring(680, 470, C.ok, 150, 900));
    await c.say('<b>4/(√5 + 1) = √5 − 1</b>. Paydada kök kalmadı.', { speak: 'Dört bölü karekök beş artı bir, karekök beş eksi bire eşit. Paydada kök kalmadı.' });
  }

  /* ---------- ortak (A7): basamak satırı. Rakamlar yerinde durur, virgül kayar; her kayışta 10'un üssü değişir.
     o: rakam (dizgi) · x0, dx, bosluk, y, size · grup(i): i. rakamın üçlü grup numarası · v0: virgül başta kaç rakamın sağında
     Virgül ve "× 10ⁿ" görünmez başlar (vg, us). kay(k): virgülü k rakamın sağına taşır; üs = v0 − k olur. ---------- */
  function basamak(K, c, o) {
    const { S } = K;
    const g = K.g(K.svg, 0, 0, { o: 0 });
    const n = o.rakam.length;
    const X = (i) => o.x0 + i * o.dx + o.grup(i) * o.bosluk;
    const VX = (k) => (k <= 0 ? X(0) - o.dx / 2 : k >= n ? X(n - 1) + o.dx / 2 : (X(k - 1) + X(k)) / 2);
    const rak = [...o.rakam].map((ch, i) => K.t(g, X(i), o.y, ch, { size: o.size, w: 800 }));
    const iz = K.g(g);
    const vg = K.g(g, VX(o.v0), o.y, { o: 0 });
    /* virgül çizimdir (yazı değil): rakamların altından geçerken üstlerine binmez */
    S('circle', { cx: 0, cy: o.size * 0.3, r: o.size * 0.075, fill: C.exp }, vg);
    S('line', { x1: o.size * 0.03, y1: o.size * 0.33, x2: -o.size * 0.06, y2: o.size * 0.52, stroke: C.exp, 'stroke-width': o.size * 0.075, 'stroke-linecap': 'round' }, vg);
    const us = K.g(g, X(n - 1) + o.dx / 2 + 56, o.y, { o: 0 });
    const ut = K.rich(us, 0, 0, o.size * 0.9, '{t × }{b 10}{e^ 0}', { a: 'start' });
    let yer = o.v0;
    const kay = async (k, ms = 520) => {
      const a = VX(yer), b = VX(k), yb = o.y + o.size * 0.62;
      await c.tween(ms, (e) => { vg._x = lerp(a, b, e); vg._y = o.y + Math.sin(e * Math.PI) * 24; K.place(vg); }, ease.inOut);
      S('path', { d: `M${a},${yb} Q${(a + b) / 2},${yb + 30} ${b},${yb}`, fill: 'none', stroke: C.exp, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.8 }, iz);
      yer = k;
      ut._spans[2].textContent = String(o.v0 - k).replace('-', '−');
    };
    return { g, rak, vg, us, kay };
  }

  /* ============================================================
     A7 · SAHNE 1 — Büyük sayı: virgül sola, üs artar
     ============================================================ */
  async function sceneA7_1(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const B = basamak(K, c, { rakam: '150000000', x0: 210, dx: 72, bosluk: 26, y: 220, size: 76, grup: (i) => Math.floor(i / 3), v0: 9 });
    const p1 = nf(c.say('Güneş 150 000 000 km uzakta. Bu kadar sıfırı saymak zor.', { speak: 'Güneş yüz elli milyon kilometre uzakta. Bu kadar sıfırı her seferinde saymak zor.' }));
    await K.fade(B.g, 1, 500);
    await p1;
    await c.choice({
      q: 'Virgülü 1 ile 5’in arasına taşıyacağız. Kaç basamak kayar?',
      options: ['7', '8', '9'], answer: 1,
      hints: ['Sıfırlar 7 tane; ama virgül 5’in üstünden de geçecek.', '', 'Rakam sayısı 9; ama virgül 1’in soluna geçmiyor.'],
      right: 'Evet, 8 basamak. Birlikte sayalım.',
    });
    const p2 = nf(c.say('Virgül şimdi en sonda. Sola kaydıralım.', { speak: 'Virgül şimdi en sonda duruyor. Onu sola kaydıralım.' }));
    await K.fade([B.vg, B.us], 1, 400);
    await p2;
    const p3 = nf(c.say('Bir basamak sola: sayı 10’a bölündü. Dengelemek için ×10.', { speak: 'Virgül bir basamak sola kayınca sayı ona bölünür. Eşitlik bozulmasın diye yanına bir çarpı on yazarız.' }));
    await B.kay(8, 900);
    await p3;
    const p4 = nf(c.say('Her kayışta sayaç bir artar.', { speak: 'Her kayışta on’un üssündeki sayaç bir artar.' }));
    for (let k = 7; k >= 1; k--) { await B.kay(k); await c.wait(120); }
    await p4;
    await K.fade(B.rak.slice(2), 0.25, 500);
    const p5 = nf(c.say('<b>150 000 000 = 1,5 × 10⁸</b>. Sayaç yine üs.', { speak: 'Yüz elli milyon, bir virgül beş çarpı on üzeri sekize eşit. Sayaç yine üs.' }));
    const son = K.rich(svg, 640, 500, 72, '{t 150 000 000 = }{g 1,5}{t  × }{b 10}{e^ 8}', { o: 0 });
    await K.fade(son, 1, 500);
    await p5;
    c.note(`150 000 000 = 1,5 × ${Pc(10, 8)}<br>Virgül 8 basamak sola.`, 'Büyük sayı');
  }

  /* ============================================================
     A7 · SAHNE 2 — Küçük sayı: virgül sağa, üs negatif
     ============================================================ */
  async function sceneA7_2(c) {
    const K = kit(c); const { svg } = K;
    K.dots();
    const B = basamak(K, c, { rakam: '0000000003', x0: 190, dx: 66, bosluk: 24, y: 220, size: 72, grup: (i) => (i === 0 ? 0 : Math.floor((i - 1) / 3)), v0: 1 });
    K.set(B.vg, { o: 1 });
    const p1 = nf(c.say('Telefon çipindeki en küçük parça: 0,000 000 003 metre.', { speak: 'Telefonundaki çipin en küçük parçası, metrenin milyarda üçü kadar.' }));
    await K.fade(B.g, 1, 500);
    await p1;
    const p2 = nf(c.say('Bu kez virgül sağa kayar; sayaç geri sayar.', { speak: 'Bu kez virgül sağa kayar. Her kayışta sayı onla çarpılır; dengelemek için sayaç bir geri sayar.' }));
    await K.fade(B.us, 1, 400);
    await B.kay(2, 900);
    for (let k = 3; k <= 10; k++) { await B.kay(k); await c.wait(120); }
    await p2;
    await K.fade(B.rak.slice(0, 9), 0.25, 500);
    const p3 = nf(c.say('<b>0,000 000 003 = 3 × 10⁻⁹</b>: 3’ü dokuz kez 10’a böl.', { speak: 'Sonuç: üç çarpı on üzeri eksi dokuz. Yani üçü dokuz kez ona böl.' }));
    const son = K.rich(svg, 640, 500, 72, '{t 0,000 000 003 = }{g 3}{t  × }{b 10}{e^ −9}', { o: 0 });
    await K.fade(son, 1, 500);
    await p3;
    await c.choice({
      tag: 'Dene', q: `${P(10, '−3')} hangisine eşittir?`,
      options: ['−1000', '0,001', '−0,003'], answer: 1,
      hints: ['Eksi üs sayıyı negatif yapmaz; ters çevirir: 1/1000.', '', 'Üs çarpan değildir. 10⁻³ = 1/10³.'],
      right: 'Evet: 10⁻³ = 1/1000 = 0,001.',
    });
    c.note(`0,000 000 003 = 3 × ${Pc(10, '−9')}<br>Virgül 9 basamak sağa.`, 'Küçük sayı');
  }

  /* ============================================================
     A7 · SAHNE 3 — Kural ve tuzak: 1 ≤ a < 10
     ============================================================ */
  async function sceneA7_3(c) {
    const K = kit(c, { touch: true }); const { svg, S } = K;
    K.dots();
    const g1 = K.g(svg, 0, 0, { o: 0 });
    const a1 = K.rich(g1, 400, 150, 68, '{t 15 × }{b 10}{e^ 7}');
    const a2 = K.rich(g1, 880, 150, 68, '{t 1,5 × }{b 10}{e^ 8}');
    K.t(g1, 640, 250, 'ikisi de 150 000 000', { size: 32, fill: C.soft });
    const p1 = nf(c.say('İkisi de 150 000 000 eder. Hangisi bilimsel gösterim?', { speak: 'İkisi de yüz elli milyon eder. [curious] Sence hangisi bilimsel gösterim?' }));
    await K.fade(g1, 1, 500);
    await p1;
    await c.choice({
      q: 'Hangisi bilimsel gösterim?',
      options: [`15 × ${P(10, 7)}`, `1,5 × ${P(10, 8)}`, 'İkisi de'], answer: 1,
      hints: ['Değeri doğru; ama baştaki sayı 10’dan küçük olmalı.', '', 'Değerleri eşit; ama yalnızca birinde baştaki sayı 10’dan küçük.'],
      right: 'Evet: baştaki sayı 1,5.',
    });
    a1.setAttribute('opacity', 0.35); a2.style.fill = C.ok;
    const p2 = nf(c.say('Kural: baştaki sayı <b>1 ile 10 arasında</b> olur.', { speak: 'Kural şu: bilimsel gösterimde baştaki sayı bir ile on arasında olur.' }));
    const kural = K.rich(svg, 640, 420, 80, '{g a}{t  × }{b 10}{e^ n}', { o: 0 });
    const sinir = K.rich(svg, 640, 540, 52, '{t 1 ≤ }{g a}{t  < 10}', { o: 0 });
    await K.fade(kural, 1, 500);
    await K.fade(sinir, 1, 500);
    await p2;
    await c.say('10 dahil değil: 10 × 10² yerine 1 × 10³ yazılır.', { speak: 'On dahil değil. On çarpı on üzeri iki yerine, bir çarpı on üzeri üç yazılır.' });
    c.note(`a × ${Pc(10, 'n')}, 1 ≤ a &lt; 10<br>Virgül kayar, üs sayar.`, 'Bilimsel gösterim');

    /* sürükle: bilimsel mi, değil mi? */
    await K.fade([g1, kural, sinir], 0, 400); g1.remove(); kural.remove(); sinir.remove();
    const bins = [['bilimsel gösterim', C.ok, 340], ['değil', C.bad, 940]].map(([ad, col, x]) => {
      const g = K.g(svg, x, 510, { o: 0 });
      S('rect', { x: -270, y: -160, width: 540, height: 320, rx: 18, fill: 'rgba(255,255,255,.04)', stroke: col, 'stroke-width': 2, 'stroke-dasharray': '8 8' }, g);
      K.t(g, 0, -122, ad, { size: 30, fill: col, w: 700 });
      return { g, x, y: 510, w: 540, h: 320 };
    });
    const KART = [
      { spec: '{t 12 × }{b 10}{e^ 3}', bin: 1, ok: '12, 10’dan büyük. Doğrusu 1,2 × 10⁴.', no: 'Baştaki sayıya bak: 12, 10’dan büyük.' },
      { spec: '{t 4,5 × }{b 10}{e^ −4}', bin: 0, ok: '4,5, 1 ile 10 arasında.', no: 'Baştaki sayı 4,5: 1 ile 10 arasında. Üssün eksi olması sorun değil.' },
      { spec: '{t 0,7 × }{b 10}{e^ 5}', bin: 1, ok: '0,7, 1’den küçük. Doğrusu 7 × 10⁴.', no: 'Baştaki sayıya bak: 0,7, 1’den küçük.' },
      { spec: '{t 8 × }{b 10}{e^ 6}', bin: 0, ok: '8, 1 ile 10 arasında.', no: 'Baştaki sayı 8: 1 ile 10 arasında.' },
      { spec: '{t 10 × }{b 10}{e^ 2}', bin: 1, ok: '10 dahil değil. Doğrusu 1 × 10³.', no: '10 dahil değil: baştaki sayı 10’dan küçük olmalı.' },
    ];
    const cards = KART.map((k, i) => {
      const g = K.g(svg, 160 + i * 240, 150, { o: 0 });
      S('rect', { x: -108, y: -42, width: 216, height: 84, rx: 14, fill: C.panel2, stroke: 'rgba(255,255,255,.25)', 'stroke-width': 2 }, g);
      K.rich(g, 0, 4, 38, k.spec);
      return { ...k, g };
    });
    const p3 = nf(c.say('Beş kart var. Hangileri bilimsel gösterim?', { speak: 'Beş kart var. Hangileri bilimsel gösterim, hangileri değil?' }));
    await K.stagger(bins.map((b) => b.g), 100, (g) => K.fade(g, 1, 300));
    await K.stagger(cards.map((k) => k.g), 100, (g) => K.fade(g, 1, 300));
    await p3;
    const fb = h('div', { class: 'fb info', html: 'Baştaki sayı 1 ile 10 arasında mı?' });
    const pnl = c.panel('Sıra sende', h('p', { class: 'q', html: 'Her kartı doğru kutuya sürükle.' }), fb);
    const dolu = [0, 0];
    const E = eslestir(K, c, {
      cards, bins,
      yer: (k) => { const i = dolu[k.bin]++; return { x: bins[k.bin].x - 124 + (i % 2) * 248, y: 470 + Math.floor(i / 2) * 104 }; },
      dogru: (k) => c.feedback(fb, 'ok', 'Doğru: ' + k.ok),
      yanlis: (k) => c.feedback(fb, 'no', k.no),
    });
    const goster = h('button', { class: 'btn ghost', onclick: () => { goster.remove(); nf(E.coz()); } }, 'Çözümü göster ›');
    c.act.appendChild(goster);
    await E.bitti;
    goster.remove(); pnl.remove();
    await c.say('Değer aynı kalsa da bilimsel gösterimin tek bir yazımı var.', { speak: 'Değer aynı kalsa da, bir sayının bilimsel gösterimi tek bir biçimde yazılır.' });
  }

  /* ============================================================
     A8 · SAHNE 1 — Tam çıkmıyor: iki tam sayının arası
     ============================================================ */
  async function sceneA8_1(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const T = { x: 100, y: 150, s: 380 };
    const tarla = K.g(svg, 0, 0, { o: 0 });
    S('rect', { x: T.x, y: T.y, width: T.s, height: T.s, rx: 6, fill: 'rgba(107,227,160,.14)', stroke: C.ok, 'stroke-width': 3 }, tarla);
    K.t(tarla, T.x + T.s / 2, T.y + T.s / 2, '1000 m²', { size: 52, fill: C.ok, w: 800 });
    let kenar = K.t(tarla, T.x + T.s / 2, T.y + T.s + 46, '? m', { size: 44, fill: C.root, w: 800 });
    const p1 = nf(c.say('Alanı 1000 m² olan kare tarlanın kenarı kaç metre?', { speak: '[curious] Alanı bin metrekare olan kare bir tarlanın kenarı kaç metredir?' }));
    await K.fade(tarla, 1, 500);
    await p1;
    await c.choice({
      q: 'Kenar yaklaşık kaç metre olabilir?',
      options: ['500', '31 ile 32 arası', '33 ile 34 arası'], answer: 1,
      hints: ['500·500 = 250 000 eder. Kök, sayının yarısı değildir.', '', '33·33 = 1089. 1000’i geçti.'],
      right: 'Evet. Nedenine bakalım.',
    });
    const p2 = nf(c.say('31·31 = 961: az. Tarla daha büyük.', { speak: 'Otuz bir çarpı otuz bir, dokuz yüz altmış bir eder. Az; tarla bundan büyük.' }));
    const d1 = K.rich(svg, 610, 200, 54, '{b 31}{t ·}{b 31}{t  = 961   }{r az}', { a: 'start', o: 0 });
    await K.fade(d1, 1, 500);
    await p2;
    const p3 = nf(c.say('32·32 = 1024: fazla.', { speak: 'Otuz iki çarpı otuz iki, bin yirmi dört eder. Bu da fazla.' }));
    const d2 = K.rich(svg, 610, 290, 54, '{b 32}{t ·}{b 32}{t  = 1024   }{w fazla}', { a: 'start', o: 0 });
    await K.fade(d2, 1, 500);
    await p3;
    /* sayı doğrusu: 31 ile 32, altlarında kareleri */
    const D = { x0: 640, x1: 1160, y: 450 }, xk = D.x0 + (D.x1 - D.x0) * (Math.sqrt(1000) - 31);
    const dog = K.g(svg, 0, 0, { o: 0 });
    K.line(dog, D.x0 - 30, D.y, D.x1 + 30, D.y, C.soft, 4);
    [[D.x0, '31', '961'], [D.x1, '32', '1024']].forEach(([x, a, b]) => {
      K.line(dog, x, D.y - 18, x, D.y + 18, C.text, 4);
      K.t(dog, x, D.y - 46, a, { size: 36, fill: C.base, w: 800 });
      K.t(dog, x, D.y + 50, b, { size: 30, fill: C.soft, w: 700 });
    });
    K.t(dog, D.x0 - 60, D.y - 46, 'kenar', { size: 24, fill: C.soft, a: 'end' });
    K.t(dog, D.x0 - 60, D.y + 50, 'alan', { size: 24, fill: C.soft, a: 'end' });
    const nokta = K.g(dog, xk, D.y);
    S('circle', { r: 11, fill: C.root, stroke: '#fff', 'stroke-width': 3 }, nokta);
    K.t(nokta, 0, 50, '1000', { size: 30, fill: C.ok, w: 800 });
    let ust = K.t(nokta, 0, -46, '?', { size: 40, fill: C.root, w: 800 });
    const p4 = nf(c.say('Kenar 31 ile 32 arasında; tam sayı değil.', { speak: 'Demek ki kenar otuz bir ile otuz iki arasında. Bir tam sayı değil.' }));
    await K.fade(dog, 1, 600);
    await p4;
    const p5 = nf(c.say('Bu kenarın adı <b>√1000</b>. Tam çıkmayan bir kök.', { speak: 'Bu kenarın adı karekök bin. Tam çıkmayan bir kök.' }));
    ust.remove(); kenar.remove();
    ust = K.rad(nokta, 0, -50, '{t 1000}', 36); K.set(ust, { x: -ust._w / 2 });
    kenar = mixLine(K, tarla, T.x + T.s / 2, T.y + T.s + 46, 44, [{ r: '{t 1000}' }, '{t  m}']);
    nf(K.ring(xk, D.y, C.root, 80, 800));
    await p5;
    c.note(`31 &lt; ${RT(1000)} &lt; 32<br>çünkü 961 &lt; 1000 &lt; 1024`, 'İki tam sayının arası');
  }

  /* ============================================================
     A8 · SAHNE 2 — Yakınlaş: onda birler, yüzde birler
     ============================================================ */
  async function sceneA8_2(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const X0 = 140, X1 = 1140, YL = 260;
    let va = 30.5, vb = 32.5, gor = 0;   // görünen aralık ve en ince çentik düzeyi
    const X = (v) => X0 + (v - va) / (vb - va) * (X1 - X0);
    K.line(svg, X0 - 40, YL, X1 + 40, YL, C.soft, 4);
    const cent = [];
    const ekle = (k, lev) => {   // k: yüzde bir cinsinden (3160 = 31,60)
      const g = K.g(svg, X(k / 100), YL, { o: 0 }), hgt = [22, 16, 12][lev];
      K.line(g, 0, -hgt, 0, hgt, lev ? C.soft : C.text, lev ? 3 : 4);
      K.t(g, 0, 54, fmt(k / 100), { size: lev ? 26 : 34, fill: lev ? C.soft : C.text, w: lev ? 600 : 800 });
      cent.push({ v: k / 100, g, lev });
    };
    [3100, 3200].forEach((k) => ekle(k, 0));
    for (let k = 3110; k < 3200; k += 10) ekle(k, 1);
    for (let k = 3161; k < 3170; k++) ekle(k, 2);
    const isaret = K.g(svg, X(31.5), YL, { o: 0 });
    S('path', { d: 'M0,-24 L-14,-50 L14,-50 Z', fill: C.exp }, isaret);
    const isT = K.t(isaret, 0, -76, '', { size: 34, fill: C.exp, w: 800 });
    let kNow = 3150;
    const yerles = () => {
      cent.forEach((t) => { const x = X(t.v), ic = x >= X0 - 1 && x <= X1 + 1; K.set(t.g, { x: clamp(x, -300, 1600), o: ic && t.lev <= gor ? 1 : 0 }); });
      K.set(isaret, { x: X(kNow / 100) });
    };
    const zoom = (a2, b2, ms = 1300) => { const a1 = va, b1 = vb; return c.tween(ms, (e) => { va = lerp(a1, a2, e); vb = lerp(b1, b2, e); yerles(); }, ease.inOut); };
    const ac = async (lev) => { gor = lev; const yeni = cent.filter((t) => t.lev === lev); yeni.forEach((t) => K.set(t.g, { x: X(t.v), o: 0 })); await K.fade(yeni.map((t) => t.g), 1, 400); };
    yerles();

    /* alttaki hesap: x² ve 1000'e uzaklığı */
    let satir = null, durum = null;
    const hesap = (k, y, tek) => {
      const kare = k * k / 10000, az = kare < 1000;
      return K.rich(svg, 640, y, tek ? 60 : 50, `{b ${fmt(k / 100)}}{e^ 2}{t  = }{${az ? 'r' : 'w'} ${fmt(kare)}}${tek ? '' : `{t    }{${az ? 'r' : 'w'} ${az ? 'az' : 'fazla'}}`}`);
    };
    const goster = (k) => {
      kNow = k; K.set(isaret, { x: X(k / 100) }); isT.textContent = fmt(k / 100);
      if (satir) satir.remove(); if (durum) durum.remove();
      const kare = k * k / 10000, fark = Math.abs(1000 - kare);
      satir = hesap(k, 450, true);
      durum = K.t(svg, 640, 540, fark === 0 ? 'tam 1000' : `1000’den ${fmt(fark)} ${kare < 1000 ? 'az' : 'fazla'}`, { size: 36, fill: kare < 1000 ? C.back : C.bad, w: 700 });
    };
    const temizle = () => { if (satir) satir.remove(); if (durum) durum.remove(); satir = durum = null; K.set(isaret, { o: 0 }); };
    const komsu = async (a, b) => {   // iki komşuyu alt alta yaz, aralarını boya
      const bant = S('rect', { x: X(a / 100), y: YL - 7, width: X(b / 100) - X(a / 100), height: 14, rx: 7, fill: C.root, opacity: 0 }, svg);
      const r1 = hesap(a, 440, false), r2 = hesap(b, 530, false);
      r1.setAttribute('opacity', 0); r2.setAttribute('opacity', 0);
      await K.fade([bant, r1], 1, 500);
      await c.wait(900);
      await K.fade(r2, 1, 500);
      return [bant, r1, r2];
    };

    const p1 = nf(c.say('√1000, 31 ile 32 arasında. Yakınlaşalım: <b>onda birler</b>.', { speak: 'Karekök bin, otuz bir ile otuz iki arasında. Bu aralığa yakınlaşalım: onda birler.' }));
    await c.wait(900);
    await zoom(31, 32);
    await ac(1);
    await p1;
    K.set(isaret, { o: 1 });
    let sl = c.slider({ label: 'Kenar (m)', min: 3100, max: 3200, step: 10, value: 3150, fmt: (k) => fmt(k / 100), onInput: goster });
    c.say('Karesi 1000’e en yakın iki komşuyu bul.', { noWait: true });
    await c.cont();
    sl.remove(); temizle();
    const p2 = nf(c.say('31,6² = 998,56: az. 31,7² = 1004,89: fazla.', { speak: 'Otuz bir virgül altının karesi dokuz yüz doksan sekiz virgül elli altı: az. Otuz bir virgül yedinin karesi bin dört virgül seksen dokuz: fazla.' }));
    let iz = await komsu(3160, 3170);
    await p2;
    await K.fade(iz, 0, 400); iz.forEach((e) => e.remove());
    const p3 = nf(c.say('Bir basamak daha yakınlaş: <b>yüzde birler</b>.', { speak: 'Bir basamak daha yakınlaşalım: yüzde birler.' }));
    await zoom(31.6, 31.7);
    await ac(2);
    await p3;
    kNow = 3165; K.set(isaret, { o: 1 });
    sl = c.slider({ label: 'Kenar (m)', min: 3160, max: 3170, step: 1, value: 3165, fmt: (k) => fmt(k / 100), onInput: goster });
    c.say('Yine iki komşuyu bul.', { noWait: true });
    await c.cont();
    sl.remove(); temizle();
    const p4 = nf(c.say('31,62² = 999,82: az. 31,63² = 1000,46: fazla.', { speak: 'Otuz bir virgül altmış ikinin karesi az, otuz bir virgül altmış üçün karesi fazla.' }));
    iz = await komsu(3162, 3163);
    await p4;
    await K.fade(iz.slice(1), 0, 400); iz[1].remove(); iz[2].remove();
    const p5 = nf(c.say('Her basamakta aralık daralır. Şimdilik: √1000 ≈ 31,62.', { speak: 'Her basamakta aralık biraz daha daralır. Şimdilik karekök bin, yaklaşık otuz bir virgül altmış iki.' }));
    const son = mixLine(K, svg, 640, 480, 72, [{ r: '{t 1000}' }, '{e  ≈ }{g 31,62}'], { o: 0 });
    await K.fade(son, 1, 500);
    await p5;
  }

  /* ============================================================
     A8 · SAHNE 3 — Yaklaşık, eşit değil
     ============================================================ */
  async function sceneA8_3(c) {
    const K = kit(c); const { svg, S } = K;
    K.dots();
    const sat = K.g(svg, 0, 0, { o: 0 });
    const kok = K.rad(sat, 355, 110, '{t 1000}', 80);
    const sx = 355 + kok._w + 62;
    const isaret = K.t(sat, sx, 110, '=', { size: 80, w: 800 });
    K.t(sat, sx + 56, 110, '31,6', { size: 80, fill: C.ok, w: 800, a: 'start' });
    const p1 = nf(c.say('Çit için 31,6 metre yeter. Ama dikkat: <b>eşit değil</b>.', { speak: 'Çit için otuz bir virgül altı metre yeter. Ama dikkat: bu eşitlik değil.' }));
    await K.fade(sat, 1, 500);
    await c.wait(1400);
    isaret.textContent = '≈'; isaret.style.fill = C.exp;
    nf(K.ring(sx, 110, C.exp, 80, 700));
    await p1;
    const p2 = nf(c.say('≈ işareti “yaklaşık eşit” demek.', { speak: 'Bu dalgalı işaret, yaklaşık eşit demek.' }));
    const ad = K.t(svg, sx, 180, 'yaklaşık eşit', { size: 28, fill: C.exp, w: 700, o: 0 });
    await K.fade(ad, 1, 400);
    await p2;
    /* 1000 m²'lik kare ile 31,6'lık kare: fark abartılı çizilir */
    const Q = { x: 150, y: 270, s: 340, i: 300 };
    const kare = K.g(svg, 0, 0, { o: 0 });
    const fark = S('path', { d: `M${Q.x},${Q.y} h${Q.s} v${Q.s} h${-(Q.s - Q.i)} v${-Q.i} h${-Q.i} Z`, fill: 'rgba(255,122,112,.0)', stroke: 'none' }, kare);
    S('rect', { x: Q.x, y: Q.y + Q.s - Q.i, width: Q.i, height: Q.i, fill: 'rgba(107,227,160,.16)', stroke: C.ok, 'stroke-width': 3 }, kare);
    S('rect', { x: Q.x, y: Q.y, width: Q.s, height: Q.s, fill: 'none', stroke: C.soft, 'stroke-width': 2, 'stroke-dasharray': '8 8' }, kare);
    K.t(kare, Q.x + Q.i / 2, Q.y + Q.s - Q.i / 2, '998,56 m²', { size: 36, fill: C.ok, w: 800 });
    K.t(kare, Q.x + Q.s + 18, Q.y + 16, '1000 m²', { size: 28, fill: C.soft, a: 'start' });
    K.t(kare, Q.x + Q.s / 2, Q.y + Q.s + 34, 'ölçekli değil', { size: 22, fill: C.soft });
    const p3 = nf(c.say('Çünkü 31,6·31,6 = 998,56. Tam 1000 değil.', { speak: 'Çünkü otuz bir virgül altı çarpı otuz bir virgül altı, dokuz yüz doksan sekiz virgül elli altı eder. Tam bin değil.' }));
    const e1 = K.rich(svg, 900, 370, 50, '{b 31,6}{t ·}{b 31,6}{t  = }{g 998,56}', { o: 0 });
    await K.fade([kare, e1], 1, 600);
    await p3;
    const p4 = nf(c.say('Aradaki küçük farka <b>hata payı</b> denir.', { speak: 'Aradaki bu küçük farka hata payı denir.' }));
    const e2 = K.rich(svg, 900, 470, 44, '{t 1000 − 998,56 = }{w 1,44 m²}', { o: 0 });
    const hp = K.t(svg, 900, 540, 'hata payı', { size: 30, fill: C.bad, w: 700, o: 0 });
    await par(c.tween(600, (t) => fark.setAttribute('fill', `rgba(255,122,112,${0.45 * t})`)), K.fade([e2, hp], 1, 600));
    await p4;
    await c.choice({
      tag: 'Dene', q: `${RT(10)} ≈ 3,16. Öyleyse 3,16·3,16 kaç eder?`,
      options: ['Tam 10', '9,9856', '6,32'], answer: 1,
      hints: ['Yaklaşık değer tam değer değildir. 3,16·3,16 biraz eksik kalır.', '', 'İki katını almışsın. Kare, sayıyı kendisiyle çarpmaktır.'],
      right: 'Evet: 10’a çok yakın ama eşit değil.',
    });
    c.note(`${RT(1000)} ≈ 31,6<br>≈ : yaklaşık eşit. 31,6² = 998,56`, 'Yaklaşık değer');
  }

  /* ============================================================
     DERS TANIMI
     ============================================================ */
  const rt = (x) => RT(x);
  const S = [
    { title: 'Bir video, iki kişi, bir ağaç', goal: 'Tekrarlı iki katına çıkışın çok hızlı büyüdüğünü sez.', run: scene1 },
    { title: 'Üs: “kaç tane çarpan?” sayacı', goal: 'Tekrarlı çarpımı üslü yaz; taban ile üssü ayır.', run: scene2 },
    { title: 'Yan yana yazınca sayaçlar toplanır', goal: 'aᵐ·aⁿ = aᵐ⁺ⁿ kuralını “toplam kaç tane a?” sayımıyla bul.', run: scene3 },
    { title: 'Bölmek eşleşenleri götürmektir', goal: 'aᵐ/aⁿ = aᵐ⁻ⁿ kuralını sadeleşen çarpanlar olarak gör.', run: scene4 },
    { title: 'Grup grup tekrar', goal: '(aᵐ)ⁿ = aᵐ·ⁿ ve (a·b)ⁿ = aⁿ·bⁿ kurallarını gerekçelendir.', run: scene5 },
    { title: 'Geri sar: a⁰ = 1 ve a⁻ⁿ', goal: 'Her geri adımda ikiye bölerek sıfır ve negatif üse ulaş.', run: scene6 },
    { title: 'Üs kuralları arenası', goal: 'Kuralları karışık biçimde uygula; toplamada işlemediğini fark et.', run: scene7 },
    { title: 'Kök: yolculuğun tam ortası', goal: 'Karekökü “kendisiyle çarpılınca a veren sayı” olarak gör.', run: scene8 },
    { title: 'Ortadaki üs kaç? √a = a^(1/2)', goal: 'aˣ·aˣ = a eşitliğinden x = 1/2 sonucunu çıkar.', run: scene9 },
    { title: 'Köklerle çarpma ve sadeleştirme', goal: '√a·√b = √(ab) ve “çiftler dışarı” ile sadeleştirme.', run: scene10 },
    { title: 'Köklerle toplama, paydayı rasyonel yap', goal: 'Benzer kökleri topla; kök paydayı yok et.', run: scene11 },
    { title: 'Tuzak: √(a+b) ≠ √a + √b', goal: 'Klasik yanılgıyı sayısal karşı örnekle çürüt.', run: scene12 },
    { title: 'Videoyu geri sar: toparlama', goal: 'Kök = geri sarma; tüm kurallar tek fikir.', run: scene13 },
  ];

  /* Bölüm A kısa derslere ayrılır. Sayfa, hangi parçayı oynatacağını window.DERS_PARCA ile söyler. */
  const PARCALAR = {
    a1: {
      title: 'Üs bir sayaçtır',
      hook: 'Bir video, izleyen herkesin 2 kişiye yollamasıyla yayılıyor. <b>10. turda</b> kaç kişi alır?',
      scenes: S.slice(0, 5),
      quiz: [
      {
        q: `${P(3, 2)} · ${P(3, 4)} işleminin sonucu aşağıdakilerden hangisidir?`,
        options: [P(3, 8), P(3, 6), P(9, 6), P(6, 6)], answer: 1,
        why: [
          'Üsleri çarpmışsın (2·4). Oysa 2 tane 3 ile 4 tane 3 yan yana yazılınca 6 tane 3 olur.',
          `Aynı tabanda çarpmada üsler toplanır: 2 + 4 = 6. Kontrol: ${3 ** 2}·${3 ** 4} = ${3 ** 6} = ${P(3, 6)}.`,
          '3·3 = 9 diyerek tabanları çarpmışsın, üsleri toplamışsın. Taban aynı kalır, yalnızca sayaç artar.',
          'Tabanları toplamışsın (3 + 3 = 6). Üs yasaları tabanlarla işlem yapmaz.'],
        scene: 2,
      },
      {
        q: `${FR(`(${P(2, 3)})<sup>2</sup>`, P(2, 4))} ifadesinin eşiti nedir?`,
        options: [P(2, 1), P(2, 2), P(2, '3/2'), P(2, 10)], answer: 1,
        why: [
          '(2³)² için 3 + 2 = 5 almışsın, sonra 5 − 4 = 1 yapmışsın; üssün üssünde üsler toplanmaz, çarpılır.',
          `(2³)² = 2⁶ (üsler çarpılır); 2⁶ / 2⁴ = 2⁶⁻⁴ = 2² = 4. Kontrol: ${2 ** 6}/${2 ** 4} = ${2 ** 6 / 2 ** 4}.`,
          'Önce 6 ÷ 4 demişsin (üsleri bölmüşsün). Bölmede üsler bölünmez, çıkarılır (6 − 4 = 2).',
          'Bölmede üsleri toplamışsın (6 + 4). Bölme sayaçları geri sarar, yani çıkarır.'],
        scene: 4,
      },
      ],
      summary: [
        `<b>Üs bir sayaçtır.</b> ${P(2, 3)} = 2·2·2: üs, kaç tane çarpan olduğunu sayar.`,
        '<b>Sayaçlar:</b> çarpınca toplanır, bölünce çıkarılır, üssün üssünde çarpılır.',
        '<b>Yalnızca çarpma ve bölmede.</b> 2³ + 2⁴ = 24 eder, 2⁷ değil.',
      ],
      next: { href: 'a2-geri-sar.html', label: 'Sonraki: Geri sar ›' },
    },
    a2: {
      title: 'Geri sar: sıfır ve negatif üs',
      hook: '1024 kişiye ulaşan videoyu geri sarıyoruz. Başlangıcın da gerisine gidersek ne olur?',
      scenes: S.slice(5, 7),
      quiz: [
        {
          q: `${P(2, '−3')} kaça eşittir?`,
          options: ['−8', FR(1, 8), '−6', FR(1, 6)], answer: 1,
          why: [
            'Eksi üs sayıyı negatif yapmaz. 2³ = 8’i ters çevirir: 1/8.',
            '2⁻³ = 1/2³ = 1/8. Her geri turda ikiye bölünür: 1 → 1/2 → 1/4 → 1/8.',
            'Tabanla üssü çarpmışsın (2·(−3)). Üs, kaç kez bölündüğünü sayar.',
            '2·3 = 6 alıp ters çevirmişsin. 2³ = 2·2·2 = 8’dir; tersi 1/8.'],
          scene: 0,
        },
        {
          q: `${P(5, 0)} + ${P(2, '−1')} işleminin sonucu kaçtır?`,
          options: [FR(3, 2), FR(1, 2), '−1', '2'], answer: 0,
          why: [
            '5⁰ = 1 ve 2⁻¹ = 1/2. Toplam: 1 + 1/2 = 3/2.',
            '5⁰ = 0 almışsın. Sıfırıncı kuvvet 1’dir.',
            '2⁻¹ = −2 almışsın. Negatif üs sayıyı negatif yapmaz, ters çevirir: 1/2.',
            '2⁻¹ = 1 almışsın. 2⁻¹ = 1/2’dir.'],
          scene: 0,
        },
      ],
      summary: [
        `<b>Eksi üs negatif yapmaz, ters çevirir.</b> ${P(2, '−3')} = 1/8`,
        `<b>${P('a', 0)} = 1</b> (a ≠ 0): geri sararken 2¹ = 2’den sonra 1 gelir.`,
      ],
      next: { href: 'a3-kok-yarim-us.html', label: 'Sonraki: Kök = yarım üs ›' },
    },
    a3: {
      title: 'Kök = yarım üs',
      hook: 'Video 10 turda 1024 kişiye ulaştı. Yolculuğun <b>tam ortasında</b> kaç kişi vardı?',
      scenes: S.slice(7, 9),
      quiz: [
        {
          q: `Bir video 8 turda ${P(2, 8)} = 256 kişiye ulaşıyor. Tam ortada, 4. turda kaç kişi vardı?`,
          options: ['16', '128', '32', '64'], answer: 0,
          why: [
            '√256 = 16, çünkü 16·16 = 256. Üs dilinde: 2⁸’in yarım üssü 2⁴.',
            '256’nın yarısını almışsın. Kök sayının yarısı değildir; kendisiyle çarpılınca 256 veren sayıdır.',
            '32·32 = 1024 eder, 256 değil.',
            '64·64 = 4096 eder, 256 değil.'],
          scene: 0,
        },
      {
        q: `${P(9, '1/2')} · ${P(5, 0)} − ${P(2, '−1')} işleminin sonucu kaçtır?`,
        options: [FR(5, 2), '4', '−' + FR(1, 2), '5'], answer: 0,
        why: [
          `${P(9, '1/2')} = √9 = 3; ${P(5, 0)} = 1; ${P(2, '−1')} = 1/2. Hesap: 3·1 − 1/2 = 5/2.`,
          '9^(1/2)\'yi "yarısı" sanıp 4,5 almışsın (4,5·1 − 0,5 = 4). Üs 1/2 kök demektir, yarıya bölme değil.',
          '5⁰ = 0 almışsın (3·0 − 1/2). Sıfırıncı kuvvet 1\'dir.',
          '2⁻¹ = −2 almışsın, sonra 3 − (−2) = 5 yapmışsın. Negatif üs sayıyı negatif yapmaz, ters çevirir (1/2).'],
        scene: 1,
      },
      ],
      summary: [
        `<b>Kök, sayacı ikiye böler:</b> √a = ${P('a', '1/2')}`,
        '√a, kendisiyle çarpılınca a veren sayıdır: √1024 = 32.',
      ],
      next: { href: 'a4-koklerle-islem.html', label: 'Sonraki: Köklerle işlem ›' },
    },
    a4: {
      title: 'Köklerle işlem',
      hook: '√9 + √16 ile √(9+16) aynı mı? Köklerle çarpma, toplama ve en bilinen tuzak.',
      scenes: S.slice(9, 13),
      quiz: [
      {
        q: `${rt(8)} + ${rt(18)} ifadesinin eşiti aşağıdakilerden hangisidir?`,
        options: ['5' + rt(2), rt(26), '13', '6' + rt(2)], answer: 0,
        why: [
          `√8 = 2√2, √18 = 3√2 (çiftler dışarı). 2√2 + 3√2 = 5√2 ≈ ${fmt(5 * Math.SQRT2)}.`,
          `Kök içlerini toplamışsın (8 + 18 = 26): √(a+b) ≠ √a + √b. √26 ≈ ${fmt(Math.sqrt(26))}, oysa toplam ≈ ${fmt(Math.sqrt(8) + Math.sqrt(18))}.`,
          'Kökü "yarısı" sanmışsın (8/2 = 4, 18/2 = 9, 4 + 9 = 13). Kök yarısı değildir.',
          'Katsayıları çarpmışsın (2·3 = 6). Benzer köklü terimlerde katsayılar toplanır (2 + 3 = 5).'],
        scene: 1,
      },
      {
        q: `${FR(6, rt(3))} ifadesinin paydası rasyonel yapılırsa sonuç ne olur?`,
        options: ['2' + rt(3), '2', '6' + rt(3), FR(rt(3), 2)], answer: 0,
        why: [
          `√3/√3 = 1 ile genişletilir: (6·√3)/(√3·√3) = 6√3/3 = 2√3 ≈ ${fmt(6 / Math.sqrt(3))}.`,
          `√3'ü 3 sanıp 6/3 = 2 almışsın. √3 ≈ 1,73'tür; 6/1,73 ≈ ${fmt(6 / Math.sqrt(3))}, 2 değil.`,
          `Yalnızca paya √3 ile çarpmışsın, paydayı unutmuşsun; 6√3 ≈ ${fmt(6 * Math.sqrt(3))} olur, değer değişir.`,
          `Pay ile paydayı karıştırmışsın. 6/√3 ≈ ${fmt(6 / Math.sqrt(3))}, √3/2 ≈ ${fmt(Math.sqrt(3) / 2)}.`],
        scene: 1,
      },
      ],
      summary: [
        '<b>Kök çarpmaya dağılır, toplamaya dağılmaz.</b> √(9+16) = 5, ama √9 + √16 = 7.',
        '<b>Çiftler dışarı:</b> √72 = 6√2. <b>Aynı kökler toplanır:</b> √8 + √18 = 5√2.',
        '<b>Rasyonel payda:</b> 6/√3 = 2√3.',
      ],
      next: { href: 'a5-rasyonel-us.html', label: 'Sonraki: Rasyonel üs ›' },
    },
    a5: {
      title: 'Rasyonel üs ve n. kök',
      hook: 'Video 9 turda 512 kişiye ulaştı. Yolu <b>üçe</b> bölersek ilk parçanın sonunda kaç kişi vardı?',
      scenes: [
        { title: 'Üçe böl: küpkök', goal: 'Küpkökü “üç kez çarpılınca a veren sayı” olarak gör; ∛a = a^(1/3).', run: sceneA5_1 },
        { title: 'n’ye böl: n. kök', goal: 'ⁿ√a = a^(1/n) kuralını yolun n eşit parçasıyla kur.', run: sceneA5_2 },
        { title: 'Payda kökü, pay kuvveti söyler', goal: 'a^(m/n) = (ⁿ√a)^m: böl, sonra yürü.', run: sceneA5_3 },
        { title: 'Sıra sende: değerini bul', goal: 'Rasyonel üslü ifadeleri değerleriyle eşle; üssü çarpan sanma.', run: sceneA5_4 },
      ],
      quiz: [
        {
          q: `${P(27, '1/3')} kaçtır?`,
          options: ['9', '3', '81', FR(1, 27)], answer: 1,
          why: [
            '27’yi 3’e bölmüşsün. Üs 1/3 bölme değil, küpkök demektir.',
            '3·3·3 = 27, yani ∛27 = 3.',
            '27 ile 3’ü çarpmışsın. Üssün paydası kök demektir.',
            'Ters çevirmek eksi üssün işidir. Kesirli üs kök aldırır.'],
          scene: 1,
        },
        {
          q: `${P(16, '3/4')} kaçtır?`,
          options: ['12', '64', '8', '6'], answer: 2,
          why: [
            '16 ile 3/4’ü çarpmışsın. Üs çarpan değildir.',
            'Karekök almışsın (√16 = 4, 4³ = 64). Payda 4: dördüncü kök, yani 2.',
            'Payda 4: ⁴√16 = 2. Pay 3: 2·2·2 = 8.',
            '⁴√16 = 2 doğru; ama 2³ = 2·2·2 = 8’dir, 2·3 değil.'],
          scene: 2,
        },
      ],
      summary: [
        `<b>Payda kökü, pay kuvveti söyler.</b> ${P(8, '2/3')} = (${M.m(M.sqrt(8, 3))})² = 4`,
        `<b>${M.m(M.sqrt('a', 'n'))} = ${P('a', '1/n')}</b>: ${M.m(M.sqrt(16, 4))} = 2, çünkü 2·2·2·2 = 16.`,
      ],
      next: { href: 'a6-eslenik.html', label: 'Sonraki: Eşlenik ›' },
    },
    a6: {
      title: 'Eşlenik',
      hook: `6/√3’te paydayı √3 ile çarpmak yetmişti. Payda <b>√3 − 1</b> olursa da yeter mi?`,
      scenes: [
        { title: 'Eski yöntem tutmuyor', goal: 'İki terimli paydada tek kökle çarpmanın kökü yok etmediğini gör.', run: sceneA6_1 },
        { title: 'İkizini bul: dört parça', goal: '(√3 − 1)(√3 + 1) çarpımında köklü parçaların götürdüğünü gör.', run: sceneA6_2 },
        { title: 'Pay ve payda birlikte', goal: 'Paydayı eşlenikle rasyonel yap; değerin değişmediğini doğrula.', run: sceneA6_3 },
        { title: 'Sıra sende: paydayı kökten kurtar', goal: '4/(√5 + 1) ifadesini adım adım sadeleştir.', run: sceneA6_4 },
      ],
      quiz: [
        {
          q: `${rt(7)} − 2 ifadesinin eşleniği hangisidir?`,
          options: [`−${rt(7)} + 2`, `${rt(7)} + 2`, `${rt(7)} − 2`, rt(7)], answer: 1,
          why: [
            'İki işareti de değiştirdin; bu, ifadenin eksilisi. Çarpınca kök kalır.',
            'Yalnızca ortadaki işaret değişir: (√7 − 2)(√7 + 2) = 7 − 4 = 3.',
            'Bu kendisi. Karesi 11 − 4√7 eder, kök kalır.',
            '(√7 − 2)·√7 = 7 − 2√7. Kök kaldı.'],
          scene: 1,
        },
        {
          q: `${FR(2, rt(3) + ' + 1')} neye eşittir?`,
          options: [`${rt(3)} + 1`, FR(rt(3) + ' − 1', 2), `${rt(3)} − 1`, '1'], answer: 2,
          why: [
            `Kontrol et: baştaki sayı ≈ ${fmt(2 / (Math.sqrt(3) + 1))}, √3 + 1 ≈ ${fmt(Math.sqrt(3) + 1)}.`,
            'Payı çarpmayı unutmuşsun. Pay 2·(√3 − 1), payda 2; sadeleşince √3 − 1.',
            'Eşlenik √3 − 1: pay 2(√3 − 1), payda 3 − 1 = 2. Sadeleşince √3 − 1.',
            `Paydayı 2 saymışsın. √3 + 1 ≈ ${fmt(Math.sqrt(3) + 1)}.`],
          scene: 2,
        },
      ],
      summary: [
        `<b>Eşlenik, kökü yok eden ikizdir.</b> (${rt(3)} − 1)(${rt(3)} + 1) = 3 − 1 = 2`,
        `<b>Pay ve payda birlikte çarpılır:</b> ${FR(1, rt(3) + ' − 1')} = ${FR(rt(3) + ' + 1', 2)}`,
      ],
      next: { href: 'a7-bilimsel-gosterim.html', label: 'Sonraki: Bilimsel gösterim ›' },
    },
    a7: {
      title: 'Bilimsel gösterim',
      hook: 'Güneş 150 000 000 km uzakta; çipteki en küçük parça 0,000 000 003 metre. Bu sıfırları her seferinde yazacak mıyız?',
      scenes: [
        { title: 'Büyük sayı: virgül sola kayar', goal: 'Virgül her sola kayışta 10’un üssü bir artar: 1,5 × 10⁸.', run: sceneA7_1 },
        { title: 'Küçük sayı: virgül sağa kayar', goal: 'Çok küçük sayıda üs negatiftir: 3 × 10⁻⁹.', run: sceneA7_2 },
        { title: 'Kural: 1 ile 10 arasında', goal: 'a × 10ⁿ biçiminde 1 ≤ a < 10 koşulunu uygula.', run: sceneA7_3 },
        { title: 'Hikâye: 3 nanometre ne kadar küçük?', goal: 'Bilimsel gösterimin hayattaki yerini gör.', video: 'hikaye/a7-3-nanometre/renders/a7-3-nanometre.mp4' },
      ],
      quiz: [
        {
          q: '0,00045 sayısının bilimsel gösterimi hangisidir?',
          options: [`45 × ${P(10, '−5')}`, `4,5 × ${P(10, 4)}`, `4,5 × ${P(10, '−4')}`, `4,5 × ${P(10, '−3')}`], answer: 2,
          why: [
            'Değeri doğru; ama 45, 10’dan büyük. Bilimsel gösterim değil.',
            'Üs pozitif olursa 45 000 eder. Küçük sayıda üs negatiftir.',
            'Virgül 4 basamak sağa kayar: 0,00045 = 4,5 × 10⁻⁴.',
            '10⁻³ ile 0,0045 olur. Virgül 4 basamak kaymalı.'],
          scene: 1,
        },
        {
          q: `3,2 × ${P(10, 5)} hangi sayıdır?`,
          options: ['320 000', '3 200 000', '32 000', '0,000032'], answer: 0,
          why: [
            'Virgül 5 basamak sağa kayar: 3,2 → 320 000.',
            'Virgülü 6 basamak kaydırmışsın.',
            'Virgülü 4 basamak kaydırmışsın. Üs 5.',
            'Üs pozitif: sayı büyür. Virgül sağa kayar.'],
          scene: 0,
        },
      ],
      summary: [
        `<b>Virgül kayar, üs sayar.</b> 150 000 000 = 1,5 × ${P(10, 8)}`,
        `<b>Küçük sayıda üs negatif:</b> 0,000 000 003 = 3 × ${P(10, '−9')}`,
        `<b>Kural:</b> a × ${P(10, 'n')}, 1 ≤ a &lt; 10. 15 × ${P(10, 7)} bilimsel gösterim değildir.`,
      ],
      next: { href: 'a8-yaklasik-deger.html', label: 'Sonraki: Yaklaşık değer ›' },
    },
    a8: {
      title: 'Yaklaşık değer',
      hook: 'Alanı <b>1000 m²</b> olan kare bir tarlanın kenarı kaç metre?',
      scenes: [
        { title: 'Tam çıkmıyor', goal: '√1000’i ardışık iki tam sayının arasına sıkıştır.', run: sceneA8_1 },
        { title: 'Yakınlaş', goal: 'Aralığı onda birlere, sonra yüzde birlere daralt.', run: sceneA8_2 },
        { title: 'Yaklaşık, eşit değil', goal: '≈ işaretini ve hata payını tanı.', run: sceneA8_3 },
        { title: 'Hikâye: Bir dönüm tarla, kaç metre çit?', goal: 'Yaklaşık değerin hayattaki yerini gör.', video: 'hikaye/a8-tarla-cit/renders/sesli-taslak.mp4' },
      ],
      quiz: [
        {
          q: `${rt(50)} hangi iki tam sayının arasındadır?`,
          options: ['6 ile 7', '7 ile 8', '24 ile 26', '49 ile 51'], answer: 1,
          why: [
            '7·7 = 49 hâlâ 50’den küçük. Kök 7’den büyük.',
            '7·7 = 49 < 50 < 64 = 8·8.',
            '50’nin yarısını almışsın. Kök, sayının yarısı değildir: 25·25 = 625.',
            'Bunlar 50’nin komşuları. Aranan, karesi 50 eden sayı.'],
          scene: 0,
        },
        {
          q: `${rt(2)} ≈ 1,41 ise hangisi doğrudur?`,
          options: ['1,41·1,41 tam 2 eder.', '1,41·1,41, 2’ye çok yakındır ama eşit değildir.', '1,41·1,41 = 2,82 eder.', `${rt(2)} ile 1,41 aynı sayıdır.`], answer: 1,
          why: [
            '1,41·1,41 = 1,9881. Yaklaşık değer tam değer değildir.',
            '1,41·1,41 = 1,9881. Fark küçük ama var.',
            'İki katını almışsın. Kare, sayıyı kendisiyle çarpmaktır.',
            '≈ işareti eşit demek değildir; 1,41 yalnızca yaklaşık değerdir.'],
          scene: 2,
        },
      ],
      summary: [
        `<b>Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz.</b> ${rt(1000)} ≈ 31,6`,
        `<b>Sıkıştır:</b> 961 &lt; 1000 &lt; 1024, yani 31 &lt; ${rt(1000)} &lt; 32.`,
        '<b>≈ eşit demek değildir:</b> 31,6² = 998,56.',
      ],
      next: { href: 'b1-kume-dili.html', label: 'Sonraki konu: Aralıklar ve kümeler ›' },
    },
  };
  const anahtar = window.DERS_PARCA || 'a1';
  const parca = PARCALAR[anahtar];
  Ders.start({
    id: 'sayilar-' + anahtar,
    kicker: 'Konu A · Üslü ve köklü',
    title: parca.title,
    accent: '#f5b04c',
    back: 'index.html',
    intro: { title: parca.title, hook: parca.hook, button: 'Derse başla ›' },
    scenes: parca.scenes,
    quiz: parca.quiz,
    quizTitle: 'Çıkış soruları',
    summary: parca.summary,
    nextLesson: parca.next,
  });
})();
