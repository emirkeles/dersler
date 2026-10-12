/* Konu E (Bernoulli İlkesi) derslerinin ortak çizim araçları (window.KIT_E). kit.js dosyasından sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Hareket yalnızca c.tween / c.wait ile kurulur: sürekli akan noktalar bir "akış motoru" içinde
   (tek bir arka plan c.tween döngüsü) yürür; sahne değişince döngü kendiliğinden durur. Sayı gösterilmez: sürat ok boyuyla,
   basınç düşey borudaki su yüksekliğiyle ya da etiket tonuyla verilir.

   İMZALAR
   anim(c) → (ad, ms, fn(e), eğri?) => Promise            aynı adla başlayan en son tween geçerlidir (öncekinin kareleri yok sayılır)
   akisMotoru(c) → { ekle(fn(dt)), cikar(fn) }             arka plan döngüsü; ekle() ilk çağrıda döngüyü başlatır. dt saniyedir.
   akisDemeti(c, p, motor, { P, Q, n=1, ara=[0,-10], hiz, cizgi=true, aralik=40 }) → { g, hiz (okunur/yazılır), kaldir() }
        P→Q doğrusu üzerinde n çizgi (i. çizgi P,Q + i·ara kaydırılır); soluk gri-mavi, kalınlık 2; üzerinde 5 birimlik noktalar
        verilen süratle (birim/s) akar. Sık demet: ara 10, hiz 300; seyrek: ara 30 (ya da tek çizgi), hiz 100. Başta görünür; gizle(g) ile sakla.
   basincEtiketi(c, p, x, y, 'dusuk'|'yuksek', { kisa }) → g   (gizli başlar) düşük = soluk sarı dolgu + sarı yazı, yüksek = dolu sarı + koyu yazı; kisa:true → yalnızca "düşük"
   kuvvetOku(c, p, P, Q, { etiket: [x, y], hiza }) → g          (gizli başlar) turuncu ok (6) ve "kuvvet" yazısı
   halka(c, p, x, y, rx, ry) → g                                (gizli başlar) doğru cevabı çevreleyen yeşil elips
   ela(c, p, { x, y, r=26, govde, bacak, kol:[hx,hy], agiz:'sag'|'ust' }) → g   Ela: baş merkezi (x,y); govde = gövde alt ucunun y'si; bacak = zemin y'si; kol = elin yeri
   tup(c, p, { y=310, bolumler:[{ a, b, h }, …] }) → { g, B, y, x0, x1, ust(i), alt(i), yukAt(x), hizAt(x, hiz[]), yuk(i,v), git(i, v, ms), delik(x1,x2) → { ac(bool) }, dinle(fn), ciz() }
        Ardışık bölümlerden oluşan boru: bölüm i, x a→b arasında h yüksekliğinde; bölümler arası geçişler doğrusal. İç su (mavi, 0,35) ve açık gri çeperler.
   dusey(c, p, tup, { x (sol kenar), i (bölüm), su (mutlak y düzeyi), etiket:'P'|null, olcu:bool, tepe=60 }) → { g, sutun, p, olcu, seviye, yaz(y), git(y, ms), goster(ms) }
        Boruya takılı üstü açık düşey boru (genişlik 24). sutun: boru ve su; p: su yüzeyindeki sarı çubuk ve etiket; olcu: yüzeyden bölüm üst kenarına sarı kesikli ölçü çizgisi. Üçü de gizli başlar.
   isaretler(c, p, motor, tup, { hiz:[bölüm başına birim/s], satir=[-0.72, 0.72], n=8 }) → { g, hiz[], git(i, v, ms) }
        Borunun içinde akan beyaz noktalar; süratleri bölüm başına verilir, geçişlerde doğrusal değişir.
   depoCiz(c, p) → { g, vana, ac(ms), kapat(ms), vanaKur(acik) }   solda depo (su y=80) ve vana
   surgu(c, p, { y=480, i=0 }) → { g, tutamac, xs:[300,500,700], git(i, ms), kur(i) }   geniş / orta / dar sürgüsü
   KONUM = [{ h, ok, hiz, su } × 3]   kesit yüksekliğine göre ok boyu, nokta sürati ve düşey boru su düzeyi (geniş, orta, dar)
   boruDuzenegi(c, p, motor, { dusey:bool }) → { g, depo, tp, sol, sag, isaret, solOk, sagOk, solEt, kesit:[sol,sag,yazı], durgun, damla, surgu,
        i, yukseklik(i, ms), sur(i, ms), su(i, ms), konum(i, ms), kur(i), suDus(ms), akisAc(ms) }
        Sahne 2, 3, 9 ortak düzenek. Depo ve boru görünür, geri kalan her şey gizli başlar; ders belir(c, …) ile açar.
   venturi(c, p, motor) → { g, depo, tp, dus:[3], isaret, oklar:[3], okBoy[], durgun, ayarla([h1,h2,h3], ms), kur([h1,h2,h3]) }
        Üç bölümlü Venturi tüpü (B1 x170–330, B2 x390–610, B3 x670–890; düşey borular x=240, 500, 780). Çıkışta gizli: dus[i].sutun/p/olcu, oklar, isaret, durgun.
   venturiSatiri(c, p, y, harf, renk, { size, kalin }) → g   (gizli başlar) "A₁  A₂  A₃" gibi üç sütunlu satır (sütunlar x=240, 500, 780) */
