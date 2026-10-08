/* C2 — f(x) = 0, f(x) < 0 ve f(x) > 0
   Fonksiyonun sıfırı (kök) denklemin, işareti eşitsizliğin çözümünü verir. Bağlam: boşalan tank, f(x) = −5x + 60.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, MIN, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, serit, alan, etiket, isaretTablosu, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* dakika–litre düzlemi: f(x) = −5x + 60, kök 12 */
  const DZ = (o) => Object.assign({ x0: 80, y0: 40, w: 450, h: 450, xmin: -2, xmax: 18, ymin: -20, ymax: 70, xadim: 2, yadim: 10, xsayi: 4, ysayi: 20, xad: 'dakika', yad: 'litre', xyaz: kokYok(16) }, o);
  /* kökün sayısı eksenin altına değil, doğrunun değmediği yana sarı yazılır */
  const kokYok = (...ks) => (v) => (ks.includes(v) ? '' : sayi(v));

  /* ---- 1. f(x) = 0 ---- */
  async function sifir(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ());
    const d = dogru(dz, -5, 60, { x1: 0, x2: 0 });
    const p = nokta(dz, 0, 60, { renk: RENK.f, r: 8 });
    const kuralT = etiket(dz, 5, 52, 'f(x) = −5x + 60', { renk: RENK.f, hiza: 'start', size: 24 });
    const kok = nokta(dz, 12, 0, { r: 10 });
    const kokAd = etiket(dz, 12, 0, 'kök', { renk: RENK.sifir, dx: 12, dy: -16, hiza: 'start', size: 24 });
    // tank: 60 litre = 216 birim
    const TX = 630, TW = 120, ALT = 290, L = 3.6;
    const su = S('rect', { x: TX + 3, width: TW - 6, fill: RENK.f, 'fill-opacity': 0.55 }, svg);
    S('path', { d: `M${TX},58 V${ALT} H${TX + TW} V58`, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
    [20, 40, 60].forEach((v) => S('line', { x1: TX, y1: ALT - v * L, x2: TX + 20, y2: ALT - v * L, stroke: RENK.yazi, 'stroke-width': 2.5 }, svg));
    S('line', { x1: TX + TW, y1: ALT - 9, x2: TX + TW + 30, y2: ALT - 9, stroke: RENK.eksen, 'stroke-width': 12, 'stroke-linecap': 'round' }, svg);
    const akis = S('line', { x1: TX + TW + 30, y1: ALT - 2, x2: TX + TW + 30, y2: ALT + 44, stroke: RENK.f, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 }, svg);
    const okuma = yazi(svg, TX + TW + 56, 180, '', { size: 32, kalin: 700, renk: RENK.f, hiza: 'start' });
    const koy = (t) => {
      const v = 60 - 5 * t;
      d.ayarla(-5, 60, 0, t); p.git(t, v);
      su.setAttribute('y', ALT - v * L); su.setAttribute('height', v * L);
      yaz(okuma, sayi(Math.round(v)) + ' litre');
    };
    koy(0);
    const denk = yazi(svg, 780, 410, 'f(x) = 0', { size: 38, kalin: 700 });
    const cozum = yazi(svg, 780, 474, ['x = −b/a = ', ['12', RENK.sifir]], { size: 34, kalin: 700 });
    gizle(kuralT, kok.el, kokAd, denk, cozum);
    const bosalt = async (t1, t2, ms) => { akis.style.opacity = 0.9; await c.tween(ms, (e) => koy(lerp(t1, t2, e)), ease.linear); akis.style.opacity = 0; };

    await par(soyle(c, 'Tank 60 litre; her dakika 5 litre boşalıyor.'), bosalt(0, 4, 2600));
    await par(soyle(c, 'Kalan suyun kuralı: 60’tan dakika başına 5 eksilir.'), belir(c, kuralT, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Tank kaç dakikada boşalır?',
      options: ['5 dakika', '12 dakika', '60 dakika'], answer: 1,
      hints: ['5, bir dakikada boşalan litredir.', '', 'Dakikada 1 litre boşalsaydı 60 dakika sürerdi.'],
      right: '60 litre, dakikada 5 litre: 12 dakika.',
    });
    await par(soyle(c, 'Su 12. dakikada biter: grafik x eksenine iner.'),
      (async () => { await bosalt(4, 12, 3200); await pop(c, kok, dz.X(12), dz.Y(0)); })());
    await par(soyle(c, 'Tankın boşaldığı an, f(x) = 0 denkleminin çözümüdür.'), belir(c, denk, 500));
    await par(soyle(c, 'Denklemin çözümü fonksiyonun sıfırıdır; adı <b>kök</b>.'), belir(c, kokAd, 500));
    await par(soyle(c, 'Hesapla da bulunur: a = −5, b = 60.', { dur: true }), belir(c, cozum, 500));
    c.note('<b>Kök:</b> f(x) = 0’ın çözümü.<br>−5x + 60 için 12', 'f(x) = 0', 'c2-kok');
  }

  /* 2. ve 3. sahnenin ortak kuruluşu */
  function kur(c, baslikMetni) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ({ xyaz: kokYok(12, 16) }));
    const ust = alan(dz, [[-2, 0], [-2, 70], [12, 0]], { renk: RENK.arti, op: 0.24 });
    const alt = alan(dz, [[12, 0], [16, -20], [18, -20], [18, 0]], { renk: RENK.eksi, op: 0.3 });
    const d = dogru(dz, -5, 60);
    etiket(dz, 4, 40, 'f', { renk: RENK.f, dx: 18, dy: -8, size: 26 });
    const cozum = serit(dz, 'x', 12, 12);
    const kok = nokta(dz, 12, 0, { r: 9 });
    etiket(dz, 12, 0, '12', { renk: RENK.sifir, dx: 12, dy: -14, hiza: 'start' });
    const baslik = yazi(svg, 775, 112, baslikMetni, { size: 42, kalin: 700 });
    const it = isaretTablosu(svg, { x: 590, y: 170, w: 370, ad: 'f(x)', kok: '12', sol: '+', sag: MIN });
    const sonuc = yazi(svg, 775, 372, '', { size: 42, kalin: 700, renk: RENK.sifir });
    gizle(ust.el, alt.el, cozum.el, baslik, it.g, sonuc);
    return { svg, dz, ust, alt, d, cozum, kok, baslik, it, sonuc };
  }

  /* ---- 2. f(x) > 0 ---- */
  async function pozitif(c) {
    const { dz, ust, alt, d, cozum, kok, baslik, it, sonuc } = kur(c, 'f(x) > 0');
    const bas = nokta(dz, 0, 0, { r: 9 }); gizle(bas.el);
    d.ayarla(-5, 60, 0, 12);

    await par(soyle(c, 'Kuralı gerçek sayılarda düşün: doğru iki yana uzar.'),
      c.tween(1000, (e) => d.ayarla(-5, 60, lerp(0, -2, e), lerp(12, 18, e)), ease.inOut));
    await par(soyle(c, '“Tankta su var” demek f(x) &gt; 0 demek.'), belir(c, baslik, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Su olan dakikalarda doğru nerededir?',
      options: ['Eksenin altında', 'Eksenin üstünde', 'Tam eksenin üzerinde'], answer: 1,
      hints: ['Eksenin altında değerler negatiftir; su eksi olmaz.', '', 'Eksenin üzerinde f(x) = 0’dır: su bitmiştir.'],
      right: 'Eksenin üstünde f(x) pozitiftir.',
    });
    await par(soyle(c, 'Kökün solunda doğru eksenin üstünde: değerler pozitif.'), belir(c, ust.el, 600));
    await par(soyle(c, 'İşaret tablosu aynısını söyler: kökün solu artı, sağı eksi.'),
      (async () => { await belir(c, it.g, 500); await belir(c, alt.el, 500); })());
    await par(soyle(c, 'Çözüm, eksenin kökten soldaki parçası; kök dahil değil.'), (async () => {
      cozum.el.style.opacity = 0.9; kok.bos(true);
      await c.tween(800, (e) => cozum.ayarla(lerp(12, -2, e), 12), ease.inOut);
      yaz(sonuc, 'x < 12'); await belir(c, sonuc, 400);
    })());
    await par(soyle(c, 'Tankta süre 0’dan başlar: çözüm daralır.'), (async () => {
      await c.tween(800, (e) => cozum.ayarla(lerp(-2, 0, e), 12), ease.inOut);
      await pop(c, bas, dz.X(0), dz.Y(0)); yaz(sonuc, '0 ≤ x < 12');
    })());
    c.note('<b>f(x) &gt; 0:</b> grafik eksenin üstünde.<br>Burada x &lt; 12', 'f(x) > 0', 'c2-pozitif');
  }

  /* ---- 3. f(x) < 0 ---- */
  async function negatif(c) {
    const { svg, alt, cozum, kok, baslik, it, sonuc } = kur(c, 'f(x) < 0');
    const aralik = yazi(svg, 775, 436, '(12, ∞)', { size: 34, kalin: 700, renk: RENK.sifir }); gizle(aralik);
    it.g.style.opacity = 1;

    await par(soyle(c, 'Şimdi öbür soru: f(x) hangi x’lerde negatif?', { speak: 'Şimdi öbür soru: f x hangi x değerleri için negatif?', ton: 'curious' }), belir(c, baslik, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Gerçek sayılarda f(x) &lt; 0’ın çözümü hangisi?',
      options: ['(−∞, 12)', '[12, ∞)', '(12, ∞)'], answer: 2,
      hints: ['Kökün solunda doğru eksenin üstünde: değerler pozitif.', 'x = 12 için f(x) = 0’dır; 0 &lt; 0 olmaz.', ''],
      right: 'Kökün sağı; kök hariç.',
    });
    await par(soyle(c, 'Kökün sağında doğru eksenin altında: tabloda eksi taraf.'), belir(c, alt.el, 600), belir(c, it.sol, 400, 0.35));
    await par(soyle(c, 'Çözüm, eksenin kökten sağdaki parçası; kök yine dahil değil.'), (async () => {
      cozum.el.style.opacity = 0.9; kok.bos(true);
      await c.tween(800, (e) => cozum.ayarla(12, lerp(12, 18, e)), ease.inOut);
      yaz(sonuc, 'x > 12'); await belir(c, sonuc, 400); await belir(c, aralik, 400);
    })());
    await soyle(c, 'Tank için bunun anlamı yok: su eksiye düşmez.', { ton: 'thoughtful' });
    await soyle(c, 'Kural gerçek sayılarda çözülür; sonuç probleme göre yorumlanır.');
    c.note('<b>f(x) &lt; 0:</b> grafik eksenin altında.<br>Burada x &gt; 12', 'f(x) < 0', 'c2-negatif');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 440, h: 440, xmin: -2, xmax: 8, ymin: -5, ymax: 5, xyaz: kokYok(4) });
    const d = dogru(dz, 2, -6); gizle(d.el);
    const cozum = serit(dz, 'x', -2, 3);
    const p = nokta(dz, 3, 0, { r: 9 });
    const ad3 = etiket(dz, 3, 0, '3', { renk: RENK.sifir, dx: -12, dy: -12, hiza: 'end' });
    const ad4 = etiket(dz, 4, 0, '4', { renk: RENK.sifir, dx: 12, dy: -12, hiza: 'start' });
    gizle(cozum.el, p.el, ad3, ad4);
    const ac = (...els) => els.forEach((e) => { e.style.opacity = e === cozum.el ? 0.9 : 1; });
    const tb = soruTahtasi(c, svg, { x: 580, y: 150, w: 380, h: 150, size: 42 });
    await soyle(c, 'Doğruya bak; çözümü x ekseninde ara.', { noWait: true });

    yaz(tb.ifade, '2x − 6 = 0'); await ciz(c, d, 800);
    await tb.sor('2x − 6 = 0', {
      q: 'Denklemin çözümü hangisi?', options: ['x = −3', 'x = 3', 'x = 6'], answer: 1,
      hints: ['2 · (−3) − 6 = −12 eder; sıfır etmez.', '', '2 · 6 − 6 = 6 eder; sıfır etmez.'],
      right: 'Doğru x eksenini 3’te keser.', kanit: 'kök: x = 3',
      onPick: (k, ok) => { if (ok) ac(p.el, ad3); },
    });
    await tb.sor('2x − 6 < 0', {
      q: 'Eşitsizliğin çözümü hangisi?', options: ['x &gt; 3', 'x ≤ 3', 'x &lt; 3'], answer: 2,
      hints: ['Doğru artan: kökün sağında eksenin üstünde kalır.', 'x = 3 için değer 0’dır; 0 &lt; 0 olmaz.', ''],
      right: 'Artan doğru kökün solunda eksenin altında.', kanit: 'x < 3: (−∞, 3)',
      onPick: (k, ok) => { if (ok) { p.bos(true); ac(cozum.el); } },
    });
    gizle(cozum.el, p.el, ad3); yaz(tb.ifade, '−x + 4 > 0'); yaz(tb.alt, '');
    await c.tween(900, (e) => d.ayarla(lerp(2, -1, e), lerp(-6, 4, e)), ease.inOut);
    p.git(4, 0); cozum.ayarla(-2, 4);
    await tb.sor('−x + 4 > 0', {
      q: 'Eşitsizliğin çözümü hangisi?', options: ['x &lt; 4', 'x &gt; 4', 'x &lt; −4'], answer: 0,
      hints: ['', 'Doğru azalan: kökün sağında eksenin altında kalır.', 'Kök 4’tür: −4 + 4 = 0.'],
      right: 'Azalan doğru kökün solunda eksenin üstünde.', kanit: 'x < 4: (−∞, 4)',
      onPick: (k, ok) => { if (ok) ac(cozum.el, p.el, ad4); },
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c2', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'f(x) = 0, f(x) < 0 ve f(x) > 0', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'f(x) = 0, f(x) < 0 ve f(x) > 0', hook: '60 litrelik bir tank dakikada 5 litre boşalıyor. <b>Kaç dakika sonra su kalmaz, kaç dakika boyunca su vardır?</b>', button: 'Derse başla ›' },
    goals: ['f(x) = 0 denklemini fonksiyonun sıfırıyla çözer.', 'f(x) &gt; 0 ve f(x) &lt; 0 eşitsizliklerini grafikten ve işaret tablosundan okur.', 'Çözümü problemin bağlamına göre yorumlar.'],
    scenes: [
      { title: 'f(x) = 0', goal: 'Denklemin çözümünü grafikte bul.', run: sifir },
      { title: 'f(x) > 0', goal: 'Pozitif olduğu yerleri grafikten ve tablodan oku.', run: pozitif },
      { title: 'f(x) < 0', goal: 'Negatif olduğu yerleri oku, bağlamı yorumla.', run: negatif },
      { title: 'Sıra sende', goal: 'Üç soruyu doğrudan oku.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '3x − 12 &gt; 0 eşitsizliğinin çözüm kümesi hangisidir?', options: ['(−∞, 4)', '(4, ∞)', '[4, ∞)'], answer: 1,
        why: ['Doğru artan: kökün solunda değerler negatiftir.', 'Kök 4; artan doğru kökün sağında pozitiftir.', 'x = 4 için değer 0’dır; 0 &gt; 0 olmaz.'], scene: 1 },
      { q: 'f(x) = 0 denkleminin çözümü grafikte nerededir?', options: ['y eksenini kestiği yerde', 'En yüksek noktada', 'x eksenini kestiği yerde'], answer: 2,
        why: ['Orada x = 0’dır; f(x)’in 0 olması gerekmez.', 'Doğrunun en yüksek noktası yoktur; aranan, değerin 0 olduğu yerdir.', 'x ekseninde değer 0’dır: f(x) = 0.'], scene: 0 },
      { q: 'Bir çay ocağının kârı k(x) = 4x − 60 kuralıyla bulunuyor (x satılan çay sayısı, k(x) lira). Kâr hangi x’ler için pozitiftir?', options: ['x &lt; 15', 'x &gt; 15', 'x &gt; 60'], answer: 1,
        why: ['Artan doğru kökün solunda negatiftir: orada zarar var.', 'Kök 15’tir; artan doğru kökün sağında pozitiftir.', '60 yalnızca sabit terimdir; kök −b/a = 15.'], scene: 1 },
      { q: 'Bir mumun boyu h(x) = 30 − 6x kuralıyla değişiyor (x saat, h(x) cm). h(x) &lt; 0 eşitsizliğinin çözümü x &gt; 5 bulundu. Bu, mum için ne anlama gelir?', options: ['Mum 5. saatte biter; sonrasındaki eksi boy mumda gerçekleşmez', 'Mum 5. saatten sonra eksi boyda yanmaya devam eder', 'Mum 5. saatten sonra daha hızlı kısalır'], answer: 0,
        why: ['h(5) = 0: mum tükenir. Eksi boy mum için anlamsızdır.', 'Boy eksi olamaz; kural gerçek sayılarda çözülür, sonuç probleme göre yorumlanır.', 'Kısalma hızı değişmez: her saat 6 cm.'], scene: 2 },
    ],
    summary: [
      '<b>Çözüm, fonksiyonun sıfırından ve işaretinden okunur.</b>',
      'f(x) = 0’ın çözümü <b>kök</b>tür: grafiğin x eksenini kestiği yer.',
      'f(x) &gt; 0 eksenin üstünde, f(x) &lt; 0 altında kalan x’lerdir; kök ikisine de dahil değildir.',
    ],
    nextLesson: { href: 'c3-iki-dogrunun-kesisimi.html', label: 'Sonraki: f(x) = g(x): iki doğrunun kesişimi ›' },
  });
})();
