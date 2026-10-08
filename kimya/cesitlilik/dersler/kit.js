/* Çeşitlilik temasının ortak çizim araçları (window.KIT). Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Renkler tema boyunca aynı kalır: artı yük (çekirdek, katyon) turuncu, eksi yük (elektron, anyon) mavi,
   çekme kuvveti yeşil, itme kuvveti kırmızı. Noktalar [x, y] dizisidir.
   Kuvvet okları şematiktir: boyları yalnızca büyüklük sırasını gösterir; tahtaya kuvvet değeri yazılmaz.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan. */
window.KIT = (() => {
  'use strict';
  const RENK = {
    arti: 'var(--c2)', eksi: 'var(--c1)', cekme: 'var(--c3)', itme: 'var(--bad)', vurgu: 'var(--c5)',
    cizgi: '#c3cbea', ince: '#5b678f', soluk: 'var(--muted)', yazi: 'var(--text)',
    iyi: 'var(--good)', kotu: 'var(--bad)', yuzey: '#18213f', kenarlik: '#33437f', metal: '#8f9bc4',
  };

  /* ---- geometri ---- */
  const uz = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const yon = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]);
  const ileri = (P, a, d) => [P[0] + d * Math.cos(a), P[1] + d * Math.sin(a)];
  /* Aynı tohumla hep aynı diziyi veren sayı üreteci: çizimler her açılışta aynı görünür. */
  const rastgele = (tohum) => () => { tohum = (tohum * 1664525 + 1013904223) % 4294967296; return tohum / 4294967296; };

  /* ---- temel çizim ---- */
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  /* o.math verilirse metin üs ve indisle çizilir: 'Na^{+}', 'H_{2}O'. */
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || RENK.yazi), [o.math ? 'math' : 'text']: metin,
  }, p);
  /* Parçaları ayrı renkte tek satır yazı: parcalar = ['düz', ['renkli', renk], …]. */
  const parcaKoy = (c, t, parcalar) => {
    t.textContent = '';
    parcalar.forEach((q) => { const [m, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m }, t); if (r) ts.style.fill = r; });
  };
  const renkli = (c, p, x, y, parcalar, o = {}) => { const t = yazi(c, p, x, y, '', o); parcaKoy(c, t, parcalar); return t; };
  const cizgi = (c, p, P, Q, renk = RENK.cizgi, w = 3, o = {}) => c.S('line', Object.assign({
    x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: renk, 'stroke-width': w, 'stroke-linecap': 'round',
  }, o), p);
  const koy = (el, P, Q) => { el.setAttribute('x1', P[0]); el.setAttribute('y1', P[1]); el.setAttribute('x2', Q[0]); el.setAttribute('y2', Q[1]); };
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', {
    x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx, fill: o.dolgu || RENK.yuzey, stroke: o.renk || RENK.kenarlik, 'stroke-width': o.w == null ? 2 : o.w,
  }, p);
  const gizle = (...els) => els.flat().forEach((e) => { e.style.opacity = 0; });
  /* Öğeyi (ya da öğeleri) şimdiki saydamlığından hedefe götürür. Zamanlama her zaman c.tween ile kurulur. */
  const belir = (c, el, ms = 350, hedef = 1) => {
    const es = liste(el), bas = es.map((e) => (e.style.opacity === '' ? (hedef > 0 ? 0 : 1) : +e.style.opacity));
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = bas[i] + (hedef - bas[i]) * e; }));
  };
  const par = (...ps) => Promise.all(ps);

  /* Ucu oklu doğru parçası; ciz(P, Q) ile yeniden yerleştirilir. Boyu 4 birimden kısaysa görünmez. */
  function ok(c, p, P, Q, renk = RENK.yazi, w = 4) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P2, Q2) => {
      if (uz(P2, Q2) < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const a = yon(P2, Q2), s1 = ileri(Q2, a + 2.6, 15), s2 = ileri(Q2, a - 2.6, 15);
      koy(hat, P2, ileri(Q2, a, -9)); uc.setAttribute('d', `M${Q2[0]},${Q2[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    ciz(P, Q);
    return { g, ciz };
  }
  /* Halka içinde onay ('ok') ya da çarpı ('no'). */
  function isaret(c, p, x, y, tur, r = 14) {
    const g = c.S('g', {}, p), renk = tur === 'ok' ? RENK.iyi : RENK.kotu;
    c.S('circle', { cx: x, cy: y, r, fill: '#10162b', stroke: renk, 'stroke-width': 3 }, g);
    c.S('path', {
      d: tur === 'ok' ? `M${x - 6},${y} l4,5 l8,-10` : `M${x - 5},${y - 5} l10,10 M${x + 5},${y - 5} l-10,10`,
      fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }, g);
    return g;
  }

  /* ---- yüklü tanecikler ---- */
  /* İçinde işareti yazan yüklü tanecik. tur: 'arti' (çekirdek, katyon) ya da 'eksi' (elektron, anyon). */
  function yuk(c, p, P, tur, r = 15) {
    const g = c.S('g', { transform: `translate(${P[0]},${P[1]})` }, p);
    c.S('circle', { cx: 0, cy: 0, r, fill: RENK[tur] }, g);
    const s = Math.max(4, r * 0.5), cz = { stroke: '#10162b', 'stroke-width': Math.max(2.5, r * 0.22), 'stroke-linecap': 'round' };
    c.S('line', Object.assign({ x1: -s, y1: 0, x2: s, y2: 0 }, cz), g);
    if (tur === 'arti') c.S('line', Object.assign({ x1: 0, y1: -s, x2: 0, y2: s }, cz), g);
    const yer = P.slice();
    return { g, yer, tasi(Q) { yer[0] = Q[0]; yer[1] = Q[1]; g.setAttribute('transform', `translate(${Q[0]},${Q[1]})`); } };
  }
  /* Hidrojen benzeri atom: soluk elektron bulutu, ortada çekirdek, e yönünde (radyan) duran tek elektron.
     tasi(P) atomu, elektronaGit(a, d) elektronu bulutun içinde yerleştirir. */
  function atom(c, p, P, o = {}) {
    const r = o.r || 78, g = c.S('g', {}, p), yer = P.slice();
    let ea = o.e == null ? -0.9 : o.e, ed = o.ed == null ? r * 0.62 : o.ed;
    const bulut = c.S('circle', { r, fill: RENK.eksi, 'fill-opacity': 0.1, stroke: RENK.eksi, 'stroke-opacity': 0.45, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, g);
    const cekirdek = yuk(c, g, P, 'arti', o.rc || 16), elektron = yuk(c, g, P, 'eksi', o.re || 10);
    const ciz = () => {
      bulut.setAttribute('cx', yer[0]); bulut.setAttribute('cy', yer[1]);
      cekirdek.tasi(yer); elektron.tasi(ileri(yer, ea, ed));
    };
    ciz();
    return {
      g, bulut, cekirdek, elektron, yer,
      tasi(Q) { yer[0] = Q[0]; yer[1] = Q[1]; ciz(); },
      elektronaGit(a, d = ed) { ea = a; ed = d; ciz(); },
    };
  }
  /* İki tanecik arasındaki etkileşimi gösterir. 'cekme': iki ok birbirine doğru (yeşil);
     'itme': iki ok birbirinden uzağa (kırmızı), araları ince kesikli çizgiyle bağlanır. b: tanecik yarıçapı payı. */
  function etkilesim(c, p, P, Q, tur, o = {}) {
    const g = c.S('g', {}, p), renk = tur === 'cekme' ? RENK.cekme : RENK.itme, a = yon(P, Q), b = o.b == null ? 20 : o.b, boy = o.boy || 46;
    if (tur === 'cekme') {
      const d = Math.min(boy, (uz(P, Q) - 2 * b) / 2 - 6);
      ok(c, g, ileri(P, a, b), ileri(P, a, b + d), renk); ok(c, g, ileri(Q, a, -b), ileri(Q, a, -b - d), renk);
      cizgi(c, g, ileri(P, a, b + d), ileri(Q, a, -b - d), renk, 2, { 'stroke-dasharray': '2 8', 'stroke-opacity': 0.7 });
    } else {
      cizgi(c, g, ileri(P, a, b), ileri(Q, a, -b), renk, 2, { 'stroke-dasharray': '2 8', 'stroke-opacity': 0.7 });
      ok(c, g, ileri(P, a, -b), ileri(P, a, -b - boy), renk); ok(c, g, ileri(Q, a, b), ileri(Q, a, b + boy), renk);
    }
    return g;
  }

  /* ---- metal: iyon ızgarası ve elektron denizi ----
     o: { x, y, w, h, sutun, satir, etiket ('Na^{+}'), yukSayisi (iyon başına serbest elektron), r, tohum }
     Dönen: { g, iyonlar, elektronlar, etiketler, dolas(ms), dagit(t) }. Elektronlar iyonların üstünde çizilir. dagit(0): her elektron kendi atomunun yanında;
     dagit(1): elektronlar iyonların arasında. dolas(ms) elektronları ms süresince gezdirir. */
  function metal(c, p, o) {
    const g = c.S('g', {}, p), gi = c.S('g', {}, g), ge = c.S('g', {}, g), sutun = o.sutun || 4, satir = o.satir || 3, r = o.r || 22, n = o.yukSayisi || 1, rnd = rastgele(o.tohum || 7);
    const dx = o.w / sutun, dy = o.h / satir, iyonlar = [], etiketler = [], elektronlar = [];
    let T = 0, yayilma = o.dagit == null ? 1 : o.dagit;
    for (let j = 0; j < satir; j++) for (let i = 0; i < sutun; i++) {
      const P = [o.x + dx * (i + 0.5), o.y + dy * (j + 0.5)];
      c.S('circle', { cx: P[0], cy: P[1], r, fill: RENK.arti, 'fill-opacity': 0.92 }, gi);
      if (o.etiket) etiketler.push(yazi(c, gi, P[0], P[1] + (o.size || 18) * 0.36, o.etiket, { size: o.size || 18, kalin: 700, renk: '#10162b', math: true }));
      iyonlar.push(P);
      for (let k = 0; k < n; k++) {
        const a0 = (2 * Math.PI * k) / n - 0.7;
        elektronlar.push({
          ev: ileri(P, a0, r + 9), merkez: [P[0] + dx * (rnd() < 0.5 ? -0.5 : 0.5), P[1] + dy * (rnd() < 0.5 ? -0.5 : 0.5)],
          gx: dx * (0.55 + rnd() * 0.9), gy: dy * (0.55 + rnd() * 0.9), w1: 0.5 + rnd() * 0.8, w2: 0.5 + rnd() * 0.8, f1: rnd() * 6.28, f2: rnd() * 6.28,
          el: c.S('circle', { r: o.re || 6, fill: RENK.eksi }, ge),
        });
      }
    }
    const sinir = (v, a, b) => Math.max(a, Math.min(b, v));
    const ciz = () => elektronlar.forEach((e) => {
      const sx = sinir(e.merkez[0] + e.gx * Math.sin(e.w1 * T + e.f1), o.x + 6, o.x + o.w - 6);
      const sy = sinir(e.merkez[1] + e.gy * Math.sin(e.w2 * T + e.f2), o.y + 6, o.y + o.h - 6);
      e.el.setAttribute('cx', e.ev[0] + (sx - e.ev[0]) * yayilma); e.el.setAttribute('cy', e.ev[1] + (sy - e.ev[1]) * yayilma);
    });
    ciz();
    return {
      g, iyonlar, etiketler, elektronlar,
      dagit(t) { yayilma = t; ciz(); },
      dolas(ms) { const T0 = T; return c.tween(ms, (e) => { T = T0 + (ms / 1000) * e; ciz(); }, Ders.ease.linear); },
    };
  }

  /* ---- yatay çubuk (büyüklük karşılaştırma) ---- */
  function cubuk(c, p, x, y, renk, o = {}) {
    const h = o.h || 22, el = c.S('rect', { x, y: y - h / 2, width: 0, height: h, rx: 6, fill: renk }, p);
    return { el, boy(w) { el.setAttribute('width', Math.max(0, w)); } };
  }

  /* Yanıt bekleyen tahmin: doğru şık aranmaz, seçilen şıkkın sırası döner. */
  function tahminAl(c, o) {
    return new Promise((res) => {
      const opts = c.h('div', { class: 'opts' });
      const panel = c.panel(null, c.h('span', { class: 'tag' }, o.tag || 'Tahmin et'), c.h('p', { class: 'q', html: o.q }), opts);
      o.options.forEach((txt, i) => {
        const b = c.h('button', { class: 'opt', html: txt });
        b.addEventListener('click', () => { panel.remove(); res(i); });
        opts.appendChild(b);
      });
    });
  }

  /* Kartları sırayla kutulara ayırtır: sınıflandırma, gruplandırma, eşleştirme, sıralama sahneleri bununla kurulur.
     Sürükle-bırak yerine kart başına c.choice kullanılır; ölçüm ve seslendirme araçları sahneyi kendiliğinden geçebilsin diye.
     o: { tag, soru: (kart) => 'html', kutular: ['kutu adı', …], kartlar: [{ …, kutu: sıra, neden: 'doğru geri bildirimi', ipucu: 'yanlışta' }],
          sec: async (i, kart) => kartı tahtada öne çıkar, yerlestir: async (i, kart) => kartı tahtada kutusuna taşı } */
  async function sinifla(c, o) {
    for (let i = 0; i < o.kartlar.length; i++) {
      const k = o.kartlar[i];
      if (o.sec) await o.sec(i, k);
      await c.choice({
        tag: o.tag || 'Dene', q: o.soru(k), options: o.kutular, answer: k.kutu,
        hints: o.kutular.map((_, j) => (j === k.kutu ? '' : k.ipucu || 'Tam değil. Karta bir daha bak.')), right: k.neden || 'Evet.',
      });
      if (o.yerlestir) await o.yerlestir(i, k);
    }
  }

  return {
    RENK, uz, yon, ileri, rastgele, yazi, renkli, parcaKoy, cizgi, koy, kutu, gizle, belir, par, ok, isaret,
    yuk, atom, etkilesim, metal, cubuk, tahminAl, sinifla,
  };
})();
