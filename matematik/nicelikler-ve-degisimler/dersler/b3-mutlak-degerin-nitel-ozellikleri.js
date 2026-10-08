/* B3 — ±|x|'in nitel özellikleri
   |x| ve −|x| için tanım ve görüntü kümesi, sıfır, işaret, artan-azalan aralık, en büyük ve en küçük değer; f(x) = x ile karşılaştırma.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md */
(() => {
  'use strict';
  const { RENK, S, yaz, yazi, sigdir, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, serit, alan, parcali, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const DZ = { x0: 70, y0: 50, w: 460, h: 460, xmin: -4, xmax: 4, ymin: -4, ymax: 4 };
  /* Ucu (x, y) düzlem noktasında, ekranda (dx, dy) yönüne bakan küçük ok başı: "kol böyle sürer". */
  function okUcu(dz, x, y, dx, dy, renk) {
    const px = dz.X(x), py = dz.Y(y), n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n;
    return S('path', { d: `M${px + ux * 9},${py + uy * 9} L${px - ux * 9 - uy * 10},${py - uy * 9 + ux * 10} L${px - ux * 9 + uy * 10},${py - uy * 9 - ux * 10} z`, fill: renk }, dz.on);
  }
  const satirlar = (svg, y0, aralik, metinler, size = 30) => metinler.map((m, i) => { const t = yazi(svg, 590, y0 + i * aralik, m, { size, hiza: 'start' }); gizle(t); return t; });
  /* yeni satırı açar, bir öncekini soluklaştırır */
  const ac = (c, liste, i) => par(belir(c, liste[i], 450), i > 0 ? belir(c, liste[i - 1], 300, 0.45) : null);

  /* ---- 1. |x|'in özellikleri ---- */
  async function ozellikler(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const poz = alan(dz, [[-4, 0], [-4, 4], [0, 0], [4, 4], [4, 0]], { renk: RENK.arti });
    const xS = serit(dz, 'x', 0, 0), yS = serit(dz, 'y', 0, 0, { renk: RENK.g });
    kirik(dz, mutlakNoktalar(dz, 1, 0));
    const uc = nokta(dz, 0, 0, { r: 10 }), gez = nokta(dz, -3.5, 3.5, { renk: RENK.yazi, r: 9 });
    const oklar = [okUcu(dz, -3.7, 3.7, -1, -1, RENK.mutlak), okUcu(dz, 3.7, 3.7, 1, -1, RENK.mutlak)];
    gizle(poz.el, uc.el, gez.el, oklar);
    const A = satirlar(svg, 160, 70, [['tanım kümesi:  ', ['ℝ', RENK.sifir]], ['görüntü kümesi:  ', ['[0, ∞)', RENK.g]], ['sıfırı:  ', ['0', RENK.sifir]], ['x ≠ 0 iken ', ['pozitif', RENK.arti]]]);
    const B = satirlar(svg, 160, 70, ['x < 0’da azalan', 'x > 0’da artan', ['minimum noktası:  ', ['(0, 0)', RENK.sifir]], 'maksimumu yok']);

    await par(soyle(c, 'Her gerçek sayı girdi olabilir.'), c.tween(900, (e) => xS.ayarla(-4 * e, 4 * e), ease.inOut), ac(c, A, 0));
    await belir(c, xS.el, 300, 0.25);
    await par(soyle(c, 'Çıktılar sıfır ve pozitif sayılar: grafik eksenin altına inmez.'), c.tween(900, (e) => yS.ayarla(0, 4 * e), ease.inOut), ac(c, A, 1));
    await belir(c, yS.el, 300, 0.25);
    await par(soyle(c, 'Grafik x eksenine yalnızca sıfırda değiyor.'), pop(c, uc, dz.X(0), dz.Y(0), 450), ac(c, A, 2));
    await par(soyle(c, 'Sıfır dışındaki her girdide çıktı pozitif.'), belir(c, poz.el, 600), ac(c, A, 3));
    await kaybol(c, [...A, xS.el, yS.el, poz.el], 350);
    gez.el.style.opacity = 1;
    await par(soyle(c, 'Sol kolda sağa gittikçe grafik alçalıyor.'), c.tween(1500, (e) => { const x = lerp(-3.5, 0, e); gez.git(x, -x); }, ease.inOut), ac(c, B, 0));
    await par(soyle(c, 'Sağ kolda sağa gittikçe grafik yükseliyor.'), c.tween(1500, (e) => { const x = lerp(0, 3.5, e); gez.git(x, x); }, ease.inOut), ac(c, B, 1));
    await kaybol(c, gez.el, 250);
    await c.choice({
      tag: 'Tahmin et', q: '|x|’in en küçük değeri kaç?',
      options: ['En küçük değeri yok', '0', '−4'], answer: 1,
      hints: ['Grafik eksenin altına inmiyor; en alttaki noktası belli.', '', '|x| hiç negatif olmaz.'],
      right: 'En alttaki nokta (0, 0): en küçük değer 0.',
    });
    await par(soyle(c, 'En alttaki nokta <b>minimum noktası</b>: en küçük değer 0.', { dur: true }), pop(c, uc, dz.X(0), dz.Y(0), 450), ac(c, B, 2));
    await par(soyle(c, 'Kollar yukarı doğru hiç durmadan çıkar.'), belir(c, oklar, 450), ac(c, B, 3));
    await belir(c, B, 300);
    c.note('<b>|x|:</b> solda azalan, sağda artan; minimum noktası (0, 0)', '|x|’in özellikleri', 'b3-ozellik');
  }

  /* ---- 2. f(x) = x'ten farkı ---- */
  async function fark(c) {
    const svg = c.svg(1000, 562);
    const kucuk = (x0) => duzlem(svg, { x0, y0: 96, w: 280, h: 280, xmin: -4, xmax: 4, ymin: -4, ymax: 4, sayilar: false, xad: '', yad: '' });
    const d1 = kucuk(40), d2 = kucuk(362);
    yazi(svg, 180, 62, 'f(x) = x', { size: 26, renk: RENK.f });
    yazi(svg, 502, 62, 'n(x) = |x|', { size: 26, renk: RENK.mutlak });
    const neg1 = alan(d1, [[-4, 0], [0, 0], [-4, -4]], { renk: RENK.eksi, op: 0.3 }), poz1 = alan(d1, [[0, 0], [4, 0], [4, 4]], { renk: RENK.arti, op: 0.3 });
    const poz2 = alan(d2, [[-4, 0], [-4, 4], [0, 0], [4, 4], [4, 0]], { renk: RENK.arti, op: 0.3 });
    const xS = [serit(d1, 'x', 0, 0), serit(d2, 'x', 0, 0)], yS = [serit(d1, 'y', 0, 0, { renk: RENK.g }), serit(d2, 'y', 0, 0, { renk: RENK.g })];
    const y1 = dogru(d1, 0, 3, { renk: RENK.sifir, kalin: 2.5, kesik: '6 6' }), y2 = dogru(d2, 0, 3, { renk: RENK.sifir, kalin: 2.5, kesik: '6 6' });
    dogru(d1, 1, 0, { renk: RENK.f }); kirik(d2, mutlakNoktalar(d2, 1, 0));
    const s1 = nokta(d1, 0, 0, { r: 8 }), s2 = nokta(d2, 0, 0, { r: 8 });
    const g1 = nokta(d1, -3.5, -3.5, { renk: RENK.yazi, r: 7 }), g2 = nokta(d2, -3.5, 3.5, { renk: RENK.yazi, r: 7 });
    const kes = [nokta(d1, 3, 3, { r: 8 }), nokta(d2, -3, 3, { r: 8 }), nokta(d2, 3, 3, { r: 8 })];
    gizle(neg1.el, poz1.el, poz2.el, y1.el, y2.el, s1.el, s2.el, g1.el, g2.el, kes.map((k) => k.el));
    const baslik = (y, ad) => { const t = yazi(svg, 700, y, ad, { size: 22, renk: RENK.soluk, kalin: 500, hiza: 'start' }); gizle(t); return t; };
    const oge = (y, ad) => { const t = yazi(svg, 700, y, ad, { size: 27, hiza: 'start' }); gizle(t); return t; };
    const hA = baslik(100, 'aynı'), hF = baslik(244, 'farklı');
    const tanim = oge(140, 'tanım kümesi'), sifir = oge(184, 'sıfır');
    const goruntu = oge(284, 'görüntü kümesi'), isaret = oge(328, 'işaret'), artanlik = oge(372, 'artanlık'), minimum = oge(416, 'minimum'), bireBir = oge(460, 'bire birlik');
    const sonuc = yazi(svg, 341, 462, [['|−3| = |3|', RENK.sifir], ':  bire bir değil'], { size: 30 }); gizle(sonuc);

    await soyle(c, 'İki grafiği yan yana koy: hangi özellik aynı kaldı?', { ton: 'curious' });
    await par(soyle(c, 'İkisinde de her gerçek sayı girdi olabilir.'), belir(c, [hA, tanim], 400), c.tween(900, (e) => xS.forEach((s_) => s_.ayarla(-4 * e, 4 * e)), ease.inOut));
    await kaybol(c, xS.map((s_) => s_.el), 300);
    await par(soyle(c, 'İkisinin de tek sıfırı var: x = 0.'), belir(c, sifir, 400), pop(c, s1, d1.X(0), d1.Y(0), 400), pop(c, s2, d2.X(0), d2.Y(0), 400));
    await par(soyle(c, 'Çıktılar: f’de her gerçek sayı, |x|’te negatif yok.', { speak: 'Çıktılar: f fonksiyonunda her gerçek sayı, x’in mutlak değerinde negatif yok.' }), belir(c, [hF, goruntu], 400),
      c.tween(900, (e) => { yS[0].ayarla(-4 * e, 4 * e); yS[1].ayarla(0, 4 * e); }, ease.inOut));
    await kaybol(c, yS.map((s_) => s_.el), 300);
    await par(soyle(c, 'f solda negatif, sağda pozitif; |x| iki yanda da pozitif.', { speak: 'f fonksiyonu solda negatif, sağda pozitif; mutlak değer fonksiyonu iki yanda da pozitif.' }), belir(c, isaret, 400), belir(c, [neg1.el, poz1.el, poz2.el], 500));
    await kaybol(c, [neg1.el, poz1.el, poz2.el], 300);
    g1.el.style.opacity = 1; g2.el.style.opacity = 1;
    await par(soyle(c, 'f hep artan; |x| solda azalan, sağda artan.', { speak: 'f fonksiyonu hep artan; mutlak değer fonksiyonu solda azalan, sağda artan.' }), belir(c, artanlik, 400),
      c.tween(2400, (e) => { const x = lerp(-3.5, 3.5, e); g1.git(x, x); g2.git(x, Math.abs(x)); }, ease.inOut));
    await kaybol(c, [g1.el, g2.el], 250);
    await par(soyle(c, 'f’nin en küçük değeri yok; |x|’inki 0.', { speak: 'f fonksiyonunun en küçük değeri yok; mutlak değer fonksiyonunun en küçük değeri sıfır.' }), belir(c, minimum, 400), pop(c, s2, d2.X(0), d2.Y(0), 450));
    await par(soyle(c, 'Aynı yükseklikte f’de bir nokta var, |x|’te iki.', { speak: 'Aynı yükseklikte f fonksiyonunda bir nokta var, mutlak değer fonksiyonunda iki.' }), (async () => {
      await belir(c, [y1.el, y2.el], 400);
      await par(...kes.map((k) => pop(c, k, k.el.getAttribute('cx'), k.el.getAttribute('cy'), 350)));
    })());
    await c.choice({
      tag: 'Tahmin et', q: '|x| bire bir mi?',
      options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Yatay çizgi V’yi iki noktada kesti: iki girdi, tek çıktı.', ''],
      right: '−3 ve 3 farklı girdiler ama çıktıları aynı: 3.',
    });
    await par(soyle(c, 'İki farklı girdi aynı çıktıyı veriyor: |x| bire bir değil.', { speak: 'İki farklı girdi aynı çıktıyı veriyor: mutlak değer fonksiyonu bire bir değil.', ton: 'thoughtful' }), belir(c, [bireBir, sonuc], 500));
    c.note('<b>|x| bire bir değildir:</b> |−3| = |3|', '|x| ve bire birlik', 'b3-bire-bir');
  }

  /* ---- 3. Eksi koy: −|x| ---- */
  async function eksiKoy(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const yS = serit(dz, 'y', 0, 0, { renk: RENK.g });
    const golge = kirik(dz, mutlakNoktalar(dz, 1, 0), { renk: RENK.soluk, kalin: 3, kesik: true }); gizle(golge.el);
    const v = kirik(dz, mutlakNoktalar(dz, 1, 0));
    const p1 = nokta(dz, -2, 2, { renk: RENK.yazi, r: 8 }), p2 = nokta(dz, 2, 2, { renk: RENK.yazi, r: 8 }), uc = nokta(dz, 0, 0, { r: 10 });
    const oklar = [okUcu(dz, -3.7, -3.7, -1, 1, RENK.mutlak), okUcu(dz, 3.7, -3.7, 1, 1, RENK.mutlak)];
    const kuralT = yazi(svg, 765, 110, 'n(x) = |x|', { size: 46, kalin: 700, renk: RENK.mutlak });
    const pr = parcali(svg, { x: 575, y: 230, ad: '−|x| =', satirlar: [['−x', 'x ≥ 0 ise'], ['x', 'x < 0 ise']], aralik: 62, size: 32, kosulX: 90 });
    const B = satirlar(svg, 230, 68, [['maksimum noktası:  ', ['(0, 0)', RENK.sifir]], 'minimumu yok', ['görüntü kümesi:  ', ['(−∞, 0]', RENK.g]]], 28);
    gizle(p1.el, p2.el, uc.el, oklar, pr.g);

    await soyle(c, 'Şimdi |x|’in önüne bir eksi koy.', { speak: 'Şimdi x’in mutlak değerinin önüne bir eksi koy.' });
    await c.choice({
      tag: 'Tahmin et', q: '−|3| kaçtır?',
      options: ['3', '−3'], answer: 1,
      hints: ['3 eden |−3|’tür; orada eksi mutlak değerin içinde.', ''],
      right: 'Önce mutlak değer, sonra eksi: −|3| = −3.',
    });
    await belir(c, [p1.el, p2.el], 300);
    golge.el.style.opacity = 0.5;
    yaz(kuralT, 'n(x) = −|x|');
    await par(soyle(c, 'Her çıktının işareti çevrilir: V ters döner.'), c.tween(1700, (e) => {
      const k = lerp(1, -1, e);
      v.ayarla([[-4, 4 * k], [0, 0], [4, 4 * k]]); p1.git(-2, 2 * k); p2.git(2, 2 * k);
    }, ease.inOut));
    await kaybol(c, [p1.el, p2.el], 250);
    await par(soyle(c, 'Parçalı yazımda iki kuralın da işareti çevrildi.'), belir(c, pr.g, 500));
    await c.wait(500);
    await kaybol(c, pr.g, 300);
    await c.choice({
      tag: 'Tahmin et', q: '−|x|’in en büyük değeri kaç?',
      options: ['En büyük değeri yok', '4', '0'], answer: 2,
      hints: ['Grafik eksenin üstüne çıkmıyor; en üstteki noktası belli.', '−|x| hiç pozitif olmaz.', ''],
      right: 'En üstteki nokta (0, 0): en büyük değer 0.',
    });
    await par(soyle(c, 'Tepe artık en üstte: burası <b>maksimum noktası</b>.'), pop(c, uc, dz.X(0), dz.Y(0), 450), ac(c, B, 0));
    await par(soyle(c, 'Kollar aşağı doğru hiç durmadan iner.'), belir(c, oklar, 450), ac(c, B, 1));
    await par(soyle(c, 'Çıktılar sıfır ve negatif sayılar.'), c.tween(900, (e) => yS.ayarla(-4 * e, 0), ease.inOut), ac(c, B, 2));
    await belir(c, B, 300);
    c.note('<b>−|x|:</b> en büyük değer 0, görüntü kümesi (−∞, 0]<br>−|3| = −3', '−|x|', 'b3-eksi');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const neg = alan(dz, [[-4, 0], [-4, -4], [0, 0], [4, -4], [4, 0]], { renk: RENK.eksi });
    kirik(dz, mutlakNoktalar(dz, 1, 0, 0, -1));
    const gez = nokta(dz, -3.5, -3.5, { renk: RENK.yazi, r: 9 }), uc = nokta(dz, 0, 0, { r: 10 });
    gizle(neg.el, gez.el, uc.el);
    const tb = soruTahtasi(c, svg, { x: 580, y: 56, w: 390, h: 110, size: 30 });
    const onerme = satirlar(svg, 250, 62, ['−|x|, x < 0 iken artandır.', '−|x|, x ≠ 0 iken negatiftir.', '−|x|’in sıfırı 0’dır.'], 26);
    onerme.forEach((t) => { t.style.fill = RENK.iyi; sigdir(t, 390); });

    await soyle(c, '−|x| için üç soru: cevabı grafikten oku.', { noWait: true });
    await tb.sor('Nerede artan?', {
      q: '−|x| hangi x’lerde artandır?', options: ['x &gt; 0', 'x &lt; 0', 'Her x’te'], answer: 1,
      hints: ['Sağ kolda sağa gittikçe grafik alçalıyor.', '', 'Sağ kol aşağı iniyor; baştan sona artan değil.'],
      right: 'Sol kolda sağa gittikçe grafik yükselir.',
      onPick: (k, ok) => { if (ok) { onerme[0].style.opacity = 1; gez.el.style.opacity = 1; } },
    });
    await c.tween(1200, (e) => { const x = lerp(-3.5, 0, e); gez.git(x, x); }, ease.inOut);
    await kaybol(c, gez.el, 250);
    await tb.sor('Hangi x’lerde negatif?', {
      q: '−|x| hangi x’lerde negatiftir?', options: ['Her x’te', 'x &lt; 0', 'x ≠ 0'], answer: 2,
      hints: ['x = 0’da çıktı 0’dır; 0 negatif değildir.', 'Sağ kol da eksenin altında.', ''],
      right: 'Sıfır dışındaki her girdide grafik eksenin altında.',
      onPick: (k, ok) => { if (ok) { onerme[1].style.opacity = 1; neg.el.style.opacity = 1; } },
    });
    await kaybol(c, neg.el, 300);
    await tb.sor('Sıfırı kaç?', {
      q: '−|x|’in sıfırı kaçtır?', options: ['0', 'Sıfırı yok', '−1'], answer: 0,
      hints: ['', 'Grafik x eksenine tepe noktasında değiyor.', '−|−1| = −1 eder; sıfır değil.'],
      right: 'Grafik x eksenine yalnızca x = 0’da değer.',
      onPick: (k, ok) => { if (ok) { onerme[2].style.opacity = 1; uc.el.style.opacity = 1; } },
    });
    await soyle(c, 'Üç özelliği de birer cümleyle, sözel önerme olarak söyledin.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b3', kicker: 'Konu B · Mutlak değer fonksiyonu', title: '±|x|’in nitel özellikleri', accent: '#3cc8e8', back: 'index.html',
    intro: { title: '±|x|’in nitel özellikleri', hook: 'Ev ile okul arasındaki yolda <b>eve uzaklığın en az olduğu yer neresidir?</b>', button: 'Derse başla ›' },
    goals: ['|x| ve −|x|’in nitel özelliklerini grafikten okur.', 'Bu özellikleri f(x) = x’inkilerle karşılaştırır.', 'Özellikleri sözel önerme olarak söyler.'],
    scenes: [
      { title: '|x|’in özellikleri', goal: '|x|’in nitel özelliklerini grafikten oku.', run: ozellikler },
      { title: 'f(x) = x’ten farkı', goal: 'Hangi özellik aynı kaldı, hangisi değişti?', run: fark },
      { title: 'Eksi koy: −|x|', goal: 'Eksi işaretinin grafiği nasıl değiştirdiğini gör.', run: eksiKoy },
      { title: 'Sıra sende', goal: '−|x|’in özelliklerini sözel önerme olarak söyle.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'n(x) = −|x| fonksiyonunun görüntü kümesi hangisidir?', options: ['[0, ∞)', '(−∞, 0]', 'ℝ'], answer: 1,
        why: ['Bu |x|’in görüntü kümesidir; −|x| hiç pozitif olmaz.', 'En büyük değer 0’dır ve kollar aşağı iner.', '−|x| pozitif değer almaz.'], scene: 2 },
      { q: 'n(x) = |x| hangi x’lerde azalandır?', options: ['x &gt; 0', 'Hiçbir x’te', 'x &lt; 0'], answer: 2,
        why: ['Sağ kolda sağa gittikçe grafik yükselir: orada artandır.', 'Sol kolda sağa gittikçe grafik alçalır.', 'Sol kolda girdi büyürken çıktı küçülür.'], scene: 0 },
    ],
    summary: [
      '<b>|x|’in en küçük değeri 0, −|x|’in en büyük değeri 0’dır.</b>',
      '|x| solda azalan, sağda artandır; bire bir değildir: |−3| = |3|.',
      '−|x| ters V’dir: görüntü kümesi (−∞, 0], sıfırı yine 0.',
    ],
    nextLesson: { href: 'b4-mutlak-degerli-dogrunun-sifiri.html', label: 'Sonraki: |ax + b|’nin sıfırı ›' },
  });
})();
