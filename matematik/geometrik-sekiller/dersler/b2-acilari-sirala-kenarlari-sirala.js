/* B2 — Açıları sırala, kenarları sırala
   Kenarların büyüklük sırası, karşılarındaki açıların sırasıyla aynıdır (iki yönde de okunur);
   eşit kenarların karşısındaki açılar eşittir. Program doğrulama ister; önermeler ölçerek doğrulanır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/B-kenarlar-ve-acilar.md */
(() => {
  'use strict';
  const { RENK, KOSE, rad, uz, aci, renkli, parcaKoy, gizle, belir, par, ucgen, kenarlar, tepe, cevapla, tepeKontrol } = window.KIT;
  const { lerp, ease } = Ders;
  const sayi = (x) => x.toFixed(1).replace('.', ',');

  /* Kenar uzunluklarından üçgen: a = |BC|, b = |AC|, c = |AB|; taban cx çevresinde ortalanır. */
  function kenardan(a, b, cc, S, tabanY, cx = 500) {
    const Bd = Math.acos((a * a + cc * cc - b * b) / (2 * a * cc));
    const k = [[cc * S * Math.cos(Bd), tabanY - cc * S * Math.sin(Bd)], [0, tabanY], [a * S, tabanY]];
    const kay = cx - (Math.min(...k.map((p) => p[0])) + Math.max(...k.map((p) => p[0]))) / 2;
    return k.map((p) => [p[0] + kay, p[1]]);
  }
  /* Seçilen köşelerin açı dilimini ve karşılarındaki kenarı öne çıkarır (liste boşsa hepsi eşit ağırlıkta). */
  const vurgula = (u, k, liste) => {
    u.dilimler.forEach((d, j) => d.el.setAttribute('fill-opacity', !liste.length ? 0.55 : liste.includes(j) ? 0.95 : 0.3));
    k.hat.forEach((h, j) => h.setAttribute('stroke-width', liste.includes(j) ? 9 : 5));
  };
  /* Köşeleri (0: A, 1: B, 2: C) verilen sırada, köşe renkleriyle tek satıra yazar; esit(i, j) doğruysa araya '=' koyar. */
  const siraYaz = (c, t, sira, metin, esit = () => false) => {
    const p = [];
    sira.forEach((k, n) => { if (n) p.push(esit(sira[n - 1], k) ? '  =  ' : '  >  '); p.push([metin(k), KOSE[k]]); });
    parcaKoy(c, t, p);
  };
  const satir = (c, svg, y) => renkli(c, svg, 500, y, [''], { size: 32, kalin: 700 });

  /* ---- 1. En kısa kenar ---- */
  async function enKisa(c) {
    const svg = c.svg(1000, 562);
    const [A, B, C] = kenardan(9, 7, 5, 42, 380);
    const u = ucgen(c, svg, A, B, C, { olcu: 'derece' }), k = kenarlar(c, svg, A, B, C);
    const D = u.D(), boy = ['9', '7', '5'];
    const ust = satir(c, svg, 470), alt = satir(c, svg, 526);
    siraYaz(c, ust, [0, 1, 2], (i) => boy[i]); siraYaz(c, alt, [0, 1, 2], (i) => D[i] + '°');
    k.yaz(['a', 'b', 'c']);
    gizle(u.olculer, k.et, ust, alt);
    await c.say('Bir üçgen: her kenar, karşısındaki köşenin renginde.');
    await par(c.say('Kenarı, karşısındaki köşenin küçük harfiyle adlandırırız: a, b, c.'), belir(c, k.et, 400));
    await belir(c, k.et, 200, 0); k.yaz(boy);
    await par(c.say('Boyları: a = 9, b = 7, c = 5.', { speak: 'Boyları: a dokuz, b yedi, c beş.' }), belir(c, k.et, 300));
    await par(c.say('Biliyoruz: en uzun kenarın karşısındaki açı en büyük.'), (async () => { vurgula(u, k, [0]); await belir(c, u.olculer[0], 350); })());
    await c.choice({
      tag: 'Tahmin et', q: 'En kısa kenar c = 5. Karşısındaki C köşesinin açısı nasıl olur?',
      options: ['En küçük açı', 'Ortanca açı', 'A’daki açıya eşit'], answer: 0,
      hints: ['', 'Ortanca açı, ortanca kenarın karşısına kalır.', 'A’nın karşısındaki kenar 9, C’ninki 5: eşit değiller.'],
      right: 'Kenar kısaldıkça karşısındaki açı daralır.',
    });
    await par(c.say('Ölçtük: en kısa kenarın karşısındaki açı en küçük.'), (async () => { vurgula(u, k, [2]); await belir(c, u.olculer[2], 350); })());
    await par(c.say('Ortanca kenarın karşısına ortanca açı kalır.'), (async () => { vurgula(u, k, [1]); await belir(c, u.olculer[1], 350); })());
    vurgula(u, k, []);
    await par(c.say('İki sıra alt alta: renklerin sırası aynı.'), (async () => { await belir(c, ust, 400); await belir(c, alt, 400); })());
  }

  /* ---- 2. Sıra aynı sıra ---- */
  async function siraAyni(c) {
    const svg = c.svg(1000, 562);
    const B = [220, 390], C = [720, 390], A0 = [380, 160], S = 50;
    const u = ucgen(c, svg, A0, B, C), k = kenarlar(c, svg, A0, B, C);
    const ust = satir(c, svg, 470), alt = satir(c, svg, 526);
    const ciz = (P) => {
      u.koy(P, B, C); k.koy(P, B, C);
      const L = [uz(B, C), uz(P, C), uz(P, B)].map((x) => x / S), W = [aci(P, B, C), aci(B, P, C), aci(C, P, B)];
      const esit = (i, j) => Math.abs(L[i] - L[j]) < 0.05, sira = [0, 1, 2].sort((i, j) => L[j] - L[i]);
      /* Eşit sayılan iki kenar (ve karşılarındaki açılar) aynı değerle yazılır. */
      for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (esit(i, j)) { L[i] = L[j] = (L[i] + L[j]) / 2; W[i] = W[j] = (W[i] + W[j]) / 2; }
      k.yaz(L.map(sayi));
      siraYaz(c, ust, sira, (i) => sayi(L[i]), esit); siraYaz(c, alt, sira, (i) => sayi(W[i]) + '°', esit);
    };
    await c.say('Tepeyi gezdir: iki satırda renklerin sırası ayrışıyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [140, 800], y: [120, 290], bas: A0, ciz });
    await c.cont('Devam ›');
    t.kaldir();
    await c.choice({
      tag: 'Ne gördün?', q: 'Üstte kenarlar, altta açılar sıralı. Renklerin sırası hiç farklı oldu mu?',
      options: ['Evet, bazen ayrıştı', 'Hayır, hep aynı kaldı'], answer: 1,
      hints: ['Tepeyi sola, sonra sağa çek: iki satır birlikte değişiyor.', ''],
      right: 'Bir kenar öne geçince karşısındaki açı da öne geçti.',
    });
    await c.say('Kenarların sırası, karşılarındaki açıların sırasıdır.');
    await c.say('Tersi de doğru: açıların sırası bilinirse kenarlarınki de bilinir.');
    await c.say('Farklı üçgenlerde ölçtük: önermeyi <b>doğruladık</b>.');
    c.note('<b>a &gt; b &gt; c ise A &gt; B &gt; C</b><br>Tersi de doğru.', 'Kenar sırası, açı sırası', 'gs-kenar-aci-sirasi');
  }

  /* ---- 3. Eşit kenar, eşit açı ---- */
  async function esitKenar(c) {
    const svg = c.svg(1000, 562);
    const B = [400, 440], C = [600, 440], S = 40, ilk = [430, 165];
    const u = ucgen(c, svg, ilk, B, C, { olcu: 'derece' }), k = kenarlar(c, svg, ilk, B, C);
    const ciz = (P) => { u.koy(P, B, C); k.koy(P, B, C); k.yaz([uz(B, C), uz(P, C), uz(P, B)].map((x) => sayi(x / S))); };
    ciz(ilk);
    await c.say('Bu üçgenin üç kenarı da farklı boyda.');
    await par(c.say('Tepeyi tabanın tam ortasının üstüne kaydırıyoruz.'), c.tween(1800, (e) => ciz([lerp(430, 500, e), 165]), ease.inOut));
    vurgula(u, k, [1, 2]);
    await c.say('İki kenar eşitlendi; karşılarındaki iki açı da eşitlendi.');
    await c.say('İki kenarı eşit üçgen <b>ikizkenar</b>; eşit açılar tabanda durur.');
    await c.choice({
      tag: 'Sıra sende', q: 'Başka bir ikizkenar üçgende tepe açısı 100°. Taban açılarının her biri kaç derece?',
      options: ['40°', '50°', '80°'], answer: 0,
      hints: ['', '50° + 50° + 100° = 200°; toplam 180° olmalı.', '80°, iki taban açısının toplamı; ikisi eşit paylaşır.'],
      right: '(180° − 100°) : 2 = 40°.',
    });
    vurgula(u, k, []);
    await belir(c, u.olculer, 250, 0);
    await par(c.say('Şimdi tepeyi indiriyoruz: üç kenar da eşit oldu.'), c.tween(1600, (e) => ciz([500, lerp(165, 440 - 100 * Math.sqrt(3), e)]), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'Üç kenar eşitse üç açı da eşit. Her biri kaç derece?',
      options: ['45°', '60°', '90°'], answer: 1,
      hints: ['3 · 45° = 135°; toplam 180° olmalı.', '', '3 · 90° = 270°; toplam 180° olmalı.'],
      right: '180° : 3 = 60°.',
    });
    await par(c.say('Üç kenarı eşit üçgen <b>eşkenar</b>: her açısı 60°.', { speak: 'Üç kenarı eşit üçgen eşkenar: her açısı altmış derece.' }), belir(c, u.olculer, 350));
    c.note('<b>Eşit kenarların karşısındaki açılar eşittir.</b><br>İkizkenar: 40°, 70°, 70°', 'Eşit kenar, eşit açı', 'gs-esit-kenar');
  }

  /* ---- 4. Açıdan kenara ---- */
  async function acidanKenara(c) {
    const svg = c.svg(1000, 562);
    const KENAR = ['a (BC)', 'b (AC)', 'c (AB)'];
    let g = c.S('g', {}, svg);
    let B = [280, 430], C = [720, 430], A = tepe(B, C, 45, 65);
    let u = ucgen(c, g, A, B, C, { olcu: ['70°', '45°', '?'], olcuSize: 24 }), k = kenarlar(c, g, A, B, C);
    k.yaz(['a', 'b', 'c']);
    const sira = satir(c, svg, 526);
    parcaKoy(c, sira, [['a', RENK.A], '  >  ', ['c', RENK.C], '  >  ', ['b', RENK.B]]);
    gizle(sira);
    await c.say('Bu kez açılar verilmiş: A’da 70°, B’de 45°.', { speak: 'Bu kez açılar verilmiş: A’da yetmiş, B’de kırk beş derece.' });
    await c.choice({
      tag: 'Önce bul', q: 'Sıralamak için üç açı da gerekli. C’deki açı kaç derece?',
      options: ['55°', '65°', '75°'], answer: 1,
      hints: ['70° + 45° + 55° = 170°; toplam 180° olmalı.', '', '70° + 45° + 75° = 190°; toplam 180° olmalı.'],
      right: '180° − 70° − 45° = 65°.',
    });
    cevapla(u.olculer[2], '65°');
    await c.choice({
      tag: 'Sırala', q: 'En uzun kenar hangisi?', options: KENAR, answer: 0,
      hints: ['', 'b’nin karşısındaki açı 45°: en küçüğü.', 'c’nin karşısındaki açı 65°; daha büyüğü var.'],
      right: 'En büyük açı 70°; karşısındaki kenar a.',
    });
    vurgula(u, k, [0]);
    await c.choice({
      tag: 'Sırala', q: 'En kısa kenar hangisi?', options: KENAR, answer: 1,
      hints: ['a’nın karşısındaki açı 70°: en büyüğü.', '', 'c’nin karşısındaki açı 65°; daha küçüğü var.'],
      right: 'En küçük açı 45°; karşısındaki kenar b.',
    });
    vurgula(u, k, []);
    await par(c.say('Açıların sırası kenarların sırasını verdi.'), belir(c, sira, 400));
    await belir(c, [g, sira], 350, 0); g.remove(); sira.textContent = '';

    g = c.S('g', {}, svg); B = [250, 430]; C = [750, 430]; A = tepe(B, C, 40, 40);
    u = ucgen(c, g, A, B, C, { olcu: ['100°', '?', '40°'], olcuSize: 24 }); k = kenarlar(c, g, A, B, C);
    k.yaz(['a', 'b', 'c']); gizle(g);
    await par(c.say('Yeni üçgen: açılardan ikisi 100° ve 40°.', { speak: 'Yeni üçgen: açılardan ikisi yüz derece ve kırk derece.' }), belir(c, g, 400));
    await c.choice({
      tag: 'Sırala', q: 'Önce B’deki açıyı bul. b ve c kenarları için ne söylenir?',
      options: ['b, c’den uzun', 'b ile c eşit', 'b, c’den kısa'], answer: 1,
      hints: ['B’deki açı 180° − 100° − 40° = 40°. C’deki açı da 40°.', '', 'B’deki açı 180° − 100° − 40° = 40°. C’deki açı da 40°.'],
      right: 'B ve C’deki açılar eşit: karşılarındaki kenarlar da eşit.',
    });
    cevapla(u.olculer[1], '40°'); vurgula(u, k, [1, 2]);
    await c.say('Eşit açıların karşısındaki kenarlar eşittir: bu üçgen ikizkenar.');
  }

  /* ---- 5. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    await c.say('Sıra sende: verilenden yola çık, öbürünü sırala.', { noWait: true });

    let g = c.S('g', {}, svg);
    let [A, B, C] = kenardan(8, 5, 7, 52, 440);
    ucgen(c, g, A, B, C); let k = kenarlar(c, g, A, B, C);
    k.yaz(['8', '5', '7']);
    await c.choice({
      tag: 'Soru 1 / 3', q: 'Kenarlar verilmiş. Köşelerdeki açıları büyükten küçüğe sırala.',
      options: ['A > B > C', 'A > C > B', 'B > C > A'], answer: 1,
      hints: ['B’nin karşısındaki kenar 5: en kısası. B en küçük açı olmalı.', '', 'En uzun kenar 8, A’nın karşısında: en büyük açı A.'],
      right: '8 > 7 > 5: A > C > B.',
    });
    await belir(c, g, 300, 0); g.remove();

    g = c.S('g', {}, svg); B = [280, 440]; C = [720, 440]; A = tepe(B, C, 60, 70);
    const u = ucgen(c, g, A, B, C, { olcu: ['50°', '60°', '?'], olcuSize: 24 }); k = kenarlar(c, g, A, B, C);
    k.yaz(['a', 'b', 'c']); gizle(g);
    await belir(c, g, 350);
    await c.choice({
      tag: 'Soru 2 / 3', q: 'Açılar verilmiş. Kenarları küçükten büyüğe sırala.',
      options: ['a < b < c', 'c < b < a', 'b < a < c'], answer: 0,
      hints: ['', 'Önce C’yi bul: 180° − 50° − 60° = 70°. En büyük açı C’de.', 'En küçük açı A’da (50°): en kısa kenar a.'],
      right: '50° < 60° < 70°: a < b < c.',
    });
    cevapla(u.olculer[2], '70°');
    await c.wait(700);
    await belir(c, g, 300, 0); g.remove();

    g = c.S('g', {}, svg); B = [330, 250]; C = [630, 250]; A = tepe(B, C, 40, 40);
    const bd = (300 * Math.sin(rad(46))) / Math.sin(rad(66)), D = [B[0] + bd * Math.cos(rad(68)), B[1] + bd * Math.sin(rad(68))];
    ucgen(c, g, A, B, C, { r: 34, olcu: ['100°', '', '40°'] });
    ucgen(c, g, D, B, C, { r: 34, harf: ['D', '', ''], olcu: ['66°', '', '46°'], renkler: [RENK.paralel, RENK.B, RENK.C], dolgu: 'rgba(199,146,255,.07)' });
    gizle(g);
    await belir(c, g, 350);
    await c.choice({
      tag: 'Soru 3 / 3', q: 'İki üçgen BC kenarını paylaşıyor. Şekildeki en uzun doğru parçası hangisi?',
      options: ['BC', 'CD', 'BD'], answer: 1,
      hints: ['BC, üstteki üçgenin en uzun kenarı. Alttaki üçgende B’deki açıyı bul: 68°.', '', 'BD’nin karşısındaki açı 46°: alttaki üçgenin en küçük açısı.'],
      right: 'Altta en büyük açı B’de, 68°: karşısındaki CD en uzun.',
    });
    await c.say('Kenarların sırası, karşılarındaki açıların sırasıdır.');
  }

  Ders.start({
    id: 'geometrik-sekiller-b2', kicker: 'Konu B · Kenarlar ve açılar', title: 'Açıları sırala, kenarları sırala', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Açıları sırala, kenarları sırala',
      hook: 'Üçgen bir bahçenin yalnızca <b>üç kenarını</b> ölçtün. En dar köşeyi açıölçer kullanmadan söyleyebilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['Kenar uzunluklarından açıları, açı ölçülerinden kenarları sıralar.', 'Eşit kenarların karşısındaki açıların eşit olduğunu görür.'],
    scenes: [
      { title: 'En kısa kenar', goal: 'En kısa kenarın karşısındaki açının en küçük olduğunu gör.', run: enKisa },
      { title: 'Sıra aynı sıra', goal: 'Kenarların sırası ile açıların sırasının hiç ayrışmadığını gör.', run: siraAyni },
      { title: 'Eşit kenar, eşit açı', goal: 'Kenarlar eşitlenince karşılarındaki açıların da eşitlendiğini gör.', run: esitKenar },
      { title: 'Açıdan kenara', goal: 'Açıları bilinen üçgenin kenarlarını sırala.', run: acidanKenara },
      { title: 'Sıra sende', goal: 'Üç soruda verilenden yola çıkıp öbürünü sırala.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir ABC üçgeninde a = 6, b = 9, c = 7. Köşelerdeki açıların büyükten küçüğe sırası nedir?',
        options: ['A > B > C', 'B > C > A', 'C > B > A'], answer: 1,
        why: ['a en kısa kenar; karşısındaki A en küçük açıdır.', '9 > 7 > 6, yani b > c > a: öyleyse B > C > A.', 'En uzun kenar b; en büyük açı B’de olmalı.'],
        scene: 1,
      },
      {
        q: 'İkizkenar bir üçgenin taban açılarından biri 50°. Tepe açısı kaç derecedir?',
        options: ['50°', '80°', '130°'], answer: 1,
        why: ['Taban açıları eşit: ikisi de 50°. Tepe açısı kalandır.', '180° − 50° − 50° = 80°.', '130°, yalnızca bir taban açısı çıkarılınca kalır; iki taban açısı var.'],
        scene: 2,
      },
    ],
    summary: [
      '<b>Kenarların sırası, karşılarındaki açıların sırasıdır.</b>',
      'Tersi de doğru: açıların sırası kenarların sırasını verir. Gerekirse önce üçüncü açıyı bul.',
      'Eşit kenarların karşısındaki açılar eşittir: ikizkenarda taban açıları, eşkenarda üçü de 60°.',
    ],
    nextLesson: { href: 'b3-ucgen-esitsizligi.html', label: 'Sonraki: Üçgen eşitsizliği ›' },
  });
})();
