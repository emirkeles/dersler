/* E3 — Kısa yol ve çıkmaz yol
   Aynı problem iki yoldan çözülür (Öklid, benzerlik), yollar adım sayısıyla karşılaştırılır; sonuca varmayan denemede tıkanılan yer ve eksik bilgi söylenir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/E-problemler.md (E3)
   Sıra: hatırla, gözlem kulesi, birinci yol (Öklid), ikinci yol (benzerlik), iki yol yan yana, çıkmaz yol, hangi yol sonuca varır (dene).
   Şekil: A (70, 470), B (310, 470), C (310, 150); 1 m = 40 piksel; H = A + 0,36 (C − A). */
(() => {
  'use strict';
  const { RENK, ara, araHepsi, yazi, cizgi, gizle, belir, par, cevapla, cokgen, aciYayi } = window.KIT;
  const B = window.KIT_B, E = window.KIT_E;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil
  const SAYI = RENK.yazi, ARA = RENK.iyi, ISTEN = RENK.merkez, GRI = RENK.soluk;
  const liste = (x) => [x].flat(Infinity);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };

  /* ---- gözlem kulesi şekli ---- */
  const nA = [70, 470], nB = [310, 470], nC = [310, 150], nH = ara(nA, nC, 0.36);
  const nM = [(nA[0] + nB[0] + nC[0]) / 3, (nA[1] + nB[1] + nC[1]) / 3];
  const nokt = (Ps) => Ps.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
  const deger = (c, p, P, Q, metin, renk, M, size = 28) => B.kenarEtiketi(c, p, P, Q, metin, renk, { merkez: M, size });

  /* Kule (B'den C'ye), C'de platform, merdiven (A'dan C'ye), destek direği BH (sarı), dik açı işaretleri, harfler, 6 ve 8 etiketleri, "?" kutusu. */
  function kule(c, p) {
    const g = c.S('g', {}, p);
    const yuz = c.S('polygon', { points: nokt([nA, nB, nC]), fill: RENK.sekil, 'fill-opacity': 0.2, stroke: 'none' }, g);
    const yer = cizgi(c, g, [40, 470], [470, 470], GRI, 4);
    const kul = cizgi(c, g, nB, nC, RENK.cizgi, 10);
    const plat = cizgi(c, g, nC, [nC[0] + 110, nC[1]], RENK.cizgi, 10);
    const mer = cizgi(c, g, nA, nC, RENK.cizgi, 6);
    const dest = cizgi(c, g, nB, nH, ISTEN, 7);
    const dikB = aciYayi(c, g, nB, nA, nC, RENK.cizgi, 30, { dik: true });
    const dikH = aciYayi(c, g, nH, nB, nC, RENK.cizgi, 26, { dik: true });
    const harf = {
      A: yazi(c, g, 44, 498, 'A', { size: 26, kalin: 700 }), B: yazi(c, g, 338, 498, 'B', { size: 26, kalin: 700 }),
      C: yazi(c, g, 286, 134, 'C', { size: 26, kalin: 700 }), H: yazi(c, g, nH[0] - 28, nH[1] - 12, 'H', { size: 26, kalin: 700 }),
    };
    const e6 = deger(c, g, nA, nB, '6', SAYI, nM), e8 = deger(c, g, nB, nC, '8', SAYI, nM);
    const orta = ara(nB, nH, 0.5), q = E.istenenKutu(c, g, orta[0] + 0.6 * 36, orta[1] - 0.8 * 36, '?', { size: 28 });
    return { g, yuz, yer, kul, plat, mer, dest, dikB, dikH, harf, e6, e8, q };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Dik köşeden hipotenüse inen yükseklik.
    const g1 = c.S('g', {}, svg), T = [[426, 272], [300, 440], [650, 440]], H = [426, 440];
    cokgen(c, g1, T, RENK.sekil, { harf: ['A', 'B', 'C'] });
    cizgi(c, g1, T[0], H, ISTEN, 6);
    aciYayi(c, g1, T[0], T[1], T[2], RENK.cizgi, 34, { dik: true });
    aciYayi(c, g1, H, T[0], T[2], RENK.cizgi, 28, { dik: true });
    yazi(c, g1, H[0] + 4, H[1] + 40, 'H', { size: 24, kalin: 700 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Şekilde dik köşeden hipotenüse inen bir yükseklik var. İpucu hangi aracı gösterir?',
      options: ['Eşlik', 'Öklid', 'Tales'], answer: 1,
      hints: ['Dik köşeden hipotenüse yükseklik varsa Öklid işe yarar; aynı kalıp eşliği gösterir.', '', 'Dik köşeden hipotenüse yükseklik varsa Öklid işe yarar; paralel doğrular Tales’i gösterir.'],
      right: 'Evet. Dik köşeden hipotenüse yükseklik varsa Öklid işe yarar.',
    });
    await c.say('Dik köşeden hipotenüse yükseklik varsa Öklid işe yarar.');
    c.clearSay();
    await sil(c, g1, 350);

    // 3-4-5 dik üçgeni; 3 birimlik dik kenarın hipotenüs üzerindeki parçası.
    const g2 = c.S('g', {}, svg), U = [[456, 272], [330, 440], [680, 440]], F = [456, 440], M = [(U[0][0] + U[1][0] + U[2][0]) / 3, (U[0][1] + U[1][1] + U[2][1]) / 3];
    cokgen(c, g2, U, RENK.sekil, { harf: ['A', 'B', 'C'] });
    cizgi(c, g2, U[0], F, ISTEN, 5, { 'stroke-dasharray': '8 7' });
    aciYayi(c, g2, U[0], U[1], U[2], RENK.cizgi, 34, { dik: true });
    aciYayi(c, g2, F, U[0], U[2], RENK.cizgi, 28, { dik: true });
    yazi(c, g2, F[0] + 30, F[1] + 40, 'H', { size: 24, kalin: 700 });
    deger(c, g2, U[0], U[1], '3', SAYI, M, 30);
    B.kenarEtiketi(c, g2, U[1], U[2], '5', SAYI, { merkez: M, size: 30, uzak: 66 });
    const soru = E.istenenKutu(c, g2, 393, 484, '?', { size: 28 });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Dik üçgende bir dik kenar 3, hipotenüs 5 birim. Bu dik kenarın hipotenüs üzerindeki parçası kaç birimdir?',
      options: ['0,6 birim', '2 birim', '1,8 birim'], answer: 2,
      hints: ['Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 3² = p · 5.', 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 3² = p · 5.', ''],
      right: 'Evet. 3² = p · 5, yani p = 9 ÷ 5 = 1,8.',
    });
    cevapla(soru.yazi, '1,8'); sil(c, soru.kutu, 300);
    await c.say('Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.');
  }

  /* ---- 2. Gözlem kulesi ---- */
  async function kuleSahne(c) {
    const svg = c.svg(1000, 562);
    const k = kule(c, svg);
    gizle(k.g, k.yuz, k.dest, k.dikB, k.dikH, k.harf.H, k.e6, k.e8, k.q.g);
    await par(c.say('Bir gözlem kulesine merdivenle çıkılıyor.'), belir(c, k.g, 600));
    await par(c.say('Merdivenin yere değdiği A, kuleden 6 metre uzakta.', { speak: 'Merdivenin yere değdiği A, kuleden altı metre uzakta.' }), (async () => { await belir(c, k.e6, 500); await E.parla(c, k.e6, 600); })());
    await par(c.say('Kule yerden 8 metre yüksek: |BC| = 8.', { speak: 'Kule yerden sekiz metre yüksek: B C uzunluğu sekiz.' }), (async () => { await belir(c, k.e8, 500); await E.parla(c, k.e8, 600); })());
    await par(c.say('Kule yere dik: B’de dik açı.'), belir(c, k.dikB, 500));
    await par(c.say('Merdivenin altına, B’den merdivene dik bir destek direği giriyor.'), belir(c, [k.dest, k.harf.H], 600));
    await par(c.say('Destek direği merdivene H’de dik açı yapıyor.'), belir(c, k.dikH, 500));
    await par(c.say('İstenen: destek direğinin boyu, yani |BH|.', { speak: 'İstenen: destek direğinin boyu, yani B H uzunluğu.' }), (async () => { await belir(c, k.q.g, 500); await E.parla(c, k.dest, 700); })());
    await par(c.say('ABC dik üçgeninde dik köşeden hipotenüse yükseklik var.', { speak: 'A B C dik üçgeninde dik köşeden hipotenüse yükseklik var.' }), (async () => { await belir(c, k.yuz, 600); await E.parla(c, k.dest, 700); })());
  }

  /* ---- 3. Birinci yol: Öklid ---- */
  async function oklid(c) {
    const svg = c.svg(1000, 562);
    const k = kule(c, svg);
    const bas = yazi(c, svg, 530, 118, 'Birinci yol · Öklid', { hiza: 'start', size: 28, kalin: 700, renk: RENK.sekil }); gizle(bas);
    const tab = E.tablo(c, svg, { x: 530, y: 190, sutunX: [0], size: 24, aralik: 58 });
    const hAH = cizgi(c, k.g, nA, nH, EL[1], 9), hHC = cizgi(c, k.g, nH, nC, ARA, 9); gizle(hAH, hHC);
    let eti = null;
    const yeniEti = async (P, Q, m) => {
      if (eti) { const o = eti; eti = null; sil(c, o, 250); }
      eti = deger(c, k.g, P, Q, m, ARA, nM); eti.style.opacity = 0; await belir(c, eti, 400);
    };
    await par(c.say('Dik köşeden inen yükseklik var: Öklid akla gelir.'), (async () => { await belir(c, bas, 500); await E.parla(c, k.dest, 800); })());
    const r1 = tab.satir(0, [['1. |AC| = ', ['?', ISTEN]]]);
    await par(c.say('Öklid için önce hipotenüsü bilmeliyiz: |AC|.', { speak: 'Öklid için önce hipotenüsü bilmeliyiz: A C uzunluğu.' }), (async () => { await r1.goster(450); await E.parla(c, k.mer, 700); })());
    r1.koy(0, ['1. 36 + 64 = 100']);
    await c.say('Adım 1, Pisagor: 36 + 64 = 100.', { speak: 'Adım bir, Pisagor: otuz altı artı altmış dört eşittir yüz.' });
    r1.koy(0, ['1. 36 + 64 = 100, |AC| = ', ['10', ARA]]);
    await par(c.say('Yani |AC| = 10 metre.', { speak: 'Yani A C uzunluğu on metre.' }), yeniEti(nA, nC, '10'));
    const r2 = tab.satir(1, [['2. |AB|² = |AH| · |AC|']]);
    await par(c.say('Adım 2, Öklid: |AB|² = |AH| · |AC|.', { speak: 'Adım iki, Öklid: A B kare eşittir A H çarpı A C.' }), (async () => { await r2.goster(450); await E.parla(c, [k.yer, k.mer], 800); })());
    r2.koy(0, ['2. 36 = |AH| · 10, |AH| = ', ['3,6', ARA]]);
    hAH.style.opacity = 0;
    await par(c.say('36 = |AH| · 10; yani |AH| = 3,6 metre.', { speak: 'Otuz altı eşittir A H çarpı on; yani A H uzunluğu üç virgül altı metre.' }), (async () => { await belir(c, hAH, 400); await yeniEti(nA, nH, '3,6'); })());
    const r3 = tab.satir(2, [['3. |HC| = 10 − 3,6 = ', ['6,4', ARA]]]);
    await par(c.say('Adım 3: |HC| = 10 − 3,6 = 6,4 metre.', { speak: 'Adım üç: H C uzunluğu eşittir on eksi üç virgül altı eşittir altı virgül dört metre.' }), (async () => { await r3.goster(450); await belir(c, hHC, 400); await yeniEti(nH, nC, '6,4'); })());
    const r4 = tab.satir(3, [['4. |BH|² = |AH| · |HC|']]);
    sil(c, eti, 300); eti = null;
    await par(c.say('Adım 4, Öklid: |BH|² = |AH| · |HC|.', { speak: 'Adım dört, Öklid: B H kare eşittir A H çarpı H C.' }), (async () => { await r4.goster(450); belir(c, [hAH, hHC], 400, 0); await E.parla(c, k.dest, 800); })());
    r4.koy(0, ['4. |BH|² = 3,6 · 6,4 = 23,04']);
    await c.say('|BH|² = 3,6 · 6,4 = 23,04.', { speak: 'B H kare eşittir üç virgül altı çarpı altı virgül dört eşittir yirmi üç virgül sıfır dört.' });
    r4.koy(0, ['4. 4,8 × 4,8 = 23,04, |BH| = ', ['4,8', ARA]]);
    cevapla(k.q.yazi, '4,8'); sil(c, k.q.kutu, 300);
    await c.say('4,8 × 4,8 = 23,04; yani |BH| = 4,8 metre.', { speak: 'Dört virgül sekiz çarpı dört virgül sekiz eşittir yirmi üç virgül sıfır dört; yani B H uzunluğu dört virgül sekiz metre.' });
    const etiket = yazi(c, svg, 530, 440, '4 adım', { hiza: 'start', size: 24, kalin: 600, renk: GRI }); gizle(etiket);
    await par(c.say('Birinci yol dört adımda sonuca vardı.'), belir(c, etiket, 500));
  }

  /* ---- 4. İkinci yol: benzerlik ---- */
  async function benzerlik(c) {
    const svg = c.svg(1000, 562);
    const k = kule(c, svg);
    const bas = yazi(c, svg, 600, 118, 'İkinci yol · benzerlik', { hiza: 'start', size: 28, kalin: 700, renk: RENK.goruntu }); gizle(bas);
    const tab = E.tablo(c, svg, { x: 600, y: 190, sutunX: [0], size: 24, aralik: 58 });
    const e10 = deger(c, k.g, nA, nC, '10', ARA, nM); gizle(e10);
    await par(c.say('Şimdi aynı problemi benzer üçgenle çözelim.'), belir(c, bas, 500));
    const r1 = tab.satir(0, [['1. Pisagor: |AC| = ', ['10', ARA]]]);
    await par(c.say('Adım 1 aynı: Pisagor ile |AC| = 10 metre.', { speak: 'Adım bir aynı: Pisagor ile A C uzunluğu on metre.' }), (async () => { await r1.goster(450); await belir(c, e10, 400); })());

    // ABC ve AHB: aynı duruşta yan yana (AHB, ABC'nin karşısındaki duruşa döndürülür ve çevrilir).
    const SRC = [nA, nH, nB], T2 = [[385, 470], [529, 470], [529, 278]];
    const es = B.esleme(c, svg, [nA, nB, nC], T2, { harf1: ['A', 'B', 'C'], harf2: ['A', 'H', 'B'], dik: 1 });
    es.ilk.yuz.setAttribute('fill', RENK.sekil); es.ilk.yuz.setAttribute('fill-opacity', 0.2);
    es.ikinci.yuz.setAttribute('fill', RENK.goruntu); es.ikinci.yuz.setAttribute('fill-opacity', 0.2);
    gizle(es.g, es.ikinci.g, es.yaylar, es.kenarlar); es.g.style.opacity = 1; gizle(es.ilk.g, es.ilk.adlar, es.ikinci.adlar);
    const kes = cokgen(c, svg, SRC, RENK.goruntu); gizle(kes.g);
    await par(c.say('ABC ve AHB üçgenlerinde A açısı ortak.', { speak: 'A B C ve A H B üçgenlerinde A açısı ortak.' }), (async () => {
      await belir(c, kes.g, 350);
      await E.parla(c, kes.yuz, 600);
      await par(belir(c, k.g, 500, 0), belir(c, [es.ilk.g, ...es.ilk.adlar], 500));
      await c.tween(1000, (e) => kes.koy(araHepsi(SRC, T2, e)), Ders.ease.inOut);
      await par(belir(c, kes.g, 350, 0), belir(c, [es.ikinci.g, ...es.ikinci.adlar], 350));
      kes.g.remove();
      await belir(c, [es.yaylar[0], es.yaylar[3]], 600);
    })());
    const yz = B.eslemeYazisi(c, svg, 440, 96, 'ABC', 'AHB', '~', { ucgenSimge: false, size: 30 }); gizle(yz);
    await par(c.say('Birinde B, ötekinde H dik açı: Açı-Açı, ABC ~ AHB.', { speak: 'Birinde B, ötekinde H dik açı: Açı Açı, A B C, A H B’ye benzerdir.' }), (async () => {
      await belir(c, [es.yaylar[1], es.yaylar[4]], 600);
      await belir(c, [es.yaylar[2], es.yaylar[5]], 600);
      await belir(c, yz, 500);
    })());
    await par(c.say('Karşılıklı kenarlar: BC ile BH, AC ile AB.', { speak: 'Karşılıklı kenarlar: B C ile B H, A C ile A B.' }), (async () => {
      await sil(c, yz, 300);
      await belir(c, [es.kenarlar[0], es.kenarlar[3]], 600);
      await belir(c, [es.kenarlar[1], es.kenarlar[4]], 600);
    })());
    const r2 = tab.satir(1, [['2. |BC| / |BH| = |AC| / |AB|']]);
    await par(c.say('Adım 2, oran: |BC| / |BH| = |AC| / |AB|.', { speak: 'Adım iki, oran: B C bölü B H eşittir A C bölü A B.' }), (async () => {
      await r2.goster(450);
      await E.parla(c, [...es.kenarCift[0], ...es.kenarCift[1]], 800);
    })());
    // Değerler: 8, 10, 6 ve ? (BH).
    const lab = c.S('g', {}, svg), M2 = [(T2[0][0] + T2[1][0] + T2[2][0]) / 3, (T2[0][1] + T2[1][1] + T2[2][1]) / 3];
    deger(c, lab, nB, nC, '8', SAYI, nM); deger(c, lab, nA, nC, '10', ARA, nM); deger(c, lab, T2[0], T2[2], '6', SAYI, M2);
    const q = E.istenenKutu(c, lab, T2[1][0] + 38, (T2[1][1] + T2[2][1]) / 2, '?', { size: 28 });
    gizle(lab); r2.koy(0, ['2. 8 / |BH| = 10 / 6']);
    await par(c.say('8 / |BH| = 10 / 6.', { speak: 'Sekiz bölü B H eşittir on bölü altı.' }), belir(c, lab, 600));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '8 / |BH| = 10 / 6. |BH| kaç metredir?',
      options: ['7,5 m', '4,8 m', '13,3 m'], answer: 1,
      hints: ['İçler dışlar çarpımı: 8 · 6 = 10 · |BH|.', '', 'BH, BC’den kısa olmalı: 8’den küçük.'],
      right: 'Evet. 8 · 6 = 10 · |BH|, yani |BH| = 4,8.',
    });
    const r3 = tab.satir(2, [['3. |BH| = 8 × 6 ÷ 10 = ', ['4,8', ARA]]]);
    cevapla(q.yazi, '4,8'); sil(c, q.kutu, 300);
    await par(c.say('Adım 3: |BH| = 8 × 6 ÷ 10 = 4,8 metre.', { speak: 'Adım üç: B H uzunluğu eşittir sekiz çarpı altı bölü on eşittir dört virgül sekiz metre.' }), r3.goster(450));
    const etiket = yazi(c, svg, 600, 440, '3 adım', { hiza: 'start', size: 24, kalin: 600, renk: GRI }); gizle(etiket);
    await par(c.say('İkinci yol üç adımda sonuca vardı.'), belir(c, etiket, 500));
  }

  /* ---- 5. İki yol yan yana ---- */
  async function yanYana(c) {
    const svg = c.svg(1000, 562);
    const iy = E.ikiYol(c, svg, { x: 60, y: 130, genislik: 880, basliklar: ['Birinci yol · Öklid', 'İkinci yol · benzerlik'], renkler: [RENK.sekil, RENK.goruntu], size: 26, aralik: 50 });
    gizle(iy.g);
    const yildiz = c.S('polygon', {
      points: nokt(Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 7 : 17; return [850 + r * Math.cos(a), 122 + r * Math.sin(a)]; })),
      fill: ISTEN, stroke: 'none',
    }, svg); gizle(yildiz);
    const sonuc = yazi(c, svg, 500, 440, '', { size: 38, kalin: 700, renk: ARA });
    sonuc.textContent = '|BH| = 4,8 m'; gizle(sonuc);
    const doldur = async () => {
      await belir(c, iy.g, 400);
      const sol = [['1. |AC| = ', ['10', ARA]], ['2. |AH| = ', ['3,6', ARA]], ['3. |HC| = ', ['6,4', ARA]], ['4. |BH| = ', ['4,8', ARA]]];
      const sag = [['1. |AC| = ', ['10', ARA]], '2. oran: 8 / |BH| = 10 / 6', ['3. |BH| = ', ['4,8', ARA]]];
      for (let i = 0; i < 4; i++) { await iy.adim(0, sol[i], 380); if (sag[i]) await iy.adim(1, sag[i], 380); }
      await belir(c, sonuc, 600);
    };
    await par(c.say('İki yol da aynı sonucu verdi: 4,8 metre.', { speak: 'İki yol da aynı sonucu verdi: dört virgül sekiz metre.' }), doldur());
    await c.say('Sonuç aynı çıkınca çözümden daha emin oluruz.');
    const t4 = yazi(c, svg, 60, 384, '4 adım', { hiza: 'start', size: 24, kalin: 600, renk: GRI }), t3 = yazi(c, svg, 500, 384, '3 adım', { hiza: 'start', size: 24, kalin: 600, renk: GRI });
    gizle(t4, t3);
    await par(c.say('Benzerlik yolu üç adım, Öklid yolu dört adım.'), belir(c, [t4, t3], 600));
    await par(c.say('Aynı sonuca daha az adımda varan yol kısa yoldur.'), (async () => { await belir(c, yildiz, 500); await E.parla(c, yildiz, 700); })());
    await c.say('Öklid yolu daha uzun, ama işe yaradı.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'İki yolu karşılaştırınca hangi yol “kısa yol” sayılır?',
      options: ['Daha çok formül kullanan', 'Daha uzun hesap yapan', 'Aynı sonuca daha az adımda varan'], answer: 2,
      hints: ['Burada üç adımlı yol hangisiydi?', 'Kısa yol, sonuca daha çabuk ulaşan yoldur.', ''],
      right: 'Evet. Benzerlik yolu üç adımda, Öklid yolu dört adımda vardı.',
    });
    await c.say('Kısa yol seçilir, uzun yol da sonucu denetler.');
  }

  /* ---- 6. Çıkmaz yol ---- */
  async function cikmazYol(c) {
    const svg = c.svg(1000, 562);
    const k = kule(c, svg);
    const bas = yazi(c, svg, 530, 118, 'Çıkmaz yol', { hiza: 'start', size: 28, kalin: 700, renk: GRI }); gizle(bas);
    const tab = E.tablo(c, svg, { x: 530, y: 190, sutunX: [0], size: 24, aralik: 58 });
    k.e8.remove();
    const ab = cokgen(c, k.g, [nA, nH, nB], EL[1]); gizle(ab.g);
    const hAH = cizgi(c, k.g, nA, nH, EL[1], 9); gizle(hAH);
    await par(c.say('Her deneme sonuca varmaz.'), belir(c, bas, 500));
    await par(c.say('Pisagor’u hemen ABH üçgeninde deneyelim.', { speak: 'Pisagor’u hemen A B H üçgeninde deneyelim.' }), belir(c, ab.g, 600));
    const r1 = tab.satir(0, [['|AH|² + |BH|² = 6²']]);
    await par(c.say('|AH|² + |BH|² = 6² yazılır.', { speak: 'A H kare artı B H kare eşittir altı kare yazılır.' }), r1.goster(450));
    const r2 = tab.satir(1, [['bilinmeyen: |AH|, |BH|']]);
    await par(c.say('İki bilinmeyen var: |AH| ve |BH|.', { speak: 'İki bilinmeyen var: A H ve B H.' }), (async () => { await r2.goster(450); await E.parla(c, [k.dest, ab.yuz], 800); })());
    const x1 = E.cikmaz(c, svg, [r1.el, r2.el], [905, 219], { boyut: 28, son: 0.55 });
    await par(c.say('Tek eşitlikten iki sayı bulunmaz: yol tıkandı.'), x1.kapat(800));
    const r3 = tab.satir(2, [['eksik: |AH| ya da |BH|']]);
    await par(c.say('Eksik bilgi: |AH| ya da |BH|’den biri.', { speak: 'Eksik bilgi: A H ya da B H’den biri.' }), r3.goster(450));
    hAH.style.opacity = 0;
    await par(c.say('Birinci yolda |AH| önce bulunmuştu; eksiği o tamamladı.', { speak: 'Birinci yolda A H önce bulunmuştu; eksiği o tamamladı.' }), (async () => { await belir(c, hAH, 400); await E.parla(c, hAH, 700); })());
    const r4 = tab.satir(4, [['Tales']]);
    await par(c.say('Bir deneme daha: Tales.'), (async () => { await belir(c, [ab.g, hAH], 400, 0); await r4.goster(450); })());
    r4.koy(0, ['Tales: paralel doğrular gerekir']);
    await c.say('Tales için paralel doğrular gerekir.');
    r4.koy(0, ['Tales: paralel doğru yok']);
    const x2 = E.cikmaz(c, svg, [r4.el], [905, 422], { boyut: 28, son: 0.55 });
    await par(c.say('Şekilde paralel doğru yok: bu yol da kapalı.'), (async () => { await E.parla(c, [k.kul, k.mer, k.yer], 800); await x2.kapat(800); })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Kule problemini Tales ile çözmek için hangi bilgi eksiktir?',
      options: ['Dik açı', 'Hipotenüsün uzunluğu', 'Paralel doğrular'], answer: 2,
      hints: ['Dik açı şekilde zaten var: B’de ve H’de.', 'Hipotenüs Pisagor’la bulunuyor.', ''],
      right: 'Evet. Tales paralel doğrularla çalışır; şekilde paralel doğru yok.',
    });
    await c.say('Eksik bilgiyi bilmek, bir sonraki denemeyi yönlendirir.');
  }

  /* ---- 7. Hangi yol sonuca varır? (sınıflandırma) ---- */
  async function siniflandir(c) {
    const svg = c.svg(1000, 562);
    const kutular = [{ x: 40, y: 140, ad: 'Sonuca varır', renk: RENK.yazi }, { x: 510, y: 140, ad: 'Sonuca varmaz', renk: GRI }];
    const kg = c.S('g', {}, svg);
    kutular.forEach((b) => {
      c.S('rect', { x: b.x, y: b.y, width: 450, height: 360, rx: 14, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2.5 }, kg);
      yazi(c, kg, b.x + 225, b.y + 50, b.ad, { size: 30, kalin: 700, renk: b.renk });
    });
    gizle(kg);
    /* Çok satırlı yazı: tek <text>, her satır bir tspan. */
    const metin = (p, x, y, satirlar, size, o = {}) => {
      const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'start', 'font-size': size, 'font-weight': 600, style: 'fill:' + (o.renk || SAYI) }, p);
      satirlar.forEach((s, i) => c.S('tspan', { x, dy: i ? size * 1.25 : 0, text: s }, t));
      return t;
    };
    const kartlar = [
      { satir: ['Kuleyi benzerlikle çözmek'], tek: 'Kuleyi benzerlikle çözmek', varir: true, secenek: ['Sonuca varır', 'Sonuca varmaz'], hint: ['', 'Benzerlik yolu üç adımda sonuca vardı.'], son: 'Benzerlik yolu üç adımda sonuca varır.' },
      { satir: ['Kuleyi Öklid ile çözmek'], tek: 'Kuleyi Öklid ile çözmek', varir: true, secenek: ['Sonuca varmaz', 'Sonuca varır'], hint: ['Öklid yolu dört adımda sonuca vardı.', ''], son: 'Öklid yolu dört adımda sonuca varır.' },
      { satir: ['Kuleyi yalnızca ABH’de', 'Pisagor ile çözmek'], tek: 'Kuleyi yalnızca ABH’de Pisagor ile çözmek', varir: false, eksik: 'eksik: |AH|', secenek: ['Sonuca varır', 'Sonuca varmaz'], hint: ['Bilinmeyen iki tane, eşitlik bir tane.', ''], son: 'ABH’de bilinmeyen iki, eşitlik bir: sonuç çıkmaz.', speak: 'A B H’de bilinmeyen iki, eşitlik bir: sonuç çıkmaz.' },
      { satir: ['Kuleyi Tales ile çözmek'], tek: 'Kuleyi Tales ile çözmek', varir: false, eksik: 'eksik: paralel doğru', secenek: ['Sonuca varmaz', 'Sonuca varır'], hint: ['', 'Şekilde paralel doğru var mı?'], son: 'Şekilde paralel doğru yok, Tales kapalı.' },
    ];
    const doluluk = [0, 0], yerY = [[270, 360], [270, 390]];
    await par(c.say('Son olarak denemeleri ayıralım.'), belir(c, kg, 600));
    await c.say('Sonuca varan ve varmayan yolları ayıracağız.');
    for (const kt of kartlar) {
      c.clearSay();
      const kart = c.S('g', {}, svg);
      c.S('rect', { x: 140, y: 56, width: 720, height: 64, rx: 14, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 2.5 }, kart);
      yazi(c, kart, 500, 97, kt.tek, { size: 26, kalin: 700 });
      gizle(kart); await belir(c, kart, 450);
      const dogru = kt.varir ? 0 : 1;
      await c.choice({
        tag: 'Sıra sende', q: '“' + kt.tek + '” hangi kutuya girer?',
        options: kt.secenek, answer: kt.secenek.indexOf(dogru ? 'Sonuca varmaz' : 'Sonuca varır'), hints: kt.hint,
        right: 'Evet. Kart ' + (kt.varir ? 'sonuca varan' : 'sonuca varmayan') + ' kutuya oturdu.',
      });
      const kb = kutular[dogru], yy = yerY[dogru][doluluk[dogru]++];
      await belir(c, kart, 300, 0); kart.remove();
      const it = metin(svg, kb.x + 76, yy, kt.satir, 24); it.style.opacity = 0;
      await par(c.say(kt.son, kt.speak ? { speak: kt.speak } : undefined), (async () => {
        await belir(c, it, 500);
        if (!kt.varir) {
          const ek = yazi(c, svg, kb.x + 76, yy + kt.satir.length * 30 + 4, kt.eksik, { hiza: 'start', size: 22, kalin: 600, renk: ISTEN }); gizle(ek);
          const x = E.cikmaz(c, svg, [it], [kb.x + 36, yy - 6 + (kt.satir.length - 1) * 12], { boyut: 15, son: 0.75 });
          await par(x.kapat(600), belir(c, ek, 500));
        }
      })());
    }
    c.clearSay();
    await c.say('Çıkmaz yol, eksik bilgiyi gösterdiği için boşa gitmez.');
    c.note('<b>Kısa yol az adımda varır; çıkmaz yolda eksik bilgiyi söyle.</b>', 'Yola bak', 'e3-kisa-yol-cikmaz-yol');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-e3', kicker: 'Konu E · Eşlik ve benzerlik problemleri', title: 'Kısa yol ve çıkmaz yol', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Kısa yol ve çıkmaz yol',
      hook: 'Arkadaşın aynı problemi <b>başka yoldan</b> çözdü; hangisi daha kısa, hangi deneme hiç sonuca varmaz?',
      button: 'Derse başla ›',
    },
    goals: ['Aynı problemi iki yoldan çözüp adım sayılarını karşılaştırır.', 'Aynı sonuca daha az adımda varan yolu kısa yol olarak seçer.', 'Sonuca varmayan denemede tıkanılan yeri ve eksik bilgiyi söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Öklid ve dik kenarın parçası.', run: hatirla },
      { title: 'Gözlem kulesi', goal: 'Destek direğinin boyu sorulur.', run: kuleSahne },
      { title: 'Birinci yol: Öklid', goal: 'Aynı problem Öklid ile dört adımda çözülür.', run: oklid },
      { title: 'İkinci yol: benzerlik', goal: 'Aynı problem benzer üçgenlerle üç adımda çözülür.', run: benzerlik },
      { title: 'İki yol yan yana', goal: 'Adım sayısı az olan yol kısa yoldur.', run: yanYana },
      { title: 'Çıkmaz yol', goal: 'Tıkanılan yer ve eksik bilgi bulunur.', run: cikmazYol },
      { title: 'Hangi yol sonuca varır?', goal: 'Dört denemeyi iki kutuya ayır.', run: siniflandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir öğrenci kule problemini Tales ile çözmeyi denedi, şekilde paralel doğru bulamadı ve “Bu deneme boşa gitti” dedi. Hangisi doğrudur?',
        options: ['Boşa gitti: sonuca varmayan deneme hiçbir şey kazandırmaz', 'Boşa gitmedi: tıkanılan yer ve eksik bilgi (paralel doğru) bulundu; sonraki deneme buna göre seçilir', 'Boşa gitmedi: Tales kuleyi de çözer'], answer: 1,
        why: ['Deneme sonuca varmadı ama eksik bilgiyi gösterdi; bu da bir kazanç.', 'Tıkanılan yer ve eksik bilgi bulundu; bir sonraki deneme buna göre seçilir.', 'Tales paralel doğrular ister; kule şeklinde paralel doğru yok, bu yüzden Tales kuleyi çözemez.'],
        scene: 5,
      },
      {
        q: 'ABC üçgeninde D noktası AB üzerinde, E noktası AC üzerinde; DE’nin BC’ye paralel olup olmadığı verilmemiş. Bir öğrenci x’i Tales ile bulmaya çalışıp tıkanıyor. Hangi bilgi eksiktir?',
        options: ['Üçgenin ikizkenar olması', 'Üçgenin dik olması', 'DE doğru parçasının BC’ye paralel olduğu'], answer: 2,
        why: ['İkizkenar olmak Tales’in koşulu değildir.', 'Dik olmak Tales’in koşulu değildir.', 'Tales paralel doğrular ister; paralellik verilmeyince oran kurulamaz.'],
        scene: 5,
      },
      {
        q: 'Gözlem kulesi bu kez başka sayılarla kuruluyor: B’de dik açı var, |AB| = 5 m ve |BC| = 12 m. Destek direği |BH| benzerlik yoluyla bulunacak. Doğru oran hangisidir?',
        options: ['12 / |BH| = 13 / 5', '12 / |BH| = 5 / 13', '5 / |BH| = 12 / 13'], answer: 0,
        why: ['Pisagor ile |AC| = 13. ABC ~ AHB olduğundan |BC| / |BH| = |AC| / |AB| = 13 / 5.', 'Oran ters kurulmuş: |BH| = 31,2 çıkardı, yani BC’den uzun olurdu.', 'AB ile BH karıştırılmış: |BH| yaklaşık 5,4 çıkardı, yani AB’den uzun olurdu.'],
        scene: 3,
      },
      {
        q: 'Bir öğrenci dik kenarları 6 ve 8 olan üçgende yüksekliği hemen |BH|² = |AH| · |HC| ile bulmaya çalışıyor ve tıkanıyor. Neden?',
        options: ['|BH| bilinmiyor', 'Öklid dik üçgende kullanılmaz', '|AH| ve |HC| parçaları bilinmiyor; önce onlar bulunmalı'], answer: 2,
        why: ['|BH| zaten istenendir; tıkanmanın nedeni değil.', 'Öklid tam da dik üçgende, dik köşeden inen yükseklikte kullanılır.', 'Önce Pisagor ile |AC| = 10, sonra Öklid ile |AH| = 3,6 ve |HC| = 6,4 bulunur; ancak sonra |BH| hesaplanır.'],
        scene: 5,
      },
      {
        q: 'İki yolla aynı sonucu bulan öğrenci için hangisi doğrudur?',
        options: ['Biri mutlaka yanlıştır', 'Sonuca daha çok güvenebilir; iki yol birbirini denetledi', 'İki yol aynı sayıda adımdan oluşur'], answer: 1,
        why: ['Sonuçlar aynı çıktıysa ikisi de doğru olabilir.', 'İki farklı yol aynı sonuca vardıysa sonuç denetlenmiş olur.', 'Kulede benzerlik yolu üç, Öklid yolu dört adımdı; adım sayıları aynı olmak zorunda değil.'],
        scene: 4,
      },
    ],
    summary: [
      'Aynı problemin iki çözümü karşılaştırılır; az adımda varan yol <b>kısa yoldur</b>.',
      'Çıkmaz yolda tıkanılan yer ve eksik bilgi söylenir.',
      'Uzun yol da sonucu denetler.',
      '<b>Kısa yolu seç, tıkanınca eksiği söyle.</b>',
    ],
    nextLesson: { href: 'e4-yol-baska-nerede.html', label: 'Sonraki: Bu yol başka nerede işe yarar? ›' },
  });
})();
