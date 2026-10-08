/* Konu M (Yüzey gerilimi) çizim araçları: window.KIT_M. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Renkler tema boyunca aynıdır: artı yük (Na⁺) turuncu, eksi yük (Cl⁻) mavi, çekim yeşil (kalın çizgi güçlü, ince ve kesikli çizgi zayıf çekim).
   Sabun ve deterjan molekülü mor çizilir ve ders boyunca aynı kalır. Sıvılar nötr açık tonlardadır (renk anlam taşımaz), madenî para nötr gri.
   Damla sayıları örnek veridir: damla sayısı = 300 × (N/m değeri), en yakın tam sayıya yuvarlanır; sayaçta "örnek veri" etiketi durur.
   Kubbe yüksekliği N/m değeriyle orantılıdır (1300 × N/m); tahtaya kubbe için sayı yazılmaz. Oklar ve molekül sayıları şematiktir.
   Araçlar:
     para(c, p, o)             madenî para, damlalık, kubbe, damla sayacı, taşma, hayalet kubbe, yükseklik oku
     minipara(c, p, o)         yalnızca para ve kubbe (karşılaştırma için küçük)
     beher(c, p, o)            beherglas ve ısıtıcı; sıcaklık etiketi ("20 °C", "50 °C")
     deneyTablosu(c, p, o)     satır ekleyen tablo (Sıvı · Çözünen · Sıcaklık · Damla)
     deneyMatrisi(c, p, o)     sıvı satırı × sıcaklık sütunu tablosu (her deneme bir hücre)
     karsilastirma(c, p, o)    dört sütunlu tablo (Sıvı · Kubbe · Damla · Yüzey gerilimi)
     degiskenler(c, p, o)      üç sütunlu çerçeve (Bağımlı · Bağımsız · Kontrol)
     sorukarti(c, p, o)        soru kartı ve altına düşen iki etiket
     zincir(c, p, o)           kutulardan oluşan neden-sonuç zinciri
     cekim(c, p, o)            sıvı kesiti: moleküller arasında yeşil çekim çizgileri; yüzey ve iç molekül vurgusu; hareket izi
     suMol(c, p, P, a, k)      su molekülü (O ve iki H)
     iyonsu(c, p, o)           Na⁺ ve Cl⁻ çevresinde su molekülleri; iyon–su çizgileri su–su çizgilerinden kalın
     sabunMol(c, p, P, aci, k) sabun molekülü (mor baş, dalgalı kuyruk)
     suKesiti(c, p, o)         su kesiti: su–su çizgileri, yüzeyde ve içte sabun molekülleri
     tekne, tabak, gol         ebru teknesi, süt tabağı, gölet
     olcumTablosu(c, p, o)     dokuz değerli ölçüm tablosu (Madde × sıcaklık, N/m)
     kutuTahtasi(c, p, o)      kutulu sınıflandırma tahtası (sinifla ile birlikte) */
