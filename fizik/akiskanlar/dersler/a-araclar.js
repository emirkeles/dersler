/* Konu A (Basınç) derslerinin ortak çizim araçları (window.KIT_A). kit.js dosyasından sonra, ders dosyasından önce yüklenir.
   Kum düzeneği: kap, kum yüzeyi, kumda açılan çukurlar ve tuğlalar. Tuğla 140 × 70 birimdir: yatıkken geniş yüzü,
   dikken dar yüzü kuma değer; dar yüzün alanı geniş yüzün yarısıdır. Batma derinliği şematiktir: basınçla orantılı
   çizilir (yatık tek tuğla 14, dik tek tuğla 28, dik tuğlanın üstünde bir tuğla daha varsa 56 birim), sayı yazılmaz.
   Basınçölçer (A2): üstüne tuğla konan levha ve sayı gösteren kutu. */
window.KIT_A = (() => {
  'use strict';
  const { RENK, yazi, cizgi } = window.KIT;
  const { lerp, ease } = Ders;
  const TUGLA = { uzun: 140, kisa: 70, dolgu: '#b9683f', kenar: '#eaa77e' };
  const KUM = { dolgu: '#c8a86b', kap: '#8f9bc4', zemin: '#10162b' };
  const BATMA = { yatik: 14, dik: 28, cift: 56 };

  /* Kum dolu kap. o: { x1, x2, y (kum yüzeyi), dip }. cukur(x, w) kum yüzeyinde w genişliğinde bir çukur hazırlar;
     derinlik(d) ile açılır. Çukurlar kumun üstünde, tuğlaların altında çizilir: tuğla kalkınca görünür. */
  function kumKabi(c, p, o = {}) {
    const x1 = o.x1 == null ? 110 : o.x1, x2 = o.x2 == null ? 890 : o.x2, y = o.y || 380, dip = o.dip || 500;
    const g = c.S('g', {}, p);
    c.S('rect', { x: x1, y, width: x2 - x1, height: dip - y, fill: KUM.dolgu }, g);
    const cukurlar = c.S('g', {}, g);
    c.S('path', {
      d: `M${x1},${y - 60} L${x1},${dip} L${x2},${dip} L${x2},${y - 60}`, fill: 'none', stroke: KUM.kap,
      'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
    }, g);
    function cukur(x, w) {
      const el = c.S('rect', { x, y: y - 1, width: w, height: 0, fill: KUM.zemin }, cukurlar);
      let d = 0;
      return { el, get d() { return d; }, derinlik(v) { d = Math.max(0, v); el.setAttribute('height', d > 0 ? d + 1 : 0); } };
    }
    return { g, x1, x2, y, dip, cukur };
  }

  /* Tuğla: sol alt köşesi (x, y) olan dikdörtgen. o: { dik, harf, temas (alt kenarda turkuaz çizgi) }.
     koy(x, y) yerleştirir, git(x, y, ms) taşır. */
  function tugla(c, p, x, y, o = {}) {
    const w = o.dik ? TUGLA.kisa : TUGLA.uzun, h = o.dik ? TUGLA.uzun : TUGLA.kisa;
    const g = c.S('g', {}, p);
    c.S('rect', { x: 0, y: -h, width: w, height: h, rx: 5, fill: TUGLA.dolgu, stroke: TUGLA.kenar, 'stroke-width': 2.5 }, g);
    if (o.harf) yazi(c, g, w / 2, -h / 2 + 10, o.harf, { size: 28, kalin: 700, renk: KUM.zemin });
    const temas = o.temas ? cizgi(c, g, [4, 0], [w - 4, 0], RENK.alan, 7) : null;
    const yer = [x, y];
    const koy = (X, Y) => { yer[0] = X; yer[1] = Y; g.setAttribute('transform', `translate(${X},${Y})`); };
    koy(x, y);
    return {
      g, w, h, yer, temas, koy,
      git(X, Y, ms = 800, eg = ease.inOut) { const x0 = yer[0], y0 = yer[1]; return c.tween(ms, (e) => koy(lerp(x0, X, e), lerp(y0, Y, e)), eg); },
    };
  }

  /* Birlikte hareket eden parçalar (tuğla yığını ve okları). dy: kum yüzeyine göre düşey kayma; eksi değer yukarıda. */
  function yigin(c, p, dy0 = 0) {
    const g = c.S('g', {}, p);
    let dy = dy0;
    const koy = (v) => { dy = v; g.setAttribute('transform', `translate(0,${v})`); };
    koy(dy0);
    return {
      g, koy, get dy() { return dy; },
      git(v, ms = 900, eg = ease.inOut) { const d0 = dy; return c.tween(ms, (e) => koy(lerp(d0, v, e)), eg); },
    };
  }
  /* Yığını kuma bırakır: dy değeri d olana dek iner; kuma girdiği kadar çukur açılır. */
  const batir = (c, yg, ck, d, ms = 900) => {
    const d0 = yg.dy;
    return c.tween(ms, (e) => { const v = lerp(d0, d, e); yg.koy(v); ck.derinlik(Math.max(ck.d, v)); }, ease.inOut);
  };
  /* Yığını kumun üstüne kaldırır; çukur yerinde kalır. */
  const kaldir = (_c, yg, yukari = 40, ms = 600) => yg.git(-yukari, ms);
  /* Çukuru kapatır (kum düzeltilir). */
  const duzelt = (c, ck, ms = 400) => { const d0 = ck.d; return c.tween(ms, (e) => ck.derinlik(d0 * (1 - e)), ease.in); };

  /* Basınçölçer: üstüne cisim konan levha (üst kenarı y) ve altında sayı gösteren kutu.
     o: { x1, x2, y }. goster(v) sayıyı yazar ('?' de olur), say(v, ms) sayarak çıkarır. */
  function basincOlcer(c, p, o = {}) {
    const x1 = o.x1 == null ? 100 : o.x1, x2 = o.x2 == null ? 440 : o.x2, y = o.y || 400, cx = (x1 + x2) / 2;
    const g = c.S('g', {}, p);
    c.S('rect', { x: x1, y, width: x2 - x1, height: 20, rx: 5, fill: '#8f9bc4' }, g);
    c.S('rect', { x: cx - 16, y: y + 20, width: 32, height: 22, fill: '#5b678f' }, g);
    c.S('rect', { x: cx - 100, y: y + 42, width: 200, height: 62, rx: 10, fill: KUM.zemin, stroke: RENK.basinc, 'stroke-width': 3 }, g);
    const t = yazi(c, g, cx, y + 84, '', { size: 32, kalin: 700, renk: RENK.basinc });
    const bin = (v) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let deger = 0;
    const goster = (v) => { if (typeof v === 'number') { deger = v; t.textContent = bin(v) + ' Pa'; } else t.textContent = v; };
    goster(0);
    return {
      g, x1, x2, y, cx, goster, bin,
      say(v, ms = 600) { const d0 = deger; return c.tween(ms, (e) => goster(lerp(d0, v, e)), ease.out).then(() => goster(v)); },
    };
  }

  return { TUGLA, KUM, BATMA, kumKabi, tugla, yigin, batir, kaldir, duzelt, basincOlcer };
})();
