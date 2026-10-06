/* B7 — Mutlak değerle aralık
   Lunaparktaki boy tahmini standı: görevli boyu tahmin eder, yanılgı paydan azsa kazanır.
   Renk rolleri: amber = merkez (tahmin) · mint = şerit / sonuç · gökmavisi ve turuncu = iki yandaki gerçek boylar.
   Çizim araçları dersler/02-araliklar-ve-kume-sembolleri.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).b7 = (K) => {
  const { S, ease, lerp, COL, num, IV, ivStr, ineqStr, T, R, G, setOp, at, canvas, dot, axis, AX10, par, fadeTo, M_ } = K;

  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  /* boy ekseni: 155–175 cm */
  const HX = (y) => ({
    x0: 80, x1: 920, vmin: 155, vmax: 175, y, left: 40, right: 960,
    major: [155, 160, 165, 170, 175], minor: range(156, 174).filter((v) => v % 5),
  });
  /* merkez işareti: eksenin üstünde ince direk + etiket */
  function pin(parent, label, hgt) {
    const g = G(parent);
    S('line', { x1: 0, x2: 0, y1: -(hgt || 96), y2: -16, stroke: COL.amber, 'stroke-width': 3, 'stroke-dasharray': '2 7', 'stroke-linecap': 'round' }, g);
    S('circle', { r: 7, fill: COL.amber }, g);
    T(g, 0, -(hgt || 96) - 12, label, { s: 22, f: COL.amber, w: 700 });
    return g;
  }
  /* iki nokta arasındaki uzaklık yayı + üstünde uzunluk */
  function arc(parent, x1, x2, y, color, label) {
    const g = G(parent);
    const mx = (x1 + x2) / 2;
    const p = S('path', { d: `M${x1} ${y - 22} Q${mx} ${y - 92} ${x2} ${y - 22}`, fill: 'none', stroke: color, 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, g);
    const t = T(g, mx, y - 70, label, { s: 30, f: color, w: 800, op: 0 });
    return { g, draw: (c, ms) => c.tween(ms || 700, (e) => { p.setAttribute('stroke-dashoffset', 1 - e); setOp(t, e); }, ease.inOut) };
  }
  /* eksen altına sayı etiketi (ara çentikler etiketsiz olduğu için) */
  const under = (parent, ax, v, color) => T(parent, ax.X(v), ax.y + 42, num(v), { s: 22, f: color, w: 700, op: 0 });

  const GUESS = 165, PAY = 3;
  const scenes = [];

  /* ------------------------------------------------------------------ 1. Uzaklık yön sormaz */
  scenes.push({
    title: 'Uzaklık yön sormaz',
    goal: '|x − a|, x’in a’ya uzaklığıdır; sağda da solda da aynı.',
    run: async (c) => {
      const svg = canvas(c);
      const AY = 340;
      const ax = axis(svg, HX(AY)); setOp(ax.g, 0);
      const pn = pin(svg, 'tahmin'); at(pn, ax.X(GUESS), AY); setOp(pn, 0);
      const lo = GUESS - 2, hi = GUESS + 2;
      const eq = (v, y, col) => T(svg, 500, y, `|${num(v)} − ${num(GUESS)}| = ${num(Math.abs(v - GUESS))}`, { s: 46, f: col, w: 800, op: 0 });
      const e1 = eq(lo, 86, COL.sky), e2 = eq(hi, 150, COL.orange);

      await par(c, 'Görevli boyunu <b>165 cm</b> diye tahmin etti.', { speak: 'Görevli boyunu yüz altmış beş santim diye tahmin etti.' }, async () => {
        await ax.draw(c, 700);
        await fadeTo(c, pn, 500);
      });
      const d1 = dot(svg, ax.X(lo), AY, COL.sky, true); d1.hide();
      const u1 = under(svg, ax, lo, COL.sky);
      await par(c, 'Gerçek boyun <b>163 cm</b> çıktı.', { speak: 'Gerçek boyun yüz altmış üç santim çıktı.' }, async () => {
        await d1.pop(c, 360); await fadeTo(c, u1, 300);
      });
      await c.choice({
        tag: 'Tahmin et', q: 'Görevli kaç santim yanıldı?',
        options: ['−2 cm', '2 cm', '163 cm'], answer: 1,
        hints: ['Yanılgı bir uzaklıktır; eksi olmaz.', null, 'Bu gerçek boyun. Tahminle arasındaki farka bak.'],
        right: '165 ile 163 arası 2 cm.',
      });
      const a1 = arc(svg, ax.X(lo), ax.X(GUESS), AY, COL.sky, num(GUESS - lo));
      await par(c, '165’e uzaklığı <b>mutlak değerle</b> yazarız.', { speak: 'Yüz altmış beşe uzaklığı mutlak değerle yazarız.' }, async () => {
        await a1.draw(c); await fadeTo(c, e1, 500);
      });
      const d2 = dot(svg, ax.X(hi), AY, COL.orange, true); d2.hide();
      const u2 = under(svg, ax, hi, COL.orange);
      const a2 = arc(svg, ax.X(GUESS), ax.X(hi), AY, COL.orange, num(hi - GUESS));
      await par(c, 'Boyun <b>167 cm</b> olsaydı yanılgı yine 2 santimdi.', { speak: 'Boyun yüz altmış yedi santim olsaydı yanılgı yine iki santimdi.' }, async () => {
        await d2.pop(c, 360); await fadeTo(c, u2, 300);
        await a2.draw(c); await fadeTo(c, e2, 500);
      });
      await c.say('<b>Uzaklık yön sormaz:</b> sağda da solda da 2.', { speak: 'Uzaklık yön sormaz: sağda da solda da iki.' });
      c.note(`${M_('|x − a|')}: x’in a’ya uzaklığı<br>${M_(`|${num(lo)} − ${num(GUESS)}| = ${num(GUESS - lo)}`)}`, 'Uzaklık', 'b7-1');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 2. Uzaklıktan aralığa */
  scenes.push({
    title: 'Uzaklıktan aralığa',
    goal: '|x − 165| < 3, merkezden iki yana açılan bir aralıktır.',
    run: async (c) => {
      const svg = canvas(c);
      const AY = 310;
      const lo = GUESS - PAY, hi = GUESS + PAY;
      const res = IV(lo, hi, false, false);
      const ax = axis(svg, HX(AY)); setOp(ax.g, 0);
      const band = S('line', { x1: ax.X(GUESS), x2: ax.X(GUESS), y1: AY, y2: AY, stroke: COL.mint, 'stroke-width': 12, opacity: 0 }, svg);
      const pn = pin(svg, 'tahmin'); at(pn, ax.X(GUESS), AY); setOp(pn, 0);
      const rule = T(svg, 500, 96, `|x − ${num(GUESS)}| < ${num(PAY)}`, { s: 60, f: COL.amber, w: 800, op: 0 });
      const pL = T(svg, ax.X(GUESS - PAY / 2), AY - 26, num(PAY), { s: 26, f: COL.mint, w: 800, op: 0 });
      const pR = T(svg, ax.X(GUESS + PAY / 2), AY - 26, num(PAY), { s: 26, f: COL.mint, w: 800, op: 0 });
      const uL = under(svg, ax, lo, COL.mint), uR = under(svg, ax, hi, COL.mint);
      const tIneq = T(svg, 290, 480, ineqStr(res), { s: 46, f: COL.text, w: 800, op: 0 });
      const tIv = T(svg, 740, 480, ivStr(res), { s: 52, f: COL.mint, w: 800, op: 0 });

      await par(c, 'Görevli <b>3 santimden az</b> yanılırsa kazanıyor.', { speak: 'Görevli üç santimden az yanılırsa kazanıyor.' }, async () => {
        await ax.draw(c, 700);
        await fadeTo(c, pn, 500);
      });
      const dT = dot(svg, ax.X(hi), AY, COL.text, true); dT.hide();
      await dT.pop(c, 360); await fadeTo(c, uR, 300);
      await c.choice({
        tag: 'Tahmin et', q: 'Boyun tam <b>168 cm</b>. Görevli kazanır mı?',
        options: ['Evet, kazanır', 'Hayır, kazanamaz'], answer: 1,
        hints: ['Yanılgı tam 3 cm. Kural “3’ten az” diyor.'],
        right: 'Yanılgı tam 3 cm: az değil, eşit.',
      });
      await par(c, 'Kuralı yazalım: 165’e uzaklık 3’ten küçük.', { speak: 'Kuralı yazalım: x eksi yüz altmış beşin mutlak değeri, üçten küçük.' }, () => fadeTo(c, rule, 600));
      const dL = dot(svg, ax.X(lo), AY, COL.mint, false); dL.hide();
      await par(c, 'Şerit merkezden <b>iki yana eşit</b> açılır.', { speak: 'Şerit merkezden iki yana eşit açılır.' }, async () => {
        setOp(band, 1);
        await c.tween(1100, (e) => { band.setAttribute('x1', ax.X(GUESS - PAY * e)); band.setAttribute('x2', ax.X(GUESS + PAY * e)); }, ease.inOut);
        svg.appendChild(dT.g);
        dT.recolor(COL.mint);
        await Promise.all([dL.pop(c, 300), fadeTo(c, uL, 300), fadeTo(c, pL, 400), fadeTo(c, pR, 400)]);
      });
      await par(c, 'Uçlar boş: tam 3 santim yanılgı sayılmaz.', { speak: 'Uçlar boş: tam üç santim yanılgı sayılmaz.' }, () => dT.flip(c, false, 400));
      await par(c, 'Boyun <b>162 ile 168 arasındaysa</b> görevli kazanır.', { speak: 'Boyun yüz altmış iki ile yüz altmış sekiz arasındaysa görevli kazanır.' }, async () => {
        await fadeTo(c, tIneq, 500); await fadeTo(c, tIv, 500);
      });
      c.note(`${M_('|x − a| < r')} ⇔ ${M_('a − r < x < a + r')}<br>${M_(`|x − ${num(GUESS)}| < ${num(PAY)}`)} → ${M_(ivStr(res))}`, 'Mutlak değerle aralık', 'b7-2');
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 3. Merkez ve pay */
  scenes.push({
    title: 'Merkez ve pay',
    goal: 'a merkezdir, r pay; aralık da mutlak değerle yazılır.',
    run: async (c) => {
      const svg = canvas(c);
      const AY = 310;
      const all = G(svg);
      const ax = axis(all, AX10(AY));
      const st = { a: 3, r: 1, closed: false };
      const rule = T(all, 500, 100, '', { s: 64, f: COL.amber, w: 800 });
      const band = S('line', { y1: AY, y2: AY, stroke: COL.mint, 'stroke-width': 12 }, all);
      const d1 = dot(all, 0, AY, COL.mint, false), d2 = dot(all, 0, AY, COL.mint, false);
      const pn = pin(all, 'merkez', 84);
      const pay = T(all, 0, AY - 26, 'pay', { s: 22, f: COL.mint, w: 700 });
      const tIneq = T(all, 290, 480, '', { s: 46, f: COL.text, w: 800 });
      const tIv = T(all, 740, 480, '', { s: 52, f: COL.mint, w: 800 });
      const draw = () => {
        const lo = st.a - st.r, hi = st.a + st.r;
        const iv = IV(lo, hi, st.closed, st.closed);
        band.setAttribute('x1', ax.X(lo)); band.setAttribute('x2', ax.X(hi));
        d1.move(ax.X(lo)); d2.move(ax.X(hi));
        at(pn, ax.X(st.a), AY);
        pay.setAttribute('x', ax.X(st.a + st.r / 2));
        rule.textContent = `|x − ${num(st.a)}| ${st.closed ? '≤' : '<'} ${num(st.r)}`;
        tIneq.textContent = ineqStr(iv); tIv.textContent = ivStr(iv);
      };
      draw(); setOp(all, 0);

      await par(c, 'Aynı fikir her sayıda çalışır: <b>merkez 3, pay 1</b>.', { speak: 'Aynı fikir her sayıda çalışır: merkez üç, pay bir.' }, () => fadeTo(c, all, 700));
      await c.say('3’e uzaklığı 1’den küçük sayılar: <b>2 ile 4 arası</b>.', { speak: 'Üçe uzaklığı birden küçük olan sayılar, iki ile dört arasındadır.' });
      const slA = c.slider({ label: 'Merkez a', min: 2, max: 8, step: 1, value: st.a, fmt: (x) => num(x), onInput: (x) => { st.a = x; draw(); } });
      const slR = c.slider({ label: 'Pay r', tag: false, min: 0.5, max: 2, step: 0.5, value: st.r, fmt: (x) => num(x), onInput: (x) => { st.r = x; draw(); } });
      c.say('Merkezi ve payı değiştir; şeridi izle.', { noWait: true });
      await c.cont('Devam ›');
      slA.remove(); slR.remove();
      const a0 = st.a, r0 = st.r;
      if (a0 !== 3 || r0 !== 1) await c.tween(600, (e) => { st.a = lerp(a0, 3, e); st.r = lerp(r0, 1, e); draw(); }, ease.inOut);
      st.a = 3; st.r = 1; draw();
      await c.choice({
        tag: 'Tahmin et', q: `İşaret ${M_('≤')} olursa ne değişir?`,
        options: ['Şerit genişler', 'Uç noktalar dolar', 'Merkez kayar'], answer: 1,
        hints: ['Pay hâlâ 1; şeridin boyu aynı.', null, 'Merkez hâlâ 3.'],
        right: 'Uzaklığı tam 1 olan 2 ve 4 de içeri girer.',
      });
      await par(c, 'Eşitlik gelince uçlar dolar: <b>[2, 4]</b>.', { speak: 'Eşitlik gelince uçlar dolar: köşeli iki virgül dört köşeli.' }, async () => {
        st.closed = true; draw();
        await Promise.all([d1.flip(c, true, 400), d2.flip(c, true, 400)]);
      });
      /* tersinden: aralık verilir, mutlak değerle yazılır (programın yönü: 2 < x < 4 → |x − 3| < 1) */
      const LO = 10, HI = 20, MID = (LO + HI) / 2, HALF = (HI - LO) / 2;
      const giv = IV(LO, HI, false, false);
      await fadeTo(c, all, 450, 1, 0); all.remove();
      const g2 = G(svg);
      const ax2 = axis(g2, { x0: 80, x1: 920, vmin: 5, vmax: 25, y: AY, left: 40, right: 960, major: [5, 10, 15, 20, 25], minor: range(6, 24).filter((v) => v % 5) });
      T(g2, 500, 100, ineqStr(giv), { s: 60, w: 800 });
      S('line', { x1: ax2.X(LO), x2: ax2.X(HI), y1: AY, y2: AY, stroke: COL.mint, 'stroke-width': 12 }, g2);
      dot(g2, ax2.X(LO), AY, COL.mint, false); dot(g2, ax2.X(HI), AY, COL.mint, false);
      const pn2 = pin(g2, 'merkez', 84); at(pn2, ax2.X(MID), AY); setOp(pn2, 0);
      const h1 = T(g2, ax2.X(MID - HALF / 2), AY - 26, num(HALF), { s: 26, f: COL.mint, w: 800, op: 0 });
      const h2 = T(g2, ax2.X(MID + HALF / 2), AY - 26, num(HALF), { s: 26, f: COL.mint, w: 800, op: 0 });
      const rule2 = T(g2, 500, 486, `|x − ${num(MID)}| < ${num(HALF)}`, { s: 60, f: COL.amber, w: 800, op: 0 });
      setOp(g2, 0);
      await par(c, 'Şimdi tersinden: bu kez <b>aralık</b> verildi.', { speak: 'Şimdi tersinden: bu kez aralık verildi.' }, () => fadeTo(c, g2, 600));
      await c.choice({
        tag: 'Tahmin et', q: 'Bu aralık mutlak değerle nasıl yazılır?',
        options: [M_(`|x − ${num(LO)}| < ${num(HI)}`), M_(`|x − ${num(MID)}| < ${num(HALF)}`), M_(`|x − ${num(HALF)}| < ${num(MID)}`)], answer: 1,
        hints: [`${num(LO)} sol uç. Merkez, aralığın tam ortasıdır.`, null, 'Merkez ile pay yer değiştirmiş.'],
        right: `Merkez ${num(MID)}, pay ${num(HALF)}.`,
      });
      await par(c, `Merkez tam ortada: <b>${num(MID)}</b>. Pay yarı genişlik: <b>${num(HALF)}</b>.`, { speak: 'Merkez tam ortada: on beş. Pay yarı genişlik: beş.' }, async () => {
        await fadeTo(c, pn2, 400);
        await Promise.all([fadeTo(c, h1, 400), fadeTo(c, h2, 400)]);
        await fadeTo(c, rule2, 500);
      });
      await c.say('<b>Mutlak değer, hedefe uzaklıktır.</b>', { speak: 'Mutlak değer, hedefe uzaklıktır.' });
      await c.cont('Devam ›');
    },
  });

  /* ------------------------------------------------------------------ 4. Hikâye */
  scenes.push({ title: 'Hikâye: Kombi 22 derecede', goal: 'Mutlak değerin hayattaki yerini gör.', video: 'hikaye/b7-kombi-22/renders/b7-kombi-22.mp4' });

  return {
    title: 'Mutlak değerle aralık',
    hook: 'Lunaparkta boy tahmini standı: görevli boyunu <b>165 cm</b> diye tahmin ediyor, 3 cm’den az yanılırsa o kazanıyor. Hangi boylarda kazanır?',
    scenes,
    quiz: [
      {
        q: `${M_('|x − 5| < 2')} hangi aralıktır?`,
        options: [M_('(−∞, 7)'), M_('(3, 7)'), M_('[3, 7]'), M_('(2, 5)')], answer: 1,
        why: [
          'Tek yöne bakmışsın. 5’in solunda da sınır var: 3.',
          '5’e uzaklığı 2’den az olanlar: 3 ile 7 arası, uçlar hariç.',
          'İşaret &lt;. Uzaklığı tam 2 olan 3 ve 7 dışarıda kalır.',
          'Merkez 5, pay 2: uçlar 5 − 2 ve 5 + 2.'],
        scene: 1,
      },
      {
        q: `21,4 sayısı ${M_('|x − 22| < 1')} koşulunu sağlar mı?`,
        options: ['Evet; 22’ye uzaklığı 0,6.', 'Hayır; 21,4 sayısı 22’den küçük.', 'Hayır; uzaklığı −0,6.', 'Evet; çünkü 21,4 pozitif.'], answer: 0,
        why: [
          '|21,4 − 22| = 0,6 ve 0,6 &lt; 1.',
          'Uzaklık yön sormaz; 22’nin solunda olması sorun değil.',
          'Uzaklık eksi olmaz: |−0,6| = 0,6.',
          'Sonuç doğru ama neden yanlış: önemli olan 22’ye uzaklık.'],
        scene: 0,
      },
    ],
    summary: [
      '<b>Mutlak değer, hedefe uzaklıktır.</b>',
      `${M_('|x − a| < r')} ⇔ ${M_('a − r < x < a + r')}`,
      `<b>İki yönde:</b> ${M_('|x − 3| < 1')} ⇔ ${M_('2 < x < 4')}; ≤ olursa ${M_('[2, 4]')}`,
    ],
    next: { href: 'c1-her-kutu-bir-ihtiyac.html', label: 'Sonraki bölüm: Sayı kümeleri ›' },
  };
};
