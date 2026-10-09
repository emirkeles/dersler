/* H3 · KİM.9.1.8 · Senaryo: plan/kimya/etkilesim/senaryolar/H-periyodik-ozellikler.md, "## H3" (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 80 ve 83 (ikinci ve üçüncü iyonlaşma enerjisi, ilk dört iyonlaşma enerjisi
   tablosu), s. 74 ve 76 (soy gaz dizilimine ulaşma; Na⁺, Mg²⁺ ve Ne'nin ortak dizilimi), s. 62 (valans elektronu).
   Farklar tablodaki değerlerden çıkarmayla bulunur; sıçrama oranla değil farkla aranır. Öğrenciye kitap, sayfa ya da
   "hazır veri" anılmaz. Renkler: sarı = valans elektronu, mavi = iç enerji seviyesi, turuncu = sıçrama. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const VALANS = RENK.vurgu, IC = 'var(--c1)', SICRAMA = 'var(--c2)', CEKIRDEK = 'var(--c4)', KOYU = '#162038';
  const IE = ['İE₁', 'İE₂', 'İE₃', 'İE₄'];
  const ATOM = {
    Na: { ad: 'Sodyum', ie: [496, 4562, 6912, 9544], valans: 1, iyon: 'Na⁺', seviye: [2, 8, 1] },
    Mg: { ad: 'Magnezyum', ie: [738, 1451, 7733, 10540], valans: 2, iyon: 'Mg²⁺', seviye: [2, 8, 2] },
    Al: { ad: 'Alüminyum', ie: [577, 1817, 2745, 11578], valans: 3, iyon: 'Al³⁺', seviye: [2, 8, 3] },
  };
  const KODLAR = ['Na', 'Mg', 'Al'];
  const sayi = (v) => (v >= 10000 ? String(v).replace(/(\d{3})$/, ' $1') : String(v));

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: 12,
    fill: KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': 3 }, p);
  const sil = async (c, el, ms = 300) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };

  /* Art arda iyonlaşma zinciri: X → X⁺ → X²⁺ → X³⁺. Kutular ve oklar tek tek belirsin diye gizli çizilir. */
  function zincir(c, p, simge, y) {
    const x = (i) => 140 + i * 240;
    const kutular = [simge, simge + '⁺', simge + '²⁺', simge + '³⁺'].map((ad, i) => {
      const g = c.S('g', {}, p);
      kutu(c, g, x(i) - 70, y, 140, 100);
      yazi(c, g, x(i), y + 64, ad, { size: 38 });
      g.style.opacity = 0;
      return g;
    });
    const oklar = [0, 1, 2].map((i) => {
      const g = c.S('g', {}, p), x1 = x(i) + 82, x2 = x(i + 1) - 82, yo = y + 56;
      c.S('path', { d: `M ${x1} ${yo} L ${x2} ${yo} M ${x2 - 12} ${yo - 9} L ${x2} ${yo} L ${x2 - 12} ${yo + 9}`,
        fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      const etiket = yazi(c, g, (x1 + x2) / 2, y + 36, '', { size: 28 });
      g.style.opacity = 0;
      return { g, etiket, x: (x1 + x2) / 2 };
    });
    return { kutular, oklar, y };
  }
  /* Okun üstünde bir elektron yükselir ve orada kalır: o adımda kopan elektron. */
  async function elektronKop(c, p, Z, i) {
    const e = c.S('circle', { cx: Z.oklar[i].x, cy: Z.y + 56, r: 9, fill: IC }, p);
    await c.tween(600, (t) => { e.setAttribute('cy', Z.y + 56 - 92 * t); });
  }

  /* Atom şeması: çekirdek ve çevresinde enerji seviyeleri. seviye[k], k. enerji seviyesindeki elektron sayısıdır.
     En dış seviyenin elektronları sağ üste dizilir; kopan elektron boş alana doğru gider. */
  function atom(c, p, cx, cy, seviye) {
    const g = c.S('g', {}, p), R = [56, 102, 148], son = seviye.length - 1, RAD = Math.PI / 180;
    const halkalar = seviye.map(() => c.S('circle', { cx, cy, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2 }, g));
    c.S('circle', { cx, cy, r: 24, fill: CEKIRDEK }, g);
    const e = seviye.map((n, k) => Array.from({ length: n }, (_, j) => ({
      k, aci: (k === son ? -30 - j * 40 : j * 360 / n + (k ? 22.5 : 0)) * RAD,
      el: c.S('circle', { r: 9, fill: IC }, g),
    })));
    const A = { g, halkalar, e, cx, cy, R };
    yerlestir(A, 1);
    return A;
  }
  const yer = (A, d, s = 1, uzak = 0) => [A.cx + (A.R[d.k] * s + uzak) * Math.cos(d.aci), A.cy + (A.R[d.k] * s + uzak) * Math.sin(d.aci)];
  /* Halkaları ve elektronları yarıçapların s katına yerleştirir (s < 1: elektronlar çekirdeğe yaklaşır). */
  function yerlestir(A, s) {
    A.halkalar.forEach((h, k) => h.setAttribute('r', A.R[k] * s));
    A.e.flat().forEach((d) => { const [x, y] = yer(A, d, s); d.el.setAttribute('cx', x); d.el.setAttribute('cy', y); });
  }
  const boya = (d, renk, r = 11) => { d.el.setAttribute('fill', renk); d.el.setAttribute('r', r); };
  /* Elektron atomdan uzaklaşır ve kaybolur. */
  async function kopar(c, A, d) {
    await c.tween(700, (t) => {
      const [x, y] = yer(A, d, 1, 120 * t);
      d.el.setAttribute('cx', x); d.el.setAttribute('cy', y); d.el.style.opacity = 1 - t;
    });
  }
  /* Çekirdekten elektrona kesikli çizgi: uzaklığı gösterir. */
  const uzaklik = (c, A, d, renk) => {
    const [x, y] = yer(A, d);
    return c.S('line', { x1: A.cx + 24 * Math.cos(d.aci), y1: A.cy + 24 * Math.sin(d.aci), x2: x, y2: y,
      stroke: renk, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, A.g);
  };
  /* Elektron dizilimi; son parça (en dış enerji seviyesi) ayrı renklendirilebilsin diye ayrı tspan. */
  function dizilimYaz(c, p, x, y, govde, son) {
    const t = yazi(c, p, x, y, '', { size: 36 });
    c.S('tspan', { text: govde + ' ' }, t);
    return { t, son: c.S('tspan', { text: son }, t) };
  }

  /* Ardışık iyonlaşma enerjilerinin çubuk grafiği. Çubuk boyu değerle orantılıdır; max verilmezse ölçek bütün
     atomlarda aynıdır (12 000 kJ/mol). degerler[i] null ise "?" çerçevesi çizilir, tanımsızsa o sütun boş kalır.
     valans: sıçramadan önceki (sarı) çubuk sayısı · icOpak: öteki çubukların saydamlığı · egri: tepeleri birleştiren
     çizgi · farklar: komşu iki çubuk arasındaki fark işaretleri [{ i, metin, alt, renk }] · alt: en alttaki satır. */
  function grafik(c, svg, o) {
    svg.replaceChildren();
    const g = c.S('g', {}, svg), max = o.max || 12000, taban = 410, h = 250, valans = o.valans || 0;
    const x = (i) => 230 + i * 200, tepe = (i) => taban - o.degerler[i] / max * h, oran = o.oran || (() => 1);
    yazi(c, g, 500, 52, o.baslik, { size: 32 });
    c.S('line', { x1: 170, y1: taban, x2: 910, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    yazi(c, g, 110, taban + 44, 'kJ/mol', { size: 24, renk: RENK.soluk });
    o.degerler.forEach((v, i) => {
      if (v === undefined) return;
      yazi(c, g, x(i), taban + 44, IE[i], { size: 28 });
      if (v === null) {
        c.S('rect', { x: x(i) - 32, y: taban - 120, width: 64, height: 120, rx: 3, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, g);
        yazi(c, g, x(i), taban - 46, '?', { size: 40, renk: RENK.soluk });
        return;
      }
      const bh = v / max * h * oran(i), dis = i < valans;
      c.S('rect', { x: x(i) - 32, y: taban - bh, width: 64, height: bh, rx: 3, fill: dis ? VALANS : IC, opacity: dis || o.icOpak == null ? 1 : o.icOpak }, g);
      if (oran(i) > 0.98) yazi(c, g, x(i), taban - bh - 14, sayi(v), { size: 28 });
    });
    if (o.egri) {
      c.S('polyline', { points: o.degerler.map((_, i) => `${x(i)},${tepe(i)}`).join(' '), fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-dasharray': '7 7' }, g);
    }
    (o.farklar || []).forEach((f) => {
      const xb = x(f.i) + 56, ya = tepe(f.i), yb = tepe(f.i + 1), ym = (ya + yb) / 2, renk = f.renk || RENK.soluk;
      c.S('path', { d: `M ${x(f.i) + 32} ${ya} L ${xb + 8} ${ya}`, fill: 'none', stroke: renk, 'stroke-width': 2, 'stroke-dasharray': '5 5' }, g);
      c.S('path', { d: `M ${xb} ${ya} L ${xb} ${yb} M ${xb - 7} ${yb + 10} L ${xb} ${yb} L ${xb + 7} ${yb + 10}`,
        fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      if (f.metin) yazi(c, g, xb + 9, ym + (f.alt ? -4 : 9), f.metin, { size: 26, renk, hiza: 'start' });
      if (f.alt) yazi(c, g, xb + 9, ym + 24, f.alt, { size: 24, renk, hiza: 'start' });
    });
    if (o.alt) yazi(c, g, 500, 520, o.alt, { size: 28, renk: o.altRenk || RENK.soluk });
    return g;
  }
  /* Bir atomun grafiği, sıçramanın yeri ve verdiği elektron sayısıyla birlikte. */
  const iyonGrafik = (c, svg, kod, o = {}) => {
    const a = ATOM[kod];
    return grafik(c, svg, { baslik: `${a.ad} (${kod})`, degerler: a.ie, valans: a.valans,
      farklar: [{ i: a.valans - 1, metin: 'sıçrama', renk: SICRAMA }],
      alt: `${a.valans} elektron verir → ${a.iyon}`, altRenk: VALANS, ...o });
  };

  /* ---- Sahne 1 · Bir elektron daha ---- */
  async function birDaha(c) {
    const svg = c.svg();
    const genel = c.S('g', {}, svg), Z = zincir(c, genel, 'X', 150);
    const baslik = yazi(c, genel, 500, 66, 'Ardışık iyonlaşma enerjileri', { size: 32, renk: VALANS });
    baslik.style.opacity = 0;

    await belir(c, Z.kutular[0]);
    Z.oklar[0].etiket.textContent = IE[0];
    await belir(c, Z.oklar[0].g, 350);
    await elektronKop(c, genel, Z, 0);
    await c.say('Birinci iyonlaşma enerjisi, nötr atomdan ilk elektronu koparmak için gereken enerjiydi.');
    await belir(c, Z.kutular[1]);
    await c.say('İlk elektron kopunca geriye +1 yüklü bir katyon kalır: X⁺.',
      { speak: 'İlk elektron kopunca geriye artı bir yüklü bir katyon kalır: artı bir yüklü iks iyonu.' });
    await belir(c, Z.oklar[1].g, 350);
    await elektronKop(c, genel, Z, 1);
    await c.say('Bu iyondan bir elektron daha koparılabilir.');
    const ikinci = yazi(c, genel, Z.oklar[1].x, 300, 'ikinci iyonlaşma enerjisi', { size: 26, renk: RENK.soluk });
    await belir(c, ikinci, 350);
    await c.say('Gaz hâlindeki X⁺ iyonundan elektron koparmak için gereken enerji, ikinci iyonlaşma enerjisidir.',
      { speak: 'Gaz hâlindeki artı bir yüklü iks iyonundan elektron koparmak için gereken enerji, ikinci iyonlaşma enerjisidir.' });
    ikinci.remove();
    Z.oklar[1].etiket.textContent = IE[1];
    const denklem2 = yazi(c, genel, 500, 370, 'X⁺(g) + İE₂ → X²⁺(g) + e⁻', { size: 32 });
    await Promise.all([belir(c, Z.kutular[2]), belir(c, denklem2)]);
    await c.say('İkinci iyonlaşma enerjisi İE₂ ile gösterilir; oluşan iyon X²⁺ olur.',
      { speak: 'İkinci iyonlaşma enerjisi, i e iki ile gösterilir; oluşan iyon artı iki yüklü iks iyonu olur.' });
    Z.oklar[2].etiket.textContent = IE[2];
    await belir(c, Z.oklar[2].g, 350);
    await elektronKop(c, genel, Z, 2);
    const denklem3 = yazi(c, genel, 500, 430, 'X²⁺(g) + İE₃ → X³⁺(g) + e⁻', { size: 32 });
    await Promise.all([belir(c, Z.kutular[3]), belir(c, denklem3)]);
    await c.say('Gaz hâlindeki X²⁺ iyonundan elektron koparmanın enerjisi de üçüncü iyonlaşma enerjisidir; İE₃.',
      { speak: 'Gaz hâlindeki artı iki yüklü iks iyonundan elektron koparmanın enerjisi de üçüncü iyonlaşma enerjisidir; i e üç.' });
    Z.oklar.forEach((o) => { o.etiket.style.fill = VALANS; });
    await c.tween(350, (e) => { baslik.style.opacity = e; });
    await c.say('Art arda gelen bu enerjilere ardışık iyonlaşma enerjileri denir.');
    await Promise.all([sil(c, denklem2), sil(c, denklem3)]);
    await belir(c, yazi(c, genel, 500, 400, 'Her elektron için bir iyonlaşma enerjisi', { size: 32 }), 350);
    await c.say('Bir atomun, elektron sayısı kadar iyonlaşma enerjisi vardır.');

    await sil(c, genel, 350);
    const al = c.S('g', {}, svg), ZA = zincir(c, al, 'Al', 150);
    yazi(c, al, 500, 66, 'Alüminyum (Al)', { size: 32, renk: RENK.soluk });
    ZA.kutular.forEach((k, i) => { k.style.opacity = i < 2 ? 0.35 : 1; });
    ZA.oklar.forEach((o, i) => { o.g.style.opacity = i < 2 ? 0.35 : 1; });
    ZA.oklar[2].etiket.textContent = '?';
    ZA.oklar[2].etiket.style.fill = SICRAMA;
    const olay = yazi(c, al, 500, 370, 'Al²⁺(g) + enerji → Al³⁺(g) + e⁻', { size: 32 });
    await belir(c, al, 350);
    await c.choice({ tag: 'Uygula', q: 'Al²⁺(g) + enerji → Al³⁺(g) + e⁻ olayında harcanan enerji hangisidir?',
      options: ['İE₁', 'İE₂', 'İE₃'], answer: 2,
      hints: ['İE₁ nötr atomdan elektron koparır; burada başlangıç bir iyon.', 'İE₂, +1 yüklü iyondan elektron koparır; burada başlangıç Al²⁺.', ''],
      right: 'İE₃. Elektron +2 yüklü iyondan kopuyor ve Al³⁺ oluşuyor.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        ZA.oklar[2].etiket.textContent = IE[2];
        olay.textContent = 'Al²⁺(g) + İE₃ → Al³⁺(g) + e⁻';
      } });
    await elektronKop(c, al, ZA, 2);
    await c.say('Elektron Al²⁺ iyonundan kopuyor; bu enerji İE₃’tür.',
      { speak: 'Elektron artı iki yüklü alüminyum iyonundan kopuyor; [short pause] bu enerji üçüncü iyonlaşma enerjisidir.' });
    ZA.oklar[0].etiket.textContent = IE[0];
    ZA.oklar[1].etiket.textContent = IE[1];
    await c.tween(400, (e) => { [ZA.kutular[0], ZA.kutular[1], ZA.oklar[0].g, ZA.oklar[1].g].forEach((el) => { el.style.opacity = 0.35 + 0.65 * e; }); });
    olay.remove();
    await belir(c, yazi(c, al, 500, 390, '13 elektron → 13 iyonlaşma enerjisi', { size: 34, renk: VALANS }), 350);
    await c.say('Alüminyumun 13 elektronu vardır; 13 ayrı iyonlaşma enerjisi ölçülebilir.',
      { speak: 'Alüminyumun on üç elektronu vardır; on üç ayrı iyonlaşma enerjisi ölçülebilir.' });
    c.note('<b>İE₂: X⁺(g) → X²⁺(g) + e⁻</b><br>İE₃: X²⁺(g) → X³⁺(g) + e⁻', 'Ardışık iyonlaşma');
  }

  /* ---- Sahne 2 · Her elektron bir öncekinden zor kopar ---- */
  async function zorKopar(c) {
    const svg = c.svg();
    const sema = c.S('g', {}, svg);
    yazi(c, sema, 500, 52, 'Magnezyum (Mg)', { size: 32, renk: RENK.soluk });
    const A = atom(c, sema, 270, 300, ATOM.Mg.seviye), dis = A.e[2];
    const satir = (i, ad, elektron, soluk) => {
      const g = c.S('g', {}, sema), y = 210 + i * 62;
      yazi(c, g, 590, y, ad, { size: 30, hiza: 'end', renk: soluk ? RENK.soluk : 'var(--text)' });
      yazi(c, g, 690, y, '12 proton', { size: 28, renk: soluk ? RENK.soluk : CEKIRDEK });
      yazi(c, g, 860, y, elektron + ' elektron', { size: 28, renk: soluk ? RENK.soluk : IC });
      return g;
    };
    const ilk = satir(0, 'Mg', 12);
    await belir(c, sema);
    await c.say('Magnezyum atomunda 12 proton ve 12 elektron vardır.',
      { speak: 'Magnezyum atomunda on iki proton ve on iki elektron vardır.' });
    await kopar(c, A, dis[0]);
    ilk.style.opacity = 0.45;
    await belir(c, satir(1, 'Mg⁺', 11), 350);
    await c.say('İlk elektron kopunca 12 proton, kalan 11 elektronu çeker.',
      { speak: 'İlk elektron kopunca on iki proton, kalan on bir elektronu çeker.' });
    await belir(c, satir(2, 'Mg²⁺', 10, true), 350);
    await c.say('Proton sayısı aynı kalır; elektron sayısı her adımda bir azalır.');
    const etki = yazi(c, sema, 730, 440, 'elektronlar arası itme azalır', { size: 28 });
    await belir(c, etki, 350);
    await c.say('Elektron azaldıkça elektronların birbirini itmesi de azalır.');
    boya(dis[1], VALANS);
    const [ex, ey] = yer(A, dis[1]);
    const siradaki = yazi(c, sema, ex + 22, ey - 12, 'ikinci elektron', { size: 26, renk: VALANS, hiza: 'start' });
    await belir(c, siradaki, 350);
    await c.choice({ q: 'Magnezyumda ikinci elektronu koparmak için gereken enerji, birincisine göre nasıldır?',
      options: ['Daha küçüktür', 'Daha büyüktür', 'Aynıdır'], answer: 1,
      hints: ['Elektron azalınca itme azalır; kalan elektronlar daha zayıf değil, daha güçlü tutulur.', '', 'On iki proton artık on bir elektronu çekiyor; koşul değişti.'],
      right: 'Daha büyüktür. Şimdi nedenine ve ölçülen değerlere bakalım.' });
    siradaki.remove();
    etki.textContent = 'çekirdeğe daha güçlü bağlanır';
    await c.tween(700, (e) => yerlestir(A, 1 - 0.1 * e));
    await c.say('Kalan elektronlar çekirdeğe daha güçlü bağlanır; koparmak zorlaşır.');

    await sil(c, sema, 350);
    const mg = ATOM.Mg.ie, ortak = { baslik: 'Magnezyum (Mg)', max: 1700 };
    await c.tween(800, (e) => grafik(c, svg, { ...ortak, degerler: [mg[0], mg[1]], oran: () => e }));
    await c.say('Magnezyum için ölçülen değerler: İE₁ 738, İE₂ 1451 kJ/mol.',
      { speak: 'Magnezyum için ölçülen değerler: birinci iyonlaşma enerjisi yedi yüz otuz sekiz, ikinci iyonlaşma enerjisi bin dört yüz elli bir kilojul bölü mol.' });
    grafik(c, svg, { ...ortak, degerler: [mg[0], mg[1]], farklar: [{ i: 0, renk: SICRAMA }], alt: 'İE₁ < İE₂ < İE₃ < …', altRenk: 'var(--text)' });
    await c.say('Her atomda ardışık iyonlaşma enerjileri giderek büyür.');
    grafik(c, svg, { ...ortak, degerler: [mg[0], mg[1], null, null], farklar: [{ i: 0, renk: SICRAMA }], alt: 'İE₁ < İE₂ < İE₃ < …', altRenk: 'var(--text)' });
    await c.say('Peki enerji her adımda aynı miktarda mı büyür?', { speak: '[curious] Peki enerji her adımda aynı miktarda mı büyür?' });
  }

  /* ---- Sahne 3 · Adımlar eşit değil ---- */
  async function adimlar(c) {
    const svg = c.svg(), na = ATOM.Na.ie;
    const ciz = (o) => grafik(c, svg, { baslik: 'Sodyum (Na)', degerler: na, ...o });
    const fark = (metinler, o = {}) => metinler.map((metin, i) => ({ i, metin, renk: i === 0 && o.vurgu ? SICRAMA : undefined, alt: o.altlar && o.altlar[i] }));
    await belir(c, ciz({ degerler: [null, null, null, null] }));
    await c.say('Sodyumun ilk dört iyonlaşma enerjisi ölçülmüştür.');
    await c.tween(700, (e) => ciz({ degerler: [na[0], na[1], null, null], oran: () => e }));
    await c.say('İE₁ 496, İE₂ 4562 kJ/mol’dür.',
      { speak: 'Birinci iyonlaşma enerjisi dört yüz doksan altı, ikinci iyonlaşma enerjisi dört bin beş yüz altmış iki kilojul bölü moldür.' });
    await c.tween(700, (e) => ciz({ oran: (i) => (i > 1 ? e : 1) }));
    await c.say('İE₃ 6912, İE₄ 9544 kJ/mol’dür.',
      { speak: 'Üçüncü iyonlaşma enerjisi altı bin dokuz yüz on iki, dördüncü iyonlaşma enerjisi dokuz bin beş yüz kırk dört kilojul bölü moldür.' });
    ciz({ egri: true });
    await c.say('Değerler her adımda büyüyor.');
    ciz({ farklar: fark(['?', '?', '?']), alt: 'fark = sonraki değer − önceki değer' });
    await c.say('Adımları karşılaştırmak için ardışık iki değerin farkına bakarız.');
    await c.choice({ tag: 'Uygula', q: 'Sodyumda en büyük fark hangi iki enerji arasındadır?',
      options: ['İE₁ ile İE₂', 'İE₂ ile İE₃', 'İE₃ ile İE₄'], answer: 0,
      hints: ['', '6912 − 4562 = 2350. İlk iki değerin farkı bundan büyük.', '9544 − 6912 = 2632. İlk iki değerin farkı bundan büyük.'],
      right: 'İE₁ ile İE₂. 4562 − 496 = 4066 kJ/mol.' });
    ciz({ farklar: fark(['4066', '2350', '2632'], { vurgu: true }) });
    await c.say('Farklar sırayla 4066, 2350 ve 2632 kJ/mol’dür.',
      { speak: 'Farklar sırayla dört bin altmış altı, iki bin üç yüz elli ve iki bin altı yüz otuz iki kilojul bölü moldür.' });
    ciz({ farklar: fark(['4066', '2350', '2632'], { vurgu: true }), alt: 'İE₂, İE₁’in 9 katından fazla', altRenk: SICRAMA });
    await c.say('İkinci elektron, birincinin dokuz katından fazla enerji ister.');
    ciz({ farklar: fark(['4066', '2350', '2632'], { vurgu: true, altlar: ['sıçrama'] }), alt: 'sıçrama: enerjinin bir adımda çok büyümesi', altRenk: SICRAMA });
    await c.say('Enerjinin bir adımda böyle çok büyümesine sıçrama diyeceğiz.');
    ciz({ farklar: fark(['4066', '2350', '2632'], { vurgu: true, altlar: ['sıçrama', 'artış', 'artış'] }), alt: 'Sodyumda sıçrama ilk adımda', altRenk: SICRAMA });
    await c.say('Her artış sıçrama değildir; sodyumda sıçrama ilk adımdadır.',
      { speak: '[thoughtful] Her artış sıçrama değildir; sodyumda sıçrama ilk adımdadır.' });
  }

  /* ---- Sahne 4 · Sıçramanın nedeni ---- */
  async function neden(c) {
    const svg = c.svg();
    const sodyum = c.S('g', {}, svg);
    yazi(c, sodyum, 500, 52, 'Sodyum (Na)', { size: 32, renk: RENK.soluk });
    const A = atom(c, sodyum, 250, 290, ATOM.Na.seviye), dis = A.e[2][0];
    const D = dizilimYaz(c, sodyum, 700, 200, '1s² 2s² 2p⁶', '3s¹');
    await belir(c, sodyum);
    await c.say('Sıçramayı sodyumun elektron dizilimi açıklar: 1s² 2s² 2p⁶ 3s¹.',
      { speak: 'Sıçramayı sodyumun elektron dizilimi açıklar: bir se iki, iki se iki, iki pe altı, üç se bir.' });
    A.halkalar[2].setAttribute('stroke', VALANS);
    boya(dis, VALANS);
    const altYazi = yazi(c, sodyum, 250, 492, 'en dış enerji seviyesi', { size: 26, renk: VALANS });
    await belir(c, altYazi, 350);
    await c.say('En dış enerji seviyesindeki elektronlara valans elektronu denir; bunu görmüştük.');
    D.son.style.fill = VALANS;
    const valansYazi = yazi(c, sodyum, 700, 252, '1 valans elektronu', { size: 28, renk: VALANS });
    await belir(c, valansYazi, 350);
    await c.say('Sodyumun tek valans elektronu 3s orbitalindedir.', { speak: 'Sodyumun tek valans elektronu üç se orbitalindedir.' });
    const uzak = uzaklik(c, A, dis, VALANS);
    altYazi.textContent = 'çekirdeğe en uzak elektron';
    await belir(c, uzak, 350);
    await c.say('İlk kopan elektron budur; çekirdeğe en uzak olan odur.');
    uzak.remove();
    altYazi.remove();
    await kopar(c, A, dis);
    A.halkalar[2].setAttribute('stroke', RENK.cizgi);
    A.halkalar[2].setAttribute('stroke-dasharray', '4 8');
    D.t.remove();
    valansYazi.remove();
    const iyon = yazi(c, sodyum, 700, 200, 'Na⁺: 1s² 2s² 2p⁶', { size: 36 });
    const durum = yazi(c, sodyum, 700, 252, 'neon ile aynı dizilim', { size: 28, renk: RENK.soluk });
    await Promise.all([belir(c, iyon, 350), belir(c, durum, 350)]);
    await c.say('Geriye Na⁺ iyonu kalır; dizilimi neonunkiyle aynıdır: 1s² 2s² 2p⁶.',
      { speak: 'Geriye artı bir yüklü sodyum iyonu kalır; dizilimi neonunkiyle aynıdır: bir se iki, iki se iki, iki pe altı.' });
    durum.textContent = 'soy gaz dizilimi: kararlı';
    durum.style.fill = 'var(--good)';
    await belir(c, durum, 350);
    await c.say('Soy gaz dizilimi kararlıdır.');
    const ic = A.e[1][7];
    boya(ic, SICRAMA);
    const yakin = uzaklik(c, A, ic, SICRAMA);
    const icYazi = yazi(c, sodyum, 250, 492, 'iç enerji seviyesi: daha yakın', { size: 26, renk: SICRAMA });
    await Promise.all([belir(c, yakin, 350), belir(c, icYazi, 350)]);
    await c.say('İkinci elektron bir iç enerji seviyesinden, çekirdeğe daha yakından kopmalıdır.');
    await belir(c, yazi(c, sodyum, 700, 390, 'İE₁ 496 → İE₂ 4562 kJ/mol', { size: 30, renk: SICRAMA }), 350);
    await c.say('Kararlı dizilimdeki yakın elektronu koparmak çok daha fazla enerji ister.',
      { speak: '[thoughtful] Kararlı dizilimdeki yakın elektronu koparmak çok daha fazla enerji ister.' });

    await sil(c, sodyum, 350);
    const magnezyum = c.S('g', {}, svg);
    yazi(c, magnezyum, 500, 52, 'Magnezyum (Mg)', { size: 32, renk: RENK.soluk });
    const B = atom(c, magnezyum, 250, 290, ATOM.Mg.seviye);
    B.halkalar[2].setAttribute('stroke', VALANS);
    B.e[2].forEach((d) => boya(d, VALANS));
    const mgDizilim = dizilimYaz(c, magnezyum, 700, 200, '1s² 2s² 2p⁶', '3s²');
    mgDizilim.son.style.fill = VALANS;
    const mgYazi = yazi(c, magnezyum, 700, 252, '2 valans elektronu', { size: 28, renk: VALANS });
    await belir(c, magnezyum, 350);
    await c.choice({ tag: 'Uygula', q: 'Magnezyumun dizilimi 3s² ile biter; iki valans elektronu vardır. En büyük sıçrama hangi iki enerji arasında beklenir?',
      options: ['İE₁ ile İE₂', 'İE₂ ile İE₃', 'İE₃ ile İE₄'], answer: 1,
      hints: ['İlk iki elektronun ikisi de valans elektronu; ikisi de en dış enerji seviyesinden kopar.', '', 'Üçüncü elektron iç enerji seviyesinden kopar; sıçrama ondan hemen önce olur.'],
      right: 'İE₂ ile İE₃. İki valans elektronundan sonra sıra iç enerji seviyesine gelir.' });
    await kopar(c, B, B.e[2][0]);
    await kopar(c, B, B.e[2][1]);
    B.halkalar[2].setAttribute('stroke', RENK.cizgi);
    B.halkalar[2].setAttribute('stroke-dasharray', '4 8');
    boya(B.e[1][7], SICRAMA);
    mgDizilim.t.textContent = 'Mg²⁺: 1s² 2s² 2p⁶';
    mgYazi.textContent = 'sıra iç enerji seviyesinde';
    mgYazi.style.fill = SICRAMA;
    await belir(c, mgYazi, 350);
    await c.say('İki valans elektronu kopunca sıra iç enerji seviyesine gelir.');
    await sil(c, magnezyum, 350);
    const ortak = { baslik: 'Magnezyum (Mg)', degerler: ATOM.Mg.ie };
    await c.tween(800, (e) => grafik(c, svg, { ...ortak, oran: () => e }));
    await c.say('Magnezyumun değerleri: 738, 1451, 7733 ve 10 540 kJ/mol.',
      { speak: 'Magnezyumun değerleri: yedi yüz otuz sekiz, bin dört yüz elli bir, yedi bin yedi yüz otuz üç ve on bin beş yüz kırk kilojul bölü mol.' });
    grafik(c, svg, { ...ortak, valans: 2, farklar: [{ i: 1, metin: 'sıçrama', renk: SICRAMA }], alt: 'Sarı: valans elektronları · Mavi: iç enerji seviyesi' });
    await c.say('Sıçrama, valans elektronlarının bittiği yerdedir.', { speak: 'Sıçrama, [short pause] valans elektronlarının bittiği yerdedir.' });
    c.note('<b>Valans elektronları bitince enerji sıçrar.</b><br>Na: 496 → 4562 kJ/mol', 'Sıçrama');
  }

  /* ---- Sahne 5 · Enerjilerden valans elektron sayısına ---- */
  async function tersinden(c) {
    const svg = c.svg(), na = { baslik: 'Sodyum (Na)', degerler: ATOM.Na.ie };
    await belir(c, grafik(c, svg, { ...na, alt: 'enerjiler → valans elektron sayısı' }));
    await c.say('Şimdi tersinden gidelim: enerjilerden valans elektron sayısını bulalım.');
    grafik(c, svg, { ...na, farklar: [{ i: 0, metin: '4066', renk: SICRAMA }], alt: '1. En büyük farkı bul', altRenk: SICRAMA });
    await c.say('Önce ardışık değerler arasındaki en büyük farkı buluruz.');
    grafik(c, svg, { ...na, valans: 1, farklar: [{ i: 0, metin: '4066', renk: SICRAMA }], alt: '2. Sıçramadan önceki enerjileri say: 1', altRenk: VALANS });
    await c.say('Bu sıçramadan önce kaç enerji varsa o kadar valans elektronu vardır.');

    const al = ATOM.Al.ie, gizli = { baslik: 'Hangi element?', degerler: al };
    await c.tween(800, (e) => grafik(c, svg, { ...gizli, oran: () => e, alt: 'Bir A grubu elementi' }));
    await c.say('Bir A grubu elementinin değerleri: 577, 1817, 2745 ve 11 578 kJ/mol.',
      { speak: 'Bir A grubu elementinin değerleri: beş yüz yetmiş yedi, bin sekiz yüz on yedi, iki bin yedi yüz kırk beş ve on bir bin beş yüz yetmiş sekiz kilojul bölü mol.' });
    await c.choice({ tag: 'Uygula', q: 'Bu elementin kaç valans elektronu vardır?', options: ['2', '3', '4'], answer: 1,
      hints: ['1817 ile 2745 arasındaki fark küçük; sıçrama orada değil.', '', 'Dördüncü enerji sıçramadan sonradır; valans elektronuna ait değildir.'],
      right: '3. En büyük fark üçüncü enerjiden sonra.' });
    const sicrama = [{ i: 2, metin: '8833', renk: SICRAMA }];
    grafik(c, svg, { ...gizli, farklar: sicrama, alt: 'En büyük fark: İE₃ ile İE₄ arasında', altRenk: SICRAMA });
    await c.say('En büyük fark üçüncü ile dördüncü enerji arasındadır: 8833 kJ/mol.',
      { speak: 'En büyük fark üçüncü ile dördüncü enerji arasındadır: sekiz bin sekiz yüz otuz üç kilojul bölü mol.' });
    grafik(c, svg, { ...gizli, valans: 3, farklar: sicrama, alt: 'Sıçramadan önce 3 enerji → 3 valans elektronu', altRenk: VALANS });
    await c.say('Sıçramadan önce üç enerji vardır; valans elektron sayısı üçtür.');
    grafik(c, svg, { ...gizli, valans: 3, farklar: sicrama, alt: '3 valans elektronu → 3A grubu', altRenk: VALANS });
    await c.say('A grubunda valans elektron sayısı grup numarasını verir; bunu görmüştük.');
    grafik(c, svg, { ...gizli, baslik: 'Alüminyum (Al) · 3A', valans: 3, farklar: sicrama, alt: '3 valans elektronu → 3A grubu', altRenk: VALANS });
    await c.say('Bu element 3A grubundaki alüminyumdur.', { speak: 'Bu element üç A grubundaki alüminyumdur.' });
    c.note('<b>Sıçramadan önceki enerji sayısı = valans elektron sayısı.</b><br>Al: 3 → 3A', 'Enerjilerden valansa');
  }

  /* ---- Sahne 6 · Kararlı iyon ---- */
  async function kararliIyon(c) {
    const svg = c.svg();
    await belir(c, iyonGrafik(c, svg, 'Na', { farklar: [], icOpak: 0.3, alt: 'Sarı çubuk: en yüksek enerji seviyesindeki elektron' }));
    await c.say('Katyon oluşurken atom, en yüksek enerji seviyesindeki elektronlarını verir.');
    await c.tween(500, (e) => iyonGrafik(c, svg, 'Na', { farklar: [], icOpak: 0.3 + 0.7 * e, alt: 'Mavi çubuklar: iç enerji seviyesindeki elektronlar', altRenk: IC }));
    await c.say('İç enerji seviyesinden elektron koparmak ise çok fazla enerji ister.');
    iyonGrafik(c, svg, 'Na', { alt: 'Sıçramadan önce: 1 elektron' });
    await c.say('Bu yüzden atom yalnızca sıçramadan önceki elektronlarını verir.');
    iyonGrafik(c, svg, 'Na');
    await c.say('Sodyum bir elektron verir; kararlı iyonu Na⁺ olur.',
      { speak: 'Sodyum bir elektron verir; kararlı iyonu artı bir yüklü sodyum iyonu olur.' });
    await belir(c, iyonGrafik(c, svg, 'Mg'), 350);
    await c.say('Magnezyum iki elektron verir; kararlı iyonu Mg²⁺ olur.',
      { speak: 'Magnezyum iki elektron verir; kararlı iyonu artı iki yüklü magnezyum iyonu olur.' });
    await belir(c, iyonGrafik(c, svg, 'Al', { alt: 'Kararlı iyon: ?' }), 350);
    await c.choice({ tag: 'Uygula', q: 'Alüminyumda sıçrama üçüncü enerjiden sonradır. Alüminyumun kararlı iyonu hangisidir?',
      options: ['Al⁺', 'Al²⁺', 'Al³⁺'], answer: 2,
      hints: ['İkinci elektron da sıçramadan önce; onu koparmak çok fazla enerji istemez.', 'Üçüncü elektron da sıçramadan önce; atom onu da verir.', ''],
      right: 'Al³⁺. Atom, sıçramadan önceki üç elektronunu verir.',
      onPick: (i, dogru) => { if (dogru) iyonGrafik(c, svg, 'Al'); } });
    await c.say('Alüminyum üç valans elektronunu verir; kararlı iyonu Al³⁺ olur.',
      { speak: 'Alüminyum üç valans elektronunu verir; kararlı iyonu artı üç yüklü alüminyum iyonu olur.' });

    svg.replaceChildren();
    const neon = c.S('g', {}, svg);
    yazi(c, neon, 500, 90, 'Üçü de neon diziliminde', { size: 32, renk: RENK.soluk });
    KODLAR.forEach((kod, i) => {
      const x = 80 + i * 290;
      kutu(c, neon, x, 160, 260, 220, { renk: VALANS });
      yazi(c, neon, x + 130, 250, ATOM[kod].iyon, { size: 50 });
      yazi(c, neon, x + 130, 330, '1s² 2s² 2p⁶', { size: 30 });
    });
    await belir(c, neon);
    await c.say('Na⁺, Mg²⁺ ve Al³⁺ iyonlarının üçü de neon dizilimindedir.',
      { speak: 'Artı bir yüklü sodyum, artı iki yüklü magnezyum ve artı üç yüklü alüminyum iyonlarının üçü de neon dizilimindedir.' });
    const sec = c.slider({ label: 'Element', min: 0, max: 2, value: 0, fmt: (i) => KODLAR[i], onInput: (i) => iyonGrafik(c, svg, KODLAR[i]) });
    await c.say('Na, Mg ve Al grafiklerini seç; sıçramanın yerini ve oluşan iyonu karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();

    svg.replaceChildren();
    const ozet = c.S('g', {}, svg), sutun = [220, 500, 780];
    ['Atom', 'Valans elektronu', 'Kararlı iyon'].forEach((ad, k) => yazi(c, ozet, sutun[k], 110, ad, { size: 28, renk: RENK.soluk }));
    KODLAR.forEach((kod, i) => {
      const y = 150 + i * 110, a = ATOM[kod];
      kutu(c, ozet, 90, y, 820, 88);
      yazi(c, ozet, sutun[0], y + 56, kod, { size: 34 });
      yazi(c, ozet, sutun[1], y + 56, String(a.valans), { size: 34, renk: VALANS });
      yazi(c, ozet, sutun[2], y + 56, a.iyon, { size: 34 });
    });
    await belir(c, ozet);
    await c.say('Ardışık iyonlaşma enerjileri, valans elektron sayısını ve kararlı iyonu gösterir.');
    c.note('<b>Sıçramadan önce verilen elektron sayısı iyon yüküdür.</b><br>Na⁺, Mg²⁺, Al³⁺', 'Kararlı iyon');
  }

  Ders.start({
    id: 'etkilesim-h3', kicker: 'Konu H · Periyodik özellikler', title: 'Ardışık enerjiler ve valans', accent: '#ffc857', back: 'index.html',
    intro: { title: 'Ardışık enerjiler ve valans', hook: 'Enerji neden bir basamakta çok daha fazla artar?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Bir elektron daha', goal: 'İkinci ve üçüncü iyonlaşma enerjisini tanımla.', run: birDaha },
      { title: 'Her elektron bir öncekinden zor kopar', goal: 'Enerjinin neden büyüdüğünü açıkla.', run: zorKopar },
      { title: 'Adımlar eşit değil', goal: 'Ardışık değerlerin farkını karşılaştır.', run: adimlar },
      { title: 'Sıçramanın nedeni', goal: 'Sıçramayı elektron dizilimiyle açıkla.', run: neden },
      { title: 'Enerjilerden valans elektron sayısına', goal: 'Enerjilerden valans elektron sayısını bul.', run: tersinden },
      { title: 'Kararlı iyon', goal: 'Sıçramanın yerinden kararlı iyonu bul.', run: kararliIyon },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir A grubu elementinin ilk dört iyonlaşma enerjisi 900, 1757, 14 849 ve 21 006 kJ/mol’dür. Kaç valans elektronu vardır?',
        options: ['1', '2', '3'], answer: 1,
        why: ['900 ile 1757 arasındaki fark küçük; sıçrama ikinci enerjiden sonradır.', 'En büyük fark ikinci ile üçüncü enerji arasındadır; sıçramadan önce iki enerji vardır.', 'Üçüncü enerji sıçramadan sonra gelir; valans elektronuna ait değildir.'], scene: 4 },
      { q: 'Bir A grubu elementinin ilk dört iyonlaşma enerjisi 800, 2427, 3660 ve 25 026 kJ/mol’dür. Bu element hangi gruptadır?',
        options: ['1A', '2A', '3A'], answer: 2,
        why: ['1A için sıçrama ilk enerjiden sonra olmalıydı; burada en büyük fark en sonda.', '2A için sıçrama ikinci enerjiden sonra olmalıydı; 2427 ile 3660 arasındaki fark küçük.', 'Sıçrama üçüncü enerjiden sonradır; üç valans elektronu 3A grubunu gösterir.'], scene: 4 },
      { q: 'Bir A grubu elementinin ardışık iyonlaşma enerjilerinde en büyük sıçrama dördüncü ile beşinci enerji arasındadır. Bu element hangi gruptadır?',
        options: ['4A', '5A', '3A'], answer: 0,
        why: ['Evet. Sıçramadan önce dört enerji vardır; dört valans elektronu 4A grubunu gösterir.', '5A için sıçrama beşinci enerjiden sonra olmalıydı; burada dördüncüden sonradır.', '3A için sıçrama üçüncü enerjiden sonra olmalıydı; burada dördüncüden sonradır.'], scene: 4 },
      { q: 'Kaan: “İyonlaşma enerjisi her adımda büyüdüğü için her artış bir sıçramadır; valans elektron sayısını bulmak için ilk artışa bakarım.” Kaan’a hangi karşılık verilmelidir?',
        options: ['Haklı; enerji her adımda büyüdüğü için her artış sıçramadır.', 'Haksız; enerji her adımda aynı miktarda arttığı için sıçrama yoktur.', 'Haksız; sıçrama, enerjinin ötekilerden çok daha fazla arttığı adımdır.'], answer: 2,
        why: ['Enerji her adımda büyür ama her artış sıçrama değildir. Sıçrama, belirgin biçimde daha büyük olan artıştır.', 'Adımlar eşit değildir; farklar birbirinden çok ayrıdır. Bu yüzden bir adımda sıçrama görülür.', 'Evet. Valans elektronları bitince enerji ötekilerden çok daha fazla artar; yeri elementten elemente değişir.'], scene: 2 },
    ], summary: ['<b>Büyük sıçramadan önce valans elektronları biter.</b>', 'Sıçramadan önceki enerji sayısı, valans elektron sayısını ve kararlı iyonun yükünü verir.'],
    nextLesson: { href: 'h4-elektronegatiflik.html', label: 'Sonraki: Elektronegatiflik ›' },
  });
})();
