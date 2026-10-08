/* Konu J (Kaynama sıcaklığı) çizim araçları: window.KIT_J. kit.js'ten sonra, ders dosyalarından önce yüklenir.
   Tahta 1000×562 birimdir. Bu konuda yük çizilmez; renk yalnızca çekim içindir (yeşil çizgi).
   Basınç okları nötr tonlardadır: dış basınç açık gri (dıştan içe), iç basınç koyu gri (içten dışa); kırmızı ve mavi kullanılmaz
   (itme ve eksi yük için ayrılmıştır). Ok kalınlığı yalnızca büyüklük sırasını gösterir, ok için sayı yazılmaz.
   Moleküller, çubuklar ve sıvılar nötr gri tonlardadır; renk anlam taşımaz.
   Grafikler şematiktir: eksen adı ve senaryoda verilen işaretler dışında sayı yazılmaz; hidrür grafiğinde çubuk yükseklikleri
   yalnızca sırayı gösterir ve yalnızca metindeki üç değer (metan, hidrojen sülfür, su; kelvin) etiketlenir.
   Araçlar:
     GRI, DIS, IC, virgul, okK, okSirasi, dolas     ortak yardımcılar (kalınlığı değişen ok, ok sırası, zaman döngüsü)
     suMol                                           gri küre modeliyle su molekülü
     kap, manzara                                    beherglas / kap (su, kabarcık, ısı, termometre, kapak, basınç okları); deniz seviyesi ve Everest'in zirvesi
     sirinca                                         dikey şırınga: su, piston, kabarcık, parmak, yüzeydeki basınç okları
     kabarcikModeli                                  sıvı kesiti: moleküller, çekim çizgileri, buhar, kabarcık, iç ve dış basınç okları
     buharGrafigi                                    sıcaklık – buhar basıncı eğrisi (suyun), kesikli çizgiler, kesişim noktaları
     kaynamaDeney                                    kapaklı kap + basınç–kaynama sıcaklığı tablosu + nokta grafiği (sekiz konum)
     iddiaCercevesi                                  İddia · Kanıt · Gerekçe kutuları
     cubukKpa                                        üç sıvının buhar basıncı çubukları, 1 atm çizgisi, sıcaklık konumları, aralık tablosu
     kaynamaCubuklari                                metan, hidrojen sülfür, su: kelvin çubukları, molekül çiftleri, çekim çizgileri
     hidrurGrafigi                                   on altı hidrojenli bileşiğin kaynama sıcaklığı çubukları (sıra grafikten)
     hidrojenBagiSayisi                              su molekülü çevresinde dört, HF molekülü çevresinde iki hidrojen bağı
     tekTablo                                        sıvı · dış basınç · kaynama sıcaklığı tablosu, iki bölüm
     kutuTahtasi                                     kart başına seçimle sınıflandırma tahtası (kutular + öne çıkan kart + yerleşen etiket) */
