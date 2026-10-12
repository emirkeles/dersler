/* D5 — Pisagor teoreminin ispatı
   Öklid'in iki dik kenar bağıntısı (c² = p·a, b² = k·a) taraf tarafa toplanır: b² + c² = a·(k + p) = a². İspat benzer üçgenlerden gelir, döngü yoktur.
   Sonra aynı teorem kitaptaki harflerle (a² + b² = c²), sayıyla doğrulama, ızgara ve yazı tahtası uygulaması, dik açı olmayan durumlar.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D5)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, uz, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, aciYayi, aciIci, agirlik, dondur, zemin } = window.KIT;
  const D = window.KIT_D;
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez, SOLUK = RENK.soluk, GRI = D.GRI;

  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + 4 * Math.sin(Math.PI * e)))); };
  const konumla = (t, P) => { t.setAttribute('x', P[0]); t.setAttribute('y', P[1]); };
  const noktalar = (pts) => pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');

  /* Dik üçgen (KIT_D.dikUcgen) ve onun düzeltmeleri (D3'teki `ana`): H harfi ayak çizgisinin altında ortada durur,
     p, k ve a yazıları aşağı itilir, H'de ikinci dik açı işareti eklenir. */
  function ana(c, p, o) {
    const f = D.dikUcgen(c, p, o);
    konumla(f.adlar.H, [f.H[0], f.B[1] + 42]);
    ['p', 'k'].forEach((q) => { if (f.etiket[q]) f.etiket[q].setAttribute('y', f.B[1] + 62); });
    if (f.etiket.a) f.etiket.a.setAttribute('y', f.B[1] + 100);
    f.dik.H2 = aciYayi(c, f.g, f.H, f.A, f.C, RENK.cizgi, 30, { dik: true });
    return f;
  }
  const hepsiniGizle = (f) => gizle(f.yuz, Object.values(f.hat), Object.values(f.ayak), Object.values(f.dik), Object.values(f.adlar), Object.values(f.etiket));

  /* V köşesinde dik açılı üçgen: V–P ve V–Q dik kenarlar (renk[0], renk[1]), P–Q hipotenüs (renk[2]). */
  function dikCiz(c, p, V, P, Q, renk, o = {}) {
    const g = c.S('g', {}, p), M = agirlik([V, P, Q]);
    const yuz = c.S('polygon', { points: noktalar([V, P, Q]), fill: MAVI, 'fill-opacity': 0.1, stroke: 'none' }, g);
    const l1 = cizgi(c, g, V, P, renk[0], 4.5), l2 = cizgi(c, g, V, Q, renk[1], 4.5), l3 = cizgi(c, g, P, Q, renk[2], 4.5);
    const dik = aciYayi(c, g, V, P, Q, RENK.cizgi, o.dikR || 30, { dik: true });
    return { g, yuz, l1, l2, l3, dik, M };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: dik kenarın hipotenüs üzerindeki parçası (D4).
    const g1 = c.S('g', {}, svg);
    const f1 = ana(c, g1, { B: [300, 400], p: 3, k: 9, olcek: 32, etiket: { c: '6', a: '12', p: '?' } });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dik üçgende bir dik kenar 6 cm, hipotenüs 12 cm. Bu dik kenarın hipotenüs üzerindeki parçası kaç cm’dir?',
      options: ['2 cm', '3 cm', '6 cm'], answer: 1,
      hints: ['Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 36 = 12·p.', '', 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 36 = 12·p.'],
      right: 'Evet. 36 = 12·3.',
    });
    c.clearSay();
    cevapla(f1.etiket.p, '3');
    await c.say('Dik kenarın karesi: 36 = 12·p, yani p = 3.', { speak: 'Dik kenarın karesi: otuz altı eşittir on iki çarpı p, yani p üç.' });
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: yüksekliğin karesi (D3).
    const g2 = c.S('g', {}, svg);
    const f2 = ana(c, g2, { B: [300, 420], p: 2, k: 8, olcek: 38, etiket: { h: '4', p: '2', k: '?' } });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dik üçgende hipotenüse inen yükseklik 4 cm; hipotenüsün parçalarından biri 2 cm. Öbür parça kaç cm’dir?',
      options: ['2 cm', '6 cm', '8 cm'], answer: 2,
      hints: ['Yüksekliğin karesi, iki parçanın çarpımıdır: 16 = 2·k.', 'Yüksekliğin karesi, iki parçanın çarpımıdır: 16 = 2·k.', ''],
      right: 'Evet. 16 = 2·8.',
    });
    c.clearSay();
    cevapla(f2.etiket.k, '8');
    await c.say('Yüksekliğin karesi: 16 = 2·k, yani k = 8.', { speak: 'Yüksekliğin karesi: on altı eşittir iki çarpı k, yani k sekiz.' });
  }

  /* ---- 2. Pisagor teoremi ---- */
  async function teorem(c) {
    const svg = c.svg(1000, 562);
    const O = [150, 110], K = [150, 470], F = [420, 470], M = agirlik([O, K, F]);
    const g = c.S('g', {}, svg);
    const duvar = cizgi(c, g, O, K, YESIL, 6), yer = cizgi(c, g, K, F, TURUNCU, 6), merdiven = cizgi(c, g, O, F, MAVI, 6);
    const dik = aciYayi(c, g, K, O, F, RENK.cizgi, 36, { dik: true });
    const e5 = D.kenarYazi(c, g, O, F, '5', MAVI, { merkez: M, size: 30 });
    const e4 = D.kenarYazi(c, g, O, K, '4', YESIL, { merkez: M, size: 30 });
    const e3 = D.kenarYazi(c, g, K, F, '3', TURUNCU, { merkez: M, size: 30 });
    const TX = 600;
    const eş1 = renkli(c, svg, TX, 200, [['3²', TURUNCU], ' + ', ['4²', YESIL], ' = 9 + 16 = 25'], { hiza: 'start', size: 28, kalin: 700 });
    const eş2 = renkli(c, svg, TX, 250, [['5²', MAVI], ' = 25'], { hiza: 'start', size: 28, kalin: 700 });
    const eş3 = renkli(c, svg, TX, 200, [['3²', TURUNCU], ' + ', ['4²', YESIL], ' = ', ['5²', MAVI]], { hiza: 'start', size: 40, kalin: 700 });
    const baslik = yazi(c, svg, TX, 130, 'Pisagor teoremi', { hiza: 'start', size: 32, kalin: 700, renk: SARI });
    const t1 = yazi(c, svg, TX, 320, 'MÖ 6. yüzyıl: Pisagor Okulu', { hiza: 'start', size: 25, renk: RENK.yazi });
    const t2 = yazi(c, svg, TX, 368, '300’den fazla ispat', { hiza: 'start', size: 25, renk: RENK.yazi });
    const t3 = yazi(c, svg, TX, 416, 'Öklid: Elemanlar', { hiza: 'start', size: 25, renk: RENK.yazi });
    const t4 = yazi(c, svg, TX, 200, 'Öklid bağıntılarıyla ispat', { hiza: 'start', size: 24, kalin: 700, renk: RENK.yazi });
    gizle(g, e5, e4, e3, eş1, eş2, eş3, baslik, t1, t2, t3, t4);
    gizle(dik);

    await par(c.say('Bir merdiven duvara dayalı; boyu 5 m.', { speak: 'Bir merdiven duvara dayalı; boyu beş metre.' }), (async () => { await belir(c, g, 500); await belir(c, e5, 350); })());
    await par(c.say('Ayağı duvardan 3 m uzakta; 4 m yüksekliğe değiyor.', { speak: 'Ayağı duvardan üç metre uzakta; dört metre yüksekliğe değiyor.' }), (async () => { await belir(c, [e3, dik], 350); await belir(c, e4, 350); })());
    await par(c.say('3² + 4² = 9 + 16 = 25; 5² = 25.', { speak: 'Üç kare artı dört kare eşittir dokuz artı on altı eşittir yirmi beş; beş kare eşittir yirmi beş.' }), (async () => { await belir(c, eş1, 500); await belir(c, eş2, 500); })());
    await par(c.say('Dik kenarların kareleri toplamı, hipotenüsün karesine eşit.', { speak: 'Dik kenarların kareleri toplamı, hipotenüsün karesine eşit.' }), (async () => {
      await belir(c, [eş1, eş2], 350, 0); await belir(c, eş3, 500);
    })());
    await par(c.say('Bu bağıntı Pisagor teoremi; ortaokuldan biliyoruz.'), belir(c, baslik, 500));
    await par(c.say('Pisagor ve Pisagor Okulu öğrencileri MÖ 6. yüzyılda bu teoremi kanıtlamıştır.', { speak: 'Pisagor ve Pisagor Okulu öğrencileri, milattan önce altıncı yüzyılda bu teoremi kanıtlamıştır.' }), belir(c, t1, 500));
    await par(c.say('Teoremin bilinen 300’den fazla ispatı vardır.', { speak: 'Teoremin bilinen üç yüzden fazla ispatı vardır.' }), belir(c, t2, 500));
    await par(c.say('Öklid, Elemanlar adlı eserinde bu teoremi ayrıntılı ele almıştır.'), belir(c, t3, 500));
    await par(c.say('Şimdi Öklid bağıntılarına dayanan bir ispatı görelim.'), (async () => {
      await belir(c, [t1, t2, t3, eş3, baslik], 350, 0); await belir(c, t4, 500);
    })());
    t4.textContent = 'Her dik üçgende neden doğru?';
    await par(c.say('3, 4, 5 için doğru; her dik üçgende neden doğru?', { speak: '[curious] Üç, dört, beş için doğru; her dik üçgende neden doğru?' }), c.wait(300));
  }

  /* ---- 3. İspat: iki Öklid bağıntısı ---- */
  async function ispat1(c) {
    const svg = c.svg(1000, 562);
    const ISTENEN = [['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a²', MAVI]];
    const tahta = D.ispatTahtasi(c, svg, { x: 30, y: 178, aralik: 46, size: 22, gerekceSize: 18, verilen: 'm(BAC) = 90°', istenen: ISTENEN });
    const VER1 = [['Verilen: ', SOLUK], 'm(BAC) = 90°'];
    const VER2 = [...VER1, '; |BC| = ', ['a', MAVI], ', |AC| = ', ['b', YESIL], ', |AB| = ', ['c', TURUNCU]];
    const s1 = tahta.ekle([['1. ', SOLUK], 'AH ⊥ BC çiz; |BH| = ', ['p', TURUNCU], ', |HC| = ', ['k', YESIL]], 'yardımcı çizgi (A’dan dikme)');
    const s2 = tahta.ekle([['2. ', SOLUK], ['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI]], 'Öklid, dik kenar bağıntısı');
    const s3 = tahta.ekle([['3. ', SOLUK], ['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI]], 'Öklid, dik kenar bağıntısı');
    const f = ana(c, svg, { B: [380, 452], p: 1.8, k: 3.2, olcek: 50, etiket: { a: 'a', b: 'b', c: 'c', h: 'h', p: 'p', k: 'k' } });
    f.etiket.a.setAttribute('y', f.B[1] + 50);
    hepsiniGizle(f); gizle(tahta.baslik);
    parcaKoy(c, tahta.baslik[0], VER1);

    await par(c.say('Verilen: BAC dik üçgeni, A dik.', { speak: 'Verilen: B A C dik üçgeni, A dik.' }),
      (async () => { await belir(c, [f.yuz, f.hat.a, f.hat.b, f.hat.c, f.dik.A, f.adlar.A, f.adlar.B, f.adlar.C], 500); await belir(c, tahta.baslik[0], 350); })());
    await par(c.say('Hipotenüs |BC| = a; dik kenarlar b ve c.', { speak: 'Hipotenüs B C uzunluğu a; dik kenarlar b ve c.' }),
      (async () => { parcaKoy(c, tahta.baslik[0], VER2); await belir(c, [f.etiket.a, f.etiket.b, f.etiket.c], 450); })());
    await par(c.say('İstenen: b² + c² = a².', { speak: 'İstenen: b kare artı c kare eşittir a kare.' }), belir(c, tahta.baslik[1], 450));
    await par(c.say('Önce yardımcı çizgi: A’dan BC’ye AH dikmesi.', { speak: 'Önce yardımcı çizgi: A’dan B C’ye A H dikmesi.' }),
      belir(c, [f.hat.h, f.dik.H, f.dik.H2, f.adlar.H, f.etiket.h], 600));
    await par(c.say('Hipotenüs iki parçaya ayrıldı: |BH| = p, |HC| = k.', { speak: 'Hipotenüs iki parçaya ayrıldı: B H uzunluğu p, H C uzunluğu k.' }), (async () => {
      f.etiket.a.setAttribute('y', f.B[1] + 100);
      await par(belir(c, [f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k], 500), tahta.ac(s1));
    })());
    await par(c.say('Öklid: c² = p·a.', { speak: 'Öklid: c kare eşittir p çarpı a.' }), (async () => { const v = vurgula(c, [f.hat.c, f.ayak.p, f.hat.a], 800); await tahta.ac(s2); await v; })());
    await par(c.say('Öklid: b² = k·a.', { speak: 'Öklid: b kare eşittir k çarpı a.' }), (async () => { const v = vurgula(c, [f.hat.b, f.ayak.k, f.hat.a], 800); await tahta.ac(s3); await v; })());
  }

  /* ---- 4. İspat: topla ---- */
  async function ispat2(c) {
    const svg = c.svg(1000, 562);
    const istenen = renkli(c, svg, 30, 64, [['İstenen: ', SOLUK], ['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a²', MAVI]], { hiza: 'start', size: 26, kalin: 700 });
    const tahta = D.ispatTahtasi(c, svg, { x: 30, y: 128, aralik: 50, size: 22, gerekceSize: 18 });
    const s2 = tahta.ekle([['2. ', SOLUK], ['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI]], 'Öklid, dik kenar bağıntısı');
    const s3 = tahta.ekle([['3. ', SOLUK], ['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI]], 'Öklid, dik kenar bağıntısı');
    const s4 = tahta.ekle([['4. ', SOLUK], ['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['k', YESIL], '·', ['a', MAVI], ' + ', ['p', TURUNCU], '·', ['a', MAVI]], '2 ve 3’ü taraf tarafa topla');
    const s5 = tahta.ekle([['5. ', SOLUK], ['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a', MAVI], '·(', ['k', YESIL], ' + ', ['p', TURUNCU], ')'], 'a ortak çarpan');
    const s6 = tahta.ekle([['6. ', SOLUK], ['k', YESIL], ' + ', ['p', TURUNCU], ' = ', ['a', MAVI]], 'H, BC üzerinde: iki parça hipotenüsü tamamlar');
    const s7 = tahta.ekle([['7. ', SOLUK], ['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a', MAVI], '·', ['a', MAVI], ' = ', ['a²', MAVI]], '5 ve 6 ∎');
    // Hipotenüs çubuğu: p ve k yan yana, birleşince a.
    const bx = 250, by = 452, S = 100;
    const cub = c.S('g', {}, svg);
    c.S('rect', { x: bx, y: by, width: 1.8 * S, height: 40, fill: TURUNCU, 'fill-opacity': 0.3, stroke: TURUNCU, 'stroke-width': 3 }, cub);
    c.S('rect', { x: bx + 1.8 * S, y: by, width: 3.2 * S, height: 40, fill: YESIL, 'fill-opacity': 0.3, stroke: YESIL, 'stroke-width': 3 }, cub);
    yazi(c, cub, bx + 0.9 * S, by + 29, 'p', { size: 26, kalin: 700, renk: TURUNCU });
    yazi(c, cub, bx + 3.4 * S, by + 29, 'k', { size: 26, kalin: 700, renk: YESIL });
    const kume = c.S('g', {}, svg);
    cizgi(c, kume, [bx, by + 62], [bx + 5 * S, by + 62], MAVI, 4);
    cizgi(c, kume, [bx, by + 52], [bx, by + 72], MAVI, 4); cizgi(c, kume, [bx + 5 * S, by + 52], [bx + 5 * S, by + 72], MAVI, 4);
    yazi(c, kume, bx + 2.5 * S, by + 100, 'a', { size: 28, kalin: 700, renk: MAVI });
    const sonuc = renkli(c, svg, 500, 492, [['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a²', MAVI]], { size: 50, kalin: 700 });
    const cerceve = c.S('rect', { x: 300, y: 445, width: 400, height: 64, rx: 12, fill: 'none', stroke: SARI, 'stroke-width': 3.5 }, svg);
    const ad = yazi(c, svg, 500, 545, 'Pisagor teoremi', { size: 30, kalin: 700, renk: SARI });
    const b1 = yazi(c, svg, 730, 150, 'ABC ~ HBA', { hiza: 'start', size: 28, kalin: 700, renk: RENK.yazi });
    const b2 = yazi(c, svg, 730, 200, 'ABC ~ HAC', { hiza: 'start', size: 28, kalin: 700, renk: RENK.yazi });
    gizle(cub, kume, sonuc, cerceve, ad, b1, b2);
    await tahta.ac(s2, 10); await tahta.ac(s3, 10);

    await par(c.say('İki eşitliği taraf tarafa toplayalım.'), (async () => { await par(tahta.parla(s2, SARI, 900), tahta.parla(s3, SARI, 900)); })());
    await par(c.say('b² + c² = k·a + p·a.', { speak: 'b kare artı c kare eşittir k çarpı a artı p çarpı a.' }), tahta.ac(s4));
    await par(c.say('Sağ yanda a ortak çarpan: a·(k + p).', { speak: 'Sağ yanda a ortak çarpan: a çarpı, k artı p.' }), (async () => { await tahta.ac(s5); await belir(c, cub, 500); })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'a·(k + p) ifadesindeki k + p hangi uzunluğa eşittir?',
      options: ['|AH| = h', '|BC| = a: iki parça hipotenüsü tamamlar', '|AB| = c'], answer: 1,
      hints: ['p ve k hipotenüsün iki parçasıydı.', '', 'İki parça birleşince hipotenüsün tamamı olur.'],
      right: 'Evet. İki parça birleşince hipotenüs olur.',
    });
    c.clearSay();
    await par(c.say('k + p = a: iki parça hipotenüsü tamamlar.', { speak: 'k artı p eşittir a: iki parça hipotenüsü tamamlar.' }), (async () => { await belir(c, kume, 500); await tahta.ac(s6); })());
    await par(c.say('Böylece b² + c² = a·a = a².', { speak: 'Böylece b kare artı c kare eşittir a çarpı a eşittir a kare.' }), tahta.ac(s7));
    await par(c.say('İspat tamam: dik kenarların kareleri toplamı hipotenüsün karesidir.', { speak: '[short pause] İspat tamam: dik kenarların kareleri toplamı hipotenüsün karesidir.' }), (async () => {
      await belir(c, [cub, kume], 350, 0); await belir(c, [sonuc, cerceve], 550);
    })());
    await par(c.say('Bu, Pisagor teoremidir.'), belir(c, ad, 500));
    await par(c.say('Her adım benzer üçgenlerden geldi: Pisagor da benzerliğin sonucu.'), (async () => { await belir(c, b1, 450); await belir(c, b2, 450); })());
  }

  /* ---- 5. Sayıyla doğrula ---- */
  async function sayiyla(c) {
    const svg = c.svg(1000, 562);
    const f = ana(c, svg, { B: [70, 400], p: 1.8, k: 3.2, olcek: 100, etiket: { a: '5', b: '4', c: '3', p: '1,8', k: '3,2' } });
    Object.values(f.adlar).forEach((e) => e.remove());
    const TX = 690;
    const l1 = renkli(c, svg, TX, 150, [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI], ' = ', ['1,8', TURUNCU], '·', ['5', MAVI], ' = ', ['9', TURUNCU]], { hiza: 'start', size: 24, kalin: 700 });
    const l2 = renkli(c, svg, TX, 205, [['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI], ' = ', ['3,2', YESIL], '·', ['5', MAVI], ' = ', ['16', YESIL]], { hiza: 'start', size: 24, kalin: 700 });
    const l3 = renkli(c, svg, TX, 290, [['9', TURUNCU], ' + ', ['16', YESIL], ' = 25'], { hiza: 'start', size: 28, kalin: 700 });
    const l4 = renkli(c, svg, TX, 345, [['a²', MAVI], ' = ', ['5²', MAVI], ' = 25'], { hiza: 'start', size: 28, kalin: 700 });
    gizle(f.g, l1, l2, l3, l4);

    await par(c.say('3-4-5 üçgeninde yükseklik hipotenüsü 1,8 ve 3,2 parçaya böler.', { speak: 'Üç dört beş üçgeninde yükseklik hipotenüsü bir virgül sekiz ve üç virgül iki parçaya böler.' }), belir(c, f.g, 600));
    await par(c.say('c² = p·a = 1,8·5 = 9.', { speak: 'c kare eşittir p çarpı a eşittir bir virgül sekiz çarpı beş eşittir dokuz.' }), (async () => { const v = vurgula(c, [f.hat.c, f.ayak.p, f.hat.a], 800); await belir(c, l1, 500); await v; })());
    await par(c.say('b² = k·a = 3,2·5 = 16.', { speak: 'b kare eşittir k çarpı a eşittir üç virgül iki çarpı beş eşittir on altı.' }), (async () => { const v = vurgula(c, [f.hat.b, f.ayak.k, f.hat.a], 800); await belir(c, l2, 500); await v; })());
    await par(c.say('Toplam: 9 + 16 = 25.', { speak: 'Toplam: dokuz artı on altı eşittir yirmi beş.' }), (async () => {
      await belir(c, [l1, l2], 250, 0);
      parcaKoy(c, l1, [['c²', TURUNCU], ' = ', ['9', TURUNCU]]); parcaKoy(c, l2, [['b²', YESIL], ' = ', ['16', YESIL]]);
      await belir(c, [l1, l2], 250, 1); await belir(c, l3, 500);
    })());
    await par(c.say('Hipotenüsün karesi: a² = 5² = 25.', { speak: 'Hipotenüsün karesi: a kare eşittir beş kare eşittir yirmi beş.' }), belir(c, l4, 500));
    await par(c.say('İspat sayıyla da tutuyor.'), vurgula(c, [f.hat.a, f.hat.b, f.hat.c], 900));
  }

  /* ---- 6. Aynı teorem, başka harfler ---- */
  async function harfler(c) {
    const svg = c.svg(1000, 562);
    const s = 62;
    // Solda ispat üçgeni: hipotenüs a, dik kenarlar b ve c.
    const LB = [60, 330], LA = [LB[0] + 1.8 * s, LB[1] - 2.4 * s], LC = [LB[0] + 5 * s, LB[1]];
    const sol = dikCiz(c, svg, LA, LB, LC, [TURUNCU, YESIL, MAVI]);
    const sc = D.kenarYazi(c, sol.g, LA, LB, 'c', TURUNCU, { merkez: sol.M, size: 28 });
    const sb = D.kenarYazi(c, sol.g, LA, LC, 'b', YESIL, { merkez: sol.M, size: 28 });
    const sa = D.kenarYazi(c, sol.g, LB, LC, 'a', MAVI, { merkez: sol.M, size: 28 });
    const eSol = renkli(c, svg, 215, 450, [['b²', YESIL], ' + ', ['c²', TURUNCU], ' = ', ['a²', MAVI]], { size: 38, kalin: 700 });
    // Sağda kitaptaki gösterim: dik açı C'de; a yatay, b dikey, c hipotenüs.
    const RC = [680, 390], RB = [RC[0] + 3 * s, RC[1]], RA = [RC[0], RC[1] - 4 * s];
    const sag = dikCiz(c, svg, RC, RB, RA, [TURUNCU, YESIL, MAVI]);
    const ra = D.kenarYazi(c, sag.g, RC, RB, 'a', TURUNCU, { merkez: sag.M, size: 28 });
    const rb = D.kenarYazi(c, sag.g, RC, RA, 'b', YESIL, { merkez: sag.M, size: 28 });
    const rc = D.kenarYazi(c, sag.g, RA, RB, 'c', MAVI, { merkez: sag.M, size: 28 });
    const eSag = renkli(c, svg, 770, 490, [['a²', TURUNCU], ' + ', ['b²', YESIL], ' = ', ['c²', MAVI]], { size: 38, kalin: 700 });
    const cerceve = c.S('rect', { x: 630, y: 448, width: 280, height: 62, rx: 12, fill: 'none', stroke: SARI, 'stroke-width': 3.5 }, svg);
    const m1 = renkli(c, svg, 525, 245, [['c', TURUNCU], '→', ['a', TURUNCU]], { size: 36, kalin: 700 });
    const m2 = renkli(c, svg, 525, 295, [['b', YESIL], '→', ['b', YESIL]], { size: 36, kalin: 700 });
    const m3 = renkli(c, svg, 525, 345, [['a', MAVI], '→', ['c', MAVI]], { size: 36, kalin: 700 });
    const solHepsi = [sol.g, eSol], sagHepsi = [sag.g, eSag];
    gizle(solHepsi, sagHepsi, cerceve, m1, m2, m3);

    await par(c.say('Harfleri değiştirsek de teorem değişmez.'), (async () => {
      await belir(c, solHepsi, 600); await belir(c, m1, 350); await belir(c, m2, 350); await belir(c, m3, 350);
    })());
    await par(c.say('Dik kenarlar a, b; hipotenüs c: a² + b² = c².', { speak: 'Dik kenarlar a, b; hipotenüs c: a kare artı b kare eşittir c kare.' }), belir(c, sagHepsi, 700));
    c.note('<b>Pisagor:</b> a² + b² = c²; örnek 3² + 4² = 5².', 'Pisagor', 'd5-pisagor');
    await par(c.say('Bundan sonra Pisagor teoremini bu harflerle yazacağız.'), belir(c, cerceve, 500));
  }

  /* ---- 7. Pisagor'u kullan ---- */
  async function kullan(c) {
    const svg = c.svg(1000, 562);
    // 1. Izgara: robot A′'dan B′'ne, oradan C′'ne.
    const g1 = c.S('g', {}, svg);
    const z = zemin(c, g1, { x0: 60, y0: 70, b: 36, sutun: 16, satir: 12 });
    const A1 = z.P(0, 0), B1 = z.P(16, 0), C1 = z.P(16, 12);
    const yuz = c.S('polygon', { points: noktalar([A1, B1, C1]), fill: MAVI, 'fill-opacity': 0.1, stroke: 'none' }, g1);
    const hip = cizgi(c, g1, A1, C1, MAVI, 4.5);
    const yol1 = cizgi(c, g1, A1, A1, TURUNCU, 5.5), yol2 = cizgi(c, g1, B1, B1, YESIL, 5.5);
    const dik = aciYayi(c, g1, B1, A1, C1, RENK.cizgi, 30, { dik: true });
    const nA = yazi(c, g1, A1[0] - 24, A1[1] - 8, 'A′', { size: 26, kalin: 700 }), nB = yazi(c, g1, B1[0] + 28, B1[1] - 8, 'B′', { size: 26, kalin: 700 }), nC = yazi(c, g1, C1[0] + 28, C1[1] + 24, 'C′', { size: 26, kalin: 700 });
    const e16 = yazi(c, g1, (A1[0] + B1[0]) / 2, A1[1] - 18, '16', { size: 26, kalin: 700, renk: TURUNCU });
    const e12 = yazi(c, g1, B1[0] + 26, (B1[1] + C1[1]) / 2 + 9, '12', { size: 26, kalin: 700, renk: YESIL });
    const eh = yazi(c, g1, 330, 312, '?', { size: 28, kalin: 700, renk: MAVI });
    const robot = c.S('circle', { cx: A1[0], cy: A1[1], r: 9, fill: SARI }, g1);
    const TX = 700;
    const h1 = renkli(c, g1, TX, 200, [['|A′C′|²', MAVI], ' = ', ['16²', TURUNCU], ' + ', ['12²', YESIL]], { hiza: 'start', size: 24, kalin: 700 });
    const h2 = renkli(c, g1, TX, 250, ['= 256 + 144 = 400'], { hiza: 'start', size: 24, kalin: 700 });
    const h3 = renkli(c, g1, TX, 300, [['|A′C′|', MAVI], ' = 20'], { hiza: 'start', size: 26, kalin: 700 });
    gizle(yuz, hip, dik, e16, e12, eh, nB, nC, h1, h2, h3, robot);
    await belir(c, [z.g, nA, robot], 500);
    await par(c.say('Robot, A′ noktasından B′ noktasına 16 birim sağa gidiyor.', { speak: 'Robot, A üssü noktasından B üssü noktasına on altı birim sağa gidiyor.' }), (async () => {
      await belir(c, [nB, e16], 300);
      await c.tween(1300, (e) => { const Q = ara(A1, B1, e); koy(yol1, A1, Q); robot.setAttribute('cx', Q[0]); robot.setAttribute('cy', Q[1]); });
    })());
    await par(c.say('Sonra C′ noktasına 12 birim aşağı iniyor.', { speak: 'Sonra C üssü noktasına on iki birim aşağı iniyor.' }), (async () => {
      await belir(c, [nC, e12], 300);
      await c.tween(1300, (e) => { const Q = ara(B1, C1, e); koy(yol2, B1, Q); robot.setAttribute('cx', Q[0]); robot.setAttribute('cy', Q[1]); });
    })());
    await par(c.say('B′’de açı dik: A′B′C′ dik üçgen.', { speak: 'B üssünde açı dik: A üssü B üssü C üssü dik üçgen.' }), belir(c, [yuz, hip, dik, eh], 600));
    await par(c.say('|A′C′|² = 16² + 12².', { speak: 'A üssü C üssü uzunluğunun karesi eşittir on altı kare artı on iki kare.' }), belir(c, h1, 500));
    await par(c.say('|A′C′|² = 256 + 144 = 400.', { speak: 'A üssü C üssü uzunluğunun karesi eşittir iki yüz elli altı artı yüz kırk dört eşittir dört yüz.' }), belir(c, h2, 500));
    await par(c.say('|A′C′| = 20 birim.', { speak: 'A üssü C üssü uzunluğu yirmi birim.' }), (async () => { cevapla(eh, '20'); await belir(c, h3, 500); })());
    c.clearSay();
    await sil(c, g1, 450);

    // 2. Yazı tahtası: B çevresinde dönüş.
    const T = (q) => [40 + 2 * (q[0] + 30), 80 + 2 * q[1]];
    const bA = T([0, 120]), bB = T([240, 120]), bC = T([240, 0]), bD = T([0, 0]);
    const th = (Math.atan2(5, 12) * 180) / Math.PI;
    const g2 = c.S('g', {}, svg);
    const mavi = c.S('polygon', { points: noktalar([bA, bB, bC, bD]), fill: MAVI, 'fill-opacity': 0.12, stroke: MAVI, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g2);
    const tur = c.S('polygon', { points: noktalar([bA, bB, bC, bD]), fill: TURUNCU, 'fill-opacity': 0.12, stroke: TURUNCU, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, g2);
    const dondu = (e) => [bA, bB, bC, bD].map((P) => dondur(P, bB, -th * e));
    const qA = dondu(1)[0], qC = dondu(1)[2], qD = dondu(1)[3];
    const E = T([0, 90]);
    const ad = (P, m, dx, dy, renk) => yazi(c, g2, P[0] + dx, P[1] + dy, m, { size: 26, kalin: 700, renk: renk || RENK.yazi });
    const nA2 = ad(bA, 'A', 14, 34), nB2 = ad(bB, 'B', 24, 26), nC2 = ad(bC, 'C', 22, -8), nD2 = ad(bD, 'D', -20, -4);
    const nC3 = ad(qC, 'C′', -2, -16), nD3 = ad(qD, 'D′', -26, 22), nE = ad(E, 'E', -20, -8);
    const l120 = yazi(c, g2, 550, 207, '120', { size: 26, kalin: 700, renk: TURUNCU });
    const l240 = yazi(c, g2, (bA[0] + bB[0]) / 2, 354, '240', { size: 26, kalin: 700, renk: MAVI });
    const l30 = yazi(c, g2, E[0] + 26, 304, '30', { size: 26, kalin: 700, renk: MAVI });
    const lsor = yazi(c, g2, ara(E, qC, 0.5)[0] - 8, ara(E, qC, 0.5)[1] - 24, '?', { size: 28, kalin: 700, renk: TURUNCU });
    const merkez = nokta(c, g2, bB, SARI, 8);
    const eAD = cizgi(c, g2, bA, bD, MAVI, 8), eCD = cizgi(c, g2, qC, qD, TURUNCU, 8);
    const eAE = cizgi(c, g2, bA, E, MAVI, 7), eEC = cizgi(c, g2, E, qC, TURUNCU, 7);
    const nE1 = nokta(c, g2, E, RENK.yazi, 6);
    const uA = c.S('polygon', { points: noktalar([E, bA, bB]), fill: MAVI, 'fill-opacity': 0.22, stroke: 'none' }, g2);
    const uC = c.S('polygon', { points: noktalar([E, qC, bB]), fill: TURUNCU, 'fill-opacity': 0.22, stroke: 'none' }, g2);
    const eEB = cizgi(c, g2, E, bB, RENK.cizgi, 4.5);
    const dA = aciYayi(c, g2, bA, E, bB, RENK.cizgi, 30, { dik: true }), dC = aciYayi(c, g2, qC, E, bB, RENK.cizgi, 30, { dik: true });
    g2.insertBefore(uA, eAD); g2.insertBefore(uC, eAD);
    const X = 650;
    const k1 = renkli(c, g2, X, 190, [['|EB|²', RENK.cizgi], ' = ', ['30²', MAVI], ' + ', ['240²', MAVI]], { hiza: 'start', size: 24, kalin: 700 });
    const k2 = renkli(c, g2, X, 238, ['= 900 + 57 600 = 58 500'], { hiza: 'start', size: 24, kalin: 700 });
    const k3 = renkli(c, g2, X, 296, [['|EB|²', RENK.cizgi], ' = ', ['|EC′|²', TURUNCU], ' + ', ['120²', TURUNCU]], { hiza: 'start', size: 24, kalin: 700 });
    gizle(mavi, tur, nA2, nB2, nC2, nD2, nC3, nD3, nE, l120, l240, l30, lsor, merkez, eAD, eCD, eAE, eEC, nE1, uA, uC, eEB, dA, dC, k1, k2, k3);

    await par(c.say('Yazı tahtası dikdörtgen: kısa kenarı 120 cm, uzun kenarı 240 cm.', { speak: 'Yazı tahtası dikdörtgen: kısa kenarı yüz yirmi santimetre, uzun kenarı iki yüz kırk santimetre.' }), (async () => {
      await belir(c, [mavi, nA2, nB2, nC2, nD2], 600); await belir(c, [l120, l240], 400);
    })());
    await par(c.say('Vidalar kırılınca tahta B köşesi çevresinde dönüyor.'), (async () => {
      tur.style.opacity = 1; await belir(c, [merkez], 250); nB2.style.fill = SARI;
      const l0 = [550, 207];
      belir(c, nC2, 300, 0);
      await c.tween(1700, (e) => {
        const q = dondu(e); tur.setAttribute('points', noktalar(q));
        const m = dondur(l0, bB, -th * e); l120.setAttribute('x', m[0]); l120.setAttribute('y', m[1]);
      });
      nC2.remove(); await belir(c, [nC3, nD3], 350);
    })());
    await par(c.say('E noktası, eski AD kenarı ile yeni C′D′ kenarının kesişimi.', { speak: 'E noktası, eski A D kenarı ile yeni C üssü D üssü kenarının kesişimi.' }), (async () => {
      await belir(c, [eAD, eCD], 450); await belir(c, [nE1, nE], 350); await belir(c, [eAD, eCD], 600, 0); eAD.remove(); eCD.remove();
    })());
    await par(c.say('|AE| = 30 cm; |EC′| aranıyor.', { speak: 'A E uzunluğu otuz santimetre; E C üssü uzunluğu aranıyor.' }), (async () => { await belir(c, [eAE, eEC, l30], 450); await belir(c, lsor, 350); })());
    await par(c.say('EAB üçgeninde A dik: |EB|² = 30² + 240².', { speak: 'E A B üçgeninde A dik: E B uzunluğunun karesi eşittir otuz kare artı iki yüz kırk kare.' }), (async () => { await belir(c, [uA, eEB, dA], 500); await belir(c, k1, 450); })());
    await c.choice({
      tag: 'Birlikte çöz', q: '|EB|² = 30² + 240² kaçtır?',
      options: ['72 900', '270', '58 500'], answer: 2,
      hints: ['Kareler toplanır; sayılar toplanıp karesi alınmaz.', 'Önce her sayının karesi: 900 ve 57 600.', ''],
      right: 'Evet. 900 + 57 600 = 58 500.',
    });
    c.clearSay();
    await par(c.say('|EB|² = 900 + 57 600 = 58 500.', { speak: 'E B uzunluğunun karesi eşittir dokuz yüz artı elli yedi bin altı yüz eşittir elli sekiz bin beş yüz.' }), belir(c, k2, 500));
    await par(c.say('EC′B üçgeninde C′ dik: |EB|² = |EC′|² + 120².', { speak: 'E C üssü B üçgeninde C üssü dik: E B uzunluğunun karesi eşittir E C üssü uzunluğunun karesi artı yüz yirmi kare.' }), (async () => {
      await belir(c, [uA, dA, k1], 350, 0); parcaKoy(c, k2, [['|EB|²', RENK.cizgi], ' = 58 500']); await belir(c, [uC, dC], 500); await belir(c, k3, 450);
    })());
    await c.choice({
      tag: 'Sıra sende', q: '58 500 = |EC′|² + 120². |EC′| kaç cm’dir?',
      options: ['270 cm', '210 cm', '44 100 cm'], answer: 1,
      hints: ['120² = 14 400; |EC′|² = 58 500 − 14 400.', '', 'Çıkan sayı |EC′|’nin karesi; kendisini bulmak için karekök al.'],
      right: 'Evet. |EC′|² = 44 100, |EC′| = 210.',
    });
    c.clearSay();
    parcaKoy(c, k2, [['|EC′|²', TURUNCU], ' = 44 100']); parcaKoy(c, k3, [['|EC′|', TURUNCU], ' = 210 cm']);
    await par(c.say('|EC′|² = 44 100; |EC′| = 210 cm.', { speak: 'E C üssü uzunluğunun karesi kırk dört bin yüz; E C üssü uzunluğu iki yüz on santimetre.' }), (async () => {
      cevapla(lsor, '210'); await belir(c, [k2, k3], 500);
    })());
  }

  /* ---- 8. Dene: Pisagor burada yazılır mı? ---- */
  const KARTLAR = [
    { pts: [[0, 0], [0, 3], [4, 3]], isaretli: [0, 2], dik: 1, etiket: [[0, 1, '3'], [1, 2, '4']], kutu: 0,
      sec: ['Pisagor eşitliği yazılır', 'Yazılamaz'], cevap: 0, ipucu: ['', 'Dik açı var ve kalın kenar onun karşısında.'],
      dogru: 'Evet. Kalın kenar dik açının karşısında.', gor: 'Kalın kenar dik açının karşısında: 3² + 4² = 5².', speak: 'Kalın kenar dik açının karşısında: üç kare artı dört kare eşittir beş kare.' },
    { pts: [[0, 4], [3, 4], [3, 0]], isaretli: [0, 2], dik: 1, etiket: [[0, 1, '3'], [1, 2, '4']], kutu: 0,
      sec: ['Yazılamaz', 'Pisagor eşitliği yazılır'], cevap: 1, ipucu: ['Üçgen dönse de hipotenüs dik açının karşısındadır.', ''],
      dogru: 'Evet. Üçgen dönse de hipotenüs dik açının karşısında.', gor: 'Üçgen dönse de kalın kenar dik açının karşısında.', speak: null },
    { pts: [[0, 4], [5, 4], [2, 0.54]], isaretli: [1, 2], dik: null, etiket: [[0, 1, '5'], [0, 2, '4']], aci: { V: 0, P: 1, Q: 2, m: '60°' }, kutu: 1,
      sec: ['Pisagor eşitliği yazılır', 'Yazılamaz'], cevap: 1, ipucu: ['Dik açı yok; ispat dik açıya dayanıyordu.', ''],
      dogru: 'Evet. Dik açı yok.', gor: 'Dik açı yok; Pisagor eşitliği yazılmaz.', speak: null },
    { pts: [[1.5, 2.6], [5.5, 2.6], [0, 0]], isaretli: [1, 2], dik: null, etiket: [[0, 1, '4'], [0, 2, '3']], aci: { V: 0, P: 1, Q: 2, m: '120°' }, kutu: 1,
      sec: ['Yazılamaz', 'Pisagor eşitliği yazılır'], cevap: 0, ipucu: ['', 'Bu üçgende de dik açı yok.'],
      dogru: 'Evet. Bu üçgende de dik açı yok.', gor: 'Bu üçgende de dik açı yok.', speak: null },
  ];
  /* Kart: köşeleri (birim cinsinden) ortalar, işaretli kenarı kalın mavi çizer. mini: kutudaki küçük kopya (yazısız). */
  function kartCiz(c, p, K, cx, cy, s, mini) {
    const g = c.S('g', {}, p);
    const xs = K.pts.map((q) => q[0]), ys = K.pts.map((q) => q[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
    const P = K.pts.map((q) => [cx + (q[0] - mx) * s, cy + (q[1] - my) * s]), M = agirlik(P);
    c.S('polygon', { points: noktalar(P), fill: MAVI, 'fill-opacity': 0.1, stroke: 'none' }, g);
    const kenarlar = [[0, 1], [1, 2], [0, 2]], isr = (e) => K.isaretli.includes(e[0]) && K.isaretli.includes(e[1]);
    kenarlar.filter((e) => !isr(e)).forEach((e) => cizgi(c, g, P[e[0]], P[e[1]], RENK.cizgi, mini ? 2.5 : 3.5));
    kenarlar.filter(isr).forEach((e) => cizgi(c, g, P[e[0]], P[e[1]], MAVI, mini ? 5 : 8));
    if (K.dik != null) { const n = [0, 1, 2].filter((i) => i !== K.dik); aciYayi(c, g, P[K.dik], P[n[0]], P[n[1]], RENK.cizgi, mini ? 20 : 32, { dik: true }); }
    if (!mini) {
      K.etiket.forEach(([i, j, t]) => D.kenarYazi(c, g, P[i], P[j], t, RENK.yazi, { merkez: M, size: 26 }));
      if (K.aci) {
        const a = K.aci; aciYayi(c, g, P[a.V], P[a.P], P[a.Q], SARI, 34);
        const pt = aciIci(P[a.V], P[a.P], P[a.Q], 62); yazi(c, g, pt[0], pt[1] + 8, a.m, { size: 24, kalin: 700, renk: SARI });
      }
    }
    return { g, P };
  }
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const kutular = c.S('g', {}, svg);
    [0, 1].forEach((i) => {
      const x = i ? 520 : 40;
      c.S('rect', { x, y: 330, width: 440, height: 210, rx: 14, fill: 'none', stroke: i ? GRI : MAVI, 'stroke-width': 3 }, kutular);
      yazi(c, kutular, x + 220, 368, i ? 'Yazılamaz' : 'Pisagor eşitliği yazılır', { size: 26, kalin: 700, renk: i ? GRI : MAVI });
    });
    const yerler = [0, 0];
    for (const K of KARTLAR) {
      const kart = kartCiz(c, svg, K, 500, 178, 50, false);
      const eş = K.speak ? renkli(c, kart.g, 800, 190, [['3²', TURUNCU], ' + ', ['4²', YESIL], ' = ', ['5²', MAVI]], { size: 30, kalin: 700 }) : null;
      if (eş) gizle(eş);
      gizle(kart.g); await belir(c, kart.g, 450);
      await c.choice({
        tag: 'Sıra sende', q: 'Kalın işaretli kenar için Pisagor eşitliği yazılır mı? Kutuyu seç.',
        options: K.sec, answer: K.cevap, hints: K.ipucu, right: K.dogru,
      });
      c.clearSay();
      await par(c.say(K.gor, K.speak ? { speak: K.speak } : undefined), eş ? belir(c, eş, 500) : c.wait(200));
      // Kart kutudaki yerinde belirir (kaydırılmaz).
      c.clearSay();
      await belir(c, kart.g, 300, 0); kart.g.remove();
      const bx = K.kutu ? 520 : 40, mini = kartCiz(c, kutular, K, bx + (yerler[K.kutu] ? 320 : 120), 455, 24, true);
      yerler[K.kutu]++;
      gizle(mini.g); await belir(c, mini.g, 450);
    }
    await sil(c, kutular, 450);

    // Sonuç: ispat dik açıya dayanır; Pisagor dik açının karşısındaki kenar için yazılır.
    const s = 62, B = [260, 440], A = [B[0] + 1.8 * s, B[1] - 2.4 * s], C = [B[0] + 5 * s, B[1]], H = [A[0], B[1]];
    const t = dikCiz(c, svg, A, B, C, [TURUNCU, YESIL, MAVI]);
    const nA = yazi(c, t.g, A[0] + 4, A[1] - 16, 'A', { size: 26, kalin: 700 }), nH = yazi(c, t.g, H[0], H[1] + 34, 'H', { size: 26, kalin: 700 });
    const ah = cizgi(c, t.g, A, H, SARI, 4.5), dikH = aciYayi(c, t.g, H, A, B, RENK.cizgi, 26, { dik: true });
    const ea = D.kenarYazi(c, t.g, A, B, 'a', TURUNCU, { merkez: t.M, size: 28 }), eb = D.kenarYazi(c, t.g, A, C, 'b', YESIL, { merkez: t.M, size: 28 }), ec = yazi(c, t.g, (B[0] + C[0]) / 2, B[1] + 40, 'c', { size: 28, kalin: 700, renk: MAVI });
    const capraz = c.S('g', {}, t.g), mc = ara(A, t.M, 0.2);
    cizgi(c, capraz, [mc[0] - 14, mc[1] - 14], [mc[0] + 14, mc[1] + 14], GRI, 5); cizgi(c, capraz, [mc[0] - 14, mc[1] + 14], [mc[0] + 14, mc[1] - 14], GRI, 5);
    const form = renkli(c, svg, 720, 300, [['a²', TURUNCU], ' + ', ['b²', YESIL], ' = ', ['c²', MAVI]], { size: 44, kalin: 700 });
    gizle(t.g, form, ea, eb, ec, capraz);
    await par(c.say('İspatta dik açı kullanıldı: AH, dik açıdan hipotenüse indi.', { speak: 'İspatta dik açı kullanıldı: A H, dik açıdan hipotenüse indi.' }), belir(c, t.g, 600));
    await par(c.say('Dik açı yoksa bu ispat işlemez.', { speak: '[thoughtful] Dik açı yoksa bu ispat işlemez.' }), (async () => {
      await par(belir(c, [ah, nH, dikH], 500, 0.2), belir(c, t.dik, 500, 0.35)); await belir(c, capraz, 400);
    })());
    await par(c.say('Pisagor eşitliği, dik açının karşısındaki kenar için yazılır.'), (async () => {
      await par(belir(c, capraz, 300, 0), belir(c, t.dik, 400, 1));
      [ah, nH, nA, dikH, capraz].forEach((e) => e.remove());
      await belir(c, [ea, eb, ec], 450); await par(vurgula(c, [t.l3], 900), belir(c, form, 600));
    })());
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d5', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Pisagor teoreminin ispatı', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Pisagor teoreminin ispatı',
      hook: 'Duvara dayalı bir merdivenin <b>boyu, yüksekliği ve duvara uzaklığı</b> arasında neden hep aynı bağ vardır?',
      button: 'Derse başla ›',
    },
    goals: ['İki Öklid bağıntısını toplayarak Pisagor teoremini ispatlar.', 'Dik üçgenin iki kenarı verilince üçüncü kenarı Pisagor teoremiyle bulur.', 'Pisagor eşitliğinin yalnızca dik açının karşısındaki kenar için yazıldığını bilir.'],
    scenes: [
      { title: 'Hatırla', goal: 'Dik kenar bağıntısını ve yüksekliğin karesini hatırlar.', run: hatirla },
      { title: 'Pisagor teoremi', goal: 'Merdiven örneğinden Pisagor teoremi ve tarihi.', run: teorem },
      { title: 'İspat: iki Öklid bağıntısı', goal: 'Yardımcı çizgi çizilir; c² = p·a ve b² = k·a yazılır.', run: ispat1 },
      { title: 'İspat: topla', goal: 'İki bağıntı toplanır; b² + c² = a² çıkar.', run: ispat2 },
      { title: 'Sayıyla doğrula', goal: '3-4-5 üçgeninde ispat sayıyla denenir.', run: sayiyla },
      { title: 'Aynı teorem, başka harfler', goal: 'Teorem a² + b² = c² biçiminde yazılır.', run: harfler },
      { title: 'Pisagor’u kullan', goal: 'Izgarada ve yazı tahtasında bilinmeyen uzunluk bulunur.', run: kullan },
      { title: 'Dene: Pisagor burada yazılır mı?', goal: 'Pisagor eşitliğinin yazılabildiği ve yazılamadığı üçgenler ayrılır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Pisagor teoremi için hangisi doğrudur?',
        options: ['Yalnızca ölçülerek bulunmuş bir kuraldır; ispatı yoktur', 'Her üçgende geçerlidir', 'Benzer üçgenlerle ispatlanır; her dik üçgende geçerlidir'], answer: 2,
        why: ['Teoremin ispatı vardır: iki Öklid bağıntısını toplayınca çıkar. Ölçüm yalnızca örnekleri denetler.', 'Ispat dik açıya dayandığından dik olmayan üçgenlerde eşitlik yazılmaz.', 'İki Öklid bağıntısı benzer üçgenlerden gelir; toplayınca b² + c² = a² olur. Dik açılı her üçgende doğrudur.'],
        scene: 3,
      },
      {
        q: 'ABC üçgeninde |AB| = 5 cm, |AC| = 12 cm ve m(A) = 60°. |BC|² = 5² + 12² yazılabilir mi?',
        options: ['Hayır; Pisagor yalnızca dik açının karşısındaki kenar için yazılır', 'Evet; Pisagor her üçgende geçerlidir', 'Evet; ama yalnızca |AC| uzun olduğu için'], answer: 0,
        why: ['A açısı 60°, dik değil. Dik açı olmadığından Pisagor eşitliği yazılmaz.', 'Pisagor yalnızca dik açılı üçgende geçerlidir; bu üçgende dik açı yok.', 'Kenarın uzun olması eşitliği kurmaz. Önemli olan karşısındaki açının dik olmasıdır.'],
        scene: 7,
      },
      {
        q: 'Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm’dir?',
        options: ['21 cm', '15 cm', '108 cm'], answer: 1,
        why: ['21, iki dik kenarın toplamıdır. Kareler toplanır: 81 + 144 = 225.', '9² + 12² = 81 + 144 = 225 olduğundan hipotenüs 15 cm’dir.', '108, iki kenarın çarpımıdır. Oysa hipotenüsün karesi kenar karelerinin toplamı, yani 225’tir.'],
        scene: 5,
      },
      {
        q: 'Hipotenüsü 13 cm, bir dik kenarı 5 cm olan dik üçgenin öbür dik kenarı kaç cm’dir?',
        options: ['8 cm', '18 cm', '12 cm'], answer: 2,
        why: ['8, 13 ile 5’in farkıdır. Oysa kareler çıkarılır: 169 − 25 = 144.', '18, 13 ile 5’in toplamıdır. Pisagor’da kareler kullanılır: 13² = 5² + x².', '13² = 5² + x² olduğundan x² = 169 − 25 = 144 ve x = 12 cm.'],
        scene: 6,
      },
      {
        q: '10 m’lik bir merdiven duvara dayalı; ayağı duvardan 6 m uzakta. Merdiven duvarın kaç metre yüksekliğine değer?',
        options: ['4 m', '8 m', '16 m'], answer: 1,
        why: ['4, 10 ile 6’nın farkıdır. Oysa kareler çıkarılır: 100 − 36 = 64.', '10² = 6² + h² olduğundan h² = 100 − 36 = 64 ve h = 8 m.', '16, 10 ile 6’nın toplamıdır. Merdiven hipotenüstür; yükseklik ondan kısadır.'],
        scene: 1,
      },
    ],
    summary: [
      'Öklid: c² = p·a ve b² = k·a.',
      'İkisi toplanınca b² + c² = a·(k + p) = a².',
      '<b>İki Öklid bağıntısı toplanınca Pisagor çıkar.</b>',
      'Dik açı yoksa Pisagor eşitliği yazılmaz.',
    ],
    nextLesson: { href: 'd6-dar-ve-genis-aci.html', label: 'Sonraki: Açı dik değilse: dar ve geniş açılı üçgenler ›' },
  });
})();
