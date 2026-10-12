/* Konu C (Açık hava basıncı) derslerinin ortak çizim araçları (window.KIT_C). kit.js dosyasından sonra, ders dosyasından önce yüklenir.
   Hava soluk gri-mavi çizilir (HAVA: dolgu, tanecik, çizgi); sıvı mavi, kuvvet ve ağırlık turuncu, basınç sarı.
   Hava tanecikleri yarıçap 5; konumlar sabit bir diziden gelir (Halton dizisi), Math.random kullanılmaz: çizim her açılışta aynıdır.
   Noktalar [x, y] dizisidir. Tahta 1000 × 562 birimdir. Burada olmayanlar (cam boru, cıva kabı) C2'nin kendi dosyasında durur.

   İMZALAR
   HAVA                                  { dolgu, tanecik, cizgi } renkleri; ZEMIN_RENK, DAG { dolgu, kenar }
   NOKTA_DIZISI                          80 sabit [u, v] noktası (0–1 arası), ilk n tanesi her zaman aynıdır
   nokta(c, p, x, y, renk, r = 9)        dolu daire (sarı basınç noktası: renk = RENK.basinc) → circle
   tanecik(c, p, x, y, renk = HAVA.tanecik, r = 5)   tek tanecik → circle
   havaAlani(c, p, { x1, x2, y1, y2, ust = 0.10, alt = 0.40, kademe = 8 })   soluk gri-mavi hava; saydamlık yukarıdan aşağıya ust → alt
        (ust = alt verilirse düz dolgu; degrade yerine kademeli şeritler) → g
   zemin(c, p, x1, x2, y)                kahverengi zemin çizgisi (kalınlık 6) → line
   dag(c, p, noktalar)                   kahverengi-gri dağ çokgeni → polygon
   cerceve(c, p, x1, y1, x2, y2, renk = RENK.cizgi, { kesik = true, w = 2, dolgu })   kesikli (ya da düz) dikdörtgen çerçeve → rect
   sivKabi(c, p, { x1, x2, yUst, yAlt, yYuzey })    üstü açık kap (açık gri çizgi) ve sıvı dolgusu (mavi) → { g, su }
   agirlikOku(c, p, x, y1, y2)           turuncu aşağı ok (y1 → y2) → { g, ciz(P, Q) }  (KIT.ok ile aynı)
   olcuOku(c, p, x, y1, y2, etiket, { etiketX, renk })   çift uçlu dikey ölçü oku ve −90° döndürülmüş etiket → g
   yuzeyOklari(c, p, P, Q, { n = 1, boy = 60, bosluk = 8, taraf, renk = RENK.basinc, w = 4 })
        P–Q doğru parçasına DİK, yüzeye bakan n ok. Oklar P–Q boyunca eşit aralıkla dizilir; `taraf` oklarının geldiği tarafta
        bir nokta ([x, y]); her okun ucu yüzeyden `bosluk` birim uzakta biter, kuyruğu `boy` birim geridedir.
        → { g, oklar, ciz(boy) }  (ciz(boy) tüm okların boyunu değiştirir; ucu yerinde kalır, hareketle birlikte tween edilir)
   esitX(x1, x2, n)                      x1–x2 arasında eşit aralıklı n sayı (n = 1 ise ortası)
   tanecikSatirlari(c, p, satirlar, { renk, r })    satirlar = [{ y, xs: [x, …] }, …] → { g, satirlar: [{ y, g, noktalar }], noktalar }
        (satır satır belirtmek için: her satırın kendi g'si var; noktalar tüm daireler)
   SEYREK_SATIRLAR(x1, x2)               yükseldikçe seyrelen hava: alttan üste y 460 → 6, 428 → 6, 392 → 5, 350 → 4, 300 → 4, 240 → 3, 192 → 2, 128 → 1 tanecik
        (100–470 aralığındaki bir sütun için; tanecikSatirlari'na verilir)
   yay(c, p, { x1, x2, y1, y2, n, renk, r = 5 })     dikdörtgene dizinin ilk n noktasıyla düzgün serpilmiş n tanecik → { g, noktalar }
   seyrelenHava(c, p, { x1, x2, y1, y2, n, renk, us = 2 })   y2 (yer) yakınında sık, y1 (yukarı) doğru seyrelen n tanecik → { g, noktalar } */
