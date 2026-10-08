/* C7 — |f(x)| = g(x)
   Grafikte kesişim, cebirde iki durum; bulunan her sayı denklemde denenir (sahte çözüm).
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/C-denklem-ve-esitsizlik-problemleri.md */
(() => {
  'use strict';
  const { RENK, S, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, alan, etiket, soruTahtasi } = window.KIT;

  /* (x, y) noktasından x eksenine inen kesik çizgi. */
  const dusey = (dz, x, y, y2 = 0, renk = RENK.sifir) => S('line', { x1: dz.X(x), y1: dz.Y(y), x2: dz.X(x), y2: dz.Y(y2), stroke: renk, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
  /* Yazıyı söndürüp yenisiyle geri getirir (aynı satırda bir sonraki adım). */
  async function donustur(c, t, metin, renk) {
    await kaybol(c, t, 220); yaz(t, metin); if (renk) t.style.fill = renk; await belir(c, t, 320);
  }
  const tik = (p, x, y) => S('path', { d: `M${x},${y} l7,8 l14,-17`, fill: 'none', stroke: RENK.iyi, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);

  /* ---- 1. Grafikte ---- */
  async function grafikte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 56, y0: 92, w: 560, h: 392, xmin: -1, xmax: 9, ymin: -1, ymax: 6, xsayi: 2, ysayi: 2 });
    const v = kirik(dz, mutlakNoktalar(dz, 1, -3)), g = dogru(dz, 0.5, 0, { renk: RENK.g });
    const d1 = dusey(dz, 2, 1), d2 = dusey(dz, 6, 3);
    const p1 = nokta(dz, 2, 1), p2 = nokta(dz, 6, 3), x1 = nokta(dz, 2, 0, { r: 7 }), x2 = nokta(dz, 6, 0, { r: 7 });
    const e1 = etiket(dz, 2.3, 1.75, '(2, 1)', { renk: RENK.sifir }), e2 = etiket(dz, 6.25, 2.45, '(6, 3)', { renk: RENK.sifir, hiza: 'start' });
    const SAG = 812, ES = SAG + 36;
    const vAd = yazi(svg, ES - 22, 220, '|x − 3|', { size: 42, kalin: 700, renk: RENK.mutlak, hiza: 'end' });
    const esittir = yazi(svg, ES, 220, '=', { size: 42, kalin: 700 });
    const gAd = yazi(svg, ES + 22, 220, 'x/2', { size: 42, kalin: 700, renk: RENK.g, hiza: 'start' });
    const cozum = yazi(svg, SAG, 300, '{2, 6}', { size: 42, kalin: 700, renk: RENK.sifir });
    gizle(v.el, g.el, d1, d2, p1.el, p2.el, x1.el, x2.el, e1, e2, vAd, esittir, gAd, cozum);

    await par(soyle(c, 'Birinci kurye, 3. kilometredeki eve uzaklık kadar lira alır.'), (async () => { await ciz(c, v, 900); await belir(c, vAd, 400); })());
    await par(soyle(c, 'İkinci kurye her kilometre için yarım lira alır.'), (async () => { await ciz(c, g, 800); await belir(c, gAd, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'İki ücret kaç farklı mesafede eşit olur?',
      options: ['Bir', 'İki', 'Hiç'], answer: 1,
      hints: ['Doğru V’nin öbür kolunu da kesiyor.', '', 'Grafikler kesişiyor; kesiştikleri yerde ücretler eşittir.'],
      right: 'Doğru, V’nin iki kolunu da kesiyor.',
    });
    await par(soyle(c, 'Kesişimlerde iki grafik aynı yükseklikte: ücretler eşit.'), (async () => {
      await pop(c, p1, dz.X(2), dz.Y(1), 350); await belir(c, e1, 250);
      await pop(c, p2, dz.X(6), dz.Y(3), 350); await belir(c, e2, 250);
      await belir(c, esittir, 350);
    })());
    await par(soyle(c, 'Kesişimlerin x değerleri denklemin çözümleridir.'), (async () => {
      await belir(c, [d1, d2], 350);
      await par(pop(c, x1, dz.X(2), dz.Y(0), 320), pop(c, x2, dz.X(6), dz.Y(0), 320));
      await belir(c, cozum, 400);
    })());
    c.note('<b>|f(x)| = g(x):</b> çözümler, kesişimlerin x değerleridir.', 'Grafikte', 'c7-grafik');
  }

  /* ---- 2. İki duruma ayır ---- */
  async function ikiDurum(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 46, y0: 142, w: 440, h: 308, xmin: -1, xmax: 9, ymin: -1, ymax: 6, sayilar: false, xad: '', yad: '' });
    const sagB = alan(dz, [[3, -1], [9, -1], [9, 6], [3, 6]], { renk: RENK.mutlak, op: 0.1 }), solB = alan(dz, [[-1, -1], [3, -1], [3, 6], [-1, 6]], { renk: RENK.mutlak, op: 0.1 });
    dusey(dz, 3, 6, -1, RENK.soluk);
    const v = kirik(dz, mutlakNoktalar(dz, 1, -3)); dogru(dz, 0.5, 0, { renk: RENK.g });
    const sagKol = kirik(dz, [[3, 0], [9, 6]], { kalin: 9 }), solKol = kirik(dz, [[-1, 4], [3, 0]], { kalin: 9 });
    nokta(dz, 3, 0, { r: 6, renk: RENK.mutlak });
    const p6 = nokta(dz, 6, 3), p2 = nokta(dz, 2, 1);
    const bas = yazi(svg, 750, 152, [['|x − 3|', RENK.mutlak], ' = ', ['x/2', RENK.g]], { size: 38, kalin: 700 });
    const AX = 540, BX = 780, Y = [250, 315, 380];
    const aK = yazi(svg, AX, Y[0], 'x ≥ 3', { size: 28, hiza: 'start', renk: RENK.soluk }), aD = yazi(svg, AX, Y[1], 'x − 3 = x/2', { size: 30, hiza: 'start' }), aS = yazi(svg, AX, Y[2], '|6 − 3| = 6/2', { size: 28, hiza: 'start' });
    const bK = yazi(svg, BX, Y[0], 'x < 3', { size: 28, hiza: 'start', renk: RENK.soluk }), bD = yazi(svg, BX, Y[1], '−x + 3 = x/2', { size: 30, hiza: 'start' }), bS = yazi(svg, BX, Y[2], '|2 − 3| = 2/2', { size: 28, hiza: 'start' });
    gizle(sagB.el, solB.el, sagKol.el, solKol.el, p6.el, p2.el, bas, aK, aD, aS, bK, bD, bS);

    await par(soyle(c, 'Kesişimleri cebirle bul: önce mutlak değerin içine bak.'), belir(c, bas, 450));
    await par(soyle(c, '3’ün sağında içi negatif değil: mutlak değer aynen çıkar.', { speak: 'Üçün sağında içi negatif değil: mutlak değer aynen çıkar.', dur: true }), (async () => {
      await par(belir(c, sagB.el, 400), belir(c, v.el, 300, 0.35)); await ciz(c, sagKol, 600); await belir(c, aK, 350); await belir(c, aD, 400);
    })());
    await par(soyle(c, 'Çöz: 6 çıkar ve koşula uyar.', { speak: 'Çöz: x eşittir altı çıkar ve koşula uyar.' }), (async () => { await donustur(c, aD, 'x = 6', RENK.sifir); await pop(c, p6, dz.X(6), dz.Y(3), 350); })());
    await par(kaybol(c, [sagB.el, sagKol.el], 300));
    await c.choice({
      tag: 'Tahmin et', q: 'x &lt; 3 için |x − 3| hangisine eşittir?',
      options: ['x − 3', '−x + 3', 'x + 3'], answer: 1,
      hints: ['x &lt; 3 iken x − 3 negatiftir; mutlak değer negatif olmaz.', '', 'İçteki ifadenin tamamı işaret değiştirir: −(x − 3).'],
      right: 'İçi negatif; eksiyle çarpılarak çıkar: −(x − 3) = −x + 3.',
    });
    await par(soyle(c, '3’ün solunda içi negatif: işaret değiştirerek çıkar.', { speak: 'Üçün solunda içi negatif: işaret değiştirerek çıkar.' }), (async () => {
      await belir(c, solB.el, 400); await ciz(c, solKol, 600); await belir(c, bK, 350); await belir(c, bD, 400);
    })());
    await par(soyle(c, 'Çöz: 2 çıkar, o da koşuluna uyar.', { speak: 'Çöz: x eşittir iki çıkar, o da koşuluna uyar.' }), (async () => { await donustur(c, bD, 'x = 2', RENK.sifir); await pop(c, p2, dz.X(2), dz.Y(1), 350); })());
    await par(kaybol(c, [solB.el, solKol.el], 300), belir(c, v.el, 300));
    await par(soyle(c, 'Son adım: bulduğun sayıları denklemde yerine koy.'), belir(c, aS, 450));
    await par(soyle(c, '6 için iki yan da 3.', { speak: 'Altı için iki yan da üç.' }), donustur(c, aS, '3 = 3', RENK.iyi));
    await belir(c, bS, 400);
    await par(soyle(c, '2 için iki yan da 1: ikisi de çözüm.', { speak: 'İki için iki yan da bir: ikisi de çözüm.', dur: true }), donustur(c, bS, '1 = 1', RENK.iyi));
    c.note('<b>|f(x)| = g(x):</b> işarete göre iki durum, sonra yerine koy.', 'İki durum', 'c7-iki-durum');
  }

  /* ---- 3. Sahte çözüm ---- */
  async function sahte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 50, y0: 64, w: 360, h: 432, xmin: -7, xmax: 3, ymin: -7, ymax: 5, sayilar: false, xad: '', yad: '' });
    const v = kirik(dz, mutlakNoktalar(dz, 1, -1)), g = dogru(dz, 2, 4, { renk: RENK.g });
    const uzanti = dogru(dz, 1, -1, { renk: RENK.mutlak, kesik: true, kalin: 3, x2: 1 });
    const pk = nokta(dz, -1, 2), ps = nokta(dz, -5, -6, { bos: true, renk: RENK.kotu });
    const dk = dusey(dz, -1, 2), ds = dusey(dz, -5, -6, 0, RENK.kotu);
    const mk = etiket(dz, -1, 0, '−1', { dy: 27, renk: RENK.sifir }), ms = etiket(dz, -5, 0, '−5', { dy: -12, renk: RENK.kotu });
    const bas = yazi(svg, 715, 110, [['|x − 1|', RENK.mutlak], ' = ', ['2x + 4', RENK.g]], { size: 38, kalin: 700 });
    const AX = 462, BX = 742, Y = [205, 268, 331];
    const aK = yazi(svg, AX, Y[0], 'x ≥ 1', { size: 28, hiza: 'start', renk: RENK.soluk }), aD = yazi(svg, AX, Y[1], 'x − 1 = 2x + 4', { size: 29, hiza: 'start' }), aS = yazi(svg, AX, Y[2], '6 ≠ −6', { size: 29, hiza: 'start', renk: RENK.kotu });
    const bK = yazi(svg, BX, Y[0], 'x < 1', { size: 28, hiza: 'start', renk: RENK.soluk }), bD = yazi(svg, BX, Y[1], '−x + 1 = 2x + 4', { size: 29, hiza: 'start' });
    const cizik = S('line', { x1: AX - 6, y1: Y[1] - 10, x2: AX + 86, y2: Y[1] - 10, stroke: RENK.kotu, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, svg);
    const onay = tik(svg, BX + 104, Y[1] - 9);
    const cozum = yazi(svg, 715, 440, '{−1}', { size: 46, kalin: 700, renk: RENK.sifir });
    gizle(v.el, g.el, uzanti.el, pk.el, ps.el, dk, ds, mk, ms, bas, aK, aD, aS, bK, bD, cizik, onay, cozum);

    await par(soyle(c, 'Aynı yolu bu denklemde dene.'), belir(c, bas, 450));
    await par(soyle(c, '1’in sağında mutlak değer aynen çıkar.', { speak: 'Birin sağında mutlak değer aynen çıkar.' }), (async () => { await belir(c, aK, 350); await belir(c, aD, 400); })());
    await par(soyle(c, 'Çözünce −5 çıkar.'), donustur(c, aD, 'x = −5', RENK.sifir));
    await par(soyle(c, '1’in solunda işaret değiştirerek çıkar.', { speak: 'Birin solunda işaret değiştirerek çıkar.' }), (async () => { await belir(c, bK, 350); await belir(c, bD, 400); })());
    await par(soyle(c, 'Çözünce −1 çıkar.'), donustur(c, bD, 'x = −1', RENK.sifir));
    await c.choice({
      tag: 'Tahmin et', q: 'İki sayı da denklemin çözümü mü?',
      options: ['Evet, ikisi de', 'Yalnızca −1', 'Yalnızca −5'], answer: 1,
      hints: ['Koşullara bak: −5, x ≥ 1 durumundan çıktı.', '', '−5 için sol yan 6, sağ yan −6 eder.'],
      right: '−5, çıktığı durumun koşulunu (x ≥ 1) sağlamıyor.',
    });
    await par(soyle(c, 'Grafiğe bak: yalnızca bir kesişim var.'), (async () => {
      await par(ciz(c, v, 800), ciz(c, g, 800)); await pop(c, pk, dz.X(-1), dz.Y(2), 350); await belir(c, [dk, mk], 300);
    })());
    await par(soyle(c, '−5, sağ kolun uzantısında çıktı; V orada değil.', { speak: 'Eksi beş, sağ kolun uzantısında çıktı; V grafiği orada değil.' }), (async () => {
      await belir(c, uzanti.el, 500); await pop(c, ps, dz.X(-5), dz.Y(-6), 350); await belir(c, [ds, ms], 300);
    })());
    aK.style.fill = RENK.kotu;
    await soyle(c, '−5, kendi koşulunu sağlamıyor: 1’den küçük.', { speak: 'Eksi beş, kendi koşulunu sağlamıyor: birden küçük.', ton: 'thoughtful' });
    await par(soyle(c, 'Yerine koy: sol yan 6, sağ yan −6.'), (async () => { await belir(c, aS, 400); await belir(c, cizik, 300); })());
    await par(soyle(c, '−5 sahte çözüm; −1 için iki yan da 2.', { speak: 'Eksi beş sahte çözüm; eksi bir için iki yan da iki.' }), (async () => { await belir(c, onay, 350); await belir(c, cozum, 450); })());
    c.note('<b>Sahte çözüm:</b> koşulunu sağlamayan sayı.<br>x ≥ 1 ama x = −5', 'Sahte çözüm', 'c7-sahte');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    yazi(svg, 500, 100, [['|x − 2|', RENK.mutlak], ' = ', ['x', RENK.g]], { size: 42, kalin: 700 });
    const tb = soruTahtasi(c, svg, { x: 150, y: 160, w: 700, h: 160, size: 40 });
    await soyle(c, 'Sıra sende: iki durum, sonra yerine koy.', { noWait: true });
    await tb.sor('x ≥ 2:   x − 2 = x', {
      q: 'Bu durumdan ne çıkar?', options: ['x = 2', 'x = 1', 'Çözüm çıkmaz'], answer: 2,
      hints: ['2’yi dene: 2 − 2 = 0 eder, 2 etmez.', '1 bu durumda değil; ayrıca 1 − 2 = −1 eder.', ''],
      right: 'İki yandan x gidince −2 = 0 kalır; bu hiç doğru olmaz.', kanit: '−2 = 0 olamaz: bu durumdan çözüm çıkmaz', renk: RENK.kotu,
    });
    await tb.sor('x < 2:   −x + 2 = x', {
      q: 'Bu durumdan ne çıkar?', options: ['x = 1', 'x = 2', 'x = −1'], answer: 0,
      hints: ['', '2 bu durumda değil: koşul x &lt; 2.', '−1 için sol yan 3 eder, sağ yan −1.'],
      right: '2 = 2x, yani x = 1; koşula da uyuyor.', kanit: '2 = 2x, x = 1 ve 1 < 2',
    });
    await tb.sor('x = 1:   |1 − 2| = ?', {
      q: 'x = 1’i yerine koy. Sol yan kaç eder?', options: ['−1', '1', '3'], answer: 1,
      hints: ['Mutlak değer negatif olmaz: |−1| = 1.', '', '1 − 2 = −1 eder; mutlak değeri 1’dir.'],
      right: 'Sol yan 1, sağ yan da x = 1: denklem tutuyor.', sonra: 'x = 1:   |1 − 2| = 1', kanit: 'iki yan da 1: çözüm kümesi {1}',
    });
    await soyle(c, 'İki durumdan yalnızca biri çözüm verdi.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c7', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: '|f(x)| = g(x)', accent: '#ff8a5b', back: 'index.html',
    intro: { title: '|f(x)| = g(x)', hook: 'Kuryelerden biri eve uzaklığa göre, öbürü sabit artışla ücret alıyor. <b>Hangi mesafede aynı ücreti isterler?</b>', button: 'Derse başla ›' },
    goals: ['|f(x)| = g(x) denkleminin çözümünü grafikte kesişim olarak görür.', 'Denklemi f(x)’in işaretine göre iki durumda çözer.', 'Bulduğu sayıyı denklemde deneyip sahte çözümü ayıklar.'],
    scenes: [
      { title: 'Grafikte', goal: 'Çözümleri kesişimlerden oku.', run: grafikte },
      { title: 'İki duruma ayır', goal: 'İşarete göre iki denklem kur ve çöz.', run: ikiDurum },
      { title: 'Sahte çözüm', goal: 'Koşulunu sağlamayan sayıyı ayıkla.', run: sahte },
      { title: 'Sıra sende', goal: 'Üç adımı kendin uygula.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '|x − 2| = x denkleminin çözüm kümesi hangisidir?', options: ['{1, 2}', '{1}', '∅'], answer: 1,
        why: ['2 için sol yan 0, sağ yan 2 eder; 2 çözüm değildir.', 'x &lt; 2 durumundan x = 1 çıkar ve |1 − 2| = 1 tutar.', 'x = 1 denklemi sağlar: |1 − 2| = 1.'], scene: 3 },
      { q: 'Bulunan sayı neden denklemde denenir?', options: ['Denklem her zaman iki çözümlüdür.', 'Denemeye gerek yoktur.', 'Durumun koşulunu sağlamayan sahte çözüm çıkabilir.'], answer: 2,
        why: ['Çözüm sayısı değişir: iki, bir ya da hiç olabilir.', 'Denemeden sahte çözüm fark edilmez: |x − 1| = 2x + 4’te −5 gibi.', 'Bir durumdan çıkan sayı o durumun koşulunu sağlamayabilir; yerine koymak bunu yakalar.'], scene: 2 },
    ],
    summary: [
      '<b>Önce işarete bak, iki yola ayrıl, sonunda yerine koy.</b>',
      '|f(x)| = g(x) denkleminin çözümleri, iki grafiğin kesişimlerinin x değerleridir.',
      'Durumunun koşulunu sağlamayan sayı sahte çözümdür; çözüm kümesine girmez.',
    ],
    nextLesson: { href: 'c8-mutlak-deger-ile-dogru-esitsizligi.html', label: 'Sonraki: |f(x)| ≤ g(x) ve |f(x)| ≥ g(x) ›' },
  });
})();
