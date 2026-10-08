/* Konu H (Katılar) çizim araçları: window.KIT_H. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Renkler tema boyunca aynıdır: artı yük (katyon, çekirdek) turuncu, eksi yük (anyon, elektron) mavi.
   Atom ve molekül küreleri nötr gri tonlardadır; katı türleri renkle değil adla ve çerçeveyle ayrılır. Çubuklar nötr gridir.
   Çizimler şematiktir: yüzeysel kesit, tanecik boyları oranlı değildir; birim hücre ve örgü çizilmez, düzen soluk
   hizalama çizgileriyle gösterilir.

   H, virgul    soru ve şık metinleri için formül (HTML) ve ondalık virgül
   molekul      gri küreli (uzay dolgu) H2O ve CO2 molekülü
   katiCizimi   büyüteç dairesi içinde katının tanecik düzeyi çizimi; ad: tuz, ki, cao, mgo, buz, kurubuz, sodyum, magnezyum,
                aluminyum, demir, cinko, elmas, grafit, kuvars, cam. {g, cizgiler, canlan(ms), yer(x, y, s, ms)}
   sira         satır satır / grup grup açılan çubuk, nokta ya da durum listesi (erime noktası, sertlik, iletkenlik)
   siniflaTahtasi  kart başına seçimle sınıflama tahtası (kit'teki sinifla ile birlikte kullanılır)
   yedi         yedi katının yer tutucu görselleri (resim üretilince yerine geçer)
   ingotCizimi  silisyum ingot külçesi ve güneş paneli ızgarası (düz vektör)
   termometre   küçük termometre, isteğe bağlı çentikli
   yukEtiket    yük renginde küçük disk ve yanında etiket
   mini         soru şıkları ve soru metinleri için küçük tanecik çizimi (HTML dizgesi) */
