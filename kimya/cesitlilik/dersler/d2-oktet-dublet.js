/* D2 — Oktet ve dublet: Lewis yapısını kur
   Atomlar çevrelerini hidrojende 2'ye (dublet), öbürlerinde 8'e (oktet) tamamlamaya çalışır; bu kural Lewis yapısını
   kurmanın ve denetlemenin ölçütüdür.
   Senaryo: plan/kimya/cesitlilik/senaryolar/D-lewis-nokta-yapisi.md (D2). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Kendin kur sahnesi sürükleme yerine adım adım seçimle kurulur. Araçlar: d-araclar.js (KIT_D). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, gizle, belir, par, isaret } = window.KIT;
  const D = window.KIT_D;

  const say = (c, html, speak) => c.say(html, speak ? { speak } : undefined);
  const sil = (c, el, ms = 400) => belir(c, el, ms, 0);

  /* Kesikli halkaları tek tek kuran yardımcı: her atom için halka ve sayaç. */
  function halkalar(m, R, sayaclar) { return m.atomlar.map((_, i) => m.halka(i, R, { metin: '', sayac: sayaclar[i] })); }
  const parlat = (liste, a) => liste.forEach((d) => d.isaret(a));

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const o2 = D.molekul(c, svg, D.sablon('O2', 500, 250, 170, { size: 60 }));
    gizle(o2.g);
    await par(say(c, 'Başlamadan önce iki şeyi hatırlayalım.'), belir(c, o2.g, 500));
    await c.choice({
      tag: 'Hatırla', q: 'O<sub>2</sub>\'de iki oksijen arasında kaç ortaklanmış çift vardır?',
      options: ['1', '2', '4'], answer: 1,
      hints: ['Bir atom, bu moleküllerde hep aynı sayıda ortaklanmış çift yapar; oksijen 2 yapar.', '', 'Bir atom, bu moleküllerde hep aynı sayıda ortaklanmış çift yapar; oksijen 2 yapar.'],
      right: 'Evet. Oksijen 2 ortaklanmış çift yapar.',
    });
    o2.kapsulIsaret(o2.baglar, true); await c.wait(1200); o2.kapsulIsaret(o2.baglar, false);
    await c.choice({
      tag: 'Hatırla', q: 'Atomların elektronları ortak kullandığı bağ hangisidir?',
      options: ['İyonik bağ', 'Metalik bağ', 'Kovalent bağ'], answer: 2,
      hints: ['Kovalent bağda elektron verilmez, ortak kullanılır.', 'Kovalent bağda elektron verilmez, ortak kullanılır.', ''],
      right: 'Evet. Kovalent bağda elektronlar ortak kullanılır.',
    });
    await c.wait(400);
    await say(c, 'Bugün her atomun neden bu sayıda ortaklanmış çift yaptığını göreceğiz.', '[curious] Bugün her atomun neden bu sayıda ortaklanmış çift yaptığını göreceğiz.');
  }

  /* ---- 2. Atomun çevresindeki noktalar ---- */
  async function cevre(c) {
    const svg = c.svg(1000, 562);
    const S = { size: 34 };
    const h2 = D.molekul(c, svg, D.sablon('H2', 250, 140, 84, S)), cl2 = D.molekul(c, svg, D.sablon('Cl2', 740, 140, 84, S));
    const hcl = D.molekul(c, svg, D.sablon('HCl', 250, 400, 84, S)), ncl = D.molekul(c, svg, D.sablon('NCl3', 740, 320, 84, S));
    const ust = [0, -72], alt = [0, 72];
    const rH = halkalar(h2, 54, [ust, ust]), rC = halkalar(cl2, 54, [ust, ust]), rK = halkalar(hcl, 54, [ust, ust]), rN = halkalar(ncl, 54, [ust, ust, ust, alt]);
    const hepsi = [h2, cl2, hcl, ncl];
    hepsi.forEach((m) => gizle(m.g));
    await par(say(c, 'Bir atomun çevresindeki bütün noktaları sayalım.'), belir(c, hepsi.map((m) => m.g), 600));
    await par(say(c, 'Ortaklanmış çift, iki atomun da çevresinde sayılır.'), (async () => {
      await belir(c, rH.map((r) => r.g), 500); h2.kapsulIsaret(h2.baglar, true); await c.wait(900); h2.kapsulIsaret(h2.baglar, false);
    })());
    await par(say(c, 'H₂\'de her hidrojenin çevresinde 2 nokta vardır.', 'H iki\'de her hidrojenin çevresinde iki nokta vardır.'), (async () => {
      rH.forEach((r) => { r.sayac.textContent = '2'; }); await c.wait(900);
    })());
    await par(say(c, 'HCl\'de hidrojenin çevresinde 2, klorun çevresinde 8 nokta vardır.', 'H Cl\'de hidrojenin çevresinde iki, klorun çevresinde sekiz nokta vardır.'), (async () => {
      await belir(c, rK.map((r) => r.g), 500); rK[0].sayac.textContent = '2'; rK[1].sayac.textContent = '8'; await c.wait(900);
    })());
    await par(say(c, 'NCl₃\'te azotun ve her klorun çevresinde 8 nokta vardır.', 'N Cl üç\'te azotun ve her klorun çevresinde sekiz nokta vardır.'), (async () => {
      await belir(c, rN.map((r) => r.g), 500); rN.forEach((r) => { r.sayac.textContent = '8'; }); await c.wait(900);
    })());
    // Birlikte çöz: Cl₂'de bir klorun çevresindeki noktalar.
    c.clearSay();
    await belir(c, rC[0].g, 450);
    const nok = [...cl2.atomYalnizNokta(0), ...cl2.baglar[0].dots];
    parlat(nok, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Cl<sub>2</sub>\'de bir klor atomunun çevresinde kaç nokta vardır?',
      options: ['6', '7', '8'], answer: 2,
      hints: ['Ortaklanmış çifti de say; iki atomun çevresinde sayılır.', 'Yedi valans elektronu değil, çevredeki bütün noktalar sorulur.', ''],
      right: 'Evet. 6 ortaklanmamış + 2 ortaklanmış = 8 nokta.',
    });
    parlat(nok, false);
    rC[0].sayac.textContent = '8'; await belir(c, rC[1].g, 450); rC[1].sayac.textContent = '8';
    await c.wait(500);
    await say(c, 'Hidrojenin çevresinde 2, öteki atomlarda 8 nokta görülür.');
  }

  /* ---- 3. Soy gaza benzemek ---- */
  async function soyGaz(c) {
    const svg = c.svg(1000, 562);
    const kok = c.S('g', {}, svg);
    const dub = yazi(c, kok, 250, 44, 'dublet', { size: 30, renk: RENK.vurgu }), okt = yazi(c, kok, 750, 44, 'oktet', { size: 30, renk: RENK.vurgu });
    const He = D.lewis(c, kok, [250, 130], 'He', { size: 52 }); He.hemen(0); He.hemen(0);
    const Ne = D.lewis(c, kok, [750, 130], 'Ne', { size: 52 }); [0, 1, 2, 3].forEach((y) => { Ne.hemen(y); Ne.hemen(y); });
    const eHe = yazi(c, kok, 250, 214, 'valans: 2', { size: 24, renk: RENK.eksi }), eNe = yazi(c, kok, 750, 214, 'valans: 8', { size: 24, renk: RENK.eksi });
    const h2 = D.molekul(c, kok, D.sablon('H2', 250, 400, 84, { size: 34 })), ncl = D.molekul(c, kok, D.sablon('NCl3', 750, 390, 84, { size: 34 }));
    const rh = halkalar(h2, 54, [[0, -72], [0, -72]]), rn = ncl.halka(0, 54, { metin: '8', sayac: [0, -72] });
    const eq = c.S('g', {}, kok);
    cizgi(c, eq, [226, 268], [274, 268], RENK.yazi, 4); cizgi(c, eq, [226, 286], [274, 286], RENK.yazi, 4);
    const eq2 = c.S('g', {}, kok);
    cizgi(c, eq2, [726, 268], [774, 268], RENK.yazi, 4); cizgi(c, eq2, [726, 286], [774, 286], RENK.yazi, 4);
    gizle(kok, h2.g, ncl.g, rh.map((r) => r.g), rn.g, eq, eq2, dub, okt);
    await par(say(c, 'Helyumun valans elektron sayısı 2, öteki soy gazlarınki 8\'dir.', 'Helyumun valans elektron sayısı iki, öteki soy gazlarınki sekizdir.'), belir(c, [kok, He.g, Ne.g, eHe, eNe], 600));
    await say(c, 'Soy gaz atomları kararlıdır.');
    await say(c, 'Atomlar soy gaza benzemek için elektron alır, verir ya da ortaklar.');
    await par(say(c, 'Hidrojen molekülünde her hidrojen çevresini 2 noktaya tamamlar, helyum gibi olur.', 'Hidrojen molekülünde her hidrojen çevresini iki noktaya tamamlar, helyum gibi olur.'), (async () => {
      await belir(c, h2.g, 500); await belir(c, rh.map((r) => r.g), 450); rh.forEach((r) => { r.sayac.textContent = '2'; }); await belir(c, eq, 450);
    })());
    await par(say(c, 'NCl₃\'te azot çevresini 8 noktaya tamamlar, neon gibi olur.', 'N Cl üç\'te azot çevresini sekiz noktaya tamamlar, neon gibi olur.'), (async () => {
      await belir(c, ncl.g, 500); await belir(c, rn.g, 450); await belir(c, eq2, 450);
    })());
    await par(say(c, 'Atomlar çevrelerini 2\'ye tamamlamaya çalışır: dublet kuralı.', 'Atomlar çevrelerini ikiye tamamlamaya çalışır: dublet kuralı.'), belir(c, dub, 450));
    await par(say(c, 'Atomlar çevrelerini 8\'e tamamlamaya çalışır: oktet kuralı.', 'Atomlar çevrelerini sekize tamamlamaya çalışır: oktet kuralı.'), belir(c, okt, 450));
    await c.choice({
      tag: 'Sıra sende', q: 'HF\'de hangi atom dublet, hangisi oktet kuralına uyar?',
      options: ['Hidrojen oktet, flor dublet', 'İkisi de oktet', 'Hidrojen dublet, flor oktet'], answer: 2,
      hints: ['Hidrojenin çevresinde kaç nokta var? Helyum gibi mi, neon gibi mi?', 'Florun çevresinde 6 + 2 nokta var.', ''],
      right: 'Evet. Hidrojen helyum gibi 2, flor neon gibi 8 noktaya tamamlar.',
    });
    c.clearSay();
    await sil(c, [kok, h2.g, ncl.g, ...rh.map((r) => r.g), rn.g, eq, eq2], 450);
    const hf = D.molekul(c, svg, D.sablon('HF', 500, 280, 130, { size: 56 }));
    const rf = halkalar(hf, 80, [[0, -98], [0, -98]]);
    gizle(hf.g); await belir(c, hf.g, 500); await belir(c, rf.map((r) => r.g), 450);
    rf[0].sayac.textContent = '2'; rf[1].sayac.textContent = '8';
    await c.wait(1500);
    c.note('<b>Dublet: çevresi 2 nokta (H). Oktet: çevresi 8 nokta.</b> Örnek: HF.', 'Dublet ve oktet', 'dublet-oktet');
  }

  /* ---- 4. Kaç elektron eksik? ---- */
  async function eksik(c) {
    const svg = c.svg(1000, 562);
    const SATIR = [['H', 1, 2, 1], ['F', 7, 8, 1], ['O', 6, 8, 2], ['N', 5, 8, 3], ['C', 4, 8, 4]];
    const y0 = 120, dy = 85, hx = 190, hw = 48, ara = 6;
    const satirlar = SATIR.map(([s, v, hedef, e], i) => {
      const y = y0 + i * dy, g = c.S('g', {}, svg), hucre = [];
      yazi(c, g, 110, y + 11, s, { size: 34, kalin: 700 });
      for (let k = 0; k < hedef; k++) {
        const dolu = k < v;
        hucre.push(c.S('rect', { x: hx + k * (hw + ara), y: y - 20, width: hw, height: 40, rx: 8, fill: dolu ? RENK.eksi : 'none', 'fill-opacity': dolu ? 0.9 : 1, stroke: RENK.eksi, 'stroke-width': 2.5, 'stroke-dasharray': dolu ? '' : '5 5' }, g));
      }
      const t = yazi(c, g, 700, y + 9, 'eksik: ' + e, { hiza: 'start', size: 28, renk: RENK.vurgu });
      g.style.opacity = 0;
      return { g, hucre, t, v, e, hedef };
    });
    // Eksik kutular, ortaklanmış çiftle dolar.
    const doldur = async (i) => {
      const q = satirlar[i];
      await c.tween(500, (t) => q.hucre.forEach((h, k) => { if (k >= q.v) { h.setAttribute('fill', RENK.eksi); h.setAttribute('fill-opacity', 0.35 * t); h.setAttribute('stroke-dasharray', t > 0.5 ? '' : '5 5'); } }));
      q.t.textContent = 'çift: ' + q.e;
    };
    await say(c, 'Ortaklanmış her çift, atomun çevresine bir nokta daha ekler.');
    await par(say(c, 'Oksijenin 6 valans elektronu var, oktet için 2 eksik.', 'Oksijenin altı valans elektronu var, oktet için iki eksik.'), belir(c, satirlar[2].g, 600));
    await par(say(c, 'Eksik 2 olduğu için oksijen iki ortaklanmış çift yapar.', 'Eksik iki olduğu için oksijen iki ortaklanmış çift yapar.'), doldur(2));
    await par(say(c, 'Hidrojenin 1 valans elektronu var, dublet için 1 eksik.', 'Hidrojenin bir valans elektronu var, dublet için bir eksik.'), belir(c, satirlar[0].g, 600));
    await par(say(c, 'Hidrojen bir ortaklanmış çift yapar.'), doldur(0));
    await par(say(c, 'Eksik sayısı, o atomun ortaklanmış çift sayısıdır.'), belir(c, [satirlar[1].g, satirlar[4].g], 600));
    // Birlikte çöz: azot.
    satirlar[3].t.textContent = 'eksik: ?'; await belir(c, satirlar[3].g, 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Azotun 5 valans elektronu var. Kaç ortaklanmış çift yapar?',
      options: ['5', '2', '3'], answer: 2,
      hints: ['Önce oktete kaç elektron eksik olduğunu bul.', 'Eksik sayısı kadar ortaklanmış çift gerekir.', ''],
      right: 'Evet. Oktet için 3 eksik; 3 ortaklanmış çift.',
    });
    satirlar[3].t.textContent = 'eksik: 3';
    await par(say(c, 'Bu yüzden flor 1, oksijen 2, azot 3, karbon 4 çift yapar.', 'Bu yüzden flor bir, oksijen iki, azot üç, karbon dört çift yapar.'),
      par(doldur(1), doldur(3), doldur(4)));
    await c.choice({
      tag: 'Sıra sende', q: 'Klorun 7 valans elektronu var. Kaç ortaklanmış çift yapar?',
      options: ['7', '8', '1'], answer: 2,
      hints: ['Oktet için 8 − 7 kadar eksik.', 'Eksik sayısı kadar ortaklanmış çift yapılır.', ''],
      right: 'Evet. Oktet için 1 eksik; 1 ortaklanmış çift.',
    });
    c.clearSay();
    await sil(c, satirlar.map((q) => q.g), 450);
    const cl2 = D.molekul(c, svg, D.sablon('Cl2', 250, 270, 170, { size: 56 })), hcl = D.molekul(c, svg, D.sablon('HCl', 740, 270, 170, { size: 56 }));
    gizle(cl2.g, hcl.g); await belir(c, [cl2.g, hcl.g], 500);
    cl2.kapsulIsaret(cl2.baglar, true); hcl.kapsulIsaret(hcl.baglar, true); await c.wait(1500);
    cl2.kapsulIsaret(cl2.baglar, false); hcl.kapsulIsaret(hcl.baglar, false);
    c.note('<b>Ortaklanmış çift sayısı = eksik elektron.</b> Örnek: O, 8−6=2.', 'Eksik sayısı', 'eksik-sayisi');
  }

  /* ---- 5. Kuralla kur: H₂O ve NH₃ ---- */
  async function kur(c) {
    const svg = c.svg(1000, 562);
    const AD = ['1  valans noktaları', '2  ortaklanmış çiftler', '3  ortaklanmamış çiftler', '4  2 ya da 8 denetimi'];
    const adim = AD.map((m, i) => { const t = yazi(c, svg, 690, 160 + i * 80, m, { hiza: 'start', size: 24, kalin: 600 }); t.style.opacity = 0; return t; });
    const goster = (i) => belir(c, adim[i], 400);
    const soluk = (i) => belir(c, adim[i], 400, 0.4);
    const su = D.molekul(c, svg, D.sablon('H2O', 360, 290, 130, { size: 52 }));
    su.hepsiniGizle();
    const rs = halkalar(su, 76, [[0, -92], [0, -92], [0, -92]]);
    const merkez = yazi(c, svg, 360, 135, 'merkez atom', { size: 26, renk: RENK.vurgu }), mc = cizgi(c, svg, [360, 150], [360, 222], RENK.vurgu, 2);
    gizle(merkez, mc);
    await par(say(c, 'Öteki atomların bağlandığı atoma merkez atom denir.'), (async () => {
      await belir(c, su.atomlar.map((A) => A.sembol.g), 500); await belir(c, [merkez, mc], 450);
    })());
    await say(c, 'Su molekülünde merkez atom oksijendir, yanında iki hidrojen vardır.');
    await par(say(c, 'Önce her atomun valans elektronu kadar nokta yazılır.'), (async () => {
      await belir(c, [merkez, mc], 300, 0);
      su.atomikGoster(); gizle(su.atomik.map((d) => d.g)); await par(belir(c, su.atomik.map((d) => d.g), 600), goster(0));
    })());
    await par(say(c, 'Oksijen iki ortaklanmış çift yapar, her hidrojenle bir tane.'), (async () => {
      await su.bagla(1200); await su.kapsulGoster(450); await par(goster(1), soluk(0));
    })());
    await par(say(c, 'Hidrojenler birer çiftle dubleti tamamlar.'), (async () => {
      su.kapsulIsaret(su.baglar, true); await c.wait(1100); su.kapsulIsaret(su.baglar, false);
    })());
    await par(say(c, 'Oksijenin kalan 4 elektronu, iki ortaklanmamış çift olur.', 'Oksijenin kalan dört elektronu, iki ortaklanmamış çift olur.'), (async () => {
      const yo = su.atomYalnizNokta(1); parlat(yo, true); await par(goster(2), soluk(1)); await c.wait(900); parlat(yo, false);
    })());
    await par(say(c, 'Oksijenin çevresinde 2 + 2 çift, yani 8 nokta var.', 'Oksijenin çevresinde iki artı iki çift, yani sekiz nokta var.'), (async () => {
      await par(goster(3), soluk(2), belir(c, rs[1].g, 450)); rs[1].sayac.textContent = '8'; await c.wait(500);
    })());
    await par(say(c, 'Hidrojenlerin çevresinde 2 nokta var: kural tuttu.', 'Hidrojenlerin çevresinde iki nokta var: kural tuttu.'), (async () => {
      await belir(c, [rs[0].g, rs[2].g], 450); rs[0].sayac.textContent = '2'; rs[2].sayac.textContent = '2'; await c.wait(900);
    })());
    c.clearSay();
    await sil(c, [su.g, ...rs.map((r) => r.g)], 450);
    await par(belir(c, adim[0], 300, 0.4), belir(c, adim[1], 300, 0.4), belir(c, adim[3], 300, 0.4));

    // Birlikte çöz: NH₃.
    const nh = D.molekul(c, svg, D.sablon('NH3', 360, 250, 130, { size: 52 }));
    nh.yalnizlariGizle();
    const rn = halkalar(nh, 76, [[0, -92], [0, -92], [0, -92], [0, 92]]);
    gizle(nh.g); await belir(c, nh.g, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'NH<sub>3</sub>\'te azotun 5 valans elektronundan 3\'ü ortaklandı. Kalan 2 elektron nasıl yazılır?',
      options: ['Her biri ayrı bir hidrojene eklenir', 'Yazılmaz', 'Azotun üstünde bir ortaklanmamış çift'], answer: 2,
      hints: ['Hidrojenlerin çevresi zaten 2; ekleme olmaz.', 'Kalan elektronlar atomun çevresinde ortaklanmamış çift olur.', ''],
      right: 'Evet. Kalan 2 elektron, azotun üstünde bir ortaklanmamış çifttir.',
    });
    await par(nh.yalnizGoster(600), belir(c, rn[0].g, 450)); rn[0].sayac.textContent = '8';
    await c.wait(900);
    await say(c, 'Önce ortaklanmış çiftler, sonra ortaklanmamış çiftler yazılır.');
    await par(say(c, 'En son her atomun çevresinde 2 ya da 8 nokta sayılır.', 'En son her atomun çevresinde iki ya da sekiz nokta sayılır.'), (async () => {
      await belir(c, [rn[1].g, rn[2].g, rn[3].g], 450); [1, 2, 3].forEach((i) => { rn[i].sayac.textContent = '2'; }); await c.wait(900);
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'Karbonun 4 valans elektronu var. CH<sub>4</sub>\'te karbonun kaç ortaklanmamış çifti kalır?',
      options: ['2', '4', '0'], answer: 2,
      hints: ['Karbon dört ortaklanmış çift yapıyor; elektronlarının hepsi ortaklandı.', 'Kalan elektron yoksa ortaklanmamış çift de yoktur.', ''],
      right: 'Evet. Karbonun elektronlarının hepsi ortaklandı.',
    });
    c.clearSay();
    await sil(c, [nh.g, ...rn.map((r) => r.g)], 450);
    c.clearSay();
    const ch = D.molekul(c, svg, D.sablon('CH4', 360, 270, 105, { size: 50 })), rc = ch.halka(0, 60, { metin: '8', sayac: [-62, -62] });
    const rh = [1, 2, 3, 4].map((i) => ch.halka(i, 34, { metin: '2', sayac: i === 4 ? [0, 52] : [0, -52] }));
    gizle(ch.g); await par(belir(c, ch.g, 500), belir(c, [rc.g, ...rh.map((r) => r.g)], 500));
    await c.wait(1300);
    c.note('<b>Kur: ortaklanmış çiftler, ortaklanmamış çiftler, 2 ya da 8 denetimi.</b> Örnek: H<sub>2</sub>O.', 'Kurma sırası', 'kurma-sirasi');
  }

  /* ---- 6. Bir atomdan öbürüne birden çok çift: CO₂ ---- */
  async function co2(c) {
    const svg = c.svg(1000, 562);
    const m = D.molekul(c, svg, D.sablon('CO2', 500, 290, 140, { size: 56 }));
    m.hepsiniGizle();
    const sym = m.atomlar.map((A) => A.sembol.g);
    const eC = yazi(c, svg, 500, 215, 'eksik: 4', { size: 26, renk: RENK.vurgu }), eO1 = yazi(c, svg, 332, 215, 'eksik: 2', { size: 26, renk: RENK.vurgu }), eO2 = yazi(c, svg, 668, 215, 'eksik: 2', { size: 26, renk: RENK.vurgu });
    const mo = D.molekul(c, svg, D.sablon('O2', 250, 480, 66, { size: 26 })), mn = D.molekul(c, svg, D.sablon('N2', 750, 480, 56, { size: 26 }));
    gizle(eC, eO1, eO2, mo.g, mn.g);
    const rg = [m.halka(0, 112, { metin: '8', sayac: [0, -130] }), m.halka(1, 112, { metin: '8', sayac: [0, -130] }), m.halka(2, 112, { metin: '8', sayac: [0, -130] })];
    await par(say(c, 'Karbon dioksitte merkez atom karbondur.'), par(belir(c, sym[1], 450), belir(c, eC, 450)));
    await par(say(c, 'İki oksijen, karbonun iki yanına bağlanır.'), par(belir(c, [sym[0], sym[2]], 450), belir(c, [eO1, eO2], 450)));
    await par(say(c, 'Karbonun eksiği 4, her oksijenin eksiği 2\'dir.', 'Karbonun eksiği dört, her oksijenin eksiği ikidir.'), (async () => {
      await c.wait(900);
    })());
    await par(say(c, 'O₂\'de iki atom arasında 2, N₂\'de 3 ortaklanmış çift vardır.', 'O iki\'de iki atom arasında iki, N iki\'de üç ortaklanmış çift vardır.'), belir(c, [mo.g, mn.g], 600));
    await say(c, 'İki atom arasında birden çok ortaklanmış çift olabilir.');
    await c.choice({
      tag: 'Sıra sende', q: 'Karbon, her oksijenle kaç ortaklanmış çift yapar?',
      options: ['1', '4', '2'], answer: 2,
      hints: ['Oksijenin 2 çifte ihtiyacı var, tek ortağı karbon.', 'Karbonun 4 çifti iki oksijene eşit paylaşılır.', ''],
      right: 'Evet. Her oksijenin 2 çifti var; hepsini karbonla yapar.',
    });
    await belir(c, [eC, eO1, eO2, mo.g, mn.g], 400, 0);
    m.atomikGoster(); gizle(m.atomik.map((d) => d.g)); await belir(c, m.atomik.map((d) => d.g), 500);
    await par(say(c, 'Karbon her oksijenle iki ortaklanmış çift yapar.'), (async () => { await m.bagla(1400); await m.kapsulGoster(450); })());
    await par(say(c, 'Her oksijenin kalan 4 elektronu, iki ortaklanmamış çift olur.', 'Her oksijenin kalan dört elektronu, iki ortaklanmamış çift olur.'), (async () => {
      const ys = [...m.atomYalnizNokta(0), ...m.atomYalnizNokta(2)]; parlat(ys, true); await c.wait(1300); parlat(ys, false);
    })());
    await par(say(c, 'Karbonun çevresinde ortaklanmamış çift yoktur, 8 nokta vardır.', 'Karbonun çevresinde ortaklanmamış çift yoktur, sekiz nokta vardır.'), (async () => {
      await belir(c, rg.map((r) => r.g), 550); await c.wait(800);
    })());
  }

  /* ---- 7. Kendin kur: CF₄ ve NF₃ (adım adım seçim) ---- */
  async function kendinKur(c) {
    const svg = c.svg(1000, 562);
    const goster = (liste) => belir(c, liste.flatMap((q) => q.parcalar.map((x) => x.g)), 600);
    const hazirla = (ad, D0) => {
      const m = D.molekul(c, svg, D.sablon(ad, 500, 280, D0, { size: 44 })); m.baglariGizle(); m.yalnizlariGizle();
      const dis = ad === 'CF4' ? [[-68, -68], [-94, 0], [94, 0], [0, -94], [0, 94]] : [[0, -94], [-94, 0], [94, 0], [0, 94]];
      return { m, r: halkalar(m, 76, dis) };
    };
    // CF4.
    const cf = hazirla('CF4', 120);
    await par(say(c, 'Şimdi kuralı kendin uygula: önce CF₄\'ü kur.', 'Şimdi kuralı kendin uygula: önce C F dört\'ü kur.'), (async () => { gizle(cf.m.g); await belir(c, cf.m.g, 500); })());
    await say(c, 'Karbonun eksiği 4, her florun eksiği 1\'dir.', 'Karbonun eksiği dört, her florun eksiği birdir.');
    await say(c, 'Önce ortaklanmış çiftleri, sonra ortaklanmamış çiftleri yerleştir.');
    await c.choice({
      tag: 'Kur', q: 'Karbon, dört flor atomuyla toplam kaç ortaklanmış çift yapar?',
      options: ['2', '1', '4'], answer: 2,
      hints: ['Ortaklanmış çift sayısı, eksik elektron sayısına eşittir.', 'Karbonun oktet için 4 elektronu eksik.', ''],
      right: 'Evet. Karbonun eksiği 4; her flora bir çift.',
    });
    await goster(cf.m.baglar);
    await c.choice({
      tag: 'Kur', q: 'Her flor bir elektronunu ortakladı. Kalan 6 elektron kaç ortaklanmamış çift olur?',
      options: ['3', '6', '1'], answer: 0,
      hints: ['', 'Elektronlar ikişer ikişer çift olur.', 'Altı elektron, üç çifttir.'],
      right: 'Evet. 6 elektron, 3 ortaklanmamış çift.',
    });
    await goster(cf.m.yalnizlar);
    await c.choice({
      tag: 'Kur', q: 'Karbonun 4 elektronunun hepsi ortaklandı. Karbonda ortaklanmamış çift kalır mı?',
      options: ['Kalır, 2 çift', 'Kalmaz', 'Kalır, 1 çift'], answer: 1,
      hints: ['Bu atomun çevresinde 8 nokta olmalı; ortaklanmış çifti de say.', '', 'Bu atomun çevresinde 8 nokta olmalı; ortaklanmış çifti de say.'],
      right: 'Evet. Karbon dört ortaklanmış çiftle zaten 8 noktaya ulaştı.',
    });
    await belir(c, cf.r.map((r) => r.g), 500); cf.r.forEach((r) => { r.sayac.textContent = '8'; });
    await say(c, 'CF₄\'te her atomun çevresinde 8 nokta var.', 'C F dört\'te her atomun çevresinde sekiz nokta var.');
    await c.wait(600);
    await sil(c, [cf.m.g, ...cf.r.map((r) => r.g)], 450);

    // NF3.
    c.clearSay();
    const nf = hazirla('NF3', 120);
    nf.m.atomlar.slice(1).forEach((_, i) => i); // florlar ortaklanmamış çiftleriyle birlikte gelecek
    gizle(nf.m.g); await belir(c, nf.m.g, 500);
    await c.choice({
      tag: 'Kur', q: 'Azotun eksiği 3. Azot, üç flor atomuyla toplam kaç ortaklanmış çift yapar?',
      options: ['3', '5', '2'], answer: 0,
      hints: ['', 'Beş, azotun valans elektron sayısıdır; çift sayısı eksik elektron kadardır.', 'Ortaklanmış çift sayısı, eksik elektron sayısına eşittir.'],
      right: 'Evet. Azotun eksiği 3; her flora bir çift.',
    });
    await goster(nf.m.baglar);
    await par(say(c, 'Her flor, CF₄\'teki gibi üç ortaklanmamış çift yazar.', 'Her flor, C F dört\'teki gibi üç ortaklanmamış çift yazar.'), goster(nf.m.yalnizlar.filter((q) => q.atom !== 0)));
    await c.choice({
      tag: 'Kur', q: 'Azotun 5 valans elektronundan 3\'ü ortaklandı. Azotun kaç ortaklanmamış çifti kalır?',
      options: ['2', '3', '1'], answer: 2,
      hints: ['Bu atomun çevresinde 8 nokta olmalı; ortaklanmış çifti de say.', 'Kalan 2 elektron bir çift eder.', ''],
      right: 'Evet. Kalan 2 elektron, 1 ortaklanmamış çifttir.',
    });
    await goster(nf.m.yalnizlar.filter((q) => q.atom === 0));
    await belir(c, nf.r.map((r) => r.g), 500); nf.r.forEach((r) => { r.sayac.textContent = '8'; });
    await say(c, 'NF₃\'te azotun bir ortaklanmamış çifti var.', 'N F üç\'te azotun bir ortaklanmamış çifti var.');
    await c.wait(500);
  }

  /* ---- 8. Önermeleri sına ---- */
  async function onermeler(c) {
    const svg = c.svg(1000, 562);
    const AD = ['CF4', 'NF3', 'CCl4'], X = [170, 500, 830];
    const M = AD.map((ad, i) => D.molekul(c, svg, D.sablon(ad, X[i], 190, 84, { size: 34 })));
    const harf = ['A', 'B', 'C', 'D'], jx = [215, 405, 595, 785], jt = harf.map((h, i) => { const g = c.S('g', {}, svg); yazi(c, g, jx[i], 470, h, { size: 34, renk: RENK.soluk }); g.style.opacity = 0; return g; });
    M.forEach((m) => gizle(m.g));
    await par(say(c, 'Üç yapıya bakarak dört önermeyi sınayalım.'), belir(c, [...M.map((m) => m.g), ...jt], 600));
    await say(c, 'Bir önerme, bu yapıların hepsiyle uyuşuyorsa doğrudur.');
    const KART = [
      ['Bu üç molekülde her atomun çevresinde 8 nokta vardır.', 0, 'C, N ve F atomlarının halkaları 8.', 'Üç yapıda da C, N, F, Cl atomlarının çevresinde 8 nokta sayılır.'],
      ['Her atomun ortaklanmamış çifti vardır.', 1, 'CF<sub>4</sub> ve CCl<sub>4</sub>\'te karbonun ortaklanmamış çifti yoktur.', 'Karbonun ortaklanmamış çifti var mı, bak.'],
      ['Ortaklanmış çift sayısı, valans elektron sayısına eşittir.', 1, 'Flor 7 valans elektronuyla yalnızca bir çift ortaklar.', 'Flor 7 valans elektronuyla kaç çift ortaklar, say.'],
      ['Ortaklanmış çift sayısı, oktete eksik elektron sayısına eşittir.', 0, 'Karbon 4, azot 3, flor 1 eksik; üçü de o kadar çift yapar.', 'Karbon, azot ve flor için eksik sayısını çift sayısıyla karşılaştır.'],
    ];
    for (let i = 0; i < 4; i++) {
      const [q, dogru, neden, ip] = KART[i];
      await c.choice({
        tag: 'Önerme ' + harf[i], q, options: ['Doğru', 'Yanlış'], answer: dogru,
        hints: dogru === 0 ? ['', ip] : [ip, ''], right: 'Evet. ' + neden,
      });
      const mark = isaret(c, svg, jx[i] + 34, 462, dogru === 0 ? 'ok' : 'no', 17); gizle(mark); await par(belir(c, mark, 350), belir(c, jt[i], 350, 0.5));
    }
    await say(c, 'Kural yeni moleküllerde de tuttu: oktet ve dublet yapıyı belirler.');
  }

  Ders.start({
    id: 'cesitlilik-d2', kicker: 'Konu D · Lewis nokta yapısı', title: 'Oktet ve dublet: Lewis yapısını kur', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Oktet ve dublet: Lewis yapısını kur',
      hook: 'Su molekülünde oksijen neden tam iki hidrojenle bağ yapar, bir ya da üç değil?',
      button: 'Derse başla ›',
    },
    goals: ['Dublet ve oktet kuralını açıklar.', 'Bir atomun ortaklanmış çift sayısını oktete (dublete) eksik elektron sayısından bulur.', 'Verilen bir molekülün Lewis nokta yapısını kurar ve her atomda 2 ya da 8 nokta olduğunu denetler.', 'Önermeleri farklı moleküllerin yapılarıyla sınar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Ortaklanmış çifti ve kovalent bağı hatırla.', run: hatirla },
      { title: 'Atomun çevresindeki noktalar', goal: 'Bir atomun çevresindeki bütün noktaları say.', run: cevre },
      { title: 'Soy gaza benzemek', goal: 'Dublet ve oktet kuralını soy gazlarla bağla.', run: soyGaz },
      { title: 'Kaç elektron eksik?', goal: 'Eksik elektron sayısı ile ortaklanmış çift sayısını bağla.', run: eksik },
      { title: 'Kuralla kur: H₂O ve NH₃', goal: 'Lewis yapısını dört adımda kur.', run: kur },
      { title: 'Bir atomdan öbürüne birden çok çift: CO₂', goal: 'İki atom arasında birden çok ortaklanmış çift gör.', run: co2 },
      { title: 'Kendin kur: CF₄ ve NF₃', goal: 'Kuralı yeni moleküllere uygula.', run: kendinKur },
      { title: 'Önermeleri sına', goal: 'Önermeleri üç yapıyla değerlendir.', run: onermeler },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir molekülde hidrojenin çevresinde kaç nokta olur?',
        options: ['8', '2', '1'], answer: 1,
        why: ['8 oktettir; hidrojen oktete değil dublete uyar.', 'Hidrojen helyum gibi çevresini 2 noktaya tamamlar.', '1 yalnızca hidrojenin valans elektron sayısıdır; ortaklanmış çiftle 2 olur.'], scene: 2 },
      { q: 'CCl<sub>4</sub>\'te her klorun kaç ortaklanmamış çifti vardır?',
        options: ['3', '1', '4'], answer: 0,
        why: ['Klor 1 elektronunu ortaklar, kalan 6 elektron 3 çift eder.', '1 klorun ortaklanmış çift sayısıdır.', 'Dört çift 8 elektron eder; klorun yalnızca 7 valans elektronu var.'], scene: 3 },
      { q: 'Bir X atomunun 6 valans elektronu var. Hidrojenle yaptığı bileşikte X kaç hidrojenle birleşir?',
        options: ['6', '1', '2'], answer: 2,
        why: ['6 valans elektron sayısıdır, ortaklanmış çift sayısı değil.', 'Oktet için 2 elektron eksik; 1 hidrojen yetmez.', 'Eksik 8 − 6 = 2; her hidrojenle bir çift yapar, yani 2 hidrojen.'], scene: 3 },
      { q: 'N<sub>2</sub>\'de iki azot arasında kaç ortaklanmış çift vardır?',
        options: ['3', '1', '5'], answer: 0,
        why: ['Azotun oktete eksiği 3; iki azot arasında 3 çift olur.', '1 çift azotu oktete tamamlamaz.', '5 azotun valans elektron sayısıdır, çift sayısı değil.'], scene: 5 },
      { q: 'Ortaklanmış çift atomların çevresinde nasıl sayılır?',
        options: ['Yalnızca bir atomun çevresinde sayılır', 'İki atomun çevresinde de sayılır', 'Hiçbir atomun çevresinde sayılmaz'], answer: 1,
        why: ['İki atom çifti birlikte kullanır; ikisi de sayar.', 'Çifti iki atom birlikte kullandığı için ikisinin çevresinde de sayılır.', 'Sayılmazsa oktet ve dublet tutmazdı.'], scene: 1 },
    ],
    summary: ['Atomlar çevrelerini hidrojende 2\'ye, öbürlerinde 8\'e tamamlar.', 'Eksik sayısı kadar ortaklanmış çift yapılır.', 'Kalan elektronlar ortaklanmamış çift olur.', '<b>Dublet iki, oktet sekiz elektrona tamamlamaktır.</b>'],
    nextLesson: { href: 'd3-ortaklanmamis-cift.html', label: 'Sonraki: Ortaklanmamış çift ›' },
  });
})();
