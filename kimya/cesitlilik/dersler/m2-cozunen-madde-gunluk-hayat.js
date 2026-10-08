/* M2 — Çözünen madde ve günlük hayat
   Suda çözünen maddenin cinsi yüzey gerilimini değiştirir: sofra tuzu artırır, sabun ve deterjan azaltır; sonuç moleküller arası çekimin büyüklüğüyle
   gerekçelendirilir, laboratuvar ölçümleriyle karşılaştırılır; ebruda, sütte ve gölette görülür.
   Senaryo: plan/kimya/cesitlilik/senaryolar/M-yuzey-gerilimi.md ("M2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Damla sayıları örnek veridir (300 × N/m): saf su 22, sabunlu su 8 (20 °C). Tuz için sayı yoktur, yalnızca yön. Araçlar: m-araclar.js (KIT_M). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, isaret, sinifla } = window.KIT;
  const { GRI, MOR, DAMLA, kubbeH, sb, para, minipara, beher, deneyTablosu, degiskenler, cekim, iyonsu, sabunMol, suKesiti, tekne, tabak, gol, olcumTablosu, kutuTahtasi } = window.KIT_M;

  /* Etiketli iki parçalı satır: soluk ad + değer. */
  const dizi = (c, p, parcalar, x, y, o = {}) => { const t = yazi(c, p, x, y, '', o); parcalar.forEach(([m, r]) => { const ts = c.S('tspan', { text: m }, t); if (r) ts.style.fill = r; }); return t; };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const B = beher(c, svg, { x: 215, y: 450, k: 0.9, sic: 50 });
    const P = para(c, svg, { x: 640, y: 450, k: 0.9, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 9, sayac: false });
    const I = iyonsu(c, svg, { x: 280, y: 90, w: 440, h: 330 });
    const U = c.S('g', {}, svg);
    [[200, 'saf su', 0], [500, 'tuzlu su', 1], [800, 'sabunlu su', 2]].forEach(([x, ad, q]) => {
      beher(c, U, { x, y: 400, k: 0.6, sic: 20, etiket: false, cozunen: q === 0 ? null : (q === 1 ? 'tuz' : 'sabun'), tohum: 3 + q });
      yazi(c, U, x, 470, ad, { size: 28, kalin: 700 });
    });
    gizle(B.kok, P.kok, I.g, U);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, [B.kok, P.kok], 600));
    await c.choice({
      tag: 'Hatırla', q: 'Bir sıvı ısıtılınca yüzey gerilimi nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Isınan sıvıda çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır.', '', 'Isınan sıvıda çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır.'],
      right: 'Evet. Isınan sıvıda çekim zayıflar; yüzey gerilimi azalır.',
    });
    c.clearSay();
    await belir(c, [B.kok, P.kok], 450, 0);
    await belir(c, I.g, 600, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Na<sup>+</sup> iyonu ile su molekülü arasında hangi etkileşim olur?',
      options: ['Dipol-dipol', 'London', 'İyon-dipol'], answer: 2,
      hints: ['İyon ile polar molekül arasındaki etkileşim iyon-dipoldür; su polar bir moleküldür.', 'İyon ile polar molekül arasındaki etkileşim iyon-dipoldür; su polar bir moleküldür.', ''],
      right: 'Evet. İyon ile polar molekül arasında iyon-dipol etkileşimi olur.',
    });
    c.clearSay();
    await belir(c, I.g, 450, 0);
    await par(c.say('Bugün suya katılan maddelerin yüzey gerilimine etkisine bakacağız.'), belir(c, U, 700, 1));
  }

  /* ---- 2. Suya madde çözülürse ---- */
  async function madde(c) {
    const svg = c.svg(1000, 562);
    const bh = c.S('g', {}, svg);
    const B1 = beher(c, bh, { x: 160, y: 200, k: 0.55, sic: 20, size: 28 });
    const B2 = beher(c, bh, { x: 400, y: 200, k: 0.55, sic: 20, size: 28, cozunen: 'sabun' });
    yazi(c, bh, 160, 246, 'saf su', { size: 26, kalin: 700 }); yazi(c, bh, 400, 246, 'sabunlu su', { size: 26, kalin: 700 });
    const P = para(c, svg, { x: 760, y: 200, k: 0.5, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 22, sayac: false });
    const F = degiskenler(c, svg, { x: 20, y: 262, w: 960, h: 292, size: 28 });
    gizle(bh, P.kok, F.g);

    await par(c.say('Suda çözülen maddeye çözünen madde denir.'), belir(c, bh, 600));
    await c.say('Suya bir madde çözülünce yüzey gerilimi değişir mi?', { speak: '[curious] Suya bir madde çözülünce yüzey gerilimi değişir mi?' });
    await par(c.say('Bunu da para ve damla yöntemiyle araştıracağız.'), belir(c, P.kok, 600), belir(c, F.g, 600));
    await par(c.say('Ölçtüğümüz damla sayısıdır; sıcaklık ve para sabit kalır.'),
      F.yaz(0, ['damla sayısı']), F.yaz(2, ['sıcaklık 20°C', 'sıvı miktarı', 'para', 'damlalık']));

    // Birlikte çöz.
    await F.soru(1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bu araştırmada bağımsız değişken hangisidir?',
      options: ['Taşmadan duran damla sayısı', 'Sıcaklık', 'Suda çözülen maddenin cinsi'], answer: 2,
      hints: ['Damla sayısını ölçeriz; bağımsız değişken değiştirdiğimiz şeydir.', 'Sıcaklık bu araştırmada sabit kalıyor.', ''],
      right: 'Evet. Çözünen maddenin cinsini değiştiririz.',
    });
    c.clearSay();
    await par(c.say('Değiştirdiğimiz, suda çözülen maddenin cinsidir.'), F.yaz(1, ['çözünen', 'maddenin cinsi']));
  }

  /* ---- 3. Saf su ve sabunlu su ---- */
  async function sabunlu(c) {
    const svg = c.svg(1000, 562), k = 0.62;
    const A = para(c, svg, { x: 110, y: 470, k, sivi: 'su', N: DAMLA['su-20'], H: kubbeH('su-20'), etiket: false, size: 24, sayacYer: [110, 528], tasti: false });
    const B = para(c, svg, { x: 350, y: 470, k, sivi: 'sabun', N: DAMLA['sabun-20'], H: kubbeH('sabun-20'), etiket: false, size: 24, sayacYer: [350, 528], tasti: false });
    const ust = c.S('g', {}, svg);
    yazi(c, ust, 110, 286, 'saf su', { size: 28, kalin: 700 }); yazi(c, ust, 350, 286, 'sabunlu su', { size: 28, kalin: 700 });
    sb(c, ust, 230, 232, '20', '°C', { size: 34, kalin: 700, brenk: RENK.yazi });
    yazi(c, ust, 230, 553, 'örnek veri', { size: 20, kalin: 500, renk: RENK.soluk });
    const T = deneyTablosu(c, svg, { x: 490, y: 90, w: 420 });
    gizle(A.kok, B.kok, ust, T.g);

    await par(c.say('Bir kimya kulübü saf suyu ve sabunlu suyu para üstünde denedi.'), belir(c, [A.kok, B.kok, ust, T.g], 700));
    await c.say('İki durumu da dene; her birini tabloya yaz.', { noWait: true });

    // Kaydırıcılı deneme: kaydırıcıyı oynat, “Tabloya yaz” ile satır ekle, “Devam” ile sürdür. Eksik kalan satırı tahta kendisi yazar.
    const S = { coz: 0 }, yazilan = [];
    const guncelle = () => {
      const P = S.coz ? B : A, N = S.coz ? DAMLA['sabun-20'] : DAMLA['su-20'];
      P.kur({ n: 0, tasma: 0 });
      P.say(N, 1500).then((devam) => (devam ? P.tasir(500) : null));
    };
    const sl = c.slider({ tag: 'Dene', label: 'Çözünen madde', min: 0, max: 1, step: 1, value: 0, fmt: (v) => (v ? 'Sıvı sabun' : 'Yok (saf su)'), onInput: (v) => { S.coz = v; guncelle(); } });
    const nb = c.h('div'); c.panel(null, nb);
    const not = (tur, html) => { nb.className = 'fb ' + tur; nb.innerHTML = html; };
    const ekle = async () => {
      if (yazilan.includes(S.coz)) { not('info', 'Bu durum tabloda var. Önce kaydırıcıyı oynat.'); return false; }
      yazilan.push(S.coz);
      await T.satirEkle({ sivi: 'Su', coz: S.coz ? 'sabun' : 'yok', sic: 20, damla: S.coz ? DAMLA['sabun-20'] : DAMLA['su-20'] });
      if (yazilan.length === 1) not('info', 'İlk satır yazıldı.');
      else not('ok', 'Tek değişken değişti: çözünen madde.');
      return true;
    };
    let devam = null;
    for (;;) {
      const yaz = c.cont('Tabloya yaz ›').then(() => 'y');
      const sonuc = await Promise.race(devam ? [yaz, devam.then(() => 'd')] : [yaz]);
      if (sonuc === 'd') break;
      if (!devam) devam = c.cont('Devam ›');
      await ekle();
    }
    let eksik = 0;
    for (const v of [0, 1]) {
      if (yazilan.includes(v)) continue;
      if (!eksik) c.clearAct();
      eksik++;
      sl.set(v); await c.wait(1900); await ekle(); await c.wait(300);
    }
    c.clearAct();
    if (eksik) await c.say('Eksik kalan satır da tabloya yazıldı.');
    // İki taraf da ölçülmüş olsun.
    await par(A.say(DAMLA['su-20'], 1), B.say(DAMLA['sabun-20'], 1));
    A.tasmaGizle(); B.tasmaGizle();

    // Soru.
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Suya sabun katılınca yüzey gerilimi nasıl değişti?',
      options: ['Arttı', 'Değişmedi', 'Azaldı'], answer: 2,
      hints: ['Hangisinin kubbesi alçak, hangisi daha az damla taşıyor?', 'İki satırdaki damla sayıları aynı mı?', ''],
      right: 'Evet. Alçak kubbe, küçük yüzey gerilimidir.',
    });
    c.clearSay();
    const ok1 = T.aralikOku(0);
    await par(c.say('Sabunlu suyun yüzey gerilimi saf suyunkinden küçüktür.'), ok1.goster(600));
  }

  /* ---- 4. Sabun molekülü ne yapar? ---- */
  async function sabun(c) {
    const svg = c.svg(1000, 562);
    // Aşama 1 ve 2: tek molekül ve su yüzeyi.
    const A1 = c.S('g', {}, svg);
    sabunMol(c, A1, [160, 410], 0, 2.2);
    const etH = yazi(c, A1, 232, 418, 'hidrofil: suyu sever', { hiza: 'start', size: 24, kalin: 600 });
    const etK = yazi(c, A1, 222, 320, 'hidrofob: suyu sevmez', { hiza: 'start', size: 24, kalin: 600 });
    const Y1 = suKesiti(c, A1, { x: 500, y: 110, w: 470, h: 340, sutun: 5, satir: 3, kalin: 4.5, sabun: [{ j: 0, i: 1, yuzey: true }, { j: 0, i: 3, yuzey: true }] });
    const oklar = c.S('g', {}, A1);
    Y1.sabunlar.forEach((s) => {
      [0.15, Math.PI - 0.15, Math.PI / 2 + 0.2].forEach((a) => ok(c, oklar, [s.P[0] + 20 * Math.cos(a), s.P[1] + 20 * Math.sin(a)], [s.P[0] + 56 * Math.cos(a), s.P[1] + 56 * Math.sin(a)], RENK.cekme, 4));
    });
    gizle(A1, etH, etK, Y1.g, oklar);

    await par(c.say('Sabun ve deterjan molekülünün iki farklı kısmı vardır.'), belir(c, A1, 600, 1));
    await par(c.say('Hidrofil kısım suyu sever; hidrofob kısım suyu sevmez.'), belir(c, [etH, etK], 600));
    await par(c.say('Hidrofil kısımlar yüzeydeki su moleküllerini kendine doğru çeker.'), belir(c, Y1.g, 600), c.wait(500).then(() => belir(c, oklar, 600, 1)));

    // Aşama 3: saf su ve sabunlu su.
    c.clearSay();
    await belir(c, A1, 450, 0);
    const L = suKesiti(c, svg, { x: 30, y: 110, w: 440, h: 340, sutun: 5, satir: 3, kalin: 4.5, tohum: 11 });
    const R = suKesiti(c, svg, {
      x: 530, y: 110, w: 440, h: 340, sutun: 5, satir: 3, kalin: 4.5, tohum: 12,
      sabun: [{ j: 0, i: 0, yuzey: true }, { j: 0, i: 1, yuzey: true }, { j: 0, i: 3, yuzey: true }, { j: 0, i: 4, yuzey: true }],
    });
    const bas = c.S('g', {}, svg);
    yazi(c, bas, 250, 94, 'saf su', { size: 28, kalin: 700 }); yazi(c, bas, 750, 94, 'sabunlu su', { size: 28, kalin: 700 });
    const e1 = yazi(c, svg, 250, 492, 'hidrojen bağı', { size: 26, kalin: 600, renk: RENK.cekme });
    const e2 = yazi(c, svg, 750, 492, 'zayıf hidrojen bağı', { size: 26, kalin: 600, renk: RENK.cekme });
    const e3 = yazi(c, svg, 500, 538, 'yüzey aktif madde', { size: 30, kalin: 700, renk: MOR });
    gizle(L.g, R.g, bas, e1, e2, e3);
    await belir(c, [L.g, R.g, bas], 600, 1);
    await par(c.say('Sabun, yüzeyi aşıp sıvının içine de girer.'),
      R.tasi(R.sabunlar[0], R.yer(1, 1).P, 75, 1800), R.suAyar(1, 1, 0, 1200),
      R.tasi(R.sabunlar[3], R.yer(2, 3).P, -50, 1800), R.suAyar(2, 3, 0, 1200),
      c.wait(900).then(() => par(R.suAyar(0, 0, 1, 600), R.suAyar(0, 4, 1, 600))));
    await par(c.say('Sıvının içindeki kohezyon kuvvetleri azalır.'), R.ayarla({ kalin: 1.8, kesik: 1 }, 1400), belir(c, [e1, e2], 700));
    await par(c.say('Yüzey gerilimini azaltan böyle maddelere yüzey aktif madde denir.'), belir(c, e3, 600));

    // Soru.
    await c.choice({
      tag: 'Sıra sende', q: 'Sabunlu suyun yüzey gerilimi saf sudan neden küçüktür?',
      options: ['Sabun, su moleküllerini birbirine daha çok bağlar', 'Sabun suyun sıcaklığını yükseltir', 'Sabun, sıvı içinde su molekülleri arasındaki çekimi azaltır'], answer: 2,
      hints: ['Sabunlu suyun içindeki çizgiler kesikli, yani zayıf; bağlamaz, azaltır.', 'Sıcaklık değişmedi; çizgilerin kalınlığına bak.', ''],
      right: 'Evet. Sabun, sıvı içindeki çekimi azaltır.',
    });
    c.clearSay();
    await belir(c, e3, 300, 0);
    await par(c.say('Kohezyon azalınca yüzey gerilimi de azalır.', { speak: '[thoughtful] Kohezyon azalınca yüzey gerilimi de azalır.' }), c.wait(500));
    c.note('<b>Sabun ve deterjan yüzey gerilimini azaltır.</b> Örnek: sabunlu su, saf sudan alçak kubbe.', 'Sabun ve deterjan', 'sabun-deterjan');
  }

  /* ---- 5. Tuz ters yönde etkiler ---- */
  async function tuz(c) {
    const svg = c.svg(1000, 562);
    const L = suKesiti(c, svg, { x: 30, y: 30, w: 440, h: 260, sutun: 5, satir: 3, kalin: 4.5, ust: 30, tohum: 11 });
    const I = iyonsu(c, svg, { x: 530, y: 30, w: 440, h: 260 });
    const e1 = yazi(c, svg, 250, 322, 'su–su', { size: 26, kalin: 600, renk: RENK.cekme });
    const e2 = yazi(c, svg, 750, 322, 'iyon–su', { size: 26, kalin: 600, renk: RENK.cekme });
    const koy = c.S('g', {}, svg);
    const P1 = para(c, koy, { x: 250, y: 500, k: 0.6, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 0, sayac: false });
    const P2 = para(c, koy, { x: 750, y: 500, k: 0.6, sivi: 'tuz', N: 22, H: kubbeH('su-20'), n: 0, sayac: false });
    yazi(c, koy, 250, 552, 'saf su', { size: 26, kalin: 700 }); yazi(c, koy, 750, 552, 'tuzlu su', { size: 26, kalin: 700 });
    const art = c.S('g', {}, svg);
    ok(c, art, [880, 470], [880, 410], RENK.vurgu, 6);
    yazi(c, art, 880, 500, 'artar', { size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(L.g, I.g, I.iyonCizgi, I.suCizgi, e1, e2, koy, art);

    await par(c.say('Suya sofra tuzu katılınca Na<sup>+</sup> ve Cl<sup>−</sup> iyonları suda dağılır.', { speak: 'Suya sofra tuzu katılınca sodyum iyonu ve klorür iyonu suda dağılır.' }), belir(c, [L.g, I.g], 700));
    await par(c.say('İyonlar ile su molekülleri arasında yeni bir etkileşim oluşur.'), belir(c, I.iyonCizgi, 700));
    await par(c.say('Bu etkileşim, su molekülleri arasındakinden daha kuvvetlidir.'), belir(c, [I.suCizgi, e1, e2], 700));
    await par(c.say('Çekim büyüdükçe kohezyon ve yüzey gerilimi büyür.'), belir(c, koy, 600));

    await c.choice({
      tag: 'Tahmin et', q: 'Suya tuz katılırsa yüzey gerilimi ne olur?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['Yeni çekim, su–su çekiminden büyük mü küçük mü? Çekim büyüdükçe yüzey gerilimi büyür.', 'Çekim büyüdükçe yüzey gerilimi ne oluyordu?', ''],
      right: 'Evet. İyon–su çekimi su–su çekiminden kuvvetlidir; yüzey gerilimi artar.',
    });

    // Gör: kubbeler (sayı yok, yalnızca yön).
    c.clearSay();
    P2.st.H = kubbeH('su-20') + 11;
    await par(c.say('Tuz, suyun yüzey gerilimini artırır.'), P1.say(22, 1600), P2.say(22, 1600).then(() => belir(c, art, 500, 1)));

    // Aynı olgunun iki yönü.
    c.clearSay();
    await belir(c, [L.g, I.g, I.iyonCizgi, I.suCizgi, e1, e2, koy, art], 450, 0);
    const iki = c.S('g', {}, svg);
    minipara(c, iki, { x: 250, y: 370, k: 1, h: kubbeH('su-20') + 11, hayalet: kubbeH('su-20'), sivi: 'tuz' });
    minipara(c, iki, { x: 750, y: 370, k: 1, h: kubbeH('sabun-20'), hayalet: kubbeH('su-20'), sivi: 'sabun' });
    yazi(c, iki, 250, 160, 'tuz', { size: 40, kalin: 700 }); yazi(c, iki, 750, 160, 'sabun', { size: 40, kalin: 700 });
    ok(c, iki, [250, 262], [250, 196], RENK.vurgu, 6); ok(c, iki, [750, 196], [750, 262], RENK.vurgu, 6);
    yazi(c, iki, 340, 236, 'artırır', { hiza: 'start', size: 30, kalin: 700, renk: RENK.vurgu });
    yazi(c, iki, 840, 236, 'azaltır', { hiza: 'start', size: 30, kalin: 700, renk: RENK.vurgu });
    yazi(c, iki, 500, 470, 'saf su', { size: 24, kalin: 600, renk: RENK.soluk });
    cizgi(c, iki, [420, 490], [580, 490], GRI.acik, 3, { 'stroke-dasharray': '7 6' });
    gizle(iki);
    await par(c.say('Tuz artırır, sabun azaltır: çözünen maddenin cinsi belirler.'), belir(c, iki, 700));

    // Dene: sınıflandır.
    c.clearSay();
    await belir(c, iki, 400, 0);
    const tahta = c.S('g', {}, svg);
    const KUTU = [{ baslik: 'Artırır', x: 40, y: 240, w: 440, h: 300 }, { baslik: 'Azaltır', x: 520, y: 240, w: 440, h: 300 }];
    const KART = [
      { satir: ['Suya katılan sofra tuzu'], chip: 'tuz', kutu: 0, neden: 'İyon–su çekimi, su–su çekiminden kuvvetlidir.' },
      { satir: ['Suya katılan sıvı sabun'], chip: 'sabun', kutu: 1, neden: 'Sıvı içindeki kohezyon azalır.' },
      { satir: ['Suya katılan deterjan'], chip: 'deterjan', kutu: 1, neden: 'Sabun gibi yüzey aktif maddedir.' },
      { satir: ['Yüzeyde ve sıvının içinde zayıf çizgiler', 'bırakan yüzey aktif madde'], chip: 'yüzey aktif', kutu: 1, neden: 'Kohezyonu azaltan maddeler yüzey gerilimini azaltır.' },
    ];
    const T = kutuTahtasi(c, tahta, {
      kutular: KUTU, aralik: 54,
      ciz: (k, g) => { kutu(c, g, 100, 50, 800, 150, { rx: 16 }); k.satir.forEach((s, i) => yazi(c, g, 500, (k.satir.length > 1 ? 104 : 136) + i * 44, s, { size: 32, kalin: 600 })); },
      chip: (k, p, x, y) => { const g = c.S('g', {}, p); kutu(c, g, x - 110, y - 22, 220, 44, { rx: 10 }); yazi(c, g, x, y + 8, k.chip, { size: 24, kalin: 600 }); return g; },
    });
    await c.say('Her maddeyi etkisine göre ayır.', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: KUTU.map((q) => q.baslik), kartlar: KART,
      soru: (k) => `“${k.satir.join(' ')}” Yüzey gerilimini nasıl etkiler?`,
      sec: T.sec, yerlestir: T.yerlestir,
    });
    c.note('<b>Tuz artırır; sabun ve deterjan azaltır.</b> Örnek: tuzlu su, sabunlu su.', 'Çözünen madde', 'cozunen-madde');
  }

  /* ---- 6. Ölçümlerle karşılaştır ---- */
  async function olcum(c) {
    const svg = c.svg(1000, 562);
    const O = olcumTablosu(c, svg, { x: 550, y: 40, w: 430 });
    const KUTU = [{ baslik: 'Uyumlu', x: 30, y: 150, w: 480, h: 180 }, { baslik: 'Uyumlu değil', x: 30, y: 360, w: 480, h: 180 }];
    const tahta = c.S('g', {}, svg);
    const KART = [
      { satir: ['Isıtılan suyun para üstünde taşıdığı', 'damla azaldı.'], odak: ['su'], kutu: 0, neden: 'Su: 0,073’ten 0,068’e düştü; sıcaklık arttıkça çekim zayıflar.' },
      { satir: ['Isıtılan etanolün kubbesi alçaldı.'], odak: ['etanol'], kutu: 0, neden: 'Etanol: 0,022’den 0,020’ye düştü.' },
      { satir: ['Isıtılan gliserinin kubbesi yükseldi.'], odak: ['gliserin'], kutu: 1, neden: 'Gliserin: 0,063’ten 0,058’e düştü; ısınınca azalır.' },
      { satir: ['Sabunlu suyun kubbesi saf suyunkinden', 'alçak çıktı.'], odak: ['su', 'sabunlu su'], kutu: 0, neden: 'Sabunlu su 0,025, saf su 0,073.' },
      { satir: ['Sabunlu suyun kubbesi 20 °C’taki', 'etanolünkinden alçak çıktı.'], odak: ['sabunlu su', 'etanol'], kutu: 1, neden: 'Sabunlu su 0,025, etanol 0,022: sabunlu suyun gerilimi daha büyük.' },
    ];
    const T = kutuTahtasi(c, tahta, {
      kutular: KUTU,
      konum: (q, n) => [q.x + 70 + n * 66, q.y + 120],
      ciz: (k, g) => { kutu(c, g, 30, 20, 490, 110, { rx: 16 }); k.satir.forEach((s, i) => yazi(c, g, 275, (k.satir.length > 1 ? 66 : 84) + i * 36, s, { size: 26, kalin: 600 })); },
      chip: (k, p, x, y) => isaret(c, p, x, y, k.kutu === 0 ? 'ok' : 'no', 22),
    });
    gizle(tahta);

    await par(c.say('Bir laboratuvar bazı sıvıların yüzey gerilimini ölçtü.'), (async () => { for (let i = 0; i < 5; i++) await O.goster(i, 450); })());
    await par(c.say('Yüzey gerilimi N/m ile verilir; sayı büyükse gerilim büyüktür.', { speak: 'Yüzey gerilimi newton bölü metre ile verilir; sayı büyükse gerilim büyüktür.' }), c.wait(300));
    await par(c.say('Deney sonuçlarımızı bu ölçümlerle karşılaştıralım.'), belir(c, tahta, 600));
    await c.say('Her sonucu ölçümlerle karşılaştır.', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: KUTU.map((q) => q.baslik), kartlar: KART,
      soru: (k) => `“${k.satir.join(' ')}” Bu sonuç ölçümlerle uyumlu mu?`,
      sec: async (i, k) => { await par(T.sec(i, k), O.odak(k.odak)); },
      yerlestir: T.yerlestir,
    });

    // Sonra.
    c.clearSay();
    await par(O.odak(null, 400), belir(c, tahta, 400, 0));
    const buyuk = c.S('g', { transform: 'translate(270,250) scale(3.4)' }, svg); isaret(c, buyuk, 0, 0, 'ok', 22); buyuk.style.opacity = 0;
    await par(c.say('İki faktörün yönü de ölçümlerle uyumlu çıktı.'), belir(c, buyuk, 600));
  }

  /* ---- 7. Günlük hayat: ebru ---- */
  async function ebru(c) {
    const svg = c.svg(1000, 562);
    const T = tekne(c, svg, { x: 90, y: 110, w: 620, h: 340 });
    const yg = c.S('g', {}, svg);
    yazi(c, yg, 400, 510, 'yüzey gerilimi azalır', { size: 30, kalin: 700, renk: RENK.vurgu });
    const sise = c.S('g', { transform: 'translate(800,110) rotate(-160)' }, svg);
    c.S('rect', { x: -26, y: 0, width: 52, height: 82, rx: 10, fill: '#5b678f', stroke: GRI.cam, 'stroke-width': 3 }, sise);
    c.S('rect', { x: -12, y: -26, width: 24, height: 30, rx: 5, fill: '#5b678f', stroke: GRI.cam, 'stroke-width': 3 }, sise);
    const siseAd = yazi(c, svg, 862, 215, 'sığır ödü', { size: 26, kalin: 700 });
    const od = c.S('g', {}, svg), odD = [0, 1, 2].map((i) => c.S('circle', { cx: 788, cy: 140, r: 7, fill: '#8a93ad' }, od));
    gizle(T.g, yg, sise, siseAd, od);
    T.damlalar.forEach((d) => { d.e.style.opacity = 0; });

    await par(c.say('Ebru sanatında boyalar su yüzeyinde yayılarak desen oluşturur.'), belir(c, T.g, 500).then(() => T.damla(450)));
    await par(c.say('Boyaların çökmeden yayılması için yüzey gerilimi azaltılır.'), belir(c, yg, 600));
    await par(c.say('Bunun için sıvıya sığır ödü katılır.'), belir(c, [sise, siseAd], 600).then(async () => {
      await belir(c, od, 300, 1);
      await c.tween(800, (e) => odD.forEach((d, i) => { d.setAttribute('cy', 140 + (120 + i * 14) * e); d.setAttribute('cx', 788 - (150 + i * 12) * e); }));
      await par(belir(c, od, 300, 0), T.yay(1800));
    }));

    await c.choice({
      tag: 'Sıra sende', q: 'Sığır ödü katılmış sıvı ile saf su para üstünde deneniyor. Hangisi daha çok damla taşır?',
      options: ['Sığır ödülü sıvı', 'İkisi aynı sayıda', 'Saf su'], answer: 2,
      hints: ['Sığır ödü yüzey gerilimini azaltır; kubbesi alçak olan az damla taşır.', 'Yüzey gerilimi küçük olan sıvının kubbesi alçaktır; damla sayıları farklıdır.', ''],
      right: 'Evet. Yüzey gerilimi büyük olan, daha çok damla taşır.',
    });
    c.clearSay();
    await belir(c, [T.g, yg, sise, siseAd], 450, 0);
    const iki = c.S('g', {}, svg);
    minipara(c, iki, { x: 270, y: 400, k: 1, h: kubbeH('su-20'), sivi: 'su' }); minipara(c, iki, { x: 730, y: 400, k: 1, h: 36, sivi: 'odu' });
    yazi(c, iki, 270, 490, 'saf su', { size: 30, kalin: 700 }); yazi(c, iki, 730, 490, 'sığır ödülü sıvı', { size: 30, kalin: 700 });
    gizle(iki);
    await par(c.say('Sığır ödülü sıvının kubbesi alçak: yüzey gerilimi küçüktür.'), belir(c, iki, 600));

    // Sonra: boya yayılır.
    c.clearSay();
    await belir(c, iki, 400, 0);
    const T2 = tekne(c, svg, { x: 90, y: 110, w: 620, h: 340 });
    T2.damlalar.forEach((d) => { d.e.style.opacity = 1; });
    const yy = yazi(c, svg, 400, 500, 'boya yayılır', { size: 32, kalin: 700, renk: RENK.vurgu });
    gizle(T2.g, yy);
    await belir(c, T2.g, 400, 1);
    await par(c.say('Yüzey gerilimi azalınca boya yayılır; ebru ustası bunu kullanır.'), T2.yay(1800), belir(c, yy, 800));
  }

  /* ---- 8. Günlük hayat: süt ve deterjan ---- */
  async function sut(c) {
    const svg = c.svg(1000, 562);
    const A = tabak(c, svg, { x: 250, y: 300, r: 125 }), B = tabak(c, svg, { x: 750, y: 300, r: 125 });
    const bas = c.S('g', {}, svg);
    yazi(c, bas, 250, 130, 'önce', { size: 30, kalin: 700 }); yazi(c, bas, 750, 130, 'sonra', { size: 30, kalin: 700 });
    // Deterjan damlalığı (ortada).
    const dg = c.S('g', {}, svg);
    c.S('path', { d: 'M492,100 L492,150 L508,150 L508,100 L504,170 L496,170 Z', fill: '#2b3560', stroke: GRI.cam, 'stroke-width': 3, 'stroke-linejoin': 'round' }, dg);
    c.S('ellipse', { cx: 500, cy: 82, rx: 20, ry: 26, fill: '#3a4577', stroke: GRI.cam, 'stroke-width': 3 }, dg);
    c.S('path', { d: 'M496,106 L496,150 L504,150 L504,106 Z', fill: MOR, 'fill-opacity': 0.9 }, dg);
    const dAd = yazi(c, svg, 500, 205, 'deterjan', { size: 26, kalin: 700, renk: MOR });
    const dD = [0, 1, 2].map(() => c.S('circle', { cx: 500, cy: 172, r: 7, fill: MOR }, svg));
    dD.forEach((d) => { d.style.opacity = 0; });
    const k1 = yazi(c, svg, 250, 490, 'kohezyon büyük', { size: 28, kalin: 600 }), k2 = yazi(c, svg, 750, 490, 'kohezyon az', { size: 28, kalin: 600 });
    const yg = c.S('g', {}, svg); yazi(c, yg, 500, 296, 'yüzey', { size: 26, kalin: 700, renk: RENK.vurgu }); yazi(c, yg, 500, 330, 'gerilimi azalır', { size: 26, kalin: 700, renk: RENK.vurgu });
    const halka = c.S('circle', { cx: 750, cy: 300, r: 138, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, svg);
    gizle(A.g, B.g, bas, dg, dAd, k1, k2, yg, halka);

    await par(c.say('Süte damlayan gıda boyaları dağılmadan, damla gibi durur.'), belir(c, [A.g, B.g, bas], 700));
    await par(c.say('Birkaç damla deterjan eklenince boyalar ve süt dağılır.'),
      (async () => {
        await belir(c, [dg, dAd], 500, 1);
        for (let i = 0; i < 3; i++) {
          dD[i].style.opacity = 1;
          await c.tween(450, (e) => { dD[i].setAttribute('cx', 500 + 250 * e); dD[i].setAttribute('cy', 172 + 128 * e); }, Ders.ease.in);
          dD[i].style.opacity = 0;
        }
        await B.dagit(1800);
      })());
    await par(c.say('Deterjan, sıvının yüzey gerilimini azaltır.'), belir(c, yg, 600), belir(c, [dg, dAd], 400, 0));
    await par(c.say('Kohezyon büyükken damla toplu kalır; azalınca yayılır.'), belir(c, [k1, k2], 700));

    await c.choice({
      tag: 'Sıra sende', q: 'Deterjan damlatılınca boyalar neden dağılır?',
      options: ['Deterjan yüzey gerilimini artırır', 'Deterjan kohezyonu azaltır; damla toplu kalamaz', 'Deterjan sütü ısıtır'], answer: 1,
      hints: ['Deterjan yüzey gerilimini azaltır; artırsaydı damla toplu kalırdı.', '', 'Süt ısınmaz; deterjan kohezyonu azaltır.'],
      right: 'Evet. Kohezyon azalınca damla toplu kalamaz.',
    });
    c.clearSay();
    await par(c.say('Kohezyon azaldı; boyalar toplu kalamadı, dağıldı.'), belir(c, halka, 600));
  }

  /* ---- 9. Günlük hayat: gölette ördekler ---- */
  async function ordek(c) {
    const svg = c.svg(1000, 562);
    const G = gol(c, svg, { x: 40, y: 300, w: 920, h: 240 });
    const ye = yazi(c, svg, 546, 150, 'suyun kohezyonu büyük', { size: 30, kalin: 700, renk: RENK.vurgu });
    const ko = c.S('g', {}, svg);
    yazi(c, ko, 320, 236, 'kohezyon', { size: 26, kalin: 700, renk: RENK.cekme }); ok(c, ko, [400, 240], [484, 246], RENK.cekme, 7);
    yazi(c, ko, 790, 340, 'adezyon', { size: 26, kalin: 700, renk: RENK.cekme }); ok(c, ko, [720, 330], [640, 285], RENK.cekme, 3);
    const dt = yazi(c, svg, 224, 210, 'deterjan', { size: 28, kalin: 700, renk: MOR });
    gizle(G.g, ye, ko, dt);

    await par(c.say('Ördeğin tüyleri ıslanmaz; su tüyün üstünde damla kalır.'), belir(c, [G.g, ye], 700));
    await par(c.say('Çünkü suyun kohezyonu, su ile tüy arasındaki adezyondan büyüktür.'), belir(c, ko, 700));
    await par(c.say('Bir göletteki ördekler birkaç gündür yüzemeyip batıyor.'), belir(c, [ko, ye], 400, 0).then(() => G.isla(1800, 0.4)));
    await par(c.say('Ördeklerde sorun yok; gölete deterjan karışmış.'), belir(c, dt, 500), G.deterjanKat(2000));

    await c.choice({
      tag: 'Sıra sende', q: 'Deterjan karışan suda ördeğin tüylerine ne olur?',
      options: ['Suyun kohezyonu artar, tüyler ıslanmaz', 'Tüyün su ile adezyonu azalır, tüyler ıslanmaz', 'Suyun kohezyonu azalır, su tüyleri ıslatır'], answer: 2,
      hints: ['Deterjan suyun kohezyonunu azaltır; artırmaz.', 'Adezyon kohezyondan büyük olunca sıvı yayılır, yüzeyi ıslatır.', ''],
      right: 'Evet. Kohezyon azalır; su tüyleri ıslatır.',
    });
    c.clearSay();
    await par(c.say('Deterjan yüzey gerilimini azaltır; tüyler ıslanır, ördek yüzemez.'), G.isla(2200, 1));
  }

  Ders.start({
    id: 'cesitlilik-m2', kicker: 'Konu M · Yüzey gerilimi', title: 'Çözünen madde ve günlük hayat', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Çözünen madde ve günlük hayat',
      hook: 'Suya bir madde çözersen yüzeyi aynı gerginlikte kalır mı?',
      button: 'Derse başla ›',
    },
    goals: [
      'Çözünen maddenin cinsinin yüzey gerilimine etkisini para ve damla yöntemiyle araştırır.',
      'Tuzun artırdığını, sabun ve deterjanın azalttığını moleküller arası çekimle açıklar.',
      'Sonuçları ölçümlerle karşılaştırır ve günlük hayattaki örneklerle ilişkilendirir.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Sıcaklığın etkisini ve iyon-dipol etkileşimini hatırla.', run: hatirla },
      { title: 'Suya madde çözülürse', goal: 'Çözünen maddeyi bağımsız değişken olarak belirle.', run: madde },
      { title: 'Saf su ve sabunlu su', goal: 'Saf suyu ve sabunlu suyu para üstünde karşılaştır.', run: sabunlu },
      { title: 'Sabun molekülü ne yapar?', goal: 'Sabunun yüzey gerilimini neden azalttığını gör.', run: sabun },
      { title: 'Tuz ters yönde etkiler', goal: 'Tuzun yüzey gerilimini artırdığını çekimle açıkla.', run: tuz },
      { title: 'Ölçümlerle karşılaştır', goal: 'Deney sonuçlarını ölçüm tablosuyla karşılaştır.', run: olcum },
      { title: 'Günlük hayat: ebru', goal: 'Ebruda yüzey geriliminin rolünü gör.', run: ebru },
      { title: 'Günlük hayat: süt ve deterjan', goal: 'Süte deterjan damlatınca ne olduğunu açıkla.', run: sut },
      { title: 'Günlük hayat: gölette ördekler', goal: 'Deterjanın ördeğin tüylerini nasıl ıslattığını açıkla.', run: ordek },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Saf su ve sabunlu su para üstünde deneniyor. Hangisi daha az damla taşır?',
        options: ['Saf su', 'İkisi aynı sayıda', 'Sabunlu su'], answer: 2,
        why: ['Saf suyun yüzey gerilimi büyüktür; kubbesi yüksek, daha çok damla taşır.', 'Yüzey gerilimleri farklı olduğu için damla sayıları da farklıdır.', 'Sabunlu suyun yüzey gerilimi küçüktür; kubbesi alçak, az damla taşır.'], scene: 2 },
      { q: 'Suya sofra tuzu katılırsa yüzey gerilimi nasıl değişir?',
        options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
        why: ['Tuz iyonları ile su arasındaki çekim, su moleküllerinin arasındakinden kuvvetlidir; yüzey gerilimi artar.', 'Her madde azaltmaz; tuz iyonları ile su arasındaki çekim yüzey gerilimini artırır.', 'Çözünen madde yüzey gerilimini değiştirir; tuz artırır.'], scene: 4 },
      { q: 'Ebru teknesine sığır ödü katılıyor. Boyaların yayılmasının nedeni nedir?',
        options: ['Sıvının yüzey gerilimi artar', 'Sıvının yüzey gerilimi azalır', 'Sıvı ısınır'], answer: 1,
        why: ['Yüzey gerilimi artsaydı boyalar toplu kalırdı.', 'Sığır ödü yüzey gerilimini azaltır; boyalar çökmeden yayılır.', 'Sıvı ısıtılmaz; sığır ödü yüzey gerilimini azaltır.'], scene: 6 },
      { q: 'Gölete deterjan karışırsa suyun yüzey gerilimi ve ördeğin tüylerinin ıslanması nasıl olur?',
        options: ['Yüzey gerilimi artar; tüyler ıslanmaz', 'Yüzey gerilimi değişmez; tüyler ıslanmaz', 'Yüzey gerilimi azalır; su tüyleri daha kolay ıslatır'], answer: 2,
        why: ['Deterjan yüzey gerilimini artırmaz, azaltır.', 'Deterjan yüzey gerilimini değiştirir; azaltır.', 'Yüzey gerilimi ve kohezyon azalır; su tüyleri ıslatır.'], scene: 8 },
      { q: 'Sabun molekülünün hangi kısmı suyu sever?',
        options: ['Hidrofil kısmı', 'Hidrofob kısmı', 'İki kısmı da sever'], answer: 0,
        why: ['Hidrofil, suyu seven kısımdır.', 'Hidrofob, suyu sevmeyen kısımdır.', 'Bir kısmı suyu sever, öbürü sevmez.'], scene: 3 },
    ],
    summary: [
      'Çözünen maddenin cinsi yüzey gerilimini değiştirir.',
      'Tuz artırır; sabun ve deterjan azaltır.',
      'Ölçümler iki faktörün yönünü doğruladı.',
      '<b>Tuz artırır; sabun ve deterjan yüzey gerilimini azaltır.</b>',
    ],
    nextLesson: { href: 'm3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
