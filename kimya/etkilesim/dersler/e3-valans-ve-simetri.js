/* E3 · KİM.9.1.5 · Senaryo: plan/kimya/etkilesim/senaryolar/E-elektron-dizilimi.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 60, 62–64, 68–70, 72–73 ve 82'den. Küresel simetrinin tanımı kitabın tablosundaki
   sonuçlardan çıkarılmıştır (senaryo notu). Orbital şekilleri, krom ve bakır istisnaları ve "iyonlaşma enerjisi" terimi
   anlatılmaz. Sodyumun tepkinliği küresel simetriye değil, tek valans elektronuna bağlanır. Öğrenciye kitap, sayfa ya da
   "kaynak" anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  /* Bir kavrama bir renk: orbital (kutu) mavi, elektron (ok, üs) turuncu, enerji seviyesi mor, valans ve vurgu sarı. */
  const ORB = 'var(--c1)', ELEK = 'var(--c2)', SEVIYE = 'var(--c4)', VURGU = RENK.vurgu, SOLUK = RENK.soluk, GRI = RENK.cizgi;
  const HATA = 'var(--bad)', IYI = 'var(--good)', KOYU = '#162038';

  /* Üsler kaynak metinde ¹²³… diye yazılır; tahtada math: ile, panelde <sup> ile çizilir (yazı tipinde ⁴–⁹ yok). */
  const USLER = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const usCevir = (s, ac, kapa) => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => ac + [...m].map((k) => USLER.indexOf(k)).join('') + kapa);
  const ust = (s) => usCevir(s, '<sup>', '</sup>');
  /* Dizilim yazısı: taban düz, üs elektron renginde. */
  function terim(c, p, x, y, metin, o = {}) {
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34, 'font-weight': 600,
      style: 'fill:' + (o.renk || 'var(--text)'), math: usCevir(metin, '^{', '}') }, p);
    t.querySelectorAll('tspan[font-size]').forEach((s) => { s.style.fill = ELEK; });
    return t;
  }
  const sil = (c, el, ms = 300) => c.tween(ms, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const cerceve = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 10 : o.rx,
    fill: o.fill || 'none', stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const carpi = (c, p, x, y, r = 12) => c.S('path', { d: `M ${x - r} ${y - r} L ${x + r} ${y + r} M ${x + r} ${y - r} L ${x - r} ${y + r}`,
    fill: 'none', stroke: HATA, 'stroke-width': 5, 'stroke-linecap': 'round' }, p);
  const tik = (c, p, x, y, r = 12) => c.S('path', { d: `M ${x - r} ${y} L ${x - r / 3} ${y + r * 0.8} L ${x + r} ${y - r * 0.8}`,
    fill: 'none', stroke: IYI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);

  /* Dizilim, terim terim: her terim ayrı öğedir; böylece tek tek çerçevelenir, soluklaşır ya da seviyesi işaretlenir. */
  function terimler(c, p, x, y, liste, { size = 44, adim = size * 2.9 } = {}) {
    const x0 = x - (liste.length - 1) * adim / 2, orta = (i, j = i) => x0 + (i + j) / 2 * adim;
    return {
      el: liste.map((metin, i) => terim(c, p, x0 + i * adim, y, metin, { size })),
      orta,
      /* i. terimden j. terime kadar olanları çerçeveler. */
      sar: (i, j = i, renk = VURGU) => cerceve(c, p, orta(i) - size * 1.15, y - size - 4, orta(j) - orta(i) + size * 2.3, size + 22, { renk }),
      /* Aynı terimlerin altına köşeli ayraç ve etiket koyar. */
      ayrac: (i, j, metin, renk = SEVIYE) => {
        const g = c.S('g', {}, p), a = orta(i) - size, b = orta(j) + size, ty = y + 26;
        c.S('path', { d: `M ${a} ${ty} L ${a} ${ty + 12} L ${b} ${ty + 12} L ${b} ${ty}`, fill: 'none', stroke: renk, 'stroke-width': 3 }, g);
        yazi(c, g, (a + b) / 2, ty + 48, metin, { size: 26, renk });
        return g;
      },
    };
  }

  /* ---- Orbital kutusu ve elektron oku: KIT çizimlerinin ölçeklenebilir sarmalayıcısı ---- */
  function kutu(c, p, x, y, { k = 1, renk = ORB, okRenk = ELEK } = {}) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${k})` }, p);
    const kenar = KIT.orbitalKutusu(c, g, 0, 0, 0, { renk }).firstChild;
    return { g, x, y, k, renk, okRenk, kenar, oklar: [] };
  }
  /* Kutuya ok ekler: ilk ok yukarı, ikincisi aşağı. */
  function okKoy(c, b) {
    const i = b.oklar.length;
    const g = KIT.elektronOku(c, b.g, 24 + i * 30, 0, i === 0 ? 1 : -1, { renk: b.okRenk });
    b.oklar.push(g);
    return g;
  }
  /* Ok, tahtadaki [x, y] noktasından kutuya uçarak yerleşir. */
  async function okUcur(c, b, nereden, ms = 420) {
    const yerelX = 24 + b.oklar.length * 30, g = okKoy(c, b);
    const dx = (nereden[0] - b.x) / b.k - yerelX, dy = (nereden[1] - b.y) / b.k - 41;
    await c.tween(ms, (e) => g.setAttribute('transform', `translate(${dx * (1 - e)} ${dy * (1 - e)})`));
    return g;
  }
  const bosalt = (kutular) => kutular.forEach((b) => { b.oklar.forEach((g) => g.remove()); b.oklar = []; });
  /* Kutuların çerçevesini kısa süre kalınlaştırıp renklendirir. */
  const parlat = (c, kutular, renk = VURGU) => c.tween(700, (e, t) => kutular.forEach((b) => {
    b.kenar.setAttribute('stroke', t < 1 ? renk : b.renk);
    b.kenar.setAttribute('stroke-width', 3 + 4 * Math.sin(Math.PI * t));
  }));
  /* Yan yana kutular. dolum: her kutu için 'u' (tek elektron) ya da 'ud' (çift); '' boş kutu. */
  function sema(c, p, x, y, dolum, { k = 1, ara = 10, renk = ORB, okRenk = ELEK } = {}) {
    const g = c.S('g', {}, p);
    const kutular = dolum.map((oklar, i) => {
      const b = kutu(c, g, x + i * (80 * k + ara), y, { k, renk, okRenk });
      [...oklar].forEach(() => okKoy(c, b));
      return b;
    });
    return { g, kutular };
  }
  /* Öğelerden yalnızca seçilenleri öne çıkarır, ötekileri soluklaştırır. */
  const odak = (c, ogeler, secili) => c.tween(350, (e) => ogeler.forEach((el, i) => {
    const hedef = secili.includes(i) ? 1 : 0.3, simdi = el.style.opacity === '' ? 1 : +el.style.opacity;
    el.style.opacity = simdi + (hedef - simdi) * e;
  }));

  /* ---- Küçük çizimler: her biri (x, y) merkezli ---- */
  const ciz = {
    /* Sodyum parçası: köşeli, gri bir metal. */
    sodyum(c, g, x, y) {
      c.S('path', { d: `M ${x - 30} ${y + 16} L ${x - 20} ${y - 14} L ${x + 12} ${y - 20} L ${x + 32} ${y - 2} L ${x + 22} ${y + 18} Z`,
        fill: '#c9d1e6', stroke: '#8f9bbd', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('path', { d: `M ${x - 20} ${y - 14} L ${x - 2} ${y + 2} L ${x + 32} ${y - 2} M ${x - 2} ${y + 2} L ${x - 4} ${y + 17}`,
        fill: 'none', stroke: '#8f9bbd', 'stroke-width': 2 }, g);
    },
    /* Yağ dolu kavanoz: sodyum parçasının çevresine çizilir. */
    kavanoz(c, g, x, y) {
      c.S('rect', { x: x - 58, y: y - 36, width: 116, height: 86, rx: 8, fill: VURGU, opacity: 0.22 }, g);
      c.S('path', { d: `M ${x - 62} ${y - 58} L ${x - 62} ${y + 42} Q ${x - 62} ${y + 54} ${x - 50} ${y + 54} L ${x + 50} ${y + 54} Q ${x + 62} ${y + 54} ${x + 62} ${y + 42} L ${x + 62} ${y - 58}`,
        fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4 }, g);
      c.S('rect', { x: x - 68, y: y - 72, width: 136, height: 16, rx: 5, fill: RENK.cizgi }, g);
    },
    /* Neon lamba: uçları kapaklı cam tüp. */
    lamba(c, g, x, y) {
      c.S('rect', { x: x - 80, y: y - 18, width: 160, height: 36, rx: 18, fill: KOYU, stroke: 'var(--c6)', 'stroke-width': 4 }, g);
      c.S('line', { x1: x - 54, y1: y, x2: x + 54, y2: y, stroke: 'var(--c6)', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      [-1, 1].forEach((yon) => c.S('rect', { x: x + yon * 92 - 12, y: y - 12, width: 24, height: 24, rx: 4, fill: RENK.cizgi }, g));
    },
  };

  /* ---- Sahne 1 · Tek elektronluk fark ---- */
  async function tekFark(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const NA = 270, NE = 730;
    const sodyum = c.S('g', {}, g);
    ciz.sodyum(c, sodyum, NA, 150);
    yazi(c, sodyum, NA, 262, 'Sodyum', { size: 32 });
    await belir(c, sodyum);
    await c.say('Sodyum metali havadaki oksijenle bile tepkimeye girer.');
    const kavanoz = c.S('g', {}, g);
    ciz.kavanoz(c, kavanoz, NA, 150);
    const naAlt = yazi(c, kavanoz, NA, 304, 'yağ içinde saklanır', { size: 26, renk: SOLUK });
    await belir(c, kavanoz);
    await c.say('Bu yüzden laboratuvarda yağ içinde saklanır.');
    const neon = c.S('g', {}, g);
    ciz.lamba(c, neon, NE, 150);
    yazi(c, neon, NE, 262, 'Neon', { size: 32 });
    const neAlt = yazi(c, neon, NE, 304, 'bileşik oluşturmaz', { size: 26, renk: SOLUK });
    await belir(c, neon);
    await c.say('Neon gazı ise bileşik oluşturmaz; neon lambalarda kullanılır.');
    naAlt.textContent = '11 elektron';
    neAlt.textContent = '10 elektron';
    const fark = yazi(c, g, 500, 304, 'fark: 1 elektron', { size: 28, renk: VURGU });
    await belir(c, fark, 350);
    await c.say('Oysa iki atomun elektron sayıları arasında yalnızca bir fark vardır.',
      { speak: '[thoughtful] Oysa iki atomun elektron sayıları arasında yalnızca bir fark vardır.' });
    const diziler = c.S('g', {}, g);
    const na = terimler(c, diziler, NA, 384, ['1s²', '2s²', '2p⁶', '3s¹'], { size: 30, adim: 84 });
    terimler(c, diziler, NE, 384, ['1s²', '2s²', '2p⁶'], { size: 30, adim: 84 });
    await belir(c, diziler, 400);
    await c.say('Neonun dizilimi 1s² 2s² 2p⁶, sodyumunki 1s² 2s² 2p⁶ 3s¹.',
      { speak: 'Neonun dizilimi bir se iki, iki se iki, iki pe altı; sodyumunki bir se iki, iki se iki, iki pe altı, üç se bir.' });
    fark.remove();
    const disDaki = c.S('g', {}, g);
    disDaki.append(na.sar(3));
    yazi(c, disDaki, 500, 470, 'farkı yaratan: en dıştaki tek elektron', { size: 30, renk: VURGU });
    await belir(c, disDaki, 400);
    await c.say('Farkı yaratan, sodyumun en dışta duran tek elektronudur.',
      { speak: 'Farkı yaratan, [short pause] sodyumun en dışta duran tek elektronudur.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 80, 'Valans elektronları', { size: 38, renk: VURGU });
    yazi(c, g, 500, 126, 'en dış enerji seviyesindeki elektronlar', { size: 28 });
    await belir(c, g);
    await c.say('Atomun en dış enerji seviyesindeki elektronlara valans elektronları denir.');
    const sod = c.S('g', {}, g);
    const t = terimler(c, sod, 500, 260, ['1s²', '2s²', '2p⁶', '3s¹']);
    t.ayrac(0, 0, '1. seviye');
    t.ayrac(1, 2, '2. seviye');
    t.ayrac(3, 3, '3. seviye');
    t.sar(3);
    yazi(c, sod, t.orta(3), 376, 'valans elektronu', { size: 26, renk: VURGU });
    await belir(c, sod, 400);
    await c.say("Sodyumun en dış seviyesi üçüncüdür; valans elektronu 3s’deki elektrondur.",
      { speak: 'Sodyumun en dış seviyesi üçüncüdür; valans elektronu üç se orbitalindeki elektrondur.' });
    await belir(c, yazi(c, g, 500, 470, 'kimyasal özellikler: valans elektron sayısı', { size: 30 }), 350);
    await c.say('Bir atomun kimyasal özelliklerini valans elektronlarının sayısı belirler.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 110, 'Berilyum', { size: 36 });
    const be = terimler(c, g, 500, 230, ['1s²', '2s²'], { size: 56, adim: 300 });
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: ust('Berilyumun dizilimi 1s² 2s². Kaç valans elektronu vardır?'), options: ['4', '2', '1'], answer: 1,
      hints: ['Dört, bütün elektronların sayısı; yalnızca en dış seviyedekiler sayılır.', '', 'En dış seviyedeki 2s orbitalinde iki elektron var.'],
      right: ust('En dış seviye ikincidir; orada 2s² var.'),
      onPick: (i, dogru) => { if (dogru) be.sar(1); } });
    const disSeviye = be.ayrac(1, 1, '2. seviye: en dış');
    const sonuc = yazi(c, g, 500, 430, '2 valans elektronu', { size: 36, renk: VURGU });
    await Promise.all([belir(c, disSeviye, 350), belir(c, sonuc, 350)]);
    await c.say('Berilyumun en dış seviyesi ikincidir; orada iki elektron vardır.');
    const icSeviye = be.ayrac(0, 0, '1. seviye: iç', SOLUK);
    await Promise.all([belir(c, icSeviye, 350), c.tween(350, (e) => { be.el[0].style.opacity = 1 - 0.55 * e; })]);
    await c.say("1s’deki iki elektron iç seviyededir; valans elektronu sayılmaz.",
      { speak: 'Bir se orbitalindeki iki elektron iç seviyededir; valans elektronu sayılmaz.' });
  }

  /* ---- Sahne 2 · s ve p birlikte sayılır ---- */
  async function sVeP(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    yazi(c, g, 500, 70, 'Oksijen', { size: 36 });
    const t = terimler(c, g, 500, 150, ['1s²', '2s²', '2p⁴']);
    /* Altta kutu-ok şeması: 1s soluk, 2s ve 2p en dış seviyenin orbitalleri. */
    sema(c, g, 250, 290, ['ud'], { k: 0.9, renk: GRI, okRenk: SOLUK });
    const ikiS = sema(c, g, 400, 290, ['ud'], { k: 0.9 });
    const ikiP = sema(c, g, 530, 290, ['ud', 'u', 'u'], { k: 0.9, ara: 8 });
    [['1s', 286, SOLUK], ['2s', 436], ['2p', 646]].forEach(([ad, x, renk]) => yazi(c, g, x, 402, ad, { size: 28, renk }));
    await belir(c, g);
    await parlat(c, [...ikiS.kutular, ...ikiP.kutular]);
    await c.say('En dış seviyede hem s hem p orbitalleri varsa ikisi de sayılır.',
      { speak: 'En dış seviyede hem se hem pe orbitalleri varsa ikisi de sayılır.' });
    const disSeviye = c.S('g', {}, g);
    disSeviye.append(t.sar(1, 2), t.ayrac(1, 2, '2. seviye: en dış'));
    await belir(c, disSeviye, 400);
    await c.say('Oksijenin dizilimi 1s² 2s² 2p⁴; en dış seviyesi ikincidir.',
      { speak: 'Oksijenin dizilimi bir se iki, iki se iki, iki pe dört; en dış seviyesi ikincidir.' });
    const toplam = yazi(c, g, 500, 490, '2 + 4 = 6', { size: 40 });
    await belir(c, toplam, 350);
    await c.say('İkinci seviyede 2s² ve 2p⁴ vardır: iki artı dört, altı.',
      { speak: 'İkinci seviyede iki se iki ve iki pe dört vardır: iki artı dört, altı.' });
    toplam.textContent = '2 + 4 = 6 valans elektronu';
    toplam.style.fill = VURGU;
    await c.say('Oksijenin altı valans elektronu vardır.');
    const orbitaller = c.S('g', {}, g);
    cerceve(c, orbitaller, 388, 278, 386, 98, { renk: VURGU });
    yazi(c, orbitaller, 792, 322, 'valans', { size: 28, renk: VURGU, hiza: 'start' });
    yazi(c, orbitaller, 792, 356, 'orbitalleri', { size: 28, renk: VURGU, hiza: 'start' });
    await belir(c, orbitaller, 400);
    await c.say('Valans elektronlarının bulunduğu orbitallere valans orbitalleri denir.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 110, 'Klor', { size: 36 });
    const klor = terimler(c, g, 500, 230, ['1s²', '2s²', '2p⁶', '3s²', '3p⁵']);
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: ust('Klorun dizilimi 1s² 2s² 2p⁶ 3s² 3p⁵. Kaç valans elektronu vardır?'), options: ['17', '5', '7'], answer: 2,
      hints: ['On yedi, bütün elektronların sayısı; iç seviyeler sayılmaz.', ust('3p⁵ ile aynı seviyedeki 3s² de sayılır.'), ''],
      right: ust('En dış seviye üçüncüdür: 3s² ve 3p⁵.'),
      onPick: (i, dogru) => { if (dogru) klor.sar(3, 4); } });
    const ucuncu = klor.ayrac(3, 4, '3. seviye: en dış');
    const yedi = yazi(c, g, 500, 430, '2 + 5 = 7 valans elektronu', { size: 38, renk: VURGU });
    await Promise.all([belir(c, ucuncu, 350), belir(c, yedi, 350)]);
    await c.say('Klorun en dış seviyesi üçüncüdür: 3s² ve 3p⁵, toplam yedi.',
      { speak: 'Klorun en dış seviyesi üçüncüdür: üç se iki ve üç pe beş, toplam yedi.' });
    c.note(ust('<b>Valans elektronları: en dış enerji seviyesindeki elektronlar.</b><br>O: 2s² 2p⁴ → 6'), 'Valans elektronları');
  }

  /* ---- Sahne 3 · Dizilim d ile bitiyorsa ---- */
  async function dIleBiten(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    /* 4s kutusu ve beş 3d kutusu: sahnenin iki atomunda da aynı yerde durur. */
    const kutular = (p, dS, dD) => {
      const sg = c.S('g', {}, p);
      const s = sema(c, sg, 250, 300, [dS], { k: 0.9 }).kutular[0], d = sema(c, p, 420, 300, dD, { k: 0.9, ara: 8 }).kutular;
      yazi(c, sg, 286, 412, '4s', { size: 28 });
      yazi(c, p, 616, 412, '3d', { size: 28 });
      return { s, d, sg };
    };
    yazi(c, g, 500, 70, 'Dizilim d orbitalleriyle bitiyorsa', { size: 30, renk: SOLUK });
    const k = kutular(g, '', ['', '', '', '', '']);
    k.sg.style.opacity = 0;
    await belir(c, g);
    await c.say('Bazı atomların dizilimi d orbitalleriyle biter.', { speak: 'Bazı atomların dizilimi de orbitalleriyle biter.' });
    const mangan = c.S('g', {}, g);
    yazi(c, mangan, 500, 134, 'Mangan', { size: 34 });
    const t = terimler(c, mangan, 500, 212, ['1s²', '2s²', '2p⁶', '3s²', '3p⁶', '4s²', '3d⁵'], { size: 36 });
    await belir(c, mangan, 400);
    await c.say('Manganın dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁵ şeklindedir.',
      { speak: 'Manganın dizilimi bir se iki, iki se iki, iki pe altı, üç se iki, üç pe altı, dört se iki, üç de beş şeklindedir.' });
    await belir(c, k.sg, 350);
    await okUcur(c, k.s, [286, 250], 250);
    await okUcur(c, k.s, [286, 250], 250);
    for (const b of k.d) await okUcur(c, b, [b.x + 36, 250], 200);
    const yakin = yazi(c, g, 500, 480, '4s ve 3d: enerjileri çok yakın', { size: 28, renk: SOLUK });
    await belir(c, yakin, 350);
    await c.say("3d orbitalleri 4s’den hemen sonra dolar; enerjileri birbirine çok yakındır.",
      { speak: 'Üç de orbitalleri dört se orbitalinden hemen sonra dolar; enerjileri birbirine çok yakındır.' });
    const birlikte = c.S('g', {}, g);
    birlikte.append(t.sar(5, 6));
    cerceve(c, birlikte, 238, 288, 586, 98, { renk: VURGU });
    await belir(c, birlikte, 400);
    await c.say('Böyle atomlarda son s ve d orbitallerindeki elektronlar birlikte sayılır.',
      { speak: 'Böyle atomlarda son se ve de orbitallerindeki elektronlar birlikte sayılır.' });
    yakin.textContent = '2 + 5 = 7 valans elektronu';
    yakin.style.fill = VURGU;
    yakin.setAttribute('font-size', 36);
    await c.say('Manganda 4s² ve 3d⁵ vardır: iki artı beş, yedi valans elektronu.',
      { speak: 'Manganda dört se iki ve üç de beş vardır: iki artı beş, yedi valans elektronu.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 100, 'Skandiyum', { size: 36 });
    const sc = terimler(c, g, 500, 200, ['…', '4s²', '3d¹'], { size: 48 });
    kutular(g, 'ud', ['u', '', '', '', '']);
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: ust('Skandiyumun dizilimi 4s² 3d¹ ile biter. Kaç valans elektronu vardır?'), options: ['3', '2', '1'], answer: 0,
      hints: ['', ust('Yalnızca 4s² sayılmış; 3d¹ de birlikte sayılır.'), ust('Yalnızca son yazılan 3d¹ sayılmış; 4s² de birlikte sayılır.')],
      right: 'Son s ve d orbitalleri birlikte sayılır: 2 + 1 = 3.',
      onPick: (i, dogru) => { if (dogru) sc.sar(1, 2); } });
    await belir(c, yazi(c, g, 500, 480, '2 + 1 = 3 valans elektronu', { size: 36, renk: VURGU }), 350);
    await c.say('4s² ve 3d¹ birlikte sayılır: skandiyumun üç valans elektronu vardır.',
      { speak: 'Dört se iki ve üç de bir birlikte sayılır: skandiyumun üç valans elektronu vardır.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    const kart = (x, kosul, kural, ornek, renk) => {
      cerceve(c, g, x, 140, 420, 260, { fill: KOYU, renk });
      yazi(c, g, x + 210, 204, kosul, { size: 28, renk: SOLUK });
      yazi(c, g, x + 210, 256, kural, { size: 30 });
      terim(c, g, x + 210, 336, ornek, { size: 34 });
    };
    kart(60, 's ya da p ile biterse', 'yalnızca en dış seviye', 'O: 2s² 2p⁴', VURGU);
    kart(520, 'd ile biterse', 'son s ve d birlikte', 'Mn: 4s² 3d⁵', RENK.cizgi);
    await belir(c, g);
    await c.say('Dizilim s ya da p ile bitiyorsa yalnızca en dış seviye sayılır.',
      { speak: 'Dizilim se ya da pe ile bitiyorsa yalnızca en dış seviye sayılır.' });
  }

  /* ---- Sahne 4 · Yarı dolu, tam dolu ---- */
  const DORT = [['Karbon', '2p²', ['u', 'u', '']], ['Azot', '2p³', ['u', 'u', 'u']], ['Oksijen', '2p⁴', ['ud', 'u', 'u']], ['Neon', '2p⁶', ['ud', 'ud', 'ud']]];
  /* Dört atomun 2p kutuları yan yana; sahne 4 ve 5'te aynı düzen kullanılır. alt(): kutuların altına etiket yazar. */
  function dortAtom(c, p, y = 110) {
    return DORT.map(([ad, son, dolum], i) => {
      const g = c.S('g', {}, p), x = 140 + i * 240;
      yazi(c, g, x, y, ad, { size: 30 });
      terim(c, g, x, y + 42, son, { size: 28, renk: SOLUK });
      const kutular = sema(c, g, x - 90, y + 66, dolum, { k: 0.7, ara: 6 }).kutular;
      return { g, x, kutular, alt: (metin, renk) => yazi(c, g, x, y + 170, metin, { size: 28, renk }) };
    });
  }
  async function yariTam(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const a = dortAtom(c, g), gruplar = a.map((x) => x.g);
    await belir(c, g);
    await c.say('Şimdi valans elektronlarının orbitallere nasıl dağıldığına bakalım.');
    await odak(c, gruplar, [1]);
    await parlat(c, a[1].kutular);
    await c.say('Azotun üç 2p orbitalinin her birinde tek elektron vardır.',
      { speak: 'Azotun üç tane iki pe orbitalinin her birinde tek elektron vardır.' });
    await belir(c, a[1].alt('yarı dolu', VURGU), 350);
    await c.say('Eş enerjili orbitallerin hepsinde tek elektron varsa bunlara yarı dolu denir.',
      { speak: 'Eş enerjili orbitallerin hepsinde tek elektron varsa bunlara [short pause] yarı dolu denir.' });
    await odak(c, gruplar, [3]);
    await parlat(c, a[3].kutular);
    await c.say('Neonun üç 2p orbitalinin her birinde iki elektron vardır.',
      { speak: 'Neonun üç tane iki pe orbitalinin her birinde iki elektron vardır.' });
    await belir(c, a[3].alt('tam dolu', VURGU), 350);
    await c.say('Eş enerjili orbitallerin hepsi iki elektronla dolmuşsa bunlara tam dolu denir.');
    await odak(c, gruplar, [0, 1, 2, 3]);
    const ozet = c.S('g', {}, g);
    terim(c, ozet, 330, 420, 'p³: yarı dolu', { size: 34 });
    terim(c, ozet, 670, 420, 'p⁶: tam dolu', { size: 34 });
    await belir(c, ozet, 400);
    await c.say('p orbitalleri üç elektronla yarı, altı elektronla tam dolar.',
      { speak: 'Pe orbitalleri üç elektronla yarı, altı elektronla tam dolar.' });
    await parlat(c, a[2].kutular);
    await c.choice({ tag: 'Uygula', q: 'Oksijenin 2p orbitallerinde dört elektron var. Bu orbitaller nasıl doludur?',
      options: ['Yarı dolu', 'Tam dolu', 'Ne yarı dolu ne tam dolu'], answer: 2,
      hints: ['Yarı doluda her kutuda tek elektron olur; burada bir kutuda çift var.', 'Tam doluda her kutuda iki elektron olur; burada iki kutu tek kalmış.', ''],
      right: 'Kutular eşit dolmamış: bir çift, iki tek.' });
    await belir(c, a[2].alt('eşit dolmamış', SOLUK), 350);
    await c.say('Oksijende bir kutuda çift, iki kutuda tek elektron var; kutular eşit dolmamış.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 380, 80, 'yarı dolu', { size: 30, renk: VURGU });
    yazi(c, g, 760, 80, 'tam dolu', { size: 30, renk: VURGU });
    /* Tablo satırı: tür harfi, yarı dolu ve tam dolu kutular, altlarında yazımı. */
    const satir = (i, harf, adet, yari, tam) => {
      const sg = c.S('g', {}, g), y = 110 + i * 142, w = adet * 49 - 5;
      yazi(c, sg, 110, y + 40, harf, { size: 44, renk: ORB });
      sema(c, sg, 380 - w / 2, y, Array(adet).fill('u'), { k: 0.55, ara: 5 });
      sema(c, sg, 760 - w / 2, y, Array(adet).fill('ud'), { k: 0.55, ara: 5 });
      terim(c, sg, 380, y + 88, yari, { size: 32 });
      terim(c, sg, 760, y + 88, tam, { size: 32 });
      return sg;
    };
    satir(1, 'p', 3, 'p³', 'p⁶');
    await belir(c, g);
    await belir(c, satir(0, 's', 1, 's¹', 's²'), 400);
    await c.say('s orbitali bir elektronla yarı, iki elektronla tam dolar.',
      { speak: 'Se orbitali bir elektronla yarı, iki elektronla tam dolar.' });
    await belir(c, satir(2, 'd', 5, 'd⁵', 'd¹⁰'), 400);
    await c.say('Beş d orbitali beş elektronla yarı, on elektronla tam dolar.',
      { speak: 'Beş de orbitali beş elektronla yarı, on elektronla tam dolar.' });
    c.note(ust('<b>Yarı dolu: s¹, p³, d⁵.</b><br>Tam dolu: s², p⁶, d¹⁰.'), 'Yarı dolu, tam dolu');
  }

  /* ---- Sahne 5 · Küresel simetri ---- */
  /* Ortada çekirdek, çevresinde üç eş enerjili 2p kutusu. durum(dolum, renkli) kutuları ve çekim çizgilerini yeniler:
     kutular eşit dolmuşsa çizgiler aynı renktedir (dengeli); değilse ötekilerden farklı dolan kutunun çizgisi kırmızıdır. */
  function cekirdekGorunumu(c, p) {
    const g = c.S('g', {}, p), M = [500, 300], R = 185;
    const yer = [-90, 150, 30].map((aci) => [M[0] + R * Math.cos(aci * Math.PI / 180), M[1] + R * Math.sin(aci * Math.PI / 180)]);
    const halka = c.S('circle', { cx: M[0], cy: M[1], r: R + 60, fill: 'none', stroke: VURGU, 'stroke-width': 3, 'stroke-dasharray': '10 10' }, g);
    halka.style.opacity = 0;
    const cizgi = yer.map(([x, y]) => {
      const ux = (x - M[0]) / R, uy = (y - M[1]) / R;
      return c.S('line', { x1: M[0] + 44 * ux, y1: M[1] + 44 * uy, x2: M[0] + (R - 52) * ux, y2: M[1] + (R - 52) * uy, stroke: GRI, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    });
    c.S('circle', { cx: M[0], cy: M[1], r: 32, fill: KOYU, stroke: 'var(--text)', 'stroke-width': 3 }, g);
    yazi(c, g, M[0], M[1] + 14, '+', { size: 40 });
    yazi(c, g, M[0], M[1] + 66, 'çekirdek', { size: 24, renk: SOLUK });
    const kutular = yer.map(([x, y]) => kutu(c, g, x - 36, y - 37, { k: 0.9 }));
    const durum = (dolum, renkli = true) => {
      bosalt(kutular);
      const esit = dolum.every((d) => d.length === dolum[0].length);
      kutular.forEach((b, i) => {
        [...dolum[i]].forEach(() => okKoy(c, b));
        const farkli = dolum.filter((d) => d.length === dolum[i].length).length === 1;
        cizgi[i].setAttribute('stroke', !renkli ? GRI : esit ? IYI : farkli ? HATA : GRI);
        cizgi[i].setAttribute('stroke-dasharray', dolum[i] ? 'none' : '4 12');
      });
      return esit;
    };
    return { g, halka, kutular, durum };
  }
  async function kuresel(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const v = cekirdekGorunumu(c, g), sol = c.S('g', {}, g), sag = c.S('g', {}, g);
    /* Solda atomun adı ve diziliminin sonu, sağda kutuların durumu. */
    const atom = (ad, son, dolum, ustSatir, altSatir) => {
      const esit = v.durum(dolum);
      sol.replaceChildren();
      sag.replaceChildren();
      yazi(c, sol, 150, 110, ad, { size: 36 });
      terim(c, sol, 150, 156, son, { size: 30, renk: SOLUK });
      yazi(c, sag, 850, 110, ustSatir, { size: 28 });
      yazi(c, sag, 850, 150, altSatir, { size: 28, renk: esit ? IYI : HATA });
      return esit;
    };
    const rozet = yazi(c, g, 850, 490, 'küresel simetri', { size: 28, renk: VURGU });
    rozet.style.opacity = 0;
    v.durum(['u', 'u', 'u'], false);
    await belir(c, g);
    await c.say('Elektronlar çekirdek tarafından çekilir.');
    atom('Azot', '2p³', ['u', 'u', 'u'], 'eşit dolmuş', 'çekim dengeli');
    await Promise.all([belir(c, sol, 350), belir(c, sag, 350)]);
    await c.say('Eş enerjili orbitaller eşit dolmuşsa çekirdeğin çekimi onlara dengeli dağılır.');
    await c.tween(500, (e) => { v.halka.style.opacity = e; rozet.style.opacity = e; });
    await c.say('Dizilimi yarı ya da tam dolu orbitallerle biten atom küresel simetri gösterir.',
      { speak: 'Dizilimi yarı ya da tam dolu orbitallerle biten atom [short pause] küresel simetri gösterir.' });
    /* Cümle iki atomu sayar: önce azot, cümlenin ortasında neon gösterilir. */
    atom('Azot', '2p³', ['u', 'u', 'u'], 'yarı dolu', 'çekim dengeli');
    await Promise.all([
      c.say('Azot yarı dolu, neon tam dolu 2p orbitalleriyle küresel simetri gösterir.',
        { speak: 'Azot yarı dolu, neon tam dolu iki pe orbitalleriyle küresel simetri gösterir.' }),
      c.wait(2200).then(() => atom('Neon', '2p⁶', ['ud', 'ud', 'ud'], 'tam dolu', 'çekim dengeli')),
    ]);
    atom('Karbon', '2p²', ['u', 'u', ''], 'eşit dolmamış', 'çekim dengeli değil');
    v.halka.style.opacity = 0;
    rozet.textContent = 'küresel simetri yok';
    rozet.style.fill = HATA;
    await Promise.all([
      c.say('Karbon ve oksijen küresel simetri göstermez; 2p orbitalleri eşit dolmamıştır.',
        { speak: 'Karbon ve oksijen küresel simetri göstermez; iki pe orbitalleri eşit dolmamıştır.' }),
      c.wait(2600).then(() => atom('Oksijen', '2p⁴', ['ud', 'u', 'u'], 'eşit dolmamış', 'çekim dengeli değil')),
    ]);

    await sil(c, g);
    g = c.S('g', {}, svg);
    dortAtom(c, g, 100).forEach((x, i) => (i === 1 || i === 3 ? tik : carpi)(c, x.g, x.x, 262, 16));
    yazi(c, g, 500, 390, 'dengeli çekim: daha kararlı atom', { size: 32, renk: IYI });
    await belir(c, g);
    await c.say('Çekim dengeli dağıldığında atomun kararlılığı artar.');
    await belir(c, yazi(c, g, 500, 456, 'kararlı atom: elektron koparmak daha zor', { size: 28 }), 350);
    await c.say('Kararlı bir atomdan elektron koparmak daha zordur.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 90, 'Fosfor', { size: 36 });
    terimler(c, g, 500, 172, ['…', '3s²', '3p³']);
    sema(c, g, 330, 230, ['ud']);
    const ucP = sema(c, g, 470, 230, ['u', 'u', 'u']);
    yazi(c, g, 370, 352, '3s', { size: 28 });
    yazi(c, g, 595, 352, '3p', { size: 28 });
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: ust('Fosforun dizilimi 3s² 3p³ ile biter. Fosfor küresel simetri gösterir mi?'),
      options: ['Hayır; 3p orbitalleri tam dolu değil.', 'Evet; 3p orbitalleri yarı dolu.', 'Hayır; yalnızca soy gazlar gösterir.'], answer: 1,
      hints: ['Tam dolu olması gerekmez; yarı dolu orbitaller de eşit dolmuştur.', '', 'Azot soy gaz değildir ama küresel simetri gösterir.'],
      right: ust('3p³: üç kutuda birer elektron, yani yarı dolu.'),
      onPick: (i, dogru) => { if (dogru) ucP.kutular.forEach((b) => b.kenar.setAttribute('stroke', IYI)); } });
    const gibi = c.S('g', {}, g);
    tik(c, gibi, 770, 271, 16);
    terim(c, gibi, 500, 430, 'azot gibi: p³ yarı dolu', { size: 32, renk: IYI });
    await belir(c, gibi, 400);
    await c.say('Fosforun dizilimi 3p³ ile biter; azot gibi küresel simetri gösterir.',
      { speak: 'Fosforun dizilimi üç pe üç ile biter; azot gibi küresel simetri gösterir.' });
    await belir(c, yazi(c, g, 500, 492, 'yalnızca soy gazlara özgü değil', { size: 30, renk: VURGU }), 350);
    await c.say('Küresel simetri yalnızca soy gazlara özgü değildir.',
      { speak: '[thoughtful] Küresel simetri yalnızca soy gazlara özgü değildir.' });
  }

  /* ---- Sahne 6 · Küresel simetriyi ayır ---- */
  const AYIR = [
    { ad: 'Argon', son: '3s² 3p⁶', dolum: ['ud', 'ud', 'ud'], gosterir: true, neden: '3p⁶: üç kutuda da çift var, tam dolu.',
      ipucu: 'Üç 3p kutusunun hepsinde çift var; kutular eşit dolmuş.' },
    { ad: 'Klor', son: '3s² 3p⁵', dolum: ['ud', 'ud', 'u'], gosterir: false, neden: '3p⁵: bir kutu tek kalır; ne yarı ne tam dolu.',
      ipucu: 'İki kutuda çift, bir kutuda tek elektron var; kutular eşit dolmamış.' },
    { ad: 'Hidrojen', son: '1s¹', dolum: ['u'], gosterir: true, neden: '1s¹: tek orbital bir elektronla yarı dolu.',
      ipucu: 'Tek bir orbital var ve içinde tek elektron duruyor; bu, yarı dolu demektir.' },
    { ad: 'Flor', son: '2s² 2p⁵', dolum: ['ud', 'ud', 'u'], gosterir: false, neden: '2p⁵: bir kutu tek kalır; ne yarı ne tam dolu.',
      ipucu: 'İki kutuda çift, bir kutuda tek elektron var; kutular eşit dolmamış.' },
  ];
  async function ayir(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    await belir(c, yazi(c, g, 500, 70, 'Dizilim s orbitaliyle bitiyorsa', { size: 30, renk: SOLUK }));
    await c.say('Küresel simetri s orbitaliyle biten dizilimlerde de görülür.',
      { speak: 'Küresel simetri se orbitaliyle biten dizilimlerde de görülür.' });
    /* Bir örnek: ad, dizilimin sonu, kutu-ok şeması; karar() altına işaret ve sonucu yazar. */
    const ornek = (x, ad, son, dolum) => {
      const og = c.S('g', {}, g), w = dolum.length * 90 - 10;
      yazi(c, og, x, 140, ad, { size: 34 });
      terim(c, og, x, 186, son, { size: 30, renk: SOLUK });
      const kutular = sema(c, og, x - w / 2, 214, dolum).kutular;
      const karar = (gosterir) => {
        const kg = c.S('g', {}, og);
        (gosterir ? tik : carpi)(c, kg, x - 180, 352, 12);
        yazi(c, kg, x + 14, 362, gosterir ? 'küresel simetri gösterir' : 'küresel simetri göstermez', { size: 26, renk: gosterir ? IYI : HATA });
        return belir(c, kg, 350);
      };
      return { g: og, kutular, karar };
    };
    const berilyum = ornek(270, 'Berilyum', '… 2s²', ['ud']);
    await belir(c, berilyum.g);
    await berilyum.karar(true);
    await c.say('Berilyumun dizilimi 2s² ile biter; orbital tam doludur, küresel simetri gösterir.',
      { speak: 'Berilyumun dizilimi iki se iki ile biter; orbital tam doludur, küresel simetri gösterir.' });
    const bor = ornek(730, 'Bor', '… 2p¹', ['u', '', '']);
    await belir(c, bor.g);
    await c.say('Borun dizilimi 2p¹ ile biter.', { speak: 'Borun dizilimi iki pe bir ile biter.' });
    await bor.karar(false);
    await c.say('Üç 2p orbitalinin yalnızca birinde elektron vardır; bor küresel simetri göstermez.',
      { speak: 'Üç tane iki pe orbitalinin yalnızca birinde elektron vardır; bor küresel simetri göstermez.' });
    await belir(c, yazi(c, g, 500, 470, 'dizilimin bittiği orbitallere bak', { size: 32, renk: VURGU }), 350);
    await parlat(c, [...berilyum.kutular, ...bor.kutular]);
    await c.say('Karar verirken dizilimin bittiği orbitallere bak.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    const KUTU_X = [40, 520];
    cerceve(c, g, KUTU_X[0], 240, 440, 300, { fill: KOYU });
    yazi(c, g, KUTU_X[0] + 220, 284, 'Küresel simetri gösterir', { size: 28, renk: IYI });
    cerceve(c, g, KUTU_X[1], 240, 440, 300, { fill: KOYU });
    yazi(c, g, KUTU_X[1] + 220, 284, 'Göstermez', { size: 28, renk: HATA });
    const bekleyen = c.S('g', {}, g), yerlesen = [0, 0], kartlar = {};
    /* Sıradaki atom üstte, ortada bekler. */
    const goster = (a) => {
      const w = a.dolum.length * 72 - 8;
      bekleyen.replaceChildren();
      yazi(c, bekleyen, 500, 64, a.ad, { size: 34 });
      terim(c, bekleyen, 500, 108, a.son, { size: 30, renk: SOLUK });
      sema(c, bekleyen, 500 - w / 2, 130, a.dolum, { k: 0.8, ara: 8 });
      return belir(c, bekleyen, 300);
    };
    /* Atom, kutusundaki sıradaki satıra yerleşir. */
    const yerlestir = (a) => {
      const i = a.gosterir ? 0 : 1, x = KUTU_X[i], y = 312 + yerlesen[i]++ * 106, kg = c.S('g', {}, g);
      bekleyen.replaceChildren();
      yazi(c, kg, x + 24, y + 46, a.ad, { size: 28, hiza: 'start' });
      terim(c, kg, x + 222, y + 46, a.son, { size: 26, renk: SOLUK });
      kartlar[a.ad] = sema(c, kg, x + 298, y + 14, a.dolum, { k: 0.5, ara: 6 }).kutular;
      return belir(c, kg, 350);
    };
    await belir(c, g);
    await c.say('Dört atomu doğru kutuya yerleştir.', { noWait: true });
    for (const a of AYIR) {
      await goster(a);
      await c.choice({ tag: 'Sıra sende', q: ust(`<b>${a.ad}</b> (dizilimi ${a.son} ile biter) hangi kutuya girer?`),
        options: ['Küresel simetri gösterir', 'Göstermez'], answer: a.gosterir ? 0 : 1,
        hints: [a.ipucu, a.ipucu], right: ust(a.neden),
        onPick: (i, dogru) => { if (dogru) yerlestir(a); } });
    }
    /* Üstte boşalan yere, cümlenin anlattığı durum büyük çizilir. */
    const ustte = async (son, dolum, metin, renk) => {
      const w = dolum.length * 72 - 8;
      bekleyen.replaceChildren();
      terim(c, bekleyen, 500, 70, son, { size: 36 });
      sema(c, bekleyen, 500 - w / 2, 92, dolum, { k: 0.8, ara: 8 });
      yazi(c, bekleyen, 500, 200, metin, { size: 28, renk });
      await belir(c, bekleyen, 350);
    };
    await ustte('p⁵', ['ud', 'ud', 'u'], 'bir kutu tek kalır', HATA);
    await parlat(c, [kartlar.Klor[2], kartlar.Flor[2]], HATA);
    await c.say('Klorun ve florun p orbitallerinde beş elektron vardır; bir kutu tek kalır.',
      { speak: 'Klorun ve florun pe orbitallerinde beş elektron vardır; bir kutu tek kalır.' });
    await ustte('s¹', ['u'], 'tek orbital, yarı dolu', IYI);
    await parlat(c, kartlar.Hidrojen, IYI);
    await c.say('Hidrojenin tek orbitali bir elektronla yarı doludur; küresel simetri gösterir.');
  }

  /* ---- Sahne 7 · Dengeli dizilim, kararlı atom ---- */
  async function kararli(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    /* Bir atomun 2p kutuları: üstte ad ve elektron sayısı, altta dizilimin sonu; karar() işaret ve sonucu yazar. */
    const atom = (x, ad, sayi, son, dolum) => {
      const ag = c.S('g', {}, g);
      yazi(c, ag, x, 86, ad, { size: 36 });
      yazi(c, ag, x, 124, sayi, { size: 26, renk: SOLUK });
      const kutular = sema(c, ag, x - 130, 150, dolum).kutular;
      terim(c, ag, x, 280, son, { size: 30 });
      const karar = (gosterir) => {
        const kg = c.S('g', {}, ag);
        (gosterir ? tik : carpi)(c, kg, x - 180, 332, 12);
        yazi(c, kg, x + 14, 342, gosterir ? 'küresel simetri gösterir' : 'küresel simetri göstermez', { size: 26, renk: gosterir ? IYI : HATA });
        return belir(c, kg, 350);
      };
      return { g: ag, kutular, karar };
    };
    const azot = atom(270, 'Azot', '7 elektron', '2p³', ['u', 'u', 'u']);
    const oksijen = atom(730, 'Oksijen', '8 elektron', '2p⁴', ['ud', 'u', 'u']);
    await belir(c, g);
    await c.say('Azot ile oksijen arasında yalnızca bir elektron fark vardır.');
    await azot.karar(true);
    await c.say('Azotun dizilimi 2p³ ile biter; küresel simetri gösterir.',
      { speak: 'Azotun dizilimi iki pe üç ile biter; küresel simetri gösterir.' });
    await oksijen.karar(false);
    await c.say('Oksijenin dizilimi 2p⁴ ile biter; küresel simetri göstermez.',
      { speak: 'Oksijenin dizilimi iki pe dört ile biter; küresel simetri göstermez.' });
    await belir(c, yazi(c, g, 270, 404, 'daha kararlı', { size: 34, renk: IYI }), 350);
    await c.say('Bu yüzden azotun dizilimi oksijeninkinden daha kararlıdır.');
    await c.choice({ tag: 'Uygula', q: 'Hangi atomdan bir elektron koparmak daha zordur?', options: ['Oksijen', 'İkisi aynıdır', 'Azot'], answer: 2,
      hints: ['Oksijenin dizilimi küresel simetri göstermez; daha kararlı olan öteki atom.', 'Dizilimleri aynı kararlılıkta değil: yalnızca biri küresel simetri gösterir.', ''],
      right: 'Azot daha kararlı; kararlı bir atomdan elektron koparmak daha zordur.' });
    const cekilen = azot.kutular[2].oklar[0];
    await belir(c, yazi(c, g, 500, 480, 'azottan elektron koparmak daha zor', { size: 30 }), 350);
    await c.tween(1100, (e, t) => cekilen.setAttribute('transform', `translate(0 ${-30 * Math.sin(Math.PI * t)})`));
    await c.say('Azot daha kararlı olduğu için elektronunu koparmak daha zordur.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    const neon = c.S('g', {}, g);
    yazi(c, neon, 386, 90, 'Neon', { size: 36 });
    terim(c, neon, 386, 134, '1s² 2s² 2p⁶', { size: 30, renk: SOLUK });
    sema(c, neon, 150, 160, ['ud'], { k: 0.9 });
    sema(c, neon, 260, 160, ['ud'], { k: 0.9 });
    sema(c, neon, 390, 160, ['ud', 'ud', 'ud'], { k: 0.9, ara: 8 });
    [['1s', 186], ['2s', 296], ['2p', 506]].forEach(([ad, x]) => yazi(c, neon, x, 270, ad, { size: 28 }));
    yazi(c, neon, 386, 322, 'bütün orbitaller tam dolu', { size: 28, renk: IYI });
    await belir(c, neon);
    await c.say('Neonun bütün orbitalleri tam doludur; bu yüzden çok kararlıdır.');
    const lamba = c.S('g', {}, g);
    ciz.lamba(c, lamba, 810, 200);
    yazi(c, lamba, 810, 270, 'bileşik oluşturmaz', { size: 26, renk: SOLUK });
    await belir(c, lamba);
    await c.say('Baştaki neon gazının bileşik oluşturmamasının nedeni budur.');
    const sodyum = c.S('g', {}, g);
    yazi(c, sodyum, 150, 464, 'Sodyum', { size: 32, hiza: 'start' });
    sema(c, sodyum, 300, 412, ['u'], { k: 0.9, renk: VURGU });
    terim(c, sodyum, 400, 464, '3s¹: tek valans elektronu', { size: 30, hiza: 'start' });
    await belir(c, sodyum);
    await c.say("Sodyumu farklı kılan ise 3s’deki tek valans elektronuydu.",
      { speak: 'Sodyumu farklı kılan ise üç se orbitalindeki tek valans elektronuydu.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    sema(c, g, 190, 120, ['u', 'u', 'u'], { k: 0.8, ara: 8 });
    yazi(c, g, 302, 234, 'yarı dolu', { size: 28, renk: SOLUK });
    sema(c, g, 586, 120, ['ud', 'ud', 'ud'], { k: 0.8, ara: 8 });
    yazi(c, g, 698, 234, 'tam dolu', { size: 28, renk: SOLUK });
    yazi(c, g, 500, 350, 'Yarı dolu ya da tam dolu:', { size: 38, renk: VURGU });
    yazi(c, g, 500, 404, 'dengeli dizilim, kararlı atom', { size: 38, renk: VURGU });
    await belir(c, g);
    await c.say('Yarı dolu ya da tam dolu: dengeli dizilim, kararlı atom.',
      { speak: 'Yarı dolu ya da tam dolu: [short pause] dengeli dizilim, kararlı atom.' });
  }

  Ders.start({
    id: 'etkilesim-e3', kicker: 'Konu E · Elektron dizilimi', title: 'Dengeli doluluk ve valans', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Dengeli doluluk ve valans', hook: 'Azot ile oksijen arasında tek elektron fark var; hangisinin dizilimi daha kararlı?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Tek elektronluk fark', goal: 'Valans elektronlarını en dış seviyede bul.', run: tekFark },
      { title: 's ve p birlikte sayılır', goal: 'En dış seviyedeki s ve p elektronlarını topla.', run: sVeP },
      { title: 'Dizilim d ile bitiyorsa', goal: 'Son s ve d elektronlarını birlikte say.', run: dIleBiten },
      { title: 'Yarı dolu, tam dolu', goal: 'Eş enerjili kutuların eşit dolup dolmadığına bak.', run: yariTam },
      { title: 'Küresel simetri', goal: 'Eşit dolulukla dengeli çekimi ilişkilendir.', run: kuresel },
      { title: 'Küresel simetriyi ayır', goal: 'Dört atomu diziliminin sonuna göre ayır.', run: ayir },
      { title: 'Dengeli dizilim, kararlı atom', goal: 'Küresel simetriyi kararlılığa bağla.', run: kararli },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: ust('Fosforun dizilimi 1s² 2s² 2p⁶ 3s² 3p³. Kaç valans elektronu vardır?'),
        options: ['3', '5', '15'], answer: 1,
        why: [ust('Yalnızca 3p³ sayılmış; aynı seviyedeki 3s² de sayılır.'), ust('En dış seviye üçüncüdür; 3s² ve 3p³ birlikte sayılır.'), 'On beş, bütün elektronların sayısıdır; iç seviyeler sayılmaz.'], scene: 1 },
      { q: 'Hangi atom küresel simetri gösterir?',
        options: ['Alüminyum (dizilimi 3p¹ ile biter)', 'Kükürt (dizilimi 3p⁴ ile biter)', 'Magnezyum (dizilimi 3s² ile biter)'].map(ust), answer: 2,
        why: [ust('3p¹: üç kutunun yalnızca birinde elektron vardır; eşit dolmamıştır.'), ust('3p⁴: bir kutuda çift, iki kutuda tek elektron vardır; ne yarı ne tam doludur.'), ust('3s² tam doludur; tam dolu orbitalle biten dizilim küresel simetri gösterir.')], scene: 5 },
    ], summary: ['<b>Yarı dolu ya da tam dolu: dengeli dizilim, kararlı atom.</b>', 'Valans elektronları en dış enerji seviyesindedir; atomun kimyasal özelliklerini onların sayısı belirler.'],
    nextLesson: { href: 'f1-dizilimden-adrese.html', label: 'Sonraki: Dizilim adres verir ›' },
  });
})();
