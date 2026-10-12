/* E2 — Bernoulli her yerde
   Çatıdan spreye, yelkenden arka kanada birçok olay aynı sürat–basınç ilişkisiyle açıklanır; cisim düşük basınca itilir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/E-bernoulli-ilkesi.md (E2). Kavramsal: sayı, formül, oran yok.
   Bu dosyada yazılan araçlar: akisEgri (eğri boyunca akış çizgisi), yayNoktalari, kaydir, mini (altı örneğin küçük çizimi). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, sinifla, uz } = window.KIT;
  const E = window.KIT_E;
  const { lerp, ease } = Ders;
  const KENAR = '#c3cbea', GOVDE = '#8f9bc4', KOYU = '#6b7599', BEJ = '#d9cdb4', ZEMIN = '#10162b', AKIS = '#7f93b8', BEYAZ = '#ffffff';

  /* ---- ders içi yardımcılar ---- */
  /* Eğri (ya da kırık) çizgi boyunca akış: çizgi dizisi akış yönünde verilir. akisDemeti yalnızca düz doğru kurduğu için eğri
     yüzeyleri (şemsiye, yelken, çatı) izleyen demetler burada kurulur. Arayüz akisDemeti ile aynıdır: { g, hiz, kaldir() }. */
  function akisEgri(c, p, motor, o) {
    const g = c.S('g', {}, p), s = { hiz: o.hiz || 100 }, nok = [];
    o.cizgiler.forEach((pts, i) => {
      c.S('path', { d: 'M' + pts.map((q) => q.join(',')).join(' L'), fill: 'none', stroke: AKIS, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      const cum = [0];
      for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + uz(pts[j - 1], pts[j]));
      const L = cum[cum.length - 1], m = Math.max(2, Math.round(L / (o.aralik || 40)));
      for (let j = 0; j < m; j++) nok.push({ pts, cum, L, k: ((j + ((i * 0.37) % 1)) * L) / m, el: c.S('circle', { r: 2.5, fill: KENAR }, g) });
    });
    const yer = () => nok.forEach((q) => {
      let j = 1;
      while (j < q.cum.length - 1 && q.cum[j] < q.k) j++;
      const t = (q.k - q.cum[j - 1]) / ((q.cum[j] - q.cum[j - 1]) || 1);
      q.el.setAttribute('cx', lerp(q.pts[j - 1][0], q.pts[j][0], t)); q.el.setAttribute('cy', lerp(q.pts[j - 1][1], q.pts[j][1], t));
    });
    const f = motor.ekle((dt) => { nok.forEach((q) => { q.k = (q.k + s.hiz * dt) % q.L; }); yer(); });
    yer();
    return { g, get hiz() { return s.hiz; }, set hiz(v) { s.hiz = v; }, kaldir() { motor.cikar(f); g.remove(); } };
  }
  /* İkinci derece eğri üzerinde n+1 nokta. */
  function yayNoktalari(P0, C, P2, n = 10) {
    return Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n, a = (1 - t) * (1 - t), b = 2 * t * (1 - t), d = t * t;
      return [a * P0[0] + b * C[0] + d * P2[0], a * P0[1] + b * C[1] + d * P2[1]];
    });
  }
  /* Bir öğeyi (grubu) başlangıç konumundan (x0,y0) (x1,y1)'e kaydırır. */
  const kaydir = (c, el, x0, y0, x1, y1, ms, eg = ease.inOut) =>
    c.tween(ms, (e) => el.setAttribute('transform', `translate(${lerp(x0, x1, e)},${lerp(y0, y1, e)})`), eg);
  /* Akış çizgisinin üstüne gelen yazıya tahta renginde halka çeker: çizgi yazının altında kalır. */
  const halo = (...ts) => ts.flat().forEach((t) => { t.style.stroke = ZEMIN; t.style.strokeWidth = '10px'; t.style.paintOrder = 'stroke'; t.style.strokeLinejoin = 'round'; });
  const kuvvetHalo = (g) => { halo(g.querySelector('text')); return g; };
  /* Basınç etiketi ve yanında harf (P₀, P₁). */
  function etiketP(c, p, x, y, tur, ad) {
    const et = E.basincEtiketi(c, p, x, y, tur), pw = yazi(c, p, 872, y + 8, ad, { hiza: 'start', size: 24, kalin: 700, renk: RENK.basinc });
    halo(pw);
    gizle(pw);
    return [et, pw];
  }

  /* ---- altı örneğin küçük çizimi (280 × 190 yerel ölçü): sahne 8 panelleri ve sahne 9 kartları ---- */
  const MINI = {
    cati(c, g) {
      cizgi(c, g, [60, 175], [220, 175], RENK.gri, 3);
      c.S('rect', { x: 100, y: 125, width: 80, height: 50, fill: 'none', stroke: KENAR, 'stroke-width': 4 }, g);
      c.S('polygon', { points: '90,125 140,92 190,125', fill: 'none', stroke: BEJ, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
    },
    semsiye(c, g) {
      c.S('path', { d: 'M85,120 Q140,40 195,120', fill: 'none', stroke: KENAR, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
      cizgi(c, g, [140, 120], [140, 172], KENAR, 4);
    },
    kanat(c, g) {
      cizgi(c, g, [30, 186], [250, 186], RENK.gri, 3);
      c.S('rect', { x: 60, y: 150, width: 140, height: 22, rx: 4, fill: GOVDE }, g);
      [92, 168].forEach((x) => c.S('circle', { cx: x, cy: 172, r: 13, fill: '#18213f', stroke: KENAR, 'stroke-width': 3 }, g));
      cizgi(c, g, [135, 88], [135, 150], KENAR, 3); cizgi(c, g, [165, 88], [165, 150], KENAR, 3);
      c.S('path', { d: 'M120,70 Q150,100 180,70 Z', fill: KENAR }, g);
    },
    yelken(c, g) {
      c.S('path', { d: 'M125,68 Q150,110 145,150 Q135,175 125,174 Q115,175 105,150 Q100,110 125,68 Z', fill: 'none', stroke: KENAR, 'stroke-width': 3 }, g);
      c.S('path', { d: 'M125,100 Q150,118 152,150', fill: 'none', stroke: BEYAZ, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    },
    araclar(c, g) {
      c.S('rect', { x: 60, y: 38, width: 85, height: 26, rx: 3, fill: GOVDE }, g);
      c.S('rect', { x: 145, y: 38, width: 30, height: 26, rx: 3, fill: KOYU }, g);
      c.S('rect', { x: 80, y: 136, width: 85, height: 22, rx: 5, fill: '#3a4a7a', stroke: BEYAZ, 'stroke-width': 2 }, g);
    },
    sprey(c, g) {
      c.S('rect', { x: 70, y: 100, width: 55, height: 78, rx: 4, fill: 'none', stroke: KENAR, 'stroke-width': 4 }, g);
      c.S('rect', { x: 88, y: 82, width: 19, height: 18, fill: 'none', stroke: KENAR, 'stroke-width': 4 }, g);
      c.S('rect', { x: 82, y: 70, width: 33, height: 12, fill: GOVDE }, g);
      cizgi(c, g, [115, 76], [140, 76], KENAR, 5);
      c.S('rect', { x: 72, y: 130, width: 51, height: 46, fill: RENK.sivi, 'fill-opacity': 0.35 }, g);
    },
  };
  /* Panelde kuvvet okları ve düşük basınç etiketi (yerel ölçü). */
  const PANEL = {
    cati: { ad: 'çatı', oklar: [[[140, 98], [140, 38]]], et: [205, 56] },
    semsiye: { ad: 'şemsiye', oklar: [[[140, 108], [140, 48]]], et: [205, 66] },
    kanat: { ad: 'arka kanat', oklar: [[[150, 80], [150, 140]]], et: [225, 118] },
    yelken: { ad: 'yelken', oklar: [[[140, 125], [192, 94]]], et: [232, 70] },
    araclar: { ad: 'araçlar', oklar: [[[117, 68], [117, 96]], [[123, 132], [123, 104]]], et: [225, 100] },
    sprey: { ad: 'sprey', oklar: [[[135, 76], [195, 76]]], et: [232, 112] },
  };
  const SIRA = ['cati', 'semsiye', 'kanat', 'yelken', 'araclar', 'sprey'];

  /* ---- 0. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    // Birinci soru: borunun dar yerinde sürat artar.
    const bir = c.S('g', {}, svg);
    const tp = E.tup(c, bir, { y: 310, bolumler: [{ a: 170, b: 420, h: 120 }, { a: 480, b: 890, h: 40 }] });
    const isaret = E.isaretler(c, bir, motor, tp, { hiz: [90, 270] });
    const ok1 = ok(c, bir, [195, 310], [255, 310], BEYAZ, 5), ok2 = ok(c, bir, [520, 310], [700, 310], BEYAZ, 5);
    const s1 = yazi(c, bir, 225, 284, 'sürat', { size: 22, kalin: 600, renk: BEYAZ }), s2 = yazi(c, bir, 610, 280, 'sürat', { size: 22, kalin: 600, renk: BEYAZ });
    const dusuk = E.basincEtiketi(c, bir, 685, 232, 'dusuk');
    gizle(bir);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, bir, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Bir akışkanın sürati artarsa basıncı nasıl değişir?',
      options: ['Artar', 'Değişmez', 'Azalır'], answer: 2,
      hints: ['Sürati artan akışkanın basıncı azalır.', 'Sürati artan akışkanın basıncı azalır.', ''],
      right: 'Evet. Sürat artınca basınç azalır.',
    });
    c.clearSay();
    await par(c.say('Sürati artan akışkanın basıncı düşer.'), belir(c, dusuk, 400));
    c.clearSay();
    await belir(c, bir, 400, 0); bir.remove();
    // İkinci soru: iki yüz arasında basınç farkı.
    const iki = c.S('g', {}, svg);
    const levha = kutu(c, iki, 485, 170, 30, 240, { rx: 6 });
    const yuk = E.basincEtiketi(c, iki, 340, 290, 'yuksek'), dus = E.basincEtiketi(c, iki, 660, 290, 'dusuk');
    const cisim = yazi(c, iki, 500, 446, 'cisim', { size: 26, kalin: 600 });
    const kv = E.kuvvetOku(c, iki, [450, 290], [550, 290], { etiket: [500, 262] });
    gizle(levha, cisim);
    await par(belir(c, [levha, cisim], 400), belir(c, [yuk, dus], 450));
    await c.choice({
      tag: 'Hatırla', q: 'Bir cismin iki yüzü arasında basınç farkı varsa net kuvvet hangi yöne etkir?',
      options: ['Net kuvvet etkimez', 'Basıncı büyük yüzden küçük yüze doğru', 'Basıncı küçük yüzden büyük yüze doğru'], answer: 1,
      hints: ['İki yüz arasında basınç farkı varsa net kuvvet vardır.', '', 'Kuvvet, basıncı büyük yüzden küçük yüze doğrudur.'],
      right: 'Evet. Büyük basınçtan küçük basınca doğru.',
    });
    c.clearSay();
    await par(c.say('Cisim, basıncı büyük yüzden küçük yüze doğru itilir.'), belir(c, kv, 400));
    c.clearSay();
    await belir(c, iki, 400, 0); iki.remove();
    const ozet = renkli(c, svg, 500, 292, [['sürat', BEYAZ], ' artar → ', ['basınç', RENK.basinc], ' düşer'], { size: 44, kalin: 700 });
    gizle(ozet); belir(c, ozet, 450);
    await c.say('Bugün bu ilkenin günlük hayattaki örneklerine bakacağız.', { speak: '[thoughtful] Bugün bu ilkenin günlük hayattaki örneklerine bakacağız.' });
  }

  /* ---- 1. Fırtınada çatı ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    cizgi(c, svg, [60, 500], [940, 500], RENK.gri, 3);
    const ev = c.S('rect', { x: 330, y: 330, width: 340, height: 170, fill: RENK.basinc, 'fill-opacity': 0, stroke: KENAR, 'stroke-width': 4 }, svg);
    const ust = E.akisDemeti(c, svg, motor, { P: [60, 60], Q: [940, 60], n: 2, ara: [0, 30], hiz: 100 });
    const sol = E.akisDemeti(c, svg, motor, { P: [60, 380], Q: [330, 380], n: 3, ara: [0, 30], hiz: 100 });
    const sag = E.akisDemeti(c, svg, motor, { P: [670, 380], Q: [940, 380], n: 3, ara: [0, 30], hiz: 100 });
    // Çatı, üstündeki sıkışık akış çizgileri ve kuvvet oku birlikte kalkar.
    const catiG = c.S('g', {}, svg);
    c.S('polygon', { points: '310,330 500,220 690,330', fill: 'none', stroke: BEJ, 'stroke-width': 6, 'stroke-linejoin': 'round' }, catiG);
    const sik = akisEgri(c, catiG, motor, { cizgiler: [10, 20, 30, 40].map((d) => [[310, 330 - d], [500, 220 - d], [690, 330 - d]]), hiz: 300 });
    const kv = kuvvetHalo(E.kuvvetOku(c, catiG, [420, 262], [420, 182], { etiket: [440, 210], hiza: 'start' }));
    const dusuk = E.basincEtiketi(c, svg, 500, 122, 'dusuk'), yuksek = E.basincEtiketi(c, svg, 500, 430, 'yuksek');
    gizle(ust.g, sol.g, sag.g, sik.g);

    await par(c.say('Havanın akışını çizgilerle gösteriyoruz; sürat artınca çizgiler sıklaşır.'), belir(c, [ust.g, sol.g, sag.g], 400));
    await par(c.say('Fırtınada çatının üstünden geçen havanın sürati artar.'), belir(c, sik.g, 400));
    await par(c.say('Çatının üstünde basınç azalır.'), belir(c, dusuk, 400));
    await par(c.say('Kapı ve pencereler kapalıyken evin içindeki hava nispeten durgun kalır.'),
      c.tween(400, (e) => ev.setAttribute('fill-opacity', 0.14 * e), ease.out));
    await par(c.say('İçerideki basınç, çatının üstündeki basınçtan büyüktür.'), belir(c, yuksek, 400));
    await par(c.say('Basınç farkı çatıyı yukarı iten bir kuvvet doğurur.'), belir(c, kv, 400));
    await par(c.say('Kuvvet yeterince büyükse çatı yerinden kopup uçar.'), kaydir(c, catiG, 0, 0, 0, -36, 900));
  }

  /* ---- 2. Şemsiye ---- */
  async function semsiye(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    const ust = E.akisDemeti(c, svg, motor, { P: [60, 60], Q: [940, 60], n: 2, ara: [0, 30], hiz: 100 });
    const alt = E.akisDemeti(c, svg, motor, { P: [60, 350], Q: [940, 350], n: 3, ara: [0, 50], hiz: 100 });
    const sem = c.S('g', {}, svg);
    cizgi(c, sem, [500, 300], [500, 470], KENAR, 6);
    const yay = c.S('path', { fill: 'none', stroke: KENAR, 'stroke-width': 6, 'stroke-linecap': 'round' }, sem);
    const yayCiz = (ucY, kY) => yay.setAttribute('d', `M360,${ucY} Q500,${kY} 640,${ucY}`);
    yayCiz(300, 120);
    const sik = akisEgri(c, sem, motor, {
      cizgiler: [10, 20, 30, 40].map((d) => [[270, 300 - d], ...yayNoktalari([360, 300], [500, 120], [640, 300]).map(([x, y]) => [x, y - d]), [730, 300 - d]]), hiz: 300,
    });
    const kv = kuvvetHalo(E.kuvvetOku(c, sem, [440, 236], [440, 156], { etiket: [410, 140] }));
    const dusuk = E.basincEtiketi(c, svg, 730, 170, 'dusuk'), yuksek = E.basincEtiketi(c, svg, 730, 400, 'yuksek');
    gizle(ust.g, alt.g, sik.g);

    await par(c.say('Açık şemsiyenin üst yüzeyi bombedir; rüzgâr onun üstünden geçer.'), belir(c, [ust.g, alt.g], 400));
    await par(c.say('Üstteki havanın sürati artar; alttaki hava daha yavaş akar.'), belir(c, sik.g, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Şemsiyenin üst yüzeyindeki basınç, alt yüzeydekine göre nasıl olur?',
      options: ['Daha büyük', 'Aynı', 'Daha küçük'], answer: 2,
      hints: ['Hızlı akan havada basınç azalır.', 'Üstte sürat büyük.', ''],
      right: 'Evet. Üstte sürat büyük, basınç küçük.',
    });
    c.clearSay();
    await par(c.say('Üst yüzeyde basınç daha küçük, alt yüzeyde daha büyük.'), belir(c, [dusuk, yuksek], 400));
    await par(c.say('Alt yüzeydeki basınç büyük: şemsiyeyi yukarı iten kuvvet doğar.'),
      par(belir(c, kv, 400), kaydir(c, sem, 0, 0, 0, -20, 500)));
    // Sınır aşılınca şemsiye ters döner: uçlar yukarı, tepe aşağı.
    await par(c.say('Rüzgârın sürati sınırı aşarsa şemsiye ters dönüyor.'),
      c.tween(900, (e) => yayCiz(lerp(300, 250, e), lerp(120, 410, e)), ease.inOut),
      belir(c, [sik.g, kv], 700, 0.25));
  }

  /* ---- 3. Yan yana araçlar ---- */
  async function araclar(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    const kamyon = c.S('g', {}, svg), oto = c.S('g', {}, svg);
    c.S('rect', { x: 240, y: 130, width: 260, height: 100, rx: 4, fill: GOVDE }, kamyon);
    c.S('rect', { x: 500, y: 130, width: 80, height: 100, rx: 4, fill: KOYU }, kamyon);
    c.S('rect', { x: 330, y: 330, width: 200, height: 70, rx: 10, fill: '#3a4a7a', stroke: BEYAZ, 'stroke-width': 3 }, oto);
    const kvK = kuvvetHalo(E.kuvvetOku(c, kamyon, [370, 232], [370, 292], { etiket: [352, 268], hiza: 'end' }));
    const kvO = ok(c, oto, [430, 328], [430, 268], RENK.kuvvet, 6);
    gizle(kvO.g);
    // Hava araçlara göre sola akar.
    const sik9 = E.akisDemeti(c, svg, motor, { P: [940, 240], Q: [60, 240], n: 9, ara: [0, 10], hiz: 300 });
    const sik6 = E.akisDemeti(c, svg, motor, { P: [940, 245], Q: [60, 245], n: 6, ara: [0, 10], hiz: 300 });
    const ust = E.akisDemeti(c, svg, motor, { P: [940, 70], Q: [60, 70], n: 2, ara: [0, 30], hiz: 100 });
    const alt = E.akisDemeti(c, svg, motor, { P: [940, 430], Q: [60, 430], n: 3, ara: [0, 30], hiz: 100 });
    const e1 = etiketP(c, svg, 760, 280, 'dusuk', 'P₁'), e2 = etiketP(c, svg, 760, 70, 'yuksek', 'P₀'), e3 = etiketP(c, svg, 760, 450, 'yuksek', 'P₀');
    const fark = yazi(c, svg, 500, 534, 'P₀ > P₁', { size: 28, kalin: 700, renk: RENK.basinc });
    gizle(sik9.g, sik6.g, ust.g, alt.g, fark);
    // Kuvvet okları ve düşük basınç etiketi akış çizgilerinin üstünde durur.
    svg.appendChild(kvK); svg.appendChild(kvO.g);
    e1[0].insertBefore(c.S('rect', { x: 671, y: 261, width: 178, height: 38, rx: 10, fill: ZEMIN }, e1[0]), e1[0].firstChild);

    await par(c.say('Yüksek süratle giden iki araç yan yana geliyor.'), belir(c, [kamyon, oto], 450));
    await par(c.say('Araçların arasından geçen havanın sürati artıyor; çizgiler sıklaşıyor.'), belir(c, sik9.g, 400));
    await par(c.say('Dış taraftaki hava daha yavaş akıyor; çizgiler seyrek.'), belir(c, [ust.g, alt.g], 400));
    await c.choice({
      tag: 'Sıra sende', q: 'Araçların arasındaki basınç, dış taraflardaki basınca göre nasıldır?',
      options: ['Daha büyüktür', 'Aynıdır', 'Daha küçüktür'], answer: 2,
      hints: ['Hızlı akan havada basınç düşer.', 'Arada hava hızlı akıyor.', ''],
      right: 'Evet. Arada sürat büyük, basınç küçük.',
    });
    c.clearSay();
    await par(c.say('Dıştaki basınç P₀, aradaki P₁: P₀ büyüktür P₁.', { speak: 'Dıştaki basınç P sıfır, aradaki P bir: P sıfır büyüktür P bir.' }),
      belir(c, [...e1, ...e2, ...e3, fark], 450));
    await par(c.say('Dıştaki yüksek basınç araçları birbirine doğru itiyor.'),
      belir(c, [kvK, kvO.g], 400),
      (async () => {
        await c.wait(300);
        await par(kaydir(c, kamyon, 0, 0, 0, 15, 800), kaydir(c, kvK, 0, 0, 0, 15, 800), kaydir(c, oto, 0, 0, 0, -15, 800), kaydir(c, kvO.g, 0, 0, 0, -15, 800), belir(c, sik9.g, 800, 0), belir(c, sik6.g, 800));
        sik9.kaldir();
      })());
    await c.say('Bu etki, yüksek süratlerde ve dar şeritlerde daha belirgindir.');
  }

  /* ---- 4. Sprey ---- */
  async function sprey(c) {
    const svg = c.svg(1000, 562);
    const sise = c.S('g', {}, svg);
    const hava = c.S('rect', { x: 382, y: 270, width: 136, height: 130, fill: RENK.basinc, 'fill-opacity': 0.2 }, sise);
    c.S('rect', { x: 382, y: 400, width: 136, height: 100, fill: RENK.sivi, 'fill-opacity': 0.35 }, sise);
    c.S('path', { d: 'M380,270 L380,500 L520,500 L520,270 L470,270 L470,230 L490,230 L490,190 L410,190 L410,230 L430,230 L430,270 Z', fill: 'none', stroke: KENAR, 'stroke-width': 4, 'stroke-linejoin': 'round' }, sise);
    // Boru: dip borusu yukarı çıkar, başlıktan sağa uzanır, dar delikle biter.
    const boru = c.S('g', {}, svg);
    c.S('path', { d: 'M450,495 L450,210 L540,210', fill: 'none', stroke: KENAR, 'stroke-width': 12 }, boru);
    c.S('path', { d: 'M450,495 L450,210 L540,210', fill: 'none', stroke: ZEMIN, 'stroke-width': 8 }, boru);
    c.S('path', { d: 'M540,210 L560,210', fill: 'none', stroke: KENAR, 'stroke-width': 8 }, boru);
    c.S('path', { d: 'M540,210 L560,210', fill: 'none', stroke: ZEMIN, 'stroke-width': 4 }, boru);
    const LA = 375, LB = 20;
    const suA = c.S('path', { d: 'M450,495 L450,210 L540,210', fill: 'none', stroke: RENK.sivi, 'stroke-width': 8, 'stroke-opacity': 0.85 }, boru);
    const suB = c.S('path', { d: 'M540,210 L560,210', fill: 'none', stroke: RENK.sivi, 'stroke-width': 4, 'stroke-opacity': 0.85 }, boru);
    const suYaz = (v) => { suA.setAttribute('stroke-dasharray', `${Math.min(v, LA)} 1000`); suB.setAttribute('stroke-dasharray', `${Math.max(0, v - LA)} 1000`); };
    suYaz(95);
    // Pompa düğmesi ve üstündeki kuvvet oku birlikte iner.
    const pompa = c.S('g', {}, svg);
    c.S('rect', { x: 430, y: 150, width: 40, height: 40, rx: 6, fill: GOVDE }, pompa);
    const kv = E.kuvvetOku(c, pompa, [450, 100], [450, 160]);
    const yuksek = E.basincEtiketi(c, svg, 250, 330, 'yuksek');
    const bag = cizgi(c, svg, [350, 330], [405, 330], RENK.gri, 3);
    const dusuk = E.basincEtiketi(c, svg, 730, 150, 'dusuk');
    const cikis = ok(c, svg, [570, 210], [630, 210], BEYAZ, 5), cikisEt = yazi(c, svg, 600, 186, 'sürat', { size: 22, kalin: 600, renk: BEYAZ });
    const damla = c.S('g', {}, svg);
    const dm = Array.from({ length: 12 }, (_, i) => {
      const a = (-12 + (24 * i) / 11) * (Math.PI / 180), d = 170 + 30 * ((i % 3) - 1);
      return { el: c.S('circle', { cx: 560, cy: 210, r: 4, fill: RENK.sivi }, damla), x: 560 + d * Math.cos(a), y: 210 + d * Math.sin(a) };
    });
    gizle(sise, boru, pompa, hava, bag, cikis.g, cikisEt, damla);
    gizle(kv);

    await par(c.say('Sprey şişesinin pompasına basınca şişenin içindeki basınç artıyor.'), (async () => {
      await belir(c, [sise, boru, pompa], 450);
      await belir(c, kv, 350);
      await kaydir(c, pompa, 0, 0, 0, 20, 300);
      await par(belir(c, hava, 400, 1), belir(c, [yuksek, bag], 400));
    })());
    await par(c.say('Yüksek basınç, sıvıyı borudan yukarı, küçük çıkış deliğine itiyor.'), (async () => {
      await c.tween(600, (e) => suYaz(lerp(95, 285, e)), ease.inOut);
      await c.tween(400, (e) => suYaz(lerp(285, 395, e)), ease.linear);
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'Sıvı küçük delikten geçerken sürati ve basıncı nasıl değişir?',
      options: ['Sürati azalır, basıncı artar', 'Sürati artar, basıncı da artar', 'Sürati artar, basıncı azalır'], answer: 2,
      hints: ['Delik küçük: kesit alanı daraldı.', 'Sürati artan akışkanın basıncı azalır.', ''],
      right: 'Evet. Dar yerde sürat artar, basınç azalır.',
    });
    c.clearSay();
    await par(c.say('Küçük delikten geçen sıvının sürati arttı, basıncı azaldı.'), belir(c, [cikis.g, cikisEt, dusuk], 400));
    await par(c.say('Sıvı fışkırıp havada ince bir sise dağılıyor.'), (async () => {
      belir(c, damla, 100);
      await c.tween(800, (e) => dm.forEach((q) => { q.el.setAttribute('cx', lerp(560, q.x, e)); q.el.setAttribute('cy', lerp(210, q.y, e)); }), ease.out);
      await belir(c, damla, 400, 0.3);
    })());
    await c.say('Sprey, sıvıyı yükselten bir Bernoulli İlkesi örneğidir.');
  }

  /* ---- 5. Yelken ---- */
  async function yelken(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    c.S('path', { d: 'M500,180 Q560,300 548,410 Q535,486 500,484 Q465,486 452,410 Q440,300 500,180 Z', fill: 'none', stroke: KENAR, 'stroke-width': 4, 'stroke-linejoin': 'round' }, svg);
    const kum = yayNoktalari([500, 270], [556, 305], [560, 370]);
    const n = [0.86, -0.51];
    // Rüzgâr soldan eser: rüzgârın geldiği (sol alt) yüzde seyrek, öteki yüzde sıkışık çizgiler.
    const seyrek = akisEgri(c, svg, motor, {
      cizgiler: [12, 42, 72].map((d) => {
        const nk = kum.map(([x, y]) => [x - n[0] * d, y - n[1] * d]);
        return [[60, nk[0][1]], ...nk, [720, nk[nk.length - 1][1]]];
      }), hiz: 100,
    });
    const sikc = akisEgri(c, svg, motor, {
      cizgiler: [10, 20, 30, 40].map((d) => {
        const nk = kum.map(([x, y]) => [x + n[0] * d, y + n[1] * d]);
        return [[400, nk[0][1]], ...nk, [720, nk[nk.length - 1][1]]];
      }), hiz: 300,
    });
    c.S('path', { d: 'M500,270 Q556,305 560,370', fill: 'none', stroke: BEYAZ, 'stroke-width': 6, 'stroke-linecap': 'round' }, svg);
    const dusuk = E.basincEtiketi(c, svg, 740, 300, 'dusuk'), yuksek = E.basincEtiketi(c, svg, 290, 360, 'yuksek');
    const kv = kuvvetHalo(E.kuvvetOku(c, svg, [530, 320], [599, 279], { etiket: [612, 262], hiza: 'start' }));
    gizle(seyrek.g, sikc.g);

    await par(c.say('Yelkenli teknede rüzgâr yelkenin iki yanından geçiyor.'), belir(c, [seyrek.g, sikc.g], 450));
    await par(c.say('Rüzgârın sürati arttıkça yelkene uygulanan hava basıncı azalıyor.'), belir(c, dusuk, 400));
    await par(c.say('Yelkenin diğer tarafındaki hava basıncı daha yüksektir.'), belir(c, yuksek, 400));
    await par(c.say('Bu fark, yelkenlinin ilerlemesine yardımcı olur.'), belir(c, kv, 400));
  }

  /* ---- 6. Yarış arabasının arka kanadı ---- */
  async function kanat(c) {
    const svg = c.svg(1000, 562);
    const motor = E.akisMotoru(c);
    cizgi(c, svg, [60, 492], [940, 492], RENK.gri, 3);
    c.S('polygon', { points: '260,440 300,380 720,380 720,440', fill: GOVDE, 'stroke-linejoin': 'round' }, svg);
    [350, 640].forEach((x) => c.S('circle', { cx: x, cy: 460, r: 32, fill: '#18213f', stroke: KENAR, 'stroke-width': 5 }, svg));
    cizgi(c, svg, [660, 316], [660, 380], KENAR, 4); cizgi(c, svg, [700, 316], [700, 380], KENAR, 4);
    c.S('path', { d: 'M630,290 Q685,354 740,290 Z', fill: KENAR }, svg);
    // Araç sola gider; hava soldan sağa akar. Bombeli yüz altta: altta çizgiler sıkışık.
    const sik = E.akisDemeti(c, svg, motor, { P: [580, 332], Q: [880, 332], n: 4, ara: [0, 10], hiz: 300 });
    const seyrek = E.akisDemeti(c, svg, motor, { P: [60, 218], Q: [940, 218], n: 2, ara: [0, 30], hiz: 100 });
    const dusuk = E.basincEtiketi(c, svg, 480, 320, 'dusuk'), yuksek = E.basincEtiketi(c, svg, 685, 190, 'yuksek');
    const kv = kuvvetHalo(E.kuvvetOku(c, svg, [680, 296], [680, 376], { etiket: [680, 278] }));
    gizle(sik.g, seyrek.g);

    await c.say('Yarış arabalarında yol tutuşu artırmak için arka kanat kullanılır.');
    await c.say('Arka kanat, ters çevrilmiş bir uçak kanadına benzer.');
    await par(c.say('Bombeli yüzey altta olduğundan, alttaki havanın sürati artar.'), belir(c, [sik.g, seyrek.g], 450));
    await c.say('Altta basınç azalır; üstteki basınç daha büyük kalır.');
    await c.choice({
      tag: 'Sıra sende', q: 'Kanadın üstündeki basınç, altındakine göre nasıldır?',
      options: ['Daha küçüktür', 'Aynıdır', 'Daha büyüktür'], answer: 2,
      hints: ['Hangi tarafta hava daha hızlı akıyor?', 'Sürati artan yerde basınç azalır.', ''],
      right: 'Evet. Üstte basınç daha büyük.',
    });
    c.clearSay();
    await par(c.say('Üstte basınç daha büyük, altta daha küçük.'), belir(c, [dusuk, yuksek], 400));
    await par(c.say('Fark kanadı aşağı bastırır; araba süratle giderken havalanmaz.'), belir(c, kv, 400));
  }

  /* ---- 7. Uçak ---- */
  async function ucak(c) {
    const svg = c.svg(1000, 562);
    const govde = c.S('g', {}, svg);
    c.S('path', { d: 'M380,298 L560,290 Q622,296 626,310 Q622,326 560,330 L380,330 Z', fill: GOVDE }, govde);
    c.S('polygon', { points: '380,300 376,258 408,258 420,300', fill: GOVDE }, govde);
    c.S('polygon', { points: '470,328 548,328 516,376 462,376', fill: GOVDE }, govde);
    govde.style.opacity = 0.5;
    const A = (P, Q, renk) => ok(c, svg, P, Q, renk, 6);
    const aG = A([500, 310], [500, 400], RENK.kuvvet), aK = A([500, 310], [500, 220], RENK.kaldirma), aS = A([500, 310], [410, 310], RENK.kuvvet), aI = A([500, 310], [590, 310], RENK.kuvvet);
    const yG = yazi(c, svg, 500, 436, 'ağırlık', { size: 24, kalin: 700, renk: RENK.kuvvet }), yK = yazi(c, svg, 500, 204, 'kaldırma', { size: 24, kalin: 700, renk: RENK.kaldirma });
    const yS = yazi(c, svg, 385, 356, 'sürükleme', { size: 24, kalin: 700, renk: RENK.kuvvet }), yI = yazi(c, svg, 600, 356, 'itme', { size: 24, kalin: 700, renk: RENK.kuvvet });
    gizle(aG.g, aK.g, aS.g, aI.g, yG, yK, yS, yI);
    await par(c.say('Uçakta Bernoulli İlkesi’nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri etkilidir.'), (async () => {
      await belir(c, [aG.g, yG], 400); await c.wait(500);
      await belir(c, [aK.g, yK], 400); await c.wait(500);
      await belir(c, [aS.g, yS], 400); await c.wait(500);
      await belir(c, [aI.g, yI], 400);
    })());
  }

  /* ---- 8. Ortak olan, olmayan ---- */
  async function ortak(c) {
    const svg = c.svg(1000, 562);
    const XS = [40, 360, 680], YS = [60, 280];
    const paneller = SIRA.map((tur, i) => {
      const P = PANEL[tur], pg = c.S('g', { transform: `translate(${XS[i % 3]},${YS[Math.floor(i / 3)]})` }, svg);
      const govde = c.S('g', {}, pg);
      kutu(c, govde, 0, 0, 280, 190, { rx: 12 });
      yazi(c, govde, 14, 32, P.ad, { hiza: 'start', size: 24, kalin: 700 });
      MINI[tur](c, govde);
      const et = E.basincEtiketi(c, pg, P.et[0], P.et[1], 'dusuk', { kisa: true });
      const oklar = P.oklar.map(([a, b]) => { const o = ok(c, pg, a, b, RENK.kuvvet, 5); gizle(o.g); return o.g; });
      gizle(govde);
      return { pg, govde, et, oklar };
    });
    const alt = renkli(c, svg, 500, 520, ['cisim ', ['düşük basınca', RENK.basinc], ' doğru itilir'], { size: 28, kalin: 700 });
    gizle(alt);
    const vurgu = async (idx) => { for (let i = 0; i < 6; i++) belir(c, paneller[i].pg, 400, idx.includes(i) ? 1 : 0.35); await c.wait(420); };
    const hepsi = () => par(...paneller.map((q) => belir(c, q.pg, 400, 1)));

    await par(c.say('Altı örnekte de akışkanın sürati bir yerde artıyor; orada basınç düşüyor.'),
      belir(c, [...paneller.map((q) => q.govde), ...paneller.map((q) => q.et)], 450));
    await par(c.say('Her örnekte cisim, düşük basınçlı tarafa doğru itiliyor.'),
      belir(c, [...paneller.flatMap((q) => q.oklar), alt], 450));
    await c.say('Ortak olan: basınç farkı. Farklı olan: kuvvetin yönü ve amacı.', { speak: '[thoughtful] Ortak olan: basınç farkı. Farklı olan: kuvvetin yönü ve amacı.' });
    await par(c.say('Çatıda ve şemsiyede kuvvet yukarıdır: cisim havaya kalkıyor.'), vurgu([0, 1]));
    await par(c.say('Arka kanatta kuvvet aşağıdır: araba havalanmıyor.'), vurgu([2]));
    await par(c.say('Yelkende ve yan yana araçlarda hareketin yönü değişiyor.'), vurgu([3, 4]));
    await par(c.say('Spreyde sıvı, düşük basınçlı çıkışa doğru yükseliyor.'), vurgu([5]));
    c.clearSay();
    await hepsi();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi örnekte basınç farkı cismi aşağı doğru bastırır?',
      options: ['Fırtınada çatıda', 'Açık şemsiyede', 'Yarış arabasının arka kanadında'], answer: 2,
      hints: ['Kuvvet, düşük basınçlı tarafa doğrudur.', 'Arka kanatta düşük basınç altta.', ''],
      right: 'Evet. Arka kanatta kuvvet aşağı doğru.',
    });
    c.clearSay();
    await par(c.say('Arka kanatta kuvvet aşağı doğrudur: araba yere bastırılır.'), vurgu([2]));
    c.note('<b>Sürat artarsa basınç düşer; cisim düşük basınca itilir.</b><br>Örnek: çatı.', 'Bernoulli İlkesi', 'bernoulli');
  }

  /* ---- 9. Amaca göre sınıflandır ---- */
  async function sinif(c) {
    const svg = c.svg(1000, 562);
    const KX = [40, 275, 510, 745], KUTU = [['Havaya', 'kaldırma'], ['Havalanmasını', 'engelleme'], ['Yön', 'değiştirme'], ['Sıvıyı', 'yükseltme']];
    const adlar = KUTU.map((b, i) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, KX[i], 50, 215, 72, { rx: 10 });
      yazi(c, g, KX[i] + 107.5, 82, b[0], { size: 22, kalin: 700, renk: RENK.basinc });
      yazi(c, g, KX[i] + 107.5, 108, b[1], { size: 22, kalin: 700, renk: RENK.basinc });
      return g;
    });
    const sayac = [0, 0, 0, 0];
    const cerceve = kutu(c, svg, 350, 230, 300, 180, { rx: 12 });
    const sahne = c.S('g', {}, svg);
    let kart = null, baslik = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      const ic = c.S('g', { transform: 'translate(374,218) scale(0.9)' }, kart);
      MINI[k.tur](c, ic);
      baslik = yazi(c, sahne, 500, 440, k.ad, { size: 26, kalin: 700 });
      gizle(kart, baslik);
      await belir(c, [kart, baslik], 350);
    };
    // Kart yerinde küçülüp söner; adı kutunun altında belirir.
    const yerlestir = async (k) => {
      const el = kart, bs = baslik;
      await c.tween(400, (e) => {
        el.setAttribute('transform', `translate(500,320) scale(${lerp(1, 0.6, e)}) translate(-500,-320)`);
        el.style.opacity = 1 - e; bs.style.opacity = 1 - e;
      }, ease.in);
      el.remove(); bs.remove();
      const ad = yazi(c, adlar[k.kutu], KX[k.kutu] + 107.5, 158 + 30 * sayac[k.kutu], k.kisa, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300);
      sayac[k.kutu]++;
    };
    const KARTLAR = [
      { tur: 'cati', ad: 'Çatı', kisa: 'Fırtınada çatı', uzun: 'Fırtınada çatının uçması', kutu: 0, neden: 'Evet. Kuvvet yukarı; çatı havaya kalkıyor.' },
      { tur: 'semsiye', ad: 'Şemsiye', kisa: 'Şemsiye', uzun: 'Şemsiyenin rüzgârda ters dönmesi', kutu: 0, neden: 'Evet. Kuvvet yukarı; şemsiye kalkıyor.' },
      { tur: 'kanat', ad: 'Arka kanat', kisa: 'Arka kanat', uzun: 'Yarış arabasının arka kanadı', kutu: 1, neden: 'Evet. Kuvvet aşağı; araba havalanmıyor.' },
      { tur: 'yelken', ad: 'Yelken', kisa: 'Yelken', uzun: 'Yelkenin tekneye etkisi', kutu: 2, neden: 'Evet. Kuvvet tekneyi ilerleme yönünde etkiliyor.' },
      { tur: 'araclar', ad: 'Yan yana araçlar', kisa: 'Yan yana araçlar', uzun: 'Yan yana araçların birbirine yaklaşması', kutu: 2, neden: 'Evet. Araçlar birbirine doğru çekiliyor.' },
      { tur: 'sprey', ad: 'Sprey', kisa: 'Sprey', uzun: 'Spreyde sıvının çıkışa gitmesi', kutu: 3, neden: 'Evet. Sıvı, düşük basınçlı çıkışa doğru yükseliyor.' },
    ];
    gizle(cerceve);
    await belir(c, cerceve, 300);
    await sinifla(c, {
      tag: 'Dene', kutular: ['Havaya kaldırma', 'Havalanmasını engelleme', 'Yön değiştirme', 'Sıvıyı yükseltme'],
      kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Kuvvet cismi hangi yöne itiyor, ona bak.' }, k)),
      soru: (k) => `${k.uzun}, hangi amaca hizmet eder?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    c.clearSay();
    await par(c.say('Amaçlar ayrı olsa da hepsinde aynı ilke işliyor.'), belir(c, cerceve, 400, 0));
    const son = yazi(c, svg, 500, 330, 'Hava nerede hızlıysa cisim oraya çekilir.', { size: 32, kalin: 700 });
    gizle(son);
    await par(c.say('Hava nerede hızlıysa cisim oraya çekilir.', { speak: '[short pause] Hava nerede hızlıysa cisim oraya çekilir.' }), belir(c, son, 450));
  }

  Ders.start({
    id: 'akiskanlar-e2', kicker: 'Konu E · Bernoulli İlkesi', title: 'Bernoulli her yerde', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Bernoulli her yerde',
      hook: 'Fırtınada bir çatı aşağı bastırılmak yerine neden yukarı doğru kalkıp uçar?',
      button: 'Derse başla ›',
    },
    goals: [
      'Çatı, şemsiye, yan yana araçlar, sprey, yelken ve arka kanadı sürat–basınç ilişkisiyle açıklar.',
      'Cismin düşük basınçlı tarafa doğru itildiğini söyler.',
      'Bu örnekleri havaya kaldırma, havalanmasını engelleme, yön değiştirme ve sıvıyı yükseltme diye ayırır.',
      'Uçakta Bernoulli İlkesi’nin yanında başka kuvvetlerin de etkili olduğunu söyler.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Sürat–basınç ilişkisini ve basınç farkından doğan kuvvetin yönünü hatırla.', run: hatirla },
      { title: 'Fırtınada çatı', goal: 'Çatının neden yukarı doğru kalkıp uçtuğunu açıkla.', run: cati },
      { title: 'Şemsiye', goal: 'Rüzgârda şemsiyenin neden yukarı kalktığını bul.', run: semsiye },
      { title: 'Yan yana araçlar', goal: 'Yan yana giden araçların neden birbirine doğru itildiğini bul.', run: araclar },
      { title: 'Sprey', goal: 'Spreyde sıvının neden yükseldiğini açıkla.', run: sprey },
      { title: 'Yelken', goal: 'Yelkenin tekneye nasıl yardım ettiğini gör.', run: yelken },
      { title: 'Yarış arabasının arka kanadı', goal: 'Arka kanadın arabayı neden yere bastırdığını bul.', run: kanat },
      { title: 'Uçak', goal: 'Uçakta etkili olan kuvvetleri tanı.', run: ucak },
      { title: 'Ortak olan, olmayan', goal: 'Altı örnekte ortak olanı ve farklı olanı ayır.', run: ortak },
      { title: 'Amaca göre sınıflandır', goal: 'Örnekleri kuvvetin amacına göre ayır.', run: sinif },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Fırtınada bir çatı neden yukarı kalkar?',
        options: ['Rüzgâr çatıyı alttan doğrudan yukarı iter', 'Çatının üstündeki basınç evin içindekinden büyüktür', 'Üstteki hava hızlıdır, basınç düşüktür; içerideki basınç büyüktür'], answer: 2,
        why: ['Rüzgâr çatıyı alttan itmez; çatıyı kaldıran basınç farkıdır.', 'Tersi doğru: üstteki basınç, içerideki basınçtan küçüktür.', 'Üstte sürat büyük, basınç küçük; içeride basınç büyük. Fark çatıyı yukarı iter.'], scene: 1 },
      { q: 'Pencere açıkken dışarıda rüzgâr esiyor ve perde dışarı doğru çıkıyor. Neden?',
        options: ['Dışarıdaki hızlı havada basınç düşük, içerideki basınç büyüktür', 'Dışarıdaki hava durgundur, basıncı düşüktür', 'Odanın içindeki basınç dışarıdakinden küçüktür'], answer: 0,
        why: ['Dışarıda sürat büyük, basınç küçük; perde küçük basınca doğru itilir.', 'Durgun havada basınç düşmez; düşük basıncı akan hava yapar.', 'Perde dışarı çıktığına göre dışarıdaki basınç küçüktür, içeridekinden büyük olamaz.'], scene: 1 },
      { q: 'Bir yarış arabasında arka kanat, bombeli yüzü üstte kalacak biçimde ters takılıyor. Kanat aracı nasıl etkiler?',
        options: ['Aşağı doğru kuvvet doğurur; araç yere daha çok basar', 'Yukarı doğru kuvvet doğurur; araç yere daha az basar', 'Hiçbir kuvvet doğurmaz; hava akışı değişmez'], answer: 1,
        why: ['Bombeli yüz altta olsaydı böyle olurdu; şimdi üstte.', 'Bombeli yüz üstte: üstte sürat büyük, basınç küçük. Kuvvet yukarı doğru olur.', 'Üst ve alt yüzdeki hava farklı süratle akar; basınç farkı kuvvet doğurur.'], scene: 6 },
      { q: 'Spreyde sıvı küçük delikten geçerken ne olur?',
        options: ['Sürati artar, basıncı azalır', 'Sürati azalır, basıncı artar', 'Sürati ve basıncı değişmez'], answer: 0,
        why: ['Dar delikte sürat artar; sürati artan akışkanın basıncı azalır.', 'Delik daralınca sürat azalmaz, artar.', 'Kesit alanı daralınca sürat değişir; basınç da onunla birlikte değişir.'], scene: 4 },
      { q: 'Uçaklar için hangisi doğrudur?',
        options: ['Uçmayı yalnızca Bernoulli İlkesi açıklar', 'Bernoulli İlkesi uçmayı hiç etkilemez', 'Bernoulli İlkesi’nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri de etkilidir'], answer: 2,
        why: ['Uçakta başka kuvvetler de etkilidir; yalnızca Bernoulli İlkesi yetmez.', 'Bernoulli İlkesi uçakta etkili olan unsurlardan biridir.', 'Uçakta ağırlık, kaldırma, sürükleme ve itme kuvvetleri birlikte etkilidir.'], scene: 7 },
    ],
    summary: [
      'Hızlı akan akışkanda basınç düşer; cisim düşük basınca doğru itilir.',
      'Çatı, şemsiye, yan yana araçlar, sprey, yelken ve arka kanat aynı ilkeyle açıklanır.',
      'Uçakta Bernoulli İlkesi’nin yanında başka kuvvetler de etkilidir.',
      '<b>Hava nerede hızlıysa cisim oraya çekilir.</b>',
    ],
    nextLesson: { href: 'e3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
