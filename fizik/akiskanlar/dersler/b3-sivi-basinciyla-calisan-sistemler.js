/* B3 — Sıvı basıncıyla çalışan sistemler
   Kapalı kaptaki sıvıya uygulanan basınç her noktaya eşit iletilir (Pascal Yasası); su cenderesi ve hidrolik sistemler.
   Senaryo: plan/fizik/akiskanlar/senaryolar/B-sivilarda-basinc.md (B3). Sayı ve bağıntı yok: F₁/A₁ = F₂/A₂, iş ve enerji alınmaz.
   Basınç okları yüzeyle orantılı çizilir (küçük pistonda 2, büyükte 6): basınç eşittir, yüzey büyük olduğu için ok çoktur. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, tablo } = window.KIT;
  const { SIVI, sivKabi, basincOklari } = window.KIT_B;
  const { lerp, ease } = Ders;
  const ZEMIN = '#10162b', GOVDE = '#8f9bc4', KENAR = '#c3cbea', AHSAP = '#a07a52';
  const Y_PU = 380, Y_PA = 395, Y_BORU = 440, Y_TABAN = 470; // piston üstü, piston altı, boru üstü, taban
  const sinir = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---- su cenderesi: iki silindir, piston, boru, sıvı, alan çizgileri ----
     o: { s: [x1, x2] küçük silindir, b: [x1, x2] büyük silindir, ust: silindirlerin üst ucu }
     Dönen: { g, sivi, kap (duvar + piston), alan (turkuaz çizgi + A₁/A₂), l1, l2, genislik(x2), b2 } */
  function cendere(c, p, o) {
    const [s1, s2] = o.s, b1 = o.b[0], ust = o.ust;
    let b2 = o.b[1];
    const g = c.S('g', {}, p);
    const sivi = c.S('path', { fill: SIVI.acik.dolgu, 'fill-opacity': SIVI.acik.o }, g);
    const kap = c.S('g', {}, g);
    const pis = { fill: GOVDE, stroke: KENAR, 'stroke-width': 2 };
    c.S('rect', Object.assign({ x: s1, y: Y_PU, width: s2 - s1, height: Y_PA - Y_PU }, pis), kap);
    const p2 = c.S('rect', Object.assign({ x: b1, y: Y_PU, width: b2 - b1, height: Y_PA - Y_PU }, pis), kap);
    const duv = { fill: 'none', stroke: GOVDE, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    const dis = c.S('path', duv, kap), ic = c.S('path', duv, kap);
    const alan = c.S('g', {}, g);
    const l1 = cizgi(c, alan, [s1 + 3, 399], [s2 - 3, 399], RENK.alan, 6);
    const l2 = cizgi(c, alan, [b1 + 3, 399], [b2 - 3, 399], RENK.alan, 6);
    yazi(c, alan, s1 - 22, 407, 'A₁', { hiza: 'end', size: 26, kalin: 700, renk: RENK.alan });
    const a2 = yazi(c, alan, b2 + 22, 407, 'A₂', { hiza: 'start', size: 26, kalin: 700, renk: RENK.alan });
    ic.setAttribute('d', `M${s2 + 3},${ust} L${s2 + 3},${Y_BORU - 3} L${b1 - 3},${Y_BORU - 3} L${b1 - 3},${ust}`);
    const ciz = () => {
      sivi.setAttribute('d', `M${s1},${Y_PA} L${s2},${Y_PA} L${s2},${Y_BORU} L${b1},${Y_BORU} L${b1},${Y_PA} L${b2},${Y_PA} L${b2},${Y_TABAN} L${s1},${Y_TABAN} Z`);
      dis.setAttribute('d', `M${s1 - 3},${ust} L${s1 - 3},${Y_TABAN + 3} L${b2 + 3},${Y_TABAN + 3} L${b2 + 3},${ust}`);
      p2.setAttribute('width', b2 - b1);
      l2.setAttribute('x2', b2 - 3);
      a2.setAttribute('x', b2 + 22);
    };
    ciz();
    return { g, sivi, kap, alan, l1, l2, genislik(x2) { b2 = x2; ciz(); }, get b2() { return b2; } };
  }

  /* Kuvvet oku ve harfi: aşağı bakan okun ucu y'de, yukarı bakanın kuyruğu y'de. ayarla(L, x) boyu ve yeri değiştirir. */
  function kuvvetOku(c, p, o) {
    const g = c.S('g', {}, p), a = ok(c, g, [o.x, o.y], [o.x, o.y], RENK.kuvvet, 6);
    const t = yazi(c, g, o.x, o.y, o.etiket, { size: 26, kalin: 700, renk: RENK.kuvvet });
    const ayarla = (L, x = o.x) => {
      if (o.yukari) a.ciz([x, o.y], [x, o.y - L]); else a.ciz([x, o.y - L], [x, o.y]);
      t.setAttribute('x', x); t.setAttribute('y', o.y - L - 14);
    };
    ayarla(o.L);
    return { g, ayarla };
  }

  /* Yol boyunca giden tek sarı nokta (basıncın sıvıyla taşınması). */
  function nokta(c, p, yol) {
    const el = c.S('circle', { cx: yol[0][0], cy: yol[0][1], r: 9, fill: RENK.basinc }, p);
    el.style.opacity = 0;
    const bol = [];
    let top = 0;
    for (let i = 1; i < yol.length; i++) { const d = Math.hypot(yol[i][0] - yol[i - 1][0], yol[i][1] - yol[i - 1][1]); bol.push(d); top += d; }
    const konum = (t) => {
      let k = t * top;
      for (let i = 0; i < bol.length; i++) {
        if (k <= bol[i] || i === bol.length - 1) { const u = bol[i] ? sinir(k / bol[i], 0, 1) : 1; return [lerp(yol[i][0], yol[i + 1][0], u), lerp(yol[i][1], yol[i + 1][1], u)]; }
        k -= bol[i];
      }
      return yol[yol.length - 1];
    };
    return {
      el,
      async git(ms) {
        await belir(c, el, 150);
        await c.tween(ms, (e) => { const q = konum(e); el.setAttribute('cx', q[0]); el.setAttribute('cy', q[1]); }, ease.inOut);
      },
    };
  }

  /* Okların bir an parlaması (vurgu). */
  function parlat(c, ogeler, ms = 400) {
    return c.tween(ms, (e) => ogeler.forEach((x) => { x.style.filter = `brightness(${1 + 0.9 * Math.sin(Math.PI * e)})`; }), ease.inOut)
      .then(() => ogeler.forEach((x) => { x.style.filter = ''; }));
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Birinci soru: üstü açık, sıvı dolu kap.
    const a = c.S('g', {}, svg);
    sivKabi(c, a, { x1: 360, x2: 640, y: 250, dip: 450, ust: 215 });
    const alt = basincOklari(c, a, [400, 442], [600, 442], [500, 350], { n: 4 });
    const sol = basincOklari(c, a, [368, 262], [368, 420], [500, 350], { n: 2 });
    const sag = basincOklari(c, a, [632, 262], [632, 420], [500, 350], { n: 2 });
    gizle(a);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Sıvı, içinde bulunduğu kabın hangi yüzeylerine basınç uygular?',
      options: ['Yalnızca tabanına', 'Temas ettiği bütün yüzeylerine', 'Yalnızca yan duvarlarına'], answer: 1,
      hints: ['Delikli şişede su yan yüzden fışkırıyordu.', '', 'Sıvı tabana da yan yüzeylere de basar.'],
      right: 'Evet. Sıvı, değdiği her yüzeye basınç uygular.',
    });
    c.clearSay();
    await par(c.say('Sıvı kabın tabanına da yan duvarlarına da basar.'), par(alt.ac(4, 400), sol.ac(2, 400), sag.ac(2, 400)));
    c.clearSay();
    await belir(c, a, 400, 0); a.remove();

    // İkinci soru: aynı kuvvet, A ve 2A yüzey.
    const b = c.S('g', {}, svg);
    cizgi(c, b, [120, 400], [880, 400], KENAR, 3);
    const bas = [];
    [{ x1: 250, x2: 350, ad: 'A' }, { x1: 600, x2: 800, ad: '2A' }].forEach((q) => {
      const cx = (q.x1 + q.x2) / 2;
      kutu(c, b, q.x1, 330, q.x2 - q.x1, 68, { rx: 6 });
      ok(c, b, [cx, 236], [cx, 324], RENK.kuvvet, 6);
      yazi(c, b, cx + 22, 284, 'F', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kuvvet });
      cizgi(c, b, [q.x1, 400], [q.x2, 400], RENK.alan, 6);
      yazi(c, b, cx, 474, q.ad, { size: 26, kalin: 700, renk: RENK.alan });
      const oklar = c.S('g', {}, b);
      for (let i = 0; i < 4; i++) { const x = q.x1 + (q.x2 - q.x1) * (i + 0.5) / 4; ok(c, oklar, [x, 410], [x, 436], RENK.basinc, 3); }
      oklar.style.opacity = 0; bas.push(oklar);
    });
    gizle(b);
    await belir(c, b, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı kuvvet iki kat büyük bir yüzeye etki ederse basınç nasıl değişir?',
      options: ['İki katına çıkar', 'Değişmez', 'Yarıya iner'], answer: 2,
      hints: ['Bölen büyüyünce bölüm küçülür.', 'Basınç, kuvvetin yüzey alanına bölümüdür.', ''],
      right: 'Evet. P = F / A; A iki katına çıkınca P yarıya iner.',
    });
    c.clearSay();
    await par(c.say('Aynı kuvvet geniş yüzeye yayılınca basınç yarıya iner.'), belir(c, bas, 450));
    c.clearSay();
    await belir(c, b, 400, 0); b.remove();
    const baslik = renkli(c, svg, 500, 292, [['sıvı', RENK.sivi], ' ', ['basıncıyla', RENK.basinc], ' çalışan sistemler'], { size: 44, kalin: 700 });
    gizle(baslik);
    await par(c.say('Bugün sıvı basıncıyla çalışan sistemlere bakacağız.'), belir(c, baslik, 450));
  }

  /* ---- 2. Basınç her yöne iletilir ---- */
  function olcer(c, p, cx, cy) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx, cy, r: 24, fill: ZEMIN, stroke: KENAR, 'stroke-width': 3 }, g);
    const ibre = cizgi(c, g, [cx, cy], [cx, cy - 17], RENK.basinc, 4);
    c.S('circle', { cx, cy, r: 3, fill: RENK.basinc }, g);
    return { g, aci(d) { ibre.setAttribute('transform', `rotate(${d} ${cx} ${cy})`); } };
  }

  async function yonlerde(c) {
    const svg = c.svg(1000, 562);
    const sahne = c.S('g', {}, svg);
    // Kapalı kap, sıvı, piston, üç ölçer.
    const kap = c.S('g', {}, sahne);
    c.S('rect', { x: 330, y: 220, width: 340, height: 250, fill: SIVI.acik.dolgu, 'fill-opacity': SIVI.acik.o }, kap);
    c.S('rect', { x: 334, y: 200, width: 332, height: 20, fill: GOVDE, stroke: KENAR, 'stroke-width': 2 }, kap);
    c.S('path', { d: 'M327,200 L327,473 L673,473 L673,200', fill: 'none', stroke: GOVDE, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, kap);
    const olc = [olcer(c, kap, 500, 470), olcer(c, kap, 330, 345), olcer(c, kap, 670, 345)];
    const F = kuvvetOku(c, sahne, { x: 500, y: 190, L: 70, etiket: 'kuvvet' });
    const sekiz = c.S('g', {}, sahne);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, d = [Math.sin(a), -Math.cos(a)];
      ok(c, sekiz, [500 + d[0] * 10, 345 + d[1] * 10], [500 + d[0] * 50, 345 + d[1] * 50], RENK.basinc, 4);
    }
    const pascal = yazi(c, sahne, 500, 62, 'Pascal Yasası', { size: 40, kalin: 700 });
    const sikis = yazi(c, sahne, 500, 526, 'sıkıştırılamaz: hacmi neredeyse değişmez', { size: 26, kalin: 600, renk: RENK.cizgi });
    gizle(kap, F.g, sekiz, pascal, sikis);

    await par(c.say('Kapalı bir kapta sıvı var; pistona bastırıyoruz.'), belir(c, kap, 450));
    await par(c.say('Pistona uygulanan kuvvet, sıvının basıncını artırır.'), par(belir(c, F.g, 400), belir(c, sekiz, 400)));
    await par(c.say('Üç ölçerin ibresi de aynı kadar ilerliyor.'), c.tween(600, (e) => olc.forEach((o) => o.aci(30 * e)), ease.inOut));
    await c.say('Kapalı kaptaki sıvıya dışarıdan basınç uygulandığında, bu basınç her yönde iletilir.');
    await c.say('Basınç, sıvının her noktasına ve kabın iç yüzeyine eşit büyüklükte iletilir.');
    await c.say('Eşit olan, basınçtaki artıştır.', { speak: '[short pause] Eşit olan, basınçtaki artıştır.' });
    await c.say('Yasayı ilk olarak bilim insanı Blaise Pascal ortaya koymuştur.');
    await par(c.say('Bu kurala Pascal Yasası denir.'), belir(c, pascal, 400));
    await par(c.say('Sıvılar sıkıştırılamaz kabul edilir.'), belir(c, sikis, 400));

    // Sıra sende: balon. Önce tahta balona geçer.
    c.clearSay();
    await belir(c, sahne, 400, 0); sahne.remove();
    const bl = c.S('g', {}, svg);
    c.S('circle', { cx: 500, cy: 330, r: 90, fill: SIVI.acik.dolgu, 'fill-opacity': SIVI.acik.o, stroke: KENAR, 'stroke-width': 4 }, bl);
    c.S('path', { d: 'M490,419 L510,419 L500,437 Z', fill: KENAR }, bl);
    const parmak = c.S('g', {}, bl);
    c.S('rect', { x: 300, y: 312, width: 110, height: 36, rx: 18, fill: GOVDE, stroke: KENAR, 'stroke-width': 3 }, parmak);
    yazi(c, bl, 345, 380, 'parmak', { size: 24, kalin: 600, renk: RENK.cizgi });
    const bo = c.S('g', {}, bl);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, d = [Math.sin(a), -Math.cos(a)];
      ok(c, bo, [500 + d[0] * 8, 330 + d[1] * 8], [500 + d[0] * 44, 330 + d[1] * 44], RENK.basinc, 4);
    }
    gizle(bl, bo);
    await belir(c, bl, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Tamamen su dolu, kapalı bir balonu parmağınla bir yerinden bastırıyorsun. Balonun içinde basınç artışı nasıl olur?',
      options: ['Yalnızca bastırdığın yerde kalır', 'Her noktaya eşit iletilir', 'Yalnızca balonun altında görülür'], answer: 1,
      hints: ['Kapalı kaptaki sıvıya uygulanan basınç yönünü seçmez.', '', 'Eşit olan basınçtaki artıştır.'],
      right: 'Evet. Basınç, balonun her noktasına eşit iletilir.',
    });
    c.clearSay();
    await par(c.say('Parmağın uyguladığı basınç, balonun her noktasına eşit iletilir.'), (async () => {
      await c.tween(500, (e) => parmak.setAttribute('transform', `translate(${12 * e} 0)`), ease.inOut);
      await belir(c, bo, 400);
    })());
  }

  /* ---- 3. Su cenderesi ---- */
  async function cenderesi(c) {
    const svg = c.svg(1000, 562);
    const cd = cendere(c, svg, { s: [180, 280], b: [520, 820], ust: 200 });
    const oS = basincOklari(c, svg, [180, 410], [280, 410], [230, 470], { n: 2 });
    const oB = basincOklari(c, svg, [520, 410], [820, 410], [670, 470], { n: 6 });
    const F = kuvvetOku(c, svg, { x: 230, y: 376, L: 50, etiket: 'F' });
    const G = kuvvetOku(c, svg, { x: 670, y: 376, L: 50, etiket: 'G' });
    const ayni = yazi(c, svg, 400, 340, 'aynı basınç', { size: 26, kalin: 700, renk: RENK.basinc });
    const formul = renkli(c, svg, 500, 110, [['F', RENK.kuvvet], ' = ', ['P', RENK.basinc], '·', ['A', RENK.alan]], { size: 38, kalin: 700 });
    const nk = nokta(c, svg, [[230, 425], [230, 455], [670, 455], [670, 425]]);
    gizle(cd.kap, cd.sivi, cd.alan, F.g, G.g, ayni, formul);

    await par(c.say('Su cenderesinde iki piston, bir boruyla birbirine bağlıdır.'), belir(c, cd.kap, 500));
    await par(c.say('Borunun içinde sıvı vardır.'), belir(c, cd.sivi, 600));
    await par(c.say('Küçük pistonu F kuvvetiyle bastırıyoruz.', { speak: 'Küçük pistonu fe kuvvetiyle bastırıyoruz.' }), belir(c, F.g, 400));
    await par(c.say('Bu kuvvet sıvının basıncını artırır.'), oS.ac(2, 400));
    await par(c.say('Pascal Yasası’na göre basınç sıvıyla büyük pistona da iletilir.'), nk.git(800));

    await c.choice({
      tag: 'Tahmin et', q: 'Büyük pistonun altındaki basınç, küçük pistonunkine göre nasıldır?',
      options: ['Daha büyüktür', 'Daha küçüktür', 'Aynıdır'], answer: 2,
      hints: ['Pascal Yasası’nda basınç her noktaya eşit iletilir.', 'İki piston aynı sıvıyla bağlı.', ''],
      right: 'Evet. Basınç her noktaya eşit iletilir.',
    });
    c.clearSay();
    await par(c.say('Büyük pistonda da küçük pistondakiyle aynı basınç oluşur.'), par(belir(c, nk.el, 300, 0), oB.ac(6, 600), belir(c, ayni, 600)));
    await par(c.say('Kuvvet, basınç ile yüzey alanının çarpımıdır: F = P·A.', { speak: '[thoughtful] Kuvvet, basınç ile yüzey alanının çarpımıdır: F eşittir P çarpı A.' }),
      par(parlat(c, [oS.g, oB.g], 400), belir(c, [cd.alan, formul], 400)));
    await par(c.say('Büyük pistonun alanı daha büyüktür; aynı basınçla daha büyük kuvvet doğar.'),
      c.tween(600, (e) => { G.g.style.opacity = Math.min(1, e * 3); G.ayarla(lerp(50, 150, e)); }, ease.out));
    await c.say('Böylece küçük bir kuvvetle büyük bir yük taşınır.');
    c.note('<b>Basınç sıvıyla her yöne eşit iletilir.</b><br>Örnek: su cenderesi.', 'Pascal Yasası', 'pascal');
  }

  /* ---- 4. Hidrolik lift ---- */
  async function lift(c) {
    const svg = c.svg(1000, 562);
    const cd = cendere(c, svg, { s: [180, 280], b: [520, 820], ust: 200 });
    const araba = c.S('g', {}, svg);
    const ks = { fill: 'none', stroke: KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round' };
    c.S('rect', Object.assign({ x: 580, y: 330, width: 160, height: 50, rx: 8 }, ks), araba);
    c.S('path', Object.assign({ d: 'M612,330 L632,300 L696,300 L716,330' }, ks), araba);
    [610, 710].forEach((x) => c.S('circle', { cx: x, cy: 362, r: 18, fill: ZEMIN, stroke: KENAR, 'stroke-width': 3 }, araba));
    const oS = basincOklari(c, svg, [180, 410], [280, 410], [230, 470], { n: 2 });
    const oB = basincOklari(c, svg, [520, 410], [820, 410], [670, 470], { n: 6 });
    const F1 = kuvvetOku(c, svg, { x: 230, y: 376, L: 50, etiket: 'F₁' });
    const F2 = kuvvetOku(c, svg, { x: 770, y: 376, L: 150, etiket: 'F₂', yukari: true });
    const nk = nokta(c, svg, [[230, 425], [230, 455], [670, 455], [670, 425]]);
    const yaz = (x, y, m, hiza) => yazi(c, svg, x, y, m, { hiza, size: 26, kalin: 700, renk: RENK.kuvvet });
    const kucuk = [yaz(160, 290, 'küçük', 'end'), yaz(160, 322, 'kuvvet', 'end')];
    const buyuk = [yaz(845, 290, 'büyük', 'start'), yaz(845, 322, 'yük', 'start')];
    gizle(cd.kap, cd.sivi, cd.alan, araba, F1.g, F2.g, ...kucuk, ...buyuk);

    await par(c.say('Hidrolik lift, tamirhanede arabaları kaldıran bir su cenderesidir.'), belir(c, [cd.kap, cd.sivi, cd.alan, araba], 500));
    await par(c.say('Küçük pistona uygulanan kuvvet bir basınç oluşturur.'), par(belir(c, F1.g, 400), oS.ac(2, 400)));
    await par(c.say('Bu basınç, sıvı tarafından büyük pistona aynen iletilir.'), (async () => {
      await nk.git(800);
      await par(belir(c, nk.el, 250, 0), oB.ac(6, 400));
    })());
    await par(c.say('Büyük pistonun kesit alanı daha büyüktür.'), c.tween(400, (e) => cd.l2.setAttribute('stroke-width', 6 + 6 * Math.sin(Math.PI * e)), ease.inOut));
    await par(c.say('Bu yüzden araba, büyük bir kuvvetle yukarı itilir.'), c.tween(600, (e) => { F2.g.style.opacity = Math.min(1, e * 3); F2.ayarla(lerp(20, 150, e)); }, ease.out));
    await par(c.say('Küçük kuvvetle büyük bir yük kaldırılır.'), belir(c, [...kucuk, ...buyuk], 400));
  }

  /* ---- 5. Hidrolik pres ---- */
  async function pres(c) {
    const svg = c.svg(1000, 562);
    const cd = cendere(c, svg, { s: [80, 150], b: [300, 510], ust: 240 });
    const ust = c.S('g', {}, svg);
    const plaka = c.S('rect', { x: 300, y: 280, width: 210, height: 20, fill: GOVDE, stroke: KENAR, 'stroke-width': 2 }, ust);
    c.S('rect', { x: 345, y: 300, width: 120, height: 80, rx: 3, fill: AHSAP, stroke: KENAR, 'stroke-width': 2 }, ust);
    const oS = basincOklari(c, svg, [80, 410], [150, 410], [115, 470], { n: 2 });
    const oB = basincOklari(c, svg, [300, 410], [580, 410], [440, 470], { n: 8 });
    const F = kuvvetOku(c, svg, { x: 115, y: 376, L: 50, etiket: 'F' });
    const G = kuvvetOku(c, svg, { x: 545, y: 360, L: 150, etiket: 'G', yukari: true });
    const tb = tablo(c, svg, { x: 660, y: 140, satir: 2, h: 56, size: 22, sutunlar: [{ ad: 'Alan', w: 100, renk: RENK.alan }, { ad: 'küçük', w: 80 }, { ad: 'büyük', w: 140 }] });
    tb.yaz(0, 0, 'Basınç', RENK.basinc); tb.yaz(0, 1, 'P', RENK.basinc); tb.yaz(0, 2, '?');
    tb.yaz(1, 0, 'Kuvvet', RENK.kuvvet); tb.yaz(1, 1, 'F', RENK.kuvvet); tb.yaz(1, 2, '?');
    gizle(cd.kap, cd.sivi, cd.alan, ust, F.g, G.g, tb.g);

    await par(c.say('Hidrolik pres de bir su cenderesidir.'), belir(c, [cd.kap, cd.sivi, cd.alan, ust], 500));
    await par(c.say('Küçük pistona uygulanan kuvvet, sıvıda basınç oluşturur.'), belir(c, F.g, 400));
    await par(c.say('Büyük piston, nesneyi plakaya doğru sıkıştırır.'), belir(c, G.g, 500));

    // Birlikte çöz: tablonun son iki satırı.
    c.clearSay();
    await par(c.say('Tabloda büyük pistonun değerleri eksik.'), (async () => { await belir(c, tb.g, 400); await par(tb.goster(0), tb.goster(1)); })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'Tablonun son iki satırını sen tamamla. Büyük pistonda basınç ve kuvvet, küçük pistona göre nasıldır?',
      options: ['Basınç daha büyük; kuvvet aynı', 'Basınç aynı; kuvvet daha büyük', 'Basınç da kuvvet de aynı'], answer: 1,
      hints: ['Pascal Yasası: basınç her noktaya eşit iletilir.', '', 'F = P·A: alan büyükse aynı basınç daha büyük kuvvet yapar.'],
      right: 'Evet. Basınç aynı, kuvvet daha büyük.',
    });
    c.clearSay();
    tb.yaz(0, 2, 'P', RENK.basinc); tb.yaz(1, 2, 'daha büyük', RENK.kuvvet);
    gizle(tb.satirlar[0].hucreler[2], tb.satirlar[1].hucreler[2]);
    await par(c.say('Büyük pistonda basınç aynı, kuvvet daha büyüktür.'),
      par(belir(c, [tb.satirlar[0].hucreler[2], tb.satirlar[1].hucreler[2]], 400), oS.ac(2, 400), oB.ac(6, 400)));

    // Sıra sende: daha geniş büyük piston.
    await c.choice({
      tag: 'Sıra sende', q: 'Ela, hidrolik presin büyük pistonunu daha geniş bir pistonla değiştiriyor; küçük pistona aynı kuvveti uyguluyor. Büyük pistondaki kuvvet nasıl değişir?',
      options: ['Azalır; yüzey büyüdü', 'Değişmez; basınç aynı', 'Artar; aynı basınç daha büyük yüzeye etki eder'], answer: 2,
      hints: ['Basınç aynı kalıyor, değişen yüzey alanı.', 'F = P·A.', ''],
      right: 'Evet. Aynı basınç daha büyük yüzeye etki eder.',
    });
    c.clearSay();
    await par(c.say('Yüzey büyüdü; aynı basınç daha büyük kuvvet doğurur.'), (async () => {
      await c.tween(600, (e) => {
        const x2 = lerp(510, 580, e);
        cd.genislik(x2); plaka.setAttribute('width', x2 - 300);
        G.ayarla(lerp(150, 200, e), x2 + 35);
      }, ease.inOut);
      await belir(c, oB.oklar.slice(6, 8).map((q) => q.g), 400);
    })());
  }

  /* ---- 6. Çevremizdeki sistemler ---- */
  function simge(c, g, tur, cx, y0) {
    const S = { fill: 'none', stroke: KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    const L = (a, b, d, e) => c.S('line', Object.assign({ x1: cx + a, y1: y0 + b, x2: cx + d, y2: y0 + e }, S), g);
    const R = (x, y, w, h, rx = 3) => c.S('rect', Object.assign({ x: cx + x, y: y0 + y, width: w, height: h, rx }, S), g);
    const C = (x, y, r) => c.S('circle', Object.assign({ cx: cx + x, cy: y0 + y, r }, S), g);
    const P = (pts) => c.S('path', Object.assign({ d: 'M' + pts.map(([x, y]) => `${cx + x},${y0 + y}`).join(' L') + ' Z' }, S), g);
    if (tur === 'pres') {
      R(-52, 16, 104, 12); L(-52, 28, -52, 86); L(52, 28, 52, 86); R(-58, 86, 116, 10);
      R(-24, 30, 48, 22); R(-36, 52, 72, 10); R(-9, 62, 18, 24);
    } else if (tur === 'kepce') {
      R(-55, 80, 80, 16, 8); R(-46, 54, 46, 26, 4); L(-8, 60, 20, 24); L(20, 24, 40, 54);
      P([[40, 54], [26, 66], [36, 76], [54, 66]]);
    } else if (tur === 'kamyon') {
      R(-56, 76, 112, 8, 2); R(-56, 52, 32, 24, 4); P([[-20, 74], [-20, 40], [40, 54], [52, 74]]);
      C(-38, 90, 8); C(14, 90, 8); C(40, 90, 8);
    } else if (tur === 'merdiven') {
      R(-56, 68, 112, 18, 3); R(-56, 50, 30, 18, 3); L(-18, 62, 46, 18); L(-10, 66, 54, 22);
      [0.2, 0.45, 0.7].forEach((t) => L(lerp(-18, 46, t), lerp(62, 18, t), lerp(-10, 54, t), lerp(66, 22, t)));
      C(-36, 92, 8); C(30, 92, 8);
    } else if (tur === 'yatak') {
      R(-56, 28, 10, 40, 2); R(-56, 50, 112, 14, 6); R(-42, 40, 26, 10, 5);
      L(-46, 64, -46, 84); L(46, 64, 46, 84); C(-46, 90, 6); C(46, 90, 6); L(0, 64, 0, 86); L(-20, 86, 20, 86);
    } else if (tur === 'koltuk') {
      R(-34, 18, 18, 44, 6); R(-36, 8, 22, 10, 4); R(-34, 56, 64, 14, 6); R(-6, 70, 12, 16, 2);
      L(-30, 92, 24, 92); L(30, 62, 44, 84); L(44, 84, 54, 84);
    }
  }

  async function cevremiz(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { tur: 'pres', ad: 'hidrolik pres' }, { tur: 'kepce', ad: 'kepçe' }, { tur: 'kamyon', ad: 'damperli kamyon' },
      { tur: 'merdiven', ad: 'itfaiye merdiveni' }, { tur: 'yatak', ad: 'hastane yatağı' }, { tur: 'koltuk', ad: 'berber koltuğu' },
    ];
    const kartlar = KART.map((k, i) => {
      const x = [60, 360, 660][i % 3], y = [110, 290][Math.floor(i / 3)];
      const g = c.S('g', {}, svg);
      kutu(c, g, x, y, 280, 150, { rx: 12 });
      simge(c, g, k.tur, x + 128, y + 14);
      yazi(c, g, x + 140, y + 138, k.ad, { size: 22, kalin: 600 });
      const zinc = c.S('g', {}, g);
      c.S('circle', { cx: x + 212, cy: y + 62, r: 5, fill: RENK.basinc }, zinc);
      ok(c, zinc, [x + 224, y + 62], [x + 258, y + 62], RENK.basinc, 3);
      c.S('circle', { cx: x + 268, cy: y + 62, r: 5, fill: RENK.basinc }, zinc);
      zinc.style.opacity = 0; g.style.opacity = 0;
      return { g, zinc };
    });
    const alt = c.S('g', {}, svg);
    cizgi(c, alt, [60, 470], [940, 470], RENK.ince, 2);
    yazi(c, alt, 300, 512, 'hidrolik kriko', { size: 24, kalin: 600 });
    yazi(c, alt, 700, 512, 'forklift', { size: 24, kalin: 600 });
    gizle(alt);
    const sirayla = async (idler) => { for (const i of idler) { belir(c, kartlar[i].g, 300); await c.wait(300); } await c.wait(200); };

    await par(c.say('Hidrolik kriko arabayı, forklift ağır yükleri kaldırır.'), belir(c, alt, 400));
    await par(c.say('Kepçe ve damperli kamyon da sıvı basıncıyla çalışır.'), sirayla([1, 2]));
    await par(c.say('Hidrolik pres, itfaiye merdiveni, hastane yatağı ve berber koltuğu da öyle.'), sirayla([0, 3, 4, 5]));
    await par(c.say('Hepsinde sıvı, bir uçtaki basıncı öbür uca taşır.'), belir(c, kartlar.map((k) => k.zinc), 400));
  }

  /* ---- 7. Kendin dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const KAD = [{ w: 100, n: 2, L: 50 }, { w: 150, n: 3, L: 75 }, { w: 200, n: 4, L: 100 }, { w: 300, n: 6, L: 150 }];
    const sahne = c.S('g', {}, svg);
    const cd = cendere(c, sahne, { s: [180, 280], b: [520, 620], ust: 200 });
    const oS = basincOklari(c, sahne, [180, 410], [280, 410], [230, 470], { n: 2 });
    const oB = basincOklari(c, sahne, [520, 410], [820, 410], [670, 470], { n: 6 });
    const F = kuvvetOku(c, sahne, { x: 230, y: 376, L: 50, etiket: 'F' });
    const G = kuvvetOku(c, sahne, { x: 570, y: 376, L: 50, etiket: 'G' });
    const nk = nokta(c, sahne, [[230, 425], [230, 455], [670, 455], [670, 425]]);
    const dur = { x2: 620, n: 2, L: 50 };
    oS.oklar.forEach((q) => { q.g.style.opacity = 1; });
    const uygula = () => {
      cd.genislik(dur.x2);
      oB.oklar.forEach((q, i) => { q.g.style.opacity = sinir(dur.n - i, 0, 1); });
      G.ayarla(dur.L, (520 + dur.x2) / 2);
    };
    const kur = (k) => { dur.x2 = 520 + KAD[k - 1].w; dur.n = KAD[k - 1].n; dur.L = KAD[k - 1].L; uygula(); };
    const git = (k, ms) => {
      const h = KAD[k - 1], b = Object.assign({}, dur);
      return c.tween(ms, (e) => { dur.x2 = lerp(b.x2, 520 + h.w, e); dur.n = lerp(b.n, h.n, e); dur.L = lerp(b.L, h.L, e); uygula(); }, ease.inOut);
    };
    kur(1);
    gizle(sahne);

    await par(c.say('Şimdi büyük pistonun alanını sen değiştir.'), belir(c, sahne, 450));
    await c.say('Küçük pistona uygulanan kuvvet aynı kalıyor.');
    const sl = c.slider({ label: 'büyük pistonun alanı', min: 1, max: 4, step: 1, value: 1, fmt: () => '', onInput: (v) => kur(+v) });
    c.say('Kaydırıcıyı oynatıp büyük pistondaki kuvveti izle.', { noWait: true });
    await c.choice({
      tag: 'Dene', q: 'Kaydırıcıyı büyüttükçe büyük pistondaki kuvvet nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['F = P·A.', sl.get() <= 1 ? 'İki piston eşit alanlıyken kuvvetler de eşit.' : 'Basınç aynı, yüzey alanı büyüyor.', ''],
      right: 'Evet. Basınç aynı kalır, alan büyüdükçe kuvvet artar.',
    });
    sl.remove(); c.clearSay();
    await par(c.say('Alanlar eşitken kuvvetler de eşittir.'), git(1, 500));
    await par(c.say('Büyük pistonun alanı büyüdükçe kuvvet artar.'), git(4, 800));
    await par(c.say('Sıvı, bir uçtaki bastırmayı öbür uca taşır.'), nk.git(800));
  }

  Ders.start({
    id: 'akiskanlar-b3', kicker: 'Konu B · Sıvılarda basınç', title: 'Sıvı basıncıyla çalışan sistemler', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Sıvı basıncıyla çalışan sistemler',
      hook: 'Oto tamircisi tek eliyle bir kola bastırıp koca bir arabayı nasıl kaldırır?',
      button: 'Derse başla ›',
    },
    goals: ['Pascal Yasası’nı söyler.', 'Su cenderesinde iki pistondaki basıncı ve kuvveti karşılaştırır.', 'Hidrolik sistemlerin küçük kuvvetle büyük yükü nasıl taşıdığını açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Sıvı basıncı ve basınç bağıntısı hakkında iki bilgiyi hatırla.', run: hatirla },
      { title: 'Basınç her yöne iletilir', goal: 'Kapalı kaptaki sıvıya uygulanan basıncın nasıl iletildiğini gör.', run: yonlerde },
      { title: 'Su cenderesi', goal: 'İki pistondaki basıncı ve kuvveti karşılaştır.', run: cenderesi },
      { title: 'Hidrolik lift', goal: 'Küçük kuvvetle büyük bir yükün nasıl kaldırıldığını açıkla.', run: lift },
      { title: 'Hidrolik pres', goal: 'Büyük pistondaki basıncı ve kuvveti bul.', run: pres },
      { title: 'Çevremizdeki sistemler', goal: 'Sıvı basıncıyla çalışan araçları tanı.', run: cevremiz },
      { title: 'Kendin dene', goal: 'Büyük pistonun alanı değişince kuvvetin nasıl değiştiğini bul.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi Pascal Yasası’dır?',
        options: ['Sıvı basıncı derinlikle artar', 'Kapalı kaptaki sıvıya uygulanan basınç, sıvının her noktasına eşit iletilir', 'Basınç, kuvvetin yüzey alanına bölümüdür'], answer: 1,
        why: ['Bu, derinlikle basıncın ilişkisidir; Pascal Yasası kapalı kapta basıncın iletilmesini anlatır.', 'Pascal Yasası, uygulanan basıncın sıvının her noktasına eşit iletildiğini söyler.', 'Bu, basıncın tanımıdır; Pascal Yasası değildir.'], scene: 1 },
      { q: 'Bir su cenderesi için hangisi doğrudur?',
        options: ['Basınç büyük pistonda daha büyüktür; kuvvet aynıdır', 'Basınç da kuvvet de iki pistonda aynıdır', 'Basınç iki pistonda aynıdır; kuvvet büyük pistonda daha büyüktür'], answer: 2,
        why: ['Basınç sıvıyla her noktaya eşit iletilir; büyük pistonda artmaz.', 'Basınç aynıdır ama alanlar farklı olduğundan kuvvetler farklıdır.', 'Aynı basınç daha büyük alana etki edince daha büyük kuvvet doğar.'], scene: 2 },
      { q: 'Ağzı sıkıca kapatılmış, tamamen su dolu bir plastik şişeyi bir yerinden sıkıyorsun. Şişenin içindeki basınç artışı için hangisi doğrudur?',
        options: ['Her noktaya eşit büyüklükte iletilir', 'Yalnızca sıktığın yerde kalır', 'Yalnızca kapakta görülür'], answer: 0,
        why: ['Kapalı kaptaki sıvıya uygulanan basınç her noktaya eşit iletilir.', 'Basınç sıkılan yerde kalmaz; sıvı onu her yöne taşır.', 'Basınç yalnızca kapakta toplanmaz; her noktada aynı artış olur.'], scene: 1 },
      { q: 'Bir hidrolik krikoda küçük pistona uygulanan kuvvetle araba kaldırılabiliyor. Neden?',
        options: ['Sıvı kuvveti kendiliğinden büyütür', 'Aynı basınç, alanı büyük olan pistonda daha büyük kuvvet oluşturur', 'Büyük pistondaki basınç küçük pistondakinden büyüktür'], answer: 1,
        why: ['Sıvı kuvveti büyütmez; basıncı iletir.', 'Basınç eşit iletilir; alan büyüdükçe aynı basıncın doğurduğu kuvvet de büyür.', 'İki pistonda basınç aynıdır; fark alandadır.'], scene: 3 },
      { q: 'Sıvılar için “sıkıştırılamaz kabul edilir” ne demektir?',
        options: ['Basınç altında hacimleri yarıya iner', 'Basınç altında hacimleri artar', 'Basınç altında hacimleri ihmal edilebilecek kadar az değişir'], answer: 2,
        why: ['Sıvıların hacmi basınç altında yarıya inmez; çok az değişir.', 'Basınç hacmi artırmaz; çok az azaltır.', 'Sıvının hacmi basınç altında neredeyse hiç değişmediği için sıkıştırılamaz kabul edilir.'], scene: 1 },
    ],
    summary: ['Kapalı kaptaki sıvıya uygulanan basınç, her noktaya eşit iletilir: Pascal Yasası.', 'Su cenderesinde iki pistonda basınç aynıdır; alanı büyük pistonda kuvvet büyüktür.', '<b>Sıvı, bir uçtaki bastırmayı öbür uca taşır.</b>'],
    nextLesson: { href: 'b4-merak-et-sor-dogrula.html', label: 'Sonraki: Merak et, sor, doğrula ›' },
  });
})();
