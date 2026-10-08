/* B2 · KİM.9.1.2 c–d · Senaryo: plan/kimya/etkilesim/senaryolar/B-kimyasal-maddeler-ve-guvenlik.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 15, 34, 36–38 ve 40–43'ten (on bir işaret, laboratuvar kuralları, KBRN). Öğrenciye
   kitap ya da sayfa anılmaz. On bir işaretin çizimi şematiktir; gerçek güvenlik etiketi yerine kullanılmaz. Önlük, gözlük
   ve eldiven düz çizimdir, işaret gibi çerçevelenmez: eldiven "koruyucu ekipman işareti" diye sunulmaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const KOYU = '#162038', GRI = '#8f9bbd', SIYAH = '#171717';
  const IYI = 'var(--good)', KOTU = 'var(--bad)';
  /* Zincirin halkaları B1'deki renkleriyle. */
  const MADDE = 'var(--c1)', HATA = 'var(--c5)', SONUC = 'var(--bad)';
  const ASIT = 'var(--c2)', BAZ = 'var(--c4)';

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const cizgi = (c, p, d, renk = RENK.cizgi, kalin = 4) => c.S('path', { d, fill: 'none', stroke: renk, 'stroke-width': kalin,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  /* (x1, y1) noktasından (x2, y2) noktasına ok. */
  function ok(c, p, x1, y1, x2, y2, renk = RENK.cizgi) {
    const a = Math.atan2(y2 - y1, x2 - x1), u = 13;
    const kanat = (d) => `M ${x2} ${y2} L ${x2 - u * Math.cos(a + d)} ${y2 - u * Math.sin(a + d)}`;
    return cizgi(c, p, `M ${x1} ${y1} L ${x2} ${y2} ${kanat(0.5)} ${kanat(-0.5)}`, renk);
  }
  const sil = async (c, el, ms = 300) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const temizle = async (c, svg) => { await c.tween(300, (e) => { svg.style.opacity = 1 - e; }); svg.replaceChildren(); svg.style.opacity = 1; };

  /* ---- On bir işaret (şematik) ---- */
  const ADLAR = ['Patlayıcı madde', 'Korozif madde', 'Zehirli madde', 'Çevreye zararlı madde', 'Oksitleyici madde', 'Tahriş edici madde',
    'Yanıcı-parlayıcı madde', 'Sağlık etkisi', 'Gaz', 'Radyoaktif madde', 'Tıbbi atık'];
  const P = { patlayici: 0, korozif: 1, zehirli: 2, cevre: 3, oksitleyici: 4, tahris: 5, yanici: 6, saglik: 7, gaz: 8, radyoaktif: 9, tibbi: 10 };
  const kalem = (c, p, d, kalin = 7) => cizgi(c, p, d, SIYAH, kalin);
  function alev(c, p, x, y, s) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    c.S('path', { d: 'M-35 44C-77 10-37-14-42-50C-18-34-16-7-8-22C4-42-3-67 6-84C14-62 42-45 31-10C49-26 60 7 43 31C32 49 5 60-18 51C-38 42-22 20-18 5C-9 17-13 40 4 40C18 31 2 15 10 0C25 14 30 29 20 43Z', fill: SIYAH }, g);
    return g;
  }
  const SIMGE = [
    /* 0 · patlayıcı: parçalanan cisim */
    (c, g) => {
      const p = c.S('g', { transform: 'scale(.78)' }, g);
      c.S('path', { d: 'M-66 40L-32 11L-29-25L-6-3L25-32L21 2L68 7L30 27L65 62L18 42L-3 83L-13 46L-56 69Z', fill: SIYAH }, p);
      [[-91, 14, -54, 20], [10, -103, -3, -45], [80, -69, 32, -26], [101, 28, 58, 25], [70, 95, 36, 63], [-79, -57, -43, -21]]
        .forEach(([a, b, d, e]) => kalem(c, p, `M${a} ${b}L${d} ${e}`, 4));
      c.S('path', { d: 'M60-76L73-92L80-75ZM-94 63L-75 58L-83 78ZM42 102L52 82L64 98Z', fill: SIYAH }, p);
    },
    /* 1 · korozif: iki tüpten damlayan sıvı, aşınan el ve yüzey */
    (c, g) => {
      kalem(c, g, 'M-85-66L-12-30L-3-48L-76-84ZM26-83L82-48L93-66L37-101Z', 5);
      c.S('path', { d: 'M-12-14Q-26 7-12 12Q2 7-12-14ZM64-21Q50 0 64 5Q78 0 64-21Z', fill: SIYAH }, g);
      c.S('path', { d: 'M-95 66H-23V80H-95ZM15 74V24H-16Q-23 12-31 17L-41 35H-84V49H-43L-21 61H15Z', fill: SIYAH }, g);
      kalem(c, g, 'M48 37H96V69H48M57 37L66 47L73 39L82 50', 9);
    },
    /* 2 · zehirli: kafatası ve çapraz kemik */
    (c, g) => {
      kalem(c, g, 'M-72 57L72-5M-72-5L72 57', 14);
      c.S('path', { d: 'M-48-26C-52-100 53-100 48-26L30 0V25H-30V0Z', fill: '#fff', stroke: SIYAH, 'stroke-width': 5 }, g);
      [-22, 22].forEach((cx) => c.S('circle', { cx, cy: -32, r: 15, fill: SIYAH }, g));
      c.S('path', { d: 'M0-17L-8-4H8Z', fill: SIYAH }, g);
      kalem(c, g, 'M-24 12H24M-12 4V24M0 4V24M12 4V24', 4);
    },
    /* 3 · çevreye zararlı: ağaç ve balık */
    (c, g) => {
      kalem(c, g, 'M-49 79V-55M-49-9L-82-47M-49-5L-17-59M-49 20L-88-9M-49 29L-7-12M-49-44L-63-80M-96 82H84', 8);
      c.S('path', { d: 'M0 47Q34 8 65 44L90 31L83 56L93 72L66 64Q35 94 0 47Z', fill: SIYAH }, g);
      c.S('circle', { cx: 18, cy: 49, r: 4, fill: '#fff' }, g);
    },
    /* 4 · oksitleyici: alevin altında halka */
    (c, g) => {
      alev(c, g, 0, -30, 0.85);
      c.S('circle', { cx: 0, cy: 33, r: 44, fill: '#fff', stroke: SIYAH, 'stroke-width': 10 }, g);
      kalem(c, g, 'M-62 85H62', 8);
    },
    /* 5 · tahriş edici: ünlem */
    (c, g) => {
      c.S('path', { d: 'M-18-80Q0-95 18-80L11 32H-11Z', fill: SIYAH }, g);
      c.S('circle', { cx: 0, cy: 66, r: 17, fill: SIYAH }, g);
    },
    /* 6 · yanıcı-parlayıcı: halkasız alev */
    (c, g) => {
      alev(c, g, 0, 10, 1);
      kalem(c, g, 'M-63 83H63', 8);
    },
    /* 7 · sağlık etkisi: insan gövdesi */
    (c, g) => {
      c.S('ellipse', { cx: 0, cy: -49, rx: 29, ry: 37, fill: SIYAH }, g);
      c.S('path', { d: 'M-18-15L-18 2Q-75 7-68 42L-20 91H20L68 42Q75 7 18 2V-15Z', fill: SIYAH }, g);
      c.S('path', { d: 'M0 11L9 29L29 18L20 40L40 46L20 53L31 75L9 65L0 85L-8 64L-29 76L-20 53L-40 46L-21 40L-30 18L-10 28Z', fill: '#fff' }, g);
    },
    /* 8 · gaz: gaz tüpü */
    (c, g) => {
      const t = c.S('g', { transform: 'rotate(-18)' }, g);
      c.S('rect', { x: -92, y: -24, width: 161, height: 48, rx: 23, fill: SIYAH }, t);
      c.S('rect', { x: 62, y: -13, width: 33, height: 26, fill: SIYAH }, t);
      kalem(c, t, 'M95-18V18', 7);
    },
    /* 9 · radyoaktif (sarı üçgen) */
    (c, g) => {
      const r = c.S('g', { transform: 'translate(0 30)' }, g);
      c.S('circle', { cx: 0, cy: 0, r: 12, fill: SIYAH }, r);
      [0, 120, 240].forEach((a) => c.S('path', { d: 'M-16-9L-60-35A70 70 0 0 1 0-70L0-19A19 19 0 0 0-16-9Z', fill: SIYAH, transform: `rotate(${a})` }, r));
    },
    /* 10 · tıbbi atık (sarı üçgen) */
    (c, g) => {
      const b = c.S('g', { transform: 'translate(0 35) scale(1.3)' }, g);
      [0, 120, 240].forEach((a) => c.S('path', { d: 'M-7-13C-37-14-40-43-25-60C-62-43-58-1-26 8C-12 11-9 2-7-13ZM7-13C37-14 40-43 25-60C62-43 58-1 26 8C12 11 9 2 7-13Z', fill: SIYAH, transform: `rotate(${a})` }, b));
      c.S('circle', { cx: 0, cy: 0, r: 21, fill: 'none', stroke: SIYAH, 'stroke-width': 5 }, b);
      c.S('circle', { cx: 0, cy: 0, r: 7, fill: '#f7e41b' }, b);
    },
  ];
  /* i. işaret, (x, y) merkezli; s = 1 iken köşeden köşeye 300 birim. i = -1: içi boş kırmızı çerçeve. */
  function piktogram(c, p, i, x, y, s) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    if (i < 9) c.S('path', { d: 'M0-150L150 0L0 150L-150 0Z', fill: '#fff', stroke: '#df263c', 'stroke-width': 9, 'stroke-linejoin': 'round' }, g);
    else c.S('path', { d: 'M0-145L150 130H-150Z', fill: '#f7e41b', stroke: SIYAH, 'stroke-width': 9, 'stroke-linejoin': 'round' }, g);
    if (i >= 0) SIMGE[i](c, c.S('g', { transform: 'scale(.72)' }, g));
    return g;
  }
  /* İşaretin altına iki satırlık ad: "Zehirli" / "madde". */
  function adYaz(c, p, i, x, y, o = {}) {
    const g = c.S('g', {}, p), ad = ADLAR[i], k = ad.lastIndexOf(' ');
    const satirlar = o.tek || k < 0 ? [ad] : [ad.slice(0, k), ad.slice(k + 1)];
    satirlar.forEach((s, n) => yazi(c, g, x, y + n * 30, s, { size: 24, renk: o.renk }));
    return g;
  }

  /* ---- Öteki çizimler ---- */
  const HALKA = [{ ad: 'Madde', renk: MADDE }, { ad: 'Hata', renk: HATA }, { ad: 'Sonuç', renk: SONUC }];
  function zincir(c, p, y, h = 104) {
    const g = c.S('g', {}, p), w = 280, x = (i) => 30 + i * 330;
    const kutular = HALKA.map((halka, i) => {
      const kg = c.S('g', {}, g);
      const okEl = i ? ok(c, kg, x(i) - 42, y + h / 2, x(i) - 8, y + h / 2) : null;
      const r = kutu(c, kg, x(i), y, w, h, { renk: halka.renk });
      yazi(c, kg, x(i) + w / 2, y - 14, halka.ad, { size: 26, renk: halka.renk });
      return { g: kg, r, okEl, ic: c.S('g', {}, kg) };
    });
    const yaz = (i, satirlar, renk, size = 24) => {
      const k = kutular[i], bas = y + h / 2 + size * 0.36 - (satirlar.length - 1) * 16;
      k.ic.replaceChildren();
      satirlar.forEach((s, n) => yazi(c, k.ic, x(i) + w / 2, bas + n * 32, s, { size, renk }));
    };
    const kalin = (i) => kutular.forEach((k, n) => k.r.setAttribute('stroke-width', n === i ? 6 : 3));
    return { g, kutular, yaz, kalin };
  }
  const ciz = {
    /* Şişe: (x, y) tabanın ortası. */
    sise(c, p, x, y, renk, w = 64, h = 104) {
      const g = c.S('g', {}, p), k = w / 2;
      c.S('rect', { x: x - 13, y: y - h - 26, width: 26, height: 14, rx: 3, fill: renk }, g);
      c.S('path', { d: `M ${x - 11} ${y - h - 12} L ${x - 11} ${y - h} L ${x - k} ${y - h + 22} L ${x - k} ${y - 8} Q ${x - k} ${y} ${x - k + 8} ${y}
        L ${x + k - 8} ${y} Q ${x + k} ${y} ${x + k} ${y - 8} L ${x + k} ${y - h + 22} L ${x + 11} ${y - h} L ${x + 11} ${y - h - 12} Z`,
        fill: KOYU, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('rect', { x: x - k + 8, y: y - h + 42, width: w - 16, height: h * 0.32, rx: 4, fill: renk, opacity: 0.35 }, g);
      return g;
    },
    bulut(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      [[-34, 6, 28], [0, -10, 36], [36, 8, 27], [-6, 16, 30]].forEach(([dx, dy, r]) => c.S('circle', { cx: x + dx, cy: y + dy, r, fill: renk, opacity: 0.45 }, g));
      return g;
    },
    /* Aşağıdakilerde (x, y) çizimin ortasıdır. */
    onluk(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 34} ${y - 62} L ${x - 12} ${y - 72} L ${x} ${y - 50} L ${x + 12} ${y - 72} L ${x + 34} ${y - 62} L ${x + 64} ${y - 28} L ${x + 46} ${y - 10}
        L ${x + 34} ${y - 24} L ${x + 34} ${y + 72} L ${x - 34} ${y + 72} L ${x - 34} ${y - 24} L ${x - 46} ${y - 10} L ${x - 64} ${y - 28} Z`,
        fill: KOYU, stroke: renk, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      cizgi(c, g, `M ${x} ${y - 50} L ${x} ${y + 72}`, renk, 3);
      [-20, 6, 32].forEach((dy) => c.S('circle', { cx: x + 12, cy: y + dy, r: 4, fill: renk }, g));
      return g;
    },
    gozluk(c, p, x, y, renk, s = 1) {
      const g = c.S('g', {}, p);
      [-1, 1].forEach((yon) => {
        c.S('rect', { x: x + (yon < 0 ? -64 : 8) * s, y: y - 24 * s, width: 56 * s, height: 46 * s, rx: 14 * s, fill: KOYU, stroke: renk, 'stroke-width': 5 * s }, g);
        cizgi(c, g, `M ${x + yon * 64 * s} ${y - 8 * s} L ${x + yon * 88 * s} ${y - 18 * s}`, renk, 5 * s);
      });
      cizgi(c, g, `M ${x - 8 * s} ${y - 6 * s} Q ${x} ${y - 16 * s} ${x + 8 * s} ${y - 6 * s}`, renk, 5 * s);
      return g;
    },
    eldiven(c, p, x, y, renk, s = 1) {
      const g = c.S('g', { transform: `translate(${x + 8 * s} ${y - 80 * s}) scale(${s})` }, p);
      c.S('path', { d: 'M-42 138V93Q-61 56-45 43L-25 75V39Q-25 26-12 28V68V26Q-10 15 2 20V69V34Q8 20 18 31V81Q34 56 44 69L36 116L27 140Z',
        fill: KOYU, stroke: renk, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
      c.S('rect', { x: -46, y: 138, width: 78, height: 18, rx: 5, fill: renk }, g);
      return g;
    },
    /* Baş ve omuz: portresiz kişi. */
    kisi(c, p, x, y, renk = 'var(--text)', s = 1) {
      const g = c.S('g', {}, p);
      c.S('circle', { cx: x, cy: y - 26 * s, r: 26 * s, fill: KOYU, stroke: renk, 'stroke-width': 3 }, g);
      cizgi(c, g, `M ${x - 44 * s} ${y + 52 * s} Q ${x - 44 * s} ${y + 8 * s} ${x} ${y + 8 * s} Q ${x + 44 * s} ${y + 8 * s} ${x + 44 * s} ${y + 52 * s}`, renk, 3);
      return g;
    },
    yasak(c, p, x, y, r = 58) {
      const g = c.S('g', {}, p), k = r * 0.7;
      c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: KOTU, 'stroke-width': 6 }, g);
      cizgi(c, g, `M ${x - k} ${y + k} L ${x + k} ${y - k}`, KOTU, 6);
      return g;
    },
    tik(c, p, x, y, s = 1) { return cizgi(c, p, `M ${x - 16 * s} ${y} L ${x - 4 * s} ${y + 13 * s} L ${x + 18 * s} ${y - 14 * s}`, IYI, 7 * s); },
    carpi(c, p, x, y, s = 1) { return cizgi(c, p, `M ${x - 14 * s} ${y - 14 * s} L ${x + 14 * s} ${y + 14 * s} M ${x + 14 * s} ${y - 14 * s} L ${x - 14 * s} ${y + 14 * s}`, KOTU, 7 * s); },
    fincan(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 24} ${y - 18} L ${x - 19} ${y + 16} Q ${x - 18} ${y + 24} ${x - 10} ${y + 24} L ${x + 8} ${y + 24} Q ${x + 16} ${y + 24} ${x + 17} ${y + 16} L ${x + 22} ${y - 18} Z`, renk, 4);
      cizgi(c, g, `M ${x + 21} ${y - 8} Q ${x + 40} ${y - 6} ${x + 36} ${y + 6} Q ${x + 32} ${y + 14} ${x + 18} ${y + 12}`, renk, 4);
      return g;
    },
    burun(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x + 6} ${y - 34} L ${x - 10} ${y + 6} Q ${x - 20} ${y + 22} ${x + 2} ${y + 22} L ${x + 16} ${y + 20}`, renk, 5);
      cizgi(c, g, `M ${x - 30} ${y + 4} Q ${x - 38} ${y + 14} ${x - 30} ${y + 24} M ${x - 44} ${y - 2} Q ${x - 56} ${y + 14} ${x - 44} ${y + 30}`, renk, 3);
      return g;
    },
    dil(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 30} ${y - 12} Q ${x} ${y + 12} ${x + 30} ${y - 12}`, renk, 5);
      c.S('path', { d: `M ${x - 12} ${y} Q ${x - 14} ${y + 30} ${x} ${y + 30} Q ${x + 14} ${y + 30} ${x + 12} ${y} Z`, fill: '#e58aa0' }, g);
      return g;
    },
    kagit(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      kutu(c, g, x - 38, y - 52, 76, 104, { rx: 6, renk });
      [-30, -10, 10, 30].forEach((dy) => cizgi(c, g, `M ${x - 24} ${y + dy} L ${x + 24} ${y + dy}`, renk, 3));
      return g;
    },
    /* Deney balonu. */
    balon(c, p, x, y, renk, dolgu) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 10} ${y - 44} L ${x + 10} ${y - 44} L ${x + 10} ${y - 10} L ${x + 36} ${y + 34} Q ${x + 40} ${y + 42} ${x + 32} ${y + 42}
        L ${x - 32} ${y + 42} Q ${x - 40} ${y + 42} ${x - 36} ${y + 34} L ${x - 10} ${y - 10} Z`, fill: KOYU, stroke: renk, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
      c.S('path', { d: `M ${x - 22} ${y + 14} L ${x + 22} ${y + 14} L ${x + 33} ${y + 37} L ${x - 33} ${y + 37} Z`, fill: dolgu || renk, opacity: 0.5 }, g);
      return g;
    },
    /* Cam kap; catlak verilirse üstünde çatlak çizgisi. */
    beher(c, p, x, y, renk, catlak) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 34} ${y - 40} L ${x - 34} ${y + 30} Q ${x - 34} ${y + 40} ${x - 24} ${y + 40} L ${x + 24} ${y + 40} Q ${x + 34} ${y + 40} ${x + 34} ${y + 30} L ${x + 34} ${y - 40}`, renk, 4);
      if (catlak) cizgi(c, g, `M ${x - 6} ${y - 40} L ${x + 6} ${y - 14} L ${x - 10} ${y + 4} L ${x + 8} ${y + 22} L ${x} ${y + 40}`, renk, 3);
      return g;
    },
    lavabo(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 56} ${y - 12} L ${x + 56} ${y - 12} L ${x + 44} ${y + 28} L ${x - 44} ${y + 28} Z`, renk, 4);
      cizgi(c, g, `M ${x + 30} ${y - 12} L ${x + 30} ${y - 46} Q ${x + 30} ${y - 58} ${x + 16} ${y - 58} L ${x + 6} ${y - 58} L ${x + 6} ${y - 46}`, renk, 4);
      c.S('circle', { cx: x, cy: y + 14, r: 5, fill: renk }, g);
      return g;
    },
    atikKabi(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 46} ${y - 30} L ${x + 46} ${y - 30} M ${x - 36} ${y - 30} L ${x - 28} ${y + 44} L ${x + 28} ${y + 44} L ${x + 36} ${y - 30} M ${x - 16} ${y - 30} L ${x - 16} ${y - 44} L ${x + 16} ${y - 44} L ${x + 16} ${y - 30}`, renk, 5);
      return g;
    },
    balik(c, p, x, y, s, renk) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 26 * s} ${y} L ${x - 46 * s} ${y - 14 * s} L ${x - 46 * s} ${y + 14 * s} Z`, fill: renk }, g);
      c.S('ellipse', { cx: x, cy: y, rx: 30 * s, ry: 14 * s, fill: renk }, g);
      c.S('circle', { cx: x + 16 * s, cy: y - 3 * s, r: 2.5 * s, fill: KOYU }, g);
      return g;
    },
    /* Su şeridi: üstü dalgalı. */
    su(c, p, x, y, w, h) {
      const g = c.S('g', {}, p);
      c.S('rect', { x, y, width: w, height: h, rx: 8, fill: 'var(--c1)', opacity: 0.22 }, g);
      let d = `M ${x} ${y} Q ${x + 20} ${y - 14} ${x + 40} ${y}`;
      for (let k = 80; k <= w; k += 40) d += ` T ${x + k} ${y}`;
      cizgi(c, g, d, 'var(--c1)', 4);
      return g;
    },
  };

  /* ---- Sahne 1 · Zinciri kırmak ---- */
  async function zinciriKir(c) {
    const svg = c.svg();
    const z = zincir(c, svg, 96, 120);
    await belir(c, z.g);
    await c.say('Önceki derste bir kazayı üç halkayla tanımladık: madde, hata, sonuç.');
    z.yaz(0, ['Tuz ruhu +', 'çamaşır suyu']);
    z.yaz(1, ['Durulamadan', 'üst üste dökmek']);
    z.yaz(2, ['Klor gazı'], SONUC, 28);
    const urunler = c.S('g', {}, svg);
    ciz.sise(c, urunler, 130, 372, ASIT);
    ciz.sise(c, urunler, 210, 372, BAZ);
    const bulut = ciz.bulut(c, svg, 830, 310, SONUC);
    await Promise.all([belir(c, urunler, 400), belir(c, bulut, 400)]);
    await c.say('Banyoda tuz ruhuyla çamaşır suyu karışmış, klor gazı çıkmıştı.');
    const alt = yazi(c, svg, 500, 470, 'Ürünlerin özelliği: değiştiremeyiz', { size: 30, renk: MADDE });
    z.kalin(0);
    await belir(c, alt, 350);
    await c.say('Bu ürünlerin özelliklerini değiştiremeyiz.');
    alt.textContent = 'Kullanma biçimi: değiştirebiliriz';
    alt.style.fill = HATA;
    z.kalin(1);
    await c.say('Ama onları nasıl kullandığımızı değiştirebiliriz.');
    const onlem = c.S('g', {}, svg);
    cizgi(c, onlem, 'M 644 126 L 664 186 M 660 126 L 680 186', IYI, 6);
    ok(c, onlem, 662, 300, 662, 200, IYI);
    yazi(c, onlem, 662, 340, 'Önlem', { size: 32, renk: IYI });
    alt.textContent = 'Önlem: zinciri hata halkasından koparır';
    alt.style.fill = IYI;
    await belir(c, onlem, 350);
    await c.tween(500, (e) => { z.kutular[1].r.setAttribute('stroke-width', 6 + 5 * Math.sin(Math.PI * e)); });
    await c.say('Zinciri hata halkasından koparan davranışa önlem diyoruz.');
    alt.textContent = 'Önlem: bilinene dayalı tahmin';
    await c.say('Önlemi rastgele seçmeyiz; bildiklerimize dayanarak tahmin ederiz.',
      { speak: '[thoughtful] Önlemi rastgele seçmeyiz; bildiklerimize dayanarak tahmin ederiz.' });
    alt.textContent = 'Bildiğimiz: iki ürün karıştı, gaz çıktı';
    alt.style.fill = 'var(--text)';
    z.kalin(0);
    await c.say('Klor gazı, iki ürün birbirine karıştığı için çıkmıştı.');

    await c.choice({ q: 'Banyodaki kazayı hangi öneri önler?',
      options: ['İki ürünü önce bir kovada karıştırmak', 'İki ürünü aynı temizlikte birlikte kullanmamak', 'Daha çok çamaşır suyu dökmek'], answer: 1,
      hints: ['Kovada da iki ürün birbirine karışır; gaz yine çıkar.', '', 'Daha çok çamaşır suyu dökmek, karışmayı önlemez.'],
      right: 'Ürünler aynı temizlikte buluşmazsa birbirine karışmaz.' });
    z.kalin(-1);
    z.kutular[2].okEl.remove();
    z.yaz(1, ['Birlikte', 'kullanmamak'], IYI);
    alt.textContent = 'Ürünler karışmaz: klor gazı çıkmaz';
    alt.style.fill = IYI;
    await c.tween(600, (e) => { z.kutular[2].g.style.opacity = 1 - 0.7 * e; bulut.style.opacity = 1 - e; });
    await c.say('Ürünler karışmazsa klor gazı da çıkmaz.');
    await Promise.all([sil(c, alt), sil(c, urunler), sil(c, onlem)]);
    const dayanak = c.S('g', {}, svg);
    yazi(c, dayanak, 500, 312, 'Tahmini sınayan iki dayanak', { size: 28, renk: RENK.soluk });
    kutu(c, dayanak, 150, 350, 320, 110, { renk: IYI });
    yazi(c, dayanak, 310, 416, 'Ürünün etiketi', { size: 30 });
    kutu(c, dayanak, 530, 350, 320, 110, { renk: IYI });
    yazi(c, dayanak, 690, 416, 'Güvenlik kuralları', { size: 30 });
    await belir(c, dayanak, 400);
    await c.say('Bu tahmini iki dayanakla sınayacağız: ürünün etiketi ve güvenlik kuralları.');
  }

  /* ---- Sahne 2 · Etiket ve ateş işaretleri ---- */
  async function etiketAtes(c) {
    const svg = c.svg();
    const etiket = c.S('g', {}, svg);
    ciz.sise(c, etiket, 170, 440, GRI, 130, 220);
    cizgi(c, etiket, 'M 227 262 L 380 70 M 227 332 L 380 470', GRI, 2);
    kutu(c, etiket, 380, 70, 500, 400, { renk: 'var(--text)', fill: '#1b2744' });
    yazi(c, etiket, 420, 126, 'Etiket', { size: 34, hiza: 'start' });
    const satirlar = ['Uyarı', 'Risk', 'Önlem'].map((ad, i) => {
      const g = c.S('g', {}, etiket), y = 258 + i * 76;
      yazi(c, g, 420, y + 10, ad, { size: 30, hiza: 'start' });
      cizgi(c, g, `M 560 ${y - 8} L 840 ${y - 8} M 560 ${y + 14} L 760 ${y + 14}`, GRI, 5);
      g.style.opacity = 0;
      return g;
    });
    await belir(c, etiket);
    for (const g of satirlar) await belir(c, g, 220);
    await c.say('Kimyasal maddelerin etiketinde uyarı, risk ve önlem bilgileri bulunur.');
    const oku = c.S('rect', { x: 400, y: 222, width: 460, height: 68, rx: 8, fill: 'none', stroke: IYI, 'stroke-width': 4 }, etiket);
    const once = yazi(c, etiket, 170, 510, 'Önce etiket okunur', { size: 28, renk: IYI });
    await belir(c, once, 300);
    await c.tween(1200, (e) => { oku.setAttribute('y', 222 + 152 * e); });
    await c.say('Bu yüzden madde kullanılmadan önce etiketi dikkatle okunur.');
    oku.remove();
    const isaret = c.S('g', {}, etiket);
    piktogram(c, isaret, -1, 780, 124, 0.3);
    yazi(c, isaret, 745, 208, 'Risk piktogramı', { size: 26, renk: KOTU });
    await belir(c, isaret, 400);
    await c.say('Etiketteki sağlık ve güvenlik işaretlerine risk piktogramı denir.');

    await temizle(c, svg);
    const X = (k) => 155 + k * 230;
    const SIRA = [P.patlayici, P.yanici, P.oksitleyici, P.gaz];
    const kartlar = [];
    const goster = (k) => {
      const g = c.S('g', {}, svg);
      piktogram(c, g, SIRA[k], X(k), 180, 0.6);
      adYaz(c, g, SIRA[k], X(k), 312);
      kartlar.push(g);
      return belir(c, g, 400);
    };
    const alt = yazi(c, svg, 500, 450, 'Kıvılcım, ısı, çarpma, sürtünme: patlayabilir', { size: 28 });
    await goster(0);
    await c.say('Patlayıcı madde; kıvılcım, ısı, çarpma ya da sürtünmeyle patlayabilir.');
    alt.textContent = 'Yangın çıkarabilir';
    await goster(1);
    await c.say('Yanıcı, parlayıcı madde yangın çıkarabilir.');
    alt.textContent = 'Yanıcı maddeyle karışırsa: patlama';
    await goster(2);
    await c.say('Oksitleyici madde, yanıcı maddelerle karışırsa patlamaya neden olabilir.');
    alt.textContent = 'Alevin altında bir halka';
    const halka = c.S('circle', { cx: X(2), cy: 194, r: 30, fill: 'none', stroke: IYI, 'stroke-width': 6 }, svg);
    await belir(c, halka, 350);
    await c.say('Oksitleyici işaretinde alevin altında bir halka vardır.');
    halka.remove();
    const uclu = cizgi(c, svg, `M ${X(0) - 90} 384 L ${X(0) - 90} 398 L ${X(2) + 90} 398 L ${X(2) + 90} 384`, IYI, 4);
    alt.textContent = 'Ateşten, kıvılcımdan ve ısıdan uzak tutulur';
    alt.style.fill = IYI;
    await belir(c, uclu, 350);
    await c.say('Bu üç işareti taşıyan maddeler ateşten, kıvılcımdan ve ısıdan uzak tutulur.');
    uclu.remove();
    kartlar.forEach((g) => { g.style.opacity = 0.4; });
    alt.textContent = 'Kabın içinde basınç altında gaz';
    alt.style.fill = 'var(--text)';
    await goster(3);
    await c.say('Gaz işareti, kabın içinde basınç altında gaz olduğunu gösterir.');
    alt.textContent = 'Kap ısıtılırsa patlayabilir';
    alt.style.fill = KOTU;
    await c.say('Böyle bir kap ısıtılırsa patlayabilir.');

    /* Ocağın yanındaki raf ve alev işaretli şişe. */
    await temizle(c, svg);
    const mutfak = c.S('g', {}, svg);
    kutu(c, mutfak, 130, 300, 260, 180, { renk: GRI, rx: 8 });
    kutu(c, mutfak, 160, 356, 200, 100, { renk: GRI, rx: 6, kalin: 2 });
    cizgi(c, mutfak, 'M 200 300 L 320 300', 'var(--text)', 8);
    c.S('path', { d: 'M 260 292 C 222 280 230 240 248 220 C 250 238 262 238 262 222 C 262 204 254 190 270 172 C 274 204 304 226 298 260 C 294 282 278 292 260 292 Z', fill: 'var(--warn)' }, mutfak);
    yazi(c, mutfak, 260, 520, 'Ocak', { size: 28 });
    const raf = c.S('g', {}, svg);
    cizgi(c, raf, 'M 420 300 L 600 300', GRI, 6);
    ciz.sise(c, raf, 510, 296, GRI, 84, 130);
    piktogram(c, raf, P.yanici, 510, 240, 0.2);
    await Promise.all([belir(c, mutfak), belir(c, raf)]);
    await c.choice({ tag: 'Uygula', q: 'Mutfakta, ocağın hemen yanındaki rafta alev işaretli bir şişe duruyor. Bu doğru mu?',
      options: ['Evet; kapağı kapalıysa sorun olmaz.', 'Evet; işaretler yalnızca laboratuvarda geçerlidir.', 'Hayır; ateşten ve ısıdan uzak tutulmalı.'], answer: 2,
      hints: ['Kapağı kapalı olsa da şişe ocağın ısısının hemen yanında duruyor.', 'Etiketteki işaret, ürün nerede olursa olsun geçerlidir.', ''],
      right: 'Alev işaretli madde ateşten, kıvılcımdan ve ısıdan uzak tutulur.' });
    await c.tween(800, (e) => { raf.setAttribute('transform', `translate(${300 * e} 0)`); });
    const uzak = c.S('g', {}, svg);
    ok(c, uzak, 560, 400, 690, 400, IYI);
    ok(c, uzak, 540, 400, 410, 400, IYI);
    yazi(c, uzak, 550, 370, 'Uzak tut', { size: 30, renk: IYI });
    await belir(c, uzak, 350);
    await c.say('Alev işareti, maddeyi ateşten ve ısıdan uzak tut demektir.',
      { speak: 'Alev işareti, [short pause] maddeyi ateşten ve ısıdan uzak tut demektir.' });
    await belir(c, yazi(c, svg, 760, 520, 'İşaret: önlemi önceden söyler', { size: 28 }), 350);
    await c.say('İşaret, kapağı açmadan önce hangi önlemi alacağımızı söyler.');
    c.note('<b>Risk piktogramı: etiketteki sağlık ve güvenlik işareti.</b><br>Önce etiket okunur.', 'Risk piktogramı');
  }

  /* ---- Sahne 3 · Sağlık ve çevre işaretleri ---- */
  async function saglikCevre(c) {
    const svg = c.svg();
    const X = (k) => 108 + k * 196;
    const SIRA = [P.zehirli, P.korozif, P.tahris, P.saglik, P.cevre];
    const bos = SIRA.map((i, k) => { const g = piktogram(c, svg, -1, X(k), 170, 0.5); g.style.opacity = 0; return g; });
    for (const g of bos) await c.tween(140, (e) => { g.style.opacity = 0.45 * e; });
    await c.say('Sıradaki beş işaret, sağlığa ve çevreye verilen zararı bildirir.');
    const alt = yazi(c, svg, 500, 440, '', { size: 28 });
    const kartlar = [];
    const goster = (k, metin) => {
      kartlar.forEach((g) => { g.style.opacity = 0.4; });
      bos[k].remove();
      const g = c.S('g', {}, svg);
      piktogram(c, g, SIRA[k], X(k), 170, 0.5);
      adYaz(c, g, SIRA[k], X(k), 286);
      kartlar.push(g);
      alt.textContent = metin;
      return belir(c, g, 400);
    };
    await goster(0, 'Ağız, deri, solunum: zehirlenme');
    await c.say('Zehirli madde; ağız, deri ve solunum yoluyla zehirlenmeye yol açar.');
    await goster(1, 'Canlı dokuyu tahrip eder, metali aşındırır');
    await c.say('Korozif madde canlı dokuyu tahrip eder, metalleri aşındırır.');
    await goster(2, 'Deriye ve göze zarar verebilir');
    await c.say('Tahriş edici madde deriye ve göze zarar verebilir.');
    await goster(3, 'Kısa ya da uzun süreli sağlık hasarı');
    await c.say('Sağlık etkisi işareti, kısa ya da uzun süreli sağlık hasarını bildirir.');
    kartlar.forEach((g) => { g.style.opacity = 1; });
    const dortlu = cizgi(c, svg, `M ${X(0) - 78} 356 L ${X(0) - 78} 370 L ${X(3) + 78} 370 L ${X(3) + 78} 356`, IYI, 4);
    alt.textContent = 'Vücuda değdirilmez, buharı solunmaz';
    alt.style.fill = IYI;
    await belir(c, dortlu, 350);
    await c.say('Bu dört işarette madde vücuda değdirilmez, buharı solunmaz.');
    dortlu.remove();
    alt.style.fill = 'var(--text)';
    await goster(4, 'Suya ve doğadaki canlılara zarar verir');
    await c.say('Çevreye zararlı madde suya ve doğadaki canlılara zarar verir.');
    alt.textContent = 'Doğaya dökülmez ve salınmaz';
    alt.style.fill = IYI;
    await c.say('Böyle bir madde doğaya dökülmez ve salınmaz.');

    await temizle(c, svg);
    const durum = c.S('g', {}, svg);
    piktogram(c, durum, P.cevre, 170, 190, 0.7);
    ciz.sise(c, durum, 400, 330, GRI, 84, 140);
    yazi(c, durum, 400, 372, 'Artan sıvı', { size: 28 });
    ciz.su(c, durum, 600, 300, 340, 110);
    ciz.balik(c, durum, 780, 360, 1.1, 'var(--c6)');
    yazi(c, durum, 770, 452, 'Dere', { size: 28 });
    await belir(c, durum);
    await c.choice({ tag: 'Uygula', q: 'Etiketinde ağaç ve balık işareti olan bir sıvıdan biraz artıyor. Hangi davranış uyarıya aykırıdır?',
      options: ['Şişenin kapağını sıkıca kapatmak', 'Artan sıvıyı dereye dökmek', 'Etiketi yeniden okumak'], answer: 1,
      hints: ['Kapağı kapatmak sıvıyı doğaya salmaz; uyarıya uygundur.', '', 'Etiketi okumak uyarıya aykırı değildir.'],
      right: 'Bu işareti taşıyan madde doğaya dökülmez.' });
    const yasak = c.S('g', {}, svg);
    ok(c, yasak, 456, 250, 590, 250, KOTU);
    ciz.carpi(c, yasak, 522, 250, 1.3);
    await belir(c, yasak, 350);
    await c.say('Dere doğanın parçasıdır; işaret, sıvının oraya dökülmesini yasaklar.');
  }

  /* ---- Sahne 4 · İki sarı üçgen ve on bir ad ---- */
  const IPUCU = [
    'Patlayıcı madde işaretinde patlayan bir cisim vardır.', 'Korozif madde işaretinde aşınan bir el ve yüzey vardır.',
    'Zehirli madde işaretinde kafatası ve çapraz kemikler vardır.', 'Çevreye zararlı madde işaretinde ağaç ve balık vardır.',
    'Oksitleyici madde işaretinde alevin altında bir halka vardır.', 'Tahriş edici madde işaretinde ünlem vardır.',
    'Yanıcı-parlayıcı madde işaretinde halkasız bir alev vardır.', 'Sağlık etkisi işaretinde insan gövdesi vardır.',
    'Gaz işaretinde bir gaz tüpü vardır.', 'Radyoaktif madde işareti sarı bir üçgendir.', 'Tıbbi atık işareti sarı bir üçgendir.',
  ];
  const DOGRU = [
    'Patlayan cisim, patlayıcı maddeyi gösterir.', 'Aşınan el ve yüzey, korozif maddeyi gösterir.',
    'Kafatası ve çapraz kemikler zehirli maddeyi gösterir.', 'Ağaç ve balık, çevreye zararlı maddeyi gösterir.',
    'Alevin altındaki halka, oksitleyici maddeyi gösterir.', 'Ünlem, tahriş edici maddeyi gösterir.',
    'Halkasız alev, yanıcı-parlayıcı maddeyi gösterir.', 'İnsan gövdesi, sağlık etkisini gösterir.',
    'Gaz tüpü, kabın içinde basınç altında gaz olduğunu gösterir.', 'Bu sarı üçgen, radyasyon yayan maddeyi gösterir.',
    'Bu sarı üçgen, enfeksiyon riski taşıyan atığı gösterir.',
  ];
  /* Her tur: [işaret, şıklar]. Çeldiriciler aynı turun işaretleridir. */
  const TURLAR = [
    [[P.zehirli, [P.tahris, P.zehirli, P.cevre]], [P.oksitleyici, [P.yanici, P.radyoaktif, P.oksitleyici]], [P.yanici, [P.yanici, P.oksitleyici, P.tahris]],
      [P.tahris, [P.zehirli, P.tahris, P.radyoaktif]], [P.cevre, [P.cevre, P.zehirli, P.yanici]], [P.radyoaktif, [P.oksitleyici, P.cevre, P.radyoaktif]]],
    [[P.patlayici, [P.gaz, P.patlayici, P.korozif]], [P.korozif, [P.korozif, P.saglik, P.tibbi]], [P.saglik, [P.patlayici, P.tibbi, P.saglik]],
      [P.gaz, [P.gaz, P.korozif, P.patlayici]], [P.tibbi, [P.saglik, P.tibbi, P.gaz]]],
  ];
  async function ucgenVeAdlar(c) {
    const svg = c.svg();
    const kirmizi = c.S('g', {}, svg);
    [P.patlayici, P.yanici, P.oksitleyici, P.gaz, P.zehirli, P.korozif, P.tahris, P.saglik, P.cevre].forEach((i, k) => piktogram(c, kirmizi, i, 100 + k * 100, 100, 0.26));
    const ucgen = [P.radyoaktif, P.tibbi].map((i, k) => {
      const g = c.S('g', {}, svg);
      piktogram(c, g, i, 330 + k * 340, 290, 0.55);
      return g;
    });
    await Promise.all([belir(c, kirmizi), belir(c, ucgen[0]), belir(c, ucgen[1])]);
    await c.say('Dokuz işaret kırmızı çerçeveliydi; son iki işaret sarı üçgendir.');
    kirmizi.style.opacity = 0.35;
    ucgen[1].style.opacity = 0.35;
    const ad1 = adYaz(c, svg, P.radyoaktif, 330, 402, { tek: true });
    const alt = yazi(c, svg, 500, 490, 'Çevresine radyasyon yayar', { size: 28 });
    await Promise.all([belir(c, ad1, 350), belir(c, alt, 350)]);
    await c.say('Radyoaktif madde çevresine radyasyon yayar; canlı dokuda kalıcı hasar bırakabilir.');
    alt.textContent = 'Burada dolaşılmaz; koruyucu giysi kullanılır';
    alt.style.fill = IYI;
    await c.say('Bu işaretin bulunduğu yerde dolaşılmaz; koruyucu giysi kullanılır.');
    ucgen[0].style.opacity = 0.35; ad1.style.opacity = 0.35;
    ucgen[1].style.opacity = 1;
    const ad2 = adYaz(c, svg, P.tibbi, 670, 402, { tek: true });
    alt.textContent = 'Sağlık kuruluşlarındaki işlemlerin atığı';
    alt.style.fill = 'var(--text)';
    await belir(c, ad2, 350);
    await c.say('Tıbbi atık, sağlık kuruluşlarındaki işlemlerden çıkan atıktır.');
    alt.textContent = 'Enfeksiyon riski; kesici ve delici atıklar';
    alt.style.fill = KOTU;
    await c.say('Enfeksiyon riski taşır; kesici ve delici atıklar da bu gruptadır.');
    alt.textContent = 'On bir işaretin hepsi';
    alt.style.fill = 'var(--text)';
    await c.tween(400, (e) => { [kirmizi, ucgen[0], ad1].forEach((g) => { g.style.opacity = 0.35 + 0.65 * e; }); });
    await c.say('Böylece on bir işaretin hepsini gördün.');

    for (const tur of TURLAR) {
      await temizle(c, svg);
      const yer = (k) => ({ x: 190 + (k % 3) * 310, y: 112 + Math.floor(k / 3) * 250 });
      const vurgu = c.S('rect', { x: yer(0).x - 145, y: yer(0).y - 92, width: 290, height: 226, rx: 12, fill: 'none', stroke: 'var(--text)', 'stroke-width': 4 }, svg);
      tur.forEach(([i], k) => { const { x, y } = yer(k); piktogram(c, svg, i, x, y, 0.42); });
      await belir(c, svg, 350);
      for (let k = 0; k < tur.length; k++) {
        const [i, siklar] = tur[k], { x, y } = yer(k);
        vurgu.setAttribute('x', x - 145); vurgu.setAttribute('y', y - 92);
        await c.choice({ tag: 'Sıra sende', q: 'Çerçeve içindeki işaretin adı nedir?', options: siklar.map((s) => ADLAR[s]), answer: siklar.indexOf(i),
          hints: siklar.map((s) => (s === i ? '' : IPUCU[s])), right: DOGRU[i],
          onPick: (n, dogru) => { if (dogru) belir(c, adYaz(c, svg, i, x, y + 104, { tek: true }), 350); } });
      }
      vurgu.remove();
    }

    await temizle(c, svg);
    const son = c.S('g', {}, svg);
    yazi(c, son, 220, 70, 'Ad', { size: 30, renk: RENK.soluk });
    piktogram(c, son, P.zehirli, 220, 220, 0.6);
    adYaz(c, son, P.zehirli, 220, 362, { tek: true });
    ok(c, son, 370, 220, 480, 220, 'var(--text)');
    yazi(c, son, 720, 70, 'Davranış', { size: 30, renk: IYI });
    kutu(c, son, 500, 150, 440, 140, { renk: IYI });
    yazi(c, son, 720, 210, 'Vücuda değdirme,', { size: 30 });
    yazi(c, son, 720, 252, 'buharını soluma', { size: 30 });
    await belir(c, son);
    await c.say('Adı bilmek ilk adımdır; asıl iş, uyarının istediği davranışı yapmaktır.',
      { speak: '[thoughtful] Adı bilmek ilk adımdır; asıl iş, uyarının istediği davranışı yapmaktır.' });
  }

  /* ---- Sahne 5 · Laboratuvara girerken ---- */
  async function labaGirerken(c) {
    const svg = c.svg();
    const dayanak = c.S('g', {}, svg);
    kutu(c, dayanak, 150, 200, 320, 110, { renk: GRI });
    yazi(c, dayanak, 310, 266, 'Ürünün etiketi', { size: 30, renk: RENK.soluk });
    ciz.tik(c, dayanak, 310, 160);
    kutu(c, dayanak, 530, 200, 320, 110, { renk: IYI, kalin: 5 });
    yazi(c, dayanak, 690, 266, 'Güvenlik kuralları', { size: 30 });
    await belir(c, dayanak);
    await c.say('İkinci dayanağımız laboratuvar güvenlik kurallarıdır.');

    await sil(c, dayanak);
    const kkd = c.S('g', {}, svg);
    const ust = yazi(c, kkd, 500, 72, 'Kişisel koruyucu ekipman', { size: 32, renk: RENK.soluk });
    const parca = (x, ad, cizim) => {
      const g = c.S('g', {}, kkd);
      cizim(g, x);
      yazi(c, g, x, 356, ad, { size: 30 });
      g.style.opacity = 0;
      return g;
    };
    const parcalar = [
      parca(220, 'Önlük', (g, x) => ciz.onluk(c, g, x, 220, 'var(--c1)')),
      parca(500, 'Gözlük', (g, x) => ciz.gozluk(c, g, x, 220, 'var(--c6)')),
      parca(780, 'Eldiven', (g, x) => ciz.eldiven(c, g, x, 220, 'var(--c3)')),
    ];
    await belir(c, ust, 300);
    for (const g of parcalar) await belir(c, g, 260);
    await c.say('Önlük, gözlük ve eldiven kişisel koruyucu ekipmandır.');
    const alt = yazi(c, kkd, 500, 460, 'Gözlük: gözü zararlı maddelerden korur', { size: 28, renk: 'var(--c6)' });
    parcalar[0].style.opacity = 0.4; parcalar[2].style.opacity = 0.4;
    await belir(c, alt, 350);
    await c.say('Gözlük, gözü zararlı maddelerden korur.');
    alt.textContent = 'Eldiven: kimyasalla çalışırken mutlaka takılır';
    alt.style.fill = 'var(--c3)';
    parcalar[1].style.opacity = 0.4; parcalar[2].style.opacity = 1;
    await c.say('Kimyasal maddelerle çalışırken eldiven mutlaka takılır.');

    await sil(c, kkd);
    /* Beş kural karosu: ikisi yapılacak, üçü yasak. */
    const X = (k) => 108 + k * 196;
    const karo = (k, satirlar, yasak, cizim) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, X(k) - 88, 110, 176, 300, { renk: yasak ? KOTU : IYI });
      cizim(g, X(k), 220);
      if (yasak) ciz.yasak(c, g, X(k), 220, 62);
      satirlar.forEach((s, n) => yazi(c, g, X(k), 348 + n * 32 - (satirlar.length - 1) * 16, s, { size: 24 }));
      return belir(c, g, 400);
    };
    await karo(0, ['Önce izin'], false, (g, x, y) => { ciz.kisi(c, g, x, y - 6, 'var(--text)'); ciz.tik(c, g, x + 46, y - 44, 0.8); });
    await c.say('Sorumlu kişi izin vermeden hiçbir maddeye ve düzeneğe dokunulmaz.');
    await karo(1, ['Yönergeyi', 'oku ve izle'], false, (g, x, y) => ciz.kagit(c, g, x, y, 'var(--text)'));
    await c.say('Deneyin nasıl yapılacağını anlatan yönerge dikkatle okunur; dışına çıkılmaz.');
    await karo(2, ['Yemek, içmek'], true, (g, x, y) => ciz.fincan(c, g, x - 2, y, 'var(--text)'));
    await c.say('Laboratuvarda yemek yenmez, içecek içilmez.');
    await Promise.all([
      karo(3, ['Koklamak'], true, (g, x, y) => ciz.burun(c, g, x + 12, y - 4, 'var(--text)')),
      karo(4, ['Tatmak'], true, (g, x, y) => ciz.dil(c, g, x, y - 8, 'var(--text)')),
    ]);
    await c.say('Kimyasal maddeler koklanmaz ve tadına bakılmaz.');

    /* Üç öğrenci ve üç öneri. */
    await temizle(c, svg);
    const siseG = c.S('g', {}, svg);
    ciz.sise(c, siseG, 500, 220, GRI, 96, 150);
    const bilinmeyen = yazi(c, siseG, 500, 150, '?', { size: 40 });
    const ONERI = ['Koklayalım', 'Etiketine bakalım', 'Tadına bakalım'];
    const balonlar = ONERI.map((metin, k) => {
      const g = c.S('g', {}, svg), x = 180 + k * 320;
      ciz.kisi(c, g, x, 480, 'var(--text)', 0.9);
      const r = kutu(c, g, x - 140, 300, 280, 76, { renk: GRI, rx: 22 });
      cizgi(c, g, `M ${x - 14} 376 L ${x} 400 L ${x + 14} 376`, GRI, 3);
      yazi(c, g, x, 348, metin, { size: 26 });
      return { g, r, x };
    });
    await belir(c, svg, 350);
    await c.choice({ tag: 'Uygula', q: 'Üç öğrenci bir şişedeki maddenin ne olduğunu anlamak istiyor. Hangisinin önerisi güvenlidir?',
      options: ['“Koklayalım; kokusundan anlarız.”', '“Etiketine bakalım.”', '“Tadına bakalım; asitler ekşidir.”'], answer: 1,
      hints: ['Kimyasal maddeler koklanmaz.', '', 'Kimyasal maddelerin tadına bakılmaz.'],
      right: 'Etikete bakmak güvenlidir; maddeye dokunmadan ne olduğu öğrenilir.' });
    [0, 2].forEach((k) => { balonlar[k].r.setAttribute('stroke', KOTU); ciz.carpi(c, balonlar[k].g, balonlar[k].x + 112, 300, 1); });
    balonlar[1].r.setAttribute('stroke', IYI); balonlar[1].r.setAttribute('stroke-width', 5);
    ciz.tik(c, balonlar[1].g, balonlar[1].x + 112, 300, 0.9);
    await c.say('Koklamak ve tatmak yasaktır; maddenin ne olduğu etiketten okunur.',
      { speak: 'Koklamak ve tatmak yasaktır; [short pause] maddenin ne olduğu etiketten okunur.' });
    bilinmeyen.remove();
    const etiketVurgu = c.S('g', {}, siseG);
    c.S('rect', { x: 454, y: 106, width: 92, height: 60, rx: 6, fill: 'none', stroke: IYI, 'stroke-width': 5 }, etiketVurgu);
    yazi(c, etiketVurgu, 730, 146, 'Etiket bozulmamalı', { size: 28, renk: IYI });
    ok(c, etiketVurgu, 600, 136, 556, 136, IYI);
    await belir(c, etiketVurgu, 350);
    await c.say('Bu yüzden şişelerin etiketi hiçbir şekilde bozulmamalıdır.');
  }

  /* ---- Sahne 6 · Çalışırken ve iş bitince ---- */
  const DAVRANISLAR = [
    { metin: 'Sıvıyı puarla çekmek', kisa: 'Puarla çekmek', kutu: 0, neden: 'Sıvı pipete puarla çekilir.' },
    { metin: 'Çatlak cam kabı kullanmak', kisa: 'Çatlak cam kullanmak', kutu: 1, neden: 'Kırık, çatlak ya da kirli cam malzeme kullanılmaz.' },
    { metin: 'Laboratuvarda su içmek', kisa: 'Su içmek', kutu: 1, neden: 'Laboratuvarda içecek içilmez.' },
    { metin: 'Önce sorumludan izin almak', kisa: 'İzin almak', kutu: 0, neden: 'Sorumlu kişi izin vermeden hiçbir şeye dokunulmaz.' },
    { metin: 'Kırık camı elle toplamak', kisa: 'Camı elle toplamak', kutu: 1, neden: 'Kırılan cam parçaları elle toplanmaz.' },
    { metin: 'Atığı atık kabına atmak', kisa: 'Atık kabına atmak', kutu: 0, neden: 'Atık maddeler uygun atık kaplarına atılır.' },
  ];
  async function calisirken(c) {
    const svg = c.svg();
    const karolar = c.S('g', {}, svg);
    const X = (k) => 190 + (k % 3) * 310, Y = (k) => 30 + Math.floor(k / 3) * 258;
    /* Karo: çizim, altında tek satır. yasak ise kırmızı çerçeve ve yasak halkası. */
    const karo = (k, metin, yasak, cizim) => {
      const g = c.S('g', {}, karolar), x = X(k), y = Y(k);
      kutu(c, g, x - 148, y, 296, 240, { renk: yasak ? KOTU : IYI });
      cizim(g, x, y + 100);
      if (yasak) ciz.yasak(c, g, x, y + 100, 66);
      const ad = yazi(c, g, x, y + 214, metin, { size: 24 });
      g.style.opacity = 0;
      return { g, ad };
    };
    const k1 = karo(0, 'Gelişigüzel karıştırmak', true, (g, x, y) => {
      ciz.balon(c, g, x - 34, y - 4, ASIT);
      ciz.balon(c, g, x + 34, y - 4, BAZ);
    });
    await belir(c, k1.g, 400);
    await c.say('Kimyasal maddeler birbiriyle gelişigüzel karıştırılmaz.');
    let puar = null;
    const k2 = karo(1, 'Pipet: ölçer, aktarır', false, (g, x, y) => {
      /* Pipet: ince cam boru, ortası şişkin, ucu aşağıda. Üstüne puar takılır. */
      const m = y + 14;
      cizgi(c, g, `M ${x} ${m - 56} L ${x} ${m - 22} M ${x} ${m + 26} L ${x} ${m + 64}`, 'var(--text)', 5);
      c.S('ellipse', { cx: x, cy: m + 2, rx: 11, ry: 26, fill: KOYU, stroke: 'var(--text)', 'stroke-width': 4 }, g);
      [-44, -34].forEach((dy) => cizgi(c, g, `M ${x - 7} ${m + dy} L ${x + 7} ${m + dy}`, 'var(--text)', 2));
      puar = c.S('g', {}, g);
      c.S('ellipse', { cx: x, cy: m - 76, rx: 20, ry: 24, fill: KOTU, opacity: 0.85 }, puar);
      yazi(c, puar, x + 66, m - 68, 'Puar', { size: 24, renk: KOTU });
      puar.style.opacity = 0;
    });
    await belir(c, k2.g, 400);
    await c.say('Pipet, sıvıları ölçmek ve aktarmak için kullanılan bir araçtır.');
    k2.ad.textContent = 'Puarla; ağızla değil';
    await c.tween(400, (e) => { puar.style.opacity = e; });
    await c.say('Sıvı pipete puar denen araçla çekilir; asla ağızla çekilmez.');
    const k3 = karo(2, 'Çatlak, kırık, kirli cam', true, (g, x, y) => ciz.beher(c, g, x, y, 'var(--text)', true));
    await belir(c, k3.g, 400);
    await c.say('Kırık, çatlak ya da kirli cam malzeme kullanılmaz.');
    const k4 = karo(3, 'Camı elle toplamak', true, (g, x, y) => {
      [[-30, 24, -8, 2, -4, 30], [8, 30, 22, 6, 36, 26], [-14, -26, 4, -40, 10, -18]]
        .forEach(([a, b, d, e, f, h]) => cizgi(c, g, `M ${x + a} ${y + b} L ${x + d} ${y + e} L ${x + f} ${y + h} Z`, 'var(--text)', 3));
    });
    await belir(c, k4.g, 400);
    await c.say('Kırılan cam parçaları elle toplanmaz.');
    const k5 = karo(4, 'Atığı lavaboya dökmek', true, (g, x, y) => ciz.lavabo(c, g, x - 4, y + 12, 'var(--text)'));
    await belir(c, k5.g, 400);
    await c.say('Kullanılmış atık maddeler lavaboya doğrudan dökülmez.');
    const k6 = karo(5, 'Atık kabına atmak', false, (g, x, y) => { ciz.atikKabi(c, g, x, y, 'var(--text)'); ciz.tik(c, g, x + 84, y - 50, 0.9); });
    await belir(c, k6.g, 400);
    await c.say('Bunlar uygun atık kaplarına atılır.');

    /* Sınıflandırma: iki kutu, sırayla altı davranış. */
    await sil(c, karolar, 350);
    const KUTU = [{ ad: 'Kurala uygun', renk: IYI, x: 40 }, { ad: 'Kurala aykırı', renk: KOTU, x: 520 }];
    const kutular = c.S('g', {}, svg);
    const sayac = [0, 0];
    KUTU.forEach((k) => { kutu(c, kutular, k.x, 40, 440, 350, { renk: k.renk }); yazi(c, kutular, k.x + 220, 92, k.ad, { size: 30, renk: k.renk }); });
    await belir(c, kutular);
    for (const d of DAVRANISLAR) {
      const bekleyen = c.S('g', {}, svg);
      kutu(c, bekleyen, 220, 430, 560, 70, { renk: 'var(--text)' });
      yazi(c, bekleyen, 500, 476, d.metin, { size: 28 });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: `<b>${d.metin}</b> hangi kutuya girer?`, options: KUTU.map((k) => k.ad), answer: d.kutu,
        hints: KUTU.map((k, i) => (i === d.kutu ? '' : 'Kuralı hatırla: ' + d.neden.charAt(0).toLowerCase() + d.neden.slice(1))), right: d.neden,
        onPick: (i, dogru) => {
          if (!dogru) return;
          bekleyen.remove();
          belir(c, yazi(c, kutular, KUTU[d.kutu].x + 220, 160 + sayac[d.kutu]++ * 62, d.kisa, { size: 26 }), 350);
        } });
    }
    await sil(c, kutular, 350);
    const ozet = c.S('g', {}, svg);
    yazi(c, ozet, 245, 110, 'Kural', { size: 30, renk: IYI });
    kutu(c, ozet, 60, 140, 370, 110, { renk: IYI });
    yazi(c, ozet, 245, 206, 'Gelişigüzel karıştırılmaz', { size: 28 });
    ok(c, ozet, 446, 195, 554, 195, 'var(--text)');
    yazi(c, ozet, 755, 110, 'Önlenen kaza', { size: 30, renk: KOTU });
    kutu(c, ozet, 570, 140, 370, 110, { renk: KOTU });
    yazi(c, ozet, 755, 206, 'Klor gazı çıkması', { size: 28 });
    ciz.bulut(c, ozet, 755, 340, SONUC);
    await belir(c, ozet);
    await c.say('Her kuralın arkasında, önlenmek istenen bir kaza vardır.');
  }

  /* ---- Sahne 7 · Çözümü değerlendir ---- */
  async function degerlendir(c) {
    const svg = c.svg();
    const tablo = c.S('g', {}, svg);
    yazi(c, tablo, 250, 58, 'Olay', { size: 30, renk: RENK.soluk });
    yazi(c, tablo, 750, 58, 'Kural', { size: 30, renk: RENK.soluk });
    const satir = [0, 1, 2].map((i) => {
      const y = 84 + i * 130;
      const sol = kutu(c, tablo, 40, y, 420, 100, { renk: GRI, kalin: 2 }), sag = kutu(c, tablo, 540, y, 420, 100, { renk: GRI, kalin: 2 });
      ok(c, tablo, 472, y + 50, 528, y + 50);
      return { y, sol, sag };
    });
    const yaz = (i, sagda, metin, renk) => {
      const s = satir[i], r = sagda ? s.sag : s.sol;
      if (renk) { r.setAttribute('stroke', renk); r.setAttribute('stroke-width', 4); }
      return belir(c, yazi(c, tablo, sagda ? 750 : 250, s.y + 60, metin, { size: 28 }), 350);
    };
    await belir(c, tablo);
    await c.say('Şimdi önlemleri bu kurallarla değerlendirelim.');
    yaz(0, false, 'Banyo: birlikte kullanmamak');
    await yaz(0, true, 'Gelişigüzel karıştırılmaz', IYI);
    await c.say('Banyodaki önerimiz “gelişigüzel karıştırılmaz” kuralına dayanıyor.');
    await yaz(1, false, 'Laboratuvar: fazla sodyum');
    await c.say('Laboratuvarda öğretmen belirtilenden fazla sodyumu suya koymuştu.');
    await yaz(1, true, 'Yönergenin dışına çıkılmaz', KOTU);
    await c.say('Orada çiğnenen kural şuydu: yönergenin dışına çıkılmaz.');
    await yaz(2, false, 'Mutfak: eldiven takılı');
    await c.say('Restoran mutfağındaki öğrenci ise eldiven takmıştı.');
    yaz(2, true, 'Yeterli mi?', HATA);
    await belir(c, yazi(c, tablo, 500, 500, 'Sıvı yine de yüze sıçradı', { size: 30, renk: HATA }), 350);
    await c.say('Yine de yağ çözücülü sıvı yüzüne sıçramıştı.');

    /* Eldivenli el ve korumasız yüz. */
    await temizle(c, svg);
    const durum = c.S('g', {}, svg);
    ciz.eldiven(c, durum, 240, 230, IYI, 1.5);
    const elAd = yazi(c, durum, 240, 440, 'El: eldiven var', { size: 30, renk: IYI });
    c.S('circle', { cx: 700, cy: 210, r: 110, fill: KOYU, stroke: 'var(--text)', 'stroke-width': 4 }, durum);
    [-42, 42].forEach((dx) => c.S('circle', { cx: 700 + dx, cy: 190, r: 10, fill: 'var(--text)' }, durum));
    cizgi(c, durum, 'M 664 262 Q 700 276 736 262', 'var(--text)', 4);
    [[610, 150], [640, 250], [770, 140], [790, 240], [700, 120]].forEach(([cx, cy]) => c.S('circle', { cx, cy, r: 7, fill: BAZ }, durum));
    const gozAd = yazi(c, durum, 700, 440, 'Göz: korumasız', { size: 30, renk: KOTU });
    await belir(c, durum);
    await c.choice({ tag: 'Uygula', q: 'Öğrencinin aldığı önlem yeterli miydi?',
      options: ['Evet; eldiven bütün vücudu korur.', 'Evet; yağ çözücü yalnızca ele zarar verir.', 'Hayır; gözünü koruyacak gözlük de gerekirdi.'], answer: 2,
      hints: ['Eldiven yalnızca eli örter; sıvı ise yüze sıçramıştı.', 'Yağ çözücü göze değerse yanma yapabilir.', ''],
      right: 'Gözü zararlı maddelerden gözlük korur.' });
    const gozluk = ciz.gozluk(c, durum, 700, 192, IYI, 1.25);
    gozAd.textContent = 'Göz: gözlük gerekir';
    gozAd.style.fill = IYI;
    elAd.textContent = 'Eldiven: yalnızca eli korur';
    await belir(c, gozluk, 400);
    await c.say('Yağ çözücü göze de zarar verir; eldiven yalnızca eli korur.');
    await belir(c, yazi(c, svg, 500, 516, 'Önlem bütün uyarıları karşılamalı', { size: 30 }), 350);
    await c.say('İşaretin adını bilmek yetmez; önlem bütün uyarıları karşılamalıdır.',
      { speak: '[thoughtful] İşaretin adını bilmek yetmez; önlem bütün uyarıları karşılamalıdır.' });
    c.note('<b>Önlem, etiketteki uyarıya ve güvenlik kuralına dayanır.</b><br>Göz için gözlük', 'Önlemi değerlendir');
  }

  /* ---- Sahne 8 · Çevre ve ülke güvenliği ---- */
  async function cevreUlke(c) {
    const svg = c.svg();
    const koruma = c.S('g', {}, svg);
    kutu(c, koruma, 380, 90, 240, 84, { renk: IYI });
    yazi(c, koruma, 500, 144, 'Önlem', { size: 32, renk: IYI });
    ok(c, koruma, 450, 180, 310, 284, IYI);
    ok(c, koruma, 550, 180, 690, 284, IYI);
    kutu(c, koruma, 150, 294, 300, 84, { renk: GRI });
    yazi(c, koruma, 300, 348, 'Bizi korur', { size: 30 });
    kutu(c, koruma, 550, 294, 300, 84, { renk: 'var(--c3)' });
    yazi(c, koruma, 700, 348, 'Çevreyi korur', { size: 30, renk: 'var(--c3)' });
    await belir(c, koruma);
    await c.say('Önlem yalnızca bizi değil, çevreyi de korur.');

    await sil(c, koruma);
    const yol = c.S('g', {}, svg);
    ['Fabrika', 'Deniz', 'Balık', 'İnsan'].forEach((ad, i) => {
      const x = 60 + i * 240;
      kutu(c, yol, x, 40, 160, 64, { renk: i ? GRI : HATA });
      yazi(c, yol, x + 80, 82, ad, { size: 28 });
      if (i) ok(c, yol, x - 70, 72, x - 10, 72, 'var(--text)');
    });
    const civa = c.S('circle', { cx: 140, cy: 122, r: 9, fill: '#c9d1e6' }, yol);
    await belir(c, yol);
    await c.tween(1100, (e) => { civa.setAttribute('cx', 140 + 720 * e); });
    await c.say('Denize bırakılan cıvanın insana kadar ulaştığını görmüştük.');
    /* Lavabo, gider borusu ve suyun vardığı yer. */
    const lavabo = c.S('g', {}, svg);
    ciz.lavabo(c, lavabo, 200, 250, 'var(--text)');
    yazi(c, lavabo, 200, 180, 'Lavabo', { size: 28 });
    cizgi(c, lavabo, 'M 200 280 L 200 430 L 560 430', GRI, 10);
    ciz.su(c, lavabo, 570, 400, 370, 90);
    ciz.balik(c, lavabo, 780, 448, 1.1, 'var(--c6)');
    await belir(c, lavabo);
    const damla = [0, 1, 2].map(() => c.S('circle', { cx: 200, cy: 264, r: 7, fill: BAZ }, svg));
    for (let i = 0; i < 3; i++) {
      await c.tween(500, (e) => {
        const yolBoyu = 550 + i * 60, s = yolBoyu * e;
        damla[i].setAttribute('cx', s < 166 ? 200 : 200 + (s - 166));
        damla[i].setAttribute('cy', s < 166 ? 264 + s : 430 + (s > 380 ? 12 : 0));
      });
    }
    await c.say('Lavaboya dökülen atık da suya karışır.');
    const kap = c.S('g', {}, svg);
    ciz.atikKabi(c, kap, 430, 250, IYI);
    yazi(c, kap, 430, 334, 'Atık kabı', { size: 28, renk: IYI });
    const karar = c.S('g', {}, kap);
    ciz.tik(c, karar, 510, 228, 0.9);
    ciz.carpi(c, karar, 200, 340, 1.1);
    await belir(c, kap, 400);
    await c.say('Bu yüzden atık kimyasallar uygun atık kaplarında toplanır.');

    const cozelti = c.S('g', {}, svg);
    ciz.balon(c, cozelti, 300, 340, 'var(--text)', '#dfe6f5');
    const soruIsareti = yazi(c, cozelti, 300, 280, '?', { size: 36 });
    karar.style.opacity = 0;
    await belir(c, cozelti, 350);
    await c.choice({ tag: 'Uygula', q: 'Kullanılmış bir çözelti berrak ve kokusuz görünüyor. Nereye dökülür?',
      options: ['Lavaboya; berrak olduğu için zararsızdır.', 'Uygun atık kabına', 'Bahçedeki toprağa.'], answer: 1,
      hints: ['Berrak görünmesi zararsız olduğunu göstermez; lavabodaki atık suya karışır.', '', 'Toprak da doğanın parçasıdır; atık oraya dökülmez.'],
      right: 'Atık kimyasallar uygun atık kaplarında toplanır.' });
    soruIsareti.remove();
    karar.style.opacity = 1;
    await c.tween(600, (e) => { cozelti.setAttribute('transform', `translate(${96 * e} ${-176 * e}) rotate(${55 * e} 300 340)`); });
    await belir(c, yazi(c, svg, 380, 530, 'Kural her atık için geçerli', { size: 28, renk: IYI }), 350);
    await c.say('Berrak görünmek zararsız olmak demek değildir; kural her atık için geçerlidir.',
      { speak: '[thoughtful] Berrak görünmek zararsız olmak demek değildir; kural her atık için geçerlidir.' });

    await temizle(c, svg);
    const bakanlik = c.S('g', {}, svg);
    kutu(c, bakanlik, 120, 100, 760, 330, { renk: 'var(--c3)' });
    yazi(c, bakanlik, 500, 172, 'Çevre, Şehircilik ve', { size: 34, renk: 'var(--c3)' });
    yazi(c, bakanlik, 500, 218, 'İklim Değişikliği Bakanlığı', { size: 34, renk: 'var(--c3)' });
    cizgi(c, bakanlik, 'M 240 262 L 760 262', GRI, 2);
    yazi(c, bakanlik, 500, 328, 'Kimyasal maddelerin güvenliği için', { size: 30 });
    yazi(c, bakanlik, 500, 372, 'düzenlemeler yapar', { size: 30 });
    await belir(c, bakanlik);
    await c.say('Çevre, Şehircilik ve İklim Değişikliği Bakanlığı kimyasal maddelerin güvenliği için düzenlemeler yapar.');

    await sil(c, bakanlik);
    /* Savaş gemisi silueti. */
    const gemi = c.S('g', {}, svg);
    c.S('path', { d: 'M 300 420 L 334 470 L 680 470 L 730 420 Z', fill: GRI }, gemi);
    c.S('path', { d: 'M 420 420 L 420 384 L 470 384 L 470 356 L 540 356 L 540 384 L 600 384 L 600 420 Z', fill: GRI }, gemi);
    cizgi(c, gemi, 'M 505 356 L 505 306 M 488 322 L 522 322 M 340 420 L 392 402', GRI, 5);
    ciz.su(c, gemi, 220, 472, 580, 50);
    const ust = yazi(c, svg, 500, 76, 'Ülke savunması', { size: 34 });
    await Promise.all([belir(c, gemi), belir(c, ust)]);
    await c.say('Kimyasal tehlike bir ülkenin savunmasını da ilgilendirir.');
    ust.remove();
    const harfler = c.S('g', {}, svg);
    [['K', 'Kimyasal'], ['B', 'Biyolojik'], ['R', 'Radyolojik'], ['N', 'Nükleer']].forEach(([harf, ad], i) => {
      const g = c.S('g', {}, harfler), x = 170 + i * 220;
      yazi(c, g, x, 110, harf, { size: 72, renk: KOTU });
      yazi(c, g, x, 160, ad, { size: 28 });
      g.style.opacity = 0;
    });
    for (const g of harfler.children) await belir(c, g, 220);
    await c.say('KBRN; kimyasal, biyolojik, radyolojik ve nükleer sözcüklerinin kısaltmasıdır.',
      { speak: 'Ka be re ne; kimyasal, biyolojik, radyolojik ve nükleer sözcüklerinin kısaltmasıdır.' });
    const olay = yazi(c, svg, 500, 240, 'KBRN olayı: yayılmadan doğan tehlikeli durum', { size: 28, renk: KOTU });
    await belir(c, olay, 350);
    await c.say('Bu maddelerin yayılmasıyla doğan tehlikeli durumlara KBRN olayı denir.',
      { speak: 'Bu maddelerin yayılmasıyla doğan tehlikeli durumlara ka be re ne olayı denir.' });
    olay.textContent = 'KBRN Tespit ve Teşhis Sistemi';
    olay.style.fill = IYI;
    const kalkan = cizgi(c, svg, 'M 270 440 Q 270 280 515 280 Q 760 280 760 440', IYI, 6);
    await belir(c, kalkan, 500);
    await c.say('KBRN Tespit ve Teşhis Sistemi, Türk savaş gemilerini bu tehditlerden korur.',
      { speak: 'Ka be re ne Tespit ve Teşhis Sistemi, Türk savaş gemilerini bu tehditlerden korur.' });

    await temizle(c, svg);
    const son = c.S('g', {}, svg);
    kutu(c, son, 60, 220, 330, 120, { renk: 'var(--text)' });
    yazi(c, son, 225, 292, 'Önce etiket', { size: 36 });
    ok(c, son, 406, 280, 504, 280, 'var(--text)');
    kutu(c, son, 520, 220, 420, 120, { renk: IYI });
    yazi(c, son, 730, 292, 'Sonra uygun önlem', { size: 36, renk: IYI });
    await belir(c, son);
    await c.say('Aklında kalsın: önce etiket, sonra uygun önlem.', { speak: 'Aklında kalsın: [short pause] önce etiket, sonra uygun önlem.' });
  }

  Ders.start({
    id: 'etkilesim-b2', kicker: 'Konu B · Kimyasal maddeler ve güvenlik', title: 'Önlem kanıtla seçilir', accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Önlem kanıtla seçilir', hook: 'Şişedeki uyarı işareti hangi davranışını değiştirir?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Zinciri kırmak', goal: 'Kazayı önleyecek öneriyi tahmin et.', run: zinciriKir },
      { title: 'Etiket ve ateş işaretleri', goal: 'Etiketi oku, alev işaretlerini tanı.', run: etiketAtes },
      { title: 'Sağlık ve çevre işaretleri', goal: 'İşaretin istediği davranışı bul.', run: saglikCevre },
      { title: 'İki sarı üçgen ve on bir ad', goal: 'On bir işareti adıyla eşleştir.', run: ucgenVeAdlar },
      { title: 'Laboratuvara girerken', goal: 'Güvenli öneriyi ayırt et.', run: labaGirerken },
      { title: 'Çalışırken ve iş bitince', goal: 'Davranışları kurala göre ayır.', run: calisirken },
      { title: 'Çözümü değerlendir', goal: 'Alınan önlemi kurallarla sına.', run: degerlendir },
      { title: 'Çevre ve ülke güvenliği', goal: 'Atığın nereye gideceğine karar ver.', run: cevreUlke },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir şişenin etiketinde kafatası ve çapraz kemik işareti var. Bu işaretin adı nedir?',
        options: ['Tahriş edici madde', 'Oksitleyici madde', 'Zehirli madde'], answer: 2,
        why: ['Tahriş edici madde işaretinde ünlem vardır.', 'Oksitleyici madde işaretinde halkalı bir alev vardır.', 'Kafatası ve çapraz kemik zehirli maddeyi gösterir.'], scene: 2 },
      { q: 'Bir öğrenci etiketi okuyor, gözlük ve eldiven takıyor, sonra sıvıyı pipete ağzıyla çekiyor. Hangi davranışı kurala aykırıdır?',
        options: ['Etiketi okuması', 'Sıvıyı ağzıyla çekmesi', 'Gözlük ve eldiven takması'], answer: 1,
        why: ['Madde kullanılmadan önce etiketi okunur; bu kurala uygundur.', 'Sıvı pipete puarla çekilir, asla ağızla çekilmez.', 'Gözlük ve eldiven koruyucu ekipmandır; takmak kurala uygundur.'], scene: 5 },
    ], summary: ['<b>Önce etiket, sonra uygun önlem.</b>', 'Önlem, etiketteki işarete ve güvenlik kurallarına dayanır; bütün uyarıları karşılamalıdır.'],
    nextLesson: { href: 'c1-atom-modelleri.html', label: 'Sonraki: Yeni veri modeli değiştirir ›' },
  });
})();
