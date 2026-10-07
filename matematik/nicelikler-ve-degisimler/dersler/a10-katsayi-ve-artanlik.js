/* A10 — Katsayı ve artanlık-azalanlık
   h(x) = ax + b: a pozitifse artan, negatifse azalan. Örüntü → varsayım → kontrol → önerme.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, tablo } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };

  /* Tahta koordinatlarıyla küçük ok (yön simgesi). */
  function okCiz(p, x1, y1, x2, y2, renk) {
    const g = S('g', {}, p), L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, k = 11;
    S('line', { x1, y1, x2: x2 - ux * k, y2: y2 - uy * k, stroke: renk, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
    S('path', { d: `M${x2},${y2} L${x2 - ux * k - uy * k * 0.55},${y2 - uy * k + ux * k * 0.55} L${x2 - ux * k + uy * k * 0.55},${y2 - uy * k - ux * k * 0.55} Z`, fill: renk }, g);
    return g;
  }
  /* y = ax + b doğrusunun düzlem kutusunda görünen x aralığı */
  function aralik(dz, a, b) {
    const u = (dz.ymin - b) / a, v = (dz.ymax - b) / a;
    return [Math.max(dz.xmin, Math.min(u, v)), Math.min(dz.xmax, Math.max(u, v))];
  }
  const isaretRengi = (a) => (a > 0 ? RENK.arti : a < 0 ? RENK.eksi : RENK.soluk);

  /* ---- 1. Taksi ---- */
  async function taksi(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 100, y0: 60, w: 430, h: 420, xmin: 0, xmax: 4, ymin: 0, ymax: 100, xadim: 1, yadim: 10, xsayi: 1, ysayi: 20, xad: 'km', yad: 'lira' });
    const h = dogru(dz, 20, 30, { renk: RENK.g, x1: 0, x2: 4 }); gizle(h.el);
    const noktalar = [0, 1, 2, 3].map((x) => nokta(dz, x, 20 * x + 30, { renk: RENK.g, r: 8 }));
    gizle(noktalar.map((n) => n.el));
    const kuralT = yazi(svg, 765, 130, [['h(x)', RENK.g], ' = ', ['20', RENK.sifir], 'x + 30'], { size: 38, kalin: 700 });
    const genel = yazi(svg, 765, 190, [['h(x)', RENK.g], ' = ', ['a', RENK.sifir], 'x + b'], { size: 38, kalin: 700 });
    const tb = tablo(svg, { x: 596, y: 250, basliklar: ['km', 'lira'], n: 4, hucre: 62, yuk: 54, basGen: 90, size: 26, renkler: [RENK.soluk, RENK.g] });
    gizle(kuralT, genel, tb.g);

    await par(soyle(c, 'Taksi açılışta 30 lira yazar; her kilometrede 20 lira ekler.'), belir(c, kuralT, 450));
    await par(soyle(c, 'Tabloya ve grafiğe aynı değerleri koyalım.'), (async () => {
      await belir(c, tb.g, 350);
      for (let k = 0; k < 4; k++) {
        tb.yaz(0, k, String(k)); tb.yaz(1, k, String(20 * k + 30), RENK.g);
        await pop(c, noktalar[k], dz.X(k), dz.Y(20 * k + 30), 320); await c.wait(120);
      }
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Yol uzayınca ücret düşebilir mi?',
      options: ['Düşebilir', 'Hayır, hep artar', 'Aynı kalır'], answer: 1,
      hints: ['Her kilometre ücrete 20 lira ekliyor; çıkaran bir şey yok.', '', 'Tabloda her kilometrede ücret 20 lira büyüyor.'],
      right: 'Her kilometrede 20 lira eklenir; ücret hep artar.',
    });
    await par(soyle(c, 'Noktaları birleştir: doğru sağa gittikçe yükseliyor.'), ciz(c, h, 1100));
    await soyle(c, 'Sağa gittikçe yükselen fonksiyon artandır.');
    await kaybol(c, tb.g, 300);
    await par(soyle(c, 'Doğrusal fonksiyonların genel biçimi böyle yazılır.'), belir(c, genel, 450));
    await soyle(c, 'Burada a = 20, b = 30.');
    await soyle(c, 'Peki her doğrusal fonksiyon artan mı?');
  }

  /* ---- 2. Örüntü ara ---- */
  async function oruntu(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, Object.assign({ xsayi: 4, ysayi: 4, xad: '', yad: '' }, D));
    const KURALLAR = [[2, 1], [0.5, -3], [-1, 2], [-3, -1]];
    const SY = [160, 212, 366, 418], SX = 630;
    const cizgiler = KURALLAR.map(([a, b]) => dogru(dz, a, b, { renk: RENK.g }));
    const satir = SY.map((y) => yazi(svg, SX, y, '', { size: 32, kalin: 700, hiza: 'start' }));
    const oklar = KURALLAR.map(([a], i) => okCiz(svg, SX + 200, SY[i] - 11 + (a > 0 ? 11 : -11), SX + 230, SY[i] - 11 + (a > 0 ? -11 : 11), RENK.g));
    const bas = [104, 310].map((y) => yazi(svg, SX, y, '', { size: 26, kalin: 650, hiza: 'start', renk: RENK.soluk }));
    const p = nokta(dz, 0, 0, { r: 9 });
    gizle(cizgiler.map((d) => d.el), satir, oklar, bas, p.el);
    /* i. kuralı yazar; renkli ise a'yı işaretinin rengiyle boyar */
    const satirYaz = (i, renkli) => {
      const [a, b] = KURALLAR[i], tam = kural(a, b), kes = tam.indexOf('x');
      yaz(satir[i], [[tam.slice(0, kes), renkli ? isaretRengi(a) : RENK.yazi], tam.slice(kes)]);
    };
    const SOZ = ['Birincide nokta sağa yürürken yükseliyor.', 'İkincisi eksenin altında başlıyor ama yine yükseliyor.',
      'Üçüncüde nokta sağa yürürken alçalıyor.', 'Dördüncü de alçalıyor, üstelik daha hızlı.'];

    await soyle(c, 'Dört doğrusal fonksiyonu sırayla çizelim.');
    for (let i = 0; i < 4; i++) {
      const [a, b] = KURALLAR[i], [lo, hi] = aralik(dz, a, b);
      satirYaz(i, false);
      await par(soyle(c, SOZ[i]), (async () => {
        await par(belir(c, satir[i], 300), belir(c, cizgiler.slice(0, i).map((d) => d.el), 300, 0.3));
        await ciz(c, cizgiler[i], 600);
        p.git(lo, a * lo + b); await belir(c, p.el, 150);
        await c.tween(1500, (e) => { const x = lerp(lo, hi, e); p.git(x, a * x + b); }, ease.inOut);
        await par(kaybol(c, p.el, 200), belir(c, oklar[i], 300));
      })());
    }
    yaz(bas[0], 'artan'); yaz(bas[1], 'azalan');
    await par(soyle(c, 'Sağa gittikçe alçalan fonksiyona <b>azalan</b> denir.'), belir(c, cizgiler.map((d) => d.el).concat(bas), 400));
    c.note('<b>Azalan:</b> x büyürse h(x) küçülür.<br>−x + 2 azalandır', 'Azalan fonksiyon', 'a10-azalan');
    await c.choice({
      tag: 'Tahmin et', q: 'Artanlarla azalanları ayıran ne?',
      options: ['b’nin işareti', 'a’nın işareti', 'Doğrunun eksenin altında kalması'], answer: 1,
      hints: ['2x + 1 ile −x + 2: ikisinde de b pozitif; biri artan, biri azalan.', '', '0,5x − 3 çoğu yerde eksenin altında ama artan.'],
      right: 'Artanlarda a pozitif, azalanlarda a negatif.',
    });
    for (let i = 0; i < 4; i++) satirYaz(i, true);
    await kaybol(c, bas, 200);
    yaz(bas[0], [['a > 0', RENK.arti], ': artan']); yaz(bas[1], [['a < 0', RENK.eksi], ': azalan']);
    await par(soyle(c, 'Varsayımımız: a pozitifse artan, negatifse azalan.'), belir(c, bas, 450));
  }

  /* ---- 3. Kontrol et ---- */
  async function kontrol(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const st = { 'stroke-width': 4, 'stroke-linecap': 'round' };
    const yat = S('line', Object.assign({ stroke: RENK.soluk }, st), dz.orta), dik = S('line', st, dz.orta);
    const d = dogru(dz, 2, -4, { renk: RENK.g });
    const kuralT = yazi(svg, 765, 160, '', { size: 40, kalin: 700 });
    const durum = yazi(svg, 765, 225, '', { size: 30, kalin: 700 });
    const koy = (a, b) => {
      d.ayarla(a, b);
      yat.setAttribute('x1', dz.X(0)); yat.setAttribute('y1', dz.Y(b)); yat.setAttribute('x2', dz.X(1)); yat.setAttribute('y2', dz.Y(b));
      dik.setAttribute('x1', dz.X(1)); dik.setAttribute('y1', dz.Y(b)); dik.setAttribute('x2', dz.X(1)); dik.setAttribute('y2', dz.Y(a + b));
      dik.setAttribute('stroke', isaretRengi(a));
      yaz(kuralT, [['h(x)', RENK.g], ' = ' + kural(a, b)]);
      yaz(durum, a > 0 ? 'a > 0: artan' : a < 0 ? 'a < 0: azalan' : 'a = 0: sabit'); durum.style.fill = isaretRengi(a);
    };
    koy(2, -4); gizle(d.el, yat, dik, durum);

    await soyle(c, 'Varsayımı yeni bir örnekte deneyelim.');
    await c.choice({
      tag: 'Tahmin et', q: 'Burada b negatif. h artan mı, azalan mı?',
      options: ['Azalan', 'Artan'], answer: 1,
      hints: ['b yalnızca doğrunun yerini belirler; yönüne a karar verir.', ''],
      right: 'a = 2 pozitif: h artan.',
    });
    await par(soyle(c, 'Doğru eksenin altında başlıyor ama sağa gittikçe yükseliyor.'), (async () => {
      await ciz(c, d, 900); await belir(c, [yat, dik, durum], 400);
    })());
    let A = 2, B = -4;
    await soyle(c, 'a ile b’yi değiştir; varsayım hiç bozuluyor mu?', { noWait: true });
    c.slider({ label: 'a', min: -3, max: 3, step: 0.5, value: A, fmt: (v) => sayi(v), onInput: (v) => { A = v; koy(A, B); } });
    c.slider({ label: 'b', min: -4, max: 4, step: 1, value: B, fmt: (v) => sayi(v), tag: false, onInput: (v) => { B = v; koy(A, B); } });
    await c.cont('Devam ›');
    await soyle(c, 'b yalnızca yeri değiştirdi; artan mı azalan mı, a belirledi.');
  }

  /* ---- 4. Önerme ---- */
  async function onerme(c) {
    const svg = c.svg(1000, 562);
    const KUTU = { x0: 150, w: 210, h: 210, sayilar: false, xad: '', yad: '' };
    /* Küçük düzlemde bir doğru demeti: aynı işaretli a'lar */
    const demet = (y0, ab) => { const dz = duzlem(svg, Object.assign({ y0 }, KUTU)); const ds = ab.map(([a, b]) => dogru(dz, a, b, { renk: RENK.g, kalin: 3.5 })); gizle(dz.g, ds.map((d) => d.el)); return { dz, ds }; };
    const ust = demet(46, [[0.5, -1], [1, 2], [2, -3], [3, 1]]), alt = demet(306, [[-0.5, 1], [-1, -2], [-2, 3], [-3, -1]]);
    const TX = 460, satir = (y, metin) => { const t = yazi(svg, TX, y, metin, { size: 32, kalin: 700, hiza: 'start' }); gizle(t); return t; };
    const a1 = satir(120, [['∀a > 0', RENK.arti], ' için']), a2 = satir(170, [['h(x)', RENK.g], ' = ax + b artandır.']);
    const taksiT = satir(228, [['taksi:', RENK.soluk], ' a = 20']); taksiT.setAttribute('font-size', 26);
    const b1 = satir(380, [['∀a < 0', RENK.eksi], ' için']), b2 = satir(430, [['h(x)', RENK.g], ' = ax + b azalandır.']);
    const demetAc = async (dm) => { await belir(c, dm.dz.g, 300); for (const d of dm.ds) await ciz(c, d, 380); };

    await soyle(c, 'Varsayım her denemede tuttu; şimdi önerme olarak yazalım.');
    await par(soyle(c, 'a pozitifken doğru hep yükseldi.'), demetAc(ust));
    await par(soyle(c, 'Niceleyiciyle yaz: her pozitif a için.'), (async () => { await belir(c, a1, 400); await belir(c, a2, 400); })());
    await par(soyle(c, 'a negatifken doğru hep alçaldı.'), demetAc(alt));
    await par(soyle(c, 'Negatif a için önerme “azalandır” diye biter.'), (async () => { await belir(c, b1, 400); await belir(c, b2, 400); })());
    await par(soyle(c, 'Taksiye dön: kilometre ücreti 20, yani a pozitif.'), belir(c, taksiT, 450));
    await soyle(c, 'Kilometre ücreti pozitif oldukça ücret hiç düşmez.');
    c.note('<b>a &gt; 0:</b> ax + b artan.<br><b>a &lt; 0:</b> azalan.', 'Katsayı ve artanlık', 'a10-onerme');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a10', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Katsayı ve artanlık-azalanlık', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Katsayı ve artanlık-azalanlık', hook: 'Taksimetre açılışta 30 lira gösteriyorsa <b>yol uzadıkça ücret hiç düşebilir mi?</b>', button: 'Derse başla ›' },
    goals: ['Doğrusal fonksiyonun artan mı azalan mı olduğunu a’nın işaretinden söyler.', 'Varsayımını yeni örneklerle kontrol eder.', 'Genellemeyi niceleyiciyle önerme olarak yazar.'],
    scenes: [
      { title: 'Taksi', goal: 'Taksi ücretinin artan bir fonksiyon olduğunu gör.', run: taksi },
      { title: 'Örüntü ara', goal: 'Dört doğruda artanla azalanı ayıranı bul.', run: oruntu },
      { title: 'Kontrol et', goal: 'Varsayımı yeni a ve b değerleriyle dene.', run: kontrol },
      { title: 'Önerme', goal: 'Genellemeyi niceleyiciyle yaz.', run: onerme },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'h(x) = −2x + 9 için hangisi doğrudur?', options: ['Artandır, çünkü 9 pozitif', 'Azalandır', 'Sabittir'], answer: 1,
        why: ['9 yalnızca doğrunun yerini belirler; yönüne a karar verir.', 'a = −2 negatif: fonksiyon azalandır.', 'Sabit olması için a = 0 olmalıydı.'], scene: 1 },
      { q: 'h(x) = ax − 5 artan ise a hangisi olabilir?', options: ['−3', '0', '3'], answer: 2,
        why: ['a negatifse fonksiyon azalan olur.', 'a = 0 ise fonksiyon sabittir: h(x) = −5.', 'a = 3 pozitif: fonksiyon artandır.'], scene: 3 },
    ],
    summary: [
      '<b>a pozitifse artar, negatifse azalır.</b>',
      '∀a &gt; 0 için h(x) = ax + b artandır; ∀a &lt; 0 için azalandır.',
      'b yalnızca doğrunun yerini değiştirir.',
    ],
    nextLesson: { href: 'a11-ax-b-nin-isareti.html', label: 'Sonraki: ax + b’nin işareti ›' },
  });
})();
