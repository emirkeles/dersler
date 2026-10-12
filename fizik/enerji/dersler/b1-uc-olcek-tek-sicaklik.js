/* B1 — Üç ölçek, tek sıcaklık
   Sıcaklık Celsius, Fahrenheit ve Kelvin ölçekleriyle ölçülür; ölçek bir bölmelemedir, sıcaklık ölçeğe bağlı değildir.
   Senaryo: plan/fizik/enerji/senaryolar/B-isinin-hesabi.md (B1). Figür: Ş1 TERMO (dersler/termometre-sekil.js), "tum" kadrajı.
   Bu derste hesap yoktur; ölçekler arası dönüşüm işlemi ya da formülü yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, ok, tablo, sinifla } = window.KIT;
  const { motor, kap, termometre } = window.KIT_A;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, kutle: RENK.kutle };
  const KESIK = { 'stroke-dasharray': '9 7' };
  const BIRIM = { c: '°C', f: '°F', k: 'K' };

  /* ---- yerel yardımcılar ---- */

  /* Gösteri termometresi (Ş1). Büyük kurulur: x 40, y 12, h 530 (genişlik 398). Birimler tepedeki plakalara, sayılar
     şeritlerin sağ kenarına, okunan değer panonun soluna düz SVG olarak yazılır. */
  function termo(c, p, o = {}) {
    const g = c.S('g', {}, p);
    const f = TERMO.kur(c, g, { x: 40, y: 12, h: 530 });
    const d = { T: o.T == null ? 20 : o.T, goster: Object.assign({ c: 1, f: 1, k: 1 }, o.goster) };
    f.sicaklik(d.T); f.goster(d.goster);
    const birim = {};
    ['c', 'f', 'k'].forEach((s) => { birim[s] = yazi(c, g, 0, 0, BIRIM[s], { size: 24, kalin: 700 }); });
    const deger = yazi(c, g, 0, 0, '', { size: 26, kalin: 700, renk: S.sicaklik, hiza: 'end' });
    if (!o.deger) deger.remove();
    const yenile = () => {
      ['c', 'f', 'k'].forEach((s) => {
        const [x, y] = f.nokta(s + '.baslik');
        birim[s].setAttribute('x', x); birim[s].setAttribute('y', y + 8); birim[s].style.opacity = d.goster[s];
      });
      if (o.deger) {
        const [sx, sy] = f.nokta('sutun');
        deger.setAttribute('x', sx - 32); deger.setAttribute('y', sy + 8); deger.textContent = Math.round(d.T) + ' °C';
      }
    };
    yenile();
    const api = {
      g, f, birim, deger,
      sicaklik(T) { d.T = T; f.sicaklik(T); yenile(); },
      git(T1, ms, e = ease.inOut) { const T0 = d.T; return c.tween(ms, (k) => api.sicaklik(lerp(T0, T1, k)), e); },
      goster(ob, ms = 500) {
        const bas = Object.assign({}, d.goster), anah = Object.keys(ob);
        return c.tween(ms, (k) => { anah.forEach((s) => { d.goster[s] = lerp(bas[s], ob[s], k); }); f.goster(d.goster); yenile(); }, ease.out);
      },
    };
    return api;
  }
  /* Şeridin sağ kenarına sarı sayı; yazı yatay işaret çizgisinin hemen üstünde durur. */
  const sayiYaz = (c, p, f, serit, v, metin) => {
    const [x, y] = f.olcekSag(serit, v);
    return yazi(c, p, x + 6, y - 6, metin, { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
  };
  const yesilCerceve = (c, p, x, y, w, h, rx = 12) => {
    const r = c.S('rect', { x: x - 3, y: y - 3, width: w + 6, height: h + 6, rx: rx + 3, fill: 'none', stroke: RENK.iyi, 'stroke-width': 4 }, p);
    r.style.opacity = 0;
    return r;
  };
  const sirayla = async (c, ogeler, ms = 350) => { for (const o of ogeler) await belir(c, o, ms); };

  /* Beher: 140 × 140; 'buz' (donan su) ya da 'kaynama' (kabarcık ve buhar). */
  function beher(c, p, mot, x, y, tur) {
    const g = c.S('g', {}, p);
    kap(c, g, { x, y, w: 140, h: 140, su: 110 });
    const yuzey = y + 140 - 3 - 110;
    if (tur === 'buz') {
      [[16, -12, -6], [55, -8, 5], [92, -13, -3]].forEach(([dx, dy, a]) => {
        c.S('rect', { x: x + dx, y: yuzey + dy, width: 30, height: 30, rx: 4, fill: '#d8efff', 'fill-opacity': 0.85, stroke: '#ffffff', 'stroke-width': 2,
          transform: `rotate(${a} ${x + dx + 15} ${yuzey + dy + 15})` }, g);
      });
    } else {
      const kab = [[34, 0], [60, 0.35], [88, 0.7], [112, 0.15]].map(([dx, ph]) => ({ ph, el: c.S('circle', { cx: x + dx, cy: y + 126, r: 6, fill: '#ffffff' }, g) }));
      const guncelle = (dt) => kab.forEach((b) => {
        b.ph = (b.ph + dt / 0.7) % 1;
        b.el.setAttribute('cy', lerp(y + 126, yuzey + 8, b.ph));
        b.el.setAttribute('fill-opacity', b.ph < 0.1 ? b.ph * 10 : 1);
      });
      guncelle(0); mot.ekle(guncelle);
      [30, 70, 110].forEach((dx) => c.S('path', { d: `M${x + dx},${y - 8} q-8,-8 0,-16 t0,-16`, fill: 'none', stroke: RENK.cizgi, 'stroke-opacity': 0.75, 'stroke-width': 3, 'stroke-linecap': 'round' }, g));
    }
    return g;
  }

  /* Tişört (120 × 110) ve çay bardağı (96 × 104, buhar dâhil). */
  function tisort(c, p, x, y, s = 1) {
    const g = c.S('g', { transform: `translate(${x},${y}) scale(${s})` }, p);
    c.S('path', { d: 'M34,4 L10,18 L0,46 L22,54 L30,42 L30,106 L90,106 L90,42 L98,54 L120,46 L110,18 L86,4 Q60,26 34,4 Z', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' }, g);
    return g;
  }
  function bardak(c, p, x, y, s = 1) {
    const g = c.S('g', { transform: `translate(${x},${y}) scale(${s})` }, p);
    const cz = { fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' };
    c.S('path', Object.assign({ d: 'M8,30 L8,80 Q8,96 24,96 L58,96 Q74,96 74,80 L74,30 Z' }, cz), g);
    c.S('path', Object.assign({ d: 'M74,42 Q96,42 96,58 Q96,74 74,72' }, cz), g);
    [26, 41, 56].forEach((dx) => c.S('path', Object.assign({ d: `M${dx},22 q-6,-6 0,-12 t0,-12`, 'stroke-opacity': 0.75 }, cz, { stroke: RENK.cizgi }), g));
    return g;
  }

  /* Beş termometre türünün simgesi (50 × 50 kutuda; s ile ölçeklenir). */
  function simge(c, p, tur, x, y, s = 1) {
    const g = c.S('g', { transform: `translate(${x},${y}) scale(${s})` }, p);
    const cz = { fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'vector-effect': 'non-scaling-stroke' };
    const sari = { fill: S.sicaklik, stroke: 'none' };
    if (tur === 0) { // sıvılı: ince cam boru, altta hazne, sarı sütun
      c.S('rect', Object.assign({ x: 21, y: 2, width: 8, height: 34, rx: 4 }, cz), g);
      c.S('circle', Object.assign({ cx: 25, cy: 41, r: 8 }, cz, sari, { stroke: RENK.cizgi, 'stroke-width': 3 }), g);
      c.S('rect', Object.assign({ x: 23.5, y: 14, width: 3, height: 26 }, sari), g);
    } else if (tur === 1) { // metal: yuvarlak kadran, uzun ince sap
      c.S('circle', Object.assign({ cx: 25, cy: 15, r: 13 }, cz), g);
      c.S('line', Object.assign({ x1: 25, y1: 28, x2: 25, y2: 50 }, cz), g);
      c.S('line', Object.assign({ x1: 25, y1: 15, x2: 32, y2: 9 }, cz, { stroke: S.sicaklik }), g);
    } else if (tur === 2) { // gazlı: yuvarlak kadran, yanından kısa düz sap
      c.S('circle', Object.assign({ cx: 20, cy: 25, r: 14 }, cz), g);
      c.S('line', Object.assign({ x1: 34, y1: 25, x2: 48, y2: 25 }, cz), g);
      c.S('line', Object.assign({ x1: 20, y1: 25, x2: 26, y2: 17 }, cz, { stroke: S.sicaklik }), g);
    } else if (tur === 3) { // kızılötesi: tabanca gövde, ucundan üç ışın
      c.S('path', Object.assign({ d: 'M2,14 H32 V28 H21 V44 H10 V28 H2 Z' }, cz), g);
      [10, 21, 32].forEach((ey) => c.S('line', Object.assign({ x1: 36, y1: 21, x2: 48, y2: ey }, cz, { stroke: S.sicaklik }), g));
    } else { // dijital: ince çubuk, ortasında küçük ekran
      c.S('rect', Object.assign({ x: 18, y: 2, width: 14, height: 46, rx: 5 }, cz), g);
      c.S('rect', Object.assign({ x: 21.5, y: 12, width: 7, height: 11, rx: 1 }, sari), g);
    }
    return g;
  }
  const TURLER = ['Sıvılı', 'Metal', 'Gazlı', 'Kızılötesi', 'Dijital'];
  const KART_X = [60, 245, 430, 615, 800];
  /* Sahne 7 ve 8: beş küçük tür kartı (170 × 100). */
  function turKartlari(c, p) {
    return TURLER.map((ad, i) => {
      const g = c.S('g', {}, p);
      kutu(c, g, KART_X[i], 66, 170, 100, { rx: 12 });
      simge(c, g, i, KART_X[i] + 85 - 18, 76, 0.72);
      yazi(c, g, KART_X[i] + 85, 150, ad, { size: 24, kalin: 700 });
      return g;
    });
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    kap(c, g1, { x: 250, y: 150, su: 150, harf: 'X' });
    kap(c, g1, { x: 600, y: 150, su: 94, harf: 'Y' });
    [325, 675].forEach((cx, i) => {
      yazi(c, g1, cx, 364, '30 °C', { size: 26, kalin: 700, renk: S.sicaklik });
      yazi(c, g1, cx, 402, i ? '250 g' : '400 g', { size: 26, kalin: 700, renk: S.kutle });
    });
    const halka = yesilCerceve(c, g1, 235, 112, 180, 306, 14);
    gizle(g1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'İki kapta aynı sıcaklıkta su var: X kabında 400 g, Y kabında 250 g. Hangisinin iç enerjisi daha büyüktür?',
      options: ['Y’nin; madde miktarı daha az', 'X’in; madde miktarı daha çok', 'Eşit; sıcaklıkları aynı'], answer: 1,
      hints: ['İç enerji madde miktarı ve sıcaklık arttıkça büyür.', '', 'İç enerji madde miktarı ve sıcaklık arttıkça büyür.'],
      right: 'Evet. Aynı sıcaklıkta daha çok madde, daha büyük iç enerji demektir.',
    });
    await par(c.say('Aynı sıcaklıkta daha çok maddenin iç enerjisi daha büyüktür.'), belir(c, halka, 300));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    termometre(c, g2, { x: 480, y: 400, h: 280, T: 25 });
    [['sıcaklık', S.sicaklik], ['ısı', RENK.isi], ['iç enerji', RENK.icEnerji]].forEach(([ad, renk], i) => {
      const g = c.S('g', {}, g2);
      kutu(c, g, 580, 150 + i * 90, 320, 70, { rx: 12 });
      yazi(c, g, 740, 196 + i * 90, ad, { size: 30, kalin: 700, renk });
    });
    const halka2 = yesilCerceve(c, g2, 580, 150, 320, 70, 12);
    const ok2 = ok(c, g2, [510, 245], [570, 185], RENK.iyi, 5);
    gizle(g2, ok2.g);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Hangisi termometreyle ölçülür?',
      options: ['Isı', 'İç enerji', 'Sıcaklık'], answer: 2,
      hints: ['Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.', 'Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.', ''],
      right: 'Evet. Termometre sıcaklığı ölçer.',
    });
    await par(c.say('Termometreyle ölçtüğümüz şey sıcaklıktır.'), belir(c, [halka2, ok2.g], 350));
    await c.say('Bugün sıcaklığın nasıl sayıya dökülüp ölçeklendiğine bakacağız.');
  }

  /* ---- 2. "Yetmiş derece" ---- */
  async function yetmis(c) {
    const svg = c.svg(1000, 562);
    const dizi = c.S('g', {}, svg);
    kutu(c, dizi, 470, 50, 490, 180, { rx: 16 });
    yazi(c, dizi, 650, 150, 'Bugün hava 70 derece', { size: 28, kalin: 600 });
    tisort(c, dizi, 830, 85, 1);
    kutu(c, dizi, 470, 255, 490, 80, { rx: 14 });
    yazi(c, dizi, 715, 305, 'Dizideki herkes tişörtle.', { size: 28, kalin: 600 });
    const T = termo(c, svg, { T: 70, goster: { c: 1, f: 0, k: 0 }, deger: true });
    const cay = c.S('g', {}, svg);
    bardak(c, cay, 690, 412, 1);
    yazi(c, cay, 738, 538, 'sıcak çay', { size: 26, kalin: 600 });
    const ozellik = ['boyut', 'basınç', 'direnç'].map((ad, i) => yazi(c, svg, 715, 190 + i * 62, ad, { size: 36, kalin: 700 }));
    const baslik = yazi(c, svg, 715, 120, 'değişen özellikler', { size: 26, kalin: 600, renk: RENK.cizgi });
    const tanim = renkli(c, svg, 715, 430, [['termometre', RENK.yazi]], { size: 40, kalin: 700 });
    const tanim2 = yazi(c, svg, 715, 480, 'sıcaklığı ölçen araç', { size: 30, kalin: 600, renk: RENK.cizgi });
    gizle(dizi, T.g, cay, baslik, ...ozellik, tanim, tanim2);

    await par(c.say('Ela yabancı bir dizi izliyor: “Bugün hava 70 derece.”', { speak: 'Ela yabancı bir dizi izliyor: “Bugün hava yetmiş derece.”' }), belir(c, dizi, 450));
    await c.say('Dizide herkes tişörtle dolaşıyor.');
    await par(c.say('Ela’nın termometresinde 70 derece, bir bardak sıcak çay demektir.', { speak: 'Ela’nın termometresinde yetmiş derece, bir bardak sıcak çay demektir.' }),
      belir(c, dizi, 400, 0.45), belir(c, T.g, 500), belir(c, cay, 400));
    await c.say('Aynı sayı, birbirine hiç benzemeyen iki durum anlatıyor.', { speak: '[curious] Aynı sayı, birbirine hiç benzemeyen iki durum anlatıyor.' });
    await c.say('Sıcaklık sayıyla söylenir; sayının anlamı ölçeğe bağlıdır.');
    await par(c.say('Önce termometrenin ne olduğuna bakalım.'), belir(c, dizi, 400, 0), belir(c, cay, 400, 0), belir(c, T.g, 400, 0.45));
    dizi.remove(); cay.remove();
    await par(c.say('Sıcaklığı değişen maddede boyut, basınç, direnç gibi özellikler de değişir.'),
      (async () => { await belir(c, baslik, 300); await sirayla(c, ozellik, 300); })());
    await par(c.say('Bu değişimi algılayıp sıcaklığı ölçen araca termometre denir.'), belir(c, [tanim, tanim2], 450));
    c.note('Sıcaklığı ölçen araç. Sıcaklıkla değişen bir özellikten yararlanır.', 'Termometre');
  }

  /* ---- 3. Ölçek nereden gelir? İki sabit nokta ---- */
  async function sabitNokta(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    const T = termo(c, g1, { T: 20, goster: { c: 1, f: 0, k: 0 }, deger: true });
    const x0 = T.f.nokta('sutun')[0], yD = T.f.olcek('c', 0)[1], yK = T.f.olcek('c', 100)[1];
    const b1 = beher(c, g1, mot, 560, 290, 'buz'), b2 = beher(c, g1, mot, 780, 290, 'kaynama');
    const e1 = yazi(c, g1, 630, 470, 'donan su', { size: 24, kalin: 600 }), e2 = yazi(c, g1, 850, 470, 'kaynayan su', { size: 24, kalin: 600 });
    const l1 = cizgi(c, g1, [x0, yD], [440, yD], RENK.cizgi, 2, KESIK), l2 = cizgi(c, g1, [x0, yK], [440, yK], RENK.cizgi, 2, KESIK);
    const y1 = yazi(c, g1, 448, yD + 8, 'donma', { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    const y2 = yazi(c, g1, 448, yK + 8, 'kaynama', { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    const aralik = ok(c, g1, [432, (yD + yK) / 2], [432, yK + 6], RENK.cizgi, 3), aralik2 = ok(c, g1, [432, (yD + yK) / 2], [432, yD - 6], RENK.cizgi, 3);
    const yAralik = yazi(c, g1, 448, (yD + yK) / 2 + 8, 'aralık', { size: 24, kalin: 600, renk: RENK.cizgi, hiza: 'start' });
    gizle(l1, l2, y1, y2, aralik.g, aralik2.g, yAralik);
    gizle(b1, e1); gizle(b2, e2);
    b1.style.opacity = 0; b2.style.opacity = 0;

    await c.say('Termometredeki sayılar bir ölçeğe aittir.');
    await c.say('Ölçek, termometrenin yanındaki bölmelenmiş cetveldir.');
    await par(c.say('Cetveli yapmak için önce iki sıcaklığı sabit tutarız.'), belir(c, [b1, e1, b2, e2], 500, 0.45));
    await par(c.say('Termometre donmakta olan suya batırılınca sütun bir yerde durur.'), belir(c, [b1, e1], 400, 1), T.git(0, 1000));
    await par(c.say('Bu yer, suyun deniz seviyesindeki donma sıcaklığıdır.'), belir(c, [l1, y1], 400));
    await par(c.say('Sonra termometre kaynayan suya geçer; sütun yükselip yeni bir yerde durur.'), belir(c, [b1, e1], 400, 0.45), belir(c, [b2, e2], 400, 1), T.git(100, 1200));
    await par(c.say('Bu yer, suyun deniz seviyesindeki kaynama sıcaklığıdır.'), belir(c, [l2, y2], 400));
    await par(c.say('Donma ve kaynama arasındaki aralık bölmelere ayrılarak ölçek yapılır.'), belir(c, [aralik.g, aralik2.g, yAralik], 450));
    await par(c.say('Her ölçek bu iki noktaya kendi sayısını verir.'), T.goster({ f: 1, k: 1 }, 600));

    // Sor: dört sıcaklık kartı.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const AD = ['suyun donma sıcaklığı', 'suyun kaynama sıcaklığı', 'oda sıcaklığı', 'vücut sıcaklığı'];
    const kartlar = AD.map((ad, i) => {
      const g = c.S('g', {}, g2), x = 100 + (i % 2) * 420, y = 150 + Math.floor(i / 2) * 120;
      kutu(c, g, x, y, 380, 90, { rx: 14 });
      yazi(c, g, x + 190, y + 56, ad, { size: 26, kalin: 700 });
      gizle(g);
      return { g, x, y };
    });
    const cerc = [yesilCerceve(c, g2, kartlar[0].x, kartlar[0].y, 380, 90, 14), yesilCerceve(c, g2, kartlar[1].x, kartlar[1].y, 380, 90, 14)];
    await par(c.say('Dört sıcaklığa bakalım: ölçek hangilerine dayanır?'), sirayla(c, kartlar.map((k) => k.g), 350));
    await c.choice({
      tag: 'Sor', q: 'Ölçek yapmak için hangi iki sıcaklık temel alınır?',
      options: ['Oda sıcaklığı ve vücut sıcaklığı', 'Suyun donma ve kaynama sıcaklığı', 'En düşük ve en yüksek hava sıcaklığı'], answer: 1,
      hints: ['Termometre önce donan suya, sonra kaynayan suya batırıldı.', '', 'Bu iki sıcaklık her yerde, deniz seviyesinde aynıdır; ölçek bunlara dayanır.'],
      right: 'Evet. Ölçek suyun donma ve kaynama sıcaklığına dayanır.',
    });
    await par(c.say('Ölçek, suyun donma ve kaynama sıcaklıklarına dayanır.'), belir(c, cerc, 350));
    c.note('Suyun donma ve kaynama sıcaklığı temel alınır; aralık bölmelenir.', 'Ölçek');
  }

  /* ---- 4. Üç ölçek, aynı sütun ---- */
  async function ucOlcek(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    const T = termo(c, g1, { T: 0, goster: { c: 0, f: 0, k: 0 } });
    const x0 = T.f.nokta('sutun')[0];
    const isaret = (serit, y, degerler) => {
      const l = cizgi(c, g1, [x0, y], [410, y], RENK.cizgi, 2, KESIK);
      const n = degerler.map(([s, v, m]) => sayiYaz(c, g1, T.f, s, v, m));
      gizle(l, ...n);
      return { l, n };
    };
    const donma = isaret('c', T.f.olcek('c', 0)[1], [['c', 0, '0'], ['f', 32, '32'], ['k', 273, '273']]);
    const kayn = isaret('c', T.f.olcek('c', 100)[1], [['c', 100, '100'], ['f', 212, '212'], ['k', 373, '373']]);
    const tb = tablo(c, g1, { x: 460, y: 170, satir: 3, h: 58, size: 24, sutunlar: [{ ad: 'Ölçek', w: 190 }, { ad: 'Donma', w: 160 }, { ad: 'Kaynama', w: 170 }] });
    [['Celsius', '0 °C', '100 °C'], ['Fahrenheit', '32 °F', '212 °F'], ['Kelvin', '273 K', '373 K']].forEach((r, i) => {
      tb.yaz(i, 0, r[0]); tb.yaz(i, 1, r[1], S.sicaklik); tb.yaz(i, 2, r[2], S.sicaklik);
    });
    gizle(tb.g);

    await c.say('Termometre yine donmakta olan suyun içinde; sütun aynı yerde duruyor.');
    await par(c.say('Celsius cetvelinde bu yükseklik 0 °C olarak yazılır.', { speak: 'Celsius cetvelinde bu yükseklik sıfır derece olarak yazılır.' }),
      T.goster({ c: 1 }), belir(c, [donma.l, donma.n[0]], 450));
    await par(c.say('Fahrenheit cetvelinde aynı yükseklik 32 °F yazılır.', { speak: 'Fahrenheit cetvelinde aynı yükseklik otuz iki fahrenhayt derece yazılır.' }),
      T.goster({ f: 1 }), belir(c, donma.n[1], 450));
    await par(c.say('Kelvin cetvelinde aynı yükseklik 273 K yazılır.', { speak: 'Kelvin cetvelinde aynı yükseklik iki yüz yetmiş üç kelvin yazılır.' }),
      T.goster({ k: 1 }), belir(c, donma.n[2], 450));
    await par(c.say('Kaynayan suda yükseklik değişir: 100 °C, 212 °F, 373 K.', { speak: 'Kaynayan suda yükseklik değişir: yüz derece, iki yüz on iki fahrenhayt derece, üç yüz yetmiş üç kelvin.' }),
      (async () => {
        await belir(c, [donma.l, ...donma.n], 300, 0);
        await T.git(100, 1200);
        await belir(c, [kayn.l, ...kayn.n], 400);
      })());
    await par(c.say('Üç ölçek, aynı iki sıcaklığa kendi sayılarını verir.'),
      (async () => { await belir(c, [kayn.l, ...kayn.n], 300, 0); for (let i = 0; i < 3; i++) await tb.goster(i, 350); })(),
      belir(c, tb.g, 350));
    await c.say('Sıcaklık tek; yazılışı ölçeğe göre üç ayrı sayıdır.');

    // Sor: Kelvin termometresi kaynayan suda.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    termometre(c, g2, { x: 450, y: 420, h: 290, T: 100 });
    beher(c, g2, mot, 520, 280, 'kaynama');
    yazi(c, g2, 590, 470, 'kaynayan su', { size: 24, kalin: 600 });
    const kartlar = [['100 °C', 0], ['212 °F', 1], ['373 K', 2]].map(([m, i]) => {
      const g = c.S('g', {}, g2);
      kutu(c, g, 730, 150 + i * 100, 210, 76, { rx: 12 });
      yazi(c, g, 835, 200 + i * 100, m, { size: 30, kalin: 700, renk: S.sicaklik });
      gizle(g);
      return g;
    });
    const cerc = yesilCerceve(c, g2, 730, 350, 210, 76, 12);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Ela Kelvin termometresini deniz seviyesinde kaynayan suya batırıyor. Termometre kaç gösterir?',
      options: ['100 K', '212 K', '373 K'], answer: 2,
      hints: ['Kaynama sıcaklığı Kelvin cetvelinde başka bir sayıdır; sütunun yüksekliği aynı kalır.', '100 Celsius cetvelindeki, 212 Fahrenheit cetvelindeki sayıdır.', ''],
      right: 'Evet. Kelvin cetvelinde kaynama sıcaklığı 373 K.',
    });
    await par(c.say('Kelvin cetvelinde kaynama sıcaklığı 373 K’dır.', { speak: 'Kelvin cetvelinde kaynama sıcaklığı üç yüz yetmiş üç kelvindir.' }),
      (async () => { await sirayla(c, kartlar, 350); await belir(c, cerc, 300); })());
    c.note('Suyun donma sıcaklığı: 0 °C, 32 °F, 273 K.', 'Donma');
    c.note('Suyun kaynama sıcaklığı: 100 °C, 212 °F, 373 K.', 'Kaynama');
  }

  /* ---- 5. Hangi ölçek nerede? Dizideki sayı ---- */
  function cetvel(c, p, x, y, adim) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, 240, 90, { rx: 6 });
    for (let t = adim; t < 240 - adim / 2; t += adim) cizgi(c, g, [x + t, y], [x + t, y + 44], RENK.cizgi, 2);
    return g;
  }
  async function hangiOlcek(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const KX = [60, 360, 660];
    const kartlar = [['Celsius', 'ortam sıcaklığı'], ['Fahrenheit', 'sağlık'], ['Kelvin', 'bilimsel çalışma']].map(([a, b], i) => {
      const g = c.S('g', {}, g1);
      kutu(c, g, KX[i], 100, 280, 120, { rx: 14 });
      yazi(c, g, KX[i] + 140, 150, a, { size: 30, kalin: 700 });
      yazi(c, g, KX[i] + 140, 194, b, { size: 26, kalin: 600, renk: RENK.cizgi });
      gizle(g);
      return g;
    });
    const seritler = [30, 17, 30].map((adim, i) => { const g = cetvel(c, g1, KX[i] + 20, 290, adim); gizle(g); return g; });
    const cok = yazi(c, g1, KX[1] + 140, 424, 'daha çok bölme', { size: 24, kalin: 600, renk: RENK.cizgi });
    gizle(cok);

    await par(c.say('Dünyada ortam sıcaklığını ölçerken çoğunlukla Celsius kullanılır.'), belir(c, [kartlar[0], seritler[0]], 400));
    await par(c.say('Fahrenheit termometresinin bölme sayısı daha fazladır.'), belir(c, [kartlar[1], seritler[1], cok], 400));
    await c.say('Bölme sayısı fazla olunca ölçüm daha hassas yapılabilir.');
    await c.say('Bu yüzden bazı ülkeler sağlıkta Fahrenheit termometresi kullanır.');
    await par(c.say('Bilimsel çalışmalarda ise Kelvin ölçeği tercih edilir.'), belir(c, [kartlar[2], seritler[2]], 400));
    await c.choice({
      tag: 'Sor', q: 'Bazı ülkeler sağlıkta Fahrenheit termometresi kullanıyor. Neden?',
      options: ['Bölme sayısı fazla olduğu için daha hassas ölçüm yapılır', 'Suyun donma sıcaklığı Fahrenheit’te daha küçük olduğu için', 'Fahrenheit’le ölçülen vücut gerçekten daha sıcak olduğu için'], answer: 0,
      hints: ['', 'Fahrenheit’te donma 32’dir, 0’dan küçük değil. Bölme sayısı ile hassaslık arasındaki bağı düşün.', 'Ölçek, sıcaklığı değiştirmez; yalnızca sayıyı değiştirir.'],
      right: 'Evet. Bölme sayısı fazlaysa ölçüm daha hassas yapılır.',
    });
    c.note('Celsius ortam, Fahrenheit sağlık, Kelvin bilim için kullanılır.', 'Ölçeklerin amacı');

    // Dizi sahnesine dönüş: aynı yükseklik, iki ölçek.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const T = termo(c, g2, { T: 0 });
    const x0 = T.f.nokta('sutun')[0];
    const yF = T.f.olcek('f', 70)[1], yC = T.f.olcek('c', 70)[1];
    const tisG = c.S('g', {}, g2), cayG = c.S('g', {}, g2);
    cizgi(c, tisG, [x0, yF], [440, yF], RENK.cizgi, 2, KESIK);
    sayiYaz(c, tisG, T.f, 'f', 70, '70');
    tisort(c, tisG, 452, yF - 33, 0.6);
    yazi(c, tisG, 540, yF + 9, '70 °F', { size: 28, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    const sozF = yazi(c, tisG, 540, yF + 42, 'oda sıcaklığı dolayı', { size: 24, kalin: 600, renk: RENK.cizgi, hiza: 'start' });
    cizgi(c, cayG, [x0, yC], [440, yC], RENK.cizgi, 2, KESIK);
    sayiYaz(c, cayG, T.f, 'c', 70, '70');
    bardak(c, cayG, 452, yC - 25, 0.6);
    yazi(c, cayG, 540, yC + 9, '70 °C', { size: 28, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    const sozC = yazi(c, cayG, 540, yC + 42, 'sıcak çay', { size: 24, kalin: 600, renk: RENK.cizgi, hiza: 'start' });
    const son = c.S('g', {}, g2);
    yazi(c, son, 720, 440, 'Önce ölçek,', { size: 40, kalin: 700 });
    yazi(c, son, 720, 490, 'sonra sayı.', { size: 40, kalin: 700 });
    gizle(g2, tisG, cayG, sozF, sozC, son);
    g2.style.opacity = 0;

    await par(c.say('Şimdi dizi sahnesine dönelim.'), belir(c, g2, 400));
    await par(c.say('Dizideki termometre Fahrenheit ölçeklidir: 70 °F.', { speak: 'Dizideki termometre Fahrenheit ölçeklidir: yetmiş fahrenhayt derece.' }),
      T.git(21, 900), belir(c, tisG, 500));
    await par(c.say('Ela’nın çayı ise 70 °C’tır.', { speak: 'Ela’nın çayı ise yetmiş derecedir.' }),
      belir(c, tisG, 400, 0.45), T.git(70, 1000), belir(c, cayG, 500));
    await par(c.say('Sayı aynı, ölçek farklı olunca sıcaklıklar da farklıdır.', { speak: '[thoughtful] Sayı aynı, ölçek farklı olunca sıcaklıklar da farklıdır.' }),
      belir(c, [sozF, sozC], 450), belir(c, tisG, 400, 1), belir(c, cayG, 400, 1));
    await par(c.say('Bir sayıyı yorumlamak için ölçeği bilmek gerekir.'),
      c.tween(450, (e) => ['c', 'f', 'k'].forEach((s) => { T.birim[s].style.fill = e > 0.5 ? S.sicaklik : RENK.yazi; }), ease.out));
    await par(c.say('Aynı sıcaklık üç ölçekte üç sayıdır; aynı sayı üç ölçekte üç sıcaklık.'), belir(c, [tisG, cayG], 400, 0.45), belir(c, T.g, 400, 0.45), belir(c, son, 450));
    c.note('Sıcaklık aynı, ölçek farklı.', 'Üç ölçek');
  }

  /* ---- 6. Beş termometre, beş amaç ---- */
  async function bes(c) {
    const svg = c.svg(1000, 562);
    const SATIR = [['Sıvılı', 'vücut, ortam'], ['Metal', 'fırın, termostat'], ['Gazlı', 'laboratuvar, çok düşük'], ['Kızılötesi', 'dokunmadan, tehlikeli yer'], ['Dijital', 'vücut sıcaklığı']];
    const tb = tablo(c, svg, { x: 150, y: 60, satir: 5, h: 66, size: 24, sutunlar: [{ ad: 'Tür', w: 220 }, { ad: 'Nerede kullanılır', w: 600 }] });
    SATIR.forEach((r, i) => { tb.yaz(i, 0, r[0], RENK.yazi); tb.yaz(i, 1, r[1], RENK.cizgi); });
    const simgeler = SATIR.map((_, i) => { const g = simge(c, svg, i, 80, 60 + 66 * (i + 1) + 8, 1); gizle(g); return g; });
    const alt = yazi(c, svg, 560, 512, '', { size: 26, kalin: 600, renk: RENK.cizgi });
    gizle(tb.g, alt);
    const satirAc = async (i) => {
      if (i > 0) belir(c, [tb.satirlar[i - 1].g, simgeler[i - 1]], 350, 0.45);
      await par(tb.goster(i, 350), belir(c, simgeler[i], 350));
    };
    const altYaz = (m) => { alt.textContent = m; alt.style.opacity = 0; return belir(c, alt, 300); };

    await par(c.say('Kullanım amacına göre termometreler beş gruba ayrılır.'), belir(c, tb.g, 400));
    await par(c.say('Sıvılı, metal ve gazlı termometreler maddenin genleşmesinden yararlanır.'), altYaz('ilk üçü: genleşme'));
    await par(c.say('Sıvılı termometre vücut ve ortam sıcaklığını ölçmek için kullanılır.'), satirAc(0));
    await par(c.say('Yalnızca yapımındaki sıvının donma ve kaynama sıcaklıkları arasında ölçer.'), altYaz('sıvının donma–kaynama aralığı'));
    await par(c.say('Metal termometre, erime sıcaklığı yüksek metalden yapılır.'), satirAc(1), belir(c, alt, 300, 0));
    await par(c.say('Fırınlarda ve termostatlarda kullanılır; çok düşük sıcaklıkta hassas ölçemez.'), altYaz('çok düşükte hassas değil'));
    await par(c.say('Gazlı termometre hassastır; 1 K gibi çok düşük sıcaklığı ölçebilir.', { speak: 'Gazlı termometre hassastır; bir kelvin gibi çok düşük sıcaklığı ölçebilir.' }), satirAc(2), belir(c, alt, 300, 0));
    await c.say('Laboratuvarlarda ve hassas ölçümlerde kullanılır.');
    await par(c.say('Kızılötesi termometre, cisme dokunmadan ışınları algılayarak ölçer.'), satirAc(3));
    await c.say('Tehlikeli ortamlarda, sağlık kurumlarında ve gıda tesislerinde kullanılır.');
    await par(c.say('Dijital termometre günlük hayatta vücut sıcaklığı ölçmek için kullanılır.'), satirAc(4));
    await par(c.say('Tepki süresi uzundur; ani sıcaklık değişimini yakalayamaz.'), altYaz('tepkisi yavaş'));
    await par(c.say('Kızılötesi ve dijital termometreler, ilk üçünden çok daha hassastır.'),
      altYaz('ikisi çok hassas'), belir(c, [tb.satirlar[0].g, simgeler[0], tb.satirlar[1].g, simgeler[1], tb.satirlar[2].g, simgeler[2]], 350, 0.45),
      belir(c, [tb.satirlar[3].g, simgeler[3], tb.satirlar[4].g, simgeler[4]], 350, 1));
    c.note('Sıvılı, metal, gazlı, kızılötesi, dijital: amaca göre seçilir.', 'Beş tür');
  }

  /* ---- 7. Doğru termometreyi seç ---- */
  async function sec(c) {
    const svg = c.svg(1000, 562);
    const kartlar = turKartlari(c, svg);
    const cerc = KART_X.map((x) => yesilCerceve(c, svg, x, 66, 170, 100, 12));
    const yeniKart = (satirlar) => {
      const g = c.S('g', {}, svg), h = 230;
      kutu(c, g, 110, 215, 780, h, { rx: 14 });
      const y0 = 215 + (h - satirlar.length * 56) / 2 + 40;
      const tler = satirlar.map((s, i) => renkli(c, g, 500, y0 + i * 56, typeof s === 'string' ? [s] : s, { size: 32, kalin: 600 }));
      gizle(g);
      return { g, tler };
    };
    gizle(kartlar);
    await par(c.say('Beş türden birini seçmeyi deneyelim.'), sirayla(c, kartlar, 150));

    // Çözülmüş örnek.
    let k = yeniKart(['Fırının içindeki sıcaklık sürekli izlenecek.', 'Hangi termometre?', ['']]);
    await belir(c, k.g, 400);
    await c.say('Fırın içi çok sıcak bir ortamdır.');
    await par(c.say('Metal termometre, yüksek sıcaklıkta fırınlarda ve termostatlarda çalışır.'), belir(c, [kartlar[0], kartlar[2], kartlar[3], kartlar[4]], 350, 0.45));
    parcaKoy(c, k.tler[2], [['Cevap: ', RENK.cizgi], ['metal', RENK.iyi]]);
    await par(c.say('O hâlde fırın için metal termometre seçilir.'), belir(c, cerc[1], 300));

    // Birlikte çöz.
    c.clearSay();
    await belir(c, [k.g, cerc[1]], 300, 0); k.g.remove();
    await belir(c, [kartlar[0], kartlar[2], kartlar[3], kartlar[4]], 300, 1);
    k = yeniKart(['Yanına yaklaşılamayan sıcak ortam,', 'dokunmadan ölçülecek.', [['Dokunmadan ölçen tür: ', RENK.cizgi], ['……', RENK.soluk]]]);
    await belir(c, k.g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Boşluğa hangi tür yazılır?', options: ['Sıvılı', 'Kızılötesi', 'Metal'], answer: 1,
      hints: ['Bu iki tür cisme temas ederek ölçer; dokunmadan ölçen tür başkadır.', '', 'Dokunmadan ölçmek için cisimden yayılan ışınları algılayan türü düşün.'],
      right: 'Evet. Dokunmadan ölçen tür kızılötesidir.',
    });
    parcaKoy(c, k.tler[2], [['Dokunmadan ölçen tür: ', RENK.cizgi], ['kızılötesi', RENK.iyi]]);
    await par(c.say('Dokunmadan ölçmek gerekince kızılötesi termometre seçilir.'), belir(c, cerc[3], 300));

    // Tek başına.
    c.clearSay();
    await belir(c, [k.g, cerc[3]], 300, 0); k.g.remove();
    k = yeniKart(['Laboratuvarda 1 K gibi çok düşük', 'sıcaklık hassas ölçülecek.']);
    const gor = yazi(c, svg, 515, 196, '1 K gibi çok düşük sıcaklık', { size: 24, kalin: 600, renk: S.sicaklik });
    gizle(gor);
    await belir(c, k.g, 400);
    await c.choice({
      tag: 'Sor', q: 'Hangi termometre seçilir?', options: ['Metal', 'Dijital', 'Gazlı'], answer: 2,
      hints: ['Metal termometre çok düşük sıcaklıkta hassas ölçüm yapamaz.', 'Çok düşük sıcaklığı ölçebildiği söylenen türü düşün.', ''],
      right: 'Evet. Gazlı termometre çok düşük sıcaklığı hassas ölçer.',
    });
    await par(c.say('Çok düşük sıcaklığı ölçebilen tür gazlıdır.'), belir(c, [cerc[2], gor], 400));
  }

  /* ---- 8. Hangi tür hangi özelliğe sahip? ---- */
  const OZELLIK = [
    { ust: 'Yapımındaki sıvının donma ve', alt: 'kaynama sıcaklıkları arasında ölçer.', ad: 'sıvı genleşir', kutu: 0,
      neden: 'Evet. Sıvının cinsine göre ölçüm aralığı değişir.', ipucu: 'Sıvının donma ve kaynama sıcaklıkları hangi türün yapımında anılıyordu?' },
    { ust: 'Sıcaklığı artan metalin', alt: 'genleşmesine dayanır.', ad: 'metal genleşir', kutu: 1,
      neden: 'Evet. Metalin genleşmesi sıcaklığı gösterir.', ipucu: 'Genleşen ve erime sıcaklığı yüksek olan madde nedir?' },
    { ust: 'Sabit hacimdeki gazın basıncının', alt: 'sıcaklıkla değişimine dayanır.', ad: 'gaz basıncı', kutu: 2,
      neden: 'Evet. Gazın basıncı sıcaklıkla değişir.', ipucu: 'Basınçla çalışan tür hangisi?' },
    { ust: 'Cismin yüzeyinden yayılan', alt: 'kızılötesi ışınları algılar.', ad: 'ışın algılar', kutu: 3,
      neden: 'Evet. Işınları algıladığı için dokunmadan ölçer.', ipucu: 'Işın algılayarak çalışan tür hangisi?' },
    { ust: 'Direnci sıcaklıkla değişen', alt: 'devre elemanları kullanır.', ad: 'direnç değişir', kutu: 4,
      neden: 'Evet. Direnç değişimi sıcaklığı gösterir.', ipucu: 'Elektrik direnciyle çalışan tür hangisi?' },
  ];
  async function esle(c) {
    const svg = c.svg(1000, 562);
    const kartlar = turKartlari(c, svg);
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 300, 700, 120, { rx: 14 });
      yazi(c, kart, 500, 352, k.ust, { size: 26, kalin: 600 });
      yazi(c, kart, 500, 392, k.alt, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const el = kart;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${360 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const ad = yazi(c, svg, KART_X[k.kutu] + 85, 206, k.ad, { size: 24, kalin: 600, renk: RENK.cizgi });
      gizle(ad);
      await belir(c, ad, 300);
    };
    gizle(kartlar);
    await par(c.say('Şimdi her türü çalışma ilkesiyle eşleştirelim.'), sirayla(c, kartlar, 150));
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: TURLER, kartlar: OZELLIK,
      soru: () => 'Bu özellik hangi türe aittir?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Her tür, ölçeceği ortama göre seçilir.');
    const son = renkli(c, svg, 500, 400, ['Ölçek değişir, ', ['sıcaklık', S.sicaklik], ' değişmez.'], { size: 34, kalin: 700 });
    gizle(son);
    await par(c.say('Hangi ölçeği kullanırsak kullanalım sıcaklık aynıdır.'), belir(c, son, 450));
  }

  Ders.start({
    id: 'enerji-b1', kicker: 'Konu B · Isının hesabı', title: 'Üç ölçek, tek sıcaklık', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Üç ölçek, tek sıcaklık',
      hook: 'Bir yabancı dizide hava “70 derece” deniyor ve herkes tişörtle geziyor; nasıl olur?',
      button: 'Derse başla ›',
    },
    goals: ['Termometrenin sıcaklığı ölçen araç olduğunu söyler.', 'Ölçeğin suyun donma ve kaynama sıcaklığına dayandığını bilir.', 'Celsius, Fahrenheit ve Kelvin ölçeklerinin kullanım amaçlarını söyler.', 'Ortama göre uygun termometre türünü seçer.'],
    scenes: [
      { title: 'Hatırla', goal: 'İç enerjiyi ve sıcaklığın ölçüldüğünü hatırla.', run: hatirla },
      { title: '“Yetmiş derece”', goal: 'Aynı sayının iki ayrı durum anlattığını gör; termometreyi tanı.', run: yetmis },
      { title: 'Ölçek nereden gelir?', goal: 'Ölçeğin iki sabit noktaya dayandığını gör.', run: sabitNokta },
      { title: 'Üç ölçek, aynı sütun', goal: 'Aynı sıcaklığın üç ölçekte üç ayrı sayıyla yazıldığını gör.', run: ucOlcek },
      { title: 'Hangi ölçek nerede?', goal: 'Ölçeklerin kullanım amaçlarını ve sayının ölçeğe bağlı anlamını öğren.', run: hangiOlcek },
      { title: 'Beş termometre, beş amaç', goal: 'Termometre türlerini ve kullanım yerlerini tanı.', run: bes },
      { title: 'Doğru termometreyi seç', goal: 'Verilen ortama uygun termometre türünü seç.', run: sec },
      { title: 'Hangi tür hangi özelliğe sahip?', goal: 'Her türü çalışma ilkesiyle eşleştir.', run: esle },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela iki termometreyi deniz seviyesinde aynı kaynayan suya batırıyor. Biri 100, öteki 212 gösteriyor. Neden?',
        options: ['Termometrelerden biri bozuktur', 'Biri Celsius, öteki Fahrenheit ölçeklidir', 'Suyun iki yanı farklı sıcaklıktadır'], answer: 1,
        why: ['İki termometre de doğru çalışıyor; farklı ölçeklerde aynı sıcaklık farklı sayıyla yazılır.', 'Kaynama sıcaklığı Celsius’ta 100, Fahrenheit’te 212 olarak yazılır; sıcaklık aynıdır.', 'Kaynayan suyun her yeri aynı sıcaklıktadır; fark ölçekten gelir.'], scene: 3 },
      { q: 'Bir fizik laboratuvarı sonuçlarını bilimsel bir raporda yayımlayacak. Sıcaklıkları hangi ölçeğe göre yazması beklenir?',
        options: ['Kelvin', 'Fahrenheit', 'Hangisi olursa olsun'], answer: 0,
        why: ['Bilimsel çalışmalarda Kelvin ölçeği tercih edilir.', 'Fahrenheit sağlıkta kullanılır; bilimsel çalışmalarda tercih edilen ölçek bu değildir.', 'Bilimsel çalışmalarda tercih edilen bir ölçek vardır: Kelvin.'], scene: 4 },
      { q: 'Bir müzenin girişinde ziyaretçilerin ateşi, onlara dokunmadan ölçülecek. Hangi termometre uygundur?',
        options: ['Sıvılı', 'Gazlı', 'Kızılötesi'], answer: 2,
        why: ['Sıvılı termometre cisme temas ederek ölçer.', 'Gazlı termometre hassas laboratuvar ölçümleri içindir ve cisme temas eder.', 'Kızılötesi termometre ışınları algılayarak dokunmadan ölçer.'], scene: 5 },
      { q: 'Hangisi doğrudur?',
        options: ['Suyun donma sıcaklığı Celsius’ta 32’dir', 'Suyun donma sıcaklığı 0 °C, 32 °F ve 273 K’dır', 'Suyun kaynama sıcaklığı üç ölçekte de 100’dür'], answer: 1,
        why: ['32 Fahrenheit’in sayısıdır; Celsius’ta donma 0’dır.', 'Aynı donma sıcaklığı üç ölçekte üç ayrı sayıyla yazılır.', 'Kaynama sıcaklığı Celsius’ta 100, Fahrenheit’te 212, Kelvin’de 373’tür.'], scene: 3 },
      { q: 'Bir termometre 70 gösteriyor; ölçeği bilinmiyor. Hangisi söylenebilir?',
        options: ['Sayı aynıysa sıcaklık da aynıdır', 'Sayı büyükse ölçek ne olursa olsun sıcaklık yüksektir', 'Sıcaklığı yorumlamak için ölçeği bilmek gerekir'], answer: 2,
        why: ['70 °C ile 70 °F aynı sıcaklık değildir; sayı aynı olsa da ölçek farklıdır.', 'Sayının büyüklüğü ölçeğe bağlıdır; ölçek bilinmeden sıcaklık hakkında karar verilmez.', 'Aynı sayı farklı ölçeklerde farklı sıcaklıkları gösterir; önce ölçek bilinmelidir.'], scene: 4 },
    ],
    summary: ['Sıcaklık Celsius, Fahrenheit ve Kelvin ölçekleriyle ölçülür; üçü de suyun donma ve kaynama sıcaklığına dayanır.', 'Celsius ortam, Fahrenheit sağlık, Kelvin bilim için kullanılır; termometre türü ortama göre seçilir.', '<b>Sıcaklık aynı, ölçek farklı.</b>'],
    nextLesson: { href: 'b2-oz-isi-ve-isi-sigasi.html', label: 'Sonraki: Öz ısı ve ısı sığası ›' },
  });
})();
