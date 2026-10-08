/* A7 — Eğimi belirleyen a
   g(x) = a · f(x): doğru orijin çevresinde döner; 1 sağa gidince a kadar yükselir (a negatifse alçalır).
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, nokta, etiket, tablo } = window.KIT;
  const { lerp, ease } = Ders;
  /* x ekseninde sayılar seyrek: basamağın etiketleri eksen sayılarıyla karışmasın */
  const D = { x0: 70, y0: 50, w: 460, h: 460, xsayi: 4 };
  const yerlestir = (t, x, y) => { t.setAttribute('x', x); t.setAttribute('y', y); };
  const yuvarla = (a) => Math.round(a * 10) / 10;

  /* İki düzlem noktası arasında ok. o: { renk, pay: ucun hedeften önce durduğu boşluk }. Döner: { g, ayarla(x1, y1, x2, y2) }. */
  function ok(dz, o = {}) {
    const renk = o.renk || RENK.sifir, g = S('g', {}, dz.orta);
    const cizgi = S('line', { stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g), uc = S('path', { fill: renk }, g);
    const api = { g, ayarla(x1, y1, x2, y2) {
      const ax = dz.X(x1), ay = dz.Y(y1), L0 = Math.hypot(dz.X(x2) - ax, dz.Y(y2) - ay), L = L0 - (o.pay || 0);
      g.style.display = L < 8 ? 'none' : '';
      if (L < 8) return api;
      const ux = (dz.X(x2) - ax) / L0, uy = (dz.Y(y2) - ay) / L0, bx = ax + ux * L, by = ay + uy * L, k = Math.min(13, L * 0.6);
      cizgi.setAttribute('x1', ax); cizgi.setAttribute('y1', ay); cizgi.setAttribute('x2', bx - ux * k); cizgi.setAttribute('y2', by - uy * k);
      uc.setAttribute('d', `M${bx},${by} L${bx - ux * k - uy * k * 0.5},${by - uy * k + ux * k * 0.5} L${bx - ux * k + uy * k * 0.5},${by - uy * k - ux * k * 0.5} Z`);
      return api;
    } };
    return api;
  }

  /* Basamak: orijinden 1 birim sağa, sonra a kadar yukarı (a negatifse aşağı). Yüksekliği eğimi gösterir.
     o: { etiketsiz: sayılar yazılmaz }. Döner: { g, ayarla(a) }. */
  function basamak(dz, o = {}) {
    const g = S('g', {}, dz.on), st = { stroke: RENK.sifir, 'stroke-width': 4, 'stroke-linecap': 'round' };
    const yat = S('line', st, g), dik = S('line', st, g);
    const bir = o.etiketsiz ? null : yazi(g, 0, 0, '1', { size: 22, renk: RENK.sifir, hale: true });
    const kac = o.etiketsiz ? null : yazi(g, 0, 0, '', { size: 22, renk: RENK.sifir, hale: true, hiza: 'start' });
    const api = { g, ayarla(a) {
      const x0 = dz.X(0), x1 = dz.X(1), y0 = dz.Y(0), y1 = dz.Y(a);
      yat.setAttribute('x1', x0); yat.setAttribute('y1', y0); yat.setAttribute('x2', x1); yat.setAttribute('y2', y0);
      dik.setAttribute('x1', x1); dik.setAttribute('y1', y0); dik.setAttribute('x2', x1); dik.setAttribute('y2', y1);
      if (bir) {
        yerlestir(bir, (x0 + x1) / 2, y0 + (a >= 0 ? 25 : -10));
        yaz(kac, sayi(yuvarla(a))); yerlestir(kac, x1 + 10, dz.Y(a > 1.2 ? 0.62 : a / 2) + 8);   // f'nin geçtiği yere denk gelmesin
      }
      return api;
    } };
    return api;
  }
  const kuralYazi = (a) => 'g(x) = ' + (a === 0 ? '0 · x' : kural(a, 0));

  /* ---- 1. İki katı ---- */
  async function ikiKati(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    etiket(dz, -4.2, -4.2, 'f', { renk: RENK.f, dx: 26, dy: 10 });
    const g = dogru(dz, 1, 0, { renk: RENK.g }); gizle(g.el);
    const gAd = etiket(dz, 1.9, 3.8, 'g', { renk: RENK.g, dx: -24, dy: -6 });
    const XS = [-2, -1, 1, 2];
    const oklar = XS.map(() => ok(dz, { pay: 9 }));
    const fn = XS.map((x) => nokta(dz, x, x, { renk: RENK.f, r: 7 }));
    const gn = XS.map((x) => nokta(dz, x, x, { renk: RENK.g, r: 7 }));
    const orijin = nokta(dz, 0, 0, { r: 9 });
    const bs = basamak(dz).ayarla(2);
    gizle(gAd, orijin.el, bs.g, fn.map((n) => n.el), gn.map((n) => n.el));
    const koy = (a) => { g.ayarla(a, 0); XS.forEach((x, i) => { oklar[i].ayarla(x, x, x, a * x); gn[i].git(x, a * x); }); };
    koy(1);
    const kuralT = yazi(svg, 765, 110, [['g(x)', RENK.g], ' = ', ['2', RENK.sifir], ' · ', ['f(x)', RENK.f]], { size: 36, kalin: 700 });
    const acik = yazi(svg, 765, 170, '= 2x', { size: 36, kalin: 700, renk: RENK.g });
    const tb = tablo(svg, { x: 610, y: 230, basliklar: ['f(x)', 'g(x)'], n: 3, hucre: 74, yuk: 56, basGen: 96, size: 26, renkler: [RENK.f, RENK.g] });
    [0, 1, 2].forEach((x, k) => tb.yaz(0, k, sayi(x), RENK.f));
    gizle(kuralT, acik, tb.g);

    await par(soyle(c, 'g, f’nin her çıktısını 2 ile çarpıyor.', { speak: 'g, f fonksiyonunun her çıktısını iki ile çarpıyor.' }), belir(c, kuralT, 450));
    await par(soyle(c, 'Tabloda her çıktı iki katına çıktı.'), (async () => {
      await belir(c, tb.g, 400);
      for (let k = 0; k < 3; k++) { await c.wait(350); tb.yaz(1, k, sayi(2 * k), RENK.g); }
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'g’nin grafiği f’ye göre nasıl olur?',
      options: ['Yukarı kayar', 'Dikleşir', 'Aynı kalır'], answer: 1,
      hints: ['g(0) = 2 · 0 = 0: orijindeki nokta yerinden oynamaz.', '', 'Çıktılar değişti: f(2) = 2 iken g(2) = 4.'],
      right: 'Orijin yerinde kalır, öbür noktalar eksenden uzaklaşır.',
    });
    await belir(c, [orijin.el].concat(fn.map((n) => n.el)), 300);
    gn.forEach((n) => { n.el.style.opacity = 1; }); g.el.style.opacity = 1;
    await par(soyle(c, 'Orijin yerinde kalıyor; öbür noktalar eksenden uzaklaşıyor.'), c.tween(1700, (e) => koy(lerp(1, 2, e)), ease.inOut));
    await kaybol(c, tb.g, 300);
    await par(soyle(c, 'Doğru orijin çevresinde döndü: dikleşti.'), belir(c, gAd, 400));
    await kaybol(c, oklar.map((o) => o.g).concat(fn.map((n) => n.el), gn.map((n) => n.el), orijin.el), 300);
    await par(soyle(c, 'Eğim: 1 birim sağa gidince kaç birim yükseldiğin.', { dur: true }), belir(c, bs.g, 500));
    await soyle(c, 'g’de 1 sağa, 2 yukarı: eğim 2.', { speak: 'g fonksiyonunda bir sağa, iki yukarı: eğim iki.' });
    await par(soyle(c, 'Kuralı kısa: çıktı, girdinin 2 katı.'), belir(c, acik, 450));
  }

  /* Kaydırıcılı sahnelerin ortak kurulumu: soluk f, turuncu g, basamak, kural ve eğim satırı */
  function donen(c, baslik) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0).el.style.opacity = 0.45;
    const g = dogru(dz, 1, 0, { renk: RENK.g }), bs = basamak(dz);
    const ust = yazi(svg, 765, 110, baslik, { size: 32, kalin: 650 });
    const kuralT = yazi(svg, 765, 210, '', { size: 44, kalin: 700, renk: RENK.g });
    const egim = yazi(svg, 765, 275, '', { size: 30, renk: RENK.sifir });
    const koy = (a) => { const ay = yuvarla(a); g.ayarla(a, 0); bs.ayarla(a); yaz(kuralT, kuralYazi(ay)); yaz(egim, 'eğim = ' + sayi(ay)); };
    return { svg, dz, g, bs, ust, kuralT, egim, koy };
  }
  const GENEL = [['g(x)', RENK.g], ' = ', ['a', RENK.sifir], ' · ', ['f(x)', RENK.f]];

  /* ---- 2. a değiştikçe ---- */
  async function aDegistikce(c) {
    const t = donen(c, GENEL);
    t.koy(2); gizle(t.ust);
    await par(soyle(c, 'Çarpana a diyelim; şimdi onu değiştirelim.'), belir(c, t.ust, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'a = 0,5 olursa doğru f’ye göre nasıl olur?',
      options: ['Daha dik', 'Daha yatık', 'Aşağı kayar'], answer: 1,
      hints: ['Çıktılar yarıya iner; 1 sağa gidince yalnızca yarım birim yükselirsin.', '', 'g(0) = 0,5 · 0 = 0: doğru orijinden ayrılmaz.'],
      right: '1 sağa gidince yarım birim yükselirsin: doğru yatıklaşır.',
    });
    await par(soyle(c, 'a küçülünce basamak alçalır, doğru yatıklaşır.'), c.tween(2000, (e) => t.koy(lerp(2, 0.5, e)), ease.inOut));
    await par(soyle(c, 'a büyüyünce basamak yükselir, doğru dikleşir.'), c.tween(2200, (e) => t.koy(lerp(0.5, 3, e)), ease.inOut));
    await soyle(c, 'a’yı değiştir; basamağın yüksekliğini izle.', { noWait: true });
    c.slider({ label: 'a', min: 0.5, max: 3, step: 0.5, value: 3, fmt: (v) => sayi(v), onInput: t.koy });
    await c.cont('Devam ›');
    await soyle(c, 'Basamağın yüksekliği hep a: doğrunun eğimi a’dır.', { speak: 'Basamağın yüksekliği hep a: doğrunun eğimi a sayısıdır.', dur: true });
    c.note('<b>g(x) = a · f(x) = ax</b><br>Eğimi a’dır: 2x’in eğimi 2', 'Eğim', 'a7-egim');
  }

  /* ---- 3. a negatifse ---- */
  async function aNegatifse(c) {
    const t = donen(c, [['g(x)', RENK.g], ' = ', ['−2', RENK.sifir], ' · ', ['f(x)', RENK.f]]);
    const ayna = dogru(t.dz, 2, 0, { renk: RENK.g, kalin: 3, kesik: true });
    t.koy(1); gizle(t.ust, t.g.el, t.bs.g, t.kuralT, t.egim, ayna.el);
    await par(soyle(c, 'Şimdi çarpan negatif olsun.'), belir(c, t.ust, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'g’de 1 birim sağa gidince ne olur?',
      options: ['2 birim yükselirsin', '2 birim alçalırsın', 'Yerinde kalırsın'], answer: 1,
      hints: ['g(1) = −2 · 1 = −2: çıktı sıfırın altına iner.', '', 'g(0) = 0 ama g(1) = −2; çıktı değişiyor.'],
      right: 'g(1) = −2: 1 sağa gidince 2 birim alçalırsın.',
    });
    await belir(c, [t.g.el, t.bs.g], 300);
    await par(soyle(c, 'Çarpan küçüldükçe doğru dönüyor, sıfırı geçince aşağı eğiliyor.', { ton: 'thoughtful' }), c.tween(2600, (e) => t.koy(lerp(1, -2, e)), ease.inOut));
    await par(soyle(c, 'Artık 1 sağa gidince 2 aşağı iniyorsun.'), belir(c, [t.kuralT, t.egim], 450));
    await par(soyle(c, 'Kesikli doğru 2x: ikisi de aynı diklikte.', { speak: 'Kesikli doğru, iki x doğrusu: ikisi de aynı diklikte.' }), belir(c, ayna.el, 500, 0.7));
    await kaybol(c, ayna.el, 300);
    yaz(t.ust, GENEL);
    await soyle(c, 'a’yı −3 ile 3 arasında gezdir; doğru ne zaman alçalıyor?', { noWait: true });
    c.slider({ label: 'a', min: -3, max: 3, step: 0.5, value: -2, fmt: (v) => sayi(v), onInput: t.koy });
    await c.cont('Devam ›');
    await soyle(c, 'a negatifse doğru sağa doğru alçalır.');
    c.note('<b>a &lt; 0:</b> doğru sağa doğru alçalır.<br>−2x: 1 sağa, 2 aşağı', 'Negatif a', 'a7-negatif');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const KUTU = { y0: 130, w: 270, h: 270, xmin: -3.5, xmax: 3.5, ymin: -3.5, ymax: 3.5, sayilar: false, xad: '', yad: '' };
    const kartlar = [['A', 0.5], ['B', -1], ['C', 3]].map(([harf, a], i) => {
      const dz = duzlem(svg, Object.assign({ x0: 45 + i * 320 }, KUTU));
      dogru(dz, a, 0, { renk: RENK.g }); basamak(dz, { etiketsiz: true }).ayarla(a);
      yazi(svg, dz.x0 + dz.w / 2, 100, harf, { size: 32, kalin: 700 });
      return { a, cevap: yazi(svg, dz.x0 + dz.w / 2, 462, '', { size: 30, kalin: 700, renk: RENK.iyi }) };
    });
    const yazdir = (i) => (k, dogruMu) => { if (dogruMu) yaz(kartlar[i].cevap, 'a = ' + sayi(kartlar[i].a)); };

    await soyle(c, 'Basamağa bak: 1 sağa gidince ne kadar yükseliyor?', { noWait: true });
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi doğruda a = 3?', options: ['A', 'B', 'C'], answer: 2,
      hints: ['A’da 1 sağa gidince yarım birim yükseliyorsun.', 'B’de 1 sağa gidince alçalıyorsun.', ''],
      right: 'C’de 1 sağa gidince 3 birim yükseliyorsun.', onPick: yazdir(2),
    });
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi doğruda a = 0,5?', options: ['A', 'B', 'C'], answer: 0,
      hints: ['', 'B alçalıyor; a negatif olmalı.', 'C’nin eğimi 3.'],
      right: 'A’da 1 sağa gidince yarım birim yükseliyorsun.', onPick: yazdir(0),
    });
    await c.choice({
      tag: 'Sıra sende', q: 'B doğrusunda a kaç?', options: ['1', '−2', '−1'], answer: 2,
      hints: ['Doğru sağa doğru alçalıyor; a pozitif olamaz.', 'Basamağa bak: 1 sağa gidince 1 birim iniyorsun.', ''],
      right: '1 sağa, 1 aşağı: a = −1.', onPick: yazdir(1),
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a7', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Eğimi belirleyen a', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Eğimi belirleyen a', hook: 'Aynı yolu iki kat hızla giden araç <b>aynı sürede kaç kat yol alır?</b>', button: 'Derse başla ›' },
    goals: ['f(x)’i a ile çarpmanın doğrunun eğimini değiştirdiğini görür.', 'Eğimi kuraldaki katsayıdan okur.', 'a negatifken doğrunun alçaldığını söyler.'],
    scenes: [
      { title: 'İki katı', goal: 'Çıktıları 2 ile çarpınca doğrunun dikleştiğini gör.', run: ikiKati },
      { title: 'a değiştikçe', goal: 'a’yı değiştir; basamağın yüksekliğini izle.', run: aDegistikce },
      { title: 'a negatifse', goal: 'Negatif a’da doğrunun alçaldığını gör.', run: aNegatifse },
      { title: 'Sıra sende', goal: 'Doğrunun basamağından a’yı bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'g(x) = 3 · f(x) için x 1 artınca g(x) kaç artar?', options: ['1', '3', '1/3'], answer: 1,
        why: ['1, f’nin artışıdır; g onu 3 ile çarpar.', 'Eğim a = 3: 1 sağa gidince 3 yukarı çıkılır.', 'Çıktı 3’e bölünmez, 3 ile çarpılır.'], scene: 1 },
      { q: 'Hangisinin grafiği en diktir?', options: ['g(x) = x + 4', 'g(x) = x/4', 'g(x) = 4x'], answer: 2,
        why: ['4 eklemek doğruyu kaydırır; eğim 1 kalır.', 'Burada a = 1/4: doğru f’den yatıktır.', 'a = 4: 1 sağa gidince 4 yukarı çıkılır.'], scene: 1 },
    ],
    summary: [
      '<b>Eğimi belirleyen katsayıdır, a.</b>',
      '<b>g(x) = a · f(x) = ax:</b> 1 sağa gidince a kadar yukarı çıkılır.',
      'a büyüdükçe doğru dikleşir; a negatifse doğru sağa doğru alçalır.',
    ],
    nextLesson: { href: 'a8-sabit-fonksiyon.html', label: 'Sonraki: Sabit fonksiyon ›' },
  });
})();
