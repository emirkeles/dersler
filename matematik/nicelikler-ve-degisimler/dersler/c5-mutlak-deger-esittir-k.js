/* C5 — |f(x)| = k
   k > 0 iken iki çözüm, k = 0 iken tek çözüm (f'nin sıfırı), k < 0 iken çözüm yok.
   Bağlam: 500 gramlık paket ve sapma |x − 500|; grafikte t(x) = |2x − 6| ile y = k çizgisi.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, etiket, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const kesik = (p, renk) => S('line', { stroke: renk || RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, p);
  const dikey = (el, dz, x, y) => { el.setAttribute('x1', dz.X(x)); el.setAttribute('x2', dz.X(x)); el.setAttribute('y1', dz.Y(y)); el.setAttribute('y2', dz.Y(0)); };

  /* ---- 1. İki yol ---- */
  async function ikiYol(c) {
    const svg = c.svg(1000, 562);
    const X = (g) => 500 + (g - 500) * 19, Y0 = 290;
    S('line', { x1: 110, y1: Y0, x2: 890, y2: Y0, stroke: RENK.eksen, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    for (let g = 480; g <= 520; g += 5) { const b = g % 10 ? 6 : 11; S('line', { x1: X(g), y1: Y0 - b, x2: X(g), y2: Y0 + b, stroke: RENK.eksen, 'stroke-width': 2 }, svg); }
    const ad = {}; [490, 500, 510].forEach((g) => { ad[g] = yazi(svg, X(g), Y0 + 44, String(g), { size: 26, kalin: g === 500 ? 700 : 500, renk: g === 500 ? RENK.yazi : RENK.soluk }); });
    // paket ve 500'e uzaklığı
    const mesafe = S('line', { y1: Y0, y2: Y0, x1: X(500), stroke: RENK.mutlak, 'stroke-width': 8, 'stroke-linecap': 'round' }, svg);
    const paket = S('g', {}, svg);
    S('rect', { x: -24, y: -64, width: 48, height: 38, rx: 6, fill: RENK.kutu, stroke: RENK.yazi, 'stroke-width': 3 }, paket);
    S('path', { d: 'M0,-10 l-8,-12 h16 z', fill: RENK.yazi }, paket);
    const gram = yazi(paket, 0, -78, '', { size: 24, kalin: 700 });
    const ustT = yazi(svg, 500, 110, '', { size: 46, kalin: 700 });
    const koy = (x) => {
      const r = Math.round(x);
      paket.setAttribute('transform', `translate(${X(x)} ${Y0})`); mesafe.setAttribute('x2', X(x));
      yaz(gram, r + ' g'); yaz(ustT, ['|' + r + ' − 500| = ', [String(Math.abs(r - 500)), RENK.mutlak]]);
    };
    koy(500);
    // 10 uzaklıktaki iki nokta
    const yay = [-1, 1].map((s_) => S('path', { d: `M${X(500)},${Y0} Q${X(500 + 5 * s_)},${Y0 - 110} ${X(500 + 10 * s_)},${Y0}`, fill: 'none', stroke: RENK.mutlak, 'stroke-width': 4, 'stroke-linecap': 'round' }, svg));
    const yayAd = [-1, 1].map((s_) => yazi(svg, X(500 + 5 * s_), Y0 - 68, '10', { size: 26, renk: RENK.mutlak }));
    const uc = [490, 510].map((g) => S('circle', { cx: X(g), cy: Y0, r: 10, fill: RENK.sifir }, svg));
    const yol = [['x − 500 = −10', 490], ['x − 500 = 10', 510]].map(([m, g]) => {
      const gr = S('g', {}, svg);
      S('line', { x1: X(g), y1: Y0 + 58, x2: X(g), y2: Y0 + 92, stroke: RENK.soluk, 'stroke-width': 2, 'stroke-linecap': 'round' }, gr);
      yazi(gr, X(g), Y0 + 130, m, { size: 32, kalin: 700 });
      return gr;
    });
    const yaDa = yazi(svg, 500, Y0 + 130, 'ya da', { size: 24, renk: RENK.soluk });
    gizle(yay, yayAd, uc, yol, yaDa);

    await par(soyle(c, 'Makinenin hedefi 500 gram; ama paketler biraz sapabilir.'), (async () => { await c.wait(700); await c.tween(1500, (e) => koy(lerp(500, 507, e)), ease.inOut); })());
    await par(soyle(c, 'Hafif paket de sapmıştır: sapma, 500’e uzaklıktır.'), c.tween(2200, (e) => koy(lerp(507, 494, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'Sapma tam 10 gramsa paket kaç gram olabilir?',
      options: ['Yalnızca 510', '490 ya da 510', 'Yalnızca 490'], answer: 1,
      hints: ['Paket hedeften hafif de olabilir.', '', 'Paket hedeften ağır da olabilir.'],
      right: '500’e uzaklığı 10 olan iki sayı var.',
    });
    await kaybol(c, [paket, mesafe], 300);
    yaz(ustT, ['|x − 500| = ', ['10', RENK.mutlak]]);
    await par(soyle(c, '500’e uzaklığı 10 olan iki nokta var.'), (async () => {
      await par(ciz(c, yay[1], 700), ciz(c, yay[0], 700)); await belir(c, yayAd, 300);
      uc.forEach((u) => { u.style.opacity = 1; }); [490, 510].forEach((g) => { ad[g].style.fill = RENK.sifir; });
    })());
    await par(soyle(c, 'Yani mutlak değerin içi 10 ya da −10 olabilir.'), (async () => { await belir(c, yol[1], 500); await belir(c, yaDa, 300); await belir(c, yol[0], 500); })());
    await soyle(c, 'Tek denklem, iki ayrı denkleme ayrıldı.');
  }

  /* ---- 2. Grafikte ---- */
  async function grafikte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 440, h: 440, xmin: -2, xmax: 8, ymin: -3, ymax: 7 });
    const v = kirik(dz, mutlakNoktalar(dz, 2, -6));
    const cizgi = dogru(dz, 0, 4, { renk: RENK.g });
    const iz1 = kesik(dz.orta), iz2 = kesik(dz.orta);
    const p1 = nokta(dz, 1, 4, { r: 9 }), p2 = nokta(dz, 5, 4, { r: 9 });
    const ucAd = etiket(dz, 3, 0, '3', { renk: RENK.sifir, dy: 28 });
    const kuralT = yazi(svg, 770, 110, 't(x) = |2x − 6|', { size: 36, kalin: 700, renk: RENK.mutlak });
    const kT = yazi(svg, 770, 196, '', { size: 36, kalin: 700, renk: RENK.g });
    const sayiT = yazi(svg, 770, 340, '', { size: 46, kalin: 700, renk: RENK.sifir });
    const cozT = yazi(svg, 770, 396, '', { size: 30, kalin: 700 });
    let acik = false;   // kesişimler gösterilsin mi
    const koy = (k) => {
      const a = 3 - k / 2, b = 3 + k / 2, n = k > 0 ? 2 : k === 0 ? 1 : 0;
      cizgi.ayarla(0, k); yaz(kT, 'y = ' + sayi(k, 1));
      p1.git(a, Math.max(k, 0)); p2.git(b, Math.max(k, 0)); dikey(iz1, dz, a, k); dikey(iz2, dz, b, k);
      const g1 = acik && k >= 0, g2 = acik && k > 0;
      p1.el.style.opacity = g1 ? 1 : 0; p2.el.style.opacity = g2 ? 1 : 0; iz1.style.opacity = g2 ? 1 : 0; iz2.style.opacity = g2 ? 1 : 0;
      ucAd.style.opacity = acik && k === 0 ? 1 : 0;
      yaz(sayiT, !acik ? '' : n ? n + ' çözüm' : 'çözüm yok');
      yaz(cozT, !acik || !n ? '' : n === 2 ? sayi(a) + ' ve ' + sayi(b) : '3');
    };
    koy(4);
    gizle(v.el, cizgi.el, kuralT, kT);

    await par(soyle(c, 'Bir mutlak değer fonksiyonu: grafiği V biçiminde.'), ciz(c, v, 1100), belir(c, kuralT, 500));
    await par(soyle(c, 'Turuncu çizgi y = 4: V’yle buluştuğu yerler çözümdür.'),
      (async () => { await par(ciz(c, cizgi, 700), belir(c, kT, 400)); acik = true; koy(4); await par(pop(c, p1, dz.X(1), dz.Y(4)), pop(c, p2, dz.X(5), dz.Y(4))); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Çizgi k = 0’a inerse kaç çözüm kalır?',
      options: ['Hiç', 'Bir', 'İki'], answer: 1,
      hints: ['V’nin ucu tam x ekseninde; çizgi ona değer.', '', 'Çizgi indikçe iki nokta yaklaşır, uçta birleşir.'],
      right: 'Çizgi V’ye yalnızca ucunda değer.',
    });
    await c.tween(2000, (e) => koy(lerp(4, 0.01, e)), ease.inOut); koy(0);
    await soyle(c, 'k = 0 iken tek çözüm: V’nin ucu, içerideki ifadenin sıfırı.');
    await par(soyle(c, 'k negatifken çizgi V’nin altında kalır: çözüm yok.'), c.tween(1200, (e) => koy(lerp(-0.01, -2, e)), ease.inOut));
    await soyle(c, 'k’yi değiştir; çizgiyle V’nin kesişimlerini say.', { noWait: true });
    c.slider({ label: 'k', min: -2, max: 6, step: 1, value: 4, fmt: (x) => sayi(x), onInput: koy });
    await c.cont('Devam ›');
    c.note('|f(x)| = k: k pozitifse iki, sıfırsa bir, negatifse çözüm yok.', 'Kaç çözüm?', 'c5-kac-cozum');
  }

  /* ---- 3. Cebirle ---- */
  async function cebirle(c) {
    const svg = c.svg(1000, 562);
    const SOL = 325, SAG = 675;   // sayı doğrusundaki 1 ve 5'in hizası
    const den = yazi(svg, 500, 90, ['|2x − 6| = ', ['4', RENK.g]], { size: 46, kalin: 700 });
    const yz = (x, y, m, o) => yazi(svg, x, y, m, Object.assign({ size: 36, kalin: 700 }, o));
    const y1 = yz(SAG, 190, ['2x − 6 = ', ['4', RENK.g]]), y2 = yz(SOL, 190, ['2x − 6 = ', ['−4', RENK.g]]);
    const yaDa = yz(500, 190, 'ya da', { size: 24, renk: RENK.soluk, kalin: 600 });
    const c1 = yz(SAG, 262, ['x = ', ['5', RENK.sifir]], { size: 40 }), c2 = yz(SOL, 262, ['x = ', ['1', RENK.sifir]], { size: 40 });
    const k1 = yz(SAG, 268, ['|10 − 6| = ', ['4', RENK.iyi]]), k2 = yz(SOL, 268, ['|2 − 6| = ', ['4', RENK.iyi]]);
    // sayı doğrusu: 1, 3, 5
    const X = (v) => 500 + (v - 3) * 87.5, Y0 = 440;
    const dogruG = S('g', {}, svg);
    S('line', { x1: 150, y1: Y0, x2: 850, y2: Y0, stroke: RENK.eksen, 'stroke-width': 3, 'stroke-linecap': 'round' }, dogruG);
    for (let v = -1; v <= 7; v++) S('line', { x1: X(v), y1: Y0 - 8, x2: X(v), y2: Y0 + 8, stroke: RENK.eksen, 'stroke-width': 2 }, dogruG);
    [1, 5].forEach((v) => { S('circle', { cx: X(v), cy: Y0, r: 10, fill: RENK.sifir }, dogruG); yazi(dogruG, X(v), Y0 + 42, String(v), { size: 26, renk: RENK.sifir }); });
    const orta = S('g', {}, svg);
    S('circle', { cx: X(3), cy: Y0, r: 7, fill: RENK.yazi }, orta); yazi(orta, X(3), Y0 + 42, '3', { size: 26 });
    const yay = [-1, 1].map((s_) => S('path', { d: `M${X(3)},${Y0} Q${X(3 + s_)},${Y0 - 80} ${X(3 + 2 * s_)},${Y0}`, fill: 'none', stroke: RENK.mutlak, 'stroke-width': 4, 'stroke-linecap': 'round' }, svg));
    const yayAd = [-1, 1].map((s_) => yazi(svg, X(3 + s_), Y0 - 52, '2', { size: 26, renk: RENK.mutlak }));
    gizle(y1, y2, yaDa, c1, c2, k1, k2, dogruG, orta, yay, yayAd);

    await soyle(c, 'Şimdi cebirle: mutlak değeri 4 olan iki sayı var.');
    await par(soyle(c, 'Birinci yol: içerideki ifade 4’e eşit.'), (async () => { await belir(c, y1, 500); await c.wait(700); await belir(c, c1, 500); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Öbür yol hangi denklemdir?',
      options: ['2x + 6 = 4', '2x − 6 = −4', '−2x − 6 = 4'], answer: 1,
      hints: ['İçerideki ifade değişmez; değişen, eşit olduğu sayının işareti.', '', 'İfadenin tamamı −4 olabilir: 2x − 6 = −4.'],
      right: '|−4| de 4’tür.',
    });
    await par(soyle(c, 'İkinci yol: içerideki ifade −4’e eşit.'), (async () => { await belir(c, [yaDa, y2], 500); await c.wait(700); await belir(c, c2, 500); })());
    await kaybol(c, [y1, y2, yaDa], 300);
    await c.tween(500, (e) => [c1, c2].forEach((t) => t.setAttribute('y', lerp(262, 196, e))), ease.inOut);
    await par(soyle(c, 'İki sayıyı da denklemde yerine koy.'), (async () => { await belir(c, k2, 500); await c.wait(500); await belir(c, k1, 500); })());
    await kaybol(c, [k1, k2], 300);
    await belir(c, dogruG, 500);
    await par(soyle(c, 'Çözümler, 2x − 6’nın sıfırı olan 3’e eşit uzaklıkta.'),
      (async () => { await belir(c, orta, 400); await par(ciz(c, yay[0], 600), ciz(c, yay[1], 600)); await belir(c, yayAd, 300); })());
    c.note('|f(x)| = k → f(x) = k ya da f(x) = −k', 'İki yol', 'c5-iki-yol');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 60, y0: 120, w: 450, h: 300, xmin: -9, xmax: 9, ymin: -4, ymax: 8, sayilar: false });
    const v = kirik(dz, mutlakNoktalar(dz, 1, 2));
    const cizgi = dogru(dz, 0, 0, { renk: RENK.g, kalin: 3 });
    const isaret = [0, 1].map(() => ({ iz: kesik(dz.orta), p: nokta(dz, 0, 0, { r: 9 }), ad: etiket(dz, 0, 0, '', { renk: RENK.sifir, dy: 28 }) }));
    const goster = (xs, k) => isaret.forEach((m, i) => {
      const var_ = i < xs.length;
      [m.iz, m.p.el, m.ad].forEach((e) => { e.style.opacity = var_ ? 1 : 0; });
      if (!var_) return;
      m.p.git(xs[i], k); dikey(m.iz, dz, xs[i], k); yaz(m.ad, sayi(xs[i])); m.ad.setAttribute('x', dz.X(xs[i]));
    });
    goster([], 0);
    let b0 = 2, k0 = 0;
    const gec = async (b, k) => {
      goster([], 0);
      await c.tween(900, (e) => { v.ayarla(mutlakNoktalar(dz, 1, lerp(b0, b, e))); cizgi.ayarla(0, lerp(k0, k, e)); }, ease.inOut);
      b0 = b; k0 = k;
    };
    const tb = soruTahtasi(c, svg, { x: 580, y: 150, w: 380, h: 150, size: 42 });
    await soyle(c, 'V’ye ve turuncu çizgiye bak; çözüm kümesini seç.', { noWait: true });

    await tb.sor('|x + 2| = 0', {
      q: 'Çözüm kümesi hangisi?', options: ['{−2, 2}', '{−2}', '∅'], answer: 1,
      hints: ['k = 0 iken tek yol var: x + 2 = 0.', '', 'Mutlak değer 0 olabilir: içi 0 olduğunda.'],
      right: 'x + 2 = 0 ise x = −2.', kanit: 'tek çözüm: {−2}',
      onPick: (i, ok) => { if (ok) goster([-2], 0); },
    });
    yaz(tb.ifade, '|x − 1| = −3'); yaz(tb.alt, ''); await gec(-1, -3);
    await tb.sor('|x − 1| = −3', {
      q: 'Çözüm kümesi hangisi?', options: ['{−2, 4}', '{4}', '∅'], answer: 2,
      hints: ['Bunlar |x − 1| = 3’ün çözümleri; burada sağ yan −3.', 'Mutlak değer negatif bir sayıya eşit olamaz.', ''],
      right: 'Çizgi V’nin altında: hiç kesişmiyorlar.', kanit: 'çözüm yok: ∅',
    });
    yaz(tb.ifade, '|x| = 7'); yaz(tb.alt, ''); await gec(0, 7);
    await tb.sor('|x| = 7', {
      q: 'Çözüm kümesi hangisi?', options: ['{7}', '{−7, 7}', '{0, 7}'], answer: 1,
      hints: ['−7’nin mutlak değeri de 7’dir.', '', '|0| = 0’dır; 7 etmez.'],
      right: 'x = 7 ya da x = −7.', kanit: 'iki çözüm: {−7, 7}',
      onPick: (i, ok) => { if (ok) goster([-7, 7], 7); },
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c5', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: '|f(x)| = k', accent: '#ff8a5b', back: 'index.html',
    intro: { title: '|f(x)| = k', hook: 'Bir makine paketlere 500 gram doldurmaya çalışıyor. <b>Bir paket tam 10 gram sapmışsa kaç gram olabilir?</b>', button: 'Derse başla ›' },
    goals: ['|f(x)| = k denklemini iki ayrı denkleme ayırarak çözer.', 'Çözüm sayısını grafikte V ile y = k çizgisinin kesişiminden okur.', 'k = 0 ve k &lt; 0 hâllerini ayırt eder.'],
    scenes: [
      { title: 'İki yol', goal: 'Mutlak değerli denklemin iki yola ayrıldığını gör.', run: ikiYol },
      { title: 'Grafikte', goal: 'Çözüm sayısını V ile çizginin kesişiminden oku.', run: grafikte },
      { title: 'Cebirle', goal: 'İki yolu çöz, yerine koyarak denetle.', run: cebirle },
      { title: 'Sıra sende', goal: 'Üç denklemin çözüm kümesini bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '|x − 4| = 6 denkleminin çözüm kümesi hangisidir?', options: ['{10}', '{2, 10}', '{−2, 10}'], answer: 2,
        why: ['Yalnızca x − 4 = 6 yolu çözülmüş; x − 4 = −6 yolu da var.', '|2 − 4| = 2 eder; 6 etmez.', 'x − 4 = 6 ya da x − 4 = −6: 10 ve −2.'], scene: 2 },
      { q: '|3x + 1| = −2 denkleminin kaç çözümü vardır?', options: ['2', '0', '1'], answer: 1,
        why: ['İki çözüm k pozitifken olur; burada k negatif.', 'Mutlak değer hiçbir x için −2 etmez.', 'Tek çözüm k = 0 iken olur; burada k negatif.'], scene: 1 },
    ],
    summary: [
      '<b>Mutlak değer k ise iki yol vardır; k negatifse yoktur.</b>',
      '|f(x)| = k ve k &gt; 0 ise f(x) = k ya da f(x) = −k: iki çözüm.',
      'k = 0 iken tek çözüm vardır (f’nin sıfırı); k &lt; 0 iken çözüm yoktur.',
    ],
    nextLesson: { href: 'c6-mutlak-deger-esitsizlikleri.html', label: 'Sonraki: |f(x)| < k ve |f(x)| > k ›' },
  });
})();
