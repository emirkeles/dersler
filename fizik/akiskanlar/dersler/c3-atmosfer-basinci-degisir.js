/* C3 — Atmosfer basıncı her yerde aynı değil
   Isınan hava genleşir ve yükselir (alçak basınç), soğuyan hava alçalır (yüksek basınç); hava yüksek basınçtan alçak basınca akar, rüzgâr oluşur.
   Balon, dağcı, Magdeburg yarım küreleri ve pipet "içerideki basınç dışarıdakinden büyük kalır" karşılaştırmasıyla anlatılır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/C-acik-hava-basinci.md (C3). Gaz yasası, kapalı kap hesabı, formül yoktur.
   Bu dosyada yazılan araçlar (araç dosyasında olmayanlar): motor, titret, uzat, paneller, balon çizimi, yarım küreler, pipet, türbin. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, sinifla } = window.KIT;
  const { HAVA, tanecik, zemin, cerceve, sivKabi, olcuOku, yuzeyOklari, tanecikSatirlari, SEYREK_SATIRLAR } = window.KIT_C;
  const { lerp, ease } = Ders;
  const ac = (...els) => els.flat().forEach((e) => { e.style.opacity = 1; });
  const AYDINLIK = '#dfe5f7';

  /* ---- arka plan döngüsü: sahne boyunca süren hareket (titreşim, rüzgâr, pervane) tek c.tween döngüsüyle kurulur ---- */
  function motor(c) {
    const isler = []; let basladi = false;
    return {
      ekle(f) {
        isler.push(f);
        if (basladi) return;
        basladi = true;
        (async () => {
          try { for (;;) { let onceki = 0; await c.tween(1000, (e) => { const dt = e - onceki; onceki = e; isler.forEach((g) => g(dt)); }, ease.linear); } } catch (_) { /* sahne değişti */ }
        })();
      },
    };
  }
  /* Taneciklerin yerinde titreşimi: genlik (birim) ve periyot (ms) sonradan değiştirilebilir; q[i].x/y tabanı taşır. */
  function titret(c, m, noktalar, genlik, periyot) {
    const d = { genlik, periyot, faz: 0 };
    d.q = noktalar.map((el, i) => ({ el, x: +el.getAttribute('cx'), y: +el.getAttribute('cy'), a: i * 2.4, b: i * 1.3 + 0.7 }));
    d.ciz = () => d.q.forEach((k) => {
      k.el.setAttribute('cx', k.x + d.genlik * Math.sin(d.faz + k.a));
      k.el.setAttribute('cy', k.y + d.genlik * Math.cos(1.3 * d.faz + k.b));
    });
    m.ekle((dt) => { d.faz += ((dt * 1000) / d.periyot) * 2 * Math.PI; d.ciz(); });
    d.ciz();
    return d;
  }
  /* Kalın oklar için büyük uçlu ok (KIT.ok'un ucu 17 birimde sabit kalır, kalınlık 10 ve üstünde küçük görünür); aynı { g, ciz } arayüzü. */
  function kOk(c, p, P, Q, renk, w) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P, Q, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (P2, Q2) => {
      const L = Math.hypot(Q2[0] - P2[0], Q2[1] - P2[1]);
      if (L < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const u = [(Q2[0] - P2[0]) / L, (Q2[1] - P2[1]) / L], n = [-u[1], u[0]], bl = Math.min(1.5 * w + 6, L), bh = 0.85 * w + 3;
      const T = [Q2[0] - u[0] * bl, Q2[1] - u[1] * bl];
      hat.setAttribute('x1', P2[0]); hat.setAttribute('y1', P2[1]); hat.setAttribute('x2', T[0] + u[0] * 2); hat.setAttribute('y2', T[1] + u[1] * 2);
      uc.setAttribute('d', `M${Q2[0]},${Q2[1]} L${T[0] + n[0] * bh},${T[1] + n[1] * bh} L${T[0] - n[0] * bh},${T[1] - n[1] * bh} Z`);
    };
    ciz(P, Q);
    return { g, ciz };
  }
  /* Okun P noktasından Q'ya doğru uzayarak çizilmesi. */
  function uzat(c, o, P, Q, ms) {
    o.g.style.opacity = 1;
    return c.tween(ms, (e) => o.ciz(P, [lerp(P[0], Q[0], e), lerp(P[1], Q[1], e)]), ease.out);
  }
  /* Soluk gri-mavi dolgulu balon çizimi ve oklar; koy(cy, r, kisa) hepsini yerleştirir. */
  function balonCiz(c, p) {
    const g = c.S('g', {}, p);
    const daire = c.S('circle', { cx: 500, cy: 400, r: 40, fill: HAVA.dolgu, 'fill-opacity': 0.22, stroke: HAVA.cizgi, 'stroke-width': 3 }, g);
    const dis = [ok(c, g, [424, 400], [454, 400], RENK.basinc, 4), ok(c, g, [576, 400], [546, 400], RENK.basinc, 4)];
    const ic = [ok(c, g, [496, 400], [466, 400], RENK.basinc, 4), ok(c, g, [504, 400], [534, 400], RENK.basinc, 4)];
    const disEt = yazi(c, g, 320, 408, 'dışarısı', { size: 24 });
    const icEt = yazi(c, g, 500, 335, 'içerisi', { size: 24 });
    const bag = cizgi(c, g, [500, 343], [500, 386], RENK.ince, 2);
    const koy = (cy, r, kisa) => {
      daire.setAttribute('cy', cy); daire.setAttribute('r', r);
      dis[0].ciz([500 - r - 6 - kisa, cy], [500 - r - 6, cy]); dis[1].ciz([500 + r + 6 + kisa, cy], [500 + r + 6, cy]);
      ic[0].ciz([500 - r + 36, cy], [500 - r + 6, cy]); ic[1].ciz([500 + r - 36, cy], [500 + r - 6, cy]);
      disEt.setAttribute('y', cy + 8); icEt.setAttribute("y", cy - r - 25);
      bag.setAttribute('y1', cy - r - 17); bag.setAttribute('y2', cy - r + 26);
    };
    return { g, koy };
  }
  /* İki panel: alçak basınç alanı (sol) ve yüksek basınç alanı (sağ). Oklar soluk gri-mavi. */
  function paneller(c, p) {
    const g = c.S('g', {}, p);
    const yap = (x1, x2, ad, tx) => {
      const k = c.S('g', {}, g), zem = c.S('g', {}, k);
      cerceve(c, zem, x1, 90, x2, 470, RENK.ince, { kesik: false });
      zemin(c, zem, x1 + 16, x2 - 16, 440);
      return { k, zem, baslik: yazi(c, k, tx, 490, ad, { size: 26, kalin: 700 }) };
    };
    const S = yap(40, 480, 'alçak basınç alanı', 260), Y = yap(520, 960, 'yüksek basınç alanı', 740);
    const yukari = kOk(c, S.k, [260, 400], [260, 210], HAVA.cizgi, 14);
    const yanS = c.S('g', {}, S.k);
    kOk(c, yanS, [70, 420], [200, 420], HAVA.cizgi, 10); kOk(c, yanS, [450, 420], [320, 420], HAVA.cizgi, 10);
    const asagi = kOk(c, Y.k, [740, 120], [740, 330], HAVA.cizgi, 14);
    const yanY = c.S('g', {}, Y.k);
    kOk(c, yanY, [700, 420], [580, 420], HAVA.cizgi, 10); kOk(c, yanY, [780, 420], [900, 420], HAVA.cizgi, 10);
    return { g, S, Y, yukari, yanS, asagi, yanY, gizleOklar() { gizle(yukari.g, yanS, S.baslik, asagi.g, yanY, Y.baslik); } };
  }

  /* ---- 0. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Torricelli düzeneği: kaptaki cıva yüzeyine bastıran P₀ ve 76 cm'lik cıva sütunu.
    const a = c.S('g', {}, svg);
    sivKabi(c, a, { x1: 360, x2: 700, yUst: 380, yAlt: 470, yYuzey: 410 });
    c.S('rect', { x: 502, y: 190, width: 36, height: 255, fill: RENK.sivi, 'fill-opacity': 0.55 }, a);
    c.S('path', { d: 'M500,445 L500,90 L540,90 L540,445', fill: 'none', stroke: HAVA.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, a);
    olcuOku(c, a, 600, 190, 410, '76 cm', { etiketX: 632 });
    yuzeyOklari(c, a, [372, 410], [488, 410], { n: 3, boy: 40, taraf: [430, 300], w: 4 });
    yazi(c, a, 430, 340, 'P_{0}', { size: 30, kalin: 700, renk: RENK.basinc, math: true });
    gizle(a);
    const esit = renkli(c, svg, 500, 530, [['P₀', RENK.basinc], ' = cıva sütununun basıncı'], { size: 28, kalin: 700 });
    gizle(esit);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Torricelli düzeneğinde cıva sütunu 76 cm’de dururken, kaptaki cıva yüzeyine bastıran P₀ için ne söylenir?',
      options: ['Daha büyüktür', 'Cıva sütununun basıncına eşittir', 'Daha küçüktür'], answer: 1,
      hints: ['Cıva sütunu düşmüyorsa iki basınç dengededir.', '', 'Cıva sütunu düşmüyorsa iki basınç dengededir.'],
      right: 'Evet. Cıva sütunu ile P₀ dengededir.',
    });
    c.clearSay();
    await par(c.say('Cıva sütunu, kaptaki yüzeye bastıran P₀ ile dengededir.', { speak: 'Cıva sütunu, kaptaki yüzeye bastıran pe sıfır ile dengededir.' }), belir(c, esit, 400));
    c.clearSay();
    await belir(c, [a, esit], 400, 0); a.remove(); esit.remove();

    // Yükseldikçe hava: tanecikler seyrekleşir.
    const b = c.S('g', {}, svg);
    cerceve(c, b, 380, 100, 620, 475, RENK.ince);
    tanecikSatirlari(c, b, SEYREK_SATIRLAR(410, 590));
    zemin(c, b, 340, 660, 480);
    olcuOku(c, b, 700, 128, 470, 'yükseklik', { etiketX: 730 });
    gizle(b);
    const yog = yazi(c, svg, 190, 260, 'yoğunluk azalır', { size: 28, kalin: 700 });
    const bas = yazi(c, svg, 190, 310, 'basınç azalır', { size: 28, kalin: 700, renk: RENK.basinc });
    gizle(yog, bas);
    await belir(c, b, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Yükseldikçe havanın yoğunluğu ve açık hava basıncı nasıl değişir?',
      options: ['İkisi de artar', 'Yoğunluk azalır, basınç artar', 'İkisi de azalır'], answer: 2,
      hints: ['Yükseldikçe üstümüzdeki hava azalır; taneciklere bak.', 'Basınç, üstteki hava sütununun ağırlığından gelir.', ''],
      right: 'Evet. Yükseldikçe ikisi de azalır.',
    });
    c.clearSay();
    await par(c.say('Yükseldikçe hava seyrekleşir ve açık hava basıncı azalır.'), belir(c, [yog, bas], 400));
    c.clearSay();
    const son = yazi(c, svg, 500, 536, 'açık hava basıncı yerden yere değişir mi?', { size: 28, kalin: 700 });
    gizle(son);
    await par(c.say('Bugün açık hava basıncının yerden yere nasıl değiştiğine bakacağız.'), belir(c, son, 450));
  }

  /* ---- 1. Isınan hava genleşir ---- */
  async function isinanHava(c) {
    const svg = c.svg(1000, 562), m = motor(c);
    const tum = c.S('g', {}, svg);
    kutu(c, tum, 110, 200, 180, 180, { rx: 8, dolgu: 'none', renk: RENK.cizgi });
    const kSag = kutu(c, tum, 400, 200, 180, 180, { rx: 8, dolgu: 'none', renk: RENK.cizgi });
    const XS = [135, 175, 215, 255], YS = [225, 265, 305, 345], sol = [], sag = [];
    YS.forEach((y) => XS.forEach((x) => { sol.push(tanecik(c, tum, x, y)); sag.push(tanecik(c, tum, x + 290, y)); }));
    ok(c, tum, [300, 290], [390, 290], RENK.yazi, 5);
    yazi(c, tum, 320, 268, 'ısıt', { hiza: 'start', size: 24 });
    yazi(c, tum, 110, 420, 'soğuk hava', { hiza: 'start', size: 26, kalin: 700 });
    const adSag = yazi(c, tum, 400, 420, 'ısınan hava', { hiza: 'start', size: 26, kalin: 700 });
    const seyrek = yazi(c, tum, 460, 100, 'seyrek', { size: 26, kalin: 700, renk: RENK.basinc });
    const sik = yazi(c, tum, 150, 170, 'sık', { size: 26, kalin: 700, renk: RENK.basinc });
    const vSol = titret(c, m, sol, 3, 450), vSag = titret(c, m, sag, 3, 450);
    gizle(tum, seyrek, sik);
    await belir(c, tum, 450);

    await par(c.say('Sıcaklık arttığında hava molekülleri daha büyük süratle hareket eder.'),
      c.tween(300, (e) => { vSag.genlik = lerp(3, 8, e); vSag.periyot = lerp(450, 150, e); }, ease.inOut));
    const TX = [440, 520, 600, 680], TY = [175, 245, 315, 385], b0 = vSag.q.map((q) => [q.x, q.y]);
    await par(c.say('Birbirinden uzaklaşırlar: hava genleşir.'), c.tween(1000, (e) => {
      kSag.setAttribute('y', lerp(200, 130, e)); kSag.setAttribute('width', lerp(180, 320, e)); kSag.setAttribute('height', lerp(180, 270, e));
      vSag.q.forEach((q, i) => { q.x = lerp(b0[i][0], TX[i % 4], e); q.y = lerp(b0[i][1], TY[Math.floor(i / 4)], e); });
      adSag.setAttribute('y', lerp(420, 430, e));
    }, ease.inOut));
    c.clearSay();

    await c.choice({
      tag: 'Tahmin et', q: 'Aynı miktardaki hava ısınıp genleşince yoğunluğu nasıl olur?',
      options: ['Artar; moleküllerin sürati artar', 'Azalır; aynı hava daha büyük yere yayılır', 'Değişmez'], answer: 1,
      hints: ['Tanecik sayısı aynı, kutu büyüdü.', '', 'Birim hacimde kaç tanecik var?'],
      right: 'Evet. Aynı tanecikler daha büyük yere yayıldı.',
    });
    c.clearSay();
    await par(c.say('Genleşen havanın yoğunluğu azalır; hava daha hafif olur.'), belir(c, [seyrek, sik], 400));
    await par(c.say('Soğuyan havanın molekülleri yavaşlar ve birbirine yaklaşır.'),
      c.tween(300, (e) => { vSol.genlik = lerp(3, 1.5, e); vSol.periyot = lerp(450, 600, e); }, ease.inOut));
    await c.say('Soğuyan havanın yoğunluğu artar.');
    c.note('<b>Isınan hava genleşir; yoğunluğu azalır.</b><br>Soğuyan havanın yoğunluğu artar.', 'Sıcaklık', 'sicaklik');
  }

  /* ---- 2. Alçak ve yüksek basınç alanları ---- */
  async function alanlar(c) {
    const svg = c.svg(1000, 562);
    const p = paneller(c, svg);
    p.gizleOklar(); gizle(p.S.zem, p.Y.zem);
    await belir(c, [p.S.zem, p.Y.zem], 450);

    await par(c.say('Isınan hava genleşir, hafifler ve yükselir.'), uzat(c, p.yukari, [260, 400], [260, 210], 600));
    await par(c.say('Yükselen hava yeryüzünde alçak basınç alanı oluşturur.'), belir(c, [p.yanS, p.S.baslik], 500));
    await par(c.say('Soğuyan hava yoğunlaşır, aşağı iner.'), uzat(c, p.asagi, [740, 120], [740, 330], 600));
    await par(c.say('Alçalan hava yeryüzünde yüksek basınç alanı oluşturur.'), belir(c, [p.yanY, p.Y.baslik], 500));
    const atm = yazi(c, svg, 500, 540, 'atmosfer basıncı', { size: 30, kalin: 700, renk: RENK.basinc });
    gizle(atm);
    await par(c.say('Yeryüzünde yerden yere değişen açık hava basıncına atmosfer basıncı denir.'), belir(c, atm, 400));
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Bir bölgede yeryüzündeki hava ısınıp yükseliyor. Orada yeryüzünde nasıl bir basınç alanı oluşur?',
      options: ['Yüksek basınç alanı', 'Alçak basınç alanı', 'Basınç aynı kalır'], answer: 1,
      hints: ['Yükselen hava yeryüzünden ayrılıyor.', '', 'Isınan hava alçak basınç alanı oluşturur.'],
      right: 'Evet. Isınıp yükselen hava alçak basınç bırakır.',
    });
    c.clearSay();
    p.S.k.style.opacity = 1; p.Y.k.style.opacity = 1;
    await par(c.say('Isınıp yükselen hava, alçak basınç alanı oluşturur.'), belir(c, p.Y.k, 450, 0.3));
    c.note('<b>Isınan hava yükselir: alçak basınç.</b><br>Soğuyan hava alçalır: yüksek basınç.', 'Basınç alanları', 'alanlar');
  }

  /* ---- 3. Rüzgâr ---- */
  async function ruzgar(c) {
    const svg = c.svg(1000, 562), m = motor(c);
    const p = paneller(c, svg);
    gizle(p.g);
    await belir(c, p.g, 450);

    await c.choice({
      tag: 'Tahmin et', q: 'Yüksek ve alçak basınç alanları yan yana. Yeryüzüne yakın hava hangi yöne ilerler?',
      options: ['Alçak basınç alanından yüksek basınç alanına', 'Hiç ilerlemez', 'Yüksek basınç alanından alçak basınç alanına'], answer: 2,
      hints: ['Hava, basıncın büyük olduğu yerden küçük olduğu yere doğru iter.', 'Şemadaki oklar yüzeyde hangi yöne bakıyor?', ''],
      right: 'Evet. Hava yüksek basınçtan alçak basınca ilerler.',
    });
    c.clearSay();

    // Dört ok başı sağdan sola akar (yüksek basınç alanından alçak basınç alanına); akış tek döngüyle kurulur.
    const ruz = c.S('g', {}, svg), chev = [], etiket = yazi(c, svg, 480, 350, 'rüzgâr', { size: 24, kalin: 700 });
    for (let i = 0; i < 6; i++) chev.push(c.S('path', { fill: 'none', stroke: AYDINLIK, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ruz));
    const diz = (s) => chev.forEach((q, i) => {
      const k = i - 1, x = 740 - 120 * k - s;
      q.setAttribute('d', `M${x + 12},366 L${x - 12},380 L${x + 12},394`);
      q.style.opacity = k === -1 ? s / 120 : k === 4 ? 1 - s / 120 : 1;
    });
    let t = 0;
    diz(0); gizle(ruz, etiket);
    m.ekle((dt) => { t = (t + dt * 1000) % 2400; diz((t / 2400) * 120); });
    await par(c.say('Hava, yüksek basınç alanından alçak basınç alanına doğru hareket eder.'), belir(c, ruz, 400));
    await par(c.say('Atmosferdeki bu hava hareketine rüzgâr denir.'), belir(c, etiket, 400));
    await c.say('Dünya’nın dönüşü rüzgârın yönünü saptırır.', { speak: '[curious] Dünya’nın dönüşü rüzgârın yönünü saptırır.' });
    await c.say('Coğrafyadaki hava durumu haritaları bu alanları gösterir.');
    await c.say('Alçak basınç yazılan yere doğru rüzgâr eser.');
    c.note('<b>Hava, basıncın yüksek olduğu yerden alçak olduğu yere akar.</b><br>Örnek: rüzgâr.', 'Rüzgâr', 'ruzgar');
  }

  /* ---- 4. Rüzgâr enerjisi ---- */
  async function ruzgarEnerjisi(c) {
    const svg = c.svg(1000, 562), m = motor(c);
    const ruz = c.S('g', {}, svg);
    [200, 270, 340].forEach((y) => kOk(c, ruz, [60, y], [350, y], HAVA.cizgi, 10));
    const yen = yazi(c, svg, 300, 80, 'yenilenebilir enerji', { size: 28, kalin: 700 });
    const turbin = c.S('g', {}, svg);
    c.S('rect', { x: 520, y: 270, width: 20, height: 170, fill: '#8f9bc4' }, turbin);
    c.S('rect', { x: 480, y: 250, width: 80, height: 40, rx: 10, fill: '#c3cbea' }, turbin);
    c.S('rect', { x: 500, y: 255, width: 55, height: 30, rx: 6, fill: '#5b678f' }, turbin);
    const per = c.S('g', {}, turbin);
    for (let k = 0; k < 3; k++) {
      const a = ((-90 + 120 * k) * Math.PI) / 180;
      cizgi(c, per, [480, 270], [480 + 100 * Math.cos(a), 270 + 100 * Math.sin(a)], AYDINLIK, 10);
    }
    c.S('circle', { cx: 480, cy: 270, r: 9, fill: '#c3cbea' }, per);
    const jen = c.S('g', {}, svg);
    cizgi(c, jen, [592, 210], [548, 256], RENK.ince, 2);
    yazi(c, jen, 585, 200, 'jeneratör', { hiza: 'start', size: 24, kalin: 600 });
    const elk = c.S('g', {}, svg);
    ok(c, elk, [560, 270], [700, 270], RENK.yazi, 6);
    yazi(c, elk, 720, 278, 'elektrik', { hiza: 'start', size: 26, kalin: 700 });
    const hav = yazi(c, svg, 205, 420, 'yüksek basınç → alçak basınç', { size: 24, kalin: 600, renk: RENK.basinc });
    gizle(ruz, yen, turbin, jen, elk, hav);
    let aci = 0, doner = false;
    m.ekle((dt) => { if (!doner) return; aci = (aci + dt * 1000 * (360 / 2000)) % 360; per.setAttribute('transform', `rotate(${aci} 480 270)`); });

    await par(c.say('Rüzgâr, yenilenebilir enerji kaynakları arasında önemli bir yere sahiptir.'), belir(c, ruz, 500), belir(c, yen, 400));
    await par(c.say('Rüzgâr türbininin pervaneleri rüzgârın etkisiyle döner.'), (async () => { await belir(c, turbin, 500); doner = true; })());
    await par(c.say('Bu hareket, jeneratörün elektrik üretmesini sağlar.'), belir(c, [jen, elk], 400));
    await par(c.say('Rüzgâr enerjisi, alçak ve yüksek basınç alanları arasındaki hava hareketinden gelir.'), belir(c, hav, 400));
  }

  /* ---- 5. Alçak mı, yüksek mi? ---- */
  async function alcakMiYuksekMi(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 60, ad: 'Alçak basınç alanı' }, { x: 520, ad: 'Yüksek basınç alanı' }], sayac = [0, 0];
    KUTU.forEach((k) => {
      kutu(c, svg, k.x, 60, 420, 50, { rx: 10 }); yazi(c, svg, k.x + 210, 95, k.ad, { size: 26, kalin: 700, renk: RENK.basinc });
      kutu(c, svg, k.x, 130, 420, 390, { rx: 10, dolgu: 'none' });
    });
    const KARTLAR = [
      { ad: 'Isınan hava genleşir', kart: ['Isınan hava', 'genleşir'], kutu: 0, neden: 'Evet. Isınan hava yükselir; alçak basınç oluşur.' },
      { ad: 'Soğuyan hava yoğunlaşır', kart: ['Soğuyan hava', 'yoğunlaşır'], kutu: 1, neden: 'Evet. Soğuyan hava alçalır; yüksek basınç oluşur.' },
      { ad: 'Hava alçalır', kart: ['Hava alçalır'], kutu: 1, neden: 'Evet. Alçalan hava yüksek basınç alanı oluşturur.' },
      { ad: 'Hava yükselir', kart: ['Hava yükselir'], kutu: 0, neden: 'Evet. Yükselen hava alçak basınç alanı oluşturur.' },
      { ad: 'Yüzeyde hava merkeze doğru gelir', kart: ['Yüzeyde hava', 'merkeze doğru gelir'], kutu: 0, neden: 'Evet. Hava alçak basınç alanına doğru akar.' },
      { ad: 'Yüzeyde hava merkezden yanlara yayılır', kart: ['Yüzeyde hava merkezden', 'yanlara yayılır'], kutu: 1, satir: ['Yüzeyde hava merkezden', 'yanlara yayılır'], neden: 'Evet. Hava yüksek basınç alanından uzaklaşır.' },
    ];
    let kartG = null;
    const goster = async (k) => {
      kartG = c.S('g', {}, svg);
      kutu(c, kartG, 280, 190, 440, 120, { rx: 14 });
      const ls = k.kart, y0 = ls.length === 1 ? 262 : 244;
      ls.forEach((s, i) => yazi(c, kartG, 500, y0 + i * 42, s, { size: 32, kalin: 700 }));
      gizle(kartG); await belir(c, kartG, 350);
    };
    /* Kart yerinde küçülüp söner; adı kutuda belirir. */
    const yerlestir = async (_, k) => {
      const el = kartG;
      await c.tween(400, (e) => {
        el.setAttribute('transform', `translate(500,250) scale(${lerp(1, 0.6, e)}) translate(-500,-250)`);
        el.style.opacity = 1 - e;
      }, ease.in);
      el.remove();
      const cx = KUTU[k.kutu].x + 210, y = 365 + 56 * sayac[k.kutu], ls = k.satir || [k.ad];
      const ts = ls.map((s, i) => yazi(c, svg, cx, y + i * 28, s, { size: 22, kalin: 600 }));
      gizle(ts); await belir(c, ts, 300);
      sayac[k.kutu] += ls.length > 1 ? 2 : 1;
    };

    await c.say('Alçak ve yüksek basınç hakkında önermeler kuralım.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Önce havanın yükseldiğini mi, alçaldığını mı düşün.' }, k)),
      soru: (k) => `“${k.ad}” hangi basınç alanı için doğrudur?`,
      sec: (_, k) => goster(k), yerlestir,
    });
    c.clearSay();
    const yuk = kOk(c, svg, [270, 320], [270, 170], HAVA.cizgi, 10), asa = kOk(c, svg, [730, 170], [730, 320], HAVA.cizgi, 10);
    gizle(yuk.g, asa.g);
    await par(c.say('Alçak basınçta hava yükselir, yüksek basınçta alçalır.'), belir(c, [yuk.g, asa.g], 450));
  }

  /* ---- 6. Yükselen balon ---- */
  async function yukselenBalon(c) {
    const svg = c.svg(1000, 562);
    zemin(c, svg, 100, 900, 470);
    const bl = balonCiz(c, svg), olcu = olcuOku(c, svg, 905, 150, 470, 'yükseklik', { etiketX: 945 });
    gizle(bl.g, olcu);
    await par(c.say('Balon yükseldikçe dışarıdaki açık hava basıncı azalır.'), belir(c, [bl.g, olcu], 500));
    await c.say('İçerideki hava, balonu dışarı doğru itmeye devam eder.', { speak: '[thoughtful] İçerideki hava, balonu dışarı doğru itmeye devam eder.' });
    c.clearSay();

    await c.choice({
      tag: 'Birlikte çöz', q: 'Dışarıdaki basınç azalıyor, içerideki itme sürüyor. Balon ne olur?',
      options: ['Büzülür', 'Şişer', 'Değişmez'], answer: 1,
      hints: ['Dışarıdaki itme küçülünce balonu kim tutar?', '', 'İçeriden itme, dışarıdan itmeden büyük kaldı.'],
      right: 'Evet. İçerideki itme büyük kalıyor.',
    });
    c.clearSay();
    await par(c.say('İçerideki basınç dışarıdakinden büyük olunca balon şişer.'),
      c.tween(1200, (e) => bl.koy(lerp(400, 150, e), lerp(40, 84, e), lerp(30, 10, e)), ease.inOut));
    // Patlama: balon söner, merkezden dışa on ışın yayılır.
    const isin = c.S('g', {}, svg), isinlar = [];
    for (let i = 0; i < 10; i++) { const a = (i * 36 * Math.PI) / 180; isinlar.push({ a, l: cizgi(c, isin, [500, 150], [500, 150], HAVA.cizgi, 4) }); }
    gizle(isin);
    await par(c.say('Yeterince yükselirse balon patlar.'), (async () => {
      await belir(c, bl.g, 100, 0);
      isin.style.opacity = 1;
      await c.tween(300, (e) => {
        const r1 = lerp(20, 84, e);
        isinlar.forEach((k) => {
          k.l.setAttribute('x1', 500 + r1 * Math.cos(k.a)); k.l.setAttribute('y1', 150 + r1 * Math.sin(k.a));
          k.l.setAttribute('x2', 500 + (r1 + 40) * Math.cos(k.a)); k.l.setAttribute('y2', 150 + (r1 + 40) * Math.sin(k.a));
        });
      }, ease.out);
    })());
  }

  /* ---- 7. Dağcının nefesi ---- */
  async function dagci(c) {
    const svg = c.svg(1000, 562);
    const vadi = c.S('g', {}, svg), zirve = c.S('g', {}, svg);
    kutu(c, vadi, 130, 170, 220, 220, { rx: 8, dolgu: 'none', renk: RENK.cizgi });
    const zk = kutu(c, zirve, 450, 170, 220, 220, { rx: 8, dolgu: 'none', renk: RENK.cizgi });
    [160, 196, 232, 268, 304, 340].forEach((x) => [210, 258, 306, 354].forEach((y) => tanecik(c, vadi, x, y)));
    [520, 560, 600].forEach((x) => [250, 330].forEach((y) => tanecik(c, zirve, x, y)));
    yazi(c, vadi, 240, 430, 'vadide', { size: 26, kalin: 700 }); yazi(c, zirve, 560, 430, 'zirvede', { size: 26, kalin: 700 });
    const soluk = yazi(c, svg, 400, 130, 'bir soluk', { size: 26, kalin: 700, renk: RENK.basinc });
    const mer = c.S('g', {}, svg);
    c.S('path', { d: 'M700,440 L760,440 L760,380 L815,380 L815,320 L870,320 L870,260 L925,260 L925,200 L980,200 L980,440 Z', fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, mer);
    const ela = c.S('circle', { cx: 730, cy: 430, r: 10, fill: AYDINLIK }, svg);
    gizle(vadi, zirve, soluk, mer, ela);
    const POZ = [[730, 430], [787, 370], [842, 310], [897, 250], [952, 190]];

    await par(c.say('Dağcılar yükseldikçe daha zor nefes alır.'), belir(c, vadi, 500));
    await par(c.say('Yüksekte havanın yoğunluğu azdır.'), belir(c, zirve, 500));
    await par(c.say('Aynı hacimdeki bir soluğa daha az hava girer.'), belir(c, soluk, 400));
    await par(c.say('Dağcılar, vücutları alışsın diye yavaş yavaş tırmanır.'), (async () => {
      await belir(c, [mer, ela], 400);
      for (let i = 0; i < 4; i++) {
        const [x0, y0] = POZ[i], [x1, y1] = POZ[i + 1];
        await c.tween(500, (e) => { ela.setAttribute('cx', lerp(x0, x1, e)); ela.setAttribute('cy', lerp(y0, y1, e) - 28 * Math.sin(Math.PI * e)); }, ease.inOut);
        if (i < 3) await c.wait(400);
      }
    })());
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Ela kıyıdaki kentten yüksek bir kayak merkezine çıkıyor ve daha zor nefes alıyor. Neden?',
      options: ['Orada hava daha ağırdır', 'Açık hava basıncı artmıştır', 'Aynı hacimde daha az hava vardır'], answer: 2,
      hints: ['Yükseldikçe havanın yoğunluğu nasıl değişir?', 'Bir soluk, hep aynı hacimdir.', ''],
      right: 'Evet. Zirvedeki soluğa daha az hava girer.',
    });
    c.clearSay();
    zk.setAttribute('stroke', RENK.iyi);
    await c.say('Zirvedeki bir soluğa, vadidekinden daha az hava girer.');
  }

  /* ---- 8. Magdeburg yarım küreleri ---- */
  async function magdeburg(c) {
    const svg = c.svg(1000, 562);
    const kure = c.S('g', {}, svg);
    const yarim = (d, dx) => { const g = c.S('g', {}, kure); c.S('path', { d, fill: '#8f9bc4', 'fill-opacity': 0.35, stroke: '#c3cbea', 'stroke-width': 5, 'stroke-linejoin': 'round' }, g); g.setAttribute('transform', `translate(${dx},0)`); return g; };
    const sol = yarim('M500,180 A100,100 0 0 0 500,380 Z', -60), sag = yarim('M500,180 A100,100 0 0 1 500,380 Z', 60);
    const ic = c.S('g', {}, svg), dis = c.S('g', {}, svg);
    [440, 480, 520, 560].forEach((x) => [235, 280, 325].forEach((y) => tanecik(c, ic, x, y)));
    [270, 90, 45, 135, 225, 315].forEach((d) => {
      const a = (d * Math.PI) / 180, u = [Math.cos(a), Math.sin(a)];
      ok(c, dis, [500 + 158 * u[0], 280 + 158 * u[1]], [500 + 108 * u[0], 280 + 108 * u[1]], RENK.basinc, 4);
      ok(c, ic, [500 + 42 * u[0], 280 + 42 * u[1]], [500 + 92 * u[0], 280 + 92 * u[1]], RENK.basinc, 4);
    });
    const kuv = c.S('g', {}, svg);
    ok(c, kuv, [398, 280], [298, 280], RENK.kuvvet, 6); ok(c, kuv, [602, 280], [702, 280], RENK.kuvvet, 6);
    yazi(c, kuv, 270, 250, 'kuvvet', { size: 24, kalin: 700, renk: RENK.kuvvet }); yazi(c, kuv, 730, 250, 'kuvvet', { size: 24, kalin: 700, renk: RENK.kuvvet });
    gizle(kure, ic, dis, kuv);

    await par(c.say('Otto von Guericke iki metal yarım küreyi birleştirdi.'), (async () => {
      await belir(c, kure, 300);
      await c.tween(600, (e) => { sol.setAttribute('transform', `translate(${lerp(-60, 0, e)},0)`); sag.setAttribute('transform', `translate(${lerp(60, 0, e)},0)`); }, ease.inOut);
      await belir(c, ic, 400); await belir(c, dis, 400, 0.6);
    })());
    await par(c.say('Pompayla kürelerin içindeki havayı boşalttı.'), belir(c, ic, 500, 0));
    await par(c.say('Yarım küreleri zıt yönlere çeken atlar onları ayıramadı.'), (async () => {
      await belir(c, kuv, 400);
      for (let i = 0; i < 3; i++) await c.tween(100, (e) => kure.setAttribute('transform', `translate(${4 * Math.sin(2 * Math.PI * e)},0)`), ease.linear);
    })());
    await par(c.say('İçeride hava kalmayınca dışarıdaki açık hava basıncı küreleri bir arada tuttu.'), belir(c, dis, 300, 1));
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Pompayla havayı boşaltmasaydı atlar çekince küreler ne olurdu?',
      options: ['Yine ayrılmazdı', 'Kendiliğinden birbirini iterdi', 'Kolayca ayrılırdı; içerideki hava dışarıdakini dengelerdi'], answer: 2,
      hints: ['İçeride hava kalmayınca dışarıdaki basınç tutuyordu.', 'İçeride hava varsa içeriden de itiliyor.', ''],
      right: 'Evet. İçerideki itme dışarıdakini dengeler.',
    });
    c.clearSay();
    await par(c.say('İçeride hava olsaydı, içerideki itme dışarıdakini dengelerdi.'), belir(c, kuv, 400, 0), belir(c, ic, 500, 1));
  }

  /* ---- 9. Pipetle içmek ---- */
  async function pipet(c) {
    const svg = c.svg(1000, 562);
    const tum = c.S('g', {}, svg);
    c.S('rect', { x: 342, y: 300, width: 216, height: 170, fill: RENK.sivi, 'fill-opacity': 0.55 }, tum);
    c.S('path', { d: 'M340,260 L340,470 L560,470 L560,260', fill: 'none', stroke: '#8f9bc4', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, tum);
    const sivi = c.S('rect', { x: 441.5, y: 300, width: 19, height: 140, fill: RENK.sivi, 'fill-opacity': 0.55 }, tum);
    c.S('rect', { x: 440, y: 110, width: 22, height: 330, fill: 'none', stroke: HAVA.cizgi, 'stroke-width': 3 }, tum);
    c.S('rect', { x: 421, y: 80, width: 60, height: 30, rx: 8, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, tum);
    const tn = [];
    [150, 200, 250].forEach((y) => [445, 457].forEach((x) => tn.push({ el: tanecik(c, tum, x, y), x, y })));
    const oklar = c.S('g', {}, tum);
    ok(c, oklar, [370, 250], [370, 298], RENK.basinc, 4); ok(c, oklar, [530, 250], [530, 298], RENK.basinc, 4);
    yazi(c, oklar, 580, 258, 'açık hava basıncı', { hiza: 'start', size: 26, kalin: 700, renk: RENK.basinc });
    const az = yazi(c, tum, 480, 168, 'az hava', { hiza: 'start', size: 24, kalin: 700 });
    gizle(tum, az); oklar.style.opacity = 0.6;
    await belir(c, tum, 450);

    // Ağız pipetin içindeki havayı azaltır: üstteki dört tanecik ağızdan çıkar.
    await par(c.say('Pipetle içerken ağzın pipetin içindeki havayı azaltır.'), (async () => {
      await c.tween(500, (e) => tn.slice(0, 4).forEach((q) => { q.el.setAttribute('cy', lerp(q.y, 95, e)); q.el.style.opacity = 1 - e; }), ease.in);
      await belir(c, az, 400);
    })());
    await c.say('Pipetin içindeki basınç, dışarıdaki açık hava basıncından küçük olur.');
    // Dışarıdaki açık hava basıncı içeceği pipette yukarı iter.
    await par(c.say('Açık hava basıncı, bardaktaki sıvıyı pipette yukarı iter.'), c.tween(1000, (e) => {
      const y = lerp(300, 170, e); sivi.setAttribute('y', y); sivi.setAttribute('height', 440 - y);
      tn.slice(4).forEach((q) => q.el.setAttribute('cy', lerp(q.y, 140, e)));
      oklar.style.opacity = lerp(0.6, 1, e);
    }, ease.inOut));
    await c.say('Torricelli’de de açık hava basıncı cıvayı boruda yukarıda tutuyordu.', { speak: '[curious] Torricelli’de de açık hava basıncı cıvayı boruda yukarıda tutuyordu.' });
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Pipetle içecek içilirken içecek pipette neden yükselir?',
      options: ['Ağız içeceği çeker; açık hava bir şey yapmaz', 'İçecek pipetin içinde kendiliğinden yükselir', 'Pipetin içindeki basınç azalır; dışarıdaki açık hava basıncı içeceği yukarı iter'], answer: 2,
      hints: ['Pipetin içindeki basınç ile dışarıdaki basıncı karşılaştır.', 'İçeceğin yüzeyine kim bastırıyor?', ''],
      right: 'Evet. Dışarıdaki basınç büyük kalıyor.',
    });
    c.clearSay();
    await c.say('Dışarıdaki basınç büyük kaldığı için içecek pipete itilir.');
  }

  Ders.start({
    id: 'akiskanlar-c3', kicker: 'Konu C · Açık hava basıncı', title: 'Atmosfer basıncı her yerde aynı değil', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Atmosfer basıncı her yerde aynı değil',
      hook: 'Hava durumu haritasındaki “alçak basınç” yazısı yarın rüzgâr çıkacağını nasıl haber verir?',
      button: 'Derse başla ›',
    },
    goals: [
      'Isınan ve soğuyan havanın yoğunluğunun nasıl değiştiğini söyler.',
      'Alçak ve yüksek basınç alanlarını ve rüzgârın oluşumunu açıklar.',
      'Balon, dağcı, yarım küreler ve pipet örneklerini açık hava basıncıyla açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Torricelli’yi ve yükseklikle değişen hava yoğunluğunu hatırla.', run: hatirla },
      { title: 'Isınan hava genleşir', goal: 'Havanın ısınınca ve soğuyunca yoğunluğunun nasıl değiştiğini gör.', run: isinanHava },
      { title: 'Alçak ve yüksek basınç alanları', goal: 'Isınan ve soğuyan havanın yeryüzünde nasıl basınç alanları oluşturduğunu bul.', run: alanlar },
      { title: 'Rüzgâr', goal: 'Havanın hangi yöne aktığını ve rüzgârın nasıl oluştuğunu bul.', run: ruzgar },
      { title: 'Rüzgâr enerjisi', goal: 'Rüzgârın elektriğe nasıl dönüştüğünü gör.', run: ruzgarEnerjisi },
      { title: 'Alçak mı, yüksek mi?', goal: 'Önermeleri alçak ya da yüksek basınç alanıyla eşleştir.', run: alcakMiYuksekMi },
      { title: 'Yükselen balon', goal: 'Yükselen balonun neden şiştiğini açıkla.', run: yukselenBalon },
      { title: 'Dağcının nefesi', goal: 'Yüksekte neden zor nefes alındığını açıkla.', run: dagci },
      { title: 'Magdeburg yarım küreleri', goal: 'Yarım kürelerin neden ayrılamadığını açıkla.', run: magdeburg },
      { title: 'Pipetle içmek', goal: 'İçeceğin pipette neden yükseldiğini açıkla.', run: pipet },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela “Rüzgâr, alçak basınç alanından yüksek basınç alanına doğru eser” diyor. Doğru mu?',
        options: ['Doğru; hava basıncı küçük yerden büyük yere gider', 'Yanlış; hava yüksek basınçtan alçak basınca doğru hareket eder', 'Doğru; yön yalnızca Dünya’nın dönüşüne bağlıdır'], answer: 1,
        why: ['Hava, basıncı büyük yerden küçük yere doğru hareket eder.', 'Rüzgâr, yüksek basınç alanından alçak basınç alanına doğru eser.', 'Dünya’nın dönüşü yönü yalnızca saptırır; rüzgârı basınç farkı oluşturur.'], scene: 3 },
      { q: 'Bir bölgede hava soğuyor. Orada hava ve yeryüzündeki basınç için ne olur?',
        options: ['Hava genleşip yükselir; alçak basınç alanı oluşur', 'Hava yükselir; yüksek basınç alanı oluşur', 'Hava yoğunlaşıp alçalır; yüksek basınç alanı oluşur'], answer: 2,
        why: ['Genleşip yükselen, ısınan havadır; soğuyan hava yoğunlaşır.', 'Yükselen hava yüksek değil, alçak basınç alanı oluşturur.', 'Soğuyan hava yoğunlaşıp alçalır ve yeryüzünde yüksek basınç alanı oluşturur.'], scene: 2 },
      { q: 'A kentinde alçak basınç, B kentinde yüksek basınç var. Rüzgâr nasıl eser?',
        options: ['B’den A’ya doğru', 'A’dan B’ye doğru', 'Rüzgâr esmez'], answer: 0,
        why: ['Hava yüksek basınçtan alçak basınca, yani B’den A’ya akar.', 'Hava alçak basınç alanından yüksek basınç alanına akmaz.', 'İki yer arasında basınç farkı varsa hava hareket eder ve rüzgâr eser.'], scene: 3 },
      { q: 'Yeryüzünde şişirilip ağzı bağlanan bir balon yüksek bir dağın zirvesine çıkarılıyor. Balon için ne olur?',
        options: ['Dışarıdaki basınç arttığı için büzülür', 'Değişmez', 'Dışarıdaki basınç azaldığı için şişer'], answer: 2,
        why: ['Yükseldikçe dışarıdaki açık hava basıncı artmaz, azalır.', 'Dışarıdaki basınç değiştiği için içeri ve dışarı itme eşit kalmaz.', 'Dışarıdaki basınç azalır; içerideki basınç büyük kalınca balon şişer.'], scene: 6 },
      { q: 'Pipetin üstünde küçük bir delik var. Ela emiyor ama içecek pipette yükselmiyor. Neden?',
        options: ['Delik içeceği ağırlaştırır', 'Delikten giren hava, pipetin içindeki basıncı dışarıdakine eşit tutar', 'Açık hava basıncı delikte sıfır olur'], answer: 1,
        why: ['Delik içeceğin ağırlığını değiştirmez.', 'İçerideki basınç dışarıdakine eşit kalınca içeceği yukarı iten bir fark olmaz.', 'Açık hava basıncı hiçbir yerde sıfır olmaz.'], scene: 9 },
    ],
    summary: [
      'Isınan hava yükselir ve alçak basınç oluşturur.',
      'Soğuyan hava alçalır ve yüksek basınç oluşturur.',
      'Rüzgâr, bu iki alan arasındaki hava hareketidir; türbinler onunla elektrik üretir.',
      '<b>Hava, basıncın yüksek olduğu yerden alçak olduğu yere akar.</b>',
    ],
    nextLesson: { href: 'c4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
