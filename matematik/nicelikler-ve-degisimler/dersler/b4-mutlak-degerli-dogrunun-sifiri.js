/* B4 — |ax + b|'nin sıfırı
   h doğrusal iken ±|h(x)|'in sıfırı h'nin sıfırıdır; grafik tam orada kırılır. h ile |h|'in nitel özelliklerinin farkı.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, katla, nokta, alan, etiket, tablo, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const obeb = (a, b) => (b ? obeb(b, a % b) : Math.abs(a));
  /* p/q kesrini sadeleştirip yazar: (−4, 2) → "−2" · (4, 3) → "4/3" */
  const kesir = (p, q) => { const g = obeb(p, q) || 1; p /= g; q /= g; return q === 1 ? sayi(p) : (p < 0 ? '−' : '') + Math.abs(p) + '/' + q; };

  /* ---- 1. Kat farkı ---- */
  async function katFarki(c) {
    const svg = c.svg(1000, 562);
    // bina: 0–6. katlar, asansör 3. katta
    const bina = S('g', {}, svg), KY = 54, fy = (k) => 458 - k * KY - KY / 2;
    S('rect', { x: 250, y: 80, width: 100, height: 7 * KY, rx: 6, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2.5 }, bina);
    for (let k = 1; k < 7; k++) S('line', { x1: 250, y1: 458 - k * KY, x2: 350, y2: 458 - k * KY, stroke: RENK.kenar, 'stroke-width': 2 }, bina);
    for (let k = 0; k <= 6; k++) yazi(bina, 228, fy(k) + 8, String(k), { size: 22, renk: RENK.soluk, kalin: 500, hiza: 'end' });
    const asansor = S('rect', { x: 262, y: fy(3) - 20, width: 76, height: 40, rx: 6, fill: RENK.sifir }, bina);
    const sen = S('circle', { cx: 392, cy: fy(5), r: 13, fill: RENK.yazi }, bina);
    const olcu = S('line', { x1: 440, x2: 440, y1: fy(3), y2: fy(3), stroke: RENK.mutlak, 'stroke-width': 7, 'stroke-linecap': 'round' }, bina);
    const farkT = yazi(bina, 462, 0, '', { size: 28, kalin: 700, renk: RENK.mutlak, hiza: 'start' });
    const senKoy = (k) => {
      sen.setAttribute('cy', fy(k)); olcu.setAttribute('y2', fy(k));
      yaz(farkT, 'fark: ' + sayi(Math.round(Math.abs(k - 3)))); farkT.setAttribute('y', (fy(3) + fy(k)) / 2 + 9);
    };
    senKoy(5);
    gizle(bina, olcu, farkT);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460, xmin: -2, xmax: 8, ymin: -5, ymax: 5, xsayi: 3, ysayi: 3 });
    const h = dogru(dz, 1, -3, { renk: RENK.f });
    const p = nokta(dz, 3, 0, { r: 10 });
    const hT = yazi(svg, 765, 160, 'h(x) = x − 3', { size: 38, kalin: 700, renk: RENK.f });
    const tT = yazi(svg, 765, 260, 't(x) = |x − 3|', { size: 38, kalin: 700, renk: RENK.mutlak });
    const sT = yazi(svg, 765, 360, ['sıfırı:  ', ['x = 3', RENK.sifir]], { size: 34 });
    gizle(dz.g, h.el, p.el, hT, tT, sT);

    await par(soyle(c, 'Asansör 3. katta bekliyor; sen x. kattasın.', { speak: 'Asansör üçüncü katta bekliyor; sen x numaralı kattasın.' }), belir(c, bina, 500));
    await par(soyle(c, '5. kattaysan aradaki fark 2 kat; 1. kattaysan yine 2.', { speak: 'Beşinci kattaysan aradaki fark iki kat; birinci kattaysan yine iki.' }), (async () => {
      await belir(c, [olcu, farkT], 300);
      await c.wait(1100);
      await c.tween(1300, (e) => senKoy(lerp(5, 1, e)), ease.inOut);
    })());
    await par(soyle(c, 'Fark negatif olmaz: kat farkı x − 3’ün mutlak değeridir.', { speak: 'Fark negatif olmaz: kat farkı, x eksi üç ifadesinin mutlak değeridir.', ton: 'thoughtful' }), belir(c, tT, 500));
    await kaybol(c, bina, 350);
    await belir(c, dz.g, 400);
    await par(soyle(c, 'Önce mutlak değerin içindeki doğruyu çiz.'), ciz(c, h, 800), belir(c, hT, 400));
    await par(soyle(c, 'h’nin sıfırı 3: doğru ekseni orada keser.', { speak: 'h fonksiyonunun sıfırı üç: doğru ekseni orada keser.' }), pop(c, p, dz.X(3), dz.Y(0), 450));
    await c.choice({
      tag: 'Tahmin et', q: '|x − 3| nerede sıfır olur?',
      options: ['x = −3', 'x = 3', 'x = 0'], answer: 1,
      hints: ['|−3 − 3| = 6 eder; sıfır değil.', '', '|0 − 3| = 3 eder; sıfır değil.'],
      right: '|3 − 3| = 0: asansörle aynı kattasın.',
    });
    await par(soyle(c, 'Eksenin altındaki kısmı yukarı katla.'), katla(c, dz, 1, -3, { renk: RENK.mutlak, ms: 1600 }), belir(c, h.el, 600, 0.45));
    await par(soyle(c, 'V’nin ucu tam 3’te: h’nin sıfırı, |h|’in de sıfırı.', { speak: 'V’nin ucu tam üçte: hem h fonksiyonunun hem de h’nin mutlak değerinin sıfırı.' }), belir(c, sT, 500), pop(c, p, dz.X(3), dz.Y(0), 450));
    c.note('<b>|h(x)|’in sıfırı h’nin sıfırıdır.</b><br>|x − 3| = 0 → x = 3', '|h|’in sıfırı', 'b4-sifir');
  }

  /* ---- 2. a ve b değişirse ---- */
  async function aVeB(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460, xmin: -7, xmax: 7, ymin: -7, ymax: 7, xsayi: 2, ysayi: 7 });
    const h = dogru(dz, 1, -3, { renk: RENK.f, kalin: 3 }); h.el.style.opacity = 0.5;
    const v = kirik(dz, mutlakNoktalar(dz, 1, -3));
    const p = nokta(dz, 3, 0, { r: 10 });
    const tT = yazi(svg, 765, 170, '', { size: 42, kalin: 700, renk: RENK.mutlak });
    const hT = yazi(svg, 765, 250, '', { size: 30, renk: RENK.f });
    const sT = yazi(svg, 765, 360, '', { size: 34 });
    const ciz_ = (a, b) => { h.ayarla(a, b); v.ayarla(mutlakNoktalar(dz, a, b)); p.git(-b / a, 0); };
    const koy = (a, b) => {
      ciz_(a, b);
      yaz(tT, 't(x) = |' + kural(a, b) + '|'); yaz(hT, 'h(x) = ' + kural(a, b));
      yaz(sT, ['kırılma:  ', ['x = ' + kesir(-b, a), RENK.sifir]]);
    };
    koy(1, -3);
    await soyle(c, 'İçteki doğru değişirse V nereye gider?', { ton: 'curious' });
    yaz(tT, 't(x) = |2x − 4|'); yaz(hT, 'h(x) = 2x − 4'); gizle(sT);
    await c.choice({
      tag: 'Tahmin et', q: '|2x − 4| grafiği hangi x’te kırılır?',
      options: ['x = −4', 'x = 4', 'x = 2'], answer: 2,
      hints: ['Kırılma, içteki 2x − 4’ün sıfır olduğu yerdedir.', '2 · 4 − 4 = 4 eder; sıfır değil.', ''],
      right: '2x − 4 = 0 için x = 2: grafik orada kırılır.',
    });
    await par(soyle(c, 'V dikleşti ve kaydı; ucu yine içteki doğrunun sıfırında.'), c.tween(1500, (e) => ciz_(lerp(1, 2, e), lerp(-3, -4, e)), ease.inOut));
    koy(2, -4); await belir(c, sT, 400);
    let A = 2, B = -4;
    await soyle(c, 'a ve b’yi değiştir; kırılma noktasını izle.', { noWait: true });
    c.slider({ label: 'a', min: 1, max: 3, step: 1, value: 2, onInput: (x) => { A = x; koy(A, B); } });
    c.slider({ label: 'b', tag: false, min: -6, max: 6, step: 1, value: -4, fmt: (x) => sayi(x), onInput: (x) => { B = x; koy(A, B); } });
    await c.cont('Devam ›');
    await soyle(c, 'Kırılma noktası hep h’nin sıfırında: x = −b/a.', { speak: 'Kırılma noktası hep h fonksiyonunun sıfırında: x eşittir eksi b bölü a.', dur: true });
    c.note('<b>|ax + b|</b> grafiği −b/a’da kırılır.<br>|2x − 4|: x = 2', 'Kırılma noktası', 'b4-kirilma');
  }

  /* ---- 3. h'den farkı ---- */
  async function hdenFarki(c) {
    const svg = c.svg(1000, 562);
    const kucuk = (x0) => duzlem(svg, { x0, y0: 152, w: 270, h: 270, xmin: -2, xmax: 8, ymin: -5, ymax: 5, sayilar: false, xad: '', yad: '' });
    const d1 = kucuk(36), d2 = kucuk(336);
    yazi(svg, 171, 118, 'h(x) = x − 3', { size: 26, renk: RENK.f });
    yazi(svg, 471, 118, '|h(x)| = |x − 3|', { size: 26, renk: RENK.mutlak });
    const neg1 = alan(d1, [[-2, 0], [3, 0], [-2, -5]], { renk: RENK.eksi, op: 0.3 }), poz1 = alan(d1, [[3, 0], [8, 0], [8, 5]], { renk: RENK.arti, op: 0.3 });
    const poz2 = alan(d2, [[-2, 0], [-2, 5], [3, 0], [8, 5], [8, 0]], { renk: RENK.arti, op: 0.3 });
    dogru(d1, 1, -3, { renk: RENK.f }); kirik(d2, mutlakNoktalar(d2, 1, -3));
    const s1 = nokta(d1, 3, 0, { r: 8 }), s2 = nokta(d2, 3, 0, { r: 8 });
    const e1 = etiket(d1, 3, 0, '3', { dx: 16, dy: 28, size: 22, renk: RENK.sifir }), e2 = etiket(d2, 3, 0, '3', { dy: 30, size: 22, renk: RENK.sifir });
    const g1 = nokta(d1, -1.5, -4.5, { renk: RENK.yazi, r: 7 }), g2 = nokta(d2, -1.5, 4.5, { renk: RENK.yazi, r: 7 });
    gizle(neg1.el, poz1.el, poz2.el, s1.el, s2.el, e1, e2, g1.el, g2.el);
    const T = { x: 632, y: 152, hucre: 112, yuk: 62, basGen: 124 };
    const tb = tablo(svg, Object.assign({ basliklar: ['', 'işaret', 'artanlık', 'en küçük'], n: 2, size: 22, renkler: [RENK.soluk, RENK.yazi, RENK.yazi, RENK.yazi] }, T));
    tb.yaz(0, 0, 'h', RENK.f); tb.yaz(0, 1, '|h|', RENK.mutlak);
    // tablo hücresine çizilen yön oku: noktalar hücre merkezine göre
    const yon = (r, k, pts) => {
      const cx = T.x + T.basGen + k * T.hucre + T.hucre / 2, cy = T.y + r * T.yuk + T.yuk / 2, g = S('g', {}, svg);
      S('path', { d: pts.map(([x, y], i) => (i ? 'L' : 'M') + (cx + x) + ',' + (cy + y)).join(' '), fill: 'none', stroke: RENK.yazi, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
      const [ux, uy] = pts[pts.length - 1];
      S('path', { d: `M${cx + ux + 5},${cy + uy - 5} l-13,1 l12,12 z`, fill: RENK.yazi }, g);
      gizle(g); return g;
    };
    const ok1 = yon(2, 0, [[-20, 12], [18, -12]]), ok2 = yon(2, 1, [[-26, -12], [-4, 12], [18, -12]]);

    await soyle(c, 'Doğru ile katlanmış hâlini yan yana koy.');
    await par(soyle(c, 'h sıfırda işaret değiştirir; |h| hiç negatif olmaz.', { speak: 'h fonksiyonu sıfırda işaret değiştirir; h’nin mutlak değeri hiç negatif olmaz.' }), belir(c, [neg1.el, poz1.el, poz2.el], 500));
    tb.yaz(1, 0, [['−', RENK.eksi], ', 0, ', ['+', RENK.arti]]); tb.yaz(1, 1, ['0, ', ['+', RENK.arti]]);
    await c.wait(500);
    await kaybol(c, [neg1.el, poz1.el, poz2.el], 300);
    await c.choice({
      tag: 'Tahmin et', q: 'h artan. |h| de baştan sona artan mı?',
      options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Sol kola bak: sağa gittikçe grafik alçalıyor.', ''],
      right: 'Katlanan kısım yön değiştirdi: solda azalan, sağda artan.',
    });
    g1.el.style.opacity = 1; g2.el.style.opacity = 1;
    await par(soyle(c, 'h hep artan; |h| sıfırın solunda azalan, sağında artan.', { speak: 'h fonksiyonu hep artan; h’nin mutlak değeri sıfırın solunda azalan, sağında artan.' }), belir(c, [ok1, ok2], 400),
      c.tween(2400, (e) => { const x = lerp(-1.5, 7.5, e); g1.git(x, x - 3); g2.git(x, Math.abs(x - 3)); }, ease.inOut));
    await kaybol(c, [g1.el, g2.el], 250);
    tb.yaz(3, 0, 'yok'); tb.yaz(3, 1, '0', RENK.sifir);
    await par(soyle(c, 'h’nin en küçük değeri yok; |h|’inki 0.', { speak: 'h fonksiyonunun en küçük değeri yok; h’nin mutlak değerinin en küçük değeri sıfır.' }), pop(c, s2, d2.X(3), d2.Y(0), 450));
    await par(soyle(c, 'Değişmeyen şey sıfır: ikisinde de x = 3.'), pop(c, s1, d1.X(3), d1.Y(0), 450), pop(c, s2, d2.X(3), d2.Y(0), 450), belir(c, [e1, e2], 400));
    c.note('<b>h ile |h|:</b> sıfırları aynı; |h| negatif olmaz, en küçük değeri 0.', 'h ile |h|', 'b4-fark');
  }

  /* ---- 4. Eksi ve sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460, xmin: -6, xmax: 6, ymin: -6, ymax: 6, xsayi: 2, ysayi: 6 });
    const h = dogru(dz, 2, -4, { renk: RENK.f, kalin: 3 }); h.el.style.opacity = 0.5;
    const v = kirik(dz, mutlakNoktalar(dz, 2, -4));
    const p = nokta(dz, 2, 0, { r: 10 });
    const tT = yazi(svg, 765, 130, 't(x) = |2x − 4|', { size: 40, kalin: 700, renk: RENK.mutlak });
    const goster = (a, b, isaret) => {   // soru kartının grafiğini düzleme koy
      h.ayarla(a, b); v.ayarla(mutlakNoktalar(dz, a, b, 0, isaret)); p.git(-b / a, 0);
      belir(c, [h.el], 350, 0.5).catch(() => {}); belir(c, [v.el, p.el], 350).catch(() => {});
    };

    await soyle(c, 'Şimdi mutlak değerin önüne bir eksi koy.');
    yaz(tT, 't(x) = −|2x − 4|');
    await par(soyle(c, 'V ters döner; tepesi yerinden oynamaz.'), c.tween(1600, (e) => {
      const k = lerp(1, -1, e);
      v.ayarla([[-6, 16 * k], [2, 0], [6, 8 * k]]);
    }, ease.inOut));
    await par(soyle(c, 'Tepe yine içteki doğrunun sıfırında.'), pop(c, p, dz.X(2), dz.Y(0), 450));
    await kaybol(c, [tT, h.el, v.el, p.el], 300);
    const tb = soruTahtasi(c, svg, { x: 580, y: 70, w: 390, h: 120, size: 38 });
    tb.ifade.style.fill = RENK.mutlak;
    await soyle(c, 'Sıra sende: üç fonksiyon, üç soru.', { noWait: true });
    await tb.sor('t(x) = |3x − 6|', {
      q: 'Grafik hangi x’te kırılır?', options: ['x = 6', 'x = −2', 'x = 2'], answer: 2,
      hints: ['3 · 6 − 6 = 12 eder; içerisi sıfır olmaz.', '3 · (−2) − 6 = −12 eder; sıfır değil.', ''],
      right: 'İçteki doğrunun sıfırı: 3x − 6 = 0 için x = 2.',
      kanit: ['3x − 6 = 0  →  ', ['x = 2', RENK.sifir]], renk: RENK.yazi, onPick: (k, ok) => { if (ok) goster(3, -6, 1); },
    });
    await kaybol(c, [h.el, v.el, p.el], 250);
    await tb.sor('t(x) = −|x + 1|', {
      q: 'En büyük değerini hangi x’te alır?', options: ['x = −1', 'x = 1', 'x = 0'], answer: 0,
      hints: ['', '−|1 + 1| = −2 eder; tepe orada değil.', '−|0 + 1| = −1 eder; daha büyüğü var.'],
      right: 'Ters V’nin tepesi, x + 1’in sıfırında: x = −1.',
      kanit: ['x + 1 = 0  →  ', ['x = −1', RENK.sifir]], renk: RENK.yazi, onPick: (k, ok) => { if (ok) goster(1, 1, -1); },
    });
    await kaybol(c, [h.el, v.el, p.el], 250);
    await tb.sor('t(x) = |2x + 4|', {
      q: 'Fonksiyonun sıfırı kaçtır?', options: ['4', '−2', '2'], answer: 1,
      hints: ['|2 · 4 + 4| = 12 eder; sıfır değil.', '', '|2 · 2 + 4| = 8 eder; işarete dikkat.'],
      right: '2x + 4 = 0 için x = −2.',
      kanit: ['2x + 4 = 0  →  ', ['x = −2', RENK.sifir]], renk: RENK.yazi, onPick: (k, ok) => { if (ok) goster(2, 4, 1); },
    });
    await soyle(c, 'Üçünde de aynı iş: içteki doğrunun sıfırını bul.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b4', kicker: 'Konu B · Mutlak değer fonksiyonu', title: '|ax + b|’nin sıfırı', accent: '#3cc8e8', back: 'index.html',
    intro: { title: '|ax + b|’nin sıfırı', hook: 'Asansör 3. kattayken <b>hangi kata gidersen kat farkı sıfır olur?</b>', button: 'Derse başla ›' },
    goals: ['|ax + b| grafiğini ax + b doğrusunu katlayarak elde eder.', 'Kırılma noktasını içteki doğrunun sıfırıyla ilişkilendirir.', 'h ile |h|’in nitel özelliklerini karşılaştırır.'],
    scenes: [
      { title: 'Kat farkı', goal: '|x − 3| grafiğinin ucunun nerede olduğunu gör.', run: katFarki },
      { title: 'a ve b değişirse', goal: 'Kırılma noktasını a ve b’ye bağla.', run: aVeB },
      { title: 'h’den farkı', goal: 'h ile |h|’in özelliklerini karşılaştır.', run: hdenFarki },
      { title: 'Eksi ve sıra sende', goal: 'Sıfırı ve kırılma noktasını kendin bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 't(x) = |2x − 10| fonksiyonunun sıfırı kaçtır?', options: ['−5', '10', '5'], answer: 2,
        why: ['|2 · (−5) − 10| = 20 eder; sıfır değil.', '|2 · 10 − 10| = 10 eder; sıfır değil.', '2x − 10 = 0 için x = 5.'], scene: 1 },
      { q: '|h(x)| grafiği h grafiğinden nasıl elde edilir?', options: ['Tamamı yukarı kayar', 'x ekseninin altındaki kısım yukarı katlanır', 'Hiç değişmez'], answer: 1,
        why: ['Eksenin üstündeki kısım yerinde kalır; yalnızca alttaki değişir.', 'Negatif çıktıların işareti çevrilir: alttaki kısım üste katlanır.', 'h negatif değer alır, |h| almaz; alttaki kısım katlanır.'], scene: 0 },
    ],
    summary: [
      '<b>|ax + b|’nin sıfırı ax + b’nin sıfırıdır; grafik orada kırılır.</b>',
      'h’nin eksen altındaki kısmı yukarı katlanınca |h| grafiği çıkar.',
      'h hep artandır; |h| sıfırın solunda azalan, sağında artandır. −|h| ters V’dir, tepesi aynı sıfırdadır.',
    ],
    nextLesson: { href: 'b5-c-ile-yukari-asagi.html', label: 'Sonraki: c ile yukarı aşağı: ±|h(x)| ± c ›' },
  });
})();