window.KIT_M = (() => {
  'use strict';
  const { RENK, ileri, rastgele, yazi, cizgi, koy, kutu, gizle, belir, par, ok, isaret } = window.KIT;
  const { ease } = Ders;

  /* ---- renkler ---- */
  const GRI = { koyu: '#8a93ad', acik: '#e3e7f3', molekul: '#c9cfe0', cam: '#6b78b0', ic: '#0c1226', tahta: '#10162b' };
  const MOR = 'var(--c4)';
  const SIVI = { su: '#b8c0d8', gliserin: '#ddd0a6', etilen: '#b6cfc9', etanol: '#d9d9e3', sabun: '#b8c0d8', tuz: '#b8c0d8', odu: '#b8c0d8' };
  const BOYA = ['#e6c35c', '#d98aa6', '#6fc7d9'];

  /* ---- örnek veri (kitaptaki dokuz N/m değeri; damla ve kubbe bunlardan türetilir) ---- */
  const NM = { 'su-20': 0.073, 'su-50': 0.068, 'sabun-20': 0.025, 'etanol-20': 0.022, 'etanol-50': 0.020, 'etilen-20': 0.048, 'etilen-50': 0.044, 'gliserin-20': 0.063, 'gliserin-50': 0.058 };
  const DAMLA = {};
  Object.keys(NM).forEach((k) => { DAMLA[k] = Math.round(300 * NM[k] + 1e-9); });
  const KUBBE = 1300;
  const kubbeH = (anahtar) => NM[anahtar] * KUBBE;
  const virgul = (n) => String(n).replace('.', ',');
  const sinir = (v, a, b) => Math.max(a, Math.min(b, v));

  /* Sayı + birim tek öğe olarak okunur: ('20', '°C') → "20°C". */
  const sb = (c, p, x, y, sayi, birim, o = {}) => {
    const t = yazi(c, p, x, y, '', o);
    t.sayi = c.S('tspan', { text: sayi }, t);
    if (birim) c.S('tspan', { text: birim, 'font-size': o.bsize || Math.max(18, Math.round((o.size || 26) * 0.72)), style: 'fill:' + (o.brenk || RENK.soluk) }, t);
    return t;
  };
  /* Soluk ad + değer: "damla: 22". */
  const etiketSatiri = (c, p, x, y, ad, deger, o = {}) => {
    const t = yazi(c, p, x, y, '', Object.assign({ size: 26, kalin: 600 }, o));
    c.S('tspan', { text: ad + ': ', style: 'fill:' + RENK.soluk }, t);
    t.deger = c.S('tspan', { text: deger, style: 'fill:' + (o.renkDeger || RENK.yazi) }, t);
    return t;
  };

  /* ---- madenî para (yandan görünüş) ----
     Yerel koordinat: orijin paranın üst yüzünün ortası. */
  const PR = 118, PW = 100, PRY = 21, PTH = 18;
  function madeni(c, g) {
    c.S('path', { d: `M${-PR},0 L${-PR},${PTH} A${PR} ${PRY} 0 0 0 ${PR},${PTH} L${PR},0 Z`, fill: '#7d87a8', stroke: '#5b678f', 'stroke-width': 2 }, g);
    c.S('ellipse', { cx: 0, cy: 0, rx: PR, ry: PRY, fill: '#aab3d1', stroke: '#6b78b0', 'stroke-width': 2 }, g);
  }
  const kubbeYol = (w, h) => `M${-w},0 C${-w},${-h * 4 / 3} ${w},${-h * 4 / 3} ${w},0 A${w} ${PRY * w / PR} 0 0 1 ${-w},0 Z`;
  const kubbeUst = (w, h) => `M${-w},0 C${-w},${-h * 4 / 3} ${w},${-h * 4 / 3} ${w},0`;

  /* ---- para: damlalık, kubbe, sayaç ----
     o: { x, y (paranın üst yüzünün ortası), k, sivi, N (taşmadan duran damla), H (kubbe yüksekliği), n (başlangıç damlası),
          sayac (true: "damla: n örnek veri"), etiket (true: "örnek veri" yazılır), sayacYer: [x, y], size }
     Dönen: { kok, g, st, kur(yeni), say(n, ms), tasir(ms), tasmaGizle(), hayalet(h), olcu(acik, ms), sayacEl, ... } */
  function para(c, p, o = {}) {
    const k = o.k || 1, X = o.x == null ? 500 : o.x, Y = o.y == null ? 470 : o.y, TIP = -150;
    const st = { sivi: o.sivi || 'su', N: o.N || 22, H: o.H || 95, n: o.n || 0, tasma: 0, ghost: 0 };
    const kok = c.S('g', {}, p), g = c.S('g', { transform: `translate(${X},${Y}) scale(${k})` }, kok);
    madeni(c, g);
    const hayaletYol = c.S('path', { fill: 'none', stroke: GRI.acik, 'stroke-width': 2.5, 'stroke-dasharray': '7 6', 'stroke-opacity': 0.85 }, g);
    const akinti = c.S('g', {}, g);
    const kubbe = c.S('path', { 'stroke-width': 2.5, stroke: 'rgba(255,255,255,0.55)' }, g);
    // Damlalık: cam boru, içinde sıvı.
    const dp = c.S('g', {}, g);
    c.S('path', { d: 'M-8,-150 L-8,-216 L8,-216 L8,-150 L2.5,-134 L-2.5,-134 Z', fill: '#2b3560', stroke: GRI.cam, 'stroke-width': 3, 'stroke-linejoin': 'round' }, dp);
    c.S('ellipse', { cx: 0, cy: -240, rx: 21, ry: 28, fill: '#3a4577', stroke: GRI.cam, 'stroke-width': 3 }, dp);
    const ic = c.S('path', { d: 'M-4.5,-148 L-4.5,-212 L4.5,-212 L4.5,-148 L1.5,-138 L-1.5,-138 Z' }, dp);
    const dusen = c.S('circle', { r: 6.5, cx: 0, cy: TIP }, g);
    // Yükseklik oku: kubbenin boyunu gösterir.
    const olcuG = c.S('g', {}, g), XO = PW + 36;
    const oUst = cizgi(c, olcuG, [0, 0], [0, 0], RENK.vurgu, 2, { 'stroke-dasharray': '5 5', 'stroke-opacity': 0.8 });
    const oAlt = cizgi(c, olcuG, [0, 0], [0, 0], RENK.vurgu, 2, { 'stroke-dasharray': '5 5', 'stroke-opacity': 0.8 });
    const oA = ok(c, olcuG, [XO, -10], [XO, -30], RENK.vurgu, 4), oB = ok(c, olcuG, [XO, -10], [XO, 10], RENK.vurgu, 4);
    olcuG.style.opacity = 0;
    // Sayaç (ölçeklenmeyen yazı).
    let sayacEl = null, say1 = null;
    if (o.sayac !== false) {
      const yer = o.sayacYer || [X, Y + k * (PTH + PRY) + 46];
      sayacEl = yazi(c, kok, yer[0], yer[1], '', { size: o.size || 28, kalin: 700, hiza: o.sayacHiza });
      c.S('tspan', { text: 'damla: ', style: 'fill:' + RENK.soluk }, sayacEl);
      say1 = c.S('tspan', { text: '0', style: 'fill:' + RENK.vurgu }, sayacEl);
      if (o.etiket !== false) c.S('tspan', { text: ' örnek veri', 'font-size': 20, 'font-weight': 500, style: 'fill:' + RENK.soluk }, sayacEl);
    }
    const tasti = yazi(c, kok, X + k * (PR + 16), Y + k * 22, o.tasti === false ? '' : 'taştı', { hiza: 'start', size: 26, kalin: 700, renk: RENK.vurgu });
    tasti.style.opacity = 0;

    const hh = (n) => (n <= 0.001 ? 0 : st.H * (0.14 + 0.86 * Math.min(1, n / st.N)));
    const ww = (n) => PW * Math.min(1, 0.28 + (0.72 * n) / (0.35 * st.N));
    const ciz = (dusuyor) => {
      const ton = SIVI[st.sivi] || SIVI.su, nn = Math.floor(st.n + 1e-9);
      const h = hh(nn) * (1 + 0.04 * Math.sin(Math.PI * st.tasma)), w = ww(nn);
      kubbe.setAttribute('d', h > 0 ? kubbeYol(w, h) : ''); kubbe.setAttribute('fill', ton); kubbe.setAttribute('fill-opacity', 0.9);
      ic.setAttribute('fill', ton); ic.setAttribute('fill-opacity', 0.85);
      if (st.ghost > 0) { hayaletYol.setAttribute('d', kubbeUst(PW, st.ghost)); hayaletYol.style.opacity = 1; } else hayaletYol.style.opacity = 0;
      if (say1) say1.textContent = String(nn);
      // düşen damla
      const f = st.n - nn;
      if (dusuyor && f > 0.02 && nn < st.N + 1) { dusen.setAttribute('cy', TIP + (-h - TIP) * f); dusen.setAttribute('fill', ton); dusen.style.opacity = 1; } else dusen.style.opacity = 0;
      // taşan sıvı
      akinti.textContent = '';
      if (st.tasma > 0.02) {
        // Sıvı paranın kenarından aşağı süzülür: yan yüzey ıslanır, kenarda damla oluşur ve düşer.
        [-1, 1].forEach((s) => {
          const x0 = s * (PR - 16), t = st.tasma, boy = Math.min(1, t * 2.2) * PTH;
          c.S('path', { d: `M${x0},-1 L${x0 + s * 16},-1 L${x0 + s * 16},${boy} L${x0},${boy} Z`, fill: ton, 'fill-opacity': 0.9 }, akinti);
          if (t > 0.45) {
            const u = (t - 0.45) / 0.55;
            c.S('circle', { cx: s * (PR - 6), cy: PTH + 4 + u * 30, r: 5.5 * (1 - 0.3 * u), fill: ton, 'fill-opacity': 1 - 0.7 * u }, akinti);
          }
        });
      }
      tasti.style.opacity = st.tasma > 0.5 ? 1 : 0;
      // yükseklik oku
      if (h > 14) {
        koy(oUst, [0, -h], [XO + 12, -h]); koy(oAlt, [PW * 0.55, 0], [XO + 12, 0]);
        oA.ciz([XO, -h / 2 - 2], [XO, -h]); oB.ciz([XO, -h / 2 + 2], [XO, 0]);
      } else { oA.ciz([0, 0], [0, 0]); oB.ciz([0, 0], [0, 0]); }
    };
    ciz(false);
    let surum = 0;
    const u = {
      kok, g, st, X, Y, k, sayacEl, olcuG,
      kur(yeni) { Object.assign(st, yeni); ++surum; ciz(false); },
      say(hedef, ms) {
        const my = ++surum, a = st.n;
        if (!ms) { st.n = hedef; ciz(false); return Promise.resolve(); }
        return c.tween(ms, (e) => { if (my !== surum) return; st.n = a + (hedef - a) * e; ciz(true); }, ease.linear)
          .then(() => { if (my === surum) { st.n = hedef; ciz(false); return true; } return false; });
      },
      tasir(ms = 900) { const my = ++surum; return c.tween(ms, (e) => { if (my !== surum) return; st.tasma = e; ciz(false); }, ease.out); },
      tasmaGizle() { st.tasma = 0; ciz(false); },
      hayalet(h) { st.ghost = h; ciz(false); },
      olcu(acik, ms = 400) { return belir(c, olcuG, ms, acik ? 1 : 0); },
      damlalik: dp,
    };
    return u;
  }

  /* ---- minipara: yalnızca para ve kubbe (isteğe bağlı hayalet çizgi) ---- */
  function minipara(c, p, o) {
    const k = o.k || 1, g = c.S('g', { transform: `translate(${o.x},${o.y}) scale(${k})` }, p);
    madeni(c, g);
    if (o.h) c.S('path', { d: kubbeYol(PW, o.h), fill: SIVI[o.sivi || 'su'], 'fill-opacity': 0.9, stroke: 'rgba(255,255,255,0.55)', 'stroke-width': 2.5 }, g);
    if (o.hayalet) c.S('path', { d: kubbeUst(PW, o.hayalet), fill: 'none', stroke: GRI.acik, 'stroke-width': 2.5, 'stroke-dasharray': '7 6', 'stroke-opacity': 0.95 }, g);
    return g;
  }

  /* ---- beherglas ve ısıtıcı ----
     o: { x, y (beherin taban ortası), k, sic (20|50), sivi, etiket (true: sıcaklık yazısı) } ; git(sic, ms) */
  function beher(c, p, o = {}) {
    const k = o.k || 1, X = o.x, Y = o.y, W = 76, H = 170, SEV = 112;
    const kok = c.S('g', {}, p), g = c.S('g', { transform: `translate(${X},${Y}) scale(${k})` }, kok);
    const ton = SIVI[o.sivi || 'su'];
    // ısıtıcı: plaka ve sarmal
    c.S('rect', { x: -W - 26, y: 8, width: 2 * W + 52, height: 18, rx: 6, fill: '#3a4577', stroke: GRI.cam, 'stroke-width': 3 }, g);
    c.S('path', { d: `M${-W + 4},3 l14,-9 l14,9 l14,-9 l14,9 l14,-9 l14,9 l14,-9 l14,9 l14,-9 l14,9`, fill: 'none', stroke: GRI.koyu, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    // sıvı ve cam
    const sivR = c.S('rect', { x: -W + 3, y: -SEV, width: 2 * W - 6, height: SEV - 2, fill: ton, 'fill-opacity': 0.55, rx: 3 }, g);
    const sivL = cizgi(c, g, [-W + 3, -SEV], [W - 3, -SEV], ton, 3);
    c.S('path', { d: `M${-W},${-H} L${-W},0 L${W},0 L${W},${-H}`, fill: 'none', stroke: GRI.cam, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    // çözünen madde: tuz iyonları (turuncu ve mavi) ya da sabun molekülleri (mor), şematik noktalar
    if (o.cozunen) {
      const rnd = rastgele(o.tohum || 4);
      for (let i = 0; i < 12; i++) {
        const x = -W + 18 + rnd() * (2 * W - 36), y = -SEV + 16 + rnd() * (SEV - 36);
        const renk = o.cozunen === 'sabun' ? MOR : (i % 2 ? RENK.eksi : RENK.arti);
        c.S('circle', { cx: x, cy: y, r: o.cozunen === 'sabun' ? 7 : 6, fill: renk }, g);
      }
    }
    // sıcak hava dalgaları
    const dal = c.S('g', {}, g);
    [-40, 0, 40].forEach((x) => c.S('path', { d: `M${x},-4 q8,-9 0,-18 t0,-18`, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4, 'stroke-linecap': 'round' }, dal));
    dal.style.opacity = o.sic === 50 ? 1 : 0;
    let et = null;
    if (o.etiket !== false) et = sb(c, kok, X, Y - k * H - 16, String(o.sic || 20), '°C', { size: o.size || 32, kalin: 700, brenk: RENK.yazi });
    return {
      kok, g, X, Y, k, sivi: ton,
      ton(ad) { sivR.setAttribute('fill', SIVI[ad]); sivL.setAttribute('stroke', SIVI[ad]); },
      git(sic, ms = 600) {
        if (et) et.sayi.textContent = String(sic);
        return belir(c, dal, ms, sic === 50 ? 1 : 0);
      },
      etiket: et,
    };
  }

  /* ---- deney tablosu (satır ekleyen): Sıvı · Çözünen · Sıcaklık · Damla ----
     o: { x, y, w, sut ([0..3]), satirlar }; satirEkle({ sivi, coz, sic, damla }) */
  function deneyTablosu(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 440, SUT = o.sut || [0, 1, 2, 3];
    const TAM = [88, 100, 112, 120], AD = ['Sıvı', 'Çözünen', 'Sıcaklık', 'Damla'];
    const top = SUT.reduce((a, i) => a + TAM[i], 0), GEN = SUT.map((i) => (TAM[i] * W) / top);
    const SAT = 46, HB = 58, ust = o.y, cx = [];
    let a = o.x; GEN.forEach((w) => { cx.push(a + w / 2); a += w; });
    SUT.forEach((i, j) => {
      yazi(c, g, cx[j], ust + 22, AD[i], { size: 22, kalin: 600, renk: RENK.soluk });
      if (i === 3) yazi(c, g, cx[j], ust + 46, 'örnek veri', { size: 18, kalin: 500, renk: RENK.soluk });
    });
    cizgi(c, g, [o.x, ust + HB], [o.x + W, ust + HB], GRI.cam, 2);
    const satirlar = [], ogeler = [];
    const ekle = (s, anim) => {
      const j = satirlar.length, y = ust + HB + SAT * (j + 0.5) + 6, e = c.S('g', {}, g);
      const fon = c.S('rect', { x: o.x - 4, y: y - SAT / 2 - 2, width: W + 8, height: SAT - 4, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0 }, e);
      SUT.forEach((i, q) => {
        if (i === 0) yazi(c, e, cx[q], y + 8, s.sivi, { size: 26, kalin: 600 });
        if (i === 1) yazi(c, e, cx[q], y + 8, s.coz || 'yok', { size: 26, kalin: 600 });
        if (i === 2) sb(c, e, cx[q], y + 8, String(s.sic), '°C', { size: 26, kalin: 600, bsize: 20, brenk: RENK.yazi });
        if (i === 3) yazi(c, e, cx[q], y + 8, String(s.damla), { size: 28, kalin: 700, renk: RENK.vurgu });
      });
      satirlar.push(s); ogeler.push({ e, fon, y });
      if (anim) { e.style.opacity = 0; return belir(c, e, 450, 1); }
      return Promise.resolve();
    };
    (o.satirlar || []).forEach((s) => ekle(s, false));
    return {
      g, satirlar, ogeler, satirEkle: (s) => ekle(s, true),
      /* i. ve (i+1). satırın damla sayıları arasına aşağı ok koyar; etiket verilirse yanına yazar. */
      aralikOku(i, etiket) {
        const e = c.S('g', {}, g), q = SUT.indexOf(3), x = cx[q] + 52, y1 = ogeler[i].y, y2 = ogeler[i + 1].y;
        ok(c, e, [x, y1 - 6], [x, y2 - 18], RENK.vurgu, 4);
        if (etiket) yazi(c, e, x + 12, (y1 + y2) / 2 + 2, etiket, { hiza: 'start', size: 22, kalin: 700, renk: RENK.vurgu });
        e.style.opacity = 0; return { g: e, goster: (ms = 500) => belir(c, e, ms, 1) };
      },
      vurgu(i, acik) { ogeler[i].fon.setAttribute('fill-opacity', acik ? 0.2 : 0); },
    };
  }

  /* ---- deney matrisi: satır = sıvı, sütun = sıcaklık; her deneme bir hücreyi doldurur ----
     o: { x, y, w, sivilar: [{ ad, anahtar }] } ; yaz(anahtar, sic, damla) ; oklar() ; vurgu(acik) */
  function deneyMatrisi(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 340, SAT = 56, HB = 70;
    const x0 = o.x, cx = [x0 + W * 0.2, x0 + W * 0.58, x0 + W * 0.88];
    const et = yazi(c, g, o.x + W / 2, o.y + 18, '', { size: 20, kalin: 500, renk: RENK.soluk });
    et.textContent = 'damla (örnek veri)';
    yazi(c, g, cx[0], o.y + 52, 'Sıvı', { size: 22, kalin: 600, renk: RENK.soluk, hiza: 'middle' });
    sb(c, g, cx[1], o.y + 52, '20', '°C', { size: 22, kalin: 600, bsize: 18, brenk: RENK.soluk });
    sb(c, g, cx[2], o.y + 52, '50', '°C', { size: 22, kalin: 600, bsize: 18, brenk: RENK.soluk });
    cizgi(c, g, [o.x, o.y + HB - 6], [o.x + W, o.y + HB - 6], GRI.cam, 2);
    const hucre = {}, oklar = {}, fonlar = [];
    o.sivilar.forEach((s, j) => {
      const y = o.y + HB + SAT * (j + 0.5) + 4;
      fonlar.push(c.S('rect', { x: o.x - 4, y: y - SAT / 2 + 4, width: W + 8, height: SAT - 8, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0 }, g));
      yazi(c, g, cx[0], y + 9, s.ad, { size: 24, kalin: 600 });
      [20, 50].forEach((sic, q) => {
        const t = yazi(c, g, cx[q + 1], y + 10, '', { size: 30, kalin: 700, renk: RENK.vurgu });
        t.style.opacity = 0; hucre[s.anahtar + '-' + sic] = t;
      });
      const a = ok(c, g, [cx[2] + 36, y - 12], [cx[2] + 36, y + 12], RENK.vurgu, 4);
      a.g.style.opacity = 0; oklar[s.anahtar] = a;
    });
    return {
      g, hucre, yazilan: new Set(),
      yaz(anahtar, sic, damla) {
        const t = hucre[anahtar + '-' + sic]; t.textContent = String(damla); this.yazilan.add(anahtar + '-' + sic);
        return belir(c, t, 450, 1);
      },
      var: (anahtar, sic) => hucre[anahtar + '-' + sic].textContent !== '',
      oklar(ms = 500) { return Promise.all(Object.keys(oklar).map((a) => belir(c, oklar[a].g, ms, 1))); },
      vurgu(acik) { fonlar.forEach((f) => f.setAttribute('fill-opacity', acik ? 0.14 : 0)); },
    };
  }

  /* ---- karşılaştırma tablosu: Sıvı · Kubbe (küçük çizim) · Damla (örnek veri) · Yüzey gerilimi ----
     o: { x, y, w } ; satirEkle({ sivi, h (kubbe), damla, gerilim }) ; doldur(i, metin) */
  function karsilastirma(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 470, SAT = 60, HB = 66;
    const cx = [o.x + W * 0.13, o.x + W * 0.36, o.x + W * 0.57, o.x + W * 0.84];
    ['Sıvı', 'Kubbe', 'Damla', 'Yüzey gerilimi'].forEach((a, i) => yazi(c, g, cx[i], o.y + 24, a, { size: 22, kalin: 600, renk: RENK.soluk }));
    yazi(c, g, cx[2], o.y + 48, 'örnek veri', { size: 18, kalin: 500, renk: RENK.soluk });
    cizgi(c, g, [o.x, o.y + HB - 4], [o.x + W, o.y + HB - 4], GRI.cam, 2);
    const satirlar = [];
    return {
      g, satirlar,
      satirEkle(s) {
        const j = satirlar.length, y = o.y + HB + SAT * (j + 0.5), e = c.S('g', {}, g);
        yazi(c, e, cx[0], y + 8, s.sivi, { size: 24, kalin: 600 });
        const kk = c.S('g', { transform: `translate(${cx[1]},${y + 16}) scale(0.28)` }, e);
        madeni(c, kk); c.S('path', { d: kubbeYol(PW, s.h), fill: SIVI[s.ton || 'su'], 'fill-opacity': 0.9, stroke: 'rgba(255,255,255,0.55)', 'stroke-width': 3 }, kk);
        yazi(c, e, cx[2], y + 9, String(s.damla), { size: 28, kalin: 700, renk: RENK.vurgu });
        const gt = yazi(c, e, cx[3], y + 8, s.gerilim || '', { size: 24, kalin: 600, renk: RENK.iyi });
        satirlar.push({ e, gt, y });
        e.style.opacity = 0; return belir(c, e, 450, 1);
      },
      doldur(i, metin) { satirlar[i].gt.textContent = metin; return belir(c, satirlar[i].gt, 300, 1); },
    };
  }

  /* ---- soru kartı ve altına düşen iki etiket ---- */
  function sorukarti(c, p, o) {
    const g = c.S('g', {}, p), size = o.size || 28;
    kutu(c, g, o.x, o.y, o.w, o.h, { rx: 16 });
    const n = o.satirlar.length;
    o.satirlar.forEach((s, i) => yazi(c, g, o.x + o.w / 2, o.y + o.h / 2 + (i - (n - 1) / 2) * (size + 10) + size * 0.35, s, { size, kalin: 600 }));
    const et = [0, 1].map((i) => {
      const t = yazi(c, g, o.x + o.w * (i ? 0.77 : 0.23), o.y + o.h + 46, '', { size: 24, kalin: 600 });
      t.style.opacity = 0; return t;
    });
    return {
      g, et,
      etiket(i, ad, deger, ms = 450) {
        et[i].textContent = '';
        c.S('tspan', { text: ad + ': ', style: 'fill:' + RENK.soluk }, et[i]);
        c.S('tspan', { text: deger, style: 'fill:' + (deger === '?' ? RENK.vurgu : RENK.vurgu) }, et[i]);
        return belir(c, et[i], ms, 1);
      },
    };
  }

  /* ---- değişken çerçevesi: Bağımlı · Bağımsız · Kontrol ---- */
  function degiskenler(c, p, o) {
    const g = c.S('g', {}, p), cw = o.w / 3, AD = ['Bağımlı', 'Bağımsız', 'Kontrol'], size = o.size || 24;
    const kol = AD.map((ad, i) => {
      const e = c.S('g', {}, g), x = o.x + i * cw;
      const r = kutu(c, e, x + 5, o.y, cw - 10, o.h, { rx: 14 });
      yazi(c, e, x + cw / 2, o.y + 40, ad, { size: 26, kalin: 700, renk: RENK.soluk });
      cizgi(c, e, [x + 20, o.y + 58], [x + cw - 20, o.y + 58], GRI.cam, 2);
      return { e, r, icerik: c.S('g', {}, e), x };
    });
    return {
      g, kol,
      yaz(i, satirlar, renk = RENK.yazi, ms = 450) {
        const k = kol[i]; k.icerik.textContent = '';
        satirlar.forEach((s, j) => yazi(c, k.icerik, k.x + cw / 2, o.y + 106 + j * 42, s, { size, kalin: 600, renk: Array.isArray(renk) ? renk[j] : renk }));
        k.icerik.style.opacity = 0; return belir(c, k.icerik, ms, 1);
      },
      soru(i) { return this.yaz(i, ['?'], RENK.vurgu, 300); },
      vurgu(i, acik) { kol[i].r.style.stroke = acik ? RENK.vurgu : ''; kol[i].r.style.strokeWidth = acik ? 4 : ''; },
    };
  }

  /* ---- neden-sonuç zinciri ----
     o: { x, y, w, h, adlar: [['moleküller', 'arası çekim'], …], size } ; goster(i, ms) ; vurgu(i, acik) ; ustOk(etiket, renk) */
  function zincir(c, p, o) {
    const g = c.S('g', {}, p), n = o.adlar.length, ara = o.ara || 56, kw = (o.w - (n - 1) * ara) / n, size = o.size || 24;
    const kutular = o.adlar.map((satirlar, i) => {
      const e = c.S('g', {}, g), x = o.x + i * (kw + ara);
      const r = kutu(c, e, x, o.y, kw, o.h, { rx: 14 });
      satirlar.forEach((s, j) => yazi(c, e, x + kw / 2, o.y + o.h / 2 + (j - (satirlar.length - 1) / 2) * (size + 6) + size * 0.35, s, { size, kalin: 600 }));
      e.style.opacity = 0;
      return { e, r };
    });
    const oklar = [];
    for (let i = 0; i < n - 1; i++) {
      const x = o.x + (i + 1) * kw + i * ara, a = ok(c, g, [x + 10, o.y + o.h / 2], [x + ara - 10, o.y + o.h / 2], RENK.yazi, 4);
      a.g.style.opacity = 0; oklar.push(a);
    }
    return {
      g, kutular, oklar,
      goster(i, ms = 500) { return belir(c, kutular[i].e, ms, 1); },
      okAc(i, ms = 500) { return belir(c, oklar[i].g, ms, 1); },
      vurgu(i, acik) { kutular[i].r.style.stroke = acik ? RENK.vurgu : ''; kutular[i].r.style.strokeWidth = acik ? 4 : ''; },
      ustOk(etiket, renk = RENK.cekme) {
        const e = c.S('g', {}, g), y = o.y - 34;
        ok(c, e, [o.x + 20, y], [o.x + o.w - 20, y], renk, 5);
        yazi(c, e, o.x + o.w / 2, y - 14, etiket, { size: 26, kalin: 700, renk });
        e.style.opacity = 0; return e;
      },
    };
  }

  /* ---- sıvı kesiti ----
     o: { x, y, w, h, sutun, satir, r, kalin (çekim çizgisi), iz (hareket izi uzunluğu), vurgu (yüzey ve iç molekül), tohum, sivi, cerceve }
     ayarla({ kalin, iz }, ms) ; vurgula(acik, ms) */
  function cekim(c, p, o) {
    const g = c.S('g', {}, p), rnd = rastgele(o.tohum || 5);
    const S = o.sutun || 6, R = o.satir || 4, r = o.r || 16;
    if (o.cerceve !== false) kutu(c, g, o.x, o.y, o.w, o.h, { rx: 14 });
    const yuzY = o.y + (o.ust == null ? 46 : o.ust);
    const dx = (o.w - (o.kenar || 90)) / (S - 1), dy = (o.y + o.h - (o.alt == null ? 40 : o.alt) - (yuzY + 36)) / (R - 1), x0 = o.x + (o.kenar || 90) / 2, y0 = yuzY + 36;
    const P = [];
    for (let j = 0; j < R; j++) for (let i = 0; i < S; i++) P.push({ j, i, x: x0 + i * dx + (rnd() - 0.5) * 6, y: y0 + j * dy + (rnd() - 0.5) * 6, a: rnd() * 6.28 });
    const yer = (j, i) => P[j * S + i];
    const ton = SIVI[o.sivi || 'su'];
    c.S('rect', { x: o.x + 4, y: yuzY, width: o.w - 8, height: o.y + o.h - yuzY - 4, fill: ton, 'fill-opacity': 0.12 }, g);
    cizgi(c, g, [o.x + 8, yuzY], [o.x + o.w - 8, yuzY], ton, 3, { 'stroke-opacity': 0.9 });
    const gc = c.S('g', {}, g), gi = c.S('g', {}, g), gv = c.S('g', {}, g), gm = c.S('g', {}, g);
    const hatlar = [];
    for (let j = 0; j < R; j++) for (let i = 0; i < S; i++) {
      const a = yer(j, i);
      if (i + 1 < S) hatlar.push(cizgi(c, gc, [a.x, a.y], [yer(j, i + 1).x, yer(j, i + 1).y], RENK.cekme, o.kalin || 3.5, { 'stroke-opacity': 0.5 }));
      if (j + 1 < R) hatlar.push(cizgi(c, gc, [a.x, a.y], [yer(j + 1, i).x, yer(j + 1, i).y], RENK.cekme, o.kalin || 3.5, { 'stroke-opacity': 0.5 }));
    }
    const izler = P.map((a) => cizgi(c, gi, [a.x, a.y], [a.x, a.y], GRI.molekul, 3, { 'stroke-opacity': 0.55 }));
    P.forEach((a) => c.S('circle', { cx: a.x, cy: a.y, r, fill: GRI.molekul }, gm));
    // Vurgu: yüzeydeki molekülde yalnızca yan ve alt çizgiler; içteki molekülde dört yön.
    const ys = yer(0, Math.min(2, S - 1)), ii = yer(Math.min(2, R - 1), Math.min(3, S - 1));
    cizgi(c, gv, [ys.x, ys.y - r - 4], [ys.x, ys.y - r - 34], GRI.koyu, 3, { 'stroke-dasharray': '3 7', 'stroke-opacity': 0.9 });
    const kalinCiz = (a, b) => cizgi(c, gv, [a.x, a.y], [b.x, b.y], RENK.cekme, 7);
    kalinCiz(ys, yer(0, Math.min(2, S - 1) - 1)); kalinCiz(ys, yer(0, Math.min(2, S - 1) + 1)); kalinCiz(ys, yer(1, Math.min(2, S - 1)));
    const jj = Math.min(2, R - 1), ij = Math.min(3, S - 1);
    kalinCiz(ii, yer(jj - 1, ij)); kalinCiz(ii, yer(jj + 1 < R ? jj + 1 : jj - 1, ij)); kalinCiz(ii, yer(jj, ij - 1)); kalinCiz(ii, yer(jj, ij + 1 < S ? ij + 1 : ij - 1));
    [ys, ii].forEach((a) => {
      c.S('circle', { cx: a.x, cy: a.y, r: r + 7, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, gv);
      c.S('circle', { cx: a.x, cy: a.y, r, fill: GRI.molekul }, gv);
    });
    gv.style.opacity = o.vurgu ? 1 : 0;
    const cur = { kalin: o.kalin || 3.5, iz: o.iz || 0 };
    const ciz = () => {
      hatlar.forEach((h) => h.setAttribute('stroke-width', cur.kalin));
      P.forEach((a, i) => { koy(izler[i], [a.x, a.y], [a.x + cur.iz * Math.cos(a.a), a.y + cur.iz * Math.sin(a.a)]); });
    };
    ciz();
    return {
      g, yuzY, gv, P,
      vurgula(acik, ms = 450) { return belir(c, gv, ms, acik ? 1 : 0); },
      ayarla(yeni, ms = 0) {
        const A = Object.assign({}, cur), B = Object.assign({}, cur, yeni);
        if (!ms) { Object.assign(cur, B); ciz(); return Promise.resolve(); }
        return c.tween(ms, (e) => { for (const key in B) cur[key] = A[key] + (B[key] - A[key]) * e; ciz(); });
      },
    };
  }

  /* ---- su molekülü: O (iri) ve iki H; a: H'lerin bulunduğu yön (radyan) ---- */
  function suMol(c, p, P, a, k = 1) {
    const g = c.S('g', {}, p), L = 27 * k, Hs = [a - 0.91, a + 0.91].map((b) => ileri(P, b, L));
    Hs.forEach((H) => cizgi(c, g, P, H, '#8a93ad', 3 * k));
    Hs.forEach((H) => c.S('circle', { cx: H[0], cy: H[1], r: 9 * k, fill: '#e8ebf5' }, g));
    c.S('circle', { cx: P[0], cy: P[1], r: 15 * k, fill: '#aab3d1' }, g);
    return g;
  }

  /* ---- tuzlu su kesiti: Na⁺ ve Cl⁻ çevresinde su molekülleri ----
     o: { x, y, w, h } ; g · suG · iyonG (iyon–su çizgileri kalın) · suCizgi (su–su çizgileri) */
  function iyonsu(c, p, o) {
    const g = c.S('g', {}, p);
    if (o.cerceve !== false) kutu(c, g, o.x, o.y, o.w, o.h, { rx: 14 });
    const cy = o.y + o.h * 0.52, N = [o.x + o.w * 0.27, cy], C = [o.x + o.w * 0.73, cy];
    const A = [-135, -45, 45, 135].map((d) => (d * Math.PI) / 180), rN = 82, rC = 90;
    const wN = A.map((a) => ileri(N, a, rN)), wC = A.map((a) => ileri(C, a, rC));
    const suCizgi = c.S('g', {}, g), iyonCizgi = c.S('g', {}, g), suG = c.S('g', {}, g), iyonG = c.S('g', {}, g);
    cizgi(c, suCizgi, wN[1], wC[0], RENK.cekme, 4); cizgi(c, suCizgi, wN[2], wC[3], RENK.cekme, 4);
    wN.forEach((P) => cizgi(c, iyonCizgi, N, P, RENK.cekme, 9)); wC.forEach((P) => cizgi(c, iyonCizgi, C, P, RENK.cekme, 9));
    wN.forEach((P, i) => suMol(c, suG, P, A[i]));
    wC.forEach((P, i) => suMol(c, suG, P, A[i] + Math.PI));
    c.S('circle', { cx: N[0], cy: N[1], r: 28, fill: RENK.arti }, iyonG); c.S('circle', { cx: C[0], cy: C[1], r: 36, fill: RENK.eksi }, iyonG);
    yazi(c, iyonG, N[0], N[1] + 9, 'Na^{+}', { size: 26, kalin: 700, renk: '#10162b', math: true });
    yazi(c, iyonG, C[0], C[1] + 9, 'Cl^{−}', { size: 26, kalin: 700, renk: '#10162b', math: true });
    return { g, suG, iyonG, iyonCizgi, suCizgi, N, C };
  }

  /* ---- sabun molekülü: mor yuvarlak baş (hidrofil), dalgalı kuyruk (hidrofob). Kuyruk yukarı bakar; aci: derece (saat yönü) ---- */
  function sabunMol(c, p, P, aci = 0, k = 1) {
    const g = c.S('g', {}, p);
    c.S('path', { d: 'M0,0 q10,-11 0,-22 t0,-22 t0,-22', fill: 'none', stroke: MOR, 'stroke-width': 5.5, 'stroke-linecap': 'round' }, g);
    c.S('circle', { cx: 0, cy: 0, r: 15, fill: MOR }, g);
    const koyAyar = (Q, a2) => g.setAttribute('transform', `translate(${Q[0]},${Q[1]}) rotate(${a2}) scale(${k})`);
    koyAyar(P, aci);
    return { g, tasi: koyAyar };
  }

  /* ---- su kesiti: su–su çizgileri, sabun molekülleri ----
     o: { x, y, w, h, sutun, satir, kalin, kesik, tohum, sabun: [{ j, i, aci, yuzey }] , cerceve }
     Dönen: { g, ayarla({ kalin, kesik }, ms), suGoster(j, i, a, ms), sabunlar[], yer(j, i), yuzY } */
  function suKesiti(c, p, o) {
    const g = c.S('g', {}, p), rnd = rastgele(o.tohum || 11), S = o.sutun || 5, R = o.satir || 3;
    if (o.cerceve !== false) kutu(c, g, o.x, o.y, o.w, o.h, { rx: 14 });
    const yuzY = o.y + (o.ust || 70), dx = (o.w - 100) / (S - 1), dy = (o.y + o.h - 40 - (yuzY + 42)) / (R - 1);
    const ton = SIVI.su;
    c.S('rect', { x: o.x + 4, y: yuzY, width: o.w - 8, height: o.y + o.h - yuzY - 4, fill: ton, 'fill-opacity': 0.12 }, g);
    cizgi(c, g, [o.x + 8, yuzY], [o.x + o.w - 8, yuzY], ton, 3, { 'stroke-opacity': 0.9 });
    const gl = c.S('g', {}, g), gs = c.S('g', {}, g), gsab = c.S('g', {}, g);
    const yer = {}, anah = (j, i) => j + ',' + i;
    for (let j = 0; j < R; j++) for (let i = 0; i < (j % 2 ? S - 1 : S); i++) {
      yer[anah(j, i)] = { j, i, P: [o.x + 50 + i * dx + (j % 2 ? dx / 2 : 0), yuzY + 42 + j * dy], a: rnd() * 6.28, a0: 0 };
    }
    const sabunYer = new Set((o.sabun || []).map((s) => anah(s.j, s.i)));
    const anahtarlar = Object.keys(yer);
    anahtarlar.forEach((key) => {
      const s = yer[key]; s.g = c.S('g', {}, gs); suMol(c, s.g, s.P, s.a); s.g.style.opacity = sabunYer.has(key) ? 0 : 1; s.o = sabunYer.has(key) ? 0 : 1;
    });
    const hatlar = [];
    anahtarlar.forEach((a) => anahtarlar.forEach((b) => {
      if (a >= b) return;
      const A = yer[a], B = yer[b];
      if (Math.hypot(A.P[0] - B.P[0], A.P[1] - B.P[1]) < Math.max(dx, Math.hypot(dx / 2, dy)) + 3) hatlar.push({ a: A, b: B, el: cizgi(c, gl, A.P, B.P, RENK.cekme, o.kalin || 4.5, { 'stroke-opacity': 0.9 }) });
    }));
    const cur = { kalin: o.kalin || 4.5, kesik: o.kesik ? 1 : 0 };
    const ciz = () => hatlar.forEach((h) => {
      h.el.setAttribute('stroke-width', cur.kalin);
      h.el.setAttribute('stroke-dasharray', cur.kesik > 0.5 ? '5 7' : '');
      h.el.style.opacity = Math.min(h.a.o, h.b.o);
    });
    ciz();
    const sabunlar = (o.sabun || []).map((s) => {
      const P = yer[anah(s.j, s.i)].P.slice();
      if (s.yuzey) P[1] = yuzY + 20;
      const m = sabunMol(c, gsab, P, s.aci || 0, o.k || 1);
      return { m, P, aci: s.aci || 0, j: s.j, i: s.i, yuzey: !!s.yuzey };
    });
    return {
      g, yuzY, yer: (j, i) => yer[anah(j, i)], sabunlar, gsab,
      ayarla(yeni, ms = 0) {
        const A = Object.assign({}, cur), B = Object.assign({}, cur, yeni);
        if (!ms) { Object.assign(cur, B); ciz(); return Promise.resolve(); }
        return c.tween(ms, (e) => { for (const key in B) cur[key] = A[key] + (B[key] - A[key]) * e; ciz(); });
      },
      /* Bir noktadaki suyu açar ya da kapatır. */
      suAyar(j, i, a, ms = 400) {
        const s = yer[anah(j, i)], b0 = s.o;
        return c.tween(ms, (e) => { s.o = b0 + (a - b0) * e; s.g.style.opacity = s.o; ciz(); });
      },
      /* Sabun molekülünü yeni yere taşır. */
      tasi(sb2, P2, aci2, ms = 1200) {
        const A = sb2.P.slice(), a0 = sb2.aci;
        return c.tween(ms, (e) => { const Q = [A[0] + (P2[0] - A[0]) * e, A[1] + (P2[1] - A[1]) * e]; sb2.m.tasi(Q, a0 + (aci2 - a0) * e); }).then(() => { sb2.P = P2.slice(); sb2.aci = aci2; });
      },
    };
  }

  /* Boya damlasının içindeki girdap: yarıçapı r olan Arşimet sarmalı. */
  const sarmal = (r, donus = 2.2) => {
    const n = 60, nokta = [];
    for (let i = 0; i <= n; i++) { const t = (i / n) * donus * 2 * Math.PI, rr = (r * i) / n; nokta.push(`${(rr * Math.cos(t)).toFixed(1)},${(rr * Math.sin(t)).toFixed(1)}`); }
    return 'M' + nokta.join(' L');
  };
  /* Boya damlası: yuvarlak damla ve (yayılınca beliren) girdap çizgisi. */
  function boyaDamla(c, g, P, renk, r, i) {
    const e = c.S('g', { transform: `translate(${P[0]},${P[1]})` }, g), ic = c.S('g', {}, e);
    const dolgu = c.S('circle', { r, fill: renk, 'fill-opacity': 0.92 }, ic);
    const girdap = c.S('path', { d: sarmal(r * 0.9), fill: 'none', stroke: i % 2 ? '#ffffff' : '#10162b', 'stroke-opacity': 0.5, 'stroke-width': r * 0.12, 'stroke-linecap': 'round' }, ic);
    girdap.style.opacity = 0;
    return { e, dolgu, girdap, P };
  }

  /* ---- ebru teknesi (üstten) ---- */
  function tekne(c, p, o) {
    const g = c.S('g', {}, p), cx = o.x + o.w / 2, cy = o.y + o.h / 2;
    c.S('rect', { x: o.x, y: o.y, width: o.w, height: o.h, rx: 26, fill: '#cfd6ea', 'fill-opacity': 0.45, stroke: GRI.cam, 'stroke-width': 4 }, g);
    const yerler = [[cx - 130, cy - 10], [cx + 20, cy + 50], [cx + 100, cy - 60]];
    const damlalar = yerler.map((P, i) => { const d = boyaDamla(c, g, P, BOYA[i], 28, i); d.e.style.opacity = 0; return d; });
    return {
      g, damlalar,
      async damla(ms = 500) { for (const d of damlalar) { await belir(c, d.e, ms, 1); } },
      /* Boyalar yayılır: büyür, seyrelir, girdap çizgisi belirir. */
      yay(ms = 1800) {
        return c.tween(ms, (e) => damlalar.forEach((d, i) => {
          const s = 1 + 1.9 * e, kay = [cx + (d.P[0] - cx) * (1 - 0.25 * e), cy + (d.P[1] - cy) * (1 - 0.25 * e)];
          d.e.setAttribute('transform', `translate(${kay[0]},${kay[1]}) scale(${s}) rotate(${e * (i % 2 ? 70 : -60)})`);
          d.dolgu.setAttribute('fill-opacity', 0.92 - 0.3 * e); d.girdap.style.opacity = e;
        }));
      },
    };
  }

  /* ---- süt tabağı (üstten): boya damlaları; deterjandan sonra dağılır ---- */
  function tabak(c, p, o) {
    const g = c.S('g', { transform: `translate(${o.x},${o.y})` }, p), r = o.r || 120;
    c.S('circle', { r, fill: '#efe9dc', 'fill-opacity': 0.92, stroke: GRI.cam, 'stroke-width': 4 }, g);
    const yerler = [[-45, -30], [50, -22], [-4, 52]];
    const damlalar = yerler.map((P, i) => boyaDamla(c, g, P, BOYA[i], 24, i));
    return {
      g,
      dagit(ms = 1800) {
        return c.tween(ms, (e) => damlalar.forEach((d, i) => {
          const s = 1 + 1.35 * e, kay = [d.P[0] * (1 - 0.1 * e), d.P[1] * (1 - 0.1 * e)];
          d.e.setAttribute('transform', `translate(${kay[0]},${kay[1]}) scale(${s}) rotate(${e * (i % 2 ? 80 : -70)})`);
          d.dolgu.setAttribute('fill-opacity', 0.92 - 0.35 * e); d.girdap.style.opacity = e;
        }));
      },
    };
  }

  /* ---- gölet (yandan): ördek, tüy üstünde su damlaları; deterjan karışınca tüy ıslanır, ördek suya gömülür ---- */
  function gol(c, p, o) {
    const g = c.S('g', {}, p), ys = o.y, ton = SIVI.su;
    c.S('rect', { x: o.x, y: ys, width: o.w, height: o.h, fill: ton, 'fill-opacity': 0.4 }, g);
    const ordek = c.S('g', { transform: `translate(${o.x + o.w * 0.55},${ys})` }, g);
    c.S('ellipse', { cx: 0, cy: -16, rx: 86, ry: 42, fill: '#e9ecf5' }, ordek);
    c.S('path', { d: 'M-70,-22 q40,-34 118,-8 q-60,48 -118,8 Z', fill: '#cfd5e8' }, ordek);
    c.S('circle', { cx: 78, cy: -62, r: 28, fill: '#d7dcec' }, ordek);
    c.S('path', { d: 'M100,-66 l30,8 l-30,10 Z', fill: '#e0b84c' }, ordek);
    c.S('circle', { cx: 86, cy: -70, r: 4, fill: '#10162b' }, ordek);
    // tüy üstündeki damlalar
    const damlalar = [-45, -18, 12, 38].map((x, i) => c.S('ellipse', { cx: x, cy: -52 + (i % 2 ? 4 : 0), rx: 8, ry: 8, fill: ton, stroke: 'rgba(255,255,255,0.6)', 'stroke-width': 2 }, ordek));
    const islak = c.S('path', { d: 'M-70,-22 q40,-34 118,-8 q-60,48 -118,8 Z', fill: '#7d87a8', 'fill-opacity': 0 }, ordek);
    const govdeIslak = c.S('ellipse', { cx: 0, cy: -16, rx: 86, ry: 42, fill: '#7d87a8', 'fill-opacity': 0 }, ordek);
    // su yüzeyi ön katmanı: batan kısım suyun altında görünür
    const on = c.S('rect', { x: o.x, y: ys, width: o.w, height: o.h, fill: ton, 'fill-opacity': 0.42 }, g);
    cizgi(c, g, [o.x, ys], [o.x + o.w, ys], '#e3e7f3', 3, { 'stroke-opacity': 0.8 });
    // deterjan damlaları ve moleküller
    const det = c.S('g', {}, g), dd = [0, 1, 2].map((i) => c.S('circle', { cx: o.x + o.w * 0.2 + i * 26, cy: ys - 80, r: 8, fill: MOR }, det));
    det.style.opacity = 0;
    const rnd = rastgele(21), nok = c.S('g', {}, g), noktalar = [];
    for (let i = 0; i < 26; i++) { noktalar.push(c.S('circle', { cx: o.x + 40 + rnd() * (o.w - 80), cy: ys + 24 + rnd() * (o.h - 44), r: 5, fill: MOR }, nok)); }
    nok.style.opacity = 0;
    let durum = 0;
    return {
      g, ordek, det, nok,
      async deterjanKat(ms = 1800) {
        await belir(c, det, 300, 1);
        await c.tween(ms * 0.45, (e) => dd.forEach((d, i) => { d.setAttribute('cy', ys - 80 + (86 + i * 3) * e); }));
        await par(belir(c, det, 300, 0), belir(c, nok, ms * 0.5, 1));
      },
      /* Tüy ıslanır, damlalar yayılır, ördek suya gömülür (hedef: 0 kuru … 1 tamamen). */
      isla(ms = 2000, hedef = 1) {
        const e0 = durum;
        return c.tween(ms, (t) => {
          const e = e0 + (hedef - e0) * t; durum = e;
          damlalar.forEach((d) => { d.setAttribute('ry', 8 - 6.5 * e); d.setAttribute('rx', 8 + 6 * e); d.style.opacity = 1 - 0.7 * e; });
          islak.setAttribute('fill-opacity', 0.55 * e); govdeIslak.setAttribute('fill-opacity', 0.45 * e);
          ordek.setAttribute('transform', `translate(${o.x + o.w * 0.55},${ys + 52 * e})`);
        });
      },
    };
  }

  /* ---- ölçüm tablosu: Madde × sıcaklık (N/m) ----
     o: { x, y, w } ; goster(i, ms) ; odak(adlar | null, ms) satırlar için ışık ; tumu(ms) */
  function olcumTablosu(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 400, SAT = 54, HB = 72;
    const SATIR = [['su', '0,073', '0,068'], ['sabunlu su', '0,025', ''], ['etanol', '0,022', '0,020'], ['etilen glikol', '0,048', '0,044'], ['gliserin', '0,063', '0,058']];
    const cx = [o.x + W * 0.22, o.x + W * 0.62, o.x + W * 0.88];
    yazi(c, g, o.x + 6, o.y + 20, 'N/m', { size: 22, kalin: 600, renk: RENK.soluk, hiza: 'start' });
    yazi(c, g, cx[0], o.y + 54, 'Madde', { size: 22, kalin: 600, renk: RENK.soluk });
    sb(c, g, cx[1], o.y + 54, '20', '°C', { size: 22, kalin: 600, bsize: 18, brenk: RENK.soluk });
    sb(c, g, cx[2], o.y + 54, '50', '°C', { size: 22, kalin: 600, bsize: 18, brenk: RENK.soluk });
    cizgi(c, g, [o.x, o.y + HB - 8], [o.x + W, o.y + HB - 8], GRI.cam, 2);
    const sat = SATIR.map(([ad, a, b], j) => {
      const y = o.y + HB + SAT * (j + 0.5), e = c.S('g', {}, g);
      yazi(c, e, cx[0], y + 8, ad, { size: 24, kalin: 600 });
      yazi(c, e, cx[1], y + 9, a, { size: 28, kalin: 700, renk: RENK.vurgu });
      if (b) yazi(c, e, cx[2], y + 9, b, { size: 28, kalin: 700, renk: RENK.vurgu });
      e.style.opacity = 0;
      return { e, ad };
    });
    return {
      g, sat,
      goster(i, ms = 450) { return belir(c, sat[i].e, ms, 1); },
      odak(adlar, ms = 0) {
        if (!ms) { sat.forEach((s) => { s.e.style.opacity = !adlar || adlar.includes(s.ad) ? 1 : 0.1; }); return Promise.resolve(); }
        return Promise.all(sat.map((s) => belir(c, s.e, ms, !adlar || adlar.includes(s.ad) ? 1 : 0.1)));
      },
    };
  }

  /* ---- kutulu sınıflandırma tahtası (sinifla ile birlikte) ----
     o: { kutular: [{ baslik, x, y, w, h }], ciz(k, g) (kartın çizimi), chip(k, p, x, y) (kutuya konan kısa işareti çizip döndürür), dizilim (kutuda işaret aralığı) } */
  function kutuTahtasi(c, p, o) {
    const kg = o.kutular.map((q) => {
      const g = c.S('g', {}, p); kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      yazi(c, g, q.x + q.w / 2, q.y + 38, q.baslik, { size: 26, kalin: 700 });
      return { g, n: 0 };
    });
    let kartG = null;
    return {
      kg,
      async sec(i, k) {
        kartG = c.S('g', {}, p); kartG.style.opacity = 0;
        o.ciz(k, kartG);
        await belir(c, kartG, 350, 1);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kg[k.kutu], yer = o.konum ? o.konum(q, e.n) : [q.x + q.w / 2, q.y + 82 + e.n * (o.aralik || 52)]; e.n++;
        await belir(c, kartG, 250, 0); kartG.remove(); kartG = null;
        const ch = o.chip(k, p, yer[0], yer[1]);
        ch.style.opacity = 0; await belir(c, ch, 350, 1);
      },
    };
  }

  return {
    GRI, MOR, SIVI, BOYA, NM, DAMLA, KUBBE, kubbeH, virgul, sb, etiketSatiri, madeni, kubbeYol, para, minipara, beher, deneyTablosu, deneyMatrisi, karsilastirma,
    sorukarti, degiskenler, zincir, cekim, suMol, iyonsu, sabunMol, suKesiti, tekne, tabak, gol, olcumTablosu, kutuTahtasi,
  };
})();
