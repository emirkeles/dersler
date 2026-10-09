/* C9 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C9")
   Yazar notu: içerik MEB Fizik 9 s. 72–74, 76, 83–85'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: A birinci vektör rengi, B ikinci vektör rengi, R bileşke rengi; bileşenler kesikli ok, yardımcı çizgiler kesikli.
   Üç panel: uç uca, paralelkenar, bileşenler; hepsinde aynı kareli düzlem (kare 40) ve aynı başlangıç noktası. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, gizle, belir, sol, kaybol, par, ok, okCiz, okGit, izgara, kutular, sinifla } = KIT;
  const { lerp } = Ders;

  /* ---- Derse özel yardımcılar ---- */
  /* Vektör adının üstündeki küçük ok (C1–C6 ile aynı ölçüler): t yazısının i. harfinin üstüne çizilir. */
  function ustOk(c, g, t, i, size, renk) {
    const n = t.textContent.length;
    let a = null, b = null;
    try { a = t.getStartPositionOfChar(i).x; b = t.getEndPositionOfChar(i).x; } catch (e) { a = null; }
    if (a == null || !(b > a)) {
      const w = size * 0.6, x = +t.getAttribute('x'), hiza = t.getAttribute('text-anchor');
      a = (hiza === 'middle' ? x - n * w / 2 : hiza === 'end' ? x - n * w : x) + i * w; b = a + w;
    }
    const y = +t.getAttribute('y') - size * 0.9, m = (a + b) / 2, w = Math.max((b - a) / 2 + 1, size * 0.3), u = size * 0.15;
    return c.S('path', { d: `M ${m - w} ${y} L ${m + w} ${y} M ${m + w - u} ${y - u} L ${m + w} ${y} L ${m + w - u} ${y + u}`, fill: 'none', stroke: renk, 'stroke-width': Math.max(2, size * 0.08), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  }
  /* Tahta yazısı: '~A_{x}' alt indis yazar; '~' işaretinden sonraki harfin üstüne vektör oku konur ('~A = ~A_{x} + ~A_{y}').
     Oklu yazıda grup döner (g.yazi yazının kendisidir); '~' yoksa yazının kendisi döner. */
  const myazi = (c, p, x, y, m, o = {}) => {
    const size = o.size || 26, renk = o.renk || RENK.yazi, idx = [];
    let duz = '', n = 0;
    for (const ch of m) { if (ch === '~') idx.push(n); else { duz += ch; if (!'_{}'.includes(ch)) n++; } }
    const g = idx.length ? c.S('g', {}, p) : p;
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': size, 'font-weight': o.kalin || 600, style: 'fill:' + renk, math: duz }, g);
    if (!idx.length) return t;
    idx.forEach((i) => ustOk(c, g, t, i, size, renk));
    g.yazi = t; return g;
  };
  const goster = (...els) => els.flat().forEach((e) => { if (e) e.style.opacity = 1; });
  const ciz = (c, v, ms = 600) => { goster(v, v.etiket); return okCiz(c, v, ms); };
  const KESIK = { kesik: true, kalin: 5, uc: 16 };
  const tarif = (di, dj) => [di ? Math.abs(di) + (di > 0 ? ' sağ' : ' sol') : '', dj ? Math.abs(dj) + (dj > 0 ? ' yukarı' : ' aşağı') : ''].filter(Boolean).join(', ');
  const onay = (c, p, x, y, renk) => yol(c, p, `M ${x - 11} ${y} l 8 9 l 15 -20`, { renk: renk || RENK.iyi, kalin: 5 });
  const carpi = (c, p, x, y) => yol(c, p, `M ${x - 10} ${y - 10} l 20 20 M ${x + 10} ${y - 10} l -20 20`, { renk: RENK.kotu, kalin: 5 });
  const uzat = (c, l, ms = 600) => {
    const x1 = +l.getAttribute('x1'), y1 = +l.getAttribute('y1'), x2 = +l.getAttribute('x2'), y2 = +l.getAttribute('y2');
    return c.tween(ms, (e) => { l.setAttribute('x2', lerp(x1, x2, e)); l.setAttribute('y2', lerp(y1, y2, e)); });
  };

  /* Kareli düzlem ve başlangıç noktası. eksen: iki eksen çizilir; adlar: '+x', '+y' (ve true ise −x, −y) yazılır; O: false ise harf yazılmaz. */
  function duzlem(c, p, o = {}) {
    const kare = o.kare || 40, sutun = o.sutun || 7, satir = o.satir || 6, oi = o.oi == null ? 1 : o.oi, oj = o.oj == null ? 1 : o.oj;
    const iz = izgara(c, p, { kare, sutun, satir, x: o.x, y: o.y });
    const [ox, oy] = iz.P(oi, oj), xs = iz.x0, xe = iz.x0 + sutun * kare, ys = iz.y0, ye = iz.y0 + satir * kare;
    const e = { renk: RENK.cizgi, kalin: 3, uc: 12 }, t = { size: 24, renk: RENK.soluk };
    if (o.eksen) {
      ok(c, iz.g, ox, oy, xe + 14, oy, e); ok(c, iz.g, ox, oy, xs - 14, oy, e); ok(c, iz.g, ox, oy, ox, ys - 14, e); ok(c, iz.g, ox, oy, ox, ye + 14, e);
      if (o.adlar) { yazi(c, iz.g, xe + 20, oy + 8, '+x', { ...t, hiza: 'start' }); yazi(c, iz.g, ox, ys - 22, '+y', t); }
      if (o.adlar === true) { yazi(c, iz.g, xs - 20, oy + 8, '−x', { ...t, hiza: 'end' }); yazi(c, iz.g, ox, ye + 38, '−y', t); }
    }
    c.S('circle', { cx: ox, cy: oy, r: 5, fill: RENK.yazi }, iz.g);
    if (o.O !== false) yazi(c, iz.g, ox - 12, oy + 28, 'O', { ...t, hiza: 'end' });
    const Q = (i, j) => iz.P(oi + i, oj + j);
    /* ad verilirse üstü oklu etiket okla birlikte taşınır (v.etiket); okun altına düşen etiket ok çizgisinden biraz uzaklaşır. */
    const vek = (i, j, di, dj, vo = {}) => {
      const { ad, ...kalan } = vo, v = iz.vektor(oi + i, oj + j, di, dj, kalan);
      if (ad) {
        const e = myazi(c, vo.katman || iz.g, 0, 0, '~' + ad, { size: vo.size || 28, renk: vo.renk || RENK.a }), yer = { x: 0, y: 0 }, koy = e.setAttribute.bind(e);
        e.setAttribute = (k, d) => {
          if (k !== 'x' && k !== 'y') return koy(k, d);
          yer[k] = +d;
          const orta = (iz.P(v.i, v.j)[1] + iz.P(v.i + v.di, v.j + v.dj)[1]) / 2, ek = 12 * Math.max(0, (yer.y - 9 - orta) / 24);
          koy('transform', `translate(${yer.x} ${yer.y + ek})`);
        };
        v.etiket = e; v.koy(v.i, v.j);
      }
      return v;
    };
    const tasi = (v, i, j, to) => iz.tasi(c, v, oi + i, oj + j, to);
    return { iz, g: iz.g, ox, oy, oi, oj, xs, xe, ys, ye, kare, Q, vek, tasi };
  }
  const panelKur = (c, p, x, y, baslik, o = {}) => {
    const d = duzlem(c, p, { x, y, oi: o.oi, oj: o.oj, eksen: !!o.eksen, O: o.O });
    yazi(c, d.g, x + 140, y - 14, baslik, { size: 24, renk: RENK.vurgu });
    return d;
  };
  /* (i, j) noktası ile eksenler arasındaki ince noktalı paraleller; eksenden noktaya doğru çizilir. */
  function paraleller(c, d, p, i, j) {
    const g = c.S('g', {}, p), [x, y] = d.Q(i, j), [x0, y0] = d.Q(0, 0), o = { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' };
    const l1 = j ? cizgi(c, g, x, y0, x, y, o) : null, l2 = i ? cizgi(c, g, x0, y, x, y, o) : null;
    g.ciz = (ms = 600) => c.tween(ms, (e) => { if (l1) l1.setAttribute('y2', lerp(y0, y, e)); if (l2) l2.setAttribute('x2', lerp(x0, x, e)); });
    return g;
  }
  /* Üç yöntemin çizimleri. Her biri son hâliyle kurulur; bas() başlangıç hâline alır, oyna() adım adım çizer. */
  function ucuca(c, d, p, A, B) {
    const a = d.vek(0, 0, ...A, { renk: RENK.a, katman: p }), b = d.vek(A[0], A[1], ...B, { renk: RENK.b, katman: p }), r = d.vek(0, 0, A[0] + B[0], A[1] + B[1], { renk: RENK.r, katman: p });
    return { a, b, r, bas: () => { b.koy(d.oi, d.oj); gizle(r); }, oyna: async (k = 1) => { await d.tasi(b, A[0], A[1], { ms: 800 * k }); await ciz(c, r, 600 * k); } };
  }
  function paralel(c, d, p, A, B) {
    const S = [A[0] + B[0], A[1] + B[1]], o = { renk: RENK.soluk, kalin: 3, kesik: '7 7' };
    const p1 = cizgi(c, p, ...d.Q(...A), ...d.Q(...S), o), p2 = cizgi(c, p, ...d.Q(...B), ...d.Q(...S), o);
    const a = d.vek(0, 0, ...A, { renk: RENK.a, katman: p }), b = d.vek(0, 0, ...B, { renk: RENK.b, katman: p }), r = d.vek(0, 0, ...S, { renk: RENK.r, katman: p });
    return { a, b, r, p1, p2, bas: () => gizle(p1, p2, r), oyna: async (k = 1) => { goster(p1, p2); await par(uzat(c, p1, 600 * k), uzat(c, p2, 600 * k)); await ciz(c, r, 600 * k); } };
  }
  function bilesenli(c, d, p, A, B) {
    const S = [A[0] + B[0], A[1] + B[1]];
    const a = d.vek(0, 0, ...A, { renk: RENK.a, kalin: 4, uc: 13, katman: p }), b = d.vek(0, 0, ...B, { renk: RENK.b, kalin: 4, uc: 13, katman: p });
    const x = S[0] ? d.vek(0, 0, S[0], 0, { renk: RENK.r, ...KESIK, katman: p }) : null, y = S[1] ? d.vek(0, 0, 0, S[1], { renk: RENK.r, ...KESIK, katman: p }) : null;
    const pl = paraleller(c, d, p, S[0], S[1]), r = d.vek(0, 0, ...S, { renk: RENK.r, katman: p }), xy = [x, y].filter(Boolean);
    return { a, b, r, x, y, pl, bas: () => gizle(xy, pl, r), oyna: async (k = 1) => { await par(xy.map((v) => ciz(c, v, 500 * k))); goster(pl); await pl.ciz(400 * k); await ciz(c, r, 600 * k); } };
  }
  /* Bileşen tablosu: satırlar A, B, R; sütunlar x, y. */
  function btablo(c, p, o = {}) {
    const x = o.x, y = o.y, W = o.W || [50, 115, 115], sy = o.sy || 46, g = c.S('g', {}, p), y0 = y + (o.baslik ? sy : 0);
    const w = W[0] + W[1] + W[2], cx = [x + W[0] / 2, x + W[0] + W[1] / 2, x + W[0] + W[1] + W[2] / 2];
    if (o.baslik) { yazi(c, g, cx[1], y + sy * 0.68, 'x', { size: 24, renk: RENK.soluk }); yazi(c, g, cx[2], y + sy * 0.68, 'y', { size: 24, renk: RENK.soluk }); }
    for (let r = 0; r <= 3; r++) cizgi(c, g, x, y0 + r * sy, x + w, y0 + r * sy, { renk: r === 0 || r === 3 ? RENK.cizgi : RENK.ince, kalin: r === 0 || r === 3 ? 2 : 1.5 });
    const renkler = [RENK.a, RENK.b, RENK.r], adlar = ['A', 'B', 'R'];
    const yaz = (r, k, metin) => myazi(c, g, cx[k], y0 + r * sy + sy * 0.72, (k ? '' : '~') + metin, { size: 24, renk: renkler[r] });
    const satir = (r, xm, ym) => [yaz(r, 0, adlar[r]), xm == null ? null : yaz(r, 1, xm), ym == null ? null : yaz(r, 2, ym)].filter(Boolean);
    return { g, yaz, satir };
  }
  /* Küçük şema (karesiz): 0 uç uca, 1 paralelkenar, 2 bileşenler. Çift: A 3 sağ 1 yukarı, B 2 sağ 3 yukarı. */
  function mini(c, p, x, y, tur, k) {
    const g = c.S('g', {}, p), P = (i, j) => [x + i * k, y - j * k], o = { kalin: 4, uc: 11 }, A = [3, 1], B = [2, 3], S = [5, 4], el = {};
    const O2 = (a, b, renk, ek) => ok(c, g, ...P(...a), ...P(...b), { renk, ...o, ...ek });
    const cz = (a, b) => cizgi(c, g, ...P(...a), ...P(...b), { renk: RENK.soluk, kalin: 2, kesik: '5 5' });
    if (tur === 0) { el.a = O2([0, 0], A, RENK.a); el.b = O2(A, S, RENK.b); }
    if (tur === 1) { cz(A, S); cz(B, S); el.a = O2([0, 0], A, RENK.a); el.b = O2([0, 0], B, RENK.b); }
    if (tur === 2) { cz([5, 0], S); cz([0, 4], S); el.x = O2([0, 0], [5, 0], RENK.r, { kesik: true }); el.y = O2([0, 0], [0, 4], RENK.r, { kesik: true }); }
    el.r = O2([0, 0], S, RENK.r, { kalin: 5, uc: 13 });
    el.o = c.S('circle', { cx: x, cy: y, r: 4, fill: RENK.yazi }, g);
    return Object.assign(g, { el, P });
  }
  const yanSon = async (c, els, tekrar = 2) => { for (let n = 0; n < tekrar; n++) { await sol(c, els, 0.25, 220); await belir(c, els, 220); } };

  /* ---- Sahne 1 · İki arkadaş, iki yöntem ---- */
  async function ikiArkadas(c) {
    const svg = c.svg(1000, 562), KX = [40, 360, 680], KW = 280, KH = 176, KY = 24, adlar = ['uç uca ekleme', 'paralelkenar', 'bileşenler'];
    const kartlar = adlar.map((ad, i) => {
      const g = c.S('g', {}, svg), ic = c.S('g', {}, g);
      kutu(c, g, KX[i], KY, KW, KH, { rx: 12, fill: 'none' });
      yazi(c, ic, KX[i] + KW / 2, KY + KH - 14, ad, { size: 24, renk: RENK.vurgu });
      if (i < 2) mini(c, ic, KX[i] + 80, KY + 128, i, 24);
      else {
        const tx = KX[i] + 58, ty = KY + 16, sx = [tx + 20, tx + 75, tx + 130];
        yazi(c, ic, sx[1], ty + 22, 'x', { size: 22, renk: RENK.soluk }); yazi(c, ic, sx[2], ty + 22, 'y', { size: 22, renk: RENK.soluk });
        [RENK.a, RENK.b, RENK.r].forEach((renk, r) => {
          const y = ty + 32 + r * 30;
          cizgi(c, ic, tx, y, tx + 164, y, { renk: RENK.ince, kalin: 1.5 });
          c.S('circle', { cx: sx[0], cy: y + 15, r: 6, fill: renk }, ic);
          ok(c, ic, sx[1] - 16, y + 15, sx[1] + 16, y + 15, { renk, kalin: 4, uc: 10 }); ok(c, ic, sx[2], y + 26, sx[2], y + 4, { renk, kalin: 4, uc: 10 });
        });
      }
      gizle(g, ic); return { g, ic };
    });
    await belir(c, kartlar.map((k) => k.g), 400);
    await c.say('İki vektörü toplamanın üç yolunu biliyorsun.');
    await belir(c, kartlar[0].ic, 350);
    await c.say('Uç uca eklemede bir ok, ötekinin bitiş noktasına taşınır.');
    await belir(c, kartlar[1].ic, 350);
    await c.say('Paralelkenar yönteminde iki okun başlangıçları aynı noktaya getirilir.');
    await belir(c, kartlar[2].ic, 350);
    await c.say('Üçüncü yolda aynı eksendeki bileşenler kendi aralarında toplanır.');
    // İki defter yaprağı: aynı A ve B
    const yaprak = (x, ad) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, x, 218, 400, 326, { rx: 10, renk: RENK.ince });
      yazi(c, g, x + 20, 252, ad, { size: 24, hiza: 'start' });
      const d = duzlem(c, g, { x: x + 90, y: 264, O: false }), ic = c.S('g', {}, g);
      const a = d.vek(0, 0, 3, 1, { renk: RENK.a, ad: 'A', katman: ic, yan: 1 }), b = d.vek(0, 0, 2, 3, { renk: RENK.b, ad: 'B', katman: ic, yan: 1 });
      gizle(g); return { g, d, ic, a, b };
    };
    const elif = yaprak(70, 'Elif'), deniz = yaprak(530, 'Deniz');
    await belir(c, [elif.g, deniz.g], 400);
    await c.say('Elif ile Deniz aynı iki vektörü toplayacak.');
    const o = { renk: RENK.soluk, kalin: 3, kesik: '7 7' };
    const p1 = cizgi(c, deniz.ic, ...deniz.d.Q(3, 1), ...deniz.d.Q(5, 4), o), p2 = cizgi(c, deniz.ic, ...deniz.d.Q(2, 3), ...deniz.d.Q(5, 4), o);
    await par(c.say('Elif okları uç uca ekliyor; Deniz paralelkenar kuruyor.'), elif.d.tasi(elif.b, 3, 1, { ms: 1100 }), uzat(c, p1, 1100), uzat(c, p2, 1100));
    await c.choice({ tag: 'Tahmin et', q: 'İkisinin bulacağı bileşke için ne beklersin?', options: ['Yöntem farklı olduğu için farklı çıkar', 'İkisi de aynı bileşkeyi bulur', 'Birbirine yakın ama ayrı iki ok çıkar'], answer: 1,
      hints: ['Toplanan vektörler aynı; değişen yalnızca çizim yolu. İki çizimi birazdan üst üste koyacağız.', '', 'Kareli düzlemde yöntemler yaklaşık değil, tam sonuç verir. İki ok aynı noktaya varır.'],
      right: 'Evet. Toplanan vektörler aynıysa bileşke de aynıdır.' });
    await par(c.say('Toplanan vektörler aynıysa yaptıkları etki de aynıdır.'), yanSon(c, [elif.a, elif.b, deniz.a, deniz.b]));
    await c.say('Bunu aynı çifti üç yolla toplayarak sınayalım.');
  }

  /* ---- Sahne 2 · Üç yol yan yana ---- */
  async function yanYana(c) {
    const svg = c.svg(1000, 562);
    const d1 = panelKur(c, svg, 40, 70, 'uç uca'), d2 = panelKur(c, svg, 360, 70, 'paralelkenar'), d3 = panelKur(c, svg, 680, 70, 'bileşenler', { eksen: true });
    const g = c.S('g', {}, svg), A = [3, 1], B = [2, 3];
    const A1 = d1.vek(0, 0, ...A, { renk: RENK.a, ad: 'A', katman: g, yan: 1 }), B1 = d1.vek(0, 0, ...B, { renk: RENK.b, ad: 'B', katman: g, yan: 1 });
    const A2 = d2.vek(0, 0, ...A, { renk: RENK.a, katman: g }), B2 = d2.vek(0, 0, ...B, { renk: RENK.b, katman: g });
    gizle(A1, B1, A2, B2, A1.etiket, B1.etiket);
    await par(ciz(c, A1, 600), ciz(c, B1, 600), ciz(c, A2, 600), ciz(c, B2, 600));
    await c.say('A vektörü 3 sağ, 1 yukarı; B vektörü 2 sağ, 3 yukarı.', { speak: 'a vektörü üç sağ, bir yukarı; be vektörü iki sağ, üç yukarı.' });
    const R1 = d1.vek(0, 0, 5, 4, { renk: RENK.r, katman: g }); gizle(R1);
    await par(c.say('Elif B’yi A’nın ucuna taşıdı, baştan sona oku çizdi.', { speak: 'Elif be vektörünü a vektörünün ucuna taşıdı, baştan sona oku çizdi.' }), (async () => { await d1.tasi(B1, 3, 1, { ms: 1000 }); await ciz(c, R1, 800); })());
    const sonuc = yazi(c, svg, 340, 430, 'Elif: 5 sağ, 4 yukarı', { size: 30, renk: RENK.r });
    await belir(c, sonuc, 300);
    await c.say('Elif’in bileşkesi 5 sağ, 4 yukarı.', { speak: 'Elif’in bileşkesi beş sağ, dört yukarı.' });
    const o = { renk: RENK.soluk, kalin: 3, kesik: '7 7' };
    const p1 = cizgi(c, g, ...d2.Q(...A), ...d2.Q(5, 4), o), p2 = cizgi(c, g, ...d2.Q(...B), ...d2.Q(5, 4), o);
    await par(c.say('Deniz iki oku aynı noktadan çizip paralelleri çekti.'), uzat(c, p1, 1000), uzat(c, p2, 1000));
    const R2 = d2.vek(0, 0, 5, 4, { renk: RENK.r, katman: g }); gizle(R2);
    const kesisim = c.S('circle', { cx: d2.Q(5, 4)[0], cy: d2.Q(5, 4)[1], r: 7, fill: RENK.vurgu }, g);
    await belir(c, kesisim, 250);
    await par(c.say('Paraleller 5 sağ, 4 yukarıda kesişti; köşegen oraya uzandı.', { speak: 'Paraleller beş sağ, dört yukarıda kesişti; köşegen oraya uzandı.' }), ciz(c, R2, 900));
    sonuc.textContent = 'Deniz: 5 sağ, 4 yukarı';
    await c.say('Deniz’in bileşkesi de 5 sağ, 4 yukarı.', { speak: 'Deniz’in bileşkesi de beş sağ, dört yukarı.' });
    const t = btablo(c, svg, { x: 680, y: 350 });
    const A3 = d3.vek(0, 0, ...A, { renk: RENK.a, kalin: 4, uc: 13, katman: g }), B3 = d3.vek(0, 0, ...B, { renk: RENK.b, kalin: 4, uc: 13, katman: g }); gizle(A3, B3, t.g);
    await par(kaybol(c, sonuc, 300), belir(c, t.g, 300), ciz(c, A3, 500), ciz(c, B3, 500));
    await belir(c, [...t.satir(0, '+x 3', '+y 1'), ...t.satir(1, '+x 2', '+y 3'), t.yaz(2, 0, 'R')], 300);
    await c.say('Şimdi üçüncü yolu sen dene: bileşenleri topla.');
    await c.choice({ tag: 'Uygula', q: 'A: +x yönünde 3, +y yönünde 1 birim. B: +x yönünde 2, +y yönünde 3 birim. Bileşkenin bileşenleri nedir?',
      options: ['R<sub>x</sub>: 4, R<sub>y</sub>: 5 birim', 'R<sub>x</sub>: +x yönünde 5, R<sub>y</sub>: +y yönünde 4 birim', 'Tek bileşen: 9 birim'], answer: 1,
      hints: ['Her vektörün kendi x ve y bileşenini topladın. x’ler 3 ile 2, y’ler 1 ile 3 toplanır.', '', 'Yatay ile düşey bileşen tek sayıda toplanmaz. Sütunlar ayrı toplanır: 5 ve 4.'],
      right: 'Evet. Yataylar 5, düşeyler 4 eder.' });
    const Rx = d3.vek(0, 0, 5, 0, { renk: RENK.r, ...KESIK, katman: g }), Ry = d3.vek(0, 0, 0, 4, { renk: RENK.r, ...KESIK, katman: g }), pl = paraleller(c, d3, g, 5, 4), R3 = d3.vek(0, 0, 5, 4, { renk: RENK.r, katman: g });
    gizle(Rx, Ry, pl, R3);
    await par(belir(c, [t.yaz(2, 1, '+x 5'), t.yaz(2, 2, '+y 4')], 300), ciz(c, Rx, 600), ciz(c, Ry, 600));
    goster(pl); await pl.ciz(500);
    await par(c.say('Bileşenlerle de bileşke 5 sağ, 4 yukarı çıktı.', { speak: 'Bileşenlerle de bileşke beş sağ, dört yukarı çıktı.' }), ciz(c, R3, 800));
    // Üç bileşke tek düzlemde üst üste
    const k1 = ok(c, g, ...R1.uclar, { renk: RENK.r }), k2 = ok(c, g, ...R2.uclar, { renk: RENK.r });
    await sol(c, [A3, B3, Rx, Ry, pl], 0.25, 300);
    await par(c.say('Üç oku üst üste koyalım: uçları aynı noktada.'), (async () => { await okGit(c, k2, ...R3.uclar, 1100); await okGit(c, k1, ...R3.uclar, 1300); })());
    const uc = c.S('circle', { cx: d3.Q(5, 4)[0], cy: d3.Q(5, 4)[1], r: 8, fill: RENK.vurgu }, g);
    await belir(c, uc, 300);
    await c.say('Üç yol, tek bileşke: yaklaşık değil, tam aynı ok.');
    await par(c.say('Bileşke ne A’dır ne B; ikisinin etkisini yapan yeni bir oktur.', { speak: '[thoughtful] Bileşke ne a vektörüdür ne be vektörü; ikisinin etkisini yapan yeni bir oktur.' }), yanSon(c, [R1, R2, R3, k1, k2]));
    c.note('<b>Yöntem değişir, bileşke değişmez.</b><br>3 sağ 1 yukarı + 2 sağ 3 yukarı → üç yolla da 5 sağ, 4 yukarı', 'Üç yol', 'ucyol');
  }

  /* ---- Sahne 3 · İki çizim, aynı üçgen ---- */
  async function ucgen(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { kare: 62, x: 40, y: 80, O: false }), alt = c.S('g', {}, svg), g = c.S('g', {}, svg);
    const o = { renk: RENK.soluk, kalin: 3, kesik: '9 8' }, nokta = (i, j) => d.Q(i, j).join(',');
    const p1 = cizgi(c, g, ...d.Q(3, 1), ...d.Q(5, 4), o), p2 = cizgi(c, g, ...d.Q(2, 3), ...d.Q(5, 4), o);
    const A = d.vek(0, 0, 3, 1, { renk: RENK.a, ad: 'A', katman: g, yan: 1 }), B = d.vek(0, 0, 2, 3, { renk: RENK.b, ad: 'B', katman: g }), R = d.vek(0, 0, 5, 4, { renk: RENK.r, ad: 'R', katman: g });
    await c.say('İki çizim neden aynı oku veriyor?', { speak: '[curious] İki çizim neden aynı oku veriyor?' });
    const hl = cizgi(c, g, ...d.Q(3, 1), ...d.Q(5, 4), { renk: RENK.vurgu, kalin: 7, kesik: '12 9' });
    await par(c.say('Paralelkenarda A’nın ucundan kesişme noktasına giden kenara bakalım.', { speak: 'Paralelkenarda a vektörünün ucundan kesişme noktasına giden kenara bakalım.' }), uzat(c, hl, 1000));
    await par(c.say('Bu kenar B’ye paralel çizilmişti.', { speak: 'Bu kenar be vektörüne paralel çizilmişti.' }), yanSon(c, [B, hl]));
    const say = c.S('g', {}, g), [x1, y1] = d.Q(3, 1), [x2, y2] = d.Q(5, 4);
    cizgi(c, say, x1, y1, x2, y1, { renk: RENK.vurgu, kalin: 3, kesik: '6 7' }); cizgi(c, say, x2, y1, x2, y2, { renk: RENK.vurgu, kalin: 3, kesik: '6 7' });
    yazi(c, say, (x1 + x2) / 2, y1 + 30, '2 sağ', { size: 24, renk: RENK.vurgu }); yazi(c, say, x2 + 14, (y1 + y2) / 2 + 8, '3 yukarı', { size: 24, renk: RENK.vurgu, hiza: 'start' });
    gizle(say); await belir(c, say, 350);
    await c.say('Kareleri sayalım: A’nın ucundan 2 sağ, 3 yukarı gidiyor.', { speak: 'Kareleri sayalım: a vektörünün ucundan iki sağ, üç yukarı gidiyor.' });
    await c.choice({ tag: 'Düşün', q: 'Bu kenar hangi vektöre eşittir?', options: ['A', 'R', 'B'], answer: 2,
      hints: ['A 3 sağ, 1 yukarı gidiyor; bu kenar 2 sağ, 3 yukarı. Yönü ve boyu B ile aynı.', 'R başlangıç noktasından çıkan köşegendir. Bu kenar A’nın ucundan başlıyor ve B kadar gidiyor.', ''],
      right: 'Evet. Yönü ve büyüklüğü B ile aynı.' });
    const Bt = d.vek(3, 1, 2, 3, { renk: RENK.b, ad: 'B', katman: g, yan: 1 }); gizle(Bt, Bt.etiket);
    await par(kaybol(c, [hl, say, p1], 300), ciz(c, Bt, 800));
    await c.say('Bu kenar, A’nın ucuna taşınmış B’dir.', { speak: 'Bu kenar, a vektörünün ucuna taşınmış be vektörüdür.' });
    const u1 = c.S('polygon', { points: [nokta(0, 0), nokta(3, 1), nokta(5, 4)].join(' '), fill: RENK.a, opacity: 0.22 }, alt);
    const eg = c.S('g', {}, svg), ed = duzlem(c, eg, { x: 660, y: 150, O: false });
    yazi(c, eg, 800, 134, 'Elif', { size: 24 });
    c.S('polygon', { points: [ed.Q(0, 0), ed.Q(3, 1), ed.Q(5, 4)].map((p) => p.join(',')).join(' '), fill: RENK.a, opacity: 0.22 }, eg);
    ed.vek(0, 0, 3, 1, { renk: RENK.a, katman: eg }); ed.vek(3, 1, 2, 3, { renk: RENK.b, katman: eg }); ed.vek(0, 0, 5, 4, { renk: RENK.r, katman: eg });
    gizle(u1, eg);
    await par(belir(c, u1, 400, 0.22), belir(c, eg, 500));
    await c.say('Yani paralelkenarın alt yarısı, Elif’in uç uca ekleme üçgenidir.');
    const u2 = c.S('polygon', { points: [nokta(0, 0), nokta(2, 3), nokta(5, 4)].join(' '), fill: RENK.b, opacity: 0.22 }, alt); gizle(u2);
    const At = d.vek(2, 3, 3, 1, { renk: RENK.a, ad: 'A', katman: g }); gizle(At, At.etiket);
    await par(belir(c, u2, 400, 0.22), kaybol(c, p2, 300), ciz(c, At, 800));
    await c.say('Üst yarısı da öbür sıradır: önce B, ucunda A.', { speak: 'Üst yarısı da öbür sıradır: önce be vektörü, ucunda a vektörü.' });
    await c.say('Paralelkenar, uç uca eklemenin iki sırasını birlikte gösterir.');
    await par(c.say('İki yöntem aynı üçgeni çizdiği için bileşke değişmez.', { speak: 'İki yöntem aynı üçgeni çizdiği için, [short pause] bileşke değişmez.' }), yanSon(c, [R]));
  }

  /* ---- Sahne 4 · Başka çiftlerle sına ---- */
  async function sina(c) {
    const svg = c.svg(1000, 562), CX = [180, 500, 820], AD = ['uç uca', 'paralelkenar', 'bileşenler'];
    const kur = (oi, oj) => { const pg = c.S('g', {}, svg); return { pg, ds: [0, 1, 2].map((k) => panelKur(c, pg, 40 + k * 320, 56, AD[k], { oi, oj, O: false, eksen: k === 2 })) }; };
    const { pg, ds } = kur(1, 2), rg = c.S('g', {}, svg);
    const satirY = (n) => 352 + n * 52;
    const hucre = (n, k, m) => yazi(c, rg, CX[k], satirY(n), m, { size: 24, renk: RENK.r });
    const topla = (n, hs) => sol(c, hs, 0.6, 250); // biten satır hafif soluklaşır, okunur kalır; üç satır dolunca dokuz göz birlikte parlar
    [0, 1, 2, 3].forEach((n) => cizgi(c, rg, 40, satirY(n) - 34, 960, satirY(n) - 34, { renk: RENK.ince, kalin: 1.5 }));
    const cift = (dz, p, A, B) => { const u = ucuca(c, dz[0], p, A, B), pr = paralel(c, dz[1], p, A, B), bl = bilesenli(c, dz[2], p, A, B); u.bas(); pr.bas(); bl.bas(); return { u, pr, bl }; };
    const ucAd = (p, v, ad, renk) => { const [a, b, x, y] = v.uclar, L = Math.hypot(x - a, y - b) || 1; return myazi(c, p, x + ((x - a) / L) * 24, y + ((y - b) / L) * 24 + 11, '~' + ad, { size: 24, renk }); };
    const h1 = [0, 1, 2].map((k) => hucre(0, k, '5 sağ, 4 yukarı')); gizle(h1);
    await belir(c, h1, 400);
    await c.say('Tek bir çift yetmez; başka çiftlerle de sınayalım.');
    // İkinci çift: üç küçük çizim art arda kurulur
    await topla(0, h1);
    let g = c.S('g', {}, svg), m = cift(ds, g, [4, 0], [1, 3]), adl = [ucAd(g, m.u.a, 'A', RENK.a), ucAd(g, m.u.b, 'B', RENK.b)];
    gizle(g); await belir(c, g, 400);
    await c.say('İkinci çift: A 4 sağ; B 1 sağ, 3 yukarı.', { speak: 'İkinci çift: a vektörü dört sağ; be vektörü bir sağ, üç yukarı.' });
    await kaybol(c, adl, 200);
    await m.u.oyna(0.8); await m.pr.oyna(0.8); await m.bl.oyna(0.8);
    const h2 = [0, 1, 2].map((k) => hucre(1, k, '5 sağ, 3 yukarı')); gizle(h2);
    await belir(c, h2, 350);
    await c.say('Üç yol da 5 sağ, 3 yukarı veriyor.', { speak: 'Üç yol da beş sağ, üç yukarı veriyor.' });
    // Üçüncü çift: paralelkenar gözü soruya kadar boş
    await par(kaybol(c, g, 300), topla(1, h2));
    g = c.S('g', {}, svg); m = cift(ds, g, [2, 3], [3, -2]); adl = [ucAd(g, m.u.a, 'A', RENK.a), ucAd(g, m.u.b, 'B', RENK.b)];
    gizle(g); await belir(c, g, 400);
    await c.say('Üçüncü çift: A 2 sağ, 3 yukarı; B 3 sağ, 2 aşağı.', { speak: 'Üçüncü çift: a vektörü iki sağ, üç yukarı; be vektörü üç sağ, iki aşağı.' });
    await kaybol(c, adl, 200);
    await m.u.oyna();
    await belir(c, hucre(2, 0, '5 sağ, 1 yukarı'), 300);
    await c.say('Uç uca ekleme 5 sağ, 1 yukarı verdi.', { speak: 'Uç uca ekleme beş sağ, bir yukarı verdi.' });
    const d3 = ds[2], cg = c.S('g', {}, g), V = (i, j, di, dj, renk) => { const v = d3.vek(i, j, di, dj, { renk, ...KESIK, katman: cg }); gizle(v); return v; };
    const ax = V(0, 0, 2, 0, RENK.a), bx = V(2, 0, 3, 0, RENK.b), ay = V(0, 0, 0, 3, RENK.a), by = V(0.35, 3, 0, -2, RENK.b);
    await par(c.say('Bileşenlerle: yatayda 2 ile 3, düşeyde 3 yukarı ile 2 aşağı.', { speak: 'Bileşenlerle: yatayda iki ile üç, düşeyde üç yukarı ile iki aşağı.' }), (async () => { await ciz(c, ax, 450); await ciz(c, bx, 450); await ciz(c, ay, 450); await ciz(c, by, 450); })());
    await kaybol(c, cg, 300); await m.bl.oyna(0.8);
    await belir(c, hucre(2, 2, '5 sağ, 1 yukarı'), 300);
    await c.say('O da 5 sağ, 1 yukarı.', { speak: 'O da beş sağ, bir yukarı.' });
    await c.choice({ tag: 'Uygula', q: 'Üçüncü çiftte paralelkenar yöntemi hangi bileşkeyi verir?', options: ['5 sağ, 5 yukarı', 'Çizmeden bilinemez', '5 sağ, 1 yukarı'], answer: 2,
      hints: ['Zıt yönlü düşey kareleri topladın. Öteki iki yol 5 sağ, 1 yukarı verdi; yöntem değişince bileşke değişmez.', 'Vektörler aynı kaldıkça bileşke de aynıdır. Öteki iki yolun bulduğu ok, paralelkenarın da köşegenidir.', ''],
      right: 'Evet. Yöntem değişse de bileşke aynı kalır.' });
    await m.pr.oyna();
    await par(belir(c, hucre(2, 1, '5 sağ, 1 yukarı'), 300), belir(c, [...h1, ...h2], 300));
    await c.say('Vektörler aynı olduğu için köşegen de 5 sağ, 1 yukarıya uzanır.', { speak: 'Vektörler aynı olduğu için köşegen de beş sağ, bir yukarıya uzanır.' });
    await c.say('Şimdi çifti sen seç; üç panel aynı anda toplasın.');

    // Dene: önce üç çift tahmin edilir, sonra hazır çiftler arasında serbest seçim
    await kaybol(c, [g, rg, pg], 400);
    const y2 = kur(3, 2), dz = y2.ds, alt = c.S('g', {}, svg);
    gizle(y2.pg); await belir(c, y2.pg, 350);
    const ciftler = [[[2, 0], [0, 3]], [[1, 3], [3, -1]], [[-3, 1], [3, 2]], [[2, 2], [2, -2]], [[-2, 3], [4, 0]]];
    const sorular = [
      [['5 birim sağ', 'Biri yatay, öteki düşey; büyüklükleri toplanmaz. Uç uca ekle: 2 sağ, sonra 3 yukarı.'], ['Üç yolla da 2 sağ, 3 yukarı'], ['Yönteme göre değişir', 'Vektörler aynı kaldıkça bileşke de aynıdır; yöntem yalnızca çizim yoludur.']],
      [['Üç yolla da 4 sağ, 4 yukarı', 'Düşeyde 3 yukarı ile 1 aşağı zıt yönlü; toplanmaz, çıkarılır.'], ['Üç yolla da 4 sağ, 2 yukarı'], ['Uç uca eklemede 4 sağ, 2 yukarı; paralelkenarda başka', 'Paralelkenarın yarısı uç uca ekleme üçgenidir; iki yöntem aynı oku verir.']],
      [['Üç yolla da 3 yukarı'], ['Üç yolla da 6 sağ, 3 yukarı', 'Yatayda 3 sol ile 3 sağ zıt yönlü; birbirini götürür.'], ['Bileşke sıfırdır', 'Yalnızca yatay kareler birbirini götürdü. Düşeyde 1 ile 2 aynı yönde: 3 yukarı kalır.']],
    ];
    const yaz = (p, A, B, sonuc) => {
      myazi(c, p, 340, 366, '~A: ' + tarif(...A), { size: 26, renk: RENK.a }); myazi(c, p, 660, 366, '~B: ' + tarif(...B), { size: 26, renk: RENK.b });
      const s = yazi(c, p, 500, 428, 'üç yolla da: ' + tarif(A[0] + B[0], A[1] + B[1]), { size: 28, renk: RENK.r }); if (!sonuc) gizle(s); return s;
    };
    await c.say('Önce üç çifti tahmin et.', { noWait: true });
    for (const [n, sec] of sorular.entries()) {
      const [A, B] = ciftler[n], gi = c.S('g', {}, alt), mm = cift(dz, gi, A, B), s = yaz(gi, A, B, false);
      gizle(gi); await belir(c, gi, 350);
      let pr = null;
      await c.choice({ tag: 'Tahmin et', q: `A: <b>${tarif(...A)}</b>. B: <b>${tarif(...B)}</b>. Üç panel hangi bileşkeyi bulur?`, options: sec.map((x) => x[0]), answer: sec.findIndex((x) => x.length === 1),
        hints: sec.map((x) => x[1] || ''), right: 'Evet. Üç bileşke aynı ok.',
        onPick: (i, tamam) => { if (tamam) pr = (async () => { await par(mm.u.oyna(), mm.pr.oyna(), mm.bl.oyna()); await belir(c, s, 300); })(); } });
      await pr; await c.wait(400); await kaybol(c, gi, 300);
    }
    await c.say('Çifti kaydırıcıyla sen seç.', { noWait: true });
    let simdiki = null;
    const sl = c.slider({ label: 'Vektör çifti', min: 1, max: ciftler.length, step: 1, value: 4, fmt: (v) => v + '. çift',
      onInput: (v) => { if (simdiki) simdiki.remove(); simdiki = c.S('g', {}, alt); const [A, B] = ciftler[v - 1]; ucuca(c, dz[0], simdiki, A, B); paralel(c, dz[1], simdiki, A, B); bilesenli(c, dz[2], simdiki, A, B); yaz(simdiki, A, B, true); } });
    await c.cont('Devam ›');
    sl.remove();
    await c.say('Hangi çifti kurarsan kur, üç bileşke üst üste geldi.');
  }

  /* ---- Sahne 5 · Tek doğrultu da aynı kural ---- */
  async function tekDogrultu(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg), K = 50, SX = 70, X = (i) => SX + i * K;
    const serit = (y, ad) => { const iz = izgara(c, g, { kare: K, sutun: 8, satir: 1, x: SX, y }); yazi(c, iz.g, SX, y - 12, ad, { size: 24, renk: RENK.vurgu, hiza: 'start' }); gizle(iz.g); return iz.g; };
    const O = (y, i1, i2, renk, o) => { const v = ok(c, g, X(i1), y, X(i2), y, { renk, ...o }); gizle(v); return v; };
    const s1 = serit(70, 'kural'), s2 = serit(230, 'uç uca'), s3 = serit(390, 'bileşenler');
    await belir(c, s1, 350);
    await c.say('Aynı doğrultudaki vektörler için ayrı bir kural öğrenmiştin.');
    await c.say('Aynı yön toplar, zıt yön çıkarır; bileşke büyüğün yönündedir.', { speak: 'Aynı yön toplar, zıt yön çıkarır; [short pause] bileşke büyüğün yönündedir.' });
    const A1 = O(104, 3, 7, RENK.a), B1 = O(84, 3, 1, RENK.b), R1 = O(138, 3, 5, RENK.r);
    const kural = yazi(c, g, 500, 112, 'zıt yön çıkarır: 4 − 2 = 2, sağa', { size: 24, renk: RENK.r, hiza: 'start' }); gizle(kural);
    await ciz(c, A1, 500); await ciz(c, B1, 500);
    await par(c.say('A 4 sağ, B 2 sol: kural 2 birim sağ diyor.', { speak: 'a vektörü dört sağ, be vektörü iki sol: kural iki birim sağ diyor.' }), ciz(c, R1, 700), belir(c, kural, 400));
    const A2 = O(264, 3, 7, RENK.a), B2 = O(244, 7, 5, RENK.b), R2 = O(298, 3, 5, RENK.r);
    await belir(c, s2, 300); await ciz(c, A2, 500);
    await par(c.say('Uç uca ekleyelim: B, A’nın ucundan 2 kare geri gelir.', { speak: 'Uç uca ekleyelim: be vektörü, a vektörünün ucundan iki kare geri gelir.' }), ciz(c, B2, 800));
    await par(c.say('Baştan sona ok yine 2 kare sağa gidiyor.', { speak: 'Baştan sona ok yine iki kare sağa gidiyor.' }), ciz(c, R2, 800));
    const t = btablo(c, g, { x: 600, y: 300, baslik: true }), A3 = O(424, 3, 7, RENK.a, KESIK), B3 = O(404, 3, 1, RENK.b, KESIK), R3 = O(458, 3, 5, RENK.r);
    gizle(t.g);
    await par(belir(c, [s3, t.g], 300)); await par(ciz(c, A3, 500), ciz(c, B3, 500), belir(c, [...t.satir(0, '+x 4'), ...t.satir(1, '−x 2')], 300));
    await c.say('Bileşenlerle: x ekseninde 4 ile 2 zıt yönde, y bileşeni yok.', { speak: 'Bileşenlerle: iks ekseninde dört ile iki zıt yönde, ye bileşeni yok.' });
    const hiza = [3, 5].map((i) => { const l = cizgi(c, g, X(i), 128, X(i), 468, { renk: RENK.soluk, kalin: 2, kesik: '3 8' }); gizle(l); return l; });
    await par(ciz(c, R3, 700), belir(c, t.satir(2, '+x 2'), 300));
    await par(c.say('Sonuç yine +x yönünde 2 birim.', { speak: 'Sonuç yine artı iks yönünde iki birim.' }), belir(c, hiza, 500));
    await c.choice({ tag: 'Uygula', q: 'Batıya 5 birim ile doğuya 2 birimlik iki vektör uç uca eklenirse bileşke nedir?', options: ['Batıya 7 birim', 'Doğuya 3 birim', 'Batıya 3 birim'], answer: 2,
      hints: ['Zıt yönlü oklar art arda dizilince ikincisi geri gelir. 5 kareden 2 kare geri: 3 kare.', 'Son uç başlangıcın batısında kalır. Bileşke baştan sona çizilir ve büyük olanın yönüne bakar.', ''],
      right: 'Evet. 5 kareden 2 kare geri gelinir: batıya 3.' });
    // Batı–doğu şeridi
    await kaybol(c, g, 400);
    const g2 = c.S('g', {}, svg), BX = 250, BY = 150, X2 = (i) => BX + i * K;
    izgara(c, g2, { kare: K, sutun: 10, satir: 1, x: BX, y: BY });
    yazi(c, g2, BX - 16, BY + 33, 'batı', { size: 24, renk: RENK.soluk, hiza: 'end' }); yazi(c, g2, BX + 516, BY + 33, 'doğu', { size: 24, renk: RENK.soluk, hiza: 'start' });
    const O3 = (y, i1, i2, renk) => { const v = ok(c, g2, X2(i1), y, X2(i2), y, { renk }); gizle(v); return v; };
    const Ab = O3(BY + 34, 9, 4, RENK.a), Bb = O3(BY + 14, 4, 6, RENK.b), Rb = O3(BY + 70, 9, 6, RENK.r), tb = yazi(c, g2, X2(7.5), BY + 108, 'batıya 3 birim', { size: 26, renk: RENK.r });
    gizle(tb);
    await par(c.say('Uç uca eklemede 5 kareden 2 kare geri gelindi: batıya 3.', { speak: 'Uç uca eklemede beş kareden iki kare geri gelindi: batıya üç.' }), (async () => { await ciz(c, Ab, 600); await ciz(c, Bb, 600); await ciz(c, Rb, 700); await belir(c, tb, 250); })());
    await c.say('Kural da aynısını söyler: zıt yön çıkarır, bileşke büyüğün yönündedir.');
    await c.choice({ tag: 'Düşün', q: '“Aynı yön toplar, zıt yön çıkarır” kuralı için hangisi doğrudur?',
      options: ['İki boyuttaki yöntemlerle ilgisi olmayan ayrı bir kuraldır', 'Yalnızca kuvvetleri toplarken geçerlidir', 'Uç uca eklemenin tek doğru üzerindeki hâlidir'], answer: 2,
      hints: ['Az önce aynı çifti uç uca ekledin ve kuralın verdiği sonucu buldun. Kural, tek doğru üzerinde uç uca eklemenin kısa yoludur.', 'Kural bütün vektörler içindir. Kuvvet de hız da aynı doğrultuda böyle toplanır.', ''],
      right: 'Evet. Kural, uç uca eklemenin tek doğrudaki kısa yoludur.' });
    await c.say('Bir boyutta ve iki boyutta toplama ayrı kurallar değildir.');
    const g3 = c.S('g', {}, svg), m2 = mini(c, g3, 410, 480, 0, 34); gizle(g3);
    await belir(c, g3, 400);
    await c.say('Tek doğrultuda oklar aynı doğruya dizilir; gerisi aynı işlemdir.');
    // Paralelkenar tek doğrultuda kapanmaz
    await kaybol(c, [g2, g3], 400);
    const g4 = c.S('g', {}, svg), PY = 200, PXo = 450;
    cizgi(c, g4, 200, PY, 800, PY, { renk: RENK.ince, kalin: 2 });
    const Ap = ok(c, g4, PXo, PY, PXo + 200, PY, { renk: RENK.a }), Bp = ok(c, g4, PXo, PY, PXo - 100, PY, { renk: RENK.b });
    const q1 = cizgi(c, g4, PXo + 200, PY - 16, PXo + 100, PY - 16, { renk: RENK.soluk, kalin: 3, kesik: '7 7' }), q2 = cizgi(c, g4, PXo - 100, PY + 16, PXo + 100, PY + 16, { renk: RENK.soluk, kalin: 3, kesik: '7 7' });
    c.S('circle', { cx: PXo, cy: PY, r: 5, fill: RENK.yazi }, g4);
    const satirlar = [['paralelkenar', 250, false], ['uç uca', 500, true], ['bileşenler', 750, true]].map(([ad, x, tamam]) => {
      const s = c.S('g', {}, g4); yazi(c, s, x, 360, ad, { size: 26, renk: tamam ? RENK.yazi : RENK.soluk }); (tamam ? onay : carpi)(c, s, x, 404); gizle(s); return s;
    });
    gizle(g4); await belir(c, g4, 400);
    await par(c.say('Yalnız paralelkenar tek doğrultuda kurulamaz; öteki yollar yine uyuşur.'), (async () => { await par(uzat(c, q1, 800), uzat(c, q2, 800)); for (const s of satirlar) await belir(c, s, 300); })());
  }

  /* ---- Sahne 6 · Genellemeler ve tablo ---- */
  async function genel(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg), RY = [96, 221, 346], adlar = ['uç uca ekleme', 'paralelkenar', 'bileşenler'];
    const minis = [0, 1, 2].map((i) => mini(c, g, 50, RY[i] + 106, i, 22));
    adlar.forEach((ad, i) => { yazi(c, g, 215, RY[i] + 66, ad, { size: 24, renk: RENK.vurgu, hiza: 'start' }); cizgi(c, g, 30, RY[i] - 6, 970, RY[i] - 6, { renk: RENK.ince, kalin: 1.5 }); });
    cizgi(c, g, 30, RY[2] + 119, 970, RY[2] + 119, { renk: RENK.ince, kalin: 1.5 });
    const baslik = [yazi(c, g, 530, 68, 'ne taşınır', { size: 24, renk: RENK.soluk }), yazi(c, g, 835, 68, 'bileşke nereden nereye', { size: 24, renk: RENK.soluk })];
    gizle(g, baslik); await belir(c, g, 400);
    await c.say('Denediğimiz her çiftte aynı şeyleri gördük.');
    await par(c.say('Yöntem değişse de bileşke değişmez.'), yanSon(c, minis.map((m) => m.el.r)));
    const P = minis[0].P, ince = { renk: RENK.soluk, kalin: 3, uc: 9, kesik: true };
    const sb = ok(c, minis[0], ...P(0, 0), ...P(2, 3), { ...ince, renk: RENK.b }), sa = ok(c, minis[0], ...P(2, 3), ...P(5, 4), { ...ince, renk: RENK.a }); gizle(sb, sa);
    await par(c.say('Toplama sırası değişse de bileşke değişmez.'), (async () => { await ciz(c, sb, 600); await ciz(c, sa, 600); })());
    await par(c.say('Vektör taşınırken yönü ve büyüklüğü korunur.'), yanSon(c, [minis[0].el.b, sb]));
    await par(kaybol(c, sa, 300), kaybol(c, sb, 300), c.say('Bir vektörün bileşenlerinin bileşkesi, vektörün kendisidir.'), yanSon(c, [minis[2].el.x, minis[2].el.y]));
    await belir(c, baslik, 350);
    await c.say('Yöntemleri ayıran şey, okların nereye taşındığıdır.');
    const goz = (i, k, s1, s2) => [myazi(c, g, k ? 835 : 530, RY[i] + 52, s1, { size: 23 }), myazi(c, g, k ? 835 : 530, RY[i] + 84, s2, { size: 23 })];
    const satir = [
      [...goz(0, 0, 'bir vektör ötekinin', 'bitiş noktasına'), ...goz(0, 1, 'ilk başlangıçtan', 'son bitişe')],
      [...goz(1, 0, 'başlangıçlar', 'aynı noktaya'), ...goz(1, 1, 'o noktadan paralellerin', 'kesişimine')],
      [...goz(2, 0, 'başlangıç', 'orijine'), ...goz(2, 1, 'orijinden ~R_{x} ile ~R_{y}’nin', 'gösterdiği noktaya')],
    ];
    gizle(satir.flat());
    await belir(c, satir[0], 350);
    await c.say('Uç uca eklemede bir ok, ötekinin bitiş noktasına taşınır.');
    await par(sol(c, satir[0], 0.6, 300), belir(c, satir[1], 350));
    await c.say('Paralelkenar yönteminde iki okun başlangıçları aynı noktaya getirilir.');
    await par(sol(c, satir[1], 0.6, 300), belir(c, satir[2], 350));
    await c.say('Bileşenlerine ayırırken vektörün başlangıcı orijine getirilir.');
    const bas = minis.map((m) => c.S('circle', { cx: m.P(0, 0)[0], cy: m.P(0, 0)[1], r: 9, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, g)); gizle(bas);
    await par(c.say('Bileşke her yolda başlangıç noktasından çıkar.'), belir(c, bas, 400), belir(c, [...satir[0], ...satir[1]], 400), yanSon(c, minis.map((m) => m.el.r)));
    const slogan = yazi(c, g, 500, 520, 'Yol üç, bileşke tek.', { size: 34, renk: RENK.vurgu }); gizle(slogan);
    await belir(c, slogan, 400);
    await c.wait(900);

    // Dene: beş ifade, doğru ya da yanlış
    await kaybol(c, g, 400);
    const kt = kutular(c, svg, ['doğru', 'yanlış'], { y: 110, h: 330, renkler: [RENK.iyi, RENK.kotu], yaziBoy: 24, adim: 44 });
    gizle(kt.g); await belir(c, kt.g, 350);
    const ifade = {
      '1. ifade': 'İki vektörün uç uca eklemeyle bulunan bileşkesi daima bu vektörlerden birine eşittir.',
      '2. ifade': 'Yönü ve büyüklüğü değiştirilmeden toplanan iki vektörün uç uca ekleme ve paralelkenar yöntemiyle bulunan bileşkeleri eşittir.',
      '3. ifade': 'Uç uca ekleme ile paralelkenar yöntemi, aynı iki vektör için farklı sonuç verir.',
      '4. ifade': 'Paralelkenar yönteminde iki vektörün başlangıç noktaları aynı noktaya getirilir.',
      '5. ifade': 'Bir vektörün dik kartezyen koordinat sistemindeki bileşenlerinin bileşkesi kendisidir.',
    };
    await c.say('Her ifade için doğru ya da yanlış seç.', { noWait: true });
    await sinifla(c, kt, [
      { ad: '1. ifade', kutu: 1, kisa: 'bileşke = vektörlerden biri', neden: 'Evet, yanlış. Bileşke çoğu zaman ne A’dır ne B; yeni bir oktur.', ipucu: ['Bileşke yeni bir oktur. 3 sağ 1 yukarı ile 2 sağ 3 yukarının bileşkesi 5 sağ, 4 yukarıydı; ikisine de eşit değil.', ''] },
      { ad: '2. ifade', kutu: 0, kisa: 'iki yöntemde bileşke eşit', neden: 'Evet, doğru. Vektörler değişmediyse iki yöntem aynı oku verir.', ipucu: ['', 'Vektörler değişmediyse iki yöntem aynı oku verir. Paralelkenarın yarısı, uç uca ekleme üçgenidir.'] },
      { ad: '3. ifade', kutu: 1, kisa: 'yöntemler farklı sonuç verir', neden: 'Evet, yanlış. Yöntem değişir, bileşke değişmez.', ipucu: ['Denediğimiz her çiftte iki yöntem aynı bileşkeyi verdi. Yöntem değişir, bileşke değişmez.', ''] },
      { ad: '4. ifade', kutu: 0, kisa: 'başlangıçlar aynı noktada', neden: 'Evet, doğru. Paralelkenarda iki ok aynı noktadan çıkar.', ipucu: ['', 'Paralelkenar yönteminde iki ok aynı noktadan çıkar. Bitiş noktasına taşıma, uç uca eklemededir.'] },
      { ad: '5. ifade', kutu: 0, kisa: 'bileşenlerin bileşkesi: vektör', neden: 'Evet, doğru. Bileşenler uç uca eklenince vektör geri gelir.', ipucu: ['', 'Bileşenler uç uca eklenince vektörün kendisi geri gelir.'] },
    ], { soru: (ad) => `<b>${ad}:</b> “${ifade[ad]}”`, tag: 'Doğru mu, yanlış mı?', secenekler: ['Doğru', 'Yanlış'], y: 500 });
    await kaybol(c, kt.g, 400);
    const son = c.S('g', {}, svg), ms = [0, 1, 2].map((i) => mini(c, son, 150 + i * 290, 300, i, 26));
    const ucAyri = ms.map((m, i) => { const k = ok(c, son, ...m.P(0, 0), ...m.P(i === 1 ? 4 : 5, i === 1 ? 5 : i === 0 ? 3 : 4), { renk: RENK.kotu, kalin: 4, uc: 11 }); gizle(k); return k; });
    gizle(son); await belir(c, son, 400);
    await par(c.say('Üç yöntemle üç ayrı ok bulduysan hata çizimdedir, yöntemde değil.', { speak: '[thoughtful] Üç yöntemle üç ayrı ok bulduysan hata çizimdedir, yöntemde değil.' }), (async () => { await ciz(c, ucAyri[0], 500); await ciz(c, ucAyri[1], 500); await c.wait(900); await kaybol(c, ucAyri.slice(0, 2), 400); })());
    const slogan2 = yazi(c, son, 500, 430, 'Yol üç, bileşke tek.', { size: 44, renk: RENK.vurgu }); gizle(slogan2);
    await belir(c, slogan2, 400);
    await c.say('Yol üç, bileşke tek.');
    c.note('<b>Yol üç, bileşke tek.</b><br>uç uca ekleme → ok ötekinin ucuna<br>paralelkenar → başlangıçlar aynı noktaya<br>bileşenler → başlangıç orijine, eksenler ayrı toplanır', 'Üç yöntem', 'yontemler');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c9', kicker: 'Konu C · Vektörler', title: 'Yöntem değişir, bileşke değişmez', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Yöntem değişir, bileşke değişmez', hook: 'İki arkadaş aynı iki oku farklı yöntemlerle topladı; sonuçları farklı çıkabilir mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'İki arkadaş, iki yöntem', goal: 'Üç toplama yolunu hatırla, sonucu tahmin et.', run: ikiArkadas },
      { title: 'Üç yol yan yana', goal: 'Aynı çifti üç yolla topla, bileşkeleri karşılaştır.', run: yanYana },
      { title: 'İki çizim, aynı üçgen', goal: 'Paralelkenarın içindeki uç uca ekleme üçgenini gör.', run: ucgen },
      { title: 'Başka çiftlerle sına', goal: 'Genellemeyi başka çiftlerle sına.', run: sina },
      { title: 'Tek doğrultu da aynı kural', goal: 'Tek doğrultudaki kuralı uç uca eklemeye bağla.', run: tekDogrultu },
      { title: 'Genellemeler ve tablo', goal: 'Üç yöntemi tabloda karşılaştır, ifadeleri sına.', run: genel },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '“İki vektörün yönleri ve büyüklükleri değiştirilmeden başlangıç noktaları birleştirilir ve bileşke bulunur.” Bu hangi yöntemin tanımıdır?',
        options: ['Uç uca ekleme yöntemi', 'Paralelkenar yöntemi', 'Bileşenlerine ayırma yöntemi'], answer: 1,
        why: ['Orada başlangıçlar değil, bir okun bitişi ile ötekinin başlangıcı birleştirilir.', 'Paralelkenar yönteminde iki okun başlangıçları aynı noktaya getirilir.', 'Orada vektör orijine getirilir ve eksenlerdeki iz düşümleri bulunur.'], scene: 5 },
      { q: 'Bir öğrenci aynı iki vektörü üç yöntemle topladı ve üç ayrı bileşke buldu. Hangisi doğrudur?',
        options: ['Hata yoktur; yöntem değişince bileşke değişir', 'Hata yoktur; yöntemler birbirine yakın sonuç verir', 'Bir yerde hata vardır; örneğin taşırken bir okun yönü ya da boyu değişmiştir'], answer: 2,
        why: ['Toplanan vektörler aynıysa bileşke de aynıdır; değişen yalnızca çizim yoludur.', 'Kareli düzlemde üç yol tam aynı oku verir; fark varsa çizimde hata vardır.', 'Üç yol aynı oku verir; fark çizimdeki bir hatadan gelir.'], scene: 1 },
      { q: 'Bir hokey diskine iki oyuncu aynı anda vuruyor. Birinin vuruşu 4 sağ, 3 yukarı; ötekinin vuruşu 2 sağ, 1 aşağı giden bir kuvvet oku olarak gösteriliyor. Bu iki kuvvet paralelkenar yöntemiyle toplanırsa köşegen başlangıçtan hangi noktaya ulaşır?',
        options: ['6 sağ, 2 yukarıdaki noktaya', '6 sağ, 4 yukarıdaki noktaya', '2 sağ, 4 yukarıdaki noktaya'], answer: 0,
        why: ['Evet. Yatayda 4 ile 2 aynı yönde: 6 sağ. Düşeyde 3 yukarıdan 1 aşağı inilir: 2 yukarı. Uç uca eklemeyle ve bileşenlerle de aynı ok çıkar.', 'Düşeyde biri yukarı, öteki aşağı bakıyor; zıt yön çıkarır: 3 − 1 = 2 yukarı.', 'Yatayda iki kuvvet de sağa bakıyor; aynı yön toplar, 6 sağ çıkar. Düşeyde ise zıt yön çıkarır.'], scene: 3 },
      { q: 'Selin: “Aynı doğrultudaki iki okla paralelkenar kurulamıyor; öyleyse bu okların bileşkesi çizimle bulunamaz.” Doğru karşılık hangisidir?',
        options: ['Haklı; bileşke yalnızca paralelkenarla çizilebilir.', 'Haksız; uç uca ekleme tek doğrultuda da bileşkeyi verir.', 'Haksız; paralelkenar tek doğrultuda da kurulabilir.'], answer: 1,
        why: ['Paralelkenar yollardan yalnızca biridir; uç uca ekleme ve bileşenlerle toplama da aynı oku verir.', 'Evet. Oklar aynı doğruya dizilir; baştan sona çizilen ok bileşkedir.', 'Paralelkenar tek doğrultuda kurulamaz; öteki yollar yine çalışır.'], scene: 4 },
    ],
    summary: ['<b>Yol üç, bileşke tek.</b>', 'Uç uca ekleme, paralelkenar ve bileşenlerle toplama aynı iki vektör için tam aynı oku verir.', 'Tek doğrultudaki “aynı yön toplar, zıt yön çıkarır” kuralı, uç uca eklemenin tek doğru üzerindeki hâlidir.'],
    nextLesson: { href: 'c10-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
