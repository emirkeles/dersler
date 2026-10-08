/* A12 — Artanlığın ispatı
   a > 0 iken h(x) = ax + b artandır: x₁ < x₂ hipotezinden h(x₁) < h(x₂) hükmüne. a < 0 iken azalan.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, nokta, iz, etiket, adimlar, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* ---- 1. Artan, sembolle ---- */
  async function sembolle(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 62, w: 330, h: 440, xmin: -3, xmax: 3, ymin: -5, ymax: 7, sayilar: false });
    const h = (x) => 2 * x + 1;
    dogru(dz, 2, 1, { renk: RENK.g });
    /* Doğru üzerinde bir nokta, eksenlere inen izleri ve eksenlerdeki adları. */
    const ikili = (ad, renk) => {
      const izler = iz(dz, 0, 0), p = nokta(dz, 0, 0, { r: 9, renk });
      const ex = etiket(dz, 0, 0, 'x_{' + ad + '}', { renk }), ey = etiket(dz, 0, 0, 'h(x_{' + ad + '})', { renk });
      return { els: [izler.g, p.el, ex, ey], koy(x) {
        const y = h(x); p.git(x, y); izler.ayarla(x, y);
        ex.setAttribute('x', dz.X(x)); ex.setAttribute('y', dz.Y(0) + (y >= 0 ? 28 : -13));
        ey.setAttribute('text-anchor', x > 0 ? 'end' : 'start'); ey.setAttribute('x', dz.X(0) + (x > 0 ? -12 : 12)); ey.setAttribute('y', dz.Y(y) + 7);
      } };
    };
    const n1 = ikili('1', RENK.yazi), n2 = ikili('2', RENK.sifir);
    const X1 = -2; n1.koy(X1); n2.koy(1);
    const KX = 715;
    yazi(svg, KX, 104, 'h(x) = 2x + 1', { size: 36, kalin: 700, renk: RENK.g });
    const g = S('g', {}, svg);
    yazi(g, 600, 232, ['x_{1} < ', ['x_{2}', RENK.sifir]], { size: 32 });
    const sayiX = yazi(g, 850, 232, '', { size: 32, renk: RENK.soluk });
    yazi(g, 600, 312, ['h(x_{1}) < ', ['h(x_{2})', RENK.sifir]], { size: 32 });
    const sayiH = yazi(g, 850, 312, '', { size: 32, renk: RENK.soluk });
    const tanim1 = yazi(svg, KX, 240, '∀x_{1}, x_{2} ∈ ℝ için', { size: 30, renk: RENK.soluk });
    const tanim2 = yazi(svg, KX, 306, 'x_{1} < x_{2} iken h(x_{1}) < h(x_{2})', { size: 32, kalin: 700 });
    const koy = (x) => { n2.koy(x); yaz(sayiX, [sayi(X1) + ' < ', [sayi(x), RENK.sifir]]); yaz(sayiH, [sayi(h(X1)) + ' < ', [sayi(h(x)), RENK.sifir]]); };
    koy(1);
    gizle(n1.els, n2.els, g, tanim1, tanim2);

    await par(soyle(c, 'Doğrunun üzerinde iki nokta: x<sub>1</sub> solda, x<sub>2</sub> sağda.'), (async () => {
      await belir(c, n1.els, 450); await c.wait(300); await belir(c, n2.els, 450);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'x<sub>1</sub> &lt; x<sub>2</sub> iken çıktılar için hangisi doğru?',
      options: ['h(x<sub>1</sub>) &gt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) = h(x<sub>2</sub>)'], answer: 1,
      hints: ['Doğru sağa doğru yükseliyor; sağdaki nokta daha yukarıda.', '', 'İki nokta farklı yükseklikte.'],
      right: 'Sağdaki girdinin çıktısı daha büyük.',
    });
    await par(soyle(c, 'Girdilerin sırası çıktılara aynen geçiyor.'), belir(c, g, 500));
    await soyle(c, 'x<sub>2</sub>’yi gezdir; alttaki eşitsizlik hiç bozuluyor mu?', { noWait: true });
    const sl = c.slider({ label: 'x<sub>2</sub>', min: -1, max: 2.5, step: 0.5, value: 1, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
    sl.remove();
    await kaybol(c, g, 300);
    await par(soyle(c, 'Artan fonksiyonun sembolle yazımı budur.'), (async () => { await belir(c, tanim1, 450); await belir(c, tanim2, 500); })());
    await soyle(c, 'Çiftler sonsuz; hepsini denemek olmaz, ispat gerekir.');
    c.note('<b>Artan:</b> x<sub>1</sub> &lt; x<sub>2</sub> iken h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'Artan, sembolle', 'a12-artan');
  }

  /* İspat tahtası: solda küçük düzlem (doğru, iki girdi), sağda dört adım. a: çizilen örnek doğrunun eğimi (1 ya da −1). */
  function ispatTahtasi(svg, a0) {
    const dz = duzlem(svg, { x0: 50, y0: 110, w: 280, h: 340, xmin: -1, xmax: 6, ymin: -1, ymax: 7.5, sayilar: false, xad: '', yad: '' });
    const X1 = 1.5, X2 = 4, bb = (a) => 3.75 - 2.75 * a;   // doğru (2,75; 3,75) çevresinde döner
    const d = dogru(dz, a0, bb(a0), { renk: RENK.g });
    const cizgi = (renk) => S('line', { stroke: renk, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, dz.orta);
    const dik = [cizgi(RENK.soluk), cizgi(RENK.soluk)], yatay = [cizgi(RENK.yazi), cizgi(RENK.sifir)];
    const p = [nokta(dz, 0, 0, { r: 8, renk: RENK.yazi }), nokta(dz, 0, 0, { r: 8 })];
    const cikti = [nokta(dz, 0, 0, { r: 6, renk: RENK.yazi }), nokta(dz, 0, 0, { r: 6 })];
    etiket(dz, X1, 0, 'x_{1}', { dy: 27 }); etiket(dz, X2, 0, 'x_{2}', { dy: 27, renk: RENK.sifir });
    const koy = (a) => {
      d.ayarla(a, bb(a));
      [X1, X2].forEach((x, i) => {
        const y = a * x + bb(a);
        p[i].git(x, y); cikti[i].git(0, y);
        dik[i].setAttribute('x1', dz.X(x)); dik[i].setAttribute('x2', dz.X(x)); dik[i].setAttribute('y1', dz.Y(0)); dik[i].setAttribute('y2', dz.Y(y));
        yatay[i].setAttribute('x1', dz.X(0)); yatay[i].setAttribute('x2', dz.X(x)); yatay[i].setAttribute('y1', dz.Y(y)); yatay[i].setAttribute('y2', dz.Y(y));
      });
    };
    koy(a0);
    const ad = adimlar(svg, { x: 400, y: 160, aralik: 94, size: 34, gerekceX: 380 });
    const A = ['a', RENK.g], B = ['+ b', RENK.g];
    const ifade = [
      () => ['x_{1} < x_{2}'],
      (s) => [A, 'x_{1} ', s, ' ', A, 'x_{2}'],
      (s) => ['ax_{1} ', B, ' ', s, ' ax_{2} ', B],
      (s) => ['h(x_{1}) ', s, ' h(x_{2})'],
    ];
    const satir = [ad.ekle(ifade[0](), 'hipotez'), ad.ekle(ifade[1]('<'), 'a > 0'), ad.ekle(ifade[2]('<'), 'b ekle'), ad.ekle(ifade[3]('<'), 'hüküm')];
    satir[1].gerekce.style.fill = RENK.arti;
    return { dz, koy, satir, ifade, cikti: [...yatay, ...cikti.map((n) => n.el)] };
  }

  /* ---- 2. İspat: a > 0 ---- */
  async function ispat(c) {
    const svg = c.svg(1000, 562);
    const t = ispatTahtasi(svg, 1);
    gizle(t.cikti);
    await soyle(c, 'h(x) = ax + b ve a pozitif olsun.');
    await par(soyle(c, 'İspat hipotezle başlar: x<sub>1</sub>, x<sub>2</sub>’den küçük.'), belir(c, t.satir[0].g, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'İki yanı pozitif a ile çarparsan eşitsizliğin yönü ne olur?',
      options: ['Ters döner', 'Değişmez'], answer: 1,
      hints: ['Pozitifle çarpmak sırayı bozmaz: 2 &lt; 3 iken 4 &lt; 6.', ''],
      right: 'Pozitif sayıyla çarpınca yön aynı kalır.',
    });
    await par(soyle(c, 'a pozitif olduğu için yön aynı kaldı.'), belir(c, t.satir[1].g, 500));
    await par(soyle(c, 'Şimdi iki yana b ekle; toplama yönü değiştirmez.'), belir(c, t.satir[2].g, 500));
    await par(soyle(c, 'Sol yan h(x<sub>1</sub>), sağ yan h(x<sub>2</sub>): hüküm çıktı.'), (async () => {
      await belir(c, t.satir[3].g, 500); await belir(c, t.cikti, 500);
    })());
    await soyle(c, 'Sayı kullanmadık; ispat her x<sub>1</sub> &lt; x<sub>2</sub> çifti için geçerli.', { speak: 'Sayı kullanmadık; ispat, x bir x ikiden küçük olan her çift için geçerli.' });
    c.note('<b>İspat:</b> x<sub>1</sub> &lt; x<sub>2</sub> → ax<sub>1</sub> &lt; ax<sub>2</sub> → h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'a > 0 ise artan', 'a12-ispat');
  }

  /* ---- 3. a < 0 olunca ---- */
  async function negatif(c) {
    const svg = c.svg(1000, 562);
    const t = ispatTahtasi(svg, 1);
    t.satir.forEach((s) => { s.g.style.opacity = 1; });
    const don = ['>', RENK.sifir];
    await par(soyle(c, 'Aynı ispat; bu kez a negatif olsun.'), (async () => {
      await kaybol(c, t.cikti, 250);
      yaz(t.satir[1].gerekce, 'a < 0'); t.satir[1].gerekce.style.fill = RENK.eksi;
      await par(belir(c, t.satir.slice(1).map((s) => s.g), 400, 0.35), c.tween(1400, (e) => t.koy(lerp(1, -1, e)), ease.inOut));
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Dört adımdan hangisi değişir?',
      options: ['Hipotez', 'a ile çarpma', 'b ekleme'], answer: 1,
      hints: ['Hipotez yine x<sub>1</sub> &lt; x<sub>2</sub>; a’ya bağlı değil.', '', 'Toplama, eşitsizliğin yönünü hiç değiştirmez.'],
      right: 'Negatifle çarpınca yön döner: 2 &lt; 3 iken −4 &gt; −6.',
    });
    yaz(t.satir[1].ifade, t.ifade[1](don));
    await par(soyle(c, 'Negatif sayıyla çarpınca eşitsizliğin yönü döner.', { ton: 'thoughtful' }), belir(c, t.satir[1].g, 500));
    yaz(t.satir[2].ifade, t.ifade[2](don));
    await par(soyle(c, 'b eklemek yönü yine değiştirmez.'), belir(c, t.satir[2].g, 500));
    yaz(t.satir[3].ifade, t.ifade[3](don));
    await par(soyle(c, 'Soldaki girdinin çıktısı daha büyük: fonksiyon <b>azalan</b>.', { dur: true }), (async () => {
      await belir(c, t.satir[3].g, 500); await belir(c, t.cikti, 500);
    })());
    c.note('<b>a &lt; 0:</b> x<sub>1</sub> &lt; x<sub>2</sub> iken h(x<sub>1</sub>) &gt; h(x<sub>2</sub>), azalan', 'a < 0 ise azalan', 'a12-azalan');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const tb = soruTahtasi(c, svg, { x: 90, y: 150, w: 820, h: 170, size: 38 });
    await soyle(c, 'İspatın adımlarını sen gerekçelendir.', { noWait: true });
    await tb.sor('a > 0 ise h(x) = ax + b artandır', {
      q: 'Bu önermenin ispatı hangi cümleyle başlar?',
      options: ['h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'x<sub>1</sub> &lt; x<sub>2</sub>', 'ax<sub>1</sub> + b &lt; ax<sub>2</sub> + b'], answer: 1,
      hints: ['Bu hüküm: ispatın vardığı yer, başladığı yer değil.', '', 'Bu bir ara adım; ondan önce hipotez yazılır.'],
      right: 'İspat hipotezle başlar.', kanit: 'hipotez: x_{1} < x_{2}',
    });
    await tb.sor('x_{1} < x_{2}   →   ax_{1} < ax_{2}', {
      q: 'Bu adımda hangi bilgi kullanıldı?',
      options: ['b &gt; 0', 'a &gt; 0', 'x<sub>1</sub> &gt; 0'], answer: 1,
      hints: ['b bu adımda yok; henüz eklenmedi.', '', 'Girdilerin işareti önemli değil; çarpanın işareti önemli.'],
      right: 'Pozitif a ile çarpmak yönü korur.', kanit: 'a > 0: çarpınca yön aynı kalır',
    });
    await tb.sor('ax_{1} < ax_{2}   →   ax_{1} + b < ax_{2} + b', {
      q: 'b negatif olsaydı eşitsizliğin yönü değişir miydi?',
      options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Yönü çeviren negatifle çarpmaktır; toplama çevirmez.', ''],
      right: 'Toplama, b’nin işareti ne olursa olsun yönü korur.', kanit: 'toplama yönü hiç değiştirmez',
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a12', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Artanlığın ispatı', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Artanlığın ispatı', hook: 'Bir taksi şirketi “yol uzadıkça ücret hiç azalmaz” diyor. <b>Bunu her mesafe için nasıl güvenceye alırsın?</b>', button: 'Derse başla ›' },
    goals: ['Artanlığı x<sub>1</sub> &lt; x<sub>2</sub> yazımıyla ifade eder.', 'a &gt; 0 iken ax + b’nin artan olduğunu ispatlar.', 'a &lt; 0 iken hangi adımın değiştiğini açıklar.'],
    scenes: [
      { title: 'Artan, sembolle', goal: 'Artanlığı iki girdiyle yaz.', run: sembolle },
      { title: 'İspat: a > 0', goal: 'Hipotezden hükme adım adım git.', run: ispat },
      { title: 'a < 0 olunca', goal: 'Değişen adımı bul.', run: negatif },
      { title: 'Sıra sende', goal: 'Adımları gerekçelendir.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İspatta a &gt; 0 bilgisi hangi adımda kullanılır?', options: ['b eklerken', 'İki yanı a ile çarparken', 'x<sub>1</sub> &lt; x<sub>2</sub> derken'], answer: 1,
        why: ['Toplama, sayının işaretine bakmadan yönü korur.', 'Yön, çarpan pozitif olduğu için aynı kalır.', 'Bu hipotezdir; a ile ilgisi yoktur.'], scene: 1 },
      { q: 'a &lt; 0 ve x<sub>1</sub> &lt; x<sub>2</sub> ise hangisi doğrudur?', options: ['h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) = h(x<sub>2</sub>)', 'h(x<sub>1</sub>) &gt; h(x<sub>2</sub>)'], answer: 2,
        why: ['Bu, a pozitifken çıkan sonuçtur.', 'Farklı girdiler eşit çıktı vermez; yön döner, eşitlik olmaz.', 'Negatifle çarpınca yön döner: fonksiyon azalandır.'], scene: 2 },
      { q: 'h(x) = 4x − 1 ve x<sub>1</sub> &lt; x<sub>2</sub>. İspatın sonunda hangisine varılır?', options: ['h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) &gt; h(x<sub>2</sub>)', 'x<sub>1</sub> = x<sub>2</sub>'], answer: 0,
        why: ['a = 4 pozitif: 4 ile çarpmak da 1 çıkarmak da yönü korur.', 'Yön yalnızca negatif sayıyla çarpınca döner.', 'Hipotez girdilerin farklı olduğunu söyler: x<sub>1</sub> &lt; x<sub>2</sub>.'], scene: 1 },
      { q: 'x<sub>1</sub> &lt; x<sub>2</sub> eşitsizliğinin iki yanına −7 eklenirse yön ne olur?', options: ['Döner', 'Aynı kalır', 'Eşitlik olur'], answer: 1,
        why: ['Yön, negatif sayıyla çarpınca döner; eklerken dönmez.', 'Toplama, sayının işaretine bakmadan yönü korur.', 'İki yana aynı sayı eklenir; aradaki fark kapanmaz.'], scene: 1 },
    ],
    summary: [
      '<b>x<sub>1</sub> &lt; x<sub>2</sub> ile başla, h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)’ye var.</b>',
      'Pozitif a ile çarpmak da b eklemek de eşitsizliğin yönünü korur.',
      'a negatifse çarpma adımında yön döner: fonksiyon azalandır.',
    ],
    nextLesson: { href: 'a13-bire-birligin-ispati.html', label: 'Sonraki: Bire birliğin ispatı ›' },
  });
})();
