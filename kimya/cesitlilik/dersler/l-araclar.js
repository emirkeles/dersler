/* Konu L (Adezyon ve kohezyon) çizim araçları: window.KIT_L. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Bu konuda yük çizilmez; renk yalnızca çekim içindir (yeşil çizgi).
   Sıvı tanecikleri nötr gri kürelerdir; kohezyon ve adezyon ikisi de çekmedir, ikisi de yeşildir ve renkle değil
   etiketle, konumla ayrılır: kohezyon çizgileri sıvının tanecikleri arasında, adezyon çizgileri sıvı ile yüzey arasındadır.
   Çubuklarda adezyon dolu, kohezyon çerçevelidir. Çizgi kalınlığı ve çubuk boyu büyüklük sırasını gösterir; kuvvet değeri yazılmaz.
   Temas açısı gösterilmez. Mavi ve kırmızı kullanılmaz (eksi yük ve itme için ayrılmıştır).
   Araçlar:
     damlaYuzey(c, p, o)     yüzey (cam, yaprak, kumaş…) ve üstünde yan görünüşte damla; yuvarlak ile yayılmış arası ayarlanır
     buyutme(c, p, o)        damlanın yüzeyle buluştuğu yerin büyütülmüşü: sıvı tanecikleri, yüzey tanecikleri, kohezyon ve adezyon çizgileri
     kuvvetCubuklari(c, p, o) yan yana adezyon (dolu) ve kohezyon (çerçeveli) çubukları, büyük olanın üstünde işaret
     tup(c, p, o)            dar cam tüp kesiti ve içindeki sıvının yüzeyi (içbükey, düz, dışbükey)
     kapliTup(c, p, o)       kaba daldırılmış ince tüp: seviye çizgisi, tüpte yükselme ya da alçalma
     yuzeyMolekulu(c, p, o)  sıvı kesiti: iç ve yüzey molekülü, çekim okları, yüzeyin içeri çekilmesi
     sivi4(c, p, o)          dört sıvı kartı (ad, formül, çevrilen yüzey gerilimi paneli)
     cubuk4(c, p, o)         dört yatay çubuk, ortak ölçek
     kartTahtasi(c, p, o)    kutulu sınıflandırma tahtası (sinifla ile birlikte)
     kanTupu(c, p, o)        parmak ucu, kan damlası, ince tüp
     bitkiSu(c, p, o)        kök–gövde–yaprak ve gövdedeki ince borunun büyütülmüşü
     kureH2O(c, p, x, y, k)  gri küre modeliyle su molekülü */
