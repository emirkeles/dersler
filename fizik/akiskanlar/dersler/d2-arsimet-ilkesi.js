/* D2 — Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır
   Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir (Arşimet İlkesi); model: F_k = V_b · d_s · g.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md (D2). Taşırma düzeneği (taşırma kabı, boru, toplama kabı, tartı,
   damla) bu dosyada yazılıdır; dinamometre, ip, cisim ve oklar d-araclar.js içindedir. Sayılar örnek veridir (F_k = V_b · d_s · g ile hesaplandı). */
(() => {
  'use strict';
  const { RENK, sayi, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, onay, tablo, tahminAl, sinifla } = window.KIT;
  const { ton, FK, okumaDeger, kap: kapKit, dinamometre, cisim, kuvvetOku, duzenek } = window.KIT_D;
  const { lerp, ease } = Ders;
  const KAP = '#c3cbea', ZEMIN = '#10162b', VB = RENK.cizgi, NB = ' ';
  const N = (v) => sayi(+(+v).toFixed(2)) + ' N';
  const anahtar = (s) => (s ? 'x' : 'su');

  /* Seçilen hipotez (sahne 2); sahne 3'te sınanır. 0: eşit, 1: büyük, 2: ilişki yok. */
  let hipotez = null;

  /* Renkli parçalardan tek satır; parçalar üs ve indis taşıyabilir ('V_{b}'). Alt indisle biten parçanın arkasına NB konur. */
  function mr(c, p, x, y, parcalar, o = {}) {
    const t = yazi(c, p, x, y, '', o);
    parcalar.forEach((q) => {
      const [m, r] = Array.isArray(q) ? q : [q, null];
      const ts = c.S('tspan', {}, t); Ders.mathText(ts, m); if (r) ts.style.fill = r;
    });
    return t;
  }

  /* Başlıkları iki satır olabilen tablo ('Batan hacim\n(m³)'); başlık satırı da satır yüksekliğindedir. */
  function tabloKur(c, p, o) {
    const h = o.h || 56, hs = o.hsize || 22;
    const t = tablo(c, p, { x: o.x, y: o.y, satir: o.satir, h, size: o.size || 22, sutunlar: o.sutunlar.map((k) => ({ ad: '', w: k.w })) });
    const xs = []; let x = o.x;
    o.sutunlar.forEach((k) => { xs.push(x + k.w / 2); x += k.w; });
    o.sutunlar.forEach((k, j) => {
      const renk = k.renk || RENK.yazi;
      if (k.math) { yazi(c, t.g, xs[j], o.y + h / 2 + hs * 0.36, k.math, { size: hs, kalin: 700, renk, math: true }); return; }
      const L = k.ad.split('\n'), b1 = o.y + h / 2 - 4;
      L.forEach((m, q) => yazi(c, t.g, xs[j], L.length === 1 ? o.y + h / 2 + hs * 0.36 : b1 + q * (hs + 2), m, { size: hs, kalin: 700, renk }));
    });
    t.xs = xs;
    t.yy = (i) => o.y + h * (i + 1) + h / 2 + (o.size || 22) * 0.36;
    return t;
  }

  /* ---- Taşırma düzeneği ----
     Taşırma kabı x 120-420 (üst y 240, taban 540, su yüzeyi 280); boru (420, 280) → (520, 310); toplama kabı x 470-590, y 400-500;
     tartı x 450-610, y 500-540. Dinamometre düzeneği 180 sola kaydırılmıştır (ip x = 270). Toplama kabında dilim başına 15 birim su. */
  function tasirma(c, p, o = {}) {
    const n0 = o.dilim || 0;
    const g = c.S('g', {}, p);
    const kapG = c.S('g', {}, g);
    const kap = kapKit(c, kapG, { x1: 120, x2: 420, ust: 240, taban: 540, yuzey: 280, yogunluk: 1 });
    const boruG = c.S('g', {}, g);
    cizgi(c, boruG, [418, 280], [520, 310], '#8f9bc4', 14, { 'stroke-linecap': 'butt' });
    const topG = c.S('g', {}, g);
    const su = c.S('rect', { x: 472, y: 500, width: 116, height: 0, fill: RENK.sivi, 'fill-opacity': ton(1) }, topG);
    c.S('path', { d: 'M470,400 L470,500 L590,500 L590,400', fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, topG);
    const tartiG = c.S('g', {}, g);
    c.S('rect', { x: 450, y: 500, width: 160, height: 40, rx: 6, fill: '#18213f', stroke: KAP, 'stroke-width': 3 }, tartiG);
    c.S('rect', { x: 480, y: 505, width: 100, height: 30, rx: 4, fill: ZEMIN, stroke: RENK.ince, 'stroke-width': 2 }, tartiG);
    const ty = yazi(c, tartiG, 530, 527, N(FK.su[n0]), { size: 26, kalin: 700, renk: RENK.kuvvet });
    const etiket = yazi(c, g, 604, 470, 'taşan su', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    const d = duzenek(c, g, { dx: -180, dilim: n0, okuma: okumaDeger(n0, 0) });
    d.kap.g.remove();

    let lv = 15 * n0, tv = FK.su[n0], td = 1;
    const lvYaz = (h) => { lv = h; su.setAttribute('y', 500 - h); su.setAttribute('height', h); };
    const tvYaz = (v) => { tv = v; ty.textContent = N(v); };
    lvYaz(lv);
    return {
      g, kapG, boruG, topG, tartiG, etiket, d, kap, ty,
      seviye(n, ms = 600) {
        const a = lv, b = 15 * n;
        if (!ms) { lvYaz(b); return Promise.resolve(); }
        return c.tween(ms, (e) => lvYaz(lerp(a, b, e)), ease.out);
      },
      tartiOku(v, ms = 600) {
        const a = tv;
        if (!ms) { tvYaz(v); return Promise.resolve(); }
        return c.tween(ms, (e) => tvYaz(lerp(a, v, e)), ease.out);
      },
      yogunluk(dd, ms = 600) {
        const a = td; td = dd;
        if (!ms) { su.setAttribute('fill-opacity', ton(dd)); return kap.yogunluk(dd, 0); }
        return par(kap.yogunluk(dd, ms), c.tween(ms, (e) => su.setAttribute('fill-opacity', lerp(ton(a), ton(dd), e)), ease.inOut));
      },
      async yanip() {
        for (let i = 0; i < 2; i++) { ty.style.opacity = 0; await c.wait(200); ty.style.opacity = 1; await c.wait(200); }
      },
    };
  }

  /* Boru ucundan toplama kabına düşen mavi damla: 400 ms, `in`, 90 birim. */
  async function damla(c, t) {
    const e = c.S('circle', { cx: 520, cy: 322, r: 7, fill: RENK.sivi, 'fill-opacity': 0.9 }, t.g);
    await c.tween(400, (x) => e.setAttribute('cy', 322 + 90 * x), ease.in);
    e.remove();
  }
  const damlalar = (c, t, k) => Promise.all(Array.from({ length: k }, (_, i) => c.wait(i * 250).then(() => damla(c, t))));

  /* Cisim n0'dan n1 dilime iner: damlalar düşer, tartı ve toplama kabı dolar, dinamometre okuması düşer. */
  async function tasir(c, t, n0, n1, sivi = 0, ms = 600) {
    await par(
      t.d.dilim(n1, ms), t.d.oku(okumaDeger(n1, sivi), ms + 300), damlalar(c, t, n1 - n0),
      (async () => { await c.wait(350); await par(t.tartiOku(FK[anahtar(sivi)][n1], 600), t.seviye(n1, 600)); })(),
    );
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Birinci soru: tamamen batık cisim, derinlik cetveli.
    const s1 = c.S('g', {}, svg);
    const dg = c.S('g', { transform: 'translate(117.5,40) scale(0.85)' }, s1);
    const d = duzenek(c, dg, { dilim: 4, okuma: 5.88, cetvel: true });
    gizle(d.agirlik.g); d.kaldirma.ayarla(39);
    gizle(s1);
    // İkinci soru: aynı derinlikte iki sıvı.
    const s2 = c.S('g', {}, svg);
    kapKit(c, s2, { x1: 150, x2: 430, ust: 170, taban: 480, yuzey: 210, yogunluk: 1 });
    kapKit(c, s2, { x1: 570, x2: 850, ust: 170, taban: 480, yuzey: 210, yogunluk: 2 });
    [[290, 40], [710, 80]].forEach(([x, L]) => {
      c.S('rect', { x: x - 30, y: 346, width: 60, height: 8, rx: 3, fill: '#b7bfd6' }, s2);
      ok(c, s2, [x, 345 - L], [x, 345], RENK.basinc, 5);
    });
    yazi(c, s2, 290, 442, 'd', { size: 34, kalin: 700, renk: RENK.sivi });
    yazi(c, s2, 710, 442, '2d', { size: 34, kalin: 700, renk: RENK.sivi });
    gizle(s2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Tamamen batmış bir cisim daha derine indirilirse kaldırma kuvveti nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 2,
      hints: ['Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.', 'Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.', ''],
      right: 'Evet. Derinlik kaldırma kuvvetini değiştirmez.',
    });
    c.clearSay();
    await par(c.say('Derine inse de kaldırma kuvveti aynı kalır.'), d.git(140, 900));
    c.clearSay();
    await belir(c, s1, 400, 0); s1.remove();
    await belir(c, s2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı derinlikte, bir sıvının yoğunluğu ötekinin iki katı. Basınç nasıl karşılaştırılır?',
      options: ['Aynı', 'Yoğun sıvıda iki katı', 'Yoğun sıvıda yarısı'], answer: 1,
      hints: ['P = h · d · g: yoğunluk iki katına çıkarsa basınç da iki katına çıkar.', '', 'P = h · d · g: yoğunluk iki katına çıkarsa basınç da iki katına çıkar.'],
      right: 'Evet. Yoğun sıvıda basınç iki katıdır.',
    });
    c.clearSay();
    await c.say('Yoğun sıvıda aynı derinlikte basınç iki katıdır.');
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();
    const bu = renkli(c, svg, 500, 292, [['kaldırma kuvveti', RENK.kaldirma], NB + '?' + NB, ['taşan suyun ağırlığı', RENK.kuvvet]], { size: 36, kalin: 700 });
    gizle(bu);
    await par(c.say('Bugün kaldırma kuvvetini taşan suyla karşılaştıracağız.'), belir(c, bu, 450));
  }

  /* ---- 2. Taşırma kabı ve hipotez ---- */
  async function tasirmaKabi(c) {
    const svg = c.svg(1000, 562);
    const t = tasirma(c, svg);
    gizle(t.d.agirlik.g, t.d.kaldirma.g, t.kapG, t.boruG, t.topG, t.tartiG, t.etiket, t.d.g);
    const dash = c.S('rect', { x: 235, y: 280, width: 70, height: 40, fill: RENK.sivi, 'fill-opacity': 0.25, stroke: RENK.sivi, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, svg);
    const yer = yazi(c, svg, 582, 266, 'yeri değişen su', { hiza: 'start', size: 22, kalin: 600, renk: RENK.sivi });
    gizle(dash, yer);

    await par(c.say('Ela, ağzına kadar dolu bir taşırma kabı hazırlıyor.'), belir(c, t.kapG, 500));
    await par(c.say('Borunun altına, tartının üstüne bir kap koyuyor.'), belir(c, [t.boruG, t.topG, t.tartiG, t.etiket], 500));
    await par(c.say('Tartı, kaptaki suyun ağırlığını newton olarak gösteriyor.'), t.yanip());
    await par(c.say('Cisim suya girince kendi hacmi kadar su taşar.'), (async () => { await belir(c, t.d.g, 400); await tasir(c, t, 0, 2); })());
    await par(c.say('Taşan su, cismin yerini değiştirdiği sıvıdır.'), (async () => {
      await belir(c, dash, 300);
      await c.tween(600, (e) => { dash.setAttribute('x', lerp(235, 500, e)); dash.setAttribute('y', lerp(280, 240, e)); }, ease.inOut);
      await belir(c, yer, 300);
    })());
    await par(c.say('Cisim ne kadar çok batarsa o kadar çok su taşar.'), (async () => { await belir(c, [dash, yer], 300, 0); await tasir(c, t, 2, 4); })());
    await c.say('Arşimet de taşan suyun ağırlığını ölçmüştü.');

    c.clearSay();
    hipotez = await tahminAl(c, {
      tag: 'Hipotez kur', q: 'Kaldırma kuvvetinin büyüklüğü ile taşan suyun ağırlığı arasında nasıl bir ilişki bekliyorsun?',
      options: ['Kaldırma kuvveti, taşan suyun ağırlığına eşit olmalı', 'Kaldırma kuvveti, taşan suyun ağırlığından büyük olmalı', 'İkisi arasında bir ilişki yok'],
    });
    await c.say('Hipotezini ölçümle sınayacağız.');
  }

  /* ---- 3. Bir ölçüm (çözülmüş örnek) ---- */
  async function olcum(c) {
    const svg = c.svg(1000, 562);
    const t = tasirma(c, svg);
    gizle(t.d.agirlik.g, t.d.kaldirma.g);
    const dil = yazi(c, svg, 270, 410, 'her dilim: 0,0001 m³', { size: 22, kalin: 600, renk: RENK.soluk });
    const r1a = yazi(c, svg, 800, 150, 'kaldırma kuvveti', { size: 24, kalin: 600, renk: RENK.kaldirma });
    const r1b = yazi(c, svg, 800, 196, '1,96 N', { size: 38, kalin: 700, renk: RENK.kaldirma });
    const esit = yazi(c, svg, 800, 264, '=', { size: 44, kalin: 700 });
    const r2a = yazi(c, svg, 800, 322, 'taşan suyun ağırlığı', { size: 24, kalin: 600, renk: RENK.kuvvet });
    const r2b = yazi(c, svg, 800, 368, '1,96 N', { size: 38, kalin: 700, renk: RENK.kuvvet });
    gizle(t.g, dil, r1a, r1b, esit, r2a, r2b);

    await par(c.say('Ela cismi havada tartıyor: dinamometre 9,8 newton gösteriyor.', { speak: 'Ela cismi havada tartıyor: dinamometre dokuz virgül sekiz newton gösteriyor.' }), belir(c, t.g, 450));
    await par(c.say('Her dilimin hacmi 0,0001 metreküp; iki dilim batık.', { speak: 'Her dilimin hacmi sıfır virgül sıfır sıfır sıfır bir metreküp; iki dilim batık.' }),
      (async () => { await belir(c, dil, 300); await tasir(c, t, 0, 2); })());
    await par(c.say('Dinamometre 7,84 newton gösteriyor; kaldırma kuvveti 1,96 newton.', { speak: 'Dinamometre yedi virgül seksen dört newton gösteriyor; kaldırma kuvveti bir virgül doksan altı newton.' }), belir(c, [r1a, r1b], 400));
    await par(c.say('Tartı, taşan suyun ağırlığını 1,96 newton gösteriyor.', { speak: 'Tartı, taşan suyun ağırlığını bir virgül doksan altı newton gösteriyor.' }), belir(c, [r2a, r2b], 400));
    await par(c.say('Kaldırma kuvveti ile taşan suyun ağırlığı eşit çıktı.'), belir(c, esit, 300));
    // Gör: seçilen hipoteze göre geri bildirim.
    if (hipotez === 0) await c.say('Hipotezin ilk ölçümde tuttu.');
    else if (hipotez != null) await c.say('Hipotezin tutmadı: iki değer eşit çıktı.');
    if (hipotez === 2) await c.say('İkisi de batan hacimle birlikte arttı.');
  }

  /* ---- 4. Ölçümü yinele ---- */
  async function yinele(c) {
    const svg = c.svg(1000, 562);
    const t = tabloKur(c, svg, {
      x: 65, y: 120, satir: 5, h: 56, size: 22,
      sutunlar: [{ ad: 'Batan hacim\n(m³)', w: 240 }, { ad: 'Dinamometre\n(N)', w: 170, renk: RENK.kuvvet },
        { ad: 'Kaldırma kuvveti\n(N)', w: 230, renk: RENK.kaldirma }, { ad: 'Taşan suyun\nağırlığı (N)', w: 230, renk: RENK.kuvvet }],
    });
    const VERI = [['0,0001', '8,82', '0,98', '0,98'], ['0,0002', '7,84', '1,96', '1,96'], ['0,0003', '6,86', '2,94', '2,94'],
      ['0,0004', '5,88', '3,92', '3,92'], ['0,0004 (X sıvısı)', '1,96', '7,84', '7,84']];
    const RK = [null, RENK.kuvvet, RENK.kaldirma, RENK.kuvvet];
    const esit = [];
    VERI.forEach((v, i) => {
      v.forEach((m, j) => t.yaz(i, j, m, RK[j]));
      esit.push(yazi(c, t.satirlar[i].g, 65 + 240 + 170 + 230, t.yy(i), '=', { size: 24, kalin: 700 }));
      gizle(esit[i]);
    });
    const kat = yazi(c, svg, 968, t.yy(3) + 28, '× 2', { size: 24, kalin: 700, renk: RENK.kaldirma });
    gizle(t.g, kat);

    await par(c.say('Ela ölçümü dört farklı batan hacimle yineliyor.'), belir(c, t.g, 450));
    await c.say('Her satırda dinamometre okuması, kaldırma kuvveti ve taşan suyun ağırlığı var.');
    await par(c.say('Bir dilimde kaldırma kuvveti de taşan su da 0,98 newton.', { speak: 'Bir dilimde kaldırma kuvveti de taşan su da sıfır virgül doksan sekiz newton.' }), t.goster(0, 400));
    await par(c.say('İki dilimde ikisi de 1,96 newton çıkıyor.', { speak: 'İki dilimde ikisi de bir virgül doksan altı newton çıkıyor.' }), t.goster(1, 400));

    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üç dilim (0,0003 m³) batınca dinamometre 6,86 N gösteriyor. Kaldırma kuvveti ve taşan suyun ağırlığı ne olur?',
      options: ['İkisi de 2,94 N', 'İkisi de 6,86 N', 'Kaldırma kuvveti 2,94 N, taşan su 6,86 N'], answer: 0,
      hints: ['', 'Önce havadaki ve sudaki okumanın farkını bul.', 'Önceki satırlarda iki değer hep eşit çıktı.'],
      right: 'Evet. 9,8 − 6,86 = 2,94 N; taşan suyun ağırlığı da aynı.',
    });
    await par(c.say('Üç ve dört dilimde de iki değer eşit çıkıyor.'), par(t.goster(2, 400), t.goster(3, 400)));
    c.clearSay();
    await par(c.say('Her satırda kaldırma kuvveti, taşan suyun ağırlığına eşit.'), belir(c, esit.slice(0, 4), 300));
    await c.say('Sıvının yoğunluğu iki katına çıkınca kaldırma kuvveti iki katına çıkmıştı.');

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı cisim, yoğunluğu suyun iki katı olan X sıvısıyla ağzına kadar dolu taşırma kabına tamamen batırılıyor. Taşan sıvının ağırlığı, suda taşan suyun ağırlığına göre nasıl olur?',
      options: ['Yarısı olur', 'Aynı olur', 'İki katı olur'], answer: 2,
      hints: ['Taşan sıvının ağırlığı, kaldırma kuvvetine eşittir.', 'Kaldırma kuvveti iki katına çıkar.', ''],
      right: 'Evet. Kaldırma kuvveti iki katına çıkar, taşan sıvı da.',
    });
    await par(c.say('Yoğun sıvıda taşan sıvı da kaldırma kuvveti de iki katına çıktı.'),
      (async () => { await t.goster(4, 400); await belir(c, [esit[4], kat], 300); })());
  }

  /* ---- 5. Arşimet İlkesi ---- */
  async function ilke(c) {
    const svg = c.svg(1000, 562);
    const bas = yazi(c, svg, 500, 110, 'Arşimet İlkesi', { size: 40, kalin: 700, renk: RENK.kaldirma });
    const y0 = 200, a = 54, o = { size: 28, kalin: 600 };
    const sat = [
      renkli(c, svg, 500, y0, ['Bir kısmı veya tamamı durgun sıvıya batan cisme'], o),
      renkli(c, svg, 500, y0 + a, ['sıvı tarafından uygulanan ', ['kaldırma kuvveti', RENK.kaldirma], ','], o),
      renkli(c, svg, 500, y0 + 2 * a, ['cisim tarafından ', ['yeri değiştirilen sıvının', RENK.kuvvet]], o),
      renkli(c, svg, 500, y0 + 3 * a, [['ağırlığına', RENK.kuvvet], ' eşit büyüklüktedir.'], o),
    ];
    gizle(bas, sat);
    await par(c.say('Ölçümlerimiz bir ilkeyi gösteriyor: Arşimet İlkesi.'), belir(c, [bas, ...sat], 700));
    await c.say('Kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.');
    await c.say('Cismin bir kısmı da batsa, tamamı da batsa ilke geçerlidir.');
  }

  /* ---- 6. İlkeden modele ---- */
  async function model(c) {
    const svg = c.svg(1000, 562);
    const bas = renkli(c, svg, 500, 292, [['kaldırma kuvveti', RENK.kaldirma], NB + '=' + NB, ['yeri değişen sıvının ağırlığı', RENK.kuvvet]], { size: 38, kalin: 700 });
    const o = { hiza: 'start', size: 32, kalin: 600 };
    const r1 = mr(c, svg, 140, 150, ['yeri değişen sıvının hacmi = ', ['V_{b}', VB]], o);
    const r2 = mr(c, svg, 140, 230, ['kütlesi: m = ', ['d_{s}' + NB, RENK.sivi], '· ', ['V_{b}', VB]], o);
    const r3 = renkli(c, svg, 140, 310, ['ağırlığı: G = m · ', ['g', RENK.kuvvet]], o);
    const cerceve = kutu(c, svg, 120, 340, 520, 74, { renk: RENK.kaldirma, dolgu: 'none', w: 3 });
    const r4 = yazi(c, svg, 140, 392, 'F_{k} = V_{b} · d_{s} · g', { hiza: 'start', size: 44, kalin: 700, renk: RENK.kaldirma, math: true });
    gizle(bas, r1, r2, r3, cerceve, r4);

    await par(c.say('İlkeye göre kaldırma kuvveti, yeri değişen sıvının ağırlığıdır.'), belir(c, bas, 400));
    await par(c.say('Yeri değişen sıvının hacmi, cismin batan hacmi V<sub>b</sub>’dir.', { speak: 'Yeri değişen sıvının hacmi, cismin batan hacmi V b’dir.' }),
      par(belir(c, bas, 300, 0), belir(c, r1, 400)));
    bas.remove();
    await par(c.say('Sıvının kütlesi, yoğunluğu ile hacminin çarpımıdır: m = d<sub>s</sub> · V<sub>b</sub>.', { speak: 'Sıvının kütlesi, yoğunluğu ile hacminin çarpımıdır: m eşittir d s çarpı V b.' }),
      par(belir(c, r1, 300, 0.45), belir(c, r2, 400)));
    await par(c.say('Ağırlık, kütle çarpı g’dir: G = m · g.', { speak: 'Ağırlık, kütle çarpı g’dir: G eşittir m çarpı g.' }),
      par(belir(c, r2, 300, 0.45), belir(c, r3, 400)));
    await par(c.say('Hepsini birleştirince: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g.', { speak: 'Hepsini birleştirince: F k eşittir V b çarpı d s çarpı g.' }),
      par(belir(c, r3, 300, 0.45), belir(c, [cerceve, r4], 600)));
    c.note('<b>F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g</b>; hacim ikiye, kuvvet ikiye.', 'Arşimet İlkesi');
  }

  /* ---- 7. Modelin nicelikleri ---- */
  async function nicelikler(c) {
    const svg = c.svg(1000, 562);
    const t = tablo(c, svg, { x: 120, y: 130, satir: 4, h: 50, size: 28, sutunlar: [{ ad: 'Simge', w: 140 }, { ad: 'Anlamı', w: 340 }, { ad: 'Birimi', w: 280 }] });
    const SATIR = [['F_{k}', RENK.kaldirma, 'kaldırma kuvveti', 'N (newton)'], ['V_{b}', VB, 'batan hacim', 'm³'],
      ['d_{s}', RENK.sivi, 'sıvının yoğunluğu', 'kg/m³'], ['g', RENK.kuvvet, 'yer çekimi ivmesi', 'm/s²']];
    SATIR.forEach((s, i) => {
      const h = t.satirlar[i].hucreler[0]; Ders.mathText(h, s[0]); h.style.fill = s[1];
      t.yaz(i, 1, s[2]); t.yaz(i, 2, s[3]);
    });
    const yok = yazi(c, svg, 500, 436, 'Modelde cismin ağırlığı yok.', { size: 30, kalin: 700, renk: RENK.kaldirma });
    gizle(t.g, yok);
    await par(c.say('Modelde dört nicelik var; her birinin birimi bellidir.'), belir(c, t.g, 450));
    await par(c.say('F<sub>k</sub> kaldırma kuvvetidir; birimi newton.', { speak: 'F k kaldırma kuvvetidir; birimi newton.' }), t.goster(0, 400));
    await par(c.say('V<sub>b</sub> batan hacimdir; birimi metreküp.', { speak: 'V b batan hacimdir; birimi metreküp.' }), t.goster(1, 400));
    await par(c.say('d<sub>s</sub> sıvının yoğunluğudur; birimi kilogram bölü metreküp.', { speak: 'd s sıvının yoğunluğudur; birimi kilogram bölü metreküp.' }), t.goster(2, 400));
    await par(c.say('g yer çekimi ivmesidir; birimi metre bölü saniye kare.'), t.goster(3, 400));
    await par(c.say('Modelde cismin ağırlığı yok.'), belir(c, yok, 400));
  }

  /* ---- 8. Model veriyle sınanır ---- */
  async function sinanir(c) {
    const svg = c.svg(1000, 562);
    const t = tabloKur(c, svg, {
      x: 105, y: 120, satir: 5, h: 56, size: 24,
      sutunlar: [{ ad: 'Batan hacim\n(m³)', w: 190 }, { ad: 'Sıvı', w: 120 }, { math: 'V_{b} · d_{s} · g (N)', w: 250, renk: RENK.kaldirma },
        { math: 'Ölçülen F_{k} (N)', w: 230, renk: RENK.kaldirma }],
    });
    const VERI = [['0,0001', 'su', '0,98', '0,98'], ['0,0002', 'su', '1,96', '1,96'], ['0,0003', 'su', '2,94', '2,94'],
      ['0,0004', 'su', '3,92', '3,92'], ['0,0004', 'X (2d)', '7,84', '7,84']];
    const esit = [];
    VERI.forEach((v, i) => {
      v.forEach((m, j) => t.yaz(i, j, m, j >= 2 ? RENK.kaldirma : null));
      esit.push(yazi(c, t.satirlar[i].g, 105 + 190 + 120 + 250, t.yy(i), '=', { size: 24, kalin: 700 }));
      gizle(esit[i], t.satirlar[i].hucreler[3]);
    });
    const form = yazi(c, svg, 500, 520, '0,0001 · 1.000 · 9,8 = 0,98', { size: 34, kalin: 700, renk: RENK.kaldirma });
    gizle(t.g, form);
    const olcSat = (i) => belir(c, [t.satirlar[i].hucreler[3], esit[i]], 350);

    await par(c.say('Su için d<sub>s</sub> = 1.000 kg/m³ ve g = 9,8 m/s² alıyoruz.',
      { speak: 'Su için d s eşittir bin kilogram bölü metreküp ve g eşittir dokuz virgül sekiz metre bölü saniye kare alıyoruz.' }), belir(c, t.g, 450));
    await par(c.say('0,0001 · 1.000 · 9,8 işlemi 0,98 newton verir.',
      { speak: 'sıfır virgül sıfır sıfır sıfır bir çarpı bin çarpı dokuz virgül sekiz işlemi sıfır virgül doksan sekiz newton verir.' }),
      (async () => { await t.goster(0, 400); await belir(c, form, 400); })());
    await par(c.say('Ölçülen değer de 0,98 newton: model tutuyor.', { speak: 'Ölçülen değer de sıfır virgül doksan sekiz newton: model tutuyor.' }), olcSat(0));
    await par(c.say('Dört satırın hepsinde model ile ölçüm aynı çıkıyor.'), (async () => {
      await belir(c, form, 300, 0);
      await par(t.goster(1, 400), t.goster(2, 400), t.goster(3, 400));
      await par(olcSat(1), olcSat(2), olcSat(3));
    })());
    await par(c.say('X sıvısında 2d alınınca 7,84 newton çıkıyor; ölçüm de aynı.',
      { speak: 'X sıvısında iki d alınınca yedi virgül seksen dört newton çıkıyor; ölçüm de aynı.' }),
      (async () => { await t.goster(4, 400); await olcSat(4); })());
    await c.say('Model, ölçüm yapmadan kaldırma kuvvetini önceden söyler.');
  }

  /* ---- 9. Cismin ağırlığı modelde yok ---- */
  /* Kap, dinamometre, ip ve cisim; cisim önce suyun üstünde durur, koy(oy) ile iner (oy: -170 → 0). */
  function nesne(c, p, o) {
    kapKit(c, p, { x1: o.x1, x2: o.x2, ust: 220, taban: 520, yuzey: 260 });
    const ip = cizgi(c, p, [o.x, 100], [o.x, 330], KAP, 3);
    const hr = c.S('g', {}, p);
    cisim(c, hr, { x: o.x, y: 330 });
    const dn = dinamometre(c, p, { x: o.x, y: 20, deger: o.havada });
    gizle(dn.yazi);
    const havada = yazi(c, p, o.x - 44, 70, 'havada ' + N(o.havada), { hiza: 'end', size: 28, kalin: 700, renk: RENK.kuvvet });
    const harf = yazi(c, p, o.x, 480, o.harf, { size: 32, kalin: 700 });
    const ag = kuvvetOku(c, p, o.x + 70, 370, Math.round(o.havada * 10), RENK.kuvvet);
    const ka = kuvvetOku(c, p, o.x - 70, 370, 39, RENK.kaldirma, { yukari: true });
    gizle(ag.g, ka.g);
    const koy = (oy) => { hr.setAttribute('transform', `translate(0,${oy})`); ip.setAttribute('y2', 330 + oy); };
    koy(-170);
    return { koy, dn, havada, harf, ag, ka, hr };
  }

  async function agirlikYok(c) {
    const svg = c.svg(1000, 562);
    const A = nesne(c, svg, { x: 250, x1: 90, x2: 410, havada: 9.8, harf: 'A' });
    const B = nesne(c, svg, { x: 750, x1: 590, x2: 910, havada: 7.84, harf: 'B' });
    // Bütün çizim hazır; önce her şeyi gizle, sırayla aç.
    const hepsi = [...svg.children];
    gizle(hepsi);
    const ac = (...el) => belir(c, el, 450);
    // Kaplar, dinamometreler, cisimler ve harfler (1. cümle); yazılar ve oklar sonra açılır.
    const gorunen = hepsi.filter((e) => ![A.havada, B.havada, A.ag.g, B.ag.g, A.ka.g, B.ka.g].includes(e));
    await par(c.say('Ela, hacimleri aynı iki cisim seçiyor: A ve B.', { speak: 'Ela, hacimleri aynı iki cisim seçiyor: a ve be.' }), ac(...gorunen));
    await par(c.say('A’nın ağırlığı 9,8 newton, B’nin ağırlığı 7,84 newton.', { speak: 'a’nın ağırlığı dokuz virgül sekiz newton, be’nin ağırlığı yedi virgül seksen dört newton.' }), ac(A.havada, B.havada));
    await par(c.say('İkisini de aynı suya tamamen batırıyor.'),
      c.tween(900, (e) => { A.koy(lerp(-170, 0, e)); B.koy(lerp(-170, 0, e)); }, ease.inOut));
    await c.say('İkisinin de batan hacmi 0,0004 metreküp.', { speak: 'İkisinin de batan hacmi sıfır virgül sıfır sıfır sıfır dört metreküp.' });

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi cisme etki eden kaldırma kuvveti daha büyüktür?',
      options: ['A cismine; daha ağır', 'İkisine eşit', 'B cismine; daha hafif'], answer: 1,
      hints: ['Modelde cismin ağırlığı yok.', '', 'İkisinin batan hacmi ve sıvısı aynı.'],
      right: 'Evet. Kaldırma kuvveti ikisinde de aynı.',
    });
    await par(c.say('Hacim ve sıvı aynı; kaldırma kuvveti aynı, dinamometre okumaları farklı.'), (async () => {
      await par(belir(c, [A.ag.g, A.ka.g, B.ag.g, B.ka.g], 400), belir(c, [A.dn.yazi, B.dn.yazi], 400));
      await par(A.dn.oku(5.88, 600), B.dn.oku(3.92, 600));
    })());
    await c.say('Kaldırma kuvveti cismin ağırlığına bağlı değildir.');
  }

  /* ---- 10. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const t = tasirma(c, g1, { dilim: 2 });
    gizle(t.d.agirlik.g, t.d.kaldirma.g);
    const kL = yazi(c, g1, 800, 220, 'kaldırma kuvveti', { size: 22, kalin: 600, renk: RENK.kaldirma });
    const kV = yazi(c, g1, 800, 258, '1,96 N', { size: 34, kalin: 700, renk: RENK.kaldirma });
    const tL = yazi(c, g1, 800, 308, 'taşan sıvının ağırlığı', { size: 22, kalin: 600, renk: RENK.kuvvet });
    const tV = yazi(c, g1, 800, 346, '1,96 N', { size: 34, kalin: 700, renk: RENK.kuvvet });
    const mL = yazi(c, g1, 800, 396, 'V_{b} · d_{s} · g', { size: 22, kalin: 600, renk: RENK.kaldirma, math: true });
    const mV = yazi(c, g1, 800, 434, '1,96 N', { size: 34, kalin: 700, renk: RENK.kaldirma });
    void kL; void tL; void mL;
    const YOL = [[120, 'Batan hacim iki katı'], [166, 'Sıvı iki kat yoğun']];
    const yolEl = YOL.map(([y, m]) => {
      const g = c.S('g', {}, g1);
      onay(c, g, 662, y - 8);
      yazi(c, g, 690, y, m, { hiza: 'start', size: 22, kalin: 600 });
      gizle(g); return g;
    });
    const bulundu = [false, false];
    let n = 2, s = 0, ilk = true;
    const guncelle = () => {
      const ms = ilk ? 0 : 300, f = FK[anahtar(s)][n], v = N(f);
      kV.textContent = v; tV.textContent = v; mV.textContent = v;
      t.d.dilim(n, ms); t.d.oku(okumaDeger(n, s), ms); t.seviye(n, ms); t.tartiOku(f, ms); t.yogunluk(s ? 2 : 1, ilk ? 0 : 500);
      const yol = s === 0 && n === 4 ? 0 : (s === 1 && n === 2 ? 1 : -1);
      if (yol >= 0 && !bulundu[yol]) {
        bulundu[yol] = true; belir(c, yolEl[yol], 350);
        if (bulundu[0] && bulundu[1]) c.panel(null, c.h('p', { class: 'q', html: 'İkisi de iki katı: batan hacmi ya da sıvının yoğunluğunu iki katına çıkar.' }));
      }
    };
    await c.say('Kaldırma kuvvetini iki katına çıkarmanın kaç yolunu bulabilirsin?', { noWait: true });
    const slV = c.slider({ label: 'Batan hacim', min: 1, max: 4, step: 1, value: 2, fmt: (v) => sayi('0.000' + v) + ' m³', onInput: (v) => { n = +v; guncelle(); } });
    const slS = c.slider({ label: 'Sıvı', min: 0, max: 1, step: 1, value: 0, fmt: (v) => (+v ? 'X sıvısı (2d)' : 'su (d)'), onInput: (v) => { s = +v; guncelle(); } });
    ilk = false;
    await c.cont('Devam ›');
    slV.remove(); slS.remove(); c.clearSay();
    await belir(c, g1, 400, 0); g1.remove();

    // Dene 2: sınıflandırma
    const KUTU = [{ x: 40, ad: 'Kaldırma kuvvetini değiştirir' }, { x: 520, ad: 'Kaldırma kuvvetini değiştirmez' }], sayac = [0, 0];
    KUTU.forEach((k) => { kutu(c, svg, k.x, 56, 440, 54, { rx: 10 }); yazi(c, svg, k.x + 220, 92, k.ad, { size: 24, kalin: 700, renk: RENK.kaldirma }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 250, 190, 500, 130, { rx: 14 });
      yazi(c, kart, 500, 245, k.satir[0], { size: 34, kalin: 700 });
      yazi(c, kart, 500, 292, k.satir[1], { size: 34, kalin: 700 });
      gizle(kart); await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const kx = KUTU[k.kutu].x + 220, ky = 400 + sayac[k.kutu] * 36, el = kart;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, kx - 500, e)},${lerp(0, ky - 255, e)}) translate(500,255) scale(${lerp(1, 0.15, e)}) translate(-500,-255)`);
        el.style.opacity = 1 - e;
      }, ease.inOut);
      el.remove();
      const ad = yazi(c, svg, kx, ky, k.ad, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300);
      sayac[k.kutu]++;
    };
    const IPUCU = 'Modelde F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g: bu değişken modelin içinde mi?';
    const KARTLAR = [
      { satir: ['Batan hacmi', 'iki katına çıkarmak'], uzun: 'Batan hacmi iki katına çıkarmak', ad: 'Batan hacim iki katı', kutu: 0, neden: 'Evet. V<sub>b</sub> iki katına çıkınca F<sub>k</sub> iki katına çıkar.' },
      { satir: ['Aynı hacimli cismi', 'daha ağır yapmak'], uzun: 'Aynı hacimli cismi daha ağır yapmak', ad: 'Daha ağır cisim', kutu: 1, neden: 'Evet. Modelde cismin ağırlığı yok.' },
      { satir: ['Sıvıyı', 'iki kat yoğun yapmak'], uzun: 'Sıvıyı iki kat yoğun yapmak', ad: 'Sıvı iki kat yoğun', kutu: 0, neden: 'Evet. d<sub>s</sub> iki katına çıkınca F<sub>k</sub> iki katına çıkar.' },
      { satir: ['Tamamen batmış cismi', 'daha derine indirmek'], uzun: 'Tamamen batmış cismi daha derine indirmek', ad: 'Daha derin', kutu: 1, neden: 'Evet. Derinlik modelde yok.' },
      { satir: ['Batan hacmi', 'yarıya indirmek'], uzun: 'Batan hacmi yarıya indirmek', ad: 'Batan hacim yarıya', kutu: 0, neden: 'Evet. V<sub>b</sub> yarıya inince F<sub>k</sub> yarıya iner.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: IPUCU }, k)),
      soru: (k) => `${k.uzun}: kaldırma kuvvetini değiştirir mi?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Kaldırma kuvvetini yalnızca batan hacim, sıvının yoğunluğu ve g değiştirir.', { speak: 'Kaldırma kuvvetini yalnızca batan hacim, sıvının yoğunluğu ve ge değiştirir.' });
  }

  Ders.start({
    id: 'akiskanlar-d2', kicker: 'Konu D · Kaldırma kuvveti', title: 'Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır',
      hook: 'Ağzına kadar dolu küvete girince taşan su ile hafiflemen arasında bir bağ var mı?',
      button: 'Derse başla ›',
    },
    goals: ['Kaldırma kuvvetinin taşan suyun ağırlığına eşit olduğunu ölçümle bulur.', 'Arşimet İlkesini söyler ve F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g modelini kurar.', 'Kaldırma kuvvetinin cismin ağırlığına bağlı olmadığını açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Derinliğin ve sıvı yoğunluğunun etkisini hatırla.', run: hatirla },
      { title: 'Taşırma kabı ve hipotez', goal: 'Cisim batarken kaptan taşan suyu izle ve hipotezini kur.', run: tasirmaKabi },
      { title: 'Bir ölçüm', goal: 'Kaldırma kuvvetini taşan suyun ağırlığıyla karşılaştır.', run: olcum },
      { title: 'Ölçümü yinele', goal: 'Dört batan hacimde ve X sıvısında ölç; ilişkiyi ara.', run: yinele },
      { title: 'Arşimet İlkesi', goal: 'Ölçümlerin gösterdiği ilkeyi oku.', run: ilke },
      { title: 'İlkeden modele', goal: 'İlkeyi dört adımda bir modele dönüştür.', run: model },
      { title: 'Modelin nicelikleri', goal: 'Modeldeki dört niceliği ve birimlerini tanı.', run: nicelikler },
      { title: 'Model veriyle sınanır', goal: 'Modelin ölçümleri önceden söylediğini gör.', run: sinanir },
      { title: 'Cismin ağırlığı modelde yok', goal: 'Aynı hacimli iki cisimde kaldırma kuvvetini karşılaştır.', run: agirlikYok },
      { title: 'Dene', goal: 'Kaldırma kuvvetini değiştiren ve değiştirmeyen etmenleri ayır.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir cisim taşırma kabına batırılınca ağırlığı 3 N olan su taşıyor. Cisme etki eden kaldırma kuvveti kaç N’dur?',
        options: ['6 N', '3 N', 'Cismin ağırlığı kadar'], answer: 1,
        why: ['Kaldırma kuvveti taşan suyun ağırlığına eşittir; iki katı olmaz.', 'Kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.', 'Kaldırma kuvveti cismin ağırlığına değil, taşan suyun ağırlığına eşittir.'], scene: 2 },
      { q: 'Aynı sıvıda bir cismin batan hacmi yarıya iniyor. Kaldırma kuvveti nasıl değişir?',
        options: ['Yarıya iner', 'Aynı kalır', 'İki katına çıkar'], answer: 0,
        why: ['Batan hacim yarıya inerse yeri değişen sıvı da yarıya iner; kuvvet de yarıya iner.', 'Batan hacim modelde vardır; değişirse kaldırma kuvveti de değişir.', 'Batan hacim küçülünce yeri değişen sıvı azalır; kuvvet artmaz.'], scene: 5 },
      { q: 'Hacimleri aynı iki cisimden biri ötekinin iki katı ağırlıkta; ikisi de aynı sıvıya tamamen batırılıyor. Kaldırma kuvvetleri için hangisi doğrudur?',
        options: ['Ağır olanda iki katıdır', 'Hafif olanda iki katıdır', 'İkisi eşittir'], answer: 2,
        why: ['Modelde cismin ağırlığı yoktur; ağır cisme daha büyük kuvvet etki etmez.', 'Hafif cisme de daha büyük kuvvet etki etmez; ağırlık modelde yoktur.', 'Batan hacim ve sıvı aynıdır; kaldırma kuvveti eşittir.'], scene: 8 },
      { q: 'Aynı cisim önce suya, sonra yoğunluğu suyun yarısı olan bir sıvıya tamamen batırılıyor. İkinci sıvıda kaldırma kuvveti suya göre nasıl olur?',
        options: ['İki katı olur', 'Yarısı olur', 'Aynı olur'], answer: 1,
        why: ['Yoğunluk yarıya inince kaldırma kuvveti artmaz, azalır.', 'Batan hacim aynıdır; yoğunluk yarıya inince kaldırma kuvveti de yarıya iner.', 'Sıvının yoğunluğu modelde vardır; değişirse kaldırma kuvveti de değişir.'], scene: 5 },
      { q: 'Aynı sıvıda üç cismin batan hacimleri: A cismi 2V, B cismi V, C cismi 3V. Kaldırma kuvvetlerini büyükten küçüğe sıralayın.',
        options: ['C, A, B', 'A, B, C', 'B, A, C'], answer: 0,
        why: ['Sıvı aynı olduğundan kuvvet batan hacimle orantılıdır: 3V, 2V, V.', 'Bu sıra küçükten büyüğe değil, karışık verilmiş; en büyük batan hacim C’dedir.', 'Batan hacmi en küçük olan B, en büyük kuvveti almaz.'], scene: 6 },
    ],
    summary: ['Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir.', 'Model: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g; cismin ağırlığı modelde yoktur.', '<b>Cisim ne kadar sıvıyı yerinden ederse o kadar kaldırılır.</b>'],
    nextLesson: { href: 'd3-kaldirma-kuvveti-nereden-gelir.html', label: 'Sonraki: Kaldırma kuvveti nereden gelir? ›' },
  });
})();
