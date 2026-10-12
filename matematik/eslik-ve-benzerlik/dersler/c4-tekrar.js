/* C4 — Konu tekrarı: Benzer üçgenler oluşturma
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz karışık soru gelir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/C-benzer-ucgenler-olusturma.md (C4). */
(() => {
  'use strict';
  const { RENK, gizle, belir, par, yazi, renkli, cizgi, nokta, cokgen, aciYayi, ara } = window.KIT;
  const { ESLEME, bolNoktalar, paralel, ortakKose } = window.KIT_C;

  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };
  /* Köşe harfi: P noktasından (dx, dy) kaymış yazı. */
  const harf = (c, g, P, m, dx, dy, renk) => yazi(c, g, P[0] + dx, P[1] + dy, m, { size: 26, kalin: 700, renk: renk || RENK.yazi });

  /* Ortak şekil: A tepede, BC tabanda; D, AB üzerinde ve E, AC üzerinde A'dan t oranında. */
  const temel = (A, B, C, t) => ({ A, B, C, D: ara(A, B, t), E: ara(A, C, t) });

  /* ---- 1. İki kenarda aynı oranda nokta: Kenar-Açı-Kenar ---- */
  async function ayniOran(c, g) {
    const { A, B, C, D, E } = temel([500, 100], [250, 420], [750, 420], 1 / 3);
    const u = cokgen(c, g, [A, B, C], RENK.cizgi, { dolgu: 0.08 });
    const hh = [harf(c, g, A, 'A', 0, -20), harf(c, g, B, 'B', -22, 30), harf(c, g, C, 'C', 22, 30)];
    const b1 = bolNoktalar(c, g, A, B, 3, { nokta: false, cent: true }), b2 = bolNoktalar(c, g, A, C, 3, { nokta: false, cent: true });
    const nk = [nokta(c, g, D, ESLEME[0], 7), nokta(c, g, E, ESLEME[0], 7)];
    const hd = [harf(c, g, D, 'D', -26, 8, ESLEME[0]), harf(c, g, E, 'E', 26, 8, ESLEME[0])];
    const de = cizgi(c, g, D, E, ESLEME[0], 5), ay = aciYayi(c, g, A, B, C, ESLEME[0], 40);
    const t1 = renkli(c, g, 500, 490, [['ADE ~ ABC', ESLEME[0]]], { size: 36, kalin: 700 }), t2 = yazi(c, g, 500, 530, 'K.A.K.', { size: 28, kalin: 700, renk: RENK.soluk });
    const cent = [...b1.cent, ...b2.cent];
    gizle(u.g, hh, cent, nk, hd, de, ay, t1, t2);
    await belir(c, [u.g, ...hh], 450);
    await belir(c, cent, 450);
    await belir(c, [...nk, ...hd], 400);
    await belir(c, de, 450);
    await belir(c, ay, 400);
    await belir(c, [t1, t2], 450);
  }

  /* ---- 2. Bir kenara paralel çizmek: Açı-Açı ---- */
  async function paralelCiz(c, g) {
    const { A, B, C, D, E } = temel([500, 100], [250, 420], [750, 420], 0.4);
    const u = cokgen(c, g, [A, B, C], RENK.cizgi, { dolgu: 0.08 });
    const hh = [harf(c, g, A, 'A', 0, -20), harf(c, g, B, 'B', -22, 30), harf(c, g, C, 'C', 22, 30)];
    const hd = [harf(c, g, D, 'D', -26, 8), harf(c, g, E, 'E', 26, 8)];
    const p = paralel(c, g, B, C, A, D, { sinir: [A, B, C] });
    const k = ortakKose(c, g, [A, B, C], [A, D, E], { yayR: 32 });
    [...k.kenarB, ...k.kenarK].forEach((e) => e.remove());
    const yaylar = [...k.yayB, ...k.yayK];
    const t1 = yazi(c, g, 500, 490, 'ADE ~ ABC', { size: 36, kalin: 700 }), t2 = yazi(c, g, 500, 530, 'A.A.', { size: 28, kalin: 700, renk: RENK.soluk });
    gizle(u.g, hh, hd, yaylar, t1, t2);
    await belir(c, [u.g, ...hh], 450);
    await p.kaydir(1400);
    await belir(c, hd, 350);
    await belir(c, yaylar, 500);
    await belir(c, [t1, t2], 450);
  }

  /* ---- 3. Paralel içte, dışta ya da köşenin öbür yanında ---- */
  async function ucYer(c, g) {
    const uzat = (D, E) => { const d = [E[0] - D[0], E[1] - D[1]], n = Math.hypot(d[0], d[1]); return [[D[0] - (d[0] / n) * 16, D[1] - (d[1] / n) * 16], [E[0] + (d[0] / n) * 16, E[1] + (d[1] / n) * 16]]; };
    const bil = [
      { ...temel([170, 110], [50, 360], [290, 360], 0.4), ad: 'içte', cx: 170 },
      { ...temel([500, 100], [430, 230], [570, 230], 1.6), ad: 'dışta', cx: 500 },
      { ...temel([830, 250], [740, 380], [920, 380], -0.6), ad: 'köşenin öbür yanında', cx: 830 },
    ];
    const ogeler = bil.map((b) => {
      const taban = cokgen(c, g, [b.A, b.B, b.C], RENK.cizgi, { dolgu: 0.08 }), yeni = cokgen(c, g, [b.A, b.D, b.E], ESLEME[0], { dolgu: 0.18 });
      const [U, V] = uzat(b.D, b.E), hat = cizgi(c, g, U, V, RENK.dogru, 4, { 'stroke-dasharray': '10 8' });
      const ad = yazi(c, g, b.cx, 460, b.ad, { size: 28, kalin: 700 });
      return [taban.g, yeni.g, hat, ad];
    });
    gizle(ogeler.flat());
    for (const o of ogeler) await belir(c, o, 500);
  }

  /* ---- 4. Dik üçgende dik köşeden yükseklik: üç benzer üçgen ---- */
  async function yukseklik(c, g) {
    const A = [400, 190], B = [240, 430], C = [760, 430], H = [400, 430];
    const u = cokgen(c, g, [A, B, C], ESLEME[0], { dolgu: 0.1 });
    const s1 = cokgen(c, g, [B, H, A], ESLEME[1], { dolgu: 0.3, w: 2 }), s2 = cokgen(c, g, [H, C, A], ESLEME[2], { dolgu: 0.3, w: 2 });
    const ust = cokgen(c, g, [A, B, C], ESLEME[0], { dolgu: 0, w: 4 });
    const hh = [harf(c, g, A, 'A', 0, -20), harf(c, g, B, 'B', -24, 30), harf(c, g, C, 'C', 24, 30)];
    const dikA = aciYayi(c, g, A, B, C, RENK.cizgi, 38, { dik: true });
    const yuk = cizgi(c, g, A, H, RENK.merkez, 5), hH = harf(c, g, H, 'H', 0, 36), dikH = aciYayi(c, g, H, A, C, RENK.cizgi, 30, { dik: true });
    const t = yazi(c, g, 500, 520, 'üç benzer üçgen', { size: 34, kalin: 700 });
    gizle(u.g, ust.g, hh, dikA, yuk, hH, dikH, s1.g, s2.g, t);
    await belir(c, [u.g, ust.g, ...hh], 450);
    await belir(c, dikA, 350);
    await belir(c, yuk, 450);
    await belir(c, [hH, dikH], 350);
    await belir(c, [s1.g, s2.g], 500);
    await belir(c, t, 450);
  }

  /* ---- 5 ve 6. Karşılıklı kenarlar aynı renkte; oran ve bilinmeyen kenar (ortak çizim) ---- */
  function iki(c, g, harfli) {
    const { A, B, C, D, E } = temel([330, 100], [150, 440], [630, 440], 0.4);
    const u = cokgen(c, g, [A, B, C], RENK.cizgi, { dolgu: 0.06 });
    const k = ortakKose(c, g, [A, B, C], [A, D, E], { w: 5 });
    [...k.yayB, ...k.yayK].forEach((e) => e.remove());
    const hh = harfli ? [harf(c, g, A, 'A', 0, -20), harf(c, g, B, 'B', -22, 30), harf(c, g, C, 'C', 22, 30), harf(c, g, D, 'D', -26, 8), harf(c, g, E, 'E', 26, 8)] : [];
    return { A, B, C, D, E, u, k, hh, kenar: [...k.kenarB, ...k.kenarK] };
  }

  async function oranKur(c, g) {
    const s = iki(c, g, true);
    const yazim = renkli(c, g, 706, 230, [['AD', ESLEME[2]], ' / ', ['AB', ESLEME[2]]], { hiza: 'start', size: 30, kalin: 700 });
    const e1 = yazi(c, g, 706, 268, 'karşılıklı', { hiza: 'start', size: 22, renk: RENK.soluk });
    const yanlis = renkli(c, g, 706, 360, [['AD / DB', RENK.soluk]], { hiza: 'start', size: 30, kalin: 700 });
    const cizik = cizgi(c, g, [698, 351], [818, 351], RENK.soluk, 3);
    const e2 = yazi(c, g, 706, 398, 'karşılıklı değil', { hiza: 'start', size: 22, renk: RENK.soluk });
    gizle(s.u.g, s.hh, s.kenar, yazim, e1, yanlis, cizik, e2);
    await belir(c, [s.u.g, ...s.hh], 450);
    await belir(c, s.kenar, 600);
    await belir(c, [yazim, e1], 450);
    await belir(c, [yanlis, cizik, e2], 450);
  }

  async function sayiBul(c, g) {
    const s = iki(c, g, false), { A, B, C, D, E } = s;
    gizle(s.u.g, s.kenar);
    const dis = [-0.884, -0.468];   // AB'nin sol dış normali
    const ot = (P, d) => [P[0] + dis[0] * d, P[1] + dis[1] * d];
    const M = ara(A, B, 0.5), A2 = ot(A, 58), B2 = ot(B, 58);
    const dik = (P) => [ot(P, 50), ot(P, 66)];
    const ayrac = c.S('path', { d: `M${dik(A)[0]} L${dik(A)[1]} M${A2} L${B2} M${dik(B)[0]} L${dik(B)[1]}`.replace(/,/g, ' '), fill: 'none', stroke: ESLEME[2], 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const n2 = yazi(c, g, ot(ara(A, D, 0.5), 22)[0], ot(ara(A, D, 0.5), 22)[1] + 9, '2', { size: 28, kalin: 700, renk: ESLEME[2] });
    const n5 = yazi(c, g, ot(M, 86)[0], ot(M, 86)[1] + 9, '5', { size: 28, kalin: 700, renk: ESLEME[2] });
    const n10 = yazi(c, g, 390, 482, '10', { size: 28, kalin: 700, renk: ESLEME[0] });
    const nx = yazi(c, g, (D[0] + E[0]) / 2, D[1] - 14, 'x', { size: 28, kalin: 700, renk: ESLEME[0] });
    const esit = renkli(c, g, 706, 230, [['2/5', ESLEME[2]], ' = ', ['x/10', ESLEME[0]]], { hiza: 'start', size: 30, kalin: 700 });
    const so = renkli(c, g, 706, 300, ['x = 4'], { hiza: 'start', size: 30, kalin: 700 });
    gizle(ayrac, n2, n5, n10, nx, esit, so);
    await belir(c, [s.u.g, ...s.kenar], 450);
    await belir(c, [n2, ayrac, n5, n10, nx], 450);
    await belir(c, esit, 450);
    await c.wait(500);
    so.style.fill = RENK.iyi;
    await belir(c, so, 450);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const bos = () => c.S('g', {}, svg);
    const kural = async (yap, cumle, secenek) => {
      const g = bos();
      await par(c.say(cumle, secenek), yap(c, g));
      await c.wait(500);
      return g;
    };
    const gec = async (g) => { c.clearSay(); await kaldir(c, g); };

    const g0 = bos(); yazi(c, g0, 500, 290, 'Benzer üçgenler oluşturma', { size: 46, kalin: 700 }); gizle(g0);
    await par(c.say('Bir üçgene benzer üçgen oluşturmanın yollarını toplayalım.'), belir(c, g0, 450));
    await gec(g0);

    await gec(await kural(ayniOran, 'İki kenarda aynı oranda nokta alıp birleştirmek: Kenar-Açı-Kenar.'));
    await gec(await kural(paralelCiz, 'Bir kenara paralel çizmek: Açı-Açı.'));
    await gec(await kural(ucYer, 'Paralel içte, dışta ya da köşenin öbür yanında olabilir.'));

    const g4 = await kural(yukseklik, 'Dik üçgende dik köşeden yükseklik çizmek: üç benzer üçgen.');
    c.note('<b>Üç yol:</b> aynı oran, paralel çizgi, dik köşeden yükseklik.', 'Benzer üçgen yolları', 'eb-c4-yollar');
    await gec(g4);

    await gec(await kural(oranKur, 'Oran, karşılıklı kenarlar arasında kurulur; parça ile bütün karıştırılmaz.',
      { speak: '[thoughtful] Oran, karşılıklı kenarlar arasında kurulur; parça ile bütün karıştırılmaz.' }));

    await kural(sayiBul, 'Oranı kurup bilinmeyen uzunluğu buluruz.');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-c4', kicker: 'Konu C · Benzer üçgenler oluşturma', title: 'Konu tekrarı: Benzer üçgenler oluşturma', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Benzer üçgenler oluşturma',
      hook: 'Üç dersin yolları aklında mı? Önce yolları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Benzer üçgen oluşturmanın üç yolunu hatırlar.', 'Yolları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      {
        q: 'ABC üçgeninde D noktası AB üzerinde, E noktası AC üzerindedir. DE // BC, |AD| = 3 cm, |DB| = 6 cm ve |BC| = 21 cm. |DE| kaç cm’dir?',
        options: ['10,5 cm', '7 cm', '18 cm'], answer: 1,
        why: ['10,5, 3/6 × 21 işleminden çıkar; 3/6 parçayı parçayla kıyaslar, oysa karşılıklı kenarlar 3/9 oranındadır.', '|AB| = 3 + 6 = 9 cm; |DE| / |BC| = |AD| / |AB| = 3/9 olduğundan |DE| = 3/9 × 21 = 7 cm.', '18, 21 − 3 işleminden çıkar; benzerlikte kenarlar çıkarmayla değil oranla bulunur.'], scene: 0,
      },
      {
        q: 'ABC üçgeninde AB 8, AC 12 eşit parçaya bölünmüştür. AB üzerinde A’dan 6. nokta ile AC üzerinde A’dan kaçıncı nokta birleştirilirse A köşesinden benzer üçgen oluşur?',
        options: ['9. nokta', '6. nokta', '8. nokta'], answer: 0,
        why: ['AB üzerinde oran 6/8 = 3/4; AC üzerinde de 3/4 için 12 × 3/4 = 9. nokta gerekir.', 'AC üzerinde 6. nokta 6/12 = 1/2 oranı verir; 3/4 ile eşit değildir.', 'AC üzerinde 8. nokta 8/12 = 2/3 oranı verir; 3/4 ile eşit değildir.'], scene: 0,
      },
      {
        q: 'Dik üçgende dik köşeden hipotenüse inen yükseklik 12 cm’dir; hipotenüsün parçalarından biri 9 cm’dir. Öteki parça kaç cm’dir?',
        options: ['15 cm', '21 cm', '16 cm'], answer: 2,
        why: ['15, 9 ile 12’den kurulan dik üçgenin hipotenüsüdür; hipotenüsün parçası değildir.', '21, 9 + 12 toplamıdır; oran kurulmadan toplanmıştır.', 'Oluşan benzer üçgenlerden 12 / 9 = x / 12 olur; x = 144 ÷ 9 = 16 cm.'], scene: 0,
      },
      {
        q: 'ABC üçgeninde B köşesinde dik açı vardır. D noktası AC üzerinde ve BD, AC’ye diktir. Hangisi doğrudur?',
        options: ['ABC ~ ABD', 'ABC ~ ADB', 'ABC ~ BAD'], answer: 1,
        why: ['Bu yazılışta B ile B eşleşir; oysa ABC’de B dik açıdır, ABD’de dik açı D’dedir.', 'A ortak açıdır, B’deki dik açı D’deki dik açıya karşılık gelir; geriye C ile B kalır: ABC ~ ADB.', 'Bu yazılışta A ile B eşleşir; A ortak açıdır, B ile eşleşemez.'], scene: 0,
      },
      {
        q: 'D, A, B noktaları doğrusaldır ve A noktası D ile B arasındadır; E, A, C noktaları doğrusaldır ve A noktası E ile C arasındadır. DE // BC, |AD| = 2 cm, |AB| = 8 cm ve |BC| = 12 cm. |DE| kaç cm’dir?',
        options: ['6 cm', '4 cm', '3 cm'], answer: 2,
        why: ['6, 12 ÷ 2 işleminden çıkar; oran hiç kurulmamıştır.', '4, |AB| / |AD| = 4 oranıdır; |DE| bulmak için 12’yi bu orana bölmek gerekir.', '|DE| / |BC| = |AD| / |AB| olduğundan |DE| = 2/8 × 12 = 3 cm; paralel köşenin öbür yanında olsa da oran aynıdır.'], scene: 0,
      },
      {
        q: 'ABC üçgeninde D noktası AB üzerinde, E noktası AC üzerindedir. Hangisi tek başına ADE ~ ABC olduğunu garanti etmez?',
        options: ['|AD| / |AB| = 1/3 ve |AE| / |AC| = 1/2', 'DE // BC', '|AD| / |AB| = |AE| / |AC| = 2/5'], answer: 0,
        why: ['Oranlar eşit değildir (1/3 ≠ 1/2); Kenar-Açı-Kenar kurulamaz, benzerlik garanti değildir.', 'DE // BC ise yöndeş açılar eşittir; ortak A ile Açı-Açı sağlanır, benzerlik garantidir.', 'Oranlar eşit (2/5) ve aradaki A açısı ortak; Kenar-Açı-Kenar ile benzerlik garantidir.'], scene: 0,
      },
      {
        q: 'ABC üçgeninde D noktası AB üzerinde, E noktası AC üzerindedir. DE // BC, m(A) = 55° ve m(ADE) = 65°. m(ACB) kaç derecedir?',
        options: ['55°', '65°', '60°'], answer: 2,
        why: ['55°, A açısıdır; C açısı değildir.', '65°, ADE açısıdır; yöndeş olduğu için ABC açısına eşittir, ACB açısına değil.', 'm(ABC) = m(ADE) = 65° olur; m(ACB) = 180° − 55° − 65° = 60°.'], scene: 0,
      },
      {
        q: 'AFM üçgen biçimli bir tarlada AF kenarı 8, FM kenarı 12 eşit aralığa bölünmüştür. AM kenarının uzunluğu bilinmektedir. F’den hangi iki uzaklıktaki direkler arasına çekilen telin boyu benzer üçgenle hesaplanabilir?',
        options: ['6 ve 6 aralık', '6 ve 9 aralık', '5 ve 8 aralık'], answer: 1,
        why: ['AF üzerinde 6/8 = 3/4, FM üzerinde 6/12 = 1/2 olur; oranlar eşit değildir.', 'AF üzerinde 6/8 = 3/4, FM üzerinde 9/12 = 3/4; oranlar eşit, F açısı ortak: tel AM’ye paralel olur ve oranla hesaplanır.', 'AF üzerinde 5/8, FM üzerinde 8/12 = 2/3 olur; 5/8 ≠ 2/3.'], scene: 0,
      },
    ],
    summary: [
      '<b>Benzer üçgen üç yoldan çıkar: aynı oran, paralel çizgi, dik köşeden yükseklik.</b>',
      'Oran, karşılıklı kenarlar arasında kurulur; parça ile bütün karıştırılmaz.',
      'Oranı kurup bilinmeyen uzunluğu buluruz.',
    ],
  });
})();
