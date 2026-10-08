/* A5 — Dış açı, uzaktaki iki iç açının toplamıdır
   Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir. İki ispat: iç açılar toplamından ve
   C'den AB'ye çizilen paralelden (iç ters ve yöndeş açılar); ikisi karşılaştırılır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md */
(() => {
  'use strict';
  const { RENK, rad, yon, ileri, ara, kisa, orta, yazi, renkli, parcaKoy, cizgi, koy, gizle, belir, par, dilim, ucgen, disAci, adimlar, tepeKontrol } = window.KIT;
  const { ease } = Ders;
  const R = 42;

  /* B ve C köşeleri ile bu köşelerdeki açılar (derece) verilince A köşesi. */
  const tepe = (B, C, beta, gama) => {
    const ab = ((C[0] - B[0]) * Math.sin(rad(gama))) / Math.sin(rad(180 - beta - gama));
    return [B[0] + ab * Math.cos(rad(beta)), B[1] - ab * Math.sin(rad(beta))];
  };

  /* ---- 1. Hangi açılar? ---- */
  async function hangiAcilar(c) {
    const svg = c.svg(1000, 562);
    const B = [300, 440], C = [620, 440], A = tepe(B, C, 60, 70);
    const dis = disAci(c, svg, C, B, A, { uzun: 170 });
    ucgen(c, svg, A, B, C, { olcu: 'derece' });
    dis.yaz('110°');
    const kB = dilim(c, svg, B, C, A, RENK.B, R, { dolgu: 0.8 }), kA = dilim(c, svg, A, B, C, RENK.A, R, { dolgu: 0.8 });
    gizle(kB.el, kA.el);
    await c.say('Kafesten bir üçgen: C köşesinde dışarı bakan bir açı var.');
    await c.choice({
      tag: 'Tahmin et', q: 'C’deki dış açı 110°. İçerideki hangi açılarla ilgili?',
      options: ['Komşusu olan 70°’nin iki katı', 'Uzaktaki iki açının toplamı: 50° + 60°', 'Üç iç açının toplamı'], answer: 1,
      hints: ['70° · 2 = 140°; tutmuyor.', '', 'Üç iç açının toplamı 180°; dış açı 110°.'],
      right: '50° + 60° = 110°.',
    });
    await par(c.say('Uzaktaki iki açıyı dış açının içine taşıyoruz.'), (async () => {
      kB.el.style.opacity = 1;
      const b0 = yon(B, C), bd = kisa(yon(B, A) - b0);
      await c.tween(1100, (e) => kB.yon(b0, bd, ara(B, C, e), R), ease.inOut);
      kA.el.style.opacity = 1;
      const a0 = yon(A, B), ad = kisa(yon(A, C) - a0);
      await c.tween(1200, (e) => kA.yon(a0 + Math.PI * e, ad, ara(A, C, e), R), ease.inOut);
    })());
    await c.say('İkisi birlikte dış açıyı tam dolduruyor.');
    await c.say('<b>Dış açı</b>, kendisine komşu olmayan iki iç açının toplamı.', { speak: 'Dış açı, [short pause] kendisine komşu olmayan iki iç açının toplamı.' });
  }

  /* ---- 2. İspat ---- */
  async function ispat(c) {
    const svg = c.svg(1000, 562);
    const B = [100, 440], C = [420, 440], A = tepe(B, C, 60, 70);
    const duz = cizgi(c, svg, B, ileri(C, 0, 150), RENK.dis, 12, { 'stroke-opacity': 0.25 });
    const dis = disAci(c, svg, C, B, A, { uzun: 150 });
    const u = ucgen(c, svg, A, B, C, { harf: false, olcu: ['α', 'β', 'γ'] });
    dis.yaz('dış'); gizle(duz);
    const liste = adimlar(c, svg, 660, 150, { size: 28, aralik: 100 });
    const a1 = liste.ekle('γ + dış = 180°', ''), a2 = liste.ekle('α + β + γ = 180°', ''), a3 = liste.ekle('dış = α + β', '');
    await par(c.say('Önermeyi ispatlayalım. Önce C köşesine bakıyoruz.'), (async () => { await belir(c, duz, 400); await belir(c, a1.g, 400); })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'γ + dış = 180°. Bu adımın gerekçesi nedir?',
      options: ['Paralel doğrularda iç ters açılar', 'BC ile uzantısı bir doğrudur: doğru açı', 'Dış açıların toplamı'], answer: 1,
      hints: ['Burada paralel doğru yok; tek bir doğrunun üstündeyiz.', '', 'Tek bir köşeye bakıyoruz, üç dış açıya değil.'],
      right: 'İç açı ile dış açı bir doğru açıyı doldurur.',
    });
    a1.gerekce('doğru açı');
    await par(c.say('Şimdi üçgenin içine bakıyoruz: üç iç açı.'), (async () => {
      await belir(c, duz, 300, 0);
      for (const d of u.dilimler) { await c.tween(220, (e) => d.el.setAttribute('fill-opacity', 0.55 + 0.4 * e)); await c.tween(220, (e) => d.el.setAttribute('fill-opacity', 0.95 - 0.4 * e)); }
      await belir(c, a2.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'α + β + γ = 180°. Bu adımın gerekçesi nedir?',
      options: ['Üçgen eşitsizliği', 'Doğru açı', 'İç açıların toplamı: daha önce ispatladık'], answer: 2,
      hints: ['Üçgen eşitsizliği kenar uzunluklarıyla ilgilidir.', 'Üç iç açı tek bir doğrunun üstünde durmuyor.', ''],
      right: 'İspatlanmış bir önerme artık dayanak olur.',
    });
    a2.gerekce('iç açılar');
    await c.say('İki toplam da 180°. İkisinde de γ var; onu çıkar.', { speak: 'İki toplam da yüz seksen derece. İkisinde de gama var; onu çıkar.' });
    await par(c.say('Geriye kalanlar eşit: ispat tamam.'), belir(c, a3.g, 450));
    c.note('<b>dış açı = α + β</b><br>Örnek: 50° + 60° = 110°', 'Dış açı', 'gs-dis-aci');
  }

  /* ---- 3. İkinci yol: paralel ---- */
  async function ikinciYol(c) {
    const svg = c.svg(1000, 562);
    const B = [100, 440], C = [420, 440], A = tepe(B, C, 60, 70), tAB = yon(B, A), D = ileri(C, 0, 150), E = ileri(C, tAB, 290);
    const iz = c.S('polyline', { points: [B, A, C, E].map((q) => q.join(',')).join(' '), fill: 'none', stroke: RENK.A, 'stroke-width': 12, 'stroke-opacity': 0.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    const dg = c.S('g', {}, svg), d = cizgi(c, dg, C, C, RENK.paralel, 3);
    const dAd = yazi(c, dg, E[0] + 22, E[1] + 4, 'd', { size: 24, kalin: 700, renk: RENK.paralel });
    disAci(c, svg, C, B, A, { uzun: 150 });
    ucgen(c, svg, A, B, C, { harf: false, olcu: ['α', 'β', 'γ'] });
    const kA = dilim(c, svg, A, B, C, RENK.A, R, { dolgu: 0.8 }), kB = dilim(c, svg, B, C, A, RENK.B, R, { dolgu: 0.8 });
    const ad = (V, P, Q, m, renk) => { const y = ileri(V, orta(V, P, Q), R + 22); return yazi(c, svg, y[0], y[1] + 8, m, { size: 22, kalin: 700, renk }); };
    const aAd = ad(C, E, A, 'α', RENK.A), bAd = ad(C, D, E, 'β', RENK.B);
    gizle(iz, dAd, kA.el, kB.el, aAd, bAd);
    const liste = adimlar(c, svg, 660, 120, { size: 28, aralik: 96 });
    const a1 = liste.ekle('d // AB', 'tek paralel'), a2 = liste.ekle('α eşi', ''), a3 = liste.ekle('β eşi', ''), a4 = liste.ekle('dış = α + β', '');
    await c.say('Aynı önermeyi bu kez başka bir yoldan ispatlayalım.');
    await par(c.say('C’den AB’ye paralel d doğrusunu çiziyoruz.', { speak: 'C köşesinden AB kenarına paralel d doğrusunu çiziyoruz.' }), (async () => {
      await c.tween(900, (e) => koy(d, ileri(C, tAB, -100 * e), ileri(C, tAB, 290 * e)), ease.inOut);
      await belir(c, dAd, 300); await belir(c, a1.g, 400);
    })());
    await c.say('Paralel, dış açıyı iki parçaya ayırdı.');
    await par(c.say('Önce A’daki açı: AC keseni boyunca C’ye taşınıyor.'), (async () => {
      await belir(c, iz, 400); kA.el.style.opacity = 1;
      const a0 = yon(A, B), sw = kisa(yon(A, C) - a0);
      await c.tween(1200, (e) => kA.yon(a0 + Math.PI * e, sw, ara(A, C, e), R), ease.inOut);
      await belir(c, aAd, 300); await belir(c, a2.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'α ile C’deki mavi açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 1,
      hints: ['Yöndeş açılar kesenin aynı yanında durur; bunlar AC’nin zıt yanlarında.', '', 'Ters açılar aynı köşede durur; bunların köşeleri farklı.'],
      right: 'AB // d ve kesen AC: iç ters açılar eşittir.',
    });
    a2.gerekce('iç ters');
    await belir(c, iz, 300, 0);
    await par(c.say('Şimdi B’deki açı: BC keseni boyunca C’ye kayıyor.'), (async () => {
      kB.el.style.opacity = 1;
      const b0 = yon(B, C), sw = kisa(yon(B, A) - b0);
      await c.tween(1100, (e) => kB.yon(b0, sw, ara(B, C, e), R), ease.inOut);
      await belir(c, bAd, 300); await belir(c, a3.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'β ile C’deki turuncu açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 0,
      hints: ['', 'İç ters açılar kesenin zıt yanlarında durur; bunlar BC’nin aynı yanında.', 'Ters açılar aynı köşede durur; bunların köşeleri farklı.'],
      right: 'AB // d ve kesen BC: yöndeş açılar eşittir.',
    });
    a3.gerekce('yöndeş');
    await par(c.say('İki parça birlikte dış açının tamamı: ispat tamam.'), belir(c, a4.g, 450));
    await c.choice({
      tag: 'Karşılaştır', q: 'İki ispat aynı sonuca vardı. Dayanakları nasıl?',
      options: ['İkisi de ölçüme dayanıyor', 'İlki iç açılar toplamına, ikincisi paralel doğruya dayanıyor', 'İkisi de aynı adımları kullanıyor'], answer: 1,
      hints: ['İkisinde de ölçüm yok; her adımın bir gerekçesi var.', '', 'İlkinde paralel doğru yoktu; ikincisinde iç açılar toplamı yok.'],
      right: 'Aynı önerme, iki ayrı dayanak; ikisi de ispat.',
    });
    await c.say('Bir önermenin birden çok ispatı olabilir.');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const B = [180, 430], C = [520, 430], A0 = [400, 150];
    const dis = disAci(c, svg, C, B, A0, { uzun: 170 }), disB = disAci(c, svg, B, A0, C, { uzun: 110 });
    const u = ucgen(c, svg, A0, B, C, { olcu: 'derece' });
    const esit = renkli(c, svg, 500, 524, [''], { size: 32, kalin: 700 });
    gizle(disB.g);
    await c.say('Tepe köşesini gezdir: dış açı toplamı izliyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, {
      x: [140, 600], y: [110, 300], bas: A0,
      ciz: (P) => {
        u.koy(P, B, C); dis.ciz(C, B, P); disB.ciz(B, P, C);
        const [a, b] = u.D(); dis.yaz((a + b) + '°');
        parcaKoy(c, esit, [[(a + b) + '°', RENK.dis], ' = ', [a + '°', RENK.A], ' + ', [b + '°', RENK.B]]);
      },
    });
    await c.cont('Devam ›');
    t.kaldir();
    u.harfler[1].setAttribute('x', B[0] - 28); u.harfler[1].setAttribute('y', B[1] - 6);   // B harfi dış açının altında kalmasın
    await par(c.say('Aynı şey öbür köşelerde de geçerli. Şimdi B’ye bak.'), (async () => { await belir(c, [dis.g, esit], 300, 0.2); await belir(c, disB.g, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'B’deki dış açı hangi iki iç açının toplamıdır?',
      options: ['A ve B’deki açıların', 'A ve C’deki açıların', 'B ve C’deki açıların'], answer: 1,
      hints: ['B’deki iç açı komşudur; uzak olan öbür ikisi.', '', 'B’deki iç açı komşudur; uzak olan öbür ikisi.'],
      right: 'Komşu olmayan iki açı: A ve C’dekiler.',
    });
    const [a, , g] = u.D(); disB.yaz((a + g) + '°');
    parcaKoy(c, esit, [[(a + g) + '°', RENK.dis], ' = ', [a + '°', RENK.A], ' + ', [g + '°', RENK.C]]);
    await par(c.say('Her dış açı, uzağındaki iki iç açının toplamıdır.'), belir(c, esit, 350, 1));
  }

  /* ---- 5. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    let sahne = null;
    /* Açılara göre çizilmiş üçgen; etiketlerde verilenler ve aranan ('?') yazar. */
    const kur = (beta, gama, bc, etiket, disEtiket) => {
      if (sahne) sahne.remove();
      sahne = c.S('g', {}, svg);
      const B = [500 - bc / 2 - 60, 440], C = [500 + bc / 2 - 60, 440], A = tepe(B, C, beta, gama);
      const dis = disAci(c, sahne, C, B, A, { uzun: 170 });
      const u = ucgen(c, sahne, A, B, C, { olcu: etiket, olcuSize: 26 });
      dis.yaz(disEtiket); dis.yazi.setAttribute('font-size', 26);
      return { u, dis };
    };
    const cevapla = (t, metin) => { t.textContent = metin; t.style.fill = RENK.iyi; };
    await c.say('Sıra sende: soru işaretli açıyı bul.', { noWait: true });

    let s = kur(55, 50, 340, ['75°', '?', ''], '130°');
    await c.choice({
      tag: 'Soru 1 / 3', q: 'Dış açı 130°, uzak açılardan biri 75°. Öbürü kaç derece?',
      options: ['205°', '55°', '50°'], answer: 1,
      hints: ['Toplamak değil: 130°, iki uzak açının toplamı.', '', '50°, C’deki iç açı (180° − 130°). Sorulan B’deki açı.'],
      right: '130° − 75° = 55°.',
    });
    cevapla(s.u.olculer[1], '55°');
    await c.wait(500);

    s = kur(85, 55, 250, ['40°', '85°', ''], '?');
    await c.choice({
      tag: 'Soru 2 / 3', q: 'İç açılardan ikisi 40° ve 85°. Üçüncü köşedeki dış açı kaç derece?',
      options: ['55°', '125°', '235°'], answer: 1,
      hints: ['55°, C’deki iç açıdır. Dış açı onun bütünleyeni.', '', 'Bir dış açı doğru açıdan (180°) küçüktür.'],
      right: '40° + 85° = 125°.',
    });
    cevapla(s.dis.yazi, '125°');
    await c.wait(500);

    s = kur(50, 60, 340, ['', '', '?'], '120°');
    await c.choice({
      tag: 'Soru 3 / 3', q: 'Dış açı 120°. Hemen yanındaki (komşu) iç açı kaç derece?',
      options: ['120°', '240°', '60°'], answer: 2,
      hints: ['İkisi eşit değil; birlikte bir doğru açı ederler.', 'Bir iç açı 180°’den küçüktür.', ''],
      right: '180° − 120° = 60°.',
    });
    cevapla(s.u.olculer[2], '60°');
    await c.say('Uzak iki açı toplanır; komşu açı 180°’ye tamamlar.', { speak: '[thoughtful] Uzak iki açı toplanır; komşu açı yüz seksen dereceye tamamlar.' });
  }

  Ders.start({
    id: 'geometrik-sekiller-a5', kicker: 'Konu A · Açılar ve ispat', title: 'Dış açı, uzaktaki iki iç açının toplamıdır', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dış açı, uzaktaki iki iç açının toplamıdır',
      hook: 'Çelik bir köprünün üçgen kafesinde <b>dışarı bakan</b> bir açıyı ölçtün. İçerideki hangi açılarla ilgilidir?',
      button: 'Derse başla ›',
    },
    goals: ['Bir dış açının, komşu olmayan iki iç açının toplamına eşit olduğunu ispatlar.', 'İlk ispatın iç açılar toplamına dayandığını görür.', 'Önermeyi paralel doğruyla ikinci kez ispatlar; iki ispatı karşılaştırır.'],
    scenes: [
      { title: 'Hangi açılar?', goal: 'Uzaktaki iki açının dış açıyı doldurduğunu gör.', run: hangiAcilar },
      { title: 'İspat', goal: 'Üç adımın gerekçelerini doldur.', run: ispat },
      { title: 'İkinci yol: paralel', goal: 'Aynı önermeyi paralel doğruyla ispatla; iki yolu karşılaştır.', run: ikinciYol },
      { title: 'Dene', goal: 'Üçgen değişse de eşitliğin sürdüğünü gör.', run: dene },
      { title: 'Sıra sende', goal: 'Önermeyi üç soruda kullan.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgenin iki iç açısı 40° ve 75°. Üçüncü köşedeki dış açı kaç derecedir?',
        options: ['65°', '115°', '245°'], answer: 1,
        why: ['65°, üçüncü köşedeki iç açıdır.', '40° + 75° = 115°.', 'Bir dış açı 180°’den küçüktür.'],
        scene: 0,
      },
      {
        q: 'Dersteki ilk ispat hangi iki bilgiye dayandı?',
        options: ['Doğru açı 180° ve iç açılar toplamı 180°', 'Dış açılar toplamı 360° ve üçgen eşitsizliği', 'İç ters açılar ve en uzun kenar'], answer: 0,
        why: ['γ + dış = 180° (doğru açı) ve α + β + γ = 180° (iç açılar).', 'İkisi de bu ispatta kullanılmadı.', 'İç ters açılar ikinci yolun dayanağıydı; kenar uzunluğu hiç kullanılmadı.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Dış açı, uzaktaki iki iç açının toplamıdır.</b>',
      'İspat: γ + dış = 180° ve α + β + γ = 180°; öyleyse <b>dış = α + β</b>.',
      'İkinci yol: C’den AB’ye paralel; <b>iç ters</b> ve <b>yöndeş</b> açılar dış açıyı doldurur.',
      'İspatlanmış bir önerme (iç açılar toplamı) yeni bir ispatın dayanağı oldu.',
    ],
    nextLesson: { href: 'b1-en-uzun-kenar-en-buyuk-aci.html', label: 'Sonraki: En uzun kenarın karşısı en büyük açıdır ›' },
  });
})();
