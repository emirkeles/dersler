/* C3 — Hâl değişimi için gereken ısı
   Hâl değiştirme sıcaklığındaki saf bir maddenin tamamının hâl değiştirmesi için gereken ısı Q = m · L ile hesaplanır;
   grafikte düz parçanın boyu bu ısıdır.
   Senaryo: plan/fizik/enerji/senaryolar/C-hal-degisimi.md (C3). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Figür yalnızca hazır pozla kullanılır (verinin geldiği düzeneği hatırlatır). Sayılar senaryonun değerleridir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, ok, tablo, cubuk: yatayCubuk } = window.KIT;
  const { kutleEtiketi, sicaklikEtiketi, bin, grafik } = window.KIT_C;
  const { lerp, ease } = Ders;
  const ISI = RENK.isi, KUTLE = RENK.kutle, SIC = RENK.sicaklik, SOGUK = RENK.soguk, IYI = RENK.iyi;
  const BUZ = '#a9d4ff', BUZ_KENAR = '#e6f3ff';
  const ACIK_SARI = '#ffe9a6';

  /* ---- yerel yardımcılar ---- */
  const yerlesim = (g, x, y, s = 1) => g.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  /* Gruptan gruba yumuşak geçiş: a, b = [x, y, ölçek]. */
  const gecis = (c, g, a, b, ms) => c.tween(ms, (e) => yerlesim(g, lerp(a[0], b[0], e), lerp(a[1], b[1], e), lerp(a[2], b[2], e)), ease.inOut);
  /* Ölçek 1 → 1,2 → 1 (400 ms); (cx, cy) öğenin kendi koordinatında merkezidir. */
  const nabiz = (c, el, cx, cy) => c.tween(400, (e) => {
    const s = 1 + 0.2 * Math.sin(Math.PI * e);
    el.setAttribute('transform', `translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})`);
  }, ease.inOut);
  /* Turuncu çerçeve ve parantez; ikisi de gizli başlar. */
  const cerceve = (c, p, x, y, w, h) => {
    const r = c.S('rect', { x, y, width: w, height: h, rx: 8, fill: 'none', stroke: ISI, 'stroke-width': 3 }, p);
    gizle(r); return r;
  };
  const parantez = (c, p, x1, x2, y, renk = ISI) => {
    const g = c.S('g', {}, p);
    c.S('path', { d: `M${x1},${y} v9 H${x2} v-9`, fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    gizle(g); return g;
  };
  /* Yazıyı iki yerde birden kurup (parcaKoy) yeni içerikle belirtir. */
  const degistir = async (c, t, parcalar, ms = 400) => { gizle(t); parcaKoy(c, t, parcalar); await belir(c, t, ms); };

  /* Veri tablosu (sahne 2, 3): yerel koordinatta (0, 0) köşeli; yerlesim ile tahtaya konur. Sütunlar: kütle, ısı, ısı ÷ kütle. */
  function veriTablo(c, p, ad, satirlar) {
    const g = c.S('g', {}, p);
    const tb = tablo(c, g, { x: 0, y: 0, satir: satirlar.length, h: 70, size: 28, sutunlar: [{ ad: 'Kütle', w: 110 }, { ad: 'Isı', w: 160 }, { ad: 'Isı ÷ kütle', w: 200 }] });
    const baslik = yazi(c, g, 0, -34, ad, { size: 32, kalin: 700, hiza: 'start' });
    const L = yazi(c, g, 370, -34, 'L', { size: 40, kalin: 700, renk: ISI });
    gizle(L);
    satirlar.forEach((s, i) => {
      tb.yaz(i, 0, s[0], KUTLE); tb.yaz(i, 1, s[1], ISI); tb.yaz(i, 2, s[2], s[2] === '?' ? RENK.soluk : ISI);
    });
    return {
      g, tb, baslik, L, hucre: (i, j) => tb.satirlar[i].hucreler[j],
      cerceve: (i) => cerceve(c, g, 276, 70 * (i + 1) + 5, 188, 60),
    };
  }

  /* Sıcaklık–zaman grafiği (sahne 9): yerel çizim. Eksen adı "Zaman"; çentikler t, 2t, … biçimindedir.
     o: { x0, u (1t'nin boyu), xUc, tik: [[k, 'yazı'], …], egri: [{ ad, renk, nok: [[k, y], …4 nokta] }] }
     Her eğri: yükselme, yatay parça (erime), yükselme. Yatay parça önce ince; kalin(i) kalınlaştırır, paran(i) altına parantez ve ısı yazısı koyar. */
  function zamanGrafik(c, p, o) {
    const g = c.S('g', {}, p), y0 = 410, yUst = 110, size = 24;
    cizgi(c, g, [o.x0, yUst], [o.x0, y0], RENK.cizgi, 3);
    cizgi(c, g, [o.x0, y0], [o.xUc, y0], RENK.cizgi, 3);
    (o.tik || []).forEach(([k, m]) => {
      cizgi(c, g, [o.x0 + k * o.u, y0], [o.x0 + k * o.u, y0 + 8], RENK.cizgi, 3);
      yazi(c, g, o.x0 + k * o.u, y0 + 32, m, { size, kalin: 600, renk: RENK.soluk });
    });
    yazi(c, g, o.xUc, y0 - 14, 'Zaman', { size, kalin: 700, renk: RENK.yazi, hiza: 'end' });
    yazi(c, g, o.x0, yUst - 15, 'Sıcaklık', { size, kalin: 700, renk: SIC, hiza: 'start' });
    const egri = o.egri.map((e) => {
      const P = e.nok.map(([k, y]) => [o.x0 + k * o.u, y]);
      cizgi(c, g, P[0], P[1], e.renk, 3); cizgi(c, g, P[2], P[3], e.renk, 3);
      const pl = cizgi(c, g, P[1], P[2], e.renk, 3);
      const ad = yazi(c, g, P[3][0] + 10, P[3][1] + 8, e.ad, { size, kalin: 700, renk: e.renk, hiza: 'start' });
      const yy = P[1][1] + 16;
      const pg = parantez(c, g, P[1][0], P[2][0], yy);
      const et = e.isi ? yazi(c, g, (P[1][0] + P[2][0]) / 2, yy + 44, e.isi, { size: 26, kalin: 700, renk: ISI }) : null;
      if (et) gizle(et);
      return { pl, pg, et, ad, kalin: () => c.tween(300, (k) => pl.setAttribute('stroke-width', lerp(3, 6, k)), ease.out) };
    });
    return { g, egri };
  }
  const egriNok = (yPlato, bitis, k1, k2, son) => [[0, 380], [k1, yPlato], [k2, yPlato], [son, bitis]];

  /* ---- 1. Hatırla ---- */
  const HAL_KOSE = [[0, -20], [4200, 0], [37600, 0], [79400, 100], [305400, 100], [325000, 120, true]];
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const gr = c.S('g', {}, svg);
    const G = grafik(c, gr, { kose: HAL_KOSE });
    gr.setAttribute('transform', 'translate(-165,0)');
    const bant = c.S('rect', { x: G.X(4200), y: G.Y(0) - 14, width: G.X(37600) - G.X(4200), height: 28, rx: 6, fill: ISI, 'fill-opacity': 0.6 }, G.g);
    G.g.insertBefore(bant, G.g.children[1]);
    gizle(bant);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), G.ilerle(c, HAL_KOSE.length - 1, 2400));
    await belir(c, bant, 350);
    await c.choice({
      tag: 'Hatırla', q: 'Bir maddenin sıcaklık–ısı grafiğindeki yatay parçada ne olur?',
      options: ['Madde ısınır; sıcaklık yükselir', 'Madde hâl değiştirir; ısı girer, sıcaklık sabit kalır', 'Isı girmez; madde soğur'], answer: 1,
      hints: ['Hâl değişirken ısı girer, sıcaklık sabit kalır.', '', 'Hâl değişirken ısı girer, sıcaklık sabit kalır.'],
      right: 'Evet. Yatay parçada hâl değişir; sıcaklık sabit kalır.',
    });
    await c.say('Yatay parçada ısı girer ama sıcaklık sabit kalır.');

    // İkinci soru: 100 g ve 200 g buz, ısı çubukları.
    c.clearSay();
    await belir(c, gr, 300, 0); gr.remove();
    const g2 = c.S('g', {}, svg);
    g2.setAttribute('transform', 'translate(60,0)');
    const e1 = yazi(c, g2, 330, 196, '100 g buz', { size: 32, kalin: 700, renk: KUTLE, hiza: 'end' });
    const e2 = yazi(c, g2, 330, 346, '200 g buz', { size: 32, kalin: 700, renk: KUTLE, hiza: 'end' });
    const b1 = yatayCubuk(c, g2, 360, 186, ISI, { h: 54 }), b2 = yatayCubuk(c, g2, 360, 336, ISI, { h: 54 });
    b1.boy(160); b2.boy(320);
    const s1 = yazi(c, g2, 540, 196, '33.400 J', { size: 32, kalin: 700, renk: ISI, hiza: 'start' });
    const s2 = yazi(c, g2, 700, 346, '66.800 J', { size: 32, kalin: 700, renk: ISI, hiza: 'start' });
    gizle(g2, s1, s2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Hatırla', q: '100 g buzu eritmek 33.400 J ister. 200 g buz için gereken ısı kaç J’dur?',
      options: ['33.400 J', '16.700 J', '66.800 J'], answer: 2,
      hints: ['Kütle iki katına çıkınca gereken ısı da iki katına çıkar.', 'Kütle iki katına çıkınca gereken ısı da iki katına çıkar.', ''],
      right: 'Evet. Kütle iki katına çıkınca ısı da iki katına çıkar.',
    });
    await par(c.say('Kütle iki katına çıkınca gereken ısı da iki katına çıkar.'), (async () => { await belir(c, s1, 300); await belir(c, s2, 300); })());
    await c.say('Bugün bu ısıyı hesaplayan modeli bulacağız.');
  }

  /* ---- 2. Buzun verisi: gram başına ısı ---- */
  async function buzVerisi(c) {
    const svg = c.svg(1000, 562);
    const T = veriTablo(c, svg, 'buz · 0 °C', [['100 g', '33.400 J', '?'], ['200 g', '66.800 J', '?']]);
    yerlesim(T.g, 194, 150, 1.3);
    gizle(T.g);
    const f1 = T.cerceve(0), f2 = T.cerceve(1);
    // Tablo hücreleri "?" ile başlar; satır grupları gizli (tablo aracı böyle kurar).
    await par(c.say('Ela’nın buz deneyindeki ısı verilerine yeniden bakalım.'), belir(c, T.g, 400));
    await par(c.say('100 g buz için 33.400 J, 200 g için 66.800 J gerekti.', { speak: 'Yüz gram buz için otuz üç bin dört yüz jul, iki yüz gram için altmış altı bin sekiz yüz jul gerekti.' }), (async () => { await T.tb.goster(0, 350); await T.tb.goster(1, 350); })());
    const h0 = T.hucre(0, 2), h1 = T.hucre(1, 2);
    gizle(h0); T.tb.yaz(0, 2, '334 J/g', ISI);
    await par(c.say('Isıyı kütleye bölelim: 33.400 bölü 100, 334 J/g.', { speak: 'Isıyı kütleye bölelim: otuz üç bin dört yüz bölü yüz, gram başına üç yüz otuz dört jul.' }), belir(c, h0, 400));
    gizle(h1); T.tb.yaz(1, 2, '334 J/g', ISI);
    await par(c.say('66.800 bölü 200 de 334 J/g çıkıyor.', { speak: 'Altmış altı bin sekiz yüz bölü iki yüz de gram başına üç yüz otuz dört jul çıkıyor.' }), belir(c, h1, 400));
    await par(c.say('Kütle değişse de her gram buz 334 J istiyor.', { speak: 'Kütle değişse de her gram buz üç yüz otuz dört jul istiyor.' }), belir(c, [f1, f2], 300));
    await c.say('Buzun bir gramı için gereken ısı hep aynıdır.');
    await par(c.say('Bu sayı buzun hâl değişim ısısıdır; L ile gösterilir.', { speak: 'Bu sayı buzun hâl değişim ısısıdır; le ile gösterilir.' }), (async () => { await belir(c, T.L, 300); await nabiz(c, T.L, 370, -48); })());
    await c.say('Hâl değişim ısısı, bir gramın tamamen hâl değiştirmesi için gereken ısıdır.');
  }

  /* ---- 3. Bal mumunun verisi: L maddeye göre değişir ---- */
  async function balMumu(c) {
    const svg = c.svg(1000, 562);
    const A = veriTablo(c, svg, 'buz · 0 °C', [['100 g', '33.400 J', '334 J/g'], ['200 g', '66.800 J', '334 J/g']]);
    const B = veriTablo(c, svg, 'bal mumu', [['100 g', '16.800 J', '168 J/g'], ['200 g', '33.600 J', '?']]);
    yerlesim(A.g, 194, 150, 1.3); yerlesim(B.g, 505, 180, 1);
    A.tb.goster(0, 0); A.tb.goster(1, 0); B.tb.goster(0, 0); B.tb.goster(1, 0);
    A.L.style.opacity = 1;
    const b0 = B.hucre(0, 2), b1 = B.hucre(1, 2);
    // Buzun L değeri tablodan kalkınca bu kartta kalır (tahtada kelime bütçesi için).
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 30, 230, 420, 100, { rx: 14 });
    const kY = renkli(c, kart, 240, 295, [['buz', KUTLE], ': ', ['L', ISI], ' = ', ['334 J/g', ISI]], { size: 36, kalin: 700 });
    gizle(A.g, B.g, b0, kart);
    const fB = B.cerceve(0), fS = B.cerceve(1);
    await par(c.say('Bal mumuyla aynı hesabı yapalım.'), belir(c, A.g, 400));
    await par(c.say('100 g bal mumu için 16.800 J gerekmişti.', { speak: 'Yüz gram bal mumu için on altı bin sekiz yüz jul gerekmişti.' }), (async () => {
      await belir(c, A.g, 350, 0);
      await par(belir(c, kart, 400), belir(c, B.g, 400));
    })());
    await par(c.say('16.800 bölü 100: bal mumunun L’si 168 J/g.', { speak: 'On altı bin sekiz yüz bölü yüz: bal mumunun le’si gram başına yüz altmış sekiz jul.' }), (async () => { await belir(c, b0, 400); await belir(c, B.L, 300); })());
    await par(c.say('Buz 334 J/g istiyor; bal mumu 168 J/g.', { speak: 'Buz gram başına üç yüz otuz dört jul istiyor; bal mumu gram başına yüz altmış sekiz jul.' }), belir(c, fB, 300));
    await c.say('Hâl değişim ısısı maddeye göre değişir.');
    await c.say('Bu yüzden maddeler için ayırt edici bir özelliktir.');

    // Birlikte çöz: ikinci satırın "?" hücresi vurgulanır.
    c.clearSay();
    await belir(c, fB, 250, 0);
    B.tb.vurgula(1); await belir(c, fS, 300);
    await c.choice({
      tag: 'Birlikte çöz', q: '200 g bal mumu için ısıyı kütleye bölünce kaç J/g çıkar?',
      options: ['336 J/g', '168 J/g', '33.600 J/g'], answer: 1,
      hints: ['L kütleye bağlı değildir; 100 g’da kaç çıkmıştı?', '', '33.600 ÷ 200 işlemini yap.'],
      right: 'Evet. L kütleye bağlı değildir.',
    });
    gizle(b1); b1.textContent = '168 J/g'; b1.style.fill = ISI;
    await par(c.say('Kütle iki katı olsa da L aynı kaldı: 168 J/g.', { speak: 'Kütle iki katı olsa da le aynı kaldı: gram başına yüz altmış sekiz jul.' }), (async () => {
      await belir(c, b1, 400);
      await par(nabiz(c, kY, 240, 285), nabiz(c, B.L, 370, -48));
    })());
    c.note('L: bir gramın tamamen hâl değiştirmesi için gereken ısı.', 'Hâl değişim ısısı');
  }

  /* ---- 4. Model: Q = m · L ---- */
  async function model(c) {
    const svg = c.svg(1000, 562);
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 300, 92, 400, 116, { rx: 16 });
    renkli(c, kart, 500, 172, [['Q', ISI], ' = ', ['m', KUTLE], ' · ', ['L', ISI]], { size: 64, kalin: 700 });
    const kartYer = (s, dy) => kart.setAttribute('transform', `translate(500,${150 + dy}) scale(${s}) translate(-500,-150)`);
    kartYer(0.8, 0); gizle(kart);
    const sat = [
      renkli(c, svg, 330, 262, [['Q', ISI], ' — ısı (J)'], { size: 26, hiza: 'start' }),
      renkli(c, svg, 330, 312, [['m', KUTLE], ' — kütle (g)'], { size: 26, hiza: 'start' }),
      renkli(c, svg, 330, 362, [['L', ISI], ' — hâl değişim ısısı (J/g)'], { size: 26, hiza: 'start' }),
    ];
    const birim = renkli(c, svg, 500, 450, [['334 kJ/kg', ISI], ' = ', ['334 J/g', ISI]], { size: 30 });
    const etk = renkli(c, svg, 500, 290, [['250 g buz', KUTLE]], { size: 36, kalin: 700 });
    const hesap = renkli(c, svg, 500, 385, [['Q', ISI], ' = 250 · 334 = ', ['83.500 J', ISI]], { size: 46 });
    gizle(sat, birim, etk, hesap);

    await c.say('Bir gram L isterse, m gram m katı ister.', { speak: 'Bir gram le isterse, me gram me katı ister.' });
    await par(c.say('Gereken ısı: kütle çarpı L. Q = m · L.', { speak: 'Gereken ısı: kütle çarpı le. Kü eşittir me çarpı le.' }),
      c.tween(500, (e) => { kartYer(lerp(0.8, 1, e), 0); kart.style.opacity = e; }, ease.out));
    await par(c.say('Q ısıdır; m kütledir; L hâl değişim ısısıdır.', { speak: 'Kü ısıdır; me kütledir; le hâl değişim ısısıdır.' }), (async () => { for (const s of sat) await belir(c, s, 350); })());
    await c.say('Uluslararası birimi J/kg’dır; biz burada J/g kullanıyoruz.', { speak: 'Uluslararası birimi jul bölü kilogram’dır; biz burada jul bölü gram kullanıyoruz.' });
    await par(c.say('Tabloda 334 kJ/kg yazar; bu, 334 J/g demektir.', { speak: 'Tabloda üç yüz otuz dört kilojul bölü kilogram yazar; bu, üç yüz otuz dört jul bölü gram demektir.' }), belir(c, birim, 400));

    // Çözülmüş örnek: kart yukarı kayar, hesap satırı belirir.
    await par(c.say('250 g buz için Q = 250 · 334 = 83.500 J.', { speak: 'İki yüz elli gram buz için kü eşittir iki yüz elli çarpı üç yüz otuz dört eşittir seksen üç bin beş yüz jul.' }), (async () => {
      await par(belir(c, birim, 300, 0), belir(c, sat, 400, 0), c.tween(500, (e) => kartYer(1, -40 * e), ease.inOut));
      await par(belir(c, etk, 400), belir(c, hesap, 400));
    })());

    // Birlikte çöz: 150 g bal mumu.
    c.clearSay();
    await belir(c, [etk, hesap], 250, 0);
    parcaKoy(c, etk, [['150 g bal mumu', KUTLE]]); parcaKoy(c, hesap, [['Q', ISI], ' = 150 · 168 = ?']);
    await belir(c, [etk, hesap], 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sonuç kaç J’dur?', options: ['2.520 J', '318 J', '25.200 J'], answer: 2,
      hints: ['Q = m · L: kütle ile 168’i çarp.', 'Q = m · L: kütle ile 168’i çarp.', ''],
      right: 'Evet. Kütle ile L çarpılır.',
    });
    gizle(hesap); parcaKoy(c, hesap, [['Q', ISI], ' = 150 · 168 = ', ['25.200 J', ISI]]);
    await par(c.say('150 g bal mumu için gereken ısı 25.200 J.', { speak: 'Yüz elli gram bal mumu için gereken ısı yirmi beş bin iki yüz jul.' }), belir(c, hesap, 400));

    // Sor: 300 g buz.
    c.clearSay();
    await belir(c, [etk, hesap], 250, 0);
    parcaKoy(c, etk, [['300 g buz', KUTLE]]);
    await belir(c, etk, 350);
    await c.choice({
      tag: 'Sor', q: 'Ela 300 g buzu erime sıcaklığında eritecek. Kaç J ısı gerekir?',
      options: ['100.200 J', '634 J', '10.020 J'], answer: 0,
      hints: ['', '634, toplamadan çıkar; model çarpımdır.', 'Buz için L = 334 J/g; kütleyle çarp.'],
      right: 'Evet. 300 g buz için 300 · 334.',
    });
    gizle(hesap); parcaKoy(c, hesap, [['Q', ISI], ' = 300 · 334 = ', ['100.200 J', ISI]]);
    await par(c.say('300 g buz için 100.200 J gerekir.', { speak: 'Üç yüz gram buz için yüz bin iki yüz jul gerekir.' }), belir(c, hesap, 400));
    c.note('Q = m · L. Örnek: 100 g buz, 33.400 J.', 'Hâl değişimi için ısı');
  }

  /* ---- 5. L maddeye ve hâl değişimine göre değişir ---- */
  async function tablo5(c) {
    const svg = c.svg(1000, 562);
    const tb = tablo(c, svg, { x: 115, y: 100, satir: 3, h: 80, size: 28, sutunlar: [{ ad: 'Madde', w: 210 }, { ad: '', w: 260 }, { ad: '', w: 300 }] });
    const bas = tb.g.querySelectorAll('text');
    [[bas[1], 455, 'Erime ısısı'], [bas[2], 735, 'Buharlaşma ısısı']].forEach(([t, x, m]) => {
      t.setAttribute('y', 138);
      c.S('tspan', { x, text: m }, t); c.S('tspan', { x, dy: 30, text: '(kJ/kg)' }, t);
    });
    const VERI = [['Etil alkol', '104', '854'], ['Demir', '289', '6.340'], ['Alüminyum', '399', '10.500']];
    VERI.forEach((s, i) => { tb.yaz(i, 0, s[0]); tb.yaz(i, 1, s[1], ISI); tb.yaz(i, 2, s[2], ISI); });
    const f399 = cerceve(c, tb.g, 331, 345, 248, 70);
    const fD1 = cerceve(c, tb.g, 331, 265, 248, 70), fD2 = cerceve(c, tb.g, 591, 265, 288, 70);
    gizle(tb.g);

    await par(c.say('Hâl değişim ısıları bir tabloda toplanmıştır.'), (async () => { await belir(c, tb.g, 350); await tb.goster(0, 300); })());
    await par(c.say('Her madde için iki L var: erime ve buharlaşma.', { speak: 'Her madde için iki le var: erime ve buharlaşma.' }), (async () => { await tb.goster(1, 300); await tb.goster(2, 300); })());
    await c.say('Demirde buharlaşma ısısı, erime ısısından çok büyüktür.');
    await c.say('Erime ısısı alüminyumda 399, etil alkolde 104 kJ/kg.', { speak: 'Erime ısısı alüminyumda üç yüz doksan dokuz, etil alkolde yüz dört kilojul bölü kilogram.' });
    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Aynı kütlede hangisini tamamen eritmek en çok ısı ister?',
      options: ['Demir', 'Etil alkol', 'Alüminyum'], answer: 2,
      hints: ['Erime ısısı sütununa bak; en büyük sayı hangisi?', 'L büyüdükçe aynı kütle için gereken ısı da büyür.', ''],
      right: 'Evet. En büyük erime ısısı alüminyumdadır.',
    });
    tb.vurgula(2);
    await par(c.say('Alüminyumun erime ısısı en büyük; en çok ısı o ister.'), belir(c, f399, 300));
    tb.vurgula(2, false);
    await par(c.say('Aynı madde için bile erime ve buharlaşma farklı ısı ister.'), (async () => { await belir(c, f399, 250, 0); await belir(c, [fD1, fD2], 300); tb.vurgula(1); })());
  }

  /* ---- 6. Donarken ısı verilir ---- */
  function kar(c, p, x, y) {
    const g = c.S('g', {}, p);
    [0, 60, 120].forEach((a) => {
      const r = a * Math.PI / 180;
      cizgi(c, g, [x - 14 * Math.cos(r), y - 14 * Math.sin(r)], [x + 14 * Math.cos(r), y + 14 * Math.sin(r)], BUZ_KENAR, 3);
    });
    return g;
  }
  function damla(c, p, x, y) {
    return c.S('path', { d: `M${x},${y - 13} Q${x + 10},${y + 3} ${x},${y + 9} Q${x - 10},${y + 3} ${x},${y - 13} Z`, fill: SOGUK }, p);
  }
  async function donma(c) {
    const svg = c.svg(1000, 562);
    // Kural satırları (anlatım 1–5).
    const r1 = renkli(c, svg, 500, 150, [['erime ısısı', ISI], ' = ', ['donma ısısı', ISI]], { size: 44, kalin: 700 });
    const r2 = renkli(c, svg, 500, 270, ['1 kg buz erirken ', ['334 kJ ısı', ISI], ' alır'], { size: 40 });
    const r3 = renkli(c, svg, 500, 390, ['1 kg su donarken ', ['334 kJ ısı', ISI], ' verir'], { size: 40 });
    const r4 = renkli(c, svg, 500, 190, [['buharlaşma ısısı', ISI], ' = ', ['yoğuşma ısısı', ISI]], { size: 44, kalin: 700 });
    const r5 = renkli(c, svg, 500, 320, ['hâl değişirken ortamdan ', ['ısı alır', ISI]], { size: 40 });
    const r6 = renkli(c, svg, 500, 385, ['ya da ortama ', ['ısı verir', ISI]], { size: 40 });
    gizle(r1, r2, r3, r4, r5, r6);

    await par(c.say('Erime ısısı, donma ısısına eşittir.'), belir(c, r1, 400));
    await par(c.say('0 °C’ta 1 kg buzu eritmek için 334 kJ ısı gerekir.', { speak: 'Sıfır derecede 1 kilogram buzu eritmek için üç yüz otuz dört kilojul ısı gerekir.' }), belir(c, r2, 400));
    await par(c.say('Aynı sıcaklıkta 1 kg suyu dondurmak için ondan 334 kJ ısı alınır.', { speak: 'Aynı sıcaklıkta 1 kilogram suyu dondurmak için ondan üç yüz otuz dört kilojul ısı alınır.' }), belir(c, r3, 400));
    await par(c.say('Buharlaşma ısısı da yoğuşma ısısına eşittir.'), (async () => { await belir(c, [r1, r2, r3], 300, 0); await belir(c, r4, 400); })());
    await par(c.say('Maddeler hâl değiştirirken ortamdan ısı alır ya da ortama ısı verir.'), (async () => { await belir(c, r5, 400); await belir(c, r6, 400); })());

    // Kar yağarken hava ısınır.
    c.clearSay();
    await belir(c, [r4, r5, r6], 300, 0);
    [r1, r2, r3, r4, r5, r6].forEach((e) => e.remove());
    const sahne = c.S('g', {}, svg);
    sahne.setAttribute('transform', 'translate(500,290) scale(1.5) translate(-395,-190)');
    const bulut = c.S('g', {}, sahne);
    c.S('rect', { x: 120, y: 90, width: 200, height: 80, rx: 40, fill: '#aab2c8' }, bulut);
    c.S('circle', { cx: 190, cy: 98, r: 34, fill: '#aab2c8' }, bulut);
    c.S('circle', { cx: 256, cy: 104, r: 28, fill: '#aab2c8' }, bulut);
    const damlalar = [150, 220, 290].map((x) => damla(c, sahne, x, 240));
    const karlar = [150, 220, 290].map((x) => kar(c, sahne, x, 240));
    const term = c.S('g', {}, sahne);
    c.S('rect', { x: 640, y: 150, width: 26, height: 140, rx: 8, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, term);
    const sutun = c.S('rect', { x: 644, y: 220, width: 18, height: 66, rx: 6, fill: SIC }, term);
    const sutunYaz = (h) => { sutun.setAttribute('y', 286 - h); sutun.setAttribute('height', h); };
    sutunYaz(66);
    const hava = yazi(c, term, 653, 132, 'hava', { size: 26, kalin: 700, renk: RENK.yazi });
    const okIsi = ok(c, sahne, [350, 240], [620, 240], ISI, 7);
    const okYazi = yazi(c, sahne, 485, 215, 'ısı', { size: 28, kalin: 700, renk: ISI });
    gizle(damlalar, karlar, okIsi.g, okYazi);
    gizle(sahne);
    await par(c.say('Yağmur damlaları kara dönüşürken havaya ısı verir.'), (async () => {
      await belir(c, [sahne, ...damlalar], 450);
      await c.wait(300);
      await c.tween(600, (e) => { damlalar.forEach((d) => { d.style.opacity = 1 - e; }); karlar.forEach((k) => { k.style.opacity = e; }); }, ease.inOut);
    })());
    await par(c.say('Isı alan havanın sıcaklığı artar; kar yağarken hava ısınır.'), (async () => {
      await par(belir(c, [okIsi.g, okYazi], 500), c.tween(500, (e) => okIsi.ciz([350, 240], [lerp(352, 620, e), 240]), ease.out));
      await c.tween(800, (e) => sutunYaz(lerp(66, 78, e)), ease.inOut);
    })());

    // Sor: bardakta 100 g su.
    c.clearSay();
    await belir(c, sahne, 300, 0); sahne.remove();
    const bar = c.S('g', {}, svg);
    bar.setAttribute('transform', 'translate(500,285) scale(1.3) translate(-605,-270)');
    c.S('path', { d: 'M405,200 L410,320 Q410,332 424,332 L576,332 Q590,332 590,320 L595,200 Z', fill: SOGUK, 'fill-opacity': 0.55 }, bar);
    c.S('path', { d: 'M400,140 L410,320 Q410,332 424,332 L576,332 Q590,332 590,320 L600,140', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linejoin': 'round' }, bar);
    renkli(c, bar, 500, 390, [['100 g su', KUTLE], ' · ', ['0 °C', SIC]], { size: 30, kalin: 700 });
    gizle(bar);
    await belir(c, bar, 400);
    await c.choice({
      tag: 'Sor', q: '100 g su 0 °C’ta tamamen donuyor. Çevresine ne olur?',
      options: ['Çevresinden 33.400 J ısı alır', 'Çevresine 33.400 J ısı verir', 'Çevresiyle ısı alışverişi yapmaz'], answer: 1,
      hints: ['Madde hâl değiştirirken ortamla ısı alışverişi yapar; donarken alır mı, verir mi?', '', 'Donma ısısı erime ısısına eşittir: 100 · 334.'],
      right: 'Evet. Donarken ısı verir.',
    });
    const okDis = ok(c, bar, [620, 250], [621, 250], ISI, 7), yDis = yazi(c, bar, 715, 222, '33.400 J', { size: 30, kalin: 700, renk: ISI });
    gizle(yDis, okDis.g);
    await par(c.say('Donan 100 g su, çevresine 33.400 J ısı verir.', { speak: 'Donan yüz gram su, çevresine otuz üç bin dört yüz jul ısı verir.' }), (async () => {
      okDis.g.style.opacity = 1;
      await c.tween(500, (e) => okDis.ciz([620, 250], [lerp(622, 810, e), 250]), ease.out);
      await belir(c, yDis, 300);
    })());
  }

  /* ---- 7. Grafikte düz parçanın boyu ---- */
  async function dazParca(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'buz', seviye: 0.25, sicaklik: 0, alev: 2, kati: 0.5 });
    f.ayar('sag', { icerik: 'su', seviye: 0.25, sicaklik: 100, alev: 2, kaynama: 1, faz: 0 });
    f.sure(0);
    const L = c.S('g', {}, svg);
    kutleEtiketi(c, L, f, 'sol', '100 g buz'); kutleEtiketi(c, L, f, 'sag', '100 g su');
    sicaklikEtiketi(c, L, f, 'sol.termometre').guncelle(0); sicaklikEtiketi(c, L, f, 'sag.termometre').guncelle(100);

    const gr = c.S('g', {}, svg);
    const X = (Q) => 665 + Q / 1030;
    const G = grafik(c, gr, { X, orijin: [665, 410], xUc: 975, xCentik: [], yCentik: [0, 100], kose: [] });
    const egri = c.S('g', {}, gr);
    const dusuk = { 'stroke-opacity': 0.45 };
    cizgi(c, egri, [X(0), G.Y(-20)], [X(4200), G.Y(0)], SIC, 4, dusuk);
    const bas1 = cizgi(c, egri, [X(4200), G.Y(0)], [X(37600), G.Y(0)], SIC, 5);
    cizgi(c, egri, [X(37600), G.Y(0)], [X(79400), G.Y(100)], SIC, 4, dusuk);
    const bas2 = cizgi(c, egri, [X(79400), G.Y(100)], [X(305400), G.Y(100)], SIC, 5);
    const p1 = parantez(c, gr, X(4200), X(37600), 422), p2 = parantez(c, gr, X(79400), X(305400), 422);
    const y1 = yazi(c, gr, (X(4200) + X(37600)) / 2, 458, '33.400 J', { size: 24, kalin: 700, renk: ISI });
    const y2 = yazi(c, gr, (X(79400) + X(305400)) / 2, 458, '226.000 J', { size: 24, kalin: 700, renk: ISI });
    gizle(p1, p2, y1, y2, f.el, L, gr);

    await par(c.say('Düz parçanın boyu, hâl değişimi için gereken ısıdır.'), belir(c, [f.el, L, gr], 450));
    await par(c.say('100 g buzun erimesi: Q = 100 · 334 = 33.400 J.', { speak: 'Yüz gram buzun erimesi: kü eşittir yüz çarpı üç yüz otuz dört eşittir otuz üç bin dört yüz jul.' }), belir(c, [p1, y1], 400));
    await par(c.say('100 g suyun buharlaşması: Q = 100 · 2.260 = 226.000 J.', { speak: 'Yüz gram suyun buharlaşması: kü eşittir yüz çarpı iki bin iki yüz altmış eşittir iki yüz yirmi altı bin jul.' }), belir(c, [p2, y2], 400));
    await c.say('Kaynama basamağı, erime basamağından yaklaşık yedi kat uzun.');
    await c.say('Çünkü suyun buharlaşma ısısı, buzun erime ısısından çok büyük.');
    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Kaynama basamağı, erime basamağının yaklaşık kaç katı uzunluktadır?',
      options: ['Yaklaşık 7 katı', 'Yaklaşık 2 katı', 'Aynı uzunluktadır'], answer: 0,
      hints: ['', 'Basamağın boyu ısıdır: 226.000 ÷ 33.400 işlemine bak.', 'İki L eşit değil: 2.260 ile 334.'],
      right: 'Evet. 226.000 ÷ 33.400 yaklaşık 7.',
    });
    const w1 = X(37600) - X(4200), kopya = [];
    for (let i = 0; i < 7; i++) {
      const r = c.S('rect', { x: X(79400) + i * w1, y: 490, width: i < 6 ? w1 : w1 * 0.8, height: 14, fill: ISI, stroke: RENK.koyu, 'stroke-width': 2 }, gr);
      gizle(r); kopya.push(r);
    }
    await par(c.say('Erime basamağı, kaynama basamağına yaklaşık yedi kez sığar.'), (async () => { for (const r of kopya) await belir(c, r, 350); })());
  }

  /* ---- 8. Bu ısı yeter mi? ---- */
  async function yeterMi(c) {
    const svg = c.svg(1000, 562);
    const buz = c.S('g', {}, svg);
    [90, 162, 234, 306].forEach((x) => c.S('rect', { x, y: 195, width: 62, height: 62, rx: 8, fill: BUZ, stroke: BUZ_KENAR, 'stroke-width': 3 }, buz));
    const bEt = renkli(c, buz, 230, 310, [['4 kg buz', KUTLE], ', ', ['0 °C', SIC]], { size: 28, kalin: 700 });
    const su = c.S('g', {}, svg);
    c.S('path', { d: 'M648,190 L650,314 Q650,320 658,320 L772,320 Q780,320 780,314 L782,190 Z', fill: SOGUK, 'fill-opacity': 0.55 }, su);
    c.S('path', { d: 'M640,150 L650,314 Q650,320 658,320 L772,320 Q780,320 780,314 L790,150', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linejoin': 'round' }, su);
    const sEt = renkli(c, su, 715, 350, [['1 kg su', KUTLE], ', ', ['100 °C', SIC]], { size: 28, kalin: 700 });
    const soru = yazi(c, svg, 500, 262, '?', { size: 60, kalin: 700, renk: RENK.soluk });
    const h1 = renkli(c, svg, 230, 400, ['4 · 334 = ', ['1.336 kJ', ISI]], { size: 28, kalin: 700 });
    const h2 = renkli(c, svg, 715, 400, ['1 · 2.260 = ?'], { size: 28, kalin: 700 });
    const kar = renkli(c, svg, 500, 490, [['1.336 kJ', ISI], ' < ', ['2.260 kJ', ISI]], { size: 38, kalin: 700 });
    gizle(buz, su, soru, h1, h2, kar);

    await par(c.say('Erime sıcaklığındaki 4 kg buzu eritmek için ısı veriliyor.', { speak: 'Erime sıcaklığındaki dört kilogram buzu eritmek için ısı veriliyor.' }), belir(c, buz, 450));
    await par(c.say('Bu ısı, 100 °C’taki 1 kg suyu buharlaştırmaya yeter mi?', { speak: 'Bu ısı, yüz derecedeki bir kilogram suyu buharlaştırmaya yeter mi?' }), (async () => { await belir(c, su, 400); await belir(c, soru, 300); })());
    await c.say('Buzun erime ısısı 334 kJ/kg; suyun buharlaşma ısısı 2.260 kJ/kg.', { speak: 'Buzun erime ısısı kilogram başına üç yüz otuz dört kilojul; suyun buharlaşma ısısı kilogram başına iki bin iki yüz altmış kilojul.' });
    await par(c.say('Buz için Q = 4 · 334 = 1.336 kJ gerekir.', { speak: 'Buz için kü eşittir dört çarpı üç yüz otuz dört eşittir bin üç yüz otuz altı kilojul gerekir.' }), belir(c, h1, 400));

    c.clearSay();
    await par(belir(c, soru, 300, 0), belir(c, h2, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: '1 kg suyu buharlaştırmak için kaç kJ gerekir?',
      options: ['226 kJ', '2.594 kJ', '2.260 kJ'], answer: 2,
      hints: ['Kütle 1 kg; L = 2.260 kJ/kg. Çarp.', '2.594, iki L’yi toplamakla çıkar; model çarpımdır.', ''],
      right: 'Evet. 1 · 2.260 = 2.260 kJ.',
    });
    gizle(h2); parcaKoy(c, h2, ['1 · 2.260 = ', ['2.260 kJ', ISI]]);
    await par(c.say('1 kg suyu buharlaştırmak 2.260 kJ ister.', { speak: 'Bir kilogram suyu buharlaştırmak iki bin iki yüz altmış kilojul ister.' }), belir(c, h2, 400));

    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Buzu eriten 1.336 kJ ile 1 kg su buharlaşır mı?',
      options: ['Evet; buzun kütlesi daha büyüktür', 'Hayır; 1.336 kJ, 2.260 kJ’den küçüktür', 'Evet; iki ısı eşittir'], answer: 1,
      hints: ['Kütlenin büyük olması ısının büyük olduğu anlamına gelmez.', '', 'Gereken ısıyı eldeki ısıyla karşılaştır.'],
      right: 'Evet. Eldeki ısı gerekenden küçük.',
    });
    await belir(c, [bEt, sEt], 250, 0);
    await par(c.say('Eldeki 1.336 kJ, gereken 2.260 kJ’den küçük; su tamamen buharlaşmaz.', { speak: 'Eldeki bin üç yüz otuz altı kilojul, gereken iki bin iki yüz altmış kilojul’dan küçük; su tamamen buharlaşmaz.' }), belir(c, kar, 400));
  }

  /* ---- 9. Grafikten ısı oranı ---- */
  async function oran(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'mum', seviye: 0.25, sicaklik: 40, alev: 2, kati: 1 });
    f.ayar('sag', { icerik: 'mum', seviye: 0.45, sicaklik: 40, alev: 2, kati: 1 });
    f.sure(0);
    const L = c.S('g', {}, svg);
    const kK = kutleEtiketi(c, L, f, 'sol', 'K · m'), kL = kutleEtiketi(c, L, f, 'sag', 'L · 2m');
    kK.g.style.fill = KUTLE;
    const gr = c.S('g', {}, svg);
    const Z = zamanGrafik(c, gr, {
      x0: 660, u: 55, xUc: 975, tik: [[1, 't'], [2, '2t'], [4, '4t']],
      egri: [
        { ad: 'K', renk: SIC, nok: egriNok(140, 100, 1, 2, 2.9), isi: 'Q' },
        { ad: 'L', renk: ACIK_SARI, nok: egriNok(260, 200, 1, 4, 4.9), isi: '3Q' },
      ],
    });
    const [eK, eL] = Z.egri;
    gizle(eK.pg, eL.pg, f.el, L, gr);
    const eq = [
      yazi(c, svg, 797, 482, 'Q = m · L_{K}', { size: 28, kalin: 600, math: true }),
      yazi(c, svg, 797, 513, '3Q = 2m · L_{L}', { size: 28, kalin: 600, math: true }),
      yazi(c, svg, 797, 544, 'L_{K} / L_{L} = 2/3', { size: 28, kalin: 700, math: true, renk: IYI }),
    ];
    gizle(eq);

    await par(c.say('Özdeş ısıtıcılar K ve L katılarını ısıtıyor: kütleleri m ve 2m.', { speak: 'Özdeş ısıtıcılar ka ve le katılarını ısıtıyor: kütleleri me ve iki me.' }), belir(c, [f.el, L, gr], 450));
    await c.say('Isıtıcılar özdeş olduğundan süre, verilen ısıyla orantılıdır.');
    await par(c.say('K’nin erimesi t sürer; verilen ısı Q olsun.', { speak: 'Ka’nın erimesi te sürer; verilen ısı kü olsun.' }), (async () => { await eK.kalin(); await belir(c, [eK.pg, eK.et], 350); })());
    await par(c.say('L’nin erimesi 3t sürer; verilen ısı 3Q olur.', { speak: 'Le’nin erimesi üç te sürer; verilen ısı üç kü olur.' }), (async () => { await eL.kalin(); await belir(c, [eL.pg, eL.et], 350); })());
    await par(belir(c, f.el, 400, 0.35), belir(c, L, 300, 0));
    await par(c.say('K için Q = m · L<sub>K</sub> yazılır.', { speak: 'Ka için kü eşittir me çarpı le ka yazılır.' }), belir(c, eq[0], 350));
    await par(c.say('L için 3Q = 2m · L<sub>L</sub> yazılır.', { speak: 'Le için üç kü eşittir iki me çarpı le le yazılır.' }), belir(c, eq[1], 350));
    await par(c.say('İkisini oranlayınca L<sub>K</sub> / L<sub>L</sub> = 2/3 çıkar.', { speak: 'İkisini oranlayınca le ka bölü le le eşittir iki bölü üç çıkar.' }), belir(c, eq[2], 350));

    // Birlikte çöz: K (m) ve M (3m); M'nin yatay parçası 6t.
    c.clearSay();
    await belir(c, [f.el, gr, ...eq], 300, 0);
    gr.remove(); eq.forEach((e) => e.remove());
    const gr2 = c.S('g', {}, svg);
    const Z2 = zamanGrafik(c, gr2, {
      x0: 160, u: 90, xUc: 940, tik: [],
      egri: [
        { ad: 'K (m)', renk: SIC, nok: egriNok(140, 100, 1, 2, 2.9), isi: 'Q' },
        { ad: 'M (3m)', renk: ACIK_SARI, nok: egriNok(260, 200, 1, 7, 7.9), isi: '6Q' },
      ],
    });
    Z2.egri.forEach((e) => { e.pl.setAttribute('stroke-width', 6); e.pg.style.opacity = 1; e.et.style.opacity = 1; });
    const q1 = yazi(c, svg, 300, 492, 'Q = m · L_{K}', { size: 28, kalin: 600, math: true });
    const q2 = yazi(c, svg, 700, 492, '6Q = 3m · L_{M}', { size: 28, kalin: 600, math: true });
    gizle(gr2, q1, q2);
    await belir(c, [gr2, q1, q2], 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'L<sub>K</sub> / L<sub>M</sub> oranı kaçtır?',
      options: ['2', '1/3', '1/2'], answer: 2,
      hints: ['Kütle 3 katı, ısı 6 katı olduğundan M’nin L’si K’ninkinden büyüktür.', 'İki denklemi birbirine böl: 3m · L<sub>M</sub>, m · L<sub>K</sub>’nin kaç katı?', ''],
      right: 'Evet. 6Q ÷ Q = 3m · L_M ÷ m · L_K.',
    });
    const q3 = yazi(c, svg, 500, 536, 'L_{K} / L_{M} = 1/2', { size: 28, kalin: 700, math: true, renk: IYI });
    gizle(q3);
    await par(c.say('Denklemleri oranlayınca L<sub>K</sub> / L<sub>M</sub> = 1/2 çıkar.', { speak: 'Denklemleri oranlayınca le ka bölü le em eşittir bir bölü iki çıkar.' }), belir(c, q3, 400));

    // Sor: eşit kütleli X ve Y.
    c.clearSay();
    await belir(c, [gr2, q1, q2, q3], 300, 0);
    gr2.remove(); [q1, q2, q3].forEach((e) => e.remove());
    const gr3 = c.S('g', {}, svg);
    const Z3 = zamanGrafik(c, gr3, {
      x0: 160, u: 100, xUc: 940, tik: [],
      egri: [
        { ad: 'X', renk: SIC, nok: egriNok(140, 100, 1, 3, 3.9), isi: '2t' },
        { ad: 'Y', renk: ACIK_SARI, nok: egriNok(260, 200, 1, 6, 6.9), isi: '5t' },
      ],
    });
    Z3.egri.forEach((e) => { e.pl.setAttribute('stroke-width', 6); e.pg.style.opacity = 1; e.et.style.opacity = 1; });
    const e1 = yazi(c, svg, 500, 490, 'Q_{X} / Q_{Y} = 2t / 5t = 2/5', { size: 28, kalin: 600, math: true });
    const e2 = yazi(c, svg, 500, 532, 'm eşit → L_{X} / L_{Y} = 2/5', { size: 28, kalin: 700, math: true, renk: IYI });
    gizle(gr3, e1, e2);
    await belir(c, gr3, 400);
    await c.choice({
      tag: 'Sor', q: 'Kütleleri eşit X ve Y maddeleri özdeş ısıtıcılarla ısıtılıyor. X’in yatay parçası 2t, Y’ninki 5t sürüyor. L<sub>X</sub> / L<sub>Y</sub> oranı kaçtır?',
      options: ['2/5', '5/2', '1'], answer: 0,
      hints: ['', 'X daha kısa sürdüyse X’in L’si Y’ninkinden küçüktür.', 'Kütleler eşit; ısı yalnızca süreye bağlı.'],
      right: 'Evet. Kütleler eşitken L, süreyle orantılıdır.',
    });
    await par(c.say('Kütleler eşit; L’ler de ısılar gibi 2/5 oranındadır.', { speak: 'Kütleler eşit; le’ler de ısılar gibi iki bölü beş oranındadır.' }), (async () => { await belir(c, e1, 350); await belir(c, e2, 350); })());
  }

  /* ---- 10. Dene: buzun basamağı kaynama basamağını geçer mi? ---- */
  const BUZ_VERI = { 100: 33400, 200: 66800, 300: 100200, 400: 133600, 500: 167000, 600: 200400, 700: 233800, 800: 267200 };
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const OLCEK = 400, X0 = 200, REF = 226000 / OLCEK;
    yazi(c, svg, X0, 120, '100 g su kaynarken: 226.000 J', { size: 26, kalin: 700, renk: SOGUK, hiza: 'start' });
    const ref = c.S('rect', { x: X0, y: 135, width: REF, height: 40, rx: 6, fill: SOGUK }, svg);
    const buzYaz = renkli(c, svg, X0, 255, [['100 g buz', KUTLE], ': ', ['33.400 J', ISI]], { size: 26, kalin: 700, hiza: 'start' });
    const bar = c.S('rect', { x: X0, y: 270, width: 0, height: 40, rx: 6, fill: ISI }, svg);
    const cizgiSag = cizgi(c, svg, [X0 + REF, 135], [X0 + REF, 335], RENK.cizgi, 2, { 'stroke-dasharray': '8 6', opacity: 0.7 });
    const geri = yazi(c, svg, 500, 400, '', { size: 26, kalin: 600, renk: RENK.soluk });
    const son = renkli(c, svg, 500, 470, [['233.800 J', ISI], ' > ', ['226.000 J', SOGUK]], { size: 36, kalin: 700 });
    const fark = parantez(c, svg, X0 + REF, X0 + 233800 / OLCEK, 322);
    gizle(son, fark);
    const st = { v: 100, w: 0, tok: 0, girdi: 0 };
    const yaz = (v) => parcaKoy(c, buzYaz, [[v + ' g buz', KUTLE], ': ', [bin(BUZ_VERI[v]) + ' J', ISI]]);
    const git = (v, ms = 500) => {
      const w0 = st.w, w1 = BUZ_VERI[v] / OLCEK, tok = ++st.tok;
      st.v = v; yaz(v);
      bar.setAttribute('fill', v === 700 ? IYI : ISI);
      return c.tween(ms, (e) => { if (tok !== st.tok) return; st.w = lerp(w0, w1, e); bar.setAttribute('width', st.w); }, ease.inOut);
    };
    const mesaj = (v) => {
      if (v < 700) return 'Buz çubuğunun sağ ucu, referansın sağ ucunu geçmeli.';
      if (v > 700) return 'Geçti; ama bunun bir kademe küçüğü de geçiyor mu?';
      return '';
    };

    await par(c.say('Kütleyi sen seç; buzun çubuğu ısıyı gösterir.'), (async () => { await git(100); }) ());
    await c.say('Buzun çubuğu, suyun kaynama çubuğunu aşabilir mi?');
    c.say('Buz çubuğunu referans çubuğundan uzun yapan en küçük kütleyi bul.', { noWait: true });
    const sl = c.slider({
      label: 'Buz kütlesi', min: 100, max: 800, step: 100, value: 100, fmt: (v) => v + ' g',
      onInput: (v) => { st.girdi += 1; git(+v); if (st.girdi > 1) geri.textContent = mesaj(+v); },
    });
    await c.cont('Devam ›');
    const secilen = st.v;
    sl.remove(); c.clearSay();
    if (secilen !== 700) {
      geri.textContent = mesaj(secilen);
      await belir(c, geri, 300);
      await c.say(mesaj(secilen));
    }
    geri.textContent = '';
    await git(700);
    await par(belir(c, fark, 300), belir(c, son, 400));
    await c.say('700 g buzu eritmek, 100 g suyu kaynatmaktan daha çok ısı ister.', { speak: 'Yedi yüz gram buzu eritmek, yüz gram suyu kaynatmaktan daha çok ısı ister.' });
  }

  Ders.start({
    id: 'enerji-c3', kicker: 'Konu C · Hâl değişimi', title: 'Hâl değişimi için gereken ısı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Hâl değişimi için gereken ısı',
      hook: '0 °C’taki 1 kilogram buzu eritmek ile 2 kilogram buzu eritmek arasında ısı bakımından ne fark var?',
      button: 'Derse başla ›',
    },
    goals: ['Hâl değişim ısısının (L) maddeye bağlı olduğunu söyler.', 'Q = m · L ile hâl değişimi için gereken ısıyı hesaplar.', 'Donma ve yoğuşmada ısının verildiğini söyler.', 'Sıcaklık–ısı grafiğinde düz parçanın boyunu Q = m · L ile yorumlar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Hâl değişirken ısı girer, sıcaklık sabit kalır; kütle ile ısı orantılıdır.', run: hatirla },
      { title: 'Buzun verisi: gram başına ısı', goal: 'Isıyı kütleye bölünce hep aynı sayı çıktığını gör.', run: buzVerisi },
      { title: 'Bal mumunun verisi', goal: 'L’nin maddeye göre değiştiğini gör.', run: balMumu },
      { title: 'Model: Q = m · L', goal: 'Hâl değişimi için gereken ısıyı hesapla.', run: model },
      { title: 'L maddeye ve hâl değişimine göre değişir', goal: 'Tablodan erime ısılarını karşılaştır.', run: tablo5 },
      { title: 'Donarken ısı verilir', goal: 'Erime ve donmada, buharlaşma ve yoğuşmada ısının yönünü söyle.', run: donma },
      { title: 'Grafikte düz parçanın boyu', goal: 'Düz parçanın boyunun Q = m · L olduğunu gör.', run: dazParca },
      { title: 'Bu ısı yeter mi?', goal: 'İki hâl değişimi için gereken ısıyı hesaplayıp karşılaştır.', run: yeterMi },
      { title: 'Grafikten ısı oranı', goal: 'Süreden L oranını bul.', run: oran },
      { title: 'Dene: buzun basamağı', goal: 'Buzun basamağının kaynama basamağını geçtiği kütleyi bul.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Erime sıcaklığındaki 400 g bal mumu eritilecek (L = 168 J/g). Kaç J ısı gerekir?',
        options: ['168 J', '67.200 J', '568 J'], answer: 1,
        why: ['168 J, yalnızca 1 g bal mumu içindir; 400 g için kütleyle çarpılır.', 'Q = m · L = 400 · 168 = 67.200 J.', '568, iki sayıyı toplayınca çıkar; model çarpımdır.'], scene: 3 },
      { q: 'Ela kaynama sıcaklığındaki 2 kg suyu tamamen buharlaştıracak (L = 2.260 kJ/kg). Kaç kJ ısı gerekir?',
        options: ['2.260 kJ', '1.130 kJ', '4.520 kJ'], answer: 2,
        why: ['2.260 kJ, yalnızca 1 kg suyu buharlaştırır; kütle 2 kg.', 'Kütle iki katına çıkınca ısı yarıya inmez, iki katına çıkar.', 'Q = m · L = 2 · 2.260 = 4.520 kJ.'], scene: 7 },
      { q: '“Aynı kütledeki her madde, erimek için aynı ısıyı ister.” Bu cümle için ne söylenir?',
        options: ['Yanlıştır; L maddeye göre değişir', 'Doğrudur; hâl değişimi her maddede aynıdır', 'Doğrudur; yalnızca saf maddeler için'], answer: 0,
        why: ['Buzun L’si 334 J/g, bal mumununki 168 J/g: aynı kütle farklı ısı ister.', 'Hâl değişim ısısı ayırt edici bir özelliktir; her maddede aynı değildir.', 'Saf maddelerde de L maddeye göre değişir.'], scene: 2 },
      { q: 'Kütleleri eşit P ve R maddeleri özdeş ısıtıcılarla ısıtılıyor. P’nin erime basamağı 3t, R’ninki 6t sürüyor. Hangisi doğrudur?',
        options: ['P’nin erime ısısı, R’ninkinin iki katıdır', 'R’nin erime ısısı, P’ninkinin iki katıdır', 'İki maddenin erime ısısı eşittir'], answer: 1,
        why: ['Daha kısa süren P, daha az ısı aldı; P’nin L’si küçüktür.', 'Kütleler eşitken ısı süreyle orantılıdır: 6t, 3t’nin iki katıdır.', 'Basamak süreleri farklı; bu yüzden L’ler de farklıdır.'], scene: 8 },
      { q: '“Kaynayan suyun sıcaklığı değişmiyor; o hâlde su ısı almıyor.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; sıcaklık değişmiyorsa ısı alınmaz', 'Doğrudur; ısı yalnızca ısınmada alınır', 'Yanlıştır; su ısı alır, bu ısı Q = m · L ile hesaplanır'], answer: 2,
        why: ['Hâl değişirken ısı girer ama sıcaklık sabit kalır.', 'Hâl değişiminde de ısı alınır; grafikte düz parçanın boyu bu ısıdır.', 'Düz parçada sıcaklık değişmez ama ısı girer: Q = m · L.'], scene: 6 },
    ],
    summary: ['Hâl değişirken alınan ya da verilen ısı, kütleyle ve maddenin hâl değişim ısısıyla (L) orantılıdır.', 'Grafikte düz parçanın boyu, hâl değişimi için gereken ısıyı gösterir.', '<b>Q = m · L</b>'],
    nextLesson: { href: 'c4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
