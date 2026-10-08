/* C2 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md (## C2)
   Yazar notu: içerik MEB Fizik 9 s. 65–66 ve 68–70'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: vektörler RENK.a; karşılaştırılan ikinci ok ve aday oklar RENK.b. "Oku çiz" adımları numaralı aday oklarla sorulur. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, belir, sol, kaybol, par, gizle, ok, okCiz, yonGulu, izgara, kutular } = KIT;
  const { ease, clamp } = Ders;

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

  /* s. 65 düzleminin doğu–batı doğrultusundaki beş oku ve yön–büyüklük tablosu (sahne 2 ve 4). */
  function besOk(c, svg) {
    const iz = izgara(c, svg, { kare: 56, sutun: 10, satir: 5, x: 30, y: 64 });
    yonGulu(c, svg, 110, 450, { r: 28 });
    const T = [['A', 2, 4, -2, 1], ['B', 3, 4, 4, -1], ['C', 3, 2, -2, 1], ['D', 4, 2, 2, -1], ['E', 1, 1, 4, 1]], V = {}, sira = {};
    T.forEach(([ad, i, j, di, yan], k) => { const v = iz.vektor(i, j, di, 0, { yan }); adla(c, iz, v, '^' + ad); gizle(hepsi(v)); V[ad] = v; sira[ad] = k; });
    const tb = kayit(c, svg, T.map(([ad, , , di]) => [ad, di < 0 ? 'batı' : 'doğu', Math.abs(di)]), { y: 60 });
    const adlar = T.map((t) => t[0]), tum = adlar.map((ad) => V[ad]);
    const odak = (sec) => par(adlar.map((ad) => mat(c, V[ad], sec.includes(ad) ? 1 : 0.3, 250)));
    const esitlik = (metin) => { const e = vyazi(c, svg, 800, 430, metin, { size: 46, renk: RENK.vurgu }); gizle(e); return e; };
    return { iz, V, sira, tb, adlar, tum, odak, esitlik };
  }

  /* Koli ve ona etki eden altı kuvvet (1 kare = 10 N): F₁–F₃ doğuya, F₄–F₆ batıya bakar. */
  function koliDuzlem(c, svg) {
    const iz = izgara(c, svg, { kare: 50, sutun: 14, satir: 6, x: 150, y: 40, olcek: '1 kare = 10 N' });
    const gul = yonGulu(c, svg, 925, 100, { r: 26 }), [kx, ky] = iz.P(6, 5.6), F = {};
    kutu(c, iz.g, kx, ky, 100, 260, { renk: '#c9a36b', fill: '#4a3a24', rx: 6 }); cizgi(c, iz.g, kx + 50, ky, kx + 50, ky + 260, { renk: '#c9a36b', kalin: 2 });
    [['F₁', 4, 5, 2], ['F₂', 5, 3, 1], ['F₃', 5, 1, 1], ['F₄', 10, 5, -2], ['F₅', 10, 3, -2], ['F₆', 9, 1, -1]].forEach(([ad, i, j, di]) => {
      const v = iz.vektor(i, j, di, 0), [x, y] = iz.P(i, j);
      v.ad = vyazi(c, iz.g, x - Math.sign(di) * 12, y + 9, '^' + ad, { size: 26, renk: RENK.a, hiza: di > 0 ? 'end' : 'start' });
      F[ad] = v;
    });
    const adlar = Object.keys(F), odak = (sec) => par(adlar.map((ad) => mat(c, F[ad], sec.includes(ad) ? 1 : 0.3, 250)));
    return { iz, gul, F, adlar, odak };
  }

  /* ---- Sahne 1 · İki merdiven, iki hız ---- */
  async function merdiven(c) {
    const svg = c.svg(1000, 562), on = c.S('g', {}, svg);
    const v0 = ok(c, on, 320, 270, 680, 270, { renk: RENK.a, kalin: 8, uc: 24 });
    const yonAd = yazi(c, on, 680, 232, 'yön', { size: 28, renk: RENK.vurgu }), olcu = c.S('g', {}, on);
    cizgi(c, olcu, 320, 330, 680, 330, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, 320, 320, 320, 340, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, 680, 320, 680, 340, { renk: RENK.vurgu, kalin: 2 });
    yazi(c, olcu, 500, 374, 'büyüklük', { size: 28, renk: RENK.vurgu });
    gizle(yonAd, olcu);
    await okCiz(c, v0, 700);
    await c.say('Bir vektörün iki özelliği vardır: yönü ve büyüklüğü.');
    await belir(c, [yonAd, olcu]);
    await c.say('Yönü okun ucundan, büyüklüğü okun boyundan okuruz.');
    await kaybol(c, on);
    // İki yürüyen merdiven, karşıdan görünüş: soldaki yukarı, sağdaki aşağı kayar.
    const M = c.S('g', {}, svg), UST = 60, H = 430, ADIM = 43, bantlar = [[330, -1], [570, 1]];
    const basamak = bantlar.map(([x]) => {
      kutu(c, M, x, UST, 100, H, { renk: RENK.cizgi, rx: 6 });
      return Array.from({ length: H / ADIM }, () => cizgi(c, M, x + 8, 0, x + 92, 0, { renk: RENK.soluk, kalin: 3 }));
    });
    let ofs = 0;
    const yerlestir = () => bantlar.forEach(([, yon], b) => basamak[b].forEach((l, k) => { const y = UST + (((k * ADIM + yon * ofs) % H) + H) % H; l.setAttribute('y1', y); l.setAttribute('y2', y); }));
    const kayma = (ms) => { const bas = ofs; return c.tween(ms, (e) => { ofs = bas + e * ms * 0.05; yerlestir(); }, ease.linear); };
    const anlat = (metin, o) => par(c.say(metin, o), kayma(clamp(metin.replace(/<[^>]+>/g, '').length * 75, 1800, 11000)));
    yerlestir(); gizle(M);
    await belir(c, M, 500);
    await anlat('Yan yana iki yürüyen merdiven düşün.');
    await anlat('Biri yolcuları yukarı, öteki aşağı taşıyor.');
    await anlat('İkisinin basamakları da saniyede 0,5 m ilerliyor.', { speak: 'İkisinin basamakları da saniyede sıfır virgül beş metre ilerliyor.' });
    const yukari = ok(c, svg, 250, 325, 250, 225, { renk: RENK.a, kalin: 8, uc: 22 }), asagi = ok(c, svg, 750, 225, 750, 325, { renk: RENK.b, kalin: 8, uc: 22 });
    const h1 = yazi(c, svg, 228, 284, '0,5 m/s', { size: 28, renk: RENK.a, hiza: 'end' }), h2 = yazi(c, svg, 772, 284, '0,5 m/s', { size: 28, renk: RENK.b, hiza: 'start' });
    gizle(h1, h2);
    await par(okCiz(c, yukari, 700), okCiz(c, asagi, 700), belir(c, [h1, h2], 700), kayma(700));
    await anlat('Hız vektörel bir niceliktir; her merdivenin hızını bir okla çizelim.');
    await c.choice({ tag: 'Uygula', q: 'Bu iki hız vektörünün nesi aynı, nesi farklıdır?',
      options: ['Yönleri aynı, büyüklükleri farklı', 'Büyüklükleri aynı, yönleri farklı', 'Hem yönleri hem büyüklükleri aynı'], answer: 1,
      hints: ['Oklardan biri yukarıyı, öteki aşağıyı gösterir; yönler farklıdır. Aynı olan, saniyede 0,5 m’lik büyüklüktür.', '',
        'İki merdiven de saniyede 0,5 m ilerler ama ters yanlara. Hızda yön de hesaba katılır.'],
      right: 'Evet. Boylar aynı, uçlar ters yanlara bakıyor.' });
    const k1 = cizgi(c, svg, 250, 225, 250, 225, { renk: RENK.vurgu, kalin: 2, kesik: '6 8' }), k2 = cizgi(c, svg, 250, 325, 250, 325, { renk: RENK.vurgu, kalin: 2, kesik: '6 8' });
    await par(c.tween(700, (e) => { k1.setAttribute('x2', 250 + 500 * e); k2.setAttribute('x2', 250 + 500 * e); }), kayma(700));
    await anlat('İki okun boyu aynı: ikisi de 0,5 m/s.', { speak: 'İki okun boyu aynı: ikisi de sıfır virgül beş metre bölü saniye.' });
    await par(okCiz(c, yukari, 700), okCiz(c, asagi, 700), kayma(700));
    await anlat('Ama biri yukarıyı, öteki aşağıyı gösteriyor.', { speak: '[thoughtful] Ama biri yukarıyı, öteki aşağıyı gösteriyor.' });
    await anlat('İki vektörü karşılaştırırken hep bu iki özelliğe bakarız.');
  }

  /* ---- Sahne 2 · Tabloda aynı satırlar ---- */
  async function ayniSatir(c) {
    const svg = c.svg(1000, 562), { iz, V, sira, tb, adlar, tum, odak, esitlik } = besOk(c, svg);
    /* v oku hedefin üstüne gelir, bekler ve yerine döner (adı yolda gizlenir: iki ad üst üste binmesin). */
    const ustUste = async (v, hedef) => {
      const i = v.i, j = v.j; v.ad.style.opacity = 0;
      await iz.tasi(c, v, hedef.i, hedef.j, { ms: 900 }); await c.wait(900); await iz.tasi(c, v, i, j, { ms: 900 });
      await belir(c, v.ad, 250);
    };
    gizle(tb.g);
    await par(c.say('Kareli düzlemdeki beş okun yönünü ve büyüklüğünü tabloya yazalım.'), (async () => { for (const v of tum) await ciz(c, v, 300); await belir(c, tb.g); for (const ad of adlar) await tb.ac(sira[ad], 260); })());
    await odak(['A']); tb.vurgula([sira.A]);
    await c.say('A vektörü batı yönünde 2 birim.', { speak: 'a vektörü batı yönünde iki birim.' });
    await odak(['A', 'C']); tb.vurgula([sira.A, sira.C]);
    await c.say('C vektörü de batı yönünde 2 birim.', { speak: 'Ce vektörü de batı yönünde iki birim.' });
    await c.say('İki satır birbirinin aynısı: yön aynı, büyüklük aynı.');
    await par(c.say('Yönü ve büyüklüğü aynı olan iki vektöre <b>eşit vektör</b> denir.', { speak: 'Yönü ve büyüklüğü aynı olan iki vektöre [short pause] eşit vektör denir.' }), ustUste(V.C, V.A));
    const e1 = esitlik('^A = ^C');
    await belir(c, e1);
    await c.say('Bu eşitlik A = C diye yazılır.', { speak: 'Bu eşitlik a eşittir ce diye yazılır.' });
    await odak(['B']); tb.vurgula([sira.B]);
    await c.say('B vektörü doğu yönünde 4 birim.', { speak: 'Be vektörü doğu yönünde dört birim.' });
    await odak(adlar);
    await c.choice({ tag: 'Uygula', q: 'Tabloya göre B vektörüne eşit olan hangisidir?', options: ['E: doğu, 4 birim', 'D: doğu, 2 birim', 'A: batı, 2 birim'], answer: 0,
      hints: ['', 'D ile B aynı yöne bakar ama boyları farklıdır. Eşitlik için büyüklük de aynı olmalıdır.', 'A hem ters yöne bakar hem de boyu farklıdır.'],
      right: 'Evet. Yön aynı, büyüklük aynı.' });
    await kaybol(c, e1);
    await odak(['B', 'E']); tb.vurgula([sira.B, sira.E]);
    const e2 = esitlik('^B = ^E');
    await par(belir(c, e2), ustUste(V.E, V.B));
    await c.say('E de doğu yönünde 4 birim: B = E.', { speak: 'e vektörü de doğu yönünde dört birim: be eşittir e.' });
    await odak(['B', 'D']); tb.vurgula([sira.B, sira.D]);
    await iz.tasi(c, V.D, 3, 3, { ms: 800 });
    await c.say('D aynı yöne bakıyor ama boyu 2 birim; B’ye eşit değil.', { speak: 'De vektörü aynı yöne bakıyor ama boyu iki birim; be vektörüne eşit değil.' });
    c.note('<b>Eşit vektör: yön aynı, büyüklük aynı.</b><br>A = C (ikisi de batı, 2 birim)', 'Eşit vektör', 'c2-esit');
  }

  /* ---- Sahne 3 · Taşınan ok aynı vektördür ---- */
  async function tasima(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 60, sutun: 12, satir: 7, x: 150, y: 60 }), gul = yonGulu(c, svg, 76, 120, { r: 26 });
    const A = iz.vektor(4, 6, -2, 0, { yan: 1 }), C = iz.vektor(9, 3, -2, 0, { yan: 1 });
    adla(c, iz, A, '^A'); adla(c, iz, C, '^C'); gizle(hepsi([A, C]));
    await par(ciz(c, A, 500), ciz(c, C, 500));
    await c.say('A ile C düzlemin farklı yerlerinde duruyor ama eşit.', { speak: 'a vektörüyle ce vektörü düzlemin farklı yerlerinde duruyor ama eşit.' });
    await c.say('Çünkü eşitlik yalnızca yöne ve büyüklüğe bakar.', { speak: '[thoughtful] Çünkü eşitlik yalnızca yöne ve büyüklüğe bakar.' });
    await c.say('Okun düzlemde nerede durduğu bu iki özelliği değiştirmez.');
    await kaybol(c, hepsi([A, C]));
    const v = iz.vektor(3, 3, 0, 3); gizle(v);
    const kopya = () => { const k = iz.vektor(v.i, v.j, v.di, v.dj); k.style.opacity = 0.35; return k; };
    await ciz(c, v, 700);
    await c.say('Bu yüzden bir vektör başka bir noktaya taşınabilir.');
    const k1 = kopya();
    await par(c.say('Taşırken oku kendine paralel kaydırırız: döndürmeyiz, uzatmayız, kısaltmayız.'), (async () => { await c.wait(700); await iz.tasi(c, v, 5, 2, { ms: 1400 }); })());
    const k2 = kopya();
    await iz.tasi(c, v, 7, 2, { ms: 1200 });
    await c.say('Kuzeye 3 birimlik bu oku iki kez taşıdık.', { speak: 'Kuzeye üç birimlik bu oku iki kez taşıdık.' });
    await sol(c, [k1, k2], 1, 500);
    await c.say('Üç ok da kuzey yönünde 3 birim: üçü birbirine eşit.', { speak: 'Üç ok da kuzey yönünde üç birim: üçü birbirine eşit.' });
    await kaybol(c, [v, k1, k2]);
    // Soru: P ve üç aday ok
    const a3 = iz.vektor(2, 3, 4, 0, { renk: RENK.b }), P = iz.vektor(2, 3, 3, 0), a1 = iz.vektor(2, 3, 0, 3, { renk: RENK.b }), a2 = iz.vektor(7, 5, 3, 0, { renk: RENK.b });
    adla(c, iz, P, '^P');
    const no = (i, j, metin) => { const [x, y] = iz.P(i, j); return yazi(c, iz.g, x, y + 10, metin, { size: 28, renk: RENK.b }); };
    const n1 = no(1.55, 4.5, '1'), n2 = no(8.5, 5.5, '2'), n3 = no(6.4, 3, '3');
    gizle(hepsi(P), a1, a2, a3, n1, n2, n3);
    await ciz(c, P, 600);
    a3.style.opacity = '';
    await par(ciz(c, a1, 400), ciz(c, a2, 400), okCiz(c, a3, 400), belir(c, [n1, n2, n3], 400));
    await c.choice({ tag: 'Uygula', q: 'P vektörü doğu yönünde 3 birim. Hangisi P’nin taşınmış hâli olabilir?',
      options: ['<b>1</b> · Aynı noktadan başlayan, kuzey yönünde 3 birimlik ok', '<b>2</b> · Başka bir noktadan başlayan, doğu yönünde 3 birimlik ok', '<b>3</b> · Aynı noktadan başlayan, doğu yönünde 4 birimlik ok'], answer: 1,
      hints: ['Bu ok döndürülmüş; yönü değişmiş. Taşımada ok dönmez.', '', 'Bu ok uzatılmış; büyüklüğü değişmiş. Taşımada değişen tek şey okun durduğu yerdir.'],
      right: 'Evet. Yön de boy da aynı; değişen yalnızca yeri.' });
    await kaybol(c, [a1, a3, n1, n3, n2]);
    const golge = iz.vektor(2, 3, 3, 0, { renk: RENK.yazi, kalin: 4 }); golge.style.opacity = 0.7;
    await iz.tasi(c, golge, 7, 5, { ms: 1300 });
    await c.say('Başka noktadan başlayan ok P ile aynı yönde ve aynı boyda.', { speak: 'Başka noktadan başlayan ok pe vektörüyle aynı yönde ve aynı boyda.' });
    await c.say('Yeri farklı olsa da P’ye eşittir.', { speak: 'Yeri farklı olsa da pe vektörüne eşittir.' });
    await kaybol(c, [iz.g, gul]);
    // Pist: üç koşu
    const p = pist(c, svg, [['III', 'Hülya'], ['IV', 'Birol'], ['V', 'Şule']], { y: 130, h: 70 }), gul2 = yonGulu(c, svg, 930, 200, { r: 26 });
    const kosular = [[200, 100], [200, 50], [150, 50]];
    kosular.forEach(([a, b], k) => p.noktalar(k, a, b));
    const oklar = kosular.map(([a, b], k) => p.kosu(k, a, b));
    gizle(p.g, gul2);
    await belir(c, [p.g, gul2], 500);
    await c.say('Pistte üç koşucunun vektörüne bakalım.');
    await c.choice({ tag: 'Düşün', q: 'Hülya 200 çizgisinden 100 çizgisine, Birol 200 çizgisinden 50 çizgisine, Şule 150 çizgisinden 50 çizgisine koştu. Hangi iki koşunun vektörü eşittir?',
      options: ['Hülya ile Birol; ikisi de 200 çizgisinden başladı', 'Birol ile Şule; ikisi de 50 çizgisinde bitti', 'Hülya ile Şule; ikisi de batı yönünde 100 m'], answer: 2,
      hints: ['Aynı noktadan başlamak eşitlik için gerekmez, yetmez de. Birol’un oku 150 m, Hülya’nın oku 100 m’dir.',
        'Aynı noktada bitmek de yetmez; boylar 150 m ve 100 m’dir. Üç ok da batıya bakar ve paraleldir ama eşit olanlar, boyu da aynı olan ikisidir.', ''],
      right: 'Evet. İki okun da yönü batı, boyu 100 m.' });
    await sol(c, oklar[1], 0.3);
    await c.say('Hülya ile Şule farklı kulvarlarda, farklı çizgilerden başladı.');
    const es = ok(c, svg, p.x(200), p.y(0), p.x(100) + 9, p.y(0), { renk: RENK.yazi, kalin: 4 }); es.style.opacity = 0.7;
    const okuma = yazi(c, svg, 525, 420, 'batı, 100 m', { size: 32, renk: RENK.vurgu }); gizle(okuma);
    await par(c.tween(1300, (e) => es.ayarla(p.x(200 - 50 * e), p.y(2 * e) - 16 * e, p.x(100 - 50 * e) + 9, p.y(2 * e) - 16 * e)), belir(c, okuma, 600));
    await c.say('İki okun da yönü batı, boyu 100 m: eşit vektörler.', { speak: 'İki okun da yönü batı, boyu yüz metre: eşit vektörler.' });
    c.note('<b>Vektör, yönü ve büyüklüğü değişmeden başka bir noktaya taşınabilir.</b><br>Taşınan ok ilkine eşittir.', 'Taşıma', 'c2-tasima');
  }

  /* ---- Sahne 4 · Zıt vektör ---- */
  async function zit(c) {
    const svg = c.svg(1000, 562), { iz, V, sira, tb, adlar, tum, odak, esitlik } = besOk(c, svg);
    await par(tum.map((v) => ciz(c, v, 500)), adlar.map((ad) => tb.ac(sira[ad], 500)));
    await c.say('Merdivenlerde okların boyu aynıydı ama yönleri tersti.');
    await c.say('Büyüklüğü aynı, yönü ters olan iki vektöre <b>zıt vektör</b> denir.', { speak: 'Büyüklüğü aynı, yönü ters olan iki vektöre [short pause] zıt vektör denir.' });
    await odak(['A', 'D']); tb.vurgula([sira.A, sira.D]);
    await c.say('Tabloda A batı yönünde 2 birim, D doğu yönünde 2 birim.', { speak: 'Tabloda a vektörü batı yönünde iki birim, de vektörü doğu yönünde iki birim.' });
    await iz.tasi(c, V.D, 0, 3, { ms: 900 });
    await c.say('Büyüklükler aynı, yönler ters: A ile D zıt vektörlerdir.', { speak: 'Büyüklükler aynı, yönler ters: a vektörüyle de vektörü zıt vektörlerdir.' });
    const e1 = esitlik('^A = −^D');
    await belir(c, e1);
    await c.say('Bu durum A = −D ya da D = −A diye yazılır.', { speak: 'Bu durum a eşittir eksi de ya da de eşittir eksi a diye yazılır.' });
    await c.say('Buradaki eksi işareti “yönü ters” demektir.');
    await iz.tasi(c, V.D, 4, 2, { ms: 700 });
    await odak(['C']); tb.vurgula([sira.C]);
    await c.say('C vektörü de batı yönünde 2 birim.', { speak: 'Ce vektörü de batı yönünde iki birim.' });
    await odak(adlar);
    await c.choice({ tag: 'Uygula', q: 'C vektörüne zıt olan hangisidir?', options: ['B: doğu, 4 birim', 'D: doğu, 2 birim', 'A: batı, 2 birim'], answer: 1,
      hints: ['B ters yöne bakıyor ama boyu 4 birim. Zıt vektörde yönün ters olması yetmez; büyüklük de aynı olmalıdır.', '', 'A, C ile aynı yöne bakıyor; bu ikisi eşittir, zıt değil.'],
      right: 'Evet. Boy aynı, yön ters.' });
    await kaybol(c, e1);
    const e2 = esitlik('^C = −^D');
    tb.vurgula([sira.C, sira.D]);
    await par(odak(['B', 'C', 'D']), belir(c, e2));
    await c.say('D, C ile aynı boyda ve ters yönde: C = −D.', { speak: 'De vektörü, ce vektörüyle aynı boyda ve ters yönde: ce eşittir eksi de.' });
    const [bx, by] = iz.P(7.25, 4), dort = yazi(c, svg, bx, by + 9, '4 birim', { size: 24, renk: RENK.vurgu, hiza: 'start' }); gizle(dort);
    tb.vurgula([sira.B, sira.C, sira.D]);
    await par(belir(c, dort), okCiz(c, V.B, 700));
    await c.say('B de ters yöne bakıyor ama boyu iki katı; C’nin zıddı değil.', { speak: 'Be vektörü de ters yöne bakıyor ama boyu iki katı; ce vektörünün zıddı değil.' });
    await kaybol(c, dort);
    tb.vurgula([]); await odak([]);
    const kz = iz.vektor(8, 1, 0, 2, { renk: RENK.a }), gn = iz.vektor(9, 3, 0, -2, { renk: RENK.b }); gizle(kz, gn);
    await par(ciz(c, kz, 700), ciz(c, gn, 700));
    await c.say('Kuzeye 2 birimlik ok ile güneye 2 birimlik ok da zıttır.', { speak: 'Kuzeye iki birimlik ok ile güneye iki birimlik ok da zıttır.' });
    await c.say('Merdivenlerin hız vektörleri de birbirinin zıddıdır.');
    c.note('<b>Zıt vektör: büyüklük aynı, yön ters.</b><br>A = −D (batı 2 birim, doğu 2 birim)', 'Zıt vektör', 'c2-zit');
  }

  /* ---- Sahne 5 · Dört durum yan yana ---- */
  async function dortDurum(c) {
    const svg = c.svg(1000, 562), T = c.S('g', {}, svg), X = [210, 550, 890], Y = [100, 290, 480], U = 40;
    cizgi(c, T, 60, Y[0], X[2], Y[0], { kalin: 2 }); cizgi(c, T, 60, Y[1], X[2], Y[1], { renk: RENK.ince, kalin: 2 }); cizgi(c, T, X[0], 40, X[0], Y[2], { kalin: 2 }); cizgi(c, T, X[1], 40, X[1], Y[2], { renk: RENK.ince, kalin: 2 });
    yazi(c, T, 380, 80, 'boy aynı', { size: 28, renk: RENK.soluk }); yazi(c, T, 720, 80, 'boy farklı', { size: 28, renk: RENK.soluk });
    yazi(c, T, 135, 205, 'yön aynı', { size: 28, renk: RENK.soluk }); yazi(c, T, 135, 395, 'yön ters', { size: 28, renk: RENK.soluk });
    /* Göz: iki ok (kare sayısı; eksi batı) ve altında hüküm. */
    const goz = (sat, sut, n1, n2, hukum, renk) => {
      const g = c.S('g', {}, T), cx = sut ? 720 : 380, y0 = Y[sat], uz = Math.max(Math.abs(n1), Math.abs(n2)) * U;
      const ciftOk = (n, y, r) => { const x1 = n > 0 ? cx - uz / 2 : cx + uz / 2; return ok(c, g, x1, y, x1 + n * U, y, { renk: r, kalin: 6 }); };
      ciftOk(n1, y0 + 55, RENK.a); ciftOk(n2, y0 + 105, RENK.b);
      yazi(c, g, cx, y0 + 165, hukum, { size: 28, renk });
      gizle(g); return g;
    };
    const g1 = goz(0, 0, -2, -2, 'eşit', RENK.vurgu), g2 = goz(1, 0, -2, 2, 'zıt', RENK.vurgu), g3 = goz(0, 1, 2, 4, 'ne eşit ne zıt', RENK.yazi), g4 = goz(1, 1, -2, 4, 'ne eşit ne zıt', RENK.yazi);
    gizle(T); await belir(c, T, 500);
    await c.say('İki oku karşılaştırırken iki soru sorarız: yön aynı mı, boy aynı mı?', { speak: '[curious] İki oku karşılaştırırken iki soru sorarız: yön aynı mı, boy aynı mı?' });
    await belir(c, g1);
    await c.say('Yön aynı, boy aynı: eşit vektörler.');
    await belir(c, g2);
    await c.say('Yön ters, boy aynı: zıt vektörler.');
    await belir(c, g3);
    await c.say('Yön aynı, boy farklı: ne eşit ne zıt.');
    await belir(c, g4);
    await c.say('Yön ters, boy farklı: yine ne eşit ne zıt.');
    await sol(c, [g3, g4], 0.3);
    await c.say('Demek ki boyların aynı olması eşitlik için tek başına yetmez.', { speak: '[thoughtful] Demek ki boyların aynı olması eşitlik için tek başına yetmez.' });
    await par(sol(c, [g1, g3], 0.3), sol(c, [g2, g4], 1));
    await c.say('Yönlerin ters olması da zıtlık için tek başına yetmez.');
    await kaybol(c, T);
    // Koli ve altı kuvvet
    const { iz, gul, F, adlar, odak } = koliDuzlem(c, svg);
    const kt = kutular(c, svg, ['eşit', 'zıt', 'hiçbiri'], { x: 110, y: 398, w: 250, h: 148, bosluk: 15, baslikBoy: 24, yaziBoy: 22, adim: 30 });
    gizle(iz.g, gul, kt.g);
    await belir(c, [iz.g, gul], 500);
    await c.say('Şimdi bir koliye aynı anda etki eden altı kuvvete bakalım.');
    await c.say('Üçü doğuya, üçü batıya bakıyor; büyüklükleri 20 N ya da 10 N.', { speak: 'Üçü doğuya, üçü batıya bakıyor; büyüklükleri yirmi newton ya da on newton.' });
    await belir(c, kt.g);
    const sec = ['Eşit', 'Zıt', 'Hiçbiri'];
    const ciftler = [
      ['F₂', 'F₃', 0, ['', 'İki ok da doğuya bakıyor; zıt vektörlerin yönü terstir.', 'Yöne ve kare sayısına bir daha bak: ikisinde de aynı.'], 'Evet. İkisi de doğu yönünde 10 N.'],
      ['F₄', 'F₅', 0, ['', 'İki ok da batıya bakıyor; zıt vektörlerin yönü terstir.', 'Yöne ve kare sayısına bir daha bak: ikisinde de aynı.'], 'Evet. İkisi de batı yönünde 20 N.'],
      ['F₁', 'F₄', 1, ['Büyüklükler aynı ama yönler ters; eşitlik için yön de aynı olmalıdır.', '', 'Boylar aynı, yönler ters: bu durumun bir adı var.'], 'Evet. İkisi de 20 N, yönleri ters.'],
      ['F₂', 'F₆', 1, ['Büyüklükler aynı ama yönler ters; eşitlik için yön de aynı olmalıdır.', '', 'Boylar aynı, yönler ters: bu durumun bir adı var.'], 'Evet. İkisi de 10 N, yönleri ters.'],
      ['F₁', 'F₂', 2, ['İki ok paraleldir ve aynı yöne bakar ama boyları farklıdır; eşit değiller.', 'İki ok da doğuya bakıyor; zıt vektörlerin yönü terstir.', ''], 'Evet. Yön aynı ama boylar 20 N ve 10 N.'],
      ['F₁', 'F₆', 2, ['Yönler ters; eşit vektörler aynı yöne bakar.', 'Yönler ters ama boylar farklı; zıt vektörde büyüklük aynıdır.', ''], 'Evet. Yön ters ama boylar 20 N ve 10 N.'],
    ];
    await c.say('Her kuvvet çiftini doğru kutuya ayır.', { noWait: true });
    for (const [a, b, kutuNo, ipucu, neden] of ciftler) {
      await odak([a, b]);
      await c.choice({ tag: 'Sıra sende', q: `<b>${a}</b> ile <b>${b}</b> hangi kutuya girer?`, options: sec, answer: kutuNo, hints: ipucu, right: neden,
        onPick: (i, dogru) => { if (dogru) sessiz(kt.koy(c, kutuNo, `${a}–${b}`)); } });
    }
    await odak(['F₁', 'F₄']);
    await c.say('F₁ ile F₄ aynı büyüklükte ama ters yönlü: eşit değil, zıt.', { speak: 'Fe bir ile fe dört aynı büyüklükte ama ters yönlü: eşit değil, zıt.' });
    await odak(['F₁', 'F₆']);
    await c.say('F₁ ile F₆ ters yönlü ama boyları farklı: zıt değil.', { speak: 'Fe bir ile fe altı ters yönlü ama boyları farklı: zıt değil.' });
    await odak(adlar);
    c.note('<b>yön aynı, boy aynı → eşit · yön ters, boy aynı → zıt</b><br>boy farklı → ne eşit ne zıt', 'Eşit mi, zıt mı?', 'c2-dort');
  }

  /* ---- Sahne 6 · Sekiz ok ---- */
  async function sekizOk(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 60, sutun: 10, satir: 6, x: 200, y: 50 });
    yonGulu(c, svg, 110, 120, { r: 26 });
    const T = [['K', 2, 5, 3, 0, -1], ['N', 6, 5, 2, 0, -1], ['M', 6, 3, -3, 0, 1], ['L', 5, 1, 3, 0, -1], ['P', 1, 1, 0, 3, -1], ['R', 2, 4, 0, -3, -1], ['S', 9, 2, 0, 3, 1], ['T', 8, 4, 0, -1, 1]], V = {};
    T.forEach(([ad, i, j, di, dj, yan]) => { const v = iz.vektor(i, j, di, dj, { yan }); adla(c, iz, v, '^' + ad); gizle(hepsi(v)); V[ad] = v; });
    const adlar = T.map((t) => t[0]), tum = adlar.map((ad) => V[ad]);
    const odak = (sec) => par(adlar.map((ad) => mat(c, V[ad], sec.includes(ad) ? 1 : 0.3, 250)));
    await par(c.say('Yeni bir düzlemde sekiz ok var.'), (async () => { for (const v of tum) await ciz(c, v, 260); })());
    await c.say('Her ok için önce yönü, sonra kare sayısını oku.');
    await odak(['K', 'P']);
    await c.say('K doğu yönünde 3 birim, P kuzey yönünde 3 birim.', { speak: 'Ke vektörü doğu yönünde üç birim, pe vektörü kuzey yönünde üç birim.' });
    await c.say('Boyları aynı ama yönleri ne aynı ne ters.');
    await c.say('Bu yüzden K ile P ne eşittir ne zıttır.', { speak: 'Bu yüzden ke vektörüyle pe vektörü ne eşittir ne zıttır.' });
    await odak(adlar);
    // Dene 1: istenen oku seç
    const sor = async (q, options, answer, hints, right, vurgu) => {
      await c.choice({ tag: 'Sıra sende', q, options, answer, hints, right, onPick: (i, dogru) => { if (dogru) sessiz(odak(vurgu)); } });
      await odak(adlar);
    };
    await c.say('İstenen oku seç.', { noWait: true });
    await sor('<b>K</b>’ye eşit olan ok hangisidir?', ['N', 'P', 'L'], 2,
      ['N, K’ye paraleldir ve aynı yöne bakar ama boyu 2 birimdir. Eşitlik için büyüklük de aynı olmalıdır.', 'Boylar aynı ama K doğuya, P kuzeye bakar; yön aynı değilse vektörler eşit olmaz.', ''],
      'Evet. L de doğu yönünde 3 birim.', ['K', 'L']);
    await sor('<b>K</b> ile aynı yöne baktığı hâlde K’ye eşit olmayan ok hangisidir?', ['L', 'N', 'M'], 1,
      ['L, K ile aynı yönde ve aynı boyda; yani K’ye eşit.', '', 'M batıya bakıyor; K ile aynı yöne bakan bir ok aranıyor.'],
      'Evet. N doğuya bakıyor ama boyu 2 birim.', ['K', 'N']);
    await sor('<b>P</b>’ye zıt olan ok hangisidir?', ['T', 'S', 'R'], 2,
      ['T ters yöne bakıyor ama boyu 1 birim; zıt vektörün büyüklüğü aynı olmalıdır.', 'S, P ile aynı yöne bakıyor; bu ikisi eşit.', ''],
      'Evet. R güney yönünde 3 birim.', ['P', 'R']);
    await sor('<b>M</b>’ye zıt olan iki ok hangileridir?', ['K ve L', 'K ve N', 'N ve L'], 0,
      ['', 'N’nin boyu 2 birim; M’nin boyu 3 birim.', 'N’nin boyu 2 birim; M’nin boyu 3 birim.'],
      'Evet. M batı yönünde 3 birim; K ve L doğu yönünde 3 birim.', ['M', 'K', 'L']);
    await odak(['K', 'L']);
    const es = vyazi(c, svg, 500, 480, '^K = ^L', { size: 44, renk: RENK.vurgu }); gizle(es);
    await belir(c, es);
    await c.say('L, K’den uzakta çizili ama yönü ve boyu aynı: K = L.', { speak: 'Le vektörü, ke vektöründen uzakta çizili ama yönü ve boyu aynı: ke eşittir le.' });
    await kaybol(c, [es, ...hepsi(tum)]);
    await c.say('Şimdi verilen bir vektörün zıddını sen çizeceksin.');
    await c.say('Zıt vektör için boyu koru, yönü ters çevir.', { speak: 'Zıt vektör için boyu koru, [short pause] yönü ters çevir.' });
    // Dene 2: zıddını çiz (numaralı aday oklar). verilen: [i, j, di, dj, ad]; adaylar: [i, j, di, dj]
    const secenek = ['1 numaralı ok', '2 numaralı ok', '3 numaralı ok'];
    const zitSor = async (q, verilen, adaylar, answer, hints, right) => {
      const [vi, vj, vdi, vdj, ad, yan] = verilen, v = iz.vektor(vi, vj, vdi, vdj, { yan });
      if (ad[0] === '^') adla(c, iz, v, ad); else { const [x, y] = iz.P(vi + vdi / 2, vj); v.ad = yazi(c, iz.g, x, y - 16, ad, { size: 26, renk: RENK.a }); }
      const as = adaylar.map(([i, j, di, dj], k) => {
        const a = iz.vektor(i, j, di, dj, { renk: RENK.b }), [x, y] = di ? iz.P(Math.min(i, i + di) - 0.45, j) : iz.P(i - 0.45, j + dj / 2);
        a.ad = yazi(c, iz.g, x, y + 10, String(k + 1), { size: 28, renk: RENK.b }); return a;
      });
      gizle(hepsi([v, ...as]));
      await ciz(c, v, 500); await par(as.map((a) => ciz(c, a, 400)));
      await c.choice({ tag: 'Sıra sende', q, options: secenek, answer, hints, right,
        onPick: (i, dogru) => { if (dogru) { as.forEach((a, k) => { if (k !== answer) gizle(hepsi(a)); }); gizle(as[answer].ad); } } });
      return { v, as, secilen: as[answer] };
    };
    let s = await zitSor('<b>K</b> doğu yönünde 3 birim. K’nin zıddı hangi oktur?', [1, 4, 3, 0, '^K', -1], [[6, 5, 3, 0], [9, 3, -3, 0], [8, 1, -2, 0]], 1,
      ['Bu ok K ile aynı yöne bakıyor; K’ye eşit, zıt değil.', '', 'Yönü ters ama boyu 2 kare; zıt vektörde boy korunur.'], 'Evet. Batı yönünde 3 kare.');
    await kaybol(c, hepsi([s.v, ...s.as]));
    s = await zitSor('<b>T</b> güney yönünde 1 birim. T’nin zıddı hangi oktur?', [2, 4, 0, -1, '^T', 1], [[6, 2, 0, 1], [8, 4, 0, -1], [9, 1, 0, 3]], 0,
      ['', 'Bu ok T ile aynı; zıt vektör ters yöne bakar.', 'Yönü ters ama boyu 3 kare; T’nin boyu 1 kare.'], 'Evet. Kuzey yönünde 1 kare.');
    await kaybol(c, hepsi([s.v, ...s.as]));
    const [ox, oy] = iz.P(0, 0), olcek = yazi(c, svg, ox + 6, oy + 34, '1 kare = 10 N', { size: 26, renk: RENK.vurgu, hiza: 'start' }); gizle(olcek);
    await belir(c, olcek);
    s = await zitSor('Ölçek 1 kare = 10 N. Doğu yönünde 20 N’lık kuvvetin zıddı hangi oktur?', [1, 4, 2, 0, '20 N', -1], [[8, 5, -1, 0], [6, 3, 2, 0], [9, 1, -2, 0]], 2,
      ['Bu ok 1 kare: 10 N. Zıt vektörün büyüklüğü de 20 N olmalı.', 'Bu ok aynı yöne bakıyor; zıt vektör batıya bakar.', ''], 'Evet. Batı yönünde 2 kare: 20 N.');
    await iz.tasi(c, s.secilen, 7, 4, { ms: 900 }); await iz.tasi(c, s.secilen, 5, 2, { ms: 900 });
    await c.say('Okunu nereye çizdiğin önemli değildi; yönü ve boyu doğruysa zıt vektördür.');
    await c.say('Eşit vektörde boy ve yön aynıdır; zıt vektörde boy aynı, yön terstir.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c2', kicker: 'Konu C · Vektörler', title: 'Eşit vektör, zıt vektör', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Eşit vektör, zıt vektör', hook: 'Yan yana iki yürüyen merdivenden biri yukarı, öbürü aşağı gidiyor; ikisi de saniyede yarım metre ilerliyor. Bu iki hızın nesi aynı, nesi farklı?', button: 'Derse başla ›' },
    scenes: [
      { title: 'İki merdiven, iki hız', goal: 'İki vektörü yönü ve büyüklüğüyle karşılaştır.', run: merdiven },
      { title: 'Tabloda aynı satırlar', goal: 'Eşit vektörleri tablodan bul.', run: ayniSatir },
      { title: 'Taşınan ok aynı vektördür', goal: 'Okun yerinin vektörü değiştirmediğini gör.', run: tasima },
      { title: 'Zıt vektör', goal: 'Zıt vektörü tanı ve eksi işaretiyle yaz.', run: zit },
      { title: 'Dört durum yan yana', goal: 'Kuvvet çiftlerini eşit, zıt ve hiçbiri diye ayır.', run: dortDurum },
      { title: 'Sekiz ok', goal: 'Eşit ve zıt okları bul; bir okun zıddını seç.', run: sekizOk },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'A doğu yönünde 3 birim, B batı yönünde 3 birim; C başka bir yerde çizili ve doğu yönünde 3 birim. A’ya eşit olan hangisidir?',
        options: ['B', 'C', 'Hiçbiri; C başka bir yerde durduğu için eşit olamaz'], answer: 1,
        why: ['B’nin büyüklüğü aynı ama yönü ters; B, A’nın zıt vektörüdür.', 'Eşitlik yalnızca yöne ve büyüklüğe bakar; C’nin ikisi de A ile aynıdır.', 'Okun yeri eşitliği bozmaz; vektör yönü ve boyu değişmeden taşınabilir.'], scene: 2 },
      { q: 'Aynı boyda iki ok her zaman eşit midir?',
        options: ['Hayır; yönleri de aynı olmalıdır', 'Evet; boyları aynıysa eşittir', 'Evet; yeter ki birbirine paralel olsunlar'], answer: 0,
        why: ['Eşit vektörde hem boy hem yön aynıdır.', 'Aynı boyda iki ok ters yönlere bakabilir; o zaman zıttır, eşit değil.', 'Paralel iki ok ters yönlere bakabilir; eşitlik için yön de aynı olmalıdır.'], scene: 4 },
    ],
    summary: ['<b>Eşit: aynı boy, aynı yön. Zıt: aynı boy, ters yön.</b>', 'Vektör, yönü ve büyüklüğü değişmeden başka bir noktaya taşınabilir.', 'Boylar farklıysa iki vektör ne eşittir ne zıttır.'],
    nextLesson: { href: 'c3-sayiyla-carpma.html', label: 'Sonraki: Vektörü bir sayıyla çarpmak ›' },
  });
})();
