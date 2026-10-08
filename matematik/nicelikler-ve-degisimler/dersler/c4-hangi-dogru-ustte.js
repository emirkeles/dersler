/* C4 — f(x) ≤ g(x) ve f(x) ≥ g(x)
   Eşitsizliğin çözümü, bir doğrunun öbürünün altında ya da üstünde kaldığı aralıktır; f(x) < 0, g(x) = 0 olan özel hâldir.
   Bağlam: A firması f(x) = 10x + 40, B firması g(x) = 20x; kesişim (4, 80).
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, serit, etiket } = window.KIT;
  const { lerp, ease } = Ders;

  /* kilo–lira düzlemi */
  const DZ = (o) => Object.assign({ x0: 90, y0: 44, w: 440, h: 440, xmin: 0, xmax: 8, ymin: 0, ymax: 160, xadim: 1, yadim: 20, xsayi: 2, ysayi: 40, xad: 'kilo', yad: 'lira' }, o);
  const F = (x) => 10 * x + 40, G = (x) => 20 * x;
  const fg = (isaret) => [['f(x)', RENK.f], ' ' + isaret + ' ', ['g(x)', RENK.g]];

  /* ---- 1. Grafikte ---- */
  async function grafikte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ());
    const f = dogru(dz, 10, 40), g = dogru(dz, 20, 0, { renk: RENK.g });
    const fAlt = dogru(dz, 10, 40, { x1: 4, kalin: 8 }), gAlt = dogru(dz, 20, 0, { x1: 0, x2: 4, renk: RENK.g, kalin: 8 });
    const cozum = serit(dz, 'x', 4, 4);
    const uc = nokta(dz, 4, 0, { r: 9 });
    const kes = nokta(dz, 4, 80, { r: 10 });
    const aAd = yazi(svg, 780, 120, [['A   ', RENK.soluk], ['f(x) = 10x + 40', RENK.f]], { size: 32, kalin: 700 });
    const bAd = yazi(svg, 780, 190, [['B   ', RENK.soluk], ['g(x) = 20x', RENK.g]], { size: 32, kalin: 700 });
    const esitsizlik = yazi(svg, 780, 370, fg('≤'), { size: 46, kalin: 700 });
    // 6 kiloda iki ücret
    const sonda = S('g', {}, svg);
    S('line', { x1: dz.X(6), y1: dz.Y(0), x2: dz.X(6), y2: dz.Y(120), stroke: RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, sonda);
    nokta(dz, 6, 100, { renk: RENK.f, r: 8, katman: sonda }); nokta(dz, 6, 120, { renk: RENK.g, r: 8, katman: sonda });
    etiket(dz, 6, 100, '100', { renk: RENK.f, dx: 14, dy: 20, hiza: 'start', katman: sonda });
    etiket(dz, 6, 120, '120', { renk: RENK.g, dx: -14, dy: -8, hiza: 'end', katman: sonda });
    gizle(f.el, g.el, fAlt.el, gAlt.el, cozum.el, uc.el, kes.el, aAd, bAd, esitsizlik, sonda);

    await par(soyle(c, 'İki kargo firması: A’nın sabit ücreti var, B’nin yok.', { speak: 'İki kargo firması: A firmasının sabit ücreti var, B firmasının yok.' }),
      (async () => { await par(ciz(c, f, 800), belir(c, aAd, 400)); await par(ciz(c, g, 800), belir(c, bAd, 400)); })());
    await par(soyle(c, 'Doğrular 4 kiloda kesişir: orada ücretler eşit.'), pop(c, kes, dz.X(4), dz.Y(80)));
    await c.choice({
      tag: 'Tahmin et', q: '6 kiloluk pakette hangi firma daha ucuz?',
      options: ['B firması', 'A firması', 'İkisi aynı'], answer: 1,
      hints: ['B 6 kiloya 120 lira ister, A 100 lira.', '', 'Ücretler yalnızca 4 kiloda eşit.'],
      right: 'A 100 lira, B 120 lira ister.',
      onPick: () => { sonda.style.opacity = 1; },
    });
    await soyle(c, 'Ucuz olan, grafikte altta kalan doğrudur.');
    await kaybol(c, sonda, 300);
    await par(soyle(c, 'Kesişimin sağında f altta, solunda g altta.', { speak: 'Kesişimin sağında f fonksiyonu altta, solunda g fonksiyonu altta.' }),
      (async () => { await belir(c, [f.el, g.el], 400, 0.4); await ciz(c, gAlt, 600); await ciz(c, fAlt, 600); })());
    await par(soyle(c, '“A daha pahalı değil” demek f(x) ≤ g(x) demek.', { speak: '“A firması daha pahalı değil” demek, f x küçük eşit g x demek.' }), belir(c, esitsizlik, 500));
    await par(soyle(c, 'Çözüm, f’nin altta ya da eşit olduğu ağırlıklar.', { speak: 'Çözüm, f fonksiyonunun altta ya da eşit olduğu ağırlıklar.' }), (async () => {
      cozum.el.style.opacity = 0.9; uc.el.style.opacity = 1;
      await c.tween(900, (e) => cozum.ayarla(4, lerp(4, 8, e)), ease.inOut);
    })());
    c.note('<b>f(x) ≤ g(x):</b> f’nin altta ya da eşit olduğu x’ler.', 'Hangi doğru altta?', 'c4-altta');
  }

  /* ---- 2. Cebirle ---- */
  async function cebirle(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ());
    dogru(dz, 10, 40); dogru(dz, 20, 0, { renk: RENK.g });
    etiket(dz, 7, 110, 'f', { renk: RENK.f, dy: 30, size: 24 }); etiket(dz, 6.5, 130, 'g', { renk: RENK.g, dx: -20, dy: -4, size: 24 });
    const cozum = serit(dz, 'x', 4, 8);
    const uc = nokta(dz, 4, 0, { r: 9 }), bas = nokta(dz, 0, 0, { r: 9 });
    nokta(dz, 4, 80, { r: 10 });
    const yz = (y, m, o) => yazi(svg, 780, y, m, Object.assign({ size: 34, kalin: 700 }, o));
    const h1 = yz(96, fg('≤'), { size: 38 });
    const s1 = yz(164, [['10x + 40', RENK.f], ' ≤ ', ['20x', RENK.g]]);
    const s2 = yz(218, '40 ≤ 10x');
    const s3 = yz(272, 'x ≥ 4', { renk: RENK.sifir });
    const h2 = yz(300, fg('≥'), { size: 38 });
    const t = yz(362, 'x ≤ 4', { renk: RENK.sifir });
    gizle(cozum.el, uc.el, bas.el, h1, s1, s2, s3, h2, t);

    await par(soyle(c, 'Aynı eşitsizliği cebirle çöz: kuralları yerine yaz.'), (async () => { await belir(c, h1, 400); await belir(c, s1, 400); })());
    await par(soyle(c, 'İki yandan 10x çıkar.'), belir(c, s2, 400));
    await par(soyle(c, 'İki yanı 10’a böl.'), belir(c, s3, 400));
    await c.choice({
      tag: 'Tahmin et', q: 'x = 4 çözüme dahil mi?',
      options: ['Hayır, uç boş kalır', 'Evet, uç doludur'], answer: 1,
      hints: ['≤ eşitliği de kabul eder; 4 kiloda ücretler eşit.', ''],
      right: 'f(4) = g(4) = 80: eşitlik sağlanıyor.',
    });
    await par(soyle(c, 'Çözüm [4, ∞): grafikte dolu noktayla başlayan şerit.', { speak: 'Çözüm, dört ve dörtten büyük bütün sayılar: grafikte dolu noktayla başlayan şerit.', dur: true }),
      (async () => { await pop(c, uc, dz.X(4), dz.Y(0)); await belir(c, cozum.el, 500, 0.9); })());
    await par(kaybol(c, [s1, s2], 300), c.tween(500, (e) => s3.setAttribute('y', lerp(272, 156, e)), ease.inOut));
    await par(soyle(c, 'f(x) ≥ g(x) ise öbür yan: f üstte ya da eşit.', { speak: 'f x büyük eşit g x ise öbür yan: f fonksiyonu üstte ya da eşit.' }), (async () => {
      await belir(c, h2, 400); await belir(c, t, 400);
      await c.tween(900, (e) => cozum.ayarla(lerp(4, 0, e), lerp(8, 4, e)), ease.inOut);
    })());
    await par(soyle(c, 'Ağırlık negatif olmaz: çözüm 0 ile 4 arası.', { dur: true }), (async () => { await pop(c, bas, dz.X(0), dz.Y(0)); yaz(t, '0 ≤ x ≤ 4'); })());
    c.note('10x + 40 ≤ 20x → x ≥ 4<br>Çözüm [4, ∞): uç dahil.', 'Cebirle', 'c4-cebir');
  }

  /* ---- 3. Özel hâl: g(x) = 0 ---- */
  async function ozelHal(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 440, h: 440, xmin: -2, xmax: 6, ymin: -3, ymax: 5 });
    dogru(dz, -1, 3);
    const g = dogru(dz, 2, 0, { renk: RENK.g });
    etiket(dz, -1, 4, 'f', { renk: RENK.f, dx: 16, dy: -4, size: 24 });
    const gAd = etiket(dz, 2.2, 4.4, 'g', { renk: RENK.g, size: 24 });
    const dik = S('line', { stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
    const cozum = serit(dz, 'x', 1, 6);
    const kes = nokta(dz, 1, 2, { r: 9 });
    const uc = nokta(dz, 1, 0, { r: 9, bos: true });
    const gKural = yazi(svg, 760, 210, '', { size: 36, kalin: 700, renk: RENK.g });
    const koy = (a) => {
      const x = 3 / (1 + a);
      g.ayarla(a, 0); kes.git(x, a * x); uc.git(x, 0); cozum.ayarla(x, 6);
      gAd.setAttribute('x', dz.X(2.2) - 16); gAd.setAttribute('y', dz.Y(a * 2.2) - 12);
      dik.setAttribute('x1', dz.X(x)); dik.setAttribute('x2', dz.X(x)); dik.setAttribute('y1', dz.Y(a * x)); dik.setAttribute('y2', dz.Y(0));
      yaz(gKural, 'g(x) = ' + kural(Math.round(a * 10) / 10, 0));
    };
    koy(2);
    const r1 = yazi(svg, 760, 130, fg('<'), { size: 44, kalin: 700 });
    const r3 = yazi(svg, 760, 360, [['f(x)', RENK.f], ' < ', ['0', RENK.g]], { size: 50, kalin: 700 });
    const noktalar = [-1.5, -0.5, 1].map((v) => nokta(dz, v, 0, { renk: RENK.g, r: 7 }));
    const nAd = etiket(dz, -1, 0, '(a, 0)', { renk: RENK.g, dy: -16 });
    gizle(r3, noktalar.map((n) => n.el), nAd);

    await soyle(c, 'Yeni iki doğru: f(x) &lt; g(x), kesişimin sağında sağlanıyor.');
    await par(soyle(c, 'g yatıklaşsın: eğimi küçülür, x eksenine yaklaşır.'), c.tween(2600, (e) => koy(lerp(2, 0, e)), ease.inOut));
    await par(soyle(c, 'g artık x ekseninin üzerinde: her girdide değeri 0.'), (async () => {
      for (const n of noktalar) await pop(c, n, dz.X(n.x), dz.Y(0), 300);
      await belir(c, nAd, 300);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'f(x) &lt; g(x) eşitsizliği şimdi neye dönüştü?',
      options: ['f(x) &lt; x', 'f(x) &lt; 0', 'f(x) &gt; 0'], answer: 1,
      hints: ['g(x) artık x değil; her girdide 0.', '', 'Yön değişmedi; yalnızca g(x) yerine 0 geldi.'],
      right: 'g(x) yerine 0 yaz: f(x) &lt; 0.',
    });
    await kaybol(c, noktalar.map((n) => n.el).concat(nAd), 300);
    await par(soyle(c, 'x ekseni de bir fonksiyonun grafiğidir: g(x) = 0.', { ton: 'thoughtful' }), belir(c, r3, 500));
    await soyle(c, 'Yani f(x) &lt; 0, bu dersin özel bir hâlidir.');
    c.note('<b>f(x) &lt; 0:</b> f(x) &lt; g(x)’in g(x) = 0 hâli.', 'Özel hâl', 'c4-ozel');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ());
    dogru(dz, 10, 40); dogru(dz, 20, 0, { renk: RENK.g });
    const dik = S('line', { stroke: RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
    const pf = nokta(dz, 6, 100, { renk: RENK.f, r: 9 }), pg = nokta(dz, 6, 120, { renk: RENK.g, r: 9 });
    const aSatir = S('g', {}, svg), bSatir = S('g', {}, svg);
    yazi(aSatir, 640, 130, 'A', { size: 28, renk: RENK.soluk, hiza: 'start' });
    const aT = yazi(aSatir, 700, 130, '', { size: 38, kalin: 700, renk: RENK.f, hiza: 'start' });
    yazi(bSatir, 640, 200, 'B', { size: 28, renk: RENK.soluk, hiza: 'start' });
    const bT = yazi(bSatir, 700, 200, '', { size: 38, kalin: 700, renk: RENK.g, hiza: 'start' });
    const iliski = yazi(svg, 780, 340, '', { size: 44, kalin: 700 });
    const karar = yazi(svg, 780, 400, '', { size: 28, kalin: 700, renk: RENK.sifir });
    const koy = (x) => {
      const a = F(x), b = G(x), s_ = sayi(x);
      pf.git(x, a); pg.git(x, b);
      dik.setAttribute('x1', dz.X(x)); dik.setAttribute('x2', dz.X(x)); dik.setAttribute('y1', dz.Y(0)); dik.setAttribute('y2', dz.Y(Math.max(a, b)));
      yaz(aT, 'f(' + s_ + ') = ' + sayi(a)); yaz(bT, 'g(' + s_ + ') = ' + sayi(b));
      aSatir.style.opacity = a <= b ? 1 : 0.45; bSatir.style.opacity = b <= a ? 1 : 0.45;
      yaz(iliski, [['f(' + s_ + ')', RENK.f], a < b ? ' < ' : a > b ? ' > ' : ' = ', ['g(' + s_ + ')', RENK.g]]);
      yaz(karar, a < b ? 'A daha ucuz' : a > b ? 'B daha ucuz' : 'ücretler eşit');
    };
    await soyle(c, 'Ağırlığı değiştir; hangi firmanın ucuz olduğunu izle.', { noWait: true });
    c.slider({ label: 'x (kilo)', min: 0, max: 8, step: 0.5, value: 6, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c4', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'f(x) ≤ g(x) ve f(x) ≥ g(x)', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'f(x) ≤ g(x) ve f(x) ≥ g(x)', hook: 'Bir kargo firması 40 lira artı kilo başına 10 lira, öbürü yalnızca kilo başına 20 lira alıyor. <b>Hangisi kaç kilodan sonra daha ucuz olur?</b>', button: 'Derse başla ›' },
    goals: ['f(x) ≤ g(x) ve f(x) ≥ g(x) eşitsizliklerini grafikte yorumlar.', 'Eşitsizliği cebirle çözer, uç noktanın dahil olup olmadığına karar verir.', 'f(x) &lt; 0 eşitsizliğini g(x) = 0 olan özel hâl olarak görür.'],
    scenes: [
      { title: 'Grafikte', goal: 'Altta kalan doğruyu ve çözüm aralığını gör.', run: grafikte },
      { title: 'Cebirle', goal: 'Aynı eşitsizliği cebirle çöz.', run: cebirle },
      { title: 'Özel hâl: g(x) = 0', goal: 'f(x) < 0 eşitsizliğini bu dersin içinde gör.', run: ozelHal },
      { title: 'Dene', goal: 'Ağırlığı değiştir, iki ücreti karşılaştır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = x + 6 ve g(x) = 3x için f(x) ≥ g(x) eşitsizliğinin çözümü hangisidir?', options: ['x ≥ 3', 'x ≤ 3', 'x ≤ 6'], answer: 1,
        why: ['x = 4 dene: f(4) = 10, g(4) = 12. Sağlamıyor.', 'x + 6 ≥ 3x ise 6 ≥ 2x, yani x ≤ 3.', 'x = 6 dene: f(6) = 12, g(6) = 18. Sağlamıyor.'], scene: 1 },
      { q: 'f(x) &lt; 0, f(x) &lt; g(x) eşitsizliğinin özel hâlidir. Bu hâlde g(x) kaçtır?', options: ['x', '1', '0'], answer: 2,
        why: ['g(x) = x olsaydı eşitsizlik f(x) &lt; x olurdu.', 'g(x) = 1 olsaydı eşitsizlik f(x) &lt; 1 olurdu.', 'g(x) = 0: grafiği x eksenidir.'], scene: 2 },
    ],
    summary: [
      '<b>Eşitsizlik, hangi doğrunun üstte kaldığını sorar.</b>',
      'f(x) ≤ g(x): f’nin altta ya da eşit olduğu x’ler. ≤ ve ≥ işaretlerinde kesişim dahildir.',
      'f(x) &lt; 0, g(x) = 0 olan özel hâldir: x ekseni de bir grafiktir.',
    ],
    nextLesson: { href: 'c5-mutlak-deger-esittir-k.html', label: 'Sonraki: |f(x)| = k ›' },
  });
})();
