/* Konu E (Isı aktarım yolları) derslerinin ortak çizim araçları: window.KIT_E. Düz vektör; izometrik figür yok.
   Sayfa yükleme sırası: ders.js, kit.js, a-araclar.js (KIT_A: titreşim tablosu), oda-sekil.js, e-araclar.js, ders dosyası.
   Ölçüler senaryonun okuma kılavuzundadır (plan/fizik/enerji/senaryolar/E-isi-aktarim-yollari.md). Bütün noktalar [x, y] tahta birimidir.

   yolOku(c, p, noktalar, renk, { kalin=6, kesikli=false, oran=1 }) → { g, ciz(oran), git(c, ms=1200, hedef=1, ease), oran }
        nokta dizisini izleyen, ucu oklu kalın çizgi (ODA'nın f.yol(...) dizisi buraya verilir); ciz(0..1) çizgiyi o oranına kadar çizer,
        ok başı çizginin ucunda gider. Çizgi ok başından kısa kaldığında (boy < 2,8 × kalın) görünmez.
   yaylar(c, p, { cx, cy, r0, r1, n=4, aralik=400, ms=1800, aci=28, yon=0, kalin=4, renk }) → Promise
        ışıma: (cx, cy) merkezinden yön derecesine (0 = sağa) doğru r0 → r1 büyüyen n yay (±aci°), her yay aralik ms arayla çıkar,
        ms sürer, saydamlık 0,9 → 0,2; bitince yaylar silinir. p grubunu yazılardan önce kur (yaylar yazının altında kalsın).
   serit(c, p, mot, { x, y, w, h, n, aralik=64, x0, cy, r=11 }) → { g, tane, say, dalga(c, { bas, son, aralik=420, ms=400 }), izGoster(c, ms), izler }
        tanecik şeridi: yatay dikdörtgen pencere (köşe 14), tek sıra tanecik (ilk tanecik x0, çizgi cy), 20 °C titreşimi.
        dalga: bas..son taneciklerini sırayla ısıtır (genlik 5 → 13, salınım 600 → 350 ms, i × aralik ms gecikme, turuncu halka);
        Promise döner. izler: her taneciğin ilk yerindeki soluk gri nokta (gizli başlar), izGoster ile belirir.
   tanecikKutusu(c, p, mot, { x, y, w=120, h=120, n, T=20, halkali=0, tane, daire=false, rx=14, r=9 }) → { g, tane, isit(c, i, ms), gez(c, ms, ease, secici), kur }
        yoğunluk kutusu ve akışkan penceresi. n verilirse tanecikler ızgaraya dizilir (yoğunluk yalnızca sayıyla gösterilir);
        tane = [{ x, y, x2, y2, T, halka }] verilirse (x, y kutunun sol üstüne göre) tanecik (x, y) → (x2, y2) gidebilir.
        halka: sıcak tanecikte turuncu halka. gez(c, ms, ease, secici): secici(tane) doğru olanları (x, y) → (x2, y2) götürür.
        isit(c, i, ms): i. taneciği 80 °C titreşimine ve halkaya getirir.
   gunes(c, p, { cx, cy, r }) → { g }           turuncu disk
   dunya(c, p, { cx, cy, r }) → { g, parla(a) }  koyu mavi disk, açık mavi çizgi; parla(0..0,35) Güneş'e dönük (sol) yarıyı turuncu parlatır
   tencere(c, p, { x, y, w=280, h=130, sap=300, su=true }) → { g, sapEl, suEl, x, y, w, h }
        köşesi (x, y) olan açık tencere, mavi yarı saydam su (üstten 30 birim aşağıda), sağda sap (sap=0: sapsız)
   alev(c, p, cx, ust, { w=26, h=48, renk }) → path     turuncu damla alev (ucu yukarı; ust = ucun y'si)
   kasik(c, p, { kx, ky, rx=40, ry=22, yol, kalin=20 }) → { g, sap }
        metal kaşık: (kx, ky) merkezli kepçe elipsi ve yol noktalarını izleyen sap (açık gri, koyu kenarlı)
   elKutusu(c, p, { x, y, w=100, h=80, termometre=false }) → { g, sutun(0..1) }
        içinde "el" yazan yuvarlatılmış kutu; termometre:true ise sağında küçük düz termometre (sarı sütun, sutun(oran) ile yükselir)
   alevYatay(c, p, cx, cy, { w=50, h=60 }) → path       (şiş ucundaki alev için; ucu yukarı, aynı alev biçimi, merkezle yerleşir)
   ucKutu(c, p, { adlar, renkler, x=[40, 355, 670], y=70, w=290, h=200, yazi=26 }) → { g, kutular, yaz(i, metin) }
        üç kutulu sınıflama yerleşimi; adlar kutu başlıklarıdır (uzunsa iki satıra bölünür). yaz(i, metin) i. kutunun listesine
        bir satır ekler ve yazıyı döndürür (gizli başlar). yazi = başlık puntosu; liste puntosu 2 eksiğidir. kutular[i] = { x, y, w, h, cx }.
   KIT_A.pencere tanecik penceresi (daire) ve KIT_A.termometre düz termometre Konu A'dan kullanılır; burada yenilenmez. */
