/* H2 · KİM.9.1.8 · Senaryo: plan/kimya/etkilesim/senaryolar/H-periyodik-ozellikler.md, "## H2" (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 80–82'den (iyonlaşma enerjisi tanımı, X(g) + İE₁ → X⁺(g) + e⁻, yarıçap ve
   1. iyonlaşma enerjisi tablosu, grup ve periyot eğilimi, 2A ve 5A düzensizliği); küresel simetri s. 63–64, kopan
   elektronun yeri s. 74. Öğrenciye kitap ya da sayfa anılmaz. Düzensizlik yalnızca küresel simetri ve kararlılıkla
   açıklanır. kJ/mol biriminin "mol" kısmı açıklanmaz.
   Renkler: çekirdek ve proton turuncu, elektron mavi, yarıçap yeşil, iyonlaşma enerjisi sarı, küresel simetri mor. */
(() => {
  'use strict';
  const { RENK, yazi, belir, orbitalKutusu } = KIT;
  const CEK = 'var(--c2)', ELK = 'var(--c1)', YAR = 'var(--c3)', ENJ = RENK.vurgu, SIM = 'var(--c4)', DUS = 'var(--bad)';
  const KOYU = '#162038', KARA = '#0b0d12';

  /* Ölçülen değerler. */
  const PERIYOT3 = [['Na', 11, 186, 496], ['Mg', 12, 160, 738], ['Al', 13, 143, 577], ['Si', 14, 118, 786],
    ['P', 15, 110, 1012], ['S', 16, 103, 1000], ['Cl', 17, 99, 1255], ['Ar', 18, 98, 1520]];   // simge, proton, pm, kJ/mol
  const GRUP_1A = [['Li', 152, 520, 2], ['Na', 186, 496, 3], ['K', 227, 419, 4]];             // simge, pm, kJ/mol, enerji seviyesi sayısı
  /* Düşüşün iki yanındaki atomlar. s ve p: 3s ve 3p orbitallerindeki elektron sayıları; simetri: küresel simetri gösterir mi. */
  const CIFTLER = [
    [{ ad: 'Mg', grup: '2A', son: '3s^2', p: null, durum: 'tam dolu', simetri: true, ie: 738 },
      { ad: 'Al', grup: '3A', son: '3s^2 3p^1', p: [1, 0, 0], durum: 'ne yarı ne tam dolu', simetri: false, ie: 577 }],
    [{ ad: 'P', grup: '5A', son: '3s^2 3p^3', p: [1, 1, 1], durum: 'yarı dolu', simetri: true, ie: 1012 },
      { ad: 'S', grup: '6A', son: '3s^2 3p^4', p: [2, 1, 1], durum: 'ne yarı ne tam dolu', simetri: false, ie: 1000 }],
  ];

  /* ---- Çizim yardımcıları ---- */
  const kaybol = async (c, el, ms = 350) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 8 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3, 'stroke-dasharray': o.kesik || 'none' }, p);
  const cizgi = (c, p, x1, y1, x2, y2, o = {}) => c.S('line', { x1, y1, x2, y2, stroke: o.renk || RENK.cizgi,
    'stroke-width': o.kalin || 3, 'stroke-linecap': 'round', 'stroke-dasharray': o.kesik || 'none' }, p);
  /* Üs ve alt indis içeren yazı: 'İE_1', 'X^{+}(g)', '3s^2 3p^1'. */
  const usYazi = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34,
    'font-weight': 600, style: 'fill:' + (o.renk || 'var(--text)'), math: metin }, p);
  /* Ok: (x1, y1) noktasından (x2, y2) noktasına; başı uçtadır. */
  function ok(c, p, x1, y1, x2, y2, o = {}) {
    const a = Math.atan2(y2 - y1, x2 - x1), b = o.bas || 12, renk = o.renk || RENK.cizgi, kalin = o.kalin || 4;
    const kanat = (d) => `${x2 - b * Math.cos(a + d)} ${y2 - b * Math.sin(a + d)}`;
    const g = c.S('g', {}, p);
    c.S('line', { x1, y1, x2, y2, stroke: renk, 'stroke-width': kalin, 'stroke-linecap': 'round', 'stroke-dasharray': o.kesik || 'none' }, g);
    c.S('path', { d: `M ${kanat(0.5)} L ${x2} ${y2} L ${kanat(-0.5)}`, fill: 'none', stroke: renk, 'stroke-width': kalin, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }
  /* Atom: çekirdek, iç enerji seviyeleri (ince halka) ve sınırı kesikli en dış enerji seviyesi. r viewBox birimidir.
     İç halkalar eşit aralıklıdır; o.ic verilirse o yarıçaplarda çizilir. */
  function atom(c, p, x, y, r, seviye, o = {}) {
    const g = c.S('g', {}, p), cr = o.cekirdek || 9;
    const icler = o.ic || Array.from({ length: seviye - 1 }, (_, k) => r * (k + 1) / seviye);
    icler.forEach((ic) => c.S('circle', { cx: x, cy: y, r: ic, fill: 'none', stroke: ELK, 'stroke-width': 2, 'stroke-opacity': 0.45 }, g));
    c.S('circle', { cx: x, cy: y, r, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '9 7' }, g);
    c.S('circle', { cx: x, cy: y, r: cr, fill: CEK }, g);
    if (o.arti) {
      cizgi(c, g, x - cr * 0.5, y, x + cr * 0.5, y, { renk: KARA, kalin: 3 });
      cizgi(c, g, x, y - cr * 0.5, x, y + cr * 0.5, { renk: KARA, kalin: 3 });
    }
    return g;
  }
  /* Eksi işaretli elektron. */
  function elektron(c, p, x, y, r = 11) {
    c.S('circle', { cx: x, cy: y, r, fill: ELK }, p);
    cizgi(c, p, x - r * 0.45, y, x + r * 0.45, y, { renk: KARA, kalin: 3 });
  }
  /* Enerji çubuğu: boyu değerle orantılı çizilir. */
  const cubuk = (c, p, x, y, w, h, renk = ENJ) => c.S('rect', { x, y, width: Math.max(0, w), height: Math.max(0, h), rx: 4, fill: renk }, p);

  /* ---- Sahne 1 · Elektron koparmak enerji ister ---- */
  async function koparma(c) {
    const svg = c.svg();
    const sahne = c.S('g', {}, svg), cizim = c.S('g', {}, sahne);
    const AX = 360, AY = 215, AR = 110, DIS = AX + AR, UZAK = 770;
    /* Atom ve en yüksek enerji seviyesindeki elektronu. ex: elektronun yeri; cekim: çekim oku; yol: kopma yönünü gösteren kesikli ok. */
    const ciz = (ex, o = {}) => {
      cizim.replaceChildren();
      atom(c, cizim, AX, AY, AR, 2, { cekirdek: 16, arti: true, ic: [44] });
      if (o.cekim) ok(c, cizim, DIS - 18, AY, DIS - 60, AY, { renk: CEK, kalin: 5 });
      if (o.yol) ok(c, cizim, DIS + 44, AY, DIS + 150, AY, { renk: RENK.soluk, kalin: 3, kesik: '7 8' });
      elektron(c, cizim, ex, AY);
    };
    ciz(DIS, { cekim: true });
    const cekimAd = yazi(c, sahne, DIS - 46, AY + 36, 'çekim', { size: 24, renk: CEK });
    const atomAd = usYazi(c, sahne, AX, 372, 'nötr atom', { size: 28 });
    await belir(c, sahne);
    await c.say('Pozitif yüklü çekirdek, negatif yüklü elektronları kendine çeker.');
    await Promise.all([
      c.tween(1500, (e) => ciz(DIS + 30 * Math.abs(Math.sin(e * Math.PI * 2)), { cekim: true, yol: true }), c.ease.linear),
      c.say('Bir elektronu atomdan koparmak için bu çekimi yenmek gerekir.'),
    ]);
    const enerji = c.S('g', {}, sahne);
    ok(c, enerji, 40, AY, 228, AY, { renk: ENJ, kalin: 8, bas: 16 });
    const ad0 = yazi(c, enerji, 132, AY - 78, '', { size: 28, renk: ENJ });
    const ad1 = yazi(c, enerji, 132, AY - 50, '', { size: 28, renk: ENJ });
    const ad2 = yazi(c, enerji, 132, AY - 22, 'enerji', { size: 28, renk: ENJ });
    await belir(c, enerji);
    await c.say('Bunun için atoma dışarıdan enerji verilir.');

    /* Elektron kopar: atom katyona dönüşür. */
    const yuk = yazi(c, sahne, AX + 92, AY - 84, '+', { size: 44, renk: CEK });
    const eAd = usYazi(c, sahne, UZAK, AY + 46, 'elektron', { size: 24, renk: ELK });
    const kopar = async (katyon, serbest) => {
      cekimAd.style.opacity = 0;
      await c.tween(1000, (e) => ciz(c.lerp(DIS, UZAK, e)));
      c.mathText(atomAd, katyon);
      c.mathText(eAd, serbest);
      yuk.style.opacity = 1;
      eAd.style.opacity = 1;
    };
    yuk.style.opacity = 0;
    eAd.style.opacity = 0;
    await kopar('katyon', 'elektron');
    await c.say('Elektronu kopan atom, pozitif yüklü bir iyona, yani katyona dönüşür.');
    const denklem = usYazi(c, sahne, 500, 455, 'X(g) + enerji → X^{+}(g) + e^{−}', { size: 36 });
    ad1.textContent = 'iyonlaşma';
    ad2.textContent = 'enerjisi';
    await belir(c, denklem, 350);
    await c.say('Gaz hâlindeki nötr atomdan elektron koparmak için gereken enerjiye iyonlaşma enerjisi denir.');
    ad0.textContent = 'birinci';
    await c.say('İlk elektronu koparmak için gereken enerji, birinci iyonlaşma enerjisidir.');
    const kisa = usYazi(c, enerji, 132, AY + 56, 'İE_1', { size: 38, renk: ENJ });
    c.mathText(denklem, 'X(g) + İE_1 → X^{+}(g) + e^{−}');
    await belir(c, kisa, 350);
    await c.say('Birinci iyonlaşma enerjisi kısaca İE<sub>1</sub> ile gösterilir.', { speak: 'Birinci iyonlaşma enerjisi kısaca i e bir ile gösterilir.' });

    /* Aynı olay sodyum için baştan oynar. */
    ciz(DIS, { cekim: true });
    yuk.style.opacity = 0;
    eAd.style.opacity = 0;
    cekimAd.style.opacity = 1;
    c.mathText(atomAd, 'Na(g)');
    c.mathText(denklem, 'Na(g) + İE_1 → Na^{+}(g) + e^{−}');
    await c.wait(500);
    await kopar('Na^{+}(g)', 'e^{−}');
    await c.say('Sodyum atomu İE<sub>1</sub> kadar enerji alır; Na<sup>+</sup> iyonu ve serbest elektron oluşur.',
      { speak: 'Sodyum atomu birinci iyonlaşma enerjisi kadar enerji alır; artı bir yüklü sodyum iyonu ve serbest elektron oluşur.' });
    const birim = yazi(c, sahne, 500, 512, 'birim: kJ/mol', { size: 30, renk: ENJ });
    await belir(c, birim, 350);
    await c.say('Enerji kilojul ile ölçülür; iyonlaşma enerjisinin birimi kJ/mol’dür.',
      { speak: 'Enerji kilojul ile ölçülür; iyonlaşma enerjisinin birimi kilojul bölü moldür.' });

    await kaybol(c, sahne);
    const olcek = c.S('g', {}, svg);
    usYazi(c, olcek, 500, 110, 'İE_1 (kJ/mol)', { size: 34, renk: ENJ });
    [['küçük değer', 150, 'kolay kopar'], ['büyük değer', 440, 'zor kopar']].forEach(([ad, w, sonuc], k) => {
      const y = 190 + k * 120;
      yazi(c, olcek, 70, y + 38, ad, { size: 28, hiza: 'start' });
      cubuk(c, olcek, 290, y, w, 56);
      yazi(c, olcek, 290 + w + 22, y + 38, sonuc, { size: 28, renk: RENK.soluk, hiza: 'start' });
    });
    await belir(c, olcek);
    await c.say('Değer ne kadar büyükse elektronu koparmak o kadar zordur.');

    await kaybol(c, olcek);
    const soru = usYazi(c, svg, 500, 250, 'Mg(g) + İE_1 → ?', { size: 44 });
    await belir(c, soru, 350);
    await c.choice({ tag: 'Uygula', q: 'Hangisi magnezyumun birinci iyonlaşma enerjisinin tanımladığı olaydır?',
      options: ['Gaz hâlindeki nötr Mg atomundan bir elektron kopar.', 'Gaz hâlindeki Mg<sup>+</sup> iyonundan bir elektron kopar.', 'Gaz hâlindeki Mg atomu bir elektron alır.'], answer: 0,
      hints: ['', 'Mg<sup>+</sup> bir iyondur; birinci iyonlaşma enerjisi nötr atomla başlar.', 'İyonlaşmada atom elektron almaz; atomdan elektron koparılır.'],
      right: 'Tanım değişmez: gaz hâlinde nötr atom, kopan ilk elektron.' });
    c.mathText(soru, 'Mg(g) + İE_1 → Mg^{+}(g) + e^{−}');
    const altlar = c.S('g', {}, svg);
    yazi(c, altlar, 235, 310, 'nötr atom', { size: 28, renk: RENK.soluk });
    yazi(c, altlar, 765, 310, 'tek elektron', { size: 28, renk: ELK });
    await belir(c, altlar, 350);
    await c.say('Birinci iyonlaşma enerjisi nötr atomla başlar; atomdan tek elektron kopar.');
    c.note('<b>İE<sub>1</sub>: gaz hâlindeki nötr atomdan ilk elektronu koparma enerjisi.</b><br>Birim: kJ/mol', 'Birinci iyonlaşma enerjisi');
  }

  /* ---- Sahne 2 · Grupta aşağı: uzak elektron kolay kopar ---- */
  async function grupta(c) {
    const svg = c.svg();
    const tek = c.S('g', {}, svg);
    const TX = 300, TY = 285;
    /* Tek atom: en yüksek enerji seviyesinin yarıçapı r. kalin: çekim okunun kalınlığı; enerji: sağdaki çubuğun boyu. */
    const tekCiz = (r, o = {}) => {
      tek.replaceChildren();
      [40, 80].forEach((ic) => c.S('circle', { cx: TX, cy: TY, r: ic, fill: 'none', stroke: ELK, 'stroke-width': 2, 'stroke-opacity': 0.45 }, tek));
      c.S('circle', { cx: TX, cy: TY, r, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '9 7' }, tek);
      ok(c, tek, TX + r - 18, TY, TX + 30, TY, { renk: CEK, kalin: o.kalin, bas: 10 + o.kalin });
      c.S('circle', { cx: TX, cy: TY, r: 16, fill: CEK }, tek);
      elektron(c, tek, TX + r, TY);
      yazi(c, tek, TX + r + 24, TY - 22, 'kopan elektron', { size: 26, renk: ELK, hiza: 'start' });
      if (o.enerji) {
        cubuk(c, tek, 800, 430 - o.enerji, 80, o.enerji);
        yazi(c, tek, 840, 472, 'gereken enerji', { size: 24, renk: ENJ });
      }
    };
    tekCiz(120, { kalin: 9 });
    await belir(c, tek);
    await c.say('İyonlaşmada kopan elektron, en yüksek enerji seviyesindeki elektrondur.');
    await Promise.all([
      c.tween(1800, (e) => tekCiz(c.lerp(120, 200, e), { kalin: c.lerp(9, 2, e) })),
      c.say('Bu elektron çekirdekten uzaklaştıkça çekirdek onu daha zayıf çeker.'),
    ]);
    tekCiz(120, { kalin: 9, enerji: 220 });
    await c.wait(500);
    await Promise.all([
      c.tween(1800, (e) => tekCiz(c.lerp(120, 200, e), { kalin: c.lerp(9, 2, e), enerji: c.lerp(220, 90, e) })),
      c.say('Zayıf çekilen elektronu koparmak daha az enerji ister.'),
    ]);

    await kaybol(c, tek);
    const UX = [300, 540, 790], UY = 165, U_OLCEK = 85 / 227, TABAN = 512, E_OLCEK = 140 / 520;
    const grup = c.S('g', {}, svg);
    yazi(c, grup, 30, 62, '1A grubu', { size: 26, renk: RENK.soluk, hiza: 'start' });
    const atomlar = GRUP_1A.map(([s, pm, , seviye], i) => {
      const g = c.S('g', {}, grup);
      atom(c, g, UX[i], UY, pm * U_OLCEK, seviye);
      yazi(c, g, UX[i], 62, s, { size: 32 });
      return g;
    });
    await belir(c, grup);
    await c.say('Atom yarıçapı grupta aşağı inildikçe büyüyordu.');
    const yaricap = c.S('g', {}, grup);
    yazi(c, yaricap, 30, 288, 'yarıçap (pm)', { size: 24, renk: RENK.soluk, hiza: 'start' });
    const pmler = GRUP_1A.map(([, pm], i) => yazi(c, yaricap, UX[i], 288, String(pm), { size: 30, renk: YAR }));
    await belir(c, yaricap, 350);
    await c.say('1A grubunda lityum 152, sodyum 186, potasyum 227 pm’dir.',
      { speak: 'Bir A grubunda lityum yüz elli iki, sodyum yüz seksen altı, potasyum iki yüz yirmi yedi pikometredir.' });
    await c.choice({ q: '1A grubunda lityumdan potasyuma inildikçe birinci iyonlaşma enerjisi nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Atom büyüyor; dış elektron çekirdekten uzaklaşıyor ve daha zayıf çekiliyor.', '', 'Yarıçap 152 pm’den 227 pm’ye çıkıyor; elektronun çekirdeğe uzaklığı değişiyor.'],
      right: 'Azalır. Uzaktaki elektron daha zayıf çekilir; koparmak daha az enerji ister.' });
    const uzak = c.S('g', {}, grup);
    GRUP_1A.forEach(([, pm], i) => {
      const r = pm * U_OLCEK, x = UX[i] + r * Math.cos(-0.6), y = UY + r * Math.sin(-0.6);
      cizgi(c, uzak, UX[i], UY, x, y, { renk: YAR, kalin: 5 });
      c.S('circle', { cx: x, cy: y, r: 8, fill: ELK }, uzak);
    });
    await belir(c, uzak, 350);
    await c.say('Atom büyüdükçe dış elektron çekirdekten uzaklaşır; koparmak kolaylaşır.');
    const enerji = c.S('g', {}, grup), cubuklar = c.S('g', {}, enerji);
    usYazi(c, enerji, 30, 440, 'İE_1 (kJ/mol)', { size: 24, renk: RENK.soluk, hiza: 'start' });
    cizgi(c, enerji, 220, TABAN, 880, TABAN);
    const ieler = GRUP_1A.map(([, , ie], i) => yazi(c, enerji, UX[i], TABAN - ie * E_OLCEK - 12, String(ie), { size: 30, renk: ENJ }));
    const doldur = (oran) => {
      cubuklar.replaceChildren();
      GRUP_1A.forEach(([, , ie], i) => cubuk(c, cubuklar, UX[i] - 40, TABAN - ie * E_OLCEK * oran, 80, ie * E_OLCEK * oran));
    };
    ieler.forEach((t) => { t.style.opacity = 0; });
    await c.tween(800, doldur);
    await Promise.all(ieler.map((t) => belir(c, t, 300)));
    await c.say('Ölçülen değerler: lityum 520, sodyum 496, potasyum 419 kJ/mol.',
      { speak: 'Ölçülen değerler: lityum beş yüz yirmi, sodyum dört yüz doksan altı, potasyum dört yüz on dokuz kilojul bölü mol.' });
    /* i. elementi öne çıkarır; i = -1 hepsini eşit gösterir. */
    const sec = (i) => GRUP_1A.forEach((_, j) => {
      const op = i < 0 || i === j ? 1 : 0.3;
      atomlar[j].style.opacity = op; pmler[j].style.opacity = op; ieler[j].style.opacity = op;
      cubuklar.children[j].setAttribute('opacity', op); uzak.children[j * 2].style.opacity = op; uzak.children[j * 2 + 1].style.opacity = op;
    });
    const secici = c.slider({ label: 'Element', min: 0, max: 2, value: 0, fmt: (i) => GRUP_1A[i][0], onInput: sec });
    await c.say('Li, Na ve K arasında geçiş yap; yarıçapı ve İE<sub>1</sub> değerini karşılaştır.', { noWait: true });
    await c.cont();
    secici.remove();
    sec(-1);
    const yonler = c.S('g', {}, grup);
    yazi(c, yonler, 30, 322, 'büyür →', { size: 26, renk: YAR, hiza: 'start' });
    yazi(c, yonler, 30, 474, 'azalır →', { size: 26, renk: ENJ, hiza: 'start' });
    await belir(c, yonler, 350);
    await c.say('Grupta aşağı inildikçe yarıçap büyür, iyonlaşma enerjisi azalır.');
    c.note('<b>Grupta aşağı: yarıçap büyür, İE<sub>1</sub> azalır.</b><br>Li 520 &gt; Na 496 &gt; K 419 kJ/mol', 'Grupta iyonlaşma enerjisi');
  }

  /* ---- Sahne 3 · Periyotta sağa: genel artış ---- */
  async function periyotta(c) {
    const svg = c.svg();
    const PX = (i) => 60 + i * 110, MX = (i) => PX(i) + 52, DY = 228, TABAN = 520, E_OLCEK = 130 / 1520;
    const ust = c.S('g', {}, svg);
    yazi(c, ust, 60, 40, '3. periyot', { size: 26, renk: RENK.soluk, hiza: 'start' });
    PERIYOT3.forEach(([s], i) => { kutu(c, ust, PX(i), 56, 104, 92); yazi(c, ust, MX(i), 96, s, { size: 30 }); });
    await belir(c, ust);
    await c.say('Şimdi üçüncü periyotta sodyumdan argona gidelim.');
    const protonlar = c.S('g', {}, svg);
    PERIYOT3.forEach(([, p], i) => yazi(c, protonlar, MX(i), 134, String(p), { size: 26, renk: CEK }));
    yazi(c, protonlar, 215, 40, 'çekim güçlenir', { size: 26, renk: CEK, hiza: 'start' });
    ok(c, protonlar, 420, 32, 930, 32, { renk: CEK });
    await belir(c, protonlar, 350);
    await c.say('Sağa gidildikçe proton sayısı artar; çekirdeğin çekimi güçlenir.');
    const daireler = c.S('g', {}, svg), uclar = c.S('g', {}, svg);
    PERIYOT3.forEach(([, , pm], i) => {
      c.S('circle', { cx: MX(i), cy: DY, r: pm * 0.24, fill: ELK, 'fill-opacity': 0.08, stroke: ELK, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, daireler);
      c.S('circle', { cx: MX(i), cy: DY, r: 4, fill: CEK }, daireler);
    });
    yazi(c, uclar, MX(0), 310, '186 pm', { size: 26, renk: YAR });
    yazi(c, uclar, MX(7), 310, '98 pm', { size: 26, renk: YAR });
    ok(c, uclar, MX(0) + 62, 302, MX(7) - 52, 302, { renk: YAR });
    await Promise.all([belir(c, daireler), belir(c, uclar)]);
    await c.say('Atom yarıçapı da 186 pm’den 98 pm’ye küçülür.', { speak: 'Atom yarıçapı da yüz seksen altı pikometreden doksan sekiz pikometreye küçülür.' });
    const tutma = c.S('g', {}, svg);
    PERIYOT3.forEach(([, , pm], i) => {
      const r = pm * 0.24;
      cizgi(c, tutma, MX(i), DY, MX(i) + r, DY, { renk: CEK, kalin: 2 + i * 0.6 });
      c.S('circle', { cx: MX(i) + r, cy: DY, r: 5, fill: ELK }, tutma);
    });
    await belir(c, tutma, 350);
    await c.say('Dış elektron çekirdeğe yaklaşır ve daha güçlü tutulur.');
    await c.choice({ q: 'Sodyumdan argona gidildikçe birinci iyonlaşma enerjisi genel olarak nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
      hints: ['', 'Dış elektron çekirdeğe yaklaşıyor; güçlü tutulan elektron daha zor kopar.', 'Proton sayısı da yarıçap da değişiyor; elektronun tutulma gücü aynı kalmaz.'],
      right: 'Artar. Elektron çekirdeğe yaklaştıkça daha güçlü tutulur.' });

    await Promise.all([kaybol(c, protonlar, 300), kaybol(c, uclar, 300)]);
    const enerji = c.S('g', {}, svg), bos = c.S('g', {}, enerji), dolu = c.S('g', {}, enerji);
    usYazi(c, enerji, 30, 420, 'İE_1 (kJ/mol)', { size: 26, renk: ENJ, hiza: 'start' });
    cizgi(c, enerji, 50, TABAN, 950, TABAN);
    PERIYOT3.forEach((_, i) => kutu(c, bos, MX(i) - 36, TABAN - 46, 72, 46, { rx: 4, fill: 'none', kalin: 2, kesik: '6 7' }));
    await belir(c, enerji);
    await c.say('Güçlü tutulan elektronu koparmak daha çok enerji ister.');
    [0, 7].forEach((i) => bos.children[i].setAttribute('opacity', 0));
    await c.tween(900, (e) => {
      dolu.replaceChildren();
      [0, 7].forEach((i) => cubuk(c, dolu, MX(i) - 36, TABAN - PERIYOT3[i][3] * E_OLCEK * e, 72, PERIYOT3[i][3] * E_OLCEK * e));
    });
    const degerler = [0, 7].map((i) => yazi(c, enerji, MX(i), TABAN - PERIYOT3[i][3] * E_OLCEK - 12, String(PERIYOT3[i][3]), { size: 28, renk: ENJ }));
    await Promise.all(degerler.map((d) => belir(c, d, 300)));
    await c.say('Sodyumda 496, argonda 1520 kJ/mol ölçülür.', { speak: 'Sodyumda dört yüz doksan altı, argonda bin beş yüz yirmi kilojul bölü mol ölçülür.' });
    const genel = c.S('g', {}, enerji);
    ok(c, genel, MX(0) + 46, 462, MX(7) - 48, 398, { renk: ENJ });
    yazi(c, genel, 500, 400, 'genel olarak artar', { size: 28, renk: ENJ });
    await belir(c, genel, 350);
    await c.say('Periyotta sağa gidildikçe iyonlaşma enerjisi genel olarak artar.', { speak: 'Periyotta sağa gidildikçe iyonlaşma enerjisi [short pause] genel olarak artar.' });
    const bilinmeyen = c.S('g', {}, enerji);
    [1, 2, 3, 4, 5, 6].forEach((i) => {
      bos.children[i].setAttribute('stroke', ENJ);
      yazi(c, bilinmeyen, MX(i), TABAN - 12, '?', { size: 28, renk: ENJ });
    });
    await belir(c, bilinmeyen, 350);
    await c.say('“Genel olarak” diyoruz; çünkü enerji her adımda artmaz.', { speak: '[thoughtful] Genel olarak diyoruz; çünkü enerji her adımda artmaz.' });
  }

  /* ---- Sahne 4 · Grafikte iki düşüş ---- */
  /* 3. periyot İE₁ grafiği: noktanın yüksekliği değerle orantılıdır.
     gorunen: çizilen nokta sayısı; yeni ve oran: son eklenen noktaların belirmesi; kilavuz: ilk noktadan eksenlere kılavuz çizgisi;
     degerler: değeri yazılan noktalar; dususler: düşüşün bittiği noktalar (Al = 2, S = 5); gruplar: 2A ve 5A etiketleri; not: sağ üstteki yazı. */
  function grafik(c, g, { gorunen = 8, yeni = 0, oran = 1, kilavuz = false, degerler = [], dususler = [], gruplar = false, not = '' } = {}) {
    g.replaceChildren();
    const taban = 430, x = (i) => 190 + i * 100, y = (v) => taban - v * 0.225;
    const op = (i) => (i >= gorunen - yeni ? oran : 1);
    const dususte = (i) => dususler.includes(i) || dususler.includes(i + 1);
    usYazi(c, g, 40, 40, 'İE_1 (kJ/mol)', { size: 26, renk: ENJ, hiza: 'start' });
    cizgi(c, g, 130, 60, 130, taban);
    cizgi(c, g, 130, taban, 950, taban);
    [0, 500, 1000, 1500].forEach((v) => {
      yazi(c, g, 116, y(v) + 9, String(v), { size: 24, renk: RENK.soluk, hiza: 'end' });
      if (v) cizgi(c, g, 130, y(v), 950, y(v), { kalin: 1, kesik: '4 8' });
    });
    if (kilavuz) {
      cizgi(c, g, x(0), y(PERIYOT3[0][3]), x(0), taban, { renk: ENJ, kalin: 2, kesik: '5 6' });
      cizgi(c, g, 130, y(PERIYOT3[0][3]), x(0), y(PERIYOT3[0][3]), { renk: ENJ, kalin: 2, kesik: '5 6' });
    }
    PERIYOT3.forEach(([s, , , ie], i) => {
      yazi(c, g, x(i), 468, s, { size: 28 });
      if (i >= gorunen) return;
      if (i) cizgi(c, g, x(i - 1), y(PERIYOT3[i - 1][3]), x(i), y(ie), { renk: dususler.includes(i) ? DUS : ENJ, kalin: dususler.includes(i) ? 7 : 4 }).setAttribute('opacity', op(i));
      if (degerler.includes(i)) yazi(c, g, x(i), 510, String(ie), { size: 24, renk: dususte(i) ? DUS : ENJ }).setAttribute('opacity', op(i));
    });
    PERIYOT3.slice(0, gorunen).forEach(([, , , ie], i) => c.S('circle', { cx: x(i), cy: y(ie), r: dususte(i) ? 10 : 8, fill: dususte(i) ? DUS : ENJ, opacity: op(i) }, g));
    if (gruplar) [[1, '2A'], [4, '5A']].forEach(([i, ad]) => yazi(c, g, x(i), y(PERIYOT3[i][3]) - 24, ad, { size: 26 }));
    if (not) yazi(c, g, 640, 40, not, { size: 26 });
  }

  async function dususler(c) {
    const svg = c.svg(), g = c.S('g', {}, svg);
    grafik(c, g, { gorunen: 0 });
    await belir(c, g);
    await c.say('Sekiz elementin birinci iyonlaşma enerjisini bir grafikte gösterelim.');
    await c.tween(600, (e) => grafik(c, g, { gorunen: 1, yeni: 1, oran: e, kilavuz: true }));
    await c.say('Her noktanın yüksekliği o elementin İE<sub>1</sub> değeridir.', { speak: 'Her noktanın yüksekliği o elementin birinci iyonlaşma enerjisi değeridir.' });
    await c.tween(900, (e) => grafik(c, g, { gorunen: 4, yeni: 3, oran: e, degerler: [0, 1, 2, 3] }));
    await c.say('Sodyum 496, magnezyum 738, alüminyum 577, silisyum 786 kJ/mol.',
      { speak: 'Sodyum dört yüz doksan altı, magnezyum yedi yüz otuz sekiz, alüminyum beş yüz yetmiş yedi, silisyum yedi yüz seksen altı kilojul bölü mol.' });
    const hepsi = [0, 1, 2, 3, 4, 5, 6, 7];
    await c.tween(900, (e) => grafik(c, g, { gorunen: 8, yeni: 4, oran: e, degerler: hepsi }));
    await c.say('Fosfor 1012, kükürt 1000, klor 1255, argon 1520 kJ/mol.',
      { speak: 'Fosfor bin on iki, kükürt bin, klor bin iki yüz elli beş, argon bin beş yüz yirmi kilojul bölü mol.' });
    await c.choice({ tag: 'Uygula', q: 'Enerji hangi iki geçişte artmak yerine azalıyor?',
      options: ['Al’den Si’ye ve Cl’den Ar’a', 'Na’dan Mg’ye ve Si’den P’ye', 'Mg’den Al’ye ve P’den S’ye'], answer: 2,
      hints: ['577’den 786’ya ve 1255’ten 1520’ye: ikisinde de enerji artıyor.', '496’dan 738’e ve 786’dan 1012’ye: ikisinde de enerji artıyor.', ''],
      right: '738’den 577’ye ve 1012’den 1000’e: bu iki geçişte enerji azalıyor.' });
    grafik(c, g, { degerler: [1, 2], dususler: [2] });
    await c.say('Magnezyumdan alüminyuma enerji 738’den 577’ye iner.', { speak: 'Magnezyumdan alüminyuma enerji yedi yüz otuz sekizden beş yüz yetmiş yediye iner.' });
    grafik(c, g, { degerler: [1, 2, 4, 5], dususler: [2, 5] });
    await c.say('Fosfordan kükürde 1012’den 1000’e iner.', { speak: 'Fosfordan kükürde bin on ikiden bine iner.' });
    grafik(c, g, { degerler: [1, 2, 4, 5], dususler: [2, 5], gruplar: true });
    await c.say('Düşüşten önceki atomlar magnezyum ve fosfordur: 2A ve 5A grubu.', { speak: 'Düşüşten önceki atomlar magnezyum ve fosfordur: iki A ve beş A grubu.' });
    grafik(c, g, { degerler: [1, 2, 4, 5], dususler: [2, 5], gruplar: true, not: 'Neden? Elektron dizilimi' });
    await c.say('Bu düzensizliğin nedeni atomların elektron dizilimindedir.', { speak: '[thoughtful] Bu düzensizliğin nedeni atomların elektron dizilimindedir.' });
    c.note('<b>Periyotta sağa İE<sub>1</sub> genel olarak artar.</b><br>Düşüşler: Mg → Al, P → S', 'Periyotta iyonlaşma enerjisi');
  }

  /* ---- Sahne 5 · Küresel simetri elektronu tutar ---- */
  async function simetri(c) {
    const svg = c.svg();
    const tanim = c.S('g', {}, svg);
    yazi(c, tanim, 500, 62, 'Küresel simetri', { size: 36, renk: SIM });
    yazi(c, tanim, 70, 204, 's', { size: 30, renk: RENK.soluk });
    yazi(c, tanim, 70, 314, 'p', { size: 30, renk: RENK.soluk });
    [[290, 1], [710, 2]].forEach(([xc, adet]) => {
      orbitalKutusu(c, tanim, xc - 40, 150, adet, { renk: ELK });
      [0, 1, 2].forEach((j) => orbitalKutusu(c, tanim, xc - 126 + j * 86, 260, adet, { renk: ELK }));
    });
    await belir(c, tanim);
    await c.say('Önceki derslerde küresel simetriyi görmüştük.');
    const adlar = c.S('g', {}, tanim);
    yazi(c, adlar, 290, 122, 'yarı dolu', { size: 30 });
    yazi(c, adlar, 710, 122, 'tam dolu', { size: 30 });
    await belir(c, adlar, 350);
    await c.say('Dizilimi yarı ya da tam dolu orbitallerle biten atom küresel simetri gösterir.');
    const halka = (x, metin, renk) => {
      const g = c.S('g', {}, tanim);
      kutu(c, g, x - 135, 400, 270, 62, { renk });
      yazi(c, g, x, 441, metin, { size: 26, renk });
      return g;
    };
    const z1 = c.S('g', {}, tanim);
    z1.append(halka(190, 'küresel simetri', SIM), halka(500, 'daha kararlı', 'var(--text)'), ok(c, tanim, 333, 431, 357, 431, { kalin: 3 }));
    await belir(c, z1, 350);
    await c.say('Küresel simetri gösteren atomlar daha kararlıdır.');
    const z2 = c.S('g', {}, tanim);
    z2.append(halka(810, 'elektron zor kopar', ENJ), ok(c, tanim, 643, 431, 667, 431, { kalin: 3 }));
    await belir(c, z2, 350);
    await c.say('Kararlı bir atomdan elektron koparmak daha zordur.', { speak: 'Kararlı bir atomdan elektron koparmak [short pause] daha zordur.' });

    /* Bir atomun kutu-ok şeması: dizilimin bittiği orbitaller mavi, öncekiler soluk çizilir. */
    const yan = (g, a, xc, o = {}) => {
      const x0 = xc - 181, sx = a.p ? x0 : xc - 40, w = a.ie * 0.3;   // yalnızca 3s kutusu varsa ortalanır
      yazi(c, g, xc, 86, a.ad, { size: 40 });
      usYazi(c, g, xc, 128, a.son, { size: 28, renk: RENK.soluk });
      orbitalKutusu(c, g, sx, 156, 2, { renk: a.p ? RENK.cizgi : ELK });
      yazi(c, g, sx + 40, 270, '3s', { size: 24, renk: RENK.soluk });
      if (a.p) {
        a.p.forEach((adet, j) => orbitalKutusu(c, g, x0 + 110 + j * 86, 156, adet, { renk: ELK }));
        yazi(c, g, x0 + 236, 270, '3p', { size: 24, renk: RENK.soluk });
      }
      if (o.durum) yazi(c, g, xc, 324, a.durum, { size: 28, renk: a.simetri ? SIM : RENK.soluk });
      if (o.enerji) {
        cubuk(c, g, x0, 360, w, 40);
        yazi(c, g, x0 + w + 14, 390, String(a.ie), { size: 28, renk: ENJ, hiza: 'start' });
      }
    };
    /* k. çift: sol ve sağ atom ayrı ayrı açılabilir. */
    const cift = (k, sol = {}, sag = null, enerji = false) => {
      const g = c.S('g', {}, svg);
      yan(c.S('g', {}, g), CIFTLER[k][0], 270, { ...sol, enerji });
      if (sag) yan(c.S('g', {}, g), CIFTLER[k][1], 730, { ...sag, enerji });
      if (enerji) {
        yazi(c, g, 508, 392, '>', { size: 40, renk: ENJ });
        usYazi(c, g, 500, 466, 'İE_1 (kJ/mol)', { size: 26, renk: ENJ });
      }
      return g;
    };
    await kaybol(c, tanim);
    let tahta = cift(0, { durum: true });
    await belir(c, tahta);
    await c.say('Magnezyumun dizilimi 3s<sup>2</sup> ile biter; 3s orbitali tam doludur.', { speak: 'Magnezyumun dizilimi üç se iki ile biter; üç se orbitali tam doludur.' });
    tahta.remove();
    tahta = cift(0, { durum: true }, { durum: true });
    await belir(c, tahta.children[1], 350);
    await c.say('Alüminyumun dizilimi 3p<sup>1</sup> ile biter; 3p orbitalleri ne yarı ne tam doludur.',
      { speak: 'Alüminyumun dizilimi üç pe bir ile biter; üç pe orbitalleri ne yarı ne tam doludur.' });
    tahta.remove();
    tahta = cift(0, { durum: true }, { durum: true }, true);
    await c.say('Bu yüzden magnezyumun iyonlaşma enerjisi alüminyumunkinden büyüktür.');

    await kaybol(c, tahta);
    tahta = cift(1, {}, {});
    await belir(c, tahta);
    await c.choice({ tag: 'Uygula', q: 'Fosforun dizilimi 3p<sup>3</sup>, kükürdünki 3p<sup>4</sup> ile biter. Hangisi küresel simetri gösterir?',
      options: ['Kükürt; 3p orbitalleri tam doludur.', 'Fosfor; 3p orbitalleri yarı doludur.', 'İkisi de göstermez.'], answer: 1,
      hints: ['Üç p orbitali tam dolu olsaydı altı elektron olurdu; kükürtte dört var.', '', 'Birinde üç p orbitalinin her birine bir elektron düşüyor.'],
      right: 'Fosfor. Üç p orbitalinin her birinde bir elektron var: yarı dolu.' });
    tahta.remove();
    tahta = cift(1, { durum: true }, {});
    await c.say('Üç p orbitalinde üç elektron vardır; fosforun 3p orbitalleri yarı doludur.',
      { speak: 'Üç pe orbitalinde üç elektron vardır; fosforun üç pe orbitalleri yarı doludur.' });
    tahta.remove();
    tahta = cift(1, { durum: true }, { durum: true }, true);
    await c.say('Fosfor daha kararlıdır; iyonlaşma enerjisi kükürdünkinden büyüktür.');

    /* İki çiftin özeti: grup, simge ve İE₁. etiket: küresel simetri gösterenlerin altına yazı. */
    const ozet = (etiket) => {
      const g = c.S('g', {}, svg);
      usYazi(c, g, 500, 100, 'İE_1 (kJ/mol)', { size: 28, renk: ENJ });
      CIFTLER.forEach((ciftim, k) => {
        const y = 140 + k * 180;
        ciftim.forEach((a, yanNo) => {
          const x = yanNo ? 560 : 120;
          kutu(c, g, x, y, 320, 100, { renk: a.simetri ? SIM : RENK.cizgi });
          yazi(c, g, x + 52, y + 62, a.grup, { size: 26, renk: RENK.soluk });
          yazi(c, g, x + 140, y + 64, a.ad, { size: 36 });
          yazi(c, g, x + 244, y + 64, String(a.ie), { size: 32, renk: ENJ });
          if (etiket && a.simetri) yazi(c, g, x + 160, y + 136, 'küresel simetri', { size: 26, renk: SIM });
        });
        yazi(c, g, 500, y + 64, '>', { size: 40, renk: ENJ });
      });
      return g;
    };
    await kaybol(c, tahta);
    tahta = ozet(false);
    await belir(c, tahta);
    await c.say('2A ve 5A grubu atomlarının İE<sub>1</sub> değeri, sağlarındaki komşularından büyüktür.',
      { speak: 'İki A ve beş A grubu atomlarının birinci iyonlaşma enerjisi değeri, sağlarındaki komşularından büyüktür.' });

    tahta.remove();
    tahta = cift(0, { durum: true }, { durum: true }, true);
    const secici = c.slider({ label: 'Çift', min: 0, max: 1, value: 0, fmt: (k) => ['Mg–Al', 'P–S'][k],
      onInput: (k) => { tahta.remove(); tahta = cift(k, { durum: true }, { durum: true }, true); } });
    await c.say('Mg–Al ve P–S çiftlerini seç; kutu-ok şemalarını karşılaştır.', { noWait: true });
    await c.cont();
    secici.remove();
    tahta.remove();
    tahta = ozet(true);
    await belir(c, tahta);
    await c.say('İki düşüşün nedeni aynıdır: küresel simetri gösteren atom elektronunu zor verir.');
    c.note('<b>Küresel simetri gösteren atomdan elektron zor kopar.</b><br>Mg 738 &gt; Al 577 kJ/mol', 'Küresel simetri');
  }

  /* ---- Sahne 6 · Yarıçap tek başına yetmez ---- */
  async function sinir(c) {
    const svg = c.svg();
    const iliski = c.S('g', {}, svg);
    yazi(c, iliski, 170, 120, 'yarıçap', { size: 30, renk: YAR });
    ok(c, iliski, 170, 150, 170, 330, { renk: YAR, kalin: 7, bas: 18 });
    yazi(c, iliski, 170, 376, 'küçülür', { size: 28, renk: YAR });
    yazi(c, iliski, 420, 120, 'iyonlaşma enerjisi', { size: 30, renk: ENJ });
    ok(c, iliski, 420, 330, 420, 150, { renk: ENJ, kalin: 7, bas: 18 });
    yazi(c, iliski, 420, 376, 'artar', { size: 28, renk: ENJ });
    await belir(c, iliski);
    await c.say('İyonlaşma enerjisi ile atom yarıçapı çoğunlukla ters yönde değişir.');
    const kucuk = c.S('g', {}, iliski);
    yazi(c, kucuk, 770, 120, 'küçük atom', { size: 30 });
    atom(c, kucuk, 770, 240, 64, 2, { cekirdek: 14, arti: true });
    cizgi(c, kucuk, 786, 240, 822, 240, { renk: CEK, kalin: 7 });
    elektron(c, kucuk, 834, 240);
    yazi(c, kucuk, 770, 376, 'yakın elektron: zor kopar', { size: 28, renk: CEK });
    await belir(c, kucuk);
    await c.say('Küçük atomda dış elektron çekirdeğe yakındır; koparmak zordur.');
    const merak = yazi(c, iliski, 500, 480, 'Her atom çiftinde geçerli mi?', { size: 32, renk: ENJ });
    await belir(c, merak, 350);
    await c.say('Bu ilişki her atom çiftinde geçerli midir?', { speak: '[curious] Bu ilişki her atom çiftinde geçerli midir?' });

    await kaybol(c, iliski);
    const KX = [270, 730], ikili = c.S('g', {}, svg);
    const ATOMLAR = [PERIYOT3[1], PERIYOT3[2]];   // Mg, Al
    ATOMLAR.forEach(([s, , pm], k) => {
      yazi(c, ikili, KX[k], 62, s, { size: 40 });
      atom(c, ikili, KX[k], 180, pm * 0.5, 3);
      yazi(c, ikili, KX[k], 304, pm + ' pm', { size: 30, renk: YAR });
    });
    const beklenti = ATOMLAR.map((_, k) => usYazi(c, ikili, KX[k], 372, 'İE_1: ?', { size: 30, renk: ENJ }));
    await belir(c, ikili);
    await c.say('Magnezyumun yarıçapı 160 pm, alüminyumunki 143 pm’dir.',
      { speak: 'Magnezyumun yarıçapı yüz altmış pikometre, alüminyumunki yüz kırk üç pikometredir.' });
    c.mathText(beklenti[1], 'İE_1: daha büyük?');
    await c.say('Alüminyum daha küçüktür; yalnızca yarıçapa bakan, enerjisini daha büyük bekler.');
    beklenti.forEach((b) => b.remove());
    const olcum = c.S('g', {}, ikili);
    ATOMLAR.forEach(([, , , ie], k) => {
      cubuk(c, olcum, KX[k] - 130, 342, ie * 0.3, 40);
      yazi(c, olcum, KX[k] - 130 + ie * 0.3 + 14, 372, String(ie), { size: 28, renk: ENJ, hiza: 'start' });
    });
    usYazi(c, olcum, 500, 436, 'İE_1 (kJ/mol)', { size: 26, renk: ENJ });
    await belir(c, olcum, 350);
    await c.choice({ tag: 'Uygula', q: 'Ölçülen değerler magnezyumda 738, alüminyumda 577 kJ/mol’dür. Beklenti doğrulanıyor mu?',
      options: ['Evet; küçük olan atomun enerjisi daha büyük.', 'Hayır; alüminyum daha küçük ama enerjisi daha düşük.', 'Karar verilemez; iki atom farklı periyotta.'], answer: 1,
      hints: ['Küçük olan atom alüminyum; ama 577, 738’den küçük.', '', 'İkisi de üçüncü periyotta; iki değer de ölçülmüş.'],
      right: 'Hayır. Bu çiftte yalnızca yarıçapa bakmak yanıltıyor.' });
    const dizilim = c.S('g', {}, ikili);
    usYazi(c, dizilim, KX[0], 506, '3s^2: küresel simetri', { size: 28, renk: SIM });
    usYazi(c, dizilim, KX[1], 506, '3p^1', { size: 28, renk: RENK.soluk });
    await belir(c, dizilim, 350);
    await c.say('Yarıçap genel eğilimi verir; ayrıntıyı elektron dizilimi belirler.', { speak: 'Yarıçap genel eğilimi verir; [short pause] ayrıntıyı elektron dizilimi belirler.' });

    await kaybol(c, ikili);
    const HX = (j) => 84 + j * 104, TABAN = 520;
    const adimlar = c.S('g', {}, svg), satir = c.S('g', {}, svg);
    yazi(c, adimlar, 330, 60, 'önce konum', { size: 30, renk: ENJ });
    ok(c, adimlar, 440, 50, 540, 50, { kalin: 3 });
    yazi(c, adimlar, 670, 60, 'sonra dizilim', { size: 30, renk: SIM });
    ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A'].forEach((ad, j) => yazi(c, satir, HX(j) + 48, 128, ad, { size: 24, renk: RENK.soluk }));
    const hucre = [0, 1, 2, 3, 4, 5, 6, 7].map((j) => kutu(c, satir, HX(j), 140, 96, 86));
    yazi(c, satir, 916, 260, '3. periyot', { size: 24, renk: RENK.soluk, hiza: 'end' });
    await Promise.all([belir(c, adimlar), belir(c, satir)]);
    await c.say('Sıralama yaparken önce konuma, sonra dizilime bakarız.');
    const UCLU = [PERIYOT3[0], PERIYOT3[1], PERIYOT3[2]];   // Na, Mg, Al
    const kartlar = c.S('g', {}, svg);
    UCLU.forEach(([s, z], k) => {
      const x = 320 + k * 180;
      kutu(c, kartlar, x - 70, 330, 140, 64);
      yazi(c, kartlar, x - 26, 373, s, { size: 30 });
      yazi(c, kartlar, x + 34, 373, String(z), { size: 28, renk: CEK });
    });
    await belir(c, kartlar, 350);
    await c.say('Sodyum, magnezyum ve alüminyumun atom numaraları 11, 12 ve 13’tür.',
      { speak: 'Sodyum, magnezyum ve alüminyumun atom numaraları on bir, on iki ve on üçtür.' });
    await kaybol(c, kartlar, 250);
    const simgeler = c.S('g', {}, satir);
    UCLU.forEach(([s], j) => { hucre[j].setAttribute('stroke', ENJ); yazi(c, simgeler, HX(j) + 48, 196, s, { size: 32 }); });
    await belir(c, simgeler, 350);
    await c.say('Üçü de üçüncü periyottadır; grupları 1A, 2A ve 3A’dır.', { speak: 'Üçü de üçüncü periyottadır; grupları bir A, iki A ve üç A grubudur.' });
    await c.choice({ tag: 'Uygula', q: 'Bu üç atomu birinci iyonlaşma enerjisi küçükten büyüğe sırala.', options: ['Na &lt; Mg &lt; Al', 'Al &lt; Na &lt; Mg', 'Na &lt; Al &lt; Mg'], answer: 2,
      hints: ['Yalnızca konuma bakılırsa böyle olurdu; ama magnezyum küresel simetri gösterir.', 'Sodyum en soldadır; çekirdeğinin çekimi en zayıf olan odur.', ''],
      right: 'Sodyum en küçük; magnezyum, sağındaki alüminyumu geçer.' });
    hucre[1].setAttribute('stroke', SIM);
    const etiket = yazi(c, satir, HX(1) + 48, 262, 'küresel simetri', { size: 24, renk: SIM });
    await belir(c, etiket, 350);
    await c.say('Sodyum en soldadır; magnezyum küresel simetri gösterir, alüminyumu geçer.');
    const enerji = c.S('g', {}, svg), cubuklar = c.S('g', {}, enerji);
    cizgi(c, enerji, HX(0), TABAN, HX(2) + 96, TABAN);
    usYazi(c, enerji, 440, 500, 'İE_1 (kJ/mol)', { size: 26, renk: ENJ, hiza: 'start' });
    await belir(c, enerji, 300);
    await c.tween(900, (e) => {
      cubuklar.replaceChildren();
      UCLU.forEach(([, , , ie], j) => cubuk(c, cubuklar, HX(j) + 16, TABAN - ie * 0.25 * e, 64, ie * 0.25 * e));
    });
    const sayilar = UCLU.map(([, , , ie], j) => yazi(c, enerji, HX(j) + 48, TABAN - ie * 0.25 - 12, String(ie), { size: 28, renk: ENJ }));
    await Promise.all(sayilar.map((s) => belir(c, s, 300)));
    await c.say('Ölçülen değerler: sodyum 496, alüminyum 577, magnezyum 738 kJ/mol.',
      { speak: 'Ölçülen değerler: sodyum dört yüz doksan altı, alüminyum beş yüz yetmiş yedi, magnezyum yedi yüz otuz sekiz kilojul bölü mol.' });
    c.note('<b>Genel eğilim konumdan, ayrıntı dizilimden gelir.</b><br>Na 496 &lt; Al 577 &lt; Mg 738 kJ/mol', 'Konum ve dizilim');
  }

  Ders.start({
    id: 'etkilesim-h2', kicker: 'Konu H · Periyodik özellikler', title: 'İyonlaşma enerjisi', accent: '#ffc857', back: 'index.html',
    intro: { title: 'İyonlaşma enerjisi', hook: 'Büyük atomdan elektron koparmak daha mı kolay?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Elektron koparmak enerji ister', goal: 'Birinci iyonlaşma enerjisinin tanımını öğren.', run: koparma },
      { title: 'Grupta aşağı: uzak elektron kolay kopar', goal: 'Li, Na ve K için yarıçapı ve enerjiyi karşılaştır.', run: grupta },
      { title: 'Periyotta sağa: genel artış', goal: 'Sodyumdan argona enerjinin yönünü öner.', run: periyotta },
      { title: 'Grafikte iki düşüş', goal: 'Grafikte artışın bozulduğu iki yeri bul.', run: dususler },
      { title: 'Küresel simetri elektronu tutar', goal: 'İki düşüşü elektron dizilimiyle açıkla.', run: simetri },
      { title: 'Yarıçap tek başına yetmez', goal: 'Önce konuma, sonra dizilime bakarak sırala.', run: sinir },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Magnezyum ve kalsiyum 2A grubundadır; kalsiyum bir alt periyottadır. Hangisinden ilk elektronu koparmak daha çok enerji ister?',
        options: ['Magnezyum', 'Kalsiyum', 'İkisi eşit'], answer: 0,
        why: ['Magnezyumun dış elektronu çekirdeğe daha yakındır: 738 kJ/mol.', 'Kalsiyum daha büyüktür; dış elektronu daha zayıf çekilir: 590 kJ/mol.', 'Grupta aşağı inildikçe yarıçap büyür, iyonlaşma enerjisi azalır.'], scene: 1 },
      { q: 'Berilyum ve bor ikinci periyotta yan yanadır. Berilyumun dizilimi 2s<sup>2</sup>, borunki 2s<sup>2</sup> 2p<sup>1</sup> ile biter. Hangisinin birinci iyonlaşma enerjisi daha büyüktür?',
        options: ['Bor', 'Berilyum', 'İkisi eşit'], answer: 1,
        why: ['Bor sağdadır; ama dizilimi yarı ya da tam dolu orbitallerle bitmez: 800 kJ/mol.', '2s orbitali tam dolu olan berilyum küresel simetri gösterir: 900 kJ/mol.', 'Dizilimleri farklı biter; küresel simetri gösteren berilyum daha kararlıdır.'], scene: 4 },
      { q: 'Ece: “Brom atomunun çekirdeğinde klordan daha çok proton var; bu yüzden bromdan elektron koparmak daha zordur.” Brom, klorla aynı grupta (7A) ve bir alt periyottadır. Ece’ye hangi karşılık verilmelidir?',
        options: ['Haklı; proton sayısı arttıkça çekirdek dış elektronu daha güçlü çeker.', 'Haksız; aşağı inildikçe dış elektron çekirdeğe daha yakın olur.', 'Haksız; aşağı inildikçe dış elektron çekirdekten uzaklaşır.'], answer: 2,
        why: ['Proton sayısı artar ama dış elektronun çekirdeğe uzaklığı da artar. Uzak elektronu koparmak daha az enerji ister.', 'Grupta aşağı inildikçe atom büyür; dış elektron çekirdeğe yaklaşmaz, uzaklaşır.', 'Evet. Grupta aşağı inildikçe yarıçap büyür, elektron daha zayıf çekilir ve iyonlaşma enerjisi azalır.'], scene: 1 },
      { q: 'Lityum ve flor ikinci periyottadır; flor, lityumun çok daha sağındadır. Hangisinden ilk elektronu koparmak daha çok enerji ister?',
        options: ['Flor', 'Lityum', 'İkisi eşit'], answer: 0,
        why: ['Evet. Periyotta sağa gidildikçe proton artar, çekim güçlenir ve iyonlaşma enerjisi genel olarak artar.', 'Lityum solda, protonu az; dış elektronu daha zayıf tutulur ve daha kolay kopar.', 'İkisinin proton sayısı farklıdır; çekirdeğin çekimi aynı kalmaz.'], scene: 2 },
    ], summary: ['<b>Yakın elektron zor kopar; ayrıntı için dizilime bak.</b>', 'İyonlaşma enerjisi grupta aşağı azalır, periyotta sağa genel olarak artar; 2A ve 5A artışı bozar.'],
    nextLesson: { href: 'h3-ardisik-enerjiler.html', label: 'Sonraki: Ardışık enerjiler ve valans ›' },
  });
})();
