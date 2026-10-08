/* Konu I (Buhar basıncı) çizim araçları: window.KIT_I. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Bu konuda yük çizilmez; renk yalnızca çekim içindir (yeşil çizgi).
   Mavi ve kırmızı kullanılmaz (eksi yük ve itme için ayrılmıştır): buharlaşma oku yukarı yönlü koyu gri,
   yoğuşma oku aşağı yönlü açık gri çizilir. Cıva koyu gri, moleküller nötr gri, sıvılar nötr açık tonlardadır.
   Oklar ve molekül sayıları şematiktir; cıva seviyeleri farkı yalnızca okunan değerle (mmHg) orantılıdır.
   Araçlar:
     kapliU(c, p, o)         kapak ve U borulu kap: sıvı, buhar molekülleri, cıva farkı, okunan değer kutusu
     akis(c, u, o)           sıvı yüzeyinde yukarı (buharlaşma) ve aşağı (yoğuşma) oklar
     asama(c, p, o)          dört aşamalı numaralı şerit
     cekim(c, p, o)          sıvı kesiti: nötr moleküller, aralarında yeşil çekim çizgileri, yüzeyden ayrılan moleküller
     yuzey(c, p, o)          sıvı yüzeyi: ayrılan moleküller yukarı oklarla
     sorukarti(c, p, o)      soru kartı ve altına düşen iki etiket
     degiskenler(c, p, o)    üç sütunlu çerçeve (Bağımlı · Bağımsız · Kontrol)
     deneyTablosu(c, p, o)   satır ekleyen deney tablosu
     cubuklar(c, p, o)       ortak ölçekli yatay çubuklar
     kutuTahtasi(c, p, o)    iki kutulu sınıflandırma tahtası (kart başına seçim için)
     kureModeli(c, p, ad, x, y, k) H₂O, CH₄, CO₂ için düz gri küre modeli
     dolas(c)                moleküllerin gezinmesi için zaman döngüsü (c.tween ile) */
