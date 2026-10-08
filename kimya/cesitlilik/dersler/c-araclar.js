/* Konu C · Kovalent bağ — ortak çizim araçları (window.KIT_C). Sayfada kit.js'den sonra, ders dosyasından önce yüklenir.
   Atom bulutları nötr gri tonlardadır (renk anlamı taşımaz); çekirdek turuncu, elektron mavi, çekme yeşil, itme kırmızıdır.
   Ölçekli grupların içine yazı konmaz: yazı punto denetimi ölçeği görmez. */
window.KIT_C = (() => {
  'use strict';
  const { RENK, yazi, ileri, rastgele, yuk } = window.KIT;
  const { lerp, clamp, ease } = Ders;

  const BULUT = '#8f9bc4';
  /* İki atomun yaklaşma benzetiminin aşamaları: çekirdekler arası uzaklık (birim). Bulut yarıçapı 84. */
  const ASAMA = [
    { ad: 'Uzak', d: 480 }, { ad: 'Yaklaşırken', d: 140 }, { ad: 'Yeterince yakın', d: 104 }, { ad: 'Bağ kurulmuş', d: 84 }, { ad: 'Çok yakın', d: 50 },
  ];

  /* Gri bulutlu yalın atom: çekirdek (+) ve isteğe bağlı tek elektron (o.e açı, o.ed uzaklık). */
  function atomYalin(c, p, P, o = {}) {
    const R = o.R || 80, g = c.S('g', {}, p);
    const bulut = c.S('circle', { cx: P[0], cy: P[1], r: R, fill: BULUT, 'fill-opacity': 0.13, stroke: BULUT, 'stroke-opacity': 0.55, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, g);
    const cekirdek = yuk(c, g, P, 'arti', o.rc || 16);
    const elektron = o.e == null ? null : yuk(c, g, ileri(P, o.e, o.ed == null ? R * 0.55 : o.ed), 'eksi', o.re || 10);
    return { g, bulut, cekirdek, elektron, P };
  }

  /* İçinde yazı olan çekirdek (flor için "9+"). */
  function cekirdekEtiket(c, p, P, metin, r = 25) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: P[0], cy: P[1], r, fill: RENK.arti }, g);
    yazi(c, g, P[0], P[1] + 7, metin, { size: 20, kalin: 700, renk: '#10162b' });
    return g;
  }

  /* İki atomun yaklaşma benzetimi. Atom başına bir çekirdek (turuncu) ve bir elektron (mavi).
     d: çekirdekler arası uzaklık. Elektronlar uzakken kendi çekirdeğinin çevresinde gezinir; yeterince yaklaşınca iki çekirdeğin
     çevresinde birlikte dolaşır ve çoğunlukla aralarında bulunur (paylaşım s: d'den hesaplanır, o.s ya da ayarla(d, s) ile sabitlenir).
     o: { cx, cy, olcek, R, d, s, tohum, T0 }. Dönen: { g, ayarla(d, s?), git(d, ms), canlan(), durdur(), atla(dT), dolas(ms), cek, el, bulutlar, d() }. */
  function iki(c, p, o = {}) {
    const R = o.R || 84, cx = o.cx == null ? 500 : o.cx, cy = o.cy == null ? 280 : o.cy, olcek = o.olcek || 1, HIZ = 2.3;
    const kok = c.S('g', { transform: `translate(${cx},${cy}) scale(${olcek})` }, p);
    const bulutlar = [0, 1].map(() => c.S('circle', { r: R, fill: BULUT, 'fill-opacity': 0.13, stroke: BULUT, 'stroke-opacity': 0.55, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, kok));
    const cek = [yuk(c, kok, [0, 0], 'arti', 16), yuk(c, kok, [0, 0], 'arti', 16)];
    const el = [yuk(c, kok, [0, 0], 'eksi', 10), yuk(c, kok, [0, 0], 'eksi', 10)];
    const rnd = rastgele(o.tohum || 5);
    const E = [0, 1].map(() => ({ a: [0.8 + rnd() * 0.6, 1.0 + rnd() * 0.6], f: [rnd() * 6.28, rnd() * 6.28], u: [0.8 + rnd() * 0.5, 1.0 + rnd() * 0.7], g: [rnd() * 6.28, rnd() * 6.28] }));
    let T = o.T0 || 0, d = o.d == null ? ASAMA[0].d : o.d, sSabit = o.s == null ? null : o.s, jeton = 0;
    const paylasim = (dd) => (sSabit != null ? sSabit : clamp((132 - dd) / 26, 0, 1));
    function ciz() {
      const s = paylasim(d), N = [-d / 2, d / 2];
      bulutlar.forEach((b, k) => { b.setAttribute('cx', N[k]); b.setAttribute('cy', 0); });
      cek.forEach((q, k) => q.tasi([N[k], 0]));
      E.forEach((e, k) => {
        const own = [N[k] + 0.52 * R * Math.sin(e.a[0] * T + e.f[0]), 0.52 * R * Math.sin(e.a[1] * T + e.f[1])];
        const sh = Math.sin(e.u[0] * T + e.g[0]);
        const ortak = [(d / 2 * 1.25 + 10) * sh * sh * sh, 0.32 * R * Math.sin(e.u[1] * T + e.g[1])];
        el[k].tasi([lerp(own[0], ortak[0], s), lerp(own[1], ortak[1], s)]);
      });
    }
    ciz();
    const api = {
      g: kok, bulutlar, cek, el,
      d: () => d,
      ayarla(dd, s) { d = dd; if (s !== undefined) sSabit = s; ciz(); },
      git(dd, ms = 1200) { const d0 = d; return c.tween(ms, (e) => { d = lerp(d0, dd, e); ciz(); }, ease.inOut); },
      atla(dT) { T += dT; ciz(); },
      dolas(ms) { const T0 = T; return c.tween(ms, (e) => { T = T0 + HIZ * (ms / 1000) * e; ciz(); }, ease.linear); },
      /* Elektronları sahne bitene ya da durdur() çağrılana kadar gezdirir. */
      canlan() {
        const j = ++jeton;
        (async () => {
          try {
            while (c.alive() && j === jeton) { const T0 = T; await c.tween(1000, (e) => { if (j === jeton) { T = T0 + HIZ * e; ciz(); } }, ease.linear); }
          } catch (err) { if (!(err instanceof Ders.Cancelled)) throw err; }
        })();
      },
      durdur() { jeton++; },
    };
    return api;
  }

  /* Yazılı kart (önerme, kart sınıflandırma): w×h, solda yazı. tasi(x, y) kartı taşır. */
  function kart(c, p, x, y, w, h, metin, o = {}) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p);
    const r = c.S('rect', { width: w, height: h, rx: 12, fill: RENK.yuzey, stroke: o.renk || RENK.kenarlik, 'stroke-width': 2.5 }, g);
    const t = yazi(c, g, o.hiza === 'orta' ? w / 2 : 18, h / 2 + (o.size || 22) * 0.36, metin, { hiza: o.hiza === 'orta' ? 'middle' : 'start', size: o.size || 22, kalin: 600, math: !!o.math, renk: o.yazi });
    return { g, r, t, w, h, tasi(nx, ny) { g.setAttribute('transform', `translate(${nx},${ny})`); } };
  }
  /* Kartın sağına yuvarlak rozet (kanıt numarası). */
  function rozet(c, k, metin, renk = RENK.vurgu) {
    const g = c.S('g', {}, k.g);
    c.S('circle', { cx: k.w - 34, cy: k.h / 2, r: 22, fill: '#10162b', stroke: renk, 'stroke-width': 2.5 }, g);
    yazi(c, g, k.w - 34, k.h / 2 + 7, metin, { size: 20, kalin: 700, renk });
    return g;
  }
  /* Kartın sağında boş kanıt kutusu. */
  function bosKutu(c, k) {
    return c.S('rect', { x: k.w - 58, y: k.h / 2 - 17, width: 40, height: 34, rx: 6, fill: 'none', stroke: RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '4 5' }, k.g);
  }

  /* Zaten görünen öğeyi soluklaştırır (biten adım); saydamlık 0,15'in altına iner. */
  const sol = (c, e, ms = 450, h = 0.12) => {
    (Array.isArray(e) ? e : [e]).forEach((x) => { if (x.style.opacity === '') x.style.opacity = 1; });
    return window.KIT.belir(c, e, ms, h);
  };

  return { BULUT, ASAMA, atomYalin, cekirdekEtiket, iki, kart, rozet, bosKutu, sol };
})();