window.KIT_H = (() => {
  'use strict';
  const { RENK, yazi, cizgi, koy, kutu, gizle, belir, par, rastgele, yuk, metal } = window.KIT;
  const { ease, lerp } = Ders;
  const R0 = 120, CUBUK = '#a7adbd';
  let sayac = 0;

  const H = (m) => m.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');
  const virgul = (n) => String(n).replace('.', ',');

  /* ---- gri küreli moleküller ---- */
  const KURE = { C: { r: 46, g: '#9c9c9c' }, O: { r: 40, g: '#bdbdbd' }, H: { r: 30, g: '#e6e6e6' } };
  const MODEL = { H2O: [['O', 0, -26], ['H', -49, 12], ['H', 49, 12]], CO2: [['C', 0, 0], ['O', -72, 0], ['O', 72, 0]] };
  function molekul(c, p, ad, x, y, k = 1) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p);
    MODEL[ad].forEach(([s, ax, ay]) => c.S('circle', { cx: ax * k, cy: ay * k, r: KURE[s].r * k, fill: KURE[s].g, stroke: '#4d4d4d', 'stroke-width': Math.max(1.2, 1.6 * k) }, g));
    return g;
  }

  /* ---- katı tanımları ---- */
  const KATI = {
    tuz: { tur: 'iyon', ra: 15, re: 19 }, ki: { tur: 'iyon', ra: 17, re: 20 }, cao: { tur: 'iyon', ra: 14, re: 16 }, mgo: { tur: 'iyon', ra: 13, re: 16 },
    buz: { tur: 'mol', mol: 'H2O', mk: 0.33 }, kurubuz: { tur: 'mol', mol: 'CO2', mk: 0.24 },
    sodyum: { tur: 'metal', n: 1 }, magnezyum: { tur: 'metal', n: 2 }, aluminyum: { tur: 'metal', n: 3 }, demir: { tur: 'metal', n: 2 }, cinko: { tur: 'metal', n: 2 },
    elmas: { tur: 'ag', bicim: 'kare' }, grafit: { tur: 'ag', bicim: 'altigen' }, kuvars: { tur: 'ag', bicim: 'kare2' }, cam: { tur: 'ag', bicim: 'rastgele' },
  };
  const KAR = { r: 13, g: '#a8a8a8' }, SI = { r: 15, g: '#9c9c9c' }, OX = { r: 10.5, g: '#d9d9d9' };

  /* Büyüteç dairesi içinde katının çizimi. (cx, cy) merkez, r yarıçap. o: { sap: büyüteç sapı, cizgi: hizalama çizgileri baştan görünür }.
     Dönen: { g, cizgiler (hizalama çizgileri; düzensiz katıda boş), canlan(ms) (tanecikler titreşir; metalde elektronlar dolaşır),
              yer(x, y, s, ms) (daireyi taşır ve ölçekler) }. Hizalama çizgileri taneciklerin hepsinden geçer. */
  function katiCizimi(c, p, ad, cx, cy, r, o = {}) {
    const t = KATI[ad], k = r / R0, id = 'kp' + (++sayac);
    const g = c.S('g', { transform: `translate(${cx},${cy})` }, p);
    if (o.sap) cizgi(c, g, [r * 0.74, r * 0.74], [r * 1.3, r * 1.3], RENK.kenarlik, Math.max(6, r * 0.11));
    c.S('circle', { r, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3 }, g);
    const ic = c.S('g', { transform: `scale(${k})` }, g);
    const cp = c.S('clipPath', { id }, ic); c.S('circle', { r: R0 - 2 }, cp);
    const kg = c.S('g', { 'clip-path': `url(#${id})` }, ic);
    const gc = c.S('g', {}, kg), gb = c.S('g', {}, kg), gp = c.S('g', {}, kg);
    const P = [], B = [], taban = [];
    let m = null;
    const atom = (x, y, tip) => {
      const el = c.S('circle', { cx: x, cy: y, r: tip.r, fill: tip.g, stroke: '#4d4d4d', 'stroke-width': 1.4 }, gp);
      P.push({ x, y, X: x, Y: y, set(a, b) { el.setAttribute('cx', a); el.setAttribute('cy', b); } });
    };
    const bagla = (lim) => {
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
        if (Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y) <= lim) B.push({ i, j, el: cizgi(c, gb, [P[i].x, P[i].y], [P[j].x, P[j].y], RENK.cizgi, 3) });
      }
    };
    const ofs = [-92, -46, 0, 46, 92];

    if (t.tur === 'iyon') {
      ofs.forEach((y, j) => ofs.forEach((x, i) => {
        if (Math.hypot(x, y) > 128) return;
        const arti = (i + j) % 2 === 0, q = yuk(c, gp, [x, y], arti ? 'arti' : 'eksi', arti ? t.ra : t.re);
        P.push({ x, y, X: x, Y: y, set(a, b) { q.tasi([a, b]); } });
      }));
    } else if (t.tur === 'mol') {
      [-70, 0, 70].forEach((y) => [-70, 0, 70].forEach((x) => {
        const mg = molekul(c, gp, t.mol, x, y, t.mk);
        P.push({ x, y, X: x, Y: y, set(a, b) { mg.setAttribute('transform', `translate(${a},${b})`); } });
      }));
    } else if (t.tur === 'metal') {
      m = metal(c, gp, { x: -84, y: -84, w: 168, h: 168, sutun: 3, satir: 3, r: 18, yukSayisi: t.n, re: 5, dagit: 1, tohum: 5 + t.n });
      const rn = rastgele(40 + t.n);
      m.elektronlar.forEach((e) => {
        const i = 1 + Math.floor(rn() * 2), j = 1 + Math.floor(rn() * 2);
        e.merkez = [-84 + 56 * i, -84 + 56 * j]; e.gx = 56 * (0.3 + rn() * 0.6); e.gy = 56 * (0.3 + rn() * 0.6);
      });
      m.dagit(1);
      const gi = m.g.firstChild;
      m.iyonlar.forEach((q) => {
        cizgi(c, gi, [q[0] - 7, q[1]], [q[0] + 7, q[1]], KOYU(), 3); cizgi(c, gi, [q[0], q[1] - 7], [q[0], q[1] + 7], KOYU(), 3);
        taban.push(q);
      });
    } else if (t.bicim === 'kare' || t.bicim === 'kare2') {
      ofs.forEach((y, j) => ofs.forEach((x, i) => {
        if (Math.hypot(x, y) > 128) return;
        atom(x, y, t.bicim === 'kare' ? KAR : ((i + j) % 2 === 0 ? SI : OX));
      }));
      bagla(47);
    } else if (t.bicim === 'altigen') {
      for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) {
        const x = 46 * i + (Math.abs(j) % 2) * 23, y = 40 * j;
        if (Math.hypot(x, y) > 126) continue;
        atom(x, y, KAR);
      }
      bagla(47);
    } else {
      /* cam: aynı iki cins atom, gelişigüzel konum; hizalama çizgisi yok */
      const rn = rastgele(23), ns = [];
      for (let d = 0; d < 400 && ns.length < 24; d++) {
        const a = rn() * 6.2832, rr = 112 * Math.sqrt(rn()), x = rr * Math.cos(a), y = rr * Math.sin(a);
        if (ns.every((q) => Math.hypot(q[0] - x, q[1] - y) >= 34)) ns.push([x, y]);
      }
      ns.forEach(([x, y]) => atom(x, y, rn() < 0.38 ? SI : OX));
      const deg = P.map(() => 0);
      const cift = [];
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) cift.push([Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y), i, j]);
      cift.sort((a, b) => a[0] - b[0]).forEach(([d, i, j]) => {
        if (d > 62 || deg[i] >= 3 || deg[j] >= 3) return;
        deg[i]++; deg[j]++;
        B.push({ i, j, el: cizgi(c, gb, [P[i].x, P[i].y], [P[j].x, P[j].y], RENK.cizgi, 3) });
      });
    }

    /* hizalama çizgileri: taneciklerin hepsinden geçer; düzensiz katıda yoktur */
    if (ad !== 'cam') {
      const pts = m ? taban : P.map((q) => [q.x, q.y]);
      (t.bicim === 'altigen' ? [0, 60, 120] : [0, 90]).forEach((a) => {
        const th = (a * Math.PI) / 180, nx = -Math.sin(th), ny = Math.cos(th), gor = new Set();
        pts.forEach(([x, y]) => {
          const d = x * nx + y * ny, kk = Math.round(d * 2);
          if (gor.has(kk)) return; gor.add(kk);
          cizgi(c, gc, [nx * d - Math.cos(th) * 170, ny * d - Math.sin(th) * 170], [nx * d + Math.cos(th) * 170, ny * d + Math.sin(th) * 170], RENK.ince, 2, { 'stroke-opacity': 0.85 });
        });
      });
    }
    if (!o.cizgi) gizle(gc);

    const rn2 = rastgele(77), faz = P.map(() => ({ f: 1.2 + rn2() * 0.8, a: rn2() * 6.28, b: rn2() * 6.28 }));
    const canlan = (ms) => {
      if (m) return m.dolas(ms);
      return c.tween(ms, (e) => {
        const s = (e * ms) / 1000, env = Math.min(1, e * 6, (1 - e) * 6) * 3.2;
        P.forEach((q, i) => {
          const f = faz[i];
          q.X = q.x + env * Math.sin(6.28 * f.f * s + f.a); q.Y = q.y + env * Math.sin(6.28 * f.f * 1.13 * s + f.b);
          q.set(q.X, q.Y);
        });
        B.forEach((b) => koy(b.el, [P[b.i].X, P[b.i].Y], [P[b.j].X, P[b.j].Y]));
      }, ease.linear);
    };
    let gx = cx, gy = cy, gs = 1;
    const yer = (x, y, s = gs, ms = 700) => {
      const x0 = gx, y0 = gy, s0 = gs; gx = x; gy = y; gs = s;
      return c.tween(ms, (e) => g.setAttribute('transform', `translate(${lerp(x0, x, e)},${lerp(y0, y, e)}) scale(${lerp(s0, s, e)})`));
    };
    return { g, cizgiler: gc, canlan, yer, r };
  }
  const KOYU = () => '#10162b';

  /* ---- satır satır açılan çubuk, nokta ya da durum listesi ----
     o: { satirlar: [{ ad, tur, deger, durum }], mod: 'cubuk' | 'nokta' | 'durum', min, max, genis, ticks, fmt, yer }
     ac(i, ms) satırı açar (çubuk uzar); soluk(idx[], h) satırları soluklaştırır; vurgula(i, a) satırın değerini vurgular. */
  const SIRA = { xAd: 215, xTur: 232, xBar: 350, y0: 40, dy: 40 };
  function sira(c, p, o) {
    const S = Object.assign({}, SIRA, o.yer || {}), g = c.S('g', {}, p), mod = o.mod || 'cubuk', n = o.satirlar.length;
    const olcek = mod === 'durum' ? 0 : (o.genis || 480) / (o.max - o.min), x = (v) => S.xBar + (v - o.min) * olcek;
    const fmt = o.fmt || String;
    const eksen = c.S('g', {}, g);
    if (mod !== 'durum') {
      const yE = S.y0 + (n - 1) * S.dy + 28;
      cizgi(c, eksen, [S.xBar, S.y0 - 20], [S.xBar, yE], RENK.ince, 2); cizgi(c, eksen, [S.xBar, yE], [x(o.max), yE], RENK.ince, 2);
      o.ticks.forEach((v) => {
        cizgi(c, eksen, [x(v), yE - 6], [x(v), yE + 6], RENK.ince, 2);
        yazi(c, eksen, x(v), yE + 32, fmt(v), { size: 18, kalin: 500, renk: RENK.soluk });
      });
      eksen.yE = yE;
    }
    const satirlar = o.satirlar.map((s, i) => {
      const y = S.y0 + i * S.dy, rg = c.S('g', {}, g), q = { g: rg, s, y };
      yazi(c, rg, S.xAd, y + 7, s.ad, { hiza: 'end', size: 22, kalin: 600 });
      yazi(c, rg, S.xTur, y + 6, s.tur, { hiza: 'start', size: 18, kalin: 500, renk: RENK.soluk });
      if (mod === 'durum') {
        const var_ = s.durum === 'iletir';
        q.deger = yazi(c, rg, S.xBar, y + 8, s.durum, { hiza: 'start', size: var_ ? 24 : 22, kalin: var_ ? 700 : 500, renk: var_ ? RENK.yazi : RENK.soluk });
      } else if (mod === 'cubuk') {
        q.bar = c.S('rect', { x: S.xBar, y: y - 9, width: 0, height: 18, rx: 4, fill: CUBUK }, rg);
        q.w = Math.max(2, x(s.deger) - S.xBar);
        q.deger = yazi(c, rg, x(s.deger) + 14, y + 8, fmt(s.deger) + (o.birim || ''), { hiza: 'start', size: 22, kalin: 600 });
        q.deger.setAttribute('data-x', x(s.deger) + 14);
        q.deger.style.opacity = 0;
      } else {
        q.bar = cizgi(c, rg, [S.xBar, y], [S.xBar, y], CUBUK, 3);
        q.nokta = c.S('circle', { cx: S.xBar, cy: y, r: 9, fill: CUBUK, stroke: RENK.yazi, 'stroke-width': 2 }, rg);
        q.deger = yazi(c, rg, x(s.deger) + 20, y + 8, fmt(s.deger), { hiza: 'start', size: 22, kalin: 600 });
        q.deger.style.opacity = 0;
      }
      gizle(rg);
      return q;
    });
    const ac = (i, ms = 500) => {
      const q = satirlar[i];
      if (!q.bar) return belir(c, q.g, ms);
      if (mod === 'cubuk') {
        return par(belir(c, q.g, ms), c.tween(ms * 1.8, (e) => {
          q.bar.setAttribute('width', q.w * e); q.deger.setAttribute('x', S.xBar + q.w * e + 14); q.deger.style.opacity = Math.min(1, e * 3);
        }, ease.out));
      }
      return par(belir(c, q.g, ms), c.tween(ms * 1.8, (e) => {
        const X = S.xBar + (x(q.s.deger) - S.xBar) * e;
        koy(q.bar, [S.xBar, q.y], [X, q.y]); q.nokta.setAttribute('cx', X); q.deger.setAttribute('x', X + 20); q.deger.style.opacity = Math.min(1, e * 3);
      }, ease.out));
    };
    const soluk = (idx, h = 0.4) => belir(c, idx.map((i) => satirlar[i].g), 400, h);
    const vurgula = (i, a) => {
      const q = satirlar[i];
      if (q.deger) q.deger.style.fill = a ? RENK.vurgu : RENK.yazi;
      if (q.bar && mod === 'cubuk') q.bar.setAttribute('fill', a ? RENK.vurgu : CUBUK);
      if (q.nokta) q.nokta.setAttribute('fill', a ? RENK.vurgu : CUBUK);
    };
    /* eksende dikey kesikli işaret (örn. sertlikte 3,5) */
    const isaret = (v, etiket) => {
      const ig = c.S('g', {}, g), yE = eksen.yE;
      cizgi(c, ig, [x(v), S.y0 - 22], [x(v), yE], RENK.vurgu, 2.5, { 'stroke-dasharray': '6 6' });
      yazi(c, ig, x(v), S.y0 - 28, etiket, { size: 20, kalin: 700, renk: RENK.vurgu });
      g.insertBefore(ig, g.firstChild); gizle(ig); return ig;
    };
    gizle(eksen);
    return { g, eksen, satirlar, ac, soluk, vurgula, isaret, x };
  }

  /* ---- kart başına seçimle sınıflama tahtası ----
     o: { kutular: [{ x, y, w, h, baslik, kol, ust, dy, punto }], kart: { x, y } (kartın adının yazıldığı yer), kartPunto, chipPunto,
          kartCiz(k, g) → kartın adını taşıyan <text> öğesini döndürür } */
  function siniflaTahtasi(c, p, o) {
    const kutularEl = o.kutular.map((q) => {
      const g = c.S('g', {}, p);
      kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      yazi(c, g, q.x + q.w / 2, q.y + q.h - 18, q.baslik, { size: q.punto || 24, kalin: 700 });
      return { g, n: 0 };
    });
    let kartG = null, adEl = null;
    return {
      kutularEl,
      async sec(i, k) {
        kartG = c.S('g', {}, p); gizle(kartG);
        adEl = o.kartCiz(k, kartG);
        await belir(c, kartG, 350);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kutularEl[k.kutu], kol = q.kol || 2, cw = q.w / kol, sat = Math.floor(e.n / kol), sut = e.n % kol;
        const hx = q.x + cw * (sut + 0.5), hy = q.y + (q.ust || 58) + sat * (q.dy || 48);
        e.n++;
        const x0 = +adEl.getAttribute('x'), y0 = +adEl.getAttribute('y'), f0 = +adEl.getAttribute('font-size');
        p.appendChild(adEl);
        await c.tween(250, (e2) => { [...kartG.children].forEach((ch) => { ch.style.opacity = 1 - e2; }); });
        kartG.remove();
        await c.tween(550, (e2) => { adEl.setAttribute('x', lerp(x0, hx, e2)); adEl.setAttribute('y', lerp(y0, hy, e2)); adEl.setAttribute('font-size', lerp(f0, o.chipPunto || 24, e2)); });
      },
    };
  }

  /* ---- yedi katının yer tutucu görselleri ----
     Her biri köşeleri yuvarlak bir kutu içinde yalın bir simge. Gerçek resim üretilince kutunun yerine geçer.
     Yer: x = 12 + 142·i, y = 50, genişlik 124, yükseklik 130; adı kutunun altında. */
  const YEDI = [
    { ad: ['sofra', 'tuzu'], ciz(c, g, cx, cy) { [[-30, 6], [2, 6], [-14, -26]].forEach(([dx, dy]) => c.S('rect', { x: cx + dx, y: cy + dy, width: 28, height: 28, rx: 3, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, g)); } },
    { ad: ['çelik', 'kaşık'], ciz(c, g, cx, cy) { c.S('ellipse', { cx, cy: cy - 22, rx: 20, ry: 26, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, g); cizgi(c, g, [cx, cy + 4], [cx, cy + 46], RENK.cizgi, 7); } },
    { ad: ['bilgisayar', 'ekranı'], ciz(c, g, cx, cy) { c.S('rect', { x: cx - 36, y: cy - 36, width: 72, height: 48, rx: 5, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, g); cizgi(c, g, [cx, cy + 12], [cx, cy + 30], RENK.cizgi, 3); cizgi(c, g, [cx - 22, cy + 32], [cx + 22, cy + 32], RENK.cizgi, 4); } },
    { ad: ['kurşun', 'kalem ucu'], ciz(c, g, cx, cy) { c.S('rect', { x: cx - 14, y: cy - 46, width: 28, height: 54, rx: 3, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, g); c.S('path', { d: `M${cx - 14},${cy + 8} L${cx},${cy + 40} L${cx + 14},${cy + 8} Z`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g); } },
    { ad: ['elmas'], ciz(c, g, cx, cy) { c.S('path', { d: `M${cx - 34},${cy - 8} L${cx - 18},${cy - 30} L${cx + 18},${cy - 30} L${cx + 34},${cy - 8} L${cx},${cy + 34} Z M${cx - 34},${cy - 8} L${cx + 34},${cy - 8}`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g); } },
    { ad: ['kar', 'tanesi'], ciz(c, g, cx, cy) { [0, 60, 120].forEach((a) => { const t = (a * Math.PI) / 180; cizgi(c, g, [cx - 34 * Math.cos(t), cy - 34 * Math.sin(t)], [cx + 34 * Math.cos(t), cy + 34 * Math.sin(t)], RENK.cizgi, 3.5); }); } },
    { ad: ['cam'], ciz(c, g, cx, cy) { c.S('path', { d: `M${cx - 26},${cy - 32} L${cx + 26},${cy - 32} L${cx + 19},${cy + 34} L${cx - 19},${cy + 34} Z`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g); cizgi(c, g, [cx - 12, cy - 18], [cx - 9, cy + 18], RENK.cizgi, 3); } },
  ];
  const YER = { x0: 12, ara: 142, y: 50, w: 124, h: 130 };
  function yedi(c, p) {
    const kutular = YEDI.map((s, i) => {
      const x = YER.x0 + i * YER.ara, g = c.S('g', {}, p);
      kutu(c, g, x, YER.y, YER.w, YER.h, { rx: 16 });
      s.ciz(c, g, x + YER.w / 2, YER.y + YER.h / 2);
      s.ad.forEach((satir, j) => yazi(c, g, x + YER.w / 2, YER.y + YER.h + 30 + j * 24, satir, { size: 20, kalin: 600 }));
      return g;
    });
    return { kutular, YER };
  }

  /* ---- silisyum ingot külçesi ve güneş paneli (düz vektör) ---- */
  function ingotCizimi(c, p, x, y) {
    const g = c.S('g', {}, p), kulce = c.S('g', {}, g), panel = c.S('g', {}, g);
    c.S('path', { d: `M${x},${y + 60} L${x + 80},${y} L${x + 300},${y} L${x + 380},${y + 60} L${x + 300},${y + 120} L${x + 80},${y + 120} Z`, fill: RENK.metal, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, kulce);
    cizgi(c, kulce, [x + 80, y + 6], [x + 80, y + 114], RENK.yuzey, 3); cizgi(c, kulce, [x + 300, y + 6], [x + 300, y + 114], RENK.yuzey, 3);
    const px = x + 470, py = y - 40, cw = 52, ch = 40;
    c.S('rect', { x: px - 8, y: py - 8, width: cw * 4 + 16, height: ch * 4 + 16, rx: 8, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3 }, panel);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) c.S('rect', { x: px + i * cw + 2, y: py + j * ch + 2, width: cw - 4, height: ch - 4, rx: 3, fill: '#2a3567', stroke: RENK.ince, 'stroke-width': 1.5 }, panel);
    return { g, kulce, panel };
  }

  /* ---- küçük termometre; seviye (0–1) verilirse o yükseklikte çentik ---- */
  function termometre(c, p, x, y, seviye) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 5, y: y - 40, width: 10, height: 44, rx: 5, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
    c.S('circle', { cx: x, cy: y + 8, r: 10, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
    if (seviye != null) cizgi(c, g, [x - 12, y + 2 - 40 * seviye], [x + 12, y + 2 - 40 * seviye], RENK.vurgu, 3);
    return g;
  }

  /* ---- yük renginde küçük disk ve etiket (etiket üs/indis alabilir) ---- */
  function yukEtiket(c, p, x, y, tur, etiket, o = {}) {
    const g = c.S('g', {}, p);
    if (tur === 'arti' || tur === 'eksi') yuk(c, g, [x, y], tur, o.r || 11);
    else c.S('circle', { cx: x, cy: y, r: o.r || 11, fill: tur, stroke: '#4d4d4d', 'stroke-width': 1.5 }, g);
    yazi(c, g, x + (o.r || 11) + 10, y + 8, etiket, { hiza: 'start', size: o.size || 24, kalin: 700, math: true });
    return g;
  }

  /* ---- soru metinlerine konan küçük tanecik çizimi (HTML dizgesi): 'ki' düzenli iyonlar, 'kuvars', 'cam' ---- */
  function mini(ad) {
    const W = 132, Hh = 100;
    let s = `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" style="vertical-align:middle;background:#18213f;border-radius:12px;border:2px solid #33437f">`;
    if (ad === 'ki') {
      for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
        const x = 24 + i * 28, y = 22 + j * 28, a = (i + j) % 2 === 0, r = a ? 10 : 12;
        s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${a ? 'var(--c2)' : 'var(--c1)'}"/><path d="M${x - 4},${y} h8${a ? ` M${x},${y - 4} v8` : ''}" stroke="#10162b" stroke-width="2.4" stroke-linecap="round"/>`;
      }
    } else if (ad === 'kuvars') {
      const pts = [];
      for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pts.push([24 + i * 28, 22 + j * 28, (i + j) % 2 === 0]);
      pts.forEach(([x, y], a) => pts.forEach(([x2, y2], b) => { if (b > a && Math.hypot(x - x2, y - y2) < 30) s += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#c3cbea" stroke-width="2"/>`; }));
      pts.forEach(([x, y, si]) => { s += `<circle cx="${x}" cy="${y}" r="${si ? 10 : 7}" fill="${si ? '#9c9c9c' : '#d9d9d9'}" stroke="#4d4d4d"/>`; });
    } else {
      const pts = [[16, 18, 1], [44, 30, 0], [70, 14, 0], [104, 24, 1], [22, 54, 0], [52, 62, 1], [82, 48, 0], [112, 62, 0], [34, 86, 1], [74, 84, 0], [102, 88, 1]];
      [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [1, 6], [6, 3], [6, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 10], [9, 10]].forEach(([a, b]) => { s += `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="#c3cbea" stroke-width="2"/>`; });
      pts.forEach(([x, y, si]) => { s += `<circle cx="${x}" cy="${y}" r="${si ? 10 : 7}" fill="${si ? '#9c9c9c' : '#d9d9d9'}" stroke="#4d4d4d"/>`; });
    }
    return s + '</svg>';
  }

  return { H, virgul, molekul, katiCizimi, sira, siniflaTahtasi, yedi, YER, ingotCizimi, termometre, yukEtiket, mini, CUBUK };
})();
