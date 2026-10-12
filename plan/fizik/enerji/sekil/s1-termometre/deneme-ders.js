/* P1 · DENEME · Ş1 üç ölçekli termometrenin (dersler/termometre-sekil.js, window.TERMO) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını ve kadrajlarını gezdirir, B1 senaryosunun 2., 3. ve 4. sahnesindeki
   kullanımı aynen kurar. Kaynağı plan/fizik/enerji/sekil/s1-termometre/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p1-termometre-deneme.js, sayfasını fizik/enerji/p1-termometre-deneme.html
   olarak koy (sayfa sırayla: ../../ortak/ders.js, dersler/kit.js, dersler/termometre-sekil.js, bu dosya), sonra
   `node araclar/olc.js enerji/p1`. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const TM = window.TERMO;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SARI = 'var(--c5)', CIZGI = '#aab3cf';
  const tr = (v) => String(Math.round(v)).replace('-', '−');

  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'start', 'font-size': o.size || 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const cizgi = (c, p, P, Q, o = {}) => c.S('line', Object.assign({ x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], stroke: CIZGI, 'stroke-width': 2, 'stroke-linecap': 'round' }, o), p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; }), ease.out); };
  const son = (c, el, ms = 300) => { const els = [el].flat(); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = 1 - e; }), ease.in); };

  /* Figürün noktalarına bağlı etiketler; g.guncelle() yerlerini ve sayıları yeniler, kadraj dışındakini gizler. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, 0, 0, '', o) }));
    g.guncelle = () => {
      for (const e of hepsi) {
        const [x, y] = f.nokta(e.ad);
        e.el.setAttribute('x', (x + e.dx).toFixed(1)); e.el.setAttribute('y', (y + e.dy).toFixed(1));
        e.el.style.display = f.gorunur(e.ad) ? '' : 'none';
        const m = typeof e.metin === 'function' ? e.metin() : e.metin;
        if (e.el.textContent !== m) e.el.textContent = m;
      }
    };
    g.guncelle();
    return g;
  }

  /* ---- Sahne 1 · Bütün noktalar ve ayarlar: sütun −20 → 120 °C, şeritler tek tek gizlenir ve açılır ---- */
  async function ayarlar(c) {
    const svg = c.svg(1000, 562);
    const f = TM.kur(c, svg, { x: 320, y: 41, h: 480 });
    await belir(c, f.el, 500);
    const adlar = etiketler(c, svg, f, [
      ['sutun', () => tr(f.durum().sicaklik) + ' °C', -35, 8, { hiza: 'end', renk: SARI, kalin: 600 }],
      ['hazne', 'hazne', -35, 8, { hiza: 'end' }],
      ['c.baslik', '°C', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
      ['f.baslik', '°F', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
      ['k.baslik', 'K', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
    ]);
    await belir(c, adlar);
    await c.say('Tek termometre, yanında üç cetvel şeridi.', { speak: 'Tek termometre, yanında üç cetvel şeridi.' });
    await c.tween(1500, (e) => { f.sicaklik(lerp(20, -20, e)); adlar.guncelle(); }, ease.inOut);
    await c.tween(3000, (e) => { f.sicaklik(lerp(-20, 120, e)); adlar.guncelle(); }, ease.inOut);
    await c.say('Sütun en alttan en üste çıktı.', { speak: 'Sütun en alttan en üste çıktı.' });
    await c.tween(1500, (e) => { f.sicaklik(lerp(120, 100, e)); adlar.guncelle(); }, ease.inOut);
    const hat = cizgi(c, svg, f.nokta('sutun'), f.olcekSag('k', 373), { 'stroke-dasharray': '2 7' });
    const sayilar = etiketler(c, svg, f, [
      ['c@100+', '100', 6, 9, { renk: SARI, kalin: 600 }], ['f@212+', '212', 6, 9, { renk: SARI, kalin: 600 }], ['k@373+', '373', 6, 9, { renk: SARI, kalin: 600 }],
    ]);
    await belir(c, [hat, sayilar]);
    await c.say('Aynı yükseklik: <b>100</b>, <b>212</b>, <b>373</b>.', { speak: 'Aynı yükseklik: yüz, iki yüz on iki, üç yüz yetmiş üç.' });
    for (const s of ['c', 'f', 'k']) {
      await c.tween(450, (e) => f.goster({ [s]: 1 - e }));
      await c.wait(250);
      await c.tween(450, (e) => f.goster({ [s]: e }));
    }
    await c.say('Şeritler tek tek gizlenip açılabiliyor.', { speak: 'Şeritler tek tek gizlenip açılabiliyor.' });
  }

  /* ---- Sahne 2 · B1 senaryosu, sahne 2 ("Yetmiş derece"): figür sağda, yalnız Celsius, sütunun üstünde sayı ---- */
  async function yetmis(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg);
    c.S('rect', { x: 60, y: 90, width: 420, height: 210, rx: 14, fill: 'none', stroke: CIZGI, 'stroke-width': 3 }, sol);
    yazi(c, sol, 270, 205, 'Bugün hava 70 derece', { hiza: 'middle', renk: YAZI, size: 30, kalin: 600 });
    const f = TM.kur(c, svg, { x: 640, y: 90, h: 400 });
    f.sicaklik(70); f.goster({ c: 1, f: 0, k: 0 });
    const p = f.nokta('sutun');
    const sayi = yazi(c, svg, p[0], p[1] - 28, '70 °C', { hiza: 'middle', renk: SARI, size: 28, kalin: 700 });
    const ad = yazi(c, svg, f.nokta('c.baslik')[0], f.nokta('c.baslik')[1] + 8, '°C', { hiza: 'middle', renk: YAZI, kalin: 600 });
    await belir(c, [sol, f.el, sayi, ad], 500);
    await c.say('Dizide hava <b>70 derece</b>; herkes tişörtle.', { speak: 'Dizide hava yetmiş derece; herkes tişörtle.' });
    await c.tween(400, (e) => { sol.style.opacity = lerp(1, 0.45, e); }, ease.out);
    await c.say('Ela\'nın termometresinde 70 derece sıcak çay demektir.', { speak: 'Ela\'nın termometresinde yetmiş derece sıcak çay demektir.' });
  }

  /* ---- Sahne 3 · B1 senaryosu, sahne 3 (iki sabit nokta): sütun 20 → 0 → 100 °C; sütundan x 470'e kesik çizgiler ---- */
  async function sabitNoktalar(c) {
    const svg = c.svg(1000, 562);
    const f = TM.kur(c, svg, { x: 60, y: 100, h: 400 });
    f.sicaklik(20); f.goster({ c: 1, f: 0, k: 0 });
    await belir(c, f.el, 500);
    await c.say('Ölçek, termometrenin yanındaki bölmelenmiş cetveldir.', { speak: 'Ölçek, termometrenin yanındaki bölmelenmiş cetveldir.' });
    const isaret = async (metin) => {
      const p = f.nokta('sutun');
      const hat = cizgi(c, svg, p, [470, p[1]], { 'stroke-dasharray': '8 8' });
      const ad = yazi(c, svg, 480, p[1] - 12, metin, { renk: SARI, kalin: 600 });
      await belir(c, [hat, ad]);
    };
    await c.tween(1000, (e) => f.sicaklik(lerp(20, 0, e)), ease.inOut);
    await isaret('donma');
    await c.say('Donmakta olan suda sütun burada durur.', { speak: 'Donmakta olan suda sütun burada durur.' });
    await c.tween(1200, (e) => f.sicaklik(lerp(0, 100, e)), ease.inOut);
    await isaret('kaynama');
    await c.say('Kaynayan suda sütun yükselip burada durur.', { speak: 'Kaynayan suda sütun yükselip burada durur.' });
  }

  /* ---- Sahne 4 · B1 senaryosu, sahne 4 (üç ölçek, aynı sütun): şeritler sırayla açılır, üç sayı aynı hizada ---- */
  async function ucOlcek(c) {
    const svg = c.svg(1000, 562);
    const f = TM.kur(c, svg, { x: 60, y: 100, h: 400 });
    f.sicaklik(0); f.goster({ c: 0, f: 0, k: 0 });
    await belir(c, f.el, 500);
    await c.say('Sütun donma sıcaklığında, aynı yerde duruyor.', { speak: 'Sütun donma sıcaklığında, aynı yerde duruyor.' });
    const adlar = { c: '°C', f: '°F', k: 'K' };
    const baslik = {};
    for (const s of ['c', 'f', 'k']) { const p = f.nokta(s + '.baslik'); baslik[s] = yazi(c, svg, p[0], p[1] + 8, adlar[s], { hiza: 'middle', renk: YAZI, kalin: 600 }); baslik[s].style.opacity = 0; }
    const tur = async (deger, yazilar, ilk) => {
      const els = [];
      for (const [i, s] of ['c', 'f', 'k'].entries()) {
        if (ilk) await c.tween(500, (e) => { f.goster({ [s]: e }); baslik[s].style.opacity = e; }, ease.out);
        const p = f.olcek(s, deger[i]);
        const hat = cizgi(c, svg, p, [470, p[1]]);
        const ad = yazi(c, svg, 480, p[1] + 10 + (i - 1) * 40, yazilar[i], { renk: SARI, size: 30, kalin: 600 });
        els.push(hat, ad);
        await belir(c, [hat, ad]);
        if (ilk) await c.say(['Celsius cetvelinde bu yükseklik <b>0 °C</b>.', 'Fahrenheit cetvelinde aynı yükseklik <b>32 °F</b>.', 'Kelvin cetvelinde aynı yükseklik <b>273 K</b>.'][i], { speak: ['Celsius cetvelinde bu yükseklik sıfır santigrat derece.', 'Fahrenheit cetvelinde aynı yükseklik otuz iki fahrenhayt.', 'Kelvin cetvelinde aynı yükseklik iki yüz yetmiş üç kelvin.'][i] });
      }
      return els;
    };
    const donma = await tur([0, 32, 273], ['0 °C', '32 °F', '273 K'], true);
    await son(c, donma); donma.forEach((e) => e.remove());
    await c.tween(1200, (e) => f.sicaklik(lerp(0, 100, e)), ease.inOut);
    const kaynama = await tur([100, 212, 373], ['100 °C', '212 °F', '373 K'], false);
    await c.say('Kaynayan suda: <b>100 °C</b>, <b>212 °F</b>, <b>373 K</b>.', { speak: 'Kaynayan suda: yüz santigrat derece, iki yüz on iki fahrenhayt, üç yüz yetmiş üç kelvin.' });
    await son(c, kaynama); kaynama.forEach((e) => e.remove());
    const t = KIT.tablo(c, svg, { x: 460, y: 130, satir: 3, h: 46, size: 24, sutunlar: [{ ad: 'Ölçek', w: 160 }, { ad: 'Donma', w: 140 }, { ad: 'Kaynama', w: 140 }] });
    const satirlar = [['Celsius', '0 °C', '100 °C'], ['Fahrenheit', '32 °F', '212 °F'], ['Kelvin', '273 K', '373 K']];
    for (const [i, satir] of satirlar.entries()) { satir.forEach((m, j) => t.yaz(i, j, m)); await t.goster(i); await c.wait(350); }
    await c.say('Sıcaklık tek; yazılışı ölçeğe göre üç ayrı sayıdır.', { speak: 'Sıcaklık tek; yazılışı ölçeğe göre üç ayrı sayıdır.' });
  }

  /* ---- Sahne 5 · Kadrajlar: tum → hazne → tum → ust → sabit → tum; etiketler kadrajı izler ---- */
  async function kadrajlar(c) {
    const svg = c.svg(1000, 562);
    const f = TM.kur(c, svg, { x: 320, y: 41, h: 480 });
    f.sicaklik(0);
    const g = etiketler(c, svg, f, [
      ['sutun', () => tr(f.durum().sicaklik) + ' °C', -35, 8, { hiza: 'end', renk: SARI, kalin: 600 }],
      ['hazne', 'hazne', -35, 8, { hiza: 'end' }],
      ['c.baslik', '°C', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
      ['f.baslik', '°F', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
      ['k.baslik', 'K', 0, 8, { hiza: 'middle', renk: YAZI, kalin: 600 }],
      ['c@0+', '0', 6, 9, { renk: SARI, kalin: 600 }], ['f@32+', '32', 6, 9, { renk: SARI, kalin: 600 }], ['k@273+', '273', 6, 9, { renk: SARI, kalin: 600 }],
    ]);
    await belir(c, [f.el, g], 500);
    const git = (a, b, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); g.guncelle(); }, ease.inOut);
    const K = TM.kadraj;
    await c.say('Bütün düzenek: kadraj <b>tum</b>.', { speak: 'Bütün düzenek.' });
    await git(K.tum, K.hazne);
    await c.say('Hazne ve döner tabla: kadraj <b>hazne</b>.', { speak: 'Hazne ve döner tabla.' });
    await git(K.hazne, K.tum);
    await c.tween(1200, (e) => { f.sicaklik(lerp(0, 100, e)); g.guncelle(); }, ease.inOut);
    await git(K.tum, K.ust);
    await c.say('Üst yarı: kadraj <b>ust</b>.', { speak: 'Üst yarı.' });
    await git(K.ust, K.sabit);
    await c.say('Donma ile kaynama arası: kadraj <b>sabit</b>.', { speak: 'Donma ile kaynama arası.' });
    await c.tween(1500, (e) => { f.sicaklik(lerp(100, 0, e)); g.guncelle(); }, ease.inOut);
    await git(K.sabit, K.tum);
    await c.say('Kadraj yine <b>tum</b>.', { speak: 'Yine bütün düzenek.' });
  }

  Ders.start({
    id: 'enerji-p1', kicker: 'Deneme · İzometrik figür', title: 'Üç ölçekli termometre', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Üç ölçekli termometre', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Ayarlar ve noktalar', goal: 'Sütun, şeritler, etiket noktaları.', run: ayarlar },
      { title: 'Yetmiş derece', goal: 'B1 senaryosu, sahne 2.', run: yetmis },
      { title: 'İki sabit nokta', goal: 'B1 senaryosu, sahne 3.', run: sabitNoktalar },
      { title: 'Üç ölçek, aynı sütun', goal: 'B1 senaryosu, sahne 4.', run: ucOlcek },
      { title: 'Kadrajlar', goal: 'tum, hazne, ust, sabit.', run: kadrajlar },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Suyun donma sıcaklığı Kelvin cetvelinde kaç yazılır?', options: ['0 K', '273 K'], answer: 1, why: ['0, Celsius cetvelindeki sayıdır.', 'Aynı yükseklik Kelvin cetvelinde 273 yazılır.'], scene: 3 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