window.KIT_C = (() => {
  'use strict';
  const { RENK, yazi, cizgi, ok } = window.KIT;
  const HAVA = { dolgu: '#8fa6c8', tanecik: '#a9bbd8', cizgi: '#aebbd9' };
  const ZEMIN_RENK = '#a8764b';
  const DAG = { dolgu: '#6f6258', kenar: '#a2917f' };

  const halton = (i, b) => { let f = 1, r = 0; while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); } return r; };
  const NOKTA_DIZISI = Array.from({ length: 80 }, (_, i) => [halton(i + 1, 2), halton(i + 1, 3)]);

  const nokta = (c, p, x, y, renk, r = 9) => c.S('circle', { cx: x, cy: y, r, fill: renk }, p);
  const tanecik = (c, p, x, y, renk = HAVA.tanecik, r = 5) => c.S('circle', { cx: x, cy: y, r, fill: renk }, p);

  function havaAlani(c, p, o) {
    const g = c.S('g', {}, p), n = o.kademe || 8, ust = o.ust == null ? 0.10 : o.ust, alt = o.alt == null ? 0.40 : o.alt;
    const h = (o.y2 - o.y1) / n;
    for (let i = 0; i < n; i++) {
      const a = n === 1 ? alt : ust + (alt - ust) * (i / (n - 1));
      c.S('rect', { x: o.x1, y: o.y1 + h * i, width: o.x2 - o.x1, height: h + 0.5, fill: HAVA.dolgu, 'fill-opacity': a }, g);
    }
    return g;
  }
  const zemin = (c, p, x1, x2, y) => cizgi(c, p, [x1, y], [x2, y], ZEMIN_RENK, 6);
  const dag = (c, p, noktalar) => c.S('polygon', {
    points: noktalar.map((q) => q.join(',')).join(' '), fill: DAG.dolgu, stroke: DAG.kenar, 'stroke-width': 2, 'stroke-linejoin': 'round',
  }, p);
  const cerceve = (c, p, x1, y1, x2, y2, renk = RENK.cizgi, o = {}) => c.S('rect', Object.assign({
    x: x1, y: y1, width: x2 - x1, height: y2 - y1, fill: o.dolgu || 'none', stroke: renk, 'stroke-width': o.w || 2,
  }, o.kesik === false ? {} : { 'stroke-dasharray': '8 6' }), p);

  function sivKabi(c, p, o) {
    const g = c.S('g', {}, p);
    const su = c.S('rect', { x: o.x1 + 2, y: o.yYuzey, width: o.x2 - o.x1 - 4, height: o.yAlt - o.yYuzey, fill: RENK.sivi, 'fill-opacity': 0.55 }, g);
    c.S('path', {
      d: `M${o.x1},${o.yUst} L${o.x1},${o.yAlt} L${o.x2},${o.yAlt} L${o.x2},${o.yUst}`, fill: 'none', stroke: '#8f9bc4',
      'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
    }, g);
    return { g, su };
  }

  const agirlikOku = (c, p, x, y1, y2) => ok(c, p, [x, y1], [x, y2], RENK.kuvvet, 6);

  function olcuOku(c, p, x, y1, y2, etiket, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.cizgi, ex = o.etiketX == null ? x - 20 : o.etiketX;
    const ortaY = (y1 + y2) / 2;
    ok(c, g, [x, ortaY], [x, y1], renk, 3);
    ok(c, g, [x, ortaY], [x, y2], renk, 3);
    const t = yazi(c, g, ex, ortaY, etiket, { size: 24, kalin: 600, renk });
    t.setAttribute('transform', `rotate(-90 ${ex} ${ortaY})`);
    return g;
  }

  /* Yüzeye dik oklar. taraf: okların geldiği taraftaki bir nokta. */
  function yuzeyOklari(c, p, P, Q, o = {}) {
    const n = o.n || 1, bosluk = o.bosluk == null ? 8 : o.bosluk, g = c.S('g', {}, p);
    const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1;
    let nx = dy / L, ny = -dx / L;
    if ((o.taraf[0] - P[0]) * nx + (o.taraf[1] - P[1]) * ny < 0) { nx = -nx; ny = -ny; }
    const oklar = [];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, yx = P[0] + dx * t, yy = P[1] + dy * t;
      oklar.push({ yx, yy, ok: ok(c, g, [yx, yy], [yx, yy], o.renk || RENK.basinc, o.w || 4) });
    }
    const ciz = (boy) => oklar.forEach((k) => {
      k.ok.ciz([k.yx + nx * (bosluk + boy), k.yy + ny * (bosluk + boy)], [k.yx + nx * bosluk, k.yy + ny * bosluk]);
    });
    ciz(o.boy == null ? 60 : o.boy);
    return { g, oklar: oklar.map((k) => k.ok), ciz };
  }

  const esitX = (x1, x2, n) => Array.from({ length: n }, (_, i) => (n === 1 ? (x1 + x2) / 2 : x1 + ((x2 - x1) * i) / (n - 1)));

  function tanecikSatirlari(c, p, satirlar, o = {}) {
    const g = c.S('g', {}, p), tum = [];
    const sonuc = satirlar.map((s) => {
      const sg = c.S('g', {}, g), noktalar = s.xs.map((x) => tanecik(c, sg, x, s.y, o.renk || HAVA.tanecik, o.r || 5));
      tum.push(...noktalar);
      return { y: s.y, g: sg, noktalar };
    });
    return { g, satirlar: sonuc, noktalar: tum };
  }
  const SEYREK_SATIRLAR = (x1, x2) => [[460, 6], [428, 6], [392, 5], [350, 4], [300, 4], [240, 3], [192, 2], [128, 1]]
    .map(([y, n]) => ({ y, xs: esitX(x1, x2, n) }));

  function yay(c, p, o) {
    const g = c.S('g', {}, p), r = o.r || 5, noktalar = [];
    for (let i = 0; i < o.n; i++) {
      const [u, v] = NOKTA_DIZISI[i % NOKTA_DIZISI.length];
      noktalar.push(tanecik(c, g, o.x1 + r + 2 + u * (o.x2 - o.x1 - 2 * r - 4), o.y1 + r + 2 + v * (o.y2 - o.y1 - 2 * r - 4), o.renk || HAVA.tanecik, r));
    }
    return { g, noktalar };
  }
  function seyrelenHava(c, p, o) {
    const g = c.S('g', {}, p), r = 5, us = o.us || 2, noktalar = [];
    for (let i = 0; i < o.n; i++) {
      const [u, v] = NOKTA_DIZISI[i % NOKTA_DIZISI.length];
      noktalar.push(tanecik(c, g, o.x1 + r + 2 + u * (o.x2 - o.x1 - 2 * r - 4), o.y2 - r - 2 - Math.pow(v, us) * (o.y2 - o.y1 - 2 * r - 4), o.renk || HAVA.tanecik, r));
    }
    return { g, noktalar };
  }

  return {
    HAVA, ZEMIN_RENK, DAG, NOKTA_DIZISI, nokta, tanecik, havaAlani, zemin, dag, cerceve, sivKabi, agirlikOku, olcuOku, yuzeyOklari,
    esitX, tanecikSatirlari, SEYREK_SATIRLAR, yay, seyrelenHava,
  };
})();
