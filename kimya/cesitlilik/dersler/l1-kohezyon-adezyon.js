/* L1 — Kohezyon ve adezyon: ıslatır mı, ıslatmaz mı?
   Sıvının kendi molekülleri arasındaki çekim (kohezyon) ile sıvının yüzeyin tanecikleriyle çekimi (adezyon) karşılaştırılır:
   adezyon büyükse sıvı yayılır ve kapta içbükey durur; kohezyon büyükse damla kalır ve dışbükey durur; eşitse yüzey düz kalır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/L-adezyon-ve-kohezyon.md ("L1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Çubuklar, çizgi kalınlığı ve damla biçimleri şematiktir; kuvvet değeri ve temas açısı yoktur. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, isaret, sinifla } = window.KIT;
  const { GRI, damlaYuzey, buyutme, kuvvetCubuklari, tup, kureH2O, kartTahtasi } = window.KIT_L;
  const { lerp, ease } = Ders;

  /* Çubuk düzeyleri: yalnızca büyüklük sırası. */
  const KUCUK = 0.3, ORTA = 0.62, BUYUK = 0.95;

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const s1 = c.S('g', {}, svg), s2 = c.S('g', {}, svg);
    // Isıtılan sıvı.
    c.S('path', { d: 'M388,208 L612,208 L612,376 Q612,392 596,392 L404,392 Q388,392 388,376 Z', fill: GRI.su, 'fill-opacity': 0.9 }, s1);
    c.S('path', { d: 'M380,110 L380,380 Q380,400 400,400 L600,400 Q620,400 620,380 L620,110', fill: 'none', stroke: '#c9c9c9', 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, s1);
    [440, 500, 560].forEach((x) => ok(c, s1, [x, 478], [x, 428], GRI.acik, 5));
    yazi(c, s1, 500, 534, 'sıvı ısıtılıyor', { size: 28, kalin: 700 });
    // İki su molekülü.
    kureH2O(c, s2, 350, 250, 1.7); kureH2O(c, s2, 650, 250, 1.7);
    yazi(c, s2, 500, 420, 'su molekülleri', { size: 30, kalin: 700 });
    gizle(s1, s2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Bir sıvı ısıtılırsa akışkanlığı nasıl değişir?',
      options: ['Azalır', 'Artar; daha kolay akar', 'Değişmez'], answer: 1,
      hints: ['Sıcaklık artınca moleküller arası etkileşim zayıflar; sıvı daha kolay akar.', '', 'Sıcaklık artınca moleküller arası etkileşim zayıflar; sıvı daha kolay akar.'],
      right: 'Evet. Isınan sıvı daha kolay akar.',
    });
    c.clearSay();
    await belir(c, s1, 400, 0);
    await belir(c, s2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Su molekülleri arasındaki etkileşim hangisidir?',
      options: ['London kuvveti', 'İyon-dipol', 'Hidrojen bağı'], answer: 2,
      hints: ['Su molekülünde O–H bağı var; moleküller arasında hidrojen bağı kurulur.', 'Su molekülünde O–H bağı var; moleküller arasında hidrojen bağı kurulur.', ''],
      right: 'Evet. O–H bağı olan moleküller arasında hidrojen bağı kurulur.',
    });
    await belir(c, s2, 400, 0);
    await c.say('Bugün sıvıların yüzeylerle nasıl çekiştiğine bakacağız.');
  }

  /* ---- 2. Aynı su, iki kumaş ---- */
  async function kumaslar(c) {
    const svg = c.svg(1000, 562);
    const L = damlaYuzey(c, svg, { cx: 250, y: 330, w: 360, ad: 'yağmurluk', doku: 'kumas', t: 0 });
    const R = damlaYuzey(c, svg, { cx: 750, y: 330, w: 360, ad: 'pamuklu tişört', doku: 'kumas', t: 0, islak: true });
    gizle(L.g, R.g);

    await par(c.say('Aynı su damlası iki kumaşa düşüyor: yağmurluk ve pamuklu tişört.'), belir(c, [L.g, R.g], 600));
    await c.say('Damlalar aynı büyüklükte; değişen yalnızca düştükleri kumaş.');
    await c.say('Yağmurda yağmurluk giyeriz; tişörtle çıkan ise ıslanır.');
    await c.choice({
      tag: 'Tahmin et', q: 'Damla hangi kumaşta yuvarlak kalır?',
      options: ['Pamuklu tişörtte', 'Yağmurlukta', 'İkisinde de'], answer: 1,
      hints: ['Tişörte düşen damlaya ne olduğunu düşün.', '', 'İki kumaş aynı davransaydı yağmurluk işe yaramazdı.'],
      right: 'Evet. Yağmurlukta damla top gibi durur.',
    });
    c.clearSay();
    await par(c.say('Yağmurlukta damla yuvarlak kalır; kumaşı ıslatmaz.'), c.wait(900));
    await par(c.say('Tişörtte damla yayılır; kumaşı ıslatır.'), R.git(1, 1500));
    await c.say('Aynı su iki kumaşta farklı davrandı; nedeni çekim kuvvetlerindedir.');
  }

  /* ---- 3. İki çekim: kohezyon ve adezyon ---- */
  async function ikiCekim(c) {
    const svg = c.svg(1000, 562);
    const D = damlaYuzey(c, svg, { cx: 190, y: 300, w: 300, ad: 'yaprak', doku: 'yaprak', t: 0 });
    const B = buyutme(c, svg, { cx: 650, cy: 280, sivi: 'su', yuzey: 'yaprak', koh: 'kalin', adh: 'ince' });
    const bag = [cizgi(c, svg, [244, 296], [498, 173], RENK.ince, 2, { 'stroke-dasharray': '4 6' }), cizgi(c, svg, [244, 296], [498, 387], RENK.ince, 2, { 'stroke-dasharray': '4 6' })];
    gizle(B.kohG, B.adhG, B.et.koh, B.et.adh, B.g, D.g, ...bag);
    const sat = c.S('g', {}, svg);
    yazi(c, sat, 40, 452, 'damla yuvarlak → kohezyon', { hiza: 'start', size: 26, kalin: 600 });
    const q2 = renkli(c, sat, 40, 494, ['damla yaprağa yapışır → ', ['?', RENK.vurgu]], { hiza: 'start', size: 26, kalin: 600 });
    gizle(sat);

    await par(c.say('Yaprağın üzerindeki su damlası yuvarlaktır ve yaprağa yapışır.'), belir(c, [D.g, B.g, ...bag], 600));
    await par(c.say('Aynı tür moleküllerin birbirini çekmesine kohezyon denir.'), belir(c, [B.kohG, B.et.koh], 600));
    await par(c.say('Farklı maddelerin tanecikleri arasındaki çekime adezyon denir.'), belir(c, [B.adhG, B.et.adh], 600));
    await c.say('Damlanın yuvarlak olması kohezyondan, yapışması adezyondan gelir.');

    // Birlikte çöz.
    c.clearSay();
    await belir(c, sat, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Damlanın yaprağa yapışması hangi kuvvetten gelir?',
      options: ['Kohezyon', 'İkisinden de değil', 'Adezyon'], answer: 2,
      hints: ['Aynı tür moleküller arasındaki çekim kohezyondu.', 'Yapışma bir çekimdir; hangi iki taneciğin arasında?', ''],
      right: 'Evet. Yaprak ile su farklı maddelerdir; aralarındaki çekim adezyondur.',
    });
    q2.textContent = ''; c.S('tspan', { text: 'damla yaprağa yapışır → ' }, q2); const ad = c.S('tspan', { text: 'adezyon' }, q2); ad.style.fill = RENK.cekme;
    await c.wait(500);

    // Soru: bal damlası (yalnızca kohezyon).
    c.clearSay();
    await belir(c, [sat, B.g, D.g, ...bag], 400, 0);
    const bal = c.S('g', {}, svg), bm = [[500, 270]];
    for (let i = 0; i < 6; i++) bm.push([500 + 62 * Math.cos(i * Math.PI / 3), 270 + 62 * Math.sin(i * Math.PI / 3)]);
    bm.forEach((P, i) => bm.forEach((Q, j) => { if (j > i && Math.hypot(P[0] - Q[0], P[1] - Q[1]) < 70) cizgi(c, bal, P, Q, RENK.cekme, 4); }));
    bm.forEach((P) => c.S('circle', { cx: P[0], cy: P[1], r: 20, fill: GRI.su, stroke: GRI.suK, 'stroke-width': 2 }, bal));
    yazi(c, bal, 500, 400, 'bal damlası', { size: 28, kalin: 700 });
    const balEt = yazi(c, bal, 500, 446, 'kohezyon', { size: 26, kalin: 700, renk: RENK.cekme });
    gizle(bal, balEt);
    await belir(c, bal, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir bal damlasının molekülleri birbirini çekiyor. Bu çekim hangisidir?',
      options: ['Adezyon', 'Kohezyon', 'İkisi de'], answer: 1,
      hints: ['Farklı madde ya da yüzey yok; adezyon farklı maddeler arasındadır.', '', 'Burada yalnızca aynı tür moleküller var.'],
      right: 'Evet. Aynı tür moleküller arası çekim kohezyondur.',
    });
    await par(c.say('Bal damlasında moleküller yalnızca birbirini çeker: kohezyon.'), belir(c, balEt, 450));

    // Gör: iki çeşit çizgi birlikte.
    c.clearSay();
    await belir(c, bal, 400, 0);
    await par(belir(c, [D.g, B.g, ...bag], 500, 1), belir(c, sat, 400, 0));
    await c.say('Yapraktaki damlada iki çekim birlikte vardır.');
    c.note('<b>Kohezyon: aynı tür moleküller arası. Adezyon: farklı madde arası.</b> Örnek: yaprak.', 'Kohezyon ve adezyon', 'kohezyon-adezyon');
  }

  /* ---- 4. Islatan ve ıslatmayan sıvı ---- */
  async function islatan(c) {
    const svg = c.svg(1000, 562);
    const panel = (cx, t) => {
      const g = c.S('g', {}, svg);
      const d = damlaYuzey(c, g, { cx, y: 215, w: 360, ad: 'cam', t });
      const cb = kuvvetCubuklari(c, g, { x: cx, y: 490, h: 150 });
      return { g, d, cb };
    };
    const P1 = panel(250, 0), P2 = panel(750, 0);
    const et1 = yazi(c, P1.g, 250, 78, 'ıslatır', { size: 32, kalin: 700 }), et2 = yazi(c, P2.g, 750, 78, 'ıslatmaz', { size: 32, kalin: 700 });
    gizle(P1.g, P2.g, et1, et2);

    await par(c.say('Adezyon kohezyondan büyükse sıvı yüzeyde yayılır.'), (async () => {
      await belir(c, P1.g, 400);
      await par(P1.d.git(1, 1300), P1.cb.git(BUYUK, KUCUK + 0.05, 1300));
    })());
    await par(c.say('Yayılan sıvı yüzeyi ıslatır.'), belir(c, et1, 450));
    await par(belir(c, P1.g, 400, 0.28), belir(c, P2.g, 400));
    await par(c.say('Kohezyon adezyondan büyükse sıvı damlacık olarak kalır.'), P2.cb.git(KUCUK + 0.05, BUYUK, 1300));
    await par(c.say('Damlacık kalan sıvı yüzeyi ıslatmaz.'), belir(c, et2, 450));

    // Birlikte çöz: yayılan su damlası, çubuklar boş.
    c.clearSay();
    await par(belir(c, P2.g, 400, 0), belir(c, P1.g, 400, 1), belir(c, et1, 300, 0));
    await P1.cb.git(0, 0, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Su camda yayılıyor. Hangi kuvvet büyüktür?',
      options: ['Su moleküllerinin kohezyonu', 'İkisi eşit', 'Su ile cam arasındaki adezyon'], answer: 2,
      hints: ['Yayılan sıvıda hangi kuvvet baskındı?', 'Eşit olsaydı sıvı ne yayılır ne yuvarlak kalırdı.', ''],
      right: 'Evet. Cam ile su farklı maddelerdir; yayılma adezyonun büyük olduğunu gösterir.',
    });
    await P1.cb.git(BUYUK, KUCUK + 0.05, 900);
    await c.wait(500);

    // Gör: su ve cam taneciklerine kadar büyütme.
    c.clearSay();
    await belir(c, P1.g, 400, 0);
    const B1 = buyutme(c, svg, { cx: 500, cy: 280, sivi: 'su', yuzey: 'cam', koh: 'ince', adh: 'kalin' });
    gizle(B1.g);
    await par(c.say('Camda su molekülleri, birbirinden çok camın taneciklerine çekilir.'), belir(c, B1.g, 600));
    await c.wait(600);

    // Soru: cıva camda damla kalıyor.
    c.clearSay();
    await belir(c, B1.g, 400, 0);
    // Cıva damlası: cam yüzeyin üstünde, çubuklar boş.
    const G3 = c.S('g', {}, svg);
    const d3 = damlaYuzey(c, G3, { cx: 500, y: 215, w: 360, ad: 'cam', sivi: 'civa', t: 0 });
    const cb3 = kuvvetCubuklari(c, G3, { x: 500, y: 490, h: 150 });
    yazi(c, G3, 500, 78, 'cıva', { size: 32, kalin: 700 });
    gizle(G3);
    await belir(c, G3, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Cıva cam yüzeyde yayılmayıp damla kalıyor. Hangisi doğrudur?',
      options: ['Cam ile cıva arasındaki adezyon, kohezyondan büyüktür', 'Cıva atomları arasındaki kohezyon, cam ile adezyondan büyüktür', 'İkisi eşittir'], answer: 1,
      hints: ['Damla kalan sıvıda hangi kuvvet baskındı?', '', 'Eşit olsaydı kapta yüzey düz kalırdı; cıva ise damla kalıyor.'],
      right: 'Evet. Cıva yüzeyi ıslatmıyor; kohezyon baskın.',
    });
    await cb3.git(KUCUK + 0.05, BUYUK, 900);
    await c.wait(500);

    // Gör: cıva atomları ve cam.
    c.clearSay();
    await belir(c, G3, 400, 0);
    const B2 = buyutme(c, svg, { cx: 500, cy: 280, sivi: 'civa', yuzey: 'cam', koh: 'kalin', adh: 'ince' });
    gizle(B2.g);
    await par(c.say('Cıva atomları birbirini, camın taneciklerinden daha çok çeker.'), belir(c, B2.g, 600));
    await c.say('Islatmayan sıvıda da adezyon vardır; yalnızca kohezyondan küçüktür.');
  }

  /* ---- 5. Kapta yüzey: içbükey ve dışbükey ---- */
  async function kapta(c) {
    const svg = c.svg(1000, 562);
    const TOP = 120, TH = 190, BASE = 480;
    // Önce tek tüp: yüzey düz, sonra kenarlardan eğilir.
    const tek = c.S('g', {}, svg);
    const t0 = tup(c, tek, { x: 500, y: 150, h: 240, w: 110, e: 0, dolgu: 0.5 });
    gizle(tek);
    // Üç tüp ve altlarında çubuklar.
    const sutun = (x, e, sivi, a, k) => {
      const g = c.S('g', {}, svg);
      const t = tup(c, g, { x, y: TOP, h: TH, w: 84, e, sivi, dolgu: 0.55 });
      const cb = kuvvetCubuklari(c, g, { x, y: BASE, h: 130 });
      cb.ayarla(a, k);
      gizle(g);
      return { g, t, cb };
    };
    const S1 = sutun(170, -0.95, 'civa', KUCUK + 0.05, BUYUK), S2 = sutun(500, 0, 'su', ORTA, ORTA), S3 = sutun(830, 0.95, 'su', BUYUK, KUCUK + 0.05);
    const ad1 = yazi(c, svg, 170, 84, 'dışbükey', { size: 28, kalin: 700 }), ad2 = yazi(c, svg, 500, 84, 'düz', { size: 28, kalin: 700 }), ad3 = yazi(c, svg, 830, 84, 'içbükey', { size: 28, kalin: 700 });
    gizle(ad1, ad2, ad3);

    await par(c.say('Dar cam tüpte sıvının yüzeyi kenarlardan eğilir.'), (async () => {
      await belir(c, tek, 500);
      await t0.git(0.9, 1400);
    })());
    await c.wait(400);
    await belir(c, tek, 400, 0);
    await par(c.say('Kohezyon büyükse yüzey dışa doğru kavislenir: dışbükey.'), belir(c, [S1.g, ad1], 600));
    await par(c.say('Adezyon büyükse yüzey içe doğru kavislenir: içbükey.'), belir(c, [S3.g, ad3], 600));
    await par(c.say('Kuvvetler eşitse sıvı yüzeyi düz kalır.'), belir(c, [S2.g, ad2], 600));

    // Birlikte çöz: cıva tüpü dolu, su tüpü boş.
    c.clearSay();
    await par(belir(c, S2.g, 400, 0), belir(c, ad2, 400, 0), belir(c, ad1, 300, 0), belir(c, ad3, 300, 0));
    const ya = yazi(c, svg, 170, 84, 'dışbükey → kohezyon büyük', { size: 22, kalin: 700 }), yb = yazi(c, svg, 830, 84, 'içbükey → ?', { size: 24, kalin: 700 });
    const na = yazi(c, svg, 170, 336, 'cıva', { size: 24, kalin: 600 }), nb = yazi(c, svg, 830, 336, 'su', { size: 24, kalin: 600 });
    gizle(ya, yb, na, nb);
    await par(S3.cb.git(0, 0, 400), belir(c, [ya, yb, na, nb], 450));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Su cam tüpte içbükey duruyor. Hangi kuvvet büyüktür?',
      options: ['Kohezyon', 'Adezyon', 'İkisi eşit'], answer: 1,
      hints: ['Cıvada kohezyon büyüktü ve yüzey dışbükeydi.', '', 'Eşitse yüzey düz kalırdı.'],
      right: 'Evet. İçbükey, içe doğru kavis demekti; adezyon büyük.',
    });
    yb.textContent = 'içbükey → adezyon büyük';
    await S3.cb.git(BUYUK, KUCUK + 0.05, 900);
    await c.wait(500);

    // Soru: yayılan sıvı tüpte nasıl durur?
    c.clearSay();
    await belir(c, svg, 450, 0);
    svg.remove();
    const s2 = c.svg(1000, 562);
    const dd = damlaYuzey(c, s2, { cx: 260, y: 330, w: 380, ad: 'cam', t: 1 });
    const tt = tup(c, s2, { x: 740, y: 140, h: 220, w: 96, e: 0, dolgu: 0.55 });
    yazi(c, s2, 740, 104, 'cam tüp', { size: 26, kalin: 600 });
    const yzTxt = yazi(c, s2, 740, 410, '', { size: 28, kalin: 700 });
    gizle(dd.g, tt.g);
    await belir(c, [dd.g, tt.g], 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir sıvı cam yüzeyde yayılıyor. Aynı sıvı cam tüpte nasıl durur?',
      options: ['Dışbükey', 'Düz', 'İçbükey'], answer: 2,
      hints: ['Yayılan sıvıda hangi kuvvet baskın?', 'Düz yüzey, iki kuvvetin eşit olduğu durumdur.', ''],
      right: 'Evet. Adezyon büyükse yüzey içe kavislenir.',
    });
    await par(c.say('Yayılan sıvı, tüpte içbükey durur.'), tt.git(0.95, 1300));
    yzTxt.textContent = 'içbükey'; yzTxt.style.opacity = 1;
    await c.wait(500);

    // Dene: kaydırıcı. Adezyon üç düzeyde, kohezyon sabit.
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();
    const s3 = c.svg(1000, 562);
    const cb = kuvvetCubuklari(c, s3, { x: 170, y: 480, h: 150 });
    const gd = c.S('g', {}, s3), dm = damlaYuzey(c, gd, { cx: 500, y: 350, w: 260, ad: 'cam', t: 0 });
    const durum = yazi(c, s3, 500, 190, 'ıslatmaz', { size: 30, kalin: 700 });
    const tp = tup(c, s3, { x: 830, y: 140, h: 200, w: 90, e: -0.95, dolgu: 0.55 });
    const tad = yazi(c, s3, 830, 392, 'dışbükey', { size: 28, kalin: 700 });
    cb.ayarla(KUCUK + 0.05, ORTA);
    const DUR = [
      { ad: 'Küçük', a: KUCUK + 0.05, e: -0.95, t: 0, yaz: 'ıslatmaz', tup: 'dışbükey', damla: 1 },
      { ad: 'Kohezyonla eşit', a: ORTA, e: 0, t: 0.5, yaz: '', tup: 'düz', damla: 0.12 },
      { ad: 'Büyük', a: BUYUK, e: 0.95, t: 1, yaz: 'ıslatır', tup: 'içbükey', damla: 1 },
    ];
    let sira = 0; const goruldu = new Set([0]);
    const konumla = (v) => {
      const D = DUR[v], j = ++sira, a0 = cb.deger().a, e0 = tp.e, t0 = (dm.a - 50) / 100, op0 = +gd.style.opacity || 1;
      goruldu.add(v);
      durum.textContent = D.yaz; tad.textContent = D.tup;
      c.tween(700, (e) => {
        if (j !== sira) return;
        cb.ayarla(lerp(a0, D.a, e), ORTA); tp.ayarla(lerp(e0, D.e, e)); dm.ayarla(lerp(t0, D.t, e)); gd.style.opacity = lerp(op0, D.damla, e);
      }, ease.inOut).catch((err) => { if (!(err instanceof Ders.Cancelled)) throw err; });
    };
    gizle(cb.g, gd, durum, tp.g, tad);
    await belir(c, [cb.g, gd, durum, tp.g, tad], 500);
    await c.say('Adezyonu değiştir; damlaya ve tüpteki yüzeye bak.', { noWait: true });
    const sl = c.slider({ tag: 'Dene', label: 'Cam ile adezyon', min: 0, max: 2, step: 1, value: 0, fmt: (v) => DUR[v].ad, onInput: (v) => { if (v !== 0 || sira) konumla(v); } });
    await c.cont('Devam ›');
    // Öğrenci üç konumu da görmediyse eksik konumları tahta kendisi gösterir.
    for (const v of [1, 2]) {
      if (!goruldu.has(v)) { sl.set(v); await c.wait(1500); }
    }
    c.clearAct();
    c.note('<b>Adezyon büyükse sıvı yayılır, içbükey durur; kohezyon büyükse damla kalır, dışbükey durur.</b>', 'Islatma ve yüzey', 'islatma-yuzey');
    await c.say('Yüzeyin eğriliği, hangi çekimin büyük olduğunu gösterir.');
  }

  /* ---- 6. Bu hangisi? ---- */
  async function hangisi(c) {
    const svg = c.svg(1000, 562);
    const ikon = (k, g) => {
      const s = (o) => damlaYuzey(c, g, Object.assign({ w: 150, th: 28, k: 0.8 }, o));
      const cx = 330, y = 178;
      if (k.ikon === 'cam-su') s({ cx, y, t: 1 });
      else if (k.ikon === 'cam-civa') s({ cx, y, t: 0, sivi: 'civa' });
      else if (k.ikon === 'tuy') s({ cx, y, t: 0, doku: 'yaprak' });
      else if (k.ikon === 'kumas') s({ cx, y, t: 1, doku: 'kumas', islak: true });
      else if (k.ikon === 'kagit') s({ cx, y, t: 0 });
      else tup(c, g, { x: cx, y: 70, h: 100, w: 50, e: 0, dolgu: 0.5 });
    };
    const kt = kartTahtasi(c, svg, {
      kutular: [
        { baslik: 'Adezyon büyük', x: 30, y: 300, w: 300, h: 240 },
        { baslik: 'Kohezyon büyük', x: 350, y: 300, w: 300, h: 240 },
        { baslik: 'İkisi eşit', x: 670, y: 300, w: 300, h: 240 },
      ],
      ciz: (k, g) => {
        kutu(c, g, 200, 30, 600, 220, { rx: 16 });
        ikon(k, g);
        k.satir.forEach((s, i) => yazi(c, g, 440, 118 + i * 38, s, { hiza: 'start', size: 26, kalin: 600 }));
      },
      chip: (k, p, x, y) => yazi(c, p, x, y, k.chip, { size: 22, kalin: 600 }),
    });
    await c.say('Her olayda adezyon ile kohezyon karşılaştırılır.', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Hangi kutuya girer?`, kutular: ['Adezyon büyük', 'Kohezyon büyük', 'İkisi eşit'],
      kartlar: [
        { metin: 'Su, cam yüzeyde yayılır.', satir: ['Su, cam yüzeyde', 'yayılır.'], ikon: 'cam-su', chip: 'su, camda', kutu: 0, neden: 'Yayılan sıvıda adezyon baskındır.', ipucu: 'Yayılan sıvıda hangi kuvvet baskındı?' },
        { metin: 'Cıva, cam yüzeyde damla kalır.', satir: ['Cıva, cam yüzeyde', 'damla kalır.'], ikon: 'cam-civa', chip: 'cıva, camda', kutu: 1, neden: 'Damla kalan sıvıda kohezyon baskındır.', ipucu: 'Damla kalan sıvıda hangi kuvvet baskındı?' },
        { metin: 'Suda yüzen ördeğin tüyleri ıslanmaz.', satir: ['Suda yüzen ördeğin', 'tüyleri ıslanmaz.'], ikon: 'tuy', chip: 'ördeğin tüyü', kutu: 1, neden: 'Suyun kohezyonu, su ile tüy arasındaki adezyondan büyüktür.', ipucu: 'Islanmayan yüzeyde hangi kuvvet baskın?' },
        { metin: 'Su, pamuklu tişörte yayılır ve kumaşı ıslatır.', satir: ['Su, pamuklu tişörtte', 'yayılır, kumaşı ıslatır.'], ikon: 'kumas', chip: 'su, tişört', kutu: 0, neden: 'Kumaş suyu kendine çeker; adezyon kohezyondan büyüktür.', ipucu: 'Islatan sıvıda hangi kuvvet baskın?' },
        { metin: 'Su, yağlı kâğıt üzerinde damlalar hâlinde durur.', satir: ['Su, yağlı kâğıtta', 'damlalar hâlinde durur.'], ikon: 'kagit', chip: 'su, yağlı kâğıt', kutu: 1, neden: 'Yağlı kâğıt apolar bir yüzeydir; su ile adezyonu küçüktür.', ipucu: 'Damla kalan sıvıda hangi kuvvet baskın?' },
        { metin: 'Cam tüpte sıvının yüzeyi düz kalıyor.', satir: ['Cam tüpte sıvının', 'yüzeyi düz kalıyor.'], ikon: 'tup', chip: 'düz yüzey', kutu: 2, neden: 'Kuvvetler eşitse yüzey düz kalır.', ipucu: 'Düz yüzey hangi durumda görülür?' },
      ],
      sec: kt.sec, yerlestir: kt.yerlestir,
    });
    await c.say('Yüzeyin ve damlanın biçimi, baskın çekimi ele verir.');
  }

  /* ---- 7. Çıkarımını bilim insanlarınınkiyle karşılaştır ---- */
  async function karsilastir(c) {
    const svg = c.svg(1000, 562);
    // Gözlem tablosu (sol).
    const tab = c.S('g', {}, svg), X = [30, 140, 250], Y0 = 90, SAT = 62;
    const hucre = (x, y, m, o = {}) => yazi(c, tab, x, y, m, Object.assign({ hiza: 'start', size: 24, kalin: 600 }, o));
    hucre(X[0], Y0, 'sıvı', { renk: RENK.soluk }); hucre(X[1], Y0, 'yüzey', { renk: RENK.soluk }); hucre(X[2], Y0, 'gözlem', { renk: RENK.soluk });
    cizgi(c, tab, [24, Y0 + 16], [540, Y0 + 16], RENK.kenarlik, 2);
    [['su', 'cam', 'yayılır, tüpte içbükey'], ['cıva', 'cam', 'damla kalır, tüpte dışbükey']].forEach(([s, y, g], i) => {
      hucre(X[0], Y0 + SAT * (i + 1), s); hucre(X[1], Y0 + SAT * (i + 1), y); hucre(X[2], Y0 + SAT * (i + 1), g);
      cizgi(c, tab, [24, Y0 + SAT * (i + 1) + 22], [540, Y0 + SAT * (i + 1) + 22], RENK.kenarlik, 1.5);
    });
    gizle(tab);
    // Bilim insanları (sağ).
    const bil = c.S('g', {}, svg), BX = 640;
    kutu(c, bil, BX - 20, 52, 350, 360, { rx: 14 });
    yazi(c, bil, BX, 94, 'Bilim insanları', { hiza: 'start', size: 26, kalin: 700 });
    const satirlar = [['adezyon > kohezyon:', 'yayılır, içbükey'], ['kohezyon > adezyon:', 'damla kalır, dışbükey'], ['eşit:', 'yüzey düz']].map(([a, b], i) => {
      const g = c.S('g', {}, bil), y = 150 + i * 84;
      yazi(c, g, BX, y, a, { hiza: 'start', size: 24, kalin: 700, renk: RENK.cekme });
      yazi(c, g, BX, y + 32, b, { hiza: 'start', size: 24, kalin: 600 });
      g.style.opacity = 0; return { g, y };
    });
    gizle(bil);
    // Öğrencinin kuralı (sol alt).
    const sen = c.S('g', {}, svg);
    yazi(c, sen, 30, 296, 'Senin kuralın', { hiza: 'start', size: 26, kalin: 700 });
    yazi(c, sen, 30, 340, 'yayılır, içbükey → adezyon büyük', { hiza: 'start', size: 22, kalin: 600 });
    yazi(c, sen, 30, 378, 'damla kalır, dışbükey → kohezyon büyük', { hiza: 'start', size: 22, kalin: 600 });
    gizle(sen);

    await par(c.say('Su ve cıva gözlemlerinden ortak bir kural çıkaralım.'), belir(c, tab, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'İki gözlemden hangi kural çıkar?',
      options: ['Yayılan sıvıda kohezyon, damla kalan sıvıda adezyon büyüktür', 'İkisinde de kuvvetler hep eşittir', 'Yayılan ve içbükey duran sıvıda adezyon, damla kalan ve dışbükey duran sıvıda kohezyon büyüktür'], answer: 2,
      hints: ['Su yayılıyordu; hangi kuvvet baskındı?', 'Eşit olsaydı yüzey düz kalırdı.', ''],
      right: 'Evet. Yayılma ve içbükeylik adezyonu, damla kalma ve dışbükeylik kohezyonu gösterir.',
    });
    c.clearSay();
    await par(belir(c, sen, 450), belir(c, bil, 450));
    await par(c.say('Bilim insanları da aynı kurala varmıştır.'), (async () => {
      await belir(c, satirlar[0].g, 450); await belir(c, satirlar[1].g, 450);
      [0, 1].forEach((i) => { const m = isaret(c, svg, BX + 290, satirlar[i].y + 14, 'ok', 14); });
    })());
    await par(c.say('Kuvvetler eşitse yüzey düz kalır; kural bunu da kapsar.'), belir(c, satirlar[2].g, 500));
  }

  /* ---- 8. Başa dön: yağmurluk ve tişört ---- */
  async function basaDon(c) {
    const svg = c.svg(1000, 562);
    const kolon = (cx, ad, t, a, doku) => {
      const g = c.S('g', {}, svg);
      const d = damlaYuzey(c, g, { cx, y: 190, w: 360, ad, doku: 'kumas', t, islak: true });
      const cb = kuvvetCubuklari(c, g, { x: cx, y: 490, h: 150 });
      return { g, d, cb };
    };
    const Y = kolon(250, 'yağmurluk', 0), T = kolon(750, 'pamuklu tişört', 1);
    gizle(Y.g, T.g);
    const sabitK = ORTA + 0.03;

    await par(c.say('Su aynıdır; suyun kohezyonu iki kumaşta da aynıdır.'), (async () => {
      await belir(c, [Y.g, T.g], 500);
      await par(Y.cb.git(0, sabitK, 1000), T.cb.git(0, sabitK, 1000));
    })());
    await par(c.say('Değişen, kumaşla su arasındaki adezyondur.'), par(Y.cb.git(KUCUK, sabitK, 1000), T.cb.git(BUYUK, sabitK, 1000)));
    await c.say('Tişörtte adezyon büyüktür: su yayılır, kumaş ıslanır.');
    await c.say('Yağmurlukta adezyon küçüktür: damla yuvarlak kalır.');

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir üretici ıslanmayan bir kıyafet tasarlıyor. Kumaş ile su arasındaki adezyon, suyun kohezyonuna göre nasıl olmalı?',
      options: ['Daha büyük', 'Eşit', 'Daha küçük'], answer: 2,
      hints: ['Islatan sıvıda adezyon büyüktü; su kumaşta yayılmasın istiyoruz.', 'Eşit olsaydı kumaşta yüzey düz kalırdı; damla yuvarlak kalmaz.', ''],
      right: 'Evet. Adezyon küçükse su kumaşta damla kalır.',
    });
    await c.say('Islanmayan kumaşta damla kalır; ıslanan kumaşta su yayılır.');
  }

  Ders.start({
    id: 'cesitlilik-l1', kicker: 'Konu L · Adezyon ve kohezyon', title: 'Kohezyon ve adezyon: ıslatır mı, ıslatmaz mı?', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Kohezyon ve adezyon: ıslatır mı, ıslatmaz mı?',
      hook: 'Yağmurluk ıslanmaz, pamuklu tişört ıslanır; fark suda mı, kumaşta mı?',
      button: 'Derse başla ›',
    },
    goals: [
      'Kohezyon ile adezyonu birbirinden ayırır.',
      'Adezyon ve kohezyonun büyüklüğüne göre sıvının yayılıp yayılmayacağını söyler.',
      'Dar tüpte sıvı yüzeyinin içbükey, düz ya da dışbükey olmasını bu kuvvetlerle açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Sıcaklığın akışkanlığa etkisini ve suyun etkileşimini hatırla.', run: hatirla },
      { title: 'Aynı su, iki kumaş', goal: 'Aynı su damlasının iki kumaştaki davranışını gör.', run: kumaslar },
      { title: 'İki çekim: kohezyon ve adezyon', goal: 'Kohezyonu ve adezyonu tanecik düzeyinde ayır.', run: ikiCekim },
      { title: 'Islatan ve ıslatmayan sıvı', goal: 'Hangi kuvvet baskınsa sıvının nasıl davrandığını gör.', run: islatan },
      { title: 'Kapta yüzey: içbükey ve dışbükey', goal: 'Dar tüpte yüzeyin eğriliğini kuvvetlerle ilişkilendir.', run: kapta },
      { title: 'Bu hangisi?', goal: 'Olayları baskın çekime göre sınıflandır.', run: hangisi },
      { title: 'Çıkarımını bilim insanlarınınkiyle karşılaştır', goal: 'Gözlemlerden kural çıkar ve karşılaştır.', run: karsilastir },
      { title: 'Başa dön: yağmurluk ve tişört', goal: 'Yağmurluk ve tişört farkını adezyonla açıkla.', run: basaDon },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kohezyon nedir?',
        options: ['Farklı maddelerin tanecikleri arasındaki çekim', 'Aynı tür moleküllerin birbirini çekmesi', 'Bir molekülün içindeki atomları tutan kovalent bağ'], answer: 1,
        why: ['Bu tanım adezyona aittir; kohezyonda moleküller aynı türdendir.', 'Kohezyon, aynı tür moleküllerin birbirine uyguladığı çekimdir.', 'Kovalent bağ molekülün içindedir; kohezyon moleküller arasındadır.'], scene: 2 },
      { q: 'Bir sıvı bir yüzeyde damlacıklar hâlinde kalıyor. Hangisi doğrudur?',
        options: ['Adezyon kohezyondan büyüktür; yüzey ıslanır', 'Kuvvetler eşittir', 'Kohezyon adezyondan büyüktür; yüzey ıslanmaz'], answer: 2,
        why: ['Adezyon büyük olsaydı sıvı yayılırdı.', 'Kuvvetler eşitse tüpte yüzey düz kalır; damla kalmaz.', 'Damla kalan sıvıda kohezyon baskındır ve yüzey ıslanmaz.'], scene: 3 },
      { q: 'Yaprağın üzerinde duran su damlası yuvarlaktır. Hangisi doğrudur?',
        options: ['Yalnızca kohezyon vardır; yaprakla çekim yoktur', 'Hem kohezyon hem adezyon vardır; kohezyon daha büyüktür', 'Yalnızca adezyon vardır'], answer: 1,
        why: ['Damla yaprağa yapışır; yani yaprakla çekim, adezyon vardır.', 'Yuvarlaklık kohezyonun, yapışma adezyonun işaretidir; kohezyon daha büyüktür.', 'Damla yuvarlak olduğuna göre kohezyon da vardır.'], scene: 2 },
      { q: 'Bir sıvı dar cam tüpte içbükey duruyor. Hangisi doğrudur?',
        options: ['Kohezyon adezyondan büyüktür', 'Kuvvetler eşittir', 'Adezyon kohezyondan büyüktür'], answer: 2,
        why: ['Kohezyon büyükse yüzey dışbükey olurdu.', 'Kuvvetler eşitse yüzey düz kalırdı.', 'İçbükey yüzey, adezyonun kohezyondan büyük olduğunu gösterir.'], scene: 4 },
      { q: 'Bir sıvı camda damla kalıyor, ama başka bir malzemede yayılıyor. Hangisi doğrudur?',
        options: ['Bu malzeme ile sıvı arasındaki adezyon, camdakinden büyüktür', 'Sıvının kohezyonu bu malzemede küçülmüştür', 'Bu malzemede sıvıyla hiç adezyon yoktur'], answer: 0,
        why: ['Sıvı aynı, kohezyon aynı; yayılması bu malzemede adezyonun daha büyük olduğunu gösterir.', 'Sıvının kendi molekülleri değişmedi; değişen yüzeydir.', 'Yayılan sıvı yüzeye çekilir; adezyon vardır.'], scene: 7 },
    ],
    summary: [
      'Kohezyon aynı tür moleküller, adezyon farklı maddeler arasındaki çekimdir.',
      'Adezyon büyükse sıvı yayılır ve içbükey durur.',
      'Kohezyon büyükse damla kalır ve dışbükey durur.',
      '<b>Adezyon baskınsa sıvı yayılır, kohezyon baskınsa damla kalır.</b>',
    ],
    nextLesson: { href: 'l2-yuzey-gerilimi-kilcallik.html', label: 'Sonraki: Yüzey gerilimi ve kılcallık ›' },
  });
})();
