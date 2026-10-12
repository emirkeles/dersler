/* Konu B (Sıvılarda basınç) derslerinin ortak çizim araçları (window.KIT_B). kit.js dosyasından sonra, ders dosyasından önce yüklenir.
   Tahta 1000 × 562 birimdir. Sıvı mavidir (RENK.sivi); yoğun sıvı daha koyu mavidir. Su sütunu kesikli açık gri dikdörtgendir,
   sütunun ağırlığı turuncu, noktadaki küçük yüzey turkuaz, basınç sarı çubuktur.

   İmzalar (c = sahne bağlamı, p = üst SVG öğesi; noktalar [x, y]):

   SIVI                                  { acik: { dolgu, o }, koyu: { dolgu, o } } sıvı renkleri
   sivKabi(c, p, { x1, x2, y, dip, sivi: 'acik' | 'koyu', ust })
        → { g, sivi, x1, x2, dip, y (okunur: yüzey), seviye(h), renk(ad), yuksel(c, h, ms) }
        Üstü açık kap: iç genişlik x1–x2, serbest yüzey y, taban dip. Duvarlar gri 6 birim, yüzeyde ince açık çizgi.
        seviye(h) sıvı yüksekliğini h yapar; yuksel(c, h, ms) bunu animasyonla yapar; renk('acik' | 'koyu') sıvıyı boyar.
   suSutunu(c, p, { x, y, yuzey, w = 60 })
        → { g, el, boy(h) }    x'in ortasında, serbest yüzeyden (yuzey) y'ye uzanan kesikli su sütunu; boy(h) yüksekliği değiştirir
   basincCubugu(c, p, x, y, { w = 18 })
        → { g, boy(h), uzat(c, h, ms) }    sol alt köşesi (x, y) olan, y'den yukarı uzayan sarı çubuk (başlangıçta boyu 0)
   noktaSutunu(c, p, { x, y, yuzey, harf, w = 60, okBoy, cubukDx = 60 })
        → { x, y, nokta, sutun, ok, cubuk }    bir noktanın dört parçası ayrı ayrı belirtilir:
        nokta: turkuaz yatay küçük yüzey (x ± w/2, y) ve solunda harf (g), sutun: suSutunu (g, boy), ok: turuncu ağırlık oku
        (okBoy uzunluğunda, ucu y'de, aşağı bakar; KIT.ok sonucu: g, ciz), cubuk: noktanın sağında (x + cubukDx) basincCubugu
        (başlangıçta boyu 0; cubuk.uzat(c, h, ms) uzatır). Parçalar gizli başlamaz; gizle(...) / belir(...) ders dosyasında verilir.
   basincOklari(c, p, P, Q, ic, { n = 5, boy = 30, renk, w = 3 })
        → { g, oklar, ac(k, ms) }    P–Q doğru parçası bir yüzeydir; ic sıvının olduğu taraftan bir noktadır. Yüzeye dik, yüzeye
        bakan n ok (eşit aralıklı, her biri boy birim; ucu yüzeyde). Oklar gizli başlar; ac(k, ms) ilk k oku ms'de belirtir.
   derinlikCetveli(c, p, { x, y0, olcek, son, adim = 0.1, taraf = 'sag', yazilar: [{ d, metin }] })
        → { g }    x'te dikey çizgi; y0 serbest yüzey, olcek birim/metre, son metre. Her adım metrede 12 birimlik çentik;
        yalnızca yazilar'da verilen derinliklere 22 birim yazı konur. taraf 'sag' ise çentik ve yazı sağa, 'sol' ise sola gider. */
