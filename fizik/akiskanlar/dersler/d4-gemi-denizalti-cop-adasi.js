/* D4 — Gemi, denizaltı, çöp adası
   Arşimet İlkesi gemilerin, denizaltıların ve yüzen plastik atıkların davranışını açıklar.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md (D4). Düz vektör çizim; sıra plan/KURALLAR.md 3.2'ye göredir.
   Bu dosyada yazılan çizimler: kOk (kısa oklarda başı küçülen ok), metin (çok satırlı yazı), gemiSil, denizaltiSil, pano (kart-kutu sahnesi). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, sinifla, rastgele } = window.KIT;
  const { kap } = window.KIT_D;
  const { lerp, ease } = Ders;
  const ZEMIN = '#10162b', GRI = '#b7bfd6', KENAR = '#e4e9fb', GOVDE = '#8f9bc4', GOVDE_KENAR = '#c3cbea';
  const HAVA = '#8fa3c7', HAVA_YAZI = '#aebde0', KAP = '#c3cbea';
  const dc = 'd<sub>c</sub>', ds = 'd<sub>s</sub>', fk = 'F<sub>k</sub>';

  /* Dikey kuvvet oku: kök (x, y0), boy birim cinsinden. Başı boya göre küçülür (kısa oklar gövdeyi yutmaz). ayarla(boy, ms) boyu değiştirir. */
  function kOk(c, p, x, y0, boy, renk, yukari, w = 6) {
    const g = c.S('g', {}, p), s = yukari ? -1 : 1;
    const hat = cizgi(c, g, [x, y0], [x, y0], renk, w), uc = c.S('path', { fill: renk }, g);
    let L = boy;
    const ciz = (v) => {
      if (v < 3) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const b = Math.min(17, v * 0.5), yt = y0 + s * v, yb = yt - s * b;
      hat.setAttribute('y2', y0 + s * (v - b * 0.6));
      uc.setAttribute('d', `M${x},${yt} L${x - b * 0.52},${yb} L${x + b * 0.52},${yb} Z`);
    };
    ciz(L);
    return {
      g,
      ayarla(v2, ms = 0, eg = ease.out) {
        const v1 = L; L = v2;
        if (!ms) { ciz(v2); return Promise.resolve(); }
        return c.tween(ms, (e) => ciz(lerp(v1, v2, e)), eg);
      },
    };
  }
  /* Çok satırlı yazı: satırlar ortalanmış, ilk satırın taban çizgisi y. */
  function metin(c, p, x, y, satirlar, o = {}) {
    const g = c.S('g', {}, p), dy = o.dy || (o.size || 26) + 8;
    satirlar.forEach((s, i) => yazi(c, g, x, y + i * dy, s, o));
    return g;
  }
  /* Gemi siluet çizgisi: x sol, yl su çizgisi (gövdenin alt kenarı), w genişlik. */
  function gemiSil(c, p, x, yl, w, tur) {
    const g = c.S('g', {}, p), f = { fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2, 'stroke-linejoin': 'round' };
    c.S('path', Object.assign({ d: `M${x},${yl - 20} L${x + w},${yl - 20} L${x + w - 14},${yl} L${x + 12},${yl} Z` }, f), g);
    if (tur === 'anadolu') {
      c.S('rect', Object.assign({ x: x + 6, y: yl - 26, width: w - 12, height: 6, rx: 2 }, f), g);
      c.S('rect', Object.assign({ x: x + w * 0.66, y: yl - 48, width: w * 0.16, height: 22, rx: 2 }, f), g);
    } else if (tur === 'istanbul') {
      c.S('rect', Object.assign({ x: x + w * 0.3, y: yl - 38, width: w * 0.4, height: 18, rx: 2 }, f), g);
      c.S('rect', Object.assign({ x: x + w * 0.42, y: yl - 52, width: w * 0.16, height: 14, rx: 2 }, f), g);
      cizgi(c, g, [x + w * 0.5, yl - 52], [x + w * 0.5, yl - 70], GOVDE_KENAR, 2.5);
      c.S('rect', Object.assign({ x: x + w * 0.14, y: yl - 28, width: w * 0.12, height: 8, rx: 2 }, f), g);
    } else {
      c.S('rect', Object.assign({ x: x + w * 0.36, y: yl - 34, width: w * 0.3, height: 14, rx: 2 }, f), g);
      cizgi(c, g, [x + w * 0.5, yl - 34], [x + w * 0.5, yl - 50], GOVDE_KENAR, 2.5);
    }
    return g;
  }
  /* Denizaltı siluet çizgisi: su çizgisi yl'nin altında. */
  function denizaltiSil(c, p, x, yl, w) {
    const g = c.S('g', {}, p), f = { fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2, 'stroke-linejoin': 'round' };
    c.S('rect', Object.assign({ x: x + w * 0.38, y: yl + 6, width: w * 0.18, height: 12, rx: 3 }, f), g);
    c.S('rect', Object.assign({ x, y: yl + 14, width: w, height: 26, rx: 13 }, f), g);
    return g;
  }
  /* Kart-kutu panosu: kart tahtada belirir (goster); seçilince yerinde küçülüp söner, adı kutusunda belirir (yerlestir).
     o: { kutular: [{ ad: ['satır', …], x, y, w, h }], kart: { x, y, w, h, size }, baslik, adBas, adAralik } */
  function pano(c, p, o) {
    const sayac = o.kutular.map(() => 0), K = o.kart, size = K.size || 26;
    o.kutular.forEach((k) => {
      kutu(c, p, k.x, k.y, k.w, k.h, { rx: 10 });
      metin(c, p, k.x + k.w / 2, k.y + 34, [].concat(k.ad), { size: o.baslik || 26, kalin: 700, dy: 28 });
    });
    let kg = null;
    return {
      async goster(k) {
        kg = c.S('g', {}, p);
        kutu(c, kg, K.x, K.y, K.w, K.h, { rx: 12, renk: RENK.cizgi });
        const n = k.satirlar.length, dy = size + 8;
        metin(c, kg, K.x + K.w / 2, K.y + K.h / 2 - (n - 1) * dy / 2 + size * 0.35, k.satirlar, { size, kalin: 600, dy });
        gizle(kg); await belir(c, kg, 350);
      },
      async yerlestir(k) {
        const cx = K.x + K.w / 2, cy = K.y + K.h / 2, el = kg;
        await c.tween(400, (e) => {
          el.setAttribute('transform', `translate(${cx},${cy}) scale(${lerp(1, 0.6, e)}) translate(${-cx},${-cy})`);
          el.style.opacity = 1 - e;
        }, ease.in);
        el.remove();
        const b = o.kutular[k.kutu];
        const ad = yazi(c, p, b.x + b.w / 2, b.y + o.adBas + sayac[k.kutu] * o.adAralik, k.kisa, { size: 22, kalin: 600 });
        sayac[k.kutu]++;
        gizle(ad); await belir(c, ad, 300);
      },
    };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Birinci soru: sıvıdaki silindir; F₁ ve F₂ okları cevaptan sonra gelir.
    const s1 = c.S('g', {}, svg);
    kap(c, s1, { x1: 320, x2: 680, ust: 100, yuzey: 140, taban: 500 });
    c.S('rect', { x: 450, y: 260, width: 100, height: 120, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, s1);
    const ok1 = c.S('g', {}, s1);
    kOk(c, ok1, 500, 215, 45, RENK.kuvvet, false);
    kOk(c, ok1, 500, 465, 85, RENK.kuvvet, true);
    yazi(c, ok1, 522, 250, 'F₁', { hiza: 'start', size: 26, renk: RENK.kuvvet });
    yazi(c, ok1, 522, 440, 'F₂', { hiza: 'start', size: 26, renk: RENK.kuvvet });
    gizle(s1, ok1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 450));
    const h1 = fk + ' = F₂ − F₁: alt yüzeye üsttekinden büyük kuvvet etki eder.';
    await c.choice({
      tag: 'Hatırla', q: 'Sıvıdaki bir cisme etki eden kaldırma kuvveti nereden doğar?',
      options: ['Yan yüzeylere etki eden kuvvetlerden', 'Alt ve üst yüzeylere etki eden kuvvetlerin farkından', 'Cismin kendi ağırlığından'], answer: 1,
      hints: [h1, '', h1], right: 'Evet. Kaldırma kuvveti, alt ve üst yüzeylere etki eden kuvvetlerin farkıdır.',
    });
    c.clearSay();
    await par(c.say('Alt yüzeye etki eden kuvvet, üsttekinden büyüktür.'), belir(c, ok1, 450));
    c.clearSay();
    await belir(c, s1, 400, 0); s1.remove();

    // İkinci soru: taşırma kabı ve taşan su; oklar cevaptan sonra gelir.
    const s2 = c.S('g', {}, svg);
    kap(c, s2, { x1: 280, x2: 560, ust: 120, yuzey: 160, taban: 460 });
    c.S('path', { d: 'M560,158 L612,158 L626,184', fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, s2);
    c.S('path', { d: 'M612,166 Q644,190 650,330', fill: 'none', stroke: RENK.sivi, 'stroke-width': 4, 'stroke-opacity': 0.7, 'stroke-linecap': 'round' }, s2);
    c.S('rect', { x: 611, y: 390, width: 98, height: 40, fill: RENK.sivi, 'fill-opacity': 0.35 }, s2);
    c.S('path', { d: 'M610,330 L610,430 L710,430 L710,330', fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, s2);
    cizgi(c, s2, [420, 100], [420, 230], KAP, 2.5);
    c.S('rect', { x: 385, y: 230, width: 70, height: 70, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, s2);
    const ok2 = c.S('g', {}, s2);
    kOk(c, ok2, 420, 265, 60, RENK.kaldirma, true);
    yazi(c, ok2, 440, 222, 'F_{k}', { hiza: 'start', size: 24, kalin: 700, renk: RENK.kaldirma, math: true });
    kOk(c, ok2, 745, 350, 60, RENK.kuvvet, false);
    gizle(s2, ok2);
    await belir(c, s2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Arşimet İlkesi’ne göre kaldırma kuvveti neye eşittir?',
      options: ['Cismin hacmine', 'Cismin ağırlığına', 'Yeri değişen sıvının ağırlığına'], answer: 2,
      hints: ['Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir.', 'Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir.', ''],
      right: 'Evet. Kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.',
    });
    c.clearSay();
    await par(c.say('Kaldırma kuvveti, taşan suyun ağırlığına eşittir.'), belir(c, ok2, 450));
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();

    // Kapanış: bugünün üç örneği.
    const s3 = c.S('g', {}, svg);
    c.S('rect', { x: 60, y: 250, width: 880, height: 270, fill: RENK.sivi, 'fill-opacity': 0.3 }, s3);
    cizgi(c, s3, [60, 250], [940, 250], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    gemiSil(c, s3, 110, 250, 180, 'anadolu');
    denizaltiSil(c, s3, 410, 300, 180);
    const rnd = rastgele(5);
    for (let i = 0; i < 8; i++) {
      const w = 24 + Math.round(rnd() * 14), x = 690 + i * 28 + Math.round(rnd() * 8);
      c.S('rect', { x, y: 238, width: w, height: 11, rx: 3, fill: i % 2 ? '#9fa9c9' : GRI, stroke: KENAR, 'stroke-width': 1.5 }, s3);
    }
    yazi(c, s3, 200, 430, 'gemi', { size: 26, kalin: 700 });
    yazi(c, s3, 500, 430, 'denizaltı', { size: 26, kalin: 700 });
    yazi(c, s3, 790, 430, 'çöp adası', { size: 26, kalin: 700 });
    gizle(s3);
    await par(c.say('Bugün bu ilkenin gemilerde, denizaltılarda ve çöp adalarında nasıl çalıştığına bakacağız.'), belir(c, s3, 450));
  }

  /* ---- 2. Çelik bilye ve gemi ---- */
  async function bilyeGemi(c) {
    const svg = c.svg(1000, 562);
    const a = c.S('g', {}, svg);
    const kS = kap(c, a, { x1: 60, x2: 460, ust: 150, yuzey: 200, taban: 500 });
    const kG = kap(c, a, { x1: 540, x2: 940, ust: 150, yuzey: 200, taban: 500 });
    const bilye = c.S('circle', { cx: 260, cy: 130, r: 30, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, a);
    const gm = c.S('g', {}, a);
    c.S('path', { d: 'M620,160 L860,160 L830,230 L650,230 Z', fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round' }, gm);
    c.S('path', { d: 'M637.1,200 L842.9,200 L830,230 L650,230 Z', fill: RENK.sivi, 'fill-opacity': 0.35 }, gm);
    const hava = c.S('rect', { x: 650, y: 170, width: 180, height: 45, rx: 6, fill: HAVA, 'fill-opacity': 0.55 }, gm);
    const cevre = c.S('rect', { x: 606, y: 148, width: 268, height: 90, rx: 10, fill: 'none', stroke: KENAR, 'stroke-width': 2.5, 'stroke-dasharray': '9 6' }, gm);
    const havaYazi = yazi(c, a, 740, 126, 'hava', { size: 22, renk: HAVA_YAZI });
    const havaCizgi = cizgi(c, a, [740, 133], [740, 168], HAVA_YAZI, 2.5);
    const bilyeYazi = yazi(c, a, 260, 540, 'bilye', { size: 22 }), gemiYazi = yazi(c, a, 740, 540, 'gemi', { size: 22 });
    gizle(kS.g, kG.g, bilye, gm, hava, cevre, havaYazi, havaCizgi, bilyeYazi, gemiYazi);
    gm.setAttribute('transform', 'translate(0,-70)');

    // (b) tahtası: aynı çelik, önce blok, sonra geniş içi boş kap.
    const b = c.S('g', {}, svg);
    const suB = c.S('g', {}, b);
    c.S('rect', { x: 330, y: 340, width: 340, height: 80, fill: RENK.sivi, 'fill-opacity': 0.35 }, suB);
    cizgi(c, suB, [330, 340], [670, 340], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    cizgi(c, suB, [326, 420], [674, 420], KAP, 4);
    const formul = yazi(c, b, 500, 80, 'ortalama yoğunluk = kütle / hacim', { size: 28, kalin: 700 });
    const kapG = c.S('g', {}, b);
    const blok = c.S('rect', { x: 220, y: 300, width: 60, height: 60, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, kapG);
    const bosluk = c.S('rect', { x: 416, y: 320, width: 168, height: 24, fill: ZEMIN }, kapG);
    const suIc = c.S('rect', { x: 416, y: 320, width: 168, height: 24, fill: RENK.sivi, 'fill-opacity': 0.35 }, kapG);
    const dis = c.S('rect', { x: 400, y: 290, width: 200, height: 70, rx: 6, fill: 'none', stroke: KENAR, 'stroke-width': 2.5, 'stroke-dasharray': '9 6' }, kapG);
    const l1 = yazi(c, b, 500, 470, 'kütle aynı', { size: 22 });
    const l2 = yazi(c, b, 500, 504, 'hacim artar', { size: 22 });
    const l3 = yazi(c, b, 500, 538, 'ortalama yoğunluk azalır', { size: 22, kalin: 700 });
    gizle(suB, formul, blok, bosluk, suIc, dis, l1, l2, l3);

    // Anlat: bilye, gemi, hava.
    await par(c.say('İçi dolu çelik bir bilye suya bırakılınca dibe batar.'), (async () => {
      await belir(c, [kS.g, bilye, bilyeYazi], 500);
      await c.tween(900, (e) => bilye.setAttribute('cy', lerp(130, 470, e)), ease.in);
    })());
    await par(c.say('Çelikten yapılmış devasa gemiler ise yüklerle birlikte yüzer.', { speak: '[curious] Çelikten yapılmış devasa gemiler ise yüklerle birlikte yüzer.' }), (async () => {
      await par(belir(c, [kG.g, gemiYazi], 500), belir(c, gm, 400));
      await c.tween(700, (e) => gm.setAttribute('transform', `translate(0,${lerp(-70, 0, e)})`), ease.out);
    })());
    await par(c.say('Çelik bir gemi çoğunlukla havayla doludur.'), belir(c, [hava, havaYazi, havaCizgi], 400));
    await par(c.say('Gemi ve içindeki hava birlikte tek bir cisim sayılır.'), belir(c, cevre, 500));

    // Ortalama yoğunluk: formül ve çelik blok.
    await belir(c, a, 300, 0); a.remove();
    await par(c.say('Ortalama yoğunluk, toplam kütlenin toplam hacme bölümüdür.'), belir(c, [formul, blok], 450));
    await par(c.say('Aynı çelik geniş ve içi boş yapılırsa kütle aynı kalır.'), (async () => {
      await c.tween(900, (e) => {
        blok.setAttribute('x', lerp(220, 400, e)); blok.setAttribute('y', lerp(300, 320, e));
        blok.setAttribute('width', lerp(60, 200, e)); blok.setAttribute('height', lerp(60, 40, e));
        bosluk.style.opacity = Math.max(0, (e - 0.5) * 2);
      }, ease.inOut);
      await belir(c, dis, 600);
      await belir(c, l1, 400);
    })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bir geminin kütlesi aynı kalırken hacmi iki katına çıkıyor. Ortalama yoğunluğu nasıl değişir?',
      options: ['İki katına çıkar', 'Yarıya iner', 'Değişmez'], answer: 1,
      hints: ['Yoğunluk, kütlenin hacme bölümüdür.', '', 'Kütle aynı, hacim iki katı: bölüm yarıya iner.'],
      right: 'Evet. Kütle aynı, hacim iki katı: yoğunluk yarıya iner.',
    });
    c.clearSay();
    await par(c.say('Hacim artar; ortalama yoğunluk azalır.'), belir(c, [l2, l3], 400));
    await par(c.say('Ortalama yoğunluk suyunkinden küçükse gemi yüzer.'), belir(c, suB, 500));
    await par(c.say('Gemi su alırsa havanın yerine su girer; yoğunluk artar, gemi batar.'), (async () => {
      await belir(c, [l1, l2, l3], 300, 0); [l1, l2, l3].forEach((t) => t.remove());
      const l4 = yazi(c, b, 500, 484, 'ortalama yoğunluk artar', { size: 22, kalin: 700 });
      const l5 = yazi(c, b, 500, 522, 'gemi batar', { size: 22 });
      gizle(l4, l5);
      await par(belir(c, suIc, 500), c.tween(1000, (e) => kapG.setAttribute('transform', `translate(0,${lerp(0, 60, e)})`), ease.inOut), belir(c, [l4, l5], 500));
    })());
  }

  /* ---- 3. Yüzme, askıda kalma, batma ---- */
  async function yuzme(c) {
    const svg = c.svg(1000, 562);
    const ana = c.S('g', {}, svg);
    const X = [[40, 320], [360, 640], [680, 960]], CX = [180, 500, 820];
    const kaplar = X.map(([x1, x2]) => kap(c, ana, { x1, x2, ust: 140, yuzey: 190, taban: 440 }));
    const TOP = [155, 265, 370], DY0 = [-35, -145, -250], KOK = [190, 300, 375];
    const cisimler = CX.map((cx, i) => c.S('rect', { x: cx - 35, y: TOP[i], width: 70, height: 70, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, ana));
    const agirlik = CX.map((cx, i) => kOk(c, ana, cx + 20, KOK[i], 80, RENK.kuvvet, false));
    const kaldirma = CX.map((cx, i) => kOk(c, ana, cx - 20, KOK[i], i === 2 ? 50 : 80, RENK.kaldirma, true));
    const ad = CX.map((cx, i) => yazi(c, svg, cx, 480, ['yüzer', 'askıda kalır', 'batar'][i], { size: 22, kalin: 700 }));
    const sim = CX.map((cx, i) => yazi(c, svg, cx, 510, ['d_{c} < d_{s}', 'd_{c} = d_{s}', 'd_{c} > d_{s}'][i], { size: 22, math: true }));
    const kuv = CX.map((cx, i) => yazi(c, svg, cx, 540, ['F_{k} = G', 'F_{k} = G', 'F_{k} < G'][i], { size: 22, math: true }));
    const g1 = yazi(c, svg, 214, 255, 'G', { hiza: 'start', size: 24, kalin: 700, renk: RENK.kuvvet });
    const f1 = yazi(c, svg, 145, 135, 'F_{k}', { hiza: 'end', size: 24, kalin: 700, renk: RENK.kaldirma, math: true });
    gizle(kaplar.map((k) => k.g), cisimler, agirlik.map((o) => o.g), kaldirma.map((o) => o.g), ad, sim, kuv, g1, f1);
    cisimler.forEach((r, i) => r.setAttribute('transform', `translate(0,${DY0[i]})`));
    const iner = (i) => c.tween(700, (e) => cisimler[i].setAttribute('transform', `translate(0,${lerp(DY0[i], 0, e)})`), ease.inOut);
    const cisimAnlat = async (i, cumle, o) => {
      await par(c.say(cumle, o), (async () => { await iner(i); await belir(c, [ad[i], sim[i]], 300); })());
    };
    const okAnlat = async (i, cumle, ekler) => {
      await par(c.say(cumle), belir(c, [agirlik[i].g, kaldirma[i].g, kuv[i], ...ekler], 400));
    };

    await par(c.say('Sıvıya tamamen batırılıp bırakılan cisim üç şeyden birini yapar.'), belir(c, kaplar.map((k) => k.g), 500));
    await par(c.say(`Cismin yoğunluğuna ${dc}, sıvının yoğunluğuna ${ds} diyelim.`, { speak: 'Cismin yoğunluğuna d c, sıvının yoğunluğuna d s diyelim.' }), belir(c, cisimler, 500));
    await cisimAnlat(0, 'Yoğunluğu sıvınınkinden küçük cisim yüzeye çıkar ve yüzer.');
    await okAnlat(0, 'Yüzen cisimde kaldırma kuvveti ile ağırlık eşittir.', [g1, f1]);
    await cisimAnlat(1, 'Yoğunluğu sıvınınkine eşit cisim, bırakıldığı yerde askıda kalır.');
    await okAnlat(1, 'Askıda kalan cisimde de kaldırma kuvveti ağırlığa eşittir.', []);
    await cisimAnlat(2, 'Yoğunluğu sıvınınkinden büyük cisim kap tabanına batar.');
    await okAnlat(2, 'Batan cisimde kaldırma kuvveti ağırlıktan küçüktür.', []);

    const dcO = c.M.m(dc), dsO = c.M.m(ds);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir cisim sıvıya bırakılınca kap tabanına batıyor. Kaldırma kuvveti ve yoğunluk için ne söylenebilir?',
      options: [`Kaldırma kuvveti ağırlığa eşittir; ${dcO} = ${dsO}`, `Kaldırma kuvveti ağırlıktan küçüktür; ${dcO} > ${dsO}`, `Kaldırma kuvveti ağırlıktan büyüktür; ${dcO} < ${dsO}`], answer: 1,
      hints: ['Tabana batan cismin yoğunluğu sıvınınkinden büyüktür.', '', 'Batan cisimde kaldırma kuvveti ağırlığı dengeleyemez.'],
      right: 'Evet. Batan cisimde kaldırma kuvveti ağırlıktan küçüktür.',
    });

    // Gör: kaplar küçülüp sola kayar; yüzen cismin yerini değiştirdiği sıvı ağırlığı kadardır.
    c.clearSay();
    const yazilar = [...ad, ...sim, ...kuv, g1, f1];
    await belir(c, yazilar, 300, 0); yazilar.forEach((t) => t.remove());
    await c.tween(500, (e) => ana.setAttribute('transform', `translate(0,${lerp(0, 150, e)}) translate(40,140) scale(${lerp(1, 0.5, e)}) translate(-40,-140)`), ease.inOut);
    const sag = c.S('g', {}, svg);
    kap(c, sag, { x1: 560, x2: 920, ust: 200, yuzey: 250, taban: 500 });
    c.S('rect', { x: 600, y: 215, width: 70, height: 70, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, sag);
    c.S('rect', { x: 600, y: 250, width: 70, height: 35, fill: RENK.sivi, 'fill-opacity': 0.35 }, sag);
    kOk(c, sag, 655, 250, 80, RENK.kuvvet, false);
    kOk(c, sag, 615, 250, 80, RENK.kaldirma, true);
    yazi(c, sag, 671, 320, 'G', { hiza: 'start', size: 24, kalin: 700, renk: RENK.kuvvet });
    yazi(c, sag, 600, 185, 'F_{k}', { hiza: 'end', size: 24, kalin: 700, renk: RENK.kaldirma, math: true });
    const yer = c.S('g', {}, svg);
    c.S('rect', { x: 720, y: 250, width: 70, height: 35, fill: RENK.sivi, 'fill-opacity': 0.5, stroke: RENK.sivi, 'stroke-width': 2.5, 'stroke-dasharray': '7 5' }, yer);
    kOk(c, yer, 840, 250, 80, RENK.kuvvet, false);
    yazi(c, yer, 858, 300, '= G', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet });
    yazi(c, yer, 755, 370, 'yeri değişen sıvı', { size: 22 });
    gizle(sag, yer);
    await par(c.say('Yüzen cismin kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.'), (async () => { await belir(c, sag, 500); await belir(c, yer, 500); })());
    await c.say('Demek ki yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.', { speak: '[short pause] Demek ki yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.' });
  }

  /* ---- 4. Yüklü ve boş gemi ---- */
  async function yukluBos(c) {
    const svg = c.svg(1000, 562);
    const CX = [170, 500, 830], T0 = 220, TS = [220, 240, 260], L = [40, 70, 100];
    const konteyner = (g, x, y) => c.S('rect', { x, y, width: 30, height: 20, rx: 2, fill: '#5b678f', stroke: KENAR, 'stroke-width': 2 }, g);
    const gem = CX.map((cx, i) => {
      const g = c.S('g', {}, svg);
      c.S('path', { d: `M${cx - 100},${T0} L${cx + 100},${T0} L${cx + 80},${T0 + 100} L${cx - 80},${T0 + 100} Z`, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      const alt = i > 0 ? [konteyner(g, cx - 30, T0 - 20), konteyner(g, cx, T0 - 20)] : [];
      const ust = i > 0 ? [konteyner(g, cx - 30, T0 - 40), konteyner(g, cx, T0 - 40)] : [];
      return { g, alt, ust };
    });
    const bat = CX.map(() => c.S('path', { fill: RENK.sivi, 'fill-opacity': 0.55 }, svg));
    const batikYolu = (cx, T) => { const B = T + 100, h = 100 - 0.2 * (300 - T); return `M${cx - h},300 L${cx + h},300 L${cx + 80},${B} L${cx - 80},${B} Z`; };
    const yerles = (i, T) => { gem[i].g.setAttribute('transform', `translate(0,${T - T0})`); bat[i].setAttribute('d', batikYolu(CX[i], T)); };
    CX.forEach((_, i) => yerles(i, 220));
    c.S('rect', { x: 20, y: 300, width: 960, height: 220, fill: RENK.sivi, 'fill-opacity': 0.35 }, svg);
    cizgi(c, svg, [20, 300], [980, 300], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    const sayilar = CX.map((cx, i) => yazi(c, svg, cx, 545, String(i + 1), { size: 28, kalin: 700 }));
    const kaldirma = CX.map((cx, i) => kOk(c, svg, cx - 60, 300, L[i], RENK.kaldirma, true));
    const agirlik = CX.map((cx, i) => kOk(c, svg, cx + 60, 300, L[i], RENK.kuvvet, false));
    const yKal = yazi(c, svg, 960, 70, 'kaldırma kuvveti', { hiza: 'end', size: 24, kalin: 600, renk: RENK.kaldirma });
    const yAgi = yazi(c, svg, 960, 104, 'ağırlık', { hiza: 'end', size: 24, kalin: 600, renk: RENK.kuvvet });
    gizle(gem.map((x) => x.g), gem[1].alt, gem[1].ust, gem[2].alt, gem[2].ust, bat, sayilar, kaldirma.map((o) => o.g), agirlik.map((o) => o.g), yKal, yAgi);
    gizle(gem.map((x) => x.g));

    await par(c.say('Özdeş üç gemiden 1 numara boş, 3 numara en çok yüklü.', { speak: 'Özdeş üç gemiden bir numara boş, üç numara en çok yüklü.' }), belir(c, [...gem.map((x) => x.g), ...sayilar], 500));
    await par(c.say('Yük arttıkça gemi daha derine batar.'), par(
      belir(c, [...gem[1].alt, ...gem[2].alt, ...gem[2].ust], 400),
      c.tween(600, (e) => { yerles(1, lerp(220, TS[1], e)); yerles(2, lerp(220, TS[2], e)); }, ease.inOut)));
    await par(c.say('Daha derine batan geminin batan hacmi daha büyüktür.'), belir(c, bat, 450));
    await par(c.say('Batan hacim büyüdükçe kaldırma kuvveti artar.'), belir(c, [...kaldirma.map((o) => o.g), yKal], 450));
    await par(c.say('Her gemide kaldırma kuvveti, geminin ağırlığına eşittir.'), belir(c, [...agirlik.map((o) => o.g), yAgi], 450));
    await c.choice({
      tag: 'Sıra sende', q: 'Bir gemiye yük yükleniyor ve gemi biraz daha derine batıyor. Kaldırma kuvveti nasıl değişir?',
      options: ['Aynı kalır', 'Azalır', 'Artar; geminin yeni ağırlığına eşit olur'], answer: 2,
      hints: ['Daha derine batan geminin batan hacmi artar.', 'Yüzen gemide kaldırma kuvveti ağırlığa eşittir.', ''],
      right: 'Evet. Batan hacim arttı, kaldırma kuvveti yeni ağırlığa eşit oldu.',
    });
    c.clearSay();
    // Gör: 2 numaralı gemi 3'ün yüküyle yüklenir.
    await par(c.say('Yük arttı: gemi biraz daha batar, kaldırma kuvveti artar.'), par(
      belir(c, gem[1].ust, 400),
      c.tween(600, (e) => yerles(1, lerp(TS[1], TS[2], e)), ease.inOut),
      kaldirma[1].ayarla(100, 600, ease.inOut), agirlik[1].ayarla(100, 600, ease.inOut)));
  }

  /* ---- 5. Top ve tuzlu su ---- */
  async function topTuzlu(c) {
    const svg = c.svg(1000, 562);
    const kS = kap(c, svg, { x1: 80, x2: 440, ust: 200, yuzey: 280, taban: 500 });
    const kT = kap(c, svg, { x1: 560, x2: 920, ust: 200, yuzey: 280, taban: 500, yogunluk: 2 });
    const top = [[260, 284], [740, 272]].map(([cx, cy]) => c.S('circle', { cx, cy, r: 36, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, svg));
    const ok = [[260, 284], [740, 272]].map(([cx, cy]) => [kOk(c, svg, cx - 25, cy, 60, RENK.kaldirma, true), kOk(c, svg, cx + 25, cy, 60, RENK.kuvvet, false)]);
    const suY = yazi(c, svg, 260, 530, 'su', { size: 22 }), tuzY = yazi(c, svg, 740, 530, 'tuzlu su', { size: 22 });
    const fS = yazi(c, svg, 260, 150, 'F_{k} = G', { size: 26, kalin: 700, math: true }), fT = yazi(c, svg, 740, 150, 'F_{k} = G', { size: 26, kalin: 700, math: true });
    const r1 = renkli(c, svg, 500, 52, [['kaldırma kuvveti', RENK.kaldirma], ': aynı'], { size: 22 });
    const r2 = renkli(c, svg, 500, 90, [['sıvının yoğunluğu', RENK.sivi], ': arttı'], { size: 22 });
    const r3 = renkli(c, svg, 500, 128, [['batan hacim', RENK.sivi], ': ?'], { size: 22 });
    gizle(kS.g, kT.g, top, ok.flat().map((o) => o.g), suY, tuzY, fS, fT, r1, r2, r3);

    await par(c.say('Top, suda yüzüyor: kaldırma kuvveti ağırlığına eşit.'), belir(c, [kS.g, top[0], ok[0][0].g, ok[0][1].g, suY, fS], 500));
    await par(c.say('Tuzlu suda da yüzüyor; kaldırma kuvveti yine ağırlığına eşit.'), belir(c, [kT.g, top[1], ok[1][0].g, ok[1][1].g, tuzY, fT], 500));
    await par(c.say('Ağırlık aynı kaldığı için kaldırma kuvveti de aynı kalır.'), belir(c, r1, 400));
    await belir(c, [r2, r3], 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Top tuzlu suda su yüzeyine daha yakın yüzer. Batan hacmi nasıl değişmiştir?',
      options: ['Artmıştır', 'Değişmemiştir', 'Azalmıştır'], answer: 2,
      hints: [`${fk} = V<sub>b</sub> · ${ds} · g ve ${fk} aynı kalıyor.`, `${ds} arttı; çarpımın aynı kalması için V<sub>b</sub> ne olmalı?`, ''],
      right: 'Evet. Sıvı daha yoğun olduğu için batan hacim azalır.',
    });
    parcaKoy(c, r3, [['batan hacim', RENK.sivi], ': azaldı']);
    c.clearSay();
    await c.say('Sıvı daha yoğunsa aynı kaldırma kuvveti için daha az hacim yeter.');
    await c.say('Yüzen cisimde sıvının yoğunluğu arttıkça batan hacim azalır.');
  }

  /* ---- 6. Denizaltı ---- */
  async function denizalti(c) {
    const svg = c.svg(1000, 562);
    c.S('rect', { x: 0, y: 200, width: 1000, height: 340, fill: RENK.sivi, 'fill-opacity': 0.35 }, svg);
    cizgi(c, svg, [0, 200], [1000, 200], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    const hayalet = [200, 275, 350].map((cy) => c.S('rect', { x: 300, y: cy - 30, width: 400, height: 60, rx: 30, fill: 'none', stroke: KENAR, 'stroke-width': 2, 'stroke-dasharray': '8 6', 'stroke-opacity': 0.55 }, svg));
    const hLab = [[200, 'yüzer'], [275, 'askıda kalır'], [350, 'batar']].map(([cy, m]) => yazi(c, svg, 730, cy + 8, m, { hiza: 'start', size: 24, kalin: 600 }));
    const dn = c.S('g', {}, svg);
    const f = { fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round' };
    c.S('rect', Object.assign({ x: 475, y: 140, width: 50, height: 30, rx: 8 }, f), dn);
    c.S('rect', Object.assign({ x: 300, y: 170, width: 400, height: 60, rx: 30 }, f), dn);
    const tank = (x) => {
      c.S('rect', { x, y: 185, width: 100, height: 40, rx: 5, fill: HAVA, 'fill-opacity': 0.55, stroke: KENAR, 'stroke-width': 2 }, dn);
      const su = c.S('rect', { x: x + 1, y: 225, width: 98, height: 0, fill: RENK.sivi, 'fill-opacity': 0.9 }, dn);
      return (v) => { su.setAttribute('y', 225 - 40 * v); su.setAttribute('height', 40 * v); };
    };
    const tankA = tank(330), tankB = tank(570);
    const durum = [yazi(c, dn, 380, 212, 'hava', { size: 22, kalin: 700, renk: ZEMIN }), yazi(c, dn, 620, 212, 'hava', { size: 22, kalin: 700, renk: ZEMIN })];
    yazi(c, dn, 215, 126, 'safra tankı', { hiza: 'start', size: 22 });
    cizgi(c, dn, [330, 136], [360, 186], KENAR, 2.5);
    gizle(dn, hayalet, hLab);
    const yaz = (m, r) => durum.forEach((t) => { t.textContent = m; t.style.fill = r; });
    const doldur = (a, b, ms) => c.tween(ms, (e) => { const v = lerp(a, b, e); tankA(v); tankB(v); }, ease.inOut);
    const dal = (a, b, ms) => c.tween(ms, (e) => dn.setAttribute('transform', `translate(0,${lerp(a, b, e)})`), ease.inOut);

    await par(c.say('Denizaltılarda safra tankları bulunur; içlerinde hava ve su vardır.'), belir(c, dn, 500));
    await par(c.say('Dalmak için safra tanklarına su alınır.'), (async () => { yaz('su', RENK.yazi); await doldur(0, 1, 700); })());
    await par(c.say('Tanklara su girince denizaltının yoğunluğu artar; denizaltı batar.'), dal(0, 150, 1000));
    await par(c.say('Yükselmek için tanklardaki su boşaltılıp hava pompalanır.'), (async () => { yaz('hava', ZEMIN); await doldur(1, 0, 700); })());
    await par(c.say('Tanklar havayla dolunca yoğunluk azalır; denizaltı yüzeye çıkar.'), dal(150, 0, 1000));
    await par(c.say('Denizaltı, yoğunluğunu ayarlayarak yüzer, askıda kalır ya da batar.'), belir(c, [...hayalet, ...hLab], 500));
    await c.choice({
      tag: 'Sıra sende', q: 'Yüzeydeki bir denizaltı dalmak istiyor. Safra tanklarıyla ne yapmalıdır?',
      options: ['Tanklara hava pompalamalı', 'Tankları boş bırakmalı', 'Tanklara su almalı; yoğunluğu artar'], answer: 2,
      hints: ['Batmak için yoğunluk artmalı.', 'Tanka su girince yoğunluk artar.', ''],
      right: 'Evet. Tanklara su girince yoğunluk artar.',
    });
    c.clearSay();
    await par(c.say('Tanklara su girince yoğunluk artar ve denizaltı dalar.'), (async () => { yaz('su', RENK.yazi); await doldur(0, 1, 700); await dal(0, 150, 1000); })());
  }

  /* ---- 7. Derin dalış ---- */
  async function derinDalis(c) {
    const svg = c.svg(1000, 562);
    c.S('rect', { x: 120, y: 90, width: 760, height: 450, fill: RENK.sivi, 'fill-opacity': 0.35 }, svg);
    cizgi(c, svg, [120, 90], [880, 90], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    c.S('path', { d: 'M120,60 L120,540 L880,540 L880,60', fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round' }, svg);
    const deniz = (cx, cy) => {
      const g = c.S('g', {}, svg), f = { fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' };
      c.S('rect', Object.assign({ x: cx - 13, y: cy - 28, width: 26, height: 16, rx: 5 }, f), g);
      c.S('rect', Object.assign({ x: cx - 90, y: cy - 18, width: 180, height: 36, rx: 18 }, f), g);
      return g;
    };
    const solD = deniz(310, 170), sagD = deniz(690, 470);
    const solY = [yazi(c, svg, 420, 168, '30 m', { hiza: 'start', size: 24, kalin: 600, renk: KENAR }), yazi(c, svg, 420, 200, 'turistik', { hiza: 'start', size: 22 })];
    const sagY = [yazi(c, svg, 585, 466, '3.000 m', { hiza: 'end', size: 24, kalin: 600, renk: KENAR }), yazi(c, svg, 585, 498, 'araştırma', { hiza: 'end', size: 22 })];
    const solO = [250, 310, 370].map((x) => kOk(c, svg, x, 140, 12, RENK.basinc, false, 4).g);
    const sagO = [630, 690, 750].map((x) => kOk(c, svg, x, 292, 160, RENK.basinc, false, 5).g);
    const formul = yazi(c, svg, 500, 330, 'P = h · d · g', { size: 32, kalin: 700, renk: RENK.basinc });
    const oran = renkli(c, svg, 500, 400, [['basınç', RENK.basinc], ': 100 kat'], { size: 26, kalin: 700 });
    gizle(solD, sagD, solY, sagY, solO, sagO, formul, oran);

    await par(c.say('Turistik denizaltı genellikle 30 metre derinliğe iner.', { speak: 'Turistik denizaltı genellikle otuz metre derinliğe iner.' }), belir(c, [solD, ...solY], 500));
    await par(c.say('Araştırma denizaltısı 3.000 metre derinliğe kadar inebilir.', { speak: 'Araştırma denizaltısı üç bin metre derinliğe kadar inebilir.' }), belir(c, [sagD, ...sagY], 500));
    await par(c.say('Sıvı basıncı derinlikle artar; iki denizaltı da bunun etkisindedir.'), belir(c, [...solO, ...sagO], 400));
    await par(c.say('Basınç derinlikle orantılıdır: P = h · d · g.', { speak: 'Basınç derinlikle orantılıdır: P eşittir h çarpı d çarpı g.' }), belir(c, formul, 450));
    await c.say('Araştırma denizaltısının gövdesi çok daha büyük basınca dayanmalıdır.');
    await c.choice({
      tag: 'Sıra sende', q: '3.000 metre derinlikte araştırma denizaltısına etki eden sıvı basıncı, 30 metredeki turistik denizaltıya etki edenin kaç katıdır?',
      options: ['10 katı', 'Aynıdır', '100 katı'], answer: 2,
      hints: ['Derinlik kaç katına çıkarsa basınç da o kadar katına çıkar.', '3.000 metre, 30 metrenin kaç katıdır?', ''],
      right: 'Evet. Derinlik 100 katı, basınç da 100 katı.',
    });
    c.clearSay();
    await par(c.say('Derinlik yüz kat, basınç da yüz kat büyüktür.'), belir(c, oran, 450));
  }

  /* ---- 8. Türkiye'nin deniz araçları ---- */
  async function denizAraclari(c) {
    const svg = c.svg(1000, 562);
    const baslik = yazi(c, svg, 500, 70, 'Türkiye’nin deniz araçları', { size: 28, kalin: 700 });
    const K = [
      { x: 60, y: 120, tur: 'anadolu', sat: ['TCG Anadolu (L-400)', 'çok amaçlı amfibi', 'hücum gemisi'] },
      { x: 520, y: 120, tur: 'istanbul', sat: ['TCG İstanbul (F-515)', 'İ sınıfı fırkateyn'] },
      { x: 60, y: 290, tur: 'ada', sat: ['ADA sınıfı korvetler'] },
      { x: 520, y: 290, tur: 'denizalti', sat: ['Yeni Tip Denizaltı', 'Projesi', 'Gölcük Tersanesi'] },
    ];
    let golcuk = null;
    const kartlar = K.map((k) => {
      const g = c.S('g', {}, svg), r = kutu(c, g, k.x, k.y, 420, 140, { rx: 12 }), yl = k.y + 75;
      c.S('rect', { x: k.x + 14, y: yl, width: 110, height: 40, fill: RENK.sivi, 'fill-opacity': 0.3 }, g);
      cizgi(c, g, [k.x + 14, yl], [k.x + 124, yl], RENK.sivi, 3);
      if (k.tur === 'denizalti') denizaltiSil(c, g, k.x + 20, yl, 98); else gemiSil(c, g, k.x + 14, yl, 110, k.tur);
      const n = k.sat.length, y0 = k.y + 78 - (n === 3 ? 28 : (n - 1) * 14);
      const els = k.sat.map((s, i) => yazi(c, g, k.x + 142, y0 + i * 28, s, { hiza: 'start', size: 22, kalin: 600 }));
      if (k.tur === 'denizalti') { golcuk = els[2]; gizle(golcuk); }
      gizle(g);
      return { g, r };
    });
    const gemiYuz = renkli(c, svg, 500, 490, [['gemiler', RENK.kaldirma], ' yüzer'], { size: 28, kalin: 700 });
    const safra = renkli(c, svg, 500, 490, [['safra tankı', RENK.sivi]], { size: 28, kalin: 700 });
    gizle(baslik, gemiYuz, safra);
    gizle(baslik);

    await par(c.say('Türkiye, millî çıkarları doğrultusunda kendi deniz araçlarını geliştiriyor.'), belir(c, baslik, 450));
    await c.say('Bu yatırımlar ekonomik kalkınma ve tasarruf stratejilerinin parçasıdır.');
    await par(c.say('TCG Anadolu, çok amaçlı amfibi hücum gemisidir.'), par(belir(c, baslik, 300, 0), belir(c, kartlar[0].g, 400)));
    await par(c.say('TCG İstanbul, İ sınıfı bir fırkateyndir.'), belir(c, kartlar[1].g, 400));
    await par(c.say('ADA sınıfı korvetler de Deniz Kuvvetlerine teslim edildi.'), belir(c, kartlar[2].g, 400));
    await par(c.say('Yeni Tip Denizaltı Projesi, Gölcük Tersanesi’nde yerli imkânlarla sürüyor.'), (async () => { await belir(c, kartlar[3].g, 400); await belir(c, golcuk, 350); })());
    [0, 1, 2].forEach((i) => kartlar[i].r.setAttribute('stroke', RENK.kaldirma));
    await par(c.say('Gemiler, ortalama yoğunlukları suyunkinden küçük olduğu için yüzer.'), belir(c, gemiYuz, 400));
    [0, 1, 2].forEach((i) => kartlar[i].r.setAttribute('stroke', RENK.kenarlik));
    kartlar[3].r.setAttribute('stroke', RENK.sivi);
    await belir(c, gemiYuz, 250, 0); gemiYuz.remove();
    await par(c.say('Denizaltı, yoğunluğunu safra tanklarıyla ayarlar.'), belir(c, safra, 400));
  }

  /* ---- 9. Çöp adaları ---- */
  async function copAdalari(c) {
    const svg = c.svg(1000, 562);
    c.S('rect', { x: 0, y: 300, width: 1000, height: 240, fill: RENK.sivi, 'fill-opacity': 0.35 }, svg);
    cizgi(c, svg, [0, 300], [1000, 300], RENK.sivi, 3, { 'stroke-opacity': 0.8 });
    const rnd = rastgele(11), RENKLER = ['#b7bfd6', '#9fa9c9', '#cfd6ee'];
    const kume = c.S('g', {}, svg), P = [];
    for (let i = 0; i < 14; i++) {
      const w = 24 + Math.round(rnd() * 16), h = 9 + Math.round(rnd() * 5), r = Math.round((rnd() - 0.5) * 16);
      const x0 = 150 + i * 50 + Math.round((rnd() - 0.5) * 16), y0 = 301 - h / 2;
      const g = c.S('g', {}, kume);
      c.S('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 3, fill: RENKLER[i % 3], stroke: KENAR, 'stroke-width': 1.5 }, g);
      g.setAttribute('transform', `translate(${x0},${y0}) rotate(${r})`);
      gizle(g);
      P.push({ g, x0, y0, r, hx: 392 + (i % 7) * 36, hy: 301 - h / 2 - Math.floor(i / 7) * 12 });
    }
    const yil = yazi(c, svg, 500, 80, 'her yıl yaklaşık bir trilyon plastik poşet', { size: 24, kalin: 600 });
    const yuz = yazi(c, svg, 500, 130, 'Türkiye’nin yüz ölçümünden büyük', { size: 24, kalin: 600 });
    const sec = P[3], yok = P.filter((q) => q !== sec);
    const kal = kOk(c, svg, sec.hx - 10, sec.hy, 40, RENK.kaldirma, true), agi = kOk(c, svg, sec.hx + 10, sec.hy, 40, RENK.kuvvet, false);
    const fkG = yazi(c, svg, 545, 348, 'F_{k} = G', { hiza: 'start', size: 28, kalin: 700, math: true });
    const ag = c.S('path', { d: 'M330,250 Q500,350 670,250', fill: 'none', stroke: RENK.gri, 'stroke-width': 4, 'stroke-dasharray': '10 7', 'stroke-linecap': 'round' }, svg);
    gizle(yil, yuz, kal.g, agi.g, fkG, ag);

    await par(c.say('Her yıl yaklaşık bir trilyon plastik poşet çöpe atılıyor.', { speak: '[thoughtful] Her yıl yaklaşık bir trilyon plastik poşet çöpe atılıyor.' }), (async () => {
      belir(c, yil, 400);
      const gel = [];
      for (const q of P) { gel.push(belir(c, q.g, 300)); await c.wait(100); }
      await Promise.all(gel);
    })());
    await par(c.say('Bu atıklar okyanuslarda rüzgârla ve akıntılarla birleşip çöp adaları oluşturuyor.'), c.tween(800, (e) => {
      P.forEach((q) => q.g.setAttribute('transform', `translate(${lerp(q.x0, q.hx, e)},${lerp(q.y0, q.hy, e)}) rotate(${lerp(q.r, 0, e)})`));
    }, ease.inOut));
    await par(c.say('Çöp adaları, Türkiye’nin yüz ölçümünden büyük boyutlara ulaştı.'), belir(c, yuz, 400));
    await par(c.say('Plastik atıklar suyun yüzeyinde yüzer.'), (async () => {
      await belir(c, yok.map((q) => q.g), 300, 0.5);
      await par(belir(c, [kal.g, agi.g, fkG], 400));
    })());
    await c.say('Yüzen cisme etki eden kaldırma kuvveti, ağırlığına eşittir.');
    await c.say('Plastik atıkları yüzeyde tutan, kaldırma kuvvetidir.');
    await c.say('Atıklar yüzeyde kaldığı için yüzeyden toplanabilirler.');
    await c.choice({
      tag: 'Sıra sende', q: 'Plastikler suyun yüzeyinde yüzdüğüne göre kaldırma kuvvetinden yararlanan bir çözüm hangisidir?',
      options: ['Atıkları dibe batırmak', 'Denizin dibini taramak', 'Yüzeyde yüzen atıkları ağlarla yüzeyden toplamak'], answer: 2,
      hints: ['Atıklar suyun yüzeyinde duruyor.', 'Yüzen atık yüzeyden toplanabilir.', ''],
      right: 'Evet. Yüzeyde yüzen atıklar ağlarla yüzeyden toplanır.',
    });
    c.clearSay();
    await par(c.say('Ağ, yüzeyde yüzen atıkları yüzeyden toplar.'), belir(c, ag, 500));
  }

  /* ---- 10. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const yeniPano = async (ayar) => {
      const p = c.S('g', {}, svg);
      const pn = pano(c, p, ayar);
      gizle(p);
      return { p, pn };
    };
    const kapat = async (p) => { await belir(c, p, 300, 0); p.remove(); };

    // Dene 1: yüzer, askıda kalır, batar.
    let { p, pn } = await yeniPano({
      kutular: [{ ad: 'Yüzer', x: 50, y: 240, w: 290, h: 300 }, { ad: 'Askıda kalır', x: 355, y: 240, w: 290, h: 300 }, { ad: 'Batar', x: 660, y: 240, w: 290, h: 300 }],
      kart: { x: 100, y: 70, w: 800, h: 130, size: 26 }, adBas: 88, adAralik: 40,
    });
    await par(c.say('Cisimleri davranışlarına göre sınıflayalım.'), belir(c, p, 450));
    c.clearSay();
    const ip1 = 'Yoğunluğa ya da kaldırma kuvvetiyle ağırlığa bak.';
    const D1 = [
      { durum: 'Yoğunluğu sıvınınkinden küçük cisim', satirlar: ['Yoğunluğu sıvınınkinden', 'küçük cisim'], kisa: 'yoğunluk küçük', kutu: 0, neden: `Evet. ${dc} < ${ds} ise cisim yüzer.` },
      { durum: 'Yoğunluğu sıvınınkine eşit cisim', satirlar: ['Yoğunluğu sıvınınkine', 'eşit cisim'], kisa: 'yoğunluk eşit', kutu: 1, neden: `Evet. ${dc} = ${ds} ise bırakıldığı yerde kalır.` },
      { durum: 'Yoğunluğu sıvınınkinden büyük cisim', satirlar: ['Yoğunluğu sıvınınkinden', 'büyük cisim'], kisa: 'yoğunluk büyük', kutu: 2, neden: `Evet. ${dc} > ${ds} ise cisim tabana batar.` },
      { durum: 'Kaldırma kuvveti ağırlığından küçük olan cisim', satirlar: ['Kaldırma kuvveti ağırlığından', 'küçük olan cisim'], kisa: 'kuvvet küçük', kutu: 2, neden: `Evet. ${fk} < G ise cisim batar.` },
      { durum: 'Kaldırma kuvveti ağırlığına eşit, bir kısmı sıvı dışında kalan cisim', satirlar: ['Kaldırma kuvveti ağırlığına eşit,', 'bir kısmı sıvı dışında kalan cisim'], kisa: 'kısmen batık', kutu: 0, neden: `Evet. Yüzen cisimde ${fk} = G.` },
      { durum: 'Kaldırma kuvveti ağırlığına eşit, tamamen batmış ve dengede cisim', satirlar: ['Kaldırma kuvveti ağırlığına eşit,', 'tamamen batmış ve dengede cisim'], kisa: 'tam batık', kutu: 1, neden: `Evet. Askıda kalan cisimde ${fk} = G.` },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: ['Yüzer', 'Askıda kalır', 'Batar'], soru: (k) => `${k.durum} ne yapar?`,
      kartlar: D1.map((k) => Object.assign({ ipucu: ip1 }, k)), sec: (_, k) => pn.goster(k), yerlestir: (_, k) => pn.yerlestir(k),
    });
    await kapat(p);

    // Dene 2: çöp adaları, azalt ya da topla.
    ({ p, pn } = await yeniPano({
      kutular: [{ ad: 'Atığın oluşmasını azaltır', x: 60, y: 250, w: 420, h: 290 }, { ad: 'Oluşmuş atığı toplar', x: 520, y: 250, w: 420, h: 290 }],
      kart: { x: 100, y: 70, w: 800, h: 130, size: 26 }, baslik: 24, adBas: 92, adAralik: 40,
    }));
    await par(c.say('Şimdi çöp adaları için çözümleri sınıflayalım.'), belir(c, p, 450));
    c.clearSay();
    const D2 = [
      { durum: 'Yeniden kullanılabilir ürünleri tercih etmek', satirlar: ['Yeniden kullanılabilir ürünleri', 'tercih etmek'], kisa: 'yeniden kullanım', kutu: 0, neden: 'Evet. Tek kullanımlık plastik azalır.' },
      { durum: 'Çevre temizliği için kampanyalar düzenlemek', satirlar: ['Çevre temizliği için', 'kampanyalar düzenlemek'], kisa: 'temizlik kampanyası', kutu: 1, neden: 'Evet. Var olan atık toplanır.' },
      { durum: 'Yüzeyde yüzen plastikleri yüzeyden toplamak', satirlar: ['Yüzeyde yüzen plastikleri', 'yüzeyden toplamak'], kisa: 'yüzeyden toplama', kutu: 1, neden: 'Evet. Plastik, kaldırma kuvveti sayesinde yüzeyde kalır.' },
      { durum: 'Toplumu plastik atıkların zararları konusunda bilgilendirmek', satirlar: ['Toplumu plastik atıkların zararları', 'konusunda bilgilendirmek'], kisa: 'bilgilendirme', kutu: 0, neden: 'Evet. Bilinçli tüketici daha az atık bırakır.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: ['Atığın oluşmasını azaltır', 'Oluşmuş atığı toplar'], soru: (k) => `${k.durum} atığın oluşmasını mı azaltır, oluşmuş atığı mı toplar?`,
      kartlar: D2.map((k) => Object.assign({ ipucu: 'Çözüm atığı mı azaltıyor, yoksa var olanı mı topluyor?' }, k)), sec: (_, k) => pn.goster(k), yerlestir: (_, k) => pn.yerlestir(k),
    });
    await kapat(p);

    // Dene 3: ad ile tür eşleştirme.
    ({ p, pn } = await yeniPano({
      kutular: [
        { ad: ['çok amaçlı amfibi', 'hücum gemisi'], x: 60, y: 170, w: 420, h: 160 }, { ad: ['İ sınıfı', 'fırkateyn'], x: 520, y: 170, w: 420, h: 160 },
        { ad: ['korvet'], x: 60, y: 345, w: 420, h: 160 }, { ad: ['denizaltı', '(Gölcük Tersanesi)'], x: 520, y: 345, w: 420, h: 160 }],
      kart: { x: 250, y: 40, w: 500, h: 90, size: 26 }, baslik: 24, adBas: 122, adAralik: 36,
    }));
    await par(c.say('Son olarak deniz araçlarını türleriyle eşleştirelim.'), belir(c, p, 450));
    c.clearSay();
    const D3 = [
      { ad: 'TCG İstanbul (F-515)', kutu: 1, neden: 'Evet. TCG İstanbul, İ sınıfı bir fırkateyndir.' },
      { ad: 'Yeni Tip Denizaltı Projesi', kutu: 3, neden: 'Evet. Yeni Tip Denizaltı Projesi Gölcük Tersanesi’nde sürüyor.' },
      { ad: 'TCG Anadolu (L-400)', kutu: 0, neden: 'Evet. TCG Anadolu çok amaçlı amfibi hücum gemisidir.' },
      { ad: 'ADA sınıfı', kutu: 2, neden: 'Evet. ADA sınıfı korvetlerdir.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: ['çok amaçlı amfibi hücum gemisi', 'İ sınıfı fırkateyn', 'korvet', 'denizaltı (Gölcük Tersanesi)'], soru: (k) => `${k.ad} hangi türdür?`,
      kartlar: D3.map((k) => Object.assign({ ipucu: 'Adın yanındaki sınıfa bak.', satirlar: [k.ad], kisa: k.ad }, k)), sec: (_, k) => pn.goster(k), yerlestir: (_, k) => pn.yerlestir(k),
    });
    c.note('<b>Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.</b>', 'Yüzme', 'akiskanlar-d4-yuzme');
  }

  Ders.start({
    id: 'akiskanlar-d4', kicker: 'Konu D · Kaldırma kuvveti', title: 'Gemi, denizaltı, çöp adası', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Gemi, denizaltı, çöp adası',
      hook: 'Çelik bir çivi batarken binlerce ton çelikten yapılmış gemi nasıl yüzer?',
      button: 'Derse başla ›',
    },
    goals: [
      'Yüzme, askıda kalma ve batmayı yoğunluk karşılaştırmasıyla açıklar.',
      'Yüzen ve askıda kalan cisimde kaldırma kuvvetinin ağırlığa eşit olduğunu söyler.',
      'Gemi, denizaltı ve çöp adalarını Arşimet İlkesi’yle yorumlar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Kaldırma kuvvetinin nereden doğduğunu ve neye eşit olduğunu hatırla.', run: hatirla },
      { title: 'Çelik bilye ve gemi', goal: 'Çelik geminin neden yüzdüğünü ortalama yoğunlukla açıkla.', run: bilyeGemi },
      { title: 'Yüzme, askıda kalma, batma', goal: 'Üç durumu yoğunluk ve kuvvetlerle ayır.', run: yuzme },
      { title: 'Yüklü ve boş gemi', goal: 'Yük artınca kaldırma kuvvetinin nasıl değiştiğini bul.', run: yukluBos },
      { title: 'Top ve tuzlu su', goal: 'Sıvı yoğunlaşınca batan hacmin nasıl değiştiğini bul.', run: topTuzlu },
      { title: 'Denizaltı', goal: 'Denizaltının safra tanklarıyla nasıl daldığını ve yükseldiğini açıkla.', run: denizalti },
      { title: 'Derin dalış', goal: 'Derinlikle basıncın nasıl arttığını denizaltılarla karşılaştır.', run: derinDalis },
      { title: 'Türkiye’nin deniz araçları', goal: 'Gemi ve denizaltılarla ortalama yoğunluk fikrini ilişkilendir.', run: denizAraclari },
      { title: 'Çöp adaları', goal: 'Plastik atıkların neden yüzeyde kaldığını ve bir çözümü bul.', run: copAdalari },
      { title: 'Dene', goal: 'Öğrendiklerini üç sınıflama etkinliğinde kullan.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Aynı kütlede çelikten yapılmış içi boş bir kutu suda yüzüyor, katı bir küre batıyor. Neden?',
        options: ['Kutuya etki eden kaldırma kuvveti ağırlığından küçüktür', 'Kutunun ortalama yoğunluğu suyunkinden küçüktür', 'Kutunun kütlesi daha küçüktür'], answer: 1,
        why: ['Yüzen kutuda kaldırma kuvveti ağırlığa eşittir; küçük olsaydı kutu batardı.', 'İçi boş kutunun hacmi büyüktür; ortalama yoğunluğu azalır ve suyunkinden küçük olur.', 'İkisinin kütlesi aynıdır; fark kütlede değil hacimdedir.'], scene: 1 },
      { q: 'Bir tahta blok sıvıda yüzüyor. Blok hangisini yerinden eder?',
        options: ['Hacminin tamamı kadar sıvıyı', 'Kendi ağırlığının iki katı kadar sıvıyı', 'Kendi ağırlığı kadar sıvıyı'], answer: 2,
        why: ['Blok yalnızca batan kısmı kadar sıvıyı yerinden eder; hacminin tamamı kadar değil.', 'Yeri değişen sıvının ağırlığı kaldırma kuvvetine, yani ağırlığa eşittir; iki katı değildir.', 'Yüzen cisimde kaldırma kuvveti ağırlığa eşittir; yeri değişen sıvının ağırlığı da buna eşittir.'], scene: 2 },
      { q: 'Yüklü bir gemi yükünün bir kısmını boşaltıyor. Hangisi doğrudur?',
        options: ['Gemi daha az batar; kaldırma kuvveti azalır', 'Gemi aynı batar; kaldırma kuvveti değişmez', 'Gemi daha az batar; kaldırma kuvveti aynı kalır'], answer: 0,
        why: ['Gemi hafifler ve batan hacim küçülür; kaldırma kuvveti yeni ağırlığa eşit olacak biçimde azalır.', 'Ağırlık azalınca gemi daha az batar; batan hacim değişir.', 'Batan hacim küçülünce kaldırma kuvveti de küçülür; aynı kalmaz.'], scene: 3 },
      { q: 'Yüzen bir tahta blok sudan tuzlu suya aktarılıyor. Batan hacmi nasıl değişir?',
        options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
        why: ['Sıvı daha yoğun olduğu için batan hacim artmaz, azalır.', 'Kaldırma kuvveti ağırlığa eşit kalır; sıvı daha yoğunsa daha az hacim batmak yeter.', 'Sıvının yoğunluğu değiştiği için batan hacim de değişir.'], scene: 4 },
      { q: 'Su altında askıda duran bir denizaltı yükselmek istiyor. Ne yapar?',
        options: ['Safra tanklarına su alır', 'Safra tanklarını olduğu gibi bırakır', 'Safra tanklarındaki suyu boşaltıp hava pompalar'], answer: 2,
        why: ['Su almak yoğunluğu artırır; denizaltı batar.', 'Tanklar değişmezse yoğunluk da değişmez; denizaltı askıda kalır.', 'Su boşalıp hava dolunca yoğunluk azalır; denizaltı yüzeye çıkar.'], scene: 5 },
    ],
    summary: [
      'Gemi içi boş yapısı sayesinde ortalama yoğunluğu suyunkinden küçüktür; yüzer.',
      'Yüzen ve askıda kalan cisimde F<sub>k</sub> = G; batan cisimde F<sub>k</sub> &lt; G.',
      '<b>Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.</b>',
    ],
    nextLesson: { href: 'd5-olcumu-ilkeyle-sina.html', label: 'Sonraki: Ölçümü de önermeyi de ilkeyle sına ›' },
  });
})();
