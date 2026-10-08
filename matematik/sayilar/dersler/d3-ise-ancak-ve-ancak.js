/* D3 — İse, ancak ve ancak
   "p ise q": p şeridi q şeridinin içinde (tek yön). İki yön de doğruysa "ancak ve ancak".
   Çizim araçları (K) dersler/04-islem-ozellikleri-cebirsel.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).d3 = (K) => {
  'use strict';
  const { A, B, OK, BAD, INK, MUTE, MIN, num, par, say, g, T, TS, setParts, L, P, Ci, hide, base, fade, drawIn, brH, sliders, soruTahtasi } = K;

  /* ------------------------------------------------------------------ 1. Tek yön */
  async function tekYon(c) {
    const svg = base(c);
    const X = (v) => 110 + v * 86, NY = 420, QY = NY - 42, PY = NY - 92;
    L(svg, 80, NY, 930, NY, '#6d7bb8', 3);
    for (let v = 0; v <= 9; v++) { L(svg, X(v), NY - 8, X(v), NY + 8, '#6d7bb8', 2.5); T(svg, X(v), NY + 40, String(v), { anchor: 'middle', size: 22, fill: MUTE, w: 500 }); }
    const q = g(svg); L(q, X(3) + 14, QY, 930, QY, A, 14); Ci(q, X(3), QY, 11, { fill: '#121a3d', stroke: A, sw: 4 }); T(q, X(3) - 24, QY + 9, 'q: x > 3', { anchor: 'end', size: 26, fill: A, w: 700 });
    const p = g(svg); L(p, X(5) + 14, PY, 930, PY, B, 14); Ci(p, X(5), PY, 11, { fill: '#121a3d', stroke: B, sw: 4 }); T(p, X(5) - 24, PY + 9, 'p: x > 5', { anchor: 'end', size: 26, fill: B, w: 700 });
    const iz = L(svg, X(7), PY - 16, X(7), NY, '#fff', 2, '5 6'); iz.style.opacity = 0.5;
    const nokta = Ci(svg, X(7), NY, 13, { fill: OK, stroke: '#fff', sw: 3 });
    const bas = TS(svg, 500, 96, [['x > 5', B], '  ⇒  ', ['x > 3', A]], { anchor: 'middle', size: 50, w: 800 });
    const oku = T(svg, 500, 140, '⇒: “ise”', { anchor: 'middle', size: 24, fill: MUTE, w: 600 });
    const durum = TS(svg, 500, 220, [''], { anchor: 'middle', size: 30, w: 800 });
    const ters = TS(svg, 500, 270, [''], { anchor: 'middle', size: 30, w: 800 });
    const upd = (v) => {
      nokta.setAttribute('cx', X(v)); iz.setAttribute('x1', X(v)); iz.setAttribute('x2', X(v));
      const pv = v > 5, qv = v > 3;
      setParts(durum, ['x = ' + num(v) + ':    ', ['p ' + (pv ? 'doğru' : 'yanlış'), pv ? OK : BAD], '     ', ['q ' + (qv ? 'doğru' : 'yanlış'), qv ? OK : BAD]]);
    };
    upd(7);
    hide(bas, oku);
    await say(c, 'Mavi şeritteki her nokta sarı şeridin de içinde.');
    await par(say(c, '<b>p ⇒ q</b>: p doğruysa q da doğrudur.', { dur:1 }), (async () => { await fade(c, bas, 500); await fade(c, oku, 400); })());
    const sl = c.slider({ label: '<b>x</b>', min: 0, max: 9, step: 0.5, value: 7, fmt: (v) => num(v), onInput: (v) => upd(+v) });
    await say(c, 'Noktayı kaydır: p doğruyken q hiç yanlış oluyor mu?', { noWait: true });
    await c.cont('Devam ›');
    sl.remove();
    await c.choice({
      tag: 'Tahmin et', q: 'Tersten oku: “x > 3 ise x > 5”. Hangi x bunu çürütür?', options: ['x = 4', 'x = 6', 'x = 2'], answer: 0,
      hints: ['', 'x = 6 ikisini de sağlar: çürütmez.', 'x = 2 için “x > 3” zaten yanlış; önerme bu sayı hakkında bir şey söylemiyor.'],
      right: '4 > 3 doğru, 4 > 5 yanlış.',
    });
    upd(4);
    setParts(ters, [['x > 3  ⇒  x > 5   yanlış:  x = 4', BAD]]);
    await say(c, 'x = 4 sarıda var, mavide yok: ters yön yanlış.', { ton:'thoughtful' });
    c.note('<b>p ⇒ q</b>: p doğruysa q da doğru.<br>x &gt; 5 ⇒ x &gt; 3; tersi yanlış (x = 4)', 'İse: ⇒', 'kural-ise');
  }

  /* ------------------------------------------------------------------ 2. Çift yön */
  async function ciftYon(c) {
    const svg = base(c);
    const X = (v) => 500 + v * 80, NY = 420, FY = NY - 60;
    L(svg, 80, NY, 920, NY, '#6d7bb8', 3);
    for (let v = -5; v <= 5; v++) { L(svg, X(v), NY - 8, X(v), NY + 8, v === 0 ? INK : '#6d7bb8', v === 0 ? 3.5 : 2.5); T(svg, X(v), NY + 40, v < 0 ? MIN + (-v) : String(v), { anchor: 'middle', size: 22, fill: MUTE, w: 500 }); }
    const fark = L(svg, 0, FY, 0, FY, OK, 10);
    const farkT = T(svg, 500, FY - 22, '', { anchor: 'middle', size: 28, w: 800 });
    const na = Ci(svg, 0, NY, 13, { fill: A, stroke: '#fff', sw: 3 }), nb = Ci(svg, 0, NY, 13, { fill: B, stroke: '#fff', sw: 3 });
    const ta = T(svg, 0, NY - 22, 'a', { anchor: 'middle', size: 28, fill: A, w: 800 }), tb = T(svg, 0, NY - 22, 'b', { anchor: 'middle', size: 28, fill: B, w: 800 });
    TS(svg, 290, 110, [['a', A], ' < ', ['b', B]], { anchor: 'middle', size: 48, w: 800 });
    const okT = T(svg, 500, 112, '⇒', { anchor: 'middle', size: 54, w: 800 });
    TS(svg, 720, 110, [['b', B], ' ' + MIN + ' ', ['a', A], ' > 0'], { anchor: 'middle', size: 48, w: 800 });
    const l1 = T(svg, 290, 164, '', { anchor: 'middle', size: 28, w: 800 }), l2 = T(svg, 720, 164, '', { anchor: 'middle', size: 28, w: 800 });
    const oku = T(svg, 500, 164, '', { anchor: 'middle', size: 22, fill: MUTE, w: 600 });
    const st = { a: -2, b: 3 };
    const lamba = (t, on) => { t.textContent = on ? 'doğru' : 'yanlış'; t.style.fill = on ? OK : BAD; };
    function upd() {
      const { a, b } = st, d = b - a;
      na.setAttribute('cx', X(a)); nb.setAttribute('cx', X(b)); ta.setAttribute('x', X(a)); tb.setAttribute('x', X(b));
      ta.setAttribute('y', a === b ? NY - 22 : NY - 22); tb.setAttribute('y', a === b ? NY - 52 : NY - 22);
      fark.setAttribute('x1', X(a)); fark.setAttribute('x2', X(b)); fark.setAttribute('stroke', d > 0 ? OK : BAD); fark.style.opacity = d === 0 ? 0 : 1;
      farkT.setAttribute('x', (X(a) + X(b)) / 2); farkT.textContent = 'b ' + MIN + ' a = ' + num(d); farkT.style.fill = d > 0 ? OK : BAD;
      lamba(l1, a < b); lamba(l2, d > 0);
    }
    upd();
    await say(c, 'b sağdaysa aradaki fark pozitiftir.');
    okT.textContent = '⇐';
    await say(c, 'Tersi de doğru: fark pozitifse b sağdadır.');
    okT.textContent = '⇔'; okT.style.fill = OK; oku.textContent = 'ancak ve ancak';
    await say(c, '<b>⇔</b>: iki yön de doğru. “Ancak ve ancak” diye okunur.');
    const sl = sliders(c, 'Dene', [{ k: 'a', min: -5, max: 5, step: 1, v: -2, col: A }, { k: 'b', min: -5, max: 5, step: 1, v: 3, col: B }], (k, v) => { st.a = v.a; st.b = v.b; upd(); });
    await say(c, 'a ile b’yi kaydır: iki önerme hep birlikte değişir.', { noWait: true });
    await c.cont('Devam ›');
    sl.el.remove();
    st.a = 2; st.b = -1; upd();
    await c.choice({
      tag: 'Tahmin et', q: 'b sola geçti: a = 2, b = −1. İki önerme için hangisi doğru?', options: ['İkisi de yanlış', 'Biri doğru, biri yanlış', 'İkisi de doğru'], answer: 0,
      hints: ['', 'Tahtaya bak: 2 < −1 yanlış; −1 − 2 = −3 de pozitif değil.', '2 < −1 doğru mu? Sayı doğrusunda b solda.'],
      right: 'Birlikte doğru, birlikte yanlış: ⇔.',
    });
    c.note('<b>p ⇔ q</b>: p ⇒ q ve q ⇒ p.<br>a &lt; b ⇔ b − a &gt; 0', 'Ancak ve ancak: ⇔', 'kural-ancak');
  }

  /* ------------------------------------------------------------------ 3. Verilen ve gösterilecek */
  async function verilen(c) {
    const svg = base(c);
    const sol = T(svg, 260, 250, 'a ve b rasyonel', { anchor: 'middle', size: 36, fill: B, w: 800 });
    const ok_ = T(svg, 500, 254, '⇒', { anchor: 'middle', size: 58, w: 800 });
    const sag = T(svg, 745, 250, '(a + b)/2 rasyonel', { anchor: 'middle', size: 36, fill: A, w: 800 });
    const eS = g(svg); brH(eS, 110, 410, 280, B, false, 3.5); T(eS, 260, 330, 'verilen (hipotez)', { anchor: 'middle', size: 26, fill: B, w: 700 });
    const eG = g(svg); brH(eG, 580, 910, 280, A, false, 3.5); T(eG, 745, 330, 'gösterilecek (hüküm)', { anchor: 'middle', size: 26, fill: A, w: 700 });
    const yol = P(svg, 'M260,200 Q500,90 745,200', { stroke: OK, sw: 4 }); const uc = P(svg, 'M745,200 L724,196 L734,180 Z', { fill: OK });
    const yolT = T(svg, 500, 120, 'ispat', { anchor: 'middle', size: 28, fill: OK, w: 800 });
    hide(eS, eG, yol, uc, yolT, sol, ok_, sag);
    await par(say(c, 'C5’teki ispat aslında bir “ise” önermesiydi.'), fade(c, [sol, ok_, sag], 600));
    await par(say(c, 'Okun solu <b>verilen</b>, sağı <b>gösterilecek</b>.'), (async () => { await fade(c, eS, 500); await fade(c, eG, 500); })());
    await par(say(c, 'İspat, soldan sağa giden yoldur.'), (async () => { await drawIn(c, yol, 900); uc.style.opacity = 1; await fade(c, yolT, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: '“n 4’ün katı ⇒ n çift” önermesinde verilen (hipotez) hangisi?', options: ['n 4’ün katıdır', 'n çifttir'], answer: 0,
      hints: ['', 'Okun sağı gösterilecek olandır. Verilen, okun solunda durur.'],
      right: 'Okun solu verilen, sağı gösterilecek.',
    });
    c.note('<b>p ⇒ q</b>: p verilen (hipotez), q gösterilecek (hüküm).', 'Hipotez ve hüküm', 'kural-hipotez');
  }

  /* ------------------------------------------------------------------ 4. Sıra sende */
  async function sira(c) {
    const svg = base(c);
    const tb = soruTahtasi(c, svg);
    const Q = (sol, sag, cift, kanit, hint, right) => tb.sor([sol, ['   ?   ', A], sag], {
      q: 'Ters yön de doğru mu? Hangi ok yazılır?', options: ['⇒  (yalnızca soldan sağa)', '⇔  (iki yön de doğru)'], answer: cift ? 1 : 0,
      hints: cift ? [hint, ''] : ['', hint], right, kanit, renk: cift ? OK : A,
      sonra: [sol, [cift ? '   ⇔   ' : '   ⇒   ', OK], sag],
    });
    await say(c, 'Sıra sende: ok tek başlı mı, çift başlı mı?', { ms: 2400 });
    await Q('n 4’ün katı', 'n çift', false, 'tersi yanlış: n = 6', 'Tersini dene: her çift sayı 4’ün katı mı? 6’ya bak.', '6 çift ama 4’ün katı değil.');
    await Q('x = 3', 'x² = 9', false, 'tersi yanlış: x = ' + MIN + '3', 'Karesi 9 olan başka bir sayı var mı?', '(−3)² de 9 eder.');
    await Q('x > 0', MIN + 'x < 0', true, 'iki yön de doğru', 'Tersini dene: −x negatifse x pozitif midir?', 'Pozitifin tersi negatif, negatifin tersi pozitif.');
  }

  return {
    title: 'İse, ancak ve ancak',
    hook: '“x > 5 ise x > 3” doğru. Tersten okuyalım: <b>“x > 3 ise x > 5.”</b> Bu da doğru mu?',
    scenes: [
      { title: 'Tek yön: ⇒', goal: '“p ise q”: p doğruysa q da doğrudur; tersi doğru olmayabilir.', run: tekYon },
      { title: 'Çift yön: ⇔', goal: 'İki yön de doğruysa “ancak ve ancak” denir.', run: ciftYon },
      { title: 'Verilen ve gösterilecek', goal: 'Okun solu hipotez, sağı hükümdür; ispat aradaki yoldur.', run: verilen },
      { title: 'Sıra sende: hangi ok?', goal: 'Ters yönü sına; ⇒ mi ⇔ mi karar ver.', run: sira },
      { title: 'Hikâye: Yıldızlar bunu giyiyor', goal: '“İse”nin tek yönlü olduğunu bir reklamda gör.', video: 'hikaye/d3-yildizlar-bunu-giyiyor/renders/d3-yildizlar-bunu-giyiyor.mp4' },
    ],
    quiz: [
      {
        q: '“x &gt; 3 ise x &gt; 5” önermesini hangi x <b>çürütür</b>?',
        options: ['x = 2', 'x = 4', 'x = 6', 'x = 7'], answer: 1,
        why: [
          '2 > 3 zaten yanlış; önerme bu sayı hakkında bir şey söylemiyor.',
          '4 > 3 doğru ama 4 > 5 yanlış: karşı örnek.',
          '6 ikisini de sağlar: önermeyi destekler.',
          '7 ikisini de sağlar: önermeyi destekler.'],
        scene: 0,
      },
      {
        q: 'Hangisinde ⇒ yerine <b>⇔</b> yazılabilir?',
        options: ['x = 3 ⇒ x² = 9', 'n 4’ün katı ⇒ n çift', 'x − 2 = 0 ⇒ x = 2', 'x > 5 ⇒ x > 3'], answer: 2,
        why: [
          'Tersi yanlış: x = −3 için de x² = 9.',
          'Tersi yanlış: 6 çift ama 4’ün katı değil.',
          'Tersi de doğru: x = 2 ise x − 2 = 0.',
          'Tersi yanlış: x = 4.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>İse tek yön, ancak ve ancak çift yön.</b>',
      '<b>p ⇒ q</b>: p doğruysa q da doğru. x &gt; 5 ⇒ x &gt; 3; tersi yanlış (x = 4).',
      '<b>p ⇔ q</b>: iki yön de doğru. a &lt; b ⇔ b − a &gt; 0.',
    ],
    next: { href: 'd4-degisme-ve-birlesme.html', label: 'Sonraki: Değişme ve birleşme ›' },
  };
};
