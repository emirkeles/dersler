/* A1 — Ölçmek ispat değildir
   Birkaç üçgende ölçüp 180° bulmak bütün üçgenler için bir şey göstermez; genelleme ispat ister.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, kutu, gizle, belir, par, ucgen, tepeKontrol } = window.KIT;

  /* Yan yana üç üçgen: önce açılar, sonra altlarına toplam yazılır. */
  async function ucUcgen(c, svg, koseler, adlar) {
    const us = koseler.map((k) => ucgen(c, svg, k[0], k[1], k[2], { harf: false, olcu: 'derece', r: 34, olcuSize: 20 }));
    const toplamlar = koseler.map((k) => yazi(c, svg, (k[1][0] + k[2][0]) / 2, 418, '180°', { size: 30, kalin: 700 }));
    const adYazi = (adlar || []).map((ad, i) => yazi(c, svg, (koseler[i][1][0] + koseler[i][2][0]) / 2, 462, ad, { size: 22, kalin: 500, renk: RENK.soluk }));
    us.forEach((u) => gizle(u.g, u.olculer)); gizle(toplamlar, adYazi);
    return { us, toplamlar, adYazi };
  }
  async function olc(c, d) {
    for (let i = 0; i < d.us.length; i++) {
      await belir(c, d.us[i].olculer, 350); await c.wait(250);
      await belir(c, d.toplamlar[i], 300); await c.wait(200);
    }
  }

  /* ---- 1. Üç maket ---- */
  async function ucMaket(c) {
    const svg = c.svg(1000, 562);
    const d = await ucUcgen(c, svg, [
      [[170, 150], [70, 360], [290, 360]],
      [[520, 130], [400, 360], [620, 360]],
      [[800, 170], [720, 360], [930, 360]],
    ]);
    await par(c.say('Mimarın üç maketi: her köşedeki açı ölçülecek.'), (async () => {
      for (const u of d.us) { await belir(c, u.g, 350); await c.wait(150); }
    })());
    await par(c.say('Üçünde de açıların toplamı <b>180°</b> çıktı.', { speak: 'Üçünde de açıların toplamı yüz seksen derece çıktı.' }), olc(c, d));
    await c.choice({
      tag: 'Tahmin et', q: 'Üç üçgende de 180° çıktı. Bütün üçgenler için emin olabilir miyiz?',
      options: ['Evet, üç örnek yeter', 'Hayır, denenmemiş üçgenler var'], answer: 1,
      hints: ['Bu üçü birbirine çok benziyor. Hiç denemediğin biçimde bir üçgen düşün.', ''],
      right: 'Üçü de dar açılı; başka türler hiç denenmedi.',
    });
    const alt = yazi(c, svg, 500, 500, 'üçü de dar açılı', { size: 26, kalin: 600, renk: RENK.dis });
    gizle(alt);
    await par(c.say('Üç maket de aynı türden: hepsi <b>dar açılı</b>.'), belir(c, alt, 400));
  }

  /* ---- 2. Başka türler ---- */
  async function baskaTurler(c) {
    const svg = c.svg(1000, 562);
    const d = await ucUcgen(c, svg, [
      [[70, 150], [70, 360], [290, 360]],
      [[640, 200], [390, 360], [570, 360]],
      [[830, 140], [750, 360], [910, 360]],
    ], ['dik', 'geniş açılı', 'ikizkenar']);
    await par(c.say('Bu kez başka türler: dik, geniş açılı, ikizkenar.'), (async () => {
      for (let i = 0; i < 3; i++) { await par(belir(c, d.us[i].g, 350), belir(c, d.adYazi[i], 350)); await c.wait(150); }
    })());
    await par(c.say('Ölçtük: toplam yine <b>180°</b>.', { speak: 'Ölçtük: toplam yine yüz seksen derece.' }), olc(c, d));
    await c.choice({
      tag: 'Tahmin et', q: 'Altı üçgen oldu. Şimdi “bütün üçgenler” diyebilir miyiz?',
      options: ['Evet, her türden denedik', 'Hayır, hâlâ denenmemiş üçgen var'], answer: 1,
      hints: ['Her türden birer tane denedik; ama her türde sayısız üçgen var.', ''],
      right: 'Türler çeşitlendi, güven arttı; ama liste bitmedi.',
    });
    await c.say('Farklı türler güveni artırır, ama denenecek üçgen bitmez.', { speak: '[thoughtful] Farklı türler güveni artırır, ama denenecek üçgen bitmez.' });
  }

  /* ---- 3. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const B = [250, 430], C = [750, 430];
    const u = ucgen(c, svg, [450, 170], B, C, { olcu: 'derece' });
    const toplam = renkli(c, svg, 500, 520, [''], { size: 34, kalin: 700 });
    const sayac = yazi(c, svg, 40, 48, '', { hiza: 'start', size: 22, kalin: 600 });
    yazi(c, svg, 40, 80, 'Denenmemiş: sonsuz', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    let n = 0;
    await c.say('Tepe köşesini gezdir: toplam hiç değişiyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, {
      x: [150, 850], y: [130, 330], bas: [450, 170],
      ciz: (P) => {
        u.koy(P, B, C); const [a, b, g] = u.D(); n++;
        parcaKoy(c, toplam, [[a + '°', RENK.A], ' + ', [b + '°', RENK.B], ' + ', [g + '°', RENK.C], ' = 180°']);
        sayac.textContent = 'Denenen üçgen: ' + n;
      },
    });
    await c.cont('Devam ›');
    t.kaldir();
    await c.say('Kaç üçgen denersen dene, denenmemişler hep kalır.');
  }

  /* ---- 4. Doğrulama ve ispat ---- */
  async function adlandir(c) {
    const svg = c.svg(1000, 562);
    const kucuk = (p, x, y, s, k, renk) => c.S('polygon', {
      points: k.map((q) => (x + q[0] * s) + ',' + (y + q[1] * s)).join(' '), fill: 'none', stroke: renk, 'stroke-width': 2, 'stroke-linejoin': 'round',
    }, p);
    const bicimler = [[[0, 0], [-10, 20], [12, 20]], [[-10, 0], [-10, 20], [12, 20]], [[14, 4], [-12, 20], [6, 20]], [[0, -4], [-8, 20], [8, 20]], [[-4, 2], [-12, 20], [14, 20]], [[6, 0], [-12, 20], [10, 20]]];
    const onerme = yazi(c, svg, 500, 70, 'Her üçgende iç açılar toplamı 180°dir.', { size: 30, kalin: 700 });
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    kutu(c, sol, 70, 130, 400, 330); kutu(c, sag, 530, 130, 400, 330, { renk: RENK.iyi });
    yazi(c, sol, 270, 180, 'Doğrulama', { size: 30, kalin: 700 });
    yazi(c, sol, 270, 428, 'denediğin üçgenler', { size: 24, kalin: 500, renk: RENK.soluk });
    bicimler.forEach((b, i) => kucuk(sol, 150 + (i % 3) * 120, 240 + Math.floor(i / 3) * 80, 2.2, b, RENK.cizgi));
    yazi(c, sag, 730, 180, 'İspat', { size: 30, kalin: 700, renk: RENK.iyi });
    yazi(c, sag, 730, 428, 'bütün üçgenler', { size: 24, kalin: 500, renk: RENK.soluk });
    for (let i = 0; i < 40; i++) kucuk(sag, 562 + (i % 10) * 37.5, 222 + Math.floor(i / 10) * 46, 0.95, bicimler[(i * 5 + Math.floor(i / 10)) % 6], RENK.iyi);
    gizle(onerme, sol, sag);
    await par(c.say('Bu bir <b>genelleme</b>: bütün üçgenler hakkında konuşuyor.'), belir(c, onerme, 450));
    await par(c.say('Ölçerek <b>doğruladık</b>: yalnızca denediğimiz üçgenler için.'), belir(c, sol, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'Genellemenin bütün üçgenlerde doğru olduğunu ne gösterir?',
      options: ['Daha çok ölçüm', 'Daha dikkatli çizim', 'İspat'], answer: 2,
      hints: ['Ölçüm kaç olursa olsun, denenmemiş üçgen kalır.', 'En düzgün çizim de tek bir üçgendir.', ''],
      right: 'İspat, tek tek denemeden hepsini kapsar.',
    });
    await par(c.say('<b>İspat</b> bütün üçgenleri birden kapsar.', { speak: 'İspat, [short pause] bütün üçgenleri birden kapsar.' }), belir(c, sag, 450));
    c.note('<b>Doğrulama:</b> denenen örnekler.<br><b>İspat:</b> bütün üçgenler.', 'Doğrulama ve ispat', 'gs-dogrulama-ispat');
  }

  Ders.start({
    id: 'geometrik-sekiller-a1', kicker: 'Konu A · Açılar ve ispat', title: 'Ölçmek ispat değildir', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Ölçmek ispat değildir',
      hook: 'Bir mimar üç maket üçgende açıları ölçtü; üçünde de toplam <b>180°</b> çıktı. Çizeceği <b>bütün</b> üçgenler için emin olabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Birkaç örneğin bir genellemeyi ispatlamadığını görür.', 'Doğrulama ile ispatı birbirinden ayırır.'],
    scenes: [
      { title: 'Üç maket', goal: 'Üç örneğin “bütün üçgenler” demeye yetmediğini gör.', run: ucMaket },
      { title: 'Başka türler', goal: 'Farklı türde üçgenler dene; liste yine bitmez.', run: baskaTurler },
      { title: 'Dene', goal: 'Tepe köşesini gezdir; denenmemiş üçgen hep kalır.', run: dene },
      { title: 'Doğrulama ve ispat', goal: 'Doğrulama örnekleri, ispat bütün üçgenleri kapsar.', run: adlandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Elif 50 farklı üçgende iç açıları ölçtü, hepsinde toplam 180° çıktı. Bu ne gösterir?',
        options: ['Önerme bütün üçgenler için ispatlandı.', 'Önerme 50 üçgen için doğrulandı; bütün üçgenler için ispat gerekir.', '50 örnek yetmez, ama 1000 örnek ispat olur.'], answer: 1,
        why: ['Denenmemiş üçgenler var; ölçmek onları kapsamaz.', 'Ölçmek yalnızca denenen üçgenleri kapsar.', 'Örnek sayısı kaç olursa olsun denenmemiş üçgen kalır.'],
        scene: 3,
      },
      {
        q: 'Bir genellemeyi sınarken hangi üç üçgen daha iyi bir denemedir?',
        options: ['Üç eşkenar üçgen', 'Aynı üçgenin küçük, orta ve büyük boyu', 'Dar, dik ve geniş açılı birer üçgen'], answer: 2,
        why: ['Üçü de aynı türden; başka türler denenmemiş olur.', 'Boy değişir, açılar aynı kalır: tek üçgen denemiş olursun.', 'Farklı türler, tek biçime bağlı kalmanı önler.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Ölçmek örnek verir, ispat hepsini kapsar.</b>',
      '<b>Doğrulama</b> yalnızca denediğin üçgenler içindir; farklı türde üçgenlerle yapılır.',
      '“Her üçgende 180°” bir genellemedir; <b>ispat</b> ister.',
    ],
    nextLesson: { href: 'a2-ispat-neye-dayanir.html', label: 'Sonraki: İspat doğru bilgilerin üstüne kurulur ›' },
  });
})();
