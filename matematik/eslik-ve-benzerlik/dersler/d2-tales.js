/* D2 — Tales teoremi: paraleller ve kesenler
   Birbirine paralel üç doğru, kendilerini kesen iki doğru üzerinde orantılı parçalar ayırır: |AB|/|BC| = |DE|/|EF|.
   Önce gölgeden fikir, sonra şehir planında sayılar, sonra köşegenle ispat (temel orantı iki kez), sonra örnekler, dört paralel, mum ve gölet.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D2)
   Bu dosyada yazılan araçlar: sema (KIT_D.paralelKesen sarmalayıcısı: harfler şeklin içinde, parça etiketleri yanda), oklar (paralellik işareti),
   mumSekli (mum ve gölge şeması), alev, poly, sat. */
(() => {
  'use strict';
  const { RENK, ara, uz, rad, yazi, renkli, cizgi, koy, nokta, gizle, belir, par, cevapla, cokgen, agirlik, aciYayi } = window.KIT;
  const B = window.KIT_B, D = window.KIT_D;
  const EL = B.ESLEME;                               // mavi, turuncu, yeşil: 1 yay, 2 yay, 3 yay
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez, MOR = RENK.dogru, GRI = D.GRI, SOLUK = RENK.soluk;
  const BEYAZ = '#e8ecff', DUVAR = '#58648f', KESIK = { 'stroke-dasharray': '10 8' };

  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const nk = (pts) => pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
  const poly = (c, p, pts, renk, op) => c.S('polygon', { points: nk(pts), fill: renk, 'fill-opacity': op, stroke: 'none' }, p);
  const sat = (c, p, x, y, parcalar, size = 26) => renkli(c, p, x, y, parcalar, { hiza: 'start', size, kalin: 700 });
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).flat().forEach((e) => e.remove()); };
  const sol = (c, el, ms = 350) => belir(c, el, ms, 0);
  const vurgula = (c, hatlar, ms = 700) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + 4 * Math.sin(Math.PI * e)))); };
  const buyut = (c, yazilar, ms = 800, boy = 24) => c.tween(ms, (e) => liste(yazilar).forEach((t) => t.setAttribute('font-size', boy + 6 * Math.sin(Math.PI * e))));
  /* a/b biçiminde renkli parçalar. */
  const oran = (a, b, ra, rb) => [[a, ra], '/', [b, rb]];
  const AB_BC_DE_EF = (g = 0) => [...oran('|AB|', '|BC|', TURUNCU, YESIL), ' = ', ...oran('|DE|', '|EF|', TURUNCU, YESIL)];

  /* n adet paralellik oku (">") parçanın ortasına; aciD: doğrultu (derece). */
  function oklar(c, p, M, aciD, n, renk = BEYAZ) {
    const g = c.S('g', {}, p), a = rad(aciD);
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * 10;
      c.S('path', { d: 'M-5,-7 L3,0 L-5,7', fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: `translate(${M[0] + Math.cos(a) * off},${M[1] + Math.sin(a) * off}) rotate(${aciD})` }, g);
    }
    return g;
  }

  /* KIT_D.paralelKesen sarmalayıcısı. Birim (x, y) → piksel: [X0 + x·s, Y0 + y·s]. Her şey başta gizlidir.
     Araçtaki iki eksik burada giderilir: (1) varsayılan harf konumu kesenin ve paralelin üstüne düşüyor → harfler, ikisinin yaptığı geniş açının açıortayına
     (o.ic: paralelin altına, kesenlerin arasına; değilse üstüne, dışarıya) konur; (2) parcaEtiket, kesen eğik ve paralel aralığı dar olunca etiketi komşu şeritlere itiyor → yan() etiketi aynı
     yükseklikte yatay kaydırır. */
  function sema(c, p, o) {
    const s = o.s, P = (u) => [o.X0 + u[0] * s, o.Y0 + u[1] * s];
    const aD = (a, b) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    const ads = o.adlar || null, hz = o.harfSize || 24, ic = o.ic !== false, du = o.harfUzak || 26, kays = [];
    /* Harf, kesenle paralelin yaptığı geniş açının açıortayında durur: ic → paralelin altında, kesenlerin arasında; değilse paralelin üstünde, dışarıda. */
    const kesen = (k, ad, harf, yonu) => {
      const a = P(k[0]), b = P(k[1]), th = Math.atan(Math.abs((b[1] - a[1]) / (b[0] - a[0]))), fi = ic ? Math.PI / 2 - yonu * th / 2 : (3 * Math.PI) / 2 + yonu * th / 2;
      const kay = o.kay ? o.kay[yonu > 0 ? 0 : 1] : [du * Math.cos(fi), du * Math.sin(fi)]; kays.push(kay);
      return { nokta: a, aci: aD(a, b), ad: ads ? ad : null, harf, kay };
    };
    const pk = D.paralelKesen(c, p, {
      aci: 0, uzatma: o.uzatma || 36, harfSize: hz,
      paraleller: o.ys.map((y, j) => ({ nokta: P([0, y]), ad: ads ? ads[j] : null })),
      keseler: [kesen(o.sol, 'd₁', o.harfSol, 1), kesen(o.sag, 'd₂', o.harfSag, -1)],
    });
    const K = pk.K;
    const hatlar = [...pk.paraleller.map((q) => q.hat), ...pk.keseler.map((q) => q.hat)];
    const parAd = pk.paraleller.map((q) => q.ad).filter(Boolean), kesAd = pk.keseler.map((q) => q.ad).filter(Boolean);
    const harf = (i, j) => [pk.noktalar[i][j], pk.adlar[i][j]].filter(Boolean);
    const solN = pk.noktalar[0].map((_, j) => harf(0, j)).flat(), sagN = pk.noktalar[1].map((_, j) => harf(1, j)).flat();
    gizle(hatlar, parAd, kesAd, solN, sagN);
    const yan = (i, j, metin, renk, oo = {}) => {
      const a = K[i][j], b = K[i][j + 1], m = ara(a, b, oo.t == null ? 0.5 : oo.t), size = oo.size || 24;
      const eg = Math.abs((b[0] - a[0]) / (b[1] - a[1])), w = String(metin).length * size * 0.56, yonu = i === 0 ? -1 : 1;
      return yazi(c, pk.g, m[0] + yonu * (14 + eg * size * 0.5 + w / 2 + (oo.uzak || 0)), m[1] + size * 0.33, metin, { size, kalin: 700, renk });
    };
    return { pk, P, K, kays, hatlar, parAd, kesAd, harf, solN, sagN, yan, parca: pk.parcaCiz };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: temel orantı.
    const g1 = c.S('g', {}, svg);
    const T = D.ucgenTaban(6, 9, 7.5, [290, 500], 55), [A, Bp, C] = T, M = agirlik(T);
    cokgen(c, g1, T, MAVI, { harf: ['A', 'B', 'C'], harfSize: 30, dolgu: 0.1 });
    const Dn = ara(A, Bp, 1 / 3), En = ara(A, C, 1 / 3);
    const ade = cokgen(c, g1, [A, Dn, En], TURUNCU, { dolgu: 0.22, w: 3.5 }), cit = window.KIT.dogru(c, g1, Dn, En);
    const dis = (P, Q, X) => {
      const d = uz(P, Q); let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
      if ((X[0] - M[0]) * nx + (X[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; }
      return [X[0] + nx * 32, X[1] + ny * 32 + 9];
    };
    const [dx, dy] = dis(A, Bp, Dn), [ex, ey] = dis(A, C, En);
    const hd = yazi(c, g1, dx, dy, 'D', { size: 28, kalin: 700, renk: TURUNCU }), he = yazi(c, g1, ex, ey, 'E', { size: 28, kalin: 700, renk: TURUNCU });
    const L = (P, Q, m, r) => D.kenarYazi(c, g1, P, Q, m, r, { merkez: M, size: 28, ic: true, uzak: 16 });
    const lAD = L(A, Dn, '2', TURUNCU), lDB = L(Dn, Bp, '4', YESIL), lAE = L(A, En, '3', TURUNCU), lEC = L(En, C, '?', YESIL);
    gizle(ade.g, cit.g, hd, he, lAD, lDB, lAE, lEC); gizle(g1);
    await belir(c, g1, 450); await belir(c, [ade.g, cit.g, hd, he], 400); await belir(c, [lAD, lDB, lAE, lEC], 350);
    await c.choice({
      tag: 'Hatırla', q: 'DE // BC olan ABC üçgeninde |AD| = 2, |DB| = 4 ve |AE| = 3 olsun. |EC| kaçtır?',
      options: ['1,5', '6', '5'], answer: 1,
      hints: ['|AD|/|DB| = |AE|/|EC| yazılır: 2/4 = 3/|EC|.', '', '|AD|/|DB| = |AE|/|EC| yazılır: 2/4 = 3/|EC|.'],
      right: 'Evet. 2/4 = 3/|EC| olduğundan |EC| = 6.',
    });
    c.clearSay();
    cevapla(lEC, '6');
    await c.say('|AD|/|DB| = |AE|/|EC| olduğundan |EC| = 6.', { speak: 'A D bölü D B, A E bölü E C’ye eşit olduğundan E C uzunluğu altı.' });
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: iki açı eşitse.
    const P = [[170, 150], [80, 400], [360, 400]], k = 0.55, E0 = [620, 400];
    const Q = P.map((q) => [E0[0] + (q[0] - P[1][0]) * k, E0[1] + (q[1] - P[1][1]) * k]);
    const es = B.esleme(c, svg, P, Q, { yayR: 22 });
    const yz = B.eslemeYazisi(c, svg, 500, 70, 'ABC', 'DEF', '~', { ucgenSimge: false, size: 44 });
    gizle(es.kenarlar, es.yaylar[2], es.yaylar[5], yz); gizle(es.g);
    await belir(c, es.g, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki üçgenin karşılıklı iki açısı eşitse hangisi doğrudur?',
      options: ['Hiçbir şey söylenemez', 'Üçgenler benzerdir; karşılıklı kenarlar orantılıdır', 'Üçgenler eştir; karşılıklı kenarlar eşittir'], answer: 1,
      hints: ['İki açı eşitse üçüncü açı da eşittir: Açı-Açı benzerliği; kenarlar orantılıdır.', '', 'İki açı eşitse üçüncü açı da eşittir: Açı-Açı benzerliği; kenarlar orantılıdır.'],
      right: 'Evet. Açı-Açı: üçgenler benzerdir.',
    });
    c.clearSay();
    await par(c.say('Açı-Açı: üçgenler benzerdir, karşılıklı kenarlar orantılıdır.'), (async () => { await belir(c, [es.yaylar[2], es.yaylar[5]], 450); await belir(c, es.kenarlar, 500); await belir(c, yz, 450); })());
  }

  /* ---- 2. Tales ve gölge ---- */
  async function golge(c) {
    const svg = c.svg(1000, 562);
    const G = 440, ap = [300, 240], bl = [240, G], br = [360, G], bc = [300, G], tipP = [600, G], st = [70, 370], sb = [70, G], tipS = [175, G];
    const yer = cizgi(c, svg, [30, G], [660, G], RENK.cizgi, 3);
    const buyukU = poly(c, svg, [ap, bc, tipP], MAVI, 0.09), kucukU = poly(c, svg, [st, sb, tipS], TURUNCU, 0.22);
    const piramit = cokgen(c, svg, [ap, bl, br], MAVI, { dolgu: 0.3, w: 3.5 });
    const golgeP = cizgi(c, svg, bc, tipP, MAVI, 9), golgeS = cizgi(c, svg, sb, tipS, TURUNCU, 9), cubuk = cizgi(c, svg, st, sb, TURUNCU, 7);
    const dikS = aciYayi(c, svg, sb, st, tipS, RENK.cizgi, 28, { dik: true }), dikP = aciYayi(c, svg, bc, ap, tipP, RENK.cizgi, 34, { dik: true });
    const yuk = cizgi(c, svg, ap, bc, MAVI, 2.5, KESIK);   // piramidin yüksekliği: dik açı işareti boşta durmasın
    const isinS = cizgi(c, svg, [10, 330], tipS, MOR, 3.5, KESIK), isinP = cizgi(c, svg, [180, 160], tipP, MOR, 3.5, KESIK);
    const yayS = B.esitYay(c, svg, tipS, sb, st, 1, SARI, { r: 34 }), yayP = B.esitYay(c, svg, tipP, bc, ap, 1, SARI, { r: 50 });
    // boy ölçüsü (piramit): sol tarafta
    const olc = c.S('g', {}, svg);
    cizgi(c, olc, [205, ap[1]], [205, G], MAVI, 3); cizgi(c, olc, [195, ap[1]], [215, ap[1]], MAVI, 3); cizgi(c, olc, [195, G], [215, G], MAVI, 3);
    const lH = yazi(c, svg, 193, 350, '?', { hiza: 'end', size: 28, kalin: 700, renk: MAVI });
    const lC = yazi(c, svg, 36, 412, '2 m', { size: 26, kalin: 700, renk: TURUNCU }), lGS = yazi(c, svg, 122, G + 38, '3 m', { size: 26, kalin: 700, renk: TURUNCU });
    const lGP = yazi(c, svg, 450, G + 38, '210 m', { size: 26, kalin: 700, renk: MAVI });
    const RX = 680;
    const r1 = sat(c, svg, RX, 170, [['boyların oranı', SARI]]), r2 = sat(c, svg, RX, 212, ['= ', ['gölgelerin oranı', SARI]]);
    const e1 = sat(c, svg, RX, 290, [['2/3', TURUNCU], ' = ', ['?', MAVI], ['/210', MAVI]]), e2 = sat(c, svg, RX, 340, [['?', MAVI], ' = 140 m']);
    const tales = yazi(c, svg, RX, 430, 'Tales teoremi', { hiza: 'start', size: 30, kalin: 700, renk: SARI });
    gizle(yer, buyukU, kucukU, piramit.g, golgeP, golgeS, cubuk, dikS, dikP, yuk, isinS, isinP, yayS, yayP, olc, lH, lC, lGS, lGP, r1, r2, e1, e2, tales);

    await par(c.say('Tales, Mısır’daki piramitlerin yüksekliğini gölgelerden yararlanarak ölçmüştür.'), belir(c, [yer, piramit.g], 500));
    await par(c.say('Toprağa bir çubuk dikilir; gölgesi ölçülür.'), belir(c, [cubuk, golgeS], 500));
    await par(c.say('Piramidin gölgesi de aynı saatte ölçülür.'), belir(c, golgeP, 500));
    await par(c.say('Çubuk da piramit de yere diktir.'), belir(c, [yuk, dikS, dikP], 500));
    await par(c.say('Güneş ışınları paraleldir; aynı açıyla gelir.'), (async () => { await belir(c, [isinS, isinP], 600); await belir(c, [yayS, yayP], 450); })());
    await par(c.say('Açı-Açı: iki gölge üçgeni benzerdir.'), belir(c, [kucukU, buyukU], 600));
    await par(c.say('Boyların oranı, gölgelerin oranına eşittir.'), belir(c, [r1, r2], 500));
    await par(c.say('Çubuk 2 m, gölgesi 3 m; piramidin gölgesi 210 m olsun.', { speak: 'Çubuk iki metre, gölgesi üç metre; piramidin gölgesi iki yüz on metre olsun.' }), belir(c, [lC, lGS, lGP, lH, olc], 500));
    await par(c.say('2/3 = yükseklik/210 olduğundan yükseklik 140 m çıkar.', { speak: 'İki bölü üç eşittir yükseklik bölü iki yüz on olduğundan yükseklik yüz kırk metre çıkar.' }), (async () => {
      await belir(c, e1, 450); await belir(c, e2, 450); cevapla(lH, '140 m');
    })());
    await belir(c, [r1, r2, e1, e2], 350, 0);
    await par(c.say('Tales teoremi, paralel doğrular ve kesenler arasındaki ilişkiyi açıklar.'), (async () => { await belir(c, tales, 450); await vurgula(c, [isinS, isinP], 900); })());
  }

  /* ---- 3. Paraleller ve kesenler ---- */
  async function paraleller(c) {
    const svg = c.svg(1000, 562);
    const S = sema(c, svg, { s: 30, X0: 160, Y0: 80, ys: [0, 4.8, 12], sol: [[6, 0], [-3, 12]], sag: [[10, 0], [15, 12]], harfSol: ['A', 'B', 'C'], harfSag: ['D', 'E', 'F'], adlar: ['d₃', 'd₄', 'd₅'] });
    const pAB = S.parca(0, 0, TURUNCU, 9), pBC = S.parca(0, 1, YESIL, 9), pDE = S.parca(1, 0, TURUNCU, 9), pEF = S.parca(1, 1, YESIL, 9);
    const lAB = S.yan(0, 0, '60 m', TURUNCU), lBC = S.yan(0, 1, '90 m', YESIL), lDE = S.yan(1, 0, '52 m', TURUNCU), lEF = S.yan(1, 1, '78 m', YESIL);
    const oranlar = sat(c, svg, 706, 250, [['60', TURUNCU], '/', ['90', YESIL], ' = ', ['52', TURUNCU], '/', ['78', YESIL], ' = 2/3'], 25);
    const teo = sat(c, svg, 706, 340, AB_BC_DE_EF(), 25);
    gizle(pAB, pBC, pDE, pEF, lAB, lBC, lDE, lEF, oranlar, teo);

    await par(c.say('Bir kentte üç paralel sokağı iki cadde kesiyor.'), belir(c, S.hatlar, 600));
    await par(c.say('Sokaklara d₃, d₄ ve d₅; caddelere d₁ ve d₂ diyelim.', { speak: 'Sokaklara d üç, d dört ve d beş; caddelere d bir ve d iki diyelim.' }), belir(c, [...S.parAd, ...S.kesAd], 500));
    await par(c.say('Sol cadde sokakları A, B ve C noktalarında kesiyor.'), belir(c, S.solN, 500));
    await par(c.say('Sağ cadde aynı sokakları D, E ve F noktalarında kesiyor.'), belir(c, S.sagN, 500));
    await belir(c, S.kesAd, 350, 0);
    await par(c.say('Sol caddede |AB| = 60 m, |BC| = 90 m.', { speak: 'Sol caddede A B uzunluğu altmış metre, B C uzunluğu doksan metre.' }), belir(c, [pAB, pBC, lAB, lBC], 500));
    await belir(c, S.parAd, 350, 0);
    await par(c.say('Sağ caddede |DE| = 52 m, |EF| = 78 m.', { speak: 'Sağ caddede D E uzunluğu elli iki metre, E F uzunluğu yetmiş sekiz metre.' }), belir(c, [pDE, pEF, lDE, lEF], 500));
    await par(c.say('Karşılıklı parçalar eşit değil: 60 m ile 52 m.', { speak: '[thoughtful] Karşılıklı parçalar eşit değil: altmış metre ile elli iki metre.' }), par(vurgula(c, [pAB, pDE], 900), buyut(c, [lAB, lDE], 900)));
    await par(c.say('Ama oranlar eşit: 60/90 = 52/78 = 2/3.', { speak: 'Ama oranlar eşit: altmış bölü doksan, elli iki bölü yetmiş sekiz, iki bölü üç.' }), belir(c, oranlar, 500));
    await par(c.say('Bu her üç paralel için doğru: Tales teoremi.'), vurgula(c, S.pk.paraleller.map((q) => q.hat), 1000));
    await par(c.say('Paralel üç doğru kesenlerde orantılı parça ayırır: |AB|/|BC| = |DE|/|EF|.', { speak: 'Paralel üç doğru kesenlerde orantılı parça ayırır: A B bölü B C, D E bölü E F’ye eşit.' }), belir(c, teo, 500));
  }

  /* ---- 4 ve 5. İspat şeması: 20 birim → piksel; sağ üstte küçük, sol tarafta ispat satırları ---- */
  function ispatSekli(c, p) {
    const dolgu = c.S('g', {}, p);
    const S = sema(c, p, { s: 20, X0: 612, Y0: 48, ys: [0, 4.8, 12], sol: [[6, 0], [-3, 12]], sag: [[10, 0], [15, 12]], harfSol: ['A', 'B', 'C'], harfSag: ['D', 'E', 'F'], adlar: ['d₃', 'd₄', 'd₅'], ic: false, kay: [[-28, -14], [28, -14]], harfSize: 22, uzatma: 46 });
    const [A, Bq, Cq] = S.K[0], [Dq, Eq, Fq] = S.K[1], Pt = S.P([9.6, 4.8]);
    const acf = poly(c, dolgu, [A, Cq, Fq], MAVI, 0.16), afd = poly(c, dolgu, [A, Fq, Dq], TURUNCU, 0.2);
    const AF = cizgi(c, p, A, Fq, BEYAZ, 4.5), pn = nokta(c, p, Pt, RENK.yazi, 5), pl = yazi(c, p, Pt[0] + 7, Pt[1] - 12, 'P', { size: 22, kalin: 700 });
    return { S, A, Bq, Cq, Dq, Eq, Fq, Pt, dolgu, acf, afd, AF, pn, pl };
  }
  const NO = (k) => [k + '.  ', SOLUK];
  const ISPAT = { x: 30, y: 205, aralik: 52, size: 21, gerekceSize: 17, bosluk: 18, baslikSize: 25 };
  const VERILEN = 'd₃ // d₄ // d₅', ISTENEN = AB_BC_DE_EF();
  const ADIM3 = () => [NO(3), ...oran('|AB|', '|BC|', TURUNCU, YESIL), ' = ', ...oran('|AP|', '|PF|', TURUNCU, YESIL)];

  async function ispat1(c) {
    const svg = c.svg(1000, 562);
    const f = ispatSekli(c, svg), S = f.S;
    const tahta = D.ispatTahtasi(c, svg, Object.assign({ verilen: VERILEN, istenen: ISTENEN }, ISPAT));
    const s1 = tahta.ekle([NO(1), 'AF’yi çiz; AF, d₄’ü P’de kessin'], 'yardımcı çizgi');
    const s2 = tahta.ekle([NO(2), 'ACF’de BP // CF; B ∈ AC, P ∈ AF'], 'd₄ // d₅');
    const s3 = tahta.ekle(ADIM3(), 'temel orantı, köşe A');
    const pAB = S.parca(0, 0, TURUNCU, 7), pBC = S.parca(0, 1, YESIL, 7), pAP = cizgi(c, svg, f.A, f.Pt, TURUNCU, 7), pPF = cizgi(c, svg, f.Pt, f.Fq, YESIL, 7);
    const okBP = oklar(c, svg, ara(f.Bq, f.Pt, 0.5), 0, 2), okCF = oklar(c, svg, ara(f.Cq, f.Fq, 0.5), 0, 2);
    gizle(S.hatlar, S.parAd, S.kesAd, S.solN, S.sagN, tahta.baslik, f.acf, f.afd, f.AF, f.pn, f.pl, pAB, pBC, pAP, pPF, okBP, okCF);

    await par(c.say('Bunu her üç paralel için göstermek istiyoruz.'), (async () => { await belir(c, [...S.hatlar, ...S.parAd, ...S.kesAd, ...S.solN, ...S.sagN], 600); await belir(c, tahta.baslik, 450); })());
    await c.say('Elimizde temel orantı teoremi var; ona üçgen gerekir.', { speak: '[curious] Elimizde temel orantı teoremi var; ona üçgen gerekir.' });
    await par(c.say('A ile F’yi birleştirelim: AF köşegeni.', { speak: 'A ile F’yi birleştirelim: A F köşegeni.' }), (async () => { await belir(c, f.AF, 450); await tahta.ac(s1); })());
    await par(c.say('AF, d₄ doğrusunu P noktasında kesiyor.', { speak: 'A F, d dört doğrusunu P noktasında kesiyor.' }), belir(c, [f.pn, f.pl], 450));
    await par(c.say('İki üçgen oluştu: ACF ve AFD.', { speak: 'İki üçgen oluştu: A C F ve A F D.' }), belir(c, [f.acf, f.afd], 600));
    await par(c.say('ACF üçgeninde BP, CF’ye paralel; d₄ // d₅.', { speak: 'A C F üçgeninde B P, C F’ye paralel; d dört, d beşe paralel.' }), (async () => { await belir(c, [okBP, okCF], 450); await tahta.ac(s2); })());
    await par(c.say('Temel orantı A köşesinden okunur: yakın parça bölü uzak parça.'), belir(c, [pAB, pBC, pAP, pPF], 500));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'ACF üçgeninde BP // CF. Temel orantıya göre |AB|/|BC| hangi orana eşittir?',
      options: ['|AP|/|AF|', '|BP|/|CF|', '|AP|/|PF|'], answer: 2,
      hints: ['Köşe A; parçalar AB, BC ve AP, PF.', 'Yakın parça bölü uzak parça: AB/BC ile AP/PF.', ''],
      right: 'Evet. Köşe A’dan: |AB|/|BC| = |AP|/|PF|.',
    });
    await par(c.say('Temel orantı: |AB|/|BC| = |AP|/|PF|.', { speak: 'Temel orantı: A B bölü B C, A P bölü P F’ye eşit.' }), tahta.ac(s3));
  }

  async function ispat2(c) {
    const svg = c.svg(1000, 562);
    const f = ispatSekli(c, svg), S = f.S;
    const tahta = D.ispatTahtasi(c, svg, Object.assign({ verilen: VERILEN, istenen: ISTENEN }, ISPAT));
    const s3 = tahta.ekle(ADIM3(), 'temel orantı, köşe A');
    const s4 = tahta.ekle([NO(4), 'AFD’de PE // AD; P ∈ FA, E ∈ FD'], 'd₄ // d₃');
    const s5 = tahta.ekle([NO(5), ...oran('|FP|', '|PA|', YESIL, TURUNCU), ' = ', ...oran('|FE|', '|ED|', YESIL, TURUNCU)], 'temel orantı, köşe F');
    const s6 = tahta.ekle([NO(6), ...oran('|AP|', '|PF|', TURUNCU, YESIL), ' = ', ...oran('|DE|', '|EF|', TURUNCU, YESIL)], 'oranların tersleri de eşit');
    const s7 = tahta.ekle([NO(7), ...oran('|AB|', '|BC|', TURUNCU, YESIL), ' = ', ...oran('|AP|', '|PF|', TURUNCU, YESIL), ' = ', ...oran('|DE|', '|EF|', TURUNCU, YESIL)], '3 ve 6’da |AP|/|PF| ortak ∎');
    s3.el.style.opacity = 0.5; s3.gorunur = true;
    const pAP = cizgi(c, svg, f.A, f.Pt, TURUNCU, 7), pPF = cizgi(c, svg, f.Pt, f.Fq, YESIL, 7), pDE = S.parca(1, 0, TURUNCU, 7), pEF = S.parca(1, 1, YESIL, 7);
    const hFA = cizgi(c, svg, f.Fq, f.A, SARI, 8), hFD = cizgi(c, svg, f.Fq, f.Dq, SARI, 8);
    const okPE = oklar(c, svg, ara(f.Pt, f.Eq, 0.5), 0, 2), okAD = oklar(c, svg, ara(f.A, f.Dq, 0.5), 0, 2);
    gizle(pAP, pPF, pDE, pEF, hFA, hFD, okPE, okAD);
    [...S.hatlar, ...S.parAd, ...S.kesAd, ...S.solN, ...S.sagN].forEach((e) => { e.style.opacity = 1; }); gizle(S.kesAd);
    f.acf.style.opacity = 1; f.afd.style.opacity = 1;

    await par(c.say('AFD üçgenine bu kez F köşesinden bakalım.', { speak: 'A F D üçgenine bu kez F köşesinden bakalım.' }), (async () => { await belir(c, f.acf, 500, 0.25); f.afd.setAttribute('fill-opacity', 0.34); })());
    await par(c.say('F’den iki kenar çıkıyor: FA ve FD.', { speak: 'F’den iki kenar çıkıyor: F A ve F D.' }), (async () => { await belir(c, [hFA, hFD], 400); await c.wait(500); await belir(c, [hFA, hFD], 400, 0); })());
    await par(c.say('PE, AD’ye paralel; FA’yı P’de, FD’yi E’de kesiyor.', { speak: 'P E, A D’ye paralel; F A’yı P’de, F D’yi E’de kesiyor.' }), (async () => { await belir(c, [okPE, okAD], 450); await tahta.ac(s4); })());
    await par(c.say('Temel orantı: |FP|/|PA| = |FE|/|ED|.', { speak: 'Temel orantı: F P bölü P A, F E bölü E D’ye eşit.' }), (async () => { await belir(c, [pAP, pPF, pDE, pEF], 450); await tahta.ac(s5); })());
    await par(c.say('Terslerini alalım: |AP|/|PF| = |DE|/|EF|.', { speak: 'Terslerini alalım: A P bölü P F, D E bölü E F’ye eşit.' }), tahta.ac(s6));
    await par(c.say('İki eşitlikte de |AP|/|PF| var.', { speak: 'İki eşitlikte de A P bölü P F var.' }), (async () => { await par(tahta.parla(s3, SARI, 900), tahta.parla(s6, SARI, 900)); await vurgula(c, [pAP, pPF], 700); })());
    await par(c.say('Öyleyse |AB|/|BC| = |AP|/|PF| = |DE|/|EF|.', { speak: 'Öyleyse A B bölü B C, A P bölü P F, D E bölü E F’ye eşit.' }), tahta.ac(s7));
    await par(c.say('İspat tamam: Tales teoremi her üç paralel için doğru.'), tahta.parla(s7, YESIL, 1000));
    c.note('<b>Tales:</b> paralel üç doğru kesenlerde orantılı parça ayırır: |AB|/|BC| = |DE|/|EF|.', 'Tales', 'd2-tales');
  }

  /* ---- 6. Tales'i kullan ---- */
  async function kullan(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const S = sema(c, g1, { s: 24, X0: -4, Y0: 150, ys: [0, 3.2, 8], sol: [[8, 0], [2, 8]], sag: [[14, 0], [26.69, 8]], harfSol: ['A', 'B', 'C'], harfSag: ['D', 'E', 'F'] });
    const pAB = S.parca(0, 0, TURUNCU, 9), pBC = S.parca(0, 1, YESIL, 9), pDE = S.parca(1, 0, TURUNCU, 9), pEF = S.parca(1, 1, YESIL, 9);
    const lAB = S.yan(0, 0, '40 m', TURUNCU), lBC = S.yan(0, 1, '60 m', YESIL), lDE = S.yan(1, 0, '60 m', TURUNCU), lEF = S.yan(1, 1, '?', YESIL);
    const f1 = sat(c, g1, 706, 190, AB_BC_DE_EF(), 25), f2 = sat(c, g1, 706, 250, [['40', TURUNCU], '/', ['60', YESIL], ' = ', ['60', TURUNCU], '/', ['|EF|', YESIL]], 25);
    const f3 = sat(c, g1, 706, 310, ['40·', ['|EF|', YESIL], ' = 3600'], 25), f4 = sat(c, g1, 706, 360, [['|EF|', YESIL], ' = 90 m'], 25);
    gizle(S.hatlar, S.solN, S.sagN, pAB, pBC, pDE, pEF, lAB, lBC, lDE, lEF, f1, f2, f3, f4);

    await par(c.say('Sol caddede |AB| = 40 m ve |BC| = 60 m.', { speak: 'Sol caddede A B uzunluğu kırk metre ve B C uzunluğu altmış metre.' }), (async () => { await belir(c, [...S.hatlar, ...S.solN, ...S.sagN], 500); await belir(c, [pAB, pBC, lAB, lBC], 500); })());
    await par(c.say('Sağ caddede |DE| = 60 m; |EF| aranıyor.', { speak: 'Sağ caddede D E uzunluğu altmış metre; E F uzunluğu aranıyor.' }), belir(c, [pDE, pEF, lDE, lEF], 500));
    await par(c.say('Tales: |AB|/|BC| = |DE|/|EF|.', { speak: 'Tales: A B bölü B C, D E bölü E F’ye eşit.' }), belir(c, f1, 500));
    await par(c.say('Sayıları yazalım: 40/60 = 60/|EF|.', { speak: 'Sayıları yazalım: kırk bölü altmış eşittir altmış bölü E F.' }), (async () => { await belir(c, f1, 300, 0); await belir(c, f2, 500); })());
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '40/60 = 60/|EF| ise |EF| kaç metredir?', options: ['40 m', '90 m', '100 m'], answer: 1,
      hints: ['|EF|, |DE|’den büyük olmalı: 60’ın 3/2 katı.', '', 'İçler dışlar: 40·|EF| = 60·60.'],
      right: 'Evet. 40·|EF| = 3600 olduğundan |EF| = 90 m.',
    });
    await par(c.say('40·|EF| = 3600; |EF| = 90 m.', { speak: 'Kırk çarpı E F eşittir üç bin altı yüz; E F uzunluğu doksan metre.' }), (async () => {
      await belir(c, f2, 300, 0); await belir(c, f3, 450); await belir(c, f4, 450); cevapla(lEF, '90 m');
    })());
    c.clearSay();
    await sil(c, g1, 450);

    // Sıra sende: |AB| aranıyor.
    const g2 = c.S('g', {}, svg);
    const S2 = sema(c, g2, { s: 17, X0: 108, Y0: 170, ys: [0, 3.6, 9], sol: [[8, 0], [-4, 9]], sag: [[14, 0], [31.86, 9]], harfSol: ['A', 'B', 'C'], harfSag: ['D', 'E', 'F'] });
    const qAB = S2.parca(0, 0, TURUNCU, 8), qBC = S2.parca(0, 1, YESIL, 8), qDE = S2.parca(1, 0, TURUNCU, 8), qEF = S2.parca(1, 1, YESIL, 8);
    const mAB = S2.yan(0, 0, '?', TURUNCU), mBC = S2.yan(0, 1, '9 m', YESIL), mDE = S2.yan(1, 0, '8 m', TURUNCU), mEF = S2.yan(1, 1, '12 m', YESIL);
    const h1 = sat(c, g2, 706, 300, [['8', TURUNCU], '/', ['12', YESIL], ' = 2/3'], 25), h2 = sat(c, g2, 706, 350, [['|AB|', TURUNCU], ' = 9·2/3 = 6 m'], 25);
    gizle(S2.hatlar, S2.solN, S2.sagN, qAB, qBC, qDE, qEF, mAB, mBC, mDE, mEF, h1, h2); gizle(g2);
    await belir(c, g2, 300);
    await belir(c, [...S2.hatlar, ...S2.solN, ...S2.sagN], 500); await belir(c, [qAB, qBC, qDE, qEF, mAB, mBC, mDE, mEF], 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir caddede |BC| = 9 m. Öbür caddede |DE| = 8 m ve |EF| = 12 m. |AB| kaç metredir?', options: ['8 m', '13,5 m', '6 m'], answer: 2,
      hints: ['|AB|/|BC| = |DE|/|EF|; |AB|/9 = 8/12.', '|AB|, |BC|’den küçük olmalı; 8/12 birden küçük.', ''],
      right: 'Evet. |AB|/9 = 8/12 olduğundan |AB| = 6 m.',
    });
    cevapla(mAB, '6 m');
    await par(c.say('8/12 = 2/3; |AB| = 9·2/3 = 6 m.', { speak: 'Sekiz bölü on iki, yani iki bölü üç; A B uzunluğu dokuz çarpı iki bölü üç, yani altı metre.' }), (async () => { await belir(c, h1, 450); await belir(c, h2, 450); })());
  }

  /* ---- 7. Dört paralel ---- */
  async function dortParalel(c) {
    const svg = c.svg(1000, 562);
    const S = sema(c, svg, { s: 27, X0: 4, Y0: 120, ys: [0, 1.2, 3, 6], sol: [[10, 0], [2, 6]], sag: [[14, 0], [33.08, 6]], harfSol: ['A', 'B', 'C', 'K'], harfSag: ['D', 'E', 'F', 'L'], adlar: ['d₃', 'd₄', 'd₅', 'd₆'], harfUzak: 19 });
    const h = (i, j) => S.harf(i, j);
    const cerceve = (x0, y0, x1, y1, renk) => { const r = c.S('rect', { x: x0, y: y0, width: x1 - x0, height: y1 - y0, rx: 12, fill: 'none', stroke: renk, 'stroke-width': 3.5 }, svg); gizle(r); return r; };
    const y3 = S.pk.paraleller[0].hat.getAttribute('y1') * 1, y5 = S.K[0][2][1], y4 = S.K[0][1][1], y6 = S.K[0][3][1];
    const cMavi = cerceve(118, y3 - 26, 730, y5 + 22, MAVI), cTur = cerceve(18, y4 - 22, 940, y6 + 26, TURUNCU);
    const piece = (i, j, renk) => { const l = S.parca(i, j, renk, 7); gizle(l); return l; };
    const pAB = piece(0, 0, TURUNCU), pBC = piece(0, 1, YESIL), pCK = piece(0, 2, MAVI), pDE = piece(1, 0, TURUNCU), pEF = piece(1, 1, YESIL), pFL = piece(1, 2, MAVI);
    const lAB = S.yan(0, 0, '20 m', TURUNCU), lBC = S.yan(0, 1, '30 m', YESIL), lCK = S.yan(0, 2, '50 m', MAVI), lDE = S.yan(1, 0, '40 m', TURUNCU), lEF = S.yan(1, 1, '?', YESIL), lFL = S.yan(1, 2, '?', MAVI);
    const q1 = sat(c, svg, 40, 420, AB_BC_DE_EF(), 30), q2 = sat(c, svg, 40, 420, [...oran('|BC|', '|CK|', YESIL, MAVI), ' = ', ...oran('|EF|', '|FL|', YESIL, MAVI)], 30);
    const n1 = sat(c, svg, 40, 420, [['20', TURUNCU], '/', ['30', YESIL], ' = ', ['40', TURUNCU], '/', ['|EF|', YESIL]], 30);
    const n2 = sat(c, svg, 40, 480, [['30', YESIL], '/', ['50', MAVI], ' = ', ['60', YESIL], '/', ['|FL|', MAVI]], 30);
    gizle(lAB, lBC, lCK, lDE, lEF, lFL, q1, q2, n1, n2);

    await par(c.say('Paralel doğrular dört olsun: d₃, d₄, d₅ ve d₆.', { speak: 'Paralel doğrular dört olsun: d üç, d dört, d beş ve d altı.' }), belir(c, [S.hatlar, S.parAd].flat(), 600));
    await par(c.say('Tales teoremi, seçilen her üç paralel için geçerli.'), vurgula(c, S.pk.paraleller.map((q) => q.hat), 1000));
    await par(c.say('d₃, d₄, d₅ için: |AB|/|BC| = |DE|/|EF|.', { speak: 'd üç, d dört, d beş için: A B bölü B C, D E bölü E F’ye eşit.' }), (async () => {
      await par(belir(c, cMavi, 450), belir(c, [h(0, 0), h(0, 1), h(0, 2), h(1, 0), h(1, 1), h(1, 2)].flat(), 450)); await belir(c, q1, 450);
    })());
    await par(c.say('d₄, d₅, d₆ için: |BC|/|CK| = |EF|/|FL|.', { speak: 'd dört, d beş, d altı için: B C bölü C K, E F bölü F L’ye eşit.' }), (async () => {
      await par(belir(c, [cMavi, q1, h(0, 0), h(1, 0)].flat(), 350, 0), belir(c, cTur, 450), belir(c, [h(0, 3), h(1, 3)].flat(), 450)); await belir(c, q2, 450);
    })());
    await par(c.say('Sol caddede AB 20 m, BC 30 m, CK 50 m.', { speak: 'Sol caddede A B yirmi metre, B C otuz metre, C K elli metre.' }), (async () => {
      await par(belir(c, [cTur, q2, ...S.parAd], 350, 0), belir(c, [h(0, 0), h(1, 0)].flat(), 450)); await belir(c, [pAB, pBC, pCK, lAB, lBC, lCK], 500);
    })());
    await par(c.say('Sağ caddede |DE| = 40 m olsun.', { speak: 'Sağ caddede D E uzunluğu kırk metre olsun.' }), belir(c, [pDE, lDE], 500));
    await par(c.say('20/30 = 40/|EF| olduğundan |EF| = 60 m.', { speak: 'Yirmi bölü otuz eşittir kırk bölü E F olduğundan E F uzunluğu altmış metre.' }), (async () => {
      await belir(c, [pAB, lAB, pDE, lDE, h(0, 0), h(1, 0)].flat(), 350, 0); await belir(c, [pEF, lEF], 450); await belir(c, n1, 450); cevapla(lEF, '60 m');
    })());
    await par(c.say('30/50 = 60/|FL| olduğundan |FL| = 100 m.', { speak: 'Otuz bölü elli eşittir altmış bölü F L olduğundan F L uzunluğu yüz metre.' }), (async () => {
      await belir(c, n1, 300, 0); await belir(c, [pFL, lFL], 450); await belir(c, n2, 450); cevapla(lFL, '100 m');
    })());
  }

  /* ---- Mum şeması (sahne 8): A–B alev, C–D görüntü, delik düzlemi H'de ---- */
  function alev(c, p, b, t, w, renk) {
    const h = t[1] - b[1];
    return c.S('path', { d: `M${b[0]},${b[1]} C${b[0] - w},${b[1]} ${b[0] - w * 0.35},${b[1] + h * 0.55} ${t[0]},${t[1]} C${b[0] + w * 0.35},${b[1] + h * 0.55} ${b[0] + w},${b[1]} ${b[0]},${b[1]} Z`, fill: renk, 'fill-opacity': 0.3, stroke: renk, 'stroke-width': 2 }, p);
  }
  function mumSekli(c, p, o) {
    const s = o.s, Pn = (u) => [o.X0 + u[0] * s, o.Y0 + u[1] * s];
    const A = Pn(o.A), Bq = Pn(o.B), H = Pn(o.H), Dq = Pn(o.D), Cq = Pn(o.C);
    const g = c.S('g', {}, p), fAHB = poly(c, g, [A, H, Bq], MAVI, 0.16), fCHD = poly(c, g, [Cq, H, Dq], TURUNCU, 0.2);
    const alevAB = alev(c, g, Bq, A, 46, SARI), alevCD = alev(c, g, Dq, Cq, 46 * (Cq[1] - Dq[1]) / (Bq[1] - A[1]), SARI);
    const eU = [H[0], A[1] - 1.5 * s], fU = [H[0], Bq[1] + 1.5 * s];
    const duvar = [cizgi(c, g, eU, [H[0], H[1] - 12], DUVAR, 12, { 'stroke-linecap': 'butt' }), cizgi(c, g, [H[0], H[1] + 12], fU, DUVAR, 12, { 'stroke-linecap': 'butt' })];
    const dAB = cizgi(c, g, [A[0], A[1] - 16], [Bq[0], Bq[1] + 16], MOR, 3.5, KESIK), dEF = cizgi(c, g, eU, fU, MOR, 3.5, KESIK), dCD = cizgi(c, g, [Cq[0], Dq[1] - 16], [Cq[0], Cq[1] + 16], MOR, 3.5, KESIK);
    const rAC = cizgi(c, g, A, Cq, GRI, 3.5), rBD = cizgi(c, g, Bq, Dq, GRI, 3.5);
    const noktalar = [A, Bq, Cq, Dq, H].map((q) => nokta(c, g, q, RENK.yazi, 5));
    const yay = {
      B: B.esitYay(c, g, Bq, A, H, 1, EL[0], { r: 34 }), D: B.esitYay(c, g, Dq, H, Cq, 1, EL[0], { r: 30 }),
      A: B.esitYay(c, g, A, Bq, H, 2, EL[1], { r: 36 }), C: B.esitYay(c, g, Cq, H, Dq, 2, EL[1], { r: 30 }),
      H1: B.esitYay(c, g, H, A, Bq, 3, EL[2], { r: 30 }), H2: B.esitYay(c, g, H, Cq, Dq, 3, EL[2], { r: 24 }),
    };
    const harf = o.harf === false ? null : {
      A: yazi(c, g, A[0] - 26, A[1] + 8, 'A', { size: 26, kalin: 700 }), B: yazi(c, g, Bq[0] - 26, Bq[1] + 8, 'B', { size: 26, kalin: 700 }),
      C: yazi(c, g, Cq[0] + 26, Cq[1] + 8, 'C', { size: 26, kalin: 700 }), D: yazi(c, g, Dq[0] + 26, Dq[1] + 8, 'D', { size: 26, kalin: 700 }),
      H: yazi(c, g, H[0] + 26, H[1] + 38, 'H', { size: 26, kalin: 700 }),
      E: o.ef ? yazi(c, g, eU[0], eU[1] - 12, 'E', { size: 26, kalin: 700 }) : null, F: o.ef ? yazi(c, g, fU[0], fU[1] + 30, 'F', { size: 26, kalin: 700 }) : null,
    };
    const L = o.etiket;
    const lAB = yazi(c, g, A[0] - 56, (A[1] + Bq[1]) / 2 + 8, L.AB, { size: 24, kalin: 700, renk: MAVI });
    const lBH = D.kenarYazi(c, g, Bq, H, L.BH, MAVI, { merkez: A, size: 24, uzak: 20 }), lHD = D.kenarYazi(c, g, H, Dq, L.HD, TURUNCU, { merkez: Cq, size: 24, uzak: 20 });
    const lCD = yazi(c, g, Cq[0] + 50, (Dq[1] + Cq[1]) / 2 + 8, L.CD, { size: 24, kalin: 700, renk: TURUNCU });
    return { g, A, Bq, H, Dq, Cq, eU, fU, fAHB, fCHD, alevAB, alevCD, duvar, dAB, dEF, dCD, rAC, rBD, noktalar, yay, harf, lAB, lBH, lHD, lCD };
  }

  /* ---- 8. Kesenler paralellerin arasında kesişirse ---- */
  async function mum(c) {
    const svg = c.svg(1000, 562);
    const m = mumSekli(c, svg, { s: 22, X0: 120, Y0: 125, A: [0, 0], B: [0, 12], H: [14.83, 6], D: [22.25, 3], C: [22.25, 9], ef: true, etiket: { AB: '12 cm', BH: '16 cm', HD: '8 cm', CD: '?' } });
    const y = m.yay, hr = m.harf;
    const RX = 690;
    const r1 = sat(c, svg, RX, 170, [['AHB', MAVI], ' ~ ', ['CHD', TURUNCU]], 25), r2 = sat(c, svg, RX, 215, [...oran('|BH|', '|HD|', MAVI, TURUNCU), ' = ', ...oran('|AB|', '|CD|', MAVI, TURUNCU)], 25);
    const r3 = sat(c, svg, RX, 260, [['16', MAVI], '/', ['8', TURUNCU], ' = ', ['12', MAVI], '/', ['|CD|', TURUNCU]], 25);
    const r4 = sat(c, svg, RX, 305, [...oran('|BH|', '|HD|', MAVI, TURUNCU), ' = ', ...oran('|AH|', '|HC|', MAVI, TURUNCU)], 25);
    const hAH = cizgi(c, svg, m.A, m.H, MAVI, 7), hHC = cizgi(c, svg, m.H, m.Cq, TURUNCU, 7);
    const hepsiYay = Object.values(y);
    gizle(m.fAHB, m.fCHD, m.alevAB, m.alevCD, m.duvar, m.dAB, m.dEF, m.dCD, m.rAC, m.rBD, m.noktalar, hepsiYay, Object.values(hr).filter(Boolean), m.lAB, m.lBH, m.lHD, m.lCD, r1, r2, r3, r4, hAH, hHC);

    await par(c.say('Saydam olmayan bir kutunun önünde 12 cm’lik bir mum alevi yanıyor.', { speak: 'Saydam olmayan bir kutunun önünde on iki santimetrelik bir mum alevi yanıyor.' }), (async () => { await belir(c, [...m.duvar, m.alevAB], 500); await belir(c, m.lAB, 400); })());
    await par(c.say('Işık, EF düzlemindeki küçük delikten, H’den geçip karşı yüzeye düşer.', { speak: 'Işık, E F düzlemindeki küçük delikten, H’den geçip karşı yüzeye düşer.' }), (async () => {
      await belir(c, [m.rAC, m.rBD, m.noktalar[4], hr.E, hr.F, hr.H], 600); await belir(c, m.alevCD, 500);
    })());
    await par(c.say('Alevin ucu A, tabanı B; görüntünün uçları C ve D.'), belir(c, [m.noktalar[0], m.noktalar[1], m.noktalar[2], m.noktalar[3], hr.A, hr.B, hr.C, hr.D], 500));
    await par(c.say('AB, EF ve CD paraleldir; BD ve AC kesenlerdir.', { speak: 'A B, E F ve C D paraleldir; B D ve A C kesenlerdir.' }), (async () => { await belir(c, [m.dAB, m.dEF, m.dCD], 500); await vurgula(c, [m.dAB, m.dEF, m.dCD], 800); })());
    await par(c.say('H noktası B’ye 16 cm, D’ye 8 cm uzakta.', { speak: 'H noktası B’ye on altı santimetre, D’ye sekiz santimetre uzakta.' }), belir(c, [m.lBH, m.lHD, m.lCD], 500));
    await par(c.say('AB // CD, BD kesen: ABD ile BDC iç ters açılar, eşit.', { speak: 'A B, C D’ye paralel, B D kesen: A B D ile B D C iç ters açılar, eşit.' }), belir(c, [y.B, y.D], 500));
    await par(c.say('AC kesen: BAH ile HCD iç ters açılar, eşit.', { speak: 'A C kesen: B A H ile H C D iç ters açılar, eşit.' }), belir(c, [y.A, y.C], 500));
    await par(c.say('Açı-Açı: AHB ~ CHD.', { speak: 'Açı-Açı: A H B, C H D’ye benzer.' }), (async () => { await belir(c, [m.fAHB, m.fCHD, y.H1, y.H2], 600); await belir(c, r1, 450); })());
    await par(c.say('Karşılıklı kenarlar: |BH|/|HD| = |AB|/|CD|.', { speak: 'Karşılıklı kenarlar: B H bölü H D, A B bölü C D’ye eşit.' }), (async () => { await belir(c, r1, 300, 0); await belir(c, r2, 450); })());
    await par(c.say('16/8 = 12/|CD| olduğundan |CD| = 6 cm.', { speak: 'On altı bölü sekiz eşittir on iki bölü C D olduğundan C D uzunluğu altı santimetre.' }), (async () => { await belir(c, r2, 300, 0); await belir(c, r3, 450); cevapla(m.lCD, '6 cm'); })());
    await par(c.say('Tales da aynı oranı verir: |BH|/|HD| = |AH|/|HC|.', { speak: 'Tales da aynı oranı verir: B H bölü H D, A H bölü H C’ye eşit.' }), (async () => { await belir(c, r3, 300, 0); await belir(c, [hAH, hHC], 400); await belir(c, r4, 450); })());
    c.clearSay();
    await sil(c, [svg.querySelector('g'), r4, hAH, hHC].filter(Boolean), 450);

    // Sıra sende.
    const m2 = mumSekli(c, svg, { s: 26, X0: 120, Y0: 150, A: [0, 0], B: [0, 9], H: [11.12, 4.5], D: [14.83, 3], C: [14.83, 6], ef: false, etiket: { AB: '9 cm', BH: '12 cm', HD: '4 cm', CD: '?' } });
    const t1 = sat(c, svg, 640, 190, [...oran('|BH|', '|HD|', MAVI, TURUNCU), ' = ', ...oran('|AB|', '|CD|', MAVI, TURUNCU)], 25), t2 = sat(c, svg, 640, 240, [['12', MAVI], '/', ['4', TURUNCU], ' = ', ['9', MAVI], '/', ['|CD|', TURUNCU]], 25);
    gizle(Object.values(m2.yay), t1, t2); gizle(m2.g);
    await belir(c, m2.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir başka kutuda alev 9 cm; |BH| = 12 cm ve |HD| = 4 cm. Görüntünün boyu |CD| kaç cm’dir?', options: ['27 cm', '5 cm', '3 cm'], answer: 2,
      hints: ['AHB ~ CHD; |BH|/|HD| = |AB|/|CD|.', '12/4 = 3: AB, CD’nin üç katı.', ''],
      right: 'Evet. 12/4 = 9/|CD| olduğundan |CD| = 3 cm.',
    });
    cevapla(m2.lCD, '3 cm');
    await par(c.say('12/4 = 9/|CD| olduğundan |CD| = 3 cm.', { speak: 'On iki bölü dört eşittir dokuz bölü C D olduğundan C D uzunluğu üç santimetre.' }), (async () => { await belir(c, t1, 450); await belir(c, t2, 450); })());
  }

  /* ---- 9. Kesenler paralellerin dışında kesişirse ---- */
  async function golet(c) {
    const svg = c.svg(1000, 562);
    const s = 10, X0 = 40, G = 470, Pn = (x, h) => [X0 + x * s, G - h * s];
    const A = Pn(0, 0), C = Pn(12, 0), Dq = Pn(60, 0), Bq = Pn(12, 5), E = Pn(60, 25);
    const fABC = poly(c, svg, [A, Bq, C], TURUNCU, 0.24), fAED = poly(c, svg, [A, E, Dq], MAVI, 0.12);
    const golet = c.S('ellipse', { cx: (C[0] + Dq[0]) / 2, cy: G, rx: (Dq[0] - C[0]) / 2 - 8, ry: 15, fill: 'var(--c6)', 'fill-opacity': 0.35, stroke: 'var(--c6)', 'stroke-width': 2.5 }, svg);
    const yer = cizgi(c, svg, [A[0] - 14, G], [Dq[0] + 24, G], RENK.cizgi, 3), acYer = cizgi(c, svg, A, C, TURUNCU, 7);
    const dogruAE = cizgi(c, svg, A, ara(A, E, 1.03), GRI, 3.5);
    const cubukBC = cizgi(c, svg, C, Bq, TURUNCU, 6), cubukDE = cizgi(c, svg, Dq, E, MAVI, 6);
    const dBC = cizgi(c, svg, [C[0], Bq[1] - 12], [C[0], G + 12], MOR, 3.5, KESIK), dED = cizgi(c, svg, [Dq[0], E[1] - 12], [Dq[0], G + 12], MOR, 3.5, KESIK);
    const noktalar = [A, Bq, C, Dq, E].map((q) => nokta(c, svg, q, RENK.yazi, 5));
    const hA = yazi(c, svg, A[0], G + 34, 'A', { size: 26, kalin: 700 }), hB = yazi(c, svg, Bq[0] - 16, Bq[1] - 20, 'B', { size: 26, kalin: 700 });
    const hC = yazi(c, svg, C[0], G + 34, 'C', { size: 26, kalin: 700 }), hD = yazi(c, svg, Dq[0], G + 34, 'D', { size: 26, kalin: 700 }), hE = yazi(c, svg, E[0] + 24, E[1] - 6, 'E', { size: 26, kalin: 700 });
    const lBC = yazi(c, svg, C[0] + 36, (Bq[1] + G) / 2 + 8, '5 m', { size: 24, kalin: 700, renk: TURUNCU }), lAC = yazi(c, svg, (A[0] + C[0]) / 2, G + 42, '12 m', { size: 24, kalin: 700, renk: TURUNCU });
    const lDE = yazi(c, svg, Dq[0] - 38, (E[1] + G) / 2 + 8, '25 m', { size: 24, kalin: 700, renk: MAVI }), lCD = yazi(c, svg, (C[0] + Dq[0]) / 2, G + 50, '?', { size: 28, kalin: 700, renk: 'var(--c6)' });
    const yA = B.esitYay(c, svg, A, C, Bq, 2, EL[1], { r: 66, aralik: 8 }), yB = B.esitYay(c, svg, Bq, A, C, 1, EL[0], { r: 26 }), yE = B.esitYay(c, svg, E, A, Dq, 1, EL[0], { r: 34 });
    const dC = aciYayi(c, svg, C, Bq, A, RENK.cizgi, 24, { dik: true }), dD = aciYayi(c, svg, Dq, E, A, RENK.cizgi, 24, { dik: true });
    const RX = 690;
    const r1 = sat(c, svg, RX, 180, [...oran('|AC|', '|AD|', TURUNCU, MAVI), ' = ', ...oran('|BC|', '|ED|', TURUNCU, MAVI)], 24);
    const r2 = sat(c, svg, RX, 230, [['|AD|', MAVI], ' = 12 + ', ['|CD|', 'var(--c6)']], 24), r3 = sat(c, svg, RX, 280, [['12', TURUNCU], '/(12 + ', ['|CD|', 'var(--c6)'], ') = 1/5'], 24);
    const r4 = sat(c, svg, RX, 330, ['12 + ', ['|CD|', 'var(--c6)'], ' = 60'], 24);
    gizle(fABC, fAED, golet, yer, acYer, dogruAE, cubukBC, cubukDE, dBC, dED, noktalar, hA, hB, hC, hD, hE, lBC, lAC, lDE, lCD, yA, yB, yE, dC, dD, r1, r2, r3, r4);

    await par(c.say('Meral, A, B ve C noktalarına çubuk dikiyor.'), belir(c, [yer, noktalar[0], noktalar[1], noktalar[2], cubukBC, hA, hB, hC], 600));
    await par(c.say('Emine, A ve B ile aynı hizada E’yi işaretliyor.'), belir(c, [dogruAE, noktalar[4], hE], 600));
    await par(c.say('Aynı şekilde A ve C ile aynı hizada D’yi işaretliyor.'), belir(c, [cubukDE, noktalar[3], hD], 600));
    await par(c.say('BC // ED; BC 5 m, AC 12 m, DE 25 m.', { speak: 'B C, E D’ye paralel; B C beş metre, A C on iki metre, D E yirmi beş metre.' }), (async () => { await belir(c, [dBC, dED, acYer], 450); await belir(c, [lBC, lAC, lDE], 450); })());
    await par(c.say('Gölün genişliği |CD| aranıyor.', { speak: 'Gölün genişliği C D uzunluğu aranıyor.' }), belir(c, [golet, lCD], 500));
    await par(c.say('BC // ED olduğundan ABC ile AED benzerdir.', { speak: 'B C, E D’ye paralel olduğundan A B C ile A E D benzerdir.' }), (async () => { await belir(c, [fABC, fAED], 500); await belir(c, [yA, yB, yE, dC, dD], 500); })());
    await par(c.say('Karşılıklı kenarlar: |AC|/|AD| = |BC|/|ED|.', { speak: 'Karşılıklı kenarlar: A C bölü A D, B C bölü E D’ye eşit.' }), belir(c, r1, 450));
    await par(c.say('|AD| = 12 + |CD| olduğundan 12/(12 + |CD|) = 1/5.', { speak: 'A D uzunluğu on iki artı C D olduğundan on iki bölü on iki artı C D, bir bölü beşe eşit.' }), (async () => { await belir(c, r1, 300, 0); await belir(c, r2, 450); await belir(c, r3, 450); })());
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '12/(12 + |CD|) = 1/5 ise 12 + |CD| kaçtır?', options: ['12', '17', '60'], answer: 2,
      hints: ['Pay 12 ise payda, 12’nin 5 katıdır.', 'İçler dışlar: 12·5 = 1·(12 + |CD|).', ''],
      right: 'Evet. 12·5 = 60.',
    });
    await par(c.say('12 + |CD| = 60 olduğundan |CD| = 48 m.', { speak: 'On iki artı C D eşittir altmış olduğundan C D uzunluğu kırk sekiz metre.' }), (async () => { await belir(c, r2, 300, 0); await belir(c, r4, 450); cevapla(lCD, '48 m'); })());
    await par(c.say('Gölün genişliği 48 m.', { speak: 'Gölün genişliği kırk sekiz metre.' }), buyut(c, lCD, 900, 28));
  }

  /* ---- 10. Dene: ortadaki sokağın yeri ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const S = sema(c, svg, { s: 30, X0: 160, Y0: 80, ys: [0, 4.8, 12], sol: [[6, 0], [-3, 12]], sag: [[10, 0], [15, 12]], harfSol: ['A', 'B', 'C'], harfSag: ['D', 'E', 'F'] });
    const [Aq, , Cq] = S.K[0], [Dq, , Fq] = S.K[1], pk = S.pk;
    const dB = pk.paraleller[1].hat, nB = pk.noktalar[0][1], nE = pk.noktalar[1][1], hB = pk.adlar[0][1], hE = pk.adlar[1][1];
    const pAB = cizgi(c, svg, Aq, Aq, TURUNCU, 9), pBC = cizgi(c, svg, Aq, Cq, YESIL, 9), pDE = cizgi(c, svg, Dq, Dq, TURUNCU, 9), pEF = cizgi(c, svg, Dq, Fq, YESIL, 9);
    const VERI = { 2: [30, 120, 26, 104, '0,25'], 3: [45, 105, 39, 91, '0,43'], 4: [60, 90, 52, 78, '0,67'], 5: [75, 75, 65, 65, '1'], 6: [90, 60, 78, 52, '1,5'], 7: [105, 45, 91, 39, '2,33'], 8: [120, 30, 104, 26, '4'] };
    const ETIK = ['|AB|', '|BC|', '|DE|', '|EF|', '|AB|/|BC|', '|DE|/|EF|'], VX = 706 + 156;
    const sa = ETIK.map((e, i) => yazi(c, svg, 706, 130 + i * 58, '', { hiza: 'start', size: 25, kalin: 700 }));
    const renk = { oran: null, parca: null };
    const yaz = (t, e, v, r) => { t.textContent = ''; c.S('tspan', { text: e }, t); const s = c.S('tspan', { text: String(v), x: VX }, t); if (r) s.style.fill = r; };
    const guncelle = (v) => {
      const k = Math.round(+v * 10), d = VERI[k], sv = k / 10, Bq = ara(Aq, Cq, sv), Eq = ara(Dq, Fq, sv);
      koy(dB, [Bq[0] - 36, Bq[1]], [Eq[0] + 36, Eq[1]]);
      [[nB, Bq], [nE, Eq]].forEach(([n, q]) => { n.setAttribute('cx', q[0]); n.setAttribute('cy', q[1]); });
      hB.setAttribute('x', Bq[0] + S.kays[0][0]); hB.setAttribute('y', Bq[1] + S.kays[0][1] + 7.9); hE.setAttribute('x', Eq[0] + S.kays[1][0]); hE.setAttribute('y', Eq[1] + S.kays[1][1] + 7.9);
      koy(pAB, Aq, Bq); koy(pBC, Bq, Cq); koy(pDE, Dq, Eq); koy(pEF, Eq, Fq);
      const deg = [d[0] + ' m', d[1] + ' m', d[2] + ' m', d[3] + ' m', d[4], d[4]];
      deg.forEach((x, i) => yaz(sa[i], ETIK[i], x, i >= 4 ? renk.oran : (i === 0 || i === 2) ? renk.parca : null));
      guncelle.son = k;
    };
    guncelle(0.4);
    gizle(S.hatlar, S.solN, S.sagN, pAB, pBC, pDE, pEF, sa);
    await belir(c, [...S.hatlar, ...S.solN, ...S.sagN], 500); await belir(c, [pAB, pBC, pDE, pEF, ...sa], 450);
    await c.say('Ortadaki sokağı kaydır; iki orana bak.', { noWait: true });
    const sl = c.slider({ label: 'Ortadaki sokağın yeri', min: 0.2, max: 0.8, step: 0.1, value: 0.4, fmt: () => '', onInput: (v) => { guncelle(v); } });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await par(c.say('Ortadaki sokak nereye giderse gitsin iki oran eşit kalıyor.'), (async () => { renk.oran = TURUNCU; guncelle(guncelle.son / 10); await buyut(c, [sa[4], sa[5]], 800, 25); })());
    await par(c.say('|AB| ile |DE| ise hiçbir zaman eşit değil.', { speak: 'A B ile D E ise hiçbir zaman eşit değil.' }), (async () => { renk.parca = SARI; guncelle(guncelle.son / 10); await c.wait(900); })());
    renk.parca = null; guncelle(guncelle.son / 10);
    await c.say('Eşit olan, karşılıklı parçalar değil, parçaların oranlarıdır.', { speak: '[thoughtful] Eşit olan, karşılıklı parçalar değil, parçaların oranlarıdır.' });
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d2', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Tales teoremi: paraleller ve kesenler', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Tales teoremi: paraleller ve kesenler',
      hook: 'Üç paralel sokağı kesen iki caddede <b>bloklar neden aynı oranda</b> dizilir?',
      button: 'Derse başla ›',
    },
    goals: ['Paralel üç doğrunun kesenlerde orantılı parçalar ayırdığını söyler.', 'Bu sonucu bir köşegen çizip temel orantıyı iki kez kullanarak gösterir.', 'Bilinmeyen bir parçayı |AB|/|BC| = |DE|/|EF| eşitliğinden bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Temel orantı ve Açı-Açı benzerliği.', run: hatirla },
      { title: 'Tales ve gölge', goal: 'Gölgeden yükseklik: paralel ışınlar benzer üçgen verir.', run: golge },
      { title: 'Paraleller ve kesenler', goal: 'Paralel üç doğru kesenlerde orantılı parça ayırır.', run: paraleller },
      { title: 'İspat: yardımcı çizgi', goal: 'Köşegen çizilir; ACF üçgeninde temel orantı kurulur.', run: ispat1 },
      { title: 'İspat: ikinci üçgen', goal: 'AFD üçgeninde temel orantı; iki oran birleşir.', run: ispat2 },
      { title: 'Tales’i kullan', goal: 'Bilinmeyen parça, orantı kurularak bulunur.', run: kullan },
      { title: 'Dört paralel', goal: 'Dört paralelde seçilen her üç doğru Tales teoremini sağlar.', run: dortParalel },
      { title: 'Kesenler paralellerin arasında kesişirse', goal: 'Benzer üçgenlerle ve Tales ile mum alevinin görüntüsü.', run: mum },
      { title: 'Kesenler paralellerin dışında kesişirse', goal: 'İki benzer üçgenden gölün genişliği.', run: golet },
      { title: 'Dene: ortadaki sokağın yeri', goal: 'Ortadaki sokak kaysa da iki oran eşit kalır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Üç paralel sokağı iki cadde kesiyor. Sol caddede |AB| = 6 m ve |BC| = 12 m; sağ caddede |DE| = 5 m. |EF| kaç metredir?',
        options: ['12 m', '10 m', '6 m'], answer: 1,
        why: ['12 m, |BC| değeridir; karşılıklı parçalar eşit olmaz, oranlar eşit olur.', '6/12 = 5/|EF| olduğundan 6·|EF| = 60; |EF| = 10 m.', '6 m, |AB| değeridir; sağ caddedeki parçalar sol caddekilerle aynı uzunlukta olmaz.'],
        scene: 2,
      },
      {
        q: 'd₃ // d₄ // d₅ // d₆; sol caddede |AB| = 2, |BC| = 4, |CK| = 6 cm; sağ caddede |DE| = 3 cm. |FL| kaç cm’dir?',
        options: ['9 cm', '6 cm', '4,5 cm'], answer: 0,
        why: ['2/4 = 3/|EF| olduğundan |EF| = 6 cm; 4/6 = 6/|FL| olduğundan |FL| = 9 cm.', '6 cm, |EF| değeridir; |FL| için bir oran daha kurulur: 4/6 = 6/|FL|.', '4,5 cm, 3·6/4 işleminden çıkar; oysa |FL|’nin komşusu |EF| değil |DE| alınmış.'],
        scene: 6,
      },
      {
        q: 'AB // CD; AC ve BD kesenleri H’de kesişiyor. |AB| = 10 cm, |BH| = 15 cm, |HD| = 6 cm. |CD| kaç cm’dir?',
        options: ['25 cm', '9 cm', '4 cm'], answer: 2,
        why: ['25 cm, |AB| ile |BH|’nin toplamıdır; toplamlar oran vermez.', '9 cm, |BH| − |HD| farkıdır; farklar oran vermez.', 'AHB ~ CHD olduğundan 15/6 = 10/|CD|; |CD| = 4 cm.'],
        scene: 7,
      },
      {
        q: 'BC // ED; kesenler A’da kesişiyor, C ve D aynı kesen üzerinde. |AC| = 8 m, |BC| = 3 m, |DE| = 9 m. |CD| kaç metredir?',
        options: ['24 m', '16 m', '5 m'], answer: 1,
        why: ['24 m, |AD| değeridir; |CD| için |AD| − |AC| işlemi gerekir.', '8/|AD| = 3/9 olduğundan |AD| = 24 m; |CD| = 24 − 8 = 16 m.', '5 m, |AC| − |BC| farkıdır; farklar oran vermez.'],
        scene: 8,
      },
      {
        q: 'Tales teoreminin ispatında A ile F birleştirildi. Bu çizginin amacı nedir?',
        options: ['Temel orantı teoremini uygulayacağımız iki üçgen elde etmek', 'Paralel doğruları eş yapmak', 'Kesenleri paralel yapmak'], answer: 0,
        why: ['AF, ACF ve AFD üçgenlerini verir; temel orantı ikisinde de kullanılır.', 'Paralel doğrular eş olmaz; AF yalnızca iki üçgen oluşturur.', 'AF kesenleri değiştirmez; yalnızca iki üçgen oluşturur.'],
        scene: 3,
      },
    ],
    summary: [
      'Paralel üç doğru, kesenlerde orantılı parçalar ayırır.',
      'Karşılıklı parçalar eşit olmaz, oranları eşit olur.',
      'İspat: köşegen çiz, temel orantıyı iki kez kullan.',
      '<b>Paraleller kesenleri aynı oranda böler.</b>',
    ],
    nextLesson: { href: 'd3-oklid-yukseklik.html', label: 'Sonraki: Öklid teoremi: yüksekliğin karesi ›' },
  });
})();
