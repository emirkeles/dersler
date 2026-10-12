/* D4 — Öklid teoremi: dik kenarın karesi
   Dik üçgende dik kenarın karesi, hipotenüs ile o kenarın hipotenüs üzerindeki kendi parçasının çarpımıdır: c² = p·a, b² = k·a.
   Önce tarlada ABC ile HBA'nın benzerliği sayılarla (6, 3,6, 10), sonra iki ispat (c² ve b²), kendi parçası, çatı, iki dik üçgenli şekil, üç duruşta eşleştirme.
   Pisagor teoremi kullanılmaz (D5 bu bağıntılardan Pisagor'u ispatlar).
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D4)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, uz, yazi, renkli, cizgi, koy, gizle, belir, par, cevapla, aciYayi, agirlik, parcaKoy } = window.KIT;
  const B = window.KIT_B, D = window.KIT_D;
  const EL = B.ESLEME;                               // mavi, turuncu, yeşil: 1 yay, 2 yay, 3 yay
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez, GRI = D.GRI;

  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + 4 * Math.sin(Math.PI * e)))); };
  const buyut = (c, yazilar, ms = 800) => { const s0 = liste(yazilar).map((t) => +t.getAttribute('font-size')); return c.tween(ms, (e) => liste(yazilar).forEach((t, i) => t.setAttribute('font-size', s0[i] + 6 * Math.sin(Math.PI * e)))); };
  const konumla = (t, P) => { t.setAttribute('x', P[0]); t.setAttribute('y', P[1]); };
  const halka = (c, p, P, renk, r = 22) => c.S('circle', { cx: P[0], cy: P[1], r, fill: 'none', stroke: renk, 'stroke-width': 4 }, p);
  /* Tek yazı öğesinin içeriğini söndürüp değiştirir ve geri getirir. */
  const degistir = async (c, t, parcalar) => { await belir(c, t, 200, 0); parcaKoy(c, t, parcalar); await belir(c, t, 260, 1); };

  /* Dik üçgen (KIT_D.dikUcgen) ve onun düzeltmeleri (D3'ten): H harfi ayak çizgisinin altında ortada durur, p, k ve a yazıları aşağı itilir
     (araçta a tahtanın altına taşıyordu), H'de ikinci dik açı işareti (CAH tarafı) eklenir. */
  function ana(c, p, o) {
    const f = D.dikUcgen(c, p, o);
    konumla(f.adlar.H, [f.H[0], f.B[1] + 42]);
    ['p', 'k'].forEach((q) => { if (f.etiket[q]) f.etiket[q].setAttribute('y', f.B[1] + 62); });
    if (f.etiket.a) f.etiket.a.setAttribute('y', f.B[1] + 100);
    f.dik.H2 = aciYayi(c, f.g, f.H, f.A, f.C, RENK.cizgi, 30, { dik: true });
    return f;
  }
  /* Üçgenin bir parçasını açık dolguyla gösterir (çizgilerin altında kalır). */
  function bolge(c, f, pts, renk, op = 0.3) {
    const el = c.S('polygon', { points: pts.map((q) => q.join(',')).join(' '), fill: renk, 'fill-opacity': op, stroke: 'none' }, f.g);
    f.g.insertBefore(el, f.hat.c);
    return el;
  }
  /* Bağımsız üçgen: pts köşeleri, kenar[i] pts[i]–pts[i+1] kenarının rengi, harf[i] köşe harfi (şeklin dışında). */
  function ucgen3(c, p, pts, dolgu, kenar, harf) {
    const g = c.S('g', {}, p), M = agirlik(pts);
    const yuz = c.S('polygon', { points: pts.map((q) => q.join(',')).join(' '), fill: dolgu, 'fill-opacity': 0.16, stroke: 'none' }, g);
    const hat = [0, 1, 2].map((i) => cizgi(c, g, pts[i], pts[(i + 1) % 3], kenar[i], 4.5));
    const adlar = harf.map((h, i) => { const d = uz(M, pts[i]) || 1; return yazi(c, g, pts[i][0] + ((pts[i][0] - M[0]) / d) * 24, pts[i][1] + ((pts[i][1] - M[1]) / d) * 24 + 9, h, { size: 26, kalin: 700 }); });
    return { g, yuz, hat, adlar };
  }
  /* Sol alt köşede dar açı (tek yay), sağ alt köşede dik açı olan dik üçgen; x0, y0 sol alt köşe. */
  function dikAci(c, p, x0, y0, w, h, renk) {
    const g = c.S('g', {}, p), L = [x0, y0], R = [x0 + w, y0], T = [x0 + w, y0 - h];
    c.S('polygon', { points: [L, R, T].map((q) => q.join(',')).join(' '), fill: renk, 'fill-opacity': 0.16, stroke: 'none' }, g);
    cizgi(c, g, L, R, renk, 4.5); cizgi(c, g, R, T, renk, 4.5); cizgi(c, g, T, L, renk, 4.5);
    aciYayi(c, g, R, L, T, RENK.cizgi, 30, { dik: true });
    const yay1 = B.esitYay(c, g, L, R, T, 1, EL[0], { r: 34 }), yay2 = B.esitYay(c, g, T, L, R, 2, EL[1], { r: 34, aralik: 7 });
    return { g, yay1, yay2 };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: yüksekliğin karesi (D3).
    const g1 = c.S('g', {}, svg);
    const f = ana(c, g1, { B: [250, 410], p: 2, k: 18, olcek: 24, etiket: { p: '2', k: '18', h: '?' } });
    await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dik üçgende hipotenüse inen yükseklik, hipotenüsü 2 cm ve 18 cm’lik parçalara ayırıyor. Yükseklik kaç cm’dir?',
      options: ['36 cm', '6 cm', '10 cm'], answer: 1,
      hints: ['h² = p·k: h² = 2·18 = 36; h = 6.', '', 'h² = p·k: h² = 2·18 = 36; h = 6.'],
      right: 'Evet. h² = 2·18 = 36.',
    });
    c.clearSay();
    cevapla(f.etiket.h, '6');
    await par(c.say('h² = p·k = 2·18 = 36, yani h = 6.', { speak: 'h kare eşittir p çarpı k eşittir iki çarpı on sekiz eşittir otuz altı, yani h altı.' }), vurgula(c, [f.hat.h], 800));
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: iki dik üçgende bir dar açı eşit.
    const g2 = c.S('g', {}, svg);
    const kucuk = dikAci(c, g2, 110, 400, 170, 110, MAVI), buyuk = dikAci(c, g2, 480, 400, 280, 181, TURUNCU);
    gizle(kucuk.yay2, buyuk.yay2);                   // üçüncü açılar soru cevaplanana kadar gizli
    await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki dik üçgenin birer dar açısı eşitse hangisi doğrudur?',
      options: ['Üçgenler eştir', 'Yalnızca hipotenüsler eşitse benzerdir', 'Üçgenler benzerdir: dik açılar ve bir dar açı eşit'], answer: 2,
      hints: ['Dik açılar eşit; bir dar açı da eşitse Açı-Açı: üçgenler benzerdir.', 'Dik açılar eşit; bir dar açı da eşitse Açı-Açı: üçgenler benzerdir.', ''],
      right: 'Evet. Açı-Açı.',
    });
    c.clearSay();
    const tilde = yazi(c, svg, 380, 372, '~', { size: 64, kalin: 700, renk: SARI });
    gizle(tilde);
    await par(belir(c, [tilde, kucuk.yay2, buyuk.yay2], 500), c.say('Dik açılar eşit; bir dar açı da eşitse Açı-Açı: üçgenler benzerdir.', { speak: 'Dik açılar eşit; bir dar açı da eşitse Açı-Açı: üçgenler benzerdir.' }));
  }

  /* ---- 2. Hangi iki üçgen? ---- */
  async function hangi(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const f = ana(c, g1, { B: [270, 380], p: 3.6, k: 6.4, olcek: 44, etiket: { c: '6', b: '8', a: '10', h: 'h', p: 'p = 3,6', k: 'k = 6,4' } });
    const sonra = [f.hat.h, f.adlar.H, f.dik.H, f.dik.H2, f.ayak.p, f.ayak.k, f.etiket.h, f.etiket.p, f.etiket.k];
    gizle(sonra);
    const hB = halka(c, g1, f.B, TURUNCU); gizle(hB);

    await par(c.say('Tarla dik üçgen: AB 6, AC 8, BC 10; A dik.', { speak: 'Tarla dik üçgen: A B altı, A C sekiz, B C on; A dik.' }), belir(c, g1, 500));
    await par(c.say('Yükseklik, hipotenüsü p = 3,6 ve k = 6,4 diye ayırır.', { speak: 'Yükseklik, hipotenüsü p eşittir üç virgül altı ve k eşittir altı virgül dört diye ayırır.' }), belir(c, sonra, 600));
    await par(c.say('c = 6 kenarıyla aynı köşeden çıkan parça: p = 3,6.', { speak: 'c eşittir altı kenarıyla aynı köşeden çıkan parça: p eşittir üç virgül altı.' }), (async () => { await belir(c, hB, 350); await vurgula(c, [f.hat.c, f.ayak.p], 900); })());
    c.clearSay();
    await sil(c, g1, 400);

    // ABC ve HBA ayrı ayrı.
    const s = 32, B1 = [60, 290], A1 = [B1[0] + 3.6 * s, B1[1] - 4.8 * s], C1 = [B1[0] + 10 * s, B1[1]];
    const B2 = [470, 290], H2 = [B2[0] + 3.6 * s, B2[1]], A2 = [H2[0], B2[1] - 4.8 * s];
    const T1 = ucgen3(c, svg, [A1, B1, C1], MAVI, [TURUNCU, MAVI, YESIL], ['A', 'B', 'C']);
    const T2 = ucgen3(c, svg, [H2, B2, A2], TURUNCU, [TURUNCU, TURUNCU, SARI], ['H', 'B', 'A']);
    const y1 = B.esitYay(c, svg, B1, A1, C1, 1, EL[0], { r: 30 }), y2 = B.esitYay(c, svg, B2, H2, A2, 1, EL[0], { r: 30 });
    const d1 = aciYayi(c, svg, A1, B1, C1, RENK.cizgi, 30, { dik: true }), d2 = aciYayi(c, svg, H2, A2, B2, RENK.cizgi, 30, { dik: true });
    const benzer = renkli(c, svg, 706, 150, [['ABC', MAVI], ' ~ ', ['HBA', TURUNCU]], { hiza: 'start', size: 30, kalin: 700 });
    const r1 = renkli(c, svg, 500, 395, [['|AB|', TURUNCU], '/', ['|HB|', TURUNCU], ' = ', ['|BC|', MAVI], '/', ['|BA|', TURUNCU]], { size: 30, kalin: 700 });
    const r2 = renkli(c, svg, 500, 452, [['6', TURUNCU], '/', ['3,6', TURUNCU], ' = ', ['10', MAVI], '/', ['6', TURUNCU]], { size: 30, kalin: 700 });
    const r3 = renkli(c, svg, 500, 509, [['6', TURUNCU], '·', ['6', TURUNCU], ' = ', ['3,6', TURUNCU], '·', ['10', MAVI]], { size: 30, kalin: 700 });
    gizle(T1.g, T2.g, y1, y2, d1, d2, benzer, r1, r2, r3);

    await par(c.say('ABC ile HBA üçgenlerine bakalım: ikisinde de B açısı var.', { speak: '[curious] A B C ile H B A üçgenlerine bakalım: ikisinde de B açısı var.' }), (async () => { await belir(c, [T1.g, T2.g], 500); await belir(c, [y1, y2], 450); })());
    await par(c.say('ABC’de A dik, HBA’da H dik: iki açı eşit.', { speak: 'A B C’de A dik, H B A’da H dik: iki açı eşit.' }), belir(c, [d1, d2], 450));
    await par(c.say('Açı-Açı: ABC ile HBA benzerdir.', { speak: 'Açı-Açı: A B C ile H B A benzerdir.' }), belir(c, benzer, 500));
    await par(c.say('Karşılıklı kenarlar: |AB|/|HB| = |BC|/|BA|.', { speak: 'Karşılıklı kenarlar: A B bölü H B eşittir B C bölü B A.' }), (async () => {
      await belir(c, r1, 450); await vurgula(c, [T1.hat[0], T2.hat[0]], 800); await vurgula(c, [T1.hat[1], T2.hat[1]], 800);
    })());
    await par(c.say('Sayılarla: 6/3,6 = 10/6.', { speak: 'Sayılarla: altı bölü üç virgül altı eşittir on bölü altı.' }), belir(c, r2, 450));
    parcaKoy(c, r2, [['6', TURUNCU], '/', ['3,6', TURUNCU], ' = ', ['10', MAVI], '/', ['6', TURUNCU], ' = ', ['5/3', SARI]]);
    await par(c.say('İkisi de 5/3.', { speak: 'İkisi de beş bölü üç.' }), buyut(c, r2, 700));
    await par(c.say('İçler dışlar: 6·6 = 3,6·10; ikisi de 36.', { speak: 'İçler dışlar: altı çarpı altı eşittir üç virgül altı çarpı on; ikisi de otuz altı.' }), belir(c, r3, 450));
    parcaKoy(c, r3, [['6', TURUNCU], '·', ['6', TURUNCU], ' = ', ['3,6', TURUNCU], '·', ['10', MAVI], ' = ', ['36', SARI]]);
    await c.wait(600);
  }

  /* İspat şeması (D3 ana üçgeni, ölçüsüz): tur 'c' ise ABC ile HBA, 'b' ise ABC ile HAC. */
  function ispatSema(c, svg, tur) {
    const etiket = tur === 'c' ? { c: 'c', a: 'a', p: 'p' } : { b: 'b', a: 'a', k: 'k' };
    const f = ana(c, svg, { B: [50, 380], p: 3.6, k: 6.4, olcek: 30, etiket });
    let kucuk, yay, dik;
    const buyukBolge = bolge(c, f, [f.A, f.B, f.C], MAVI, 0.18);
    if (tur === 'c') {
      gizle(f.ayak.k, f.dik.H2);
      kucuk = bolge(c, f, [f.A, f.B, f.H], TURUNCU, 0.3);
      yay = B.esitYay(c, f.g, f.B, f.A, f.C, 1, EL[0], { r: 32 });
      dik = f.dik.H;
    } else {
      gizle(f.ayak.p, f.dik.H);
      kucuk = bolge(c, f, [f.C, f.A, f.H], YESIL, 0.3);
      yay = B.esitYay(c, f.g, f.C, f.A, f.B, 2, EL[1], { r: 34, aralik: 7 });
      dik = f.dik.H2;
    }
    return { f, buyukBolge, kucuk, yay, dik };
  }

  /* ---- 3. İspat: c² = p·a ---- */
  async function ispatC(c) {
    const svg = c.svg(1000, 562);
    const tahta = D.ispatTahtasi(c, svg, { x: 390, y: 170, aralik: 56, size: 22, gerekceSize: 17, verilen: 'm(BAC) = 90°, AH ⊥ BC', istenen: [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI]] });
    const s = ispatSema(c, svg, 'c');
    const r1 = tahta.ekle('m(BAC) = m(BHA) = 90°', 'A’da dik (verilen); AH ⊥ BC');
    const r2 = tahta.ekle('m(B) iki üçgende ortak', 'aynı açı');
    const r3 = tahta.ekle([['ABC', MAVI], ' ~ ', ['HBA', TURUNCU]], 'Açı-Açı; A↔H, B↔B, C↔A');
    const r4 = tahta.ekle([['|AB|', TURUNCU], '/', ['|HB|', TURUNCU], ' = ', ['|BC|', MAVI], '/', ['|BA|', TURUNCU]], 'karşılıklı kenarlar orantılı');
    const r5 = tahta.ekle([['c', TURUNCU], '/', ['p', TURUNCU], ' = ', ['a', MAVI], '/', ['c', TURUNCU]], '|AB| = c, |HB| = p, |BC| = a');
    const r6 = tahta.ekle([['c', TURUNCU], '·', ['c', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI], ', yani c² = p·a'], 'içler dışlar çarpımı ∎');
    gizle(s.f.g, tahta.baslik, s.buyukBolge, s.kucuk, s.yay, s.dik);

    await par(c.say('Verilen: BAC dik üçgeni, AH ⊥ BC; istenen: c² = p·a.', { speak: 'Verilen: B A C dik üçgeni, A H, B C’ye dik; istenen: c kare eşittir p çarpı a.' }), (async () => { await belir(c, s.f.g, 500); await belir(c, tahta.baslik, 400); })());
    await par(c.say('ABC ve HBA üçgenlerinde dik açılar var: A ve H.', { speak: 'A B C ve H B A üçgenlerinde dik açılar var: A ve H.' }), (async () => { await belir(c, [s.buyukBolge, s.kucuk, s.dik], 500); await tahta.ac(r1); })());
    await par(c.say('B açısı ikisinde de ortak.', { speak: 'B açısı ikisinde de ortak.' }), (async () => { await belir(c, s.yay, 450); await tahta.ac(r2); })());
    await par(c.say('Açı-Açı: ABC ~ HBA; köşeler A↔H, B↔B, C↔A.', { speak: 'Açı-Açı: A B C, H B A’ya benzer; köşeler A, H ile; B, B ile; C, A ile eşleşir.' }), tahta.ac(r3));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ~ HBA ise |BC| kenarının karşılığı hangisidir?',
      options: ['|BA|', '|HA|', '|BH|'], answer: 0,
      hints: ['', 'B↔B ve C↔A olduğundan BC, BA’ya karşılık gelir.', 'Hipotenüs hipotenüse karşılık gelir.'],
      right: 'Evet. B↔B ve C↔A.',
    });
    c.clearSay();
    await par(c.say('B↔B ve C↔A olduğundan |BC|, |BA|’ya karşılık gelir.', { speak: 'B, B ile; C, A ile eşleştiğinden B C, B A’ya karşılık gelir.' }), vurgula(c, [s.f.hat.a, s.f.hat.c], 900));
    await par(c.say('Karşılıklı kenarlar: |AB|/|HB| = |BC|/|BA|; yani c/p = a/c.', { speak: 'Karşılıklı kenarlar: A B bölü H B eşittir B C bölü B A; yani c bölü p eşittir a bölü c.' }), (async () => { await tahta.ac(r4); await tahta.ac(r5); })());
    await par(c.say('İçler dışlar çarpımı: c² = p·a.', { speak: '[short pause] İçler dışlar çarpımı: c kare eşittir p çarpı a.' }), (async () => { await tahta.ac(r6); await tahta.parla(r6, SARI, 800); })());
  }

  /* ---- 4. İspat: b² = k·a ---- */
  async function ispatB(c) {
    const svg = c.svg(1000, 562);
    const tahta = D.ispatTahtasi(c, svg, { x: 390, y: 170, aralik: 56, size: 22, gerekceSize: 17, verilen: 'm(BAC) = 90°, AH ⊥ BC', istenen: [['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI]] });
    const s = ispatSema(c, svg, 'b');
    const r1 = tahta.ekle('m(BAC) = m(AHC) = 90°', 'A’da dik (verilen); AH ⊥ BC');
    const r2 = tahta.ekle('m(C) iki üçgende ortak', 'aynı açı');
    const r3 = tahta.ekle([['ABC', MAVI], ' ~ ', ['HAC', YESIL]], 'Açı-Açı; A↔H, B↔A, C↔C');
    const r4 = tahta.ekle([['|AC|', YESIL], '/', ['|HC|', YESIL], ' = ', ['|BC|', MAVI], '/', ['|AC|', YESIL]], 'karşılıklı kenarlar orantılı');
    const r5 = tahta.ekle([['b', YESIL], '/', ['k', YESIL], ' = ', ['a', MAVI], '/', ['b', YESIL]], '|AC| = b, |HC| = k, |BC| = a');
    const r6 = tahta.ekle([['b', YESIL], '·', ['b', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI], ', yani b² = k·a'], 'içler dışlar çarpımı ∎');
    gizle(s.f.g, tahta.baslik, s.buyukBolge, s.kucuk, s.yay, s.dik);

    await par(c.say('Öbür dik kenar için aynı yolu izleyelim.'), (async () => { await belir(c, s.f.g, 500); await belir(c, tahta.baslik, 400); })());
    await par(c.say('ABC ile HAC’de C açısı ortak; A ve H dik.', { speak: 'A B C ile H A C’de C açısı ortak; A ve H dik.' }), (async () => { await belir(c, [s.buyukBolge, s.kucuk, s.dik, s.yay], 500); await tahta.ac(r1); await tahta.ac(r2); })());
    await par(c.say('Açı-Açı: ABC ~ HAC; köşeler A↔H, B↔A, C↔C.', { speak: 'Açı-Açı: A B C, H A C’ye benzer; köşeler A, H ile; B, A ile; C, C ile eşleşir.' }), tahta.ac(r3));
    await par(c.say('Karşılıklı kenarlar: |AC|/|HC| = |BC|/|AC|.', { speak: 'Karşılıklı kenarlar: A C bölü H C eşittir B C bölü A C.' }), (async () => { await vurgula(c, [s.f.hat.b, s.f.hat.a], 800); await tahta.ac(r4); })());
    await par(c.say('Yani b/k = a/b; içler dışlar: b² = k·a.', { speak: 'Yani b bölü k eşittir a bölü b; içler dışlar: b kare eşittir k çarpı a.' }), (async () => { await tahta.ac(r5); await tahta.ac(r6); await tahta.parla(r6, SARI, 800); })());
    c.note('<b>Dik kenar:</b> c² = p·a, b² = k·a: hipotenüs çarpı kendi parçası.', 'Dik kenar', 'd4-dik-kenar');
  }

  /* ---- 5. Kendi parçası ---- */
  async function kendiParcasi(c) {
    const svg = c.svg(1000, 562);
    const f = ana(c, svg, { B: [70, 400], p: 3.6, k: 6.4, olcek: 44, etiket: { c: 'c', b: 'b', a: 'a', p: 'p', k: 'k', h: 'h' } });
    gizle(f.adlar.A, f.adlar.H);
    const hB = halka(c, svg, f.B, TURUNCU), hC = halka(c, svg, f.C, YESIL);
    const rh = renkli(c, svg, 700, 190, [['h²', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL]], { hiza: 'start', size: 32, kalin: 700 });
    const rc = renkli(c, svg, 700, 270, [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI]], { hiza: 'start', size: 32, kalin: 700 });
    const rb = renkli(c, svg, 700, 350, [['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI]], { hiza: 'start', size: 32, kalin: 700 });
    gizle(hB, hC, rh, rc, rb);

    await par(c.say('c ile p, B köşesinde buluşur: p, c’nin kendi parçası.', { speak: 'c ile p, B köşesinde buluşur: p, c’nin kendi parçası.' }), (async () => { await belir(c, hB, 350); await vurgula(c, [f.hat.c, f.ayak.p], 900); })());
    await par(c.say('b ile k, C köşesinde buluşur: k, b’nin kendi parçası.', { speak: 'b ile k, C köşesinde buluşur: k, b’nin kendi parçası.' }), (async () => { await belir(c, hC, 350); await vurgula(c, [f.hat.b, f.ayak.k], 900); })());
    await par(c.say('Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.', { speak: '[thoughtful] Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.' }), belir(c, [rc, rb], 600));
    await par(c.say('Yüksekliğin karesi ise iki parçanın çarpımıdır: h² = p·k.', { speak: 'Yüksekliğin karesi ise iki parçanın çarpımıdır: h kare eşittir p çarpı k.' }), (async () => { await belir(c, rh, 500); await vurgula(c, [f.hat.h], 700); })());
    await par(c.say('Üç bağıntı: h² = p·k, c² = p·a, b² = k·a.', { speak: 'Üç bağıntı: h kare eşittir p çarpı k, c kare eşittir p çarpı a, b kare eşittir k çarpı a.' }), (async () => { await buyut(c, rh, 650); await buyut(c, rc, 650); await buyut(c, rb, 650); })());
  }

  /* ---- 6. Çatı ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562);
    const f = ana(c, svg, { B: [70, 390], p: 1.8, k: 5, olcek: 60, etiket: { c: 'c', b: 'b', a: '6,8', p: '1,8', k: '5' } });
    gizle(f.etiket.a);
    const ra = yazi(c, svg, 540, 150, '', { hiza: 'start', size: 28, kalin: 700 });
    const rc = yazi(c, svg, 540, 240, '', { hiza: 'start', size: 28, kalin: 700 });
    const rb = yazi(c, svg, 540, 330, '', { hiza: 'start', size: 28, kalin: 700 });
    parcaKoy(c, ra, [['a', MAVI], ' = ', ['1,8', TURUNCU], ' + ', ['5', YESIL], ' = ', ['6,8', MAVI]]);
    parcaKoy(c, rc, [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI], ' = 1,8·6,8 = 12,24']);
    parcaKoy(c, rb, [['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI], ' = 5·6,8 = 34']);
    const hB = halka(c, svg, f.B, TURUNCU), hC = halka(c, svg, f.C, YESIL);
    gizle(ra, rc, rb, hB, hC);

    await par(c.say('Dik üçgen çatıda |BH| = 1,8 m, |HC| = 5 m.', { speak: 'Dik üçgen çatıda B H uzunluğu bir virgül sekiz metre, H C uzunluğu beş metre.' }), belir(c, f.g, 500));
    await par(c.say('Hipotenüs a = 1,8 + 5 = 6,8 m.', { speak: 'Hipotenüs a eşittir bir virgül sekiz artı beş eşittir altı virgül sekiz metre.' }), (async () => { await belir(c, ra, 450); await belir(c, f.etiket.a, 450); })());
    await par(c.say('AB kenarı c; kendi parçası p = 1,8.', { speak: 'A B kenarı c; kendi parçası p eşittir bir virgül sekiz.' }), (async () => { await belir(c, hB, 350); await vurgula(c, [f.hat.c, f.ayak.p], 900); })());
    await belir(c, ra, 350, 0); ra.remove();
    await par(c.say('c² = p·a = 1,8·6,8 = 12,24.', { speak: 'c kare eşittir p çarpı a eşittir bir virgül sekiz çarpı altı virgül sekiz eşittir on iki virgül yirmi dört.' }), belir(c, rc, 500));
    cevapla(f.etiket.c, '3,5');
    await par(c.say('c yaklaşık 3,5 m.', { speak: 'c yaklaşık üç virgül beş metre.' }), degistir(c, rc, [['c', TURUNCU], ' ≈ 3,5']));
    await belir(c, hB, 300, 0); hB.remove();
    await par(c.say('AC kenarı b; kendi parçası k = 5.', { speak: 'A C kenarı b; kendi parçası k eşittir beş.' }), (async () => { await belir(c, hC, 350); await vurgula(c, [f.hat.b, f.ayak.k], 900); })());
    await par(c.say('b² = k·a = 5·6,8 = 34.', { speak: 'b kare eşittir k çarpı a eşittir beş çarpı altı virgül sekiz eşittir otuz dört.' }), belir(c, rb, 500));
    cevapla(f.etiket.b, '√34');
    await par(c.say('b = √34 m.', { speak: 'b eşittir kök otuz dört metre.' }), degistir(c, rb, [['b', YESIL], ' = √34']));
  }

  /* ---- 7. İki dik üçgen ---- */
  async function ikiDik(c) {
    const svg = c.svg(1000, 562);
    const s = 22, X0 = 230, Y0 = 60, P = (u, v) => [X0 + u * s, Y0 + v * s];
    const Bp = P(0, 10.39), Fp = P(3, 10.39), Ep = P(18, 10.39), Cp = P(24, 10.39), Ap = P(18, 0), Dp = P(3, 17.1);
    const g = c.S('g', {}, svg);
    const nok = (pts) => pts.map((q) => q.join(',')).join(' ');
    const y1 = c.S('polygon', { points: nok([Ap, Bp, Cp]), fill: MAVI, 'fill-opacity': 0.14, stroke: 'none' }, g);
    const y2 = c.S('polygon', { points: nok([Dp, Bp, Ep]), fill: TURUNCU, 'fill-opacity': 0.16, stroke: 'none' }, g);
    const hCE = cizgi(c, g, Ep, Cp, MAVI, 4.5), hBA = cizgi(c, g, Bp, Ap, MAVI, 4.5), hAC = cizgi(c, g, Ap, Cp, MAVI, 4.5);
    const hBE = cizgi(c, g, Bp, Ep, TURUNCU, 4.5), hBD = cizgi(c, g, Bp, Dp, TURUNCU, 4.5), hDE = cizgi(c, g, Dp, Ep, TURUNCU, 4.5), hBF = cizgi(c, g, Bp, Fp, TURUNCU, 4.5);
    const hAE = cizgi(c, g, Ap, Ep, SARI, 4.5), hDF = cizgi(c, g, Dp, Fp, SARI, 4.5);
    const dA = aciYayi(c, g, Ap, Bp, Cp, RENK.cizgi, 30, { dik: true }), dD = aciYayi(c, g, Dp, Bp, Ep, RENK.cizgi, 30, { dik: true });
    const dE = aciYayi(c, g, Ep, Ap, Cp, RENK.cizgi, 26, { dik: true }), dF = aciYayi(c, g, Fp, Dp, Ep, RENK.cizgi, 26, { dik: true });
    const harf = (t, x, y) => yazi(c, g, x, y, t, { size: 26, kalin: 700 });
    const lA = harf('A', Ap[0], Ap[1] - 14), lB = harf('B', Bp[0] - 22, Bp[1] + 9), lC = harf('C', Cp[0] + 22, Cp[1] + 9), lD = harf('D', Dp[0], Dp[1] + 34);
    const lE = harf('E', Ep[0] + 16, Ep[1] + 32), lF = harf('F', Fp[0] + 18, Fp[1] - 12);
    const n12 = yazi(c, g, 727, 172, '12', { size: 26, kalin: 700, renk: MAVI }), n6 = yazi(c, g, 692, 322, '6', { size: 26, kalin: 700, renk: MAVI });
    const n3 = yazi(c, g, 262, 322, '3', { size: 26, kalin: 700, renk: TURUNCU }), nq = yazi(c, g, 236, 378, '?', { size: 26, kalin: 700, renk: TURUNCU });
    const hes = yazi(c, g, 500, 530, '', { size: 28, kalin: 700 });
    const ilk = [y1, y2, hCE, hBA, hAC, hBE, hBD, hDE, lA, lB, lC, lD], dikler = [dA, dD], yukseklik = [hAE, hDF, dE, dF, lE, lF], sayilar = [n12, n6, n3, nq];
    gizle(ilk, dikler, yukseklik, sayilar, hBF, hes);

    await par(c.say('İki dik üçgenli bir şekle bakalım: BAC ve BDE.', { speak: 'İki dik üçgenli bir şekle bakalım: B A C ve B D E.' }), belir(c, ilk, 600));
    await par(c.say('A ve D köşelerinde dik açı var.', { speak: 'A ve D köşelerinde dik açı var.' }), belir(c, dikler, 450));
    await par(c.say('AE ve DF, kendi hipotenüslerine inen yüksekliklerdir.', { speak: 'A E ve D F, kendi hipotenüslerine inen yüksekliklerdir.' }), belir(c, yukseklik, 550));
    await par(c.say('AC 12 cm, CE 6 cm, BF 3 cm; DB aranıyor.', { speak: 'A C on iki santimetre, C E altı santimetre, B F üç santimetre; D B aranıyor.' }), belir(c, sayilar, 500));
    parcaKoy(c, hes, [['|AC|²', MAVI], ' = ', ['|CE|', MAVI], '·', ['|CB|', MAVI]]);
    await par(c.say('BAC’de |AC|’nin kendi parçası |CE|: |AC|² = |CE|·|CB|.', { speak: 'B A C’de A C’nin kendi parçası C E: A C kare eşittir C E çarpı C B.' }), (async () => { await belir(c, hes, 450); await vurgula(c, [hAC, hCE], 900); })());
    await par(c.say('12² = 6·|CB| olduğundan |CB| = 24 cm.', { speak: 'On iki kare eşittir altı çarpı C B olduğundan C B eşittir yirmi dört santimetre.' }), degistir(c, hes, [['12² = 6·|CB|, yani |CB| = 24', MAVI]]));
    await par(c.say('|BE| = |CB| − |CE| = 24 − 6 = 18 cm.', { speak: 'B E eşittir C B eksi C E eşittir yirmi dört eksi altı eşittir on sekiz santimetre.' }), (async () => { await degistir(c, hes, ['|BE| = |CB| − |CE| = 24 − 6 = 18']); await vurgula(c, [hBE], 800); })());
    await par(c.say('BDE’de |DB|’nin kendi parçası |BF|: |DB|² = |BF|·|BE|.', { speak: 'B D E’de D B’nin kendi parçası B F: D B kare eşittir B F çarpı B E.' }), (async () => {
      await degistir(c, hes, [['|DB|²', TURUNCU], ' = ', ['|BF|', TURUNCU], '·', ['|BE|', TURUNCU]]); belir(c, hBF, 10); await vurgula(c, [hBD, hBF], 900);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: '|DB|² = |BF|·|BE| = 3·18 ise |DB|² kaçtır?',
      options: ['21', '54', '15'], answer: 1,
      hints: ['3 ile 18 çarpılır, toplanmaz.', '', 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.'],
      right: 'Evet. 3·18 = 54.',
    });
    c.clearSay();
    cevapla(nq, '7,3');
    await par(c.say('|DB|² = 54; |DB| = √54, yaklaşık 7,3 cm.', { speak: 'D B kare eşittir elli dört; D B eşittir kök elli dört, yaklaşık yedi virgül üç santimetre.' }), degistir(c, hes, ['|DB|² = 54, |DB| = √54 ≈ 7,3']));
    c.clearSay();
    await sil(c, g, 450);

    // Sıra sende.
    const g3 = c.S('g', {}, svg);
    const f = ana(c, g3, { B: [150, 420], p: 9, k: 16, olcek: 20, etiket: { p: '9', k: '16', c: '?', b: '20', h: '12' } });
    gizle(f.etiket.b, f.etiket.h);
    const h2 = renkli(c, g3, 560, 130, [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI], ' = 9·25 = 225'], { hiza: 'start', size: 28, kalin: 700 });
    gizle(h2);
    await belir(c, g3, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'BAC dik üçgeninde A dik, AH ⊥ BC; |BH| = 9 cm ve |HC| = 16 cm. |AB| kaç cm’dir?',
      options: ['12 cm', '20 cm', '15 cm'], answer: 2,
      hints: ['AB’nin kendi parçası BH; hipotenüs 9 + 16.', 'c² = p·a = 9·25.', ''],
      right: 'Evet. c² = 9·25 = 225.',
    });
    c.clearSay();
    cevapla(f.etiket.c, '15');
    await par(c.say('c² = p·a = 9·25 = 225, yani c = 15.', { speak: 'c kare eşittir p çarpı a eşittir dokuz çarpı yirmi beş eşittir iki yüz yirmi beş, yani c eşittir on beş.' }), (async () => { await belir(c, h2, 450); await vurgula(c, [f.hat.c], 800); })());
    await par(c.say('Aynı yolla b = 20, h = 12; 12 yüksekliktir, AB değil.', { speak: 'Aynı yolla b eşittir yirmi, h eşittir on iki; on iki yüksekliktir, A B değil.' }), (async () => { await belir(c, [f.etiket.b, f.etiket.h], 450); await vurgula(c, [f.hat.h], 800); })());
  }

  /* ---- 8. Dene: kendi parçasını bul ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const s = 36, ox = 320, oy = 205;
    const durumlar = [
      { tf: (u, v) => [ox + u * s, oy + v * s], n: 1, kenar: 'c', secenek: ['Sağdaki şerit', 'Soldaki şerit'], son: 'AB ile BH, B köşesinde buluşur.', speak: 'A B ile B H, B köşesinde buluşur.' },
      { tf: (u, v) => [ox + (10 - u) * s, oy + v * s], n: 1, kenar: 'b', secenek: ['Soldaki şerit', 'Sağdaki şerit'], son: 'AC ile HC, C köşesinde buluşur.', speak: 'A C ile H C, C köşesinde buluşur.' },
      { tf: (u, v) => [ox + (10 - u) * s, oy + (4.8 - v) * s], n: -1, kenar: 'c', secenek: ['Soldaki şerit', 'Sağdaki şerit'], son: 'Üçgen dönse de kural aynı: kenar ile kendi parçası aynı köşeden çıkar.', speak: 'Üçgen dönse de kural aynı: kenar ile kendi parçası aynı köşeden çıkar.' },
    ];
    async function durus(d, ilk) {
      const A = d.tf(3.6, 0), Bp = d.tf(0, 4.8), Cp = d.tf(10, 4.8), H = d.tf(3.6, 4.8);
      const g = c.S('g', {}, svg), M = agirlik([A, Bp, Cp]);
      const renkK = d.kenar === 'c' ? TURUNCU : YESIL, ad = d.kenar === 'c' ? 'Turuncu' : 'Yeşil';
      c.S('polygon', { points: [A, Bp, Cp].map((q) => q.join(',')).join(' '), fill: MAVI, 'fill-opacity': 0.1, stroke: 'none' }, g);
      cizgi(c, g, Bp, Cp, MAVI, 3.5);
      cizgi(c, g, A, Bp, d.kenar === 'c' ? renkK : RENK.cizgi, d.kenar === 'c' ? 6 : 3, d.kenar === 'c' ? {} : { 'stroke-opacity': 0.6 });
      cizgi(c, g, A, Cp, d.kenar === 'b' ? renkK : RENK.cizgi, d.kenar === 'b' ? 6 : 3, d.kenar === 'b' ? {} : { 'stroke-opacity': 0.6 });
      cizgi(c, g, A, H, SARI, 2.5, { 'stroke-dasharray': '6 6', 'stroke-opacity': 0.7 });
      aciYayi(c, g, A, Bp, Cp, RENK.cizgi, 30, { dik: true });
      const u = [(Cp[0] - Bp[0]) / uz(Bp, Cp), (Cp[1] - Bp[1]) / uz(Bp, Cp)], nx = -u[1] * d.n * (u[0] >= 0 ? 1 : -1), ny = u[0] * d.n * (u[0] >= 0 ? 1 : -1);
      const dis = (q, t) => [q[0] + nx * t, q[1] + ny * t];
      const sirt = (P, Q, a0, a1) => { const w = uz(P, Q), e = [(Q[0] - P[0]) / w, (Q[1] - P[1]) / w]; return cizgi(c, g, dis([P[0] + e[0] * a0, P[1] + e[1] * a0], 18), dis([Q[0] - e[0] * a1, Q[1] - e[1] * a1], 18), GRI, 10); };
      const sol = Bp[0] < Cp[0];                       // B ekranda solda mı
      const sB = sirt(Bp, H, 8, 5), sC = sirt(H, Cp, 5, 8);   // B–H ve H–C şeritleri
      const adlar = [['A', A], ['B', Bp], ['C', Cp]].map(([h, q]) => { const dd = uz(M, q); const m = h === 'A' ? 26 : 42; return yazi(c, g, q[0] + ((q[0] - M[0]) / dd) * m, q[1] + ((q[1] - M[1]) / dd) * m + 9, h, { size: 26, kalin: 700 }); });
      adlar.push(yazi(c, g, H[0] + nx * 52, H[1] + ny * 52 + (d.n > 0 ? 6 : 4), 'H', { size: 26, kalin: 700 }));
      const dogruSerit = d.kenar === 'c' ? sB : sC, ortak = d.kenar === 'c' ? Bp : Cp;
      const dogruSol = (d.kenar === 'c') === sol;       // doğru şerit ekranda solda mı
      const dogruMetin = dogruSol ? 'Soldaki şerit' : 'Sağdaki şerit';
      const cevap = d.secenek.indexOf(dogruMetin);
      await par(belir(c, g, 450), ilk ? c.say('Üçgen üç duruşta; her seferinde kenarın kendi parçasını seç.') : Promise.resolve());
      await c.choice({
        tag: 'Sıra sende', q: ad + ' kenarın kendi parçası hangisidir?',
        options: d.secenek, answer: cevap,
        hints: d.secenek.map((_, i) => (i === cevap ? '' : ad + ' kenar ' + (d.kenar === 'c' ? 'B' : 'C') + ' köşesinden çıkar; kendi parçası da o köşeden başlar.')),
        right: 'Evet. Aynı köşeden çıkar.',
      });
      c.clearSay();
      dogruSerit.setAttribute('stroke', renkK);
      const hl = halka(c, g, ortak, renkK, 24); gizle(hl);
      await par(belir(c, hl, 400), c.say(d.son, { speak: d.speak }));
      return g;
    }
    let g = await durus(durumlar[0], true);
    c.clearSay(); await sil(c, g, 350);
    g = await durus(durumlar[1], false);
    c.clearSay(); await sil(c, g, 350);
    g = await durus(durumlar[2], false);
    await c.say('Kendi parçası, kenarın hipotenüse değdiği köşeden başlar.');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d4', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Öklid teoremi: dik kenarın karesi', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Öklid teoremi: dik kenarın karesi',
      hook: 'Dik üçgen bir tarlanın bir kenarını, <b>karşı kenarı ölçmeden</b> bulabilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['Benzer üçgenlerden c² = p·a ve b² = k·a bağıntılarını çıkarır.', 'Dik kenarın kendi parçasını, kenarla aynı köşeden çıkan parça olarak bulur.', 'Dik kenarın karesi bağıntısıyla bilinmeyen bir uzunluğu hesaplar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Yüksekliğin karesini ve dik üçgenlerde Açı-Açı benzerliğini hatırlar.', run: hatirla },
      { title: 'Hangi iki üçgen?', goal: 'ABC ile HBA üçgenlerinin benzerliği sayılarla gösterilir.', run: hangi },
      { title: 'İspat: c² = p·a', goal: 'ABC ~ HBA benzerliğinden c² = p·a çıkar.', run: ispatC },
      { title: 'İspat: b² = k·a', goal: 'ABC ~ HAC benzerliğinden b² = k·a çıkar.', run: ispatB },
      { title: 'Kendi parçası', goal: 'Dik kenar ile kendi parçası aynı köşeden çıkar; üç bağıntı yan yana yazılır.', run: kendiParcasi },
      { title: 'Çatı', goal: 'c² = p·a ve b² = k·a ile çatının iki kenarı bulunur.', run: cati },
      { title: 'İki dik üçgen', goal: 'İki bağıntı arka arkaya kullanılarak bir uzunluk bulunur.', run: ikiDik },
      { title: 'Dene: kendi parçasını bul', goal: 'Üçgen dönse ya da yansısa da kenarın kendi parçası bulunur.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'BAC dik üçgeninde A dik, AH ⊥ BC, |BH| = p, |HC| = k, |BC| = a ve |AB| = c. Hangisi doğrudur?',
        options: ['c² = k·a', 'c² = p·a', 'c² = p·k'], answer: 1,
        why: ['c, B köşesinden çıkar; kendi parçası p’dir. k, b’nin kendi parçasıdır.', 'c ile p aynı köşeden (B) çıkar: dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.', 'p·k çarpımı c²’yi değil, yüksekliğin karesini (h²) verir.'],
        scene: 4,
      },
      {
        q: 'BAC dik üçgeninde A dik, AH ⊥ BC; |BH| = 4 cm ve |BC| = 16 cm. |AB| kaç cm’dir?',
        options: ['12 cm', '64 cm', '8 cm'], answer: 2,
        why: ['12, |HC| parçasıdır (16 − 4). |AB| için c² = p·a kullanılır.', '64, c² değeridir (4·16). Kök alınınca c = 8 olur.', 'c² = p·a = 4·16 = 64; c = 8.'],
        scene: 2,
      },
      {
        q: 'BAC dik üçgeninde A dik, AH ⊥ BC; |HC| = 5 cm ve |BC| = 20 cm. |AC| kaç cm’dir?',
        options: ['10 cm', '15 cm', '100 cm'], answer: 0,
        why: ['b² = k·a = 5·20 = 100; b = 10.', '15, |BH| parçasıdır (20 − 5). |AC| için b² = k·a kullanılır.', '100, b² değeridir. Kök alınınca b = 10 olur.'],
        scene: 3,
      },
      {
        q: 'BAC dik üçgeninde A dik, AH ⊥ BC; |AC| = 12 cm ve |HC| = 6 cm. |BC| kaç cm’dir?',
        options: ['18 cm', '24 cm', '2 cm'], answer: 1,
        why: ['18, |BH| parçası olurdu (24 − 6). |BC| hipotenüstür.', 'b² = k·a olduğundan 12² = 6·a; a = 144 ÷ 6 = 24.', '2, 12 ÷ 6 işleminden gelir; oysa b² = 144 olduğundan 144 ÷ 6 gerekir.'],
        scene: 3,
      },
      {
        q: 'Hipotenüsü 10 cm olan bir dik üçgenin bir dik kenarı 6 cm. Bu dik kenarın hipotenüs üzerindeki parçası kaç cm’dir?',
        options: ['4 cm', '6,4 cm', '3,6 cm'], answer: 2,
        why: ['10 − 6 = 4 işlemi parçayı vermez; kenarın kendi parçası bağıntıdan bulunur.', '6,4 öbür parçadır. Kenarın kendi parçası 36 ÷ 10 = 3,6’dır.', '6² = p·10 olduğundan p = 36 ÷ 10 = 3,6.'],
        scene: 1,
      },
    ],
    summary: [
      'Kendi parçası, kenarla aynı köşeden çıkan parçadır.',
      'Yükseklik için iki parça çarpılır.',
      '<b>Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.</b>',
    ],
    nextLesson: { href: 'd5-pisagor-ispati.html', label: 'Sonraki: Pisagor teoreminin ispatı ›' },
  });
})();
