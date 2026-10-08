/* C8 — |f(x)| ≤ g(x) ve |f(x)| ≥ g(x)
   Çözüm, V'nin doğrunun altında ya da üstünde kaldığı aralıktır; cebirde önce eşitlik, sonra bölge denemesi.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, serit, etiket, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* C7'deki iki kurye: |x − 3| ve x/2. Birimler kare (56 birim). */
  const DZ = { x0: 56, y0: 92, w: 560, h: 392, xmin: -1, xmax: 9, ymin: -1, ymax: 6, xsayi: 2, ysayi: 2 };
  const SAG = 812;
  const dusey = (dz, x, y) => S('line', { x1: dz.X(x), y1: dz.Y(y), x2: dz.X(x), y2: dz.Y(0), stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
  const esitsizlik = (p, x, y, isaret, o) => yazi(p, x, y, [['|x − 3|', RENK.mutlak], ' ' + isaret + ' ', ['x/2', RENK.g]], Object.assign({ size: 42, kalin: 700 }, o));
  /* Düzlem, V, doğru ve iki kesişim noktası. */
  function kur(svg) {
    const dz = duzlem(svg, DZ);
    const v = kirik(dz, mutlakNoktalar(dz, 1, -3)), g = dogru(dz, 0.5, 0, { renk: RENK.g });
    const p1 = nokta(dz, 2, 1), p2 = nokta(dz, 6, 3);
    return { dz, v, g, p1, p2 };
  }

  /* ---- 1. Altta kalan ---- */
  async function altta(c) {
    const svg = c.svg(1000, 562);
    const { dz, v, g, p1, p2 } = kur(svg);
    const alt = kirik(dz, [[2, 1], [3, 0], [6, 3]], { kalin: 9 });
    const d1 = dusey(dz, 2, 1), d2 = dusey(dz, 6, 3);
    const s = serit(dz, 'x', 4, 4);
    const u1 = nokta(dz, 2, 0), u2 = nokta(dz, 6, 0);
    const esit = esitsizlik(svg, SAG, 220, '≤');
    const cozum = yazi(svg, SAG, 300, '[2, 6]', { size: 42, kalin: 700, renk: RENK.sifir });
    gizle(v.el, g.el, p1.el, p2.el, alt.el, d1, d2, s.el, u1.el, u2.el, esit, cozum);

    await par(soyle(c, 'Kuryeler aynı; kesişimler yine 2 ve 6.'), (async () => {
      await par(ciz(c, v, 800), ciz(c, g, 800)); await par(pop(c, p1, dz.X(2), dz.Y(1), 320), pop(c, p2, dz.X(6), dz.Y(3), 320));
    })());
    await par(soyle(c, 'Birinci kurye daha pahalı olmasın: V, doğruyu aşmasın.', { speak: 'Birinci kurye daha pahalı olmasın: V grafiği doğruyu aşmasın.' }), belir(c, esit, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'V hangi x’lerde doğrunun altında ya da üzerinde?',
      options: ['2’den küçüklerde', '2 ile 6 arasında', '6’dan büyüklerde'], answer: 1,
      hints: ['Orada sol kol doğrunun üstünde: x = 0’da 3’e karşı 0.', '', 'Orada sağ kol doğrunun üstünde: x = 8’de 5’e karşı 4.'],
      right: 'İki kesişim arasında V altta kalır.',
    });
    await par(soyle(c, 'İki kesişim arasında V, doğrunun altında kalıyor.', { speak: 'İki kesişim arasında V grafiği doğrunun altında kalıyor.' }), (async () => { await belir(c, v.el, 300, 0.35); await ciz(c, alt, 800); })());
    await par(soyle(c, 'Gölgesi x ekseninde tek parça.'), (async () => {
      await belir(c, [d1, d2], 350); s.el.style.opacity = 0.9;
      await c.tween(800, (e) => s.ayarla(lerp(4, 2, e), lerp(4, 6, e)), ease.inOut);
    })());
    await par(soyle(c, 'Kesişimlerde eşitlik var: ≤ uçları da alır, noktalar dolu.', { speak: 'Kesişimlerde eşitlik var: küçük eşit işareti uçları da alır, noktalar dolu.' }), (async () => {
      await par(pop(c, u1, dz.X(2), dz.Y(0), 320), pop(c, u2, dz.X(6), dz.Y(0), 320)); await belir(c, cozum, 400);
    })());
    c.note('<b>|f(x)| ≤ g(x):</b> V’nin doğrunun altında kaldığı aralık.<br>[2, 6]', 'Altta kalan', 'c8-altta');
  }

  /* ---- 2. Üstte kalan ---- */
  async function ustte(c) {
    const svg = c.svg(1000, 562);
    const { dz, v } = kur(svg);
    const ust1 = kirik(dz, [[-1, 4], [2, 1]], { kalin: 9 }), ust2 = kirik(dz, [[6, 3], [9, 6]], { kalin: 9 });
    const d1 = dusey(dz, 2, 1), d2 = dusey(dz, 6, 3);
    const s1 = serit(dz, 'x', 2, 2), s2 = serit(dz, 'x', 6, 6);
    const u1 = nokta(dz, 2, 0), u2 = nokta(dz, 6, 0);
    const esit = esitsizlik(svg, SAG, 170, '≥');
    const cozum = yazi(svg, SAG, 245, '(−∞, 2] ∪ [6, ∞)', { size: 34, kalin: 700, renk: RENK.sifir });
    // deneme: x'teki iki değer ve aralarındaki işaret
    const sonda = S('line', { stroke: RENK.yazi, 'stroke-width': 2, 'stroke-dasharray': '4 6', opacity: 0.7 }, dz.orta);
    const sv = nokta(dz, 4, 1, { renk: RENK.mutlak, r: 9 }), sg = nokta(dz, 4, 2, { renk: RENK.g, r: 9 });
    const kars = yazi(svg, SAG, 400, '', { size: 50, kalin: 700 });
    gizle(ust1.el, ust2.el, d1, d2, s1.el, s2.el, u1.el, u2.el, esit, cozum, sonda, sv.el, sg.el);

    await par(soyle(c, 'Şimdi tersini sor: V nerede doğrunun üstünde ya da üzerinde?', { speak: 'Şimdi tersini sor: V grafiği nerede doğrunun üstünde ya da üzerinde?', ton: 'curious' }), belir(c, esit, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'x = 2 bu eşitsizliğin çözümü mü?',
      options: ['Hayır: orada V üstte değil', 'Evet: orada iki yan eşit'], answer: 1,
      hints: ['≥ işareti eşitliği de kabul eder; 2’de iki yan da 1.', ''],
      right: '≥ işareti eşitliği de kabul eder.',
    });
    await par(soyle(c, 'V iki kolda doğrunun üstünde.', { speak: 'V grafiği iki kolda doğrunun üstünde.' }), (async () => { await belir(c, v.el, 300, 0.35); await par(ciz(c, ust1, 700), ciz(c, ust2, 700)); })());
    await par(soyle(c, 'Gölgeler iki yana uzar; uçlar bu kez dolu.'), (async () => {
      await belir(c, [d1, d2], 350); s1.el.style.opacity = 0.9; s2.el.style.opacity = 0.9;
      await c.tween(900, (e) => { s1.ayarla(lerp(2, -1, e), 2); s2.ayarla(6, lerp(6, 9, e)); }, ease.inOut);
      await par(pop(c, u1, dz.X(2), dz.Y(0), 320), pop(c, u2, dz.X(6), dz.Y(0), 320));
    })());
    await par(soyle(c, 'Çözüm iki aralığın birleşimi.'), belir(c, cozum, 450));
    await soyle(c, '2 ve 6 iki çözümde de var: orada eşitlik sağlanır.', { speak: 'İki ile altı, her iki çözümde de var: orada eşitlik sağlanır.' });
    c.note('<b>|f(x)| ≥ g(x):</b> V’nin üstte kaldığı yerler.<br>(−∞, 2] ∪ [6, ∞)', 'Üstte kalan', 'c8-ustte');

    const koy = (x) => {
      const a = Math.abs(x - 3), b = x / 2;
      sonda.setAttribute('x1', dz.X(x)); sonda.setAttribute('x2', dz.X(x)); sonda.setAttribute('y1', dz.Y(Math.min(0, b))); sonda.setAttribute('y2', dz.Y(6));
      sv.git(x, a); sg.git(x, b);
      yaz(kars, [[sayi(a), RENK.mutlak], a > b ? ' > ' : a < b ? ' < ' : ' = ', [sayi(b), RENK.g]]);
    };
    await soyle(c, 'x’i kaydır: üstteki grafik nerede değişiyor?', { noWait: true });
    sonda.style.opacity = 0.7; sv.el.style.opacity = 1; sg.el.style.opacity = 1;
    c.slider({ label: 'x', min: -1, max: 9, step: 1, value: 4, fmt: (x) => sayi(x), onInput: koy });
    await c.cont('Devam ›');
  }

  /* ---- 3. Cebirle ---- */
  async function cebirle(c) {
    const svg = c.svg(1000, 562);
    const X = (v) => 120 + ((v + 1) / 10) * 760, YD = 230;
    const bas = esitsizlik(svg, 500, 100, '≤');
    const eksen = S('g', {}, svg);
    S('line', { x1: 98, y1: YD, x2: 902, y2: YD, stroke: RENK.eksen, 'stroke-width': 2.5 }, eksen);
    S('path', { d: `M912,${YD} l-11,-6 v12 z`, fill: RENK.eksen }, eksen); S('path', { d: `M88,${YD} l11,-6 v12 z`, fill: RENK.eksen }, eksen);
    for (let k = -1; k <= 9; k++) S('line', { x1: X(k), y1: YD - 6, x2: X(k), y2: YD + 6, stroke: RENK.eksen, 'stroke-width': 2 }, eksen);
    const bant = S('line', { x1: X(2), y1: YD, x2: X(6), y2: YD, stroke: RENK.sifir, 'stroke-width': 10, opacity: 0.9 }, svg);
    const ayrac = [2, 6].map((k) => S('line', { x1: X(k), y1: 160, x2: X(k), y2: 420, stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 7', opacity: 0.7 }, svg));
    const es = [2, 6].map((k) => S('circle', { cx: X(k), cy: YD, r: 9, fill: RENK.sifir }, svg));
    const esAd = [2, 6].map((k) => yazi(svg, X(k) + 20, YD - 22, String(k), { size: 28, kalin: 700, renk: RENK.sifir }));
    const den = [0, 4, 8].map((k) => S('circle', { cx: X(k), cy: YD, r: 7, fill: RENK.yazi }, svg));
    const denAd = [0, 4, 8].map((k) => yazi(svg, X(k), YD + 40, String(k), { size: 26, kalin: 700 }));
    const sonuc = [['3 ≤ 0', 'yanlış', RENK.kotu], ['1 ≤ 2', 'doğru', RENK.iyi], ['5 ≤ 4', 'yanlış', RENK.kotu]].map(([a, b, renk], i) => {
      const gg = S('g', {}, svg), x = X([0, 4, 8][i]);
      yazi(gg, x, 335, a, { size: 34, kalin: 700, renk }); yazi(gg, x, 380, b, { size: 24, renk });
      return gg;
    });
    const cozum = yazi(svg, X(4), 480, '[2, 6]', { size: 44, kalin: 700, renk: RENK.sifir });
    gizle(bas, eksen, bant, ayrac, es, esAd, den, denAd, sonuc, cozum);

    await par(soyle(c, 'Grafik olmadan da çözülür: önce eşitliği çöz.'), (async () => { await belir(c, bas, 450); await belir(c, eksen, 400); })());
    await par(soyle(c, 'Eşitliği önceki derste çözdün: 2 ve 6.', { dur: true }), belir(c, [...es, ...esAd], 450));
    await par(soyle(c, 'Bu iki sayı ekseni üç bölgeye ayırır.'), belir(c, ayrac, 450, 0.7));
    await par(soyle(c, 'Her bölgeden bir sayı seç ve eşitsizlikte dene.'), belir(c, [...den, ...denAd], 450));
    await par(soyle(c, 'Soldan 0: sol yan 3, sağ yan 0.'), belir(c, sonuc[0], 450));
    await c.choice({
      tag: 'Tahmin et', q: 'Ortadan 4’ü dene: |4 − 3| ≤ 4/2 doğru mu?',
      options: ['Yanlış', 'Doğru'], answer: 1,
      hints: ['Sol yan 1, sağ yan 2 eder; 1 ≤ 2 doğrudur.', ''],
      right: 'Sol yan 1, sağ yan 2: 1 ≤ 2 doğru.',
    });
    await par(soyle(c, 'Ortadaki bölge eşitsizliği sağlıyor.'), belir(c, sonuc[1], 450));
    await par(soyle(c, 'Sağdan 8: sol yan 5, sağ yan 4.'), belir(c, sonuc[2], 450));
    await soyle(c, 'Bölge içinde üstteki grafik değişmez; tek deneme yeter.', { ton: 'thoughtful' });
    await par(soyle(c, 'Çözüm ortadaki bölge; eşitlik olduğu için uçlar dahil.'), (async () => { await belir(c, bant, 450, 0.9); await belir(c, cozum, 450); })());
    c.note('Önce eşitliği çöz.<br>Sonra her bölgeden bir sayı dene.', 'Cebirle', 'c8-cebir');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 40, y0: 122, w: 440, h: 308, xmin: -5, xmax: 5, ymin: -1, ymax: 6, sayilar: false, xad: '', yad: '' });
    const v = kirik(dz, mutlakNoktalar(dz, 1, 0)); dogru(dz, 1, 2, { renk: RENK.g });
    const sol = kirik(dz, [[-5, 5], [-1, 1]], { kalin: 9 });
    const s = serit(dz, 'x', -5, -1);
    const d = dusey(dz, -1, 1);
    const pk = nokta(dz, -1, 1), uc = nokta(dz, -1, 0), p0 = nokta(dz, 0, 0, { renk: RENK.kotu, r: 7 }), p3 = nokta(dz, -3, 0, { renk: RENK.iyi, r: 7 });
    const mk = etiket(dz, -1, 0, '−1', { dy: 28, renk: RENK.sifir }), m0 = etiket(dz, 0, 0, '0', { dy: 28, dx: 12, renk: RENK.kotu }), m3 = etiket(dz, -3, 0, '−3', { dy: 28, dx: -16, renk: RENK.iyi });
    gizle(sol.el, s.el, d, pk.el, uc.el, p0.el, p3.el, mk, m0, m3);
    yazi(svg, 740, 120, [['|x|', RENK.mutlak], ' ≥ ', ['x + 2', RENK.g]], { size: 42, kalin: 700 });
    const tb = soruTahtasi(c, svg, { x: 510, y: 165, w: 460, h: 150, size: 38 });
    const ac = (...els) => els.forEach((e) => { (e.el || e).style.opacity = 1; });

    await soyle(c, 'Sıra sende: önce eşitlik, sonra bölgeler.', { noWait: true });
    await tb.sor('|x| = x + 2', {
      q: 'Grafikler kaç noktada kesişiyor?', options: ['İki', 'Bir', 'Hiç'], answer: 1,
      hints: ['Sağ kol ile doğru yan yana gider, hiç buluşmaz.', '', 'Sol kol doğruyu kesiyor.'],
      right: 'Yalnızca sol kol kesiyor: −x = x + 2, x = −1.', kanit: 'tek kesişim: x = −1', renk: RENK.sifir,
      onPick: (k, ok) => { if (ok) ac(pk, d, mk); },
    });
    await tb.sor('x = 0:   |0| ≥ 0 + 2', {
      q: 'x = 0 eşitsizliği sağlar mı?', options: ['Sağlar', 'Sağlamaz'], answer: 1,
      hints: ['Sol yan 0, sağ yan 2 eder; 0 ≥ 2 yanlıştır.', ''],
      right: '−1’in sağındaki bölge çözümde değil.', kanit: '0 ≥ 2 yanlış', renk: RENK.kotu,
      onPick: (k, ok) => { if (ok) ac(p0, m0); },
    });
    await tb.sor('x = −3:   |−3| ≥ −3 + 2', {
      q: 'x = −3 eşitsizliği sağlar mı?', options: ['Sağlar', 'Sağlamaz'], answer: 0,
      hints: ['', 'Sol yan 3, sağ yan −1 eder; 3 ≥ −1 doğrudur.'],
      right: '−1’in solundaki bölge çözümde.', kanit: '3 ≥ −1 doğru',
      onPick: (k, ok) => { if (ok) ac(p3, m3); },
    });
    await tb.sor('çözüm kümesi = ?', {
      q: 'Çözüm kümesi hangisidir?', options: ['[−1, ∞)', '(−∞, −1)', '(−∞, −1]'], answer: 2,
      hints: ['Sağ bölgeden denediğin 0 eşitsizliği sağlamadı.', '−1’de iki yan eşit; ≥ eşitliği de alır.', ''],
      right: 'Sol bölge ve eşitlik noktası birlikte.', sonra: '(−∞, −1]', kanit: 'sol bölge ve kesişim noktası', renk: RENK.sifir,
      onPick: (k, ok) => { if (ok) { v.el.style.opacity = 0.35; p0.el.style.opacity = 0; p3.el.style.opacity = 0; m0.style.opacity = 0; m3.style.opacity = 0; s.el.style.opacity = 0.9; ac(sol, uc); } },
    });
    await soyle(c, 'Sol kol doğrunun üstünde: çözüm −1 ve solu.', { speak: 'Sol kol doğrunun üstünde: çözüm, eksi bir ve eksi birden küçük bütün sayılar.' });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c8', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: '|f(x)| ≤ g(x) ve |f(x)| ≥ g(x)', accent: '#ff8a5b', back: 'index.html',
    intro: { title: '|f(x)| ≤ g(x) ve |f(x)| ≥ g(x)', hook: 'İki kuryeyi hatırla. <b>Hangi mesafelerde birincinin ücreti ikincisinden fazla olmaz?</b>', button: 'Derse başla ›' },
    goals: ['|f(x)| ≤ g(x) ve |f(x)| ≥ g(x) eşitsizliklerini grafikten çözer.', 'Eşitlik noktalarının ayırdığı bölgeleri sayı deneyerek sınar.', 'Uçların çözüme dahil olduğunu görür.'],
    scenes: [
      { title: 'Altta kalan', goal: 'V’nin doğrunun altında kaldığı aralığı bul.', run: altta },
      { title: 'Üstte kalan', goal: 'V’nin doğrunun üstünde kaldığı iki aralığı bul.', run: ustte },
      { title: 'Cebirle', goal: 'Önce eşitliği çöz, sonra her bölgeden bir sayı dene.', run: cebirle },
      { title: 'Sıra sende', goal: 'Aynı yolu yeni bir eşitsizlikte uygula.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '|x − 3| ile x/2 grafikleri 2 ve 6’da kesişiyor; x = 4 için |x − 3| ≤ x/2 doğru. Çözüm kümesi hangisidir?', options: ['(−∞, 2] ∪ [6, ∞)', '(2, 6)', '[2, 6]'], answer: 2,
        why: ['Bunlar dış bölgeler; denenen 4 ise ortadaki bölgede.', 'Uçlarda eşitlik var; ≤ işareti uçları da alır.', 'Denenen 4 ortadaki bölgede; eşitlik olduğu için uçlar da çözümde.'], scene: 2 },
      { q: 'V’nin doğrunun üstünde ya da üzerinde kaldığı yerler hangi eşitsizliğin çözümüdür?', options: ['|f(x)| ≤ g(x)', '|f(x)| ≥ g(x)', '|f(x)| = g(x)'], answer: 1,
        why: ['Bu, V’nin doğrunun altında ya da üzerinde kaldığı yerleri sorar.', 'Üstte kalan grafik daha büyük değeri verir: |f(x)| ≥ g(x).', 'Eşitlik yalnızca kesişim noktalarını verir.'], scene: 1 },
      { q: '|x − 4| = x/2 + 1 denkleminin çözümleri 2 ve 10’dur. |x − 4| ≥ x/2 + 1 eşitsizliğinin çözüm kümesi hangisidir?', options: ['[2, 10]', '(−∞, 2) ∪ (10, ∞)', '(−∞, 2] ∪ [10, ∞)'], answer: 2,
        why: ['x = 5 dene: 1 ≥ 3,5 yanlış; orta bölge çözüm değil.', 'Uçlarda eşitlik var; ≥ uçları da alır.', 'x = 0 ve x = 12 sağlar; uçlar eşitlikten dolayı dahil.'], scene: 2 },
      { q: 'V ile doğru x = 1 ve x = 5’te kesişiyor; ikisinin arasında V doğrunun altında kalıyor. |f(x)| &lt; g(x) eşitsizliğinin çözüm kümesi hangisidir?', options: ['(1, 5)', '[1, 5]', '(−∞, 1) ∪ (5, ∞)'], answer: 0,
        why: ['Kesişimlerde eşitlik var; &lt; eşitliği almaz, uçlar dışarıda kalır.', 'Uçları da alan işaret ≤ olurdu; &lt; eşitliği kabul etmez.', 'V dış bölgelerde doğrunun üstünde; &lt; için altında kaldığı aralık gerekir.'], scene: 0 },
    ],
    summary: [
      '<b>Önce eşitliği çöz, sonra hangi grafiğin üstte kaldığına bak.</b>',
      '|f(x)| ≤ g(x): V’nin doğrunun altında ya da üzerinde kaldığı aralık. ≥ için üstte kaldığı yerler.',
      'Eşitlik noktaları ekseni bölgelere ayırır; her bölgeden bir sayı denemek yeter.',
    ],
    nextLesson: { href: 'c9-cozumu-baska-yoldan-sinamak.html', label: 'Sonraki: Çözümü başka yoldan sınamak ›' },
  });
})();
