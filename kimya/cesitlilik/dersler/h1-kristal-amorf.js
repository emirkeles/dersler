/* H1 — Kristal katı, amorf katı
   Katılar taneciklerinin dizilişine göre kristal ve amorf olarak ikiye ayrılır: kristal katıda tanecikler yinelenen düzenli bir yapıda
   dizilir ve belirli bir erime noktası vardır; amorf katıda tanecikler düzensizdir ve belirli bir erime noktası yoktur.
   Senaryo: plan/kimya/cesitlilik/senaryolar/H-katilar.md ("H1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Çizimler şematiktir: yüzeysel kesit, tanecik boyları oranlı değildir; düzen soluk hizalama çizgileriyle gösterilir.
   Sahne 2'deki yedi kutu resim yer tutucusudur (yalın vektör simge); resim üretilince yerine geçer. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, yuk, sinifla } = window.KIT;
  const { molekul, katiCizimi, siniflaTahtasi, yedi, ingotCizimi, termometre, yukEtiket, mini } = window.KIT_H;

  const vurguKutu = (kutular, idx, a) => idx.forEach((i) => { kutular[i].querySelector('rect').style.stroke = a ? RENK.vurgu : RENK.kenarlik; });

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const su = c.S('g', {}, svg), tuz = c.S('g', {}, svg);
    molekul(c, su, 'H2O', 250, 250, 1.5);
    yazi(c, su, 250, 410, 'H_{2}O', { size: 40, math: true });
    [0, 1, 2, 3].forEach((i) => yuk(c, tuz, [380 + i * 80, 250], i % 2 ? 'eksi' : 'arti', i % 2 ? 31 : 26));
    yukEtiket(c, tuz, 420, 410, 'arti', 'Na^{+}', { r: 14, size: 30 }); yukEtiket(c, tuz, 580, 410, 'eksi', 'Cl^{−}', { r: 14, size: 30 });
    gizle(su, tuz);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, su, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Yapısında O–H bağı olan moleküller arasında hangi etkileşim kurulabilir?',
      options: ['İyon-dipol', 'Hidrojen bağı', 'Metalik bağ'], answer: 1,
      hints: ['F–H, O–H ya da N–H bağı olan moleküller hidrojen bağı kurabilir.', '', 'F–H, O–H ya da N–H bağı olan moleküller hidrojen bağı kurabilir.'],
      right: 'Evet. O–H bağı olan moleküller hidrojen bağı kurabilir.',
    });
    c.clearSay();
    await belir(c, su, 400, 0);
    await belir(c, tuz, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Sofra tuzunu bir arada tutan çekim hangi tanecikler arasındadır?',
      options: ['Katyonlar ile anyonlar', 'Atomlar ile ortak elektronlar', 'Katyonlar ile elektron denizi'], answer: 0,
      hints: ['', 'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.', 'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.'],
      right: 'Evet. İyonik bağ, katyon ile anyonun çekimidir.',
    });
    await c.wait(400);
    await c.say('Bugün bu taneciklerin katıda nasıl dizildiğine bakacağız.', { speak: '[curious] Bugün bu taneciklerin katıda nasıl dizildiğine bakacağız.' });
  }

  /* ---- 2. Yedi katı, yedi görünüm ---- */
  async function yediKati(c) {
    const svg = c.svg(1000, 562);
    const Y = yedi(c, svg), K = Y.kutular;
    gizle(K);
    const bag = cizgi(c, svg, [74, 248], [410, 330], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    const M = katiCizimi(c, svg, 'tuz', 500, 400, 112, { sap: true });
    gizle(bag, M.g);

    await par(c.say('Sofra tuzu, çelik kaşık ve bilgisayar ekranı birer katıdır.'), belir(c, K, 600), (async () => { vurguKutu(K, [0, 1, 2], true); })());
    vurguKutu(K, [0, 1, 2], false); vurguKutu(K, [3, 4, 5, 6], true);
    await c.say('Kurşun kalem ucu, elmas, kar tanesi ve cam da öyle.');
    vurguKutu(K, [3, 4, 5, 6], false);
    await c.say('Hepsi katı; görünümleri ve özellikleri yine de çok farklı.');
    vurguKutu(K, [0], true);
    await par(c.say('Katıda tanecikler birbirini çok güçlü çeker.'), belir(c, K, 450, 0.3), belir(c, [bag, M.g], 600));
    await par(c.say('Tanecikler yerlerinden ayrılmaz, yalnızca titreşir.'), M.canlan(5200));
    await c.say('Katıların farkını taneciklerin dizilişinde arayalım.');
  }

  /* ---- 3. Düzenli ve düzensiz dizilim ---- */
  async function dizilim(c) {
    const svg = c.svg(1000, 562);
    const A = katiCizimi(c, svg, 'tuz', 250, 235, 150), B = katiCizimi(c, svg, 'cam', 750, 235, 150);
    const lA = c.S('g', {}, svg), lB = c.S('g', {}, svg);
    yukEtiket(c, lA, 190, 440, 'arti', 'Na^{+}', { r: 14, size: 28 }); yukEtiket(c, lA, 320, 440, 'eksi', 'Cl^{−}', { r: 14, size: 28 });
    yukEtiket(c, lB, 700, 440, '#9c9c9c', 'Si', { r: 14, size: 28 }); yukEtiket(c, lB, 820, 440, '#d9d9d9', 'O', { r: 12, size: 28 });
    const tA = yazi(c, svg, 250, 512, 'kristal katı', { size: 34, kalin: 700 }), tB = yazi(c, svg, 750, 512, 'amorf katı', { size: 34, kalin: 700 });
    gizle(A.g, B.g, lA, lB, tA, tB);

    await par(c.say('Büyüteçle tanecik düzeyine inelim: önce sofra tuzu.'), belir(c, [A.g, lA], 600));
    await par(c.say('Sodyum ve klorür iyonları düzenli bir desende dizilir.'), A.canlan(3600));
    await par(c.say('Aynı desen katının her yerinde yinelenir.'), belir(c, A.cizgiler, 900));
    await par(c.say('Şimdi cam: silisyum ve oksijen atomları desen kurmaz.'), belir(c, [B.g, lB], 600).then(() => B.canlan(2600)));
    await c.say('İkisi de katıdır; yalnızca dizilişleri farklıdır.', { speak: '[short pause] İkisi de katıdır; yalnızca dizilişleri farklıdır.' });
    await par(c.say('Tanecikleri yinelenen düzenli yapıda dizilen katıya kristal katı denir.'), belir(c, tA, 600));
    await par(c.say('Düzensiz dizilen katıya amorf katı denir.'), belir(c, tB, 600));
    await par(c.say('Sofra tuzu kristal katıdır, cam amorf katıdır.'), A.canlan(2400), B.canlan(2400));
  }

  /* ---- 4. Belirli erime noktası ---- */
  async function erime(c) {
    const svg = c.svg(1000, 562);
    cizgi(c, svg, [500, 40], [500, 330], RENK.kenarlik, 2);
    const hK = yazi(c, svg, 250, 52, 'kristal katı', { size: 32, kalin: 700 }), hA = yazi(c, svg, 750, 52, 'amorf katı', { size: 32, kalin: 700 });
    const satir = (ad, kati, y, x0, d) => {
      const g = c.S('g', {}, svg), ciz = katiCizimi(c, g, kati, x0 + 56, y, 50, { cizgi: kati !== 'cam' });
      yazi(c, g, x0 + 130, y - 6, ad, { hiza: 'start', size: 30, kalin: 700 });
      gizle(g);
      return { g, ciz };
    };
    const buz = satir('buz', 'buz', 165, 24), tuz = satir('sofra tuzu', 'tuz', 285, 24), cam = satir('cam', 'cam', 165, 524);
    const dK = [yazi(c, svg, 154, 205, '0 °C', { hiza: 'start', size: 32, kalin: 700, renk: RENK.vurgu }), yazi(c, svg, 154, 325, '801 °C', { hiza: 'start', size: 32, kalin: 700, renk: RENK.vurgu })];
    const tK = [termometre(c, svg, 440, 185, 0.22), termometre(c, svg, 440, 305, 0.8)];
    const yok = yazi(c, svg, 654, 205, 'belirli erime noktası yok', { hiza: 'start', size: 23, kalin: 700, renk: RENK.vurgu });
    const tA = termometre(c, svg, 962, 185, null);
    const ornek = [['lastik', 654, 380], ['plastik', 820, 380], ['mum', 654, 430], ['tereyağı', 820, 430]].map(([t, x, y]) => yazi(c, svg, x, y, t, { hiza: 'start', size: 26, kalin: 600 }));
    gizle(hK, hA, dK, tK, yok, tA, ornek);

    await par(c.say('Kristal katının tanecikleri hep aynı düzendedir.'), belir(c, [hK, buz.g, tuz.g], 600));
    await par(c.say('Bu yüzden kristal katının belirli bir erime noktası vardır.'), belir(c, tK, 600));
    await par(c.say('Buzun erime noktası 0 °C, sofra tuzunun 801 °C\'tır.', { speak: 'Buzun erime noktası sıfır derece, sofra tuzunun sekiz yüz bir derecedir.' }), belir(c, dK, 600));
    await par(c.say('Amorf katının tanecikleri düzensizdir.'), belir(c, [hA, cam.g], 600));
    await par(c.say('Bu yüzden amorf katının belirli bir erime noktası yoktur.'), belir(c, [tA, yok], 600));
    await par(c.say('Cam, lastik, plastik, mum ve tereyağı amorf katıdır.'), belir(c, ornek, 600));
    await c.say('Günlük hayatta gördüğümüz katıların çoğu kristaldir.');
    await c.choice({
      tag: 'Sıra sende', q: 'Bir katının belirli bir erime noktası var. Tanecikleri hakkında ne söylenir?',
      options: ['Düzensiz dizilmişlerdir', 'Yinelenen düzenli yapıda dizilmişlerdir', 'Birbirini çekmezler'], answer: 1,
      hints: ['Düzensiz dizilen katıda belirli erime noktası yoktu.', '', 'Belirli erime noktası kristal katıda vardı.'],
      right: 'Evet. Belirli erime noktası düzenli dizilen kristal katıda vardır.',
    });
    await par(c.say('Belirli erime noktası olan katının tanecikleri düzenlidir.'), belir(c, [hA, cam.g, tA, yok, ...ornek], 500, 0.3));
    hK.style.fill = RENK.vurgu;
    c.note('<b>Belirli erime noktası yalnızca kristal katıda vardır.</b> Örnek: buz 0 °C.', 'Belirli erime noktası', 'belirli-erime');
  }

  /* ---- 5. Çizimden sınıflandır ---- */
  async function cizimdenSiniflandir(c) {
    const svg = c.svg(1000, 562);
    const YS = [135, 245, 355, 465];
    const baslik = c.S('g', {}, svg);
    yazi(c, baslik, 40, 48, 'katı', { hiza: 'start', size: 24, kalin: 500, renk: RENK.soluk });
    yazi(c, baslik, 470, 48, 'çizim', { size: 24, kalin: 500, renk: RENK.soluk });
    yazi(c, baslik, 790, 48, 'tür', { hiza: 'start', size: 24, kalin: 500, renk: RENK.soluk });
    cizgi(c, baslik, [30, 66], [970, 66], RENK.kenarlik, 1.5);
    const satir = (ad, kati, i, duzen, tur) => {
      const y = YS[i], g = c.S('g', {}, svg);
      yazi(c, g, 40, y + 9, ad, { hiza: 'start', size: 28, kalin: 600 });
      const ciz = katiCizimi(c, g, kati, 470, y, 46, { cizgi: kati !== 'cam' });
      const dz = yazi(c, g, 545, y + 7, duzen, { hiza: 'start', size: 20, kalin: 500, renk: RENK.soluk });
      const tr = yazi(c, g, 790, y + 10, tur, { hiza: 'start', size: 30, kalin: 700, renk: tur === '?' ? RENK.vurgu : RENK.yazi });
      cizgi(c, g, [30, y + 54], [970, y + 54], RENK.kenarlik, 1);
      gizle(g);
      return { g, dz, tr };
    };
    const s1 = satir('sofra tuzu', 'tuz', 0, 'düzenli', 'kristal'), s2 = satir('cam', 'cam', 1, 'düzensiz', 'amorf');
    const s3 = satir('elmas', 'elmas', 2, '', '?'), s4 = satir('kurşun kalem ucu', 'grafit', 3, '', '?');
    gizle(baslik); gizle(s3.dz);
    s3.dz.textContent = 'düzenli'; s4.dz.textContent = 'düzenli';

    await par(c.say('Bir katının türünü, çizimdeki dizilişe bakarak bulursun.'), belir(c, [baslik, s1.g, s2.g], 700));
    await c.say('Desen yinelenirse kristal, yinelenmezse amorf katıdır.');
    await par(c.say('Elmasta karbon atomları yinelenen bir desende dizilir.'), belir(c, s3.g, 600).then(() => belir(c, s3.dz, 400)));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Elmas hangi tür katıdır?',
      options: ['Amorf katı', 'Kristal katı', 'Kristal de amorf da değil'], answer: 1,
      hints: ['Atomlar yinelenen bir desende.', '', 'Desen yinelenen katı kristaldir.'],
      right: 'Evet. Desen yinelendiği için elmas kristal katıdır.',
    });
    s3.tr.textContent = 'kristal'; s3.tr.style.fill = RENK.yazi;
    await c.say('Desen yinelendiği için elmas kristal katıdır.');
    c.clearSay();
    await belir(c, s4.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Kurşun kalem ucundaki grafitte atomlar yinelenen bir desende dizilir. Grafit için hangisi doğrudur?',
      options: ['Amorf katıdır; belirli erime noktası yoktur', 'Amorf katıdır; belirli erime noktası vardır', 'Kristal katıdır; belirli erime noktası vardır'], answer: 2,
      hints: ['Düzen yinelenirse kristal.', 'Amorf katıda belirli erime noktası yoktu.', ''],
      right: 'Evet. Düzen yinelendiği için grafit kristaldir; belirli erime noktası vardır.',
    });
    s4.tr.textContent = 'kristal'; s4.tr.style.fill = RENK.yazi;
    await c.say('Elmas ve kurşun kalem ucu da kristal katıdır.');
    c.note('<b>Kristal düzenli, amorf düzensiz dizilir.</b> Örnek: tuz kristal, cam amorf.', 'Kristal ve amorf', 'kristal-amorf');
  }

  /* ---- 6. Çizimlere bak, ayır ---- */
  async function ayir(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { ad: 'kar tanesi', kati: 'buz', kutu: 0, neden: 'Su molekülleri yinelenen düzende; kar tanesi kristaldir.' },
      { ad: 'kuvars', kati: 'kuvars', kutu: 0, neden: 'Camdakiyle aynı atomlar, ama yinelenen düzende; kuvars kristaldir.' },
      { ad: 'mum', kati: null, kutu: 1, neden: 'Mum amorf katıdır; tanecikleri düzensizdir.' },
      { ad: 'sodyum', kati: 'sodyum', kutu: 0, neden: 'Katyonlar düzenli diziliyor; sodyum kristaldir.' },
      { ad: 'lastik', kati: null, kutu: 1, neden: 'Lastik amorf katıdır; belirli erime noktası yoktur.' },
      { ad: 'kuru buz', kati: 'kurubuz', kutu: 0, neden: 'Moleküller yinelenen düzende; kuru buz kristaldir.' },
      { ad: 'plastik', kati: null, kutu: 1, neden: 'Plastik amorf katıdır; tanecikleri düzensizdir.' },
    ];
    KART.forEach((k) => { k.ipucu = k.kati ? 'Çizimde desen yinelenir mi?' : 'Cam, lastik, plastik, mum ve tereyağı amorf katıydı.'; });
    const st = siniflaTahtasi(c, svg, {
      kutular: [{ x: 30, y: 350, w: 450, h: 190, baslik: 'kristal katı', kol: 2, ust: 56, dy: 50, punto: 26 }, { x: 520, y: 350, w: 450, h: 190, baslik: 'amorf katı', kol: 2, ust: 56, dy: 50, punto: 26 }],
      chipPunto: 26,
      kartCiz(k, g) {
        if (k.kati) {
          katiCizimi(c, g, k.kati, 500, 170, 105, { cizgi: true });
          if (k.kati === 'kuvars') { yukEtiket(c, g, 690, 140, '#9c9c9c', 'Si', { r: 14, size: 26 }); yukEtiket(c, g, 690, 190, '#d9d9d9', 'O', { r: 12, size: 26 }); }
          return yazi(c, g, 500, 320, k.ad, { size: 30, kalin: 700 });
        }
        kutu(c, g, 320, 90, 360, 170, { rx: 18 });
        return yazi(c, g, 500, 192, k.ad, { size: 44, kalin: 700 });
      },
    });
    gizle(st.kutularEl.map((e) => e.g));

    await par(c.say('Çizime bak: desen yinelenir mi?'), belir(c, st.kutularEl.map((e) => e.g), 600));
    await sinifla(c, {
      tag: 'Dene', kutular: ['Kristal katı', 'Amorf katı'], kartlar: KART,
      soru: (k) => `<b>${k.ad}</b> hangi tür katıdır?`,
      sec: (i, k) => { c.clearSay(); return st.sec(i, k); },
      yerlestir: async (i, k) => { await par(st.yerlestir(i, k), c.say(k.neden)); },
    });
    await c.say('Çizimi olan dört katı da yinelenen düzende; hepsi kristaldir.');
    await c.say('Kuvars ile cam aynı atomlardan oluşur; fark yalnızca dizilişte.');
  }

  /* ---- 7. Kristal silisyum ingot külçesi ---- */
  async function ingot(c) {
    const svg = c.svg(1000, 562);
    const ing = ingotCizimi(c, svg, 70, 230);
    const bas = yazi(c, svg, 500, 72, 'kristal silisyum ingot külçesi', { size: 34, kalin: 700 });
    const yil = yazi(c, svg, 260, 410, '2022', { size: 46, kalin: 700, renk: RENK.vurgu });
    const ilk = yazi(c, svg, 260, 456, 'ilk endüstriyel boyut', { size: 24, kalin: 500, renk: RENK.soluk });
    gizle(ing.kulce, ing.panel, bas, yil, ilk);

    await par(c.say('Güneş pillerinde en yaygın kullanılan madde kristal silisyumdur.'), belir(c, [ing.panel, bas], 700));
    await c.say('Güneş hücresi pazarının yüzde 85\'inden fazlası kristal silisyumdandır.', { speak: 'Güneş hücresi pazarının yüzde seksen beşinden fazlası kristal silisyumdandır.' });
    await par(c.say('2022\'de Türkiye\'nin ilk endüstriyel boyutta kristal silisyum ingot külçesi üretildi.', { speak: 'İki bin yirmi ikide Türkiye\'nin ilk endüstriyel boyutta kristal silisyum ingot külçesi üretildi.' }),
      belir(c, [ing.kulce, yil], 700).then(() => belir(c, ilk, 500)));
    await c.say('Niğde Ömer Halisdemir Üniversitesi ile KOP Bölge Kalkınma İdaresi üretti.', { speak: 'Niğde Ömer Halisdemir Üniversitesi ile ka o pe Bölge Kalkınma İdaresi üretti.' });
    await c.say('Projeyi değerli kılan, külçenin kristal özellikleridir.');
    await c.say('Yerli ve millî projeler ülkemizin kalkınmasında büyük önem taşır.');
  }

  Ders.start({
    id: 'cesitlilik-h1', kicker: 'Konu H · Katılar', title: 'Kristal katı, amorf katı', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Kristal katı, amorf katı',
      hook: 'Kar tanesi, elmas ve cam birer katı. Tanecikleri aynı biçimde mi dizilir?',
      button: 'Derse başla ›',
    },
    goals: ['Katıyı taneciklerinin dizilişine göre kristal ya da amorf olarak ayırır.', 'Belirli erime noktasının kristal katıda bulunduğunu söyler.', 'Bir çizime bakarak katının kristal mi amorf mu olduğunu bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Hidrojen bağını ve iyonik bağı hatırla.', run: hatirla },
      { title: 'Yedi katı, yedi görünüm', goal: 'Katıların taneciklerini büyüteçle gör.', run: yediKati },
      { title: 'Düzenli ve düzensiz dizilim', goal: 'Kristal ve amorf katının tanecik düzenini karşılaştır.', run: dizilim },
      { title: 'Belirli erime noktası', goal: 'Erime noktasının dizilişle ilişkisini gör.', run: erime },
      { title: 'Çizimden sınıflandır', goal: 'Çizime bakarak katının türünü bul.', run: cizimdenSiniflandir },
      { title: 'Çizimlere bak, ayır', goal: 'Yedi katıyı kristal ve amorf olarak ayır.', run: ayir },
      { title: 'Kristal silisyum ingot külçesi', goal: 'Kristal silisyumun Türkiye\'deki yerini öğren.', run: ingot },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kristal katı hangi özelliğiyle tanınır?',
        options: ['Tanecikleri gelişigüzel dizilir', 'Tanecikleri yinelenen düzenli bir yapıda dizilir', 'Tanecikleri hiç titreşmez'], answer: 1,
        why: ['Gelişigüzel dizilim amorf katının özelliğidir.', 'Kristal katıda aynı düzenli desen katının her yerinde yinelenir.', 'Katıda tanecikler yerinde titreşir; kristal olmak bunu değiştirmez.'], scene: 2 },
      { q: 'Bir katının belirli bir erime noktası yoktur. Bu katı için hangisi doğrudur?',
        options: ['Amorf katıdır; tanecikleri düzensizdir', 'Kristal katıdır; tanecikleri düzenlidir', 'Katı hâlde bulunamaz'], answer: 0,
        why: ['Belirli erime noktası olmayan katı amorftur; tanecikleri düzensiz dizilir.', 'Kristal katının belirli bir erime noktası vardır.', 'Cam gibi amorf katılar katı hâlde bulunur; yalnızca belirli erime noktaları yoktur.'], scene: 3 },
      { q: 'Çizimde potasyum iyodürün K<sup>+</sup> ve I<sup>−</sup> iyonları yinelenen düzende dizilmiş. Potasyum iyodür için hangisi doğrudur?<br>' + mini('ki'),
        options: ['Amorf katıdır; belirli erime noktası vardır', 'Amorf katıdır; belirli erime noktası yoktur', 'Kristal katıdır; belirli erime noktası vardır'], answer: 2,
        why: ['Amorf katının belirli erime noktası yoktur.', 'Düzen yinelendiği için katı amorf değildir.', 'Düzen yinelendiği için kristal katıdır; kristal katının belirli erime noktası vardır.'], scene: 2 },
      { q: 'Tereyağı amorf bir katıdır. Hangisi doğrudur?',
        options: ['Tanecikleri düzenlidir; belirli erime noktası vardır', 'Tanecikleri düzensizdir; belirli erime noktası vardır', 'Tanecikleri düzensizdir; belirli erime noktası yoktur'], answer: 2,
        why: ['Düzenli tanecikler kristal katının özelliğidir.', 'Düzensiz dizilen katının belirli erime noktası olmaz.', 'Amorf katıda tanecikler düzensizdir ve belirli bir erime noktası yoktur.'], scene: 3 },
      { q: 'Çizimde kuvars ve cam yan yana; ikisinde de silisyum ve oksijen atomları var. Kuvars kristal, cam amorf katıdır. Aradaki fark nereden gelir?<br>' + mini('kuvars') + ' ' + mini('cam'),
        options: ['Atomların dizilişinden', 'Atomların cinsinden', 'Atomların sayısından'], answer: 0,
        why: ['Kuvarsta atomlar yinelenen düzende, camda düzensiz dizilir.', 'İkisinde de aynı iki cins atom var.', 'Fark, atomların sayısında değil dizilişindedir.'], scene: 5 },
    ],
    summary: [
      'Kristal katıda tanecikler yinelenen düzende dizilir; belirli erime noktası vardır.',
      'Amorf katıda tanecikler düzensizdir; belirli erime noktası yoktur.',
      'Cam, lastik, plastik, mum ve tereyağı amorf katıdır.',
      '<b>Kristalde tanecikler düzenli, amorf katıda düzensiz dizilir.</b>',
    ],
    nextLesson: { href: 'h2-katinin-ozelligi.html', label: 'Sonraki ders ›' },
  });
})();
