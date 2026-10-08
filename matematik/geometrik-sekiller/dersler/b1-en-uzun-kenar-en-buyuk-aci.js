/* B1 — En uzun kenarın karşısı en büyük açıdır
   Her açının karşısında bir kenar vardır; en uzun kenarın karşısındaki açı en büyüktür. Program doğrulama ister.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/B-kenarlar-ve-acilar.md */
(() => {
  'use strict';
  const { RENK, rad, uz, ileri, ara, yazi, cizgi, koy, nokta, gizle, belir, par, dilim, ucgen, kenarlar, ok, tahminAl, tepeKontrol, mentese } = window.KIT;
  const { lerp, ease } = Ders;
  const sayi = (x) => x.toFixed(1).replace('.', ',');

  /* En büyük açının dilimini ve karşısındaki kenarı öne çıkarır (i: köşe sırası; -1 ise hepsi eşit ağırlıkta). */
  const vurgula = (u, k, i) => {
    u.dilimler.forEach((d, j) => d.el.setAttribute('fill-opacity', i < 0 ? 0.55 : j === i ? 0.95 : 0.3));
    k.hat.forEach((h, j) => h.setAttribute('stroke-width', j === i ? 9 : 5));
  };

  /* ---- 1. Karşı kenar ---- */
  async function karsiKenar(c) {
    const svg = c.svg(1000, 562);
    const A = [460, 160], B = [180, 420], C = [820, 420];
    ucgen(c, svg, A, B, C, { r: 46 });
    const k = kenarlar(c, svg, A, B, C);
    gizle(k.hat);
    const gosterge = ok(c, svg, ileri(A, Math.PI / 2, 60), ileri(ara(B, C, 0.47), -Math.PI / 2, 14), RENK.A, 3);
    gizle(gosterge.g);
    await c.say('Bir çatı makası: üç çubuk, üç köşe.');
    await par(c.say('A’daki açının değmediği tek kenar BC: onun <b>karşısı</b>.'), (async () => { await belir(c, gosterge.g, 400); await belir(c, k.hat[0], 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'B’deki açının karşısındaki kenar hangisi?',
      options: ['AB', 'BC', 'AC'], answer: 2,
      hints: ['AB, B’den çıkıyor: açının kollarından biri.', 'BC de B’den çıkıyor: açının kollarından biri.', ''],
      right: 'B’ye değmeyen tek kenar: AC.',
    });
    await par(c.say('Her açı ile karşısındaki kenar aynı renkte.'), (async () => { await belir(c, gosterge.g, 300, 0); await belir(c, k.hat[1], 400); await belir(c, k.hat[2], 400); })());
    await tahminAl(c, { q: 'En uzun çubuk BC. Karşısındaki A köşesi sence en dar mı, en geniş mi?', options: ['En dar', 'En geniş'] });
    await c.say('Tahminini aklında tut; birazdan ölçeceğiz.');
  }

  /* ---- 2. Aç, kapa ---- */
  async function acKapa(c) {
    const svg = c.svg(1000, 562);
    const m = mentese(c, svg, { A: [300, 440], taban: 6, kol: 5, S: 40, harf: true });
    yazi(c, svg, 800, 170, 'A’daki açı', { size: 22, kalin: 500, renk: RENK.soluk });
    const tAci = yazi(c, svg, 800, 224, '', { size: 46, kalin: 700, renk: RENK.A });
    yazi(c, svg, 800, 320, 'karşı kenar', { size: 22, kalin: 500, renk: RENK.soluk });
    const tKenar = yazi(c, svg, 800, 374, '', { size: 46, kalin: 700, renk: RENK.A });
    const ciz = (derece) => { m.ciz(derece); tAci.textContent = Math.round(derece) + '°'; tKenar.textContent = sayi(m.karsi()); };
    ciz(60);
    await par(c.say('A’da menteşeli iki çubuk: boyları sabit, aradaki açı değişiyor.'), (async () => {
      await c.tween(1500, (e) => ciz(lerp(60, 130, e)), ease.inOut); await c.tween(1500, (e) => ciz(lerp(130, 60, e)), ease.inOut);
    })());
    await c.say('Açıyı aç, kapa: karşıdaki kenara ne oluyor?', { noWait: true });
    const sl = c.slider({ label: 'A’daki açı', min: 20, max: 160, step: 5, value: 60, fmt: (v) => v + '°', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove();
    await c.choice({
      tag: 'Ne gördün?', q: 'Açı büyüdükçe karşısındaki kenar ne oldu?',
      options: ['Kısaldı', 'Değişmedi', 'Uzadı'], answer: 2,
      hints: ['Açıyı 160°’ye getir: karşı kenar en uzun hâlinde.', 'İki çubuk sabit; ama karşı kenar değişiyor.', ''],
      right: 'Kollar açıldıkça uçlar birbirinden uzaklaşır.',
    });
    await c.say('Açı açıldıkça karşısındaki kenar uzuyor.');
    ciz(60);
    await c.say('Açı 60° iken karşı kenar 5,6 birim.', { speak: 'Açı altmış derece iken karşı kenar beş virgül altı birim.' });
    await par(c.say('Açıyı iki katına, 120°’ye çıkarıyoruz.', { speak: 'Açıyı iki katına, yüz yirmi dereceye çıkarıyoruz.' }), c.tween(1700, (e) => ciz(lerp(60, 120, e)), ease.inOut));
    await c.choice({
      tag: 'Ne gördün?', q: 'Açı iki katına çıktı. Karşı kenar da iki katına çıktı mı?',
      options: ['Evet: 5,6’dan 11,2’ye', 'Hayır: 5,6’dan 9,5’e'], answer: 1,
      hints: ['Tahtadaki boya bak: karşı kenar şimdi 9,5.', ''],
      right: 'Kenar uzadı; ama iki katına çıkmadı.',
    });
    await c.say('Açı büyüyünce karşı kenar uzar; ama aynı oranda değil.');
  }

  /* ---- 3. Üç türde dene ---- */
  /* Kenar uzunluklarından üçgen: a = |BC|, b = |AC|, c = |AB|; taban ortalanır. */
  function kenardan(a, b, cc, S, tabanY) {
    const Bd = Math.acos((a * a + cc * cc - b * b) / (2 * a * cc));
    const k = [[cc * S * Math.cos(Bd), tabanY - cc * S * Math.sin(Bd)], [0, tabanY], [a * S, tabanY]];
    const kay = 500 - (Math.min(...k.map((p) => p[0])) + Math.max(...k.map((p) => p[0]))) / 2;
    return k.map((p) => [p[0] + kay, p[1]]);
  }
  async function ucTur(c) {
    const svg = c.svg(1000, 562);
    const turler = [
      { ad: 'dar açılı', k: [9, 8, 7], cevap: 0, soz: 'Ölçtük: en uzun kenarın karşısındaki açı en büyük.' },
      { ad: 'dik', k: [8, 10, 6], cevap: 1, soz: 'Dik üçgende de aynı: en uzun kenarın karşısı 90°.', oku: 'Dik üçgende de aynı: en uzun kenarın karşısı doksan derece.' },
      { ad: 'geniş açılı', k: [5, 7, 10], S: 46, cevap: 2, soz: 'Geniş açılı üçgende de tuttu.' },
    ];
    const harf = ['A', 'B', 'C'], ek = ['’nın', '’nin', '’nin'];
    await c.say('Üç farklı türde üçgen; kenar uzunlukları yazılı.', { noWait: true });
    for (const t of turler) {
      const g = c.S('g', {}, svg), [A, B, C] = kenardan(t.k[0], t.k[1], t.k[2], t.S || 36, 440);
      const u = ucgen(c, g, A, B, C, { olcu: 'derece' }), k = kenarlar(c, g, A, B, C);
      k.yaz(t.k.map(String)); gizle(u.olculer, g);
      yazi(c, g, 500, 70, t.ad, { size: 26, kalin: 600, renk: RENK.soluk });
      await belir(c, g, 400);
      const yanlis = (i) => harf[i] + ek[i] + ' karşısındaki kenar ' + t.k[i] + ': en uzunu değil.';
      await c.choice({
        tag: 'Tahmin et', q: 'Kenarlar ' + t.k.slice().sort((x, y) => x - y).join(', ') + '. En büyük açı hangi köşede?',
        options: harf, answer: t.cevap,
        hints: harf.map((_, i) => (i === t.cevap ? '' : yanlis(i))),
        right: 'En uzun kenar ' + t.k[t.cevap] + '; karşısındaki köşe ' + harf[t.cevap] + '.',
      });
      await par(c.say(t.soz, { speak: t.oku }), (async () => { await belir(c, u.olculer, 400); vurgula(u, k, t.cevap); })());
      if (t !== turler[2]) await belir(c, g, 350, 0);
      if (t !== turler[2]) g.remove();
    }
    await c.say('Üç türde <b>doğruladık</b>; ispat etmedik, ama önerme tuttu.');
    c.note('En uzun kenarın karşısındaki açı <b>en büyüktür</b>.<br>7, 8, 9 → 9’un karşısı', 'Kenar ve açı', 'gs-en-uzun-kenar');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const B = [220, 440], C = [720, 440], A0 = [420, 180], S = 50;
    const u = ucgen(c, svg, A0, B, C, { olcu: 'derece' }), k = kenarlar(c, svg, A0, B, C);
    await c.say('Tepeyi gezdir: en uzun kenar ile en büyük açı karşı karşıya mı?', { noWait: true });
    const t = tepeKontrol(c, svg, {
      x: [140, 800], y: [130, 310], bas: A0,
      ciz: (P) => {
        u.koy(P, B, C); k.koy(P, B, C);
        const L = [uz(B, C), uz(P, C), uz(P, B)];
        k.yaz(L.map((x) => sayi(x / S))); vurgula(u, k, L.indexOf(Math.max(...L)));
      },
    });
    await c.cont('Devam ›');
    t.kaldir();
    await c.choice({
      tag: 'Sıra sende', q: 'Kenarları 5, 7 ve 9 olan bir üçgende en büyük açı hangi kenarın karşısındadır?',
      options: ['5', '7', '9'], answer: 2,
      hints: ['5 en kısa kenar; karşısındaki açı en büyük olamaz.', '7 ortanca kenar; daha uzunu var.', ''],
      right: 'En uzun kenar 9; en büyük açı onun karşısında.',
    });
    await c.say('En uzun kenarın karşısı en geniş açıdır.');
  }

  Ders.start({
    id: 'geometrik-sekiller-b1', kicker: 'Konu B · Kenarlar ve açılar', title: 'En uzun kenarın karşısı en büyük açıdır', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'En uzun kenarın karşısı en büyük açıdır',
      hook: 'Bir çatı makasının <b>en uzun</b> çubuğunun karşısındaki köşe, sence en dar mı, en geniş mi?',
      button: 'Derse başla ›',
    },
    goals: ['Bir açının karşısındaki kenarı gösterir.', 'En uzun kenarın karşısındaki açının en büyük olduğunu farklı türde üçgenlerde doğrular.'],
    scenes: [
      { title: 'Karşı kenar', goal: 'Her açının karşısındaki kenarı bul.', run: karsiKenar },
      { title: 'Aç, kapa', goal: 'Açı büyüdükçe karşı kenarın uzadığını, ama aynı oranda uzamadığını gör.', run: acKapa },
      { title: 'Üç türde dene', goal: 'Önermeyi dar, dik ve geniş açılı üçgende doğrula.', run: ucTur },
      { title: 'Sıra sende', goal: 'Üçgeni değiştir; en uzun kenar ile en büyük açıyı izle.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir ABC üçgeninde |AB| = 6, |BC| = 9, |AC| = 7. En büyük açı hangi köşededir?',
        options: ['A', 'B', 'C'], answer: 0,
        why: ['En uzun kenar BC; karşısındaki köşe A.', 'B’nin karşısındaki kenar AC = 7; en uzunu değil.', 'C’nin karşısındaki kenar AB = 6; en kısası.'],
        scene: 2,
      },
      {
        q: 'Bu önermeyi derste nasıl ele aldık?',
        options: ['Tek bir üçgende ölçerek ispatladık.', 'Farklı türde üçgenlerde ölçerek doğruladık.', 'Aksiyom olarak kabul ettik.'], answer: 1,
        why: ['Tek üçgende ölçmek ispat değildir; üstelik üç türde denedik.', 'Dar, dik ve geniş açılı üçgende ölçtük: bu bir doğrulama.', 'Aksiyom ispatsız kabul edilir; biz ölçerek sınadık.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>En uzun kenarın karşısı en geniş açıdır.</b>',
      'Bir açının <b>karşısındaki kenar</b>, o köşeye değmeyen kenardır.',
      'Önermeyi dar, dik ve geniş açılı üçgenlerde ölçerek <b>doğruladık</b>.',
    ],
    nextLesson: { href: 'b2-acilari-sirala-kenarlari-sirala.html', label: 'Sonraki: Açıları sırala, kenarları sırala ›' },
  });
})();
