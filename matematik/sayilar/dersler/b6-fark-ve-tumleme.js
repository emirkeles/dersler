/* B6 — Fark ve tümleme
   Önce listelenmiş sayı kümelerinde (E = {1, …, 8}), sonra aralıklarda.
   Lunaparktaki iki oyuncak: hız treni A = [140, 190), çarpışan araba B = [120, 160].
   Renk rolleri Ders 02 ile aynı: A amber, B gökmavisi, sonuç mint.
   Çizim araçları (K) dersler/02-araliklar-ve-kume-sembolleri.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).b6 = (K) => {
  'use strict';
  const { S, h, ease, lerp, COL, num, INF, IV, isEmpty, inter, ivStr, ineqStr, T, R, at, setOp, G, canvas, dot, axis, AX100, AX10,
    ivShape, spawn, until, toggler, par, fadeTo, M_ } = K;

  /* ------------------------------------------------------------------ küme işlemleri (sonuçlar koddan) */
  /* X \ Y: X'te olup Y'de olmayanlar. En çok iki parça döner. */
  function diff(X, Y) {
    const L = { a: X.a, la: X.la, b: Math.min(X.b, Y.a), lb: Y.a < X.b ? !Y.la : Y.a === X.b ? X.lb && !Y.la : X.lb };
    const Rg = { a: Math.max(X.a, Y.b), la: Y.b > X.a ? !Y.lb : Y.b === X.a ? X.la && !Y.lb : X.la, b: X.b, lb: X.lb };
    return [L, Rg].filter((p) => !isEmpty(p)).map((p) => IV(p.a, p.b, p.la, p.lb));
  }
  const REEL = IV(-INF, INF);
  const comp = (X) => diff(REEL, X);
  const setStr = (ps) => (ps.length ? ps.map(ivStr).join(' ∪ ') : '∅');

  const A = IV(140, 190, true, false), B = IV(120, 160, true, true);
  const AmB = diff(A, B), BmA = diff(B, A), Ac = comp(A);
  const sAmB = setStr(AmB), sBmA = setStr(BmA), sAc = setStr(Ac);
  /* cebirsel temsil: parçaların eşitsizlikleri "veya" ile bağlanır */
  const cebir = (ps) => ps.map(ineqStr).join(' veya ');

  /* ------------------------------------------------------------------ ortak sahne kurulumu: iki şerit ve eksen */
  const AY = 350, YA = 215, YB = 280;
  function twoBands(c, svg, o = {}) {
    const g = G(svg);
    const ax = axis(g, AX100(AY, { major: [100, 120, 140, 160, 190], minor: [110, 130, 150, 170, 180, 200] }));
    const sA = ivShape(g, ax, A, YA, COL.amber, { th: 11, r: 11, hidden: o.hidden });
    const sB = ivShape(g, ax, B, YB, COL.sky, { th: 11, r: 11, hidden: o.hidden });
    const tA = T(g, (ax.X(A.a) + ax.X(A.b)) / 2, YA - 28, o.labelA || 'A: ' + ivStr(A), { s: 22, w: 700, f: COL.amber });
    const tB = T(g, (ax.X(B.a) + ax.X(B.b)) / 2, YB - 22, o.labelB || 'B: ' + ivStr(B), { s: 22, w: 700, f: COL.sky });
    if (o.hidden) { setOp(tA, 0); setOp(tB, 0); setOp(ax.g, 0); }
    return { g, ax, sA, sB, tA, tB };
  }
  /* X \ Y'yi eksende canlandır: X iner, Y'nin değdiği parça boyanır, sonra silinir. */
  function subtract(c, parent, ax, X, Y, colX, colY) {
    const copy = ivShape(parent, ax, X, AY, colX, { th: 15, nodots: true, hidden: true });
    const ov = ivShape(parent, ax, inter(X, Y), AY, colY, { th: 15, nodots: true, hidden: true });
    const out = diff(X, Y).map((p) => ivShape(parent, ax, p, AY, COL.mint, { th: 15, r: 13 }));
    out.forEach((s) => s.fade(0));
    return {
      out,
      drop: () => copy.grow(c, 900),
      cover: () => ov.grow(c, 800),
      wipe: () => c.tween(900, (e) => { copy.fade(1 - e); ov.fade(1 - e); out.forEach((s) => s.fade(e)); }, ease.inOut),
    };
  }
  const beam = (parent, x, y1) => S('line', { x1: x, x2: x, y1, y2: AY - 16, stroke: COL.mint, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0 }, parent);
  const pulse = (c, d) => c.tween(700, (e) => { d.sc = 1 + 0.45 * Math.sin(e * Math.PI); d.place(); }, ease.linear);

  const SC = [];

  /* ------------------------------------------------------------------ 1. Önce sayı listesinde */
  const EL = Array.from({ length: 8 }, (_, i) => i + 1), LA = [1, 2, 3, 4], LB = [3, 4, 5, 6];
  const minus = (X, Y) => X.filter((v) => !Y.includes(v));
  const LAmB = minus(LA, LB), LBmA = minus(LB, LA), LAnB = LA.filter((v) => LB.includes(v)), LAc = minus(EL, LA);
  const lst = (xs) => '{' + xs.join(', ') + '}';
  SC.push({
    title: 'Önce sayı listesinde',
    goal: 'Fark ve tümleyen, elemanları sayılan kümelerde.',
    run: async (c) => {
      const svg = canvas(c);
      const TX = (v) => 150 + (v - 1) * 100, TY = 270;
      const frame = G(svg);
      R(frame, 70, 168, 860, 224, { rx: 18, fill: 'none', stroke: COL.axis2, 'stroke-width': 2.5, 'stroke-dasharray': '7 7' });
      T(frame, 500, 130, `E = {${EL[0]}, ${EL[1]}, …, ${EL[EL.length - 1]}}`, { s: 30, w: 700, f: COL.mute });
      const box = (xs, pad, col, label, lx, ly) => {
        const g = G(svg);
        R(g, TX(xs[0]) - 30 - pad, TY - 30 - pad, TX(xs[xs.length - 1]) - TX(xs[0]) + 60 + 2 * pad, 60 + 2 * pad, { rx: 16, fill: 'none', stroke: col, 'stroke-width': 4 });
        T(g, lx, ly, label, { s: 28, w: 800, f: col });
        setOp(g, 0);
        return g;
      };
      const boxA = box(LA, 20, COL.amber, 'A', TX(LA[0]) - 24, TY - 62);
      const boxB = box(LB, 34, COL.sky, 'B', TX(LB[LB.length - 1]) + 38, TY + 96);
      const tiles = {};
      EL.forEach((v) => {
        const g = G(svg);
        const r = R(g, -30, -30, 60, 60, { rx: 12, fill: '#1d2858', stroke: COL.axis2, 'stroke-width': 2.5 });
        const t = T(g, 0, 11, String(v), { s: 30, w: 800 });
        at(g, TX(v), TY, 0);
        tiles[v] = { g, r, t, op: 1 };
      });
      /* seçilenler mint yanar, ötekiler soluklaşır */
      const mark = (on) => c.tween(600, (e) => EL.forEach((v) => {
        const tl = tiles[v], hit = on.includes(v), to = hit || !on.length ? 1 : 0.3;
        setOp(tl.g, lerp(tl.op, to, e));
        if (e === 1) { tl.op = to; }
        tl.r.setAttribute('stroke', hit ? COL.mint : COL.axis2);
        tl.t.style.fill = hit ? COL.mint : COL.text;
      }), ease.inOut);
      const eq1 = T(svg, 500, 478, 'A \\ B = ' + lst(LAmB), { s: 44, w: 800, f: COL.mint, op: 0 });
      const eq2 = T(svg, 500, 478, 'A′ = ' + lst(LAc), { s: 44, w: 800, f: COL.mint, op: 0 });
      setOp(frame, 0);

      await par(c, 'Evrensel küme <b>E</b>: birden sekize sayılar.', { speak: 'Evrensel küme E: birden sekize kadar sayılar.' }, async () => {
        await fadeTo(c, frame, 400);
        for (const v of EL) { spawn(c, () => c.tween(300, (e) => at(tiles[v].g, TX(v), TY, e), ease.back)); await c.wait(90); }
        await c.wait(300);
      });
      await par(c, `<b class="t5">A</b> = ${lst(LA)}, <b>B</b> = ${lst(LB)}.`, { speak: 'A kümesi bir, iki, üç, dört. B kümesi üç, dört, beş, altı.' }, async () => {
        await fadeTo(c, boxA, 500); await fadeTo(c, boxB, 500);
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'A’da olup B’de <b>olmayan</b> sayılar hangileri?',
        options: [M_(lst(LAnB)), M_(lst(LAmB)), M_(lst(LBmA))], answer: 1,
        hints: ['Bunlar B’de de var.', null, 'Bunlar A’da yok.'],
        right: 'Evet: yalnız A’da olanlar.',
      });
      await par(c, 'B’de de olanları sil: kalan <b>A fark B</b>.', { speak: 'B’de de olanları sil: kalan, A fark B.' }, async () => {
        await mark(LAmB);
        await fadeTo(c, eq1, 500);
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'A’nın <b>dışında</b> kalan sayılar hangileri?',
        options: [M_(lst(LBmA)), M_(lst(LAc)), M_(lst(minus(LAc, LB)))], answer: 1,
        hints: ['7 ve 8 de A’nın dışında.', null, '5 ve 6 da A’da yok.'],
        right: 'E’de olup A’da olmayan her sayı.',
      });
      await par(c, 'A’nın dışındaki her şey: <b>A’nın tümleyeni</b>, A′.', { speak: 'A’nın dışındaki her şey: A’nın tümleyeni.' }, async () => {
        await fadeTo(c, eq1, 300, 1, 0);
        await mark(LAc);
        await fadeTo(c, eq2, 500);
      });
      await c.say('Tümleyen, <b>evrensel kümeye</b> göre alınır.', { speak: 'Tümleyen, evrensel kümeye göre alınır.' });
      c.note(`${M_('A \\ B = ' + lst(LAmB))} · ${M_('A′ = ' + lst(LAc))}`, 'Listede fark ve tümleyen', 'b6-liste');
      await c.say('Şimdi aynı işlemler <b>aralıklarda</b>.');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 2. Biri var, öteki yok */
  SC.push({
    title: 'Biri var, öteki yok',
    goal: 'A \\ B: A’da olup B’de olmayanlar.',
    run: async (c) => {
      const svg = canvas(c);
      const st = twoBands(c, svg, { hidden: true });
      const sub = subtract(c, st.g, st.ax, A, B, COL.amber, COL.sky);
      const eq = T(svg, 500, 466, 'A \\ B = ' + sAmB, { s: 44, w: 800, f: COL.mint, op: 0 });
      const al = T(svg, 500, 524, cebir(AmB), { s: 32, w: 700, op: 0 });

      await par(c, 'Hız treni <b class="t5">A</b>: 140 ve üzeri, 190’dan kısa.', { speak: 'Hız treni A: yüz kırk ve üzeri, yüz doksandan kısa.' }, async () => {
        await fadeTo(c, st.ax.g, 500);
        setOp(st.tA, 1);
        await st.sA.grow(c, 1000);
      });
      await par(c, 'Çarpışan araba <b>B</b>: 120’den 160’a, uçlar dahil.', { speak: 'Çarpışan araba B: yüz yirmiden yüz altmışa, uçlar dahil.' }, async () => {
        setOp(st.tB, 1);
        await st.sB.grow(c, 1000);
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'Hız trenine binebilen ama çarpışan arabaya <b>binemeyenler</b> hangi boylarda?',
        options: ['140 ile 160 arası', '160 ile 190 arası', '120 ile 140 arası'], answer: 1,
        hints: ['Onlar ikisine de biniyor. Çarpışan arabaya binemeyenleri arıyoruz.', null, 'Onlar hız trenine binemiyor.'],
        right: 'Evet: 160’tan uzun olanlar çarpışan arabaya sığmıyor.',
      });
      await par(c, 'Önce <b>A</b>’nın tamamını al.', { speak: 'Önce A’nın tamamını al.' }, () => sub.drop());
      await par(c, 'Şimdi <b>B</b>’ye değen parçayı işaretle.', { speak: 'Şimdi B’ye değen parçayı işaretle.' }, () => sub.cover());
      await par(c, 'O parçayı sil; kalan <b>A fark B</b>.', { speak: 'O parçayı sil; kalan, A fark B.' }, async () => {
        await sub.wipe();
        await fadeTo(c, eq, 500);
        await fadeTo(c, al, 500);
      });
      c.note(`<b>A \\ B</b>: yalnız A’dakiler.<br>${M_(ivStr(A) + ' \\ ' + ivStr(B) + ' = ' + sAmB)}`, 'Fark', 'b6-fark');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 3. Uç nokta ve sıra */
  SC.push({
    title: 'Uç nokta ve sıra',
    goal: 'B’de dolu olan uç farkta boş kalır; A \\ B ile B \\ A farklıdır.',
    run: async (c) => {
      const svg = canvas(c);
      const st = twoBands(c, svg);
      const r1 = AmB.map((p) => ivShape(st.g, st.ax, p, AY, COL.mint, { th: 15, r: 13 }));
      const eq1 = T(svg, 500, 462, 'A \\ B = ' + sAmB, { s: 38, w: 800, f: COL.mint });
      const eq2 = T(svg, 500, 520, 'B \\ A = ' + sBmA, { s: 38, w: 800, f: COL.mint, op: 0 });
      const bm = beam(st.g, st.ax.X(B.b), YB + 14);

      await par(c, 'Kesim yerine bak: <b>160</b>.', { speak: 'Kesim yerine bak: yüz altmış.' }, () => fadeTo(c, bm, 400));
      await c.choice({
        tag: 'Tahmin et',
        q: `Boyu tam <b>160 cm</b> olan, ${M_('A \\ B')} kümesinde mi?`,
        options: ['Evet, içinde', 'Hayır, dışında'], answer: 1,
        hints: ['160 cm çarpışan arabaya biniyor: B’de dolu nokta.', null],
        right: '160 B’de var; farkta olamaz.',
      });
      await par(c, '160 <b>B</b>’de dolu; farkta boş kalır.', { speak: 'Yüz altmış B’de dolu; farkta boş kalır.' }, () => Promise.all([pulse(c, st.sB.d2), pulse(c, r1[0].d1)]));
      await c.choice({
        tag: 'Tahmin et',
        q: `Sırayı çevir. ${M_('B \\ A')} hangisi?`,
        options: [M_(sAmB), M_(sBmA), M_(ivStr(IV(B.a, A.a, true, true)))], answer: 1,
        hints: ['Bu A \\ B idi. Şimdi B’den başlıyoruz.', null, '140 hız trenine biniyor: A’da dolu, farkta boş.'],
        right: 'Çarpışan arabaya binip hız trenine binemeyenler.',
      });
      const sub = subtract(c, st.g, st.ax, B, A, COL.sky, COL.amber);
      await par(c, 'Bu kez <b>B</b>’den başla, <b>A</b>’ya değeni sil.', { speak: 'Bu kez B’den başla, A’ya değeni sil.' }, async () => {
        await c.tween(400, (e) => { r1.forEach((s) => s.fade(lerp(1, 0.3, e))); setOp(bm, 1 - e); });
        await sub.drop(); await sub.cover(); await sub.wipe();
      });
      await par(c, 'Sonuç değişti: sıra önemli.', {}, () => fadeTo(c, eq2, 500));
      c.note(`${M_('A \\ B ≠ B \\ A')}<br>${M_(sAmB + ' ≠ ' + sBmA)}`, 'Sıra önemli', 'b6-sira');
      void eq1;
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 4. Dışarıda kalanlar */
  SC.push({
    title: 'Dışarıda kalanlar',
    goal: 'A′: A’nın dışındaki her şey. Uç noktalar tersine döner.',
    run: async (c) => {
      const svg = canvas(c);
      const g = G(svg);
      const ax = axis(g, AX100(AY, { major: [100, 120, 140, 160, 190], minor: [110, 130, 150, 170, 180, 200] }));
      const sA = ivShape(g, ax, A, YA, COL.amber, { th: 11, r: 11, hidden: true });
      const tA = T(g, (ax.X(A.a) + ax.X(A.b)) / 2, YA - 30, 'A = ' + ivStr(A), { s: 26, w: 700, f: COL.amber, op: 0 });
      const copy = ivShape(g, ax, A, AY, COL.amber, { th: 15, nodots: true, hidden: true });
      const outs = Ac.map((p) => ivShape(g, ax, p, AY, COL.mint, { th: 15, nodots: true, hidden: true }));
      const dL = dot(g, ax.X(A.a), AY, COL.amber, A.la, { r: 13 }), dR = dot(g, ax.X(A.b), AY, COL.amber, A.lb, { r: 13 });
      dL.hide(); dR.hide();
      const eq = T(svg, 500, 466, 'A′ = ' + sAc, { s: 44, w: 800, f: COL.mint, op: 0 });
      const al = T(svg, 500, 524, cebir(Ac), { s: 32, w: 700, op: 0 });
      setOp(ax.g, 0);

      await par(c, 'Hız treni <b>A</b>. Binemeyenler kimler?', { speak: 'Hız treni A. Binemeyenler kimler?' }, async () => {
        await fadeTo(c, ax.g, 500);
        setOp(tA, 1);
        await sA.grow(c, 900);
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'Hız trenine <b>binemeyenler</b> sayı doğrusunda kaç parça eder?',
        options: ['Tek parça', 'İki parça'], answer: 1,
        hints: ['Kısa kalanlar bir yanda, fazla uzun olanlar öbür yanda.', null],
        right: 'Kısa kalanlar solda, fazla uzunlar sağda.',
      });
      await par(c, 'Evrensel küme bütün gerçek sayılar: <b>ℝ</b>.', { speak: 'Evrensel küme bütün gerçek sayılar.' }, async () => {
        await dL.pop(c, 250);
        await copy.grow(c, 800);
        await dR.pop(c, 250);
      });
      await par(c, 'İçerisi söner, dışarısı yanar.', {}, async () => {
        await c.tween(600, (e) => copy.fade(1 - e));
        await Promise.all(outs.map((s) => s.grow(c, 900)));
      });
      await c.choice({
        tag: 'Tahmin et',
        q: 'Boyu tam <b>190 cm</b> olan binemeyenler arasında mı?',
        options: ['Hayır', 'Evet'], answer: 1,
        hints: ['Kural “190’dan kısa”: 190 hız trenine binemiyor.', null],
        right: '190 A’da yok; öyleyse dışarıdakilerle birlikte.',
      });
      await par(c, 'Uçlar da döner: 140 boşalır, 190 dolar.', { speak: 'Uçlar da döner: yüz kırk boşalır, yüz doksan dolar.' }, async () => {
        dL.recolor(COL.mint); dR.recolor(COL.mint);
        await Promise.all([dL.flip(c, !A.la, 500), pulse(c, dL)]);
        await Promise.all([dR.flip(c, !A.lb, 500), pulse(c, dR)]);
      });
      await par(c, 'Buna <b>A’nın tümleyeni</b> denir: A′.', { speak: 'Buna A’nın tümleyeni denir.' }, async () => { await fadeTo(c, eq, 500); await fadeTo(c, al, 500); });
      c.note(`<b>A′</b>: A’nın dışı.<br>${M_(ivStr(A) + '′ = ' + sAc)}`, 'Tümleyen', 'b6-tumleyen');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 5. Sıra sende */
  SC.push({
    title: 'Sıra sende: tümleyeni kur',
    goal: 'Tümleyende dolu boşalır, boş dolar.',
    run: async (c) => {
      const svg = canvas(c);
      const tasks = [IV(-INF, 3, false, true), IV(2, 5, true, false)];
      for (let ti = 0; ti < tasks.length; ti++) {
        const X = tasks[ti], ps = comp(X);
        const ends = [[X.a, X.la], [X.b, X.lb]].filter(([v]) => isFinite(v));
        const g = G(svg);
        const ay = 320;
        const maj = [0, ...ends.map(([v]) => v), 10];
        const ax = axis(g, AX10(ay, { major: maj, minor: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => !maj.includes(v)) }));
        T(g, 500, 62, 'Verilen küme', { s: 22, f: COL.mute, w: 600 });
        T(g, 500, 128, ivStr(X), { s: 58, w: 800, f: COL.amber });
        ivShape(g, ax, X, 222, COL.amber, { th: 10, r: 11 });
        ps.forEach((p) => ivShape(g, ax, p, ay, COL.mint, { th: 13, nodots: true }));
        /* tuzak: uçlar verilen kümedeki gibi başlar */
        const ds = ends.map(([v, f]) => Object.assign(dot(g, ax.X(v), ay, COL.mint, f, { r: 14 }), { v, target: !f }));
        const dAt = (v) => ds.find((d) => d.v === v);
        T(g, 500, 432, 'Tümleyeni', { s: 22, f: COL.mute, w: 600 });
        const live = T(g, 500, 490, '', { s: 52, w: 800, f: COL.mint });
        const liveAl = T(g, 500, 538, '', { s: 28, w: 700 });
        const refresh = () => {
          const now = ps.map((p) => ({ a: p.a, b: p.b, la: isFinite(p.a) && dAt(p.a).filled, lb: isFinite(p.b) && dAt(p.b).filled }));
          live.textContent = setStr(now); liveAl.textContent = cebir(now);
        };
        refresh();
        ds.forEach((d) => toggler(c, svg, d, refresh, `${num(d.v)} noktasını değiştir`));
        let solved = false;
        const fb = h('div');
        setOp(g, 0);
        await par(c, ti === 0 ? 'Tümleyeni sen kur: uca dokun, dolu ya da boş yap.' : 'Bu kez iki uç var.', {}, () => fadeTo(c, g, 600));
        const check = () => {
          if (solved) return;
          const bad = ds.filter((d) => d.filled !== d.target);
          if (!bad.length) {
            solved = true; ds.forEach((d) => { d.locked = true; spawn(c, () => d.pop(c, 450)); });
            c.feedback(fb, 'ok', 'Doğru. Dolu boşaldı, boş doldu.');
            return;
          }
          live.style.fill = COL.coral;
          c.feedback(fb, 'no', bad.map((d) => (d.target
            ? `<b>${num(d.v)}</b> verilen kümede yok; tümleyende olmalı.`
            : `<b>${num(d.v)}</b> verilen kümede var; tümleyende olamaz.`)).join('<br>'));
          spawn(c, async () => { await c.wait(1200); live.style.fill = COL.mint; });
        };
        const pn = c.panel(`Sıra sende · ${ti + 1}/${tasks.length}`,
          h('p', { class: 'q', html: `${M_(ivStr(X))} kümesinin tümleyeni için uçları ayarla, sonra <b>Kontrol et</b>.` }),
          h('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' } }, h('button', { class: 'btn', onclick: check }, 'Kontrol et')), fb);
        await until(c, () => solved, {
          delay: 15000,
          solve: async () => {
            await Promise.all(ds.map((d) => d.flip(c, d.target, 250)));
            refresh(); check(); await c.wait(500);
          },
        });
        await new Promise((res) => { pn.append(h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, ti < tasks.length - 1 ? 'Sonraki ›' : 'Bitir ›')); });
        pn.remove();
        if (ti < tasks.length - 1) { await fadeTo(c, g, 450, 1, 0); g.remove(); }
      }
      await c.say('Tümleyende dolu boşalır, boş dolar.');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ çıkış soruları */
  const Q1 = [IV(1, 6, true, true), IV(4, 9, true, true)], Q2 = IV(2, 5, false, true);
  return {
    title: 'Fark ve tümleme',
    hook: `Hız treni ${M_(ivStr(A))}, çarpışan araba ${M_(ivStr(B))}. Hız trenine binebilen ama çarpışan arabaya <b>binemeyenler</b> kimler?`,
    scenes: SC,
    quiz: [
      {
        q: `${M_(ivStr(Q1[0]) + ' \\ ' + ivStr(Q1[1]))} işleminin sonucu nedir?`,
        options: [M_('[1, 4]'), M_(setStr(diff(Q1[0], Q1[1]))), M_(setStr(diff(Q1[1], Q1[0]))), M_(ivStr(inter(Q1[0], Q1[1])))], answer: 1,
        why: [
          '4, ikinci kümede var; farkta olamaz.',
          'İlk kümeden ikinciye değen parça silinir; 4 ikincide dolu, farkta boş.',
          'Bu, sırası çevrilmiş fark: ikinci kümeden başlıyor.',
          'Bu kesişim: iki kümede de olanlar. Fark onları siler.'],
        scene: 2,
      },
      {
        q: `${M_(ivStr(Q2))} kümesinin tümleyeni hangisidir?`,
        options: [M_('(−∞, 2) ∪ (5, ∞)'), M_(setStr(comp(Q2))), M_('(−∞, 2] ∪ [5, ∞)'), M_('[2, 5)')], answer: 1,
        why: [
          '2 verilen kümede yok; tümleyende olmalı.',
          '2 boştu, doldu; 5 doluydu, boşaldı.',
          '5 verilen kümede var; tümleyende olamaz.',
          'Tümleyen kümenin dışıdır; bu yine aradaki parça.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>Tümleyende dolu boşalır, boş dolar.</b>',
      `<b>Fark:</b> ${M_('A \\ B')}, A’da olup B’de olmayanlar. Sıra önemli.`,
      `<b>Tümleyen:</b> ${M_(ivStr(A) + '′ = ' + sAc)}`,
    ],
    next: { href: 'b7-mutlak-degerle-aralik.html', label: 'Sonraki: Mutlak değerle aralık ›' },
  };
};
