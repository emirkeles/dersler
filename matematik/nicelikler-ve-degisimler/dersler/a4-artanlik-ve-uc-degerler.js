/* A4 — Artanlık ve uç değerler: f(x) = x
   Artan fonksiyon; gerçek sayılarda en büyük ve en küçük değerin olmaması; kapalı aralıkta maksimum (sarı) ve minimum (turuncu) noktası.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, sayi, yaz, yazi, par, gizle, belir, pop, soyle, duzlem, dogru, nokta, iz, tablo } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };
  const MAKS = RENK.sifir, MIN_ = RENK.g;
  const cift = (v) => '(' + sayi(v) + ', ' + sayi(v) + ')';
  /* sağ sütunda ad + değer */
  const satir = (svg, y, ad, renk) => ({ ad: yazi(svg, 610, y, ad, { size: 24, renk, hiza: 'start' }), deger: yazi(svg, 610, y + 50, '', { size: 40, kalin: 700, hiza: 'start' }) });

  /* ---- 1. Artan ---- */
  async function artan(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    const tb = tablo(svg, { x: 590, y: 150, basliklar: ['x', 'f(x)'], n: 5, hucre: 56, yuk: 52, basGen: 84, renkler: [RENK.soluk, RENK.f] });
    const xs = [-2, -1, 0, 1, 2];
    xs.forEach((v, k) => tb.yaz(0, k, sayi(v)));
    const izler = iz(dz, -2, -2, { renk: RENK.sifir }), p = nokta(dz, -2, -2, { r: 10 });
    gizle(izler.g, p.el);
    await soyle(c, 'f(x) = x’te girdiyi adım adım büyütelim.', { speak: 'f x eşittir x fonksiyonunda girdiyi adım adım büyütelim.' });
    await c.choice({
      tag: 'Tahmin et', q: 'x büyürse f(x) ne olur?',
      options: ['Küçülür', 'Büyür', 'Değişmez'], answer: 1,
      hints: ['Çıktı girdiye eşit; girdi büyürken küçülemez.', '', 'Çıktı girdiye eşit; girdi değişince o da değişir.'],
      right: 'Çıktı girdiyle birlikte büyür.',
    });
    await par(soyle(c, 'Nokta sağa yürüdükçe yükseliyor.'), (async () => {
      await belir(c, [izler.g, p.el], 300);
      tb.yaz(1, 0, sayi(-2), RENK.f);
      for (let k = 1; k < 5; k++) {
        await c.tween(650, (e) => { const x = lerp(xs[k - 1], xs[k], e); p.git(x, x); izler.ayarla(x, x); }, ease.inOut);
        tb.yaz(1, k, sayi(xs[k]), RENK.f); await c.wait(200);
      }
    })());
    await soyle(c, 'Girdi büyüdükçe çıktı da büyüyor: f <b>artan</b>.', { dur: true });
    c.note('<b>Artan:</b> x büyürse f(x) de büyür.<br>f(x) = x artandır', 'Artan fonksiyon', 'a4-artan');
  }

  /* ---- 2. Gerçek sayılarda en büyük değer ---- */
  async function enBuyukYok(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    const izler = iz(dz, 2, 2, { renk: RENK.sifir }), p = nokta(dz, 2, 2, { r: 10 });
    const deger = yazi(svg, 610, 150, '', { size: 44, kalin: 700, hiza: 'start' });
    const b = satir(svg, 270, 'en büyük değer', MAKS), k = satir(svg, 390, 'en küçük değer', MIN_);
    yaz(b.deger, 'yok'); yaz(k.deger, 'yok'); gizle(b.ad, b.deger, k.ad, k.deger);
    const koy = (x) => { p.git(x, x); izler.ayarla(x, x); yaz(deger, ['f(x) = ', [sayi(x, 1), RENK.sifir]]); };
    koy(2);
    await c.choice({
      tag: 'Tahmin et', q: 'f(x) = x’in gerçek sayılarda en büyük değeri var mı?',
      options: ['Var', 'Yok'], answer: 1,
      hints: ['Hangi değeri söylersen bir fazlası da çıkar.', ''],
      right: 'Her değerin sağında daha büyüğü var.',
    });
    await par(soyle(c, 'Bir değer seç: sağında hep daha büyüğü var.', { ton: 'thoughtful' }), c.tween(2200, (e) => koy(lerp(2, 5, e)), ease.inOut));
    await belir(c, [b.ad, b.deger], 400);
    await par(soyle(c, 'Solda da hep daha küçüğü var.'), c.tween(2600, (e) => koy(lerp(5, -5, e)), ease.inOut));
    await belir(c, [k.ad, k.deger], 400);
    await soyle(c, 'Gerçek sayılarda f(x) = x’in maksimumu da minimumu da yok.', { speak: 'Gerçek sayılarda f x eşittir x fonksiyonunun maksimumu da minimumu da yok.' });
  }

  /* [a, b] aralığında f(x) = x: parça, maksimum ve minimum noktası */
  function uclu(dz, a, b) {
    const d = dogru(dz, 1, 0, { x1: a, x2: b });
    const mn = nokta(dz, a, a, { renk: MIN_, r: 10 }), mx = nokta(dz, b, b, { renk: MAKS, r: 10 });
    return { d, mn, mx, koy(a2, b2) { d.ayarla(1, 0, a2, b2); mn.git(a2, a2); mx.git(b2, b2); } };
  }

  /* ---- 3. Kapalı aralıkta ---- */
  async function kapaliAralikta(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const u = uclu(dz, -5, 5); gizle(u.mn.el, u.mx.el);
    const b = satir(svg, 150, 'maksimum noktası', MAKS), k = satir(svg, 310, 'minimum noktası', MIN_);
    yaz(b.deger, cift(3)); yaz(k.deger, cift(-2)); gizle(b.ad, b.deger, k.ad, k.deger);
    await par(soyle(c, 'Tanım kümesi [−2, 3] olsun: uçlar dahil.', { speak: 'Tanım kümesi eksi iki ile üç arasındaki kapalı aralık olsun: uçlar dahil.' }), c.tween(1000, (e) => u.d.ayarla(1, 0, lerp(-5, -2, e), lerp(5, 3, e)), ease.inOut));
    u.koy(-2, 3);
    await c.choice({
      tag: 'Tahmin et', q: 'f en büyük değerini hangi x’te alır?',
      options: ['x = −2', 'x = 0', 'x = 3'], answer: 2,
      hints: ['Orası en alçak yer: f(−2) = −2.', 'f(0) = 0; sağda daha büyük değerler var.', ''],
      right: 'Artan fonksiyon sağ uçta en yüksekte.',
    });
    await par(soyle(c, 'Sağ uç <b>maksimum noktası</b>: en büyük değer 3.'), pop(c, u.mx, dz.X(3), dz.Y(3)), belir(c, [b.ad, b.deger], 500));
    await par(soyle(c, 'Sol uç <b>minimum noktası</b>: en küçük değer −2.'), pop(c, u.mn, dz.X(-2), dz.Y(-2)), belir(c, [k.ad, k.deger], 500));
    c.note('Artan fonksiyon en büyük değerini sağ uçta alır.<br>f(x) = x, [−2, 3]: en büyük 3', 'Uç değerler', 'a4-uclar');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const u = uclu(dz, -2, 3);
    const b = satir(svg, 150, 'maksimum noktası', MAKS), k = satir(svg, 310, 'minimum noktası', MIN_);
    let a = -2, s_ = 3;
    const koy = () => { u.koy(a, s_); yaz(b.deger, cift(s_)); yaz(k.deger, cift(a)); };
    await soyle(c, 'Uçları değiştir; iki nokta uçları izler.', { noWait: true });
    c.slider({ label: 'Sol uç', min: -4, max: 0, step: 1, value: a, fmt: (v) => sayi(v), onInput: (v) => { a = v; koy(); } });
    c.slider({ label: 'Sağ uç', tag: false, min: 1, max: 4, step: 1, value: s_, fmt: (v) => sayi(v), onInput: (v) => { s_ = v; koy(); } });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a4', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Artanlık ve uç değerler: f(x) = x', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Artanlık ve uç değerler', hook: 'Asansörle yukarı çıktıkça kat numarası artar. <b>En büyük numarayı nerede görürsün?</b>', button: 'Derse başla ›' },
    goals: ['f(x) = x’in artan olduğunu tablo ve grafikte görür.', 'Kapalı bir aralıkta maksimum ve minimum noktasını belirler.'],
    scenes: [
      { title: 'Artan', goal: 'Girdi büyürken çıktının da büyüdüğünü gör.', run: artan },
      { title: 'En büyük değer var mı?', goal: 'Gerçek sayılarda en büyük ve en küçük değerin olmadığını gör.', run: enBuyukYok },
      { title: 'Kapalı aralıkta', goal: 'Maksimum ve minimum noktasını uçlarda bul.', run: kapaliAralikta },
      { title: 'Dene', goal: 'Uçları değiştir, maksimum ve minimum noktasını izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = x, [−4, 1] aralığında <b>en büyük değerini</b> kaç alır?', options: ['−4', '4', '1'], answer: 2,
        why: ['−4 sol uçtaki değerdir: en küçük değer.', '4 bu aralıkta çıkmaz; en büyük girdi 1.', 'Artan fonksiyon en büyük değerini sağ uçta alır: f(1) = 1.'], scene: 2 },
      { q: 'f(x) = x için hangisi doğrudur?', options: ['x büyüdükçe f(x) de büyür', 'x büyüdükçe f(x) küçülür', 'x değişse de f(x) değişmez'], answer: 0,
        why: ['f artandır: çıktı girdiyle birlikte büyür.', 'Çıktı girdiye eşit; girdi büyürken küçülemez.', 'Çıktı girdiye eşit; girdi değişince çıktı da değişir.'], scene: 0 },
    ],
    summary: [
      '<b>Artan fonksiyon sağa gittikçe yükselir.</b>',
      'Gerçek sayılarda f(x) = x’in en büyük ve en küçük değeri yoktur.',
      'Kapalı aralıkta maksimum noktası sağ uçta, minimum noktası sol uçtadır.',
    ],
    nextLesson: { href: 'a5-bire-birlik.html', label: 'Sonraki: Bire birlik ›' },
  });
})();
