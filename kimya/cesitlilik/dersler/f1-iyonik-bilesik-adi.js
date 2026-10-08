/* F1 — İyonik bileşiğin adı: katyonun adı, anyonun adı
   Tek katyonlu metallerin iyonik bileşiklerinde ad, katyonun adı ve ardından anyonun adıdır; formüldeki sayılar ada girmez.
   Çok atomlu iyon içeren bileşik de aynı kuralla adlandırılır. Senaryo: plan/kimya/cesitlilik/senaryolar/F-bilesiklerin-adlandirilmasi.md (F1).
   Araçlar dersler/f-araclar.js içindedir. Ad seçmeli sahneler kart başına c.choice ile kurulur (sürükleme yok). Seslendirme yok. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, isaret } = window.KIT;
  const { H, oku, yaz, ION: T, iyon, terazi, iyonSerit, adKutulari, indisSoldur, ionListesi, kartTasi, adSec } = window.KIT_F;
  const A = RENK.arti, B = RENK.eksi;

  const sil = async (c, ...gs) => { await belir(c, gs.flat(), 300, 0); gs.flat().forEach((g) => g.remove()); };
  /* Bir ad iki sözcük: ilk sözcük katyon (turuncu), ikincisi anyon (mavi). Başta ikisi de düz renkte. */
  function adYaz(c, p, x, y, k, a, size, hiza = 'start') {
    const g = c.S('g', {}, p);
    const t1 = yazi(c, g, x, y, k, { hiza: 'start', size, kalin: 600 }), t2 = yazi(c, g, x, y, a, { hiza: 'start', size, kalin: 600 });
    const w1 = t1.getComputedTextLength(), w2 = t2.getComputedTextLength(), bosluk = size * 0.3, toplam = w1 + bosluk + w2;
    const x0 = hiza === 'middle' ? x - toplam / 2 : x;
    t1.setAttribute('x', x0); t2.setAttribute('x', x0 + w1 + bosluk);
    return { g, t1, t2, boya() { t1.style.fill = A; t2.style.fill = B; } };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const a = c.S('g', {}, svg);
    iyon(c, a, 340, 260, 'arti', 'Li^{+}', { r: 56, size: 36 }); iyon(c, a, 660, 260, 'eksi', 'S^{2−}', { r: 66, size: 36 });
    const b = c.S('g', {}, svg), C = [440, 260];
    const gri = c.S('circle', { cx: C[0], cy: C[1], r: 70, fill: '#d5daea' }, b), mavi = c.S('circle', { cx: C[0], cy: C[1], r: 70, fill: B }, b);
    const l1 = yazi(c, b, C[0], C[1] + 14, 'Cl', { size: 42, kalin: 700, renk: window.KIT_F.KOYU, math: true });
    const l2 = yazi(c, b, C[0], C[1] + 14, 'Cl^{−}', { size: 42, kalin: 700, renk: window.KIT_F.KOYU, math: true });
    mavi.style.opacity = 0; l2.style.opacity = 0;
    const e = window.KIT.yuk(c, b, [760, 150], 'eksi', 17);
    gizle(a, b);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Li<sup>+</sup> ve S<sup>2−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
      options: ['LiS', 'Li<sub>2</sub>S', 'LiS<sub>2</sub>'], answer: 1,
      hints: ['Toplam yük sıfır olmalı; iki Li<sup>+</sup>, bir S<sup>2−</sup> ile dengelenir.', '', 'Toplam yük sıfır olmalı; iki Li<sup>+</sup>, bir S<sup>2−</sup> ile dengelenir.'],
      right: 'Evet. İki Li<sup>+</sup> 2+, bir S<sup>2−</sup> 2− eder.',
    });
    await c.say('İki Li<sup>+</sup> ile bir S<sup>2−</sup> toplam yükü sıfır yapar.', { speak: 'İki lityum iyonu ile bir sülfür iyonu toplam yükü sıfır yapar.' });
    c.clearSay();
    await par(belir(c, a, 400, 0), belir(c, b, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Elektron alan ametal atomu hangi iyona dönüşür?',
      options: ['Katyona', 'Anyona', 'Elektron denizine'], answer: 1,
      hints: ['Elektron alan atom eksi yüklenir; eksi yüklü iyona anyon denir.', '', 'Elektron alan atom eksi yüklenir; eksi yüklü iyona anyon denir.'],
      right: 'Evet. Elektron alan atom eksi yüklenir; eksi yüklü iyona anyon denir.',
    });
    await par(c.say('Elektron alan atom eksi yüklü iyona, anyona dönüşür.'), c.tween(1000, (k) => { e.tasi([760 - 250 * k, 150 + 90 * k]); mavi.style.opacity = k > 0.9 ? 1 : 0; l1.style.opacity = k > 0.9 ? 0 : 1; l2.style.opacity = k > 0.9 ? 1 : 0; }));
    e.g.style.opacity = 0;
    await c.say('Bugün bu bileşiklerin adlarını nasıl kurduğumuza bakacağız.', { speak: '[curious] Bugün bu bileşiklerin adlarını nasıl kurduğumuza bakacağız.' });
  }

  /* ---- 2. Formülden iyonlara ---- */
  async function formuldenIyonlara(c) {
    const svg = c.svg(1000, 562);
    const L = ionListesi(c, svg, 22, 62, [['Na^{+}', 'sodyum', 'arti'], ['Mg^{2+}', 'magnezyum', 'arti'], ['Al^{3+}', 'alüminyum', 'arti'], ['Cl^{−}', 'klorür', 'eksi'], ['Br^{−}', 'bromür', 'eksi'], ['S^{2−}', 'sülfür', 'eksi']], { ayrac: 86 });
    gizle(L.g);
    const vurgu = (...ix) => L.satir.forEach((s, i) => { s.style.opacity = ix.length === 0 || ix.includes(i) ? 1 : 0.4; });
    const toplamYaz = (parcalar) => { const t = yaz(c, svg, 620, 490, parcalar, { size: 32, kalin: 700 }); t.style.opacity = 0; return t; };
    const ortak = { x: 620, y: 140, size: 76, kx: 480, ax: 760, iy: 360 };

    await par(c.say('Bir iyonik bileşiğin formülü, içindeki iyonları saklar.'), belir(c, L.g, 500));
    // NaCl
    const s1 = iyonSerit(c, svg, Object.assign({ parcalar: [['Na', A], ['Cl', B]], K: { etiket: 'Na^{+}', n: 1, kaynak: [0, 1] }, A: { etiket: 'Cl^{−}', n: 1, kaynak: [2, 3] } }, ortak));
    gizle(s1.g, s1.grup);
    await par(c.say('Formülde önce katyon, sonra anyon yazılır.'), belir(c, s1.g, 500));
    await par(c.say('NaCl\'de ilk simge katyonu, ikinci simge anyonu gösterir.', { speak: `${oku('NaCl')}'de ilk simge katyonu, ikinci simge anyonu gösterir.` }), belir(c, s1.grup, 600));
    vurgu(0, 3);
    await c.say('Yükleri iyon listesinden okuruz: Na<sup>+</sup> ve Cl<sup>−</sup>.', { speak: 'Yükleri iyon listesinden okuruz: sodyum iyonu ve klorür iyonu.' });
    vurgu();
    c.clearSay();
    // Na2S
    await sil(c, s1.g);
    const s2 = iyonSerit(c, svg, Object.assign({ parcalar: [['Na', A], ['_{2}', A], ['S', B]], K: { etiket: 'Na^{+}', n: 2, kaynak: [2, 2] }, A: { etiket: 'S^{2−}', n: 1, kaynak: [3, 3] } }, ortak));
    gizle(s2.g, s2.grup);
    const top2 = toplamYaz([['2+', A], ' ve ', ['2−', B], ' → toplam 0']);
    await par(c.say('Na<sub>2</sub>S\'de de ilk simge katyon, ikincisi anyondur.', { speak: `${oku('Na_{2}S')}'de de ilk simge katyon, ikincisi anyondur.` }), belir(c, s2.g, 500));
    vurgu(0, 5);
    await par(c.say('Listeye göre iyonlar Na<sup>+</sup> ve S<sup>2−</sup>\'dir.', { speak: 'Listeye göre iyonlar sodyum bir artı ve sülfür iki eksidir.' }), belir(c, s2.grup, 600));
    vurgu();
    await par(c.say('Alt indis 2, iki Na<sup>+</sup> iyonu olduğunu söyler.', { speak: 'Alt indis iki, iki sodyum iyonu olduğunu söyler.' }), (async () => {
      s2.cizgiler.forEach((l, i) => { l.style.stroke = i < 2 ? RENK.vurgu : RENK.cizgi; });
      await c.wait(600);
    })());
    await par(c.say('İki Na<sup>+</sup> toplam 2+, bir S<sup>2−</sup> 2− eder.', { speak: 'İki sodyum iyonu toplam iki artı, bir sülfür iyonu iki eksi eder.' }), belir(c, top2, 500));
    await c.say('Toplam yük sıfır: iyonlar doğru bulundu.');

    // Birlikte çöz: MgBr2
    c.clearSay();
    await sil(c, s2.g, top2); await belir(c, L.g, 300, 0);
    const ts = terazi(c, svg);
    ts.kur(T.Mg, T.Br, 1, 0); ts.formul('MgBr_{2}', '');
    const ek = yaz(c, svg, 500, 525, ['Katyon: Mg^{2+} · Br sayısı: 2 · Anyon: ?'], { size: 24, kalin: 600, renk: RENK.soluk });
    gizle(ts.g, ts.fg, ek);
    await belir(c, [ts.g, ts.fg, ek], 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'MgBr<sub>2</sub> bileşiğindeki anyon hangisidir?',
      options: ['Br<sup>2−</sup>', 'Br<sup>−</sup>', 'Br<sup>2+</sup>'], answer: 1,
      hints: ['Mg<sup>2+</sup>\'nın 2+ yükünü iki Br<sup>−</sup> dengeler. Br<sup>2−</sup> diye bir anyon yok; alt indis sayıdır.', '', 'Anyon eksi yüklüdür.'],
      right: 'Evet. İki Br<sup>−</sup>, Mg<sup>2+</sup>\'nın 2+ yükünü dengeler.',
    });
    await par(c.say('MgBr<sub>2</sub>\'de bir Mg<sup>2+</sup> ile iki Br<sup>−</sup> iyonu vardır.', { speak: `${oku('MgBr_{2}')}'de bir magnezyum iyonu ile iki bromür iyonu vardır.` }), ts.say(1, 2, 1000));
    c.clearSay();
    await sil(c, ts.g, ts.fg, ek);

    // Sıra sende: Al2S3
    await c.choice({
      tag: 'Sıra sende', q: 'Al<sub>2</sub>S<sub>3</sub> bileşiğini oluşturan iyonlar hangileridir?',
      options: ['Al<sup>3+</sup> ve S<sup>2−</sup>', 'Al<sup>2+</sup> ve S<sup>3−</sup>', 'Al<sup>3+</sup> ve S<sup>3−</sup>'], answer: 0,
      hints: ['', 'Alt indis iyon sayısını verir, yükü değil.', 'İki Al<sup>3+</sup> 6+, üç S<sup>2−</sup> 6− eder; S iyonu 2− yüklüdür.'],
      right: 'Evet. İki Al<sup>3+</sup> 6+, üç S<sup>2−</sup> 6− eder.',
    });
    // Gör
    const s3 = iyonSerit(c, svg, Object.assign({ parcalar: [['Al', A], ['_{2}', A], ['S', B], ['_{3}', B]], K: { etiket: 'Al^{3+}', n: 2, kaynak: [2, 2] }, A: { etiket: 'S^{2−}', n: 3, kaynak: [4, 4] } }, ortak));
    const top3 = toplamYaz([['6+', A], ' ve ', ['6−', B], ' → toplam 0']);
    gizle(s3.g, s3.grup, top3);
    await par(c.say('Al<sub>2</sub>S<sub>3</sub>\'te iki Al<sup>3+</sup> ile üç S<sup>2−</sup> var.', { speak: `${oku('Al_{2}S_{3}')}'te iki alüminyum iyonu ile üç sülfür iyonu var.` }), (async () => {
      await par(belir(c, s3.g, 500), belir(c, L.g, 400, 1));
      await belir(c, s3.grup, 600);
      await belir(c, top3, 500);
      vurgu(2, 5);
    })());
    await c.say('İndisler iyonların sayısını söyler; yükleri listeden alırız.');
  }

  /* ---- 3. İyonların adı, bileşiğin adı ---- */
  async function adlar(c) {
    const svg = c.svg(1000, 562);
    const L = ionListesi(c, svg, 760, 80, [['Na^{+}', 'sodyum', 'arti'], ['K^{+}', 'potasyum', 'arti'], ['Al^{3+}', 'alüminyum', 'arti'], ['Cl^{−}', 'klorür', 'eksi'], ['S^{2−}', 'sülfür', 'eksi'], ['F^{−}', 'florür', 'eksi'], ['O^{2−}', 'oksit', 'eksi']], { ayrac: 78 });
    gizle(L.g);
    const vurgu = (...ix) => L.satir.forEach((s, i) => { s.style.opacity = ix.length === 0 || ix.includes(i) ? 1 : 0.35; });
    const SAT = [['NaCl', 'sodyum', 'klorür'], ['Na_{2}S', 'sodyum', 'sülfür'], ['Al_{2}S_{3}', 'alüminyum', 'sülfür'], ['MgCl_{2}', 'magnezyum', 'klorür']];
    const satir = SAT.map(([f, k, a], i) => {
      const g = c.S('g', {}, svg), y = 120 + i * 92;
      yaz(c, g, 160, y + 14, [f], { size: 46, kalin: 700 });
      const ad = adYaz(c, g, 300, y + 12, k, a, 38);
      g.style.opacity = 0;
      return { g, ad };
    });
    // Üç satır, iyon listesiyle birlikte: dördüncü satır liste kalkınca gelir.
    await c.say('İyonik bileşiklerin formülü ve adı yan yana.', { noWait: true });
    for (let i = 0; i < 3; i++) await belir(c, satir[i].g, 450);
    await c.wait(500);
    await belir(c, L.g, 500);
    satir.slice(0, 3).forEach((s) => s.ad.t1.setAttribute('style', s.ad.t1.getAttribute('style') + ';fill:' + A));
    await c.say('Adın ilk sözcüğü, katyonun adıdır.'); vurgu(0, 2);
    await c.say('Katyonun adı, metalin adıyla aynıdır.'); vurgu();
    satir.slice(0, 3).forEach((s) => { s.ad.t2.style.fill = B; });
    await c.say('İkinci sözcük, anyonun adıdır.'); vurgu(3, 4, 5, 6);
    await c.say('Tek atomlu anyonların adı çoğunlukla “-ür” ile biter.'); vurgu(3, 4, 5);
    await c.say('Oksijenin anyonu oksit adını alır.'); vurgu(6);
    await c.say('Al<sub>2</sub>S<sub>3</sub>\'te üç sülfür var, ama ad “alüminyum sülfür”.', { speak: `${oku('Al_{2}S_{3}')}'te üç sülfür var, ama ad alüminyum sülfür.` });
    // Dördüncü satır: liste kalkar.
    await belir(c, L.g, 300, 0);
    satir[3].ad.t1.style.fill = A; satir[3].ad.t2.style.fill = B;
    await par(c.say('MgCl<sub>2</sub>\'de iki klorür var; ad yine “magnezyum klorür”.', { speak: `${oku('MgCl_{2}')}'de iki klorür var; ad yine magnezyum klorür.` }), belir(c, satir[3].g, 500));
    await c.say('Adlarda atom sayısı yazılmaz.');

    // Birlikte çöz: KF
    c.clearSay();
    await sil(c, satir.map((s) => s.g));
    vurgu();
    const kf = c.S('g', {}, svg);
    yaz(c, kf, 400, 190, ['KF'], { size: 84, kalin: 700 });
    const soru = adYaz(c, kf, 400, 300, 'potasyum', '?', 40, 'middle'); soru.boya();
    const ad0 = yazi(c, kf, 250, 300, 'Ad:', { size: 36, kalin: 600, renk: RENK.soluk });
    gizle(kf);
    await par(belir(c, kf, 500), belir(c, L.g, 500));
    vurgu(1, 5);
    await c.choice({
      tag: 'Birlikte çöz', q: 'KF bileşiğinin adındaki ikinci sözcük hangisidir?',
      options: ['flor', 'iyodür', 'florür'], answer: 2,
      hints: ['İkinci sözcük anyonun adıdır. Anyon F<sup>−</sup> iyonudur; adı listede yazılı.', 'Bu bileşikte iyodür yok; anyon F<sup>−</sup> iyonudur.', ''],
      right: 'Evet. F<sup>−</sup> iyonunun adı florür.',
    });
    soru.t2.textContent = 'florür';
    await c.say('KF\'nin adı potasyum florürdür.', { speak: 'Ka fe\'nin adı potasyum florürdür.' });
    vurgu();
    c.clearSay();
    await sil(c, kf); await belir(c, L.g, 300, 0);

    // Sıra sende: CaI2
    await c.choice({
      tag: 'Sıra sende', q: 'CaI<sub>2</sub> bileşiğinin adı hangisidir?',
      options: ['Kalsiyum iki iyodür', 'İyodür kalsiyum', 'Kalsiyum iyodür'], answer: 2,
      hints: ['Adlarda sayı yoktu. İki iyodür vardır ama ad yalnız “iyodür” der.', 'Önce katyonun adı, sonra anyonun adı yazılır.', ''],
      right: 'Evet. Önce katyonun adı, sonra anyonun adı; sayı yazılmaz.',
    });
    // Gör
    const s = iyonSerit(c, svg, { x: 500, y: 100, size: 76, kx: 380, ax: 640, iy: 290, parcalar: [['Ca', A], ['I', B], ['_{2}', B]], K: { etiket: 'Ca^{2+}', n: 1, kaynak: [0, 1] }, A: { etiket: 'I^{−}', n: 2, kaynak: [3, 3] } });
    const ak = adKutulari(c, svg, 450, 'kalsiyum', 'iyodür');
    gizle(s.g, ak.g);
    await par(c.say('CaI<sub>2</sub>\'de bir Ca<sup>2+</sup>, iki I<sup>−</sup> var; ad “kalsiyum iyodür”.', { speak: `${oku('CaI_{2}')}'de bir kalsiyum iyonu, iki iyodür iyonu var; ad kalsiyum iyodür.` }), (async () => { await belir(c, s.g, 600); await belir(c, ak.g, 600); })());
    await par(c.say('Sayılar formülde kalır; ad yalnız iyonların adlarından kurulur.'), (async () => { await indisSoldur(c, s.t, 900, 0.3); })());
    c.note('<b>Önce katyonun adı, sonra anyonun adı; sayılar yazılmaz.</b><br>Örnek: Na<sub>2</sub>S: sodyum sülfür.', 'İyonik bileşiğin adı', 'f1-iyonik-ad');
  }

  /* ---- 4. Çok atomlu iyon içeren bileşikler ---- */
  async function cokAtomlu(c) {
    const svg = c.svg(1000, 562);
    const SAT = [
      { f: [['Ca', A], ['CO_{3}', B]], k: ['Ca^{2+}', 'CO_{3}^{2−}'], ad: ['kalsiyum', 'karbonat'] },
      { f: [['Mg', A], ['(NO_{3})_{2}', B]], k: ['Mg^{2+}', 'NO_{3}^{−}'], ad: ['magnezyum', 'nitrat'] },
      { f: [['(NH_{4})_{2}', A], ['SO_{4}', B]], k: ['NH_{4}^{+}', 'SO_{4}^{2−}'], ad: ['amonyum', 'sülfat'] },
      { f: [['K_{3}', A], ['PO_{4}', B]], k: ['K^{+}', 'PO_{4}^{3−}'], ad: ['potasyum', 'fosfat'] },
    ];
    const X = { f: 150, k: 350, a: 560, ad: 790 }, Y = (i) => 120 + i * 110;
    const satir = SAT.map((s, i) => {
      const g = c.S('g', {}, svg), y = Y(i);
      const f = yaz(c, g, X.f, y + 14, s.f, { size: 40, kalin: 700 });
      const ka = c.S('g', {}, g), an = c.S('g', {}, g), ad = c.S('g', {}, g);
      iyon(c, ka, X.k, y, 'arti', s.k[0], { kutu: s.k[0].startsWith('NH'), w: 110, h: 50, r: 32, size: 22 });
      iyon(c, an, X.a, y, 'eksi', s.k[1], { kutu: true, w: 130, h: 50, size: 22 });
      const adt = adYaz(c, ad, X.ad, y + 10, s.ad[0], s.ad[1], 30, 'middle'); adt.boya();
      gizle(g, ka, an, ad);
      return { g, f, ka, an, ad, adt };
    });
    const goster = (i) => belir(c, satir[i].g, 450);

    await par(c.say('Çok atomlu iyonlar da aynı kurala uyar.'), goster(0));
    await par(c.say('CaCO<sub>3</sub>\'te Ca<sup>2+</sup> ve CO<sub>3</sub><sup>2−</sup> vardır.', { speak: `${oku('CaCO_{3}')}'te kalsiyum iki artı ve karbonat iki eksi iyonları vardır.` }), belir(c, [satir[0].ka, satir[0].an], 500));
    await c.say('Karbonat tek parçalı bir anyondur; adı da tek sözcüktür.');
    await par(c.say('Ad yine katyon, sonra anyondur: kalsiyum karbonat.'), belir(c, satir[0].ad, 500));

    // Birlikte çöz: Mg(NO3)2
    c.clearSay();
    await goster(1);
    await belir(c, satir[1].ka, 400);
    const soru = yazi(c, svg, X.a, Y(1) + 10, '?', { size: 40, kalin: 700, renk: RENK.vurgu });
    await c.choice({
      tag: 'Birlikte çöz', q: 'NO<sub>3</sub><sup>−</sup> iyonunun adı nedir?',
      options: ['Nitrür', 'Nitrat', 'Azot'], answer: 1,
      hints: ['Nitrür tek atomlu N<sup>3−</sup> iyonunun adıdır. Çok atomlu iyonun adı tek sözcüktür.', '', 'Çok atomlu iyonun adı tek sözcüktür; “azot” elementin adıdır.'],
      right: 'Evet. NO<sub>3</sub><sup>−</sup> iyonunun adı nitrat.',
    });
    soru.remove();
    await belir(c, satir[1].an, 400);
    await par(c.say('Mg(NO<sub>3</sub>)<sub>2</sub>\'de iki nitrat var; ad “magnezyum nitrat”.', { speak: `${oku('Mg(NO_{3})_{2}')}'de iki nitrat var; ad magnezyum nitrat.` }), belir(c, satir[1].ad, 500));
    await par(c.say('Parantez ve dış indis ada girmez.'), indisSoldur(c, satir[1].f, 900, 0.2));
    await goster(2);
    await par(c.say('(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>\'ta katyon da çok atomludur: amonyum.', { speak: `${oku('(NH_{4})_{2}SO_{4}')}'ta katyon da çok atomludur: amonyum.` }), belir(c, [satir[2].ka, satir[2].an], 500));
    await par(c.say('Ad: amonyum sülfat.'), belir(c, satir[2].ad, 500));

    // Sıra sende: K3PO4
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'K<sub>3</sub>PO<sub>4</sub> bileşiğinin adı hangisidir?',
      options: ['Potasyum üç fosfat', 'Fosfat potasyum', 'Potasyum fosfat'], answer: 2,
      hints: ['İndis ada girmez. Fosfat tek parçalı bir anyondur.', 'Önce katyonun adı yazılır. Fosfat tek parçalı bir anyondur.', ''],
      right: 'Evet. Fosfat tek parçalı bir anyondur; indis ada girmez.',
    });
    await par(c.say('K<sub>3</sub>PO<sub>4</sub>: üç K<sup>+</sup> ve bir PO<sub>4</sub><sup>3−</sup>; ad potasyum fosfat.', { speak: `${oku('K_{3}PO_{4}')}: üç potasyum iyonu ve bir fosfat iyonu; ad potasyum fosfat.` }), (async () => {
      await goster(3);
      await belir(c, [satir[3].ka, satir[3].an], 500);
      await belir(c, satir[3].ad, 500);
    })());
  }

  /* ---- 5. Sekiz formülü adlandır ---- */
  async function sekiz(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { f: 'NaF', sec: ['sodyum florür', 'sodyum flor', 'florür sodyum'], neden: 'Katyon sodyum, anyon florür.', ipucu: 'Önce iyonları ayır.' },
      { f: 'CaBr_{2}', sec: ['kalsiyum bromür', 'kalsiyum iki bromür', 'bromür kalsiyum'], neden: 'Adda sayı yazılmaz.', ipucu: 'Önce iyonları ayır.' },
      { f: 'Al_{2}O_{3}', sec: ['alüminyum oksit', 'alüminyum oksijen', 'oksit alüminyum'], neden: 'Oksijenin anyonu oksit.', ipucu: 'Önce iyonları ayır.' },
      { f: 'Mg_{3}N_{2}', sec: ['magnezyum nitrür', 'magnezyum azot', 'nitrür magnezyum'], neden: 'N<sup>3−</sup> nitrürdür.', ipucu: 'Önce iyonları ayır.' },
      { f: 'MgH_{2}', sec: ['magnezyum hidrür', 'magnezyum hidrojen', 'hidrür magnezyum'], neden: 'Metalle bileşikte hidrojen H<sup>−</sup> iyonudur: hidrür.', ipucu: 'Hidrojen metalle yaptığı bileşikte 1− yüklüdür.' },
      { f: 'Ca(OH)_{2}', sec: ['kalsiyum hidroksit', 'kalsiyum iki hidroksit', 'hidroksit kalsiyum'], neden: 'Parantez ve indis ada girmez.', ipucu: 'Önce iyonları ayır.' },
      { f: 'NH_{4}Br', sec: ['amonyum bromür', 'amonyum brom', 'bromür amonyum'], neden: 'Katyon amonyum, anyon bromür.', ipucu: 'Önce iyonları ayır.' },
      { f: 'Al_{2}(SO_{4})_{3}', sec: ['alüminyum sülfat', 'alüminyum üç sülfat', 'sülfat alüminyum'], neden: 'Üç sülfat var ama ad yalnız “sülfat”.', ipucu: 'Önce iyonları ayır.' },
    ];
    const yer = (i) => { const col = Math.floor(i / 4), row = i % 4, x0 = 30 + col * 490; return { fx: x0 + 110, ax: x0 + 215, y: 80 + row * 78 }; };
    let kart = null;
    await c.say('Sekiz formülü, kuralı uygulayarak adlandıralım.');
    await adSec(c, {
      tag: 'Dene', kartlar: KART, yanlis: 'Önce katyonun adı, sonra anyonun adı; sayı yazılmaz.',
      soru: (k) => `${H(k.f)} bileşiğinin adı hangisidir?`,
      once: async (i, k) => { c.clearSay(); kart = yaz(c, svg, 500, 470, [k.f], { size: 76, kalin: 700 }); kart.style.opacity = 0; await belir(c, kart, 350); },
      sonra: async (i, k) => {
        const p = yer(i);
        await kartTasi(c, kart, p.fx, p.y + 10, 34, 650);
        const [k1, k2] = k.sec[0].split(' ');
        const ad = adYaz(c, svg, p.ax, p.y + 8, k1, k2, 28); ad.boya(); ad.g.style.opacity = 0;
        await par(c.say(`${H(k.f)}: ${k.sec[0]}.`, { speak: `${oku(k.f.replace(/[()]/g, ''))}: ${k.sec[0]}.` }), belir(c, ad.g, 350));
      },
    });
    await c.say('Sekiz bileşik de aynı kuralla adlandırıldı.');
  }

  /* ---- 6. Addan formüle ---- */
  async function addanFormule(c) {
    const svg = c.svg(1000, 562);
    const ts = terazi(c, svg, { y: 160 });
    gizle(ts.g, ts.fg);
    const adlar = (k, a) => { const ak = adKutulari(c, svg, 56, k, a, { size: 30, h: 56 }); ak.g.style.opacity = 0; return ak; };
    let ak = adlar('magnezyum', 'nitrür');
    await par(c.say('Adı okuyarak formülü de yazabiliriz.'), belir(c, ak.g, 500));
    await c.say('Önce ad iki sözcüğe bölünür: katyon, anyon.');
    ts.kur(T.Mg, T.N, 1, 1);
    await par(c.say('“Magnezyum nitrür” Mg<sup>2+</sup> ve N<sup>3−</sup> iyonlarını verir.', { speak: 'Magnezyum nitrür, magnezyum iki artı ve nitrür üç eksi iyonlarını verir.' }), belir(c, ts.g, 500));
    await par(c.say('Üç Mg<sup>2+</sup> toplam 6+, iki N<sup>3−</sup> 6− eder.', { speak: 'Üç magnezyum iyonu toplam altı artı, iki nitrür iyonu altı eksi eder.' }), ts.say(3, 2, 1200));
    await par(c.say('Toplam yük sıfır: formül Mg<sub>3</sub>N<sub>2</sub>.', { speak: 'Toplam yük sıfır: formül me ge üç en iki.' }), (async () => { ts.fg.style.opacity = 1; ts.formul('Mg_{3}N_{2}', '3:2'); })());

    // Birlikte çöz: kalsiyum fosfat
    c.clearSay();
    await sil(c, ak.g); ts.formul('', ''); ak = adlar('kalsiyum', 'fosfat'); ts.kur(T.Ca, T.PO4, 3, 0);
    const ek = yaz(c, svg, 500, 520, ['üç Ca^{2+} = 6+ · ? PO_{4}^{3−} = 6−'], { size: 22, kalin: 600, renk: RENK.soluk });
    ek.style.opacity = 0;
    await par(belir(c, ak.g, 400), belir(c, ek, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kaç PO<sub>4</sub><sup>3−</sup> iyonu gerekir?',
      options: ['3', '6', '2'], answer: 2,
      hints: ['PO<sub>4</sub><sup>3−</sup> 3− yüklü; üç tane 9− eder, fazla. 6− için kaç tane gerekir?', 'Altı tane 18− eder, fazla. Altı artı yükü altı eksi yük dengeler.', ''],
      right: 'Evet. İki PO<sub>4</sub><sup>3−</sup> 6− eder; üç Ca<sup>2+</sup> ile dengelenir.',
    });
    await ts.say(3, 2, 1000);
    ts.fg.style.opacity = 1; ts.formul('Ca_{3}(PO_{4})_{2}', '3:2');
    await c.say('İki PO<sub>4</sub><sup>3−</sup> parantez içine alınır: Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>.', { speak: `İki fosfat iyonu parantez içine alınır: ${oku('Ca_{3}(PO_{4})_{2}')}.` });

    // Sıra sende: sodyum sülfat
    c.clearSay();
    await sil(c, ak.g, ek); ts.formul('', ''); ts.kur(T.Na, T.SO4, 1, 1); ts.fg.style.opacity = 0;
    ak = adlar('sodyum', 'sülfat'); await belir(c, ak.g, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Sodyum sülfat bileşiğinin formülü hangisidir?',
      options: ['NaSO<sub>4</sub>', 'Na(SO<sub>4</sub>)<sub>2</sub>', 'Na<sub>2</sub>SO<sub>4</sub>'], answer: 2,
      hints: ['Sodyum Na<sup>+</sup>, sülfat SO<sub>4</sub><sup>2−</sup> iyonudur. Bir Na<sup>+</sup> 1+, bir SO<sub>4</sub><sup>2−</sup> 2− eder: yükler tutmaz.', 'SO<sub>4</sub><sup>2−</sup>\'den bir tane yeter; iki Na<sup>+</sup> dengeler.', ''],
      right: 'Evet. İki Na<sup>+</sup>, bir SO<sub>4</sub><sup>2−</sup> yükünü dengeler.',
    });
    await par(c.say('İki Na<sup>+</sup>, bir SO<sub>4</sub><sup>2−</sup> yükünü dengeler: Na<sub>2</sub>SO<sub>4</sub>.', { speak: `İki sodyum iyonu, bir sülfat iyonunun yükünü dengeler: ${oku('Na_{2}SO_{4}')}.` }), (async () => { await ts.say(2, 1, 1000); ts.fg.style.opacity = 1; ts.formul('Na_{2}SO_{4}', '2:1'); })());
  }

  /* ---- 7. Doğru kural hangisi? ---- */
  async function dogruKural(c) {
    const svg = c.svg(1000, 562);
    const SOZ = [
      { ad: 'A', satir: ['Adlandırırken önce', 'anyonun adı yazılır.'], dogru: false, geri: 'Önce katyonun adı yazılır.' },
      { ad: 'B', satir: ['Adlar, katyonun ve anyonun', 'adlarından kurulur.'], dogru: true, geri: 'Kuralın kendisi.' },
      { ad: 'C', satir: ['Formüldeki alt indisler', 'ada yazılır.'], dogru: false, geri: 'Sayılar formülde kalır; adda yer almaz.' },
      { ad: 'D', satir: ['Çok atomlu iyon içeren bileşik', 'de aynı kuralla adlandırılır.'], dogru: true, geri: 'Karbonat, nitrat gibi çok atomlu iyonlar tek sözcüklük anyon adıdır.' },
    ];
    const bal = SOZ.map((s, i) => {
      const g = c.S('g', {}, svg), y = 40 + i * 125;
      c.S('circle', { cx: 80, cy: y + 52, r: 34, fill: RENK.kenarlik }, g);
      yazi(c, g, 80, y + 64, s.ad, { size: 34, kalin: 700 });
      kutu(c, g, 140, y, 760, 104, { rx: 18 });
      yazi(c, g, 170, y + 44, s.satir[0], { hiza: 'start', size: 30, kalin: 600 });
      yazi(c, g, 170, y + 84, s.satir[1], { hiza: 'start', size: 30, kalin: 600 });
      const im = isaret(c, g, 950, y + 52, s.dogru ? 'ok' : 'no', 24); im.style.opacity = 0;
      const govde = c.S('g', {}); [...g.children].filter((e) => e !== im).forEach((e) => govde.appendChild(e)); g.appendChild(govde);
      g.style.opacity = 0;
      return { g, govde, im };
    });
    await par(c.say('Dört öğrenci adlandırma kuralını anlatıyor.'), belir(c, bal[0].g, 500));
    await c.say('Hangisi doğru söylüyor, bakalım.');
    for (let i = 0; i < 4; i++) {
      const s = SOZ[i];
      if (i > 0) await belir(c, bal[i].g, 450);
      await c.choice({
        tag: 'Sıra sende', q: `<b>${s.ad}</b> öğrencisi: “${s.satir.join(' ')}” Doğru mu?`,
        options: ['Doğru', 'Yanlış'], answer: s.dogru ? 0 : 1,
        hints: s.dogru ? ['', 'Bu söz kurala uyuyor.'] : ['Bu söz kurala uymuyor. ' + s.geri, ''],
        right: 'Evet. ' + s.geri,
      });
      bal[i].im.style.opacity = 1;
      await par(c.say(s.geri), belir(c, bal[i].govde, 400, 0.14));
    }
    await c.say('İyonik bileşiğin adı iyonların adlarından kurulur.');
  }

  Ders.start({
    id: 'cesitlilik-f1', kicker: 'Konu F · Bileşiklerin adlandırılması', title: 'İyonik bileşiğin adı: katyonun adı, anyonun adı', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'İyonik bileşiğin adı: katyonun adı, anyonun adı',
      hook: 'Bir bileşiğin adını ilk kez duyuyorsun; yalnızca adından formülünü çıkarabilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['İyonik bileşiğin formülünden katyonu ve anyonu belirler.', 'Tek katyonlu metallerin ve çok atomlu iyon içeren iyonik bileşiklerin adını yazar.', 'Adı verilen iyonik bileşiğin formülünü yazar.'],
    scenes: [
      { title: 'Hatırla', goal: 'İyonik bileşiğin formülünü ve anyonu hatırla.', run: hatirla },
      { title: 'Formülden iyonlara', goal: 'Formüldeki katyonu ve anyonu bul.', run: formuldenIyonlara },
      { title: 'İyonların adı, bileşiğin adı', goal: 'Bileşiğin adını iyonların adlarından kur.', run: adlar },
      { title: 'Çok atomlu iyon içeren bileşikler', goal: 'Aynı kuralı çok atomlu iyonlarda uygula.', run: cokAtomlu },
      { title: 'Sekiz formülü adlandır', goal: 'Sekiz formülü adlandır.', run: sekiz },
      { title: 'Addan formüle', goal: 'Adı verilen bileşiğin formülünü yaz.', run: addanFormule },
      { title: 'Doğru kural hangisi?', goal: 'Dört öğrencinin sözünü kurala göre değerlendir.', run: dogruKural },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'K<sub>2</sub>O bileşiğinin adı hangisidir?',
        options: ['Oksit potasyum', 'Potasyum oksit', 'Potasyum iki oksit'], answer: 1,
        why: ['Önce katyonun adı yazılır; potasyum başa gelmeli.', 'Katyon K<sup>+</sup> potasyum, anyon O<sup>2−</sup> oksit; sayı yazılmaz.', 'İki K<sup>+</sup> vardır ama adlarda sayı yazılmaz.'], scene: 2 },
      { q: 'Li<sub>3</sub>N bileşiğini oluşturan iyonlar hangileridir?',
        options: ['Li<sup>3+</sup> ve N<sup>−</sup>', 'Li<sup>+</sup> ve N<sup>−</sup>', 'Li<sup>+</sup> ve N<sup>3−</sup>'], answer: 2,
        why: ['Alt indis iyon sayısıdır; Li iyonu 3+ değil, 1+ yüklüdür.', 'Üç Li<sup>+</sup> 3+ eder; bunu bir N<sup>−</sup> dengelemez.', 'Üç Li<sup>+</sup> 3+, bir N<sup>3−</sup> 3− eder; toplam sıfır.'], scene: 1 },
      { q: 'Sr(NO<sub>3</sub>)<sub>2</sub> bileşiğinin adı hangisidir?',
        options: ['Stronsiyum nitrat', 'Nitrat stronsiyum', 'Stronsiyum iki nitrat'], answer: 0,
        why: ['Katyon stronsiyum, anyon nitrat; parantez ve indis ada girmez.', 'Önce katyonun adı yazılır.', 'Adlarda sayı yazılmaz; iki nitrat olsa da ad “nitrat”tır.'], scene: 3 },
      { q: 'Bir öğrenci MgBr<sub>2</sub>\'yi “magnezyum iki bromür” diye adlandırıyor. Hangisi bu düşünceyi düzeltir?',
        options: ['Anyonun adı önce yazılır', 'Katyonun adı ada girmez', 'İyonik bileşiğin adında formüldeki sayılar yazılmaz'], answer: 2,
        why: ['Önce katyonun adı yazılır; sorun sıra değil, sayı.', 'Katyonun adı ada girer; bu düşünce yanlış.', 'Sayılar formülde kalır; ad yalnız iyonların adlarından kurulur.'], scene: 2 },
      { q: 'Alüminyum klorürün formülü hangisidir?',
        options: ['Al<sub>3</sub>Cl', 'AlCl<sub>3</sub>', 'AlCl'], answer: 1,
        why: ['Üç Al<sup>3+</sup> 9+ eder; bir Cl<sup>−</sup> bunu dengelemez.', 'Al<sup>3+</sup> 3+ yüklüdür; üç Cl<sup>−</sup> 3− ile dengeler.', 'Bir Cl<sup>−</sup> 1−, Al<sup>3+</sup> 3+ yükünü dengelemez.'], scene: 5 },
    ],
    summary: [
      'Formül iyonları saklar; iyonların adları bileşiğin adını kurar.',
      'Önce katyonun, sonra anyonun adı yazılır.',
      'Sayılar ada girmez; çok atomlu iyon kuralı değiştirmez.',
      '<b>Önce katyonun adı, sonra anyonun adı.</b>',
    ],
    nextLesson: { href: 'f2-romen-rakami.html', label: 'Sonraki: Romen rakamı ›' },
  });
})();
