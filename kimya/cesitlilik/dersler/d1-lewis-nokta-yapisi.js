/* D1 — Lewis nokta yapısı: valans elektronları noktalarla
   Lewis yapısı valans elektronlarını sembolün çevresine noktalarla gösterir; yapılar karşılaştırılınca bir atomun
   bu moleküllerde hep aynı sayıda ortaklanmış çift yaptığı görülür.
   Senaryo: plan/kimya/cesitlilik/senaryolar/D-lewis-nokta-yapisi.md (D1). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Noktaları yerleştirme ve eleme adım adım seçimle kurulur (sürükleme yok). Araçlar: d-araclar.js (KIT_D). */
(() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, gizle, belir, par, ok, yuk } = window.KIT;
  const D = window.KIT_D;

  const say = (c, html, speak) => c.say(html, speak ? { speak } : undefined);
  const sil = (c, el, ms = 400) => belir(c, el, ms, 0);

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g = c.S('g', {}, svg), N1 = [330, 230], N2 = [670, 230];
    yuk(c, g, N1, 'arti', 26); yuk(c, g, N2, 'arti', 26);
    yuk(c, g, [484, 230], 'eksi', 12); yuk(c, g, [516, 230], 'eksi', 12);
    yazi(c, g, 330, 296, 'çekirdek', { size: 24, renk: RENK.arti }); yazi(c, g, 670, 296, 'çekirdek', { size: 24, renk: RENK.arti });
    yazi(c, g, 500, 296, 'ortak elektronlar', { size: 24, renk: RENK.eksi });
    const oklar = c.S('g', {}, svg);
    ok(c, oklar, [366, 230], [452, 230], RENK.cekme, 5); ok(c, oklar, [634, 230], [548, 230], RENK.cekme, 5);
    gizle(g, oklar);
    await par(say(c, 'Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Ortak kullanılan elektronları hangi çekirdekler çeker?',
      options: ['Yalnızca birinin çekirdeği', 'İki atomun çekirdeği de', 'Hiçbirinin çekirdeği'], answer: 1,
      hints: ['İki çekirdek de ortak elektronları çeker; bağ budur.', '', 'İki çekirdek de ortak elektronları çeker; bağ budur.'],
      right: 'Evet. İki çekirdek de ortak elektronları çeker.',
    });
    await belir(c, oklar, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki ametal atomu bağ yaptığında elektronlara ne olur?',
      options: ['Biri verir, öteki alır', 'Ortak kullanılır', 'Atomlardan ayrılıp serbest dolaşır'], answer: 1,
      hints: ['Kovalent bağda elektron verilmez, ortak kullanılır.', '', 'Kovalent bağda elektron verilmez, ortak kullanılır.'],
      right: 'Evet. Kovalent bağda elektronlar ortak kullanılır.',
    });
    await c.wait(500);
    await say(c, 'Bugün bu ortak elektronların kâğıt üstünde nasıl gösterildiğine bakacağız.', '[curious] Bugün bu ortak elektronların kâğıt üstünde nasıl gösterildiğine bakacağız.');
  }

  /* ---- 2. Atomun noktaları ---- */
  async function atomNoktalari(c) {
    const svg = c.svg(1000, 562);
    const kok = c.S('g', {}, svg);
    const AP = [300, 280], RD = 128, RI = 54;
    // Azot atomu: çekirdek, iç halka ve beş valans elektronu.
    const modelG = c.S('g', {}, kok);
    const dis = c.S('circle', { cx: AP[0], cy: AP[1], r: RD, fill: 'none', stroke: RENK.eksi, 'stroke-opacity': 0.45, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, modelG);
    const ic = c.S('circle', { cx: AP[0], cy: AP[1], r: RI, fill: 'none', stroke: RENK.eksi, 'stroke-opacity': 0.3, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, modelG);
    const cek = yuk(c, modelG, AP, 'arti', 22);
    const icE = [0.5, 0.5 + Math.PI].map((a) => { const q = D.nokta(c, modelG, ...ileri(AP, a, RI), { r: 8 }); q.g.style.opacity = 0.5; return q; });
    const N = D.lewis(c, kok, AP, 'N', { size: 56 });
    N.sembol.g.style.opacity = 0;
    const vG = c.S('g', {}, kok);
    const vd = [0, 1, 2, 3, 4].map((k) => D.nokta(c, vG, ...ileri(AP, -Math.PI / 2 + k * 2 * Math.PI / 5, RD), { r: 8 }));
    const etN = yazi(c, kok, AP[0], 468, 'valans: 5', { size: 26, renk: RENK.eksi });
    const baslik = yazi(c, kok, 500, 56, 'Lewis nokta yapısı', { size: 30 });
    gizle(modelG, vG, etN, baslik);

    await par(say(c, 'Atomun en dış katmanındaki elektronlara valans elektronu denir.'), belir(c, [modelG, vG, etN], 600));
    await say(c, 'Kimyacılar atomu kısa yoldan göstermek için sembol ve nokta kullanır.');
    await par(say(c, 'Sembol, çekirdeği ve iç enerji seviyelerindeki elektronları temsil eder.'),
      par(belir(c, [cek.g, ic, ...icE.map((q) => q.g)], 700, 0), belir(c, N.sembol.g, 700)));
    await par(say(c, 'Sembolün çevresindeki noktalar, valans elektronlarını gösterir.'), (async () => {
      belir(c, dis, 500, 0);
      await D.tasi(c, vd.map((q, k) => [q, ...ileri(AP, -Math.PI / 2 + k * 2 * Math.PI / 5, 74)]), 800);
    })());
    await par(say(c, 'Bu gösterime Lewis nokta yapısı denir.', 'Bu gösterime Levis nokta yapısı denir.'), belir(c, baslik, 500));
    await par(say(c, 'Azotun valans elektron sayısı 5\'tir, beş nokta çizilir.', 'Azotun valans elektron sayısı beştir, beş nokta çizilir.'), (async () => {
      vd.forEach((q) => q.isaret(true)); await c.wait(900); vd.forEach((q) => q.isaret(false));
    })());
    await par(say(c, 'Noktalar sembolün dört yanına önce teker teker yerleşir.'), (async () => {
      await belir(c, N.yuvaG, 400);
      for (let k = 0; k < 4; k++) { await N.ekleParca(vd[k], k, 520); await c.wait(120); }
    })());
    await say(c, 'Azotta dört yanda birer nokta oluşur.');
    await say(c, 'Valans elektronu dördü aşınca fazlası çift olarak yerleşir.');
    await par(say(c, 'Azotun beşinci noktası, bir noktanın yanına eşlenir.'), N.ekleParca(vd[4], 0, 900));
    belir(c, N.yuvaG, 300, 0);
    // Alüminyum.
    const AL = D.lewis(c, kok, [720, 280], 'Al', { size: 56 });
    const etAl = yazi(c, kok, 720, 468, 'valans: 3', { size: 26, renk: RENK.eksi });
    gizle(AL.g, etAl);
    await par(say(c, 'Alüminyumun üç valans elektronu vardır.'), belir(c, [AL.g, etAl], 500));
    await par(say(c, 'Üç yanda birer nokta olur, dördüncü yan boş kalır.'), (async () => {
      for (let k = 0; k < 3; k++) { await AL.ekle(k, { ms: 450 }); await c.wait(150); }
    })());
    await c.wait(500);
    await sil(c, kok, 500);
    c.clearSay();

    // Birlikte çöz: flor.
    const k2 = c.S('g', {}, svg);
    const F = D.lewis(c, k2, [360, 270], 'F', { size: 64 });
    F.yuvaG.style.opacity = 1;
    [0, 1, 2, 3].forEach((y) => F.hemen(y));
    const bek = [0, 1, 2].map((i) => D.nokta(c, k2, 640 + i * 56, 270));
    yazi(c, k2, 360, 440, 'valans: 7', { size: 26, renk: RENK.eksi });
    gizle(k2); await belir(c, k2, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Florun 7 valans elektronundan dördü yerleşti. Kalan üçü nereye gider?',
      options: ['Üç noktanın yanına eşlenir; üç yanda çift, bir yanda tek nokta olur', 'Tek bir yanda üçlü küme olur', 'Yazılmaz, noktalar yalnızca dört tanedir'], answer: 0,
      hints: ['', 'Dört yanın hepsinde bir nokta var; yeni yan açılmaz.', 'Her valans elektronu bir nokta olarak yazılır.'],
      right: 'Evet. Kalan üç nokta üç noktanın yanına eşlenir.',
    });
    for (let k = 0; k < 3; k++) { await F.ekleParca(bek[k], k, 700); await c.wait(100); }
    await say(c, 'Flor, üç yanda çift, bir yanda tek noktayla yazılır.');
    await sil(c, k2, 500);
    c.clearSay();

    // Sor: karbon.
    const k3 = c.S('g', {}, svg);
    const C = D.lewis(c, k3, [360, 270], 'C', { size: 64 });
    C.yuvaG.style.opacity = 1;
    yazi(c, k3, 360, 440, 'valans: 4', { size: 26, renk: RENK.eksi });
    gizle(k3); await belir(c, k3, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Karbonun 4 valans elektronu var. Noktalar nasıl yerleşir?',
      options: ['İki yanda çift, iki yan boş', 'Bir yanda dört nokta', 'Dört yanda birer nokta'], answer: 2,
      hints: ['Önce her yana birer nokta konur.', 'Çift, ancak dört yan dolunca oluşur.', ''],
      right: 'Evet. Dört nokta dört yana birer birer yerleşir.',
    });
    for (let k = 0; k < 4; k++) { await C.ekle(k, { ms: 400 }); await c.wait(100); }
    await say(c, 'Valans elektronu dört ya da daha azsa hepsi teker teker yerleşir.', 'Valans elektronu dört ya da daha azsa hepsi teker teker yerleşir.');
    await sil(c, k3, 500);
    c.clearSay();

    // Dene: üç atomun noktaları adım adım.
    const k4 = c.S('g', {}, svg);
    const X = [170, 500, 830], ad = [['H', 1], ['O', 6], ['Cl', 7]];
    const A = ad.map(([s, v], i) => {
      const a = D.lewis(c, k4, [X[i], 250], s, { size: 60 });
      a.yuvaG.style.opacity = 1;
      yazi(c, k4, X[i], 400, 'valans: ' + v, { size: 26, renk: RENK.eksi });
      return a;
    });
    gizle(k4); await belir(c, k4, 500);
    await c.say('Şimdi noktaları kendin yerleştir.', { noWait: true });
    // Hidrojen.
    await c.choice({
      tag: 'Dene', q: 'Hidrojenin 1 valans elektronu var. Tek nokta nereye konur?',
      options: ['Üst yanda, iki nokta olarak', 'Dört yandan herhangi birine', 'Yazılmaz'], answer: 1,
      hints: ['Bir tane nokta var, iki değil.', '', 'Her valans elektronu bir nokta olarak yazılır.'],
      right: 'Evet. Tek nokta için dört yan da boştur.',
    });
    await A[0].ekle(1, { ms: 450 });
    // Oksijen.
    await c.choice({
      tag: 'Dene', q: 'Oksijenin 6 valans elektronu var. İlk dört nokta nereye yerleşir?',
      options: ['Bir yanda dördü birden', 'Dört yana birer nokta', 'İki yanda ikişer nokta'], answer: 1,
      hints: ['Bir yanda en çok iki nokta durur.', '', 'Önce her yana birer nokta konur.'],
      right: 'Evet. Önce her yana birer nokta konur.',
    });
    for (let k = 0; k < 4; k++) { await A[1].ekle(k, { ms: 350 }); await c.wait(80); }
    await c.choice({
      tag: 'Dene', q: 'Oksijenin kalan iki noktası nereye gider?',
      options: ['Aynı noktanın yanına, bir yanda üç nokta olur', 'İki ayrı noktanın yanına, iki yanda çift olur', 'Yazılmaz'], answer: 1,
      hints: ['Bir yanda en çok iki nokta olur.', '', 'Her valans elektronu bir nokta olarak yazılır.'],
      right: 'Evet. İki yanda çift, iki yanda tek nokta kalır.',
    });
    for (let k = 0; k < 2; k++) { await A[1].ekle(k, { ms: 450 }); await c.wait(80); }
    // Klor.
    await c.choice({
      tag: 'Dene', q: 'Klorun 7 valans elektronu var. İlk dört nokta nereye yerleşir?',
      options: ['İki yanda ikişer nokta', 'Bir yanda dördü birden', 'Dört yana birer nokta'], answer: 2,
      hints: ['Önce her yana birer nokta konur.', 'Bir yanda en çok iki nokta durur.', ''],
      right: 'Evet. Önce her yana birer nokta konur.',
    });
    for (let k = 0; k < 4; k++) { await A[2].ekle(k, { ms: 350 }); await c.wait(80); }
    await c.choice({
      tag: 'Dene', q: 'Klorun kalan üç noktası nereye gider?',
      options: ['Yazılmaz, noktalar yalnızca dört tanedir', 'Tek bir yanda üçlü küme olur', 'Üç noktanın yanına eşlenir; üç yanda çift olur'], answer: 2,
      hints: ['Her valans elektronu bir nokta olarak yazılır.', 'Dört yanın hepsinde bir nokta var; yeni yan açılmaz.', ''],
      right: 'Evet. Üç yanda çift, bir yanda tek nokta olur.',
    });
    for (let k = 0; k < 3; k++) { await A[2].ekle(k, { ms: 450 }); await c.wait(80); }
    c.note('<b>Lewis yapısı:</b> sembol + valans elektronu kadar nokta.<br>Örnek: N, 5 nokta.', 'Lewis yapısı', 'lewis-yapisi');
  }

  /* ---- 3. Moleküldeki noktalar ---- */
  async function molekuldekiNoktalar(c) {
    const svg = c.svg(1000, 562);
    // Hidrojen molekülü.
    const k1 = c.S('g', {}, svg);
    const h2 = D.molekul(c, k1, D.sablon('H2', 500, 190, 170, { size: 56 }));
    h2.atomikGoster();
    const et1 = yazi(c, k1, 500, 300, 'ortaklanmış çift', { size: 26, renk: RENK.eksi });
    et1.style.opacity = 0; gizle(k1);
    await par(say(c, 'İki hidrojen atomu bağ yaparken tek noktalar yan yana gelir.'), (async () => {
      await belir(c, k1, 500); await c.wait(500); await h2.bagla(1100);
    })());
    await par(say(c, 'İki atomun arasındaki nokta çifti, ortaklanmış çifttir.'), par(h2.kapsulGoster(500), belir(c, et1, 500)));
    await par(say(c, 'Bu iki elektronu iki atom birlikte kullanır.'), (async () => {
      h2.baglar[0].dots.forEach((d) => d.isaret(true)); await c.wait(1200); h2.baglar[0].dots.forEach((d) => d.isaret(false));
    })());
    await sil(c, k1, 450);

    // Hidrojen florür.
    const k2 = c.S('g', {}, svg);
    const hf = D.molekul(c, k2, D.sablon('HF', 440, 220, 200, { size: 60 }));
    hf.atomikGoster();
    const etA = yazi(c, k2, 440, 330, 'ortaklanmış', { size: 26, renk: RENK.eksi });
    const etB = yazi(c, k2, 650, 229, 'ortaklanmamış', { size: 26, renk: RENK.eksi, hiza: 'start' });
    const ln1 = cizgi(c, k2, [440, 312], [440, 262], RENK.eksi, 2), ln2 = cizgi(c, k2, [644, 220], [604, 220], RENK.eksi, 2);
    gizle(k2, etA, etB, ln1, ln2);
    await par(say(c, 'Hidrojen florürde hidrojenin tek elektronu florla ortaklanır.'), (async () => {
      await belir(c, k2, 500);
    })());
    // Hidrojenin noktası ve florun bağa bakan tek noktası vurgulanır, sonra birleşir.
    const hfAtomik = hf.atomik, fTek = hfAtomik[hfAtomik.length - 7 + 3];
    hfAtomik.forEach((d) => d.isaret(false));
    await par(say(c, 'Florun yedi elektronundan yalnızca biri ortaklanır.'), (async () => {
      hfAtomik[0].isaret(true); fTek.isaret(true); await c.wait(700);
      await hf.bagla(1100);
      hf.kapsulGoster(450); await belir(c, [etA, ln1], 450);
      hfAtomik.forEach((d) => d.isaret(false));
    })());
    const lone = hf.atomYalnizNokta(1);
    await par(say(c, 'Bağ yapmayan valans elektronları, ortaklanmamış elektronlardır.'), (async () => {
      lone.forEach((d) => d.isaret(true)); await belir(c, [etB, ln2], 450);
    })());
    await say(c, 'Florda altı ortaklanmamış elektron, üç çift olarak kalır.', 'Florda altı ortaklanmamış elektron, üç çift olarak kalır.');
    await par(say(c, 'Ortaklanmamış çiftler atomun kendi çevresinde durur.'), (async () => { await c.wait(700); lone.forEach((d) => d.isaret(false)); })());
    await sil(c, k2, 450);
    c.clearSay();

    // Birlikte çöz: su.
    const k3 = c.S('g', {}, svg);
    const su = D.molekul(c, k3, D.sablon('H2O', 500, 190, 150, { size: 56 }));
    su.yalnizlariGizle();
    const tv = yazi(c, k3, 210, 400, 'valans: 6', { size: 26, renk: RENK.eksi }), to = yazi(c, k3, 500, 400, 'ortaklanmış: 2', { size: 26, renk: RENK.eksi });
    const tn = yazi(c, k3, 800, 400, 'ortaklanmamış: ?', { size: 26, renk: RENK.vurgu });
    gizle(k3); await belir(c, k3, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Oksijenin 6 valans elektronundan 2\'si ortaklandı. Kaç ortaklanmamış elektron kalır?',
      options: ['2', '6', '4'], answer: 2,
      hints: ['Altı elektrondan ikisi ortaklandı; geri kalanı say.', 'Ortaklananlar ortaklanmamışlara katılmaz.', ''],
      right: 'Evet. 6 − 2 = 4 ortaklanmamış elektron kalır.',
    });
    tn.textContent = 'ortaklanmamış: 4';
    await par(say(c, 'Oksijende dört ortaklanmamış elektron, iki çift olarak durur.'), su.yalnizGoster(600));
    await c.wait(400);
    await sil(c, k3, 450);
    c.clearSay();

    // Sor: metan.
    const k4 = c.S('g', {}, svg);
    const ch = D.molekul(c, k4, D.sablon('CH4', 500, 190, 105, { size: 52 }));
    gizle(ch.g);
    yazi(c, k4, 210, 450, 'valans: 4', { size: 26, renk: RENK.eksi }); yazi(c, k4, 500, 450, 'ortaklanmış: 4', { size: 26, renk: RENK.eksi });
    const tn2 = yazi(c, k4, 800, 450, 'ortaklanmamış: ?', { size: 26, renk: RENK.vurgu });
    gizle(k4); await belir(c, k4, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Karbonun 4 valans elektronunun dördü de dört hidrojenle ortaklanıyor. Karbonda kaç ortaklanmamış elektron kalır?',
      options: ['4', '0', '2'], answer: 1,
      hints: ['Karbonun bütün valans elektronları ortaklandı.', '', 'Ortaklanmayanlar ortaklanmamıştır; hiç kalmadı.'],
      right: 'Evet. Hepsi ortaklandı, ortaklanmamış elektron kalmadı.',
    });
    tn2.textContent = 'ortaklanmamış: 0';
    await belir(c, ch.g, 700);
    await c.wait(1200);
    c.note('<b>Ortaklanmış çift atomlar arasında, ortaklanmamış çift atomun çevresinde durur.</b> Örnek: HF.', 'Ortaklanmış, ortaklanmamış', 'ortaklanmis-ortaklanmamis');
  }

  /* ---- 4. Sayarak karşılaştır ---- */
  async function sayarak(c) {
    const svg = c.svg(1000, 562);
    const SUT = [520, 625, 760, 910], SAT = [200, 285, 370, 455];
    ['valans', 'ortaklanmış', 'ortaklanmamış'].forEach((m, i) => yazi(c, svg, SUT[i + 1], 130, m, { size: 21, kalin: 600, renk: RENK.soluk }));
    cizgi(c, svg, [480, 150], [980, 150], RENK.kenarlik, 1.5);
    const MOL = {}, yerlestir = (ad) => { const m = D.molekul(c, svg, D.sablon(ad, 250, 300, 150, { size: 54 })); m.g.style.opacity = 0; MOL[ad] = m; };
    ['H2', 'F2', 'N2', 'O2', 'NH3'].forEach(yerlestir);
    const hucre = {};
    const yaz = (s, k, metin, renk) => { const t = yazi(c, svg, SUT[k], SAT[s] + 9, metin, { size: 30, renk: renk || RENK.yazi }); t.style.opacity = 0; hucre[s + ',' + k] = t; return t; };
    ['H', 'F', 'N', 'O'].forEach((s, i) => { const t = yazi(c, svg, SUT[0], SAT[i] + 9, s, { size: 30, renk: RENK.soluk }); t.style.opacity = 0; hucre[i + ',s'] = t; });
    // Bir atomun satırı: valans, ortaklanmış, ortaklanmamış sayıları sırayla; sayılan noktalar vurgulanır.
    async function doldur(m, atom, s, [v, o, n], yarim) {
      const pay = m.atomPaylasilan(atom), yal = m.atomYalnizNokta(atom), hepsi = [...pay, ...yal];
      belir(c, hucre[s + ',s'], 300);
      hepsi.forEach((d) => d.isaret(true)); yaz(s, 1, String(v)); await belir(c, hucre[s + ',1'], 300); await c.wait(550); hepsi.forEach((d) => d.isaret(false));
      pay.forEach((d) => d.isaret(true)); yaz(s, 2, String(o)); await belir(c, hucre[s + ',2'], 300); await c.wait(550); pay.forEach((d) => d.isaret(false));
      if (yarim) { yaz(s, 3, '?', RENK.vurgu); await belir(c, hucre[s + ',3'], 300); return; }
      yal.forEach((d) => d.isaret(true)); yaz(s, 3, String(n)); await belir(c, hucre[s + ',3'], 300); await c.wait(550); yal.forEach((d) => d.isaret(false));
    }
    const baslik = svg.querySelectorAll('text'); const bas = [...baslik].slice(0, 3);
    gizle(bas);
    await par(say(c, 'Element moleküllerine bakalım: H₂, F₂, N₂ ve O₂.', 'Element moleküllerine bakalım: H iki, F iki, N iki ve O iki.'), belir(c, [...bas, MOL.H2.g], 500));
    await par(say(c, 'H₂\'de her hidrojen, tek elektronunu ortaklar.', 'H iki\'de her hidrojen, tek elektronunu ortaklar.'), doldur(MOL.H2, 0, 0, [1, 1, 0]));
    await par(say(c, 'F₂\'de her flor, 7 elektronundan birini ortaklar, 6\'sı kalır.', 'F iki\'de her flor, yedi elektronundan birini ortaklar, altısı kalır.'), (async () => {
      await par(sil(c, MOL.H2.g, 300), belir(c, MOL.F2.g, 400)); await doldur(MOL.F2, 0, 1, [7, 1, 6]);
    })());
    await par(say(c, 'N₂\'de her azot, 5 elektronundan üçünü ortaklar, 2\'si kalır.', 'N iki\'de her azot, beş elektronundan üçünü ortaklar, ikisi kalır.'), (async () => {
      await par(sil(c, MOL.F2.g, 300), belir(c, MOL.N2.g, 400)); await doldur(MOL.N2, 0, 2, [5, 3, 2]);
    })());
    c.clearSay();
    await par(belir(c, MOL.O2.g, 400), sil(c, MOL.N2.g, 300));
    await doldur(MOL.O2, 0, 3, [6, 2, 0], true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'O<sub>2</sub>\'de her oksijen 2 elektronunu ortaklar. Kaç ortaklanmamış elektronu kalır?',
      options: ['2', '6', '4'], answer: 2,
      hints: ['Flor 7 − 1 = 6 bulmuştu; aynı işlemi yap.', 'Altı valans elektronundan ortaklananları çıkar.', ''],
      right: 'Evet. 6 − 2 = 4 ortaklanmamış elektron.',
    });
    hucre['3,3'].textContent = '4'; hucre['3,3'].style.fill = RENK.yazi;
    const yalO = MOL.O2.atomYalnizNokta(0); yalO.forEach((d) => d.isaret(true)); await c.wait(700); yalO.forEach((d) => d.isaret(false));
    await say(c, 'Valans elektronları ya ortaklanmıştır ya ortaklanmamıştır.');
    await par(say(c, 'O₂\'de iki atom arasında iki ortaklanmış çift vardır.', 'O iki\'de iki atom arasında iki ortaklanmış çift vardır.'), (async () => {
      MOL.O2.kapsulIsaret(MOL.O2.baglar, true); await c.wait(1300); MOL.O2.kapsulIsaret(MOL.O2.baglar, false);
    })());
    await par(say(c, 'N₂\'de iki atom arasında üç ortaklanmış çift vardır.', 'N iki\'de iki atom arasında üç ortaklanmış çift vardır.'), (async () => {
      await par(sil(c, MOL.O2.g, 300), belir(c, MOL.N2.g, 400));
      MOL.N2.kapsulIsaret(MOL.N2.baglar, true); await c.wait(1300); MOL.N2.kapsulIsaret(MOL.N2.baglar, false);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'NH<sub>3</sub>\'te azotun 5 valans elektronundan 3\'ü ortaklanır. Kaç ortaklanmamış elektronu kalır?',
      options: ['3', '5', '2'], answer: 2,
      hints: ['Valans elektronlarının hepsi ya ortaklanır ya ortaklanmaz.', 'Azotun toplam 5 elektronundan 3\'ünü çıkar.', ''],
      right: 'Evet. 5 − 3 = 2 ortaklanmamış elektron.',
    });
    await par(sil(c, MOL.N2.g, 300), belir(c, MOL.NH3.g, 500));
    const yN = MOL.NH3.atomYalnizNokta(0); yN.forEach((d) => d.isaret(true)); await c.wait(1300); yN.forEach((d) => d.isaret(false));
  }

  /* ---- 5. Yapıları karşılaştır ---- */
  async function karsilastir(c) {
    const svg = c.svg(1000, 562);
    const ADLAR = ['H2', 'F2', 'N2', 'O2', 'HF', 'CH4', 'NH3', 'H2O'];
    const XS = [130, 380, 630, 880], M = ADLAR.map((ad, i) => {
      const y = i < 4 ? 90 : 252, d = i < 4 ? 90 : (ad === 'HF' ? 90 : 62);
      return D.molekul(c, svg, D.sablon(ad, XS[i % 4], y, d, { size: 30 }));
    });
    const kutu = (x, ad) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x, y: 392, width: 430, height: 150, rx: 14, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      yazi(c, g, x + 215, 428, ad, { size: 24, kalin: 600, renk: RENK.soluk });
      return g;
    };
    const kB = kutu(50, 'Benzerlik'), kF = kutu(520, 'Farklılık');
    const sayi = { B: 0, F: 0 };
    const jeton = async (kutuAd) => {
      const x0 = kutuAd === 'B' ? 90 : 560, x = x0 + sayi[kutuAd]++ * 40;
      const q = c.S('circle', { cx: x, cy: 490, r: 13, fill: RENK.eksi, 'fill-opacity': 0.8 }, svg); q.style.opacity = 0;
      await belir(c, q, 350);
    };
    const hepsi = M.map((m) => m.g), bag = M.flatMap((m) => m.baglar);
    gizle(hepsi, kB, kF);
    await par(say(c, 'Sekiz yapıyı yan yana koyup benzerlik ve farklılık arayalım.'), belir(c, [...hepsi, kB, kF], 600));
    await par(say(c, 'Her yapıda noktalar yalnızca valans elektronlarını gösterir.'), jeton('B'));
    await par(say(c, 'Her yapıda iki atom arasında en az bir ortaklanmış çift vardır.'), (async () => {
      bag.forEach((b) => b.kapsul.isaret(true)); await c.wait(1200); bag.forEach((b) => b.kapsul.isaret(false)); await jeton('B');
    })());
    M[0].kapsulIsaret(M[0].baglar, true); M[2].kapsulIsaret(M[2].baglar, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Ortaklanmış çift sayısı atomdan atoma değişir. Bu bir benzerlik mi, farklılık mı?',
      options: ['Benzerlik', 'Farklılık'], answer: 1,
      hints: ['Hidrojen molekülü ile azot molekülündeki çiftleri say.', ''],
      right: 'Evet. H<sub>2</sub>\'de bir, N<sub>2</sub>\'de üç ortaklanmış çift var.',
    });
    M[0].kapsulIsaret(M[0].baglar, false); M[2].kapsulIsaret(M[2].baglar, false);
    await jeton('F');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Her atomun valans elektronları ortaklanmıştır ya da ortaklanmamıştır. Bu bir benzerlik mi, farklılık mı?',
      options: ['Benzerlik', 'Farklılık'], answer: 0,
      hints: ['', 'Bu iki grubun dışında bir valans elektronu var mı?'],
      right: 'Evet. Sekiz yapıda da valans elektronları bu iki gruba ayrılır.',
    });
    await jeton('B');
    await say(c, 'Ortaklanmış çift sayısı atomdan atoma değişir.');
    await say(c, 'Bu farkta bir düzen olabilir mi, bakalım.');
  }

  /* ---- 6. Düzen: valans azaldıkça çift artar ---- */
  async function duzen(c) {
    const svg = c.svg(1000, 562);
    const XS = [300, 490, 680, 870], AD = ['HF', 'H2O', 'NH3', 'CH4'], VAL = [7, 6, 5, 4], CIFT = [1, 2, 3, 4];
    const M = AD.map((ad, i) => D.molekul(c, svg, D.sablon(ad, XS[i], 165, ad === 'HF' ? 84 : 62, { size: 30 })));
    yazi(c, svg, 20, 345, 'valans', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    yazi(c, svg, 20, 415, 'ortaklanmış çift', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    const rv = XS.map((x, i) => yazi(c, svg, x, 354, String(VAL[i]), { size: 32, renk: RENK.eksi }));
    const rc = XS.map((x, i) => yazi(c, svg, x, 424, i === 3 ? '?' : String(CIFT[i]), { size: 32, renk: i === 3 ? RENK.vurgu : RENK.yazi }));
    const oklar = c.S('g', {}, svg);
    [354, 424].forEach((y) => [0, 1, 2].forEach((i) => ok(c, oklar, [XS[i] + 34, y - 10], [XS[i + 1] - 34, y - 10], RENK.vurgu, 3)));
    gizle(M.map((m) => m.g), rv, rc, oklar);
    await par(say(c, 'Hidrojenle birleşen dört atoma bakalım: flor, oksijen, azot, karbon.'), belir(c, M.slice(0, 3).map((m) => m.g), 600));
    await par(say(c, 'Florun valansı 7\'dir ve bir ortaklanmış çift yapar.', 'Florun valansı yedidir ve bir ortaklanmış çift yapar.'), belir(c, [rv[0], rc[0]], 450));
    await par(say(c, 'Oksijende valans 6\'dır, ortaklanmış çift 2\'dir.', 'Oksijende valans altıdır, ortaklanmış çift ikidir.'), belir(c, [rv[1], rc[1]], 450));
    await par(say(c, 'Azotta valans 5\'tir, ortaklanmış çift 3\'tür.', 'Azotta valans beştir, ortaklanmış çift üçtür.'), belir(c, [rv[2], rc[2]], 450));
    await par(say(c, 'Valans bir azaldıkça ortaklanmış çift bir artıyor.'), belir(c, oklar, 600));
    await par(belir(c, [rv[3], rc[3]], 450), c.wait(200));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Karbonun valans elektronu 4. Kaç ortaklanmış çift yapar?',
      options: ['3', '5', '4'], answer: 2,
      hints: ['Valans 7, 6, 5 iken çiftler 1, 2, 3 olmuştu.', 'Valans bir azalınca çift bir artar.', ''],
      right: 'Evet. Valans 4 iken ortaklanmış çift 4.',
    });
    rc[3].textContent = '4'; rc[3].style.fill = RENK.yazi;
    await par(say(c, 'Karbon dört hidrojenle dört ortaklanmış çift yapar.'), belir(c, M[3].g, 700));
    await say(c, 'Klorun valansı 7 ise aynı düzen onu da kapsar mı?', 'Klorun valansı yedi ise aynı düzen onu da kapsar mı?');
    await c.choice({
      tag: 'Sıra sende', q: 'Klorun valans elektronu 7\'dir. Düzene göre kaç ortaklanmış çift yapar?',
      options: ['7', '3', '1'], answer: 2,
      hints: ['Valansı 7 olan başka bir atom var: flor.', 'Valans 7 iken çift sayısı 1 olmuştu.', ''],
      right: 'Evet. Valansı 7 olan flor gibi klor da 1 ortaklanmış çift yapar.',
    });
    c.clearSay();
    await sil(c, Array.from(svg.children), 450);
    const hcl = D.molekul(c, svg, D.sablon('HCl', 270, 270, 190, { size: 56 })), cl2 = D.molekul(c, svg, D.sablon('Cl2', 730, 270, 190, { size: 56 }));
    gizle(hcl.g, cl2.g);
    await belir(c, [hcl.g, cl2.g], 600);
    await c.wait(1500);
  }

  /* ---- 7. Varsayım ve sınama ---- */
  async function varsayim(c) {
    const svg = c.svg(1000, 562);
    const CH = [['O', 2, 160], ['N', 3, 380], ['H', 1, 600], ['Cl', 1, 820]];
    const chip = CH.map(([s, n, x]) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x: x - 80, y: 440, width: 160, height: 62, rx: 14, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      yazi(c, g, x, 483, s + ': ' + n, { size: 30 });
      g.style.opacity = 0; return g;
    });
    let sahne = null;
    const goster = async (adlar, xs, sembol) => {
      if (sahne) await sil(c, sahne, 300);
      sahne = c.S('g', {}, svg); sahne.style.opacity = 0;
      const ms = adlar.map((ad, i) => D.molekul(c, sahne, D.sablon(ad, xs[i], 170, 84, { size: 34 })));
      await belir(c, sahne, 450);
      const sec = ms.map((m) => m.baglar.filter((b) => sembol.includes(m.atomlar[b.a].ad) || sembol.includes(m.atomlar[b.b].ad)));
      ms.forEach((m, i) => m.kapsulIsaret(sec[i], true));
      await c.wait(900);
      ms.forEach((m, i) => m.kapsulIsaret(sec[i], false));
    };
    await say(c, 'Aynı atoma farklı moleküllerde bakalım.');
    await par(say(c, 'Oksijen, O₂\'de de H₂O\'da da iki ortaklanmış çift yapar.', 'Oksijen, O iki\'de de H iki O\'da da iki ortaklanmış çift yapar.'), (async () => {
      await goster(['O2', 'H2O'], [300, 700], ['O']); await belir(c, chip[0], 400);
    })());
    await par(say(c, 'Azot; N₂\'de, NH₃\'te ve NCl₃\'te üç ortaklanmış çift yapar.', 'Azot; N iki\'de, N H üç\'te ve N Cl üç\'te üç ortaklanmış çift yapar.'), (async () => {
      await goster(['N2', 'NH3', 'NCl3'], [170, 500, 830], ['N']); await belir(c, chip[1], 400);
    })());
    await par(say(c, 'Hidrojen ve klor, baktığımız her molekülde bir ortaklanmış çift yapar.'), (async () => {
      await goster(['H2', 'HF', 'CH4'], [170, 500, 830], ['H']); await belir(c, chip[2], 400);
      await goster(['Cl2', 'HCl', 'NCl3'], [170, 500, 830], ['Cl']); await belir(c, chip[3], 400);
    })());
    if (sahne) await sil(c, sahne, 400);
    const vars = yazi(c, svg, 500, 250, 'atom: hep aynı sayıda ortaklanmış çift', { size: 30, renk: RENK.vurgu }); vars.style.opacity = 0;
    await par(say(c, 'Buradan bir varsayım çıkar: atom her molekülde aynı sayıda ortaklanmış çift yapar.'), belir(c, vars, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'Varsayıma göre CCl<sub>4</sub>\'te karbon kaç ortaklanmış çift yapar?',
      options: ['1', '4', '2'], answer: 1,
      hints: ['Karbon CH<sub>4</sub>\'te de dört çift yapmıştı.', '', 'Varsayım, atomun sayısını molekülden bağımsız sayar.'],
      right: 'Evet. Karbon CH<sub>4</sub>\'te 4 çift yapmıştı; CCl<sub>4</sub>\'te de 4.',
    });
    await sil(c, vars, 300);
    const cc = D.molekul(c, svg, D.sablon('CCl4', 500, 215, 100, { size: 34 })); cc.g.style.opacity = 0;
    await belir(c, cc.g, 600);
    cc.kapsulIsaret(cc.baglar, true);
    await say(c, 'CCl₄\'te karbon dört, her klor bir ortaklanmış çift yapar.', 'C Cl dört\'te karbon dört, her klor bir ortaklanmış çift yapar.');
    cc.kapsulIsaret(cc.baglar, false);
    await say(c, 'Varsayım, yeni bir molekülde de doğru çıktı.');
    await c.choice({
      tag: 'Sıra sende', q: 'Yapılara bakarak hangi önerme doğru değildir?',
      options: ['Atom, bu moleküllerde hep aynı sayıda ortaklanmış çift yapar', 'Noktalar yalnızca valans elektronlarını gösterir', 'Her atomun ortaklanmamış çifti vardır'], answer: 2,
      hints: ['Bu önerme yapılardan çıkıyor; doğru olmayanı bul.', 'Bu önerme yapılardan çıkıyor; doğru olmayanı bul.', ''],
      right: 'Evet. Hidrojenin ve CH<sub>4</sub>\'teki karbonun ortaklanmamış elektronu yok.',
    });
    c.note('<b>Atom, bu moleküllerde hep aynı sayıda ortaklanmış çift yapar.</b> O: 2.', 'Düzen', 'duzen');
  }

  Ders.start({
    id: 'cesitlilik-d1', kicker: 'Konu D · Lewis nokta yapısı', title: 'Lewis nokta yapısı: valans elektronları noktalarla', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Lewis nokta yapısı: valans elektronları noktalarla',
      hook: 'Bir kimyacı, molekülde hangi elektronların bağ yaptığını kâğıt üstünde birkaç noktayla nasıl gösterir?',
      button: 'Derse başla ›',
    },
    goals: ['Lewis nokta yapısında noktaların valans elektronlarını gösterdiğini söyler.', 'Noktaları sembolün dört yanına kurala göre yerleştirir.', 'Ortaklanmış ve ortaklanmamış çifti ayırır.', 'Bir atomun bu moleküllerde hep aynı sayıda ortaklanmış çift yaptığını görür.'],
    scenes: [
      { title: 'Hatırla', goal: 'Ortak elektronları ve çekirdeklerin etkisini hatırla.', run: hatirla },
      { title: 'Atomun noktaları', goal: 'Valans elektronlarının sembolün çevresine nasıl yerleştiğini gör.', run: atomNoktalari },
      { title: 'Moleküldeki noktalar', goal: 'Ortaklanmış ve ortaklanmamış çifti ayır.', run: molekuldekiNoktalar },
      { title: 'Sayarak karşılaştır', goal: 'Element moleküllerinde valans, ortaklanmış ve ortaklanmamış elektronları say.', run: sayarak },
      { title: 'Yapıları karşılaştır', goal: 'Sekiz yapının benzerlik ve farklılıklarını bul.', run: karsilastir },
      { title: 'Düzen: valans azaldıkça çift artar', goal: 'Ortaklanmış çift sayısındaki düzeni bul.', run: duzen },
      { title: 'Varsayım ve sınama', goal: 'Bir varsayım kur ve yeni bir molekülde sına.', run: varsayim },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Azot atomunun 7 elektronu vardır, 5\'i valans elektronudur. Lewis yapısında kaç nokta çizilir?',
        options: ['7', '5', '2'], answer: 1,
        why: ['Noktalar atomun bütün elektronlarını değil, yalnızca valans elektronlarını gösterir.', 'Her valans elektronu bir nokta olarak yazılır.', 'İç halkadaki 2 elektron sembolün içindedir; nokta olmaz.'], scene: 1 },
      { q: 'Oksijenin 6 valans elektronu var. Lewis nokta yapısı hangisidir?',
        options: [D.miniSvg('O', [1, 1, 1, 1]) + ' Dört yanda birer nokta', D.miniSvg('O', [2, 2, 2, 0]) + ' Üç yanda çift, bir yan boş', D.miniSvg('O', [2, 1, 2, 1]) + ' İki yanda çift, iki yanda tek nokta'], answer: 2,
        why: ['Dört nokta var; oksijenin 6 valans elektronu için iki nokta daha gerekir.', 'Önce dört yana birer nokta konur; çift ancak ondan sonra oluşur.', 'Dört yana birer nokta, kalan iki nokta iki noktanın yanına: toplam 6.'], scene: 1 },
      { q: 'Cl<sub>2</sub>\'de her klor (valans 7) bir elektronunu ortaklar. Kaç ortaklanmamış elektronu kalır?',
        options: ['6', '7', '1'], answer: 0,
        why: ['7 − 1 = 6 ortaklanmamış elektron, üç çift.', 'Yedi valans elektronundan biri ortaklandı; hepsi ortaklanmamış değildir.', '1 ortaklanmış elektrondur; ortaklanmamış olan kalan 6\'dır.'], scene: 3 },
      { q: 'Varsayıma göre NF<sub>3</sub>\'te azot kaç ortaklanmış çift yapar?',
        options: ['1', '5', '3'], answer: 2,
        why: ['1 çift hidrojenin ve flor gibi atomların sayısıdır; azot NH<sub>3</sub>\'te 3 yapmıştı.', '5 azotun valans elektronu sayısıdır, çift sayısı değil.', 'Atom bu moleküllerde hep aynı sayıda çift yapar; azot 3 yapmıştı.'], scene: 6 },
      { q: 'HF\'de flor atomunun çevresindeki altı nokta neyi gösterir?',
        options: ['Ortaklanmamış elektronları', 'Ortaklanmış elektronları', 'İç enerji seviyesindeki elektronları'], answer: 0,
        why: ['Florun 7 valans elektronundan 1\'i ortaklanır, kalan 6\'sı ortaklanmamış üç çifttir.', 'Ortaklanmış çift iki atomun arasında durur.', 'İç enerji seviyesindeki elektronlar sembolün içindedir; nokta olmaz.'], scene: 2 },
    ],
    summary: ['Lewis yapısı valans elektronlarını noktalarla gösterir.', 'İki atomun arasındaki çift ortaklanmıştır, atomun çevresinde kalan çift ortaklanmamıştır.', 'Atom, bu moleküllerde hep aynı sayıda ortaklanmış çift yapar.', '<b>Lewis yapısı yalnızca valans elektronlarını gösterir.</b>'],
    nextLesson: { href: 'd2-oktet-dublet.html', label: 'Sonraki: Oktet ve dublet ›' },
  });
})();
