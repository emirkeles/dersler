/* C7 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C7")
   Yazar notu: içerik MEB Fizik 9 s. 79–80, 82, 83 ve 85'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Vektörün boyu sayıyla istenmez; yalnızca "bileşenlerin toplamından kısadır" denir.
   Renk: A birinci vektör rengi, B ve D ikinci vektör rengi; bileşenler aynı renkte kesikli ok. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, kay, par, ok, okCiz, izgara } = KIT;
  const { lerp, ease } = Ders;

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
  const ciz = (c, v, ms = 600) => { goster(v); return okCiz(c, v, ms); };
  const tarif = (di, dj) => [di ? Math.abs(di) + (di > 0 ? ' sağ' : ' sol') : '', dj ? Math.abs(dj) + (dj > 0 ? ' yukarı' : ' aşağı') : ''].filter(Boolean).join(', ');

  /* Eksenli kareli düzlem: KIT.izgara üstüne +x, −x, +y, −y ve O etiketli iki eksen.
     Q(i, j) ve vek(i, j, di, dj) orijine göre kare sayar. */
  function duzlem(c, p, o = {}) {
    const kare = o.kare || 50, sutun = o.sutun || 10, satir = o.satir || 8;
    const oi = o.oi == null ? sutun / 2 : o.oi, oj = o.oj == null ? satir / 2 : o.oj;
    const iz = izgara(c, p, { kare, sutun, satir, x: o.x, y: o.y });
    const [ox, oy] = iz.P(oi, oj), xs = iz.x0, xe = iz.x0 + sutun * kare, ys = iz.y0, ye = iz.y0 + satir * kare;
    const e = { renk: RENK.cizgi, kalin: 3, uc: 12 }, t = { size: 24, renk: RENK.soluk };
    const xEks = c.S('g', {}, iz.g), yEks = c.S('g', {}, iz.g), xAd = c.S('g', {}, iz.g), yAd = c.S('g', {}, iz.g), oAd = c.S('g', {}, iz.g);
    ok(c, xEks, ox, oy, xe + 14, oy, e); ok(c, xEks, ox, oy, xs - 14, oy, e);
    ok(c, yEks, ox, oy, ox, ys - 14, e); ok(c, yEks, ox, oy, ox, ye + 14, e);
    yazi(c, xAd, xe + 20, oy + 8, '+x', { ...t, hiza: 'start' }); yazi(c, xAd, xs - 20, oy + 8, '−x', { ...t, hiza: 'end' });
    yazi(c, yAd, ox, ys - 22, '+y', t); yazi(c, yAd, ox, ye + 38, '−y', t);
    c.S('circle', { cx: ox, cy: oy, r: 5, fill: RENK.yazi }, oAd);
    yazi(c, oAd, ox - 12, oy + 28, 'O', { ...t, hiza: 'end' });
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
    return { iz, g: iz.g, ox, oy, xs, xe, ys, ye, kare, xEks, yEks, xAd, yAd, oAd, Q, vek, tasi };
  }
  /* Bitiş noktasından eksenlere inen ince noktalı paraleller. g.ciz() uçtan eksene doğru çizer. */
  function paraleller(c, d, p, i, j) {
    const g = c.S('g', {}, p), [x, y] = d.Q(i, j), [x0, y0] = d.Q(0, 0), o = { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' };
    const l1 = j ? cizgi(c, g, x, y, x, y0, o) : null, l2 = i ? cizgi(c, g, x, y, x0, y, o) : null;
    g.ciz = (ms = 600) => c.tween(ms, (e) => { if (l1) l1.setAttribute('y2', lerp(y, y0, e)); if (l2) l2.setAttribute('x2', lerp(x, x0, e)); });
    return g;
  }
  /* Orijinden çıkan kesikli iki bileşen oku (gizli gelir). */
  function bilesenler(c, d, p, i, j, renk) {
    const o = { renk, kesik: true, kalin: 5, uc: 16, katman: p };
    const x = i ? d.vek(0, 0, i, 0, o) : null, y = j ? d.vek(0, 0, 0, j, o) : null;
    gizle([x, y].filter(Boolean));
    return { x, y, ciz: (ms = 500) => par([x, y].filter(Boolean).map((v) => ciz(c, v, ms))) };
  }
  /* Bir oku boyunu koruyarak yatırıp (x, y) noktasından sağa doğru serer. */
  const yatir = (c, g, x, y, ms = 900) => {
    const [a, b, d, e] = g.uclar, L = Math.hypot(d - a, e - b), th0 = Math.atan2(e - b, d - a);
    return c.tween(ms, (t) => { const px = lerp(a, x, t), py = lerp(b, y, t), th = lerp(th0, 0, t); g.ayarla(px, py, px + Math.cos(th) * L, py + Math.sin(th) * L); }, ease.inOut);
  };

  /* ---- Sahne 1 · Fil ve iki düz yol ---- */
  async function fil(c) {
    const svg = c.svg(1000, 562);
    const h = c.S('g', {}, svg), iz = izgara(c, h, { kare: 50, sutun: 6, satir: 5, x: 350, y: 130 });
    const a = iz.vektor(1, 0, 3, 0, { renk: RENK.a }), b = iz.vektor(4, 0, 0, 4, { renk: RENK.b }), r = iz.vektor(1, 0, 3, 4, { renk: RENK.r });
    const ha = yazi(c, h, 475, 414, '3 sağ', { size: 24, renk: RENK.a }), hb = yazi(c, h, 564, 288, '4 yukarı', { size: 24, renk: RENK.b, hiza: 'start' });
    gizle(a, b, r, ha, hb);
    await ciz(c, a, 450); await ciz(c, b, 450);
    await par(c.say('İki ok uç uca eklenince baştan sona çizilen ok bileşkedir.'), ciz(c, r, 800));
    await belir(c, [ha, hb], 300);
    await c.say('Örneğin 3 sağ ile 4 yukarı toplanınca tek bir eğik ok çıkar.', { speak: 'Örneğin üç sağ ile dört yukarı toplanınca tek bir eğik ok çıkar.' });
    await sol(c, [a, b, ha, hb], 0.3);
    await c.say('Şimdi tersini yapacağız: eğik bir oku iki düz oka ayıracağız.');
    await kaybol(c, h, 400);

    // Satranç tahtasından 5×5 karelik parça
    const KB = 80, bx = 300, by = 70, M = (i, j) => [bx + (i + 0.5) * KB, by + (4.5 - j) * KB];
    const tg = c.S('g', {}, svg);
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) c.S('rect', { x: bx + i * KB, y: by + (4 - j) * KB, width: KB, height: KB, fill: (i + j) % 2 ? '#2a3a5e' : RENK.koyu }, tg);
    kutu(c, tg, bx, by, 5 * KB, 5 * KB, { fill: 'none', rx: 0 });
    const hedef = c.S('rect', { x: bx + 3 * KB + 3, y: by + KB + 3, width: KB - 6, height: KB - 6, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, tg);
    const [fx, fy] = M(0, 0), [hx, hy] = M(3, 3), [kx, ky] = M(3, 0);
    const okG = c.S('g', {}, svg);
    const tas = c.S('g', {}, svg);
    yol(c, tas, 'M -17 28 L 17 28 L 11 16 L -11 16 Z', { renk: RENK.yazi, fill: RENK.yazi, kalin: 2 });
    yol(c, tas, 'M -9 16 Q -16 -6 0 -22 Q 16 -6 9 16 Z', { renk: RENK.yazi, fill: RENK.yazi, kalin: 2 });
    c.S('circle', { cx: 0, cy: -27, r: 5, fill: RENK.yazi }, tas);
    cizgi(c, tas, -2, -10, 6, -3, { renk: RENK.koyu, kalin: 3 });
    tas.setAttribute('transform', `translate(${fx - 20} ${fy})`);
    gizle(tg, tas, hedef);
    await belir(c, [tg, tas], 400);
    await c.say('Satrançta fil yalnızca çapraz gider.');
    const A = ok(c, okG, fx, fy, hx, hy, { renk: RENK.a, kalin: 7 });
    await par(c.say('Bu fil bir hamlede 3 kare sağa, 3 kare yukarı çıktı.', { speak: 'Bu fil bir hamlede üç kare sağa, üç kare yukarı çıktı.' }), ciz(c, A, 1000), kay(c, tas, fx - 20, fy, hx - 20, hy, 1000));
    await belir(c, hedef, 300);
    await c.say('Sen aynı kareye yalnızca yatay ve düşey adımlarla gideceksin.');
    await c.choice({ tag: 'Uygula', q: 'Aynı kareye hangi adımlarla varırsın?', options: ['6 kare sağa', '3 kare sağa, sonra 3 kare yukarı', 'Yalnızca 3 kare yukarı'], answer: 1,
      hints: ['Sayıları topladın ama hepsini aynı yöne yürüdün. Filin vardığı kare 3 sağda ve 3 yukarıda.', '', 'Düşey adımı attın, yatay adımı unuttun. Fil 3 kare sağa da gitmişti.'],
      right: 'Evet. Önce yatay, sonra düşey adım aynı kareye varır.' });
    const yatay = ok(c, okG, fx, fy, kx, ky, { renk: RENK.a, kesik: true, kalin: 5, uc: 16 }), dusey = ok(c, okG, kx, ky, hx, hy, { renk: RENK.a, kesik: true, kalin: 5, uc: 16 });
    const ty = yazi(c, svg, (fx + kx) / 2, fy + 32, '3 sağ', { size: 24, renk: RENK.a }), td = yazi(c, svg, kx + 16, (ky + hy) / 2 + 8, '3 yukarı', { size: 24, renk: RENK.a, hiza: 'start' });
    gizle(yatay, dusey, ty, td);
    await ciz(c, yatay, 600); await belir(c, ty, 250); await ciz(c, dusey, 600); await belir(c, td, 250);
    await c.say('Yatay adım ile düşey adım uç uca eklenince filin oku çıkar.');
    await c.say('Demek ki eğik bir ok, bir yatay ve bir düşey okun toplamıdır.');
    ty.textContent = 'yatay bileşen'; td.textContent = 'düşey bileşen';
    await c.say('Bu iki oka vektörün bileşenleri denir.', { speak: 'Bu iki oka, [short pause] vektörün bileşenleri denir.' });
  }

  /* ---- Sahne 2 · Eksenler ve orijin ---- */
  async function eksenler(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 12, satir: 8, x: 200, y: 70 }), { ox, oy } = d;
    gizle(d.xEks, d.yEks, d.xAd, d.yAd, d.oAd);
    await par(c.say('Bileşenleri bulmak için düzleme iki eksen çizeriz.'), (async () => { await belir(c, d.xEks, 600); await belir(c, d.yEks, 600); })());
    const xa = yazi(c, svg, d.xe - 70, oy - 16, 'x ekseni', { size: 24, renk: RENK.vurgu }), ya = yazi(c, svg, ox + 16, d.ys + 32, 'y ekseni', { size: 24, renk: RENK.vurgu, hiza: 'start' });
    await belir(c, [xa, ya], 300);
    await c.say('Yatay eksene x ekseni, düşey eksene y ekseni denir.', { speak: 'Yatay eksene iks ekseni, düşey eksene ye ekseni denir.' });
    const dik = yol(c, svg, `M ${ox + 20} ${oy} L ${ox + 20} ${oy - 20} L ${ox} ${oy - 20}`, { renk: RENK.vurgu, kalin: 3 });
    await belir(c, dik, 300);
    await c.say('Eksenleri birbirine dik olan bu sisteme dik kartezyen koordinat sistemi denir.');
    await belir(c, d.oAd, 300);
    await c.say('Eksenlerin kesiştiği nokta orijindir; O harfiyle gösterilir.', { speak: 'Eksenlerin kesiştiği nokta orijindir; o harfiyle gösterilir.' });
    await par(kaybol(c, xa, 250), belir(c, d.xAd, 300));
    await c.say('Orijinden sağa +x, sola −x yönüdür.', { speak: 'Orijinden sağa artı iks, sola eksi iks yönüdür.' });
    await par(kaybol(c, ya, 250), belir(c, d.yAd, 300));
    await c.say('Orijinden yukarı +y, aşağı −y yönüdür.', { speak: 'Orijinden yukarı artı ye, aşağı eksi ye yönüdür.' });
    const e1 = d.vek(0, 0, 2, 0, { renk: RENK.a }), t1 = yazi(c, svg, ox + 8, oy + 36, '+x yönünde 2 birim', { size: 24, renk: RENK.a, hiza: 'start' });
    gizle(e1, t1);
    await ciz(c, e1, 600); await belir(c, t1, 250);
    await c.say('Orijinden 2 kare sağa giden ok, +x yönünde 2 birimdir.', { speak: 'Orijinden iki kare sağa giden ok, artı iks yönünde iki birimdir.' });
    const e2 = d.vek(0, 0, -3, 0, { renk: RENK.b }); gizle(e2);
    await ciz(c, e2, 600);
    await c.choice({ tag: 'Uygula', q: 'Orijinden 3 kare sola giden ok nasıl söylenir?', options: ['+x yönünde 3 birim', '−y yönünde 3 birim', '−x yönünde 3 birim'], answer: 2,
      hints: ['+x sağ taraftır. Sola giden ok −x yönündedir.', '−y aşağıdır. Sol ve sağ, x ekseni üzerindedir.', ''],
      right: 'Evet. Sol taraf −x yönüdür.' });
    const t2 = yazi(c, svg, ox - 8, oy - 18, '−x yönünde 3 birim', { size: 24, renk: RENK.b, hiza: 'end' });
    await belir(c, t2, 300);
    await c.say('Sol ve sağ x ekseninde, aşağı ve yukarı y eksenindedir.', { speak: 'Sol ve sağ iks ekseninde, aşağı ve yukarı ye eksenindedir.' });
    const s2 = c.S('g', {}, svg);
    for (let k = 0; k <= 3; k++) cizgi(c, s2, ox - k * 50, oy + 40, ox - k * 50, oy + 56, { renk: RENK.vurgu, kalin: 3 });
    cizgi(c, s2, ox - 150, oy + 48, ox, oy + 48, { renk: RENK.vurgu, kalin: 3 });
    yazi(c, s2, ox - 75, oy + 86, '3 birim', { size: 24, renk: RENK.vurgu });
    gizle(s2);
    await belir(c, s2, 300);
    await c.say('Eksi işareti büyüklüğü değil, yönü söyler: büyüklük yine 3 birimdir.', { speak: '[thoughtful] Eksi işareti büyüklüğü değil, yönü söyler: büyüklük yine üç birimdir.' });
  }

  /* ---- Sahne 3 · Üç basamak ---- */
  async function basamak(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 10, satir: 8, x: 120, y: 70, oi: 3, oj: 3 }), { ox, oy } = d;
    const g = c.S('g', {}, svg);
    const iz = d.vek(4, 1, 2, 3, { renk: RENK.soluk, kalin: 4, katman: g }); gizle(iz);
    const A = d.vek(4, 1, 2, 3, { renk: RENK.a, ad: 'A', katman: g }); gizle(A);
    await ciz(c, A, 700);
    const sy = d.iz.sayim(A); gizle(sy);
    await belir(c, sy, 300);
    await c.say('A vektörü 2 sağ, 3 yukarı giden eğik bir ok.', { speak: 'a vektörü iki sağ, üç yukarı giden eğik bir ok.' });
    await kaybol(c, sy, 250);
    iz.style.opacity = 0.4;
    await par(c.say('Birinci basamak: vektörün başlangıç noktası orijine getirilir.'), d.tasi(A, 0, 0, { ms: 1300 }));
    await c.say('Taşırken ok döndürülmez, boyu da değiştirilmez.');
    await c.choice({ tag: 'Düşün', q: 'A orijine taşındı. Ne değişti?', options: ['Yönü', 'Büyüklüğü', 'Yalnızca çizildiği yer'], answer: 2,
      hints: ['Ok dönmedi; hâlâ 2 sağ, 3 yukarı gidiyor. Taşımak yönü değiştirmez.', 'Okun boyu aynı kaldı. Taşınan vektör aynı vektördür.', ''],
      right: 'Evet. Yön ve büyüklük aynı; değişen yalnızca yer.' });
    await par(c.say('Taşınan ok hâlâ 2 sağ, 3 yukarı gidiyor; aynı vektör.', { speak: 'Taşınan ok hâlâ iki sağ, üç yukarı gidiyor; aynı vektör.' }), kaybol(c, iz, 600));
    const pl = paraleller(c, d, g, 2, 3);
    await pl.ciz(700);
    await c.say('İkinci basamak: bitiş noktasından eksenlere paralel çizgiler çizilir.');
    const n1 = c.S('circle', { cx: d.Q(2, 0)[0], cy: oy, r: 7, fill: RENK.vurgu }, g), n2 = c.S('circle', { cx: ox, cy: d.Q(0, 3)[1], r: 7, fill: RENK.vurgu }, g);
    await belir(c, [n1, n2], 300);
    await c.say('Çizgiler x eksenini 2 birim sağda, y eksenini 3 birim yukarıda keser.', { speak: 'Çizgiler iks eksenini iki birim sağda, ye eksenini üç birim yukarıda keser.' });
    const bl = bilesenler(c, d, g, 2, 3, RENK.a);
    await bl.ciz(700);
    await c.say('Üçüncü basamak: orijinden bu kesim noktalarına birer ok çizilir.');
    const lx = myazi(c, g, ox + 50, oy + 44, '~A_{x}', { renk: RENK.a }), ly = myazi(c, g, ox - 14, oy - 66, '~A_{y}', { renk: RENK.a, hiza: 'end' });
    await belir(c, [lx, ly], 300);
    await c.say('x eksenindeki ok A<sub>x</sub>, y eksenindeki ok A<sub>y</sub> bileşenidir.', { speak: 'İks eksenindeki ok a iks, ye eksenindeki ok a ye bileşenidir.' });
    await c.say('Bileşen, vektörün eksen üzerindeki iz düşümüdür.', { speak: 'Bileşen, [short pause] vektörün eksen üzerindeki iz düşümüdür.' });
    const sx = myazi(c, g, 700, 180, '~A_{x}: +x, 2 birim', { renk: RENK.a, hiza: 'start' }), sy2 = myazi(c, g, 700, 226, '~A_{y}: +y, 3 birim', { renk: RENK.a, hiza: 'start' });
    await belir(c, [sx, sy2], 300);
    await c.say('A<sub>x</sub>, +x yönünde 2 birim; A<sub>y</sub>, +y yönünde 3 birim.', { speak: 'a iks, artı iks yönünde iki birim; a ye, artı ye yönünde üç birim.' });

    // Ev ile okul: aynı düzlemde yeni vektör
    await kaybol(c, g, 400);
    const g2 = c.S('g', {}, svg), [sxp, syp] = d.Q(5, 2);
    yol(c, g2, `M ${ox - 48} ${oy - 12} l 0 -22 l 17 -15 l 17 15 l 0 22 Z`, { renk: RENK.yazi, kalin: 3 });
    yazi(c, g2, ox - 31, oy - 58, 'ev', { size: 24 });
    kutu(c, g2, sxp + 12, syp - 46, 46, 30, { renk: RENK.yazi, rx: 3, fill: 'none' });
    yol(c, g2, `M ${sxp + 35} ${syp - 46} l 0 -22 l 16 6 l -16 6`, { renk: RENK.yazi, kalin: 3 });
    yazi(c, g2, sxp + 68, syp - 22, 'okul', { size: 24, hiza: 'start' });
    const K = d.vek(0, 0, 5, 2, { renk: RENK.a, katman: g2 }); gizle(g2);
    await belir(c, g2, 350); await okCiz(c, K, 700);
    await c.choice({ tag: 'Uygula', q: 'Ev orijinde. Evden okula giden ok 5 sağ, 2 yukarı gidiyor. Bu okun bileşenleri nedir?',
      options: ['+x yönünde 2, +y yönünde 5 birim', '+x yönünde 5, +y yönünde 2 birim', '+x yönünde 7 birim'], answer: 1,
      hints: ['Eksenleri karıştırdın. Sağa gidilen kareler x, yukarı çıkılan kareler y bileşenidir.', '', 'İki bileşen farklı eksenlerdedir, tek sayıda birleşmez. Yatay 5 ve düşey 2 ayrı ayrı söylenir.'],
      right: 'Evet. Yatay bileşen 5, düşey bileşen 2 birim.' });
    const pl2 = paraleller(c, d, g2, 5, 2), bl2 = bilesenler(c, d, g2, 5, 2, RENK.a);
    await pl2.ciz(500); await bl2.ciz(600);
    const o1 = yazi(c, g2, 700, 400, '+x, 5 birim', { size: 26, renk: RENK.a, hiza: 'start' }), o2 = yazi(c, g2, 700, 446, '+y, 2 birim', { size: 26, renk: RENK.a, hiza: 'start' });
    await belir(c, [o1, o2], 300);
    await c.say('Okul 5 kare sağda, 2 kare yukarıda; bileşenler de öyle.', { speak: 'Okul beş kare sağda, iki kare yukarıda; bileşenler de öyle.' });
    await c.say('Bileşenler eşit olmak zorunda değil: burada biri 5, öteki 2.', { speak: 'Bileşenler eşit olmak zorunda değil: burada biri beş, öteki iki.' });
    c.note('<b>Bileşen, vektörün eksen üzerindeki iz düşümüdür.</b><br>2 sağ, 3 yukarı → A<sub>x</sub>: +x 2 birim; A<sub>y</sub>: +y 3 birim', 'Bileşen', 'bilesen');
  }

  /* ---- Sahne 4 · Bileşenin de yönü var ---- */
  async function yon(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 10, satir: 8, x: 120, y: 70 }), { ox, oy } = d;
    const g = c.S('g', {}, svg);
    await c.say('Bileşen de bir vektördür: yönü ve büyüklüğü vardır.');
    const A = d.vek(0, 0, -3, 3, { renk: RENK.a, ad: 'A', katman: g, yan: 1 }); gizle(A);
    await ciz(c, A, 700);
    await c.say('Bu A vektörü orijinden 3 sola, 3 yukarı gidiyor.', { speak: 'Bu a vektörü orijinden üç sola, üç yukarı gidiyor.' });
    const pl = paraleller(c, d, g, -3, 3);
    await par(c.say('Bitiş noktasından eksenlere paralelleri çizelim.'), pl.ciz(800));
    const bl = bilesenler(c, d, g, -3, 3, RENK.a);
    const lx = myazi(c, g, ox - 75, oy + 44, '~A_{x}', { renk: RENK.a }), ly = myazi(c, g, ox + 14, oy - 66, '~A_{y}', { renk: RENK.a, hiza: 'start' });
    const sx = myazi(c, g, 700, 150, '~A_{x}: −x, 3 birim', { renk: RENK.a, hiza: 'start' }), sy = myazi(c, g, 700, 196, '~A_{y}: +y, 3 birim', { renk: RENK.a, hiza: 'start' });
    gizle(lx, ly, sx, sy);
    await ciz(c, bl.x, 600); await belir(c, [lx, sx], 300);
    await c.say('Yatay bileşen sola uzanıyor: A<sub>x</sub>, −x yönünde 3 birim.', { speak: 'Yatay bileşen sola uzanıyor: a iks, eksi iks yönünde üç birim.' });
    await ciz(c, bl.y, 600); await belir(c, [ly, sy], 300);
    await c.say('Düşey bileşen yukarı uzanıyor: A<sub>y</sub>, +y yönünde 3 birim.', { speak: 'Düşey bileşen yukarı uzanıyor: a ye, artı ye yönünde üç birim.' });
    const yanlis = d.vek(0, 0, 3, 3, { renk: RENK.kotu, kalin: 4, katman: g }); gizle(yanlis);
    await ciz(c, yanlis, 600);
    await c.say('Bileşeni söylerken yönü atlarsan ok yanlış yere gider.', { speak: '[thoughtful] Bileşeni söylerken yönü atlarsan ok yanlış yere gider.' });
    await par(kaybol(c, [yanlis, A.etiket, lx, ly, sx, sy], 350), sol(c, [A, bl.x, bl.y, pl], 0.2));

    const g2 = c.S('g', {}, svg);
    const B = d.vek(0, 0, 4, -2, { renk: RENK.b, ad: 'B', katman: g2 }); gizle(B);
    await ciz(c, B, 700);
    await c.choice({ tag: 'Uygula', q: 'B vektörü orijinden 4 sağ, 2 aşağı gidiyor. Bileşenleri nedir?',
      options: ['B<sub>x</sub>: +x yönünde 4, B<sub>y</sub>: +y yönünde 2 birim', 'B<sub>x</sub>: +x yönünde 4, B<sub>y</sub>: −y yönünde 2 birim', 'B<sub>x</sub>: −x yönünde 4, B<sub>y</sub>: −y yönünde 2 birim'], answer: 1,
      hints: ['Ok aşağı gidiyor; düşey bileşen −y yönündedir. Bileşenin yönü her zaman artı olmaz.', '', 'Ok sağa gidiyor; yatay bileşen +x yönündedir. Eksi yönde olan yalnızca aşağı giden bileşendir.'],
      right: 'Evet. Sağa giden +x, aşağı giden −y yönündedir.' });
    const pl2 = paraleller(c, d, g2, 4, -2), bl2 = bilesenler(c, d, g2, 4, -2, RENK.b);
    await pl2.ciz(500); await bl2.ciz(600);
    const mx = myazi(c, g2, ox + 100, oy - 16, '~B_{x}', { renk: RENK.b }), my = myazi(c, g2, ox - 14, oy + 78, '~B_{y}', { renk: RENK.b, hiza: 'end' });
    const tx = myazi(c, g2, 700, 380, '~B_{x}: +x, 4 birim', { renk: RENK.b, hiza: 'start' }), ty = myazi(c, g2, 700, 426, '~B_{y}: −y, 2 birim', { renk: RENK.b, hiza: 'start' });
    await belir(c, [mx, my, tx, ty], 300);
    await c.say('Sağa giden bileşen +x, aşağı giden bileşen −y yönündedir.', { speak: 'Sağa giden bileşen artı iks, aşağı giden bileşen eksi ye yönündedir.' });
    await c.say('Büyüklük kare sayısıdır; yönü eksenin artı ya da eksi ucu söyler.');
  }

  /* ---- Sahne 5 · Bileşenleri topla, vektör geri gelsin ---- */
  async function topla(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 6, satir: 6, x: 90, y: 70, oi: 1, oj: 1 }), { ox, oy } = d;
    const g = c.S('g', {}, svg);
    const ay0 = d.vek(0, 0, 0, 3, { renk: RENK.a, kesik: true, kalin: 5, uc: 16, katman: g }); gizle(ay0);
    const A = d.vek(0, 0, 2, 3, { renk: RENK.a, ad: 'A', katman: g, kalin: 8 });
    const bl = bilesenler(c, d, g, 2, 3, RENK.a); goster(bl.x, bl.y);
    const lx = myazi(c, g, ox + 50, oy + 44, '~A_{x}', { renk: RENK.a }), ly = myazi(c, g, ox - 14, oy - 66, '~A_{y}', { renk: RENK.a, hiza: 'end' });
    await c.say('A vektörünün bileşenleri: +x yönünde 2, +y yönünde 3 birim.', { speak: 'a vektörünün bileşenleri: artı iks yönünde iki, artı ye yönünde üç birim.' });
    await c.say('Şimdi geri dönelim: bu iki bileşeni toplayalım.');
    gizle(ly);
    await par(c.say('A<sub>y</sub> bileşenini A<sub>x</sub> bileşeninin ucuna taşıyıp uç uca ekleyelim.', { speak: 'a ye bileşenini a iks bileşeninin ucuna taşıyıp uç uca ekleyelim.' }), d.tasi(bl.y, 2, 0, { ms: 1300 }));
    const ly2 = myazi(c, g, ox + 114, oy - 66, '~A_{y}', { renk: RENK.a, hiza: 'start' });
    await belir(c, ly2, 250);
    const R = d.vek(0, 0, 2, 3, { renk: RENK.r, kalin: 3, uc: 12, katman: g }); gizle(R);
    const esit = myazi(c, g, 240, 478, '~A = ~A_{x} + ~A_{y}', { size: 32, renk: RENK.a });
    gizle(esit);
    await par(c.say('Baştan sona çizilen ok, A vektörünün tam üstüne düşüyor.', { speak: 'Baştan sona çizilen ok, a vektörünün tam üstüne düşüyor.' }), ciz(c, R, 1000));
    await belir(c, esit, 300);
    const ust = cizgi(c, g, ...d.Q(0, 3), ...d.Q(2, 3), { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' }); gizle(ust);
    await par(belir(c, ay0, 400, 0.7), belir(c, ust, 400));
    await c.say('Paralelkenar kursak da köşegen yine A olur.', { speak: 'Paralelkenar kursak da köşegen yine a vektörü olur.' });
    await c.say('Bir vektörün bileşenlerinin bileşkesi, vektörün kendisidir.');

    // Kareli şerit: 2 + 3 = 5 kare; A daha kısa
    const sg = c.S('g', {}, svg), SX = 590, S1 = 150, S2 = 250;
    izgara(c, sg, { kare: 50, sutun: 6, satir: 1, x: SX, y: S1 }); izgara(c, sg, { kare: 50, sutun: 6, satir: 1, x: SX, y: S2 });
    gizle(sg);
    await belir(c, sg, 350);
    await c.say('Ama bileşenlerin büyüklüklerini toplamak vektörün boyunu vermez.', { speak: '[thoughtful] Ama bileşenlerin büyüklüklerini toplamak vektörün boyunu vermez.' });
    const kopya = (v, o) => ok(c, sg, ...v.uclar, { renk: RENK.a, ...o });
    const kx = kopya(bl.x, { kesik: true, kalin: 5, uc: 16 }), ky = kopya(bl.y, { kesik: true, kalin: 5, uc: 16 });
    const t5 = yazi(c, sg, SX + 150, S1 - 16, '2 + 3 = 5 kare', { size: 24, renk: RENK.a }), tk = yazi(c, sg, SX + 150, S2 + 84, '5 kareden kısa', { size: 24, renk: RENK.vurgu });
    gizle(t5, tk);
    await par(c.say('2 ile 3 art arda 5 kare eder; A ise kestirme oktur.', { speak: 'İki ile üç art arda beş kare eder; a vektörü ise kestirme oktur.' }), (async () => {
      await yatir(c, kx, SX, S1 + 25, 800); await yatir(c, ky, SX + 100, S1 + 25, 800); await belir(c, t5, 250);
      await yatir(c, kopya(A, { kalin: 8 }), SX, S2 + 25, 900); await belir(c, tk, 250);
    })());
    await c.choice({ tag: 'Uygula', q: 'Bir vektörün bileşenleri +x yönünde 4, +y yönünde 1 birim. Bu iki bileşenin bileşkesi nedir?',
      options: ['5 birimlik bir vektör', 'Orijinden 4 sağ, 1 yukarı giden vektörün kendisi', '+x yönünde 4 birimlik vektör'], answer: 1,
      hints: ['Büyüklükleri topladın; bu yalnızca aynı yöndeki vektörlerde olur. Farklı eksenlerdeki bileşenler uç uca eklenir ve eğik vektörü verir.', '', 'Düşey bileşeni attın. 1 birimlik düşey bileşen okun ucunu 1 kare yukarı taşır.'],
      right: 'Evet. Bileşenlerin bileşkesi vektörün kendisidir.' });
    await sol(c, sg, 0.3);
    await c.say('Bileşenler uç uca eklenince vektörün kendisi geri gelir.');
    await c.say('Ayırmak ile toplamak, aynı yolun iki yönüdür.');
    c.note('<b>A = A<sub>x</sub> + A<sub>y</sub></b><br>+x 2 birim ile +y 3 birim uç uca eklenir → 2 sağ, 3 yukarı giden A', 'Bileşenlerin bileşkesi', 'geri');
  }

  /* ---- Sahne 6 · Eksenin üzerindeki ok ---- */
  async function eksenUstu(c) {
    const svg = c.svg(1000, 562), d = duzlem(c, svg, { sutun: 10, satir: 8, x: 120, y: 70 }), { ox, oy } = d;
    const g = c.S('g', {}, svg), YX = 700;
    await c.say('Peki ok zaten bir eksenin üzerindeyse?', { speak: '[curious] Peki ok zaten bir eksenin üzerindeyse?' });
    const C = d.vek(0, 0, 4, 0, { renk: RENK.a, ad: 'C', katman: g }); gizle(C);
    await ciz(c, C, 700);
    await c.say('C vektörü orijinden 4 kare sağa gidiyor; x ekseninin üzerinde.', { speak: 'ce vektörü orijinden dört kare sağa gidiyor; iks ekseninin üzerinde.' });
    await belir(c, c.S('circle', { cx: d.Q(4, 0)[0], cy: oy, r: 7, fill: RENK.vurgu }, g), 300);
    await c.say('Hiç yukarı ya da aşağı gitmiyor.');
    await c.say('Bu yüzden y ekseninde bileşeni yoktur.', { speak: 'Bu yüzden ye ekseninde bileşeni yoktur.' });
    const c1 = myazi(c, g, YX, 150, '~C_{x}: +x, 4 birim', { renk: RENK.a, hiza: 'start' }), c2 = yazi(c, g, YX, 196, 'y bileşeni yok', { size: 26, renk: RENK.a, hiza: 'start' });
    await belir(c, [c1, c2], 300);
    await c.say('C’nin tek bileşeni kendisidir: +x yönünde 4 birim.', { speak: 'ce vektörünün tek bileşeni kendisidir: artı iks yönünde dört birim.' });
    const D = d.vek(0, 0, 0, -3, { renk: RENK.b, ad: 'D', katman: g }); gizle(D);
    await ciz(c, D, 700);
    await c.choice({ tag: 'Uygula', q: 'D vektörü orijinden 3 kare aşağı gidiyor. Hangisi doğrudur?',
      options: ['D<sub>x</sub>: −x yönünde 3 birim', 'D<sub>y</sub>: −y yönünde 3 birim; x bileşeni yok', 'D<sub>x</sub> ve D<sub>y</sub> eşit: 1,5’er birim'], answer: 1,
      hints: ['Aşağı ve yukarı y ekseni üzerindedir. Ok hiç sağa sola gitmediği için x bileşeni yoktur.', '', 'Bileşenler okun yarıları değildir; eksenlerdeki iz düşümleridir. Ok yalnızca aşağı gittiği için tek bileşeni vardır.'],
      right: 'Evet. D’nin tek bileşeni −y yönündedir.' });
    const d1 = myazi(c, g, YX, 380, '~D_{y}: −y, 3 birim', { renk: RENK.b, hiza: 'start' }), d2 = yazi(c, g, YX, 426, 'x bileşeni yok', { size: 26, renk: RENK.b, hiza: 'start' });
    await belir(c, [d1, d2], 300);
    await c.say('Eksen üzerindeki vektörün öteki eksende bileşeni olmaz.');
    await c.say('Şimdi altı vektörün bileşenlerini sen bul.');
    await kaybol(c, g, 400);

    // Dene 1 (eşleştirme): altı vektör, her biri için üç bileşen kartı
    const IP = { eksen: 'Eksenleri karıştırdın. Sağa ve sola gidilen kareler x, yukarı ve aşağı gidilenler y bileşenidir.', yon: 'Yönü denetle: sağ +x, sol −x, yukarı +y, aşağı −y.',
      yari: 'Bileşenler okun yarıları değildir. Ok yalnızca bir eksen boyunca gidiyor; tek bileşeni var.', tek: 'Ok hangi eksenin üzerinde? Sağ ve sol x, yukarı ve aşağı y eksenindedir.' };
    const alti = [
      [3, 2, [['+x 2, +y 3', 'eksen'], ['+x 3, +y 2'], ['−x 3, +y 2', 'yon']], 1],
      [-2, 4, [['−x 2, +y 4'], ['+x 2, +y 4', 'yon'], ['−x 4, +y 2', 'eksen']], 0],
      [-3, -1, [['−x 3, +y 1', 'yon'], ['−x 1, −y 3', 'eksen'], ['−x 3, −y 1']], 2],
      [1, -3, [['+x 1, +y 3', 'yon'], ['+x 1, −y 3'], ['+x 3, −y 1', 'eksen']], 1],
      [-4, 0, [['−x 4, y bileşeni yok'], ['−y 4, x bileşeni yok', 'tek'], ['−x 2, −y 2', 'yari']], 0],
      [0, 2, [['+x 2, y bileşeni yok', 'tek'], ['+x 1, +y 1', 'yari'], ['+y 2, x bileşeni yok']], 2],
    ];
    await c.say('Her vektörün bileşen kartını seç.', { noWait: true });
    for (const [di, dj, sec, dogru] of alti) {
      const gi = c.S('g', {}, svg), v = d.vek(0, 0, di, dj, { renk: RENK.a, katman: gi }); gizle(v);
      const ad = yazi(c, gi, 840, 180, tarif(di, dj), { size: 28, renk: RENK.vurgu });
      await par(belir(c, ad, 250), ciz(c, v, 500));
      let p = null;
      await c.choice({ tag: 'Sıra sende', q: `Ok orijinden <b>${tarif(di, dj)}</b> gidiyor. Bileşenleri hangisi?`, options: sec.map((s) => s[0]), answer: dogru,
        hints: sec.map((s) => (s[1] ? IP[s[1]] : '')), right: 'Doğru: ' + sec[dogru][0] + '.',
        onPick: (i, tamam) => {
          if (!tamam) return;
          p = (async () => {
            const pl = paraleller(c, d, gi, di, dj), bl = bilesenler(c, d, gi, di, dj, RENK.a);
            await pl.ciz(350); await bl.ciz(450);
            const satirlar = sec[dogru][0].split(', ').map((m, k) => yazi(c, gi, 840, 250 + k * 44, m, { size: 28, renk: RENK.a }));
            await belir(c, satirlar, 250);
          })();
        } });
      await p; await c.wait(300); await kaybol(c, gi, 300);
    }

    // Dene 2 (çizim): bileşenleri verilen oku üç aday arasından seç
    const uc = [
      ['+x 4, +y 1', [[1, 4], [4, 1], [4, -1]], 1],
      ['−x 2, −y 3', [[-2, -3], [-3, -2], [2, -3]], 0],
      ['Yalnızca −y 3', [[-3, 0], [0, 3], [0, -3]], 2],
    ];
    await c.say('Bileşenleri verilen oku seç.', { noWait: true });
    for (const [ad, adaylar, dogru] of uc) {
      const gi = c.S('g', {}, svg), ag = c.S('g', {}, gi);
      yazi(c, gi, 840, 180, ad, { size: 28, renk: RENK.vurgu });
      adaylar.forEach(([di, dj], k) => {
        d.vek(0, 0, di, dj, { renk: RENK.soluk, kalin: 5, katman: ag });
        const [tx, ty] = d.Q(di, dj), L = Math.hypot(di, dj), bx = tx + (di / L) * 26, by = ty - (dj / L) * 26;
        daire(c, ag, bx, by, 16, { renk: RENK.soluk, fill: RENK.koyu, kalin: 2 }); yazi(c, ag, bx, by + 8, String(k + 1), { size: 22 });
      });
      gizle(gi); await belir(c, gi, 300);
      const [di, dj] = adaylar[dogru];
      let p = null;
      await c.choice({ tag: 'Sıra sende', q: `Bileşenleri <b>${ad}</b> olan ok hangisi?`, options: ['1', '2', '3'], answer: dogru,
        hints: adaylar.map(([a, b], k) => (k === dogru ? '' : `Bu ok ${tarif(a, b)} gidiyor. Bileşenlerin yönünü ve eksenini yeniden oku.`)), right: `Evet. Ok ${tarif(di, dj)} gidiyor.`,
        onPick: (i, tamam) => {
          if (!tamam) return;
          p = (async () => {
            await kaybol(c, ag, 250);
            const pl = paraleller(c, d, gi, di, dj), bl = bilesenler(c, d, gi, di, dj, RENK.a), v = d.vek(0, 0, di, dj, { renk: RENK.a, katman: gi }); gizle(v);
            await bl.ciz(400); await pl.ciz(300); await ciz(c, v, 500);
            await belir(c, yazi(c, gi, 840, 250, tarif(di, dj), { size: 28, renk: RENK.a }), 250);
          })();
        } });
      await p; await c.wait(300); await kaybol(c, gi, 300);
    }
    const son = c.S('g', {}, svg), sv = d.vek(0, 0, 3, 2, { renk: RENK.a, katman: son });
    const sx = d.vek(0, 0, 3, 0, { renk: RENK.a, kesik: true, kalin: 5, uc: 16, katman: son }), sy = d.vek(3, 0, 0, 2, { renk: RENK.a, kesik: true, kalin: 5, uc: 16, katman: son });
    gizle(sv, sx, sy);
    await ciz(c, sx, 450); await ciz(c, sy, 450);
    await par(c.say('Her ok, bir yatay ve bir düşey okun toplamıdır.'), ciz(c, sv, 800));
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c7', kicker: 'Konu C · Vektörler', title: 'Bir vektörü bileşenlerine ayırmak', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Bir vektörü bileşenlerine ayırmak', hook: 'Satranç tahtasında fil çapraz gider; aynı kareye yalnızca yatay ve düşey adımlarla nasıl varırsın?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Fil ve iki düz yol', goal: 'Eğik bir oku yatay ve düşey iki oka ayır.', run: fil },
      { title: 'Eksenler ve orijin', goal: 'İki ekseni, orijini ve dört yönü tanı.', run: eksenler },
      { title: 'Üç basamak', goal: 'Bir vektörün bileşenlerini üç basamakta bul.', run: basamak },
      { title: 'Bileşenin de yönü var', goal: 'Bileşeni yönüyle birlikte söyle.', run: yon },
      { title: 'Bileşenleri topla, vektör geri gelsin', goal: 'Bileşenlerin bileşkesinin vektörün kendisi olduğunu gör.', run: topla },
      { title: 'Eksenin üzerindeki ok', goal: 'Tek bileşenli vektörü tanı, bileşenleri kendin bul.', run: eksenUstu },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Orijinden çıkan bir vektör 4 kare sola, 2 kare yukarı gidiyor. Bileşenleri nedir?',
        options: ['A<sub>x</sub>: +x yönünde 4, A<sub>y</sub>: +y yönünde 2 birim', 'A<sub>x</sub>: −x yönünde 2, A<sub>y</sub>: +y yönünde 4 birim', 'A<sub>x</sub>: −x yönünde 4, A<sub>y</sub>: +y yönünde 2 birim'], answer: 2,
        why: ['Ok sola gidiyor; yatay bileşen −x yönündedir.', 'Sola gidilen kareler x, yukarı çıkılan kareler y bileşenidir.', 'Sola giden 4 kare −x, yukarı çıkan 2 kare +y yönündeki bileşendir.'], scene: 3 },
      { q: 'A<sub>x</sub> 3 birim, A<sub>y</sub> 4 birim. Vektörün boyu 7 birim midir?',
        options: ['Evet; 3 + 4 = 7 eder', 'Hayır; boyu 4 − 3 = 1 birimdir', 'Hayır; bileşenler uç uca eklenir, vektör kestirme oktur ve 7 birimden kısadır'], answer: 2,
        why: ['Sayıyla toplama yalnızca aynı doğrultuda olur; bileşenler farklı eksenlerdedir.', 'Çıkarma zıt yönlü, aynı doğrultudaki vektörler içindir.', 'Bileşenler uç uca eklenir; vektör baştan sona giden kestirme oktur.'], scene: 4 },
    ],
    summary: ['<b>Her ok, bir yatay ve bir düşey okun toplamıdır.</b>', 'Bileşen, vektörün eksen üzerindeki iz düşümüdür; yönü eksenin artı ya da eksi ucuyla söylenir.', 'Bileşenler uç uca eklenince vektörün kendisi geri gelir; büyüklükleri toplanınca vektörün boyu çıkmaz.'],
    nextLesson: { href: 'c8-bilesenlerle-toplama.html', label: 'Sonraki: Bileşenleri toplayarak bileşke ›' },
  });
})();
