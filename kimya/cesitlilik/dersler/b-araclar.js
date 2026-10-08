/* Konu B (İyonik bağ) ortak çizim araçları (window.KIT_B). kit.js'den sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Renkler temanın kit.js dosyasındaki gibidir: artı yük (çekirdek, katyon) turuncu,
   eksi yük (elektron, anyon) mavi, çekme yeşil, itme kırmızı. Yüksüz atomlar nötr gridir (Na/Li/K koyu, Cl açık).

   serit     altı aşamalı tepkime şeridi (numaralar), bir aşamayı vurgular, kartların bağlanacağı noktayı verir
   tepkime   sodyum (ya da lityum, potasyum) ile klor gazının altı aşamalı tepkimesi: git(n) aşamaya götürür
   iyon      yüklü disk (tek atomlu iyon) ya da yüklü kutu (çok atomlu iyon)
   terazi    yük terazisi: sol kefede artı yükler, sağ kefede eksi yükler; formül şeridi
   kart      tahtada yazı kartı */
window.KIT_B = (() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, ok } = window.KIT;
  const { lerp, clamp } = Ders;

  const GRI = { metal: '#6b7494', klor: '#d5daea' }, KOYU = '#10162b', AC = '#f4f6ff';
  const ASAMA = ['Sodyum ve klor', 'Isıtma, ışık, ısı', 'Klor atomları', 'Na^{+} oluşur', 'Cl^{−} oluşur', 'İyonlar buluşur'];

  /* ---- aşama şeridi ---- */
  function serit(c, p, o = {}) {
    const W = 64, H = 46, G = 14, y = o.y == null ? 14 : o.y, x0 = (1000 - (6 * W + 5 * G)) / 2;
    const g = c.S('g', {}, p), kutular = [], sayilar = [];
    for (let i = 0; i < 6; i++) {
      const x = x0 + i * (W + G);
      kutular.push(c.S('rect', { x, y, width: W, height: H, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g));
      sayilar.push(yazi(c, g, x + W / 2, y + H / 2 + 9, String(i + 1), { size: 26, kalin: 700, renk: RENK.soluk }));
    }
    const etiket = yazi(c, g, 500, y + H + 36, '', { size: 26, kalin: 600, renk: RENK.vurgu, math: true });
    const alt = (n) => [x0 + (n - 1) * (W + G) + W / 2, y + H];
    function vurgula(n, ad) {
      kutular.forEach((k, i) => {
        const a = i + 1 === n;
        k.style.stroke = a ? RENK.vurgu : RENK.kenarlik; k.style.strokeWidth = a ? 4 : 2; k.style.fill = a ? '#2a3566' : RENK.yuzey;
        sayilar[i].style.fill = a ? RENK.yazi : RENK.soluk;
      });
      c.mathText(etiket, n && ad ? ad : '');
    }
    return { g, kutular, alt, vurgula, etiket };
  }

  /* ---- tepkime benzetimi ---- */
  const METAL = { Na: { r: 30, ri: 22, p: 11 }, Li: { r: 26, ri: 18, p: 3 }, K: { r: 36, ri: 28, p: 19 } };
  const CL_R = 24, CL_RI = 32;
  const nd = (a, b, t) => a.map((x, i) => lerp(x, b[i], t));

  /* o: { metal: 'Na' | 'Li' | 'K', x, y, olcek, rozet }. Tasarım kutusu 900×400'dür.
     Aşamalar: 1 başlangıç · 2 ısıtma, ışık, ısı · 3 metal gazı ve klor atomları · 4 katyon oluşur · 5 anyon oluşur · 6 iyonlar buluşur.
     Dönen: { g, hemen(n), git(n, ms), asama() }. Dört metal atomu, dört klor atomu (iki Cl2 molekülü), dört elektron. */
  function tepkime(c, p, o = {}) {
    const ad = o.metal || 'Na', M = METAL[ad];
    const g = c.S('g', { transform: `translate(${o.x || 0},${o.y || 0}) scale(${o.olcek || 1})` }, p);
    const dK = M.ri + CL_RI, kx = (k) => 450 + (k - 1.5) * dK, ky = (k) => 200 + (k - 0.5) * dK;
    const KM = [[0, 0], [2, 0], [1, 1], [3, 1]].map(([a, b]) => [kx(a), ky(b)]);
    const KC = [[1, 0], [3, 0], [0, 1], [2, 1]].map(([a, b]) => [kx(a), ky(b)]);
    const lat1 = [[150 - M.r, 200 - M.r], [150 + M.r, 200 - M.r], [150 - M.r, 200 + M.r], [150 + M.r, 200 + M.r]];
    const gaz2 = [[110, 120], [205, 170], [120, 255], [225, 300]], gaz3 = [[125, 115], [220, 170], [110, 260], [240, 305]];
    const cl1 = [[600, 130], [639, 157], [720, 270], [762, 246]], cl2 = [[585, 150], [624, 177], [735, 255], [777, 231]];
    const cl3 = [[580, 120], [690, 185], [700, 290], [795, 235]];
    const F = [[350, 95], [430, 310], [385, 205], [510, 130]];
    const MP = [lat1, gaz2, gaz3, gaz3, gaz3, KM], CP = [cl1, cl2, cl3, cl3, cl3, KC], EP = [lat1, gaz2, gaz3, F, cl3, KC];
    const MI = [0, 0, 0, 1, 1, 1], CI = [0, 0, 0, 0, 1, 1], EO = [0, 0, 0, 1, 0, 0], ISIK = [0, 1, 0, 0, 0, 0], ROZET = [0, 0, 0, 1, 1, 0];
    const D = [0, 1, 2, 3, 4, 5].map((s) => ({
      mx: MP[s].map((q) => q[0]), my: MP[s].map((q) => q[1]), mr: MP[s].map(() => (MI[s] ? M.ri : M.r)), mi: MP[s].map(() => MI[s]),
      cx: CP[s].map((q) => q[0]), cy: CP[s].map((q) => q[1]), cr: CP[s].map(() => (CI[s] ? CL_RI : CL_R)), ci: CP[s].map(() => CI[s]),
      ex: EP[s].map((q) => q[0]), ey: EP[s].map((q) => q[1]), eo: EP[s].map(() => EO[s]), isik: [ISIK[s]], rozet: [ROZET[s]],
    }));
    const kar = (a, b, t) => { const r = {}; Object.keys(a).forEach((k) => { r[k] = nd(a[k], b[k], t); }); return r; };

    // Işık ve ısı (en arkada).
    const arka = c.S('g', {}, g), pts = [];
    for (let k = 0; k < 24; k++) { const a = (k * Math.PI) / 12, r = k % 2 ? 80 : 150; pts.push(`${(450 + r * Math.cos(a)).toFixed(1)},${(215 + r * Math.sin(a)).toFixed(1)}`); }
    c.S('polygon', { points: pts.join(' '), fill: RENK.vurgu, 'fill-opacity': 0.92 }, arka);
    yazi(c, arka, 450, 226, 'ışık', { size: 32, kalin: 700, renk: KOYU });
    [400, 450, 500].forEach((x, i) => ok(c, arka, [x, 70 + (i % 2) * 8], [x, 22 + (i % 2) * 8], RENK.yazi, 4));
    yazi(c, arka, 560, 52, 'ısı', { hiza: 'start', size: 28, kalin: 600, renk: RENK.yazi });
    // Parçacıklar.
    const gm = c.S('g', {}, g), gc = c.S('g', {}, g), ge = c.S('g', {}, g), gl = c.S('g', {}, g);
    const ms = D[0].mx.map((_, i) => ({
      gri: c.S('circle', { fill: GRI.metal }, gm), ton: c.S('circle', { fill: RENK.arti }, gm),
      la: yazi(c, gl, 0, 0, ad, { size: 22, kalin: 700, renk: AC, math: true }), li: yazi(c, gl, 0, 0, ad + '^{+}', { size: 22, kalin: 700, renk: KOYU, math: true }),
    }));
    const cs = D[0].cx.map(() => ({
      gri: c.S('circle', { fill: GRI.klor }, gc), ton: c.S('circle', { fill: RENK.eksi }, gc),
      la: yazi(c, gl, 0, 0, 'Cl', { size: 22, kalin: 700, renk: KOYU, math: true }), li: yazi(c, gl, 0, 0, 'Cl^{−}', { size: 22, kalin: 700, renk: KOYU, math: true }),
    }));
    const es = D[0].ex.map(() => c.S('circle', { r: 8, fill: RENK.eksi, stroke: KOYU, 'stroke-width': 2 }, ge));
    const rz = o.rozet ? yazi(c, gl, 0, 0, `${M.p}p^{+} ${M.p - 1}e^{−}`, { size: 22, kalin: 700, renk: RENK.arti, math: true }) : null;

    let lab = 1;   // taneciklerin yazıları, hareket sırasında üst üste binmesin diye kısa süre kapanır
    const yer = (t, x, y, a) => { t.setAttribute('x', x); t.setAttribute('y', y + 8); t.style.opacity = a * lab; };
    let simdiki = D[0], no = 1;
    function uygula(s) {
      arka.style.opacity = s.isik[0];
      ms.forEach((m, i) => {
        [m.gri, m.ton].forEach((d) => { d.setAttribute('cx', s.mx[i]); d.setAttribute('cy', s.my[i]); d.setAttribute('r', s.mr[i]); });
        m.ton.style.opacity = s.mi[i];
        yer(m.la, s.mx[i], s.my[i], clamp(1 - 2 * s.mi[i], 0, 1)); yer(m.li, s.mx[i], s.my[i], clamp(2 * s.mi[i] - 1, 0, 1));
      });
      cs.forEach((m, i) => {
        [m.gri, m.ton].forEach((d) => { d.setAttribute('cx', s.cx[i]); d.setAttribute('cy', s.cy[i]); d.setAttribute('r', s.cr[i]); });
        m.ton.style.opacity = s.ci[i];
        yer(m.la, s.cx[i], s.cy[i], clamp(1 - 2 * s.ci[i], 0, 1)); yer(m.li, s.cx[i], s.cy[i], clamp(2 * s.ci[i] - 1, 0, 1));
      });
      es.forEach((e, i) => { e.setAttribute('cx', s.ex[i]); e.setAttribute('cy', s.ey[i]); e.style.opacity = s.eo[i]; });
      if (rz) yer(rz, s.mx[0], s.my[0] + s.mr[0] + 26, s.rozet[0]);
    }
    uygula(simdiki);
    return {
      g, D,
      asama: () => no,
      hemen(n) { no = n; simdiki = D[n - 1]; uygula(simdiki); },
      git(n, ms = 1600, e) {
        const a = simdiki, b = D[n - 1]; no = n;
        const yol = Math.max(...['mx', 'my', 'cx', 'cy'].flatMap((k) => a[k].map((v, i) => Math.abs(v - b[k][i]))));
        return c.tween(ms, (t) => {
          lab = yol > 40 ? (t < 0.04 ? 1 - t / 0.04 : t > 0.97 ? (t - 0.97) / 0.03 : 0) : 1;
          simdiki = kar(a, b, t); uygula(simdiki);
        }, e).then(() => { lab = 1; simdiki = b; uygula(b); });
      },
    };
  }

  /* ---- iyon: yüklü disk (tek atomlu) ya da yüklü kutu (çok atomlu) ---- */
  function iyon(c, p, x, y, tur, etiket, o = {}) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p), renk = tur === 'arti' ? RENK.arti : RENK.eksi, size = o.size || 22;
    if (o.kutu) {
      const w = o.w || 100, h = o.h || 54;
      c.S('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 12, fill: renk }, g);
    } else c.S('circle', { r: o.r || 26, fill: renk }, g);
    const t = yazi(c, g, 0, size * 0.36, etiket, { size, kalin: 700, renk: KOYU, math: true });
    return { g, t, tasi(a, b) { g.setAttribute('transform', `translate(${a},${b})`); } };
  }

  /* ---- yazı kartı: satirlar = ['satır', …] ---- */
  function kart(c, p, x, y, w, satirlar, o = {}) {
    const size = o.size || 24, h = satirlar.length * (size + 12) + 26, g = c.S('g', {}, p);
    const r = kutu(c, g, x, y, w, h, { rx: 14, w: 2.5, renk: o.renk });
    satirlar.forEach((s, i) => yazi(c, g, x + w / 2, y + 22 + size * 0.8 + i * (size + 12), s, { size, kalin: 600, math: true }));
    return { g, r, ust: [x + w / 2, y], alt: [x + w / 2, y + h], h };
  }

  /* ---- yük terazisi ----
     kur(solTanim, sagTanim, nSol, nSag): tanım { etiket: 'Ca^{2+}', yuk: 2 (artı) | −1 (eksi), kutu: true (çok atomlu) }.
     say(nSol, nSag, ms): kefelerdeki iyon sayısını değiştirir; kefe ağır tarafa eğilir, yükler eşitse "toplam 0" yanar.
     formul(f, oran): formül şeridini yazar (f: 'CaCl_{2}'). */
  function terazi(c, p, o = {}) {
    const cx = 500, cy = o.y == null ? 120 : o.y, L = 270, ASIL = 112;
    const g = c.S('g', {}, p);
    c.S('path', { d: `M${cx - 34},${cy + 66} L${cx},${cy} L${cx + 34},${cy + 66} Z`, fill: RENK.kenarlik }, g);
    c.S('rect', { x: cx - 80, y: cy + 66, width: 160, height: 12, rx: 6, fill: RENK.kenarlik }, g);
    const kiris = cizgi(c, g, [cx - L, cy], [cx + L, cy], RENK.cizgi, 8);
    c.S('circle', { cx, cy, r: 10, fill: RENK.vurgu }, g);
    const taraf = (renk) => {
      const t = c.S('g', {}, g);
      return {
        h1: cizgi(c, t, [0, 0], [0, 0], RENK.ince, 3), h2: cizgi(c, t, [0, 0], [0, 0], RENK.ince, 3),
        tepsi: c.S('rect', { width: 330, height: 12, rx: 6, fill: RENK.cizgi }, t), iyonlar: c.S('g', {}, t),
        toplam: yazi(c, t, 0, 0, '', { size: 34, kalin: 700, renk, math: true }), slots: [], tanim: null, n: 0,
      };
    };
    const sol = taraf(RENK.arti), sag = taraf(RENK.eksi);
    const sifir = yazi(c, g, cx, cy + 150, 'toplam 0', { size: 30, kalin: 700, renk: RENK.iyi });
    sifir.style.opacity = 0;
    const fg = c.S('g', {}, p), fm = yazi(c, fg, 500, 452, '', { size: 56, kalin: 700, math: true });
    const or = yazi(c, fg, 760, 452, '', { size: 28, kalin: 600, renk: RENK.soluk });

    const pitch = (t) => (t.tanim && t.tanim.kutu ? 106 : 80);
    function doldur(t, tanim) {
      t.iyonlar.textContent = ''; t.slots = []; t.tanim = tanim; t.n = 0;
      if (!tanim) return;
      for (let i = 0; i < 4; i++) t.slots.push(iyon(c, t.iyonlar, 0, 0, tanim.yuk > 0 ? 'arti' : 'eksi', tanim.etiket, { kutu: tanim.kutu, w: 100, h: 54, r: 32, size: 24 }));
    }
    const etiketle = (n, yuk) => { const v = Math.round(n) * Math.abs(yuk || 0); return v ? `${v}${yuk > 0 ? '+' : '−'}` : ''; };
    function ciz(a, b) {
      sol.n = a; sag.n = b;
      const Ls = Math.abs(sol.tanim ? sol.tanim.yuk : 0) * a, Rs = Math.abs(sag.tanim ? sag.tanim.yuk : 0) * b;
      const th = clamp(0.05 * (Ls - Rs), -0.2, 0.2);
      const Lp = [cx - L * Math.cos(th), cy + L * Math.sin(th)], Rp = [cx + L * Math.cos(th), cy - L * Math.sin(th)];
      kiris.setAttribute('x1', Lp[0]); kiris.setAttribute('y1', Lp[1]); kiris.setAttribute('x2', Rp[0]); kiris.setAttribute('y2', Rp[1]);
      [[sol, Lp, a], [sag, Rp, b]].forEach(([t, E, n]) => {
        const ty = E[1] + ASIL, h = t.tanim && t.tanim.kutu ? 54 : 64;
        t.tepsi.setAttribute('x', E[0] - 165); t.tepsi.setAttribute('y', ty);
        [[t.h1, -150], [t.h2, 150]].forEach(([l, dx]) => { l.setAttribute('x1', E[0]); l.setAttribute('y1', E[1]); l.setAttribute('x2', E[0] + dx); l.setAttribute('y2', ty); });
        t.slots.forEach((s, i) => {
          s.tasi(E[0] + (i - (n - 1) / 2) * pitch(t), ty - h / 2);
          s.g.style.opacity = clamp(n - i, 0, 1);
        });
        t.toplam.setAttribute('x', E[0]); t.toplam.setAttribute('y', ty + 50);
        c.mathText(t.toplam, etiketle(n, t.tanim ? t.tanim.yuk : 0));
      });
      sifir.style.opacity = Math.abs(Ls - Rs) < 0.02 && Ls > 0 ? 1 : 0;
    }
    ciz(0, 0);
    return {
      g, fg, sol, sag, sifir,
      kur(st, sg, a = 0, b = 0) { doldur(sol, st); doldur(sag, sg); ciz(a, b); },
      say(a, b, ms = 900) { const a0 = sol.n, b0 = sag.n; return c.tween(ms, (e) => ciz(lerp(a0, a, e), lerp(b0, b, e))); },
      formul(f, oran) { c.mathText(fm, f || ''); or.textContent = oran ? 'oran ' + oran : ''; },
      fm,
    };
  }

  return { GRI, KOYU, AC, ASAMA, METAL, serit, tepkime, iyon, kart, terazi };
})();
