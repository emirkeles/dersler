/* D3 — Ortaklanmamış çift molekülü biçimlendirir
   Merkez atomdaki ortaklanmamış çift bağ elektronlarını iter; bu itme molekülün biçimini değiştirir.
   Lewis yapısı kâğıda düz yazılır, uzay-dolgu modeli (küre modeli) molekülün biçimini gösterir.
   Senaryo: plan/kimya/cesitlilik/senaryolar/D-lewis-nokta-yapisi.md (D3). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Model eşleme sahnesi sürükleme yerine kart başına seçimle kurulur (kit.sinifla). Araçlar: d-araclar.js (KIT_D). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, gizle, belir, par, ok, yuk, etkilesim, isaret, sinifla } = window.KIT;
  const D = window.KIT_D;

  const say = (c, html, speak) => c.say(html, speak ? { speak } : undefined);
  const sil = (c, el, ms = 400) => belir(c, el, ms, 0);
  const parlat = (liste, a) => liste.forEach((d) => d.isaret(a));
  const lew = (c, p, ad, x, y, d, size) => D.molekul(c, p, D.sablon(ad, x, y, d, { size }));

  /* Düz yazılmış H₂O: oksijenin iki ortaklanmamış çifti altta yan yana, bağlar iki yanda.
     Dönen dallar (sol, sağ) hidrojen + bağ çifti parçalarıdır; itme okları kendi grubundadır. */
  function suCiz(c, p, cx, cy) {
    const g = c.S('g', {}, p), kapG = c.S('g', {}, g), nokG = c.S('g', {}, g), semG = c.S('g', {}, g), S = 44;
    const O = D.sembolParca(c, semG, cx, cy, 'O', S), H1 = D.sembolParca(c, semG, cx - 112, cy, 'H', S), H2 = D.sembolParca(c, semG, cx + 112, cy, 'H', S);
    const b1 = D.cift(c, nokG, kapG, [cx - 56, cy - 8], [cx - 56, cy + 8], true), b2 = D.cift(c, nokG, kapG, [cx + 56, cy - 8], [cx + 56, cy + 8], true);
    const lA = D.cift(c, nokG, kapG, [cx - 34, cy + 42], [cx - 18, cy + 42], false), lB = D.cift(c, nokG, kapG, [cx + 18, cy + 42], [cx + 34, cy + 42], false);
    const oklar = c.S('g', {}, g);
    ok(c, oklar, [cx - 30, cy + 30], [cx - 62, cy + 12], RENK.itme, 4); ok(c, oklar, [cx + 30, cy + 30], [cx + 62, cy + 12], RENK.itme, 4);
    oklar.style.opacity = 0;
    return { g, O, H1, H2, b1, b2, lA, lB, oklar, dallar: [[H1, ...b1.parcalar], [H2, ...b2.parcalar]], lone: [...lA.dots, ...lB.dots] };
  }
  const kaydir = (c, dal, dx, dy, ms = 1200) => D.tasi(c, dal.map((q) => [q, q.x + dx, q.y + dy]), ms);

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const su = lew(c, svg, 'H2O', 500, 230, 150, 56);
    gizle(su.g);
    await par(say(c, 'Başlamadan önce iki şeyi hatırlayalım.'), belir(c, su.g, 500));
    await c.choice({
      tag: 'Hatırla', q: 'H<sub>2</sub>O\'da merkez atom olan oksijenin kaç ortaklanmamış çifti vardır?',
      options: ['4', '2', '0'], answer: 1,
      hints: ['Oksijenin kalan 4 elektronu, iki ortaklanmamış çift olur.', '', 'Oksijenin kalan 4 elektronu, iki ortaklanmamış çift olur.'],
      right: 'Evet. Oksijenin iki ortaklanmamış çifti var.',
    });
    const yo = su.atomYalnizNokta(1); parlat(yo, true); await c.wait(1200); parlat(yo, false);
    await sil(c, su.g, 400);
    const e = c.S('g', {}, svg), E1 = [430, 230], E2 = [570, 230];
    yuk(c, e, E1, 'eksi', 22); yuk(c, e, E2, 'eksi', 22);
    const it = etkilesim(c, e, E1, E2, 'itme', { b: 26, boy: 60 });
    gizle(e, it); await belir(c, e, 450);
    await c.choice({
      tag: 'Hatırla', q: 'İki elektron birbirine yaklaşırsa aralarındaki kuvvet nasıl olur?',
      options: ['Çekme', 'Kuvvet olmaz', 'İtme'], answer: 2,
      hints: ['İkisi de eksi yüklüdür; aynı yükler birbirini iter.', 'İkisi de eksi yüklüdür; aynı yükler birbirini iter.', ''],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    await belir(c, it, 450); await c.wait(900);
    await say(c, 'Bugün bu itmenin molekülün biçimini nasıl değiştirdiğine bakacağız.', '[curious] Bugün bu itmenin molekülün biçimini nasıl değiştirdiğine bakacağız.');
  }

  /* ---- 2. Lewis yazılışı ve model ---- */
  async function yazilisVeModel(c) {
    const svg = c.svg(1000, 562);
    const A = c.S('g', {}, svg), B = c.S('g', {}, svg);
    const ch = lew(c, A, 'CH4', 250, 150, 62, 32), nh = lew(c, A, 'NH3', 250, 400, 62, 32);
    const mch = D.model(c, A, 'CH4', 700, 150, 1.15), mnh = D.model(c, A, 'NH3', 700, 400, 1.15);
    const su = lew(c, B, 'H2O', 250, 150, 100, 36), co = lew(c, B, 'CO2', 250, 400, 100, 36);
    const msu = D.model(c, B, 'H2O', 700, 160, 1.3), mco = D.model(c, B, 'CO2', 700, 400, 1.2);
    gizle(A, B, mch.g, mnh.g, msu.g, mco.g);
    await par(say(c, 'Dört molekülün hem Lewis yapısına hem modeline bakalım.'), belir(c, [A, ch.g, nh.g], 600));
    await par(say(c, 'Uzay-dolgu modelinde atomlar küreyle gösterilir.'), belir(c, mch.g, 600));
    await par(say(c, 'Model, atomların birbirine göre konumunu da gösterir.'), belir(c, mnh.g, 600));
    await c.wait(500);
    await sil(c, A, 450);
    await par(say(c, 'H₂O\'nun Lewis yapısı düz yazılır, modeli ise bükülmüştür.', 'H iki O\'nun Lewis yapısı düz yazılır, modeli ise bükülmüştür.'), (async () => {
      await belir(c, [B, su.g], 450); await belir(c, msu.g, 600);
    })());
    await par(say(c, 'CO₂\'nin Lewis yapısı da düz yazılır, modeli gerçekten tek sıradır.', 'C O iki\'nin Lewis yapısı da düz yazılır, modeli gerçekten tek sıradır.'), (async () => {
      await belir(c, co.g, 450); await belir(c, mco.g, 600);
    })());
    await say(c, 'Aynı düz yazılışın iki farklı modeli var: nedenini arayalım.', '[curious] Aynı düz yazılışın iki farklı modeli var: nedenini arayalım.');
  }

  /* ---- 3. Merkez atomda ortaklanmamış çift var mı? ---- */
  async function merkez(c) {
    const svg = c.svg(1000, 562);
    const AD = ['CH4', 'NH3', 'H2O', 'CO2'], XY = [[250, 140], [750, 140], [250, 380], [750, 380]], MER = [0, 0, 1, 1];
    const M = AD.map((ad, i) => lew(c, svg, ad, XY[i][0], XY[i][1], 66, 32));
    const halka = M.map((m, i) => { const P = m.atomlar[MER[i]].P; const h = c.S('circle', { cx: P[0], cy: P[1], r: 21, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.5 }, svg); h.style.opacity = 0; return h; });
    const CIFT = ['çift: 0', 'çift: 1', 'çift: 2', 'çift: ?'], CY = [262, 262, 456, 456];
    const et = CIFT.map((m, i) => { const t = yazi(c, svg, XY[i][0], CY[i], m, { size: 26, renk: i === 3 ? RENK.vurgu : RENK.eksi }); t.style.opacity = 0; return t; });
    M.forEach((m) => gizle(m.g));
    await par(say(c, 'Merkez atom, öteki atomların bağlandığı atomdur.'), (async () => { await belir(c, M.map((m) => m.g), 600); await belir(c, halka, 450); })());
    await par(say(c, 'CH₄\'ün merkez atomu karbondur, ortaklanmamış çifti yoktur.', 'C H dört\'ün merkez atomu karbondur, ortaklanmamış çifti yoktur.'), belir(c, et[0], 450));
    await par(say(c, 'NH₃\'ün merkez atomu azottur, bir ortaklanmamış çifti vardır.', 'N H üç\'ün merkez atomu azottur, bir ortaklanmamış çifti vardır.'), (async () => {
      const y = M[1].atomYalnizNokta(0); parlat(y, true); await belir(c, et[1], 450); await c.wait(500); parlat(y, false);
    })());
    await par(say(c, 'H₂O\'nun merkez atomu oksijendir, iki ortaklanmamış çifti vardır.', 'H iki O\'nun merkez atomu oksijendir, iki ortaklanmamış çifti vardır.'), (async () => {
      const y = M[2].atomYalnizNokta(1); parlat(y, true); await belir(c, et[2], 450); await c.wait(500); parlat(y, false);
    })());
    await belir(c, et[3], 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'CO<sub>2</sub>\'de merkez atom karbonun kaç ortaklanmamış çifti vardır?',
      options: ['2', '4', '0'], answer: 2,
      hints: ['Oksijenler merkez atom değildir; karbona bak.', 'Karbonun 4 elektronunun hepsi ortaklanmıştır.', ''],
      right: 'Evet. Karbonun elektronlarının hepsi ortaklandı; çifti yok.',
    });
    et[3].textContent = 'çift: 0'; et[3].style.fill = RENK.eksi;
    await say(c, 'Önemli olan, merkez atomdaki ortaklanmamış çifttir.');
    await say(c, 'Oksijenlerin çifti var, ama merkez atomda hiç yoktur.');
  }

  /* ---- 4. Modellere bak ---- */
  async function modellereBak(c) {
    const svg = c.svg(1000, 562);
    const h1 = yazi(c, svg, 250, 52, 'merkezde çift yok', { size: 28, renk: RENK.soluk }), h2 = yazi(c, svg, 750, 52, 'merkezde çift var', { size: 28, renk: RENK.soluk });
    const AD = ['CH4', 'CO2', 'NH3', 'H2O'], XY = [[250, 190], [250, 410], [750, 190], [750, 410]], K = [1.3, 1.1, 1.3, 1.3];
    const M = AD.map((ad, i) => D.model(c, svg, ad, XY[i][0], XY[i][1], K[i]));
    const halka = M.map((m) => { const q = m.merkez, h = c.S('circle', { cx: q.x, cy: q.y, r: m.merkezR + 7, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.5 }, m.g); h.style.opacity = 0; return h; });
    gizle(h1, h2, M.map((m) => m.g));
    const topla = [['NH3', 0, 20, 82, 48], ['H2O', 0, -13, 82, 42]].map(([ad, x, y, rx, ry]) => {
      const m = M[AD.indexOf(ad)], e = c.S('ellipse', { cx: x * K[AD.indexOf(ad)], cy: y * K[AD.indexOf(ad)], rx: rx * 1.1, ry: ry * 1.1, fill: 'none', stroke: RENK.eksi, 'stroke-width': 3, 'stroke-dasharray': '7 6' }, m.g);
      e.style.opacity = 0; return e;
    });
    await par(say(c, 'CH₄\'te hidrojenler karbonun çevresine her yönden eşit dağılmıştır.', 'C H dört\'te hidrojenler karbonun çevresine her yönden eşit dağılmıştır.'), belir(c, [h1, M[0].g, halka[0]], 600));
    await par(say(c, 'CO₂\'de iki oksijen, karbonun iki yanında tek sıradadır.', 'C O iki\'de iki oksijen, karbonun iki yanında tek sıradadır.'), belir(c, [M[1].g, halka[1]], 600));
    await par(say(c, 'NH₃\'te üç hidrojen, azotun bir yanında toplanmıştır.', 'N H üç\'te üç hidrojen, azotun bir yanında toplanmıştır.'), belir(c, [h2, M[2].g, halka[2]], 600));
    await par(say(c, 'H₂O\'da iki hidrojen, oksijenin bir yanındadır.', 'H iki O\'da iki hidrojen, oksijenin bir yanındadır.'), belir(c, [M[3].g, halka[3]], 600));
    await say(c, 'Su molekülü bu yüzden bükülmüş görünür.');
    await c.choice({
      tag: 'Sıra sende', q: 'Atomların bir yanda toplandığı modeller hangileridir?',
      options: ['Merkez atomunda ortaklanmamış çift olmayanlar', 'Hidrojen içerenlerin hepsi', 'Merkez atomunda ortaklanmamış çift olanlar'], answer: 2,
      hints: ['CH<sub>4</sub> de hidrojen içerir ama hidrojenleri bir yanda toplanmamıştır.', 'CH<sub>4</sub> de hidrojen içerir ama hidrojenleri bir yanda toplanmamıştır.', ''],
      right: 'Evet. NH<sub>3</sub> ve H<sub>2</sub>O\'nun merkez atomlarında ortaklanmamış çift var.',
    });
    await belir(c, topla, 600); await c.wait(900);
    await say(c, 'Merkezde ortaklanmamış çift varsa atomlar bir yanda toplanır.');
    await say(c, 'Yoksa atomlar merkezin çevresine eşit dağılır.');
  }

  /* ---- 5. Neden? Elektron itmesi ---- */
  async function itme(c) {
    const svg = c.svg(1000, 562);
    // Su: oksijenin iki ortaklanmamış çifti.
    const G1 = c.S('g', {}, svg), su = suCiz(c, G1, 270, 270), msu = D.model(c, G1, 'H2O', 730, 270, 1.3);
    su.g.setAttribute('transform', 'translate(270 270) scale(1.35) translate(-270 -270)');
    gizle(G1, msu.g);
    await par(say(c, 'Elektronların hepsi eksi yüklüdür, birbirini iter.'), belir(c, G1, 600));
    await par(say(c, 'Merkez atomdaki ortaklanmamış çift, bağ elektronlarını iter.'), (async () => { parlat(su.lone, true); await c.wait(1200); parlat(su.lone, false); })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'Oksijendeki ortaklanmamış çiftler bağ elektronlarına ne yapar?',
      options: ['Çeker', 'İter', 'Etkilemez'], answer: 1,
      hints: ['Hepsi eksi yüklü elektronlar.', '', 'Eksi yük ile eksi yük arasında kuvvet vardır.'],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    await belir(c, su.oklar, 500);
    await par(say(c, 'Bağ elektronları itilince bağlı atomlar da kayar.'), par(kaydir(c, su.dallar[0], 28, -42), kaydir(c, su.dallar[1], -28, -42)));
    await par(say(c, 'H₂O\'da iki çift, hidrojenleri aynı yana iter.', 'H iki O\'da iki çift, hidrojenleri aynı yana iter.'), belir(c, su.oklar, 400, 1));
    await par(say(c, 'Bu yüzden su molekülü bükülmüştür.'), belir(c, msu.g, 700));
    await c.wait(600);
    await sil(c, G1, 450);
    // Amonyak: bir ortaklanmamış çift.
    const G2 = c.S('g', {}, svg), nh = lew(c, G2, 'NH3', 270, 240, 110, 44), mnh = D.model(c, G2, 'NH3', 730, 270, 1.3);
    nh.g.setAttribute('transform', 'translate(270 240) scale(1.35) translate(-270 -240)');
    const oklar = c.S('g', {}, nh.g);
    ok(c, oklar, [252, 214], [222, 226], RENK.itme, 4); ok(c, oklar, [288, 214], [318, 226], RENK.itme, 4); ok(c, oklar, [270, 258], [270, 278], RENK.itme, 4);
    gizle(G2, oklar, mnh.g);
    const dal = (i, bag) => [nh.atomlar[i].sembol, ...nh.baglar[bag].parcalar];
    await par(say(c, 'NH₃\'te bir çift, hidrojenleri kendinden uzağa iter.', 'N H üç\'te bir çift, hidrojenleri kendinden uzağa iter.'), (async () => {
      await belir(c, G2, 450); await belir(c, oklar, 450);
      await par(kaydir(c, dal(1, 0), 24, 34), kaydir(c, dal(2, 1), -24, 34));
      await belir(c, mnh.g, 600);
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'NCl<sub>3</sub>\'te merkez atom azottur ve bir ortaklanmamış çifti vardır. Modelde klor atomları nasıl durur?',
      options: ['Azotun çevresine eşit dağılır', 'Tek sıra olur', 'Azotun bir yanında toplanır'], answer: 2,
      hints: ['NH<sub>3</sub>\'te de azotun bir ortaklanmamış çifti vardı.', 'Çift varsa atomlar bir yana itilir.', ''],
      right: 'Evet. NCl<sub>3</sub> de NH<sub>3</sub> gibi, atomlarını bir yana toplar.',
    });
    await say(c, 'NCl₃ de NH₃ gibi, atomlarını bir yana toplar.', 'N Cl üç de N H üç gibi, atomlarını bir yana toplar.');
    await sil(c, G2, 450);
    // Metan: itme yok.
    const G3 = c.S('g', {}, svg), ch = lew(c, G3, 'CH4', 270, 270, 100, 40), mch = D.model(c, G3, 'CH4', 730, 270, 1.3);
    gizle(G3); await belir(c, G3, 600);
    await par(say(c, 'CH₄\'te ortaklanmamış çift olmadığı için bu itme yoktur.', 'C H dört\'te ortaklanmamış çift olmadığı için bu itme yoktur.'), c.wait(1200));
    c.note('<b>Ortaklanmamış çift bağ elektronlarını iter.</b> Örnek: H<sub>2</sub>O bükük.', 'Elektron itmesi', 'elektron-itmesi');
  }

  /* ---- 6. Modeli eşle (kart başına seçim) ---- */
  async function esle(c) {
    const svg = c.svg(1000, 562);
    const AD = ['CH4', 'NH3', 'H2O', 'CO2'], XY = [[170, 140], [440, 140], [170, 390], [440, 390]];
    const M = AD.map((ad, i) => lew(c, svg, ad, XY[i][0], XY[i][1], 56, 28));
    const MODEL = AD.map((ad) => D.model(c, svg, ad, 800, 265, 1.3));
    const isr = XY.map(([x, y]) => { const g = isaret(c, svg, x + 112, y - 78, 'ok', 17); g.style.opacity = 0; return g; });
    gizle(M.map((m) => m.g), MODEL.map((m) => m.g));
    await par(say(c, 'Her modelin hangi Lewis yapısına ait olduğunu bulalım.'), belir(c, M.map((m) => m.g), 600));
    const ADHTML = ['CH<sub>4</sub>', 'NH<sub>3</sub>', 'H<sub>2</sub>O', 'CO<sub>2</sub>'];
    const VAR = 'Merkezde ortaklanmamış çift var; atomlar bir yana kayar.', YOK = 'Merkezde ortaklanmamış çift yok; atomlar eşit dağılır.';
    const SIRA = [2, 0, 3, 1];
    await c.say('Model gelince doğru Lewis yapısını seç.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', soru: () => 'Bu modelin Lewis yapısı hangisidir?', kutular: ADHTML,
      kartlar: SIRA.map((k) => ({ kutu: k, ad: AD[k], ipucu: k === 1 || k === 2 ? VAR : YOK, neden: k === 1 || k === 2 ? 'Evet. Merkezde ortaklanmamış çift var; atomlar bir yana kaydı.' : 'Evet. Merkezde ortaklanmamış çift yok; atomlar eşit dağılır.' })),
      sec: async (i, k) => { await belir(c, MODEL[k.kutu].g, 500); },
      yerlestir: async (i, k) => { await par(belir(c, MODEL[k.kutu].g, 400, 0), belir(c, isr[k.kutu], 400)); },
    });
    await c.wait(500);
  }

  Ders.start({
    id: 'cesitlilik-d3', kicker: 'Konu D · Lewis nokta yapısı', title: 'Ortaklanmamış çift molekülü biçimlendirir', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Ortaklanmamış çift molekülü biçimlendirir',
      hook: 'Su molekülü neden düz bir çizgi gibi değil de kırık bir V gibi durur?',
      button: 'Derse başla ›',
    },
    goals: ['Lewis yapısı ile uzay-dolgu modelinin farkını söyler.', 'Merkez atomdaki ortaklanmamış çifti bulur.', 'Merkez atomdaki ortaklanmamış çiftin bağ elektronlarını ittiğini ve molekülün biçimini değiştirdiğini açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Ortaklanmamış çifti ve elektronların itmesini hatırla.', run: hatirla },
      { title: 'Lewis yazılışı ve model', goal: 'Aynı düz Lewis yazılışının farklı modellerini gör.', run: yazilisVeModel },
      { title: 'Merkez atomda ortaklanmamış çift var mı?', goal: 'Dört molekülün merkez atomundaki ortaklanmamış çifti say.', run: merkez },
      { title: 'Modellere bak', goal: 'Atomların merkez atomun çevresinde nasıl durduğunu karşılaştır.', run: modellereBak },
      { title: 'Neden? Elektron itmesi', goal: 'Ortaklanmamış çiftin bağ elektronlarını ittiğini gör.', run: itme },
      { title: 'Modeli eşle', goal: 'Her modeli doğru Lewis yapısıyla eşleştir.', run: esle },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Merkez atomunda ortaklanmamış çift bulunan moleküllerde elektron itmesi yapıyı nasıl etkiler?',
        options: ['Atomlar eşit dağılır', 'Yapı değişmez', 'Bağlı atomlar bir yana itilir'], answer: 2,
        why: ['Eşit dağılma, merkezde ortaklanmamış çift olmayan moleküllerde görülür.', 'Ortaklanmamış çift bağ elektronlarını iter; biçim değişir.', 'Ortaklanmamış çift bağ elektronlarını iter, atomlar bir yana kayar.'], scene: 4 },
      { q: 'CCl<sub>4</sub>\'ün merkez atomu karbondur ve ortaklanmamış çifti yoktur. Modelde klor atomları nasıl durur?',
        options: ['Bir yanda toplanır', 'Karbonun çevresine eşit dağılır', 'Bükülmüş olur'], answer: 1,
        why: ['Bir yanda toplanma, merkezde ortaklanmamış çift olan moleküllerde olur.', 'Merkezde çift yoksa itme de yoktur; atomlar eşit dağılır.', 'Bükülme, merkezdeki ortaklanmamış çiftlerin itmesiyle olur.'], scene: 3 },
      { q: 'H<sub>2</sub>O ve CO<sub>2</sub>\'nin Lewis yapıları kâğıtta düz yazılıdır. Modelleri neden farklıdır?',
        options: ['H<sub>2</sub>O\'nun merkez atomunda ortaklanmamış çift var', 'H<sub>2</sub>O hidrojen içerir', 'İkisinin atom sayısı farklıdır'], answer: 0,
        why: ['Oksijendeki ortaklanmamış çiftler hidrojenleri bir yana iter; CO<sub>2</sub>\'de karbonun çifti yok.', 'CH<sub>4</sub> de hidrojen içerir ama bükülmez.', 'İkisinde de üç atom var.'], scene: 4 },
      { q: 'Hangisinin modelinde atomlar merkez atomun bir yanında toplanır?',
        options: ['NF<sub>3</sub>', 'CF<sub>4</sub>', 'CCl<sub>4</sub>'], answer: 0,
        why: ['NF<sub>3</sub>\'te azotun bir ortaklanmamış çifti var; florlar bir yana itilir.', 'CF<sub>4</sub>\'te karbonun ortaklanmamış çifti yok; atomlar eşit dağılır.', 'CCl<sub>4</sub>\'te karbonun ortaklanmamış çifti yok; atomlar eşit dağılır.'], scene: 4 },
      { q: 'H<sub>2</sub>O\'da hidrojenleri aynı yana iten nedir?',
        options: ['Hidrojenlerin birbirini çekmesi', 'Oksijendeki ortaklanmamış çiftler', 'Oksijenin çekirdeği'], answer: 1,
        why: ['Hidrojenleri bir yana iten, merkezdeki çiftlerdir; çekme değil itme.', 'Oksijendeki iki ortaklanmamış çift bağ elektronlarını iter.', 'Çekirdek artı yüklüdür; bağ elektronlarını çeker, itmez.'], scene: 4 },
    ],
    summary: ['Merkez atomda ortaklanmamış çift olup olmadığına bak.', 'Çift yoksa atomlar eşit dağılır (CH₄, CO₂).', 'Çift varsa bağ elektronlarını iter, atomlar bir yana kayar (NH₃, H₂O).', '<b>Ortaklanmamış çift bağ elektronlarını iter, atomlar bir yana kayar.</b>'],
    nextLesson: { href: 'd4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
