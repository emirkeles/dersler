/* D1 — Önerme: doğru ya da yanlış
   Önerme, değil, her (∀) ve bazı (∃). İddia kartları D ya da Y damgası alır.
   Çizim araçları (K) dersler/04-islem-ozellikleri-cebirsel.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).d1 = (K) => {
  'use strict';
  const { A, B, OK, BAD, INK, MUTE, MIN, par, say, g, T, TS, setParts, R, L, P, Ci, hide, base, sidePanel, satir, fade, popIn, fitText, soruTahtasi } = K;

  /* iddia kartı: solda cümle, sağda D / Y damgası */
  function kart(p, x, y, w, hh, parts, size = 34) {
    const gg = g(p);
    const kutu = R(gg, x, y, w, hh, { rx: 18, fill: '#10193d', stroke: '#33437f', sw: 2 });
    const yazi = TS(gg, x + (w - 80) / 2, y + hh / 2 + size * 0.35, parts, { anchor: 'middle', size, w: 700 });
    fitText(yazi, w - 120);
    const cx = x + w - 48, cy = y + hh / 2;
    const dg = g(gg); const dc = Ci(dg, cx, cy, 26, { fill: '#0b1230', stroke: OK, sw: 3 }); const dt = T(dg, cx, cy + 11, '', { anchor: 'middle', size: 30, w: 800 });
    hide(dg);
    return {
      g: gg,
      damga(c, harf) {
        const col = harf === 'D' ? OK : BAD;
        dc.setAttribute('stroke', col); dt.textContent = harf; dt.style.fill = col; kutu.setAttribute('stroke', col);
        return popIn(c, dg, cx, cy, 450);
      },
      disi() { kutu.setAttribute('stroke-dasharray', '8 6'); kutu.setAttribute('stroke', MUTE); yazi.style.opacity = 0.55; },
    };
  }

  /* ------------------------------------------------------------------ 1. Önerme mi? */
  async function onermeMi(c) {
    const svg = base(c);
    const k = [
      kart(svg, 60, 110, 420, 130, ['2 + 3 = 5']),
      kart(svg, 520, 110, 420, 130, ['7 çift sayıdır']),
      kart(svg, 60, 290, 420, 130, ['√2 rasyoneldir']),
      kart(svg, 520, 290, 420, 130, ['x + 2 = 5']),
    ];
    k.forEach((q) => hide(q.g));
    const alt = T(svg, 500, 492, '', { anchor: 'middle', size: 28, fill: MUTE, w: 600 });
    await par(say(c, '<b>Önerme</b>: doğru ya da yanlış olduğu kesin olan cümle.'), (async () => {
      for (const q of k) { await fade(c, q.g, 350); await c.wait(150); }
    })());
    await par(say(c, '2 + 3 = 5 doğru: D damgası alır.'), k[0].damga(c, 'D'));
    await c.choice({
      tag: 'Tahmin et', q: '“7 çift sayıdır” cümlesi yanlış. Peki bir önerme mi?',
      options: ['Evet: yanlış bir önerme', 'Hayır: yanlış olduğu için önerme değil'], answer: 0,
      hints: ['', 'Yanlış olduğu kesin. Önerme için gereken de bu: kesinlik.'],
      right: 'Yanlışlığı kesin: Y damgası alır.',
    });
    await par(say(c, 'Yanlış cümle de önermedir: yanlışlığı kesin.'), (async () => { await k[1].damga(c, 'Y'); await c.wait(300); await k[2].damga(c, 'Y'); })());
    await c.choice({
      tag: 'Tahmin et', q: '“x + 2 = 5” doğru mu, yanlış mı?',
      options: ['Doğru', 'Yanlış', 'x bilinmeden karar verilemez'], answer: 2,
      hints: ['x = 3 ise doğru; ama x = 1 ise yanlış.', 'x = 1 ise yanlış; ama x = 3 ise doğru.', ''],
      right: 'x’e göre değişiyor: kesin değil.',
    });
    k[3].disi(); alt.textContent = 'x + 2 = 5: önerme değil';
    await say(c, 'x bilinmeden karar verilemez: bu bir önerme değil.');
    c.note('<b>Önerme:</b> doğru ya da yanlış olduğu kesin cümle.<br>“7 çift sayıdır”: yanlış bir önerme.', 'Önerme', 'kural-onerme');
  }

  /* ------------------------------------------------------------------ 2. Değil */
  async function degil(c) {
    const svg = base(c);
    const p = kart(svg, 60, 60, 400, 110, [['p:  ', MUTE], '7 çift sayıdır'], 28);
    const q = kart(svg, 540, 60, 400, 110, [['p′:  ', MUTE], '7 çift sayı değildir'], 28);
    const ok_ = g(svg); L(ok_, 470, 115, 522, 115, INK, 3); P(ok_, 'M530,115 L514,106 L514,124 Z', { fill: INK }); T(ok_, 498, 98, 'değil', { anchor: 'middle', size: 22, fill: MUTE, w: 600 });
    hide(q.g, ok_);
    await par(say(c, 'p yanlış bir önerme: Y damgası.'), p.damga(c, 'Y'));
    await par(say(c, '<b>Değili</b> doğruluğu ters çevirir: p′ doğru.'), (async () => { await fade(c, ok_, 300); await fade(c, q.g, 400); await q.damga(c, 'D'); })());

    /* sayı doğrusu: 3'ten büyük olanlar ve olmayanlar */
    const nl = g(svg); hide(nl);
    const X = (v) => 140 + v * 120, NY = 440, BY = NY - 38;
    L(nl, 100, NY, 900, NY, '#6d7bb8', 3);
    for (let v = 0; v <= 6; v++) { L(nl, X(v), NY - 8, X(v), NY + 8, '#6d7bb8', 2.5); T(nl, X(v), NY + 40, String(v), { anchor: 'middle', size: 22, fill: v === 3 ? INK : MUTE, w: v === 3 ? 800 : 500 }); }
    const buyuk = g(nl); L(buyuk, X(3) + 14, BY, 900, BY, A, 12); Ci(buyuk, X(3), BY, 11, { fill: '#121a3d', stroke: A, sw: 4 });
    T(buyuk, X(4.5), BY - 26, '3’ten büyük:  > 3', { anchor: 'middle', size: 26, fill: A, w: 700 });
    const kalan = g(nl); L(kalan, 100, BY, X(3), BY, B, 12); Ci(kalan, X(3), BY, 11, { fill: B });
    T(kalan, X(1.4), BY - 26, 'büyük değil:  ≤ 3', { anchor: 'middle', size: 26, fill: B, w: 700 });
    hide(kalan);
    const soru = TS(svg, 500, 262, [''], { anchor: 'middle', size: 34, w: 700 });
    await par(say(c, 'Sayı doğrusunda: 3’ten büyük olanlar sağda.'), fade(c, nl, 500));
    setParts(soru, ['“3 > 3”  ', ['yanlış', BAD]]);
    await c.choice({
      tag: 'Tahmin et', q: '“3 > 3” yanlış. Değili doğru olmalı. Hangisi?', options: ['3 < 3', '3 ≤ 3'], answer: 1,
      hints: ['3 < 3 de yanlış. Değil, doğruluğu ters çevirmeli.', ''],
      right: '3 ≤ 3 doğru: 3, 3’e eşit.',
    });
    setParts(soru, ['“3 > 3”  ', ['yanlış', BAD], '        “3 ≤ 3”  ', ['doğru', OK]]);
    await par(say(c, '“Büyük değil” demek: küçük <b>ya da eşit</b>.'), fade(c, kalan, 600));
    c.note('p yanlışsa p′ doğrudur.<br>“&gt;” işaretinin değili “≤”.', 'Değil', 'kural-degil');
  }

  /* ------------------------------------------------------------------ 3. Her: ∀ */
  async function her(c) {
    const svg = base(c);
    const px = sidePanel(svg, 'Örnekler'); const pr = px.rows;
    const soz = T(svg, 330, 150, 'Her gerçek sayının karesi pozitiftir.', { anchor: 'middle', size: 30, w: 700 }); fitText(soz, 570);
    const sem = TS(svg, 330, 260, [['∀', OK], 'x ∈ ℝ,  x² > 0'], { anchor: 'middle', size: 50, w: 800 });
    const oku = T(svg, 330, 312, '∀: “her”', { anchor: 'middle', size: 24, fill: MUTE, w: 600 });
    const dmg = T(svg, 330, 430, 'Yanlış', { anchor: 'middle', size: 44, fill: BAD, w: 800 });
    hide(sem, oku, dmg);
    await par(say(c, '<b>∀</b>, “her” demektir: istisnasız hepsi.'), (async () => { await fade(c, sem, 500); await fade(c, oku, 400); })());
    const ex = [['3² = 9', 112], ['(' + MIN + '2)² = 4', 160], ['(1/2)² = 1/4', 208]].map(([s, y]) => satir(pr, y, [s, '   ', ['> 0', OK]], 30));
    await par(say(c, 'Üç örnek tuttu. Yeter mi?'), (async () => { for (const r of ex) { await fade(c, r, 400); await c.wait(200); } })());
    await c.choice({
      tag: 'Tahmin et', q: '“∀x ∈ ℝ, x² > 0” önermesi doğru mu?', options: ['Doğru', 'Yanlış'], answer: 1,
      hints: ['Örnekler tutuyor; ama “her” diyor. Karesi pozitif olmayan bir sayı ara.', ''],
      right: 'x = 0 için 0² = 0; 0 > 0 değil.',
    });
    const kr = satir(pr, 290, ['0² = 0   ', ['> 0 değil', BAD]], 30);
    await par(say(c, 'x = 0: tek istisna, önermeyi düşürür.'), (async () => { await fade(c, kr, 500); await popIn(c, dmg, 330, 415, 450); })());
    c.note('<b>∀</b>: her. Tek istisna yanlış çıkarır.<br>∀x ∈ ℝ, x² &gt; 0 yanlış: x = 0', 'Her: ∀', 'kural-her');
  }

  /* ------------------------------------------------------------------ 4. Bazı: ∃ */
  async function bazi(c) {
    const svg = base(c);
    const soz = T(svg, 500, 76, 'Bazı tam sayıların karesi kendisine eşittir.', { anchor: 'middle', size: 28, w: 700 });
    const sem = TS(svg, 500, 160, [['∃', OK], 'x ∈ ℤ,  x² = x'], { anchor: 'middle', size: 48, w: 800 });
    const oku = T(svg, 500, 204, '∃: “bazı”', { anchor: 'middle', size: 24, fill: MUTE, w: 600 });
    hide(sem, oku);
    const tb = g(svg);
    T(tb, 120, 300, 'x', { anchor: 'middle', size: 32, fill: MUTE, w: 700 }); T(tb, 120, 380, 'x²', { anchor: 'middle', size: 32, fill: MUTE, w: 700 });
    const kol = [-2, -1, 0, 1, 2, 3].map((v, i) => {
      const x = 240 + i * 118, gg = g(tb);
      const cer = R(gg, x - 46, 256, 92, 150, { rx: 14, fill: OK, fo: 0.12, stroke: OK, sw: 3 }); cer.style.opacity = 0;
      T(gg, x, 300, v < 0 ? MIN + (-v) : String(v), { anchor: 'middle', size: 34, w: 800 });
      T(gg, x, 380, String(v * v), { anchor: 'middle', size: 34, w: 800 });
      hide(gg); return { v, gg, cer };
    });
    await par(say(c, '<b>∃</b>, “bazı” demektir: en az bir tane.'), (async () => { await fade(c, sem, 500); await fade(c, oku, 400); })());
    await par(say(c, 'Tam sayıları sırayla dene.'), (async () => { for (const k of kol) { await fade(c, k.gg, 300); await c.wait(120); } })());
    await c.choice({
      tag: 'Tahmin et', q: 'Önermenin doğru olması için kaç örnek yeter?', options: ['1', '2', 'Hepsi'], answer: 0,
      hints: ['', 'Bir tane bile yeter: “en az bir”.', '“Hepsi” gerekseydi ∀ yazardık.'],
      right: 'Tek örnek yeter.',
    });
    await par(say(c, 'x = 1 için 1² = 1: tek örnek yetti.'), (async () => { await fade(c, kol[3].cer, 400); await c.wait(400); await fade(c, kol[2].cer, 400); })());

    /* düşen "her"in değili */
    await par(fade(c, tb, 400, 0), fade(c, [soz, sem, oku], 400, 0));
    const d1 = TS(svg, 500, 200, [['∀', BAD], 'x ∈ ℝ,  x² > 0      ', ['yanlış', BAD]], { anchor: 'middle', size: 40, w: 800 });
    const dd = T(svg, 500, 276, 'değili', { anchor: 'middle', size: 24, fill: MUTE, w: 600 });
    const d2 = TS(svg, 500, 350, [['∃', OK], 'x ∈ ℝ,  x² ≤ 0      ', ['doğru: x = 0', OK]], { anchor: 'middle', size: 40, w: 800 });
    hide(d1, dd, d2);
    await par(say(c, 'Düşen “her”in değili bir “bazı”dır.'), (async () => { await fade(c, d1, 500); await fade(c, dd, 300); await fade(c, d2, 500); })());
    c.note('<b>∃</b>: bazı (en az bir). Tek örnek doğrular.<br>∃x ∈ ℤ, x² = x doğru: x = 1', 'Bazı: ∃', 'kural-bazi');
  }

  /* ------------------------------------------------------------------ 5. Sıra sende */
  async function sira(c) {
    const svg = base(c);
    const tb = soruTahtasi(c, svg);
    const DY = (dogru, hint) => ({ options: ['Doğru', 'Yanlış'], answer: dogru ? 0 : 1, hints: dogru ? ['', hint] : [hint, ''], damga: dogru ? 'Doğru' : 'Yanlış', renk: dogru ? OK : BAD });
    await say(c, 'Sıra sende: önce oku, sonra karar ver.', { ms: 2200 });
    const o1 = [['∀', OK], 'x ∈ ℕ,  x ≥ 0'];
    await tb.sor(o1, { q: 'Bu önerme sözle nasıl okunur?', options: ['Her doğal sayı 0’dan büyüktür ya da 0’a eşittir.', 'Bazı doğal sayılar 0’dan büyüktür.'], answer: 0, hints: ['', '∀ “her” demektir; “bazı” ∃ ile yazılır.'], right: '∀: her.', kanit: 'Her doğal sayı 0’dan büyük ya da 0’a eşittir.', renk: INK });
    await tb.sor(o1, Object.assign({ q: 'Doğru mu, yanlış mı?', right: 'En küçük doğal sayı 0.', kanit: 'ℕ = {0, 1, 2, …}' }, DY(true, 'İstisna var mı? En küçük doğal sayı 0.')));
    const o2 = [['∃', OK], 'x ∈ ℕ,  x + 3 = 1'];
    await tb.sor(o2, { q: 'Bu önerme sözle nasıl okunur?', options: ['Her doğal sayıya 3 eklenince 1 eder.', '3 eklenince 1 eden bir doğal sayı vardır.'], answer: 1, hints: ['∃ “bazı” demektir: en az bir tane.', ''], right: '∃: en az bir.', kanit: '3 eklenince 1 eden bir doğal sayı vardır.', renk: INK });
    await tb.sor(o2, Object.assign({ q: 'Doğru mu, yanlış mı?', right: 'x = −2 olmalıydı; −2 doğal sayı değil.', kanit: 'x = ' + MIN + '2 olmalı;  ' + MIN + '2 ∉ ℕ' }, DY(false, 'Hangi sayıya 3 eklenince 1 eder? O sayı ℕ’de mi?')));
    await tb.sor([['∃', OK], 'x ∈ ℤ,  x + 3 = 1'], Object.assign({ q: 'Aynı cümle, bu kez ℤ’de. Doğru mu, yanlış mı?', right: 'Küme değişince sonuç değişti.', kanit: 'x = ' + MIN + '2 ∈ ℤ' }, DY(true, '−2 bir tam sayı.')));
    await tb.sor([['∀', OK], 'x ∈ ℝ,  x² ≥ x'], Object.assign({ q: 'Doğru mu, yanlış mı?', right: 'Tek istisna yetti: x = 1/2.', kanit: 'x = 1/2:  1/4 < 1/2' }, DY(false, '0 ile 1 arasında bir sayı dene: 1/2.')));
  }

  return {
    title: 'Önerme: doğru ya da yanlış',
    hook: '“Her asal sayı tektir.” Bu cümleyi <b>yanlış çıkarmak</b> için kaç sayı göstermen gerekir?',
    scenes: [
      { title: 'Önerme mi?', goal: 'Doğru ya da yanlış olduğu kesin olan cümleyi tanı.', run: onermeMi },
      { title: 'Değil', goal: 'Bir önermenin değili doğruluğunu ters çevirir.', run: degil },
      { title: 'Her: ∀', goal: '“Her” diyen önerme tek istisnayla düşer.', run: her },
      { title: 'Bazı: ∃', goal: '“Bazı” diyen önerme tek örnekle doğrulanır.', run: bazi },
      { title: 'Sıra sende: oku ve karar ver', goal: 'Sembolik önermeyi sözle oku; doğru mu yanlış mı karar ver.', run: sira },
    ],
    quiz: [
      {
        q: 'Hangisi <b>önerme değildir</b>?',
        options: ['3 + 4 = 9', 'x + 4 = 9', '9 asal sayıdır.', 'Her tam sayı rasyoneldir.'], answer: 1,
        why: [
          'Yanlış bir önerme: yanlışlığı kesin.',
          'x bilinmeden doğru mu yanlış mı karar verilemez.',
          'Yanlış bir önerme: 9 = 3 · 3.',
          'Doğru bir önerme.'],
        scene: 0,
      },
      {
        q: '“∀x ∈ ℝ, x² &gt; 0” önermesini hangisi <b>yanlış çıkarır</b>?',
        options: ['x = 3', 'x = −2', 'x = 0', 'x = 1/2'], answer: 2,
        why: [
          '3² = 9 > 0: önermeyi destekleyen bir örnek.',
          '(−2)² = 4 > 0: önermeyi destekleyen bir örnek.',
          '0² = 0 ve 0 > 0 değil. Tek istisna yeter.',
          '(1/2)² = 1/4 > 0: önermeyi destekleyen bir örnek.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>“Her” için hepsi, “bazı” için biri yeter.</b>',
      '<b>Önerme:</b> doğru ya da yanlış olduğu kesin cümle. <b>Değili</b> doğruluğu ters çevirir.',
      '<b>∀</b> (her) tek istisnayla düşer; <b>∃</b> (bazı) tek örnekle doğrulanır.',
    ],
    next: { href: 'd2-ve-veya-ya-da.html', label: 'Sonraki: Ve, veya, ya da ›' },
  };
};
