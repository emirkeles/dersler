/* Konu D (Kaldırma kuvveti) derslerinin ortak çizim araçları (window.KIT_D). kit.js dosyasından sonra, ders dosyasından önce yüklenir.
   Dinamometre düzeneği (D1 ve D2 ortak; yandan görünüş, düz vektör). Tahta 1000 × 562 birimdir. dx ile düzenek yatay kaydırılır
   (tablo sahnelerinde D1 -190, D2 -180): kap x 250-650 (+dx), ip ve dinamometre x = 450 (+dx).
   Kap: üst kenar y 240, taban y 540, su yüzeyi y 280. Dinamometre gövdesi 60 × 80 (y 20-100), ip y 100-200, cisim 70 × 80 (y 200-280),
   dört eşit dilim (her biri 20 birim, 0,0001 m³); cismin havada ağırlığı 9,8 N. Dinamometre, ip, cisim ve oklar birlikte iner:
   n dilim batıkken kayma Δ = 20·n birimdir (n = 4: Δ = 80, cisim tamamen batık). Ok ölçeği 10 birim = 1 N: ağırlık oku 98 birim.
   Sıvının mavi tonu yoğunluğa göre koyulaşır: su (d) 0,35 · X sıvısı (2d) 0,6 saydamlık.

   İmzalar (hepsi window.KIT_D içinde):
   ton(d)                                   → yoğunluğa göre dolgu saydamlığı (d = 1 → 0,35 · d = 2 → 0,6)
   FK = { su: [0, 0.98, 1.96, 2.94, 3.92], x: [0, 1.96, 3.92, 5.88, 7.84] }   → n = 0-4 dilim batıkken kaldırma kuvveti (N)
   okumaDeger(n, sivi)                      → dinamometre okuması (N): 9,8 - FK; sivi 0 ya da 'su' = su, 1 ya da 'x' = X sıvısı
   kap(c, p, { x1, x2, ust, taban, yuzey, yogunluk, cetvel }) → { g, sivi, yogunluk(d, ms), yuzey }   (cetvel: true → sol iç duvarda 0,1 / 0,2 / 0,3 m çentikleri)
   dinamometre(c, p, { x, y, deger })       → { g, yazi, oku(v, ms), deger }   (okuma yazısı x + 50'de; ibre 6 birim/N; oku(v, 0) anında)
   cisim(c, p, { x, y })                    → { g }   (x orta, y üst kenar; 70 × 80, dört dilim)
   kuvvetOku(c, p, x, y0, uzunluk, renk, { yukari, etiket: ['satır', …], size }) → { g, ayarla(uzunluk, ms) }   (kök (x, y0); yukari: true yukarı doğru)
   duzenek(c, p, { dx, dilim, delta, okuma, yogunluk, cetvel, etiket })
        → { g, kap, hareket, cisim, dinamometre, agirlik, kaldirma, okumaYazi, delta, git(delta, ms, eg), dilim(n, ms), oku(v, ms), yogunluk(d, ms) }
        agirlik (turuncu, aşağı, 98 birim, cismin sağında x = 520 + dx) ve kaldirma (mor, yukarı, solunda x = 380 + dx; uzunluk 0 başlar:
        kaldirma.ayarla(Math.round(F_k · 10), ms)) cismin yan yüzünün orta yüksekliğinde köklenir ve cisimle birlikte iner.
        etiket: true → "ağırlık" ve "kaldırma kuvveti" yazıları oklara eklenir. Oklar varsayılan olarak görünür; gizle(d.agirlik.g, d.kaldirma.g) ile gizlenir.
        git(delta, ms) ardışık çağrılarda öncekini iptal eder (kaydırıcıyla sürülebilir). */
