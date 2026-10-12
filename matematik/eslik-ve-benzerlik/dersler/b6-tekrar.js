/* B6 — Konu tekrarı: Eşlik ve benzerlik koşulları
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından on karışık soru gelir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B6). */
(() => {
  'use strict';
  const { RENK, gizle, belir, par, yazi, cizgi } = window.KIT;
  const { ESLEME, notrUcgen, esitYay, esitCentik, esleme, eslemeYazisi } = window.KIT_B;

  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };

  /* Nötr üçgen + isteğe bağlı eşleme renginde yaylar (yay: köşe sıraları) ve kenarlar (kenar: karşısındaki köşenin sırası; i. köşenin karşısındaki kenar). */
  function ucgen(c, p, pts, o = {}) {
    const g = c.S('g', {}, p), t = notrUcgen(c, g, pts, o.harf || []);
    const yaylar = (o.yay || []).map((i) => esitYay(c, g, pts[i], pts[(i + 1) % 3], pts[(i + 2) % 3], i + 1, ESLEME[i], { r: o.yayR || 24 }));
    const kenarlar = (o.kenar || []).map((i) => {
      const kg = c.S('g', {}, g), P = pts[(i + 1) % 3], Q = pts[(i + 2) % 3];
      cizgi(c, kg, P, Q, ESLEME[i], 6);
      if (o.centik) esitCentik(c, kg, P, Q, i + 1, ESLEME[i]);
      return kg;
    });
    return { g, t, yaylar, kenarlar };
  }
  /* Temel şekli (A, B, C) k katına çıkarıp (ox, oy) köşesine koyar. */
  const yerles = (baz, ox, oy, k) => baz.map((q) => [ox + q[0] * k, oy + q[1] * k]);

  /* ---- 1. Eş üçgenler: karşılıklı kenar ve açılar eşit, köşeler aynı sırada ---- */
  async function esUcgenler(c, g) {
    const P = [[150, 340], [370, 340], [210, 170]], Q = P.map((q) => [q[0] + 440, q[1]]);
    const e = esleme(c, g, P, Q);
    const yz = eslemeYazisi(c, g, 500, 480, 'ABC', 'DEF', '≅');
    gizle(e.ilk.g, e.ikinci.g, e.yaylar, e.kenarlar, yz);
    await belir(c, [e.ilk.g, e.ikinci.g], 450);
    await belir(c, e.kenarlar, 500);
    await belir(c, e.yaylar, 500);
    await belir(c, yz, 450);
  }

  /* ---- 2. Eşlik koşulları: K.K.K., K.A.K., A.K.A. ---- */
  async function eslikKosullari(c, g) {
    const bil = [
      { cx: 175, kisa: 'K.K.K.', ad: 'Kenar-Kenar-Kenar', kenar: [0, 1, 2], yay: [] },
      { cx: 500, kisa: 'K.A.K.', ad: 'Kenar-Açı-Kenar', kenar: [2, 1], yay: [0] },
      { cx: 825, kisa: 'A.K.A.', ad: 'Açı-Kenar-Açı', kenar: [2], yay: [0, 1] },
    ];
    const ogeler = bil.map((b) => {
      const pts = [[b.cx - 95, 350], [b.cx + 95, 350], [b.cx - 35, 195]];
      const u = ucgen(c, g, pts, { yay: b.yay, kenar: b.kenar, centik: true, yayR: 26 });
      const k = yazi(c, g, b.cx, 440, b.kisa, { size: 34, kalin: 700 }), a = yazi(c, g, b.cx, 480, b.ad, { size: 22, kalin: 600, renk: RENK.soluk });
      return { u, k, a, isaret: [...u.kenarlar, ...u.yaylar] };
    });
    ogeler.forEach((o) => gizle(o.u.g, o.k, o.a));
    ogeler.forEach((o) => gizle(o.isaret));
    await belir(c, ogeler.flatMap((o) => [o.u.g, o.k, o.a]), 450);
    for (const o of ogeler) await belir(c, o.isaret, 450);
  }

  /* ---- 3. Üç açı eşitliği eşlik için yetmez ---- */
  async function ucAci(c, g) {
    const baz = [[0, 0], [150, 0], [50, -110]];
    const a = ucgen(c, g, yerles(baz, 230, 420, 1), { yay: [0, 1, 2], yayR: 20 });
    const b = ucgen(c, g, yerles(baz, 520, 420, 1.7), { yay: [0, 1, 2], yayR: 28 });
    const t = yazi(c, g, 502, 500, 'eş değil', { size: 38, kalin: 700 });
    gizle(a.g, b.g, t);
    await belir(c, a.g, 450);
    await belir(c, b.g, 500);
    await belir(c, t, 450);
  }

  /* ---- 4. Benzer üçgenler: açılar eşit, kenarlar orantılı; k = 1 ise eş ---- */
  async function benzer(c, g) {
    const baz = [[0, 0], [140, 0], [65, -90]];
    const a = ucgen(c, g, yerles(baz, 225, 400, 1), { harf: ['A', 'B', 'C'], yay: [0, 1, 2], kenar: [0, 1, 2], yayR: 20 });
    const b = ucgen(c, g, yerles(baz, 495, 400, 2), { harf: ['D', 'E', 'F'], yay: [0, 1, 2], kenar: [0, 1, 2], yayR: 30 });
    const yz = eslemeYazisi(c, g, 500, 80, 'ABC', 'DEF', '~');
    const k = yazi(c, g, 500, 520, 'oran k; k = 1 ise eş', { size: 32, kalin: 700 });
    const yaylar = [...a.yaylar, ...b.yaylar], kenarlar = [...a.kenarlar, ...b.kenarlar];
    gizle(a.g, b.g, yaylar, kenarlar, yz, k);
    await belir(c, [a.g, b.g], 450);
    await belir(c, yaylar, 450);
    await belir(c, kenarlar, 450);
    await belir(c, yz, 400);
    await belir(c, k, 450);
  }

  /* ---- 5. İki açı eşitse benzerdir (A.A.) ---- */
  async function aciAci(c, g) {
    const baz = [[0, 0], [160, 0], [110, -100]];
    const a = ucgen(c, g, yerles(baz, 225, 400, 1), { harf: ['A', 'B', 'C'], yay: [0, 1], yayR: 24 });
    const b = ucgen(c, g, yerles(baz, 495, 400, 1.8), { harf: ['D', 'E', 'F'], yay: [0, 1], yayR: 32 });
    const yz = eslemeYazisi(c, g, 500, 80, 'ABC', 'DEF', '~');
    const k = yazi(c, g, 500, 520, 'Açı-Açı (A.A.)', { size: 32, kalin: 700 });
    const yaylar = [...a.yaylar, ...b.yaylar];
    gizle(a.g, b.g, yaylar, yz, k);
    await belir(c, [a.g, b.g], 450);
    await belir(c, yaylar, 500);
    await belir(c, yz, 400);
    await belir(c, k, 450);
  }

  /* ---- 6. Orantılı kenarlar: K.K.K. ve K.A.K. ---- */
  async function orantili(c, g) {
    const baz = [[0, 0], [100, 0], [30, -75]];
    const sol = [ucgen(c, g, yerles(baz, 75, 350, 1), { kenar: [0, 1, 2], yayR: 18 }), ucgen(c, g, yerles(baz, 245, 350, 1.8), { kenar: [0, 1, 2], yayR: 28 })];
    const sag = [ucgen(c, g, yerles(baz, 575, 350, 1), { yay: [0], kenar: [2, 1], yayR: 18 }), ucgen(c, g, yerles(baz, 745, 350, 1.8), { yay: [0], kenar: [2, 1], yayR: 28 })];
    const etS = [yazi(c, g, 250, 440, 'K.K.K.', { size: 34, kalin: 700 }), yazi(c, g, 250, 476, 'Kenar-Kenar-Kenar', { size: 22, renk: RENK.soluk }), yazi(c, g, 250, 512, 'üç kenar orantılı', { size: 24, kalin: 700 })];
    const etG = [yazi(c, g, 750, 440, 'K.A.K.', { size: 34, kalin: 700 }), yazi(c, g, 750, 476, 'Kenar-Açı-Kenar', { size: 22, renk: RENK.soluk }), yazi(c, g, 750, 512, 'iki kenar orantılı, açı eşit', { size: 24, kalin: 700 })];
    const isaretS = sol.flatMap((u) => [...u.kenarlar, ...u.yaylar]), isaretG = sag.flatMap((u) => [...u.kenarlar, ...u.yaylar]);
    gizle(sol.map((u) => u.g), sag.map((u) => u.g), isaretS, isaretG, etS, etG);
    await belir(c, [...sol.map((u) => u.g), ...etS.slice(0, 2)], 450);
    await belir(c, isaretS, 450);
    await belir(c, etS[2], 350);
    await belir(c, [...sag.map((u) => u.g), ...etG.slice(0, 2)], 450);
    await belir(c, isaretG, 450);
    await belir(c, etG[2], 350);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const bos = () => c.S('g', {}, svg);
    const kural = async (yap, cumle, secenek) => {
      const g = bos();
      await par(c.say(cumle, secenek), yap(c, g));
      await c.wait(500);
      return g;
    };
    const gec = async (g) => { c.clearSay(); await kaldir(c, g); };

    const g0 = bos(); yazi(c, g0, 500, 290, 'Eşlik ve benzerlik', { size: 46, kalin: 700 }); gizle(g0);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, g0, 450));
    await gec(g0);

    await gec(await kural(esUcgenler, 'Eş üçgenlerde karşılıklı kenarlar ve açılar eşittir; köşeler aynı sırada yazılır.'));

    const g2 = await kural(eslikKosullari, 'Eşlik için Kenar-Kenar-Kenar, Kenar-Açı-Kenar ya da Açı-Kenar-Açı yeter.');
    c.note('<b>Eşlik:</b> K.K.K., K.A.K., A.K.A.', 'Eşlik ve benzerlik', 'eb-b6-eslik');
    await gec(g2);

    await gec(await kural(ucAci, 'Üç açı eşitliği eşlik için yetmez.'));

    await gec(await kural(benzer, 'Benzer üçgenlerde açılar eşit, kenarlar orantılıdır; oran 1 ise üçgenler eştir.',
      { speak: 'Benzer üçgenlerde açılar eşit, kenarlar orantılıdır; oran bir ise üçgenler eştir.' }));

    await gec(await kural(aciAci, 'İki açı eşitse üçgenler benzerdir.'));

    await kural(orantili, 'Üç kenar orantılı ya da iki kenar orantılı ve açı eşitse benzerdir.');
    c.note('<b>Benzerlik:</b> K.K.K., K.A.K., A.A.; k = 1 ise eş.', 'Eşlik ve benzerlik', 'eb-b6-benzerlik');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b6', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Konu tekrarı', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Eşlik ve benzerlik koşulları',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Eşlik ve benzerlik koşullarını hatırlar.', 'Koşulları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      {
        q: 'İki üçgenin üç açısı da 60°; birinin kenarları 4 cm, ötekinin 6 cm. Hangisi doğrudur?',
        options: ['Benzerdirler, eş değildirler', 'Eştirler', 'Benzer değildirler'], answer: 0,
        why: ['Açılar eşit olduğundan benzerdirler; kenarlar farklı olduğundan eş değildirler.', 'Üç açı eşitliği eşlik için yetmez; üstelik kenarlar farklıdır.', 'Açıları eşit olan üçgenler benzerdir; kenarların farklı olması bunu bozmaz.'], scene: 0,
      },
      {
        q: 'ABC ≅ DEF ve |BC| = 9 cm. |EF| kaç cm’dir?',
        options: ['18 cm', '9 cm', 'Bilinemez'], answer: 1,
        why: ['Eş üçgenlerde karşılıklı kenarlar eşittir; |EF| iki katı olmaz.', 'B ile E, C ile F karşılıklıdır; eş üçgenlerde |EF| = |BC| = 9 cm.', 'Köşeler aynı sırada yazıldığı için karşılıklı kenarlar bellidir; |EF| bilinir.'], scene: 0,
      },
      {
        q: 'ABC’de |AB| = 3 ve |AC| = 5; DEF’de |DE| = 9 ve |DF| = 15; m(A) = m(D) = 50°. Hangisi doğrudur?',
        options: ['Eştirler', 'Hiçbir şey söylenemez', 'Benzerdirler (Kenar-Açı-Kenar)'], answer: 2,
        why: ['Kenarlar eşit değildir: 3 ≠ 9. Eşlik olmaz.', 'İki kenar oranı eşit ve aradaki açılar eşit; benzerlik söylenebilir.', '9 ÷ 3 = 3 ve 15 ÷ 5 = 3; oranlar eşit, aradaki açı eşit: Kenar-Açı-Kenar ile benzerdirler.'], scene: 0,
      },
      {
        q: '1/100 000 ölçekli haritada iki kent arası 6 cm. Gerçek uzaklık kaç km’dir?',
        options: ['60 km', '600 km', '6 km'], answer: 2,
        why: ['60 km, birim çevirmede bir basamak kaymaktır; 100 000 cm = 1 km’dir.', '600 km çok büyüktür; 600 000 cm yalnızca 6 km eder.', '6 × 100 000 = 600 000 cm; 100 000 cm = 1 km olduğundan 6 km.'], scene: 0,
      },
      {
        q: 'Karşılıklı iki açısı eşit olan iki üçgenin karşılıklı bir kenarı da eşit. Benzerlik oranı ve sonuç nedir?',
        options: ['Söylenemez', '1; üçgenler eştir', '2; benzerdirler'], answer: 1,
        why: ['İki açı eşit olduğundan üçgenler benzerdir; sonuç söylenebilir.', 'Üçgenler benzerdir ve karşılıklı kenar eşittir: oran 1, üçgenler eştir.', 'Oran 2 olsaydı karşılıklı kenarlar eşit olmazdı; eşit kenar oranın 1 olduğunu gösterir.'], scene: 0,
      },
      {
        q: 'Karşılıklı üç kenarı 6, 8 ve 10 cm olan iki üçgen için hangisi doğrudur?',
        options: ['Yalnızca benzerdirler', 'Hiçbir şey söylenemez', 'Eştirler (Kenar-Kenar-Kenar)'], answer: 2,
        why: ['Üç kenarı eşit olan üçgenler benzer olmakla kalmaz, eştir; oran 1’dir.', 'Üç karşılıklı kenar eşitliği bir eşlik koşuludur; sonuç söylenebilir.', 'Üç karşılıklı kenar eşit olduğundan Kenar-Kenar-Kenar ile üçgenler eştir.'], scene: 0,
      },
      {
        q: 'Boyu 4 m olan bir çubuğun gölgesi 3 m. Aynı anda bir ağacın gölgesi 12 m ise ağaç kaç metredir?',
        options: ['16 m', '9 m', '15 m'], answer: 0,
        why: ['Gölge 12 ÷ 3 = 4 kat büyük; boy da 4 kat büyük: 4 × 4 = 16 m.', '9, 12 − 3’tür; gölge farkı boy farkı vermez, oran korunur.', '15 m orantıdan çıkmaz; boy gölgeyle aynı oranda, yani 4 kat büyür.'], scene: 0,
      },
      {
        q: 'Kenarları 3, 4, 5 olan üçgenin her kenarına 2 eklenerek 5, 6, 7 elde edildi. Bu üçgenler için hangisi doğrudur?',
        options: ['Benzer değildirler; oranlar aynı değil', 'Benzerdirler; her kenar 2 arttı', 'Eştirler'], answer: 0,
        why: ['5/3, 6/4 ve 7/5 aynı değildir; kenarlar aynı oranda büyümediği için benzer değildirler.', 'Benzerlikte kenarlar aynı oranda büyür; aynı sayı kadar artmak oranı korumaz.', 'Kenarlar eşit değildir, eşlik olmaz.'], scene: 0,
      },
      {
        q: 'ABC ~ DEF’de |AB| / |DE| = 2 ve |DE| = 7 cm. |AB| kaç cm’dir?',
        options: ['3,5 cm', '14 cm', '9 cm'], answer: 1,
        why: ['3,5, 7’nin yarısıdır; oran |AB| / |DE| = 2 olduğundan |AB|, |DE|’den büyüktür.', '|AB| = 2 × |DE| = 2 × 7 = 14 cm.', '9, 7 + 2’dir; oran çarpmayla uygulanır, toplamayla değil.'], scene: 0,
      },
      {
        q: 'ABC ve DEF’de m(A) = m(D) = 35° ve m(B) = m(E) = 65°. Hangisi doğrudur?',
        options: ['Üçgenler eştir', 'm(C) = m(F) = 80° ve ABC ~ DEF', 'm(C) = 80° ama benzer değiller'], answer: 1,
        why: ['İki açı eşitliği eşlik için yetmez; kenarlar hakkında bir şey bilinmiyor.', 'Üçüncü açılar 180° − 35° − 65° = 80°’dir; iki açı eşit olduğundan Açı-Açı ile benzerdirler.', 'İki açı eşit olduğundan Açı-Açı ile benzerdirler; benzer değiller demek yanlıştır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Üç kenar tek üçgen verir; kenarlar aynı oranda büyürse biçim kalır.</b>',
      'Eşlik: Kenar-Kenar-Kenar, Kenar-Açı-Kenar, Açı-Kenar-Açı; üç açı yetmez.',
      'Benzerlik: Kenar-Kenar-Kenar, Kenar-Açı-Kenar, Açı-Açı; k = 1 ise eş.',
    ],
  });
})();
