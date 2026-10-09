/* F2 · FİZ.9.2.7 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/F-hareket-turleri.md
   Yazar notu: içerik MEB Fizik 9 s. 111, 113–115'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Üç türün rengi F1 ve F2'de aynıdır: öteleme = RENK.a, dönme = RENK.b, titreşim = RENK.r.
   Hareket bileşeni (hareket, oynat, CIZIM) F1 ile ortaktır; kit değişmediği için iki dosyada da tanımlıdır.
   “Bileşik hareket” terimi kullanılmaz; açısal hız, periyot, frekans gibi hiçbir sayı tahtaya yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, par, tablo } = KIT;
  const { lerp, ease } = Ders;
  const TAU = Math.PI * 2, RAD = Math.PI / 180;
  const TUR = { o: RENK.a, d: RENK.b, t: RENK.r }, TURAD = { o: 'öteleme', d: 'dönme', t: 'titreşim' }, NOTR = RENK.mor;
  const B = { renk: RENK.yazi, fill: RENK.koyu }, Y = { renk: RENK.cizgi };
  const io = ease.inOut, sal = (t, n) => Math.sin(TAU * n * t), f1 = (v) => Math.round(v * 10) / 10;
  const git = (el, x, y, a) => el.setAttribute('transform', `translate(${f1(x)} ${f1(y)})` + (a == null ? '' : ` rotate(${f1(a)})`));

  /* ---- Hareket bileşeni ----
     hareket(c, p, ad, x, y, { s, t, notr, … }) bir hareketi yerel koordinatlarda (yaklaşık 220×160) çizer ve tahtaya koyar.
     h.kur(t): t 0→1 arasında hareketin anı. İşaretli noktalar iz bırakır (K.iz); sabit nokta çarpıyla (K.carpi),
     denge konumu kesikli çizgiyle (K.denge) gösterilir. notr: izler tür rengini almadan (mor) çizilir;
     h.renk(false) tür renklerine çevirir. h.P(x, y) yerel noktayı tahta koordinatına çevirir. */
  function hareket(c, p, ad, x, y, o = {}) {
    const g = c.S('g', {}, p), govde = c.S('g', {}, g), ust = c.S('g', {}, g), k = 1 / Math.sqrt(o.s || 1);
    const izler = [], boyali = [], h = { g, ad, o, p: {} };
    h.yer = (x2, y2, s2 = h.s) => { h.x = x2; h.y = y2; h.s = s2; g.setAttribute('transform', `translate(${f1(x2)} ${f1(y2)}) scale(${s2})`); };
    h.P = (lx, ly) => [h.x + lx * h.s, h.y + ly * h.s];
    h.yer(x, y, o.s || 1);
    const boya = (el, tur, nitelik = 'stroke') => { boyali.push([el, tur, nitelik]); return el; };
    const K = {
      o, ust, boya, p: h.p,
      iz(fn, tur, zo = {}) {
        const iz = boya(c.S('path', { fill: 'none', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ust), tur);
        const uc = zo.uc || (o.ok && tur === 'o') ? boya(c.S('path', {}, ust), tur, 'fill') : null;
        const nokta = boya(c.S('circle', { r: f1((zo.r || 6) * k) }, ust), tur, 'fill'), N = zo.n || 72;
        izler.push((t) => {
          const [x1, y1] = fn(t), [x0, y0] = fn(0); let d = '';
          if (!zo.izsiz) {
            for (let i = 0; i <= Math.floor(t * N); i++) { const [a, b] = fn(i / N); d += (i ? 'L' : 'M') + f1(a) + ' ' + f1(b); }
            d += 'L' + f1(x1) + ' ' + f1(y1);
          }
          iz.setAttribute('d', d);
          if (uc) {
            const L = Math.hypot(x1 - x0, y1 - y0), u = 15 * k, ux = L ? (x1 - x0) / L : 0, uy = L ? (y1 - y0) / L : 0;
            uc.setAttribute('d', L < u ? '' : `M ${f1(x1 + ux * u * 0.5)} ${f1(y1 + uy * u * 0.5)} L ${f1(x1 - ux * u * 0.5 - uy * u * 0.5)} ${f1(y1 - uy * u * 0.5 + ux * u * 0.5)} L ${f1(x1 - ux * u * 0.5 + uy * u * 0.5)} ${f1(y1 - uy * u * 0.5 - ux * u * 0.5)} Z`);
          }
          nokta.setAttribute('cx', f1(uc ? x0 : x1)); nokta.setAttribute('cy', f1(uc ? y0 : y1));
        });
      },
      carpi(x2, y2, r = 7) { const e = yol(c, ust, `M ${-r} ${-r} L ${r} ${r} M ${-r} ${r} L ${r} ${-r}`, { renk: RENK.vurgu, kalin: 4 }); git(e, x2, y2); return e; },
      denge(x1, y1, x2, y2) { return cizgi(c, govde, x1, y1, x2, y2, { renk: RENK.soluk, kalin: 2.5, kesik: '7 7' }); },
    };
    const kur = CIZIM[ad](c, govde, K);
    const cizgili = [...g.querySelectorAll('[stroke-width]')].map((e) => [e, +e.getAttribute('stroke-width')]);
    h.kalin = () => cizgili.forEach(([e, w]) => e.setAttribute('stroke-width', f1(w / Math.sqrt(h.s))));   // çizgi kalınlığını ölçeğe göre dengeler
    h.kalin();
    h.renk = (notr) => boyali.forEach(([el, tur, nitelik]) => el.setAttribute(nitelik, notr ? NOTR : TUR[tur]));
    h.kur = (t) => { h.t = t; kur(t); izler.forEach((f) => f(t)); };
    h.renk(o.notr); h.kur(o.t || 0);
    return h;
  }
  /* Bir ya da birkaç hareketi baştan sona bir kez oynatır (sonlu süre). */
  const oynat = (c, hs, ms = 3000) => { const l = [hs].flat(); return c.tween(ms, (e) => l.forEach((h) => h.kur(e)), ease.linear); };
  /* Hareketi tahtada başka bir yere ve ölçeğe taşır (kartın şeride inmesi). */
  const ucus = (c, h, x2, y2, s2, ms = 500) => { const { x, y, s } = h; return c.tween(ms, (e) => h.yer(lerp(x, x2, e), lerp(y, y2, e), lerp(s, s2, e))).then(() => h.kalin()); };
  const bayrak = (c, p, x, y, boy = 44) => {
    const g = c.S('g', {}, p);
    cizgi(c, g, x, y, x, y - boy, { renk: RENK.vurgu, kalin: 3 });
    yol(c, g, `M ${x} ${y - boy} L ${x + boy * 0.5} ${y - boy * 0.8} L ${x} ${y - boy * 0.6} Z`, { renk: RENK.vurgu, fill: RENK.vurgu, kalin: 2 });
    return g;
  };
  /* Eğik görünen pervane (tavan vantilatörü): kanat uçları elips üzerinde dolanır. */
  const pervane = (c, g, cx, cy, rx, ry, n) => {
    const kanat = [...Array(n)].map(() => cizgi(c, g, cx, cy, cx, cy, { renk: RENK.yazi, kalin: 6 }));
    const uc = (i, a) => [cx + rx * Math.cos(a + TAU * i / n), cy + ry * Math.sin(a + TAU * i / n)];
    return { uc, kur: (a) => kanat.forEach((el, i) => { const [x, y] = uc(i, a); el.setAttribute('x2', f1(x)); el.setAttribute('y2', f1(y)); }) };
  };
  /* Parçaları ayrı renkte yazı: [[metin, renk], …] */
  const renkli = (c, p, x, y, parcalar, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': 600, style: 'fill:' + RENK.yazi,
    html: parcalar.map(([m, r]) => `<tspan style="fill:${r || RENK.yazi}">${m}</tspan>`).join(''),
  }, p);

  /* ---- Çizimler: her biri (c, g, K) alır, t → çizimi güncelleyen işlevi döndürür ---- */
  const CIZIM = {
    /* iz: 'govde' (gövdede üç nokta) | 'teker' (ön tekerleğin mili ve janttaki nokta) */
    araba(c, g, K) {
      const yG = 34, R = 14, mod = K.o.iz || 'govde', X = (t) => lerp(-52, 52, io(t)), aci = (t) => (X(t) - X(0)) / R;
      cizgi(c, g, -110, yG, 110, yG, Y);
      const a = c.S('g', {}, g);
      yol(c, a, 'M -52 -14 L -52 -32 L -30 -36 L -16 -56 L 20 -56 L 34 -36 L 52 -31 L 52 -14 Z', B);
      yol(c, a, 'M -12 -51 L 17 -51 L 27 -38 L -21 -38 Z', { renk: RENK.cizgi, kalin: 2 });
      const tekerler = [-30, 30].map((x, i) => {
        const w = c.S('g', {}, a); daire(c, w, 0, 0, R, B);
        cizgi(c, w, -R + 3, 0, R - 3, 0, { renk: RENK.cizgi, kalin: 2 }); cizgi(c, w, 0, -R + 3, 0, R - 3, { renk: RENK.cizgi, kalin: 2 });
        if (mod === 'teker' && i) K.boya(cizgi(c, w, 0, 0, R - 2, 0, { kalin: 3 }), 'd');
        w.x = x; return w;
      });
      if (mod === 'govde') { K.iz((t) => [X(t) - 44, yG - 22], 'o'); K.iz((t) => [X(t) + 2, yG - 46], 'o'); K.iz((t) => [X(t) + 44, yG - 34], 'o'); }
      if (mod === 'teker') {
        K.iz((t) => [X(t) + 30, yG - R], 'o', { r: 4 });
        K.iz((t) => [X(t) + 30 + (R - 2) * Math.cos(aci(t)), yG - R + (R - 2) * Math.sin(aci(t))], 'd', { izsiz: true, r: 5 });
      }
      return (t) => { git(a, X(t), yG); tekerler.forEach((w) => git(w, w.x, -R, aci(t) / RAD)); };
    },
    salincak(c, g, K) {
      const py = -70, L = 108, n = K.o.n || 2, aci = (t) => 30 * sal(t, n);
      cizgi(c, g, -90, 76, 90, 76, Y);
      yol(c, g, `M -58 76 L 0 ${py} L 58 76`, { renk: RENK.cizgi, kalin: 4 });
      K.denge(0, py, 0, 72);
      const s = c.S('g', {}, g);
      cizgi(c, s, 0, 0, 0, L, { renk: RENK.yazi, kalin: 2.5 }); cizgi(c, s, -16, L, 14, L, { renk: RENK.yazi, kalin: 5 });
      daire(c, s, -13, L - 50, 9, B);
      yol(c, s, `M -12 ${L - 41} L -6 ${L - 4} L 14 ${L - 5} L 17 ${L + 15} M -10 ${L - 32} L 0 ${L - 38}`, { renk: RENK.yazi, kalin: 4 });
      K.carpi(0, py);
      K.iz((t) => { const a = aci(t) * RAD; return [-L * Math.sin(a), py + L * Math.cos(a)]; }, 't');
      return (t) => git(s, 0, py, aci(t));
    },
    vantilator(c, g, K) {
      cizgi(c, g, -80, -70, 80, -70, { renk: RENK.yazi, kalin: 4 });
      for (let i = 0; i < 8; i++) cizgi(c, g, -70 + i * 20, -70, -62 + i * 20, -78, { renk: RENK.cizgi, kalin: 2 });
      cizgi(c, g, 0, -70, 0, -6, { renk: RENK.yazi, kalin: 4 });
      const pv = pervane(c, g, 0, 0, 92, 24, 4);
      c.S('ellipse', { cx: 0, cy: 0, rx: 15, ry: 9, fill: RENK.koyu, stroke: RENK.yazi, 'stroke-width': 3 }, g);
      K.carpi(0, 0, 6);
      K.iz((t) => pv.uc(0, TAU * t + 0.5), 'd');
      return (t) => pv.kur(TAU * t + 0.5);
    },
    /* iz: 'govde' | 'teker' | 'hepsi' | 'yok' ; yol: gidilen uzaklık */
    bisiklet(c, g, K) {
      const yG = 64, R = 22, D = K.o.yol == null ? 110 : K.o.yol, mod = K.o.iz || 'govde', X = (t) => lerp(-D / 2, D / 2, io(t)), aci = (t) => (X(t) - X(0)) / R;
      const teker = mod === 'teker' || mod === 'hepsi', govde = mod === 'govde' || mod === 'hepsi';
      cizgi(c, g, -D / 2 - 90, yG, D / 2 + 62, yG, Y);
      const b = c.S('g', {}, g);
      const tekerler = [-34, 34].map((x, i) => {
        const w = c.S('g', {}, b); daire(c, w, 0, 0, R, { renk: RENK.yazi, kalin: 4 });
        for (let j = 0; j < 4; j++) { const a = j * Math.PI / 4, u = (R - 2) * Math.cos(a), v = (R - 2) * Math.sin(a); cizgi(c, w, -u, -v, u, v, { renk: RENK.cizgi, kalin: 1.5 }); }
        if (teker && i) K.boya(cizgi(c, w, 0, 0, R, 0, { kalin: 3.5 }), 'd');
        w.x = x; return w;
      });
      yol(c, b, 'M -34 -22 L -14 -52 L -4 -20 Z M -14 -52 L 22 -52 L -4 -20 M 34 -22 L 24 -58 M -21 -56 L -7 -56 M 24 -58 L 20 -63 L 30 -65', { renk: RENK.yazi, kalin: 3.5 });
      yol(c, b, 'M -14 -58 L 6 -86 L 27 -64 M -14 -58 L 5 -42 L -2 -22', { renk: RENK.yazi, kalin: 4 });
      daire(c, b, 10, -97, 9, B);
      if (govde) { K.iz((t) => [X(t) - 4, yG - 20], 'o'); K.iz((t) => [X(t) + 23, yG - 54], 'o'); }
      if (teker) {
        K.iz((t) => [X(t) + 34, yG - R], 'o', { r: 4 });
        K.iz((t) => [X(t) + 34 + R * Math.cos(aci(t)), yG - R + R * Math.sin(aci(t))], 'd', { izsiz: true, r: 5 });
      }
      return (t) => { git(b, X(t), yG); tekerler.forEach((w) => git(w, w.x, -R, aci(t) / RAD)); };
    },
    /* Büyütülmüş tekerlek. govdeye: bakış gövdeye sabit (mil yerinde durur, yol geriye kayar). */
    teker(c, g, K) {
      const R = K.o.R || 50, D = K.o.yol == null ? 220 : K.o.yol, sabit = !!K.o.govdeye, gidilen = (t) => D * io(t);
      const X = (t) => (sabit ? 0 : gidilen(t) - D / 2), aci = (t) => gidilen(t) / R - Math.PI / 2, yarim = sabit ? R + 56 : D / 2 + R + (K.o.pay == null ? 14 : K.o.pay), ADIM = 36;
      cizgi(c, g, -yarim, R, yarim, R, Y);
      const centik = []; for (let x = -yarim + 8; x < yarim - 8; x += ADIM) centik.push([cizgi(c, g, 0, R + 4, 0, R + 12, { renk: RENK.cizgi, kalin: 2 }), x]);
      const w = c.S('g', {}, g);
      daire(c, w, 0, 0, R, { renk: RENK.yazi, fill: RENK.koyu, kalin: 5 }); daire(c, w, 0, 0, R - 8, { renk: RENK.cizgi, kalin: 1.5 });
      for (let i = 0; i < 8; i++) cizgi(c, w, 0, 0, (R - 8) * Math.cos(i * TAU / 8), (R - 8) * Math.sin(i * TAU / 8), { renk: RENK.cizgi, kalin: 1.5 });
      K.boya(cizgi(c, w, 0, 0, R, 0, { kalin: 4 }), 'd');
      if (sabit) yol(c, g, `M 0 0 L -18 ${-R - 30} L -64 ${-R - 16}`, { renk: RENK.yazi, kalin: 5 });   // gövdenin çatalı
      const mil = K.carpi(0, 0);
      K.iz((t) => [X(t), 0], 'o', { r: 3 });
      K.iz((t) => [X(t) + R * Math.cos(aci(t)), R * Math.sin(aci(t))], 'd', { izsiz: !sabit, r: 7, n: 96 });
      return (t) => {
        git(w, X(t), 0, aci(t) / RAD); git(mil, X(t), 0);
        const genis = centik.length * ADIM;
        centik.forEach(([el, x0]) => { const x = sabit ? ((((x0 - gidilen(t) + yarim) % genis) + genis) % genis) - yarim + 8 : x0; el.setAttribute('x1', f1(x)); el.setAttribute('x2', f1(x - 6)); });
      };
    },
    kapak(c, g, K) {
      const X = (t) => lerp(-47, 47, io(t));
      kutu(c, g, -100, -76, 200, 146, { renk: RENK.cizgi, rx: 4 });
      yol(c, g, 'M -94 -30 L 94 -30 M -94 16 L 94 16 M 0 -72 L 0 62', { renk: RENK.ince, kalin: 2 });
      cizgi(c, g, -96, 66, 96, 66, { renk: RENK.yazi, kalin: 2 });
      const kp = c.S('g', {}, g);
      kutu(c, kp, -47, -70, 94, 126, { ...B, rx: 3 });
      cizgi(c, kp, -34, -16, -34, 10, { renk: RENK.cizgi, kalin: 4 });
      [-32, 32].forEach((x) => daire(c, kp, x, 61, 5, { renk: RENK.yazi, fill: RENK.koyu, kalin: 2 }));
      daire(c, kp, 32, 61, 12, { renk: RENK.vurgu, kalin: 2 });
      K.iz((t) => [X(t), -22], 'o');
      return (t) => git(kp, X(t), 0);
    },
    pogo(c, g, K) {
      const yer = 70, D = K.o.yol == null ? 120 : K.o.yol, n = K.o.n || 4, A = 14, yM = yer - 56, yBas = yM - 42;
      const X = (t) => lerp(-D / 2, D / 2, t), dY = (t) => -A * sal(t, n);
      cizgi(c, g, -D / 2 - 40, yer, D / 2 + 40, yer, Y);
      K.denge(-D / 2 - 40, yBas, D / 2 + 40, yBas);
      const cocuk = c.S('g', {}, g), yayEl = yol(c, cocuk, '', { renk: RENK.yazi, kalin: 2.5 });
      yol(c, cocuk, 'M 10 -18 L 10 32 M 2 -18 L 18 -18 M 0 32 L 20 32', { renk: RENK.yazi, kalin: 4 });
      daire(c, cocuk, -4, -42, 9, B);
      yol(c, cocuk, 'M -4 -33 L -6 2 L 8 12 L 6 30 M -4 -24 L 8 -18', { renk: RENK.yazi, kalin: 4 });
      const dik = K.boya(cizgi(c, K.ust, 0, 0, 0, 0, { kalin: 4 }), 't');   // başın düşey gidip gelmesi; çocukla birlikte ilerler
      K.iz((t) => [X(t) - 4, yBas + dY(t)], 't', { izsiz: true });
      K.iz((t) => [X(t) + 10, yer + 12], 'o', { uc: true, r: 4 });
      return (t) => {
        const x = X(t), dy = dY(t), uc = Math.min(yer - yM - dy, 62), ad = (uc - 32) / 4; let d = 'M 10 32';
        for (let i = 0; i < 4; i++) d += ` L ${i % 2 ? 16 : 4} ${f1(32 + ad * (i + 0.5))}`;
        yayEl.setAttribute('d', d + ` L 10 ${f1(uc)} M 3 ${f1(uc)} L 17 ${f1(uc)}`);
        git(cocuk, x, yM + dy);
        [['x1', x - 4], ['x2', x - 4], ['y1', yBas - A], ['y2', yBas + A]].forEach(([ad2, v]) => dik.setAttribute(ad2, f1(v)));
      };
    },
    /* Solda üstten görünüş (platform döner), sağda yandan görünüş (at aşağı yukarı gidip gelir). */
    atlikarinca(c, g, K) {
      const ux = -52, R = 42, sx = 60, n = K.o.n || 3, dY = (t) => 15 * sal(t, n), aci = (t) => TAU * t - Math.PI / 2;
      daire(c, g, ux, 0, R + 10, B);
      const kol = c.S('g', {}, g);
      for (let i = 0; i < 4; i++) {
        cizgi(c, kol, 0, 0, R * Math.cos(i * TAU / 4), R * Math.sin(i * TAU / 4), { renk: RENK.cizgi, kalin: 2 });
        if (i) daire(c, kol, R * Math.cos(i * TAU / 4), R * Math.sin(i * TAU / 4), 5, { renk: RENK.cizgi, fill: RENK.koyu, kalin: 2 });
      }
      K.carpi(ux, 0);
      K.iz((t) => [ux + R * Math.cos(aci(t)), R * Math.sin(aci(t))], 'd');
      yol(c, g, `M ${sx - 40} -74 L ${sx + 44} -74 M ${sx - 40} 74 L ${sx + 44} 74`, Y);
      cizgi(c, g, sx + 9, -74, sx + 9, 74, { renk: RENK.cizgi, kalin: 3 });
      K.denge(sx - 40, -26, sx + 44, -26);
      const at = c.S('g', {}, g);
      c.S('ellipse', { cx: 0, cy: 8, rx: 22, ry: 9, fill: RENK.koyu, stroke: RENK.yazi, 'stroke-width': 3 }, at);
      yol(c, at, 'M 14 2 L 24 -16 L 38 -10 L 36 -5 L 28 -6 L 22 6 M -14 15 L -18 32 M -6 17 L -4 32 M 8 17 L 6 32 M 16 14 L 22 30 M -22 6 Q -32 8 -30 20', { renk: RENK.yazi });
      daire(c, at, 0, -26, 7, B); yol(c, at, 'M 0 -19 L 0 0 L 8 14 M 0 -12 L 9 -8', { renk: RENK.yazi });
      K.iz((t) => [sx, -26 + dY(t)], 't');
      return (t) => { git(kol, ux, 0, aci(t) / RAD); git(at, sx, dY(t)); };
    },
    vida(c, g, K) {
      const yT = 20, Yh = (t) => lerp(-52, -8, t), aci = (t) => TAU * 3 * t;
      kutu(c, g, -80, yT, 160, 56, { ...B, rx: 3 });
      const ic = yol(c, g, '', { renk: RENK.cizgi, kalin: 2 }), sap = yol(c, g, '', { renk: RENK.yazi });
      ic.setAttribute('stroke-dasharray', '5 5');
      const bas = K.boya(c.S('ellipse', { rx: 26, ry: 9, fill: RENK.koyu, 'stroke-width': 3.5 }, g), 'd'), centik = cizgi(c, g, 0, 0, 0, 0, { renk: RENK.yazi, kalin: 3 });
      K.iz((t) => [0, Yh(t)], 'o', { r: 4 });
      K.iz((t) => [26 * Math.cos(aci(t)), Yh(t) + 9 * Math.sin(aci(t))], 'd', { izsiz: true, r: 5 });
      return (t) => {
        const y = f1(Yh(t)), a = aci(t), u = f1(22 * Math.cos(a)), v = f1(7 * Math.sin(a)); let d = `M -7 ${y} L -7 ${yT} M 7 ${y} L 7 ${yT}`;
        for (let i = 0; i < 9; i++) { const yk = f1(y + 12 + i * 8); if (yk < yT - 3) d += ` M -9 ${yk + 3} L 9 ${yk - 3}`; }
        sap.setAttribute('d', d); ic.setAttribute('d', `M -7 ${yT} L -7 ${y + 74} L 0 ${y + 82} L 7 ${y + 74} L 7 ${yT}`);
        bas.setAttribute('cy', y);
        [['x1', -u], ['y1', y - v], ['x2', u], ['y2', y + v]].forEach(([ad, deger]) => centik.setAttribute(ad, f1(deger)));
      };
    },
    /* Sabit makara: mil kirişe bağlıdır; ip üstünden kayar. ipIz: inen ip ucunun ötelemesi de gösterilir. */
    makara(c, g, K) {
      const cy = -62, R = 18, D = TAU * R, gidilen = (t) => D * io(t), aci = (t) => gidilen(t) / R - Math.PI / 2;
      kutu(c, g, -70, -96, 140, 10, { ...B, rx: 2 });
      cizgi(c, g, 0, -86, 0, cy, { renk: RENK.yazi, kalin: 4 });
      const ip = yol(c, g, '', { renk: RENK.yazi, kalin: 2.5 }), w = c.S('g', {}, g);
      daire(c, w, 0, 0, R, B); daire(c, w, 0, 0, R - 4, { renk: RENK.cizgi, kalin: 1.5 });
      K.boya(cizgi(c, w, 0, 0, R - 3, 0, { kalin: 3 }), 'd');
      const yuk = kutu(c, g, -11, -8, 22, 16, { ...B, rx: 3 }), tutamak = daire(c, g, 0, 0, 5, { renk: RENK.yazi, kalin: 2.5 });
      K.carpi(0, cy, 5);
      K.iz((t) => [(R - 3) * Math.cos(aci(t)), cy + (R - 3) * Math.sin(aci(t))], 'd', { r: 5 });
      if (K.o.ipIz) K.iz((t) => [R + 12, -58 + gidilen(t)], 'o', { uc: true, r: 4 });
      return (t) => {
        const yL = 84 - gidilen(t), yR = -58 + gidilen(t);
        ip.setAttribute('d', `M ${-R} ${f1(yL - 8)} L ${-R} ${cy} A ${R} ${R} 0 0 1 ${R} ${cy} L ${R} ${f1(yR)}`);
        git(w, 0, cy, aci(t) / RAD); git(yuk, -R, yL); git(tutamak, R, yR + 5);
      };
    },
    telefon(c, g, K) {
      const n = K.o.n || 9, d = (t) => 7 * sal(t, n);
      K.denge(0, -72, 0, 72);
      yol(c, g, 'M -44 -22 Q -52 0 -44 22 M 44 -22 Q 52 0 44 22 M -56 -30 Q -66 0 -56 30 M 56 -30 Q 66 0 56 30', { renk: RENK.cizgi, kalin: 2 });
      const tel = c.S('g', {}, g);
      kutu(c, tel, -26, -50, 52, 100, { ...B, rx: 9 }); kutu(c, tel, -20, -40, 40, 70, { renk: RENK.cizgi, fill: 'none', rx: 3, kalin: 2 });
      daire(c, tel, 0, 40, 4, { renk: RENK.cizgi, kalin: 2 });
      kutu(c, tel, -14, -32, 28, 14, { renk: RENK.vurgu, fill: 'none', rx: 3, kalin: 2 });
      K.iz((t) => [d(t), 0], 't');
      return (t) => git(tel, d(t), 0);
    },
  };

  /* ---- Sahne 1 · Bisikletin tekerleği ---- */
  async function tekerlek(c) {
    const svg = c.svg(1000, 562), hat = c.S('g', {}, svg);
    const ucTur = [['araba', 'o'], ['vantilator', 'd'], ['salincak', 't']].map(([ad, tur], i) => {
      const x = 190 + i * 310, g = c.S('g', {}, hat), h = hareket(c, g, ad, x, 240, { s: 1.45 });
      yazi(c, g, x, 430, TURAD[tur], { size: 30, renk: TUR[tur] });
      return { g, h };
    });
    const odak = (i) => par(ucTur.map((u, k) => sol(c, u.g, k === i ? 1 : 0.3, 250)));
    await c.say('Hareketleri üç türe ayırmıştık: öteleme, dönme ve titreşim.');
    await odak(0);
    await par(c.say('Ötelemede bütün parçalar birlikte, aynı yönde ilerler.'), oynat(c, ucTur[0].h, 3800));
    await odak(1);
    await par(c.say('Dönmede parçalar, bir eksene uzaklıkları değişmeden döner.'), oynat(c, ucTur[1].h, 3800));
    await odak(2);
    await par(c.say('Titreşimde cisim bir denge konumundan geçerek gidip gelir.'), oynat(c, ucTur[2].h, 3800));
    await kaybol(c, hat);
    const bis = hareket(c, svg, 'bisiklet', 500, 190, { s: 1.7, yol: 300 }), b1 = bayrak(c, svg, 106, 299, 40);
    gizle(bis.g, b1);
    await belir(c, [bis.g, b1]);
    await par(c.say('Evden okula giden bir bisikletlinin hareketi temelde ötelemedir.'), oynat(c, bis, 4800));
    const [hx, hy] = bis.P(184, 42), halka = daire(c, svg, hx, hy, 48, { renk: RENK.vurgu, kalin: 2 });
    const tk = hareket(c, svg, 'teker', 500, 438, { R: 56, yol: 560, pay: 44 }), b2 = bayrak(c, svg, 130, 494, 40);
    gizle(halka, tk.g, b2);
    await par(sol(c, bis.g, 0.35), belir(c, [halka, tk.g, b2]));
    await par(c.say('Şimdi yola göre tekerleğe bak: önce miline, sonra janttaki noktaya.'), oynat(c, tk, 5600));
    await c.choice({ tag: 'Düşün', q: 'Yolda giden bisikletin tekerleği dönüyor mu, ilerliyor mu?',
      options: ['Yalnızca dönüyor; tekerleğin işi dönmektir', 'Yalnızca ilerliyor; bisikletle birlikte gidiyor', 'İkisi de: mili çevresinde dönerken yol boyunca ilerliyor'], answer: 2,
      hints: ['Tekerlek yalnızca dönseydi mili yerinde kalırdı; oysa mil yol boyunca ilerliyor. Bir cisim tek bir hareket türü yapmak zorunda değildir.', 'Yalnızca ilerleseydi janttaki nokta milin çevresinde dolanmazdı. Tekerlek ilerlerken dönüyor.', ''],
      right: 'Evet. Mil düz bir çizgide ilerliyor; janttaki nokta milin çevresinde dolanıyor.' });
    const ad1 = renkli(c, svg, 330, 366, [['mil: '], ['öteleme', TUR.o]]), ad2 = renkli(c, svg, 680, 366, [['janttaki nokta: '], ['dönme', TUR.d]]);
    gizle(ad1, ad2);
    await belir(c, [ad1, ad2]);
    await par(c.say('Tekerlek aynı anda iki hareket türünü yapıyor: dönme ve öteleme.', { speak: 'Tekerlek aynı anda iki hareket türünü yapıyor: [short pause] dönme ve öteleme.' }), oynat(c, tk, 5200));
    await c.say('Bir cisim aynı anda birden fazla hareket türünü yapabilir.');
    c.note('<b>Bir cisim aynı anda birden fazla hareket türünü yapabilir.</b><br>Örnek: bisiklet tekerleği hem döner hem ilerler.', 'Birden fazla hareket', 'birlikte');
  }

  /* ---- Sahne 2 · Hangi parça, neye göre, nasıl? ---- */
  async function ucSoru(c) {
    const svg = c.svg(1000, 562);
    const cerceve = kutu(c, svg, 30, 30, 250, 156, { renk: RENK.vurgu, kalin: 2 });
    const sorular = ['Hangi parça?', 'Neye göre?', 'Nasıl?'].map((m, i) => yazi(c, svg, 155, 76 + i * 42, m, { size: 26 }));
    const govdeli = hareket(c, svg, 'araba', 640, 150, { s: 2, iz: 'govde' }), tekerli = hareket(c, svg, 'araba', 640, 150, { s: 2, iz: 'teker' }), b = c.S('g', {}, svg);
    cizgi(c, b, 372, 218, 420, 218); bayrak(c, b, 388, 218, 40);
    const ad1 = renkli(c, svg, 640, 262, [['gövde: '], ['öteleme', TUR.o]]), ad2 = renkli(c, svg, 640, 298, [['tekerlek: '], ['dönme', TUR.d], [' ve '], ['öteleme', TUR.o]]);
    const yolT = hareket(c, svg, 'teker', 250, 432, { R: 42, yol: 240 }), govT = hareket(c, svg, 'teker', 740, 432, { R: 42, yol: 240, govdeye: true });
    const yolAd = yazi(c, svg, 250, 530, 'yola göre', { size: 24, renk: RENK.soluk }), govAd = yazi(c, svg, 740, 530, 'gövdeye göre', { size: 24, renk: RENK.soluk });
    const vant = hareket(c, svg, 'vantilator', 640, 175, { s: 1.5 }), ad3 = renkli(c, svg, 640, 262, [['vantilatör: yalnızca '], ['dönme', TUR.d]]);
    gizle(sorular, govdeli.g, tekerli.g, b, ad1, ad2, yolT.g, govT.g, yolAd, govAd, vant.g, ad3);
    await belir(c, cerceve);
    await c.say('Birden fazla tür içeren bir hareketi üç soruyla ayırırız.');
    const sirayla = async () => { for (const s of sorular) { await belir(c, s, 350); await c.wait(900); } };
    await par(c.say('Hangi parçaya bakıyorum, neye göre bakıyorum, parça nasıl hareket ediyor?', { speak: '[curious] Hangi parçaya bakıyorum, neye göre bakıyorum, parça nasıl hareket ediyor?' }), sirayla());
    await belir(c, [govdeli.g, b]);
    await par(c.say('Düz yolda giden arabanın gövdesindeki bütün noktalar aynı yönde ilerler.'), oynat(c, govdeli, 4400));
    await belir(c, ad1);
    await c.say('Yola göre gövde öteleme yapar.');
    await kaybol(c, govdeli.g, 250); await belir(c, tekerli.g, 250);
    await par(c.say('Arabanın tekerlekleri ise hem döner hem ilerler.'), oynat(c, tekerli, 4400));
    await belir(c, ad2);
    await c.say('Aynı arabada gövde tek, tekerlek iki hareket türü yapıyor.');
    sorular[1].style.fill = RENK.vurgu;
    await c.say('Hareketin türü, seçilen referans noktasına göre belirlenir.');
    await c.choice({ tag: 'Tahmin et', q: 'Tekerleğe yola göre değil, bisikletin gövdesine göre bakıyorsun. Hangi hareketi görürsün?',
      options: ['Yine dönme ve öteleme; tür bakana göre değişmez', 'Yalnızca dönme; mil gövdeye göre yer değiştirmez', 'Hiç hareket görmezsin; tekerlek gövdeyle birlikte gider'], answer: 1,
      hints: ['Hareketin türü referans noktasına göre belirlenir. Gövdeye göre mil ilerlemez; geriye yalnızca dönme kalır.', '', 'Mil gövdeye göre durur ama janttaki nokta milin çevresinde dolanır. Bu, dönme hareketidir.'],
      right: 'Evet. Gövdeye göre mil yerinde durur; janttaki nokta çember çizer.' });
    await belir(c, [yolT.g, govT.g, yolAd, govAd]);
    await par(c.say('Aynı tekerlek yola göre iki, gövdeye göre tek hareket türü yapar.'), oynat(c, [yolT, govT], 5200));
    await par(c.say('Bu yüzden türü söylerken neye göre baktığımızı da söyleriz.'), oynat(c, [yolT, govT], 4600));
    await kaybol(c, [tekerli.g, ad1, ad2, b]);
    await belir(c, [vant.g, ad3]);
    await par(c.say('Tavan vantilatörü ise odaya göre yalnızca döner; mili tavana sabittir.'), oynat(c, vant, 4600));
  }

  /* ---- Sahne 3 · Üç ikili ---- */
  async function ucIkili(c) {
    const svg = c.svg(1000, 562), X = [175, 500, 825];
    const basliklar = [['o', 'd'], ['o', 't'], ['d', 't']].map(([a, b], i) => renkli(c, svg, X[i], 46, [[TURAD[a], TUR[a]], [' + '], [TURAD[b], TUR[b]]]));
    const kapak = hareket(c, svg, 'kapak', X[0], 168, { s: 1.1 }), buyuk = c.S('g', {}, svg);
    kutu(c, buyuk, 40, 336, 270, 136, { renk: RENK.vurgu, fill: 'none', kalin: 2 });
    const tk = hareket(c, buyuk, 'teker', X[0], 400, { R: 40, yol: 130 });
    const pogo = hareket(c, svg, 'pogo', X[1], 290, { s: 1.5 });
    const atli = hareket(c, svg, 'atlikarinca', X[2], 270, { s: 1.4 }), gorunus = c.S('g', {}, svg);
    yazi(c, gorunus, atli.P(-52, 0)[0], 420, 'üstten', { size: 22, renk: RENK.soluk }); yazi(c, gorunus, atli.P(62, 0)[0], 420, 'yandan', { size: 22, renk: RENK.soluk });
    gizle(basliklar, kapak.g, buyuk, pogo.g, atli.g, gorunus);
    await par(c.say('Üç hareket türü, ikişer ikişer üç biçimde bir araya gelebilir.'), (async () => { for (const b of basliklar) { await belir(c, b, 350); await c.wait(700); } })());
    await par(sol(c, basliklar.slice(1), 0.3, 250), belir(c, kapak.g));
    await par(c.say('Öteleme ve dönme: sürgülü dolap kapağının altındaki küçük tekerlek.'), oynat(c, kapak, 4600));
    await belir(c, buyuk);
    await par(c.say('Bu tekerlek dönerken ray boyunca ilerler; bisiklet tekerleği gibi.'), oynat(c, [kapak, tk], 4800));
    await par(sol(c, basliklar[1], 1, 250), belir(c, pogo.g));
    await par(c.say('Öteleme ve titreşim: zıplama çubuğuyla ilerleyen çocuk.'), oynat(c, pogo, 4200));
    await par(c.say('Çocuk aşağı yukarı gidip gelirken bir yandan da ileri gider.'), oynat(c, pogo, 4600));
    await par(sol(c, basliklar[2], 1, 250), belir(c, [atli.g, gorunus]));
    await par(c.say('Dönme ve titreşim: atlıkarıncaya binen çocuk.'), oynat(c, atli, 4200));
    await par(c.say('Atlıkarınca döner; çocuğun bindiği at aşağı yukarı gidip gelir.'), oynat(c, atli, 5000));
    await c.choice({ tag: 'Düşün', q: 'Dolap kapağının tekerleği “dönme ve öteleme” yapıyor. Bu ne demektir?',
      options: ['Tekerlek bildiğimiz iki türü aynı anda yapıyor', 'Tekerlek dördüncü bir hareket türü yapıyor', 'Tekerlek önce dönüyor, dönmesi bitince ötelemeye geçiyor'], answer: 0,
      hints: ['', 'Yeni bir tür yok. Türler yine öteleme, dönme ve titreşimdir; burada ikisi birlikte görülüyor.', 'İki hareket sırayla değil, aynı anda yapılıyor: tekerlek dönerken ilerliyor.'],
      right: 'Evet. İki tür aynı anda, aynı cisimde.' });
    await par(c.say('Türler yine üç tanedir; değişen, bir cisimde kaçının birlikte görüldüğüdür.', { speak: '[thoughtful] Türler yine üç tanedir; değişen, bir cisimde kaçının birlikte görüldüğüdür.' }), oynat(c, [kapak, tk, pogo, atli], 5200));
    c.note('<b>İki tür birlikte görülebilir.</b><br>öteleme + dönme: sürgülü kapağın tekerleği<br>öteleme + titreşim: zıplama çubuğuyla ilerleyen çocuk<br>dönme + titreşim: atlıkarıncaya binen çocuk', 'Üç ikili', 'ikili');
  }

  /* ---- Sahne 4 · Türlerini işaretle ----
     Kartlardaki izler doğru cevaptan önce tür rengini almaz (mor); doğru cevapla renklenir, işaret kutuları dolar. */
  const SEC = [['Öteleme', 'o'], ['Dönme', 'd'], ['Titreşim', 't'], ['Öteleme ve dönme', 'od'], ['Öteleme ve titreşim', 'ot'], ['Dönme ve titreşim', 'dt']];
  const SEKIZ = [
    { ad: 'vantilator', s: 1.7, y: 215, etiket: 'vantilatörün kanatları', soru: 'Tavan vantilatörünün kanatları', cevap: 'd', neden: 'Evet. Kanat uçları milin çevresinde dolanıyor.',
      yok: { o: 'Vantilatörün mili tavana sabit; kanatlar bir yere ilerlemiyor.', t: 'Kanatlar geri dönmüyor; turu tamamlıyor.' } },
    { ad: 'salincak', s: 1.6, y: 180, etiket: 'salıncaktaki çocuk', soru: 'Salıncakta sallanan çocuk', cevap: 't', neden: 'Evet. Salıncak denge konumundan geçerek gidip geliyor.',
      yok: { o: 'Çocuk bir yere gitmiyor; aynı yay üzerinde gidip geliyor.', d: 'Salıncak çemberi tamamlamıyor; denge çizgisinden geçip geri dönüyor.' } },
    { ad: 'araba', s: 1.7, y: 180, etiket: 'arabanın gövdesi', soru: 'Düz yolda giden arabanın gövdesi', cevap: 'o', neden: 'Evet. Gövdenin bütün noktaları aynı yönde ilerliyor.',
      yok: { d: 'Gövde bir eksenin çevresinde dönmüyor; üç nokta da düz iz bırakıyor.', t: 'Gövde geri dönmüyor; hep aynı yönde ilerliyor.' } },
    { ad: 'araba', s: 1.7, y: 180, o: { iz: 'teker' }, etiket: 'aynı arabanın tekerleği', soru: 'Aynı arabanın tekerleği', cevap: 'od', neden: 'Evet. Mil ilerliyor, janttaki nokta milin çevresinde dolanıyor.',
      yok: { t: 'Tekerlekte gidip gelen bir parça yok; mile ve janttaki noktaya bak.' },
      eksik: { o: 'Tekerlek yalnızca dönseydi mili yerinde kalırdı; mil yol boyunca ilerliyor.', d: 'Yalnızca ilerleseydi janttaki nokta milin çevresinde dolanmazdı.' } },
    { ad: 'vida', s: 1.6, y: 190, etiket: 'tornavidayla sıkılan vida', soru: 'Tornavidayla sıkılan vida', cevap: 'od', neden: 'Evet. Vida dönerken yuvasına doğru ilerliyor.',
      yok: { t: 'Vida geri dönüp gidip gelmiyor; hep aynı yöne ilerliyor.' },
      eksik: { o: 'Vida yalnızca dönseydi yerinde kalırdı; oysa yuvasına doğru ilerliyor.', d: 'Vidanın başındaki çentiğe bak: vida ilerlerken dönüyor.' } },
    { ad: 'pogo', s: 1.6, y: 175, o: { yol: 110 }, etiket: 'zıplama çubuğundaki çocuk', soru: 'Zıplama çubuğuyla ilerleyen çocuk', cevap: 'ot', neden: 'Evet. Çocuk aşağı yukarı gidip gelirken ileri gidiyor.',
      yok: { d: 'Çocuk bir eksenin çevresinde çember çizmiyor.' },
      eksik: { t: 'Çocuk ilerlerken kesikli çizginin altına ve üstüne de gidip geliyor.', o: 'Çocuk yalnızca gidip gelmiyor; bir yandan da ileri gidiyor.' } },
    { ad: 'atlikarinca', s: 1.6, y: 185, etiket: 'atlıkarıncadaki çocuk', soru: 'Atlıkarıncaya binen çocuk', cevap: 'dt', neden: 'Evet. Atlıkarınca döner; at aşağı yukarı gidip gelir.',
      yok: { o: 'Çocuk düz bir yolda ilerlemiyor; yeri direğin çevresinde çember çiziyor.' },
      eksik: { t: 'At yalnızca dönmüyor; aşağı yukarı da gidip geliyor.', d: 'At yalnızca gidip gelmiyor; platformla birlikte direğin çevresinde dönüyor.' } },
    { ad: 'makara', s: 1.55, y: 188, etiket: 'ipi çekilen sabit makara', soru: 'İpi çekilen sabit makara', cevap: 'd', neden: 'Evet. İp ilerler ama makaranın mili sabittir; makara yalnızca döner.',
      yok: { o: 'İlerleyen ip; makaranın mili kirişe bağlı ve sabit.', t: 'Makara geri dönmüyor; üzerindeki benek çember çiziyor.' } },
  ];
  async function isaretle(c) {
    const svg = c.svg(1000, 562);
    kutu(c, svg, 290, 34, 420, 304, { renk: RENK.ince, fill: 'none', kalin: 2 }); bayrak(c, svg, 306, 330, 30);
    const kutucuk = ['o', 'd', 't'].map((tur, i) => {
      const x = 280 + i * 220, r = kutu(c, svg, x - 72, 392, 28, 28, { renk: TUR[tur], fill: 'none', rx: 5 });
      yazi(c, svg, x - 34, 415, TURAD[tur], { size: 26, hiza: 'start', renk: TUR[tur] });
      return r;
    });
    const doldur = (turler) => kutucuk.forEach((r, i) => r.setAttribute('fill', turler.includes('odt'[i]) ? TUR['odt'[i]] : 'none'));
    const etiket = yazi(c, svg, 500, 370, SEKIZ[0].etiket, { size: 26 });
    const koy = (m, ek = {}) => hareket(c, svg, m.ad, 500, m.y, { s: m.s, t: 1, notr: true, ...m.o, ...ek });
    const ipucu = (m, secilen) => { const fazla = [...secilen].find((t) => !m.cevap.includes(t)); return fazla ? m.yok[fazla] : m.eksik[[...m.cevap].find((t) => !secilen.includes(t))]; };
    let h = koy(SEKIZ[0]);
    await c.say('Şimdi sekiz hareketin türlerini sen işaretleyeceksin.');
    await c.say('Bir harekete birden fazla tür işaretleyebilirsin.');
    await c.say('Her harekette üç soruyu sor: hangi parça, neye göre, nasıl?');
    await c.say('Aksi söylenmedikçe hareketlere yere göre bak.');
    await c.say('Her hareketin türünü ya da türlerini seç.', { noWait: true });
    for (let i = 0; i < SEKIZ.length; i++) {
      const m = SEKIZ[i];
      if (i) { h = koy(m); h.g.style.opacity = 0; etiket.textContent = m.etiket; await belir(c, h.g, 300); }
      await oynat(c, h, 2800);
      await c.choice({ tag: 'Sıra sende', q: `<b>${m.soru}</b> hangi türü ya da türleri yapıyor?`, options: SEC.map((s) => s[0]), answer: SEC.findIndex((s) => s[1] === m.cevap),
        hints: SEC.map((s) => (s[1] === m.cevap ? '' : ipucu(m, s[1]))), right: m.neden,
        onPick: (j, dogru) => { if (dogru) { h.renk(false); doldur(m.cevap); } } });
      const x = 96 + i * 115;
      await ucus(c, h, x, 506, 0.36, 450);
      [...m.cevap].forEach((tur, j) => c.S('circle', { cx: x + (j - (m.cevap.length - 1) / 2) * 18, cy: 462, r: 6, fill: TUR[tur] }, svg));
      doldur('');
    }
    const mk = hareket(c, svg, 'makara', 500, 188, { s: 1.55, ipIz: true }), vd = hareket(c, svg, 'vida', 500, 190, { s: 1.6 });
    gizle(mk.g, vd.g);
    etiket.textContent = 'ipi çekilen sabit makara'; doldur('d');
    await belir(c, mk.g, 300);
    await par(c.say('Sabit makarada ip ilerler; makaranın kendisi yerinden ayrılmadan döner.'), oynat(c, mk, 4800));
    await kaybol(c, mk.g, 250);
    etiket.textContent = 'tornavidayla sıkılan vida'; doldur('od');
    await belir(c, vd.g, 300);
    await par(c.say('Vida ise dönerken yuvasına doğru ilerler: dönme ve öteleme.'), oynat(c, vd, 4800));
  }

  /* ---- Sahne 5 · Bir yolculukta üç tür ---- */
  async function yolculuk(c) {
    const svg = c.svg(1000, 562), YOL = 300;
    [[90, 150], [250, 110], [420, 170], [600, 120], [790, 160], [930, 110]].forEach(([x, boy]) => yol(c, svg, `M ${x} ${YOL} L ${x} ${YOL - boy * 0.3} M ${x - boy * 0.26} ${YOL - boy * 0.28} L ${x} ${YOL - boy} L ${x + boy * 0.26} ${YOL - boy * 0.28} Z`, { renk: RENK.ince, kalin: 2.5 }));
    bayrak(c, svg, 106, YOL, 40);
    let bis = null;
    const bisiklet = async (iz) => { const eski = bis; bis = hareket(c, svg, 'bisiklet', 500, YOL - 109, { s: 1.7, yol: 300, iz }); if (eski) eski.g.remove(); };
    await bisiklet('yok');
    await par(c.say('Kemal dağ bisikletiyle ormanda, pedal çevirerek ilerliyor.'), oynat(c, bis, 4800));
    await bisiklet('govde');
    await par(c.say('Bisikletin gövdesi yola göre öteleme yapıyor.'), oynat(c, bis, 4400));
    await bisiklet('teker');
    await par(c.say('Tekerlekler yola göre hem dönüyor hem ilerliyor.'), oynat(c, bis, 4600));
    const [cx, cy] = bis.P(136, 8), cep = c.S('g', {}, svg);
    c.S('circle', { cx, cy, r: 7, fill: RENK.vurgu }, cep); cizgi(c, cep, cx, cy, 806, 366, { renk: RENK.vurgu, kalin: 2 }); daire(c, cep, 860, 440, 92, { renk: RENK.vurgu, kalin: 2 });
    const tel = hareket(c, cep, 'telefon', 860, 440, { s: 1.05 });
    gizle(cep);
    await belir(c, cep);
    await par(c.say('O sırada Kemal’in cebindeki telefona bildirim geliyor ve telefon titreşiyor.'), oynat(c, tel, 4600));
    await bisiklet('hepsi');
    await par(c.say('Tek bir yolculukta üç hareket türü de var.'), oynat(c, [bis, tel], 4800));
    // Dene: hareketi kısa açıklamasıyla eşleştir. Doğru cevapla tabloya bir satır düşer.
    const ACIKLAMA = ['Bütün parçaları birlikte, aynı yönde ilerler.', 'Bir denge konumunun iki yanına gidip gelir.', 'Mili çevresinde dönerken yol boyunca ilerler.', 'Yerinden ayrılmadan, mili çevresinde döner.'];
    const DORT = [
      ['Bisikletin gövdesi, yola göre', 'gövde, yola göre', [['öteleme', TUR.o]], [2, 0, 3, 1], 'Evet. Bu, öteleme hareketidir.',
        ['', 'Gövde geri dönüp gidip gelmiyor; iki nokta da aynı yönde ilerliyor.', 'Dönen tekerlektir; gövdenin kendisi dönmez.', 'Gövde yola göre yerinde durmuyor; yol boyunca ilerliyor.']],
      ['Kemal’in cebindeki telefon, Kemal’e göre', 'telefon, Kemal’e göre', [['titreşim', TUR.t]], [1, 3, 0, 2], 'Evet. Bu, titreşim hareketidir.',
        ['Telefon Kemal’e göre bir yere gitmiyor; cepte kalıyor.', '', 'Telefon dönmüyor; kesikli çizginin iki yanına çok kısa gidip geliyor.', 'Telefon dönmüyor; kesikli çizginin iki yanına çok kısa gidip geliyor.']],
      ['Bisikletin tekerleği, yola göre', 'tekerlek, yola göre', [['dönme', TUR.d], [' + '], ['öteleme', TUR.o]], [3, 2, 1, 0], 'Evet. Dönme ve öteleme birlikte.',
        ['Tekerleğin parçaları aynı yönde ilerlemiyor; janttaki nokta milin çevresinde dolanıyor.', 'Tekerlek geri dönüp gidip gelmiyor.', '', 'Yola göre mil yerinde durmuyor; yol boyunca ilerliyor.']],
      ['Bisikletin tekerleği, gövdeye göre', 'tekerlek, gövdeye göre', [['dönme', TUR.d]], [0, 2, 3, 1], 'Evet. Aynı tekerlek, gövdeye göre yalnızca döner.',
        ['Gövdeye göre tekerlek ilerlemiyor; janttaki nokta çember çiziyor.', 'Tekerlek gidip gelmiyor; janttaki nokta çemberi tamamlıyor.', 'Gövdeye göre mil yer değiştirmez; yol boyunca ilerleme yalnızca yola göre görülür.', '']],
    ];
    const tb = tablo(c, svg, { x: 40, y: 332, basliksiz: true, satir: 52, size: 24, sutunlar: [{ w: 330 }, { w: 270 }] });
    await c.say('Her hareketi kısa açıklamasıyla eşleştir.', { noWait: true });
    for (let i = 0; i < DORT.length; i++) {
      const [soru, kisa, tur, dizi, neden, ipucu] = DORT[i];
      if (i < 3) await oynat(c, i === 1 ? tel : bis, 2600);
      await c.choice({ tag: 'Sıra sende', q: `<b>${soru}</b> nasıl hareket eder?`, options: dizi.map((k) => ACIKLAMA[k]), answer: dizi.indexOf(i), hints: dizi.map((k) => ipucu[k]), right: neden,
        onPick: (j, dogru) => {
          if (!dogru) return;
          const satir = tb.satir([kisa, null]), [x, y] = tb.hucre(i, 1);
          renkli(c, satir, x, y, tur, { size: 24 }); satir.style.opacity = 0; belir(c, satir, 300);
        } });
    }
    await c.say('Birden fazla tür içeren hareket, dördüncü bir tür değildir.', { speak: '[thoughtful] Birden fazla tür içeren hareket, dördüncü bir tür değildir.' });
    await c.say('Onu bildiğimiz üç türe ayırırız: hangi parça, neye göre, nasıl?');
    await par(c.say('Bir cisim aynı anda hem dönebilir hem ilerleyebilir.'), oynat(c, bis, 4800));
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-f2', kicker: 'Konu F · Hareket türleri', title: 'Aynı anda birden fazla hareket', accent: '#c792ff', back: 'index.html',
    intro: { title: 'Aynı anda birden fazla hareket', hook: 'Yolda giden bisikletin tekerleği dönüyor mu, ilerliyor mu?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Bisikletin tekerleği', goal: 'Tekerleğin aynı anda iki hareket türü yaptığını gör.', run: tekerlek },
      { title: 'Hangi parça, neye göre, nasıl?', goal: 'Bir hareketi üç soruyla türlerine ayır.', run: ucSoru },
      { title: 'Üç ikili', goal: 'İki türün birlikte görüldüğü üç örneği tanı.', run: ucIkili },
      { title: 'Türlerini işaretle', goal: 'Sekiz hareketin türlerini işaretle.', run: isaretle },
      { title: 'Bir yolculukta üç tür', goal: 'Bir yolculuktaki üç hareket türünü bul.', run: yolculuk },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yerde duran topa vuruldu; top çimde yuvarlanarak uzaklaşıyor. Top hangi hareket türlerini yapıyor?',
        options: ['Yalnızca öteleme', 'Dönme ve öteleme', 'Yalnızca dönme'], answer: 1,
        why: ['Top yalnızca ilerlemiyor; yuvarlanırken dönüyor da.', 'Yuvarlanan top, tekerlek gibi dönerken ilerler.', 'Top yalnızca dönseydi olduğu yerde kalırdı; oysa uzaklaşıyor.'], scene: 0 },
      { q: 'Tavan vantilatörünün kanatları da yolda giden bisikletin tekerleği de dönüyor. Yere göre farkları nedir?',
        options: ['Fark yoktur; ikisi de yalnızca döner', 'Vantilatör titreşim, tekerlek dönme yapar', 'Vantilatörün mili sabittir; tekerleğin mili yol boyunca ilerler'], answer: 2,
        why: ['Tekerlek yalnızca dönmez; mili yol boyunca ilerler.', 'İkisinde de gidip gelme yok; ikisi de dönüyor.', 'Vantilatör yalnızca döner; tekerlek hem döner hem ötelenir.'], scene: 1 },
      { q: 'Düz bir yolda giden ambulansın tepesindeki uyarı lambası, ambulansa bağlı bir milin çevresinde dönüyor. Lamba yola göre hangi hareketleri yapar?',
        options: ['Dönme ve öteleme; mil yol boyunca ilerler, lamba onun çevresinde dolanır', 'Yalnızca dönme; mil ambulansa bağlı olduğu için yola göre de ilerlemez', 'Yalnızca öteleme; lamba ambulansla birlikte yol boyunca ilerliyor'], answer: 0,
        why: ['Evet. Mil yola göre ilerler, lamba milin çevresinde dolanır; iki hareket birlikte.', 'Hareketin türü yola göre belirlenir. Mil ambulansla birlikte yol boyunca ilerler.', 'Lamba yalnızca ilerlemiyor; milin çevresinde de dolanıyor.'], scene: 1 },
      { q: 'Mert: “Matkap ucu duvara girerken hem dönüyor hem ilerliyor. Demek ki üç türün dışında dördüncü bir hareket türü yapıyor.” Doğru karşılık hangisidir?',
        options: ['Haksız; matkap ucu önce dönüyor, ilerlemesi ondan sonra başlıyor', 'Haksız; yeni bir tür yok, uç bildiğimiz iki türü aynı anda yapıyor', 'Haklı; iki türü birlikte yapan cismin hareketi yeni bir türdür'], answer: 1,
        why: ['İki hareket sırayla değil, aynı anda yapılır; uç dönerken ilerler.', 'Evet. Türler yine öteleme, dönme ve titreşimdir; burada ikisi birlikte görülüyor.', 'Birlikte görülmeleri yeni bir tür doğurmaz; değişen, bir cisimde kaçının görüldüğüdür.'], scene: 2 },
    ],
    summary: ['<b>Bir cisim aynı anda hem dönebilir hem ilerleyebilir.</b>', 'Birden fazla tür içeren hareket dördüncü bir tür değildir; bildiğimiz üç türe ayrılır.', 'Türü söylerken üç soru sorulur: hangi parça, neye göre, nasıl?'],
    nextLesson: { href: 'f3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
