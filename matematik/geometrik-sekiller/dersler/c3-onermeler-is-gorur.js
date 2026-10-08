/* C3 — Doğrulanmış önermeler iş görür
   İç ve dış açı önermeleri, kenar–açı sıralaması ve üçgen eşitsizliği; mühendislik, mimari ve görsel sanat
   problemlerinde ölçmeden sonuç verir. Çok adımlı problemde her adım bir önermedir. Yeni önerme yok;
   son sahne temanın beş önermesini tek üçgende toplar.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/C-dogrulamayi-sinamak-ve-kullanmak.md */
(() => {
  'use strict';
  const { RENK, rad, yon, ileri, ara, orta, yazi, cizgi, gizle, belir, par, dilim, ucgen, kenarlar, disAci, cubuklar, soruKarti } = window.KIT;

  /* B ve C köşeleri ile bu köşelerdeki açılar (derece) verilince A köşesi. */
  const tepe = (B, C, beta, gama) => {
    const ab = ((C[0] - B[0]) * Math.sin(rad(gama))) / Math.sin(rad(180 - beta - gama));
    return [B[0] + ab * Math.cos(rad(beta)), B[1] - ab * Math.sin(rad(beta))];
  };
  const cevapla = (t, metin) => { t.textContent = metin; t.style.fill = RENK.iyi; };
  /* Eşit kenar işareti: kenarın ortasına n kısa çentik. */
  const centik = (c, p, P, Q, n = 1) => {
    const m = ara(P, Q, 0.5), a = yon(P, Q);
    for (let i = 0; i < n; i++) { const q = ileri(m, a, (i - (n - 1) / 2) * 10); cizgi(c, p, ileri(q, a + Math.PI / 2, 9), ileri(q, a - Math.PI / 2, 9), RENK.yazi, 3); }
  };

  /* ---- 1. Köprü kafesi ---- */
  async function kopru(c) {
    const svg = c.svg(1000, 562);
    const Y = 400, alt = [100, 300, 500, 700, 900].map((x) => [x, Y]);
    const ust = alt.slice(0, 4).map((p) => tepe(p, [p[0] + 200, Y], 65, 50));
    const kafes = c.S('g', {}, svg);
    cizgi(c, kafes, alt[0], alt[4], RENK.ince, 6); cizgi(c, kafes, ust[0], ust[3], RENK.ince, 6);
    ust.forEach((u, i) => { cizgi(c, kafes, alt[i], u, RENK.ince, 6); cizgi(c, kafes, u, alt[i + 1], RENK.ince, 6); });
    const B = alt[1], C = alt[2], A = ust[1];
    const dis = disAci(c, svg, C, B, A, { uzun: 90 });
    const u = ucgen(c, svg, A, B, C, { r: 36, harf: false, olcu: ['?', '65°', '50°'], olcuSize: 24 });
    gizle(dis.g);
    await c.say('Bir köprünün çelik kafesi: üçgenlerden kurulu.');
    await c.choice({
      tag: 'Mühendislik', q: 'Öne çıkan üçgende iki açı 65° ve 50°. Ölçülmeyen üçüncü açı kaç derece?',
      options: ['75°', '65°', '115°'], answer: 1,
      hints: ['65° + 50° + 75° = 190°; toplam 180° olmalı.', '', '115°, verilen iki açının toplamı; üçüncü açı kalandır.'],
      right: '180° − 65° − 50° = 65°.',
    });
    cevapla(u.olculer[0], '65°');
    await c.say('Mühendis üçüncü açıyı ölçmedi: iç açılar toplamından buldu.');
    dis.yaz('?');
    await par(c.say('Aynı köşede, alt kiriş ile çubuk arasında bir dış açı var.'), belir(c, dis.g, 450));
    await c.choice({
      tag: 'Mühendislik', q: 'Bu dış açı kaç derece?',
      options: ['50°', '115°', '130°'], answer: 2,
      hints: ['50° iç açı; dış açı onu 180°’ye tamamlar.', '50° komşu açı; uzaktaki iki açı 65° ve 65°.', ''],
      right: 'Uzaktaki iki açı: 65° + 65° = 130°.',
    });
    cevapla(dis.yazi, '130°');
    await c.say('İki önerme, iki sonuç: hiçbiri ölçülmedi.');
  }

  /* ---- 2. Çatı makası ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562);
    const S = 60, B = [200, 430], C = [800, 430], A = [500, 430 - Math.sqrt(36 - 25) * S];
    const g = c.S('g', {}, svg);
    const u = ucgen(c, g, A, B, C, { r: 44 }), k = kenarlar(c, g, A, B, C);
    k.yaz(['10 m', '6 m', '6 m']);
    await c.say('Bir çatı makası: kirişler 6 m, 6 m ve 10 m.', { speak: 'Bir çatı makası: kirişler altı metre, altı metre ve on metre.' });
    await c.choice({
      tag: 'Mimari', q: 'Makasın en geniş açısı hangi köşede?',
      options: ['B', 'A (tepe)', 'C'], answer: 1,
      hints: ['B’nin karşısındaki kiriş 6 m; en uzunu değil.', '', 'C’nin karşısındaki kiriş 6 m; en uzunu değil.'],
      right: 'En uzun kiriş 10 m; karşısındaki köşe tepe.',
    });
    u.dilimler.forEach((d, i) => d.el.setAttribute('fill-opacity', i === 0 ? 0.95 : 0.3)); k.kalin(0, 9);
    await c.say('En uzun kirişin karşısı en geniş açı: tepe.', { speak: 'En uzun kirişin karşısı en geniş açı: [short pause] tepe.' });
    await belir(c, g, 350, 0); g.remove();
    const d = cubuklar(c, svg, 11, 5, 5);
    d.ac(); gizle(d.g);
    await par(c.say('Usta bu kez 5, 5 ve 11 metrelik kirişleri deniyor.', { speak: 'Usta bu kez beş, beş ve on bir metrelik kirişleri deniyor.' }), belir(c, d.g, 400));
    await c.choice({
      tag: 'Mimari', q: '5 m, 5 m ve 11 m’lik kirişlerle makas kurulur mu?',
      options: ['Kurulur', 'Kurulmaz'], answer: 1,
      hints: ['5 + 5 = 10; 11’e yetmiyor.', ''],
      right: '5 + 5 = 10, 11’den küçük.',
    });
    await par(c.say('İki kiriş birlikte tabana yetmiyor: üçgen eşitsizliği.', { speak: '[thoughtful] İki kiriş birlikte tabana yetmiyor: üçgen eşitsizliği.' }), d.kapat(1700));
  }

  /* ---- 3. Afiş ---- */
  async function afis(c) {
    const svg = c.svg(1000, 562);
    c.S('rect', { x: 200, y: 50, width: 600, height: 470, rx: 8, fill: '#18213f', stroke: RENK.kenarlik, 'stroke-width': 3 }, svg);
    c.S('rect', { x: 240, y: 86, width: 300, height: 22, rx: 6, fill: RENK.kenarlik }, svg);
    c.S('rect', { x: 240, y: 122, width: 180, height: 14, rx: 5, fill: RENK.kenarlik }, svg);
    const B = [270, 450], C = [570, 450], A = tepe(B, C, 55, 40);
    const dis = disAci(c, svg, C, B, A, { uzun: 228 });
    const u = ucgen(c, svg, A, B, C, { r: 40, olcu: ['85°', '?', ''], olcuSize: 24, dolgu: 'rgba(199,146,255,.22)' });
    dis.yaz('140°'); dis.yazi.setAttribute('font-size', 24);
    await c.say('Bir afiş: üçgenin bir kenarı çerçeveye kadar uzatılmış.');
    await c.choice({
      tag: 'Görsel sanat', q: 'Dış açı 140°, uzaktaki açılardan biri 85°. B’deki açı kaç derece?',
      options: ['40°', '55°', '225°'], answer: 1,
      hints: ['40°, C’deki komşu iç açı: 180° − 140°.', '', 'Toplamak değil: 140°, iki uzak açının toplamı.'],
      right: '140° − 85° = 55°.',
    });
    cevapla(u.olculer[1], '55°');
    await c.say('Tasarımcı açıyı ölçmedi; dış açı önermesinden hesapladı.');
  }

  /* ---- 4. Adım adım ---- */
  async function adimAdim(c) {
    const svg = c.svg(1000, 562);
    /* kullanılan önermenin adı: şeklin sağında, adım adım birikir */
    const ad = (g, i, metin) => { const t = yazi(c, g, 730, 200 + i * 64, metin, { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk }); gizle(t); return t; };

    /* 1) Açılan merdiven: ayaklar eşit, tepe açısı 40° */
    const g1 = c.S('g', {}, svg);
    const B = [330, 450], C = [570, 450], A = [450, 450 - 120 / Math.tan(rad(20))];
    cizgi(c, g1, [170, 450], [720, 450], RENK.ince, 4);
    const dis = disAci(c, g1, C, B, A, { uzun: 130 });
    const u = ucgen(c, g1, A, B, C, { r: 40, harf: false, olcu: ['40°', '?', ''], olcuSize: 24 });
    [0.42, 0.68].forEach((t) => cizgi(c, g1, ara(A, B, t), ara(A, C, t), RENK.ince, 4));
    centik(c, g1, ara(A, B, 0.5), ara(A, B, 0.6)); centik(c, g1, ara(A, C, 0.5), ara(A, C, 0.6));
    const n1 = [ad(g1, 0, 'eşit kenar → eşit açı'), ad(g1, 1, 'iç açılar: 180°'), ad(g1, 2, 'dış açı')];
    gizle(dis.g);
    await c.say('Açılan bir merdiven: iki ayağı eşit, tepe açısı 40°.', { speak: 'Açılan bir merdiven: iki ayağı eşit, tepe açısı kırk derece.' });
    await c.choice({
      tag: 'Adım 1 / 2', q: 'Ayağın yerle yaptığı açı kaç derece?',
      options: ['40°', '70°', '140°'], answer: 1,
      hints: ['Eşit ayakların karşısındaki iki açı eşittir; ikisi birlikte 180° − 40° eder.', '', '140°, iki taban açısının toplamı; her biri bunun yarısı.'],
      right: '(180° − 40°) : 2 = 70°.',
    });
    cevapla(u.olculer[1], '70°'); cevapla(u.olculer[2], '70°');
    await par(c.say('Eşit ayakların karşısındaki açılar eşit; toplam 180°.', { speak: 'Eşit ayakların karşısındaki açılar eşit; toplam yüz seksen derece.' }), belir(c, [n1[0], n1[1]], 400));
    dis.yaz('?');
    await par(c.say('Sağ ayak, yerin uzantısıyla geniş bir açı yapıyor.'), belir(c, dis.g, 450));
    await c.choice({
      tag: 'Adım 2 / 2', q: 'Bu geniş açı kaç derece?',
      options: ['70°', '110°', '140°'], answer: 1,
      hints: ['70° iç açı; geniş açı onu 180°’ye tamamlar.', '', 'Uzaktaki iki açı 40° ve 70°; iki taban açısı değil.'],
      right: 'Dış açı: 40° + 70° = 110°.',
    });
    cevapla(dis.yazi, '110°');
    await par(c.say('İki adımda üç önerme kullandık; hiçbir açıyı ölçmedik.'), belir(c, n1[2], 400));
    await belir(c, g1, 350, 0); g1.remove();

    /* 2) |AB| = |AC|, A = 50°; D, AC üstünde ve |BD| = |BC| */
    const g2 = c.S('g', {}, svg);
    const P = [300, 470], Q = [580, 470], T = [440, 470 - 140 * Math.tan(rad(65))], D = ileri(Q, yon(Q, T), 2 * 280 * Math.cos(rad(65)));
    c.S('polygon', { points: [T, P, Q].map((k) => k.join(',')).join(' '), fill: 'rgba(110,168,255,.07)', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g2);
    const bd = cizgi(c, g2, P, D, RENK.cizgi, 3);
    dilim(c, g2, T, P, Q, RENK.A, 40); dilim(c, g2, Q, P, T, RENK.C, 40);
    const dD = dilim(c, g2, D, P, Q, RENK.C, 40), dAlt = dilim(c, g2, P, D, Q, RENK.B, 46), dUst = dilim(c, g2, P, T, D, RENK.paralel, 110);
    const esit = c.S('g', {}, g2);
    centik(c, esit, P, D, 2); centik(c, esit, P, Q, 2);
    const et = (q, metin, renk) => yazi(c, g2, q[0], q[1] + 8, metin, { size: 24, kalin: 700, renk });
    et(ileri(T, orta(T, P, Q), 66), '50°', RENK.A); et(ileri(Q, orta(Q, P, T), 66), '65°', RENK.C);
    const tD = et(ileri(D, orta(D, P, Q), 66), '?', RENK.C), tAlt = et(ileri(P, orta(P, D, Q), 76), '?', RENK.B);
    const tUst = et(ileri(ileri(P, yon(P, T), 124), yon(P, T) - Math.PI / 2, 34), '?', RENK.paralel);
    yazi(c, g2, T[0], T[1] - 16, 'A', { size: 24, kalin: 700 }); yazi(c, g2, P[0] - 22, P[1] + 24, 'B', { size: 24, kalin: 700 });
    yazi(c, g2, Q[0] + 22, Q[1] + 24, 'C', { size: 24, kalin: 700 });
    const hD = yazi(c, g2, D[0] + 24, D[1] - 2, 'D', { size: 24, kalin: 700 });
    const n2 = [ad(g2, 0, 'eşit kenar → eşit açı'), ad(g2, 1, 'iç açılar: 180°'), ad(g2, 2, '65° − 50°')];
    gizle(g2, bd, esit, hD, dD.el, dAlt.el, dUst.el, tD, tAlt, tUst);
    await par(c.say('Yeni şekil: ABC ikizkenar, tepe açısı 50°, taban açıları 65°.', { speak: 'Yeni şekil: A B C ikizkenar, tepe açısı elli, taban açıları altmış beş derece.' }), belir(c, g2, 400));
    await par(c.say('D noktası AC üstünde; BD ile BC eşit uzunlukta.', { speak: 'D noktası AC kenarı üstünde; BD ile BC eşit uzunlukta.' }), belir(c, [bd, esit, hD], 450));
    await belir(c, [dD.el, tD], 300);
    await c.choice({
      tag: 'Adım 1 / 3', q: 'BD ile BC eşit. BDC açısı kaç derece?',
      options: ['50°', '65°', '115°'], answer: 1,
      hints: ['BCD üçgeninde eşit kenarların karşısındaki açılar eşittir: D’deki ile C’deki.', '', '115°, C’deki açıyı 180°’ye tamamlar; aranan açı C’dekine eşit.'],
      right: 'Eşit kenarların karşısı: D’deki açı da 65°.',
    });
    cevapla(tD, '65°');
    await belir(c, [n2[0], dAlt.el, tAlt], 350);
    await c.choice({
      tag: 'Adım 2 / 3', q: 'BCD üçgeninde iki açı 65°. DBC açısı kaç derece?',
      options: ['50°', '65°', '80°'], answer: 0,
      hints: ['', 'Üç açı da 65° olsa toplam 195° ederdi.', '65° + 65° + 80° = 210°; toplam 180° olmalı.'],
      right: '180° − 65° − 65° = 50°.',
    });
    cevapla(tAlt, '50°');
    await belir(c, [n2[1], dUst.el, tUst], 350);
    await c.choice({
      tag: 'Adım 3 / 3', q: 'B’deki açının tamamı 65°, alt parçası 50°. ABD açısı kaç derece?',
      options: ['15°', '25°', '50°'], answer: 0,
      hints: ['', 'Tamamdan alt parçayı çıkar: 65° − 50°.', '50° alt parça; aranan, üstte kalan dar açı.'],
      right: '65° − 50° = 15°.',
    });
    cevapla(tUst, '15°');
    await par(c.say('Üç adım: her adımda tek bir önerme kullandık.'), belir(c, n2[2], 400));
  }

  /* ---- 5. Hangi önerme? ---- */
  async function hangiOnerme(c) {
    const svg = c.svg(1000, 562);
    const goster = soruKarti(c, svg);
    const ONERME = ['İç açılar toplamı', 'Dış açı önermesi', 'En uzun kenar önermesi', 'Üçgen eşitsizliği'];
    const sor = (no, cevap, ipucu, dogru) => c.choice({
      tag: 'Soru ' + no + ' / 4', q: 'Hangi önerme işe yarar?', options: ONERME, answer: cevap,
      hints: ONERME.map((_, i) => (i === cevap ? '' : ipucu)), right: dogru,
    });
    await c.say('Sıra sende: çözmeden önce hangi önermeyi kullanacağını seç.', { noWait: true });
    await goster(['“Üçgenin iki açısı 80° ve 45°.', 'Üçüncü açı kaç derece?”']);
    await sor(1, 0, 'Verilenler iki iç açı; aranan üçüncü iç açı.', '180° − 80° − 45° = 55°.');
    await goster(['“6 m, 7 m ve 15 m’lik kirişlerle', 'üçgen çatı kurulur mu?”']);
    await sor(2, 3, 'Verilenler üç uzunluk; soru üçgenin kurulup kurulmayacağı.', '6 + 7 = 13, 15’ten küçük: kurulmaz.');
    await goster(['“Kenarları 6, 9 ve 7 olan üçgende', 'en geniş köşe hangisi?”']);
    await sor(3, 2, 'Verilenler kenarlar; aranan en büyük açının yeri.', '9’luk kenarın karşısındaki köşe.');
    await goster(['“İki kenarı 6 ve 9 olan üçgende', 'üçüncü kenar en çok kaç olur (tam sayı)?”']);
    await sor(4, 3, 'Verilenler iki kenar; aranan üçüncü kenarın sınırı.', 'Üçüncü kenar 6 + 9 = 15’ten kısa: en çok 14.');
    c.note('Verilene bak, önermeyi seç:<br>açılar → 180° · çubuklar → üçgen eşitsizliği', 'Hangi önerme?', 'gs-hangi-onerme');
    await c.say('Önce verilene bak, sonra önermeyi seç.');
  }

  /* ---- 6. Tek üçgende beş önerme ---- */
  async function besOnerme(c) {
    const svg = c.svg(1000, 562);
    const B = [330, 390], C = [670, 390], A = tepe(B, C, 60, 50);
    const dis = [disAci(c, svg, C, B, A, { uzun: 90 }), disAci(c, svg, A, C, B, { uzun: 90 }), disAci(c, svg, B, A, C, { uzun: 90 })];
    const u = ucgen(c, svg, A, B, C, { harf: false, olcu: ['α', 'β', 'γ'] }), k = kenarlar(c, svg, A, B, C);
    k.yaz(['a', 'b', 'c']);
    const formul = yazi(c, svg, 500, 526, '', { size: 32, kalin: 700 });
    gizle(dis.map((d) => d.g), k.g, formul);
    const goster = async (metin) => { await belir(c, formul, 200, 0); formul.textContent = metin; await belir(c, formul, 350); };
    await par(c.say('Tek üçgen, beş önerme: önce iç açıların toplamı.'), (async () => {
      for (const d of u.dilimler) { await c.tween(220, (e) => d.el.setAttribute('fill-opacity', 0.55 + 0.4 * e)); await c.tween(220, (e) => d.el.setAttribute('fill-opacity', 0.95 - 0.4 * e)); }
      await goster('α + β + γ = 180°');
    })());
    await par(c.say('Dış açı, uzaktaki iki iç açının toplamıdır.'), (async () => { await belir(c, dis[0].g, 400); await goster('dış = α + β'); })());
    await par(c.say('Üç dış açı birlikte bir tam tur eder.', { speak: 'Üç dış açı birlikte [short pause] bir tam tur eder.' }), (async () => { await belir(c, [dis[1].g, dis[2].g], 400); await goster('dış açılar toplamı = 360°'); })());
    await par(c.say('Kenarların sırası, karşılarındaki açıların sırasıdır.'), (async () => {
      await belir(c, dis.map((d) => d.g), 300, 0); await belir(c, k.g, 400); await goster('a > b > c ise α > β > γ');
    })());
    await par(c.say('Üçüncü kenar, farktan büyük, toplamdan küçüktür.'), goster('|b − c| < a < b + c'));
    await c.choice({
      tag: 'Hatırla', q: 'Bu beş önermeden hangilerini ispatladık?',
      options: ['İlk üçünü: açılarla ilgili olanları', 'Beşini de', 'Hiçbirini; hepsini ölçtük'], answer: 0,
      hints: ['', 'Kenarlarla ilgili iki önermeyi ölçerek doğruladık.', 'Açı önermelerini paralel doğru ve doğru açıyla adım adım ispatladık.'],
      right: 'Açı önermeleri ispatlandı; kenar önermeleri doğrulandı.',
    });
    await c.say('İspatlı bilgi, ölçmeden de sonuç verir.');
  }

  Ders.start({
    id: 'geometrik-sekiller-c3', kicker: 'Konu C · Doğrulamayı sınamak ve kullanmak', title: 'Doğrulanmış önermeler iş görür', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Doğrulanmış önermeler iş görür',
      hook: 'Bir mühendis, çelik kafesin <b>hiç ölçmediği</b> bir açısını nasıl bulur?',
      button: 'Derse başla ›',
    },
    goals: ['Açı ve kenar önermelerini geometrik problemlerde kullanır.', 'Mühendislik, mimari ve görsel sanat bağlamındaki bir problemde uygun önermeyi seçer.', 'Çok adımlı bir problemi önermeleri sırayla kullanarak çözer.'],
    scenes: [
      { title: 'Köprü kafesi', goal: 'Ölçülmeyen iç açıyı ve dış açıyı önermelerle bul.', run: kopru },
      { title: 'Çatı makası', goal: 'En geniş köşeyi bul; kirişlerin makas kurup kurmadığına karar ver.', run: cati },
      { title: 'Afiş', goal: 'Dış açıdan uzaktaki iç açıyı hesapla.', run: afis },
      { title: 'Adım adım', goal: 'Çok adımlı iki problemi önermeleri sırayla kullanarak çöz.', run: adimAdim },
      { title: 'Hangi önerme?', goal: 'Verilenlere bakarak uygun önermeyi seç.', run: hangiOnerme },
      { title: 'Tek üçgende beş önerme', goal: 'Temanın beş önermesini tek şekilde topla.', run: besOnerme },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'İkizkenar bir üçgenin tepe açısı 30°. Taban köşesindeki dış açı kaç derecedir?',
        options: ['75°', '105°', '150°'], answer: 1,
        why: ['75° taban açısıdır; dış açı onu 180°’ye tamamlar.', 'Taban açısı (180° − 30°) : 2 = 75°; dış açı 180° − 75° = 105°.', '150°, iki taban açısının toplamıdır.'],
        scene: 3,
      },
      {
        q: '4 m, 5 m ve 10 m’lik üç kirişle üçgen bir çatı kurulur mu?',
        options: ['Kurulur: üç kiriş var.', 'Kurulur: en uzunu 10 m.', 'Kurulmaz: 4 + 5, 10’dan küçük.'], answer: 2,
        why: ['Her üç uzunluk üçgen kurmaz.', 'En uzun kiriş, öbür ikisinin toplamından kısa olmalı.', '4 + 5 = 9; 10’a yetmiyor.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>İspatlı bilgi, ölçmeden de sonuç verir.</b>',
      'Açılar verilmişse: iç açılar toplamı ya da dış açı önermesi.',
      'Kenarlar verilmişse: kenar–açı sıralaması ya da üçgen eşitsizliği.',
      'Çok adımlı soruda her adım tek bir önermedir.',
    ],
  });
})();
