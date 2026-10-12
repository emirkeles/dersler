/* B5 — Kenarlarla benzerlik: Kenar-Kenar-Kenar ve Kenar-Açı-Kenar
   Üç kenarı orantılı ya da iki kenarı orantılı ve aradaki açısı eşit olan üçgenler benzerdir; oran 1 olunca koşullar eşlik koşuluna döner.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B5)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciYayi, aciIci, agirlik } = window.KIT;
  const B = window.KIT_B;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift

  const TX = 706;                                   // sağdaki sütunun sol kenarı
  const duz = (...x) => x.flat(Infinity);
  const sil = async (c, el, ms = 300) => { const es = duz(el); await belir(c, es, ms, 0); es.forEach((e) => e.remove()); };
  const satir = (c, p, y, parcalar, size = 25) => renkli(c, p, TX, y, parcalar, { hiza: 'start', size, kalin: 700 });
  const nabiz = (c, ts, ms = 700, t0 = 25) => c.tween(ms, (e) => ts.forEach((t) => t.setAttribute('font-size', t0 + 5 * Math.sin(Math.PI * e))));
  const nabizCizgi = (c, hatlar, w0 = 3, ms = 700) => c.tween(ms, (e) => hatlar.forEach((h) => h.setAttribute('stroke-width', w0 + 4 * Math.sin(Math.PI * e))));

  /* Tabanı yatay üçgen: köşeler [A, B, C]; B verilen nokta, C sağında; kenarlar |AB|, |BC|, |AC| birim, u piksel/birim. */
  function taban(Bp, BC, AB, AC, u) {
    const x = (AB * AB + BC * BC - AC * AC) / (2 * BC), h = Math.sqrt(AB * AB - x * x);
    return [[Bp[0] + x * u, Bp[1] - h * u], Bp, [Bp[0] + BC * u, Bp[1]]];
  }

  /* Nötr üçgen + her kenar karşısındaki köşenin renginde kalın çizgi + uzunluk yazıları (AB, BC, AC sırasıyla). */
  function ucgenSahne(c, g, P, harf, deger, o = {}) {
    const t = B.notrUcgen(c, g, P, harf, { harfSize: o.harfSize || 26 }), M = agirlik(P);
    const ks = [[0, 1, 2], [1, 2, 0], [0, 2, 1]];
    const hat = ks.map(([i, j, r]) => cizgi(c, g, P[i], P[j], EL[r], 6));
    const et = deger ? ks.map(([i, j, r], n) => B.kenarEtiketi(c, g, P[i], P[j], deger[n], EL[r], { merkez: M, size: o.size || 24 })) : [];
    return { t, hat, et };
  }

  /* Üçgenin üç açısına yay (i. köşede i + 1 yay) ve değer yazısı. */
  function acilar(c, g, P, degerler, r = 26, d = 26, adet = 3) {
    const yaylar = [], yazilar = [];
    for (let i = 0; i < adet; i++) {
      const j = (i + 1) % 3, k = (i + 2) % 3;
      yaylar.push(B.esitYay(c, g, P[i], P[j], P[k], i + 1, EL[i], { r }));
      const m = aciIci(P[i], P[j], P[k], r + i * 7 + d);
      yazilar.push(yazi(c, g, m[0], m[1] + 7, degerler[i], { size: 20, kalin: 700, renk: EL[i] }));
    }
    return { yaylar, yazilar };
  }

  /* Yazıyı P–Q kenarının dışına koyar (B.kenarEtiketi ile aynı yerleşim; yazı sonradan güncellenebilir). */
  function etiketYerle(el, P, Q, merkez, size = 24) {
    const M = ara(P, Q, 0.5), d = uz(P, Q) || 1;
    let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
    if ((M[0] - merkez[0]) * nx + (M[1] - merkez[1]) * ny < 0) { nx = -nx; ny = -ny; }
    const u = 22 + Math.abs(nx) * String(el.textContent).length * size * 0.28;
    el.setAttribute('x', M[0] + nx * u); el.setAttribute('y', M[1] + ny * u + size * 0.33);
  }

  /* Kasaba şekli: AB ∥ DC; ABC ve CAD üçgenleri; deger = [|AB|, |BC|, |CD|, |AC|] yazıları. */
  function kasaba(c, g, A, Bp, C, D, deger) {
    const Mq = agirlik([A, Bp, C, D]), Mu = agirlik([A, Bp, C]);
    const f1 = cokgen(c, g, [A, Bp, C], RENK.cizgi, { dolgu: 0.1 }), f2 = cokgen(c, g, [C, A, D], RENK.cizgi, { dolgu: 0.1 });
    f1.yuz.setAttribute('stroke', 'none'); f2.yuz.setAttribute('stroke', 'none');
    const kBC = cizgi(c, g, Bp, C, RENK.cizgi, 4), kAC = cizgi(c, g, A, C, RENK.cizgi, 4), kAD = cizgi(c, g, A, D, RENK.cizgi, 4, { 'stroke-dasharray': '10 8' });
    const kAB = cizgi(c, g, A, Bp, RENK.dogru, 5), kDC = cizgi(c, g, D, C, RENK.dogru, 5);
    const cev = (P, Q) => { const m = ara(P, Q, 0.5); return c.S('path', { d: `M${m[0] - 6},${m[1] - 8} L${m[0] + 4},${m[1]} L${m[0] - 6},${m[1] + 8}`, fill: 'none', stroke: RENK.dogru, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); };
    const paralel = [cev(A, Bp), cev(D, C)];
    const harf = [yazi(c, g, A[0] - 18, A[1] - 14, 'A', { size: 26, kalin: 700 }), yazi(c, g, Bp[0] + 18, Bp[1] - 14, 'B', { size: 26, kalin: 700 }),
      yazi(c, g, C[0] + 20, C[1] + 28, 'C', { size: 26, kalin: 700 }), yazi(c, g, D[0] - 20, D[1] + 28, 'D', { size: 26, kalin: 700 })];
    const lAB = B.kenarEtiketi(c, g, A, Bp, deger[0], RENK.yazi, { merkez: Mq }), lBC = B.kenarEtiketi(c, g, Bp, C, deger[1], RENK.yazi, { merkez: Mq });
    const lCD = B.kenarEtiketi(c, g, D, C, deger[2], RENK.yazi, { merkez: Mq }), lAC = B.kenarEtiketi(c, g, A, C, deger[3], RENK.yazi, { merkez: Mu });
    const lAD = B.kenarEtiketi(c, g, A, D, '?', RENK.yazi, { merkez: Mq });
    return { f1, f2, kAB, kBC, kAC, kAD, kDC, paralel, harf, lAB, lBC, lCD, lAC, lAD, kenarlar: [kAB, kBC, kAC, kDC], etiketler: [lAB, lBC, lCD, lAC] };
  }

  /* Tablo satırı: tek yazı, hücreler tspan x ile hizalı. */
  const KX = [50, 430, 705];
  function tabloSatir(c, p, y, hucreler, renkler, size = 24) {
    const t = yazi(c, p, KX[0], y, '', { hiza: 'start', size, kalin: 700 });
    hucreler.forEach((m, i) => { const s = c.S('tspan', { text: m, x: KX[i] }, t); s.style.fill = renkler[i]; });
    return t;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: iki açı eşit.
    const g1 = c.S('g', {}, svg);
    const P = B.ucgenKur('AKA', [4.5, 50, 60], [130, 420], { olcek: 40, aci: 0 }), Q = B.ucgenKur('AKA', [7.5, 50, 60], [470, 420], { olcek: 40, aci: 0 });
    B.notrUcgen(c, g1, P, ['A', 'B', 'C']); B.notrUcgen(c, g1, Q, ['D', 'E', 'F']);
    acilar(c, g1, P, ['50°', '60°'], 28, 30, 2); acilar(c, g1, Q, ['50°', '60°'], 34, 34, 2);
    const soru1 = B.eslemeYazisi(c, g1, 450, 515, 'ABC', 'DEF', '?', { ucgenSimge: false, size: 40 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC ve DEF üçgenlerinde m(A) = m(D) = 50° ve m(B) = m(E) = 60°. Üçgenler için hangisi doğrudur?',
      options: ['Eştirler', 'Hiçbir şey söylenemez', 'Benzerdirler'], answer: 2,
      hints: ['İki açı eşitse üçgenler benzerdir (Açı-Açı).', 'İki açı eşitse üçgenler benzerdir (Açı-Açı).', ''],
      right: 'Evet. İki açı eşitse üçgenler benzerdir.',
    });
    soru1.remove();
    const es1 = B.eslemeYazisi(c, g1, 450, 515, 'ABC', 'DEF', '~', { ucgenSimge: false, size: 40 });
    await c.say('İki açı eşit olduğundan üçgenler benzerdir.');
    c.clearSay();
    await sil(c, g1, 350);

    // İkinci soru: oran 1.
    const g2 = c.S('g', {}, svg);
    const U = B.ucgenKur('KKK', [4, 3, 5], [110, 430], { olcek: 55, aci: 0 }), V = B.ucgenKur('KKK', [4, 3, 5], [560, 430], { olcek: 55, aci: 0 });
    B.notrUcgen(c, g2, U, ['A', 'B', 'C']); B.notrUcgen(c, g2, V, ['D', 'E', 'F']);
    yazi(c, g2, 445, 340, 'k = 1', { size: 40, kalin: 700 });
    const soru2 = B.eslemeYazisi(c, g2, 445, 525, 'ABC', 'DEF', '?', { ucgenSimge: false, size: 40 });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Benzerlik oranı 1 olan iki üçgen için hangisi doğrudur?',
      options: ['Yalnızca benzerdirler', 'Açıları farklıdır', 'Eştirler'], answer: 2,
      hints: ['k = 1 ise kenarlar eşit; üçgenler eştir.', 'k = 1 ise kenarlar eşit; üçgenler eştir.', ''],
      right: 'Evet. Oran 1 ise kenarlar eşit; üçgenler eştir.',
    });
    soru2.remove();
    B.eslemeYazisi(c, g2, 445, 525, 'ABC', 'DEF', '≅', { ucgenSimge: false, size: 40 });
    await c.say('Oran 1 olunca kenarlar eşit; üçgenler eştir.', { speak: 'Oran bir olunca kenarlar eşit; üçgenler eştir.' });
  }

  /* ---- 2. Üç kenar orantılı ---- */
  async function ucKenar(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { b: 64, sutun: 10, satir: 7 });
    const ana = c.S('g', {}, svg), u = 32;
    const P = taban([82, 478], 5, 4, 6, u), Q = taban([312, 478], 10, 8, 12, u);
    const s1 = ucgenSahne(c, ana, P, ['A', 'B', 'C'], ['4', '5', '6']), s2 = ucgenSahne(c, ana, Q, ['D', 'E', 'F'], ['8', '10', '12']);
    const a1 = acilar(c, ana, P, ['56°', '83°', '41°'], 28, 28), a2 = acilar(c, ana, Q, ['56°', '83°', '41°'], 34, 34);
    const oran = [['8/4 = 2', EL[2]], ['10/5 = 2', EL[0]], ['12/6 = 2', EL[1]]].map((r, i) => satir(c, ana, 170 + i * 54, [r]));
    const es = B.eslemeYazisi(c, ana, TX, 340, 'ABC', 'DEF', '~', { ucgenSimge: false, size: 38, hiza: 'start' });
    const ad1 = yazi(c, ana, TX, 398, 'Kenar-Kenar-Kenar', { hiza: 'start', size: 26, kalin: 700 }), ad2 = yazi(c, ana, TX, 434, 'K.K.K.', { hiza: 'start', size: 26, kalin: 700 });
    gizle(s1.t.g, s2.t.g, s1.hat, s2.hat, s1.et, s2.et, a1.yaylar, a2.yaylar, a1.yazilar, a2.yazilar, oran, es, ad1, ad2);

    await par(c.say('İki üçgenin kenarları ölçüldü: ABC’de 4, 5, 6; DEF’de 8, 10, 12.', { speak: 'İki üçgenin kenarları ölçüldü: A B C’de dört, beş, altı; D E F’de sekiz, on, on iki.' }),
      belir(c, duz(s1.t.g, s2.t.g, s1.hat, s2.hat, s1.et, s2.et), 500));
    await par(c.say('Karşılıklı oranlar: 8/4 = 2, 10/5 = 2 ve 12/6 = 2.', { speak: 'Karşılıklı oranlar: sekiz bölü dört eşittir iki, on bölü beş eşittir iki ve on iki bölü altı eşittir iki.' }), (async () => {
      for (const o of oran) { await belir(c, o, 350); await c.wait(400); }
    })());
    await par(c.say('Üç oran da 2: kenarlar orantılı.', { speak: 'Üç oran da iki: kenarlar orantılı.' }), nabiz(c, oran));
    await par(c.say('Şimdi açıları ölçelim: A ve D yaklaşık 56°.', { speak: 'Şimdi açıları ölçelim: A ve D yaklaşık elli altı derece.' }), (async () => {
      await belir(c, duz(s1.et, s2.et), 300, 0);
      await belir(c, [a1.yaylar[0], a2.yaylar[0], a1.yazilar[0], a2.yazilar[0]], 450);
    })());
    await par(c.say('B ve E yaklaşık 83°; C ve F yaklaşık 41°.', { speak: 'B ve E yaklaşık seksen üç derece; C ve F yaklaşık kırk bir derece.' }),
      belir(c, [a1.yaylar[1], a1.yaylar[2], a2.yaylar[1], a2.yaylar[2], a1.yazilar[1], a1.yazilar[2], a2.yazilar[1], a2.yazilar[2]], 500));
    await par(c.say('Açılar karşılıklı eşit çıktı: üçgenler benzerdir.'), belir(c, es, 450));
    await par(c.say('Karşılıklı üç kenarı orantılı üçgenler benzerdir.'), belir(c, duz(a1.yazilar, a2.yazilar), 350, 0));
    await par(c.say('Bu koşulun adı Kenar-Kenar-Kenar benzerliğidir.'), belir(c, [ad1, ad2], 450));
    c.note('<b>K.K.K. benzerliği:</b> karşılıklı üç kenar orantılı.', 'Kenar-Kenar-Kenar', 'b5-kkk');
    c.clearSay();
    await sil(c, ana, 350);

    // Birlikte çöz: KLM ve PRT.
    const g2 = c.S('g', {}, svg), pu = 21;
    const K = taban([115, 478], 9, 6, 12, pu), R = taban([400, 478], 12, 8, 16, pu);
    ucgenSahne(c, g2, K, ['K', 'L', 'M'], ['6', '9', '12'], { size: 22 }); ucgenSahne(c, g2, R, ['P', 'R', 'T'], ['8', '12', '16'], { size: 22 });
    const r1 = satir(c, g2, 190, [['8/6 = 4/3', EL[2]]]), r2 = satir(c, g2, 244, [['12/9 = 4/3', EL[0]]]), r3 = satir(c, g2, 298, [['16/12 = ?', EL[1]]]);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'KLM’de kenarlar 6, 9, 12; PRT’de 8, 12, 16. İlk iki oran 4/3. Üçüncü oran 16/12 kaçtır ve üçgenler benzer midir?',
      options: ['4; benzerdir', '4/3; benzer değildir', '4/3; benzerdir'], answer: 2,
      hints: ['16 bölü 12: ikisini de 4’e böl.', 'Üç oran da 4/3 olursa kenarlar orantılıdır.', ''],
      right: 'Evet. Üç oran da 4/3: kenarlar orantılı.',
    });
    parcaKoy(c, r3, [['16/12 = ', EL[1]], ['4/3', RENK.iyi]]);
    await c.say('Üç oran da 4/3: kenarlar orantılı, üçgenler benzerdir.', { speak: 'Üç oran da dört bölü üç: kenarlar orantılı, üçgenler benzerdir.' });
    c.clearSay();
    await sil(c, g2, 350);

    // Sıra sende: 3, 4, 6 ve 6, 8, 11.
    const g3 = c.S('g', {}, svg);
    const X = taban([100, 478], 4, 3, 6, 30), Y = taban([310, 478], 8, 6, 11, 30);
    ucgenSahne(c, g3, X, null, ['3', '4', '6'], { size: 22 }); ucgenSahne(c, g3, Y, null, ['6', '8', '11'], { size: 22 });
    satir(c, g3, 190, [['6/3 = 2', EL[2]]]); satir(c, g3, 244, [['8/4 = 2', EL[0]]]);
    const q3 = satir(c, g3, 298, [['11/6 = ?', EL[1]]]);
    gizle(g3); await belir(c, g3, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Kenarları 3, 4, 6 olan üçgen ile kenarları 6, 8, 11 olan üçgen benzer midir?',
      options: ['Benzerdir; oran 2', 'Eştirler; kenarlar birbirine yakın', 'Benzer değildir; oranlar 2, 2 ve 11/6'], answer: 2,
      hints: ['Üç oranı da yaz: 6/3, 8/4, 11/6.', 'Kenarlar eşit değil; oranlara bak: 6/3, 8/4, 11/6.', ''],
      right: 'Evet. Üçüncü oran 2 değil, 11/6.',
    });
    parcaKoy(c, q3, [['11/6 ≠ 2', RENK.iyi]]);
    await c.say('Üçüncü oran 11/6, 2 değil; üçgenler benzer değil.', { speak: 'Üçüncü oran on bir bölü altı, iki değil; üçgenler benzer değil.' });
  }

  /* ---- 3. İki kenar ve aradaki açı ---- */
  async function kenarAciKenar(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { b: 60, sutun: 10, satir: 8 });
    const g = c.S('g', {}, svg), gr = c.S('g', {}, svg);
    const D = z.P(1, 7), C = z.P(8.2, 7), A = z.P(5.5, 3.03), Bp = z.P(8.7, 3.03);
    const k = kasaba(c, g, A, Bp, C, D, ['32', '40', '72', '48']);
    const noktalar = [A, Bp, C, D].map((q) => nokta(c, g, q, RENK.yazi, 7));
    const ust = (P, Q, renk) => cizgi(c, g, P, Q, renk, 9, { 'stroke-opacity': 0.9 });
    const oAB = ust(A, Bp, EL[2]), oAC1 = ust(A, C, EL[1]), oAC2 = ust(A, C, EL[2]), oCD = ust(D, C, EL[1]), oBC = ust(Bp, C, EL[0]), oAD = ust(A, D, EL[0]);
    const yayA = aciYayi(c, g, A, Bp, C, EL[0], 34), yayC = aciYayi(c, g, C, A, D, EL[0], 34);
    const r1 = satir(c, gr, 170, [['32', EL[2]], ['/', RENK.yazi], ['48', EL[1]], [' = 2/3', RENK.yazi]]);
    const r2 = satir(c, gr, 224, [['48', EL[2]], ['/', RENK.yazi], ['72', EL[1]], [' = 2/3', RENK.yazi]]);
    const es = B.eslemeYazisi(c, gr, TX, 310, 'ABC', 'CAD', '~', { ucgenSimge: false, size: 38, hiza: 'start' });
    const ad1 = yazi(c, gr, TX, 368, 'Kenar-Açı-Kenar', { hiza: 'start', size: 26, kalin: 700 }), ad2 = yazi(c, gr, TX, 404, 'K.A.K.', { hiza: 'start', size: 26, kalin: 700 });
    const r3 = satir(c, gr, 190, [['|BC|/|AD| = 2/3', EL[0]]]);
    gizle(k.f1.g, k.f2.g, k.kenarlar, k.kAD, k.paralel, k.etiketler, k.lAD, k.harf, noktalar, oAB, oAC1, oAC2, oCD, oBC, oAD, yayA, yayC, r1, r2, es, ad1, ad2, r3);
    k.f1.g.style.opacity = 0; k.f2.g.style.opacity = 0;

    await par(c.say('Dört kasaba var: A, B, C ve D; kuş uçuşu uzaklıklar verilmiş.'), belir(c, duz(noktalar, k.harf), 450));
    await par(c.say('AB 32, BC 40, CD 72, AC 48 km; AB // DC.', { speak: 'A B otuz iki, B C kırk, C D yetmiş iki, A C kırk sekiz kilometre; A B, D C’ye paraleldir.' }),
      belir(c, duz(k.f1.g, k.f2.g, k.kenarlar, k.paralel, k.etiketler), 550));
    await par(c.say('A ile D arasındaki uzaklığı bulacağız.'), belir(c, [k.kAD, k.lAD], 450));
    await par(c.say('İç ters açılar eşit: BAC ile ACD.', { speak: 'İç ters açılar eşit: B A C ile A C D.' }), belir(c, [yayA, yayC], 450));
    await par(c.say('Açıyı oluşturan kenarları oranlayalım: 32/48 = 2/3.', { speak: 'Açıyı oluşturan kenarları oranlayalım: otuz iki bölü kırk sekiz, iki bölü üç.' }), belir(c, [oAB, oAC1, r1], 500));
    await belir(c, [oAB, oAC1], 250, 0);
    await par(c.say('Öbür üçgende |AC|/|CD| = 48/72 = 2/3.', { speak: 'Öbür üçgende A C bölü C D, kırk sekiz bölü yetmiş iki, iki bölü üç.' }), belir(c, [oAC2, oCD, r2], 500));
    await belir(c, [oAC2, oCD], 250, 0);
    await par(c.say('İki oran eşit ve aradaki açılar eşit: ABC ~ CAD.', { speak: 'İki oran eşit ve aradaki açılar eşit: A B C benzerdir C A D.' }), belir(c, es, 450));
    await par(c.say('Bu koşulun adı Kenar-Açı-Kenar benzerliğidir.'), belir(c, [ad1, ad2], 450));
    c.clearSay();
    await belir(c, [r1, r2, ad1, ad2], 300, 0);
    await par(c.say('Karşılıklı kenarlar: BC ile AD; oran |BC|/|AD| = 2/3.', { speak: 'Karşılıklı kenarlar: B C ile A D; oran B C bölü A D, iki bölü üç.' }), belir(c, [oBC, oAD, r3], 500));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ~ CAD ve |BC| / |AD| = 2/3 iken |BC| = 40 km. 40 / |AD| = 2/3 ise |AD| kaçtır?',
      options: ['26,7 km', '60 km', '80 km'], answer: 1,
      hints: ['40 ile |AD| arasındaki oran 2/3; |AD| daha büyük.', '', '40’ı 3 ile çarpıp 2’ye böl.'],
      right: 'Evet. 40 × 3 ÷ 2 = 60 km.',
    });
    parcaKoy(c, r3, [['40/|AD| = 2/3', EL[0]]]);
    cevapla(k.lAD, '60');
    await c.say('40/|AD| = 2/3 ise |AD| = 60 km.', { speak: 'Kırk bölü A D, iki bölü üç ise A D uzunluğu altmış kilometre.' });
    c.clearSay();
    await sil(c, [g, gr, z.g], 350);

    // Sıra sende: yeni durum, ölçekli çizim.
    const g2 = c.S('g', {}, svg);
    const A2 = [392, 250], B2 = [522, 250], C2 = [589.6, 419], D2 = [69.6, 419];
    const k2 = kasaba(c, g2, A2, B2, C2, D2, ['5', '7', '20', '10']);
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'AB // DC; |AB| = 5, |AC| = 10, |CD| = 20 ve |BC| = 7 cm. |AD| kaç cm’dir?',
      options: ['3,5 cm', '28 cm', '14 cm'], answer: 2,
      hints: ['5/10 = 10/20 = 1/2; ABC ~ CAD; BC ile AD karşılıklı.', '7 bölü |AD| = 1/2.', ''],
      right: 'Evet. 7 · 2 = 14 cm.',
    });
    cevapla(k2.lAD, '14'); k2.kAD.removeAttribute('stroke-dasharray');
    await c.say('7/|AD| = 1/2 ise |AD| = 14 cm.', { speak: 'Yedi bölü A D, bir bölü iki ise A D uzunluğu on dört santimetre.' });
    c.note('<b>K.A.K. benzerliği:</b> iki kenar orantılı, aradaki açı eşit.', 'Kenar-Açı-Kenar', 'b5-kak');
  }

  /* ---- 4. Aradaki açı neden gerekli? ---- */
  async function aradakiAci(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { b: 56, sutun: 11, satir: 8 });
    const u = 28, A = [114, 454], Dm = [450, 454], E = [Dm[0] + 6 * u, Dm[1]];
    const g1 = c.S('g', {}, svg), g2 = c.S('g', {}, svg), gr = c.S('g', {}, svg);
    const m1 = B.mentese(c, g1, A, 3 * u, 4 * u, { yon: 0, aci: 90, etiket: false, renk1: EL[2], renk2: EL[1], renk3: EL[0] });
    gizle(m1.yay);
    const [, Ab, Ac] = m1.uc();
    const dik1 = B.esitYay(c, g1, A, Ab, Ac, 1, EL[0], { dik: true, r: 22 });
    const hy = (p, x, y, m, r) => yazi(c, p, x, y, m, { size: 26, kalin: 700, renk: r });
    hy(g1, A[0] - 20, A[1] + 28, 'A', EL[0]); hy(g1, Ab[0] + 20, Ab[1] + 28, 'B', EL[1]); hy(g1, Ac[0], Ac[1] - 16, 'C', EL[2]);
    B.kenarEtiketi(c, g1, A, Ab, '3', EL[2], { merkez: Ac }); B.kenarEtiketi(c, g1, A, Ac, '4', EL[1], { merkez: Ab }); B.kenarEtiketi(c, g1, Ab, Ac, '5', EL[0], { merkez: A });

    const m2 = B.mentese(c, g2, Dm, 6 * u, 8 * u, { yon: 0, aci: 90, etiket: true, renk1: EL[2], renk2: EL[1], renk3: EL[0] });
    m2.yay.setAttribute('stroke', EL[0]); m2.etiket.style.fill = EL[0];
    const hD = hy(g2, Dm[0] - 20, Dm[1] + 28, 'D', EL[0]), hE = hy(g2, E[0] + 20, E[1] + 28, 'E', EL[1]), hF = hy(g2, 0, 0, 'F', EL[2]);
    const l6 = B.kenarEtiketi(c, g2, Dm, E, '6', EL[2], { merkez: [Dm[0] + 72, Dm[1] - 100] });
    const l8 = yazi(c, g2, 0, 0, '8', { size: 24, kalin: 700, renk: EL[1] }), lEF = yazi(c, g2, 0, 0, '', { size: 24, kalin: 700, renk: EL[0] });
    const ayarla = (d) => {
      m2.ac(d);
      const [V, , F] = m2.uc(), a = yon(V, F);
      hF.setAttribute('x', F[0] + Math.cos(a) * 24); hF.setAttribute('y', F[1] + Math.sin(a) * 24 + 8);
      etiketYerle(l8, V, F, E); etiketYerle(lEF, E, F, V);
    };
    ayarla(90);
    const r1 = satir(c, gr, 170, [['|DE|/|AB| = 2', EL[2]]]), r2 = satir(c, gr, 224, [['|DF|/|AC| = 2', EL[1]]]), r3 = satir(c, gr, 278, [['|EF|/|BC| = ?', EL[0]]]);
    const benzer = satir(c, gr, 346, [['benzer', RENK.iyi]], 30);
    const TABLO = { 30: ['4,1', '0,82'], 45: ['5,7', '1,13'], 60: ['7,2', '1,44'], 75: ['8,7', '1,73'], 90: ['10', '2'], 105: ['11,2', '2,23'], 120: ['12,2', '2,43'], 135: ['13,0', '2,59'], 150: ['13,5', '2,71'] };
    const guncelle = (v) => {
      ayarla(v);
      const t = TABLO[v] || ['', ''];
      lEF.textContent = t[0]; etiketYerle(lEF, E, m2.uc()[2], Dm);
      parcaKoy(c, r3, [['|EF|/|BC| = ' + t[1], EL[0]]]);
      benzer.style.opacity = v === 90 ? 1 : 0;
    };
    gizle(g1, g2, lEF, r1, r2, r3, benzer);
    g1.style.opacity = 0; g2.style.opacity = 0;

    await par(c.say('ABC’de iki çubuk 3 ve 4; aradaki açı 90°; üçüncü kenar 5.', { speak: 'A B C’de iki çubuk üç ve dört; aradaki açı doksan derece; üçüncü kenar beş.' }), belir(c, g1, 500));
    await par(c.say('DEF’de çubuklar 6 ve 8: ikisi de iki kat.', { speak: 'D E F’de çubuklar altı ve sekiz: ikisi de iki kat.' }), belir(c, g2, 500));
    await par(c.say('İki kenar çifti orantılı: oran 2.', { speak: 'İki kenar çifti orantılı: oran iki.' }), (async () => {
      await belir(c, r1, 400); await c.wait(300); await belir(c, r2, 400);
    })());
    // Menteşeyi açıp kapatma.
    await par(c.say('Menteşeyi açıp kapatalım; üçüncü kenara bakalım.'), (async () => {
      await c.tween(900, (x) => ayarla(90 - 30 * x), Ders.ease.inOut);
      guncelle(60); await belir(c, [lEF, r3], 400);
    })());
    c.clearSay();
    await c.say('Menteşeyi aç ve kapat; üçüncü kenarın oranına bak.', { noWait: true });
    const sl = c.slider({ label: 'D menteşesinin açısı', min: 30, max: 150, step: 15, value: 60, fmt: () => '', onInput: guncelle });
    await c.cont('Devam ›');
    const v0 = sl.get(); sl.remove(); c.clearSay();
    guncelle(v0);

    await par(c.say('Yalnızca açı 90° iken üçüncü oran da 2 oluyor.', { speak: 'Yalnızca açı doksan derece iken üçüncü oran da iki oluyor.' }), (async () => {
      if (v0 !== 90) { await c.tween(800, (x) => ayarla(v0 + (90 - v0) * x), Ders.ease.inOut); }
      guncelle(90);
    })());
    await par(c.say('Açı farklıysa iki kenar orantılı olsa da üçgenler benzer değil.'), (async () => {
      await c.tween(800, (x) => ayarla(90 - 30 * x), Ders.ease.inOut);
      guncelle(60);
    })());
    await par(c.say('Orantılı iki kenarın arasındaki açı eşit olmalı.', { speak: '[thoughtful] Orantılı iki kenarın arasındaki açı eşit olmalı.' }), (async () => {
      await c.tween(900, (e) => { const w = 3 + 4 * Math.sin(Math.PI * e); m2.yay.setAttribute('stroke-width', w); dik1.setAttribute('stroke-width', w); });
      m2.yay.setAttribute('stroke-width', 3); dik1.setAttribute('stroke-width', 2.5);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'ABC’de |AB| = 3 ve |AC| = 4; DEF’de |DE| = 6 ve |DF| = 8. İki kenar çifti orantılı (oran 2). Üçgenlerin benzer olduğunu söylemek için başka ne gerekir?',
      options: ['Hiçbir şey; iki kenar yeter', 'Üçüncü kenarların eşit olması', 'Bu iki kenarın arasındaki açıların eşit olması'], answer: 2,
      hints: ['Menteşe 90° iken benzerdi, başka açıda değil.', 'Açı, orantılı iki kenarın arasında olmalı.', ''],
      right: 'Evet. Aradaki açılar eşit olmalı.',
    });
    await c.tween(800, (x) => ayarla(60 + 30 * x), Ders.ease.inOut);
    guncelle(90);
    await c.say('Aradaki açılar eşit olunca üçgenler benzerdir.');
    c.note('<b>İki kenar orantılı yetmez;</b> aradaki açı da eşit olmalı.', 'Aradaki açı', 'b5-aradaki-aci');
  }

  /* ---- 5. Oran 1 olunca ---- */
  async function oran1(c) {
    const svg = c.svg(1000, 562);
    const bas = tabloSatir(c, svg, 150, ['Veri', 'Benzerlik', 'Oran 1 olunca'], [RENK.soluk, RENK.soluk, RENK.soluk]);
    const cizik = cizgi(c, svg, [40, 176], [960, 176], RENK.kenarlik, 2);
    const S = [
      tabloSatir(c, svg, 250, ['Üç kenar orantılı', 'Kenar-Kenar-Kenar', 'Üç kenar eşit'], [RENK.yazi, EL[0], RENK.yazi]),
      tabloSatir(c, svg, 340, ['İki kenar orantılı, açı eşit', 'Kenar-Açı-Kenar', 'İki kenar, açı eşit'], [RENK.yazi, EL[1], RENK.yazi]),
      tabloSatir(c, svg, 430, ['İki açı eşit', 'Açı-Açı', 'Bir kenar eşit'], [RENK.yazi, EL[2], RENK.yazi]),
    ];
    gizle(bas, cizik, S);

    await par(c.say('Benzerlik oranı 1 olursa üçgenler eş olur.', { speak: 'Benzerlik oranı bir olursa üçgenler eş olur.' }), belir(c, [bas, cizik], 450));
    await par(c.say('Üç kenar orantılı, oran 1: üç kenar eşit; Kenar-Kenar-Kenar eşliği.', { speak: 'Üç kenar orantılı, oran bir: üç kenar eşit; Kenar-Kenar-Kenar eşliği.' }), belir(c, S[0], 450));
    await par(c.say('İki kenar orantılı, oran 1: iki kenar eşit; Kenar-Açı-Kenar eşliği.', { speak: 'İki kenar orantılı, oran bir: iki kenar eşit; Kenar-Açı-Kenar eşliği.' }), belir(c, S[1], 450));
    await par(c.say('İki açı ve bir kenar eşit: oran 1; Açı-Kenar-Açı eşliği.', { speak: 'İki açı ve bir kenar eşit: oran bir; Açı-Kenar-Açı eşliği.' }), belir(c, S[2], 450));
    await par(c.say('Üç benzerlik koşulu, oran 1 iken üç eşlik koşuluna dönüşür.', { speak: 'Üç benzerlik koşulu, oran bir iken üç eşlik koşuluna dönüşür.' }), nabiz(c, S, 800, 24));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Karşılıklı iki açısı eşit olan iki üçgenin karşılıklı bir kenarı da eşit. Bu üçgenler için hangisi doğrudur?',
      options: ['Yalnızca benzerdirler', 'Eştirler (Açı-Kenar-Açı)', 'Benzer değildirler'], answer: 1,
      hints: ['Bir kenar çifti eşitse k = 1.', '', 'İki açı eşit: benzerlik oranı bir kenar çiftinden bulunur.'],
      right: 'Evet. Bir kenar çifti eşit olunca k = 1; üçgenler eştir.',
    });
    S[2].children[2].style.fill = RENK.iyi;
    await c.say('İki açı ve bir kenar eşitse üçgenler eştir.');
    c.note('<b>Benzerlik:</b> K.K.K., K.A.K., A.A.; oran 1 ise eşlik.', 'Altı koşul', 'b5-alti-kosul');
  }

  /* ---- 6. Yalnızca yatayda büyütülen resim ---- */
  /* Çerçeveli resim: içinde dik üçgen. w, h piksel; ciz(w, h) yeniden çizer; yazılar ve açı yayı birlikte gelir. */
  function resim(c, g, x0, yb, renk, w, h, m) {
    const k = c.S('g', {}, g);
    const cerceve = c.S('rect', { fill: 'none', stroke: RENK.kenarlik, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, k);
    const uc = c.S('polygon', { fill: renk, 'fill-opacity': 0.2, stroke: renk, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, k);
    const dik = c.S('path', { fill: 'none', stroke: renk, 'stroke-width': 2.5 }, k);
    const yay = c.S('path', { fill: 'none', stroke: RENK.merkez, 'stroke-width': 3, 'stroke-linecap': 'round' }, k);
    const ta = yazi(c, k, 0, 0, m.ta, { size: 24, kalin: 700, renk }), dk = yazi(c, k, 0, 0, m.dk, { size: 24, kalin: 700, renk });
    const hp = yazi(c, k, 0, 0, m.hp, { size: 24, kalin: 700, renk }), ac = yazi(c, k, 0, 0, m.aci, { size: 22, kalin: 700, renk: RENK.merkez });
    const ciz = (W, H) => {
      const O = [x0, yb], Hh = [x0 + W, yb], V = [x0, yb - H];
      cerceve.setAttribute('x', x0); cerceve.setAttribute('y', yb - H); cerceve.setAttribute('width', W); cerceve.setAttribute('height', H);
      uc.setAttribute('points', [O, Hh, V].map((q) => q.join(',')).join(' '));
      dik.setAttribute('d', `M${x0 + 16},${yb} L${x0 + 16},${yb - 16} L${x0},${yb - 16}`);
      const r = 46, th = Math.atan2(H, W);
      yay.setAttribute('d', `M${Hh[0] - r},${yb} A${r},${r} 0 0 1 ${Hh[0] - r * Math.cos(th)},${yb - r * Math.sin(th)}`);
      ta.setAttribute('x', x0 + W / 2); ta.setAttribute('y', yb + 34);
      dk.setAttribute('x', x0 - 24); dk.setAttribute('y', yb - H / 2 + 8);
      etiketYerle(hp, Hh, V, O);
      ac.setAttribute('x', Hh[0] + 38); ac.setAttribute('y', yb - 10);
    };
    ciz(w, h);
    return { g: k, ciz, cerceve, uc, dik, yay, ta, dk, hp, ac };
  }

  async function resimSahne(c) {
    const svg = c.svg(1000, 562), u = 44, yb = 430;
    const g = c.S('g', {}, svg);
    const p1 = resim(c, g, 60, yb, RENK.sekil, 4 * u, 3 * u, { ta: '4', dk: '3', hp: '5', aci: '37°' });
    const p2 = resim(c, g, 380, yb, RENK.goruntu, 4 * u, 3 * u, { ta: '8', dk: '3', hp: '8,5', aci: '21°' });
    const o1 = satir(c, g, 150, [['8/4 = 2', RENK.yazi]]), o2 = satir(c, g, 200, [['3/3 = 1', RENK.yazi]]), o3 = satir(c, g, 250, [['8,5/5 ≈ 1,7', RENK.yazi]]);
    gizle(p1.g, p2.g, p1.ta, p1.dk, p1.hp, p1.ac, p1.yay, p2.ta, p2.dk, p2.hp, p2.ac, p2.yay, o1, o2, o3);

    await par(c.say('Bir resmi yalnızca yatayda iki katına çıkaralım.', { speak: '[curious] Bir resmi yalnızca yatayda iki katına çıkaralım.' }), (async () => {
      await belir(c, p1.g, 450);
      await belir(c, p2.g, 350);
      await c.tween(1300, (x) => p2.ciz(4 * u + 4 * u * x, 3 * u), Ders.ease.inOut);
    })());
    await par(c.say('Resimdeki üçgenin yatay kenarı 4’ten 8’e çıktı.', { speak: 'Resimdeki üçgenin yatay kenarı dörtten sekize çıktı.' }), belir(c, [p1.ta, p2.ta], 450));
    await par(c.say('Dikey kenarı 3 olarak kaldı.', { speak: 'Dikey kenarı üç olarak kaldı.' }), belir(c, [p1.dk, p2.dk], 450));
    await par(c.say('Oranlar farklı: yatayda 2, dikeyde 1.', { speak: 'Oranlar farklı: yatayda iki, dikeyde bir.' }), (async () => {
      await belir(c, o1, 400); await c.wait(300); await belir(c, o2, 400);
    })());
    await par(c.say('Eğik kenar yaklaşık 5’ten 8,5’e çıktı: oran yaklaşık 1,7.', { speak: 'Eğik kenar yaklaşık beşten sekiz buçuğa çıktı: oran yaklaşık bir virgül yedi.' }), (async () => {
      await belir(c, [p1.hp, p2.hp], 450); await belir(c, o3, 400);
    })());
    await par(c.say('Üç kenar aynı oranda büyümedi; biçim bozuldu.'), nabiz(c, [o1, o2, o3], 900));
    await par(c.say('Küçük açı 37° iken yaklaşık 21° oldu.', { speak: 'Küçük açı otuz yedi derece iken yaklaşık yirmi bir derece oldu.' }), belir(c, [p1.yay, p1.ac, p2.yay, p2.ac], 500));
    // Gör: dikey de iki katına çıkarsa biçim kalır.
    await belir(c, [o1, o2, o3, p2.dk, p2.hp, p2.ac], 300, 0);
    await par(c.say('Biçim, kenarlar aynı oranda büyürse kalır.'), (async () => {
      await c.tween(1500, (x) => p2.ciz(8 * u, 3 * u + 3 * u * x), Ders.ease.inOut);
      p2.dk.textContent = '6'; p2.hp.textContent = '10'; p2.ac.textContent = '37°'; p2.ciz(8 * u, 6 * u);
      await belir(c, [p2.dk, p2.hp, p2.ac], 450);
    })());
  }

  /* ---- 7. Hangi koşul, hangi sonuç? ---- */
  async function siniflandir(c) {
    const svg = c.svg(1000, 562);
    const BX = [30, 355, 680], BY = 250;
    const basliklar = ['Kesin eş', 'Kesin benzer', 'Söylenemez'];
    const tum = c.S('g', {}, svg);
    const kutular = BX.map((x, i) => {
      const k = c.S('g', {}, tum);
      c.S('rect', { x, y: BY, width: 290, height: 290, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, k);
      yazi(c, k, x + 145, BY + 38, basliklar[i], { size: 26, kalin: 700 });
      return k;
    });
    gizle(kutular); await belir(c, kutular, 400);
    const SECENEK = ['Kesin eş', 'Kesin benzer (eş olması şart değil)', 'Yalnızca bu bilgiyle söylenemez'];
    const kartlar = [
      { s: ['Karşılıklı üç kenarı eşit'], chip: 'K.K.K. eşit', d: 0, ip: ['', 'Üç kenar eşitse oran 1’dir; üçgenler eştir.', 'Üç kenar eşitse Kenar-Kenar-Kenar eşliği tamamdır.'], ok: 'Evet. Üç kenar eşit: kesin eş.' },
      { s: ['Karşılıklı üç kenarı orantılı (oran 2)'], chip: 'K.K.K. orantılı', d: 1, ip: ['Oran 2 iken kenarlar eşit değil; üçgenler benzerdir, eş değil.', '', 'Üç kenar orantılıysa Kenar-Kenar-Kenar benzerliği tamamdır.'], ok: 'Evet. Üç kenar orantılı: kesin benzer.' },
      { s: ['Karşılıklı iki kenarı orantılı (oran 3)', 've aradaki açıları eşit'], chip: 'K.A.K. orantılı', d: 1, ip: ['Oran 3 iken kenarlar eşit değil; üçgenler benzerdir, eş değil.', '', 'İki kenar orantılı, aradaki açı eşit: Kenar-Açı-Kenar benzerliği tamamdır.'], ok: 'Evet. Kenar-Açı-Kenar: kesin benzer.' },
      { s: ['Karşılıklı iki kenarı ve', 'aradaki açıları eşit'], chip: 'K.A.K. eşit', d: 0, ip: ['', 'Kenarlar eşitse oran 1’dir; üçgenler eştir.', 'İki kenar ve aradaki açı eşit: Kenar-Açı-Kenar eşliği tamamdır.'], ok: 'Evet. Kenar-Açı-Kenar eşliği: kesin eş.' },
      { s: ['Karşılıklı iki açısı eşit'], chip: 'A.A.', d: 1, ip: ['Yalnızca iki açı eşitse kenarlar için bir şey bilinmez; eş olmayabilirler.', '', 'İki açı eşit: Açı-Açı benzerliği tamamdır.'], ok: 'Evet. İki açı eşitse benzerdirler; kenarlar da eşitse eş olurlar.' },
      { s: ['Karşılıklı iki açısı ve', 'bir kenarı eşit'], chip: 'A.K.A. eşit', d: 0, ip: ['', 'Bir kenar da eşit olunca oran 1 olur; üçgenler eştir.', 'İki açı ve bir kenar eşit: Açı-Kenar-Açı eşliği tamamdır.'], ok: 'Evet. Açı-Kenar-Açı eşliği: kesin eş.' },
      { s: ['Yalnızca bir açısı eşit', 'olan iki üçgen'], chip: 'Bir açı', d: 2, ip: ['Bir açı eşitliği eşlik için yetmez.', 'Bir açı eşitliği benzerlik için yetmez.', ''], ok: 'Evet. Bir açı eşitliği benzerlik için yetmez.' },
      { s: ['Yalnızca bir kenarı eşit', 'olan iki üçgen'], chip: 'Bir kenar', d: 2, ip: ['Bir kenar eşitliği hiçbir koşulu tamamlamaz.', 'Bir kenar eşitliği hiçbir koşulu tamamlamaz.', ''], ok: 'Evet. Bir kenar eşitliği hiçbir koşulu tamamlamaz.' },
    ];
    await c.say('Her kartın girdiği kutuyu seç.', { noWait: true });
    const dolu = [0, 0, 0];
    for (const k of kartlar) {
      const kg = c.S('g', {}, svg);
      c.S('rect', { x: 130, y: 55, width: 740, height: 130, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, kg);
      const y0 = k.s.length === 1 ? 128 : 112;
      k.s.forEach((t, i) => yazi(c, kg, 500, y0 + i * 40, t, { size: 30, kalin: 600 }));
      gizle(kg); await belir(c, kg, 350);
      await c.choice({ tag: 'Sıra sende', q: 'Kart hangi kutuya girer?', options: SECENEK, answer: k.d, hints: k.ip, right: k.ok });
      const chip = c.S('g', {}, tum);
      c.S('rect', { x: -120, y: -23, width: 240, height: 46, rx: 8, fill: RENK.yuzey, stroke: EL[k.d], 'stroke-width': 2.5 }, chip);
      yazi(c, chip, 0, 8, k.chip, { size: 22, kalin: 700 });
      // Kart kutudaki yerinde belirir: kayarak gelirse önceki kartın üstünden geçer.
      const hx = BX[k.d] + 145, hy = BY + 94 + dolu[k.d] * 70; dolu[k.d]++;
      chip.setAttribute('transform', `translate(${hx},${hy})`); gizle(chip);
      await belir(c, kg, 250, 0);
      kg.remove();
      await belir(c, chip, 450);
    }
    c.clearSay();
    await c.tween(700, (x) => tum.setAttribute('transform', `translate(0,${-112 * x})`), Ders.ease.inOut);
    await c.say('Koşul tamamsa eş ya da benzer; eksikse söylenemez.');
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b5', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Kenarlarla benzerlik', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Kenarlarla benzerlik',
      hook: 'Bir resmi yalnızca <b>yatayda</b> iki katına çıkarırsan şekil aynı kalır mı?',
      button: 'Derse başla ›',
    },
    goals: ['Karşılıklı üç kenarı orantılı üçgenlerin benzer olduğunu (Kenar-Kenar-Kenar) kullanır.', 'İki kenarı orantılı ve aradaki açısı eşit üçgenlerin benzer olduğunu (Kenar-Açı-Kenar) kullanır; aradaki açının neden gerektiğini açıklar.', 'Benzerlik oranı 1 olduğunda benzerlik koşullarının eşlik koşullarına dönüştüğünü söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'İki açı eşitse üçgenler benzerdir; oran 1 ise eştir.', run: hatirla },
      { title: 'Üç kenar orantılı', goal: 'Karşılıklı üç kenarı orantılı üçgenler benzerdir.', run: ucKenar },
      { title: 'İki kenar ve aradaki açı', goal: 'İki kenarı orantılı, aradaki açısı eşit üçgenler benzerdir.', run: kenarAciKenar },
      { title: 'Aradaki açı neden gerekli?', goal: 'İki kenarın orantılı olması tek başına yetmez.', run: aradakiAci },
      { title: 'Oran 1 olunca', goal: 'Oran 1 iken benzerlik koşulları eşlik koşuluna döner.', run: oran1 },
      { title: 'Yalnızca yatayda büyütülen resim', goal: 'Kenarlar aynı oranda büyümezse biçim bozulur.', run: resimSahne },
      { title: 'Hangi koşul, hangi sonuç?', goal: 'Verilen bilginin eş, benzer ya da belirsiz sonuç verdiğini ayır.', run: siniflandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'ABC ve DEF’de |AB| / |DE| = |AC| / |DF| = 2 olduğu biliniyor. Bu bilgiyle üçgenler için hangisi doğrudur?',
        options: ['Benzerdirler; iki kenar orantılı', 'Benzer olduklarını söyleyemeyiz; aradaki açının eşit olduğu bilinmiyor', 'Eştirler'], answer: 1,
        why: ['İki kenarın orantılı olması yetmez; bu kenarların arasındaki açının da eşit olması gerekir.', 'Kenar-Açı-Kenar için orantılı kenarların arasındaki açı da eşit olmalı; burada bu bilinmiyor.', 'Oran 2, 1 değil; kenarlar eşit olmadığı için üçgenler eş değildir.'],
        scene: 3,
      },
      {
        q: 'Kenarları 9, 12, 15 cm olan üçgen ile kenarları 6, 8, 10 cm olan üçgen için hangisi doğrudur?',
        options: ['Benzer değildirler; farklar eşit değil', 'Eştirler', 'Benzerdirler; oran 3/2'], answer: 2,
        why: ['Benzerlik için farklar değil oranlar eşit olmalı; 9/6, 12/8 ve 15/10 hepsi 3/2.', 'Oran 3/2, 1 değil; kenarlar eşit olmadığı için üçgenler eş değildir.', 'Üç oran da 3/2: Kenar-Kenar-Kenar koşuluna göre üçgenler benzerdir.'],
        scene: 1,
      },
      {
        q: 'ABC ~ DEF’de |AB| = 5, |DE| = 15 ve |AC| = 7 cm; aradaki açılar eşit. |DF| kaç cm’dir?',
        options: ['21 cm', '17 cm', '9 cm'], answer: 0,
        why: ['|DE| / |AB| = 15/5 = 3 olduğundan |DF| = 3 × 7 = 21 cm.', '17 cm, 7 ile 10’u toplayarak bulunur; benzerlikte kenarlar oranla çarpılır, toplanmaz.', '9 cm olsaydı oran 9/7 olurdu; ama |DE| / |AB| = 3.'],
        scene: 2,
      },
      {
        q: 'AB // DC; |AB| = 4, |AC| = 6, |CD| = 9 ve |BC| = 8 cm. |AD| kaç cm’dir?',
        options: ['5 cm', '18 cm', '12 cm'], answer: 2,
        why: ['5 cm çıkarma ile bulunur; benzer üçgenlerde kenarlar oranlanır, çıkarılmaz.', '18 cm, 9/4 oranından gelir; ama 4/6 = 6/9 = 2/3 olduğundan |AD| = 8 × 3 ÷ 2 olmalı.', '4/6 = 6/9 = 2/3 ve aradaki açılar eşit: ABC ~ CAD. 8 / |AD| = 2/3 ise |AD| = 12 cm.'],
        scene: 2,
      },
      {
        q: 'Karşılıklı iki kenarı orantılı ve aradaki açıları eşit olan iki üçgenin benzerlik oranı 1 ise üçgenler için hangisi doğrudur?',
        options: ['Yalnızca benzerdirler', 'Eştirler (Kenar-Açı-Kenar)', 'Benzer değildirler'], answer: 1,
        why: ['Oran 1 ise kenarlar eşit olur; üçgenler benzer olmakla kalmaz, eş de olur.', 'Oran 1 iken iki kenar ve aradaki açı eşit olur: Kenar-Açı-Kenar eşliği.', 'Orantılı iki kenar ve eşit aradaki açı benzerlik koşuludur; oran 1 de bir orandır.'],
        scene: 4,
      },
    ],
    summary: [
      'Üç kenarı orantılı üçgenler benzerdir.',
      'İki kenarı orantılı ve aradaki açısı eşit üçgenler benzerdir.',
      '<b>Kenarlar aynı oranda büyürse biçim kalır.</b>',
      'Oran 1 olunca benzerlik koşulları eşlik koşuluna döner.',
    ],
    nextLesson: { href: 'b6-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