window.KIT_I = (() => {
  'use strict';
  const { RENK, ileri, rastgele, yazi, cizgi, koy, kutu, gizle, belir, par, ok } = window.KIT;
  const { ease } = Ders;

  /* ---- renkler ---- */
  const GRI = { koyu: '#8a93ad', acik: '#e3e7f3', molekul: '#c9cfe0', cam: '#6b78b0', ic: '#0c1226', civa: '#98a0ba', tahta: '#10162b' };
  const SIVI = { su: '#b8c0d8', benzen: '#d9d2b0', alkol: '#cdbfd8' };
  const virgul = (n) => String(n).replace('.', ',');
  const sinir = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---- ölçüler (kap yerel koordinatı: sol alt köşe (0,0); y yukarı doğru eksi) ---- */
  const KAP = { standart: { kucuk: [150, 190], buyuk: [190, 250] }, genis: { kucuk: [230, 135], buyuk: [250, 170] } };
  const HAC = 10200;                                   // V sıvının tabandaki alan × yükseklik değeri (şematik)
  const UX = 290, UA = 52, UR = 26, UY0 = -164, UYB = 8, YORTA = -80, DMAX = 112, MMHG = DMAX / 183;
  /* Kitaptaki dört değer (mmHg). Başka sıcaklıkta değer uydurulmaz. */
  const DEGER = { 'su-25': 23.8, 'su-40': 55.3, 'benzen-25': 95.3, 'benzen-40': 183 };

  /* ---- yazı yardımcıları ---- */
  /* Sayı + birim tek öğe olarak okunur: ('25', '°C') → "25 °C". */
  const sb = (c, p, x, y, sayi, birim, o = {}) => {
    const t = yazi(c, p, x, y, '', o);
    c.S('tspan', { text: sayi }, t);
    if (birim) c.S('tspan', { text: birim, dx: o.dx == null ? 5 : o.dx, 'font-size': o.bsize || Math.max(18, Math.round((o.size || 26) * 0.72)), style: 'fill:' + (o.brenk || RENK.soluk) }, t);
    return t;
  };
  /* Aralıklı simge dizisi tek öğe olarak okunur: ['Vb', '=', 'Vy'] → "Vb = Vy". */
  const dizi = (c, p, x, y, parcalar, o = {}) => {
    const t = yazi(c, p, x, y, '', o);
    parcalar.forEach((q, i) => {
      const [m, r] = Array.isArray(q) ? q : [q, null];
      const ts = c.S('tspan', { text: m, dx: i ? (o.dx == null ? 9 : o.dx) : 0 }, t);
      if (r) ts.style.fill = r;
    });
    return t;
  };
  const tri = (u, L) => { const m = ((u % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };

  /* Zaman döngüsü: moleküller c.tween ile gezinir. ekle(nesne): nesne.zaman(T) her karede çağrılır. */
  function dolas(c) {
    const liste = []; let T = 0;
    (async () => {
      try {
        while (c.alive()) {
          const T0 = T;
          await c.tween(2000, (e) => { T = T0 + 2 * e; liste.forEach((n) => n.zaman(T)); }, ease.linear);
          T = T0 + 2;
        }
      } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; }
    })();
    return { ekle(n) { liste.push(n); n.zaman(T); return n; }, kaldir(n) { const i = liste.indexOf(n); if (i >= 0) liste.splice(i, 1); }, get T() { return T; } };
  }

  /* ---- buhar molekülleri: dikdörtgen içinde sekerek gezinir ----
     o: { n (havuz), r, tohum, carpma (çeperlere çarpma izi) } ; ayarla(dikdortgen, adet) ; zaman(T) */
  function alan(c, p, o = {}) {
    const N = o.n || 56, r = o.r || 5, rnd = rastgele(o.tohum || 3);
    const g = c.S('g', {}, p), gi = c.S('g', {}, g), gm = c.S('g', {}, g), gt = c.S('g', {}, g);
    const M = [];
    for (let i = 0; i < N; i++) {
      const m = { u0: rnd(), v0: rnd(), vu: (0.3 + rnd() * 0.45) * (rnd() < 0.5 ? -1 : 1), vv: (0.3 + rnd() * 0.45) * (rnd() < 0.5 ? -1 : 1) };
      m.iz = cizgi(c, gi, [0, 0], [0, 0], GRI.molekul, 2.5, { 'stroke-opacity': 0.4 });
      m.d = c.S('circle', { r, fill: GRI.molekul }, gm);
      m.t = cizgi(c, gt, [0, 0], [0, 0], RENK.vurgu, 4);
      m.t.style.opacity = 0; m.d.style.opacity = 0; m.iz.style.opacity = 0;
      M.push(m);
    }
    let R = { x: 0, y: 0, w: 100, h: 100 }, adet = 0, T = 0, tik = !!o.carpma;
    const konum = (m, t) => [R.x + r + tri(m.u0 + m.vu * t, 1) * (R.w - 2 * r), R.y + r + tri(m.v0 + m.vv * t, 1) * (R.h - 2 * r)];
    const zaman = (t) => {
      T = t;
      M.forEach((m, i) => {
        const a = sinir(adet - i, 0, 1);
        m.d.style.opacity = a; m.iz.style.opacity = a;
        if (a <= 0) { m.t.style.opacity = 0; return; }
        const P = konum(m, t), Q = konum(m, t - 0.22);
        m.d.setAttribute('cx', P[0]); m.d.setAttribute('cy', P[1]); koy(m.iz, Q, P);
        if (!tik) { m.t.style.opacity = 0; return; }
        const u = tri(m.u0 + m.vu * t, 1), v = tri(m.v0 + m.vv * t, 1), dl = u * (R.w - 2 * r), dr = (1 - u) * (R.w - 2 * r), dt = v * (R.h - 2 * r);
        const en = Math.min(dl, dr, dt);
        if (en > 9) { m.t.style.opacity = 0; return; }
        if (en === dt) koy(m.t, [P[0] - 9, R.y - 3], [P[0] + 9, R.y - 3]);
        else { const X = en === dl ? R.x - 3 : R.x + R.w + 3; koy(m.t, [X, P[1] - 9], [X, P[1] + 9]); }
        m.t.style.opacity = a * (1 - en / 9);
      });
    };
    return {
      g, zaman,
      ayarla(dik, n) { R = dik; adet = n; zaman(T); },
      carpma(b) { tik = b; zaman(T); },
    };
  }

  /* ---- kapak ve U borulu kap ----
     o: { x, y (kap tabanının sol alt köşesi, tahta koordinatı), k (ölçek), sivi: 'su'|'benzen'|'alkol', miktar: 1|2,
          bicim: 'standart'|'genis', hacim: 'kucuk'|'buyuk', kapak: 1 (kapalı) | 0 (açık), mmHg (cıva farkı değeri),
          yog (buhar yoğunluğu), sev (sıvı seviyesi çarpanı, 1), boru: false ise yalnızca kap, tohum, carpma }
     Dönen: { g, gy, cur, st, X, Y, git(yeni, ms), okunan(mmHg|null), kacis(a), kanca[], zaman(T) }. */
  function kapliU(c, p, o = {}) {
    const k = o.k || 1, OX = o.x == null ? 16 : o.x, OY = o.y == null ? 482 : o.y, boru = o.boru !== false;
    const st = Object.assign({ sivi: 'su', miktar: 1, bicim: 'standart', hacim: 'kucuk', kapak: 1, mmHg: 0, yog: 0, sev: 1, kac: 0 }, o);
    const hedef = (s) => {
      const [W, H] = KAP[s.bicim][s.hacim];
      return { W, H, hl: Math.min((HAC * s.miktar) / W, H - 56) * s.sev, kapak: s.kapak, d: s.mmHg * MMHG, yog: s.yog, kac: s.kac };
    };
    const cur = hedef(st);
    const kok = c.S('g', {}, p), g = c.S('g', { transform: `translate(${OX},${OY}) scale(${k})` }, kok), gy = c.S('g', {}, kok);
    const X = (x) => OX + k * x, Y = (y) => OY + k * y;
    const camYol = (d, col, w) => c.S('path', { d, fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt' }, g);

    // Kabın çeperleri.
    const duvar = c.S('path', { fill: 'none', stroke: GRI.cam, 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    // Boru ve U borusu.
    let boruD1 = null, boruD2 = null, civa = null, menL = null, menR = null, olcu = null;
    if (boru) {
      boruD1 = camYol('M0,0', GRI.cam, 26); boruD2 = camYol('M0,0', GRI.ic, 18);
      const uD = `M${UX},${UY0} L${UX},${UYB - UR} A${UR} ${UR} 0 0 0 ${UX + UA},${UYB - UR} L${UX + UA},${UY0}`;
      camYol(uD, GRI.cam, 26); camYol(uD, GRI.ic, 18);
      civa = c.S('path', { fill: 'none', stroke: GRI.civa, 'stroke-width': 18, 'stroke-linejoin': 'round' }, g);
      menL = cizgi(c, g, [0, 0], [0, 0], GRI.acik, 3); menR = cizgi(c, g, [0, 0], [0, 0], GRI.acik, 3);
      olcu = c.S('g', {}, g);
    }
    // Sıvı.
    const sivi = c.S('rect', { rx: 4, fill: SIVI[st.sivi], 'fill-opacity': 0.55 }, g);
    const yuz = cizgi(c, g, [0, 0], [0, 0], SIVI[st.sivi], 3.5);
    const bu = alan(c, g, { n: 56, tohum: o.tohum || 3, carpma: o.carpma });
    // Açık kaptan kaçan moleküller.
    const kacG = c.S('g', {}, g), kacM = [];
    for (let i = 0; i < 7; i++) kacM.push({ d: c.S('circle', { r: 5, fill: GRI.molekul }, kacG), f: (i * 0.618) % 1, fx: (i * 0.37) % 1 });
    kacG.style.opacity = 0;
    // Kapak.
    const kapak = c.S('g', {}, g), kapakR = c.S('rect', { x: -9, y: 0, height: 16, rx: 6, fill: '#aab3d1' }, kapak);
    // Aşağıdaki kancalar (oklar, işaretli moleküller) her çizimde çağrılır.
    const kanca = [];

    // Okunan değer kutusu (ölçeklenmez; yazı punto kaybetmez).
    let oku = null;
    if (boru) {
      const cx = X(UX + UA + 66) + 64, cy = Y(YORTA);
      oku = c.S('g', {}, gy);
      kutu(c, oku, cx - 64, cy - 33, 128, 66, { rx: 12 });
      oku.say = sb(c, oku, cx, cy + 11, '', 'mmHg', { size: 32, kalin: 700, bsize: 20 });
      oku.say.firstChild.textContent = '';
      oku.style.opacity = 0;
    }

    const ciz = () => {
      const { W, H, hl, kapak: kp, d, yog, kac } = cur;
      duvar.setAttribute('d', `M0,${-H} L0,0 L${W},0 L${W},${-H}`);
      sivi.setAttribute('x', 3); sivi.setAttribute('y', -hl); sivi.setAttribute('width', W - 6); sivi.setAttribute('height', Math.max(0, hl - 3));
      sivi.style.opacity = hl > 1.5 ? 1 : 0;
      koy(yuz, [3, -hl], [W - 3, -hl]); yuz.style.opacity = hl > 1.5 ? 1 : 0;
      kapakR.setAttribute('width', W + 18); kapak.setAttribute('transform', `translate(0,${-H - 12 - (1 - kp) * 80})`); kapak.style.opacity = kp;
      if (boru) {
        const py = -(H - 26), xp = W + 22, bd = `M${W - 3},${py} L${xp},${py} L${xp},${UY0} L${UX},${UY0} L${UX},${UY0 + 16}`;
        boruD1.setAttribute('d', bd); boruD2.setAttribute('d', bd);
        const yL = YORTA + d / 2, yR = YORTA - d / 2;
        civa.setAttribute('d', `M${UX},${yL} L${UX},${UYB - UR} A${UR} ${UR} 0 0 0 ${UX + UA},${UYB - UR} L${UX + UA},${yR}`);
        koy(menL, [UX - 9, yL], [UX + 9, yL]); koy(menR, [UX + UA - 9, yR], [UX + UA + 9, yR]);
        olcu.textContent = '';
        if (d > 3) {
          const xo = UX + UA + 38;
          cizgi(c, olcu, [UX + 14, yL], [xo + 8, yL], GRI.acik, 2, { 'stroke-dasharray': '4 5', 'stroke-opacity': 0.8 });
          cizgi(c, olcu, [UX + UA + 14, yR], [xo + 8, yR], GRI.acik, 2, { 'stroke-dasharray': '4 5', 'stroke-opacity': 0.8 });
          if (d > 16) { ok(c, olcu, [xo, (yL + yR) / 2 - 3], [xo, yR + 1], GRI.acik, 3); ok(c, olcu, [xo, (yL + yR) / 2 + 3], [xo, yL - 1], GRI.acik, 3); }
          else cizgi(c, olcu, [xo, yR], [xo, yL], GRI.acik, 3);
        }
      }
      const dik = { x: 7, y: -H + 11, w: W - 14, h: Math.max(10, H - 11 - hl - 6) };
      bu.ayarla(dik, (yog * dik.w * dik.h) / 10000);
      kacG.style.opacity = kac;
      kanca.forEach((f) => f(cur));
    };
    const kacZaman = (t) => {
      const { W, H, hl } = cur;
      kacM.forEach((m) => {
        const s = (t * 0.2 + m.f) % 1, yy = -hl - 8 - s * (H + 110 - hl);
        m.d.setAttribute('cx', 12 + m.fx * (W - 24) + 16 * Math.sin(t * 1.3 + m.f * 9)); m.d.setAttribute('cy', yy);
        m.d.style.opacity = s < 0.12 ? s / 0.12 : s > 0.8 ? (1 - s) / 0.2 : 1;
      });
    };
    ciz();

    let surum = 0;
    const u = {
      g, gy, cur, st, X, Y, kanca, oku,
      zaman(t) { bu.zaman(t); kacZaman(t); u.ek.forEach((f) => f(t)); },
      ek: [],
      carpma(b) { bu.carpma(b); },
      git(yeni, ms = 0) {
        Object.assign(st, yeni);
        if (yeni.sivi) { sivi.setAttribute('fill', SIVI[st.sivi]); yuz.setAttribute('stroke', SIVI[st.sivi]); }
        const A = Object.assign({}, cur), B = hedef(st);
        if (!ms) { Object.assign(cur, B); ciz(); return Promise.resolve(); }
        const my = ++surum;
        return c.tween(ms, (e) => { if (my !== surum) return; for (const key in B) cur[key] = A[key] + (B[key] - A[key]) * e; ciz(); });
      },
      /* Okunan değer kutusu: sayı verilirse gösterir, null ise gizler. */
      okunan(v) {
        if (!oku) return;
        if (v == null) { oku.style.opacity = 0; return; }
        oku.say.firstChild.textContent = virgul(v); oku.style.opacity = 1;
      },
      kacis(a) { return u.git({ kac: a }, 400); },
      /* Sıvı yüzeyinin yerel y'si. */
      yuzeyY: () => -cur.hl,
      kok,
    };
    return u;
  }

  /* ---- yüzey okları: yukarı (buharlaşma, koyu gri) ve aşağı (yoğuşma, açık gri) ----
     Üçer ok havuzu; ayarla(yukari, asagi, ms) görünenleri belirler. */
  function akis(c, u, o = {}) {
    const g = c.S('g', {}, u.g), YUK = [], ASA = [];
    const boy = o.boy || 44;
    for (let j = 0; j < 3; j++) { YUK.push(ok(c, g, [0, 0], [0, -boy], GRI.koyu, 4)); ASA.push(ok(c, g, [0, 0], [0, boy], GRI.acik, 4)); }
    const hepsi = [...YUK, ...ASA];
    hepsi.forEach((a) => { a.g.style.opacity = 0; });
    let sayi = [0, 0];
    const yerle = () => {
      const { W, hl } = u.cur, ys = -hl;
      YUK.forEach((a, j) => { const x = W * (0.2 + 0.25 * j); a.ciz([x, ys - 6], [x, ys - 6 - boy]); });
      ASA.forEach((a, j) => { const x = W * (0.325 + 0.25 * j); a.ciz([x, ys - 12 - boy - 4], [x, ys - 12]); });
    };
    u.kanca.push(yerle); yerle();
    return {
      g,
      ayarla(yukari, asagi, ms = 400) {
        const eski = sayi; sayi = [yukari, asagi];
        if (!ms) { YUK.forEach((a, j) => { a.g.style.opacity = j < yukari ? 1 : 0; }); ASA.forEach((a, j) => { a.g.style.opacity = j < asagi ? 1 : 0; }); return Promise.resolve(); }
        const isler = [];
        YUK.forEach((a, j) => { const h = j < yukari ? 1 : 0; if ((j < eski[0] ? 1 : 0) !== h) isler.push(belir(c, a.g, ms, h)); });
        ASA.forEach((a, j) => { const h = j < asagi ? 1 : 0; if ((j < eski[1] ? 1 : 0) !== h) isler.push(belir(c, a.g, ms, h)); });
        return Promise.all(isler);
      },
      yukari: YUK, asagi: ASA,
    };
  }

  /* ---- dört aşamalı şerit: yalnızca numaralar; etkin aşama büyük ---- */
  function asama(c, p, o = {}) {
    const g = c.S('g', {}, p), x0 = o.x || 640, y0 = o.y || 70, ara = o.ara || 78;
    const daire = [], yazilar = [];
    cizgi(c, g, [x0, y0], [x0 + 3 * ara, y0], GRI.cam, 3);
    for (let i = 0; i < 4; i++) {
      daire.push(c.S('circle', { cx: x0 + i * ara, cy: y0, r: 20, fill: GRI.tahta, stroke: GRI.cam, 'stroke-width': 3 }, g));
      yazilar.push(yazi(c, g, x0 + i * ara, y0 + 8, String(i + 1), { size: 24, kalin: 700, renk: RENK.soluk }));
    }
    const ayarla = (n) => {
      daire.forEach((d, i) => {
        const e = i + 1 === n;
        d.setAttribute('r', e ? 27 : 20); d.setAttribute('stroke', e ? RENK.vurgu : GRI.cam); d.setAttribute('stroke-width', e ? 4 : 3);
        d.setAttribute('fill', e ? RENK.vurgu : GRI.tahta);
        yazilar[i].style.fill = e ? GRI.tahta : RENK.soluk; yazilar[i].setAttribute('font-size', e ? 30 : 24);
      });
    };
    ayarla(o.n || 1);
    return { g, ayarla };
  }


  /* ---- işaretli iki molekül: biri sıvıdan çıkıp buharda dolaşır, öbürü buhardan sıvıya iner (sürekli döngü) ----
     o: { dolas (dolas() nesnesi), halka (sarı halka, varsayılan true) } ; goster(ms) */
  function isaretli(c, u, o = {}) {
    const g = c.S('g', {}, u.g), P = 7;
    const mk = () => {
      const e = c.S('g', {}, g);
      c.S('circle', { r: 13, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, e);
      c.S('circle', { r: 7, fill: GRI.acik }, e);
      return e;
    };
    const A = mk(), B = mk();
    const ek = (t) => {
      const { W, H, hl } = u.cur, ys = -hl, ust = -H + 24, alt = ys - 16;
      const sa = (t % P) / P, sb2 = ((t + 2.6) % P) / P;
      const fade = (s) => (s < 0.1 ? s / 0.1 : s > 0.9 ? (1 - s) / 0.1 : 1);
      A.setAttribute('transform', `translate(${W * 0.3 + 20 * Math.sin(sa * 9.4)},${alt - sa * (alt - ust)})`); A.style.opacity = fade(sa);
      B.setAttribute('transform', `translate(${W * 0.7 + 20 * Math.sin(sb2 * 7.5 + 1)},${ust + sb2 * (alt - ust)})`); B.style.opacity = fade(sb2);
    };
    u.ek.push(ek); g.style.opacity = 0;
    return { g, goster: (ms = 500) => belir(c, g, ms, 1), gizle: (ms = 400) => belir(c, g, ms, 0) };
  }

  /* ---- sıvı kesiti ----
     o: { x, y, w, h, kalin (çekim çizgisi kalınlığı), iz (hareket izi uzunluğu), ayrilan (yüzeyden ayrılan molekül sayısı), tohum, cerceve }
     ayarla({ kalin, iz, ayrilan }, ms) */
  function cekim(c, p, o) {
    const g = c.S('g', {}, p), rnd = rastgele(o.tohum || 5);
    if (o.cerceve !== false) kutu(c, g, o.x, o.y, o.w, o.h, { rx: 14 });
    const dx = (o.w - 84) / 5, dy = 50, x0 = o.x + 42, y0 = o.y + o.h - 38 - 3 * dy, ysur = y0 - 32;
    const P = [];
    for (let r = 0; r < 4; r++) {
      const n = r % 2 ? 5 : 6;
      for (let q = 0; q < n; q++) P.push({ r, q, x: x0 + q * dx + (r % 2 ? dx / 2 : 0) + (rnd() - 0.5) * 8, y: y0 + r * dy + (rnd() - 0.5) * 8, a: rnd() * 6.28 });
    }
    cizgi(c, g, [o.x + 10, ysur], [o.x + o.w - 10, ysur], SIVI[o.sivi || 'su'] || GRI.molekul, 3, { 'stroke-opacity': 0.8 });
    const gc = c.S('g', {}, g), gi = c.S('g', {}, g), gm = c.S('g', {}, g), ga = c.S('g', {}, g);
    const hatlar = [];
    P.forEach((a) => P.forEach((b) => {
      const komsu = (b.r === a.r && b.q === a.q + 1) || (b.r === a.r + 1 && (a.r % 2 ? (b.q === a.q || b.q === a.q + 1) : (b.q === a.q - 1 || b.q === a.q)));
      if (komsu) hatlar.push(cizgi(c, gc, [a.x, a.y], [b.x, b.y], RENK.cekme, o.kalin || 3.5, { 'stroke-opacity': 0.9 }));
    }));
    const izler = P.map((a) => cizgi(c, gi, [a.x, a.y], [a.x, a.y], GRI.molekul, 3, { 'stroke-opacity': 0.55 }));
    P.forEach((a) => c.S('circle', { cx: a.x, cy: a.y, r: 15, fill: GRI.molekul }, gm));
    const AY = [];
    for (let i = 0; i < 7; i++) {
      const x = o.x + (o.w / 8) * (i + 1), y = ysur - 26 - ((i * 7) % 3) * 8, e = c.S('g', {}, ga);
      c.S('circle', { cx: x, cy: y, r: 11, fill: GRI.molekul }, e);
      ok(c, e, [x, y - 16], [x, y - 44], GRI.koyu, 3.5);
      e.style.opacity = 0; AY.push(e);
    }
    const cur = { kalin: o.kalin || 3.5, iz: o.iz || 8, ayrilan: o.ayrilan || 0 };
    const ciz = () => {
      hatlar.forEach((h) => h.setAttribute('stroke-width', cur.kalin));
      P.forEach((a, i) => { koy(izler[i], [a.x, a.y], [a.x + cur.iz * Math.cos(a.a), a.y + cur.iz * Math.sin(a.a)]); });
      AY.forEach((e, i) => { e.style.opacity = sinir(cur.ayrilan - i, 0, 1); });
    };
    ciz();
    return {
      g, ysur,
      ayarla(yeni, ms = 0) {
        const A = Object.assign({}, cur), B = Object.assign({}, cur, yeni);
        if (!ms) { Object.assign(cur, B); ciz(); return Promise.resolve(); }
        return c.tween(ms, (e) => { for (const key in B) cur[key] = A[key] + (B[key] - A[key]) * e; ciz(); });
      },
    };
  }

  /* ---- sıvı yüzeyi: ayrılan moleküller yukarı oklarla (buharlaşma) ---- */
  function yuzey(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 360, H = o.h || 110;
    c.S('rect', { x: o.x, y: o.y, width: W, height: H, rx: 8, fill: SIVI[o.sivi || 'su'], 'fill-opacity': 0.45 }, g);
    cizgi(c, g, [o.x, o.y], [o.x + W, o.y], SIVI[o.sivi || 'su'], 4);
    const rnd = rastgele(o.tohum || 9);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) c.S('circle', { cx: o.x + 32 + i * ((W - 64) / 5) + (j ? 20 : 0) - 10, cy: o.y + 32 + j * 44 + (rnd() - 0.5) * 6, r: 14, fill: GRI.molekul }, g);
    const AY = [];
    for (let i = 0; i < 6; i++) {
      const x = o.x + (W / 7) * (i + 1), e = c.S('g', {}, g);
      c.S('circle', { cx: x, cy: o.y - 88, r: 12, fill: GRI.molekul }, e);
      ok(c, e, [x, o.y - 8], [x, o.y - 64], GRI.koyu, 4);
      e.style.opacity = 0; AY.push(e);
    }
    let n = 0;
    return {
      g, AY,
      ayarla(yeni, ms = 400) {
        const eski = n; n = yeni;
        return Promise.all(AY.map((e, i) => { const h = i < n ? 1 : 0; return (i < eski ? 1 : 0) !== h ? belir(c, e, ms, h) : null; }).filter(Boolean));
      },
    };
  }

  /* ---- soru kartı ve altına düşen iki etiket ----
     o: { x, y, w, h, satirlar: ['…'], size } ; etiket(i, ad, deger) ; yer: [i] → etiket merkezi */
  function sorukarti(c, p, o) {
    const g = c.S('g', {}, p), size = o.size || 28;
    kutu(c, g, o.x, o.y, o.w, o.h, { rx: 16 });
    const n = o.satirlar.length;
    o.satirlar.forEach((s, i) => yazi(c, g, o.x + o.w / 2, o.y + o.h / 2 + (i - (n - 1) / 2) * (size + 10) + size * 0.35, s, { size, kalin: 600 }));
    const et = [0, 1].map((i) => {
      const t = yazi(c, g, o.x + o.w * (i ? 0.75 : 0.25), o.y + o.h + 44, '', { size: 24, kalin: 600 });
      t.style.opacity = 0; return t;
    });
    return {
      g, et,
      etiket(i, ad, deger, ms = 450) {
        et[i].textContent = '';
        c.S('tspan', { text: ad + ': ', style: 'fill:' + RENK.soluk }, et[i]);
        c.S('tspan', { text: deger, style: 'fill:' + RENK.vurgu }, et[i]);
        return belir(c, et[i], ms, 1);
      },
    };
  }

  /* ---- değişken çerçevesi: Bağımlı · Bağımsız · Kontrol ----
     o: { x, y, w, h } ; yaz(i, satirlar, renk) ; soru(i) ; vurgu(i, açık) */
  function degiskenler(c, p, o) {
    const g = c.S('g', {}, p), cw = o.w / 3, AD = ['Bağımlı', 'Bağımsız', 'Kontrol'];
    const kol = AD.map((ad, i) => {
      const e = c.S('g', {}, g), x = o.x + i * cw;
      const r = kutu(c, e, x + 6, o.y, cw - 12, o.h, { rx: 14 });
      yazi(c, e, x + cw / 2, o.y + 40, ad, { size: 26, kalin: 700, renk: RENK.soluk });
      cizgi(c, e, [x + 24, o.y + 58], [x + cw - 24, o.y + 58], GRI.cam, 2);
      const icerik = c.S('g', {}, e);
      return { e, r, icerik, x };
    });
    return {
      g, kol,
      baslik: (i) => kol[i].e,
      yaz(i, satirlar, renk = RENK.yazi, ms = 450) {
        const k = kol[i]; k.icerik.textContent = '';
        satirlar.forEach((s, j) => yazi(c, k.icerik, k.x + cw / 2, o.y + 112 + j * 44, s, { size: 26, kalin: 600, renk }));
        k.icerik.style.opacity = 0; return belir(c, k.icerik, ms, 1);
      },
      soru(i) { return this.yaz(i, ['?'], RENK.vurgu, 300); },
      vurgu(i, acik) { kol[i].r.style.stroke = acik ? RENK.vurgu : ''; kol[i].r.style.strokeWidth = acik ? 4 : ''; },
    };
  }

  /* ---- deney tablosu ----
     o: { x, y, w, sut (görünen sütunlar: 0 Sıvı, 1 Sıcaklık, 2 Miktar, 3 Kap, 4 Basınç; varsayılan hepsi), satirlar: [{ sivi, sic, miktar, kap, p }] }
     satirEkle(satir) ; vurgu(i, açık) */
  function deneyTablosu(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 436, SUT = o.sut || [0, 1, 2, 3, 4];
    const TAM = [70, 88, 66, 120, 92], AD = ['Sıvı', 'Sıcaklık', 'Miktar', 'Kap', 'Basınç'];
    const top = SUT.reduce((a, i) => a + TAM[i], 0), GEN = SUT.map((i) => (TAM[i] * W) / top);
    const SAT = 42, ust = o.y;
    const cx = []; let a = o.x; GEN.forEach((w) => { cx.push(a + w / 2); a += w; });
    SUT.forEach((i, j) => yazi(c, g, cx[j], ust + 14, AD[i], { size: 18, kalin: 600, renk: RENK.soluk }));
    cizgi(c, g, [o.x, ust + 28], [o.x + W, ust + 28], GRI.cam, 2);
    const satirlar = [], ogeler = [];
    const ekle = (s, anim) => {
      const j = satirlar.length, y = ust + 28 + SAT * (j + 0.5) + 8, e = c.S('g', {}, g);
      const fon = c.S('rect', { x: o.x - 4, y: y - SAT / 2 - 3, width: W + 8, height: SAT - 2, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0.0 }, e);
      SUT.forEach((i, q) => {
        if (i === 0) yazi(c, e, cx[q], y + 7, s.sivi, { size: 21, kalin: 600 });
        if (i === 1) sb(c, e, cx[q], y + 7, String(s.sic), '°C', { size: 21, kalin: 600, bsize: 18, dx: 3, brenk: RENK.yazi });
        if (i === 2) yazi(c, e, cx[q], y + 7, s.miktar, { size: 21, kalin: 600 });
        if (i === 3) yazi(c, e, cx[q], y + 7, s.kap, { size: s.kap.length > 8 ? 18 : 21, kalin: 600 });
        if (i === 4) yazi(c, e, cx[q], y + 7, virgul(s.p), { size: 21, kalin: 700, renk: RENK.vurgu });
      });
      satirlar.push(s); ogeler.push({ e, fon });
      if (anim) { e.style.opacity = 0; return belir(c, e, 450, 1); }
      return Promise.resolve();
    };
    (o.satirlar || []).forEach((s) => ekle(s, false));
    return {
      g, satirlar, ogeler,
      satirEkle: (s) => ekle(s, true),
      vurgu(i, acik) { ogeler[i].fon.setAttribute('fill-opacity', acik ? 0.22 : 0); },
      yukseklik: () => 28 + SAT * satirlar.length,
    };
  }

  /* ---- ortak ölçekli yatay çubuklar ----
     o: { x (çubuk başı), y, w (en uzun çubuk), max, satirlar: [{ ad, deger }], aralik } ; goster(i, ms) */
  function cubuklar(c, p, o) {
    const g = c.S('g', {}, p), ara = o.aralik || 92;
    const sat = o.satirlar.map((s, i) => {
      const y = o.y + i * ara, e = c.S('g', {}, g);
      yazi(c, e, o.x - 18, y + 9, s.ad, { hiza: 'end', size: 28, kalin: 600 });
      const cb = c.S('rect', { x: o.x, y: y - 20, width: 0, height: 40, rx: 8, fill: s.renk || GRI.koyu }, e);
      const val = yazi(c, e, o.x + 16, y + 9, virgul(s.deger), { hiza: 'start', size: 28, kalin: 700, renk: RENK.vurgu });
      e.style.opacity = 0;
      return { e, cb, val, s, y };
    });
    return {
      g, sat,
      async goster(i, ms = 900) {
        const q = sat[i], son = Math.max(8, (q.s.deger / o.max) * o.w);
        await belir(c, q.e, 300, 1);
        await c.tween(ms, (e) => { const w = son * e; q.cb.setAttribute('width', w); q.val.setAttribute('x', o.x + w + 16); }, ease.out);
      },
    };
  }

  /* ---- iki kutulu sınıflandırma tahtası (sinifla ile birlikte) ----
     o: { kutular: [{ baslik, x, y, w, h }], ciz(k, g) (kartın çizimi), chip(k, p, x, y) (kutuya konan kısa yazıyı çizip döndürür) } */
  function kutuTahtasi(c, p, o) {
    const kg = o.kutular.map((q) => {
      const g = c.S('g', {}, p); kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      yazi(c, g, q.x + q.w / 2, q.y + 40, q.baslik, { size: 26, kalin: 700 });
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
        const q = o.kutular[k.kutu], e = kg[k.kutu], hy = q.y + 96 + e.n * 52; e.n++;
        await belir(c, kartG, 250, 0); kartG.remove(); kartG = null;
        const ch = o.chip(k, p, q.x + q.w / 2, hy);
        ch.style.opacity = 0; await belir(c, ch, 350, 1);
      },
    };
  }

  /* ---- düz gri küre modelleri (nötr tonlar) ---- */
  const KURE = {
    H2O: [[0, -14, 30, '#bdbdbd'], [-34, 22, 19, '#e6e6e6'], [34, 22, 19, '#e6e6e6']],
    CH4: [[0, 0, 30, '#9c9c9c'], [-34, -30, 19, '#e6e6e6'], [34, -30, 19, '#e6e6e6'], [-34, 30, 19, '#e6e6e6'], [34, 30, 19, '#e6e6e6']],
    CO2: [[0, 0, 30, '#9c9c9c'], [-52, 0, 28, '#bdbdbd'], [52, 0, 28, '#bdbdbd']],
  };
  function kureModeli(c, p, ad, x, y, k = 1) {
    const g = c.S('g', { transform: `translate(${x},${y}) scale(${k})` }, p);
    KURE[ad].slice().sort((a, b) => b[2] - a[2]).forEach(([cx, cy, r, f]) => c.S('circle', { cx, cy, r, fill: f }, g));
    return g;
  }

  return {
    GRI, SIVI, DEGER, OLCU: { UX, UA, UR, UY0, UYB, YORTA, DMAX, MMHG }, virgul, sb, dizi, dolas, alan, kapliU, akis, isaretli, asama, cekim, yuzey, sorukarti, degiskenler, deneyTablosu, cubuklar, kutuTahtasi, kureModeli,
  };
})();