window.KIT_E = (() => {
  'use strict';
  const { RENK, uz, yazi, cizgi, koy, gizle, belir, ok } = window.KIT;
  const { lerp, ease } = Ders;
  const CEPER = '#c3cbea', AKIS = '#7f93b8', NOKTA = '#c3cbea', BEYAZ = '#ffffff', ALT = ['₁', '₂', '₃'];

  /* ---- zaman ---- */
  const anim = (c) => {
    const sayac = {};
    return (ad, ms, fn, eg = ease.inOut) => {
      const my = (sayac[ad] = (sayac[ad] || 0) + 1);
      return c.tween(ms, (e) => { if (sayac[ad] === my) fn(e); }, eg);
    };
  };
  /* Sürekli akış: tek bir arka plan döngüsü (1 s'lik doğrusal tween'ler). Sahne değişince tween iptal olur, döngü biter. */
  function akisMotoru(c) {
    const isler = new Set();
    let basladi = false;
    const baslat = () => {
      if (basladi) return;
      basladi = true;
      (async () => {
        try {
          for (;;) {
            let onceki = 0;
            await c.tween(1000, (e) => { const dt = e - onceki; onceki = e; isler.forEach((f) => f(dt)); }, ease.linear);
          }
        } catch (_) { /* sahne değişti */ }
      })();
    };
    return { ekle(f) { isler.add(f); baslat(); return f; }, cikar(f) { isler.delete(f); } };
  }

  /* ---- akış çizgileri (görünmeyen hava akışı) ---- */
  function akisDemeti(c, p, motor, o) {
    const P = o.P, Q = o.Q, n = o.n || 1, ara = o.ara || [0, -10], L = uz(P, Q);
    const ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L, m = Math.max(2, Math.round(L / (o.aralik || 40)));
    const g = c.S('g', {}, p), s = { hiz: o.hiz || 100 }, nok = [];
    for (let i = 0; i < n; i++) {
      const dx = ara[0] * i, dy = ara[1] * i;
      if (o.cizgi !== false) cizgi(c, g, [P[0] + dx, P[1] + dy], [Q[0] + dx, Q[1] + dy], AKIS, 2);
      for (let j = 0; j < m; j++) nok.push({ dx, dy, k: ((j + ((i * 0.37) % 1)) * L) / m, el: c.S('circle', { r: 2.5, fill: NOKTA }, g) });
    }
    const yer = () => nok.forEach((q) => { q.el.setAttribute('cx', P[0] + q.dx + ux * q.k); q.el.setAttribute('cy', P[1] + q.dy + uy * q.k); });
    const f = motor.ekle((dt) => { nok.forEach((q) => { q.k = (q.k + s.hiz * dt) % L; }); yer(); });
    yer();
    return {
      g, get hiz() { return s.hiz; }, set hiz(v) { s.hiz = v; },
      kaldir() { motor.cikar(f); g.remove(); },
    };
  }

  /* ---- etiketler ve oklar ---- */
  function basincEtiketi(c, p, x, y, tur, o = {}) {
    const g = c.S('g', {}, p), yuksek = tur === 'yuksek', w = o.kisa ? 90 : yuksek ? 200 : 178;
    c.S('rect', { x: x - w / 2, y: y - 19, width: w, height: 38, rx: 10, fill: RENK.basinc, 'fill-opacity': yuksek ? 1 : 0.25 }, g);
    yazi(c, g, x, y + 8, o.kisa ? 'düşük' : yuksek ? 'yüksek basınç' : 'düşük basınç', { size: 22, kalin: 700, renk: yuksek ? RENK.koyu : RENK.basinc });
    gizle(g);
    return g;
  }
  function kuvvetOku(c, p, P, Q, o = {}) {
    const g = c.S('g', {}, p);
    ok(c, g, P, Q, RENK.kuvvet, 6);
    const e = o.etiket || [(P[0] + Q[0]) / 2, Math.min(P[1], Q[1]) - 16];
    yazi(c, g, e[0], e[1], 'kuvvet', { size: 22, kalin: 700, renk: RENK.kuvvet, hiza: o.hiza });
    gizle(g);
    return g;
  }
  function halka(c, p, x, y, rx, ry) {
    const g = c.S('g', {}, p);
    c.S('ellipse', { cx: x, cy: y, rx, ry, fill: 'none', stroke: RENK.iyi, 'stroke-width': 4 }, g);
    gizle(g);
    return g;
  }
  /* Ela: yandan görünüş, çizgilerden. */
  function ela(c, p, o = {}) {
    const g = c.S('g', {}, p), r = o.r || 26, x = o.x, y = o.y, S = { stroke: CEPER, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' };
    if (o.govde) {
      cizgi(c, g, [x, y + r], [x, o.govde], CEPER, 6);
      if (o.kol) cizgi(c, g, [x, y + r + (o.govde - y - r) * 0.3], o.kol, CEPER, 6);
      if (o.bacak) { cizgi(c, g, [x, o.govde], [x - 22, o.bacak], CEPER, 6); cizgi(c, g, [x, o.govde], [x + 22, o.bacak], CEPER, 6); }
    }
    c.S('circle', Object.assign({ cx: x, cy: y, r }, S, { fill: RENK.yuzey }), g);
    if (o.agiz === 'ust') cizgi(c, g, [x - 9, y - r + 1], [x + 9, y - r + 1], RENK.basinc, 5);
    else cizgi(c, g, [x + r - 9, y + r * 0.22], [x + r, y + r * 0.22], RENK.basinc, 5);
    return g;
  }

  /* ---- boru ---- */
  /* Çizgi dizisini (x'e göre artan) yatay parçalarda deliklere bölerek 'M… L…' yoluna çevirir. */
  function yolBol(pts, delikler) {
    const parcalar = [];
    let cur = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      if (y1 === y2) delikler.forEach(([g1, g2]) => { if (g1 >= x1 && g2 <= x2) { cur.push([g1, y1]); parcalar.push(cur); cur = [[g2, y1]]; } });
      cur.push([x2, y2]);
    }
    parcalar.push(cur);
    return parcalar.map((s) => 'M' + s.map((q) => q.join(',')).join(' L')).join(' ');
  }
  function tup(c, p, o) {
    const y = o.y || 310, B = o.bolumler.map((b) => Object.assign({}, b)), delikler = [], dinleyen = [], an = anim(c);
    const g = c.S('g', {}, p);
    const su = c.S('polygon', { fill: RENK.sivi, 'fill-opacity': 0.35 }, g);
    const yolOz = { fill: 'none', stroke: CEPER, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    const ustYol = c.S('path', yolOz, g), altYol = c.S('path', yolOz, g);
    const ust = (i) => y - B[i].h / 2, alt = (i) => y + B[i].h / 2;
    const sec = (x, f) => {
      if (x <= B[0].a) return f(0, 0, 0);
      for (let i = 0; i < B.length; i++) {
        if (x <= B[i].b) return f(i, i, 0);
        const s = B[i + 1];
        if (s && x < s.a) return f(i, i + 1, (x - B[i].b) / (s.a - B[i].b));
      }
      return f(B.length - 1, B.length - 1, 0);
    };
    const yukAt = (x) => sec(x, (i, j, t) => lerp(B[i].h, B[j].h, t));
    const hizAt = (x, hiz) => sec(x, (i, j, t) => lerp(hiz[i], hiz[j], t));
    function ciz() {
      const U = [], A = [];
      B.forEach((b, i) => { U.push([b.a, ust(i)], [b.b, ust(i)]); A.push([b.a, alt(i)], [b.b, alt(i)]); });
      su.setAttribute('points', U.concat(A.slice().reverse()).map((q) => q.join(',')).join(' '));
      const gaps = delikler.filter((d) => d.on).map((d) => [d.x1, d.x2]).sort((a, b) => a[0] - b[0]);
      ustYol.setAttribute('d', yolBol(U, gaps));
      altYol.setAttribute('d', yolBol(A, []));
      dinleyen.forEach((f) => f());
    }
    ciz();
    return {
      g, B, y, x0: B[0].a, x1: B[B.length - 1].b, ust, alt, yukAt, hizAt, ciz,
      yuk(i, v) { B[i].h = v; ciz(); },
      git(i, v, ms = 700) { const h0 = B[i].h; return an('h' + i, ms, (e) => { B[i].h = lerp(h0, v, e); ciz(); }); },
      delik(x1, x2) { const d = { x1, x2, on: false }; delikler.push(d); return { ac(v) { d.on = v; ciz(); } }; },
      dinle(f) { dinleyen.push(f); },
    };
  }
  /* Boruya takılı düşey boru: su düzeyi mutlak y ile verilir. */
  function dusey(c, p, tp, o) {
    const w = 24, tepe = o.tepe == null ? 60 : o.tepe, an = anim(c), g = c.S('g', {}, p);
    const sutun = c.S('g', {}, g);
    const su = c.S('rect', { x: o.x, width: w, fill: RENK.sivi, 'fill-opacity': 0.35 }, sutun);
    const duvar = c.S('path', { fill: 'none', stroke: CEPER, 'stroke-width': 3, 'stroke-linecap': 'round' }, sutun);
    const olcu = c.S('g', {}, g), ox = o.x + w + 18;
    const olcuHat = cizgi(c, olcu, [ox, 0], [ox, 0], RENK.basinc, 2, { 'stroke-dasharray': '6 5' });
    const ucA = cizgi(c, olcu, [ox - 7, 0], [ox + 7, 0], RENK.basinc, 2), ucB = cizgi(c, olcu, [ox - 7, 0], [ox + 7, 0], RENK.basinc, 2);
    const pg = c.S('g', {}, g);
    const cubuk = c.S('rect', { x: o.x, width: w, height: 4, fill: RENK.basinc }, pg);
    const et = o.etiket ? yazi(c, pg, o.x + w + 10, 0, o.etiket, { hiza: 'start', size: 26, kalin: 700, renk: RENK.basinc }) : null;
    const d = { seviye: o.su }, dl = tp.delik(o.x, o.x + w);
    function ciz() {
      const taban = tp.ust(o.i);
      duvar.setAttribute('d', `M${o.x},${tepe} L${o.x},${taban} M${o.x + w},${tepe} L${o.x + w},${taban}`);
      su.setAttribute('y', d.seviye); su.setAttribute('height', Math.max(0, taban - d.seviye));
      cubuk.setAttribute('y', d.seviye - 2);
      if (et) et.setAttribute('y', d.seviye + 8);
      koy(olcuHat, [ox, d.seviye], [ox, taban]); koy(ucA, [ox - 7, d.seviye], [ox + 7, d.seviye]); koy(ucB, [ox - 7, taban], [ox + 7, taban]);
    }
    tp.dinle(ciz); ciz();
    gizle(sutun, pg, olcu);
    return {
      g, sutun, p: pg, olcu, get seviye() { return d.seviye; },
      yaz(y) { d.seviye = y; ciz(); },
      git(y, ms = 700) { const y0 = d.seviye; return an('su', ms, (e) => { d.seviye = lerp(y0, y, e); ciz(); }); },
      goster(ms = 500) { dl.ac(true); return belir(c, sutun, ms); },
    };
  }
  /* Borunun içinde akan beyaz noktalar. */
  function isaretler(c, p, motor, tp, o = {}) {
    const hiz = o.hiz.slice(), satir = o.satir || [-0.72, 0.72], n = o.n || 8, x0 = tp.x0 + 20, x1 = tp.x1 - 10, an = anim(c);
    const g = c.S('g', {}, p), nok = [];
    satir.forEach((s, si) => {
      for (let j = 0; j < n; j++) nok.push({ s, x: x0 + ((x1 - x0) * (j + si * 0.5)) / n, el: c.S('circle', { r: 5, fill: BEYAZ, 'fill-opacity': 0.8 }, g) });
    });
    const yer = () => nok.forEach((m) => { m.el.setAttribute('cx', m.x); m.el.setAttribute('cy', tp.y + (m.s * tp.yukAt(m.x)) / 2); });
    motor.ekle((dt) => { nok.forEach((m) => { m.x += tp.hizAt(m.x, hiz) * dt; if (m.x > x1) m.x = x0 + (m.x - x1); }); yer(); });
    yer();
    return { g, hiz, git(i, v, ms = 700) { const v0 = hiz[i]; return an('v' + i, ms, (e) => { hiz[i] = lerp(v0, v, e); }); } };
  }

  /* ---- depo ve vana ---- */
  function depoCiz(c, p) {
    const g = c.S('g', {}, p), an = anim(c);
    c.S('rect', { x: 50, y: 80, width: 100, height: 310, fill: RENK.sivi, 'fill-opacity': 0.35 }, g);
    c.S('path', { d: 'M50,60 L50,390 L150,390 L150,370 M150,250 L150,60', fill: 'none', stroke: CEPER, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const vana = c.S('g', {}, g), YUK = -130;
    c.S('rect', { x: 150, y: 250, width: 20, height: 120, rx: 3, fill: RENK.gri, stroke: CEPER, 'stroke-width': 3 }, vana);
    let ty = 0;
    const koyV = (v) => { ty = v; vana.setAttribute('transform', `translate(0,${v})`); };
    return {
      g, vana, vanaKur(acik) { koyV(acik ? YUK : 0); },
      ac(ms = 400) { const t0 = ty; return an('vana', ms, (e) => koyV(lerp(t0, YUK, e))); },
      kapat(ms = 400) { const t0 = ty; return an('vana', ms, (e) => koyV(lerp(t0, 0, e))); },
    };
  }
  /* ---- sürgü ---- */
  function surgu(c, p, o = {}) {
    const xs = [300, 500, 700], y = o.y || 480, g = c.S('g', {}, p), an = anim(c);
    cizgi(c, g, [300, y], [700, y], RENK.gri, 6);
    xs.forEach((x, i) => {
      c.S('circle', { cx: x, cy: y, r: 5, fill: RENK.gri }, g);
      yazi(c, g, x, y + 50, ['geniş', 'orta', 'dar'][i], { size: 22, kalin: 600, renk: RENK.soluk });
    });
    const tutamac = c.S('circle', { cx: xs[o.i || 0], cy: y, r: 16, fill: RENK.alan }, g);
    return {
      g, tutamac, xs,
      kur(i) { tutamac.setAttribute('cx', xs[i]); },
      git(i, ms = 700) { const x0 = +tutamac.getAttribute('cx'); return an('s', ms, (e) => tutamac.setAttribute('cx', lerp(x0, xs[i], e))); },
    };
  }

  /* Kesit yüksekliğine göre sürat oku boyu, nokta sürati (birim/s) ve düşey boru su düzeyi (mutlak y). Sıra: geniş, orta, dar. */
  const KONUM = [{ h: 120, ok: 60, hiz: 90, su: 100 }, { h: 80, ok: 90, hiz: 135, su: 135 }, { h: 40, ok: 180, hiz: 270, su: 195 }];
  const OK = BEYAZ;

  /* ---- sahne 2, 3, 9 ortak boru düzeneği ---- */
  function boruDuzenegi(c, p, motor, o = {}) {
    const g = c.S('g', {}, p), an = anim(c);
    const depo = depoCiz(c, g);
    const tp = tup(c, g, { y: 310, bolumler: [{ a: 170, b: 420, h: 120 }, { a: 480, b: 890, h: 120 }] });
    const KES = { 'stroke-dasharray': '9 6' };
    const kesit1 = cizgi(c, g, [230, 250], [230, 370], RENK.alan, 3, KES), kesit2 = cizgi(c, g, [600, 250], [600, 370], RENK.alan, 3, KES);
    const kesitEt = yazi(c, g, 230, 240, 'kesit', { size: 22, kalin: 700, renk: RENK.alan });
    tp.dinle(() => koy(kesit2, [600, tp.ust(1)], [600, tp.alt(1)]));
    let sol = null, sag = null, durgun = null;
    if (o.dusey) {
      sol = dusey(c, g, tp, { x: 268, i: 0, su: 80, etiket: 'P' });
      sag = dusey(c, g, tp, { x: 678, i: 1, su: 80, etiket: 'P' });
      durgun = c.S('g', {}, g);
      [[170, 296], [330, 706], [740, 890]].forEach(([a, b]) => cizgi(c, durgun, [a, 80], [b, 80], RENK.gri, 2, { 'stroke-dasharray': '8 6' }));
      yazi(c, durgun, 890, 62, 'durgun düzey', { hiza: 'end', size: 22, kalin: 600, renk: RENK.gri });
      gizle(durgun);
    }
    const isaret = isaretler(c, g, motor, tp, { hiz: [90, 90] });
    const damla = c.S('g', {}, g), dm = [0, 1, 2].map(() => c.S('circle', { r: 4, fill: RENK.sivi }, damla));
    let zaman = 0;
    motor.ekle((dt) => {
      zaman += dt;
      dm.forEach((e, k) => { const s = (zaman * 1.25 + k / 3) % 1; e.setAttribute('cx', 894 + 40 * s); e.setAttribute('cy', 310 + 70 * s * s); e.setAttribute('opacity', 1 - 0.8 * s); });
    });
    const sagOk = ok(c, g, [520, 310], [580, 310], OK, 5), solOk = ok(c, g, [195, 310], [255, 310], OK, 5);
    const solEt = yazi(c, g, 268, 316, 'sürat', { hiza: 'start', size: 22, kalin: 600, renk: OK });
    const sg = surgu(c, g);
    gizle(kesit1, kesit2, kesitEt, isaret.g, damla, sagOk.g, solOk.g, solEt, sg.g, depo.g, tp.g);
    const b = {
      g, depo, tp, sol, sag, isaret, solOk, sagOk, solEt, kesit: [kesit1, kesit2, kesitEt], durgun, damla, surgu: sg, i: 0, okBoy: 60,
      yukseklik(i, ms = 700) { b.i = i; return Promise.all([tp.git(1, KONUM[i].h, ms), sg.git(i, ms)]); },
      sur(i, ms = 700) {
        const l0 = b.okBoy;
        return Promise.all([an('ok', ms, (e) => { b.okBoy = lerp(l0, KONUM[i].ok, e); sagOk.ciz([520, 310], [520 + b.okBoy, 310]); }), isaret.git(1, KONUM[i].hiz, ms)]);
      },
      su(i, ms = 700) { return sag ? sag.git(KONUM[i].su, ms) : Promise.resolve(); },
      konum(i, ms = 700) { return Promise.all([b.yukseklik(i, ms), b.sur(i, ms), b.su(i, ms)]); },
      kur(i) {
        b.i = i; tp.yuk(1, KONUM[i].h); sg.kur(i); isaret.hiz[1] = KONUM[i].hiz; b.okBoy = KONUM[i].ok;
        sagOk.ciz([520, 310], [520 + b.okBoy, 310]); if (sag) sag.yaz(KONUM[i].su);
      },
      suDus(ms = 700) { return Promise.all([sol.git(100, ms), sag.git(KONUM[b.i].su, ms)]); },
      akisAc(ms = 400) { return belir(c, [isaret.g, damla, solOk.g, sagOk.g], ms); },
    };
    if (o.vanaAcik) depo.vanaKur(true);
    return b;
  }

  /* ---- Venturi tüpü ---- */
  const VX = [240, 500, 780];
  function venturi(c, p, motor) {
    const g = c.S('g', {}, p), an = anim(c);
    const depo = depoCiz(c, g); depo.vanaKur(true);
    const tp = tup(c, g, { y: 310, bolumler: [{ a: 170, b: 330, h: 120 }, { a: 390, b: 610, h: 80 }, { a: 670, b: 890, h: 40 }] });
    const dus = VX.map((x, i) => dusey(c, g, tp, { x: x - 12, i, su: KONUM[i].su, olcu: true }));
    const isaret = isaretler(c, g, motor, tp, { hiz: [KONUM[0].hiz, KONUM[1].hiz, KONUM[2].hiz] });
    const durgun = c.S('g', {}, g);
    cizgi(c, durgun, [170, 80], [890, 80], RENK.gri, 2, { 'stroke-dasharray': '8 6' });
    yazi(c, durgun, 370, 68, 'durgun düzey', { size: 22, kalin: 600, renk: RENK.gri });
    const okBoy = [KONUM[0].ok, KONUM[1].ok, KONUM[2].ok];
    const oklar = VX.map((x, i) => ok(c, g, [x - okBoy[i] / 2, 310], [x + okBoy[i] / 2, 310], OK, 5));
    const ciz = (i) => oklar[i].ciz([VX[i] - okBoy[i] / 2, 310], [VX[i] + okBoy[i] / 2, 310]);
    gizle(isaret.g, durgun, oklar.map((o) => o.g));
    const eslesme = (h) => KONUM.find((k) => k.h === h);
    const v = {
      g, depo, tp, dus, isaret, oklar, okBoy, durgun,
      ayarla(hler, ms = 700) {
        const ps = [];
        hler.forEach((h, i) => {
          const k = eslesme(h), l0 = okBoy[i];
          ps.push(tp.git(i, h, ms), dus[i].git(k.su, ms), isaret.git(i, k.hiz, ms), an('ok' + i, ms, (e) => { okBoy[i] = lerp(l0, k.ok, e); ciz(i); }));
        });
        return Promise.all(ps);
      },
      kur(hler) {
        hler.forEach((h, i) => { const k = eslesme(h); tp.yuk(i, h); dus[i].yaz(k.su); isaret.hiz[i] = k.hiz; okBoy[i] = k.ok; ciz(i); });
      },
    };
    return v;
  }
  function venturiSatiri(c, p, y, harf, renk, o = {}) {
    const g = c.S('g', {}, p);
    VX.forEach((x, i) => yazi(c, g, x, y, harf + ALT[i], { size: o.size || 28, kalin: o.kalin || 700, renk }));
    gizle(g);
    return g;
  }

  return {
    anim, akisMotoru, akisDemeti, basincEtiketi, kuvvetOku, halka, ela, tup, dusey, isaretler, depoCiz, surgu,
    KONUM, VX, boruDuzenegi, venturi, venturiSatiri,
  };
})();
