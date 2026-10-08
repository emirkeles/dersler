/* C10 — Modelin sınırı
   Kural bir modeldir: önceden söyler (gücü), yalnızca anlamlı olduğu aralıkta ve koşullar değişmedikçe geçerlidir (sınırı).
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, nokta, iz, serit, etiket, adimlar, soruTahtasi } = window.KIT;
  const { lerp, clamp, ease } = Ders;

  const h = (x) => 300 - 2 * x;
  /* Gün–derinlik düzlemi: yatayda 50 gün, dikeyde 100 cm aralıklı. */
  const DZ = { x0: 86, y0: 44, w: 480, h: 460, xmin: 0, xmax: 220, ymin: -120, ymax: 340, xadim: 50, yadim: 100, xsayi: 100, ysayi: 100, xad: 'gün', yad: 'cm' };
  const dusey = (dz, x, y, renk = RENK.sifir) => S('line', { x1: dz.X(x), y1: dz.Y(y), x2: dz.X(x), y2: dz.Y(0), stroke: renk, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
  /* Modelin geçerli parçası (dolu) ve aralık dışındaki uzantısı (soluk, kesik). */
  const model = (dz) => dogru(dz, -2, 300, { x1: 0, x2: 150 });
  const uzanti = (dz) => { const d = dogru(dz, -2, 300, { x1: 150, x2: 210, kesik: true, kalin: 3 }); d.el.setAttribute('opacity', 0.55); return d; };
  /* Yağmurlu hafta: derinlik modelden ayrılır. */
  const yagmur = (dz) => kirik(dz, [[70, 160], [80, 205], [150, 65]], { renk: RENK.yazi, kalin: 3, kesik: '3 8' });

  /* Göl kesiti (yerel; kitte yok). o: { x, y, w, h } — h, 300 cm'lik derinliğin tahtadaki boyu. Döner: { g, ayarla(cm) } */
  function gol(p, o) {
    const g = S('g', {}, p), cx = o.x + o.w / 2, a = o.w / 2, b = o.w * 0.2, alt = o.y + o.h;
    const su = S('polygon', { fill: RENK.f, 'fill-opacity': 0.5 }, g);
    const yuzey = S('line', { stroke: RENK.f, 'stroke-width': 3 }, g);
    S('path', { d: `M${o.x - 28},${o.y} H${cx - a} L${cx - b},${alt} H${cx + b} L${cx + a},${o.y} H${o.x + o.w + 28}`, fill: 'none', stroke: RENK.eksen, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const api = { g, ayarla(cm) {
      const t = clamp(cm / 300, 0, 1), hw = lerp(b, a, t), yy = alt - t * o.h;
      su.setAttribute('points', `${cx - b},${alt} ${cx + b},${alt} ${cx + hw},${yy} ${cx - hw},${yy}`);
      yuzey.setAttribute('x1', cx - hw); yuzey.setAttribute('x2', cx + hw); yuzey.setAttribute('y1', yy); yuzey.setAttribute('y2', yy);
      yuzey.style.opacity = t > 0 ? 1 : 0; return api;
    } };
    return api.ayarla(300);
  }

  /* ---- 1. Kuraldan modele ---- */
  async function kuraldanModele(c) {
    const svg = c.svg(1000, 562);
    const gl = gol(svg, { x: 80, y: 120, w: 340, h: 240 });
    const gun = yazi(svg, 250, 440, '', { size: 30, renk: RENK.soluk }), der = yazi(svg, 250, 492, '', { size: 38, kalin: 700, renk: RENK.f });
    const koy = (x) => { gl.ayarla(h(x)); yaz(gun, 'gün ' + Math.round(x)); yaz(der, sayi(Math.round(h(x))) + ' cm'); };
    koy(0);
    const SAG = 740;
    const modelAd = yazi(svg, SAG, 96, 'model', { size: 30, renk: RENK.soluk });
    const kural = yazi(svg, SAG, 160, ['h(x) = ', ['300', RENK.sifir], [' − 2', RENK.eksi], 'x'], { size: 42, kalin: 700 });
    const tank = yazi(svg, 580, 270, ['tank:  ', ['60', RENK.sifir], [' − 5', RENK.eksi], 'x'], { size: 30, hiza: 'start' });
    const hesap = yazi(svg, 580, 326, ['hesap:  ', ['100', RENK.sifir], [' − 20', RENK.eksi], 'x'], { size: 30, hiza: 'start' });
    const kalip = yazi(svg, SAG, 430, [['başlangıç', RENK.sifir], ' ve ', ['her adımdaki değişim', RENK.eksi]], { size: 26 });
    gizle(modelAd, kural, tank, hesap, kalip);

    await par(soyle(c, 'Gölün derinliği 300 cm; su her gün 2 cm çekiliyor.', { speak: 'Gölün derinliği üç yüz santimetre; su her gün iki santimetre çekiliyor.' }), c.tween(3200, (e) => koy(lerp(0, 20, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'x gün sonraki derinlik hangi kuralla bulunur?',
      options: ['2x + 300', '300 − 2x', '300x − 2'], answer: 1,
      hints: ['Su çekiliyor: derinlik her gün 2 cm azalır, artmaz.', '', 'Başlangıç 300; günle çarpılan sayı günlük değişimdir.'],
      right: '300 cm’den her gün 2 cm eksilir.',
    });
    await par(soyle(c, 'Günü x ile göster: kural bu.'), belir(c, kural, 500));
    await par(soyle(c, 'Boşalan tank ve azalan hesap da aynı kalıptaydı.'), (async () => { await belir(c, tank, 400); await belir(c, hesap, 400); })());
    await par(soyle(c, 'Kalıp: bir başlangıç değeri ve her adımda aynı değişim.'), belir(c, kalip, 500));
    await par(soyle(c, 'Bir durumu böyle anlatan kurala <b>model</b> denir.'), belir(c, modelAd, 500));
    c.note('<b>Model:</b> bir durumu anlatan kural.<br>h(x) = 300 − 2x', 'Model', 'c10-model');
  }

  /* ---- 2. Modelin gücü ---- */
  async function gucu(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ), d = model(dz);
    const SAG = 800;
    const kural = yazi(svg, SAG, 110, 'h(x) = 300 − 2x', { size: 38, kalin: 700, renk: RENK.f });
    const iz40 = iz(dz, 40, 220, { renk: RENK.sifir }), p40 = nokta(dz, 40, 220), ad40 = etiket(dz, 40, 220, '(40, 220)', { dx: 14, dy: -12, hiza: 'start', renk: RENK.sifir });
    const cizgi = dogru(dz, 0, 200, { renk: RENK.g, kesik: true, kalin: 3 });
    const p50 = nokta(dz, 50, 200), d50 = dusey(dz, 50, 200), m50 = etiket(dz, 50, 0, '50', { dy: 36, renk: RENK.sifir });
    const s = serit(dz, 'x', 50, 50), u50 = nokta(dz, 50, 0, { bos: true });
    const ad = adimlar(svg, { x: 650, y: 200, aralik: 70, size: 34 });
    const a1 = ad.ekle('300 − 2x < 200'), a2 = ad.ekle('−2x < −100'), a3 = ad.ekle('x > 50'); a3.ifade.style.fill = RENK.sifir;
    gizle(d.el, kural, iz40.g, p40.el, ad40, cizgi.el, p50.el, d50, m50, s.el, u50.el);

    await par(soyle(c, 'Modelin grafiği: günler yatayda, derinlik dikeyde.'), (async () => { await belir(c, kural, 400); await ciz(c, d, 900); })());
    await c.choice({
      tag: 'Tahmin et', q: '40. günde derinlik kaç cm olur?',
      options: ['260 cm', '220 cm', '80 cm'], answer: 1,
      hints: ['40 günde 2 · 40 = 80 cm çekilir, 40 cm değil.', '', '80 cm çekilen miktar; kalan 300 − 80.'],
      right: '300 − 2 · 40 = 220.',
    });
    await par(soyle(c, 'Model, 40. günü beklemeden cevabı verdi.'), (async () => { await pop(c, p40, dz.X(40), dz.Y(220), 380); await belir(c, [iz40.g, ad40], 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Derinlik ne zaman 200 cm’nin altına iner?',
      options: ['50. günden önce', '50. günden sonra', '100. günden sonra'], answer: 1,
      hints: ['İlk günlerde göl daha derin: 10. günde 280 cm.', '', '100. günde derinlik 100 cm; 200’ün altına daha önce iner.'],
      right: '50. günde tam 200 cm; sonrasında daha az.',
    });
    await kaybol(c, [iz40.g, p40.el, ad40, kural], 300);
    await par(soyle(c, 'Bu bir eşitsizlik: derinlik 200’den küçük olsun.'), (async () => { await belir(c, cizgi.el, 400); await belir(c, a1.g, 450); })());
    await par(soyle(c, 'Çöz: negatife bölerken yön döner.', { ton: 'thoughtful' }), (async () => { await belir(c, a2.g, 450); await c.wait(500); await belir(c, a3.g, 450); })());
    await par(soyle(c, 'Grafikte de 50. günden sonra doğru, çizginin altında.'), (async () => {
      await pop(c, p50, dz.X(50), dz.Y(200), 350); await belir(c, [d50, m50], 300); s.el.style.opacity = 0.9;
      await c.tween(900, (e) => s.ayarla(50, lerp(50, 150, e)), ease.inOut); await pop(c, u50, dz.X(50), dz.Y(0), 300);
    })());
    await soyle(c, 'Model, ölçmeden önceden söyler: gücü budur.');
    c.note('<b>Modelin gücü:</b> ölçmeden önceden söyler.<br>h(40) = 220', 'Modelin gücü', 'c10-guc');
  }

  /* ---- 3. Modelin sınırı ---- */
  async function siniri(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ); model(dz);
    const uz = uzanti(dz), yg = yagmur(dz);
    const p200 = nokta(dz, 200, -100, { bos: true, renk: RENK.kotu }), ad200 = etiket(dz, 200, -100, '(200, −100)', { dx: -12, dy: 30, hiza: 'end', renk: RENK.kotu });
    const p150 = nokta(dz, 150, 0), m150 = etiket(dz, 150, 0, '150', { dy: 36, dx: -8, renk: RENK.sifir });
    const s = serit(dz, 'x', 0, 0), u0 = nokta(dz, 0, 0, { r: 7 });
    const gl = gol(svg, { x: 670, y: 110, w: 260, h: 170 });
    const deger = yazi(svg, 800, 350, 'h(0) = 300 cm', { size: 32, kalin: 700 });
    const aralik = yazi(svg, 800, 440, '0 ≤ x ≤ 150', { size: 38, kalin: 700, renk: RENK.sifir });
    const gez = nokta(dz, 0, 300, { r: 10 });
    const koy = (x) => {
      const y = h(x), ic = x <= 150;
      gl.ayarla(y); gez.git(x, y); gez.el.setAttribute('fill', ic ? RENK.sifir : RENK.tahta); gez.el.setAttribute('stroke', ic ? RENK.sifir : RENK.kotu); gez.el.setAttribute('stroke-width', ic ? 0 : 3.5);
      yaz(deger, 'h(' + sayi(x) + ') = ' + sayi(y) + ' cm'); deger.style.fill = ic ? RENK.yazi : RENK.kotu;
    };
    gizle(uz.el, yg.el, p200.el, ad200, p150.el, m150, s.el, u0.el, aralik, gez.el);

    await soyle(c, 'Şimdi modele uzak bir günü sor.');
    await c.choice({
      tag: 'Tahmin et', q: '200. günde model ne der?',
      options: ['0 cm', '−100 cm', '100 cm'], answer: 1,
      hints: ['Kuralı uygula: 300 − 2 · 200.', '', '100 cm, 100. gündeki derinliktir.'],
      right: '300 − 2 · 200 = −100.',
    });
    await par(soyle(c, 'Model −100 cm diyor; derinlik negatif olamaz.', { speak: 'Model eksi yüz santimetre diyor; derinlik negatif olamaz.' }), (async () => {
      await belir(c, uz.el, 500, 0.55); await pop(c, p200, dz.X(200), dz.Y(-100), 380); await belir(c, ad200, 350);
    })());
    await par(soyle(c, 'Göl 150. günde kurur: model orada biter.', { dur: true }), (async () => {
      await c.tween(1500, (e) => { const x = lerp(0, 150, e); gl.ayarla(h(x)); yaz(deger, 'h(' + Math.round(x) + ') = ' + sayi(Math.round(h(x))) + ' cm'); }, ease.inOut);
      await pop(c, p150, dz.X(150), dz.Y(0), 380); await belir(c, m150, 300);
    })());
    await par(soyle(c, 'Model yalnızca bu aralıkta anlamlı.'), (async () => {
      s.el.style.opacity = 0.9; await c.tween(900, (e) => s.ayarla(0, lerp(0, 150, e)), ease.inOut);
      await belir(c, u0.el, 250); await belir(c, aralik, 450);
    })());
    await par(soyle(c, 'Yağmur yağarsa “her gün 2 cm” de değişir.', { speak: 'Yağmur yağarsa “her gün iki santimetre” de değişir.', ton: 'thoughtful' }), belir(c, yg.el, 600));
    c.note('<b>Modelin sınırı:</b> yalnızca anlamlı olduğu aralıkta geçerli.<br>0 ≤ x ≤ 150', 'Modelin sınırı', 'c10-sinir');
    await c.wait(600);
    await kaybol(c, [yg.el, ad200, p200.el], 300);
    await soyle(c, 'Günü kaydır: model nerede anlamını yitiriyor?', { noWait: true });
    gez.el.style.opacity = 1;
    c.slider({ label: 'x (gün)', min: 0, max: 200, step: 10, value: 100, fmt: (x) => sayi(x), onInput: koy });
    await c.cont('Devam ›');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, Object.assign({}, DZ, { x0: 80, y0: 96, w: 380, h: 364 }));
    model(dz); uzanti(dz); serit(dz, 'x', 0, 150);
    const yg = yagmur(dz);
    const p10 = nokta(dz, 10, 280, { renk: RENK.iyi, r: 9 }), p200 = nokta(dz, 200, -100, { bos: true, renk: RENK.kotu, r: 9 });
    gizle(yg.el, p10.el, p200.el);
    const tb = soruTahtasi(c, svg, { x: 500, y: 150, w: 460, h: 150, size: 34 });
    const secenek = ['Güvenilir', 'Anlamsız: aralığın dışında', 'Kuşkulu: koşul değişti'];
    await soyle(c, 'Sıra sende: modelin hangi sözüne güvenirsin?', { noWait: true });
    await tb.sor('10. günde 280 cm', {
      q: 'Modelin bu sözüne güvenilir mi?', options: secenek, answer: 0,
      hints: ['', '10, 0 ile 150 arasında: aralığın içinde.', 'Koşullarda bir değişiklik söylenmedi.'],
      right: 'Gün aralığın içinde, koşullar aynı.', kanit: '10. gün aralığın içinde',
      onPick: (k, ok) => { if (ok) p10.el.style.opacity = 1; },
    });
    await tb.sor('200. günde −100 cm', {
      q: 'Modelin bu sözüne güvenilir mi?', options: secenek, answer: 1,
      hints: ['Derinlik negatif olamaz; 200. gün aralığın dışında.', '', 'Koşul aynı; sorun günün aralık dışında olması.'],
      right: 'Göl 150. günde kurur; model sonrasını söyleyemez.', kanit: '200 > 150: göl çoktan kurudu', renk: RENK.kotu,
      onPick: (k, ok) => { if (ok) p200.el.style.opacity = 1; },
    });
    await tb.sor('yağmurlu haftada da günde 2 cm', {
      q: 'Modelin bu sözüne güvenilir mi?', options: secenek, answer: 2,
      hints: ['Yağmur suyu artırır; “her gün 2 cm” tutmaz.', 'Gün aralığın içinde olabilir; değişen şey koşul.', ''],
      right: 'Yağmur, kuralın dayandığı koşulu bozar.', kanit: 'yağmur, kuralın koşulunu bozar', renk: RENK.sifir,
      onPick: (k, ok) => { if (ok) yg.el.style.opacity = 1; },
    });
    await soyle(c, 'Model, doğru olduğu aralıkta kullanılır.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c10', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'Modelin sınırı', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Modelin sınırı', hook: 'Bir gölde su her gün 2 cm çekiliyor. <b>Bu kuralın 100 gün sonrası için de geçerli olduğuna güvenir misin?</b>', button: 'Derse başla ›' },
    goals: ['Bir durumu anlatan kuralı model olarak tanır.', 'Modelle önceden tahmin yapar.', 'Modelin geçerli olduğu aralığı ve koşulları sorgular.'],
    scenes: [
      { title: 'Kuraldan modele', goal: 'Aynı kalıbı taşıyan kuralların model olduğunu gör.', run: kuraldanModele },
      { title: 'Modelin gücü', goal: 'Modelle ölçmeden önce tahmin yap.', run: gucu },
      { title: 'Modelin sınırı', goal: 'Modelin anlamlı olduğu aralığı bul.', run: siniri },
      { title: 'Sıra sende', goal: 'Modelin hangi sözüne güvenileceğine karar ver.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'h(x) = 300 − 2x modeli hangi x’ler için anlamlıdır?', options: ['Her gerçek sayı', '0 ≤ x ≤ 150', 'x ≥ 150'], answer: 1,
        why: ['Negatif gün olmaz; 150. günden sonra da derinlik negatif çıkar.', 'Gün 0’dan başlar, göl 150. günde kurur.', '150. günden sonra model negatif derinlik verir; anlamsızdır.'], scene: 2 },
      { q: 'Bu modelin zayıf yanı hangisidir?', options: ['Grafiği çizilemez.', 'Hiçbir günü doğru vermez.', 'Koşullar değişirse kural geçerliliğini yitirir.'], answer: 2,
        why: ['Grafiği bir doğrudur; çizilebilir.', 'Koşullar aynı kaldıkça aralığındaki günleri doğru verir.', 'Yağmur yağarsa “her gün 2 cm” artık doğru olmaz.'], scene: 2 },
    ],
    summary: [
      '<b>Model, doğru olduğu aralıkta kullanılır.</b>',
      'Model bir durumu anlatan kuraldır; ölçmeden önceden söyler.',
      'Aralığın dışında ya da koşullar değişince modelin sözüne güvenilmez.',
    ],
  });
})();
