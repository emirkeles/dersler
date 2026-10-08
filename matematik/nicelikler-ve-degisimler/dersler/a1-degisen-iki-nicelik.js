/* A1 — Değişen iki nicelik
   Bağımlı ve bağımsız değişken, doğrusal değişim, f(x) = x'in tablo, grafik ve kuralı.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, tablo } = window.KIT;
  const { lerp, ease } = Ders;

  /* ---- 1. Hangisi hangisine bağlı? ---- */
  async function bagli(c) {
    const svg = c.svg(1000, 562);
    // saat
    const saat = yazi(svg, 290, 270, '06:00', { size: 96, kalin: 700, renk: RENK.f });
    const saatAd = yazi(svg, 290, 330, 'saat', { size: 26, renk: RENK.soluk });
    // termometre: 0–25 °C arası 260 birim
    const TX = 690, ALT = 400, BOY = 260, yuk = (t) => (t / 25) * BOY;
    const term = S('g', {}, svg);
    S('rect', { x: TX - 20, y: ALT - BOY - 16, width: 40, height: BOY + 40, rx: 20, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2.5 }, term);
    const civa = S('rect', { x: TX - 9, width: 18, rx: 9, fill: RENK.g }, term);
    S('circle', { cx: TX, cy: ALT + 22, r: 26, fill: RENK.g }, term);
    const derece = yazi(svg, TX + 54, 0, '', { size: 44, kalin: 700, renk: RENK.g, hiza: 'start' });
    const termAd = yazi(svg, TX, 492, 'sıcaklık', { size: 26, renk: RENK.soluk });
    const koy = (h_, t) => {
      yaz(saat, String(Math.floor(h_)).padStart(2, '0') + ':' + (h_ % 1 >= 0.5 ? '30' : '00'));
      civa.setAttribute('y', ALT - yuk(t)); civa.setAttribute('height', yuk(t) + 10);
      yaz(derece, sayi(Math.round(t)) + ' °C'); derece.setAttribute('y', ALT - yuk(t) + 16);
    };
    koy(6, 8);
    const ok = S('g', {}, svg);
    S('line', { x1: 440, y1: 240, x2: 590, y2: 240, stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round' }, ok);
    S('path', { d: 'M604,240 l-16,-9 v18 z', fill: RENK.soluk }, ok);
    const bagimsiz = yazi(svg, 290, 120, 'bağımsız değişken', { size: 28, renk: RENK.f });
    const bagimli = yazi(svg, TX, 76, 'bağımlı değişken', { size: 28, renk: RENK.g });
    gizle(ok, bagimsiz, bagimli);

    await par(soyle(c, 'Saat ilerliyor, termometredeki sayı değişiyor.'),
      c.tween(3600, (e) => koy(lerp(6, 14, e), lerp(8, 20, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'Hangisi öbürüne bağlı olarak değişiyor?',
      options: ['Sıcaklık, saate bağlı', 'Saat, sıcaklığa bağlı'], answer: 0,
      hints: ['', 'Hava ısınınca saat hızlanmaz; saat kendi başına ilerler.'],
      right: 'Saat kendi başına ilerler; sıcaklık ona göre değişir.',
    });
    await par(soyle(c, 'Kendi başına değişen nicelik: <b>bağımsız değişken</b>.', { dur: true }), belir(c, bagimsiz, 500));
    await par(soyle(c, 'Ona bağlı değişen nicelik: <b>bağımlı değişken</b>.'), (async () => { await belir(c, ok, 400); await belir(c, bagimli, 500); })());
    await belir(c, [saatAd, termAd], 300, 0.6);
    c.note('<b>Bağımsız değişken</b> kendi değişir, <b>bağımlı değişken</b> ona göre.<br>saat → sıcaklık', 'İki değişken', 'a1-degisken');
  }

  /* ---- 2. Aynı adımlarla değişim ---- */
  async function dogrusalDegisim(c) {
    const svg = c.svg(1000, 562);
    // kova: 5 litre = 300 birim
    const KX = 130, KW = 220, ALT = 470, L = 60;
    S('path', { d: `M${KX - 40},96 h70 q26,0 26,26 v26`, fill: 'none', stroke: RENK.eksen, 'stroke-width': 14, 'stroke-linecap': 'round' }, svg);
    const akis = S('line', { x1: KX + 56, y1: 150, x2: KX + 56, y2: ALT - 4, stroke: RENK.f, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0 }, svg);
    const su = S('rect', { x: KX + 3, width: KW - 6, y: ALT, height: 0, fill: RENK.f, 'fill-opacity': 0.55 }, svg);
    S('path', { d: `M${KX},160 V${ALT} H${KX + KW} V160`, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
    for (let k = 1; k <= 5; k++) S('line', { x1: KX + KW - 22, y1: ALT - k * L, x2: KX + KW, y2: ALT - k * L, stroke: RENK.yazi, 'stroke-width': 2.5 }, svg);
    const litre = yazi(svg, KX + KW / 2, 530, '0 litre', { size: 34, kalin: 700, renk: RENK.f });
    const doldur = (v) => { su.setAttribute('y', ALT - v * L); su.setAttribute('height', v * L); yaz(litre, sayi(Math.round(v)) + ' litre'); };

    const tb = tablo(svg, { x: 460, y: 200, basliklar: ['dakika', 'litre'], n: 6, hucre: 66, yuk: 56, basGen: 110, size: 26, renkler: [RENK.soluk, RENK.f] });
    const artis = [0, 1, 2, 3, 4].map((k) => yazi(svg, 460 + 110 + (k + 1) * 66, 346, '+1', { size: 22, renk: RENK.sifir }));
    gizle(artis);
    const dakika = async (k) => {   // k. dakikaya kadar akıt, tabloya yaz
      akis.style.opacity = 0.9;
      await c.tween(900, (e) => doldur(lerp(k - 1, k, e)), ease.linear);
      akis.style.opacity = 0;
      tb.yaz(0, k, String(k)); tb.yaz(1, k, String(k), RENK.f);
      await belir(c, artis[k - 1], 250);
    };
    tb.yaz(0, 0, '0'); tb.yaz(1, 0, '0', RENK.f);
    await par(soyle(c, 'Musluk her dakika 1 litre su akıtıyor.'), (async () => { for (let k = 1; k <= 3; k++) { await dakika(k); await c.wait(250); } })());
    await c.choice({
      tag: 'Tahmin et', q: '5. dakikada kovada kaç litre su olur?',
      options: ['3 litre', '5 litre', '6 litre'], answer: 1,
      hints: ['3 litre 3. dakikadaydı; musluk hâlâ açık.', '', 'Her dakika 1 litre: 5 dakikada 5 litre eder.'],
      right: 'Her dakika 1 litre: 5 dakikada 5 litre.',
    });
    await dakika(4); await dakika(5);
    await soyle(c, 'Her dakikada aynı artış: buna <b>doğrusal değişim</b> denir.', { dur: true });
    c.note('<b>Doğrusal değişim:</b> eşit adımda eşit artış.<br>Her dakika +1 litre', 'Doğrusal değişim', 'a1-dogrusal');
  }

  /* ---- 3. Üç temsil ---- */
  async function ucTemsil(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460 });
    const tb = tablo(svg, { x: 620, y: 70, basliklar: ['x', 'f(x)'], n: 4, hucre: 58, yuk: 50, basGen: 84, renkler: [RENK.soluk, RENK.f] });
    [0, 1, 2, 3].forEach((v, k) => { tb.yaz(0, k, String(v)); tb.yaz(1, k, String(v), RENK.f); });
    const noktalar = [0, 1, 2, 3].map((v) => nokta(dz, v, v, { renk: RENK.f, r: 9 }));
    gizle(noktalar.map((n) => n.el));
    const ara = [0.5, 1.5, 2.5].map((v) => nokta(dz, v, v, { renk: RENK.f, r: 6 })); gizle(ara.map((n) => n.el));
    const d = dogru(dz, 1, 0, { x1: 0, x2: 3 }); gizle(d.el);
    const kuralT = yazi(svg, 765, 300, [['f(x) = x', RENK.f]], { size: 52, kalin: 700 });
    gizle(kuralT);

    await par(soyle(c, 'Kovanın tablosu: girdi dakika, çıktı litre.'), belir(c, tb.g, 400));
    await par(soyle(c, 'Tablodaki her çift düzlemde bir nokta olur.'), (async () => {
      for (const n of noktalar) { await pop(c, n, dz.X(n.x), dz.Y(n.y), 350); await c.wait(150); }
    })());
    await par(soyle(c, 'Aradaki her an için de bir nokta var.'), (async () => {
      for (const n of ara) { await pop(c, n, dz.X(n.x), dz.Y(n.y), 280); }
      await ciz(c, d, 700); await kaybol(c, ara.map((n) => n.el), 250);
    })());
    await par(soyle(c, 'Girdi her gerçek sayı olabilir: doğru iki yana uzar.'),
      c.tween(1100, (e) => d.ayarla(1, 0, lerp(0, -5, e), lerp(3, 5, e)), ease.inOut));
    await par(soyle(c, 'Kuralı kısa: çıktı girdiye eşit.'), belir(c, kuralT, 500));
    await soyle(c, 'Bu fonksiyonun adı: <b>doğrusal referans fonksiyon</b>.', { dur: true });
    await soyle(c, 'Tablo, grafik ve kural aynı fonksiyonu gösterir.');
    c.note('<b>Doğrusal referans fonksiyon:</b> f(x) = x<br>f(3) = 3', 'f(x) = x', 'a1-referans');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460 });
    dogru(dz, 1, 0);
    const izler = iz(dz, 2, 2, { renk: RENK.sifir });
    const p = nokta(dz, 2, 2, { r: 10 });
    yazi(svg, 765, 150, [['f(x) = x', RENK.f]], { size: 44, kalin: 700 });
    const deger = yazi(svg, 765, 290, '', { size: 52, kalin: 700 });
    const cift = yazi(svg, 765, 350, '', { size: 26, renk: RENK.soluk });
    const koy = (x) => {
      p.git(x, x); izler.ayarla(x, x);
      const s_ = sayi(x);
      yaz(deger, ['f(' + s_ + ') = ', [s_, RENK.sifir]]); yaz(cift, 'nokta: (' + s_ + ', ' + s_ + ')');
    };
    await soyle(c, 'x’i değiştir; nokta doğru üzerinde yürür.', { noWait: true });
    c.slider({ label: 'x (girdi)', min: -4, max: 4, step: 0.5, value: 2, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a1', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Değişen iki nicelik', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Değişen iki nicelik', hook: 'Gün boyunca saat ilerledikçe termometredeki sayı değişir. <b>Hangisi hangisine bağlıdır?</b>', button: 'Derse başla ›' },
    goals: ['Bağımlı ve bağımsız değişkeni ayırt eder.', 'Doğrusal değişimi tanır.', 'f(x) = x fonksiyonunu tablo, grafik ve kuralla gösterir.'],
    scenes: [
      { title: 'Hangisi hangisine bağlı?', goal: 'Bağımsız ve bağımlı değişkeni ayırt et.', run: bagli },
      { title: 'Aynı adımlarla değişim', goal: 'Eşit adımda eşit artışı gör.', run: dogrusalDegisim },
      { title: 'Üç temsil', goal: 'Tablo, grafik ve kuralın aynı fonksiyonu gösterdiğini gör.', run: ucTemsil },
      { title: 'Dene', goal: 'Girdiyi değiştir, çıktıyı izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yürüdüğün süre arttıkça aldığın yol artıyor. <b>Bağımsız değişken</b> hangisi?', options: ['Süre', 'Yol', 'İkisi de'], answer: 0,
        why: ['Süre kendi başına ilerler; yol ona bağlı değişir.', 'Yol süreye bağlı değişir: bağımlı değişkendir.', 'Biri kendi değişir, öbürü ona bağlıdır.'], scene: 0 },
      { q: 'f(x) = x için f(−4) kaçtır?', options: ['4', '−4', '0'], answer: 1,
        why: ['f işareti değiştirmez; çıktı girdinin kendisidir.', 'Çıktı girdiye eşit: f(−4) = −4.', '0 yalnızca x = 0 için çıkar.'], scene: 3 },
    ],
    summary: [
      '<b>Biri değişince öbürü nasıl değişiyor, fonksiyon onu söyler.</b>',
      '<b>Bağımsız değişken</b> kendi değişir; <b>bağımlı değişken</b> ona göre değişir.',
      '<b>f(x) = x:</b> doğrusal referans fonksiyon. Tablosu, grafiği ve kuralı aynı şeyi anlatır.',
    ],
    nextLesson: { href: 'a2-girdi-ve-cikti-kumeleri.html', label: 'Sonraki: Girdi ve çıktı kümeleri ›' },
  });
})();
