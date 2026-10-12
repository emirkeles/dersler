/* Konu A (İç enerji, ısı, sıcaklık) derslerinin ortak çizim araçları: window.KIT_A. Düz vektör; izometrik figür yok.
   Ölçüler ve anlamları senaryonun okuma kılavuzundadır (plan/fizik/enerji/senaryolar/A-ic-enerji-isi-sicaklik.md).

   motor(c) → { ekle(fn(dt)), cikar(fn) }      sahne boyunca süren tek döngü (dt saniye); sahne değişince kendiliğinden durur
   titresim(T) → { genlik, sure }               sıcaklığa (°C) göre tanecik titreşimi: 10 °C → 3 birim / 700 ms … 80 °C → 13 / 350
   kap(c, p, { x, y, w=150, h=170, su, etiket, harf }) → { g, x, y, w, h, cx, alt, suKoy(h), etiketEl }
        sol üst köşesi (x, y) olan beher; su = su yüksekliği (birim); etiket = renkli() parçaları (kabın altına); harf = kabın üstüne
   pencere(c, p, mot, { cx, cy, r=75, n, T, tohum=1, bag:[x, y] }) → { g, T, kur(T), isin(c, T, ms), say(n) }
        tanecik penceresi: n tanecik yerinde titreşir; bag verilirse o noktaya iki ince çizgiyle bağlanır
        Tanecik sayısı madde miktarını gösterir (100 g su = 2 tanecik); titreşim sıcaklığı gösterir.
   termometre(c, p, { x, y, h=130, T, deger=false }) → { g, T, kur(T), git(c, T, ms), yazi }
        alt ucu (x, y) olan düz termometre, 0–100 °C; sütun sarı; deger:true ise üstünde "20 °C" yazar
   cubuk(c, p, { x, y, boy=0, etiket, hiza }) → { g, boy(w), git(c, w, ms), w }
        mor iç enerji çubuğu (sol ucu x, orta çizgisi y); yalnızca sıralamayı gösterir, yanına sayı yazılmaz
   isiOku(c, p, P, Q) → { g, ciz(P, Q) }       turuncu kalın ok ve üstünde "ısı" (gizli başlar)
   tanim(c, p, y, ad, renk, metin) → text       "ad → metin" tanım satırı (gizli başlar) */
