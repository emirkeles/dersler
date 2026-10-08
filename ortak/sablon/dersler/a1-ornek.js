/* A1 — İki sayının ortası (ŞABLON)
   Bir kısa dersin iskeletini ve motorun en sık kullanılan çağrılarını gösterir:
   anlat → örnekle göster → birlikte çöz → sor → gör → adlandır → dene → çıkış soruları (plan/KURALLAR.md 3.2).
   Ders yeni bir soruyla açılmaz: önce konu anlatılır ve örnekle gösterilir, soru sonra gelir.
   Bu, temanın ilk dersidir; sonraki derslerde ilk sahne "Hatırla" olur: önceki derslerden 1–2 c.choice sorusu (3.4).
   Kopyalayınca içeriği tamamen değiştir; `id` alanı '<tema>-<kod>' olmalı. Motorun tamamı: ortak/API.md. */
(() => {
  'use strict';
  const { RENK, yazi, nokta, belir, sayiDogrusu } = window.KIT;
  const { lerp, ease } = Ders;
  const Y = 300;

  /* ---- 1. Anlat, örnekle göster, birlikte çöz, sor, gör, adlandır ---- */
  async function ortayiBul(c) {
    const svg = c.svg(1000, 562);
    const d = sayiDogrusu(c, svg, { min: 0, max: 10, y: Y });
    const a = nokta(c, svg, d.x(2), Y, RENK.a), b = nokta(c, svg, d.x(8), Y, RENK.b);
    await Promise.all([belir(c, a), belir(c, b)]);

    // Önce anlat: durum tanıtılır, kavram adlandırılır ve tahtada gösterilir.
    await c.say('Sayı doğrusunda iki nokta: <b>2</b> ve <b>8</b>.', { speak: 'Sayı doğrusunda iki nokta var: iki ve sekiz.' });
    await c.say('İki sayının <b>ortası</b>, iki uca eşit uzaklıkta duran noktadır.', { speak: 'İki sayının ortası, iki uca eşit uzaklıkta duran noktadır.' });

    // Örnekle göster: önce hareket, sonra cümle.
    const orta = nokta(c, svg, d.x(2), Y, RENK.vurgu, 9);
    await c.tween(900, (e) => orta.setAttribute('cx', lerp(d.x(2), d.x(5), e)), ease.inOut);
    const etiket = yazi(c, svg, d.x(5), Y - 34, '5', { size: 34, renk: RENK.vurgu });
    await belir(c, etiket);
    await c.say('<b>5</b>, iki uca da 3 birim uzak: orta nokta 5.', { speak: 'Beş, iki uca da üç birim uzak: orta nokta beş.' });
    const islem = yazi(c, svg, d.x(5), 130, '(2 + 8) ÷ 2 = 5', { size: 30 });
    await belir(c, islem);
    await c.say('Hesapla da bulunur: iki sayıyı topla, ikiye böl.', { speak: 'Hesapla da bulunur: iki sayıyı topla, ikiye böl.' });

    // Birlikte çöz: yarısı çözülmüş örnek. İlk adım tahtada verilir, son adımı öğrenci tamamlar.
    const tasi = (a0, a1, b0, b1) => c.tween(900, (e) => {
      a.setAttribute('cx', lerp(d.x(a0), d.x(a1), e)); b.setAttribute('cx', lerp(d.x(b0), d.x(b1), e));
    }, ease.inOut);
    const ortaGoster = (v) => {
      orta.setAttribute('cx', d.x(v)); etiket.setAttribute('x', d.x(v)); etiket.textContent = String(v);
      orta.style.opacity = 1; etiket.style.opacity = 1;
    };
    orta.style.opacity = 0; etiket.style.opacity = 0;
    islem.textContent = '(4 + 10) ÷ 2 = 14 ÷ 2 = ?';
    await tasi(2, 4, 8, 10);
    await c.say('Yeni uçlar <b>4</b> ve <b>10</b>; toplamları 14.', { speak: 'Yeni uçlar dört ve on; toplamları on dört.' });
    await c.choice({
      tag: 'Birlikte çöz', q: 'Son adımı sen tamamla: 14 ÷ 2 kaç eder?',
      options: ['6', '7', '8'], answer: 1,
      hints: ['6 × 2 = 12 eder.', '', '8 × 2 = 16 eder.'],
      right: 'Evet. 4 ile 10’un ortası 7.',
    });
    islem.textContent = '(4 + 10) ÷ 2 = 7'; ortaGoster(7);

    // Sonra sor: öğrenci anlatılanı yeni bir duruma tek başına uygular; yanlış şıkların her birinin kendi geri bildirimi olur.
    orta.style.opacity = 0; etiket.style.opacity = 0;
    islem.textContent = '';
    await tasi(4, 1, 10, 9);
    await c.choice({
      tag: 'Sıra sende', q: '1 ile 9’un tam ortasında hangi sayı durur?',
      options: ['4', '5', '6'], answer: 1,
      hints: ['4, 1’e daha yakın.', '', '6, 9’a daha yakın.'],
      right: 'Evet. (1 + 9) ÷ 2 = 5.',
    });

    // Gör: tahta cevabı gösterir; ardından cevabın nedeni söylenir.
    islem.textContent = '(1 + 9) ÷ 2 = 5'; ortaGoster(5);
    await c.say('<b>5</b>, iki uca da 4 birim uzak.', { speak: 'Beş, iki uca da dört birim uzak.' });

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
    // 4–5 çıkış sorusu: en az ikisi yeni bir duruma uygulama, en az biri hedeflenen yanılgı (plan/KURALLAR.md 3.4).
    quiz: [
      { q: '3 ile 11’in ortası kaçtır?', options: ['6', '7', '8'], answer: 1,
        why: ['6, 3’e daha yakın.', '(3 + 11) ÷ 2 = 7.', '8, 11’e daha yakın.'], scene: 0 },
      { q: 'Ortası 6 olan iki sayı hangisi olabilir?', options: ['3 ve 8', '4 ve 8', '5 ve 8'], answer: 1,
        why: ['(3 + 8) ÷ 2 = 5,5.', '(4 + 8) ÷ 2 = 6.', '(5 + 8) ÷ 2 = 6,5.'], scene: 1 },
      { q: '0 ile 7’nin ortası kaçtır?', options: ['3', '3,5', '4'], answer: 1,
        why: ['3, 0’a daha yakın.', '(0 + 7) ÷ 2 = 3,5.', '4, 7’ye daha yakın.'], scene: 0 },
      { q: 'İki sayının ortasını bulmak için ne yapılır?', options: ['Büyük sayı ikiye bölünür.', 'İki sayı toplanır, ikiye bölünür.', 'Büyük sayıdan küçük sayı çıkarılır.'], answer: 1,
        why: ['8 ÷ 2 = 4 eder; 2 ile 8’in ortası 5’tir.', 'Orta = (a + b) ÷ 2.', 'Fark, iki sayı arasındaki uzaklığı verir.'], scene: 0 },
    ],
    summary: ['<b>Orta, iki ucun tam arasıdır.</b>', '<b>Orta = (a + b) ÷ 2</b>'],
    // nextLesson: { href: 'a2-….html', label: 'Sonraki: … ›' },
  });
})();
