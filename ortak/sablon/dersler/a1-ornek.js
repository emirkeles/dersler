/* A1 — İki sayının ortası (ŞABLON)
   Bir kısa dersin iskeletini ve motorun en sık kullanılan çağrılarını gösterir:
   kanca → tahmin et → gör → adlandır → dene → çıkış soruları (plan/KURALLAR.md).
   Kopyalayınca içeriği tamamen değiştir; `id` alanı '<tema>-<kod>' olmalı. Motorun tamamı: ortak/API.md. */
(() => {
  'use strict';
  const { RENK, yazi, nokta, belir, sayiDogrusu } = window.KIT;
  const { lerp, ease } = Ders;
  const Y = 300;

  /* ---- 1. Kanca, tahmin, gör, adlandır ---- */
  async function ortayiBul(c) {
    const svg = c.svg(1000, 562);
    const d = sayiDogrusu(c, svg, { min: 0, max: 10, y: Y });
    const a = nokta(c, svg, d.x(2), Y, RENK.a), b = nokta(c, svg, d.x(8), Y, RENK.b);
    await Promise.all([belir(c, a), belir(c, b)]);
    await c.say('Sayı doğrusunda iki nokta: <b>2</b> ve <b>8</b>.', { speak: 'Sayı doğrusunda iki nokta var: iki ve sekiz.' });

    // Önce öğrenci tahmin eder; yanlış şıkların her birinin kendi geri bildirimi olur.
    await c.choice({
      tag: 'Tahmin et', q: '2 ile 8’in tam ortasında hangi sayı durur?',
      options: ['4', '5', '6'], answer: 1,
      hints: ['4, 2’ye daha yakın.', '', '6, 8’e daha yakın.'],
      right: 'Evet. 5 iki uca da 3 birim uzak.',
    });

    // Sonra animasyon cevabı gösterir: önce hareket, sonra cümle.
    const orta = nokta(c, svg, d.x(2), Y, RENK.vurgu, 9);
    await c.tween(900, (e) => orta.setAttribute('cx', lerp(d.x(2), d.x(5), e)), ease.inOut);
    await belir(c, yazi(c, svg, d.x(5), Y - 34, '5', { size: 34, renk: RENK.vurgu }));
    await c.say('Orta nokta iki uca <b>eşit uzaklıkta</b> durur.', { speak: 'Orta nokta iki uca eşit uzaklıkta durur.' });

    // Kural deftere düşer: formül + tek örnek.
    c.note('<b>Orta = (a + b) ÷ 2</b><br>(2 + 8) ÷ 2 = 5', 'Orta nokta', 'orta');
  }

  /* ---- 2. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const d = sayiDogrusu(c, svg, { min: 0, max: 10, y: Y });
    nokta(c, svg, d.x(2), Y, RENK.a);
    const b = nokta(c, svg, d.x(8), Y, RENK.b);
    const orta = nokta(c, svg, d.x(5), Y, RENK.vurgu, 9);
    const etiket = yazi(c, svg, d.x(5), Y - 34, '5', { size: 34, renk: RENK.vurgu });
    const ciz = (v) => {
      const m = (2 + v) / 2;
      b.setAttribute('cx', d.x(v)); orta.setAttribute('cx', d.x(m)); etiket.setAttribute('x', d.x(m));
      etiket.textContent = String(m).replace('.', ',');
    };
    await c.say('Sağdaki noktayı oynat; ortanın nasıl kaydığına bak.', { noWait: true });
    c.slider({ label: 'Sağdaki nokta', min: 2, max: 10, step: 1, value: 8, onInput: ciz });
    await c.cont('Devam ›');   // keşif sahnesi öğrenci "Devam" deyince biter
  }

  Ders.start({
    id: 'sablon-a1', kicker: 'Konu A · Konunun adı', title: 'İki sayının ortası', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'İki sayının ortası', hook: '2 ile 8’in tam ortasında hangi sayı durur?', button: 'Derse başla ›' },
    goals: ['İki sayının orta noktasını bulur.'],
    scenes: [
      { title: 'Ortayı bul', goal: 'Orta noktanın iki uca eşit uzaklıkta olduğunu gör.', run: ortayiBul },
      { title: 'Dene', goal: 'Uç değişince ortanın nasıl değiştiğini gör.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '4 ile 10’un ortası kaçtır?', options: ['6', '7', '8'], answer: 1,
        why: ['6, 4’e daha yakın.', '(4 + 10) ÷ 2 = 7.', '8, 10’a daha yakın.'], scene: 0 },
      { q: 'Ortası 6 olan iki sayı hangisi olabilir?', options: ['3 ve 8', '4 ve 8', '5 ve 8'], answer: 1,
        why: ['(3 + 8) ÷ 2 = 5,5.', '(4 + 8) ÷ 2 = 6.', '(5 + 8) ÷ 2 = 6,5.'], scene: 1 },
    ],
    summary: ['<b>Orta, iki ucun tam arasıdır.</b>', '<b>Orta = (a + b) ÷ 2</b>'],
    // nextLesson: { href: 'a2-….html', label: 'Sonraki: … ›' },
  });
})();
