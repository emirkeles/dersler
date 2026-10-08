/* E2 · BİY.9.1.5 · Yazar notu: içerik MEB Biyoloji 9 s. 50 (adezyon ve kohezyon tanımı, yaprağa tutunan damla, bitkide suyun
   taşınması), s. 51 (yüzey gerilimi, su yüzeyinde yürüyen böcek), s. 47 (I. deney: iki lam arasında ince su tabakası;
   II. deney: ağzına kadar dolu bardağa madenî para, su taşmaz, kavisli yüzey). Kitap sayı vermez; derste de sayı yoktur.
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): her düzeneğin sonucu
   söylenir, kavram sorudan önce öğretilir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.E, KOH = 'var(--c4)', ADZ = 'var(--c5)', SU = '#1f5a75', CAM = '#9cacc9';
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const molekul = (c, p, x, y, r = 11) => c.S('circle', { cx: x, cy: y, r, fill: R, stroke: '#0f2a38', 'stroke-width': 2 }, p);
  const bag = (c, p, x1, y1, x2, y2, renk) => c.S('line', { x1, y1, x2, y2, stroke: renk, 'stroke-width': 5, 'stroke-linecap': 'round' }, p);

  /* ---- Sahne 1 · Damla neden dağılmaz? ---- */
  async function damla(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    c.S('path', { d: 'M 150 392 Q 500 312 850 392 Q 500 452 150 392 Z', fill: '#2c5a3c', stroke: '#4f9a6a', 'stroke-width': 3 }, g);
    c.S('path', { d: 'M 150 392 Q 500 372 850 392', fill: 'none', stroke: '#4f9a6a', 'stroke-width': 2 }, g);
    c.S('path', { d: 'M 400 354 Q 392 222 500 218 Q 608 222 600 354 Z', fill: SU, stroke: R, 'stroke-width': 4 }, g);
    await K.belir(c, g);
    await c.say('Yağmurdan sonra yaprakların üstünde yuvarlak su damlaları kalır.');
    const noktalar = [[440, 322], [500, 322], [560, 322], [470, 280], [530, 280], [500, 242]];
    const ic = c.S('g', {}, g);
    [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5]].forEach(([a, b]) => bag(c, ic, noktalar[a][0], noktalar[a][1], noktalar[b][0], noktalar[b][1], KOH));
    noktalar.forEach(([x, y]) => molekul(c, ic, x, y));
    await K.belir(c, ic);
    await c.say('Damla dağılmaz; çünkü su molekülleri birbirini çeker.');
    await K.belir(c, K.yazi(c, g, 500, 130, 'Kohezyon: su–su çekimi', { size: 30, renk: KOH }), 350);
    await c.say('Aynı tür moleküllerin birbirini çekmesine kohezyon denir.', { speak: 'Aynı tür moleküllerin birbirini çekmesine [short pause] kohezyon denir.' });
    const alt = c.S('g', {}, g);
    [440, 500, 560].forEach((x) => bag(c, alt, x, 334, x, 362, ADZ));
    await K.belir(c, alt, 350);
    await c.say('Damla yapraktan kayıp düşmez; çünkü su yaprağın yüzeyine de tutunur.');
    await K.belir(c, K.yazi(c, g, 500, 500, 'Adezyon: su–başka madde çekimi', { size: 30, renk: ADZ }), 350);
    await c.say('Farklı moleküllerin birbirini çekmesine adezyon denir.', { speak: 'Farklı moleküllerin birbirini çekmesine [short pause] adezyon denir.' });
    await sil(c, g);

    /* İki lam: üstteki cam inerken damla ince bir tabaka hâlinde yayılır. */
    const lam = c.S('g', {}, s), camCiz = (y) => c.S('rect', { x: 200, y, width: 600, height: 30, rx: 3, fill: '#2a3554', stroke: CAM, 'stroke-width': 3 }, lam);
    const ustCam = camCiz(110), ustAd = K.yazi(c, lam, 860, 134, 'Cam', { size: 26, renk: CAM });
    const su = c.S('rect', { x: 440, y: 250, width: 120, height: 50, rx: 25, fill: SU, stroke: R, 'stroke-width': 3 }, lam);
    camCiz(300); K.yazi(c, lam, 860, 324, 'Cam', { size: 26, renk: CAM });
    await K.belir(c, lam);
    await c.tween(1100, (e) => {
      const w = 120 + 380 * e, h = 50 - 26 * e;
      su.setAttribute('x', 500 - w / 2); su.setAttribute('width', w); su.setAttribute('y', 300 - h); su.setAttribute('height', h); su.setAttribute('rx', h / 2);
      ustCam.setAttribute('y', 110 + 136 * e); ustAd.setAttribute('y', 134 + 136 * e);
    });
    K.yazi(c, lam, 145, 297, 'Su', { size: 26, renk: R });
    await c.say('İki cam arasına damlatılan su, ince bir tabaka hâlinde yayılır.');
    const tut = c.S('g', {}, lam);
    [300, 400, 500, 600, 700].forEach((x) => { bag(c, tut, x, 269, x, 283, ADZ); bag(c, tut, x, 293, x, 307, ADZ); });
    K.yazi(c, tut, 500, 420, 'Adezyon: su–cam çekimi', { size: 30, renk: ADZ });
    await K.belir(c, tut, 350);
    await c.say('Suyun cama tutunup yayılması da adezyondur: çekim su ile cam arasındadır.');
    await c.choice({ tag: 'Uygula', q: 'Sabah bir örümcek ağında çiy damlaları dizili duruyor. Damlaları ağın ipliğinde tutan çekim hangisidir?',
      options: ['Kohezyon', 'Adezyon', 'İkisi de değil'], answer: 1,
      hints: ['Kohezyon su molekülleri arasındadır; iplik su değildir.', '', 'Su ile iplik arasında da bir çekim vardır.'],
      right: 'Su ile iplik farklı maddelerdir; aralarındaki çekim adezyondur.' });
    c.note('<b>Kohezyon: su–su çekimi. Adezyon: su–başka madde çekimi.</b><br>Damla dağılmaz, yaprağa tutunur.', 'Kohezyon ve adezyon');
  }

  /* ---- Sahne 2 · Ağzına kadar dolu bardak ---- */
  async function bardak(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s), UST = 240, ALT = 470;
    c.S('path', { d: `M 354 ${UST} L 372 ${ALT - 5} L 628 ${ALT - 5} L 646 ${UST} Z`, fill: SU }, g);
    const kabarik = c.S('path', { d: `M 354 ${UST} Q 500 ${UST} 646 ${UST} Z`, fill: SU }, g);
    const yuzey = c.S('path', { d: `M 354 ${UST} Q 500 ${UST} 646 ${UST}`, fill: 'none', stroke: R, 'stroke-width': 4 }, g);
    const paralar = c.S('g', {}, g);
    c.S('path', { d: `M 350 ${UST} L 370 ${ALT} L 630 ${ALT} L 650 ${UST}`, fill: 'none', stroke: CAM, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
    await K.belir(c, g);
    await c.say('Bir bardak ağzına kadar suyla dolu.');
    let adet = 0, kabarma = 0;
    const paraCiz = (y) => c.S('ellipse', { cx: 500, cy: y, rx: 30, ry: 10, fill: '#9e8959', stroke: '#ccb277', 'stroke-width': 3 }, paralar);
    const bekleyen = paraCiz(150);
    await K.belir(c, bekleyen, 350);
    await c.say('İçine madenî paralar yavaşça, birer birer bırakılıyor.');
    await c.choice({ q: 'Paralar eklendikçe su ne yapar?',
      options: ['İlk parada taşar.', 'Seviyesi değişmez; yüzey düz kalır.', 'Taşmaz; yüzeyi bardağın üstünde kabarır.'], answer: 2,
      hints: ['Su molekülleri birbirini çekiyordu; kenardan hemen dökülmezler.', 'Para yer kaplar; su bir yere gitmek zorundadır.', ''],
      right: 'Su molekülleri birbirini çektiği için kenardan dökülmeden bir arada kalır.' });
    /* Bir para bırak: para dibe iner, yüzey biraz daha kabarır. */
    const birak = async (para) => {
      const son = ALT - 18 - adet * 13, ilk = kabarma, hedef = kabarma + 6;
      await c.tween(520, (e) => {
        para.setAttribute('cy', 150 + (son - 150) * e);
        kabarma = ilk + (hedef - ilk) * e;
        const d = `M 354 ${UST} Q 500 ${UST - 2 * kabarma} 646 ${UST}`;
        kabarik.setAttribute('d', d + ' Z'); yuzey.setAttribute('d', d);
      });
      adet++;
    };
    await birak(bekleyen);
    for (let i = 0; i < 3; i++) await birak(paraCiz(150));
    await c.say('Su taşmaz; her parada yüzey biraz daha kabarır.');
    for (let i = 0; i < 3; i++) await birak(paraCiz(150));
    await c.say('Bardağa beklenenden çok daha fazla para sığar.');
    const etiket = c.S('g', {}, g);
    K.yazi(c, etiket, 815, 150, 'Kavisli yüzey', { size: 28, renk: R });
    K.cizgi(c, etiket, 730, 165, 596, UST - 4 - kabarma * 4 * (242 / 292) * (50 / 292), R);
    await K.belir(c, etiket, 350);
    await c.say('Bardağın üstünde kavisli bir yüzey oluşur.');
    const ust = c.S('g', {}, g), egri = (x) => UST - 2 - kabarma * 4 * ((x - 354) / 292) * (1 - (x - 354) / 292);
    const xs = [380, 420, 460, 500, 540, 580, 620];
    xs.slice(1).forEach((x, i) => bag(c, ust, xs[i], egri(xs[i]), x, egri(x), KOH));
    xs.forEach((x) => molekul(c, ust, x, egri(x), 8));
    K.yazi(c, ust, 180, 150, 'Kohezyon', { size: 28, renk: KOH });
    K.cizgi(c, ust, 250, 162, 414, egri(420) - 8, KOH);
    await K.belir(c, ust);
    await c.say('Kavisi kohezyon tutar: su molekülleri birbirini bırakmaz.');
    c.note('<b>Dolu bardak para eklenince taşmaz; yüzeyi kabarır.</b><br>Kavisi kohezyon tutar.', 'Dolu bardak');
  }

  /* ---- Sahne 3 · Yüzey gerilimi ---- */
  async function gerilim(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s), Y = 330, ayaklar = [330, 420, 580, 670];
    const duz = `M 60 ${Y} L 940 ${Y}`;
    const cukurlu = `M 60 ${Y} ` + ayaklar.map((x) => `L ${x - 34} ${Y} Q ${x} ${Y + 22} ${x + 34} ${Y}`).join(' ') + ` L 940 ${Y}`;
    const govde = c.S('path', { d: `${duz} L 940 520 L 60 520 Z`, fill: SU }, g);
    const yuzey = c.S('path', { d: duz, fill: 'none', stroke: R, 'stroke-width': 4 }, g);
    const film = c.S('g', {}, g), xs = [];
    for (let x = 110; x <= 890; x += 60) xs.push(x);
    xs.slice(1).forEach((x, i) => bag(c, film, xs[i], Y, x, Y, KOH));
    xs.forEach((x) => molekul(c, film, x, Y, 9));
    await K.belir(c, g);
    await c.say('Kohezyon, suyun yüzeyinde bir etki daha yaratır.', { speak: '[curious] Kohezyon, suyun yüzeyinde bir etki daha yaratır.' });
    await c.say('Su yüzeyi, görünmez bir film varmış gibi davranır.');
    const ad = K.yazi(c, g, 500, 450, 'Yüzey gerilimi', { size: 34, renk: R });
    await K.belir(c, ad, 350);
    await c.say('Buna yüzey gerilimi denir.');
    /* Su böceği: yüzey ayakların altında hafifçe çöker, yırtılmaz. */
    await sil(c, film);
    govde.setAttribute('d', `${cukurlu} L 940 520 L 60 520 Z`);
    yuzey.setAttribute('d', cukurlu); yuzey.setAttribute('stroke', KOH); yuzey.setAttribute('stroke-width', 5);
    const bocek = c.S('g', {}, g);
    ayaklar.forEach((x, i) => c.S('path', { d: `M ${i < 2 ? 470 : 530} 232 Q ${(x + 500) / 2} 190 ${x} ${Y + 9}`, fill: 'none', stroke: '#c9cfdd', 'stroke-width': 4, 'stroke-linecap': 'round' }, bocek));
    c.S('ellipse', { cx: 500, cy: 234, rx: 62, ry: 14, fill: '#3a4258', stroke: '#c9cfdd', 'stroke-width': 3 }, bocek);
    await K.belir(c, bocek);
    await c.say('Bazı küçük böcekler bu yüzeyde batmadan yürür.');
    const cekim = c.S('g', {}, g);
    ayaklar.forEach((x) => c.S('circle', { cx: x, cy: Y + 10, r: 9, fill: ADZ }, cekim));
    K.yazi(c, cekim, 800, 270, 'Adezyon: ayak–su', { size: 28, renk: ADZ });
    K.yazi(c, cekim, 185, 300, 'Kohezyon: su–su', { size: 28, renk: KOH });
    await K.belir(c, cekim, 350);
    await c.say('Böceğin ayağı ile su arasında da bir çekim vardır: adezyon.');
    await c.choice({ q: 'Böcek batmadığına göre hangi çekim daha büyüktür?',
      options: ['Su molekülleri arasındaki kohezyon', 'Ayak ile su arasındaki adezyon', 'İkisi eşittir'], answer: 0,
      hints: ['', 'Adezyon daha büyük olsaydı yüzey böceği taşıyamazdı.', 'Eşit olsalardı yüzey böceği taşıyamazdı.'],
      right: 'Su molekülleri birbirini, böceğin ayağını çektiğinden daha güçlü çeker.' });
    ad.textContent = 'Kohezyon > adezyon';
    await c.say('Kohezyon adezyondan büyük olduğu için yüzey böceği taşır.');
    c.note('<b>Yüzey gerilimi: su yüzeyi görünmez bir film gibi davranır.</b><br>Küçük böcek batmadan yürür.', 'Yüzey gerilimi');
  }

  /* ---- Sahne 4 · Kökten yaprağa ---- */
  async function bitki(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s), YESIL = '#477d47';
    const fidan = c.S('g', {}, g);
    K.cizgi(c, fidan, 40, 450, 300, 450, '#7a6a4a');
    c.S('line', { x1: 170, y1: 450, x2: 170, y2: 140, stroke: YESIL, 'stroke-width': 14, 'stroke-linecap': 'round' }, fidan);
    c.S('path', { d: 'M 170 250 Q 75 180 60 265 Q 110 310 170 250 Z M 170 190 Q 255 110 290 190 Q 245 245 170 190 Z', fill: YESIL }, fidan);
    c.S('path', { d: 'M 170 450 Q 150 490 110 520 M 170 450 Q 175 495 170 530 M 170 450 Q 200 490 240 515', fill: 'none', stroke: '#b89a6a', 'stroke-width': 5, 'stroke-linecap': 'round' }, fidan);
    await K.belir(c, fidan);
    await c.say('Bitki suyu kökleriyle alır; su yapraklara kadar yükselir.');
    const boru = c.S('g', {}, g);
    c.S('rect', { x: 150, y: 300, width: 40, height: 60, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '6 6' }, boru);
    c.S('path', { d: 'M 190 300 L 420 80 M 190 360 L 420 510', fill: 'none', stroke: 'var(--muted)', 'stroke-width': 2, 'stroke-dasharray': '6 6' }, boru);
    c.S('rect', { x: 440, y: 80, width: 160, height: 430, fill: SU }, boru);
    [420, 600].forEach((x) => c.S('rect', { x, y: 80, width: 20, height: 430, fill: '#5a4a2a', stroke: '#b89a5a', 'stroke-width': 2 }, boru));
    const noktalar = [[480, 460], [560, 405], [480, 350], [560, 295], [480, 240], [560, 185], [480, 130]];
    const kohezyon = c.S('g', {}, boru), adezyon = c.S('g', {}, boru), su = c.S('g', {}, boru);
    noktalar.slice(1).forEach(([x, y], i) => bag(c, kohezyon, noktalar[i][0], noktalar[i][1], x, y, KOH));
    noktalar.forEach(([x, y]) => { bag(c, adezyon, x, y, x < 520 ? 442 : 598, y, ADZ); molekul(c, su, x, y, 13); });
    kohezyon.style.opacity = 0; adezyon.style.opacity = 0;
    await K.belir(c, boru);
    await c.say('Su, gövdedeki ince boruların içinde yukarı taşınır.');
    await K.belir(c, adezyon, 350);
    await c.say('Su molekülleri borunun çeperine tutunur.');
    await K.belir(c, kohezyon, 350);
    await c.say('Aynı anda birbirlerini de çekerler.');
    await c.choice({ tag: 'Uygula', q: 'Borudaki iki çekimin adı hangisinde doğru verilmiştir?',
      options: ['Su–çeper: kohezyon; su–su: adezyon', 'Su–çeper: adezyon; su–su: kohezyon', 'İkisi de kohezyon'], answer: 1,
      hints: ['Kohezyon aynı tür moleküller arasındadır; çeper su değildir.', '', 'Su ile çeper farklı maddelerdir; aralarındaki çekim kohezyon olamaz.'],
      right: 'Farklı maddeler arasındaki çekim adezyon, su molekülleri arasındaki çekim kohezyondur.' });
    const adlar = c.S('g', {}, g);
    K.yazi(c, adlar, 672, 250, 'Adezyon: su–çeper', { size: 28, renk: ADZ, hiza: 'start' });
    K.yazi(c, adlar, 672, 330, 'Kohezyon: su–su', { size: 28, renk: KOH, hiza: 'start' });
    await K.belir(c, adlar, 350);
    await c.say('Adezyon suyu çepere tutar; kohezyon su moleküllerini birbirine bağlar.');
    const yon = c.S('g', {}, g);
    K.ok(c, yon, 640, 490, 640, 110, R);
    await K.belir(c, yon, 350);
    await c.tween(1000, (e) => [kohezyon, adezyon, su].forEach((el) => el.setAttribute('transform', `translate(0 ${-30 * e})`)));
    await c.say('Su, bu iki çekim sayesinde köklerden yapraklara taşınır.');
    await c.say('Su suya da tutunur, yüzeye de.', { speak: 'Su suya da tutunur, [short pause] yüzeye de.' });
    c.note('<b>Bitkide su, adezyon ve kohezyonla yukarı taşınır.</b><br>Su çepere ve suya tutunur.', 'Bitkide su');
  }

  Ders.start({
    id: 'yasam-e2', kicker: 'Konu E · İnorganik moleküller', title: 'Su tutunur', accent: R, back: 'index.html',
    intro: { title: 'Su tutunur', hook: 'Ağzına kadar dolu bardağa para atarsan su hemen taşar mı?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Damla neden dağılmaz?', goal: 'Kohezyon ile adezyonu ayır.', run: damla },
      { title: 'Ağzına kadar dolu bardak', goal: 'Kavisli yüzeyi kohezyonla açıkla.', run: bardak },
      { title: 'Yüzey gerilimi', goal: 'Böceğin neden batmadığını açıkla.', run: gerilim },
      { title: 'Kökten yaprağa', goal: 'İki çekimi bitkide bul.', run: bitki },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yağmur damlasının pencere camında asılı kalmasını sağlayan çekim hangisidir?', options: ['Kohezyon', 'Adezyon', 'Yüzey gerilimi'], answer: 1,
        why: ['Kohezyon su moleküllerinin birbirini çekmesidir; cam su değildir.', 'Su ile cam farklı maddelerdir; aralarındaki çekim adezyondur.', 'Yüzey gerilimi suyun kendi yüzeyiyle ilgilidir.'], scene: 0 },
      { q: 'Küçük bir böcek su yüzeyinde neden batmadan yürüyebilir?', options: ['Kohezyon, ayak ile su arasındaki adezyondan büyüktür.', 'Suyun yüzeyi katılaşmıştır.', 'Böcek ile su arasında hiç çekim yoktur.'], answer: 0,
        why: ['Su molekülleri birbirini daha güçlü çektiği için yüzey böceği taşır.', 'Yüzey sıvıdır; yalnızca bir film varmış gibi davranır.', 'Ayak ile su arasında adezyon vardır; yalnızca kohezyondan küçüktür.'], scene: 2 },
      { q: 'Yüzmeden çıkan bir çocuğun kolunda su damlaları asılı kalıyor ve damlalar dağılıp akmıyor. Bu iki durum hangi çekimlerle açıklanır?',
        options: ['Cilde tutunmayı kohezyon, dağılmamayı adezyon sağlar.', 'Cilde tutunmayı adezyon, dağılmamayı kohezyon sağlar.', 'Cilde tutunmayı da dağılmamayı da kohezyon sağlar.'], answer: 1,
        why: ['Roller ters: kohezyon su moleküllerinin birbirini, adezyon suyun başka maddeyi çekmesidir.', 'Su ile cilt arasındaki çekim adezyon, su molekülleri arasındaki çekim kohezyondur.', 'Cilt su değildir; suyla cilt arasındaki çekim kohezyon olamaz.'], scene: 0 },
      { q: 'Sude: “Bitkide su yukarı yalnızca adezyonla çıkar; kohezyonun burada işi yoktur.” Bu cümle için hangisi doğrudur?',
        options: ['Doğru; kohezyon yalnızca su yüzeyinde görünmez bir film oluşturur.', 'Yanlış; bitkide su yalnızca kohezyonla çıkar, adezyonun işi yoktur.', 'Yanlış; su hem çepere tutunur hem de su molekülleri birbirini çeker.'], answer: 2,
        why: ['Kohezyon bitkide de görevlidir: su moleküllerini borunun içinde birbirine bağlar.', 'Çeper su değildir; suyun çepere tutunması adezyondur ve yükselmeye katılır.', 'Adezyon suyu çepere tutar, kohezyon su moleküllerini birbirine bağlar; su iki çekimle yükselir.'], scene: 3 },
    ], summary: ['<b>Su suya da tutunur, yüzeye de.</b>', 'Kohezyon damlayı ve su yüzeyini bir arada tutar; adezyon suyu başka yüzeylere bağlar.'],
    nextLesson: { href: 'e3-su-tasir-dengeler.html', label: 'Sonraki: Su taşır ve dengeler ›' },
  });
})();
