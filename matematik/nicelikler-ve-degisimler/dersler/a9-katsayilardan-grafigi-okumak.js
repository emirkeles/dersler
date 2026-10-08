/* A9 — Katsayılardan grafiği okumak
   g(x) = a · f(x − r) + k: doğru (r, k)’dan geçer, eğimi a’dır; eksenleri kestiği yerler ve iki doğrunun kesişimi tahmin edilip grafikle kontrol edilir.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };
  const SADE = Object.assign({ xad: '', yad: '' }, D);   // yazısı çok olan sahnelerde eksen adları kapalı

  /* İki düzlem noktası arasında ok. Döner: { g, ayarla(x1, y1, x2, y2) }; boyu çok kısaysa gizlenir. */
  function ok(dz, o = {}) {
    const renk = o.renk || RENK.sifir, g = S('g', {}, dz.orta);
    const cizgi = S('line', { stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g), uc = S('path', { fill: renk }, g);
    const api = { g, ayarla(x1, y1, x2, y2) {
      const ax = dz.X(x1), ay = dz.Y(y1), bx = dz.X(x2), by = dz.Y(y2), L = Math.hypot(bx - ax, by - ay);
      g.style.display = L < 8 ? 'none' : '';
      if (L < 8) return api;
      const ux = (bx - ax) / L, uy = (by - ay) / L, k = Math.min(13, L * 0.6);
      cizgi.setAttribute('x1', ax); cizgi.setAttribute('y1', ay); cizgi.setAttribute('x2', bx - ux * k); cizgi.setAttribute('y2', by - uy * k);
      uc.setAttribute('d', `M${bx},${by} L${bx - ux * k - uy * k * 0.5},${by - uy * k + ux * k * 0.5} L${bx - ux * k + uy * k * 0.5},${by - uy * k - ux * k * 0.5} Z`);
      return api;
    } };
    return api;
  }
  /* Basamak: (x0, y0)'dan 1 sağa, sonra a kadar yukarı (a negatifse aşağı). etiketli ise 1 ve a yazılır. Döner: g öğesi. */
  function basamak(dz, x0, y0, a, etiketli) {
    const g = S('g', {}, dz.on), st = { stroke: RENK.sifir, 'stroke-width': 4, 'stroke-linecap': 'round' };
    S('line', Object.assign({ x1: dz.X(x0), y1: dz.Y(y0), x2: dz.X(x0 + 1), y2: dz.Y(y0) }, st), g);
    S('line', Object.assign({ x1: dz.X(x0 + 1), y1: dz.Y(y0), x2: dz.X(x0 + 1), y2: dz.Y(y0 + a) }, st), g);
    if (etiketli) {
      yazi(g, dz.X(x0 + 0.5), dz.Y(y0) + (a >= 0 ? 25 : -10), '1', { size: 22, renk: RENK.sifir, hale: true });
      yazi(g, dz.X(x0 + 1) + 10, dz.Y(y0 + a / 2) + 8, sayi(a), { size: 22, renk: RENK.sifir, hale: true, hiza: 'start' });
    }
    return g;
  }
  /* g(x) = 2 · f(x − 3) + 2; vurgu: 'a' | 'r' | 'k' sarı yazılır */
  const KURAL = (vurgu) => [['g(x)', RENK.g], ' = ', ['2', vurgu === 'a' ? RENK.sifir : RENK.yazi], ' · ', ['f(x ', RENK.f],
    ['− 3', vurgu === 'r' ? RENK.sifir : RENK.f], [')', RENK.f], [' + 2', vurgu === 'k' ? RENK.sifir : RENK.yazi]];
  const degistir = async (c, el, metin) => { await kaybol(c, el, 180); yaz(el, metin); await belir(c, el, 250); };

  /* ---- 1. Üç sayı birlikte ---- */
  async function ucSayi(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, SADE);
    const f = dogru(dz, 1, 0);
    etiket(dz, -4.2, -4.2, 'f', { renk: RENK.f, dx: 26, dy: 10 });
    const g = dogru(dz, 1, 0, { renk: RENK.g }); gizle(g.el);
    const gAd = etiket(dz, 0.8, -2.4, 'g', { renk: RENK.g, dx: 24, dy: 12 });
    const yatay = ok(dz), dikey = ok(dz);
    const p = nokta(dz, 0, 0, { r: 9 });
    const yer = etiket(dz, 3, 2, '(3, 2)', { renk: RENK.sifir, hiza: 'end', dx: -14, dy: 7 });
    const bs = basamak(dz, 3, 2, 2, true);
    const kuralT = yazi(svg, 765, 150, KURAL(), { size: 32, kalin: 700 });
    gizle(gAd, p.el, yer, bs, kuralT);
    const koy = (a, r, k) => { g.ayarla(a, k - a * r); yatay.ayarla(0, 0, r, 0); dikey.ayarla(r, 0, r, k); p.git(r, k); };
    koy(1, 0, 0);

    await par(soyle(c, 'Bu kuralda üç sayı var; sırayla uygulayalım.'), belir(c, kuralT, 450));
    yaz(kuralT, KURAL('a')); g.el.style.opacity = 1;
    await par(soyle(c, 'Önce 2 ile çarp: doğru dikleşir.'), c.tween(1500, (e) => koy(lerp(1, 2, e), 0, 0), ease.inOut), belir(c, f.el, 600, 0.4), belir(c, p.el, 400));
    yaz(kuralT, KURAL());
    await c.choice({
      tag: 'Tahmin et', q: 'Kalan iki kaydırma orijindeki noktayı nereye taşır?',
      options: ['(−3, 2)', '(3, 2)', '(2, 3)'], answer: 1,
      hints: ['Girdiden 3 çıkarmak sola değil, sağa kaydırır.', '', 'Girdiden çıkan 3 sağa, çıktıya eklenen 2 yukarı götürür.'],
      right: '3 birim sağa, 2 birim yukarı.',
    });
    yaz(kuralT, KURAL('r'));
    await par(soyle(c, 'Girdiden 3 çıkar: 3 birim sağa.'), c.tween(1600, (e) => koy(2, 3 * e, 0), ease.inOut));
    yaz(kuralT, KURAL('k'));
    await par(soyle(c, 'Çıktıya 2 ekle: 2 birim yukarı.'), c.tween(1400, (e) => koy(2, 3, 2 * e), ease.inOut));
    yaz(kuralT, KURAL());
    await par(soyle(c, 'Orijindeki nokta buraya taşındı.'), belir(c, [yer, gAd], 450));
    await par(soyle(c, 'Eğim hâlâ 2: 1 sağa, 2 yukarı.'), belir(c, bs, 450));
    await soyle(c, 'Doğru (r, k) noktasından geçer; eğimi a’dır.', { speak: 'Doğru r, k noktasından geçer; eğimi a’dır.' });
    c.note('<b>a · f(x − r) + k:</b> (r, k)’den geçer, eğimi a.', 'Üç sayı', 'a9-uc-sayi');
  }

  /* ---- 2. Eksenleri nerede keser? ---- */
  async function eksenler(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const g = dogru(dz, 2, -4, { renk: RENK.g, x1: 3, x2: 4 });
    basamak(dz, 3, 2, 2, false);
    nokta(dz, 3, 2, { r: 8 });
    const yk = nokta(dz, 0, -4, { r: 9 }), xk = nokta(dz, 2, 0, { r: 9 });
    const kuralT = yazi(svg, 765, 150, KURAL(), { size: 32, kalin: 700 });
    const sonuc = yazi(svg, 765, 212, '', { size: 36, kalin: 700, renk: RENK.sifir });
    gizle(yk.el, xk.el, sonuc);
    const hesap = (x) => ['g(' + x + ') = 2 · (', [String(x), RENK.sifir], ' − 3) + 2'];

    await soyle(c, 'Bu doğrunun bir noktasını ve eğimini biliyoruz.');
    await soyle(c, 'Gerisini çizmeden eksenleri nerede keseceğini bulalım.');
    await c.choice({
      tag: 'Tahmin et', q: 'Doğru y eksenini nerede keser?',
      options: ['2', '−4', '−6'], answer: 1,
      hints: ['2, doğrunun x = 3’teki yüksekliği; y ekseninde x = 0’dır.', '', '2 · (0 − 3) = −6; sonra 2 eklemeyi unutma.'],
      right: 'x = 0 için çıktı −4.',
    });
    await degistir(c, kuralT, hesap(0)); yaz(sonuc, '= −4');
    await par(soyle(c, 'y ekseninde x = 0’dır: kuralda yerine koy.'), belir(c, sonuc, 400), pop(c, yk, dz.X(0), dz.Y(-4)));
    await kaybol(c, sonuc, 200); await degistir(c, kuralT, KURAL());
    await c.choice({
      tag: 'Tahmin et', q: 'Doğru x eksenini nerede keser?',
      options: ['x = 3', 'x = −4', 'x = 2'], answer: 2,
      hints: ['g(3) = 2 · 0 + 2 = 2; sıfır değil.', '−4, y eksenindeki kesişim; x ekseninde çıktı 0 olmalı.', ''],
      right: 'g(2) = 2 · (−1) + 2 = 0.',
    });
    await degistir(c, kuralT, hesap(2)); yaz(sonuc, '= 0');
    await par(soyle(c, 'x ekseninde çıktı 0’dır: x = 2 bunu sağlıyor.', { dur: true }), belir(c, sonuc, 400), pop(c, xk, dz.X(2), dz.Y(0)));
    await par(soyle(c, 'Şimdi çiz: doğru iki noktadan da geçiyor.'), c.tween(1500, (e) => g.ayarla(2, -4, lerp(3, -5, e), lerp(4, 5, e)), ease.inOut));
    await kaybol(c, sonuc, 200); await degistir(c, kuralT, KURAL());
    yaz(sonuc, '= 2x − 4'); sonuc.style.fill = RENK.g;
    await par(soyle(c, 'Kuralı açınca sabit terim, y eksenindeki kesişimdir.'), belir(c, sonuc, 450));
    c.note('<b>y ekseni:</b> x = 0 koy.<br><b>x ekseni:</b> çıktıyı 0 yapan x.', 'Eksenleri kestiği yer', 'a9-eksen');
  }

  /* ---- 3. İki doğru nerede buluşur? ---- */
  async function ikiDogru(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 100, y0: 60, w: 430, h: 420, xmin: 0, xmax: 6, ymin: 0, ymax: 120, xadim: 1, yadim: 20, xsayi: 2, ysayi: 40, xad: 'kilo', yad: 'lira' });
    const A = dogru(dz, 10, 40, { renk: RENK.f }), B = dogru(dz, 20, 0, { renk: RENK.g, x1: 0, x2: 1.5 });
    const aAd = etiket(dz, 0.6, 46, 'A', { renk: RENK.f, dy: -14 }), bAd = etiket(dz, 1.2, 24, 'B', { renk: RENK.g, dx: 24, dy: 18 });
    const izler = iz(dz, 4, 80, { renk: RENK.sifir }), kes = nokta(dz, 4, 80, { r: 10 });
    const aKural = yazi(svg, 765, 130, 'A: 10x + 40', { size: 34, kalin: 700, renk: RENK.f });
    const bKural = yazi(svg, 765, 185, 'B: 20x', { size: 34, kalin: 700, renk: RENK.g });
    const kontrol = yazi(svg, 765, 300, [['10 · 4 + 40', RENK.f], ' = ', ['20 · 4', RENK.g]], { size: 30, kalin: 650 });
    gizle(A.el, B.el, aAd, bAd, izler.g, kes.el, aKural, bKural, kontrol);

    await par(soyle(c, 'A firması 40 lira alır, kilo başına 10 lira ekler.'), (async () => { await belir(c, aKural, 400); await ciz(c, A, 900); await belir(c, aAd, 250); })());
    await par(soyle(c, 'B firması yalnızca kilo başına 20 lira alır.'), (async () => { await belir(c, bKural, 400); await ciz(c, B, 600); await belir(c, bAd, 250); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Kaç kiloda iki firma aynı ücreti alır?',
      options: ['2 kilo', '4 kilo', '6 kilo'], answer: 1,
      hints: ['2 kiloda A 60, B 40 lira alır.', '', '6 kiloda A 100, B 120 lira alır.'],
      right: '4 kiloda ikisi de 80 lira alır.',
    });
    await par(soyle(c, 'B’nin doğrusunu uzat: A ile 4 kiloda, 80 lirada kesişiyor.', { speak: 'B firmasının doğrusunu uzat: A firmasıyla dört kiloda, seksen lirada kesişiyor.' }), (async () => {
      await c.tween(1500, (e) => B.ayarla(20, 0, 0, lerp(1.5, 6, e)), ease.inOut);
      await pop(c, kes, dz.X(4), dz.Y(80)); await belir(c, izler.g, 350);
    })());
    await par(soyle(c, 'Kontrol: iki kural da 4 için aynı sonucu veriyor.'), belir(c, kontrol, 450));
    c.note('<b>Kesişim:</b> iki kural aynı çıktıyı verir.<br>x = 4’te ikisi de 80', 'İki doğrunun kesişimi', 'a9-kesisim');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, SADE);
    const g = dogru(dz, -1, 3, { renk: RENK.g, x1: 0, x2: 2 });
    const p = nokta(dz, 2, 1, { r: 8 }), yk = nokta(dz, 0, 3, { r: 9 }), xk = nokta(dz, 3, 0, { r: 9 });
    gizle(g.el, p.el, yk.el, xk.el);
    const tb = soruTahtasi(c, svg, { x: 580, y: 150, w: 380, h: 150, size: 34 });
    const KART = [['g(x)', RENK.g], ' = −', ['f(x − 2)', RENK.f], ' + 1'];

    await soyle(c, 'Sıra sende: üç sayıdan grafiği çıkar.', { noWait: true });
    await tb.sor(KART, {
      q: 'Doğrunun eğimi kaç?', options: ['1', '−1', '−2'], answer: 1,
      hints: ['f’nin önünde eksi var: çarpan −1.', '', '2, girdiden çıkan sayı; eğim f’nin önündeki çarpandır.'],
      right: 'a = −1: 1 sağa gidince 1 birim inersin.', kanit: 'a = −1', renk: RENK.sifir,
    });
    await par(soyle(c, 'Doğru (2, 1)’den geçer; 1 sağa gidince 1 iner.', { speak: 'Doğru iki, bir noktasından geçer; bir sağa gidince bir iner.' }), pop(c, p, dz.X(2), dz.Y(1)));
    await tb.sor(KART, {
      q: 'y eksenini nerede keser?', options: ['1', '−1', '3'], answer: 2,
      hints: ['1, doğrunun x = 2’deki yüksekliği; y ekseninde x = 0’dır.', 'x = 0 koy: −(0 − 2) + 1.', ''],
      right: 'x = 0 için çıktı 3.', kanit: 'g(0) = 2 + 1 = 3', renk: RENK.sifir,
    });
    await par(soyle(c, 'Kontrol: doğru y eksenini 3’te kesiyor.'), ciz(c, g, 800), pop(c, yk, dz.X(0), dz.Y(3)));
    await tb.sor(KART, {
      q: 'x eksenini nerede keser?', options: ['x = 2', 'x = 3', 'x = −3'], answer: 1,
      hints: ['g(2) = 1; sıfır değil.', '', 'g(−3) = 5 + 1 = 6; sıfır değil.'],
      right: 'g(3) = −1 + 1 = 0.', kanit: 'g(3) = −1 + 1 = 0', renk: RENK.sifir,
    });
    await par(soyle(c, 'Doğruyu uzat: x eksenini de 3’te kesiyor.', { dur: true }), (async () => {
      await c.tween(1200, (e) => g.ayarla(-1, 3, lerp(0, -5, e), lerp(2, 5, e)), ease.inOut);
      await pop(c, xk, dz.X(3), dz.Y(0));
    })());
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a9', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Katsayılardan grafiği okumak', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Katsayılardan grafiği okumak', hook: 'İki kargo firmasının ücret doğrularını aynı grafiğe çizersek <b>nerede kesişirler?</b>', button: 'Derse başla ›' },
    goals: ['Kuraldaki a, r ve k’den doğrunun eğimini ve yerini okur.', 'Doğrunun eksenleri kestiği noktaları tahmin eder.', 'İki doğrunun kesişimini tahmin edip kontrol eder.'],
    scenes: [
      { title: 'Üç sayı birlikte', goal: 'a, r ve k’nin doğruya ne yaptığını sırayla gör.', run: ucSayi },
      { title: 'Eksenleri nerede keser?', goal: 'Çizmeden önce eksenleri kestiği yerleri bul.', run: eksenler },
      { title: 'İki doğru nerede buluşur?', goal: 'Kesişimi tahmin et, kurallarla kontrol et.', run: ikiDogru },
      { title: 'Sıra sende', goal: 'Kuraldan eğimi ve eksenleri kestiği yerleri bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'g(x) = 3 · f(x − 2) + 1 grafiğinin eğimi kaçtır?', options: ['2', '3', '1'], answer: 1,
        why: ['2, girdiden çıkan sayıdır; doğruyu sağa kaydırır.', 'Eğim, f’nin önündeki çarpandır: a = 3.', '1, çıktıya eklenen sayıdır; doğruyu yukarı kaydırır.'], scene: 0 },
      { q: 'g(x) = 2 · f(x) − 6 grafiği x eksenini hangi noktada keser?', options: ['x = −6', 'x = −3', 'x = 3'], answer: 2,
        why: ['−6, y eksenindeki kesişimdir: g(0) = −6.', 'g(−3) = 2 · (−3) − 6 = −12; sıfır değil.', 'g(3) = 2 · 3 − 6 = 0.'], scene: 1 },
      { q: 'Bir firma 30 lira sabit ücret ve kilo başına 10 lira, öbürü yalnızca kilo başına 20 lira alıyor. Ücretler kaç kiloda eşitlenir?', options: ['2', '3', '6'], answer: 1,
        why: ['2 kiloda ücretler 50 ve 40 lira; eşit değil.', '3 kiloda ikisi de 60 lira: doğrular orada kesişir.', '6 kiloda ücretler 90 ve 120 lira; eşit değil.'], scene: 2 },
      { q: 'g(x) = 2 · f(x − 1) + 3 doğrusu hangi noktadan geçer?', options: ['(1, 3)', '(3, 1)', '(−1, 3)'], answer: 0,
        why: ['Doğru (r, k)’den geçer: g(1) = 2 · 0 + 3 = 3.', 'r ile k yer değiştirmiş: g(3) = 2 · 2 + 3 = 7.', 'g(−1) = 2 · (−2) + 3 = −1; 3 değil.'], scene: 0 },
    ],
    summary: [
      '<b>Eğim a’da, yer r ile k’de saklıdır.</b>',
      'g(x) = a · f(x − r) + k doğrusu (r, k) noktasından geçer.',
      'y ekseni için x = 0 koy; x ekseni için çıktıyı 0 yapan x’i ara.',
    ],
    nextLesson: { href: 'a10-katsayi-ve-artanlik.html', label: 'Sonraki: Katsayı ve artanlık-azalanlık ›' },
  });
})();
