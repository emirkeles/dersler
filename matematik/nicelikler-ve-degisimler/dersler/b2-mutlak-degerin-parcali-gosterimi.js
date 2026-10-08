/* B2 — |x|'in parçalı gösterimi
   x negatifken −x pozitiftir; |x| iki doğrunun birer yarısıdır ve iki satırlık parçalı kuralla yazılır.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, iz, parcali } = window.KIT;
  const { lerp, ease } = Ders;
  const DZ = { x0: 70, y0: 50, w: 460, h: 460, xmin: -8, xmax: 8, ymin: -8, ymax: 8, xadim: 2, yadim: 2 };

  /* V, iki kolun altındaki renkli izler ve kolları uzatan kesik yarım doğrular */
  function vDuzlemi(svg) {
    const dz = duzlem(svg, DZ);
    const sagIz = dogru(dz, 1, 0, { renk: RENK.f, kalin: 14, x1: 0 }), solIz = dogru(dz, -1, 0, { renk: RENK.g, kalin: 14, x2: 0 });
    const sagUz = dogru(dz, 1, 0, { renk: RENK.f, kalin: 3.5, kesik: true, x2: 0 }), solUz = dogru(dz, -1, 0, { renk: RENK.g, kalin: 3.5, kesik: true, x1: 0 });
    kirik(dz, mutlakNoktalar(dz, 1, 0), { renk: RENK.mutlak });
    gizle(sagIz.el, solIz.el);
    const yak = (i) => { sagIz.el.style.opacity = i === 0 ? 0.55 : 0; solIz.el.style.opacity = i === 1 ? 0.55 : 0; };
    return { dz, sagIz, solIz, sagUz, solUz, yak };
  }
  const yazim = (svg) => parcali(svg, { x: 580, y: 170, ad: '|x| =', satirlar: [[[['x', RENK.f]], 'x ≥ 0 ise'], [[['−x', RENK.g]], 'x < 0 ise']], aralik: 64, size: 34, kosulX: 90 });

  /* ---- 1. Eksi x pozitif olur mu? ---- */
  async function eksiX(c) {
    const svg = c.svg(1000, 562);
    const kart = (x, ad, deger, renk) => {
      const g = S('g', {}, svg);
      S('rect', { x, y: 34, width: 250, height: 100, rx: 14, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, g);
      yazi(g, x + 125, 66, ad, { size: 20, renk: RENK.soluk, kalin: 500 });
      yazi(g, x + 125, 114, deger, { size: 40, kalin: 700, renk });
      return g;
    };
    const hesap = kart(200, 'hesap', '−40 TL', RENK.eksi), borc = kart(550, 'borç', '40 TL', RENK.arti);
    const cevir = yazi(svg, 500, 215, ['−(', ['−40', RENK.eksi], ') = ', ['40', RENK.arti]], { size: 42, kalin: 700 });
    // sayı doğrusu: −50 … 50
    const Y0 = 300, X = (v) => 500 + v * 7.6;
    const dogruG = S('g', {}, svg);
    S('line', { x1: X(-51), y1: Y0, x2: X(51), y2: Y0, stroke: RENK.eksen, 'stroke-width': 3, 'stroke-linecap': 'round' }, dogruG);
    for (let v = -50; v <= 50; v += 10) S('line', { x1: X(v), y1: Y0 - 8, x2: X(v), y2: Y0 + 8, stroke: RENK.eksen, 'stroke-width': 2.5 }, dogruG);
    [-40, 0, 40].forEach((v) => yazi(dogruG, X(v), Y0 + 38, sayi(v), { size: 22, renk: RENK.soluk, kalin: 500 }));
    const yay = S('path', { fill: 'none', stroke: RENK.soluk, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, svg);
    const xd = S('circle', { cy: Y0, r: 11, fill: RENK.eksi }, svg), md = S('circle', { cy: Y0, r: 11, fill: RENK.arti }, svg);
    const gezgin = S('circle', { r: 8, fill: RENK.arti }, svg);
    const xT = yazi(svg, 300, 410, '', { size: 38, kalin: 700 }), mT = yazi(svg, 700, 410, '', { size: 38, kalin: 700 });
    const kuralT = yazi(svg, 500, 500, ['x < 0 ise  ', ['|x|', RENK.mutlak], ' = −x'], { size: 38, kalin: 700 });
    const tepe = (x) => Math.abs(x) * 2.4;   // yayın denetim noktasının yüksekliği
    const koy = (x) => {
      xd.setAttribute('cx', X(x)); md.setAttribute('cx', X(-x));
      yay.setAttribute('d', `M${X(x)},${Y0 - 16} Q500,${Y0 - 16 - tepe(x)} ${X(-x)},${Y0 - 16}`);
      yaz(xT, ['x = ', [sayi(x), RENK.eksi]]); yaz(mT, ['−x = ', [sayi(-x), RENK.arti]]);
    };
    koy(-40);
    gizle(hesap, borc, cevir, dogruG, yay, xd, md, gezgin, xT, mT, kuralT);

    await par(soyle(c, 'Hesabın −40 lira gösteriyor: bankaya borçlusun.'), belir(c, hesap, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Borcun kaç lira?',
      options: ['−40 lira', '40 lira'], answer: 1,
      hints: ['Borç bir miktardır; “eksi 40 lira borç” denmez.', ''],
      right: 'Borç 40 lira: hesaptaki sayının mutlak değeri.',
    });
    await belir(c, borc, 400);
    await par(soyle(c, 'Borcu bulmak için −40’ın işaretini çevirdin.'), belir(c, cevir, 500));
    await kaybol(c, cevir, 300);
    await par(soyle(c, 'İşareti çevirmek, sayı doğrusunda sıfırın öbür yanına geçmektir.'), (async () => {
      await belir(c, dogruG, 400);
      await par(pop(c, xd, X(-40), Y0, 350), belir(c, xT, 300));
      await belir(c, yay, 300);
      gezgin.style.opacity = 1;
      await c.tween(1000, (e) => {   // ikinci dereceden eğri üzerinde yürüyen nokta
        const x1 = X(-40), x2 = X(40), y1 = Y0 - 16, yc = Y0 - 16 - tepe(-40);
        gezgin.setAttribute('cx', (1 - e) * (1 - e) * x1 + 2 * e * (1 - e) * 500 + e * e * x2);
        gezgin.setAttribute('cy', (1 - e) * (1 - e) * y1 + 2 * e * (1 - e) * yc + e * e * y1);
      }, ease.inOut);
      gezgin.style.opacity = 0;
      await par(pop(c, md, X(40), Y0, 350), belir(c, mT, 300));
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'x negatif bir sayıysa −x’in işareti nedir?',
      options: ['Negatif', 'Pozitif', 'x’e göre değişir'], answer: 1,
      hints: ['Baştaki eksi “negatif” demek değildir; “işareti çevir” demektir.', '', 'x negatif dedik; işareti çevrilince hep pozitif olur.'],
      right: 'Negatif sayının işareti çevrilince pozitif olur: −(−40) = 40.',
    });
    await par(soyle(c, 'x negatifken −x pozitiftir: x’in sıfıra uzaklığıdır.', { ton: 'thoughtful' }), (async () => {
      await c.tween(1300, (e) => koy(Math.round(lerp(-40, -10, e))), ease.inOut);
      await c.wait(300);
      await c.tween(1100, (e) => koy(Math.round(lerp(-10, -30, e))), ease.inOut);
    })());
    await par(soyle(c, 'Negatif sayının mutlak değeri, işareti çevrilmiş hâlidir.'), belir(c, kuralT, 500));
    c.note('<b>x &lt; 0 ise |x| = −x</b><br>|−40| = −(−40) = 40', 'Negatif x için |x|', 'b2-eksi-x');
  }

  /* ---- 2. İki doğru, birer yarısı ---- */
  async function ikiDogru(c) {
    const svg = c.svg(1000, 562);
    const { dz, sagUz, solUz, yak } = vDuzlemi(svg);
    sagUz.ayarla(1, 0, 0, 0); solUz.ayarla(-1, 0, 0, 0);
    const sag = yazi(svg, 590, 220, ['sağ kol:  ', ['y = x', RENK.f]], { size: 34, hiza: 'start' });
    const sol = yazi(svg, 590, 300, ['sol kol:  ', ['y = −x', RENK.g]], { size: 34, hiza: 'start' });
    const uc = nokta(dz, 0, 0, { r: 10 });
    gizle(sag, sol, uc.el);

    await soyle(c, 'V’nin iki kolu da düz: her biri bir doğrunun parçası.');
    yak(0);
    await par(soyle(c, 'Sağ kolu geriye uzat: bu doğrunun yalnızca sağ yarısı kullanılmış.'), (async () => {
      await c.tween(1100, (e) => sagUz.ayarla(1, 0, lerp(0, -8, e), 0), ease.inOut);
      await belir(c, sag, 400);
    })());
    yak(-1);
    await c.choice({
      tag: 'Tahmin et', q: 'Sol kol hangi doğrunun üzerinde?',
      options: ['y = x', 'y = −x'], answer: 1,
      hints: ['y = x solda eksenin altına iner; sol kol ise üstte.', ''],
      right: 'Sol kolda (−4, 4) var: çıktı, girdinin işareti çevrilmişi.',
    });
    yak(1);
    await par(soyle(c, 'Sol kol da öbür doğrunun sol yarısı.'), (async () => {
      await c.tween(1100, (e) => solUz.ayarla(-1, 0, 0, lerp(0, 8, e)), ease.inOut);
      await belir(c, sol, 400);
    })());
    yak(-1);
    await par(soyle(c, 'İki ayrı fonksiyon değil: sıfırda birleşen tek bir grafik.', { ton: 'thoughtful' }), pop(c, uc, dz.X(0), dz.Y(0), 450));
    c.note('<b>|x| grafiği:</b> y = x’in sağ yarısı, y = −x’in sol yarısı.', 'V’nin iki kolu', 'b2-iki-yari');
  }

  /* ---- 3. Parçalı yazım ---- */
  async function parcaliYazim(c) {
    const svg = c.svg(1000, 562);
    const { dz, yak } = vDuzlemi(svg);
    const pr = yazim(svg);
    const hesap = yazi(svg, 770, 370, ['|−7| = −(−7) = ', ['7', RENK.mutlak]], { size: 36, kalin: 700 });
    const p = nokta(dz, -7, 7, { r: 10 }), uc = nokta(dz, 0, 0, { r: 10 });
    gizle(pr.g, pr.satir[0].g, pr.satir[1].g, hesap, p.el, uc.el);

    await par(soyle(c, 'İki yarıyı tek kuralda toplayan yazım: <b>parçalı gösterim</b>.', { dur: true }), belir(c, pr.g, 500));
    yak(0);
    await par(soyle(c, 'Sağ kol: girdi negatif değilse çıktı girdinin kendisi.'), belir(c, pr.satir[0].g, 500));
    yak(1);
    await par(soyle(c, 'Sol kol: girdi negatifse çıktı, girdinin işareti çevrilmişi.'), belir(c, pr.satir[1].g, 500));
    yak(-1);
    await c.choice({
      tag: 'Tahmin et', q: '|−7| hangi satırla bulunur?',
      options: ['Birinci satır: x', 'İkinci satır: −x'], answer: 1,
      hints: ['−7 negatif; birinci satır x ≥ 0 içindir.', ''],
      right: '−7 &lt; 0 olduğu için ikinci satır: −(−7) = 7.',
    });
    yak(1); pr.yak(1);
    await par(soyle(c, '−7 negatif: ikinci satır geçerli, işareti çevir.'), (async () => { await pop(c, p, dz.X(-7), dz.Y(7), 400); await belir(c, hesap, 400); })());
    yak(-1); pr.yak(-1);
    await par(soyle(c, 'Her aralığın kendi kuralı var; parçalar sıfırda ayrılır.'), pop(c, uc, dz.X(0), dz.Y(0), 450));
    c.note('<b>Parçalı gösterim:</b> |x| = x (x ≥ 0), −x (x &lt; 0)', '|x| parçalı', 'b2-parcali');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const { dz, yak } = vDuzlemi(svg);
    const pr = yazim(svg);
    const izler = iz(dz, 3, 3, { renk: RENK.sifir });
    const p = nokta(dz, 3, 3, { r: 10 });
    const hesap = yazi(svg, 770, 370, '', { size: 36, kalin: 700 });
    const koy = (x) => {
      const y = Math.abs(x), s_ = sayi(x);
      p.git(x, y); izler.ayarla(x, y);
      yak(x >= 0 ? 0 : 1); pr.yak(x >= 0 ? 0 : 1);
      yaz(hesap, x >= 0 ? ['|' + s_ + '| = ', [s_, RENK.mutlak]] : ['|' + s_ + '| = −(' + s_ + ') = ', [sayi(y), RENK.mutlak]]);
    };
    await soyle(c, 'x’i değiştir; hangi satır yanıyor?', { noWait: true });
    c.slider({ label: 'x (girdi)', min: -7, max: 7, step: 1, value: 3, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b2', kicker: 'Konu B · Mutlak değer fonksiyonu', title: '|x|’in parçalı gösterimi', accent: '#3cc8e8', back: 'index.html',
    intro: { title: '|x|’in parçalı gösterimi', hook: 'Hesabında −40 lira varsa <b>borcun kaç liradır?</b>', button: 'Derse başla ›' },
    goals: ['Negatif x için −x’in pozitif olduğunu açıklar.', '|x|’i iki parçalı kuralla yazar.', 'Parçalı gösterimi grafikle eşleştirir.'],
    scenes: [
      { title: 'Eksi x pozitif olur mu?', goal: 'Negatif x için −x’in işaretini bul.', run: eksiX },
      { title: 'İki doğru, birer yarısı', goal: 'V’nin kollarının hangi doğrular üzerinde olduğunu gör.', run: ikiDogru },
      { title: 'Parçalı yazım', goal: '|x|’i iki satırlık kuralla yaz.', run: parcaliYazim },
      { title: 'Dene', goal: 'Girdiye göre hangi satırın geçerli olduğunu izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'x = −7 için |x| hangi kuralla bulunur?', options: ['x = −7', '−x = 7', 'x = 7'], answer: 1,
        why: ['Mutlak değer negatif olmaz; −7 için ikinci satır geçerlidir.', '−7 &lt; 0 olduğu için kural −x: −(−7) = 7.', 'x’in değeri −7’dir, 7 değil; 7’yi veren kural −x’tir.'], scene: 2 },
      { q: '|x|’in parçalı gösteriminde iki parça hangi x’te ayrılır?', options: ['x = 1', 'x = −1', 'x = 0'], answer: 2,
        why: ['1’in iki yanında da kural x’tir.', '−1’in iki yanında da kural −x’tir.', 'x ≥ 0 ve x &lt; 0 koşulları 0’da ayrılır; V’nin ucu da oradadır.'], scene: 1 },
      { q: 'Bir drone kalkış noktasından x metre doğuya (x negatifse batıya) gidiyor. Kalkış noktasına uzaklık p(x) = x (x ≥ 0), p(x) = −x (x &lt; 0) ile bulunuyor. x = −7 ve x = 7 konumlarındaki uzaklıkların toplamı kaç metredir?', options: ['0', '14', '7'], answer: 1,
        why: ['−7 + 7 = 0 olurdu, ama p(−7) = −(−7) = 7: uzaklık negatif değil.', 'p(−7) = 7 ve p(7) = 7; toplam 14.', '7, yalnızca bir konumun uzaklığıdır.'], scene: 2 },
      { q: 'x negatif bir sayı olsun. Hangisi her zaman pozitiftir?', options: ['−x', 'x', 'x + x'], answer: 0,
        why: ['x negatifken −x, x’in işareti çevrilmişidir: pozitiftir.', 'x negatif olarak seçildi; pozitif olamaz.', 'İki negatif sayının toplamı negatiftir.'], scene: 0 },
    ],
    summary: [
      '<b>|x|, x negatifse −x, değilse x’tir.</b>',
      'x negatifken −x pozitiftir: −(−40) = 40.',
      'V, iki doğrunun birer yarısıdır; parçalar x = 0’da birleşir.',
    ],
    nextLesson: { href: 'b3-mutlak-degerin-nitel-ozellikleri.html', label: 'Sonraki: ±|x|’in nitel özellikleri ›' },
  });
})();
