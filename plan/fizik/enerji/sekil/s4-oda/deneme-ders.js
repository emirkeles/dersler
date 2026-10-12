/* P4 · DENEME · Ş4 kesit odanın (dersler/oda-sekil.js, window.ODA) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını, yollarını ve kadrajlarını gezdirir. Sayılar örnek veridir.
   Kaynağı plan/fizik/enerji/sekil/s4-oda/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p4-oda-deneme.js, sayfasını fizik/enerji/p4-oda-deneme.html
   olarak koy (sayfa: ortak/ders.js, dersler/kit.js, dersler/oda-sekil.js, bu dosya), sonra `node araclar/olc.js enerji/p4`.
   Sahne 2, 3 ve 4 senaryodaki kullanımları aynen kurar (E2 sahne 4, 8 ve 9; figür hep { x: 40, y: 110, h: 380 }). */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const O = window.ODA;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SICAK = 'var(--c2)', SOGUK = 'var(--c1)', SARI = 'var(--c5)';
  const YER = { x: 40, y: 110, h: 380 };
  const BOS = { soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1, termometre: 1 };

  const yazi = (c, p, metin, o = {}) => c.S('text', {
    x: o.x || 0, y: o.y || 0, 'text-anchor': o.hiza || 'start', 'font-size': 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };
  const kadraj = (c, f, a, b, guncelle, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); guncelle(); }, ease.inOut);

  function kur(c, ilk) {
    const svg = c.svg(1000, 562);
    const f = O.kur(c, svg, YER);
    f.ayar(Object.assign({}, BOS, ilk));
    return { svg, f };
  }
  /* Etiketler figürün noktalarına bağlıdır; g.guncelle() yerlerini yeniler ve kadraj dışındakini gizler. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, metin, o) }));
    g.guncelle = () => {
      for (const e of hepsi) {
        const [x, y] = f.nokta(e.ad);
        e.el.setAttribute('x', (x + e.dx).toFixed(1)); e.el.setAttribute('y', (y + e.dy).toFixed(1));
        e.el.style.display = f.gorunur(e.ad) ? '' : 'none';
      }
    };
    g.guncelle();
    return g;
  }
  /* Noktaları işaretleyen küçük halkalar: etiketin hangi yere bağlı olduğu görünsün. */
  function isaretler(c, svg, f, adlar) {
    const g = c.S('g', {}, svg);
    const hepsi = adlar.map((ad) => ({ ad, el: c.S('circle', { r: 4, style: 'fill:none;stroke:var(--text);stroke-width:1.5' }, g) }));
    g.guncelle = () => { for (const e of hepsi) { const [x, y] = f.nokta(e.ad); e.el.setAttribute('cx', x.toFixed(1)); e.el.setAttribute('cy', y.toFixed(1)); e.el.style.display = f.gorunur(e.ad) ? '' : 'none'; } };
    g.guncelle();
    return g;
  }
  /* Yol boyunca ok: 6 birim kalın çizgi, 16 birimlik ok başı. pay 0…1 çizilen kısım. */
  function ok(c, svg, renk, kalin = 6) {
    const g = c.S('g', {}, svg);
    const cizgi = c.S('path', { style: 'fill:none;stroke:' + renk + ';stroke-width:' + kalin + ';stroke-linecap:round;stroke-linejoin:round' }, g);
    const bas = c.S('path', { style: 'fill:' + renk + ';stroke:none' }, g);
    g.ciz = (pts, pay = 1) => {
      const boy = [0];
      for (let i = 1; i < pts.length; i++) boy.push(boy[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const hedef = boy[boy.length - 1] * Math.min(1, Math.max(0, pay));
      const cikti = [pts[0]];
      let uc = pts[0], yon = [1, 0];
      for (let i = 1; i < pts.length; i++) {
        if (boy[i] <= hedef) { cikti.push(pts[i]); uc = pts[i]; yon = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]; continue; }
        const t = (hedef - boy[i - 1]) / (boy[i] - boy[i - 1] || 1);
        if (t > 0) { uc = [lerp(pts[i - 1][0], pts[i][0], t), lerp(pts[i - 1][1], pts[i][1], t)]; cikti.push(uc); yon = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]; }
        break;
      }
      const n = Math.hypot(yon[0], yon[1]) || 1, ux = yon[0] / n, uy = yon[1] / n;
      cizgi.setAttribute('d', 'M' + cikti.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L'));
      bas.setAttribute('d', hedef < 4 ? '' : 'M' + (uc[0] + ux * 10).toFixed(1) + ' ' + (uc[1] + uy * 10).toFixed(1) + 'L' + (uc[0] - ux * 6 - uy * 8).toFixed(1) + ' ' + (uc[1] - uy * 6 + ux * 8).toFixed(1) + 'L' + (uc[0] - ux * 6 + uy * 8).toFixed(1) + ' ' + (uc[1] - uy * 6 - ux * 8).toFixed(1) + 'Z');
    };
    return g;
  }
  /* Döngünün iki kolu: ilk yarı turuncu (yükselen), ikinci yarı mavi (inen). */
  async function donguCiz(c, svg, f, ad, ms = 1200) {
    const sicak = ok(c, svg, SICAK), soguk = ok(c, svg, SOGUK);
    const yol = () => f.yol(ad);
    await c.tween(ms, (e) => sicak.ciz(yol().slice(0, 13), e), ease.linear);
    await c.tween(ms, (e) => soguk.ciz(yol().slice(12), e), ease.linear);
    return { guncelle: () => { sicak.ciz(yol().slice(0, 13), 1); soguk.ciz(yol().slice(12), 1); }, sil: () => { sicak.remove(); soguk.remove(); } };
  }

  /* ---- Sahne 1 · Bütün noktalar; soba yanar, döngü çizilir; kadraj tum → soba → tum ---- */
  async function noktalar(c) {
    const { svg, f } = kur(c);
    await belir(c, f.el, 500);
    /* Noktalar iki öbekte: 'el', 'tavan' ve 'taban' ekranda odanın ortasına düşer, ötekilerle birlikte yazılınca üst üste gelir. */
    const obek = async (adlar, liste, soz) => {
      const halka = isaretler(c, svg, f, adlar);
      const ad = etiketler(c, svg, f, liste);
      await belir(c, [ad, halka]);
      await c.say(soz, { speak: soz });
      await c.tween(300, (e) => { ad.style.opacity = 1 - e; halka.style.opacity = 1 - e; });
      ad.remove(); halka.remove();
    };
    await obek(['soba', 'petek', 'isitici', 'pencere.ust', 'pencere.alt', 'pencere.dis', 'tavan.termometre', 'taban.termometre'], [
      ['soba', 'soba', -70, -2], ['petek', 'petek', -30, 64], ['isitici', 'ısıtıcı', 30, 26],
      ['pencere.ust', 'üst', -22, -36], ['pencere.alt', 'alt', -50, 26], ['pencere.dis', 'dışarı', 0, 0, { hiza: 'middle', renk: SOGUK }],
      ['tavan.termometre', '18 °C', 16, 4, { renk: SARI }], ['taban.termometre', '18 °C', 16, 4, { renk: SARI }],
    ], 'Kesit oda: soba, petek, ısıtıcı, pencere ve iki termometre.');
    await obek(['el', 'tavan', 'taban'], [['el', 'el', -34, 8], ['tavan', 'tavan', 12, -8], ['taban', 'taban', -44, 40]], 'Elin yeri, tavan hizası ve taban hizası.');
    await c.tween(600, (e) => f.ayar({ soba: e }));
    const d = await donguCiz(c, svg, f, 'dongu');
    const okuma = etiketler(c, svg, f, [['tavan.termometre', 'tavan', 16, 4, { renk: SARI }], ['taban.termometre', 'taban', 16, 4, { renk: SARI }]]);
    await c.tween(3000, (e) => { f.ayar({ tavan: lerp(18, 40, e), taban: lerp(18, 22, e) }); okuma.guncelle(); }, ease.out);
    await c.say('Soba yandı: tavandaki sütun tabandakinden çok yükseldi.', { speak: 'Soba yandı: tavandaki sütun tabandakinden çok yükseldi.' });
    await kadraj(c, f, O.kadraj.tum, O.kadraj.soba, () => { d.guncelle(); okuma.guncelle(); });
    await c.say('Kapak camı ve üst tabla kızgın.', { speak: 'Kapak camı ve üst tabla kızgın.' });
    await kadraj(c, f, O.kadraj.soba, O.kadraj.tum, () => { d.guncelle(); okuma.guncelle(); });
  }

  /* ---- Sahne 2 · Senaryo E2 sahne 4: petek açılır, petekDongu okları, tavan 18 → 32, taban 18 → 26, "konveksiyon" ---- */
  async function petek(c) {
    const { svg, f } = kur(c);
    await c.wait(300);
    f.ayar({ petek: 1 });
    const [px, py] = f.nokta('petek');
    const ad = yazi(c, svg, 'petek', { x: px + 30, y: py + 8, renk: YAZI });
    await belir(c, ad, 300);
    await c.say('Petek çalışıyor.', { speak: 'Petek çalışıyor.' });
    const bulut = c.S('ellipse', { cx: px, cy: py, rx: 40, ry: 60, style: 'fill:' + SICAK + ';opacity:0' }, svg);
    await c.tween(500, (e) => { bulut.style.opacity = 0.3 * e; }, ease.out);
    await donguCiz(c, svg, f, 'petekDongu');
    await c.tween(3000, (e) => f.ayar({ tavan: lerp(18, 32, e), taban: lerp(18, 26, e) }), ease.out);
    const baslik = yazi(c, svg, 'konveksiyon', { x: 290, y: 95, hiza: 'middle', renk: SICAK, kalin: 600 });
    await belir(c, baslik, 300);
    await c.say('Isınan hava yükseldi, soğuyan hava indi.', { speak: 'Isınan hava yükseldi, soğuyan hava indi.' });
  }

  /* ---- Sahne 3 · Senaryo E2 sahne 8: hava boşalır, termometreler söner, ısıtıcı çalışır, ışıma 'el' noktasına gider ---- */
  async function havasiz(c) {
    const { svg, f } = kur(c);
    await c.wait(300);
    await c.tween(1200, (e) => f.ayar({ hava: 1 - e, termometre: 1 - e }), ease.inOut);
    await c.say('Odanın havası boşaltıldı.', { speak: 'Odanın havası boşaltıldı.' });
    f.ayar({ isitici: 1 });
    const g = c.S('g', {}, svg);
    const kutu = c.S('rect', { width: 100, height: 60, rx: 10, style: 'fill:var(--c2);fill-opacity:0;stroke:var(--text);stroke-width:2' }, g);
    const kutuYazi = yazi(c, g, 'el', { hiza: 'middle', renk: YAZI });
    const cam = c.S('rect', { width: 26, height: 100, rx: 13, style: 'fill:none;stroke:var(--text);stroke-width:2' }, g);
    const sutun = c.S('rect', { width: 12, rx: 6, style: 'fill:var(--c5)' }, g);
    const dalga = ok(c, svg, SICAK, 4);
    let sicaklik = 20;
    const guncelle = () => {
      const [x, y] = f.nokta('el');
      kutu.setAttribute('x', x - 100); kutu.setAttribute('y', y - 30);
      kutuYazi.setAttribute('x', x - 50); kutuYazi.setAttribute('y', y + 8);
      cam.setAttribute('x', x - 136); cam.setAttribute('y', y - 70);
      const boy = 20 + (sicaklik / 50) * 70;
      sutun.setAttribute('x', x - 129); sutun.setAttribute('y', y + 24 - boy); sutun.setAttribute('height', boy);
    };
    guncelle();
    await belir(c, g, 300);
    await c.tween(1400, (e) => dalga.ciz(f.yol('isima'), e), ease.linear);
    await c.tween(400, (e) => { kutu.style.fillOpacity = 0.35 * e; }, ease.out);
    await c.tween(2000, (e) => { sicaklik = lerp(20, 34, e); guncelle(); }, ease.out);
    await c.say('Hava yok, ama el ısındı: ısı ışımayla geldi.', { speak: 'Hava yok, ama el ısındı: ısı ışımayla geldi.' });
    await kadraj(c, f, O.kadraj.tum, O.kadraj.isitici, () => { guncelle(); dalga.ciz(f.yol('isima'), 1); });
    await c.say('Rezistans çubukları kızgın.', { speak: 'Rezistans çubukları kızgın.' });
    await kadraj(c, f, O.kadraj.isitici, O.kadraj.tum, () => { guncelle(); dalga.ciz(f.yol('isima'), 1); });
    await c.tween(1200, (e) => f.ayar({ hava: e, termometre: e, isitici: 1 - e }), ease.inOut);
  }

  /* ---- Sahne 4 · Senaryo E2 sahne 9: kadraj pencere; pencere açılır; üstten sıcak hava çıkar, alttan soğuk hava girer ---- */
  async function pencere(c) {
    const { svg, f } = kur(c, { petek: 1, tavan: 32, taban: 26 });
    f.bak(O.kadraj.pencere);
    await c.wait(300);
    const dis = f.nokta('pencere.dis');
    const disYazi = yazi(c, svg, 'dışarı', { x: dis[0], y: dis[1], hiza: 'middle', renk: SOGUK });
    await belir(c, disYazi, 400);
    await c.tween(1200, (e) => f.ayar({ pencere: e }), ease.inOut);
    await c.say('Pencere içeri doğru açıldı.', { speak: 'Pencere içeri doğru açıldı.' });
    const ust = ok(c, svg, SICAK), alt = ok(c, svg, SOGUK);
    await c.tween(1600, (e) => { ust.ciz(f.yol('pencereUst'), e); alt.ciz(f.yol('pencereAlt'), e); }, ease.linear);
    const pU = f.yol('pencereUst')[0], pA = f.yol('pencereAlt')[7];
    const adlar = c.S('g', {}, svg);
    yazi(c, adlar, 'sıcak', { x: pU[0] - 8, y: pU[1] + 30, hiza: 'end', renk: SICAK });
    yazi(c, adlar, 'soğuk', { x: pA[0] - 12, y: pA[1] + 36, hiza: 'end', renk: SOGUK });
    await belir(c, adlar, 300);
    await c.tween(2500, (e) => f.ayar({ tavan: lerp(32, 26, e), taban: lerp(26, 16, e) }), ease.out);
    await c.say('Sıcak hava üstten çıktı, soğuk hava alttan girdi.', { speak: 'Sıcak hava üstten çıktı, soğuk hava alttan girdi.' });
    await c.tween(300, (e) => { adlar.style.opacity = 1 - e; ust.style.opacity = 1 - e; alt.style.opacity = 1 - e; disYazi.style.opacity = 1 - e; });
    adlar.remove(); ust.remove(); alt.remove(); disYazi.remove();
    await kadraj(c, f, O.kadraj.pencere, O.kadraj.tum, () => {});
    await c.tween(900, (e) => f.ayar({ pencere: 1 - e }), ease.inOut);
  }

  Ders.start({
    id: 'enerji-p4', kicker: 'Deneme · İzometrik figür', title: 'Kesit oda', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Kesit oda', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, yollar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Noktalar ve soba', goal: 'Bütün noktalar; soba, döngü, soba kadrajı.', run: noktalar },
      { title: 'Petek', goal: 'Petek döngüsü; iki termometre ayrışır.', run: petek },
      { title: 'Havasız oda', goal: 'Hava boşalır; ısıtıcı ve ışıma.', run: havasiz },
      { title: 'Pencere', goal: 'Pencere açılır; iki hava akımı.', run: pencere },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Soba yanınca hangi termometre daha çok yükseldi?', options: ['Tavandaki', 'Tabandaki'], answer: 0, why: ['Isınan hava yükselir.', 'Soğuyan hava aşağıda kalır.'], scene: 0 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