window.KIT_E = (() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, rastgele } = window.KIT;
  const { ease, lerp, clamp } = Ders;
  const CAM = '#c3cbea', IC = '#0c1226', TANE = '#9cc2ff', METAL = '#b9c2da', METAL_KENAR = '#6f7898';
  const RAD = Math.PI / 180;

  /* ---- yol boyunca ilerleyen ok ---- */
  function yolOku(c, p, N, renk = RENK.isi, o = {}) {
    const w = o.kalin || 6, hl = Math.max(16, w * 2.8), hw = Math.max(8, w * 1.4);
    const L = [0];
    for (let i = 1; i < N.length; i++) L.push(L[i - 1] + Math.hypot(N[i][0] - N[i - 1][0], N[i][1] - N[i - 1][1]));
    const toplam = L[L.length - 1];
    const g = c.S('g', {}, p);
    const hat = c.S('path', { fill: 'none', stroke: renk, 'stroke-width': w, 'stroke-linecap': o.kesikli ? 'butt' : 'round', 'stroke-linejoin': 'round' }, g);
    if (o.kesikli) hat.setAttribute('stroke-dasharray', `${w * 2.2} ${w * 1.8}`);
    const uc = c.S('path', { fill: renk }, g);
    const nokta = (d) => {
      const t = clamp(d, 0, toplam);
      let i = 1;
      while (i < N.length - 1 && L[i] < t) i++;
      const k = (t - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [lerp(N[i - 1][0], N[i][0], k), lerp(N[i - 1][1], N[i][1], k)];
    };
    const durum = { oran: 0 };
    const ciz = (oran) => {
      durum.oran = clamp(oran, 0, 1);
      const d = durum.oran * toplam;
      if (d < hl) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const dl = d - hl * 0.6, pts = [];
      for (let i = 0; i < N.length; i++) if (L[i] < dl) pts.push(N[i]);
      pts.push(nokta(dl));
      hat.setAttribute('d', 'M' + pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L'));
      const tip = nokta(d), geri = nokta(d - hl), dx = tip[0] - geri[0], dy = tip[1] - geri[1], u = Math.hypot(dx, dy) || 1;
      const ux = dx / u, uy = dy / u, bx = tip[0] - ux * hl, by = tip[1] - uy * hl;
      uc.setAttribute('d', `M${tip[0].toFixed(1)},${tip[1].toFixed(1)} L${(bx - uy * hw).toFixed(1)},${(by + ux * hw).toFixed(1)} L${(bx + uy * hw).toFixed(1)},${(by - ux * hw).toFixed(1)} Z`);
    };
    ciz(o.oran == null ? 1 : o.oran);
    return {
      g, ciz, get oran() { return durum.oran; },
      git(c2, ms = 1200, hedef = 1, e = ease.linear) { const o0 = durum.oran; return c2.tween(ms, (k) => ciz(lerp(o0, hedef, k)), e); },
    };
  }

  /* ---- ışıma yayları ---- */
  function yaylar(c, p, o) {
    const n = o.n || 4, aralik = o.aralik == null ? 400 : o.aralik, ms = o.ms || 1800, aci = o.aci || 28, yon = (o.yon || 0) * RAD;
    const g = c.S('g', {}, p), renk = o.renk || RENK.isi;
    const yaylar = [];
    for (let i = 0; i < n; i++) yaylar.push(c.S('path', { fill: 'none', stroke: renk, 'stroke-width': o.kalin || 4, 'stroke-linecap': 'round' }, g));
    yaylar.forEach((y) => { y.style.opacity = 0; });
    const toplam = (n - 1) * aralik + ms;
    return c.tween(toplam, (e) => {
      yaylar.forEach((y, i) => {
        const k = clamp((e * toplam - i * aralik) / ms, 0, 1);
        if (k <= 0 || k >= 1) { y.style.opacity = 0; return; }
        const r = lerp(o.r0, o.r1, k), a1 = yon - aci * RAD, a2 = yon + aci * RAD;
        y.setAttribute('d', `M${o.cx + r * Math.cos(a1)},${o.cy + r * Math.sin(a1)} A${r},${r} 0 0 1 ${o.cx + r * Math.cos(a2)},${o.cy + r * Math.sin(a2)}`);
        y.style.opacity = lerp(0.9, 0.2, k);
      });
    }, ease.linear).then(() => g.remove());
  }

  /* ---- tanecik kümesi (şerit, yoğunluk kutusu, akışkan penceresi için ortak çekirdek) ---- */
  function kume(c, p, mot, o) {
    const r = o.r || 9, g = c.S('g', {}, p);
    const al = o.alan;
    if (al.daire) c.S('circle', { cx: al.cx, cy: al.cy, r: al.r, fill: IC, stroke: o.cerceve || RENK.ince, 'stroke-width': o.cw || 2 }, g);
    else c.S('rect', { x: al.x, y: al.y, width: al.w, height: al.h, rx: al.rx == null ? 14 : al.rx, fill: IC, stroke: o.cerceve || RENK.ince, 'stroke-width': o.cw || 2 }, g);
    const izKatman = c.S('g', {}, g), katman = c.S('g', {}, g);
    const tane = o.tane.map((q, i) => {
      const halka = c.S('circle', { r: r + 4, fill: 'none', stroke: RENK.isi, 'stroke-width': 3 }, katman);
      const el = c.S('circle', { r, fill: TANE, stroke: IC, 'stroke-width': 1.5 }, katman);
      const rnd = rastgele((o.tohum || 1) * 104729 + i * 7919);
      const a = o.yatay ? (rnd() - 0.5) * 0.7 : rnd() * Math.PI * 2;
      const T = q.T == null ? 20 : q.T;
      const s = { el, halka, bx: q.x, by: q.y, ex: q.x2 == null ? q.x : q.x2, ey: q.y2 == null ? q.y : q.y2, T, ring: q.halka ? 1 : 0, mv: 0, a, f: rnd() * Math.PI * 2, halkali: !!q.halka };
      return s;
    });
    const konum = (q, titret) => {
      let x = lerp(q.bx, q.ex, q.mv), y = lerp(q.by, q.ey, q.mv);
      if (titret) {
        const tt = window.KIT_A.titresim(q.T), sn = Math.sin(q.f) * tt.genlik;
        x += sn * Math.cos(q.a); y += sn * Math.sin(q.a);
      }
      if (al.daire) {
        const d = Math.hypot(x - al.cx, y - al.cy), sn = al.r - r - 6;
        if (d > sn) { x = al.cx + (x - al.cx) * sn / d; y = al.cy + (y - al.cy) * sn / d; }
      } else {
        x = clamp(x, al.x + r + 4, al.x + al.w - r - 4); y = clamp(y, al.y + r + 4, al.y + al.h - r - 4);
      }
      return [x, y];
    };
    const ciz = () => {
      tane.forEach((q) => {
        const [x, y] = konum(q, true);
        q.el.setAttribute('cx', x); q.el.setAttribute('cy', y);
        q.halka.setAttribute('cx', x); q.halka.setAttribute('cy', y);
        q.halka.style.opacity = q.ring;
      });
    };
    mot.ekle((dt) => { tane.forEach((q) => { q.f += dt * Math.PI * 2 * 1000 / window.KIT_A.titresim(q.T).sure; }); ciz(); });
    ciz();
    return {
      g, tane, izKatman, ciz,
      isit(c2, i, ms = 400) {
        const q = tane[i], T0 = q.T, r0 = q.ring;
        return c2.tween(ms, (k) => { q.T = lerp(T0, 80, k); q.ring = lerp(r0, 1, k); }, ease.out);
      },
      gez(c2, ms = 1200, e = ease.inOut, secici = () => true) {
        const sec = tane.filter(secici), m0 = sec.map((q) => q.mv);
        return c2.tween(ms, (k) => sec.forEach((q, j) => { q.mv = lerp(m0[j], 1, k); }), e);
      },
      kur(i, T, ring) { tane[i].T = T; tane[i].ring = ring ? 1 : 0; },
    };
  }

  /* ---- tanecik şeridi ---- */
  function serit(c, p, mot, o) {
    const n = o.n, aralik = o.aralik || 64, x0 = o.x0 == null ? o.x + o.w / 2 - (n - 1) * aralik / 2 : o.x0, cy = o.cy == null ? o.y + o.h / 2 : o.cy;
    const tane = [];
    for (let i = 0; i < n; i++) tane.push({ x: x0 + i * aralik, y: cy, T: 20 });
    const k = kume(c, p, mot, { alan: { x: o.x, y: o.y, w: o.w, h: o.h, rx: 14 }, r: o.r || 11, tane, tohum: o.tohum || 3, yatay: true });
    const izler = tane.map((q) => c.S('circle', { cx: q.x, cy: q.y, r: 3, fill: RENK.gri }, k.izKatman));
    gizle(izler);
    return {
      g: k.g, tane: k.tane, izler,
      dalga(c2, d = {}) {
        const bas = d.bas || 0, son = d.son == null ? n - 1 : d.son, ar = d.aralik || 420, ms = d.ms || 400, toplam = (son - bas) * ar + ms;
        return c2.tween(toplam, (e) => {
          for (let i = bas; i <= son; i++) {
            const t = clamp((e * toplam - (i - bas) * ar) / ms, 0, 1), q = k.tane[i], s = ease.out(t);
            q.T = lerp(20, 80, s); q.ring = s;
          }
        }, ease.linear);
      },
      izGoster(c2, ms = 300) { return belir(c2, izler, ms); },
    };
  }

  /* ---- yoğunluk kutusu / akışkan penceresi ---- */
  function izgara(n, w, h) {
    const sat = n > 4 ? 2 : (n > 1 ? 2 : 1), sut = Math.ceil(n / sat), P = [];
    for (let i = 0; i < n; i++) {
      const sa = Math.floor(i / sut), su = i % sut;
      P.push({ x: w * (su + 0.5) / sut, y: h * (sa + 0.5) / sat });
    }
    return P;
  }
  function tanecikKutusu(c, p, mot, o) {
    const w = o.w || 120, h = o.h || 120, ox = o.x, oy = o.y;
    let tane = o.tane;
    if (!tane) {
      tane = izgara(o.n, w, h).map((q, i) => ({ x: q.x, y: q.y, T: o.T == null ? 20 : o.T, halka: i < (o.halkali || 0) }));
    }
    const kaydir = tane.map((q) => ({ x: q.x + ox, y: q.y + oy, x2: q.x2 == null ? undefined : q.x2 + ox, y2: q.y2 == null ? undefined : q.y2 + oy, T: q.T, halka: q.halka }));
    const alan = o.daire ? { daire: true, cx: ox + w / 2, cy: oy + h / 2, r: w / 2 } : { x: ox, y: oy, w, h, rx: o.rx == null ? 14 : o.rx };
    const k = kume(c, p, mot, { alan, r: o.r || 9, tane: kaydir, tohum: o.tohum || 2, cerceve: o.cerceve, cw: o.cw });
    return { g: k.g, tane: k.tane, isit: k.isit, gez: k.gez, kur: k.kur };
  }

  /* ---- Güneş ve Dünya ---- */
  function gunes(c, p, o) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: o.cx, cy: o.cy, r: o.r, fill: RENK.isi }, g);
    return { g };
  }
  function dunya(c, p, o) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: o.cx, cy: o.cy, r: o.r, fill: '#1b3a78' }, g);
    const par = c.S('path', { d: `M${o.cx},${o.cy - o.r} A${o.r},${o.r} 0 0 0 ${o.cx},${o.cy + o.r} Z`, fill: RENK.isi }, g);
    par.style.opacity = 0;
    c.S('circle', { cx: o.cx, cy: o.cy, r: o.r, fill: 'none', stroke: TANE, 'stroke-width': 3 }, g);
    return { g, parla(a) { par.style.opacity = a; }, get parlama() { return +par.style.opacity; } };
  }

  /* ---- alev, tencere, kaşık, el ---- */
  function alev(c, p, cx, ust, o = {}) {
    const w = o.w || 26, h = o.h || 48;
    const d = `M${cx},${ust} C${cx + w * 0.2},${ust + h * 0.3} ${cx + w * 0.5},${ust + h * 0.5} ${cx + w * 0.5},${ust + h * 0.72} C${cx + w * 0.5},${ust + h * 0.9} ${cx + w * 0.25},${ust + h} ${cx},${ust + h} C${cx - w * 0.25},${ust + h} ${cx - w * 0.5},${ust + h * 0.9} ${cx - w * 0.5},${ust + h * 0.72} C${cx - w * 0.5},${ust + h * 0.5} ${cx - w * 0.2},${ust + h * 0.3} ${cx},${ust} Z`;
    return c.S('path', { d, fill: o.renk || RENK.isi }, p);
  }
  function alevYatay(c, p, cx, cy, o = {}) {
    const w = o.w || 50, h = o.h || 60;
    return alev(c, p, cx, cy - h / 2, { w, h });
  }
  function tencere(c, p, o) {
    const w = o.w || 280, h = o.h || 130, x = o.x, y = o.y, sap = o.sap == null ? 300 : o.sap, g = c.S('g', {}, p);
    let sapEl = null;
    if (sap > 0) sapEl = c.S('rect', { x: x + w - 4, y: y + h * 0.42, width: sap + 4, height: 30, rx: 8, fill: IC, stroke: CAM, 'stroke-width': 3 }, g);
    c.S('path', { d: `M${x},${y} V${y + h - 12} Q${x},${y + h} ${x + 12},${y + h} H${x + w - 12} Q${x + w},${y + h} ${x + w},${y + h - 12} V${y} Z`, fill: IC }, g);
    let suEl = null;
    if (o.su !== false) suEl = c.S('rect', { x: x + 2, y: y + 30, width: w - 4, height: h - 32, rx: 8, fill: RENK.soguk, 'fill-opacity': 0.3 }, g);
    c.S('path', { d: `M${x},${y} V${y + h - 12} Q${x},${y + h} ${x + 12},${y + h} H${x + w - 12} Q${x + w},${y + h} ${x + w},${y + h - 12} V${y}`, fill: 'none', stroke: CAM, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    return { g, sapEl, suEl, x, y, w, h };
  }
  function kasik(c, p, o) {
    const g = c.S('g', {}, p), kalin = o.kalin || 20, d = 'M' + o.yol.map((q) => q[0] + ',' + q[1]).join(' L');
    c.S('path', { d, fill: 'none', stroke: METAL_KENAR, 'stroke-width': kalin + 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    const sap = c.S('path', { d, fill: 'none', stroke: METAL, 'stroke-width': kalin - 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    c.S('ellipse', { cx: o.kx, cy: o.ky, rx: o.rx || 40, ry: o.ry || 22, fill: METAL, stroke: METAL_KENAR, 'stroke-width': 3 }, g);
    return { g, sap };
  }
  function elKutusu(c, p, o) {
    const w = o.w || 100, h = o.h || 80, g = c.S('g', {}, p);
    kutu(c, g, o.x, o.y, w, h, { rx: 14 });
    yazi(c, g, o.x + w / 2, o.y + h / 2 + 10, 'el', { size: 28, kalin: 700 });
    let sutun = () => {};
    if (o.termometre) {
      const tx = o.x + w + 26, ty = o.y + h;
      c.S('rect', { x: tx - 8, y: o.y, width: 16, height: h, rx: 8, fill: IC, stroke: CAM, 'stroke-width': 2 }, g);
      const col = c.S('rect', { x: tx - 4, width: 8, rx: 3, fill: RENK.sicaklik }, g);
      sutun = (e) => { const b = 8 + (h - 24) * clamp(e, 0, 1); col.setAttribute('y', ty - 8 - b); col.setAttribute('height', b); };
      sutun(0);
    }
    return { g, sutun };
  }

  /* ---- üç kutulu sınıflama ---- */
  function bol(ad) {
    if (ad.length < 17) return [ad];
    const k = ad.split(' ');
    let en = 1, fark = 1e9;
    for (let i = 1; i < k.length; i++) {
      const a = k.slice(0, i).join(' ').length, b = k.slice(i).join(' ').length;
      if (Math.abs(a - b) < fark) { fark = Math.abs(a - b); en = i; }
    }
    return [k.slice(0, en).join(' '), k.slice(en).join(' ')];
  }
  function ucKutu(c, p, o) {
    const xs = o.x || [40, 355, 670], w = o.w || 290, y = o.y == null ? 70 : o.y, h = o.h || 200, z = o.yazi || 26;
    const g = c.S('g', {}, p), sayac = [0, 0, 0], liste0 = y + 12 + z * 1.1 + z * 1.2 + z * 1.6;
    const kutular = o.adlar.map((ad, i) => {
      kutu(c, g, xs[i], y, w, h, { rx: 14, renk: o.renkler ? o.renkler[i] : RENK.kenarlik, w: 3 });
      bol(ad).forEach((s, j) => yazi(c, g, xs[i] + w / 2, y + 12 + z * 1.1 + j * z * 1.2, s, { size: z, kalin: 700 }));
      return { x: xs[i], y, w, h, cx: xs[i] + w / 2 };
    });
    return {
      g, kutular,
      yaz(i, metin) {
        const t = yazi(c, g, kutular[i].cx, liste0 + sayac[i] * z * 1.5, metin, { size: z - 2, kalin: 600, renk: RENK.soluk });
        sayac[i] += 1; gizle(t);
        return t;
      },
    };
  }

  return { yolOku, yaylar, serit, tanecikKutusu, gunes, dunya, tencere, alev, alevYatay, kasik, elKutusu, ucKutu };
})();
