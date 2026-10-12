/* Konu D (Tales, Öklid ve Pisagor teoremleri) ortak çizim araçları (window.KIT_D). kit.js ve b-araclar.js'ten sonra, ders dosyasından önce yüklenir.
   Konu D'nin dersleri (D1–D7) bu dosyayı okuyup kullanır, değiştirmez. Noktalar [x, y] dizisidir (tahta 1000×562, y aşağı doğru büyür);
   açılar derece, ekranda saat yönü artıdır; uzunluk parametreleri "birim" (ders sayısı), piksele `olcek` ile çevrilir.
   Renkler: şekil mavi, benzer küçük üçgen ve p turuncu, paralel doğrular mor kesikli, kesenler gri, yükseklik h sarı, k ve b yeşil, hipotenüs a mavi.
   Hiçbir araç Math.random, setTimeout ya da CSS animasyonu kullanmaz; zamanlama c.tween / c.wait iledir.

   ARAÇLAR (c: ders bağlamı, p: üst SVG grubu)

   ucgenTaban(AB, AC, BC, B, olcek = 40) → [A, B, C]
       Üç kenar uzunluğundan (birim) ölçekli üçgen köşeleri (piksel): BC yatay, B solda, A yukarıda.

   kenarYazi(c, p, P, Q, metin, renk, o) → <text>
       P–Q kenarına, kenarın bir noktasına (t) yakın uzunluk yazısı. o: { t (0–1, 0,5), merkez (şeklin içinden bir nokta; yazı ondan uzağa konur),
       ic (true: tersine, merkeze doğru, yani şeklin içine), uzak (22), size (24) }. KIT_B.kenarEtiketi'nden farkı: t verilebilir, içeriye konabilir.

   ispatTahtasi(c, p, o) → { g, baslik, satirlar, ekle(ifade, gerekce), ac(satir, ms), soluklas(satir, ms), parla(satir, renk, ms), kaldir() }
       Adım–gerekçe ispat tahtası. Her adım tek <text> (tek renkli yazısı): ifade parlak, gerekçesi yanında soluk ve küçük.
       o: { x (satır başı, 380), y (ilk satırın taban çizgisi, 100), aralik (48), size (22), gerekceSize (19), bosluk (ifade ile gerekçe arası, 22),
            soluk (biten adımın saydamlığı, 0,55), verilen, istenen (string ya da parça dizisi; ikisi de verilirse "Verilen:" ve "İstenen:" satırları
            bx, by (30, 64) konumunda yazılır; baslik = [verilen yazısı, istenen yazısı]), baslikSize (26) }.
       ekle(ifade, gerekce) → satır { el, i, ifade[tspan], gerekce }; ifade string ya da KIT.renkli parçaları ([metin, renk] ya da metin); satır gizli eklenir.
       ac(satir, ms = 450) → Promise: satırı belirtir (etkin, parlak), daha önce görünen satırları soluklaştırır. soluklas(satir, ms) → Promise.
       parla(satir, renk = sarı, ms = 800) → Promise: ifadeyi kısa süre renklendirir. kaldir(): bütün tahtayı siler.

   paralelKesen(c, p, o) → { g, K, parca(i, j), parcaCiz(i, j, renk, w), parcaEtiket(i, j, metin, renk, o), paraleller, keseler, noktalar, adlar }
       Verilen sayıda paralel doğru ve onları kesen doğrular. o: { aci (paralellerin doğrultusu, 0 = yatay), paraleller: [{ nokta: [x, y], ad: 'd₃' }, …]
       (hepsi aynı aci ile; nokta doğru üstünde herhangi bir nokta), keseler: [{ nokta, aci, ad: 'd₁', harf: ['A', 'B', 'C'] (her paraleldeki kesişim noktasının adı),
       kay: [dx, dy] (harfin kaydırması) }, …], uzatma (kesişimlerin ötesinde doğru uzantısı, 36), harfSize (24) }.
       K[i][j]: i. kesenin j. paralelle kesişimi (piksel). parca(i, j): i. kesen üstünde K[i][j] ile K[i][j + 1] arası uzunluk (piksel).
       parcaCiz(i, j, renk, w = 8) → <line> (o parçayı kalın çizer). parcaEtiket(i, j, metin, renk, o) → <text> (parçanın dışına uzunluk yazısı;
       o: kenarYazi seçenekleri, merkez varsayılan olarak bütün kesişimlerin ortası). paraleller[j] = { hat, ad }, keseler[i] = { hat, ad },
       noktalar[i][j] = <circle>, adlar[i][j] = <text> ya da null. Paraleller mor kesikli, kesenler gri.

   oranCubuklari(c, p, o) → { g, cubuklar, bag, esit, esittir }
       İki (ya da daha çok) oranı alt alta hizalı çubuk olarak gösterir: her çubuk aynı uzunlukta, [a, b] oranına göre iki parçaya bölünür
       (sol a, sağ b); oranlar eşitse bölünme noktaları aynı dikeyde durur. o: { x, y (sol üst), w (çubuk uzunluğu, 360), h (40), aralik (çubuklar arası, 36),
       oranlar: [[a, b], [c, d]], renkler: [sol, sag] (turuncu, yeşil), etiket: ['5/10', '4/8'] (çubuğun solunda), metin (false: parçaların içine sayı yazma) }.
       cubuklar[k] = { g, sol, sag, solYazi, sagYazi, etiket, ayrac (bölünme noktasının x'i) }. bag: bölünme noktalarını bağlayan sarı kesikli dikey çizgi;
       esit: oranlar eşit mi (true/false); esittir: çubukların sağındaki sarı "=" yazısı (yalnızca oranlar eşitse oluşur, yoksa null).

   parcaCubuk(c, p, o) → { g, parcalar, renkle(liste, renk), x, w, y, h }
       n eşit parçaya bölünmüş çubuk (çubuk ölçeği: AB'yi beş eşit parçaya bölmek gibi). o: { x, y, w, h (34), n, renk (gri) }.
       renkle([0, 1], renk) → listedeki parçaların rengini değiştirir.

   menteseGrafik(c, p, V, a, b, o) → { g, mentese, grafik, ac(derece), kareler(), karsilastir() }
       V köşesinde, uzunlukları a ve b (birim) olan iki sabit kenar; aradaki açı değişir, üçüncü kenar c ona göre çizilir (KIT_B.mentese üzerine kuruludur;
       b-araclar.js yüklü olmalı). Yanında kenar karelerini karşılaştıran çubuk grafik: sol sütun a² (mavi) üstüne b² (yeşil) yığılmış, sağ sütun c² (turuncu);
       sarı kesikli çizgi a² + b² yüksekliğini c² sütununa taşır. o: { olcek (birim başına piksel, 30), yon (birinci kenarın doğrultusu, 0), aci (başlangıç, 90),
       etiket (false: açı yazısı yok), adlar (false: a, b, c yazıları yok), gx, gy (grafiğin sol alt köşesi), gw, gh (genişlik ve en büyük yükseklik, (a + b)² için),
       sayilar (true: sütunların içine kare değerleri yazılır) }.
       ac(derece) açıyı değiştirir. kareler() → [a², b², c²] (birim²). karsilastir() → -1 (c² < a² + b²), 0 (eşit), 1 (c² > a² + b²).
       grafik = { g, a2, b2, c2, ref }.

   dikUcgen(c, p, o) → { g, yuz, A, B, C, H, h, hat, ayak, dik, adlar, etiket }
       A'da dik açılı ABC üçgeni; BC yatay hipotenüs (a), AH ⊥ BC, H ∈ [BC]; |BH| = p, |HC| = k, |AH| = h = √(p·k). o: { B (sol alt köşe, [100, 470]), p, k (birim),
       olcek (40), etiket: { a, b, c, h, p, k } (hangi uzunluk yazılarının konacağı; değerler yazılacak metinler, örn. { p: '4', k: '9', h: 'h' }) }.
       hat = { a (mavi), b (yeşil, AC), c (turuncu, AB), h (sarı, AH) }; ayak = { p (turuncu, BH altında), k (yeşil, HC altında) }; dik = { A, H } dik açı işaretleri;
       adlar = { A, B, C, H } köşe harfleri; etiket = verilen uzunluk yazıları (a hipotenüsün altında, p ve k ayakların altında, h yüksekliğin yanında, b ve c dışta). */
