/* D3 — Kaldırma kuvveti nereden gelir?
   Sıvı cismin alt yüzeyine üst yüzeyinden daha büyük kuvvetle bastırır; kaldırma kuvveti bu farktır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md (D3). Konunun araç dosyası: d-araclar.js (kap).
   Silindir düzeneği (üstte F₁, altta F₂, yanlarda F₃ ve F₄, derinlikle uzayan basınç okları) bu dosyada yazıldı: duzen().
   Kap x 120-880, üst y 30, taban y 540, su yüzeyi y 60; derinlik ölçeği 1.000 birim = 1 m. Silindir 100 × 40 (x 450-550, h = 0,04 m).
   Sayılar örnek veridir: A = 0,01 m², su 1.000 kg/m³, g = 9,8 m/s²; F = h · d_s · g · A ile hesaplandı. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, sinifla } = window.KIT;
  const { kap } = window.KIT_D;
  const { lerp, ease } = Ders;
  const SOLUK = '#c3cbea', GOVDE = '#b7bfd6', GOVDE_KENAR = '#e4e9fb', DILIM = '#5b678f';
  const KESIK = { 'stroke-dasharray': '8 6' };

  /* ---- ortak yardımcılar ---- */

  /* Ucu oklu doğru parçası; ok başı boya göre küçülür (kısa okta üçgen kalmaz). ciz(P, Q): kök P, uç Q. */
  function oklu(c, p, renk, w = 6) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, [0, 0], [0, 0], renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P, Q) => {
      const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy);
      if (L < 3) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const ux = dx / L, uy = dy / L, hb = Math.min(16, Math.max(6, L * 0.5)), n = Math.max(hb * 0.5, w * 0.9);
      const B = [Q[0] - ux * hb, Q[1] - uy * hb];
      hat.setAttribute('x1', P[0]); hat.setAttribute('y1', P[1]); hat.setAttribute('x2', B[0] + ux); hat.setAttribute('y2', B[1] + uy);
      uc.setAttribute('d', `M${Q[0]},${Q[1]} L${B[0] - uy * n},${B[1] + ux * n} L${B[0] + uy * n},${B[1] - ux * n} Z`);
    };
    return { g, ciz };
  }
  /* Ok kökten uca doğru uzar. */
  const uzat = (c, o, P, Q, ms = 500) => {
    o.g.style.opacity = 1; o.ciz(P, P);
    return c.tween(ms, (e) => o.ciz(P, [lerp(P[0], Q[0], e), lerp(P[1], Q[1], e)]), ease.out);
  };
  /* Öğe(ler) iki kez yanıp söner. */
  const yanip = async (c, els, kez = 2) => {
    for (let i = 0; i < kez; i++) {
      await belir(c, els, 200, 0.2);
      await belir(c, els, 200, 1);
    }
  };
  /* Soru sürerken bir işaret yavaşça yanıp söner; bayrak.bitti olunca durur. */
  const yanSon = async (c, el, bayrak) => {
    try {
      while (!bayrak.bitti) {
        await c.tween(300, (e) => { if (!bayrak.bitti) el.style.opacity = 1 - 0.7 * e; }, ease.inOut);
        await c.tween(300, (e) => { if (!bayrak.bitti) el.style.opacity = 0.3 + 0.7 * e; }, ease.inOut);
      }
    } catch (err) { if (!(err instanceof Ders.Cancelled)) throw err; }
    el.style.opacity = 1;
  };
  /* Parçalı formül: parcalar = ['düz', ['parça', ad, renk], …]; 'V_{b}' gibi alt indisli parçalar desteklenir.
     Dönen: { t, ts }, ts[ad] parçanın <tspan> öğesi. */
  function formul(c, p, x, y, parcalar, o = {}) {
    const t = yazi(c, p, x, y, '', o); t.textContent = '';
    const ts = {}; let dyNext = false;
    parcalar.forEach((q) => {
      const [m, ad, renk] = Array.isArray(q) ? q : [q];
      const s = c.S('tspan', {}, t);
      if (dyNext) { s.setAttribute('dy', '-0.245em'); dyNext = false; }
      if (m.includes('_{')) { Ders.mathText(s, m); dyNext = /\}$/.test(m); } else s.textContent = m;
      if (renk) s.style.fill = renk;
      if (ad) ts[ad] = s;
    });
    return { t, ts };
  }
  const aralik = (s) => [s.getStartPositionOfChar(0).x, s.getEndPositionOfChar(s.getNumberOfChars() - 1).x];

  /* ---- silindir düzeneği ----
     duzen(c, p, { olcek, h1, h }) → { g, kap, duvar, duvarOk, govde, kT, kA, kSol, kSag, f1, f2, f3, f4, fk, ciz, git(h1, h, ms), T(), B() }
     olcek: birim/N (8 ya da 3). Basınç okları: kabın sol duvarında 0,1 · 0,2 · 0,3 · 0,4 m derinlikte, boy 1 birim = 20 Pa (49 · 98 · 147 · 196).
     f1 (üst yüzeye aşağı), f2 (alt yüzeye yukarı), fk (fark, mor, x = 600), f3 ve f4 (yan yüzeyler) kuvvet okları; F = 98 · derinlik (N). */
  function duzen(c, p, o = {}) {
    const olcek = o.olcek || 8;
    let h1 = o.h1 == null ? 0.1 : o.h1, h = o.h == null ? 0.04 : o.h, tok = 0;
    const g = c.S('g', {}, p);
    const k = kap(c, g, { x1: 120, x2: 880, ust: 30, taban: 540, yuzey: 60 });
    const duvar = c.S('g', {}, g), duvarOk = [];
    [[0.1, 49], [0.2, 98], [0.3, 147], [0.4, 196]].forEach(([dd, L]) => {
      const y = 60 + 1000 * dd, ok = oklu(c, duvar, RENK.basinc, 4);
      ok.ciz([122 + L, y], [122, y]); duvarOk.push({ ok, y, L });
    });
    const govde = c.S('rect', { x: 450, width: 100, rx: 3, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, g);
    const kTg = c.S('g', {}, g), kAg = c.S('g', {}, g), kSolg = c.S('g', {}, g), kSagg = c.S('g', {}, g);
    const kucuk = (grup, n) => Array.from({ length: n }, () => oklu(c, grup, RENK.basinc, 3));
    const kT = kucuk(kTg, 3), kA = kucuk(kAg, 3), kSol = kucuk(kSolg, 2), kSag = kucuk(kSagg, 2);
    const f1 = oklu(c, g, RENK.kuvvet), f2 = oklu(c, g, RENK.kuvvet), f3 = oklu(c, g, RENK.kuvvet), f4 = oklu(c, g, RENK.kuvvet);
    const fk = oklu(c, g, RENK.kaldirma);
    const izle = [];
    const ciz = () => {
      const T = 60 + 1000 * h1, B = T + 1000 * h, M = (T + B) / 2, n = (v) => Math.round(olcek * v);
      govde.setAttribute('y', T); govde.setAttribute('height', B - T);
      f1.ciz([500, T - n(98 * h1)], [500, T]); f2.ciz([500, B + n(98 * (h1 + h))], [500, B]);
      fk.ciz([600, B], [600, B - n(98 * h)]);
      f3.ciz([420, M], [450, M]); f4.ciz([580, M], [550, M]);
      [470, 500, 530].forEach((x, i) => { kT[i].ciz([x, T - 14], [x, T]); kA[i].ciz([x, B + 20], [x, B]); });
      [0.3, 0.7].forEach((q, i) => { const y = T + (B - T) * q; kSol[i].ciz([433, y], [450, y]); kSag[i].ciz([567, y], [550, y]); });
      izle.forEach((f) => f(T, B));
    };
    ciz();
    const git = (h1b, hb, ms = 700, eg = ease.inOut) => {
      const my = ++tok, a1 = h1, a2 = h;
      if (!ms) { h1 = h1b; h = hb; ciz(); return Promise.resolve(); }
      return c.tween(ms, (e) => { if (my === tok) { h1 = lerp(a1, h1b, e); h = lerp(a2, hb, e); ciz(); } }, eg);
    };
    return {
      g, kap: k, duvar, duvarOk, govde, kT: { g: kTg }, kA: { g: kAg }, kSol: { g: kSolg }, kSag: { g: kSagg },
      f1, f2, f3, f4, fk, ciz, git, izle, T: () => 60 + 1000 * h1, B: () => 60 + 1000 * (h1 + h),
    };
  }
  /* Düzenekte yalnızca istenen parçalar görünür kalır (öteki parçalar gizlenir). */
  const sade = (d, ...tutulacak) => {
    const hepsi = [d.duvar, d.kT.g, d.kA.g, d.kSol.g, d.kSag.g, d.f1.g, d.f2.g, d.f3.g, d.f4.g, d.fk.g];
    gizle(...hepsi.filter((e) => !tutulacak.includes(e)));
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    /* birinci soru: iki kapta altı dilimli cisim, ikisi ve altısı batık */
    const s1 = c.S('g', {}, svg);
    const kapCiz = (p, x1, x2) => {
      c.S('rect', { x: x1, y: 280, width: x2 - x1, height: 220, fill: RENK.sivi, 'fill-opacity': 0.35 }, p);
      cizgi(c, p, [x1, 280], [x2, 280], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
      c.S('path', { d: `M${x1},180 L${x1},500 L${x2},500 L${x2},180`, fill: 'none', stroke: SOLUK, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, p);
    };
    const govde6 = (p, cx, ust) => {
      c.S('rect', { x: cx - 35, y: ust, width: 70, height: 120, rx: 4, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, p);
      for (let k = 1; k < 6; k++) cizgi(c, p, [cx - 35, ust + 20 * k], [cx + 35, ust + 20 * k], DILIM, 2);
    };
    kapCiz(s1, 130, 430); kapCiz(s1, 570, 870);
    govde6(s1, 280, 200); govde6(s1, 720, 310);
    yazi(c, s1, 280, 536, '2 dilim batık', { size: 24, renk: SOLUK });
    yazi(c, s1, 720, 536, '6 dilim batık', { size: 24, renk: SOLUK });
    const okSol = oklu(c, svg, RENK.kaldirma), okSag = oklu(c, svg, RENK.kaldirma);
    okSol.ciz([212, 320], [212, 300]); okSag.ciz([652, 430], [652, 370]);
    const fkSol = yazi(c, svg, 198, 316, 'F_{k}', { hiza: 'end', size: 24, renk: RENK.kaldirma, math: true });
    const fkSag = yazi(c, svg, 638, 406, 'F_{k}', { hiza: 'end', size: 24, renk: RENK.kaldirma, math: true });
    gizle(s1, okSol.g, okSag.g, fkSol, fkSag);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Aynı sıvıda bir cismin batan hacmi üç katına çıkıyor. Kaldırma kuvveti nasıl değişir?',
      options: ['Aynı kalır', 'Üç katına çıkar', 'Üçte birine iner'], answer: 1,
      hints: ['F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g: batan hacim üç katına çıkarsa kaldırma kuvveti de üç katına çıkar.', '',
        'F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g: batan hacim üç katına çıkarsa kaldırma kuvveti de üç katına çıkar.'],
      right: 'Evet. Batan hacim arttıkça kaldırma kuvveti artar.',
    });
    c.clearSay();
    await par(c.say('Batan hacim üç katına çıkınca kaldırma kuvveti de üç katına çıktı.'), belir(c, [okSol.g, okSag.g, fkSol, fkSag], 450));
    c.clearSay();
    await belir(c, s1, 400, 0); s1.remove(); okSol.g.remove(); okSag.g.remove(); fkSol.remove(); fkSag.remove();

    /* ikinci soru: kapta iki derinlikte sarı oklar */
    const s2 = c.S('g', {}, svg);
    c.S('rect', { x: 250, y: 100, width: 500, height: 400, fill: RENK.sivi, 'fill-opacity': 0.35 }, s2);
    cizgi(c, s2, [250, 100], [750, 100], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    c.S('path', { d: 'M250,60 L250,500 L750,500 L750,60', fill: 'none', stroke: SOLUK, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, s2);
    const ok1 = oklu(c, s2, RENK.basinc, 4), ok2 = oklu(c, s2, RENK.basinc, 4);
    ok1.ciz([301, 210], [252, 210]); ok2.ciz([350, 320], [252, 320]);
    cizgi(c, s2, [560, 100], [560, 210], SOLUK, 2); cizgi(c, s2, [552, 210], [568, 210], SOLUK, 2);
    cizgi(c, s2, [640, 100], [640, 320], SOLUK, 2); cizgi(c, s2, [632, 320], [648, 320], SOLUK, 2);
    yazi(c, s2, 574, 164, 'h', { hiza: 'start', size: 26, renk: SOLUK });
    yazi(c, s2, 654, 218, '2h', { hiza: 'start', size: 26, renk: SOLUK });
    gizle(s2, ok2.g);
    await belir(c, s2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Durgun suda derinlik iki katına çıkıyor. Basınç nasıl değişir?',
      options: ['Yarıya iner', 'Aynı kalır', 'İki katına çıkar'], answer: 2,
      hints: ['P = h · d · g: derinlik iki katına çıkarsa basınç da iki katına çıkar.', 'P = h · d · g: derinlik iki katına çıkarsa basınç da iki katına çıkar.', ''],
      right: 'Evet. Derinlik arttıkça basınç artar.',
    });
    c.clearSay();
    await par(c.say('Derinlik iki katına çıkınca basınç da iki katına çıktı.'), belir(c, ok2.g, 450));
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove(); ok2.g.remove();
    const son = renkli(c, svg, 500, 292, [['basınç', RENK.basinc], ' → ', ['kaldırma kuvveti', RENK.kaldirma]], { size: 44, kalin: 700 });
    gizle(son);
    await par(c.say('Bugün kaldırma kuvvetinin sıvı basıncından nasıl doğduğuna bakacağız.'), belir(c, son, 450));
  }

  /* ---- 2. Sıvı cisme nasıl bastırır? ---- */
  async function sivi(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    d.duvarOk.forEach((w) => w.ok.ciz([122, w.y], [122, w.y]));
    const ust = cizgi(c, svg, [190, 160], [446, 160], SOLUK, 2, KESIK), alt = cizgi(c, svg, [190, 200], [446, 200], SOLUK, 2, KESIK);
    const ustY = yazi(c, svg, 192, 146, 'üst yüzey', { hiza: 'start', size: 22, renk: SOLUK });
    const altY = yazi(c, svg, 192, 228, 'alt yüzey', { hiza: 'start', size: 22, renk: SOLUK });
    const buyuk = yazi(c, svg, 568, 236, 'daha büyük', { hiza: 'start', size: 22, kalin: 700, renk: RENK.basinc });
    sade(d);
    gizle(d.kap.g, d.govde, ust, alt, ustY, altY, buyuk);
    d.kA.g.style.opacity = 0;

    await par(c.say('Sıvı, içindeki cismin her yüzeyine basınç uygular.'), (async () => {
      await belir(c, [d.kap.g, d.govde], 500);
      await par(belir(c, [d.kT.g, d.kSol.g, d.kSag.g], 400), belir(c, d.kA.g, 400, 0.5));
    })());
    d.duvar.style.opacity = 1;
    await par(c.say('Sıvının basıncı derinlikle artar: duvardaki oklar uzuyor.'), (async () => {
      for (const w of d.duvarOk) {
        c.tween(400, (e) => w.ok.ciz([122 + w.L * e, w.y], [122, w.y]), ease.out);
        await c.wait(200);
      }
      await c.wait(400);
    })());
    await par(c.say('Cismin alt yüzeyi, üst yüzeyinden daha derindedir.'), belir(c, [ust, alt, ustY, altY], 400));
    await par(c.say('Bu yüzden alt yüzeye daha büyük basınç etki eder.'), par(belir(c, d.kA.g, 600), belir(c, buyuk, 400)));
  }

  /* ---- 3. Üst yüzey ---- */
  async function ustYuzey(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    sade(d, d.duvar, d.f1.g); d.duvar.style.opacity = 0.35;
    gizle(d.f1.g);
    const taban = cizgi(c, svg, [452, 200], [548, 200], RENK.alan, 6);
    const A = yazi(c, svg, 438, 230, 'A', { hiza: 'end', size: 28, kalin: 700, renk: RENK.alan });
    const hc = c.S('g', {}, svg);
    cizgi(c, hc, [580, 160], [580, 200], SOLUK, 2); cizgi(c, hc, [572, 160], [588, 160], SOLUK, 2); cizgi(c, hc, [572, 200], [588, 200], SOLUK, 2);
    yazi(c, hc, 596, 188, 'h', { hiza: 'start', size: 26, renk: SOLUK });
    const h1c = c.S('g', {}, svg), h2c = c.S('g', {}, svg);
    cizgi(c, h1c, [420, 60], [420, 160], SOLUK, 2, KESIK);
    yazi(c, h1c, 432, 116, 'h₁', { hiza: 'start', size: 26, renk: SOLUK });
    cizgi(c, h2c, [400, 60], [400, 200], SOLUK, 2, KESIK);
    yazi(c, h2c, 388, 150, 'h₂', { hiza: 'end', size: 26, renk: SOLUK });
    gizle(taban, A, hc, h1c, h2c);

    await par(c.say('Silindirin taban alanı A, yüksekliği h olsun.'), belir(c, [taban, A, hc], 450));
    await par(c.say('Üst yüzey su yüzeyinin h₁ altında; alt yüzey h₂ altında.', { speak: 'Üst yüzey su yüzeyinin h bir altında; alt yüzey h iki altında.' }), belir(c, [h1c, h2c], 400));
    const fp = yazi(c, svg, 630, 120, 'F = P · A', { hiza: 'start', size: 28, kalin: 700 });
    gizle(fp);
    await par(c.say('Basınçtan kuvvete geçelim: F = P · A.', { speak: 'Basınçtan kuvvete geçelim: F eşittir P çarpı A.' }), belir(c, fp, 400));
    await par(c.say('Üst yüzeydeki basınç P₁ = h₁ · d<sub>s</sub> · g’dir.', { speak: 'Üst yüzeydeki basınç P bir eşittir h bir çarpı d s çarpı ge’dir.' }), (async () => {
      await belir(c, fp, 300, 0); fp.remove();
      const p1 = yazi(c, svg, 630, 120, 'P_{1} = h_{1} · d_{s} · g', { hiza: 'start', size: 28, kalin: 700, renk: RENK.basinc, math: true });
      gizle(p1); await belir(c, p1, 400);
    })());
    const f1f = yazi(c, svg, 630, 170, 'F_{1} = h_{1} · d_{s} · g · A', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet, math: true });
    const f1e = yazi(c, svg, 516, 112, 'F₁', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kuvvet });
    gizle(f1f, f1e);
    await par(c.say('F₁ = h₁ · d<sub>s</sub> · g · A; aşağı yönlü.', { speak: 'F bir eşittir h bir çarpı d s çarpı g çarpı A; aşağı yönlü.' }),
      par(belir(c, f1f, 400), (async () => { await uzat(c, d.f1, [500, 82], [500, 160], 500); await belir(c, f1e, 250); })()));
  }

  /* ---- 4. Alt yüzey ---- */
  async function altYuzey(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    sade(d, d.duvar, d.f1.g); d.duvar.style.opacity = 0.35;
    gizle(d.f2.g, d.fk.g);
    const h1c = c.S('g', {}, svg), h2c = c.S('g', {}, svg);
    cizgi(c, h1c, [420, 60], [420, 160], SOLUK, 2, KESIK);
    yazi(c, h1c, 432, 116, 'h₁', { hiza: 'start', size: 26, renk: SOLUK });
    cizgi(c, h2c, [400, 60], [400, 200], SOLUK, 2, KESIK);
    yazi(c, h2c, 388, 150, 'h₂', { hiza: 'end', size: 26, renk: SOLUK });
    yazi(c, svg, 630, 120, 'F_{1} = h_{1} · d_{s} · g · A', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet, math: true });
    const p2 = yazi(c, svg, 630, 250, 'P_{2} = h_{2} · d_{s} · g', { hiza: 'start', size: 28, kalin: 700, renk: RENK.basinc, math: true });
    gizle(p2);

    await par(c.say('Alt yüzeydeki basınç P₂ = h₂ · d<sub>s</sub> · g’dir.', { speak: 'Alt yüzeydeki basınç P iki eşittir h iki çarpı d s çarpı ge’dir.' }), belir(c, p2, 400));
    const f2f = yazi(c, svg, 630, 165, 'F_{2} = h_{2} · d_{s} · g · A', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet, math: true });
    gizle(f2f);
    await par(c.say('F₂ = h₂ · d<sub>s</sub> · g · A; yukarı yönlü.', { speak: 'F iki eşittir h iki çarpı d s çarpı g çarpı A; yukarı yönlü.' }), (async () => {
      await belir(c, p2, 300, 0); p2.remove();
      await par(belir(c, f2f, 400), uzat(c, d.f2, [500, 310], [500, 200], 500));
    })());
    await par(c.say('h₂, h₁’den büyüktür.', { speak: 'h iki, h bir’den büyüktür.' }), yanip(c, [h1c, h2c], 1));

    const kars = yazi(c, svg, 630, 245, 'F₂ ? F₁', { hiza: 'start', size: 30, kalin: 700, renk: RENK.kuvvet });
    const bayrak = { bitti: false }, yan = yanSon(c, kars, bayrak);
    await c.choice({
      tag: 'Sıra sende', q: 'F₂ ile F₁ nasıl karşılaştırılır?',
      options: ['F₂ daha büyüktür; alt yüzey daha derindedir', 'İkisi eşittir', 'F₁ daha büyüktür'], answer: 0,
      hints: ['', 'Alt yüzey, üst yüzeyden daha derinde.', 'Basınç derinlikle artar.'],
      right: 'Evet. Alt yüzey daha derinde, kuvvet daha büyük.',
    });
    bayrak.bitti = true; await yan;
    c.clearSay();
    kars.textContent = 'F₂ > F₁';
    await c.say('F₂, F₁’den büyüktür; bileşkeleri yukarı yönlüdür.', { speak: 'F iki, F bir’den büyüktür; bileşkeleri yukarı yönlüdür.' });
    const fkE = yazi(c, svg, 614, 202, 'F_{k}', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kaldirma, math: true });
    gizle(fkE);
    await par(c.say('Bu yukarı yönlü fark, kaldırma kuvvetidir.', { speak: '[short pause] Bu yukarı yönlü fark, kaldırma kuvvetidir.' }),
      (async () => { await uzat(c, d.fk, [600, 200], [600, 169], 500); await belir(c, fkE, 250); })());
  }

  /* ---- 5. Yan yüzeyler ---- */
  async function yan(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    sade(d, d.f1.g, d.f2.g);
    d.f1.g.style.opacity = 0.35; d.f2.g.style.opacity = 0.35;
    const seviye = cizgi(c, svg, [340, 180], [660, 180], SOLUK, 2, KESIK);
    gizle(seviye, d.kSol.g, d.kSag.g);

    await par(c.say('Aynı derinlikteki noktalarda basınç eşittir.'), belir(c, [seviye, d.kSol.g, d.kSag.g], 450));
    const f3e = yazi(c, svg, 410, 174, 'F₃', { hiza: 'end', size: 26, kalin: 700, renk: RENK.kuvvet });
    const f4e = yazi(c, svg, 590, 174, 'F₄', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kuvvet });
    gizle(f3e, f4e, d.f3.g, d.f4.g);
    await par(c.say('Silindirin sol ve sağ yüzeylerinde F₃ ve F₄ etki eder.', { speak: 'Silindirin sol ve sağ yüzeylerinde F üç ve F dört etki eder.' }), (async () => {
      await belir(c, [seviye, d.kSol.g, d.kSag.g], 300, 0);
      await par(uzat(c, d.f3, [420, 180], [450, 180], 400), uzat(c, d.f4, [580, 180], [550, 180], 400));
      await belir(c, [f3e, f4e], 250);
    })());
    await par(c.say('İkisi aynı derinliktedir: büyüklükleri eşit, yönleri zıttır.'), yanip(c, [d.f3.g, d.f4.g], 2));

    await c.choice({
      tag: 'Birlikte çöz', q: 'F₃ ve F₄’ün bileşkesi nedir?',
      options: ['Cismi sağa iter', 'Cismi yukarı iter', 'Sıfırdır; birbirini dengeler'], answer: 2,
      hints: ['Eşit büyüklükte ve zıt yönlü iki kuvvet birbirini götürür.', 'Yatay kuvvetler cismi yukarı itemez.', ''],
      right: 'Evet. Eşit ve zıt kuvvetlerin bileşkesi sıfırdır.',
    });
    c.clearSay();
    const deng = yazi(c, svg, 604, 226, 'dengelenir', { hiza: 'start', size: 22, kalin: 600, renk: SOLUK });
    gizle(deng);
    await par(c.say('Yan kuvvetler dengelenir; alt ve üst kuvvetler kalır.'),
      par(belir(c, [d.f3.g, d.f4.g, f3e, f4e], 600, 0.35), belir(c, [d.f1.g, d.f2.g], 600, 1), belir(c, deng, 400)));
  }

  /* ---- 6. Bileşke (sayılarla) ---- */
  async function bileske(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    sade(d);
    gizle(d.f1.g, d.f2.g, d.fk.g);
    const satir = (y, metin, renk, o = {}) => { const t = yazi(c, svg, o.x || 640, y, metin, { hiza: 'start', size: 26, kalin: 700, renk, math: !!o.math }); gizle(t); return t; };
    const rA = satir(96, 'A = 0,01 m²', RENK.alan), rH = satir(130, 'h = 0,04 m', RENK.yazi);
    const rP1 = satir(236, 'P₁ 980 Pa', RENK.basinc), rF1 = satir(272, 'F₁ 9,8 N', RENK.kuvvet);
    const rP2 = satir(334, 'P₂ 1.372 Pa', RENK.basinc), rF2 = satir(370, 'F₂ 13,72 N', RENK.kuvvet);
    const rFk = satir(204, 'F_{k} 3,92 N', RENK.kaldirma, { x: 614, math: true });

    await par(c.say('Ela’nın silindirinde A = 0,01 metrekare, h = 0,04 metre.', { speak: 'Ela’nın silindirinde A eşittir sıfır virgül sıfır bir metrekare, h eşittir sıfır virgül sıfır dört metre.' }), belir(c, [rA, rH], 300));
    await par(c.say('Üst yüzey 0,1 metre derinde: basınç 980 pascal.', { speak: 'Üst yüzey sıfır virgül bir metre derinde: basınç dokuz yüz seksen pascal.' }), belir(c, rP1, 300));
    await par(c.say('Su, üst yüzeyi 9,8 newtonluk kuvvetle aşağı itiyor.', { speak: 'Su, üst yüzeyi dokuz virgül sekiz newtonluk kuvvetle aşağı itiyor.' }), par(belir(c, rF1, 300), uzat(c, d.f1, [500, 82], [500, 160], 500)));
    await par(c.say('Alt yüzey 0,14 metre derinde: basınç 1.372 pascal.', { speak: 'Alt yüzey sıfır virgül on dört metre derinde: basınç bin üç yüz yetmiş iki pascal.' }), belir(c, rP2, 300));
    await par(c.say('Su, alt yüzeyi 13,72 newtonluk kuvvetle yukarı itiyor.', { speak: 'Su, alt yüzeyi on üç virgül yetmiş iki newtonluk kuvvetle yukarı itiyor.' }), par(belir(c, rF2, 300), uzat(c, d.f2, [500, 310], [500, 200], 500)));
    await par(c.say('Yukarı kuvvet aşağı kuvvetten büyüktür; fark kaldırma kuvvetidir.'), par(belir(c, rFk, 300), uzat(c, d.fk, [600, 200], [600, 169], 500)));
    const hesap = yazi(c, svg, 500, 470, 'F_{k} = F₂ − F₁ = 13,72 − 9,8 = 3,92 N', { size: 28, kalin: 700, renk: RENK.kaldirma, math: true });
    gizle(hesap);
    await par(c.say('F<sub>k</sub> = F₂ − F₁ = 13,72 − 9,8 = 3,92 newton.', { speak: 'F k eşittir F iki eksi F bir eşittir on üç virgül yetmiş iki eksi dokuz virgül sekiz eşittir üç virgül doksan iki newton.' }), (async () => {
      await belir(c, [rA, rH, rP1, rP2], 300, 0); [rA, rH, rP1, rP2].forEach((t) => t.remove());
      await belir(c, hesap, 400);
    })());
    const rV = satir(96, 'V_{b} = 0,0004 m³', RENK.yazi, { math: true });
    await par(c.say('Hacim 0,0004 metreküp; ilk deneydeki sonuçla aynı.', { speak: 'Hacim sıfır virgül sıfır sıfır sıfır dört metreküp; ilk deneydeki sonuçla aynı.' }), belir(c, rV, 400));
  }

  /* ---- 7. Modele ulaşmak ---- */
  async function model(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg);
    sade(d, d.f1.g, d.f2.g, d.fk.g);
    /* silindir ve oklar tek grupta sola alınır; kap soluklaşıp kaybolur */
    const cg = c.S('g', {}, svg);
    const su = c.S('rect', { x: 60, y: 90, width: 320, height: 400, fill: RENK.sivi, 'fill-opacity': 0.35 }, svg);
    gizle(su); svg.insertBefore(su, cg);
    cg.appendChild(d.govde); [d.f1.g, d.f2.g, d.fk.g].forEach((e) => cg.appendChild(e));
    const koy = (e) => cg.setAttribute('transform', `translate(${lerp(0, -80, e)},${lerp(0, 130, e)}) scale(${lerp(1, 0.6, e)})`);
    const sat = (y, metin, renk, size = 30, math = true) => { const t = yazi(c, svg, 420, y, metin, { hiza: 'start', size, kalin: 700, renk, math }); gizle(t); return t; };
    const kaybol = async (...ts) => { await belir(c, ts, 300, 0); ts.forEach((t) => t.remove()); };
    /* ölçek: önce sahne tam boyda, sonra 0,6 ve sola */
    await c.wait(300);
    const a = sat(150, 'F_{k} = F₂ − F₁', RENK.kaldirma);
    await par(c.say('Kaldırma kuvveti, F₂ ile F₁ arasındaki farktır.', { speak: 'Kaldırma kuvveti, F iki ile F bir arasındaki farktır.' }),
      par(c.tween(400, (e) => { koy(e); d.kap.g.style.opacity = 1 - e; }, ease.inOut), belir(c, su, 400), belir(c, a, 400)));
    d.kap.g.remove(); d.duvar.remove();
    await c.say('Değerleri yerine koyalım.');
    const b = sat(150, 'F_{k} = (h_{2} − h_{1}) · d_{s} · g · A', RENK.yazi);
    await par(c.say('F<sub>k</sub> = (h₂ − h₁) · d<sub>s</sub> · g · A', { speak: 'F k eşittir, h iki eksi h bir farkı, çarpı d s çarpı g çarpı A.' }), (async () => { await kaybol(a); await belir(c, b, 400); })());
    const cc = sat(230, 'h = h_{2} − h_{1}', RENK.yazi);
    await par(c.say('h₂ − h₁ farkı, silindirin yüksekliği h’dir.', { speak: 'h iki eksi h bir farkı, silindirin yüksekliği he’dir.' }), belir(c, cc, 400));
    const dd = sat(150, 'F_{k} = h · d_{s} · g · A', RENK.yazi);
    await par(c.say('Böylece F<sub>k</sub> = h · d<sub>s</sub> · g · A olur.', { speak: 'Böylece F k eşittir h çarpı d s çarpı g çarpı A olur.' }), (async () => { await kaybol(b, cc); await belir(c, dd, 400); })());
    const ee = sat(230, 'V_{b} = h · A', RENK.yazi);
    await par(c.say('h · A çarpımı, cismin batan hacmi V<sub>b</sub>’dir.', { speak: 'h çarpı A çarpımı, cismin batan hacmi V b’dir.' }), belir(c, ee, 400));
    const ff = sat(230, 'F_{k} = V_{b} · d_{s} · g', RENK.kaldirma, 40);
    const cerceve = c.S('rect', { x: 408, y: 192, width: 380, height: 58, rx: 10, fill: 'none', stroke: RENK.kaldirma, 'stroke-width': 3 }, svg);
    gizle(cerceve);
    await par(c.say('Sonuç: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g.', { speak: '[thoughtful] Sonuç: F k eşittir V b çarpı d s çarpı g.' }), (async () => { await kaybol(ee); await par(belir(c, ff, 600), belir(c, cerceve, 600)); })());
    const ayni = yazi(c, svg, 600, 310, 'aynı model', { size: 24, kalin: 600, renk: SOLUK });
    gizle(ayni);
    await par(c.say('Aynı model, taşan suyun ağırlığından da çıkmıştı.'), belir(c, ayni, 400));
  }

  /* ---- 8. Derinlik ---- */
  async function derinlik(c) {
    const svg = c.svg(1000, 562);
    const d = duzen(c, svg, { olcek: 3 });
    sade(d, d.f1.g, d.f2.g, d.fk.g);
    /* derinlik etiketi silindirle birlikte iner */
    const hl = yazi(c, svg, 436, 0, 'h_{1} = 0,2 m', { hiza: 'end', size: 24, kalin: 600, renk: SOLUK, math: true });
    d.izle.push((T, B) => hl.setAttribute('y', (T + B) / 2 + 8));
    d.ciz(); gizle(hl);
    const satir = (y, metin, renk) => { const t = yazi(c, svg, 640, y, metin, { hiza: 'start', size: 26, kalin: 700, renk }); gizle(t); return t; };
    const [r1, r2, r3] = [satir(170, 'F₁ 19,6 N', RENK.kuvvet), satir(216, 'F₂ 23,52 N', RENK.kuvvet), satir(262, 'F₂ − F₁ = 3,92 N', RENK.kaldirma)];

    await par(c.say('Silindiri 0,2 metre derine indiriyoruz: F₁ ve F₂ ikisi de büyür.', { speak: 'Silindiri sıfır virgül iki metre derine indiriyoruz: F bir ve F iki ikisi de büyür.' }), par(d.git(0.2, 0.04, 700), belir(c, hl, 400)));
    await par(c.say('F₁ = 19,6 newton; F₂ = 23,52 newton oldu.', { speak: 'F bir eşittir on dokuz virgül altı newton; F iki eşittir yirmi üç virgül elli iki newton oldu.' }), belir(c, [r1, r2], 300));
    await par(c.say('Fark yine 3,92 newton: 23,52 eksi 19,6.', { speak: '[curious] Fark yine üç virgül doksan iki newton: yirmi üç virgül elli iki eksi on dokuz virgül altı.' }), belir(c, r3, 300));
    r1.textContent = 'F₁ 29,4 N'; r2.textContent = 'F₂ 33,32 N';
    await par(c.say('0,3 metrede F₁ 29,4, F₂ 33,32 newton; fark yine 3,92.', { speak: 'Sıfır virgül üç metrede F bir yirmi dokuz virgül dört, F iki otuz üç virgül otuz iki newton; fark yine üç virgül doksan iki.' }), (async () => {
      await belir(c, [r1, r2, r3, hl], 250, 0);
      hl.textContent = ''; Ders.mathText(hl, 'h_{1} = 0,3 m');
      await d.git(0.3, 0.04, 700);
      await belir(c, [r1, r2, r3, hl], 300);
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'Silindir daha derine indirilirse F₂ ile F₁ arasındaki fark ne olur?',
      options: ['Artar', 'Değişmez', 'Azalır'], answer: 1,
      hints: ['Her iki kuvvet de aynı miktar büyüyor.', '', 'Farkı hesapladığımız satırlara bak: hep 3,92 newton.'],
      right: 'Evet. İki kuvvet büyür ama farkları aynı kalır.',
    });
    c.clearSay();
    await par(c.say('Derinlik arttıkça iki kuvvet büyür, ama farkları değişmez.'), yanip(c, [d.fk.g, r3], 2));
    await c.say('Bu yüzden tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.');
  }

  /* ---- 9. İki model yan yana ---- */
  async function ikiModel(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    kutu(c, sol, 80, 140, 390, 140, { rx: 12 }); kutu(c, sag, 530, 140, 390, 140, { rx: 12 });
    yazi(c, sol, 275, 188, 'Sıvı basıncı', { size: 32, kalin: 700, renk: RENK.basinc });
    yazi(c, sag, 725, 188, 'Kaldırma kuvveti', { size: 32, kalin: 700, renk: RENK.kaldirma });
    const FS = formul(c, sol, 275, 252, ['P = ', ['h', 'h'], ' · ', ['d', 'd'], ' · ', ['g', 'g']], { size: 44, kalin: 700, renk: RENK.basinc });
    const FK = formul(c, sag, 725, 252, ['F_{k} = ', ['V_{b}', 'V'], ' · ', ['d_{s}', 'd'], ' · ', ['g', 'g']], { size: 44, kalin: 700, renk: RENK.kaldirma });
    gizle(sol, sag);

    await par(c.say('Sıvı basıncının modeli: P = h · d · g.', { speak: 'Sıvı basıncının modeli: P eşittir h çarpı d çarpı g.' }), belir(c, sol, 500));
    await par(c.say('Kaldırma kuvvetinin modeli: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g.', { speak: 'Kaldırma kuvvetinin modeli: F k eşittir V b çarpı d s çarpı g.' }), belir(c, sag, 500));

    /* d ve g: mavi arka şerit, mavi harf ve köprü çizgisi */
    const orta = (s) => { const [a, b] = aralik(s); return [a, b, (a + b) / 2]; };
    const [dl1, dl2, dlm] = orta(FS.ts.d), [dr1, dr2, drm] = orta(FK.ts.d);
    const [gl1, gl2, glm] = orta(FS.ts.g), [gr1, gr2, grm] = orta(FK.ts.g);
    const serit = (p, x1, x2) => c.S('rect', { x: x1 - 5, y: 210, width: x2 - x1 + 10, height: 56, rx: 10, fill: RENK.sivi, 'fill-opacity': 0 }, p);
    const sD1 = serit(sol, dl1, dl2), sD2 = serit(sag, dr1, dr2), sG1 = serit(sol, gl1, gl2), sG2 = serit(sag, gr1, gr2);
    const kopru = (xa, xb, y) => c.S('path', { d: `M${xa},284 V${y} H${xb} V284`, fill: 'none', stroke: RENK.sivi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, svg);
    const kD = kopru(dlm, drm, 320), kG = kopru(glm, grm, 360);
    gizle(kD, kG);
    const seritAc = (e) => [sD1, sD2, sG1, sG2].forEach((s) => s.setAttribute('fill-opacity', 0.22 * e));
    await par(c.say('İkisinde de sıvının yoğunluğu ve yer çekimi ivmesi var.'), (async () => {
      [FS.ts.d, FS.ts.g, FK.ts.d, FK.ts.g].forEach((s) => { s.style.fill = RENK.sivi; });
      await par(c.tween(400, seritAc, ease.out), belir(c, [kD, kG], 400));
    })());
    const cs = (p, x1, x2, renk) => c.S('rect', { x: x1 - 5, y: 210, width: x2 - x1 + 10, height: 56, rx: 10, fill: 'none', stroke: renk, 'stroke-width': 3 }, p);
    const [hh1, hh2] = aralik(FS.ts.h), [vv1, vv2] = aralik(FK.ts.V);
    const cH = cs(sol, hh1, hh2, RENK.basinc), cV = cs(sag, vv1, vv2, RENK.kaldirma);
    gizle(cH, cV);
    await par(c.say('Basınçta derinlik h, kaldırma kuvvetinde batan hacim V<sub>b</sub> var.', { speak: 'Basınçta derinlik h, kaldırma kuvvetinde batan hacim V b var.' }), belir(c, [cH, cV], 400));
    await par(c.say('Sıvının yoğunluğu iki katına çıkarsa ikisi de iki katına çıkar.'), yanip(c, [kD, kG, sD1, sD2, sG1, sG2], 2));
    await c.say('Çünkü kaldırma kuvveti, sıvı basıncından doğar.');

    await c.choice({
      tag: 'Sıra sende', q: 'Sıvının yoğunluğu yarıya iniyor. Aynı derinlikteki basınç ve aynı cisme etki eden kaldırma kuvveti nasıl değişir?',
      options: ['İkisi de aynı kalır', 'İkisi de yarıya iner', 'Basınç yarıya iner, kaldırma kuvveti aynı kalır'], answer: 1,
      hints: ['Yoğunluk iki modelin de içinde.', '', 'Yoğunluk yarıya inince iki model de yarıya iner.'],
      right: 'Evet. Yoğunluk iki modelde de çarpan.',
    });
    c.clearSay();
    const yari = yazi(c, svg, 500, 430, 'ikisi de ÷ 2', { size: 40, kalin: 700, renk: RENK.sivi });
    gizle(yari);
    await par(c.say('Yoğunluk yarıya inince ikisi de yarıya iner.'), (async () => {
      await belir(c, [kD, kG, cH, cV], 300, 0); [kD, kG, cH, cV, sD1, sD2, sG1, sG2].forEach((e) => e.remove());
      await belir(c, yari, 400);
    })());
    c.note('<b>F<sub>k</sub> = F₂ − F₁</b>; alt yüzeyde basınç büyüktür.', 'Kaldırma kuvveti ve basınç', 'd3-kaldirma-basinc');
  }

  /* ---- 10. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const d = duzen(c, g1, { olcek: 3 });
    sade(d, d.f1.g, d.f2.g, d.fk.g);
    const H1 = [0.1, 0.2, 0.3], HH = [0.02, 0.04, 0.06];
    const H1A = ['0,1 m', '0,2 m', '0,3 m'], HA = ['0,02 m', '0,04 m', '0,06 m'];
    const F1S = ['9,8', '19,6', '29,4'], FKS = ['1,96', '3,92', '5,88'];
    const F2S = [['11,76', '13,72', '15,68'], ['21,56', '23,52', '25,48'], ['31,36', '33,32', '35,28']];
    const e1 = yazi(c, g1, 640, 350, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet });
    const e2 = yazi(c, g1, 640, 395, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet });
    const e3 = yazi(c, g1, 640, 440, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kaldirma });
    let i1 = 0, ij = 1, hazir = false;
    const denendi = { derinlik: false, yukseklik: false };
    const guncelle = (ms) => {
      d.git(H1[i1], HH[ij], ms);
      e1.textContent = 'F₁ = ' + F1S[i1] + ' N'; e2.textContent = 'F₂ = ' + F2S[i1][ij] + ' N'; e3.textContent = 'F₂ − F₁ = ' + FKS[ij] + ' N';
    };
    const GERI_D = 'F₁ ve F₂ değişti, farkları değişmedi.', GERI_H = 'Fark değişti: yükseklik arttıkça kaldırma kuvveti arttı.';
    const SPEAK_D = 'F bir ve F iki değişti, farkları değişmedi.';
    guncelle(0);
    await c.say('F₂ − F₁ farkını değiştiren kaydırıcıyı bul.', { noWait: true, speak: 'F iki eksi F bir farkını değiştiren kaydırıcıyı bul.' });
    const sl1 = c.slider({ label: 'h₁ (derinlik)', min: 0, max: 2, step: 1, value: 0, fmt: (v) => H1A[+v], onInput: (v) => {
      i1 = +v; guncelle(300);
      if (hazir) { denendi.derinlik = true; c.say(GERI_D, { noWait: true }); }
    } });
    const sl2 = c.slider({ label: 'h (silindirin yüksekliği)', min: 0, max: 2, step: 1, value: 1, fmt: (v) => HA[+v], onInput: (v) => {
      ij = +v; guncelle(300);
      if (hazir) { denendi.yukseklik = true; c.say(GERI_H, { noWait: true }); }
    } });
    hazir = true;
    await c.cont('Devam ›');
    sl1.remove(); sl2.remove(); c.clearSay();
    if (!denendi.derinlik) {
      i1 = 2; await par(c.say(GERI_D, { speak: SPEAK_D }), (async () => { guncelle(700); await c.wait(300); })());
    }
    if (!denendi.yukseklik) {
      ij = 2; await par(c.say(GERI_H), (async () => { guncelle(700); await c.wait(300); })());
    }
    await c.say('Kaldırma kuvveti silindirin yüksekliğine, yani batan hacmine bağlı; derinliğe bağlı değil.');
    c.clearSay();

    /* Dene 2: önermeler */
    g1.remove();
    const g2 = c.S('g', {}, svg);
    const d2 = duzen(c, g2, { olcek: 3 });
    sade(d2);
    const goster = (...e) => { sade(d2, ...e); belir(c, e, 350); };
    const KARTLAR = [
      { metin: 'Alt yüzeydeki basınç, üst yüzeydeki basınçtan büyüktür.', kutu: 0, neden: 'Evet. Alt yüzey daha derinde.', sec: () => goster(d2.kT.g, d2.kA.g) },
      { metin: 'Kaldırma kuvveti, alt ve üst yüzeylere etki eden kuvvetlerin farkından doğar.', kutu: 0, neden: 'Evet. F<sub>k</sub> = F₂ − F₁.', sec: () => goster(d2.f1.g, d2.f2.g, d2.fk.g) },
      { metin: 'Yan yüzeylere etki eden kuvvetler cismi yukarı iter.', kutu: 1, neden: 'Yan kuvvetler eşit ve zıt: dengelenir.', sec: () => goster(d2.f3.g, d2.f4.g) },
      { metin: 'Cisim derine inince alt ve üst kuvvetlerin farkı artar.', kutu: 1, neden: 'Fark aynı kalır: h₂ − h₁ = h.', sec: () => { d2.git(0.1, 0.04, 0); goster(d2.f1.g, d2.f2.g, d2.fk.g); }, yer: () => d2.git(0.3, 0.04, 700) },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: ['Doğru', 'Yanlış'],
      kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Silindirin alt ve üst yüzeyine etki eden kuvvetlere bak.' }, k)),
      soru: (k) => `Önerme: ${k.metin}<br>Doğru mu, yanlış mı?`,
      sec: (_, k) => k.sec(), yerlestir: (_, k) => (k.yer ? k.yer() : c.wait(200)),
    });
    sade(d2, d2.f1.g, d2.f2.g, d2.fk.g);
    d2.git(0.1, 0.04, 0);
    await c.say('Sıvı alttan daha çok bastırır; kaldırma kuvveti bu farktır.');
  }

  Ders.start({
    id: 'akiskanlar-d3', kicker: 'Konu D · Kaldırma kuvveti', title: 'Kaldırma kuvveti nereden gelir?', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Kaldırma kuvveti nereden gelir?',
      hook: 'Suya batırdığın topu alttan yukarı iten şey nedir?',
      button: 'Derse başla ›',
    },
    goals: ['Sıvının cismin alt yüzeyine üst yüzeyinden daha büyük kuvvet uyguladığını söyler.', 'Yan yüzeylerdeki kuvvetlerin dengelendiğini açıklar.', 'Kaldırma kuvvetinin alt ve üst kuvvetlerin farkı olduğunu ve derinliğe bağlı olmadığını gösterir.'],
    scenes: [
      { title: 'Hatırla', goal: 'Batan hacmin ve derinliğin ne yaptığını hatırla.', run: hatirla },
      { title: 'Sıvı cisme nasıl bastırır?', goal: 'Sıvının cismin her yüzeyine basınç uyguladığını gör.', run: sivi },
      { title: 'Üst yüzey', goal: 'Üst yüzeye etki eden kuvveti yaz.', run: ustYuzey },
      { title: 'Alt yüzey', goal: 'Alt yüzeye etki eden kuvveti yaz ve üstündekiyle karşılaştır.', run: altYuzey },
      { title: 'Yan yüzeyler', goal: 'Yan yüzeylerdeki kuvvetlerin bileşkesini bul.', run: yan },
      { title: 'Bileşke (sayılarla)', goal: 'Alt ve üst kuvvetlerin farkını sayılarla gör.', run: bileske },
      { title: 'Modele ulaşmak', goal: 'Kuvvetlerin farkından kaldırma kuvvetinin modelini çıkar.', run: model },
      { title: 'Derinlik', goal: 'Cisim derine inince kuvvetlerin farkının nasıl değiştiğini bul.', run: derinlik },
      { title: 'İki model yan yana', goal: 'Sıvı basıncı ile kaldırma kuvvetinin modellerini karşılaştır.', run: ikiModel },
      { title: 'Dene', goal: 'Derinliği ve yüksekliği değiştir, önermeleri sına.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Sıvıdaki bir cismin alt yüzeyine etki eden kuvvet 12 N, üst yüzeyine etki eden kuvvet 9 N. Kaldırma kuvveti kaç N’dur?',
        options: ['21 N', '3 N', '9 N'], answer: 1,
        why: ['Kuvvetler toplanmaz; kaldırma kuvveti aralarındaki farktır.', 'F<sub>k</sub> = F₂ − F₁ = 12 − 9 = 3 N.', 'Bu, yalnızca üst yüzeye etki eden kuvvettir.'], scene: 6 },
      { q: 'Sıvıdaki bir cismin yan yüzeylerine etki eden kuvvetler için hangisi doğrudur?',
        options: ['Cismi yukarı iter', 'Cismi aşağı çeker', 'Eşit ve zıt yönlüdür; birbirini dengeler'], answer: 2,
        why: ['Yan kuvvetler yataydır; cismi yukarı itemez.', 'Yatay kuvvetler cismi aşağı çekemez.', 'Aynı derinlikte basınç eşittir; kuvvetler eşit ve zıttır.'], scene: 4 },
      { q: 'Tamamen batmış bir cisim daha derine indiriliyor. Alt ve üst yüzeylere etki eden kuvvetler nasıl değişir?',
        options: ['İkisi de artar; farkları değişmez', 'İkisi de artar; fark da artar', 'İkisi de değişmez'], answer: 0,
        why: ['İki kuvvet aynı miktar artar; fark yine h · d<sub>s</sub> · g · A olarak kalır.', 'Fark silindirin yüksekliğine bağlıdır; derinlikle artmaz.', 'Derinlik arttıkça basınç, dolayısıyla kuvvet artar.'], scene: 7 },
      { q: 'Aynı silindir önce suya, sonra yoğunluğu suyun iki katı olan bir sıvıya tamamen batırılıyor. Alt ve üst yüzeydeki kuvvetlerin farkı nasıl değişir?',
        options: ['Aynı kalır', 'İki katına çıkar', 'Yarıya iner'], answer: 1,
        why: ['F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g: yoğunluk değişince fark da değişir.', 'Fark yoğunlukla orantılıdır; yoğunluk iki katına çıkınca fark da iki katına çıkar.', 'Yoğunluk arttı; fark azalmaz.'], scene: 8 },
      { q: 'Kaldırma kuvvetinin yönü yukarıdır. Bunun nedeni hangisidir?',
        options: ['Üst yüzeyin alanı daha geniştir', 'Yan yüzeylerdeki kuvvet daha büyüktür', 'Alt yüzeydeki basınç daha büyüktür'], answer: 2,
        why: ['Silindirin iki yüzeyinin alanı da A’dır.', 'Yan kuvvetler birbirini dengeler; yukarı yönü belirlemez.', 'Alt yüzey daha derindedir; orada kuvvet daha büyük ve yukarı yönlüdür.'], scene: 3 },
    ],
    summary: ['Sıvı alt yüzeye üst yüzeyden daha büyük kuvvetle bastırır.', 'Yan yüzeylerdeki kuvvetler dengelenir; kaldırma kuvveti alt ve üst kuvvetlerin farkıdır: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g.', '<b>Sıvı alttan daha çok bastırır; kaldırma kuvveti bu farktır.</b>'],
    nextLesson: { href: 'd4-gemi-denizalti-cop-adasi.html', label: 'Sonraki: Gemi, denizaltı, çöp adası ›' },
  });
})();
