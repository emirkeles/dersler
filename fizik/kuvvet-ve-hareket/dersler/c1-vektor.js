/* C1 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md (## C1)
   Yazar notu: içerik MEB Fizik 9 s. 61, 64, 65, 69, 70 ve 75'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: vektörler RENK.a; halatta sol takım RENK.a, sağ takım RENK.b. "Oku çiz" adımları numaralı aday oklarla sorulur. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, belir, sol, kaybol, par, gizle, ok, okCiz, okGit, yonGulu, izgara, kart, insan } = KIT;

  /* ---- Konu C'nin ortak yardımcıları (C1–C3 dosyalarında aynıdır) ---- */
  /* t yazısının i. harfinin üstüne küçük ok çizer. */
  function ustOk(c, g, t, i, size, renk) {
    const n = t.textContent.length, kucuk = /[a-zçğıöşü]/.test(t.textContent[i]);
    let a = null, b = null;
    try { a = t.getStartPositionOfChar(i).x; b = t.getEndPositionOfChar(i).x; } catch (e) { a = null; }
    if (a == null || !(b > a)) {
      const w = size * 0.6, x = +t.getAttribute('x'), hiza = t.getAttribute('text-anchor');
      a = (hiza === 'middle' ? x - n * w / 2 : hiza === 'end' ? x - n * w : x) + i * w; b = a + w;
    }
    const y = +t.getAttribute('y') - size * (kucuk ? 0.7 : 0.9), m = (a + b) / 2, w = Math.max((b - a) / 2 + 1, size * 0.3), u = size * 0.15;
    return c.S('path', { d: `M ${m - w} ${y} L ${m + w} ${y} M ${m + w - u} ${y - u} L ${m + w} ${y} L ${m + w - u} ${y + u}`, fill: 'none', stroke: renk, 'stroke-width': Math.max(2, size * 0.075), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  }
  /* Üstü oklu harf içeren yazı: ^ işaretinden sonraki harfin üstüne ok konur ('^A = −^D'). Grup döner; g.yazi yazının kendisidir. */
  function vyazi(c, p, x, y, metin, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 28, renk = o.renk || RENK.yazi, idx = [];
    let duz = '';
    for (const ch of metin) { if (ch === '^') idx.push(duz.length); else duz += ch; }
    const t = yazi(c, g, x, y, duz, { size, renk, hiza: o.hiza, kalin: o.kalin });
    g.oklar = idx.map((i) => ustOk(c, g, t, i, size, renk));
    g.yazi = t; return g;
  }
  /* Kareli düzlemdeki oka üstü oklu ad verir; ad okla birlikte taşınır (v.ad). */
  function adla(c, iz, v, ad, o = {}) {
    const g = vyazi(c, iz.g, 0, 0, ad, { size: o.size || 26, renk: o.renk || RENK.a }), yer = {};
    v.etiket = { setAttribute: (k, d) => { yer[k] = d; g.setAttribute('transform', `translate(${yer.x || 0} ${yer.y || 0})`); } };
    v.ad = g; v.koy(v.i, v.j);
    return g;
  }
  const hepsi = (vs) => [vs].flat().flatMap((v) => (v.ad ? [v, v.ad] : [v]));
  const ciz = (c, v, ms = 500) => { v.style.opacity = ''; return par(okCiz(c, v, ms), v.ad ? belir(c, v.ad, ms) : []); };
  const mat = (c, vs, hedef = 0.3, ms = 300) => sol(c, hepsi(vs), hedef, ms);
  const sessiz = (p) => { p.catch(() => {}); };

  /* Düz pist: kulvarlar alt alta, çizgiler 50 m arayla. x(m) çizginin, y(k) kulvar ortasının yeri. */
  function pist(c, p, kulvarlar, o = {}) {
    const g = c.S('g', {}, p), x0 = o.x0 || 210, x1 = o.x1 || 840, y0 = o.y || 78, h = o.h || 52, n = kulvarlar.length;
    const x = (m) => x0 + (x1 - x0) * m / 200, y = (k) => y0 + h * (k + 0.5);
    kutu(c, g, x0 - 16, y0, x1 - x0 + 32, n * h, { renk: RENK.cizgi, kalin: 2, rx: 4 });
    for (let k = 1; k < n; k++) cizgi(c, g, x0 - 16, y0 + k * h, x1 + 16, y0 + k * h, { renk: RENK.ince, kalin: 2 });
    [0, 50, 100, 150, 200].forEach((m) => {
      cizgi(c, g, x(m), y0, x(m), y0 + n * h, { renk: RENK.cizgi, kalin: 2 });
      yazi(c, g, x(m), y0 - 16, m === 200 ? '200 m' : String(m), { size: 24, renk: RENK.soluk, kalin: 500 });
    });
    kulvarlar.forEach(([no, ad], k) => { yazi(c, g, 44, y(k) + 8, no, { size: 24, renk: RENK.soluk }); yazi(c, g, 76, y(k) + 8, ad, { size: 24, hiza: 'start' }); });
    const okKat = c.S('g', {}, g), noktaKat = c.S('g', {}, g);
    const noktalar = (k, m1, m2) => {
      const ng = c.S('g', {}, noktaKat);
      c.S('circle', { cx: x(m1), cy: y(k), r: 8, fill: RENK.vurgu }, ng);
      c.S('circle', { cx: x(m2), cy: y(k), r: 8, fill: RENK.koyu, stroke: RENK.vurgu, 'stroke-width': 3 }, ng);
      return ng;
    };
    const kosu = (k, m1, m2) => ok(c, okKat, x(m1), y(k), x(m2) - Math.sign(m2 - m1) * 9, y(k), { renk: RENK.a, kalin: 6 });
    return { g, x, y, noktalar, kosu, alt: y0 + n * h };
  }

  /* Yön–büyüklük tablosu. Satırlar boş durur; ac(k) satırı yazar ve satır tahtada kalır; vurgula([k, …]) satırları çerçeveler.
     Kullanıcı kararı: bu tabloda satırlar yan yana görülsün diye tahtadaki 25 kelime sınırı aşılabilir. */
  function kayit(c, p, veriler, o = {}) {
    const x = o.x || 620, y = o.y || 24, w = o.w || [90, 110, 160], sy = o.sy || 46, size = 24, W = w[0] + w[1] + w[2];
    const g = c.S('g', {}, p), xs = [x, x + w[0], x + w[0] + w[1]];
    ['Vektör', 'Yönü', 'Büyüklüğü'].forEach((ad, i) => yazi(c, g, xs[i] + w[i] / 2, y + sy * 0.7, ad, { size, renk: RENK.soluk }));
    cizgi(c, g, x, y + sy, x + W, y + sy, { kalin: 2 });
    const satirlar = veriler.map(([ad, yon, boy], k) => {
      const yy = y + sy * (k + 1), sg = c.S('g', {}, g);
      cizgi(c, g, x, yy + sy, x + W, yy + sy, { renk: RENK.ince, kalin: 1.5 });
      vyazi(c, sg, xs[0] + w[0] / 2, yy + sy * 0.74, '^' + ad, { size, renk: RENK.a });
      yazi(c, sg, xs[1] + w[1] / 2, yy + sy * 0.74, yon, { size });
      yazi(c, sg, xs[2] + w[2] / 2, yy + sy * 0.74, boy + ' birim', { size });
      const cerceve = c.S('rect', { x: x - 6, y: yy + 4, width: W + 12, height: sy - 8, rx: 8, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, g);
      gizle(sg, cerceve);
      return { sg, cerceve };
    });
    const ac = (k, ms = 350) => belir(c, satirlar[k].sg, ms);
    const vurgula = (ks) => satirlar.forEach((s, k) => { s.cerceve.style.opacity = ks.includes(k) ? 1 : 0; });
    return { g, ac, vurgula };
  }

  /* Halat çekme: (cx, y) düğümün yeri; iki yanda üçer kişi. */
  function halat(c, p, cx, y, s = 1.3) {
    const g = c.S('g', {}, p), yer = y + 52 * s;
    cizgi(c, g, cx - 420, yer, cx + 420, yer, { renk: RENK.ince, kalin: 3 });
    cizgi(c, g, cx - 380, y, cx + 380, y, { renk: '#c9b28a', kalin: 5 });
    [-1, 1].forEach((yan) => [0, 1, 2].forEach((k) => {
      const x = cx + yan * (190 + k * 80);
      insan(c, g, x, yer, { s, kol: -yan, renk: yan < 0 ? RENK.a : RENK.b }).setAttribute('transform', `rotate(${yan * 10} ${x} ${yer})`);
    }));
    c.S('rect', { x: cx - 9, y: y - 14, width: 18, height: 28, rx: 4, fill: RENK.vurgu }, g);
    return g;
  }

  /* ---- Sahne 1 · Çekişi kâğıda çizmek ---- */
  async function cekis(c) {
    const svg = c.svg(1000, 562), on = c.S('g', {}, svg);
    const k1 = kart(c, on, 110, 210, 340, 140, ['kütle', 'sayı + birim'], { size: 30 });
    const k2 = kart(c, on, 550, 210, 340, 140, ['kuvvet, hız', 'sayı + birim + yön'], { renk: RENK.vurgu, size: 30 });
    const a1 = yazi(c, on, 280, 185, 'skaler', { size: 28, renk: RENK.soluk }), a2 = yazi(c, on, 720, 185, 'vektörel nicelik', { size: 28, renk: RENK.vurgu });
    gizle(k1, k2, a1, a2);
    await belir(c, [k1, a1]);
    await c.say('Kütle gibi skaler nicelikler bir sayı ve bir birimle anlatılır.');
    await belir(c, k2);
    await c.say('Kuvvet ve hız ise sayı ve birimin yanında yön de ister.');
    await par(belir(c, a2), sol(c, [k1, a1], 0.35));
    await c.say('Yön isteyen bu niceliklere <b>vektörel nicelik</b> denir.');
    await kaybol(c, on);

    const h = halat(c, svg, 500, 280); gizle(h);
    await belir(c, h, 500);
    await c.say('Halat çekmede iki takım aynı ipi iki ayrı yana çeker.');
    await c.say('Her çekiş bir kuvvettir; yani yönü olan bir niceliktir.');
    const sayi = yazi(c, svg, 500, 200, '400 N', { size: 40, renk: RENK.vurgu }), soru = yazi(c, svg, 590, 200, '?', { size: 40 });
    gizle(sayi, soru);
    await belir(c, [sayi, soru]);
    await c.say('Yalnızca “400 N” yazmak, çekişin hangi yana olduğunu söylemez.', { speak: '[thoughtful] Yalnızca dört yüz newton yazmak, çekişin hangi yana olduğunu söylemez.' });
    const ornek = ok(c, svg, 380, 455, 620, 455, { renk: RENK.yazi, kalin: 6 });
    await okCiz(c, ornek, 700);
    await c.say('Vektörel nicelikler yönlü bir doğru parçasıyla, yani bir okla gösterilir.');
    const ornekAd = yazi(c, svg, 500, 506, 'vektör', { size: 30, renk: RENK.vurgu }); gizle(ornekAd);
    await belir(c, ornekAd);
    await c.say('Bu oka kısaca <b>vektör</b> denir.');
    await c.choice({ tag: 'Uygula', q: 'İki takımın çekişini kâğıda nasıl çizersin?',
      options: ['İki ayrı sayı yazarak', 'Düğümden iki ayrı yana bakan iki okla', 'Aynı yana bakan iki okla'], answer: 1,
      hints: ['Sayı çekişin ne kadar olduğunu söyler, hangi yana olduğunu söylemez. Yönü gösterebilen çizim oktur.', '', 'Takımlar ipi ters yanlara çekiyor; oklar da ters yanları göstermeli.'],
      right: 'Evet. Her çekiş için bir ok, ikisi ayrı yanlara.' });
    await par(kaybol(c, [soru, ornek, ornekAd]), sol(c, sayi, 0.25));
    const solOk = ok(c, svg, 500, 280, 350, 280, { renk: RENK.a, kalin: 9, uc: 24 }), sagOk = ok(c, svg, 500, 280, 650, 280, { renk: RENK.b, kalin: 9, uc: 24 });
    await par(okCiz(c, solOk, 700), okCiz(c, sagOk, 700));
    await c.say('Bir ok sol takımın, öteki ok sağ takımın çekişini gösterir.');
    await c.say('Okun ucu çekişin yönünü, boyu çekişin büyüklüğünü anlatacak.');
  }

  /* ---- Sahne 2 · Okun parçaları ---- */
  async function parcalar(c) {
    const svg = c.svg(1000, 562), Y = 230, XA = 300, XB = 700;
    const d = cizgi(c, svg, 60, Y, 60, Y, { renk: RENK.soluk, kalin: 2, kesik: true }), dAd = yazi(c, svg, 925, Y + 9, 'd', { size: 28, renk: RENK.soluk });
    const v = ok(c, svg, XA, Y, XB, Y, { renk: RENK.a, kalin: 8, uc: 24 });
    const nA = c.S('circle', { cx: XA, cy: Y, r: 8, fill: RENK.vurgu }, svg), nB = c.S('circle', { cx: XB, cy: Y, r: 8, fill: RENK.vurgu }, svg);
    const hA = yazi(c, svg, XA, Y + 50, 'A', { size: 32 }), hB = yazi(c, svg, XB, Y + 50, 'B', { size: 32 });
    const bas = yazi(c, svg, XA, Y + 88, 'başlangıç noktası', { size: 24, renk: RENK.vurgu }), bit = yazi(c, svg, XB, Y + 88, 'bitiş noktası', { size: 24, renk: RENK.vurgu });
    const yon = yazi(c, svg, XB, Y - 30, 'yön', { size: 26, renk: RENK.vurgu });
    const olcu = c.S('g', {}, svg);
    cizgi(c, olcu, XA, Y - 86, XB, Y - 86, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, XA, Y - 96, XA, Y - 76, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, XB, Y - 96, XB, Y - 76, { renk: RENK.vurgu, kalin: 2 });
    yazi(c, olcu, 500, Y - 100, 'büyüklük', { size: 26, renk: RENK.vurgu });
    const K = vyazi(c, svg, 500, Y - 18, '^K', { size: 36, renk: RENK.a });
    gizle(dAd, v, nA, nB, hA, hB, bas, bit, yon, olcu, K.yazi, K.oklar[0]);
    await par(c.tween(600, (e) => d.setAttribute('x2', 60 + 840 * e)), belir(c, dAd, 600));
    await belir(c, [nA, nB], 250);
    await ciz(c, v, 800);
    await c.say('Bir vektör bir noktada başlar, başka bir noktada biter.');
    await belir(c, [hA, hB, bas, bit]);
    await c.say('Bu vektörün başlangıç noktası A, bitiş noktası B.', { speak: 'Bu vektörün başlangıç noktası a, bitiş noktası be.' });
    await par(belir(c, yon), okCiz(c, v, 700));
    await c.say('Okun ucu B’yi gösteriyor: vektörün yönü A’dan B’ye doğrudur.', { speak: 'Okun ucu be noktasını gösteriyor: vektörün yönü a noktasından be noktasına doğrudur.' });
    await belir(c, olcu);
    await c.say('Okun boyu vektörün büyüklüğüdür; büyüklük, niceliğin sayı değeridir.');
    await belir(c, K.yazi);
    await par(c.say('Vektöre bir harf verilir; harfin üstüne küçük bir ok çizilir.'), (async () => { await c.wait(1600); await belir(c, K.oklar[0], 500); })());
    await c.say('Harfin üstündeki ok, niceliğin vektörel olduğunu belirtir.');
    await kaybol(c, [bas, bit, yon, olcu]);
    const b1 = yazi(c, svg, 330, 400, 'vektör', { size: 24, renk: RENK.soluk }), b2 = yazi(c, svg, 620, 400, 'büyüklüğü', { size: 24, renk: RENK.soluk });
    const F = vyazi(c, svg, 330, 458, '^F', { size: 40, renk: RENK.a }), hv = vyazi(c, svg, 330, 526, '^v', { size: 40, renk: RENK.a });
    const Fb = yazi(c, svg, 620, 458, 'F = 30 N', { size: 36 }), vb = yazi(c, svg, 620, 526, 'v = 20 m/s', { size: 36 });
    gizle(b1, b2, F, hv, Fb, vb);
    await belir(c, [b1, F, hv]);
    await c.say('Kuvvet vektörü üstü oklu F, hız vektörü üstü oklu v ile gösterilir.', { speak: 'Kuvvet vektörü üstü oklu fe, hız vektörü üstü oklu ve ile gösterilir.' });
    await belir(c, b2);
    await c.say('Büyüklük yazılırken harfin üstüne ok konmaz.');
    await belir(c, Fb);
    await c.say('Bir kuvvet vektörünün büyüklüğü F = 30 N diye yazılır.', { speak: 'Bir kuvvet vektörünün büyüklüğü fe eşittir otuz newton diye yazılır.' });
    await belir(c, vb);
    await c.say('Bir hız vektörünün büyüklüğü v = 20 m/s diye yazılır.', { speak: 'Bir hız vektörünün büyüklüğü ve eşittir yirmi metre bölü saniye diye yazılır.' });
    await c.choice({ tag: 'Uygula', q: 'Bir rüzgâr için “v = 15 m/s” yazılmış. Bu yazı rüzgârın hızıyla ilgili neyi verir?',
      options: ['Büyüklüğünü ve yönünü', 'Yalnızca büyüklüğünü', 'Yalnızca yönünü'], answer: 1,
      hints: ['Oksuz harf yalnızca büyüklüğü verir. Yön için okun kendisi ya da “kuzeye” gibi bir yön bilgisi gerekir.', '', '15 m/s bir sayı ve bir birimdir; yön bilgisi taşımaz.'],
      right: 'Evet. Harfin üstünde ok yok; yazı yalnızca büyüklüğü verir.' });
    await c.say('Oksuz harf yalnızca büyüklüğü söyler; yönü çizilen ok gösterir.', { speak: 'Oksuz harf yalnızca büyüklüğü söyler; [short pause] yönü çizilen ok gösterir.' });
    c.note('<b>Vektör yönlü doğru parçasıdır: ucu yönü, boyu büyüklüğü gösterir.</b><br>F = 30 N bir kuvvetin büyüklüğüdür.', 'Vektör', 'c1-vektor');
  }

  /* ---- Sahne 3 · Bir doğrultu, iki yön ---- */
  async function dogrultu(c) {
    const svg = c.svg(1000, 562), CX = 500, Y = 300;
    const gul = c.S('g', {}, svg), GX = 135, GY = 120, R = 38;
    ok(c, gul, GX, GY + R, GX, GY - R, { renk: RENK.soluk, kalin: 3, uc: 10 }); ok(c, gul, GX - R, GY, GX + R, GY, { renk: RENK.soluk, kalin: 3, uc: 10 });
    yazi(c, gul, GX, GY - R - 10, 'kuzey', { size: 22, renk: RENK.soluk }); yazi(c, gul, GX, GY + R + 28, 'güney', { size: 22, renk: RENK.soluk });
    yazi(c, gul, GX + R + 10, GY + 8, 'doğu', { size: 22, renk: RENK.soluk, hiza: 'start' }); yazi(c, gul, GX - R - 10, GY + 8, 'batı', { size: 22, renk: RENK.soluk, hiza: 'end' });
    const yatay = cizgi(c, svg, 40, Y, 40, Y, { renk: RENK.soluk, kalin: 2, kesik: true });
    const h = halat(c, svg, CX, Y, 1.2);
    const dbAd = yazi(c, svg, 955, Y + 104, 'doğu–batı doğrultusu', { size: 24, renk: RENK.vurgu, hiza: 'end' });
    const dogu = ok(c, svg, CX, Y, CX + 150, Y, { renk: RENK.b, kalin: 9, uc: 24 }), bati = ok(c, svg, CX, Y, CX - 150, Y, { renk: RENK.a, kalin: 9, uc: 24 });
    const doguAd = yazi(c, svg, CX + 88, Y - 30, 'doğu yönü', { size: 24, renk: RENK.b }), batiAd = yazi(c, svg, CX - 88, Y - 30, 'batı yönü', { size: 24, renk: RENK.a });
    gizle(gul, h, dbAd, dogu, bati, doguAd, batiAd);
    await belir(c, h, 500);
    await c.say('Gergin halat düz bir çizgi boyunca uzanır.');
    await c.tween(700, (e) => yatay.setAttribute('x2', 40 + 920 * e));
    await c.say('Okun üzerinde durduğu doğruya <b>doğrultu</b> denir.');
    await belir(c, [gul, dbAd]);
    await c.say('İp doğu–batı doğrultusunda uzanıyor olsun.');
    await par(ciz(c, dogu, 600), ciz(c, bati, 600), belir(c, [doguAd, batiAd], 600));
    await c.say('Bu doğrultuda iki yön vardır: doğu yönü ve batı yönü.');
    await par(okCiz(c, dogu, 700), okCiz(c, bati, 700));
    await c.say('Sağdaki takım ipi doğuya, soldaki takım batıya çekiyor.');
    await c.say('İki çekiş aynı doğrultudadır ama yönleri farklıdır.');
    await par(sol(c, [h, dogu, bati, yatay], 0.2), kaybol(c, [doguAd, batiAd]));
    const dusey = cizgi(c, svg, CX, 540, CX, 540, { renk: RENK.soluk, kalin: 2, kesik: true });
    const kgAd = yazi(c, svg, CX + 22, 62, 'kuzey–güney doğrultusu', { size: 24, renk: RENK.vurgu, hiza: 'start' });
    const kuzey = ok(c, svg, CX, Y, CX, Y - 140, { renk: RENK.a, kalin: 9, uc: 24 }), guney = ok(c, svg, CX, Y, CX, Y + 140, { renk: RENK.b, kalin: 9, uc: 24 });
    const kuzeyAd = yazi(c, svg, CX + 22, Y - 120, 'kuzey yönü', { size: 24, renk: RENK.a, hiza: 'start' }), guneyAd = yazi(c, svg, CX + 22, Y + 150, 'güney yönü', { size: 24, renk: RENK.b, hiza: 'start' });
    gizle(kgAd, kuzey, guney, kuzeyAd, guneyAd);
    await par(c.tween(700, (e) => dusey.setAttribute('y2', 540 - 510 * e)), belir(c, kgAd, 600));
    await par(ciz(c, kuzey, 600), ciz(c, guney, 600), belir(c, [kuzeyAd, guneyAd], 600));
    await c.say('Kuzey–güney doğrultusunda da iki yön vardır: kuzey ve güney.');
    await c.say('Doğrultu bir doğrudur; yön, o doğru üzerinde okun baktığı yandır.', { speak: '[thoughtful] Doğrultu bir doğrudur; yön, o doğru üzerinde okun baktığı yandır.' });
    await c.choice({ tag: 'Uygula', q: 'Bir tren kuzeye gidiyor; yan raydaki tren güneye gidiyor. İki hız vektörü için hangisi doğrudur?',
      options: ['Doğrultuları da yönleri de aynı', 'Doğrultuları farklı, yönleri aynı', 'Doğrultuları aynı, yönleri farklı'], answer: 2,
      hints: ['Raylar aynı doğru boyunca uzanır, bu yüzden doğrultu aynıdır. Ama trenlerden biri kuzeye, öteki güneye bakar; yönler farklıdır.',
        'Doğrultu ile yön aynı şey değildir. İki ok da kuzey–güney doğrusu üzerindedir; farklı olan okların baktığı yandır.', ''],
      right: 'Evet. Tek doğrultu, iki ayrı yön.' });
    // İki tren: yan yana iki ray, biri kuzeye biri güneye.
    await kaybol(c, [h, dogu, bati, yatay, dbAd, kuzeyAd, guneyAd]);
    const ray2 = cizgi(c, svg, CX - 110, 30, CX - 110, 540, { renk: RENK.soluk, kalin: 2, kesik: true });
    const tren = (x, y, renk) => kutu(c, svg, x - 20, y - 36, 40, 72, { renk, rx: 8, kalin: 3 });
    const t1 = tren(CX, Y + 80, RENK.a), t2 = tren(CX - 110, Y - 80, RENK.b);
    gizle(ray2, t1, t2);
    await par(belir(c, [ray2, t1, t2]), okGit(c, kuzey, CX, Y + 40, CX, Y - 100), okGit(c, guney, CX - 110, Y - 40, CX - 110, Y + 100));
    await c.say('İki tren de kuzey–güney doğrultusunda gidiyor.');
    await par(okCiz(c, kuzey, 700), okCiz(c, guney, 700));
    await c.say('Biri kuzeye, öteki güneye baktığı için yönleri farklı.');
    c.note('<b>Bir doğrultuda iki yön vardır.</b><br>doğu–batı doğrultusu → doğu yönü, batı yönü', 'Doğrultu ve yön', 'c1-dogrultu');
  }

  /* ---- Sahne 4 · Büyüklüğü kareden oku ---- */
  async function kareler(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 70, sutun: 10, satir: 5, x: 150, y: 76 }), alt = c.S('g', {}, iz.g);
    const gul = yonGulu(c, svg, 76, 136, { r: 26 });
    const [bx, by] = iz.P(0, 0);
    const ayrac = c.S('g', {}, svg);
    cizgi(c, ayrac, bx, by + 16, bx + 70, by + 16, { renk: RENK.vurgu, kalin: 3 }); cizgi(c, ayrac, bx, by + 8, bx, by + 24, { renk: RENK.vurgu, kalin: 3 }); cizgi(c, ayrac, bx + 70, by + 8, bx + 70, by + 24, { renk: RENK.vurgu, kalin: 3 });
    const birim = yazi(c, svg, bx + 84, by + 25, '1 birim', { size: 26, renk: RENK.vurgu, hiza: 'start' });
    gizle(iz.g, gul, ayrac, birim);
    const A = iz.vektor(2, 4, -2, 0, { yan: 1 }), B = iz.vektor(3, 4, 4, 0);
    adla(c, iz, A, '^A'); adla(c, iz, B, '^B'); gizle(hepsi([A, B]));
    /* Okun altındaki kareleri sırayla yakar ve sayar. */
    const say = async (v) => {
      const g = c.S('g', {}, alt), n = Math.abs(v.di), yon = Math.sign(v.di);
      for (let k = 0; k < n; k++) {
        const [x, y] = iz.P(yon > 0 ? v.i + k : v.i - k - 1, v.j);
        const r = c.S('rect', { x: x + 3, y: y + 3, width: 64, height: 64, rx: 6, fill: RENK.a, 'fill-opacity': 0.28 }, g), t = yazi(c, g, x + 35, y + 45, String(k + 1), { size: 28 });
        gizle(r, t); await belir(c, [r, t], 260); await c.wait(160);
      }
      return g;
    };
    const sonuc = (v, metin) => { const [x, y] = iz.P(v.i + v.di / 2, v.j - 1); const t = yazi(c, svg, x, y + 42, metin, { size: 26, renk: RENK.vurgu }); gizle(t); return t; };
    await belir(c, [iz.g, gul], 500);
    await belir(c, [ayrac, birim]);
    await c.say('Vektörleri kareli düzlemde çizeriz; her karenin kenarı 1 birimdir.', { speak: 'Vektörleri kareli düzlemde çizeriz; her karenin kenarı bir birimdir.' });
    await c.say('Okun boyu kaç kare tutuyorsa büyüklüğü o kadar birimdir.');
    await ciz(c, A, 600);
    const sA = await say(A);
    await c.say('A oku 2 kare boyunca batıya uzanıyor.', { speak: 'a vektörünün oku iki kare boyunca batıya uzanıyor.' });
    const rA = sonuc(A, 'batı, 2 birim'); await belir(c, rA);
    await c.say('A vektörü batı yönünde, büyüklüğü 2 birim.', { speak: 'a vektörü batı yönünde, büyüklüğü iki birim.' });
    await ciz(c, B, 700);
    const sB = await say(B);
    await c.say('B oku 4 kare boyunca doğuya uzanıyor.', { speak: 'Be oku dört kare boyunca doğuya uzanıyor.' });
    const rB = sonuc(B, 'doğu, 4 birim'); await belir(c, rB);
    await c.say('B vektörü doğu yönünde, büyüklüğü 4 birim.', { speak: 'Be vektörü doğu yönünde, büyüklüğü dört birim.' });
    await kaybol(c, [...hepsi([A, B]), sA, sB, rA, rB, birim]);
    await c.say('Bir birimin neye karşılık geldiğini <b>ölçek</b> söyler.', { speak: 'Bir birimin neye karşılık geldiğini [short pause] ölçek söyler.' });
    // Koli: 1 kare = 10 N
    const olcek = yazi(c, svg, bx + 84, by + 25, '1 kare = 10 N', { size: 26, renk: RENK.vurgu, hiza: 'start' });
    const koli = c.S('g', {}, iz.g), [kx, ky] = iz.P(6, 4.7);
    kutu(c, koli, kx, ky, 168, 238, { renk: '#c9a36b', fill: '#4a3a24', rx: 6 }); cizgi(c, koli, kx + 84, ky, kx + 84, ky + 238, { renk: '#c9a36b', kalin: 2 });
    const kuvvet = (i, j, n, ad) => {
      const v = iz.vektor(i, j, n, 0), [x, y] = iz.P(i, j);
      v.ad = yazi(c, iz.g, x - 14, y + 9, ad, { size: 26, renk: RENK.a, hiza: 'end' });
      gizle(v, v.ad); return v;
    };
    const f20 = kuvvet(4, 4, 2, '20 N'), f10 = kuvvet(5, 3, 1, '10 N'), f30 = kuvvet(3, 2, 3, '30 N');
    gizle(olcek, koli);
    await belir(c, [koli, olcek]);
    await c.say('Bir koliyi iten kuvvetleri çizelim; ölçek 1 kare = 10 N olsun.', { speak: 'Bir koliyi iten kuvvetleri çizelim; ölçek bir kare eşittir on newton olsun.' });
    await ciz(c, f20, 600); await ciz(c, f10, 500);
    await c.say('2 karelik ok 20 N’lık, 1 karelik ok 10 N’lık kuvveti gösterir.', { speak: 'İki karelik ok yirmi newtonluk, bir karelik ok on newtonluk kuvveti gösterir.' });
    await c.choice({ tag: 'Uygula', q: 'Aynı ölçekle 30 N’lık bir kuvvet kaç karelik okla çizilir?', options: ['3 kare', '30 kare', '1 kare'], answer: 0,
      hints: ['', 'Her kare 10 N’dır; 30 N için 3 kare yeter.', '1 kare 10 N’ı gösterir; 30 N bunun üç katıdır.'],
      right: 'Evet. 3 × 10 N = 30 N.' });
    await ciz(c, f30, 800);
    await c.say('Her kare 10 N olduğu için 30 N’lık ok 3 kare tutar.', { speak: 'Her kare on newton olduğu için otuz newtonluk ok üç kare tutar.' });
    await c.say('Koliye çizilen üç okun boyları birbirinden farklı.');
    await c.choice({ tag: 'Düşün', q: 'Koliye çizilen oklardan en uzunu neyi anlatır?',
      options: ['Kuvveti uygulayanın daha uzakta durduğunu', 'Kolinin daha uzağa gideceğini', 'Kuvvetin daha büyük olduğunu'], answer: 2,
      hints: ['Okun boyu bir uzaklık değildir, niceliğin büyüklüğüdür. Uzun ok daha büyük kuvveti gösterir.', 'Ok kolinin gideceği yolu çizmez; kuvvetin yönünü ve büyüklüğünü gösterir.', ''],
      right: 'Evet. Uzun ok, büyük kuvvet demektir.' });
    await par(mat(c, [f20, f10], 0.35), okCiz(c, f30, 700));
    await c.say('Okun boyu bir uzaklık değil, niceliğin büyüklüğüdür.', { speak: '[thoughtful] Okun boyu bir uzaklık değil, niceliğin büyüklüğüdür.' });
    c.note('<b>Okun boyu büyüklüktür: kare sayısı × ölçek.</b><br>1 kare = 10 N ise 2 kare 20 N', 'Ölçek', 'c1-olcek');
  }

  /* ---- Sahne 5 · Yön ve büyüklük tablosu ---- */
  async function tabloSahne(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 56, sutun: 10, satir: 5, x: 30, y: 64 });
    yonGulu(c, svg, 110, 450, { r: 28 });
    // [ad, i, j, di, dj, etiket yanı]; sıra tablodaki satır sırasıdır.
    const T = [['A', 2, 4, -2, 0, 1], ['B', 3, 4, 4, 0, -1], ['C', 3, 2, -2, 0, 1], ['D', 4, 2, 2, 0, -1], ['E', 1, 1, 4, 0, 1],
      ['Ç', 7, 1, 0, 2, -1], ['F', 8, 0, 0, 2, 1], ['G', 8, 5, 0, -2, -1], ['H', 9, 0, 0, 4, 1]];
    const yonAd = (di, dj) => (di < 0 ? 'batı' : di > 0 ? 'doğu' : dj > 0 ? 'kuzey' : 'güney');
    const V = {}, sira = {};
    T.forEach(([ad, i, j, di, dj, yan], k) => { const v = iz.vektor(i, j, di, dj, { yan }); adla(c, iz, v, '^' + ad); gizle(hepsi(v)); V[ad] = v; sira[ad] = k; });
    const tum = Object.values(V);
    const tb = kayit(c, svg, T.map(([ad, , , di, dj]) => [ad, yonAd(di, dj), Math.abs(di) + Math.abs(dj)]));
    gizle(tb.g);
    const odak = (adlar) => par(tum.map((v) => mat(c, v, adlar.includes(T[tum.indexOf(v)][0]) ? 1 : 0.3, 250)));
    const herkes = T.map((t) => t[0]);
    await par(c.say('Kareli düzlemde dokuz vektör var.'), (async () => { for (const v of tum) await ciz(c, v, 240); })());
    await par(c.say('Beşi doğu–batı doğrultusunda, dördü kuzey–güney doğrultusunda.'),
      (async () => { await odak(['A', 'B', 'C', 'D', 'E']); await c.wait(1500); await odak(['Ç', 'F', 'G', 'H']); await c.wait(1500); await odak(herkes); })());
    await belir(c, tb.g);
    await c.say('Her birinin yönünü ve büyüklüğünü bir tabloya kaydedeceğiz.');
    await odak(['A']); tb.vurgula([sira.A]); await tb.ac(sira.A);
    await c.say('A satırına “batı” ve “2 birim” yazarız.', { speak: 'a vektörünün satırına batı ve iki birim yazarız.' });
    await odak(['B']); tb.vurgula([sira.B]); await tb.ac(sira.B);
    await c.say('B satırına “doğu” ve “4 birim” yazarız.', { speak: 'Be satırına doğu ve dört birim yazarız.' });
    await odak(['H']); await okCiz(c, V.H, 700);
    await c.say('H oku 4 kare boyunca kuzeye uzanıyor.', { speak: 'He oku dört kare boyunca kuzeye uzanıyor.' });
    tb.vurgula([sira.H]); await tb.ac(sira.H);
    await c.say('H satırına “kuzey” ve “4 birim” yazarız.', { speak: 'He satırına kuzey ve dört birim yazarız.' });
    const sorular = [['D', ['doğu, 2 birim', 'batı, 2 birim', 'doğu, 4 birim'], 0], ['E', ['doğu, 2 birim', 'doğu, 4 birim', 'batı, 4 birim'], 1],
      ['F', ['doğu, 2 birim', 'güney, 2 birim', 'kuzey, 2 birim'], 2], ['Ç', ['kuzey, 2 birim', 'kuzey, 4 birim', 'güney, 2 birim'], 0],
      ['G', ['kuzey, 2 birim', 'güney, 2 birim', 'güney, 4 birim'], 1], ['C', ['doğu, 2 birim', 'batı, 4 birim', 'batı, 2 birim'], 2]];
    await c.say('Kalan altı vektörü tabloya sen kaydet.', { noWait: true });
    for (const [ad, sec, dogru] of sorular) {
      await odak([ad]); tb.vurgula([]);
      const yon = sec[dogru].split(',')[0];
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> vektörünün yönü ve büyüklüğü hangisidir?`, options: sec, answer: dogru,
        hints: sec.map((s) => (s.split(',')[0] !== yon ? 'Okun ucu hangi yana bakıyor? Yön gülüne bak.' : 'Yön doğru. Okun boyunca kareleri bir daha say.')),
        right: ad === 'C' ? 'Evet. A ile aynı satır; yalnızca okun yeri farklı.' : `Evet. ${ad}: ${sec[dogru]}.`,
        onPick: (i, ok2) => { if (ok2) { tb.vurgula([sira[ad]]); sessiz(tb.ac(sira[ad])); } } });
    }
    tb.vurgula([]); await odak(herkes);
    await c.say('Tablo doldu: dokuz vektörün yönü ve büyüklüğü kayıtlı.');
    await odak(['B', 'E']); tb.vurgula([sira.B, sira.E]);
    await c.say('B üst sırada, E en alt sırada çizili.', { speak: 'Be vektörü üst sırada, e vektörü en alt sırada çizili.' });
    await c.choice({ tag: 'Düşün', q: 'Tabloya göre B ile E vektörleri için hangisi doğrudur?',
      options: ['Yönleri de büyüklükleri de aynıdır', 'Yerleri farklı olduğu için yönleri de farklıdır', 'Üstte çizilen B daha büyüktür'], answer: 0,
      hints: ['', 'Yön, okun ucunun baktığı yandır; iki ok da doğuya bakar. Okun hangi sırada çizildiği yönünü değiştirmez.',
        'Büyüklük okun boyudur; iki ok da 4 kare tutar. Yukarıda ya da aşağıda durmak büyüklüğü değiştirmez.'],
      right: 'Evet. İki satır birbirinin aynısı.' });
    await c.say('B ile E’nin satırları aynı: doğu, 4 birim.', { speak: 'Be vektörüyle e vektörünün satırları aynı: doğu, dört birim.' });
    await odak(['A', 'C']); tb.vurgula([sira.A, sira.C]);
    await c.say('A ile C’nin satırları da aynı: batı, 2 birim.', { speak: 'a vektörüyle ce vektörünün satırları da aynı: batı, iki birim.' });
    tb.vurgula([]); await odak(herkes);
    await c.say('Okun düzlemde nerede çizildiği yönünü de büyüklüğünü de değiştirmez.', { speak: '[thoughtful] Okun düzlemde nerede çizildiği yönünü de büyüklüğünü de değiştirmez.' });
    c.note('<b>Bir vektör için iki şey kaydedilir: yönü ve büyüklüğü.</b><br>A batı 2 · B doğu 4 · C batı 2 · D doğu 2', 'Yön ve büyüklük', 'c1-tablo');
  }

  /* ---- Sahne 6 · Pistte vektörler ---- */
  async function pistSahne(c) {
    const svg = c.svg(1000, 562);
    const p = pist(c, svg, [['I', 'Cihan'], ['II', 'Sudem'], ['III', 'Hülya'], ['IV', 'Birol'], ['V', 'Şule']]);
    const gul = yonGulu(c, svg, 930, 140, { r: 26 });
    const kosular = [[0, 50], [0, 200], [200, 100], [200, 50], [150, 50]];
    const nk = kosular.map(([a, b], k) => { const n = p.noktalar(k, a, b); gizle(n); return n; });
    const oklar = kosular.map(([a, b], k) => { const o = p.kosu(k, a, b); gizle(o); return o; });
    const okuma = yazi(c, svg, 525, 430, '', { size: 32, renk: RENK.vurgu });
    const oku = async (metin) => { okuma.style.opacity = 0; okuma.textContent = metin; if (metin) await belir(c, okuma, 300); };
    const aralik = c.S('g', {}, svg);
    cizgi(c, aralik, p.x(0), p.alt + 22, p.x(50), p.alt + 22, { renk: RENK.vurgu, kalin: 3 }); cizgi(c, aralik, p.x(0), p.alt + 12, p.x(0), p.alt + 32, { renk: RENK.vurgu, kalin: 3 }); cizgi(c, aralik, p.x(50), p.alt + 12, p.x(50), p.alt + 32, { renk: RENK.vurgu, kalin: 3 });
    gizle(p.g, gul, aralik);
    await belir(c, [p.g, gul], 500);
    await c.say('Düz bir pistte beş koşucu, beş ayrı kulvarda koşuyor.');
    await belir(c, aralik);
    await c.say('Pistteki çizgiler 50 m arayla çizilmiş.', { speak: 'Pistteki çizgiler elli metre arayla çizilmiş.' });
    await kaybol(c, aralik);
    for (const n of nk) await belir(c, n, 220);
    await c.say('Her koşuyu, başladığı noktadan bittiği noktaya çizilen bir okla gösteririz.');
    await ciz(c, oklar[0], 700);
    await c.say('Cihan 0 çizgisinden 50 çizgisine koştu.', { speak: 'Cihan sıfır çizgisinden elli çizgisine koştu.' });
    await oku('Cihan: doğu, 50 m');
    await c.say('Oku 1 aralık tutuyor ve doğuya bakıyor: doğu yönünde 50 m.', { speak: 'Oku bir aralık tutuyor ve doğuya bakıyor: doğu yönünde elli metre.' });
    await oku('');
    await ciz(c, oklar[1], 900);
    await c.say('Sudem 0 çizgisinden 200 çizgisine koştu.', { speak: 'Sudem sıfır çizgisinden iki yüz çizgisine koştu.' });
    await oku('Sudem: doğu, 200 m');
    await c.say('Oku 4 aralık tutuyor: doğu yönünde 200 m.', { speak: 'Oku dört aralık tutuyor: doğu yönünde iki yüz metre.' });
    await oku('');
    await par(sol(c, nk[2], 0.2, 250).then(() => belir(c, nk[2], 350)));
    await c.say('Hülya 200 çizgisinden 100 çizgisine koştu.', { speak: 'Hülya iki yüz çizgisinden yüz çizgisine koştu.' });
    await c.choice({ tag: 'Uygula', q: 'Hülya’nın koşusunu gösteren vektör hangisidir?',
      options: ['Batı yönünde 200 m', 'Batı yönünde 100 m', 'Batı yönünde −100 m'], answer: 1,
      hints: ['200, koşunun başladığı çizgidir; okun boyu değildir. Ok 200 çizgisinden 100 çizgisine 2 aralık tutar: 100 m.', '',
        'Büyüklük okun boyudur, eksi olmaz. Batıya gidişi eksi işareti değil, “batı yönünde” sözü anlatır.'],
      right: 'Evet. 2 aralık: 100 m, batıya.' });
    await ciz(c, oklar[2], 800);
    await c.say('Hülya’nın oku 2 aralık tutar ve batıya bakar.', { speak: 'Hülya’nın oku iki aralık tutar ve batıya bakar.' });
    await oku('Hülya: batı, 100 m');
    await c.say('Büyüklük okun boyudur: 100 m; yön ayrıca söylenir: batı.', { speak: 'Büyüklük okun boyudur: yüz metre; yön ayrıca söylenir: batı.' });
    await oku('');
    // Dene: oku çiz (numaralı aday oklar)
    const uzanti = c.S('g', {}, svg);
    [0, 50, 100, 150, 200].forEach((m) => cizgi(c, uzanti, p.x(m), p.alt, p.x(m), 525, { renk: RENK.ince, kalin: 2, kesik: '5 8' }));
    gizle(uzanti);
    const ADAY_Y = (i) => 388 + i * 56;
    const adaylar = async (liste) => {
      const g = c.S('g', {}, svg);
      liste.forEach(([a, b], i) => { yazi(c, g, 150, ADAY_Y(i) + 10, String(i + 1), { size: 28, renk: RENK.vurgu }); ok(c, g, p.x(a), ADAY_Y(i), p.x(b), ADAY_Y(i), { renk: RENK.yazi, kalin: 6 }); });
      gizle(g); await belir(c, g, 350); return g;
    };
    const secenek = ['1 numaralı ok', '2 numaralı ok', '3 numaralı ok'];
    await belir(c, uzanti);
    await c.say('Kalan koşuların okunu sen seç.', { noWait: true });
    let ad = await adaylar([[50, 200], [200, 50], [200, 100]]);
    await c.choice({ tag: 'Sıra sende', q: '<b>Birol</b> 200 çizgisinden 50 çizgisine koştu. Koşusunu hangi ok gösterir?', options: secenek, answer: 1,
      hints: ['Ok başlangıç noktasından bitiş noktasına bakar; Birol 200 çizgisinden başladı.', '', 'Ok bitiş noktasına kadar uzanır; Birol 50 çizgisinde durdu.'],
      right: 'Evet. Batı yönünde 3 aralık: 150 m.' });
    await kaybol(c, ad); await ciz(c, oklar[3], 800);
    ad = await adaylar([[200, 50], [50, 150], [150, 50]]);
    await c.choice({ tag: 'Sıra sende', q: '<b>Şule</b> 150 çizgisinden 50 çizgisine koştu. Koşusunu hangi ok gösterir?', options: secenek, answer: 2,
      hints: ['Şule pistin ucundan değil, 150 çizgisinden başladı.', 'Bu ok doğuya bakıyor; Şule 150 çizgisinden 50 çizgisine, batıya koştu.', ''],
      right: 'Evet. Batı yönünde 2 aralık: 100 m.' });
    await kaybol(c, ad); await ciz(c, oklar[4], 800);
    ad = await adaylar([[0, 150], [150, 0], [0, 200]]);
    await c.choice({ tag: 'Sıra sende', q: 'Boş bir kulvara <b>doğu yönünde 150 m</b>’lik bir ok çizilecek. Hangisi olur?', options: secenek, answer: 0,
      hints: ['', 'Boyu doğru ama ucu batıya bakıyor.', 'Bu ok 4 aralık tutuyor: 200 m.'],
      right: 'Evet. 50 çizgisinden başlasa da aynı ok olurdu: doğu yönünde 150 m.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        [...ad.children].slice(2).forEach((e) => { e.style.opacity = 0; });
        const kopya = ok(c, ad, p.x(0), ADAY_Y(0), p.x(150), ADAY_Y(0), { renk: RENK.yazi, kalin: 6 });
        sessiz(okGit(c, kopya, p.x(50), ADAY_Y(1), p.x(200), ADAY_Y(1), 900));
      } });
    await kaybol(c, [ad, uzanti]);
    await mat(c, [oklar[0], oklar[1], oklar[3]], 0.3);
    await sol(c, [nk[0], nk[1], nk[3]], 0.3);
    await c.say('Hülya ile Şule farklı kulvarlarda, farklı çizgilerden başladı.');
    await par(okCiz(c, oklar[2], 700), okCiz(c, oklar[4], 700));
    await oku('batı, 100 m');
    await c.say('Yine de iki ok aynı çıktı: batı yönünde 100 m.', { speak: 'Yine de iki ok aynı çıktı: batı yönünde yüz metre.' });
    await c.say('Bir vektörü tanımak için iki şeye bakarız: yönüne ve büyüklüğüne.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c1', kicker: 'Konu C · Vektörler', title: 'Vektör: yönlü bir doğru parçası', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Vektör: yönlü bir doğru parçası', hook: 'Halat çekmede iki takım da aynı ip boyunca çekiyor; bu iki çekişi kâğıda nasıl çizersin?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Çekişi kâğıda çizmek', goal: 'Yönü olan bir niceliğin okla gösterildiğini gör.', run: cekis },
      { title: 'Okun parçaları', goal: 'Başlangıç, bitiş, yön ve büyüklüğü ok üzerinde bul.', run: parcalar },
      { title: 'Bir doğrultu, iki yön', goal: 'Doğrultu ile yönü birbirinden ayır.', run: dogrultu },
      { title: 'Büyüklüğü kareden oku', goal: 'Okun boyunu kare sayısı ve ölçekle oku.', run: kareler },
      { title: 'Yön ve büyüklük tablosu', goal: 'Dokuz vektörün yönünü ve büyüklüğünü kaydet.', run: tabloSahne },
      { title: 'Pistte vektörler', goal: 'Bir koşuyu yönü ve büyüklüğü olan bir okla göster.', run: pistSahne },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kareli düzlemde bir ok 4 kare boyunca doğuya uzanıyor; ölçek 1 kare = 5 N. Bu ok hangi kuvveti gösterir?',
        options: ['Doğu yönünde 4 N', 'Doğu yönünde 20 N', 'Doğu yönünde 9 N'], answer: 1,
        why: ['4, kare sayısıdır; ölçek hesaba katılmamış. Her kare 5 N’dır.', 'Kare sayısı × ölçek: 4 × 5 N = 20 N.', 'Kare sayısı ile ölçek toplanmaz, çarpılır: 4 × 5 N = 20 N.'], scene: 3 },
      { q: 'İki ok aynı doğrultuda olup yönleri farklı olabilir mi?',
        options: ['Hayır; doğrultu aynıysa yön de aynıdır', 'Evet; biri doğuya, öteki batıya bakabilir', 'Hayır; doğrultu ile yön aynı şeydir'], answer: 1,
        why: ['Bir doğrultuda iki yön vardır; aynı doğru üzerindeki iki ok ters yanlara bakabilir.', 'Doğu–batı doğrultusunda iki yön vardır: doğu ve batı.', 'Doğrultu bir doğrudur; yön, o doğru üzerinde okun baktığı yandır.'], scene: 2 },
    ],
    summary: ['<b>Okun ucu yönü, boyu büyüklüğü söyler.</b>', 'Bir doğrultuda iki yön vardır: doğu–batı doğrultusunda doğu ve batı.', 'Okun düzlemde nerede çizildiği yönünü de büyüklüğünü de değiştirmez.'],
    nextLesson: { href: 'c2-esit-ve-zit.html', label: 'Sonraki: Eşit vektör, zıt vektör ›' },
  });
})();
