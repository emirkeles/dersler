/* C9 — Çözümü başka yoldan sınamak
   Yerine koyma, grafik ve işaret tablosuyla sınama; hatayı bulup düzeltme.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, serit, etiket, isaretTablosu, soruTahtasi } = window.KIT;

  /* Yazılı çözümün durduğu kâğıt. */
  function kagit(p, x, y, w, h) {
    const g = S('g', {}, p);
    S('path', { d: `M${x + 14},${y} H${x + w - 40} l40,40 V${y + h - 14} q0,14 -14,14 H${x + 14} q-14,0 -14,-14 V${y + 14} q0,-14 14,-14 z`, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, g);
    S('path', { d: `M${x + w - 40},${y} v40 h40`, fill: 'none', stroke: RENK.kenar, 'stroke-width': 2 }, g);
    return g;
  }
  /* İki yanın değerini karşılaştıran kutular: sol yan mavi, sağ yan turuncu. koy(a, b) işareti kendisi seçer. */
  function kutular(p, cx, y) {
    const g = S('g', {}, p), W = 150, H = 104, ARA = 44;
    const kutu = (x, renk) => S('rect', { x, y, width: W, height: H, rx: 14, fill: RENK.kutu, stroke: renk, 'stroke-width': 3 }, g);
    kutu(cx - ARA - W, RENK.f); kutu(cx + ARA, RENK.g);
    const sol = yazi(g, cx - ARA - W / 2, y + H / 2 + 16, '', { size: 46, kalin: 700, renk: RENK.f });
    const sag = yazi(g, cx + ARA + W / 2, y + H / 2 + 16, '', { size: 46, kalin: 700, renk: RENK.g });
    const isaret = yazi(g, cx, y + H / 2 + 16, '', { size: 46, kalin: 700 });
    return { g, koy(a, b) { yaz(sol, sayi(a)); yaz(sag, sayi(b)); yaz(isaret, a === b ? '=' : '≠'); isaret.style.fill = a === b ? RENK.iyi : RENK.kotu; } };
  }
  /* Yazıyı söndürüp yenisiyle geri getirir. */
  async function donustur(c, t, metin, renk) {
    await kaybol(c, t, 220); yaz(t, metin); if (renk) t.style.fill = renk; await belir(c, t, 320);
  }
  const DENKLEM = [['3x − 5', RENK.f], ' = ', ['x + 7', RENK.g]];

  /* ---- 1. Yerine koy ---- */
  async function yerineKoy(c) {
    const svg = c.svg(1000, 562);
    const kg = kagit(svg, 50, 62, 430, 438), L = 100;
    const d0 = yazi(svg, L, 160, DENKLEM, { size: 40, kalin: 700, hiza: 'start' });
    const d1 = yazi(svg, L, 250, '3x − x = 7 − 5', { size: 34, hiza: 'start' });
    const d2 = yazi(svg, L, 330, '2x = 2', { size: 34, hiza: 'start' });
    const d3 = yazi(svg, L, 410, 'x = 1', { size: 34, hiza: 'start', kalin: 700 });
    const ok = S('g', {}, svg);
    S('path', { d: 'M236,400 Q470,400 596,318', fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': '2 9' }, ok);
    S('path', { d: 'M610,308 l-19,3 l9,13 z', fill: RENK.soluk }, ok);
    const kt = kutular(svg, 770, 200);
    gizle(d1, d2, d3, ok, kt.g);

    await par(soyle(c, 'Bir arkadaşın bu denklemi böyle çözmüş.'), (async () => { for (const d of [d1, d2, d3]) { await c.wait(350); await belir(c, d, 400); } })());
    kt.koy(-2, 8);
    await par(soyle(c, 'x yerine 1 koy: sol yan −2, sağ yan 8.'), (async () => { await belir(c, ok, 400); await belir(c, kt.g, 450); })());
    await soyle(c, 'İki yan eşit değil: çözümde bir hata var.', { dur: true });
    await c.choice({
      tag: 'Tahmin et', q: 'Hata hangi adımda?',
      options: ['2x = 2 adımında', '3x − x = 7 − 5 adımında', 'x = 1 adımında'], answer: 1,
      hints: ['7 − 5 gerçekten 2 eder; hata daha önce.', '', '2x = 2 ise x = 1 doğru; hata daha önce.'],
      right: '−5 karşıya +5 olarak geçmeliydi.',
    });
    d1.style.fill = RENK.kotu;
    await par(soyle(c, '−5 karşıya geçerken +5 olmalıydı.', { speak: 'Eksi beş karşıya geçerken artı beş olmalıydı.' }), (async () => { await kaybol(c, [kt.g, ok], 300); await c.wait(500); await donustur(c, d1, ['3x − x = 7 ', ['+ 5', RENK.iyi]], RENK.yazi); })());
    await par(soyle(c, 'Düzelt: 12’nin yarısı 6.'), (async () => { await donustur(c, d2, '2x = 12'); await donustur(c, d3, 'x = 6'); })());
    kt.koy(13, 13);
    await par(soyle(c, 'Yeniden yerine koy: iki yan da 13.'), (async () => { await belir(c, ok, 400); await belir(c, kt.g, 450); })());
    c.note('<b>Yerine koy:</b> iki yan eşit çıkmalı.<br>x = 6: 13 = 13', 'Yerine koy', 'c9-yerine-koy');
    void kg;
  }

  /* ---- 2. Grafikle sına ---- */
  async function grafikle(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 44, w: 468, h: 462, xmin: -1, xmax: 8, ymin: -6, ymax: 16, yadim: 2, xsayi: 2, ysayi: 4 });
    const f = dogru(dz, 3, -5), g = dogru(dz, 1, 7, { renk: RENK.g });
    const izler = iz(dz, 6, 13, { renk: RENK.sifir }), pk = nokta(dz, 6, 13, { r: 9 });
    const pkAd = etiket(dz, 6, 13, '(6, 13)', { dx: -14, dy: -16, hiza: 'end', renk: RENK.sifir });
    const fark = S('line', { stroke: RENK.kotu, 'stroke-width': 4, 'stroke-linecap': 'round' }, dz.orta);
    const pf = nokta(dz, 1, -2, { renk: RENK.f, r: 7 }), pg = nokta(dz, 1, 8, { renk: RENK.g, r: 7 });
    const xAd = etiket(dz, 1.25, -3.6, 'x = 1', { hiza: 'start', renk: RENK.kotu }), farkAd = etiket(dz, 1.25, 3.6, 'fark 10', { hiza: 'start', renk: RENK.kotu });
    const SAG = 780;
    yazi(svg, SAG, 130, DENKLEM, { size: 40, kalin: 700 });
    const kt = kutular(svg, SAG, 230);
    const koy = (x) => {
      const a = 3 * x - 5, b = x + 7;
      fark.setAttribute('x1', dz.X(x)); fark.setAttribute('x2', dz.X(x)); fark.setAttribute('y1', dz.Y(a)); fark.setAttribute('y2', dz.Y(b));
      pf.git(x, a); pg.git(x, b); kt.koy(a, b);
    };
    koy(1);
    gizle(f.el, g.el, izler.g, pk.el, pkAd, fark, pf.el, pg.el, xAd, farkAd, kt.g);

    await par(soyle(c, 'Aynı denklemi grafikle sına: her yan bir doğru.'), (async () => { await ciz(c, f, 800); await ciz(c, g, 800); })());
    await c.choice({
      tag: 'Tahmin et', q: 'x = 1 doğru çözüm olsaydı grafikte ne görürdün?',
      options: ['Doğrular hiç kesişmezdi', 'Doğrular x = 1’de kesişirdi', 'Doğrular üst üste gelirdi'], answer: 1,
      hints: ['Çözümde iki yan eşit olur: doğrular orada buluşur.', '', 'Üst üste gelselerdi her x çözüm olurdu.'],
      right: 'Çözümde iki yan eşittir: doğrular orada kesişir.',
    });
    await par(soyle(c, 'x = 1’de doğrular birbirinden 10 birim uzak.', { speak: 'x bir olduğunda doğrular birbirinden on birim uzak.' }), (async () => {
      await par(pop(c, pf, dz.X(1), dz.Y(-2), 300), pop(c, pg, dz.X(1), dz.Y(8), 300)); await belir(c, [fark, xAd, farkAd], 400);
    })());
    await par(soyle(c, 'Doğrular 6’da kesişiyor: iki yan da 13.', { dur: true }), (async () => { await pop(c, pk, dz.X(6), dz.Y(13), 380); await belir(c, [izler.g, pkAd], 400); })());
    await soyle(c, 'Grafik hem yanlışı hem doğruyu gösterir.');
    c.note('<b>Grafikle sına:</b> çözüm, doğruların kesiştiği x’tir.<br>(6, 13)', 'Grafikle sına', 'c9-grafik');
    await par(kaybol(c, [xAd, farkAd], 300), belir(c, kt.g, 400));
    await soyle(c, 'x’i kaydır: fark nerede sıfır oluyor?', { noWait: true });
    c.slider({ label: 'x', min: 0, max: 7, step: 1, value: 1, fmt: (x) => sayi(x), onInput: koy });
    await c.cont('Devam ›');
  }

  /* ---- 3. Eşitsizlikte ---- */
  async function esitsizlikte(c) {
    const svg = c.svg(1000, 562);
    kagit(svg, 50, 86, 400, 320); const L = 100;
    yazi(svg, L, 160, '−2x + 6 > 0', { size: 40, kalin: 700, hiza: 'start' });
    const e1 = yazi(svg, L, 250, '−2x > −6', { size: 34, hiza: 'start' });
    const e2 = yazi(svg, L, 330, 'x > 3', { size: 34, hiza: 'start', kalin: 700 });
    const gerekce = yazi(svg, L + 150, 330, '÷ (−2)', { size: 24, hiza: 'start', renk: RENK.soluk, kalin: 500 });
    const deneme = S('g', {}, svg);
    S('rect', { x: 620, y: 190, width: 260, height: 110, rx: 14, fill: RENK.kutu, stroke: RENK.kotu, 'stroke-width': 3 }, deneme);
    yazi(deneme, 750, 262, '−2 > 0', { size: 46, kalin: 700, renk: RENK.kotu });
    // grafik: azalan doğru, kökün solunda pozitif
    const dz = duzlem(svg, { x0: 560, y0: 56, w: 360, h: 224, xmin: -1, xmax: 7, ymin: -6, ymax: 8, yadim: 2, sayilar: false, xad: '', yad: '' });
    dogru(dz, -2, 6, { renk: RENK.eksi, x1: 3 }); dogru(dz, -2, 6, { renk: RENK.arti, x2: 3, kalin: 6 });
    serit(dz, 'x', -1, 3); nokta(dz, 3, 0, { bos: true }); etiket(dz, 3, 0, '3', { dx: -18, dy: 26, renk: RENK.sifir });
    const tb = isaretTablosu(svg, { x: 540, y: 340, w: 400, ad: '−2x + 6', kok: '3', sol: '+', sag: '−', basGen: 130 });
    gizle(e1, e2, gerekce, deneme, dz.g, tb.g);

    await par(soyle(c, 'Bu eşitsizliğin yazılı çözümü: 3’ten büyük sayılar.'), (async () => { for (const d of [e1, e2]) { await c.wait(350); await belir(c, d, 400); } })());
    await c.choice({
      tag: 'Tahmin et', q: 'x = 4 çözümde sayılıyor. Eşitsizliği sağlar mı?',
      options: ['Sağlar', 'Sağlamaz'], answer: 1,
      hints: ['−2 · 4 + 6 = −2 eder; −2 &gt; 0 yanlıştır.', ''],
      right: '−2 · 4 + 6 = −2 eder; −2 &gt; 0 yanlış.',
    });
    await par(soyle(c, '4 çözümde sayılıyordu ama eşitsizliği sağlamıyor.', { speak: 'Dört sayısı çözümde sayılıyordu ama eşitsizliği sağlamıyor.' }), belir(c, deneme, 450));
    e2.style.fill = RENK.kotu;
    await par(soyle(c, 'Hata son adımda: negatif sayıya bölünce yön döner.', { ton: 'thoughtful' }), (async () => { await belir(c, gerekce, 400); await c.wait(600); await donustur(c, e2, 'x < 3', RENK.iyi); })());
    await kaybol(c, deneme, 300);
    await par(soyle(c, 'Grafik de aynısını söyler: azalan doğru, 3’ün solunda pozitif.'), belir(c, dz.g, 500));
    await par(soyle(c, 'İşaret tablosunda da artı, sıfırın solunda.'), belir(c, tb.g, 500));
    await soyle(c, 'Tek sayı hatayı yakalar; aralığın tamamını grafik ve tablo doğrular.');
    c.note('Negatife bölünce yön döner.<br>−2x &gt; −6 → x &lt; 3', 'Eşitsizlikte sına', 'c9-esitsizlik');
  }

  /* ---- 4. Hangi yol? ---- */
  async function hangiYol(c) {
    const svg = c.svg(1000, 562);
    const adlar = ['yerine koy', 'grafik ya da tablo', 'cebir'];
    const kart = adlar.map((ad, k) => {
      const g = S('g', {}, svg), x = 80 + k * 290;
      const r = S('rect', { x, y: 52, width: 260, height: 74, rx: 14, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, g);
      const t = yazi(g, x + 130, 98, ad, { size: 26, renk: RENK.soluk });
      return { yak() { r.setAttribute('stroke', RENK.iyi); r.setAttribute('stroke-width', 3.5); t.style.fill = RENK.yazi; } };
    });
    const tb = soruTahtasi(c, svg, { x: 110, y: 190, w: 780, h: 160, size: 38 });
    const secenek = ['Yerine koymak', 'Grafik ya da işaret tablosu', 'Cebirle çözmek'];
    await soyle(c, 'Her iş için en uygun yolu seç.', { noWait: true });
    await tb.sor('Tek bir sayıyı denetleyeceğim.', {
      q: 'En kısa yol hangisi?', options: secenek, answer: 0,
      hints: ['', 'Tek sayı için grafik uzun yol; sayıyı doğrudan dene.', 'Yeniden çözmek gerekmez; sayıyı doğrudan dene.'],
      right: 'Sayıyı yerine koy; iki yan eşit mi, bak.', kanit: 'yerine koy: iki yan eşit mi?',
      onPick: (k, ok) => { if (ok) kart[0].yak(); },
    });
    await tb.sor('Bir aralığı denetleyeceğim.', {
      q: 'En uygun yol hangisi?', options: secenek, answer: 1,
      hints: ['Tek tek denemekle aralığın tamamı görülmez.', '', 'Cebir yeni bir çözüm verir; aralığı görmek için grafiğe bak.'],
      right: 'Aralığın tamamı grafikte ve tabloda bir bakışta görünür.', kanit: 'grafik ve tablo aralığın tamamını gösterir',
      onPick: (k, ok) => { if (ok) kart[1].yak(); },
    });
    await tb.sor('Kesin değeri bulacağım.', {
      q: 'En uygun yol hangisi?', options: secenek, answer: 2,
      hints: ['Yerine koymak için önce bir sayı gerekir.', 'Grafik yalnızca yaklaşık yeri gösterir.', ''],
      right: 'Grafik yaklaşık yeri, cebir kesin değeri verir.', kanit: 'cebir kesin değeri verir',
      onPick: (k, ok) => { if (ok) kart[2].yak(); },
    });
    await soyle(c, 'İki yol aynı sonucu verirse güven artar; farklıysa biri hatalıdır.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c9', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'Çözümü başka yoldan sınamak', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Çözümü başka yoldan sınamak', hook: 'Bir kasiyer aynı hesabı iki farklı yoldan yapıp aynı sonucu buluyor. <b>Bundan ne anlar?</b>', button: 'Derse başla ›' },
    goals: ['Bulduğu çözümü yerine koyarak sınar.', 'Çözümü grafikle ya da işaret tablosuyla denetler.', 'Hatalı adımı bulup düzeltir.'],
    scenes: [
      { title: 'Yerine koy', goal: 'Çözümü denklemde dene, hatalı adımı bul.', run: yerineKoy },
      { title: 'Grafikle sına', goal: 'Çözümü doğruların kesişiminden denetle.', run: grafikle },
      { title: 'Eşitsizlikte', goal: 'Bir sayı dene, aralığı grafik ve tabloyla doğrula.', run: esitsizlikte },
      { title: 'Hangi yol?', goal: 'İşe uygun sınama yolunu seç.', run: hangiYol },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '2x + 3 = 11 için x = 5 bulundu. Yerine koyunca ne görülür?', options: ['Çözüm doğru', '2 · 5 + 3 = 13: çözüm yanlış', 'Karar verilemez'], answer: 1,
        why: ['2 · 5 + 3 = 13 eder, 11 etmez.', 'Sol yan 13, sağ yan 11: eşit değil. Doğrusu x = 4.', 'Yerine koymak kesin sonuç verir: iki yan ya eşittir ya değildir.'], scene: 0 },
      { q: '−x + 2 &lt; 0 için “x &lt; 2” bulundu. Hangi deneme hatayı gösterir?', options: ['x = 2: 0 &lt; 0 yanlış', 'Hiçbir deneme hatayı göstermez', 'x = 0: çözümde sayılıyor ama 2 &lt; 0 yanlış'], answer: 2,
        why: ['2 zaten “x &lt; 2” içinde değil; bu deneme hatayı göstermez.', 'Çözümde sayılan ama eşitsizliği sağlamayan tek sayı hatayı gösterir.', '0, “x &lt; 2” içinde ama eşitsizliği sağlamıyor. Doğrusu x &gt; 2.'], scene: 2 },
      { q: '2x − 1 = x + 3 denkleminin çözümü x = 4 bulundu. Bunu grafikle sınamak için ne yapılır?', options: ['Doğruların x = 4’te x eksenini kestiğine bakılır', 'Doğruların y eksenini 4’te kestiğine bakılır', 'Doğruların x = 4’te aynı yüksekliğe geldiğine bakılır'], answer: 2,
        why: ['Eksenle kesişim sıfırı verir; çözüm iki doğrunun kesişimidir.', 'y eksenindeki kesişim x = 0’daki değeri verir; sınanan x = 4.', 'f(4) = g(4) = 7: iki doğru x = 4’te kesişiyor.'], scene: 1 },
      { q: '5 − 3x &gt; −4 için “x &gt; −3” bulundu. Biri yalnızca x = 0 deneyip eşitsizliğin sağlandığını görünce çözümü doğru sayıyor. Hangisi doğrudur?', options: ['Yeterli: bir sayı sağladığına göre çözüm doğrudur', 'Yeterli değil: x = 5 bu çözümde ama eşitsizliği sağlamıyor', 'Yeterli değil: x = 0 bu çözümde değil'], answer: 1,
        why: ['Bir sayı tek başına aralığın tamamını doğrulamaz.', 'x = 5: 5 − 15 = −10 ve −10 &gt; −4 yanlış. Doğru çözüm x &lt; 3.', 'x = 0, x &gt; −3 içindedir ve eşitsizliği sağlar.'], scene: 2 },
    ],
    summary: [
      '<b>Bir yoldan bulduğunu başka bir yoldan sına.</b>',
      'Tek sayı için yerine koy; aralık için grafiğe ya da işaret tablosuna bak.',
      'İki yol farklı sonuç veriyorsa biri hatalıdır: adımları yeniden gözden geçir.',
    ],
    nextLesson: { href: 'c10-modelin-siniri.html', label: 'Sonraki: Modelin sınırı ›' },
  });
})();
