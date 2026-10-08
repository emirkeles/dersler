/* F1 · FİZ.9.2.7 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/F-hareket-turleri.md
   Yazar notu: içerik MEB Fizik 9 s. 105, 111–116'dan. Öğrenciye kitap ya da sayfa anılmaz.
   Üç türün rengi F1 ve F2'de aynıdır: öteleme = RENK.a, dönme = RENK.b, titreşim = RENK.r.
   Hareket bileşeni (hareket, oynat, CIZIM) F2 ile ortaktır; kit değişmediği için iki dosyada da tanımlıdır.
   Açısal hız, periyot, frekans, tur sayısı gibi hiçbir sayı tahtaya yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, par, ok, okCiz, kutular } = KIT;
  const { lerp, ease } = Ders;
  const TAU = Math.PI * 2, RAD = Math.PI / 180;
  const TUR = { o: RENK.a, d: RENK.b, t: RENK.r }, NOTR = RENK.mor;
  const B = { renk: RENK.yazi, fill: RENK.koyu }, Y = { renk: RENK.cizgi };
  const io = ease.inOut, sal = (t, n) => Math.sin(TAU * n * t), f1 = (v) => Math.round(v * 10) / 10;
  const git = (el, x, y, a) => el.setAttribute('transform', `translate(${f1(x)} ${f1(y)})` + (a == null ? '' : ` rotate(${f1(a)})`));

  /* ---- Hareket bileşeni ----
     hareket(c, p, ad, x, y, { s, t, ok, notr, … }) bir hareketi yerel koordinatlarda (yaklaşık 220×160) çizer ve tahtaya koyar.
     h.kur(t): t 0→1 arasında hareketin anı. İşaretli noktalar iz bırakır (K.iz); sabit nokta çarpıyla (K.carpi),
     denge konumu kesikli çizgiyle (K.denge) gösterilir. ok: öteleme izleri ok olarak çizilir. notr: izler tür rengini
     almadan (mor) çizilir; h.renk(false) tür renklerine çevirir. h.P(x, y) yerel noktayı tahta koordinatına çevirir. */
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
  /* Hareketi tahtada başka bir yere ve ölçeğe taşır (kartın kutuya düşmesi). */
  const ucus = (c, h, x2, y2, s2, ms = 500) => { const { x, y, s } = h; return c.tween(ms, (e) => h.yer(lerp(x, x2, e), lerp(y, y2, e), lerp(s, s2, e))).then(() => h.kalin()); };
  const bayrak = (c, p, x, y, boy = 44) => {
    const g = c.S('g', {}, p);
    cizgi(c, g, x, y, x, y - boy, { renk: RENK.vurgu, kalin: 3 });
    yol(c, g, `M ${x} ${y - boy} L ${x + boy * 0.5} ${y - boy * 0.8} L ${x} ${y - boy * 0.6} Z`, { renk: RENK.vurgu, fill: RENK.vurgu, kalin: 2 });
    return g;
  };
  /* Eğik görünen pervane (helikopter): kanat uçları elips üzerinde dolanır. */
  const pervane = (c, g, cx, cy, rx, ry, n) => {
    const kanat = [...Array(n)].map(() => cizgi(c, g, cx, cy, cx, cy, { renk: RENK.yazi, kalin: 5 }));
    const uc = (i, a) => [cx + rx * Math.cos(a + TAU * i / n), cy + ry * Math.sin(a + TAU * i / n)];
    return { uc, kur: (a) => kanat.forEach((el, i) => { const [x, y] = uc(i, a); el.setAttribute('x2', f1(x)); el.setAttribute('y2', f1(y)); }) };
  };

  /* ---- Çizimler: her biri (c, g, K) alır, t → çizimi güncelleyen işlevi döndürür ---- */
  const CIZIM = {
    asansor(c, g, K) {
      cizgi(c, g, -70, 78, 70, 78, Y);
      kutu(c, g, -36, -78, 72, 156, { renk: RENK.cizgi, fill: 'none', rx: 3, kalin: 2 });
      [-26, 26].forEach((y) => cizgi(c, g, 36, y, 58, y, { renk: RENK.cizgi, kalin: 2 }));
      const halat = cizgi(c, g, 0, -78, 0, 0, { renk: RENK.cizgi, kalin: 2 }), kabin = c.S('g', {}, g);
      kutu(c, kabin, -26, 0, 52, 54, { ...B, rx: 4 }); cizgi(c, kabin, 0, 5, 0, 49, { renk: RENK.cizgi, kalin: 2 });
      const y = (t) => lerp(22, -74, io(t));
      K.iz((t) => [-13, y(t) + 54], 'o'); K.iz((t) => [13, y(t)], 'o');
      return (t) => { git(kabin, 0, y(t)); halat.setAttribute('y2', f1(y(t))); };
    },
    dolap(c, g, K) {
      const cy = -12, R = 54, n = 6;
      cizgi(c, g, -80, 78, 80, 78, Y);
      yol(c, g, `M -40 78 L 0 ${cy} L 40 78`, { renk: RENK.cizgi, kalin: 4 });
      const cark = c.S('g', {}, g); daire(c, cark, 0, 0, R, { renk: RENK.yazi });
      for (let i = 0; i < n; i++) cizgi(c, cark, 0, 0, R * Math.cos(TAU * i / n), R * Math.sin(TAU * i / n), { renk: RENK.yazi, kalin: 2 });
      const P = (i, t) => { const a = TAU * (i / n + t) - Math.PI / 2; return [R * Math.cos(a), cy + R * Math.sin(a)]; };
      const kabinler = [...Array(n)].map(() => kutu(c, g, -9, 0, 18, 16, { ...B, rx: 4, kalin: 2 }));
      K.carpi(0, cy);
      K.iz((t) => P(0, t), 'd'); K.iz((t) => P(3, t), 'd');
      return (t) => { git(cark, 0, cy, 360 * t - 90); kabinler.forEach((el, i) => git(el, ...P(i, t))); };
    },
    gitar(c, g, K) {
      yol(c, g, 'M 12 -10 C 10 -24 0 -32 -14 -32 C -24 -32 -28 -26 -36 -26 C -44 -26 -56 -46 -74 -46 C -96 -46 -108 -26 -108 0 C -108 26 -96 46 -74 46 C -56 46 -44 26 -36 26 C -28 26 -24 32 -14 32 C 0 32 10 24 12 10 Z', { renk: RENK.cizgi, fill: RENK.koyu });
      daire(c, g, -22, 0, 12, { renk: RENK.cizgi, kalin: 2 });
      kutu(c, g, 12, -8, 88, 16, { renk: RENK.cizgi, rx: 2, kalin: 2 }); kutu(c, g, 100, -11, 14, 22, { renk: RENK.cizgi, rx: 3, kalin: 2 });
      kutu(c, g, -84, -10, 6, 20, { renk: RENK.cizgi, rx: 1, kalin: 2 });
      K.denge(-78, 0, 100, 0);
      const tel = yol(c, g, '', { renk: RENK.yazi }), n = K.o.n || 4, y = (t) => 18 * (1 - 0.3 * t) * sal(t, n);
      K.iz((t) => [11, y(t)], 't');
      return (t) => tel.setAttribute('d', `M -78 0 Q 11 ${f1(2 * y(t))} 100 0`);
    },
    araba(c, g, K) {
      const yG = 34, R = 14, X = (t) => lerp(-52, 52, io(t));
      cizgi(c, g, -110, yG, 110, yG, Y);
      const a = c.S('g', {}, g);
      yol(c, a, 'M -52 -14 L -52 -32 L -30 -36 L -16 -56 L 20 -56 L 34 -36 L 52 -31 L 52 -14 Z', B);
      yol(c, a, 'M -12 -51 L 17 -51 L 27 -38 L -21 -38 Z', { renk: RENK.cizgi, kalin: 2 });
      const tekerler = [-30, 30].map((x) => {
        const w = c.S('g', {}, a); daire(c, w, 0, 0, R, B);
        cizgi(c, w, -R + 3, 0, R - 3, 0, { renk: RENK.cizgi, kalin: 2 }); cizgi(c, w, 0, -R + 3, 0, R - 3, { renk: RENK.cizgi, kalin: 2 });
        w.x = x; return w;
      });
      K.iz((t) => [X(t) - 44, yG - 22], 'o'); K.iz((t) => [X(t) + 2, yG - 46], 'o'); K.iz((t) => [X(t) + 44, yG - 34], 'o');
      return (t) => { git(a, X(t), yG); tekerler.forEach((w) => git(w, w.x, -R, (X(t) - X(0)) / R / RAD)); };
    },
    turbin(c, g, K) {
      const cy = -16, L = 56;
      cizgi(c, g, -50, 78, 50, 78, Y);
      yol(c, g, `M -7 78 L -3 ${cy} L 3 ${cy} L 7 78 Z`, B);
      const kanat = c.S('g', {}, g);
      for (let i = 0; i < 3; i++) yol(c, kanat, 'M 0 -5 Q 28 -11 56 0 Q 28 4 0 5 Z', B).setAttribute('transform', `rotate(${i * 120})`);
      daire(c, g, 0, cy, 6, B); K.carpi(0, cy);
      K.iz((t) => { const a = TAU * t - Math.PI / 2; return [L * Math.cos(a), cy + L * Math.sin(a)]; }, 'd');
      return (t) => git(kanat, 0, cy, 360 * t - 90);
    },
    metronom(c, g, K) {
      const py = 54, L = 116, n = K.o.n || 2, aci = (t) => 24 * sal(t, n);
      yol(c, g, 'M -44 72 L -16 -56 L 16 -56 L 44 72 Z', B);
      K.denge(0, -78, 0, py);
      const kol = c.S('g', {}, g); cizgi(c, kol, 0, 0, 0, -L, { renk: RENK.yazi, kalin: 4 }); kutu(c, kol, -9, -84, 18, 14, { ...B, rx: 2 });
      K.carpi(0, py);
      K.iz((t) => { const a = aci(t) * RAD; return [L * Math.sin(a), py - L * Math.cos(a)]; }, 't');
      return (t) => git(kol, 0, py, aci(t));
    },
    atis(c, g, K) {
      yol(c, g, 'M -100 -46 Q -74 0 -100 46', { renk: RENK.cizgi, kalin: 4 }); cizgi(c, g, -100, -46, -100, 46, { renk: RENK.cizgi, kalin: 1.5 });
      const o = c.S('g', {}, g), X = (t) => lerp(-46, 62, io(t));
      cizgi(c, o, -40, 0, 30, 0, { renk: RENK.yazi, kalin: 4 });
      yol(c, o, 'M 42 0 L 26 -7 L 26 7 Z', { renk: RENK.yazi, fill: RENK.yazi, kalin: 1 });
      yol(c, o, 'M -40 0 L -50 -9 M -40 0 L -50 9 M -32 0 L -42 -9 M -32 0 L -42 9', { renk: RENK.yazi, kalin: 2.5 });
      K.iz((t) => [X(t) - 50, -9], 'o'); K.iz((t) => [X(t) + 26, 7], 'o');
      return (t) => git(o, X(t), 0);
    },
    yay(c, g, K) {
      const y0 = 22, n = K.o.n || 2, Yc = (t) => y0 + 26 * sal(t, n);
      cizgi(c, g, -46, -76, 46, -76, { renk: RENK.yazi, kalin: 4 });
      for (let i = 0; i < 5; i++) cizgi(c, g, -38 + i * 18, -76, -30 + i * 18, -83, { renk: RENK.cizgi, kalin: 2 });
      K.denge(-70, y0, 70, y0);
      const yayEl = yol(c, g, '', { renk: RENK.yazi }), cisim = kutu(c, g, -20, -16, 40, 32, { ...B, rx: 5 });
      K.iz((t) => [0, Yc(t)], 't');
      return (t) => {
        const ust = -66, alt = Yc(t) - 24, N = 8, ad = (alt - ust) / N; let d = `M 0 -76 L 0 ${ust}`;
        for (let i = 0; i < N; i++) d += ` L ${i % 2 ? 13 : -13} ${f1(ust + ad * (i + 0.5))}`;
        yayEl.setAttribute('d', d + ` L 0 ${f1(alt)} L 0 ${f1(Yc(t) - 16)}`); git(cisim, 0, Yc(t));
      };
    },
    disli(c, g, K) {
      const cark = (x, r, n, a0, oran, isaret) => {
        const w = c.S('g', {}, g), p = TAU / n; let d = '';
        for (let i = 0; i < n; i++) [[r - 5, -0.3], [r + 5, -0.17], [r + 5, 0.17], [r - 5, 0.3]].forEach(([q, kay], j) => { const a = p * (i + kay); d += (i || j ? 'L' : 'M') + f1(q * Math.cos(a)) + ' ' + f1(q * Math.sin(a)); });
        yol(c, w, d + 'Z', B); daire(c, w, 0, 0, r * 0.32, { renk: RENK.cizgi, kalin: 2 });
        K.carpi(x, 0);
        const aci = (t) => a0 + oran * TAU * t;
        K.iz((t) => [x + (r + 5) * Math.cos(aci(t) + p * isaret), (r + 5) * Math.sin(aci(t) + p * isaret)], 'd');
        return (t) => git(w, x, 0, aci(t) / RAD);
      };
      const a = cark(-34, 38, 12, 0, 1, 9), b = cark(38, 28, 9, Math.PI + TAU / 18, -12 / 9, 3);
      return (t) => { a(t); b(t); };
    },
    tren(c, g, K) {
      const yR = 22, D = K.o.yol || 70, X = (t) => lerp(-D / 2, D / 2, io(t));
      cizgi(c, g, -D / 2 - 76, yR, D / 2 + 78, yR, Y);
      const tr = c.S('g', {}, g);
      yol(c, tr, 'M 24 -7 L 24 -36 L 50 -36 Q 70 -34 74 -14 L 74 -7 Z', B);
      kutu(c, tr, 31, -30, 16, 11, { renk: RENK.cizgi, fill: 'none', rx: 2, kalin: 2 });
      [-72, -24].forEach((x) => { kutu(c, tr, x, -34, 44, 27, { ...B, rx: 3 }); [6, 25].forEach((dx) => kutu(c, tr, x + dx, -28, 13, 9, { renk: RENK.cizgi, fill: 'none', rx: 2, kalin: 2 })); });
      yol(c, tr, 'M -28 -12 L -24 -12 M 20 -12 L 24 -12', { renk: RENK.yazi });
      [-62, -38, -14, 10, 36, 62].forEach((x) => daire(c, tr, x, -6, 6, B));
      K.iz((t) => [X(t) - 68, yR - 30], 'o'); K.iz((t) => [X(t) - 2, yR - 20], 'o'); K.iz((t) => [X(t) + 72, yR - 11], 'o');
      return (t) => git(tr, X(t), yR);
    },
    saksi(c, g, K) {
      cizgi(c, g, -80, 76, 80, 76, Y); cizgi(c, g, -56, -80, -56, 76, Y);
      yol(c, g, 'M -56 -48 L 0 -48 M -56 -74 L 0 -74 M 0 -74 L 0 -48 M -19 -74 L -19 -48 M -38 -74 L -38 -48', { renk: RENK.cizgi });
      const s = c.S('g', {}, g), X = 26, Yc = (t) => lerp(-54, 62, t * t);
      yol(c, s, 'M 0 -12 Q -5 -24 -14 -26 M 0 -12 Q 1 -26 0 -32 M 0 -12 Q 6 -24 14 -25', { renk: RENK.yazi, kalin: 2.5 });
      yol(c, s, 'M -15 -12 L 15 -12 L 10 12 L -10 12 Z', B);
      K.iz((t) => [X - 15, Yc(t) - 12], 'o'); K.iz((t) => [X + 10, Yc(t) + 12], 'o');
      return (t) => git(s, X, Yc(t));
    },
    fan(c, g, K) {
      const a0 = -0.12, P = (r, t) => { const a = a0 + TAU * t; return [r * Math.cos(a), r * Math.sin(a)]; };
      kutu(c, g, -70, -70, 140, 140, { ...B, rx: 10 });
      [[-58, -58], [58, -58], [-58, 58], [58, 58]].forEach(([x, y]) => daire(c, g, x, y, 4, { renk: RENK.cizgi, kalin: 2 }));
      daire(c, g, 0, 0, 62, { renk: RENK.cizgi, kalin: 2 });
      const p = c.S('g', {}, g);
      for (let i = 0; i < 5; i++) yol(c, p, 'M 8 -9 Q 34 -30 56 -8 Q 46 6 12 8 Z', B).setAttribute('transform', `rotate(${i * 72})`);
      daire(c, p, 0, 0, 13, B);
      K.p.cizgi = cizgi(c, p, 0, 0, 50 * Math.cos(a0), 50 * Math.sin(a0), { renk: RENK.yazi, kalin: 2.5 });
      K.carpi(0, 0);
      K.iz((t) => P(50, t), 'd'); K.iz((t) => P(28, t), 'd');
      return (t) => git(p, 0, 0, 360 * t);
    },
    masa(c, g, K) {
      const yZ = 40, X = (t) => lerp(-46, 30, io(t));
      cizgi(c, g, -110, yZ, 110, yZ, Y); kutu(c, g, 96, -78, 14, 118, { renk: RENK.cizgi, rx: 0, kalin: 2 });
      const m = c.S('g', {}, g);
      yol(c, m, 'M -34 -56 L -34 -8 M 46 -56 L 46 -8', { renk: RENK.cizgi, kalin: 4 });
      yol(c, m, 'M -52 -52 L 38 -52 L 52 -64 L -38 -64 Z', B);
      yol(c, m, 'M -48 -52 L -48 0 M 34 -52 L 34 0', { renk: RENK.yazi, kalin: 4 });
      [[-48, 0], [34, 0], [-34, -8], [46, -8]].forEach(([x, y]) => K.iz((t) => [X(t) + x, yZ + y], 'o', { r: 5 }));
      return (t) => git(m, X(t), yZ);
    },
    patenci(c, g, K) {
      const yB = 48, X = (t) => lerp(-56, 56, io(t));
      cizgi(c, g, -110, yB, 110, yB, Y);
      const p = c.S('g', {}, g);
      daire(c, p, 10, -84, 10, B);
      yol(c, p, 'M 6 -74 L -8 -40 L 6 -20 L 2 -2 M -8 -40 L -30 -30 L -46 -34 M 4 -68 L 24 -56 M 4 -68 L -16 -58', { renk: RENK.yazi, kalin: 4 });
      yol(c, p, 'M -8 0 L 14 0 M -54 -30 L -40 -38', { renk: RENK.yazi });
      K.iz((t) => [X(t) + 10, yB - 84], 'o'); K.iz((t) => [X(t) + 3, yB], 'o');
      return (t) => git(p, X(t), yB);
    },
    saat(c, g, K) {
      const P = (r, derece) => [r * Math.sin(derece * RAD), -r * Math.cos(derece * RAD)], akA = (t) => 300 + 60 * t, yelA = (t) => 720 * t;
      daire(c, g, 0, 0, 68, B);
      for (let i = 0; i < 12; i++) cizgi(c, g, ...P(57, i * 30), ...P(63, i * 30), { renk: RENK.cizgi, kalin: i % 3 ? 2 : 4 });
      const ak = cizgi(c, g, 0, 0, 0, 0, { renk: RENK.yazi, kalin: 6 }), yel = cizgi(c, g, 0, 0, 0, 0, { renk: RENK.yazi, kalin: 4 });
      K.carpi(0, 0);
      K.iz((t) => P(30, akA(t)), 'd'); K.iz((t) => P(50, yelA(t)), 'd', { n: 96 });
      const koy = (el, [x, y]) => { el.setAttribute('x2', f1(x)); el.setAttribute('y2', f1(y)); };
      return (t) => { koy(ak, P(30, akA(t))); koy(yel, P(50, yelA(t))); };
    },
    helikopter(c, g, K) {
      cizgi(c, g, -100, 66, 100, 66, Y);
      yol(c, g, 'M -58 26 C -58 2 -30 -6 -6 -4 C 14 -2 26 8 40 12 L 100 16 L 100 24 L 30 36 C 10 50 -58 52 -58 26 Z', B);
      yol(c, g, 'M -52 18 C -48 6 -34 0 -18 0 L -18 18 Z', { renk: RENK.cizgi, kalin: 2 });
      daire(c, g, 100, 18, 9, { renk: RENK.cizgi, kalin: 2 });
      yol(c, g, 'M -36 46 L -36 62 M 4 44 L 4 62 M -52 62 L 22 62', { renk: RENK.yazi });
      cizgi(c, g, -14, -4, -14, -24, { renk: RENK.yazi, kalin: 4 });
      const pv = pervane(c, g, -14, -24, 84, 15, 3);
      K.carpi(-14, -24);
      K.iz((t) => pv.uc(0, TAU * t), 'd');
      return (t) => pv.kur(TAU * t);
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
    dalga(c, g, K) {
      const n = K.o.n || 2, y = (x, t) => 16 * Math.sin(TAU * (x / 110 - n * t));
      const su = yol(c, g, '', { renk: RENK.yazi, fill: RENK.koyu });
      K.denge(-104, 0, 104, 0);
      K.iz((t) => [0, y(0, t)], 't');
      return (t) => { let d = ''; for (let x = -100; x <= 100; x += 5) d += (d ? 'L' : 'M') + x + ' ' + f1(y(x, t)); su.setAttribute('d', d + 'L100 62L-100 62Z'); };
    },
    catal(c, g, K) {
      const n = K.o.n || 6, d = (t) => 8 * (1 - 0.3 * t) * sal(t, n);
      K.denge(-24, -78, -24, 12); K.denge(24, -78, 24, 12);
      cizgi(c, g, 0, 30, 0, 76, { renk: RENK.yazi, kalin: 7 });
      const el = yol(c, g, '', { renk: RENK.yazi, kalin: 7 });
      K.iz((t) => [-24 - d(t), -66], 't', { r: 5 }); K.iz((t) => [24 + d(t), -66], 't', { r: 5 });
      return (t) => { const u = f1(d(t)); el.setAttribute('d', `M ${-24 - u} -66 Q -24 -20 -24 10 Q -24 30 0 30 Q 24 30 24 10 Q 24 -20 ${24 + u} -66`); };
    },
  };

  /* ---- Sahne 1 · Üç hareket, tek soru ---- */
  async function ucHareket(c) {
    const svg = c.svg(1000, 562), YER = 420;
    cizgi(c, svg, 30, YER, 970, YER, { kalin: 4 });
    const b = bayrak(c, svg, 70, YER), bAd = yazi(c, svg, 44, YER + 42, 'referans noktası', { size: 24, hiza: 'start', renk: RENK.vurgu });
    const olcu = cizgi(c, svg, 70, YER - 16, 267, YER - 16, { renk: RENK.soluk, kalin: 2.5, kesik: '7 7' });
    const cisim = c.S('circle', { cx: 280, cy: YER - 16, r: 13, fill: RENK.yazi }, svg);
    const asan = hareket(c, svg, 'asansor', 215, YER - 148, { s: 1.9 }), dolap = hareket(c, svg, 'dolap', 500, YER - 148, { s: 1.9 }), gitar = hareket(c, svg, 'gitar', 815, 250, { s: 1.35 });
    gizle(b, bAd, cisim, olcu, asan.g, dolap.g, gitar.g);
    await belir(c, [b, cisim]); await belir(c, olcu);
    await c.say('Bir cismin yerini, seçtiğimiz bir referans noktasına göre söyleriz.');
    await belir(c, bAd);
    await c.say('Referans noktası, hareket etmediğini kabul ettiğimiz noktadır.');
    await par(c.say('Cisim bu noktaya göre zamanla yer değiştiriyorsa hareket ediyor deriz.'),
      c.tween(3400, (e) => { const x = lerp(280, 700, e); cisim.setAttribute('cx', x); olcu.setAttribute('x2', x - 13); }));
    await kaybol(c, [cisim, olcu]);
    await c.say('Referans noktamız yer olsun; yere göre üç harekete bakalım.');
    await belir(c, asan.g);
    await par(c.say('Bir asansör, yolcularını zemin kattan üst kata taşıyor.'), oynat(c, asan, 3600));
    await belir(c, dolap.g);
    await par(c.say('Lunaparkta bir dönme dolap çalışıyor.'), oynat(c, dolap, 3600));
    await belir(c, gitar.g);
    await par(c.say('Bir gitarın gergin teline az önce vuruldu.'), oynat(c, gitar, 3200));
    await oynat(c, [asan, dolap, gitar], 3600);
    await c.choice({ tag: 'Düşün', q: 'Asansör, dönme dolap ve gitar teli aynı biçimde mi hareket ediyor?',
      options: ['Evet; üçü de bir yerden başka bir yere gidiyor', 'Hayır; biri ilerliyor, biri dönüyor, biri gidip geliyor', 'Evet; üçü de aynı yolu tekrar tekrar çiziyor'], answer: 1,
      hints: ['Dönme dolap ve tel yerinden ayrılmıyor; bir kattan ötekine giden yalnızca asansör. Hareket eden her cisim bir yere gitmez.', '', 'Asansör yolunu tekrar etmiyor, yukarı çıkıyor. Dolap ile tel tekrar ediyor ama biri dönüyor, öteki gidip geliyor.'],
      right: 'Evet. İzlere bak: biri düz, biri çember, biri gidip gelen kısa bir çizgi.' });
    await par(c.say('Üçü de yere göre hareket ediyor, ama hareket biçimleri farklı.', { speak: 'Üçü de yere göre hareket ediyor, ama [short pause] hareket biçimleri farklı.' }), oynat(c, [asan, dolap, gitar], 4000));
    await c.say('Hareketleri biçimlerine göre ayıracak, gruplayacak ve gruplara ad vereceğiz.');
  }

  /* ---- Sahne 2 · Altı hareketi izle ---- */
  const ALTI = [['araba', 'araba'], ['turbin', 'rüzgâr türbini'], ['metronom', 'metronom'], ['atis', 'ok'], ['yay', 'yay ve cisim'], ['disli', 'dişli çarklar']];
  async function altiHareket(c) {
    const svg = c.svg(1000, 562);
    const hucre = ALTI.map(([ad, etiket], i) => {
      const x = 180 + (i % 3) * 320, y = i < 3 ? 126 : 392, g = c.S('g', {}, svg);
      const cer = kutu(c, g, x - 145, y - 104, 290, 208, { renk: RENK.ince, fill: 'none', kalin: 2 });
      const h = hareket(c, g, ad, x, y, { s: 1.2 });
      yazi(c, g, x, y + 132, etiket, { size: 24, renk: RENK.soluk });
      g.style.opacity = 0;
      return { g, cer, h };
    });
    const odak = (...secili) => {
      hucre.forEach((u, i) => u.cer.setAttribute('stroke', secili.includes(i) ? RENK.vurgu : RENK.ince));
      return par(hucre.map((u, i) => sol(c, u.g, !secili.length || secili.includes(i) ? 1 : 0.3, 250)));
    };
    const cumle = ['Düz yolda giden arabanın gövdesindeki bütün noktalar aynı yönde ilerliyor.', 'Rüzgâr türbininin kanatları, göbeğin çevresinde dönüyor.',
      'Metronomun kolu, orta çizginin bir sağına bir soluna gidiyor.', 'Okçunun attığı okun ucu da arkası da aynı yönde ilerliyor.',
      'Yayın ucuna asılı cisim, aşağı ve yukarı gidip geliyor.', 'Saatin dişli çarkları, yerlerinden ayrılmadan milleri çevresinde dönüyor.'];
    await belir(c, hucre.map((u) => u.g));
    await c.say('Şimdi altı hareketi izle; her birinde parçaların nasıl hareket ettiğine bak.');
    for (let i = 0; i < 6; i++) {
      await odak(i);
      await par(c.say(cumle[i]), oynat(c, hucre[i].h, 4200));
    }
    await odak();
    await oynat(c, hucre.map((u) => u.h), 3600);
    await c.choice({ tag: 'Düşün', q: 'Bu altı hareketten hangi ikisinin niteliği aynı?',
      options: ['Rüzgâr türbini ile dişli çarklar', 'Araba ile metronom', 'Ok ile yayın ucundaki cisim'], answer: 0,
      hints: ['', 'Araba ilerleyip gidiyor; metronomun kolu ise olduğu yerde iki yana gidip geliyor.', 'Ok tek yönde ilerliyor; yayın ucundaki cisim geri dönüp aynı yoldan yeniden geçiyor.'],
      right: 'Evet. İkisinde de işaretli nokta bir çember çiziyor.' });
    await odak(1, 5);
    await par(c.say('Türbinde de dişlide de parçalar sabit bir noktanın çevresinde dönüyor.'), oynat(c, [hucre[1].h, hucre[5].h], 4200));
  }

  /* ---- Sahne 3 · Ayır ve grupla ---- */
  async function ayir(c) {
    const svg = c.svg(1000, 562), alan = c.S('g', {}, svg), S = 0.62;
    const nitelik = [['bütün parçalar', 'birlikte, aynı yönde', 'ilerliyor'], ['parçalar sabit bir', 'noktanın çevresinde', 'dönüyor'], ['cisim bir noktanın', 'iki yanına', 'gidip geliyor']];
    const kt = kutular(c, alan, nitelik.map((n) => [' ', ...n]), { y: 160, h: 388, renkler: [TUR.o, TUR.d, TUR.t], baslikBoy: 22 });
    kt.basliklar.forEach((b) => gizle(b.slice(1)));
    kt.g.style.opacity = 0;
    const SEC = ['Birlikte, aynı yönde ilerliyor', 'Sabit bir noktanın çevresinde dönüyor', 'Bir noktanın iki yanına gidip geliyor'];
    const sira = [
      ['araba', 0, 'Düz yolda giden arabanın gövdesi', 'Gövdedeki üç noktanın izine bak: üçü de aynı yönde, eşit boyda.', 'Evet. Gövdenin bütün noktaları aynı yönde ilerliyor.'],
      ['turbin', 1, 'Rüzgâr türbininin kanatları', 'Kanat ucunun izi bir çember; göbek yerinden ayrılmıyor.', 'Evet. Kanatlar göbeğin çevresinde dönüyor.'],
      ['atis', 0, 'Okçunun attığı ok', 'Okun ucu da arkası da aynı yönde, eşit iz bırakıyor.', 'Evet. Okun bütün parçaları aynı yönde ilerliyor.'],
      ['yay', 2, 'Yayın ucundaki cisim', 'Cisim kesikli çizginin bir altına, bir üstüne geçiyor.', 'Evet. Cisim aşağı ve yukarı gidip geliyor.'],
      ['disli', 1, 'Saatin dişli çarkları', 'Dişliler yerinden ayrılmıyor; işaretli dişler çember çiziyor.', 'Evet. Dişliler milleri çevresinde dönüyor.'],
      ['metronom', 2, 'Metronomun kolu', 'Kolun bir ucu sabit, ama kol tam tur atmıyor; izine bak.', 'Evet. Kol tam tur atmıyor; iki yana gidip geliyor.'],
    ];
    const kartlar = sira.map(([ad], i) => {
      const x = 95 + i * 162, g = c.S('g', {}, alan), cer = kutu(c, g, x - 75, 20, 150, 116, { renk: RENK.ince, fill: 'none', kalin: 2 });
      const h = hareket(c, g, ad, x, 78, { s: S, t: 1 });
      g.style.opacity = 0;
      return { g, cer, h };
    });
    const dolu = [0, 0, 0];
    await belir(c, kartlar.map((k) => k.g));
    await belir(c, kt.g);
    await c.say('Niteliği aynı olan hareketleri aynı kutuya koyacağız.');
    await c.say('Kutuların henüz adı yok; üstlerinde yalnızca birer nitelik yazıyor.');
    await belir(c, kt.basliklar[0].slice(1));
    await c.say('Birinci kutu: bütün parçalar birlikte, aynı yönde ilerliyor.');
    await belir(c, kt.basliklar[1].slice(1));
    await c.say('İkinci kutu: parçalar sabit bir noktanın çevresinde dönüyor.');
    await belir(c, kt.basliklar[2].slice(1));
    await c.say('Üçüncü kutu: cisim bir noktanın iki yanına gidip geliyor.');
    await c.say('Her hareketi niteliğine uyan kutuya koy.', { noWait: true });
    for (let i = 0; i < sira.length; i++) {
      const [, kutuNo, ad, ipucu, neden] = sira[i], k = kartlar[i];
      k.cer.setAttribute('stroke', RENK.vurgu);
      await oynat(c, k.h, 2200);
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> hangi kutuya girer?`, options: SEC, answer: kutuNo, hints: SEC.map(() => ipucu), right: neden });
      k.cer.remove();
      await ucus(c, k.h, kt.x + kutuNo * (kt.w + kt.bosluk) + kt.w * (0.27 + 0.46 * dolu[kutuNo]++), 420, S);
    }
    await par(c.say('Altı hareket üç gruba ayrıldı.'), c.tween(700, (e) => git(alan, 0, -70 * e)));
    const adKoy = async () => {
      for (const [i, ad] of ['öteleme', 'dönme', 'titreşim'].entries()) {
        const t = kt.basliklar[i][0];
        kt.ad(i, ad); t.setAttribute('font-size', 30); t.style.opacity = 0;
        await belir(c, t, 400); await c.wait(700);
      }
    };
    await par(c.say('Şimdi grupların adını koyalım: öteleme, dönme ve titreşim.'), adKoy());
  }

  /* ---- Sahne 4 · Öteleme ---- */
  async function oteleme(c) {
    const svg = c.svg(1000, 562);
    yazi(c, svg, 40, 52, 'öteleme', { size: 34, hiza: 'start', renk: TUR.o });
    kutu(c, svg, 40, 222, 400, 14, { renk: RENK.cizgi, rx: 3, kalin: 2 }); bayrak(c, svg, 66, 222, 40);
    yazi(c, svg, 44, 270, 'istasyon', { size: 24, hiza: 'start', renk: RENK.soluk });
    const tren = hareket(c, svg, 'tren', 500, 150, { s: 3, yol: 100, ok: true });
    const yuz = [296, 494, 716].map((x) => yazi(c, svg, x, 270, '100 m', { size: 26, renk: TUR.o }));
    const araba = hareket(c, svg, 'araba', 170, 420, {}), okH = hareket(c, svg, 'atis', 430, 420, {});
    const saksi = hareket(c, svg, 'saksi', 800, 425, { s: 1.45, ok: true }), asan = hareket(c, svg, 'asansor', 250, 425, { s: 1.45, ok: true });
    gizle(yuz, araba.g, okH.g, saksi.g, asan.g);
    await c.say('Birinci grubun adı öteleme hareketidir.');
    await par(c.say('İstasyondan kalkan trenin bütün parçaları, istasyona göre aynı yönde ilerler.'), oynat(c, tren, 4400));
    await c.say('Cismi oluşturan parçaların birlikte ve aynı yönde hareket etmesi ötelemedir.');
    await par(c.say('Ötelemede cismin bütün parçaları eşit yer değiştirme yapar.'), oynat(c, tren, 4000));
    await belir(c, yuz);
    await c.say('Trenin burnu yüz metre ilerlediyse son vagonu da yüz metre ilerlemiştir.');
    await belir(c, [araba.g, okH.g]);
    await par(c.say('Arabanın gövdesi ve okçunun attığı ok da öteleme yapıyordu.'), oynat(c, [araba, okH], 3600));
    await belir(c, saksi.g);
    await par(c.say('Öteleme yalnızca yatay olmaz: balkondan düşen saksı aşağı doğru ötelenir.', { speak: '[thoughtful] Öteleme yalnızca yatay olmaz: balkondan düşen saksı aşağı doğru ötelenir.' }), oynat(c, saksi, 3200));
    await kaybol(c, [araba.g, okH.g]);
    await belir(c, asan.g);
    await c.choice({ tag: 'Uygula', q: 'Asansör kabini zemin kattan beşinci kata çıkıyor. Bu hareket hangi türdür?',
      options: ['Titreşim; asansör bir çıkar, bir iner', 'Öteleme; kabinin bütün parçaları birlikte, aynı yönde hareket ediyor', 'Hiçbiri; öteleme yalnızca ileri doğru olur'], answer: 1,
      hints: ['Asansör bir denge konumunun iki yanına gidip gelmez; bir kattan ötekine gider ve durur. Kabinin her parçası aynı yönde, eşit yer değiştirir.', '', 'Ötelemede yönün ne olduğu önemli değildir. Önemli olan, bütün parçaların birlikte ve aynı yönde hareket etmesidir.'],
      right: 'Evet. Öteleme yukarı doğru da olur.' });
    await par(c.say('Kabinin tabanı da tavanı da aynı yönde, eşit yer değiştirir.'), oynat(c, asan, 3600));
    c.note('<b>Öteleme:</b> bütün parçalar birlikte, aynı yönde hareket eder; yer değiştirmeleri eşittir.<br>Örnek: istasyondan kalkan tren.', 'Öteleme', 'oteleme');
  }

  /* ---- Sahne 5 · Dönme ---- */
  async function donme(c) {
    const svg = c.svg(1000, 562);
    yazi(c, svg, 40, 52, 'dönme', { size: 34, hiza: 'start', renk: TUR.d });
    const fan = hareket(c, svg, 'fan', 250, 295, { s: 2.4 });
    const eksen = c.S('g', {}, svg);
    cizgi(c, eksen, 264, 295, 436, 295, { renk: RENK.vurgu, kalin: 2, kesik: '6 6' }); yazi(c, eksen, 446, 304, 'eksen', { size: 26, hiza: 'start', renk: RENK.vurgu });
    const turbin = hareket(c, svg, 'turbin', 640, 180, { s: 1.1 }), disli = hareket(c, svg, 'disli', 860, 190, { s: 1.1 });
    const dolap = hareket(c, svg, 'dolap', 740, 300, { s: 2.2 }), b = bayrak(c, svg, 904, 472, 40);
    gizle(fan.p.cizgi, eksen, turbin.g, disli.g, dolap.g, b);
    await c.say('İkinci grubun adı dönme hareketidir.');
    await par(c.say('Bilgisayar fanının pervanesi, merkezinden geçen bir milin çevresinde döner.'), oynat(c, fan, 4200));
    await belir(c, fan.p.cizgi);
    await par(c.say('Pervanedeki her nokta, merkeze uzaklığı değişmeden döner.'), oynat(c, fan, 4000));
    await c.say('Cismin sabit bir nokta etrafında çember çizerek yaptığı hareket dönmedir.');
    await par(c.say('Dönmede bütün parçalar, bir eksene uzaklıkları değişmeden hareket eder.'), oynat(c, fan, 4200));
    await belir(c, eksen);
    await c.say('Fanda bu eksen, pervanenin merkezinden geçen mildir.');
    await belir(c, [turbin.g, disli.g]);
    await par(c.say('Rüzgâr türbini ve saatin dişlileri de dönme hareketi yapıyordu.'), oynat(c, [turbin, disli], 3800));
    await kaybol(c, [turbin.g, disli.g, eksen]);
    await belir(c, [dolap.g, b]);
    await oynat(c, dolap, 3600);
    await c.choice({ tag: 'Düşün', q: 'Dönme dolabın kabinleri yere göre yer değiştiriyor. Öyleyse dönme dolap öteleme mi yapıyor?',
      options: ['Evet; yer değiştiren her cisim öteleme yapar', 'Evet; kabinler de tren gibi yol alıyor', 'Hayır; parçaları aynı yönde ilerlemiyor, bir eksenin çevresinde dönüyor'], answer: 2,
      hints: ['Hareket eden her cisim öteleme yapmaz. Ötelemede bütün parçalar aynı yönde ilerler; dönme dolapta kabinler çember çizer.', 'Kabinler yol alır ama aynı yönde değil. Dönen cismin parçaları yer değiştirse de cisim öteleme yapmış olmaz.', ''],
      right: 'Evet. Kabinler çember çiziyor; dolabın ekseni yerinde duruyor.' });
    const ust = ok(c, svg, ...dolap.P(8, -80), ...dolap.P(58, -80), { renk: RENK.yazi, kalin: 5 }), alt = ok(c, svg, ...dolap.P(-8, 70), ...dolap.P(-58, 70), { renk: RENK.yazi, kalin: 5 });
    gizle(alt); await okCiz(c, ust, 500); alt.style.opacity = 1; await okCiz(c, alt, 500);
    await c.say('Üstteki kabin bir yöne giderken alttaki kabin ters yöne gider.');
    await c.say('Parçalar aynı yönde ilerlemediği için bu hareket öteleme değildir.', { speak: '[thoughtful] Parçalar aynı yönde ilerlemediği için bu hareket öteleme değildir.' });
    await kaybol(c, [ust, alt]);
    await par(c.say('Dönme dolabın ekseni yerinden hiç ayrılmaz; dolap sabit bir nokta etrafında döner.'), oynat(c, dolap, 4600));
    c.note('<b>Dönme:</b> parçalar bir eksene uzaklıkları değişmeden çember çizer.<br>Örnek: fanın pervanesi.', 'Dönme', 'donme');
  }

  /* ---- Sahne 6 · Titreşim ---- */
  async function titresim(c) {
    const svg = c.svg(1000, 562);
    yazi(c, svg, 40, 52, 'titreşim', { size: 34, hiza: 'start', renk: TUR.t });
    const gitar = hareket(c, svg, 'gitar', 530, 195, { s: 3.1, n: 5 });
    const denge = c.S('g', {}, svg);
    cizgi(c, denge, 760, 124, 760, 190, { renk: RENK.soluk, kalin: 2 }); yazi(c, denge, 760, 112, 'denge konumu', { size: 24, renk: RENK.soluk });
    const yay = hareket(c, svg, 'yay', 230, 452, { s: 1.25 }), met = hareket(c, svg, 'metronom', 770, 448, { s: 1.3 }), turbin = hareket(c, svg, 'turbin', 500, 452, { s: 1.15 });
    gizle(denge, yay.g, met.g, turbin.g);
    await c.say('Üçüncü grubun adı titreşim hareketidir.');
    await par(c.say('Gitarın gergin teline vurulunca tel, bir denge noktası etrafında gidip gelir.'), oynat(c, gitar, 4600));
    await belir(c, denge);
    await c.say('Telin vurulmadan önceki düz hâli, onun denge konumudur.');
    await par(c.say('Denge konumundan geçerek yapılan gidip gelme hareketine titreşim denir.'), oynat(c, gitar, 4400));
    await c.say('Burada referans noktası olarak denge konumu alınır.');
    await belir(c, yay.g);
    await par(c.say('Yayın ucundaki cisim de denge konumunun altına ve üstüne gidip geliyordu.'), oynat(c, yay, 4400));
    await belir(c, met.g);
    await oynat(c, met, 3600);
    await c.choice({ tag: 'Düşün', q: 'Metronomun kolu alt ucundan sabit ve durmadan hareket ediyor. Kol hangi hareketi yapıyor?',
      options: ['Dönme; bir ucu sabit olan her cisim döner', 'Titreşim; orta konumdan geçerek iki yana gidip geliyor', 'Dönme; kendini tekrar eden her hareket dönmedir'], answer: 1,
      hints: ['Sabit bir nokta olması yetmez. Dönen cisim çember çizer; metronomun kolu çemberi tamamlamadan geri döner.', '', 'Titreşim ile dönme aynı değildir; ikisi de tekrar eder ama biçimleri farklıdır. Kol, denge konumundan geçip geri dönüyor: bu titreşimdir.'],
      right: 'Evet. Kolun ucu çemberi tamamlamıyor; bir yay boyunca gidip geliyor.' });
    await par(c.say('Metronomun kolu tam tur atmaz; orta konumdan geçer ve geri döner.'), oynat(c, met, 4200));
    await belir(c, turbin.g);
    await par(c.say('Dönen cisim çemberi tamamlar; titreşen cisim denge konumundan geçip geri döner.', { speak: 'Dönen cisim çemberi tamamlar; [short pause] titreşen cisim denge konumundan geçip geri döner.' }), oynat(c, [turbin, met], 4800));
    c.note('<b>Titreşim:</b> cisim bir denge konumundan geçerek gidip gelir.<br>Örnek: vurulan gitar teli.', 'Titreşim', 'titresim');
  }

  /* ---- Sahne 7 · On iki hareket, üç tür ----
     Dene sırasında kartlardaki izler tür rengini almaz (mor); doğru kutu seçilince renklenir. */
  const ONIKI = [
    ['tren', 0, 'tren', 'İstasyondan kalkan tren', 'Üç noktanın izi de aynı yönde ve eşit boyda.', 'Evet. Trenin bütün parçaları aynı yönde ilerliyor.'],
    ['fan', 1, 'fan', 'Bilgisayar fanının pervanesi', 'Kanattaki noktalar, milin çevresinde çember çiziyor.', 'Evet. Pervane mili çevresinde dönüyor.'],
    ['gitar', 2, 'gitar teli', 'Gitar teli', 'Tel, kesikli çizginin iki yanına gidip geliyor.', 'Evet. Tel denge konumundan geçerek gidip geliyor.'],
    ['saksi', 0, 'saksı', 'Balkondan düşen saksı', 'Saksının üstü de altı da aşağı doğru, eşit iz bırakıyor.', 'Evet. Öteleme aşağı doğru da olur.'],
    ['saat', 1, 'saat', 'Saatin akrebi ile yelkovanı', 'İkisinin ucu da kadranın merkezi çevresinde dolanıyor.', 'Evet. Akrep ile yelkovan merkezin çevresinde dönüyor.'],
    ['catal', 2, 'ses çatalı', 'Vurulan ses çatalı', 'Çatalın uçları kesikli çizginin iki yanına çok kısa gidip geliyor.', 'Evet. Uçlar durma konumunun iki yanına gidip geliyor.'],
    ['masa', 0, 'masa', 'Duvar kenarına itilen masa', 'Dört ayağın izi de aynı yönde ve eşit boyda.', 'Evet. Masanın bütün parçaları birlikte ilerliyor.'],
    ['helikopter', 1, 'helikopter', 'Yerde duran helikopterin pervanesi', 'Gövde yerinde duruyor; kanat ucu milin çevresinde dolanıyor.', 'Evet. Pervane mili çevresinde dönüyor.'],
    ['dalga', 2, 'su dalgası', 'Su yüzeyindeki dalgalar', 'Yüzeydeki nokta bir yere gitmiyor; aşağı yukarı gidip geliyor.', 'Evet. Su yüzeyi denge çizgisinin altına ve üstüne gidip geliyor.'],
    ['patenci', 0, 'patenci', 'Buz pistinde düz ilerleyen patenci', 'Baş da paten de aynı yönde, eşit iz bırakıyor.', 'Evet. Patencinin bütün parçaları aynı yönde ilerliyor.'],
    ['dolap', 1, 'dönme dolap', 'Dönme dolap', ['Kabinler yer değiştirir ama aynı yönde ilerlemez; dolabın ekseni yerinde durur.', '', 'Kabinler geri dönmüyor; çemberi tamamlıyor.'], 'Evet. Kabinler yer değiştirir ama dolap ötelenmez; ekseni çevresinde döner.'],
    ['salincak', 2, 'salıncak', 'Salıncakta sallanan çocuk', ['Çocuk bir yere gitmiyor; aynı yay üzerinde gidip geliyor.', 'Salıncak bir yay çizer ama çemberi tamamlamaz; denge konumundan geçip geri döner.', ''], 'Evet. Salıncak denge konumundan geçip geri döner.'],
  ];
  async function onIki(c) {
    const svg = c.svg(1000, 562), alan = c.S('g', {}, svg), ADLAR = ['Öteleme', 'Dönme', 'Titreşim'], S = 0.55;
    const kt = kutular(c, alan, ['öteleme', 'dönme', 'titreşim'], { y: 250, h: 298, renkler: [TUR.o, TUR.d, TUR.t], baslikBoy: 28 });
    const kutuda = [[], [], []], cerceveler = [...kt.g.querySelectorAll('rect')];
    const kartlariKoy = (grup) => grup.map(([ad, , etiket], i) => {
      const x = 140 + i * 240, g = c.S('g', {}, alan), cer = kutu(c, g, x - 112, 28, 224, 168, { renk: RENK.ince, fill: 'none', kalin: 2 });
      const h = hareket(c, g, ad, x, 112, { s: 0.92, t: 1, notr: true }), et = yazi(c, g, x, 224, etiket, { size: 22, renk: RENK.soluk });
      g.style.opacity = 0;
      return { g, cer, h, et };
    });
    const sor = async (grup, kartlar) => {
      for (let i = 0; i < grup.length; i++) {
        const [, kutuNo, , ad, ipucu, neden] = grup[i], k = kartlar[i];
        k.cer.setAttribute('stroke', RENK.vurgu);
        await oynat(c, k.h, 2000);
        await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> hangi tür hareket yapıyor?`, options: ADLAR, answer: kutuNo,
          hints: ADLAR.map((_, j) => (Array.isArray(ipucu) ? ipucu[j] : ipucu)), right: neden });
        k.h.renk(false); k.cer.remove(); k.et.remove();
        const n = kutuda[kutuNo].push(k.h) - 1;
        await ucus(c, k.h, kt.x + kutuNo * (kt.w + kt.bosluk) + kt.w * (0.27 + 0.46 * (n % 2)), 364 + Math.floor(n / 2) * 112, S, 450);
      }
    };
    let kartlar = kartlariKoy(ONIKI.slice(0, 4));
    await belir(c, kartlar.map((k) => k.g));
    await c.say('Üç türü ve niteliklerini tanıdın; şimdi on iki hareketi ayır.');
    await c.say('Her harekette sor: parçalar ilerliyor mu, dönüyor mu, gidip geliyor mu?', { speak: '[curious] Her harekette sor: parçalar ilerliyor mu, dönüyor mu, gidip geliyor mu?' });
    await c.say('Hareketin türü referans noktasına göre belirlenir; neye göre baktığını unutma.');
    await par(c.say('Tren istasyona göre ötelenir; tel, denge konumuna göre titreşir.'), oynat(c, [kartlar[0].h, kartlar[2].h], 4200));
    await c.say('Her hareketi türünün kutusuna koy.', { noWait: true });
    await sor(ONIKI.slice(0, 4), kartlar);
    for (const bas of [4, 8]) {
      kartlar = kartlariKoy(ONIKI.slice(bas, bas + 4));
      await belir(c, kartlar.map((k) => k.g));
      await sor(ONIKI.slice(bas, bas + 4), kartlar);
    }
    await par(c.say('Yer değiştirmek tek başına türü söylemez; parçaların nasıl hareket ettiğine bakarız.'), oynat(c, kutuda.flat(), 4600));
    const NIT = ['Cismin bütün parçaları eşit yer değiştirme yapar.', 'Bütün parçalar bir eksene uzaklıkları değişmeden hareket eder.', 'Cisim bir denge konumundan geçerek gidip gelir.'];
    const YANLIS = ['Eşit yer değiştirme ötelemenin niteliğidir.', 'Eksene uzaklığın değişmemesi dönmenin niteliğidir.', 'Denge konumundan geçip gidip gelmek titreşimin niteliğidir.'];
    const DOGRU = ['Evet. Ötelemede bütün parçalar eşit yer değiştirir.', 'Evet. Dönmede parçaların eksene uzaklığı değişmez.', 'Evet. “Tekrar eder” demek yetmez; dönme de tekrar eder.'];
    const KISA = [['bütün parçalar', 'eşit yer değiştirir'], ['eksene uzaklık', 'değişmez'], ['denge konumundan', 'geçip geri döner']];
    await c.tween(700, (e) => git(alan, 0, -60 * e));
    await c.say('Şimdi her türü, onu ayırt eden nitelikle eşleştir.', { noWait: true });
    for (const [k, dizi] of [[0, [1, 0, 2]], [1, [2, 1, 0]], [2, [0, 2, 1]]]) {
      cerceveler.forEach((r, i) => r.setAttribute('stroke-width', i === k ? 7 : 3));
      await oynat(c, kutuda[k], 2200);
      await c.choice({ tag: 'Sıra sende', q: `<b>${ADLAR[k]}</b> hareketini ayırt eden nitelik hangisidir?`, options: dizi.map((i) => NIT[i]), answer: dizi.indexOf(k),
        hints: dizi.map((i) => (i === k ? '' : YANLIS[i])), right: DOGRU[k] });
      await belir(c, KISA[k].map((m, j) => yazi(c, alan, kt.x + k * (kt.w + kt.bosluk) + kt.w / 2, 196 + j * 30, m, { size: 24, renk: [TUR.o, TUR.d, TUR.t][k] })));
    }
    cerceveler.forEach((r) => r.setAttribute('stroke-width', 3));
    await c.say('Hareketler üç türde toplanır: öteleme, dönme ve titreşim.');
    await par(c.say('Ötelenen ilerler, dönen bir eksen çevresinde döner, titreşen gidip gelir.'), oynat(c, kutuda.flat(), 5000));
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-f1', kicker: 'Konu F · Hareket türleri', title: 'Öteleme, dönme, titreşim', accent: '#c792ff', back: 'index.html',
    intro: { title: 'Öteleme, dönme, titreşim', hook: 'Asansör, dönme dolap ve gitar teli: üçü de hareket ediyor, ama aynı biçimde mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Üç hareket, tek soru', goal: 'Üç hareketin biçimini karşılaştır.', run: ucHareket },
      { title: 'Altı hareketi izle', goal: 'Her harekette parçaların nasıl hareket ettiğine bak.', run: altiHareket },
      { title: 'Ayır ve grupla', goal: 'Niteliği aynı olan hareketleri aynı kutuya koy.', run: ayir },
      { title: 'Öteleme', goal: 'Ötelemeyi ayırt eden niteliği öğren.', run: oteleme },
      { title: 'Dönme', goal: 'Dönmeyi ayırt eden niteliği öğren.', run: donme },
      { title: 'Titreşim', goal: 'Titreşimi ayırt eden niteliği öğren.', run: titresim },
      { title: 'On iki hareket, üç tür', goal: 'On iki hareketi üç türe ayır.', run: onIki },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Salıncakta sallanan çocuk yay biçiminde bir yol çiziyor. Bu hangi hareket türüdür?',
        options: ['Dönme; çemberin bir parçasını çiziyor', 'Öteleme; bir yerden başka bir yere gidiyor', 'Titreşim; denge konumundan geçerek gidip geliyor'], answer: 2,
        why: ['Salıncak çemberi tamamlamaz; denge konumundan geçip geri döner.', 'Çocuk bir yere gitmiyor; aynı yay üzerinde gidip geliyor.', 'Salıncak en alt konumdan geçerek öne ve arkaya gidip gelir: bu titreşimdir.'], scene: 5 },
      { q: 'Dönme de titreşim de tekrar eden hareketlerdir. İkisini ayıran nitelik hangisidir?',
        options: ['Dönen cisim çember çizer; titreşen cisim denge konumundan geçip geri döner', 'Dönme hızlı, titreşim yavaş bir harekettir', 'Dönen cisim yer değiştirir, titreşen cisim hiç yer değiştirmez'], answer: 0,
        why: ['Dönen cisim çemberi tamamlar; titreşen cisim denge konumundan geçip geri döner.', 'Hızlı ya da yavaş olmak hareketin türünü belirlemez.', 'İki harekette de parçalar yer değiştirir; ayıran, hareketin biçimidir.'], scene: 5 },
    ],
    summary: ['<b>Ötelenen ilerler, dönen bir eksen çevresinde döner, titreşen gidip gelir.</b>', 'Hareketin türü referans noktasına göre belirlenir.', 'Yer değiştirmek tek başına türü söylemez; parçaların nasıl hareket ettiğine bakılır.'],
    nextLesson: { href: 'f2-birden-fazla-hareket.html', label: 'Sonraki: Aynı anda birden fazla hareket ›' },
  });
})();