window.KIT_D = (() => {
  'use strict';
  const { RENK, sayi, yazi, cizgi } = window.KIT;
  const { lerp, ease } = Ders;
  const KAP = '#c3cbea';
  const CISIM = { dolgu: '#b7bfd6', kenar: '#e4e9fb', dilim: '#5b678f' };
  const FK = { su: [0, 0.98, 1.96, 2.94, 3.92], x: [0, 1.96, 3.92, 5.88, 7.84] };
  const ton = (d) => Math.min(0.85, 0.35 + 0.25 * (d - 1));
  const okumaDeger = (n, sivi) => +(9.8 - FK[sivi === 1 || sivi === 'x' ? 'x' : 'su'][n]).toFixed(2);
  const N = (v) => sayi(+(+v).toFixed(2)) + ' N';

  /* Sıvı dolu kap (üstü açık). */
  function kap(c, p, o = {}) {
    const x1 = o.x1 == null ? 250 : o.x1, x2 = o.x2 == null ? 650 : o.x2, ust = o.ust == null ? 240 : o.ust;
    const taban = o.taban == null ? 540 : o.taban, yuzey = o.yuzey == null ? 280 : o.yuzey;
    let d = o.yogunluk || 1;
    const g = c.S('g', {}, p);
    const sivi = c.S('rect', { x: x1, y: yuzey, width: x2 - x1, height: taban - yuzey, fill: RENK.sivi, 'fill-opacity': ton(d) }, g);
    cizgi(c, g, [x1, yuzey], [x2, yuzey], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    c.S('path', { d: `M${x1},${ust} L${x1},${taban} L${x2},${taban} L${x2},${ust}`, fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    if (o.cetvel) {
      ['0,1', '0,2', '0,3'].forEach((m, i) => {
        const y = yuzey + 30 * (i + 1);
        cizgi(c, g, [x1, y], [x1 + 22, y], KAP, 3);
        yazi(c, g, x1 + 30, y + 8, m + ' m', { hiza: 'start', size: 22, kalin: 600, renk: KAP });
      });
    }
    return {
      g, sivi, yuzey,
      yogunluk(d2, ms = 600) {
        const a = ton(d), b = ton(d2); d = d2;
        if (!ms) { sivi.setAttribute('fill-opacity', b); return Promise.resolve(); }
        return c.tween(ms, (e) => sivi.setAttribute('fill-opacity', lerp(a, b, e)), ease.inOut);
      },
    };
  }

  /* Yaylı dinamometre: gövde 60 × 80, 0-10 N ölçeği, ibre (6 birim/N), sağında turuncu okuma. */
  function dinamometre(c, p, o = {}) {
    const x = o.x == null ? 450 : o.x, y = o.y == null ? 20 : o.y;
    let vt = o.deger == null ? 9.8 : o.deger, vi = vt;
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 30, y, width: 60, height: 80, rx: 8, fill: '#18213f', stroke: KAP, 'stroke-width': 3 }, g);
    cizgi(c, g, [x - 12, y + 10], [x - 12, y + 70], RENK.ince, 3);
    for (let k = 0; k <= 5; k++) cizgi(c, g, [x - 12, y + 10 + 12 * k], [x - 3, y + 10 + 12 * k], RENK.ince, 3);
    const ibre = cizgi(c, g, [x - 20, y], [x + 22, y], RENK.kuvvet, 5);
    const t = yazi(c, g, x + 50, y + 50, N(vt), { hiza: 'start', size: 30, kalin: 700, renk: RENK.kuvvet });
    const yazT = (v) => { vt = v; t.textContent = N(v); };
    const yazI = (v) => { vi = v; const yy = y + 10 + 6 * v; ibre.setAttribute('y1', yy); ibre.setAttribute('y2', yy); };
    yazI(vi);
    return {
      g, yazi: t, get deger() { return vt; },
      /* Okuma sayarak, ibre yukarı/aşağı kayarak v değerine gider. */
      oku(v, ms = 600) {
        if (!ms) { yazT(v); yazI(v); return Promise.resolve(); }
        const a = vt, b = vi;
        return Promise.all([c.tween(ms, (e) => yazT(lerp(a, v, e)), ease.out), c.tween(ms, (e) => yazI(lerp(b, v, e)), ease.inOut)]);
      },
    };
  }

  /* Dört dilimli cisim: x orta, y üst kenar; 70 × 80. */
  function cisim(c, p, o = {}) {
    const x = o.x == null ? 450 : o.x, y = o.y == null ? 200 : o.y;
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 35, y, width: 70, height: 80, rx: 4, fill: CISIM.dolgu, stroke: CISIM.kenar, 'stroke-width': 2.5 }, g);
    for (let k = 1; k <= 3; k++) cizgi(c, g, [x - 35, y + 20 * k], [x + 35, y + 20 * k], CISIM.dilim, 2);
    return { g };
  }

  /* Kuvvet oku: kök (x, y0), uzunluk birim cinsinden (10 birim = 1 N); yukari: true → yukarı doğru. etiket: satırlar. */
  function kuvvetOku(c, p, x, y0, uz, renk, o = {}) {
    const g = c.S('g', {}, p), yon = o.yukari ? -1 : 1;
    const a = window.KIT.ok(c, g, [x, y0], [x, y0 + yon * uz], renk, 6);
    let L = uz;
    (o.etiket || []).forEach((m, i) => {
      yazi(c, g, o.yukari ? x - 12 : x + 12, (o.yukari ? y0 - 14 : y0 + 50) + 24 * i, m, { hiza: o.yukari ? 'end' : 'start', size: o.size || 24, kalin: 600, renk });
    });
    return {
      g,
      ayarla(uz2, ms = 0) {
        const a0 = L; L = uz2;
        if (!ms) { a.ciz([x, y0], [x, y0 + yon * uz2]); return Promise.resolve(); }
        return c.tween(ms, (e) => a.ciz([x, y0], [x, y0 + yon * lerp(a0, uz2, e)]), ease.out);
      },
    };
  }

  /* Dinamometre düzeneği. Ayrıntı dosyanın başındaki yorumda. */
  function duzenek(c, p, o = {}) {
    const dx = o.dx || 0, X = 450 + dx;
    const g = c.S('g', {}, p);
    const k = kap(c, g, { x1: 250 + dx, x2: 650 + dx, yogunluk: o.yogunluk || 1, cetvel: o.cetvel });
    const hareket = c.S('g', {}, g);
    cizgi(c, hareket, [X, 100], [X, 200], KAP, 3);
    const dn = dinamometre(c, hareket, { x: X, y: 20, deger: o.okuma == null ? 9.8 : o.okuma });
    const cs = cisim(c, hareket, { x: X, y: 200 });
    const agirlik = kuvvetOku(c, hareket, X + 70, 240, 98, RENK.kuvvet, { etiket: o.etiket ? ['ağırlık'] : [] });
    const kaldirma = kuvvetOku(c, hareket, X - 70, 240, 0, RENK.kaldirma, { yukari: true, etiket: o.etiket ? ['kaldırma', 'kuvveti'] : [] });
    let delta = o.delta == null ? 20 * (o.dilim || 0) : o.delta, tok = 0;
    const koyDelta = (v) => { delta = v; hareket.setAttribute('transform', `translate(0,${v})`); };
    koyDelta(delta);
    const d = {
      g, kap: k, hareket, cisim: cs, dinamometre: dn, agirlik, kaldirma, okumaYazi: dn.yazi,
      get delta() { return delta; },
      git(v, ms = 900, eg = ease.inOut) {
        const my = ++tok;
        if (!ms) { koyDelta(v); return Promise.resolve(); }
        const a = delta;
        return c.tween(ms, (e) => { if (my === tok) koyDelta(lerp(a, v, e)); }, eg);
      },
      dilim(n, ms = 900) { return d.git(20 * n, ms); },
      oku: (v, ms) => dn.oku(v, ms),
      yogunluk: (d2, ms) => k.yogunluk(d2, ms),
    };
    return d;
  }

  return { ton, FK, okumaDeger, kap, dinamometre, cisim, kuvvetOku, duzenek };
})();