window.KIT_J = (() => {
  'use strict';
  const { RENK, ileri, rastgele, yazi, cizgi, koy, kutu, gizle, belir, par, isaret } = window.KIT;
  const { ease } = Ders;

  /* ---- renkler ---- */
  const GRI = { koyu: '#8a93ad', acik: '#e3e7f3', molekul: '#c9cfe0', cam: '#6b78b0', tahta: '#10162b', ic: '#0c1226', yuzey: '#18213f' };
  const DIS = '#e3e7f3', IC = '#8a93ad';              // dış basınç açık gri, iç basınç koyu gri
  const TON = { eter: '#e3e7f3', alkol: '#bcc3da', su: '#939dc0' };   // üç sıvının çubuk tonları (nötr)
  const EGRI = '#3cc8e8';                              // grafik eğrisi (dersin vurgu rengi)
  const virgul = (n) => String(n).replace('.', ',');
  const sinir = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const W = (k) => 2.4 + 7.6 * sinir(k, 0, 1);         // basınç kalınlığı: 0..1 → çizgi kalınlığı

  /* ---- kalınlığı değişen ok ---- */
  function okK(c, p, P, Q, renk, w = 4, halo = false) {
    const g = c.S('g', {}, p);
    // Halo: okun arkasında koyu bir iz; kalabalık zeminde okun okunmasını sağlar.
    const h0 = halo ? cizgi(c, g, P, Q, GRI.tahta, w + 6) : null, u0 = halo ? c.S('path', { fill: GRI.tahta, stroke: GRI.tahta, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g) : null;
    const hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const st = { P, Q, w };
    const ciz = (P2 = st.P, Q2 = st.Q, w2 = st.w) => {
      st.P = P2; st.Q = Q2; st.w = w2;
      const L = Math.hypot(Q2[0] - P2[0], Q2[1] - P2[1]);
      if (L < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const a = Math.atan2(Q2[1] - P2[1], Q2[0] - P2[0]), hl = Math.min(L * 0.8, 9 + 1.7 * w2), hw = 5 + 1.2 * w2;
      const B = [Q2[0] - hl * Math.cos(a), Q2[1] - hl * Math.sin(a)];
      const s1 = [B[0] - hw * Math.sin(a), B[1] + hw * Math.cos(a)], s2 = [B[0] + hw * Math.sin(a), B[1] - hw * Math.cos(a)];
      const T = [Q2[0] - hl * 0.7 * Math.cos(a), Q2[1] - hl * 0.7 * Math.sin(a)];
      koy(hat, P2, T); hat.setAttribute('stroke-width', w2);
      const dd = `M${Q2[0]},${Q2[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`;
      uc.setAttribute('d', dd);
      if (halo) { koy(h0, P2, T); h0.setAttribute('stroke-width', w2 + 6); u0.setAttribute('d', dd); }
    };
    ciz();
    return { g, ciz, st };
  }
  /* Ok sırası: ucları verilen oklar, kalınlık tek sayıyla (0..1) ayarlanır. */
  function okSirasi(c, p, cift, renk, k = 0.5, halo = false) {
    const g = c.S('g', {}, p), oklar = cift.map(([P, Q]) => okK(c, g, P, Q, renk, W(k), halo));
    return { g, oklar, kalin(v) { oklar.forEach((o) => o.ciz(o.st.P, o.st.Q, W(v))); } };
  }
  /* c.tween ile çalışan zaman döngüsü: ekle(nesne) → nesne.zaman(T) her karede çağrılır. */
  function dolas(c) {
    const liste = []; let T = 0;
    (async () => {
      try {
        while (c.alive()) {
          const T0 = T;
          await c.tween(2000, (e) => { T = T0 + 2 * e; liste.forEach((n) => n.zaman(T)); }, ease.linear);
          T = T0 + 2;
        }
      } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; }
    })();
    return { ekle(n) { liste.push(n); n.zaman(T); return n; }, get T() { return T; } };
  }
  /* Bir sayısal durum nesnesini (st) hedef değerlere ms süresince götürür; her adımda ciz() çağrılır. */
  function git(c, st, yeni, ms, ciz) {
    const A = Object.assign({}, st), B = Object.assign({}, st, yeni);
    if (!ms) { Object.assign(st, B); ciz(); return Promise.resolve(); }
    return c.tween(ms, (e) => { for (const key in B) st[key] = A[key] + (B[key] - A[key]) * e; ciz(); });
  }

  /* ---- su molekülü: gri küre modeli ---- */
  function suMol(c, p, r = 13) {
    const g = c.S('g', {}, p);
    [-1, 1].forEach((s) => c.S('circle', { cx: s * r * 0.95, cy: r * 0.9, r: r * 0.6, fill: '#e6e6e6', stroke: '#4d4d4d', 'stroke-width': 1 }, g));
    c.S('circle', { cx: 0, cy: -r * 0.2, r, fill: '#bdbdbd', stroke: '#4d4d4d', 'stroke-width': 1.2 }, g);
    return g;
  }

  /* ---- kap: beherglas / kapaklı kap ----
     o: { x, y, w, h (üst sol köşe ve ölçü), su (yükseklik oranı), kabarcik (görünen kabarcık sayısı, 0–12), alev (0|1), termo (0..1 | null), kapak (true: üstü kapalı),
          oklar (null | 0..1: üstteki dış basınç okları; kalınlık), tohum }
     Dönen: { g, zaman(T), termo(v), kabarcik(n, ms), alev(a, ms), ok(k, ms), gOk, suY } */
  function kap(c, p, o) {
    const { x, y, w, h } = o, g = c.S('g', {}, p), rnd = rastgele(o.tohum || 5);
    const suH = h * (o.su == null ? 0.64 : o.su), suY = y + h - suH;
    const gSu = c.S('g', {}, g);
    c.S('rect', { x: x + 3, y: suY, width: w - 6, height: suH - 3, rx: 4, fill: '#9ea8c8', 'fill-opacity': 0.5 }, gSu);
    cizgi(c, gSu, [x + 3, suY], [x + w - 3, suY], '#b8c0d8', 3.5);
    const gB = c.S('g', {}, g), B = [];
    for (let i = 0; i < 12; i++) B.push({ f: rnd(), px: rnd(), r: 4 + rnd() * 4, ph: rnd() * 6, el: c.S('circle', { r: 5, fill: 'none', stroke: GRI.acik, 'stroke-width': 2 }, gB) });
    const st = { n: o.kabarcik || 0, alev: o.alev || 0, ok: o.oklar == null ? 0 : o.oklar, okOp: o.okOp != null ? o.okOp : (o.oklar == null ? 0 : 1) };
    c.S('path', { d: `M${x},${y} L${x},${y + h} L${x + w},${y + h} L${x + w},${y}`, fill: 'none', stroke: GRI.cam, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    let T = 0;
    const zaman = (t) => {
      T = t;
      B.forEach((b, i) => {
        const a = sinir(st.n - i, 0, 1);
        b.el.style.opacity = a;
        if (a <= 0) return;
        const s = (t * 0.32 + b.f) % 1, yy = y + h - 12 - s * (suH - 18);
        b.el.setAttribute('cx', x + 14 + b.px * (w - 28) + 5 * Math.sin(t * 1.7 + b.ph)); b.el.setAttribute('cy', yy); b.el.setAttribute('r', b.r * (0.6 + 0.4 * s));
      });
    };
    zaman(0);
    // Termometre.
    let termoEl = null, civa = null, tBas = 0, tBoy = 0;
    if (o.termo != null) {
      const tx = x + w * 0.74, ty = y + Math.max(8, h * 0.08), tb = y + h - 22;
      tBas = tb; tBoy = tb - ty - 14;
      termoEl = c.S('g', {}, g);
      c.S('rect', { x: tx - 7, y: ty, width: 14, height: tb - ty, rx: 7, fill: GRI.tahta, stroke: GRI.cam, 'stroke-width': 3 }, termoEl);
      c.S('circle', { cx: tx, cy: tb + 2, r: 10, fill: GRI.acik, stroke: GRI.cam, 'stroke-width': 3 }, termoEl);
      civa = cizgi(c, termoEl, [tx, tb + 2], [tx, tb - 10], GRI.acik, 6);
      civa.tx = tx;
    }
    const termo = (v) => { if (civa) koy(civa, [civa.tx, tBas + 2], [civa.tx, tBas - 6 - v * tBoy]); };
    if (o.termo != null) termo(o.termo);
    // Kapak ve basınç okları.
    let gOk = null, oklar = null;
    if (o.kapak) c.S('rect', { x: x - 8, y: y - 16, width: w + 16, height: 14, rx: 6, fill: '#aab3d1' }, g);
    if (o.oklar != null) {
      gOk = c.S('g', {}, g);
      const ust = y - (o.kapak ? 18 : 6), n = 4;
      oklar = okSirasi(c, gOk, Array.from({ length: n }, (_, i) => { const xx = x + w * (i + 0.5) / n; return [[xx, ust - 58], [xx, ust]]; }), DIS, o.oklar);
    }
    // Isı: üç alev (sarı vurgu rengi).
    const gA = c.S('g', {}, g);
    for (let i = 0; i < 3; i++) {
      const fx = x + w * (0.25 + 0.25 * i), fy = y + h + 6;
      c.S('path', { d: `M${fx},${fy + 38} C${fx - 18},${fy + 24} ${fx - 8},${fy + 8} ${fx},${fy} C${fx + 8},${fy + 8} ${fx + 18},${fy + 24} ${fx},${fy + 38} Z`, fill: RENK.vurgu, 'fill-opacity': 0.9 }, gA);
    }
    gA.style.opacity = st.alev;
    if (o.alevK) { const fx = x + w / 2, fy = y + h + 6; gA.setAttribute('transform', `translate(${fx},${fy}) scale(${o.alevK}) translate(${-fx},${-fy})`); }
    const ciz = () => { zaman(T); gA.style.opacity = st.alev; if (oklar) { oklar.kalin(st.ok); gOk.style.opacity = st.okOp; } };
    return {
      g, suY, gOk, zaman, termo, termoEl,
      kabarcik: (n, ms = 0) => git(c, st, { n }, ms, ciz),
      alev: (a, ms = 0) => git(c, st, { alev: a }, ms, ciz),
      ok: (k, ms = 0) => git(c, st, { ok: k }, ms, ciz),
      okOp: (v, ms = 0) => git(c, st, { okOp: v }, ms, ciz),
    };
  }

  /* ---- manzara: deniz seviyesi ya da Everest'in zirvesi, üstünde kaynayan su ----
     tur: 'deniz' | 'dag'. (x, y) alanın üst sol köşesi, alan 300 × 230. Dönen: kap nesnesi + g. */
  function manzara(c, p, tur, x, y, o = {}) {
    const g = c.S('g', {}, p);
    if (tur === 'deniz') {
      c.S('path', { d: `M${x},${y + 200} q25,-12 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 V${y + 230} H${x} Z`, fill: '#6b78b0', 'fill-opacity': 0.45, stroke: GRI.cam, 'stroke-width': 3 }, g);
    } else {
      c.S('path', { d: `M${x + 10},${y + 230} L${x + 150},${y + 124} L${x + 290},${y + 230} Z`, fill: '#6b78b0', 'fill-opacity': 0.35, stroke: GRI.cam, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('path', { d: `M${x + 124},${y + 146} L${x + 150},${y + 124} L${x + 176},${y + 146} L${x + 160},${y + 140} L${x + 150},${y + 150} L${x + 140},${y + 140} Z`, fill: GRI.acik, 'fill-opacity': 0.8 }, g);
    }
    const sx = x + 100, sy = tur === 'deniz' ? y + 50 : y + 40, h = tur === 'deniz' ? 90 : 84;
    const K = kap(c, g, { x: sx, y: sy, w: 100, h, su: 0.6, kabarcik: o.kabarcik == null ? 7 : o.kabarcik, alev: o.alev == null ? 1 : o.alev, tohum: o.tohum || 9 });
    return Object.assign(K, { kok: g });
  }

  /* ---- şırınga ----
     o: { x, y (silindirin alt orta noktası), k (ölçek), pull (0: piston yerinde, 1: tam geri), kab (görünen kabarcık sayısı), parmak (true), ok (0..1 yüzeydeki basınç oku kalınlığı) }
     Dönen: { g, git(yeni, ms), yer(x, y, k, ms), zaman(T) } */
  function sirinca(c, p, o) {
    const g = c.S('g', {}, p), kok = c.S('g', {}, g), rnd = rastgele(o.tohum || 11);
    const st = { x: o.x, y: o.y, k: o.k || 1, pull: o.pull || 0, kab: o.kab || 0, ok: o.ok == null ? 0.8 : o.ok, okOp: o.okOp == null ? 1 : o.okOp };
    const SU = -120, YB = 380, W2 = 60;
    c.S('path', { d: `M${-W2 + 3},${SU} L${-W2 + 3},-2 L-9,15 L-9,54 L9,54 L9,15 L${W2 - 3},-2 L${W2 - 3},${SU} Z`, fill: '#9ea8c8', 'fill-opacity': 0.5 }, kok);
    cizgi(c, kok, [-W2 + 3, SU], [W2 - 3, SU], '#b8c0d8', 3.5);
    const gB = c.S('g', {}, kok), B = [];
    for (let i = 0; i < 8; i++) B.push({ f: rnd(), px: rnd() * 2 - 1, r: 4 + rnd() * 4, ph: rnd() * 6, el: c.S('circle', { r: 5, fill: 'none', stroke: GRI.acik, 'stroke-width': 2.5 }, gB) });
    c.S('path', { d: `M${-W2},${-YB} L${-W2},0 L-11,16 L-11,56 L11,56 L11,16 L${W2},0 L${W2},${-YB}`, fill: 'none', stroke: GRI.cam, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, kok);
    // Piston.
    const pis = c.S('g', {}, kok);
    c.S('rect', { x: -W2 + 3, y: -18, width: 2 * W2 - 6, height: 18, rx: 4, fill: '#aab3d1' }, pis);
    c.S('rect', { x: -8, y: -118, width: 16, height: 102, fill: '#aab3d1' }, pis);
    c.S('rect', { x: -46, y: -130, width: 92, height: 14, rx: 6, fill: '#aab3d1' }, pis);
    // Yüzeydeki basınç okları.
    const gOk = c.S('g', {}, kok);
    const oklar = okSirasi(c, gOk, [-34, 0, 34].map((xx) => [[xx, SU - 56], [xx, SU - 5]]), DIS, st.ok);
    // Parmak.
    const parmak = c.S('ellipse', { cx: 0, cy: 62, rx: 26, ry: 18, fill: '#cdbba8', stroke: '#8f8070', 'stroke-width': 2 }, kok);
    parmak.style.opacity = o.parmak ? 1 : 0;
    let T = 0;
    const zaman = (t) => {
      T = t;
      B.forEach((b, i) => {
        const a = sinir(st.kab - i, 0, 1);
        b.el.style.opacity = a;
        if (a <= 0) return;
        const s = (t * 0.4 + b.f) % 1;
        b.el.setAttribute('cx', b.px * 44 + 5 * Math.sin(t * 1.9 + b.ph)); b.el.setAttribute('cy', -6 - s * 104); b.el.setAttribute('r', b.r * (0.6 + 0.4 * s));
      });
    };
    const ciz = () => {
      kok.setAttribute('transform', `translate(${st.x},${st.y}) scale(${st.k})`);
      pis.setAttribute('transform', `translate(0,${SU - 66 - st.pull * 150})`);
      oklar.kalin(st.ok); gOk.style.opacity = st.okOp;
      zaman(T);
    };
    ciz();
    return {
      g, zaman, st, parmak,
      git: (yeni, ms = 0) => git(c, st, yeni, ms, ciz),
      X: (xx) => st.x + st.k * xx, Y: (yy) => st.y + st.k * yy,
    };
  }

  /* ---- sıvı kesiti: moleküller, çekim çizgileri, buhar, kabarcık, iç ve dış basınç ----
     o: { x, y, w, h (panel), aralik (molekül aralığı), tohum, s (kabarcık gelişimi 0..1), b (buhara dönüşme 0..1), iz (hareket izi uzunluğu), kalin (çekim çizgisi), ic, dis (ok kalınlığı 0..1), icOp, disOp }
     Dönen: { g, C (kabarcık merkezi), Rb() (şimdiki yarıçap), git(yeni, ms), st }
     Bir kabarcık: ortadaki molekülleri buhar olur (çekim çizgileri solar), buhar yayılır, çevre sıvı dışarı itilir. */
  let kimlik = 0;
  function kabarcikModeli(c, p, o) {
    const { x, y, w, h } = o, rnd = rastgele(o.tohum || 4), sx = o.aralik || 62, sy = sx * 0.866;
    const C = [x + w / 2, y + h / 2], Rb0 = sx * 1.3, Rfull = Math.max(Math.min(w, h) * 0.4, Rb0 * 1.55);
    const g = c.S('g', {}, p), id = 'kmk' + (++kimlik);
    const defs = c.S('defs', {}, g), cp = c.S('clipPath', { id }, defs);
    c.S('rect', { x, y, width: w, height: h, rx: 14 }, cp);
    kutu(c, g, x, y, w, h, { rx: 14 });
    const ic = c.S('g', { 'clip-path': `url(#${id})` }, g);
    const gL = c.S('g', {}, ic), gBub = c.S('g', {}, ic), gI = c.S('g', {}, ic), gM = c.S('g', {}, ic), gO = c.S('g', {}, ic);
    // Kafes.
    const M = [];
    for (let j = -14; j <= 14; j++) for (let i = -16; i <= 16; i++) {
      const ix = (i + (Math.abs(j) % 2 ? 0.5 : 0)) * sx, iy = j * sy;
      if (Math.abs(ix) > w / 2 + sx * 0.8 || Math.abs(iy) > h / 2 + sy * 0.8) continue;
      const m = { ix, iy, u: [ix + (rnd() - 0.5) * sx * 0.14, iy + (rnd() - 0.5) * sy * 0.14], a: rnd() * 6.28, rot: (rnd() - 0.5) * 120 };
      m.hole = Math.hypot(ix, iy) < Rb0;
      M.push(m);
    }
    const dmax = Math.max(...M.filter((m) => m.hole).map((m) => Math.hypot(m.u[0], m.u[1])));
    const hatlar = [];
    for (let a = 0; a < M.length; a++) for (let b = a + 1; b < M.length; b++) {
      if (Math.hypot(M[a].ix - M[b].ix, M[a].iy - M[b].iy) <= sx * 1.05) hatlar.push({ a: M[a], b: M[b], el: cizgi(c, gL, [0, 0], [0, 0], RENK.cekme, 3, { 'stroke-opacity': 0.75 }) });
    }
    M.forEach((m) => { m.iz = cizgi(c, gI, [0, 0], [0, 0], GRI.molekul, 3, { 'stroke-opacity': 0.55 }); m.el = suMol(c, gM, 13); });
    const kab = c.S('circle', { cx: C[0], cy: C[1], r: Rb0, fill: GRI.ic, 'fill-opacity': 0.85, stroke: GRI.acik, 'stroke-width': 3 }, gBub);
    // Oklar: sekiz iç (içten dışa), sekiz dış (dıştan içe).
    const aci = Array.from({ length: 8 }, (_, k) => (k * Math.PI) / 4 + Math.PI / 8);
    const okIc = okSirasi(c, gO, aci.map(() => [[0, 0], [1, 1]]), IC, 0.5), okDis = okSirasi(c, gO, aci.map(() => [[0, 0], [1, 1]]), DIS, 0.5, true);
    const st = { s: o.s || 0, b: o.b || 0, iz: o.iz == null ? 7 : o.iz, kalin: o.kalin == null ? 3 : o.kalin, ic: o.ic == null ? 0.5 : o.ic, dis: o.dis == null ? 0.5 : o.dis, icOp: o.icOp || 0, disOp: o.disOp || 0 };
    const Rb = () => Rb0 + st.s * (Rfull - Rb0);
    const konum = (m) => {
      if (m.hole) { const k = 1 + st.s * ((0.78 * Rfull) / dmax - 1); return [C[0] + m.u[0] * k, C[1] + m.u[1] * k]; }
      const d = Math.hypot(m.u[0], m.u[1]), r = Rb(), k = (Math.sqrt(d * d + r * r - Rb0 * Rb0) + 10 * st.s) / d;
      return [C[0] + m.u[0] * k, C[1] + m.u[1] * k];
    };
    const ciz = () => {
      M.forEach((m) => {
        m.q = konum(m);
        m.el.setAttribute('transform', `translate(${m.q[0]},${m.q[1]}) rotate(${m.rot})`);
        const L = st.iz * (m.hole ? 1 + 1.3 * st.b : 1);
        koy(m.iz, m.q, [m.q[0] - L * Math.cos(m.a), m.q[1] - L * Math.sin(m.a)]);
      });
      hatlar.forEach((hh) => { koy(hh.el, hh.a.q, hh.b.q); hh.el.setAttribute('stroke-width', st.kalin); hh.el.style.opacity = hh.a.hole || hh.b.hole ? 1 - st.b : 1; });
      const r = Rb();
      kab.setAttribute('r', r); kab.style.opacity = Math.min(1, st.s * 8);
      aci.forEach((a, k) => {
        okIc.oklar[k].ciz(ileri(C, a, r * 0.5), ileri(C, a, r * 0.93), W(st.ic));
        okDis.oklar[k].ciz(ileri(C, a, r + (o.okBoy || 52)), ileri(C, a, r + 4), W(st.dis));
      });
      okIc.g.style.opacity = st.icOp; okDis.g.style.opacity = st.disOp;
    };
    ciz();
    return { g, C, Rb, st, ciz, git: (yeni, ms = 0) => git(c, st, yeni, ms, ciz), Rfull };
  }

  /* ---- sıcaklık – buhar basıncı grafiği (suyun eğrisi) ----
     Eğri şematiktir (eksenlerde yalnızca 200, 400, 600 ve elle konan işaretler); 0,3 atm çizgisi 200 ile 400 arasında durur.
     o: { x0, y0, px, py }. Dönen: { g, egri(ms), k: [ { yat, dus, nokta, yEt, xEt }, … ] (1 atm, 0,3 atm), eksen } */
  function buharGrafigi(c, p, o = {}) {
    const X0 = o.x0 || 130, Y0 = o.y0 || 430, PX = o.px || 4.4, PY = o.py || 0.44;
    const tx = (T) => X0 + T * PX, py = (mm) => Y0 - mm * PY;
    const Pb = (T) => Math.pow(10, 8.07131 - 1730.63 / (233.426 + T));
    const g = c.S('g', {}, p), ek = c.S('g', {}, g);
    cizgi(c, ek, [X0, Y0], [X0, 56], GRI.cam, 3); cizgi(c, ek, [X0, Y0], [tx(106), Y0], GRI.cam, 3);
    [200, 400, 600].forEach((v) => { cizgi(c, ek, [X0 - 7, py(v)], [X0, py(v)], GRI.cam, 3); yazi(c, ek, X0 - 14, py(v) + 7, String(v), { hiza: 'end', size: 20, kalin: 600, renk: RENK.soluk }); });
    cizgi(c, ek, [X0 - 7, py(760)], [X0, py(760)], GRI.cam, 3);
    const yt = yazi(c, ek, 52, (Y0 + 56) / 2, 'buhar basıncı (mmHg)', { size: 22, kalin: 600, renk: RENK.soluk }); yt.setAttribute('transform', `rotate(-90 52 ${(Y0 + 56) / 2})`);
    yazi(c, ek, tx(52), Y0 + 56, 'sıcaklık (°C)', { size: 22, kalin: 600, renk: RENK.soluk });
    let d = '';
    for (let T = 0; T <= 104; T += 2) d += (T ? 'L' : 'M') + tx(T) + ',' + py(Pb(T));
    const egri = c.S('path', { d, fill: 'none', stroke: EGRI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 0 }, g);
    const bul = (mm) => { let a = 0, b = 110; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if (Pb(m) < mm) a = m; else b = m; } return (a + b) / 2; };
    const k = [[760, '1 atm = 760 mmHg', '100 °C'], [228, '0,3 atm', '70 °C']].map(([mm, ad, xe]) => {
      const T = bul(mm), xi = tx(T), yi = py(mm);
      const yat = c.S('g', {}, g), dus = c.S('g', {}, g), nokta = c.S('g', {}, g);
      cizgi(c, yat, [X0, yi], [xi, yi], RENK.vurgu, 3, { 'stroke-dasharray': '9 7' });
      const yEt = yazi(c, yat, X0 + 12, yi - 12, ad, { hiza: 'start', size: 22, kalin: 700, renk: RENK.vurgu });
      cizgi(c, dus, [xi, yi], [xi, Y0], RENK.vurgu, 3, { 'stroke-dasharray': '9 7' });
      const xEt = yazi(c, dus, xi, Y0 + 30, xe, { size: 22, kalin: 700, renk: RENK.vurgu });
      c.S('circle', { cx: xi, cy: yi, r: 12, fill: GRI.tahta, stroke: GRI.acik, 'stroke-width': 3 }, nokta);
      c.S('circle', { cx: xi - 3, cy: yi - 3, r: 3.5, fill: 'none', stroke: GRI.acik, 'stroke-width': 1.8 }, nokta);
      gizle(yat, dus, nokta);
      return { yat, dus, nokta, yEt, xEt, xi, yi };
    });
    gizle(egri);
    return {
      g, ek, k, egri, tx, py,
      async egriCiz(ms = 1800) { egri.style.opacity = 1; await c.tween(ms, (e) => egri.setAttribute('stroke-dashoffset', 1 - e), ease.inOut); egri.setAttribute('stroke-dashoffset', 0); },
    };
  }

  /* ---- kapaklı kap + tablo + nokta grafiği (basınç – kaynama sıcaklığı) ----
     Sekiz konum: 760 → 100; 931 → 106; 1448 → 119; 1862 → 127; 2069 → 131; 2482 → 137; 2896 → 142; 3517 → 149.
     Dönen: { g, kap, kapG (kap ve yazıları), konum(i), yaz(i), hepsi(), yazilan (dizi), satir(i) } */
  const KAY = [[760, 100], [931, 106], [1448, 119], [1862, 127], [2069, 131], [2482, 137], [2896, 142], [3517, 149]];
  function kaynamaDeney(c, p, o = {}) {
    const g = c.S('g', {}, p), kapG = c.S('g', {}, g), d = o.dolas;
    const K = kap(c, kapG, { x: 40, y: 190, w: 190, h: 170, su: 0.62, kabarcik: 8, termo: 0, kapak: true, oklar: 0.1 });
    if (d) d.ekle(K);
    const lp = yazi(c, kapG, 135, 410, '760 mmHg', { size: 26, kalin: 700 }), lt = yazi(c, kapG, 135, 450, '100 °C', { size: 26, kalin: 700, renk: RENK.vurgu });
    // Tablo.
    const tb = c.S('g', {}, g), X1 = 350, X2 = 480;
    yazi(c, tb, X1, 76, 'mmHg', { size: 22, kalin: 600, renk: RENK.soluk }); yazi(c, tb, X2, 76, '°C', { size: 22, kalin: 600, renk: RENK.soluk });
    cizgi(c, tb, [290, 92], [545, 92], GRI.cam, 2);
    // Nokta grafiği.
    const gr = c.S('g', {}, g), GX = 650, GY = 420;
    cizgi(c, gr, [GX, GY], [GX, 90], GRI.cam, 3); cizgi(c, gr, [GX, GY], [965, GY], GRI.cam, 3);
    yazi(c, gr, 808, GY + 38, 'basınç', { size: 22, kalin: 600, renk: RENK.soluk });
    const yt = yazi(c, gr, GX - 16, 255, 'sıcaklık', { size: 22, kalin: 600, renk: RENK.soluk }); yt.setAttribute('transform', `rotate(-90 ${GX - 16} 255)`);
    const nx = (P) => GX + 28 + ((P - 760) / (3517 - 760)) * 262, ny = (T) => GY - 28 - ((T - 100) / 49) * 270;
    const dizi = [];                       // yazılan konumlar (sıralı)
    const satirlar = KAY.map(([P, T], i) => {
      const e = c.S('g', {}, tb), hl = c.S('rect', { x: 292, y: -26, width: 252, height: 36, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0 }, e);
      yazi(c, e, X1, 0, String(P), { size: 24, kalin: 600 }); yazi(c, e, X2, 0, String(T), { size: 24, kalin: 700, renk: RENK.vurgu });
      const nk = c.S('circle', { cx: nx(P), cy: ny(T), r: 8, fill: RENK.vurgu }, gr);
      gizle(e, nk);
      return { e, nk, hl };
    });
    const duzenle = () => dizi.forEach((i, slot) => satirlar[i].e.setAttribute('transform', `translate(0,${126 + slot * 40})`));
    const konum = (i) => {
      const [P, T] = KAY[i];
      K.ok(0.1 + 0.9 * ((P - 760) / (3517 - 760)));
      K.termo((T - 90) / 65);
      lp.textContent = P + ' mmHg'; lt.textContent = T + ' °C';
    };
    konum(0);
    const cz = c.S('polyline', { points: KAY.map(([P, T]) => nx(P) + ',' + ny(T)).join(' '), fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-opacity': 0.8 }, gr);
    cz.style.opacity = 0;
    return {
      g, kapG, kap: K, dizi, tb, gr, satirlar, nx, ny,
      konum,
      vurgu(i, acik) { satirlar[i].hl.setAttribute('fill-opacity', acik ? 0.28 : 0); },
      birlestir() { return belir(c, cz, 600, 1); },
      async yaz(i) {
        if (dizi.includes(i)) return false;
        dizi.push(i); dizi.sort((a, b) => a - b); duzenle();
        await par(belir(c, satirlar[i].e, 400, 1), belir(c, satirlar[i].nk, 400, 1));
        return true;
      },
      async hepsi() { for (let i = 0; i < KAY.length; i++) if (!dizi.includes(i)) { await this.yaz(i); await c.wait(180); } },
    };
  }

  /* ---- İddia · Kanıt · Gerekçe ----
     Üç kutu yan yana; doldur(i, satirlar) kutuyu doldurur, cerceve(i, açık) çerçeveler. */
  function iddiaCercevesi(c, p, o = {}) {
    const g = c.S('g', {}, p), AD = ['İddia', 'Kanıt', 'Gerekçe'], Wb = 296, Hb = o.h || 300, y0 = o.y || 120, kolon = [];
    AD.forEach((ad, i) => {
      const x = 28 + i * (Wb + 24), e = c.S('g', {}, g);
      const r = kutu(c, e, x, y0, Wb, Hb, { rx: 16 });
      yazi(c, e, x + Wb / 2, y0 + 44, ad, { size: 28, kalin: 700, renk: RENK.soluk });
      cizgi(c, e, [x + 24, y0 + 62], [x + Wb - 24, y0 + 62], GRI.cam, 2);
      kolon.push({ e, r, ic: c.S('g', {}, e), x });
    });
    return {
      g, kolon,
      async doldur(i, satirlar, ms = 450, renk = RENK.yazi) {
        const k = kolon[i]; k.ic.textContent = '';
        satirlar.forEach((s, j) => yazi(c, k.ic, k.x + Wb / 2, y0 + 112 + j * 42, s, { size: 25, kalin: 600, renk, math: /[_^]\{/.test(s) }));
        k.ic.style.opacity = 0; await belir(c, k.ic, ms, 1);
      },
      sor(i) { return this.doldur(i, ['?'], 300, RENK.vurgu); },
      cerceve(i, acik) { kolon[i].r.style.stroke = acik ? RENK.vurgu : ''; kolon[i].r.style.strokeWidth = acik ? 4 : ''; },
      temizle(i) { kolon[i].ic.textContent = ''; },
    };
  }

  /* ---- üç sıvının buhar basıncı çubukları ----
     Ölçek 0–650 kPa. Konumlar: 0, 20, 40, 60, 80, 100 °C. Çubuk kitaptaki kPa değerine göre çizilir.
     Dönen: { g, git(t), tablo(), t } */
  const KPA = { eter: [24.70, 58.96, 122.80, 230.65, 399.11, 647.87], alkol: [1.63, 5.85, 18.04, 47.02, 108.34, 225.75], su: [0.61, 2.33, 7.37, 19.92, 47.34, 101.33] };
  const ESIK = 101.325;
  function cubukKpa(c, p, o = {}) {
    const g = c.S('g', {}, p), ek = c.S('g', {}, g), BY = 470, HY = 340, MAXV = 650, XS = [130, 240, 350], AD = [['eter', 'dietil eter'], ['alkol', 'etil alkol'], ['su', 'su']];
    const hy = (v) => (v / MAXV) * HY;
    cizgi(c, ek, [70, BY], [425, BY], GRI.cam, 3); cizgi(c, ek, [70, BY], [70, BY - HY - 20], GRI.cam, 3);
    const ey = BY - hy(ESIK);
    cizgi(c, ek, [70, ey], [425, ey], RENK.vurgu, 3, { 'stroke-dasharray': '9 7' });
    yazi(c, ek, 432, ey - 8, '1 atm ≈ 101,3 kPa', { hiza: 'start', size: 22, kalin: 700, renk: RENK.vurgu });
    const bar = AD.map(([k, ad], i) => {
      const r = c.S('rect', { x: XS[i] - 32, y: BY, width: 64, height: 0, rx: 5, fill: TON[k] }, g);
      const adT = yazi(c, g, XS[i], BY + 34, ad, { size: 21, kalin: 700 });
      const et = yazi(c, g, XS[i], BY - 12, '', { size: 21, kalin: 700 });
      et.style.stroke = GRI.tahta; et.style.strokeWidth = '6px'; et.style.paintOrder = 'stroke';
      const ka = yazi(c, g, XS[i], BY - 44, 'kaynar', { size: 22, kalin: 700, renk: RENK.vurgu });
      ka.style.opacity = 0;
      return { k, r, et, ka, ad: adT };
    });
    const st = { t: 0 };
    const git2 = (t) => {
      st.t = t;
      bar.forEach((b) => {
        const v = KPA[b.k][t], h = Math.max(2, hy(v));
        b.r.setAttribute('y', BY - h); b.r.setAttribute('height', h);
        b.et.textContent = virgul(v); b.et.setAttribute('y', BY - h - 12);
        b.ka.setAttribute('y', BY - h - 44); b.ka.style.opacity = v >= ESIK ? 1 : 0;
      });
    };
    git2(0);
    // Sağ yarı: aralık tablosu.
    const tb = c.S('g', {}, g), SAT = [{ k: 'eter', ara: [1, 2], yaz: '20–40 °C' }, { k: 'alkol', ara: [3, 4], yaz: '60–80 °C' }, { k: 'su', ara: [4, 5], yaz: '100 °C' }];
    yazi(c, tb, 795, 118, 'kaynama sıcaklığı', { size: 24, kalin: 700, renk: RENK.soluk });
    const satir = SAT.map((s, i) => {
      const y = 200 + i * 92, e = c.S('g', {}, tb);
      c.S('circle', { cx: 650, cy: y, r: 15, fill: TON[s.k] }, e);
      cizgi(c, e, [702, y], [862, y], GRI.cam, 3);
      const aralik = { eter: [20, 40], alkol: [60, 80], su: [100, 100] }[s.k];
      if (aralik[0] === aralik[1]) c.S('circle', { cx: 702 + aralik[0] * 1.6, cy: y, r: 9, fill: RENK.vurgu }, e);
      else cizgi(c, e, [702 + aralik[0] * 1.6, y], [702 + aralik[1] * 1.6, y], RENK.vurgu, 9);
      cizgi(c, e, [702, y - 8], [702, y + 8], GRI.cam, 3); cizgi(c, e, [862, y - 8], [862, y + 8], GRI.cam, 3);
      yazi(c, e, 880, y + 8, s.yaz, { hiza: 'start', size: 24, kalin: 700 });
      e.style.opacity = 0;
      return e;
    });
    tb.style.opacity = 0;
    return { g, ek, git: git2, st, tb, satir, bar, KPA };
  }

  /* ---- iki moleküllü çekim çifti (gri küre modeli, küçük) ----
     tur: 'CH4' | 'H2S' | 'H2O'. Merkez (x, y). */
  const MOL = {
    CH4: [['#9c9c9c', 0, 0, 20], ['#e6e6e6', -24, -22, 11], ['#e6e6e6', 24, -22, 11], ['#e6e6e6', -24, 22, 11], ['#e6e6e6', 24, 22, 11]],
    H2S: [['#b9b9b9', 0, -8, 22], ['#e6e6e6', -26, 18, 12], ['#e6e6e6', 26, 18, 12]],
    H2O: [['#bdbdbd', 0, -8, 19], ['#e6e6e6', -24, 16, 11], ['#e6e6e6', 24, 16, 11]],
  };
  function kureCift(c, p, tur, x, y, o = {}) {
    const g = c.S('g', {}, p), gap = o.bosluk || 52;
    [-1, 1].forEach((s) => {
      const m = c.S('g', { transform: `translate(${x + s * (gap / 2 + 36)},${y})` }, g);
      MOL[tur].slice().sort((a, b) => b[3] - a[3]).forEach(([f, dx, dy, r]) => c.S('circle', { cx: dx, cy: dy, r, fill: f, stroke: '#4d4d4d', 'stroke-width': 1.2 }, m));
    });
    const a = [x - gap / 2 + 4, y], b = [x + gap / 2 - 4, y];
    const cz = cizgi(c, g, a, b, RENK.cekme, o.kalin || 4, { 'stroke-dasharray': '9 7', 'stroke-linecap': 'butt' });
    return { g, cz };
  }

  /* ---- metan, hidrojen sülfür, su: kaynama sıcaklığı çubukları (kelvin) ----
     Dönen: { g, cubuk[3] { r, et, ad, cift, ad2 }, ciz(ms), … } */
  function kaynamaCubuklari(c, p, o = {}) {
    const g = c.S('g', {}, p), BY = 330, HM = 250, XS = [170, 500, 830], DEG = [112.65, 213.15, 373.15];
    const AD = ['metan', 'hidrojen sülfür', 'su'], TUR = ['CH4', 'H2S', 'H2O'], KAL = [2.5, 4.5, 8], ETK = ['London', 'dipol-dipol', 'hidrojen bağı'];
    const my = (v) => (v / 373.15) * HM;
    cizgi(c, g, [60, BY], [940, BY], GRI.cam, 3);
    const cub = AD.map((ad, i) => {
      const e = c.S('g', {}, g), h = my(DEG[i]);
      const r = c.S('rect', { x: XS[i] - 55, y: BY, width: 110, height: 0, rx: 6, fill: TON[['eter', 'alkol', 'su'][i]] }, e);
      const et = yazi(c, e, XS[i], BY - h - 14, virgul(DEG[i]) + ' K', { size: 26, kalin: 700, renk: RENK.vurgu });
      const adT = yazi(c, e, XS[i], BY + 32, ad, { size: 24, kalin: 700 });
      const cf = kureCift(c, e, TUR[i], XS[i], 440, { kalin: KAL[i], bosluk: i === 2 ? 70 : 52 });
      const et2 = yazi(c, e, XS[i], 520, ETK[i], { size: 24, kalin: 700, renk: RENK.cekme });
      gizle(et, adT, cf.g, et2);
      return { e, r, et, adT, cf, et2, h };
    });
    // Su çiftinin kısmi yükleri: δ+ (hidrojen) ve δ− (oksijen).
    const dl = c.S('g', {}, g);
    yazi(c, dl, XS[2] - 36, 405, 'δ^{+}', { size: 24, kalin: 700, renk: RENK.arti, math: true });
    yazi(c, dl, XS[2] + 40, 405, 'δ^{−}', { size: 24, kalin: 700, renk: RENK.eksi, math: true });
    gizle(dl);
    return {
      g, cub, dl, BY,
      async buyut(i, ms = 1000) {
        const q = cub[i];
        await par(belir(c, q.adT, 300, 1), c.tween(ms, (e) => { q.r.setAttribute('y', BY - q.h * e); q.r.setAttribute('height', q.h * e); }, ease.out));
        await belir(c, q.et, 300, 1);
      },
    };
  }

  /* ---- hidrojenli bileşiklerin kaynama sıcaklığı grafiği (on altı çubuk, sıra grafikten) ----
     Yalnızca CH₄, H₂S ve H₂O çubuklarının değeri yazılır (iç yazı, kelvin). */
  const HID = [
    { g: '4A', ad: ['CH_{4}', 'SiH_{4}', 'GeH_{4}', 'SnH_{4}'], v: [112.65, 160, 190, 225] },
    { g: '5A', ad: ['NH_{3}', 'PH_{3}', 'AsH_{3}', 'SbH_{3}'], v: [240, 175, 212, 260] },
    { g: '6A', ad: ['H_{2}O', 'H_{2}S', 'H_{2}Se', 'H_{2}Te'], v: [373.15, 213.15, 235, 275] },
    { g: '7A', ad: ['HF', 'HCl', 'HBr', 'HI'], v: [290, 188, 205, 225] },
  ];
  function hidrurGrafigi(c, p, o = {}) {
    const g = c.S('g', {}, p), BY = 470, HM = 340, PIT = 54, BW = 44, X0 = 56, GAP = 238;
    const hy = (v) => (v / 373.15) * HM;
    cizgi(c, g, [40, BY], [980, BY], GRI.cam, 3); cizgi(c, g, [40, BY], [40, 60], GRI.cam, 3);
    const yt = yazi(c, g, 26, 220, 'sıcaklık (K)', { size: 22, kalin: 600, renk: RENK.soluk }); yt.setAttribute('transform', 'rotate(-90 26 220)');
    const grup = HID.map((G, gi) => {
      const e = c.S('g', {}, g), x0 = X0 + gi * GAP, cubuklar = [];
      yazi(c, e, x0 + 2 * PIT - 5, BY + 36, G.g, { size: 24, kalin: 700 });
      G.ad.forEach((ad, i) => {
        const xc = x0 + i * PIT + BW / 2, h = hy(G.v[i]), q = c.S('g', {}, e);
        c.S('rect', { x: xc - BW / 2, y: BY - h, width: BW, height: h, rx: 4, fill: TON[i === 0 ? 'su' : 'alkol'], 'fill-opacity': i === 0 ? 0.95 : 0.8 }, q);
        yazi(c, q, xc, BY - h - 10, ad, { size: 20, kalin: 700, math: true });
        if ((gi === 0 && i === 0) || (gi === 2 && (i === 0 || i === 1))) {
          const t = yazi(c, q, xc + 7, BY - 10, virgul(G.v[i]), { hiza: 'start', size: 20, kalin: 700, renk: GRI.tahta }); t.setAttribute('transform', `rotate(-90 ${xc + 7} ${BY - 10})`);
        }
        cubuklar.push({ q, xc, ust: BY - h, i });
      });
      // Birinci üyeyi çerçeveleyen kutu.
      const fr = c.S('rect', { x: x0 - 4, y: BY - hy(G.v[0]) - 40, width: BW + 8, height: hy(G.v[0]) + 44, rx: 8, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, e);
      fr.style.opacity = 0;
      e.style.opacity = 0;
      return { e, fr, cubuklar, x0 };
    });
    return { g, grup, BY, hy, HID };
  }

  /* ---- bir su molekülü çevresinde dört, bir HF molekülü çevresinde iki hidrojen bağı (Görsel 2.22'nin sadeleştirilmişi) ----
     Dönen: { su: { g, hb[4], sayi[4], ad }, hf: { g, hb[2], sayi[2], ad } } — her hb ve sayi başta gizli. */
  function hidrojenBagiSayisi(c, p, o = {}) {
    const atom = (g, x, y, r, f, op = 1) => { const e = c.S('circle', { cx: x, cy: y, r, fill: f, stroke: '#4d4d4d', 'stroke-width': 1.5, 'stroke-opacity': op, 'fill-opacity': op }, g); return e; };
    const hb = (g, P, Q, n) => {
      const e = c.S('g', {}, g);
      cizgi(c, e, P, Q, RENK.cekme, 5, { 'stroke-dasharray': '9 7', 'stroke-linecap': 'butt' });
      const t = yazi(c, g, (P[0] + Q[0]) / 2 + (o.sayiDx ? o.sayiDx[n] : 0), (P[1] + Q[1]) / 2 - 14, String(n + 1), { size: 24, kalin: 700, renk: RENK.cekme });
      gizle(e, t);
      return { e, t };
    };
    // Su: ortada O, altta iki H; yanlarda komşular.
    const cx = o.sx || 250, cy = o.sy || 290, s = o.k || 1.35;
    const gs = c.S('g', {}, p), L = (dx, dy) => [cx + dx * s, cy + dy * s];
    const O = L(0, 0), H1 = L(-44, 34), H2 = L(44, 34), Oa = L(-96, 78), Ob = L(96, 78), Hc = L(-38, -62), Hd = L(38, -62), Oc = L(-70, -104), Od = L(70, -104);
    const bag = (a, b, w = 7, op = 1) => cizgi(c, gs, a, b, RENK.cizgi, w, { 'stroke-opacity': op });
    bag(O, H1); bag(O, H2); bag(Oc, Hc, 6, 0.6); bag(Od, Hd, 6, 0.6);
    atom(gs, Oa[0], Oa[1], 22 * s * 0.8, '#bdbdbd', 0.6); atom(gs, Ob[0], Ob[1], 22 * s * 0.8, '#bdbdbd', 0.6);
    atom(gs, Oc[0], Oc[1], 22 * s * 0.8, '#bdbdbd', 0.6); atom(gs, Od[0], Od[1], 22 * s * 0.8, '#bdbdbd', 0.6);
    atom(gs, Hc[0], Hc[1], 13 * s * 0.8, '#e6e6e6', 0.6); atom(gs, Hd[0], Hd[1], 13 * s * 0.8, '#e6e6e6', 0.6);
    atom(gs, O[0], O[1], 22 * s * 0.85, '#bdbdbd'); atom(gs, H1[0], H1[1], 13 * s * 0.85, '#e6e6e6'); atom(gs, H2[0], H2[1], 13 * s * 0.85, '#e6e6e6');
    yazi(c, gs, O[0], O[1] + 8, 'O', { size: 24, kalin: 700, renk: GRI.tahta }); yazi(c, gs, H1[0], H1[1] + 7, 'H', { size: 18, kalin: 700, renk: GRI.tahta }); yazi(c, gs, H2[0], H2[1] + 7, 'H', { size: 18, kalin: 700, renk: GRI.tahta });
    const near = (A, B, ra, rb) => { const a = Math.atan2(B[1] - A[1], B[0] - A[0]); return [ileri(A, a, ra), ileri(B, a, -rb)]; };
    const hbs = [near(H1, Oa, 13 * s * 0.85 + 4, 22 * s * 0.8 + 4), near(H2, Ob, 13 * s * 0.85 + 4, 22 * s * 0.8 + 4), near(Hc, O, 13 * s * 0.8 + 4, 22 * s * 0.85 + 4), near(Hd, O, 13 * s * 0.8 + 4, 22 * s * 0.85 + 4)];
    const suHb = hbs.map(([P, Q], n) => hb(gs, P, Q, n));
    const suAd = yazi(c, gs, cx, 515, 'H_{2}O', { size: 30, kalin: 700, math: true });
    // HF: F–H ··· F–H ··· F–H zinciri, ortadaki molekül merkezde.
    const gf = c.S('g', {}, p), fx = o.fx || 740, fy = o.fy || 290, ks = o.kf || 1.55;
    const F = [fx - 30 * ks, fy], Hh = [F[0] + 56 * ks, fy], Fa = [F[0] - 128 * ks, fy], Ha = [Fa[0] + 56 * ks, fy], Fc = [F[0] + 128 * ks, fy], Hcc = [Fc[0] + 56 * ks, fy];
    cizgi(c, gf, F, Hh, RENK.cizgi, 7); cizgi(c, gf, Fa, Ha, RENK.cizgi, 6, { 'stroke-opacity': 0.6 }); cizgi(c, gf, Fc, Hcc, RENK.cizgi, 6, { 'stroke-opacity': 0.6 });
    [[Fa, 0.6], [Fc, 0.6], [F, 1]].forEach(([P, op]) => atom(gf, P[0], P[1], 26 * ks * 0.85, '#d2d2d2', op));
    [[Ha, 0.6], [Hcc, 0.6], [Hh, 1]].forEach(([P, op]) => atom(gf, P[0], P[1], 15 * ks * 0.85, '#e6e6e6', op));
    yazi(c, gf, F[0], F[1] + 8, 'F', { size: 24, kalin: 700, renk: GRI.tahta }); yazi(c, gf, Hh[0], Hh[1] + 7, 'H', { size: 18, kalin: 700, renk: GRI.tahta });
    const hfHb = [near(Ha, F, 15 * ks * 0.85 + 4, 26 * ks * 0.85 + 4), near(Hh, Fc, 15 * ks * 0.85 + 4, 26 * ks * 0.85 + 4)].map(([P, Q], n) => hb(gf, P, Q, n));
    const hfAd = yazi(c, gf, fx, 515, 'HF', { size: 30, kalin: 700 });
    return { su: { g: gs, hb: suHb, ad: suAd }, hf: { g: gf, hb: hfHb, ad: hfAd } };
  }

  /* ---- tek tablo: iki bölüm (dış basınç değişir / sıvı değişir) ----
     o: { baslik: [bölüm adları] }. yaz(i, satirlar) bölümün satırlarını değiştirir (eskiler silinir); satır: [sol, orta, sağ] metni (boş olabilir).
     kart(satirlar) tabloyla birlikte üstte bir kart gösterir; notGoster() "1 atm = 760 mmHg" satırını açar. */
  function tekTablo(c, p, o = {}) {
    const g = c.S('g', {}, p), X = [210, 520, 800], SAT = 48, AY = [{ top: 100, h: 150, y: 134 }, { top: 268, h: 214, y: 302 }];
    const bol = AY.map((b, i) => {
      const e = c.S('g', {}, g);
      kutu(c, e, 40, b.top, 920, b.h, { rx: 14 });
      yazi(c, e, 70, b.y, o.baslik[i], { hiza: 'start', size: 26, kalin: 700, renk: RENK.vurgu });
      yazi(c, e, X[2], b.y, '°C', { size: 24, kalin: 700, renk: RENK.soluk });
      return { e, ic: c.S('g', {}, e), y: b.y };
    });
    const nt = yazi(c, g, 500, 530, '1 atm = 760 mmHg', { size: 22, kalin: 600, renk: RENK.soluk });
    nt.style.opacity = 0;
    let kg = null;
    return {
      g, bol, nt,
      async yaz(i, satirlar, ms = 450) {
        const b = bol[i];
        if (b.ic.firstChild) await belir(c, b.ic, 250, 0);
        b.ic.textContent = '';
        satirlar.forEach((s, j) => s.forEach((m, q) => { if (m) yazi(c, b.ic, X[q], b.y + SAT * (j + 1), m, { size: 26, kalin: q === 2 ? 700 : 600, renk: q === 2 ? RENK.vurgu : RENK.yazi, math: /[_^]\{/.test(m) }); }));
        b.ic.style.opacity = 0; await belir(c, b.ic, ms, 1);
      },
      sil(i, ms = 250) { return belir(c, bol[i].ic, ms, 0); },
      notGoster(a, ms = 350) { return belir(c, nt, ms, a ? 1 : 0); },
      async kart(satirlar) {
        kg = c.S('g', {}, g); kutu(c, kg, 150, 8, 700, 74, { rx: 14, renk: RENK.vurgu });
        satirlar.forEach((m, j) => yazi(c, kg, 500, 54 + (j - (satirlar.length - 1) / 2) * 0, m, { size: 30, kalin: 700, math: /[_^]\{/.test(m) }));
        kg.style.opacity = 0; await belir(c, kg, 350, 1);
      },
      async kartKaldir() { if (!kg) return; await belir(c, kg, 250, 0); kg.remove(); kg = null; },
    };
  }

  /* ---- kart başına seçimle sınıflandırma tahtası (sinifla ile birlikte) ----
     o: { kutular: [{ baslik, x, y, w, h }], ciz(k, g), chip(k, p, x, y) } */
  function kutuTahtasi(c, p, o) {
    const kg = o.kutular.map((q) => {
      const g = c.S('g', {}, p); kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      yazi(c, g, q.x + q.w / 2, q.y + 40, q.baslik, { size: o.baslikPunto || 25, kalin: 700 });
      return { g, n: 0 };
    });
    let kartG = null;
    return {
      kg,
      async sec(i, k) {
        kartG = c.S('g', {}, p); kartG.style.opacity = 0;
        o.ciz(k, kartG);
        await belir(c, kartG, 350, 1);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kg[k.kutu], hy = q.y + 96 + e.n * 52; e.n++;
        await belir(c, kartG, 250, 0); kartG.remove(); kartG = null;
        const ch = o.chip(k, p, q.x + q.w / 2, hy);
        ch.style.opacity = 0; await belir(c, ch, 350, 1);
      },
    };
  }

  return {
    GRI, DIS, IC, TON, EGRI, KAY, KPA, ESIK, HID, virgul, W, sinir, lerp, okK, okSirasi, dolas, git, suMol, kap, manzara, sirinca, kabarcikModeli, buharGrafigi,
    kaynamaDeney, iddiaCercevesi, cubukKpa, kureCift, kaynamaCubuklari, hidrurGrafigi, hidrojenBagiSayisi, tekTablo, kutuTahtasi,
  };
})();
