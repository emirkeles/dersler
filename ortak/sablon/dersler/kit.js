/* Ünitenin ortak çizim araçları. Birden çok kısa derste tekrar eden çizim buraya taşınır; tek derste
   kullanılan çizim o dersin dosyasında kalır. Başta küçük tut, ihtiyaç çıktıkça büyüt.
   Renkler: bir kavrama bir renk ver, ünite boyunca aynı kalsın. Tahta 1000×562 birimdir.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan. */
window.KIT = (() => {
  'use strict';
  const RENK = { a: 'var(--c1)', b: 'var(--c2)', vurgu: 'var(--c5)', cizgi: '#5b678f', soluk: 'var(--muted)' };

  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || 'var(--text)'), text: metin,
  }, p);
  const nokta = (c, p, x, y, renk, r = 11) => c.S('circle', { cx: x, cy: y, r, fill: renk }, p);
  /* Öğeyi yumuşakça görünür yapar. Zamanlama her zaman c.tween / c.wait ile kurulur. */
  const belir = (c, el, ms = 350) => { el.style.opacity = 0; return c.tween(ms, (e) => { el.style.opacity = e; }); };

  /* Sayı doğrusu; dönen x(v) bir sayının tahtadaki yatay yerini verir. */
  function sayiDogrusu(c, p, { min, max, y, x0 = 110, x1 = 890 }) {
    const x = (v) => x0 + ((v - min) / (max - min)) * (x1 - x0);
    const g = c.S('g', {}, p);
    c.S('line', { x1: x0 - 30, y1: y, x2: x1 + 30, y2: y, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    for (let v = min; v <= max; v++) {
      c.S('line', { x1: x(v), y1: y - 9, x2: x(v), y2: y + 9, stroke: RENK.cizgi, 'stroke-width': 2 }, g);
      yazi(c, g, x(v), y + 44, String(v), { size: 22, kalin: 500, renk: RENK.soluk });
    }
    return { g, x };
  }

  return { RENK, yazi, nokta, belir, sayiDogrusu };
})();