window.KIT_D = (() => {
  'use strict';
  const K = window.KIT;
  const { RENK, uz, yon, ileri, ara, agirlik, rad, yazi, renkli, cizgi, koy, nokta, belir } = K;
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, MOR = RENK.dogru, SARI = RENK.merkez, GRI = '#9aa3bf';
  const par = K.par;
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const noktalar = (pts) => pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');

  /* ---- ucgenTaban ---- */
  function ucgenTaban(AB, AC, BC, B, olcek = 40) {
    const x = (AB * AB + BC * BC - AC * AC) / (2 * BC), h = Math.sqrt(Math.max(AB * AB - x * x, 0));
    return [[B[0] + x * olcek, B[1] - h * olcek], B, [B[0] + BC * olcek, B[1]]];
  }

  /* ---- kenarYazi ---- */
  function kenarYazi(c, p, P, Q, metin, renk, o = {}) {
    const t = o.t == null ? 0.5 : o.t, M = ara(P, Q, t), d = uz(P, Q) || 1, size = o.size || 24;
    let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
    if (o.merkez && (M[0] - o.merkez[0]) * nx + (M[1] - o.merkez[1]) * ny < 0) { nx = -nx; ny = -ny; }
    if (o.ic) { nx = -nx; ny = -ny; }
    const u = (o.uzak == null ? 22 : o.uzak) + Math.abs(nx) * String(metin).length * size * 0.28;
    return yazi(c, p, M[0] + nx * u, M[1] + ny * u + size * 0.33, metin, { size, kalin: 700, renk: renk || RENK.yazi });
  }

  /* ---- ispatTahtasi ---- */
  function ispatTahtasi(c, p, o = {}) {
    const x = o.x == null ? 380 : o.x, y0 = o.y == null ? 100 : o.y, aralik = o.aralik || 48;
    const size = o.size || 22, gsize = o.gerekceSize || 19, bosluk = o.bosluk == null ? 22 : o.bosluk, soluk = o.soluk == null ? 0.55 : o.soluk;
    const g = c.S('g', {}, p), satirlar = [];
    let baslik = null;
    if (o.verilen != null && o.istenen != null) {
      const bx = o.bx == null ? 30 : o.bx, by = o.by == null ? 64 : o.by, bs = o.baslikSize || 26;
      const parca = (ad, v) => [[ad, RENK.soluk], ...(Array.isArray(v) ? v : [v])];
      baslik = [
        renkli(c, g, bx, by, parca('Verilen: ', o.verilen), { hiza: 'start', size: bs, kalin: 700 }),
        renkli(c, g, bx, by + 44, parca('İstenen: ', o.istenen), { hiza: 'start', size: bs, kalin: 700 }),
      ];
    }
    function ekle(ifade, gerekce) {
      const i = satirlar.length;
      const t = yazi(c, g, x, y0 + i * aralik, '', { hiza: 'start', size, kalin: 700 });
      const ts = liste(ifade).map((q) => {
        const [m, r] = Array.isArray(q) ? q : [q, null], s = c.S('tspan', { text: m }, t);
        if (r) s.style.fill = r;
        return s;
      });
      const gs = gerekce ? c.S('tspan', { text: gerekce, dx: bosluk, 'font-size': gsize, 'font-weight': 400, style: 'fill:' + RENK.soluk }, t) : null;
      t.style.opacity = 0;
      const s = { el: t, i, ifade: ts, gerekce: gs, gorunur: false };
      satirlar.push(s);
      return s;
    }
    const ac = (s, ms = 450) => {
      const onceki = satirlar.filter((r) => r !== s && r.gorunur);
      s.gorunur = true;
      return par(belir(c, s.el, ms, 1), belir(c, onceki.map((r) => r.el), ms, soluk));
    };
    const soluklas = (s, ms = 350) => belir(c, s.el, ms, soluk);
    const parla = async (s, renk = SARI, ms = 800) => {
      const eski = s.ifade.map((t) => t.style.fill);
      s.ifade.forEach((t) => { t.style.fill = renk; });
      await c.wait(ms);
      s.ifade.forEach((t, i) => { t.style.fill = eski[i]; });
    };
    const kaldir = () => { g.remove(); };
    return { g, baslik, satirlar, ekle, ac, soluklas, parla, kaldir };
  }

  /* ---- paralelKesen ---- */
  function paralelKesen(c, p, o) {
    const a = rad(o.aci || 0), u = [Math.cos(a), Math.sin(a)], n = [-u[1], u[0]], uzat = o.uzatma == null ? 36 : o.uzatma, hs = o.harfSize || 24;
    const g = c.S('g', {}, p), par_ = o.paraleller, kes = o.keseler;
    const Kx = kes.map((k) => {
      const v = [Math.cos(rad(k.aci)), Math.sin(rad(k.aci))], vn = v[0] * n[0] + v[1] * n[1];
      return par_.map((q) => {
        const s = ((q.nokta[0] - k.nokta[0]) * n[0] + (q.nokta[1] - k.nokta[1]) * n[1]) / vn;
        return [k.nokta[0] + s * v[0], k.nokta[1] + s * v[1]];
      });
    });
    const paraleller = par_.map((q, j) => {
      const ts = Kx.map((row) => row[j][0] * u[0] + row[j][1] * u[1]), t0 = Math.min(...ts) - uzat, t1 = Math.max(...ts) + uzat, q0 = q.nokta[0] * u[0] + q.nokta[1] * u[1];
      const P = [q.nokta[0] + (t0 - q0) * u[0], q.nokta[1] + (t0 - q0) * u[1]], Q = [q.nokta[0] + (t1 - q0) * u[0], q.nokta[1] + (t1 - q0) * u[1]];
      const hat = cizgi(c, g, P, Q, MOR, 3.5, { 'stroke-dasharray': '10 8' });
      const ad = q.ad ? yazi(c, g, Q[0] + 6, Q[1] - 12, q.ad, { hiza: 'start', size: hs, kalin: 700, renk: MOR }) : null;
      return { hat, ad };
    });
    const keseler = kes.map((k, i) => {
      const v = [Math.cos(rad(k.aci)), Math.sin(rad(k.aci))], ts = Kx[i].map((q) => q[0] * v[0] + q[1] * v[1]), t0 = Math.min(...ts) - uzat, t1 = Math.max(...ts) + uzat, k0 = k.nokta[0] * v[0] + k.nokta[1] * v[1];
      const P = [k.nokta[0] + (t0 - k0) * v[0], k.nokta[1] + (t0 - k0) * v[1]], Q = [k.nokta[0] + (t1 - k0) * v[0], k.nokta[1] + (t1 - k0) * v[1]];
      const hat = cizgi(c, g, P, Q, GRI, 3.5);
      const son = ts[0] <= ts[ts.length - 1] ? Q : P, ad = k.ad ? yazi(c, g, son[0] + (son === Q ? 6 : -6), son[1] + (son === Q ? 30 : -14), k.ad, { size: hs, kalin: 700, renk: GRI }) : null;
      return { hat, ad };
    });
    const nok = Kx.map((row) => row.map((q) => nokta(c, g, q, RENK.yazi, 5)));
    const adlar = Kx.map((row, i) => row.map((q, j) => {
      const h = kes[i].harf && kes[i].harf[j]; if (!h) return null;
      const kay = kes[i].kay || [i === 0 ? -22 : 22, -12];
      return yazi(c, g, q[0] + kay[0], q[1] + kay[1] + hs * 0.33, h, { size: hs, kalin: 700 });
    }));
    const hepsi = Kx.flat(), orta = agirlik(hepsi);
    const parca = (i, j) => uz(Kx[i][j], Kx[i][j + 1]);
    const parcaCiz = (i, j, renk, w = 8) => cizgi(c, g, Kx[i][j], Kx[i][j + 1], renk, w);
    const parcaEtiket = (i, j, metin, renk, oo = {}) => kenarYazi(c, g, Kx[i][j], Kx[i][j + 1], metin, renk, Object.assign({ merkez: orta }, oo));
    return { g, K: Kx, parca, parcaCiz, parcaEtiket, paraleller, keseler, noktalar: nok, adlar };
  }

  /* ---- oranCubuklari ---- */
  function oranCubuklari(c, p, o) {
    const x = o.x, y = o.y, w = o.w || 360, h = o.h || 40, aralik = o.aralik == null ? 36 : o.aralik, renk = o.renkler || [TURUNCU, YESIL];
    const g = c.S('g', {}, p), cubuklar = [];
    o.oranlar.forEach(([a, b], k) => {
      const yy = y + k * (h + aralik), wl = (w * a) / (a + b), bg = c.S('g', {}, g);
      const sol = c.S('rect', { x, y: yy, width: wl, height: h, rx: 4, fill: renk[0], 'fill-opacity': 0.3, stroke: renk[0], 'stroke-width': 3 }, bg);
      const sag = c.S('rect', { x: x + wl, y: yy, width: w - wl, height: h, rx: 4, fill: renk[1], 'fill-opacity': 0.3, stroke: renk[1], 'stroke-width': 3 }, bg);
      const my = yy + h / 2 + 8;
      const solYazi = o.metin === false ? null : yazi(c, bg, x + wl / 2, my, String(a), { size: 24, kalin: 700, renk: renk[0] });
      const sagYazi = o.metin === false ? null : yazi(c, bg, x + wl + (w - wl) / 2, my, String(b), { size: 24, kalin: 700, renk: renk[1] });
      const etiket = o.etiket && o.etiket[k] ? yazi(c, bg, x - 16, my, o.etiket[k], { hiza: 'end', size: 26, kalin: 700 }) : null;
      cubuklar.push({ g: bg, sol, sag, solYazi, sagYazi, etiket, ayrac: x + wl });
    });
    const ilk = cubuklar[0], son = cubuklar[cubuklar.length - 1];
    const bag = cizgi(c, g, [ilk.ayrac, y - 14], [son.ayrac, y + (cubuklar.length - 1) * (h + aralik) + h + 14], SARI, 3, { 'stroke-dasharray': '8 6' });
    const esit = cubuklar.every((q) => Math.abs(q.ayrac - ilk.ayrac) < 0.6);
    const esittir = esit && cubuklar.length === 2 ? yazi(c, g, x + w + 30, y + h + aralik / 2 + 15, '=', { size: 40, kalin: 700, renk: SARI }) : null;
    return { g, cubuklar, bag, esit, esittir };
  }

  /* ---- parcaCubuk ---- */
  function parcaCubuk(c, p, o) {
    const x = o.x, y = o.y, w = o.w, h = o.h || 34, n = o.n, renk = o.renk || GRI, g = c.S('g', {}, p), parcalar = [];
    for (let i = 0; i < n; i++) parcalar.push(c.S('rect', { x: x + (i * w) / n, y, width: w / n, height: h, fill: renk, 'fill-opacity': 0.22, stroke: renk, 'stroke-width': 2.5 }, g));
    const renkle = (idler, r) => liste(idler).forEach((i) => { parcalar[i].setAttribute('fill', r); parcalar[i].setAttribute('stroke', r); });
    return { g, parcalar, renkle, x, y, w, h };
  }

  /* ---- menteseGrafik ---- */
  function menteseGrafik(c, p, V, a, b, o = {}) {
    const KB = window.KIT_B;
    if (!KB) throw new Error('menteseGrafik: KIT_B (b-araclar.js) yüklü değil');
    const s = o.olcek || 30, g = c.S('g', {}, p);
    const m = KB.mentese(c, g, V, a * s, b * s, { yon: o.yon || 0, aci: o.aci == null ? 90 : o.aci, renk1: MAVI, renk2: YESIL, renk3: TURUNCU, etiket: o.etiket, yayR: o.yayR });
    const gx = o.gx == null ? 600 : o.gx, gy = o.gy == null ? 480 : o.gy, gw = o.gw || 320, gh = o.gh || 300, birim = gh / ((a + b) * (a + b));
    const cg = c.S('g', {}, g), kw = gw * 0.34, x1 = gx + gw * 0.08, x2 = gx + gw * 0.58;
    cizgi(c, cg, [gx, gy], [gx + gw, gy], RENK.cizgi, 2.5);
    const rect = (x, renk) => c.S('rect', { x, width: kw, y: gy, height: 0, fill: renk, 'fill-opacity': 0.35, stroke: renk, 'stroke-width': 3 }, cg);
    const a2 = rect(x1, MAVI), b2 = rect(x1, YESIL), c2 = rect(x2, TURUNCU);
    const ref = cizgi(c, cg, [x1, gy], [x2 + kw, gy], SARI, 3, { 'stroke-dasharray': '8 6' });
    yazi(c, cg, x1 + kw / 2, gy + 34, 'a² + b²', { size: 24, kalin: 700 });
    yazi(c, cg, x2 + kw / 2, gy + 34, 'c²', { size: 24, kalin: 700, renk: TURUNCU });
    const sayi = o.sayilar ? [yazi(c, cg, x1 + kw / 2, gy, '', { size: 22, kalin: 700, renk: MAVI }), yazi(c, cg, x1 + kw / 2, gy, '', { size: 22, kalin: 700, renk: YESIL }), yazi(c, cg, x2 + kw / 2, gy, '', { size: 22, kalin: 700, renk: TURUNCU })] : null;
    const adlar = o.adlar === false ? null : [yazi(c, g, 0, 0, 'a', { size: 26, kalin: 700, renk: MAVI }), yazi(c, g, 0, 0, 'b', { size: 26, kalin: 700, renk: YESIL }), yazi(c, g, 0, 0, 'c', { size: 26, kalin: 700, renk: TURUNCU })];
    const kareler = () => [a * a, b * b, Math.pow(m.kenar3() / s, 2)];
    const yerlestir = (t, Pa, Pb, M) => {
      const d = uz(Pa, Pb) || 1; let nx = -(Pb[1] - Pa[1]) / d, ny = (Pb[0] - Pa[0]) / d;
      const mid = ara(Pa, Pb, 0.5);
      if ((mid[0] - M[0]) * nx + (mid[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; }
      t.setAttribute('x', mid[0] + nx * 22); t.setAttribute('y', mid[1] + ny * 22 + 9);
    };
    const ciz = () => {
      const [v, P1, P2] = m.uc(), [k1, k2, k3] = kareler();
      const set = (r, yUst, hh) => { r.setAttribute('y', yUst); r.setAttribute('height', Math.max(hh, 0)); };
      set(a2, gy - k1 * birim, k1 * birim); set(b2, gy - (k1 + k2) * birim, k2 * birim); set(c2, gy - k3 * birim, k3 * birim);
      const yr = gy - (k1 + k2) * birim; koy(ref, [x1, yr], [x2 + kw, yr]);
      if (sayi) {
        [[sayi[0], gy - (k1 * birim) / 2, k1], [sayi[1], gy - (k1 + k2 / 2) * birim, k2], [sayi[2], gy - (k3 * birim) / 2, k3]].forEach(([t, yy, val]) => { t.setAttribute('y', yy + 8); t.textContent = String(Math.round(val * 10) / 10).replace('.', ','); });
      }
      if (adlar) { const M = agirlik([v, P1, P2]); yerlestir(adlar[0], v, P1, M); yerlestir(adlar[1], v, P2, M); yerlestir(adlar[2], P1, P2, M); }
    };
    ciz();
    const ac = (d) => { m.ac(d); ciz(); };
    const karsilastir = () => { const [k1, k2, k3] = kareler(), f = k3 - (k1 + k2); return Math.abs(f) < 0.05 ? 0 : f > 0 ? 1 : -1; };
    return { g, mentese: m, ac, kareler, karsilastir, grafik: { g: cg, a2, b2, c2, ref } };
  }

  /* ---- dikUcgen ---- */
  function dikUcgen(c, p, o = {}) {
    const s = o.olcek || 40, pp = o.p, kk = o.k, h = Math.sqrt(pp * kk), B = o.B || [100, 470], et = o.etiket || {};
    const A = [B[0] + pp * s, B[1] - h * s], C = [B[0] + (pp + kk) * s, B[1]], H = [A[0], B[1]], g = c.S('g', {}, p);
    const M = agirlik([A, B, C]);
    const yuz = c.S('polygon', { points: noktalar([A, B, C]), fill: MAVI, 'fill-opacity': 0.1, stroke: 'none' }, g);
    const hat = { c: cizgi(c, g, A, B, TURUNCU, 4.5), b: cizgi(c, g, A, C, YESIL, 4.5), a: cizgi(c, g, B, C, MAVI, 4.5), h: cizgi(c, g, A, H, SARI, 4.5) };
    const dik = { A: K.aciYayi(c, g, A, B, C, RENK.cizgi, 34, { dik: true }), H: K.aciYayi(c, g, H, A, B, RENK.cizgi, 30, { dik: true }) };
    const ay = 14, ayak = { p: cizgi(c, g, [B[0], B[1] + ay], [H[0], H[1] + ay], TURUNCU, 5), k: cizgi(c, g, [H[0], H[1] + ay], [C[0], C[1] + ay], YESIL, 5) };
    const adlar = {
      A: yazi(c, g, A[0] + 4, A[1] - 16, 'A', { size: 26, kalin: 700 }), B: yazi(c, g, B[0] - 22, B[1] + 32, 'B', { size: 26, kalin: 700 }),
      C: yazi(c, g, C[0] + 22, C[1] + 32, 'C', { size: 26, kalin: 700 }), H: yazi(c, g, H[0] + 20, H[1] + 36, 'H', { size: 26, kalin: 700 }),
    };
    const etiket = {};
    if (et.c != null) etiket.c = kenarYazi(c, g, A, B, et.c, TURUNCU, { merkez: M, size: 26 });
    if (et.b != null) etiket.b = kenarYazi(c, g, A, C, et.b, YESIL, { merkez: M, size: 26 });
    if (et.h != null) etiket.h = yazi(c, g, A[0] + 22, (A[1] + H[1]) / 2 + 9, et.h, { hiza: 'start', size: 26, kalin: 700, renk: SARI });
    if (et.p != null) etiket.p = yazi(c, g, (B[0] + H[0]) / 2, B[1] + 52, et.p, { size: 26, kalin: 700, renk: TURUNCU });
    if (et.k != null) etiket.k = yazi(c, g, (H[0] + C[0]) / 2, B[1] + 52, et.k, { size: 26, kalin: 700, renk: YESIL });
    if (et.a != null) etiket.a = yazi(c, g, (B[0] + C[0]) / 2, B[1] + 88, et.a, { size: 26, kalin: 700, renk: MAVI });
    return { g, yuz, A, B, C, H, h, hat, ayak, dik, adlar, etiket };
  }

  return { GRI, ucgenTaban, kenarYazi, ispatTahtasi, paralelKesen, oranCubuklari, parcaCubuk, menteseGrafik, dikUcgen };
})();