window.KIT_B = (() => {
  'use strict';
  const { RENK, yazi, cizgi, belir, ok } = window.KIT;
  const { lerp, ease } = Ders;
  const SIVI = { acik: { dolgu: 'var(--c1)', o: 0.8 }, koyu: { dolgu: '#1a3a85', o: 1 } };
  const DUVAR = '#8f9bc4', SUTUN = '#c3cbea';

  /* ---- sıvı dolu kap ---- */
  function sivKabi(c, p, o = {}) {
    const x1 = o.x1 == null ? 110 : o.x1, x2 = o.x2 == null ? 890 : o.x2, y0 = o.y == null ? 150 : o.y, dip = o.dip || 520;
    const ust = o.ust == null ? y0 - 30 : o.ust;
    const g = c.S('g', {}, p);
    const sv = c.S('rect', { x: x1, y: y0, width: x2 - x1, height: dip - y0 }, g);
    const yuzCizgi = cizgi(c, g, [x1, y0], [x2, y0], SUTUN, 3);
    c.S('path', { d: `M${x1},${ust} L${x1},${dip} L${x2},${dip} L${x2},${ust}`, fill: 'none', stroke: DUVAR, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    let yuz = y0;
    const renk = (ad) => { const r = SIVI[ad] || SIVI.acik; sv.setAttribute('fill', r.dolgu); sv.setAttribute('fill-opacity', r.o); };
    const seviye = (h) => {
      yuz = dip - h; sv.setAttribute('y', yuz); sv.setAttribute('height', h);
      yuzCizgi.setAttribute('y1', yuz); yuzCizgi.setAttribute('y2', yuz);
    };
    renk(o.sivi);
    return {
      g, sivi: sv, x1, x2, dip, get y() { return yuz; }, seviye, renk,
      yuksel(cc, h, ms = 600) { const h0 = dip - yuz; return cc.tween(ms, (e) => seviye(lerp(h0, h, e)), ease.inOut); },
    };
  }

  /* ---- su sütunu ---- */
  function suSutunu(c, p, o) {
    const w = o.w || 60, g = c.S('g', {}, p);
    const el = c.S('rect', { x: o.x - w / 2, y: o.yuzey, width: w, height: o.y - o.yuzey, fill: 'none', stroke: SUTUN, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, g);
    return { g, el, boy(h) { el.setAttribute('height', Math.max(0, h)); } };
  }

  /* ---- basınç çubuğu (dikey) ---- */
  function basincCubugu(c, p, x, y, o = {}) {
    const w = o.w || 18;
    const el = c.S('rect', { x, y, width: w, height: 0, rx: 3, fill: RENK.basinc }, p);
    const boy = (h) => { el.setAttribute('y', y - Math.max(0, h)); el.setAttribute('height', Math.max(0, h)); };
    return {
      g: el, boy,
      uzat(cc, h, ms = 600) { const h0 = +el.getAttribute('height'); return cc.tween(ms, (e) => boy(lerp(h0, h, e)), ease.out); },
    };
  }

  /* ---- bir noktanın sütunu, ağırlık oku ve basınç çubuğu ---- */
  function noktaSutunu(c, p, o) {
    const w = o.w || 60, dx = o.cubukDx == null ? 60 : o.cubukDx;
    const sutun = suSutunu(c, p, { x: o.x, y: o.y, yuzey: o.yuzey, w });
    const okObj = ok(c, p, [o.x, o.y - o.okBoy], [o.x, o.y], RENK.kuvvet, 6);
    const nokta = c.S('g', {}, p);
    cizgi(c, nokta, [o.x - w / 2, o.y], [o.x + w / 2, o.y], RENK.alan, 6);
    if (o.harf) yazi(c, nokta, o.x - w / 2 - 14, o.y + 9, o.harf, { hiza: 'end', size: 28, kalin: 700 });
    const cubuk = basincCubugu(c, p, o.x + dx, o.y);
    return { x: o.x, y: o.y, nokta, sutun, ok: okObj, cubuk };
  }

  /* ---- yüzeye dik basınç okları ---- */
  function basincOklari(c, p, P, Q, ic, o = {}) {
    const n = o.n || 5, boy = o.boy || 30, renk = o.renk || RENK.basinc, w = o.w || 3;
    const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy);
    let nx = -dy / L, ny = dx / L;
    if ((ic[0] - P[0]) * nx + (ic[1] - P[1]) * ny < 0) { nx = -nx; ny = -ny; }
    const g = c.S('g', {}, p), oklar = [];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, S = [P[0] + dx * t, P[1] + dy * t];
      const ok1 = ok(c, g, [S[0] + nx * boy, S[1] + ny * boy], S, renk, w);
      ok1.g.style.opacity = 0; oklar.push(ok1);
    }
    return {
      g, oklar,
      ac(k, ms = 400) { return belir(c, oklar.slice(0, k).map((q) => q.g), ms); },
    };
  }

  /* ---- derinlik cetveli ---- */
  function derinlikCetveli(c, p, o) {
    const adim = o.adim || 0.1, sag = o.taraf !== 'sol', yon = sag ? 1 : -1, g = c.S('g', {}, p);
    cizgi(c, g, [o.x, o.y0], [o.x, o.y0 + o.son * o.olcek], RENK.cizgi, 2);
    for (let i = 0; i * adim <= o.son + 1e-9; i++) {
      const y = o.y0 + i * adim * o.olcek;
      cizgi(c, g, [o.x, y], [o.x + yon * 12, y], RENK.cizgi, 2);
    }
    (o.yazilar || []).forEach((q) => yazi(c, g, o.x + yon * 18, o.y0 + q.d * o.olcek + 8, q.metin, { hiza: sag ? 'start' : 'end', size: 22, renk: RENK.cizgi }));
    return { g };
  }

  return { SIVI, sivKabi, suSutunu, basincCubugu, noktaSutunu, basincOklari, derinlikCetveli };
})();
