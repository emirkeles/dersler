/* Geometrik Şekiller temasının ortak çizim araçları (window.KIT). Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Renkler tema boyunca aynı kalır: A köşesi mavi, B turuncu, C yeşil; dış açı sarı; paralel doğru mor.
   Bir açı ile karşısındaki kenar aynı renktedir. Noktalar [x, y] dizisidir.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan. */
window.KIT = (() => {
  'use strict';
  const RENK = {
    A: 'var(--c1)', B: 'var(--c2)', C: 'var(--c3)', dis: 'var(--c5)', paralel: 'var(--c4)',
    cizgi: '#c3cbea', ince: '#5b678f', soluk: 'var(--muted)', yazi: 'var(--text)',
    iyi: 'var(--good)', kotu: 'var(--bad)', yuzey: '#18213f', kenarlik: '#33437f',
  };
  const KOSE = [RENK.A, RENK.B, RENK.C];

  /* ---- geometri ---- */
  const rad = (d) => (d * Math.PI) / 180, der = (r) => (r * 180) / Math.PI;
  const uz = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const yon = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]);
  const ileri = (P, a, d) => [P[0] + d * Math.cos(a), P[1] + d * Math.sin(a)];
  const ara = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const kisa = (d) => { while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  /* V köşesindeki açı (derece); kollar P ve Q'ya gider. */
  const aci = (V, P, Q) => Math.abs(der(kisa(yon(V, Q) - yon(V, P))));
  /* Üç iç açının tam sayı ölçüleri; toplamları 180 eder. */
  const acilar = (A, B, C) => { const a = Math.round(aci(A, B, C)), b = Math.round(aci(B, A, C)); return [a, b, 180 - a - b]; };
  /* V köşesinin açıortay yönü (içe doğru). */
  const orta = (V, P, Q) => { const a = yon(V, P); return a + kisa(yon(V, Q) - a) / 2; };

  /* ---- temel çizim ---- */
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || RENK.yazi), [o.math ? 'math' : 'text']: metin,
  }, p);
  /* Parçaları ayrı renkte tek satır yazı: parcalar = ['düz', ['renkli', renk], …]. */
  const parcaKoy = (c, t, parcalar) => {
    t.textContent = '';
    parcalar.forEach((q) => { const [m, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m }, t); if (r) ts.style.fill = r; });
  };
  const renkli = (c, p, x, y, parcalar, o = {}) => { const t = yazi(c, p, x, y, '', o); parcaKoy(c, t, parcalar); return t; };
  const cizgi = (c, p, P, Q, renk = RENK.cizgi, w = 3, o = {}) => c.S('line', Object.assign({
    x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: renk, 'stroke-width': w, 'stroke-linecap': 'round',
  }, o), p);
  const koy = (el, P, Q) => { el.setAttribute('x1', P[0]); el.setAttribute('y1', P[1]); el.setAttribute('x2', Q[0]); el.setAttribute('y2', Q[1]); };
  const nokta = (c, p, P, renk = RENK.yazi, r = 6) => c.S('circle', { cx: P[0], cy: P[1], r, fill: renk }, p);
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', {
    x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx, fill: o.dolgu || RENK.yuzey, stroke: o.renk || RENK.kenarlik, 'stroke-width': o.w || 2,
  }, p);
  const gizle = (...els) => els.flat().forEach((e) => { e.style.opacity = 0; });
  /* Öğeyi (ya da öğeleri) şimdiki saydamlığından hedefe götürür. Zamanlama her zaman c.tween ile kurulur. */
  const belir = (c, el, ms = 350, hedef = 1) => {
    const es = liste(el), bas = es.map((e) => (e.style.opacity === '' ? (hedef > 0 ? 0 : 1) : +e.style.opacity));
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = bas[i] + (hedef - bas[i]) * e; }));
  };
  const par = (...ps) => Promise.all(ps);

  /* ---- açı dilimi ---- */
  /* V merkezli, a0 yönünden başlayıp d radyan dönen dilim (d her büyüklükte olabilir). */
  function dilimYolu(V, a0, d, r) {
    if (Math.abs(d) >= 2 * Math.PI - 1e-3) return `M${V[0] - r},${V[1]} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0 Z`;
    const p0 = ileri(V, a0, r), p1 = ileri(V, a0 + d, r);
    return `M${V[0]},${V[1]} L${p0[0]},${p0[1]} A${r},${r} 0 ${Math.abs(d) > Math.PI ? 1 : 0} ${d > 0 ? 1 : 0} ${p1[0]},${p1[1]} Z`;
  }
  /* V köşesinde, P ve Q kolları arasındaki (180°'den küçük) açının dilimi. */
  function dilim(c, p, V, P, Q, renk, r = 42, o = {}) {
    const el = c.S('path', { fill: renk, 'fill-opacity': o.dolgu == null ? 0.55 : o.dolgu, stroke: renk, 'stroke-width': 2, 'stroke-linejoin': 'round' }, p);
    const ciz = (V2, P2, Q2, r2 = r) => { const a = yon(V2, P2); el.setAttribute('d', dilimYolu(V2, a, kisa(yon(V2, Q2) - a), r2)); };
    ciz(V, P, Q);
    return { el, ciz, yon: (a0, d, V2 = V, r2 = r) => el.setAttribute('d', dilimYolu(V2, a0, d, r2)) };
  }

  /* ---- üçgen ---- */
  /* o: { r: dilim yarıçapı, dilim: false ise açı dilimi çizilmez, harf: köşe harfleri (['A','B','C'] ya da false),
          olcu: 'derece' | ['α','β','γ'] | false, renkler: [üç renk], dolgu }
     Dönen nesnenin koy(A, B, C) yöntemi her şeyi yeni köşelere göre yeniden çizer. */
  function ucgen(c, p, A, B, C, o = {}) {
    const r = o.r || 42, renkler = o.renkler || KOSE, g = c.S('g', {}, p);
    const poly = c.S('polygon', { fill: o.dolgu || 'rgba(110,168,255,.07)', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const dilimler = o.dilim === false ? [] : [0, 1, 2].map((i) => dilim(c, g, A, B, C, renkler[i], r));
    const olculer = o.olcu ? [0, 1, 2].map((i) => yazi(c, g, 0, 0, '', { size: o.olcuSize || 22, kalin: 700, renk: renkler[i] })) : [];
    const harfler = o.harf === false ? [] : [0, 1, 2].map((i) => yazi(c, g, 0, 0, (o.harf || ['A', 'B', 'C'])[i], { size: 24, kalin: 700 }));
    let K = [A, B, C], D = [60, 60, 60];
    function koyHepsi(A2, B2, C2) {
      K = [A2, B2, C2]; D = acilar(A2, B2, C2);
      poly.setAttribute('points', K.map((P) => P.join(',')).join(' '));
      K.forEach((V, i) => {
        const P = K[(i + 1) % 3], Q = K[(i + 2) % 3], m = orta(V, P, Q);
        if (dilimler[i]) dilimler[i].ciz(V, P, Q);
        if (olculer[i]) {
          const yer = ileri(V, m, r + (D[i] < 22 ? 84 : D[i] < 30 ? 64 : D[i] < 45 ? 30 : 22));
          olculer[i].setAttribute('x', yer[0]); olculer[i].setAttribute('y', yer[1] + 8);
          olculer[i].textContent = o.olcu === 'derece' ? D[i] + '°' : o.olcu[i];
        }
        if (harfler[i]) { const yer = ileri(V, m + Math.PI, 24); harfler[i].setAttribute('x', yer[0]); harfler[i].setAttribute('y', yer[1] + 9); }
      });
    }
    koyHepsi(A, B, C);
    return { g, poly, dilimler, olculer, harfler, koy: koyHepsi, K: () => K, D: () => D };
  }

  /* Üçgenin kenarları, her biri karşısındaki köşenin renginde (BC mavi, AC turuncu, AB yeşil).
     yaz([a, b, c]) kenar ortalarının dışına etiket koyar; kalin(i, w) bir kenarı kalınlaştırır. */
  function kenarlar(c, p, A, B, C, o = {}) {
    const g = c.S('g', {}, p), w = o.w || 5;
    const hat = [0, 1, 2].map((i) => cizgi(c, g, A, A, KOSE[i], w));
    const et = [0, 1, 2].map((i) => yazi(c, g, 0, 0, '', { size: o.size || 24, kalin: 700, renk: KOSE[i] }));
    function koyHepsi(A2, B2, C2) {
      const K = [A2, B2, C2];
      K.forEach((V, i) => {
        const P = K[(i + 1) % 3], Q = K[(i + 2) % 3], m = ara(P, Q, 0.5), n = yon(P, Q) + Math.PI / 2;
        const y = ileri(m, Math.cos(n - yon(V, m)) > 0 ? n : n + Math.PI, o.uzak || 28);   // kenara dik, karşı köşeden uzağa
        koy(hat[i], P, Q); et[i].setAttribute('x', y[0]); et[i].setAttribute('y', y[1] + 8);
      });
    }
    koyHepsi(A, B, C);
    return { g, hat, et, koy: koyHepsi, yaz: (m) => et.forEach((t, i) => { t.textContent = m[i]; }), kalin: (i, w2) => hat[i].setAttribute('stroke-width', w2) };
  }

  /* V köşesindeki dış açı: (onceki → V) kenarının V'den öteye uzantısı ile (V → sonraki) kenarı arasındaki açı.
     Uzantı kesikli çizgidir; yaz(metin) dilimin yanına ölçü yazar. */
  function disAci(c, p, V, onceki, sonraki, o = {}) {
    const g = c.S('g', {}, p), r = o.r || 42, L = o.uzun || 110;
    const hat = cizgi(c, g, V, V, RENK.cizgi, 2, { 'stroke-dasharray': '7 7' });
    const d = dilim(c, g, V, V, V, RENK.dis, r);
    const t = yazi(c, g, 0, 0, '', { size: o.size || 22, kalin: 700, renk: RENK.dis });
    function ciz(V2, P, Q) {
      const u = ileri(V2, yon(P, V2), L), y = ileri(V2, orta(V2, u, Q), r + 26);
      koy(hat, V2, u); d.ciz(V2, u, Q); t.setAttribute('x', y[0]); t.setAttribute('y', y[1] + 8);
    }
    ciz(V, onceki, sonraki);
    return { g, uzanti: hat, dilim: d, yazi: t, ciz, yaz: (m) => { t.textContent = m; } };
  }

  /* ---- iç açılar ispatının düzeneği: üçgen + A'dan geçen paralel d + B ve C'deki açıların A'daki eşleri ----
     koy(A) hepsini yeni tepeye taşır. o: { olcu, harf, x1: d doğrusunun sağ ucu, r } */
  function paralelDuzen(c, svg, A, B, C, o = {}) {
    const dg = c.S('g', {}, svg), x1 = o.x1 || 960, R = o.r || 44;
    const d = cizgi(c, dg, [40, A[1]], [x1, A[1]], RENK.paralel, 3);
    const dAd = yazi(c, dg, x1 - 8, A[1] - 14, 'd', { hiza: 'end', size: 24, kalin: 700, renk: RENK.paralel });
    const u = ucgen(c, svg, A, B, C, { r: R, olcu: o.olcu || ['α', 'β', 'γ'], harf: o.harf });
    const bK = dilim(c, svg, A, [A[0] - 100, A[1]], B, RENK.B, R), gK = dilim(c, svg, A, [A[0] + 100, A[1]], C, RENK.C, R);
    const bAd = yazi(c, svg, 0, 0, 'β', { size: 22, kalin: 700, renk: RENK.B }), gAd = yazi(c, svg, 0, 0, 'γ', { size: 22, kalin: 700, renk: RENK.C });
    const adYeri = (t, V, P, Q) => { const y = ileri(V, orta(V, P, Q), R + 22); t.setAttribute('x', y[0]); t.setAttribute('y', y[1] + 8); };
    function koyHepsi(P) {
      const sol = [P[0] - 100, P[1]], sag = [P[0] + 100, P[1]];
      koy(d, [40, P[1]], [x1, P[1]]); dAd.setAttribute('y', P[1] - 14);
      u.koy(P, B, C); bK.ciz(P, sol, B); gK.ciz(P, sag, C);
      adYeri(bAd, P, sol, B); adYeri(gAd, P, sag, C);
    }
    koyHepsi(A);
    return { dg, u, bK, gK, bAd, gAd, koy: koyHepsi };
  }
  /* V köşesindeki dilimi (komsu ve obur kolları arasında), 180° döndürerek A'ya taşır: iç ters açı. */
  const aciTasi = (c, k, V, komsu, obur, A, r = 44, ms = 1100) => {
    const a0 = yon(V, komsu), d = kisa(yon(V, obur) - a0);
    return c.tween(ms, (e) => k.yon(a0 + Math.PI * e, d, ara(V, A, e), r), Ders.ease.inOut);
  };

  /* ---- çubuk düzeneği (üçgen eşitsizliği) ---- */
  const BAS = rad(85);   // çubukların açık (dik duran) hâli
  /* Taban çubuğu (a) ve uçlarına menteşeli iki çubuk (b solda, cc sağda). Taban her zaman en uzun çubuktur.
     kapat(c) çubukları içe döndürür: uçlar buluşursa üçgen kapanır, buluşmazsa çubuklar tabana yatar. */
  function cubuklar(c, p, a, b, cc, o = {}) {
    const u = o.u || Math.min(50, 400 / a, 290 / Math.max(b, cc)), cx = o.cx || 500, y = o.y || 430;
    const P = [cx - (a * u) / 2, y], Q = [cx + (a * u) / 2, y], g = c.S('g', {}, p);
    const dolgu = c.S('polygon', { fill: 'rgba(110,168,255,.12)' }, g);
    cizgi(c, g, P, Q, RENK.ince, 14);
    const sol = cizgi(c, g, P, P, RENK.B, 8), sag = cizgi(c, g, Q, Q, RENK.C, 8);
    nokta(c, g, P, RENK.yazi, 7); nokta(c, g, Q, RENK.yazi, 7);
    const ucS = nokta(c, g, P, RENK.B, 7), ucG = nokta(c, g, Q, RENK.C, 7);
    yazi(c, g, cx, y + 46, a + ' m', { size: 24, kalin: 700 });
    const tS = yazi(c, g, 0, 0, b + ' m', { size: 24, kalin: 700, renk: RENK.B }), tG = yazi(c, g, 0, 0, cc + ' m', { size: 24, kalin: 700, renk: RENK.C });
    const yerles = (el, q) => { el.setAttribute('x', q[0]); el.setAttribute('y', q[1] + 8); };
    function koyAci(t1, t2, kapali) {
      const L = [P[0] + b * u * Math.cos(t1), y - b * u * Math.sin(t1)], Rt = [Q[0] - cc * u * Math.cos(t2), y - cc * u * Math.sin(t2)];
      koy(sol, P, L); koy(sag, Q, Rt);
      ucS.setAttribute('cx', L[0]); ucS.setAttribute('cy', L[1]); ucG.setAttribute('cx', Rt[0]); ucG.setAttribute('cy', Rt[1]);
      yerles(tS, ileri(ara(P, L, 0.5), -t1 - Math.PI / 2, 36)); yerles(tG, ileri(ara(Q, Rt, 0.5), t2 - Math.PI / 2, 36));
      dolgu.setAttribute('points', kapali ? [P, Q, L].map((q) => q.join(',')).join(' ') : '');
      return { L, Rt };
    }
    const hedef = () => (b + cc > a + 1e-9
      ? { t1: Math.acos((a * a + b * b - cc * cc) / (2 * a * b)), t2: Math.acos((a * a + cc * cc - b * b) / (2 * a * cc)), durum: 'var' }
      : { t1: 0, t2: 0, durum: Math.abs(b + cc - a) < 1e-9 ? 'duz' : 'yok' });
    return {
      g, P, Q, u,
      ac: () => koyAci(BAS, BAS, false),
      sonuc: () => { const h = hedef(); return Object.assign(koyAci(h.t1, h.t2, h.durum === 'var'), h); },
      kapat: async (ms = 1600) => {
        const h = hedef();
        await c.tween(ms, (e) => koyAci(BAS + (h.t1 - BAS) * e, BAS + (h.t2 - BAS) * e, false), Ders.ease.inOut);
        return Object.assign(koyAci(h.t1, h.t2, h.durum === 'var'), h);
      },
      boy: (b2, c2) => { b = b2; cc = c2; tS.textContent = b + ' m'; tG.textContent = cc + ' m'; },
    };
  }
  /* ---- soru kartı: tahtanın ortasında, satır satır yazılı tek kart. Dönen işlev yeni kartı gösterir. ---- */
  function soruKarti(c, svg) {
    let kart = null;
    return async (satirlar) => {
      if (kart) { await belir(c, kart, 250, 0); kart.remove(); }
      kart = c.S('g', {}, svg);
      kutu(c, kart, 110, 130, 780, 300);
      const y0 = 290 - (satirlar.length - 1) * 26;
      satirlar.forEach((m, i) => yazi(c, kart, 500, y0 + i * 52, m, { size: 30, kalin: 600 }));
      gizle(kart); await belir(c, kart, 350);
    };
  }

  /* ---- ok, işaret ---- */
  function ok(c, p, P, Q, renk = RENK.yazi, w = 3) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P2, Q2) => {
      const a = yon(P2, Q2), u = ileri(Q2, a, 2), s1 = ileri(Q2, a + 2.6, 14), s2 = ileri(Q2, a - 2.6, 14);
      koy(hat, P2, ileri(Q2, a, -8)); uc.setAttribute('d', `M${u[0]},${u[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    ciz(P, Q);
    return { g, ciz };
  }
  /* Halka içinde onay ('ok') ya da çarpı ('no'). */
  function isaret(c, p, x, y, tur, r = 14) {
    const g = c.S('g', {}, p), renk = tur === 'ok' ? RENK.iyi : RENK.kotu;
    c.S('circle', { cx: x, cy: y, r, fill: '#10162b', stroke: renk, 'stroke-width': 3 }, g);
    c.S('path', {
      d: tur === 'ok' ? `M${x - 6},${y} l4,5 l8,-10` : `M${x - 5},${y - 5} l10,10 M${x + 5},${y - 5} l-10,10`,
      fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }, g);
    return g;
  }

  /* ---- ispat adımları: ifade + altında kısa gerekçe ---- */
  function adimlar(c, p, x, y, o = {}) {
    const aralik = o.aralik || 78, g = c.S('g', {}, p), satirlar = [];
    return {
      g, satirlar,
      ekle(ifade, gerekce) {
        const yy = y + satirlar.length * aralik, sg = c.S('g', {}, g);
        const it = yazi(c, sg, x, yy, ifade, { hiza: 'start', size: o.size || 28, kalin: 700 });
        const gt = yazi(c, sg, x, yy + 28, gerekce || '', { hiza: 'start', size: 20, kalin: 500, renk: RENK.soluk });
        gizle(sg);
        const s = { g: sg, ifade: it, gerekce: (t, renk) => { gt.textContent = t; if (renk) gt.style.fill = renk; } };
        satirlar.push(s); return s;
      },
    };
  }

  /* Cevabı hemen söylenmeyen tahmin: hangi şık seçilirse seçilsin sürer; seçilen şıkkın sırasını döndürür. */
  function tahminAl(c, o) {
    return new Promise((res) => {
      const opts = c.h('div', { class: 'opts' });
      const panel = c.panel(null, c.h('span', { class: 'tag' }, o.tag || 'Tahmin et'), c.h('p', { class: 'q', html: o.q }), opts);
      o.options.forEach((txt, i) => {
        const b = c.h('button', { class: 'opt', html: txt });
        b.addEventListener('click', () => { panel.remove(); res(i); });
        opts.appendChild(b);
      });
    });
  }

  /* ---- tepe köşesini gezdirme: iki kaydırıcı + tahtada sürükleme ----
     o: { x: [min, max], y: [min, max], bas: [x, y], ciz: (P) => …, adim } */
  function tepeKontrol(c, svg, o) {
    const P = o.bas.slice(), adim = o.adim || 5;
    const tut = c.S('circle', { cx: P[0], cy: P[1], r: 18, fill: '#fff', 'fill-opacity': 0.08, stroke: RENK.yazi, 'stroke-width': 2, 'stroke-dasharray': '4 5' }, svg);
    tut.style.cursor = 'grab'; tut.style.touchAction = 'none';
    const uygula = () => { tut.setAttribute('cx', P[0]); tut.setAttribute('cy', P[1]); o.ciz(P); };
    const sx = c.slider({ tag: o.tag || 'Dene', label: 'Tepe köşesi: sola, sağa', min: o.x[0], max: o.x[1], step: adim, value: P[0], fmt: () => '', onInput: (v) => { P[0] = v; uygula(); } });
    const sy = c.slider({ tag: false, label: 'Tepe köşesi: aşağı, yukarı', min: 0, max: o.y[1] - o.y[0], step: adim, value: o.y[1] - P[1], fmt: () => '', onInput: (v) => { P[1] = o.y[1] - v; uygula(); } });
    let aktif = false;
    const yer = (e) => {
      const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal, k = Math.min(r.width / vb.width, r.height / vb.height);
      return [(e.clientX - r.left - (r.width - vb.width * k) / 2) / k, (e.clientY - r.top - (r.height - vb.height * k) / 2) / k];
    };
    c.on(tut, 'pointerdown', (e) => { aktif = true; tut.setPointerCapture(e.pointerId); e.preventDefault(); });
    c.on(tut, 'pointermove', (e) => {
      if (!aktif) return;
      const q = yer(e);
      P[0] = c.clamp(q[0], o.x[0], o.x[1]); P[1] = c.clamp(q[1], o.y[0], o.y[1]);
      sx.input.value = P[0]; sy.input.value = o.y[1] - P[1]; uygula();
    });
    c.on(tut, 'pointerup', () => { aktif = false; });
    c.on(tut, 'pointercancel', () => { aktif = false; });
    return { P: () => P, kaldir: () => { sx.remove(); sy.remove(); tut.remove(); } };
  }

  return {
    RENK, KOSE, rad, der, uz, yon, ileri, ara, kisa, aci, acilar, orta,
    yazi, renkli, parcaKoy, cizgi, koy, nokta, kutu, gizle, belir, par, dilimYolu, dilim, ucgen, kenarlar, disAci, ok, isaret, adimlar, tahminAl, tepeKontrol, paralelDuzen, aciTasi, cubuklar, soruKarti,
  };
})();
