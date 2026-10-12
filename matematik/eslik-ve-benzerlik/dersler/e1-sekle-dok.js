/* E1 — Çözmeden önce şekle dök
   Problemde önce verilen ve istenen ayrılır, aralarındaki ilişki bulunur; durum şekle ve matematik diline çevrilir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/E-problemler.md (E1)
   Sıra: hatırla, Hakan'ın tepesi, verilen ve istenen, ilişkiler, şekle dök, stor perde, verilen/istenen/ara değer (dene). */
(() => {
  'use strict';
  const { RENK, ara, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, cevapla, cokgen, aciYayi } = window.KIT;
  const B = window.KIT_B, E = window.KIT_E;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil
  const SAYI = RENK.yazi, ARA = RENK.iyi, ISTEN = RENK.merkez, ISIK = 'var(--c6)';
  const liste = (x) => [x].flat(Infinity);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };

  /* Ölçü çizgisi: P–Q doğru parçasından kay kadar ötede, uçlarında çentik; yazı çizginin ortasında yazi kadar kaymış. */
  function olcu(c, p, P, Q, metin, renk, o = {}) {
    const g = c.S('g', {}, p), k = o.kay || [0, 52], P2 = [P[0] + k[0], P[1] + k[1]], Q2 = [Q[0] + k[0], Q[1] + k[1]], n = yon(P2, Q2) + Math.PI / 2;
    if (o.uzat) { cizgi(c, g, P, P2, renk, 1.5, { 'stroke-opacity': 0.4 }); cizgi(c, g, Q, Q2, renk, 1.5, { 'stroke-opacity': 0.4 }); }
    const hat = cizgi(c, g, P2, Q2, renk, o.w || 2.5);
    [P2, Q2].forEach((X) => cizgi(c, g, ileri(X, n, 7), ileri(X, n, -7), renk, o.w || 2.5));
    const M = ara(P2, Q2, 0.5), y = o.yazi || [0, 28];
    const t = yazi(c, g, M[0] + y[0], M[1] + y[1], metin, { size: o.size || 24, kalin: 700, renk: o.yazirenk || renk, hiza: o.hiza });
    return { g, hat, yazi: t };
  }

  /* ---- Hakan'ın tepesi şeması: ana şekil (b piksel = 100 m) ve büyüteç kutusu. Parçalar h.p içinde adla durur; ac listesi başta görünenlerdir. ---- */
  function hakan(c, p, o) {
    const b = o.b, x0 = o.x0, yz = o.yz, X = (u) => x0 + u * b;
    const Pb = [X(1), yz], Ph = [X(7.75), yz], Pd = [X(14.5), yz], Pa = [X(19.75), yz], Pl = [X(19.77), yz], Pt = [X(7.75), yz - 9 * b];
    const g = c.S('g', {}, p), pp = {};
    const dalga = (S, Tt, faz) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return ileri(ara(S, Tt, t), yon(S, Tt) + Math.PI / 2, i === 0 || i === 12 ? 0 : 7 * Math.sin(t * 9 + faz) * (0.4 + b / 40)); });
    const kenar = [...dalga(Pb, Pt, 0), ...dalga(Pt, Pd, 2).slice(1)];
    pp.sil = c.S('polygon', { points: kenar.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' '), fill: '#2a3869', 'fill-opacity': 0.6, stroke: '#4a5a9c', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    pp.yer = cizgi(c, g, [X(0.2), yz], [X(21.2), yz], RENK.cizgi, 3);
    pp.yamac = c.S('g', {}, g); cizgi(c, pp.yamac, Pb, Pt, RENK.cizgi, 2.5); cizgi(c, pp.yamac, Pt, Pd, RENK.cizgi, 2.5);
    pp.tha = c.S('polygon', { points: [Pt, Ph, Pa].map((q) => q.join(',')).join(' '), fill: EL[0], 'fill-opacity': 0.2, stroke: EL[0], 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const harf = (ad, P, dx, dy) => yazi(c, g, P[0] + dx, P[1] + dy, ad, { size: 26, kalin: 700 });
    pp.B = harf('B', Pb, 0, 32); pp.H = harf('H', Ph, 0, 32); pp.D = harf('D', Pd, 0, 32); pp.T = harf('T', Pt, 0, -16);
    pp.A = harf('A', Pa, -13, 32); pp.L = harf('L', Pl, 13, 32);
    pp.nB = nokta(c, g, Pb, SAYI, 5); pp.nH = nokta(c, g, Ph, SAYI, 5); pp.nD = nokta(c, g, Pd, SAYI, 5); pp.nT = nokta(c, g, Pt, SAYI, 5); pp.nA = nokta(c, g, Pa, SAYI, 5);
    pp.TH = cizgi(c, g, Pt, Ph, ISTEN, 3.5);
    pp.dikH = aciYayi(c, g, Ph, Pt, Pa, RENK.cizgi, 28, { dik: true });
    pp.dikHs = aciYayi(c, g, Ph, Pt, Pb, RENK.cizgi, 28, { dik: true });
    pp.isikT = cizgi(c, g, Pt, Pa, ISIK, 3);
    // Ana şekilde Hakan ve ayna çok küçüktür.
    pp.insan = c.S('g', {}, g); cizgi(c, pp.insan, [Pl[0] + 10, yz], [Pl[0] + 10, yz - 12], RENK.yazi, 2.5); c.S('circle', { cx: Pl[0] + 10, cy: yz - 16, r: 3.5, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2 }, pp.insan);
    pp.ayna = cizgi(c, g, [Pa[0] - 7, yz - 2], [Pa[0] + 7, yz - 2], RENK.yazi, 3.5);
    // Büyüteç kutusu: 1 birim = 0,5 m (kutunun kendi ölçeği); A–L 4 birim, L–K 3 birim.
    const bk = E.buyutec(c, g, { kutu: [o.kutu[0], o.kutu[1], 270, 200], nokta: Pa, r: 9 }), ic = bk.ic;
    const KA = bk.P(60, 150), KL = bk.P(220, 150), KK = bk.P(220, 30), Sol = bk.P(0, 150), Sag = bk.P(270, 150), Gelen = [KA[0] - 44, KA[1] - 33];
    pp.kutu = [bk.kutu, bk.hat, bk.halka];
    pp.kYer = cizgi(c, ic, Sol, Sag, RENK.cizgi, 2.5);
    pp.kAyna = cizgi(c, ic, [KA[0] - 16, KA[1] - 4], [KA[0] + 16, KA[1] - 4], RENK.yazi, 6);
    pp.kA = yazi(c, ic, KA[0] - 4, KA[1] + 32, 'A', { size: 24, kalin: 700 });
    pp.kL = yazi(c, ic, KL[0], KL[1] + 32, 'L', { size: 24, kalin: 700 });
    pp.kK = yazi(c, ic, KK[0] + 26, KK[1] + 8, 'K', { size: 24, kalin: 700 });
    pp.kGovde = cizgi(c, ic, KL, KK, RENK.yazi, 3.5);
    pp.kKafa = c.S('circle', { cx: KK[0], cy: KK[1] - 12, r: 10, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2.5 }, ic);
    pp.kIsik1 = cizgi(c, ic, KA, Gelen, ISIK, 3);
    pp.kIsik2 = cizgi(c, ic, KA, KK, ISIK, 3);
    pp.k2m = yazi(c, ic, (KA[0] + KL[0]) / 2, KA[1] + 34, '2 m', { size: 24, kalin: 700 });
    pp.k150 = yazi(c, ic, KL[0] - 14, KA[1] - 22, '150 cm', { size: 22, kalin: 700, hiza: 'end' });
    pp.kYay = c.S('g', {}, ic); B.esitYay(c, pp.kYay, KA, Gelen, Sol, 1, EL[0], { r: 34 }); B.esitYay(c, pp.kYay, KA, KK, Sag, 1, EL[0], { r: 34 });
    pp.kDikL = aciYayi(c, ic, KL, KK, KA, RENK.cizgi, 26, { dik: true });
    pp.kla = c.S('polygon', { points: [KK, KL, KA].map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.22, stroke: EL[1], 'stroke-width': 3, 'stroke-linejoin': 'round' }, ic);
    pp.kAL = cizgi(c, ic, KA, KL, RENK.yazi, 6);
    const ac = o.ac || [];
    Object.keys(pp).forEach((ad) => { if (!ac.includes(ad)) gizle(pp[ad]); else liste(pp[ad]).forEach((e) => { e.style.opacity = 1; }); });
    const tum = (...adlar) => adlar.flatMap((a) => liste(pp[a]));
    return { g, p: pp, tum, P: { B: Pb, H: Ph, D: Pd, A: Pa, L: Pl, T: Pt }, K: { A: KA, L: KL, K: KK }, olcuY: yz + 52, bk };
  }
  /* Hakan'ın tepesinin birinci bölümünün son karesi (ana şekil + ölçüler + kutu + ışık + yaylar). */
  const TEPE_SON = ['yer', 'sil', 'yamac', 'B', 'D', 'T', 'nB', 'nD', 'nT', 'insan', 'ayna', 'isikT', 'kutu', 'kYer', 'kAyna', 'kA', 'kL', 'kK', 'kGovde', 'kKafa', 'kIsik1', 'kIsik2', 'k2m', 'k150', 'kYay'];

  /* Ana şekilde 1350 m ve 527 m ölçüleri (b ve konum hakan() ile aynı). */
  function tepeOlcu(c, g, h) {
    const k = [0, 52], y = [0, 28];
    const bd = olcu(c, g, h.P.B, h.P.D, '1350 m', RENK.cizgi, { kay: k, yazi: y, yazirenk: SAYI });
    const dl = olcu(c, g, h.P.D, h.P.L, '527 m', RENK.cizgi, { kay: k, yazi: y, yazirenk: SAYI });
    return { bd, dl };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // 9 ve 12 birim dik kenarlı dik üçgen; hipotenüs sorulur.
    const g1 = c.S('g', {}, svg), P = [[370, 130], [370, 346], [658, 346]];
    const m = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
    cokgen(c, g1, P, RENK.sekil);
    aciYayi(c, g1, P[1], P[0], P[2], RENK.cizgi, 34, { dik: true });
    B.kenarEtiketi(c, g1, P[0], P[1], '9', SAYI, { merkez: m, size: 30 });
    B.kenarEtiketi(c, g1, P[1], P[2], '12', SAYI, { merkez: m, size: 30 });
    const soru = B.kenarEtiketi(c, g1, P[0], P[2], '?', ISTEN, { merkez: m, size: 34 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Dik kenarları 9 ve 12 birim olan dik üçgenin hipotenüsü kaç birimdir?',
      options: ['21 birim', '15 birim', '3 birim'], answer: 1,
      hints: ['Hipotenüsün karesi, dik kenarların kareleri toplamıdır.', '', 'Hipotenüsün karesi, dik kenarların kareleri toplamıdır.'],
      right: 'Evet. 9² + 12² = 225 ve √225 = 15.',
    });
    cevapla(soru, '15');
    await c.say('Hipotenüsün karesi, dik kenarların kareleri toplamıdır.');
    c.clearSay();
    await sil(c, g1, 350);

    // İki açısı eşit iki üçgen.
    const g2 = c.S('g', {}, svg);
    const T1 = [[140, 400], [320, 400], [250, 270]], k = 1.7, O = [500, 400];
    const T2 = T1.map((q) => [O[0] + (q[0] - T1[0][0]) * k, O[1] + (q[1] - T1[0][1]) * k]);
    [T1, T2].forEach((T, i) => {
      B.notrUcgen(c, g2, T, i ? ['D', 'E', 'F'] : ['A', 'B', 'C'], { harfSize: 26 });
      B.esitYay(c, g2, T[0], T[1], T[2], 1, EL[0], { r: 30 });
      B.esitYay(c, g2, T[1], T[0], T[2], 2, EL[1], { r: 28 });
    });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki üçgenin karşılıklı iki açısı eşit. Bu üçgenler için hangisi söylenir?',
      options: ['Eştir; karşılıklı kenarları eşittir', 'Hiçbir şey söylenemez', 'Benzerdir; karşılıklı kenarları orantılıdır'], answer: 2,
      hints: ['İki açı eşitse üçgenler benzerdir; karşılıklı kenarları orantılıdır.', 'İki açı eşitse üçgenler benzerdir; karşılıklı kenarları orantılıdır.', ''],
      right: 'Evet. İki açı eşitse üçgenler benzerdir.',
    });
    await c.say('İki açı eşitse üçgenler benzerdir; karşılıklı kenarları orantılıdır.');
  }

  /* ---- 2. Hakan'ın tepesi ---- */
  async function tepe(c) {
    const svg = c.svg(1000, 562);
    const h = hakan(c, svg, { b: 40, x0: 45, yz: 445, kutu: [700, 85], ac: [] });
    const ol = tepeOlcu(c, svg, h);
    gizle(ol.bd.g, ol.dl.g);
    await par(c.say('Hakan’ın dağcılık kulübü bir tepeye tırmanacak.'), belir(c, h.tum('yer', 'sil'), 600));
    await par(c.say('Önce tepenin yüksekliğini öğrenmek istiyor.', { speak: '[curious] Önce tepenin yüksekliğini öğrenmek istiyor.' }), E.parla(c, h.p.sil, 900));
    await par(c.say('Tepenin iki yamacı yere B ve D noktalarında değiyor.'), belir(c, h.tum('B', 'D', 'nB', 'nD'), 450));
    await par(c.say('B ile D arası kuş uçuşu 1350 metre.', { speak: 'B ile D arası kuş uçuşu bin üç yüz elli metre.' }), belir(c, ol.bd.g, 500));
    await par(c.say('Zirve T, B ve D’ye eşit uzaklıkta.'), belir(c, h.tum('T', 'nT', 'yamac'), 500));
    await par(c.say('Hakan L noktasında; D’ye 527 metre uzakta.', { speak: 'Hakan L noktasında; D’ye beş yüz yirmi yedi metre uzakta.' }), belir(c, [h.p.insan, ol.dl.g], 500));
    await par(c.say('Kendisinden 2 metre ötedeki A noktasına bir ayna koyuyor.', { speak: 'Kendisinden iki metre ötedeki A noktasına bir ayna koyuyor.' }),
      belir(c, h.tum('ayna', 'kutu', 'kYer', 'kAyna', 'kA', 'kL', 'k2m', 'kGovde'), 550));
    await par(c.say('Gözü K noktasında; yerden 150 santimetre yukarıda.', { speak: 'Gözü K noktasında; yerden yüz elli santimetre yukarıda.' }), belir(c, h.tum('kKafa', 'kK', 'k150'), 500));
    await par(c.say('Aynaya bakınca zirveyi görüyor: ışık T’den A’ya, A’dan göze geliyor.'), belir(c, h.tum('isikT', 'kIsik1', 'kIsik2'), 700));
    await par(c.say('Işık aynaya çarpınca, gelen ve giden ışın aynayla eşit açı yapar.'), belir(c, h.p.kYay, 500));
    await c.wait(500);
  }

  /* ---- 3. Verilen ve istenen ---- */
  async function verilenIstenen(c) {
    const svg = c.svg(1000, 562);
    // Büyük şekil (ikinci sahnenin son karesi) küçülüp sola oturur.
    const gb = c.S('g', {}, svg);
    const hb = hakan(c, gb, { b: 40, x0: 45, yz: 445, kutu: [700, 85], ac: TEPE_SON });
    tepeOlcu(c, gb, hb);
    const k = 22 / 40;
    const hk = hakan(c, svg, { b: 22, x0: 20, yz: 420, kutu: [320, 85], ac: TEPE_SON });
    const ok = tepeOlcu(c, svg, hk);
    const sun = [hk.p, ok];
    // 22/40 ölçeğiyle ve (20, 420) noktasına oturan dönüşüm
    const kuc = [...hk.tum(...TEPE_SON), ok.bd.g, ok.dl.g];
    gizle(kuc);
    const tab = E.verilenIstenen(c, svg, { x: 610, y: 105, ikinci: 215, size: 24, aralik: 46 });
    gizle(tab.baslik, tab.ayrac);
    await par(c.say('Probleme girmeden önce verilenleri ve istenen şeyi ayırırız.'), (async () => {
      await c.tween(900, (e) => {
        const sc = 1 - (1 - k) * e;
        gb.setAttribute('transform', `translate(${(20 - 45 * k) * e},${(420 - 445 * k) * e}) scale(${sc})`);
        gb.style.opacity = 1 - e;
        kuc.forEach((x) => { x.style.opacity = e; });
      }, Ders.ease.inOut);
      gb.remove();
      await belir(c, [...tab.baslik, tab.ayrac], 450);
    })());
    await par(c.say('Verilen, problemin bize söylediği bilgidir.'), E.parla(c, tab.baslik[0] || tab.baslik, 800));
    const satirlar = [
      ['|BD| = 1350 m', ok.bd.g], ['|DL| = 527 m', ok.dl.g], ['|AL| = 2 m', hk.p.k2m], ['|KL| = 150 cm', hk.p.k150], ['iki açı eşit', hk.p.kYay],
    ];
    await par(c.say('Burada dört uzunluk verilmiş; ışıkla ilgili bir açı bilgisi de var.'), (async () => {
      for (let i = 0; i < satirlar.length; i++) { await par(tab.verilen(i, satirlar[i][0], 350), E.parla(c, satirlar[i][1], 600)); }
    })());
    await par(c.say('İstenen, bulmamız gereken şeydir.'), E.parla(c, tab.baslik, 700));
    await par(c.say('Zirveden yere inen dikmenin ayağına H diyelim.'), belir(c, hk.tum('TH', 'H', 'nH'), 500));
    await par(c.say('İstenen: tepenin yüksekliği, yani TH uzunluğu.', { speak: 'İstenen: tepenin yüksekliği, yani T H uzunluğu.' }), E.parla(c, hk.p.TH, 800));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Aşağıdakilerden hangisi bu problemde istenendir?',
      options: ['|TH|, tepenin yüksekliği', '|KL|, Hakan’ın göz yüksekliği', '|BD|, yamaçlar arası uzaklık'], answer: 0,
      hints: ['', 'Göz yüksekliği ve BD, tabloda zaten verilen sütununda.', 'Verilen, problemin yazdığı bilgiydi; istenen bulunacak olandır.'],
      right: 'Evet. İstenen, tepenin yüksekliği.',
    });
    await par(c.say('Tepenin yüksekliği, istenen sütununda.'), tab.istenen(0, '|TH| = ?', 500));
    c.clearSay();
    await c.say('Şimdi verilenlerin birbirine nasıl bağlandığına bakalım.');
  }

  /* ---- 4. İlişkiler ---- */
  async function iliskiler(c) {
    const svg = c.svg(1000, 562);
    const h = hakan(c, svg, { b: 26, x0: 20, yz: 380, kutu: [398, 85], ac: ['yer', 'sil', 'yamac', 'B', 'D', 'T', 'nB', 'nD', 'nT'] });
    const yz = 380, P = h.P;
    const bd = olcu(c, svg, P.B, P.D, '1350 m', RENK.cizgi, { yazirenk: SAYI });
    const tb = E.tablo(c, svg, { x: 705, y: 120, sutunX: [0], size: 25, aralik: 54 });
    const bas = tb.satir(0, [[['İlişki', RENK.cizgi]]]); cizgi(c, svg, [705, 134], [965, 134], RENK.kenarlik, 2);
    const satirYaz = (i, parcalar) => tb.satir(i, [parcalar]);
    const r1 = satirYaz(1, ['TBD ikizkenar']), r2 = satirYaz(2, ['H, BD’nin ortası']), r3 = satirYaz(3, ['|DL| = |DA| + |AL|']), r4 = satirYaz(4, ['TAD = KAL']);
    const gecti = (s) => s.soluk(400, 0.45);
    // ikizkenar işaretleri ve orta nokta
    const cen2 = [B.esitCentik(c, svg, P.B, P.T, 2, EL[0], { w: 3.5 }), B.esitCentik(c, svg, P.T, P.D, 2, EL[0], { w: 3.5 })];
    const cen1 = [B.esitCentik(c, svg, P.B, P.H, 1, ARA, { w: 3.5 }), B.esitCentik(c, svg, P.H, P.D, 1, ARA, { w: 3.5 })];
    gizle(cen2, cen1);
    await par(c.say('Verilenler arasındaki ilişkileri bulalım.'), bas.goster(450));
    await par(c.say('Zirve, B ile D’ye eşit uzaklıkta: TBD ikizkenar.', { speak: 'Zirve, B ile D’ye eşit uzaklıkta: T B D ikizkenar.' }), par(belir(c, cen2, 500), r1.goster(500)));
    await par(c.say('İkizkenar üçgende tabana inen yükseklik tabanı ortalar.'), belir(c, h.tum('TH', 'H', 'nH', 'dikH', 'dikHs'), 600));
    await par(c.say('Demek ki H, BD’nin orta noktası.', { speak: 'Demek ki H, B D’nin orta noktası.' }), par(belir(c, cen1, 500), gecti(r1), r2.goster(500)));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'H, BD’nin ortası ve |BD| = 1350 m. |HD| kaç metredir?',
      options: ['1350 m', '525 m', '675 m'], answer: 2,
      hints: ['BD’nin tamamı 1350 metre; HD yalnızca yarısı.', 'Orta nokta, BD’yi iki eşit parçaya böler.', ''],
      right: 'Evet. 1350 ÷ 2 = 675.',
    });
    const o675 = [olcu(c, svg, P.B, P.H, '675', ARA, { yazirenk: ARA }), olcu(c, svg, P.H, P.D, '675', ARA, { yazirenk: ARA })];
    gizle(o675.map((x) => x.g));
    await par(c.say('|BH| ve |HD| 675’er metre.', { speak: 'B H uzunluğu ve H D uzunluğu, altı yüz yetmiş beşer metre.' }), par(belir(c, bd.g, 350, 0), belir(c, o675.map((x) => x.g), 450)));
    await sil(c, [bd.g, ...cen2], 10);
    c.clearSay();

    // DL çubuğu: DA yeşil, AL beyaz (AL çok kısa; görünsün diye 6 piksel).
    const by = 492, xa = P.A[0], xl = P.A[0] + 6;
    const cubuk = c.S('g', {}, svg);
    cizgi(c, cubuk, [P.D[0], by], [xa, by], ARA, 12, { 'stroke-linecap': 'butt' });
    cizgi(c, cubuk, [xa, by], [xl, by], SAYI, 12, { 'stroke-linecap': 'butt' });
    const l527 = yazi(c, cubuk, (P.D[0] + xl) / 2, by - 18, '527 m', { size: 24, kalin: 700, renk: SAYI });
    const l2 = yazi(c, cubuk, xl + 34, by + 8, '2 m', { size: 24, kalin: 700, renk: SAYI });
    const l525 = yazi(c, cubuk, (P.D[0] + xa) / 2, by + 36, '525 m', { size: 24, kalin: 700, renk: ARA });
    gizle(cubuk, l525);
    await par(c.say('Ayna A, D ile L arasında duruyor.'), belir(c, [...h.tum('A', 'L', 'nA'), cubuk], 600));
    await par(c.say('Yani |DL| = |DA| + |AL|.', { speak: 'Yani D L uzunluğu eşittir D A uzunluğu artı A L uzunluğu.' }), par(gecti(r2), r3.goster(500), E.parla(c, cubuk, 800)));
    await par(c.say('Buradan |DA| = 527 − 2 = 525 metre.', { speak: 'Buradan D A uzunluğu, beş yüz yirmi yedi eksi iki, eşittir beş yüz yirmi beş metre.' }), belir(c, l525, 500));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: '|HA| = |HD| + |DA| ise |HA| kaç metredir?',
      options: ['1202 m', '1200 m', '150 m'], answer: 1,
      hints: ['527, DL’ydi; HA için DA gerekiyor.', '', 'HA, HD ile DA’nın birleşimi; HD 675, DA 525.'],
      right: 'Evet. 675 + 525 = 1200.',
    });
    // Gör: HA üzerinde iki yeşil parça, toplam 1200.
    await belir(c, [cubuk, ...o675.map((x) => x.g)], 350, 0);
    const ha = c.S('g', {}, svg), xh = P.H[0], xd = P.D[0];
    cizgi(c, ha, [xh, by], [xd, by], ARA, 12, { 'stroke-linecap': 'butt', 'stroke-opacity': 0.95 });
    cizgi(c, ha, [xd, by], [xa, by], ARA, 12, { 'stroke-linecap': 'butt', 'stroke-opacity': 0.55 });
    cizgi(c, ha, [xd, by - 12], [xd, by + 12], '#0e1530', 3);
    yazi(c, ha, (xh + xd) / 2, by + 38, '675', { size: 24, kalin: 700, renk: ARA });
    yazi(c, ha, (xd + xa) / 2, by + 38, '525', { size: 24, kalin: 700, renk: ARA });
    yazi(c, ha, (xh + xa) / 2, by - 20, '1200 m', { size: 26, kalin: 700, renk: ARA });
    gizle(ha); await par(c.say('Demek ki |HA| = 1200 metre.', { speak: 'Demek ki H A uzunluğu bin iki yüz metre.' }), belir(c, ha, 600));
    c.clearSay();
    // Aynadaki açılar ve dik açılar.
    await par(belir(c, ha, 300, 0), belir(c, [...h.tum('A', 'L', 'nA')], 300, 0), belir(c, h.tum('isikT', 'kutu', 'kYer', 'kAyna', 'kA', 'kL', 'kK', 'kIsik1', 'kIsik2', 'kYay'), 600));
    await par(c.say('Aynadaki iki açı eşit: TAD ile KAL.', { speak: 'Aynadaki iki açı eşit: T A D ile K A L.' }), par(gecti(r3), r4.goster(500), E.parla(c, h.p.kYay, 800)));
    await par(c.say('Tepe de Hakan da yere dik: iki dik açı.'), (async () => {
      await belir(c, h.tum('kGovde', 'kDikL'), 500);
      await E.parla(c, [h.p.dikH, h.p.kDikL], 800);
    })());
  }

  /* ---- 5. Şekle dök ---- */
  async function sekleDok(c) {
    const svg = c.svg(1000, 562);
    const h = hakan(c, svg, { b: 40, x0: 45, yz: 445, kutu: [700, 85], ac: ['yer', 'sil', 'insan', 'ayna'] });
    const yz = 445, P = h.P, K = h.K;
    // Ayna ve insan resmi için büyüteçteki insan (kafa) da resimdir.
    const ucuk = (a, b2, renk, kalinlik = 8) => cizgi(c, svg, a, b2, renk, kalinlik, { 'stroke-opacity': 0.55 });
    const seg = [ucuk([P.B[0], yz], [P.H[0], yz], ARA), ucuk([P.H[0], yz], [P.D[0], yz], ARA), ucuk([P.D[0], yz], [P.A[0], yz], ARA)];
    gizle(seg);
    const o = [olcu(c, svg, P.B, P.H, '675', ARA, { yazirenk: ARA }), olcu(c, svg, P.H, P.D, '675', ARA, { yazirenk: ARA }), olcu(c, svg, P.D, P.A, '525', ARA, { yazirenk: ARA })];
    gizle(o.map((x) => x.g));
    await par(c.say('Şimdi durumu bir şekle dökelim.'), (async () => {
      await par(belir(c, h.p.sil, 700, 0.18), belir(c, [h.p.insan, h.p.ayna], 600, 0), belir(c, h.p.yamac, 700));
    })());
    await par(c.say('Önce yer çizgisi ve üzerindeki noktalar: B, H, D, A, L.'), belir(c, h.tum('B', 'H', 'D', 'A', 'L', 'nB', 'nH', 'nD', 'nA'), 600));
    await par(c.say('Tepe ve Hakan yere dik: TH ve KL dikmeleri.', { speak: 'Tepe ve Hakan yere dik: T H ve K L dikmeleri.' }),
      belir(c, h.tum('TH', 'T', 'nT', 'dikH', 'kutu', 'kYer', 'kA', 'kL', 'kK', 'kGovde', 'kDikL'), 700));
    await par(c.say('Işığın yolu: T’den A’ya, A’dan K’ye.'), belir(c, h.tum('isikT', 'kAyna', 'kIsik1', 'kIsik2'), 700));
    await par(c.say('Aynadaki iki eşit açıyı aynı renkle boyayalım.'), belir(c, h.p.kYay, 600));
    await par(c.say('Her verilen sayıyı şekilde kendi kenarına yazalım.'), (async () => {
      for (let i = 0; i < 3; i++) { await par(belir(c, [o[i].g, seg[i]], 450), E.parla(c, [o[i].g], 600)); }
      await par(belir(c, h.p.k2m, 400), E.parla(c, h.p.k2m, 600));
      await par(belir(c, h.p.k150, 400), E.parla(c, [h.p.k150, h.p.kGovde], 600));
    })());
    const not = yazi(c, svg, 40, 112, '|KL| = 150 cm', { hiza: 'start', size: 28, kalin: 700 });
    gizle(not);
    await par(c.say('Şekilde bütün uzunluklar metre olsun.'), belir(c, not, 450));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Şekil metre kullanıyor; |KL| kaç metredir?',
      options: ['15 m', '150 m', '1,5 m'], answer: 2,
      hints: ['150 santimetre, 1 metreden biraz fazla.', '1 metre 100 santimetredir.', ''],
      right: 'Evet. 150 ÷ 100 = 1,5.',
    });
    parcaKoy(c, not, ['|KL| = ', ['1,5 m', ARA]]);
    h.p.k150.textContent = '1,5 m';
    await par(c.say('Demek ki |KL| = 1,5 metre.', { speak: 'Demek ki K L uzunluğu bir virgül beş metre.' }), E.parla(c, [h.p.k150, not], 700));
    c.clearSay();
    await par(c.say('Şekilde iki dik üçgen var: THA ve KLA.', { speak: 'Şekilde iki dik üçgen var: T H A ve K L A.' }), belir(c, h.tum('tha', 'kla'), 700));
    await c.say('İkisinde de bir dik açı ve bir eşit açı var.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'THA ve KLA üçgenleri için şekilden hangi açılar eşit okunur?',
      options: ['H ve L’deki dik açılar; A’daki iki açı', 'H’deki dik açı ile K’deki açı', 'A’daki açı ile L’deki dik açı'], answer: 0,
      hints: ['', 'Yere dik duran iki doğru parçası var: iki dik açı.', 'Aynada eşit olan açıların köşesi A.'],
      right: 'Evet. İki dik açı ve aynadaki iki açı.',
    });
    await par(c.say('H ve L’de dik açı; A’da iki eşit açı.'), E.parla(c, [h.p.dikH, h.p.kDikL, h.p.kYay], 900));
    c.clearSay();
    await par(c.say('Küçük dik üçgenin dik kenarları belli: KL ve LA.', { speak: 'Küçük dik üçgenin dik kenarları belli: K L ve L A.' }), (async () => {
      await belir(c, h.p.kAL, 300);
      await E.parla(c, [h.p.kGovde, h.p.kAL, h.p.k150, h.p.k2m], 900);
      await belir(c, h.p.kAL, 300, 0);
    })());
    // Büyükte HA belli (1200), TH aranıyor.
    const ha = olcu(c, svg, P.H, P.A, '1200', ARA, { yazirenk: ARA });
    const sor = E.istenenKutu(c, svg, P.H[0] - 36, (P.T[1] + yz) / 2, '?', { size: 28 });
    gizle(ha.g, sor.g);
    await par(c.say('Büyükte HA belli; TH aranıyor.', { speak: 'Büyükte H A belli; T H aranıyor.' }), (async () => {
      await par(belir(c, [...o.map((x) => x.g), ...seg, not], 400, 0), belir(c, h.p.sil, 400, 0));
      await par(belir(c, ha.g, 500), belir(c, sor.g, 500));
      await E.parla(c, [h.p.TH, ha.g], 800);
    })());
  }

  /* ---- Stor perde şeması (1 birim = 15 cm; b piksel). ---- */
  function perde(c, p, o) {
    const b = o.b, X = (u) => o.x0 + u * b, Y = (v) => o.yz - (16 - v) * b, pp = {}, g = c.S('g', {}, p);
    const C = [X(3), Y(2)], Kk = [X(3), Y(7)], Bb = [X(3), Y(11)], A = [X(9), Y(11)], D = [X(5 + 2 / 3), Y(11)];
    const G = [X(3), Y(16)];
    pp.yer = cizgi(c, g, [X(-1), o.yz], [X(12.5), o.yz], RENK.cizgi, 3);
    pp.duvar = cizgi(c, g, C, G, RENK.cizgi, 2, { 'stroke-dasharray': '5 7', 'stroke-opacity': 0.55 });
    pp.rail = cizgi(c, g, [X(2.2), Y(0.2)], [X(3.8), Y(0.2)], RENK.cizgi, 5);
    pp.perde = cizgi(c, g, [X(3), Y(0.2)], C, '#aeb8e6', 7);
    pp.masa = c.S('rect', { x: X(5), y: Y(11), width: 6 * b, height: 5 * b, fill: '#1d2850', 'fill-opacity': 0.7, stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
    pp.masaUst = cizgi(c, g, [X(5), Y(11)], [X(11), Y(11)], RENK.yazi, 5);
    pp.abc = c.S('polygon', { points: [A, Bb, C].map((q) => q.join(',')).join(' '), fill: EL[0], 'fill-opacity': 0.2, stroke: EL[0], 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    pp.dbk = c.S('polygon', { points: [D, Bb, Kk].map((q) => q.join(',')).join(' '), fill: EL[1], 'fill-opacity': 0.28, stroke: EL[1], 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    const ek = (S, Tt, d) => ileri(S, yon(S, Tt) + Math.PI, d);
    pp.isin1 = c.S('g', {}, g); const r1 = cizgi(c, pp.isin1, C, A, RENK.cizgi, 3.5), e1 = cizgi(c, pp.isin1, ek(C, A, 30), C, RENK.cizgi, 2.5, { 'stroke-dasharray': '4 6', 'stroke-opacity': 0.7 });
    pp.isin2 = c.S('g', {}, g); const r2 = cizgi(c, pp.isin2, Kk, D, RENK.cizgi, 3.5), e2 = cizgi(c, pp.isin2, ek(Kk, D, 24), Kk, RENK.cizgi, 2.5, { 'stroke-dasharray': '4 6', 'stroke-opacity': 0.7 });
    pp.dikB = aciYayi(c, g, Bb, C, A, RENK.cizgi, 34, { dik: true });
    const harf = (ad, P, dx, dy) => yazi(c, g, P[0] + dx, P[1] + dy, ad, { size: o.harf || 26, kalin: 700 });
    pp.C = harf('C', C, 18, -8); pp.K = harf('K', Kk, 18, -8); pp.B = harf('B', Bb, 26, 32); pp.A = harf('A', A, 4, -16); pp.D = harf('D', D, 20, -16);
    pp.nC = nokta(c, g, C, SAYI, 5); pp.nK = nokta(c, g, Kk, SAYI, 5); pp.nB = nokta(c, g, Bb, SAYI, 5); pp.nA = nokta(c, g, A, SAYI, 5); pp.nD = nokta(c, g, D, SAYI, 5);
    const ac = o.ac || [];
    Object.keys(pp).forEach((ad) => { if (!ac.includes(ad)) gizle(pp[ad]); else liste(pp[ad]).forEach((e) => { e.style.opacity = 1; }); });
    return {
      g, p: pp, tum: (...adlar) => adlar.flatMap((a) => liste(pp[a])), X, Y, N: { C, K: Kk, B: Bb, A, D },
      isinBoya(renk, kesik) { [r1, r2].forEach((l) => { l.setAttribute('stroke', renk); if (kesik) l.setAttribute('stroke-dasharray', '12 8'); }); },
      inis(e) { const y = C[1] + (Kk[1] - C[1]) * e; pp.perde.setAttribute('y2', y); },
    };
  }
  const PERDE_B = 26, PERDE_X0 = 150, PERDE_YZ = 452;

  /* ---- 6. Stor perde ---- */
  async function storPerde(c) {
    const svg = c.svg(1000, 562);
    const f = perde(c, svg, { b: PERDE_B, x0: PERDE_X0, yz: PERDE_YZ, ac: [] });
    const N = f.N, X = f.X, Y = f.Y, yz = PERDE_YZ;
    const dik = (x, a, bb, metin, renk, ky = 8, o = {}) => olcu(c, svg, [x, a], [x, bb], metin, renk, { kay: [0, 0], yazi: [-10, ky], hiza: 'end', yazirenk: o.yazirenk || SAYI, ...o });
    const o210 = dik(128, N.C[1], yz, '210', RENK.cizgi);
    const oMasa = olcu(c, svg, [X(11.7), N.B[1]], [X(11.7), yz], '75', RENK.cizgi, { kay: [0, 0], yazi: [14, 8], hiza: 'start', yazirenk: SAYI });
    const o30 = olcu(c, svg, [N.B[0], yz], [X(5), yz], '30', RENK.cizgi, { kay: [0, 26], yazi: [0, 28], yazirenk: SAYI });
    const o60 = olcu(c, svg, [X(5), yz], [N.A[0], yz], '60', RENK.cizgi, { kay: [0, 26], yazi: [0, 28], yazirenk: SAYI });
    const oIn = dik(199, N.C[1], N.K[1], '75', RENK.cizgi);       // perdenin inişi
    const oBC = dik(128, N.C[1], N.B[1], '?', RENK.cizgi);
    const oBK = dik(199, N.K[1], N.B[1], '?', RENK.cizgi);
    const o90 = olcu(c, svg, [N.B[0], yz], [N.A[0], yz], '90', ARA, { kay: [0, 70], yazi: [0, 28], yazirenk: ARA });
    const xk = olcu(c, svg, [X(5), N.B[1]], [N.D[0], N.B[1]], '', ISTEN, { kay: [0, 14], yazi: [0, 0], yazirenk: ISTEN });
    const lider = cizgi(c, svg, [(X(5) + N.D[0]) / 2, N.B[1] + 14], [X(5) + 34, N.B[1] + 36], ISTEN, 2);
    const xs = E.istenenKutu(c, svg, X(5) + 52, N.B[1] + 52, 'x', { size: 28 });
    gizle(o210.g, oMasa.g, o30.g, o60.g, oIn.g, oBC.g, oBK.g, o90.g, xk.g, lider, xs.g);
    oBC.yazi.style.fill = SAYI; oBK.yazi.style.fill = SAYI;
    // ikinci ışın çizilmeden önce perde ucu inmiş olur: perdeyi başta C'de bırak
    const tab = E.verilenIstenen(c, svg, { x: 560, y: 90, ikinci: 245, size: 24, aralik: 46 });
    gizle(tab.baslik, tab.ayrac);

    await par(c.say('Bir pencerede stor perde var; ucu yerden 210 santimetre yüksekte.', { speak: 'Bir pencerede stor perde var; ucu yerden iki yüz on santimetre yüksekte.' }),
      belir(c, [...f.tum('yer', 'duvar', 'rail', 'perde', 'C', 'nC'), o210.g], 700));
    await par(c.say('Perdeden 30 santimetre ileride, 75 santimetre yüksekliğinde bir masa duruyor.', { speak: 'Perdeden otuz santimetre ileride, yetmiş beş santimetre yüksekliğinde bir masa duruyor.' }),
      belir(c, [...f.tum('masa', 'masaUst'), o30.g, oMasa.g], 700));
    await par(c.say('Güneş ışığı perdenin altından geçip masaya düşüyor.'), belir(c, [...f.tum('isin1', 'A', 'nA')], 700));
    await par(c.say('Işık masanın kenarından en çok 60 santimetre ileriye ulaşıyor.', { speak: 'Işık masanın kenarından en çok altmış santimetre ileriye ulaşıyor.' }), belir(c, o60.g, 500));
    await par(c.say('Sonra perde 75 santimetre indiriliyor.', { speak: 'Sonra perde yetmiş beş santimetre indiriliyor.' }), (async () => {
      await belir(c, f.tum('K', 'nK'), 400);
      await par(c.tween(1100, (e) => f.inis(e), Ders.ease.inOut), belir(c, oIn.g, 700));
    })());
    await par(c.say('Işık şimdi masa kenarından en çok x santimetre ilerliyor.', { speak: 'Işık şimdi masa kenarından en çok iks santimetre ilerliyor.' }), belir(c, [...f.tum('isin2', 'D', 'nD'), xk.g, lider, xs.g], 700));
    await par(c.say('İstenen x; verilenler tabloda.', { speak: 'İstenen iks; verilenler tabloda.' }), (async () => {
      await belir(c, [...tab.baslik, tab.ayrac], 350);
      const v = ['perde ucu 210 cm', 'masa 75 cm', 'aralık 30 cm', 'ışık 60 cm', 'iniş 75 cm'];
      for (let i = 0; i < 5; i++) await tab.verilen(i, v[i], 260);
      await tab.istenen(0, 'x', 350);
    })());
    await par(c.say('Güneş ışınları paralel: iki ışın aynı eğimde.'), (async () => {
      f.isinBoya(RENK.dogru, true);
      await E.parla(c, f.tum('isin1', 'isin2'), 900);
    })());
    await par(c.say('Perde yere dik, masanın yüzü yere paralel: B’de dik açı.'), belir(c, f.tum('B', 'nB', 'dikB'), 600));
    await par(c.say('Işık perde ucundan A’ya iniyor: ABC dik üçgeni.', { speak: 'Işık perde ucundan A’ya iniyor: A B C dik üçgeni.' }), belir(c, f.p.abc, 700));
    await par(c.say('Perde inince ışık K’den D’ye iniyor: DBK dik üçgeni.', { speak: 'Perde inince ışık K’den D’ye iniyor: D B K dik üçgeni.' }), belir(c, f.p.dbk, 700));
    await par(c.say('Perde ucu, masanın yüzünden 210 − 75 kadar yukarıda: |BC|.', { speak: 'Perde ucu, masanın yüzünden iki yüz on eksi yetmiş beş kadar yukarıda: B C uzunluğu.' }),
      par(belir(c, o210.g, 400, 0), belir(c, oBC.g, 500)));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '|BC| kaç santimetredir?',
      options: ['285 cm', '135 cm', '75 cm'], answer: 1,
      hints: ['Masanın yüksekliği eklenmez, çıkarılır.', '', 'Perde ucu yerden 210’du; masa o yüksekliğin 75’ini kaplıyor.'],
      right: 'Evet. 210 − 75 = 135.',
    });
    cevapla(oBC.yazi, '135');
    await par(c.say('Perde 75 santimetre inince ucu K’ye gelir: |CK| = 75.', { speak: 'Perde yetmiş beş santimetre inince ucu K’ye gelir: C K uzunluğu yetmiş beş.' }), E.parla(c, oIn.g, 800));
    c.clearSay();
    await belir(c, oBK.g, 400);
    await c.choice({
      tag: 'Sıra sende', q: '|BK| kaç santimetredir?',
      options: ['135 cm', '150 cm', '60 cm'], answer: 2,
      hints: ['BK, BC’nin bir parçası; BC’den büyük olamaz.', 'K, C’den 75 aşağıda; |BC| 135’ti.', ''],
      right: 'Evet. 135 − 75 = 60.',
    });
    cevapla(oBK.yazi, '60');
    await par(c.say('Demek ki |BK| = 60 santimetre.', { speak: 'Demek ki B K uzunluğu altmış santimetre.' }), E.parla(c, oBK.g, 800));
    c.clearSay();
    await par(c.say('A, perdeden 30 + 60 = 90 santimetre ötede: |AB| = 90.', { speak: 'A, perdeden otuz artı altmış, doksan santimetre ötede: A B uzunluğu doksan.' }), belir(c, o90.g, 600));
    await c.say('Şimdi problemi kendi cümlemizle söyleyelim.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi cümle perde problemini doğru anlatır?',
      options: ['İki dik üçgen var; ışının eğimi aynı; ikincide masa kenarı ile ışığın düştüğü yer arasındaki uzaklık aranıyor', 'İki dik üçgen eştir; |BC| ile |BK| eşittir', 'Tek bir dik üçgen var; x onun hipotenüsüdür'], answer: 0,
      hints: ['', 'BK, BC’den 75 kısa; iki üçgen aynı büyüklükte değil.', 'Perde indi ama ışının eğimi aynı kaldı.'],
      right: 'Evet. Eğim aynı, iki dik üçgen var.',
    });
    await par(c.say('İki dik üçgen var; ışının eğimi aynı.'), E.parla(c, [f.p.abc, f.p.dbk, ...f.tum('isin1', 'isin2')], 900));
  }

  /* ---- 7. Verilen, istenen, ara değer ---- */
  async function araDeger(c) {
    const svg = c.svg(1000, 562);
    const f = perde(c, svg, { b: 20, x0: 50, yz: 495, harf: 24, ac: ['yer', 'duvar', 'rail', 'perde', 'masa', 'masaUst', 'abc', 'dbk', 'isin1', 'isin2', 'dikB', 'C', 'K', 'B', 'A', 'D', 'nC', 'nK', 'nB', 'nA', 'nD'] });
    f.inis(1); f.isinBoya(RENK.dogru, true);
    const N = f.N, yz = 495;
    // üç kutu
    const kutular = [['Verilen', 60, 170], ['İstenen', 252, 84], ['Ara değer', 352, 148]].map(([ad, y, h]) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x: 650, y, width: 320, height: h, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      yazi(c, g, 668, y + 34, ad, { hiza: 'start', size: 26, kalin: 700, renk: ad === 'İstenen' ? ISTEN : ad === 'Ara değer' ? ARA : SAYI });
      return g;
    });
    gizle(kutular);
    // Şekilde bir verilen (beyaz) ve bir ara değer (yeşil) (üçüncü altyazıda)
    const X = f.X;
    const sayilar = [
      olcu(c, svg, [X(11.7), N.B[1]], [X(11.7), yz], '75', RENK.cizgi, { kay: [0, 0], yazi: [14, 8], hiza: 'start', yazirenk: SAYI }).g,
      olcu(c, svg, [X(3) - 22, N.C[1]], [X(3) - 22, N.B[1]], '135', RENK.cizgi, { kay: [0, 0], yazi: [-10, 8], hiza: 'end', yazirenk: ARA }).g,
    ];
    gizle(sayilar);
    await par(c.say('Verilenlerden hesapladığımız sayıya ara değer diyelim.'), belir(c, kutular, 500));
    await par(c.say('Ara değer verilmemiştir; istenen de değildir.'), E.parla(c, kutular[2], 800));
    await par(c.say('Şekle hem verilenleri hem ara değerleri yazarız.'), belir(c, sayilar, 600));
    await belir(c, sayilar, 300, 0);
    sayilar.forEach((x) => x.remove());
    c.clearSay();

    // Dene: sınıflandırma. Kart başına seçim; kart öne çıkar, kutuya oturur.
    const cx = 497, cy = 300, yuvalar = [[[668, 136], [668, 176], [668, 216]], [[668, 322]], [[668, 428], [668, 470]]];
    const kartlar = [
      { satir: ['Masa yüksekliği 75 cm'], kutu: 0, kisa: ['75 cm'], renk: SAYI, ipucu: 'Problemde yazıyor: verilen.' },
      { satir: ['Perde ucu yerden 210 cm'], kutu: 0, kisa: ['210 cm'], renk: SAYI, ipucu: 'Problemde yazıyor: verilen.' },
      { satir: ['Perdenin inişi 75 cm'], kutu: 0, kisa: ['75 cm'], renk: SAYI, ipucu: 'Problemde yazıyor: verilen.' },
      { satir: ['Işığın masada kenardan', 'en uzak noktası (x)'], kutu: 1, kisa: [['x', ISTEN]], renk: ISTEN, ipucu: 'Bulunacak olan: istenen.' },
      { satir: ['|BC| = 135 cm'], kutu: 2, kisa: ['|BC| = ', ['135', ARA], ' cm'], renk: ARA, ipucu: 'Verilmedi, 210 ile 75’ten hesaplandı.' },
      { satir: ['|BK| = 60 cm'], kutu: 2, kisa: ['|BK| = ', ['60', ARA], ' cm'], renk: ARA, ipucu: '135 ile 75’ten hesaplandı.' },
    ];
    await c.say('Her kartı doğru kutuya seç.', { noWait: true });
    const sayac = [0, 0, 0];
    for (const k of kartlar) {
      const g = c.S('g', {}, svg), yuk = 28 + k.satir.length * 30;
      c.S('rect', { x: cx - 150, y: cy - yuk / 2, width: 300, height: yuk, rx: 10, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
      k.satir.forEach((s, i) => yazi(c, g, cx, cy - yuk / 2 + 36 + i * 30 - (k.satir.length - 1) * 0, s, { size: 22, kalin: 600 }));
      gizle(g); await belir(c, g, 400);
      const hint = (i) => (i === k.kutu ? '' : k.ipucu);
      await c.choice({
        tag: 'Sıra sende', q: 'Kart hangi kutuya girer?', options: ['Verilen', 'İstenen', 'Ara değer'], answer: k.kutu,
        hints: [0, 1, 2].map(hint), right: 'Evet. ' + (k.kutu === 0 ? 'Problemde yazılı: verilen.' : k.kutu === 1 ? 'Bulunacak olan: istenen.' : 'Hesaplandı: ara değer.'),
      });
      const yuva = yuvalar[k.kutu][sayac[k.kutu]++];
      const son = renkli(c, svg, yuva[0], yuva[1], k.kisa, { hiza: 'start', size: 24, kalin: 700 });
      if (k.kutu === 0) son.style.fill = SAYI;
      gizle(son);
      await c.tween(550, (e) => { g.setAttribute('transform', `translate(${(yuva[0] - 60 - cx) * e * 0.5},${(yuva[1] - cy) * e * 0.5})`); g.style.opacity = 1 - e; }, Ders.ease.inOut);
      g.remove();
      await belir(c, son, 350);
    }
    c.clearSay();
    await c.say('Önce verilen ve istenen, sonra ilişki, sonra şekil.');
    c.note('<b>Verilen, istenen, ilişki; sonra şekil.</b> Örnek: istenen |TH|.', 'Şekle dök', 'e1-sekle-dok');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-e1', kicker: 'Konu E · Eşlik ve benzerlik problemleri', title: 'Çözmeden önce şekle dök', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Çözmeden önce şekle dök',
      hook: 'Bir tepenin yüksekliğini tırmanmadan, yere koyduğun bir <b>aynayla</b> bulabilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['Bir problemde verilenleri ve istenen şeyi ayırır.', 'Verilenler arasındaki ilişkileri bulur; verilenlerden hesapladığı sayıyı ara değer olarak yazar.', 'Durumu şekle döker: her verilen sayıyı şekilde bir kenara yerleştirir.'],
    scenes: [
      { title: 'Hatırla', goal: 'Hipotenüs ve açı-açı benzerliği.', run: hatirla },
      { title: 'Hakan’ın tepesi', goal: 'Tepenin yüksekliğini aynayla bulma problemi.', run: tepe },
      { title: 'Verilen ve istenen', goal: 'Verilenler ile istenen ayrı yazılır.', run: verilenIstenen },
      { title: 'İlişkiler', goal: 'Verilenleri birbirine bağlayan ilişkileri bul.', run: iliskiler },
      { title: 'Şekle dök', goal: 'Her verilen sayı şekilde bir kenara oturur.', run: sekleDok },
      { title: 'Stor perde', goal: 'Aynı yolu ikinci problemde uygula.', run: storPerde },
      { title: 'Verilen, istenen, ara değer', goal: 'Sayıları verilen, istenen ve ara değer olarak ayır.', run: araDeger },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir öğrenci Hakan’ın problemini şekil çizmeden okuyup 1350 / 527 oranını yazıyor. Hangisi doğrudur?',
        options: ['Oran kurmak her zaman doğrudur', 'Hangi kenarın hangisine karşılık geldiği şekil olmadan belli olmaz; önce şekle dökmeli', '1350 ve 527 verilen sayı olmadığı için kullanılamaz'], answer: 1,
        why: ['Oran, ancak karşılıklı kenarlar belliyse doğru kurulur; 1350 ile 527 karşılıklı kenarlar değil.', 'Karşılıklı kenarları şekil gösterir; sayıları önce şekle yerleştirmek gerekir.', '1350 ve 527 problemde verilmiştir; sorun, şekildeki yerleri bilinmeden kullanılmalarıdır.'],
        scene: 4,
      },
      {
        q: '13 m boyundaki bir merdiven duvara dayanıyor; duvardaki ucu yerden 12 m yüksekte. Merdivenin yerdeki ucunun duvara uzaklığı sorulursa istenen hangisidir?',
        options: ['Merdivenin boyu', 'Duvardaki ucun yüksekliği', 'Yerdeki ucun duvara uzaklığı'], answer: 2,
        why: ['Merdivenin boyu 13 m olarak verilmiş; istenen değil.', 'Duvardaki ucun yüksekliği 12 m olarak verilmiş; istenen değil.', 'Problem yerdeki ucun duvara uzaklığını soruyor; verilmeyen ve bulunacak olan odur.'],
        scene: 2,
      },
      {
        q: 'Aynı merdiven problemini şekle dökerken hangi dik üçgen çizilir?',
        options: ['Hipotenüsü 13 m, bir dik kenarı 12 m olan', 'Dik kenarları 13 m ve 12 m olan', 'Hipotenüsü 12 m, bir dik kenarı 13 m olan'], answer: 0,
        why: ['Merdivenin boyu hipotenüs, duvardaki yükseklik bir dik kenardır; istenen öteki dik kenardır.', 'Merdiven bir dik kenar olamaz; en uzun kenar hipotenüstür ve en büyük sayı 13 m’dir.', 'Hipotenüs en uzun kenardır; 12 m, 13 m’den kısa olduğu için hipotenüs olamaz.'],
        scene: 4,
      },
      {
        q: 'Hakan’ın problemindeki ayna A, L’den 2 m yerine 3 m ötede olsaydı |DA| kaç metre olurdu?',
        options: ['530 m', '524 m', '527 m'], answer: 1,
        why: ['530 m, 527 ile 3’ün toplanmasından çıkar; ayna D ile L arasında olduğundan 3 çıkarılır.', '|DA| = |DL| − |AL| = 527 − 3 = 524 m.', '527 m, |DL|’dir; |DA| değil.'],
        scene: 3,
      },
      {
        q: 'Stor perde problemindeki perde 75 cm yerine 90 cm indirilseydi şekilde |BK| kaç cm olurdu?',
        options: ['120 cm', '90 cm', '45 cm'], answer: 2,
        why: ['120 cm, 210 − 90’dır; perde ucunun masadan değil yerden yüksekliğidir.', '90 cm, perdenin inişidir; |BK| değil.', '|BK| = |BC| − iniş = 135 − 90 = 45 cm.'],
        scene: 5,
      },
    ],
    summary: [
      'Önce <b>verilen</b> ve <b>istenen</b> ayrılır.',
      'İlişkiler bulunur, ara değerler hesaplanır.',
      'Durum şekle dökülür: her sayı bir kenara oturur.',
      '<b>Önce ne verildi, ne isteniyor; sonra şekle dök.</b>',
    ],
    nextLesson: { href: 'e2-strateji.html', label: 'Sonraki: Strateji kur, uygula, kontrol et ›' },
  });
})();
