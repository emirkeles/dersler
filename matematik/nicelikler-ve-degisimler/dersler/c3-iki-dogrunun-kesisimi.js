/* C3 — f(x) = g(x): iki doğrunun kesişimi
   Kesişim noktasının x'i denklemin çözümüdür. Bağlam: arz f(x) = x + 5, talep g(x) = −2x + 20, denge (5, 10).
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket } = window.KIT;
  const { lerp, ease } = Ders;

  /* miktar–fiyat düzlemi. Eksen adı "miktar" talep doğrusuna değmesin diye eksenin altına elle yazılır. */
  function plan(svg, o) {
    const dz = duzlem(svg, Object.assign({ x0: 90, y0: 40, w: 440, h: 440, xmin: 0, xmax: 10, ymin: 0, ymax: 28, xadim: 1, yadim: 2, xsayi: 5, ysayi: 10, xad: '', yad: 'fiyat' }, o));
    yazi(dz.arka, dz.x0 + dz.w, dz.Y(0) + (dz.ymin < 0 ? 26 : 48), 'miktar', { size: 20, renk: RENK.soluk, hiza: 'end' });
    return dz;
  }
  const SOL = [['x + 5', RENK.f]];                                   // denklemin sol yanı
  const denklem = (b) => SOL.concat(' = ', [['−2x + ' + b, RENK.g]]);
  const kesX = (b) => (b - 5) / 3;                                   // x + 5 = −2x + b

  /* ---- 1. İki doğru ---- */
  async function ikiDogru(c) {
    const svg = c.svg(1000, 562);
    const dz = plan(svg);
    const f = dogru(dz, 1, 5), g = dogru(dz, -2, 20, { renk: RENK.g });
    const arz = S('g', {}, svg), talep = S('g', {}, svg);
    yazi(arz, 780, 150, 'arz', { size: 24, renk: RENK.soluk }); yazi(arz, 780, 198, 'f(x) = x + 5', { size: 38, kalin: 700, renk: RENK.f });
    yazi(talep, 780, 310, 'talep', { size: 24, renk: RENK.soluk }); yazi(talep, 780, 358, 'g(x) = −2x + 20', { size: 38, kalin: 700, renk: RENK.g });
    const izler = iz(dz, 5, 10, { renk: RENK.sifir });
    const p = nokta(dz, 5, 10, { r: 10 });
    gizle(f.el, g.el, arz, talep, izler.g, p.el);

    await soyle(c, 'Yatay eksende malın miktarı, dikey eksende fiyatı var.');
    await par(soyle(c, 'Arz doğrusu satıcıyı anlatır: miktar arttıkça fiyat artar.'), ciz(c, f, 900), belir(c, arz, 500));
    await par(soyle(c, 'Talep doğrusu alıcıyı anlatır: miktar arttıkça fiyat düşer.'), ciz(c, g, 900), belir(c, talep, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'İki doğru hangi miktarda buluşur?',
      options: ['x = 3', 'x = 5', 'x = 10'], answer: 1,
      hints: ['x = 3 için arz 8, talep 14 eder; henüz eşit değil.', '', 'x = 10’da talep 0’a iner, arz 15’tir.'],
      right: 'x = 5’te ikisi de 10 eder.',
    });
    await par(soyle(c, 'Biri artan, biri azalan: tek bir noktada buluşurlar.'),
      (async () => { await pop(c, p, dz.X(5), dz.Y(10)); await belir(c, izler.g, 500); })());
  }

  /* ---- 2. Kesişim, denklemin çözümü ---- */
  async function cozum(c) {
    const svg = c.svg(1000, 562);
    const dz = plan(svg);
    dogru(dz, 1, 5); dogru(dz, -2, 20, { renk: RENK.g });
    const izler = iz(dz, 5, 10, { renk: RENK.sifir });
    const p = nokta(dz, 5, 10, { r: 10 });
    const denge = etiket(dz, 0, 10, 'denge fiyatı', { renk: RENK.sifir, dx: 12, dy: -10, hiza: 'start' });
    const r1 = yazi(svg, 780, 120, denklem(20), { size: 34, kalin: 700 });
    const r2 = yazi(svg, 780, 184, '3x = 15', { size: 34, kalin: 700 });
    const r3 = yazi(svg, 780, 248, ['x = ', ['5', RENK.sifir]], { size: 34, kalin: 700 });
    const r4 = yazi(svg, 780, 290, [['f(5)', RENK.f], ' = ', ['10', RENK.sifir]], { size: 34, kalin: 700 });
    gizle(izler.g, p.el, denge, r1, r2, r3, r4);

    await par(soyle(c, 'Kesişimde iki fonksiyon aynı değeri verir.'),
      (async () => { await pop(c, p, dz.X(5), dz.Y(10)); await belir(c, r1, 500); })());
    await par(soyle(c, 'x’leri sola, sayıları sağa topla.'), belir(c, r2, 500));
    await par(soyle(c, 'İki yanı 3’e böl: kesişimin x’i bulunur.'), belir(c, r3, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'x = 5 bulundu. Buluştukları fiyat kaç?',
      options: ['5', '10', '15'], answer: 1,
      hints: ['5 miktardır; fiyat için kurallardan birine yaz.', '', 'f(5) = 5 + 5 eder.'],
      right: 'f(5) = 5 + 5 = 10.',
    });
    await par(kaybol(c, r2, 300), c.tween(500, (e) => r3.setAttribute('y', lerp(248, 190, e)), ease.inOut));
    await par(soyle(c, 'Fiyat için x’i kurallardan birine yaz.'), belir(c, r4, 500), belir(c, izler.g, 500));
    yaz(r4, [['f(5)', RENK.f], ' = ', ['g(5)', RENK.g], ' = ', ['10', RENK.sifir]]);
    await soyle(c, 'Öbür kural da aynı fiyatı veriyor: çözüm doğru.', { dur: true });
    await par(soyle(c, 'Alıcıyla satıcının buluştuğu fiyata <b>denge fiyatı</b> denir.'), belir(c, denge, 500));
    await soyle(c, 'Denklemin çözümü x = 5; denge fiyatı o noktanın y’si.');
    c.note('<b>f(x) = g(x):</b> çözüm, kesişimin x’i.<br>Burada x = 5', 'Kesişim', 'c3-kesisim');
  }

  /* ---- 3. Strateji ---- */
  async function strateji(c) {
    const svg = c.svg(1000, 562);
    const dz = plan(svg, { y0: 36, h: 462, xmax: 9, ymin: -16, ymax: 28, xyaz: () => '' });
    dogru(dz, 1, 5);
    const g = dogru(dz, -2, 20, { renk: RENK.g });
    const dik = S('line', { stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
    const p = nokta(dz, 5, 10, { r: 10 });
    const koy = (b) => {
      const x = kesX(b); g.ayarla(-2, b); p.git(x, x + 5);
      dik.setAttribute('x1', dz.X(x)); dik.setAttribute('x2', dz.X(x)); dik.setAttribute('y1', dz.Y(x + 5)); dik.setAttribute('y2', dz.Y(0));
    };
    koy(20);
    const sayilar = [5, 6].map((v) => etiket(dz, v, 0, String(v), { size: 20, renk: RENK.soluk, kalin: 500, dy: 26 }));
    const a1 = yazi(svg, 780, 120, denklem(22), { size: 34, kalin: 700 });
    const a2 = yazi(svg, 780, 184, '3x = 17', { size: 34, kalin: 700 });
    const a3 = yazi(svg, 780, 248, ['x = ', ['17/3', RENK.sifir]], { size: 34, kalin: 700 });
    // tek fonksiyon: (x + 5) − (−2x + 20) = 3x − 15
    const b1 = yazi(svg, 780, 120, denklem(20), { size: 34, kalin: 700 });
    const b2 = yazi(svg, 780, 184, ['3x − 15 = ', ['0', RENK.sifir]], { size: 34, kalin: 700 });
    const h = dogru(dz, 3, -15, { renk: RENK.yazi, kalin: 3, x2: 6.3 });   // 7'de talep doğrusunu kesmesin: konuyla ilgisiz ikinci kesişim
    const hAd = etiket(dz, 2, -9, '3x − 15', { dx: 14, dy: 10, hiza: 'start' });
    const kok = nokta(dz, 5, 0, { r: 9 });
    const kokAd = etiket(dz, 5, 0, '5', { renk: RENK.sifir, dx: -12, dy: -12, hiza: 'end' });
    gizle(dik, sayilar, a1, a2, a3, b1, b2, h.el, hAd, kok.el, kokAd);

    await par(soyle(c, 'Talep doğrusu biraz yukarı kaysın; kesişim de kayar.'),
      (async () => { await c.wait(500); await c.tween(1200, (e) => koy(lerp(20, 22, e)), ease.inOut); await belir(c, a1, 400); })());
    await par(soyle(c, 'Grafik yaklaşık yeri gösterir: 5 ile 6 arasında bir yer.', { ton: 'thoughtful' }), belir(c, [dik].concat(sayilar), 500));
    await par(soyle(c, 'Cebir kesin değeri verir.'), (async () => { await belir(c, a2, 400); await c.wait(500); await belir(c, a3, 400); })());
    await par(kaybol(c, [a1, a2, a3].concat(sayilar), 300), c.tween(900, (e) => koy(lerp(22, 20, e)), ease.inOut));
    await par(soyle(c, 'İlk denkleme dön: kesişim yine 5’te.'), belir(c, b1, 400));
    await c.choice({
      tag: 'Tahmin et', q: 'Bu denklem hangi tek fonksiyonun sıfırını bulmaktır?',
      options: ['−x + 25', '3x − 15', '3x + 25'], answer: 1,
      hints: ['Bu, iki kuralın toplamı. Her şeyi eşitliğin bir yanına taşı.', '', 'Sayıları da taşı: 5 − 20 = −15 eder.'],
      right: 'x + 5 − (−2x + 20) = 3x − 15.',
    });
    await par(soyle(c, 'Her şeyi bir yana topla: denklem tek fonksiyonun sıfırına döner.', { dur: true }),
      (async () => { await belir(c, b2, 500); await ciz(c, h, 900); await belir(c, hAd, 300); })());
    await par(soyle(c, 'Bu doğrunun kökü, kesişimin tam altında.'),
      (async () => { await pop(c, kok, dz.X(5), dz.Y(0)); await belir(c, kokAd, 300); })());
    await soyle(c, 'Kök bulmak geçen dersin işiydi: strateji aynı.');
    c.note('f(x) = g(x) ile f(x) − g(x) = 0 aynı denklemdir.', 'Tek fonksiyona çevir', 'c3-fark');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = plan(svg);
    dogru(dz, 1, 5);
    const g = dogru(dz, -2, 20, { renk: RENK.g });
    const izler = iz(dz, 5, 10, { renk: RENK.sifir });
    const p = nokta(dz, 5, 10, { r: 10 });
    const gKural = yazi(svg, 780, 96, '', { size: 30, kalin: 700, renk: RENK.g });
    const den = yazi(svg, 780, 196, '', { size: 34, kalin: 700 });
    const coz = yazi(svg, 780, 256, '', { size: 34, kalin: 700 });
    yazi(svg, 780, 366, 'denge fiyatı', { size: 24, renk: RENK.soluk });
    const fiyat = yazi(svg, 780, 426, '', { size: 54, kalin: 700, renk: RENK.sifir });
    const koy = (b) => {
      const x = kesX(b), y = x + 5;
      g.ayarla(-2, b); p.git(x, y); izler.ayarla(x, y);
      yaz(gKural, 'g(x) = −2x + ' + b); yaz(den, denklem(b)); yaz(coz, ['x = ', [sayi(x), RENK.sifir]]); yaz(fiyat, sayi(y));
    };
    await soyle(c, 'Talebin sabit terimini değiştir; kesişimi ve denge fiyatını izle.', { noWait: true });
    c.slider({ label: 'talebin sabit terimi', min: 14, max: 26, step: 3, value: 20, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c3', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'f(x) = g(x): iki doğrunun kesişimi', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'f(x) = g(x): iki doğrunun kesişimi', hook: 'Fiyat arttıkça satıcı daha çok, alıcı daha az mal getiriyor. <b>İkisinin eşitlendiği fiyat nasıl bulunur?</b>', button: 'Derse başla ›' },
    goals: ['f(x) = g(x) denklemini iki doğrunun kesişimiyle yorumlar.', 'Denklemi cebirle çözer, çözümü grafikle karşılaştırır.', 'Denklemi tek fonksiyonun sıfırını bulmaya çevirir.'],
    scenes: [
      { title: 'İki doğru', goal: 'Arz ve talep doğrularını aynı düzlemde gör.', run: ikiDogru },
      { title: 'Kesişim, denklemin çözümü', goal: 'Kesişimi cebirle bul.', run: cozum },
      { title: 'Strateji', goal: 'Grafik ile cebiri karşılaştır.', run: strateji },
      { title: 'Dene', goal: 'Talep doğrusunu kaydır, dengeyi izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = 2x + 1 ve g(x) = x + 4 için f(x) = g(x) denkleminin çözümü kaçtır?', options: ['7', '3', '5'], answer: 1,
        why: ['7, kesişimin y’sidir: f(3) = 7. Çözüm x’tir.', '2x + 1 = x + 4 ise x = 3.', 'f(5) = 11, g(5) = 9: eşit değil.'], scene: 1 },
      { q: 'İki doğrunun kesişim noktası (3, 7) ise hangisi doğrudur?', options: ['f(7) = g(7) = 3', 'f(3) = 7 ve g(7) = 3', 'f(3) = g(3) = 7'], answer: 2,
        why: ['Noktanın ilk sayısı girdidir: x = 3.', 'Kesişimde iki fonksiyon aynı girdide aynı değeri verir.', 'İkisi de x = 3 için 7 verir.'], scene: 1 },
    ],
    summary: [
      '<b>Doğruların kesiştiği yerde iki fonksiyon eşittir.</b>',
      'f(x) = g(x)’in çözümü kesişim noktasının x’idir; y’si ortak değerdir.',
      'Grafik yaklaşık yeri gösterir, cebir kesin değeri verir.',
    ],
    nextLesson: { href: 'c4-hangi-dogru-ustte.html', label: 'Sonraki: f(x) ≤ g(x) ve f(x) ≥ g(x) ›' },
  });
})();
