/* D5 — Ölçümü de önermeyi de ilkeyle sına
   Arşimet İlkesi bir ölçüttür: ölçümler ve kaldırma kuvvetiyle ilgili önermeler ilkeyle karşılaştırılarak değerlendirilir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md (D5). Düz vektör çizim; sıra plan/KURALLAR.md 3.2'ye göredir.
   Bu dosyada yazılan çizimler: ucOk (ucu sabit, boyu değişen kısa ok), metin (çok satırlı yazı), pano (kart-kutu sahnesi), olcum tablosu yardımcıları.
   Sayılar F_k = V_b · d_s · g ile (g = 9,8; su 1.000 kg/m³; X sıvısı 2.000 kg/m³) ve silindirde F = h · d · g · A ile (A = 0,01 m²) hesaplanmıştır. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, tablo, sinifla } = window.KIT;
  const { kap, cisim, kuvvetOku, duzenek } = window.KIT_D;
  const { lerp, ease } = Ders;
  const GRI = '#b7bfd6', KENAR = '#e4e9fb', KAP = '#c3cbea';
  const fk = 'F<sub>k</sub>';

  /* Dikey kuvvet oku: ucu (x, yUc) sabit kalır, boy değişince kökü kayar. Başı boya göre küçülür (kısa oklar gövdeyi yutmaz). */
  function ucOk(c, p, x, yUc, boy, renk, yukari, w = 6) {
    const g = c.S('g', {}, p), s = yukari ? 1 : -1;
    const hat = cizgi(c, g, [x, yUc], [x, yUc], renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (v) => {
      if (v < 3) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const b = Math.min(17, v * 0.5);
      hat.setAttribute('y1', yUc + s * v); hat.setAttribute('y2', yUc + s * b * 0.6);
      uc.setAttribute('d', `M${x},${yUc} L${x - b * 0.52},${yUc + s * b} L${x + b * 0.52},${yUc + s * b} Z`);
    };
    let L = boy;
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
  /* Öğeyi şimdiki saydamlığından hedefe götürür (kaybolan öğe için ease.in). */
  function soluk(c, el, hedef, ms = 300) {
    const a = el.style.opacity === '' ? 1 : +el.style.opacity;
    return c.tween(ms, (e) => { el.style.opacity = lerp(a, hedef, e); }, ease.in);
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

  /* ---- ölçüm tablosu (sahne 3-5) ---- */
  // Ela'nın sekiz ölçümü: [ad, batan hacim, sıvı, kaldırma kuvveti, taşan sıvının ağırlığı]
  const VERI = [
    ['A', '0,0002', 'su', '1,96', '1,96'], ['B', '0,0001', 'su', '0,98', '1,96'],
    ['C', '0,0004', 'su', '3,92', '3,92'], ['D', '0,0004', 'X (2d)', '7,84', '7,84'],
    ['E', '0,0001', 'su', '0,98', '0,98'], ['F', '0,0003', 'su', '2,94', '2,94'],
    ['G', '0,0003', 'X (2d)', '5,88', '2,94'], ['H', '0,0002', 'X (2d)', '3,92', '3,92'],
  ];
  const SATIR_Y = (i) => 212 + 56 * i; // satır i'nin yazı taban çizgisi
  function olcumTablosu(c, p) {
    const t = tablo(c, p, {
      x: 70, y: 120, satir: 4, h: 56, size: 22,
      sutunlar: [{ ad: '', w: 100 }, { ad: '', w: 200 }, { ad: '', w: 130 }, { ad: '', w: 230, renk: RENK.kaldirma }, { ad: '', w: 200, renk: RENK.kuvvet }],
    });
    const baslik = (x, satirlar, renk) => satirlar.forEach((s, i) => yazi(c, t.g, x, satirlar.length === 1 ? 156 : 143 + i * 24, s, { size: 22, kalin: 700, renk: renk || RENK.yazi }));
    baslik(120, ['Ölçüm']); baslik(270, ['Batan hacim', '(m³)']); baslik(435, ['Sıvı']);
    baslik(615, ['Kaldırma kuvveti', '(N)'], RENK.kaldirma); baslik(830, ['Taşan sıvının', 'ağırlığı (N)'], RENK.kuvvet);
    return t;
  }
  /* Satır i'ye VERI[v] kaydının ilk j1 + 1 hücresini yazar. */
  function satirYaz(t, i, v, j1 = 4) {
    for (let j = 0; j <= j1; j++) t.yaz(i, j, VERI[v][j], j === 3 ? RENK.kaldirma : j === 4 ? RENK.kuvvet : null);
  }
  /* Satırın son iki hücresi arasına "=" ya da gri "≠" (gizli başlar). */
  function isaret(c, t, i, esit) {
    const m = yazi(c, t.satirlar[i].g, 730, SATIR_Y(i), esit ? '=' : '≠', { size: 28, kalin: 700, renk: esit ? RENK.yazi : RENK.gri });
    gizle(m);
    return m;
  }
  /* Satır i1'in kaldırma kuvveti hücresinden i2'ninkine mor ince çizgi ve "× 2" (gizli başlar). */
  function kat(c, p, i1, i2) {
    const y1 = SATIR_Y(i1) - 8, y2 = SATIR_Y(i2) - 8, g = c.S('g', {}, p);
    c.S('path', {
      d: `M582,${y1} L566,${y1} L566,${y2} L582,${y2}`, fill: 'none', stroke: RENK.kaldirma, 'stroke-width': 2.5,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    }, g);
    yazi(c, g, 556, (SATIR_Y(i1) + SATIR_Y(i1 + 1)) / 2, '× 2', { hiza: 'end', size: 22, kalin: 700, renk: RENK.kaldirma });
    gizle(g);
    return g;
  }
  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Birinci soru: tabana oturmuş cisim; oklar cevaptan sonra gelir.
    const s1 = c.S('g', {}, svg);
    kap(c, s1, {});
    cisim(c, s1, { x: 450, y: 460 });
    const ok1 = c.S('g', {}, s1);
    kuvvetOku(c, ok1, 520, 470, 62, RENK.kuvvet, { etiket: ['ağırlık'] });
    kuvvetOku(c, ok1, 380, 505, 36, RENK.kaldirma, { yukari: true, etiket: ['kaldırma', 'kuvveti'] });
    gizle(s1, ok1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 450));
    const h1 = `Yüzen ve askıda kalan cisimde ${fk} = G, batan cisimde ${fk} &lt; G’dir.`;
    await c.choice({
      tag: 'Hatırla', q: 'Batan bir cisimde kaldırma kuvveti ile cismin ağırlığı arasındaki ilişki nedir?',
      options: ['Kaldırma kuvveti ağırlığa eşittir', 'Kaldırma kuvveti ağırlıktan küçüktür', 'Kaldırma kuvveti ağırlıktan büyüktür'], answer: 1,
      hints: [h1, '', h1], right: `Evet. Batan cisimde ${fk} &lt; G.`,
    });
    c.clearSay();
    await par(c.say('Batan cismin ağırlığı kaldırma kuvvetinden büyüktür.'), belir(c, ok1, 450));
    c.clearSay();
    await belir(c, s1, 400, 0); s1.remove();

    // İkinci soru: dinamometre düzeneği, iki dilim batık.
    const s2 = c.S('g', {}, svg);
    const d = duzenek(c, s2, { dilim: 2, okuma: 7.84 });
    gizle(d.agirlik.g);
    const hava = yazi(c, s2, 650, 110, 'havada 9,8 N', { hiza: 'start', size: 24, renk: RENK.soluk });
    gizle(s2, hava);
    await belir(c, s2, 450);
    const h2 = 'Cisim sıvıya girince dinamometre daha az gösterir; aradaki fark kaldırma kuvvetidir.';
    await c.choice({
      tag: 'Hatırla', q: 'Kaldırma kuvveti dinamometreyle nasıl ölçülür?',
      options: ['Havadaki ve sıvıdaki okuma toplanır', 'Havadaki okumadan sıvıdaki okuma çıkarılır', 'Yalnızca sıvıdaki okuma alınır'], answer: 1,
      hints: [h2, '', h2], right: 'Evet. Aradaki fark kaldırma kuvvetidir.',
    });
    c.clearSay();
    await par(c.say('Sıvıdaki okuma havadakinden küçüktür; aradaki fark kaldırma kuvvetidir.'), belir(c, hava, 400));
    c.clearSay();
    await c.say('Bugün ölçümleri ve önermeleri Arşimet İlkesi’yle sınayacağız.');
  }

  /* ---- 2. İlke bir ölçüttür ---- */
  async function ilke(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { dx: -190, dilim: 2, okuma: 7.84 });
    gizle(d.agirlik.g);
    const mor = ucOk(c, d.hareket, 190, 220, 20, RENK.kaldirma, true);
    // Taşırma kabı: kısa boru, taşan su, küçük toplama kabı.
    const tas = c.S('g', {}, svg);
    c.S('rect', { x: 460, y: 274, width: 62, height: 12, rx: 3, fill: RENK.yuzey, stroke: KAP, 'stroke-width': 2.5 }, tas);
    cizgi(c, tas, [516, 290], [516, 488], RENK.sivi, 4, { 'stroke-opacity': 0.8 });
    c.S('rect', { x: 472, y: 490, width: 86, height: 30, fill: RENK.sivi, 'fill-opacity': 0.35 }, tas);
    c.S('path', { d: 'M470,440 L470,520 L560,520 L560,440', fill: 'none', stroke: KAP, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, tas);
    const etK = yazi(c, svg, 780, 180, 'kaldırma kuvveti', { size: 28, kalin: 700, renk: RENK.kaldirma });
    const etT = yazi(c, svg, 780, 320, 'taşan sıvının ağırlığı', { size: 28, kalin: 700, renk: RENK.kuvvet });
    const esit = yazi(c, svg, 780, 250, '=', { size: 44, kalin: 700 });
    gizle(d.g, mor.g, tas, etK, etT, esit);

    await par(c.say('Ela deneyini bitirdi; şimdi ölçümlerine güvenip güvenemeyeceğini soruyor.'), belir(c, d.g, 450));
    await par(c.say('Her ölçümde iki değer kaydetti: kaldırma kuvveti ve taşan sıvının ağırlığı.'), belir(c, [mor.g, etK, etT], 300), belir(c, tas, 400));
    await par(c.say('Arşimet İlkesi’ne göre bu iki değer eşit olmalı.'), belir(c, esit, 300));
    await c.say('İlke, bir ölçümün tutarlı olup olmadığını sınamanın ölçütüdür.');
  }

  /* ---- 3. İki ölçüm (çözülmüş örnek) ---- */
  async function ikiOlcum(c) {
    const svg = c.svg(1000, 562);
    const t = olcumTablosu(c, svg);
    satirYaz(t, 0, 0); satirYaz(t, 1, 1);
    const mA = isaret(c, t, 0, true), mB = isaret(c, t, 1, false);
    gizle(t.g);

    await par(c.say('Ela her ölçümü tablonun bir satırına yazıyor.'), belir(c, t.g, 450));
    await par(c.say('A ölçümünde cismin 0,0002 metreküpü suya batık.', { speak: 'A ölçümünde cismin sıfır virgül sıfır sıfır sıfır iki metreküpü suya batık.' }), t.goster(0, 400));
    await c.say('Kaldırma kuvveti 1,96 newton; taşan suyun ağırlığı da 1,96 newton.', { speak: 'Kaldırma kuvveti bir virgül doksan altı newton; taşan suyun ağırlığı da bir virgül doksan altı newton.' });
    await par(c.say('İki değer eşit: A ölçümü ilkeyle uyumlu.'), belir(c, mA, 300));
    await par(c.say('B ölçümünde kaldırma kuvveti 0,98 newton çıkmış.', { speak: 'B ölçümünde kaldırma kuvveti sıfır virgül doksan sekiz newton çıkmış.' }), t.goster(1, 400));
    await c.say('Taşan suyun ağırlığı ise 1,96 newton yazılmış.', { speak: 'Taşan suyun ağırlığı ise bir virgül doksan altı newton yazılmış.' });
    await par(c.say('İki değer eşit değil: B ölçümü ilkeyle uyumsuz.'), belir(c, mB, 300));
    await par(c.say('İlkeyle uyuşmayan ölçüm yinelenir.', { speak: '[short pause] İlkeyle uyuşmayan ölçüm yinelenir.' }), soluk(c, t.satirlar[1].g, 0.45, 300));
  }

  /* ---- 4. Ölçümler birbirini tutuyor mu? ---- */
  async function tutarlilik(c) {
    const svg = c.svg(1000, 562);
    const t = olcumTablosu(c, svg);
    satirYaz(t, 0, 0); satirYaz(t, 1, 1);
    t.satirlar[0].g.style.opacity = 1; t.satirlar[1].g.style.opacity = 0.45;
    const mA = isaret(c, t, 0, true), mB = isaret(c, t, 1, false);
    mA.style.opacity = 1; mB.style.opacity = 1;
    satirYaz(t, 2, 2, 2); satirYaz(t, 3, 3); // C'nin son iki hücresi Birlikte çöz'den sonra yazılır
    const mC = isaret(c, t, 2, true), mD = isaret(c, t, 3, true);
    const k1 = kat(c, svg, 0, 2), k2 = kat(c, svg, 2, 3);
    gizle(t.g);

    await par(c.say('Tutarlı ölçümler birbirini de tutar: bunu model söyler.', { speak: '[curious] Tutarlı ölçümler birbirini de tutar: bunu model söyler.' }), belir(c, t.g, 450));
    await c.say('Modelde kaldırma kuvveti, batan hacimle doğru orantılıdır.');
    await par(c.say('C ölçümünde batan hacim 0,0004 metreküp: A’dakinin iki katı.', { speak: 'C ölçümünde batan hacim sıfır virgül sıfır sıfır sıfır dört metreküp: A’dakinin iki katı.' }), t.goster(2, 400));
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'C ölçümünde sıvı yine su, batan hacim A ölçümündekinin iki katı. Tutarlı bir ölçümde kaldırma kuvveti A’dakine göre nasıl olmalı?',
      options: ['Aynı olmalı', 'İki katı olmalı', 'Yarısı olmalı'], answer: 1,
      hints: ['Sıvı aynıysa kaldırma kuvveti yalnızca batan hacimle değişir.', '', 'Batan hacim iki katına çıkınca kaldırma kuvveti de iki katına çıkar.'],
      right: 'Evet. Hacim iki katına çıkınca kaldırma kuvveti de iki katına çıkar.',
    });
    c.clearSay();
    // C satırı dolar; A'dan C'ye "× 2".
    t.yaz(2, 3, VERI[2][3], RENK.kaldirma); t.yaz(2, 4, VERI[2][4], RENK.kuvvet);
    const hc = t.satirlar[2].hucreler; gizle(hc[3], hc[4]);
    await par(c.say('C’de kaldırma kuvveti 3,92 newton: 1,96’nın iki katı.', { speak: 'C’de kaldırma kuvveti üç virgül doksan iki newton: bir virgül doksan altının iki katı.' }),
      belir(c, [hc[3], hc[4]], 350), belir(c, k1, 350));
    await par(c.say('Taşan suyun ağırlığı da 3,92 newton: C ölçümü tutarlı.', { speak: 'Taşan suyun ağırlığı da üç virgül doksan iki newton: C ölçümü tutarlı.' }), belir(c, mC, 300));
    await c.say('D ölçümünde batan hacim aynı, sıvı ise X sıvısı.', { speak: 'D ölçümünde batan hacim aynı, sıvı ise iks sıvısı.' });
    await c.say('X sıvısının yoğunluğu suyun iki katıdır.', { speak: 'İks sıvısının yoğunluğu suyun iki katıdır.' });
    await t.goster(3, 400);
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'D ölçümü tutarlı mı?',
      options: ['Hayır: kaldırma kuvveti C’dekiyle aynı olmalıydı', 'Evet: iki değer eşit, kaldırma kuvveti de C’dekinin iki katı', 'Hayır: yoğunluk artınca kaldırma kuvveti azalmalıydı'], answer: 1,
      hints: ['Önce satırdaki iki değeri karşılaştır.', '', 'Modelde kaldırma kuvveti sıvının yoğunluğuyla doğru orantılıdır.'],
      right: 'Evet. İki değer eşit; kaldırma kuvveti de C’dekinin iki katı.',
    });
    c.clearSay();
    await par(c.say('Yoğunluk iki katına çıktı; kaldırma kuvveti de iki katına çıktı.'), belir(c, k2, 350), belir(c, mD, 300));
  }

  /* ---- 5. Yeni ölçümleri değerlendir ---- */
  async function yeniOlcumler(c) {
    const svg = c.svg(1000, 562);
    const t = olcumTablosu(c, svg);
    for (let i = 0; i < 4; i++) satirYaz(t, i, 4 + i);
    const KUTU = [{ ad: 'İlkeyle uyumlu', x: 70 }, { ad: 'İlkeyle uyumsuz', x: 510 }], sayac = [0, 0];
    const kutuG = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, kutuG, k.x, 425, 420, 110, { rx: 10 }); yazi(c, kutuG, k.x + 210, 462, k.ad, { size: 26, kalin: 700 }); });
    const ozet = yazi(c, svg, 500, 80, 'Sekiz ölçüm: 6 uyumlu, 2 uyumsuz', { size: 28, kalin: 700 });
    gizle(t.g, kutuG, ozet);

    await par(c.say('Ela ertesi gün dört ölçüm daha yapıyor.'), belir(c, [t.g, kutuG], 450));
    await c.say('İlk işi, uyumsuz çıkan B ölçümünü yinelemek: E satırı.');
    await par(c.say('Her satırda iki değeri karşılaştır.'), ...[0, 1, 2, 3].map((i) => t.goster(i, 400)));
    c.clearSay();
    const KARTLAR = [
      { ad: 'E satırı', i: 0, kutu: 0, neden: 'Evet. 0,98 N ile 0,98 N eşit: yinelenen ölçüm tuttu.' },
      { ad: 'F satırı', i: 1, kutu: 0, neden: 'Evet. 2,94 N ile 2,94 N eşit.' },
      { ad: 'G satırı', i: 2, kutu: 1, neden: 'Evet. 5,88 N ile 2,94 N eşit değil: ölçüm yinelenmeli.' },
      { ad: 'H satırı', i: 3, kutu: 0, neden: 'Evet. 3,92 N ile 3,92 N eşit.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), soru: (k) => `${k.ad}: kaldırma kuvveti ile taşan sıvının ağırlığı ilkeyle uyumlu mu?`,
      kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'İlkeye göre iki değer eşit olmalı.' }, k)),
      sec: async (_, k) => t.vurgula(k.i, true),
      yerlestir: async (_, k) => {
        t.vurgula(k.i, false);
        const m = isaret(c, t, k.i, k.kutu === 0);
        const ad = yazi(c, svg, KUTU[k.kutu].x + 50 + sayac[k.kutu] * 70, 512, k.ad[0], { size: 26, kalin: 700 });
        sayac[k.kutu]++;
        gizle(ad); await par(belir(c, m, 300), belir(c, ad, 300));
      },
    });
    await par(c.say('Sekiz ölçümün altısı ilkeyle uyumlu çıktı.'), belir(c, ozet, 400));
    await c.say('Tutarlı ölçümler ilkeyi destekler; uyumsuz olanlar yinelenir.');
    c.note(`Uyumlu ölçümde <b>${fk}</b>, taşan sıvının ağırlığına eşittir.`, 'Veriyi sına', 'akiskanlar-d5-veri');
  }

  /* ---- 6. Bir önermeyi sına (çözülmüş örnek) ---- */
  async function onermeyiSina(c) {
    const svg = c.svg(1000, 562);
    kap(c, svg, { x1: 80, x2: 460, ust: 80, taban: 540, yuzey: 100 });
    [['0,1 m', 200], ['0,3 m', 400]].forEach(([m, y]) => {
      cizgi(c, svg, [80, y], [102, y], KAP, 3);
      yazi(c, svg, 110, y + 8, m, { hiza: 'start', size: 22, kalin: 600, renk: KAP });
    });
    // Silindir ve oklar tek grupta iner.
    const mg = c.S('g', {}, svg);
    c.S('rect', { x: 230, y: 200, width: 120, height: 40, rx: 4, fill: GRI, stroke: KENAR, 'stroke-width': 2.5 }, mg);
    const f1 = ucOk(c, mg, 290, 200, 25, RENK.kuvvet, false);
    const f2 = ucOk(c, mg, 290, 240, 34, RENK.kuvvet, true);
    const mor = ucOk(c, mg, 190, 185, 40, RENK.kaldirma, true);
    gizle(f1.g, f2.g, mor.g);
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 500, 90, 460, 100, { rx: 12, renk: RENK.cizgi });
    metin(c, kart, 730, 128, ['Batmış cisim derine indikçe', 'kaldırma kuvveti artar.'], { size: 26, kalin: 600, dy: 34 });
    const yanlis = yazi(c, svg, 730, 228, 'yanlış', { size: 26, kalin: 700, renk: RENK.gri });
    gizle(mg, kart, yanlis);
    const etiketler = (m1, m2, m3) => {
      const g = c.S('g', {}, svg);
      yazi(c, g, 520, 300, m1, { hiza: 'start', size: 24, kalin: 600, renk: RENK.kuvvet });
      yazi(c, g, 520, 350, m2, { hiza: 'start', size: 24, kalin: 600, renk: RENK.kuvvet });
      yazi(c, g, 520, 400, m3, { hiza: 'start', size: 24, kalin: 600, renk: RENK.kaldirma });
      gizle(g);
      return g;
    };

    await par(c.say('Bir önerme de ölçüm gibi sınanır.'), belir(c, mg, 450));
    await par(c.say('Önerme şu: batmış cisim derine indikçe kaldırma kuvveti artar.'), belir(c, kart, 400));
    await par(c.say('Kaldırma kuvveti, alt ve üst yüzeydeki kuvvetlerin farkıdır.'), belir(c, [f1.g, f2.g, mor.g], 400));
    let et = etiketler('F₁ 9,8 N', 'F₂ 13,72 N', 'fark 3,92 N');
    await par(c.say('0,1 metrede F₁ 9,8, F₂ 13,72 newton: fark 3,92.', { speak: 'Sıfır virgül bir metrede F bir dokuz virgül sekiz, F iki on üç virgül yetmiş iki newton: fark üç virgül doksan iki.' }), belir(c, et, 300));
    await par(c.say('Silindir 0,3 metreye iniyor: iki kuvvet de büyüyor.', { speak: 'Silindir sıfır virgül üç metreye iniyor: iki kuvvet de büyüyor.' }),
      c.tween(900, (e) => {
        mg.setAttribute('transform', `translate(0,${200 * e})`);
        f1.ayarla(lerp(25, 74, e)); f2.ayarla(lerp(34, 83, e));
      }, ease.inOut));
    // Etiketler değişir: eskiler kaybolur ve silinir, yeniler belirir.
    const eski = et;
    const yeniAd = c.say('F₁ 29,4, F₂ 33,32 newton oldu: fark yine 3,92.', { speak: 'F bir yirmi dokuz virgül dört, F iki otuz üç virgül otuz iki newton oldu: fark yine üç virgül doksan iki.' });
    await belir(c, eski, 200, 0); eski.remove();
    et = etiketler('F₁ 29,4 N', 'F₂ 33,32 N', 'fark 3,92 N');
    await par(yeniAd, belir(c, et, 300));
    await par(c.say('Fark değişmedi: kaldırma kuvveti artmadı, önerme yanlış.', { speak: '[thoughtful] Fark değişmedi: kaldırma kuvveti artmadı, önerme yanlış.' }),
      soluk(c, kart, 0.45, 300), belir(c, yanlis, 300));
  }

  /* ---- 7. Doğru mu, yanlış mı? ---- */
  async function dogruYanlis(c) {
    const svg = c.svg(1000, 562);
    const p = c.S('g', {}, svg);
    const pn = pano(c, p, {
      kutular: [{ ad: 'Doğru', x: 120, y: 400, w: 350, h: 150 }, { ad: 'Yanlış', x: 530, y: 400, w: 350, h: 150 }],
      kart: { x: 120, y: 200, w: 760, h: 100, size: 28 }, baslik: 28, adBas: 66, adAralik: 30,
    });
    const sonuc = yazi(c, svg, 500, 262, 'Ölçümü de önermeyi de ilkeyle sına.', { size: 32, kalin: 700 });
    gizle(p, sonuc);
    const KARTLAR = [
      { satirlar: ['Kaldırma kuvvetinin varlığı ilk kez', 'Pascal tarafından kanıtlanmıştır.'], kisa: 'Pascal kanıtladı', kutu: 1, neden: 'Evet. Bunu ilk kanıtlayan Arşimet.' },
      { satirlar: ['Basıncı oluşturan kuvvetlerin bileşkesi yukarı', 'yönlüdür ve kaldırma kuvvetine eşittir.'], kisa: 'Yukarı bileşke', kutu: 0, neden: `Evet. ${fk} = F₂ − F₁.` },
      { satirlar: ['Kuvvetlerin farkı cismin ağırlığından', 'küçükse cisim batar.'], kisa: 'Batma koşulu', kutu: 0, neden: `Evet. ${fk} &lt; G ise cisim batar.` },
      { satirlar: ['Yan yüzeylere etki eden kuvvetler', 'kaldırma kuvvetini büyütür.'], kisa: 'Yan yüzey kuvveti', kutu: 1, neden: 'Evet. Yan yüzeylerdeki kuvvetler birbirini dengeler.' },
      { satirlar: ['Yüzen cisimde kaldırma kuvveti,', 'cismin ağırlığına eşittir.'], kisa: 'Yüzme koşulu', kutu: 0, neden: `Evet. ${fk} = G.` },
    ];
    await par(c.say('Şimdi beş önermeyi aynı yolla değerlendir.'), belir(c, p, 450));
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: ['Doğru', 'Yanlış'], soru: () => 'Bu önerme doğru mu, yanlış mı?',
      kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Silindir çiziminde alt ve üst yüzeye etki eden kuvvetleri düşün.' }, k)),
      sec: (_, k) => pn.goster(k), yerlestir: (_, k) => pn.yerlestir(k),
    });
    await c.say('Kaldırma kuvveti, sıvının cisme uyguladığı basınç kuvvetlerinin bileşkesidir.');
    await par(c.say('Ölçümü de önermeyi de ilkeyle sına.'), belir(c, sonuc, 400));
    c.note('<b>Ölçümü de önermeyi de ilkeyle sına.</b>', 'İlke', 'akiskanlar-d5-ilke');
  }

  Ders.start({
    id: 'akiskanlar-d5', kicker: 'Konu D · Kaldırma kuvveti', title: 'Ölçümü de önermeyi de ilkeyle sına', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Ölçümü de önermeyi de ilkeyle sına',
      hook: 'Bir ölçümün hatalı olduğunu, deneyi yeniden yapmadan anlayabilir misin?',
      button: 'Derse başla ›',
    },
    goals: [
      'Bir ölçümün Arşimet İlkesi’yle uyumlu olup olmadığına karar verir.',
      'Tutarlı ölçümlerde kaldırma kuvvetinin batan hacimle ve sıvı yoğunluğuyla orantılı olduğunu kullanır.',
      'Kaldırma kuvveti hakkındaki önermeleri ilkeye ve kuvvetlerin farkına bakarak değerlendirir.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Batan cisimdeki kuvvetleri ve kaldırma kuvvetinin ölçülmesini hatırla.', run: hatirla },
      { title: 'İlke bir ölçüttür', goal: 'Arşimet İlkesi’nin bir ölçümü sınamak için nasıl kullanıldığını gör.', run: ilke },
      { title: 'İki ölçüm', goal: 'Uyumlu ve uyumsuz bir ölçümü ayırt et.', run: ikiOlcum },
      { title: 'Ölçümler birbirini tutuyor mu?', goal: 'Tutarlı ölçümlerin orantılara da uyduğunu bul.', run: tutarlilik },
      { title: 'Yeni ölçümleri değerlendir', goal: 'Dört ölçümü ilkeyle uyumlu ya da uyumsuz diye ayır.', run: yeniOlcumler },
      { title: 'Bir önermeyi sına', goal: 'Derinlikle kaldırma kuvvetinin artıp artmadığını kuvvetlerin farkıyla sına.', run: onermeyiSina },
      { title: 'Doğru mu, yanlış mı?', goal: 'Beş önermeyi doğru ya da yanlış diye ayır.', run: dogruYanlis },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir ölçümde kaldırma kuvveti 2,94 N, taşan suyun ağırlığı 1,96 N kaydedilmiş. Ne yapılmalı?',
        options: ['Ölçüm kabul edilmeli: iki değer birbirine yakın', 'Ölçüm yinelenmeli: iki değer eşit çıkmalıydı', 'Arşimet İlkesi yanlış sayılmalı'], answer: 1,
        why: ['İlke eşitlik ister; yakın olmak yetmez.', 'İlkeye göre iki değer eşit olmalı. Eşit değilse ölçüm yinelenir.', 'Tek bir uyumsuz ölçüm ilkeyi çürütmez; ölçüm yinelenir.'], scene: 2 },
      { q: 'Aynı sıvıda batan hacim üç katına çıkarılıyor. Tutarlı ölçümlerde taşan sıvının ağırlığı nasıl değişir?',
        options: ['Aynı kalır', 'Üçte birine iner', 'Üç katına çıkar'], answer: 2,
        why: ['Batan hacim artınca kaldırma kuvveti ve taşan sıvı da artar.', 'Hacim arttığı için ağırlık azalmaz, artar.', 'Kaldırma kuvveti batan hacimle doğru orantılıdır; taşan sıvının ağırlığı ona eşittir.'], scene: 3 },
      { q: 'İki ölçümde batan hacim aynı; ikinci sıvının yoğunluğu ilkinin yarısı. Ölçümler tutarlıysa ikinci ölçümde kaldırma kuvveti nasıl olur?',
        options: ['İlkinin yarısı olur', 'İlkinin iki katı olur', 'İlkiyle aynı olur'], answer: 0,
        why: ['Kaldırma kuvveti sıvının yoğunluğuyla doğru orantılıdır; yoğunluk yarıya inince o da yarıya iner.', 'Yoğunluk küçüldüğü için kaldırma kuvveti artmaz, azalır.', 'Sıvının yoğunluğu değiştiği için kaldırma kuvveti de değişir.'], scene: 3 },
      { q: '“Daha derindeki cisme daha büyük kaldırma kuvveti etki eder.” Tamamen batmış bir cisim için bu önerme neden yanlıştır?',
        options: ['Derine inildikçe sıvının basıncı azalır', 'Derinde yalnızca üst yüzeydeki kuvvet artar', 'Alt ve üst yüzeydeki kuvvetler aynı kadar artar; farkları değişmez'], answer: 2,
        why: ['Derine inildikçe basınç azalmaz, artar.', 'Alt yüzeydeki kuvvet de artar.', 'Kaldırma kuvveti bu kuvvetlerin farkıdır; ikisi aynı kadar arttığı için fark değişmez.'], scene: 5 },
      { q: 'Sıvıdaki bir cismin alt yüzeyine 12 N, üst yüzeyine 8 N kuvvet etki ediyor; cismin ağırlığı 6 N. Hangisi doğrudur?',
        options: ['Kaldırma kuvveti 4 N’dur; cisim yüzer', 'Kaldırma kuvveti 4 N’dur; cisim batar', 'Kaldırma kuvveti 20 N’dur; cisim yüzer'], answer: 1,
        why: ['Kaldırma kuvveti 4 N, ağırlık 6 N: kaldırma kuvveti ağırlıktan küçük olduğu için cisim yüzmez.', 'Kaldırma kuvveti 12 − 8 = 4 N. 4 N, 6 N’dan küçük olduğu için cisim batar.', 'Kaldırma kuvveti iki kuvvetin toplamı değil, farkıdır.'], scene: 6 },
    ],
    summary: [
      'Uyumlu ölçümde kaldırma kuvveti, taşan sıvının ağırlığına eşittir.',
      'Tutarlı ölçümler modelin orantılarına da uyar.',
      '<b>Ölçümü de önermeyi de ilkeyle sına.</b>',
    ],
    nextLesson: { href: 'd6-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
