/* B3 — Üçgen eşitsizliği: her üç uzunluk üçgen kurmaz
   Üç uzunluk, ancak her biri öbür ikisinin toplamından kısaysa üçgen kurar. Program doğrulama ister.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/B-kenarlar-ve-acilar.md */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, gizle, belir, par, isaret, tahminAl, cubuklar: duzenek } = window.KIT;
  /* b + cc ile a'nın karşılaştırması: renkli tek satır. */
  const karsilastir = (c, t, a, b, cc) => {
    const son = b + cc === a ? ' = ' + a : ' = ' + (b + cc) + (b + cc > a ? '   >   ' : '   <   ') + a;
    parcaKoy(c, t, [[String(b), RENK.B], ' + ', [String(cc), RENK.C], son]);
  };

  /* ---- 1. Kur bakalım ---- */
  async function kur(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, 8, 3, 4);
    d.ac();
    const ust = renkli(c, svg, 500, 90, [''], { size: 36, kalin: 700 });
    const bosluk = c.S('g', {}, svg);
    gizle(ust, bosluk);
    await c.say('8 metrelik çubuğun uçlarına 3 ve 4 metrelik çubuklar menteşeli.', { speak: 'Sekiz metrelik çubuğun uçlarına üç ve dört metrelik çubuklar menteşeli.' });
    await tahminAl(c, { q: 'Kısa çubukları içe doğru döndürürsek uçları buluşur mu, üçgen kurulur mu?', options: ['Kurulur', 'Kurulmaz'] });
    const s = await par(c.say('Çubukları içe doğru döndürüyoruz.'), d.kapat(2200)).then((r) => r[1]);
    const mx = (s.L[0] + s.Rt[0]) / 2;
    cizgi(c, bosluk, [s.L[0] + 6, 376], [s.Rt[0] - 6, 376], RENK.dis, 3);
    yazi(c, bosluk, mx, 356, '1 m boşluk', { size: 22, kalin: 700, renk: RENK.dis });
    await par(c.say('Çubuklar tabana yattı; uçları yine buluşmadı.'), belir(c, bosluk, 400));
    karsilastir(c, ust, 8, 3, 4);
    await par(c.say('İki kısa çubuk birlikte bile tabana yetmiyor.'), belir(c, ust, 400));
    await c.say('Demek ki her üç uzunluk bir üçgen kurmaz.', { speak: '[thoughtful] Demek ki her üç uzunluk bir üçgen kurmaz.' });
  }

  /* ---- 2. Ne zaman kapanır? ---- */
  async function neZaman(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, 8, 3, 4, { u: 45 });
    const ust = renkli(c, svg, 500, 80, [''], { size: 36, kalin: 700 });
    const durum = yazi(c, svg, 500, 126, '', { size: 24, kalin: 600 });
    const ciz = (v) => {
      d.boy(3, v); const s = d.sonuc(); karsilastir(c, ust, 8, 3, v);
      durum.textContent = s.durum === 'var' ? 'üçgen var' : s.durum === 'duz' ? 'düz çizgi: üçgen yok' : 'uçlar buluşmuyor';
      durum.style.fill = s.durum === 'var' ? RENK.iyi : RENK.kotu;
    };
    await c.say('Sağdaki çubuğu uzat: uçlar ne zaman buluşuyor?', { noWait: true });
    const sl = c.slider({ label: 'Sağ çubuğun boyu', min: 2, max: 9, step: 1, value: 4, fmt: (v) => v + ' m', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove(); ciz(5);
    await c.choice({
      tag: 'Ne gördün?', q: 'Sağ çubuk 5 m iken (3 + 5 = 8) ne oldu?',
      options: ['Üçgen kuruldu', 'Uçlar buluştu, ama düz bir çizgi oldu', 'Uçlar buluşmadı'], answer: 1,
      hints: ['Uçlar tabanın tam üstünde buluştu; arada alan kalmadı.', '', 'Toplam tam 8: uçlar birbirine değdi.'],
      right: 'Toplam tabana eşitse çubuklar tabanın üstüne yatar.',
    });
    await c.say('Toplam tabana eşitse üçgen olmaz; tabandan <b>büyük</b> olmalı.');
    ciz(6);
    await c.say('3 + 6 = 9, 8’den büyük: üçgen kapandı.', { speak: 'Üç artı altı dokuz eder, sekizden büyük: üçgen kapandı.' });
  }

  /* ---- 3. Üçgen eşitsizliği ---- */
  async function esitsizlik(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, 9, 4, 3, { cx: 290, u: 42 });
    d.ac();
    const satir = (i, metin, tur) => {
      const g = c.S('g', {}, svg);
      yazi(c, g, 640, 190 + i * 84, metin, { hiza: 'start', size: 34, kalin: 700, renk: tur === 'ok' ? RENK.yazi : RENK.kotu });
      isaret(c, g, 900, 178 + i * 84, tur, 17); gizle(g); return g;
    };
    const r = [satir(0, '3 < 4 + 9', 'ok'), satir(1, '4 < 3 + 9', 'ok'), satir(2, '9 < 3 + 4', 'no')];
    await c.say('Yeni üçlü: 9, 4 ve 3 metre. Her çubuğu sırayla kontrol edelim.', { speak: 'Yeni üçlü: dokuz, dört ve üç metre. Her çubuğu sırayla kontrol edelim.' });
    await par(c.say('İlk iki çubuk, öbür ikisinin toplamından kısa.'), (async () => { await belir(c, r[0], 400); await c.wait(500); await belir(c, r[1], 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'İki kontrol tuttu. Üçgen kurulur mu?',
      options: ['Evet, iki kontrol yeter', 'Bilemeyiz, üçüncüye de bakmak gerek'], answer: 1,
      hints: ['En uzun çubuğu henüz kontrol etmedik.', ''],
      right: 'Koşul her kenar için tutmalı.',
    });
    await par(c.say('En uzun çubuk tutmadı: 3 + 4, 9’a yetmiyor.', { speak: 'En uzun çubuk tutmadı: üç artı dört, dokuza yetmiyor.' }), (async () => { await belir(c, r[2], 400); await d.kapat(1800); })());
    await c.say('Kısa yol: yalnızca <b>en uzun</b> kenarı kontrol etmek yeter.', { speak: 'Kısa yol: [short pause] yalnızca en uzun kenarı kontrol etmek yeter.' });
    await c.say('Çubuk kesmeden, toplamı kontrol ederek karar verdik.');
    c.note('<b>Her kenar, öbür ikisinin toplamından kısadır.</b><br>3 + 4 &lt; 8: kurulmaz', 'Üçgen eşitsizliği', 'gs-ucgen-esitsizligi');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const sorular = [
      { k: [10, 5, 6], kurar: true, ipucu: 'En uzun kenar 10; öbür ikisinin toplamı 11.', dogru: '5 + 6 = 11, 10’dan büyük.' },
      { k: [5, 2, 3], kurar: false, ipucu: '2 + 3 tam 5 eder: uçlar tabanın üstünde buluşur.', dogru: 'Toplam eşit: düz çizgi olur, üçgen olmaz.' },
      { k: [9, 4, 4], kurar: false, ipucu: '4 + 4 = 8; 9’a yetmiyor.', dogru: '4 + 4 = 8, 9’dan küçük.' },
      { k: [7, 7, 7], kurar: true, ipucu: '7 + 7 = 14; 7’den büyük.', dogru: 'Üç kenar eşit: 7 + 7, 7’den büyük.' },
    ];
    const ust = renkli(c, svg, 500, 70, [''], { size: 34, kalin: 700 });
    await c.say('Sıra sende: bu üç çubuk üçgen kurar mı?', { noWait: true });
    let i = 0;
    for (const s of sorular) {
      const [a, b, cc] = s.k, d = duzenek(c, svg, a, b, cc);
      d.ac(); ust.textContent = ''; gizle(d.g);
      await belir(c, d.g, 350);
      await c.choice({
        tag: 'Soru ' + (++i) + ' / ' + sorular.length, q: [b, cc, a].join(' m, ') + ' m: üçgen kurulur mu?',
        options: ['Kurulur', 'Kurulmaz'], answer: s.kurar ? 0 : 1,
        hints: s.kurar ? ['', s.ipucu] : [s.ipucu, ''],
        right: s.dogru,
      });
      karsilastir(c, ust, a, b, cc);
      await d.kapat(1300); await c.wait(900);
      if (i < sorular.length) { await belir(c, d.g, 300, 0); d.g.remove(); }
    }
    await c.say('Her kenar, öbür ikisinin toplamından kısadır.');
  }

  Ders.start({
    id: 'geometrik-sekiller-b3', kicker: 'Konu B · Kenarlar ve açılar', title: 'Üçgen eşitsizliği', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Üçgen eşitsizliği: her üç uzunluk üçgen kurmaz',
      hook: 'Bir mühendisin elinde <b>3 m, 4 m ve 8 m</b>’lik üç çelik çubuk var. Bunlarla üçgen bir destek kurabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Üç uzunluğun üçgen kurup kurmayacağını toplamı kontrol ederek söyler.', 'Üçgen eşitsizliğini çubuklarla doğrular.'],
    scenes: [
      { title: 'Kur bakalım', goal: '3, 4 ve 8 metrelik çubukların üçgen kurmadığını gör.', run: kur },
      { title: 'Ne zaman kapanır?', goal: 'Uçların hangi boydan sonra buluştuğunu bul.', run: neZaman },
      { title: 'Üçgen eşitsizliği', goal: 'Koşulun her kenar için tutması gerektiğini gör.', run: esitsizlik },
      { title: 'Sıra sende', goal: 'Dört üçlünün üçgen kurup kurmadığına karar ver.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Hangi üç uzunluk bir üçgen kurar?',
        options: ['3, 5, 9', '4, 6, 10', '5, 7, 10'], answer: 2,
        why: ['3 + 5 = 8; 9’dan küçük.', '4 + 6 = 10; eşit olunca düz çizgi olur.', '5 + 7 = 12; 10’dan büyük.'],
        scene: 2,
      },
      {
        q: '3 m, 4 m ve 8 m’lik çubuklar neden üçgen kurmaz?',
        options: ['3 + 4, 8’den kısa olduğu için', 'Çubukların boyları eşit olmadığı için', '8 çift sayı olduğu için'], answer: 0,
        why: ['İki kısa çubuk birlikte en uzununa yetişmiyor.', 'Boyları farklı çubuklar da üçgen kurabilir: 5, 6, 10 gibi.', 'Sayının çift ya da tek olması önemli değil; toplam önemli.'],
        scene: 0,
      },
      {
        q: 'Ece 2, 6 ve 9 cm’lik çubuklar için “6 + 9, 2’den büyük; üçgen kurulur” diyor. Ece nerede yanılıyor?',
        options: ['Yanılmıyor; bir toplamın büyük olması yeter.', 'Üç çubuğun boyu da farklı; üçgen kurulmaz.', 'En uzun çubuğu kontrol etmedi: 2 + 6, 9’dan küçük.'], answer: 2,
        why: ['Koşul her kenar için tutmalı; biri tutmazsa üçgen kapanmaz.', 'Boyları farklı çubuklar da üçgen kurar: 5, 7, 10 gibi.', 'İki kısa çubuk birlikte en uzununa yetişmiyor.'],
        scene: 2,
      },
      {
        q: '40 cm’lik bir tel üç parçaya bölünüp uçları birleştirilecek. Hangi bölme bir üçgen verir?',
        options: ['20, 10, 10', '18, 12, 10', '22, 10, 8'], answer: 1,
        why: ['10 + 10 = 20: toplam eşit, tel düz çizgi olur.', '12 + 10 = 22; 18’den büyük.', '10 + 8 = 18; 22’ye yetmiyor.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Her kenar, öbür ikisinin toplamından kısadır.</b>',
      'Toplam <b>eşit</b> çıkarsa düz çizgi olur, üçgen olmaz.',
      'Kısa yol: en uzun kenarı öbür ikisinin toplamıyla karşılaştır.',
    ],
    nextLesson: { href: 'b4-ucuncu-kenar-araligi.html', label: 'Sonraki: Üçüncü kenar hangi aralıkta? ›' },
  });
})();
