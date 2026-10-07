/* Etkileşim: yalnızca tekrar eden SVG çizimleri. Bilimsel veri ders dosyasındadır. */
window.KIT = (() => {
  'use strict';
  const RENK = { a: 'var(--c1)', b: 'var(--c2)', vurgu: 'var(--c5)', cizgi: '#5b678f', soluk: 'var(--muted)' };
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34,
    'font-weight': o.kalin || 600, style: 'fill:' + (o.renk || 'var(--text)'), text: metin,
  }, p);
  const belir = (c, el, ms = 450) => {
    el.style.opacity = 0;
    return c.tween(ms, (e) => { el.style.opacity = e; });
  };
  function kart(c, p, baslik, satirlar, o = {}) {
    const g = c.S('g', {}, p), x = o.x || 120, y = o.y || 140, w = o.w || 760;
    c.S('rect', { x, y, width: w, height: o.h || 290, rx: 14, fill: '#162038', stroke: o.renk || RENK.a, 'stroke-width': 3 }, g);
    yazi(c, g, x + w / 2, y + 58, baslik, { size: 36, renk: o.renk || RENK.a });
    satirlar.forEach((s, i) => yazi(c, g, x + w / 2, y + 120 + i * 56, s, { size: o.size || 32 }));
    return g;
  }
  function cubuklar(c, p, adlar, degerler, { birim, baslik, kaynak, max, renk = RENK.a } = {}) {
    const g = c.S('g', {}, p), tepe = max || Math.max(...degerler) * 1.15;
    yazi(c, g, 500, 65, baslik, { size: 34 });
    const taban = 410, h = 250, adim = 760 / adlar.length;
    c.S('line', { x1: 110, y1: taban, x2: 890, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    adlar.forEach((ad, i) => {
      const x = 120 + adim * (i + 0.5), bh = degerler[i] / tepe * h;
      c.S('rect', { x: x - 42, y: taban - bh, width: 84, height: bh, rx: 4, fill: renk }, g);
      yazi(c, g, x, taban - bh - 20, String(degerler[i]).replace('.', ','), { size: 30 });
      yazi(c, g, x, 460, ad, { size: 30 });
    });
    yazi(c, g, 500, 515, birim + (kaynak ? ' · ' + kaynak : ''), { size: 28, renk: RENK.soluk });
    return g;
  }
  // E1–E3'te ikinci kez kullanılan kutu/ok çizimleri burada ortaklaşır.
  function elektronOku(c, p, x, y, yon, { renk = RENK.a, alt = 62 } = {}) {
    const g = c.S('g', {}, p), a = yon === 1 ? y + alt : y + 20, b = yon === 1 ? y + 20 : y + alt;
    c.S('path', { d: `M ${x} ${a} L ${x} ${b} M ${x - 7} ${b + yon * 10} L ${x} ${b} L ${x + 7} ${b + yon * 10}`,
      fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  }
  function orbitalKutusu(c, p, x, y, adet, { renk = RENK.a, ayni = false } = {}) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: 80, height: 82, rx: 4, fill: 'none', stroke: renk, 'stroke-width': 3 }, g);
    for (let k = 0; k < adet; k++) elektronOku(c, g, x + 24 + k * 30, y, k === 0 || ayni ? 1 : -1, { renk });
    return g;
  }
  return { RENK, yazi, belir, kart, cubuklar, elektronOku, orbitalKutusu };
})();
