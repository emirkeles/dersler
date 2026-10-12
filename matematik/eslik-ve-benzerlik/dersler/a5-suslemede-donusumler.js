/* A5 — Süslemede dönüşümler: tek motif, üç dönüşüm
   Bir süsleme tek bir motife yansıma, öteleme ve dönme uygulanarak kurulur; hangi dönüşümün kullanıldığı motiflerin duruşundan okunur.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md (A5)
   Sıra plan/KURALLAR.md 3.2'ye göredir: önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, rad, ara, araHepsi, yansit, otele, dondur, yazi, renkli, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma, bayrak } = window.KIT;
  const { merkezNokta, donenCokgen, donuyor, yayIz, merkezAci, ucDonusum } = window.KIT_A;

  const TX = 706;                                              // sağdaki yazı sütununun sol kenarı
  const SERIT = { b: 56, x0: 52, y0: 100, sutun: 16, satir: 5 };  // şerit zemini: 16 sütun, 5 satır
  const BOS = '  ';

  /* Gerçek işaretçi: tahtadaki bir öğeyi (ya da grubu) şimdiki hâlinden soluk hâle getirir. */
  const soluk = (c, el, hedef = 0.45) => { el.style.opacity = 1; return belir(c, el, 400, hedef); };
  /* Bayrak: direğinin alt ortası B noktasında, birim uzunluğu u (px), dik duruştan ang derece saat yönünde dönmüş. */
  const bayrakAt = (B, u, ang = 0) => bayrak(0, 0).map(([a, b]) => dondur([B[0] + (a - 0.2) * u, B[1] - (3 - b) * u], B, ang));
  /* Doğruyu (sağdan) yön vektörüyle verir: φ derece, dikten saat yönünde. */
  const yonV = (phi) => [Math.sin(rad(phi)), -Math.cos(rad(phi))];
  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };
  const sag = (c, svg, i, parcalar, y0 = 150, size = 25) => renkli(c, svg, TX, y0 + i * 52, parcalar, { hiza: 'start', size });

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');

    // Kesişen iki yansıma: dönme, açı iki katı.
    const g1 = c.S('g', {}, svg), O = [420, 281], d2 = [Math.cos(rad(30)), Math.sin(rad(30))];
    const U1 = [O[0] - 230, O[1]], V1 = [O[0] + 230, O[1]];
    const U2 = [O[0] - 230 * d2[0], O[1] - 230 * d2[1]], V2 = [O[0] + 230 * d2[0], O[1] + 230 * d2[1]];
    dogru(c, g1, V1, U1, { ad: 'd₁', adKay: [8, -12] });
    dogru(c, g1, V2, U2, { ad: 'd₂', adKay: [10, 12] });
    const B0 = [540, 241], F = bayrakAt(B0, 28, 0);
    const Fi = F.map((q) => yansit(yansit(q, U1, V1), U2, V2));
    cokgen(c, g1, F, RENK.sekil);
    merkezNokta(c, g1, O, 'O');
    const a30 = merkezAci(c, g1, O, [O[0] + 100, O[1]], 30, { r: 45, etiketR: 72 });
    gizle(a30.isin1, a30.isin2);
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir şekil, aralarındaki açı 30° olan kesişen iki doğruya göre art arda yansıtıldı. Hangi dönüşüm uygulanmış olur?',
      options: ['30° dönme', '60° dönme', '60 birim öteleme'], answer: 1,
      hints: ['Kesişen iki yansıma bir dönme eder; açı iki katıdır.', '', 'Kesişen iki yansıma bir dönme eder; açı iki katıdır.'],
      right: 'Evet. Açı iki katına çıkar: 60° dönme.',
    });
    const a60 = merkezAci(c, g1, O, B0, 60, { r: 100, etiketR: 135 });
    const im = c.S('g', {}, g1); cokgen(c, im, Fi, RENK.goruntu);
    gizle(im, a60.g);
    await par(c.say('Kesişen iki yansıma bir dönme eder; açı iki katıdır.'), belir(c, [im, a60.g], 500));

    // Ters çevrilme yansımanın işidir.
    c.clearSay(); await belir(c, g1, 300, 0); g1.remove();
    const g2 = c.S('g', {}, svg), A = bayrakAt([400, 350], 40, 0), Bn = A.map((q) => yansit(q, [500, 0], [500, 9]));
    cokgen(c, g2, A, RENK.sekil); cokgen(c, g2, Bn, RENK.goruntu);
    const eks = dogru(c, g2, [500, 150], [500, 450], { ad: 'd', adKay: [14, -4] });
    gizle(g2, eks.g); g2.appendChild(eks.g); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir motif ile görüntüsü yan yana duruyor; görüntü ters çevrilmiş. Hangi dönüşüm uygulanmıştır?',
      options: ['Öteleme', 'İkisi de olabilir', 'Yansıma'], answer: 2,
      hints: ['Öteleme şekli ters çevirmez; ters çeviren yansımadır.', 'Öteleme şekli ters çevirmez; ters çeviren yansımadır.', ''],
      right: 'Evet. Ters çevrilmiş görüntü yansımadan gelir.',
    });
    await par(c.say('Ters çeviren dönüşüm yansımadır.'), belir(c, eks.g, 450));
  }

  /* ---- 2. Kilim kenarı ---- */
  async function kilimKenari(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, SERIT), b = z.b;
    const X = (s) => z.P(s, 0)[0], AY = z.y0 + 5 * b + 32;
    const M = (i) => z.N(bayrak(i, 1));
    const m = [cokgen(c, svg, M(0), RENK.sekil)];
    for (let k = 1; k < 4; k++) m.push(cokgen(c, svg, M(0), RENK.goruntu));
    gizle(m.map((q) => q.g));
    const sayi = [0, 4, 8, 12].map((i, k) => yazi(c, svg, X(i + 1), z.y0 - 16, String(k + 1), { size: 26, kalin: 700, renk: k ? RENK.goruntu : RENK.sekil }));
    gizle(sayi);
    const okla = (a, e, metin) => {
      const g = c.S('g', {}, svg);
      ok(c, g, [X(a + 0.15), AY], [X(e - 0.15), AY]);
      yazi(c, g, (X(a) + X(e)) / 2, AY + 36, metin, { size: 26, kalin: 700, renk: RENK.ok });
      return g;
    };

    await c.say('Kilimlerin kenarında aynı motif yan yana dizilir.');
    await par(c.say('Usta önce tek bir motif çiziyor.'), belir(c, m[0].g, 450));
    const oklar = [];
    await par(c.say('Motifi 4 birim sağa öteliyor; sonra bir daha, bir daha.', { speak: 'Motifi dört birim sağa öteliyor; sonra bir daha, bir daha.' }), (async () => {
      for (let k = 1; k < 4; k++) {
        const o = okla(4 * (k - 1), 4 * k, '4'); gizle(o); oklar.push(o);
        m[k].koy(M(4 * (k - 1)));
        await belir(c, [o, m[k].g], 250);
        await c.tween(900, (e) => m[k].koy(araHepsi(M(4 * (k - 1)), M(4 * k), e)), Ders.ease.inOut);
      }
    })());
    await par(c.say('Her motif bir öncekinin öteleme görüntüsü.'), belir(c, sayi, 400));
    const dol = m.map((q, k) => dolasma(c, svg, q.pts(), k ? RENK.goruntu : RENK.sekil));
    gizle(dol);
    await par(c.say('Hepsi aynı duruşta: hiçbiri ters çevrilmemiş.', { speak: '[thoughtful] Hepsi aynı duruşta: hiçbiri ters çevrilmemiş.' }), (async () => {
      await belir(c, oklar, 350, 0); oklar.forEach((o) => o.remove());
      await belir(c, dol, 450);
    })());
    await kaldir(c, dol);
    const o1 = okla(0, 4, ''), t = o1.lastChild; t.remove();
    const yz = yazi(c, svg, X(0), AY + 36, 'yatay · sağa · 4 birim', { hiza: 'start', size: 26, kalin: 700, renk: RENK.ok });
    gizle(o1, yz);
    await par(c.say('Ötelemenin doğrultusu yatay, yönü sağa, uzaklığı 4 birim.', { speak: 'Ötelemenin doğrultusu yatay, yönü sağa, uzaklığı dört birim.' }), belir(c, [o1, yz], 450));

    c.clearSay(); await kaldir(c, o1, yz);
    await c.choice({
      tag: 'Sıra sende', q: 'Birinci motiften üçüncü motife hangi dönüşümle geçilir?',
      options: ['4 birim sağa öteleme', '8 birim sağa öteleme', 'Yansıma'], answer: 1,
      hints: ['4 birim, ikinci motife götürür; üçüncü bir adım daha ötede.', '', 'Üçüncü motif ters çevrilmemiş.'],
      right: 'Evet. İki adım, 8 birim.',
    });
    const o8 = okla(0, 8, '8'); gizle(o8);
    await par(c.say('Art arda iki öteleme, daha uzun tek bir öteleme eder.'), belir(c, o8, 450));
  }

  /* ---- 3. Aynalı şerit ---- */
  async function aynaliSerit(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, SERIT), b = z.b;
    const X = (s) => z.P(s, 0)[0], AY = z.y0 + 5 * b + 32;
    const yan = (pts, s) => pts.map((q) => yansit(q, [X(s), 0], [X(s), 9]));
    const M1 = z.N(bayrak(0, 1)), M2 = yan(M1, 3), M3 = yan(M2, 7), M4 = yan(M3, 11);
    const dg = (s) => dogru(c, svg, z.P(s, 0.25), z.P(s, 4.75));
    const d1 = dg(3), d2 = dg(7);
    const m1 = cokgen(c, svg, M1, RENK.sekil), m2 = cokgen(c, svg, M1, RENK.goruntu), m3 = cokgen(c, svg, M2, RENK.goruntu);
    gizle(m1.g, m2.g, m3.g, d1.g, d2.g);

    await par(c.say('Usta bu kez motifi dikey bir doğruya göre yansıtıyor.'), belir(c, [m1.g, d1.g], 450));
    const dol1 = dolasma(c, svg, M1, RENK.sekil), dol2 = dolasma(c, svg, M2, RENK.goruntu);
    gizle(dol1, dol2);
    await par(c.say('İkinci motif birincinin ayna görüntüsü: ters çevrilmiş.'), (async () => {
      await belir(c, m2.g, 200);
      await c.tween(1400, (e) => m2.koy(araHepsi(M1, M2, e)), Ders.ease.inOut);
      await belir(c, [dol1, dol2], 450);
    })());
    await par(c.say('Sonra onu da bir sonraki doğruya göre yansıtıyor.'), (async () => {
      await belir(c, [dol1, dol2], 300, 0); dol1.remove(); dol2.remove();
      await belir(c, m3.g, 200);
      await c.tween(1400, (e) => m3.koy(araHepsi(M2, M3, e)), Ders.ease.inOut);
    })());
    const m4 = cokgen(c, svg, M4, RENK.goruntu); m4.g.style.opacity = 0;
    const lab = [[1, 'düz', RENK.sekil], [5, 'ters', RENK.goruntu], [9, 'düz', RENK.goruntu], [13, 'ters', RENK.goruntu]]
      .map(([i, t, r]) => yazi(c, svg, X(i), AY + 8, t, { size: 26, kalin: 700, renk: r }));
    gizle(lab);
    await par(c.say('Şerit böyle sürüyor: düz, ters, düz, ters.'), (async () => {
      await belir(c, lab.slice(0, 3), 350);
      await belir(c, [m4.g, lab[3]], 400, 0.4);
    })());

    // Birlikte çöz: ikinci doğru nereden geçer?
    c.clearSay(); await belir(c, [m4.g, ...lab], 300, 0); m4.g.remove(); lab.forEach((e) => e.remove());
    const soru = yazi(c, svg, X(7), z.P(0, 2.9)[1], '?', { size: 40, kalin: 700, renk: RENK.dogru });
    gizle(soru); await belir(c, soru, 350);
    await c.choice({
      tag: 'Birlikte çöz', q: 'İkinci ile üçüncü motif arasındaki yansıma doğrusu nereden geçer?',
      options: ['İkinci motifin kenarından', 'Üçüncü motifin kenarından', 'İki motifin tam ortasından'], answer: 2,
      hints: ['Doğru ikinci motife yapışık olsaydı üçüncü motif de ona yapışık dururdu.', 'Motif ile görüntüsü doğruya eşit uzaklıktadır.', ''],
      right: 'Evet. Doğru iki motifin tam ortasından geçer.',
    });
    soru.remove();
    const esit = c.S('g', {}, svg), YY = z.P(0, 4.45)[1];
    [[6, 7], [7, 8]].forEach(([a, e]) => {
      cizgi(c, esit, [X(a), YY], [X(e), YY], RENK.cizgi, 3);
      cizgi(c, esit, [X(a), YY - 9], [X(a), YY + 9], RENK.cizgi, 3);
      cizgi(c, esit, [X(e), YY - 9], [X(e), YY + 9], RENK.cizgi, 3);
    });
    gizle(esit);
    await par(c.say('Yansıma doğrusu, motif ile görüntüsünün tam ortasından geçer.'), belir(c, [d2.g, esit], 450));

    // Sıra sende: birinciden üçüncüye tek dönüşüm.
    c.clearSay(); await belir(c, esit, 300, 0); esit.remove();
    const sayi = [1, 5, 9].map((i, k) => yazi(c, svg, X(i), z.y0 - 16, String(k + 1), { size: 26, kalin: 700, renk: k ? RENK.goruntu : RENK.sekil }));
    gizle(sayi);
    await par(soluk(c, m2.g), belir(c, sayi, 400));
    await c.choice({
      tag: 'Sıra sende', q: 'Birinci ile üçüncü motif aynı duruşta. Birinciden üçüncüye hangi tek dönüşümle geçilir?',
      options: ['Öteleme', 'Yansıma', 'Dönme'], answer: 0,
      hints: ['', 'Üçüncü motif ters çevrilmemiş.', 'Üçüncü motif başka yöne bakmıyor; yalnızca kaymış.'],
      right: 'Evet. Üçüncü motif yalnızca kaymış: öteleme.',
    });
    const o8 = c.S('g', {}, svg);
    ok(c, o8, [X(0.15), AY], [X(7.85), AY]);
    yazi(c, o8, X(4), AY + 36, '8', { size: 26, kalin: 700, renk: RENK.ok });
    gizle(o8);
    await par(c.say('Paralel iki yansıma bir öteleme eder.'), belir(c, o8, 450));
    const ar = c.S('g', {}, svg), YA = AY + 74;
    cizgi(c, ar, [X(3), YA], [X(7), YA], RENK.dogru, 3.5);
    cizgi(c, ar, [X(3), YA - 10], [X(3), YA + 10], RENK.dogru, 3.5); cizgi(c, ar, [X(7), YA - 10], [X(7), YA + 10], RENK.dogru, 3.5);
    yazi(c, ar, X(5), YA + 36, '4', { size: 26, kalin: 700, renk: RENK.dogru });
    gizle(ar);
    await par(c.say('Doğrular 4 birim aralıklı; öteleme 8 birim.', { speak: 'Doğrular dört birim aralıklı; öteleme sekiz birim.' }), belir(c, ar, 450));
  }

  /* ---- 4. Bir merkez çevresinde ---- */
  async function merkezCevresinde(c) {
    const svg = c.svg(1000, 562), O = [340, 281], u = 40, r0 = 100;
    const P0 = bayrakAt([O[0], O[1] - r0], u, 0), V0 = [O[0], O[1] - 60];                // ışınlar kısa: yalnızca merkezin yakınında
    const mer = merkezNokta(c, svg, O, 'O');
    const gr = c.S('g', {}, svg);
    const kur = (n) => {                       // n motifli düzen, hepsi yerinde
      const g = c.S('g', {}, svg);
      for (let k = 0; k < n; k++) donenCokgen(c, g, O, P0, k ? RENK.goruntu : RENK.sekil).don((360 / n) * k);
      return g;
    };
    const f0 = donenCokgen(c, gr, O, P0, RENK.sekil);
    gizle(gr);
    await par(c.say('Tavan ve kubbe süslemelerinde motifler bir merkez çevresinde dizilir.'), belir(c, gr, 450));

    // İlk dönme: 30°.
    const f1 = donenCokgen(c, gr, O, P0, RENK.goruntu);
    let ac = merkezAci(c, svg, O, V0, 0, { r: 40, etiketR: 66 });
    await par(c.say('Usta motifi O çevresinde 30° döndürüyor.', { speak: 'Usta motifi O çevresinde otuz derece döndürüyor.' }), donuyor(c, [f1, ac], 0, 30, 1500));
    // Art arda dönmeler.
    const fl = [f0, f1];
    await par(c.say('Görüntüyü yine 30° döndürüyor; böyle sürdürüyor.', { speak: 'Görüntüyü yine otuz derece döndürüyor; böyle sürdürüyor.' }), (async () => {
      for (let k = 2; k < 12; k++) {
        ac.g.remove();
        const a0 = 30 * (k - 1), f = donenCokgen(c, gr, O, P0, RENK.goruntu);
        f.don(a0); fl.push(f);
        ac = merkezAci(c, svg, O, dondur(V0, O, a0), 0, { r: 40, etiketR: 66 });
        await c.tween(k < 4 ? 900 : 380, (e) => { f.don(a0 + 30 * e); ac.don(30 * e); }, Ders.ease.inOut);
      }
      ac.g.remove();
    })());

    // Tam tur.
    const halkaTam = c.S('circle', { cx: O[0], cy: O[1], r: 50, fill: 'none', stroke: RENK.merkez, 'stroke-width': 4 }, svg);
    halkaTam.style.opacity = 0;
    const t1 = sag(c, svg, 0, ['12 × 30° = 360°'], 150, 23); gizle(t1);
    await par(c.say('On iki motif tam turu doldurdu: 12 × 30° = 360°.', { speak: 'On iki motif tam turu doldurdu: on iki çarpı otuz derece, üç yüz altmış derece.' }), belir(c, [halkaTam, t1], 500));
    window.KIT.parcaKoy(c, t1, ['12 motif: ', ['360° ÷ 12 = 30°', RENK.merkez]]); t1.style.opacity = 0;
    await par(c.say('Tam tur 360°; motif sayısına bölünce dönme açısı çıkar.', { speak: 'Tam tur üç yüz altmış derece; motif sayısına bölünce dönme açısı çıkar.' }), belir(c, t1, 400));

    // Birlikte çöz: 8 motif.
    const t2 = sag(c, svg, 1, ['8 motif: ', ['360° ÷ 8 = ?', RENK.merkez]], 150, 23);
    gizle(t2); await belir(c, t2, 350);
    await c.choice({
      tag: 'Birlikte çöz', q: '12 motifte açı 360° ÷ 12 = 30° idi. Aynı düzen 8 motifle kurulursa her adımın dönme açısı kaç derece olur?',
      options: ['30°', '8°', '45°'], answer: 2,
      hints: ['30°, on iki motifli düzenin açısıydı.', 'Tam turu motif sayısına böl: 360 ÷ 8.', ''],
      right: 'Evet. 360° ÷ 8 = 45°.',
    });
    await belir(c, [gr, halkaTam], 300, 0); gr.remove(); halkaTam.remove();
    const g8 = kur(8); gizle(g8); await belir(c, g8, 500);
    cevapla(t2, '8 motif: 360° ÷ 8 = 45°');
    await c.say('Motif azaldıkça dönme açısı büyür.');

    // Sıra sende: 30° dönmeyi iki yansımayla yapmak (daha büyük çizim).
    c.clearSay(); await belir(c, [g8, t1, t2, mer.g], 300, 0); g8.remove(); t1.remove(); t2.remove(); mer.g.remove();
    const Q = [420, 395], uq = 50, rq = 100, Pq = bayrakAt([Q[0], Q[1] - rq], uq, 0);
    const g = c.S('g', {}, svg);
    donenCokgen(c, g, Q, Pq, RENK.sekil); donenCokgen(c, g, Q, Pq, RENK.goruntu).don(30);
    merkezNokta(c, g, Q, 'O');
    const a30 = merkezAci(c, g, Q, [Q[0], Q[1] - 70], 30, { r: 40, etiketR: 70 });
    gizle(g); await belir(c, g, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Komşu iki motif arasında 30° dönme var. Usta bu dönmeyi O’dan geçen iki doğruya yansımayla yapacak. Doğrular arasındaki açı kaç derece olmalıdır?',
      options: ['60°', '15°', '30°'], answer: 1,
      hints: ['30° açılı doğrular 60° döndürür.', '', 'Doğrular arası açı, dönme açısının yarısıdır.'],
      right: 'Evet. Doğrular arası açı 15°.',
    });
    await belir(c, a30.g, 250, 0); a30.g.remove();
    // Motif iki doğrunun dışında: d₁ ve d₂ motifin solunda (d₁ en solda), aralarında 15°; d₁ sonra d₂ yansıması motifi 30° saat yönünde döndürür.
    const D1 = yonV(-27), D2 = yonV(-12), at = (D, k) => [Q[0] + D[0] * k, Q[1] + D[1] * k];
    const dd1 = dogru(c, g, at(D1, 280), at(D1, -50), { ad: 'd₁', adKay: [-28, -8] }), dd2 = dogru(c, g, at(D2, 280), at(D2, -50), { ad: 'd₂', adKay: [8, -8] });
    const a15 = merkezAci(c, g, Q, at(D1, 60), 15, { r: 60 });
    a15.etiket.setAttribute('x', Q[0] + 40); a15.etiket.setAttribute('y', Q[1] - 38);
    gizle(a15.isin1, a15.isin2, dd1.g, dd2.g, a15.g);
    const ara1 = Pq.map((q) => yansit(q, Q, at(D1, 100)));
    const ci = cokgen(c, g, ara1, RENK.goruntu, { dolgu: 0.1 }); ci.g.style.opacity = 0;
    await par(c.say('Doğrular arası açı, dönme açısının yarısıdır.'), belir(c, [dd1.g, dd2.g, a15.g], 500));
    await par(c.say('Usta dönmeyi de iki yansımayla elde edebilir.'), belir(c, ci.g, 500, 0.6));
  }

  /* ---- 5. Hangi dönüşüm? ---- */
  async function hangiDonusum(c) {
    const svg = c.svg(1000, 562), gu = c.S('g', {}, svg);
    const { paneller } = ucDonusum(c, gu);
    paneller.forEach((p) => { p.ilerle(1); gizle(p.iz, p.baslik); });
    gizle(gu);
    await par(c.say('Bir süslemede kullanılan dönüşüm motiflerin duruşundan okunur.'), belir(c, gu, 450));
    const sira = [1, 0, 2];                      // yansıma, öteleme, dönme
    await par(c.say('Ters çevrilmişse yansıma, yalnızca kaymışsa öteleme, dönmüşse dönme.'), (async () => {
      for (const k of sira) { await belir(c, paneller[k].baslik, 450); await c.wait(500); }
    })());
    c.clearSay(); await belir(c, gu, 300, 0); gu.remove();

    const z = zemin(c, svg), b = z.b;
    const ciftler = [
      { a: bayrak(3, 3), don: (q) => otele(q, [5 * b, 0]), l1: [4, 2.5], l2: [9, 2.5], secenek: ['Yansıma', 'Öteleme', 'Dönme'], cevap: 1,
        ipucu: ['Bayrağın ucu iki şekilde de aynı yana bakıyor; ters çevrilmemiş.', '', 'Bayrağın ucu iki şekilde de sağa bakıyor; baktığı yön değişmemiş.'],
        dogru: 'Evet. Yalnızca kaymış: öteleme.', ad: 'Aynı duruşta, yalnızca kaymış: öteleme.', iz: 'ok' },
      { a: bayrak(4, 1), eksen: [[1, 5.5], [15, 5.5]], l1: [6.9, 2.3], l2: [6.9, 9.3], secenek: ['Dönme', 'Öteleme', 'Yansıma'], cevap: 2,
        ipucu: ['Köşeleri dolaşma yönü tersine dönmüş; bu ters çevrilme.', 'Köşeleri dolaşma yönü tersine dönmüş; öteleme şekli ters çevirmez.', ''],
        dogru: 'Evet. Baş aşağı çevrilmiş: yansıma.', ad: 'Baş aşağı çevrilmiş: yansıma.', iz: 'dogru' },
      { a: bayrak(4, 4), merkez: [4, 7], aci: 90, l1: [6.9, 5.0], l2: [7.6, 9.2], secenek: ['Yansıma', 'Dönme', 'Öteleme'], cevap: 1,
        ipucu: ['Ters çevrilmemiş, ama başka yöne bakıyor.', '', 'Ters çevrilmemiş, ama başka yöne bakıyor; yalnızca kaymamış.'],
        dogru: 'Evet. Sol alt köşe çevresinde 90° dönmüş.', ad: 'Ters çevrilmemiş, ama başka yöne bakıyor: dönme.', iz: 'donme' },
      { a: bayrak(3, 3), eksen: [[6, 0.3], [6, 10.7]], l1: [4, 2.5], l2: [8, 2.5], secenek: ['Öteleme', 'Yansıma', 'Dönme'], cevap: 1,
        ipucu: ['Yan yana durmaları öteleme demek değil: uç öbür yana bakıyor.', '', 'Uç öbür yana bakıyor: şekil ters çevrilmiş, dönmede ters çevrilmez.'],
        dogru: 'Evet. Yan yana, ama ters çevrilmiş: yansıma.', ad: 'Yan yana ama uç öbür yana bakıyor: yansıma.', iz: 'dogru' },
    ];
    for (let i = 0; i < ciftler.length; i++) {
      const cf = ciftler[i], gr = c.S('g', {}, svg), A = z.N(cf.a);
      const E = cf.eksen ? z.N(cf.eksen) : null, C = cf.merkez ? z.P(cf.merkez[0], cf.merkez[1]) : null;
      const B = A.map((q) => (E ? yansit(q, E[0], E[1]) : C ? dondur(q, C, cf.aci) : cf.don(q)));
      cokgen(c, gr, A, RENK.sekil); cokgen(c, gr, B, RENK.goruntu);
      const p1 = z.P(cf.l1[0], cf.l1[1]), p2 = z.P(cf.l2[0], cf.l2[1]);
      yazi(c, gr, p1[0], p1[1], '1', { size: 26, kalin: 700, renk: RENK.sekil }); yazi(c, gr, p2[0], p2[1], '2', { size: 26, kalin: 700, renk: RENK.goruntu });
      gizle(gr); await belir(c, gr, 400);
      await c.choice({
        tag: 'Sıra sende', q: '1 numaralı motiften 2 numaralıya hangi dönüşümle geçilir?', options: cf.secenek, answer: cf.cevap, hints: cf.ipucu, right: cf.dogru,
      });
      const iz = c.S('g', {}, gr);
      if (cf.iz === 'ok') [0, 2, 5].forEach((j) => ok(c, iz, ara(A[j], B[j], 0.05), ara(A[j], B[j], 0.95)));
      else if (cf.iz === 'dogru') dogru(c, iz, E[0], E[1]);
      else { merkezNokta(c, iz, C, null); yayIz(c, iz, C, A[0], { renk: RENK.merkez, w: 3.5, derece: cf.aci }); }
      gizle(iz);
      await par(c.say(cf.ad, {}), belir(c, iz, 450));
      if (i < ciftler.length - 1) { c.clearSay(); await belir(c, gr, 300, 0); gr.remove(); }
    }
    await c.say('Yan yana duran motif her zaman ötelenmiş değildir; duruşuna bak.', { speak: '[curious] Yan yana duran motif her zaman ötelenmiş değildir; duruşuna bak.' });
  }

  /* ---- 6. Bütün motifler eş ---- */
  async function butunEs(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { b: 40, x0: 30, y0: 160, sutun: 11, satir: 3 });
    z.g.remove();
    const yan = (pts, s) => pts.map((q) => yansit(q, [z.P(s, 0)[0], 0], [z.P(s, 0)[0], 9]));
    const S1 = z.N(bayrak(0, 0)), S2 = yan(S1, 3), S3 = yan(S2, 7);
    const gs = c.S('g', {}, svg);
    cokgen(c, gs, S1, RENK.sekil); cokgen(c, gs, S2, RENK.goruntu); cokgen(c, gs, S3, RENK.goruntu);
    // Sağda on iki motifli düzen.
    const O = [750, 215], u = 26, r0 = 52, P0 = bayrakAt([O[0], O[1] - r0], u, 0);
    const gd = c.S('g', {}, svg), fl = [];
    for (let k = 0; k < 12; k++) { const f = donenCokgen(c, gd, O, P0, k ? RENK.goruntu : RENK.sekil); f.don(30 * k); fl.push(f); }
    merkezNokta(c, gd, O, null);
    gizle(gs, gd);
    await par(c.say('İki süslemeyi yan yana koyalım.'), belir(c, [gs, gd], 500));
    const ozet = renkli(c, svg, 500, 440, ['tek motif → ', ['öteleme', RENK.ok], ', ', ['yansıma', RENK.dogru], ', ', ['dönme', RENK.merkez]], { size: 28 });
    gizle(ozet);
    await par(c.say('İkisi de tek bir motiften, dönüşümlerle kuruldu.'), belir(c, ozet, 450));

    // Bir motif başka bir motifin üstüne oturur.
    const hs = cokgen(c, svg, S1, RENK.sekil, { dolgu: 0.35 });
    const hd = donenCokgen(c, svg, O, P0, RENK.sekil, { dolgu: 0.35 });
    await par(c.say('Dönüşümler ölçüyü değiştirmez: bütün motifler birbirine eştir.', { speak: '[short pause] Dönüşümler ölçüyü değiştirmez: bütün motifler birbirine eştir.' }), (async () => {
      await c.wait(400);
      await c.tween(1700, (e) => { hs.koy(araHepsi(S1, S3, e)); hd.don(150 * e); }, Ders.ease.inOut);
      await c.wait(500);
    })());
    await par(c.say('Kilimde, çinide, taş oymada hep bu düzeni görürüz.'), belir(c, [hs.g, hd.g], 500, 0));
    hs.g.remove(); hd.g.remove();

    // Yeni durum: çini pano.
    c.clearSay(); await belir(c, [gs, gd, ozet], 300, 0); gs.remove(); gd.remove(); ozet.remove();
    const pano = c.S('g', {}, svg), pu = 26;
    for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) {
      const cx = 105 + k * 100, cy = 105 + r * 110, mx = k % 2 ? -1 : 1, my = r % 2 ? -1 : 1;
      cokgen(c, pano, bayrak(0, 0).map(([a, bb]) => [cx + (a - 1) * pu * mx, cy + (bb - 1.5) * pu * my]), r + k ? RENK.goruntu : RENK.sekil);
    }
    const y1 = sag(c, svg, 0, ['bir motif: 12 cm²'], 150), y2 = sag(c, svg, 1, ['20 motif'], 150), y3 = sag(c, svg, 2, ['toplam alan: ?'], 150);
    gizle(pano, y1, y2, y3); await belir(c, [pano, y1, y2, y3], 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir çini pano, alanı 12 cm² olan bir motifin yansıma, öteleme ve dönmeleriyle kurulmuş; panoda 20 motif var. Motiflerin toplam alanı kaç cm²’dir?',
      options: ['120 cm²', 'Hesaplanamaz; motifler farklı büyüklüktedir.', '240 cm²'], answer: 2,
      hints: ['Yirmi motifin her biri 12 cm²: 20 × 12.', 'Dönüşümler alanı değiştirmez; motiflerin hepsi eştir.', ''],
      right: 'Evet. 20 × 12 = 240 cm².',
    });
    cevapla(y3, 'toplam alan: 240 cm²');
    await c.say('Yirmi eş motifin alanları toplanır: 20 × 12 = 240 cm².', { speak: 'Yirmi eş motifin alanları toplanır: yirmi çarpı on iki, iki yüz kırk santimetrekare.' });
    const son = renkli(c, svg, 500, 520, ['tek motif → ', ['öteleme', RENK.ok], ', ', ['yansıma', RENK.dogru], ', ', ['dönme', RENK.merkez]], { size: 28 });
    gizle(son);
    await par(c.say('Süsleme: tek motif, üç dönüşüm.'), belir(c, son, 450));
    c.note('<b>Süsleme:</b> tek motif + öteleme, yansıma, dönme. Bütün motifler eştir.', 'Süsleme', 'eb-susleme');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a5', kicker: 'Konu A · Geometrik dönüşümler', title: 'Süslemede dönüşümler', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Süslemede dönüşümler',
      hook: 'Bir kilimin bütün deseni <b>tek bir motiften</b> çıkabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Bir süslemenin tek motife yansıma, öteleme ve dönme uygulanarak kurulduğunu açıklar.', 'Bir süslemede iki motifin hangi dönüşümle ilişkili olduğunu duruşlarından belirler.', 'Süslemedeki bütün motiflerin eş olduğunu kullanır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kesişen iki yansımanın dönme ettiğini ve yansımanın şekli ters çevirdiğini hatırla.', run: hatirla },
      { title: 'Kilim kenarı', goal: 'Aynı motifin art arda ötelenmesiyle bir şerit kur.', run: kilimKenari },
      { title: 'Aynalı şerit', goal: 'Motifi art arda yansıtınca şerit kurulur; paralel iki yansıma öteleme eder.', run: aynaliSerit },
      { title: 'Bir merkez çevresinde', goal: 'Motifi eşit açılarla döndürerek bir düzen kur; açıyı motif sayısından bul.', run: merkezCevresinde },
      { title: 'Hangi dönüşüm?', goal: 'İki motifin duruşuna bakıp dönüşümü söyle.', run: hangiDonusum },
      { title: 'Bütün motifler eş', goal: 'Süslemedeki bütün motifler birbirine eştir.', run: butunEs },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir şeritte motifler sırayla düz, ters, düz, ters duruyor. Yan yana iki motif arasında hangi dönüşüm vardır?',
        options: ['Öteleme', 'Dönme', 'Yansıma'], answer: 2,
        why: ['Öteleme şekli ters çevirmez; komşu motifler ise biri düz, biri ters duruyor.', 'Dönme şekli ters çevirmez, yalnızca baktığı yönü değiştirir.', 'Komşu motifler birbirinin ters çevrilmişidir; bu yansımadır.'],
        scene: 2,
      },
      {
        q: '“Yan yana duran motifler hep ötelemeyle elde edilir.” Bu cümle için hangisi doğrudur?',
        options: ['Doğrudur', 'Yanlıştır; komşu motif ters çevrilmişse yansımadır', 'Yanlıştır; hep dönmeyle elde edilir'], answer: 1,
        why: ['Yan yana duran motif ters çevrilmiş olabilir; o zaman yansımadır.', 'Ters çevrilmiş komşu motif yansımayı gösterir; duruşa bakmak gerekir.', 'Yan yana duran motifler hep dönmeyle de elde edilmez; ters çevrilmişse yansıma vardır.'],
        scene: 4,
      },
      {
        q: 'Bir merkez çevresinde eşit açılarla dizilmiş 6 motif tam turu dolduruyor. Her adımın dönme açısı kaç derecedir?',
        options: ['60°', '30°', '6°'], answer: 0,
        why: ['Tam tur 360°; motif sayısına bölünür: 360° ÷ 6 = 60°.', '30° on iki motifli düzenin açısıdır.', '6, motif sayısıdır; açı tam turun motif sayısına bölünmesiyle bulunur.'],
        scene: 3,
      },
      {
        q: 'Aynalı bir şeritte yansıma doğruları 5 cm aralıklı. Birinci motiften üçüncü motife hangi dönüşümle geçilir?',
        options: ['5 cm öteleme', '10 cm uzaktaki doğruya göre yansıma', '10 cm öteleme'], answer: 2,
        why: ['5 cm, ikinci motife götürür; paralel iki yansımada öteleme aralığın iki katıdır.', 'Birinci ile üçüncü motif aynı duruşta; ters çevrilme yok, yansıma olamaz.', 'Paralel iki yansıma bir öteleme eder; uzaklık doğrular arasındaki aralığın iki katıdır: 10 cm.'],
        scene: 2,
      },
      {
        q: 'Bir süsleme, çevresi 18 cm olan bir motifin dönüşümleriyle kurulmuş. Süslemedeki başka bir motifin çevresi kaç cm’dir?',
        options: ['36 cm', '18 cm', 'Dönüşüme göre değişir'], answer: 1,
        why: ['Dönüşümler uzunluğu iki katına çıkarmaz.', 'Bütün motifler eştir; çevreleri de 18 cm’dir.', 'Yansıma, öteleme ve dönme çevreyi değiştirmez.'],
        scene: 5,
      },
    ],
    summary: [
      'Süsleme, tek motife dönüşümler uygulanarak kurulur.',
      'Ters çevrilmiş motif yansıma, kaymış motif öteleme, dönmüş motif dönme gösterir.',
      '<b>Süsleme: tek motif, üç dönüşüm.</b>',
      'Bir süslemedeki bütün motifler eştir.',
    ],
    nextLesson: { href: 'a6-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
