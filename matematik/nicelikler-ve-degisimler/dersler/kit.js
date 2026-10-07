/* Nicelikler ve Değişimler temasının ortak çizim araçları (window.KIT). Her kısa dersten önce yüklenir.
   Tahta 1000×562 birimdir; dizüstünde ≈0,82 ölçekle görünür, bu yüzden yazı en az 18 birim olmalı.
   Çizim işlevleri (duzlem, dogru, kirik, nokta, tablo…) öğeyi hemen çizer ve bir nesne döndürür;
   zamanlama isteyenler (belir, ciz, pop, katla, soyle) ilk parametre olarak sahne bağlamı c alır.
   Tahtadaki <text> rengi CSS ile verilir; `fill` özniteliği işlemez, bu araçlar `style.fill` kullanır.

   Renk rolleri (tema boyunca sabit; plan/…/senaryolar/A-dogrusal-fonksiyonlar.md):
     f     mavi     referans fonksiyon f(x) = x, denklemde birinci fonksiyon
     g     turuncu  türetilen doğru g, h; denklemde ikinci fonksiyon
     arti  yeşil    pozitif değerler, eksenin üstü
     eksi  mor      negatif değerler, eksenin altı
     sifir sarı     sıfır, kök, kesişim, vurgulanan nokta, çözüm şeridi
     mutlak turkuaz mutlak değerli grafik */
