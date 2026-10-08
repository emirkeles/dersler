/* B1 — Küme dili
   Açılış kancası müzik uygulamasındaki "Beğendiklerim" listesi; ardından bütün örnekler sayı kümeleridir
   (program: "elemanları sayılar olan küme örnekleri üzerinde").
   Renk rolleri: amber = A · gökmavisi = alt küme / kural · lila = evrensel küme
   mint = içinde / doğru · koral = dışında / yanlış.
   Çizim araçları dersler/02-araliklar-ve-kume-sembolleri.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).b1 = (K) => {
  'use strict';
  const { S, h, ease, lerp, T, R, G, at, setOp, canvas, dnd, par, fadeTo, until, M_, COL } = K;

  const SARKI = ['Deniz', 'Gece', 'Yol', 'Rüzgâr', 'Kış'];
  const HEART = 'M0 5 C-9 -6 -19 3 -10 12 L0 22 L10 12 C19 3 9 -6 0 5 Z';

  /* eleman topu: merkezi (x,y) olan daire içinde sayı */
  function top(parent, x, y, txt, o = {}) {
    const g = G(parent);
    const ci = S('circle', { r: o.r || 34, fill: '#1b2554', stroke: o.col || COL.axis2, 'stroke-width': 3 }, g);
    T(g, 0, (o.s || 32) * 0.35, txt, { s: o.s || 32, w: 700 });
    const k = { g, ci, x, y };
    k.col = (col) => ci.setAttribute('stroke', col);
    at(g, x, y);
    return k;
  }
  /* küme kutusu: çerçeve + sol üstte etiket */
  function kutu(parent, x, y, w, hh, col, etiket, o = {}) {
    const g = G(parent);
    const rect = R(g, x, y, w, hh, { rx: 22, fill: o.fill || 'rgba(255,255,255,.03)', stroke: col, 'stroke-width': 3 });
    if (o.dash) rect.setAttribute('stroke-dasharray', '10 8');
    const lb = etiket ? T(g, x + 6, y - 12, etiket, { a: 'start', s: o.s || 24, f: col, w: 700 }) : null;
    return { g, rect, lb };
  }
  const pulse = (c, el, x, y, ms) => c.tween(ms || 420, (e) => at(el, x, y, 1 + 0.35 * Math.sin(e * Math.PI)));
  const gizle = (...els) => els.forEach((e) => setOp(e, 0));

  const SC = [];

  /* ------------------------------------------------------------------ 1. İçinde mi, dışında mı */
  SC.push({
    title: 'İçinde mi, dışında mı?',
    goal: 'Bir elemanın kümede olup olmadığını ∈ ve ∉ ile yaz; eleman sayısını bul.',
    run: async (c) => {
      const svg = canvas(c);
      /* kanca: Beğendiklerim */
      const liste = G(svg);
      R(liste, 90, 50, 380, 460, { rx: 22, fill: 'rgba(255,255,255,.03)', stroke: COL.amber, 'stroke-width': 3 });
      T(liste, 120, 100, 'Beğendiklerim', { a: 'start', s: 28, w: 700 });
      const rows = SARKI.map((ad, i) => {
        const y = 160 + i * 68;
        const g = G(liste);
        R(g, 115, y - 26, 330, 52, { rx: 14, fill: '#1b2554', stroke: COL.axis, 'stroke-width': 2 });
        T(g, 190, y + 8, ad, { a: 'start', s: 24, w: 600 });
        const hg = G(g);
        S('path', { d: HEART, fill: COL.amber }, hg);
        at(hg, 150, y - 12);
        setOp(g, 0);
        return { g, hg, y };
      });
      const sayac = T(svg, 720, 290, '5 şarkı', { s: 40, f: COL.mute, w: 600 });
      gizle(liste, sayac);

      await par(c, '<b>Beğendiklerim</b> listende beş şarkı var.', { speak: 'Beğendiklerim listende beş şarkı var.' }, async () => {
        await fadeTo(c, liste, 400);
        for (const r of rows) { await fadeTo(c, r.g, 220); }
        await fadeTo(c, sayac, 300);
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'Deniz’i <b>bir kez daha</b> beğenirsen listede kaç şarkı olur?',
        options: ['6', '5', '4'], answer: 1,
        hints: ['Deniz zaten listede; ikinci kez eklenmez.', '', 'Beğenmek şarkıyı listeden çıkarmaz.'],
        right: 'Liste değişmez: Deniz zaten içinde.',
      });
      await par(c, 'Deniz zaten listede; liste <b>değişmedi</b>.', { speak: 'Deniz zaten listede; liste değişmedi.' }, async () => {
        await pulse(c, rows[0].hg, 150, rows[0].y - 12);
        await pulse(c, rows[0].hg, 150, rows[0].y - 12);
      });
      await Promise.all([fadeTo(c, liste, 400, 1, 0), fadeTo(c, sayac, 400, 1, 0)]);
      liste.remove(); sayac.remove();

      /* sayılarla */
      const baslik = T(svg, 320, 95, 'A = {1, 3, 5, 7, 9}', { s: 38, f: COL.amber, w: 800 });
      const kA = kutu(svg, 70, 150, 500, 260, COL.amber, '');
      const el = [1, 3, 5, 7, 9].map((v, i) => top(svg, 130 + i * 95, 280, String(v), { col: COL.amber }));
      const dort = top(svg, 700, 280, '4');
      const tIn = T(svg, 790, 180, '3 ∈ A', { s: 36, f: COL.mint, w: 700 });
      const tOut = T(svg, 760, 293, '4 ∉ A', { a: 'start', s: 36, f: COL.coral, w: 700 });
      const tS = T(svg, 320, 480, 's(A) = 5', { s: 42, f: COL.amber, w: 800 });
      gizle(baslik, kA.g, dort.g, tIn, tOut, tS, ...el.map((k) => k.g));

      await par(c, 'Sayılarla da aynı: bu küme <b>A</b>.', { speak: 'Sayılarla da aynı. Bu küme A.' }, async () => {
        await fadeTo(c, baslik, 400); await fadeTo(c, kA.g, 300);
        for (const k of el) await fadeTo(c, k.g, 160);
      });
      await par(c, '3, A’nın <b>elemanıdır</b>.', { speak: 'Üç, A’nın elemanıdır.' }, async () => {
        await pulse(c, el[1].g, el[1].x, el[1].y, 500);
        await fadeTo(c, tIn, 400);
      });
      await fadeTo(c, dort.g, 400);
      await c.choice({
        tag: 'Sıra sende',
        q: '4 bu kümede yok. Hangisi doğru?',
        options: [M_('4 ∈ A'), M_('4 ∉ A')], answer: 1,
        hints: ['∈ “elemanıdır” demek; 4 kümede değil.', ''],
        right: '∉: “elemanı değildir”.',
      });
      dort.col(COL.coral);
      await fadeTo(c, tOut, 400);
      await par(c, 'Aynı eleman iki kez yazılmaz: eleman sayısı <b>5</b>.', { speak: 'Aynı eleman iki kez yazılmaz. Eleman sayısı beş.' }, () => fadeTo(c, tS, 400));
      c.note(`${M_('3 ∈ A')} · ${M_('4 ∉ A')} · ${M_('s(A) = 5')}`, 'Eleman ve eleman sayısı', 'b1-1');
    },
  });

  /* ------------------------------------------------------------------ 2. Say ya da kuralını söyle */
  SC.push({
    title: 'Say ya da kuralını söyle',
    goal: 'Aynı sayı kümesini liste yöntemiyle ve ortak özellik yöntemiyle yaz.',
    run: async (c) => {
      const svg = canvas(c);
      /* sonlu küme: 5'ten küçük doğal sayılar */
      const g1 = G(svg);
      const kural = T(g1, 500, 100, 'B = {x : x < 5, x ∈ ℕ}', { s: 38, f: COL.sky, w: 700 });
      const e1 = T(g1, 500, 145, 'ortak özellik', { s: 22, f: COL.mute, w: 500 });
      const toplar = [0, 1, 2, 3, 4, 5, 6, 7].map((v, i) => top(g1, 150 + i * 100, 270, String(v)));
      const sonuc = T(g1, 500, 430, 'B = {0, 1, 2, 3, 4}', { s: 42, f: COL.mint, w: 800 });
      const e2 = T(g1, 500, 475, 'liste', { s: 22, f: COL.mute, w: 500 });
      gizle(kural, e1, sonuc, e2, ...toplar.map((t) => t.g));

      await par(c, 'Bir kümeyi <b>kuralıyla</b> yazabiliriz.', { speak: 'Bir kümeyi kuralıyla yazabiliriz.' }, async () => {
        await fadeTo(c, kural, 500); await fadeTo(c, e1, 300);
      });
      await par(c, 'Bu kural hangi sayıları seçer?', { speak: '[curious] Bu kural hangi sayıları seçer?' }, async () => {
        for (const t of toplar) { await fadeTo(c, t.g, 120); }
      });
      await c.choice({
        tag: 'Tahmin et',
        q: `${M_('{x : x < 5, x ∈ ℕ}')} kümesinin elemanları hangileri?`,
        options: [M_('{1, 2, 3, 4}'), M_('{0, 1, 2, 3, 4}'), M_('{0, 1, 2, 3, 4, 5}')], answer: 1,
        hints: ['Doğal sayılar 0’dan başlar.', '', '5, 5’ten küçük değildir.'],
        right: '5’ten küçük doğal sayılar: 0, 1, 2, 3, 4.',
      });
      await par(c, 'Elemanları tek tek de <b>yazabiliriz</b>: sıfırdan dörde.', { speak: 'Elemanları tek tek de yazabiliriz: sıfırdan dörde kadar.' }, async () => {
        for (let i = 0; i < 8; i++) {
          const t = toplar[i];
          if (i < 5) { t.col(COL.mint); await c.tween(200, (e) => at(t.g, t.x, t.y, 1 + 0.15 * Math.sin(e * Math.PI))); }
          else await fadeTo(c, t.g, 200, 1, 0.1);
        }
        await fadeTo(c, sonuc, 500); await fadeTo(c, e2, 300);
      });
      await c.say('İki yazım da <b>aynı kümeyi</b> anlatır.', { speak: 'İki yazım da aynı kümeyi anlatır.' });
      c.note(`${M_('{x : x < 5, x ∈ ℕ} = {0, 1, 2, 3, 4}')}`, 'Liste ve ortak özellik', 'b1-2');
      await c.cont('Bitmeyen bir küme ›');
      await fadeTo(c, g1, 400, 1, 0);
      g1.remove();

      /* sonsuz küme: 3'ün katı olan doğal sayılar, sonra çift tam sayılar */
      const kural3 = T(svg, 500, 100, 'C = {x : x = 3k, k ∈ ℕ}', { s: 38, f: COL.sky, w: 700 });
      const t3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => top(svg, 95 + i * 90, 250, String(v), { r: 32 }));
      const liste3 = T(svg, 500, 400, 'C = {0, 3, 6, 9, …}', { s: 42, f: COL.mint, w: 800 });
      const cift = T(svg, 500, 250, 'D = {…, −4, −2, 0, 2, 4, …}', { s: 42, f: COL.amber, w: 800 });
      gizle(kural3, liste3, cift, ...t3.map((t) => t.g));

      await par(c, '3’ün katı olan doğal sayılar <b>bitmez</b>.', { speak: 'Üçün katı olan doğal sayılar bitmez.' }, async () => {
        await fadeTo(c, kural3, 500);
        for (const t of t3) await fadeTo(c, t.g, 90);
        for (const t of t3) {
          if (+t.g.textContent % 3 === 0) { t.col(COL.mint); await c.tween(200, (e) => at(t.g, t.x, t.y, 1 + 0.15 * Math.sin(e * Math.PI))); }
          else await fadeTo(c, t.g, 150, 1, 0.1);
        }
      });
      await par(c, 'Listede üç nokta, <b>böyle sürer</b> demektir.', { speak: 'Listede üç nokta, böyle sürer demektir.' }, () => fadeTo(c, liste3, 500));
      c.note(`${M_('{x : x = 3k, k ∈ ℕ} = {0, 3, 6, 9, …}')}`, 'Bitmeyen liste', 'b1-2b');
      await c.choice({
        tag: 'Sıra sende',
        q: '<b>Çift tam sayılar</b> kümesi hangisidir?',
        options: [M_('{0, 2, 4, 6, …}'), M_('{…, −4, −2, 0, 2, 4, …}'), M_('{2, 4, 6, 8}')], answer: 1,
        hints: ['−2 ve −4 de çift tam sayı; sola doğru da sürer.', '', 'Çift sayılar bitmez; üç nokta gerekir.'],
        right: 'Tam sayılar iki yöne de sürer.',
      });
      await par(c, 'Tam sayılarda liste <b>iki yöne</b> sürer.', { speak: 'Tam sayılarda liste iki yöne de sürer.' }, async () => {
        await Promise.all([fadeTo(c, kural3, 300, 1, 0), ...t3.map((t) => c.tween(300, (e) => setOp(t.g, +t.g.getAttribute('opacity') * (1 - e))))]);
        await fadeTo(c, cift, 500);
      });
    },
  });

  /* ------------------------------------------------------------------ 3. Küme içinde küme */
  SC.push({
    title: 'Küme içinde küme',
    goal: 'Alt kümeyi tanı: her elemanı öteki kümede de olan küme.',
    run: async (c) => {
      const svg = canvas(c);
      const A = kutu(svg, 60, 90, 620, 400, COL.amber, 'A');
      const ust = [2, 4, 6].map((v, i) => top(svg, 200 + i * 120, 210, String(v)));
      const alt = [1, 3, 5].map((v, i) => top(svg, 200 + i * 120, 400, String(v)));
      const B = kutu(svg, 130, 150, 380, 120, COL.sky, 'B', { s: 22, fill: 'rgba(92,200,255,.06)' });
      const yedi = top(svg, 850, 210, '7');
      const fm = T(svg, 830, 400, 'B ⊂ A', { s: 46, f: COL.mint, w: 800 });
      gizle(A.g, B.g, yedi.g, fm, ...ust.map((k) => k.g), ...alt.map((k) => k.g));

      await par(c, 'A’nın içinden bir <b>B</b> kümesi seçtik.', { speak: 'A’nın içinden bir B kümesi seçtik.' }, async () => {
        await fadeTo(c, A.g, 400);
        for (const k of [...ust, ...alt]) await fadeTo(c, k.g, 140);
        await fadeTo(c, B.g, 500);
        ust.forEach((k) => k.col(COL.sky));
      });
      await par(c, 'B’nin <b>her</b> elemanı A’da da var.', { speak: 'B’nin her elemanı A’da da var.' }, async () => {
        for (const k of ust) await pulse(c, k.g, k.x, k.y, 400);
      });
      await par(c, 'Öyleyse B, A’nın <b>alt kümesidir</b>.', { speak: 'Öyleyse B, A’nın alt kümesidir.' }, () => fadeTo(c, fm, 500));
      await fadeTo(c, yedi.g, 400);
      await c.choice({
        tag: 'Tahmin et',
        q: 'B’ye <b>7</b>’yi eklersek ne olur?',
        options: ['B yine A’nın alt kümesi olur.', 'B artık A’nın alt kümesi olmaz.'], answer: 1,
        hints: ['7, A’da yok; “her eleman” koşulu bozulur.', ''],
        right: 'Bir eleman dışarıda kalırsa alt küme olmaz.',
      });
      await par(c, 'Tek eleman dışarıda kalınca alt küme <b>bozulur</b>.', { speak: 'Tek eleman dışarıda kalınca alt küme bozulur.' }, async () => {
        await c.tween(700, (e) => B.rect.setAttribute('width', lerp(380, 790, e)), ease.inOut);
        yedi.col(COL.coral); B.rect.setAttribute('stroke', COL.coral);
        fm.textContent = 'alt küme değil'; fm.style.fill = COL.coral; fm.setAttribute('font-size', 34);
        await pulse(c, yedi.g, yedi.x, yedi.y, 500);
      });
      c.note(`${M_('B ⊂ A')}: her elemanı A’da. ${M_('{2, 4, 6} ⊂ {1, 2, 3, 4, 5, 6}')}`, 'Alt küme', 'b1-3');
    },
  });

  /* ------------------------------------------------------------------ 4. Boş küme, evrensel küme */
  SC.push({
    title: 'Boş küme, evrensel küme',
    goal: 'Boş kümeyi ve evrensel kümeyi tanı; ∅ ile {0} farkını gör.',
    run: async (c) => {
      const svg = canvas(c);
      /* boş küme */
      const g1 = G(svg);
      const kural = T(g1, 500, 100, 'C = {x : x < 0, x ∈ ℕ}', { s: 38, f: COL.sky, w: 700 });
      const toplar = [0, 1, 2, 3, 4].map((v, i) => top(g1, 260 + i * 120, 250, String(v)));
      const bos = T(g1, 500, 400, 'C = ∅', { s: 48, f: COL.text, w: 800 });
      const sBos = T(g1, 500, 465, 's(∅) = 0', { s: 30, f: COL.mint, w: 700 });
      gizle(g1, bos, sBos);

      await par(c, 'Bu kural hangi doğal sayıları seçer?', { speak: 'Bu kural hangi doğal sayıları seçer?' }, () => fadeTo(c, g1, 600));
      await c.choice({
        tag: 'Tahmin et',
        q: '0’dan küçük doğal sayı kaç tane?',
        options: ['Hiç yok', 'Bir tane: 0', 'Sonsuz tane'], answer: 0,
        hints: ['', '0, 0’dan küçük değildir.', 'Negatif sayılar doğal sayı değildir.'],
        right: 'En küçük doğal sayı 0; ondan küçüğü yok.',
      });
      await par(c, 'Elemanı olmayan kümeye <b>boş küme</b> denir.', { speak: 'Elemanı olmayan kümeye boş küme denir.' }, async () => {
        for (const t of toplar) await fadeTo(c, t.g, 120, 1, 0.1);
        await fadeTo(c, bos, 400); await fadeTo(c, sBos, 400);
      });
      await c.cont('Bir tuzak var ›');
      await fadeTo(c, g1, 400, 1, 0);
      g1.remove();

      /* ∅ ile {0} */
      const g2 = G(svg);
      kutu(g2, 190, 150, 240, 180, COL.text, '');
      kutu(g2, 570, 150, 240, 180, COL.text, '');
      const sifir = S('circle', { cx: 690, cy: 240, r: 38, fill: '#1b2554', stroke: COL.sky, 'stroke-width': 3 }, g2);
      T(g2, 690, 253, '0', { s: 38, w: 700 });
      T(g2, 310, 390, '∅', { s: 44, w: 700 });
      T(g2, 690, 390, '{0}', { s: 44, w: 700 });
      const s0 = T(g2, 310, 460, 's(∅) = 0', { s: 30, f: COL.mint, w: 700 });
      const s1 = T(g2, 690, 460, 's({0}) = 1', { s: 30, f: COL.coral, w: 700 });
      gizle(g2, s0, s1);
      await fadeTo(c, g2, 500);
      await c.choice({
        tag: 'Tahmin et',
        q: `${M_('∅')} ile ${M_('{0}')} aynı küme mi?`,
        options: ['Aynı', 'Farklı'], answer: 1,
        hints: ['Kutuların içine bak: sağdakinde bir eleman var.', ''],
        right: '{0} kümesinin bir elemanı var: 0.',
      });
      await par(c, 'Sıfır da bir elemandır; <b>{0}</b> boş değildir.', { speak: 'Sıfır da bir elemandır. İçinde sıfır olan küme boş değildir.' }, async () => {
        await fadeTo(c, s0, 400);
        await c.tween(400, (e) => sifir.setAttribute('r', 38 + 6 * Math.sin(e * Math.PI)));
        await fadeTo(c, s1, 400);
      });
      c.note(`${M_('s(∅) = 0')} ama ${M_('s({0}) = 1')}`, 'Boş küme', 'b1-4');
      await c.cont('Peki en büyük küme? ›');
      await fadeTo(c, g2, 400, 1, 0);
      g2.remove();

      /* evrensel küme */
      const g3 = G(svg);
      const E = kutu(g3, 40, 50, 920, 400, COL.lilac, '', { dash: true, fill: 'none' });
      const eLb = T(g3, 930, 100, 'E', { a: 'end', s: 40, f: COL.lilac, w: 800 });
      const A = kutu(g3, 110, 110, 700, 130, COL.amber, '');
      const aLb = T(g3, 135, 150, 'A', { a: 'start', s: 28, f: COL.amber, w: 800 });
      [1, 3, 5, 7, 9].forEach((v, i) => top(g3, 230 + i * 125, 175, String(v), { col: COL.amber }));
      [0, 2, 4, 6, 8].forEach((v, i) => top(g3, 230 + i * 125, 350, String(v)));
      const eTx = T(g3, 500, 510, 'E = {0, 1, 2, …, 9}', { s: 38, f: COL.lilac, w: 800 });
      gizle(g3, A.g, aLb, eTx);
      await par(c, 'Üzerinde çalıştığımız bütün sayılar: <b>evrensel küme</b>, E.', { speak: 'Üzerinde çalıştığımız bütün sayılar evrensel kümedir. E ile gösterilir.' }, async () => {
        await fadeTo(c, g3, 600); await fadeTo(c, eTx, 400);
      });
      await par(c, 'A, evrensel kümenin içinde bir kümedir.', { speak: 'A, evrensel kümenin içinde bir kümedir.' }, async () => {
        await fadeTo(c, A.g, 500); await fadeTo(c, aLb, 300);
      });
      c.note(`Evrensel küme ${M_('E')}: üzerinde çalışılan bütün elemanlar.`, 'Evrensel küme', 'b1-4e');
    },
  });

  /* ------------------------------------------------------------------ 5. Sıra sende */
  SC.push({
    title: 'Sıra sende: doğru mu, yanlış mı?',
    goal: '∈ ile ⊂ farkını ve boş kümeyi kartlarla pekiştir.',
    run: async (c) => {
      const svg = canvas(c);
      svg.style.touchAction = 'none';
      T(svg, 500, 75, 'A = {1, 2, 3}', { s: 40, f: COL.amber, w: 800 });
      const slotDef = [
        { ok: true, ad: 'Doğru', col: COL.mint, x: 70 },
        { ok: false, ad: 'Yanlış', col: COL.coral, x: 530 },
      ];
      const slots = slotDef.map((d) => {
        const g = G(svg);
        R(g, d.x, 270, 400, 240, { rx: 22, fill: 'rgba(255,255,255,.03)', stroke: d.col, 'stroke-width': 3 });
        T(g, d.x + 200, 315, d.ad, { s: 28, f: d.col, w: 700 });
        return { el: g, rect: { x: d.x, y: 270, w: 400, h: 240 }, ok: d.ok, n: 0, x: d.x };
      });
      const kartDef = [
        { t: '3 ∈ A', ok: true, ipucu: '3, A’nın elemanı: bu doğru.' },
        { t: '3 ⊂ A', ok: false, ipucu: '3 bir eleman; ⊂ iki küme arasında kullanılır.' },
        { t: '{3} ⊂ A', ok: true, ipucu: '{3} bir küme ve tek elemanı A’da: bu doğru.' },
        { t: '∅ = {0}', ok: false, ipucu: '{0} kümesinde bir eleman var; boş değil.' },
      ];
      const items = kartDef.map((d, i) => {
        const g = G(svg);
        const box = R(g, -86, -34, 172, 68, { rx: 16, fill: '#1b2554', stroke: COL.axis2, 'stroke-width': 3 });
        T(g, 0, 11, d.t, { s: 30, w: 700 });
        return { el: g, box, hx: 155 + i * 230, hy: 175, d };
      });
      const fb = h('div');
      c.panel('Sıra sende', h('div', { class: 'q', html: 'Her kartı <b>Doğru</b> ya da <b>Yanlış</b> kutusuna sürükle.' }), fb);
      c.say('Kartları doğru kutuya sürükle.', { noWait: true });
      let n = 0;
      const yerlestir = (it, slot) => {
        slot.sx = slot.x + 104 + (slot.n % 2) * 192; slot.sy = 420;
        slot.n++; n++;
        it.box.setAttribute('stroke', slot.ok ? COL.mint : COL.coral);
      };
      dnd(c, svg, items, slots, {
        onDrop: (it, slot) => {
          if (it.d.ok !== slot.ok) { c.feedback(fb, 'no', it.d.ipucu); return 'no'; }
          yerlestir(it, slot);
          c.feedback(fb, 'ok', it.d.ipucu.replace(': bu doğru.', '.'));
          return 'ok';
        },
      });
      await until(c, () => n >= items.length, {
        delay: 9000,
        solve: async () => {
          for (const it of items) {
            if (it.locked) continue;
            const slot = slots.find((s) => s.ok === it.d.ok);
            yerlestir(it, slot); it.locked = true;
            const x0 = it.x, y0 = it.y;
            await c.tween(400, (e) => { it.x = lerp(x0, slot.sx, e); it.y = lerp(y0, slot.sy, e); at(it.el, it.x, it.y); }, ease.out);
          }
        },
      });
      await c.wait(500);
      c.clearAct();
      await c.say('Eleman için <b>∈</b>, küme için <b>⊂</b> kullanılır.', { speak: 'Eleman için elemanıdır işareti, küme için alt küme işareti kullanılır.' });
      c.note(`${M_('3 ∈ A')} ve ${M_('{3} ⊂ A')}`, 'Eleman mı, küme mi?', 'b1-5');
    },
  });

  return {
    title: 'Küme dili',
    hook: 'Beğendiklerim listende 5 şarkı var. Birini <b>bir kez daha</b> beğenirsen listede kaç şarkı olur?',
    scenes: SC,
    quiz: [
      {
        q: `${M_('{x : x < 4, x ∈ ℕ}')} kümesinin kaç elemanı vardır?`,
        options: ['3', '4', '5', 'Sonsuz'], answer: 1,
        why: [
          '0’ı unutmuşsun: doğal sayılar 0’dan başlar.',
          '0, 1, 2, 3: dört eleman.',
          '4, 4’ten küçük değildir.',
          '4’ten küçük yalnızca dört doğal sayı var.'],
        scene: 1,
      },
      {
        q: `${M_('A = {1, 2, 3}')} için hangisi doğrudur?`,
        options: [M_('2 ⊂ A'), M_('{2} ⊂ A'), M_('{2} ∈ A'), M_('4 ∈ A')], answer: 1,
        why: [
          '2 bir eleman; eleman için ∈ kullanılır.',
          '{2} bir küme ve tek elemanı A’da.',
          '{2} bir küme; A’nın elemanları ise sayılar.',
          '4, A’nın elemanı değil.'],
        scene: 2,
      },
      {
        q: `${M_('K = {x : x < 7, x ∈ ℕ}')} kümesinin alt kümesi aşağıdakilerden hangisidir?`,
        options: [M_('{4, 5, 6, 7}'), M_('{1, 2, 9}'), M_('{0, 3, 6}'), M_('{6, 7, 8}')], answer: 2,
        why: [
          '7, K’nın elemanı değil: 7, 7’den küçük değildir. Tek eleman dışarıda kalınca alt küme bozulur.',
          '9, K’nın dışında. Her eleman K’da olmalı.',
          'K = {0, 1, 2, 3, 4, 5, 6}. 0, 3 ve 6’nın üçü de K’da.',
          '7 ve 8, K’nın dışında. Her eleman K’da olmalı.'],
        scene: 2,
      },
      {
        q: `${M_('A = {x : x < 1, x ∈ ℕ}')} kümesi için hangisi doğrudur?`,
        options: ['A boş kümedir.', M_('s(A) = 0'), M_('A = {1}'), M_('A = {0} ve s(A) = 1')], answer: 3,
        why: [
          '0 da bir doğal sayıdır ve 1’den küçüktür. A’nın bir elemanı var.',
          'Eleman sayısı 0 olan küme boş kümedir; ama 0 sayısı A’da.',
          '1, 1’den küçük değildir; A’da olamaz.',
          '1’den küçük tek doğal sayı 0. {0} boş değildir, bir elemanı var.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>Küme bir listedir; ya sayarsın ya kuralını söylersin.</b>',
      `<b>Eleman ∈, küme ⊂:</b> ${M_('3 ∈ A')} ve ${M_('{3} ⊂ A')}`,
      `<b>Boş küme:</b> ${M_('s(∅) = 0')}; ${M_('{0}')} boş değildir.`,
    ],
    next: { href: 'b2-dolu-nokta-bos-nokta.html', label: 'Sonraki: Dolu nokta, boş nokta ›' },
  };
};
