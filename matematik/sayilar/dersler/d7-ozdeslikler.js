/* D7 — Özdeşlikler
   (a + b)² dört parça; (a − b)² iki şerit kes, köşeyi geri ekle; a² − b² köşeden kare kes, parçayı döndür.
   Renk rolleri bölümle aynı: a amber, b camgöbeği.
   Çizim araçları (K) dersler/04-islem-ozellikleri-cebirsel.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).d7 = (K) => {
  'use strict';
  const { A, B, OK, BAD, INK, MUTE, MIN, lerp, ease, mix, par, say, g, T, TS, setParts, R, L, place, hide, base, sidePanel, satir, fade, brH, brV, sliders } = K;
  const AB = mix(A, 0.5, B);
  const a_ = ['a', A], b_ = ['b', B];

  /* ------------------------------------------------------------------ 1. Dört parça */
  async function dortParca(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const u = 44, ox = 170, oy = 150, wa = 3 * u, wb = 4 * u, S = wa + wb;
    const dis = R(svg, ox, oy, S, S, { rx: 4, fill: '#fff', fo: 0.05, stroke: INK, sw: 3 });
    const olcu = g(svg);
    brH(olcu, ox, ox + wa, oy - 14, A, true, 4); T(olcu, ox + wa / 2, oy - 30, 'a', { anchor: 'middle', size: 32, fill: A, w: 800 });
    brH(olcu, ox + wa, ox + S, oy - 14, B, true, 4); T(olcu, ox + wa + wb / 2, oy - 30, 'b', { anchor: 'middle', size: 32, fill: B, w: 800 });
    brV(olcu, ox - 14, oy, oy + wa, A, true, 4); T(olcu, ox - 32, oy + wa / 2 + 11, 'a', { anchor: 'end', size: 32, fill: A, w: 800 });
    brV(olcu, ox - 14, oy + wa, oy + S, B, true, 4); T(olcu, ox - 32, oy + wa + wb / 2 + 11, 'b', { anchor: 'end', size: 32, fill: B, w: 800 });
    const parca = (x, y, w, hh, col, parts, val) => {
      const gg = g(svg);
      const r = R(gg, ox + x, oy + y, w, hh, { rx: 4, fill: col, fo: 0.4, stroke: col, sw: 2.5 });
      TS(gg, ox + x + w / 2, oy + y + hh / 2 - 2, parts, { anchor: 'middle', size: 30, w: 800 });
      const v = T(gg, ox + x + w / 2, oy + y + hh / 2 + 36, String(val), { anchor: 'middle', size: 30, w: 800 }); v.style.opacity = 0;
      hide(gg); return { g: gg, r, v };
    };
    const pc = {
      aa: parca(0, 0, wa, wa, A, [['a²', A]], 9), ab1: parca(wa, 0, wb, wa, AB, [a_, '·', b_], 12),
      ab2: parca(0, wa, wa, wb, AB, [a_, '·', b_], 12), bb: parca(wa, wa, wb, wb, B, [['b²', B]], 16),
    };
    const hepsi = Object.values(pc);
    const cz = [L(svg, ox + wa, oy - 6, ox + wa, oy - 6, INK, 3.5, '8 6'), L(svg, ox - 6, oy + wa, ox - 6, oy + wa, INK, 3.5, '8 6')];
    hide(dis, olcu);
    const r1 = satir(pr, 112, ['(', a_, ' + ', b_, ')²'], 38);
    await par(say(c, 'Kenarı <span class="ca">a</span> + <span class="cb">b</span> olan kare: alanı (a + b)².'), (async () => { await fade(c, dis, 500); await fade(c, olcu, 500); await fade(c, r1, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Kenarları a ve b’den bölersek kare kaç parçaya ayrılır?', options: ['2', '3', '4'], answer: 2,
      hints: ['Bir dikey, bir yatay çizgi çekiyoruz.', 'Bir dikey, bir yatay çizgi çekiyoruz.', ''],
      right: 'İki çizgi: 2 × 2 = 4 parça.',
    });
    await par(say(c, 'İki kare, iki dikdörtgen: <b>dört parça</b>.'), (async () => {
      await c.tween(500, (e) => cz[0].setAttribute('y2', lerp(oy - 6, oy + S + 6, e)), ease.inOut);
      await c.tween(500, (e) => cz[1].setAttribute('x2', lerp(ox - 6, ox + S + 6, e)), ease.inOut);
      await fade(c, hepsi.map((q) => q.g), 500); hide(...cz, dis);
      await c.tween(600, (e) => { const k = 10 * e; pc.ab1.g.setAttribute('transform', `translate(${k} 0)`); pc.ab2.g.setAttribute('transform', `translate(0 ${k})`); pc.bb.g.setAttribute('transform', `translate(${k} ${k})`); }, ease.out);
      await fade(c, satir(pr, 166, [['= ', OK], ['a²', A], ' + ', a_, b_, ' + ', a_, b_, ' + ', ['b²', B]], 28), 400);
      await fade(c, satir(pr, 210, [['= ', OK], ['a²', A], ' + 2', a_, b_, ' + ', ['b²', B]], 32), 400);
    })());
    await par(say(c, 'Sayıyla dene: a = 3, b = 4. Toplam 49.'), (async () => {
      await fade(c, hepsi.map((q) => q.v), 500);
      await fade(c, satir(pr, 296, ['9 + 12 + 12 + 16 = ', ['49', OK]], 28), 400);
      await fade(c, satir(pr, 340, ['(3 + 4)² = 7² = 49'], 28), 400);
    })());
    await par(say(c, 'Yalnızca kareleri sayarsan 25: eksik 24, dikdörtgenlerde.', { ton:'thoughtful' }), (async () => {
      [pc.ab1, pc.ab2].forEach((q) => { q.r.setAttribute('stroke', BAD); q.r.setAttribute('stroke-width', 4); q.r.setAttribute('stroke-dasharray', '9 6'); });
      await fade(c, satir(pr, 426, [['a² + b² = 25', BAD]], 28), 400);
      await fade(c, satir(pr, 468, [['eksik: 2ab = 24', BAD]], 26), 400);
    })());
    c.note('(<span class="ca">a</span> + <span class="cb">b</span>)² = <span class="ca">a</span>² + 2<span class="ca">a</span><span class="cb">b</span> + <span class="cb">b</span>²<br>(3 + 4)² = 9 + 24 + 16', 'Toplamın karesi', 'kural-toplam-kare');
  }

  /* ------------------------------------------------------------------ 2. Özdeşlik nedir? */
  async function ozdeslikNedir(c) {
    const svg = base(c);
    const bas = T(svg, 500, 84, 'İddia', { anchor: 'middle', size: 26, fill: MUTE, w: 600 });
    TS(svg, 290, 190, ['(', a_, ' + ', b_, ')²'], { anchor: 'middle', size: 50, w: 800 });
    const isr = T(svg, 500, 194, '=', { anchor: 'middle', size: 64, w: 800 });
    const sag = TS(svg, 720, 190, [''], { anchor: 'middle', size: 50, w: 800 });
    const solV = T(svg, 290, 282, '', { anchor: 'middle', size: 46, w: 800 }), sagV = T(svg, 720, 282, '', { anchor: 'middle', size: 46, w: 800 });
    const deg = TS(svg, 500, 372, [''], { anchor: 'middle', size: 30, w: 700 });
    const dmg = T(svg, 500, 462, '', { anchor: 'middle', size: 36, w: 800 });
    const st = { a: 1, b: 0, dogru: false };
    function upd() {
      const { a, b } = st, sol = (a + b) * (a + b), sg = st.dogru ? a * a + 2 * a * b + b * b : a * a + b * b;
      setParts(sag, st.dogru ? [['a²', A], ' + 2', a_, b_, ' + ', ['b²', B]] : [['a²', A], ' + ', ['b²', B]]);
      solV.textContent = String(sol); sagV.textContent = String(sg);
      const es = sol === sg; isr.textContent = es ? '=' : '≠'; isr.style.fill = es ? OK : BAD; sagV.style.fill = es ? INK : BAD;
      setParts(deg, [['a = ' + a, A], '     ', ['b = ' + b, B]]);
    }
    upd();
    await say(c, 'Bir iddia: a = 1, b = 0 için tutuyor.', { ton:'curious' });
    await c.choice({
      tag: 'Tahmin et', q: 'Bir örnekte tuttu. Bu eşitlik her a ve b için doğru mu?', options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Tek örnek kanıtlamaz. Başka değerler dene: a = 3, b = 4.', ''],
      right: 'a = 3, b = 4 için 49 ≠ 25.',
    });
    st.a = 3; st.b = 4; upd(); dmg.textContent = 'özdeşlik değil'; dmg.style.fill = BAD;
    await say(c, 'Tek karşı örnek yetti: bu bir özdeşlik değil.');
    st.dogru = true; upd(); dmg.textContent = ''; bas.textContent = 'Doğrusu';
    await say(c, 'Doğrusu: ortadaki 2ab ile birlikte.');
    const sl = sliders(c, 'Dene', [{ k: 'a', min: 0, max: 9, step: 1, v: 3, col: A }, { k: 'b', min: 0, max: 9, step: 1, v: 4, col: B }], (k, v) => { st.a = v.a; st.b = v.b; upd(); });
    await say(c, 'Kaydır: iki taraf hep eşit kalıyor mu?', { noWait: true });
    await c.cont('Devam ›');
    sl.el.remove();
    dmg.textContent = '∀a, b ∈ ℝ:  özdeşlik'; dmg.style.fill = OK;
    await say(c, '<b>Özdeşlik</b>: her a ve b için doğru olan eşitlik.');
    await say(c, 'Kanıtı örnekler değil, az önceki kare.');
    c.note('<b>Özdeşlik:</b> her değer için doğru olan eşitlik.<br>(a + b)² ≠ a² + b²: a = 3, b = 4', 'Özdeşlik', 'kural-ozdeslik');
  }

  /* ------------------------------------------------------------------ 3. Farkın karesi */
  async function farkinKaresi(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const u = 40, ox = 150, oy = 140, S = 7 * u, k = 5 * u, bu = 2 * u;
    const kare = R(svg, ox, oy, S, S, { rx: 4, fill: A, fo: 0.28, stroke: A, sw: 3 });
    const ust = g(svg); brH(ust, ox, ox + S, oy - 14, A, true, 4); T(ust, ox + S / 2, oy - 30, 'a', { anchor: 'middle', size: 32, fill: A, w: 800 });
    const kalan = g(svg); const kr = R(kalan, ox, oy, k, k, { rx: 4, fill: OK, fo: 0.12, stroke: OK, sw: 3.5, dash: '9 6' });
    const kT = TS(kalan, ox + k / 2, oy + k / 2 + 10, ['(', a_, ' ' + MIN + ' ', b_, ')²'], { anchor: 'middle', size: 30, w: 800 });
    const sag = g(svg); R(sag, ox + k, oy, bu, S, { rx: 4, fill: BAD, fo: 0.22, stroke: BAD, sw: 3, dash: '9 6' });
    TS(sag, ox + k + bu / 2, oy + k / 2 + 10, [a_, '·', b_], { anchor: 'middle', size: 26, w: 800 });
    brH(sag, ox + k, ox + S, oy + S + 14, B, false, 4); T(sag, ox + k + bu / 2, oy + S + 44, 'b', { anchor: 'middle', size: 28, fill: B, w: 800 });
    const alt = g(svg); R(alt, ox, oy + k, S, bu, { rx: 4, fill: BAD, fo: 0.22, stroke: BAD, sw: 3, dash: '9 6' });
    TS(alt, ox + k / 2, oy + k + bu / 2 + 10, [a_, '·', b_], { anchor: 'middle', size: 26, w: 800 });
    brV(alt, ox + S + 14, oy + k, oy + S, B, false, 4); T(alt, ox + S + 30, oy + k + bu / 2 + 10, 'b', { size: 28, fill: B, w: 800 });
    const kose = g(svg); R(kose, ox + k, oy + k, bu, bu, { rx: 4, fill: B, fo: 0.75, stroke: '#fff', sw: 3 });
    T(kose, ox + k + bu / 2, oy + k + bu / 2 + 10, 'b²', { anchor: 'middle', size: 28, fill: '#06101f', w: 800 });
    hide(kare, ust, kalan, sag, alt, kose);
    await par(say(c, 'Kenarı a olan kare. İçinden (a − b)² kalsın istiyoruz.'), (async () => {
      await fade(c, [kare, ust], 500); await fade(c, kalan, 500);
      await fade(c, satir(pr, 112, ['(', a_, ' ' + MIN + ' ', b_, ')² = ?'], 36), 400);
    })());
    await par(say(c, 'İki şerit kes: her biri a · b.'), (async () => {
      await fade(c, sag, 500); await c.wait(300); await fade(c, alt, 500);
      await fade(c, satir(pr, 176, [['a²', A], ' ' + MIN + ' ', a_, b_, ' ' + MIN + ' ', a_, b_], 32), 400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Sağ alt köşedeki küçük kare kaç kez kesildi?', options: ['1 kez', '2 kez'], answer: 1,
      hints: ['Hem sağ şeridin hem alt şeridin içinde.', ''],
      right: 'İki şeridin de içinde: iki kez.',
    });
    await par(say(c, 'Köşe iki kez kesildi: bir b² geri ekle.'), (async () => {
      await fade(c, kose, 500);
      await fade(c, satir(pr, 220, [['+ ', OK], ['b²', B]], 32), 400);
      await fade(c, satir(pr, 300, ['(a ' + MIN + ' b)² = a² ' + MIN + ' 2ab + b²'], 26), 400);
    })());
    await par(say(c, 'Sayıyla: (7 − 2)² = 49 − 28 + 4 = 25.'), (async () => {
      setParts(kT, [['25', OK]]); kr.removeAttribute('stroke-dasharray'); kr.setAttribute('fill-opacity', 0.35);
      await fade(c, satir(pr, 380, ['49 ' + MIN + ' 28 + 4 = ', ['25', OK]], 30), 400);
      await fade(c, satir(pr, 424, ['(7 ' + MIN + ' 2)² = 5² = 25'], 28), 400);
    })());
    c.note('(<span class="ca">a</span> − <span class="cb">b</span>)² = <span class="ca">a</span>² − 2<span class="ca">a</span><span class="cb">b</span> + <span class="cb">b</span>²<br>(7 − 2)² = 49 − 28 + 4', 'Farkın karesi', 'kural-fark-kare');
  }

  /* ------------------------------------------------------------------ 4. İki kare farkı */
  async function ikiKareFarki(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const u = 40, ox = 70, oy = 170, S = 7 * u, k = 4 * u, bu = 3 * u;
    const ustP = R(svg, ox, oy, S, k, { rx: 4, fill: A, fo: 0.35, stroke: A, sw: 3 });
    const altP = g(svg); R(altP, -k / 2, -bu / 2, k, bu, { rx: 4, fill: AB, fo: 0.45, stroke: AB, sw: 3 });
    place(altP, ox + k / 2, oy + k + bu / 2);
    const kose = g(svg); R(kose, ox + k, oy + k, bu, bu, { rx: 4, fill: B, fo: 0.3, stroke: B, sw: 3 });
    const koseT = T(kose, ox + k + bu / 2, oy + k + bu / 2 + 10, 'b²', { anchor: 'middle', size: 30, fill: B, w: 800 });
    const o1 = g(svg); brH(o1, ox, ox + S, oy - 14, A, true, 4); T(o1, ox + S / 2, oy - 30, 'a', { anchor: 'middle', size: 32, fill: A, w: 800 });
    brV(o1, ox - 14, oy, oy + S, A, true, 4); T(o1, ox - 30, oy + S / 2 + 10, 'a', { anchor: 'end', size: 32, fill: A, w: 800 });
    const o2 = g(svg); brH(o2, ox, ox + S + bu, oy - 14, INK, true, 4); TS(o2, ox + (S + bu) / 2, oy - 30, [a_, ' + ', b_], { anchor: 'middle', size: 32, w: 800 });
    brV(o2, ox - 14, oy, oy + k, INK, true, 4); T(o2, 14, oy + k + 34, 'a ' + MIN + ' b', { size: 26, w: 800 });
    hide(ustP, altP, kose, o1, o2);
    await par(say(c, 'a²’nin köşesinden b² kes: kalan a² − b².'), (async () => {
      await fade(c, [ustP, altP, kose, o1], 600); await c.wait(500);
      kose.firstChild.setAttribute('stroke-dasharray', '9 6'); kose.firstChild.setAttribute('fill-opacity', 0.04); koseT.textContent = 'kesildi'; koseT.setAttribute('font-size', 22);
      await fade(c, satir(pr, 112, [['a²', A], ' ' + MIN + ' ', ['b²', B]], 40), 400);
    })());
    await par(say(c, 'Alttaki parçayı döndür, yana ekle.'), (async () => {
      await par(fade(c, kose, 400, 0), fade(c, o1, 400, 0));
      await c.tween(1400, (e) => place(altP, lerp(ox + k / 2, ox + S + bu / 2, e), lerp(oy + k + bu / 2, oy + k / 2, e) + Math.sin(e * Math.PI) * 60, 1, 90 * e), ease.inOut);
    })());
    await par(say(c, 'Kenarları a − b ve a + b olan dikdörtgen.'), (async () => {
      await fade(c, o2, 500);
      await fade(c, satir(pr, 172, [['= ', OK], '(', a_, ' ' + MIN + ' ', b_, ')(', a_, ' + ', b_, ')'], 30), 400);
      await fade(c, satir(pr, 240, ['49 ' + MIN + ' 9 = 4 · 10 = 40'], 28), 400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'A6’daki eşlenik: (√3 − 1)(√3 + 1) kaç eder?', options: ['2', '4', '3 − 2√3'], answer: 0,
      hints: ['', 'İki kare farkı: (√3)² − 1². Toplama değil, çıkarma.', 'Bu, farkın karesine benziyor. Burada çarpanlardan biri artı, biri eksi.'],
      right: '(√3)² − 1² = 3 − 1 = 2.',
    });
    await par(say(c, 'A6’daki eşlenik de buydu: iki kare farkı.'), (async () => {
      await fade(c, satir(pr, 330, ['(√3 ' + MIN + ' 1)(√3 + 1)'], 28), 400);
      await fade(c, satir(pr, 372, [['= ', OK], '3 ' + MIN + ' 1 = 2'], 28), 400);
    })());
    c.note('<span class="ca">a</span>² − <span class="cb">b</span>² = (<span class="ca">a</span> − <span class="cb">b</span>)(<span class="ca">a</span> + <span class="cb">b</span>)<br>(√3 − 1)(√3 + 1) = 3 − 1', 'İki kare farkı', 'kural-iki-kare');
  }

  return {
    title: 'Özdeşlikler',
    hook: '<b>(3 + 4)²</b> ile <b>3² + 4²</b> eşit mi? Değilse aradaki fark nereden geliyor?',
    scenes: [
      { title: 'Dört parça', goal: '(a + b)² karesini dört parçaya ayır: a², iki tane ab, b².', run: dortParca },
      { title: 'Özdeşlik nedir?', goal: 'Her değer için doğru olan eşitlik; tek karşı örnek bozar.', run: ozdeslikNedir },
      { title: 'Farkın karesi', goal: 'İki şerit kes, iki kez kesilen köşeyi geri ekle.', run: farkinKaresi },
      { title: 'İki kare farkı', goal: 'Köşeden kare kes, parçayı döndür: (a − b)(a + b).', run: ikiKareFarki },
    ],
    quiz: [
      {
        q: '<b>(x + 3)²</b> açılımı hangisidir?',
        options: ['x² + 9', 'x² + 3x + 9', 'x² + 6x + 9', 'x² + 6x + 6'], answer: 2,
        why: [
          'İki dikdörtgen unutuldu: 2 · x · 3 = 6x.',
          'Dikdörtgenlerden yalnızca biri sayıldı; iki tane var: 6x.',
          'x² + 2 · x · 3 + 3² = x² + 6x + 9.',
          'Son terim 3² = 9 olmalı.'],
        scene: 0,
      },
      {
        q: '<b>a² − b²</b> hangisine eşittir?',
        options: ['(a − b)²', '(a − b)(a + b)', '(a + b)²', 'a² − 2ab + b²'], answer: 1,
        why: [
          '(a − b)² = a² − 2ab + b²: ortada −2ab var.',
          'Köşeden b² kes, parçayı döndür: kenarlar a − b ve a + b.',
          '(a + b)² = a² + 2ab + b².',
          'Bu, (a − b)² açılımıdır.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>(a + b)² dört parçadır, iki değil.</b>',
      '(a + b)² = a² + 2ab + b² &nbsp;ve&nbsp; (a − b)² = a² − 2ab + b²',
      'a² − b² = (a − b)(a + b). Özdeşlik, her değer için doğru olan eşitliktir.',
    ],
    next: { href: 'd8-carpanlara-ayirma.html', label: 'Sonraki: Çarpanlara ayırma ›' },
  };
};