window.KIT = (() => {
  'use strict';
  const S = Ders.s, { lerp, clamp, ease } = Ders;
  const RENK = {
    f: 'var(--c1)', g: 'var(--c2)', arti: 'var(--c3)', eksi: 'var(--c4)', sifir: 'var(--c5)', mutlak: 'var(--c6)',
    yazi: 'var(--text)', soluk: 'var(--muted)', iyi: 'var(--good)', kotu: 'var(--bad)',
    eksen: '#7f8bb5', izgara: '#1b2445', kutu: '#0c1226', kenar: '#2a3768', tahta: '#10162b',
  };
  const MIN = '−';
  let sayac = 0;

  /* ---------- sayı ve kural yazımı ---------- */
  /* 2.5 → "2,5", -3 → "−3" */
  const sayi = (v, basamak = 2) => String(Math.round(v * 10 ** basamak) / 10 ** basamak).replace('.', ',').replace('-', MIN);
  /* (2, -4) → "2x − 4" · (-1, 0) → "−x" · (0, 3) → "3" · (1, 2, 't') → "t + 2" */
  function kural(a, b, x = 'x') {
    const ax = a === 0 ? '' : (a === 1 ? '' : a === -1 ? MIN : sayi(a)) + x;
    if (b === 0) return ax || '0';
    if (!ax) return sayi(b);
    return ax + (b < 0 ? ' ' + MIN + ' ' : ' + ') + sayi(Math.abs(b));
  }

  /* ---------- yazı ---------- */
  /* metin: düz yazı ya da parça dizisi: ['g(x) = ', ['2', RENK.g], 'x'].  x_{1} alt indis, x^{2} üs çizer. */
  function yaz(t, metin) {
    t.textContent = '';
    let geri = 0;
    const ekle = (str, renk, dy, kucuk) => {
      if (!str) return;
      const ts = S('tspan', {}, t); ts.textContent = str;
      if (renk) ts.style.fill = renk;
      if (dy) ts.setAttribute('dy', dy + 'em');
      if (kucuk) ts.setAttribute('font-size', '0.7em');
    };
    for (const pt of [].concat(metin)) {
      const [str, renk] = Array.isArray(pt) ? pt : [String(pt)];
      const re = /([\^_])\{([^}]*)\}/g; let son = 0, m;
      const duz = (s_) => { if (!s_) return; ekle(s_, renk, geri); geri = 0; };
      while ((m = re.exec(str))) {
        duz(str.slice(son, m.index));
        const dy = m[1] === '^' ? -0.55 : 0.35;
        ekle(m[2], renk, dy + geri / 0.7, true); geri = -dy * 0.7; son = re.lastIndex;
      }
      duz(str.slice(son));
    }
    return t;
  }
  /* o: { size=26, kalin=600, hiza='middle'|'start'|'end', renk, hale: çizgilerin üstünde okunsun diye tahta renginde kenar } */
  function yazi(p, x, y, metin, o = {}) {
    const t = S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': o.kalin || 600 }, p);
    t.style.fill = o.renk || RENK.yazi; t.style.whiteSpace = 'pre';
    if (o.hale) { t.style.paintOrder = 'stroke'; t.style.stroke = RENK.tahta; t.style.strokeWidth = '7px'; t.style.strokeLinejoin = 'round'; }
    return yaz(t, metin);
  }
  /* Yazı genişliği maxW'yi aşıyorsa puntoyu küçültür (18'in altına inmez). */
  function sigdir(t, maxW) {
    if (!t._fs) t._fs = +t.getAttribute('font-size');
    t.setAttribute('font-size', t._fs);
    const w = t.getComputedTextLength ? t.getComputedTextLength() : 0;
    if (w > maxW) t.setAttribute('font-size', Math.max(18, (t._fs * maxW) / w));
    return t;
  }

  /* ---------- animasyon ---------- */
  const par = (...ps) => Promise.all(ps);
  const gizle = (...els) => els.flat(Infinity).forEach((e) => { e.style.opacity = 0; });
  /* Öğe(ler)i yumuşakça görünür yapar; `to` ile soluklaştırmak da olur: belir(c, el, 300, 0.3). */
  function belir(c, els, ms = 350, to = 1) {
    els = [].concat(els);
    const f0 = els.map((e) => (e.style.opacity === '' ? 1 : parseFloat(e.style.opacity)));
    return c.tween(ms, (e) => els.forEach((el, i) => { el.style.opacity = lerp(f0[i], to, e); }), ease.out);
  }
  const kaybol = (c, els, ms = 300) => belir(c, els, ms, 0);
  /* Çizgi ya da yolu baştan sona çizer (kesikli çizgide yalnızca belirir). */
  function ciz(c, el, ms = 700) {
    if (el.el) el = el.el;
    if (el.getAttribute('data-kesik') || !el.getTotalLength) return belir(c, el, Math.min(ms, 400));
    const len = el.getTotalLength() || 1;
    el.setAttribute('stroke-dasharray', len); el.setAttribute('stroke-dashoffset', len); el.style.opacity = 1;
    return c.tween(ms, (e) => el.setAttribute('stroke-dashoffset', len * (1 - e)), ease.inOut).then(() => { el.removeAttribute('stroke-dasharray'); el.removeAttribute('stroke-dashoffset'); });
  }
  /* Öğeyi (cx, cy) çevresinde büyüterek getirir. */
  function pop(c, el, cx, cy, ms = 420) {
    if (el.el) el = el.el;
    return c.tween(ms, (e, t) => {
      const k = Math.max(0.001, e);
      el.setAttribute('transform', `translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`); el.style.opacity = Math.min(1, t * 3);
    }, ease.back).then(() => el.removeAttribute('transform'));
  }
  /* Altyazı; seslendirme metnini sembolleri okunur kelimelere çevirerek kendisi üretir. */
  function oku(html) {
    const d = document.createElement('div'); d.innerHTML = html.replace(/<sub>/g, ' ').replace(/<sup>2<\/sup>/g, ' kare ');
    return (d.textContent || '')
      .replace(/\|([^|]+)\|/g, ' mutlak değer $1 ').replace(/≤/g, ' küçük eşit ').replace(/≥/g, ' büyük eşit ').replace(/</g, ' küçüktür ').replace(/>/g, ' büyüktür ')
      .replace(/≠/g, ' eşit değildir ').replace(/=/g, ' eşittir ').replace(/\s*[·×]\s*/g, ' çarpı ').replace(/−/g, ' eksi ').replace(/\+/g, ' artı ')
      .replace(/∀/g, ' her ').replace(/∈/g, ' elemanıdır ').replace(/ℝ/g, ' gerçek sayılar ').replace(/∞/g, ' sonsuz ').replace(/\s+/g, ' ').trim();
  }
  const soyle = (c, html, o) => c.say(html, Object.assign({ speak: oku(html) }, o));

  /* ---------- koordinat düzlemi ----------
     duzlem(p, { x0, y0, w, h, xmin, xmax, ymin, ymax, xadim, yadim, xad, yad, xyaz, yyaz, izgara, sayilar })
     x0,y0,w,h: düzlemin tahtadaki kutusu.  xadim/yadim: ızgara aralığı.  xad/yad: eksen adı ('' ise yazılmaz).
     xsayi/ysayi: kaç birimde bir sayı yazılacağı (verilmezse 6 birimden geniş eksende iki ızgara çizgisinde bir).
     Ölçücü eksen sayılarını da tahtadaki kelimelerden sayar (sınır 25); sayıları seyrek tut.
     xyaz/yyaz: sayı etiketini üreten işlev (ölçekli eksenler için).
     Döner: { g, arka, orta, on, X, Y, … } — orta: kutuya kırpılan katman (doğrular, alanlar); on: noktalar ve yazılar. */
  function duzlem(p, o = {}) {
    const d = Object.assign({ x0: 60, y0: 34, w: 500, h: 500, xmin: -5, xmax: 5, ymin: -5, ymax: 5, xadim: 1, yadim: 1, xad: 'x', yad: 'y', izgara: true, sayilar: true, size: 17 }, o);
    const X = (v) => d.x0 + ((v - d.xmin) / (d.xmax - d.xmin)) * d.w;
    const Y = (v) => d.y0 + d.h - ((v - d.ymin) / (d.ymax - d.ymin)) * d.h;
    const g = S('g', {}, p), arka = S('g', {}, g);
    const adimlar = (min, max, adim) => { const r = []; for (let k = Math.ceil(min / adim - 1e-9); k * adim <= max + 1e-9; k++) r.push(+(k * adim).toFixed(6)); return r; };
    const xs = adimlar(d.xmin, d.xmax, d.xadim), ys = adimlar(d.ymin, d.ymax, d.yadim);
    const seyrek = (min, max, adim) => ((max - min) / adim > 6 ? 2 * adim : adim);
    const xn = adimlar(d.xmin, d.xmax, d.xsayi || seyrek(d.xmin, d.xmax, d.xadim)), yn = adimlar(d.ymin, d.ymax, d.ysayi || seyrek(d.ymin, d.ymax, d.yadim));
    if (d.izgara) {
      xs.forEach((v) => S('line', { x1: X(v), y1: d.y0, x2: X(v), y2: d.y0 + d.h, stroke: RENK.izgara, 'stroke-width': 1.5 }, arka));
      ys.forEach((v) => S('line', { x1: d.x0, y1: Y(v), x2: d.x0 + d.w, y2: Y(v), stroke: RENK.izgara, 'stroke-width': 1.5 }, arka));
    }
    const ex = Y(clamp(0, d.ymin, d.ymax)), ey = X(clamp(0, d.xmin, d.xmax));   // eksenlerin tahtadaki yeri
    S('line', { x1: d.x0 - 6, y1: ex, x2: d.x0 + d.w + 10, y2: ex, stroke: RENK.eksen, 'stroke-width': 2.5 }, arka);
    S('line', { x1: ey, y1: d.y0 + d.h + 6, x2: ey, y2: d.y0 - 10, stroke: RENK.eksen, 'stroke-width': 2.5 }, arka);
    S('path', { d: `M${d.x0 + d.w + 18},${ex} l-11,-6 v12 z`, fill: RENK.eksen }, arka);
    S('path', { d: `M${ey},${d.y0 - 18} l-6,11 h12 z`, fill: RENK.eksen }, arka);
    const sayilar = S('g', {}, arka);
    if (d.sayilar) {
      const xy = d.xyaz || sayi, yy = d.yyaz || sayi;
      xn.forEach((v) => { if (v !== 0 && X(v) < d.x0 + d.w - 4 && X(v) > d.x0 + 4) yazi(sayilar, X(v), ex + d.size + 5, xy(v), { size: d.size, kalin: 500, renk: RENK.soluk }); });
      yn.forEach((v) => { if (v !== 0 && Y(v) > d.y0 + 4 && Y(v) < d.y0 + d.h - 4) yazi(sayilar, ey - 9, Y(v) + d.size * 0.35, yy(v), { size: d.size, kalin: 500, renk: RENK.soluk, hiza: 'end' }); });
      if (d.xmin < 0 && d.ymin < 0) yazi(sayilar, ey - 9, ex + d.size + 5, '0', { size: d.size, kalin: 500, renk: RENK.soluk, hiza: 'end' });
    }
    if (d.xad) yazi(arka, d.x0 + d.w + 14, ex - 14, d.xad, { size: d.size + 3, renk: RENK.soluk, hiza: 'end' });
    if (d.yad) yazi(arka, ey + 14, d.y0 - 2, d.yad, { size: d.size + 3, renk: RENK.soluk, hiza: 'start' });
    const id = 'kd' + (++sayac);
    S('rect', { x: d.x0, y: d.y0, width: d.w, height: d.h }, S('clipPath', { id }, g));
    const orta = S('g', { 'clip-path': `url(#${id})` }, g), on = S('g', {}, g);
    return Object.assign(d, { g, arka, orta, on, sayilar, X, Y });
  }

  /* Doğru y = ax + b. o: { renk, kalin, kesik, x1, x2 (yalnızca bu aralıkta çiz), katman }
     Döner: { el, a, b, f(x), ayarla(a, b, x1?, x2?) }. Düzlemin kutusuna göre kendisi kırpılır. */
  function dogru(dz, a, b, o = {}) {
    const el = S('line', { stroke: o.renk || RENK.f, 'stroke-width': o.kalin || 4, 'stroke-linecap': 'round' }, o.katman || dz.orta);
    if (o.kesik) { el.setAttribute('stroke-dasharray', o.kesik === true ? '9 9' : o.kesik); el.setAttribute('data-kesik', 1); }
    const api = {
      el, a, b, x1: o.x1, x2: o.x2, f: (x) => api.a * x + api.b,
      ayarla(a2, b2, x1 = api.x1, x2 = api.x2) {
        api.a = a2; api.b = b2; api.x1 = x1; api.x2 = x2;
        let lo = x1 == null ? dz.xmin : x1, hi = x2 == null ? dz.xmax : x2;
        if (a2 !== 0) {   // kutunun alt ve üst kenarını aştığı yerde kes
          const u = (dz.ymin - b2) / a2, v = (dz.ymax - b2) / a2;
          lo = Math.max(lo, Math.min(u, v)); hi = Math.min(hi, Math.max(u, v));
        }
        const yok = lo > hi || (a2 === 0 && (b2 < dz.ymin || b2 > dz.ymax));
        el.style.display = yok ? 'none' : '';
        if (!yok) { el.setAttribute('x1', dz.X(lo)); el.setAttribute('y1', dz.Y(a2 * lo + b2)); el.setAttribute('x2', dz.X(hi)); el.setAttribute('y2', dz.Y(a2 * hi + b2)); }
        return api;
      },
    };
    return api.ayarla(a, b);
  }

  /* Kırık çizgi: [[x, y], …] noktalarından geçer (V grafikleri, parçalı grafikler). Döner: { el, ayarla(noktalar) }. */
  function kirik(dz, noktalar, o = {}) {
    const el = S('path', { fill: 'none', stroke: o.renk || RENK.mutlak, 'stroke-width': o.kalin || 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, o.katman || dz.orta);
    if (o.kesik) { el.setAttribute('stroke-dasharray', o.kesik === true ? '9 9' : o.kesik); el.setAttribute('data-kesik', 1); }
    const api = { el, ayarla(ns) { api.noktalar = ns; el.setAttribute('d', ns.map(([x, y], i) => (i ? 'L' : 'M') + dz.X(x).toFixed(1) + ',' + dz.Y(y).toFixed(1)).join(' ')); return api; } };
    return api.ayarla(noktalar);
  }
  /* isaret · |ax + b| + c grafiğinin üç noktası (sol uç, kırılma, sağ uç); kirik(dz, mutlakNoktalar(…)) ile çizilir. */
  function mutlakNoktalar(dz, a, b, cc = 0, isaret = 1) {
    const f = (x) => isaret * Math.abs(a * x + b) + cc, k = -b / a;
    return [[dz.xmin, f(dz.xmin)], [k, cc], [dz.xmax, f(dz.xmax)]];
  }
  /* y = ax + b doğrusunun x ekseni altında kalan yarısını yukarı katlar; sonunda |ax + b| grafiği olur. Döner: kirik nesnesi. */
  async function katla(c, dz, a, b, o = {}) {
    const k = -b / a, h = (x) => a * x + b;
    const v = kirik(dz, [[dz.xmin, h(dz.xmin)], [k, 0], [dz.xmax, h(dz.xmax)]], o);
    const sol = h(dz.xmin) < 0;   // hangi yarı eksenin altında
    await c.tween(o.ms || 1100, (e) => {
      const kat = lerp(1, -1, e);
      v.ayarla([[dz.xmin, h(dz.xmin) * (sol ? kat : 1)], [k, 0], [dz.xmax, h(dz.xmax) * (sol ? 1 : kat)]]);
    }, ease.inOut);
    return v;
  }

  /* Nokta. o: { renk, r=8, bos: içi boş (aralığa dahil olmayan uç) }. Döner: { el, x, y, git(x, y) }. */
  function nokta(dz, x, y, o = {}) {
    const renk = o.renk || RENK.sifir;
    const el = S('circle', { r: o.r || 8, fill: o.bos ? RENK.tahta : renk, stroke: renk, 'stroke-width': o.bos ? 3.5 : 0 }, o.katman || dz.on);
    const api = {
      el, git(x2, y2) { api.x = x2; api.y = y2; el.setAttribute('cx', dz.X(x2)); el.setAttribute('cy', dz.Y(y2)); return api; },
      bos(v) { el.setAttribute('fill', v ? RENK.tahta : renk); el.setAttribute('stroke-width', v ? 3.5 : 0); return api; },
    };
    return api.git(x, y);
  }
  /* Noktadan eksenlere inen kesik izler. Döner: { g, ayarla(x, y) }. */
  function iz(dz, x, y, o = {}) {
    const g = S('g', {}, o.katman || dz.orta), st = { stroke: o.renk || RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '5 6' };
    const a = S('line', st, g), b = S('line', st, g);
    const api = { g, ayarla(x2, y2) {
      a.setAttribute('x1', dz.X(x2)); a.setAttribute('y1', dz.Y(y2)); a.setAttribute('x2', dz.X(x2)); a.setAttribute('y2', dz.Y(0));
      b.setAttribute('x1', dz.X(x2)); b.setAttribute('y1', dz.Y(y2)); b.setAttribute('x2', dz.X(0)); b.setAttribute('y2', dz.Y(y2));
      return api;
    } };
    return api.ayarla(x, y);
  }
  /* Eksen üzerinde kalın şerit (tanım kümesi, görüntü kümesi, çözüm kümesi). eksen: 'x' | 'y'. Döner: { el, ayarla(v1, v2) }. */
  function serit(dz, eksen, v1, v2, o = {}) {
    const el = S('line', { stroke: o.renk || RENK.sifir, 'stroke-width': o.kalin || 9, 'stroke-linecap': 'butt', opacity: o.op == null ? 0.9 : o.op }, o.katman || dz.orta);
    const api = { el, ayarla(a, b) {
      a = clamp(a, eksen === 'x' ? dz.xmin : dz.ymin, eksen === 'x' ? dz.xmax : dz.ymax); b = clamp(b, eksen === 'x' ? dz.xmin : dz.ymin, eksen === 'x' ? dz.xmax : dz.ymax);
      if (eksen === 'x') { el.setAttribute('x1', dz.X(a)); el.setAttribute('x2', dz.X(b)); el.setAttribute('y1', dz.Y(0)); el.setAttribute('y2', dz.Y(0)); }
      else { el.setAttribute('y1', dz.Y(a)); el.setAttribute('y2', dz.Y(b)); el.setAttribute('x1', dz.X(0)); el.setAttribute('x2', dz.X(0)); }
      return api;
    } };
    return api.ayarla(v1, v2);
  }
  /* Boyalı alan: [[x, y], …] köşeli çokgen (işaret bölgeleri gibi). Döner: { el, ayarla(noktalar) }. */
  function alan(dz, noktalar, o = {}) {
    const el = S('polygon', { fill: o.renk || RENK.arti, 'fill-opacity': o.op == null ? 0.2 : o.op }, o.katman || dz.orta);
    const api = { el, ayarla(ns) { el.setAttribute('points', ns.map(([x, y]) => dz.X(x).toFixed(1) + ',' + dz.Y(y).toFixed(1)).join(' ')); return api; } };
    return api.ayarla(noktalar);
  }
  /* Düzlem koordinatıyla yazı (halesiyle birlikte; çizgilerin üstünde okunur). */
  const etiket = (dz, x, y, metin, o = {}) => yazi(o.katman || dz.on, dz.X(x) + (o.dx || 0), dz.Y(y) + (o.dy || 0), metin, Object.assign({ size: 22, hale: true }, o));

  /* ---------- tablo ----------
     tablo(p, { x, y, basliklar: ['x', 'f(x)'], n, hucre=62, yuk=46, basGen=86, size=24, renkler: [satır başlığı renkleri] })
     Döner: { g, h[satır][sütun] (yazı öğeleri, boş), yaz(satır, sütun, metin, renk), genislik, yukseklik } */
  function tablo(p, o) {
    const d = Object.assign({ hucre: 62, yuk: 46, basGen: 86, size: 24, renkler: [] }, o);
    const g = S('g', {}, p), R = d.basliklar.length, W = d.basGen + d.n * d.hucre, H = R * d.yuk;
    S('rect', { x: d.x, y: d.y, width: W, height: H, rx: 10, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    for (let r = 1; r < R; r++) S('line', { x1: d.x, y1: d.y + r * d.yuk, x2: d.x + W, y2: d.y + r * d.yuk, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    S('line', { x1: d.x + d.basGen, y1: d.y, x2: d.x + d.basGen, y2: d.y + H, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    const h = d.basliklar.map((b, r) => {
      yazi(g, d.x + d.basGen / 2, d.y + r * d.yuk + d.yuk / 2 + d.size * 0.35, b, { size: d.size, renk: d.renkler[r] || RENK.soluk });
      return Array.from({ length: d.n }, (_, k) => yazi(g, d.x + d.basGen + k * d.hucre + d.hucre / 2, d.y + r * d.yuk + d.yuk / 2 + d.size * 0.35, '', { size: d.size, kalin: 650 }));
    });
    return { g, h, genislik: W, yukseklik: H, yaz(r, k, metin, renk) { yaz(h[r][k], metin); if (renk) h[r][k].style.fill = renk; return h[r][k]; } };
  }

  /* İşaret tablosu: üstte x ve kök, altta fonksiyonun işaretleri.
     isaretTablosu(p, { x, y, w=420, ad='h(x)', kok='5', sol='+', sag='−', yuk=46 })
     Döner: { g, kok, sol, sifir, sag (yazı öğeleri; sahnede sırayla belirtilebilir), ayarla({ kok, sol, sag }) } */
  function isaretTablosu(p, o) {
    const d = Object.assign({ w: 420, ad: 'h(x)', kok: '0', sol: MIN, sag: '+', yuk: 46, basGen: 96, size: 24 }, o);
    const g = S('g', {}, p), mx = d.x + d.basGen + (d.w - d.basGen) / 2, q = (d.w - d.basGen) / 4;
    S('rect', { x: d.x, y: d.y, width: d.w, height: 2 * d.yuk, rx: 10, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    S('line', { x1: d.x, y1: d.y + d.yuk, x2: d.x + d.w, y2: d.y + d.yuk, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    S('line', { x1: d.x + d.basGen, y1: d.y, x2: d.x + d.basGen, y2: d.y + 2 * d.yuk, stroke: RENK.kenar, 'stroke-width': 1.5 }, g);
    S('line', { x1: mx, y1: d.y + d.yuk, x2: mx, y2: d.y + 2 * d.yuk, stroke: RENK.kenar, 'stroke-width': 1.5, 'stroke-dasharray': '4 5' }, g);
    const ty = (r) => d.y + r * d.yuk + d.yuk / 2 + d.size * 0.35;
    const renk = (s_) => (s_ === '+' ? RENK.arti : RENK.eksi);
    yazi(g, d.x + d.basGen / 2, ty(0), 'x', { size: d.size, renk: RENK.soluk });
    yazi(g, d.x + d.basGen / 2, ty(1), d.ad, { size: d.size, renk: RENK.soluk });
    const api = {
      g, kok: yazi(g, mx, ty(0), d.kok, { size: d.size, renk: RENK.sifir, kalin: 700 }),
      sol: yazi(g, mx - q, ty(1), d.sol, { size: d.size + 6, renk: renk(d.sol), kalin: 700 }),
      sifir: yazi(g, mx + 14, ty(1), '0', { size: d.size, renk: RENK.sifir, kalin: 700, hiza: 'start' }),
      sag: yazi(g, mx + q + 16, ty(1), d.sag, { size: d.size + 6, renk: renk(d.sag), kalin: 700 }),
      ayarla(n) {
        if (n.kok != null) yaz(api.kok, n.kok);
        if (n.sol) { yaz(api.sol, n.sol); api.sol.style.fill = renk(n.sol); }
        if (n.sag) { yaz(api.sag, n.sag); api.sag.style.fill = renk(n.sag); }
        return api;
      },
    };
    return api;
  }

  /* Parçalı yazım: ad + süslü parantez + alt alta (kural, koşul) satırları.
     parcali(p, { x, y, ad: 'T(t) =', satirlar: [['10t − 20', '0 ≤ t < 2'], …], aralik=54, size=26, kosulX=190 })
     y: ilk satırın taban çizgisi.  Döner: { g, ad, satir: [{ g, kural, kosul }], yak(i) } — yak(i) i. satırı öne çıkarır, yak(-1) hepsini açar. */
  function parcali(p, o) {
    const d = Object.assign({ aralik: 54, size: 26, kosulX: 190 }, o);
    const g = S('g', {}, p), n = d.satirlar.length, orta = d.y + ((n - 1) * d.aralik) / 2;
    const ad = yazi(g, d.x, orta, d.ad, { size: d.size, hiza: 'start' });
    const bx = d.x + (ad.getComputedTextLength ? ad.getComputedTextLength() : 90) + 26;
    const ust = d.y - d.size, alt = d.y + (n - 1) * d.aralik + d.size * 0.45, my = (ust + alt) / 2 - d.size * 0.3 + d.size * 0.3;
    S('path', { d: `M${bx + 12},${ust} q-12,0 -12,12 V${my - 12} q0,12 -12,12 q12,0 12,12 V${alt - 12} q0,12 12,12`, fill: 'none', stroke: RENK.soluk, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
    const satir = d.satirlar.map(([k, ks], i) => {
      const sg = S('g', {}, g), y = d.y + i * d.aralik;
      return { g: sg, kural: yazi(sg, bx + 26, y, k, { size: d.size, hiza: 'start' }), kosul: yazi(sg, bx + 26 + d.kosulX, y, ks, { size: d.size - 3, hiza: 'start', renk: RENK.soluk, kalin: 500 }) };
    });
    return { g, ad, satir, yak(i) { satir.forEach((s_, k) => { s_.g.style.opacity = i < 0 || k === i ? 1 : 0.3; }); } };
  }

  /* Alt alta açılan adımlar (cebirsel çözüm, ispat). adimlar(p, { x, y, aralik=56, size=28, gerekceX=330 })
     ekle(ifade, gerekçe?) yeni satırı görünmez ekler ve { g, ifade, gerekce } döndürür; belir(c, satır.g) ile açılır.
     solukla(c, i…) biten adımları soluklaştırır (yazı bütçesi: biten adım soluklaşır). */
  function adimlar(p, o) {
    const d = Object.assign({ aralik: 56, size: 28, gerekceX: 330 }, o);
    const g = S('g', {}, p), satirlar = [];
    return {
      g, satirlar,
      ekle(ifade, gerekce) {
        const sg = S('g', {}, g), y = d.y + satirlar.length * d.aralik;
        const s_ = { g: sg, ifade: yazi(sg, d.x, y, ifade, { size: d.size, hiza: 'start' }), gerekce: gerekce ? yazi(sg, d.x + d.gerekceX, y, gerekce, { size: d.size - 8, hiza: 'start', renk: RENK.soluk, kalin: 500 }) : null };
        sg.style.opacity = 0; satirlar.push(s_); return s_;
      },
      solukla(c, ...idx) { return belir(c, idx.map((i) => satirlar[i].g), 300, 0.35); },
    };
  }

  /* "Sıra sende" soru tahtası: tahtada tek kart, cevap yan sütunda seçilir.
     soruTahtasi(c, p, { x=110, y=150, w=780, h=170, size=40 }) → { g, ifade, alt, sor(ifade, o) }
     sor(ifade, { q, options, answer, hints, right, kanit, sonra, renk, tag }): doğru cevaptan sonra kartın altına `kanit` yazılır,
     `sonra` verilmişse karttaki ifade onunla değişir. await ile sırala. */
  function soruTahtasi(c, p, o = {}) {
    const d = Object.assign({ x: 110, y: 150, w: 780, h: 170, size: 40 }, o);
    const g = S('g', {}, p);
    S('rect', { x: d.x, y: d.y, width: d.w, height: d.h, rx: 18, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, g);
    const ifade = yazi(g, d.x + d.w / 2, d.y + d.h / 2 + d.size * 0.35, '', { size: d.size, kalin: 700 });
    const alt = yazi(g, d.x + d.w / 2, d.y + d.h + 58, '', { size: Math.max(22, d.size - 12), kalin: 650 });
    return {
      g, ifade, alt,
      sor(metin, q) {
        yaz(ifade, metin); sigdir(ifade, d.w - 50); yaz(alt, '');
        return c.choice({
          tag: q.tag || 'Sıra sende', q: q.q, options: q.options, answer: q.answer, hints: q.hints, right: q.right,
          onPick: (k, ok) => {
            if (q.onPick) q.onPick(k, ok);
            if (!ok) return;
            if (q.sonra) { yaz(ifade, q.sonra); sigdir(ifade, d.w - 50); }
            yaz(alt, q.kanit || ''); alt.style.fill = q.renk || RENK.iyi; sigdir(alt, d.w);
          },
        });
      },
    };
  }

  return {
    RENK, MIN, S, lerp, clamp, ease, sayi, kural, yaz, yazi, sigdir, par, gizle, belir, kaybol, ciz, pop, oku, soyle,
    duzlem, dogru, kirik, mutlakNoktalar, katla, nokta, iz, serit, alan, etiket, tablo, isaretTablosu, parcali, adimlar, soruTahtasi,
  };
})();
