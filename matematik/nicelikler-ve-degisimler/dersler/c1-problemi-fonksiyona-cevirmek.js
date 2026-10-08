/* C1 — Problemi fonksiyona çevirmek
   Sözel problemden kural, kuraldan grafik; "tam", "en çok", "en az" sözlerinden denklem ve eşitsizlik kurma.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket, tablo, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* kilo–lira düzlemi: f(x) = 5x + 20 */
  const DZ = (o) => Object.assign({ x0: 80, y0: 50, w: 456, h: 440, xmin: -2, xmax: 10, ymin: 0, ymax: 80, xadim: 1, yadim: 10, xsayi: 2, ysayi: 20, xad: 'kilo', yad: 'lira' }, o);
  /* yazıdaki i.–j. karakterlerin orta x'i (kuralın parçalarına etiket bağlamak için) */
  const karX = (t, i, j = i) => (t.getStartPositionOfChar(i).x + t.getEndPositionOfChar(j).x) / 2;
  const cizgi = (p, x1, y1, x2, y2) => S('line', { x1, y1, x2, y2, stroke: RENK.soluk, 'stroke-width': 2, 'stroke-linecap': 'round' }, p);

  /* ---- 1. Sözden kurala ---- */
  async function sozdenKurala(c) {
    const svg = c.svg(1000, 562);
    // kargo fişi
    const fis = S('g', {}, svg);
    S('rect', { x: 60, y: 100, width: 340, height: 320, rx: 14, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, fis);
    const satir = (y, ad, deger) => {
      const g = S('g', {}, fis);
      yazi(g, 92, y, ad, { size: 24, hiza: 'start', renk: RENK.soluk, kalin: 500 });
      return [g, yazi(g, 368, y, deger, { size: 28, hiza: 'end', kalin: 700 })];
    };
    const [s1] = satir(182, 'sabit ücret', '20 lira');
    const [s2] = satir(248, 'kilo başına', '5 lira');
    const ayrac = S('line', { x1: 92, y1: 296, x2: 368, y2: 296, stroke: RENK.kenar, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, fis);
    const [s3, toplam] = satir(360, 'toplam', '');
    // paket
    const PX = 700, PALT = 190;
    const paket = S('g', {}, svg);
    const kutu = S('rect', { rx: 8, fill: RENK.kutu, stroke: RENK.yazi, 'stroke-width': 3 }, paket);
    const bant = S('line', { stroke: RENK.yazi, 'stroke-width': 3, opacity: 0.45 }, paket);
    const agirlik = yazi(svg, PX, 238, '', { size: 30, kalin: 700 });
    const hesap = yazi(svg, PX, 350, '', { size: 44, kalin: 700 });
    const koy = (k) => {
      const b = 70 + 7 * k, r = Math.round(k);
      kutu.setAttribute('x', PX - b / 2); kutu.setAttribute('y', PALT - b * 0.8); kutu.setAttribute('width', b); kutu.setAttribute('height', b * 0.8);
      bant.setAttribute('x1', PX); bant.setAttribute('x2', PX); bant.setAttribute('y1', PALT - b * 0.8); bant.setAttribute('y2', PALT);
      yaz(agirlik, [[String(r), RENK.sifir], ' kilo']);
      yaz(hesap, ['20 + 5 · ', [String(r), RENK.sifir], ' = ' + (20 + 5 * r)]);
      yaz(toplam, (20 + 5 * r) + ' lira');
    };
    koy(4);
    // kural ve parçalarının adı
    const kuralT = yazi(svg, PX, 350, 'f(x) = 5x + 20', { size: 48, kalin: 700, renk: RENK.f });
    const x5 = karX(kuralT, 7), x20 = karX(kuralT, 12, 13);
    const katsayi = S('g', {}, svg), sabit = S('g', {}, svg);
    cizgi(katsayi, x5, 308, x5, 290); yazi(katsayi, x5, 276, 'katsayı', { size: 24, renk: RENK.soluk });
    cizgi(sabit, x20, 366, x20, 386); yazi(sabit, x20, 414, 'sabit terim', { size: 24, renk: RENK.soluk });
    gizle(s1, s2, s3, ayrac, paket, agirlik, hesap, kuralT, katsayi, sabit);

    await par(soyle(c, 'Kargo fişinde iki kalem var: sabit ücret ve kilo ücreti.'),
      (async () => { await belir(c, s1, 400); await c.wait(500); await belir(c, s2, 400); })());
    await par(soyle(c, '4 kiloluk pakette 20 liraya 4 tane 5 lira eklenir.', { speak: 'Dört kiloluk pakette yirmi liraya, dört tane beş lira eklenir.' }), (async () => {
      await par(pop(c, paket, PX, PALT - 50), belir(c, agirlik, 400));
      await belir(c, hesap, 500); await belir(c, [ayrac, s3], 400);
    })());
    await par(soyle(c, 'Paket 10 kilo olunca yalnızca kilo sayısı değişir.'), c.tween(1800, (e) => koy(lerp(4, 10, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'x kilo için ücretin kuralı hangisi?',
      options: ['f(x) = 20x + 5', 'f(x) = 5x + 20', 'f(x) = 25x'], answer: 1,
      hints: ['Kiloyla çarpılan 5 lira olmalı; 20 lira bir kez ödenir.', '', '20 lira kiloya bağlı değil; x ile çarpılmaz.'],
      right: 'Bir kez 20 lira, üstüne x tane 5 lira.',
    });
    await par(soyle(c, 'Kilo sayısı yerine x yazınca ücretin kuralı çıkar.'), (async () => {
      yaz(agirlik, [['x', RENK.sifir], ' kilo']); yaz(hesap, ['20 + 5 · ', ['x', RENK.sifir]]);
      await c.wait(1100);
      await kaybol(c, hesap, 300); yaz(toplam, [['f(x)', RENK.f], ' lira']); await belir(c, kuralT, 500);
    })());
    await par(soyle(c, 'Paket boşken de ödenen 20: kuralın <b>sabit terimi</b>.', { dur: true }), belir(c, sabit, 500));
    await par(soyle(c, 'Her kiloda eklenen 5: kuralın <b>katsayısı</b>.'), belir(c, katsayi, 500));
    c.note('<b>Kural:</b> f(x) = 5x + 20<br>5 katsayı, 20 sabit terim', 'Sözden kurala', 'c1-kural');
  }

  /* ---- 2. Kuraldan grafiğe ---- */
  async function kuraldanGrafige(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ());
    const tb = tablo(svg, { x: 606, y: 70, basliklar: ['kilo', 'lira'], n: 4, hucre: 62, yuk: 50, basGen: 96, renkler: [RENK.soluk, RENK.f] });
    const xs = [0, 2, 4, 6];
    xs.forEach((x, k) => { tb.yaz(0, k, String(x)); tb.yaz(1, k, String(5 * x + 20), RENK.f); });
    const kuralT = yazi(svg, 762, 320, 'f(x) = 5x + 20', { size: 42, kalin: 700, renk: RENK.f });
    const x5 = karX(kuralT, 7), x20 = karX(kuralT, 12, 13);
    const ustNot = S('g', {}, svg), altNot = S('g', {}, svg);
    cizgi(ustNot, x5, 284, x5, 268); yazi(ustNot, x5, 254, 'her kiloda yükselme', { size: 22, renk: RENK.soluk });
    cizgi(altNot, x20, 334, x20, 352); yazi(altNot, x20, 380, 'y eksenini kestiği yer', { size: 22, renk: RENK.soluk });
    const noktalar = xs.map((x) => nokta(dz, x, 5 * x + 20, { renk: RENK.f, r: 9 }));
    const d = dogru(dz, 5, 20, { x1: 0 });
    const sol = dogru(dz, 5, 20, { x1: -2, x2: 0, renk: RENK.soluk, kesik: true, kalin: 3 });
    const kesim = nokta(dz, 0, 20, { r: 8 });
    // basamaklar: her kiloda 5 lira
    const basamak = [4, 5, 6].map((x) => S('path', { d: `M${dz.X(x)},${dz.Y(5 * x + 20)} H${dz.X(x + 1)} V${dz.Y(5 * x + 25)}`, fill: 'none', stroke: RENK.sifir, 'stroke-width': 3, 'stroke-linejoin': 'round' }, dz.orta));
    const art1 = etiket(dz, 6.5, 50, '+1', { size: 20, renk: RENK.sifir, dy: 22 });
    const art5 = etiket(dz, 7, 52.5, '+5', { size: 20, renk: RENK.sifir, dx: 8, dy: 7, hiza: 'start' });
    gizle(noktalar.map((n) => n.el), d.el, sol.el, kesim.el, basamak, art1, art5, ustNot, altNot, tb.g);

    await par(soyle(c, 'Kuraldan dört paketin ücretini hesapla, tabloya yaz.'), belir(c, tb.g, 400));
    await par(soyle(c, 'Tablodaki her çift düzlemde bir nokta olur.'), (async () => {
      for (const n of noktalar) { await pop(c, n, dz.X(n.x), dz.Y(n.y), 350); await c.wait(150); }
    })());
    await par(soyle(c, 'Aradaki ağırlıklar için de nokta var: noktalar doğruya dönüşür.'), ciz(c, d, 900));
    await par(soyle(c, 'Ağırlık negatif olmaz: grafik x = 0’dan başlar.', { ton: 'thoughtful' }),
      (async () => { await belir(c, sol.el, 400, 0.8); await c.wait(900); await kaybol(c, sol.el, 500); })());
    await kaybol(c, [tb.g].concat(noktalar.map((n) => n.el)), 350);
    await par(soyle(c, 'Sabit terim grafikte de görünür: doğru 20’den başlar.'),
      (async () => { await pop(c, kesim, dz.X(0), dz.Y(20)); await belir(c, altNot, 400); })());
    await par(soyle(c, 'Katsayı da görünür: sağa her kiloda 5 lira yükselir.'), (async () => {
      for (const b of basamak) await ciz(c, b, 450);
      await belir(c, [art1, art5, ustNot], 400);
    })());
    c.note('f(x) = 5x + 20: y eksenini 20’de keser, kiloda 5 yükselir.', 'Kuraldan grafiğe', 'c1-grafik');
  }

  /* ---- 3. Grafiğin dili ---- */
  async function grafiginDili(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ({ xsayi: 4 }));
    dogru(dz, 5, 20, { x1: 0 });
    const izler = iz(dz, 6, 50, { renk: RENK.sifir });
    const p = nokta(dz, 6, 50, { r: 10 });
    const pAd = etiket(dz, 6, 50, '(6, 50)', { renk: RENK.sifir, dx: -14, dy: -14, hiza: 'end' });
    const anlam = yazi(svg, 778, 150, '6 kilo, 50 lira', { size: 34, kalin: 700 });
    const cizgi60 = dogru(dz, 0, 60, { renk: RENK.g, kesik: true, kalin: 3, x1: 0 });
    const kes = nokta(dz, 8, 60, { r: 10 });
    const altParca = dogru(dz, 5, 20, { x1: 0, x2: 8, renk: RENK.sifir, kalin: 8 });
    const soz1 = yazi(svg, 778, 150, 'tam 60 lira', { size: 24, renk: RENK.soluk });
    const denk = yazi(svg, 778, 204, ['5x + 20', [' = 60', RENK.g]], { size: 40, kalin: 700 });
    const soz2 = yazi(svg, 778, 330, 'en çok 60 lira', { size: 24, renk: RENK.soluk });
    const esitsiz = yazi(svg, 778, 384, ['5x + 20', [' ≤ 60', RENK.g]], { size: 40, kalin: 700 });
    gizle(izler.g, p.el, pAd, anlam, cizgi60.el, kes.el, altParca.el, soz1, denk, soz2, esitsiz);

    await par(soyle(c, 'Doğrunun üzerindeki her nokta bir paketi anlatır.'),
      (async () => { await pop(c, p, dz.X(6), dz.Y(50)); await belir(c, [izler.g, pAd], 400); await belir(c, anlam, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: '“60 lirayla kaç kilo gönderirim?” sorusu hangi denklemdir?',
      options: ['5 · 60 + 20 = x', '5x + 20 = 60', '5x = 60'], answer: 1,
      hints: ['60 ücrettir, kilo değil; x’in yerine yazılmaz.', '', 'Sabit 20 lira da ödenecek.'],
      right: 'Ücret 60 olsun: f(x) = 60.',
    });
    await kaybol(c, [izler.g, p.el, pAd, anlam], 300);
    await par(soyle(c, 'Grafikte doğrunun 60 çizgisine ulaştığı nokta aranır.'),
      (async () => { await belir(c, [soz1, denk], 400); await ciz(c, cizgi60); await pop(c, kes, dz.X(8), dz.Y(60)); })());
    await c.choice({
      tag: 'Tahmin et', q: '“En çok 60 lira harcarım” cümlesi hangisidir?',
      options: ['5x + 20 ≥ 60', '5x + 20 = 60', '5x + 20 ≤ 60'], answer: 2,
      hints: ['≥ “en az 60” demektir; sen 60’ı geçmek istemiyorsun.', 'Eşitlik yalnızca tam 60 lirayı anlatır; daha azı da olur.', ''],
      right: '“En çok 60”: 60 ya da daha azı.',
    });
    await par(soyle(c, 'Şimdi doğrunun çizgiyi aşmayan bütün parçası aranır.'),
      (async () => { await belir(c, [soz2, esitsiz], 400); await ciz(c, altParca, 800); })());
    await soyle(c, 'İki soru da fonksiyonu bir sayıyla karşılaştırıyor.');
    c.note('<b>Tam</b> → denklem, <b>en çok</b> → eşitsizlik.<br>5x + 20 ≤ 60', 'Sözden denkleme', 'c1-denklem');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ({ xsayi: 4 }));
    dogru(dz, 5, 20, { x1: 0 });
    dogru(dz, 0, 45, { renk: RENK.g, kesik: true, kalin: 3, x1: 0 });
    etiket(dz, 10, 45, '45', { renk: RENK.g, dx: -8, dy: -10, hiza: 'end' });
    const ust = dogru(dz, 5, 20, { x1: 5, renk: RENK.sifir, kalin: 8 });
    const alt = dogru(dz, 5, 20, { x1: 0, x2: 5, renk: RENK.sifir, kalin: 8 });
    const p = nokta(dz, 5, 45, { r: 10 });
    gizle(ust.el, alt.el, p.el);
    const tb = soruTahtasi(c, svg, { x: 590, y: 150, w: 370, h: 150, size: 28 });
    const goster = (els) => () => els.forEach((e) => { e.style.opacity = 1; });
    await soyle(c, 'Her cümleyi denklem ya da eşitsizlikle eşleştir.', { noWait: true });

    await tb.sor('“Tam 45 lira ödedim.”', {
      q: 'Bu cümle hangisidir?', options: ['5x + 20 &gt; 45', '5x + 20 = 45', '20x + 5 = 45'], answer: 1,
      hints: ['“Tam” sözü eşitlik ister.', '', 'Kiloyla çarpılan 5’tir; 20 sabit ücrettir.'],
      right: 'Grafikte tek bir nokta.', kanit: '5x + 20 = 45',
      onPick: (k, ok) => { if (ok) goster([p.el])(); },
    });
    gizle(p.el);
    await tb.sor('“En az 45 lira ödedim.”', {
      q: 'Bu cümle hangisidir?', options: ['5x + 20 ≤ 45', '5x + 20 &gt; 45', '5x + 20 ≥ 45'], answer: 2,
      hints: ['≤ “en çok 45” demektir.', '“En az 45” tam 45’i de kapsar.', ''],
      right: 'Doğrunun çizgideki ve çizginin üstündeki parçası.', kanit: '5x + 20 ≥ 45',
      onPick: (k, ok) => { if (ok) goster([ust.el, p.el])(); },
    });
    gizle(ust.el, p.el);
    await tb.sor('“45 liradan az ödedim.”', {
      q: 'Bu cümle hangisidir?', options: ['5x + 20 &lt; 45', '5x + 20 ≤ 45', '5x + 20 &gt; 45'], answer: 0,
      hints: ['', '≤ tam 45’i de kapsar; cümle 45’i dışarıda bırakıyor.', '&gt; “45’ten çok” demektir.'],
      right: 'Doğrunun çizginin altındaki parçası; uç nokta dışarıda.', kanit: '5x + 20 < 45',
      onPick: (k, ok) => { if (ok) { p.bos(true); goster([alt.el, p.el])(); } },
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c1', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'Problemi fonksiyona çevirmek', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Problemi fonksiyona çevirmek', hook: 'Bir kargo firması sabit 20 lira, artı kilo başına 5 lira alıyor. <b>4 kilonun ücretini nasıl, 10 kilonunkini nasıl bulursun?</b>', button: 'Derse başla ›' },
    goals: ['Sözel bir problemi doğrusal fonksiyonla yazar.', 'Kuralı grafiğe çevirir, grafiği problemin diliyle okur.', 'Soruyu denklem ya da eşitsizlik olarak kurar.'],
    scenes: [
      { title: 'Sözden kurala', goal: 'Problemdeki iki sayıdan kuralı kur.', run: sozdenKurala },
      { title: 'Kuraldan grafiğe', goal: 'Kuralın iki sayısını grafikte bul.', run: kuraldanGrafige },
      { title: 'Grafiğin dili', goal: 'Soruyu denklem ya da eşitsizliğe çevir.', run: grafiginDili },
      { title: 'Sıra sende', goal: 'Cümleleri denklem ve eşitsizlikle eşleştir.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Girişi 30 lira, saati 10 lira olan otoparkın x saatlik ücreti hangisidir?', options: ['30x + 10', '10x + 30', '40x'], answer: 1,
        why: ['Saatle çarpılan 10 lira olmalı; 30 lira bir kez ödenir.', 'Bir kez 30 lira, üstüne x tane 10 lira.', 'Giriş ücreti saate bağlı değil; x ile çarpılmaz.'], scene: 0 },
      { q: 'f(x) = 5x + 20 kuralında 20 neyi anlatır?', options: ['Kilo başına ücreti', 'En çok ağırlığı', 'Ağırlıktan bağımsız sabit ücreti'], answer: 2,
        why: ['Kilo başına ücret x’in katsayısıdır: 5.', 'Kuralda ağırlık için bir sınır yok.', '20, x ile çarpılmaz: paket boşken de ödenir.'], scene: 1 },
    ],
    summary: [
      '<b>Sözü fonksiyona, fonksiyonu grafiğe çevir.</b>',
      'f(x) = 5x + 20: 20 sabit terim, 5 katsayı. Grafik y eksenini 20’de keser, her kiloda 5 yükselir.',
      '“Tam” denklem, “en çok” ve “en az” eşitsizlik kurar.',
    ],
    nextLesson: { href: 'c2-sifir-ve-isaretle-cozum.html', label: 'Sonraki: f(x) = 0, f(x) < 0 ve f(x) > 0 ›' },
  });
})();
