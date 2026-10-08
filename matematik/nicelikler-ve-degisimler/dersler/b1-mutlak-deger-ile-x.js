/* B1 — |x| ile f(x) = x
   n(x) = |x| grafiği, f(x) = x'in eksen altındaki yarısının yukarı katlanmasıyla oluşur; iki fonksiyonun benzer ve farklı yanları.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, katla, nokta, serit, etiket, tablo } = window.KIT;
  const { lerp, ease } = Ders;
  const XS = [-3, -2, -1, 0, 1, 2, 3];
  const DZ = { x0: 70, y0: 50, w: 460, h: 460, xmin: -4, xmax: 4, ymin: -4, ymax: 4 };

  /* ---- 1. Uzaklık ---- */
  async function uzaklik(c) {
    const svg = c.svg(1000, 562);
    const CX = 500, B = 95, Y0 = 170, X = (v) => CX + v * B;
    S('line', { x1: X(-4.3), y1: Y0, x2: X(4.3), y2: Y0, stroke: RENK.eksen, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    for (let v = -4; v <= 4; v++) S('line', { x1: X(v), y1: Y0 - 8, x2: X(v), y2: Y0 + 8, stroke: RENK.eksen, 'stroke-width': 2.5 }, svg);
    [-3, 0, 3].forEach((v) => yazi(svg, X(v), Y0 + 38, sayi(v), { size: 22, renk: RENK.soluk, kalin: 500 }));
    const cubuk = (v) => S('line', { x1: X(0), y1: Y0, x2: X(v), y2: Y0, stroke: RENK.mutlak, 'stroke-width': 8, 'stroke-linecap': 'round' }, svg);
    const solC = cubuk(-3), sagC = cubuk(3), gezC = cubuk(0);
    // ev
    const ev = S('g', {}, svg);
    S('path', { d: `M${CX - 20},${Y0 - 5} v-22 l20,-18 l20,18 v22 z`, fill: RENK.kutu, stroke: RENK.yazi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ev);
    S('rect', { x: CX - 6, y: Y0 - 21, width: 12, height: 16, fill: RENK.yazi }, ev);
    const yer = (v) => S('circle', { cx: X(v), cy: Y0, r: 10, fill: RENK.sifir }, svg);
    const bati = yer(-3), dogu = yer(3), gez = yer(-3);
    const batiAd = yazi(svg, X(-3), Y0 - 26, 'batı', { size: 22, renk: RENK.soluk });
    const doguAd = yazi(svg, X(3), Y0 - 26, 'doğu', { size: 22, renk: RENK.soluk });
    const solU = yazi(svg, X(-1.5), Y0 - 22, '3 km', { size: 24, renk: RENK.mutlak });
    const sagU = yazi(svg, X(1.5), Y0 - 22, '3 km', { size: 24, renk: RENK.mutlak });
    const kuralT = yazi(svg, 500, 288, 'n(x) = |x|', { size: 46, kalin: 700, renk: RENK.mutlak });
    const tb = tablo(svg, { x: 205, y: 336, basliklar: ['x', '|x|'], n: 7, hucre: 70, yuk: 58, basGen: 100, size: 26, renkler: [RENK.soluk, RENK.mutlak] });
    gizle(ev, bati, dogu, gez, batiAd, doguAd, solC, sagC, gezC, solU, sagU, kuralT, tb.g);

    await par(soyle(c, 'Ev sıfırda; bir yer 3 km doğuda, öbürü 3 km batıda.'), (async () => {
      await pop(c, ev, CX, Y0 - 20, 400);
      await par(pop(c, dogu, X(3), Y0, 350), belir(c, doguAd, 300));
      await par(pop(c, bati, X(-3), Y0, 350), belir(c, batiAd, 300));
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Batıdaki yerin eve uzaklığı kaç km?',
      options: ['−3 km', '3 km', '0 km'], answer: 1,
      hints: ['Uzaklık negatif olmaz; yön değişir, yol aynı kalır.', '', '0 km yalnızca evin kendisi için.'],
      right: 'İki yer de eve 3 km uzakta.',
    });
    await par(soyle(c, 'Yön farklı, eve uzaklık aynı.'), (async () => {
      await par(ciz(c, sagC, 600), ciz(c, solC, 600));
      await belir(c, [solU, sagU], 300);
    })());
    yaz(solU, '|−3| = 3'); yaz(sagU, '|3| = 3');
    await soyle(c, 'Bir sayının sıfıra uzaklığı onun <b>mutlak değeri</b>dir.');
    await par(soyle(c, 'Her girdiye sıfıra uzaklığını veren fonksiyonun kuralı bu.'), belir(c, kuralT, 500));
    await kaybol(c, [solU, sagU, batiAd, doguAd, solC, sagC, bati, dogu], 300);
    await belir(c, tb.g, 400);
    gez.style.opacity = 1; gezC.style.opacity = 1;
    let onceki = -3;
    await par(soyle(c, 'Tabloda her girdinin altına sıfıra uzaklığı yazılır.'), (async () => {
      for (let k = 0; k < XS.length; k++) {
        const v = XS[k], v0 = onceki;
        await c.tween(280, (e) => { const x = lerp(v0, v, e); gez.setAttribute('cx', X(x)); gezC.setAttribute('x2', X(x)); }, ease.inOut);
        onceki = v;
        tb.yaz(0, k, sayi(v)); tb.yaz(1, k, sayi(Math.abs(v)), RENK.mutlak);
        await c.wait(260);
      }
    })());
    await c.tween(400, (e) => { const x = lerp(3, 0, e); gez.setAttribute('cx', X(x)); gezC.setAttribute('x2', X(x)); }, ease.inOut);
    tb.h[0][3].style.fill = RENK.sifir; tb.h[1][3].style.fill = RENK.sifir;
    await soyle(c, 'Sıfırın çıktısı sıfır: mutlak değer her zaman pozitif değildir.', { ton: 'thoughtful' });
    c.note('<b>Mutlak değer fonksiyonu:</b> n(x) = |x|<br>|−3| = 3', 'n(x) = |x|', 'b1-mutlak');
  }

  /* ---- 2. Katla ---- */
  async function katlaSahne(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const tb = tablo(svg, { x: 596, y: 70, basliklar: ['x', '|x|'], n: 7, hucre: 44, yuk: 50, basGen: 64, size: 22, renkler: [RENK.soluk, RENK.mutlak] });
    XS.forEach((v, k) => { tb.yaz(0, k, sayi(v)); tb.yaz(1, k, sayi(Math.abs(v)), RENK.mutlak); });
    const f = dogru(dz, 1, 0, { renk: RENK.f, kalin: 8 }); gizle(f.el);
    const noktalar = XS.map((v) => nokta(dz, v, Math.abs(v), { renk: RENK.mutlak, r: 8 }));
    gizle(noktalar.map((n) => n.el));
    // tablo kalkınca sağ sütun: f → katla → n
    const fEt = yazi(svg, 765, 180, 'f(x) = x', { size: 44, kalin: 700, renk: RENK.f });
    const ok = S('g', {}, svg);
    S('line', { x1: 765, y1: 212, x2: 765, y2: 296, stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round' }, ok);
    S('path', { d: 'M765,310 l-9,-16 h18 z', fill: RENK.soluk }, ok);
    yazi(ok, 785, 262, 'alt yarıyı katla', { size: 22, renk: RENK.soluk, kalin: 500, hiza: 'start' });
    const nEt = yazi(svg, 765, 368, 'n(x) = |x|', { size: 44, kalin: 700, renk: RENK.mutlak });
    gizle(fEt, ok, nEt);
    const koy = async (k) => {
      tb.h[0][k].style.fill = RENK.sifir;
      await pop(c, noktalar[k], dz.X(XS[k]), dz.Y(Math.abs(XS[k])), 320);
      tb.h[0][k].style.fill = RENK.yazi;
      await c.wait(120);
    };

    await par(soyle(c, 'Önce x ≥ 0 olan çiftler: düzlemde dört nokta.'), (async () => { for (const k of [3, 4, 5, 6]) await koy(k); })());
    await par(soyle(c, 'Bu dört nokta f(x) = x doğrusunun üzerinde.'), ciz(c, f, 800));
    await c.choice({
      tag: 'Tahmin et', q: 'x &lt; 0 için |x|’in noktaları nereye düşer?',
      options: ['Mavi doğrunun üzerine', 'x ekseninin üstüne', 'x ekseninin üzerine'], answer: 1,
      hints: ['Doğru orada eksenin altında; |x| ise negatif olmaz.', '', 'Eksenin üzerinde çıktı 0’dır; |−3| ise 3 eder.'],
      right: '|−3| = 3: nokta eksenin 3 birim üstünde.',
    });
    await par(soyle(c, 'Negatif girdilerin çıktısı pozitif: noktalar eksenin üstünde.', { dur: true }), (async () => { for (const k of [2, 1, 0]) await koy(k); })());
    await kaybol(c, tb.g, 300);
    await belir(c, fEt, 300);
    await par(soyle(c, 'Doğrunun eksen altındaki yarısını yukarı katla.'), belir(c, ok, 400), katla(c, dz, 1, 0, { renk: RENK.mutlak, ms: 1600 }));
    await par(soyle(c, 'Sağ yarı yerinde kaldı; ortaya bir V çıktı.'), belir(c, nEt, 400));
    await kaybol(c, noktalar.map((n) => n.el), 300);
    c.note('<b>|x| grafiği:</b> f(x) = x’in eksen altındaki yarısı yukarı katlanır.', '|x| grafiği', 'b1-katla');
  }

  /* iki grafik birlikte: kalın mavi f, üstünde turkuaz V */
  function ikiGrafik(svg) {
    const dz = duzlem(svg, DZ);
    dogru(dz, 1, 0, { renk: RENK.f, kalin: 8 });
    kirik(dz, mutlakNoktalar(dz, 1, 0), { renk: RENK.mutlak });
    etiket(dz, -2.5, -3.3, 'f(x) = x', { renk: RENK.f, hiza: 'start' });
    etiket(dz, -2.5, 3.2, 'n(x) = |x|', { renk: RENK.mutlak, hiza: 'start' });
    return dz;
  }

  /* ---- 3. Aynı ve farklı ---- */
  async function ayniFarkli(c) {
    const svg = c.svg(1000, 562);
    const dz = ikiGrafik(svg);
    const tanimS = serit(dz, 'x', 0, 0, { renk: RENK.sifir, op: 0.75 });
    const fS = serit(dz, 'y', 0, 0, { renk: RENK.f, kalin: 15, op: 0.5 });
    const nS = serit(dz, 'y', 0, 0, { renk: RENK.mutlak, kalin: 7 });
    const bag = S('line', { stroke: RENK.soluk, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, dz.orta);
    const pf = nokta(dz, 0, 0, { renk: RENK.f, r: 12 }), pn = nokta(dz, 0, 0, { renk: RENK.mutlak, r: 7 });
    gizle(bag, pf.el, pn.el);
    const git = (x) => {
      pf.git(x, x); pn.git(x, Math.abs(x));
      bag.setAttribute('x1', dz.X(x)); bag.setAttribute('x2', dz.X(x)); bag.setAttribute('y1', dz.Y(x)); bag.setAttribute('y2', dz.Y(Math.abs(x)));
    };
    const ayni = yazi(svg, 600, 130, ['x ≥ 0:  ', ['|x|', RENK.mutlak], ' = ', ['f(x)', RENK.f]], { size: 30, hiza: 'start' });
    const farkli = yazi(svg, 600, 190, ['x < 0:  ', ['|x|', RENK.mutlak], ' ≠ ', ['f(x)', RENK.f]], { size: 30, hiza: 'start' });
    const tb = tablo(svg, { x: 588, y: 200, basliklar: ['', 'tanım kümesi', 'görüntü kümesi'], n: 2, hucre: 104, yuk: 56, basGen: 178, size: 22, renkler: [RENK.soluk, RENK.yazi, RENK.yazi] });
    gizle(ayni, farkli, tb.g);

    git(0); await belir(c, [pf.el, pn.el], 250);
    await par(soyle(c, 'x ≥ 0’da iki grafik üst üste: çıktılar aynı.', { speak: 'x sıfırdan büyük ya da sıfıra eşitken iki grafik üst üste: çıktılar aynı.' }), (async () => {
      await c.tween(1500, (e) => git(lerp(0, 3.6, e)), ease.inOut);
      await belir(c, ayni, 300);
    })());
    await c.tween(700, (e) => git(lerp(3.6, 0, e)), ease.inOut);
    bag.style.opacity = 1;
    await par(soyle(c, 'x &lt; 0’da ayrılırlar: biri aşağıda, öbürü yukarıda.', { speak: 'x sıfırdan küçükken ayrılırlar: biri aşağıda, öbürü yukarıda.' }), (async () => {
      await c.tween(1500, (e) => git(lerp(0, -3.6, e)), ease.inOut);
      await belir(c, farkli, 300);
    })());
    await c.choice({
      tag: 'Tahmin et', q: '|x| hangi değerleri hiç almaz?',
      options: ['Sıfırı', 'Negatif sayıları', 'Pozitif sayıları'], answer: 1,
      hints: ['|0| = 0: sıfırı alır.', '', 'Sıfırdan farklı her girdide çıktı pozitiftir.'],
      right: 'V eksenin altına hiç inmez: negatif çıktı yok.',
    });
    await kaybol(c, [ayni, farkli, bag, pf.el, pn.el], 300);
    tb.yaz(0, 0, 'f', RENK.f); tb.yaz(0, 1, 'n', RENK.mutlak);
    await belir(c, tb.g, 400);
    await par(soyle(c, 'İkisine de her gerçek sayı girebilir.'), (async () => {
      await c.tween(900, (e) => tanimS.ayarla(-4 * e, 4 * e), ease.inOut);
      tb.yaz(1, 0, 'ℝ'); tb.yaz(1, 1, 'ℝ');
    })());
    await belir(c, tanimS.el, 300, 0);
    await par(soyle(c, 'f her gerçek sayıyı çıktı olarak verir.', { speak: 'f fonksiyonu her gerçek sayıyı çıktı olarak verir.' }), (async () => {
      await c.tween(900, (e) => fS.ayarla(-4 * e, 4 * e), ease.inOut);
      tb.yaz(2, 0, 'ℝ');
    })());
    await par(soyle(c, 'n ise yalnızca sıfırı ve pozitif sayıları verir.', { speak: 'n fonksiyonu ise yalnızca sıfırı ve pozitif sayıları verir.' }), (async () => {
      await c.tween(900, (e) => nS.ayarla(0, 4 * e), ease.inOut);
      tb.yaz(2, 1, '[0, ∞)', RENK.mutlak);
    })());
    c.note('<b>n(x) = |x|</b><br>Tanım kümesi ℝ, görüntü kümesi [0, ∞)', '|x|’in kümeleri', 'b1-kumeler');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = ikiGrafik(svg);
    const bag = S('line', { stroke: RENK.soluk, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, dz.orta);
    const pf = nokta(dz, 0, 0, { renk: RENK.f, r: 12 }), pn = nokta(dz, 0, 0, { renk: RENK.mutlak, r: 7 });
    const fT = yazi(svg, 765, 200, '', { size: 46, kalin: 700 });
    const nT = yazi(svg, 765, 290, '', { size: 46, kalin: 700 });
    const durum = yazi(svg, 765, 370, '', { size: 26, renk: RENK.soluk });
    const koy = (x) => {
      pf.git(x, x); pn.git(x, Math.abs(x));
      bag.setAttribute('x1', dz.X(x)); bag.setAttribute('x2', dz.X(x)); bag.setAttribute('y1', dz.Y(x)); bag.setAttribute('y2', dz.Y(Math.abs(x)));
      yaz(fT, ['f(' + sayi(x) + ') = ', [sayi(x), RENK.f]]);
      yaz(nT, ['|' + sayi(x) + '| = ', [sayi(Math.abs(x)), RENK.mutlak]]);
      yaz(durum, x >= 0 ? 'iki nokta üst üste' : 'iki nokta karşılıklı');
    };
    await soyle(c, 'x’i değiştir; iki nokta ne zaman ayrılıyor?', { noWait: true });
    c.slider({ label: 'x (girdi)', min: -3.5, max: 3.5, step: 0.5, value: 2, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b1', kicker: 'Konu B · Mutlak değer fonksiyonu', title: '|x| ile f(x) = x', accent: '#3cc8e8', back: 'index.html',
    intro: { title: '|x| ile f(x) = x', hook: 'Evden 3 km doğudaki ve 3 km batıdaki iki yer, evden uzaklık olarak <b>neden aynı sayıdır?</b>', button: 'Derse başla ›' },
    goals: ['n(x) = |x| fonksiyonunun grafiğini tanır.', '|x| ile f(x) = x’in benzer ve farklı yanlarını söyler.'],
    scenes: [
      { title: 'Uzaklık', goal: 'Mutlak değeri sıfıra uzaklık olarak hatırla.', run: uzaklik },
      { title: 'Katla', goal: 'V’nin f(x) = x’ten nasıl çıktığını gör.', run: katlaSahne },
      { title: 'Aynı ve farklı', goal: 'İki fonksiyonu karşılaştır.', run: ayniFarkli },
      { title: 'Dene', goal: 'İki grafikte aynı girdiyi izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'n(x) = |x| ile f(x) = x hangi x’lerde aynı değeri verir?', options: ['x ≤ 0', 'x ≥ 0', 'Hiçbir x’te'], answer: 1,
        why: ['x negatifken |x| pozitif, f(x) negatiftir.', 'x ≥ 0 iken |x| = x: iki grafik üst üstedir.', 'Sağ yarıda iki grafik çakışır: |2| = 2 = f(2).'], scene: 2 },
      { q: 'n(−5) kaçtır?', options: ['−5', '0', '5'], answer: 2,
        why: ['Mutlak değer işareti atar; çıktı negatif olmaz.', '0 yalnızca x = 0 için çıkar.', '−5’in sıfıra uzaklığı 5’tir: |−5| = 5.'], scene: 0 },
      { q: 'Bir otoparkta zemin kat 0, bodrum katlar eksi sayılarla numaralanıyor. Üç asansör −6., 0. ve 4. katlarda. Üçünün zemin kata uzaklıkları toplamı kaç kattır?', options: ['−2', '10', '0'], answer: 1,
        why: ['−6 + 0 + 4 = −2 olur; ama uzaklık negatif olmaz, |−6| = 6.', 'Uzaklıklar |−6| = 6, |0| = 0 ve |4| = 4; toplam 10.', 'Sıfır yalnızca zemin kattaki asansörün uzaklığıdır.'], scene: 0 },
      { q: 'Selin “|x| her x için pozitiftir” diyor. Bu iddia için hangisi doğrudur?', options: ['Yanlış; x negatifken |x| negatiftir', 'Doğru; uzaklık hep pozitiftir', 'Yanlış; x = 0 için |x| = 0 olur'], answer: 2,
        why: ['x negatifken |x| pozitif olur: |−3| = 3.', 'Sıfıra uzaklık negatif olmaz, ama sıfır da olabilir: |0| = 0.', '|0| = 0 pozitif değildir; |x| için doğru söz “negatif olmaz”dır.'], scene: 0 },
    ],
    summary: [
      '<b>Mutlak değer işareti atar, uzaklığı bırakır.</b>',
      '<b>n(x) = |x|</b> grafiği bir V’dir: f(x) = x’in eksen altındaki yarısı yukarı katlanır.',
      'x ≥ 0’da |x| = x; |x| hiç negatif olmaz, görüntü kümesi [0, ∞).',
    ],
    nextLesson: { href: 'b2-mutlak-degerin-parcali-gosterimi.html', label: 'Sonraki: |x|’in parçalı gösterimi ›' },
  });
})();
