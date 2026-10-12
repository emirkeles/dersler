/* P3 · DENEME · Ş3 ısıl denge düzeneğinin (dersler/denge-sekil.js, window.DENGE) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını ve kadrajlarını gezdirir. Sayılar senaryodaki örnek veridir.
   Kaynağı plan/fizik/enerji/sekil/s3-denge/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p3-denge-deneme.js, sayfasını fizik/enerji/p3-denge-deneme.html
   olarak koy (sayfa: ortak/ders.js, dersler/kit.js, dersler/denge-sekil.js, bu dosya), sonra `node araclar/olc.js enerji/p3`. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const G = window.DENGE;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SARI = 'var(--c5)', TURKUAZ = 'var(--c6)', TURUNCU = 'var(--c2)';
  const tr = (v, n = 0) => v.toFixed(n).replace('.', ',').replace('-', '−');

  const yazi = (c, p, metin, o = {}) => c.S('text', {
    x: 0, y: 0, 'text-anchor': o.hiza || 'start', 'font-size': 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };
  const kadraj = (c, f, g, a, b, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); g.guncelle(); }, ease.inOut);

  /* Etiketler figürün noktalarına bağlıdır; g.guncelle() her karede yerlerini ve sayıları yeniler. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, '', o) }));
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
  /* Okunan değerler: beher termometresininki noktanın soluna, erlenmayerinki sağına (iki sütun birbirine yakın). */
  const okumalar = (f, ek = []) => [
    ['dis.termometre', () => tr(f.durum().dis) + ' °C', -10, 8, { hiza: 'end', renk: SARI, kalin: 600 }],
    ['ic.termometre', () => tr(f.durum().ic) + ' °C', 10, 8, { renk: SARI, kalin: 600 }],
    ...ek,
  ];
  /* Isı oku: 'temas' noktasının y'sinde, erlenmayerin termometresinden beherin termometresine. */
  function isiOku(c, svg, f) {
    const g = c.S('g', {}, svg);
    const cizgi = c.S('path', { fill: 'none', 'stroke-width': 7, 'stroke-linecap': 'butt', style: 'stroke:' + TURUNCU }, g);
    const uc = c.S('path', { style: 'fill:' + TURUNCU }, g);
    const ad = yazi(c, g, 'ısı', { hiza: 'middle', renk: TURUNCU, kalin: 600 });
    g.guncelle = () => {
      const y = f.nokta('temas')[1], x0 = f.nokta('ic.termometre')[0] - 8, x1 = f.nokta('dis.termometre')[0] + 8;
      cizgi.setAttribute('d', 'M' + x0.toFixed(1) + ' ' + y.toFixed(1) + 'H' + (x1 + 12).toFixed(1));
      uc.setAttribute('d', 'M' + x1.toFixed(1) + ' ' + y.toFixed(1) + 'l14 -10v20Z');
      ad.setAttribute('x', ((x0 + x1) / 2).toFixed(1)); ad.setAttribute('y', (y - 12).toFixed(1));
    };
    g.guncelle();
    return g;
  }

  /* ---- Sahne 1 · D1 sahne 3'ün kuruluşu (x 60, y 130, h 330): bütün noktalar; erlenmayer içeri girer; 60 ve 20 → 30 °C ---- */
  async function denge(c) {
    const svg = c.svg(1000, 562);
    const f = G.kur(c, svg, { x: 60, y: 130, h: 330 });
    f.ayar({ ic: 60, dis: 20, icSeviye: 0.3, disSeviye: 0.7, icIcerik: 'su', disIcerik: 'su', icte: 0 });
    await belir(c, f.el, 500);
    const adlar = etiketler(c, svg, f, [
      ['dis.termometre', 'dis', -10, 8, { hiza: 'end' }], ['ic.termometre', 'ic.termometre', 10, 8],
      ['dis.kap', 'dis.kap', -8, -8, { hiza: 'end' }], ['ic.kap', 'ic.kap', 16, 4],
      ['temas', 'temas', -6, 34, { hiza: 'end' }],
      ['dis.etiket', 'dis.etiket', 0, 24, { hiza: 'middle', renk: TURKUAZ }], ['ic.etiket', 'ic.etiket', 0, 52, { hiza: 'middle', renk: TURKUAZ }],
    ]);
    await belir(c, adlar);
    await c.say('Yedi nokta: iki sütun, iki ağız, iki etiket, temas.', { speak: 'Yedi nokta: iki sütun, iki ağız, iki etiket ve temas.' });
    await c.tween(300, (e) => { adlar.style.opacity = 1 - e; });
    adlar.remove();
    const okuma = etiketler(c, svg, f, okumalar(f, [
      ['dis.etiket', '300 g su', 0, 24, { hiza: 'middle', renk: TURKUAZ }], ['ic.etiket', '100 g su', 0, 52, { hiza: 'middle', renk: TURKUAZ }],
    ]));
    const fark = yazi(c, svg, '', { renk: YAZI });
    fark.setAttribute('x', 470); fark.setAttribute('y', 170);
    const not2 = yazi(c, svg, '', { renk: SOLUK });
    not2.setAttribute('x', 470); not2.setAttribute('y', 214);
    const olc = () => {
      const a = f.nokta('ic.termometre'), b = f.nokta('dis.termometre');
      fark.textContent = 'tepe farkı: ' + tr(Math.abs(a[1] - b[1]), 2) + ' birim';
      not2.textContent = 'sütunlar arası: ' + tr(a[0] - b[0], 1) + ' birim';
    };
    await belir(c, okuma);
    await c.say('Erlenmayerde <b>60 °C</b> su, beherde <b>20 °C</b> su var.', { speak: 'Erlenmayerde altmış derece su, beherde yirmi derece su var.' });
    await c.tween(2000, (e) => { f.ayar({ icte: e }); okuma.guncelle(); }, ease.inOut);
    const ok = isiOku(c, svg, f);
    await belir(c, ok, 500);
    await c.say('Erlenmayer beherin içine indi; beherdeki su yükseldi.', { speak: 'Erlenmayer beherin içine indi; beherdeki su yükseldi.' });
    await c.tween(4000, (e) => { f.ayar({ ic: lerp(60, 30, e), dis: lerp(20, 30, e) }); okuma.guncelle(); ok.guncelle(); }, ease.out);
    await c.tween(400, (e) => { ok.style.opacity = 1 - e; });
    ok.remove();
    olc();
    await c.say('İki sütun <b>30 °C</b>\'ta aynı çizgide durdu.', { speak: 'İki sütun otuz derecede aynı çizgide durdu.' });
    await kadraj(c, f, okuma, G.kadraj.tum, G.kadraj.kaplar);
    await c.say('Yakından: erlenmayer suyun içinde, sütunlar kadrajda.', { speak: 'Yakından: erlenmayer suyun içinde, sütunlar kadrajda.' });
    await kadraj(c, f, okuma, G.kadraj.kaplar, G.kadraj.tum);
  }

  /* ---- Sahne 2 · D2 sahne 3'ün kuruluşu (x 30, y 130, h 300): 100 g su ve 100 g su → 45 °C; sonra 200 g zeytinyağı ---- */
  async function madde(c) {
    const svg = c.svg(1000, 562);
    const f = G.kur(c, svg, { x: 30, y: 130, h: 300 });
    f.ayar({ ic: 60, dis: 30, icSeviye: 0.3, disSeviye: 0.3, icIcerik: 'su', disIcerik: 'su', icte: 0 });
    const ad = { ic: '100 g su', dis: '100 g su' };
    const okuma = etiketler(c, svg, f, okumalar(f, [
      ['dis.etiket', () => ad.dis, 0, 24, { hiza: 'middle', renk: TURKUAZ }], ['ic.etiket', () => ad.ic, 0, 52, { hiza: 'middle', renk: TURKUAZ }],
    ]));
    const fark = yazi(c, svg, '', { renk: YAZI });
    fark.setAttribute('x', 400); fark.setAttribute('y', 170);
    await c.wait(300);
    await c.say('Birinci deneme: iki kapta da <b>100 g su</b>.', { speak: 'Birinci deneme: iki kapta da yüz gram su.' });
    const deneme = async (son) => {
      const a = f.durum();
      await c.tween(1800, (e) => { f.ayar({ icte: e }); okuma.guncelle(); }, ease.inOut);
      await c.tween(3000, (e) => { f.ayar({ ic: lerp(a.ic, son, e), dis: lerp(a.dis, son, e) }); okuma.guncelle(); }, ease.out);
      const p = f.nokta('ic.termometre'), q = f.nokta('dis.termometre');
      fark.textContent = 'tepe farkı: ' + tr(Math.abs(p[1] - q[1]), 2) + ' birim';
    };
    await deneme(45);
    await c.say('İkisi de <b>45 °C</b> oldu: tam ortada.', { speak: 'İkisi de kırk beş derece oldu: tam ortada.' });
    await c.tween(1500, (e) => { f.ayar({ icte: 1 - e }); okuma.guncelle(); }, ease.inOut);
    f.ayar({ ic: 60, dis: 30, disIcerik: 'yag', disSeviye: 0.5 });
    ad.dis = '200 g zeytinyağı'; fark.textContent = ''; okuma.guncelle();
    await c.say('İkinci deneme: beherde <b>200 g zeytinyağı</b>.', { speak: 'İkinci deneme: beherde iki yüz gram zeytinyağı.' });
    await deneme(45);
    await c.say('Denge yine <b>45 °C</b>\'ta kuruldu.', { speak: 'Denge yine kırk beş derecede kuruldu.' });
  }

  /* ---- Sahne 3 · Büyük kurulum (h 440): doluluklar 0 → 1, iki içerik, sıcaklık uçları, erlenmayer gidip gelir ---- */
  async function ayarlar(c) {
    const svg = c.svg(1000, 562);
    const f = G.kur(c, svg, { x: 300, y: 50, h: 440 });
    f.ayar({ ic: 20, dis: 20, icSeviye: 0, disSeviye: 0, icIcerik: 'yag', disIcerik: 'su', icte: 0 });
    const okuma = etiketler(c, svg, f, okumalar(f));
    const durum = yazi(c, svg, '', { renk: YAZI });
    durum.setAttribute('x', 30); durum.setAttribute('y', 120);
    const bilgi = yazi(c, svg, '1 °C: ' + tr(G.sabit.birim * 440 / 600, 2) + ' birim', { renk: SOLUK });
    bilgi.setAttribute('x', 30); bilgi.setAttribute('y', 160);
    const yenile = () => { const d = f.durum(); durum.textContent = 'düzey ' + tr(d.disDuzey) + ' mm'; okuma.guncelle(); };
    await c.wait(300);
    await c.tween(2500, (e) => { f.ayar({ icSeviye: e, disSeviye: e }); yenile(); }, ease.linear);
    await c.say('Doluluk 0\'dan 1\'e: erlenmayerde yağ, beherde su.', { speak: 'Doluluk sıfırdan bire: erlenmayerde yağ, beherde su.' });
    await c.tween(2500, (e) => { f.ayar({ ic: lerp(20, 120, e), dis: lerp(20, -20, e) }); yenile(); }, ease.linear);
    await c.say('Sıcaklık uçları: <b>120 °C</b> ve <b>−20 °C</b>.', { speak: 'Sıcaklık uçları: yüz yirmi ve eksi yirmi derece.' });
    f.ayar({ icIcerik: 'su', disIcerik: 'yag', icSeviye: 0.5, disSeviye: 0.8, ic: 70, dis: 22 }); yenile();
    await c.tween(1200, (e) => { f.ayar({ icte: 0.5 * e }); yenile(); }, ease.inOut);
    await c.say('Erlenmayer beherin üstünde; termometrenin ucu kutuda kırpılır.', { speak: 'Erlenmayer beherin üstünde; termometrenin ucu kutuda kırpılır.' });
    await c.tween(1200, (e) => { f.ayar({ icte: 0.5 + 0.5 * e }); yenile(); }, ease.inOut);
    await c.say('400 g yağ ve erlenmayer: düzey ağzın altında kalır.', { speak: 'Dört yüz gram yağ ve erlenmayer: düzey ağzın altında kalır.' });
    f.ayar({ disSeviye: 1 }); yenile();
    await c.say('Beher tam doluyken de sıvı taşmaz.', { speak: 'Beher tam doluyken de sıvı taşmaz.' });
    await c.tween(2500, (e) => { f.ayar({ icte: 1 - e }); yenile(); }, ease.inOut);
  }

  Ders.start({
    id: 'enerji-p3', kicker: 'Deneme · İzometrik figür', title: 'Isıl denge düzeneği', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Isıl denge düzeneği', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Isıl denge', goal: 'Erlenmayer içeri girer; iki sütun buluşur.', run: denge },
      { title: 'Kütle ve madde', goal: 'İki deneme, iki içerik.', run: madde },
      { title: 'Ayarlar', goal: 'Doluluk, içerik, sıcaklık uçları.', run: ayarlar },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Isıl dengede iki termometre ne gösterir?', options: ['Aynı sıcaklığı', 'Farklı sıcaklıkları'], answer: 0, why: ['Isı akışı durunca sıcaklıklar eşittir.', 'Fark varsa ısı akışı sürer.'], scene: 0 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
