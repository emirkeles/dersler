/* B1 — Derine dalmak neden zor?
   Durgun sıvının içinde basınç derinlikle artar; derinliğe, sıvının yoğunluğuna ve yer çekimi ivmesine bağlıdır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/B-sivilarda-basinc.md (B1). Bu derste sayı yoktur; çizim oranları şematiktir.
   Çizim araçları dersler/b-araclar.js (window.KIT_B). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, sinifla } = window.KIT;
  const { sivKabi, noktaSutunu, basincOklari, basincCubugu } = window.KIT_B;
  const { lerp, ease } = Ders;
  const ZEMIN = '#10162b', GOVDE = '#8f9bc4', SOLUK = '#c3cbea', BALIK = '#9fb0e8';

  /* Çizgi figür: baş (0,0) noktasında, boyu 70 birim. Kulağın yanında 6 küçük sarı ok (ilk ikisi görünür sırada başta). */
  function dalgic(c, p, x, y0) {
    const g = c.S('g', {}, p), yer = [y0];
    const koy = (y) => { yer[0] = y; g.setAttribute('transform', `translate(${x},${y})`); };
    koy(y0);
    c.S('circle', { cx: 0, cy: 0, r: 14, fill: ZEMIN, stroke: RENK.yazi, 'stroke-width': 4 }, g);
    [[[0, 14], [0, 44]], [[0, 44], [-6, 56]], [[0, 44], [6, 56]], [[0, 26], [-22, 26]], [[0, 26], [12, 38]]]
      .forEach(([P, Q]) => cizgi(c, g, P, Q, RENK.yazi, 4));
    const oklar = [12, -12, 36, -36, 60, -60].map((d) => {
      const a = (d * Math.PI) / 180, o = ok(c, g, [Math.cos(a) * 52, Math.sin(a) * 52], [Math.cos(a) * 22, Math.sin(a) * 22], RENK.basinc, 3);
      o.g.style.opacity = 0; return o.g;
    });
    return {
      g, oklar,
      git(y, ms = 800) { const y1 = yer[0]; return c.tween(ms, (e) => koy(lerp(y1, y, e)), ease.inOut); },
      ac(k, ms = 400) { return belir(c, oklar.slice(0, k), ms); },
    };
  }

  /* Dar yüzeyde ve geniş yüzeyde aynı sayıda ok: Hatırla sahnesinin ilk çizimi. */
  function iki_yuzey(c, p) {
    const g = c.S('g', {}, p);
    kutu(c, g, 120, 380, 780, 100, { rx: 10 });
    const yuz = [{ cx: 280, w: 100, bar: 80 }, { cx: 700, w: 300, bar: 27 }], oklar = [], barlar = [];
    yuz.forEach((q) => {
      const x1 = q.cx - q.w / 2;
      cizgi(c, g, [x1, 380], [x1 + q.w, 380], RENK.alan, 7);
      ok(c, g, [q.cx, 230], [q.cx, 372], RENK.kuvvet, 8);
      const alt = c.S('g', {}, g);
      for (let i = 0; i < 5; i++) { const x = x1 + (q.w / 5) * (i + 0.5); ok(c, alt, [x, 388], [x, 420], RENK.basinc, 3); }
      alt.style.opacity = 0; oklar.push(alt);
      const b = basincCubugu(c, g, x1 + q.w + 16, 378); barlar.push({ b, h: q.bar });
    });
    yazi(c, g, 280, 456, 'dar yüzey', { size: 26, kalin: 600 });
    yazi(c, g, 700, 456, 'geniş yüzey', { size: 26, kalin: 600 });
    return { g, oklar, ac(ms = 500) { return par(belir(c, oklar, 400), ...barlar.map((q) => q.b.uzat(c, q.h, ms))); } };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const s1 = iki_yuzey(c, svg);
    s1.g.style.opacity = 0;
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1.g, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Aynı ağırlık daha geniş bir yüzeye yayılırsa basınç nasıl değişir?',
      options: ['Artar', 'Değişmez', 'Azalır'], answer: 2,
      hints: ['Aynı kuvvet geniş yüzeye yayılınca her yere daha azı düşer.', 'Kar ayakkabısını düşün.', ''],
      right: 'Evet. Aynı kuvvet, büyük yüzeyde daha küçük basınç yapar.',
    });
    c.clearSay();
    await par(c.say('Aynı kuvvet geniş yüzeyde daha küçük basınç yapar.'), s1.ac(600));
    c.clearSay();
    await belir(c, s1.g, 400, 0); s1.g.remove();

    const s2 = c.S('g', {}, svg);
    kutu(c, s2, 120, 380, 780, 100, { rx: 10 });
    c.S('rect', { x: 420, y: 270, width: 160, height: 110, rx: 6, fill: '#5b678f', stroke: SOLUK, 'stroke-width': 3 }, s2);
    const yuk = c.S('g', {}, s2);
    ok(c, yuk, [500, 300], [500, 410], RENK.kuvvet, 8);
    yazi(c, yuk, 535, 412, 'G', { hiza: 'start', size: 30, kalin: 700, renk: RENK.kuvvet });
    gizle(s2, yuk);
    await par(c.say('Şimdi zeminde duran bir cisme bakalım.'), belir(c, s2, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Yatay zeminde duran bir cismin zemine uyguladığı kuvvet nedir?',
      options: ['Cismin hacmi', 'Cismin ağırlığı', 'Zeminin ağırlığı'], answer: 1,
      hints: ['Zemini aşağı bastıran şey cismin kendisidir.', '', 'Basınç P = G / A idi.'],
      right: 'Evet. Yatay zeminde kuvvet, cismin ağırlığıdır: P = G / A.',
    });
    c.clearSay();
    await par(c.say('Zemine binen kuvvet, cismin ağırlığıdır.'), belir(c, yuk, 450));
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();
    const bugun = renkli(c, svg, 500, 292, [['sıvıda', RENK.sivi], ' ', ['basınç', RENK.basinc]], { size: 50, kalin: 700 });
    gizle(bugun);
    await par(c.say('Bugün sıvıların içindeki basınca bakacağız.'), belir(c, bugun, 450));
  }

  /* ---- 2. Tek nefeste dalış ---- */
  async function dalis(c) {
    const svg = c.svg(1000, 562);
    const dunya = c.S('g', {}, svg);
    c.S('rect', { x: 60, y: 40, width: 880, height: 80, fill: GOVDE, 'fill-opacity': 0.18 }, dunya);
    c.S('rect', { x: 60, y: 120, width: 880, height: 400, fill: RENK.sivi, 'fill-opacity': 0.3 }, dunya);
    cizgi(c, dunya, [60, 120], [940, 120], SOLUK, 3);
    cizgi(c, dunya, [300, 120], [300, 480], SOLUK, 3);
    const d = dalgic(c, dunya, 322, 100);
    const t1 = yazi(c, svg, 730, 250, 'kulakta dolgunluk', { size: 38, kalin: 700 });
    const t2 = yazi(c, svg, 730, 322, 'basınç', { size: 46, kalin: 700, renk: RENK.basinc });
    const t3 = yazi(c, svg, 730, 400, 'özel teknikler', { size: 34, kalin: 600, renk: SOLUK });
    gizle(dunya, t1, t2, t3);

    await par(c.say('Serbest dalış, tek nefeste ip yardımıyla suyun altına dalma sporudur.'), belir(c, dunya, 450));
    await par(c.say('Sporcu ipin boyunca aşağı iniyor.'), d.git(200, 800));
    await par(c.say('İndikçe kulaklarında dolgunluk hissi oluşur.', { speak: '[curious] İndikçe kulaklarında dolgunluk hissi oluşur.' }), par(d.ac(2, 400), belir(c, t1, 400)));

    await c.choice({
      tag: 'Tahmin et', q: 'Sporcu daha derine inerse kulağındaki baskı nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['İndikçe dolgunluk hissi oluşuyordu.', 'Daha derinde bu his sürer mi, yoksa azalır mı?', ''],
      right: 'Evet. Daha derine inildikçe baskı artar.',
    });
    c.clearSay();
    await par(c.say('Sporcu daha derine inince kulaklarındaki baskı daha da büyür.'), (async () => {
      await d.git(420, 800); await d.ac(6, 400); await belir(c, t2, 400);
    })());
    await par(c.say('Sporcular bu sorunu çözmek için özel teknikler kullanır.'), belir(c, t3, 400));
  }

  /* ---- 3. Üstteki su ağırlığıyla basar ---- */
  async function sutunSahne(c) {
    const svg = c.svg(1000, 562), Y = 150;
    const kap = sivKabi(c, svg, { x1: 110, x2: 890, y: Y, dip: 520 });
    const A = noktaSutunu(c, svg, { x: 250, y: 230, yuzey: Y, harf: 'A', okBoy: 40 });
    const D = noktaSutunu(c, svg, { x: 500, y: 320, yuzey: Y, harf: 'D', okBoy: 85 });
    const B = noktaSutunu(c, svg, { x: 750, y: 410, yuzey: Y, harf: 'B', okBoy: 130 });
    const taban = basincOklari(c, svg, [120, 517], [880, 517], [500, 400], { n: 7 });
    const sol = basincOklari(c, svg, [113, 200], [113, 500], [400, 300], { n: 4 });
    const sag = basincOklari(c, svg, [887, 200], [887, 500], [600, 300], { n: 4 });
    const soru = yazi(c, svg, 588, 294, '?', { hiza: 'start', size: 30, kalin: 700, renk: RENK.basinc });
    const metin = (x, y, parcalar) => renkli(c, svg, x, y, parcalar, { size: 24, kalin: 600 });
    const aSutun = metin(250, 462, ['alçak sütun']), bSutun = metin(750, 462, ['yüksek sütun']);
    const aBasinc = metin(250, 492, ['küçük ', ['basınç', RENK.basinc]]), bBasinc = metin(750, 492, ['büyük ', ['basınç', RENK.basinc]]);
    const parca = (n) => [n.nokta, n.sutun.g, n.ok.g];
    D.cubuk.g.style.opacity = 1;
    gizle(kap.g, ...parca(A), ...parca(D), ...parca(B), soru, aSutun, bSutun, aBasinc, bBasinc);

    await par(c.say('Sıvılar, ağırlıkları nedeniyle bulundukları yüzeye basınç uygular.'), belir(c, kap.g, 450));
    await par(c.say('Sıvı, değdiği her yüzeye basınç uygular; kulağa da.'), par(taban.ac(7, 400), sol.ac(4, 400), sag.ac(4, 400)));
    await par(c.say('A noktasının üstünde yüzeye kadar bir su sütunu var.'), (async () => {
      await belir(c, [taban.g, sol.g, sag.g], 300, 0);
      await belir(c, A.nokta, 300); await belir(c, A.sutun.g, 500);
    })());
    [taban.g, sol.g, sag.g].forEach((e) => e.remove());
    await par(c.say('Bu sütunun ağırlığı, A noktasındaki küçük yüzeye biner.'), (async () => {
      await belir(c, A.ok.g, 400); await A.cubuk.uzat(c, 32, 600);
    })());
    await par(c.say('B noktası daha derindedir; üstünde daha yüksek bir sütun var.'), (async () => {
      await belir(c, B.nokta, 300); await belir(c, B.sutun.g, 500); await belir(c, B.ok.g, 400); await B.cubuk.uzat(c, 104, 600);
    })());
    await par(c.say('Yüksek sütun daha ağırdır; aynı yüzeye daha çok ağırlık biner.'), belir(c, [aSutun, bSutun], 400));
    await c.say('Aynı yüzeye daha büyük ağırlık binerse basınç artar.');
    await par(c.say('B noktasındaki basınç, A noktasındakinden büyüktür.', { speak: '[thoughtful] B noktasındaki basınç, A noktasındakinden büyüktür.' }), belir(c, [aBasinc, bBasinc], 400));

    // Birlikte çöz: D noktası.
    c.clearSay();
    await belir(c, [aSutun, bSutun, aBasinc, bBasinc], 300, 0);
    [aSutun, bSutun, aBasinc, bBasinc].forEach((e) => e.remove());
    await par(c.say('Şimdi D noktasına bakalım.'), (async () => {
      await belir(c, D.nokta, 300); await belir(c, D.sutun.g, 500); await belir(c, [D.ok.g, soru], 400);
    })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'D noktasındaki basınç nasıldır?',
      options: ['A’dan küçük', 'A’dan büyük, B’den küçük', 'B’den büyük'], answer: 1,
      hints: ['D’nin üstündeki sütun A’nınkinden yüksek, B’ninkinden alçak.', '', 'Yüksek sütun, büyük ağırlık, büyük basınç.'],
      right: 'Evet. D’nin sütunu A’nınkinden yüksek, B’ninkinden alçak.',
    });
    c.clearSay();
    soru.textContent = 'orta';
    await par(c.say('D’nin basıncı A ile B’nin arasındadır.'), D.cubuk.uzat(c, 68, 600));

    // Sıra sende: iki balık.
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir gölde bir balık yüzeye yakın, bir balık dipte yüzüyor. Hangisine uygulanan basınç daha büyüktür?',
      options: ['Yüzeye yakın balığa', 'Dipteki balığa', 'İkisine de aynı'], answer: 1,
      hints: ['Hangisinin üstünde daha yüksek bir su sütunu var?', '', 'Yüksek sütun daha ağırdır.'],
      right: 'Evet. Dipteki balığın üstünde daha yüksek bir sütun var.',
    });
    c.clearSay();
    const balik = (x, y) => {
      const g = c.S('g', { transform: `translate(${x},${y})` }, svg);
      c.S('ellipse', { cx: 0, cy: 0, rx: 22, ry: 11, fill: BALIK }, g);
      c.S('path', { d: 'M-20,0 L-38,-10 L-38,10 Z', fill: BALIK }, g);
      c.S('circle', { cx: 12, cy: -2, r: 2.5, fill: ZEMIN }, g);
      return g;
    };
    const b1 = balik(380, 230), b2 = balik(600, 410);
    const c1 = basincCubugu(c, svg, 420, 230), c2 = basincCubugu(c, svg, 640, 410);
    gizle(b1, b2);
    await par(c.say('Dipteki balığın üstündeki sütun daha yüksek; basıncı daha büyük.'), (async () => {
      await belir(c, [D.nokta, D.sutun.g, D.ok.g, D.cubuk.g, soru], 300, 0.3);
      await belir(c, [b1, b2], 400); await par(c1.uzat(c, 32, 600), c2.uzat(c, 104, 600));
    })());
  }

  /* ---- 4. Basınç neye bağlı? ---- */
  async function bagli(c) {
    const svg = c.svg(1000, 562);
    const PX = [40, 355, 670], PW = 290, BAS = 400, UST = 230;
    const paneller = [
      { baslik: 'derinlik (h)', h: [80, 160], sivi: ['acik', 'acik'], okBoy: [40, 80], cubuk: [30, 60], ad: null },
      { baslik: 'yoğunluk (d)', h: [120, 120], sivi: ['acik', 'koyu'], okBoy: [60, 120], cubuk: [45, 90], ad: ['d', '2d'] },
      { baslik: 'yer çekimi ivmesi (g)', h: [120, 120], sivi: ['acik', 'acik'], okBoy: [60, 66], cubuk: [45, 50], ad: ['Ekvator', 'kutup'] },
    ].map((q, i) => {
      const g = c.S('g', {}, svg), cerceve = c.S('g', {}, g), icerik = c.S('g', {}, g);
      kutu(c, cerceve, PX[i], 90, PW, 380, { rx: 12 });
      yazi(c, cerceve, PX[i] + PW / 2, 128, q.baslik, { size: 24, kalin: 700 });
      const CX = [PX[i] + 65, PX[i] + 175], oklar = [], cubuklar = [], adlar = [];
      CX.forEach((cx, j) => {
        sivKabi(c, icerik, { x1: cx - 40, x2: cx + 40, y: BAS - q.h[j], dip: BAS, ust: UST, sivi: q.sivi[j] });
        const o = ok(c, icerik, [cx, BAS - q.okBoy[j]], [cx, BAS], RENK.kuvvet, 5);
        o.g.style.opacity = 0; oklar.push(o.g);
        cubuklar.push(basincCubugu(c, icerik, cx + 48, BAS, { w: 16 }));
        if (q.ad) { const t = yazi(c, icerik, cx, 436, q.ad[j], { size: 22, kalin: 600 }); t.style.opacity = 0; adlar.push(t); }
      });
      g.style.opacity = 1; icerik.style.opacity = 0;
      return Object.assign(q, { g, icerik, oklar, cubuklar, adlar, CX });
    });
    // Panel 1: serbest yüzeyden tabana derinlik çizgisi ve "h".
    const P1 = paneller[0], hx = P1.CX[1] + 77;
    const olcu = c.S('g', {}, P1.icerik);
    cizgi(c, olcu, [hx, BAS - 160], [hx, BAS], SOLUK, 3);
    cizgi(c, olcu, [hx - 6, BAS - 160], [hx + 6, BAS - 160], SOLUK, 3);
    cizgi(c, olcu, [hx - 6, BAS], [hx + 6, BAS], SOLUK, 3);
    const h = yazi(c, olcu, hx + 12, BAS - 80 + 8, 'h', { hiza: 'start', size: 26, kalin: 700 });
    olcu.style.opacity = 0;
    const kaps = (i) => paneller[i].icerik;
    const uzat = async (i, ms = 600) => {
      const q = paneller[i];
      await par(belir(c, q.oklar, 400), ...q.cubuklar.map((b, j) => b.uzat(c, q.cubuk[j], ms)));
    };
    const ac = (i) => par(belir(c, kaps(i), 500), i ? belir(c, paneller[i - 1].g, 500, 0.45) : Promise.resolve());
    gizle(...paneller.map((q) => q.g));

    await par(c.say('Sıvı basıncı üç şeye bağlıdır: derinliğe, yoğunluğa, yer çekimi ivmesine.'), belir(c, paneller.map((q) => q.g), 500));
    await par(c.say('Derinlik, bir noktanın sıvının serbest yüzeyinden dik uzaklığıdır.'), (async () => { await ac(0); await belir(c, olcu, 400); })());
    await par(c.say('Derinlik (h) arttıkça sütun ağırlaşır, basınç artar.', { speak: 'Derinlik, he, arttıkça sütun ağırlaşır, basınç artar.' }), uzat(0));
    await par(c.say('Sıvının yoğunluğu (d) büyükse aynı sütun daha ağırdır.', { speak: 'Sıvının yoğunluğu, de, büyükse aynı sütun daha ağırdır.' }), (async () => { await ac(1); await uzat(1); })());
    await par(c.say('Yer çekimi ivmesi (g) büyükse sütunun ağırlığı da büyür.', { speak: 'Yer çekimi ivmesi, ge, büyükse sütunun ağırlığı da büyür.' }), (async () => { await ac(2); await uzat(2); })());
    await par(c.say('Kutuplarda g biraz büyüktür; Ekvator’da biraz küçüktür.', { speak: 'Kutuplarda ge biraz büyüktür; Ekvator’da biraz küçüktür.' }), belir(c, paneller[2].adlar, 400));
    await par(c.say('Derinlik, yoğunluk ya da g arttıkça sıvı basıncı artar.', { speak: 'Derinlik, yoğunluk ya da ge arttıkça sıvı basıncı artar.' }), belir(c, paneller.map((q) => q.g), 500, 1));
    c.note('<b>Basınç; derinliğe, yoğunluğa ve g’ye bağlıdır.</b><br>Örnek: derin dalış, büyük basınç.', 'Sıvı basıncı', 'sivi-basinci');
  }

  /* ---- 5. Vurgun ve sağlık ---- */
  async function vurgun(c) {
    const svg = c.svg(1000, 562);
    const SATIR = [{ y: 120, ad: 'dalgıç elbisesi' }, { y: 200, ad: 'dalış tüpü' }, { y: 280, ad: 'ağırlık takımı' }];
    const cerceveler = SATIR.map((s) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, 60, s.y, 400, 60, { rx: 10 });
      yazi(c, g, 260, s.y + 39, s.ad, { size: 28, kalin: 600 });
      return g;
    });
    const nefes = yazi(c, svg, 260, 405, 'nefes tutma: akciğer zararı', { size: 26, kalin: 600, renk: SOLUK });
    const oda = c.S('g', {}, svg);
    c.S('rect', { x: 540, y: 150, width: 380, height: 140, rx: 70, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 4 }, oda);
    [620, 730, 840].forEach((x) => c.S('circle', { cx: x, cy: 220, r: 22, fill: ZEMIN, stroke: RENK.cizgi, 'stroke-width': 3 }, oda));
    const vur = yazi(c, svg, 730, 340, 'vurgun', { size: 32, kalin: 700 });
    const odaAd = renkli(c, svg, 730, 382, [['basınç', RENK.basinc], ' odası'], { size: 30, kalin: 700 });
    gizle(...cerceveler, nefes, oda, vur, odaAd);

    await c.say('Derin dalış, derinliğe uygun teknik ve teçhizat ister.');
    await par(c.say('Dalgıçlar dalgıç elbisesi, dalış tüpü ve ağırlık takımı kullanır.'), (async () => {
      for (const g of cerceveler) { await belir(c, g, 300); await c.wait(300); }
    })());
    await par(c.say('Çıkarken nefes tutulursa akciğerler zarar görebilir.'), belir(c, nefes, 400));
    await par(c.say('Vurgun, ani basınç değişiminde vücutta gaz kabarcıkları oluşmasıdır.'), belir(c, vur, 400));
    await par(c.say('Vurgun geçirenler hemen basınç odasında tedavi edilmelidir.'), par(belir(c, oda, 600), belir(c, odaAd, 600)));
    await c.say('Tedavide yüksek basınçlı oksijen kullanılır.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir dalgıç yüzeye çıkarken nefesini tutuyor. Ne olabilir?',
      options: ['Hiçbir sorun olmaz; nefes tutmak güvenlidir', 'Dalış tüpü kendiliğinden patlar', 'Akciğerleri zarar görebilir'], answer: 2,
      hints: ['Çıkarken nefes tutulursa hangi organ zarar görür?', 'Nefes yollarındaki sorun akciğerleri etkiler.', ''],
      right: 'Evet. Çıkarken nefes tutmak akciğerlere zarar verebilir.',
    });
  }

  /* ---- 6. Denizaltının penceresi ---- */
  async function denizalti(c) {
    const svg = c.svg(1000, 562);
    const dunya = c.S('g', {}, svg);
    c.S('rect', { x: 60, y: 120, width: 880, height: 400, fill: RENK.sivi, 'fill-opacity': 0.3 }, dunya);
    cizgi(c, dunya, [60, 120], [940, 120], SOLUK, 3);
    const CY = 195, RX = 170, RY = 45, sub = c.S('g', {}, svg);
    c.S('ellipse', { cx: 500, cy: CY, rx: RX, ry: RY, fill: RENK.yuzey, stroke: SOLUK, 'stroke-width': 4 }, sub);
    [410, 500, 590].forEach((x) => c.S('circle', { cx: x, cy: CY, r: 18, fill: ZEMIN, stroke: SOLUK, 'stroke-width': 3 }, sub));
    const oklarG = c.S('g', {}, sub);
    const oklar = [270, 225, 315, 180, 0, 135, 45, 90].map((d) => {
      const a = (d * Math.PI) / 180, P = [500 + RX * Math.cos(a), CY + RY * Math.sin(a)];
      let nx = Math.cos(a) / RX, ny = Math.sin(a) / RY; const n = Math.hypot(nx, ny); nx /= n; ny /= n;
      const o = ok(c, oklarG, [P[0] + nx * 30, P[1] + ny * 30], P, RENK.basinc, 3);
      o.g.style.opacity = 0; return o.g;
    });
    const bas = yazi(c, svg, 840, 180, 'basınç', { size: 40, kalin: 700, renk: RENK.basinc });
    gizle(dunya, sub, bas);
    const gez = (dy0, dy1, ms) => c.tween(ms, (e) => sub.setAttribute('transform', `translate(0,${lerp(dy0, dy1, e)})`), ease.inOut);

    await par(c.say('Turistik denizaltının gövdesinde pencereler vardır.'), belir(c, [dunya, sub], 450));
    await par(c.say('Su, gövdenin değdiği her yüzeye, pencerelere de basınç uygular.'), par(belir(c, oklar.slice(0, 3), 400), belir(c, bas, 400)));
    await par(c.say('Denizaltı indikçe pencerelere uygulanan basınç artar.'), (async () => { await gez(0, 190, 1000); await belir(c, oklar.slice(3), 400); })());
    await c.say('Pencere sayısı çoksa, bu basınca dayanması gereken yer çoğalır.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Gövdesinde çok pencere bulunan bir turistik denizaltı daha derine iniyor. Pencerelere uygulanan basınç nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
      hints: ['', 'Daha derin, üstünde daha yüksek bir su sütunu demek.', 'Su pencerelere de basınç uygular.'],
      right: 'Evet. Daha derinde pencerelere daha çok basınç biner.',
    });
    c.clearSay();
    await par(c.say('Derine inen denizaltının pencerelerine daha büyük basınç biner.'), gez(190, 230, 600));
  }

  /* ---- 7. Artır mı, azalt mı? ---- */
  /* 300 × 180 çerçevede iki kap ve ortada ok; g kartlarında kapların üstünde g okları. */
  function kartCiz(c, p, tur) {
    const g = c.S('g', {}, p);
    kutu(c, g, 350, 150, 300, 180, { rx: 12 });
    const T = {
      ekle: { h: [50, 90], sivi: ['acik', 'acik'] }, tuz: { h: [70, 70], sivi: ['acik', 'koyu'] },
      kutup: { h: [70, 70], sivi: ['acik', 'acik'], g: [24, 44] }, azalt: { h: [90, 50], sivi: ['acik', 'acik'] },
      ekvator: { h: [70, 70], sivi: ['acik', 'acik'], g: [44, 24] },
    }[tur];
    [425, 575].forEach((cx, j) => {
      sivKabi(c, g, { x1: cx - 35, x2: cx + 35, y: 295 - T.h[j], dip: 295, ust: 175, sivi: T.sivi[j] });
      if (T.g) {
        ok(c, g, [cx, 172], [cx, 172 + T.g[j]], SOLUK, 4);
        yazi(c, g, cx + 18, 196, 'g', { hiza: 'start', size: 24, kalin: 600 });
      }
    });
    ok(c, g, [477, 240], [523, 240], SOLUK, 5);
    return g;
  }

  async function artirAzalt(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 80, ad: 'Basıncı artırır' }, { x: 520, ad: 'Basıncı azaltır' }], sayac = [0, 0];
    KUTU.forEach((k) => { kutu(c, svg, k.x, 60, 400, 50, { rx: 10 }); yazi(c, svg, k.x + 200, 94, k.ad, { size: 26, kalin: 700, renk: RENK.basinc }); });
    const sahne = c.S('g', {}, svg);
    let cizim = null, baslik = null;
    const goster = async (k) => {
      cizim = kartCiz(c, sahne, k.tur);
      baslik = yazi(c, sahne, 500, 360, k.ad, { size: 26, kalin: 700 });
      gizle(cizim, baslik);
      await belir(c, [cizim, baslik], 350);
    };
    const yerlestir = async (k) => {
      const kx = KUTU[k.kutu].x + 200, ky = 410 + sayac[k.kutu] * 36;
      const el = cizim, bs = baslik;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, kx - 500, e)},${lerp(0, ky - 240, e)}) translate(500,240) scale(${lerp(1, 0.15, e)}) translate(-500,-240)`);
        el.style.opacity = 1 - e; bs.style.opacity = 1 - e;
      }, ease.inOut);
      el.remove(); bs.remove();
      const ad = yazi(c, svg, kx, ky, k.ad, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300);
      sayac[k.kutu]++;
    };
    const ORNEK = [
      { tur: 'ekle', ad: 'Aynı sıvıdan eklemek', kutu: 0 },
      { tur: 'tuz', ad: 'Tuz atmak', kutu: 0 },
    ];
    const KARTLAR = [
      { tur: 'kutup', ad: 'Kutuplara götürmek', uzun: 'Kabı kutuplara götürmek', kutu: 0, neden: 'Evet. Kutuplarda g biraz büyüktür.' },
      { tur: 'azalt', ad: 'Sıvı alıp azaltmak', uzun: 'Kaptan sıvı alıp derinliği azaltmak', kutu: 1, neden: 'Evet. Derinlik azaldı; sütun hafifledi.' },
      { tur: 'ekvator', ad: 'Ekvator’a götürmek', uzun: 'Kabı Ekvator’a götürmek', kutu: 1, neden: 'Evet. Ekvator’da g biraz küçüktür.' },
    ];

    await c.say('Basıncı artırmak için derinliği, yoğunluğu ya da g’yi artırırız.', { speak: 'Basıncı artırmak için derinliği, yoğunluğu ya da ge’yi artırırız.' });
    await par(c.say('Kaba aynı sıvıdan eklemek derinliği artırır; basınç artar.'), goster(ORNEK[0]));
    await c.wait(500);
    await yerlestir(ORNEK[0]);
    await par(c.say('Suya tuz atmak yoğunluğu artırır; basınç artar.'), goster(ORNEK[1]));
    await c.wait(500);
    await yerlestir(ORNEK[1]);
    await c.say('Derinliği ya da yoğunluğu azaltınca basınç azalır.');

    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Derinlik, yoğunluk ya da g hangisi değişiyor?' }, k)),
      soru: (k) => `${k.uzun} kabın tabanındaki basıncı artırır mı, azaltır mı?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Sıvıda ne kadar derine inersen basınç o kadar büyür.', { speak: '[thoughtful] Sıvıda ne kadar derine inersen basınç o kadar büyür.' });
  }

  Ders.start({
    id: 'akiskanlar-b1', kicker: 'Konu B · Sıvılarda basınç', title: 'Derine dalmak neden zor?', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Derine dalmak neden zor?',
      hook: 'Serbest dalışta rekor deneyen bir sporcu indikçe kulaklarındaki baskı neden artar?',
      button: 'Derse başla ›',
    },
    goals: ['Sıvının içinde basıncın derinlikle arttığını söyler.', 'Sıvı basıncının derinliğe, yoğunluğa ve yer çekimi ivmesine bağlı olduğunu belirtir.', 'Sıvı basıncını artıran ve azaltan durumları ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Basınç hakkında bildiklerini yokla.', run: hatirla },
      { title: 'Tek nefeste dalış', goal: 'Derine inildikçe baskının nasıl değiştiğini gör.', run: dalis },
      { title: 'Üstteki su ağırlığıyla basar', goal: 'Basıncın kaynağını bul: noktanın üstündeki su sütunu.', run: sutunSahne },
      { title: 'Basınç neye bağlı?', goal: 'Sıvı basıncının üç etmenini ayır.', run: bagli },
      { title: 'Vurgun ve sağlık', goal: 'Derin dalışın sağlık yönünü ve önlemleri öğren.', run: vurgun },
      { title: 'Denizaltının penceresi', goal: 'Denizaltının penceresine binen basıncı derinlikle ilişkilendir.', run: denizalti },
      { title: 'Artır mı, azalt mı?', goal: 'Hangi durumların sıvı basıncını artırdığını ya da azalttığını ayır.', run: artirAzalt },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir gölde iki dalgıç var: biri 3 metrede, öteki göl tabanına yakın. Hangisi daha büyük basınç altındadır?',
        options: ['3 metredeki; çünkü yüzeye yakındır', 'Göl tabanına yakın olan; üstünde daha yüksek sütun var', 'İkisi de aynı basınç altındadır'], answer: 1,
        why: ['Yüzeye yakın olmak basıncı büyütmez; üstündeki sütun alçaktır, basınç küçüktür.', 'Üstündeki su sütunu daha yüksek ve daha ağırdır; basınç daha büyüktür.', 'Basınç derinlikle artar; farklı derinliklerde aynı olamaz.'], scene: 2 },
      { q: 'Aynı derinlikte, biri tatlı su dolu, öteki çok tuzlu su dolu iki gölün dibinde basınç ölçülüyor. Tuzlu suyun yoğunluğu daha büyüktür. Hangisinde basınç büyüktür?',
        options: ['Tatlı gölde', 'İkisinde de aynıdır', 'Tuzlu gölde'], answer: 2,
        why: ['Yoğunluğu küçük sıvıda aynı sütun daha hafiftir; basınç daha küçüktür.', 'Derinlik aynı olsa da yoğunluk farklıdır; basınç da farklıdır.', 'Yoğunluk büyükse aynı sütun daha ağırdır; basınç daha büyüktür.'], scene: 3 },
      { q: 'Biri ağır, biri hafif iki dalgıç aynı denizde aynı derinliğe iniyor. Kulaklarındaki basınç için hangisi doğrudur?',
        options: ['Aynıdır; sıvı basıncı derinliğe, yoğunluğa ve g’ye bağlıdır', 'Ağır olanda daha büyüktür', 'Hafif olanda daha büyüktür'], answer: 0,
        why: ['Dalgıcın kendi ağırlığı bu üç etmenden biri değildir; ikisi için de aynıdır.', 'Dalgıcın ağırlığı basıncı belirlemez; üstteki su sütununun ağırlığı belirler.', 'Dalgıcın ağırlığı basıncı belirlemez; derinlik aynıysa basınç da aynıdır.'], scene: 3 },
      { q: 'Vurgun nedir?',
        options: ['Kulakta dolgunluk hissi oluşmasıdır', 'Ani basınç değişiminde vücutta gaz kabarcıkları oluşmasıdır', 'Dalış sırasında nefesin tükenmesidir'], answer: 1,
        why: ['Kulaktaki dolgunluk basıncın bir etkisidir; vurgun değildir.', 'Ani basınç değişiminde vücutta gaz kabarcıkları oluşur; buna vurgun denir.', 'Vurgun nefesin tükenmesi değildir.'], scene: 4 },
      { q: 'Aynı sıvı, aynı derinlik: kabın tabanındaki basınç Ekvator’da ve kutupta ölçülüyor. Hangisi doğrudur?',
        options: ['İkisinde de tam aynıdır', 'Ekvator’da biraz daha büyüktür', 'Kutupta biraz daha büyüktür'], answer: 2,
        why: ['Yer çekimi ivmesi iki yerde biraz farklıdır; basınç da biraz farklıdır.', 'Ekvator’da g biraz küçüktür; basınç da biraz küçüktür.', 'Kutuplarda g biraz büyüktür; basınç da biraz büyüktür.'], scene: 3 },
    ],
    summary: ['Sıvıda derine inildikçe, üstteki su sütununun ağırlığı arttığı için basınç artar.', 'Basınç; derinliğe, sıvının yoğunluğuna ve yer çekimi ivmesine bağlıdır.', '<b>Sıvıda ne kadar derine inersen basınç o kadar büyür.</b>'],
    nextLesson: { href: 'b2-durgun-sivi-basinci.html', label: 'Sonraki: Deneyle modele: durgun sıvının basıncı ›' },
  });
})();
