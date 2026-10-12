/* D1 — Üçgende paralel doğru kenarları aynı oranda böler (temel orantı teoremi)
   DE // BC ise |AD|/|DB| = |AE|/|EC|. Önce sayılarla (çit), sonra benzer üçgenlerle ispat, sonra örnekler, iki paralel ve çitin yeri.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D1)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, uz, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, cokgen, dogru, agirlik } = window.KIT;
  const B = window.KIT_B, D = window.KIT_D;
  const EL = B.ESLEME;                               // mavi, turuncu, yeşil: 1 yay, 2 yay, 3 yay
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez;

  const TX = 706;                                    // sağdaki sütunun sol kenarı
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + 4 * Math.sin(Math.PI * e)))); };
  const buyut = (c, yazilar, ms = 800) => c.tween(ms, (e) => liste(yazilar).forEach((t) => t.setAttribute('font-size', 24 + 6 * Math.sin(Math.PI * e))));

  /* ABC üçgeni (T), D ve E (A'dan t oranında, AB ve AC üstünde), mor kesikli çit, D ve E harfleri ve ADE üçgeni.
     Çit, D, E ve ADE başta gizlidir. yerle(t) çiti yeni yere taşır. */
  function ucgenKur(c, p, T, t, o = {}) {
    const g = c.S('g', {}, p), [A, Bp, C] = T, M = agirlik(T), hs = o.harfSize || 26;
    const tri = cokgen(c, g, T, MAVI, { harf: ['A', 'B', 'C'], harfSize: hs, dolgu: o.dolgu == null ? 0.1 : o.dolgu });
    let Dn = ara(A, Bp, t), En = ara(A, C, t);
    const ade = cokgen(c, g, [A, Dn, En], TURUNCU, { dolgu: 0.22, w: 3.5 });
    const cit = dogru(c, g, Dn, En);
    const hd = yazi(c, g, 0, 0, 'D', { size: hs, kalin: 700, renk: TURUNCU }), he = yazi(c, g, 0, 0, 'E', { size: hs, kalin: 700, renk: TURUNCU });
    const dis = (P, Q, X, u) => {
      const d = uz(P, Q); let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
      if ((X[0] - M[0]) * nx + (X[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; }
      return [X[0] + nx * u, X[1] + ny * u + hs * 0.33];
    };
    const yerle = (t2) => {
      Dn = ara(A, Bp, t2); En = ara(A, C, t2);
      cit.koy(Dn, En); ade.koy([A, Dn, En]);
      const a = dis(A, Bp, Dn, hs + 4), b = dis(A, C, En, hs + 4);
      hd.setAttribute('x', a[0]); hd.setAttribute('y', a[1]); he.setAttribute('x', b[0]); he.setAttribute('y', b[1]);
    };
    yerle(t);
    gizle(ade.g, cit.g, hd, he);
    return { g, T, tri, ade, cit, hd, he, yerle, D: () => Dn, E: () => En };
  }

  /* Eşit açı yayları (senaryo 3): A'da çift yay, B ve D'de tek yay, C ve E'de üç yay. Başta gizli. */
  function yaylariKur(c, p, f, r, aralik) {
    const [A, Bp, C] = f.T, Dn = f.D(), En = f.E();
    const y = (V, P, Q, n, renk) => B.esitYay(c, p, V, P, Q, n, renk, { r, aralik });
    const o = { A: y(A, Bp, C, 2, EL[1]), B: y(Bp, A, C, 1, EL[0]), D: y(Dn, A, En, 1, EL[0]), C: y(C, A, Bp, 3, EL[2]), E: y(En, A, Dn, 3, EL[2]) };
    gizle(Object.values(o));
    return o;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: DE // BC ise ADE ile ABC.
    const g1 = c.S('g', {}, svg), T = D.ucgenTaban(10, 15, 12, [300, 470], 30);
    const f = ucgenKur(c, g1, T, 0.4, { harfSize: 28 }), yay = yaylariKur(c, g1, f, 22, 6);
    gizle(f.g); await belir(c, f.g, 450); await belir(c, [f.cit.g, f.hd, f.he], 400);
    await c.choice({
      tag: 'Hatırla', q: 'DE // BC olan ABC üçgeninde (D ∈ AB, E ∈ AC) ADE ile ABC için hangisi doğrudur?',
      options: ['Eştir: kenarları aynıdır', 'Benzerdir: ortak açı ve yöndeş açılar eşit', 'Benzer değildir: DE daha kısadır'], answer: 1,
      hints: ['Kenara paralel çizilen doğru, ortak açı ve yöndeş açılarla benzer üçgen verir.', '', 'Kenara paralel çizilen doğru, ortak açı ve yöndeş açılarla benzer üçgen verir.'],
      right: 'Evet. Ortak açı ve yöndeş açılar eşit.',
    });
    c.clearSay();
    await par(belir(c, f.ade.g, 500), belir(c, Object.values(yay), 500));
    await c.say('Kenara paralel çizilen doğru, ortak açı ve yöndeş açılarla benzer üçgen verir.');
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: ABC ~ DEF, |AB|/|DE|.
    const g2 = c.S('g', {}, svg);
    const P = [[170, 150], [80, 400], [360, 400]], k = 0.55, E0 = [620, 400];
    const Q = P.map((q) => [E0[0] + (q[0] - P[1][0]) * k, E0[1] + (q[1] - P[1][1]) * k]);
    B.notrUcgen(c, g2, P, ['A', 'B', 'C']); B.notrUcgen(c, g2, Q, ['D', 'E', 'F']);
    const yz = B.eslemeYazisi(c, g2, 500, 70, 'ABC', 'DEF', '~', { ucgenSimge: false, size: 44 });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC ~ DEF ise |AB|/|DE| hangi orana eşittir?',
      options: ['|BC|/|DF|', '|AC|/|EF|', '|BC|/|EF|'], answer: 2,
      hints: ['Karşılıklı köşeler aynı sırada yazılır: A↔D, B↔E, C↔F; oranlar karşılıklı kenarlar arasındadır.', 'Karşılıklı köşeler aynı sırada yazılır: A↔D, B↔E, C↔F; oranlar karşılıklı kenarlar arasındadır.', ''],
      right: 'Evet. BC’nin karşılığı EF.',
    });
    const kenar = [cizgi(c, g2, P[0], P[1], EL[2], 6), cizgi(c, g2, Q[0], Q[1], EL[2], 6), cizgi(c, g2, P[1], P[2], EL[0], 6), cizgi(c, g2, Q[1], Q[2], EL[0], 6)];
    const oran = renkli(c, g2, 500, 510, [['|AB|', EL[2]], '/', ['|DE|', EL[2]], ' = ', ['|BC|', EL[0]], '/', ['|EF|', EL[0]]], { size: 34, kalin: 700 });
    gizle(kenar, oran);
    await par(c.say('Karşılıklı köşeler aynı sırada yazılır; oranlar karşılıklı kenarlar arasındadır.'), belir(c, [...kenar, oran], 500));
  }

  /* ---- 2. Çit ---- */
  async function cit(c) {
    const svg = c.svg(1000, 562);
    const T = D.ucgenTaban(10, 15, 12, [100, 480], 40), [A, Bp, C] = T, M = agirlik(T);
    const f = ucgenKur(c, svg, T, 0.4, { harfSize: 28 }), Dn = f.D(), En = f.E();
    const yay = yaylariKur(c, svg, f, 28, 7);
    const g = c.S('g', {}, svg);
    const LK = (P, Q, m, r, o) => D.kenarYazi(c, g, P, Q, m, r, Object.assign({ merkez: M, size: 26 }, o));
    const tam = [LK(A, Bp, '10', MAVI, { t: 0.75 }), LK(A, C, '15', MAVI, { t: 0.75 })];
    const ad = LK(A, Dn, '4', TURUNCU, { ic: true, uzak: 16 }), ae = LK(A, En, '6', TURUNCU, { ic: true, uzak: 16 });
    const db = LK(Dn, Bp, '6', YESIL, { ic: true, uzak: 16 }), ec = LK(En, C, '9', YESIL, { ic: true, uzak: 16 });
    // Sağdaki oranlar.
    const RX = 696, sat = (y, parcalar) => renkli(c, svg, RX, y, parcalar, { hiza: 'start', size: 24 });
    const o1 = sat(160, [['4', TURUNCU], '/', ['6', YESIL], ' = 2/3']), o2 = sat(212, [['6', TURUNCU], '/', ['9', YESIL], ' = 2/3']);
    const kopru = c.S('g', {}, svg);
    c.S('path', { d: 'M850,146 H862 V198 H850', fill: 'none', stroke: SARI, 'stroke-width': 3, 'stroke-linecap': 'round' }, kopru);
    yazi(c, kopru, 892, 187, '=', { size: 38, kalin: 700, renk: SARI });
    const formul = sat(160, [['|AD|', TURUNCU], '/', ['|AB|', MAVI], ' = ', ['|AE|', TURUNCU], '/', ['|AC|', MAVI]]);
    const k1 = sat(214, [['4', TURUNCU], '/', ['10', MAVI], ' = 2/5']), k2 = sat(268, [['6', TURUNCU], '/', ['15', MAVI], ' = 2/5']);
    const k3 = sat(340, [['4', TURUNCU], '/', ['6', YESIL], ' = ', ['6', TURUNCU], '/', ['9', YESIL], ' = 2/3']);
    // Beşe bölünmüş çubuklar.
    const bx = 706;
    const grup = (by, w, adi, uzun, parca) => {
      const gg = c.S('g', {}, svg);
      renkli(c, gg, bx, by - 36, [[adi + ':', MAVI], ' ' + uzun + ' m'], { hiza: 'start', size: 24, kalin: 700 });
      const cb = D.parcaCubuk(c, gg, { x: bx, y: by, w, n: 5 });
      yazi(c, gg, bx + w / 10, by - 10, parca + ' m', { size: 20, kalin: 700, renk: RENK.soluk });
      return { g: gg, cb };
    };
    const ab = grup(150, 180, 'AB', 10, 2), ac = grup(336, 270, 'AC', 15, 3);
    const ad2 = (by, w, a1, a2) => [yazi(c, svg, bx + 0.2 * w, by + 64, a1, { size: 24, kalin: 700, renk: TURUNCU }), yazi(c, svg, bx + 0.7 * w, by + 64, a2, { size: 24, kalin: 700, renk: YESIL })];
    const nAB = ad2(150, 180, 'AD', 'DB'), nAC = ad2(336, 270, 'AE', 'EC');
    const rAB = renkli(c, svg, bx, 256, [['AD', TURUNCU], '/', ['DB', YESIL], ' = 2/3'], { hiza: 'start', size: 24, kalin: 700 });
    const rAC = renkli(c, svg, bx, 442, [['AE', TURUNCU], '/', ['EC', YESIL], ' = 2/3'], { hiza: 'start', size: 24, kalin: 700 });
    gizle(f.g, tam, ad, ae, db, ec, o1, o2, kopru, formul, k1, k2, k3, ab.g, ac.g, nAB, nAC, rAB, rAC);

    await par(c.say('Üçgen biçimli bir arsanın AB kenarı 10 m, AC kenarı 15 m.', { speak: 'Üçgen biçimli bir arsanın A B kenarı on metre, A C kenarı on beş metre.' }), (async () => { await belir(c, f.g, 450); await belir(c, tam, 450); })());
    await par(c.say('Arsanın BC kenarına paralel bir çit çekilecek.', { speak: 'Arsanın B C kenarına paralel bir çit çekilecek.' }), belir(c, f.cit.g, 600));
    await par(c.say('Çitin uçları D ve E; DE doğrusu BC’ye paralel.', { speak: 'Çitin uçları D ve E; D E doğrusu B C’ye paralel.' }), belir(c, [f.hd, f.he], 450));
    await par(c.say('D noktası A’dan 4 m, E noktası A’dan 6 m uzakta.', { speak: 'D noktası A’dan dört metre, E noktası A’dan altı metre uzakta.' }), belir(c, [ad, ae], 450));
    await par(c.say('Kalan parçalar: |DB| = 6 m ve |EC| = 9 m.', { speak: 'Kalan parçalar: D B uzunluğu altı metre ve E C uzunluğu dokuz metre.' }), (async () => { await belir(c, [db, ec], 450); await belir(c, tam, 300, 0); })());
    await par(c.say('AD ile DB’nin oranı 4/6, yani 2/3.', { speak: 'A D ile D B’nin oranı dört bölü altı, yani iki bölü üç.' }), belir(c, o1, 450));
    await par(c.say('AE ile EC’nin oranı 6/9, yani 2/3.', { speak: 'A E ile E C’nin oranı altı bölü dokuz, yani iki bölü üç.' }), belir(c, o2, 450));
    await par(c.say('Çit iki kenarı da aynı oranda bölmüş.', { speak: '[thoughtful] Çit iki kenarı da aynı oranda bölmüş.' }), belir(c, kopru, 450));
    // Benzerlik.
    await belir(c, [o1, o2, kopru, db, ec], 300, 0);
    await par(c.say('DE, BC’ye paralel olduğu için ADE, ABC’ye benzerdir.', { speak: 'D E, B C’ye paralel olduğu için A D E, A B C’ye benzerdir.' }), (async () => { await belir(c, f.ade.g, 500); await belir(c, Object.values(yay), 500); })());
    await par(c.say('Karşılıklı kenarlar orantılı: |AD|/|AB| = |AE|/|AC|.', { speak: 'Karşılıklı kenarlar orantılı: A D bölü A B, A E bölü A C’ye eşit.' }), belir(c, formul, 450));
    await par(c.say('4/10 ile 6/15: ikisi de 2/5.', { speak: 'Dört bölü on ile altı bölü on beş: ikisi de iki bölü beş.' }), (async () => { await belir(c, tam, 400); await belir(c, formul, 250, 0); await belir(c, [k1, k2], 450); })());
    await par(c.say('2/5 bütüne göre oran; parçaların oranı ise 2/3.', { speak: 'İki bölü beş bütüne göre oran; parçaların oranı ise iki bölü üç.' }), (async () => { await belir(c, [db, ec], 400); await belir(c, k3, 450); })());
    // Beş eşit parça.
    await belir(c, [k1, k2, k3, ...tam, db, ec, ad, ae, ...Object.values(yay)], 350, 0);
    await par(c.say('AB’yi beş eşit parçaya bölelim: her parça 2 m.', { speak: 'A B’yi beş eşit parçaya bölelim: her parça iki metre.' }), belir(c, ab.g, 500));
    await par(c.say('AD iki parça, DB üç parça.', { speak: 'A D iki parça, D B üç parça.' }), (async () => {
      ab.cb.renkle([0, 1], TURUNCU); ab.cb.renkle([2, 3, 4], YESIL);
      await belir(c, [...nAB, rAB], 450);
    })());
    await par(c.say('AC’yi de beş eşit parçaya bölelim: her parça 3 m.', { speak: 'A C’yi de beş eşit parçaya bölelim: her parça üç metre.' }), belir(c, ac.g, 500));
    c.clearSay();
    ac.cb.renkle([0, 1], TURUNCU); nAC[1].textContent = 'EC';
    await belir(c, nAC[0], 450); await belir(c, nAC[1], 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'AE iki parça (6 m). EC kaç parçadır?', options: ['2 parça', '5 parça', '3 parça'], answer: 2,
      hints: ['Beş parçadan ikisini çıkar.', 'AC beş parçaydı; ikisi AE’ydi.', ''],
      right: 'Evet. Beş parçadan ikisi AE; kalan üç parça EC.',
    });
    ac.cb.renkle([2, 3, 4], YESIL);
    await par(c.say('EC üç parça: AE ile EC’nin oranı 2/3.', { speak: 'E C üç parça: A E ile E C’nin oranı iki bölü üç.' }), belir(c, rAC, 450));
    await par(c.say('Parçaların oranı iki kenarda da aynı.'), buyut(c, [rAB, rAC], 900));
  }

  /* ---- 3. İspat: benzerlikten başla ---- */
  async function ispat1(c) {
    const svg = c.svg(1000, 562);
    const T = D.ucgenTaban(10, 15, 12, [50, 500], 24), [A, Bp] = T;
    const f = ucgenKur(c, svg, T, 0.4, { harfSize: 24 }), yay = yaylariKur(c, svg, f, 18, 6), Dn = f.D();
    const tahta = D.ispatTahtasi(c, svg, { x: 360, y: 210, aralik: 58, verilen: 'DE // BC', istenen: '|AD|/|DB| = |AE|/|EC|', size: 23 });
    const s1 = tahta.ekle('m(ADE) = m(ABC)', 'DE // BC, AB kesen: yöndeş açılar eşit');
    const s2 = tahta.ekle('m(DAE) = m(BAC)', 'A açısı ortaktır');
    const s3 = tahta.ekle([['ADE', TURUNCU], ' ~ ABC'], 'iki açı eşit: Açı-Açı');
    const s4 = tahta.ekle([['|AD|', TURUNCU], '/', ['|AB|', MAVI], ' = ', ['|AE|', TURUNCU], '/', ['|AC|', MAVI]], 'karşılıklı kenarlar orantılı');
    const oAD = cizgi(c, svg, A, Dn, TURUNCU, 7), oAB = cizgi(c, svg, A, Bp, MAVI, 7);
    gizle(f.g, tahta.baslik, oAD, oAB);

    await par(c.say('Sayılarla gördük; şimdi bunu her üçgen için gösterelim.', { speak: '[curious] Sayılarla gördük; şimdi bunu her üçgen için gösterelim.' }), (async () => { await belir(c, f.g, 450); await belir(c, [f.cit.g, f.hd, f.he], 450); })());
    await par(c.say('Verilen: DE // BC. İstenen: |AD|/|DB| = |AE|/|EC|.', { speak: 'Verilen: D E, B C’ye paralel. İstenen: A D bölü D B, A E bölü E C’ye eşit.' }), belir(c, tahta.baslik, 500));
    await par(c.say('DE // BC; AB kesen: yöndeş açılar eşit.', { speak: 'D E, B C’ye paralel; A B kesen: yöndeş açılar eşit.' }), (async () => { await tahta.ac(s1); await belir(c, [yay.B, yay.D], 450); })());
    await par(c.say('A açısı iki üçgende ortak.'), (async () => { await tahta.ac(s2); await belir(c, yay.A, 450); })());
    await par(c.say('İki açı eşit: Açı-Açı; ADE ~ ABC.', { speak: 'İki açı eşit: Açı-Açı; A D E, A B C’ye benzer.' }), (async () => { await tahta.ac(s3); await belir(c, f.ade.g, 450); await belir(c, [yay.C, yay.E], 450); })());
    c.clearSay();
    await belir(c, oAD, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ADE ~ ABC ise |AD| kenarının karşılığı hangisidir?', options: ['|AC|', '|AB|', '|DB|'], answer: 1,
      hints: ['Köşeler sırayla eşleşir: A↔A, D↔B, E↔C.', '', 'AD kenarı A ile D arasında; karşılığı A ile B arasında.'],
      right: 'Evet. D, B’nin karşılığı; AD’nin karşılığı AB.',
    });
    await belir(c, oAB, 400);
    await par(c.say('Karşılıklı kenarlar orantılı: |AD|/|AB| = |AE|/|AC|.', { speak: 'Karşılıklı kenarlar orantılı: A D bölü A B, A E bölü A C’ye eşit.' }), (async () => {
      await tahta.ac(s4); await vurgula(c, [oAD, oAB], 700); await belir(c, [oAD, oAB], 300, 0);
    })());
  }

  /* ---- 4. İspat: parçalara geçiş, örnekler ---- */
  async function ispat2(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const T = D.ucgenTaban(10, 15, 12, [64, 500], 22), [A, Bp, C] = T, M = agirlik(T);
    const f = ucgenKur(c, g1, T, 0.4, { harfSize: 24 }), Dn = f.D(), En = f.E();
    const LK = (P, Q, m, r, o) => D.kenarYazi(c, g1, P, Q, m, r, Object.assign({ merkez: M, size: 22 }, o));
    const etiket = [LK(A, Bp, '10', MAVI, { t: 0.75 }), LK(A, C, '15', MAVI, { t: 0.75 }), LK(A, Dn, '4', TURUNCU, { ic: true, uzak: 14 }), LK(A, En, '6', TURUNCU, { ic: true, uzak: 14 }), LK(Dn, Bp, '6', YESIL, { ic: true, uzak: 14 }), LK(En, C, '9', YESIL, { ic: true, uzak: 14 })];
    f.ade.g.style.opacity = 1; f.cit.g.style.opacity = 1; f.hd.style.opacity = 1; f.he.style.opacity = 1;
    const tahta = D.ispatTahtasi(c, g1, { x: 372, y: 90, aralik: 46, size: 22 });
    const s4 = tahta.ekle([['|AD|', TURUNCU], '/', ['|AB|', MAVI], ' = ', ['|AE|', TURUNCU], '/', ['|AC|', MAVI]], 'karşılıklı kenarlar orantılı');
    const s5 = tahta.ekle([['|AB|', MAVI], '/', ['|AD|', TURUNCU], ' = ', ['|AC|', MAVI], '/', ['|AE|', TURUNCU]], 'eşit oranların tersleri de eşittir');
    const s6 = tahta.ekle([['|AB|', MAVI], '/', ['|AD|', TURUNCU], ' − 1 = ', ['|AC|', MAVI], '/', ['|AE|', TURUNCU], ' − 1'], 'iki yandan 1 çıkar');
    const s7 = tahta.ekle([['|DB|', YESIL], '/', ['|AD|', TURUNCU], ' = ', ['|EC|', YESIL], '/', ['|AE|', TURUNCU]], '1 = |AD|/|AD|; |AB| − |AD| = |DB|');
    const s8 = tahta.ekle([['|AD|', TURUNCU], '/', ['|DB|', YESIL], ' = ', ['|AE|', TURUNCU], '/', ['|EC|', YESIL]], 'tersleri al ∎');
    const sayi = (y, parcalar) => { const t = renkli(c, g1, 372, y, parcalar, { hiza: 'start', size: 24, kalin: 700 }); return t; };
    const n1 = sayi(370, [['10', MAVI], '/', ['4', TURUNCU], ' = ', ['15', MAVI], '/', ['6', TURUNCU]]);
    const n2 = sayi(416, [['6', YESIL], '/', ['4', TURUNCU], ' = ', ['9', YESIL], '/', ['6', TURUNCU]]);
    const n3 = sayi(462, [['2', TURUNCU], '/', ['3', YESIL], ' = ', ['6', TURUNCU], '/', ['9', YESIL]]);
    const ad = yazi(c, g1, 400, 522, 'Temel orantı teoremi', { hiza: 'start', size: 30, kalin: 700, renk: SARI });
    gizle(n1, n2, n3, ad);
    s4.el.style.opacity = 0.55; s4.gorunur = true;
    [n1, n2, n3].forEach((t) => { t.setAttribute('fill-opacity', 0.75); });

    await par(c.say('İki oran eşitse tersleri de eşittir: |AB|/|AD| = |AC|/|AE|.', { speak: 'İki oran eşitse tersleri de eşittir: A B bölü A D, A C bölü A E’ye eşit.' }), (async () => { await tahta.ac(s5); await belir(c, n1, 450); })());
    await par(c.say('İki yandan 1 çıkaralım.', { speak: 'İki yandan bir çıkaralım.' }), tahta.ac(s6));
    await par(c.say('1, |AD|/|AD| demektir; |AB| − |AD| farkı |DB|’dir.', { speak: 'Bir, A D bölü A D demektir; A B eksi A D farkı D B’dir.' }), (async () => { await tahta.ac(s7); await belir(c, n2, 450); })());
    await par(c.say('Sol yan |DB|/|AD|, sağ yan |EC|/|AE| olur.', { speak: 'Sol yan D B bölü A D, sağ yan E C bölü A E olur.' }), tahta.parla(s7, SARI, 900));
    await par(c.say('Terslerini alalım: |AD|/|DB| = |AE|/|EC|.', { speak: 'Terslerini alalım: A D bölü D B, A E bölü E C’ye eşit.' }), (async () => { await tahta.ac(s8); await belir(c, n3, 450); })());
    await par(c.say('İspat tamam: paralel doğru iki kenarı aynı oranda böler.', { speak: 'İspat tamam: paralel doğru iki kenarı aynı oranda böler.' }), tahta.parla(s8, YESIL, 900));
    await par(c.say('Bu sonuca temel orantı teoremi denir.'), belir(c, ad, 500));
    c.note('<b>Temel orantı:</b> DE // BC ise |AD|/|DB| = |AE|/|EC|.', 'Temel orantı', 'd1-temel-oranti');

    // Örnekle göster.
    c.clearSay();
    await sil(c, g1, 450);
    const g2 = c.S('g', {}, svg);
    const T2 = D.ucgenTaban(10, 15, 12, [50, 480], 36), M2 = agirlik(T2);
    const f2 = ucgenKur(c, g2, T2, 0.6, { harfSize: 28 }), D2 = f2.D(), E2 = f2.E();
    const L2 = (P, Q, m, r) => D.kenarYazi(c, g2, P, Q, m, r, { merkez: M2, size: 26, ic: true, uzak: 16 });
    const e1 = L2(T2[0], D2, '6', TURUNCU), e2 = L2(D2, T2[1], '4', YESIL), e3 = L2(T2[0], E2, '9', TURUNCU), e4 = L2(E2, T2[2], '?', YESIL);
    const RX = 560, sat = (y, parcalar) => renkli(c, g2, RX, y, parcalar, { hiza: 'start', size: 28, kalin: 700 });
    const r1 = sat(190, [['|AD|', TURUNCU], '/', ['|DB|', YESIL], ' = ', ['6', TURUNCU], '/', ['4', YESIL], ' = 3/2']);
    const r2 = sat(246, ['3/2 = ', ['|AE|', TURUNCU], '/', ['|EC|', YESIL]]);
    const r3 = sat(320, [['9', TURUNCU], '/', ['|EC|', YESIL], ' = 3/2']);
    const r4 = sat(376, [['|EC|', YESIL], ' = ', ['6', YESIL]]);
    gizle(g2, r1, r2, r3, r4, e1, e2, e3, e4);
    await belir(c, g2, 450);
    await belir(c, f2.cit.g, 300); await belir(c, [f2.hd, f2.he], 300);
    await par(c.say('|AD| = 6, |DB| = 4 ve |AE| = 9 olsun.', { speak: 'A D uzunluğu altı, D B uzunluğu dört ve A E uzunluğu dokuz olsun.' }), belir(c, [e1, e2, e3, e4], 450));
    await par(c.say('|AD|/|DB| = 6/4 = 3/2; bu oran |AE|/|EC|’ye eşit.', { speak: 'A D bölü D B eşittir altı bölü dört, yani üç bölü iki; bu oran A E bölü E C’ye eşit.' }), (async () => { await belir(c, r1, 450); await belir(c, r2, 450); })());
    await par(c.say('9/|EC| = 3/2 olduğundan |EC| = 6.', { speak: 'Dokuz bölü E C eşittir üç bölü iki olduğundan E C uzunluğu altı.' }), (async () => { await belir(c, r3, 450); await belir(c, r4, 450); cevapla(e4, '6'); })());
    c.clearSay();
    await sil(c, g2, 450);

    // Sıra sende.
    const g3 = c.S('g', {}, svg);
    const T3 = D.ucgenTaban(15, 12, 14, [50, 480], 28), M3 = agirlik(T3);
    const f3 = ucgenKur(c, g3, T3, 1 / 3, { harfSize: 28 }), D3 = f3.D(), E3 = f3.E();
    const L3 = (P, Q, m, r) => D.kenarYazi(c, g3, P, Q, m, r, { merkez: M3, size: 26, ic: true, uzak: 16 });
    const q1 = L3(T3[0], D3, '5', TURUNCU), q2 = L3(D3, T3[1], '10', YESIL), q3 = L3(T3[0], E3, '?', TURUNCU), q4 = L3(E3, T3[2], '8', YESIL);
    gizle(g3); await belir(c, g3, 450); await belir(c, [f3.cit.g, f3.hd, f3.he], 300);
    await c.choice({
      tag: 'Sıra sende', q: '|AD| = 5 m, |DB| = 10 m ve |EC| = 8 m. |AE| kaç metredir?', options: ['16 m', '4 m', '13 m'], answer: 1,
      hints: ['|AE|, |EC|’nin yarısı olmalı.', '', '|AD|/|DB| = |AE|/|EC|; |AD|/|DB| = 5/10.'],
      right: 'Evet. 5/10 = 1/2; |AE| de |EC|’nin yarısı: 4 m.',
    });
    cevapla(q3, '4');
    const oc = D.oranCubuklari(c, g3, { x: 700, y: 200, w: 250, oranlar: [[5, 10], [4, 8]], etiket: ['5/10', '4/8'] });
    gizle(oc.g);
    await par(c.say('5/10 ile 4/8 aynı oran: ikisi de 1/2.', { speak: 'Beş bölü on ile dört bölü sekiz aynı oran: ikisi de bir bölü iki.' }), belir(c, oc.g, 500));
  }

  /* ---- 5. İki paralel ---- */
  async function ikiParalel(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const T = D.ucgenTaban(7, 12.25, 11.85, [60, 470], 44), [A, Bp, C] = T, M = agirlik(T);
    const Dn = ara(A, Bp, 4 / 7), En = ara(A, C, 4 / 7), Fn = ara(A, C, 16 / 49);
    const yABE = cokgen(c, g1, [A, Bp, En], MAVI, { dolgu: 0.3, w: 4 }), yABC = cokgen(c, g1, T, MAVI, { dolgu: 0.26, w: 4 });
    const tri = cokgen(c, g1, T, MAVI, { harf: ['A', 'B', 'C'], harfSize: 28, dolgu: 0.06 });
    const be = cizgi(c, g1, Bp, En, D.GRI, 3.5), de = dogru(c, g1, Dn, En), df = dogru(c, g1, Dn, Fn);
    const dis = (P, Q, X, u) => { const d = uz(P, Q); let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d; if ((X[0] - M[0]) * nx + (X[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; } return [X[0] + nx * u, X[1] + ny * u + 9]; };
    const harf = (X, a, b, ad) => { const q = dis(a, b, X, 30); return yazi(c, g1, q[0], q[1], ad, { size: 28, kalin: 700, renk: TURUNCU }); };
    const hD = harf(Dn, A, Bp, 'D'), hE = harf(En, A, C, 'E'), hF = harf(Fn, A, C, 'F');
    const LK = (P, Q, m, r, o) => D.kenarYazi(c, g1, P, Q, m, r, Object.assign({ merkez: M, size: 26 }, o));
    const lp = LK(A, Dn, 'p', TURUNCU), lk = LK(Dn, Bp, 'k', YESIL), l4 = LK(A, Fn, '4', TURUNCU), l3 = LK(Fn, En, '3', YESIL), lec = LK(En, C, '?', YESIL);
    // AE ayracı.
    const nA = (() => { const d = uz(A, C); let nx = -(C[1] - A[1]) / d, ny = (C[0] - A[0]) / d; if ((A[0] - M[0]) * nx + (A[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; } return [nx, ny]; })();
    const ayrac = c.S('g', {}, g1), a0 = [A[0] + nA[0] * 62, A[1] + nA[1] * 62], a1 = [En[0] + nA[0] * 62, En[1] + nA[1] * 62];
    cizgi(c, ayrac, a0, a1, TURUNCU, 3.5);
    [a0, a1].forEach((q) => cizgi(c, ayrac, [q[0] + nA[0] * 9, q[1] + nA[1] * 9], [q[0] - nA[0] * 9, q[1] - nA[1] * 9], TURUNCU, 3.5));
    const mA = ara(a0, a1, 0.5), lae = yazi(c, ayrac, mA[0] + nA[0] * 28, mA[1] + nA[1] * 28 + 9, '?', { size: 26, kalin: 700, renk: TURUNCU });
    const RX = 690, sat = (y, parcalar) => renkli(c, g1, RX, y, parcalar, { hiza: 'start', size: 24, kalin: 700 });
    const o1 = sat(160, [['|AD|', TURUNCU], '/', ['|DB|', YESIL], ' = ', ['|AF|', TURUNCU], '/', ['|FE|', YESIL]]);
    const o2 = sat(214, [['p', TURUNCU], '/', ['k', YESIL], ' = ', ['4', TURUNCU], '/', ['3', YESIL]]);
    const o3 = sat(268, [['p', TURUNCU], '/', ['k', YESIL], ' = ', ['|AE|', TURUNCU], '/', ['|EC|', YESIL]]);
    const o4 = sat(322, [['4', TURUNCU], '/', ['3', YESIL], ' = ', ['7', TURUNCU], '/', ['|EC|', YESIL]]);
    const o5 = sat(376, ['4·', ['|EC|', YESIL], ' = 21']);
    const o6 = sat(430, [['|EC|', YESIL], ' = 21/4 = 5,25']);
    gizle(g1, yABE.g, yABC.g, de.g, df.g, be, hD, hE, hF, lp, lk, l4, l3, lec, ayrac, o1, o2, o3, o4, o5, o6);

    await par(c.say('Bu kez üçgende iki paralel doğru var.'), (async () => { await belir(c, g1, 450); await belir(c, [de.g, df.g, be, hD, hE, hF], 500); })());
    await par(c.say('DF, BE’ye paralel; DE ise BC’ye paralel.', { speak: 'D F, B E’ye paralel; D E ise B C’ye paralel.' }), (async () => { await vurgula(c, [df.hat, be], 800); await vurgula(c, [de.hat, tri.yuz], 800); })());
    await par(c.say('|AF| = 4 ve |FE| = 3; |EC| aranıyor.', { speak: 'A F uzunluğu dört ve F E uzunluğu üç; E C uzunluğu aranıyor.' }), belir(c, [l4, l3, lec], 450));
    await par(c.say('|AD| = p ve |DB| = k diyelim.', { speak: 'A D uzunluğu p ve D B uzunluğu k diyelim.' }), belir(c, [lp, lk], 450));
    await par(c.say('ABE üçgeninde DF // BE: |AD|/|DB| = |AF|/|FE|.', { speak: 'A B E üçgeninde D F, B E’ye paralel: A D bölü D B, A F bölü F E’ye eşit.' }), (async () => { await belir(c, yABE.g, 450); await belir(c, o1, 450); })());
    await par(c.say('Yani p/k = 4/3.', { speak: 'Yani p bölü k eşittir dört bölü üç.' }), belir(c, o2, 450));
    c.clearSay();
    await par(belir(c, yABE.g, 400, 0), belir(c, yABC.g, 400), belir(c, [o1], 300, 0), belir(c, [ayrac], 450));
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC üçgeninde de DE // BC; |AE| kaç cm?', options: ['4 cm', '7 cm', '3 cm'], answer: 1,
      hints: ['4 yalnızca ilk parçaydı.', '', '|AE|, |AF| ile |FE|’nin toplamı.'],
      right: 'Evet. |AE| = |AF| + |FE| = 4 + 3 = 7 cm.',
    });
    cevapla(lae, '7');
    await par(c.say('ABC üçgeninde DE // BC: p/k = |AE|/|EC|.', { speak: 'A B C üçgeninde D E, B C’ye paralel: p bölü k eşittir A E bölü E C.' }), belir(c, o3, 450));
    await par(c.say('p/k = 4/3 olduğundan 4/3 = 7/|EC|.', { speak: 'p bölü k eşittir dört bölü üç olduğundan dört bölü üç eşittir yedi bölü E C.' }), (async () => { await belir(c, [o2], 300, 0); await belir(c, o4, 450); })());
    await par(c.say('İçler dışlar: 4·|EC| = 21.', { speak: 'İçler dışlar: dört çarpı E C eşittir yirmi bir.' }), (async () => { await belir(c, [o3], 300, 0); await belir(c, o5, 450); })());
    await par(c.say('|EC| = 21/4 cm, yani 5,25 cm.', { speak: 'E C uzunluğu yirmi bir bölü dört santimetre, yani beş virgül yirmi beş santimetre.' }), (async () => { await belir(c, o6, 450); cevapla(lec, '5,25'); })());
    c.note('<b>İki paralel:</b> aynı oran iki üçgende: |AD|/|DB| = |AF|/|FE| = |AE|/|EC|.', 'İki paralel', 'd1-iki-paralel');

    // Sıra sende: ev çatısı.
    c.clearSay();
    await sil(c, g1, 450);
    const g2 = c.S('g', {}, svg);
    const T2 = D.ucgenTaban(3.04, 3.8, 2.97, [60, 470], 95), M2 = agirlik(T2);
    const f2 = ucgenKur(c, g2, T2, 1.12 / 3.04, { harfSize: 28 }), D2 = f2.D(), E2 = f2.E();
    const L2 = (P, Q, m, r) => D.kenarYazi(c, g2, P, Q, m, r, { merkez: M2, size: 26 });
    const c1 = L2(T2[0], D2, '?', TURUNCU), c2 = L2(T2[0], E2, '1,4', TURUNCU), c3 = L2(E2, T2[2], '2,4', YESIL);
    const dB = renkli(c, g2, 480, 160, [['|BD|', YESIL], ' = ', ['|AD|', TURUNCU], ' + 0,8'], { hiza: 'start', size: 28, kalin: 700 });
    const sat2 = (y, parcalar) => renkli(c, g2, 480, y, parcalar, { hiza: 'start', size: 28, kalin: 700 });
    const h1 = sat2(240, [['x', TURUNCU], '/(', ['x', TURUNCU], ' + 0,8) = 7/12']);
    const h2 = sat2(296, ['12x = 7(x + 0,8)']);
    const h3 = sat2(352, ['5x = 5,6']);
    const h4 = sat2(408, ['x = 1,12']);
    const h5 = sat2(464, ['1,12/1,92 = 7/12']);
    const dBe = L2(D2, T2[1], '1,92', YESIL);
    gizle(g2, h1, h2, h3, h4, h5, dBe);
    await belir(c, g2, 450); await belir(c, [f2.cit.g, f2.hd, f2.he], 300);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir ev çatısında DE // BC; |AE| = 1,4 m ve |EC| = 2,4 m. |BD|, |AD|’den 0,8 m uzun. |AD| kaç metredir?', options: ['0,8 m', '1,4 m', '1,12 m'], answer: 2,
      hints: ['|AD| = x dersen |DB| = x + 0,8 olur.', 'x/(x + 0,8) = 1,4/2,4 = 7/12; içler dışlar.', ''],
      right: 'Evet. 12x = 7(x + 0,8) denkleminden x = 1,12.',
    });
    await par(c.say('x/(x + 0,8) = 1,4/2,4 = 7/12 olur.', { speak: 'x bölü x artı sıfır virgül sekiz, bir virgül dört bölü iki virgül dört, yani yedi bölü on iki olur.' }), belir(c, h1, 450));
    await par(c.say('İçler dışlar: 12x = 7(x + 0,8).', { speak: 'İçler dışlar: on iki x eşittir yedi çarpı x artı sıfır virgül sekiz.' }), (async () => { await belir(c, h1, 300, 0.3); await belir(c, h2, 450); })());
    await par(c.say('Düzenleyince 5x = 5,6 ve x = 1,12 çıkar.', { speak: 'Düzenleyince beş x eşittir beş virgül altı ve x eşittir bir virgül on iki çıkar.' }), (async () => { await belir(c, [h1, h2], 300, 0); await belir(c, h3, 400); await belir(c, h4, 400); cevapla(c1, '1,12'); })());
    await par(c.say('|AD| = 1,12 m ve |DB| = 1,92 m.', { speak: 'A D uzunluğu bir virgül on iki metre ve D B uzunluğu bir virgül doksan iki metre.' }), belir(c, dBe, 450));
    await par(c.say('Kontrol: 1,12/1,92 = 7/12 = 1,4/2,4.', { speak: 'Kontrol: bir virgül on iki bölü bir virgül doksan iki eşittir yedi bölü on iki, yani bir virgül dört bölü iki virgül dört.' }), (async () => { await belir(c, [h3, h4], 300, 0); await belir(c, h5, 450); })());
  }

  /* ---- 6. Dene: çitin yeri ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const T = D.ucgenTaban(10, 15, 12, [80, 490], 38);
    const f = ucgenKur(c, svg, T, 0.4, { harfSize: 28 });
    gizle(f.g); await belir(c, f.g, 450); await belir(c, [f.cit.g, f.hd, f.he], 400);
    const VERI = { 2: [8, 3, 12, '0,25', '0,2'], 3: [7, '4,5', '10,5', '0,43', '0,3'], 4: [6, 6, 9, '0,67', '0,4'], 5: [5, '7,5', '7,5', 1, '0,5'], 6: [4, 9, 6, '1,5', '0,6'], 7: [3, '10,5', '4,5', '2,33', '0,7'], 8: [2, 12, 3, 4, '0,8'] };
    const ETIK = ['|AD|', '|DB|', '|AE|', '|EC|', '|AD|/|DB|', '|AE|/|EC|', '|DE|/|BC|'], VX = TX + 176;
    const sat = ETIK.map((e, i) => yazi(c, svg, TX, 130 + i * 52, '', { hiza: 'start', size: 24, kalin: 700 }));
    gizle(sat);
    let simdiki = 4; const renk = { oran: null, de: null };
    const yaz = (t, e, v, r) => { t.textContent = ''; c.S('tspan', { text: e }, t); const s = c.S('tspan', { text: String(v), x: VX }, t); if (r) s.style.fill = r; };
    const guncelle = (ad) => {
      simdiki = +ad; const v = VERI[simdiki];
      f.yerle(simdiki / 10);
      const deg = [simdiki, v[0], v[1], v[2], v[3], v[3], v[4]];   // |AD|, |DB|, |AE|, |EC|, oran, oran, |DE|/|BC|
      deg.forEach((x, i) => yaz(sat[i], ETIK[i], x, i === 4 || i === 5 ? renk.oran : i === 6 ? renk.de : null));
    };
    guncelle(4);
    await belir(c, sat, 450);
    await c.say('Çiti kaydır; üç orana bak.', { noWait: true });
    const sl = c.slider({ label: 'Çitin yeri', min: 2, max: 8, step: 1, value: 4, fmt: () => '', onInput: (v) => { guncelle(v); } });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await par(c.say('Çit nereye giderse gitsin iki oran eşit kalıyor.'), (async () => { renk.oran = TURUNCU; guncelle(simdiki); await c.wait(600); })());
    await par(c.say('|DE|/|BC| oranı ise bunlara eşit değil.', { speak: 'D E bölü B C oranı ise bunlara eşit değil.' }), (async () => { renk.de = SARI; guncelle(simdiki); await c.wait(600); })());
    await c.say('Parçaların oranı, öbür kenardaki parçaların oranına eşittir.', { speak: '[thoughtful] Parçaların oranı, öbür kenardaki parçaların oranına eşittir.' });
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d1', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Üçgende paralel doğru kenarları aynı oranda böler', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Üçgende paralel doğru kenarları aynı oranda böler',
      hook: 'Üçgen bir arsayı bir kenarına <b>paralel bir çitle</b> bölersen öbür iki kenar hangi oranda bölünür?',
      button: 'Derse başla ›',
    },
    goals: ['Üçgende bir kenara paralel doğrunun öbür iki kenarı aynı oranda böldüğünü söyler.', 'Bu sonucu benzer üçgenlerle adım adım gösterir.', 'Bilinmeyen bir parçayı |AD|/|DB| = |AE|/|EC| eşitliğinden bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kenara paralel doğru benzer üçgen verir; benzerlikte oranlar karşılıklı kenarlardadır.', run: hatirla },
      { title: 'Çit', goal: 'Çit iki kenarı aynı oranda böler.', run: cit },
      { title: 'İspat: benzerlikten başla', goal: 'ADE ile ABC benzer; kenarları orantılı.', run: ispat1 },
      { title: 'İspat: parçalara geçiş', goal: 'Bütünün oranından parçaların oranına geçilir.', run: ispat2 },
      { title: 'İki paralel', goal: 'İki paralel doğruda aynı oran iki üçgende kurulur.', run: ikiParalel },
      { title: 'Dene: çitin yeri', goal: 'Çit nereye giderse gitsin parçaların oranı aynı kalır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'DE // BC olan ABC üçgeninde (D ∈ AB, E ∈ AC) hangi eşitlik her zaman doğrudur?',
        options: ['|AD|/|DB| = |DE|/|BC|', '|AD|/|DB| = |AE|/|EC|', '|AD|/|AE| = |DB|/|BC|'], answer: 1,
        why: ['|DE|/|BC| oranı |AD|/|AB| oranına eşittir; parça oranına değil. Parça oranı öbür kenardaki parça oranıyla kurulur.', 'Paralel doğru iki kenarı aynı oranda böler; bu eşitlik her zaman doğrudur.', '|DB| ile |BC| aynı oranda bölünen parçalar değildir. Oran |AD|/|DB| = |AE|/|EC| biçiminde kurulur.'],
        scene: 3,
      },
      {
        q: 'DE // BC; |AD| = 3 cm, |DB| = 5 cm, |AE| = 6 cm. |EC| kaç cm’dir?',
        options: ['3,6 cm', '9 cm', '10 cm'], answer: 2,
        why: ['3,6 cm, 3 × 6 ÷ 5 işleminden çıkar; oranlar eşit kurulmamış.', '9 cm, |AD| ile |AE|’nin toplamıdır; toplamlar oran vermez.', '3/5 = 6/|EC| olduğundan 3·|EC| = 30; |EC| = 10 cm.'],
        scene: 3,
      },
      {
        q: 'DE // BC; |AD|/|DB| = 3/4 ve |AC| = 14 cm. |AE| kaç cm’dir?',
        options: ['6 cm', '8 cm', '10,5 cm'], answer: 0,
        why: ['|AE|/|EC| = 3/4; |AC| 7 parça, her parça 2 cm: |AE| = 6 cm.', '8 cm, |EC| değeridir; |AE| 3 parça, |EC| 4 parçadır.', '14 × 3/4 = 10,5 işlemi bütünü 4 parçaya bölmek olur; oysa |AC| 7 parçadır.'],
        scene: 3,
      },
      {
        q: 'DF // BE ve DE // BC; |AF| = 6 cm, |FE| = 3 cm. |EC| kaç cm’dir?',
        options: ['18 cm', '4,5 cm', '3 cm'], answer: 1,
        why: ['18 cm, 6 × 3 çarpımıdır; oran kurulmamış.', '|AD|/|DB| = 6/3 = 2 ve |AE| = 9 cm; |AE|/|EC| = 2 olduğundan |EC| = 4,5 cm.', '3 cm, |FE| değeridir; |EC| için önce |AE| = 9 cm ve oran gerekir.'],
        scene: 4,
      },
      {
        q: 'Üçgen bir tarlanın |AB| kenarı 12 m, |AC| kenarı 15 m. BC’ye paralel çitin D ucu A’dan 8 m uzakta. Çitin E ucu A’dan kaç metre uzaktadır?',
        options: ['7,5 m', '12 m', '10 m'], answer: 2,
        why: ['7,5 m, |AC|’nin yarısıdır; oysa D, |AB|’nin yarısında değil, 8 m’dedir.', '12 m, |AB|’nin uzunluğudur; |AC| üzerindeki parça aranıyor.', '|DB| = 4 m; 8/4 = |AE|/|EC| = 2 olduğundan |AE| = 10 m.'],
        scene: 1,
      },
    ],
    summary: [
      'Paralel doğru iki kenarı aynı oranda böler.',
      'Oran, köşeye yakın parçalar arasında kurulur.',
      'Parça oranı, paralel kenarın oranı değildir.',
      '<b>Paralel doğru iki kenarı aynı oranda böler.</b>',
    ],
    nextLesson: { href: 'd2-tales.html', label: 'Sonraki: Tales teoremi: paraleller ve kesenler ›' },
  });
})();
