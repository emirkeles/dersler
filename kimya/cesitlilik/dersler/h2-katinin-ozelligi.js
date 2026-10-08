/* H2 — Katının özelliğini etkileşim belirler
   Kristal katılar taneciklerini bir arada tutan etkileşimin türüne göre dört gruba ayrılır (iyonik, moleküler, kovalent, metalik);
   erime noktası, elektrik iletkenliği ve sertlik bu türe bağlıdır. Öğrenci bir malzeme laboratuvarının on bir kristal katı üzerindeki
   ölçümlerinden her türün niteliklerini çıkarır ve çıkarımını bilim insanlarının genellemesiyle karşılaştırır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/H-katilar.md ("H2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Çizimler şematiktir; ölçüm değerleri senaryodaki gibidir. Ölçüm tabloları (sahne 3, 4, 6, 7, 9) sayı ve kısa etiketten oluşur. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, isaret, sinifla } = window.KIT;
  const { H, molekul, katiCizimi, sira, siniflaTahtasi, yukEtiket } = window.KIT_H;
  const { ease } = Ders;

  /* Bir malzeme laboratuvarının ölçtüğü on bir kristal katı. mp: erime noktası (°C), sert: Mohs sertliği. */
  const D = {
    buz: { ad: 'buz', tur: 'moleküler', mp: 0, il: 'iletmez', sert: 1.5 },
    kurubuz: { ad: 'kuru buz', tur: 'moleküler', mp: -79, il: 'iletmez', sert: 2 },
    ki: { ad: 'potasyum iyodür', tur: 'iyonik', mp: 681, il: 'iletmez', sert: 2 },
    tuz: { ad: 'sofra tuzu', tur: 'iyonik', mp: 801, il: 'iletmez', sert: 2.5 },
    cao: { ad: 'kalsiyum oksit', tur: 'iyonik', mp: 2572, il: 'iletmez', sert: 3.5 },
    elmas: { ad: 'elmas', tur: 'kovalent', mp: 3550, il: 'iletmez', sert: 10 },
    grafit: { ad: 'grafit', tur: 'kovalent', mp: 3927, il: 'iletir', sert: 1.5 },
    kuvars: { ad: 'kuvars', tur: 'kovalent', mp: 1785, il: 'iletmez', sert: 7 },
    na: { ad: 'sodyum', tur: 'metalik', mp: 98, il: 'iletir', sert: 0.5 },
    mg: { ad: 'magnezyum', tur: 'metalik', mp: 650, il: 'iletir', sert: 2.5 },
    al: { ad: 'alüminyum', tur: 'metalik', mp: 660, il: 'iletir', sert: 2.75 },
  };
  /* alan: satırın değeri hangi ölçümden gelir ('mp' erime noktası, 'sert' sertlik, 'il' iletkenlik) */
  const liste = (alan, ...ad) => ad.map((a) => Object.assign({}, D[a], alan === 'il' ? { durum: D[a].il } : { deger: D[a][alan] }));
  const duz = (c, p, x, y, m, size, o = {}) => yazi(c, p, x, y, m, Object.assign({ size, kalin: 700 }, o));

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const kr = c.S('g', {}, svg), mo = c.S('g', {}, svg);
    katiCizimi(c, kr, 'tuz', 500, 260, 150, { cizgi: true });
    molekul(c, mo, 'H2O', 300, 240, 1.7); molekul(c, mo, 'CO2', 700, 240, 1.4);
    duz(c, mo, 300, 400, 'H_{2}O', 44, { math: true }); duz(c, mo, 700, 400, 'CO_{2}', 44, { math: true });
    gizle(kr, mo);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, kr, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Kristal katının tanecikleri nasıl dizilir?',
      options: ['Düzensiz bir yapıda', 'Yinelenen düzenli bir yapıda', 'Yalnızca birkaç taneciğin düzeninde'], answer: 1,
      hints: ['Kristal katıda tanecikler yinelenen düzenli bir yapı kurar.', '', 'Kristal katıda tanecikler yinelenen düzenli bir yapı kurar.'],
      right: 'Evet. Kristal katıda tanecikler yinelenen düzenli bir yapı kurar.',
    });
    c.clearSay();
    await belir(c, kr, 400, 0);
    await belir(c, mo, 500);
    await c.choice({
      tag: 'Hatırla', q: 'H<sub>2</sub>O ve CO<sub>2</sub> moleküllerinden hangisi hidrojen bağı kurabilir?',
      options: ['CO<sub>2</sub>', 'İkisi de', 'H<sub>2</sub>O'], answer: 2,
      hints: ['O–H bağı olan molekül hidrojen bağı kurabilir; CO<sub>2</sub>\'de yok.', 'O–H bağı olan molekül hidrojen bağı kurabilir; CO<sub>2</sub>\'de yok.', ''],
      right: 'Evet. H<sub>2</sub>O\'da O–H bağı var; CO<sub>2</sub>\'de yok.',
    });
    await c.wait(400);
    await c.say('Bugün katının tanecikleri arasındaki etkileşimin neye yol açtığına bakacağız.', { speak: '[curious] Bugün katının tanecikleri arasındaki etkileşimin neye yol açtığına bakacağız.' });
  }

  /* ---- 2. İyonik ve moleküler katı ---- */
  async function ilkIki(c) {
    const svg = c.svg(1000, 562);
    const R = 112, CY = 190, X = [170, 500, 830];
    const tuz = katiCizimi(c, svg, 'tuz', X[0], CY, R, { cizgi: true }), buz = katiCizimi(c, svg, 'buz', X[1], CY, R, { cizgi: true }), kuru = katiCizimi(c, svg, 'kurubuz', X[2], CY, R, { cizgi: true });
    const etiket = (x, satirlar) => satirlar.map((s, i) => duz(c, svg, x, 342 + i * 34, s, i === 0 ? 28 : 24, { kalin: i === 0 ? 700 : 500, renk: i === 0 ? RENK.yazi : RENK.soluk }));
    const eT = etiket(X[0], ['iyonik katı', 'iyonlar', 'iyonik bağ']), eB = etiket(X[1], ['moleküler katı', 'moleküller', 'hidrojen bağı', 'dipol-dipol', 'London']);
    const eK = etiket(X[2], ['moleküler katı']);
    gizle(tuz.g, buz.g, kuru.g, eT, eB, eK);

    await par(c.say('Kristal katılar, taneciklerinin türüne göre dört gruba ayrılır.'), belir(c, [tuz.g, buz.g], 600, 0.35));
    await par(c.say('Birinci grup iyonik katıdır: tanecikleri katyonlar ve anyonlardır.'), belir(c, tuz.g, 400), belir(c, [eT[0], eT[1]], 600));
    await par(c.say('İyonları iyonik bağ, yani zıt yüklerin çekimi tutar.'), belir(c, eT[2], 600));
    await par(c.say('Sofra tuzu iyonik katıdır.'), tuz.canlan(3000));
    await par(c.say('İkinci grup moleküler katıdır: tanecikleri moleküllerdir.'), belir(c, buz.g, 400), belir(c, [eB[0], eB[1]], 600));
    await par(c.say('Molekülleri hidrojen bağı, dipol-dipol ve London etkileşimleri tutar.'), belir(c, eB.slice(2), 700));
    await par(c.say('Buz, yani katı su, moleküler katıdır.'), buz.canlan(3000));
    c.clearSay();
    await belir(c, kuru.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Kuru buz, katı karbon dioksittir. Hangi gruptadır?',
      options: ['İyonik katı', 'Metalik katı', 'Moleküler katı'], answer: 2,
      hints: ['İyonik katıda tanecikler iyonlardır.', 'Kuru buzun tanecikleri CO<sub>2</sub> molekülleridir.', ''],
      right: 'Evet. Kuru buzun tanecikleri moleküllerdir; moleküler katıdır.',
    });
    await par(c.say('Buz ve kuru buz moleküler katıdır.'), belir(c, eK, 600), kuru.canlan(3000));
  }

  /* ---- 3. Kovalent ve metalik katı; dört tür tablosu ---- */
  async function ikiGrup(c) {
    const svg = c.svg(1000, 562);
    const R = 140, CY = 215;
    const elm = katiCizimi(c, svg, 'elmas', 250, CY, R, { cizgi: true }), sod = katiCizimi(c, svg, 'sodyum', 750, CY, R, { cizgi: true });
    const e1 = [duz(c, svg, 250, 420, 'kovalent katı', 30), duz(c, svg, 250, 456, 'atomlar', 24, { kalin: 500, renk: RENK.soluk })];
    const e2 = [duz(c, svg, 250, 488, 'kovalent bağ', 24, { kalin: 500, renk: RENK.soluk })];
    const e3 = [duz(c, svg, 250, 526, 'elmas, grafit, kuvars', 24, { kalin: 500, renk: RENK.soluk })];
    const f1 = [duz(c, svg, 750, 420, 'metalik katı', 30), duz(c, svg, 750, 456, 'katyonlar ve elektron denizi', 24, { kalin: 500, renk: RENK.soluk })];
    const f2 = [duz(c, svg, 750, 488, 'metalik bağ', 24, { kalin: 500, renk: RENK.soluk })];
    const f3 = [duz(c, svg, 750, 526, 'sodyum', 24, { kalin: 500, renk: RENK.soluk })];
    gizle(elm.g, sod.g, e1, e2, e3, f1, f2, f3);

    // Dört tür tablosu: tür · tanecik · etkileşim · örnek
    const tablo = c.S('g', {}, svg), XS = [24, 190, 470, 800], YB = 44;
    ['tür', 'tanecik', 'etkileşim', 'örnek'].forEach((t, i) => duz(c, tablo, XS[i], YB, t, 22, { hiza: 'start', kalin: 500, renk: RENK.soluk }));
    cizgi(c, tablo, [20, YB + 16], [980, YB + 16], RENK.kenarlik, 1.5);
    gizle(tablo);
    const satirYaz = (i, v, soru) => {
      const y = YB + 62 + i * 66, g = c.S('g', {}, svg), t = [];
      v.forEach((m, j) => t.push(duz(c, g, XS[j], y, m, 21, { hiza: 'start', kalin: j === 0 ? 700 : 600, renk: m === '?' ? RENK.vurgu : RENK.yazi, math: j === 1 })));
      cizgi(c, g, [20, y + 24], [980, y + 24], RENK.kenarlik, 1);
      gizle(g);
      return { g, t };
    };
    const S = [
      satirYaz(0, ['iyonik katı', 'katyon, anyon', 'iyonik bağ', 'sofra tuzu']),
      satirYaz(1, ['moleküler katı', 'molekül', 'moleküller arası etkileşimler', 'buz']),
      satirYaz(2, ['kovalent katı', 'atom', 'kovalent bağ', 'elmas']),
      satirYaz(3, ['metalik katı', 'katyon, elektron denizi', 'metalik bağ', 'sodyum']),
      satirYaz(4, ['?', 'Ca^{2+} ve O^{2−} iyonları', '', 'kalsiyum oksit']),
      satirYaz(5, ['?', 'Al^{3+}, serbest elektronlar', '', 'alüminyum']),
    ];

    await par(c.say('Üçüncü grup kovalent katıdır: tanecikleri kovalent bağlı atomlardır.'), belir(c, elm.g, 500), belir(c, e1, 600));
    await par(c.say('Atomları kovalent bağ bir arada tutar.'), belir(c, e2, 600));
    await par(c.say('Elmas, grafit ve kuvars kovalent katıdır.'), belir(c, e3, 600), elm.canlan(2600));
    await par(c.say('Dördüncü grup metalik katıdır: tanecikleri metal katyonları ve elektron denizidir.'), belir(c, sod.g, 500), belir(c, f1, 600));
    await par(c.say('Katyonları ve elektron denizini metalik bağ bir arada tutar.'), belir(c, f2, 600));
    await par(c.say('Sodyum metalik katıdır.'), belir(c, f3, 500), sod.canlan(3000));
    await par(c.say('Dört grubu bir tabloda toplayalım.'), belir(c, [elm.g, sod.g, ...e1, ...e2, ...e3, ...f1, ...f2, ...f3], 500, 0), (async () => {
      await c.wait(400);
      await belir(c, tablo, 400);
      for (let i = 0; i < 4; i++) await belir(c, S[i].g, 450);
    })());

    // Birlikte çöz: kalsiyum oksit
    c.clearSay();
    await belir(c, S[4].g, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kalsiyum oksit hangi gruptadır?',
      options: ['Moleküler katı', 'Metalik katı', 'İyonik katı'], answer: 2,
      hints: ['Ne molekül var ne elektron denizi.', 'Ne molekül var ne elektron denizi.', ''],
      right: 'Evet. Tanecikleri katyon ve anyon; iyonik katı.',
    });
    S[4].t[0].textContent = 'iyonik katı'; S[4].t[0].style.fill = RENK.yazi; S[4].t[2].textContent = 'iyonik bağ';
    await c.say('Kalsiyum oksit iyonik katıdır.');
    c.clearSay();

    // Sor: alüminyum
    await belir(c, S[5].g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Alüminyum, Al<sup>3+</sup> katyonları ve serbest dolaşan elektronlardan oluşur. Hangi gruptadır?',
      options: ['Metalik katı', 'İyonik katı', 'Kovalent katı'], answer: 0,
      hints: ['', 'Anyon yok; iyonik olamaz.', 'Katyonlar ve elektron denizi birlikte.'],
      right: 'Evet. Katyonlar ve elektron denizi: metalik katı.',
    });
    S[5].t[0].textContent = 'metalik katı'; S[5].t[0].style.fill = RENK.yazi; S[5].t[2].textContent = 'metalik bağ';
    await c.say('Alüminyum metalik katıdır.');
    await c.say('Etkileşimin türü, katının hangi gruba girdiğini belirler.');
    c.note('<b>Dört tür:</b> iyonik, moleküler, kovalent, metalik katı.', 'Kristal katı türleri', 'dort-tur');
  }

  /* ---- 4. Erime noktası ---- */
  async function erime(c) {
    const svg = c.svg(1000, 562);
    const L = liste('mp', 'buz', 'kurubuz', 'ki', 'tuz', 'cao', 'elmas', 'grafit', 'kuvars');
    const T = sira(c, svg, { satirlar: L, mod: 'cubuk', min: -100, max: 4000, genis: 480, ticks: [0, 1000, 2000, 3000, 4000], birim: ' °C', fmt: (v) => String(v).replace('-', '−'), yer: { y0: 50, dy: 50 } });
    const gruplar = [[0, 1], [2, 3, 4], [5, 6, 7]];
    const ac = (g) => par(...g.map((i) => T.ac(i, 450)));

    await c.say('Bir malzeme laboratuvarı on bir kristal katıyı ölçtü.');
    await c.say('Her katı için erime noktasını, iletkenliği ve sertliği yazdı.');
    await par(c.say('Önce erime noktalarını çubuklarla çizelim.'), belir(c, T.eksen, 600));
    await par(c.say('Buzun erime noktası 0 °C, kuru buzunki −79 °C.', { speak: 'Buzun erime noktası sıfır derece, kuru buzunki eksi yetmiş dokuz derece.' }), ac(gruplar[0]));
    await c.say('Moleküller arası etkileşimler bağlardan zayıftır; moleküler katılar düşük sıcaklıkta erir.');
    await par(c.say('Potasyum iyodür 681, sofra tuzu 801, kalsiyum oksit 2572 °C\'ta erir.', { speak: 'Potasyum iyodür altı yüz seksen bir, sofra tuzu sekiz yüz bir, kalsiyum oksit iki bin beş yüz yetmiş iki derecede erir.' }), ac(gruplar[1]));
    await c.say('İyonik bağ güçlüdür; iyonik katılar yüksek sıcaklıkta erir.');
    await par(c.say('Elmas 3550, grafit 3927, kuvars 1785 °C\'ta erir.', { speak: 'Elmas üç bin beş yüz elli, grafit üç bin dokuz yüz yirmi yedi, kuvars bin yedi yüz seksen beş derecede erir.' }), ac(gruplar[2]));
    await c.say('Kovalent bağ da güçlüdür; kovalent katıların erime noktası çok yüksektir.');
    await c.choice({
      tag: 'Sıra sende', q: 'Bir moleküler katı ile bir iyonik katıdan hangisinin erime noktasının düşük olması beklenir?',
      options: ['İyonik katının', 'Moleküler katının', 'İkisinin de aynı olması'], answer: 1,
      hints: ['Buz ile sofra tuzunu karşılaştır.', '', 'Moleküller arası etkileşimler bağlardan zayıf.'],
      right: 'Evet. Zayıf etkileşimli moleküler katı daha düşük sıcaklıkta erir.',
    });
    T.vurgula(0, true); T.vurgula(3, true);
    await c.say('İki kristal katının erime noktası, etkileşim türüne göre çok farklı olabilir.');
    c.note('<b>Moleküler katılar düşük, iyonik ve kovalent katılar yüksek sıcaklıkta erir.</b>', 'Erime noktası', 'erime-noktasi');
  }

  /* ---- 5. Metalik katıların erime noktası ---- */
  async function metalErime(c) {
    const svg = c.svg(1000, 562);
    const M = [
      { kati: 'sodyum', ad: 'sodyum', iyon: 'Na^{+}', yuk: '1+', mp: 98 },
      { kati: 'magnezyum', ad: 'magnezyum', iyon: 'Mg^{2+}', yuk: '2+', mp: 650 },
      { kati: 'aluminyum', ad: 'alüminyum', iyon: 'Al^{3+}', yuk: '3+', mp: 660 },
    ];
    const ok = c.S('g', {}, svg);
    duz(c, ok, 500, 34, 'metalik bağ kuvvetlenir', 24, { renk: RENK.cekme });
    cizgi(c, ok, [90, 54], [900, 54], RENK.cekme, 3); c.S('path', { d: 'M912,54 L890,44 L890,64 Z', fill: RENK.cekme }, ok);
    gizle(ok);
    const OL = 0.38;
    const kutular = M.map((m, i) => {
      const x = 30 + i * 325, cx = x + 145, g = c.S('g', {}, svg);
      kutu(c, g, x, 72, 290, 410, { rx: 14 });
      duz(c, g, cx, 110, m.ad, 26);
      duz(c, g, cx, 148, m.iyon, 32, { math: true, renk: RENK.arti });
      const ciz = katiCizimi(c, g, m.kati, cx, 245, 78, { cizgi: true });
      const yuk = duz(c, g, cx, 372, m.yuk, 34, { renk: RENK.arti });
      const deger = duz(c, g, x + 22, 424, m.mp + ' °C', 24, { hiza: 'start' });
      const bar = c.S('rect', { x: x + 22, y: 440, width: 0, height: 18, rx: 4, fill: '#a7adbd' }, g);
      gizle(g);
      return { g, ciz, yuk, deger, bar, m };
    });
    const [Na, Mg, Al] = kutular;
    gizle(Na.yuk, Mg.yuk, Al.yuk);
    const alSoru = duz(c, Al.g, 30 + 2 * 325 + 22, 424, '?', 30, { hiza: 'start', renk: RENK.vurgu });
    Al.deger.style.opacity = 0;
    const uzat = (k, ms = 900) => c.tween(ms, (e) => k.bar.setAttribute('width', k.m.mp * OL * e), ease.out);
    const sonSatir = duz(c, svg, 500, 530, 'Na < Mg < Al', 34, { renk: RENK.vurgu });
    gizle(sonSatir);

    await par(c.say('Metalik katılarda erime noktaları birbirinden çok farklıdır.'), belir(c, [Na.g, Mg.g], 600));
    await par(c.say('Sodyum 98 °C\'ta, magnezyum 650 °C\'ta erir.', { speak: 'Sodyum doksan sekiz derecede, magnezyum altı yüz elli derecede erir.' }), uzat(Na), uzat(Mg, 1400));
    await par(c.say('İyon yükü ve serbest elektron sayısı arttıkça metalik bağ kuvvetlenir.'), belir(c, ok, 700), par(Na.ciz.canlan(3600), Mg.ciz.canlan(3600)));
    await par(c.say('Sodyum 1+, magnezyum 2+, alüminyum 3+ iyon verir.', { speak: 'Sodyum bir artı, magnezyum iki artı, alüminyum üç artı iyon verir.' }),
      belir(c, Al.g, 600), belir(c, [Na.yuk, Mg.yuk, Al.yuk], 700));
    await par(c.say('Bağ kuvveti sodyumdan alüminyuma doğru artar.'), Al.ciz.canlan(3200));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Alüminyumun erime noktası magnezyumunkine göre nasıl olur?',
      options: ['Daha düşük', 'Daha yüksek', 'Aynı'], answer: 1,
      hints: ['Bağ daha kuvvetli; erimesi daha zor.', '', 'Alüminyumda iyon yükü ve serbest elektron sayısı daha büyük.'],
      right: 'Evet. Bağ daha kuvvetli olduğundan erimesi daha zordur.',
    });
    alSoru.remove(); Al.deger.style.opacity = 1;
    await par(c.say('Alüminyum 660 °C\'ta erir; sıra bağ kuvvetiyle aynıdır.', { speak: 'Alüminyum altı yüz altmış derecede erir; sıra bağ kuvvetiyle aynıdır.' }),
      uzat(Al, 1400), belir(c, sonSatir, 700));
    await c.say('Metalik katının erime noktası düşük de olur, yüksek de.');
    c.note('<b>Yük ve serbest elektron arttıkça metalik bağ kuvvetlenir.</b> Na&lt;Mg&lt;Al.', 'Metalik katıda erime noktası', 'metal-erime');
  }

  /* ---- 6. Elektrik iletkenliği ---- */
  async function iletkenlik(c) {
    const svg = c.svg(1000, 562);
    const L = liste('il', 'na', 'mg', 'al', 'ki', 'tuz', 'cao', 'buz', 'kurubuz', 'elmas', 'kuvars', 'grafit');
    const T = sira(c, svg, { satirlar: L, mod: 'durum', yer: { y0: 64, dy: 43 } });
    const bas = duz(c, svg, 350, 30, 'iletkenlik', 20, { hiza: 'start', kalin: 500, renk: RENK.soluk });
    const yal = duz(c, svg, 760, 250, 'yalıtkan', 34, { renk: RENK.vurgu });
    const ince = cizgi(c, svg, [640, 170], [640, 430], RENK.vurgu, 2.5, { 'stroke-dasharray': '6 6' });
    gizle(bas, yal, ince);
    const ac = (idx) => par(...idx.map((i) => T.ac(i, 450)));

    await par(c.say('Şimdi elektrik iletkenliğine bakalım.'), belir(c, bas, 500));
    await par(c.say('Sodyum, magnezyum ve alüminyum elektriği iletir.'), ac([0, 1, 2]));
    await par(c.say('Elektriği iletmeyen katıya yalıtkan denir.'), belir(c, [yal, ince], 700));
    await par(c.say('İyonik katıların üçü de yalıtkandır.'), ac([3, 4, 5]));
    await par(c.say('Buz ve kuru buz da yalıtkandır.'), ac([6, 7]));
    await par(c.say('Elmas ve kuvars da elektriği iletmez.'), ac([8, 9]));
    await c.choice({
      tag: 'Sıra sende', q: 'Demir de metalik bir katıdır. Elektrik iletkenliği için ne beklenir?',
      options: ['İletmez', 'İletir', 'Erime noktası yüksekse iletir'], answer: 1,
      hints: ['Metalik üç katının üçü de iletti.', '', 'İletkenlik erime noktasına bağlı çıkmadı.'],
      right: 'Evet. Metalik katılar elektriği iletir.',
    });
    await par(c.say('Demir de metalik katıdır; elektriği iletir.'), belir(c, T.satirlar.slice(3, 10).map((s) => s.g), 400, 0.4), (async () => { [0, 1, 2].forEach((i) => T.vurgula(i, true)); })());
    [0, 1, 2].forEach((i) => T.vurgula(i, false));
    c.clearSay();
    await par(c.say('Grafit de kovalent katıdır, ama elektriği iletir.'), T.ac(10, 600));
    T.vurgula(10, true);
    await c.say('Kovalent katılar genellikle yalıtkandır; grafit bu düzenin dışında kalır.');
    c.note('<b>Metalik katılar elektriği iletir; öteki gruplar genellikle iletmez.</b>', 'Elektrik iletkenliği', 'iletkenlik');
  }

  /* ---- 7. Sertlik ---- */
  async function sertlik(c) {
    const svg = c.svg(1000, 562);
    const L = liste('sert', 'elmas', 'kuvars', 'buz', 'kurubuz', 'ki', 'tuz', 'cao', 'na', 'mg', 'al', 'grafit');
    const T = sira(c, svg, { satirlar: L, mod: 'nokta', min: 0, max: 10, genis: 450, ticks: [0, 2, 4, 6, 8, 10], fmt: (v) => H_(v), yer: { y0: 50, dy: 40 } });
    const daha = duz(c, svg, 830, 510, 'daha sert', 22, { hiza: 'start', kalin: 500, renk: RENK.soluk });
    const i10 = T.isaret(10, 'en sert'), i35 = T.isaret(3.5, '3,5');
    gizle(daha);
    const ac = (idx) => par(...idx.map((i) => T.ac(i, 450)));

    await par(c.say('Üçüncü nitelik sertliktir; sayı büyüdükçe katı daha serttir.'), belir(c, [T.eksen, daha], 600));
    await par(c.say('En sert mineralin değeri 10 sayılır.', { speak: 'En sert mineralin değeri on sayılır.' }), belir(c, i10, 600));
    await par(c.say('Elmasın sertliği 10, kuvarsınki 7\'dir.', { speak: 'Elmasın sertliği on, kuvarsınki yedidir.' }), ac([0, 1]));
    await par(c.say('Öteki dokuz katının sertliği 3,5\'i geçmez.', { speak: 'Öteki dokuz katının sertliği üç buçuğu geçmez.' }), belir(c, i35, 600));
    await par(c.say('Moleküler katılar 1,5 ile 2 arasındadır.', { speak: 'Moleküler katılar bir buçuk ile iki arasındadır.' }), ac([2, 3]));
    await par(c.say('İyonik katılar 2 ile 3,5 arasındadır.', { speak: 'İyonik katılar iki ile üç buçuk arasındadır.' }), ac([4, 5, 6]));
    await par(c.say('Metalik katılar 0,5 ile 2,75 arasındadır.', { speak: 'Metalik katılar sıfır virgül beş ile iki virgül yetmiş beş arasındadır.' }), ac([7, 8, 9]));
    await par(c.say('Grafit de kovalent katıdır; sertliği 1,5\'tir.', { speak: 'Grafit de kovalent katıdır; sertliği bir buçuktur.' }), T.ac(10, 600));
    T.vurgula(10, true);
    await c.choice({
      tag: 'Sıra sende', q: 'Kovalent katılardan hangi ikisi ölçekte en yukarıdadır?',
      options: ['Elmas ve grafit', 'Elmas ve kuvars', 'Kuvars ve grafit'], answer: 1,
      hints: ['Grafitin değeri 1,5.', '', 'Sertliği en büyük iki katıya bak.'],
      right: 'Evet. Elmas 10, kuvars 7; ikisi de ölçeğin en yukarısında.',
    });
    T.vurgula(10, false);
    await par(c.say('Çok sert katılar yalnızca kovalent katılar arasında çıktı.'), belir(c, T.satirlar.slice(2).map((s) => s.g), 400, 0.35), (async () => { T.vurgula(0, true); T.vurgula(1, true); })());
    c.note('<b>Çok sert katılar kovalent katılar arasında çıktı.</b> Örnek: elmas 10.', 'Sertlik', 'sertlik');
  }
  const H_ = (v) => String(v).replace('.', ',');

  /* ---- 8. Her tür için genelleme ---- */
  async function genelleme(c) {
    const svg = c.svg(1000, 562);
    const SUT = [
      { ad: 'iyonik katı', kati: ['sofra tuzu', 'potasyum iyodür', 'kalsiyum oksit'], sonuc: ['erime noktası yüksek', 'yalıtkan'] },
      { ad: 'moleküler katı', kati: ['buz', 'kuru buz'], sonuc: ['erime noktası düşük', 'yumuşak', 'yalıtkan'] },
      { ad: 'kovalent katı', kati: ['elmas', 'grafit', 'kuvars'], sonuc: ['erime noktası', 'çok yüksek', 'çoğu çok sert', 'yalıtkan'] },
      { ad: 'metalik katı', kati: ['sodyum', 'magnezyum', 'alüminyum'], sonuc: ['iletir', 'erime noktası', 'düşük de yüksek de'] },
    ];
    const sutunlar = SUT.map((s, i) => {
      const x = 15 + i * 246, cx = x + 116, g = c.S('g', {}, svg);
      kutu(c, g, x, 30, 232, 410, { rx: 14 });
      duz(c, g, cx, 74, s.ad, 26);
      const adlar = s.kati.map((k, j) => duz(c, g, cx, 128 + j * 32, k, 22, { kalin: 500, renk: RENK.soluk }));
      const sonuc = s.sonuc.map((k, j) => duz(c, g, cx, 252 + j * 36, k, 22, { kalin: 600 }));
      gizle(sonuc);
      return { g, adlar, sonuc };
    });
    const alt = duz(c, svg, 500, 500, 'aynı türden katılar benzer niteliklerde, farklı türler ayrı', 22, { kalin: 500, renk: RENK.soluk });
    gizle(sutunlar.map((s) => s.g), alt);
    const SIRA = [0, 1, 3, 2];
    const SORU = [
      { q: 'İyonik katılar için hangi genelleme doğrudur?', options: ['Erime noktası düşük; elektriği iletmez', 'Erime noktası yüksek; elektriği iletmez', 'Erime noktası yüksek; elektriği iletir'], answer: 1,
        hints: ['Üç iyonik katının erime noktası da yüksekti.', '', 'İyonik katıların üçü de elektriği iletmedi.'], cap: 'Üç iyonik katının ortak yanı budur.' },
      { q: 'Moleküler katılar için hangi genelleme doğrudur?', options: ['Erime noktası yüksek; çok sert; elektriği iletmez', 'Erime noktası düşük; elektriği iletir', 'Erime noktası düşük; yumuşak; elektriği iletmez'], answer: 2,
        hints: ['Buzun ve kuru buzun erime noktası düşüktü.', 'İkisi de elektriği iletmedi.', ''], cap: 'İki moleküler katıda da aynı çıktı.' },
      { q: 'Metalik katılar için hangi genelleme doğrudur?', options: ['Elektriği iletmez; erime noktası çok yüksek', 'Elektriği iletir; erime noktası hep çok düşük', 'Elektriği iletir; erime noktası düşük de olur, yüksek de'], answer: 2,
        hints: ['Sodyum, magnezyum ve alüminyum elektriği iletti.', 'Erime noktaları 98, 650 ve 660 °C idi; hepsi aynı düzeyde değildi.', ''], cap: 'Üçü de iletti; erime noktaları 98 ile 660 arasında.', speak: 'Üçü de iletti; erime noktaları doksan sekiz ile altı yüz altmış arasında.' },
      { q: 'Kovalent katılar için hangi genelleme doğrudur?', options: ['Erime noktası düşük; yumuşak', 'Erime noktası çok yüksek; çoğu çok sert ve yalıtkan', 'Elektriği hep iletir'], answer: 1,
        hints: ['Elmas, grafit ve kuvarsın erime noktaları 1785 ile 3927 arasındaydı.', '', 'Elmas ve kuvars elektriği iletmedi.'], cap: 'Grafit hariç; o iletiyor ve yumuşak.' },
    ];

    await par(c.say('Ölçümleri türlere göre toplayıp her tür için genelleme yapalım.'), belir(c, sutunlar.map((s) => s.g), 700));
    for (let n = 0; n < 4; n++) {
      const s = sutunlar[SIRA[n]];
      c.clearSay();
      s.g.firstChild.style.stroke = RENK.vurgu;
      const { cap, speak, ...soru } = SORU[n];
      await c.choice(Object.assign({ tag: 'Genelle', right: 'Evet. ' + cap }, soru));
      s.g.firstChild.style.stroke = RENK.kenarlik;
      await par(c.say(cap, speak ? { speak } : {}), belir(c, s.adlar, 350, 0.12), belir(c, s.sonuc, 500));
    }
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Sofra tuzu ile buz hangi nitelikte ayrılır?',
      options: ['İletkenlikte: tuz iletir, buz iletmez', 'Erime noktasında: tuzunki çok yüksek, buzunki çok düşük', 'Hiç ayrılmazlar'], answer: 1,
      hints: ['İkisi de yalıtkan; başka bir niteliğe bak.', '', 'Erime noktası sütununa bak.'],
      right: 'Evet. Tuz 801 °C\'ta, buz 0 °C\'ta erir.',
    });
    await par(c.say('Aynı etkileşime sahip katılar benzer niteliklere sahiptir.'), belir(c, alt, 600));
    await c.say('Farklı etkileşimli katıların nitelikleri ayrılır.');
  }

  /* ---- 9. Bilim insanlarının genellemesiyle karşılaştır ---- */
  async function bilimInsanlari(c) {
    const svg = c.svg(1000, 562);
    const XT = 24, XL = 160, XR = 520, XC = 962, YB = 40, DY = 120;
    const baslik = c.S('g', {}, svg);
    duz(c, baslik, XL, YB, 'ölçümlerden çıkan', 22, { hiza: 'start', kalin: 500, renk: RENK.soluk });
    duz(c, baslik, XR, YB, 'bilim insanlarının genellemesi', 22, { hiza: 'start', kalin: 500, renk: RENK.soluk });
    cizgi(c, baslik, [20, YB + 16], [980, YB + 16], RENK.kenarlik, 1.5);
    gizle(baslik);
    const SAT = [
      { tur: 'iyonik', sol: ['erime noktası yüksek;', 'yalıtkan'], sag: [['yüksek erime noktası, sert,'], ['kırılgan', ', yalıtkan']] },
      { tur: 'moleküler', sol: ['erime noktası düşük;', 'yumuşak, yalıtkan'], sag: [['düşük erime noktası,'], ['yumuşak, yalıtkan']] },
      { tur: 'kovalent', sol: ['erime noktası çok yüksek;', 'çoğu çok sert, yalıtkan'], sag: [['yüksek erime noktası,'], ['genellikle', ' sert ve yalıtkan']] },
      { tur: 'metalik', sol: ['iletir; erime noktası', 'düşük de yüksek de'], sag: [['düşük ya da yüksek erime noktası,'], ['yumuşak ya da sert, iletken,'], ['parlak']] },
    ];
    const vurgular = [];
    const satirlar = SAT.map((s, i) => {
      const y = YB + 64 + i * DY, g = c.S('g', {}, svg);
      duz(c, g, XT, y - 12, s.tur, 24, { hiza: 'start' });
      s.sol.forEach((m, j) => duz(c, g, XL, y - 14 + j * 28, m, 21, { hiza: 'start', kalin: 600 }));
      s.sag.forEach((parca, j) => {
        const t = renkli(c, g, XR, y - 14 + j * 28, parca.length > 1 ? parca : [parca[0]], { hiza: 'start', size: 21, kalin: 600 });
        [...t.querySelectorAll('tspan')].forEach((ts) => { if (['kırılgan', 'parlak', 'genellikle'].includes(ts.textContent.trim()) || ts.textContent === 'parlak') vurgular.push(ts); });
      });
      isaret(c, g, XC, y - 6, 'ok', 17);
      cizgi(c, g, [20, y + 62], [980, y + 62], RENK.kenarlik, 1);
      gizle(g);
      return { g, y };
    });
    const grafit = duz(c, satirlar[2].g, XR, satirlar[2].y + 36, 'grafit iletir', 21, { hiza: 'start', renk: RENK.vurgu });
    gizle(grafit);
    const sol = (i) => belir(c, satirlar[i].g, 450);

    await par(c.say('Bilim insanları da katıları bu dört türe ayırır.'), belir(c, baslik, 500));
    await c.say('Onların genellemesi, ölçümlerden çıkardığımızla aynı yöndedir.');
    await par(c.say('İyonik katı: yüksek erime noktası, sert, kırılgan, yalıtkan.'), sol(0));
    await par(c.say('Moleküler katı: düşük erime noktası, yumuşak, yalıtkan.'), sol(1));
    await par(c.say('Kovalent katı: yüksek erime noktası, genellikle sert ve yalıtkan.'), sol(2));
    await par(c.say('Metalik katı: erime noktası düşük ya da yüksek; iletken, parlak.'), sol(3));
    vurgular.forEach((t) => { if (['kırılgan', 'parlak'].includes(t.textContent.trim())) t.style.fill = RENK.vurgu; });
    await c.say('Kırılganlık ve parlaklık ölçtüğümüz üç nitelikte yoktu.');
    await par(c.say('Grafit hem yumuşak hem iletken; bu yüzden "genellikle" denir.'), belir(c, grafit, 600));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Genellemede olup ölçülen üç nitelikte olmayan hangisidir?',
      options: ['Erime noktası', 'Kırılganlık', 'Elektrik iletkenliği'], answer: 1,
      hints: ['Ölçülenler: erime noktası, iletkenlik, sertlik.', '', 'Hangisinin ölçümü yoktu?'],
      right: 'Evet. Kırılganlık ve parlaklık ölçülmedi.',
    });
    await c.say('Kırılganlık ve parlaklık ölçümlerde yoktu.');
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Kovalent katılar için genellemede neden "genellikle yalıtkan" denir?',
      options: ['Elmas elektriği iletir', 'Kuvars elektriği iletir', 'Grafit elektriği iletir'], answer: 2,
      hints: ['Elmas iletmiyordu.', 'Kuvars iletmiyordu. Hangisi iletkenlikte ötekilerden ayrıldı?', ''],
      right: 'Evet. Grafit iletiyor; bu yüzden "genellikle" denir.',
    });
    vurgular.forEach((t) => { if (t.textContent.trim() === 'genellikle') t.style.fill = RENK.vurgu; });
    await c.say('Grafit iletir; bu yüzden "genellikle" denir.');
    await c.say('Etkileşimi bilirsen katının niteliklerini önceden kestirirsin.');
    c.note('<b>Etkileşim türü katının niteliklerini belirler.</b> Örnek: iyonik katı yüksek sıcaklıkta erir.', 'Etkileşim ve katı', 'etkilesim-ve-kati');
  }

  /* ---- 10. Yeni katılarda dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { ad: 'kalsiyum florür', f: 'CaF_{2}', html: 'kalsiyum florür (CaF<sub>2</sub>)', info: 'CaF_{2}: Ca^{2+} ve F^{−} iyonları', kutu: 0, neden: 'Katyon ve anyon var; yüksek erime noktası, yalıtkan beklenir.' },
      { ad: 'naftalin', info: 'moleküllerden oluşur', html: 'naftalin', kutu: 1, neden: 'Moleküller var; düşük erime noktası, yumuşak, yalıtkan beklenir.' },
      { ad: 'demir', info: 'Fe katyonları ve elektron denizi', html: 'demir', kutu: 3, neden: 'Katyonlar ve elektron denizi var; iletir.' },
      { ad: 'katı iyot', info: 'I_{2} molekülleri', html: 'katı iyot (I<sub>2</sub>)', kutu: 1, neden: 'I<sub>2</sub> molekülleri var; düşük erime noktası beklenir.', speak: 'I iki molekülleri var; düşük erime noktası beklenir.' },
      { ad: 'magnezyum oksit', info: 'MgO: Mg^{2+} ve O^{2−} iyonları', html: 'magnezyum oksit (MgO)', kutu: 0, neden: 'Katyon ve anyon var; yalıtkan, yüksek erime noktalı beklenir.' },
      { ad: 'çinko', info: 'Zn katyonları ve elektron denizi', html: 'çinko', kutu: 3, neden: 'Katyonlar ve elektron denizi var; iletir.' },
      { ad: 'elmas', info: 'kovalent bağlı karbon atomları', html: 'elmas', kutu: 2, neden: 'Kovalent bağlı atomlar; çok yüksek erime noktalı, çok sert.' },
    ];
    KART.forEach((k) => { k.ipucu = 'Tanecik bilgisine bak: iyon, molekül, kovalent bağlı atom, katyon ve elektron denizi.'; });
    const BX = [15, 261, 507, 753];
    const st = siniflaTahtasi(c, svg, {
      kutular: ['iyonik katı', 'moleküler katı', 'kovalent katı', 'metalik katı'].map((b, i) => ({ x: BX[i], y: 205, w: 232, h: 340, baslik: b, kol: 1, ust: 56, dy: 50, punto: 24 })),
      chipPunto: 22,
      kartCiz(k, g) {
        kutu(c, g, 240, 28, 520, 150, { rx: 18 });
        const ad = duz(c, g, 500, 86, k.ad, 36);
        duz(c, g, 500, 138, k.info, 24, { kalin: 500, math: true, renk: RENK.soluk });
        return ad;
      },
    });
    gizle(st.kutularEl.map((e) => e.g));

    await par(c.say('Tanecikleri bilirsen grubunu, grubundan da niteliklerini kestirirsin.'), belir(c, st.kutularEl.map((e) => e.g), 600));
    await sinifla(c, {
      tag: 'Dene', kutular: ['İyonik katı', 'Moleküler katı', 'Kovalent katı', 'Metalik katı'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> hangi gruptadır?`,
      sec: (i, k) => { c.clearSay(); return st.sec(i, k); },
      yerlestir: async (i, k) => { await par(st.yerlestir(i, k), c.say(k.neden, k.speak ? { speak: k.speak } : {})); },
    });
  }

  Ders.start({
    id: 'cesitlilik-h2', kicker: 'Konu H · Katılar', title: 'Katının özelliğini etkileşim belirler', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Katının özelliğini etkileşim belirler',
      hook: 'Buz 0 °C\'ta erir, sofra tuzu 801 °C\'ta; ikisi de kristal katı. Fark nereden gelir?',
      button: 'Derse başla ›',
    },
    goals: ['Kristal katıları iyonik, moleküler, kovalent ve metalik olarak dört gruba ayırır.', 'Ölçümlerden her grubun erime noktası, iletkenlik ve sertlik örüntüsünü çıkarır.', 'Metalik katılarda bağ kuvveti ile erime noktasının ilişkisini söyler.', 'Çıkarımlarını bilim insanlarının genellemesiyle karşılaştırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kristal düzeni ve hidrojen bağını hatırla.', run: hatirla },
      { title: 'İyonik ve moleküler katı', goal: 'İlk iki katı grubunu tanecik türüne göre tanı.', run: ilkIki },
      { title: 'Kovalent ve metalik katı', goal: 'Öteki iki grubu tanı ve dört türü bir tabloda topla.', run: ikiGrup },
      { title: 'Erime noktası', goal: 'On bir katının erime noktasını türlere göre karşılaştır.', run: erime },
      { title: 'Metalik katıların erime noktası', goal: 'Bağ kuvvetinin metalik katıda erime noktasını nasıl belirlediğini gör.', run: metalErime },
      { title: 'Elektrik iletkenliği', goal: 'Hangi katıların elektriği ilettiğini türlere göre bul.', run: iletkenlik },
      { title: 'Sertlik', goal: 'Sertliğin türlere göre nasıl dağıldığını gör.', run: sertlik },
      { title: 'Her tür için genelleme', goal: 'Ölçümlerden her tür için genelleme çıkar.', run: genelleme },
      { title: 'Bilim insanlarının genellemesiyle karşılaştır', goal: 'Çıkarımlarını bilim insanlarınınkiyle karşılaştır.', run: bilimInsanlari },
      { title: 'Yeni katılarda dene', goal: 'Tanecik bilgisinden katının grubunu ve niteliklerini kestir.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kovalent katılar genellikle yalıtkandır. Hangi katı bu genellemenin dışında kalır?',
        options: ['Elmas', 'Grafit', 'Kuvars'], answer: 1,
        why: ['Elmas elektriği iletmez; genellemeye uyar.', 'Grafit kovalent katıdır ama elektriği iletir; genellemenin dışında kalır.', 'Kuvars elektriği iletmez; genellemeye uyar.'], scene: 5 },
      { q: 'Buz ve sofra tuzu iki kristal katıdır; buz 0 °C\'ta, sofra tuzu 801 °C\'ta erir. Hangisi doğrudur?',
        options: ['İkisinin erime noktası da yüksektir çünkü ikisi kristaldir', 'Erime noktası düşük olan katı amorftur', 'Kristal olmak erime noktasını belirlemez; tanecikleri tutan etkileşim belirler'], answer: 2,
        why: ['Buzun erime noktası düşüktür; kristal olmak erime noktasını yüksek yapmaz.', 'Buz da kristal katıdır; erime noktası düşük olsa da tanecikleri düzenlidir.', 'İkisi de kristaldir; erime noktalarını taneciklerini tutan etkileşimin türü ayırır.'], scene: 3 },
      { q: 'Bir X katısının erime noktası çok düşüktür; yumuşaktır ve elektriği iletmez. X hangi gruptadır?',
        options: ['İyonik katı', 'Moleküler katı', 'Metalik katı'], answer: 1,
        why: ['İyonik katıların erime noktası yüksektir.', 'Düşük erime noktası, yumuşaklık ve yalıtkanlık moleküler katıların örüntüsüdür.', 'Metalik katılar elektriği iletir.'], scene: 7 },
      { q: 'Bir Y katısı elektriği iletmez, çok sert ve çok yüksek sıcaklıkta erir. Y hangi gruptadır?',
        options: ['Moleküler katı', 'Metalik katı', 'Kovalent katı'], answer: 2,
        why: ['Moleküler katılar düşük sıcaklıkta erir ve yumuşaktır.', 'Metalik katılar elektriği iletir.', 'Çok sert, yalıtkan ve çok yüksek erime noktalı olan kovalent katıdır.'], scene: 7 },
      { q: 'Potasyumun bir, kalsiyumun iki valans elektronu vardır; ikisi de metalik katıdır. Hangisinin erime noktasının yüksek olması beklenir?',
        options: ['Potasyum; iyon yükü küçük', 'Kalsiyum; iyon yükü ve serbest elektron sayısı büyük, bağ kuvvetli', 'İkisinin erime noktası eşittir'], answer: 1,
        why: ['İyon yükü küçük olan metalde bağ daha zayıftır; erimesi daha kolaydır.', 'Yük ve serbest elektron sayısı büyüdükçe metalik bağ kuvvetlenir; erime noktası yükselir.', 'İyon yükleri ve serbest elektron sayıları farklıdır; erime noktaları da farklıdır.'], scene: 4 },
    ],
    summary: [
      'Kristal katılar iyonik, moleküler, kovalent ve metalik olmak üzere dört gruba ayrılır.',
      'Her grubun erime noktası, iletkenliği ve sertliği ayrı bir örüntü gösterir.',
      'Metalik bağ kuvvetlendikçe erime noktası yükselir.',
      '<b>Katının niteliklerini, taneciklerini tutan etkileşimin türü belirler.</b>',
    ],
    nextLesson: { href: 'h3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
