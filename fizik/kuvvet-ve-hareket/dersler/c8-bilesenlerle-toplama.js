/* C8 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C8")
   Yazar notu: içerik MEB Fizik 9 s. 81 ve 61'den. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: A (birinci yürüyüş) birinci vektör rengi, B ikinci vektör rengi, R bileşke rengi; bileşenler aynı renkte kesikli ok.
   Bileşen tablosu her sahnede tahtanın sağında durur (satırlar A, B, R; sütunlar x, y). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, gizle, belir, sol, kaybol, par, ok, okCiz, okGit, izgara, kart, insan } = KIT;
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

  /* Eksenli kareli düzlem. adlar: true (dört uç), 'arti' (yalnız +x, +y), false (yok). Q ve vek orijine göre kare sayar. */
  function duzlem(c, p, o = {}) {
    const kare = o.kare || 50, sutun = o.sutun || 10, satir = o.satir || 8;
    const oi = o.oi == null ? sutun / 2 : o.oi, oj = o.oj == null ? satir / 2 : o.oj, adlar = o.adlar == null ? true : o.adlar;
    const iz = izgara(c, p, { kare, sutun, satir, x: o.x, y: o.y });
    const [ox, oy] = iz.P(oi, oj), xs = iz.x0, xe = iz.x0 + sutun * kare, ys = iz.y0, ye = iz.y0 + satir * kare;
    const e = { renk: RENK.cizgi, kalin: 3, uc: 12 }, t = { size: 24, renk: RENK.soluk };
    ok(c, iz.g, ox, oy, xe + 14, oy, e); ok(c, iz.g, ox, oy, xs - 14, oy, e);
    ok(c, iz.g, ox, oy, ox, ys - 14, e); ok(c, iz.g, ox, oy, ox, ye + 14, e);
    if (adlar) { yazi(c, iz.g, xe + 20, oy + 8, '+x', { ...t, hiza: 'start' }); yazi(c, iz.g, ox, ys - 22, '+y', t); }
    if (adlar === true) { yazi(c, iz.g, xs - 20, oy + 8, '−x', { ...t, hiza: 'end' }); yazi(c, iz.g, ox, ye + 38, '−y', t); }
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
    return { iz, g: iz.g, ox, oy, xs, xe, ys, ye, kare, Q, vek, tasi };
  }
  /* (i, j) noktası ile eksenler arasındaki ince noktalı paraleller. ters: eksenden noktaya doğru çizilir. */
  function paraleller(c, d, p, i, j, ters) {
    const g = c.S('g', {}, p), [x, y] = d.Q(i, j), [x0, y0] = d.Q(0, 0), o = { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' };
    const l1 = j ? (ters ? cizgi(c, g, x, y0, x, y, o) : cizgi(c, g, x, y, x, y0, o)) : null;
    const l2 = i ? (ters ? cizgi(c, g, x0, y, x, y, o) : cizgi(c, g, x, y, x0, y, o)) : null;
    g.ciz = (ms = 600) => c.tween(ms, (e) => {
      if (l1) l1.setAttribute('y2', ters ? lerp(y0, y, e) : lerp(y, y0, e));
      if (l2) l2.setAttribute('x2', ters ? lerp(x0, x, e) : lerp(x, x0, e));
    });
    return g;
  }
  /* Orijinden çıkan kesikli iki bileşen oku (gizli gelir). */
  function bilesenler(c, d, p, i, j, renk) {
    const x = i ? d.vek(0, 0, i, 0, { renk, ...KESIK, katman: p }) : null, y = j ? d.vek(0, 0, 0, j, { renk, ...KESIK, katman: p }) : null;
    const hepsi = [x, y].filter(Boolean); gizle(hepsi);
    return { x, y, hepsi, ciz: (ms = 500) => par(hepsi.map((v) => ciz(c, v, ms))) };
  }
  /* Bileşen tablosu: satırlar A, B, R; sütunlar x, y. yaz(r, k, metin) bir gözü yazar (k: 0 ad, 1 x, 2 y). */
  function btablo(c, p, o = {}) {
    const x = o.x == null ? 660 : o.x, y = o.y == null ? 120 : o.y, W = [60, 125, 125], sy = 56, g = c.S('g', {}, p), baslik = o.baslik !== false;
    const y0 = y + (baslik ? sy : 0), w = W[0] + W[1] + W[2], cx = [x + W[0] / 2, x + W[0] + W[1] / 2, x + W[0] + W[1] + W[2] / 2];
    const serit = [1, 2].map((k) => { const r = c.S('rect', { x: cx[k] - W[k] / 2 + 5, y: y + 4, width: W[k] - 10, height: y0 - y + 3 * sy - 8, rx: 10, fill: k === 1 ? RENK.mor : RENK.turkuaz, opacity: 0.14 }, g); r.style.display = 'none'; return r; });
    if (baslik) { yazi(c, g, cx[1], y + 37, 'x', { size: 26, renk: RENK.soluk }); yazi(c, g, cx[2], y + 37, 'y', { size: 26, renk: RENK.soluk }); }
    for (let r = 0; r <= 3; r++) cizgi(c, g, x, y0 + r * sy, x + w, y0 + r * sy, { renk: r === 0 || r === 3 ? RENK.cizgi : RENK.ince, kalin: r === 0 || r === 3 ? 2 : 1.5 });
    const renkler = [RENK.a, RENK.b, RENK.r], adlar = ['A', 'B', 'R'], el = [[], [], []];
    const hucre = (r, k) => [cx[k], y0 + r * sy + 37];
    const yaz = (r, k, metin) => { if (el[r][k]) el[r][k].remove(); el[r][k] = myazi(c, g, ...hucre(r, k), (k ? '' : '~') + metin, { size: 26, renk: renkler[r] }); return el[r][k]; };
    const satir = (r, xm, ym) => [yaz(r, 0, adlar[r]), xm == null ? null : yaz(r, 1, xm), ym == null ? null : yaz(r, 2, ym)].filter(Boolean);
    const hepsi = () => el.flat().filter(Boolean);
    const temizle = async (ms = 300, adKalsin) => { const s = el.flatMap((r) => r.filter((e, k) => e && !(adKalsin && k === 0))); await kaybol(c, s, ms); el.forEach((r) => { if (adKalsin) r.length = Math.min(r.length, 1); else r.length = 0; }); };
    return { g, x, y, y0, sy, w, cx, hucre, yaz, satir, el, hepsi, temizle, serit };
  }
  const onay = (c, p, x, y) => yol(c, p, `M ${x - 11} ${y} l 8 9 l 15 -20`, { renk: RENK.iyi, kalin: 5 });

  /* ---- Sahne 1 · Çizmeden toplamak ---- */
  async function cizmeden(c) {
    const svg = c.svg(1000, 562);
    // Hatırlatma 1: bir ok ve kesikli iki bileşeni
    const h1 = c.S('g', {}, svg), d = duzlem(c, h1, { sutun: 6, satir: 5, x: 90, y: 130, oi: 1, oj: 1, adlar: false });
    const v = d.vek(0, 0, 4, 3, { renk: RENK.a, katman: h1 }), bl = bilesenler(c, d, h1, 4, 3, RENK.a), pl = paraleller(c, d, h1, 4, 3);
    gizle(h1); await belir(c, h1, 350);
    await par(c.say('Her vektör, bir yatay ve bir düşey bileşenin toplamıdır.'), (async () => { await pl.ciz(500); await bl.ciz(600); })());
    // Hatırlatma 2: tek doğrultuda aynı yön ve zıt yön
    const h2 = c.S('g', {}, svg), X = 560, o1 = { kalin: 6 };
    yazi(c, h2, X + 125, 150, 'aynı yön toplar', { size: 26, renk: RENK.vurgu });
    const a1 = ok(c, h2, X, 190, X + 100, 190, { renk: RENK.a, ...o1 }), b1 = ok(c, h2, X + 100, 190, X + 250, 190, { renk: RENK.b, ...o1 }), r1 = ok(c, h2, X, 230, X + 250, 230, { renk: RENK.r, ...o1 });
    yazi(c, h2, X + 125, 330, 'zıt yön çıkarır', { size: 26, renk: RENK.vurgu });
    const a2 = ok(c, h2, X, 370, X + 200, 370, { renk: RENK.a, ...o1 }), b2 = ok(c, h2, X + 200, 394, X + 150, 394, { renk: RENK.b, ...o1 }), r2 = ok(c, h2, X, 434, X + 150, 434, { renk: RENK.r, ...o1 });
    gizle(h2); await belir(c, h2, 350);
    await c.say('Aynı doğrultudaki vektörlerde kural: aynı yön toplar, zıt yön çıkarır.', { speak: 'Aynı doğrultudaki vektörlerde kural: [short pause] aynı yön toplar, zıt yön çıkarır.' });
    await kaybol(c, [h1, h2], 400);

    // Park krokisi ve iki yürüyüş kartı; ok çizilmez
    const pk = c.S('g', {}, svg), iz = izgara(c, pk, { kare: 50, sutun: 8, satir: 6, x: 60, y: 120 });
    kutu(c, pk, 60, 120, 400, 300, { fill: 'none', renk: RENK.r, rx: 14 });
    const agac = (i, j) => { const [x, y] = iz.P(i, j); cizgi(c, pk, x, y + 4, x, y + 22, { renk: '#7a5a3a', kalin: 5 }); c.S('circle', { cx: x, cy: y - 8, r: 17, fill: '#1f7a4d', stroke: RENK.r, 'stroke-width': 2 }, pk); };
    agac(6.5, 5); agac(7.3, 4.2); agac(0.7, 5.2); agac(5.5, 0.7);
    c.S('ellipse', { cx: iz.P(6, 2)[0], cy: iz.P(6, 2)[1], rx: 54, ry: 30, fill: '#1d4a66', stroke: RENK.turkuaz, 'stroke-width': 2 }, pk);
    const [bx, by] = iz.P(1, 2);
    c.S('circle', { cx: bx, cy: by, r: 7, fill: RENK.vurgu }, pk); insan(c, pk, bx - 26, by + 4, { s: 0.7 });
    yazi(c, pk, bx + 4, by + 36, 'başlangıç', { size: 22, renk: RENK.vurgu });
    gizle(pk); await belir(c, pk, 400);
    await c.say('Şimdi parkta art arda iki yürüyüş yapıyorsun.');
    const k1 = kart(c, svg, 520, 130, 430, 80, '1. yürüyüş: 2 sağ, 3 yukarı', { renk: RENK.a, size: 26 }), k2 = kart(c, svg, 520, 228, 430, 80, '2. yürüyüş: 4 sağ, 1 aşağı', { renk: RENK.b, size: 26 });
    gizle(k1, k2);
    await belir(c, k1, 350);
    await c.say('Birinci yürüyüş 2 kare sağa, 3 kare yukarı.', { speak: 'Birinci yürüyüş iki kare sağa, üç kare yukarı.' });
    await belir(c, k2, 350);
    await c.say('İkinci yürüyüş 4 kare sağa, 1 kare aşağı.', { speak: 'İkinci yürüyüş dört kare sağa, bir kare aşağı.' });
    await sol(c, iz.g, 0.2, 500);
    await c.say('Elinde kareli kâğıt yok; yalnızca bu dört sayı var.');
    const y1 = yazi(c, svg, 735, 378, 'yatay: 2 sağ, 4 sağ', { size: 26, renk: RENK.vurgu }), y2 = yazi(c, svg, 735, 428, 'düşey: 3 yukarı, 1 aşağı', { size: 26, renk: RENK.vurgu });
    gizle(y1, y2); await belir(c, [y1, y2], 350);
    await c.say('Sağa gidişler aynı doğrultuda; yukarı ve aşağı gidişler de öyle.');
    await c.choice({ tag: 'Düşün', q: 'Çizim yapmadan iki yürüyüşün bileşkesi bulunabilir mi?',
      options: ['Hayır; ok çizmeden bileşke bulunmaz', 'Evet; dört sayının hepsi toplanır', 'Evet; yataylar kendi arasında, düşeyler kendi arasında toplanır'], answer: 2,
      hints: ['Bileşenleri bilmek yeter. Aynı eksendeki bileşenler aynı doğrultudadır ve sayıyla toplanır.', 'Sağa gidiş ile yukarı gidiş farklı doğrultudadır. Yalnızca aynı eksendeki bileşenler birbiriyle toplanır.', ''],
      right: 'Evet. Yataylar bir arada, düşeyler bir arada toplanır.' });
    await c.say('Aynı eksendeki bileşenler aynı doğrultudadır; sayıyla toplanabilirler.');
    await c.say('Vektörler, bileşenlerine ayrılarak da toplanır.');
    await c.say('Yolu önce çizerek, daha sade bir çiftle görelim.');
  }

  /* ---- Sahne 2 · Üç basamak ---- */
  async function ucBasamak(c) {
    const svg = c.svg(1000, 562), K = 46;
    const dA = duzlem(c, svg, { kare: K, sutun: 5, satir: 5, x: 30, y: 36, oi: 1, oj: 1, adlar: false, O: false });
    const dB = duzlem(c, svg, { kare: K, sutun: 5, satir: 3, x: 30, y: 330, oi: 1, oj: 1, adlar: false, O: false });
    const dR = duzlem(c, svg, { kare: K, sutun: 6, satir: 6, x: 320, y: 110, oi: 1, oj: 1, adlar: 'arti' });
    const t = btablo(c, svg, { baslik: false, y: 150 }), g = c.S('g', {}, svg), s = { size: 24 };
    const A = dA.vek(0, 0, 2, 3, { renk: RENK.a, ad: 'A', katman: g }), B = dB.vek(0, 0, 2, 1, { renk: RENK.b, ad: 'B', katman: g });
    gizle(A, B, A.etiket, B.etiket);
    await par(ciz(c, A, 600), ciz(c, B, 600));
    await c.say('A vektörü 2 sağ, 3 yukarı; B vektörü 2 sağ, 1 yukarı.', { speak: 'a vektörü iki sağ, üç yukarı; be vektörü iki sağ, bir yukarı.' });
    const plA = paraleller(c, dA, g, 2, 3), plB = paraleller(c, dB, g, 2, 1), blA = bilesenler(c, dA, g, 2, 3, RENK.a), blB = bilesenler(c, dB, g, 2, 1, RENK.b);
    await par(c.say('Birinci basamak: iki vektör de bileşenlerine ayrılır.'), (async () => { await par(plA.ciz(500), plB.ciz(500)); await par(blA.ciz(500), blB.ciz(500)); })());
    const lAx = myazi(c, g, dA.ox + K, dA.oy + 38, '~A_{x}', { renk: RENK.a, ...s }), lAy = myazi(c, g, dA.ox - 10, dA.oy - 60, '~A_{y}', { renk: RENK.a, hiza: 'end', ...s });
    await belir(c, [lAx, lAy, ...t.satir(0, '+x 2', '+y 3')], 300);
    await c.say('A’nın bileşenleri: +x yönünde 2, +y yönünde 3 birim.', { speak: 'a vektörünün bileşenleri: artı iks yönünde iki, artı ye yönünde üç birim.' });
    const lBx = myazi(c, g, dB.ox + K, dB.oy + 38, '~B_{x}', { renk: RENK.b, ...s }), lBy = myazi(c, g, dB.ox - 10, dB.oy - 15, '~B_{y}', { renk: RENK.b, hiza: 'end', ...s });
    await belir(c, [lBx, lBy, ...t.satir(1, '+x 2', '+y 1')], 300);
    await c.say('B’nin bileşenleri: +x yönünde 2, +y yönünde 1 birim.', { speak: 'be vektörünün bileşenleri: artı iks yönünde iki, artı ye yönünde bir birim.' });
    // İkinci basamak: bileşenler ortadaki düzlemde eksen eksen uç uca dizilir
    const kop = (v, renk) => ok(c, g, ...v.uclar, { renk, ...KESIK });
    const kax = kop(blA.x, RENK.a), kcy = kop(blA.y, RENK.a), kbx = kop(blB.x, RENK.b), kby = kop(blB.y, RENK.b);
    await par(kaybol(c, [lAx, lAy, lBx, lBy], 250), sol(c, [...blA.hepsi, ...blB.hepsi, plA, plB], 0.3, 250));
    await par(c.say('İkinci basamak: aynı eksendeki bileşenler kendi aralarında toplanır.'),
      okGit(c, kax, ...dR.Q(0, 0), ...dR.Q(2, 0), 1000), okGit(c, kbx, ...dR.Q(2, 0), ...dR.Q(4, 0), 1000),
      okGit(c, kcy, ...dR.Q(0, 0), ...dR.Q(0, 3), 1000), okGit(c, kby, ...dR.Q(0, 3), ...dR.Q(0, 4), 1000));
    const Rx = dR.vek(0, 0, 4, 0, { renk: RENK.r, ...KESIK, kalin: 6, katman: g }), Ry = dR.vek(0, 0, 0, 4, { renk: RENK.r, ...KESIK, kalin: 6, katman: g });
    gizle(Rx, Ry);
    const lRx = myazi(c, g, dR.ox + 2 * K, dR.oy + 40, '~R_{x}', { renk: RENK.r, ...s }), lRy = myazi(c, g, dR.ox - 10, dR.oy - 2 * K + 8, '~R_{y}', { renk: RENK.r, hiza: 'end', ...s });
    gizle(lRx, lRy);
    await par(kaybol(c, [kax, kbx], 500), ciz(c, Rx, 600));
    await belir(c, [lRx, t.yaz(2, 0, 'R'), t.yaz(2, 1, '+x 4')], 300);
    await c.say('x ekseninde 2 ile 2 aynı yönde: R<sub>x</sub>, +x yönünde 4 birim.', { speak: 'İks ekseninde iki ile iki aynı yönde: re iks, artı iks yönünde dört birim.' });
    await par(kaybol(c, [kcy, kby], 500), ciz(c, Ry, 600));
    await belir(c, [lRy, t.yaz(2, 2, '+y 4')], 300);
    await c.say('y ekseninde 3 ile 1 aynı yönde: R<sub>y</sub>, +y yönünde 4 birim.', { speak: 'Ye ekseninde üç ile bir aynı yönde: re ye, artı ye yönünde dört birim.' });
    await c.say('R<sub>x</sub> ve R<sub>y</sub>, bileşkenin bileşenleridir.', { speak: 'Re iks ve re ye, bileşkenin bileşenleridir.' });
    const plR = paraleller(c, dR, g, 4, 4, true);
    await par(c.say('Üçüncü basamak: R<sub>x</sub> ile R<sub>y</sub> paralelkenar yöntemiyle toplanır, bileşke bulunur.', { speak: 'Üçüncü basamak: re iks ile re ye paralelkenar yöntemiyle toplanır, bileşke bulunur.' }), plR.ciz(900));
    const R = dR.vek(0, 0, 4, 4, { renk: RENK.r, ad: 'R', katman: g }); gizle(R, R.etiket);
    await ciz(c, R, 800);
    await c.say('Bileşke, orijinden 4 sağ, 4 yukarı giden oktur.', { speak: 'Bileşke, orijinden dört sağ, dört yukarı giden oktur.' });
    c.note('<b>Yatay yatayla, düşey düşeyle toplanır.</b><br>A: +x 2, +y 3<br>B: +x 2, +y 1<br>R: +x 4, +y 4', 'Bileşenlerle toplama', 'tablo');
    await c.choice({ tag: 'Uygula', q: 'A: +x yönünde 1, +y yönünde 2 birim. B: +x yönünde 3, +y yönünde 1 birim. Bileşkenin bileşenleri nedir?',
      options: ['R<sub>x</sub>: 3, R<sub>y</sub>: 4 birim', 'R<sub>x</sub>: +x yönünde 4, R<sub>y</sub>: +y yönünde 3 birim', 'Tek bileşen: 7 birim'], answer: 1,
      hints: ['Her vektörün kendi x ve y bileşenini topladın. Toplama eksene göre yapılır: x’ler 1 ile 3, y’ler 2 ile 1.', '', 'x ve y bileşenleri farklı doğrultudadır; tek sayıda toplanmaz. Yataylar 4, düşeyler 3 eder.'],
      right: 'Evet. Yataylar 4, düşeyler 3 eder.' });
    // Sorudaki çift: tablo ve ortadaki düzlem yeni sayılarla kurulur
    await par(kaybol(c, [g, dA.g, dB.g], 400), t.temizle(400));
    const g2 = c.S('g', {}, svg);
    const A2 = dR.vek(0, 0, 1, 2, { renk: RENK.a, katman: g2 }), B2 = dR.vek(0, 0, 3, 1, { renk: RENK.b, katman: g2 }); gizle(A2, B2);
    await par(ciz(c, A2, 500), ciz(c, B2, 500), belir(c, [...t.satir(0, '+x 1', '+y 2'), ...t.satir(1, '+x 3', '+y 1')], 300));
    const bl2 = bilesenler(c, dR, g2, 4, 3, RENK.r);
    await par(bl2.ciz(600), belir(c, t.satir(2, '+x 4', '+y 3'), 300));
    await c.say('x’ler 1 ile 3: 4 eder; y’ler 2 ile 1: 3 eder.', { speak: 'İksler bir ile üç: dört eder; yeler iki ile bir: üç eder.' });
    const pl2 = paraleller(c, dR, g2, 4, 3, true), R2 = dR.vek(0, 0, 4, 3, { renk: RENK.r, katman: g2 }); gizle(R2);
    await pl2.ciz(500);
    await par(c.say('Bileşke 4 sağ, 3 yukarı giden oktur.', { speak: 'Bileşke dört sağ, üç yukarı giden oktur.' }), ciz(c, R2, 800));
  }

  /* ---- Sahne 3 · Yatay ile düşey toplanmaz ---- */
  async function toplanmaz(c) {
    const svg = c.svg(1000, 562), iz = izgara(c, svg, { kare: 50, sutun: 11, satir: 9, x: 50, y: 56 }), t = btablo(c, svg, { y: 120 });
    t.satir(0, '+x 2', '+y 3'); t.satir(1, '+x 2', '+y 1'); t.satir(2, '+x 4', '+y 4');
    const inis = [1, 2].map((k) => ok(c, t.g, t.cx[k] + 48, t.y0 + 14, t.cx[k] + 48, t.y0 + 3 * t.sy - 14, { renk: RENK.vurgu, kalin: 3, uc: 12 }));
    gizle(inis); t.serit.forEach((r) => { r.style.display = ''; r.style.opacity = 0; });
    await par(belir(c, t.serit, 400, 0.14), ...inis.map((o) => ciz(c, o, 700)));
    await c.say('Tabloda toplama hep aynı sütunun içinde yapıldı.');
    await c.say('Çünkü sayıyla toplamak yalnızca aynı doğrultudaki vektörlerde olur.', { speak: '[thoughtful] Çünkü sayıyla toplamak yalnızca aynı doğrultudaki vektörlerde olur.' });
    // Aynı doğrultu: sayıyla toplanır
    const g1 = c.S('g', {}, svg), V = (i, j, di, dj, renk, p) => { const v = iz.vektor(i, j, di, dj, { renk, ...KESIK, katman: p }); gizle(v); return v; };
    const ad = (p, i, j, m, renk, o = {}) => { const [x, y] = iz.P(i, j), e = myazi(c, p, x, y, m, { renk, size: 24, ...o }); gizle(e); return e; };
    const ax = V(1, 8, 2, 0, RENK.a, g1), bx = V(3, 8, 2, 0, RENK.b, g1), rx = V(1, 7, 4, 0, RENK.r, g1);
    const lax = ad(g1, 2, 8.3, '~A_{x}', RENK.a), lbx = ad(g1, 4, 8.3, '~B_{x}', RENK.b), lrx = ad(g1, 3, 6.3, '~R_{x}', RENK.r);
    const o1 = onay(c, g1, ...iz.P(5.6, 7)); gizle(o1);
    await ciz(c, ax, 400); await ciz(c, bx, 400); await belir(c, [lax, lbx], 200); await ciz(c, rx, 500); await belir(c, [lrx, o1], 200);
    await c.say('x bileşenlerinin hepsi yatay doğrultudadır; birbirleriyle toplanır.', { speak: 'İks bileşenlerinin hepsi yatay doğrultudadır; birbirleriyle toplanır.' });
    const ay = V(8, 1, 0, 3, RENK.a, g1), by = V(8, 4, 0, 1, RENK.b, g1), ry = V(9, 1, 0, 4, RENK.r, g1);
    const lay = ad(g1, 7.7, 2.3, '~A_{y}', RENK.a, { hiza: 'end' }), lby = ad(g1, 7.7, 4.3, '~B_{y}', RENK.b, { hiza: 'end' }), lry = ad(g1, 9.3, 2.8, '~R_{y}', RENK.r, { hiza: 'start' });
    const o2 = onay(c, g1, ...iz.P(9, 5.6)); gizle(o2);
    await ciz(c, ay, 400); await ciz(c, by, 400); await belir(c, [lay, lby], 200); await ciz(c, ry, 500); await belir(c, [lry, o2], 200);
    await c.say('y bileşenlerinin hepsi düşey doğrultudadır; onlar da kendi aralarında toplanır.', { speak: 'Ye bileşenlerinin hepsi düşey doğrultudadır; onlar da kendi aralarında toplanır.' });
    await kaybol(c, g1, 400);
    // Farklı doğrultu: sayıyla toplanmaz, uç uca eklenir
    const g2 = c.S('g', {}, svg);
    const ax2 = V(2, 2, 2, 0, RENK.a, g2), ay2 = V(6, 2, 0, 3, RENK.a, g2);
    const l1 = ad(g2, 3, 1.3, '~A_{x}', RENK.a), l2 = ad(g2, 6.3, 3.3, '~A_{y}', RENK.a, { hiza: 'start' });
    await par(ciz(c, ax2, 500), ciz(c, ay2, 500)); await belir(c, [l1, l2], 200);
    await c.say('Bir x bileşeni ile bir y bileşeni ise farklı doğrultudadır.', { speak: 'Bir iks bileşeni ile bir ye bileşeni ise farklı doğrultudadır.' });
    const [tx, ty] = iz.P(8.7, 4.6), top = yazi(c, g2, tx, ty, '2 + 3 = 5', { size: 30 }), ciz2 = cizgi(c, g2, tx - 78, ty - 10, tx - 78, ty - 10, { renk: RENK.kotu, kalin: 5 });
    gizle(top);
    const Ad = iz.vektor(2, 2, 2, 3, { renk: RENK.a, katman: g2 }); gizle(Ad);
    await par(c.say('Onlar sayıyla toplanmaz; ancak uç uca eklenerek birleşir.', { speak: '[thoughtful] Onlar sayıyla toplanmaz; ancak uç uca eklenerek birleşir.' }), (async () => {
      await belir(c, top, 300); await c.wait(500);
      await c.tween(400, (e) => ciz2.setAttribute('x2', lerp(tx - 78, tx + 78, e)));
      gizle(l2); await iz.tasi(c, ay2, 4, 2, { ms: 900 });
      await belir(c, ad(g2, 4.3, 3.3, '~A_{y}', RENK.a, { hiza: 'start' }), 200);
      await ciz(c, Ad, 700);
    })());
    await c.choice({ tag: 'Düşün', q: 'A<sub>x</sub> 2 birim, B<sub>y</sub> 1 birim. Bu ikisi toplanıp R<sub>x</sub> bulunabilir mi?',
      options: ['Evet; R<sub>x</sub> 3 birim olur', 'Hayır; R<sub>x</sub> için A<sub>x</sub> ile B<sub>x</sub> toplanır', 'Hayır; bileşenler hiçbir zaman toplanmaz'], answer: 1,
      hints: ['Biri yatay, öteki düşey bileşen. Farklı doğrultudaki bileşenler sayıyla toplanmaz.', '', 'Aynı eksendeki bileşenler toplanır. Toplanamayanlar farklı eksendeki bileşenlerdir.'],
      right: 'Evet. R<sub>x</sub> yalnızca x bileşenlerinden bulunur.' });
    await sol(c, g2, 0.5, 300);
    await par(c.tween(900, (e, k) => t.serit.forEach((r) => { r.style.opacity = 0.14 + 0.3 * Math.sin(k * Math.PI); })),
      c.say('R<sub>x</sub> yalnızca x bileşenlerinden, R<sub>y</sub> yalnızca y bileşenlerinden bulunur.', { speak: 'Re iks yalnızca iks bileşenlerinden, re ye yalnızca ye bileşenlerinden bulunur.' }));
    await c.say('Yatay yatayla, düşey düşeyle toplanır.');
  }

  /* ---- Sahne 4 · Zıt yönlü bileşenler ---- */
  async function zit(c) {
    const svg = c.svg(1000, 562), t = btablo(c, svg, { y: 120 });
    const k1 = kart(c, svg, 90, 160, 440, 84, '1. yürüyüş: 2 sağ, 3 yukarı', { renk: RENK.a, size: 28 }), k2 = kart(c, svg, 90, 280, 440, 84, '2. yürüyüş: 4 sağ, 1 aşağı', { renk: RENK.b, size: 28 });
    gizle(k1, k2); await belir(c, [k1, k2], 400);
    await c.say('Parktaki iki yürüyüşe dönelim.');
    await par(belir(c, t.satir(0, '+x 2', '+y 3'), 350), sol(c, k1, 0.35, 350));
    await c.say('Birinci yürüyüşün bileşenleri: +x yönünde 2, +y yönünde 3 birim.', { speak: 'Birinci yürüyüşün bileşenleri: artı iks yönünde iki, artı ye yönünde üç birim.' });
    await par(belir(c, t.satir(1, '+x 4', '−y 1'), 350), sol(c, k2, 0.35, 350));
    await c.say('İkinci yürüyüşün bileşenleri: +x yönünde 4, −y yönünde 1 birim.', { speak: 'İkinci yürüyüşün bileşenleri: artı iks yönünde dört, eksi ye yönünde bir birim.' });
    await kaybol(c, [k1, k2], 350);
    const d = duzlem(c, svg, { sutun: 8, satir: 6, x: 90, y: 110, oi: 1, oj: 2 }), g = c.S('g', {}, svg);
    gizle(d.g); await belir(c, d.g, 350);
    const V = (i, j, di, dj, renk) => { const v = d.vek(i, j, di, dj, { renk, ...KESIK, katman: g }); gizle(v); return v; };
    const Ax = V(0, 0, 2, 0, RENK.a), Bx = V(2, 0, 4, 0, RENK.b), Rx = V(0, -0.4, 6, 0, RENK.r);
    await ciz(c, Ax, 450); await ciz(c, Bx, 550); await par(ciz(c, Rx, 600), belir(c, [t.yaz(2, 0, 'R'), t.yaz(2, 1, '+x 6')], 300));
    await c.say('x ekseninde ikisi de sağa: R<sub>x</sub>, +x yönünde 6 birim.', { speak: 'İks ekseninde ikisi de sağa: re iks, artı iks yönünde altı birim.' });
    const Ay = V(0, 0, 0, 3, RENK.a), By = V(0.4, 3, 0, -1, RENK.b);
    await ciz(c, Ay, 500); await ciz(c, By, 500);
    await c.say('y ekseninde biri yukarı, öteki aşağı bakıyor.', { speak: 'Ye ekseninde biri yukarı, öteki aşağı bakıyor.' });
    await c.say('Aynı eksende zıt yönlü iki vektör var.');
    await c.choice({ tag: 'Uygula', q: 'R<sub>y</sub> nedir?', options: ['+y yönünde 4 birim', '−y yönünde 2 birim', '+y yönünde 2 birim'], answer: 2,
      hints: ['Büyüklükleri topladın; oysa biri yukarı, öteki aşağı bakıyor. Zıt yönlü bileşenlerde büyük olandan küçük olan çıkarılır.', 'Fark doğru, yön yanlış. Bileşke büyük olanın, yani 3 birim yukarı olanın yönündedir.', ''],
      right: 'Evet. 3 yukarıdan 1 aşağı çıkınca 2 yukarı kalır.' });
    const Ry = V(-0.4, 0, 0, 2, RENK.r);
    await par(ciz(c, Ry, 600), belir(c, t.yaz(2, 2, '+y 2'), 300));
    await c.say('Zıt yön çıkarır: 3 yukarı ile 1 aşağı, 2 birim yukarı eder.', { speak: 'Zıt yön çıkarır: üç yukarı ile bir aşağı, [short pause] iki birim yukarı eder.' });
    const pl = paraleller(c, d, g, 6, 2, true), R = d.vek(0, 0, 6, 2, { renk: RENK.r, ad: 'R', katman: g }); gizle(R, R.etiket);
    await pl.ciz(500);
    await par(c.say('Bileşke 6 sağ, 2 yukarı giden oktur.', { speak: 'Bileşke altı sağ, iki yukarı giden oktur.' }), ciz(c, R, 900));
    const [ux, uy] = d.Q(6, 2);
    await belir(c, c.S('circle', { cx: ux, cy: uy, r: 8, fill: RENK.vurgu }, g), 300);
    await c.say('İki yürüyüşün sonunda başlangıçtan 6 sağ, 2 yukarıdasın.', { speak: 'İki yürüyüşün sonunda başlangıçtan altı sağ, iki yukarıdasın.' });
  }

  /* ---- Sahne 5 · Çizimle aynı mı? ---- */
  async function ayniMi(c) {
    const svg = c.svg(1000, 562), t = btablo(c, svg, { y: 120 }), d = duzlem(c, svg, { sutun: 8, satir: 6, x: 90, y: 110, oi: 1, oj: 2 }), g = c.S('g', {}, svg);
    t.satir(0, '+x 2', '+y 3'); t.satir(1, '+x 4', '−y 1'); t.satir(2, '+x 6', '+y 2');
    const cerceve = kutu(c, t.g, t.x - 6, t.y0 + 2 * t.sy + 4, t.w + 12, t.sy - 8, { fill: 'none', renk: RENK.r, rx: 10 }); gizle(cerceve);
    await belir(c, cerceve, 350);
    await c.say('R<sub>x</sub> ve R<sub>y</sub> hesapla bulundu: +x yönünde 6, +y yönünde 2 birim.', { speak: 'Re iks ve re ye hesapla bulundu: artı iks yönünde altı, artı ye yönünde iki birim.' });
    await c.say('Peki aynı iki yürüyüşü çizerek toplasaydık?', { speak: '[curious] Peki aynı iki yürüyüşü çizerek toplasaydık?' });
    const A = d.vek(0, 0, 2, 3, { renk: RENK.a, ad: 'A', katman: g }), B = d.vek(0, 0, 4, -1, { renk: RENK.b, ad: 'B', katman: g, yan: 1 });
    gizle(A, B, A.etiket, B.etiket);
    await par(c.say('A 2 sağ, 3 yukarı; B onun ucundan 4 sağ, 1 aşağı.', { speak: 'a vektörü iki sağ, üç yukarı; be vektörü onun ucundan dört sağ, bir aşağı.' }),
      (async () => { await ciz(c, A, 600); await ciz(c, B, 600); await c.wait(300); await d.tasi(B, 2, 3, { ms: 1000 }); })());
    await c.choice({ tag: 'Tahmin et', q: 'Uç uca eklenince son uç başlangıca göre nereye düşer?', options: ['Yakın ama başka bir noktaya', '6 sağ, 2 yukarıya', '6 sağ, 4 yukarıya'], answer: 1,
      hints: ['Bileşenlerle toplama yaklaşık bir yol değildir. Kareler tam sayıldığı için iki yol aynı noktayı verir.', '', 'B aşağı gidiyor; 3 yukarıdan 1 kare inilir. Son uç 2 yukarıdadır.'],
      right: 'Evet. Son uç 6 sağ, 2 yukarıdadır.' });
    const g2 = c.S('g', {}, svg), R = d.vek(0, 0, 6, 2, { renk: RENK.r, katman: g2 }); gizle(R);
    const bl = bilesenler(c, d, g2, 6, 2, RENK.r), pl = paraleller(c, d, g2, 6, 2, true);
    gizle(pl);
    await ciz(c, R, 800);
    await par(c.say('Son uç 6 sağ, 2 yukarıda: hesap ile çizim aynı oku verdi.', { speak: 'Son uç altı sağ, iki yukarıda: hesap ile çizim aynı oku verdi.' }), (async () => { await bl.ciz(600); goster(pl); await pl.ciz(600); })());
    // Sınır durumu: ikinci yürüyüş 4 sağ, 3 aşağı
    await par(kaybol(c, [g2, cerceve], 350), kaybol(c, [t.el[1][2], t.el[2][1], t.el[2][2]], 350));
    t.el[1][2] = null; t.el[2][1] = null; t.el[2][2] = null;
    gizle(B.etiket);
    await par(c.say('Şimdi ikinci yürüyüş 4 sağ, 3 aşağı olsun.', { speak: 'Şimdi ikinci yürüyüş dört sağ, üç aşağı olsun.' }), c.tween(900, (e) => B.koy(3, 5, 4, lerp(-1, -3, e))), belir(c, t.yaz(1, 2, '−y 3'), 400));
    B.koy(3, 5, 4, -3); goster(B.etiket);
    const Ay = d.vek(0, 0, 0, 3, { renk: RENK.a, ...KESIK, katman: g }), By = d.vek(-0.4, 3, 0, -3, { renk: RENK.b, ...KESIK, katman: g }); gizle(Ay, By);
    await ciz(c, Ay, 500); await ciz(c, By, 500);
    await c.say('y ekseninde 3 yukarı ile 3 aşağı var: büyüklükleri eşit, yönleri zıt.', { speak: 'Ye ekseninde üç yukarı ile üç aşağı var: büyüklükleri eşit, yönleri zıt.' });
    await c.choice({ tag: 'Uygula', q: 'A: 2 sağ, 3 yukarı. B: 4 sağ, 3 aşağı. Bileşke nedir?', options: ['6 sağ, 6 yukarı', '6 sağ; düşey bileşeni yok', 'Bileşke sıfırdır'], answer: 1,
      hints: ['Zıt yönlü bileşenleri topladın. 3 yukarı ile 3 aşağı birbirini götürür.', '', 'Yalnızca düşey bileşenler birbirini götürdü. Yatayda 2 ile 4 aynı yönde: 6 birim kalır.'],
      right: 'Evet. Düşeyler götürür, yatayda 6 birim kalır.' });
    await sol(c, [Ay, By], 0.3, 300);
    const R2 = d.vek(0, 0, 6, 0, { renk: RENK.r, katman: g }); gizle(R2);
    await par(ciz(c, R2, 800), belir(c, [t.yaz(2, 1, '+x 6'), t.yaz(2, 2, 'yok')], 300));
    await c.say('Düşey bileşenler birbirini götürdü; bileşke yalnızca x ekseninde kaldı.', { speak: '[thoughtful] Düşey bileşenler birbirini götürdü; bileşke yalnızca iks ekseninde kaldı.' });
    await c.say('Bileşke +x yönünde 6 birimdir.', { speak: 'Bileşke artı iks yönünde altı birimdir.' });
  }

  /* ---- Sahne 6 · Tabloyu sen doldur ---- */
  async function doldur(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 10, satir: 8, x: 100, y: 70, oi: 4, oj: 3 }), t = btablo(c, svg, { y: 120 });
    const bs = (i, j) => (i ? (i > 0 ? '+x ' : '−x ') + Math.abs(i) : 'x bileşeni yok') + ', ' + (j ? (j > 0 ? '+y ' : '−y ') + Math.abs(j) : 'y bileşeni yok');
    const goz = (v, eksen) => (v ? (v > 0 ? '+' : '−') + eksen + ' ' + Math.abs(v) : 'yok');
    const IP = { eksen: 'Eksenleri karıştırdın. Sağa ve sola gidilen kareler x, yukarı ve aşağı gidilenler y bileşenidir.', yon: 'Yönü denetle: sağ +x, sol −x, yukarı +y, aşağı −y.' };
    const ciftler = [
      { A: [2, 1], B: [1, 3], R: [3, 4],
        sa: [['+x 1, +y 2', IP.eksen], ['+x 2, +y 1'], ['+x 2, −y 1', IP.yon]], sb: [['+x 1, +y 3'], ['+x 3, +y 1', IP.eksen], ['−x 1, +y 3', IP.yon]],
        sr: [['Tek bileşen: 7 birim', 'Yatay ve düşey bileşenler tek sayıda toplanmaz; sütunlar ayrı toplanır.'], ['+x 3, +y 4'], ['+x 1, +y 2', 'İki sütunda da bileşenler aynı yönde; aynı yön toplar.']] },
      { A: [3, 4], B: [2, -1], R: [5, 3],
        sa: [['+x 3, +y 4'], ['+x 4, +y 3', IP.eksen], ['−x 3, +y 4', IP.yon]], sb: [['+x 2, +y 1', IP.yon], ['+x 1, −y 2', IP.eksen], ['+x 2, −y 1']],
        sr: [['+x 5, +y 5', 'Düşeyde biri yukarı, öteki aşağı bakıyor; zıt yön çıkarır.'], ['+x 5, +y 3'], ['+x 1, +y 3', 'Yatayda ikisi de sağa bakıyor; aynı yön toplar.']] },
      { A: [1, 2], B: [-4, -3], R: [-3, -1],
        sa: [['+x 2, +y 1', IP.eksen], ['+x 1, +y 2'], ['−x 1, +y 2', IP.yon]], sb: [['−x 4, −y 3'], ['+x 4, +y 3', IP.yon], ['−x 3, −y 4', IP.eksen]],
        sr: [['+x 5, +y 5', 'İki sütunda da bileşenler zıt yönlü; büyüklükler toplanmaz, çıkarılır.'], ['+x 3, +y 1', 'Fark doğru, yön yanlış. Bileşke büyük olanın yönündedir: sola ve aşağı.'], ['−x 3, −y 1']] },
      { A: [-2, 3], B: [2, 1], R: [0, 4],
        sa: [['+x 2, +y 3', IP.yon], ['−x 2, +y 3'], ['−x 3, +y 2', IP.eksen]], sb: [['+x 2, +y 1'], ['+x 1, +y 2', IP.eksen], ['+x 2, −y 1', IP.yon]],
        sr: [['+x 4, +y 4', 'Yatayda 2 sol ile 2 sağ zıt yönlü; birbirini götürür.'], ['Bileşke sıfırdır', 'Yalnızca yatay bileşenler götürdü. Düşeyde 3 ile 1 aynı yönde: 4 kalır.'], ['x bileşeni yok, +y 4']] },
    ];
    [0, 1, 2].forEach((r) => t.satir(r));
    const ucAd = (p, v, ad, renk) => { const [a, b, x, y] = v.uclar, L = Math.hypot(x - a, y - b) || 1; return myazi(c, p, x + ((x - a) / L) * 26, y + ((y - b) / L) * 26 + 11, '~' + ad, { size: 26, renk }); };
    const kur = (p) => {
      const gi = c.S('g', {}, svg), A = d.vek(0, 0, ...p.A, { renk: RENK.a, katman: gi }), B = d.vek(0, 0, ...p.B, { renk: RENK.b, katman: gi });
      const la = ucAd(gi, A, 'A', RENK.a), lb = ucAd(gi, B, 'B', RENK.b);
      gizle(A, B, la, lb);
      return { gi, A, B, la, lb, gel: async () => { await par(ciz(c, A, 500), ciz(c, B, 500)); await belir(c, [la, lb], 200); } };
    };
    const sor = (q, sec, bitince) => {
      let pr = null;
      return c.choice({ tag: 'Sıra sende', q, options: sec.map((s) => s[0]), answer: sec.findIndex((s) => s.length === 1), hints: sec.map((s) => s[1] || ''), right: 'Doğru.',
        onPick: (i, tamam) => { if (tamam) pr = bitince(); } }).then(() => pr);
    };
    let k = kur(ciftler[0]);
    await k.gel();
    await c.say('Şimdi tabloyu sen dolduracaksın.');
    await c.say('Önce her vektörün x ve y bileşenini yaz.', { speak: 'Önce her vektörün iks ve ye bileşenini yaz.' });
    await c.say('Sonra sütunları topla: aynı yön toplar, zıt yön çıkarır.');
    await c.say('En sonda bileşkeyi orijinden çiz.');
    await c.say('Tabloyu satır satır doldur: önce A, sonra B, sonra R.', { noWait: true });
    for (const [n, p] of ciftler.entries()) {
      if (n) { k = kur(p); await k.gel(); }
      const { gi, A, B, lb } = k;
      await sor('<b>A</b> vektörünün bileşenleri hangisi?', p.sa, () => belir(c, [t.yaz(0, 1, goz(p.A[0], 'x')), t.yaz(0, 2, goz(p.A[1], 'y'))], 300));
      await sor('<b>B</b> vektörünün bileşenleri hangisi?', p.sb, () => belir(c, [t.yaz(1, 1, goz(p.B[0], 'x')), t.yaz(1, 2, goz(p.B[1], 'y'))], 300));
      await sor('Sütunları topla. <b>R</b> bileşkesinin bileşenleri hangisi?', p.sr, async () => {
        await belir(c, [t.yaz(2, 1, goz(p.R[0], 'x')), t.yaz(2, 2, goz(p.R[1], 'y'))], 300);
        const R = d.vek(0, 0, ...p.R, { renk: RENK.r, kalin: 8, katman: gi }); gizle(R);
        await ciz(c, R, 700);
        gizle(lb); await d.tasi(B, p.A[0], p.A[1], { ms: 800 });
        const uc = d.vek(0, 0, ...p.R, { renk: RENK.yazi, kalin: 2.5, uc: 10, katman: gi }); gizle(uc);
        await ciz(c, uc, 600);
      });
      await c.wait(400);
      await par(kaybol(c, gi, 300), t.temizle(300, true));
    }
    const son = c.S('g', {}, svg), sA = d.vek(0, 0, 2, 1, { renk: RENK.a, katman: son }), sB = d.vek(2, 1, 1, 3, { renk: RENK.b, katman: son }), sR = d.vek(0, 0, 3, 4, { renk: RENK.r, katman: son });
    gizle(sA, sB, sR);
    await par(belir(c, [t.yaz(0, 1, '+x 2'), t.yaz(0, 2, '+y 1'), t.yaz(1, 1, '+x 1'), t.yaz(1, 2, '+y 3'), t.yaz(2, 1, '+x 3'), t.yaz(2, 2, '+y 4')], 300), ciz(c, sA, 400), ciz(c, sB, 400));
    await par(c.say('Dört çiftte de üç basamak aynıydı: ayır, sütunları topla, birleştir.'), ciz(c, sR, 800));
    await c.say('Yatay yatayla, düşey düşeyle toplanır.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c8', kicker: 'Konu C · Vektörler', title: 'Bileşenleri toplayarak bileşke', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Bileşenleri toplayarak bileşke', hook: 'İki oku çizmeden, yalnızca “kaç sağ, kaç yukarı” bilgisiyle toplayabilir misin?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Çizmeden toplamak', goal: 'Bileşkenin yalnızca sayılarla bulunabileceğini gör.', run: cizmeden },
      { title: 'Üç basamak', goal: 'Ayır, aynı eksendekileri topla, birleştir.', run: ucBasamak },
      { title: 'Yatay ile düşey toplanmaz', goal: 'Toplamayı yalnızca aynı sütunun içinde yap.', run: toplanmaz },
      { title: 'Zıt yönlü bileşenler', goal: 'Aynı eksende zıt yönlü bileşenleri çıkar.', run: zit },
      { title: 'Çizimle aynı mı?', goal: 'Hesabı uç uca eklemeyle karşılaştır.', run: ayniMi },
      { title: 'Tabloyu sen doldur', goal: 'Dört çiftin bileşkesini tabloyla bul.', run: doldur },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'A: +x yönünde 3, +y yönünde 1 birim. B: −x yönünde 1, +y yönünde 2 birim. Bileşkenin bileşenleri nedir?',
        options: ['R<sub>x</sub>: +x yönünde 4, R<sub>y</sub>: +y yönünde 3 birim', 'Tek bileşen: 7 birim', 'R<sub>x</sub>: +x yönünde 2, R<sub>y</sub>: +y yönünde 3 birim'], answer: 2,
        why: ['x ekseninde biri sağa, öteki sola bakıyor; zıt yön çıkarır.', 'Yatay ve düşey bileşenler ayrı sütunlarda toplanır.', 'x ekseninde 3 ile 1 zıt yönde: 2 birim, +x yönünde. y ekseninde 1 ile 2 aynı yönde: 3 birim.'], scene: 3 },
      { q: 'A: 5 sağ, 2 yukarı. B: 1 sol, 2 aşağı. Bileşke nereye bakar?',
        options: ['+x ile +y arasına; 4 sağ, 4 yukarı', 'Yalnızca +x yönüne; 4 birim', 'Hiçbir yere; bileşke sıfırdır'], answer: 1,
        why: ['2 yukarı ile 2 aşağı zıt yönlüdür; toplanmaz, birbirini götürür.', 'Düşeyde 2 yukarı ile 2 aşağı birbirini götürür; yatayda 5 − 1 = 4 birim, +x yönünde kalır.', 'Yalnızca düşey bileşenler götürdü; yatayda 4 birim kalır.'], scene: 4 },
      { q: 'Bir balona iki ayrı kuvvet etki ediyor. A: +x yönünde 4, −y yönünde 2 birim. B: −x yönünde 6, +y yönünde 5 birim. Bileşkenin bileşenleri nedir?',
        options: ['R<sub>x</sub>: −x yönünde 2, R<sub>y</sub>: +y yönünde 3 birim', 'R<sub>x</sub>: −x yönünde 10, R<sub>y</sub>: +y yönünde 7 birim', 'R<sub>x</sub>: +x yönünde 2, R<sub>y</sub>: +y yönünde 3 birim'], answer: 0,
        why: ['Evet. x ekseninde 4 sağ ile 6 sol zıt yönde: fark 2, büyük olanın yönünde, yani −x. y ekseninde 2 aşağı ile 5 yukarı zıt yönde: fark 3, +y yönünde.', 'Büyüklükleri topladın; oysa her eksende iki bileşen zıt yönlü. Zıt yön çıkarır.', 'Fark doğru, yön yanlış. x ekseninde büyük olan 6 birimlik bileşen sola bakıyor; bileşke −x yönündedir.'], scene: 3 },
      { q: 'Burak: “Okları çizmeden, yalnızca sayılarla toplarsam bileşke yaklaşık çıkar; kesin bileşke için çizmem gerekir.” Doğru karşılık hangisidir?',
        options: ['Haklı; çizimsiz hesap en fazla yaklaşık bir sonuç verir.', 'Haksız; hesap yalnızca bileşenler aynı yönlüyse kesindir.', 'Haksız; hesap, uç uca eklemeyle çizilen okun aynısını verir.'], answer: 2,
        why: ['Hesap yaklaşık değildir; çizilen ok ile aynı noktaya varır.', 'Zıt yönlü bileşenlerde de hesap kesindir; fark alınır ve çizimle aynı ok çıkar.', 'Evet. Hesapla bulunan bileşke, uç uca eklemeyle çizilenle aynı oktur; çizim gerekmez.'], scene: 4 },
    ],
    summary: ['<b>Yatay yatayla, düşey düşeyle toplanır.</b>', 'Üç basamak: vektörleri bileşenlerine ayır, aynı eksendeki bileşenleri topla, R<sub>x</sub> ile R<sub>y</sub>’yi birleştir.', 'Aynı eksende aynı yön toplar, zıt yön çıkarır; eşit ve zıt bileşenler birbirini götürür.'],
    nextLesson: { href: 'c9-yontem-degisir.html', label: 'Sonraki: Yöntem değişir, bileşke değişmez ›' },
  });
})();
