/* F2 — Birden fazla katyonu olan metaller: ad yükü söyler
   Bir metal birden fazla katyon verebiliyorsa bileşiğin adı hangi katyonun bulunduğunu da söyler: metalin adından sonra, yükü Romen rakamıyla yazılır
   (demir(III) klorür). Yük, formülden yük toplamının sıfır olması kuralıyla bulunur. Senaryo: plan/kimya/cesitlilik/senaryolar/F-bilesiklerin-adlandirilmasi.md (F2).
   Araçlar dersler/f-araclar.js içindedir. Romen rakamı ayraç içinde bitişik yazılır; speak alanında "demir üç klorür". Seslendirme yok. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, yuk, isaret } = window.KIT;
  const { H, oku, yaz, ION: T, iyon, terazi, adKutulari, ionListesi, romenSerit, basamakListesi } = window.KIT_F;
  const { lerp } = Ders;
  const A = RENK.arti, B = RENK.eksi;

  const sil = async (c, ...gs) => { await belir(c, gs.flat(), 300, 0); gs.flat().forEach((g) => g.remove()); };

  /* İki kutu: FeCl2 ve FeCl3. Her kutuda formül, demir iyonu, klorürler, toplam yük. cl: klorürlerde etiket yazılsın mı. */
  function demirKutulari(c, p, o = {}) {
    const KUT = [
      { x0: 30, n: 2, yuk: 2, f: [['Fe', A], ['Cl', B], ['_{2}', B]], fe: 'Fe^{2+}' },
      { x0: 520, n: 3, yuk: 3, f: [['Fe', A], ['Cl', B], ['_{3}', B]], fe: 'Fe^{3+}' },
    ];
    return KUT.map((k) => {
      const g = c.S('g', {}, p), cx = k.x0 + 225;
      kutu(c, g, k.x0, 30, 450, 300, { rx: 16 });
      const f = yaz(c, g, cx, 110, k.f, { size: 54, kalin: 700 });
      const fe = c.S('g', { transform: `translate(${k.x0 + 105},215)` }, g);
      iyon(c, fe, 0, 0, 'arti', k.fe, { r: 46, size: 26 });
      const cl = c.S('g', {}, g);
      for (let i = 0; i < k.n; i++) {
        const x = k.x0 + 215 + i * 76;
        if (o.cl) iyon(c, cl, x, 215, 'eksi', 'Cl^{−}', { r: 34, size: 22 }); else yuk(c, cl, [x, 215], 'eksi', 34);
      }
      const top = yaz(c, g, cx, 300, [[k.yuk + '+', A], ' ve ', [k.yuk + '−', B]], { size: 26, kalin: 700 });
      return { g, f, fe, cl, top, cx, x0: k.x0, y: [k.x0 + 105, 215] };
    });
  }
  const ad = (c, p, k, parcalar) => renkli(c, p, k.cx, 392, parcalar, { size: 36, kalin: 600 });
  const nabiz = (c, k) => c.tween(1300, (e) => { const s = 1 + 0.2 * Math.sin(e * Math.PI * 2); k.fe.setAttribute('transform', `translate(${k.y[0]},${k.y[1]}) scale(${s})`); });

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const a = c.S('g', {}, svg), b = c.S('g', {}, svg);
    iyon(c, a, 340, 260, 'arti', 'Ca^{2+}', { r: 60, size: 36 }); iyon(c, a, 640, 260, 'eksi', 'OH^{−}', { kutu: true, w: 150, h: 70, size: 36 });
    iyon(c, b, 330, 260, 'arti', 'Al^{3+}', { r: 60, size: 36 }); iyon(c, b, 660, 260, 'eksi', 'O^{2−}', { r: 60, size: 36 });
    gizle(a, b);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Ca(OH)<sub>2</sub> bileşiğinin adı hangisidir?',
      options: ['Kalsiyum iki hidroksit', 'Kalsiyum hidroksit', 'Hidroksit kalsiyum'], answer: 1,
      hints: ['Önce katyonun adı, sonra anyonun adı; sayı yazılmaz.', '', 'Önce katyonun adı, sonra anyonun adı; sayı yazılmaz.'],
      right: 'Evet. Önce katyonun adı, sonra anyonun adı; sayı yazılmaz.',
    });
    await c.say('Ca(OH)<sub>2</sub>: kalsiyum hidroksit.', { speak: `${oku('Ca(OH)_{2}')}: kalsiyum hidroksit.` });
    c.clearSay();
    await par(belir(c, a, 400, 0), belir(c, b, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Al<sup>3+</sup> ve O<sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['Al<sub>3</sub>O<sub>2</sub>', 'AlO', 'Al<sub>2</sub>O<sub>3</sub>'], answer: 2,
      hints: ['İki Al<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder; toplam yük sıfırdır.', 'İki Al<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder; toplam yük sıfırdır.', ''],
      right: 'Evet. İki Al<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder; toplam yük sıfırdır.',
    });
    await c.say('İki Al<sup>3+</sup> ile üç O<sup>2−</sup> toplam yükü sıfır yapar.', { speak: 'İki alüminyum iyonu ile üç oksit iyonu toplam yükü sıfır yapar.' });
    await c.say('Bugün aynı metalin iki ayrı bileşiğine bakacağız.', { speak: '[curious] Bugün aynı metalin iki ayrı bileşiğine bakacağız.' });
  }

  /* ---- 2. Aynı ad, iki ayrı madde ---- */
  async function ayniAd(c) {
    const svg = c.svg(1000, 562);
    const [k1, k2] = demirKutulari(c, svg, { cl: true });
    gizle(k1.f, k1.cl, k1.top, k2.f, k2.cl, k2.top, k1.g, k2.g);
    const adlar = [k1, k2].map((k) => { const t = ad(c, svg, k, [['demir', A], [' klorür', B]]); t.style.opacity = 0; return t; });
    const carp = isaret(c, svg, 500, 392, 'no', 26); carp.style.opacity = 0;
    gizle(k1.fe, k2.fe);

    await par(c.say('Demir bazen Fe<sup>2+</sup>, bazen Fe<sup>3+</sup> iyonu olur.', { speak: 'Demir bazen demir iki artı, bazen demir üç artı iyonu olur.' }),
      belir(c, [k1.g, k2.g], 400), belir(c, [k1.fe, k2.fe], 700));
    await par(c.say('Fe<sup>2+</sup> ile Cl<sup>−</sup> iyonları FeCl<sub>2</sub>\'yi verir.', { speak: `Demir iki artı ile klorür iyonları ${oku('FeCl_{2}')}'yi verir.` }), belir(c, [k1.f, k1.cl], 600));
    await par(c.say('Fe<sup>3+</sup> ile Cl<sup>−</sup> iyonları FeCl<sub>3</sub>\'ü verir.', { speak: `Demir üç artı ile klorür iyonları ${oku('FeCl_{3}')}'ü verir.` }), belir(c, [k2.f, k2.cl], 600));
    await par(c.say('İki ayrı bileşik, iki ayrı formül.'), belir(c, [k1.top, k2.top], 600));
    await par(c.say('Önceki kurala göre ikisinin adı da “demir klorür” olur.'), belir(c, adlar, 600));
    await par(c.say('Aynı ad, iki ayrı maddeyi göstermez.'), belir(c, carp, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'İki bileşiği adla ayırmak için ada ne eklenmelidir?',
      options: ['Klorün yükü', 'Demirin yükü', 'Formülün uzunluğu'], answer: 1,
      hints: ['İki bileşikte klorür aynı; ne değişiyor? Farklı olan demir iyonudur.', '', 'İki bileşikte klorür aynı; ne değişiyor? Farklı olan demir iyonudur.'],
      right: 'Evet. İki bileşikte klorür aynı; farklı olan demir iyonudur.',
    });
    // Gör: yalnız demir iyonları yanıp söner.
    await par(c.say('İkisinde de klorür aynı; demir iyonu farklı.'), belir(c, [k1.cl, k2.cl], 400, 0.3), (async () => { await nabiz(c, k1); await nabiz(c, k2); })());
    await c.say('Ad, demirin hangi iyon olduğunu da söylemelidir.');
  }

  /* ---- 3. Romen rakamı yükü söyler ---- */
  async function romen(c) {
    const svg = c.svg(1000, 562);
    const [k1, k2] = demirKutulari(c, svg, { cl: false });
    k1.top.remove(); k2.top.remove();
    const adlar = [k1, k2].map((k) => ad(c, svg, k, [['demir', A], [' klorür', B]]));
    const sr = romenSerit(c, svg, 440);
    gizle(sr.g);
    const yenile = (k, eski, parcalar) => { eski.remove(); return ad(c, svg, k, parcalar); };

    await par(c.say('Çözüm: metalin adından sonra parantez içinde Romen rakamı yazılır.'), belir(c, sr.g, 600));
    await c.say('Rakam, metalin bileşikteki yükseltgenme basamağını gösterir.');
    sr.ac(2);
    await par(c.say('Fe<sup>2+</sup>\'nin yükü 2+; yükseltgenme basamağı +2\'dir.', { speak: 'Demir iki artı iyonunun yükü iki artı; yükseltgenme basamağı artı iki\'dir.' }), nabiz(c, k1));
    adlar[0] = yenile(k1, adlar[0], [['demir', A], ['(II)', A], [' klorür', B]]);
    await c.say('FeCl<sub>2</sub>\'nin adı demir(II) klorür olur.', { speak: `${oku('FeCl_{2}')}'nin adı demir iki klorür olur.` });
    sr.ac(3);
    adlar[1] = yenile(k2, adlar[1], [['demir', A], ['(?)', RENK.vurgu], [' klorür', B]]);
    await par(c.say('FeCl<sub>3</sub>\'te demir Fe<sup>3+</sup>\'tür; basamak +3.', { speak: `${oku('FeCl_{3}')}'te demir demir üç artı'dır; basamak artı üç.` }), nabiz(c, k2));
    await c.say('Basamak 2 ise II, 3 ise III yazılır.', { speak: 'Basamak iki ise Romen rakamıyla iki, üç ise Romen rakamıyla üç yazılır.' });
    await c.choice({
      tag: 'Birlikte çöz', q: 'FeCl<sub>3</sub> adındaki Romen rakamı hangisidir?',
      options: ['II', 'IV', 'III'], answer: 2,
      hints: ['Romen rakamı demirin yükünü gösterir. Fe<sup>3+</sup>\'nin yükü 3+; II ise 2+ demektir.', 'Romen rakamı demirin yükünü gösterir. Fe<sup>3+</sup>\'nin yükü 3+; IV ise 4+ demektir.', ''],
      right: 'Evet. Fe<sup>3+</sup> için Romen rakamı III.',
    });
    adlar[1] = yenile(k2, adlar[1], [['demir', A], ['(III)', A], [' klorür', B]]);
    await c.say('FeCl<sub>3</sub>\'ün adı demir(III) klorürdür; “demir üç klorür” diye okunur.', { speak: `${oku('FeCl_{3}')}'ün adı demir üç klorürdür; demir üç klorür diye okunur.` });
    c.clearSay();
    await sil(c, [k1.g, k2.g, ...adlar]);
    const cuG = c.S('g', {}, svg); iyon(c, cuG, 500, 200, 'arti', 'Cu^{2+}', { r: 60, size: 32 }); cuG.style.opacity = 0; await belir(c, cuG, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Cu<sup>2+</sup> iyonu içeren bir bileşiğin adında bakırdan sonra hangi rakam yazılır?',
      options: ['(I)', '(III)', '(II)'], answer: 2,
      hints: ['Rakam metalin yükünü gösterir. Cu<sup>2+</sup>\'nın yükü 2+; I ise 1+ demektir.', 'Rakam metalin yükünü gösterir. Cu<sup>2+</sup>\'nın yükü 2+; III ise 3+ demektir.', ''],
      right: 'Evet. Cu<sup>2+</sup> için bakır(II).',
    });
    sr.ac(2);
    const cuAd = renkli(c, svg, 500, 335, [['bakır', A], ['(II)', A]], { size: 48, kalin: 600 }); cuAd.style.opacity = 0;
    await par(c.say('Cu<sup>2+</sup>\'nın yükü 2+: bakır(II).', { speak: 'Bakır iki artı iyonunun yükü iki artı: bakır iki.' }), belir(c, cuAd, 500));
  }

  /* ---- 4. Yedi metal, birden çok katyon ---- */
  async function yediMetal(c) {
    const svg = c.svg(1000, 562);
    const L = basamakListesi(c, svg, 50, 80, { dy: 60, w: 520 });
    const kar = c.S('g', {}, svg);
    [['Na^{+}', 'arti'], ['Mg^{2+}', 'arti'], ['Al^{3+}', 'arti']].forEach(([e, t], i) => iyon(c, kar, 810, 150 + i * 105, t, e, { r: 46, size: 24 }));
    kar.style.opacity = 0;

    await par(c.say('Bazı metaller birden fazla katyon verir.'), belir(c, L.g, 100));
    const sirayla = async () => { for (const s of L.satir) await belir(c, s.g, 260); };
    await par(c.say('Yedisini tanıyalım: krom, mangan, bakır, kurşun, kalay, demir, kobalt.'), sirayla());
    await c.say('Her metalin olası basamakları yan sütunda yazılıdır.');
    L.vurgula(5);
    await c.say('Demir +2 ve +3, bakır +1 ve +2 basamağında bulunur.', { speak: 'Demir artı iki ve artı üç, bakır artı bir ve artı iki basamağında bulunur.' });
    L.vurgula(3);
    await c.say('Kurşun ve kalay +2 ve +4 basamağındadır.', { speak: 'Kurşun ve kalay artı iki ve artı dört basamağındadır.' });
    L.vurgula(6);
    await c.say('Kobalt +2 ve +3 basamağındadır.', { speak: 'Kobalt artı iki ve artı üç basamağındadır.' });
    L.vurgula(0);
    await c.say('Krom ile mangan üçer basamakta bulunabilir.');
    L.vurgula(-1);
    await par(c.say('Sodyum, magnezyum, alüminyum gibi metallerin yalnız bir katyonu vardır.'), belir(c, kar, 600));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bakır hangi basamaklarda bulunabilir?',
      options: ['+2 ve +3', '+2 ve +4', '+1 ve +2'], answer: 2,
      hints: ['Bakırın satırına bak: +2 ve +3 demirin ve kobaltın basamaklarıdır.', 'Bakırın satırına bak: +2 ve +4 kurşunun ve kalayın basamaklarıdır.', ''],
      right: 'Evet. Bakır +1 ve +2 basamağında bulunur.',
    });
    L.vurgula(2);
    await c.say('Bakır +1 ve +2 basamağında bulunur.', { speak: 'Bakır artı bir ve artı iki basamağında bulunur.' });
    await c.say('Bu yedi metalin adında, yük Romen rakamıyla söylenir.');
  }

  /* ---- 5. Metalin yükünü formülden bul ---- */
  async function yukuBul(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg);
    const adY = (parcalar) => { const t = renkli(c, svg, 500, 385, parcalar, { size: 40, kalin: 600 }); t.style.opacity = 0; return t; };
    const not = yaz(c, svg, 500, 525, ['atom sayısı 2 · rakam I'], { size: 26, kalin: 600, renk: RENK.vurgu });
    gizle(ts.g, ts.fg, not);

    // CuO
    ts.kur(T.Cu2, T.O, 0, 0); ts.formul('CuO', '');
    await par(c.say('Metalin yükünü formülden bulabiliriz.'), belir(c, [ts.g, ts.fg], 500));
    await par(c.say('CuO\'da bir O<sup>2−</sup> var: toplam eksi yük 2−.', { speak: `${oku('CuO')}'da bir oksit iyonu var: toplam eksi yük iki eksi.` }), ts.say(0, 1, 900));
    await par(c.say('Toplam yük sıfır; tek bakır 2+ taşır: Cu<sup>2+</sup>.', { speak: 'Toplam yük sıfır; tek bakır iki artı taşır: bakır iki artı.' }), ts.say(1, 1, 900));
    let ad1 = adY([['bakır', A], ['(II)', A], [' oksit', B]]);
    await par(c.say('Ad: bakır(II) oksit.', { speak: 'Ad: bakır iki oksit.' }), belir(c, ad1, 500));
    // Cu2O
    c.clearSay();
    await belir(c, ad1, 300, 0); ts.formul('Cu_{2}O', ''); ts.kur(T.Cu1, T.O, 0, 1);
    await par(c.say('Cu<sub>2</sub>O\'da da bir O<sup>2−</sup> var: toplam eksi yük 2−.', { speak: `${oku('Cu_{2}O')}'da da bir oksit iyonu var: toplam eksi yük iki eksi.` }), c.wait(300));
    await par(c.say('İki bakır 2+ taşır; her biri 1+ olur.', { speak: 'İki bakır iki artı taşır; her biri bir artı olur.' }), ts.say(2, 1, 1100));
    ad1 = adY([['bakır', A], ['(I)', A], [' oksit', B]]);
    await par(c.say('Ad: bakır(I) oksit; iki bakır var ama rakam I.', { speak: 'Ad: bakır bir oksit; iki bakır var ama rakam bir.' }), belir(c, [ad1, not], 600));
    await c.say('Romen rakamı atom sayısını değil, metalin yükünü gösterir.');

    // Birlikte çöz: CuF2
    c.clearSay();
    await belir(c, [ad1, not], 300, 0);
    ts.formul('CuF_{2}', ''); ts.kur(T.Cu2, T.F, 0, 2);
    const ek = yaz(c, svg, 500, 525, ['2 F^{−} → toplam 2− · bakır sayısı: 1 · Cu yükü: ?'], { size: 24, kalin: 600, renk: RENK.soluk });
    ek.style.opacity = 0; await belir(c, ek, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'CuF<sub>2</sub> bileşiğinde bakırın yükü nedir?',
      options: ['1+', '2−', '2+'], answer: 2,
      hints: ['İki F<sup>−</sup> toplam 2− eder; tek bakırın yükü 1+ olsaydı toplam sıfır olmazdı.', 'Metal artı yüklüdür; 2− anyonun yüküdür.', ''],
      right: 'Evet. İki F<sup>−</sup> 2− eder; tek bakır 2+ taşır.',
    });
    await belir(c, ek, 300, 0);
    ad1 = adY([['bakır', A], ['(II)', A], [' florür', B]]);
    await par(c.say('CuF<sub>2</sub>\'de bakır Cu<sup>2+</sup>\'dır: ad bakır(II) florür.', { speak: `${oku('CuF_{2}')}'de bakır iki artı'dır: ad bakır iki florür.` }), (async () => { await ts.say(1, 2, 1000); await belir(c, ad1, 400); })());

    // Sıra sende: CuBr
    c.clearSay();
    await belir(c, ad1, 300, 0); ts.formul('CuBr', ''); ts.kur(T.Cu1, T.Br, 0, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'CuBr bileşiğinin adı hangisidir?',
      options: ['Bakır(II) bromür', 'Bakır bromür', 'Bakır(I) bromür'], answer: 2,
      hints: ['Bir Br<sup>−</sup> toplam 1− eder; tek bakır 1+ taşır, 2+ değil.', 'Bakır birden çok katyon verir; ad yükü de söyler.', ''],
      right: 'Evet. Bir Br<sup>−</sup> 1− eder; tek bakır 1+ taşır.',
    });
    ad1 = adY([['bakır', A], ['(I)', A], [' bromür', B]]);
    await par(c.say('Bir Br<sup>−</sup> 1− eder; tek bakır 1+ taşır: bakır(I) bromür.', { speak: 'Bir bromür iyonu bir eksi eder; tek bakır bir artı taşır: bakır bir bromür.' }), (async () => { await ts.say(1, 1, 900); await belir(c, ad1, 400); })());

    // Sıra sende: Fe2O3
    c.clearSay();
    await belir(c, ad1, 300, 0); ts.formul('Fe_{2}O_{3}', ''); ts.kur(T.Fe3, T.O, 0, 3);
    await c.choice({
      tag: 'Sıra sende', q: 'Fe<sub>2</sub>O<sub>3</sub> bileşiğinde demirin yükü nedir?',
      options: ['2+', '6+', '3+'], answer: 2,
      hints: ['Üç O<sup>2−</sup> toplam 6− eder; bu yük iki demire bölünür.', '6+ iki demirin toplam yüküdür; her demir bunun yarısını taşır.', ''],
      right: 'Evet. 6+ iki demire bölünür: her biri 3+.',
    });
    ad1 = adY([['demir', A], ['(III)', A], [' oksit', B]]);
    await par(c.say('İki Fe<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder: demir(III) oksit.', { speak: 'İki demir üç artı altı artı, üç oksit altı eksi eder: demir üç oksit.' }), (async () => { await ts.say(2, 3, 1100); await belir(c, ad1, 400); })());
    await c.say('Fe<sub>2</sub>O<sub>3</sub>\'te iki demir var ama rakam III.', { speak: `${oku('Fe_{2}O_{3}')}'te iki demir var ama rakam üç.` });
  }

  /* ---- 6. Addan formüle ---- */
  async function addanFormule(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg, { y: 160 });
    gizle(ts.g, ts.fg);
    const adlar = (k, a) => { const ak = adKutulari(c, svg, 56, k, a, { size: 30, h: 56 }); ak.g.style.opacity = 0; return ak; };
    let ak = adlar('kalay(IV)', 'klorür'); ts.kur(T.Sn4, T.Cl, 0, 0);
    await par(c.say('Romen rakamı, metalin yükünü söyler.'), belir(c, ak.g, 500));
    ts.kur(T.Sn4, T.Cl, 1, 1);
    await par(c.say('Kalay(IV) klorür: Sn<sup>4+</sup> ve Cl<sup>−</sup> iyonları.', { speak: 'Kalay dört klorür: kalay dört artı ve klorür iyonları.' }), belir(c, ts.g, 500));
    await par(c.say('4+ yükünü dört Cl<sup>−</sup> dengeler: SnCl<sub>4</sub>.', { speak: `Dört artı yükünü dört klorür iyonu dengeler: ${oku('SnCl_{4}')}.` }), (async () => { await ts.say(1, 4, 1200); ts.fg.style.opacity = 1; ts.formul('SnCl_{4}', '1:4'); })());
    await c.wait(500);
    c.clearSay();
    await sil(c, ak.g); ts.formul('', ''); ak = adlar('demir(III)', 'oksit'); ts.kur(T.Fe3, T.O, 1, 1); ts.fg.style.opacity = 0;
    await par(c.say('Demir(III) oksit: Fe<sup>3+</sup> ve O<sup>2−</sup> iyonları.', { speak: 'Demir üç oksit: demir üç artı ve oksit iki eksi iyonları.' }), belir(c, ak.g, 500));
    await par(c.say('İki Fe<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder: Fe<sub>2</sub>O<sub>3</sub>.', { speak: `İki demir üç artı altı artı, üç oksit altı eksi eder: ${oku('Fe_{2}O_{3}')}.` }), (async () => { await ts.say(2, 3, 1200); ts.fg.style.opacity = 1; ts.formul('Fe_{2}O_{3}', '2:3'); })());

    // Birlikte çöz: kurşun(II) klorür
    c.clearSay();
    await sil(c, ak.g); ts.formul('', ''); ak = adlar('kurşun(II)', 'klorür'); ts.kur(T.Pb2, T.Cl, 1, 0); ts.fg.style.opacity = 0;
    const ek = yaz(c, svg, 500, 525, ['Pb^{2+} ve Cl^{−} · 2+ için kaç Cl^{−}?'], { size: 24, kalin: 600, renk: RENK.soluk });
    ek.style.opacity = 0;
    await par(belir(c, ak.g, 400), belir(c, ek, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kurşun(II) klorürde kaç Cl<sup>−</sup> gerekir?',
      options: ['1', '2', '4'], answer: 1,
      hints: ['Pb<sup>2+</sup> 2+ yüklü; Cl<sup>−</sup> 1− yüklü. Bir tane yetmez.', '', 'Dört Cl<sup>−</sup> 4− eder; fazla. İki Cl<sup>−</sup> toplam 2− eder.'],
      right: 'Evet. İki Cl<sup>−</sup> toplam 2− eder.',
    });
    await belir(c, ek, 300, 0);
    await par(c.say('Formül PbCl<sub>2</sub>\'dir.', { speak: `Formül ${oku('PbCl_{2}')}'dir.` }), (async () => { await ts.say(1, 2, 1000); ts.fg.style.opacity = 1; ts.formul('PbCl_{2}', '1:2'); })());

    // Sıra sende: mangan(IV) oksit
    c.clearSay();
    await sil(c, ak.g); ts.formul('', ''); ak = adlar('mangan(IV)', 'oksit'); ts.kur(T.Mn4, T.O, 1, 0); ts.fg.style.opacity = 0;
    await belir(c, ak.g, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Mangan(IV) oksit bileşiğinin formülü hangisidir?',
      options: ['MnO', 'Mn<sub>2</sub>O', 'MnO<sub>2</sub>'], answer: 2,
      hints: ['4+ yükünü bir O<sup>2−</sup> dengelemez; kaç O<sup>2−</sup> gerekir?', 'Alt indis iyon sayısıdır: iki Mn<sup>4+</sup> 8+ eder, bunu dengelemek için fazla O<sup>2−</sup> gerekir.', ''],
      right: 'Evet. İki O<sup>2−</sup> toplam 4− eder.',
    });
    await par(c.say('İki O<sup>2−</sup> 4− eder: formül MnO<sub>2</sub>.', { speak: `İki oksit iyonu dört eksi eder: formül ${oku('MnO_{2}')}.` }), (async () => { await ts.say(1, 2, 1000); ts.fg.style.opacity = 1; ts.formul('MnO_{2}', '1:2'); })());
  }

  /* ---- 7. Rakam ne zaman yazılır? ---- */
  async function rakamNeZaman(c) {
    const svg = c.svg(1000, 562);
    // Karşılaştırma: iki sütun.
    const kol = c.S('g', {}, svg);
    const COL = [
      { x: 250, baslik: 'Yalnız bir katyonu olan metal', satir: [[['magnezyum', A], [' klorür', B]], [['sodyum', A], [' sülfür', B]], [['alüminyum', A], [' oksit', B]]] },
      { x: 750, baslik: 'Birden çok katyonu olan metal', satir: [[['demir', A], ['(III)', A], [' klorür', B]], [['bakır', A], ['(I)', A], [' oksit', B]], [['kalay', A], ['(II)', A], [' klorür', B]]] },
    ];
    const bas = COL.map((k) => { const t = yazi(c, kol, k.x, 90, k.baslik, { size: 28, kalin: 700 }); t.style.opacity = 0; return t; });
    const satir = COL.map((k) => k.satir.map((s, i) => { const t = renkli(c, kol, k.x, 190 + i * 80, s, { size: 34, kalin: 600 }); t.style.opacity = 0; return t; }));
    await par(c.say('İki tür metalin adlarını karşılaştıralım.'), belir(c, bas, 500));
    await par(c.say('Sodyum, magnezyum, alüminyum tek katyon verir.'), belir(c, satir[0], 600));
    await c.say('Adlarında Romen rakamı yoktur.');
    await par(c.say('Demir, bakır, kalay birden çok katyon verir.'), belir(c, satir[1], 600));
    await c.say('Adlarında Romen rakamı vardır.');
    await c.say('Rakam, hangi katyonun bulunduğunu söyler.');
    c.clearSay();
    await sil(c, kol);

    // Dene: kart başına seçim, iki kutu.
    const S2 = c.S('g', {}, svg), SX = [250, 750];
    SX.forEach((x, i) => {
      kutu(c, S2, x - 220, 70, 440, 330, { rx: 14 });
      yazi(c, S2, x, 120, i === 0 ? 'Romen rakamı yazılır' : 'Romen rakamı yazılmaz', { size: 30, kalin: 700 });
    });
    renkli(c, S2, 500, 470, [['Çok katyonlu: ', RENK.soluk], ['Cr Mn Cu Pb Sn Fe Co', A]], { size: 28, kalin: 600 });
    gizle(S2);
    await belir(c, S2, 500);
    const KART = [
      { f: 'MgCl_{2}', kutu: 1, neden: 'Magnezyum yalnız Mg<sup>2+</sup> verir.' },
      { f: 'FeO', kutu: 0, neden: 'Demir birden çok katyon verir; FeO\'da Fe<sup>2+</sup>: demir(II) oksit.' },
      { f: 'Al_{2}O_{3}', kutu: 1, neden: 'Alüminyum yalnız Al<sup>3+</sup> verir.' },
      { f: 'SnCl_{2}', kutu: 0, neden: 'Kalay birden çok katyon verir; SnCl<sub>2</sub>\'de Sn<sup>2+</sup>: kalay(II) klorür.' },
      { f: 'NaBr', kutu: 1, neden: 'Sodyum yalnız Na<sup>+</sup> verir.' },
      { f: 'CuCl', kutu: 0, neden: 'Bakır birden çok katyon verir; CuCl\'de Cu<sup>+</sup>: bakır(I) klorür.' },
      { f: 'ZnS', kutu: 1, neden: 'Çinko yalnız Zn<sup>2+</sup> verir.' },
      { f: 'CoCl_{2}', kutu: 0, neden: 'Kobalt birden çok katyon verir; CoCl<sub>2</sub>\'de Co<sup>2+</sup>: kobalt(II) klorür.' },
    ];
    KART.forEach((k) => { k.ipucu = 'Metalin tek katyonu mu var, birden çok katyonu mu var? Listeye bak.'; });
    const sayac = [0, 0];
    let kart = null;
    await c.say('Her bileşiğin adında Romen rakamı yazılıp yazılmayacağına karar ver.', { noWait: true });
    await window.KIT.sinifla(c, {
      tag: 'Dene', kartlar: KART, kutular: ['Adında Romen rakamı yazılır', 'Adında Romen rakamı yazılmaz'],
      soru: (k) => `${H(k.f)} bileşiğinin adında Romen rakamı yazılır mı?`,
      sec: async (i, k) => { c.clearSay(); kart = yaz(c, svg, 500, 300, [k.f], { size: 64, kalin: 700 }); kart.style.opacity = 0; await belir(c, kart, 300); },
      yerlestir: async (i, k) => {
        const n = sayac[k.kutu]++;
        await par(c.say(`${H(k.f)}: ${k.kutu === 0 ? 'Romen rakamı yazılır.' : 'Romen rakamı yazılmaz.'}`, { speak: `${oku(k.f)}: ${k.kutu === 0 ? 'Romen rakamı yazılır.' : 'Romen rakamı yazılmaz.'}` }), window.KIT_F.kartTasi(c, kart, SX[k.kutu], 190 + n * 52, 32, 600));
      },
    });
    await c.say('Birden çok katyonu olan yedi metalde ad, yükü de söyler.');
    c.note('<b>Çok katyonlu metalde ad, yükü Romen rakamıyla söyler.</b><br>Örnek: FeCl<sub>3</sub>: demir(III) klorür.', 'Çok katyonlu metal', 'f2-romen');
  }

  Ders.start({
    id: 'cesitlilik-f2', kicker: 'Konu F · Bileşiklerin adlandırılması', title: 'Birden fazla katyonu olan metaller: ad yükü söyler', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Birden fazla katyonu olan metaller: ad yükü söyler',
      hook: 'Demirin klorla iki ayrı bileşiği var; ikisine de “demir klorür” denirse hangisi olduğu nasıl anlaşılır?',
      button: 'Derse başla ›',
    },
    goals: ['Birden fazla katyon veren yedi metali tanır.', 'Metalin yükünü formülden bulur; adındaki Romen rakamını yazar.', 'Adı verilen bileşiğin formülünü yazar.'],
    scenes: [
      { title: 'Hatırla', goal: 'İyonik bileşik adını ve formülünü hatırla.', run: hatirla },
      { title: 'Aynı ad, iki ayrı madde', goal: 'Aynı metalin iki bileşiğini adla ayırmanın neden gerektiğini gör.', run: ayniAd },
      { title: 'Romen rakamı yükü söyler', goal: 'Romen rakamının metalin yükünü gösterdiğini öğren.', run: romen },
      { title: 'Yedi metal, birden çok katyon', goal: 'Birden fazla katyon veren yedi metali ve basamaklarını tanı.', run: yediMetal },
      { title: 'Metalin yükünü formülden bul', goal: 'Yük toplamıyla metalin yükünü bul ve bileşiği adlandır.', run: yukuBul },
      { title: 'Addan formüle', goal: 'Romen rakamlı addan formülü yaz.', run: addanFormule },
      { title: 'Rakam ne zaman yazılır?', goal: 'Hangi bileşiğin adında Romen rakamı yazıldığını ayır.', run: rakamNeZaman },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'FeO bileşiğinin adı hangisidir?',
        options: ['Demir oksit', 'Demir(II) oksit', 'Demir(III) oksit'], answer: 1,
        why: ['Demir birden çok katyon verir; ad yükü de söylemelidir.', 'FeO\'da bir O<sup>2−</sup> var; tek demir 2+ taşır: demir(II) oksit.', 'Demir 3+ olsaydı formül Fe<sub>2</sub>O<sub>3</sub> olurdu; FeO\'da demir 2+ taşır.'], scene: 4 },
      { q: 'Cu<sub>2</sub>O bileşiği “bakır(I) oksit” diye adlandırılır. Romen rakamı I neyi gösterir?',
        options: ['Bakır atomlarının sayısını', 'Oksijenin yükünü', 'Bakırın yükünü'], answer: 2,
        why: ['İki bakır var ama rakam I; rakam atom sayısını göstermez.', 'Oksijenin yükü 2−\'dir; rakam metalin yükünü gösterir.', 'İki bakır 2+ taşır; her biri 1+ olur. Rakam bu yükü gösterir.'], scene: 4 },
      { q: 'PbO<sub>2</sub> bileşiğinin adı hangisidir?',
        options: ['Kurşun(IV) oksit', 'Kurşun(II) oksit', 'Kurşun oksit'], answer: 0,
        why: ['İki O<sup>2−</sup> 4− eder; tek kurşun 4+ taşır: kurşun(IV) oksit.', 'Kurşun 2+ olsaydı formül PbO olurdu.', 'Kurşun birden çok katyon verir; ad yükü de söylemelidir.'], scene: 4 },
      { q: 'Hangi bileşiğin adında Romen rakamı kullanılmaz?',
        options: ['SnCl<sub>2</sub>', 'ZnCl<sub>2</sub>', 'CoCl<sub>2</sub>'], answer: 1,
        why: ['Kalay birden çok katyon verir; kalay(II) klorür.', 'Çinko yalnız Zn<sup>2+</sup> verir; adı çinko klorür, rakam yok.', 'Kobalt birden çok katyon verir; kobalt(II) klorür.'], scene: 6 },
      { q: 'Krom(III) oksit bileşiğinin formülü hangisidir?',
        options: ['CrO<sub>3</sub>', 'Cr<sub>3</sub>O<sub>2</sub>', 'Cr<sub>2</sub>O<sub>3</sub>'], answer: 2,
        why: ['CrO<sub>3</sub>\'te üç O<sup>2−</sup> 6− eder; tek Cr 3+ taşır, yükler tutmaz.', 'Alt indisler ters yazılmış; üç Cr<sup>3+</sup> 9+ eder.', 'İki Cr<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder; toplam sıfır.'], scene: 5 },
    ],
    summary: [
      'Bazı metaller birden fazla katyon verir.',
      'Ad, metalin yükünü Romen rakamıyla söyler.',
      'Yük, formülden yük toplamıyla bulunur.',
      '<b>Metalin birden çok yükü varsa ad, yükü de söyler.</b>',
    ],
    nextLesson: { href: 'f3-on-ekler.html', label: 'Sonraki: Ön ekler ›' },
  });
})();