window.KIT_A = (() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, ok, rastgele } = window.KIT;
  const { ease, lerp, clamp } = Ders;
  const CAM = '#c3cbea', IC = '#0c1226';

  function motor(c) {
    const isler = new Set();
    let basladi = false;
    const baslat = () => {
      if (basladi) return;
      basladi = true;
      (async () => {
        try {
          for (;;) {
            let onceki = 0;
            await c.tween(1000, (e) => { const dt = e - onceki; onceki = e; isler.forEach((f) => f(dt)); }, ease.linear);
          }
        } catch (_) { /* sahne değişti */ }
      })();
    };
    return { ekle(f) { isler.add(f); baslat(); return f; }, cikar(f) { isler.delete(f); } };
  }

  const TABLO = [[10, 3, 700], [20, 5, 600], [33, 6, 560], [40, 8, 500], [60, 10, 420], [70, 11, 380], [80, 13, 350]];
  function titresim(T) {
    const t = clamp(T, TABLO[0][0], TABLO[TABLO.length - 1][0]);
    for (let i = 1; i < TABLO.length; i++) {
      const a = TABLO[i - 1], b = TABLO[i];
      if (t <= b[0]) { const k = (t - a[0]) / (b[0] - a[0]); return { genlik: lerp(a[1], b[1], k), sure: lerp(a[2], b[2], k) }; }
    }
    return { genlik: 13, sure: 350 };
  }

  function kap(c, p, o) {
    const w = o.w || 150, h = o.h || 170, x = o.x, y = o.y, g = c.S('g', {}, p);
    const su = c.S('rect', { x: x + 3, width: w - 6, rx: 4, fill: RENK.soguk, 'fill-opacity': 0.3 }, g);
    const yuzey = cizgi(c, g, [x + 3, y], [x + w - 3, y], RENK.soguk, 2);
    c.S('path', { d: `M${x},${y} V${y + h - 10} Q${x},${y + h} ${x + 10},${y + h} H${x + w - 10} Q${x + w},${y + h} ${x + w},${y + h - 10} V${y}`,
      fill: 'none', stroke: CAM, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const suKoy = (sh) => {
      const s = clamp(sh, 0, h - 8), ust = y + h - 3 - s;
      su.setAttribute('y', ust); su.setAttribute('height', s);
      yuzey.setAttribute('y1', ust); yuzey.setAttribute('y2', ust); yuzey.style.visibility = s > 0 ? 'visible' : 'hidden';
    };
    suKoy(o.su == null ? h * 0.6 : o.su);
    const etiketEl = o.etiket ? renkli(c, g, x + w / 2, y + h + 36, o.etiket, { size: 22, kalin: 600 }) : null;
    if (o.harf) yazi(c, g, x + w / 2, y - 16, o.harf, { size: 28, kalin: 700 });
    return { g, x, y, w, h, cx: x + w / 2, alt: [x + w / 2, y + h], suKoy, etiketEl };
  }

  function pencere(c, p, mot, o) {
    const r = o.r || 75, cx = o.cx, cy = o.cy, g = c.S('g', {}, p);
    if (o.bag) {
      cizgi(c, g, o.bag, [cx - r * 0.7, cy - r * 0.7], RENK.ince, 1.5);
      cizgi(c, g, o.bag, [cx + r * 0.7, cy - r * 0.7], RENK.ince, 1.5);
    }
    c.S('circle', { cx, cy, r, fill: IC, stroke: RENK.ince, 'stroke-width': 2 }, g);
    const katman = c.S('g', {}, g);
    const durum = { T: o.T == null ? 20 : o.T, t: 0 };
    let tane = [];
    const say = (n) => {
      katman.textContent = '';
      const rnd = rastgele((o.tohum || 1) * 7919 + n), pr = n > 20 ? 7 : 9, alan = r - pr - 12;
      tane = [];
      for (let i = 0; i < n; i++) {
        const rr = alan * Math.sqrt((i + 0.5) / n), th = i * 2.39996 + (o.tohum || 1);
        const el = c.S('circle', { r: pr, fill: '#9cc2ff', stroke: IC, 'stroke-width': 1.5 }, katman);
        tane.push({ el, x: cx + rr * Math.cos(th), y: cy + rr * Math.sin(th), a: rnd() * Math.PI * 2, f: rnd() * Math.PI * 2 });
      }
      ciz();
    };
    const ciz = () => {
      const tt = titresim(durum.T), sinir = r - 10;
      tane.forEach((q) => {
        const s = Math.sin(q.f + (durum.t * 1000 / tt.sure) * Math.PI * 2) * tt.genlik;
        let x = q.x + s * Math.cos(q.a), y = q.y + s * Math.sin(q.a);
        const d = Math.hypot(x - cx, y - cy);
        if (d > sinir) { x = cx + (x - cx) * sinir / d; y = cy + (y - cy) * sinir / d; }
        q.el.setAttribute('cx', x); q.el.setAttribute('cy', y);
      });
    };
    mot.ekle((dt) => { durum.t += dt; ciz(); });
    say(o.n);
    return {
      g, say,
      get T() { return durum.T; },
      kur(T) { durum.T = T; ciz(); },
      isin(c2, T, ms = 1200) { const T0 = durum.T; return c2.tween(ms, (e) => { durum.T = lerp(T0, T, e); }, ease.inOut); },
    };
  }

  function termometre(c, p, o) {
    const h = o.h || 130, x = o.x, y = o.y, g = c.S('g', {}, p), ust = y - h, ic = h - 30;
    c.S('rect', { x: x - 8, y: ust, width: 16, height: h - 8, rx: 8, fill: IC, stroke: CAM, 'stroke-width': 2 }, g);
    const sutun = c.S('rect', { x: x - 4, width: 8, rx: 3, fill: RENK.sicaklik }, g);
    c.S('circle', { cx: x, cy: y - 6, r: 11, fill: RENK.sicaklik, stroke: CAM, 'stroke-width': 2 }, g);
    const yz = o.deger ? yazi(c, g, x, ust - 12, '', { size: 22, kalin: 700, renk: RENK.sicaklik }) : null;
    const durum = { T: 0 };
    const kur = (T) => {
      durum.T = T;
      const boy = 10 + ic * clamp(T, 0, 100) / 100;
      sutun.setAttribute('y', y - 14 - boy); sutun.setAttribute('height', boy);
      if (yz) yz.textContent = Math.round(T) + ' °C';
    };
    kur(o.T == null ? 20 : o.T);
    return {
      g, kur, yazi: yz,
      get T() { return durum.T; },
      git(c2, T, ms = 1200, e = ease.inOut) { const T0 = durum.T; return c2.tween(ms, (k) => kur(lerp(T0, T, k)), e); },
    };
  }

  function cubuk(c, p, o) {
    const g = c.S('g', {}, p), el = c.S('rect', { x: o.x, y: o.y - 11, width: 0, height: 22, rx: 6, fill: RENK.icEnerji }, g);
    if (o.etiket) yazi(c, g, o.hiza === 'ust' ? o.x : o.x - 12, o.hiza === 'ust' ? o.y - 22 : o.y + 8, o.etiket, { size: 22, kalin: 600, hiza: o.hiza === 'ust' ? 'start' : 'end', renk: RENK.soluk });
    const durum = { w: 0 };
    const boy = (w) => { durum.w = Math.max(0, w); el.setAttribute('width', durum.w); };
    boy(o.boy || 0);
    return { g, boy, get w() { return durum.w; }, git(c2, w, ms = 900, e = ease.out) { const w0 = durum.w; return c2.tween(ms, (k) => boy(lerp(w0, w, k)), e); } };
  }

  function isiOku(c, p, P, Q) {
    const o = ok(c, p, P, Q, RENK.isi, 7);
    const t = yazi(c, o.g, (P[0] + Q[0]) / 2, Math.min(P[1], Q[1]) - 16, 'ısı', { size: 24, kalin: 700, renk: RENK.isi });
    gizle(o.g);
    return { g: o.g, ciz(P2, Q2) { o.ciz(P2, Q2); t.setAttribute('x', (P2[0] + Q2[0]) / 2); t.setAttribute('y', Math.min(P2[1], Q2[1]) - 16); } };
  }

  function tanim(c, p, y, ad, renk, metin) {
    const t = renkli(c, p, 500, y, [[ad, renk], ' → ' + metin], { size: 26, kalin: 700 });
    gizle(t);
    return t;
  }

  return { motor, titresim, kap, pencere, termometre, cubuk, isiOku, tanim };
})();
