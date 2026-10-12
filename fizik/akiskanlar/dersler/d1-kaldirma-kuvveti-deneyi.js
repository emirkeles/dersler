/* D1 — Kaldırma kuvveti neye bağlı? Deneyi kur
   Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve yer çekimi ivmesine bağlıdır; tamamen batmış cisimde derinliğe bağlı değildir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md. Sayılar örnek veridir (F_k = V_b · d_s · g, g = 9,8 m/s², su 1.000 kg/m³). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, onay, tablo, sinifla } = window.KIT;
  const { FK, okumaDeger, ton, kap, cisim, kuvvetOku, duzenek } = window.KIT_D;
  const { lerp, ease } = Ders;
  const ACIK = '#c3cbea', GOVDE = '#8f9bc4', ZEMIN = '#10162b', CISIM = '#b7bfd6';
  const KREM = '#e9d9a8', KREM_K = '#fff3c4';

  /* Öğeleri 300 ms'de söndürür. */
  const kaybol = (c, ...els) => belir(c, els.flat(), 300, 0);
  /* Yer değiştiren kart. */
  function kartKoy(c, p, ad, renk, x, y) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p);
    kutu(c, g, -120, -40, 240, 80, { rx: 12 });
    yazi(c, g, 0, 9, ad, { size: 26, kalin: 700, renk });
    g.style.opacity = 0;
    const k = { g, x, y };
    k.tasi = (X, Y, ms = 500) => {
      const x0 = k.x, y0 = k.y; k.x = X; k.y = Y;
      return c.tween(ms, (e) => g.setAttribute('transform', `translate(${lerp(x0, X, e)},${lerp(y0, Y, e)})`), ease.inOut);
    };
    return k;
  }
  /* İki satırlı başlıklı tablo (x 480, y 130, satır yüksekliği 56). bas: [{ ad: ['satır 1', 'satır 2'], renk }]. */
  function tab(c, p, bas, w, satir) {
    const tb = tablo(c, p, { x: 480, y: 130, satir, h: 56, size: 20, sutunlar: bas.map((b, j) => ({ ad: b.ad[0], w: w[j], renk: b.renk })) });
    const hs = [...tb.g.children].filter((e) => e.tagName === 'text');
    hs.forEach((t, j) => {
      if (bas[j].ad.length > 1) {
        t.setAttribute('y', 154);
        yazi(c, tb.g, +t.getAttribute('x'), 177, bas[j].ad[1], { size: 20, kalin: 700, renk: bas[j].renk });
      }
    });
    tb.genislik = w.reduce((s, v) => s + v, 0);
    return tb;
  }
  const SAT = (tb, i, a, b, f) => { tb.yaz(i, 0, a); tb.yaz(i, 1, b, RENK.kuvvet); tb.yaz(i, 2, f, RENK.kaldirma); };
  /* Kaldırma kuvveti hücresinin sağ ucuna işaret ("× 2"). */
  const isaret = (c, p, tb, i, metin, renk = RENK.kaldirma) => yazi(c, p, 480 + tb.genislik - 10, 130 + 56 * (i + 1) + 35, metin, { hiza: 'end', size: 20, kalin: 700, renk });
  /* Tablo + düzenek için ortak başlıklar. */
  const BAS_DILIM = [{ ad: ['Batan hacim', '(dilim)'] }, { ad: ['Dinamometre', '(N)'], renk: RENK.kuvvet }, { ad: ['Kaldırma kuvveti', '(N)'], renk: RENK.kaldirma }];

  /* Çubuk insan: ayak y'de, boyu 80 birim. */
  function kisi(c, p, x, ayak, renk = ACIK) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: ayak - 68, r: 12, fill: 'none', stroke: renk, 'stroke-width': 4 }, g);
    cizgi(c, g, [x, ayak - 56], [x, ayak - 28], renk, 4);
    cizgi(c, g, [x, ayak - 28], [x - 12, ayak], renk, 4);
    cizgi(c, g, [x, ayak - 28], [x + 12, ayak], renk, 4);
    cizgi(c, g, [x - 16, ayak - 46], [x + 16, ayak - 46], renk, 4);
    return g;
  }

  /* ---- 1. Hatırla ---- */
  function dagcilar(c, p) {
    const g = c.S('g', {}, p), oklar = c.S('g', {}, p);
    c.S('path', { d: 'M40,480 L400,480 L560,410 L960,410 L960,540 L40,540 Z', fill: '#1f2a52' }, g);
    [{ x: 280, ayak: 480, boy: 160, ok: 70 }, { x: 720, ayak: 410, boy: 90, ok: 35 }].forEach((k) => {
      c.S('rect', { x: k.x - 40, y: k.ayak - 80 - k.boy, width: 80, height: k.boy, fill: GOVDE, 'fill-opacity': 0.3 }, g);
      kisi(c, g, k.x, k.ayak);
      ok(c, oklar, [k.x, k.ayak - 86 - k.ok], [k.x, k.ayak - 86], RENK.basinc, 5);
    });
    yazi(c, g, 280, 520, 'alçakta', { size: 26, kalin: 700 });
    yazi(c, g, 720, 452, 'yüksekte', { size: 26, kalin: 700 });
    return { g, oklar };
  }
  function dalgicilar(c, p) {
    const g = c.S('g', {}, p), oklar = c.S('g', {}, p);
    c.S('rect', { x: 100, y: 250, width: 800, height: 270, fill: RENK.sivi, 'fill-opacity': 0.3 }, g);
    cizgi(c, g, [100, 250], [900, 250], RENK.sivi, 3);
    [{ x: 300, boy: 60, ok: 30 }, { x: 700, boy: 150, ok: 70 }].forEach((k) => {
      c.S('rect', { x: k.x - 40, y: 250, width: 80, height: k.boy, fill: RENK.sivi, 'fill-opacity': 0.35 }, g);
      kisi(c, g, k.x, 250 + k.boy + 80);
      ok(c, oklar, [k.x, 250 + k.boy - 6 - k.ok], [k.x, 250 + k.boy - 6], RENK.basinc, 5);
    });
    yazi(c, g, 300, 226, 'sığda', { size: 26, kalin: 700 });
    yazi(c, g, 700, 226, 'derinde', { size: 26, kalin: 700 });
    return { g, oklar };
  }

  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const dg = dagcilar(c, svg);
    gizle(dg.g, dg.oklar);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, dg.g, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Bir dağcı yükseğe çıkıyor. Açık hava basıncı nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Yükseldikçe üstteki hava sütunu kısalır; açık hava basıncı azalır.', '', 'Yükseldikçe üstteki hava sütunu kısalır; açık hava basıncı azalır.'],
      right: 'Evet. Hava sütunu kısalınca basınç azalır.',
    });
    c.clearSay();
    await par(c.say('Yükseldikçe hava sütunu kısalır; basınç azalır.'), belir(c, dg.oklar, 400));
    c.clearSay();
    await belir(c, [dg.g, dg.oklar], 300, 0); dg.g.remove(); dg.oklar.remove();
    const dv = dalgicilar(c, svg);
    gizle(dv.g, dv.oklar);
    await belir(c, dv.g, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dalgıç durgun suda daha derine iniyor. Üzerine etki eden sıvı basıncı nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar; üstündeki sıvının ağırlığı artar'], answer: 2,
      hints: ['Derinlik arttıkça P = h · d · g büyür.', 'Derinlik arttıkça P = h · d · g büyür.', ''],
      right: 'Evet. Derinlik arttıkça sıvı basıncı artar.',
    });
    c.clearSay();
    await par(c.say('Derinde üstteki sıvı artar; basınç da artar.'), belir(c, dv.oklar, 400));
    c.clearSay();
    await belir(c, [dv.g, dv.oklar], 300, 0); dv.g.remove(); dv.oklar.remove();
    // Son kare: sıvı içindeki cisme yukarı kuvvet.
    const son = c.S('g', {}, svg);
    kap(c, son, { x1: 350, x2: 650, ust: 240, yuzey: 290, taban: 500 });
    cisim(c, son, { x: 520, y: 380 });
    kuvvetOku(c, son, 470, 420, 60, RENK.kaldirma, { yukari: true, etiket: ['yukarı', 'kuvvet'] });
    gizle(son);
    await par(c.say('Bugün sıvının cisme uyguladığı yukarı yönlü bir kuvveti sınayacağız.'), belir(c, son, 450));
  }

  /* ---- 2. Altın taç ---- */
  /* Taç: sol üst köşe (x, y) taban çizgisi; w genişlik (160'ta yükseklik 80, uçlar 30 yukarıda). */
  function tacCiz(c, p, x, y, w) {
    const k = w / 160, P = [[0, 80], [0, 0], [10, -30], [27, 0], [45, -30], [62, 0], [80, -30], [97, 0], [115, -30], [132, 0], [150, -30], [160, 0], [160, 80]];
    const d = 'M' + P.map(([a, b]) => `${x + a * k},${y + b * k}`).join(' L') + ' Z';
    return c.S('path', { d, fill: KREM, stroke: KREM_K, 'stroke-width': 3, 'stroke-linejoin': 'round' }, p);
  }
  async function altinTac(c) {
    const svg = c.svg(1000, 562);
    // (a) külçe, taç, soru işareti
    const a = c.S('g', {}, svg);
    const kulce = c.S('rect', { x: 120, y: 330, width: 160, height: 70, rx: 6, fill: KREM, stroke: KREM_K, 'stroke-width': 3 }, a);
    const tac = tacCiz(c, a, 480, 320, 160);
    const soru = yazi(c, a, 560, 258, '?', { size: 36, kalin: 700 });
    gizle(kulce, tac, soru);
    // (b) küvet
    const b = c.S('g', {}, svg);
    c.S('rect', { x: 304, y: 330, width: 392, height: 128, fill: RENK.sivi, 'fill-opacity': 0.35 }, b);
    c.S('path', { d: 'M300,300 L300,460 L700,460 L700,300', fill: 'none', stroke: ACIK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, b);
    c.S('circle', { cx: 500, cy: 318, r: 26, fill: 'none', stroke: ACIK, 'stroke-width': 4 }, b);
    c.S('path', { d: 'M462,356 Q500,334 538,356', fill: 'none', stroke: ACIK, 'stroke-width': 4, 'stroke-linecap': 'round' }, b);
    const damla = [[710, 318], [722, 300], [714, 282]].map(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: RENK.sivi }, b));
    const eureka = yazi(c, b, 500, 258, 'Eureka!', { size: 40, kalin: 700 });
    gizle(b, damla, eureka);
    // (c) iki toplama kabı
    const k3 = c.S('g', {}, svg);
    const kapCiz = (x1, x2) => {
      const su = c.S('rect', { x: x1 + 2, y: 410, width: x2 - x1 - 4, height: 48, fill: RENK.sivi, 'fill-opacity': 0.35 }, k3);
      const duvar = c.S('path', { d: `M${x1},360 L${x1},460 L${x2},460 L${x2},360`, fill: 'none', stroke: ACIK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, k3);
      gizle(su);
      return { su, duvar };
    };
    const sol = kapCiz(160, 330), sag = kapCiz(560, 730);
    const kulce2 = c.S('rect', { x: 200, y: 315, width: 90, height: 40, rx: 4, fill: KREM, stroke: KREM_K, 'stroke-width': 3 }, k3);
    const tac2 = tacCiz(c, k3, 600, 310, 90);
    const esit = yazi(c, k3, 445, 436, '≠', { size: 44, kalin: 700 });
    gizle(sol.duvar, kulce2, sag.duvar, tac2, esit);
    // (d) yerinden edilen su
    const dd = c.S('g', {}, svg);
    const bk = c.S('g', {}, dd);
    kutu(c, bk, 250, 230, 100, 100, { rx: 8, dolgu: CISIM, renk: '#e4e9fb' });
    yazi(c, bk, 300, 372, 'cisim', { size: 26, kalin: 700 });
    const es = yazi(c, dd, 500, 300, '=', { size: 60, kalin: 700 });
    const bs = c.S('g', {}, dd);
    kutu(c, bs, 650, 230, 100, 100, { rx: 8, dolgu: 'rgba(100,150,255,0.35)', renk: RENK.sivi });
    yazi(c, bs, 700, 372, 'yerinden edilen su', { size: 26, kalin: 700, renk: RENK.sivi });
    gizle(bk, es, bs);

    await par(c.say('Sirakuza Kralı Hiero, kuyumcuya bir külçe altın veriyor.'), belir(c, kulce, 400));
    await par(c.say('Kral, külçenin tamamından bir taç yapılmasını istiyor.'), belir(c, tac, 400));
    await par(c.say('Taç gelince Kral, içine başka madde katıldığından şüpheleniyor.', { speak: '[thoughtful] Taç gelince Kral, içine başka madde katıldığından şüpheleniyor.' }), belir(c, soru, 300));
    await c.say('Arşimet’ten tacı bozmadan hileyi bulması isteniyor.');
    await par(c.say('Arşimet, küvetten taşan suyu görünce “Eureka!” diye bağırıyor.'), (async () => {
      await par(kaybol(c, a), belir(c, b, 400));
      damla.forEach((d) => { d.style.opacity = 1; });
      const y0 = damla.map((d) => +d.getAttribute('cy'));
      await c.tween(700, (e) => damla.forEach((d, i) => d.setAttribute('cy', lerp(y0[i], y0[i] + 140, e))), ease.in);
      await belir(c, eureka, 300);
    })());
    await c.say('Taşan su ile kendi ağırlığı arasında bir ilişki fark ediyor.');
    await par(c.say('Önce külçe altını daldırıp taşan suyun ağırlığını ölçüyor.'), (async () => {
      await kaybol(c, b);
      await belir(c, [sol.duvar, kulce2], 300);
      await belir(c, sol.su, 500);
    })());
    await par(c.say('Sonra tacı daldırıp taşan suyun ağırlığını ölçüyor.'), (async () => {
      await belir(c, [sag.duvar, tac2], 300);
      await belir(c, sag.su, 500);
    })());
    await par(c.say('İki taşan suyun ağırlığı aynı çıkmıyor; kuyumcu Kral’ı aldatmış.'), belir(c, esit, 400));
    c.clearSay();
    await par(c.say('Suya batan her cisim, kendi hacmi kadar suyu yerinden eder.'), (async () => {
      await kaybol(c, k3);
      await belir(c, bk, 350);
      await belir(c, es, 300);
      await belir(c, bs, 350);
    })());
  }

  /* ---- 3. Kaldırma kuvveti ve dinamometre ---- */
  async function dinamometreSahne(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { etiket: true });
    d.kaldirma.ayarla(39);
    gizle(d.g, d.okumaYazi, d.agirlik.g, d.kaldirma.g);
    await par(c.say('Dinamometre, kuvveti newton cinsinden ölçen yaylı bir aygıttır.'), belir(c, d.g, 450));
    await par(c.say('Ela cismi havada tartıyor: dinamometre 9,8 newton gösteriyor.', { speak: 'Ela cismi havada tartıyor: dinamometre dokuz virgül sekiz newton gösteriyor.' }), belir(c, [d.okumaYazi, d.agirlik.g], 400));
    await c.say('Bu değer cismin ağırlığıdır; aşağı yönlü bir kuvvettir.');
    await par(c.say('Ela cismi tamamen suya batırıyor: dinamometre 5,88 newton gösteriyor.', { speak: 'Ela cismi tamamen suya batırıyor: dinamometre beş virgül seksen sekiz newton gösteriyor.' }), par(d.dilim(4, 900), d.oku(5.88, 600)));
    await par(c.say('Okunan değer küçüldü: su cismi yukarı doğru itiyor.'), belir(c, d.kaldirma.g, 400));
    await c.say('Sıvının cisme uyguladığı bu yukarı kuvvete kaldırma kuvveti denir.');
    await c.say('Kaldırma kuvveti, ağırlığa zıt yönlüdür.');
    await c.say('Bu yüzden denizde bir arkadaşını kaldırmak karadakinden kolaydır.');
  }

  /* ---- 4. Kaldırma kuvvetini ölçme (çözülmüş örnek) ---- */
  async function olcme(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, {});
    const dilimYazi = [yazi(c, svg, 405, 238, 'dört eşit', { hiza: 'end', size: 22, kalin: 600, renk: ACIK }), yazi(c, svg, 405, 262, 'dilim', { hiza: 'end', size: 22, kalin: 600, renk: ACIK })];
    const hesap = renkli(c, svg, 600, 215, [['9,8', RENK.kuvvet], ' − ', ['7,84', RENK.kuvvet], ' = ', ['1,96 N', RENK.kaldirma]], { hiza: 'start', size: 32, kalin: 700 });
    const parca = [...hesap.children];
    parca.forEach((t) => { t.style.fillOpacity = 0; });
    gizle(d.g, d.kaldirma.g, dilimYazi);
    await par(c.say('Cismin dört eşit dilimi var; her dilim aynı hacimdedir.'), belir(c, [d.g, ...dilimYazi], 450));
    await par(c.say('Ela cismi iki dilimi batacak kadar indiriyor.'), par(d.dilim(2, 600), d.oku(7.84, 600)));
    await c.say('Dinamometre 9,8 yerine 7,84 newton gösteriyor.', { speak: 'Dinamometre dokuz virgül sekiz yerine yedi virgül seksen dört newton gösteriyor.' });
    d.kaldirma.ayarla(20);
    await par(c.say('Okumadaki azalma, kaldırma kuvvetinin büyüklüğüdür.'), belir(c, [d.kaldirma.g], 400), kaybol(c, dilimYazi));
    await par(c.say('Kaldırma kuvveti: 9,8 eksi 7,84, yani 1,96 newton.', { speak: 'Kaldırma kuvveti: dokuz virgül sekiz eksi yedi virgül seksen dört, yani bir virgül doksan altı newton.' }), (async () => {
      for (const t of parca) {
        if (!t.textContent.trim()) { t.style.fillOpacity = 1; continue; }
        await c.tween(300, (e) => { t.style.fillOpacity = e; }, ease.out);
      }
    })());
  }

  /* ---- 5. Hangi değişkenler? ---- */
  /* İki özdeş gemi; s ölçek, oklar: kaldırma kuvveti okları (yüklü 60, boş 30 birim). */
  function gemiler(c, p, s = 1, kx = 0) {
    const g = c.S('g', {}, p);
    const ic = c.S('g', { transform: `translate(${265 * (1 - s) + kx},${340 * (1 - s)}) scale(${s})` }, g);
    const govde = (x, alt) => c.S('path', { d: `M${x},${alt - 100} L${x + 150},${alt - 100} L${x + 130},${alt} L${x + 20},${alt} Z`, fill: GOVDE, stroke: ACIK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ic);
    govde(100, 380); govde(290, 360);
    [125, 160, 195].forEach((x) => c.S('rect', { x, y: 260, width: 30, height: 20, fill: RENK.kuvvet, 'fill-opacity': 0.85 }, ic));
    c.S('rect', { x: 60, y: 340, width: 410, height: 160, fill: RENK.sivi, 'fill-opacity': 0.35 }, ic);
    cizgi(c, ic, [60, 340], [470, 340], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    const y1 = kuvvetOku(c, ic, 175, 445, 60, RENK.kaldirma, { yukari: true });
    const y2 = kuvvetOku(c, ic, 365, 395, 30, RENK.kaldirma, { yukari: true });
    yazi(c, ic, 175, 232, 'yüklü', { size: 28 / s, kalin: 700 });
    yazi(c, ic, 365, 232, 'boş', { size: 28 / s, kalin: 700 });
    return { g, oklar: [y1.g, y2.g] };
  }
  function kaplar(c, p) {
    const g = c.S('g', {}, p);
    const k = [{ x1: 540, x2: 720, ad: 'su', d: 1, bat: 40 }, { x1: 780, x2: 960, ad: 'tuzlu su', d: 2, bat: 28 }];
    k.forEach((o) => {
      const cx = (o.x1 + o.x2) / 2;
      c.S('rect', { x: o.x1, y: 340, width: o.x2 - o.x1, height: 160, fill: RENK.sivi, 'fill-opacity': ton(o.d) }, g);
      cizgi(c, g, [o.x1, 340], [o.x2, 340], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
      c.S('circle', { cx, cy: 340 + o.bat - 36, r: 36, fill: CISIM, 'fill-opacity': 0.92, stroke: '#e4e9fb', 'stroke-width': 2.5 }, g);
      c.S('path', { d: `M${o.x1},260 L${o.x1},500 L${o.x2},500 L${o.x2},260`, fill: 'none', stroke: ACIK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      yazi(c, g, cx, 236, o.ad, { size: 26, kalin: 700 });
    });
    return g;
  }
  async function degiskenler(c) {
    const svg = c.svg(1000, 562);
    const gm = gemiler(c, svg), kp = kaplar(c, svg);
    const derin = ok(c, svg, [698, 346], [698, 452], RENK.gri, 5);
    const et = [yazi(c, svg, 285, 548, 'batan hacim', { size: 26, kalin: 700, renk: RENK.kaldirma }),
      yazi(c, svg, 521, 548, 'sıvının yoğunluğu', { size: 26, kalin: 700, renk: RENK.sivi }),
      yazi(c, svg, 736, 548, 'derinlik', { size: 26, kalin: 700, renk: ACIK })];
    gizle(gm.g, ...gm.oklar, kp, derin.g, et);
    await par(c.say('Yüklü gemi daha derine batar; batan hacmi daha büyüktür.'), (async () => { await belir(c, gm.g, 500); await belir(c, gm.oklar, 400); })());
    await par(c.say('Top, tuzlu suda sudakinden daha az batar.'), belir(c, kp, 500));
    await c.say('Tuzlu su, sudan daha yoğundur.');
    await par(c.say('Derinlikle basınç artıyordu; derinliğin de etkisi olabilir.', { speak: '[thoughtful] Derinlikle basınç artıyordu; derinliğin de etkisi olabilir.' }), belir(c, derin.g, 400));
    await par(c.say('Üç aday değişken: batan hacim, sıvının yoğunluğu, derinlik.'), (async () => { for (const e of et) await belir(c, e, 300); })());
    await c.say('Hangisinin etkisi olduğunu yalnızca deney gösterir.');
    await c.say('Deneyde her seferinde yalnızca bir değişken değiştirilir.');
    await c.say('Ölçülen değer kaldırma kuvvetidir; geri kalan her şey sabit kalır.');
  }

  /* ---- 6. Deney 1: batan hacim ---- */
  async function deney1(c) {
    const svg = c.svg(1000, 562);
    const a = c.S('g', {}, svg);
    const bas = c.S('g', {}, a);
    [{ x: 60, ad: 'Değiştirilen' }, { x: 365, ad: 'Ölçülen' }, { x: 670, ad: 'Sabit tutulan' }].forEach((k) => {
      kutu(c, bas, k.x, 60, 270, 50, { rx: 10 });
      yazi(c, bas, k.x + 135, 94, k.ad, { size: 26, kalin: 700 });
    });
    gizle(bas);
    const kHacim = kartKoy(c, a, 'batan hacim', RENK.kaldirma, 500, 240);
    const kKuvvet = kartKoy(c, a, 'kaldırma kuvveti', RENK.kaldirma, 500, 240);
    const kSivi = kartKoy(c, a, 'sıvı', RENK.sivi, 375, 290);
    const kCisim = kartKoy(c, a, 'cisim', ACIK, 625, 290);

    await par(c.say('İlk deneyde kaldırma kuvvetinin batan hacme bağlı olup olmadığına bakıyoruz.', { speak: '[curious] İlk deneyde kaldırma kuvvetinin batan hacme bağlı olup olmadığına bakıyoruz.' }), belir(c, bas, 450));
    await c.say('Değiştirilen değişken batan hacimdir: dilimleri sırayla batıracağız.');
    await belir(c, kHacim.g, 300);
    await kHacim.tasi(195, 170);
    await c.say('Ölçülen değişken, her seferinde kaldırma kuvvetidir.');
    await belir(c, kKuvvet.g, 300);
    await kKuvvet.tasi(500, 170);
    c.clearSay();
    await belir(c, [kSivi.g, kCisim.g], 350);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kartlardan ikisi yerine oturdu. Sıvı ve cisim nereye gider?',
      options: ['Değiştirilen', 'Sabit tutulan', 'Ölçülen'], answer: 1,
      hints: ['Yalnızca bir değişken değişecek.', '', 'Batan hacim dışındaki her şey aynı kalmalı.'],
      right: 'Evet. Sıvı ve cisim sabit tutulur.',
    });
    c.clearSay();
    await par(c.say('Sıvı ve cisim aynı kalır; yalnızca batan hacim değişir.'), par(kSivi.tasi(805, 170), kCisim.tasi(805, 265)));

    // (b) ölçüm
    await c.wait(300);
    c.clearSay();
    await belir(c, a, 300, 0); a.remove();
    const b = c.S('g', {}, svg);
    const d = duzenek(c, b, { dx: -190 });
    const tb = tab(c, b, BAS_DILIM, [140, 140, 190], 5);
    gizle(b);
    await belir(c, b, 450);
    SAT(tb, 0, '0', '9,8', '0');
    await par(c.say('Ela cismi önce havada tartıyor: 9,8 newton.', { speak: 'Ela cismi önce havada tartıyor: dokuz virgül sekiz newton.' }), tb.goster(0, 300));
    await par(c.say('Bir dilim batınca dinamometre 8,82 newton gösteriyor.', { speak: 'Bir dilim batınca dinamometre sekiz virgül seksen iki newton gösteriyor.' }), par(d.dilim(1, 600), d.oku(8.82, 400)));
    SAT(tb, 1, '1', '8,82', '0,98');
    await par(c.say('Kaldırma kuvveti 9,8 eksi 8,82, yani 0,98 newton.', { speak: 'Kaldırma kuvveti dokuz virgül sekiz eksi sekiz virgül seksen iki, yani sıfır virgül doksan sekiz newton.' }), par(tb.goster(1, 300), d.kaldirma.ayarla(10, 400)));
    SAT(tb, 2, '2', '7,84', '1,96');
    await par(c.say('İki dilimde kaldırma kuvveti 1,96 newton bulmuştuk.', { speak: 'İki dilimde kaldırma kuvveti bir virgül doksan altı newton bulmuştuk.' }), (async () => {
      await par(d.dilim(2, 600), d.oku(7.84, 400), d.kaldirma.ayarla(20, 600));
      await tb.goster(2, 300);
    })());
    c.clearSay();
    await par(d.dilim(3, 600), d.oku(6.86, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üç dilim batınca dinamometre 6,86 N gösteriyor. Kaldırma kuvveti kaç N?',
      options: ['6,86 N', '2,94 N', '1,96 N'], answer: 1,
      hints: ['Havadaki değerden sudaki değeri çıkar.', '', 'Kaldırma kuvveti, okumadaki azalmadır.'],
      right: 'Evet. 9,8 eksi 6,86, yani 2,94 N.',
    });
    c.clearSay();
    SAT(tb, 3, '3', '6,86', '2,94');
    await par(c.say('Üç dilimde kaldırma kuvveti 2,94 newton.', { speak: 'Üç dilimde kaldırma kuvveti iki virgül doksan dört newton.' }), par(tb.goster(3, 300), d.kaldirma.ayarla(29, 400)));
    SAT(tb, 4, '4', '5,88', '3,92');
    const isr = [isaret(c, b, tb, 2, '× 2'), isaret(c, b, tb, 3, '× 3'), isaret(c, b, tb, 4, '× 4')];
    gizle(isr);
    await par(c.say('Dört dilimde dinamometre 5,88, kaldırma kuvveti 3,92 newton.', { speak: 'Dört dilimde dinamometre beş virgül seksen sekiz, kaldırma kuvveti üç virgül doksan iki newton.' }), (async () => {
      await par(d.dilim(4, 600), d.oku(5.88, 400), d.kaldirma.ayarla(39, 600));
      await tb.goster(4, 300);
      await belir(c, isr, 400);
    })());
    await c.say('Her dilim, kaldırma kuvvetine 0,98 newton ekliyor.', { speak: 'Her dilim, kaldırma kuvvetine sıfır virgül doksan sekiz newton ekliyor.' });
    tb.vurgula(1); tb.vurgula(2);
    await c.say('Batan hacim iki katına çıkınca kaldırma kuvveti iki katına çıkıyor.');
    tb.vurgula(1, false); tb.vurgula(2, false);
    [1, 2, 3, 4].forEach((i) => tb.vurgula(i));
    await c.say('Batan hacim arttıkça kaldırma kuvveti artar.');

    // Sıra sende: gemiler
    c.clearSay();
    await belir(c, b, 300, 0); b.remove();
    const gm = gemiler(c, svg, 0.8, 235);
    gizle(gm.g, ...gm.oklar);
    await belir(c, gm.g, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Özdeş iki gemiden biri tam yüklü, biri boş. Hangisine etki eden kaldırma kuvveti daha büyüktür?',
      options: ['Boş gemiye', 'İkisine eşit', 'Yüklü gemiye; batan hacmi daha büyük'], answer: 2,
      hints: ['Batan hacim arttıkça kaldırma kuvveti artıyordu.', 'Daha derine batan geminin batan hacmi daha büyüktür.', ''],
      right: 'Evet. Batan hacmi büyük olana büyük kaldırma kuvveti etki eder.',
    });
    c.clearSay();
    await par(c.say('Yüklü gemide batan hacim büyük; kaldırma kuvveti de büyük.'), belir(c, gm.oklar, 500));
  }

  /* ---- 7. Deney 2: sıvının yoğunluğu ---- */
  async function deney2(c) {
    const svg = c.svg(1000, 562);
    const b = c.S('g', {}, svg);
    const d = duzenek(c, b, { dx: -190, dilim: 4 });
    d.oku(5.88, 0); d.kaldirma.ayarla(39);
    const tb = tab(c, b, [{ ad: ['Sıvı'] }, { ad: ['Dinamometre', '(N)'], renk: RENK.kuvvet }, { ad: ['Kaldırma kuvveti', '(N)'], renk: RENK.kaldirma }], [150, 130, 190], 2);
    tb.genislik = 470;
    const suEt = yazi(c, b, 130, 226, 'su (d)', { size: 26, kalin: 700, renk: RENK.sivi });
    const xEt = yazi(c, b, 380, 226, 'X sıvısı (2d)', { size: 26, kalin: 700, renk: RENK.sivi });
    const isr = isaret(c, b, tb, 1, '× 2');
    const yog = yazi(c, b, 490, 340, 'yoğunluk × 2', { hiza: 'start', size: 22, kalin: 700, renk: RENK.sivi });
    gizle(b, suEt, xEt, isr, yog);
    await par(c.say('İkinci deneyde yalnızca sıvıyı değiştiriyoruz.'), belir(c, b, 450));
    await c.say('Cisim iki sıvıda da tamamen batıyor; batan hacim aynı.');
    await par(c.say('Birinci sıvı su; yoğunluğuna d diyelim.', { speak: 'Birinci sıvı su; yoğunluğuna de diyelim.' }), belir(c, suEt, 300));
    await par(c.say('İkinci sıvı X; yoğunluğu suyunkinin iki katı, yani 2d.', { speak: 'İkinci sıvı iks; yoğunluğu suyunkinin iki katı, yani iki de.' }), belir(c, xEt, 300));
    SAT(tb, 0, 'su (d)', '5,88', '3,92');
    await par(c.say('Suda dinamometre 5,88 newton; kaldırma kuvveti 3,92 newton.', { speak: 'Suda dinamometre beş virgül seksen sekiz newton; kaldırma kuvveti üç virgül doksan iki newton.' }), tb.goster(0, 300));
    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Cisim X sıvısına tamamen batırılınca kaldırma kuvveti suyunkine göre nasıl olur?',
      options: ['Aynı kalır', 'Yarısı olur', 'İki katı olur'], answer: 2,
      hints: ['Yoğun tuzlu suda top daha az batıyordu: sıvı fark yaratıyor.', 'Yoğunluk iki katına çıktı; kaldırma kuvvetinin bu orana göre değişip değişmediğine bak.', ''],
      right: 'Evet. Yoğunluk iki katına çıkınca kaldırma kuvveti de iki katına çıktı.',
    });
    SAT(tb, 1, 'X sıvısı (2d)', '1,96', '7,84');
    await par(c.say('X sıvısında dinamometre 1,96 newton gösteriyor; kaldırma kuvveti 7,84 newton.', { speak: 'İks sıvısında dinamometre bir virgül doksan altı newton gösteriyor; kaldırma kuvveti yedi virgül seksen dört newton.' }), (async () => {
      await par(d.yogunluk(2, 600), kaybol(c, suEt));
      await par(d.git(0, 400), d.oku(9.8, 400), d.kaldirma.ayarla(0, 400));
      await par(d.git(80, 900), d.oku(1.96, 900), d.kaldirma.ayarla(78, 900));
      await tb.goster(1, 300);
    })());
    await par(c.say('Sıvının yoğunluğu iki katına çıktı; kaldırma kuvveti de iki katına çıktı.'), belir(c, [isr, yog], 400));
    await c.say('Sıvının yoğunluğu arttıkça kaldırma kuvveti artar.');
  }

  /* ---- 8. Deney 3: derinlik ---- */
  async function deney3(c) {
    const svg = c.svg(1000, 562);
    const b = c.S('g', {}, svg);
    const d = duzenek(c, b, { dx: -190, dilim: 4, cetvel: true });
    d.oku(5.88, 0); d.kaldirma.ayarla(39);
    const tb = tab(c, b, [{ ad: ['Derinlik', '(m)'] }, { ad: ['Dinamometre', '(N)'], renk: RENK.kuvvet }, { ad: ['Kaldırma kuvveti', '(N)'], renk: RENK.kaldirma }], [140, 140, 190], 3);
    gizle(b);
    await par(c.say('Üçüncü deneyde cismi tamamen batmış hâlde derine indiriyoruz.'), belir(c, b, 450));
    await par(c.say('Cismin üst yüzeyi başlangıçta suyun 0,1 metre altında.', { speak: 'Cismin üst yüzeyi başlangıçta suyun sıfır virgül bir metre altında.' }), d.git(110, 600));
    SAT(tb, 0, '0,1', '5,88', '3,92');
    await par(c.say('Batan hacim ve sıvı aynı; yalnızca derinlik değişiyor.'), tb.goster(0, 300));
    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Cisim 0,2 metre derine indirilirse kaldırma kuvveti ne olur?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 2,
      hints: ['Batan hacim ve sıvı aynı kaldı.', 'Dinamometre ibresinin yerinde durup durmadığına bak.', ''],
      right: 'Evet. Kaldırma kuvveti değişmedi.',
    });
    SAT(tb, 1, '0,2', '5,88', '3,92');
    SAT(tb, 2, '0,3', '5,88', '3,92');
    await par(c.say('0,2 ve 0,3 metrede de dinamometre 5,88 newton gösteriyor.', { speak: 'Sıfır virgül iki ve sıfır virgül üç metrede de dinamometre beş virgül seksen sekiz newton gösteriyor.' }), (async () => {
      await d.git(140, 700);
      await tb.goster(1, 300);
      await c.wait(700);
      await d.git(170, 700);
      await tb.goster(2, 300);
    })());
    await c.say('Kaldırma kuvveti her derinlikte 3,92 newton.', { speak: 'Kaldırma kuvveti her derinlikte üç virgül doksan iki newton.' });
    [0, 1, 2].forEach((i) => tb.vurgula(i));
    await c.say('Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.');
    await c.say('Derinlikle basınç artsa da kaldırma kuvveti artmıyor.');
  }

  /* ---- 9. Yer çekimi ivmesi ---- */
  async function yerCekimi(c) {
    const svg = c.svg(1000, 562);
    const dunya = c.S('circle', { cx: 500, cy: 560, r: 260, fill: '#2a3563', stroke: ACIK, 'stroke-width': 3 }, svg);
    const cs = c.S('rect', { x: 485, y: 220, width: 30, height: 30, rx: 3, fill: CISIM, stroke: '#e4e9fb', 'stroke-width': 2.5 }, svg);
    const yo = ok(c, svg, [500, 235], [500, 315], RENK.kuvvet, 6);
    const g = yazi(c, svg, 524, 285, 'g', { hiza: 'start', size: 36, kalin: 700, renk: RENK.kuvvet });
    const deger = yazi(c, svg, 552, 285, '= 9,8 m/s²', { hiza: 'start', size: 30, kalin: 700, renk: RENK.kuvvet });
    const sonuc = yazi(c, svg, 580, 190, 'g ↑ → kaldırma kuvveti ↑', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kaldirma });
    gizle(dunya, cs, yo.g, g, deger, sonuc);
    await par(c.say('Yer çekimi kuvveti, Dünya’nın cisimleri kendine çeken kuvvettir.'), belir(c, [dunya, cs, yo.g], 450));
    await par(c.say('Yer çekimi ivmesinin büyüklüğü g ile gösterilir.', { speak: 'Yer çekimi ivmesinin büyüklüğü ge ile gösterilir.' }), belir(c, g, 300));
    await par(c.say('Dünya’nın yüzeyinde g yaklaşık 9,8 metre bölü saniye kare.', { speak: 'Dünya’nın yüzeyinde ge yaklaşık dokuz virgül sekiz metre bölü saniye kare.' }), belir(c, deger, 300));
    await par(c.say('Yer çekimi ivmesi arttıkça kaldırma kuvveti artar.'), belir(c, sonuc, 400));
    await c.say('Ela g’yi değiştiremez; deneyleri hep aynı yerde yapıyor.', { speak: 'Ela ge’yi değiştiremez; deneyleri hep aynı yerde yapıyor.' });
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı sıvıda aynı hacim batarken, yer çekimi ivmesi daha büyük bir yerde kaldırma kuvveti nasıl olur?',
      options: ['Aynı kalır', 'Daha küçük olur', 'Daha büyük olur'], answer: 2,
      hints: ['Yer çekimi ivmesi arttıkça kaldırma kuvvetinin ne yaptığını hatırla.', 'Sıvı ve batan hacim aynı; değişen yalnızca g.', ''],
      right: 'Evet. g arttıkça kaldırma kuvveti artar.',
    });
    c.clearSay();
    await c.say('Daha büyük g, aynı batan hacimde daha büyük kaldırma kuvveti verir.', { speak: 'Daha büyük ge, aynı batan hacimde daha büyük kaldırma kuvveti verir.' });
    c.note('<b>Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve g’ye bağlıdır.</b><br>Örnek: derinlik etkisiz.', 'Kaldırma kuvveti', 'akiskanlar-d1-bagli');
  }

  /* ---- 10. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const d = duzenek(c, g1, { dx: -190 });
    const gorev = [yazi(c, g1, 500, 62, 'Kaldırma kuvvetini 3,92 N yap.', { hiza: 'start', size: 28, kalin: 700 }), yazi(c, g1, 500, 98, 'Kaç yol bulabilirsin?', { hiza: 'start', size: 28, kalin: 700 })];
    const canli = yazi(c, g1, 500, 170, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kaldirma });
    const YOL = [{ s: 0, n: 4, ad: 'su · 4 dilim', y: 270 }, { s: 1, n: 2, ad: 'X sıvısı · 2 dilim', y: 320 }];
    const yolSatir = YOL.map((o) => {
      const gg = c.S('g', {}, g1);
      onay(c, gg, 512, o.y - 8);
      yazi(c, gg, 540, o.y, o.ad, { hiza: 'start', size: 26, kalin: 600 });
      gizle(gg);
      return gg;
    });
    const bulundu = [false, false];
    let sivi = 0, n = 0, k = 0, hazir = false;
    const guncelle = () => {
      const tur = sivi ? 'x' : 'su', fk = FK[tur][n];
      d.git(n === 4 ? 110 + 30 * k : 20 * n, hazir ? 300 : 0);
      d.oku(okumaDeger(n, sivi), 0);
      d.kaldirma.ayarla(Math.round(fk * 10));
      d.yogunluk(sivi ? 2 : 1, hazir ? 400 : 0);
      canli.textContent = 'kaldırma kuvveti ' + String(fk).replace('.', ',') + ' N';
      if (!hazir) return;
      if (Math.abs(fk - 3.92) < 1e-9) {
        YOL.forEach((o, i) => {
          if (o.s === sivi && o.n === n && !bulundu[i]) { bulundu[i] = true; belir(c, yolSatir[i], 350); }
        });
        if (bulundu[0] && bulundu[1]) c.say('İkisi de olur: yoğunluk iki katına çıkınca batan hacim yarıya inebilir.', { noWait: true });
      }
    };
    guncelle();
    await c.say('Üç denetimi değiştirerek kaldırma kuvvetini ölç.', { noWait: true });
    let slD = null;
    const slN = c.slider({ label: 'Batan hacim', min: 0, max: 4, step: 1, value: 0, fmt: (v) => v + ' dilim', onInput: (v) => { n = +v; if (slD) { slD.el.style.opacity = n === 4 ? '' : '0.35'; slD.el.style.pointerEvents = n === 4 ? '' : 'none'; } guncelle(); } });
    const slS = c.slider({ label: 'Sıvı', min: 0, max: 1, step: 1, value: 0, fmt: (v) => (+v ? 'X sıvısı (2d)' : 'su (d)'), onInput: (v) => { sivi = +v; guncelle(); } });
    slD = c.slider({ label: 'Derinlik', min: 0, max: 2, step: 1, value: 0, fmt: (v) => ['0,1 m', '0,2 m', '0,3 m'][+v], onInput: (v) => {
      const yeni = +v; if (yeni === k) return; k = yeni; guncelle();
      if (hazir && n === 4) c.say('Derinlik kaldırma kuvvetini değiştirmedi.', { noWait: true });
    } });
    slD.el.style.opacity = '0.35'; slD.el.style.pointerEvents = 'none';
    hazir = true;
    await c.cont('Devam ›');
    slN.remove(); slS.remove(); slD.remove(); c.clearSay();
    if (!(bulundu[0] && bulundu[1])) {
      await par(c.say('İki yol vardı: su ile dört dilim, X sıvısı ile iki dilim.', { speak: 'İki yol vardı: su ile dört dilim, iks sıvısı ile iki dilim.' }), (async () => {
        for (let i = 0; i < 2; i++) {
          if (bulundu[i]) continue;
          sivi = YOL[i].s; n = YOL[i].n; guncelle();
          await c.wait(1000);
          await belir(c, yolSatir[i], 400);
        }
      })());
    }
    await c.wait(300);
    c.clearSay();
    await belir(c, g1, 300, 0); g1.remove();

    // Dene 2: sınıflandırma
    const KUTU = [{ x: 80, ad: 'Kaldırma kuvvetini etkiler' }, { x: 520, ad: 'Kaldırma kuvvetini etkilemez' }], sayac = [0, 0];
    KUTU.forEach((o) => { kutu(c, svg, o.x, 56, 400, 54, { rx: 10 }); yazi(c, svg, o.x + 200, 92, o.ad, { size: 24, kalin: 700, renk: RENK.kaldirma }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (kk) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 240, 355, 520, 90, { rx: 14 });
      yazi(c, kart, 500, 410, kk.ad, { size: 28, kalin: 700 });
      gizle(kart); await belir(c, kart, 350);
    };
    const yerlestir = async (kk) => {
      const el = kart; await belir(c, el, 300, 0); el.remove();
      const ad = yazi(c, svg, KUTU[kk.kutu].x + 200, 160 + sayac[kk.kutu] * 36, kk.kisa, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300); sayac[kk.kutu]++;
    };
    const KARTLAR = [
      { ad: 'Batan hacim', kisa: 'Batan hacim', kutu: 0, neden: 'Evet. Hacim büyüdükçe kaldırma kuvveti arttı.' },
      { ad: 'Derinlik (tamamen batmış cisim)', kisa: 'Derinlik', kutu: 1, neden: 'Evet. Dinamometre her derinlikte aynı değeri gösterdi.' },
      { ad: 'Sıvının yoğunluğu', kisa: 'Sıvının yoğunluğu', kutu: 0, neden: 'Evet. Yoğunluk iki katına çıkınca kuvvet iki katına çıktı.' },
      { ad: 'Yer çekimi ivmesi', kisa: 'Yer çekimi ivmesi', kutu: 0, neden: 'Evet. g arttıkça kaldırma kuvveti artar.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((o) => o.ad), kartlar: KARTLAR.map((kk) => Object.assign({ ipucu: 'Deneyde bu değişken değişince dinamometre okuması ne yaptı?' }, kk)),
      soru: (kk) => `${kk.ad} kaldırma kuvvetini etkiler mi?`,
      sec: (_, kk) => goster(kk), yerlestir: (_, kk) => yerlestir(kk),
    });
    await c.say('Tek değişkeni değiştirince hangisinin etkili olduğu anlaşılır.');
  }

  Ders.start({
    id: 'akiskanlar-d1', kicker: 'Konu D · Kaldırma kuvveti', title: 'Kaldırma kuvveti neye bağlı? Deneyi kur', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Kaldırma kuvveti neye bağlı? Deneyi kur',
      hook: 'Denizde bir arkadaşını kucağına almak karadakinden neden çok daha kolaydır?',
      button: 'Derse başla ›',
    },
    goals: ['Sıvının cisme yukarı yönlü bir kaldırma kuvveti uyguladığını dinamometre okumasından çıkarır.', 'Her seferinde tek değişkeni değiştirerek kaldırma kuvvetinin neye bağlı olduğunu bulur.', 'Tamamen batmış cismin kaldırma kuvvetinin derinliğe bağlı olmadığını açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Hava ve sıvı basıncının nasıl değiştiğini hatırla.', run: hatirla },
      { title: 'Altın taç', goal: 'Arşimet’in öyküsünden suyun cismi yerinden ettiğini gör.', run: altinTac },
      { title: 'Kaldırma kuvveti ve dinamometre', goal: 'Dinamometre okumasının azalmasından kaldırma kuvvetini fark et.', run: dinamometreSahne },
      { title: 'Kaldırma kuvvetini ölçme', goal: 'Kaldırma kuvvetini iki okumanın farkı olarak bul.', run: olcme },
      { title: 'Hangi değişkenler?', goal: 'Kaldırma kuvvetini etkileyebilecek üç adayı belirle.', run: degiskenler },
      { title: 'Deney 1: batan hacim', goal: 'Batan hacim değişince kaldırma kuvvetinin nasıl değiştiğini bul.', run: deney1 },
      { title: 'Deney 2: sıvının yoğunluğu', goal: 'Sıvı değişince kaldırma kuvvetinin nasıl değiştiğini bul.', run: deney2 },
      { title: 'Deney 3: derinlik', goal: 'Derinlik değişince kaldırma kuvvetinin nasıl değiştiğini bul.', run: deney3 },
      { title: 'Yer çekimi ivmesi', goal: 'Yer çekimi ivmesinin kaldırma kuvvetini nasıl etkilediğini öğren.', run: yerCekimi },
      { title: 'Dene', goal: 'Etkenleri değiştirip kaldırma kuvvetini sına ve etkenleri ayır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela başka bir cismi havada tartınca dinamometre 6 N, suya tamamen batırınca 4 N gösteriyor. Kaldırma kuvveti kaç N’dur?',
        options: ['4 N', '10 N', '2 N'], answer: 2,
        why: ['4 N, cismin suda okunan değeridir; kaldırma kuvveti okumadaki azalmadır.', '10 N, iki okumanın toplamıdır; kaldırma kuvveti ise farktır.', 'Kaldırma kuvveti 6 eksi 4, yani 2 N’dur.'], scene: 3 },
      { q: 'Tamamen batmış bir cisim havuzda 1 m derinlikten 2 m derinliğe indiriliyor. Dinamometre okuması nasıl değişir?',
        options: ['Değişmez; kaldırma kuvveti derinliğe bağlı değildir', 'Azalır; derinde kaldırma kuvveti artar', 'Artar; derinde cisim ağırlaşır'], answer: 0,
        why: ['Batan hacim ve sıvı aynı kaldı; kaldırma kuvveti de okuma da değişmez.', 'Kaldırma kuvveti derinlikle artmaz; okuma azalmaz.', 'Cismin ağırlığı derinlikle değişmez; okuma da artmaz.'], scene: 7 },
      { q: 'Aynı cisim önce suya, sonra yoğunluğu suyun üç katı olan bir sıvıya tamamen batırılıyor. Hangisinde kaldırma kuvveti büyüktür?',
        options: ['Suda', 'Yoğunluğu büyük olan sıvıda', 'İkisinde de aynı'], answer: 1,
        why: ['Su daha az yoğun olduğu için daha küçük kaldırma kuvveti uygular.', 'Batan hacim aynıyken yoğunluk arttıkça kaldırma kuvveti artar.', 'Sıvının yoğunluğu değiştiği için kaldırma kuvveti de değişir.'], scene: 6 },
      { q: 'Aynı sıvıda bir cismin batan hacmi iki dilimden dört dilime çıkıyor. Kaldırma kuvveti nasıl değişir?',
        options: ['Aynı kalır', 'Yarıya iner', 'İki katına çıkar'], answer: 2,
        why: ['Batan hacim değişince kaldırma kuvveti de değişir.', 'Batan hacim artınca kaldırma kuvveti azalmaz.', 'Batan hacim iki katına çıkınca kaldırma kuvveti iki katına çıkar.'], scene: 5 },
      { q: 'Kaldırma kuvvetinin sıvının yoğunluğuna bağlı olup olmadığı sınanıyor. Hangisi sabit tutulmalıdır?',
        options: ['Cismin batan hacmi', 'Sıvının yoğunluğu', 'Kaldırma kuvveti'], answer: 0,
        why: ['Yalnızca yoğunluk değişirken batan hacim gibi öteki her şey sabit kalır.', 'Yoğunluk bu deneyde değiştirilen değişkendir.', 'Kaldırma kuvveti bu deneyde ölçülen değerdir.'], scene: 6 },
    ],
    summary: ['Sıvı, içindeki cismi yukarı iter: buna kaldırma kuvveti denir.', 'Kaldırma kuvveti batan hacim ve sıvının yoğunluğu arttıkça artar; tamamen batmış cismin derinliğine bağlı değildir.', '<b>Tek değişkeni değiştir, kaldırma kuvvetine bak.</b>'],
    nextLesson: { href: 'd2-arsimet-ilkesi.html', label: 'Sonraki: Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır ›' },
  });
})();
