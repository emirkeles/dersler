/* F3 — Kovalent bileşiğin adı: ön ekler atomları sayar
   Kovalent bağlı bileşiklerin adında atom sayıları Latince ön eklerle söylenir; birinci ametal element adıyla, ikinci ametal anyon adıyla yazılır.
   Dersin sonunda iyonik ve kovalent bileşiklerin ad–formül eşleştirmesi yapılır. Senaryo: plan/kimya/cesitlilik/senaryolar/F-bilesiklerin-adlandirilmasi.md (F3).
   Araçlar dersler/f-araclar.js içindedir. Ad seçmeli ve eşleştirme sahneleri kart başına c.choice ile kurulur (sürükleme yok). Seslendirme yok. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, isaret } = window.KIT;
  const { H, oku, yaz, yapboz, adOnEk, onEkListesi, atom, ATOM, iyon, kartTasi, adSec, KOYU } = window.KIT_F;
  const { lerp } = Ders;
  const A = RENK.arti, B = RENK.eksi;

  const sil = async (c, ...gs) => { await belir(c, gs.flat(), 300, 0); gs.flat().forEach((g) => g.remove()); };
  const virgul = (n) => n.toFixed(2).replace('.', ',');

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const a = c.S('g', {}, svg), b = c.S('g', {}, svg);
    window.KIT.renkli(c, a, 500, 280, [['bakır', A], ['(II)', A], [' oksit', B]], { size: 62, kalin: 700 });
    atom(c, b, 340, 250, 'H', 64); atom(c, b, 660, 250, 'F', 64);
    yazi(c, b, 340, 360, '2,20', { size: 36, kalin: 700 }); yazi(c, b, 660, 360, '4,00', { size: 36, kalin: 700 });
    gizle(a, b);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 500));
    await c.choice({
      tag: 'Hatırla', q: 'CuO bileşiğinin adındaki (II) neyi gösterir?',
      options: ['Bakır atomu sayısını', 'Oksijenin yükünü', 'Bakırın yükünü'], answer: 2,
      hints: ['Romen rakamı metalin yükünü gösterir; atom sayısını değil.', 'Romen rakamı metalin yükünü gösterir; oksijenin yükünü değil.', ''],
      right: 'Evet. Romen rakamı metalin yükünü gösterir.',
    });
    await c.say('(II), bakırın yükünün 2+ olduğunu söyler.', { speak: 'Parantez içindeki iki, bakırın yükünün iki artı olduğunu söyler.' });
    c.clearSay();
    await par(belir(c, a, 400, 0), belir(c, b, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Hidrojen (2,20) ile flor (4,00) bağ yapıyor. Ortak elektronları hangi atom daha kuvvetle çeker?',
      options: ['Hidrojen', 'İkisi eşit', 'Flor'], answer: 2,
      hints: ['Elektronegatifliği büyük olan atom ortak elektronları kendine çeker.', 'Değerler farklı; elektronegatifliği büyük olan atom ortak elektronları kendine çeker.', ''],
      right: 'Evet. Elektronegatifliği büyük olan atom ortak elektronları kendine çeker.',
    });
    await c.say('Flor, ortak elektronları hidrojenden kuvvetle çeker.');
    await c.say('Bugün iki ametalden oluşan bileşiklerin adlarına bakacağız.', { speak: '[curious] Bugün iki ametalden oluşan bileşiklerin adlarına bakacağız.' });
  }

  /* ---- 2. Sayı adda yer alır ---- */
  async function sayiAdda(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg);
    yazi(c, sol, 190, 100, 'metal + ametal', { size: 26, kalin: 700, renk: RENK.soluk });
    [['NaCl', 'sodyum klorür'], ['MgCl_{2}', 'magnezyum klorür']].forEach(([f, ad], i) => {
      yaz(c, sol, 190, 200 + i * 130, [f], { size: 46, kalin: 700 });
      adOnEk(c, sol, 190, 244 + i * 130, ad, { size: 26, iyonik: true });
    });
    const ayrac = cizgi(c, svg, [385, 80], [385, 500], RENK.kenarlik, 2);
    const sag = c.S('g', {}, svg);
    yazi(c, sag, 690, 100, 'ametal + ametal', { size: 26, kalin: 700, renk: RENK.soluk });
    const MOL = [['N_{2}O', 1, 520], ['N_{2}O_{3}', 3, 700], ['N_{2}O_{5}', 5, 880]];
    const mol = MOL.map(([f, n, cx]) => {
      const g = c.S('g', {}, sag), oks = [];
      yaz(c, g, cx, 190, [f], { size: 42, kalin: 700 });
      [-28, 28].forEach((dx) => c.S('circle', { cx: cx + dx, cy: 262, r: 26, fill: ATOM.N }, g));
      for (let i = 0; i < n; i++) oks.push(c.S('circle', { cx: cx + (i - (n - 1) / 2) * 34, cy: 338, r: 15, fill: ATOM.O }, g));
      const et = yazi(c, g, cx, 430, 'azot oksit', { size: 24, kalin: 600, renk: A }); et.style.opacity = 0;
      return { g, oks, et, n, cx };
    });
    const lej = c.S('g', {}, sag);
    atom(c, lej, 560, 490, 'N', 20, { size: 20 }); atom(c, lej, 830, 490, 'O', 20, { size: 20 });
    const carp = isaret(c, svg, 690, 520, 'no', 22); carp.style.opacity = 0;
    gizle(sol, ayrac, sag);
    mol.forEach((m) => { m.g.style.opacity = 0; }); sag.style.opacity = 1;
    [...sag.children].forEach((e) => { if (!mol.some((m) => m.g === e)) e.style.opacity = 0; });

    await par(c.say('Metal ile ametal bileşiğinin adına sayı girmez.'), belir(c, [sol, ayrac], 600));
    await par(c.say('İki ametal arasında kovalent bağ kurulur.'), belir(c, [...sag.children].filter((e) => !mol.some((m) => m.g === e)), 500));
    await par(c.say('Azot ile oksijen, birkaç kovalent bileşik verir.'), belir(c, mol.map((m) => m.g), 700));
    await c.say('N<sub>2</sub>O, N<sub>2</sub>O<sub>3</sub> ve N<sub>2</sub>O<sub>5</sub> ayrı maddelerdir.', { speak: `${oku('N_{2}O')}, ${oku('N_{2}O_{3}')} ve ${oku('N_{2}O_{5}')} ayrı maddelerdir.` });
    await par(c.say('İyonik kuralla üçüne de “azot oksit” denir.'), belir(c, mol.map((m) => m.et), 600));
    await par(c.say('Üç ayrı madde, aynı adı taşıyamaz.'), belir(c, carp, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Üç bileşiği adla ayırmak için ada ne söylenmelidir?',
      options: ['Atomların elektronegatifliği', 'Bileşiğin rengi', 'Her elementten kaç atom olduğu'], answer: 2,
      hints: ['Üçünde de azot ve oksijen var; ne değişiyor? Değişen, atom sayılarıdır.', 'Üçünde de azot ve oksijen var; ne değişiyor? Değişen, atom sayılarıdır.', ''],
      right: 'Evet. Üçünde de azot ve oksijen var; değişen atom sayıları.',
    });
    // Gör: atom sayıları vurgulanır.
    await par(c.say('Üçünde de azot ve oksijen var; atom sayıları farklı.'), (async () => {
      for (const m of mol) await c.tween(900, (e) => { const s = 1 + 0.5 * Math.sin(e * Math.PI); m.oks.forEach((o) => o.setAttribute('r', 15 * s)); });
    })());
    await c.say('Kovalent bileşiklerin adı, atom sayılarını da söyler.');
  }

  /* ---- 3. Sayıların Latince adları ---- */
  async function latince(c) {
    const svg = c.svg(1000, 562);
    const SAT = [
      ['N_{2}O', 'diazot monoksit'], ['N_{2}O_{3}', 'diazot trioksit'], ['SO_{3}', 'kükürt trioksit'],
      ['CO', 'karbon monoksit'], ['CS_{2}', 'karbon disülfür'], ['CCl_{4}', 'karbon tetraklorür'],
    ];
    const tab = c.S('g', {}, svg);
    const satir = SAT.map(([f, ad], i) => {
      const g = c.S('g', {}, tab), y = 100 + i * 74;
      yaz(c, g, 190, y + 14, [f], { size: 44, kalin: 700 });
      adOnEk(c, g, 320, y + 12, ad, { size: 36, hiza: 'start' });
      g.style.opacity = 0; return g;
    });
    const vurgu = (...ix) => satir.forEach((g, i) => { g.style.opacity = ix.length === 0 || ix.includes(i) ? 1 : 0.35; });
    const L = onEkListesi(c, svg, 330, 130, { dy: 70, size: 40, sutun: 250 });
    gizle(L.g);

    await par(c.say('Atom sayısını söyleyen eklere Latince ön ek denir.'), belir(c, satir, 800));
    await c.say('Ön ek, elementin adının önüne gelir.');
    vurgu(4);
    await c.say('CS<sub>2</sub>\'de iki kükürt var: disülfür.', { speak: `${oku('CS_{2}')}'de iki kükürt var: disülfür.` });
    vurgu(5);
    await c.say('CCl<sub>4</sub>\'te dört klor var: tetraklorür.', { speak: `${oku('CCl_{4}')}'te dört klor var: tetraklorür.` });
    vurgu(2);
    await c.say('SO<sub>3</sub>\'te üç oksijen var: trioksit.', { speak: `${oku('SO_{3}')}'te üç oksijen var: trioksit.` });
    vurgu(3);
    await c.say('CO\'da bir oksijen var: monoksit.', { speak: `${oku('CO')}'da bir oksijen var: monoksit.` });
    vurgu();
    await belir(c, satir, 300, 0);
    await par(c.say('Bir, iki, üç, dört için mono, di, tri, tetra.'), (async () => { L.satir.forEach((s) => { s.style.opacity = 0; }); L.g.style.opacity = 1; for (const s of L.satir.slice(0, 4)) await belir(c, s, 300); })());
    await par(c.say('Beş, altı, yedi, sekiz için penta, hekza, hepta, okta.'), (async () => { for (const s of L.satir.slice(4)) await belir(c, s, 300); })());
    // Köşeye: liste sağda, çözüm solda.
    c.clearSay();
    await belir(c, L.g, 300, 0);
    L.g.remove();
    const L2 = onEkListesi(c, svg, 560, 110, { dy: 60, size: 30, sutun: 200 });
    gizle(L2.g); await belir(c, L2.g, 400);
    const kart = c.S('g', {}, svg);
    yaz(c, kart, 250, 180, ['N_{2}O_{5}'], { size: 72, kalin: 700 });
    yazi(c, kart, 250, 300, 'N: 2 → di', { size: 32, kalin: 600 });
    const soru2 = yazi(c, kart, 250, 360, 'O: 5 → ?', { size: 32, kalin: 600 });
    gizle(kart); await belir(c, kart, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Beş atomun ön eki hangisidir?',
      options: ['Tetra', 'Hekza', 'Penta'], answer: 2,
      hints: ['Beş için ön ek listesine bak. Tetra dörttür.', 'Beş için ön ek listesine bak. Hekza altıdır.', ''],
      right: 'Evet. Beş atom için ön ek penta.',
    });
    soru2.textContent = 'O: 5 → penta';
    await c.say('Beş atom için ön ek pentadır.');
    c.clearSay();
    await belir(c, kart, 300, 0); kart.remove();
    const k2 = c.S('g', {}, svg);
    yaz(c, k2, 250, 200, ['SF_{6}'], { size: 72, kalin: 700 });
    const f6 = yazi(c, k2, 250, 300, 'F: 6 → ?', { size: 32, kalin: 600 });
    gizle(k2); await belir(c, k2, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'SF<sub>6</sub> bileşiğindeki flor sayısının ön eki hangisidir?',
      options: ['Hekza', 'Penta', 'Hepta'], answer: 0,
      hints: ['', 'Flor atomlarını say: altı. Penta beştir.', 'Flor atomlarını say: altı. Hepta yedidir.'],
      right: 'Evet. Altı atom için ön ek hekza.',
    });
    f6.textContent = 'F: 6 → hekza'; L2.vurgu(5);
    await c.say('Altı flor atomu için ön ek hekzadır.');
    c.note('<b>Ön ek atom sayısını söyler.</b><br>Örnek: CCl<sub>4</sub>: karbon tetraklorür (tetra: 4).', 'Ön ekler', 'f3-on-ek');
  }

  /* ---- 4. Birinci ve ikinci ametal ---- */
  /* Bir formülün iki elementi için ön ek kutusu, element adı ve birleşik ad: kol = { cx, kaynak: [i0, i1], on, ad, son: parcalar, on2: soluk mu } */
  function kolKur(c, p, fm, kol, y) {
    const g = c.S('g', {}, p), e0 = fm.getExtentOfChar(kol.kaynak[0]), e1 = fm.getExtentOfChar(kol.kaynak[1]);
    const sx = (e0.x + e1.x + e1.width) / 2, sy = Math.max(e0.y + e0.height, e1.y + e1.height) + 8;
    cizgi(c, g, [sx, sy], [kol.cx, y - 36], RENK.cizgi, 3);
    const w = Math.max(70, kol.on.length * 22 + 36);
    const kg = c.S('g', {}, g);
    kutu(c, kg, kol.cx - 70 - w / 2, y - 30, w, 56, { rx: 12, renk: RENK.cizgi, w: 3 });
    const tOn = yazi(c, kg, kol.cx - 70, y + 10, kol.on, { size: 32, kalin: 800 });
    const tAd = yazi(c, g, kol.cx + 55, y + 10, kol.ad, { size: 32, kalin: 500, renk: '#b4bddf' });
    const son = adOnEk(c, g, kol.cx, y + 110, '', { size: 44, parcalar: kol.son });
    [kg, tAd, son].forEach((e) => { e.style.opacity = 0; });
    return { g, kg, tOn, tAd, son };
  }

  async function birinciIkinci(c) {
    const svg = c.svg(1000, 562);
    // N2O5
    const gA = c.S('g', {}, svg);
    const fA = yaz(c, gA, 500, 90, ['N_{2}O_{5}'], { size: 72, kalin: 700 });
    const k1 = kolKur(c, gA, fA, { cx: 330, kaynak: [0, 1], on: 'di', ad: 'azot', son: [['di', true], 'azot'] }, 230);
    const k2 = kolKur(c, gA, fA, { cx: 700, kaynak: [2, 3], on: 'penta', ad: 'oksit', son: [] }, 230);
    gizle(gA, k1.g, k2.g);
    k1.g.style.opacity = 0; k2.g.style.opacity = 0;
    await par(c.say('N<sub>2</sub>O<sub>5</sub>\'te ilk element azottur: iki atom, ön ek di.', { speak: `${oku('N_{2}O_{5}')}'te ilk element azottur: iki atom, ön ek di.` }), belir(c, [gA, k1.g], 500), belir(c, k1.kg, 500));
    await par(c.say('Ad “diazot” olur: ön ek ve element adı.'), belir(c, [k1.tAd, k1.son], 600));
    await par(c.say('İkinci element oksijendir: beş atom, ön ek penta.'), belir(c, [k2.g, k2.kg], 500));
    await par(c.say('Ad “penta” ile “oksit”ten kurulur: ön ek ve anyon adı.'), belir(c, k2.tAd, 600));
    await c.say('Birinci elementin adı aynen kalır; ikincisi anyon adını alır.');
    c.clearSay();
    await sil(c, gA);

    // CO
    const gB = c.S('g', {}, svg);
    const fB = yaz(c, gB, 500, 90, ['CO'], { size: 72, kalin: 700 });
    const b1 = kolKur(c, gB, fB, { cx: 330, kaynak: [0, 0], on: 'mono', ad: 'karbon', son: [] }, 230);
    const b2 = kolKur(c, gB, fB, { cx: 700, kaynak: [1, 1], on: 'mono', ad: 'oksit', son: [['mono', true], 'ksit'] }, 230);
    gizle(gB); b1.g.style.opacity = 0; b2.g.style.opacity = 0;
    await par(c.say('CO\'da tek karbon var ama “monokarbon” denmez.', { speak: `${oku('CO')}'da tek karbon var ama monokarbon denmez.` }), belir(c, [gB, b1.g, b1.tAd], 500));
    // İlk elementte mono: kutu soluk ve çizgili.
    b1.kg.style.opacity = 0.3;
    const cz = cizgi(c, b1.g, [330 - 120, 230 - 18], [330 - 20, 230 + 2], RENK.itme, 4); cz.style.opacity = 0;
    await par(c.say('İlk elementte “mono” kullanılmaz.'), belir(c, [cz], 400));
    await par(c.say('İkinci elementte “mono” kullanılır: monoksit.'), belir(c, [b2.g, b2.kg, b2.tAd, b2.son], 600));
    c.clearSay();
    await sil(c, gB);

    // SO3 ve CS2
    const gC = c.S('g', {}, svg);
    const sut = [270, 730].map((x, i) => {
      const g = c.S('g', {}, gC);
      yaz(c, g, x, 130, [i ? 'CS_{2}' : 'SO_{3}'], { size: 72, kalin: 700 });
      adOnEk(c, g, x, 250, i ? 'karbon disülfür' : 'kükürt trioksit', { size: 38 });
      g.style.opacity = 0; return g;
    });
    await par(c.say('SO<sub>3</sub>\'te kükürt ilktir: kükürt trioksit.', { speak: `${oku('SO_{3}')}'te kükürt ilktir: kükürt trioksit.` }), belir(c, sut[0], 600));
    await par(c.say('CS<sub>2</sub>\'de kükürt ikincidir: karbon disülfür.', { speak: `${oku('CS_{2}')}'de kükürt ikincidir: karbon disülfür.` }), belir(c, sut[1], 600));
    c.clearSay();
    await sil(c, gC);

    // Birlikte çöz: SF6
    const gD = c.S('g', {}, svg);
    yaz(c, gD, 500, 150, ['SF_{6}'], { size: 80, kalin: 700 });
    const sf = yazi(c, gD, 500, 270, 'S ilk element → ?', { size: 34, kalin: 600 });
    yazi(c, gD, 500, 330, 'F ikinci element → hekza + florür', { size: 34, kalin: 600 });
    gizle(gD); await belir(c, gD, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'SF<sub>6</sub>\'da kükürt ilk elementtir. Adında hangisi kullanılır?',
      options: ['Sülfür', 'Kükürt', 'Monokükürt'], answer: 1,
      hints: ['İlk elementin adı olduğu gibi kalır; sülfür anyon adıdır.', '', 'İlk elementte mono kullanılmaz.'],
      right: 'Evet. İlk elementin adı olduğu gibi kalır.',
    });
    sf.textContent = 'S ilk element → kükürt';
    await c.say('SF<sub>6</sub>\'nın adı kükürt hekzaflorürdür.', { speak: `${oku('SF_{6}')}'nın adı kükürt hekzaflorürdür.` });
    c.clearSay();
    await sil(c, gD);

    // Sıra sende: SO2
    const gE = c.S('g', {}, svg);
    yaz(c, gE, 500, 150, ['SO_{2}'], { size: 80, kalin: 700 });
    gizle(gE); await belir(c, gE, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'SO<sub>2</sub> bileşiğinin adı hangisidir?',
      options: ['Kükürt disülfür', 'Monokükürt dioksit', 'Kükürt dioksit'], answer: 2,
      hints: ['İkinci element oksijendir; iki atom: dioksit.', 'İlk elementte mono kullanılmaz. Kükürt ilk element: element adı, ön ek yok.', ''],
      right: 'Evet. Kükürt ilk element: ön eksiz; iki oksijen: dioksit.',
    });
    // Gör
    const ad = c.S('g', {}, svg);
    [['kükürt', 170, false], ['di', 480, true], ['oksit', 700, false]].forEach(([m, x, on]) => {
      const w = Math.max(120, m.length * 24 + 36);
      kutu(c, ad, x - w / 2, 300, w, 62, { rx: 12, renk: on ? RENK.cizgi : RENK.kenarlik, w: 3 });
      yazi(c, ad, x, 342, m, { size: 34, kalin: on ? 800 : 500, renk: on ? RENK.yazi : '#b4bddf' });
    });
    gizle(ad);
    await par(c.say('Kükürt ön eksiz; iki oksijen: dioksit.'), belir(c, ad, 600));
  }

  /* ---- 5. Oksit önünde ünlü düşer ---- */
  async function unluDuser(c) {
    const svg = c.svg(1000, 562);
    const ROW = [['mon', 'o', 'monoksit', 'mono'], ['tetr', 'a', 'tetroksit', 'tetra'], ['pent', 'a', 'pentoksit', 'penta'], ['di', '', 'dioksit', 'di'], ['tri', '', 'trioksit', 'tri']];
    const gr = c.S('g', {}, svg);
    const sat = ROW.map(([kok, ünlü, sonuc], i) => {
      const g = c.S('g', {}, gr), y = 110 + i * 85;
      const sol = yazi(c, g, 360, y, '', { hiza: 'end', size: 40, kalin: 800 });
      const t1 = c.S('tspan', { text: kok }, sol), t2 = c.S('tspan', { text: ünlü }, sol);
      const ok = yazi(c, g, 385, y, 'oksit', { hiza: 'start', size: 40, kalin: 500, renk: '#b4bddf' });
      const ok2 = yazi(c, g, 560, y, '→', { size: 40, kalin: 600, renk: RENK.soluk });
      const res = adOnEk(c, g, 610, y, '', { size: 40, hiza: 'start', parcalar: [[kok, true], sonuc.slice(kok.length)] });
      res.style.opacity = 0; ok2.style.opacity = 0;
      g.style.opacity = 0;
      return { g, t2, res, ok2, ok, ünlü };
    });
    const dus = (s) => { s.t2.style.fill = RENK.itme; s.t2.style.opacity = 0.3; };

    await par(c.say('“Oksit” sözcüğü ünlüyle başlar.'), belir(c, sat[0].g, 500));
    await par(c.say('Mono, tetra ya da penta oksidin önüne gelirse son ünlü düşer.'), belir(c, [sat[1].g, sat[2].g], 600));
    const goster = async (s) => { dus(s); await belir(c, [s.ok2, s.res], 500); };
    await par(c.say('Mono ve oksit: monoksit.'), goster(sat[0]));
    await par(c.say('Tetra ve oksit: tetroksit.'), goster(sat[1]));
    await par(c.say('Penta ve oksit: pentoksit.'), goster(sat[2]));
    await par(c.say('Di ve tri için ünlü düşmez: dioksit, trioksit.'), (async () => {
      await belir(c, [sat[3].g, sat[4].g], 500);
      await belir(c, [sat[3].ok2, sat[3].res, sat[4].ok2, sat[4].res], 500);
    })());
    c.clearSay();
    await sil(c, gr);

    // Birlikte çöz: N2O4
    const g = c.S('g', {}, svg);
    yaz(c, g, 500, 130, ['N_{2}O_{4}'], { size: 80, kalin: 700 });
    yazi(c, g, 500, 250, 'N: 2 atom → di → diazot', { size: 32, kalin: 600 });
    const o4 = yazi(c, g, 500, 310, 'O: 4 atom → tetra + oksit → ?', { size: 32, kalin: 600 });
    gizle(g); await belir(c, g, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'N<sub>2</sub>O<sub>4</sub> bileşiğinin adı hangisidir?',
      options: ['Diazot tetraoksit', 'Diazot tetroksit', 'Azot tetroksit'], answer: 1,
      hints: ['Tetra, oksidin önünde son ünlüsünü bırakır: tetroksit.', '', 'Azot iki atom; ilk elementte de ön ek var: diazot.'],
      right: 'Evet. Diazot ve tetroksit.',
    });
    o4.textContent = 'O: 4 atom → tetra + oksit → tetroksit';
    await c.say('N<sub>2</sub>O<sub>4</sub>\'ün adı diazot tetroksittir.', { speak: `${oku('N_{2}O_{4}')}'ün adı diazot tetroksittir.` });
    c.clearSay();
    await sil(c, g);
    const g2 = c.S('g', {}, svg);
    yaz(c, g2, 500, 160, ['NO'], { size: 90, kalin: 700 });
    gizle(g2); await belir(c, g2, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'NO bileşiğinin adı hangisidir?',
      options: ['Monoazot monoksit', 'Azot monooksit', 'Azot monoksit'], answer: 2,
      hints: ['İlk elementte mono kullanılmaz.', 'Mono, oksit önünde son ünlüsünü bırakır: monoksit.', ''],
      right: 'Evet. İlk elementte mono yok; oksit önünde mono: monoksit.',
    });
    const nm = adOnEk(c, g2, 500, 270, 'azot monoksit', { size: 48 }); nm.style.opacity = 0;
    await par(c.say('İlk elementte mono yok: azot monoksit.'), belir(c, nm, 500));
  }

  /* ---- 6. Formülde hangi atom önce? ---- */
  async function formuldeSira(c) {
    const svg = c.svg(1000, 562);
    const PX = [250, 430];
    /* Bir elektronegatiflik çifti: varsayılan olarak büyük olan solda başlar, küçük olan sola kayar (kay).
       o.ox: yatay kaydırma; o.sirali: küçük olan baştan solda. */
    function cift(y, a, b, o = {}) {
      const ox = o.ox || 0, g = c.S('g', {}, svg), mk = (e) => {
        const ag = c.S('g', {}, g);
        atom(c, ag, 0, 0, e[0], 34);
        yazi(c, ag, 0, 66, virgul(e[1]), { size: 26, kalin: 700, renk: RENK.soluk });
        return ag;
      };
      const ga = mk(a), gb = mk(b);
      const koy = (x1, x2) => { ga.setAttribute('transform', `translate(${x1 + ox},${y})`); gb.setAttribute('transform', `translate(${x2 + ox},${y})`); };
      if (o.sirali) koy(PX[0], PX[1]); else koy(PX[1], PX[0]);
      g.style.opacity = 0;
      return { g, kay: () => c.tween(900, (e) => koy(lerp(PX[1], PX[0], e), lerp(PX[0], PX[1], e)), Ders.ease.inOut) };
    }
    const r1 = cift(130, ['N', 3.04], ['O', 3.44]), r2 = cift(270, ['C', 2.55], ['Cl', 3.16]), r3 = cift(410, ['S', 2.58], ['O', 3.44]);
    const sonuc = (y, f) => { const t = yaz(c, svg, 700, y + 14, [f], { size: 52, kalin: 700 }); t.style.opacity = 0; return t; };
    const f1 = sonuc(130, 'N_{2}O_{3}'), f2 = sonuc(270, 'CCl_{4}'), f3 = sonuc(410, 'SO_{3}');

    await par(c.say('Formülde genellikle elektronegatifliği az olan atom öne yazılır.'), belir(c, r1.g, 500));
    await par(c.say('N<sub>2</sub>O<sub>3</sub>\'te azot 3,04, oksijen 3,44: azot önde.', { speak: `${oku('N_{2}O_{3}')}'te azot üç virgül sıfır dört, oksijen üç virgül dört dört: azot önde.` }), (async () => { await r1.kay(); await belir(c, f1, 400); })());
    await par(c.say('CCl<sub>4</sub>\'te karbon 2,55, klor 3,16: karbon önde.', { speak: `${oku('CCl_{4}')}'te karbon iki virgül elli beş, klor üç virgül on altı: karbon önde.` }), (async () => { await belir(c, r2.g, 500); await r2.kay(); await belir(c, f2, 400); })());
    await par(c.say('SO<sub>3</sub>\'te de kükürt öne yazılır: 2,58 ve 3,44.', { speak: `${oku('SO_{3}')}'te de kükürt öne yazılır: iki virgül elli sekiz ve üç virgül kırk dört.` }), (async () => { await belir(c, r3.g, 500); await r3.kay(); await belir(c, f3, 400); })());
    await c.say('Ad, formüldeki sırayı izler.');
    // Yanlış yazılışlar belirir ve silinir.
    const y1 = yaz(c, svg, 880, 130, ['Cl_{3}N'], { size: 40, kalin: 700, renk: RENK.itme }), y2 = yaz(c, svg, 880, 270, ['S_{2}C'], { size: 40, kalin: 700, renk: RENK.itme });
    gizle(y1, y2);
    await par(c.say('Önce yazılan atom birinci, sonra yazılan ikinci elementtir.'), belir(c, [y1, y2], 500));
    await c.wait(500);
    c.clearSay();
    await sil(c, [y1, y2, r1.g, r2.g, r3.g, f1, f2, f3]);

    // Birlikte çöz: C 2,55 | S 2,58
    const q = cift(150, ['C', 2.55], ['S', 2.58], { sirali: true, ox: 150 });
    const fa = yaz(c, svg, 380, 380, ['CS_{2}'], { size: 60, kalin: 700 }), fb = yaz(c, svg, 620, 380, ['S_{2}C'], { size: 60, kalin: 700 });
    gizle(q.g, fa, fb); await belir(c, [q.g, fa, fb], 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Hangi formül doğru yazılmıştır?',
      options: ['S<sub>2</sub>C', 'İkisi de', 'CS<sub>2</sub>'], answer: 2,
      hints: ['Elektronegatifliği az olan öne yazılır. Karbon 2,55, kükürt 2,58.', 'Elektronegatifliği az olan öne yazılır; yalnız biri doğru. Karbon 2,55, kükürt 2,58.', ''],
      right: 'Evet. Elektronegatifliği az olan atom öne yazılır.',
    });
    fb.style.opacity = 0.2;
    await c.say('Karbon önde: CS<sub>2</sub>; adı karbon disülfür.', { speak: `Karbon önde: ${oku('CS_{2}')}; adı karbon disülfür.` });
    c.clearSay();
    await sil(c, [q.g, fa, fb]);

    // Sıra sende: P 2,19 | Cl 3,16
    const p = cift(150, ['P', 2.19], ['Cl', 3.16], { sirali: true, ox: 150 });
    p.g.style.opacity = 0; await belir(c, p.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Fosfor ile klorun bileşiğinde üç klor atomu vardır. Formül hangisidir?',
      options: ['Cl<sub>3</sub>P', 'P<sub>3</sub>Cl', 'PCl<sub>3</sub>'], answer: 2,
      hints: ['Hangi atomun elektronegatifliği az? Fosfor 2,19, klor 3,16: fosfor önce yazılır.', 'Alt indis klor sayısını gösterir: üç klor, bir fosfor.', ''],
      right: 'Evet. Fosfor önde; üç klor: PCl<sub>3</sub>.',
    });
    const fp = yaz(c, svg, 500, 380, ['PCl_{3}'], { size: 70, kalin: 700 }); fp.style.opacity = 0;
    await par(c.say('Fosfor önde; üç klor: PCl<sub>3</sub>.', { speak: `Fosfor önde; üç klor: ${oku('PCl_{3}')}.` }), belir(c, fp, 500));
  }

  /* ---- 7. Su ve amonyak ---- */
  async function suAmonyak(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg), g2 = c.S('g', {}, svg);
    atom(c, g1, 300, 260, 'O', 50, { etiket: false }); atom(c, g1, 244, 322, 'H', 28, { etiket: false }); atom(c, g1, 356, 322, 'H', 28, { etiket: false });
    atom(c, g2, 700, 250, 'N', 48, { etiket: false }); atom(c, g2, 650, 316, 'H', 28, { etiket: false }); atom(c, g2, 750, 316, 'H', 28, { etiket: false }); atom(c, g2, 700, 345, 'H', 28, { etiket: false });
    yaz(c, g1, 300, 440, ['H_{2}O'], { size: 48, kalin: 700 }); yaz(c, g2, 700, 440, ['NH_{3}'], { size: 48, kalin: 700 });
    const su = yazi(c, g1, 300, 510, 'su', { size: 44, kalin: 700, renk: RENK.iyi }), am = yazi(c, g2, 700, 510, 'amonyak', { size: 44, kalin: 700, renk: RENK.iyi });
    gizle(g1, g2, su, am);
    await par(c.say('Bazı bileşiklerin sistematik adı kullanılmaz.'), belir(c, [g1, g2], 700));
    await c.say('Geleneksel adları çok yaygınlaşmıştır.');
    await par(c.say('H<sub>2</sub>O\'ya su denir.', { speak: `${oku('H_{2}O')}'ya su denir.` }), belir(c, su, 500));
    await par(c.say('NH<sub>3</sub>\'e amonyak denir.', { speak: `${oku('NH_{3}')}'e amonyak denir.` }), belir(c, am, 500));
    await c.choice({
      tag: 'Sıra sende', q: 'H<sub>2</sub>O bileşiği hangi adla anılır?',
      options: ['Hidrojen dioksit', 'Oksijen dihidrür', 'Su'], answer: 2,
      hints: ['Bu bileşiğin adı çok yaygındır; sistematik ad kullanılmaz.', 'Bu bileşiğin adı çok yaygındır; sistematik ad kullanılmaz.', ''],
      right: 'Evet. Su geleneksel adıyla anılır.',
    });
    await c.say('Su ve amonyak, geleneksel adlarıyla anılır.');
  }

  /* ---- 8. Kuralı topla, yedi bileşikte dene ---- */
  async function kuraliTopla(c) {
    const svg = c.svg(1000, 562);
    const AD = [
      ['1', 'Elektronegatifliği az olan atom öne'],
      ['2', 'İlk element: ön ek + element adı'],
      ['3', 'İkinci element: ön ek + anyon adı'],
      ['4', 'Mono, tetra, penta + oksit: son ünlü düşer'],
    ];
    const ak = c.S('g', {}, svg);
    const adim = AD.map(([n, m], i) => {
      const g = c.S('g', {}, ak), y = 110 + i * 100;
      c.S('circle', { cx: 90, cy: y - 10, r: 28, fill: RENK.kenarlik }, g);
      yazi(c, g, 90, y, n, { size: 32, kalin: 700 });
      yazi(c, g, 150, y, m, { hiza: 'start', size: 32, kalin: 600 });
      g.style.opacity = 0; return g;
    });
    const mono = yazi(c, ak, 640, 310, '(mono yok)', { hiza: 'start', size: 28, kalin: 800, renk: RENK.vurgu }); mono.style.opacity = 0;
    const sol = (i) => belir(c, adim[i], 400, 0.14);

    await c.say('Kovalent bileşiğin adını dört adımda kurarız.');
    await par(c.say('Önce formüldeki sıra: elektronegatifliği az olan öne.'), belir(c, adim[0], 500));
    await par(c.say('İlk element: sayı varsa ön ek ve element adı.'), sol(0), belir(c, adim[1], 500));
    await par(c.say('İlk elementte “mono” yazılmaz.'), belir(c, mono, 500));
    await par(c.say('İkinci element: ön ek ve anyon adı.'), sol(1), belir(c, mono, 300, 0.14), belir(c, adim[2], 500));
    await par(c.say('Oksit önünde mono, tetra, penta ünlüsünü bırakır.'), sol(2), belir(c, adim[3], 500));
    c.clearSay();
    await sil(c, ak);

    // Dene: yedi kart.
    const KART = [
      { f: 'CO_{2}', sec: ['karbon dioksit', 'monokarbon dioksit', 'karbon dioksijen'], neden: 'İlk elementte mono yok; iki oksijen: dioksit.' },
      { f: 'NCl_{3}', sec: ['azot triklorür', 'monoazot triklorür', 'azot klorür'], neden: 'İlk element azot, ön eksiz; üç klor: triklorür.' },
      { f: 'PCl_{3}', sec: ['fosfor triklorür', 'fosfor üç klorür', 'triklorür fosfor'], neden: 'Üç klor: triklorür; ilk element ön eksiz.' },
      { f: 'SF_{6}', sec: ['kükürt hekzaflorür', 'kükürt hekzaflor', 'hekzakükürt florür'], neden: 'Altı flor: hekzaflorür.' },
      { f: 'N_{2}O_{5}', sec: ['diazot pentoksit', 'azot pentoksit', 'diazot beşoksit'], neden: 'İki azot: diazot; beş oksijen, oksit önünde penta: pentoksit.' },
      { f: 'CCl_{4}', sec: ['karbon tetraklorür', 'karbon klorür', 'tetrakarbon klorür'], neden: 'Dört klor: tetraklorür; karbon tek atom, ön eksiz.' },
      { f: 'N_{2}O_{3}', sec: ['diazot trioksit', 'azot trioksit', 'diazot oksit'], neden: 'İki azot: diazot; üç oksijen: trioksit.' },
    ];
    const yer = (i) => { const col = Math.floor(i / 4), row = i % 4, x0 = 30 + col * 490; return { fx: x0 + 110, ax: x0 + 215, y: 80 + row * 78 }; };
    let kart = null;
    await adSec(c, {
      tag: 'Dene', kartlar: KART, yanlis: 'Atom sayısına bak; ilk elementte mono yazılmaz.', soru: (k) => `${H(k.f)} bileşiğinin adı hangisidir?`,
      once: async (i, k) => { c.clearSay(); k.ipucu = 'Önce formüldeki atom sayılarını yaz.'; kart = yaz(c, svg, 500, 470, [k.f], { size: 76, kalin: 700 }); kart.style.opacity = 0; await belir(c, kart, 350); },
      sonra: async (i, k) => {
        const p = yer(i);
        await kartTasi(c, kart, p.fx, p.y + 10, 34, 650);
        const ad = adOnEk(c, svg, p.ax, p.y + 8, k.sec[0], { size: 28, hiza: 'start' }); ad.style.opacity = 0;
        await par(c.say(`${H(k.f)}: ${k.sec[0]}.`, { speak: `${oku(k.f)}: ${k.sec[0]}.` }), belir(c, ad, 350));
      },
    });
    await c.say('Yedi bileşik de aynı dört adımla adlandırıldı.');
    c.note('<b>Ön ek atom sayısını söyler; ilk elementte mono yok.</b><br>CO: karbon monoksit.', 'Kovalent bileşiğin adı', 'f3-kovalent-ad');
  }

  /* ---- 9. Hangi kuralla adlandırılır? ---- */
  async function hangiKural(c) {
    const svg = c.svg(1000, 562);
    const KOL = [{ x: 170, ad: 'Katyon adı + anyon adı' }, { x: 500, ad: 'Romen rakamlı ad' }, { x: 830, ad: 'Latince ön ekli ad' }];
    const kg = c.S('g', {}, svg);
    KOL.forEach((k) => { kutu(c, kg, k.x - 150, 70, 300, 330, { rx: 14 }); yazi(c, kg, k.x, 112, k.ad, { size: 22, kalin: 700 }); });
    gizle(kg);
    const KART = [
      { f: 'Al_{2}(SO_{4})_{3}', kutu: 0, neden: 'Alüminyum tek katyon verir; sülfat çok atomlu anyondur.' },
      { f: 'MgH_{2}', kutu: 0, neden: 'Magnezyum tek katyonlu metaldir; hidrojen H<sup>−</sup> olur: hidrür.' },
      { f: 'SF_{6}', kutu: 2, neden: 'İki ametal: kovalent.' },
      { f: 'N_{2}O', kutu: 2, neden: 'İki ametal: kovalent.' },
      { f: 'CuCl', kutu: 1, neden: 'Bakır birden çok katyon verir: Cu<sup>+</sup>.' },
      { f: 'FeO', kutu: 1, neden: 'Demir birden çok katyon verir: Fe<sup>2+</sup>.' },
      { f: 'Ca(OH)_{2}', kutu: 0, neden: 'Kalsiyum tek katyonlu metaldir; hidroksit çok atomlu anyondur.' },
      { f: 'NH_{4}Br', kutu: 0, neden: 'Amonyum katyonu ile bromür anyonu: iyonik.' },
    ];
    KART.forEach((k) => { k.ipucu = 'Önce bileşiğin türüne bak: metal ve ametal mi, iki ametal mi?'; });
    const say = [0, 0, 0];
    let kart = null;
    await par(c.say('Bileşiği adlandırmadan önce türüne bakılır.'), belir(c, kg, 600));
    await c.say('Metal ve ametal ya da amonyum varsa bileşik iyoniktir.');
    await c.say('İki ametal varsa bileşik kovalenttir.');
    await c.say('Metal yedi çok katyonlu metalden biriyse ad rakamlıdır.');
    await window.KIT.sinifla(c, {
      tag: 'Dene', kartlar: KART, kutular: KOL.map((k) => k.ad),
      soru: (k) => `${H(k.f)} bileşiği hangi kuralla adlandırılır?`,
      sec: async (i, k) => { c.clearSay(); kart = yaz(c, svg, 500, 475, [k.f], { size: 60, kalin: 700 }); kart.style.opacity = 0; await belir(c, kart, 300); },
      yerlestir: async (i, k) => {
        const n = say[k.kutu]++, ad = ['katyon adı ve anyon adı', 'Romen rakamlı ad', 'Latince ön ekli ad'][k.kutu];
        await par(c.say(`${H(k.f)}: ${ad}.`, { speak: `${oku(k.f)}: ${ad}.` }), kartTasi(c, kart, KOL[k.kutu].x, 190 + n * 52, 30, 600));
      },
    });
    await c.say('Üç ayrı kural vardır; hangisinin kullanılacağını bileşiğin türü belirler.');
  }

  /* ---- 10. Ad ve formül yapbozu ---- */
  async function yapbozSahne(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { f: 'Al_{2}(SO_{4})_{3}', kural: 0, sec: ['alüminyum sülfat', 'alüminyum üç sülfat', 'sülfat alüminyum'], neden: 'İyonik: sayı ve parantez ada girmez.' },
      { f: 'MgH_{2}', kural: 0, sec: ['magnezyum hidrür', 'magnezyum dihidrür', 'magnezyum hidrojen'], neden: 'İyonik: katyon adı, anyon adı.' },
      { f: 'SF_{6}', kural: 2, sec: ['kükürt hekzaflorür', 'kükürt florür', 'monokükürt hekzaflorür'], neden: 'Kovalent: sayılar ön ekle söylenir; ilk elementte mono yok.' },
      { f: 'N_{2}O', kural: 2, sec: ['diazot monoksit', 'azot monoksit', 'diazot oksit'], neden: 'İki azot: diazot; bir oksijen: monoksit.' },
      { f: 'CuCl', kural: 1, sec: ['bakır(I) klorür', 'bakır(II) klorür', 'bakır klorür'], neden: 'Bir Cl<sup>−</sup> var; tek bakır 1+ taşır.' },
      { f: 'FeO', kural: 1, sec: ['demir(II) oksit', 'demir(III) oksit', 'demir oksit'], neden: 'Bir O<sup>2−</sup> var; tek demir 2+ taşır.' },
      { f: 'Ca(OH)_{2}', kural: 0, sec: ['kalsiyum hidroksit', 'kalsiyum dihidroksit', 'kalsiyum oksijenhidrojen'], neden: 'İyonik: sayı ve parantez ada girmez.' },
      { f: 'NH_{4}Br', kural: 0, sec: ['amonyum bromür', 'amonyum dibromür', 'azot bromür'], neden: 'İyonik: amonyum katyonu, bromür anyonu.' },
    ];
    const yb = yapboz(c, svg, KART.map((k) => Object.assign({}, k, { ad: k.sec[0] })));
    gizle(yb.g);
    await par(c.say('Sekiz formülü adlarıyla eşleştirelim.'), belir(c, yb.g, 700));
    await c.say('Önce bileşiğin türüne bak, sonra kuralı uygula.');
    await adSec(c, {
      tag: 'Dene', kartlar: KART, yanlis: 'Önce türe bak: iyonik mi, kovalent mi?', soru: (k) => `${H(k.f)} bileşiğinin adı hangisidir?`,
      once: async (i) => { c.clearSay(); yb.ac(i); await c.wait(250); },
      sonra: async (i, k) => { await par(c.say(`${H(k.f)}: ${k.sec[0]}.`, { speak: `${oku(k.f)}: ${k.sec[0]}.` }), yb.oturt(i)); },
    });
    await c.say('Yapboz tamamlandı: sekiz bileşik, üç kural.');
  }

  Ders.start({
    id: 'cesitlilik-f3', kicker: 'Konu F · Bileşiklerin adlandırılması', title: 'Kovalent bileşiğin adı: ön ekler atomları sayar', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Kovalent bileşiğin adı: ön ekler atomları sayar',
      hook: 'Karbon monoksit ile karbon dioksit arasındaki tek hecelik fark neyi anlatır?',
      button: 'Derse başla ›',
    },
    goals: ['Kovalent bileşiğin adında atom sayısını Latince ön ekle söyler.', 'Birinci ve ikinci ametalin adlandırılması arasındaki farkı belirler.', 'İyonik ve kovalent bileşiklerin ad ve formüllerini eşleştirir.'],
    scenes: [
      { title: 'Hatırla', goal: 'Romen rakamının anlamını ve elektronegatifliği hatırla.', run: hatirla },
      { title: 'Sayı adda yer alır', goal: 'Kovalent bileşiğin adında atom sayısının gerektiğini gör.', run: sayiAdda },
      { title: 'Sayıların Latince adları', goal: 'Ön ekleri ve atom sayılarını eşleştir.', run: latince },
      { title: 'Birinci ve ikinci ametal', goal: 'Birinci ve ikinci elementin adının farkını öğren.', run: birinciIkinci },
      { title: 'Oksit önünde ünlü düşer', goal: 'Ön ek ile oksit birleşirken olan değişikliği öğren.', run: unluDuser },
      { title: 'Formülde hangi atom önce?', goal: 'Elektronegatifliğe göre formüldeki sırayı bul.', run: formuldeSira },
      { title: 'Su ve amonyak', goal: 'Geleneksel adlarıyla anılan iki bileşiği tanı.', run: suAmonyak },
      { title: 'Kuralı topla, yedi bileşikte dene', goal: 'Dört adımlık kuralı yedi bileşikte uygula.', run: kuraliTopla },
      { title: 'Hangi kuralla adlandırılır?', goal: 'Bileşiğin türüne göre adlandırma kuralını seç.', run: hangiKural },
      { title: 'Ad ve formül yapbozu', goal: 'Sekiz formülü adlarıyla eşleştir.', run: yapbozSahne },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'NO<sub>2</sub> bileşiğinin adı hangisidir?',
        options: ['Monoazot dioksit', 'Azot dioksit', 'Diazot oksit'], answer: 1,
        why: ['İlk elementte mono kullanılmaz.', 'İlk element azot ön eksiz; iki oksijen: dioksit.', 'Azot tek atomdur; oksijen iki atomdur. Ad atom sayılarını yanlış söylüyor.'], scene: 3 },
      { q: 'CF<sub>4</sub> bileşiğinin adı hangisidir?',
        options: ['Karbon tetraflorür', 'Karbon florür', 'Tetrakarbon florür'], answer: 0,
        why: ['Karbon ilk element, ön eksiz; dört flor: tetraflorür.', 'Kovalent bileşikte atom sayısı ön ekle söylenir; dört flor var.', 'İlk elementte ön ek kullanılmaz; karbon tek atom.'], scene: 2 },
      { q: 'Bir öğrenci CO\'yu “monokarbon monoksit” diye adlandırıyor. Hangisi bu hatayı düzeltir?',
        options: ['İkinci elementte ön ek kullanılmaz', 'Oksit sözcüğü yazılmaz', 'İlk elementte “mono” kullanılmaz'], answer: 2,
        why: ['İkinci elementte ön ek kullanılır: monoksit.', 'Oksit, ikinci elementin anyon adıdır; ada yazılır.', 'Karbon ilk elementtir; tek atom olsa da “mono” yazılmaz: karbon monoksit.'], scene: 3 },
      { q: 'Bir öğrenci MgCl<sub>2</sub>\'yi “magnezyum diklorür” diye adlandırıyor. Hangisi bu hatayı düzeltir?',
        options: ['Magnezyum ilk elementte mono alır', 'Metal ve ametalin iyonik bileşiğinde ön ek kullanılmaz', 'Klorür yerine klor yazılır'], answer: 1,
        why: ['İlk elementte mono kullanılmaz; üstelik bu bileşik iyoniktir.', 'Metal ve ametal iyonik bileşik verir; ad katyon ve anyon adından kurulur: magnezyum klorür.', 'Anyonun adı klorürdür; klor elementin adıdır.'], scene: 8 },
      { q: 'Difosfor pentoksit bileşiğinin formülü hangisidir?',
        options: ['PO<sub>5</sub>', 'P<sub>5</sub>O<sub>2</sub>', 'P<sub>2</sub>O<sub>5</sub>'], answer: 2,
        why: ['“Di” ön eki iki fosfor demektir; formülde fosforun alt indisi 2 olmalı.', 'Sayılar ters yazılmış: iki fosfor, beş oksijen.', 'Di: iki fosfor; penta: beş oksijen. Formül P<sub>2</sub>O<sub>5</sub>.'], scene: 4 },
    ],
    summary: [
      'Kovalent bileşiğin adı atom sayılarını söyler.',
      'İlk element adıyla, ikinci element anyon adıyla yazılır; ilk elementte mono yok.',
      'Oksit önünde mono, tetra, penta ünlüsünü bırakır.',
      '<b>Ön ek, o atomdan kaç tane olduğunu söyler.</b>',
    ],
    nextLesson: { href: 'f4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
