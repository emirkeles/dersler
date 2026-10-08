/* H1 · KİM.9.1.8 · Senaryo: plan/kimya/etkilesim/senaryolar/H-periyodik-ozellikler.md, "## H1" (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 78–80 ve 82'den (yarıçap tanımı, r = d/2, A grubu ve 3. periyot yarıçapları,
   iyon yarıçapları, izoelektronik tanecikler); itme s. 62, izoelektronik tanımı s. 76. 372 pm = 2 × 186 pm.
   Öğrenciye kitap ya da sayfa anılmaz. Perdeleme ve etkin çekirdek yükü bilerek anılmaz.
   Renkler: çekirdek ve proton turuncu, elektron ve enerji seviyesi mavi, yarıçap yeşil. */
(() => {
  'use strict';
  const { RENK, yazi, kart, belir } = KIT;
  const CEK = 'var(--c2)', ELK = 'var(--c1)', YAR = 'var(--c3)', KOYU = '#162038', KARA = '#0b0d12';

  /* Ölçülen değerler. */
  const PERIYOT3 = [['Na', 11, 186], ['Mg', 12, 160], ['Al', 13, 143], ['Si', 14, 118], ['P', 15, 110], ['S', 16, 103], ['Cl', 17, 99], ['Ar', 18, 98]]; // simge, proton, pm
  const GRUP_1A = [['Li', 152, 2], ['Na', 186, 3], ['K', 227, 4]];   // simge, pm, enerji seviyesi sayısı
  const GRUP_2A = [['Be', 112, 2], ['Mg', 160, 3], ['Ca', 197, 4]];
  const IYONLAR = [['F^{−}', 9, 136], ['Na^{+}', 11, 95], ['Mg^{2+}', 12, 65]]; // simge, proton, pm; üçünde de 10 elektron
  const FLOR = { atom: 72, iyon: 136 };                              // pm

  /* ---- Çizim yardımcıları ---- */
  const kaybol = async (c, el, ms = 350) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 8 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const cizgi = (c, p, x1, y1, x2, y2, o = {}) => c.S('line', { x1, y1, x2, y2, stroke: o.renk || RENK.cizgi,
    'stroke-width': o.kalin || 3, 'stroke-linecap': 'round', 'stroke-dasharray': o.kesik || 'none' }, p);
  /* Üs içeren yazı: 'Mg^{2+}', '1s^2 2s^2 2p^6'. */
  const usYazi = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34,
    'font-weight': 600, style: 'fill:' + (o.renk || 'var(--text)'), math: metin }, p);
  /* Ok: (x1, y1) noktasından (x2, y2) noktasına; başı uçtadır. */
  function ok(c, p, x1, y1, x2, y2, o = {}) {
    const a = Math.atan2(y2 - y1, x2 - x1), b = o.bas || 12;
    const kanat = (d) => `${x2 - b * Math.cos(a + d)} ${y2 - b * Math.sin(a + d)}`;
    return c.S('path', { d: `M ${x1} ${y1} L ${x2} ${y2} M ${kanat(0.5)} L ${x2} ${y2} L ${kanat(-0.5)}`, fill: 'none',
      stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  }
  /* Atom: çekirdek, iç enerji seviyeleri (ince halka) ve sınırı kesikli en dış enerji seviyesi. r viewBox birimidir. */
  function atom(c, p, x, y, r, seviye, o = {}) {
    const g = c.S('g', {}, p), cr = o.cekirdek || 9;
    for (let k = 1; k < seviye; k++) c.S('circle', { cx: x, cy: y, r: r * k / seviye, fill: 'none', stroke: ELK, 'stroke-width': 2, 'stroke-opacity': 0.45 }, g);
    c.S('circle', { cx: x, cy: y, r, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '9 7' }, g);
    c.S('circle', { cx: x, cy: y, r: cr, fill: CEK }, g);
    if (o.arti) {
      cizgi(c, g, x - cr * 0.5, y, x + cr * 0.5, y, { renk: KARA, kalin: 3 });
      cizgi(c, g, x, y - cr * 0.5, x, y + cr * 0.5, { renk: KARA, kalin: 3 });
    }
    return g;
  }
  /* (x, y) merkezli r yarıçaplı halkaya eşit aralıklı n elektron. */
  function elektronlar(c, p, x, y, r, n, o = {}) {
    const faz = o.faz == null ? -Math.PI / 2 : o.faz;
    for (let k = 0; k < n; k++) {
      const a = faz + k * 2 * Math.PI / n;
      c.S('circle', { cx: x + r * Math.cos(a), cy: y + r * Math.sin(a), r: o.boy || 6, fill: ELK }, p);
    }
  }
  /* Halkadaki n elektronun her birinden çekirdeğe doğru (yon = -1) ya da dışarı doğru (yon = 1) kısa ok. */
  function isinOklari(c, p, x, y, r, n, o = {}) {
    const faz = o.faz == null ? -Math.PI / 2 : o.faz, yon = o.yon || -1, boy = o.boy || r * 0.2;
    for (let k = 0; k < n; k++) {
      const a = faz + k * 2 * Math.PI / n, r1 = r + yon * 12, r2 = r1 + yon * boy;
      ok(c, p, x + r1 * Math.cos(a), y + r1 * Math.sin(a), x + r2 * Math.cos(a), y + r2 * Math.sin(a), { renk: o.renk || CEK, kalin: o.kalin || 3, bas: 8 });
    }
  }

  /* ---- Sahne 1 · Atomun yarıçapı nasıl bulunur? ---- */
  async function tanim(c) {
    const svg = c.svg();
    const ilk = c.S('g', {}, svg);
    const TX = 250, AX = 730, Y = 250, R = 120, ucX = R * Math.cos(-0.5), ucY = R * Math.sin(-0.5);

    const top = c.S('g', {}, ilk);
    c.S('circle', { cx: TX, cy: Y, r: R, fill: KOYU, stroke: 'var(--text)', 'stroke-width': 4 }, top);
    c.S('path', { d: `M ${TX - R} ${Y} Q ${TX} ${Y + 56} ${TX + R} ${Y}`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, top);
    c.S('circle', { cx: TX, cy: Y, r: 6, fill: 'var(--text)' }, top);
    cizgi(c, top, TX, Y, TX + ucX, Y + ucY, { renk: YAR, kalin: 5 });
    yazi(c, top, TX + 38, Y - 44, 'r', { size: 34, renk: YAR });
    yazi(c, top, TX, 70, 'Top', { size: 32 });
    await belir(c, top);
    await c.say('Bir topun yarıçapı, merkezinden yüzeyine olan uzaklıktır.');
    const topAlt = c.S('g', {}, ilk);
    yazi(c, topAlt, TX, 425, 'yüzeyi belli', { size: 28 });
    yazi(c, topAlt, TX, 468, 'r sabit', { size: 28, renk: YAR });
    await belir(c, topAlt, 350);
    await c.say('Topun yüzeyi bellidir; bu uzaklık sabittir.');

    const at = c.S('g', {}, ilk);
    const halkalar = [40, 80].map((r) => c.S('circle', { cx: AX, cy: Y, r, fill: 'none', stroke: ELK, 'stroke-width': 2, 'stroke-opacity': 0.45 }, at));
    const dis = c.S('circle', { cx: AX, cy: Y, r: R, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3 }, at);
    c.S('circle', { cx: AX, cy: Y, r: 9, fill: CEK }, at);
    yazi(c, at, AX, 70, 'Atom', { size: 32 });
    await belir(c, at);
    await c.say('Atomu da bir küre gibi düşünürüz.');
    const olcu = c.S('g', {}, ilk);
    cizgi(c, olcu, AX, Y, AX + ucX, Y + ucY, { renk: YAR, kalin: 5 });
    const rAd = yazi(c, olcu, AX + 38, Y - 44, 'r', { size: 34, renk: YAR });
    c.S('circle', { cx: AX - 62, cy: 417, r: 8, fill: CEK }, olcu);
    yazi(c, olcu, AX + 8, 425, 'çekirdek', { size: 28, renk: CEK });
    yazi(c, olcu, AX, 468, 'en dış enerji seviyesi', { size: 28, renk: ELK });
    await belir(c, olcu, 350);
    await c.say('Atom yarıçapı, çekirdek ile en dış enerji seviyesi arasındaki uzaklıktır.');
    dis.setAttribute('stroke-dasharray', '9 7');
    const uyari = yazi(c, ilk, AX, 511, 'kesin yüzeyi yok', { size: 28, renk: RENK.vurgu });
    await belir(c, uyari, 350);
    await c.say('Ama atomun, top gibi kesin bir yüzeyi yoktur.', { speak: '[thoughtful] Ama atomun, top gibi kesin bir yüzeyi yoktur.' });

    /* Elektron bulutu: sabit tohumlu sözde rastgele noktalar; çekirdekten uzaklaştıkça seyrelir. */
    let tohum = 7;
    const rastgele = () => { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; };
    const bulut = (adet, ic, disR, koyuluk) => {
      const g = c.S('g', {}, at);
      for (let k = 0; k < adet; k++) {
        const a = rastgele() * 2 * Math.PI, u = ic + (disR - ic) * Math.pow(rastgele(), 0.8);
        c.S('circle', { cx: AX + u * Math.cos(a), cy: Y + u * Math.sin(a), r: 3.5, fill: ELK, 'fill-opacity': koyuluk * (1 - u / (disR * 1.15)) }, g);
      }
      return g;
    };
    const yakin = bulut(90, 14, R, 1);
    halkalar.forEach((h) => h.setAttribute('stroke-opacity', 0.2));
    await belir(c, yakin);
    await c.say('Önceki derslerde gördük: elektronlar orbital denen bölgelerde bulunur.');
    const uzak = bulut(40, R * 0.9, R * 1.28, 0.9);
    await Promise.all([
      belir(c, uzak, 600),
      c.tween(1600, (e) => { dis.setAttribute('r', R + 12 * Math.sin(e * Math.PI * 4)); }, c.ease.linear),
    ]);
    await c.say('Orbitallerin belirli bir sınırı yoktur.');
    rAd.textContent = 'r = ?';
    rAd.setAttribute('x', AX + ucX + 58);
    rAd.setAttribute('y', Y + ucY - 8);
    uyari.textContent = 'yarıçap tam ölçülemez';
    await c.say('Bu yüzden tek bir atomun yarıçapı tam olarak ölçülemez.');

    await kaybol(c, ilk);
    const cift = c.S('g', {}, svg);
    const SX = 380, DX = 620, CY = 200, DY = 350;
    const sinirlar = [SX, DX].map((x) => c.S('circle', { cx: x, cy: CY, r: R, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '9 7' }, cift));
    [SX, DX].forEach((x) => c.S('circle', { cx: x, cy: CY, r: 9, fill: CEK }, cift));
    await belir(c, cift);
    await c.say('Bunun yerine birbirine değen ya da bağ yapmış iki atoma bakılır.');
    /* d: çekirdeklerden aşağı indirilen kılavuz çizgileri arasındaki ölçü çizgisi. */
    const uzaklik = c.S('g', {}, cift);
    [SX, DX].forEach((x) => {
      cizgi(c, uzaklik, x, CY + 14, x, DY + 12, { renk: RENK.soluk, kalin: 2, kesik: '5 7' });
      cizgi(c, uzaklik, x, DY - 12, x, DY + 12, { renk: 'var(--text)', kalin: 4 });
    });
    cizgi(c, uzaklik, SX, DY, DX, DY, { renk: 'var(--text)', kalin: 4 });
    const dAd = yazi(c, uzaklik, 500, DY + 42, 'd', { size: 32 });
    await belir(c, uzaklik, 350);
    const yari = c.S('g', {}, cift);
    cizgi(c, yari, SX, CY, 500, CY, { renk: YAR, kalin: 5 });
    yazi(c, yari, 440, CY - 18, 'r', { size: 34, renk: YAR });
    const formul = yazi(c, yari, 500, 450, 'r = d / 2', { size: 40, renk: YAR });
    await belir(c, yari, 350);
    await c.say('İki çekirdek arasındaki uzaklık ölçülür; yarısı atom yarıçapı sayılır.');
    const birim = yazi(c, cift, 500, 498, 'birim: pikometre (pm)', { size: 28 });
    await belir(c, birim, 350);
    await c.say('Atomlar çok küçüktür; yarıçapları pikometreyle verilir.');
    const esit = usYazi(c, cift, 500, 540, '1 pm = 1×10^{−12} m', { size: 28, renk: RENK.soluk });
    await belir(c, esit, 350);
    await c.say('Pikometrenin kısaltması pm’dir; bir pikometre, metrenin trilyonda biridir.',
      { speak: 'Pikometrenin kısaltması pe me’dir; bir pikometre, metrenin trilyonda biridir.' });

    birim.remove();
    esit.remove();
    const adlar = c.S('g', {}, cift);
    [SX, DX].forEach((x) => yazi(c, adlar, x, 58, 'Na', { size: 32 }));
    dAd.textContent = 'd = 372 pm';
    formul.textContent = 'r = ?';
    await belir(c, adlar, 350);
    await c.choice({ tag: 'Uygula', q: 'Birbirine değen iki sodyum atomunun çekirdekleri arasındaki uzaklık 372 pm’dir. Sodyumun atom yarıçapı kaç pm’dir?',
      options: ['744 pm', '186 pm', '372 pm'], answer: 1,
      hints: ['Bu, uzaklığın iki katı. Yarıçap, uzaklığın yarısıdır.', '', 'Bu, iki çekirdek arasındaki uzaklığın tamamı. Yarısını al.'],
      right: '186 pm. İki çekirdek arasındaki uzaklık iki yarıçap eder.' });
    formul.textContent = 'r = 372 / 2 = 186 pm';
    await c.say('Yarıçap, çekirdekler arası uzaklığın yarısıdır: 372’nin yarısı 186 pm.',
      { speak: 'Yarıçap, çekirdekler arası uzaklığın yarısıdır: üç yüz yetmiş ikinin yarısı [short pause] yüz seksen altı pikometre.' });
    const son = yazi(c, cift, 500, 510, 'Atom yarıçapı sabit değildir', { size: 30, renk: RENK.vurgu });
    await Promise.all([
      belir(c, son, 350),
      c.tween(1600, (e) => { sinirlar.forEach((s) => s.setAttribute('r', R + 9 * Math.sin(e * Math.PI * 4))); }, c.ease.linear),
    ]);
    await c.say('Atom yarıçapı sabit değildir; çeşitli etkenlere bağlı olarak değişir.');
    c.note('<b>Atom yarıçapı: çekirdek ile en dış enerji seviyesi arası uzaklık.</b><br>r = d/2 · Na: 186 pm', 'Atom yarıçapı');
  }

  /* ---- Sahne 2 · Grupta aşağı: enerji seviyesi eklenir ---- */
  const GX = [320, 555, 825], GY = 250, G_OLCEK = 120 / 227;
  /* Bir grubun üç atomu: solda grup sütunu, sağda aynı ölçekte üç atom, altta iki değer satırı. Parçalar ayrı ayrı açılır. */
  function grupTahtasi(c, svg, grup, ad) {
    const g = c.S('g', {}, svg), sutun = c.S('g', {}, g), simgeler = c.S('g', {}, g);
    const baslik = yazi(c, sutun, 105, 128, ad, { size: 28, renk: RENK.vurgu });
    const hucreler = grup.map((_, i) => kutu(c, sutun, 60, 146 + i * 68, 90, 62));
    grup.forEach(([s], i) => yazi(c, simgeler, 105, 188 + i * 68, s, { size: 30 }));
    const yon = ok(c, sutun, 174, 152, 174, 342, { kalin: 3 });
    const atomlar = grup.map(([s, pm, seviye], i) => {
      const a = c.S('g', {}, g);
      atom(c, a, GX[i], GY, pm * G_OLCEK, seviye);
      yazi(c, a, GX[i], 98, s, { size: 32 });
      return a;
    });
    const satir = (y, etiket, degerler, renk) => {
      const r = c.S('g', {}, g);
      yazi(c, r, 40, y, etiket, { size: 24, renk: RENK.soluk, hiza: 'start' });
      const sayilar = degerler.map((d, i) => yazi(c, r, GX[i], y, String(d), { size: 30, renk }));
      return { g: r, sayilar };
    };
    const seviye = satir(445, 'enerji seviyesi', grup.map((x) => x[2]), ELK);
    const yaricap = satir(495, 'yarıçap (pm)', grup.map((x) => x[1]), YAR);
    /* i. atomu öne çıkarır; i = -1 hepsini eşit gösterir. */
    const sec = (i) => grup.forEach((_, j) => {
      const op = i < 0 || i === j ? 1 : 0.3;
      atomlar[j].style.opacity = op; seviye.sayilar[j].style.opacity = op; yaricap.sayilar[j].style.opacity = op;
      hucreler[j].setAttribute('stroke', i === j ? RENK.vurgu : RENK.cizgi);
    });
    return { g, sutun, simgeler, baslik, hucreler, yon, atomlar, seviye, yaricap, sec };
  }

  async function grupta(c) {
    const svg = c.svg();
    const on = c.S('g', {}, svg);
    atom(c, on, 500, 250, 150, 3, { cekirdek: 14 });
    elektronlar(c, on, 500, 250, 50, 2);
    elektronlar(c, on, 500, 250, 100, 8, { faz: -Math.PI / 2 + Math.PI / 8 });
    elektronlar(c, on, 500, 250, 150, 1);
    yazi(c, on, 500, 462, 'çekirdeğin çevresinde enerji seviyeleri', { size: 28, renk: ELK });
    await belir(c, on);
    await c.say('Elektronlar çekirdeğin çevresinde enerji seviyelerine yerleşir; bunu görmüştük.');

    await kaybol(c, on);
    const t = grupTahtasi(c, svg, GRUP_1A, 'grup');
    [t.simgeler, t.seviye.g, t.yaricap.g, ...t.atomlar].forEach((el) => { el.style.opacity = 0; });
    await belir(c, t.g);
    await c.say('Periyodik tabloda alt alta duran elementler aynı gruptadır.');
    t.baslik.textContent = '1A';
    await belir(c, t.simgeler, 350);
    await c.say('Lityum, sodyum ve potasyum 1A grubunda alt alta durur.', { speak: 'Lityum, sodyum ve potasyum bir A grubunda alt alta durur.' });
    for (const a of t.atomlar) await belir(c, a, 350);
    await belir(c, t.seviye.g, 350);
    await c.say('Lityumda iki, sodyumda üç, potasyumda dört enerji seviyesi vardır.');
    const ek = c.S('g', {}, t.g);
    [428, 679].forEach((x) => yazi(c, ek, x, GY + 10, '+1', { size: 28, renk: ELK }));
    GRUP_1A.forEach(([, pm], i) => c.S('circle', { cx: GX[i], cy: GY, r: pm * G_OLCEK, fill: 'none', stroke: ELK, 'stroke-width': 7, 'stroke-opacity': 0.45 }, ek));
    await belir(c, ek, 350);
    await c.say('Aşağı inildikçe her elementte bir enerji seviyesi daha eklenir.');
    const uzak = c.S('g', {}, t.g);
    GRUP_1A.forEach(([, pm], i) => {
      const r = pm * G_OLCEK, x = GX[i] + r * Math.cos(-0.6), y = GY + r * Math.sin(-0.6);
      cizgi(c, uzak, GX[i], GY, x, y, { renk: YAR, kalin: 5 });
      c.S('circle', { cx: x, cy: y, r: 8, fill: ELK }, uzak);
    });
    await belir(c, uzak, 350);
    await c.say('Yeni enerji seviyesindeki elektronlar çekirdekten daha uzaktadır.');
    t.yon.setAttribute('stroke', YAR);
    const buyur = yazi(c, t.g, 105, 386, 'aşağı: büyür', { size: 24, renk: YAR });
    await belir(c, buyur, 350);
    await c.say('Bu yüzden grupta aşağı inildikçe atom yarıçapı büyür.', { speak: 'Bu yüzden grupta aşağı inildikçe [short pause] atom yarıçapı büyür.' });
    await belir(c, t.yaricap.g, 350);
    await c.say('Ölçülen yarıçaplar: lityum 152, sodyum 186, potasyum 227 pm.',
      { speak: 'Ölçülen yarıçaplar: lityum yüz elli iki, sodyum yüz seksen altı, potasyum iki yüz yirmi yedi pikometre.' });

    await kaybol(c, t.g);
    const t2 = grupTahtasi(c, svg, GRUP_2A, '2A');
    [t2.seviye.g, t2.yaricap.g, ...t2.atomlar].forEach((el) => { el.style.opacity = 0; });
    const bilinmeyen = c.S('g', {}, t2.g);
    GX.forEach((x) => {
      c.S('circle', { cx: x, cy: GY, r: 70, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-dasharray': '6 9' }, bilinmeyen);
      yazi(c, bilinmeyen, x, GY + 16, '?', { size: 44, renk: RENK.soluk });
    });
    GRUP_2A.forEach(([s], i) => yazi(c, bilinmeyen, GX[i], 98, s, { size: 32 }));
    await belir(c, t2.g);
    await c.choice({ tag: 'Uygula', q: 'Berilyum, magnezyum ve kalsiyum 2A grubunda yukarıdan aşağıya bu sırayla durur. Yarıçapı en büyük olan hangisidir?',
      options: ['Berilyum', 'Magnezyum', 'Kalsiyum'], answer: 2,
      hints: ['Berilyum en üsttedir; enerji seviyesi en az olan odur.', 'Magnezyum ortadadır; altında bir element daha var.', ''],
      right: 'Kalsiyum. Grupta en altta olan atomun enerji seviyesi en çoktur.' });
    bilinmeyen.remove();
    t2.hucreler[2].setAttribute('stroke', RENK.vurgu);
    for (const a of t2.atomlar) await belir(c, a, 300);
    await belir(c, t2.seviye.g, 350);
    await c.say('Kalsiyum en alttadır; enerji seviyesi en çok olan odur.');
    await belir(c, t2.yaricap.g, 350);
    await c.say('Ölçümler de bunu gösterir: berilyum 112, magnezyum 160, kalsiyum 197 pm.',
      { speak: 'Ölçümler de bunu gösterir: berilyum yüz on iki, magnezyum yüz altmış, kalsiyum yüz doksan yedi pikometre.' });

    await kaybol(c, t2.g);
    const t3 = grupTahtasi(c, svg, GRUP_1A, '1A');
    await belir(c, t3.g, 350);
    const secici = c.slider({ label: 'Element', min: 0, max: 2, value: 0, fmt: (i) => GRUP_1A[i][0], onInput: t3.sec });
    await c.say('Li, Na ve K arasında geç; enerji seviyesini ve yarıçapı karşılaştır.', { noWait: true });
    await c.cont();
    secici.remove();
    t3.sec(-1);
    const etken = yazi(c, t3.g, 570, 52, 'Grupta etken: enerji seviyesi sayısı', { size: 28, renk: RENK.vurgu });
    await belir(c, etken, 350);
    await c.say('Grupta yarıçapı belirleyen etken enerji seviyesi sayısıdır.');
    c.note('<b>Grupta aşağı: enerji seviyesi artar, yarıçap büyür.</b><br>Li 152 &lt; Na 186 &lt; K 227 pm', 'Grupta yarıçap');
  }

  /* ---- Sahne 3 · Periyotta sağa: çekim güçlenir ---- */
  /* 3. periyot grafiği: noktanın yüksekliği ve alttaki dairenin boyu yarıçapla orantılıdır.
     gorunen: çizilen nokta sayısı; yeni ve oran: son eklenen noktaların belirmesi; etiket: 'hepsi' | 'uclar' | 'yok'; secili: öne çıkan nokta. */
  function grafik(c, g, { gorunen = 8, yeni = 0, oran = 1, etiket = 'hepsi', secili = -1 } = {}) {
    g.replaceChildren();
    const taban = 350, x = (i) => 185 + i * 100, y = (pm) => taban - pm * 1.35;
    yazi(c, g, 40, 46, 'yarıçap (pm)', { size: 26, renk: YAR, hiza: 'start' });
    cizgi(c, g, 120, 70, 120, taban);
    cizgi(c, g, 120, taban, 940, taban);
    [0, 100, 200].forEach((v) => {
      yazi(c, g, 106, y(v) + 9, String(v), { size: 24, renk: RENK.soluk, hiza: 'end' });
      if (v) cizgi(c, g, 120, y(v), 940, y(v), { kalin: 1, kesik: '4 8' });
    });
    PERIYOT3.forEach(([s, p, pm], i) => {
      yazi(c, g, x(i), 392, s, { size: 28, renk: secili === i ? RENK.vurgu : 'var(--text)' });
      if (i >= gorunen) return;
      const op = (i >= gorunen - yeni ? oran : 1), soluk = secili >= 0 && secili !== i ? 0.35 : 1;
      const n = c.S('g', { opacity: op }, g);
      if (i) cizgi(c, n, x(i - 1), y(PERIYOT3[i - 1][2]), x(i), y(pm), { renk: YAR, kalin: 4 });
      c.S('circle', { cx: x(i), cy: y(pm), r: secili === i ? 12 : 8, fill: YAR }, n);
      if (etiket === 'hepsi' || (etiket === 'uclar' && (i === 0 || i === 7))) yazi(c, n, x(i) + 12, y(pm) - 12, String(pm), { size: 24, renk: YAR, hiza: 'start' });
      const d = c.S('g', { opacity: soluk }, n);
      c.S('circle', { cx: x(i), cy: 475, r: pm * 0.24, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, d);
      c.S('circle', { cx: x(i), cy: 475, r: 4, fill: CEK }, d);
      if (secili === i) {
        cizgi(c, n, x(i), y(pm) + 14, x(i), 366, { renk: RENK.vurgu, kalin: 2, kesik: '5 6' });
        yazi(c, g, 520, 46, s, { size: 30, renk: RENK.vurgu });
        yazi(c, g, 660, 46, p + ' proton', { size: 28, renk: CEK });
        yazi(c, g, 830, 46, pm + ' pm', { size: 28, renk: YAR });
      }
    });
  }

  async function periyotta(c) {
    const svg = c.svg();
    const hepsi = c.S('g', {}, svg), ust = c.S('g', {}, hepsi);
    const PX = (i) => 60 + i * 110;
    const baslik = yazi(c, ust, 60, 48, 'periyot', { size: 26, renk: RENK.soluk, hiza: 'start' });
    ok(c, ust, 210, 40, 930, 40, { kalin: 3 });
    const kutular = PERIYOT3.map((_, i) => kutu(c, ust, PX(i), 66, 104, 96));
    await belir(c, ust);
    await c.say('Periyodik tabloda yan yana duran elementler aynı periyottadır.');
    const simgeler = c.S('g', {}, ust);
    PERIYOT3.forEach(([s], i) => yazi(c, simgeler, PX(i) + 52, 106, s, { size: 30 }));
    baslik.textContent = '3. periyot';
    await belir(c, simgeler, 350);
    await c.say('Sodyumdan argona sekiz element üçüncü periyottadır.');

    /* Alttaki atom: seçilen elementin çekirdeği, üç enerji seviyesi ve elektronları. */
    const MX = 300, MY = 372, MR = 140;
    const cizim = c.S('g', {}, hepsi), sayac = c.S('g', {}, hepsi);
    const pYazi = yazi(c, sayac, 700, 320, '', { size: 32, renk: CEK });
    const eYazi = yazi(c, sayac, 700, 372, '', { size: 32, renk: ELK });
    const sYazi = yazi(c, hepsi, 700, 440, '3 enerji seviyesi', { size: 28 });
    function goster(i, o = {}) {
      const r = o.r || MR, p = PERIYOT3[i][1];
      cizim.replaceChildren();
      if (r < MR - 1) c.S('circle', { cx: MX, cy: MY, r: MR, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '4 8' }, cizim);
      atom(c, cizim, MX, MY, r, 3, { cekirdek: 16, arti: true });
      if (o.ucuncu) c.S('circle', { cx: MX, cy: MY, r, fill: 'none', stroke: ELK, 'stroke-width': 8, 'stroke-opacity': 0.45 }, cizim);
      elektronlar(c, cizim, MX, MY, r / 3, 2);
      elektronlar(c, cizim, MX, MY, r * 2 / 3, 8, { faz: -Math.PI / 2 + Math.PI / 8 });
      elektronlar(c, cizim, MX, MY, r, i + 1, { boy: 8 });
      if (o.cekim) isinOklari(c, cizim, MX, MY, r, i + 1, { kalin: 2 + i * 0.7 });
      pYazi.textContent = p + ' proton';
      eYazi.textContent = p + ' elektron';
      kutular.forEach((k, j) => k.setAttribute('stroke', j === i ? RENK.vurgu : RENK.cizgi));
    }
    /* Sodyumdan argona adım adım ilerler; yaricap verilirse atomun boyu ölçülen yarıçapı izler. */
    const ilerle = (ms, o = {}) => c.tween(ms, (e) => {
      const yer = e * 7, i = Math.min(6, Math.floor(yer)), pm = c.lerp(PERIYOT3[i][2], PERIYOT3[i + 1][2], yer - i);
      goster(Math.round(yer), { ...o, r: o.yaricap ? MR * pm / 186 : MR });
    }, c.ease.linear);

    sayac.style.opacity = 0;
    goster(0);
    await Promise.all([belir(c, cizim), belir(c, sYazi)]);
    await c.say('Sekizinin de elektronları üç enerji seviyesindedir; bu sayı değişmez.');
    await belir(c, sayac, 350);
    await c.wait(500);
    goster(1);
    await c.say('Sağa doğru her adımda bir proton ve bir elektron eklenir.');
    const protonlar = c.S('g', {}, ust);
    PERIYOT3.forEach(([, p], i) => yazi(c, protonlar, PX(i) + 52, 148, String(p), { size: 26, renk: CEK }));
    goster(0);
    kutular[7].setAttribute('stroke', RENK.vurgu);
    await belir(c, protonlar, 350);
    await c.say('Sodyumda 11, argonda 18 proton vardır.', { speak: 'Sodyumda on bir, argonda on sekiz proton vardır.' });
    goster(0, { cekim: true });
    await c.say('Pozitif yüklü çekirdek, negatif yüklü elektronları kendine çeker.');
    await Promise.all([ilerle(3200, { cekim: true }), c.say('Proton sayısı arttıkça çekirdeğin çekimi güçlenir.')]);
    goster(7, { ucuncu: true });
    sYazi.setAttribute('style', 'fill:' + ELK);
    await c.say('Eklenen elektron yeni enerji seviyesi açmaz; yine üçüncü seviyeye girer.');
    goster(0);
    sYazi.setAttribute('style', 'fill:var(--text)');
    await c.choice({ q: 'Üçüncü periyotta sodyumdan argona gidildikçe atom yarıçapı nasıl değişir?', options: ['Büyür', 'Küçülür', 'Değişmez'], answer: 1,
      hints: ['Yeni enerji seviyesi eklenmiyor; elektronlar yine üç seviyede kalıyor.', '', 'Proton sayısı 11’den 18’e çıkıyor; çekim aynı kalmaz.'],
      right: 'Küçülür. Çekim güçlenirken enerji seviyesi sayısı aynı kalır.' });
    await Promise.all([ilerle(3200, { cekim: true, yaricap: true }), c.say('Güçlenen çekim elektronları çekirdeğe yaklaştırır; atom küçülür.')]);

    await kaybol(c, hepsi);
    const g = c.S('g', {}, svg);
    await c.tween(800, (e) => grafik(c, g, { gorunen: 4, yeni: 4, oran: e }));
    await c.say('Ölçülen yarıçaplar: sodyum 186, magnezyum 160, alüminyum 143, silisyum 118 pm.',
      { speak: 'Ölçülen yarıçaplar: sodyum yüz seksen altı, magnezyum yüz altmış, alüminyum yüz kırk üç, silisyum yüz on sekiz pikometre.' });
    await c.tween(800, (e) => grafik(c, g, { gorunen: 8, yeni: 4, oran: e }));
    await c.say('Fosfor 110, kükürt 103, klor 99, argon 98 pm.', { speak: 'Fosfor yüz on, kükürt yüz üç, klor doksan dokuz, argon doksan sekiz pikometre.' });
    const kaydirici = c.slider({ label: 'Element', min: 0, max: 7, value: 0, fmt: (i) => PERIYOT3[i][0], onInput: (i) => grafik(c, g, { etiket: 'yok', secili: i }) });
    await c.say('Üçüncü periyotta ilerle; proton sayısını ve yarıçapı izle.', { noWait: true });
    await c.cont();
    kaydirici.remove();
    grafik(c, g, { etiket: 'uclar' });
    const ozet = yazi(c, g, 640, 46, 'elektron: 11 → 18', { size: 28, renk: ELK });
    await c.say('Elektron sayısı arttığı hâlde atom büyümedi; belirleyici olan çekimdi.',
      { speak: '[thoughtful] Elektron sayısı arttığı hâlde atom büyümedi; belirleyici olan çekimdi.' });
    ozet.textContent = 'sağa gidildikçe genellikle küçülür';
    ozet.setAttribute('style', 'fill:' + YAR);
    await belir(c, ok(c, g, 330, 92, 860, 176, { renk: YAR, kalin: 4 }), 350);
    await c.say('Periyotta sağa gidildikçe atom yarıçapı genellikle küçülür.', { speak: 'Periyotta sağa gidildikçe atom yarıçapı [short pause] genellikle küçülür.' });
    c.note('<b>Periyotta sağa: çekim güçlenir, yarıçap küçülür.</b><br>Na 186 &gt; Ar 98 pm', 'Periyotta yarıçap');
  }

  /* ---- Sahne 4 · Konumdan yarıçapa ---- */
  async function konum(c) {
    const svg = c.svg();
    const HX = (j) => 172 + j * 98, HY = (i) => 128 + i * 88;   // hücrenin sol üst köşesi; i: 0–2 (2.–4. periyot), j: 0–7 (1A–8A)
    const tablo = c.S('g', {}, svg);
    ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A'].forEach((ad, j) => yazi(c, tablo, HX(j) + 46, 112, ad, { size: 24, renk: RENK.soluk }));
    yazi(c, tablo, 110, 112, 'periyot', { size: 24, renk: RENK.soluk });
    const periyotAd = [2, 3, 4].map((p, i) => yazi(c, tablo, 110, HY(i) + 50, String(p), { size: 26, renk: RENK.soluk }));
    const hucre = [0, 1, 2].map((i) => [0, 1, 2, 3, 4, 5, 6, 7].map((j) => kutu(c, tablo, HX(j), HY(i), 92, 82)));
    /* Hücreye simge yazar ve hücreyi parlatır; dönen nesneyle yarıçap eklenir ya da hücre boşaltılır. */
    const koy = (i, j, simge, renk = RENK.vurgu) => {
      const g = c.S('g', {}, tablo);
      hucre[i][j].setAttribute('stroke', renk);
      const ad = yazi(c, g, HX(j) + 46, HY(i) + 52, simge, { size: 30 });
      return {
        g,
        deger: (pm) => { ad.setAttribute('y', HY(i) + 36); return yazi(c, g, HX(j) + 46, HY(i) + 70, String(pm), { size: 24, renk: YAR }); },
        renk: (r) => hucre[i][j].setAttribute('stroke', r),
        sil: () => { g.remove(); hucre[i][j].setAttribute('stroke', RENK.cizgi); },
      };
    };
    const alt = (y, metin, renk) => yazi(c, svg, 560, y, metin, { size: 28, renk: renk || 'var(--text)' });

    await belir(c, tablo);
    await c.say('Artık iki eğilimi biliyoruz.');
    const asagi = c.S('g', {}, svg);
    ok(c, asagi, 40, HY(0) + 6, 40, HY(2) + 76, { renk: YAR });
    yazi(c, asagi, 62, 430, 'büyür', { size: 26, renk: YAR });
    await belir(c, asagi, 350);
    await c.say('Grupta aşağı inildikçe enerji seviyesi eklenir; yarıçap büyür.');
    const saga = c.S('g', {}, svg);
    ok(c, saga, HX(0) + 6, 62, 950, 62, { renk: YAR });
    yazi(c, saga, 560, 44, 'küçülür', { size: 26, renk: YAR });
    await belir(c, saga, 350);
    await c.say('Periyotta sağa gidildikçe çekim güçlenir; yarıçap küçülür.');
    const bilgi = alt(490, 'tablodaki yer → yarıçap', RENK.vurgu);
    await belir(c, bilgi, 350);
    await c.say('Demek ki bir atomun tablodaki yeri, yarıçapı hakkında bilgi verir.');
    bilgi.textContent = 'atom numarası → elektron dizilimi → yer';
    await c.say('Atom numarası verilen bir atomun yerini elektron diziliminden buluruz.');
    bilgi.remove();
    const kartlar = c.S('g', {}, svg);
    [['Mg', 12], ['Si', 14], ['Cl', 17]].forEach(([s, z], k) => {
      const x = 380 + k * 180;
      kutu(c, kartlar, x - 70, 448, 140, 64);
      yazi(c, kartlar, x - 26, 491, s, { size: 30 });
      yazi(c, kartlar, x + 34, 491, String(z), { size: 28, renk: CEK });
    });
    await belir(c, kartlar, 350);
    await c.say('Magnezyum, silisyum ve klorun atom numaraları 12, 14 ve 17’dir.', { speak: 'Magnezyum, silisyum ve klorun atom numaraları on iki, on dört ve on yedidir.' });
    await kaybol(c, kartlar, 250);
    periyotAd[1].setAttribute('style', 'fill:' + RENK.vurgu);
    const uclu = [koy(1, 1, 'Mg'), koy(1, 3, 'Si'), koy(1, 6, 'Cl')];
    await Promise.all(uclu.map((u) => belir(c, u.g, 350)));
    await c.say('Üçünün dizilimi de üçüncü enerji seviyesinde biter; üçü de üçüncü periyottadır.');
    await c.choice({ tag: 'Uygula', q: 'Bu üç atomu yarıçapı büyükten küçüğe sırala.', options: ['Mg &gt; Si &gt; Cl', 'Cl &gt; Si &gt; Mg', 'Si &gt; Mg &gt; Cl'], answer: 0,
      hints: ['', 'Bu sıra küçükten büyüğe. Sağa gidildikçe yarıçap küçülür.', 'Magnezyum silisyumun solundadır; protonu daha azdır.'],
      right: 'Üçü aynı periyotta; en soldaki magnezyum en büyüktür.' });
    const birim = alt(490, 'yarıçap (pm)', YAR);
    await Promise.all([belir(c, birim, 350), ...[160, 118, 99].map((pm, k) => belir(c, uclu[k].deger(pm), 350))]);
    await c.say('Aynı periyotta protonu az olan daha büyüktür: 160, 118 ve 99 pm.',
      { speak: 'Aynı periyotta protonu az olan daha büyüktür: yüz altmış, yüz on sekiz ve doksan dokuz pikometre.' });

    uclu.forEach((u) => u.sil());
    birim.remove();
    periyotAd[2].setAttribute('style', 'fill:' + RENK.vurgu);
    await c.say('Şimdi farklı periyotlardan atomları karşılaştıralım.');
    const na = koy(1, 0, 'Na'), k = koy(2, 0, 'K'), mg = koy(1, 1, 'Mg');
    await belir(c, na.g, 300);
    await Promise.all([belir(c, k.g, 350), belir(c, mg.g, 350)]);
    await c.say('Potasyum sodyumun hemen altında, magnezyum sodyumun hemen sağındadır.');
    await c.choice({ tag: 'Uygula', q: 'Potasyum, sodyum ve magnezyumu yarıçapı büyükten küçüğe sırala.', options: ['Na &gt; K &gt; Mg', 'Mg &gt; Na &gt; K', 'K &gt; Na &gt; Mg'], answer: 2,
      hints: ['Potasyum sodyumun altındadır; bir enerji seviyesi fazladır.', 'Magnezyum sodyumun sağındadır; çekirdeğinin çekimi daha güçlüdür.', ''],
      right: 'Aşağıdaki potasyum en büyük, sağdaki magnezyum en küçüktür.' });
    k.renk(ELK);
    mg.renk(CEK);
    const neden = [alt(470, 'K: enerji seviyesi fazla', ELK), alt(515, 'Mg: çekim güçlü', CEK)];
    await Promise.all(neden.map((n) => belir(c, n, 350)));
    await c.say('Potasyumda bir enerji seviyesi fazladır; magnezyumda çekim sodyumdakinden güçlüdür.');
    neden.forEach((n) => n.remove());
    const birim2 = alt(490, 'yarıçap (pm)', YAR);
    await Promise.all([belir(c, birim2, 350), belir(c, k.deger(227), 350), belir(c, na.deger(186), 350), belir(c, mg.deger(160), 350)]);
    await c.say('Ölçülen yarıçaplar: potasyum 227, sodyum 186, magnezyum 160 pm.',
      { speak: 'Ölçülen yarıçaplar: potasyum iki yüz yirmi yedi, sodyum yüz seksen altı, magnezyum yüz altmış pikometre.' });
    c.note('<b>Tabloda sola ve aşağı gidildikçe atom büyür.</b><br>K 227 &gt; Na 186 &gt; Mg 160 pm', 'Konum ve yarıçap');
  }

  /* ---- Sahne 5 · Elektronlar birbirini iter ---- */
  async function itme(c) {
    const svg = c.svg();
    const on = c.S('g', {}, svg), EY = 270;
    /* İki elektron merkezden d kadar uzakta; cekirdek verilirse ortada çekirdek ve çekim okları da çizilir. */
    const ciz = (d, cekirdek) => {
      on.replaceChildren();
      [-1, 1].forEach((yon) => {
        const x = 500 + yon * d;
        ok(c, on, x + yon * 28, EY, x + yon * 92, EY, { renk: ELK, kalin: 5 });
        c.S('circle', { cx: x, cy: EY, r: 18, fill: ELK }, on);
        cizgi(c, on, x - 8, EY, x + 8, EY, { renk: KARA, kalin: 3 });
        yazi(c, on, x + yon * 60, EY - 26, 'itme', { size: 26, renk: ELK });
        if (cekirdek) {
          ok(c, on, x - yon * 28, EY, x - yon * 78, EY, { renk: CEK, kalin: 5 });
          yazi(c, on, x - yon * 54, EY + 46, 'çekim', { size: 26, renk: CEK });
        }
      });
      if (cekirdek) {
        c.S('circle', { cx: 500, cy: EY, r: 26, fill: CEK }, on);
        cizgi(c, on, 488, EY, 512, EY, { renk: KARA, kalin: 4 });
        cizgi(c, on, 500, EY - 12, 500, EY + 12, { renk: KARA, kalin: 4 });
      }
    };
    ciz(70, false);
    await belir(c, on);
    await c.say('Yarıçapı etkileyen bir etken daha var: elektronların birbirini itmesi.');
    await Promise.all([c.tween(1400, (e) => ciz(70 + 90 * e, false)), c.say('Elektronlar aynı yüklüdür; birbirlerini iter ve uzaklaşmaya çalışırlar.')]);
    ciz(160, true);
    await c.say('Çekirdek elektronları içeri çeker; itme ise onları birbirinden uzaklaştırır.');

    await kaybol(c, on);
    const FX = 280, IX = 710, FY = 272, R0 = FLOR.atom;
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg), yazilar = c.S('g', {}, svg);
    /* Flor taneciği: iki enerji seviyesi; birincide 2, ikincide n - 2 elektron. itme: dış elektronlardan dışarı oklar. */
    const tanecik = (g, x, r, n, o = {}) => {
      g.replaceChildren();
      atom(c, g, x, FY, r, 2, { cekirdek: 12 });
      elektronlar(c, g, x, FY, r / 2, 2);
      elektronlar(c, g, x, FY, r, n - 2, { faz: -3 * Math.PI / 4 });
      if (o.itme) isinOklari(c, g, x, FY, r, n - 2, { faz: -3 * Math.PI / 4, yon: 1, boy: 18, renk: ELK });
      if (o.yaricap) cizgi(c, g, x, FY, x + r * Math.cos(0.4), FY + r * Math.sin(0.4), { renk: YAR, kalin: 5 });
    };
    const bos = (g, x) => c.S('circle', { cx: x, cy: FY, r: R0, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-dasharray': '6 9' }, g);
    bos(sol, FX);
    bos(sag, IX);
    const solAd = yazi(c, yazilar, FX, 80, 'atom', { size: 34 }), sagAd = usYazi(c, yazilar, IX, 80, 'iyon', { size: 34 });
    await Promise.all([belir(c, sol), belir(c, sag), belir(c, yazilar)]);
    await c.say('Bunu görmek için bir atomu kendi iyonuyla karşılaştıralım.');
    tanecik(sol, FX, R0, 9);
    solAd.textContent = 'F';
    const solSayi = c.S('g', {}, yazilar);
    yazi(c, solSayi, FX, 446, '9 proton', { size: 28, renk: CEK });
    yazi(c, solSayi, FX, 484, '9 elektron', { size: 28, renk: ELK });
    await belir(c, solSayi, 350);
    await c.say('Flor atomunda dokuz proton ve dokuz elektron vardır.');
    tanecik(sag, IX, R0, 9);
    const gelen = c.S('g', {}, svg);
    ok(c, gelen, 380, FY, 550, FY, { renk: ELK });
    yazi(c, gelen, 465, FY - 22, '+1 elektron', { size: 26, renk: ELK });
    const ucan = c.S('circle', { cx: 500, cy: 140, r: 8, fill: ELK }, svg);
    const hedef = [IX + R0 * Math.cos(-3 * Math.PI / 4), FY + R0 * Math.sin(-3 * Math.PI / 4)];
    await belir(c, gelen, 300);
    await c.tween(900, (e) => { ucan.setAttribute('cx', c.lerp(500, hedef[0], e)); ucan.setAttribute('cy', c.lerp(140, hedef[1], e)); });
    ucan.remove();
    tanecik(sag, IX, R0, 10);
    sagAd.remove();
    usYazi(c, yazilar, IX, 80, 'F^{−}', { size: 34 });
    await c.say('Flor bir elektron alınca F<sup>−</sup> iyonu oluşur.', { speak: 'Flor bir elektron alınca eksi bir yüklü flor iyonu oluşur.' });
    const sagSayi = c.S('g', {}, yazilar);
    yazi(c, sagSayi, IX, 446, '9 proton', { size: 28, renk: CEK });
    yazi(c, sagSayi, IX, 484, '10 elektron', { size: 28, renk: ELK });
    await belir(c, sagSayi, 350);
    await c.say('F<sup>−</sup> iyonunda proton sayısı yine dokuzdur; elektron sayısı ondur.',
      { speak: 'Eksi bir yüklü flor iyonunda proton sayısı yine dokuzdur; elektron sayısı ondur.' });
    await c.choice({ q: 'Flor atomu F<sup>−</sup> iyonuna dönüşünce yarıçapı nasıl değişir?', options: ['Büyür', 'Küçülür', 'Değişmez'], answer: 0,
      hints: ['', 'Proton sayısı değişmedi; çekim artmadı. Artan, elektronların birbirini itmesi.', 'Elektron sayısı dokuzdan ona çıktı; itme aynı kalmaz.'],
      right: 'Büyür. Çekim aynıyken elektronlar arasındaki itme arttı.' });
    gelen.remove();
    const ayni = yazi(c, yazilar, 495, 446, '=', { size: 30, renk: CEK });
    tanecik(sag, IX, R0, 10, { itme: true });
    await belir(c, ayni, 300);
    await c.say('Çekirdeğin çekimi aynı kalır; elektronlar arasındaki itme artar.');
    tanecik(sol, FX, R0, 9, { yaricap: true });
    await c.tween(1500, (e) => tanecik(sag, IX, c.lerp(R0, FLOR.iyon, e), 10, { itme: e < 1, yaricap: true }));
    const olcum = c.S('g', {}, yazilar);
    yazi(c, olcum, FX, 120, FLOR.atom + ' pm', { size: 28, renk: YAR });
    yazi(c, olcum, IX, 120, FLOR.iyon + ' pm', { size: 28, renk: YAR });
    await belir(c, olcum, 350);
    await c.say('Elektronlar birbirinden uzaklaşır; yarıçap 72 pm’den 136 pm’ye çıkar.',
      { speak: 'Elektronlar birbirinden uzaklaşır; yarıçap yetmiş iki pikometreden yüz otuz altı pikometreye çıkar.' });
    const sonuc = yazi(c, yazilar, 495, 532, 'Aynı element, farklı yarıçap', { size: 28, renk: RENK.vurgu });
    await belir(c, sonuc, 350);
    await c.say('Demek ki aynı elementin yarıçapı bile sabit değildir.', { speak: '[thoughtful] Demek ki aynı elementin yarıçapı bile sabit değildir.' });
  }

  /* ---- Sahne 6 · Aynı elektron, farklı çekirdek ---- */
  async function izoelektronik(c) {
    const svg = c.svg();
    const tanimG = c.S('g', {}, svg);
    yazi(c, tanimG, 500, 150, 'İzoelektronik tanecikler', { size: 38, renk: RENK.vurgu });
    yazi(c, tanimG, 500, 260, 'aynı: elektron sayısı ve dizilimi', { size: 32, renk: ELK });
    yazi(c, tanimG, 500, 330, 'farklı: proton sayısı', { size: 32, renk: CEK });
    await belir(c, tanimG);
    await c.say('Elektron sayısı ve dizilimi aynı, proton sayısı farklı tanecikler izoelektroniktir; bunu görmüştük.');

    await kaybol(c, tanimG);
    const IX = [200, 500, 800], IY = 292, I_OLCEK = 0.8, ESIT = 72;
    const iyonG = c.S('g', {}, svg), sekil = IYONLAR.map(() => c.S('g', {}, iyonG));
    /* i. iyon: r yarıçaplı daire, 10 elektron (2 + 8); cekim verilirse ok kalınlığı proton sayısıyla artar. */
    const iyon = (i, r, o = {}) => {
      const g = sekil[i], x = IX[i], faz = -Math.PI / 2 + Math.PI / 8;
      g.replaceChildren();
      atom(c, g, x, IY, r, 2, { cekirdek: 12, arti: o.cekirdek });
      elektronlar(c, g, x, IY, r / 2, 2, { boy: 5 });
      elektronlar(c, g, x, IY, r, 8, { boy: 5, faz });
      if (o.cekim) isinOklari(c, g, x, IY, r, 8, { faz, boy: r * 0.22, kalin: IYONLAR[i][1] - 6 });
    };
    const hepsiniCiz = (r, o) => IYONLAR.forEach((_, i) => iyon(i, typeof r === 'function' ? r(i) : r, o));
    const gercek = (i) => IYONLAR[i][2] * I_OLCEK;
    IYONLAR.forEach(([s], i) => usYazi(c, iyonG, IX[i], 160, s, { size: 36 }));
    kutu(c, iyonG, 70, 38, 860, 62, { rx: 10 });
    const ortak = yazi(c, iyonG, 500, 80, '10 elektron', { size: 30, renk: ELK });
    hepsiniCiz(ESIT);
    await belir(c, iyonG);
    await c.say('F<sup>−</sup>, Na<sup>+</sup> ve Mg<sup>2+</sup> iyonlarının her birinde on elektron vardır.',
      { speak: 'Eksi bir yüklü flor, artı bir yüklü sodyum ve artı iki yüklü magnezyum iyonlarının her birinde on elektron vardır.' });
    ortak.setAttribute('x', 300);
    const dizilim = usYazi(c, iyonG, 690, 80, '1s^2 2s^2 2p^6', { size: 30 });
    await belir(c, dizilim, 350);
    await c.say('Üçünün elektron dizilimi de aynıdır: 1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup>.', { speak: 'Üçünün elektron dizilimi de aynıdır: bir se iki, iki se iki, iki pe altı.' });
    const altYazi = yazi(c, iyonG, 500, 510, 'elektronlar arası itme benzer', { size: 28, renk: ELK });
    await belir(c, altYazi, 350);
    await c.say('Elektron sayıları eşit olduğu için elektronlar arası itme de benzerdir.');
    hepsiniCiz(ESIT, { cekirdek: true });
    const protonlar = IYONLAR.map((_, i) => yazi(c, iyonG, IX[i], 446, '? proton', { size: 28, renk: CEK }));
    altYazi.textContent = 'çekirdek yükü = proton sayısı';
    altYazi.setAttribute('style', 'fill:' + CEK);
    await c.say('Farklı olan çekirdek yüküdür; çekirdek yükünü proton sayısı belirler.');
    protonlar.forEach((p, i) => { p.textContent = IYONLAR[i][1] + ' proton'; });
    await c.say('F<sup>−</sup> iyonunda 9, Na<sup>+</sup> iyonunda 11, Mg<sup>2+</sup> iyonunda 12 proton vardır.',
      { speak: 'Eksi bir yüklü flor iyonunda dokuz, artı bir yüklü sodyum iyonunda on bir, artı iki yüklü magnezyum iyonunda on iki proton vardır.' });
    hepsiniCiz(ESIT, { cekirdek: true, cekim: true });
    altYazi.textContent = 'çekirdek yükü büyür → çekim güçlenir';
    await c.say('Çekirdek yükü büyüdükçe aynı on elektron daha güçlü çekilir.');
    await c.choice({ tag: 'Uygula', q: 'Bu üç iyondan hangisinin yarıçapı en küçüktür?', options: ['F<sup>−</sup>', 'Na<sup>+</sup>', 'Mg<sup>2+</sup>'], answer: 2,
      hints: ['F<sup>−</sup> iyonunda yalnızca 9 proton var; on elektronu en zayıf o çeker.', 'Na<sup>+</sup> iyonunda 11 proton var; protonu daha çok olan bir iyon daha var.', ''],
      right: 'Mg<sup>2+</sup>. En çok proton onda; on elektronu en güçlü o çeker.' });
    altYazi.remove();
    dizilim.remove();
    ortak.setAttribute('x', 500);
    await c.tween(1400, (e) => hepsiniCiz((i) => c.lerp(ESIT, gercek(i), e), { cekirdek: true, cekim: true }));
    await c.say('On iki proton on elektronu en güçlü çeker; en küçüğü Mg<sup>2+</sup> olur.',
      { speak: 'On iki proton on elektronu en güçlü çeker; en küçüğü artı iki yüklü magnezyum iyonu olur.' });
    hepsiniCiz(gercek, { cekirdek: true });
    const yaricaplar = IYONLAR.map(([, , pm], i) => yazi(c, iyonG, IX[i], 484, pm + ' pm', { size: 28, renk: YAR }));
    await Promise.all(yaricaplar.map((y) => belir(c, y, 350)));
    await c.say('Ölçülen yarıçaplar: F<sup>−</sup> 136, Na<sup>+</sup> 95, Mg<sup>2+</sup> 65 pm.',
      { speak: 'Ölçülen yarıçaplar: eksi bir yüklü flor iyonu yüz otuz altı, artı bir yüklü sodyum iyonu doksan beş, artı iki yüklü magnezyum iyonu altmış beş pikometre.' });
    const kural = yazi(c, iyonG, 500, 530, 'çekirdek yükü büyük → yarıçap küçük', { size: 28, renk: RENK.vurgu });
    await belir(c, kural, 350);
    await c.say('İzoelektronik taneciklerde çekirdek yükü büyük olanın yarıçapı küçüktür.',
      { speak: 'İzoelektronik taneciklerde çekirdek yükü büyük olanın yarıçapı [short pause] küçüktür.' });
    const sec = (k) => IYONLAR.forEach((_, i) => {
      const op = k === i ? 1 : 0.3;
      sekil[i].style.opacity = op; protonlar[i].style.opacity = op; yaricaplar[i].style.opacity = op;
    });
    const secici = c.slider({ label: 'Tanecik', min: 0, max: 2, value: 0, fmt: (i) => ['F⁻', 'Na⁺', 'Mg²⁺'][i], onInput: sec });
    await c.say('Taneciği seç; proton sayısını ve yarıçapı karşılaştır.', { noWait: true });
    await c.cont();
    secici.remove();

    await kaybol(c, iyonG);
    await belir(c, kart(c, svg, 'Yarıçapı belirleyen üç etken', ['Enerji seviyesi sayısı', 'Çekirdek yükü', 'Elektronların itmesi'], { renk: YAR }));
    await c.say('Enerji seviyesi sayısı, çekirdek yükü ve elektronların itmesi: yarıçapı bu üçü belirler.');
    c.note('<b>İzoelektronik taneciklerde proton çoksa yarıçap küçüktür.</b><br>F<sup>−</sup> 136 &gt; Na<sup>+</sup> 95 &gt; Mg<sup>2+</sup> 65 pm', 'İzoelektronik tanecikler');
  }

  Ders.start({
    id: 'etkilesim-h1', kicker: 'Konu H · Periyodik özellikler', title: 'Atom yarıçapı', accent: '#ffc857', back: 'index.html',
    intro: { title: 'Atom yarıçapı', hook: 'Sağa gittikçe proton ve elektron artar; atom büyür mü?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Atomun yarıçapı nasıl bulunur?', goal: 'Yarıçapı iki çekirdek arasındaki uzaklıktan bul.', run: tanim },
      { title: 'Grupta aşağı: enerji seviyesi eklenir', goal: 'Li, Na ve K atomlarının yarıçaplarını karşılaştır.', run: grupta },
      { title: 'Periyotta sağa: çekim güçlenir', goal: 'Üçüncü periyotta yarıçapın değişimini izle.', run: periyotta },
      { title: 'Konumdan yarıçapa', goal: 'Atomları tablodaki yerine göre sırala.', run: konum },
      { title: 'Elektronlar birbirini iter', goal: 'Flor atomunu kendi iyonuyla karşılaştır.', run: itme },
      { title: 'Aynı elektron, farklı çekirdek', goal: 'İzoelektronik iyonları çekirdek yüküne göre sırala.', run: izoelektronik },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Sodyum ve klor üçüncü periyottadır; ikisinde de üç enerji seviyesi vardır. Klorun yarıçapı (99 pm) sodyumunkinden (186 pm) neden küçüktür?',
        options: ['Klorun enerji seviyesi sayısı daha azdır.', 'Klorun protonu daha çoktur; çekirdeğin çekimi daha güçlüdür.', 'Klorun elektronu daha azdır.'], answer: 1,
        why: ['İkisinde de üç enerji seviyesi vardır; bu sayı periyot boyunca değişmez.', 'Aynı periyotta proton arttıkça çekim güçlenir ve atom küçülür.', 'Klorun elektronu daha çoktur: sodyumda 11, klorda 17 elektron vardır.'], scene: 2 },
      { q: 'Cl<sup>−</sup>, K<sup>+</sup> ve Ca<sup>2+</sup> iyonlarının her birinde 18 elektron vardır; proton sayıları 17, 19 ve 20’dir. Yarıçapı en büyük olan hangisidir?',
        options: ['Cl<sup>−</sup>', 'K<sup>+</sup>', 'Ca<sup>2+</sup>'], answer: 0,
        why: ['Çekirdek yükü en küçük olan odur; 18 elektronu en zayıf o çeker: 181 pm.', 'K<sup>+</sup> iyonunda 19 proton vardır; Cl<sup>−</sup> iyonundan güçlü çeker: 133 pm.', 'Ca<sup>2+</sup> iyonunda 20 proton vardır; en güçlü çeken ve en küçük olan odur: 99 pm.'], scene: 5 },
    ], summary: ['<b>Enerji seviyesi eklenince atom büyür, çekirdeğin çekimi güçlenince küçülür.</b>', 'Elektronların birbirini itmesi de yarıçapı etkiler; aynı elementin yarıçapı bile sabit değildir.'],
    nextLesson: { href: 'h2-iyonlasma-enerjisi.html', label: 'Sonraki: İyonlaşma enerjisi ›' },
  });
})();
