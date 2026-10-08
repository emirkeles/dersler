/* Kuvvet ve Hareket: temanın derslerinde tekrar eden çizim ve etkileşim araçları (window.KIT).
   Tahta 1000×562 birimdir. Yazı boyu en az 22 birim tutulur (dizüstünde ≈ 12 px'in üstü).
   Renk rolleri tema boyunca sabittir: a = birinci vektör, b = ikinci vektör, r = bileşke.
   Bu dosyayı yalnızca temayı yürüten oturum değiştirir; derse özel çizimler ders dosyasında durur. */
window.KIT = (() => {
  'use strict';
  const RENK = {
    a: 'var(--c1)', b: 'var(--c2)', r: 'var(--c3)', mor: 'var(--c4)', vurgu: 'var(--c5)', turkuaz: 'var(--c6)',
    iyi: 'var(--good)', kotu: 'var(--bad)', cizgi: '#5b678f', ince: '#33405f', soluk: 'var(--muted)', koyu: '#162038', yazi: 'var(--text)',
  };
  const sayi = (v) => String(v).replace('.', ',');
  const par = (...ps) => Promise.all(ps.flat());

  /* ---- Temel öğeler ---- */
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 30, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || RENK.yazi), text: metin,
  }, p);
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', {
    x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx, fill: o.fill || RENK.koyu,
    stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin == null ? 3 : o.kalin,
  }, p);
  const cizgi = (c, p, x1, y1, x2, y2, o = {}) => {
    const el = c.S('line', { x1, y1, x2, y2, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3, 'stroke-linecap': 'round' }, p);
    if (o.kesik) el.setAttribute('stroke-dasharray', o.kesik === true ? '10 8' : o.kesik);
    return el;
  };
  const daire = (c, p, cx, cy, r, o = {}) => c.S('circle', {
    cx, cy, r, fill: o.fill || 'none', stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin == null ? 3 : o.kalin,
  }, p);
  const yol = (c, p, d, o = {}) => c.S('path', {
    d, fill: o.fill || 'none', stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin == null ? 3 : o.kalin,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }, p);

  /* ---- Görünürlük ---- */
  const gizle = (...els) => { els.flat().forEach((e) => { e.style.opacity = 0; }); };
  const belir = (c, el, ms = 400, hedef = 1) => {
    const els = [el].flat(), ilk = els.map((e) => (e.style.opacity === '' ? 0 : +e.style.opacity));
    els.forEach((e, i) => { e.style.opacity = ilk[i]; });
    return c.tween(ms, (t) => els.forEach((e, i) => { e.style.opacity = ilk[i] + (hedef - ilk[i]) * t; }));
  };
  const sol = (c, el, hedef = 0.25, ms = 350) => {
    const els = [el].flat(), ilk = els.map((e) => (e.style.opacity === '' ? 1 : +e.style.opacity));
    return c.tween(ms, (t) => els.forEach((e, i) => { e.style.opacity = ilk[i] + (hedef - ilk[i]) * t; }));
  };
  const kaybol = async (c, el, ms = 300) => { await sol(c, el, 0, ms); [el].flat().forEach((e) => e.remove()); };
  const kay = (c, g, x1, y1, x2, y2, ms = 600) => c.tween(ms, (e) => {
    g.setAttribute('transform', `translate(${x1 + (x2 - x1) * e} ${y1 + (y2 - y1) * e})`);
  }, Ders.ease.inOut);

  /* ---- Ok (vektör). g.ayarla(x1,y1,x2,y2) ile yeniden çizilir; g.uclar son koordinatları tutar. ---- */
  function ok(c, p, x1, y1, x2, y2, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.a, w = o.kalin || 6, u = o.uc || 18;
    const govde = c.S('line', { stroke: renk, 'stroke-width': w, 'stroke-linecap': 'round' }, g);
    if (o.kesik) govde.setAttribute('stroke-dasharray', '9 8');
    const uc = c.S('path', { fill: renk }, g);
    g.ayarla = (a, b, d, e) => {
      const L = Math.hypot(d - a, e - b), ux = L ? (d - a) / L : 1, uy = L ? (e - b) / L : 0, k = Math.min(u, L * 0.6);
      const bx = d - ux * k, by = e - uy * k, n = k * 0.5;
      govde.setAttribute('x1', a); govde.setAttribute('y1', b); govde.setAttribute('x2', L ? bx : a); govde.setAttribute('y2', L ? by : b);
      uc.setAttribute('d', `M ${d} ${e} L ${bx - uy * n} ${by + ux * n} L ${bx + uy * n} ${by - ux * n} Z`);
      g.style.display = L < 1 ? 'none' : '';
      g.uclar = [a, b, d, e];
    };
    g.ayarla(x1, y1, x2, y2);
    return g;
  }
  /* Oku başlangıcından ucuna doğru büyüterek çizer. */
  const okCiz = (c, g, ms = 600) => {
    const [a, b, d, e] = g.uclar;
    return c.tween(ms, (t) => g.ayarla(a, b, a + (d - a) * t, b + (e - b) * t), Ders.ease.out).then(() => g.ayarla(a, b, d, e));
  };
  /* Okun iki ucunu yeni yere doğrusal taşır. */
  const okGit = (c, g, x1, y1, x2, y2, ms = 700) => {
    const [a, b, d, e] = g.uclar;
    return c.tween(ms, (t) => g.ayarla(a + (x1 - a) * t, b + (y1 - b) * t, d + (x2 - d) * t, e + (y2 - e) * t), Ders.ease.inOut);
  };

  /* ---- Yön gülü: K yukarı, D sağ ---- */
  function yonGulu(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), r = o.r || 30, s = o.size || 22;
    ok(c, g, x, y + r, x, y - r, { renk: RENK.soluk, kalin: 3, uc: 10 });
    ok(c, g, x - r, y, x + r, y, { renk: RENK.soluk, kalin: 3, uc: 10 });
    const ad = o.adlar || ['K', 'D', 'G', 'B'];
    yazi(c, g, x, y - r - 8, ad[0], { size: s, renk: RENK.soluk });
    yazi(c, g, x + r + 16, y + 8, ad[1], { size: s, renk: RENK.soluk });
    yazi(c, g, x, y + r + 24, ad[2], { size: s, renk: RENK.soluk });
    yazi(c, g, x - r - 16, y + 8, ad[3], { size: s, renk: RENK.soluk });
    return g;
  }

  /* ---- Kareli düzlem. P(i, j): sol alttan i kare sağ, j kare yukarı. ----
     vektor(i, j, di, dj, {renk, ad}) bir ok döndürür: v.koy(i, j, di, dj), v.i, v.j, v.di, v.dj, v.etiket.
     tasi(c, v, i2, j2, {iz}) oku dönmeden, boyu değişmeden kaydırır; iz verilirse eski yerinde soluk kopya kalır. */
  function izgara(c, p, o = {}) {
    const kare = o.kare || 50, sutun = o.sutun || 16, satir = o.satir || 8;
    const x0 = o.x == null ? (1000 - sutun * kare) / 2 : o.x, y0 = o.y == null ? 60 : o.y;
    const g = c.S('g', {}, p);
    for (let i = 0; i <= sutun; i++) cizgi(c, g, x0 + i * kare, y0, x0 + i * kare, y0 + satir * kare, { renk: RENK.ince, kalin: 1.5 });
    for (let j = 0; j <= satir; j++) cizgi(c, g, x0, y0 + j * kare, x0 + sutun * kare, y0 + j * kare, { renk: RENK.ince, kalin: 1.5 });
    const P = (i, j) => [x0 + i * kare, y0 + (satir - j) * kare];
    if (o.yon) yonGulu(c, g, o.yonX || x0 + sutun * kare - 46, o.yonY || y0 + 52, { r: 26 });
    if (o.olcek) yazi(c, g, x0 + 6, y0 + satir * kare + 30, o.olcek, { size: 24, hiza: 'start', renk: RENK.soluk });
    const etiketYer = (v) => {
      const [a, b] = P(v.i, v.j), [d, e] = P(v.i + v.di, v.j + v.dj), L = Math.hypot(d - a, e - b) || 1;
      const nx = -(e - b) / L, ny = (d - a) / L, yan = v.yan == null ? -1 : v.yan;
      return [(a + d) / 2 + nx * 24 * yan, (b + e) / 2 + ny * 24 * yan + 9];
    };
    function vektor(i, j, di, dj, vo = {}) {
      const [a, b] = P(i, j), [d, e] = P(i + di, j + dj);
      const v = ok(c, vo.katman || g, a, b, d, e, vo);
      Object.assign(v, { i, j, di, dj, yan: vo.yan });
      if (vo.ad) v.etiket = yazi(c, vo.katman || g, 0, 0, vo.ad, { size: vo.size || 28, renk: vo.renk || RENK.a });
      v.koy = (i2, j2, di2 = v.di, dj2 = v.dj) => {
        Object.assign(v, { i: i2, j: j2, di: di2, dj: dj2 });
        const [a2, b2] = P(i2, j2), [d2, e2] = P(i2 + di2, j2 + dj2);
        v.ayarla(a2, b2, d2, e2);
        if (v.etiket) { const [tx, ty] = etiketYer(v); v.etiket.setAttribute('x', tx); v.etiket.setAttribute('y', ty); }
      };
      v.koy(i, j);
      return v;
    }
    async function tasi(c2, v, i2, j2, to = {}) {
      if (to.iz) { const iz = vektor(v.i, v.j, v.di, v.dj, { renk: to.izRenk || RENK.soluk, kalin: 4 }); iz.style.opacity = 0.3; }
      const i1 = v.i, j1 = v.j;
      await c2.tween(to.ms || 800, (t) => v.koy(i1 + (i2 - i1) * t, j1 + (j2 - j1) * t), Ders.ease.inOut);
      v.koy(i2, j2);
    }
    /* Bir okun yatay ve düşey kare sayısını kesikli çizgiyle gösterir; çizilen grubu döndürür. */
    function sayim(v, so = {}) {
      const s = c.S('g', {}, g), [a, b] = P(v.i, v.j), [d, e] = P(v.i + v.di, v.j + v.dj), renk = so.renk || RENK.soluk;
      if (v.di) { cizgi(c, s, a, b, d, b, { renk, kalin: 3, kesik: '6 7' }); yazi(c, s, (a + d) / 2, b + (v.dj >= 0 ? 30 : -12), Math.abs(v.di) + (v.di > 0 ? ' sağ' : ' sol'), { size: 24, renk }); }
      if (v.dj) { cizgi(c, s, d, b, d, e, { renk, kalin: 3, kesik: '6 7' }); yazi(c, s, d + (v.di >= 0 ? 12 : -12), (b + e) / 2 + 8, Math.abs(v.dj) + (v.dj > 0 ? ' yukarı' : ' aşağı'), { size: 24, renk, hiza: v.di >= 0 ? 'start' : 'end' }); }
      return s;
    }
    const nokta = (i, j, no = {}) => { const [x, y] = P(i, j); return c.S('circle', { cx: x, cy: y, r: no.r || 7, fill: no.renk || RENK.vurgu }, g); };
    return { g, kare, sutun, satir, x0, y0, P, vektor, tasi, sayim, nokta };
  }

  /* ---- Kart ve kutular (sınıflandırma) ---- */
  function kart(c, p, x, y, w, h, metin, o = {}) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, w, h, { renk: o.renk || RENK.cizgi, fill: o.fill, rx: o.rx == null ? 10 : o.rx, kalin: o.kalin });
    const satirlar = [metin].flat(), s = o.size || 26, ara = o.ara || s * 1.25, ilk = y + h / 2 + s * 0.35 - (satirlar.length - 1) * ara / 2;
    satirlar.forEach((m, i) => yazi(c, g, x + w / 2, ilk + i * ara, m, { size: s, renk: o.yaziRenk || RENK.yazi, kalin: o.yaziKalin }));
    return g;
  }
  /* Yan yana kutular. koy(c, i, metin) kutuya bir satır ekler. ad(i, metin) başlığı sonradan yazar. */
  function kutular(c, p, adlar, o = {}) {
    const n = adlar.length, x = o.x == null ? 50 : o.x, y = o.y == null ? 130 : o.y, bosluk = o.bosluk == null ? 16 : o.bosluk;
    const w = o.w || (900 - bosluk * (n - 1)) / n, h = o.h || 340, g = c.S('g', {}, p), icerik = adlar.map(() => []), basliklar = [];
    const renkler = o.renkler || adlar.map(() => RENK.cizgi), bs = o.baslikBoy || 26, ys = o.yaziBoy || 24, adim = o.adim || ys * 1.5;
    adlar.forEach((ad, i) => {
      kutu(c, g, x + i * (w + bosluk), y, w, h, { renk: renkler[i] });
      basliklar.push([ad].flat().map((m, k) => yazi(c, g, x + i * (w + bosluk) + w / 2, y + bs + 14 + k * bs * 1.15, m, { size: bs, renk: renkler[i] === RENK.cizgi ? RENK.vurgu : renkler[i] })));
    });
    const basY = y + (o.baslikSatir || 1) * bs * 1.15 + 34;
    const koy = (c2, i, metin, ko = {}) => {
      const t = yazi(c, g, x + i * (w + bosluk) + w / 2, basY + ys + icerik[i].length * adim, metin, { size: ys, renk: ko.renk });
      icerik[i].push(t); t.style.opacity = 0;
      return belir(c2, t, 350);
    };
    const ad = (i, metin) => { basliklar[i][0].textContent = metin; };
    return { g, adlar, koy, ad, icerik, basliklar, x, y, w, h, bosluk };
  }
  /* Kartları sırayla sorar; doğru kutu seçilince kart kutuya yazılır.
     ogeler: [{ ad, kutu, neden, ipucu: [seçenek başına], kisa }] ; o: { soru: (ad) => html, tag, secenekler, ipucu, x, y } */
  async function sinifla(c, kt, ogeler, o = {}) {
    const sec = o.secenekler || kt.adlar.map((a) => [a].flat().join(' '));
    for (const oge of ogeler) {
      const bekleyen = yazi(c, o.katman || kt.g, o.x || 500, o.y || 530, oge.ad + '  →  ?', { size: o.size || 26, renk: RENK.vurgu });
      await c.choice({
        tag: o.tag || 'Sıra sende', q: (o.soru || ((a) => `<b>${a}</b> hangi kutuya girer?`))(oge.ad), options: sec, answer: oge.kutu,
        hints: sec.map((_, i) => (oge.ipucu && oge.ipucu[i]) || o.ipucu || 'Bir daha düşün.'), right: oge.neden || 'Doğru.',
        onPick: (i, dogru) => { if (dogru) { bekleyen.remove(); kt.koy(c, oge.kutu, oge.kisa || oge.ad, { renk: oge.renk }); } },
      });
    }
  }

  /* ---- Tablo: satır satır açılır. sutunlar: [{ ad, w }] (w toplamı tablonun genişliği) ---- */
  function tablo(c, p, o) {
    const g = c.S('g', {}, p), x = o.x == null ? 100 : o.x, y = o.y == null ? 90 : o.y, sy = o.satir || 54, s = o.size || 26;
    const xs = []; let t = x; o.sutunlar.forEach((k) => { xs.push(t); t += k.w; });
    const w = t - x, satirlar = [];
    if (!o.basliksiz) {
      o.sutunlar.forEach((k, i) => yazi(c, g, xs[i] + k.w / 2, y + sy * 0.66, k.ad, { size: s, renk: RENK.soluk }));
      cizgi(c, g, x, y + sy, x + w, y + sy, { kalin: 2 });
    }
    const satir = (hucreler, so = {}) => {
      const n = satirlar.length, sg = c.S('g', {}, g), yy = y + (o.basliksiz ? 0 : sy) + n * sy;
      hucreler.forEach((m, i) => { if (m != null) yazi(c, sg, xs[i] + o.sutunlar[i].w / 2, yy + sy * 0.66, m, { size: s, renk: (so.renkler && so.renkler[i]) || so.renk }); });
      cizgi(c, sg, x, yy + sy, x + w, yy + sy, { renk: RENK.ince, kalin: 1.5 });
      satirlar.push(sg); return sg;
    };
    const hucre = (r, i) => [xs[i] + o.sutunlar[i].w / 2, y + (o.basliksiz ? 0 : sy) + r * sy + sy * 0.66];
    return { g, satir, satirlar, hucre, x, y, w, sy };
  }

  /* ---- Sürat göstergesi. git(c, v) ibreyi v değerine götürür. ---- */
  function gosterge(c, p, x, y, r, o = {}) {
    const g = c.S('g', {}, p), max = o.max || 240, adim = o.adim || 20, a0 = 210, a1 = -30;
    const aci = (v) => (a0 + (a1 - a0) * (v / max)) * Math.PI / 180;
    daire(c, g, x, y, r, { fill: RENK.koyu });
    for (let v = 0; v <= max; v += adim) {
      const a = aci(v), buyuk = v % (adim * 2) === 0;
      cizgi(c, g, x + Math.cos(a) * r * 0.86, y - Math.sin(a) * r * 0.86, x + Math.cos(a) * r * 0.97, y - Math.sin(a) * r * 0.97, { renk: RENK.soluk, kalin: buyuk ? 3 : 2 });
      if (buyuk && !o.sayisiz) yazi(c, g, x + Math.cos(a) * r * 0.68, y - Math.sin(a) * r * 0.68 + r * 0.07, String(v), { size: Math.max(r * 0.17, 14), renk: RENK.soluk, kalin: 500 });
    }
    yazi(c, g, x, y + r * 0.55, o.birim || 'km/h', { size: Math.max(r * 0.2, 16), renk: RENK.soluk });
    const ibre = cizgi(c, g, x, y, x, y, { renk: o.renk || RENK.b, kalin: Math.max(r * 0.05, 4) });
    c.S('circle', { cx: x, cy: y, r: r * 0.08, fill: o.renk || RENK.b }, g);
    let simdi = 0;
    const ayarla = (v) => { simdi = v; const a = aci(v); ibre.setAttribute('x2', x + Math.cos(a) * r * 0.8); ibre.setAttribute('y2', y - Math.sin(a) * r * 0.8); };
    const git = (c2, v, ms = 900) => { const ilk = simdi; return c2.tween(ms, (e) => ayarla(ilk + (v - ilk) * e), Ders.ease.inOut); };
    ayarla(o.deger || 0);
    return { g, ayarla, git, deger: () => simdi };
  }

  /* ---- Sayı doğrusu / düz yol. x(v) değerin tahtadaki yerini verir. ---- */
  function sayiDogrusu(c, p, o) {
    const g = c.S('g', {}, p), x0 = o.x0 == null ? 100 : o.x0, x1 = o.x1 == null ? 900 : o.x1, y = o.y;
    const x = (v) => x0 + (x1 - x0) * (v - o.min) / (o.max - o.min);
    cizgi(c, g, x0, y, x1, y, { kalin: 4 });
    for (let v = o.min; v <= o.max + 1e-9; v += o.adim) {
      cizgi(c, g, x(v), y - 9, x(v), y + 9, { kalin: 3 });
      if (!o.sayisiz && (!o.etiketAdim || Math.round((v - o.min) / o.adim) % Math.round(o.etiketAdim / o.adim) === 0)) {
        yazi(c, g, x(v), y + 40, sayi(Math.round(v * 100) / 100) + (o.birim ? ' ' + o.birim : ''), { size: o.size || 24, renk: RENK.soluk, kalin: 500 });
      }
    }
    if (o.uclar) { yazi(c, g, x0 - 14, y - 22, o.uclar[0], { size: 24, renk: RENK.soluk, hiza: 'end' }); yazi(c, g, x1 + 14, y - 22, o.uclar[1], { size: 24, renk: RENK.soluk, hiza: 'start' }); }
    return { g, x, y };
  }

  /* ---- Küçük figürler (x, y: ayak / taban ortası) ---- */
  function insan(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.yazi, s = o.s || 1, k = { renk, kalin: 4 };
    daire(c, g, x, y - 78 * s, 11 * s, k);
    yol(c, g, `M ${x} ${y - 67 * s} L ${x} ${y - 30 * s} M ${x} ${y - 30 * s} L ${x - 13 * s} ${y} M ${x} ${y - 30 * s} L ${x + 13 * s} ${y}`, k);
    const kol = o.kol == null ? 0 : o.kol; // -1 sola uzanır, 1 sağa uzanır, 0 aşağı
    yol(c, g, kol ? `M ${x} ${y - 56 * s} L ${x + kol * 26 * s} ${y - 52 * s}` : `M ${x - 14 * s} ${y - 40 * s} L ${x} ${y - 58 * s} L ${x + 14 * s} ${y - 40 * s}`, k);
    return g;
  }
  function araba(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.a, s = o.s || 1;
    yol(c, g, `M ${x - 46 * s} ${y - 12 * s} L ${x - 46 * s} ${y - 30 * s} L ${x - 24 * s} ${y - 32 * s} L ${x - 12 * s} ${y - 50 * s} L ${x + 18 * s} ${y - 50 * s} L ${x + 30 * s} ${y - 32 * s} L ${x + 46 * s} ${y - 28 * s} L ${x + 46 * s} ${y - 12 * s} Z`, { renk, fill: RENK.koyu });
    daire(c, g, x - 26 * s, y - 10 * s, 10 * s, { renk, fill: RENK.koyu });
    daire(c, g, x + 26 * s, y - 10 * s, 10 * s, { renk, fill: RENK.koyu });
    return g;
  }
  function otobus(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.a, s = o.s || 1;
    kutu(c, g, x - 80 * s, y - 62 * s, 160 * s, 50 * s, { renk, rx: 8 });
    for (let k = 0; k < 4; k++) kutu(c, g, x - 70 * s + k * 36 * s, y - 54 * s, 28 * s, 18 * s, { renk, rx: 3, kalin: 2 });
    daire(c, g, x - 46 * s, y - 10 * s, 10 * s, { renk, fill: RENK.koyu });
    daire(c, g, x + 46 * s, y - 10 * s, 10 * s, { renk, fill: RENK.koyu });
    return g;
  }

  return {
    RENK, sayi, par, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, kay,
    ok, okCiz, okGit, yonGulu, izgara, kart, kutular, sinifla, tablo, gosterge, sayiDogrusu, insan, araba, otobus,
  };
})();
