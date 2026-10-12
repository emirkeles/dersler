/* P5 · DENEME · Ş5 ısı iletim düzeneğinin (dersler/iletim-sekil.js, window.ILETIM) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını ve kadrajlarını gezdirir. Sayılar örnek veridir.
   Kaynağı plan/fizik/enerji/sekil/s5-iletim/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p5-iletim-deneme.js, sayfasını fizik/enerji/p5-iletim-deneme.html
   olarak koy (sayfa: ortak/ders.js, dersler/kit.js, dersler/iletim-sekil.js, bu dosya), sonra `node araclar/olc.js enerji/p5`. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const I = window.ILETIM;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SARI = 'var(--c5)';
  const tr = (v) => String(Math.round(v));

  const yazi = (c, p, metin, o = {}) => c.S('text', {
    x: 0, y: 0, 'text-anchor': o.hiza || 'start', 'font-size': 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };
  const kadraj = (c, f, g, a, b, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); g.guncelle(); }, ease.inOut);

  /* Senaryodaki yer: F1 sahne 4–7, { x: 40, y: 110, h: 380 } (genişlik 532). */
  function kur(c) {
    const svg = c.svg(1000, 562);
    const f = I.kur(c, svg, { x: 40, y: 110, h: 380 });
    return { svg, f };
  }
  /* Etiketler figürün noktalarına bağlıdır; g.guncelle() her karede yerlerini ve sayıları yeniler.
     Görünmeyen çubuğun (gorunur: 0) ve kadraj dışında kalan noktanın yazısı gizlenir. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, '', o) }));
    g.guncelle = () => {
      for (const e of hepsi) {
        const [x, y] = f.nokta(e.ad);
        const m = /^cubuk(\d)/.exec(e.ad);
        const acik = f.gorunur(e.ad) && (!m || f.durum(+m[1]).gorunur > 0.5);
        e.el.setAttribute('x', (x + e.dx).toFixed(1)); e.el.setAttribute('y', (y + e.dy).toFixed(1));
        e.el.style.display = acik ? '' : 'none';
        const t = typeof e.metin === 'function' ? e.metin() : e.metin;
        if (e.el.textContent !== t) e.el.textContent = t;
      }
    };
    g.guncelle();
    return g;
  }
  const ucDeger = (f, j) => () => tr(f.durum(j).uc) + ' °C';
  const suDeger = (f) => () => tr(f.durum(0).su) + ' °C';
  const sari = { renk: SARI, kalin: 600 };
  const orta = { hiza: 'middle', renk: YAZI };
  const okuma = (c, svg, f, adlar) => etiketler(c, svg, f, [
    ['cubuk0.uc', ucDeger(f, 0), 12, 7, sari], ['cubuk1.uc', ucDeger(f, 1), 12, 7, sari], ['cubuk2.uc', ucDeger(f, 2), 12, 7, sari],
    ['su.termometre', suDeger(f), 12, 7, sari],
    ['cubuk0.etiket', () => adlar[0], 0, 24, orta], ['cubuk1.etiket', () => adlar[1], 0, 24, orta], ['cubuk2.etiket', () => adlar[2], 0, 24, orta],
    ['su.etiket', 'sıcak su', 0, 24, orta],
  ]);

  /* ---- Sahne 1 · Senaryo F1 sahne 4: üç ayrı cins, aynı boy ve kesit; sonra bütün noktalar ve kadrajlar ---- */
  async function cins(c) {
    const { svg, f } = kur(c);
    f.cubuk(0, { cins: 'aluminyum', boy: 1, kesit: 1, uc: 20, gorunur: 0 });
    f.cubuk(1, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 0 });
    f.cubuk(2, { cins: 'tahta', boy: 1, kesit: 1, uc: 20, gorunur: 0 });
    f.su(80);
    await belir(c, f.el, 500);
    const adlar = ['alüminyum', 'demir', 'tahta'];
    const g = okuma(c, svg, f, adlar);
    for (const j of [0, 1, 2]) await c.tween(400, (e) => { f.cubuk(j, { gorunur: e }); g.guncelle(); }, ease.out);
    await c.say('Üç çubuğun bir ucu <b>80 °C</b>’lik sıcak suda; uçlar <b>20 °C</b>.', { speak: 'Üç çubuğun bir ucu seksen derecelik sıcak suda; uçlar yirmi derece.' });
    /* Ölçüm: üç uç 20 °C'ta iken sütun tepelerinin tahtadaki y değerleri (en çok 2 birim fark etmeli). */
    const olcum = [0, 1, 2].map((j) => f.nokta('cubuk' + j + '.uc')[1].toFixed(1).replace('.', ',')).join(' · ');
    await c.say('Ölçüm, uç y: ' + olcum + '.', { speak: 'Ölçüm.' });
    await c.tween(3000, (e) => {
      f.cubuk(0, { uc: lerp(20, 62, e) }); f.cubuk(1, { uc: lerp(20, 41, e) }); f.cubuk(2, { uc: lerp(20, 22, e) });
      g.guncelle();
    }, ease.linear);
    await c.say('Alüminyum <b>62 °C</b>, demir <b>41 °C</b>, tahta <b>22 °C</b> oldu.', { speak: 'Alüminyum altmış iki, demir kırk bir, tahta yirmi iki derece oldu.' });
    await kadraj(c, f, g, I.kadraj.tum, I.kadraj.uclar);
    await c.say('Yakından: üç uç termometresi yan yana.', { speak: 'Yakından: üç uç termometresi yan yana.' });
    await kadraj(c, f, g, I.kadraj.uclar, I.kadraj.kap);
    await c.say('Sıcak su teknesi ve su termometresi.', { speak: 'Sıcak su teknesi ve su termometresi.' });
    await kadraj(c, f, g, I.kadraj.kap, I.kadraj.tum);
    await c.tween(300, (e) => { g.style.opacity = 1 - e; });
    g.remove();
    const yerler = etiketler(c, svg, f, [
      ['cubuk0.orta', 'orta', 6, -10], ['cubuk1.orta', 'orta', 6, -10], ['cubuk2.orta', 'orta', 6, -10],
      ['cubuk0.bas', 'baş', -50, 4], ['cubuk0.son', 'son', 10, 26],
      ['su.yuzey', 'duvar', 8, 30],
      ['cubuk0.etiket', 'etiket 0', 0, 24, orta], ['cubuk1.etiket', 'etiket 1', 0, 24, orta], ['cubuk2.etiket', 'etiket 2', 0, 24, orta],
      ['su.etiket', 'su etiketi', 0, 24, orta],
    ]);
    await belir(c, yerler);
    await c.say('Öteki noktalar: çubuğun ortası, başı, sonu, duvar ve etiket satırı.', { speak: 'Öteki noktalar: çubuğun ortası, başı, sonu, duvar ve etiket satırı.' });
  }

  /* ---- Sahne 2 · Senaryo F1 sahne 5 ve 7: demir ince ve geniş (kesit 1, 2); demir kısa ve uzun (boy 1, 2) ---- */
  async function kesitBoy(c) {
    const { svg, f } = kur(c);
    f.cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 1 });
    f.cubuk(1, { cins: 'demir', boy: 1, kesit: 2, uc: 20, gorunur: 1 });
    f.cubuk(2, { gorunur: 0 });
    f.su(80);
    const adlar = ['ince', 'geniş', ''];
    const g = okuma(c, svg, f, adlar);
    await c.wait(300);
    await c.tween(3000, (e) => { f.cubuk(0, { uc: lerp(20, 41, e) }); f.cubuk(1, { uc: lerp(20, 55, e) }); g.guncelle(); }, ease.linear);
    await c.say('İki demir çubuk: <b>ince</b> olan 41 °C, <b>geniş</b> olan 55 °C oldu.', { speak: 'İki demir çubuk: ince olan kırk bir, geniş olan elli beş derece oldu.' });
    await c.tween(400, (e) => { f.cubuk(0, { gorunur: 1 - e }); f.cubuk(1, { gorunur: 1 - e }); g.guncelle(); }, ease.in);
    f.cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20 });
    f.cubuk(1, { cins: 'demir', boy: 2, kesit: 1, uc: 20 });
    adlar[0] = 'kısa'; adlar[1] = 'uzun';
    await c.tween(400, (e) => { f.cubuk(0, { gorunur: e }); f.cubuk(1, { gorunur: e }); g.guncelle(); }, ease.out);
    const olcum = [0, 1].map((j) => f.nokta('cubuk' + j + '.uc')[1].toFixed(1).replace('.', ',')).join(' · ');
    await c.say('Ölçüm, kısa ve uzun uç y: ' + olcum + '.', { speak: 'Ölçüm.' });
    /* Ölçü çizgisi: çubuğun başından sonuna, üst yüzün biraz üstünde; üzerinde "kalınlık". */
    const olcu = c.S('g', {}, svg);
    for (const j of [0, 1]) {
      const a = f.nokta('cubuk' + j + '.bas'), b = f.nokta('cubuk' + j + '.son'), o = f.nokta('cubuk' + j + '.orta');
      c.S('line', { x1: a[0], y1: a[1] - 12, x2: b[0], y2: b[1] - 12, stroke: YAZI, 'stroke-width': 3, 'stroke-linecap': 'round' }, olcu);
      yazi(c, olcu, 'kalınlık', { renk: YAZI }).setAttribute('transform', 'translate(' + (o[0] + 14).toFixed(1) + ' ' + (o[1] - 22).toFixed(1) + ')');
    }
    await belir(c, olcu, 400);
    await c.tween(3000, (e) => { f.cubuk(0, { uc: lerp(20, 41, e) }); f.cubuk(1, { uc: lerp(20, 29, e) }); g.guncelle(); }, ease.linear);
    await c.say('<b>Kısa</b> çubuğun ucu 41 °C, <b>uzun</b> çubuğun ucu 29 °C oldu.', { speak: 'Kısa çubuğun ucu kırk bir, uzun çubuğun ucu yirmi dokuz derece oldu.' });
  }

  /* ---- Sahne 3 · Senaryo F1 sahne 6: tek demir çubuk, su 50 ve 80 °C; sonra dört cins ve uç değerler (0, 100) ---- */
  async function suSicakligi(c) {
    const { svg, f } = kur(c);
    f.cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 1 });
    f.cubuk(1, { gorunur: 0 }); f.cubuk(2, { gorunur: 0 });
    f.su(50);
    const adlar = ['demir', '', ''];
    const g = okuma(c, svg, f, adlar);
    await c.wait(300);
    await c.tween(3000, (e) => { f.cubuk(0, { uc: lerp(20, 30, e) }); g.guncelle(); }, ease.linear);
    await c.say('Su <b>50 °C</b> iken uç <b>30 °C</b>’ye çıktı.', { speak: 'Su elli derece iken uç otuz dereceye çıktı.' });
    await c.tween(500, (e) => { f.cubuk(0, { uc: lerp(30, 20, e) }); g.guncelle(); }, ease.inOut);
    await c.tween(800, (e) => { f.su(lerp(50, 80, e)); g.guncelle(); }, ease.inOut);
    await c.tween(3000, (e) => { f.cubuk(0, { uc: lerp(20, 41, e) }); g.guncelle(); }, ease.linear);
    await c.say('Su <b>80 °C</b> iken uç <b>41 °C</b>’ye çıktı.', { speak: 'Su seksen derece iken uç kırk bir dereceye çıktı.' });
    f.cubuk(0, { cins: 'cam', uc: 0 }); f.cubuk(1, { cins: 'tahta', kesit: 2, uc: 50, gorunur: 1 }); f.cubuk(2, { cins: 'aluminyum', boy: 2, kesit: 2, uc: 100, gorunur: 1 });
    f.su(100);
    adlar[0] = 'cam'; adlar[1] = 'tahta'; adlar[2] = 'alüminyum';
    g.guncelle();
    await c.say('<b>Cam</b>, geniş tahta, uzun alüminyum; uçlar 0, 50, 100 °C.', { speak: 'Cam, geniş tahta, uzun alüminyum; uçlar sıfır, elli, yüz derece.' });
  }

  Ders.start({
    id: 'enerji-p5', kicker: 'Deneme · İzometrik figür', title: 'Isı iletim düzeneği', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Isı iletim düzeneği', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Maddenin cinsi', goal: 'Üç çubuk, üç uç termometresi.', run: cins },
      { title: 'Kesit ve boy', goal: 'İnce ve geniş; kısa ve uzun.', run: kesitBoy },
      { title: 'Su sıcaklığı', goal: 'Tek çubuk, su 50 ve 80 °C.', run: suSicakligi },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi çubuğun ucu en çok ısındı?', options: ['Alüminyum', 'Tahta'], answer: 0, why: ['Alüminyum ısıyı hızlı iletir.', 'Tahta ısıyı yavaş iletir.'], scene: 0 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
