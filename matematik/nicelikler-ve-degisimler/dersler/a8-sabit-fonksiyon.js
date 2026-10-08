/* A8 — Sabit fonksiyon
   a = 0 olunca girdi çıktıyı etkilemez: doğru yatay olur, değeri sabit terimdir.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, nokta, iz, serit, etiket, tablo, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };

  /* ---- 1. Kullanım artar, fatura aynı ---- */
  async function faturaAyni(c) {
    const svg = c.svg(1000, 562);
    const BX = 170, BW = 620, BY = 88;   // kullanım çubuğu: 0–50 saat
    yazi(svg, BX, BY - 18, 'kullanım', { size: 22, renk: RENK.soluk, hiza: 'start', kalin: 500 });
    S('rect', { x: BX, y: BY, width: BW, height: 26, rx: 13, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, svg);
    const dolu = S('rect', { x: BX, y: BY, width: 0, height: 26, rx: 13, fill: RENK.f }, svg);
    const saat = yazi(svg, BX + BW + 20, BY + 23, '', { size: 30, kalin: 700, renk: RENK.f, hiza: 'start' });
    S('rect', { x: 350, y: 160, width: 300, height: 170, rx: 16, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, svg);
    yazi(svg, 500, 204, 'fatura', { size: 22, renk: RENK.soluk, kalin: 500 });
    yazi(svg, 500, 286, '300 lira', { size: 62, kalin: 700, renk: RENK.g });
    const tb = tablo(svg, { x: 210, y: 386, basliklar: ['saat', 'lira'], n: 5, hucre: 94, yuk: 56, basGen: 110, size: 26, renkler: [RENK.f, RENK.g] });
    const kullan = (v) => { dolu.setAttribute('width', (BW * v) / 50); yaz(saat, sayi(Math.round(v)) + ' saat'); };
    const doldur = (k, v) => { tb.yaz(0, k, sayi(v), RENK.f); tb.yaz(1, k, '300', RENK.g); };
    kullan(0); doldur(0, 0);

    await par(soyle(c, 'Abonelik ayda 300 lira; kullanım saat saat artıyor.'), (async () => {
      for (let k = 1; k <= 3; k++) {
        await c.tween(800, (e) => kullan(lerp((k - 1) * 10, k * 10, e)), ease.inOut);
        doldur(k, k * 10); await c.wait(300);
      }
    })());
    await c.choice({
      tag: 'Tahmin et', q: '50 saat kullanınca fatura kaç lira olur?',
      options: ['500 lira', '350 lira', '300 lira'], answer: 2,
      hints: ['Saat başına ücret yok; abonelik aylık tek ücret.', 'Kullanım faturaya bir şey eklemiyor.', ''],
      right: 'Kaç saat kullanırsan kullan, fatura 300 lira.',
    });
    await par(soyle(c, 'Girdi değişti, çıktı hiç değişmedi.'), (async () => {
      await c.tween(1100, (e) => kullan(lerp(30, 50, e)), ease.inOut);
      doldur(4, 50);
    })());
    await soyle(c, 'Tablonun alt satırında hep aynı sayı var.');
  }

  /* ---- 2. a sıfıra inerken ---- */
  async function sifiraInerken(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const g = dogru(dz, 2, 3, { renk: RENK.g });
    const izler = iz(dz, -4, 3, { renk: RENK.sifir });
    const mil = nokta(dz, 0, 3, { r: 9 }), gezen = nokta(dz, -4, 3, { renk: RENK.g, r: 8 });
    const kuralT = yazi(svg, 765, 150, '', { size: 38, kalin: 700 });
    const acik = yazi(svg, 765, 215, ['= ', ['3', RENK.sifir]], { size: 38, kalin: 700, renk: RENK.g });
    gizle(izler.g, mil.el, gezen.el, acik);
    let sabitTerim = RENK.yazi;
    const koy = (a) => {
      const ay = Math.round(a * 10) / 10;
      g.ayarla(a, 3);
      yaz(kuralT, [['g(x)', RENK.g], ' = ', [ay === 0 ? '0' : ay === 1 ? '' : sayi(ay), RENK.sifir], (ay === 0 ? ' · x' : 'x') + ' + ', ['3', sabitTerim]]);
    };
    const yuru = (x) => { gezen.git(x, 3); izler.ayarla(x, 3); };
    koy(2);

    await par(soyle(c, 'Katsayı a şimdi 2; doğru y eksenini 3’te kesiyor.'), pop(c, mil, dz.X(0), dz.Y(3)));
    await par(soyle(c, 'a küçüldükçe doğru yatıklaşıyor.'), c.tween(2000, (e) => koy(lerp(2, 0.5, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'a = 0 olursa grafik nasıl olur?',
      options: ['Dikey doğru', 'Yatay doğru', 'Orijinden geçen doğru'], answer: 1,
      hints: ['a küçüldükçe doğru yatıyor; dikleşmiyor.', '', 'Doğru (0, 3) noktasından hiç ayrılmadı.'],
      right: '0 · x her x için 0’dır; geriye yalnızca 3 kalır.',
    });
    await par(soyle(c, 'a = 0 olunca doğru yatay.'), c.tween(1300, (e) => koy(lerp(0.5, 0, e)), ease.inOut));
    await belir(c, acik, 400);
    await par(soyle(c, 'Girdi ne olursa olsun çıktı 3.'), (async () => {
      await belir(c, [gezen.el, izler.g], 250);
      await c.tween(2400, (e) => yuru(lerp(-4, 4, e)), ease.inOut);
    })());
    await kaybol(c, [gezen.el, izler.g], 250);
    await soyle(c, 'Çıktısı hiç değişmeyen fonksiyona <b>sabit fonksiyon</b> denir.');
    sabitTerim = RENK.sifir; koy(0);
    await soyle(c, 'Değeri, kuralda x’e bağlı olmayan sayıdır: <b>sabit terim</b>.', { dur: true });
    c.note('<b>Sabit fonksiyon:</b> a = 0, çıktı hep sabit terim.<br>g(x) = 3', 'Sabit fonksiyon', 'a8-sabit');
    await soyle(c, 'a’yı değiştir; doğru yalnızca a = 0’da yatay.', { noWait: true });
    c.slider({ label: 'a', min: 0, max: 2, step: 0.5, value: 0, fmt: (v) => sayi(v), onInput: (v) => { koy(v); acik.style.opacity = v === 0 ? 1 : 0; } });
    await c.cont('Devam ›');
  }

  /* ---- 3. Farkı ne? ---- */
  async function farkiNe(c) {
    const svg = c.svg(1000, 562);
    const KUTU = { y0: 96, w: 320, h: 320, xmin: -5, xmax: 5, ymin: -2, ymax: 8, sayilar: false, xad: '', yad: '' };
    /* Bir düzlem: doğru, üzerinde yürüyen nokta, y eksenine düşen izi ve altındaki iki satır */
    const kur = (x0, a, baslik) => {
      const dz = duzlem(svg, Object.assign({ x0 }, KUTU)), mx = x0 + KUTU.w / 2;
      dogru(dz, a, 3, { renk: RENK.g });
      yazi(svg, mx, 66, baslik, { size: 30, kalin: 700 });
      etiket(dz, 0, 3, '3', { renk: RENK.soluk, size: 20, hiza: 'start', dx: 10, dy: 27 });
      const golge = serit(dz, 'y', 3, 3), izler = iz(dz, 0, 3, { renk: RENK.sifir });
      const p = nokta(dz, 0, 3, { r: 8, katman: dz.orta });
      const kume = yazi(svg, mx, 462, '', { size: 26, kalin: 650 }), yon = yazi(svg, mx, 510, '', { size: 26, kalin: 650, renk: RENK.g });
      gizle(izler.g, p.el, golge.el);
      let enAz = 99, enCok = -99;
      return { dz, p, izler, golge, kume, yon, yuru(x) { const y = a * x + 3; p.git(x, y); izler.ayarla(x, y); enAz = Math.min(enAz, y); enCok = Math.max(enCok, y); golge.ayarla(enAz, enCok); } };
    };
    const sol = kur(100, 1, [['g(x)', RENK.g], ' = x + 3']), sag = kur(580, 0, [['g(x)', RENK.g], ' = 3']);
    const tek = nokta(sag.dz, 0, 3, { r: 9 }); gizle(tek.el);
    sol.yuru(-5); sag.yuru(-5);

    await soyle(c, 'Solda a = 1, sağda a = 0.');
    await par(soyle(c, 'Soldaki doğruda çıktılar y eksenini boydan boya geziyor.'), (async () => {
      sol.golge.el.style.opacity = 0.9; await belir(c, [sol.p.el, sol.izler.g], 250);
      await c.tween(2600, (e) => sol.yuru(lerp(-5, 5, e)), ease.inOut);
      yaz(sol.kume, ['görüntü kümesi: ', ['ℝ', RENK.sifir]]);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'g(x) = 3’ün görüntü kümesi hangisi?',
      options: ['ℝ', '{0}', '{3}'], answer: 2,
      hints: ['Çıktı hiç değişmiyor; 3’ten başka değer çıkmaz.', 'Çıkan değer 0 değil, sabit terim: 3.', ''],
      right: 'Çıkabilen tek değer 3.',
    });
    await par(soyle(c, 'Sağda her girdinin çıktısı 3: tek elemanlı küme.', { dur: true }), (async () => {
      await belir(c, [sag.p.el, sag.izler.g], 250);
      await c.tween(2400, (e) => sag.yuru(lerp(-5, 5, e)), ease.inOut);
      await pop(c, tek, sag.dz.X(0), sag.dz.Y(3));
      yaz(sag.kume, ['görüntü kümesi: ', ['{3}', RENK.sifir]]);
    })());
    await kaybol(c, [sol.p.el, sol.izler.g, sag.p.el, sag.izler.g], 250);
    yaz(sol.yon, 'artan');
    await soyle(c, 'Soldaki sağa gittikçe yükselir: artan.');
    yaz(sag.yon, 'ne artan ne azalan');
    await soyle(c, 'Sabit fonksiyon sağa gittikçe ne yükselir ne alçalır.', { ton: 'thoughtful' });
    c.note('<b>g(x) = 3</b> için görüntü kümesi {3}.<br>Grafiği yatay doğru', 'Sabit fonksiyonun grafiği', 'a8-grafik');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, Object.assign({ xmin: -8, xmax: 8, ymin: -8, ymax: 8, xadim: 2, yadim: 2, xad: '', yad: '' }, D));
    const g = dogru(dz, 0, 5, { renk: RENK.g });
    const deger = etiket(dz, 0, 0, '', { renk: RENK.sifir, hiza: 'start' });
    gizle(g.el, deger);
    const tb = soruTahtasi(c, svg, { x: 580, y: 150, w: 380, h: 150, size: 34 });
    let tur = 0;   // sıradaki karta geçilince yarım kalan belirme dursun
    /* Doğru cevapta g(x) = ax + b çizilir; yataysa yüksekliği y ekseninin yanına yazılır. */
    const goster = (a, b) => (i, dogruMu) => {
      if (!dogruMu) return;
      const t = ++tur, els = a === 0 ? [g.el, deger] : [g.el];
      g.ayarla(a, b); yaz(deger, sayi(b)); deger.setAttribute('x', dz.X(0) + 12); deger.setAttribute('y', dz.Y(b) - 12);
      c.tween(500, (e) => { if (t === tur) els.forEach((el) => { el.style.opacity = e; }); }, ease.out).catch(() => {});
    };
    const temizle = () => { tur++; gizle(g.el, deger); };
    const SABIT_MI = 'Bu bir sabit fonksiyon mu?';

    await soyle(c, 'Sıra sende: çıktı girdiye bağlı mı, ona bak.', { noWait: true });
    await tb.sor([['g(x)', RENK.g], ' = 5'], {
      q: SABIT_MI, options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Kuralda x yok; çıktı her girdide 5.'],
      right: 'Çıktı her girdide 5: grafiği yatay doğru.', kanit: 'her girdide 5', onPick: goster(0, 5),
    });
    temizle();
    await tb.sor([['g(x)', RENK.g], ' = 5x'], {
      q: SABIT_MI, options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Çıktı girdiyle değişiyor: g(1) = 5 ama g(2) = 10.', ''],
      right: 'Çıktı girdiyle değişiyor; grafiği yatay değil.', kanit: 'g(1) = 5, g(2) = 10', renk: RENK.g, onPick: goster(5, 0),
    });
    temizle();
    await tb.sor([['g(x)', RENK.g], ' = 0 · x − 2'], {
      q: SABIT_MI, options: ['Hayır', 'Evet'], answer: 1,
      hints: ['0 · x her x için 0’dır; geriye −2 kalır.', ''],
      right: '0 · x = 0 olduğu için çıktı hep −2.', kanit: 'g(x) = −2', onPick: goster(0, -2),
    });
    temizle();
    await tb.sor([['g(x)', RENK.g], ' = 7'], {
      q: 'g(100) kaçtır?', options: ['100', '700', '7'], answer: 2,
      hints: ['Kuralda x yok; girdi çıktıyı etkilemez.', 'Kuralda x yok; 7 hiçbir şeyle çarpılmaz.', ''],
      right: 'Girdi ne olursa olsun çıktı 7.', kanit: 'g(100) = 7', onPick: goster(0, 7),
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a8', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Sabit fonksiyon', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Sabit fonksiyon', hook: 'Aylık sabit ücretli bir abonelikte kullanımı artırırsan <b>fatura ne olur?</b>', button: 'Derse başla ›' },
    goals: ['a = 0 olunca fonksiyonun sabit fonksiyon olduğunu söyler.', 'Sabit fonksiyonun değerini sabit terimden okur.', 'Sabit fonksiyonun grafiğini öbür doğrulardan ayırt eder.'],
    scenes: [
      { title: 'Kullanım artar, fatura aynı', goal: 'Girdinin çıktıyı etkilemediği bir durumu tanı.', run: faturaAyni },
      { title: 'a sıfıra inerken', goal: 'a = 0 olunca doğrunun yatay olduğunu gör.', run: sifiraInerken },
      { title: 'Farkı ne?', goal: 'Sabit fonksiyonu x + 3 ile karşılaştır.', run: farkiNe },
      { title: 'Sıra sende', goal: 'Kuraldan sabit fonksiyonu tanı.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'g(x) = 7 için g(100) kaçtır?', options: ['100', '7', '700'], answer: 1,
        why: ['Kuralda x yok; girdi çıktıyı etkilemez.', 'Sabit fonksiyon her girdiye aynı çıktıyı verir: 7.', 'Kuralda x yok; 7 hiçbir şeyle çarpılmaz.'], scene: 3 },
      { q: 'g(x) = ax + 4’te a = 0 olursa grafik nasıl olur?', options: ['4 yüksekliğinde yatay doğru', 'Orijinden geçen doğru', 'Dikey doğru'], answer: 0,
        why: ['0 · x = 0 olur, g(x) = 4 kalır: her girdide 4.', 'g(0) = 4; doğru orijinden değil, (0, 4)’ten geçer.', 'a küçüldükçe doğru yatar; a = 0’da yatay olur.'], scene: 1 },
      { q: 'Bir otopark, kaç saat kalırsan kal 50 lira alıyor. Saat–ücret grafiği nasıldır?', options: ['Sağa doğru yükselen doğru', '50 yüksekliğinde yatay doğru', 'Orijinden geçen doğru'], answer: 1,
        why: ['Yükselmesi için ücret saatle artmalıydı.', 'Çıktı hep 50: sabit fonksiyon, yatay doğru.', 'Orijinden geçseydi 0 saatte ücret 0 olurdu; burada 50.'], scene: 0 },
      { q: 'g(x) = 4 fonksiyonunun <b>görüntü kümesi</b> hangisidir?', options: ['ℝ', '[0, 4]', '{4}'], answer: 2,
        why: ['Girdi her gerçek sayı olabilir, ama çıktı hep 4’tür.', '0 ile 4 arasındaki sayılar hiç çıkmaz.', 'Çıkabilen tek değer 4’tür.'], scene: 2 },
    ],
    summary: [
      '<b>Girdi ne olursa olsun çıktı değişmiyorsa fonksiyon sabittir.</b>',
      'g(x) = ax + b’de a = 0 olursa g(x) = b kalır: değeri <b>sabit terim</b>dir.',
      'Grafiği yatay doğrudur; görüntü kümesinde tek sayı vardır.',
    ],
    nextLesson: { href: 'a9-katsayilardan-grafigi-okumak.html', label: 'Sonraki: Katsayılardan grafiği okumak ›' },
  });
})();
