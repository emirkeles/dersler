/* D2 — Ve, veya, ya da
   1'den 12'ye sayılar; p: "n çifttir" (amber işaret), q: "n 3'ün katıdır" (camgöbeği işaret).
   Bağlaç seçilince önermeyi doğru yapan sayılar yanar.
   Çizim araçları (K) dersler/04-islem-ozellikleri-cebirsel.js içindeki KIT'ten gelir. */
(window.DERS_EK = window.DERS_EK || {}).d2 = (K) => {
  'use strict';
  const { A, B, OK, BAD, INK, MUTE, num, par, say, g, T, TS, R, L, Ci, hide, base, fade, soruTahtasi } = K;
  const CIFT = (n) => n % 2 === 0, UC = (n) => n % 3 === 0;

  /* sayı şeridi */
  function serit(svg) {
    const gg = g(svg); const X = (n) => 95 + (n - 1) * 73.6, Y = 310;
    T(gg, 40, 214, 'p: n çifttir', { size: 26, fill: A, w: 700 });
    T(gg, 40, 428, 'q: n 3’ün katıdır', { size: 26, fill: B, w: 700 });
    const items = [];
    for (let n = 1; n <= 12; n++) {
      if (CIFT(n)) R(gg, X(n) - 22, Y - 56, 44, 10, { rx: 5, fill: A });
      if (UC(n)) R(gg, X(n) - 22, Y + 46, 44, 10, { rx: 5, fill: B });
      const d = Ci(gg, X(n), Y, 28, { fill: '#10193d', stroke: '#33437f', sw: 2.5 });
      const t = T(gg, X(n), Y + 11, String(n), { anchor: 'middle', size: 30, w: 800 });
      items.push({ n, d, t });
    }
    const boya = (it, on) => { it.d.setAttribute('fill', on ? OK : '#10193d'); it.d.setAttribute('stroke', on ? OK : '#33437f'); it.t.style.fill = on ? '#06101f' : INK; it.t.style.opacity = on ? 1 : 0.5; };
    return { g: gg, items, boya, yak: (kosul) => items.forEach((it) => boya(it, kosul(it.n))) };
  }
  function kur(c, parts, okunus) {
    const svg = base(c); const s = serit(svg);
    TS(svg, 500, 92, parts, { anchor: 'middle', size: 54, w: 800 });
    T(svg, 500, 136, okunus, { anchor: 'middle', size: 24, fill: MUTE, w: 600 });
    const son = T(svg, 500, 512, '', { anchor: 'middle', size: 30, fill: OK, w: 700 });
    return { svg, s, son };
  }
  const sirayla = async (c, s, kosul) => { for (const it of s.items) { const on = kosul(it.n); s.boya(it, on); if (on) await c.wait(160); } };

  /* ------------------------------------------------------------------ 1. Ve */
  async function ve(c) {
    const { s, son } = kur(c, [['p', A], ' ∧ ', ['q', B]], '∧: “ve”');
    hide(s.g);
    await par(say(c, 'İki önerme: <span class="ca">p</span> çiftleri, <span class="cb">q</span> 3’ün katlarını işaretler.'), fade(c, s.g, 600));
    await say(c, '<b>p ∧ q</b>: ikisi birden doğru olmalı.');
    await c.choice({
      tag: 'Tahmin et', q: '1’den 12’ye kaç sayı hem çift hem 3’ün katı?', options: ['2', '4', '8'], answer: 0,
      hints: ['', 'İki işareti birden taşıyanları say.', 'O kadarı en az birini sağlıyor. İki işareti birden taşıyanları say.'],
      right: '6 ve 12.',
    });
    await par(say(c, 'Yalnızca 6 ve 12: kesişimle aynı yer.'), (async () => { await sirayla(c, s, (n) => CIFT(n) && UC(n)); son.textContent = 'p ∧ q doğru: 6, 12'; })());
    c.note('<b>p ∧ q</b>: ikisi de doğru olmalı.<br>çift ∧ 3’ün katı: 6, 12', 'Ve: ∧', 'kural-ve');
  }

  /* ------------------------------------------------------------------ 2. Veya */
  async function veya(c) {
    const { s, son } = kur(c, [['p', A], ' ∨ ', ['q', B]], '∨: “veya”');
    await say(c, '<b>p ∨ q</b>: en az biri doğru olmalı.');
    await c.choice({
      tag: 'Tahmin et', q: '6 hem çift hem 3’ün katı. “p ∨ q” 6 için doğru mu?', options: ['Doğru', 'Yanlış'], answer: 0,
      hints: ['', 'Matematikte “veya”, ikisine birden izin verir.'],
      right: 'En az biri doğru: şart sağlandı.',
    });
    await par(say(c, 'İkisi birden doğruysa da doğru: birleşimle aynı yer.'), (async () => { await sirayla(c, s, (n) => CIFT(n) || UC(n)); son.textContent = 'p ∨ q doğru: 2, 3, 4, 6, 8, 9, 10, 12'; })());
    c.note('<b>p ∨ q</b>: en az biri doğru olmalı.<br>çift ∨ 3’ün katı: 6 da doğru', 'Veya: ∨', 'kural-veya');
  }

  /* ------------------------------------------------------------------ 3. Ya da */
  async function yaDa(c) {
    const { s, son } = kur(c, [['p', A], ' ⊻ ', ['q', B]], '⊻: “ya da”');
    s.yak((n) => CIFT(n) || UC(n));
    await say(c, 'Önce “veya”: sekiz sayı yanıyor.', { ton:'curious' });
    await say(c, '<b>p ⊻ q</b>: yalnızca biri doğru olmalı.');
    await par(say(c, 'İkisi birden doğruysa “ya da” yanlış: 6 ve 12 söndü.', { ton:'thoughtful' }), (async () => {
      for (const n of [6, 12]) { const it = s.items[n - 1]; it.d.setAttribute('stroke', BAD); await c.wait(450); s.boya(it, false); await c.wait(250); }
      son.textContent = 'p ⊻ q doğru: 2, 3, 4, 8, 9, 10';
    })());
    await say(c, 'Günlük dildeki “çay ya da kahve” budur.');
    await c.choice({
      tag: 'Tahmin et', q: 'n = 9 için “p ⊻ q” doğru mu?', options: ['Doğru', 'Yanlış'], answer: 0,
      hints: ['', '9 çift değil ama 3’ün katı: yalnızca biri doğru.'],
      right: 'Yalnızca q doğru.',
    });
    c.note('<b>p ⊻ q</b>: yalnızca biri doğru olmalı.<br>çift ⊻ 3’ün katı: 6 ve 12 yanlış', 'Ya da: ⊻', 'kural-yada');
  }

  /* ------------------------------------------------------------------ 4. Aralıklarda */
  async function aralik(c) {
    const svg = base(c);
    const X = (v) => 140 + v * 90, NY = 400, BY = NY - 40;
    const ax = g(svg);
    L(ax, 100, NY, 900, NY, '#6d7bb8', 3);
    for (let v = 0; v <= 8; v++) { L(ax, X(v), NY - 8, X(v), NY + 8, '#6d7bb8', 2.5); T(ax, X(v), NY + 40, String(v), { anchor: 'middle', size: 22, fill: MUTE, w: 500 }); }
    const orta = g(svg); L(orta, X(2) + 14, BY, X(6) - 14, BY, OK, 12);
    const dis = g(svg); L(dis, 100, BY, X(2) - 14, BY, B, 12); L(dis, X(6) + 14, BY, 900, BY, B, 12);
    [2, 6].forEach((v) => Ci(svg, X(v), BY, 11, { fill: '#121a3d', stroke: MUTE, sw: 4 }));
    const s1 = T(svg, 90, 96, 'x > 2  ∧  x < 6', { size: 38, w: 800 }); s1.style.fill = OK;
    T(svg, 90, 132, 'kısaca: 2 < x < 6', { size: 24, fill: MUTE, w: 600 });
    const l1 = T(svg, 560, 96, '', { size: 30, w: 800 });
    const s2 = T(svg, 90, 216, 'x < 2  ∨  x > 6', { size: 38, w: 800 }); s2.style.fill = B;
    const l2 = T(svg, 560, 216, '', { size: 30, w: 800 });
    const nokta = Ci(svg, X(4), NY, 13, { fill: A, stroke: '#fff', sw: 3 });
    const nT = T(svg, X(4), NY + 84, '', { anchor: 'middle', size: 28, fill: A, w: 800 });
    const lamba = (t, on) => { t.textContent = on ? 'doğru' : 'yanlış'; t.style.fill = on ? OK : BAD; };
    const upd = (v) => {
      nokta.setAttribute('cx', X(v)); nT.setAttribute('x', X(v)); nT.textContent = 'x = ' + num(v);
      lamba(l1, v > 2 && v < 6); lamba(l2, v < 2 || v > 6);
    };
    upd(4);
    hide(dis, s2, l2);
    await say(c, 'Bildiğin yazım aslında bir “ve”: 2 &lt; x &lt; 6.');
    await par(say(c, 'İki ayrı parça ise “veya” ile yazılır.'), fade(c, [dis, s2, l2], 600));
    const sl = c.slider({ label: '<b class="ca">x</b>', min: 0, max: 8, step: 0.5, value: 4, fmt: (v) => num(v), onInput: (v) => upd(+v) });
    await say(c, 'Noktayı kaydır: hangi önerme doğru oluyor?', { noWait: true });
    await c.cont('Devam ›');
    sl.remove();
    await c.choice({
      tag: 'Tahmin et', q: 'x = 2 için hangisi doğru?', options: ['x > 2 ∧ x < 6', 'x < 2 ∨ x > 6', 'İkisi de yanlış'], answer: 2,
      hints: ['2 > 2 yanlış. “Ve” için ikisi de doğru olmalı.', '2 < 2 de 2 > 6 da yanlış. “Veya” için en az biri doğru olmalı.', ''],
      right: 'Uç nokta iki kümenin de dışında.',
      onPick: (k, ok) => { if (ok) upd(2); },
    });
    c.note('2 &lt; x &lt; 6, yani x &gt; 2 <b>∧</b> x &lt; 6<br>İki parça: x &lt; 2 <b>∨</b> x &gt; 6', 'Aralıklarda ve, veya', 'kural-aralik-baglac');
  }

  /* ------------------------------------------------------------------ 5. Sıra sende */
  async function sira(c) {
    const svg = base(c);
    T(svg, 500, 96, 'n = 15', { anchor: 'middle', size: 48, fill: A, w: 800 });
    const tb = soruTahtasi(c, svg);
    const DY = (dogru, hint) => ({ q: 'n = 15 için doğru mu, yanlış mı?', options: ['Doğru', 'Yanlış'], answer: dogru ? 0 : 1, hints: dogru ? ['', hint] : [hint, ''], damga: dogru ? 'Doğru' : 'Yanlış', renk: dogru ? OK : BAD });
    await say(c, 'Sıra sende: n = 15 için dört önerme.', { ms: 2200 });
    await tb.sor(['n tek  ∧  n 5’in katı'], Object.assign({ right: 'İkisi de doğru.', kanit: '15 tek, 15 = 5 · 3' }, DY(true, '15 tek mi? 5’in katı mı? “Ve” için ikisi de gerekli.')));
    await tb.sor(['n çift  ∨  n 3’ün katı'], Object.assign({ right: 'Biri doğru: yeter.', kanit: '15 çift değil, ama 15 = 3 · 5' }, DY(true, '“Veya” için biri yeter. 15, 3’ün katı mı?')));
    await tb.sor(['n 3’ün katı  ⊻  n 5’in katı'], Object.assign({ right: 'İkisi birden doğru: “ya da” yanlış.', kanit: '15 hem 3’ün hem 5’in katı' }, DY(false, '“Ya da” yalnızca biri doğruyken doğrudur.')));
    await tb.sor(['n çift  ∧  n 3’ün katı'], Object.assign({ right: 'Biri yanlış: “ve” yanlış.', kanit: '15 çift değil' }, DY(false, '“Ve” için ikisi de doğru olmalı. 15 çift mi?')));
  }

  return {
    title: 'Ve, veya, ya da',
    hook: '6 hem çift hem 3’ün katı. Peki 6 için <b>“çift veya 3’ün katı”</b> demek doğru olur mu?',
    scenes: [
      { title: 'Ve: ∧', goal: '“Ve” iki önermenin birden doğru olmasını ister.', run: ve },
      { title: 'Veya: ∨', goal: '“Veya” için en az biri yeter; ikisi birden de olur.', run: veya },
      { title: 'Ya da: ⊻', goal: '“Ya da” yalnızca biri doğruyken doğrudur.', run: yaDa },
      { title: 'Aralıklarda', goal: '2 < x < 6 bir “ve”, iki parçalı küme bir “veya”dır.', run: aralik },
      { title: 'Sıra sende: n = 15', goal: 'Dört bileşik önermeyi sına.', run: sira },
    ],
    quiz: [
      {
        q: 'n = 6 için hangisi <b>yanlıştır</b>?',
        options: ['n çift ∧ n 3’ün katı', 'n çift ∨ n 3’ün katı', 'n çift ⊻ n 3’ün katı', 'n tek ∨ n çift'], answer: 2,
        why: [
          '6 hem çift hem 3’ün katı: “ve” doğru.',
          'En az biri doğru: “veya” doğru.',
          'İkisi birden doğru; “ya da” yalnızca biri doğruyken doğrudur.',
          '6 çift: “veya” için biri yeter.'],
        scene: 2,
      },
      {
        q: '<b>2 &lt; x &lt; 6</b> hangi önermeyle aynıdır?',
        options: ['x > 2 ∨ x < 6', 'x > 2 ∧ x < 6', 'x < 2 ∨ x > 6', 'x < 2 ∧ x > 6'], answer: 1,
        why: [
          'Bunu her gerçek sayı sağlar: x = 10 da (x > 2).',
          'x hem 2’den büyük hem 6’dan küçük olmalı.',
          'Bu, aralığın dışında kalan iki parçadır.',
          'Hiçbir sayı hem 2’den küçük hem 6’dan büyük olamaz.'],
        scene: 3,
      },
      {
        q: 'n = 8 için hangisi <b>doğrudur</b>?',
        options: ['n 3’ün katı ⊻ n 4’ün katı', 'n tek ∨ n 3’ün katı', 'n çift ⊻ n 4’ün katı', 'n çift ∧ n 3’ün katı'], answer: 0,
        why: [
          '8, 4’ün katı ama 3’ün katı değil: yalnızca biri doğru.',
          '8 tek değil, 3’ün katı da değil: “veya” için en az biri doğru olmalı.',
          '8 hem çift hem 4’ün katı; “ya da” yalnızca biri doğruyken doğrudur.',
          '8, 3’ün katı değil: “ve” için ikisi de doğru olmalı.'],
        scene: 2,
      },
      {
        q: 'Bir spor kulübü “basketbol <b>veya</b> voleybol oynayanları” üye alıyor. Hangi öğrenci <b>alınmaz</b>?',
        options: ['Ayşe: yalnızca basketbol oynuyor', 'Burak: yalnızca voleybol oynuyor', 'Deniz: ikisini de oynuyor', 'Elif: ikisini de oynamıyor'], answer: 3,
        why: [
          'Biri doğru: “veya” için yeter.',
          'Biri doğru: “veya” için yeter.',
          'İkisi birden doğru; “veya” bunu da kabul eder.',
          'İkisi de yanlış: “veya” için en az biri doğru olmalı.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Ve ikisini ister, veya en az birini, ya da yalnızca birini.</b>',
      '<b>∧</b> kesişimle, <b>∨</b> birleşimle aynı yeri gösterir.',
      '2 &lt; x &lt; 6, yani x &gt; 2 ∧ x &lt; 6.',
    ],
    next: { href: 'd3-ise-ancak-ve-ancak.html', label: 'Sonraki: İse, ancak ve ancak ›' },
  };
};
