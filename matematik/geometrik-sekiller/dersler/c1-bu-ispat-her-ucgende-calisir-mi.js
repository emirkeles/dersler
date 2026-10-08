/* C1 — Bu ispat her üçgende çalışır mı?
   Bir ispat ya da doğrulama, başka türde bir üçgene uyarlanıp adımları tek tek kontrol edilerek değerlendirilir.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/C-dogrulamayi-sinamak-ve-kullanmak.md */
(() => {
  'use strict';
  const { RENK, ara, yazi, gizle, belir, par, isaret, paralelDuzen, aciTasi, soruKarti } = window.KIT;
  const { ease } = Ders;

  /* Üçgen ve AC kenarının ortası çevresinde 180° dönen eşi. İkisi birlikte bir dörtgen eder. */
  function ikiz(c, svg, A, B, C) {
    const nokta = (k) => k.map((q) => q.join(',')).join(' '), M = ara(A, C, 0.5);
    const cizim = (renk, dolgu) => c.S('polygon', { points: nokta([A, B, C]), fill: dolgu, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, svg);
    const es = cizim(RENK.dis, 'rgba(255,209,102,.10)'), asil = cizim(RENK.cizgi, 'rgba(110,168,255,.10)');
    gizle(es);
    return {
      asil, es, D: [A[0] + C[0] - B[0], A[1] + C[1] - B[1]],
      cevir: async () => { es.style.opacity = 1; await c.tween(1500, (e) => es.setAttribute('transform', `rotate(${180 * e} ${M[0]} ${M[1]})`), ease.inOut); },
    };
  }
  /* Köşeye dik açı işareti (küçük kare); P köşe, u ve v kenar yönleri (birim vektör). */
  const dikIsaret = (c, p, P, u, v, s = 20) => c.S('path', {
    d: `M${P[0] + u[0] * s},${P[1] + u[1] * s} l${v[0] * s},${v[1] * s} l${-u[0] * s},${-u[1] * s}`, fill: 'none', stroke: RENK.iyi, 'stroke-width': 3,
  }, p);
  /* Sağdaki adım listesi: yazı + sonradan konan onay / çarpı. */
  function adimListesi(c, svg, x, y, metinler, o = {}) {
    const aralik = o.aralik || 84, size = o.size || 28, ix = o.ix || 950;
    return metinler.map((m, i) => {
      const g = c.S('g', {}, svg), t = yazi(c, g, x, y + i * aralik, m, { hiza: 'start', size, kalin: 700 });
      return { g, t, isaretle: (tur) => { if (tur === 'no') t.style.fill = RENK.kotu; const k = isaret(c, g, ix, y + i * aralik - size * 0.32, tur, 16); gizle(k); return belir(c, k, 350); } };
    });
  }
  const ADIMLAR = ['iki eş üçgen: dikdörtgen', '4 · 90° = 360°', '360° ÷ 2 = 180°'];

  /* ---- 1. Bir ispat denemesi ---- */
  async function deneme(c) {
    const svg = c.svg(1000, 562);
    const A = [200, 200], B = [200, 430], C = [500, 430];
    const s = ikiz(c, svg, A, B, C), D = s.D;
    const kareler = c.S('g', {}, svg);
    dikIsaret(c, kareler, B, [1, 0], [0, -1]); dikIsaret(c, kareler, A, [1, 0], [0, 1]); dikIsaret(c, kareler, D, [-1, 0], [0, 1]); dikIsaret(c, kareler, C, [-1, 0], [0, -1]);
    const adim = adimListesi(c, svg, 590, 240, ADIMLAR, { ix: 960 });
    gizle(kareler, adim.map((a) => a.g));
    await par(c.say('Arkadaşın bir dik üçgen çizdi ve eşini yanına koydu.'), s.cevir());
    await par(c.say('İki eş üçgen bir dikdörtgen etti: dört dik açı.'), (async () => { await belir(c, kareler, 400); await belir(c, adim[0].g, 400); })());
    await par(c.say('Dört dik açı 360°; iki üçgene bölünce her birine 180°.', { speak: 'Dört dik açı üç yüz altmış derece; iki üçgene bölünce her birine [short pause] yüz seksen derece.' }),
      (async () => { await belir(c, adim[1].g, 400); await c.wait(700); await belir(c, adim[2].g, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu, bütün üçgenler için bir ispat mı?',
      options: ['Evet, sonuç doğru çıktı', 'Hayır, yalnızca dik üçgen çizildi'], answer: 1,
      hints: ['Sonuç doğru; peki adımlar her üçgende geçerli mi? Dikdörtgene bak.', ''],
      right: 'Sonucun doğru çıkması yetmez; adımlara bakmak gerek.',
    });
    await c.say('Sınamanın yolu: adımları başka türde bir üçgene uyarlamak.');
  }

  /* ---- 2. Uyarla: başka üçgen ---- */
  async function uyarla(c) {
    const svg = c.svg(1000, 562);
    const A = [240, 210], B = [110, 430], C = [410, 430];
    const s = ikiz(c, svg, A, B, C);
    const adim = adimListesi(c, svg, 590, 240, ADIMLAR, { ix: 960 });
    await par(c.say('Aynı adımları dik olmayan bir üçgene uyguluyoruz.'), s.cevir());
    await c.choice({
      tag: 'Kontrol et', q: 'İki eş üçgen birleşti. Oluşan şekil dikdörtgen mi?',
      options: ['Evet, dikdörtgen', 'Hayır, köşeleri dik değil'], answer: 1,
      hints: ['Köşelere bak: biri dar, biri geniş.', ''],
      right: 'Bu bir paralelkenar; açıları 90° değil.',
    });
    await par(c.say('İlk adım tutmadı: şekil dikdörtgen değil.'), adim[0].isaretle('no'));
    await par(c.say('“Dört açı 90°” adımının da dayanağı kalmadı.', { speak: 'Dört açı doksan derece adımının da dayanağı kalmadı.' }), adim[1].isaretle('no'));
    await c.say('Sonuç yanlış değil; ama bu yol yalnızca dik üçgende işliyor.', { speak: '[thoughtful] Sonuç yanlış değil; ama bu yol yalnızca dik üçgende işliyor.' });
  }

  /* ---- 3. İç açılar ispatını uyarla ---- */
  async function ispatiUyarla(c) {
    const svg = c.svg(1000, 562);
    const A = [300, 250], B = [110, 440], C = [600, 440];
    const s = paralelDuzen(c, svg, A, B, C, { x1: 650, r: 48 });
    yazi(c, svg, 350, 80, 'geniş açılı üçgen', { size: 24, kalin: 600, renk: RENK.soluk });
    const adim = adimListesi(c, svg, 700, 230, ['tek paralel', 'iç ters açılar', 'doğru açı: 180°'], { size: 26, ix: 950 });
    gizle(s.dg, s.bK.el, s.gK.el, s.bAd, s.gAd, adim.map((a) => a.g));
    const sor = (q, ipucu, dogru) => c.choice({ tag: 'Kontrol et', q, options: ['Geçerli', 'Geçerli değil'], answer: 0, hints: ['', ipucu], right: dogru });
    await c.say('İç açılar ispatını geniş açılı bir üçgene uyarlayalım.');
    await par(c.say('Birinci adım: A’dan BC’ye paralel doğru.', { speak: 'Birinci adım: A noktasından BC kenarına paralel doğru.' }), (async () => { await belir(c, s.dg, 450); await belir(c, adim[0].g, 350); })());
    await sor('A’dan BC’ye tek paralel çizilir. Bu üçgende de geçerli mi?', 'Bir nokta ve bir doğru var; üçgenin biçimi bunu değiştirmez.', 'Tek paralel, üçgenin türüne bakmaz.');
    await adim[0].isaretle('ok');
    await par(c.say('İkinci adım: B ve C’deki açıların eşleri A’ya taşınır.', { speak: 'İkinci adım: B ve C köşelerindeki açıların eşleri A köşesine taşınır.' }), (async () => {
      await belir(c, adim[1].g, 350);
      s.bK.el.style.opacity = 1; await aciTasi(c, s.bK, B, A, C, A, 48); await belir(c, s.bAd, 250);
      s.gK.el.style.opacity = 1; await aciTasi(c, s.gK, C, A, B, A, 48); await belir(c, s.gAd, 250);
    })());
    await sor('Paralel doğrularda iç ters açılar eşittir. Burada da geçerli mi?', 'd hâlâ BC’ye paralel; AB ve AC hâlâ kesen.', 'Paralel ve kesen var: iç ters açılar eşit.');
    await adim[1].isaretle('ok');
    await par(c.say('Üçüncü adım: A’daki üç açı yan yana.', { speak: 'Üçüncü adım: A köşesindeki üç açı yan yana.' }), belir(c, adim[2].g, 350));
    await sor('A’daki üç açı bir doğru açıyı doldurur. Burada da geçerli mi?', 'Üç açı d doğrusunun altını boydan boya kaplıyor.', 'd bir doğru: üç açı 180° eder.');
    await adim[2].isaretle('ok');
    await c.say('Üç adım da tuttu: adımlar üçgenin türünü hiç kullanmıyor.');
  }

  /* ---- 4. Değerlendir ---- */
  async function degerlendir(c) {
    const svg = c.svg(1000, 562);
    const goster = soruKarti(c, svg);
    await c.say('Sıra sende: üç çalışmayı değerlendir.', { noWait: true });
    await goster(['“Eşkenar üçgende her açı 60°.', '3 · 60° = 180°.', 'Öyleyse her üçgende 180°.”']);
    await c.choice({
      tag: 'Soru 1 / 3', q: 'Bu akıl yürütme hangi üçgenler için geçerli?',
      options: ['Bütün üçgenler', 'Yalnızca eşkenar üçgenler'], answer: 1,
      hints: ['Her açının 60° olması yalnızca eşkenar üçgenin özelliği.', ''],
      right: 'Özel bir üçgenin özelliğine dayanan adım, genellemeyi taşımaz.',
    });
    await goster(['“En uzun kenar önermesini', 'dar, dik ve geniş açılı üçgende', 'ölçtüm; üçünde de tuttu.”']);
    await c.choice({
      tag: 'Soru 2 / 3', q: 'Bu çalışma nedir?',
      options: ['Bir ispat', 'Uygun bir doğrulama'], answer: 1,
      hints: ['Ölçmek yalnızca denenen üçgenleri kapsar.', ''],
      right: 'Farklı türlerde yapılmış iyi bir doğrulama; ispat değil.',
    });
    await goster(['“Üçgen eşitsizliğini', 'doğrulamak istiyorum.”']);
    await c.choice({
      tag: 'Soru 3 / 3', q: 'Hangi deneme daha uygun?',
      options: ['Tek bir eşkenar üçgen çizmek', 'Üçgen kuran ve kurmayan çubuk üçlüleri denemek'], answer: 1,
      hints: ['Tek üçgen, üçgen kurmayan üçlüleri hiç göstermez.', ''],
      right: 'Koşulu tutan ve tutmayan durumlar birlikte sınanır.',
    });
    c.note('<b>Değerlendir:</b> adımları başka türde bir üçgende tek tek kontrol et.', 'İspatı sınamak', 'gs-degerlendir');
    await c.say('İspat, çizdiğin üçgene değil her üçgene uymalı.');
  }

  Ders.start({
    id: 'geometrik-sekiller-c1', kicker: 'Konu C · Doğrulamayı sınamak ve kullanmak', title: 'Bu ispat her üçgende çalışır mı?', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Bu ispat her üçgende çalışır mı?',
      hook: 'Arkadaşın iç açılar toplamını yalnızca <b>dik üçgen</b> çizerek “ispatladı”. Bu ispat her üçgen için geçerli mi?',
      button: 'Derse başla ›',
    },
    goals: ['Bir ispatı başka türde bir üçgene uyarlar.', 'Adımları tek tek kontrol ederek ispatı ya da doğrulamayı değerlendirir.'],
    scenes: [
      { title: 'Bir ispat denemesi', goal: 'Dik üçgenle yapılan denemeyi izle.', run: deneme },
      { title: 'Uyarla: başka üçgen', goal: 'Aynı adımların dik olmayan üçgende çöktüğünü gör.', run: uyarla },
      { title: 'İç açılar ispatını uyarla', goal: 'Paralel doğru ispatının geniş açılı üçgende de tuttuğunu gör.', run: ispatiUyarla },
      { title: 'Değerlendir', goal: 'Üç çalışmanın neyi gösterdiğine karar ver.', run: degerlendir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir “ispat”, üçgenin iki kenarının eşit olduğunu kullanıyor. Hangi üçgenler için geçerlidir?',
        options: ['Bütün üçgenler', 'Yalnızca iki kenarı eşit olan üçgenler', 'Hiçbir üçgen'], answer: 1,
        why: ['Kenarları farklı bir üçgende o adım kullanılamaz.', 'İspat, kullandığı özelliği taşıyan üçgenleri kapsar.', 'İki kenarı eşit üçgenlerde adımlar geçerli olabilir.'],
        scene: 1,
      },
      {
        q: 'Bir ispatın her üçgende geçerli olup olmadığı nasıl sınanır?',
        options: ['Sonucun doğru çıkıp çıkmadığına bakılır.', 'Adımlar başka türde bir üçgende tek tek kontrol edilir.', 'Aynı üçgen daha büyük çizilir.'], answer: 1,
        why: ['Sonuç doğru olsa da adımlar yalnızca özel bir üçgende işliyor olabilir.', 'Her adım yeni üçgende de tutuyorsa ispat o üçgene uyar.', 'Boy değişir, açılar ve tür aynı kalır; yeni bir durum sınanmaz.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>İspat, çizdiğin üçgene değil her üçgene uymalı.</b>',
      'Bir ispatı <b>uyarlamak</b>: aynı adımları başka türde bir üçgende denemek.',
      'Özel bir üçgenin özelliğine dayanan adım, yalnızca o tür için geçerlidir.',
    ],
    nextLesson: { href: 'c2-onermeyi-yeni-sekle-uyarla.html', label: 'Sonraki: Önermeyi yeni şekle uyarla ›' },
  });
})();
