/* Eşlik ve Benzerlik temasının ortak çizim araçları (window.KIT). Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Renkler tema boyunca aynı kalır: şekil mavi, görüntüsü turuncu, yansıma doğrusu mor, dönme merkezi ve açısı sarı,
   öteleme oku yeşil. Noktalar [x, y] dizisidir; zemin(…).P(sütun, satır) birim kareli zeminden tahtaya çevirir.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan. */
window.KIT = (() => {
  'use strict';
  const RENK = {
    sekil: 'var(--c1)', goruntu: 'var(--c2)', dogru: 'var(--c4)', merkez: 'var(--c5)', ok: 'var(--c3)',
    cizgi: '#c3cbea', kare: '#27325c', soluk: 'var(--muted)', yazi: 'var(--text)',
    iyi: 'var(--good)', kotu: 'var(--bad)', yuzey: '#18213f', kenarlik: '#33437f',
  };

  /* ---- geometri ---- */
  const rad = (d) => (d * Math.PI) / 180;
  const uz = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const yon = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]);
  const ileri = (P, a, d) => [P[0] + d * Math.cos(a), P[1] + d * Math.sin(a)];
  const ara = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const araHepsi = (Ps, Qs, t) => Ps.map((P, i) => ara(P, Qs[i], t));
  const agirlik = (Ps) => [Ps.reduce((s, P) => s + P[0], 0) / Ps.length, Ps.reduce((s, P) => s + P[1], 0) / Ps.length];
  /* Üçgenin iç teğet çember merkezi; öteki çokgenlerde köşelerin ortalaması. */
  const icMerkez = (Ps) => {
    if (Ps.length !== 3) return agirlik(Ps);
    const [A, B, C] = Ps, a = uz(B, C), b = uz(A, C), cc = uz(A, B), t = a + b + cc;
    return [(a * A[0] + b * B[0] + cc * C[0]) / t, (a * A[1] + b * B[1] + cc * C[1]) / t];
  };
  /* Ekranda saat yönünde dizilmişse true (y aşağı doğru büyüdüğü için işaretli alan artıdır). */
  const saatYonunde = (Ps) => Ps.reduce((s, P, i) => { const Q = Ps[(i + 1) % Ps.length]; return s + P[0] * Q[1] - Q[0] * P[1]; }, 0) > 0;
  /* Dönüşümler: P noktasının U–V doğrusuna göre yansıması, v kadar ötelenmesi, O çevresinde saat yönünde d derece dönmesi. */
  const yansit = (P, U, V) => {
    const dx = V[0] - U[0], dy = V[1] - U[1], t = ((P[0] - U[0]) * dx + (P[1] - U[1]) * dy) / (dx * dx + dy * dy);
    return [2 * (U[0] + t * dx) - P[0], 2 * (U[1] + t * dy) - P[1]];
  };
  const otele = (P, v) => [P[0] + v[0], P[1] + v[1]];
  const dondur = (P, O, d) => { const a = rad(d), x = P[0] - O[0], y = P[1] - O[1]; return [O[0] + x * Math.cos(a) - y * Math.sin(a), O[1] + x * Math.sin(a) + y * Math.cos(a)]; };

  /* ---- çizim ---- */
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || RENK.yazi), text: metin,
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
  const gizle = (...els) => els.flat().forEach((e) => { e.style.opacity = 0; });
  /* Öğeyi (ya da öğeleri) şimdiki saydamlığından hedefe götürür. Zamanlama her zaman c.tween ile kurulur. */
  const belir = (c, el, ms = 350, hedef = 1) => {
    const es = liste(el), bas = es.map((e) => (e.style.opacity === '' ? (hedef > 0 ? 0 : 1) : +e.style.opacity));
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = bas[i] + (hedef - bas[i]) * e; }));
  };
  const par = (...ps) => Promise.all(ps);
  /* Soru işaretli yazıyı cevabıyla değiştirir (yeşil). */
  const cevapla = (t, metin) => { t.textContent = metin; t.style.fill = RENK.iyi; };

  /* Birim kareli zemin. P(sütun, satır) tahtadaki noktayı, N(liste) bir köşe listesini verir. */
  function zemin(c, p, o = {}) {
    const x0 = o.x0 == null ? 30 : o.x0, y0 = o.y0 == null ? 62 : o.y0, b = o.b || 40, sutun = o.sutun || 16, satir = o.satir || 11;
    const g = c.S('g', {}, p);
    for (let i = 0; i <= sutun; i++) c.S('line', { x1: x0 + i * b, y1: y0, x2: x0 + i * b, y2: y0 + satir * b, stroke: RENK.kare, 'stroke-width': 1.5 }, g);
    for (let j = 0; j <= satir; j++) c.S('line', { x1: x0, y1: y0 + j * b, x2: x0 + sutun * b, y2: y0 + j * b, stroke: RENK.kare, 'stroke-width': 1.5 }, g);
    const P = (i, j) => [x0 + i * b, y0 + j * b];
    return { g, P, N: (ks) => ks.map((k) => P(k[0], k[1])), b, x0, y0, sutun, satir };
  }

  /* Çokgen: yarı saydam dolgu, kenarlık, isteğe bağlı köşe harfleri (şeklin dışına doğru itilir). koy(yeni köşeler) yeniden çizer. */
  function cokgen(c, p, pts, renk, o = {}) {
    const g = c.S('g', {}, p);
    const yuz = c.S('polygon', { fill: renk, 'fill-opacity': o.dolgu == null ? 0.2 : o.dolgu, stroke: renk, 'stroke-width': o.w || 3, 'stroke-linejoin': 'round' }, g);
    const adlar = (o.harf || []).map((h) => yazi(c, g, 0, 0, h, { size: o.harfSize || 24, kalin: 700, renk }));
    let P = pts;
    const ciz = (q) => {
      P = q; yuz.setAttribute('points', q.map((k) => k[0].toFixed(1) + ',' + k[1].toFixed(1)).join(' '));
      const m = agirlik(q), u = o.harfUzak || 22;
      adlar.forEach((t, i) => { const d = uz(m, q[i]) || 1; t.setAttribute('x', q[i][0] + ((q[i][0] - m[0]) / d) * u); t.setAttribute('y', q[i][1] + ((q[i][1] - m[1]) / d) * u + 8); });
    };
    ciz(pts);
    return { g, yuz, adlar, koy: ciz, pts: () => P };
  }

  /* Yansıma doğrusu: mor, kesikli; isteğe bağlı adı ucuna yazılır. */
  function dogru(c, p, P, Q, o = {}) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, o.renk || RENK.dogru, o.w || 3.5, { 'stroke-dasharray': '10 8' });
    const ad = o.ad ? yazi(c, g, P[0] + (o.adKay ? o.adKay[0] : 18), P[1] + (o.adKay ? o.adKay[1] : 26), o.ad, { size: 24, kalin: 700, renk: o.renk || RENK.dogru }) : null;
    return { g, hat, ad, koy: (P2, Q2) => { koy(hat, P2, Q2); if (ad) { ad.setAttribute('x', P2[0] + (o.adKay ? o.adKay[0] : 18)); ad.setAttribute('y', P2[1] + (o.adKay ? o.adKay[1] : 26)); } } };
  }

  function ok(c, p, P, Q, renk = RENK.ok, w = 3) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P2, Q2) => {
      const a = yon(P2, Q2), u = ileri(Q2, a, 2), s1 = ileri(Q2, a + 2.6, 14), s2 = ileri(Q2, a - 2.6, 14);
      koy(hat, P2, ileri(Q2, a, -8)); uc.setAttribute('d', `M${u[0]},${u[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    ciz(P, Q);
    return { g, ciz };
  }

  /* Köşeleri sırayla dolaşma yönünü gösteren yay biçimli ok (ters çevrilmeyi görünür kılar). */
  function dolasma(c, p, pts, renk, r = 20) {
    const M = icMerkez(pts), s = saatYonunde(pts) ? 1 : -1, a0 = -Math.PI / 2, a1 = a0 + s * 1.5 * Math.PI;
    const P0 = ileri(M, a0, r), P1 = ileri(M, a1, r), t = a1 + (s * Math.PI) / 2;
    const g = c.S('g', {}, p);
    c.S('path', { d: `M${P0[0]},${P0[1]} A${r},${r} 0 1 ${s > 0 ? 1 : 0} ${P1[0]},${P1[1]}`, fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const u = ileri(P1, t, 9), k1 = ileri(P1, t + Math.PI / 2, 7), k2 = ileri(P1, t - Math.PI / 2, 7);
    c.S('path', { d: `M${u[0]},${u[1]} L${k1[0]},${k1[1]} L${k2[0]},${k2[1]} Z`, fill: renk }, g);
    return g;
  }

  /* V köşesinde, P ve Q yönleri arasındaki açı yayı; dik: true ise dik açı işareti. */
  function aciYayi(c, p, V, P, Q, renk, r = 30, o = {}) {
    const a = yon(V, P), b = yon(V, Q);
    if (o.dik) { const k1 = ileri(V, a, r * 0.6), k2 = ileri(V, b, r * 0.6), k3 = [k1[0] + k2[0] - V[0], k1[1] + k2[1] - V[1]]; return c.S('path', { d: `M${k1[0]},${k1[1]} L${k3[0]},${k3[1]} L${k2[0]},${k2[1]}`, fill: 'none', stroke: renk, 'stroke-width': 2.5 }, p); }
    let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    const P0 = ileri(V, a, r), P1 = ileri(V, b, r);
    return c.S('path', { d: `M${P0[0]},${P0[1]} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${P1[0]},${P1[1]}`, fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, p);
  }
  /* V köşesindeki açının açıortayı üzerinde, d uzaklıktaki nokta (açı ölçüsünü yazmak için). */
  const aciIci = (V, P, Q, d) => { const a = yon(V, P); let f = yon(V, Q) - a; while (f > Math.PI) f -= 2 * Math.PI; while (f < -Math.PI) f += 2 * Math.PI; return ileri(V, a + f / 2, d); };

  /* Bayrak motifi (simetrik değildir; ters çevrilmesi ve dönmesi görülür). Sol üst köşesi (i, j), birim kare cinsinden köşeler. */
  const bayrak = (i, j) => [[i, j], [i + 0.4, j], [i + 2, j + 0.8], [i + 0.4, j + 1.6], [i + 0.4, j + 3], [i, j + 3]];

  return {
    RENK, rad, uz, yon, ileri, ara, araHepsi, agirlik, icMerkez, saatYonunde, yansit, otele, dondur,
    yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma, aciYayi, aciIci, bayrak,
  };
})();
