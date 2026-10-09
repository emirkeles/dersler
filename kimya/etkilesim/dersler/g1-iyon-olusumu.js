/* G1 · KİM.9.1.7 · Senaryo: plan/kimya/etkilesim/senaryolar/G-iyon-olusumu.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 73–76'dan; valans elektronu s. 62, soy gazların kararlılığı s. 72 (önceki dersler).
   Yalnızca ilk 20 element; dizilimler tam yazılır. Kutu orbitaldir, ok elektrondur; yörünge çizilmez.
   Proton ve elektron sayıları atom numarasından ve iyon yükünden hesaplanır. Sahne 5'teki iki çubuk temsilidir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = KIT;
  const EL = 'var(--c1)', PR = 'var(--c2)', KOYU = '#162038', IYI = 'var(--good)', KOTU = 'var(--bad)';

  /* Üs ve yük simgeleri veride üst simge karakteriyle durur (senaryodaki gibi); tahtada ve panelde gerçek üs olarak çizilir. */
  const UST = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '−' };
  const UST_RE = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g;
  const duz = (m) => [...m].map((h) => UST[h]).join('');
  const mat = (s) => s.replace(UST_RE, (m) => '^{' + duz(m) + '}'); // SVG yazısı (c.S math)
  const ust = (s) => s.replace(UST_RE, (m) => '<sup>' + duz(m) + '</sup>'); // altyazı, soru, şık, defter

  const D10 = '1s²2s²2p⁶', D18 = '1s²2s²2p⁶3s²3p⁶';
  /* dis: en yüksek enerji seviyesinde değişen orbitaller [ad, atomdaki elektron, iyondaki elektron]. */
  const T = {
    Na: { ad: 'Na', iyon: 'Na⁺', p: 11, e: 10, once: D10 + '3s¹', sonra: D10, dis: [['3s', 1, 0]] },
    Ca: { ad: 'Ca', iyon: 'Ca²⁺', p: 20, e: 18, once: D18 + '4s²', sonra: D18, dis: [['4s', 2, 0]] },
    Al: { ad: 'Al', iyon: 'Al³⁺', p: 13, e: 10, once: D10 + '3s²3p¹', sonra: D10, dis: [['3s', 2, 0], ['3p', 1, 0]], vurgu: 'seviye' },
    F: { ad: 'F', iyon: 'F⁻', p: 9, e: 10, once: '1s²2s²2p⁵', sonra: D10, dis: [['2p', 5, 6]] },
    S: { ad: 'S', iyon: 'S²⁻', p: 16, e: 18, once: D10 + '3s²3p⁴', sonra: D18, dis: [['3p', 4, 6]] },
    N: { ad: 'N', iyon: 'N³⁻', p: 7, e: 10, once: '1s²2s²2p³', sonra: D10, dis: [['2p', 3, 6]] },
    Cl: { ad: 'Cl', iyon: 'Cl⁻', p: 17, e: 18, once: D10 + '3s²3p⁵', sonra: D18, dis: [['3p', 5, 6]] },
    Mg: { ad: 'Mg', iyon: 'Mg²⁺', p: 12, e: 10, once: D10 + '3s²', sonra: D10, dis: [['3s', 2, 0]] },
  };
  const D_K = D18 + '4s¹';

  const sil = async (c, el, ms = 350) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const gizle = (...parcalar) => parcalar.forEach((el) => { el.style.opacity = 0; });
  const nabiz = (c, el) => c.tween(700, (e) => el.setAttribute('stroke-width', 4 + 6 * Math.sin(Math.PI * e)));
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const ok = (c, p, x1, y1, x2, y2, renk = RENK.cizgi) => {
    const a = Math.atan2(y2 - y1, x2 - x1), u = (d) => `${(x2 - 14 * Math.cos(a + d)).toFixed(1)} ${(y2 - 14 * Math.sin(a + d)).toFixed(1)}`;
    return c.S('path', { d: `M ${x1} ${y1} L ${x2} ${y2} M ${u(0.5)} L ${x2} ${y2} L ${u(-0.5)}`,
      fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  };

  /* Üs ve yük içeren tahta yazısı (Na⁺, 11p⁺, 10e⁻). */
  const yaziM = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34,
    'font-weight': o.kalin || 600, style: 'fill:' + (o.renk || 'var(--text)'), math: mat(metin) }, p);

  /* Elektron dizilimi: üsler küçük ve yukarıda. vurgu 'son': son terim; 'seviye': en yüksek enerji seviyesinin terimleri. */
  function dizilimYaz(c, p, x, y, dizilim, o = {}) {
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34, 'font-weight': 600 }, p);
    const terimler = [...dizilim.matchAll(/(\d)([spdf])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)];
    const enUst = Math.max(...terimler.map((m) => +m[1]));
    terimler.forEach((m, i) => {
      const vurgulu = o.vurgu === false ? false : o.vurgu === 'seviye' ? +m[1] === enUst : i === terimler.length - 1;
      const renk = 'fill:' + (vurgulu ? RENK.vurgu : 'var(--text)');
      const taban = c.S('tspan', { style: renk, text: m[1] + m[2] }, t);
      if (i) taban.setAttribute('dy', '0.385em');
      c.S('tspan', { style: renk, dy: '-0.55em', 'font-size': '0.7em', text: duz(m[3]) }, t);
    });
    return t;
  }

  /* ---- Atom → iyon şeması: solda atom, çekirdek rozeti ve iyon; ortada en yüksek enerji seviyesinin kutuları. ---- */
  const OY = 253, KUTU_W = 64, KUTU_ADIM = 74;
  const okCiz = (c, p, asagi) => c.S('path', { d: asagi ? 'M 0 -20 v 40 m -8 -10 l 8 10 l 8 -10' : 'M 0 20 v -40 m -8 10 l 8 -10 l 8 10',
    fill: 'none', stroke: EL, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  /* n elektronun kutulardaki yeri: önce her kutuya yukarı ok, sonra aşağı ok. */
  function yerler(ad, n, x) {
    const kutuSayisi = ad[1] === 'p' ? 3 : 1, liste = [];
    for (let j = 0; j < n; j++) {
      const asagi = j >= kutuSayisi, k = asagi ? j - kutuSayisi : j;
      liste.push({ x: x + k * KUTU_ADIM + (asagi ? 44 : 20), asagi });
    }
    return liste;
  }
  /* t = 0: atom, t = 1: iyon. Verilen elektron kutudan sağa çıkar; alınan elektron sağdan gelip boş yere girer. */
  function ayarla(s, t) {
    s.hareketli.forEach(({ el, hayalet, yer, dis, gelen }) => {
      const k = gelen ? 1 - t : t;
      el.setAttribute('transform', `translate(${(yer.x + (dis.x - yer.x) * k).toFixed(1)} ${OY})`);
      if (gelen) {
        el.style.opacity = Math.min(1, t * 5);
        hayalet.style.opacity = t < 1 ? 1 : 0;
      }
    });
  }
  function sema(c, svg, v) {
    const g = c.S('g', {}, svg), verir = v.e < v.p;
    const atom = c.S('g', {}, g);
    yaziM(c, atom, 158, 86, v.ad, { size: 40, hiza: 'end' });
    const atomE = yaziM(c, atom, 176, 86, v.p + 'e⁻', { size: 34, hiza: 'start', renk: EL });
    const dizilimUst = dizilimYaz(c, g, 640, 86, v.once, { vurgu: v.vurgu });
    const rozet = c.S('g', {}, g);
    const halka = c.S('circle', { cx: 170, cy: 270, r: 62, fill: KOYU, stroke: PR, 'stroke-width': 4 }, rozet);
    yaziM(c, rozet, 170, 283, v.p + 'p⁺', { size: 36, renk: PR });
    const rozetAlt = yazi(c, rozet, 170, 366, 'çekirdek', { size: 24, renk: RENK.soluk });
    const orbital = c.S('g', {}, g), hareketli = [];
    const genislik = (ad) => (ad[1] === 'p' ? 2 * KUTU_ADIM + KUTU_W : KUTU_W);
    let x = 570 - (v.dis.reduce((t, [ad]) => t + genislik(ad), 0) + (v.dis.length - 1) * 56) / 2;
    v.dis.forEach(([ad, once, sonra]) => {
      yazi(c, orbital, x + genislik(ad) / 2, 198, ad, { size: 30, renk: EL });
      for (let k = 0; k < (ad[1] === 'p' ? 3 : 1); k++) {
        c.S('rect', { x: x + k * KUTU_ADIM, y: OY - 38, width: KUTU_W, height: 76, rx: 5, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, orbital);
      }
      yerler(ad, Math.max(once, sonra), x).forEach((yer, j) => {
        const degisir = j >= Math.min(once, sonra), gelen = sonra > once;
        const hayalet = degisir && gelen
          ? c.S('line', { x1: yer.x, y1: OY - 18, x2: yer.x, y2: OY + 18, stroke: RENK.soluk, 'stroke-width': 3, 'stroke-dasharray': '5 6' }, orbital) : null;
        const el = okCiz(c, orbital, yer.asagi);
        el.setAttribute('transform', `translate(${yer.x} ${OY})`);
        if (degisir) hareketli.push({ el, hayalet, yer, gelen });
      });
      x += genislik(ad) + 56;
    });
    hareketli.forEach((h, m) => { h.dis = { x: 880 + (m - (hareketli.length - 1) / 2) * 30 }; });
    const orbitalAlt = yazi(c, orbital, 570, 338, '', { size: 24, renk: RENK.soluk });
    const disari = yazi(c, g, 880, 330, 'verilen elektron', { size: 24, renk: RENK.soluk });
    const iyon = c.S('g', {}, g);
    const iyonAd = yaziM(c, iyon, 158, 476, v.iyon, { size: 40, hiza: 'end' });
    const iyonE = yaziM(c, iyon, 176, 476, v.e + 'e⁻', { size: 34, hiza: 'start', renk: EL });
    const dizilimAlt = dizilimYaz(c, g, 640, 476, v.sonra);
    const yuk = yazi(c, g, 170, 528, '', { size: 26, renk: RENK.vurgu });
    const s = { v, g, verir, atomE, dizilimUst, halka, rozetAlt, orbital, orbitalAlt, hareketli, disari, iyon, iyonAd, iyonE, dizilimAlt, yuk };
    gizle(disari);
    ayarla(s, 0);
    return s;
  }
  const yukMetni = (v) => `yük ${v.e < v.p ? '+' : '−'}${Math.abs(v.p - v.e)} · ${v.e < v.p ? 'katyon' : 'anyon'}`;
  /* Elektronun hareketi: değişen elektronlar vurgu rengine döner, sonra taşınır. */
  async function aktar(c, s, ms = 1300) {
    s.hareketli.forEach((h) => h.el.setAttribute('stroke', RENK.vurgu));
    await c.tween(ms, (e) => ayarla(s, e));
    if (s.verir) await belir(c, s.disari, 300);
  }
  /* Seçici için: iyonun oluştuğu son durum, bütün parçalarıyla. */
  function sonHal(s) {
    s.hareketli.forEach((h) => h.el.setAttribute('stroke', RENK.vurgu));
    ayarla(s, 1);
    if (s.verir) s.disari.style.opacity = 1;
    s.yuk.textContent = yukMetni(s.v);
  }

  /* ---- Sahne 1 · Tuzdaki sodyum ---- */
  async function tuzdakiSodyum(c) {
    const svg = c.svg();
    const resim = c.S('g', {}, svg);
    const hava = c.S('g', {}, resim);
    yazi(c, hava, 90, 250, 'oksijen', { size: 26, renk: RENK.vurgu });
    yazi(c, hava, 440, 250, 'su buharı', { size: 26, renk: RENK.vurgu });
    const havaOk = c.S('g', {}, hava);
    ok(c, havaOk, 130, 264, 206, 318, RENK.vurgu);
    ok(c, havaOk, 392, 264, 318, 318, RENK.vurgu);
    const kavanoz = c.S('g', {}, resim);
    kutu(c, kavanoz, 190, 168, 140, 26, { rx: 6 });
    kutu(c, kavanoz, 170, 192, 180, 200, { rx: 16 });
    c.S('rect', { x: 174, y: 244, width: 172, height: 144, rx: 12, fill: RENK.vurgu, opacity: 0.22 }, kavanoz);
    yazi(c, kavanoz, 260, 282, 'mineral yağ', { size: 24, renk: RENK.vurgu });
    gizle(kavanoz);
    c.S('path', { d: 'M 215 352 L 230 314 L 285 307 L 310 340 L 290 364 L 235 367 Z', fill: '#c9d1e6', stroke: '#8f9bbd', 'stroke-width': 3, 'stroke-linejoin': 'round' }, resim);
    c.S('path', { d: 'M 230 314 L 262 338 L 310 340 M 262 338 L 235 367', fill: 'none', stroke: '#8f9bbd', 'stroke-width': 2 }, resim);
    yazi(c, resim, 260, 440, 'Sodyum metali', { size: 28 });
    await belir(c, resim);
    await c.say('Sodyum metali havadaki oksijenle ve su buharıyla tepkimeye girer.');
    await c.tween(450, (e) => { kavanoz.style.opacity = e; havaOk.style.opacity = 1 - e; hava.style.opacity = 1 - 0.55 * e; });
    await c.say('Bu yüzden laboratuvarda mineral yağ içinde saklanır.');
    const tuzluk = c.S('g', {}, resim);
    c.S('path', { d: 'M 652 392 L 664 262 L 736 262 L 748 392 Z', fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, tuzluk);
    c.S('path', { d: 'M 657 340 L 743 340 L 747 389 L 653 389 Z', fill: '#c9d1e6', opacity: 0.85 }, tuzluk);
    c.S('path', { d: 'M 664 262 A 36 32 0 0 1 736 262 Z', fill: '#8f9bbd', stroke: RENK.cizgi, 'stroke-width': 3 }, tuzluk);
    [-14, 0, 14].forEach((dx) => c.S('circle', { cx: 700 + dx, cy: 247, r: 3.5, fill: KOYU }, tuzluk));
    yazi(c, tuzluk, 700, 440, 'Sofra tuzu', { size: 28 });
    await belir(c, tuzluk);
    await c.say('Yeryüzündeki sodyumun büyük kısmı ise sofra tuzunun yapısındadır.');
    const hal = c.S('g', {}, resim);
    yazi(c, hal, 260, 486, 'atom hâlinde', { size: 28, renk: EL });
    yazi(c, hal, 700, 486, 'iyon hâlinde', { size: 28, renk: PR });
    await belir(c, hal, 400);
    await c.say('Tuzdaki sodyum atom hâlinde değil, iyon hâlindedir.');

    await sil(c, resim);
    const tur = c.S('g', {}, svg);
    yazi(c, tur, 500, 64, 'İyon: yüklü tanecik', { size: 30, renk: RENK.soluk });
    const SX = [190, 500, 810];
    const daire = (i, renk) => c.S('circle', { cx: SX[i], cy: 250, r: 66, fill: KOYU, stroke: renk, 'stroke-width': 4 }, tur);
    const arti = c.S('g', {}, tur), eksi = c.S('g', {}, tur), notr = c.S('g', {}, tur);
    arti.appendChild(daire(1, PR));
    yazi(c, arti, SX[1], 274, '+', { size: 70, renk: PR });
    eksi.appendChild(daire(2, EL));
    yazi(c, eksi, SX[2], 272, '−', { size: 70, renk: EL });
    notr.appendChild(daire(0, RENK.cizgi));
    yaziM(c, notr, SX[0], 261, 'p⁺ = e⁻', { size: 30 });
    yazi(c, notr, SX[0], 152, 'Nötr atom', { size: 32 });
    gizle(notr);
    await belir(c, tur);
    await c.say('İyon, pozitif ya da negatif yüklü taneciktir.');
    await belir(c, notr, 400);
    await c.say('Nötr atomda pozitif proton sayısı, negatif elektron sayısına eşittir.');
    const adlar = c.S('g', {}, tur);
    yazi(c, adlar, SX[1], 152, 'Katyon', { size: 32, renk: PR });
    yazi(c, adlar, SX[2], 152, 'Anyon', { size: 32, renk: EL });
    yazi(c, adlar, SX[1], 358, 'pozitif yüklü', { size: 26, renk: RENK.soluk });
    yazi(c, adlar, SX[2], 358, 'negatif yüklü', { size: 26, renk: RENK.soluk });
    await belir(c, adlar, 400);
    await c.say('Pozitif yüklü iyona katyon, negatif yüklü iyona anyon denir.');
    const ornek = c.S('g', {}, tur);
    yaziM(c, ornek, SX[1], 420, 'Na⁺', { size: 40 });
    yaziM(c, ornek, SX[2], 420, 'Cl⁻', { size: 40 });
    await belir(c, ornek, 400);
    await c.say(ust('Örneğin Na⁺ bir katyon, Cl⁻ bir anyondur.'),
      { speak: 'Örneğin artı bir yüklü sodyum iyonu bir katyon, eksi bir yüklü klor iyonu bir anyondur.' });

    const bilinmeyen = yazi(c, tur, 500, 506, '20 proton · 18 elektron → ?', { size: 30, renk: RENK.vurgu });
    await belir(c, bilinmeyen, 350);
    await c.choice({ tag: 'Uygula', q: 'Bir tanecikte 20 proton ve 18 elektron var. Bu tanecik nedir?', options: ['Anyon', 'Nötr atom', 'Katyon'], answer: 2,
      hints: ['Anyon negatif yüklüdür; burada pozitif yüklü protonlar daha çok.', 'Nötr atomda proton ve elektron sayıları eşittir; burada 20 ve 18.', ''],
      right: 'İki proton fazla: yük pozitif.',
      onPick: (i, dogru) => { if (dogru) bilinmeyen.textContent = '20 proton > 18 elektron → katyon'; } });
    await nabiz(c, arti.firstChild);
    await c.say('Proton sayısı elektron sayısından fazlaysa yük pozitiftir; tanecik katyondur.');
    await sil(c, bilinmeyen, 300);
    const soru = c.S('g', {}, tur);
    ok(c, soru, 264, 250, 424, 250, RENK.vurgu);
    yazi(c, soru, 344, 232, '?', { size: 40, renk: RENK.vurgu });
    await belir(c, soru, 400);
    await c.say('Peki nötr bir atom nasıl iyona dönüşür?', { speak: '[curious] Peki nötr bir atom nasıl iyona dönüşür?' });
  }

  /* ---- Sahne 2 · Sodyum bir elektron verir ---- */
  async function sodyumVerir(c) {
    const svg = c.svg();
    const s = sema(c, svg, T.Na);
    gizle(s.dizilimUst, s.orbital, s.iyon, s.dizilimAlt);
    await belir(c, s.g);
    await c.say('Sodyum atomunda 11 proton ve 11 elektron vardır.', { speak: 'Sodyum atomunda on bir proton ve on bir elektron vardır.' });
    await belir(c, s.dizilimUst, 400);
    await c.say(ust('Elektron dizilimi 3s¹ ile biter.'), { speak: 'Elektron dizilimi üç se bir ile biter.' });
    s.orbitalAlt.textContent = 'en yüksek enerji seviyesi';
    await belir(c, s.orbital, 400);
    await c.say('En yüksek enerji seviyesi üçüncüdür; orada tek elektron bulunur.');
    s.hareketli[0].el.setAttribute('stroke', RENK.vurgu);
    s.orbitalAlt.textContent = 'valans elektronu';
    s.orbitalAlt.style.fill = RENK.vurgu;
    await belir(c, s.orbitalAlt, 350);
    await c.say('En dış enerji seviyesindeki elektronlara valans elektronu dendiğini görmüştük.');
    s.orbitalAlt.textContent = '';
    await aktar(c, s);
    await c.say('Sodyum atomu, 3s orbitalindeki bu valans elektronunu verir.', { speak: 'Sodyum atomu, üç se orbitalindeki bu valans elektronunu verir.' });
    gizle(s.iyonAd);
    await Promise.all([belir(c, s.iyon, 400), belir(c, s.dizilimAlt, 400)]);
    await c.say(ust('Geriye 10 elektron kalır; dizilim 2p⁶ ile biter.'), { speak: 'Geriye on elektron kalır; dizilim iki pe altı ile biter.' });
    await nabiz(c, s.halka);
    await c.say('Çekirdekteki 11 proton ise yerinde durur.', { speak: 'Çekirdekteki on bir proton ise yerinde durur.' });

    await c.choice({ tag: 'Uygula', q: 'Oluşan taneciğin yükü ve türü nedir?', options: ['−1; anyon', '+1; katyon', '0; nötr atom'], answer: 1,
      hints: ['Elektron veren atomda protonlar fazla kalır; yük negatif olmaz.', '', 'Proton 11, elektron 10; sayılar artık eşit değil.'],
      right: '11 proton, 10 elektron: bir pozitif yük fazla.' });
    s.yuk.textContent = yukMetni(T.Na);
    await Promise.all([belir(c, s.iyonAd, 400), belir(c, s.yuk, 400)]);
    await c.say(ust('11 proton, 10 elektron: yük +1, tanecik Na⁺ katyonu.'),
      { speak: 'On bir proton, on elektron: yük artı bir, tanecik artı bir yüklü sodyum katyonu.' });
    s.rozetAlt.textContent = 'hâlâ sodyum';
    s.rozetAlt.style.fill = PR;
    await nabiz(c, s.halka);
    await c.say('Proton sayısı değişmediği için tanecik hâlâ sodyumdur.', { speak: '[thoughtful] Proton sayısı değişmediği için tanecik hâlâ sodyumdur.' });
    s.atomE.style.fill = RENK.vurgu;
    s.iyonE.style.fill = RENK.vurgu;
    await belir(c, ok(c, s.g, 292, 100, 292, 450, RENK.vurgu), 400);
    await c.say('Atom iyona dönüşürken yalnızca elektron sayısı değişir.', { speak: 'Atom iyona dönüşürken [short pause] yalnızca elektron sayısı değişir.' });
    c.note('<b>İyon oluşurken elektron sayısı değişir, proton sayısı değişmez.</b><br>Na → Na<sup>+</sup>', 'İyon oluşumu');
  }

  /* ---- Sahne 3 · Elektron veren atomlar ---- */
  function liste(c, svg, baslik, satirlar, alt) {
    const g = c.S('g', {}, svg);
    yazi(c, g, 500, 70, baslik, { size: 32, renk: RENK.soluk });
    satirlar.forEach(([sol, sag], i) => {
      const y = 110 + i * 100;
      kutu(c, g, 170, y, 660, 78);
      yaziM(c, g, 340, y + 51, sol, { size: 36 });
      if (sag) yazi(c, g, 660, y + 50, sag, { size: 30, renk: RENK.vurgu });
    });
    if (alt) yazi(c, g, 500, 462, alt, { size: 28, renk: RENK.vurgu });
    return g;
  }
  async function elektronVerenler(c) {
    const svg = c.svg();
    const giris = liste(c, svg, 'Elektron veren atomlar', [['Na → Na⁺', '1 elektron verdi'], ['Ca → ?', ''], ['Al → ?', '']]);
    await belir(c, giris);
    await c.say('Başka atomlar da en yüksek enerji seviyesindeki elektronlarını verebilir.');

    await sil(c, giris);
    const ca = sema(c, svg, T.Ca);
    gizle(ca.orbital, ca.iyon, ca.dizilimAlt);
    await belir(c, ca.g);
    await c.say(ust('Kalsiyumun dizilimi 4s² ile biter; 20 protonu vardır.'), { speak: 'Kalsiyumun dizilimi dört se iki ile biter; yirmi protonu vardır.' });
    ca.orbitalAlt.textContent = 'en yüksek enerji seviyesi';
    await belir(c, ca.orbital, 400);
    await c.say('En yüksek enerji seviyesi dördüncüdür; 4s orbitalinde iki elektron bulunur.',
      { speak: 'En yüksek enerji seviyesi dördüncüdür; dört se orbitalinde iki elektron bulunur.' });
    await aktar(c, ca);
    await belir(c, ca.iyon, 400);
    await c.say(ust('Kalsiyum bu iki elektronu verir ve Ca²⁺ katyonu oluşur.'),
      { speak: 'Kalsiyum bu iki elektronu verir ve artı iki yüklü kalsiyum katyonu oluşur.' });
    await belir(c, ca.dizilimAlt, 400);
    await c.say(ust('Ca²⁺ iyonunun dizilimi 3p⁶ ile biter.'), { speak: 'Artı iki yüklü kalsiyum iyonunun dizilimi üç pe altı ile biter.' });
    ca.iyonAd.style.fill = RENK.vurgu;
    await belir(c, yazi(c, ca.g, 860, 376, '2 elektron → yük 2+', { size: 26, renk: RENK.vurgu }), 400);
    await c.say('Verilen elektron sayısı, katyonun yükündeki sayıya eşittir.');

    await sil(c, ca.g);
    const al = sema(c, svg, T.Al);
    gizle(al.iyon, al.dizilimAlt);
    al.orbitalAlt.textContent = 'en yüksek enerji seviyesi';
    await belir(c, al.g);
    await c.choice({ tag: 'Uygula', q: ust('Alüminyumun dizilimi 1s²2s²2p⁶3s²3p¹. Al³⁺ oluşurken hangi elektronlar verilir?'),
      options: ['Yalnızca 3p elektronu', 'İki 3s ve bir 3p elektronu', '2p’deki üç elektron'], answer: 1,
      hints: ['Tek elektron verilirse yük 1+ olur; 3+ için üç elektron gerekir.', '', '2p en yüksek enerji seviyesinde değil; elektronlar üçüncü seviyeden çıkar.'],
      right: 'Üç elektron da en yüksek enerji seviyesinden, üçüncü seviyeden çıkar.' });
    await aktar(c, al);
    await c.say('Üç elektron gerekir: iki 3s ve bir 3p elektronu.', { speak: 'Üç elektron gerekir: iki tane üç se ve bir tane üç pe elektronu.' });
    al.orbitalAlt.textContent = 'üçüncü enerji seviyesi boş';
    await Promise.all([belir(c, al.iyon, 400), belir(c, al.dizilimAlt, 400)]);
    await c.say(ust('Üçüncü enerji seviyesi boşalır; Al³⁺ dizilimi 2p⁶ ile biter.'),
      { speak: 'Üçüncü enerji seviyesi boşalır; artı üç yüklü alüminyum iyonunun dizilimi iki pe altı ile biter.' });

    await sil(c, al.g);
    await belir(c, liste(c, svg, 'Elektronun çıktığı orbital', [['Na → Na⁺', '3s'], ['Ca → Ca²⁺', '4s'], ['Al → Al³⁺', '3s ve 3p']],
      'Hepsi en yüksek enerji seviyesinden'));
    await c.say('Katyon oluşurken elektronlar en yüksek enerji seviyesinden çıkar.');
  }

  /* ---- Sahne 4 · Elektron alan atomlar ---- */
  async function elektronAlanlar(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    kart(c, giris, 'Elektron verir', ['Na, Ca, Al'], { x: 70, y: 160, w: 410, h: 200, renk: RENK.soluk, size: 34 });
    kart(c, giris, 'Elektron alır', ['?'], { x: 520, y: 160, w: 410, h: 200, renk: RENK.vurgu, size: 40 });
    await belir(c, giris);
    await c.say('Bazı atomlar elektron vermez, elektron alır.');

    await sil(c, giris);
    const f = sema(c, svg, T.F);
    gizle(f.orbital, f.iyon, f.dizilimAlt);
    await belir(c, f.g);
    await c.say(ust('Florun dizilimi 2p⁵ ile biter; 9 protonu vardır.'), { speak: 'Florun dizilimi iki pe beş ile biter; dokuz protonu vardır.' });
    f.orbitalAlt.textContent = 'bir elektronluk boş yer';
    await belir(c, f.orbital, 400);
    await c.say('2p orbitallerinde bir elektronluk boş yer vardır.', { speak: 'İki pe orbitallerinde bir elektronluk boş yer vardır.' });
    f.orbitalAlt.textContent = '';
    await aktar(c, f);
    gizle(f.iyonAd);
    await Promise.all([belir(c, f.iyon, 400), belir(c, f.dizilimAlt, 400)]);
    await c.say(ust('Flor bir elektron alır; dizilim 2p⁶ ile biter.'), { speak: 'Flor bir elektron alır; dizilim iki pe altı ile biter.' });
    f.yuk.textContent = yukMetni(T.F);
    await Promise.all([belir(c, f.iyonAd, 400), belir(c, f.yuk, 400)]);
    await c.say(ust('9 proton, 10 elektron: yük −1, tanecik F⁻ anyonu.'),
      { speak: 'Dokuz proton, on elektron: yük eksi bir, tanecik eksi bir yüklü flor anyonu.' });

    await sil(c, f.g);
    const k = sema(c, svg, T.S);
    gizle(k.iyon, k.dizilimAlt);
    await belir(c, k.g, 400);
    await c.wait(500);
    await aktar(c, k);
    await Promise.all([belir(c, k.iyon, 400), belir(c, k.dizilimAlt, 400)]);
    await c.say(ust('Kükürdün dizilimi 3p⁴ ile biter; iki elektron alır ve S²⁻ olur.'),
      { speak: 'Kükürdün dizilimi üç pe dört ile biter; iki elektron alır ve eksi iki yüklü kükürt iyonu olur.' });

    await sil(c, k.g);
    const n = sema(c, svg, T.N);
    gizle(n.iyon, n.dizilimAlt);
    await belir(c, n.g);
    await c.choice({ tag: 'Uygula', q: ust('Azotun dizilimi 1s²2s²2p³. N³⁻ oluşurken ne olur?'),
      options: ['Üç elektron verir; 2p boşalır.', 'Üç elektron alır; elektronlar 3s’ye yerleşir.', 'Üç elektron alır; elektronlar 2p’ye yerleşir.'], answer: 2,
      hints: ['İyonun yükü negatif; negatif iyon elektron alarak oluşur.', '2p’de üç elektronluk boş yer var; elektronlar oraya yerleşir.', ''],
      right: '2p’deki üç boş yer dolar.' });
    await aktar(c, n);
    await Promise.all([belir(c, n.iyon, 400), belir(c, n.dizilimAlt, 400)]);
    await c.say(ust('Azot üç elektron alır; 2p³ dizilimi 2p⁶ olur.'), { speak: 'Azot üç elektron alır; iki pe üç dizilimi iki pe altı olur.' });
    n.orbitalAlt.textContent = 'alınan elektronlar boş yerlerde';
    n.orbitalAlt.style.fill = RENK.vurgu;
    await belir(c, n.orbitalAlt, 350);
    await c.say('Alınan elektronlar en yüksek enerji seviyesindeki boş yerlere yerleşir.');
    n.iyonAd.style.fill = RENK.vurgu;
    await belir(c, yazi(c, n.g, 860, 262, '3 elektron → yük 3−', { size: 26, renk: RENK.vurgu }), 400);
    await c.say('Alınan elektron sayısı, anyonun yükündeki sayıya eşittir.');

    const CIFTLER = ['Na', 'Ca', 'Al', 'F', 'S', 'N'];
    let secili = n;
    const sec = c.slider({ label: 'Atom', min: 0, max: 5, value: 5, fmt: (i) => CIFTLER[i],
      onInput: (i) => { svg.replaceChildren(); secili = sema(c, svg, T[CIFTLER[i]]); sonHal(secili); } });
    await c.say('Atomu değiştir; atom ile iyonun dizilimini karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();
    secili.rozetAlt.textContent = 'proton sayısı aynı';
    secili.rozetAlt.style.fill = PR;
    await nabiz(c, secili.halka);
    await c.say('Hangi atomu seçersen seç, proton sayısı değişmez.');
    c.note('<b>Elektron veren atom katyon, alan atom anyon olur.</b><br>Ca<sup>2+</sup>, F<sup>−</sup>', 'Katyon ve anyon');
  }

  /* ---- Sahne 5 · Neden bu kadar elektron? ---- */
  async function nedenBuKadar(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    [['Na', '1 elektron verir', 250, 170], ['Ca', '2 elektron verir', 250, 340], ['F', '1 elektron alır', 750, 170], ['S', '2 elektron alır', 750, 340]].forEach(([ad, is, x, y]) => {
      yazi(c, giris, x, y, ad, { size: 46 });
      yazi(c, giris, x, y + 46, is, { size: 28, renk: RENK.soluk });
    });
    yazi(c, giris, 500, 300, '?', { size: 110, renk: RENK.vurgu });
    await belir(c, giris);
    await c.say('Atomlar neden tam bu kadar elektron verir ya da alır?', { speak: '[curious] Atomlar neden tam bu kadar elektron verir ya da alır?' });

    await sil(c, giris);
    const soy = c.S('g', {}, svg);
    const GAZ = [['Ne', D10, 270], ['Ar', D18, 730]];
    const dolu = GAZ.map(([ad, , x]) => {
      kutu(c, soy, x - 200, 70, 400, 150, { renk: IYI });
      yazi(c, soy, x, 126, ad, { size: 44 });
      return yazi(c, soy, x, 186, 'orbitalleri tam dolu', { size: 28, renk: IYI });
    });
    await belir(c, soy);
    await c.say('Soy gazların orbitalleri tam doludur; bu yüzden kararlıdırlar.');
    dolu.forEach((t) => t.remove());
    const dizilimler = GAZ.map(([, dizilim, x]) => dizilimYaz(c, soy, x, 190, dizilim, { size: 32 }));
    await Promise.all(dizilimler.map((t) => belir(c, t, 400)));
    await c.say(ust('Neonun dizilimi 2p⁶ ile, argonun dizilimi 3p⁶ ile biter.'), { speak: 'Neonun dizilimi iki pe altı ile, argonun dizilimi üç pe altı ile biter.' });
    const iyonlar = c.S('g', {}, soy);
    [['Na⁺', 180], ['F⁻', 360], ['Ca²⁺', 640], ['S²⁻', 820]].forEach(([ad, x]) => {
      kutu(c, iyonlar, x - 70, 272, 140, 76, { renk: EL });
      yaziM(c, iyonlar, x, 324, ad, { size: 38 });
    });
    await c.tween(600, (e) => { iyonlar.style.opacity = e; iyonlar.setAttribute('transform', `translate(0 ${40 * (1 - e)})`); });
    await c.say(ust('Na⁺ ve F⁻ dizilimi neonla, Ca²⁺ ve S²⁻ dizilimi argonla aynıdır.'),
      { speak: 'Sodyum ve flor iyonlarının dizilimi neonla, kalsiyum ve kükürt iyonlarının dizilimi argonla aynıdır.' });
    const bag = c.S('g', {}, soy);
    [180, 360, 640, 820].forEach((x) => c.S('line', { x1: x, y1: 270, x2: x, y2: 222, stroke: IYI, 'stroke-width': 3 }, bag));
    yazi(c, bag, 500, 410, 'İyonun dizilimi: en yakın soy gazın dizilimi', { size: 28, renk: RENK.vurgu });
    await belir(c, bag, 400);
    await c.say('İyon olan atomun dizilimi, kendine en yakın soy gazınkine benzer.');
    await belir(c, yazi(c, soy, 500, 478, 'kararlı hâl', { size: 38, renk: IYI }), 400);
    await c.say('Atom bu dizilime ulaşınca kararlı hâle gelir.');

    await sil(c, soy);
    const serit = c.S('g', {}, svg);
    const gx = (k) => 110 + k * 100;
    yazi(c, serit, 500, 64, 'A grupları', { size: 30, renk: RENK.soluk });
    for (let k = 0; k < 8; k++) {
      kutu(c, serit, gx(k), 240, 88, 80, { rx: 8, renk: k < 3 ? PR : k > 3 && k < 7 ? EL : RENK.cizgi });
      yazi(c, serit, gx(k) + 44, 291, (k + 1) + 'A', { size: 30 });
    }
    yazi(c, serit, gx(7) + 44, 358, 'soy gaz', { size: 24, renk: RENK.soluk });
    const verenler = c.S('g', {}, serit), alanlar = c.S('g', {}, serit);
    [1, 2, 3].forEach((s, k) => yazi(c, verenler, gx(k) + 44, 218, String(s), { size: 36, renk: PR }));
    yazi(c, verenler, gx(1) + 44, 160, 'elektron verir', { size: 28, renk: PR });
    yazi(c, verenler, gx(1) + 44, 358, 'metaller', { size: 24, renk: RENK.soluk });
    [3, 2, 1].forEach((s, k) => yazi(c, alanlar, gx(k + 4) + 44, 218, String(s), { size: 36, renk: EL }));
    yazi(c, alanlar, gx(5) + 44, 160, 'elektron alır', { size: 28, renk: EL });
    yazi(c, alanlar, gx(5) + 44, 358, 'ametaller', { size: 24, renk: RENK.soluk });
    gizle(alanlar);
    serit.setAttribute('transform', 'translate(0 40)');
    await belir(c, serit);
    await c.say('1A, 2A ve 3A grubu metalleri sırasıyla bir, iki, üç elektron verir.',
      { speak: 'Bir A, iki A ve üç A grubu metalleri sırasıyla bir, iki, üç elektron verir.' });
    await belir(c, alanlar, 400);
    await c.say('7A, 6A ve 5A grubu ametalleri sırasıyla bir, iki, üç elektron alır.',
      { speak: 'Yedi A, altı A ve beş A grubu ametalleri sırasıyla bir, iki, üç elektron alır.' });

    await sil(c, serit);
    const pot = c.S('g', {}, svg);
    const satir = (p, y, ad, dizilim, o) => { yaziM(c, p, 230, y, ad, { size: 38, hiza: 'end' }); return dizilimYaz(c, p, 270, y, dizilim, { size: 32, hiza: 'start', ...o }); };
    satir(pot, 110, 'K', D_K);
    const neSatir = c.S('g', {}, pot);
    yazi(c, neSatir, 150, 190, 'Soy gazlar', { size: 24, renk: RENK.soluk });
    satir(neSatir, 240, 'Ne', D10, { vurgu: false });
    satir(pot, 310, 'Ar', D18, { vurgu: false });
    await belir(c, pot);
    await c.choice({ tag: 'Uygula', q: ust('Potasyumun dizilimi 1s²2s²2p⁶3s²3p⁶4s¹. Hangi iyonu oluşturur ve dizilimi hangi soy gazınkiyle aynı olur?'),
      options: ['K⁺; argon', 'K⁻; argon', 'K⁺; neon'].map(ust), answer: 0,
      hints: ['', 'Tek 4s elektronu verilir; elektron veren atom pozitif yüklenir.', 'Geriye kalan dizilim 3p⁶ ile biter; neonun dizilimi 2p⁶ ile biter.'].map(ust),
      right: ust('4s¹ elektronu verilir; kalan dizilim 3p⁶ ile biter.') });
    await sil(c, neSatir, 300);
    const kArti = c.S('g', {}, pot);
    satir(kArti, 210, 'K⁺', D18, { vurgu: false });
    c.S('path', { d: 'M 640 190 L 668 190 L 668 318 L 640 318', fill: 'none', stroke: IYI, 'stroke-width': 3, 'stroke-linecap': 'round' }, kArti);
    yazi(c, kArti, 686, 264, 'aynı dizilim', { size: 28, hiza: 'start', renk: IYI });
    await belir(c, kArti, 450);
    await c.say(ust('Potasyum 4s¹ elektronunu verir; kalan dizilim argonun dizilimidir.'),
      { speak: 'Potasyum dört se bir elektronunu verir; kalan dizilim argonun dizilimidir.' });
    const enerji = c.S('g', {}, pot), TABAN = 508;
    yazi(c, enerji, 430, 430, 'Koparmak için', { size: 28, hiza: 'end', renk: RENK.soluk });
    yazi(c, enerji, 430, 466, 'gereken enerji', { size: 28, hiza: 'end', renk: RENK.soluk });
    c.S('line', { x1: 470, y1: TABAN, x2: 850, y2: TABAN, stroke: RENK.cizgi, 'stroke-width': 3 }, enerji);
    const cubuk = (x, ad, renk) => { yazi(c, enerji, x + 45, TABAN + 36, ad, { size: 24 }); return c.S('rect', { x, y: TABAN, width: 90, height: 0, rx: 4, fill: renk }, enerji); };
    const ilk = cubuk(520, '1. elektron', EL), ikinci = cubuk(710, '2. elektron', RENK.vurgu);
    const doldur = (r, boy, e) => { r.setAttribute('y', TABAN - boy * e); r.setAttribute('height', boy * e); };
    await belir(c, enerji, 350);
    await c.tween(500, (e) => doldur(ilk, 26, e));
    await c.tween(900, (e) => doldur(ikinci, 140, e));
    await c.say(ust('Kararlı K⁺ iyonundan ikinci elektronu koparmak çok daha fazla enerji ister.'),
      { speak: 'Kararlı artı bir yüklü potasyum iyonundan ikinci elektronu koparmak çok daha fazla enerji ister.' });
    c.note('<b>İyonun dizilimi en yakın soy gazın dizilimine benzer.</b><br>K<sup>+</sup> ve Ar', 'Soy gaz dizilimi');
  }

  /* ---- Sahne 6 · Orbitali bul ---- */
  async function orbitaliBul(c) {
    const svg = c.svg();
    const adimlar = c.S('g', {}, svg);
    const adim = (no, y, satirlar) => {
      const g = c.S('g', {}, adimlar);
      c.S('circle', { cx: 150, cy: y - 11, r: 28, fill: KOYU, stroke: RENK.vurgu, 'stroke-width': 3 }, g);
      yazi(c, g, 150, y, String(no), { size: 32, renk: RENK.vurgu });
      satirlar.forEach((s, i) => yazi(c, g, 210, y + i * 48, s, { size: 32, hiza: 'start' }));
      return g;
    };
    await belir(c, adim(1, 130, ['Atomun dizilimi']));
    await c.say('İyonun dizilimini bulmak için önce atomun dizilimini yazarız.');
    await belir(c, adim(2, 250, ['En yüksek enerji seviyesindeki orbitaller']));
    await c.say('Sonra en yüksek enerji seviyesindeki orbitallere bakarız.');
    await belir(c, adim(3, 370, ['Katyon: elektron çıkar', 'Anyon: elektron boş yere girer']));
    await c.say('Katyonda elektronlar bu orbitallerden çıkar; anyonda boş yerlere girer.');

    await sil(c, adimlar);
    const cl = sema(c, svg, T.Cl);
    gizle(cl.iyon, cl.dizilimAlt);
    yazi(c, cl.g, 170, 136, '7A grubu', { size: 24, renk: RENK.soluk });
    await belir(c, cl.g);
    await c.say(ust('Klorun dizilimi 3p⁵ ile biter; klor 7A grubundadır.'), { speak: 'Klorun dizilimi üç pe beş ile biter; klor yedi A grubundadır.' });
    await c.choice({ tag: 'Uygula', q: ust('Klorun dizilimi 1s²2s²2p⁶3s²3p⁵. Cl⁻ oluşurken elektron hangi orbitale alınır?'), options: ['4s', '3p', '2p'], answer: 1,
      hints: ['3p’de bir elektronluk boş yer var; elektron yeni bir seviyeye geçmez.', '', '2p tam dolu; orada boş yer yok.'],
      right: 'En yüksek enerji seviyesindeki boş yer 3p’de.' });
    await aktar(c, cl);
    await Promise.all([belir(c, cl.iyon, 400), belir(c, cl.dizilimAlt, 400)]);
    await c.say(ust('3p’de bir elektronluk yer vardı; dizilim 3p⁶ ile biter.'), { speak: 'Üç pede bir elektronluk yer vardı; dizilim üç pe altı ile biter.' });
    await belir(c, yazi(c, cl.g, 640, 526, 'argonun dizilimi', { size: 26, renk: IYI }), 400);
    await c.say('Klor böylece argonun dizilimine ulaşır.');

    await sil(c, cl.g);
    const mg = sema(c, svg, T.Mg);
    gizle(mg.iyon, mg.dizilimAlt);
    await belir(c, mg.g);
    await c.choice({ tag: 'Uygula', q: ust('Magnezyumun dizilimi 1s²2s²2p⁶3s². Hangi iyonu oluşturur ve elektronlar hangi orbitalden çıkar?'),
      options: ['Mg²⁻; 3p orbitaline', 'Mg⁺; 2p orbitalinden', 'Mg²⁺; 3s orbitalinden'].map(ust), answer: 2,
      hints: ['Dizilim 3s² ile bitiyor; iki elektron alınırsa neonun dizilimine ulaşılmaz.', 'En yüksek enerji seviyesi üçüncü; elektronlar 2p’den değil, 3s’den çıkar.', ''],
      right: 'İki 3s elektronu verilir; 12 proton, 10 elektron: yük +2.' });
    await aktar(c, mg);
    await belir(c, mg.iyon, 400);
    await c.say(ust('Magnezyum iki 3s elektronunu verir ve Mg²⁺ olur.'),
      { speak: 'Magnezyum iki tane üç se elektronunu verir ve artı iki yüklü magnezyum iyonu olur.' });
    await belir(c, mg.dizilimAlt, 400);
    await belir(c, yazi(c, mg.g, 640, 526, 'neonun dizilimi', { size: 26, renk: IYI }), 350);
    await c.say(ust('Mg²⁺ iyonunun dizilimi, neonun dizilimiyle aynıdır.'), { speak: 'Artı iki yüklü magnezyum iyonunun dizilimi, neonun dizilimiyle aynıdır.' });
  }

  /* ---- Sahne 7 · İzoelektronik tanecikler ---- */
  function tanecikKart(c, p, x, ad, proton, elektron, o = {}) {
    const g = c.S('g', {}, p), w = o.w || 240;
    kutu(c, g, x - w / 2, 100, w, 250, { renk: o.renk });
    yaziM(c, g, x, 168, ad, { size: 44 });
    const pY = yaziM(c, g, x, 240, proton + 'p⁺', { size: 34, renk: PR });
    const eY = yaziM(c, g, x, 306, elektron + 'e⁻', { size: 34, renk: EL });
    return { g, pY, eY };
  }
  async function izoelektronik(c) {
    const svg = c.svg();
    const uclu = c.S('g', {}, svg);
    const baslik = yazi(c, uclu, 500, 62, 'Üç tanecik', { size: 30, renk: RENK.soluk });
    const kartlar = [['Na⁺', 11], ['Mg²⁺', 12], ['Ne', 10]].map(([ad, p], i) => tanecikKart(c, uclu, 200 + i * 300, ad, p, 10));
    kartlar.forEach((k) => gizle(k.pY, k.eY));
    await belir(c, uclu);
    await c.say(ust('Üç taneciği yan yana koyalım: Na⁺, Mg²⁺ ve Ne.'),
      { speak: 'Üç taneciği yan yana koyalım: artı bir yüklü sodyum iyonu, artı iki yüklü magnezyum iyonu ve neon.' });
    for (const k of kartlar) await belir(c, k.pY, 250);
    await c.say('Proton sayıları sırasıyla 11, 12 ve 10’dur.', { speak: 'Proton sayıları sırasıyla on bir, on iki ve ondur.' });
    for (const k of kartlar) await belir(c, k.eY, 250);
    await c.say('Elektron sayıları ise üçünde de 10’dur.', { speak: 'Elektron sayıları ise üçünde de ondur.' });
    await belir(c, dizilimYaz(c, uclu, 500, 430, D10, { size: 40, vurgu: false }), 400);
    await c.say(ust('Üçünün de elektron dizilimi 1s²2s²2p⁶ şeklindedir.'),
      { speak: 'Üçünün de elektron dizilimi bir se iki, iki se iki, iki pe altı şeklindedir.' });
    baslik.textContent = 'İzoelektronik tanecikler';
    baslik.style.fill = RENK.vurgu;
    const tanim = yazi(c, uclu, 500, 500, 'elektron ve dizilim aynı · proton farklı', { size: 28 });
    await Promise.all([belir(c, baslik, 350), belir(c, tanim, 350)]);
    await c.say('Elektron sayısı ve dizilimi aynı, proton sayısı farklı taneciklere izoelektronik denir.',
      { speak: 'Elektron sayısı ve dizilimi aynı, proton sayısı farklı taneciklere [short pause] izoelektronik denir.' });
    tanim.textContent = 'üç ayrı element';
    tanim.style.fill = PR;
    await c.tween(500, (e) => kartlar.forEach((k) => k.pY.setAttribute('font-size', 34 + 8 * e)));
    await c.say('Proton sayıları farklı olduğu için üçü de ayrı elementin taneciğidir.',
      { speak: '[thoughtful] Proton sayıları farklı olduğu için üçü de ayrı elementin taneciğidir.' });

    await c.choice({ tag: 'Uygula', q: 'Hangi çift izoelektroniktir?', options: ['Na ve Na⁺', 'F⁻ ve Na⁺', 'N³⁻ ve Na'].map(ust), answer: 1,
      hints: ['Na atomunda 11, Na⁺ iyonunda 10 elektron var; elektron sayıları farklı.', '', 'N³⁻ iyonunda 10, nötr Na atomunda 11 elektron var.'].map(ust),
      right: 'İkisinde de 10 elektron ve aynı dizilim var; proton sayıları farklı.' });
    await sil(c, uclu);
    const cift = c.S('g', {}, svg);
    tanecikKart(c, cift, 200, 'F⁻', 9, 10);
    tanecikKart(c, cift, 500, 'Na⁺', 11, 10);
    dizilimYaz(c, cift, 350, 430, D10, { size: 36, vurgu: false });
    yazi(c, cift, 350, 492, 'izoelektronik', { size: 30, renk: IYI });
    await belir(c, cift);
    await c.say(ust('F⁻ ve Na⁺ iyonlarında 10 elektron ve aynı dizilim vardır.'),
      { speak: 'Eksi bir yüklü flor ve artı bir yüklü sodyum iyonlarında on elektron ve aynı dizilim vardır.' });
    const notr = c.S('g', {}, cift);
    tanecikKart(c, notr, 800, 'Na', 11, 11, { renk: KOTU });
    dizilimYaz(c, notr, 800, 430, T.Na.once, { size: 30 });
    yazi(c, notr, 800, 492, 'izoelektronik değil', { size: 28, renk: KOTU });
    await belir(c, notr);
    await c.say(ust('Nötr Na atomunda 11 elektron vardır; Na⁺ ile izoelektronik değildir.'),
      { speak: 'Nötr sodyum atomunda on bir elektron vardır; artı bir yüklü sodyum iyonu ile izoelektronik değildir.' });

    await sil(c, cift);
    const dortlu = c.S('g', {}, svg);
    yazi(c, dortlu, 500, 62, '18 elektronlu grup', { size: 30, renk: RENK.soluk });
    [['K⁺', 19], ['Cl⁻', 17], ['S²⁻', 16], ['Ar', 18]].forEach(([ad, p], i) => tanecikKart(c, dortlu, 140 + i * 240, ad, p, 18, { w: 200 }));
    dizilimYaz(c, dortlu, 500, 430, D18, { size: 38, vurgu: false });
    yazi(c, dortlu, 500, 496, 'aynı dizilim · farklı proton', { size: 28, renk: RENK.vurgu });
    await belir(c, dortlu);
    await c.say(ust('18 elektronlu bir grup daha var: K⁺, Cl⁻, S²⁻ ve Ar.'),
      { speak: 'On sekiz elektronlu bir grup daha var: potasyum, klor ve kükürt iyonları ile argon.' });

    await sil(c, dortlu);
    const gruplar = c.S('g', {}, svg);
    const bx = (i) => 40 + i * 310, sayac = [0, 0, 0];
    [['10 elektron', D10], ['18 elektron', D18], ['Hiçbiri', null]].forEach(([ad, dizilim], i) => {
      kutu(c, gruplar, bx(i), 236, 300, 300);
      yazi(c, gruplar, bx(i) + 150, 282, ad, { size: 30, renk: RENK.vurgu });
      if (dizilim) dizilimYaz(c, gruplar, bx(i) + 150, 328, dizilim, { size: 24, vurgu: false });
    });
    await belir(c, gruplar);
    const ADAYLAR = [
      ['Al³⁺', 'Al³⁺', 13, 0, ['', '13 proton ve 3+ yük: elektron sayısı 13 − 3 = 10; 18 değil.', '13 − 3 = 10 elektronu var; dizilimi neonunkiyle aynı.'], '13 − 3 = 10 elektron; dizilimi neonunkiyle aynı.'],
      ['K⁺', 'K⁺', 19, 1, ['19 proton ve 1+ yük: elektron sayısı 19 − 1 = 18; 10 değil.', '', '19 − 1 = 18 elektronu var; dizilimi argonunkiyle aynı.'], '19 − 1 = 18 elektron; dizilimi argonunkiyle aynı.'],
      ['Cl⁻', 'Cl⁻', 17, 1, ['17 proton ve 1− yük: elektron sayısı 17 + 1 = 18; 10 değil.', '', '17 + 1 = 18 elektronu var; dizilimi argonunkiyle aynı.'], '17 + 1 = 18 elektron; dizilimi argonunkiyle aynı.'],
      ['Ca²⁺', 'Ca²⁺', 20, 1, ['20 proton ve 2+ yük: elektron sayısı 20 − 2 = 18; 10 değil.', '', '20 − 2 = 18 elektronu var; dizilimi argonunkiyle aynı.'], '20 − 2 = 18 elektron; dizilimi argonunkiyle aynı.'],
      ['Nötr Na', 'Na', 11, 2, ['Nötr Na atomunda 11 elektron var; 10 elektronlu olan Na⁺ iyonudur.', 'Nötr Na atomunda 11 elektron var; 18 değil.', ''], '11 elektronlu nötr Na atomu iki gruba da girmez.'],
    ];
    for (const [soruAd, simge, proton, grup, ipuclari, dogruMetin] of ADAYLAR) {
      const bekleyen = c.S('g', {}, svg);
      kutu(c, bekleyen, 370, 40, 260, 160, { renk: EL });
      yaziM(c, bekleyen, 500, 108, simge, { size: 46 });
      yaziM(c, bekleyen, 500, 166, proton + 'p⁺', { size: 32, renk: PR });
      if (grup === 2) yazi(c, bekleyen, 700, 128, 'nötr atom', { size: 26, hiza: 'start', renk: RENK.soluk });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: ust(`<b>${soruAd}</b> hangi gruba girer?`), options: ['10 elektronlu grup', '18 elektronlu grup', 'Hiçbiri'], answer: grup,
        hints: ipuclari.map(ust), right: ust(dogruMetin),
        onPick: (i, dogru) => {
          if (!dogru) return;
          bekleyen.remove();
          yaziM(c, gruplar, bx(grup) + 150, 384 + sayac[grup] * 50, simge, { size: 34 });
          sayac[grup]++;
        } });
    }
    const kapanis = yazi(c, svg, 500, 130, 'Aynı dizilim, farklı özellikler', { size: 36, renk: RENK.vurgu });
    await belir(c, kapanis, 400);
    await c.say('İzoelektronik taneciklerin dizilimi aynıdır ama özellikleri birbirinden farklıdır.');
    await sil(c, kapanis, 300);
    const son = c.S('g', {}, svg);
    yazi(c, son, 320, 130, 'elektron değişir', { size: 40, renk: EL });
    yazi(c, son, 700, 130, 'proton kalır', { size: 40, renk: PR });
    await belir(c, son, 400);
    await c.say('Atom iyon olurken elektron değişir, proton kalır.', { speak: 'Atom iyon olurken elektron değişir, [short pause] proton kalır.' });
    c.note('<b>İzoelektronik: elektron sayısı ve dizilimi aynı, protonu farklı.</b><br>Na<sup>+</sup>/Mg<sup>2+</sup>/Ne', 'İzoelektronik');
  }

  Ders.start({
    id: 'etkilesim-g1', kicker: 'Konu G · İyon oluşumu', title: 'Elektron değişir, proton kalır', accent: '#ff6b7a', back: 'index.html',
    intro: { title: 'Elektron değişir, proton kalır', hook: ust('Na ile Na⁺ aynı dizilime mi sahip?'), button: 'Derse başla ›' },
    scenes: [
      { title: 'Tuzdaki sodyum', goal: 'Atomu, katyonu ve anyonu ayır.', run: tuzdakiSodyum },
      { title: 'Sodyum bir elektron verir', goal: 'Elektronun gidişini, protonun kalışını izle.', run: sodyumVerir },
      { title: 'Elektron veren atomlar', goal: 'Verilen elektronları ve yükü bul.', run: elektronVerenler },
      { title: 'Elektron alan atomlar', goal: 'Alınan elektronların yerini bul.', run: elektronAlanlar },
      { title: 'Neden bu kadar elektron?', goal: 'İyonun dizilimini soy gazla karşılaştır.', run: nedenBuKadar },
      { title: 'Orbitali bul', goal: 'Elektronun çıktığı ya da girdiği orbitali seç.', run: orbitaliBul },
      { title: 'İzoelektronik tanecikler', goal: 'Tanecikleri elektron sayısına göre grupla.', run: izoelektronik },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: ust('Oksijenin dizilimi 1s²2s²2p⁴; oksijen 6A grubundadır. Oksijen atomu hangi iyonu oluşturur?'),
        options: ['O²⁺', 'O²⁻', 'O⁶⁺'].map(ust), answer: 1,
        why: ['Oksijen elektron vermez; 2p’deki boş yerlere elektron alır ve negatif yüklenir.',
          '2p’de iki elektronluk boş yer var; iki elektron alınca dizilim neonun dizilimi olur.',
          'Altı elektron vermek yerine iki elektron alarak neonun dizilimine ulaşır.'], scene: 3 },
      { q: 'Hangi tanecik argon atomuyla izoelektroniktir?',
        options: ['Na⁺', 'Nötr K atomu', 'Ca²⁺'].map(ust), answer: 2,
        why: ['Na⁺ iyonunda 10 elektron vardır; argonda 18.', 'Nötr K atomunda 19 elektron vardır.',
          'Ca²⁺ iyonunda 18 elektron vardır ve dizilimi argonunkiyle aynıdır.'].map(ust), scene: 6 },
      { q: ust('Fosforun atom numarası 15; dizilimi 3p³ ile biter ve fosfor 5A grubundadır. P³⁻ iyonunda kaç proton ve kaç elektron vardır?'),
        options: ['15 proton, 12 elektron', '18 proton, 15 elektron', '15 proton, 18 elektron'],
        answer: 2,
        why: ['Üç elektron vermiş gibi saymışsın; elektron verilseydi yük pozitif olurdu. 3− yük, protondan üç fazla elektron demektir.',
          'Proton sayısı iyon olurken değişmez; fosforun protonu 15 olarak kalır.',
          'Evet. 5A grubu üç elektron alır: 15 proton, 15 + 3 = 18 elektron; yük 15 − 18 = 3−.'], scene: 3 },
      { q: ust('Zeynep: “Lityum atomu Li⁺ iyonuna dönüşürken bir proton kaybeder.” Zeynep’in düşüncesini düzelten cümle hangisidir?'),
        options: ['Atom bir elektron verir; proton sayısı değişmediği için tanecik hâlâ lityumdur.',
          'Atom bir elektron alır; elektron alan atom pozitif yüklenir, element değişmez.',
          'Atomun elektron sayısı hep sabittir; yük, proton sayısı değişince oluşur.'],
        answer: 0,
        why: ['Evet. Çekirdekteki protonlar yerinde kalır, giden bir elektrondur; proton fazla kalınca yük +1 olur.',
          'Elektron alan atom negatif yüklenir. Pozitif yük, elektron verilince oluşur.',
          'Elektron sayısı değişir, proton sayısı değişmez. Yük bu iki sayının farkıdır.'], scene: 1 },
    ], summary: ['<b>Atom iyon olurken elektron değişir, proton kalır.</b>', 'İzoelektronik taneciklerde elektron sayısı ve dizilim aynı, proton sayısı farklıdır.'],
    nextLesson: { href: 'g2-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
