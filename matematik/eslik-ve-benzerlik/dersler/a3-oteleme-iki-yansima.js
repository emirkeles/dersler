/* A3 — Öteleme, iki yansımadır
   Paralel iki doğruya göre art arda yansıma bir ötelemedir; öteleme uzaklığı doğrular arasındaki uzaklığın iki katıdır.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md (A3)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, rad, uz, ileri, ara, araHepsi, agirlik, yansit, otele, dondur, yazi, renkli, cizgi, koy, nokta, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma } = window.KIT;
  const { merkezNokta, yayIz, yaricap } = window.KIT_A;

  const ABC = [[1, 3], [1, 7], [4, 7]];                 // |AB| = 4, |BC| = 3 birim; dik açı B'de
  const HARF = ['A', 'B', 'C'], HARF1 = ['A′', 'B′', 'C′'], HARF2 = ['A″', 'B″', 'C″'];
  const TX = 706;                                         // sağdaki tablonun sol kenarı
  const C4 = 'var(--c6)', C1 = 'var(--c5)';               // "4" parçaları turkuaz, "1" parçaları sarı
  const TUR = (n) => String(n).replace('.', ',');

  /* ---- bu dersin araçları ---- */
  /* Köşe harfi: şeklin ağırlık merkezinden uzağa doğru, köşenin dışında. */
  const harf = (c, p, q, m, metin, renk, u = 22) => {
    const d = uz(m, q) || 1;
    return yazi(c, p, q[0] + ((q[0] - m[0]) / d) * u, q[1] + ((q[1] - m[1]) / d) * u + 8, metin, { size: 24, kalin: 700, renk });
  };
  const harfler = (c, p, pts, adlar, renk) => { const m = agirlik(pts); return adlar.map((h, i) => harf(c, p, pts[i], m, h, renk)); };
  /* İki ucu çentikli ölçü çizgisi; metin çizginin üstünde. koy(x1, x2, metin?) yerini değiştirir. */
  const aralik = (c, p, x1, x2, y, metin, renk = RENK.dogru) => {
    const g = c.S('g', {}, p);
    const cz = [cizgi(c, g, [x1, y], [x2, y], renk, 3), cizgi(c, g, [x1, y - 8], [x1, y + 8], renk, 3), cizgi(c, g, [x2, y - 8], [x2, y + 8], renk, 3)];
    const t = yazi(c, g, (x1 + x2) / 2, y - 12, metin, { size: 24, kalin: 700, renk });
    const yer = (a, b, m) => { koy(cz[0], [a, y], [b, y]); koy(cz[1], [a, y - 8], [a, y + 8]); koy(cz[2], [b, y - 8], [b, y + 8]); t.setAttribute('x', (a + b) / 2); if (m != null) t.textContent = m; };
    return { g, t, cz, koy: yer };
  };
  /* Yeşil öteleme oku ve üzerinde (ya da lift < 0 ise altında) uzunluğu. */
  const oklu = (c, p, P, Q, metin, t = 0.5, lift = 12) => {
    const o = ok(c, p, ara(P, Q, 0.02), ara(P, Q, 0.98)), m = ara(P, Q, t);
    const e = yazi(c, p, m[0], m[1] - lift, metin, { size: 24, kalin: 700, renk: RENK.ok });
    return { o, e };
  };
  const dik = (c, p, x, y) => c.S('path', { d: `M${x + 11},${y} L${x + 11},${y - 11} L${x},${y - 11}`, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2.5 }, p);
  const kesik = (c, p, P, Q) => cizgi(c, p, P, Q, RENK.cizgi, 2, { 'stroke-dasharray': '4 5' });
  /* Yatay yolun renkli parçaları ve altlarında ölçüleri (başta gizli). */
  const yolKur = (c, p, y, xs, olcu, renk) => olcu.map((m, i) => {
    const g = c.S('g', {}, p);
    cizgi(c, g, [xs[i], y], [xs[i + 1], y], renk[i], 7);
    g.etiket = yazi(c, g, (xs[i] + xs[i + 1]) / 2, y + 34, m, { size: 26, kalin: 700, renk: renk[i] });
    gizle(g);
    return g;
  });
  /* Yol üstündeki bir nokta: renkli nokta ve (verilmişse) harfi. */
  const yolNokta = (c, p, q, renk, ad, m, yer) => {
    const g = c.S('g', {}, p);
    nokta(c, g, q, renk, 8);
    if (ad && yer) yazi(c, g, q[0] + yer[0], q[1] + yer[1], ad, { size: 24, kalin: 700, renk });
    else if (ad) harf(c, g, q, m, ad, renk);
    gizle(g);
    return g;
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');

    // 1) Dönmede merkeze uzaklık.
    const g1 = c.S('g', {}, svg), O = [500, 290], R = 220;
    const P = ileri(O, rad(-130), R), P2 = dondur(P, O, 110);
    const mo = merkezNokta(c, g1, O, null);
    yazi(c, g1, O[0], O[1] + 36, 'O', { size: 24, kalin: 700, renk: RENK.merkez });
    const yay = yayIz(c, g1, O, P, { renk: RENK.cizgi });
    const r1 = yaricap(c, g1, O, P, '5', RENK.merkez, { taraf: 1, kay: 20 });
    nokta(c, g1, P, RENK.sekil, 8); harf(c, g1, P, O, 'P', RENK.sekil);
    const gP2 = c.S('g', {}, g1);
    nokta(c, gP2, P2, RENK.goruntu, 8); harf(c, gP2, P2, O, 'P′', RENK.goruntu);
    const r2 = yaricap(c, gP2, O, P2, '5', RENK.merkez, { taraf: -1, kay: 20 });
    gizle(gP2);
    c.clearSay();
    await c.choice({
      tag: 'Hatırla', q: 'Bir şekil O noktası çevresinde döndürülüyor. P noktası O’ya 5 birim uzaksa görüntüsü P′, O’ya kaç birim uzaktadır?',
      options: ['10 birim', '5 birim', 'Dönme açısına bağlıdır'], answer: 1,
      hints: ['Dönmede her nokta merkeze uzaklığını korur.', '', 'Dönmede her nokta merkeze uzaklığını korur.'],
      right: 'Evet. P′ de O’ya 5 birim uzakta.',
    });
    await par(c.say('Dönmede her nokta merkeze uzaklığını korur.'), (async () => {
      await c.tween(1300, (e) => yay.don(110 * e), Ders.ease.inOut);
      await belir(c, gP2, 400);
    })());
    await c.wait(500);

    // 2) Yansımada nokta ile görüntüsü arasındaki uzaklık.
    c.clearSay();
    await belir(c, g1, 300, 0); g1.remove();
    const g2 = c.S('g', {}, svg), x0 = 500, y0 = 290, b = 50;
    const dd = dogru(c, g2, [x0, 60], [x0, y0 + 40], { ad: 'd', adKay: [20, 22] });
    const Cn = [x0 - 3 * b, y0], C2 = [x0 + 3 * b, y0];
    cizgi(c, g2, Cn, [x0, y0], RENK.sekil, 5);
    nokta(c, g2, Cn, RENK.sekil, 8); harf(c, g2, Cn, [x0, y0 + 60], 'C', RENK.sekil);
    yazi(c, g2, x0 - 1.5 * b, y0 - 14, '3', { size: 26, kalin: 700, renk: RENK.sekil });
    const gC2 = c.S('g', {}, g2);
    cizgi(c, gC2, [x0, y0], C2, RENK.goruntu, 5);
    nokta(c, gC2, C2, RENK.goruntu, 8); harf(c, gC2, C2, [x0, y0 + 60], 'C′', RENK.goruntu);
    yazi(c, gC2, x0 + 1.5 * b, y0 - 14, '3', { size: 26, kalin: 700, renk: RENK.goruntu });
    const top = aralik(c, gC2, Cn[0], C2[0], y0 + 90, '', RENK.iyi);
    gizle(gC2);
    await c.choice({
      tag: 'Hatırla', q: 'C noktası yansıma doğrusuna 3 birim uzakta. C ile görüntüsü C′ arasındaki uzaklık kaç birimdir?',
      options: ['6 birim', '3 birim', '9 birim'], answer: 0,
      hints: ['', 'C′ doğrunun öbür yanında, yine 3 birim uzaktadır: 3 + 3.', 'C′ doğrunun öbür yanında, yine 3 birim uzaktadır: 3 + 3.'],
      right: 'Evet. 3 + 3 = 6 birim.',
    });
    top.t.textContent = '6';
    await par(c.say('C′ yine 3 birim uzakta; toplam 3 + 3 = 6 birim.', { speak: 'C üssü yine üç birim uzakta; toplam üç artı üç, altı birim.' }), belir(c, gC2, 500));
  }

  /* ---- 2. İki yansıma art arda ---- */
  async function artArda(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const U1 = z.P(5, -0.4), V1 = z.P(5, 11.4), U2 = z.P(10, -0.4), V2 = z.P(10, 11.4);
    const P = z.N(ABC), P1 = P.map((k) => yansit(k, U1, V1)), P2 = P1.map((k) => yansit(k, U2, V2));
    const d1 = dogru(c, svg, U1, V1, { ad: 'd₁', adKay: [20, 22] }), d2 = dogru(c, svg, U2, V2, { ad: 'd₂', adKay: [20, 22] });
    gizle(d1.g, d2.g);
    const u = cokgen(c, svg, P, RENK.sekil, { harf: HARF });
    const orta = cokgen(c, svg, P, RENK.goruntu, { harf: HARF1 });       // ara görüntü: önce d₁'e göre yansır
    const son = cokgen(c, svg, P1, RENK.goruntu);                        // ikinci yansıma: P1'den P2'ye
    const sonAd = harfler(c, svg, P2, HARF2, RENK.goruntu);
    gizle(orta.g, orta.adlar, son.g, sonAd);

    await c.say('Kilim ustası bir üçgeni art arda iki kez yansıtacak.');
    await par(c.say('İki yansıma doğrusu var, d₁ ve d₂; birbirine paraleller.', { speak: 'İki yansıma doğrusu var, d bir ve d iki; birbirine paraleller.' }), belir(c, [d1.g, d2.g], 450));
    await par(c.say('Önce d₁’e göre yansıtıyor: görüntü ters çevrildi.', { speak: 'Önce d bir’e göre yansıtıyor: görüntü ters çevrildi.' }), (async () => {
      await belir(c, orta.g, 250);
      await c.tween(1500, (e) => orta.koy(araHepsi(P, P1, e)), Ders.ease.inOut);
    })());
    const o1 = dolasma(c, svg, P, RENK.sekil), o2 = dolasma(c, svg, P1, RENK.goruntu);
    gizle(o1, o2);
    await belir(c, orta.adlar, 300);
    await belir(c, [o1, o2], 450);
    await par(c.say('Şimdi bu görüntüyü d₂’ye göre yansıtıyor.', { speak: 'Şimdi bu görüntüyü d iki’ye göre yansıtıyor.' }), (async () => {
      await par(belir(c, [orta.g, o2], 400, 0.35), belir(c, son.g, 300));
      await c.tween(1500, (e) => son.koy(araHepsi(P1, P2, e)), Ders.ease.inOut);
      await belir(c, sonAd, 300);
    })());
    const o3 = dolasma(c, svg, P2, RENK.goruntu);
    gizle(o3);
    await par(c.say('Ters çevrilen şekil bir kez daha ters çevrildi: yeniden düz.', { speak: '[thoughtful] Ters çevrilen şekil bir kez daha ters çevrildi: yeniden düz.' }), belir(c, o3, 450));
    await par(c.say('Aradaki görüntüyü silelim; ilk üçgen ile son görüntü kalsın.'), belir(c, [orta.g, o2], 500, 0));
    orta.g.remove(); o2.remove();

    await c.choice({
      tag: 'Sıra sende', q: 'İlk üçgen ile son görüntüye bak. Son görüntü ilk üçgene göre nasıl duruyor?',
      options: ['Başka yöne bakıyor; dönmüş', 'Ters çevrilmiş', 'Ters çevrilmemiş, dönmemiş; yalnızca kaymış'], answer: 2,
      hints: ['Dik kenarlar iki üçgende de aynı doğrultuda duruyor.', 'Köşeleri dolaş: iki üçgende de aynı yönde dönüyorsun.', ''],
      right: 'Evet. Köşeleri dolaşma yönü ve dik kenarlar aynı: yalnızca kaymış.',
    });
    await belir(c, [o1, o3], 350, 0); o1.remove(); o3.remove();
    const oklar = c.S('g', {}, svg), M = ara(P[0], P[2], 0.5), M2 = ara(P2[0], P2[2], 0.5);
    ok(c, oklar, ara(P[0], P2[0], 0.03), ara(P[0], P2[0], 0.97));
    const ikinci = c.S('g', {}, oklar); ok(c, ikinci, ara(M, M2, 0.03), ara(M, M2, 0.97));
    gizle(oklar, ikinci);
    await par(c.say('Yalnızca kaymış bir şekil: bu bir ötelemeye benziyor.'), belir(c, oklar, 500));
    await par(c.say('Öteleme olması için bütün noktalar aynı uzaklıkta kaymalı.'), belir(c, ikinci, 500));
  }

  /* ---- 3. Ne kadar kaydı? ---- */
  async function kadarKaydi(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const U1 = z.P(5, -0.4), V1 = z.P(5, 11.4), U2 = z.P(10, -0.4), V2 = z.P(10, 11.4);
    const P = z.N(ABC), P1 = P.map((k) => yansit(k, U1, V1)), P2 = P1.map((k) => yansit(k, U2, V2));
    dogru(c, svg, U1, V1, { ad: 'd₁', adKay: [20, 22] }); dogru(c, svg, U2, V2, { ad: 'd₂', adKay: [20, 22] });
    cokgen(c, svg, P, RENK.sekil);
    const orta = cokgen(c, svg, P1, RENK.goruntu); orta.g.style.opacity = 0.35;
    cokgen(c, svg, P2, RENK.goruntu);
    const yA = P[0][1], yC = z.P(0, 8.8)[1], yBrk = z.P(0, 1.7)[1];
    const mP = agirlik(P), mP1 = agirlik(P1), mP2 = agirlik(P2);

    // A köşesinin yolu: A → d₁ → A′ → d₂ → A″ (4, 4, 1, 1).
    const gA = c.S('g', {}, svg);
    const xsA = [P[0][0], U1[0], P1[0][0], U2[0], P2[0][0]];
    const parA = yolKur(c, gA, yA, xsA, ['4', '4', '1', '1'], [C4, C4, C1, C1]);
    const nA = [yolNokta(c, gA, [xsA[0], yA], RENK.sekil, 'A', mP), yolNokta(c, gA, [xsA[2], yA], RENK.goruntu, 'A′', mP1), yolNokta(c, gA, [xsA[4], yA], RENK.goruntu, 'A″', mP2)];
    const brk = aralik(c, svg, U1[0], U2[0], yBrk, '5'); gizle(brk.g);
    const topA = renkli(c, svg, TX, 150, [['4', C4], ' + ', ['4', C4], ' + ', ['1', C1], ' + ', ['1', C1], ' = 10'], { hiza: 'start', size: 25 });
    gizle(topA);

    await par(c.say('A köşesinin yolunu adım adım izleyelim.'), belir(c, nA[0], 400));
    await par(c.say('A, d₁’e 4 birim uzakta; A′ öbür yanda, yine 4 birim.', { speak: 'A, d bir’e dört birim uzakta; A üssü öbür yanda, yine dört birim.' }), par(belir(c, parA[0], 450), belir(c, parA[1], 450), belir(c, nA[1], 450)));
    await par(c.say('Doğrular arası 5 birim; A′ ile d₂ arasında 1 birim kalıyor.', { speak: 'Doğrular arası beş birim; A üssü ile d iki arasında bir birim kalıyor.' }), par(belir(c, brk.g, 450), belir(c, parA[2], 450)));
    await par(c.say('İkinci yansıma: A″, d₂’nin öbür yanında 1 birim ötede.', { speak: 'İkinci yansıma: A iki üssü, d iki’nin öbür yanında bir birim ötede.' }), par(belir(c, parA[3], 450), belir(c, nA[2], 450)));
    await par(c.say('A’nın yolu: 4 + 4 + 1 + 1 = 10 birim.', { speak: 'A’nın yolu: dört artı dört artı bir artı bir, on birim.' }), belir(c, topA, 450));

    // Birlikte çöz: aynı yol C köşesi için.
    c.clearSay();
    await belir(c, [gA, topA], 350, 0); gA.remove(); topA.remove();
    const gC = c.S('g', {}, svg);
    const xsC = [P[2][0], U1[0], P1[2][0], U2[0], P2[2][0]];
    const parC = yolKur(c, gC, yC, xsC, ['1', '1', '4', '?'], [C1, C1, C4, C4]);
    const nC = [yolNokta(c, gC, [xsC[0], yC], RENK.sekil, 'C', mP, [-20, -12]), yolNokta(c, gC, [xsC[2], yC], RENK.goruntu, 'C′', mP1, [22, -12]), yolNokta(c, gC, [xsC[4], yC], RENK.goruntu, 'C″', mP2, [24, -12])];
    [[P[2], xsC[0]], [P1[2], xsC[2]], [P2[2], xsC[4]]].forEach(([q, x]) => kesik(c, gC, q, [x, yC]));
    parC.forEach((g) => { g.style.opacity = 1; }); nC.forEach((g) => { g.style.opacity = 1; });
    gizle(gC);
    await belir(c, gC, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'C, d₁’e 1 birim uzakta; C′ ile d₂ arasında 4 birim var. C″, d₂’nin kaç birim ötesindedir ve C toplam kaç birim kaymıştır?',
      options: ['1 birim ötesinde; toplam 7 birim', '4 birim ötesinde; toplam 10 birim', '4 birim ötesinde; toplam 8 birim'], answer: 1,
      hints: ['C′ d₂’ye 4 birim uzakta; görüntüsü öbür yanda aynı uzaklıktadır.', '', 'Dört parçayı topla: 1 + 1 + 4 + 4.'],
      right: 'Evet. 1 + 1 + 4 + 4 = 10.',
    });
    cevapla(parC[3].etiket, '4');
    const topC = renkli(c, svg, TX, 150, [['1', C1], ' + ', ['1', C1], ' + ', ['4', C4], ' + ', ['4', C4], ' = 10'], { hiza: 'start', size: 25 });
    gizle(topC);
    await par(c.say('C″ da 4 birim ötede: toplam 10 birim.', { speak: 'C iki üssü da dört birim ötede: toplam on birim.' }), belir(c, topC, 450));

    // Her iki köşe de 10 birim kaydı: yeşil oklar.
    c.clearSay();
    await belir(c, [gC, topC], 350, 0); gC.remove(); topC.remove();
    const gO = c.S('g', {}, svg);
    const oA = oklu(c, gO, [P[0][0], yA], [P2[0][0], yA], '10');
    const gOc = c.S('g', {}, gO);
    kesik(c, gOc, P[2], [P[2][0], yC]); kesik(c, gOc, P2[2], [P2[2][0], yC]);
    oklu(c, gOc, [P[2][0], yC], [P2[2][0], yC], '10', 0.5, -34);
    const gOm = c.S('g', {}, gO), Mo = ara(P[0], P[2], 0.5), Mo2 = ara(P2[0], P2[2], 0.5);
    oklu(c, gOm, Mo, Mo2, '10', 0.12, 12);
    gizle(gO, gOm);
    gO.style.opacity = 1; gizle(oA.o.g, oA.e, gOc);
    await par(c.say('A da C de 10 birim kaydı: aynı yönde, aynı uzaklıkta.', { speak: 'A da C de on birim kaydı: aynı yönde, aynı uzaklıkta.' }), par(belir(c, [oA.o.g, oA.e], 450), belir(c, gOc, 450)));
    await par(c.say('Bütün noktalar için sonuç aynı çıkar: bu bir öteleme.'), belir(c, gOm, 450));
    const es = renkli(c, svg, TX, 150, ['10 = 2 × 5'], { hiza: 'start', size: 25 });
    gizle(es);
    await par(c.say('10, doğrular arasındaki 5 birimin tam iki katı.', { speak: 'On, doğrular arasındaki beş birimin tam iki katı.' }), (async () => {
      await belir(c, es, 400);
      await c.tween(900, (e) => brk.cz.forEach((l) => l.setAttribute('stroke-width', 3 + 4 * Math.sin(Math.PI * e))));
    })());

    // 4 + 1 = 5: yol doğrular arasını iki kez geçer.
    c.clearSay();
    await belir(c, [gO, es], 350, 0); gO.remove(); es.remove();
    const gA2 = c.S('g', {}, svg), parA2 = yolKur(c, gA2, yA, xsA, ['4', '4', '1', '1'], [C4, C4, C1, C1]);
    [0, 2, 4].forEach((i) => nokta(c, gA2, [xsA[i], yA], [RENK.sekil, RENK.goruntu, RENK.goruntu][i / 2], 8));
    const t1 = renkli(c, svg, TX, 150, [['4', C4], ' + ', ['1', C1], ' = 5'], { hiza: 'start', size: 25 });
    const t2 = renkli(c, svg, TX, 202, ['2 × 5 = 10'], { hiza: 'start', size: 25 });
    gizle(gA2, t1, t2);
    gA2.style.opacity = 1; parA2.forEach((g) => { g.style.opacity = 1; });
    await par(c.say('4 ile 1’in toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.', { speak: 'Dört ile birin toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.' }), (async () => {
      await belir(c, t1, 400);
      await belir(c, t2, 400);
    })());
    c.note('<b>Paralel iki yansıma = öteleme.</b> Uzaklık = 2 × doğrular arası.', 'Öteleme', 'eb-iki-yansima-oteleme');
  }

  /* ---- 4. Doğruların arası değişirse ---- */
  async function arasiDegisirse(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const U1 = z.P(5, -0.4), V1 = z.P(5, 11.4), U2 = z.P(10, -0.4), V2 = z.P(10, 11.4);
    const P = z.N(ABC), P1 = P.map((k) => yansit(k, U1, V1)), P2 = P1.map((k) => yansit(k, U2, V2));
    const g1 = c.S('g', {}, svg), yA = P[0][1], yBrk = z.P(0, 1.7)[1];
    dogru(c, g1, U1, V1, { ad: 'd₁', adKay: [20, 22] });
    const d2 = dogru(c, g1, U2, V2, { ad: 'd₂', adKay: [20, 22] });
    cokgen(c, g1, P, RENK.sekil, { harf: HARF });
    const son = cokgen(c, g1, P2, RENK.goruntu);
    const yOk = oklu(c, g1, [P[0][0], yA], [P2[0][0], yA], '10', 0.7);
    const brk = aralik(c, g1, U1[0], U2[0], yBrk, '5');
    const ciz = (gap, yaz = true) => {
      const U = z.P(5 + gap, -0.4), V = z.P(5 + gap, 11.4);
      d2.koy(U, V);
      const Q = P1.map((k) => yansit(k, U, V)); son.koy(Q);
      const a = [P[0][0], yA], b = [Q[0][0], yA];
      yOk.o.ciz(ara(a, b, 0.02), ara(a, b, 0.98)); yOk.e.setAttribute('x', ara(a, b, 0.7)[0]);
      brk.koy(U1[0], U[0]);
      if (yaz) { yOk.e.textContent = TUR(2 * gap); brk.t.textContent = TUR(gap); }
    };
    let gap = 5;

    await c.say('Şimdi doğruların arasını değiştirelim.', { speak: '[curious] Şimdi doğruların arasını değiştirelim.' });
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Doğrular arasındaki uzaklık 6 birim olsaydı üçgen kaç birim ötelenirdi?',
      options: ['12 birim', '6 birim', '18 birim'], answer: 0,
      hints: ['', '6 birim doğruların arası; köşenin yolu bunu iki kez geçer.', 'Yol üç kat değil, iki kat.'],
      right: 'Evet. 2 × 6 = 12 birim.',
    });
    gizle(yOk.e, brk.t);
    await par(c.say('Doğrular 6 birim aralıklı: üçgen 12 birim ötelendi.', { speak: 'Doğrular altı birim aralıklı: üçgen on iki birim ötelendi.' }), (async () => {
      await c.tween(1300, (e) => ciz(5 + e, false), Ders.ease.inOut);
      gap = 6; ciz(6);
      await belir(c, [yOk.e, brk.t], 300);
    })());

    // Dene: d₂ kayar.
    await c.say('d₂ doğrusunu kaydır; öteleme uzaklığına bak.', { noWait: true });
    const sl = c.slider({ label: 'Doğrular arasındaki uzaklık', min: 4, max: 6, step: 0.5, value: 6, fmt: () => '', onInput: (v) => { gap = +v; ciz(gap); } });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    const im = c.S('g', {}, g1), d2x = z.P(5 + gap, 0)[0];
    dik(c, im, U1[0], yA); dik(c, im, d2x, yA);
    gizle(im);
    await par(c.say('Ötelemenin doğrultusu doğrulara dik, yönü d₁’den d₂’ye doğrudur.', { speak: 'Ötelemenin doğrultusu doğrulara dik, yönü d bir’den d iki’ye doğrudur.' }), belir(c, im, 450));

    // Tersinden: ötelemeden doğrular arasına.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const M = z.N([[0.5, 3.5], [0.5, 5.5], [2, 5.5]]), M2 = M.map((k) => otele(k, [14 * z.b, 0]));
    cokgen(c, g2, M, RENK.sekil); cokgen(c, g2, M2, RENK.goruntu);
    oklu(c, g2, M[0], M2[0], '14');
    const tAr = yazi(c, g2, TX, 150, 'aralık: ?', { hiza: 'start', size: 25, renk: RENK.dogru });
    const gD = c.S('g', {}, g2);
    dogru(c, gD, z.P(4, -0.4), z.P(4, 11.4), { ad: 'd₁', adKay: [20, 22] }); dogru(c, gD, z.P(11, -0.4), z.P(11, 11.4), { ad: 'd₂', adKay: [20, 22] });
    const brk2 = aralik(c, gD, z.P(4, 0)[0], z.P(11, 0)[0], yBrk, '7');
    gizle(gD);
    await c.choice({
      tag: 'Sıra sende', q: 'Usta bir motifi iki yansımayla 14 birim ötelemek istiyor. Paralel doğruları kaç birim aralıkla çizmelidir?',
      options: ['14 birim', '28 birim', '7 birim'], answer: 2,
      hints: ['14 birim aralık 28 birim öteleme verir.', '14 birim aralık 28 birim öteleme verir.', ''],
      right: 'Evet. Aralık ötelemenin yarısı: 7 birim.',
    });
    cevapla(tAr, 'aralık: 7');
    await par(c.say('Aralık, ötelemenin yarısı: 14 ÷ 2 = 7 birim.', { speak: 'Aralık, ötelemenin yarısı: on dört bölü iki, yedi birim.' }), belir(c, gD, 500));
    await c.say('Her öteleme, paralel iki doğruya yansımayla elde edilebilir.');
  }

  /* ---- 5. Son görüntü de eş ---- */
  async function esSekiller(c) {
    const svg = c.svg(1000, 562);
    const es = (p, x1, x2, y) => {
      const g = c.S('g', {}, p);
      cizgi(c, g, [x1, y], [x2, y], RENK.cizgi, 3); cizgi(c, g, [x1, y - 8], [x1, y], RENK.cizgi, 3); cizgi(c, g, [x2, y - 8], [x2, y], RENK.cizgi, 3);
      yazi(c, g, (x1 + x2) / 2, y + 30, 'eş', { size: 26, kalin: 700 });
      gizle(g);
      return g;
    };
    // Üç üçgen yan yana: ilk üçgen, ara görüntü, son görüntü.
    const g1 = c.S('g', {}, svg);
    const P = [[164, 150], [164, 326], [296, 326]];
    const U1 = [364, 70], V1 = [364, 480], U2 = [634, 70], V2 = [634, 480];
    const P1 = P.map((k) => yansit(k, U1, V1)), P2 = P1.map((k) => yansit(k, U2, V2));
    const dA = dogru(c, g1, [364, 70], [364, 365]), dB = dogru(c, g1, [634, 70], [634, 365]);
    const u = cokgen(c, g1, P, RENK.sekil, { harf: HARF });
    const orta = cokgen(c, g1, P1, RENK.goruntu); orta.g.style.opacity = 0.35;
    const son = cokgen(c, g1, P2, RENK.goruntu, { harf: HARF2 });
    const m1 = es(g1, 244, 484, 400), m2 = es(g1, 512, 756, 400), m3 = es(g1, 244, 756, 468);
    gizle(dA.g, orta.g, dB.g, son.g, m1, m2, m3);

    await par(c.say('İlk yansımada görüntü üçgene eşti.'), par(belir(c, [dA.g, orta.g], 450), (async () => { await c.wait(350); await belir(c, m1, 450); })()));
    await par(c.say('İkinci yansıma da ölçüleri değiştirmedi.'), par(belir(c, [dB.g, son.g], 450), (async () => { await c.wait(350); await belir(c, m2, 450); })()));
    await par(c.say('Öyleyse son görüntü ilk üçgene eştir.'), belir(c, m3, 500));

    // Sor: çevre.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg), s = 26, X = 580;
    const T = [[80, 150], [80, 150 + 6 * s], [80 + 8 * s, 150 + 6 * s]], T2 = T.map((k) => otele(k, [X, 0]));
    cokgen(c, g2, T, RENK.sekil); cokgen(c, g2, T2, RENK.goruntu);
    const yaz = (p, dx, renk) => [
      yazi(c, p, T[0][0] - 24 + dx, 150 + 3 * s + 8, '6', { size: 26, kalin: 700, renk }),
      yazi(c, p, T[0][0] + 4 * s + dx, 150 + 6 * s + 34, '8', { size: 26, kalin: 700, renk }),
      yazi(c, p, T[0][0] + 4 * s + 15 + dx, 150 + 3 * s - 13, '10', { size: 26, kalin: 700, renk }),
    ];
    yaz(g2, 0, RENK.sekil);
    const gE = c.S('g', {}, g2); yaz(gE, X, RENK.goruntu); gizle(gE);
    const tc = yazi(c, g2, T2[0][0] + 4 * s, 440, 'çevre: ?', { size: 26, kalin: 700, renk: RENK.goruntu });
    gizle(g2); await belir(c, g2, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Kenarları 6, 8 ve 10 cm olan bir üçgen paralel iki doğruya göre art arda yansıtıldı. Son görüntünün çevresi kaç cm’dir?',
      options: ['48 cm', '12 cm', '24 cm'], answer: 2,
      hints: ['İki yansıma uzunlukları iki katına çıkarmaz.', 'Ölçüler küçülmez; son görüntü ilk üçgene eştir.', ''],
      right: 'Evet. 6 + 8 + 10 = 24 cm.',
    });
    cevapla(tc, 'çevre: 24 cm');
    await par(c.say('Son görüntü eş: kenarları 6, 8 ve 10; çevresi 24 cm.', { speak: 'Son görüntü eş: kenarları altı, sekiz ve on; çevresi yirmi dört santimetre.' }), belir(c, gE, 450));

    // Sonuç: doğrular, yeşil ok ve iki ölçü.
    c.clearSay();
    await belir(c, [gE, tc], 350, 0);
    [...gE.childNodes, tc].forEach((e) => e.remove());
    const dx1 = 330, dx2 = 620, gS = c.S('g', {}, g2);
    dogru(c, gS, [dx1, 70], [dx1, 450], { ad: 'd₁', adKay: [14, 12] }); dogru(c, gS, [dx2, 70], [dx2, 450], { ad: 'd₂', adKay: [14, 12] });
    const ab = aralik(c, gS, dx1, dx2, 400, 'aralık');
    const yo = oklu(c, gS, T[0], T2[0], '2 × aralık', 0.65, 14);
    gizle(gS);
    await par(c.say('Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.'), belir(c, gS, 600));
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a3', kicker: 'Konu A · Geometrik dönüşümler', title: 'Öteleme, iki yansımadır', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Öteleme, iki yansımadır',
      hook: 'Karşılıklı iki aynanın arasında durunca ikinci görüntün neden sana <b>ters değil, düz</b> bakar?',
      button: 'Derse başla ›',
    },
    goals: ['Paralel iki doğruya art arda yansımanın bir öteleme olduğunu söyler.', 'Öteleme uzaklığını, doğrular arasındaki uzaklığın iki katı olarak bulur.', 'Son görüntünün ilk şekle eş olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Dönmede ve yansımada uzaklıkların nasıl olduğunu hatırla.', run: hatirla },
      { title: 'İki yansıma art arda', goal: 'Üçgeni paralel iki doğruya göre art arda yansıt; sonucu yorumla.', run: artArda },
      { title: 'Ne kadar kaydı?', goal: 'Köşenin yolunu dört parçada izle; öteleme uzaklığını bul.', run: kadarKaydi },
      { title: 'Doğruların arası değişirse', goal: 'Doğrular arasındaki uzaklık değişince öteleme uzaklığı nasıl değişir?', run: arasiDegisirse },
      { title: 'Son görüntü de eş', goal: 'İki yansımadan sonra da görüntü şekle eştir.', run: esSekiller },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Aralarında 4 cm olan paralel iki doğruya göre art arda yansıtılan bir şekil kaç cm ötelenmiş olur?',
        options: ['4 cm', '16 cm', '8 cm'], answer: 2,
        why: ['4 cm yalnızca doğruların arasıdır; öteleme bunun iki katıdır.', 'Yol aralığın dört katı değil, iki katıdır.', 'Öteleme aralığın iki katıdır: 2 × 4 = 8 cm.'],
        scene: 2,
      },
      {
        q: 'Paralel iki doğruya göre art arda iki kez yansıtılan bir şeklin son görüntüsü için hangisi doğrudur?',
        options: ['Ters çevrilmemiştir; ilk şekille aynı duruştadır', 'Ters çevrilmiştir', 'İlk şeklin iki katı büyüklüğündedir'], answer: 0,
        why: ['İki ters çevirme birbirini götürür; şekil yalnızca kayar.', 'Birinci yansıma ters çevirir, ikincisi onu yeniden düzeltir.', 'Yansıma ölçüyü değiştirmez; son görüntü ilk şekle eştir.'],
        scene: 1,
      },
      {
        q: 'Bir şekil iki yansımayla 20 cm ötelenecek. Paralel doğrular kaç cm aralıklı olmalıdır?',
        options: ['20 cm', '10 cm', '40 cm'], answer: 1,
        why: ['20 cm aralık 40 cm öteleme verir.', 'Aralık ötelemenin yarısıdır; 10 cm aralığın iki katı 20 cm eder.', '40 cm aralık 80 cm öteleme verir.'],
        scene: 3,
      },
      {
        q: 'Bir üçgen, aralarında 9 cm olan paralel iki doğruya göre art arda yansıtılıyor. A köşesi birinci doğruya 2 cm, B köşesi 6 cm uzakta. Köşelerin son görüntülerine uzaklıkları nedir?',
        options: ['A 4 cm, B 12 cm', 'A 18 cm, B 22 cm', 'İkisi de 18 cm'], answer: 2,
        why: ['Bunlar birinci doğruya uzaklığın iki katıdır; öteleme doğrular arasının iki katıdır.', 'Ötelemede bütün noktalar aynı uzaklıkta kayar; B de 18 cm kayar.', 'Her köşe doğrular arasının iki katı kadar kayar: 2 × 9 = 18 cm.'],
        scene: 2,
      },
      {
        q: 'İki paralel yansımayla elde edilen ötelemenin doğrultusu nasıldır?',
        options: ['Doğrulara paraleldir', 'Doğrulara diktir', 'Doğrularla 45° yapar'], answer: 1,
        why: ['Köşenin yolu doğrulara paralel değil, dik bir çizgi üstündedir.', 'Köşe doğrulara dik bir çizgi boyunca kayar.', 'Öteleme doğrulara dik doğrultudadır, eğik değil.'],
        scene: 3,
      },
    ],
    summary: [
      'Paralel iki doğruya art arda yansıma, şekli ters çevirmeden kaydırır.',
      'Öteleme uzaklığı doğrular arasındaki uzaklığın iki katıdır.',
      '<b>Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.</b>',
      'Son görüntü ilk şekle <b>eştir</b>.',
    ],
    nextLesson: { href: 'a4-donme-iki-yansima.html', label: 'Sonraki: Dönme, iki yansımadır ›' },
  });
})();
