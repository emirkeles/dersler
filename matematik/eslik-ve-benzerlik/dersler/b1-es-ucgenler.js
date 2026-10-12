/* B1 — Eş üçgenler: dönüşümle çakışan üçgenler
   Karşılıklı kenarları ve açıları eşit olan üçgenler eştir; bir üçgene dönüşüm uygulanırsa ona eş üçgenler üretilir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B1)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, araHepsi, yansit, otele, dondur, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma, aciYayi, aciIci, agirlik } = window.KIT;
  const B = window.KIT_B;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift

  const TX = 706;                                   // sağdaki tablonun sol kenarı
  const BOSLUK = '   ';                // tablo sütunları arasındaki boşluk (daralmaz)
  const satir = (c, p, i, parcalar, y0 = 150) => renkli(c, p, TX, y0 + i * 52, parcalar, { hiza: 'start', size: 25 });
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); (Array.isArray(el) ? el : [el]).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => c.tween(ms, (e) => hatlar.forEach((h) => h.setAttribute('stroke-width', 6 + 5 * Math.sin(Math.PI * e))));
  /* Köşenin çizdiği kesikli yay (O çevresinde V köşesi x derece döner). */
  function izYay(c, p, O, V, renk) {
    const g = c.S('g', {}, p), r = uz(O, V), a0 = yon(O, V);
    const yol = c.S('path', { fill: 'none', stroke: renk, 'stroke-width': 2.5, 'stroke-dasharray': '6 6', 'stroke-linecap': 'round', 'stroke-opacity': 0.75 }, g);
    const ciz = (x) => {
      if (x < 0.5) { yol.setAttribute('d', ''); return; }
      const S = ileri(O, a0, r), E = ileri(O, a0 + rad(x), r);
      yol.setAttribute('d', `M${S[0]},${S[1]} A${r},${r} 0 0 1 ${E[0]},${E[1]}`);
    };
    ciz(0);
    return { g, ciz };
  }
  /* Dönme merkezi: sarı nokta, adı, kıvrık ok ve açı yazısı. */
  function merkezOk(c, p, O, ad, derece) {
    const g = c.S('g', {}, p), r = 30, a0 = rad(-110), a1 = rad(-5);
    nokta(c, g, O, RENK.merkez, 8);
    const S = ileri(O, a0, r), E = ileri(O, a1, r), t = a1 + Math.PI / 2, u = ileri(E, t, 10), k1 = ileri(E, t + Math.PI / 2, 7), k2 = ileri(E, t - Math.PI / 2, 7);
    c.S('path', { d: `M${S[0]},${S[1]} A${r},${r} 0 0 1 ${E[0]},${E[1]}`, fill: 'none', stroke: RENK.merkez, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    c.S('path', { d: `M${u[0]},${u[1]} L${k1[0]},${k1[1]} L${k2[0]},${k2[1]} Z`, fill: RENK.merkez }, g);
    yazi(c, g, O[0] + 6, O[1] + 36, ad, { size: 24, kalin: 700, renk: RENK.merkez });
    if (derece) yazi(c, g, O[0] + 50, O[1] - 26, derece, { size: 22, kalin: 700, renk: RENK.merkez });
    return g;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Üç dönüşüm: şekil mavi, görüntüsü turuncu.
    const g1 = c.S('g', {}, svg), T = (x, y) => [[x, y], [x, y + 80], [x + 60, y + 80]];
    const yer = (P, renk) => cokgen(c, g1, P, renk);
    const Y = T(90, 200), U = [190, 170], V = [190, 320];
    yer(Y, RENK.sekil); yer(Y.map((q) => yansit(q, U, V)), RENK.goruntu); dogru(c, g1, U, V);
    const O1 = T(380, 200);
    yer(O1, RENK.sekil); yer(O1.map((q) => otele(q, [150, 0])), RENK.goruntu);
    ok(c, g1, [470, 180], [520, 180]);
    const D = T(680, 200), Om = [790, 300];
    yer(D, RENK.sekil); yer(D.map((q) => dondur(q, Om, 90)), RENK.goruntu); nokta(c, g1, Om, RENK.merkez, 8);
    yazi(c, g1, 190, 400, 'yansıma'); yazi(c, g1, 485, 400, 'öteleme'); yazi(c, g1, 790, 400, 'dönme');
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Yansıma, öteleme ve dönmede görüntü şekle göre nasıldır?',
      options: ['Şekilden küçüktür', 'Şekle eştir', 'Ters çevrildiği için eş değildir'], answer: 1,
      hints: ['Üç dönüşümde de görüntü şekle eştir; ölçüler değişmez.', '', 'Üç dönüşümde de görüntü şekle eştir; ölçüler değişmez.'],
      right: 'Evet. Üç dönüşümde de ölçüler değişmez.',
    });
    c.clearSay();
    await sil(c, g1, 350);

    // Dönmede merkeze uzaklık.
    const g2 = c.S('g', {}, svg), O = [230, 170], P = [470, 170], P2 = dondur(P, O, 70);
    cizgi(c, g2, O, P, RENK.cizgi, 3); cizgi(c, g2, O, P2, RENK.cizgi, 3);
    const yay = c.S('path', { d: `M${P[0]},${P[1]} A240,240 0 0 1 ${P2[0]},${P2[1]}`, fill: 'none', stroke: RENK.goruntu, 'stroke-width': 2.5, 'stroke-dasharray': '6 6' }, g2);
    const aS = ileri(O, 0, 56), aE = ileri(O, rad(70), 56);
    c.S('path', { d: `M${aS[0]},${aS[1]} A56,56 0 0 1 ${aE[0]},${aE[1]}`, fill: 'none', stroke: RENK.merkez, 'stroke-width': 3 }, g2);
    const m70 = ileri(O, rad(35), 84);
    yazi(c, g2, m70[0], m70[1] + 8, '70°', { size: 22, kalin: 700, renk: RENK.merkez });
    nokta(c, g2, O, RENK.merkez, 8); yazi(c, g2, O[0] - 22, O[1] - 14, 'O', { size: 24, kalin: 700, renk: RENK.merkez });
    nokta(c, g2, P, RENK.sekil, 7); yazi(c, g2, P[0] + 20, P[1] - 12, 'P', { size: 24, kalin: 700, renk: RENK.sekil });
    nokta(c, g2, P2, RENK.goruntu, 7); yazi(c, g2, P2[0] - 10, P2[1] + 34, 'P′', { size: 24, kalin: 700, renk: RENK.goruntu });
    yazi(c, g2, 350, 150, '6', { size: 24, kalin: 700 });
    const soru = yazi(c, g2, 232, 300, '?', { size: 26, kalin: 700, renk: RENK.goruntu });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir şekil O çevresinde 70° döndürülüyor. P noktası O’ya 6 birim uzaktaysa görüntüsü P′, O’ya kaç birim uzaktadır?',
      options: ['12 birim', '3 birim', '6 birim'], answer: 2,
      hints: ['Dönmede her nokta merkeze uzaklığını korur.', 'Dönmede her nokta merkeze uzaklığını korur.', ''],
      right: 'Evet. Merkeze uzaklık değişmez.',
    });
    cevapla(soru, '6');
    await c.say('Dönmede her nokta merkeze uzaklığını korur.');
  }

  /* ---- 2. Kalıptan çıkan üçgen ---- */
  async function kalip(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const P = z.N([[1, 3], [1, 7], [4, 7]]), Q = z.N([[9, 3], [9, 7], [12, 7]]), M = agirlik(P), Mq = agirlik(Q);
    const ab = cokgen(c, svg, P, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const dik = aciYayi(c, svg, P[1], P[0], P[2], RENK.sekil, 30, { dik: true });
    const e = [B.kenarEtiketi(c, svg, P[0], P[1], '4', RENK.sekil, { merkez: M }), B.kenarEtiketi(c, svg, P[1], P[2], '3', RENK.sekil, { merkez: M }), B.kenarEtiketi(c, svg, P[0], P[2], '5', RENK.sekil, { merkez: M })];
    const def = cokgen(c, svg, P, RENK.goruntu, { harf: ['D', 'E', 'F'] });
    const oku = c.S('g', {}, svg), uc = z.P(1, 1.5), un = z.P(9, 1.5);
    ok(c, oku, uc, un); yazi(c, oku, (uc[0] + un[0]) / 2, uc[1] - 14, '8', { size: 26, kalin: 700, renk: RENK.ok });
    gizle(ab.g, dik, e, def.g, def.adlar, oku);

    await par(c.say('Bir çini ustası, üçgen biçimli bir kalıbı panoya basıyor.', { speak: '[curious] Bir çini ustası, üçgen biçimli bir kalıbı panoya basıyor.' }), belir(c, ab.g, 450));
    await par(c.say('Kalıbın kenarları 4, 3 ve 5 birim; dik açı B’de.', { speak: 'Kalıbın kenarları dört, üç ve beş birim; dik açı B’de.' }), belir(c, [dik, ...e], 450));
    await par(c.say('Usta kalıbı 8 birim sağa kaydırıp yeniden basıyor.', { speak: 'Usta kalıbı sekiz birim sağa kaydırıp yeniden basıyor.' }), (async () => {
      await belir(c, [oku, def.g], 350);
      await c.tween(1700, (x) => def.koy(araHepsi(P, Q, x)), Ders.ease.inOut);
    })());
    await par(c.say('Yeni üçgen DEF: D, A’nın; E, B’nin; F, C’nin görüntüsü.', { speak: 'Yeni üçgen D E F: D, A’nın; E, B’nin; F, C’nin görüntüsü.' }), belir(c, def.adlar, 450));

    // Açılar tablosu: ABC sütunu dolu, DEF sütunu satır satır dolar.
    const veri = [['B 90°', 'E 90°'], ['A 37°', 'D 37°'], ['C 53°', 'F ?']];
    const tr = veri.map((v, i) => satir(c, svg, i, [[v[0], RENK.sekil]]));
    gizle(tr);
    await par(c.say('Öteleme kenarı, açıyı, çevreyi ve alanı değiştirmez.'), (async () => {
      await belir(c, tr, 450);
      for (let i = 0; i < 3; i++) { await c.wait(450); parcaKoy(c, tr[i], [[veri[i][0], RENK.sekil], BOSLUK, [veri[i][1], RENK.goruntu]]); }
    })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'F açısı kaç derecedir?', options: ['37°', '90°', '53°'], answer: 2,
      hints: ['Öteleme açıyı değiştirmez.', 'F, C’nin görüntüsü; C açısı 53°.', ''],
      right: 'Evet. F, C’nin görüntüsü; ölçü aynı kalır.',
    });
    parcaKoy(c, tr[2], [['C 53°', RENK.sekil], BOSLUK, ['F 53°', RENK.iyi]]);
    await c.wait(700);
    c.clearSay();
    await sil(c, tr, 350);

    const f = [B.kenarEtiketi(c, svg, Q[0], Q[1], '4', RENK.goruntu, { merkez: Mq }), B.kenarEtiketi(c, svg, Q[1], Q[2], '3', RENK.goruntu, { merkez: Mq }), B.kenarEtiketi(c, svg, Q[0], Q[2], '5', RENK.goruntu, { merkez: Mq })];
    gizle(f);
    await par(c.say('DE, EF ve DF kenarları da 4, 3 ve 5 birim.', { speak: 'D E, E F ve D F kenarları da dört, üç ve beş birim.' }), belir(c, f, 450));
    c.clearSay();
    f[2].textContent = '?';
    await c.choice({
      tag: 'Sıra sende', q: 'DEF üçgeninin en uzun kenarı DF kaç birimdir?', options: ['4 birim', '8 birim', '5 birim'], answer: 2,
      hints: ['DF, AC kenarının görüntüsüdür; AC en uzun kenardı.', 'Kenar 8 birim kaydı ama uzamadı.', ''],
      right: 'Evet. DF de AC gibi 5 birim.',
    });
    cevapla(f[2], '5');
    await c.say('DF, AC’nin görüntüsü olduğundan 5 birim.', { speak: 'D F, A C’nin görüntüsü olduğundan beş birim.' });

    // Gör: DEF geri kayar ve ABC'nin üstüne oturur.
    c.clearSay();
    await par(belir(c, f, 350, 0), belir(c, oku, 350, 0), belir(c, def.adlar, 350, 0));
    await c.tween(1700, (x) => def.koy(araHepsi(Q, P, x)), Ders.ease.inOut);
    const es = yazi(c, svg, 830, 190, 'eş üçgenler', { size: 30, kalin: 700 });
    gizle(es);
    await c.say('Üst üste oturan üçgenlerde her kenarın ve açının bir eşi var.');
    await par(c.say('Karşılıklı kenarları ve açıları eşit olan üçgenlere <b>eş üçgenler</b> denir.'), belir(c, es, 450));
  }

  /* ---- 3. Köşe sırası ve ≅ ---- */
  async function koseSirasi(c) {
    const svg = c.svg(1000, 562);
    const P = [[190, 150], [190, 390], [370, 390]], Q = P.map((q) => [q[0] + 450, q[1]]);
    const e = B.esleme(c, svg, P, Q, { dik: 1 });
    const t = B.eslemeYazisi(c, svg, 500, 90, 'ABC', 'DEF', '≅', { ucgenSimge: false, size: 44 });
    const yanlis = B.eslemeYazisi(c, svg, 500, 90, 'ABC', 'DFE', '≅', { ucgenSimge: false, size: 44, sagSira: [0, 2, 1] });
    const cizik = cizgi(c, svg, [360, 78], [640, 78], RENK.iyi, 4);
    const l4 = B.kenarEtiketi(c, svg, P[0], P[1], '4', EL[2], { merkez: agirlik(P) }), l5 = B.kenarEtiketi(c, svg, Q[0], Q[2], '5', EL[1], { merkez: agirlik(Q) });
    const fark = yazi(c, svg, 500, 500, '4 ≠ 5', { size: 36, kalin: 700 });
    gizle(e.g, e.yaylar, e.kenarlar, t, yanlis, cizik, l4, l5, fark);

    await par(c.say('A–D, B–E ve C–F eşlendi: her köşenin tek eşi var.', { speak: 'A D, B E ve C F eşlendi: her köşenin tek eşi var.' }), (async () => {
      await belir(c, e.g, 400); await belir(c, [...e.yaylar, ...e.kenarlar], 600);
    })());
    await par(c.say('Eşlik “≅” simgesiyle yazılır: ABC ≅ DEF.', { speak: 'Eşlik “eştir” simgesiyle yazılır: A B C eştir D E F.' }), belir(c, t, 450));
    await c.say('Karşılıklı köşeler yazıda aynı sırada durur.');
    await par(c.say('Yazı AB’nin DE’ye, BC’nin EF’ye, AC’nin DF’ye karşılık geldiğini söyler.', { speak: 'Yazı A B’nin D E’ye, B C’nin E F’ye, A C’nin D F’ye karşılık geldiğini söyler.' }), (async () => {
      for (const i of [2, 0, 1]) { await vurgula(c, e.kenarCift[i]); }
    })());
    await par(c.say('ABC ≅ DFE yazsak AB, DF ile eşlenir: 4 ≠ 5.', { speak: 'A B C eştir D F E yazsak A B, D F ile eşlenir: dört eşit değildir beş.' }), (async () => {
      await belir(c, t, 250, 0); await belir(c, yanlis, 350);
      await belir(c, [l4, l5], 350); await belir(c, fark, 350); await belir(c, cizik, 300);
    })());
    await par(c.say('Yazıdaki harf sırası, hangi köşenin hangisine karşılık geldiğini bildirir.'), (async () => {
      await belir(c, [yanlis, cizik, l4, l5, fark], 300, 0); await belir(c, t, 400);
    })());
    c.clearSay();

    // Birlikte çöz: KLM ≅ PRT.
    await belir(c, [e.g, t], 300, 0.25);
    const k1 = B.eslemeYazisi(c, svg, 500, 490, 'KLM', 'PR?', '≅', { ucgenSimge: false, size: 56 });
    gizle(k1); await belir(c, k1, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'KLM ≅ PRT yazılmış. M köşesi hangi köşeye karşılık gelir?', options: ['R', 'T', 'P'], answer: 1,
      hints: ['K ile P, L ile R eşlenmişti; geriye T kaldı.', '', 'Üçüncü harfler eşlenir: M ile T.'],
      right: 'Evet. Üçüncü harfler eşlenir.',
    });
    k1.remove();
    const k2 = B.eslemeYazisi(c, svg, 500, 490, 'KLM', 'PRT', '≅', { ucgenSimge: false, size: 56 });
    await c.say('Üçüncü harfler eşlenir: M ile T.');
    c.clearSay();

    // Sıra sende: XYZ ≅ MNP.
    k2.remove();
    const x1 = B.eslemeYazisi(c, svg, 500, 490, 'XYZ', 'MNP', '≅', { ucgenSimge: false, size: 56 });
    await c.choice({
      tag: 'Sıra sende', q: 'XYZ ≅ MNP yazılmış. YZ kenarının karşılığı hangisidir?', options: ['MN', 'MP', 'NP'], answer: 2,
      hints: ['Y ile N, Z ile P eşlenir.', 'YZ, ikinci ve üçüncü harfler; karşılıkları da ikinci ve üçüncü harfler.', ''],
      right: 'Evet. YZ kenarının karşılığı NP.',
    });
    const x2 = renkli(c, svg, 500, 545, [['YZ', EL[1]], ' karşılığı ', ['NP', EL[1]]], { size: 34, kalin: 700 });
    gizle(x2); await par(c.say('Y ile N, Z ile P eşlenir: YZ’nin karşılığı NP.', { speak: 'Y ile N, Z ile P eşlenir: Y Z’nin karşılığı N P.' }), belir(c, x2, 400));
    c.clearSay();

    // Gör: eşleme çizgileri.
    await par(belir(c, [x1, x2], 300, 0), belir(c, [e.g, t], 400, 1));
    x1.remove(); x2.remove();
    const lis = [['A', 'D'], ['B', 'E'], ['C', 'F']].map((cf, i) => renkli(c, svg, 500, 190 + i * 62, [[cf[0], EL[i]], ' ↔ ', [cf[1], EL[i]]], { size: 34, kalin: 700 }));
    gizle(lis); await belir(c, lis, 500);
    await c.say('Eşlik yazarken harfleri karşılıklı sırayla yaz.');
    c.note('<b>Eş üçgenler:</b> ABC ≅ DEF; karşılıklı köşeler aynı sırada yazılır.', 'Eş üçgenler', 'b1-es-ucgen');
  }

  /* ---- 4. Yansıma ve dönme de eş üçgen verir ---- */
  async function donusumEs(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    // Birinci bölüm: yansıma.
    const g1 = c.S('g', {}, svg), P = z.N([[1, 3], [1, 7], [4, 7]]), U = z.P(8, -0.4), V = z.P(8, 11.4), P2 = P.map((q) => yansit(q, U, V));
    const d = dogru(c, g1, U, V, { ad: 'd', adKay: [20, 22] });
    const ab = cokgen(c, g1, P, RENK.sekil, { harf: ['A', 'B', 'C'] }), kl = cokgen(c, g1, P, RENK.goruntu, { harf: ['K', 'L', 'M'] });
    const M1 = agirlik(P), M2 = agirlik(P2);
    const et1 = [B.kenarEtiketi(c, g1, P[0], P[1], '4', RENK.sekil, { merkez: M1 }), B.kenarEtiketi(c, g1, P[1], P[2], '3', RENK.sekil, { merkez: M1 }), B.kenarEtiketi(c, g1, P[0], P[2], '5', RENK.sekil, { merkez: M1 })];
    const et2 = [B.kenarEtiketi(c, g1, P2[0], P2[1], '4', RENK.goruntu, { merkez: M2 }), B.kenarEtiketi(c, g1, P2[1], P2[2], '3', RENK.goruntu, { merkez: M2 }), B.kenarEtiketi(c, g1, P2[0], P2[2], '5', RENK.goruntu, { merkez: M2 })];
    const o1 = dolasma(c, g1, P, RENK.sekil), o2 = dolasma(c, g1, P2, RENK.goruntu);
    const yaz1 = B.eslemeYazisi(c, g1, 500, 34, 'ABC', 'KLM', '≅', { ucgenSimge: false, size: 30 });
    gizle(kl.g, kl.adlar, et1, et2, o1, o2, yaz1);
    // İkinci bölüm: 90° dönme.
    const g2 = c.S('g', {}, svg), A = z.N([[1, 2], [1, 6], [4, 6]]), O = z.P(6, 8), R = A.map((q) => dondur(q, O, 90));
    const ab2 = cokgen(c, g2, A, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const pr = cokgen(c, g2, A, RENK.goruntu, { harf: ['P', 'R', 'T'] });
    const yaylar = A.map((q, i) => izYay(c, g2, O, q, i === 0 ? RENK.merkez : RENK.merkez));
    const mo = merkezOk(c, g2, O, 'O', '90°');
    const MA = agirlik(A), MR = agirlik(R);
    const et3 = [B.kenarEtiketi(c, g2, R[0], R[1], '4', RENK.goruntu, { merkez: MR }), B.kenarEtiketi(c, g2, R[1], R[2], '3', RENK.goruntu, { merkez: MR }), B.kenarEtiketi(c, g2, R[0], R[2], '5', RENK.goruntu, { merkez: MR })];
    gizle(g2, pr.adlar, et3);

    await par(c.say('Usta kalıbı bu kez ters çevirerek basıyor: yansıma.'), (async () => {
      await belir(c, [kl.g, d.g], 300);
      await c.tween(1600, (x) => kl.koy(araHepsi(P, P2, x)), Ders.ease.inOut);
    })());
    await par(c.say('Görüntü KLM: K, A’nın; L, B’nin; M, C’nin görüntüsü.', { speak: 'Görüntü K L M: K, A’nın; L, B’nin; M, C’nin görüntüsü.' }), belir(c, kl.adlar, 400));
    await par(c.say('Görüntü ters çevrilmiş, ama kenarları yine 4, 3 ve 5.', { speak: 'Görüntü ters çevrilmiş, ama kenarları yine dört, üç ve beş.' }), belir(c, [...et1, ...et2, o1, o2], 500));
    await par(c.say('Açıları da aynı; ABC ≅ KLM.', { speak: 'Açıları da aynı; A B C eştir K L M.' }), belir(c, yaz1, 450));
    // Dönme bölümüne geç.
    await belir(c, g1, 350, 0);
    await belir(c, g2, 350);
    await par(c.say('Şimdi kalıbı O çevresinde 90° döndürüp basıyor.', { speak: 'Şimdi kalıbı O çevresinde doksan derece döndürüp basıyor.' }), (async () => {
      await c.tween(1900, (x) => { pr.koy(A.map((q) => dondur(q, O, 90 * x))); yaylar.forEach((y) => y.ciz(90 * x)); }, Ders.ease.inOut);
    })());
    await par(c.say('Görüntü PRT baktığı yönü değiştirdi; kenarları 4, 3 ve 5.', { speak: 'Görüntü P R T baktığı yönü değiştirdi; kenarları dört, üç ve beş.' }), belir(c, [...pr.adlar, ...et3], 450));
    await c.say('Eşlikte üçgenin nereye baktığı önemsiz.', { speak: '[thoughtful] Eşlikte üçgenin nereye baktığı önemsiz.' });
    c.clearSay();

    // Sıra sende (yanılgı): yansımadaki çifte dön.
    await belir(c, g2, 350, 0); await belir(c, g1, 350);
    await c.choice({
      tag: 'Sıra sende', q: 'KLM, ABC’nin ters çevrilmiş görüntüsü. İki üçgen için hangisi doğrudur?',
      options: ['Eş değildirler; ters durduğu için üst üste oturmaz', 'Yalnızca ötelenmiş olsaydı eş olurlardı', 'Eştirler; ters çevrilmesi eşliği bozmaz'], answer: 2,
      hints: ['Yansımada görüntü şekle eştir; kâğıdı katlayınca oturur.', 'Kenarlara ve açılara bak: hepsi aynı.', ''],
      right: 'Evet. Kenarlar ve açılar aynı; ters durmak eşliği bozmaz.',
    });
    await c.say('Ters çevrilmiş üçgen de eştir.');
    c.clearSay();

    // Birlikte çöz: PRT için tablo.
    await belir(c, g1, 350, 0); await belir(c, g2, 350);
    const rows = [['AB 4', 'PR 4'], ['AC 5', 'PT 5'], ['BC 3', 'RT ?']];
    const tr = rows.map((r, i) => satir(c, svg, i, [[r[0], RENK.sekil], BOSLUK, [r[1], RENK.goruntu]]));
    gizle(tr); await belir(c, tr, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ≅ PRT. RT kaç birimdir?', options: ['5 birim', '3 birim', '4 birim'], answer: 1,
      hints: ['Dönme kenarı uzatmaz.', '', 'BC’nin karşılığı RT; B ile R, C ile T eşleniyor.'],
      right: 'Evet. BC 3 birimdi; karşılığı RT de 3 birim.',
    });
    parcaKoy(c, tr[2], [['BC 3', RENK.sekil], BOSLUK, ['RT 3', RENK.iyi]]);
    await c.wait(600);
    c.clearSay();

    // Gör: PRT ABC'nin üstüne döner.
    await belir(c, [...pr.adlar, ...et3], 300, 0);
    await c.tween(1700, (x) => { pr.koy(A.map((q) => dondur(q, O, 90 * (1 - x)))); yaylar.forEach((y) => y.ciz(90 * (1 - x))); }, Ders.ease.inOut);
    await c.say('Öteleme, yansıma ve dönme: üçünde de görüntü eş üçgendir.');
    c.note('<b>Dönüşümle çıkan üçgen</b> eştir; nereye baktığı önemsiz.', 'Dönüşüm ve eşlik', 'b1-donusum-es');
  }

  /* ---- 5. Eş üçgende karşılıklı elemanlar ---- */
  async function karsilikli(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const P = z.N([[1, 3], [1, 7], [4, 7]]), Q = z.N([[8, 4], [12, 4], [12, 7]]), M = agirlik(P), Mq = agirlik(Q);
    const e = B.esleme(c, svg, P, Q, { harf1: ['K', 'L', 'M'], harf2: ['P', 'R', 'T'], dik: 1 });
    const t = B.eslemeYazisi(c, svg, 500, 36, 'KLM', 'PRT', '≅', { ucgenSimge: false, size: 30 });
    const ep = [B.kenarEtiketi(c, svg, P[0], P[1], '4', EL[2], { merkez: M }), B.kenarEtiketi(c, svg, P[1], P[2], '3', EL[0], { merkez: M }), B.kenarEtiketi(c, svg, P[0], P[2], '5', EL[1], { merkez: M })];
    const rt = B.kenarEtiketi(c, svg, Q[1], Q[2], '3', EL[0], { merkez: Mq });
    const a1 = yazi(c, svg, P[0][0] + 34, P[0][1] + 112, '37°', { size: 22, kalin: 700, renk: EL[0] });
    const a2 = yazi(c, svg, Q[0][0] + 76, Q[0][1] + 33, '37°', { size: 22, kalin: 700, renk: EL[0] });
    const a3 = yazi(c, svg, Q[2][0] - 35, Q[2][1] - 62, '?', { size: 26, kalin: 700, renk: EL[2] });
    gizle(e.g, e.yaylar, e.kenarlar, t, ep, rt, a1, a2, a3);

    await par(c.say('Eş iki üçgen verildiğinde karşılıklı elemanlar yazıdan okunur.'), belir(c, [e.g, t], 450));
    await par(c.say('KLM ≅ PRT: K–P, L–R ve M–T karşılıklı köşelerdir.', { speak: 'K L M eştir P R T: K P, L R ve M T karşılıklı köşelerdir.' }), belir(c, [...e.yaylar], 600));
    await par(c.say('Karşılıklı köşeler arasındaki kenarlar da karşılıklıdır: KL ile PR gibi.', { speak: 'Karşılıklı köşeler arasındaki kenarlar da karşılıklıdır: K L ile P R gibi.' }), (async () => {
      await belir(c, e.kenarlar, 600); await vurgula(c, e.kenarCift[2]);
    })());
    await c.say('Üçgen çevrilmiş olsa da doğru eşlemeyi yazı verir.');
    await par(c.say('KLM’de |LM| = 3 birim; karşılığı RT de 3 birimdir.', { speak: 'K L M’de L M uzunluğu üç birim; karşılığı R T de üç birimdir.' }), (async () => {
      await belir(c, ep, 400); await belir(c, rt, 400); await vurgula(c, e.kenarCift[0]);
    })());
    await par(c.say('K açısı yaklaşık 37°; karşılığı P açısı da yaklaşık 37°.', { speak: 'K açısı yaklaşık otuz yedi derece; karşılığı P açısı da yaklaşık otuz yedi derece.' }), belir(c, [a1, a2], 450));
    c.clearSay();

    // Birlikte çöz: |PT|.
    await belir(c, [rt, a1, a2], 300, 0);
    const tab = [['KL 4', 'PR 4', EL[2]], ['LM 3', 'RT 3', EL[0]], ['KM 5', 'PT ?', EL[1]]];
    const tr = tab.map((r, i) => satir(c, svg, i, [[r[0], r[2]], BOSLUK, [r[1], r[2]]]));
    gizle(tr); await belir(c, tr, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: '|PT| kaç birimdir?', options: ['3 birim', '4 birim', '5 birim'], answer: 2,
      hints: ['Karşılıklı kenarlar eşit; KM en uzun kenardı.', 'K–M kenarının karşılığı P–T.', ''],
      right: 'Evet. KM 5 birimdi; karşılığı PT de 5 birim.',
    });
    parcaKoy(c, tr[2], [['KM 5', EL[1]], BOSLUK, ['PT 5', RENK.iyi]]);
    await c.wait(600);
    c.clearSay();

    // Sıra sende: T açısı.
    await belir(c, tr, 300, 0); await belir(c, ep, 300, 0);
    tr.forEach((x) => x.remove());
    const ka = yazi(c, svg, P[0][0] + 34, P[0][1] + 112, '37°', { size: 22, kalin: 700, renk: EL[0] });
    gizle(ka); await par(belir(c, [ka, a3], 400), belir(c, a1, 10, 0));
    await c.choice({
      tag: 'Sıra sende', q: 'KLM’de K açısı yaklaşık 37°, L açısı 90°. T açısı kaç derecedir?', options: ['37°', '90°', '53°'], answer: 2,
      hints: ['T açısı M açısına eşittir.', 'T, M’nin karşılığı; önce M açısını bul: 180° − 90° − 37°.', ''],
      right: 'Evet. M açısı 53°; karşılığı T de 53°.',
    });
    cevapla(a3, '53°');
    await c.say('T açısı, M açısına eşit: 53°.', { speak: 'T açısı, M açısına eşit: elli üç derece.' });
    await c.say('Eş üçgenlerde bir elemanın karşılığı hep yazıdan bulunur.');
  }

  /* ---- 6. Panodaki eş üçgenler ---- */
  async function pano(c) {
    const svg = c.svg(1000, 562), u = 36;
    const taban = (x, y) => [[x, y], [x, y + 4 * u], [x + 3 * u, y + 4 * u]];
    const K0 = taban(90, 200);
    const O1 = taban(600, 25);
    const Y0 = taban(600, 215), Y1 = Y0.map((q) => yansit(q, [654, 0], [654, 562]));
    const D0 = taban(600, 376), mD = agirlik(D0), D1 = D0.map((q) => dondur(q, mD, 90));
    const ucgen = (P, renk) => {
      const g = c.S('g', {}, svg), M = agirlik(P), t = cokgen(c, g, P, renk), et = [];
      [[0, 1, '4'], [1, 2, '3'], [0, 2, '5']].forEach(([i, j, m]) => et.push(B.kenarEtiketi(c, g, P[i], P[j], m, renk, { merkez: M })));
      return { g, yuz: t.yuz, et };
    };
    const kalip = ucgen(K0, RENK.sekil).g;
    const goruntuler = [O1, Y1, D1];
    const turuncu = goruntuler.map((P) => ucgen(P, RENK.goruntu));
    const bag = c.S('g', {}, svg), mk = [206, 296];
    goruntuler.forEach((P) => {
      const M = agirlik(P), son = [Math.min(...P.map((q) => q[0])) - 60, M[1]];
      cizgi(c, bag, mk, son, RENK.cizgi, 2, { 'stroke-opacity': 0.6 });
      yazi(c, bag, (mk[0] + son[0]) / 2, (mk[1] + son[1]) / 2 - 14, '≅', { size: 44, kalin: 700 });
    });
    gizle(kalip, turuncu.map((x) => x.g), bag);

    await par(c.say('Çini panosundaki bütün üçgenler tek bir kalıptan çıkıyor.'), belir(c, kalip, 450));
    await par(c.say('Kalıp ötelenir, yansıtılır ya da döndürülür.'), (async () => {
      for (const x of turuncu) { await belir(c, x.g, 450); await c.wait(250); }
    })());
    await par(c.say('Her basılan üçgen kalıba eştir.'), belir(c, bag, 500));
    await par(c.say('Hepsi kalıba eş olduğundan, birbirlerine de eştir.'), (async () => {
      const gs = turuncu.map((x) => x.g);
      await belir(c, gs, 350, 0.25);
      turuncu.forEach((x) => { x.yuz.setAttribute('fill', RENK.sekil); x.yuz.setAttribute('stroke', RENK.sekil); x.et.forEach((t) => { t.style.fill = RENK.sekil; }); });
      await belir(c, gs, 350, 1);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Panodaki bir üçgenin kenarları 4, 3 ve 5 birim. Aynı kalıpla basılmış başka bir üçgenin en uzun kenarı kaç birimdir?',
      options: ['12 birim', '5 birim', '4 birim'], answer: 1,
      hints: ['12 çevreydi; en uzun kenar değil.', '', 'Her üçgen kalıba eş; kenarları aynı.'],
      right: 'Evet. Kenarlar aynı kalır; en uzun kenar 5 birim.',
    });
    await c.say('Kalıp ne kadar çok basılsa da en uzun kenar 5 birim.', { speak: 'Kalıp ne kadar çok basılsa da en uzun kenar beş birim.' });
    await c.say('Eş şekiller süslemelerde bu yolla üretilir.');
    c.note('<b>Eş üçgenler:</b> aynı kalıptan çıkar; üst üste oturur.', 'Eş üçgenler', 'b1-es-kalip');
  }

  /* ---- 7. Art arda dönüşümler ---- */
  async function artArda(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const A = z.P(5, 1), Bp = z.P(1, 8), C = z.P(5, 8);
    const T = [A, Bp, C], T1 = T.map((q) => dondur(q, C, 90)), v = [0, -3 * z.b], T2 = T1.map((q) => otele(q, v));
    const Pn = T2[0], Dn = T2[2];                    // A'nın görüntüsü P, C'nin görüntüsü D; B'nin görüntüsü A noktasına gelir
    const M = agirlik(T);
    const ab = cokgen(c, svg, T, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const dik = aciYayi(c, svg, C, A, Bp, RENK.sekil, 28, { dik: true });
    const e4 = B.kenarEtiketi(c, svg, Bp, C, '4', RENK.sekil, { merkez: M }), e7 = B.kenarEtiketi(c, svg, A, C, '7', RENK.sekil, { merkez: [A[0] + 150, M[1]] });
    const md = nokta(c, svg, C, RENK.merkez, 8);
    const gor = cokgen(c, svg, T, RENK.goruntu);
    const hayalet = cokgen(c, svg, T1, RENK.goruntu, { dolgu: 0.08, w: 2 });
    const oku = c.S('g', {}, svg), ou = z.P(12, 8), ob = z.P(12, 5);
    ok(c, oku, ou, [ob[0], ob[1] + 10]); yazi(c, oku, ou[0] + 22, (ou[1] + ob[1]) / 2 + 8, '3', { size: 26, kalin: 700, renk: RENK.ok });
    const harfP = yazi(c, svg, Pn[0] + 24, Pn[1] + 8, 'P', { size: 24, kalin: 700, renk: RENK.goruntu });
    const harfD = yazi(c, svg, Dn[0] + 20, Dn[1] + 30, 'D', { size: 24, kalin: 700, renk: RENK.goruntu });
    gizle(ab.g, dik, e4, e7, md, gor.g, hayalet.g, oku, harfP, harfD);

    await par(c.say('ABC dik üçgeninde C’de dik açı var; BC 4, AC 7 birim.', { speak: 'A B C dik üçgeninde C’de dik açı var; B C dört, A C yedi birim.' }), belir(c, [ab.g, dik, e4, e7], 500));
    await par(c.say('Üçgen önce C çevresinde saat yönünde 90° dönüyor.', { speak: 'Üçgen önce C çevresinde saat yönünde doksan derece dönüyor.' }), (async () => {
      await belir(c, [md, gor.g], 300);
      await c.tween(1800, (x) => gor.koy(T.map((q) => dondur(q, C, 90 * x))), Ders.ease.inOut);
      await belir(c, hayalet.g, 300, 0.45);
    })());
    await par(c.say('Sonra 3 birim yukarı kayıyor.', { speak: 'Sonra üç birim yukarı kayıyor.' }), (async () => {
      await belir(c, oku, 350);
      await c.tween(1500, (x) => gor.koy(araHepsi(T1, T2, x)), Ders.ease.inOut);
    })());
    await par(c.say('Son konumda B, A noktasına; A, P noktasına; C, D noktasına geliyor.', { speak: 'Son konumda B, A noktasına; A, P noktasına; C, D noktasına geliyor.' }), belir(c, [harfP, harfD], 450));
    await belir(c, [oku, hayalet.g, md, e4, e7], 350, 0);
    const es = B.eslemeYazisi(c, svg, 500, 36, 'ABC', 'PAD', '≅', { ucgenSimge: false, size: 30 });
    gizle(es);
    await par(c.say('Dönme ve öteleme eş üçgen verir: ABC ≅ PAD.', { speak: 'Dönme ve öteleme eş üçgen verir: A B C eştir P A D.' }), belir(c, es, 450));

    // AB = AP.
    const kp = cizgi(c, svg, Bp, Pn, RENK.cizgi, 2.5, { 'stroke-dasharray': '6 6', 'stroke-opacity': 0.8 });
    const t1 = B.esitCentik(c, svg, A, Bp, 1, EL[2], { w: 4 }), t2 = B.esitCentik(c, svg, A, Pn, 1, EL[2], { w: 4 });
    const eq = renkli(c, svg, TX, 150, [['|AB| = |AP|', EL[2]]], { hiza: 'start', size: 28, kalin: 700 });
    gizle(kp, t1, t2, eq);
    await par(c.say('Karşılıklı kenarlar eşit: AB, PA’nın karşılığı olduğundan |AB| = |AP|.', { speak: 'Karşılıklı kenarlar eşit: A B, P A’nın karşılığı olduğundan A B uzunluğu, A P uzunluğuna eşit.' }), belir(c, [kp, t1, t2, eq], 600));

    // a ve b.
    await belir(c, [es], 300, 0.35);
    const arc = (V, X, Y, r, ad, d) => {
      const g = c.S('g', {}, svg), m = aciIci(V, X, Y, r + d);
      aciYayi(c, g, V, X, Y, RENK.merkez, r);
      yazi(c, g, m[0], m[1] + 8, ad, { size: 24, kalin: 700, renk: RENK.merkez });
      return g;
    };
    const aA = arc(A, Bp, C, 36, 'a', 22), bB = arc(Bp, A, C, 36, 'b', 30);
    const bA = arc(A, C, Pn, 36, 'b', 22), aP = arc(Pn, A, Dn, 36, 'a', 24);
    gizle(aA, bB, bA, aP);
    await par(c.say('a ve b, ABC’nin dar açılarıdır; a + b = 90°.', { speak: 'a ve b, A B C’nin dar açılarıdır; a artı b eşittir doksan derece.' }), belir(c, [aA, bB], 500));
    await c.say('PAD’da da aynı iki açı var.', { speak: 'P A D’da da aynı iki açı var.' });
    await par(c.say('DAP açısı b, APD açısı a.', { speak: 'D A P açısı b, A P D açısı a.' }), belir(c, [bA, aP], 500));
    await par(c.say('A’da BAC ile DAP yan yana.', { speak: 'A’da B A C ile D A P yan yana.' }), c.wait(400));
    await belir(c, [eq, kp], 300, 0);
    const dikA = aciYayi(c, svg, A, Bp, Pn, RENK.merkez, 60, { dik: true }), m90 = [A[0] + 40, A[1] + 90];
    const t90 = yazi(c, svg, m90[0], m90[1] + 8, '90°', { size: 24, kalin: 700, renk: RENK.merkez });
    gizle(dikA, t90);
    await par(c.say('BAP = a + b = 90°.', { speak: 'B A P açısı, a artı b, doksan derece.' }), belir(c, [dikA, t90], 500));
    c.clearSay();

    // Birlikte çöz: ikizkenar ABP.
    await belir(c, [aA, bB, bA, aP, es], 300, 0);
    const abp = cizgi(c, svg, Bp, Pn, RENK.cizgi, 3);
    const sor = yazi(c, svg, Pn[0] - 84, Pn[1] - 10, '?', { size: 26, kalin: 700, renk: RENK.iyi });
    const yayP = aciYayi(c, svg, Pn, Bp, A, RENK.merkez, 56);
    gizle(abp, sor, yayP); await belir(c, [abp, sor, kp, yayP], 450, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABP üçgeninde |AB| = |AP| ve m(BAP) = 90°. İkizkenar üçgenin taban açıları eşittir. m(BPA) kaç derecedir?',
      options: ['90°', '60°', '45°'], answer: 2,
      hints: ['Üç açının toplamı 180°; tepe açısı 90° olduğundan taban açılarına 90° kalır.', 'İki taban açısı eşit: 90° ÷ 2.', ''],
      right: 'Evet. Taban açılarının toplamı 90°; her biri 45°.',
    });
    cevapla(sor, '45°');
    await c.say('Taban açılarının toplamı 90°; her biri 45°.', { speak: 'Taban açılarının toplamı doksan derece; her biri kırk beş derece.' });
    c.clearSay();
    await c.say('Dönüşümler art arda uygulansa da görüntü eş üçgen kalır.');
    await c.say('Eşlik, uzunluğu ve açıyı yeni durumlara taşır.', { speak: '[thoughtful] Eşlik, uzunluğu ve açıyı yeni durumlara taşır.' });
    c.clearSay();

    // Dene: eş mi, değil mi?
    z.g.remove();
    [ab.g, dik, e4, e7, md, gor.g, hayalet.g, oku, harfP, harfD, es, kp, t1, t2, eq, aA, bB, bA, aP, dikA, t90, abp, sor, yayP].forEach((x) => x.remove());
    await dene(c, svg);
  }

  /* Dene: iki kutu (Eş, Eş değil) ve beş kart; kart başına seçim, kart yerine oturur. */
  async function dene(c, svg) {
    const u = 28;
    const kutu = (x, ad) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x, y: 388, width: 410, height: 150, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      yazi(c, g, x + 18, 422, ad, { hiza: 'start', size: 24, kalin: 700 });
      return g;
    };
    const kEs = kutu(60, 'Eş'), kDegil = kutu(530, 'Eş değil');
    gizle(kEs, kDegil); await belir(c, [kEs, kDegil], 400);
    const T0 = (x, y) => [[x, y], [x, y + 4 * u], [x + 3 * u, y + 4 * u]];
    const kartlar = [
      { es: true, yazi: 'Bir üçgen ve 6 birim sağa ötelenmişi',
        kur: (g) => {
          const P = T0(374, 130), Q = P.map((q) => otele(q, [6 * u, 0]));
          cokgen(c, g, P, RENK.sekil); const k = cokgen(c, g, Q, RENK.goruntu);
          return { gor: () => c.tween(1500, (x) => k.koy(araHepsi(Q, P, x)), Ders.ease.inOut), et: [] };
        } },
      { es: true, yazi: 'Bir üçgen ve bir doğruya göre yansımışı',
        kur: (g) => {
          const P = T0(350, 130), U = [500, 110], V = [500, 262], Q = P.map((q) => yansit(q, U, V));
          dogru(c, g, U, V); cokgen(c, g, P, RENK.sekil); const k = cokgen(c, g, Q, RENK.goruntu);
          return { gor: () => c.tween(1500, (x) => k.koy(araHepsi(Q, P, x)), Ders.ease.inOut), et: [] };
        } },
      { es: true, yazi: 'Bir üçgen ve 90° döndürülmüşü',
        kur: (g) => {
          const P = T0(330, 130), O = [520, 300];
          cokgen(c, g, P, RENK.sekil); const k = cokgen(c, g, P.map((q) => dondur(q, O, 90)), RENK.goruntu); nokta(c, g, O, RENK.merkez, 8);
          return { gor: () => c.tween(1500, (x) => k.koy(P.map((q) => dondur(q, O, 90 * (1 - x)))), Ders.ease.inOut), et: [] };
        } },
      { es: false, yazi: 'Kenarları 3, 4, 5 ve 6, 8, 10 olan üçgenler', geri: 'Karşılıklı kenarlar eşit değil: 3 ile 6, 4 ile 8.',
        kur: (g) => {
          const P = B.ucgenKur('KKK', [4, 3, 5], [330, 202], { olcek: 22, aci: 90 }), Q = B.ucgenKur('KKK', [8, 6, 10], [500, 114], { olcek: 22, aci: 90 });
          cokgen(c, g, P, RENK.sekil); cokgen(c, g, Q, RENK.goruntu);
          const MP = agirlik(P), MQ = agirlik(Q), et = [];
          [[0, 1, '4'], [1, 2, '3'], [0, 2, '5']].forEach(([i, j, m]) => et.push(B.kenarEtiketi(c, g, P[i], P[j], m, RENK.sekil, { merkez: MP, size: 22 })));
          [[0, 1, '8'], [1, 2, '6'], [0, 2, '10']].forEach(([i, j, m]) => et.push(B.kenarEtiketi(c, g, Q[i], Q[j], m, RENK.goruntu, { merkez: MQ, size: 22 })));
          return { gor: null, et };
        } },
      { es: false, yazi: 'Kenarları 3, 4, 5 ve 3, 4, 6 olan üçgenler', geri: '5 ile 6 eşit değil; bir kenar bile farklıysa üçgenler eş değildir.',
        kur: (g) => {
          const P = B.ucgenKur('KKK', [4, 3, 5], [330, 120], { olcek: 30, aci: 90 }), Q = B.ucgenKur('KKK', [4, 3, 6], [560, 120], { olcek: 30, aci: 90 });
          cokgen(c, g, P, RENK.sekil); cokgen(c, g, Q, RENK.goruntu);
          const MP = agirlik(P), MQ = agirlik(Q), et = [];
          [[0, 1, '4'], [1, 2, '3'], [0, 2, '5']].forEach(([i, j, m]) => et.push(B.kenarEtiketi(c, g, P[i], P[j], m, RENK.sekil, { merkez: MP, size: 22 })));
          [[0, 1, '4'], [1, 2, '3'], [0, 2, '6']].forEach(([i, j, m]) => et.push(B.kenarEtiketi(c, g, Q[i], Q[j], m, RENK.goruntu, { merkez: MQ, size: 22 })));
          return { gor: null, et };
        } },
    ];
    await c.say('Her kartı Eş ya da Eş değil kutusuna seç.', { noWait: true });
    const yerEs = [130, 265, 400], yerDegil = [650, 800];
    let nEs = 0, nDegil = 0;
    for (const k of kartlar) {
      const g = c.S('g', {}, svg), o = k.kur(g);
      const cap = yazi(c, g, 500, 352, k.yazi, { size: 26, kalin: 600 });
      gizle(g); await belir(c, g, 400);
      await c.choice({
        tag: 'Sıra sende', q: 'Kart hangi kutuya girer?', options: ['Eş', 'Eş değil'], answer: k.es ? 0 : 1,
        hints: k.es ? ['', 'Üst üste oturuyor; dönüşümle çıkan üçgen kalıba eştir.'] : [k.geri, ''],
        right: k.es ? 'Evet. Üst üste oturur: eş.' : 'Evet. ' + k.geri,
      });
      if (o.gor) await o.gor();
      await c.wait(500);
      await belir(c, [cap, ...o.et], 300, 0);
      cap.remove(); o.et.forEach((x) => x.remove());
      const bb = g.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, s = 0.4;
      const hedef = k.es ? [yerEs[nEs++], 478] : [yerDegil[nDegil++], 478];
      await c.tween(700, (x) => {
        const m = 1 + (s - 1) * x;
        g.setAttribute('transform', `translate(${x * (hedef[0] - s * cx)},${x * (hedef[1] - s * cy)}) scale(${m})`);
      }, Ders.ease.inOut);
    }
    c.clearSay();
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b1', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Eş üçgenler: dönüşümle çakışan üçgenler', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Eş üçgenler: dönüşümle çakışan üçgenler',
      hook: 'Bir çini panodaki üçgenlerin hepsi <b>aynı kalıptan</b> mı çıkmıştır?',
      button: 'Derse başla ›',
    },
    goals: ['Karşılıklı kenarları ve açıları eşit olan üçgenleri eş üçgen olarak tanır.', 'Eşliği ≅ simgesiyle, köşeleri karşılıklı sırayla yazar ve karşılıklı elemanları yazıdan okur.', 'Öteleme, yansıma ve dönmeyle çıkan üçgenin kalıba eş olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Dönüşümlerde görüntü şekle eştir.', run: hatirla },
      { title: 'Kalıptan çıkan üçgen', goal: 'Kalıp ötelenince kenarlar ve açılar aynı kalır.', run: kalip },
      { title: 'Köşe sırası ve ≅', goal: 'Eşlik yazılırken karşılıklı köşeler aynı sırada durur.', run: koseSirasi },
      { title: 'Yansıma ve dönme de eş üçgen verir', goal: 'Ters çevrilmiş ya da dönmüş üçgen de eştir.', run: donusumEs },
      { title: 'Eş üçgende karşılıklı elemanlar', goal: 'Karşılıklı kenar ve açıyı eşlik yazısından bul.', run: karsilikli },
      { title: 'Panodaki eş üçgenler', goal: 'Aynı kalıptan çıkan üçgenlerin hepsi birbirine eştir.', run: pano },
      { title: 'Art arda dönüşümler', goal: 'Dönme ve ötelemeden sonra da görüntü eştir.', run: artArda },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgen yansıtıldı; görüntüsü ters çevrilmiş duruyor. Üçgen ile görüntüsü için hangisi doğrudur?',
        options: ['Eş değildirler; ters durduğu için üst üste oturmaz', 'Eştirler; nereye baktığı eşliği bozmaz', 'Dönmüş olsaydı eş olurlardı'], answer: 1,
        why: ['Yansımada kenarlar ve açılar korunur; kâğıdı katlayınca görüntü üçgenin üstüne oturur.', 'Kenarlar ve açılar aynı kaldığı için ters çevrilme eşliği bozmaz.', 'Yansımada da görüntü şekle eştir; eş olmak için dönmüş olması gerekmez.'],
        scene: 3,
      },
      {
        q: 'DEF ≅ KLM, |DE| = 6 cm ve |EF| = 8 cm. |LM| kaç cm’dir?',
        options: ['6 cm', 'Bilinemez', '8 cm'], answer: 2,
        why: ['6 cm, DE’nin karşılığı olan KL kenarıdır; LM değil.', 'Eşlik yazısı karşılıklı kenarları verir; E ile L, F ile M eşlenir.', 'EF’nin karşılığı LM’dir; karşılıklı kenarlar eşit olduğundan |LM| = 8 cm.'],
        scene: 2,
      },
      {
        q: 'ABC ≅ XYZ, m(A) = 50° ve m(B) = 60°. m(Z) kaç derecedir?',
        options: ['50°', '70°', '60°'], answer: 1,
        why: ['50°, A açısının ölçüsüdür; karşılığı X açısıdır.', 'Z, C’nin karşılığıdır; m(C) = 180° − 50° − 60° = 70°.', '60°, B açısının ölçüsüdür; karşılığı Y açısıdır.'],
        scene: 4,
      },
      {
        q: 'Bir üçgen önce bir doğruya göre yansıtıldı, sonra 90° döndürüldü. Son görüntü ile ilk üçgen için hangisi doğrudur?',
        options: ['Eştirler', 'Eş değildirler; iki dönüşüm uygulandı', 'Yalnızca kenarları eşittir, açıları farklıdır'], answer: 0,
        why: ['Yansıma da dönme de kenarları ve açıları korur; üçgen iki dönüşümden sonra da eş kalır.', 'Dönüşümlerin sayısı eşliği bozmaz; her biri ölçüleri korur.', 'Dönüşümler açıları da korur; kenarlar ve açılar birlikte aynı kalır.'],
        scene: 6,
      },
      {
        q: 'Bir pano kalıbının kenarları 5, 12 ve 13 cm. Kalıp ötelendi, sonra döndürüldü. Son üçgenin çevresi kaç cm’dir?',
        options: ['60 cm', '13 cm', '30 cm'], answer: 2,
        why: ['60 cm, çevrenin iki katıdır; kenarlar uzamaz.', '13 cm yalnızca en uzun kenardır; çevre üç kenarın toplamıdır.', 'Son üçgen kalıba eştir: 5 + 12 + 13 = 30 cm.'],
        scene: 5,
      },
    ],
    summary: [
      'Dönüşümle çıkan üçgen kalıba <b>eştir</b>.',
      'Eşlik yazılırken karşılıklı köşeler aynı sırada durur.',
      '<b>Eş üçgen, dönüşümle üst üste oturur.</b>',
      'Üçgenin nereye baktığı eşliği bozmaz.',
    ],
    nextLesson: { href: 'b2-eslik-kosullari.html', label: 'Sonraki: Eşlik için en az ne gerekir? ›' },
  });
})();