window.KIT_L = (() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { lerp, ease, clamp } = Ders;

  /* ---- nötr tonlar ---- */
  const GRI = {
    su: '#cdcdcd', suK: '#4d4d4d', suDamla: '#c8c8c8', damlaK: '#f1f1f1',
    civa: '#9aa3ad', civaK: '#2f343a', civaDamla: '#8e98a3',
    yuz: '#6f6f6f', yuzK: '#383838', blok: '#575757', blokK: '#8c8c8c', doku: '#8f8f8f',
    cam: '#d0d0d0', tahta: '#10162b', islak: '#3f3f3f', koyu: '#8a93ad', acik: '#e3e7f3',
  };
  let KIMLIK = 0;

  /* ---- yardımcılar ---- */
  /* Tabanı (cx-a, y)–(cx+a, y) ve yüksekliği h olan daire dilimi (damla). */
  const damlaYolu = (cx, y, a, h) => {
    const R = (a * a + h * h) / (2 * h);
    return `M${cx - a},${y} A${R},${R} 0 ${h > a ? 1 : 0} 1 ${cx + a},${y} Z`;
  };
  /* Gruba ölçek: (x, y) noktası yerinde kalır. */
  const olcekle = (g, k, x, y) => { if (k && k !== 1) g.setAttribute('transform', `translate(${x},${y}) scale(${k}) translate(${-x},${-y})`); };
  const ince = (w) => (w === 'kalin' ? 6.5 : w === 'yok' ? 0 : 2.4);

  /* ---- damla ve yüzey ----
     o: { cx, y (yüzeyin üst kenarı), w, th, ad (altına yazılan ad), sivi: 'su' | 'civa', t (0 yuvarlak … 1 yayılmış),
          doku: 'kumas' | 'yaprak', islak (kumaşta damlanın altı koyulaşır), k (ölçek), a, h (doğrudan damla ölçüsü) }
     Dönen: { g, damla, sekil(a, h), ayarla(t), git(t, ms) } */
  function damlaYuzey(c, p, o) {
    const g = c.S('g', {}, p), cx = o.cx, y = o.y, w = o.w || 360, th = o.th || 44, civa = o.sivi === 'civa';
    const yz = c.S('g', {}, g);
    c.S('rect', { x: cx - w / 2, y, width: w, height: th, rx: 6, fill: GRI.blok, stroke: GRI.blokK, 'stroke-width': 2 }, yz);
    if (o.doku === 'kumas') {
      for (let i = 1; i < 4; i++) cizgi(c, yz, [cx - w / 2 + 6, y + i * th / 4], [cx + w / 2 - 6, y + i * th / 4], GRI.doku, 2.2, { 'stroke-dasharray': '7 5', 'stroke-linecap': 'butt' });
    } else if (o.doku === 'yaprak') {
      cizgi(c, yz, [cx - w / 2 + 10, y + th / 2], [cx + w / 2 - 10, y + th / 2], GRI.doku, 3);
    }
    if (o.ad) yazi(c, g, cx, y + th + 28, o.ad, { size: 22, kalin: 600, renk: RENK.soluk });
    const islak = o.islak ? c.S('rect', { y, height: 16, rx: 4, fill: GRI.islak, opacity: 0 }, yz) : null;
    const damla = c.S('path', { fill: civa ? GRI.civaDamla : GRI.suDamla, stroke: civa ? '#dfe3e8' : GRI.damlaK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    const api = { g, damla, yz, a: 0, h: 0 };
    api.sekil = (a, h) => {
      api.a = a; api.h = h; damla.setAttribute('d', damlaYolu(cx, y, a, h));
      if (islak) { islak.setAttribute('x', cx - a - 14); islak.setAttribute('width', 2 * a + 28); islak.setAttribute('opacity', clamp((a - 70) / 50, 0, 1) * 0.85); }
    };
    api.ayarla = (t) => api.sekil(lerp(civa ? 40 : 50, 150, t), lerp(civa ? 70 : 98, 16, t));
    api.git = (t, ms = 900) => { const a0 = api.a, h0 = api.h, t0 = (a0 - 50) / 100; return c.tween(ms, (e) => api.ayarla(lerp(t0, t, e)), ease.inOut); };
    if (o.a != null) api.sekil(o.a, o.h); else api.ayarla(o.t == null ? 0 : o.t);
    olcekle(g, o.k, cx, y);
    return api;
  }

  /* ---- büyütme: yüzeyle buluşan yerin taneciklere kadar büyütülmüşü ----
     o: { cx, cy, r, sivi: 'su' | 'civa', yuzey: 'cam' | 'yaprak', koh, adh ('ince' | 'kalin' | 'yok'), etiket }
     Dönen: { g, kohG, adhG, et: { koh, adh, sivi, yuzey }, ayarla({ koh, adh }, ms) } */
  function buyutme(c, p, o) {
    const cx = o.cx, cy = o.cy, r = o.r || 186, civa = o.sivi === 'civa', id = 'lb' + (++KIMLIK), D = 46;
    const g = c.S('g', {}, p), defs = c.S('defs', {}, g), cp = c.S('clipPath', { id }, defs);
    c.S('circle', { cx, cy, r }, cp);
    c.S('circle', { cx, cy, r, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, g);
    const ic = c.S('g', { 'clip-path': `url(#${id})` }, g), kohG = c.S('g', {}, ic), adhG = c.S('g', {}, ic), taneG = c.S('g', {}, ic);
    // Yüzeyin tanecikleri (koyu gri), iki sıra.
    const yz = [];
    [[112, 0], [152, D / 2]].forEach(([dy, sap]) => {
      for (let i = -5; i <= 5; i++) {
        const P = [cx + i * D + sap, cy + dy]; yz.push(P);
        c.S('circle', { cx: P[0], cy: P[1], r: 16, fill: GRI.yuz, stroke: GRI.yuzK, 'stroke-width': 2 }, taneG);
      }
    });
    // Sıvının tanecikleri: altta 7, üstte 6, 7, 6.
    const sat = [[46, -3, 3, 0], [6, -2.5, 2.5, 0.5], [-34, -3, 3, 0], [-74, -2.5, 2.5, 0.5]].map(([dy, a, b]) => {
      const dizi = [];
      for (let i = a; i <= b; i++) dizi.push([cx + i * D, cy + dy]);
      return dizi;
    });
    sat.forEach((dizi) => dizi.forEach((P) => {
      c.S('circle', { cx: P[0], cy: P[1], r: civa ? 16 : 15, fill: civa ? GRI.civa : GRI.su, stroke: civa ? GRI.civaK : GRI.suK, 'stroke-width': civa ? 3 : 2 }, taneG);
    }));
    // Kohezyon çizgileri: üstteki üç sıranın komşuları.
    const kohL = [], adhL = [];
    const komsu = (A, B) => Math.hypot(A[0] - B[0], A[1] - B[1]) < D + 6;
    [1, 2, 3].forEach((k) => {
      sat[k].forEach((A, i) => {
        if (sat[k][i + 1]) kohL.push(cizgi(c, kohG, A, sat[k][i + 1], RENK.cekme, 2.4));
        if (k < 3) sat[k + 1].forEach((B) => { if (komsu(A, B)) kohL.push(cizgi(c, kohG, A, B, RENK.cekme, 2.4)); });
      });
    });
    // Adezyon çizgileri: alt sıradaki her sıvı tanecikten altındaki yüzey tanecikine.
    sat[0].forEach((A) => {
      const B = yz.find((q) => Math.abs(q[0] - A[0]) < 3 && q[1] === cy + 112);
      if (B) adhL.push(cizgi(c, adhG, A, B, RENK.cekme, 2.4));
    });
    const X = cx + r + 14, et = {};
    et.koh = yazi(c, g, X, cy - 46, 'kohezyon', { hiza: 'start', size: 24, kalin: 700, renk: RENK.cekme });
    et.sivi = yazi(c, g, X, cy + 6, civa ? 'cıva' : 'su', { hiza: 'start', size: 24, kalin: 600 });
    et.adh = yazi(c, g, X, cy + 86, 'adezyon', { hiza: 'start', size: 24, kalin: 700, renk: RENK.cekme });
    et.yuzey = yazi(c, g, X, cy + 138, o.yuzey === 'yaprak' ? 'yaprak' : 'cam', { hiza: 'start', size: 24, kalin: 600 });
    const koh = { w: ince(o.koh || 'ince') }, adh = { w: ince(o.adh || 'ince') };
    const yaz = () => { kohL.forEach((l) => l.setAttribute('stroke-width', koh.w)); adhL.forEach((l) => l.setAttribute('stroke-width', adh.w)); };
    yaz();
    return {
      g, kohG, adhG, et,
      ayarla(s, ms = 800) {
        const k0 = koh.w, a0 = adh.w, k1 = s.koh ? ince(s.koh) : k0, a1 = s.adh ? ince(s.adh) : a0;
        return c.tween(ms, (e) => { koh.w = lerp(k0, k1, e); adh.w = lerp(a0, a1, e); yaz(); }, ease.inOut);
      },
    };
  }

  /* ---- adezyon ve kohezyon çubukları ----
     o: { x (orta), y (taban), h (en uzun çubuk), a, k (0…1), etiket }
     Çubuklar aynı yeşildir: adezyon dolu, kohezyon çerçeveli. Büyük olanın üstünde işaret, eşitse “=”. */
  function kuvvetCubuklari(c, p, o) {
    const g = c.S('g', {}, p), H = o.h || 150, W = 52, ara = 56, x = o.x, y = o.y;
    const xa = x - (ara + W) / 2, xk = x + (ara + W) / 2;
    const taban = cizgi(c, g, [x - 110, y], [x + 110, y], RENK.ince, 2);
    const ra = c.S('rect', { x: xa - W / 2, y, width: W, height: 0, rx: 5, fill: RENK.cekme }, g);
    const rk = c.S('rect', { x: xk - W / 2, y, width: W, height: 0, rx: 5, fill: RENK.cekme, 'fill-opacity': 0.14, stroke: RENK.cekme, 'stroke-width': 4 }, g);
    if (o.etiket !== false) {
      yazi(c, g, xa, y + 28, 'adezyon', { size: 20, kalin: 600 });
      yazi(c, g, xk, y + 28, 'kohezyon', { size: 20, kalin: 600 });
    }
    const uc = c.S('path', { fill: RENK.vurgu }, g), esit = yazi(c, g, x, y - 20, '=', { size: 34, kalin: 700, renk: RENK.vurgu });
    const d = { a: 0, k: 0 };
    const ciz = () => {
      const ha = d.a * H, hk = d.k * H;
      ra.setAttribute('y', y - ha); ra.setAttribute('height', ha);
      rk.setAttribute('y', y - hk); rk.setAttribute('height', hk);
      const fark = d.a - d.k, uste = Math.max(ha, hk);
      if (Math.max(d.a, d.k) < 0.03) { uc.style.opacity = 0; esit.style.opacity = 0; return; }
      if (Math.abs(fark) < 0.03) {
        uc.style.opacity = 0; esit.style.opacity = 1; esit.setAttribute('y', y - uste - 16);
      } else {
        esit.style.opacity = 0; uc.style.opacity = 1;
        const bx = fark > 0 ? xa : xk, by = y - (fark > 0 ? ha : hk) - 8;
        uc.setAttribute('d', `M${bx - 10},${by - 14} L${bx + 10},${by - 14} L${bx},${by} Z`);
      }
    };
    const api = {
      g, taban,
      ayarla(a, k) { d.a = a; d.k = k; ciz(); },
      git(a, k, ms = 800) { const a0 = d.a, k0 = d.k; return c.tween(ms, (e) => { d.a = lerp(a0, a, e); d.k = lerp(k0, k, e); ciz(); }, ease.inOut); },
      deger: () => ({ a: d.a, k: d.k }),
    };
    api.ayarla(o.a || 0, o.k || 0);
    return api;
  }

  /* ---- dar cam tüp ve sıvının yüzeyi ----
     o: { x (orta), y (tüpün üstü), h, w, e (-1 dışbükey … 0 düz … 1 içbükey), sivi, dolgu (0…1), k }
     Dönen: { g, ayarla(e), git(e, ms), kenar: [xl, xr], yuzeyY } */
  function tup(c, p, o) {
    const g = c.S('g', {}, p), x = o.x, y = o.y, H = o.h || 220, W = o.w || 84, civa = o.sivi === 'civa';
    const xl = x - W / 2, xr = x + W / 2, yt = y + H * (1 - (o.dolgu == null ? 0.5 : o.dolgu)), yb = y + H;
    const sivi = c.S('path', { fill: civa ? GRI.civa : GRI.su, 'fill-opacity': 0.9 }, g);
    const yuz = c.S('path', { fill: 'none', stroke: civa ? '#dfe3e8' : GRI.damlaK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const duvar = c.S('path', { d: `M${xl},${y} L${xl},${yb} L${xr},${yb} L${xr},${y}`, fill: 'none', stroke: '#c9c9c9', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const api = { g, e: 0, kenar: [xl, xr], duvar };
    api.ayarla = (e) => {
      api.e = e;
      const ye = yt - 20 * e, ym = yt + 12 * e, yc = 2 * ym - ye;
      sivi.setAttribute('d', `M${xl},${ye} Q${x},${yc} ${xr},${ye} L${xr},${yb} L${xl},${yb} Z`);
      yuz.setAttribute('d', `M${xl},${ye} Q${x},${yc} ${xr},${ye}`);
    };
    api.git = (e, ms = 800) => { const e0 = api.e; return c.tween(ms, (t) => api.ayarla(lerp(e0, e, t)), ease.inOut); };
    api.ayarla(o.e || 0);
    olcekle(g, o.k, x, y);
    return api;
  }

  /* ---- kaba daldırılmış ince tüp ----
     o: { x (kabın ortası), yK (kaptaki sıvı seviyesi), sivi, e (0 … 1: yükselme ya da alçalma), k }
     su: tüpte seviye kabın üstüne çıkar, yüzey içbükey; cıva: kabın altına iner, yüzey dışbükey. */
  function kapliTup(c, p, o) {
    const g = c.S('g', {}, p), x = o.x, yK = o.yK, civa = o.sivi === 'civa', KW = 200, KH = 150, TW = 46, YUK = civa ? -34 : 62;
    const dolgu = civa ? GRI.civa : GRI.su, kapY = yK - 36, kapB = yK + KH - 40;
    // Kap: açık üstlü, iki yan duvar ve taban; sıvı seviyeye kadar.
    c.S('rect', { x: x - KW / 2, y: yK, width: KW, height: kapB - yK, fill: dolgu, 'fill-opacity': 0.9 }, g);
    c.S('path', { d: `M${x - KW / 2},${kapY} L${x - KW / 2},${kapB} L${x + KW / 2},${kapB} L${x + KW / 2},${kapY}`, fill: 'none', stroke: '#c9c9c9', 'stroke-width': 5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    // Tüp: iç boşluk kart rengiyle örtülür, içinde sıvı kendi seviyesindedir.
    const tx0 = x - TW / 2, tx1 = x + TW / 2, tUst = yK - 150, tAlt = kapB - 26;
    c.S('rect', { x: tx0, y: tUst, width: TW, height: tAlt - tUst, fill: GRI.tahta }, g);
    const sivi = c.S('path', { fill: dolgu, 'fill-opacity': 0.9 }, g);
    const yuz = c.S('path', { fill: 'none', stroke: civa ? '#dfe3e8' : GRI.damlaK, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    c.S('path', { d: `M${tx0},${tUst} L${tx0},${tAlt} M${tx1},${tUst} L${tx1},${tAlt}`, fill: 'none', stroke: '#c9c9c9', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, g);
    // Kabın seviye çizgisi tüpten geçen ince kesikli çizgidir.
    const sev = cizgi(c, g, [x - KW / 2 - 24, yK], [x + KW / 2 + 24, yK], RENK.vurgu, 2, { 'stroke-dasharray': '6 6', 'stroke-linecap': 'butt' });
    const api = { g, e: 0, sev, yK };
    api.ayarla = (e) => {
      api.e = e;
      const yt = yK - YUK * e, em = civa ? -1 : 1, eg = e * em; // içbükey +, dışbükey −
      const ye = yt - 18 * eg, ym = yt + 11 * eg, yc = 2 * ym - ye;
      sivi.setAttribute('d', `M${tx0},${ye} Q${x},${yc} ${tx1},${ye} L${tx1},${tAlt} L${tx0},${tAlt} Z`);
      yuz.setAttribute('d', `M${tx0},${ye} Q${x},${yc} ${tx1},${ye}`);
    };
    api.git = (e, ms = 1200) => { const e0 = api.e; return c.tween(ms, (t) => api.ayarla(lerp(e0, e, t)), ease.inOut); };
    api.ayarla(o.e || 0);
    olcekle(g, o.k, x, yK);
    return api;
  }

  /* ---- sıvı kesiti: iç molekül ve yüzey molekülü ----
     o: { cx, y (yüzey sırası), r }
     Dönen: { g, ic: { mol, oklar, sifir }, yz: { mol, oklar, birlesik }, cek(ms), yuzeyCizgisi, etiketler } */
  function yuzeyMolekulu(c, p, o) {
    const g = c.S('g', {}, p), cx = o.cx, y0 = o.y, D = 96, DY = 83, R = 20, RB = 29;
    const yaz = (e) => { e.style.opacity = 0; return e; };
    // Satırlar: 0: 7, 1: 6, 2: 7, 3: 6, 4: 7 molekül.
    const mol = [], satir = [];
    for (let s = 0; s < 5; s++) {
      const n = s % 2 ? 6 : 7, dizi = [];
      for (let i = 0; i < n; i++) {
        const P = [cx + (i - (n - 1) / 2) * D, y0 + s * DY], e = c.S('circle', { cx: P[0], cy: P[1], r: R, fill: GRI.su, stroke: GRI.suK, 'stroke-width': 2 }, g);
        dizi.push({ P, e }); mol.push({ P, e });
      }
      satir.push(dizi);
    }
    // Yüzey çizgisi: üst satırın üstünde ince çizgi.
    const yuzeyC = cizgi(c, g, [cx - 3 * D - R - 10, y0 - R - 8], [cx + 3 * D + R + 10, y0 - R - 8], GRI.acik, 3);
    // Büyütülmüş iki molekül: ortadaki iç molekül ve ortadaki yüzey molekülü.
    const Pic = satir[2][3].P, Pyz = satir[0][3].P;
    const buyut = (P) => c.S('circle', { cx: P[0], cy: P[1], r: RB, fill: '#e6e6e6', stroke: GRI.damlaK, 'stroke-width': 4 }, g);
    const bic = yaz(buyut(Pic)), byz = yaz(buyut(Pyz));
    const aci = (P, a, boy = 60) => { const A = ileri(P, a, RB + 4), B = ileri(P, a, RB + 4 + boy); return ok(c, g, A, B, RENK.cekme, 5); };
    const icOk = [0, 60, 120, 180, 240, 300].map((d) => yaz(aci(Pic, d * Math.PI / 180, 38).g));
    const yzOk = [0, 60, 120, 180].map((d) => yaz(aci(Pyz, d * Math.PI / 180, 38).g));
    // Yüzey molekülü: yanlara ve alta (0°, 180°, 60°, 120°); üst yönler yok.
    const birlesik = yaz(ok(c, g, [Pyz[0], Pyz[1] + RB + 4], [Pyz[0], Pyz[1] + RB + 70], RENK.cekme, 10).g);
    const sifir = yaz(yazi(c, g, Pic[0], Pic[1] + 10, '0', { size: 30, kalin: 700, renk: '#10162b' }));
    const X = cx + 3 * D + 70, et = {};
    et.ic = yaz(yazi(c, g, X, Pic[1] - 6, 'iç molekül', { hiza: 'start', size: 24, kalin: 600 }));
    et.yz = yaz(yazi(c, g, X, Pyz[1] + 8, 'yüzey molekülü', { hiza: 'start', size: 24, kalin: 600 }));
    et.koh = yaz(yazi(c, g, X, Pic[1] + 28, 'kohezyon', { hiza: 'start', size: 24, kalin: 700, renk: RENK.cekme }));
    et.net = yaz(yazi(c, g, X, Pic[1] + 62, 'net kuvvet: ?', { hiza: 'start', size: 24, kalin: 600, renk: RENK.vurgu }));
    et.yzNet = yaz(yazi(c, g, X, Pyz[1] + 44, 'net kuvvet: içe doğru', { hiza: 'start', size: 24, kalin: 600, renk: RENK.vurgu }));
    // Yüzeyin içeri çekilmesi: uçtaki iki yüzey molekülü alt satırın dışındaki boş yerlere iner, çizgi kısalır.
    const uc = [satir[0][0], satir[0][6]], hedef = [[Pyz[0] - 3 * D - D / 2, y0 + DY], [Pyz[0] + 3 * D + D / 2, y0 + DY]];
    const sol = satir[0][0].P.slice(), sag = satir[0][6].P.slice();
    const api = {
      g, mol, bic, byz, icOk, yzOk, birlesik, sifir, et, yuzeyC,
      async cek(ms = 1400) {
        await c.tween(ms, (e) => {
          [[uc[0], hedef[0]], [uc[1], hedef[1]]].forEach(([m, h], i) => {
            const b = i ? sag : sol, x = lerp(b[0], h[0], e), y = lerp(b[1], h[1], e);
            m.e.setAttribute('cx', x); m.e.setAttribute('cy', y);
          });
          const L = lerp(cx - 3 * D - R - 10, cx - 2 * D - R - 10, e), Rr = lerp(cx + 3 * D + R + 10, cx + 2 * D + R + 10, e);
          yuzeyC.setAttribute('x1', L); yuzeyC.setAttribute('x2', Rr);
        }, ease.inOut);
      },
    };
    return api;
  }

  /* ---- su molekülü (gri küre modeli) ---- */
  function kureH2O(c, p, x, y, k = 1) {
    const g = c.S('g', { transform: `translate(${x},${y}) scale(${k})` }, p);
    [[0, -14, 30, '#bdbdbd'], [-34, 22, 19, '#e6e6e6'], [34, 22, 19, '#e6e6e6']].sort((a, b) => b[2] - a[2]).forEach(([cx, cy, r, f]) => c.S('circle', { cx, cy, r, fill: f }, g));
    return g;
  }

  /* ---- dört sıvı kartı ----
     Her kartın üstünde ad ve formül, altında yüzey gerilimi paneli (önce “?”, çevrilince “20 °C” ve değer).
     o: { x0, y, w, h, ara, kartlar: [{ ad, deger, formul }] }
     Dönen: { kartlar: [{ g, cevir(ms), cerceve(goster), formul }] } */
  const SIVILAR = [
    { ad: 'su', deger: 73, tur: 'h2o' },
    { ad: 'gliserin', deger: 63, tur: 'gliserin' },
    { ad: 'etil alkol', deger: 22, tur: 'alkol' },
    { ad: 'n-hekzan', deger: 18, tur: 'hekzan' },
  ];
  function sivi4(c, p, o) {
    const W = o.w || 226, H = o.h || 206, ara = o.ara || 18, x0 = o.x0 || 21, y = o.y || 28;
    const kartlar = SIVILAR.map((q, i) => {
      const x = x0 + i * (W + ara), cx = x + W / 2, g = c.S('g', {}, p);
      kutu(c, g, x, y, W, H, { rx: 14 });
      yazi(c, g, cx, y + 36, q.ad, { size: 26, kalin: 700 });
      const fg = c.S('g', {}, g), cer = { };
      let kutuCerceve = null;
      const f = (t, fx, fy, s = 22, hiza = 'middle') => yazi(c, fg, fx, fy, t, { size: s, kalin: 600, math: true, hiza });
      const cerceveAt = (fx, fy, w, h) => { kutuCerceve = c.S('rect', { x: fx, y: fy, width: w, height: h, rx: 6, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, fg); kutuCerceve.style.opacity = 0; };
      if (q.tur === 'h2o') { f('H_{2}O', cx, y + 92, 34); cerceveAt(cx - 38, y + 62, 76, 44); }
      else if (q.tur === 'alkol') { f('CH_{3}–CH_{2}–', cx + 22, y + 86, 22, 'end'); f('OH', cx + 22, y + 86, 22, 'start'); cerceveAt(cx + 17, y + 62, 46, 34); }
      else if (q.tur === 'hekzan') { f('CH_{3}–CH_{2}–CH_{2}–', cx, y + 74, 20); f('CH_{2}–CH_{2}–CH_{3}', cx, y + 104, 20); }
      else { f('CH_{2}–CH–CH_{2}', cx, y + 76, 22); [-50, 0, 50].forEach((dx) => f('OH', cx + dx, y + 112, 20)); [-50, 0, 50].forEach((dx) => cizgi(c, fg, [cx + dx, y + 84], [cx + dx, y + 94], RENK.cizgi, 2.5)); cerceveAt(cx - 78, y + 92, 156, 28); }
      // Çevrilen panel: yalnızca sayı (sıcaklık ve birim tahtada tek başlıkta). o.degersiz: panel hiç çizilmez.
      const py = y + H - 80, ph = 66, pg = c.S('g', {}, g), arka = c.S('g', {}, pg), on = c.S('g', {}, pg);
      if (!o.degersiz) {
        c.S('rect', { x: x + 14, y: py, width: W - 28, height: ph, rx: 10, fill: GRI.tahta, stroke: RENK.kenarlik, 'stroke-width': 2 }, arka);
        yazi(c, arka, cx, py + 46, '?', { size: 40, kalin: 700, renk: RENK.vurgu });
        c.S('rect', { x: x + 14, y: py, width: W - 28, height: ph, rx: 10, fill: GRI.tahta, stroke: RENK.vurgu, 'stroke-width': 2.5 }, on);
        yazi(c, on, cx, py + 46, String(q.deger), { size: 40, kalin: 700, renk: RENK.vurgu });
      }
      on.style.opacity = o.acik ? 1 : 0; if (o.acik) arka.style.opacity = 0;
      const sx = (v) => pg.setAttribute('transform', `translate(${cx},0) scale(${v},1) translate(${-cx},0)`);
      return {
        g, x, cx, y, W, H, deger: q.deger, ad: q.ad, fg,
        cerceve: (goster) => (kutuCerceve ? belir(c, kutuCerceve, 350, goster ? 1 : 0) : Promise.resolve()),
        async cevir(ms = 700) {
          await c.tween(ms / 2, (e) => sx(1 - e)); arka.style.opacity = 0; on.style.opacity = 1;
          await c.tween(ms / 2, (e) => sx(e));
        },
      };
    });
    return { kartlar };
  }

  /* ---- ortak ölçekli dört yatay çubuk ----
     o: { x (çubuk başı), y, w (en uzun çubuk), max, aralik, satirlar: [{ ad, deger }] }
     Dönen: { g, sat: [{ e, cb, val, y }], goster(i, ms) } */
  function cubuk4(c, p, o) {
    const g = c.S('g', {}, p), ara = o.aralik || 58;
    const sat = o.satirlar.map((s, i) => {
      const y = o.y + i * ara, e = c.S('g', {}, g);
      yazi(c, e, o.x - 16, y + 8, s.ad, { hiza: 'end', size: 24, kalin: 600 });
      const cb = c.S('rect', { x: o.x, y: y - 18, width: 0, height: 36, rx: 7, fill: GRI.koyu }, e);
      const val = yazi(c, e, o.x + 14, y + 8, String(s.deger), { hiza: 'start', size: 24, kalin: 700, renk: RENK.vurgu });
      e.style.opacity = 0;
      return { e, cb, val, s, y };
    });
    return {
      g, sat,
      /* Bütün çubukları hemen verilen saydamlıkta gösterir. */
      tamam(op = 1) { sat.forEach((q) => { const w = Math.max(8, (q.s.deger / o.max) * o.w); q.cb.setAttribute('width', w); q.val.setAttribute('x', o.x + w + 14); q.e.style.opacity = op; }); },
      async goster(i, ms = 800) {
        const q = sat[i], son = Math.max(8, (q.s.deger / o.max) * o.w);
        await belir(c, q.e, 250, 1);
        await c.tween(ms, (e) => { const w = son * e; q.cb.setAttribute('width', w); q.val.setAttribute('x', o.x + w + 14); }, ease.out);
      },
    };
  }

  /* ---- kutulu sınıflandırma tahtası (sinifla ile birlikte) ----
     o: { kutular: [{ baslik, x, y, w, h }], ciz(k, g) (öne çıkan kartın çizimi), chip(k, p, x, y) (kutuya konan kısa yazıyı çizip döndürür), aralik } */
  function kartTahtasi(c, p, o) {
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
        const q = o.kutular[k.kutu], e = kg[k.kutu], hy = q.y + 84 + e.n * (o.aralik || 46); e.n++;
        await belir(c, kartG, 250, 0); kartG.remove(); kartG = null;
        const ch = o.chip(k, p, q.x + q.w / 2, hy);
        ch.style.opacity = 0; await belir(c, ch, 350, 1);
      },
    };
  }

  /* ---- parmak ucundan kan alma: parmak, kan damlası, ince tüp ----
     o: { x (parmağın ortası), y (parmak ucu), tuyH }
     Dönen: { g, yuksel(t, ms), ad } */
  function kanTupu(c, p, o) {
    const g = c.S('g', {}, p), x = o.x, y = o.y, TW = 26, TH = o.tuyH || 170;
    c.S('path', { d: `M${x - 52},${y + 250} L${x - 52},${y + 50} Q${x - 52},${y} ${x},${y} Q${x + 52},${y} ${x + 52},${y + 50} L${x + 52},${y + 250} Z`, fill: '#777', stroke: '#9a9a9a', 'stroke-width': 3 }, g);
    const damla = c.S('path', { d: `M${x},${y - 30} C${x + 20},${y - 6} ${x + 24},${y + 4} ${x},${y + 6} C${x - 24},${y + 4} ${x - 20},${y - 6} ${x},${y - 30} Z`, fill: '#e0e0e0', stroke: GRI.damlaK, 'stroke-width': 2.5 }, g);
    const ty = y - 28 - TH, kan = c.S('rect', { x: x - TW / 2, y: y - 30, width: TW, height: 0, fill: '#e0e0e0', 'fill-opacity': 0.92 }, g);
    c.S('path', { d: `M${x - TW / 2},${ty} L${x - TW / 2},${y - 30} M${x + TW / 2},${ty} L${x + TW / 2},${y - 30}`, fill: 'none', stroke: '#c9c9c9', 'stroke-width': 4.5, 'stroke-linecap': 'round' }, g);
    return {
      g, damla,
      yuksel(t, ms = 1400) {
        return c.tween(ms, (e) => { const h = (TH - 24) * t * e; kan.setAttribute('y', y - 30 - h); kan.setAttribute('height', h); }, ease.out);
      },
    };
  }

  /* ---- bitkide su: kök–gövde–yaprak ve gövdedeki ince boru ----
     o: { x (gövde), yTaban (toprak çizgisi), yUst (yaprak), bx, by, br (büyütmenin merkezi ve yarıçapı) }
     Dönen: { g, bitki, buyutme, zincir, koh, adh, et: { koh, adh } } */
  function bitkiSu(c, p, o) {
    const g = c.S('g', {}, p), x = o.x, yt = o.yTaban, yu = o.yUst, bx = o.bx, by = o.by, br = o.br || 112, id = 'bs' + (++KIMLIK);
    const bitki = c.S('g', {}, g), gv = '#8f8f8f';
    cizgi(c, bitki, [x - 110, yt], [x + 110, yt], RENK.ince, 3);
    [[-50, 70], [0, 84], [50, 70]].forEach(([dx, dy]) => cizgi(c, bitki, [x, yt], [x + dx, yt + dy], '#7a7a7a', 5));
    cizgi(c, bitki, [x, yt], [x, yu + 26], gv, 14);
    c.S('ellipse', { cx: x - 62, cy: yu + 40, rx: 62, ry: 26, fill: '#7a7a7a', transform: `rotate(-24 ${x - 62} ${yu + 40})` }, bitki);
    c.S('ellipse', { cx: x + 62, cy: yu + 40, rx: 62, ry: 26, fill: '#7a7a7a', transform: `rotate(24 ${x + 62} ${yu + 40})` }, bitki);
    const yb = (yt + yu) / 2;
    const bag = [cizgi(c, g, [x + 8, yb - 10], [bx - br + 10, by - br + 40], RENK.ince, 2, { 'stroke-dasharray': '4 6' }), cizgi(c, g, [x + 8, yb + 10], [bx - br + 10, by + br - 40], RENK.ince, 2, { 'stroke-dasharray': '4 6' })];
    const bg = c.S('g', {}, g), defs = c.S('defs', {}, bg), cp = c.S('clipPath', { id }, defs);
    c.S('circle', { cx: bx, cy: by, r: br }, cp);
    c.S('circle', { cx: bx, cy: by, r: br, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, bg);
    const ic = c.S('g', { 'clip-path': `url(#${id})` }, bg), BW = 78;
    const koh = c.S('g', {}, ic), adh = c.S('g', {}, ic), tn = c.S('g', {}, ic);
    // Boru duvarları.
    [bx - BW / 2, bx + BW / 2].forEach((wx) => cizgi(c, tn, [wx, by - br], [wx, by + br], '#c9c9c9', 7));
    // Moleküller zinciri: sağa sola kayık dizilmiş altı molekül.
    const pts = [-80, -48, -16, 16, 48, 80].map((dy, i) => [bx + (i % 2 ? 14 : -14), by + dy]);
    pts.forEach((P, i) => {
      if (pts[i + 1]) cizgi(c, koh, P, pts[i + 1], RENK.cekme, 4);
      const wx = P[0] < bx ? bx - BW / 2 : bx + BW / 2;
      cizgi(c, adh, P, [wx, P[1]], RENK.cekme, 4);
    });
    pts.forEach((P) => c.S('circle', { cx: P[0], cy: P[1], r: 13, fill: GRI.su, stroke: GRI.suK, 'stroke-width': 2 }, tn));
    const et = {
      koh: yazi(c, bg, bx + br + 12, by - 30, 'kohezyon', { hiza: 'start', size: 22, kalin: 700, renk: RENK.cekme }),
      adh: yazi(c, bg, bx + br + 12, by + 30, 'adezyon', { hiza: 'start', size: 22, kalin: 700, renk: RENK.cekme }),
    };
    return { g, bitki, buyutme: bg, bag, koh, adh, et };
  }

  return { GRI, damlaYuzey, buyutme, kuvvetCubuklari, tup, kapliTup, yuzeyMolekulu, kureH2O, sivi4, cubuk4, kartTahtasi, kanTupu, bitkiSu };
})();
