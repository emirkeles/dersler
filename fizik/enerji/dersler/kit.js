/* Enerji temasının ortak çizim araçları (window.KIT). Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Renk rolleri tema boyunca aynı kalır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor,
   kütle (madde miktarı) turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz,
   işe yaramayan yol gridir. Yazı boyu en az 22 birim tutulur (dizüstünde 12 px'in üstü). Noktalar [x, y] dizisidir.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan.
   Bu dosyayı yalnızca temayı yürüten oturum değiştirir; konuya özel çizimler <harf>-araclar.js dosyasında,
   izometrik figürler üretilmiş <ad>-sekil.js dosyalarında durur (plan/fizik/enerji/IZOMETRIK.md). */
window.KIT = (() => {
  'use strict';
  const RENK = {
    isi: 'var(--c2)', sicaklik: 'var(--c5)', icEnerji: 'var(--c4)', kutle: 'var(--c6)', soguk: 'var(--c1)',
    iyi: 'var(--good)', cizgi: '#c3cbea', ince: '#5b678f', soluk: 'var(--muted)', yazi: 'var(--text)',
    yuzey: '#18213f', kenarlik: '#33437f', gri: '#7b849c', koyu: '#10162b',
  };
  /* Ondalık sayı Türkçe yazımla: 0.02 → "0,02"; binlik ayırıcı yok. */
  const sayi = (v) => String(v).replace('.', ',');

  /* ---- geometri ---- */
  const uz = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const yon = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]);
  const ileri = (P, a, d) => [P[0] + d * Math.cos(a), P[1] + d * Math.sin(a)];
  /* Aynı tohumla hep aynı diziyi veren sayı üreteci: çizimler her açılışta aynı görünür. */
  const rastgele = (tohum) => () => { tohum = (tohum * 1664525 + 1013904223) % 4294967296; return tohum / 4294967296; };

  /* ---- temel çizim ---- */
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  /* o.math verilirse metin üs ve indisle çizilir: 'm^{2}', 'P_{1}'. */
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
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = bas[i] + (hedef - bas[i]) * e; }), hedef > 0 ? Ders.ease.out : Ders.ease.in);
  };
  const par = (...ps) => Promise.all(ps);

  /* Ucu oklu doğru parçası; ciz(P, Q) ile yeniden yerleştirilir. Boyu 4 birimden kısaysa görünmez. */
  function ok(c, p, P, Q, renk = RENK.yazi, w = 5) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P2, Q2) => {
      if (uz(P2, Q2) < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const a = yon(P2, Q2), s1 = ileri(Q2, a + 2.6, 17), s2 = ileri(Q2, a - 2.6, 17);
      koy(hat, P2, ileri(Q2, a, -10)); uc.setAttribute('d', `M${Q2[0]},${Q2[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    ciz(P, Q);
    return { g, ciz };
  }
  /* Halka içinde onay işareti (doğru bulunan satır, yerine oturan kart). */
  function onay(c, p, x, y, r = 14) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r, fill: RENK.koyu, stroke: RENK.iyi, 'stroke-width': 3 }, g);
    c.S('path', { d: `M${x - 6},${y} l4,5 l8,-10`, fill: 'none', stroke: RENK.iyi, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }

  /* ---- yatay çubuk (büyüklük karşılaştırma) ---- */
  function cubuk(c, p, x, y, renk, o = {}) {
    const h = o.h || 22, el = c.S('rect', { x, y: y - h / 2, width: 0, height: h, rx: 6, fill: renk }, p);
    return { el, boy(w) { el.setAttribute('width', Math.max(0, w)); } };
  }

  /* ---- veri tablosu ----
     o: { x, y, sutunlar: [{ ad, w, renk }], satir (satır sayısı), h (satır yüksekliği, varsayılan 46), size }
     Başlık satırı hemen görünür; veri satırları gizli başlar. Dönen: { g, satirlar, yaz(i, j, metin, renk), goster(i, ms), vurgula(i, acik) }.
     Satırlar tek tek açılır; ölçülen değer hücreye yaz(...) ile konur. */
  function tablo(c, p, o) {
    const g = c.S('g', {}, p), h = o.h || 46, size = o.size || 22, W = o.sutunlar.reduce((s, k) => s + k.w, 0);
    kutu(c, g, o.x, o.y, W, h * (o.satir + 1), { rx: 10 });
    const xs = []; let x = o.x;
    o.sutunlar.forEach((k) => { xs.push(x + k.w / 2); x += k.w; });
    o.sutunlar.forEach((k, j) => yazi(c, g, xs[j], o.y + h / 2 + size * 0.36, k.ad, { size, kalin: 700, renk: k.renk || RENK.yazi, math: !!k.math }));
    cizgi(c, g, [o.x, o.y + h], [o.x + W, o.y + h], RENK.kenarlik, 2);
    const satirlar = [];
    for (let i = 0; i < o.satir; i++) {
      const sg = c.S('g', {}, g), y = o.y + h * (i + 1);
      const zemin = c.S('rect', { x: o.x + 3, y: y + 3, width: W - 6, height: h - 6, rx: 7, fill: RENK.sicaklik, 'fill-opacity': 0 }, sg);
      const hucreler = o.sutunlar.map((_, j) => yazi(c, sg, xs[j], y + h / 2 + size * 0.36, '', { size, kalin: 600 }));
      gizle(sg); satirlar.push({ g: sg, zemin, hucreler });
    }
    return {
      g, satirlar,
      yaz(i, j, metin, renk) { const t = satirlar[i].hucreler[j]; t.textContent = metin; if (renk) t.style.fill = renk; },
      goster(i, ms = 350) { return belir(c, satirlar[i].g, ms); },
      vurgula(i, acik = true) { satirlar[i].zemin.setAttribute('fill-opacity', acik ? 0.14 : 0); },
    };
  }

  /* Yanıt bekleyen tahmin: doğru şık aranmaz, seçilen şıkkın sırası döner.
     Ölçüm aracı şıklara bastığı için sahne kendiliğinden geçer. */
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

  /* Kartları sırayla kutulara ayırtır: sınıflandırma, eşleştirme, sıralama sahneleri bununla kurulur.
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
    RENK, sayi, uz, yon, ileri, rastgele, yazi, renkli, parcaKoy, cizgi, koy, kutu, gizle, belir, par, ok, onay,
    cubuk, tablo, tahminAl, sinifla,
  };
})();
