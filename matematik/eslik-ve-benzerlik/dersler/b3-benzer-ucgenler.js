/* B3 — Benzer üçgenler: açılar eşit, kenarlar orantılı
   Karşılıklı açıları eşit, karşısındaki kenarları orantılı üçgenler benzerdir; oran k, karşılıklı kenarların bölümüdür; k = 1 ise üçgenler eştir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B3)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, araHepsi, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciIci, agirlik } = window.KIT;
  const B = window.KIT_B;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift

  const TX = 706;                                   // sağdaki sütunun sol kenarı
  const vir = (x) => String(Math.round(x * 100) / 100).replace('.', ',');
  const satir = (c, p, i, parcalar, y0 = 150, size = 25) => renkli(c, p, TX, y0 + i * 52, parcalar, { hiza: 'start', size });
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); (Array.isArray(el) ? el : [el]).forEach((e) => e.remove()); };
  /* Kenar çiftini kalınlaştırıp eski kalınlığına döndürür. */
  const vurgula = (c, hatlar, ms = 700, w0 = 6) => c.tween(ms, (e) => hatlar.forEach((h) => h.setAttribute('stroke-width', w0 + 5 * Math.sin(Math.PI * e))));

  /* Tek üçgen (ders dosyasına özgü): nötr dolgu, köşe harfleri, her köşede i + 1 yay, karşısındaki kenar aynı renkte, isteğe bağlı çentik ve uzunluk yazısı.
     o: { dik (dik açılı köşenin sırası), yay (false: yay yok), tik (false: çentik yok), uz: [i. köşenin karşısındaki kenarın yazısı], uzak, yayR, w }.
     → { g, t, adlar, yay, kenar, cizgiler, etk (uzunluk yazıları, yazısı olmayan null), et (yazısı olanlar) } */
  function tek(c, p, P, harf, o = {}) {
    const g = c.S('g', {}, p), M = agirlik(P);
    const t = B.notrUcgen(c, g, P, harf);
    const yay = [], kenar = [], cizgiler = [], etk = [];
    for (let i = 0; i < 3; i++) {
      const j = (i + 1) % 3, k = (i + 2) % 3;
      if (o.yay !== false) yay.push(B.esitYay(c, g, P[i], P[j], P[k], i + 1, EL[i], { dik: i === o.dik, r: o.yayR || 26 }));
      const kg = c.S('g', {}, g);
      cizgiler.push(cizgi(c, kg, P[j], P[k], EL[i], o.w || 6));
      if (o.tik !== false) B.esitCentik(c, kg, P[j], P[k], i + 1, EL[i]);
      kenar.push(kg);
    }
    for (let i = 0; i < 3; i++) {
      const j = (i + 1) % 3, k = (i + 2) % 3;
      etk.push(o.uz && o.uz[i] ? B.kenarEtiketi(c, g, P[j], P[k], o.uz[i], EL[i], { merkez: M, uzak: o.uzak }) : null);
    }
    return { g, t, adlar: t.adlar, yay, kenar, cizgiler, etk, et: etk.filter(Boolean) };
  }
  /* Açı değeri yazısı: V köşesinin açıortayında, d uzaklıkta. */
  function aciYaz(c, p, V, P, Q, d, metin, renk, size = 22) {
    const m = aciIci(V, P, Q, d);
    return yazi(c, p, m[0], m[1] + size * 0.33, metin, { size, kalin: 700, renk });
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // 1. soru: üç kenarı eşit iki üçgen.
    const g1 = c.S('g', {}, svg), P = [[190, 150], [190, 390], [370, 390]], Q = P.map((q) => [q[0] + 450, q[1]]);
    const a1 = tek(c, g1, P, ['A', 'B', 'C'], { dik: 1 }), a2 = tek(c, g1, Q, ['D', 'E', 'F'], { dik: 1 });
    gizle(a1.yay, a2.yay, g1);
    await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Karşılıklı üç kenarı eşit olan iki üçgen için hangisi doğrudur?',
      options: ['Eş olmayabilirler', 'Eştirler (K.K.K.)', 'Yalnızca açıları eşittir'], answer: 1,
      hints: ['Üç kenar eşitse tek üçgen çizilir; üçgenler eştir.', '', 'Üç kenar eşitse tek üçgen çizilir; üçgenler eştir.'],
      right: 'Evet. Üç kenar eşitse üçgenler eştir.',
    });
    await par(c.say('Üç kenar eşitse tek üçgen çizilir; üçgenler eştir.'), belir(c, [...a1.yay, ...a2.yay], 500));
    c.clearSay();
    await sil(c, g1, 350);

    // 2. soru: ABC ≅ DEF ve m(B) = 40°.
    const g2 = c.S('g', {}, svg), U = [[217.5, 400], [300, 130], [414.6, 400]], V = U.map((q) => [q[0] + 420, q[1]]);
    const b1 = tek(c, g2, U, ['A', 'B', 'C'], { yay: false, tik: false, w: 4 }), b2 = tek(c, g2, V, ['D', 'E', 'F'], { yay: false, tik: false, w: 4 });
    const y1 = B.esitYay(c, g2, U[1], U[2], U[0], 2, EL[1]), y2 = B.esitYay(c, g2, V[1], V[2], V[0], 2, EL[1]);
    const t = B.eslemeYazisi(c, g2, 500, 70, 'ABC', 'DEF', '≅', { ucgenSimge: false, size: 38 });
    const d40 = yazi(c, g2, U[1][0] + 62, U[1][1] + 10, '40°', { size: 24, kalin: 700, renk: EL[1] });
    const soru = yazi(c, g2, V[1][0] + 62, V[1][1] + 10, '?', { size: 26, kalin: 700, renk: EL[1] });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'ABC ≅ DEF ve m(B) = 40°. m(E) kaç derecedir?', options: ['80°', '140°', '40°'], answer: 2,
      hints: ['B ile E karşılıklı köşeler; açıları eşit.', 'B ile E karşılıklı köşeler; açıları eşit.', ''],
      right: 'Evet. B ile E karşılıklı köşeler; açıları eşit.',
    });
    cevapla(soru, '40°');
    await c.say('B ile E karşılıklı köşeler; açıları eşit.');
  }

  /* ---- 2. Aynı biçim, farklı boy ---- */
  async function aynibicim(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const P = z.N([[1, 2], [1, 10], [7, 10]]), Q = z.N([[10, 6], [10, 10], [13, 10]]);
    const T1 = tek(c, svg, P, ['A', 'B', 'C'], { dik: 1, uz: ['6', '10', '8'] });
    const T2 = tek(c, svg, Q, ['D', 'E', 'F'], { dik: 1, uz: ['3', '5', '4'] });
    const A1 = [aciYaz(c, T1.g, P[0], P[1], P[2], 74, '37°', EL[0]), aciYaz(c, T1.g, P[1], P[0], P[2], 58, '90°', EL[1]), aciYaz(c, T1.g, P[2], P[0], P[1], 82, '53°', EL[2])];
    // Küçük üçgende yazılar dar köşelere sığmaz: 90° ve 53° üçgenin dışına konur.
    const A2 = [aciYaz(c, T2.g, Q[0], Q[1], Q[2], 74, '37°', EL[0]), yazi(c, T2.g, Q[1][0] - 40, Q[1][1] - 14, '90°', { size: 22, kalin: 700, renk: EL[1] }), yazi(c, T2.g, Q[2][0] + 46, Q[2][1] - 8, '53°', { size: 22, kalin: 700, renk: EL[2] })];
    gizle(T1.g, T2.g, T1.yay, T2.yay, T1.kenar, T2.kenar, T1.et, T2.et, A1, A2);

    await par(c.say('Bir mimar çatı kirişinin kesitini iki boyda çiziyor: gerçek ve maket.', { speak: '[curious] Bir mimar çatı kirişinin kesitini iki boyda çiziyor: gerçek ve maket.' }), belir(c, [T1.g, T2.g], 450));
    await par(c.say('Maketteki üçgen DEF: kenarları 4, 3 ve 5 birim.', { speak: 'Maketteki üçgen D E F: kenarları dört, üç ve beş birim.' }), belir(c, T2.et, 450));
    await par(c.say('Gerçek kesit ABC: kenarları 8, 6 ve 10 birim.', { speak: 'Gerçek kesit A B C: kenarları sekiz, altı ve on birim.' }), belir(c, T1.et, 450));
    await par(c.say('İkisinin açıları 90°, yaklaşık 37° ve 53°; karşılıklı açılar eşit.', { speak: 'İkisinin açıları doksan derece, yaklaşık otuz yedi derece ve elli üç derece; karşılıklı açılar eşit.' }), (async () => {
      await belir(c, [...T1.et, ...T2.et], 300, 0);
      await belir(c, [...T1.yay, ...T2.yay, ...A1, ...A2], 500);
    })());
    await par(c.say('Ama karşılıklı kenarlar eşit değil: 8 ile 4, 6 ile 3.', { speak: 'Ama karşılıklı kenarlar eşit değil: sekiz ile dört, altı ile üç.' }), (async () => {
      await belir(c, [...A1, ...A2], 300, 0);
      await belir(c, [...T1.kenar, ...T2.kenar, ...T1.et, ...T2.et], 450);
      await vurgula(c, [T1.cizgiler[2], T2.cizgiler[2]]);
      await vurgula(c, [T1.cizgiler[0], T2.cizgiler[0]]);
    })());
    await c.say('Bu üçgenler eş değil; yine de aynı biçimdeler.', { speak: '[thoughtful] Bu üçgenler eş değil; yine de aynı biçimdeler.' });
    await par(c.say('ABC, DEF’in bütün kenarları aynı sayıyla çarpılmış hâli.', { speak: 'A B C, D E F’in bütün kenarları aynı sayıyla çarpılmış hâli.' }), (async () => {
      await belir(c, [...T2.yay, ...T2.kenar, ...T2.et, ...T2.adlar], 350, 0);
      T2.t.yuz.setAttribute('fill-opacity', 0); T2.t.yuz.setAttribute('stroke', RENK.yazi); T2.t.yuz.setAttribute('stroke-dasharray', '8 6');
      await c.tween(1900, (x) => T2.t.koy(araHepsi(Q, P, x)), Ders.ease.inOut);
    })());
  }

  /* ---- 3. Benzerlik ve oran ---- */
  async function benzerlik(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const ga = c.S('g', {}, svg);
    const P = z.N([[1, 2], [1, 10], [7, 10]]), Q = z.N([[10, 6], [10, 10], [13, 10]]);
    const T1 = tek(c, ga, P, ['A', 'B', 'C'], { dik: 1, uz: ['6', '10', '8'] });
    const T2 = tek(c, ga, Q, ['D', 'E', 'F'], { dik: 1, uz: ['3', '5', '4'] });
    const rows = [[['8/4', EL[2]], ' = 2'], [['6/3', EL[0]], ' = 2'], [['10/5', EL[1]], ' = 2']].map((q, i) => satir(c, ga, i, q, 150, 28));
    const yaz = B.eslemeYazisi(c, ga, TX, 400, 'ABC', 'DEF', '~', { ucgenSimge: false, size: 34, hiza: 'start' });
    const kt = yazi(c, ga, TX, 462, 'k', { hiza: 'start', size: 32, kalin: 700 });
    // Çentikler ve kenarlar köşenin iç tarafını kalabalık yapar: değer ve soru işareti köşenin dışına konur.
    const aA = yazi(c, ga, P[0][0] + 58, P[0][1] + 12, '37°', { size: 22, kalin: 700, renk: EL[0] }), dq = yazi(c, ga, Q[0][0] + 58, Q[0][1] + 12, '?', { size: 22, kalin: 700, renk: EL[0] });
    gizle(ga, rows, yaz, kt, aA, dq);
    const nabiz = (i) => vurgula(c, [T1.cizgiler[i], T2.cizgiler[i]]);

    await par(c.say('Karşılıklı açıları eşit, karşısındaki kenarları orantılı üçgenlere benzer üçgenler denir.'), belir(c, ga, 450));
    await par(c.say('Benzerlik “~” simgesiyle yazılır: ABC ~ DEF.', { speak: 'Benzerlik, dalga işaretiyle yazılır: A B C benzerdir D E F.' }), belir(c, yaz, 450));
    await c.say('Karşılıklı köşeler yine aynı sırada yazılır.');
    await par(c.say('Karşılıklı kenarların oranına benzerlik oranı denir; k ile gösterilir.', { speak: 'Karşılıklı kenarların oranına benzerlik oranı denir; ka ile gösterilir.' }), belir(c, kt, 450));
    await par(c.say('|AB| / |DE| = 8 / 4 = 2.', { speak: 'A B uzunluğu bölü D E uzunluğu eşittir sekiz bölü dört eşittir iki.' }), (async () => { await belir(c, rows[0], 400); await nabiz(2); })());
    await par(c.say('|BC| / |EF| = 6 / 3 = 2.', { speak: 'B C uzunluğu bölü E F uzunluğu eşittir altı bölü üç eşittir iki.' }), (async () => { await belir(c, rows[1], 400); await nabiz(0); })());
    await par(c.say('|AC| / |DF| = 10 / 5 = 2.', { speak: 'A C uzunluğu bölü D F uzunluğu eşittir on bölü beş eşittir iki.' }), (async () => { await belir(c, rows[2], 400); await nabiz(1); })());
    await belir(c, [...T1.et, ...T2.et], 300, 0);
    await par(c.say('Üç oran da aynı: k = 2.', { speak: 'Üç oran da aynı: ka eşittir iki.' }), (async () => {
      kt.textContent = 'k = 2';
      await c.tween(900, (e) => [0, 1, 2].forEach((i) => [T1.cizgiler[i], T2.cizgiler[i]].forEach((h) => h.setAttribute('stroke-width', 6 + 5 * Math.sin(Math.PI * e)))));
    })());
    c.clearSay();

    // Sıra sende: D açısı.
    await belir(c, rows, 300, 0);
    await belir(c, [aA, dq], 400);
    await c.choice({
      tag: 'Sıra sende', q: 'ABC ~ DEF’de k = 2 iken A açısı 37° ise D açısı kaç derecedir?', options: ['74°', '18,5°', '37°'], answer: 2,
      hints: ['Karşılıklı açılar eşit; k yalnızca kenarlara uygulanır.', 'A ile D karşılıklı köşeler.', ''],
      right: 'Evet. Karşılıklı açılar eşit; k açıyı değiştirmez.',
    });
    cevapla(dq, '37°');
    await c.say('Karşılıklı açılar eşit: D açısı da 37°.', { speak: 'Karşılıklı açılar eşit: D açısı da otuz yedi derece.' });
    c.clearSay();
    await sil(c, ga, 350);

    // Dene: k'yi değiştir. DEF sabit; ABC, B köşesinden büyür.
    const b0 = z.P(2, 10), kuc = z.N([[2, 6], [2, 10], [5, 10]]);
    const gT = c.S('g', {}, svg), gBig = c.S('g', {}, gT), gSmall = c.S('g', {}, gT);
    const small = tek(c, gSmall, kuc, ['D', 'E', 'F'], { dik: 1, tik: false, uz: ['3', '5', '4'], yayR: 24 });
    small.adlar[1].remove();                          // E harfi, B harfiyle aynı yerde: "B, E" olarak büyük üçgende yazılır
    aciYaz(c, gSmall, kuc[0], kuc[1], kuc[2], 74, '37°', EL[0]); aciYaz(c, gSmall, kuc[2], kuc[0], kuc[1], 84, '53°', EL[2]);
    const es = yazi(c, gT, 430, 220, 'eş üçgenler', { size: 32, kalin: 700 });
    const rs = [0, 1, 2].map((i) => satir(c, gT, i, [['', EL[[2, 0, 1][i]]]], 150, 28));
    const ciz = (k) => {
      gBig.textContent = '';
      const Pk = [[b0[0], b0[1] - 4 * k * z.b], b0, [b0[0] + 3 * k * z.b, b0[1]]];
      const T = tek(c, gBig, Pk, ['A', 'B, E', 'C'], { dik: 1, tik: false, uz: [vir(3 * k), vir(5 * k), vir(4 * k)], uzak: 44 });
      const ay = [aciYaz(c, gBig, Pk[0], Pk[1], Pk[2], 74, '37°', EL[0]), aciYaz(c, gBig, Pk[2], Pk[0], Pk[1], 84, '53°', EL[2])];
      const bir = Math.abs(k - 1) < 1e-9;
      small.adlar[0].style.opacity = small.adlar[2].style.opacity = bir ? 0 : 1;   // k = 1: D ve F harfleri büyük üçgendeki "A, D" ve "C, F" içinde yazılır
      if (bir) { T.adlar[0].textContent = 'A, D'; T.adlar[2].textContent = 'C, F'; T.adlar[2].setAttribute('x', +T.adlar[2].getAttribute('x') + 20); gizle(ay, T.et); }
      es.style.opacity = bir ? 1 : 0;
      parcaKoy(c, rs[0], [[vir(4 * k) + '/4 = ' + vir(k), EL[2]]]);
      parcaKoy(c, rs[1], [[vir(3 * k) + '/3 = ' + vir(k), EL[0]]]);
      parcaKoy(c, rs[2], [[vir(5 * k) + '/5 = ' + vir(k), EL[1]]]);
    };
    ciz(2);
    gizle(gT); await belir(c, gT, 450);
    await c.say('k’yi değiştir; açılara, kenarlara ve oranlara bak.', { noWait: true });
    const sl = c.slider({ label: 'Benzerlik oranı k', min: 1, max: 2, step: 0.25, value: 2, fmt: (v) => vir(v), onInput: (v) => ciz(v) });
    await c.cont('Devam ›');
    const k0 = sl.get();
    sl.remove(); c.clearSay();
    await c.say('k değişince kenarlar değişti, açılar hiç değişmedi.', { speak: 'Ka değişince kenarlar değişti, açılar hiç değişmedi.' });
    await par(c.say('k = 1 olursa karşılıklı kenarlar eşit olur.', { speak: 'Ka eşittir bir olursa karşılıklı kenarlar eşit olur.' }), (async () => {
      for (let kk = k0 - 0.25; kk > 1 - 1e-9; kk -= 0.25) { ciz(kk); await c.wait(350); }
      ciz(1);
    })());
    await c.say('Benzerlik oranı 1 olan üçgenler eş üçgenlerdir.', { speak: 'Benzerlik oranı bir olan üçgenler eş üçgenlerdir.' });
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'ABC ~ DEF ve benzerlik oranı 1’dir. DEF’in kenarları 5, 6 ve 7 cm ise ABC için hangisi doğrudur?',
      options: ['ABC’nin kenarları 10, 12, 14 cm', 'ABC’nin kenarları da 5, 6, 7 cm; üçgenler eştir', 'ABC’nin kenarları 6, 7, 8 cm'], answer: 1,
      hints: ['k = 1: her kenar 1 ile çarpılır.', '', 'Kenarlar değişmez; üçgenler çakışır.'],
      right: 'Evet. Kenarlar değişmez; üçgenler eştir.',
    });
    await c.say('Oran 1 ise kenarlar aynı kalır; üçgenler eştir.', { speak: 'Oran bir ise kenarlar aynı kalır; üçgenler eştir.' });
    c.note('<b>ABC ~ DEF:</b> açılar eşit; kenarlar orantılı. k = 1 ise eş.', 'Benzer üçgenler', 'b3-benzer');
  }

  /* ---- 4. Oranla bilinmeyen kenar ---- */
  async function oranla(c) {
    const svg = c.svg(1000, 562);
    const ga = c.S('g', {}, svg);
    const P = B.ucgenKur('KKK', [12, 15, 18], [70, 430], { olcek: 16, aci: 0, taraf: 1 });
    const Q = B.ucgenKur('KKK', [4, 5, 6], [430, 430], { olcek: 16, aci: 0, taraf: 1 });
    const T1 = tek(c, ga, P, ['A', 'B', 'C'], { uz: ['15', '18', '12'] });
    const T2 = tek(c, ga, Q, ['D', 'E', 'F'], { uz: ['?', '?', '4'], yayR: 20 });
    const rows = [[['k = 12/4 = 3', EL[2]]], [['15/EF = 3', EL[0]]], [['18/DF = 3', EL[1]]]].map((q, i) => satir(c, ga, i, q, 150, 28));
    gizle(ga, rows);
    const nabiz = (i) => vurgula(c, [T1.cizgiler[i], T2.cizgiler[i]]);

    await par(c.say('ABC ~ DEF; |AB| = 12, |DE| = 4 karşılıklı kenarlar.', { speak: 'A B C benzerdir D E F; A B uzunluğu on iki, D E uzunluğu dört, karşılıklı kenarlar.' }), (async () => { await belir(c, ga, 450); await nabiz(2); })());
    await par(c.say('Benzerlik oranı k = 12 / 4 = 3.', { speak: 'Benzerlik oranı ka eşittir on iki bölü dört eşittir üç.' }), belir(c, rows[0], 450));
    await par(c.say('Bütün karşılıklı kenar çiftlerinde oran 3’tür.', { speak: 'Bütün karşılıklı kenar çiftlerinde oran üçtür.' }), (async () => {
      await c.tween(900, (e) => [0, 1, 2].forEach((i) => [T1.cizgiler[i], T2.cizgiler[i]].forEach((h) => h.setAttribute('stroke-width', 6 + 5 * Math.sin(Math.PI * e)))));
    })());
    await par(c.say('|BC| = 15 ise |BC| / |EF| = 3 olmalı.', { speak: 'B C uzunluğu on beş ise B C uzunluğu bölü E F uzunluğu eşittir üç olmalı.' }), (async () => { await belir(c, rows[1], 450); await nabiz(0); })());
    await par(c.say('15 / |EF| = 3 ise |EF| = 5.', { speak: 'On beş bölü E F uzunluğu eşittir üç ise E F uzunluğu eşittir beş.' }), (async () => {
      cevapla(T2.etk[0], '5'); parcaKoy(c, rows[1], [['15/5 = 3', EL[0]]]);
      await c.wait(300);
    })());
    c.clearSay();

    // Birlikte çöz: |DF|.
    await par(belir(c, rows[2], 450), nabiz(1));
    await c.choice({
      tag: 'Birlikte çöz', q: '|AC| = 18 ve k = 3. 18 / |DF| = 3 ise |DF| kaçtır?', options: ['54', '15', '6'], answer: 2,
      hints: ['18’i 3’e böl.', '18 bölü |DF|, oran 3’e eşit.', ''],
      right: 'Evet. 18 ÷ 3 = 6.',
    });
    cevapla(T2.etk[1], '6'); parcaKoy(c, rows[2], [['18/6 = 3', EL[1]]]);
    await c.say('18 / |DF| = 3 ise |DF| = 6.', { speak: 'On sekiz bölü D F uzunluğu eşittir üç ise D F uzunluğu eşittir altı.' });
    c.clearSay();
    await sil(c, ga, 350);

    // Sıra sende: MNP ~ KLM.
    const gb = c.S('g', {}, svg);
    const M1 = B.ucgenKur('KKK', [20, 28, 24], [235, 450], { olcek: 15, aci: 0, taraf: 1 });
    const M2 = B.ucgenKur('KKK', [5, 7, 6], [685, 450], { olcek: 15, aci: 0, taraf: 1 });
    const U1 = tek(c, gb, M1, ['M', 'N', 'P'], { uz: ['28', '', '20'] });
    const U2 = tek(c, gb, M2, ['K', 'L', 'M'], { uz: ['?', '', '5'], yayR: 20 });
    gizle(gb); await belir(c, gb, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'MNP ~ KLM; |MN| = 20, |KL| = 5 ve |NP| = 28. |LM| kaçtır?', options: ['8', '7', '112'], answer: 1,
      hints: ['M ile K, N ile L, P ile M karşılıklı köşeler; MN ile KL, NP ile LM karşılıklı.', '', 'Oran 20 bölü 5 = 4; 28’i 4’e böl.'],
      right: 'Evet. Oran 4; 28 ÷ 4 = 7.',
    });
    cevapla(U2.etk[0], '7');
    await c.say('Oran 20 / 5 = 4; 28 / 4 = 7.', { speak: 'Oran yirmi bölü beş eşittir dört; yirmi sekiz bölü dört eşittir yedi.' });
    c.note('<b>Oran:</b> k = 12/4 = 3; EF = 15÷3 = 5', 'Oranla kenar', 'b3-oran-kenar');
  }

  /* ---- 5. Harita ---- */
  async function harita(c) {
    const svg = c.svg(1000, 562);
    const gH = c.S('g', {}, svg), gR = c.S('g', {}, svg);
    c.S('rect', { x: 40, y: 110, width: 290, height: 340, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, gH);
    const P = [[95, 400], [290, 370], [175, 225]], Q = [[380, 440], [633.5, 401], [484, 212.5]];
    const tP = B.notrUcgen(c, gH, P, ['A', 'B', 'C']);
    P.forEach((q) => nokta(c, gH, q, RENK.yazi, 7));
    const hl = yazi(c, gH, 185, 92, 'harita', { size: 26, kalin: 700 });
    const olc = yazi(c, gH, 185, 437, '1/2 000 000', { size: 26, kalin: 700 });
    const tQ = B.notrUcgen(c, gR, Q, ['A′', 'B′', 'C′']);
    const gl = yazi(c, gR, 560, 150, 'gerçek', { size: 26, kalin: 700 });
    const tilde = yazi(c, svg, 355, 300, '~', { size: 48, kalin: 700 });
    const kutu = c.S('g', {}, svg);
    c.S('rect', { x: 215, y: 126, width: 102, height: 46, rx: 8, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2 }, kutu);
    const cm = yazi(c, kutu, 266, 158, '39 cm', { size: 26, kalin: 700 });
    const L1 = satir(c, svg, 0, [['1 cm = 2 000 000 cm', RENK.yazi]], 150, 26);
    const L2 = satir(c, svg, 0, [['k = 2 000 000', RENK.yazi]], 150, 26);
    const L3 = satir(c, svg, 1, [['39 × 2 000 000', RENK.yazi]], 150, 26), L4 = satir(c, svg, 2, [['= 78 000 000 cm', RENK.yazi]], 150, 26);
    const L5 = satir(c, svg, 0, [['1 km = 100 000 cm', RENK.yazi]], 150, 26), L6 = satir(c, svg, 3, [['= 780 km', RENK.iyi]], 150, 26);
    gizle(gH, gR, tilde, kutu, L1, L2, L3, L4, L5, L6);

    await par(c.say('Rüzgâr, tatilde gideceği üç ilin yerini 1/2 000 000 ölçekli haritada işaretliyor.', { speak: 'Rüzgâr, tatilde gideceği üç ilin yerini iki milyonda bir ölçekli haritada işaretliyor.' }), belir(c, gH, 450));
    await par(c.say('Haritadaki 1 cm, gerçekte 2 000 000 cm’dir.', { speak: 'Haritadaki bir santimetre, gerçekte iki milyon santimetredir.' }), belir(c, L1, 450));
    await par(c.say('Haritadaki ABC ile gerçek A′B′C′ üçgenleri benzerdir.', { speak: 'Haritadaki A B C ile gerçek A üssü B üssü C üssü üçgenleri benzerdir.' }), (async () => {
      await belir(c, L1, 300, 0); await belir(c, [gR, tilde], 450);
    })());
    await par(c.say('Benzerlik oranı 2 000 000: gerçek kenarlar haritadakinin o kadar katı.', { speak: 'Benzerlik oranı iki milyon: gerçek kenarlar haritadakinin o kadar katı.' }), belir(c, L2, 450));
    await par(c.say('Çevre kenarların toplamıdır; toplam da 2 000 000 katı olur.', { speak: 'Çevre kenarların toplamıdır; toplam da iki milyon katı olur.' }), (async () => {
      await par(vurgula(c, [tP.yuz, tQ.yuz], 900, 3));
    })());
    await par(c.say('Haritada ABC’nin çevresi 39 cm.', { speak: 'Haritada A B C’nin çevresi otuz dokuz santimetre.' }), (async () => {
      await belir(c, L2, 300, 0); await belir(c, kutu, 450);
    })());
    await par(c.say('Gerçek çevre 39 × 2 000 000 = 78 000 000 cm.', { speak: 'Gerçek çevre otuz dokuz çarpı iki milyon eşittir yetmiş sekiz milyon santimetre.' }), (async () => {
      await belir(c, L3, 450); await belir(c, L4, 450);
    })());
    c.clearSay();

    // Birlikte çöz: km.
    await belir(c, [olc, kutu, L3], 300, 0);
    await belir(c, L5, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: '1 km = 100 000 cm. 78 000 000 cm kaç km’dir?', options: ['78 km', '780 km', '7 800 km'], answer: 1,
      hints: ['Önce beşer sıfırı at: 780 bulunur.', '', '78 000 000 bölü 100 000.'],
      right: 'Evet. 78 000 000 ÷ 100 000 = 780.',
    });
    await par(c.say('78 000 000 cm, 100 000’e bölününce 780 km olur.', { speak: 'Yetmiş sekiz milyon santimetre, yüz bine bölününce yedi yüz seksen kilometre olur.' }), belir(c, L6, 450));
    c.clearSay();

    // Sıra sende: 1/1 000 000.
    await belir(c, [L4, L5, L6], 300, 0);
    olc.textContent = '1/1 000 000'; cm.textContent = '25 cm';
    parcaKoy(c, L3, [['25 × 1 000 000', RENK.yazi]]); parcaKoy(c, L4, [['= 25 000 000 cm', RENK.yazi]]); parcaKoy(c, L6, [['= 250 km', RENK.iyi]]);
    await belir(c, [olc, kutu], 450);
    await c.choice({
      tag: 'Sıra sende', q: '1/1 000 000 ölçekli bir haritada çevresi 25 cm olan üçgenin gerçek çevresi kaç km’dir?', options: ['250 km', '25 km', '2 500 km'], answer: 0,
      hints: ['', 'Gerçek çevre = 25 × 1 000 000 cm.', '100 000 cm bir km’dir.'],
      right: 'Evet. 25 × 1 000 000 = 25 000 000 cm = 250 km.',
    });
    await par(c.say('Gerçek çevre 25 × 1 000 000 = 25 000 000 cm.', { speak: 'Gerçek çevre yirmi beş çarpı bir milyon eşittir yirmi beş milyon santimetre.' }), (async () => {
      await belir(c, L3, 450); await belir(c, L4, 450);
    })());
    await par(c.say('25 000 000 cm, 100 000’e bölününce 250 km olur.', { speak: 'Yirmi beş milyon santimetre, yüz bine bölününce iki yüz elli kilometre olur.' }), (async () => {
      await belir(c, L3, 300, 0); await belir(c, L6, 450);
    })());
    c.clearSay();

    // Gör: maket ve gerçek bina.
    await sil(c, [gH, gR, tilde, kutu, L3, L4, L6], 350);
    const ev = (x, y, s) => [[x, y], [x, y - 0.6 * s], [x + 0.5 * s, y - 1.05 * s], [x + s, y - 0.6 * s], [x + s, y]];
    const gE = c.S('g', {}, svg);
    cokgen(c, gE, ev(150, 430, 110), RENK.cizgi); cokgen(c, gE, ev(430, 430, 250), RENK.cizgi);
    yazi(c, gE, 205, 475, 'maket', { size: 26, kalin: 700 }); yazi(c, gE, 555, 475, 'gerçek', { size: 26, kalin: 700 }); yazi(c, gE, 340, 380, '~', { size: 48, kalin: 700 });
    gizle(gE);
    await par(c.say('Maket ve harita gerçeğin benzeridir: biçim kalır, boy küçülür.'), belir(c, gE, 450));
    await c.say('Bu yüzden bina maketi gerçeğiyle aynı biçimde görünür.');
  }

  /* ---- 6. Her kenara aynı sayıyı eklemek ---- */
  async function ekleme(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const A0 = z.N([[11, 7], [11, 10], [15, 10]]);                   // 3, 4, 5 üçgeni: A, B, C
    const T0 = tek(c, svg, A0, [], { dik: 1, tik: false, uz: ['4', '5', '3'] });
    const gK = c.S('g', {}, svg);
    const R = B.ucgenKur('KKK', [8, 7, 6], z.P(1, 10), { olcek: 40, aci: 0, taraf: 1 });    // [K, M, L]
    const K3 = [R[0], R[2], R[1]];                                    // K, L, M
    const T1 = tek(c, gK, K3, [], { yay: false, tik: false, uz: ['7', '8', '6'] });
    const aT0 = [aciYaz(c, svg, A0[0], A0[1], A0[2], 70, '53°', RENK.merkez), aciYaz(c, svg, A0[2], A0[0], A0[1], 88, '37°', RENK.merkez)];
    const aK = [aciYaz(c, gK, K3[0], K3[1], K3[2], 74, '58°', RENK.merkez), aciYaz(c, gK, K3[1], K3[0], K3[2], 64, '76°', RENK.merkez), aciYaz(c, gK, K3[2], K3[0], K3[1], 84, '47°', RENK.merkez)];
    const fark = [['6 − 3 = 3', EL[2]], ['7 − 4 = 3', EL[0]], ['8 − 5 = 3', EL[1]]].map((q, i) => satir(c, svg, i, [q], 150, 28));
    const oran = [['6/3 = 2', EL[2]], ['7/4 = 1,75', EL[0]], ['8/5 = 1,6', EL[1]]].map((q, i) => satir(c, svg, i, [q], 150, 28));
    const tilde = yazi(c, svg, 430, 312, '~', { size: 64, kalin: 700 }), kes = cizgi(c, svg, [402, 352], [458, 262], RENK.yazi, 4);
    // Doğru büyütme: 6, 8, 10.
    const Bg = z.N([[1, 4], [1, 10], [9, 10]]);
    const T3 = tek(c, svg, Bg, [], { dik: 1, tik: false, uz: ['8', '10', '6'] });
    const aT3 = [aciYaz(c, T3.g, Bg[0], Bg[1], Bg[2], 70, '53°', RENK.merkez), aciYaz(c, T3.g, Bg[2], Bg[0], Bg[1], 88, '37°', RENK.merkez)];
    const oran2 = [['6/3 = 2', EL[2]], ['8/4 = 2', EL[0]], ['10/5 = 2', EL[1]]].map((q, i) => satir(c, svg, i, [q], 150, 28));
    gizle(T0.g, T0.yay, gK, aT0, aK, fark, oran, tilde, kes, T3.g, aT3, oran2);

    await par(c.say('Her kenara 3 ekleyelim: 3, 4, 5 → 6, 7, 8.', { speak: 'Her kenara üç ekleyelim: üç, dört, beş kenarları altı, yedi, sekiz olur.' }), (async () => {
      await belir(c, T0.g, 450); await belir(c, gK, 450);
    })());
    await par(c.say('Farklar aynı: üç kenar da 3 uzadı.', { speak: 'Farklar aynı: üç kenar da üç uzadı.' }), belir(c, fark, 450));
    await par(c.say('Oranlar farklı: 2, 1,75 ve 1,6.', { speak: 'Oranlar farklı: iki, bir virgül yetmiş beş ve bir virgül altı.' }), (async () => {
      await belir(c, fark, 300, 0); await belir(c, oran, 450);
    })());
    await par(c.say('Yeni üçgenin en büyük açısı yaklaşık 76°; dik açı yok.', { speak: 'Yeni üçgenin en büyük açısı yaklaşık yetmiş altı derece; dik açı yok.' }), (async () => {
      await par(belir(c, T0.yay[1], 450), belir(c, [...aT0, ...aK], 450));
    })());
    await par(c.say('Açılar değiştiği için bu iki üçgen benzer değil.'), belir(c, [tilde, kes], 450));
    await par(c.say('Her kenarı aynı sayıyla çarparsak 3, 4, 5 → 6, 8, 10.', { speak: 'Her kenarı aynı sayıyla çarparsak üç, dört, beş kenarları altı, sekiz, on olur.' }), (async () => {
      await belir(c, [gK, tilde, kes, ...oran, ...aT0], 350, 0);
      await belir(c, T3.g, 450);
    })());
    await par(c.say('Çarpınca açılar aynı kalır ve oranlar eşit olur.'), (async () => {
      await par(belir(c, [T0.yay[0], T0.yay[2], ...aT0, ...aT3, ...oran2], 500), belir(c, T3.yay, 500));
    })());
    c.clearSay();

    // Sıra sende (yanılgı): 4, 6, 8 → 6, 8, 10.
    await sil(c, [T0.g, T3.g, ...aT0, ...aT3, ...oran2], 350);
    gK.remove();
    const W1 = B.ucgenKur('KKK', [4, 6, 8], [100, 430], { olcek: 28, aci: 0, taraf: 1 }), W2 = B.ucgenKur('KKK', [6, 8, 10], [380, 430], { olcek: 28, aci: 0, taraf: 1 });
    const gW = c.S('g', {}, svg);
    tek(c, gW, W1, [], { yay: false, tik: false, uz: ['6', '8', '4'] }); tek(c, gW, W2, [], { yay: false, tik: false, uz: ['8', '10', '6'] });
    const yan = [['6/4 = 1,5', EL[2]], ['8/6 ≈ 1,33', EL[0]], ['10/8 = 1,25', EL[1]]].map((q, i) => satir(c, svg, i, [q], 150, 28));
    gizle(gW, yan); await belir(c, gW, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Kenarları 4, 6 ve 8 olan bir üçgenin her kenarına 2 eklenip 6, 8 ve 10 elde edildi. Bu iki üçgen benzer midir?',
      options: ['Benzer; her kenara aynı sayı eklendi', 'Benzer değil; oranlar 6/4, 8/6, 10/8 aynı değil', 'Benzer; k = 2'], answer: 1,
      hints: ['Benzerlikte oranlar eşit olmalı.', '', '6/4 = 1,5 ama 8/6 yaklaşık 1,33.'],
      right: 'Evet. Oranlar aynı değil; üçgenler benzer değil.',
    });
    await par(c.say('Oranlar 1,5; yaklaşık 1,33 ve 1,25: aynı değil.', { speak: 'Oranlar bir virgül beş; yaklaşık bir virgül otuz üç ve bir virgül yirmi beş: aynı değil.' }), belir(c, yan, 450));
    c.note('<b>Benzer büyütme:</b> kenarlar aynı sayıyla çarpılır; fark aynı olmaz.', 'Benzer büyütme', 'b3-benzer-buyutme');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b3', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Benzer üçgenler: açılar eşit, kenarlar orantılı', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Benzer üçgenler: açılar eşit, kenarlar orantılı',
      hook: 'Bir binanın maketi neden <b>gerçeğiyle aynı biçimde</b> görünür?',
      button: 'Derse başla ›',
    },
    goals: ['Karşılıklı açıları eşit, karşılıklı kenarları orantılı üçgenleri benzer üçgen olarak tanır.', 'Benzerlik oranı k’yi karşılıklı kenarların bölümü olarak bulur ve bilinmeyen kenarı hesaplar.', 'Her kenara aynı sayıyı eklemenin benzerlik vermediğini, kenarları aynı sayıyla çarpmanın verdiğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Üç kenarı eşit üçgenler eştir; karşılıklı açılar eşittir.', run: hatirla },
      { title: 'Aynı biçim, farklı boy', goal: 'Açıları eşit, kenarları eşit olmayan üçgenler vardır.', run: aynibicim },
      { title: 'Benzerlik ve oran', goal: 'Benzer üçgenlerde karşılıklı kenar oranı k ve açılar eşittir.', run: benzerlik },
      { title: 'Oranla bilinmeyen kenar', goal: 'k’yi bul, bilinmeyen kenarı oranla hesapla.', run: oranla },
      { title: 'Harita', goal: 'Haritadaki çevre, ölçeğin tersi kadar büyür.', run: harita },
      { title: 'Her kenara aynı sayıyı eklemek', goal: 'Kenarlara toplama benzerlik vermez; çarpma verir.', run: ekleme },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Kenarları 3, 4, 5 olan bir üçgenin her kenarına 1 eklenip 4, 5, 6 elde edildi. İki üçgen için hangisi doğrudur?',
        options: ['Eştirler', 'Benzer değildirler; oranlar aynı değil', 'Benzerdirler; her kenar 1 arttı'], answer: 1,
        why: ['Kenarlar değiştiği için üçgenler eş olamaz; eş üçgenlerin karşılıklı kenarları eşittir.', 'Oranlar 4/3, 5/4 ve 6/5 farklıdır; benzerlikte üç oran da aynı olmalıdır.', 'Aynı sayıyı eklemek farkı korur ama oranı korumaz; benzerlik için oranlar eşit olmalıdır.'],
        scene: 5,
      },
      {
        q: 'ABC ~ DEF, |AB| = 15 cm, |DE| = 5 cm ve |BC| = 12 cm. |EF| kaç cm’dir?',
        options: ['36 cm', '9 cm', '4 cm'], answer: 2,
        why: ['36 cm, 12 ile 3’ün çarpımıdır; |EF| bulunurken 12 bölünmelidir.', '9 cm, 12 − 3 farkıdır; benzerlikte fark değil oran korunur.', 'k = 15 ÷ 5 = 3 olur; |EF| = 12 ÷ 3 = 4 cm.'],
        scene: 3,
      },
      {
        q: 'Benzerlik oranı 1 olan iki üçgen için hangisi doğrudur?',
        options: ['Eş üçgenlerdir', 'Benzer ama eş değildir', 'Açıları farklıdır'], answer: 0,
        why: ['k = 1 ise karşılıklı kenarlar eşittir; açılar da eşit olduğundan üçgenler eştir.', 'k = 1 olduğunda karşılıklı kenarlar eşit olur; bu üçgenler eş sayılır.', 'Benzer üçgenlerin karşılıklı açıları her zaman eşittir.'],
        scene: 2,
      },
      {
        q: '1/500 000 ölçekli bir haritada çevresi 12 cm olan üçgenin gerçek çevresi kaç km’dir?',
        options: ['6 km', '60 km', '600 km'], answer: 1,
        why: ['6 km için bir sıfır eksik atılmış; 6 000 000 cm = 60 km eder.', '12 × 500 000 = 6 000 000 cm; 100 000’e bölünce 60 km bulunur.', '600 km için bir sıfır fazla atılmış; 6 000 000 cm = 60 km eder.'],
        scene: 4,
      },
      {
        q: 'ABC ~ DEF, |AB| / |DE| = 3 ve m(A) = 40°. m(D) kaç derecedir?',
        options: ['120°', '13,3°', '40°'], answer: 2,
        why: ['120°, açıyı 3 ile çarpmaktan çıkar; k yalnızca kenarlara uygulanır.', '13,3°, açıyı 3’e bölmekten çıkar; k açıyı değiştirmez.', 'A ile D karşılıklı köşelerdir; benzer üçgenlerde karşılıklı açılar eşittir.'],
        scene: 2,
      },
    ],
    summary: [
      'Benzer üçgenlerin karşılıklı açıları eşit, karşılıklı kenarları orantılıdır.',
      'Benzerlik oranı <b>k</b>, karşılıklı kenarların bölümüdür.',
      '<b>Açılar aynı, kenarlar aynı oranda: benzer.</b>',
      'k = 1 ise üçgenler eştir.',
    ],
    nextLesson: { href: 'b4-aci-aci.html', label: 'Sonraki: Açı-Açı: iki açı yeter ›' },
  });
})();
