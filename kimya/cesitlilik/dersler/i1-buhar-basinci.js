/* I1 — Buhar basıncı nedir?
   Farklı sıvılar farklı hızda buharlaşır; kapalı kapta buharlaşmayla birlikte yoğuşma da olur; sıvının üstündeki buharın
   kabı iten kuvveti buhar basıncıdır; buharlaşma hızı yoğuşma hızına eşitlenince basınç değişmez: denge buhar basıncı.
   Senaryo: plan/kimya/cesitlilik/senaryolar/I-buhar-basinci.md ("I1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Oklar ve molekül sayıları şematiktir; cıva seviyeleri farkı yalnızca okunan değerle orantılıdır. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, sinifla } = window.KIT;
  const { GRI, OLCU, sb, dizi, dolas, kapliU, akis, isaretli, asama, yuzey, sorukarti, kutuTahtasi, kureModeli } = window.KIT_I;
  const { ease } = Ders;

  /* Tahtadaki çizgi yazı: parçaları aralıklı tek öğe olarak yeniden kurar. */
  const yeniden = (c, t, parcalar, dx = 10) => {
    t.textContent = '';
    parcalar.forEach((q, i) => { const [m, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m, dx: i ? dx : 0 }, t); if (r) ts.style.fill = r; });
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const s1 = c.S('g', {}, svg), s2 = c.S('g', {}, svg);
    // Tuz ve buz: ikisi de nötr gri, yalnızca tanecik türü farklı.
    kutu(c, s1, 70, 80, 400, 340, { rx: 16 }); kutu(c, s1, 530, 80, 400, 340, { rx: 16 });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const a = (i + j) % 2;
      c.S('circle', { cx: 270 + (i - 1.5) * 62, cy: 220 + (j - 1.5) * 62, r: a ? 20 : 27, fill: a ? '#e6e6e6' : '#9c9c9c' }, s1);
    }
    yazi(c, s1, 270, 395, 'sofra tuzu', { size: 30, kalin: 700 });
    [[650, 190], [810, 190], [730, 305]].forEach(([x, y]) => kureModeli(c, s1, 'H2O', x, y, 0.85));
    yazi(c, s1, 730, 395, 'buz', { size: 30, kalin: 700 });
    // Üç molekül.
    [['H2O', 'H_{2}O', 170], ['CH4', 'CH_{4}', 500], ['CO2', 'CO_{2}', 830]].forEach(([ad, f, x]) => {
      kutu(c, s2, x - 140, 90, 280, 330, { rx: 16 });
      kureModeli(c, s2, ad, x, 235, 1.35);
      yazi(c, s2, x, 380, f, { size: 40, kalin: 700, math: true });
    });
    gizle(s1, s2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Sofra tuzu ile buz ısıtılıyor. Hangisi daha yüksek sıcaklıkta erir?',
      options: ['Buz', 'Sofra tuzu', 'İkisi aynı sıcaklıkta erir'], answer: 1,
      hints: ['Tanecikleri güçlü etkileşim tutan katı daha yüksek sıcaklıkta erir; tuzda iyonlar, buzda moleküller var.', '',
        'Tanecikleri güçlü etkileşim tutan katı daha yüksek sıcaklıkta erir; tuzda iyonlar, buzda moleküller var.'],
      right: 'Evet. Tuzdaki iyonları güçlü etkileşim bir arada tutar.',
    });
    c.clearSay();
    await belir(c, s1, 400, 0);
    await belir(c, s2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Hangisinin molekülleri arasında hidrojen bağı kurulabilir?',
      options: ['CH<sub>4</sub>', 'CO<sub>2</sub>', 'H<sub>2</sub>O'], answer: 2,
      hints: ['Hidrojen bağı için H atomu F, O ya da N’ye doğrudan bağlı olmalı; H<sub>2</sub>O’da O–H bağı var.',
        'Hidrojen bağı için H atomu F, O ya da N’ye doğrudan bağlı olmalı; H<sub>2</sub>O’da O–H bağı var.', ''],
      right: 'Evet. H<sub>2</sub>O’da hidrojen, oksijene doğrudan bağlıdır.',
    });
    await belir(c, s2, 400, 0);
    await c.say('Bugün sıvıların üstündeki buharın basıncına bakacağız.');
  }

  /* ---- 2. Aynı kap, aynı miktar, farklı sıvı ---- */
  async function sivilar(c) {
    const svg = c.svg(1000, 562), CY = 350;
    const L = kapliU(c, svg, { x: 210, y: CY, boru: false, sivi: 'su', kapak: 0 });
    const R = kapliU(c, svg, { x: 640, y: CY, boru: false, sivi: 'alkol', kapak: 0 });
    const et = c.S('g', {}, svg);
    [[285, 'su'], [715, 'etil alkol']].forEach(([cx, ad]) => {
      yazi(c, et, cx, CY + 44, ad, { size: 30, kalin: 700 });
      sb(c, et, cx - 46, CY + 84, '10', 'mL', { size: 24, kalin: 600, brenk: RENK.yazi });
      sb(c, et, cx + 46, CY + 84, '25', '°C', { size: 24, kalin: 600, brenk: RENK.yazi });
    });
    // Zaman çubukları: ortak ölçek, başta boş.
    const bar = c.S('g', {}, svg), BY = 470;
    const dolgu = [135, 565].map((x) => {
      c.S('rect', { x, y: BY, width: 300, height: 20, rx: 6, fill: 'none', stroke: GRI.cam, 'stroke-width': 2.5 }, bar);
      return c.S('rect', { x, y: BY, width: 0, height: 20, rx: 6, fill: GRI.koyu }, bar);
    });
    yazi(c, bar, 500, BY + 16, 'süre', { size: 22, kalin: 600, renk: RENK.soluk });
    gizle(L.kok, R.kok, et, bar);

    await par(c.say('Özdeş kaplarda 10 mL su ve 10 mL etil alkol bekliyor.', { speak: 'Özdeş kaplarda on mililitre su ve on mililitre etil alkol bekliyor.' }), belir(c, [L.kok, R.kok, et], 600));
    await c.say('İkisi de 25 °C’ta ve kapakları açık; yalnızca sıvının türü farklı.', { speak: 'İkisi de yirmi beş derecede ve kapakları açık; yalnızca sıvının türü farklı.' });
    await c.say('Açık kaptaki sıvı zamanla buharlaşır ve azalır.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bir süre sonra hangi kap önce boşalır?',
      options: ['Su', 'Etil alkol', 'İkisi aynı anda'], answer: 1,
      hints: ['Eline dökülen alkol ile suyu düşün.', '', 'Kap, miktar ve sıcaklık aynı; fark sıvının kendisinde.'],
      right: 'Evet. Alkol sudan daha çabuk uçar.',
    });
    const bosalt = async () => {
      await belir(c, bar, 350, 1);
      await c.tween(6000, (e) => {
        const a = Math.min(1, e / 0.4);
        L.git({ sev: 1 - e }); R.git({ sev: 1 - a });
        dolgu[0].setAttribute('width', 300 * e); dolgu[1].setAttribute('width', 300 * a * 0.4);
      }, ease.linear);
    };
    await par(c.say('Etil alkol, sudan daha hızlı buharlaşıp önce biter.'), bosalt());
    c.clearSay();
    await belir(c, [L.kok, R.kok, et, bar], 450, 0);

    // Sıvı yüzeyi büyür: ayrılan moleküller yukarı oklarla.
    const yz = c.S('g', {}, svg);
    const Y1 = yuzey(c, yz, { x: 110, y: 330, w: 360, sivi: 'su' }), Y2 = yuzey(c, yz, { x: 530, y: 330, w: 360, sivi: 'alkol', tohum: 4 });
    yazi(c, yz, 290, 500, 'su', { size: 30, kalin: 700 }); yazi(c, yz, 710, 500, 'etil alkol', { size: 30, kalin: 700 });
    const e1 = yazi(c, yz, 290, 196, 'buharlaşma', { size: 26, kalin: 600, renk: GRI.koyu });
    const e2 = yazi(c, yz, 290, 196, 'buhar', { size: 26, kalin: 600, renk: GRI.acik });
    gizle(yz, e1, e2);
    await belir(c, yz, 500, 1);
    await par(c.say('Buharlaşma hızı, birim zamanda sıvıdan ayrılan molekül sayısıdır.'), Y1.ayarla(2), Y2.ayarla(2), belir(c, e1, 500, 1));
    await par(c.say('Ayrılan moleküller sıvısıyla temas ederse buhar adını alır.'), belir(c, e1, 300, 0).then(() => belir(c, e2, 400, 1)));
    await par(c.say('Alkolde birim zamanda ayrılan molekül sayısı daha fazladır.'), Y2.ayarla(6, 900));
    await c.say('Bu farkı ölçmenin bir yolu var.', { speak: '[curious] Bu farkı ölçmenin bir yolu var.' });
  }

  /* ---- 3. Kapağı kapat ---- */
  async function kapak(c) {
    const svg = c.svg(1000, 562), d = dolas(c), CY = 440;
    const L = kapliU(c, svg, { k: 1.3, x: 110, y: CY, boru: false, kapak: 0 });
    const R = kapliU(c, svg, { k: 1.3, x: 560, y: CY, boru: false, kapak: 0, tohum: 6 });
    d.ekle(L); d.ekle(R);
    const A = akis(c, R);
    yazi(c, svg, 207, CY + 50, 'açık', { size: 30, kalin: 700 }); yazi(c, svg, 657, CY + 50, 'kapalı', { size: 30, kalin: 700 });
    // Okların adları: kapın yanında, ince kılavuz çizgisiyle.
    const ad = c.S('g', {}, svg);
    const W = R.cur.W, hl = -R.yuzeyY(), yU = R.Y(-hl - 28), yD = R.Y(-hl - 36);
    cizgi(c, ad, [R.X(0) - 10, yU], [R.X(0.2 * W) - 12, yU], GRI.koyu, 2, { 'stroke-dasharray': '3 5' });
    yazi(c, ad, R.X(0) - 16, yU + 8, 'buharlaşma', { hiza: 'end', size: 26, kalin: 600, renk: GRI.koyu });
    const adD = c.S('g', {}, svg);
    cizgi(c, adD, [R.X(W) + 10, yD], [R.X(0.325 * W) + 12, yD], GRI.acik, 2, { 'stroke-dasharray': '3 5' });
    yazi(c, adD, R.X(W) + 16, yD + 8, 'yoğuşma', { hiza: 'start', size: 26, kalin: 600, renk: GRI.acik });
    gizle(ad, adD);
    const isl = isaretli(c, R);

    await par(c.say('Ağzı açık kapta sıvının tamamı buharlaşabilir.'), L.kacis(1).then(() => L.git({ sev: 0.3 }, 5000)));
    await par(c.say('Kapağı kapatınca buhar kabın içinde kalır.'), R.git({ kapak: 1 }, 900).then(() => R.git({ yog: 5 }, 800)));
    await par(c.say('Buhar moleküllerinin sıvıya geri dönmesine yoğuşma denir.'), A.ayarla(1, 0, 500).then(() => belir(c, ad, 400, 1)).then(() => c.wait(500)).then(() => A.ayarla(1, 1, 500)).then(() => belir(c, adD, 400, 1)));
    await par(c.say('Kapalı kapta buharlaşma ve yoğuşma birlikte sürer.'), isl.goster(500), c.wait(4200));
    await c.choice({
      tag: 'Sıra sende', q: 'Ağzı kapalı kapta bir süre sonra sıvının tamamı buharlaşır mı?',
      options: ['Evet; buharlaşma hiç durmaz', 'Hayır; buharın bir kısmı yoğuşarak sıvıya döner', 'Hayır; kapak buharlaşmayı durdurur'], answer: 1,
      hints: ['Kapalı kapta buhar nereye gidebilir?', '', 'Kapak buharlaşmayı durdurmaz; yoğuşma da olur.'],
      right: 'Evet. Buhar kapta kalır ve bir kısmı sıvıya döner.',
    });
    await c.say('Bu yüzden kapalı kaptaki sıvının tamamı buharlaşmaz.');
  }

  /* ---- 4. Buhar basıncı: çarpan moleküller ---- */
  async function carpan(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.25, x: 170, y: 470, kapak: 0, mmHg: 0, yog: 0, carpma: true });
    d.ekle(U);
    const { UX, UA, UY0, UYB } = OLCU;
    const x1 = U.X(UX - 28), y1 = U.Y(UY0 - 16);
    const halka = c.S('rect', { x: x1, y: y1, width: U.X(UX + UA + 28) - x1, height: U.Y(UYB + 18) - y1, rx: 16, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.5, 'stroke-dasharray': '8 6' }, svg);
    gizle(halka);

    await par(c.say('Buhar molekülleri hareket eder ve kabın çeperlerine çarpar.'), U.git({ kapak: 1 }, 900).then(() => U.git({ yog: 5 }, 800)));
    await par(c.say('Bu çarpmaların oluşturduğu kuvvet, buhar basıncıdır.'), U.git({ mmHg: 23.8 }, 1800));
    await par(c.say('Kaba bağlı U borusunun içinde cıva vardır.'), belir(c, halka, 400, 1));
    await par(c.say('Buhar basıncı büyüdükçe cıva seviyeleri arasındaki fark artar.'), belir(c, halka, 400, 0), U.git({ yog: 9, mmHg: 55.3 }, 2600));

    // Soru: açık ve kapalı kap yan yana.
    c.clearSay();
    await belir(c, U.kok, 450, 0);
    U.kok.remove();
    const q1 = kapliU(c, svg, { k: 0.78, x: 60, y: 420, kapak: 0 }), q2 = kapliU(c, svg, { k: 0.78, x: 540, y: 420, kapak: 1, tohum: 8 });
    d.ekle(q1); d.ekle(q2);
    const et = c.S('g', {}, svg);
    yazi(c, et, q1.X(75), 476, 'açık', { size: 30, kalin: 700 }); yazi(c, et, q2.X(75), 476, 'kapalı', { size: 30, kalin: 700 });
    gizle(q1.kok, q2.kok, et);
    await belir(c, [q1.kok, q2.kok, et], 550, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı suyla dolu iki kaptan biri açık, biri kapalı; ikisine de U borusu bağlı. Hangisinde cıva seviyeleri arasında fark oluşur?',
      options: ['Açık kapta', 'İkisinde de', 'Kapalı kapta'], answer: 2,
      hints: ['Açık kapta buhar dışarı yayılıyordu.', 'Buharın çeperlere çarpabilmesi için kabın içinde kalması gerekir.', ''],
      right: 'Evet. Kapalı kapta buhar çeperlere çarpar.',
    });
    // Gör: açık kapta seviyeler eşit kalır, kapalı kapta fark belirir.
    await par(c.say('Kapalı kapta buhar çeperlere çarpar ve fark oluşur.'), q1.kacis(1), q2.git({ yog: 5, mmHg: 23.8 }, 2200));
  }

  /* ---- 5. Denge nasıl kurulur ---- */
  async function denge(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.25, x: 50, y: 500, kapak: 0 });
    d.ekle(U);
    const A = akis(c, U);
    const S = asama(c, svg, { x: 640, y: 66, ara: 94, n: 1 });
    const et = yazi(c, svg, 780, 196, '', { size: 52, kalin: 700 });
    yeniden(c, et, ['açık kap']);
    // Ok adları (açıklık): bir kez, sağ tarafta.
    const lej = c.S('g', {}, svg);
    ok(c, lej, [650, 352], [650, 308], GRI.koyu, 4); ok(c, lej, [650, 372], [650, 416], GRI.acik, 4);
    const lj1 = yazi(c, lej, 682, 340, '', { hiza: 'start', size: 26, kalin: 600 }), lj2 = yazi(c, lej, 682, 404, '', { hiza: 'start', size: 26, kalin: 600 });
    yeniden(c, lj1, ['buharlaşma', ['Vb', RENK.vurgu]], 12); yeniden(c, lj2, ['yoğuşma', ['Vy', RENK.vurgu]], 12);
    gizle(lej);

    await c.say('Önce ağzı açık kapta cıva seviyeleri eşittir.');
    await par(c.say('Kapak kapanınca buharlaşma hızı (Vb), yoğuşma hızından (Vy) büyüktür.', { speak: 'Kapak kapanınca buharlaşma hızı, yoğuşma hızından büyüktür.' }),
      U.git({ kapak: 1, mmHg: 9, yog: 2, sev: 0.97 }, 1400), A.ayarla(3, 1, 600), S.ayarla(2), belir(c, lej, 500, 1),
      belir(c, et, 250, 0).then(() => { yeniden(c, et, ['Vb', '>', 'Vy']); return belir(c, et, 350, 1); }));
    await par(c.say('Buhar biriktikçe cıva seviyeleri farkı artar.'), U.git({ mmHg: 23.8, yog: 3.5 }, 2200));
    await par(c.say('Buhar biriktikçe yoğuşan molekül sayısı da artar.'), A.ayarla(2, 2, 700), U.git({ sev: 0.93 }, 900), S.ayarla(3));

    // Birlikte çöz: üçüncü aşama, etiket "Vb ? Vy".
    await belir(c, et, 250, 0); yeniden(c, et, ['Vb', '?', 'Vy']); await belir(c, et, 300, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü aşamada buharlaşma hızı ile yoğuşma hızı nasıl?',
      options: ['Buharlaşma hızı büyük', 'Eşit', 'Yoğuşma hızı büyük'], answer: 1,
      hints: ['Yoğuşma 2. aşamadan beri artıyor.', '', 'Oklar eşit sayıda; fark artık büyümüyor.'],
      right: 'Evet. İkişer ok: iki hız eşit.',
    });
    await belir(c, et, 250, 0); yeniden(c, et, ['Vb', '=', 'Vy']); await belir(c, et, 300, 1);
    await c.say('Yoğuşma hızı buharlaşma hızına eşitlenince denge kurulur.');
    await c.choice({
      tag: 'Sıra sende', q: 'Dengeye ulaşmış kapalı kap, aynı sıcaklıkta bir süre daha bekletiliyor. Cıva seviyeleri farkı ne olur?',
      options: ['Artar', 'Azalır', 'Aynı kalır'], answer: 2,
      hints: ['Hız eşitse buhar fazında net bir değişim olmaz.', '3. ve 4. aşamayı karşılaştır.', ''],
      right: 'Evet. Net değişim olmadığı için fark sabit kalır.',
    });
    await par(c.say('Denge kurulunca cıva seviyeleri farkı artık değişmez.'), S.ayarla(4), c.wait(2600));
  }

  /* ---- 6. Denge durmak değildir ---- */
  async function durmaz(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.15, x: 70, y: 480, kapak: 1, mmHg: 23.8, yog: 3.5, sev: 0.93 });
    d.ekle(U);
    const A = akis(c, U); A.ayarla(2, 2, 0);
    const isl = isaretli(c, U);
    // Sayaç kutuları: aynı boyda iki çubuk.
    const say = c.S('g', {}, svg);
    [[720, 'çıkan'], [860, 'dönen']].forEach(([x, ad]) => {
      kutu(c, say, x - 55, 250, 110, 190, { rx: 12 });
      c.S('rect', { x: x - 30, y: 440 - 20 - 110, width: 60, height: 110, rx: 8, fill: GRI.koyu }, say);
      yazi(c, say, x, 226, ad, { size: 26, kalin: 700 });
    });
    gizle(say);

    await par(c.say('Dengede iki olay eşit hızla sürer.', { speak: '[thoughtful] Dengede iki olay eşit hızla sürer.' }), isl.goster(600));
    await par(c.say('Birim zamanda sıvıdan çıkan molekül sayısı, dönen sayısına eşittir.'), belir(c, say, 600, 1));
    await c.say('Buhar fazındaki molekül sayısı değişmez, bu yüzden basınç değişmez.');
    await c.choice({
      tag: 'Sıra sende', q: 'Denge kurulunca kapta ne olur?',
      options: ['İkisi de durur', 'Yalnızca yoğuşma sürer', 'Buharlaşma da yoğuşma da aynı hızla sürer'], answer: 2,
      hints: ['Cıva farkı sabit; moleküller de hareketsiz mi?', 'Sıvı yüzeyinden molekül çıkışı durmaz.', ''],
      right: 'Evet. Çıkış ve dönüş aynı hızda sürer.',
    });
    await par(c.say('İşaretli moleküller yer değiştirir; çubuklar eşit kalır.'), c.wait(5200));
  }

  /* ---- 7. Denge buhar basıncı ---- */
  async function dengeBasinci(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.1, x: 60, y: 490, kapak: 1, mmHg: 23.8, yog: 3.5, sev: 0.93 });
    d.ekle(U);
    const A = akis(c, U); A.ayarla(2, 2, 0);
    const sag = c.S('g', {}, svg);
    dizi(c, sag, 790, 120, ['Vb', '=', 'Vy'], { size: 52, kalin: 700 });
    ok(c, sag, [790, 152], [790, 196], RENK.yazi, 4);
    yazi(c, sag, 790, 246, 'basınç sabit', { size: 32, kalin: 600 });
    const ust = c.S('g', {}, svg);
    yazi(c, ust, U.X(40), U.Y(-190) - 40, 'su', { size: 30, kalin: 700 });
    sb(c, ust, U.X(108), U.Y(-190) - 40, '25', '°C', { size: 30, kalin: 700, brenk: RENK.yazi });
    gizle(sag, ust);

    await par(c.say('Sıvısıyla dengede bulunan buharın basıncına denge buhar basıncı denir.'), belir(c, sag, 600, 1));
    U.okunan(23.8); gizle(U.oku);
    await par(c.say('Saf suyun 25 °C’taki denge buhar basıncı 23,8 mmHg’dir.', { speak: 'Saf suyun yirmi beş derecedeki denge buhar basıncı yirmi üç virgül sekiz milimetre cıvadır.' }), belir(c, [ust, U.oku], 600, 1));
    c.note('<b>Vb = Vy iken buharın basıncı.</b> Örnek: su, 25 °C, 23,8 mmHg.', 'Denge buhar basıncı', 'denge-buhar-basinci');

    // Dene: kart başına seçim.
    c.clearSay();
    await belir(c, [U.kok, U.oku, sag, ust], 450, 0);
    const mini = (k, g) => {
      const m = kapliU(c, g, { k: 0.6, x: 396, y: 190, kapak: 1, mmHg: k.mm, yog: k.yog || 0, sev: 0.93 });
      if (k.oklar) akis(c, m).ayarla(k.oklar[0], k.oklar[1], 0);
      if (k.buyuyor) ok(c, g, [m.X(OLCU.UX + OLCU.UA + 64), m.Y(OLCU.YORTA + 12)], [m.X(OLCU.UX + OLCU.UA + 64), m.Y(OLCU.YORTA - 30)], RENK.vurgu, 4);
      if (k.esit) { const x = m.X(OLCU.UX + OLCU.UA + 64); cizgi(c, g, [x - 9, m.Y(OLCU.YORTA - 4)], [x + 9, m.Y(OLCU.YORTA - 4)], RENK.vurgu, 4); cizgi(c, g, [x - 9, m.Y(OLCU.YORTA + 6)], [x + 9, m.Y(OLCU.YORTA + 6)], RENK.vurgu, 4); }
      const t = yazi(c, g, 500, 268, '', { size: 28, kalin: 600 });
      t.textContent = '';
      (k.satir).forEach((q, i) => { const [m2, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m2, dx: i ? 8 : 0 }, t); if (r) ts.style.fill = r; });
    };
    const chipYaz = (parcalar) => (k, p, x, y) => { const t = yazi(c, p, x, y, '', { size: 24, kalin: 600 }); yeniden(c, t, parcalar(k), 6); return t; };
    const kt = kutuTahtasi(c, svg, {
      kutular: [{ baslik: 'Denge kurulmadı', x: 40, y: 310, w: 440, h: 230 }, { baslik: 'Denge kuruldu', x: 520, y: 310, w: 440, h: 230 }],
      ciz: mini, chip: (k, p, x, y) => chipYaz(() => k.chip)(k, p, x, y),
    });
    await c.say('Her kartta bir kapalı kap var; denge kurulmuş mu?', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', soru: (k) => `Kart: “${k.metin}” Hangi kutuya girer?`, kutular: ['Denge kurulmadı', 'Denge kuruldu'],
      kartlar: [
        { metin: 'Kapak yeni kapandı; Vb &gt; Vy.', satir: ['Kapak yeni kapandı;', ['Vb', '>', 'Vy.']].flat(), mm: 8, oklar: [3, 1], kutu: 0, chip: ['Vb', '>', 'Vy'], neden: 'Buharlaşma hâlâ yoğuşmadan hızlı.', ipucu: 'Vb büyükse buhar hâlâ birikiyor.' },
        { metin: 'Vb = Vy.', satir: ['Vb', '=', 'Vy.'], mm: 23.8, oklar: [2, 2], kutu: 1, chip: ['Vb', '=', 'Vy'], neden: 'Hızlar eşit.', ipucu: 'Hızlar eşitse buhar fazı artık değişmez.' },
        { metin: 'Cıva seviyeleri farkı büyüyor.', satir: ['Cıva seviyeleri farkı büyüyor.'], mm: 14, buyuyor: true, kutu: 0, chip: ['fark artıyor'], neden: 'Buhar hâlâ birikiyor.', ipucu: 'Fark büyüyorsa basınç hâlâ artıyor.' },
        { metin: 'Cıva farkı sabit; buhar molekülü sayısı sabit.', satir: ['Cıva farkı sabit; buhar molekülü sayısı sabit.'], mm: 23.8, yog: 5, esit: true, kutu: 1, chip: ['fark sabit'], neden: 'Buharın basıncı artık değişmiyor.', ipucu: 'Her şey sabitse buhar fazı değişmiyor.' },
      ],
      sec: kt.sec, yerlestir: kt.yerlestir,
    });
    await c.say('Hızlar eşitse ve fark sabitse denge kurulmuştur.');
  }

  /* ---- 8. Soru kur ---- */
  async function soruKur(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 0.62, x: 372, y: 196, kapak: 1, mmHg: 23.8, yog: 5, sev: 0.93 });
    d.ekle(U);
    const K = sorukarti(c, svg, { x: 60, y: 290, w: 880, h: 100, satirlar: ['Sıcaklık yükselirse cıva seviyeleri farkı değişir mi?'], size: 30 });
    gizle(K.g);

    await c.say('Denge buhar basıncını cıva seviyeleri farkından okuruz.');
    await c.say('Neyi değiştirirsek bu fark değişir, diye sorabiliriz.');
    await c.say('Bir soru, bir şeyi değiştirip ölçerek cevaplanıyorsa araştırılabilir.');
    await belir(c, K.g, 500, 1);
    await K.etiket(0, 'değiştirdiğimiz', 'sıcaklık');
    await K.etiket(1, 'ölçtüğümüz', 'cıva farkı');
    await c.say('Burada sıcaklığı değiştirir, cıva farkını ölçeriz.');

    // Birlikte çöz: yeni kart.
    c.clearSay();
    await belir(c, K.g, 350, 0); K.g.remove();
    const K2 = sorukarti(c, svg, { x: 60, y: 290, w: 880, h: 100, satirlar: ['Sıvı miktarı artarsa cıva seviyeleri farkı değişir mi?'], size: 30 });
    gizle(K2.g); await belir(c, K2.g, 500, 1);
    await K2.etiket(0, 'değiştirdiğimiz', 'sıvı miktarı');
    await K2.etiket(1, 'ölçtüğümüz', '?');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bu soruda ölçtüğümüz nedir?',
      options: ['Sıvının rengi', 'Cıva seviyeleri farkı', 'Kabın biçimi'], answer: 1,
      hints: ['Önceki kartta ölçtüğümüz buydu.', '', 'Sorunun sonundaki “değişir mi?” neyin değişmesini soruyor?'],
      right: 'Evet. Değişip değişmediğine bakılan şey cıva farkıdır.',
    });
    await par(c.say('Sıvı miktarını değiştirir, cıva farkını ölçeriz.'), K2.etiket(1, 'ölçtüğümüz', 'cıva farkı'));
    c.clearSay();

    // Sor: hangisi araştırılabilir?
    await belir(c, K2.g, 350, 0); K2.g.remove();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangisi araştırılabilir bir sorudur?',
      options: ['Hangi sıvı daha güzel kokar?', 'Buhar basıncı neden bu kadar önemli?', 'Sıvının cinsi değişirse cıva seviyeleri farkı değişir mi?'], answer: 2,
      hints: ['Koku ve önem, cıva farkıyla ölçülmez.', 'Değiştirip ölçebileceğin bir şey var mı?', ''],
      right: 'Evet. Sıvıyı değiştirir, cıva farkını ölçeriz.',
    });
    const K3 = sorukarti(c, svg, { x: 60, y: 290, w: 880, h: 100, satirlar: ['Sıvının cinsi değişirse cıva seviyeleri farkı değişir mi?'], size: 30 });
    gizle(K3.g); await belir(c, K3.g, 500, 1);
    await par(c.say('Sıvının cinsini değiştirir, cıva farkını ölçeriz.'), K3.etiket(0, 'değiştirdiğimiz', 'sıvının cinsi').then(() => K3.etiket(1, 'ölçtüğümüz', 'cıva farkı')));
    c.clearSay();

    // Dene: araştırılabilir ya da araştırılamaz.
    await belir(c, [K3.g, U.kok], 450, 0);
    const kt = kutuTahtasi(c, svg, {
      kutular: [{ baslik: 'Araştırılabilir', x: 40, y: 290, w: 440, h: 250 }, { baslik: 'Araştırılamaz', x: 520, y: 290, w: 440, h: 250 }],
      ciz: (k, g) => k.satir.forEach((s, i) => yazi(c, g, 500, 120 + i * 40, s, { size: 30, kalin: 600 })),
      chip: (k, p, x, y) => yazi(c, p, x, y, k.chip, { size: 26, kalin: 600 }),
    });
    await c.say('Her kart bir soru; değiştirip ölçebilir miyiz?', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', soru: (k) => `Kart: “${k.metin}” Hangi kutuya girer?`, kutular: ['Araştırılabilir', 'Araştırılamaz'],
      kartlar: [
        { metin: 'Kabın biçimi değişirse cıva seviyeleri farkı değişir mi?', satir: ['Kabın biçimi değişirse', 'cıva seviyeleri farkı değişir mi?'], kutu: 0, chip: 'kabın biçimi', neden: 'Kabı değiştirir, farkı ölçeriz.', ipucu: 'Kabı değiştirip cıva farkını ölçebiliriz.' },
        { metin: 'Kabın hacmi değişirse cıva seviyeleri farkı değişir mi?', satir: ['Kabın hacmi değişirse', 'cıva seviyeleri farkı değişir mi?'], kutu: 0, chip: 'kabın hacmi', neden: 'Kabı büyütür, farkı ölçeriz.', ipucu: 'Kabı büyütüp cıva farkını ölçebiliriz.' },
        { metin: 'Etil alkol, sudan daha iyi bir sıvı mıdır?', satir: ['Etil alkol, sudan', 'daha iyi bir sıvı mıdır?'], kutu: 1, chip: 'daha iyi sıvı', neden: '“İyi”yi ölçemeyiz; değiştirip ölçecek bir şey yok.', ipucu: '“İyi” ölçülebilen bir şey mi?' },
      ],
      sec: kt.sec, yerlestir: kt.yerlestir,
    });

    // Beş soru, tek çerçevede.
    c.clearSay();
    await belir(c, svg, 450, 0);
    svg.remove();
    const s2 = c.svg(1000, 562);
    kutu(c, s2, 60, 60, 880, 100, { rx: 16 });
    yazi(c, s2, 500, 122, 'Bir sıvının denge buhar basıncını … etkiler mi?', { size: 34, kalin: 600 });
    const KONU = ['sıvının cinsi', 'sıcaklık', 'sıvı miktarı', 'kabın biçimi', 'kabın hacmi'];
    const ogeler = KONU.map((s, i) => { const t = yazi(c, s2, 500, 230 + i * 56, s, { size: 34, kalin: 700, renk: RENK.vurgu }); t.style.opacity = 0; return t; });
    for (const t of ogeler) { await belir(c, t, 450, 1); await c.wait(450); }
    await c.say('Beş sorunun hepsi tek tek sınanabilir.');
  }

  Ders.start({
    id: 'cesitlilik-i1', kicker: 'Konu I · Buhar basıncı', title: 'Buhar basıncı nedir?', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Buhar basıncı nedir?',
      hook: 'Eline dökülen alkol birkaç saniyede uçar, su kalır; neden?',
      button: 'Derse başla ›',
    },
    goals: [
      'Kapalı kapta buharlaşma ile yoğuşmanın birlikte sürdüğünü açıklar.',
      'Buhar basıncını, buhar moleküllerinin kabın çeperlerine çarpmasıyla oluşan basınç olarak tanımlar.',
      'Denge buhar basıncını, buharlaşma hızı ile yoğuşma hızının eşit olduğu andaki basınç olarak açıklar.',
      'Denge buhar basıncını etkileyebilecek faktörler için araştırılabilir sorular kurar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Erime sıcaklığı ve hidrojen bağını hatırla.', run: hatirla },
      { title: 'Aynı kap, aynı miktar, farklı sıvı', goal: 'Su ile etil alkolün buharlaşma hızını karşılaştır.', run: sivilar },
      { title: 'Kapağı kapat', goal: 'Kapalı kapta buharlaşma ve yoğuşmayı gör.', run: kapak },
      { title: 'Buhar basıncı: çarpan moleküller', goal: 'Buhar basıncının nasıl oluştuğunu ve cıvayla nasıl okunduğunu gör.', run: carpan },
      { title: 'Denge nasıl kurulur', goal: 'Dört aşamada buharlaşma ve yoğuşma hızlarını izle.', run: denge },
      { title: 'Denge durmak değildir', goal: 'Dengede iki olayın sürdüğünü gör.', run: durmaz },
      { title: 'Denge buhar basıncı', goal: 'Denge buhar basıncını tanımla ve durumları sınıflandır.', run: dengeBasinci },
      { title: 'Soru kur', goal: 'Cıva farkını değiştirebilecek araştırılabilir sorular kur.', run: soruKur },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Buhar basıncı nedir?',
        options: ['Sıvı moleküllerinin kabın tabanına uyguladığı basınç', 'Buhar moleküllerinin kabın çeperlerine çarpmasıyla oluşan basınç', 'Kapağın sıvıya uyguladığı basınç'], answer: 1,
        why: ['Basıncı sıvı değil, sıvının üstündeki buhar oluşturur.', 'Buhar molekülleri çeperlere çarpar; bu çarpmaların kuvveti buhar basıncıdır.', 'Kapak buharı kapta tutar; basıncı buhar moleküllerinin çarpması oluşturur.'], scene: 3 },
      { q: 'Denge kurulduğunda kapalı kapta ne olur?',
        options: ['Buharlaşma durur', 'İkisi de durur', 'Buharlaşma ve yoğuşma aynı hızla sürer'], answer: 2,
        why: ['Sıvıdan molekül çıkışı durmaz; yoğuşma da sürer.', 'Dengede iki olay da sürer; yalnızca net değişim sıfırdır.', 'Çıkan ve dönen molekül sayısı eşit olduğu için basınç değişmez.'], scene: 5 },
      { q: 'Kapalı kapta su henüz dengeye ulaşmadı; buharlaşma hızı yoğuşma hızından büyük. Cıva seviyeleri farkı nasıl değişir?',
        options: ['Azalır', 'Artar', 'Aynı kalır'], answer: 1,
        why: ['Buhar hâlâ birikiyor; basınç azalmaz.', 'Buharlaşma hızlı olduğu için buhar birikir, basınç ve fark artar.', 'Fark ancak iki hız eşitlenince sabitlenir.'], scene: 4 },
      { q: 'Kapalı kapta etil alkol dengeye ulaştı. Kapağın altındaki buhar molekülü sayısı bundan sonra nasıl değişir?',
        options: ['Değişmez', 'Artar', 'Azalır'], answer: 0,
        why: ['Çıkan ve dönen molekül sayısı eşit; buhar fazındaki sayı sabit kalır.', 'Artması için buharlaşmanın yoğuşmadan hızlı olması gerekirdi; dengede hızlar eşit.', 'Azalması için yoğuşmanın daha hızlı olması gerekirdi; dengede hızlar eşit.'], scene: 5 },
      { q: 'Hangisi araştırılabilir bir sorudur?',
        options: ['Hangi sıvının kabı daha güzel görünür?', 'Cıva neden gümüş renklidir?', 'Sıcaklık yükselirse cıva seviyeleri farkı değişir mi?'], answer: 2,
        why: ['“Güzel görünmek” cıva farkıyla ölçülemez.', 'Bu soru bir şeyi değiştirip ölçmeyi gerektirmez.', 'Sıcaklığı değiştirir, cıva farkını ölçeriz.'], scene: 7 },
    ],
    summary: [
      'Kapalı kapta buharlaşma ve yoğuşma birlikte sürer.',
      'Buhar basıncı, buharın çeperlere çarpmasıdır.',
      'Dengede iki olay durmaz; basınç değişmez.',
      '<b>Sıvısıyla dengedeki buharın basıncı, denge buhar basıncıdır.</b>',
    ],
    nextLesson: { href: 'i2-faktorler.html', label: 'Sonraki: Buhar basıncını ne etkiler ›' },
  });
})();
