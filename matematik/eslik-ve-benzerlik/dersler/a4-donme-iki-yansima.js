/* A4 — Dönme, iki yansımadır
   Kesişen iki doğruya göre art arda yansıma bir dönmedir: merkez doğruların kesim noktası, açı doğrular arasındaki açının iki katı.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md
   Ders zeminsiz çizilir: her şey O noktası çevresinde açıyla ve yarıçapla kurulur (ekranda saat yönü artı, saatin tersi eksi). */
(() => {
  'use strict';
  const { RENK, rad, yon, ileri, ara, araHepsi, yansit, dondur, yazi, renkli, cizgi, koy, nokta, gizle, belir, par, cevapla, cokgen, dogru, ok, dolasma } = window.KIT;
  const { merkezNokta, halka, donenCokgen, donuyor, yayIz, merkezAci, yaricap } = window.KIT_A;

  const HARF = ['A', 'B', 'C'], HARF2 = ['A″', 'B″', 'C″'];
  const R15 = 'var(--c6)', R30 = RENK.cizgi;       // 15° parçaları turkuaz, 30° parçaları açık gri-mavi
  const U = 46;                                    // bir birim, px

  /* ---- zeminsiz geometri: O merkezli, d₁ yatay, d₂ yukarı doğru phi derece ---- */
  const OA = 7, OB = 6, OC = 3.5;                  // |OA|, |OB| (6 birim), |OC|
  function geo(O, phi = 45, u = U) {
    const nk = (a, r) => ileri(O, rad(a), r * u);
    const T0 = [nk(15, OA), nk(30, OB), nk(22.5, OC)];          // OA, d₁ ile 15°; OB, d₁ ile 30°
    const V1 = ileri(O, 0, 100), V2 = ileri(O, rad(-phi), 100);
    const T1 = T0.map((P) => yansit(P, O, V1)), T2 = T1.map((P) => yansit(P, O, V2));
    return {
      O, u, phi, T0, T1, T2, nk,
      d1: [ileri(O, Math.PI, 1.2 * u), ileri(O, 0, 8.2 * u)],
      d2: [ileri(O, rad(180 - phi), 1.2 * u), ileri(O, rad(-phi), 8.2 * u)],
    };
  }
  const harf = (c, p, O, P, m, renk, d = 24) => { const q = ileri(P, yon(O, P), d); return yazi(c, p, q[0], q[1] + 8, m, { size: 24, kalin: 700, renk }); };
  const yol = (O, r, a0, a1) => {
    const P0 = ileri(O, rad(a0), r), P1 = ileri(O, rad(a1), r);
    return `M${P0[0]},${P0[1]} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${P1[0]},${P1[1]}`;
  };
  /* O çevresinde a0'dan a1'e (derece) yay ve dış tarafında etiketi. */
  function aciIsareti(c, p, O, r, a0, a1, renk, metin, er, w = 5) {
    const g = c.S('g', {}, p);
    const sg = Math.sign(a1 - a0) * 1.3;
    const yay = c.S('path', { d: yol(O, r, a0 + sg, a1 - sg), fill: 'none', stroke: renk, 'stroke-width': w, 'stroke-linecap': 'round' }, g);
    const q = ileri(O, rad((a0 + a1) / 2), er);
    const etiket = yazi(c, g, q[0], q[1] + 8, metin, { size: 24, kalin: 700, renk });
    return { g, yay, etiket };
  }
  const atar = (c, hedefler, ms = 350) => belir(c, hedefler, ms, 0);

  /* d₁ ve d₂ doğruları. */
  function dogrular(c, p, g) {
    const d1 = dogru(c, p, g.d1[1], g.d1[0], { ad: 'd₁', adKay: [10, 8] });
    const d2 = dogru(c, p, g.d2[1], g.d2[0], { ad: 'd₂', adKay: [8, -10] });
    return { d1, d2 };
  }

  /* Dikey iki paralel doğru, solda üçgen ve iki yansımayla elde edilen görüntüsü (a: doğrular arası, birim). */
  function paralel(c, p, o) {
    const { cx, cy, u, a } = o, h = o.h || 3.4, G = c.S('g', {}, p);
    const x1 = cx - ((2 * a - 4.5) / 2) * u, x2 = x1 + a * u;
    const Pt = (s, t) => [x1 + s * u, cy + t * u];
    const U1 = [x1, cy - h * u], V1 = [x1, cy + h * u], U2 = [x2, cy - h * u], V2 = [x2, cy + h * u];
    const L1 = dogru(c, G, U1, V1, o.ad ? { ad: 'd₁', adKay: [0, -14] } : {});
    const L2 = dogru(c, G, U2, V2, o.ad ? { ad: 'd₂', adKay: [0, -14] } : {});
    const T = [[-3.4, -1.3], [-1.2, -0.9], [-2.6, 1.3]].map(([s, t]) => Pt(s, t));
    const I = T.map((q) => yansit(yansit(q, U1, V1), U2, V2));
    const t = cokgen(c, G, T, RENK.sekil), im = cokgen(c, G, I, RENK.goruntu);
    return { G, L1, L2, T, I, t, im, x1, x2, cy, u, cizgiler: [L1.g, L2.g] };
  }
  /* İki dikey çizgi arasında uzaklık işareti. */
  function aralik(c, p, x1, x2, y, metin, renk) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [x1, y], [x2, y], renk, 3); cizgi(c, g, [x1, y - 8], [x1, y + 8], renk, 3); cizgi(c, g, [x2, y - 8], [x2, y + 8], renk, 3);
    const t = yazi(c, g, (x1 + x2) / 2, y - 12, metin, { size: 24, kalin: 700, renk });
    return { g, t };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');

    // 1) Paralel iki doğruya göre art arda yansıma: öteleme uzaklığı.
    const G1 = c.S('g', {}, svg), k = paralel(c, G1, { cx: 500, cy: 310, u: 38, a: 6, ad: true });
    const br = aralik(c, G1, k.x1, k.x2, k.cy - 2.6 * k.u, '6', RENK.cizgi);
    const ak = c.S('g', {}, G1);
    ok(c, ak, ara(k.T[0], k.I[0], 0.03), ara(k.T[0], k.I[0], 0.97));
    const cv = yazi(c, ak, (k.T[0][0] + k.I[0][0]) / 2, k.T[0][1] - 16, '?', { size: 26, kalin: 700, renk: RENK.ok });
    gizle(G1, k.im.g, ak);
    await belir(c, G1, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Bir şekil, aralarında 6 birim olan paralel iki doğruya göre art arda yansıtıldı. Kaç birim ötelenmiş olur?',
      options: ['6 birim', '3 birim', '12 birim'], answer: 2,
      hints: ['Öteleme uzaklığı, doğrular arasındaki uzaklığın iki katıdır.', 'Öteleme uzaklığı, doğrular arasındaki uzaklığın iki katıdır.', ''],
      right: 'Evet. 2 × 6 = 12 birim.',
    });
    cevapla(cv, '12');
    await par(c.say('Öteleme uzaklığı, doğrular arası uzaklığın iki katıdır.'), belir(c, [k.im.g, ak], 600));
    await c.wait(500);

    // 2) Dönmeyi belirleyenler.
    c.clearSay();
    await atar(c, G1); G1.remove();
    const G2 = c.S('g', {}, svg), O = [560, 360], P = [[330, 250], [430, 220], [400, 330]];
    const mer = merkezNokta(c, G2, O, null);
    yazi(c, mer.g, O[0] + 6, O[1] + 36, 'O', { size: 24, kalin: 700, renk: RENK.merkez });
    const sek = donenCokgen(c, G2, O, P, RENK.sekil), gor = donenCokgen(c, G2, O, P, RENK.goruntu);
    const iz = yayIz(c, G2, O, P[0], { renk: RENK.merkez, w: 3 }), aci = merkezAci(c, G2, O, P[0], 0, { r: 60, etiketR: 100 });
    gizle(G2, gor.g, iz.g);
    await belir(c, G2, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dönmeyi hangileri belirler?',
      options: ['Yalnızca açı', 'Merkez, açı ve yön', 'Bir doğru ve bir uzaklık'], answer: 1,
      hints: ['Dönme bir merkez çevresinde, bir açı kadar, bir yönde olur.', '', 'Dönme bir merkez çevresinde, bir açı kadar, bir yönde olur.'],
      right: 'Evet. Merkez, açı ve yön.',
    });
    await par(c.say('Dönme bir merkez çevresinde, bir açı kadar, bir yönde olur.'), (async () => {
      await belir(c, [gor.g, iz.g], 300);
      await donuyor(c, [gor, iz], 0, 90, 1700);
      aci.don(90);
    })());
  }

  /* ---- 2. Doğrular kesişirse ---- */
  async function kesisirse(c) {
    const svg = c.svg(1000, 562), g = geo([325, 371], 45), { O, T0, T1, T2 } = g;
    const { d1, d2 } = dogrular(c, svg, g);
    const mer = merkezNokta(c, svg, O), fa = aciIsareti(c, svg, O, 62, 0, -45, RENK.dogru, '45°', 92);
    const t0 = cokgen(c, svg, T0, RENK.sekil, { harf: HARF });
    const t1 = cokgen(c, svg, T0, RENK.goruntu);
    const t2 = cokgen(c, svg, T1, RENK.goruntu, { harf: HARF2 });
    gizle(d1.g, d2.g, t0.g, t1.g, t2.g, mer.g, fa.g, t2.adlar);

    await par(c.say('Geçen derste yansıma doğruları paraleldi; şimdi kesişiyorlar.'), belir(c, [d1.g, d2.g, t0.g], 600));
    await par(c.say('d₁ ile d₂, O noktasında kesişiyor; aralarındaki açı 45°.', { speak: 'd bir ile d iki, O noktasında kesişiyor; aralarındaki açı kırk beş derece.' }), (async () => { await belir(c, mer.g, 300); await halka(c, svg, O); await belir(c, fa.g, 400); })());

    // d₁'e göre yansıma: ters çevrilir.
    const a0 = dolasma(c, svg, T0, RENK.sekil), a1 = dolasma(c, svg, T1, RENK.goruntu);
    gizle(a0, a1);
    await par(c.say('Üçgeni önce d₁’e göre yansıtalım: görüntü ters çevrildi.', { speak: 'Üçgeni önce d bire göre yansıtalım: görüntü ters çevrildi.' }), (async () => {
      await belir(c, t1.g, 250);
      await c.tween(1500, (e) => t1.koy(araHepsi(T0, T1, e)), Ders.ease.inOut);
      await belir(c, [a0, a1], 450);
    })());

    // d₂'ye göre yansıma: yeniden düz.
    await par(c.say('Şimdi bu görüntüyü d₂’ye göre yansıtalım: yeniden düz.', { speak: 'Şimdi bu görüntüyü d ikiye göre yansıtalım: yeniden düz.' }), (async () => {
      await par(atar(c, [a0, a1], 300), belir(c, t1.g, 300, 0.3));
      a0.remove(); a1.remove();
      await belir(c, t2.g, 250);
      await c.tween(1500, (e) => t2.koy(araHepsi(T1, T2, e)), Ders.ease.inOut);
      await belir(c, t2.adlar, 350);
    })());

    // Ara görüntü silinir.
    await par(c.say('Aradaki görüntüyü silip ilk üçgen ile son görüntüye bakalım.'), atar(c, t1.g, 500));
    t1.g.remove();

    // Dolaşma yönü aynı: ters çevrilmemiş.
    const b0 = dolasma(c, svg, T0, RENK.sekil), b2 = dolasma(c, svg, T2, RENK.goruntu);
    gizle(b0, b2);
    await par(c.say('Son görüntü ters çevrilmemiş: bu tek bir yansıma olamaz.'), belir(c, [b0, b2], 500));

    // Köşeler farklı uzaklıklarda yer değiştirmiş.
    const ch = c.S('g', {}, svg);
    cizgi(c, ch, T0[0], T2[0], RENK.cizgi, 2.5, { 'stroke-dasharray': '5 6' });
    cizgi(c, ch, T0[2], T2[2], RENK.cizgi, 2.5, { 'stroke-dasharray': '5 6' });
    gizle(ch);
    await par(c.say('Köşeler farklı uzaklıklarda yer değiştirmiş: öteleme de değil.'), belir(c, ch, 500));

    await c.choice({
      tag: 'Sıra sende', q: 'Şekli ters çevirmeyen ama baktığı yönü değiştiren dönüşüm hangisiydi?',
      options: ['Dönme', 'Öteleme', 'Yansıma'], answer: 0,
      hints: ['', 'Öteleme şeklin baktığı yönü değiştirmez.', 'Yansıma şekli ters çevirir; burada çevrilmemiş.'],
      right: 'Evet. Ters çevirmez ama baktığı yönü değiştirir: dönme.',
    });

    // İlk üçgen son görüntüye dönerek ulaşır.
    const rot = donenCokgen(c, svg, O, T0, RENK.goruntu), iz = yayIz(c, svg, O, T0[0], { renk: RENK.merkez, w: 3 });
    gizle(rot.g, iz.g);
    await par(c.say('Kesişen iki doğruya art arda yansıma bir dönmedir.'), (async () => {
      await par(atar(c, [t2.g, b0, b2, ch], 350), belir(c, [rot.g, iz.g], 350));
      await donuyor(c, [rot, iz], 0, -90, 1700);
      t2.g.style.opacity = 1; rot.g.remove();
    })());
  }

  /* ---- 3. Merkez neresi? ---- */
  async function merkez(c) {
    const svg = c.svg(1000, 562), g = geo([325, 371], 45), { O, T0, T1, T2 } = g, u = g.u;
    const fig = c.S('g', {}, svg);
    const { d1, d2 } = dogrular(c, fig, g);
    const t0 = cokgen(c, fig, T0, RENK.sekil), t1 = cokgen(c, fig, T1, RENK.goruntu, { dolgu: 0.1 }), t2 = cokgen(c, fig, T2, RENK.goruntu);
    t1.g.style.opacity = 0.3;
    const mer = merkezNokta(c, svg, O);
    const arcA = c.S('path', { d: '', fill: 'none', stroke: R30, 'stroke-width': 3, 'stroke-dasharray': '8 7', 'stroke-linecap': 'round' }, svg);
    const gA = c.S('g', {}, svg);
    const rayA = [T0[0], T1[0], T2[0]].map((P) => cizgi(c, gA, O, O, RENK.merkez, 3));
    const hat = (i) => [T0[0], T1[0], T2[0]][i];
    const tick = c.S('g', {}, gA);
    [T0[0], T1[0], T2[0]].forEach((P) => {
      const m = ara(O, P, 0.5), q = ileri(m, yon(O, P) + Math.PI / 2, 9), w = ileri(m, yon(O, P) - Math.PI / 2, 9);
      cizgi(c, tick, q, w, RENK.merkez, 3.5);
    });
    const hA = [harf(c, gA, O, T0[0], 'A', RENK.sekil), harf(c, gA, O, T1[0], 'A′', RENK.goruntu), harf(c, gA, O, T2[0], 'A″', RENK.goruntu)];
    gizle(fig, mer.g, tick, hA);

    await par(c.say('Bir dönmenin merkezi yerinden oynamayan noktadır.'), belir(c, fig, 600));

    // Doğru üstündeki nokta yerinde kalır.
    const Pn = ileri(O, 0, 5 * u), nd = nokta(c, svg, Pn, RENK.dogru, 8);
    gizle(nd);
    await par(c.say('Yansımada doğrunun üstündeki nokta yerinde kalıyordu.'), (async () => { await belir(c, nd, 300); await halka(c, svg, Pn, RENK.dogru, 8, 30); })());
    await par(c.say('O noktası iki doğrunun da üstünde: iki yansımada da yerinde kalır.'), (async () => { await atar(c, nd, 250); nd.remove(); await belir(c, mer.g, 300); await halka(c, svg, O); })());
    await par(c.say('Demek ki dönme merkezi, doğruların kesim noktası O.'), halka(c, svg, O, RENK.merkez, 9, 40, 1100));

    // A, A′, A″ noktaları O'ya birleşir.
    await par(c.say('A, A′ ve A″ noktalarını O’ya birleştirelim.', { speak: 'A, A üssü ve A iki üssü noktalarını O’ya birleştirelim.' }), (async () => {
      for (let i = 0; i < 3; i++) {
        belir(c, hA[i], 300);
        await c.tween(450, (e) => koy(rayA[i], O, ara(O, hat(i), e)));
      }
    })());
    await par(c.say('Yansıma uzunluğu değiştirmez: bu üç doğru parçası eşit.'), (async () => {
      await belir(c, tick, 400);
      await c.tween(700, (e) => rayA.forEach((r) => r.setAttribute('stroke-width', 3 + 3 * Math.sin(Math.PI * e))));
    })());
    await par(c.say('Üç nokta da merkezi O olan aynı çember üzerinde.'), c.tween(1500, (e) => arcA.setAttribute('d', e < 0.01 ? '' : yol(O, OA * u, 15, 15 - 90 * e))));

    // B köşesi: 6 birim.
    c.clearSay();
    await atar(c, gA, 350); gA.remove();
    await belir(c, arcA, 300, 0.3);
    const gB = c.S('g', {}, svg);
    const yB = yaricap(c, gB, O, T0[1], '6', RENK.merkez, { taraf: 1, kay: 22 });
    const yB2 = yaricap(c, gB, O, T2[1], '?', RENK.merkez, { taraf: -1, t: 0.35, kay: 24 });
    const hB = [harf(c, gB, O, T0[1], 'B', RENK.sekil), harf(c, gB, O, T2[1], 'B″', RENK.goruntu)];
    const arcB = c.S('path', { d: '', fill: 'none', stroke: R30, 'stroke-width': 3, 'stroke-dasharray': '8 7', 'stroke-linecap': 'round' }, svg);
    gizle(gB);
    await belir(c, gB, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'B köşesi O’ya 6 birim uzakta. Son görüntüsü B″, O’ya kaç birim uzaktadır?',
      options: ['12 birim', '3 birim', '6 birim'], answer: 2,
      hints: ['İki yansıma uzunluğu iki katına çıkarmaz.', 'B ile B″ aynı çemberin üzerindedir.', ''],
      right: 'Evet. B″ da O’ya 6 birim uzakta.',
    });
    cevapla(yB2.etiket, '6');
    await par(c.say('Her köşe kendi çemberinde, O çevresinde döner.'), (async () => {
      await c.tween(1400, (e) => arcB.setAttribute('d', e < 0.01 ? '' : yol(O, OB * u, 30, 30 - 90 * e)));
      await belir(c, arcA, 400);
    })());
  }

  /* ---- 4. Açı kaç derece? ---- */
  async function aciKac(c) {
    const svg = c.svg(1000, 562), g = geo([165, 371], 45), { O, T0, T1, T2 } = g, u = g.u;
    const fig = c.S('g', {}, svg);
    const { d1, d2 } = dogrular(c, fig, g);
    const t0 = cokgen(c, fig, T0, RENK.sekil), t1 = cokgen(c, fig, T1, RENK.goruntu, { dolgu: 0.1 }), t2 = cokgen(c, fig, T2, RENK.goruntu);
    t0.g.style.opacity = 0.4; t1.g.style.opacity = 0.2; t2.g.style.opacity = 0.4;
    merkezNokta(c, fig, O);
    const SX = 610;

    // A için: ışınlar, harfler, yol, dört açı parçası.
    const gA = c.S('g', {}, svg);
    [T0[0], T1[0], T2[0]].forEach((P) => cizgi(c, gA, O, P, RENK.merkez, 2.5));
    const hA = c.S('g', {}, gA);
    harf(c, hA, O, T0[0], 'A', RENK.sekil); harf(c, hA, O, T1[0], 'A′', RENK.goruntu); harf(c, hA, O, T2[0], 'A″', RENK.goruntu);
    const yA = yayIz(c, gA, O, T0[0], { renk: RENK.merkez, w: 2.5, derece: -90 });
    const a = [
      aciIsareti(c, gA, O, 100, 15, 0, R15, '15°', 145),
      aciIsareti(c, gA, O, 100, 0, -15, R15, '15°', 145),
      aciIsareti(c, gA, O, 100, -15, -45, R30, '30°', 145),
      aciIsareti(c, gA, O, 100, -45, -75, R30, '30°', 145),
    ];
    const toplam = renkli(c, gA, SX, 150, [['15°', R15], ' + ', ['15°', R15], ' + ', ['30°', R30], ' + ', ['30°', R30], ' = ', ['90°', RENK.merkez]], { hiza: 'start', size: 23 });
    gizle(fig, hA, yA.g, ...a.map((x) => x.g), toplam);

    await par(c.say('Şimdi A’nın O çevresinde kaç derece döndüğünü bulalım.'), belir(c, [fig, hA, yA.g], 600));
    await par(c.say('OA, d₁ ile 15° yapıyor; OA′ öbür yanda, yine 15°.', { speak: 'O A, d bir ile on beş derece yapıyor; O A üssü öbür yanda, yine on beş derece.' }), (async () => { await belir(c, a[0].g, 450); await belir(c, a[1].g, 450); })());
    await par(c.say('Doğrular arası 45°; OA′ ile d₂ arasında 30° kalıyor.', { speak: 'Doğrular arası kırk beş derece; O A üssü ile d iki arasında otuz derece kalıyor.' }), belir(c, a[2].g, 500));
    await par(c.say('İkinci yansıma: OA″, d₂’nin öbür yanında 30° ötede.', { speak: 'İkinci yansıma: O A iki üssü, d ikinin öbür yanında otuz derece ötede.' }), belir(c, a[3].g, 500));
    await par(c.say('Toplam: 15 + 15 + 30 + 30 = 90°.', { speak: 'Toplam: on beş artı on beş artı otuz artı otuz, doksan derece.' }), belir(c, toplam, 500));

    // Birlikte çöz: B için.
    c.clearSay();
    await atar(c, [gA], 350); gA.remove();
    const gB = c.S('g', {}, svg);
    [T0[1], ileri(O, rad(-30), OB * u), T2[1]].forEach((P) => cizgi(c, gB, O, P, RENK.merkez, 2.5));
    const B1 = ileri(O, rad(-30), OB * u);
    harf(c, gB, O, T0[1], 'B', RENK.sekil); harf(c, gB, O, B1, 'B′', RENK.goruntu); harf(c, gB, O, T2[1], 'B″', RENK.goruntu);
    const b = [
      aciIsareti(c, gB, O, 100, 30, 0, R30, '30°', 145),
      aciIsareti(c, gB, O, 100, 0, -30, R30, '30°', 145),
      aciIsareti(c, gB, O, 100, -30, -45, R15, '?', 215),
      aciIsareti(c, gB, O, 100, -45, -60, R15, '?', 215),
    ];
    gizle(gB);
    await belir(c, gB, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'OB, d₁ ile 30° yapıyor; OB′ öbür yanda yine 30°. OB′ ile d₂ arasında kaç derece kalır ve B toplam kaç derece döner?',
      options: ['30° kalır; toplam 120°', '15° kalır; toplam 60°', '15° kalır; toplam 90°'], answer: 2,
      hints: ['Doğrular arası 45°; 30°si geçildi.', 'Dört parçayı topla: 30 + 30 + 15 + 15.', ''],
      right: 'Evet. 15° kalır; 30 + 30 + 15 + 15 = 90°.',
    });
    cevapla(b[2].etiket, '15°'); cevapla(b[3].etiket, '15°');
    const yB = yayIz(c, gB, O, T0[1], { renk: RENK.merkez, w: 3, derece: -90 });
    const s1 = renkli(c, svg, SX, 150, [['90°', RENK.merkez], ' = 2 × ', ['45°', RENK.dogru]], { hiza: 'start', size: 26 });
    gizle(yB.g, s1);
    await par(c.say('A da B de 90° döndü: doğrular arasındaki açının iki katı.', { speak: 'A da B de doksan derece döndü: doğrular arasındaki açının iki katı.' }), belir(c, [yB.g, s1], 600));
    const s2 = renkli(c, svg, SX, 210, [['15°', R15], ' + ', ['30°', R30], ' = ', ['45°', RENK.dogru]], { hiza: 'start', size: 26 });
    gizle(s2);
    await par(c.say('15 ile 30’un toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.', { speak: 'On beş ile otuzun toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.' }), (async () => {
      await belir(c, s2, 450);
      await c.tween(900, (e) => b.forEach((x) => x.yay.setAttribute('stroke-width', 5 + 4 * Math.sin(Math.PI * e))));
    })());
    c.note('<b>Kesişen iki yansıma = dönme.</b> Merkez kesim noktası; açı 2 katı.', 'İki yansıma, bir dönme', 'eb-iki-yansima');
  }

  /* ---- 5. Açı değişirse ---- */
  /* Kaydırıcıyla değişen çizim: d₂ phi derece açıda; son görüntü ve iki açı ona göre güncellenir. */
  function sekil5(c, svg, O, phi) {
    const g = geo(O, phi), G = c.S('g', {}, svg);
    const d1 = dogru(c, G, g.d1[1], g.d1[0], { ad: 'd₁', adKay: [10, 8] });
    const d2 = dogru(c, G, g.d2[1], g.d2[0], { ad: 'd₂', adKay: [8, -10] });
    const t0 = cokgen(c, G, g.T0, RENK.sekil), t2 = cokgen(c, G, g.T2, RENK.goruntu);
    const mer = merkezNokta(c, G, O);
    const fa = aciIsareti(c, G, O, 55, 0, -phi, RENK.dogru, phi + '°', 85);
    const aci = merkezAci(c, G, O, g.T0[0], -2 * phi, { r: 125, etiketR: 172 });
    const f = { G, d1, d2, t0, t2, fa, aci, phi, O };
    f.guncelle = (p2, sayi = true) => {
      const h = geo(O, p2);
      f.phi = p2;
      d2.koy(h.d2[1], h.d2[0]); t2.koy(h.T2);
      fa.yay.setAttribute('d', yol(O, 55, 0, -p2));
      const q = ileri(O, rad(-p2 / 2), 85);
      fa.etiket.setAttribute('x', q[0]); fa.etiket.setAttribute('y', q[1] + 8);
      fa.etiket.textContent = sayi ? p2 + '°' : '';
      aci.don(-2 * p2);
      if (!sayi) aci.etiket.textContent = '';
    };
    return f;
  }
  async function aciDegisirse(c) {
    const svg = c.svg(1000, 562), O = [325, 371];
    const f = sekil5(c, svg, O, 45);
    gizle(f.G);
    await par(c.say('Burada doğrular arası 45°, dönme açısı 90°.', { speak: 'Burada doğrular arası kırk beş derece, dönme açısı doksan derece.' }), belir(c, f.G, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'Doğrular arasındaki açı 60° olsaydı üçgen kaç derece dönerdi?',
      options: ['60°', '120°', '30°'], answer: 1,
      hints: ['60° doğruların arası; dönme bunun iki katıdır.', '', 'Dönme açısı yarıya inmez, iki katına çıkar.'],
      right: 'Evet. 2 × 60° = 120°.',
    });
    await par(c.say('Doğrular arası 60°: üçgen 120° döndü.', { speak: 'Doğrular arası altmış derece: üçgen yüz yirmi derece döndü.' }), (async () => {
      await c.tween(1500, (e) => f.guncelle(45 + 15 * e, false), Ders.ease.inOut);
      f.guncelle(60);
    })());

    // Dene.
    await c.say('d₂ doğrusunu çevir; dönme açısına bak.', { noWait: true, speak: 'd iki doğrusunu çevir; dönme açısına bak.' });
    const sl = c.slider({ label: 'Doğrular arasındaki açı', min: 30, max: 60, step: 5, value: 60, fmt: (v) => v + '°', onInput: (v) => f.guncelle(v) });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();

    // Dönmenin yönü.
    const p = f.phi;
    const y1 = yayIz(c, f.G, O, ileri(O, 0, 215), { renk: RENK.dogru, w: 3, derece: -p });
    const y2 = yayIz(c, f.G, O, f.t0.pts()[0], { renk: RENK.merkez, w: 3, derece: -2 * p });
    gizle(y1.g, y2.g);
    await par(c.say('Dönmenin yönü d₁’den d₂’ye doğrudur.', { speak: 'Dönmenin yönü d birden d ikiye doğrudur.' }), belir(c, [y1.g, y2.g], 600));

    // 80° için doğrular arası açı.
    c.clearSay();
    await atar(c, f.G, 350); f.G.remove();
    const h = sekil5(c, svg, O, 40);
    gizle(h.G, h.d2.g, h.fa.g);
    await belir(c, h.G, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Usta bir motifi iki yansımayla 80° döndürmek istiyor. Doğrular arasındaki açı kaç derece olmalıdır?',
      options: ['80°', '160°', '40°'], answer: 2,
      hints: ['80° açılı doğrular 160° döndürür.', '80° açılı doğrular 160° döndürür.', ''],
      right: 'Evet. Doğrular arası açı, dönme açısının yarısıdır.',
    });
    cevapla(h.fa.etiket, '40°');
    await par(c.say('Doğrular arası 40° olunca motif 80° döner.', { speak: 'Doğrular arası kırk derece olunca motif seksen derece döner.' }), belir(c, [h.d2.g, h.fa.g], 600));
    await c.say('Her dönme, merkezde kesişen iki doğruya yansımayla elde edilebilir.');
  }

  /* ---- 6. İki yansıma: öteleme mi, dönme mi? ---- */
  /* İki bölme: solda paralel doğrular (öteleme), sağda kesişen doğrular (dönme). */
  function ikiPencere(c, p) {
    const W = 460, Y0 = 70, H = 400, X = [25, 515];
    const G = c.S('g', {}, p), cerceve = c.S('g', {}, G);
    X.forEach((x) => c.S('rect', { x, y: Y0, width: W, height: H, rx: 14, fill: 'none', stroke: RENK.kenarlik, 'stroke-width': 2 }, cerceve));
    const baslik = (k, ust, alt, renk) => { const b = c.S('g', {}, G); yazi(c, b, X[k] + W / 2, 112, ust, { size: 27, kalin: 700 }); yazi(c, b, X[k] + W / 2, 148, alt, { size: 25, kalin: 700, renk }); return b; };
    const solBas = baslik(0, 'Paralel doğrular', 'öteleme', RENK.ok), sagBas = baslik(1, 'Kesişen doğrular', 'dönme', RENK.merkez);
    const sol = c.S('g', {}, G), k = paralel(c, sol, { cx: X[0] + W / 2, cy: 300, u: 30, a: 5, h: 3.2 });
    const sag = c.S('g', {}, G), g = geo([660, 335], 45, 25);
    dogru(c, sag, g.d1[1], g.d1[0]); dogru(c, sag, g.d2[1], g.d2[0]);
    cokgen(c, sag, g.T0, RENK.sekil); cokgen(c, sag, g.T2, RENK.goruntu);
    const solF = yazi(c, G, X[0] + W / 2, 452, 'uzaklık: 2 × 5 = 10', { size: 25, kalin: 600 });
    const sagF = yazi(c, G, X[1] + W / 2, 452, 'açı: 2 × 45° = 90°', { size: 25, kalin: 600 });
    const alt = yazi(c, G, 500, 522, 'görüntü şekle eş', { size: 27, kalin: 700 });
    gizle(cerceve, solBas, sagBas, sol, sag, solF, sagF, alt);
    return { G, cerceve, solBas, sagBas, sol, sag, solF, sagF, alt };
  }
  async function ikiYansima(c) {
    const svg = c.svg(1000, 562);
    const p = ikiPencere(c, svg);
    await par(c.say('İki dersin sonucunu yan yana koyalım.'), belir(c, p.cerceve, 500));
    await par(c.say('Doğrular paralelse iki yansıma bir öteleme eder.'), belir(c, [p.solBas, p.sol], 600));
    await par(c.say('Doğrular kesişiyorsa iki yansıma bir dönme eder.'), belir(c, [p.sagBas, p.sag], 600));
    await par(c.say('Orada uzaklık iki katına çıkıyordu, burada açı.'), (async () => { await belir(c, p.solF, 400); await belir(c, p.sagF, 400); })());
    await par(c.say('Her yansıma eşliği korur; son görüntü ilk şekle eştir.'), belir(c, p.alt, 450));

    // 8 cm kayma: doğrular nasıl?
    c.clearSay();
    await atar(c, p.G, 350); p.G.remove();
    const G2 = c.S('g', {}, svg), k = paralel(c, G2, { cx: 500, cy: 300, u: 40, a: 4, h: 3.4, ad: true });
    const ak = c.S('g', {}, G2);
    ok(c, ak, ara(k.T[0], k.I[0], 0.03), ara(k.T[0], k.I[0], 0.97));
    yazi(c, ak, ara(k.T[0], k.I[0], 0.28)[0], k.T[0][1] - 16, '8 cm', { size: 26, kalin: 700, renk: RENK.ok });
    const br = aralik(c, G2, k.x1, k.x2, k.cy - 2.6 * k.u, '?', RENK.cizgi);
    gizle(G2, k.cizgiler, br.g);
    await belir(c, G2, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'İki doğruya göre art arda yansıtılan bir şeklin bütün köşeleri aynı yönde 8 cm kaymış. Doğrular için hangisi doğrudur?',
      options: ['Paraleldirler; aralarında 8 cm vardır', 'Kesişirler; aralarındaki açı 4°dir', 'Paraleldirler; aralarında 4 cm vardır'], answer: 2,
      hints: ['8 cm öteleme uzaklığı; doğruların arası bunun yarısıdır.', 'Bütün köşeler aynı uzaklıkta kaymış: bu bir öteleme, dönme değil.', ''],
      right: 'Evet. Doğrular paralel; arası 8 cm’nin yarısı.',
    });
    cevapla(br.t, '4 cm');
    await par(c.say('Kayma 8 cm ise doğrular arası 4 cm.', { speak: 'Kayma sekiz santimetre ise doğrular arası dört santimetre.' }), belir(c, [...k.cizgiler, br.g], 600));
    await c.wait(500);

    // Özet çizim.
    c.clearSay();
    await atar(c, G2, 350); G2.remove();
    const q = ikiPencere(c, svg);
    gizle(q.G);
    q.cerceve.style.opacity = 1; q.solBas.style.opacity = 1; q.sagBas.style.opacity = 1; q.sol.style.opacity = 1; q.sag.style.opacity = 1; q.solF.style.opacity = 1; q.sagF.style.opacity = 1; q.alt.style.opacity = 1;
    q.sol.style.opacity = 0.4; q.solBas.style.opacity = 0.4; q.solF.style.opacity = 0.4;
    await par(c.say('Kesişen iki yansıma bir dönme eder; açı iki katıdır.'), belir(c, q.G, 600));
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a4', kicker: 'Konu A · Geometrik dönüşümler', title: 'Dönme, iki yansımadır', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dönme, iki yansımadır',
      hook: 'Kesişen iki aynadan yapılmış bir kaleydoskopta görüntüler neden <b>bir nokta çevresinde</b> dizilir?',
      button: 'Derse başla ›',
    },
    goals: ['Kesişen iki doğruya göre art arda yansımanın bir dönme olduğunu söyler.', 'Dönmenin merkezini ve açısını doğruların kesim noktasından ve aralarındaki açıdan bulur.', 'İki yansımanın ne zaman öteleme, ne zaman dönme verdiğini ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Öteleme uzaklığını ve dönmeyi belirleyenleri hatırla.', run: hatirla },
      { title: 'Doğrular kesişirse', goal: 'Kesişen iki doğruya art arda yansıma bir dönmedir.', run: kesisirse },
      { title: 'Merkez neresi?', goal: 'Dönmenin merkezi, doğruların kesim noktasıdır.', run: merkez },
      { title: 'Açı kaç derece?', goal: 'Dönme açısı, doğrular arasındaki açının iki katıdır.', run: aciKac },
      { title: 'Açı değişirse', goal: 'Doğrular arasındaki açı değişince dönme açısı da değişir.', run: aciDegisirse },
      { title: 'İki yansıma: öteleme mi, dönme mi?', goal: 'Paralel doğrular öteleme, kesişen doğrular dönme verir.', run: ikiYansima },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Aralarındaki açı 35° olan kesişen iki doğruya göre art arda yansıtılan bir şekil kaç derece dönmüş olur?',
        options: ['35°', '70°', '17,5°'], answer: 1,
        why: ['Dönme açısı doğrular arasındaki açıya eşit değildir; onun iki katıdır.', 'Dönme açısı, doğrular arasındaki açının iki katıdır: 2 × 35° = 70°.', 'Açı yarıya inmez; iki katına çıkar.'],
        scene: 3,
      },
      {
        q: 'Kesişen iki doğruya göre art arda yansımayla elde edilen dönmenin merkezi neresidir?',
        options: ['Doğruların kesim noktası', 'Şeklin ortası', 'Şeklin doğruya en yakın köşesi'], answer: 0,
        why: ['Kesim noktası iki doğrunun da üstündedir; iki yansımada da yerinde kalır.', 'Şeklin ortası da döner; yerinde kalan nokta değildir.', 'Köşeler çember çizerek hareket eder; yerinde kalmazlar.'],
        scene: 2,
      },
      {
        q: '“Bir şekil iki doğruya göre art arda yansıtılırsa hep ötelenmiş olur.” Bu cümle için hangisi doğrudur?',
        options: ['Doğrudur', 'Yanlıştır; şekil hep dönmüş olur', 'Yanlıştır; doğrular kesişiyorsa şekil dönmüş olur'], answer: 2,
        why: ['Doğrular kesişiyorsa sonuç öteleme değil, dönmedir.', 'Doğrular paralelse şekil dönmez, ötelenir.', 'Paralel doğrular öteleme, kesişen doğrular dönme verir.'],
        scene: 5,
      },
      {
        q: 'Bir motif iki yansımayla 100° döndürülecek. Doğrular arasındaki açı kaç derece olmalıdır?',
        options: ['200°', '50°', '100°'], answer: 1,
        why: ['Doğrular arası açı dönme açısının iki katı değil, yarısıdır.', 'Dönme açısı doğrular arası açının iki katıdır: 100° ÷ 2 = 50°.', 'Doğrular arası 100° olsaydı motif 200° dönerdi.'],
        scene: 4,
      },
      {
        q: 'Bir şekil birbirine dik iki doğruya göre art arda yansıtıldı. Hangi tek dönüşüm aynı sonucu verir?',
        options: ['90° dönme', 'Öteleme', '180° dönme'], answer: 2,
        why: ['Dönme açısı 90° değil, doğrular arasındaki açının iki katıdır.', 'Doğrular kesiştiği için sonuç öteleme değil, dönmedir.', 'Doğrular arası 90°; dönme açısı 2 × 90° = 180°.'],
        scene: 3,
      },
    ],
    summary: [
      'Kesişen iki doğruya art arda yansıma bir <b>dönmedir</b>.',
      'Merkez, doğruların <b>kesim noktasıdır</b>.',
      '<b>Kesişen iki yansıma bir dönme eder; açı iki katıdır.</b>',
      'Paralel doğrular öteleme, kesişen doğrular dönme verir.',
    ],
    nextLesson: { href: 'a5-suslemede-donusumler.html', label: 'Sonraki: Süslemede dönüşümler ›' },
  });
})();
