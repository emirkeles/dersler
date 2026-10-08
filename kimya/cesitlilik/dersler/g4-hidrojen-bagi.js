/* G4 — Hidrojen bağı
   Yapısında F–H, O–H ya da N–H bağlarından en az biri bulunan moleküller hidrojen bağı kurabilir. Hidrojen bağı, dipol-dipol etkileşimlerinin içinde ayrı bir gruptur
   ve dipol-dipol etkileşiminden güçlüdür; aynı ya da farklı moleküller arasında kurulur. DNA'nın iki zincirini de bu bağlar birleştirir.
   Senaryo: plan/kimya/cesitlilik/senaryolar/G-molekuller-arasi-etkilesimler.md ("G4"). Sıra plan/KURALLAR.md 3.2'ye göredir. Seslendirme yok.
   Ölçüt yalnızca F–H, O–H ve N–H bağıdır; kJ/mol değeri, kuvvet sıralaması, suyun yoğunluk anomalisi, buzun yapısı, çözünürlük yok. Çizimler şematiktir. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, par, sinifla } = window.KIT;
  const G = window.KIT_G;
  const { B, Gz, FORM, html, cf, ch, cift, cekim, uzayDolgu, lewis, kartTahtasi, hidrojenBagiZinciri, dnaMerdiven, bazCifti, golgeOf } = G;

  /* İki Lewis yapısı yan yana ve aralarında yeşil kesikli çekim çizgisi (hidrojen bağı ya da başka etkileşim). */
  function lewisCift(c, p, a, b, x, y, k, o = {}) {
    const g = c.S('g', {}, p), ga = c.S('g', {}, g), gb = c.S('g', {}, g);
    const la = lewis(c, ga, a, 0, y, { olcek: k, vurgu: o.vurgu !== false }), lb = lewis(c, gb, b, 0, y, { olcek: k, vurgu: o.vurgu !== false });
    const bos = (o.bosluk || 70) * k, top = la.w * 2 + bos + lb.w * 2, xa = x - top / 2 + la.w, xb = x + top / 2 - lb.w;
    ga.setAttribute('transform', `translate(${xa},0)`); gb.setAttribute('transform', `translate(${xb},0)`);
    const z = cekim(c, g, [xa + la.w + 8, y], [xb - lb.w - 8, y], { w: 5 });
    return { g, la, lb, cizgi: z, xa, xb };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const p1 = cift(c, svg, 'O2', 'O2', 500, 280, { olcek: 1.5, bosluk: 110, harf: false });
    const su = uzayDolgu(c, svg, 'H2O', 500, 280, { olcek: 2.4 });
    Gz(p1.g, su.g);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), B(c, p1.g, 600));
    await c.choice({
      tag: 'Hatırla', q: 'Apolar moleküller arasında etkin olan çekim hangisidir?',
      options: ['Dipol-dipol', 'İyon-dipol', 'London kuvveti'], answer: 2,
      hints: ['Apolar tanecikler arasında London kuvveti etkindir.', 'Apolar tanecikler arasında London kuvveti etkindir.', ''],
      right: 'Evet. Apolar tanecikler arasında London kuvveti etkindir.',
    });
    c.clearSay();
    await B(c, p1.g, 400, 0);
    await B(c, su.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'H<sub>2</sub>O\'da oksijenin kaç ortaklanmamış çifti vardır?',
      options: ['1', '2', '4'], answer: 1,
      hints: ['Oksijenin kalan dört elektronu iki ortaklanmamış çift olur.', '', 'Oksijenin kalan dört elektronu iki ortaklanmamış çift olur.'],
      right: 'Evet. Oksijenin kalan dört elektronu iki ortaklanmamış çift olur.',
    });
    await c.say('Bugün dipol-dipol etkileşimlerinin güçlü bir grubuna bakacağız.', { speak: '[curious] Bugün dipol-dipol etkileşimlerinin güçlü bir grubuna bakacağız.' });
  }

  /* ---- 2. Güçlü bir dipol-dipol ---- */
  async function guclu(c) {
    const svg = c.svg(1000, 562);
    const kz = hidrojenBagiZinciri(c, svg, 230, 385, { olcek: 0.95 });
    const m0 = kz.mol[0], m1 = kz.mol[1];
    const soluk = c.S('g', {}, svg);
    cift(c, soluk, 'H2S', 'H2S', 780, 470, { olcek: 0.7, bosluk: 80, harf: false });
    const halka = (P, r) => c.S('circle', { cx: P[0], cy: P[1], r, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, svg);
    const hH = halka(m0.H1, 30), hO = halka(m1.O, 38);
    const lb = yazi(c, svg, 760, 330, 'hidrojen bağı', { size: 28, kalin: 700, renk: RENK.cekme });
    const lb2 = cizgi(c, svg, [690, 322], [(kz.mol[1].H1[0] + kz.mol[2].O[0]) / 2 + 12, (kz.mol[1].H1[1] + kz.mol[2].O[1]) / 2 + 8], RENK.cekme, 2);
    const lc = yazi(c, svg, 110, 290, 'O–H bağı', { size: 28, kalin: 700 });
    const ok0 = cizgi(c, svg, [165, 298], [(m0.O[0] + m0.H1[0]) / 2 - 6, (m0.O[1] + m0.H1[1]) / 2 - 8], RENK.cizgi, 2);
    Gz(kz.kG, kz.icG, kz.deltaG, kz.hbG, soluk, hH, hO, lb, lb2, lc, ok0);
    await par(c.say('H<sub>2</sub>S de H<sub>2</sub>O da polardır; ikisi de dipol-dipol kurar.', { speak: 'H iki S de H iki O da polardır; ikisi de dipol-dipol kurar.' }),
      B(c, [kz.kG, kz.icG, kz.deltaG], 600).then(() => B(c, soluk, 500, 0.35)));
    await par(c.say('Suda hidrojen, doğrudan elektronegatif bir oksijen atomuna bağlıdır.'), (async () => { kz.ic[0].setAttribute('stroke', 'var(--c5)'); kz.ic[1].setAttribute('stroke', 'var(--c5)'); })());
    await par(c.say('Böyle bir hidrojen, güçlü bir artı kutup olur.'), B(c, hH, 400));
    await par(c.say('Komşu su molekülünün oksijeni, ortaklanmamış çiftleriyle yoğun eksi kutuptur.'), B(c, hO, 400));
    kz.ic[0].setAttribute('stroke', RENK.cizgi); kz.ic[1].setAttribute('stroke', RENK.cizgi);
    await par(c.say('Aralarındaki çekim, dipol-dipol etkileşiminden çok daha güçlüdür.'), B(c, [hH, hO], 300, 0).then(() => B(c, kz.hbG, 600)));
    await par(c.say('Bu güçlü etkileşime hidrojen bağı denir.'), B(c, [lb, lb2], 500));
    await c.say('Hidrojen bağı, dipol-dipol etkileşimlerinin ayrı bir grubudur.');
    await par(c.say('Hidrojen bağı komşu moleküller arasındadır; O–H bağı molekülün içindedir.', { speak: 'Hidrojen bağı komşu moleküller arasındadır; O H bağı molekülün içindedir.' }), B(c, [lc, ok0], 500));

    // Birlikte çöz: HF–HF.
    c.clearSay();
    await B(c, [kz.kG, kz.icG, kz.deltaG, kz.hbG, soluk, lb, lb2, lc, ok0], 450, 0);
    const p = lewisCift(c, svg, 'HF', 'HF', 500, 150, 1.9, { bosluk: 40 });
    const s1 = yazi(c, svg, 500, 300, '1. Hidrojen F\'ye bağlı: F–H var.', { size: 26, kalin: 600 });
    const s2 = yazi(c, svg, 500, 352, '2. Komşu molekülde ortaklanmamış çiftli F var.', { size: 26, kalin: 600 });
    const s3 = yazi(c, svg, 500, 430, 'Etkileşim: ?', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(p.g, p.cizgi, s1, s2, s3);
    await B(c, [p.g, s1, s2, s3], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'HF molekülleri arasında hangi etkileşim vardır?',
      options: ['Dipol-dipol; hidrojen bağı yok', 'Hidrojen bağı', 'London kuvveti'], answer: 1,
      hints: ['F–H bağı varsa dipol-dipolün güçlü grubu olan hidrojen bağı da kurulur.', '', 'HF polar bir moleküldür; hidrojen doğrudan florun yanında.'],
      right: 'Evet. Hidrojen doğrudan florun yanında.',
    });
    s3.textContent = 'Etkileşim: hidrojen bağı';
    await par(c.say('HF molekülleri birbirleriyle hidrojen bağı kurar.', { speak: 'H F molekülleri birbirleriyle hidrojen bağı kurar.' }), B(c, p.cizgi, 500));
  }

  /* ---- 3. Hangi moleküller kurar? ---- */
  async function hangi(c) {
    const svg = c.svg(1000, 562);
    const X = [170, 500, 830];
    const baslik = yazi(c, svg, 500, 90, 'F–H   O–H   N–H', { size: 44, kalin: 700, renk: RENK.vurgu });
    const g1 = ['H2O', 'NH3', 'HF'].map((ad, i) => { const g = c.S('g', {}, svg); lewis(c, g, ad, X[i], 250, { olcek: 1.15, vurgu: true }); yazi(c, g, X[i], 450, FORM[ad], { size: 34, kalin: 700, math: true }); return g; });
    const g2 = ['H2S', 'HCl', 'CH4'].map((ad, i) => { const g = c.S('g', {}, svg); lewis(c, g, ad, X[i], 250, { olcek: 1.15, vurgu: true }); yazi(c, g, X[i], 450, FORM[ad], { size: 34, kalin: 700, math: true }); return g; });
    Gz(baslik, g1, g2);
    await par(c.say('Bir molekül F–H, O–H ya da N–H bağı taşıyorsa hidrojen bağı kurabilir.', { speak: 'Bir molekül flor hidrojen, oksijen hidrojen ya da azot hidrojen bağı taşıyorsa hidrojen bağı kurabilir.' }), B(c, baslik, 600));
    await par(c.say('Su iki O–H, amonyak üç N–H, HF bir F–H bağı taşır.', { speak: 'Su iki oksijen hidrojen, amonyak üç azot hidrojen, H F bir flor hidrojen bağı taşır.' }), B(c, g1, 700));
    await par(B(c, g1, 400, 0), B(c, baslik, 400, 0.3), c.say('H<sub>2</sub>S, HCl ve CH<sub>4</sub> hidrojen içerir; ama bu üç bağdan birini taşımaz.', { speak: 'H iki S, H Cl ve C H dört hidrojen içerir; ama bu üç bağdan birini taşımaz.' }), B(c, g2, 700));
    await c.say('Hidrojenin F, O ya da N\'ye bağlı olması gerekir.', { speak: 'Hidrojenin flor, oksijen ya da azota bağlı olması gerekir.' });
    c.clearSay();
    await B(c, [g1, g2, baslik], 400, 0);
    await c.choice({
      tag: 'Sıra sende', q: 'Hidrojen bağı kurabilen molekülleri hangi ölçüt ayırır?',
      options: ['Yapısında hidrojen bulunması', 'Molekülün polar olması', 'Yapısında F–H, O–H ya da N–H bağı bulunması'], answer: 2,
      hints: ['H₂S ve HCl de hidrojen içerir ve polardır.'.replace('H₂S', 'H<sub>2</sub>S'), 'H₂S ve HCl de polardır.'.replace('H₂S', 'H<sub>2</sub>S') + ' Hidrojenin bağlı olduğu atoma bak.', ''],
      right: 'Evet. Ölçüt, hidrojenin bağlı olduğu atomdur.',
    });
    await c.say('Ölçüt, hidrojenin bağlı olduğu atomdur: F, O ya da N.', { speak: 'Ölçüt, hidrojenin bağlı olduğu atomdur: flor, oksijen ya da azot.' });

    // Dene.
    c.clearSay();
    const K = [
      ['H2O', 0, 'O–H bağı var.'], ['NH3', 0, 'N–H bağı var.'], ['HF', 0, 'F–H bağı var.'],
      ['H2S', 1, 'Hidrojen kükürte bağlı; S–H, ölçütteki üç bağdan değil.'], ['HCl', 1, 'Hidrojen klora bağlı; Cl–H, ölçütteki üç bağdan değil.'],
      ['CH4', 1, 'Hidrojenler karbona bağlı; C–H, ölçütteki üç bağdan değil.'], ['H2', 1, 'Hidrojen hidrojene bağlı; H–H, ölçütteki üç bağdan değil.'],
    ];
    const KART = K.map(([ad, kutu_, neden]) => ({ ad, kutu: kutu_, neden, f: FORM[ad], html: html(ad), ipucu: 'Hidrojenin bağlı olduğu atoma bak: F, O ya da N mi?' }));
    const st = kartTahtasi(c, svg, {
      kutular: [{ x: 40, y: 290, w: 440, h: 250, baslik: 'hidrojen bağı kurabilir', punto: 26, kol: 4, ust: 90, satir: 46 }, { x: 520, y: 290, w: 440, h: 250, baslik: 'kuramaz', punto: 26, kol: 4, ust: 90, satir: 46 }],
      kart: { x: 500, y: 125 }, fY: 118, kartPunto: 34, chipPunto: 24,
      ciz: (k, g) => { lewis(c, g, k.ad, 500, 125, { olcek: 0.8, vurgu: true }); },
    });
    Gz(st.kutularEl.map((e) => e.g));
    await B(c, st.kutularEl.map((e) => e.g), 600);
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: ['Kurabilir', 'Kuramaz'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> molekülü hidrojen bağı kurabilir mi?`,
      sec: (i, k) => st.sec(i, k), yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await c.say('Hidrojen içeren her molekül hidrojen bağı kuramaz.');
    c.note('<b>F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulur.</b> Örnek: H<sub>2</sub>O–H<sub>2</sub>O.', 'Hidrojen bağı', 'hidrojen-bagi');
  }

  /* ---- 4. Çiftlere bak ---- */
  async function ciftlere(c) {
    const svg = c.svg(1000, 562);
    const ornek = (a, b) => { const q = lewisCift(c, svg, a, b, 500, 260, 1.6, { bosluk: 60 }); Gz(q.g); return q; };
    const e1 = ornek('H2O', 'H2O'), e2 = ornek('HCl', 'HCl'), e3 = ornek('F2', 'HF');
    await par(c.say('İki molekül de F–H, O–H ya da N–H bağı taşımalıdır.', { speak: 'İki molekül de flor hidrojen, oksijen hidrojen ya da azot hidrojen bağı taşımalıdır.' }), B(c, e1.g, 600));
    await par(c.say('Bu koşul yoksa polar moleküller yalnızca dipol-dipol kurar.'), B(c, e1.g, 300, 0).then(() => B(c, e2.g, 600)));
    await par(c.say('Biri apolarsa dipol-indüklenmiş dipol oluşur.'), B(c, e2.g, 300, 0).then(() => B(c, e3.g, 600)));
    c.clearSay();
    await B(c, e3.g, 400, 0);
    const q = lewisCift(c, svg, 'H2O', 'CH4', 500, 260, 1.5, { bosluk: 60 }); Gz(q.g, q.cizgi);
    await B(c, q.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'H<sub>2</sub>O ile CH<sub>4</sub> arasında hidrojen bağı oluşur mu?',
      options: ['Oluşur; ikisi de hidrojen içerir', 'Oluşur; H<sub>2</sub>O polardır', 'Oluşmaz; CH<sub>4</sub>\'te F–H, O–H ya da N–H bağı yok'], answer: 2,
      hints: ['İki molekülün de ölçütteki bağlardan birini taşıması gerekir.', 'İki molekülün de ölçütteki bağlardan birini taşıması gerekir.', ''],
      right: 'Evet. CH<sub>4</sub>\'te hidrojenler karbona bağlı.',
    });
    await par(c.say('İki taraf da F–H, O–H ya da N–H taşımıyorsa hidrojen bağı yoktur.', { speak: 'İki taraf da flor hidrojen, oksijen hidrojen ya da azot hidrojen taşımıyorsa hidrojen bağı yoktur.' }), B(c, q.cizgi, 400, 0.3));

    // Dene.
    c.clearSay();
    await B(c, q.g, 400, 0);
    const SINIF = ['hidrojen bağı', 'dipol-dipol (hidrojen bağı yok)', 'dipol-dipol değil'];
    const K = [
      ['F2', 'HF', 2, 'F<sub>2</sub> apolar: HF ile dipol-indüklenmiş dipol kurar; F<sub>2</sub>\'de F–H bağı yok.'], ['NH3', 'H2O', 0, 'İkisi de N–H ya da O–H taşıyor.'],
      ['H2O', 'H2O', 0, 'İkisi de O–H taşıyor.'], ['HF', 'HF', 0, 'İkisi de F–H taşıyor.'], ['NH3', 'NH3', 0, 'İkisi de N–H taşıyor.'],
      ['H2S', 'H2S', 1, 'İki polar molekül; S–H, ölçütteki bağlardan değil.'], ['HCl', 'HCl', 1, 'İki polar molekül; Cl–H, ölçütteki bağlardan değil.'],
      ['HCl', 'H2S', 1, 'İki polar molekül; ikisinde de ölçütteki bağlardan yok.'],
    ];
    const KART = K.map(([a, b, kutu_, neden]) => ({ a, b, kutu: kutu_, neden, f: cf(a, b), html: ch(a, b), ipucu: 'İki molekülde de F–H, O–H ya da N–H bağı var mı?' }));
    const st = kartTahtasi(c, svg, {
      kutular: [0, 1, 2].map((i) => ({ x: 30 + i * 325, y: 300, w: 305, h: 240, baslik: SINIF[i], punto: i === 1 ? 20 : 24, kol: 2, ust: 96, satir: 46 })),
      kart: { x: 500, y: 125 }, fY: 120, kartPunto: 34, chipPunto: 22,
      ciz: (k, g) => { lewisCift(c, g, k.a, k.b, 500, 125, 0.62, { bosluk: 70 }); },
    });
    Gz(st.kutularEl.map((e) => e.g));
    await B(c, st.kutularEl.map((e) => e.g), 600);
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: SINIF, kartlar: KART,
      soru: (k) => `<b>${k.html}</b> çifti hangi kutuya girer?`,
      sec: (i, k) => st.sec(i, k), yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await c.say('Hidrojen bağı, dipol-dipol etkileşimlerinin içinde ayrı gruptur.');
  }

  /* ---- 5. Aynı moleküller mi, farklı moleküller mi? ---- */
  async function ayniFarkli(c) {
    const svg = c.svg(1000, 562);
    const SINIF = ['aynı moleküller arasında', 'farklı moleküller arasında'];
    const K = [['NH3', 'NH3', 0, 'İkisi de amonyak.'], ['H2O', 'H2O', 0, 'İkisi de su.'], ['HF', 'HF', 0, 'İkisi de HF.'], ['NH3', 'H2O', 1, 'Biri amonyak, biri su; ikisi de hidrojen bağı kurabilir.']];
    const KART = K.map(([a, b, kutu_, neden]) => ({ a, b, kutu: kutu_, neden, f: cf(a, b), html: ch(a, b), ipucu: 'İki molekül aynı mı, farklı mı?' }));
    const st = kartTahtasi(c, svg, {
      kutular: [0, 1].map((i) => ({ x: 40 + i * 480, y: 300, w: 440, h: 240, baslik: SINIF[i], punto: 26, kol: 2, ust: 96, satir: 50 })),
      kart: { x: 500, y: 125 }, fY: 120, kartPunto: 34, chipPunto: 26,
      ciz: (k, g) => { lewisCift(c, g, k.a, k.b, 500, 125, 0.62, { bosluk: 70 }); },
    });
    const pA = lewisCift(c, svg, 'H2O', 'H2O', 260, 130, 0.6, { bosluk: 60 }), pB = lewisCift(c, svg, 'NH3', 'H2O', 740, 130, 0.6, { bosluk: 60 });
    Gz(st.kutularEl.map((e) => e.g), pA.g, pB.g);
    await par(c.say('Hidrojen bağı aynı ya da farklı moleküller arasında kurulur.'), B(c, [st.kutularEl.map((e) => e.g), pA.g, pB.g], 600));
    await c.say('Su molekülleri kendi aralarında, su ile amonyak da birbiriyle kurar.');
    c.clearSay();
    await B(c, [pA.g, pB.g], 350, 0);
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: SINIF, kartlar: KART,
      soru: (k) => `<b>${k.html}</b> çifti hangi kutuya girer?`,
      sec: (i, k) => st.sec(i, k), yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await c.say('Hidrojen bağı için moleküllerin aynı türden olması gerekmez.');
  }

  /* ---- 6. DNA'nın iki zinciri ---- */
  async function dna(c) {
    const svg = c.svg(1000, 562);
    const d = dnaMerdiven(c, svg, [['A', 'T'], ['G', 'C'], ['T', 'A'], ['C', 'G']], { x: 260, y: 60, w: 190, h: 440 });
    const t0 = yazi(c, svg, 500, 300, 'DNA', { size: 72, kalin: 700, renk: RENK.vurgu });
    const lz = yazi(c, svg, 70, 40, 'şeker ve fosfat', { size: 22, kalin: 700, hiza: 'start' });
    const lz2 = cizgi(c, svg, [100, 52], [150, 86], RENK.cizgi, 2);
    const lb = yazi(c, svg, 430, 70, 'azotlu bazlar', { size: 22, kalin: 700, hiza: 'start', renk: RENK.vurgu });
    const lb2 = cizgi(c, svg, [430, 76], [330, 112], RENK.vurgu, 2);
    const AD = [['A', 'adenin'], ['T', 'timin'], ['G', 'guanin'], ['C', 'sitozin']];
    const lg = AD.map(([h, ad], i) => { const g = c.S('g', {}, svg); G.baz(c, g, h, 640, 150 + i * 70, 56, 40, 26); yazi(c, g, 690, 159 + i * 70, ad, { size: 28, kalin: 700, hiza: 'start' }); return g; });
    const b1 = bazCifti(c, svg, 'A', 'T', 730, 190, 240), b2 = bazCifti(c, svg, 'G', 'C', 730, 340, 240);
    Gz(d.zG, d.bG, d.hG, t0, lz, lz2, lb, lb2, lg, b1.g, b2.g);
    await par(c.say('DNA, kalıtsal özellikleri taşıyan bir moleküldür.'), B(c, t0, 600));
    await par(c.say('Sarmal bir merdivene benzer; iki zincirden oluşur.'), B(c, t0, 300, 0).then(() => B(c, d.zG, 700)));
    await par(c.say('Şeker ve fosfattan oluşan zincir dışta, azotlu bazlar basamaklardadır.'), B(c, [lz, lz2], 500).then(() => B(c, [d.bG, lb, lb2], 700)));
    await par(c.say('Dört baz vardır: adenin (A), timin (T), guanin (G), sitozin (C).'), B(c, [lz, lz2, lb, lb2], 300, 0).then(() => B(c, lg, 700)));
    await par(c.say('A–T ve G–C arasındaki hidrojen bağları iki zinciri birleştirir.', { speak: 'A T ve G C arasındaki hidrojen bağları iki zinciri birleştirir.' }),
      B(c, lg, 300, 0).then(() => B(c, [d.hG, b1.g, b2.g], 700)));
    await c.say('Bu bağlar, genetik kodu korur.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'DNA\'nın iki zincirini birleştiren hidrojen bağları hangi bazlar arasındadır?',
      options: ['A–G ve T–C', 'A–T ve G–C', 'A–C ve T–G'], answer: 1,
      hints: ['Metinde iki baz çifti geçti: A ile T, G ile C.', '', 'Metinde iki baz çifti geçti: A ile T, G ile C.'],
      right: 'Evet. Bağlar A–T ve G–C arasındadır.',
    });
    await c.say('İki zinciri hidrojen bağları bir arada tutar.');
  }

  Ders.start({
    id: 'cesitlilik-g4', kicker: 'Konu G · Moleküller arası etkileşimler', title: 'Hidrojen bağı', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Hidrojen bağı',
      hook: 'DNA\'nın iki zincirini bir fermuar gibi bir arada tutan ne?',
      button: 'Derse başla ›',
    },
    goals: ['Hidrojen bağını dipol-dipol etkileşimlerinin ayrı bir grubu olarak tanır.', 'F–H, O–H ve N–H bağı taşıyan molekülleri ayırt eder.', 'Hidrojen bağının aynı ya da farklı moleküller arasında kurulduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'London kuvvetini ve ortaklanmamış çifti hatırla.', run: hatirla },
      { title: 'Güçlü bir dipol-dipol', goal: 'Hidrojen bağını tanı.', run: guclu },
      { title: 'Hangi moleküller kurar?', goal: 'Hidrojen bağı kurabilen molekülleri ayır.', run: hangi },
      { title: 'Çiftlere bak', goal: 'Çiftlerdeki etkileşimi belirle.', run: ciftlere },
      { title: 'Aynı moleküller mi, farklı moleküller mi?', goal: 'Hidrojen bağının iki molekül türünde de kurulduğunu gör.', run: ayniFarkli },
      { title: 'DNA\'nın iki zinciri', goal: 'DNA\'daki hidrojen bağlarını tanı.', run: dna },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'H<sub>2</sub>O ile HF karıştırılıyor. Farklı moleküller arasında hidrojen bağı oluşur mu?',
        options: ['Oluşmaz; moleküller farklı türden', 'Oluşur; ikisi de O–H ya da F–H bağı taşır', 'Oluşmaz; yalnızca aynı moleküller arasında oluşur'], answer: 1,
        why: ['Hidrojen bağı için moleküllerin aynı türden olması gerekmez.', 'İkisi de ölçütteki bağlardan birini taşır; farklı moleküller de hidrojen bağı kurar.', 'Hidrojen bağı aynı ya da farklı moleküller arasında kurulur.'], scene: 4 },
      { q: 'H<sub>2</sub>S\'te iki hidrojen vardır. H<sub>2</sub>S molekülleri arasında hidrojen bağı oluşur mu?',
        options: ['Oluşur; H<sub>2</sub>S hidrojen içerir', 'Oluşur; H<sub>2</sub>S polardır', 'Oluşmaz; hidrojen F, O ya da N\'ye değil kükürte bağlı'], answer: 2,
        why: ['Hidrojen içermek yetmez; hidrojenin F, O ya da N\'ye bağlı olması gerekir.', 'Polar olmak yetmez; H<sub>2</sub>S polardır ama yalnızca dipol-dipol kurar.', 'S–H, ölçütteki üç bağdan biri değil; H<sub>2</sub>S hidrojen bağı kuramaz.'], scene: 2 },
      { q: 'Su molekülündeki O–H bağı ile komşu su molekülleri arasındaki hidrojen bağı için hangisi doğrudur?',
        options: ['İkisi de aynı bağdır', 'O–H molekülün içindedir; hidrojen bağı komşu moleküller arasındadır', 'İkisi de komşu moleküller arasındadır'], answer: 1,
        why: ['O–H bağı atomları molekülün içinde tutar; hidrojen bağı ise ayrı moleküller arasındadır.', 'O–H bağı molekülün içindedir; hidrojen bağı komşu moleküller arasındadır.', 'O–H bağı komşu molekülleri değil, bir molekülün atomlarını bağlar.'], scene: 1 },
      { q: 'Hangisi hidrojen bağı kurabilir?',
        options: ['CH<sub>4</sub>', 'HCl', 'NH<sub>3</sub>'], answer: 2,
        why: ['CH<sub>4</sub>\'te hidrojenler karbona bağlı; C–H ölçütteki bağlardan değil.', 'HCl\'de hidrojen klora bağlı; Cl–H ölçütteki bağlardan değil.', 'NH<sub>3</sub> N–H bağı taşır; hidrojen bağı kurabilir.'], scene: 2 },
      { q: 'DNA\'nın iki zincirini ne birleştirir?',
        options: ['A–T ve G–C arasındaki hidrojen bağları', 'A–T ve G–C arasındaki iyonik bağlar', 'Şeker ve fosfat arasındaki London kuvvetleri'], answer: 0,
        why: ['Bazlar arasındaki hidrojen bağları iki zinciri birleştirir ve genetik kodu korur.', 'Zincirleri birleştiren iyonik bağ değil, hidrojen bağlarıdır.', 'Şeker ve fosfat zincirin kendisini oluşturur; iki zinciri bazlar arası hidrojen bağları birleştirir.'], scene: 5 },
    ],
    summary: ['Hidrojen bağı için F–H, O–H ya da N–H bağı gerekir.', 'Hidrojen içeren her molekül kuramaz.', 'Hidrojen bağı komşu moleküller arasındadır; dipol-dipolden güçlüdür.', '<b>F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir.</b>'],
    nextLesson: { href: 'g5-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
