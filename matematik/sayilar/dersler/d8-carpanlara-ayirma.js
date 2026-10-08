/* D8 — Çarpanlara ayırma ve sıfır çarpım
   Dağılmayı ve özdeşlikleri geriye doğru oku; alanı 0 olan dikdörtgenin bir kenarı 0'dır.
   Çizim araçları (K) dersler/04-islem-ozellikleri-cebirsel.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).d8 = (K) => {
  'use strict';
  const { A, B, C, OK, BAD, INK, MIN, lerp, ease, par, say, g, T, TS, setParts, R, hide, base, sidePanel, satir, fade, brH, brV, sliders, figure, bubble, soruTahtasi } = K;
  const a_ = ['a', A], b_ = ['b', B], c_ = ['c', C];

  /* ------------------------------------------------------------------ 1. Dağılmayı geri sar */
  async function geriSar(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const u = 50, ox = 120, oy = 190, hh = 3 * u, wb = 4 * u, wc = 2 * u, GAP = 70;
    const sol = g(svg); R(sol, ox, oy, wb, hh, { rx: 4, fill: B, fo: 0.4, stroke: B, sw: 3 }); TS(sol, ox + wb / 2, oy + hh / 2 + 10, [a_, '·', b_], { anchor: 'middle', size: 30, w: 800 });
    brH(sol, ox, ox + wb, oy - 14, B, true, 4); T(sol, ox + wb / 2, oy - 30, 'b', { anchor: 'middle', size: 30, fill: B, w: 800 });
    brV(sol, ox - 14, oy, oy + hh, A, true, 4); T(sol, ox - 30, oy + hh / 2 + 10, 'a', { anchor: 'end', size: 30, fill: A, w: 800 });
    const sag = g(svg); R(sag, ox + wb, oy, wc, hh, { rx: 4, fill: C, fo: 0.4, stroke: C, sw: 3 }); TS(sag, ox + wb + wc / 2, oy + hh / 2 + 10, [a_, '·', c_], { anchor: 'middle', size: 30, w: 800 });
    brH(sag, ox + wb, ox + wb + wc, oy - 14, C, true, 4); T(sag, ox + wb + wc / 2, oy - 30, 'c', { anchor: 'middle', size: 30, fill: C, w: 800 });
    const sagA = g(sag); brV(sagA, ox + wb - 14, oy, oy + hh, A, true, 4);
    const arti = T(svg, ox + wb + GAP / 2, oy + hh / 2 + 14, '+', { anchor: 'middle', size: 44, w: 800 });
    sag.setAttribute('transform', `translate(${GAP} 0)`);
    const tum = g(svg); brH(tum, ox, ox + wb + wc, oy + hh + 16, INK, false, 4); TS(tum, ox + (wb + wc) / 2, oy + hh + 54, [b_, ' + ', c_], { anchor: 'middle', size: 30, w: 800 });
    hide(sol, sag, arti, tum);
    await par(say(c, 'Dağılmada dikdörtgeni ikiye bölmüştük. Şimdi geri saralım.'), (async () => {
      await fade(c, [sol, sag, arti], 600);
      await fade(c, satir(pr, 112, [a_, '·', b_, ' + ', a_, '·', c_], 36), 400);
    })());
    await par(say(c, 'İki parçanın ortak kenarı dışarı çıkar: <b>ortak çarpan</b>.'), (async () => {
      await fade(c, arti, 300, 0);
      await c.tween(900, (e) => sag.setAttribute('transform', `translate(${GAP * (1 - e)} 0)`), ease.inOut);
      hide(sagA); await fade(c, tum, 500);
      await fade(c, satir(pr, 162, [['= ', OK], a_, ' · (', b_, ' + ', c_, ')'], 36), 400);
    })());
    await par(say(c, 'Örnek: 6x + 9. İki terimde de 3 var.'), (async () => {
      await fade(c, satir(pr, 262, ['6x + 9'], 34), 400);
      await fade(c, satir(pr, 306, [['= ', OK], ['3', A], '·2x + ', ['3', A], '·3'], 30), 400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: '6x + 9 = 3 · ( ? )', options: ['2x + 9', '2x + 3', '6x + 3'], answer: 1,
      hints: ['3, 9’un içinden de çıkmalı: 9 = 3 · 3.', '', '3, 6x’in içinden de çıkmalı: 6x = 3 · 2x.'],
      right: '3 · 2x + 3 · 3 = 3 · (2x + 3).',
    });
    await fade(c, satir(pr, 350, [['= ', OK], ['3', A], ' · (2x + 3)'], 34), 400);
    c.note('<span class="ca">a</span>·<span class="cb">b</span> + <span class="ca">a</span>·<span class="cc">c</span> = <span class="ca">a</span> · (<span class="cb">b</span> + <span class="cc">c</span>)<br>6x + 9 = 3 · (2x + 3)', 'Ortak çarpan', 'kural-ortak-carpan');
  }

  /* ------------------------------------------------------------------ 2. Özdeşliği geri sar */
  async function ozdesligiGeriSar(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const ust = T(svg, 330, 110, 'x² ' + MIN + ' 9', { anchor: 'middle', size: 56, w: 800 });
    const ustAlt = TS(svg, 330, 176, [['= ', OK], '(x ' + MIN + ' 3)(x + 3)'], { anchor: 'middle', size: 40, w: 800 });
    const kas = g(svg);
    figure(kas, 120, 548, 1.0, '#2f7f9c', A);
    bubble(kas, 190, 270, 330, 100, 140, 394, A);
    const bal = T(kas, 355, 334, '51 × 49 = ?', { anchor: 'middle', size: 34, fill: A, w: 800 });
    hide(ust, ustAlt, kas);
    await par(say(c, 'İki kare farkını geriye oku: x² − 9 çarpanlarına ayrılır.'), (async () => {
      await fade(c, ust, 500);
      await fade(c, satir(pr, 112, ['x² ' + MIN + ' 9 = x² ' + MIN + ' 3²'], 30), 400);
      await fade(c, satir(pr, 154, [['= ', OK], '(x ' + MIN + ' 3)(x + 3)'], 30), 400);
      await fade(c, ustAlt, 500);
    })());
    await fade(c, kas, 500);
    await c.choice({
      tag: 'Tahmin et', q: 'Kasiyer 51 × 49’u zihinden çarpacak. Hangi biçimde yazar?', options: ['(50 + 1)(50 − 1)', '(50 + 1)²', '50 · 50'], answer: 0,
      hints: ['', '(50 + 1)² = 51 · 51 eder; ikinci çarpan 49.', '50 · 50 = 2500; 51 · 49 bundan biraz farklı.'],
      right: '51 = 50 + 1 ve 49 = 50 − 1.',
    });
    await par(say(c, 'Kasiyer: 51 · 49 = 50² − 1² = 2499.'), (async () => {
      await fade(c, satir(pr, 232, ['51 · 49 = (50 + 1)(50 ' + MIN + ' 1)'], 24), 400);
      await fade(c, satir(pr, 270, [['= ', OK], '50² ' + MIN + ' 1² = ', ['2499', OK]], 28), 400);
      bal.textContent = '2499';
    })());
    await par(say(c, '99² de öyle: (100 − 1)² = 9801.'), (async () => {
      bal.textContent = '99² = ?';
      await fade(c, satir(pr, 350, ['99² = (100 ' + MIN + ' 1)²'], 26), 400);
      await fade(c, satir(pr, 388, [['= ', OK], '10 000 ' + MIN + ' 200 + 1'], 26), 400);
      await fade(c, satir(pr, 426, [['= ', OK], ['9801', OK]], 28), 400);
      bal.textContent = '9801';
    })());
    await par(say(c, 'Köklülerde de işe yarar: sonuç 3.'), (async () => {
      await fade(c, satir(pr, 480, ['(√5 + √2)(√5 ' + MIN + ' √2)'], 24), 400);
      await fade(c, satir(pr, 514, [['= ', OK], '5 ' + MIN + ' 2 = ', ['3', OK]], 26), 400);
    })());
    c.note('x² − 9 = (x − 3)(x + 3)<br>51 · 49 = 50² − 1² = 2499', 'Özdeşliği geri oku', 'kural-ozdes-geri');
  }

  /* ------------------------------------------------------------------ 3. Sıfır çarpım */
  async function sifirCarpim(c) {
    const svg = base(c);
    const px = sidePanel(svg); const pr = px.rows;
    const u = 56, ox = 170, oy = 150;
    const dik = R(svg, ox, oy, 10, 10, { rx: 3, fill: OK, fo: 0.3, stroke: OK, sw: 4 });
    const aT = T(svg, 0, oy - 22, '', { anchor: 'middle', size: 30, fill: A, w: 800 });
    const bT = T(svg, ox - 22, 0, '', { anchor: 'end', size: 30, fill: B, w: 800 });
    const alan = TS(svg, 330, 520, [''], { anchor: 'middle', size: 40, w: 800 });
    const st = { a: 4, b: 3 };
    function upd() {
      const { a, b } = st, w = a * u, hh = b * u, sifir = a * b === 0;
      dik.setAttribute('width', Math.max(w, 0.01)); dik.setAttribute('height', Math.max(hh, 0.01));
      dik.setAttribute('stroke', sifir ? BAD : OK); dik.setAttribute('fill', sifir ? BAD : OK);
      aT.setAttribute('x', ox + Math.max(w, 60) / 2); aT.textContent = 'a = ' + a;
      bT.setAttribute('y', oy + Math.max(hh, 40) / 2 + 10); bT.textContent = 'b = ' + b;
      setParts(alan, [a_, ' · ', b_, ' = ', [String(a * b), sifir ? BAD : OK]]);
    }
    upd();
    await say(c, 'Dikdörtgenin alanı a · b.');
    const sl = sliders(c, 'Dene', [{ k: 'a', min: 0, max: 7, step: 1, v: 4, col: A }, { k: 'b', min: 0, max: 5, step: 1, v: 3, col: B }], (k, v) => { st.a = v.a; st.b = v.b; upd(); });
    await say(c, 'Kaydırıcılarla alanı 0 yapmayı dene.', { noWait: true });
    await c.cont('Devam ›');
    sl.el.remove();
    await par(say(c, 'Alan ancak bir kenar 0 olunca 0 olur.'), (async () => {
      const a0 = st.a, b0 = st.b;
      await c.tween(700, (e) => { st.a = Math.round(lerp(a0, 4, e)); st.b = Math.round(lerp(b0, 3, e)); upd(); }, ease.inOut);
      await c.wait(300);
      await c.tween(1100, (e) => { st.a = Math.round(lerp(4, 0, e)); upd(); }, ease.inOut);
      await fade(c, satir(pr, 112, [a_, ' · ', b_, ' = 0'], 36), 400);
      await fade(c, satir(pr, 160, [['⇔  ', OK], a_, ' = 0  ∨  ', b_, ' = 0'], 28), 400);
    })());
    await say(c, 'Çarpım 0 ise çarpanlardan <b>en az biri</b> 0’dır.', { dur:1 });
    await c.choice({
      tag: 'Tahmin et', q: 'Değili: “a · b ≠ 0” ne zaman doğrudur?', options: ['a ≠ 0 ∧ b ≠ 0', 'a ≠ 0 ∨ b ≠ 0'], answer: 0,
      hints: ['', 'Yalnızca biri sıfırdan farklıysa öteki 0 olabilir: çarpım yine 0 çıkar.'],
      right: 'İkisi de sıfırdan farklı olmalı.',
    });
    await par(say(c, '“Veya”nın değili “ve” oldu.', { ton:'thoughtful' }), (async () => {
      await fade(c, satir(pr, 262, [a_, ' · ', b_, ' ≠ 0'], 36), 400);
      await fade(c, satir(pr, 310, [['⇔  ', OK], a_, ' ≠ 0  ∧  ', b_, ' ≠ 0'], 28), 400);
    })());
    await say(c, 'D6’daki yutan eleman, tersten okundu.');
    c.note('<span class="ca">a</span> · <span class="cb">b</span> = 0 ⇔ <span class="ca">a</span> = 0 ∨ <span class="cb">b</span> = 0<br>(x − 2)(x + 5) = 0 ise x = 2 veya x = −5', 'Sıfır çarpım', 'kural-sifir-carpim');
  }

  /* ------------------------------------------------------------------ 4. Sıra sende */
  async function sira(c) {
    const svg = base(c);
    const tb = soruTahtasi(c, svg);
    await say(c, 'Sıra sende: önce sıfır çarpım, sonra çarpanlar.', { ms: 2400 });
    await tb.sor(['(x ' + MIN + ' 2)(x + 5) = 0'], {
      q: 'x için hangisi doğrudur?', options: ['x = 2 ∨ x = −5', 'x = 2 ∧ x = −5', 'x = −2 ∨ x = 5'], answer: 0,
      hints: ['', 'x aynı anda iki farklı sayı olamaz. Çarpanlardan en az biri 0 olmalı: “veya”.', 'x − 2 = 0 ise x = 2 olur; işarete dikkat.'],
      right: 'Çarpanlardan en az biri 0.', kanit: 'x ' + MIN + ' 2 = 0  ∨  x + 5 = 0',
    });
    await tb.sor(['x · (x ' + MIN + ' 4) = 0'], {
      q: 'x için hangisi doğrudur?', options: ['x = 4', 'x = 0 ∨ x = 4', 'x = 0 ∧ x = 4'], answer: 1,
      hints: ['Çarpanlardan biri x’in kendisi: x = 0 da olur.', '', 'x aynı anda hem 0 hem 4 olamaz: “veya”.'],
      right: 'x = 0 ya da x − 4 = 0.', kanit: 'x = 0  ∨  x ' + MIN + ' 4 = 0',
    });
    const F = (ifade, o) => tb.sor([ifade, ' = ', ['?', A]], Object.assign({ q: 'Hangi çarpıma eşittir?', sonra: [ifade, ' = ', [o.options[o.answer], OK]] }, o));
    await F('5x + 10', { options: ['5 · (x + 10)', '5 · (x + 2)', '10 · (x + 1)'], answer: 1, hints: ['5, 10’un içinden de çıkmalı: 10 = 5 · 2.', '', '5x, 10’a bölünmez. Ortak çarpan 5.'], right: '5 · x + 5 · 2.', kanit: 'ortak çarpan: 5' });
    await F('x² ' + MIN + ' 16', { options: ['(x − 4)²', '(x − 4)(x + 4)', '(x − 8)(x + 2)'], answer: 1, hints: ['(x − 4)² = x² − 8x + 16: ortada −8x var.', '', 'İki kare farkı: 16 = 4².'], right: 'x² − 4².', kanit: 'iki kare farkı' });
    await F('x² + 2x + 1', { options: ['(x + 1)²', '(x + 1)(x − 1)', '(x + 2)²'], answer: 0, hints: ['', '(x + 1)(x − 1) = x² − 1: ortadaki 2x yok.', '(x + 2)² = x² + 4x + 4.'], right: 'x² + 2 · x · 1 + 1².', kanit: 'toplamın karesi' });
  }

  return {
    title: 'Çarpanlara ayırma ve sıfır çarpım',
    hook: 'Kasiyer <b>51 × 49</b>’u da zihinden söylüyor: 2499. Bu kez hangi yolu kullandı?',
    scenes: [
      { title: 'Dağılmayı geri sar', goal: 'Ortak çarpanı dışarı al: a·b + a·c = a·(b + c).', run: geriSar },
      { title: 'Özdeşliği geri sar', goal: 'İki kare farkını çarpanlarına ayır; 51 · 49 ve 99².', run: ozdesligiGeriSar },
      { title: 'Sıfır çarpım', goal: 'Çarpım 0 ise çarpanlardan en az biri 0’dır.', run: sifirCarpim },
      { title: 'Sıra sende: çarpanlar', goal: 'Sıfır çarpımı kullan; ifadeleri çarpanlarıyla eşleştir.', run: sira },
    ],
    quiz: [
      {
        q: '<b>x² − 25</b> hangi çarpıma eşittir?',
        options: ['(x − 5)²', '(x − 5)(x + 5)', '(x − 25)(x + 1)', 'x · (x − 25)'], answer: 1,
        why: [
          '(x − 5)² = x² − 10x + 25: ortada −10x var.',
          'İki kare farkı: x² − 5² = (x − 5)(x + 5).',
          'Açınca x² − 24x − 25 çıkar.',
          'Açınca x² − 25x çıkar.'],
        scene: 1,
      },
      {
        q: '<b>(x − 2)(x + 5) = 0</b> için hangisi doğrudur?',
        options: ['x = 2 ∧ x = −5', 'x = 2 ∨ x = −5', 'x = −2 ∨ x = 5', 'x = 0'], answer: 1,
        why: [
          'x aynı anda iki farklı sayı olamaz; “veya” olmalı.',
          'Çarpanlardan en az biri 0: x − 2 = 0 veya x + 5 = 0.',
          'İşaretler ters: x − 2 = 0 ise x = 2.',
          'x = 0 için (−2) · 5 = −10; 0 değil.'],
        scene: 2,
      },
      {
        q: '<b>73² − 27²</b> işlemini zihinden hangisi verir?',
        options: ['(73 − 27)² = 46² = 2116', '(73 + 27)² = 100² = 10 000', '73 − 27 = 46', '(73 − 27)(73 + 27) = 46 · 100 = 4600'], answer: 3,
        why: [
          'Farkın karesini almışsın. İki kare farkı (a − b)(a + b) olur.',
          'Toplamın karesini almışsın. İki kare farkı (a − b)(a + b) olur.',
          'Yalnızca tabanları çıkarmışsın; kareler hâlâ duruyor. İki çarpan gerekir.',
          'a² − b² = (a − b)(a + b): 46 · 100 = 4600.'],
        scene: 1,
      },
      {
        q: '“a · b = 12 ise a = 12 ∨ b = 12” önermesini hangi değerler <b>çürütür</b>?',
        options: ['a = 12, b = 1', 'a = 1, b = 12', 'a = 3, b = 4', 'a = 0, b = 12'], answer: 2,
        why: [
          '12 · 1 = 12 ve a = 12: önerme tutuyor, çürütmez.',
          '1 · 12 = 12 ve b = 12: önerme tutuyor, çürütmez.',
          '3 · 4 = 12 ama ne a ne b 12. “Biri belirli sayıdır” kuralı yalnızca çarpım 0 iken geçerli.',
          '0 · 12 = 0, 12 değil: bu değerler önermenin varsayımını bile sağlamıyor.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>Çarpım 0 ise çarpanlardan en az biri 0’dır.</b>',
      'Çarpanlara ayırmak, dağılmayı ve özdeşlikleri geriye okumaktır: 6x + 9 = 3 · (2x + 3), x² − 9 = (x − 3)(x + 3).',
      'a · b = 0 ⇔ a = 0 ∨ b = 0 &nbsp;ve&nbsp; a · b ≠ 0 ⇔ a ≠ 0 ∧ b ≠ 0',
    ],
    next: { href: 'd9-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  };
};
