/* C6 — |f(x)| < k ve |f(x)| > k
   Küçüktür tek aralık, büyüktür iki ayrı aralık verir; k = 0 hâlleri.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, serit, alan, etiket } = window.KIT;
  const { lerp, ease } = Ders;

  /* t(x) = |x − 4| için düzlem: birimler kare (56 birim). */
  const DZ = { x0: 56, y0: 92, w: 560, h: 392, xmin: -1, xmax: 9, ymin: -1, ymax: 6, xsayi: 2, ysayi: 2 };
  const SAG = 812;   // sağ sütunun ortası
  const V = (dz) => mutlakNoktalar(dz, 1, -4);

  /* (x, y) noktasından x eksenine inen kesik çizgi. */
  const dusey = (dz, x, y) => S('line', { x1: dz.X(x), y1: dz.Y(y), x2: dz.X(x), y2: dz.Y(0), stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
  const cizgiAdi = (dz, k) => etiket(dz, 8.9, k, 'y = ' + sayi(k), { hiza: 'end', dy: 28, renk: RENK.g });

  /* Sayı doğrusu (yerel; kitte yok). o: { x1, x2, y, min, max }. Döner: { g, X, bant(a, b), isin(a, yon, dy), uc(v, bos), ad(v) } */
  function sayiDogrusu(p, o) {
    const g = S('g', {}, p), X = (v) => o.x1 + ((v - o.min) / (o.max - o.min)) * (o.x2 - o.x1), y = o.y;
    S('line', { x1: o.x1 - 22, y1: y, x2: o.x2 + 22, y2: y, stroke: RENK.eksen, 'stroke-width': 2.5 }, g);
    S('path', { d: `M${o.x2 + 32},${y} l-11,-6 v12 z`, fill: RENK.eksen }, g);
    S('path', { d: `M${o.x1 - 32},${y} l11,-6 v12 z`, fill: RENK.eksen }, g);
    for (let v = o.min; v <= o.max; v++) S('line', { x1: X(v), y1: y - 6, x2: X(v), y2: y + 6, stroke: RENK.eksen, 'stroke-width': 2 }, g);
    const ust = S('g', {}, g);
    return {
      g, X,
      bant: (a, b) => S('line', { x1: X(a), y1: y, x2: X(b), y2: y, stroke: RENK.sifir, 'stroke-width': 10, opacity: 0.9 }, ust),
      /* a'dan sola (yon −1) ya da sağa (yon 1) giden ince ışın; dy kadar yukarıda çizilir. */
      isin(a, yon, dy = 0) {
        const son = yon > 0 ? o.x2 + 18 : o.x1 - 18, gg = S('g', {}, ust);
        S('line', { x1: X(a), y1: y - dy, x2: son, y2: y - dy, stroke: RENK.sifir, 'stroke-width': dy ? 4 : 10, opacity: dy ? 0.6 : 0.9, 'stroke-linecap': 'butt' }, gg);
        return gg;
      },
      uc: (v, bos = true) => S('circle', { cx: X(v), cy: y, r: 8, fill: bos ? RENK.tahta : RENK.sifir, stroke: RENK.sifir, 'stroke-width': bos ? 3.5 : 0 }, g),
      ad: (v) => yazi(g, X(v), y + 38, sayi(v), { size: 24, renk: RENK.sifir }),
    };
  }

  /* ---- 1. Küçüktür: altta kalan ---- */
  async function kucuktur(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const v = kirik(dz, V(dz));
    const cizgi = dogru(dz, 0, 2, { renk: RENK.g }), cizgiAd = cizgiAdi(dz, 2);
    const alt = kirik(dz, [[2, 2], [4, 0], [6, 2]], { kalin: 9 });
    const d1 = dusey(dz, 2, 2), d2 = dusey(dz, 6, 2);
    const s = serit(dz, 'x', 4, 4);
    const k1 = nokta(dz, 2, 2, { bos: true, r: 7 }), k2 = nokta(dz, 6, 2, { bos: true, r: 7 });
    const u1 = nokta(dz, 2, 0, { bos: true }), u2 = nokta(dz, 6, 0, { bos: true });
    const kuralT = yazi(svg, SAG, 150, 't(x) = |x − 4|', { size: 34, renk: RENK.mutlak });
    const esit = yazi(svg, SAG, 290, '|x − 4| < 2', { size: 42, kalin: 700 });
    const cozum = yazi(svg, SAG, 360, '(2, 6)', { size: 42, kalin: 700, renk: RENK.sifir });
    gizle(v.el, cizgi.el, cizgiAd, alt.el, d1, d2, s.el, k1.el, k2.el, u1.el, u2.el, kuralT, esit, cozum);

    await par(soyle(c, 'Dolap 4 °C’de durmalı; sapma, sıcaklığın 4’e uzaklığıdır.'), (async () => { await ciz(c, v, 900); await belir(c, kuralT, 400); })());
    await par(soyle(c, 'Sapma 2’den az olmalı: sınırı yatay bir çizgi gösterir.'), (async () => { await ciz(c, cizgi, 700); await belir(c, cizgiAd, 300); })());
    await c.choice({
      tag: 'Tahmin et', q: 'V’nin hangi kısmı çizginin altında kalır?',
      options: ['İki kolun dış uçları', 'Ucun çevresi, kesişimlerin arası', 'Hiçbir kısmı'], answer: 1,
      hints: ['Dış uçlarda V çizginin üstüne çıkıyor.', '', 'V’nin ucu 0 yüksekliğinde, çizgi 2’de: uç altta.'],
      right: 'Ucun iki yanında, kesişimlere kadar V çizginin altında.',
    });
    await par(soyle(c, 'Altta kalan kısım, sapmanın 2’den küçük olduğu yerdir.'), (async () => { await belir(c, v.el, 300, 0.35); await ciz(c, alt, 800); await belir(c, esit, 400); })());
    await par(soyle(c, 'Bu kısmın x eksenindeki gölgesi tek parça.'), (async () => {
      await belir(c, [d1, d2], 350); s.el.style.opacity = 0.9;
      await c.tween(800, (e) => s.ayarla(lerp(4, 2, e), lerp(4, 6, e)), ease.inOut);
    })());
    await par(soyle(c, 'Uçlarda sapma tam 2: çözüme girmezler, noktalar boş.', { ton: 'thoughtful' }), (async () => {
      await par(pop(c, k1, dz.X(2), dz.Y(2), 320), pop(c, k2, dz.X(6), dz.Y(2), 320));
      await par(pop(c, u1, dz.X(2), dz.Y(0), 320), pop(c, u2, dz.X(6), dz.Y(0), 320));
      await belir(c, cozum, 400);
    })());
    await soyle(c, 'Dolap için uygun sıcaklık: 2 ile 6 derece arası.');
    c.note('|x − 4| &lt; 2 → (2, 6)', 'Küçüktür: tek aralık', 'c6-kucuktur');
  }

  /* ---- 2. Büyüktür: üstte kalan ---- */
  async function buyuktur(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const v = kirik(dz, V(dz));
    const cizgi = dogru(dz, 0, 2, { renk: RENK.g }), cizgiAd = cizgiAdi(dz, 2);
    const ust1 = kirik(dz, [[-1, 5], [2, 2]], { kalin: 9 }), ust2 = kirik(dz, [[6, 2], [9, 5]], { kalin: 9 });
    const d1 = dusey(dz, 2, 2), d2 = dusey(dz, 6, 2);
    const s1 = serit(dz, 'x', 2, 2), s2 = serit(dz, 'x', 6, 6);
    const u1 = nokta(dz, 2, 0, { bos: true }), u2 = nokta(dz, 6, 0, { bos: true });
    const esit = yazi(svg, SAG, 220, '|x − 4| > 2', { size: 42, kalin: 700 });
    const cozum = yazi(svg, SAG, 300, '(−∞, 2) ∪ (6, ∞)', { size: 34, kalin: 700, renk: RENK.sifir });
    gizle(ust1.el, ust2.el, d1, d2, s1.el, s2.el, u1.el, u2.el, esit, cozum);

    await par(soyle(c, 'Şimdi tersini sor: sapma 2’den büyük olsun.'), belir(c, esit, 400));
    await c.choice({
      tag: 'Tahmin et', q: '|x − 4| &gt; 2 eşitsizliğinin çözümü kaç parçadır?',
      options: ['Tek parça', 'İki ayrı parça', 'Çözüm yok'], answer: 1,
      hints: ['V çizginin üstüne iki ayrı yerde çıkıyor.', '', 'V’nin iki kolu da çizginin üstüne çıkıyor.'],
      right: 'V’nin çizginin üstünde kalan iki ayrı kolu var.',
    });
    await par(soyle(c, 'Çizginin üstünde iki ayrı kol var.'), (async () => { await belir(c, v.el, 300, 0.35); await par(ciz(c, ust1, 700), ciz(c, ust2, 700)); })());
    await par(soyle(c, 'Gölgeleri de iki parça: iki yana sonsuza uzar.'), (async () => {
      await belir(c, [d1, d2], 350); s1.el.style.opacity = 0.9; s2.el.style.opacity = 0.9;
      await c.tween(900, (e) => { s1.ayarla(lerp(2, -1, e), 2); s2.ayarla(6, lerp(6, 9, e)); }, ease.inOut);
      await par(pop(c, u1, dz.X(2), dz.Y(0), 320), pop(c, u2, dz.X(6), dz.Y(0), 320));
    })());
    await par(soyle(c, 'İki aralık birleşim işaretiyle birlikte yazılır.'), belir(c, cozum, 400));
    c.note('|x − 4| &gt; 2 → (−∞, 2) ∪ (6, ∞)', 'Büyüktür: iki ayrı aralık', 'c6-buyuktur');

    const koy = (k) => {
      cizgi.ayarla(0, k); yaz(cizgiAd, 'y = ' + sayi(k)); cizgiAd.setAttribute('y', dz.Y(k) + 28);
      ust1.ayarla([[-1, 5], [4 - k, k]]); ust2.ayarla([[4 + k, k], [9, 5]]);
      [[d1, 4 - k], [d2, 4 + k]].forEach(([d, x]) => { d.setAttribute('x1', dz.X(x)); d.setAttribute('x2', dz.X(x)); d.setAttribute('y1', dz.Y(k)); });
      s1.ayarla(-1, 4 - k); s2.ayarla(4 + k, 9); u1.git(4 - k, 0); u2.git(4 + k, 0);
      yaz(esit, '|x − 4| > ' + sayi(k)); yaz(cozum, '(−∞, ' + sayi(4 - k) + ') ∪ (' + sayi(4 + k) + ', ∞)');
    };
    await soyle(c, 'Sınırı değiştir: iki aralık nasıl kayıyor?', { noWait: true });
    c.slider({ label: 'k (sınır)', min: 1, max: 3, step: 1, value: 2, fmt: (x) => sayi(x), onInput: koy });
    await c.cont('Devam ›');
  }

  /* ---- 3. Cebirle ---- */
  async function cebirle(c) {
    const svg = c.svg(1000, 562);
    const SD = { x1: 250, x2: 750, y: 410, min: 0, max: 8 };

    // A: küçüktür
    const gA = S('g', {}, svg);
    const aBas = yazi(gA, 500, 120, '|x − 4| < 2', { size: 44, kalin: 700 });
    const a1 = yazi(gA, 500, 205, '−2 < x − 4 < 2', { size: 36 });
    const a2 = yazi(gA, 500, 285, '2 < x < 6', { size: 36, renk: RENK.sifir, kalin: 700 });
    const sdA = sayiDogrusu(gA, SD);
    const aI1 = sdA.isin(2, 1, 16), aI2 = sdA.isin(6, -1, 30), aBant = sdA.bant(2, 6);
    const aUc = [sdA.uc(2), sdA.uc(6)], aAd = [sdA.ad(2), sdA.ad(6)];
    gizle(aBas, a1, a2, sdA.g, aI1, aI2, aBant, aUc, aAd);

    await par(soyle(c, 'Mutlak değeri 2’den küçük olan sayılar −2 ile 2 arasındadır.'), (async () => { await belir(c, aBas, 400); await c.wait(500); await belir(c, a1, 450); })());
    await par(soyle(c, 'Her yana 4 ekle; x yalnız kalır.'), belir(c, a2, 450));
    await par(soyle(c, 'x hem 2’den büyük hem 6’dan küçük: bu bir <b>ve</b>.', { speak: 'x hem ikiden büyük hem altıdan küçük: bu bir “ve” durumu.', dur: true }), (async () => {
      await belir(c, [sdA.g, ...aAd], 350);
      await belir(c, aI1, 400); await belir(c, aI2, 400);
      await belir(c, [aBant, ...aUc], 450); await belir(c, [aI1, aI2], 300, 0.25);
    })());
    await c.wait(500);
    await kaybol(c, gA, 350);

    // B: büyüktür
    const gB = S('g', {}, svg);
    const bBas = yazi(gB, 500, 120, '|2x − 6| > 4', { size: 44, kalin: 700 });
    const b1 = [yazi(gB, 270, 205, '2x − 6 < −4', { size: 36 }), yazi(gB, 500, 205, 'ya da', { size: 28, renk: RENK.soluk, kalin: 500 }), yazi(gB, 730, 205, '2x − 6 > 4', { size: 36 })];
    const b2 = [yazi(gB, 270, 285, 'x < 1', { size: 36, renk: RENK.sifir, kalin: 700 }), yazi(gB, 730, 285, 'x > 5', { size: 36, renk: RENK.sifir, kalin: 700 })];
    const sdB = sayiDogrusu(gB, SD);
    const bI = [sdB.isin(1, -1), sdB.isin(5, 1)], bUc = [sdB.uc(1), sdB.uc(5)], bAd = [sdB.ad(1), sdB.ad(5)];
    gizle(bBas, b1, b2, sdB.g, bI, bUc, bAd);

    await par(soyle(c, 'Şimdi büyüktür: mutlak değer 4’ü aşıyor.'), belir(c, bBas, 400));
    await c.choice({
      tag: 'Tahmin et', q: '|2x − 6| &gt; 4 nasıl açılır?',
      options: ['−4 &gt; 2x − 6 &gt; 4', '2x − 6 &lt; −4 ya da 2x − 6 &gt; 4', '−4 &lt; 2x − 6 &lt; 4'], answer: 1,
      hints: ['Bir sayı hem −4’ten küçük hem 4’ten büyük olamaz.', '', 'Bu, mutlak değerin 4’ten küçük olduğu durumdur.'],
      right: 'İçteki sayı ya 4’ün üstünde ya −4’ün altındadır.',
    });
    await par(soyle(c, '4’ten büyük ya da −4’ten küçük: iki ayrı eşitsizlik.', { speak: 'Dörtten büyük ya da eksi dörtten küçük: iki ayrı eşitsizlik.' }), belir(c, b1, 450));
    await par(soyle(c, 'İkisini ayrı ayrı çöz.'), belir(c, b2, 450));
    await par(soyle(c, 'Birini sağlamak yeter: bu bir <b>veya</b>, çözüm iki parça.', { speak: 'Birini sağlamak yeter: bu bir “veya” durumu, çözüm iki parça.' }), (async () => {
      await belir(c, [sdB.g, ...bAd], 350); await belir(c, [bI[0], bUc[0]], 400); await belir(c, [bI[1], bUc[1]], 400);
    })());
    await c.wait(500);
    await kaybol(c, gB, 350);

    // karşılaştırma
    const gF = S('g', {}, svg), SF = { x1: 480, x2: 880, min: 0, max: 8 };
    yazi(gF, 70, 172, '|x − 4| < 2', { size: 38, kalin: 700, hiza: 'start' });
    yazi(gF, 70, 222, [['ve', RENK.sifir], ': tek aralık'], { size: 26, hiza: 'start', renk: RENK.soluk });
    const fA = sayiDogrusu(gF, Object.assign({ y: 170 }, SF)); fA.bant(2, 6); fA.uc(2); fA.uc(6); fA.ad(2); fA.ad(6);
    yazi(gF, 70, 392, '|2x − 6| > 4', { size: 38, kalin: 700, hiza: 'start' });
    yazi(gF, 70, 442, [['veya', RENK.sifir], ': iki aralık'], { size: 26, hiza: 'start', renk: RENK.soluk });
    const fB = sayiDogrusu(gF, Object.assign({ y: 390 }, SF)); fB.isin(1, -1); fB.isin(5, 1); fB.uc(1); fB.uc(5); fB.ad(1); fB.ad(5);
    gizle(gF);
    await par(soyle(c, 'Küçüktür bir <b>ve</b>, büyüktür bir <b>veya</b>dır.', { speak: '“Küçüktür” bir “ve” durumudur, “büyüktür” bir “veya” durumudur.' }), belir(c, gF, 500));
    c.note('Küçüktür <b>ve</b>: −k &lt; f(x) &lt; k<br>Büyüktür <b>veya</b>: iki ayrı eşitsizlik', 'Cebirle', 'c6-cebir');
  }

  /* ---- 4. k = 0 olunca ---- */
  async function kSifir(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const altBolge = alan(dz, [[-1, 0], [9, 0], [9, -1], [-1, -1]], { renk: RENK.eksi, op: 0.3 });
    const v = kirik(dz, V(dz)); v.el.style.opacity = 0.35;
    const vKalin = kirik(dz, V(dz), { kalin: 9 });
    const cizgi = dogru(dz, 0, 2, { renk: RENK.g }), cizgiAd = cizgiAdi(dz, 2);
    const alt = kirik(dz, [[2, 2], [4, 0], [6, 2]], { kalin: 9 });
    const s = serit(dz, 'x', 2, 6);
    const u1 = nokta(dz, 2, 0, { bos: true }), u2 = nokta(dz, 6, 0, { bos: true });
    const esit = yazi(svg, SAG, 170, '|x − 4| < 2', { size: 42, kalin: 700 });
    const cozum = yazi(svg, SAG, 235, '(2, 6)', { size: 42, kalin: 700, renk: RENK.sifir });
    const esit2 = yazi(svg, SAG, 350, '|x − 4| > 0', { size: 42, kalin: 700 });
    const cozum2 = yazi(svg, SAG, 415, 'ℝ ∖ {4}', { size: 42, kalin: 700, renk: RENK.sifir });
    gizle(altBolge.el, vKalin.el, esit2, cozum2);
    const koy = (k) => { cizgi.ayarla(0, k); alt.ayarla([[4 - k, k], [4, 0], [4 + k, k]]); s.ayarla(4 - k, 4 + k); u1.git(4 - k, 0); u2.git(4 + k, 0); };

    await par(soyle(c, 'Sınırı küçült: çizgi indikçe aralık daralır.'), (async () => {
      await kaybol(c, cizgiAd, 250);
      await c.tween(1300, (e) => koy(lerp(2, 1, e)), ease.inOut);
      yaz(esit, '|x − 4| < 1'); yaz(cozum, '(3, 5)');
    })());
    await par(soyle(c, 'Sınır 0 olunca çizgi x ekseninin üstüne oturur.'), (async () => {
      await c.tween(1300, (e) => koy(lerp(1, 0, e)), ease.inOut);
      yaz(esit, '|x − 4| < 0'); yaz(cozum, '?');
      await kaybol(c, [u1.el, u2.el, alt.el, s.el], 250); await belir(c, v.el, 300);
    })());
    await c.choice({
      tag: 'Tahmin et', q: '|x − 4| &lt; 0 eşitsizliğinin çözümü hangisidir?',
      options: ['Yalnızca 4', 'Çözüm yok', 'Her gerçek sayı'], answer: 1,
      hints: ['x = 4 için mutlak değer 0 olur; 0 &lt; 0 yanlıştır.', '', 'Mutlak değer hiçbir sayı için negatif olmaz.'],
      right: 'Mutlak değer negatif olmaz; 0’dan küçük değeri yoktur.',
    });
    yaz(cozum, '∅');
    await par(soyle(c, 'V eksenin altına hiç inmez: çözüm kümesi boş.', { speak: 'V grafiği eksenin altına hiç inmez: çözüm kümesi boş.' }), (async () => { await belir(c, altBolge.el, 500); await c.wait(900); await kaybol(c, altBolge.el, 500); })());
    await par(soyle(c, 'Şimdi işareti çevir: mutlak değer 0’dan büyük olsun.'), belir(c, esit2, 400));
    await c.choice({
      tag: 'Tahmin et', q: '|x − 4| &gt; 0 eşitsizliğinin çözümü hangisidir?',
      options: ['Her gerçek sayı', '4’ten büyük sayılar', '4 dışındaki her sayı'], answer: 2,
      hints: ['x = 4 için mutlak değer 0 olur; 0 &gt; 0 yanlıştır.', 'Sol kol da eksenin üstünde: x = 3 için mutlak değer 1.', ''],
      right: 'Mutlak değer yalnızca x = 4’te sıfırdır; öteki her yerde pozitiftir.',
    });
    await par(soyle(c, 'V, ucu dışında her yerde eksenin üstünde.', { speak: 'V grafiği, ucu dışında her yerde eksenin üstünde.' }), (async () => {
      await ciz(c, vKalin, 900); s.ayarla(4, 4); s.el.style.opacity = 0.9;
      await c.tween(900, (e) => s.ayarla(lerp(4, -1, e), lerp(4, 9, e)), ease.inOut);
    })());
    u1.git(4, 0);
    await par(soyle(c, 'Yalnızca 4 çözümde değil: orada mutlak değer 0.', { speak: 'Yalnızca dört sayısı çözümde değil: orada mutlak değer sıfır.', ton: 'thoughtful' }), (async () => { await pop(c, u1, dz.X(4), dz.Y(0), 350); await belir(c, cozum2, 400); })());
    c.note('|f(x)| &lt; 0: ∅<br>|f(x)| &gt; 0: f’nin sıfırı dışında her sayı', 'k = 0 olunca', 'c6-k-sifir');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c6', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: '|f(x)| < k ve |f(x)| > k', accent: '#ff8a5b', back: 'index.html',
    intro: { title: '|f(x)| < k ve |f(x)| > k', hook: 'Bir ilaç dolabının sıcaklığı 4 °C’den 2 dereceden az sapmalı. <b>Hangi sıcaklıklar uygundur?</b>', button: 'Derse başla ›' },
    goals: ['|f(x)| &lt; k eşitsizliğini grafikle ve cebirle çözer.', '|f(x)| &gt; k eşitsizliğinin iki ayrı aralık verdiğini görür.', 'k = 0 hâllerini yorumlar.'],
    scenes: [
      { title: 'Küçüktür: altta kalan', goal: 'Çizginin altında kalan kısmın tek aralık verdiğini gör.', run: kucuktur },
      { title: 'Büyüktür: üstte kalan', goal: 'Çizginin üstünde kalan iki kolun iki aralık verdiğini gör.', run: buyuktur },
      { title: 'Cebirle', goal: 'Küçüktürü “ve”, büyüktürü “veya” ile çöz.', run: cebirle },
      { title: 'k = 0 olunca', goal: 'Sınır 0 iken iki eşitsizliği yorumla.', run: kSifir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '|x − 1| &lt; 3 eşitsizliğinin çözüm kümesi hangisidir?', options: ['(−∞, −2) ∪ (4, ∞)', '(−2, 4)', '(−4, 2)'], answer: 1,
        why: ['Bu, |x − 1| &gt; 3 eşitsizliğinin çözümüdür; küçüktür tek aralık verir.', '−3 &lt; x − 1 &lt; 3; her yana 1 eklenince −2 &lt; x &lt; 4.', 'Her yana 1 eklenir, çıkarılmaz: −3 + 1 = −2 ve 3 + 1 = 4.'], scene: 2 },
      { q: '|x + 5| &gt; 0 eşitsizliğinin çözüm kümesi hangisidir?', options: ['ℝ', '∅', 'ℝ ∖ {−5}'], answer: 2,
        why: ['x = −5 için mutlak değer 0 olur; 0 &gt; 0 yanlıştır.', 'Mutlak değer −5 dışındaki her sayıda pozitiftir; çözüm boş değil.', '|x + 5| yalnızca x = −5’te sıfırdır; öteki her sayıda pozitiftir.'], scene: 3 },
    ],
    summary: [
      '<b>Küçüktür tek aralık, büyüktür iki ayrı aralık verir.</b>',
      '|f(x)| &lt; k: −k &lt; f(x) &lt; k. |f(x)| &gt; k: f(x) &gt; k ya da f(x) &lt; −k.',
      'k = 0 iken |f(x)| &lt; 0 çözümsüzdür; |f(x)| &gt; 0 ise f’nin sıfırı dışındaki her sayıdır.',
    ],
    nextLesson: { href: 'c7-mutlak-deger-esittir-dogru.html', label: 'Sonraki: |f(x)| = g(x) ›' },
  });
})();
