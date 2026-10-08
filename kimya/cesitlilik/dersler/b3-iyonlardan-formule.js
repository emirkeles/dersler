/* B3 — İyonlardan formüle
   İyonik bileşiğin formülü, katyon ve anyonun yüklerinin toplamı sıfır olacak biçimde, en az sayıda iyonla yazılır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/B-iyonik-bag.md ("B3"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Yük terazisi dersler/b-araclar.js içindedir. Terazideki "iyon sayısını artır/azalt" etkileşimi seçimle kurulur:
   öğrenci formülü seçer, terazi dengeye gelir ve formül şeridi dolar. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, gizle, belir, par, yuk, etkilesim } = window.KIT;
  const { GRI, KOYU, AC, iyon, terazi } = window.KIT_B;
  const { lerp } = Ders;

  /* İyon tanımları (terazi için). yuk işaretlidir. */
  const T = {
    Na: { etiket: 'Na^{+}', yuk: 1 }, K: { etiket: 'K^{+}', yuk: 1 }, Mg: { etiket: 'Mg^{2+}', yuk: 2 }, Ca: { etiket: 'Ca^{2+}', yuk: 2 },
    Al: { etiket: 'Al^{3+}', yuk: 3 }, NH4: { etiket: 'NH_{4}^{+}', yuk: 1, kutu: true },
    Cl: { etiket: 'Cl^{−}', yuk: -1 }, F: { etiket: 'F^{−}', yuk: -1 }, Br: { etiket: 'Br^{−}', yuk: -1 }, O: { etiket: 'O^{2−}', yuk: -2 },
    S: { etiket: 'S^{2−}', yuk: -2 }, N: { etiket: 'N^{3−}', yuk: -3 }, OH: { etiket: 'OH^{−}', yuk: -1, kutu: true },
    CO3: { etiket: 'CO_{3}^{2−}', yuk: -2, kutu: true }, NO3: { etiket: 'NO_{3}^{−}', yuk: -1, kutu: true },
    PO4: { etiket: 'PO_{4}^{3−}', yuk: -3, kutu: true }, SO4: { etiket: 'SO_{4}^{2−}', yuk: -2, kutu: true },
  };
  /* 'Mg_{3}(PO_{4})_{2}' → 'Mg<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>' (soru ve şık metinleri için). */
  const H = (m) => m.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');

  /* Yüke göre sütunlu tablo: kol = [{ x, ad, renk }]. hucre(j, i, metin) saydam bir hücre döndürür. */
  function sutunlu(c, p, kol, y0, dy, size) {
    const g = c.S('g', {}, p);
    kol.forEach((k) => yazi(c, g, k.x, 76, k.ad, { size: 38, kalin: 700, renk: k.renk, math: true }));
    cizgi(c, g, [40, 100], [960, 100], RENK.kenarlik, 1.5);
    const hucre = (j, i, m, renk) => {
      const t = yazi(c, g, kol[j].x, y0 + i * dy, m, { size, kalin: 600, math: true, renk });
      t.style.opacity = 0; return t;
    };
    gizle(g.children.length ? [] : []);
    return { g, hucre };
  }

  /* Formülün alt indislerinden iyon çizimine inen çizgiler (CaCl2). */
  function indisCizgileri(c, p, fm) {
    const g = c.S('g', {}, p);
    const orta = (i) => { const e = fm.getExtentOfChar(i); return [e.x + e.width / 2, e.y + e.height]; };
    const Ca = (orta(0)[0] + orta(1)[0]) / 2, Cl = (orta(2)[0] + orta(3)[0]) / 2, ind = orta(4)[0];
    cizgi(c, g, [Ca, 462], [Ca, 502], RENK.cekme, 3);
    cizgi(c, g, [ind, 462], [ind - 34, 502], RENK.cekme, 3); cizgi(c, g, [ind, 462], [ind + 34, 502], RENK.cekme, 3);
    iyon(c, g, Ca, 530, 'arti', 'Ca^{2+}', { r: 31, size: 22 });
    iyon(c, g, ind - 34, 530, 'eksi', 'Cl^{−}', { r: 31, size: 22 }); iyon(c, g, ind + 34, 530, 'eksi', 'Cl^{−}', { r: 31, size: 22 });
    g.style.opacity = 0;
    return g;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg), P = [330, 250], Q = [670, 250];
    iyon(c, sol, P[0], P[1], 'arti', 'Na^{+}', { r: 56, size: 34 }); iyon(c, sol, Q[0], Q[1], 'eksi', 'Cl^{−}', { r: 66, size: 34 });
    etkilesim(c, sol, P, Q, 'cekme', { b: 62, boy: 70 });
    yazi(c, sol, 500, 400, 'katyon ve anyon', { size: 28, kalin: 600, renk: RENK.soluk });
    // Al atomu ve üç valans elektronu.
    const sag = c.S('g', {}, svg), C = [420, 240];
    const gri = c.S('circle', { cx: C[0], cy: C[1], r: 76, fill: GRI.metal }, sag), ton = c.S('circle', { cx: C[0], cy: C[1], r: 76, fill: RENK.arti }, sag);
    ton.style.opacity = 0;
    const la = yazi(c, sag, C[0], C[1] + 12, 'Al', { size: 34, kalin: 700, renk: AC, math: true });
    const li = yazi(c, sag, C[0], C[1] + 12, 'Al^{3+}', { size: 34, kalin: 700, renk: KOYU, math: true });
    li.style.opacity = 0;
    const E0 = [[C[0] + 96, C[1] - 40], [C[0] + 100, C[1] + 10], [C[0] + 88, C[1] + 56]];
    const el = E0.map((q) => yuk(c, sag, q, 'eksi', 14));
    yazi(c, sag, C[0], 392, 'alüminyum atomu', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(sag);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, sol, 500));
    await c.choice({
      tag: 'Hatırla', q: 'İyonik bağ hangi tanecikler arasındaki çekimdir?',
      options: ['Artı iyonlar ile elektron denizi', 'Katyonlar ile anyonlar', 'Aynı yüklü iyonlar'], answer: 1,
      hints: ['Artı iyonlar ile elektron denizi arasındaki çekim metalik bağdır. İyonik bağ, katyon ile anyon arasındaki elektrostatik çekimdir.', '', 'Aynı yüklü iyonlar birbirini iter. İyonik bağ, katyon ile anyon arasındaki elektrostatik çekimdir.'],
      right: 'Evet. İyonik bağ, katyon ile anyon arasındaki elektrostatik çekimdir.',
    });
    await par(belir(c, sol, 400, 0), belir(c, sag, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Alüminyum atomu üç valans elektronunu bırakırsa hangi iyon oluşur?',
      options: ['Al<sup>3−</sup>', 'Al<sup>+</sup>', 'Al<sup>3+</sup>'], answer: 2,
      hints: ['Elektron bırakan atom artı yüklü olur, eksi değil.', 'Üç elektron gidince yük 3+ olur, 1+ değil.', ''],
      right: 'Evet. Üç elektron giden atomun yükü 3+ olur.',
    });
    await par(c.tween(1100, (e) => el.forEach((x, i) => { x.tasi([E0[i][0] + 120 * e, E0[i][1] + (i - 1) * 40 * e]); x.g.style.opacity = 1 - e; })),
      c.tween(1100, (e) => { gri.setAttribute('r', 76 - 20 * e); ton.setAttribute('r', 76 - 20 * e); ton.style.opacity = e; la.style.opacity = e < 0.5 ? 1 : 0; li.style.opacity = e < 0.5 ? 0 : 1; }));
    await c.wait(500);
    await c.say('Bugün katyon ve anyondan bileşiğin formülünü bulacağız.', { speak: '[curious] Bugün katyon ve anyondan bileşiğin formülünü bulacağız.' });
  }

  /* ---- 2. Katyonlar: simge, yük, ad ---- */
  async function katyonlar(c) {
    const svg = c.svg(1000, 562);
    const A = RENK.arti;
    const tb = sutunlu(c, svg, [{ x: 200, ad: '1+', renk: A }, { x: 500, ad: '2+', renk: A }, { x: 800, ad: '3+', renk: A }], 170, 70, 30);
    const h = tb.hucre;
    const c10 = h(0, 0, 'Li^{+} lityum'), c11 = h(0, 1, 'Na^{+} sodyum'), c12 = h(0, 2, 'K^{+} potasyum');
    const c20 = h(1, 0, 'Mg^{2+} magnezyum'), c21 = h(1, 1, 'Ca^{2+} kalsiyum'), c30 = h(2, 0, 'Al^{3+} alüminyum');
    const baryum = h(1, 2, 'Ba: ?', RENK.vurgu);
    const c13 = h(0, 3, 'Rb^{+} rubidyum'), c14 = h(0, 4, 'Cs^{+} sezyum'), c22 = h(1, 3, 'Sr^{2+} stronsiyum'), c23 = h(1, 4, 'Zn^{2+} çinko');
    gizle(tb.g);

    await par(c.say('İyonik bileşiğin formülünü yazmak için iyonların simgesini ve yükünü bilmeliyiz.'), belir(c, tb.g, 500, 1));
    await c.say('Önce tek atomlu katyonlara bakalım: yük, verilen elektron sayısına eşittir.');
    await par(c.say('Lityum, sodyum ve potasyum bir elektron verir: yükleri 1+.', { speak: 'Lityum, sodyum ve potasyum bir elektron verir: yükleri bir artı.' }), belir(c, [c10, c11, c12], 500));
    await par(c.say('Magnezyum ve kalsiyum iki, alüminyum üç elektron verir.'), belir(c, [c20, c21, c30], 500));
    await belir(c, baryum, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Baryum atomu iki elektron verirse hangi iyon oluşur?',
      options: ['Ba<sup>+</sup>', 'Ba<sup>2−</sup>', 'Ba<sup>2+</sup>'], answer: 2,
      hints: ['Yük, verilen elektron sayısıdır; iki elektron verildi, 1+ olmaz.', 'Elektron veren atom artı yüklü olur, eksi değil.', ''],
      right: 'Evet. İki elektron veren atomun yükü 2+ olur.',
    });
    c.mathText(baryum, 'Ba^{2+} baryum'); baryum.style.fill = RENK.yazi;
    await par(c.say('Rubidyum ve sezyum bir, stronsiyum ve baryum iki elektron verir.'), belir(c, [c13, c14, c22], 500));
    await par(c.say('Çinko da iki elektron verir ve Zn<sup>2+</sup> olur.', { speak: 'Çinko da iki elektron verir ve çinko iyonu olur, ikinin artısı.' }), belir(c, c23, 500));
    await c.choice({
      tag: 'Sıra sende', q: 'Sezyum atomu bir elektron verirse oluşan iyon hangisidir?',
      options: ['Cs<sup>−</sup>', 'Cs<sup>+</sup>', 'Cs<sup>2+</sup>'], answer: 1,
      hints: ['Elektron veren atom artı yüklü olur, eksi değil.', '', 'Bir elektron verildi; yük 1+ olur, 2+ değil.'],
      right: 'Evet. Bir elektron veren atom 1+ yüklü iyon olur.',
    });
  }

  /* ---- 3. Anyonlar: simge, yük, ad ---- */
  async function anyonlar(c) {
    const svg = c.svg(1000, 562);
    const B = RENK.eksi;
    const tb = sutunlu(c, svg, [{ x: 130, ad: '1−', renk: B }, { x: 380, ad: '2−', renk: B }, { x: 630, ad: '3−', renk: B }, { x: 880, ad: '4−', renk: B }], 170, 66, 28);
    const h = tb.hucre;
    const f = [h(0, 0, 'F^{−} florür'), h(0, 1, 'Cl^{−} klorür'), h(0, 2, 'Br^{−} bromür'), h(0, 3, 'I^{−} iyodür'), h(0, 4, 'H^{−} hidrür')];
    const o = [h(1, 0, 'O^{2−} oksit'), h(1, 1, 'S^{2−} sülfür')], cc = h(3, 0, 'C^{4−} karbür'), n = h(2, 0, 'N^{3−} nitrür');
    gizle(tb.g);

    await par(c.say('Anyonun yükü, atomun aldığı elektron sayısına eşittir.'), belir(c, tb.g, 500, 1));
    await par(c.say('Flor, klor, brom ve iyot birer elektron alır: yükleri 1−.', { speak: 'Flor, klor, brom ve iyot birer elektron alır: yükleri bir eksi.' }), belir(c, f.slice(0, 4), 500));
    await par(c.say('Oksijen ve kükürt ikişer, karbon dört elektron alır.'), belir(c, [...o, cc], 500));
    await par(c.say('Hidrojen, metallerle yaptığı bileşiklerde bir elektron alıp H<sup>−</sup> olur.', { speak: 'Hidrojen, metallerle yaptığı bileşiklerde bir elektron alıp hidrür iyonu olur.' }), belir(c, f[4], 500));
    await c.choice({
      tag: 'Sıra sende', q: 'Azot atomu üç elektron alırsa hangi iyon oluşur?',
      options: ['N<sup>3+</sup>', 'N<sup>3−</sup>', 'N<sup>−</sup>'], answer: 1,
      hints: ['Elektron alan atom eksi yüklü olur. Yük, alınan elektron sayısıdır.', '', 'Yük, alınan elektron sayısıdır; üç elektron alındı.'],
      right: 'Evet. Üç elektron alan atomun yükü 3− olur.',
    });
    await belir(c, n, 500);
  }

  /* ---- 4. Çok atomlu iyonlar ---- */
  async function cokAtomlu(c) {
    const svg = c.svg(1000, 562);
    // NaCl ve NaOH'nin iyonları.
    const ust = c.S('g', {}, svg);
    iyon(c, ust, 140, 170, 'arti', 'Na^{+}', { r: 34, size: 28 }); iyon(c, ust, 240, 170, 'eksi', 'Cl^{−}', { r: 42, size: 28 });
    yazi(c, ust, 190, 262, 'NaCl', { size: 34, kalin: 700 });
    iyon(c, ust, 600, 170, 'arti', 'Na^{+}', { r: 34, size: 28 }); iyon(c, ust, 740, 170, 'eksi', 'OH^{−}', { kutu: true, w: 110, h: 64, size: 28 });
    yazi(c, ust, 670, 262, 'NaOH', { size: 34, kalin: 700 });
    gizle(ust);
    // Sekiz çok atomlu iyon yüke göre sıralı.
    const SATIR = [['1+', [['NH_{4}^{+}', 'amonyum', 'arti']]],
      ['1−', [['OH^{−}', 'hidroksit'], ['NO_{3}^{−}', 'nitrat'], ['HCO_{3}^{−}', 'bikarbonat'], ['CH_{3}COO^{−}', 'asetat']]],
      ['2−', [['CO_{3}^{2−}', 'karbonat'], ['SO_{4}^{2−}', 'sülfat']]], ['3−', [['PO_{4}^{3−}', 'fosfat']]]];
    const tab = c.S('g', {}, svg);
    SATIR.forEach(([y, liste], r) => {
      const Y = 90 + r * 128;
      yazi(c, tab, 70, Y + 10, y, { size: 36, kalin: 700, renk: r === 0 ? RENK.arti : RENK.eksi, math: true });
      liste.forEach(([f, ad, tur], i) => {
        const X = 250 + i * 200;
        iyon(c, tab, X, Y, tur || 'eksi', f, { kutu: true, w: 170, h: 56, size: 26 });
        yazi(c, tab, X, Y + 50, ad, { size: 22, kalin: 500, renk: RENK.soluk });
      });
    });
    gizle(tab);

    await par(c.say('NaCl\'deki Cl<sup>−</sup> tek atomludur; NaOH\'deki OH<sup>−</sup> ise çok atomludur.', { speak: 'Sodyum klorürdeki klorür tek atomludur; sodyum hidroksitteki hidroksit ise çok atomludur.' }), belir(c, ust, 500));
    await c.say('Çok atomlu iyon, yüklü bir atom topluluğudur.');
    await c.say('Yük, atom topluluğunun tamamına aittir.');
    await par(belir(c, ust, 400, 0), c.say('Bunların biri katyondur: NH<sub>4</sub><sup>+</sup>, amonyum; ötekiler anyondur.', { speak: 'Bunların biri katyondur: amonyum; ötekiler anyondur.' }), belir(c, tab, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'Hangisi çok atomlu bir iyondur?',
      options: ['Cl<sup>−</sup>', 'Mg<sup>2+</sup>', 'SO<sub>4</sub><sup>2−</sup>'], answer: 2,
      hints: ['Cl<sup>−</sup> tek atomludur. Birden çok atom içeren simgeyi ara.', 'Mg<sup>2+</sup> tek atomludur. Birden çok atom içeren simgeyi ara.', ''],
      right: 'Evet. Sülfat iyonu bir kükürt ve dört oksijen atomundan oluşur.',
    });

    // Dene: eşleştirme. Her simge için adını seç; doğru seçilince çizgi çekilir.
    await belir(c, tab, 400, 0);
    const IYON = [['NH_{4}^{+}', 'amonyum', 'arti'], ['OH^{−}', 'hidroksit'], ['NO_{3}^{−}', 'nitrat'], ['HCO_{3}^{−}', 'bikarbonat'],
      ['CH_{3}COO^{−}', 'asetat'], ['CO_{3}^{2−}', 'karbonat'], ['SO_{4}^{2−}', 'sülfat'], ['PO_{4}^{3−}', 'fosfat']];
    const sutun = c.S('g', {}, svg), yerS = (i) => 60 + i * 64, adlar = [];
    const simge = IYON.map(([f, , tur], i) => iyon(c, sutun, 250, yerS(i), tur || 'eksi', f, { kutu: true, w: 190, h: 50, size: 26 }));
    IYON.forEach(([, ad], i) => adlar.push(yazi(c, sutun, 700, yerS(i) + 9, ad, { size: 30, kalin: 600 })));
    gizle(sutun);
    await c.say('Her simgenin adını bul.', { noWait: true });
    await belir(c, sutun, 500);
    for (let i = 0; i < IYON.length; i++) {
      const diger = IYON.filter((_, k) => k !== i).map((x) => x[1]);
      const ys = [diger[(i * 3) % 7], diger[(i * 3 + 2) % 7]];
      const sira = i % 3, sec = ys.slice(); sec.splice(sira, 0, IYON[i][1]);
      simge[i].g.style.opacity = 1;
      const halka = c.S('rect', { x: 148, y: yerS(i) - 33, width: 204, height: 66, rx: 16, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, svg);
      await c.choice({
        tag: 'Dene', q: `${H(IYON[i][0])} iyonunun adı nedir?`, options: sec, answer: sira,
        hints: sec.map((_, j) => (j === sira ? '' : `Bu iyonun adı ${IYON[i][1]}.`)), right: `Evet. Bu iyonun adı ${IYON[i][1]}.`,
      });
      halka.remove();
      cizgi(c, svg, [358, yerS(i)], [610, yerS(i)], RENK.cekme, 3);
    }
  }

  /* ---- 5. Yükler toplamı sıfırdır ---- */
  async function toplamSifir(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg);
    ts.kur(T.Na, T.Cl, 0, 0);
    ts.fg.style.opacity = 1;
    await par(c.say('İyonik bileşikte katyon ve anyonların yüklerinin toplamı sıfırdır.'), belir(c, ts.g, 500));
    await par(c.say('Na<sup>+</sup> 1+, Cl<sup>−</sup> 1− yüklüdür; birer tane toplamı sıfır yapar.', { speak: 'Sodyum iyonu bir artı, klorür iyonu bir eksi yüklüdür; birer tane toplamı sıfır yapar.' }), ts.say(1, 1, 1000));
    ts.formul('NaCl', '1:1');
    await c.say('Bu yüzden formül NaCl\'dür; Na<sup>+</sup> ile Cl<sup>−</sup> oranı 1:1\'dir.', { speak: 'Bu yüzden formül sodyum klorürdür; sodyum iyonu ile klorür iyonu oranı bire birdir.' });
    // CaCl2.
    ts.formul('', ''); ts.kur(T.Ca, T.Cl, 0, 0);
    await par(c.say('Ca<sup>2+</sup> 2+ yüklüdür; tek Cl<sup>−</sup> bu yükü dengelemez.', { speak: 'Kalsiyum iyonu iki artı yüklüdür; tek klorür iyonu bu yükü dengelemez.' }), ts.say(1, 1, 900));
    await par(c.say('İkinci bir Cl<sup>−</sup> eklenince toplam yük sıfır olur.', { speak: 'İkinci bir klorür iyonu eklenince toplam yük sıfır olur.' }), ts.say(1, 2, 1000));
    ts.formul('CaCl_{2}', '1:2');
    const ind2 = indisCizgileri(c, svg, ts.fm);
    await par(c.say('Klorun sağ altına yazılan 2, iki Cl<sup>−</sup> olduğunu gösterir: CaCl<sub>2</sub>.', { speak: 'Klorun sağ altına yazılan iki, iki klorür iyonu olduğunu gösterir: kalsiyum klorür.' }), belir(c, ind2, 600));
    // MgO.
    await belir(c, ind2, 300, 0); ind2.remove();
    ts.formul('', ''); ts.kur(T.Mg, T.O, 0, 0);
    await par(c.say('Mg<sup>2+</sup> ve O<sup>2−</sup> yükleri eşit büyüklüktedir; birer tane yeter: MgO.', { speak: 'Magnezyum iyonu ve oksit iyonunun yükleri eşit büyüklüktedir; birer tane yeter: magnezyum oksit.' }), ts.say(1, 1, 900));
    ts.formul('MgO', '1:1');
    await c.say('Formül, toplam yükü sıfır yapan en az sayıda iyonu gösterir.');

    // Birlikte çöz: Na+ ve S2-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.Na, T.S, 2, 1); ts.formul('Na?S', '');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Na<sup>+</sup> ve S<sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['NaS', 'NaS<sub>2</sub>', 'Na<sub>2</sub>S'], answer: 2,
      hints: ['Bir Na<sup>+</sup> 1+, bir S<sup>2−</sup> 2−: yükler tutmaz. S<sup>2−</sup> 2− yüklü; bunu kaç Na<sup>+</sup> dengeler?', 'Alt indis, o iyondan kaç tane olduğunu gösterir; S<sup>2−</sup> tek tane yeter.', ''],
      right: 'Evet. İki Na<sup>+</sup>, bir S<sup>2−</sup> yükünü dengeler.',
    });
    ts.formul('Na_{2}S', '2:1');
    await c.say('İki Na<sup>+</sup> ile bir S<sup>2−</sup> kefeleri eşitler: formül Na<sub>2</sub>S.', { speak: 'İki sodyum iyonu ile bir sülfür iyonu kefeleri eşitler: formül sodyum sülfür, Na iki S.' });

    // Sor: Mg2+ ve Br-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.Mg, T.Br, 1, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Mg<sup>2+</sup> ve Br<sup>−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['MgBr', 'MgBr<sub>2</sub>', 'Mg<sub>2</sub>Br'], answer: 1,
      hints: ['Bir Mg<sup>2+</sup> 2+, bir Br<sup>−</sup> 1−: yükler tutmaz. 2+ yükü kaç Br<sup>−</sup> dengeler?', 'Mg<sup>2+</sup> tek tane yeter; dengelenmesi gereken Br<sup>−</sup> sayısıdır. Alt indis, o iyondan kaç tane olduğunu gösterir.', ''],
      right: 'Evet. Bir Mg<sup>2+</sup> için iki Br<sup>−</sup> gerekir.',
    });
    await ts.say(1, 2, 1000);
    ts.formul('MgBr_{2}', '1:2');
    await c.say('Bir Mg<sup>2+</sup> için iki Br<sup>−</sup> gerekir: formül MgBr<sub>2</sub>.', { speak: 'Bir magnezyum iyonu için iki bromür iyonu gerekir: formül magnezyum bromür, Mg Br iki.' });
  }

  /* ---- 6. Yükler tutmuyorsa ---- */
  async function tutmuyor(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg);
    ts.kur(T.Al, T.S, 0, 0);
    await par(c.say('Bazen yükler tutmaz: Al<sup>3+</sup> 3+, S<sup>2−</sup> ise 2− yüklüdür.', { speak: 'Bazen yükler tutmaz: alüminyum iyonu üç artı, sülfür iyonu ise iki eksi yüklüdür.' }), belir(c, ts.g, 500), ts.say(1, 1, 900));
    await par(c.say('Artı ve eksi toplam yükler eşit olana kadar iyon eklenir.'), ts.say(1, 2, 900));
    await ts.say(2, 2, 900); await ts.say(2, 3, 900);
    await par(c.say('İki Al<sup>3+</sup> toplam 6+, üç S<sup>2−</sup> toplam 6− yapar.', { speak: 'İki alüminyum iyonu toplam altı artı, üç sülfür iyonu toplam altı eksi yapar.' }), c.wait(500));
    ts.formul('Al_{2}S_{3}', '2:3');
    await c.say('Toplam yük sıfırdır; iyon oranı 2:3, formül Al<sub>2</sub>S<sub>3</sub>.', { speak: 'Toplam yük sıfırdır; iyon oranı iki üç, formül alüminyum sülfür, Al iki S üç.' });
    await c.say('Daha az iyonla toplam yük sıfır olmaz: formül en küçük oranı verir.');

    // Birlikte çöz: Mg2+ ve N3-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.Mg, T.N, 3, 0); ts.formul('Mg_{3}N?', '');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Mg<sup>2+</sup> ve N<sup>3−</sup> için kaç N<sup>3−</sup> gerekir?',
      options: ['3', '6', '2'], answer: 2,
      hints: ['Sol kefede toplam 6+ var. Üç N<sup>3−</sup> 9− eder; fazla.', 'Altı N<sup>3−</sup> 18− eder; fazla. N<sup>3−</sup> 3− yüklü, iki tane 6− eder.', ''],
      right: 'Evet. İki N<sup>3−</sup> 6− eder; üç Mg<sup>2+</sup> ile dengelenir.',
    });
    await ts.say(3, 2, 1000);
    ts.formul('Mg_{3}N_{2}', '3:2');
    await c.say('Üç Mg<sup>2+</sup> ile iki N<sup>3−</sup> dengelenir: formül Mg<sub>3</sub>N<sub>2</sub>.', { speak: 'Üç magnezyum iyonu ile iki nitrür iyonu dengelenir: formül Mg üç N iki.' });

    // Sor: Al3+ ve O2-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.Al, T.O, 1, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Al<sup>3+</sup> ve O<sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['Al<sub>3</sub>O<sub>2</sub>', 'AlO', 'Al<sub>2</sub>O<sub>3</sub>'], answer: 2,
      hints: ['Üç Al<sup>3+</sup> 9+, iki O<sup>2−</sup> 4−: yükler tutmaz. 3 ile 2\'nin ortak katı 6.', 'Bir Al<sup>3+</sup> 3+, bir O<sup>2−</sup> 2−: yükler tutmaz. 3 ile 2\'nin ortak katı 6.', ''],
      right: 'Evet. İki Al<sup>3+</sup> 6+, üç O<sup>2−</sup> 6− eder.',
    });
    await ts.say(2, 3, 1100);
    ts.formul('Al_{2}O_{3}', '2:3');
    await c.say('İki Al<sup>3+</sup> ile üç O<sup>2−</sup> dengelenir: formül Al<sub>2</sub>O<sub>3</sub>.', { speak: 'İki alüminyum iyonu ile üç oksit iyonu dengelenir: formül Al iki O üç.' });
  }

  /* ---- 7. Çok atomlu iyonlarla formül ---- */
  async function cokAtomluFormul(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg);
    ts.kur(T.Mg, T.CO3, 0, 0);
    await par(c.say('Çok atomlu iyonlar da aynı kuralla birleşir.'), belir(c, ts.g, 500));
    await par(c.say('Mg<sup>2+</sup> ve CO<sub>3</sub><sup>2−</sup>: yükler 2+ ve 2−, formül MgCO<sub>3</sub>.', { speak: 'Magnezyum iyonu ve karbonat iyonu: yükler iki artı ve iki eksi, formül magnezyum karbonat.' }), ts.say(1, 1, 900));
    ts.formul('MgCO_{3}', '1:1');
    await c.wait(500);
    ts.formul('', ''); ts.kur(T.Mg, T.PO4, 0, 0);
    await par(c.say('Mg<sup>2+</sup> ve PO<sub>4</sub><sup>3−</sup>: üç Mg<sup>2+</sup> ile iki PO<sub>4</sub><sup>3−</sup> yükleri dengeler.', { speak: 'Magnezyum iyonu ve fosfat iyonu: üç magnezyum iyonu ile iki fosfat iyonu yükleri dengeler.' }), ts.say(3, 2, 1200));
    ts.formul('Mg_{3}(PO_{4})_{2}', '3:2');
    await c.say('Çok atomlu iyondan birden fazla varsa, iyon parantez içine alınır.');
    await c.say('Sayı parantezin dışına yazılır: Mg<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>.', { speak: 'Sayı parantezin dışına yazılır: Mg üç, parantez içinde P O dört, parantez dışında iki.' });
    ts.formul('', ''); ts.kur(T.NH4, T.SO4, 0, 0);
    await par(c.say('NH<sub>4</sub><sup>+</sup> ve SO<sub>4</sub><sup>2−</sup>: iki NH<sub>4</sub><sup>+</sup> ile bir SO<sub>4</sub><sup>2−</sup> gerekir: (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>.', { speak: 'Amonyum iyonu ve sülfat iyonu: iki amonyum iyonu ile bir sülfat iyonu gerekir: parantez N H dört, parantez kapa iki, S O dört.' }), ts.say(2, 1, 1000));
    ts.formul('(NH_{4})_{2}SO_{4}', '2:1');
    await c.wait(500);

    // Birlikte çöz: Ca2+ ve OH-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.Ca, T.OH, 1, 0); ts.formul('Ca(OH)?', '');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Ca<sup>2+</sup> ve OH<sup>−</sup> iyonlarından oluşan bileşik için kaç OH<sup>−</sup> gerekir?',
      options: ['1', '3', '2'], answer: 2,
      hints: ['OH<sup>−</sup> 1− yüklü; tek tane 2+ yükü dengelemez.', 'OH<sup>−</sup> 1− yüklü; üç tane 3− eder, fazla.', ''],
      right: 'Evet. İki OH<sup>−</sup> 2− eder; 2+ yükü dengeler.',
    });
    await ts.say(1, 2, 1000);
    ts.formul('Ca(OH)_{2}', '1:2');
    await c.say('İki OH<sup>−</sup> gerektiği için parantez kullanılır: Ca(OH)<sub>2</sub>.', { speak: 'İki hidroksit gerektiği için parantez kullanılır: kalsiyum hidroksit, Ca, parantez O H, iki.' });

    // Sor: K+ ve SO4 2-.
    c.clearSay(); ts.formul('', ''); ts.kur(T.K, T.SO4, 1, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'K<sup>+</sup> ve SO<sub>4</sub><sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['KSO<sub>4</sub>', 'K<sub>2</sub>SO<sub>4</sub>', 'K(SO<sub>4</sub>)<sub>2</sub>'], answer: 1,
      hints: ['Bir K<sup>+</sup> 1+, bir SO<sub>4</sub><sup>2−</sup> 2−: yükler tutmaz. SO<sub>4</sub><sup>2−</sup> 2− yüklü; iki K<sup>+</sup> dengeler.', 'SO<sub>4</sub><sup>2−</sup>\'den birden fazla gerekmiyor; iki tane K<sup>+</sup> gerekiyor.', ''],
      right: 'Evet. İki K<sup>+</sup> bir SO<sub>4</sub><sup>2−</sup> iyonunu dengeler; parantez gerekmez.',
    });
    await ts.say(2, 1, 1000);
    ts.formul('K_{2}SO_{4}', '2:1');
    await c.say('İki K<sup>+</sup> ile bir SO<sub>4</sub><sup>2−</sup> dengelenir: formül K<sub>2</sub>SO<sub>4</sub>.', { speak: 'İki potasyum iyonu ile bir sülfat iyonu dengelenir: formül K iki S O dört.' });
    c.note('<b>Formül, yük toplamını sıfır yapan en az sayıda iyonu gösterir.</b> Örnek: CaCl<sub>2</sub>.', 'Formül', 'formul');
  }

  /* ---- 8. Dene: formülü kur ---- */
  async function kur(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg);
    ts.kur(T.Na, T.F, 0, 0);
    const CIFT = [
      { k: 'Na', a: 'F', n: [1, 1], f: 'NaF', sec: ['Na_{2}F', 'NaF', 'Na_{2}F_{2}'], ans: 1, oran: '1:1', neden: '1+ ile 1−; birer iyon yeter.',
        ip: ['İki Na<sup>+</sup> 2+, bir F<sup>−</sup> 1−: yükler tutmaz.', '', 'Yükler eşit ama daha az iyonla da toplam sıfır olur.'] },
      { k: 'Mg', a: 'CO3', n: [1, 1], f: 'MgCO_{3}', sec: ['MgCO_{3}', 'Mg(CO_{3})_{2}', 'Mg_{2}(CO_{3})_{2}'], ans: 0, oran: '1:1', neden: '2+ ile 2−; birer iyon yeter.',
        ip: ['', 'İki CO<sub>3</sub><sup>2−</sup> 4−, bir Mg<sup>2+</sup> 2+: yükler tutmaz.', 'Yükler eşit ama daha az iyonla da toplam sıfır olur.'] },
      { k: 'K', a: 'PO4', n: [3, 1], f: 'K_{3}PO_{4}', sec: ['K(PO_{4})_{3}', 'K_{3}(PO_{4})_{3}', 'K_{3}PO_{4}'], ans: 2, oran: '3:1', neden: 'Üç K⁺ ile bir PO₄³⁻ dengelenir; PO₄ tek olduğu için parantez yok.',
        ip: ['Üç PO<sub>4</sub><sup>3−</sup> 9−, bir K<sup>+</sup> 1+: yükler tutmaz.', 'Yükler eşit ama daha az iyonla da toplam sıfır olur.', ''] },
      { k: 'NH4', a: 'NO3', n: [1, 1], f: 'NH_{4}NO_{3}', sec: ['(NH_{4})_{2}NO_{3}', 'NH_{4}NO_{3}', 'NH_{4}(NO_{3})_{2}'], ans: 1, oran: '1:1', neden: '1+ ile 1−; birer iyon yeter.',
        ip: ['İki NH<sub>4</sub><sup>+</sup> 2+, bir NO<sub>3</sub><sup>−</sup> 1−: yükler tutmaz.', '', 'İki NO<sub>3</sub><sup>−</sup> 2−, bir NH<sub>4</sub><sup>+</sup> 1+: yükler tutmaz.'] },
      { k: 'Al', a: 'SO4', n: [2, 3], f: 'Al_{2}(SO_{4})_{3}', sec: ['Al_{2}(SO_{4})_{3}', 'Al_{3}(SO_{4})_{2}', 'Al(SO_{4})_{3}'], ans: 0, oran: '2:3', neden: 'İki Al³⁺ 6+, üç SO₄²⁻ 6− eder; üç SO₄ parantez içinde.',
        ip: ['', 'Üç Al<sup>3+</sup> 9+, iki SO<sub>4</sub><sup>2−</sup> 4−: yükler tutmaz.', 'Üç SO<sub>4</sub><sup>2−</sup> 6−, bir Al<sup>3+</sup> 3+: yükler tutmaz.'] },
      { k: 'Ca', a: 'N', n: [3, 2], f: 'Ca_{3}N_{2}', sec: ['Ca_{2}N_{3}', 'CaN', 'Ca_{3}N_{2}'], ans: 2, oran: '3:2', neden: 'Üç Ca²⁺ 6+, iki N³⁻ 6− eder.',
        ip: ['İki Ca<sup>2+</sup> 4+, üç N<sup>3−</sup> 9−: yükler tutmaz.', 'Bir Ca<sup>2+</sup> 2+, bir N<sup>3−</sup> 3−: yükler tutmaz.', ''] },
    ];
    await par(c.say('Her çift için kefeleri dengele ve formülü yaz.', { noWait: true }), belir(c, ts.g, 500));
    for (const p of CIFT) {
      ts.formul('', '');
      ts.kur(T[p.k], T[p.a], 1, 1);
      await c.choice({
        tag: 'Dene', q: `${H(T[p.k].etiket)} ve ${H(T[p.a].etiket)} iyonlarından oluşan bileşiğin formülü hangisidir?`,
        options: p.sec.map(H), answer: p.ans, hints: p.ip, right: 'Evet. ' + H(p.neden),
      });
      await ts.say(p.n[0], p.n[1], 1000);
      ts.formul(p.f, p.oran);
      await c.wait(1100);
    }
  }

  Ders.start({
    id: 'cesitlilik-b3', kicker: 'Konu B · İyonik bağ', title: 'İyonlardan formüle', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'İyonlardan formüle',
      hook: 'Bir ambalajın içindekiler listesindeki bileşiğin formülünü, iyonlarını bilerek kendin yazabilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['Tek atomlu katyon ve anyonların yükünü verilen ya da alınan elektron sayısından bulur.', 'Programdaki çok atomlu iyonların simgesini, yükünü ve adını söyler.', 'Katyon ve anyonun yüklerinin toplamı sıfır olacak biçimde iyonik bileşiğin formülünü yazar.'],
    scenes: [
      { title: 'Hatırla', goal: 'İyonik bağı ve alüminyum iyonunu hatırla.', run: hatirla },
      { title: 'Katyonlar: simge, yük, ad', goal: 'Tek atomlu katyonların simgesini, yükünü ve adını öğren.', run: katyonlar },
      { title: 'Anyonlar: simge, yük, ad', goal: 'Tek atomlu anyonların simgesini, yükünü ve adını öğren.', run: anyonlar },
      { title: 'Çok atomlu iyonlar', goal: 'Çok atomlu iyonların simgesini ve adını öğren.', run: cokAtomlu },
      { title: 'Yükler toplamı sıfırdır', goal: 'Yük terazisiyle formülü kur.', run: toplamSifir },
      { title: 'Yükler tutmuyorsa', goal: 'Yükler eşit değilse iyon sayısını ayarla.', run: tutmuyor },
      { title: 'Çok atomlu iyonlarla formül', goal: 'Çok atomlu iyon birden fazlaysa parantez kullan.', run: cokAtomluFormul },
      { title: 'Dene: formülü kur', goal: 'Altı iyon çifti için formülü kur.', run: kur },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ca<sup>2+</sup> ve Br<sup>−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['CaBr', 'CaBr<sub>2</sub>', 'Ca<sub>2</sub>Br'], answer: 1,
        why: ['Bir Br<sup>−</sup> 1−, Ca<sup>2+</sup> 2+ yükünü dengelemez.', 'Bir Ca<sup>2+</sup> 2+ eder; iki Br<sup>−</sup> 2− ile dengelenir.', 'İki Ca<sup>2+</sup> 4+ eder; bir Br<sup>−</sup> bunu dengelemez.'], scene: 4 },
      { q: 'Al<sup>3+</sup> ve Cl<sup>−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['Al<sub>3</sub>Cl', 'AlCl', 'AlCl<sub>3</sub>'], answer: 2,
        why: ['Üç Al<sup>3+</sup> 9+ eder; bir Cl<sup>−</sup> bunu dengelemez.', 'Bir Cl<sup>−</sup> 1−, Al<sup>3+</sup> 3+ yükünü dengelemez.', 'Bir Al<sup>3+</sup> 3+ eder; üç Cl<sup>−</sup> 3− ile dengelenir.'], scene: 5 },
      { q: 'Mg<sup>2+</sup> ve O<sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['MgO', 'MgO<sub>2</sub>', 'Mg<sub>2</sub>O<sub>2</sub>'], answer: 0,
        why: ['Yükler eşit büyüklükte: 2+ ve 2−; birer iyon yeter.', 'Alt indis iyonun yükü değil, iyon sayısıdır; iki O<sup>2−</sup> 4− eder.', 'Yükler eşit ama daha az iyonla da toplam sıfır olur; formül en küçük oranı gösterir.'], scene: 4 },
      { q: 'Ca<sup>2+</sup> ve NO<sub>3</sub><sup>−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['CaNO<sub>3</sub>', 'Ca(NO<sub>3</sub>)<sub>2</sub>', 'Ca<sub>2</sub>NO<sub>3</sub>'], answer: 1,
        why: ['Bir NO<sub>3</sub><sup>−</sup> 1−, Ca<sup>2+</sup> 2+ yükünü dengelemez.', 'İki NO<sub>3</sub><sup>−</sup> 2− eder; birden fazla olduğu için parantez içine alınır.', 'İki Ca<sup>2+</sup> 4+ eder; bir NO<sub>3</sub><sup>−</sup> bunu dengelemez.'], scene: 6 },
      { q: 'Bir bileşiğin formülü Na<sub>3</sub>PO<sub>4</sub>\'tür. Bileşikte Na<sup>+</sup> ile PO<sub>4</sub><sup>3−</sup> hangi oranda bulunur?',
        options: ['1:3', '1:1', '3:1'], answer: 2,
        why: ['Oran ters yazılmış: sodyumun alt indisi 3\'tür.', 'Alt indisler farklı; iyon sayıları eşit değil.', 'Alt indis iyon sayısıdır: üç Na<sup>+</sup>, bir PO<sub>4</sub><sup>3−</sup>.'], scene: 4 },
    ],
    summary: ['Katyonun yükü verilen, anyonun yükü alınan elektron sayısıdır.', 'Formül, toplam yükü sıfır yapan en az sayıda iyonu gösterir.', 'Çok atomlu iyon birden fazlaysa parantez içine alınır.', '<b>Formülde artı yüklerle eksi yükler birbirini dengeler.</b>'],
    nextLesson: { href: 'b4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
