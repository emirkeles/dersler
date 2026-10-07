/* A1 — Fizik, öteki bilimlerle bağından tanınır (FİZ.9.1.1)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/A-fizik-bilimi.md
   Kartlar ve tanım ders kitabından: s. 17 (bilgi kartları), s. 19 (tanım), s. 20 (günlük hayat örnekleri). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, par, kart, etiket, yer, sirayla, yol, daire, dik } = window.KIT;
  const { ease } = Ders;

  /* ---- zihin haritası: ortada fizik, çevresinde beş disiplin; bağın üstünde ortak konu ---- */
  const M = [500, 345];
  const DUGUM = {
    muzik: { ad: 'Müzik', x: 150, y: 230, konu: 'dalgalar' },
    astro: { ad: 'Astronomi ve uzay bilimleri', x: 835, y: 230, konu: 'hareket' },
    biyo: { ad: 'Biyoloji', x: 190, y: 470, konu: 'ışık' },
    kimya: { ad: 'Kimya', x: 810, y: 470, konu: 'hareket ve enerji' },
    mat: { ad: 'Matematik', x: 500, y: 522, konu: 'grafik, hesap' },
  };
  function harita(c, svg, acik = []) {
    const g = c.S('g', {}, svg), h = {};
    Object.entries(DUGUM).forEach(([id, d]) => {
      const bag = cizgi(c, g, M[0], M[1], d.x, d.y, RENK.ince, 3);
      const dx = d.x - M[0], dy = d.y - M[1], kx = M[0] + dx * 0.52, ky = M[1] + dy * 0.52;
      let konu;
      if (Math.abs(dx) < 20) konu = yazi(c, g, kx + 14, ky + 6, d.konu, { size: 18, renk: RENK.fizik, hiza: 'start' });
      else {
        const a = (Math.atan2(dy, dx) * 180) / Math.PI, egim = a > 90 ? a - 180 : a < -90 ? a + 180 : a;
        konu = yazi(c, g, kx, ky - 10, d.konu, { size: 18, renk: RENK.fizik });
        konu.setAttribute('transform', `rotate(${egim} ${kx} ${ky})`);
      }
      const et = etiket(c, g, d.x, d.y, d.ad, { renk: RENK.disiplin, size: 19 });
      h[id] = { bag, g: et.g, konu, d };
      if (!acik.includes(id)) gizle(bag, et.g);
      gizle(konu);
    });
    daire(c, g, M[0], M[1], 56, { fill: RENK.yuzey, stroke: RENK.fizik, 'stroke-width': 3 });
    yazi(c, g, M[0], M[1] + 9, 'Fizik', { size: 26, renk: RENK.fizik });
    return h;
  }
  const ac = (c, d, konu) => par(belir(c, [d.bag, d.g], 400), konu ? belir(c, d.konu, 400) : null);

  /* ---- tel sesi ----
     Çekilen telin sesi tarayıcıda üretilir (Karplus–Strong); ses dosyası yok. Örnek bir kez hesaplanır:
     y çalınacak dalga, zarf onun 20 ms'lik adımlarla ses yüksekliği (0–1). Teldeki salınımın genliği aynı
     zarftan okunur; böylece tel durulurken ses de söner. */
  const NOTA = 196, ORNEK_HZ = 44100;   // sol teli
  let ornek = null, sesCtx = null, sesTampon = null;
  function telOrnegi() {
    if (ornek) return ornek;
    const n = ORNEK_HZ * 3, N = Math.round(ORNEK_HZ / NOTA), y = new Float32Array(n);
    let tohum = 12345, onceki = 0;
    const rastgele = () => { tohum = (tohum * 1664525 + 1013904223) >>> 0; return tohum / 2147483648 - 1; };
    for (let i = 0; i < N; i++) { onceki = 0.5 * (rastgele() + onceki); y[i] = onceki; }   // telin çekildiği an
    for (let i = N; i < n; i++) y[i] = 0.996 * 0.5 * (y[i - N] + y[i - N + 1]);            // tel boyunca gidip gelen dalga
    let tepe = 0; for (let i = 0; i < n; i++) tepe = Math.max(tepe, Math.abs(y[i]));
    const bit = ORNEK_HZ * 0.08;
    for (let i = 0; i < n; i++) y[i] = (y[i] / tepe) * 0.9 * Math.min(1, (n - i) / bit);
    const P = ORNEK_HZ / 50, z = [];
    for (let i = 0; i + P <= n; i += P) { let t = 0; for (let k = i; k < i + P; k++) t += y[k] * y[k]; z.push(Math.sqrt(t / P)); }
    const z0 = Math.max(...z);
    ornek = { y, zarf: z.map((v) => v / z0) };
    return ornek;
  }
  /* ms anındaki genlik (0–1); görünür kalsın diye biraz yumuşatılır. */
  const genlik = (ms) => { const z = telOrnegi().zarf; return Math.pow(z[Math.min(z.length - 1, Math.floor(ms / 20))], 0.6); };
  /* Teli çalar. `tut` her karede çağrılır: ses yalnızca animasyon ilerlerken duyulur, ders duraklatılınca ya da
     sahne değişince kendiliğinden söner. "Ses kapalı" iken hiç çalmaz. `gerginlik(n)` sesi n yarım ses inceltir. */
  function cal(c, siddet = 0.7) {
    const bos = { tut() {}, gerginlik() {}, bitir() {} };
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!c.state.voice || !AC) return bos;
    try {
      if (!sesCtx) { sesCtx = new AC(); sesTampon = sesCtx.createBuffer(1, telOrnegi().y.length, ORNEK_HZ); sesTampon.getChannelData(0).set(telOrnegi().y); }
      if (sesCtx.state === 'suspended') sesCtx.resume().catch(() => {});
      const kaynak = sesCtx.createBufferSource(), kazanc = sesCtx.createGain(), g = kazanc.gain;
      kaynak.buffer = sesTampon; g.value = 0;
      kaynak.connect(kazanc); kazanc.connect(sesCtx.destination); kaynak.start();
      return {
        tut() {
          const t = sesCtx.currentTime, v = c.state.voice ? siddet : 0;
          g.cancelScheduledValues(t); g.setValueAtTime(v, t); g.setValueAtTime(v, t + 0.1); g.linearRampToValueAtTime(0, t + 0.2);
        },
        gerginlik(n) { kaynak.playbackRate.setTargetAtTime(Math.pow(2, n / 12), sesCtx.currentTime, 0.03); },
        bitir() {
          const t = sesCtx.currentTime;
          g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0, t + 0.08);
          kaynak.stop(t + 0.1);
        },
      };
    } catch (e) { return bos; }
  }

  /* ---- 1. Tel titrer ---- */
  async function telTitrer(c) {
    const svg = c.svg(1000, 562);
    const ust = c.S('g', {}, svg);
    const X0 = 200, X1 = 800, Y = 120;
    dik(c, ust, X0 - 8, Y - 34, 16, 68, { rx: 4, fill: RENK.ince }); dik(c, ust, X1 - 8, Y - 34, 16, 68, { rx: 4, fill: RENK.ince });
    const tel = yol(c, ust, '', { stroke: RENK.fizik, 'stroke-width': 4 });
    const ciz = (a) => {
      let d = '';
      for (let i = 0; i <= 40; i++) { const t = i / 40; d += (i ? 'L' : 'M') + (X0 + (X1 - X0) * t) + ' ' + (Y + a * Math.sin(Math.PI * t)); }
      tel.setAttribute('d', d);
    };
    /* Tel bir noktasından çekilir (üçgen), bırakılınca titrer. */
    const cek = (a) => tel.setAttribute('d', `M${X0} ${Y} L${X0 + (X1 - X0) * 0.3} ${Y + a} L${X1} ${Y}`);
    /* Çek, bırak: ses bırakma anında başlar; salınımın genliği sesin zarfını izler. kare(t, ses) her karede ek iş yapar. */
    const titret = async (ms, kare) => {
      await c.tween(260, (e) => cek(34 * e), ease.out);
      const ses = cal(c);
      await c.tween(ms, (_, t) => { ses.tut(); if (kare) kare(t, ses); ciz(34 * genlik(t * ms) * Math.cos(t * ms * (kare ? 0.03 + 0.03 * t : 0.03))); }, ease.linear).finally(() => ses.bitir());
      ciz(0);
    };
    ciz(0);
    await titret(2400);
    await c.say('Gitar teli titrer ve ses verir.');
    const vida = c.S('g', {}, ust);
    daire(c, vida, X1 + 36, Y, 14, { fill: RENK.ince });
    const kol = cizgi(c, vida, X1 + 36, Y, X1 + 36, Y - 24, RENK.cizgi, 5);
    gizle(vida); await belir(c, vida, 250);
    await titret(2000, (t, ses) => {   // vida döner, tel gerilir: ses incelir, tel daha sık titrer
      kol.setAttribute('transform', `rotate(${t * 270} ${X1 + 36} ${Y})`);
      ses.gerginlik(2 * t);
    });
    await c.say('Akort vidası teli gerer; tel gerildikçe ses değişir.');
    await c.say('Bu olaya iki <b>disiplin</b>, yani iki bilgi alanı bakar: müzik ve fizik.');
    await c.choice({
      tag: 'Tahmin et', q: 'Telin sesini hangisi açıklar?',
      options: ['Yalnızca müzik', 'Yalnızca fizik', 'İkisi birlikte'], answer: 2,
      hints: ['Notayı müzik adlandırır; telin neden ses verdiğini kim açıklar?', 'Sesin nota olması müziğin işi; öteki yarısı eksik kaldı.', ''],
      right: 'Evet. Müzik sesi adlandırır, fizik nasıl oluştuğunu açıklar.',
    });
    const h = harita(c, svg);
    await par(titret(1800), ac(c, h.muzik, true));
    await c.say('Müzik, telin sesini fiziğin <b>dalgalar</b> konusuyla açıklar.');
    await c.say('Fiziğin buna benzer başka bağları da var.');
  }

  /* ---- 2. Kart kimin? ---- */
  const KARTLAR = [
    { id: 'astro', metin: 'Gezegenleri teleskopla gözlemler; yörüngelerini hareket konusuyla hesaplar.', ipucu: 'Gezegenlere ve yıldızlara bakan disiplin hangisi?', gerekce: 'Astronomi, gök cisimlerinin yörüngesini fiziğin hareket konusuyla hesaplar.' },
    { id: 'biyo', metin: 'Mikroskopla dokuları görüntülerken ışık konusundan yararlanır.', ipucu: 'Bitki ve hayvan dokularını hangi disiplin inceler?', gerekce: 'Biyoloji, mikroskopta fiziğin ışık konusundan yararlanır.' },
    { id: 'mat', metin: 'Fizik, bir aracın süratini grafikle incelerken bu disiplinden yararlanır.', ipucu: 'Grafik çizmek ve okumak hangi disiplinin dilidir?', gerekce: 'Burada yararlanan fizik: sürati matematiğin grafiğiyle inceler.' },
    { id: 'kimya', metin: 'Atomların ve moleküllerin davranışını hareket ve enerjiyle açıklar.', ipucu: 'Atomları ve molekülleri hangi disiplin inceler?', gerekce: 'Kimya, atom ve moleküllerin davranışını fiziğin hareket ve enerji konularıyla açıklar.' },
  ];
  const SECENEK = ['mat', 'kimya', 'biyo', 'astro'];
  async function kartKimin(c) {
    const svg = c.svg(1000, 562);
    const h = harita(c, svg, ['muzik']);
    h.muzik.konu.style.opacity = 1;
    await c.say('Dört bilgi kartının her biri bir disiplini anlatıyor.');
    c.say('Kart hangi disiplinin?', { noWait: true });
    let k = null;
    await sirayla(c, KARTLAR, {
      tag: 'Kart kimin?', soru: 'Bu kart hangi disiplini anlatıyor?',
      secenekler: () => SECENEK.map((id) => DUGUM[id].ad), dogru: (o) => SECENEK.indexOf(o.id),
      ipucu: (o) => o.ipucu, gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 290, 24, 420, 150, { metin: o.metin, renk: RENK.disiplin, size: 21 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => {
        const d = h[o.id];
        await c.tween(550, (e) => { yer(k.g, 290 + (d.d.x - 290 - 42) * e, 24 + (d.d.y - 24 - 15) * e, 1 - 0.8 * e); k.g.style.opacity = 1 - e; });
        k.g.remove();
        await ac(c, d, false);
      },
      bekle: 1300,
    });
    await c.say('Beş disiplinin beşi de <b>fizikle</b> bağ kuruyor.');
  }

  /* ---- 3. Bağ nerede? ---- */
  async function bagNerede(c) {
    const svg = c.svg(1000, 562);
    const h = harita(c, svg, Object.keys(DUGUM));
    await c.say('Her bağın üstünde fiziğin bir konusu yazar.');
    for (const id of ['muzik', 'biyo', 'astro', 'kimya']) { await belir(c, h[id].konu, 350); await c.wait(350); }
    await c.say('Dört disiplin fiziğin bir konusundan yararlanıyor.');
    h.mat.bag.setAttribute('stroke', RENK.fizik);
    await belir(c, h.mat.konu, 350);
    await c.choice({
      tag: 'Düşün', q: 'Matematik bağı ötekilerden nasıl farklı?',
      options: ['Fizik matematikten yararlanır', 'Matematik fizikten yararlanır', 'Aralarında bağ yoktur'], answer: 0,
      hints: ['', 'Karta dön: süratin grafiğini çizen fizikti, grafik matematiğin.', 'Sürat grafiği ikisini birbirine bağlıyor.'],
      right: 'Evet. Fizik, bağıntılarını ve yasalarını matematik diliyle yazar.',
    });
    await c.say('Fizik, yasalarını <b>matematik diliyle</b> yazar.');
  }

  /* ---- 4. Fiziğin tanımı ---- */
  async function tanim(c) {
    const svg = c.svg(1000, 562);
    const konular = ['dalgalar', 'ışık', 'hareket', 'enerji', 'grafik, hesap'];
    const xs = [130, 300, 470, 640, 840];
    const ets = konular.map((k, i) => etiket(c, svg, xs[i], 70, k, { renk: RENK.fizik, size: 20 }));
    gizle(ets.map((e) => e.g));
    for (const e of ets) await belir(c, e.g, 220);
    await c.say('Bağların üstünde yazanlar bunlardı.');
    await c.choice({
      tag: 'Düşün', q: 'Bu bağların ortak yanı ne?',
      options: ['Hepsinde bir olay, fiziğin bir konusuyla açıklanıyor', 'Hepsi yalnızca canlılarla ilgili', 'Hepsi yalnızca gökyüzüyle ilgili'], answer: 0,
      hints: ['', 'Tel, gezegen ve atom canlı değil.', 'Mikroskop ve gitar teli yeryüzünde.'],
      right: 'Evet. Olaylar farklı, açıklayan konular fiziğin.',
    });
    kutu(c, svg, 150, 150, 700, 330, { renk: RENK.fizik });
    const s1 = yazi(c, svg, 500, 222, 'Fizik bilimi', { size: 36, renk: RENK.fizik });
    const s2 = yazi(c, svg, 500, 286, 'evreni', { size: 28 });
    const s3 = yazi(c, svg, 500, 344, 'kuvvet, madde, enerji, uzay ve zaman', { size: 28, renk: RENK.fizik });
    const s4 = yazi(c, svg, 500, 400, 'ilişkileriyle inceler.', { size: 28 });
    const s5 = yazi(c, svg, 500, 448, 'Aracı: hesaplama ve gözlem', { size: 21, renk: RENK.soluk, kalin: 500 });
    gizle(s1, s2, s3, s4, s5);
    await par(belir(c, [s1, s2]), belir(c, ets.map((e) => e.g), 400, 0.4));
    await c.say('Fizik <b>evreni</b> ve evrendeki olayları açıklar.');
    await belir(c, [s3, s4]);
    await c.say('Bunu yaparken beş şeyin ilişkisine bakar.');
    await belir(c, s5);
    await c.say('Aracı da belli: hesaplama ve gözlem.');
    c.note('<b>Fizik</b>, evreni kuvvet, madde, enerji, uzay ve zaman ilişkileriyle inceler.', 'Fizik bilimi', 'fizik-tanim');
  }

  /* ---- 5. Günlük hayatta fizik ---- */
  const OLAYLAR = [
    { ad: 'gökkuşağı', hedef: 0, gerekce: 'Güneş ışığı su damlalarında kırılır ve renklerine ayrılır.',
      ciz: (c, g) => ['#ff6b6b', '#f5b04c', '#ffe066', '#3ddc97', '#6ea8ff'].forEach((r, i) => yol(c, g, `M${24 + i * 12} 132 A${86 - i * 12} ${86 - i * 12} 0 0 1 ${196 - i * 12} 132`, { stroke: r, 'stroke-width': 9, 'stroke-linecap': 'butt' })) },
    { ad: 'yokuştan inen kaykaycı', hedef: 1, gerekce: 'Yokuş aşağı inerken enerji bir türden ötekine dönüşür.',
      ciz: (c, g) => {
        yol(c, g, 'M16 44 L204 132 L16 132 Z', { fill: RENK.ince, stroke: 'none' });
        const k = c.S('g', { transform: 'translate(96 80) rotate(25)' }, g);
        dik(c, k, -24, -6, 48, 5, { rx: 2 }); daire(c, k, -16, 3, 4); daire(c, k, 16, 3, 4);
        yol(c, k, 'M-6 -6 L0 -28 L8 -6 M0 -28 L0 -46', { stroke: '#f5b04c', 'stroke-width': 5 }); daire(c, k, 0, -54, 8, { fill: '#f5b04c' });
      } },
    { ad: 'LED lamba', hedef: 2, gerekce: 'LED lambanın çalışması elektrik ve manyetizma ile açıklanır.',
      ciz: (c, g) => {
        daire(c, g, 110, 62, 36, { fill: 'rgba(255,224,102,.3)', stroke: '#ffe066', 'stroke-width': 3 });
        dik(c, g, 94, 98, 32, 26, { rx: 4, fill: RENK.cizgi });
        yol(c, g, 'M110 12 v-8 M60 28 l-7 -6 M160 28 l7 -6 M48 66 h-10 M172 66 h10', { stroke: '#ffe066', 'stroke-width': 3 });
      } },
  ];
  const HEDEF = ['ışığın kırılması', 'enerji dönüşümü', 'elektrik ve manyetizma'];
  async function gunluk(c) {
    const svg = c.svg(1000, 562);
    const kx = [60, 360, 660];
    HEDEF.forEach((h, i) => { kutu(c, svg, kx[i], 380, 280, 110, { renk: RENK.fizik }); yazi(c, svg, kx[i] + 140, 424, h, { size: 21, renk: RENK.fizik }); });
    await c.say('Günlük hayattan üç olay, fiziğin üç konusuyla eşleşecek.');
    c.say('Olayı hangi konu açıklar?', { noWait: true });
    let g = null, ad = null;
    await sirayla(c, OLAYLAR, {
      tag: 'Sıra sende', soru: (o) => `<b>${o.ad}</b>: hangi konu açıklar?`,
      secenekler: () => HEDEF, dogru: (o) => o.hedef, ipucu: () => 'Olayda ne oluyor: ışık mı, hareket mi, elektrik mi?', gerekce: (o) => o.gerekce,
      goster: async (o) => {
        g = c.S('g', {}, svg); yer(g, 390, 30, 1);
        kutu(c, g, 0, 0, 220, 150, { dolgu: RENK.koyu }); o.ciz(c, g);
        ad = yazi(c, svg, 500, 222, o.ad, { size: 24 });
        gizle(g, ad); await belir(c, [g, ad], 300);
      },
      yerlestir: async (o) => {
        const x = kx[o.hedef];
        await par(c.tween(550, (e) => { yer(g, 390 + (x + 110 - 390) * e, 30 + (350 - 30) * e, 1 - e); g.style.opacity = 1 - e; }), belir(c, ad, 300, 0));
        g.remove(); ad.remove();
        await belir(c, yazi(c, svg, x + 140, 462, o.ad, { size: 18, renk: RENK.soluk, kalin: 500 }), 300);
      },
      bekle: 1300,
    });
    await c.say('Fiziği, öteki bilimlerle kurduğu <b>bağlardan</b> tanırız.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-a1', kicker: 'Konu A · Fizik bilimi', title: 'Fizik, öteki bilimlerle bağından tanınır',
    accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Fizik, öteki bilimlerle bağından tanınır', hook: 'Bir gitar teli titreyip ses verdiğinde, bunu müzik mi açıklar, fizik mi?', button: 'Derse başla ›' },
    goals: ['Fizik biliminin öteki disiplinlerle ilişkilerini belirler.', 'Fizik bilimini bu ilişkilerden yararlanarak tanımlar.'],
    scenes: [
      { title: 'Tel titrer', goal: 'Bir olayı iki disiplinin birlikte açıkladığını gör.', run: telTitrer },
      { title: 'Kart kimin?', goal: 'Bilgi kartının hangi disiplini anlattığını belirle.', run: kartKimin },
      { title: 'Bağ nerede?', goal: 'Her disiplinin fizikle hangi konuda buluştuğunu gör.', run: bagNerede },
      { title: 'Fiziğin tanımı', goal: 'Bağlardan yola çıkıp fizik bilimini tanımla.', run: tanim },
      { title: 'Günlük hayatta fizik', goal: 'Günlük bir olayı fiziğin konusuyla eşleştir.', run: gunluk },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Mikroskopla dokuların görüntülenmesinde biyoloji, fiziğin hangi konusundan yararlanır?', options: ['Dalgalar', 'Işık', 'Esneklik'], answer: 1,
        why: ['Dalgalar, telli çalgıların sesini açıklarken kullanılır.', 'Evet. Mikroskopla görüntülemede ışık konusundan yararlanılır.', 'Esneklik, telin geriliminin ayarlanmasıyla ilgilidir.'], scene: 1 },
      { q: 'Hangisi fizik biliminin tanımına uyar?', options: ['Yalnızca canlıları inceler', 'Yalnızca sayılarla ve şekillerle uğraşır', 'Evreni kuvvet, madde, enerji, uzay ve zaman ilişkileriyle inceler'], answer: 2,
        why: ['Canlıları biyoloji inceler; fizik biyolojiyle bağ kurar.', 'Fizik matematik dilini kullanır, ama konusu evrendeki olaylardır.', 'Evet. Fizik bunu hesaplama ve gözlemle yapar.'], scene: 3 },
    ],
    summary: ['<b>Fiziği, öteki bilimlerle kurduğu bağlardan tanırız.</b>', 'Fizik, evreni <b>kuvvet, madde, enerji, uzay ve zaman</b> ilişkileriyle inceler.'],
    nextLesson: { href: 'b1-gorselleri-neye-gore-ayirirsin.html', label: 'Sonraki: Görselleri neye göre ayırırsın? ›' },
  });
})();
