/* B1 — Metal ametalle buluşunca: katyon ve anyon
   Sodyum ile klor gazı tepkimeye girince metal atomundan katyon, ametal atomundan anyon oluşur; gözleme dayalı ve dayalı olmayan önermeler ayrılır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/B-iyonik-bag.md ("B1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Tepkime aşamaları ve şerit dersler/b-araclar.js içindedir (window.KIT_B). Çizimler şematiktir. */
(() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par, ok, isaret, yuk, etkilesim, sinifla } = window.KIT;
  const { GRI, KOYU, AC, ASAMA, serit, tepkime, kart } = window.KIT_B;
  const { lerp, ease } = Ders;

  /* ---- bu dersin yerel yardımcıları ---- */

  /* f(T) konumunda gezen elektron; durum.dur doğru olunca gezinti biter. */
  function gez(c, e, f, durum) {
    (async () => {
      try {
        let T = 0;
        while (c.alive() && !durum.dur) {
          const T0 = T;
          await c.tween(1000, (u) => { if (!durum.dur) e.tasi(f(T0 + u)); }, ease.linear);
          T += 1;
        }
      } catch (x) { if (!(x instanceof Ders.Cancelled)) throw x; }
    })();
  }

  /* Büyük atom: çekirdek rozeti, simge ve altında elektron sayısı. t=0 atom, t=1 iyon. */
  function buyukAtom(c, p, C, o) {
    const g = c.S('g', {}, p);
    const gri = c.S('circle', { cx: C[0], cy: C[1], r: o.r0, fill: o.gri }, g), ton = c.S('circle', { cx: C[0], cy: C[1], r: o.r0, fill: o.ton }, g);
    ton.style.opacity = 0;
    const la = yazi(c, g, C[0], C[1] - 46, o.simge, { size: 28, kalin: 700, renk: o.yazi, math: true });
    const li = yazi(c, g, C[0], C[1] - 46, o.iyon, { size: 28, kalin: 700, renk: KOYU, math: true });
    li.style.opacity = 0;
    c.S('circle', { cx: C[0], cy: C[1] + 4, r: 38, fill: RENK.arti, stroke: KOYU, 'stroke-width': 4 }, g);
    yazi(c, g, C[0], C[1] + 13, o.p, { size: 22, kalin: 700, renk: KOYU, math: true });
    const et = yazi(c, g, C[0], C[1] + 142, o.e0, { size: 30, kalin: 700, renk: RENK.eksi, math: true });
    return {
      g,
      ciz(t) { const r = lerp(o.r0, o.r1, t); gri.setAttribute('r', r); ton.setAttribute('r', r); ton.style.opacity = t; la.style.opacity = Math.max(0, 1 - 2 * t); li.style.opacity = Math.max(0, 2 * t - 1); },
      sayi(m) { c.mathText(et, m); },
    };
  }

  /* Dört sütunlu küçük tablo (Tanecik, Proton, Elektron, Yük). Satırlar tek tek eklenir. */
  const KX = [585, 735, 835, 945], KH = ['start', 'middle', 'middle', 'middle'];
  function tabloBaslik(c, p) {
    const g = c.S('g', {}, p);
    ['Tanecik', 'Proton', 'Elektron', 'Yük'].forEach((m, i) => yazi(c, g, KX[i], 200, m, { hiza: KH[i], size: 24, kalin: 600, renk: RENK.soluk }));
    cizgi(c, g, [575, 218], [985, 218], RENK.kenarlik, 2);
    return g;
  }
  function tabloSatir(c, p, y, hucreler) {
    const g = c.S('g', {}, p), t = hucreler.map((m, i) => yazi(c, g, KX[i], y, m, { hiza: KH[i], size: 26, kalin: 700, math: true }));
    const cerceve = c.S('rect', { x: 575, y: y - 32, width: 410, height: 50, rx: 10, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, g);
    cerceve.style.opacity = 0;
    return { g, t, cerceve };
  }
  const yaz = (c, el, m, renk) => { c.mathText(el, m); if (renk) el.style.fill = renk; };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const A = [280, 270];
    const sol = c.S('g', {}, svg);
    const atomGri = c.S('circle', { cx: A[0], cy: A[1], r: 78, fill: GRI.metal }, sol);
    const atomTon = c.S('circle', { cx: A[0], cy: A[1], r: 78, fill: RENK.arti }, sol);
    atomTon.style.opacity = 0;
    yazi(c, sol, A[0], A[1] + 12, 'metal', { size: 30, kalin: 700, renk: AC });
    const artiG = c.S('g', {}, sol);
    cizgi(c, artiG, [A[0] - 14, A[1] - 52], [A[0] + 14, A[1] - 52], KOYU, 5); cizgi(c, artiG, [A[0], A[1] - 66], [A[0], A[1] - 38], KOYU, 5);
    artiG.style.opacity = 0;
    yazi(c, sol, A[0], A[1] + 130, 'metal atomu', { size: 26, kalin: 600, renk: RENK.soluk });
    const E0 = [A[0] + 84, A[1] - 34], e = yuk(c, sol, E0, 'eksi', 15);
    const sag = c.S('g', {}, svg);
    const P = [650, 270], Q = [850, 270];
    const e1 = yuk(c, sag, P, 'eksi', 26), e2 = yuk(c, sag, Q, 'eksi', 26);
    yazi(c, sag, 750, 385, 'iki elektron', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(sag);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, sol, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Bir metal atomu valans elektronlarını bırakınca ne olur?',
      options: ['Eksi yüklü iyona dönüşür', 'Artı yüklü iyona dönüşür', 'Yüksüz kalır'], answer: 1,
      hints: ['Eksi yüklü elektron gidince geriye artı yük kalır; metal artı iyon olur.', '', 'Eksi yüklü elektron gidince geriye artı yük kalır; metal artı iyon olur.'],
      right: 'Evet. Eksi yüklü elektron gidince geriye artı yük kalır.',
    });
    await par(c.tween(1200, (u) => {
      e.tasi([E0[0] + 120 * u, E0[1] - 20 * u]); e.g.style.opacity = 1 - u;
      atomTon.style.opacity = u; atomGri.setAttribute('r', lerp(78, 62, u)); atomTon.setAttribute('r', lerp(78, 62, u)); artiG.style.opacity = u;
    }, ease.inOut));
    await belir(c, sag, 500);
    await c.choice({
      tag: 'Hatırla', q: 'İki elektron arasındaki kuvvet nasıldır?',
      options: ['Çekme', 'Kuvvet yoktur', 'İtme'], answer: 2,
      hints: ['İkisi de eksi yüklüdür; aynı yükler birbirini iter.', 'İkisi de eksi yüklüdür; aynı yükler birbirini iter.', ''],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    const it = etkilesim(c, sag, P, Q, 'itme', { b: 28, boy: 50 });
    it.style.opacity = 0;
    await belir(c, it, 500);
    await c.wait(700);
    await belir(c, [sol, sag], 400, 0);
    await c.say('Bugün bir metal ile bir ametal karşılaşınca ne olduğuna bakacağız.', { speak: '[curious] Bugün bir metal ile bir ametal karşılaşınca ne olduğuna bakacağız.' });
  }

  /* ---- 2. Sodyum, klor ve tuz ---- */
  async function tuz(c) {
    const svg = c.svg(1000, 562);
    const na = c.S('g', {}, svg);
    c.S('rect', { x: 90, y: 300, width: 160, height: 80, rx: 14, fill: GRI.metal }, na);
    yazi(c, na, 170, 428, 'sodyum', { size: 28, kalin: 600 });
    const halka = c.S('rect', { x: 76, y: 286, width: 188, height: 108, rx: 20, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, na);
    halka.style.opacity = 0;
    const artiIsaret = yazi(c, svg, 330, 360, '+', { size: 48, kalin: 700, renk: RENK.soluk });
    const klor = c.S('g', {}, svg);
    c.S('rect', { x: 410, y: 220, width: 190, height: 180, rx: 18, fill: '#18213f', stroke: RENK.kenarlik, 'stroke-width': 3 }, klor);
    [[270, 0], [310, 20], [350, -10]].forEach(([y, dx]) => c.S('path', { d: `M${430 + dx},${y} q20,-26 40,0 t40,0 t40,0`, fill: 'none', stroke: GRI.klor, 'stroke-width': 4, 'stroke-opacity': 0.55, 'stroke-linecap': 'round' }, klor));
    yazi(c, klor, 505, 440, 'klor gazı', { size: 28, kalin: 600 });
    const hedef = c.S('g', {}, svg);
    ok(c, hedef, [630, 310], [735, 310], RENK.yazi, 5);
    const bos = c.S('g', {}, hedef);
    c.S('rect', { x: 760, y: 240, width: 170, height: 160, rx: 16, fill: 'none', stroke: RENK.kenarlik, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, bos);
    yazi(c, bos, 845, 340, '?', { size: 72, kalin: 700, renk: RENK.soluk });
    const tz = c.S('g', {}, svg);
    c.S('rect', { x: 805, y: 300, width: 80, height: 92, rx: 16, fill: '#e9edff' }, tz);
    c.S('rect', { x: 811, y: 272, width: 68, height: 32, rx: 12, fill: '#aab3d6' }, tz);
    [830, 845, 860].forEach((x) => c.S('circle', { cx: x, cy: 288, r: 3.5, fill: KOYU }, tz));
    yazi(c, tz, 845, 440, 'sodyum klorür', { size: 28, kalin: 700 });
    gizle(na, klor, hedef, tz, artiIsaret);

    await par(c.say('Sodyum bir metaldir ve suyla çok hızlı tepkimeye girer.'), belir(c, [na, artiIsaret], 500));
    await par(c.say('Bu yüzden doğada çoğunlukla element hâlinde bulunmaz.'), belir(c, halka, 400));
    await par(c.say('Klor ise keskin kokulu, zehirli bir gazdır.'), belir(c, halka, 300, 0), belir(c, [klor, hedef], 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Sodyum ile klor gazı tepkimeye girerse oluşan madde nasıl olur?',
      options: ['Keskin kokulu, zehirli bir gaz', 'İkisinden de farklı, yeni bir madde', 'Suyla hızla tepkimeye giren bir metal'], answer: 1,
      hints: ['Tepkimede iki madde birleşir; ürün, ikisinden birinin aynısı olmaz.', '', 'Ürün ikisinin de özelliğini taşımaz.'],
      right: 'Evet. Ürün, ikisinden de farklı yeni bir maddedir.',
    });
    await par(belir(c, bos, 300, 0), belir(c, tz, 600));
    await c.say('Tepkimede, sofra tuzu olarak bildiğimiz sodyum klorür oluşur.');
    await c.say('Sodyum klorür beyaz, kokusuz ve kristal yapılı bir katıdır.');
    await c.say('Yeni bir madde oluşmuştur; özellikleri sodyuma ve klora benzemez.');
    await c.say('Bu yeni maddenin oluşumunda atomlara ne olduğuna bakalım.');
  }

  /* ---- 3. Tepkimeyi izle ---- */
  async function izle(c) {
    const svg = c.svg(1000, 562);
    const FX = 240;
    // Erlen, içinde sodyum ve klor gazı.
    const erlen = c.S('g', {}, svg);
    c.S('path', { d: 'M212,70 L268,70 L268,175 L352,378 Q360,400 338,400 L142,400 Q120,400 128,378 L212,175 Z', fill: '#18213f', stroke: RENK.kenarlik, 'stroke-width': 4 }, erlen);
    c.S('path', { d: 'M215,190 L265,190 L346,378 Q352,392 338,392 L142,392 Q128,392 134,378 Z', fill: GRI.klor, 'fill-opacity': 0.22 }, erlen);
    const gaz = c.S('g', {}, erlen);
    [[250, 0], [300, 22], [350, -8]].forEach(([y, dx]) => c.S('path', { d: `M${190 + dx},${y} q16,-22 32,0 t32,0 t32,0`, fill: 'none', stroke: GRI.klor, 'stroke-width': 3, 'stroke-opacity': 0.5, 'stroke-linecap': 'round' }, gaz));
    const parca = c.S('g', {}, erlen);
    c.S('rect', { x: 190, y: 366, width: 100, height: 26, rx: 8, fill: GRI.metal }, parca);
    const isi = c.S('rect', { x: 190, y: 366, width: 100, height: 26, rx: 8, fill: RENK.vurgu }, parca);
    isi.style.opacity = 0;
    const beyaz = c.S('path', { d: 'M150,392 Q240,332 330,392 Z', fill: '#eef1ff' }, erlen);
    beyaz.style.opacity = 0;
    yazi(c, erlen, FX, 450, 'sodyum ve klor gazı', { size: 24, kalin: 600, renk: RENK.soluk });
    const isik = c.S('g', {}, svg), pts = [];
    for (let k = 0; k < 24; k++) { const a = (k * Math.PI) / 12, r = k % 2 ? 62 : 128; pts.push(`${(FX + r * Math.cos(a)).toFixed(1)},${(310 + r * Math.sin(a)).toFixed(1)}`); }
    c.S('polygon', { points: pts.join(' '), fill: RENK.vurgu, 'fill-opacity': 0.9 }, isik);
    const isiG = c.S('g', {}, svg);
    [200, 240, 280].forEach((x, i) => ok(c, isiG, [x, 60 + (i % 2) * 8], [x, 18 + (i % 2) * 8], RENK.yazi, 4));
    yazi(c, isiG, 330, 46, 'çok ısı', { hiza: 'start', size: 26, kalin: 600 });
    gizle(erlen, isik, isiG);
    // Gözlem kartları.
    const kartlar = ['Parlak sarı ışık', 'Çok ısı', 'Beyaz katı'].map((m, i) => { const k = kart(c, svg, 560, 100 + i * 100, 400, [m], { size: 30 }); k.g.style.opacity = 0; return k; });
    const dus = async (k) => c.tween(500, (e) => { k.g.setAttribute('transform', `translate(0,${-50 * (1 - e)})`); k.g.style.opacity = e; });
    // Büyütme: atom düzeyi.
    const buyut = c.S('g', {}, svg);
    cizgi(c, buyut, [352, 300], [490, 300], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    c.S('circle', { cx: 700, cy: 300, r: 210, fill: '#18213f', stroke: RENK.kenarlik, 'stroke-width': 3 }, buyut);
    const disk = (x, y, renk, m, lr) => {
      const g = c.S('g', {}, buyut);
      c.S('circle', { r: 22, fill: renk }, g); yazi(c, g, 0, 8, m, { size: 22, kalin: 700, renk: lr });
      g.setAttribute('transform', `translate(${x},${y})`);
      return { g, tasi: (a, b) => g.setAttribute('transform', `translate(${a},${b})`) };
    };
    const NA0 = [[588, 168], [632, 168], [588, 212], [632, 212]], NA1 = [[560, 150], [790, 140], [620, 240], [700, 190]]; // yollar kesişmez: etiketler hareket sırasında üst üste binmez
    const naSerit = c.S('g', {}, buyut);
    const nalar = NA0.map(([x, y]) => disk(x, y, GRI.metal, 'Na', AC));
    nalar.forEach((d) => naSerit.appendChild(d.g));
    const CIFT = [[640, 300, 0.4], [800, 290, -0.5], [660, 420, -0.3], [810, 410, 0.8]];
    const cifler = CIFT.map(([x, y, a]) => {
      const d = [-1, 1].map((s) => disk(x + s * 22 * Math.cos(a), y + s * 22 * Math.sin(a), GRI.klor, 'Cl', KOYU));
      return { x, y, a, d };
    });
    const enerji = c.S('g', {}, buyut), ep = [];
    for (let k = 0; k < 16; k++) { const a = (k * Math.PI) / 8, r = k % 2 ? 22 : 44; ep.push(`${(730 + r * Math.cos(a)).toFixed(1)},${(355 + r * Math.sin(a)).toFixed(1)}`); }
    CIFT.forEach(([x, y]) => cizgi(c, enerji, [730, 355], [x, y], RENK.vurgu, 2, { 'stroke-dasharray': '3 7' }));
    c.S('polygon', { points: ep.join(' '), fill: RENK.vurgu }, enerji);
    yazi(c, enerji, 728, 304, 'enerji', { size: 22, kalin: 600, renk: RENK.vurgu });
    gizle(buyut, enerji);
    cifler.forEach((p) => p.d.forEach((d) => { d.g.style.opacity = 0; }));

    await par(c.say('Sodyum önce ısıtılır, sonra klor gazına verilir.'), belir(c, erlen, 500));
    await c.cont('Tepkimeyi başlat');
    await par(c.say('Hızlı bir tepkime başlar.'), c.tween(1100, (e) => { isi.style.opacity = 0.85 * e; }));
    await par(c.say('Parlak sarı ışık yayılır ve çok ısı açığa çıkar.'), (async () => {
      await par(belir(c, isik, 450), belir(c, isiG, 450));
      await par(dus(kartlar[0]), c.wait(300));
      await dus(kartlar[1]);
    })());
    await par(c.say('Sonunda beyaz renkli bir katı elde edilir.'), (async () => {
      await par(belir(c, [isik, isiG, gaz], 600, 0), belir(c, parca, 600, 0), belir(c, beyaz, 700));
      await dus(kartlar[2]);
    })());
    await par(c.say('Bunlar gözümüzle gördüklerimiz; atomlarda olanı göremeyiz.'), (async () => {
      await c.wait(900);
      await par(belir(c, kartlar.map((k) => k.g), 400, 0), belir(c, erlen, 500, 0.5));
      await belir(c, buyut, 600);
    })());
    cifler.forEach((p) => p.d.forEach((d) => { d.g.style.opacity = 0; }));
    await par(c.say('Açığa çıkan enerji sodyumu gaz hâline getirir.'), (async () => {
      await belir(c, naSerit, 1, 1);
      await c.tween(1500, (e) => nalar.forEach((d, i) => d.tasi(lerp(NA0[i][0], NA1[i][0], e), lerp(NA0[i][1], NA1[i][1], e))), ease.inOut);
    })());
    await par(c.say('Klor molekülü Cl<sub>2</sub>, iki klor atomundan oluşur.', { speak: 'Klor molekülü, iki klor atomundan oluşur.' }),
      belir(c, cifler.flatMap((p) => p.d.map((d) => d.g)), 600));
    await par(c.say('Aynı enerji, klor moleküllerini klor atomlarına ayırır.'), belir(c, enerji, 600));
    await c.choice({
      tag: 'Sıra sende', q: 'Kapta 4 klor molekülü (Cl<sub>2</sub>) tamamen atomlarına ayrılırsa kaç klor atomu oluşur?',
      options: ['4', '8', '2'], answer: 1,
      hints: ['Her Cl<sub>2</sub> molekülü iki atomdan oluşur.', '', 'Atom sayısı molekül sayısından fazla olur.'],
      right: 'Evet. Her molekülden iki atom çıkar.',
    });
    await c.tween(1400, (e) => cifler.forEach((p) => {
      p.d.forEach((d, i) => { const s = i ? 1 : -1, k = 22 + 34 * e; d.tasi(p.x + s * k * Math.cos(p.a), p.y + s * k * Math.sin(p.a)); });
    }), ease.inOut);
    await belir(c, enerji, 400, 0);
    await c.say('Bir molekülden iki atom çıkar: dört molekülden sekiz klor atomu.');
    await c.say('Şimdi atomlara ne olduğunu aşama aşama izleyelim.', { speak: '[curious] Şimdi atomlara ne olduğunu aşama aşama izleyelim.' });
  }

  /* ---- 4. Sodyum atomundan katyon ---- */
  async function katyon(c) {
    const svg = c.svg(1000, 562);
    const sr = serit(c, svg); sr.vurgula(4);
    const C = [270, 330];
    const at = buyukAtom(c, svg, C, { simge: 'Na', iyon: 'Na^{+}', p: '11p^{+}', e0: '11e^{−}', gri: GRI.metal, ton: RENK.arti, yazi: AC, r0: 100, r1: 72 });
    const en = c.S('g', {}, svg);
    ok(c, en, [24, 330], [164, 330], RENK.vurgu, 7);
    yazi(c, en, 94, 296, 'enerji', { size: 26, kalin: 600, renk: RENK.vurgu });
    gizle(en);
    const E0 = ileri(C, -0.5, 86), e = yuk(c, svg, E0, 'eksi', 14);
    const W = (T) => [462 + 70 * Math.sin(0.9 * T + 0.4), 330 + 150 * Math.sin(0.6 * T + 1.2)];
    const tb = tabloBaslik(c, svg), r1 = tabloSatir(c, svg, 270, ['Na atomu', '11', '11', '0']), r2 = tabloSatir(c, svg, 332, ['Na^{+}', '11', '10', '?']);
    gizle(tb, r1.g, r2.g);
    await belir(c, [tb, r1.g], 500);
    const durum = { dur: false };
    await par(c.say('Aldığı enerjiyle sodyum atomu bir elektron kaybeder.'), (async () => {
      await belir(c, en, 400);
      const bas = W(0);
      await c.tween(1500, (u) => {
        e.tasi([lerp(E0[0], bas[0], u), lerp(E0[1], bas[1], u)]);
        at.ciz(u);
      }, ease.inOut);
      at.sayi('10e^{−}');
      await belir(c, en, 300, 0);
    })());
    gez(c, e, W, durum);
    await c.say('Atomdan ayrılan elektron, ortamda serbestçe dolaşır.');
    await par(c.say('Sodyum atomunda 11 proton ve 11 elektron vardır.', { speak: 'Sodyum atomunda on bir proton ve on bir elektron vardır.' }), belir(c, r1.cerceve, 400));
    await par(c.say('Elektron ayrılınca geriye 11 proton ve 10 elektron kalır.', { speak: 'Elektron ayrılınca geriye on bir proton ve on elektron kalır.' }), belir(c, r1.cerceve, 300, 0), belir(c, r2.g, 500));
    yaz(c, r2.t[3], '1+', RENK.vurgu);
    await par(c.say('Protonlar elektronlardan bir fazla: yük 1+.', { speak: 'Protonlar elektronlardan bir fazla: yük bir artı.' }), belir(c, r2.cerceve, 400));
    await c.say('Elektron kaybeden sodyum atomu, Na<sup>+</sup> katyonuna dönüşmüştür.', { speak: 'Elektron kaybeden sodyum atomu, sodyum katyonuna dönüşmüştür.' });
    await c.choice({
      tag: 'Sıra sende', q: 'Elektron kaybeden sodyum atomu neden artı yüklü olur?',
      options: ['Protonlar elektronlardan fazla kalır', 'Protonlar da atomdan ayrılır', 'Elektronlar çoğalır'], answer: 0,
      hints: ['', 'Atomdan giden tanecik eksi yüklü elektrondur.', 'Proton sayısı 11’de kalır.'],
      right: 'Evet. Giden elektrondur; protonlar elektronlardan fazla kalır.',
    });
    await c.say('Proton sayısı değişmedi; tanecik hâlâ sodyumun iyonudur.');
    durum.dur = true;
  }

  /* ---- 5. Klor atomundan anyon ---- */
  async function anyon(c) {
    const svg = c.svg(1000, 562);
    const sr = serit(c, svg); sr.vurgula(5);
    const C = [270, 330];
    const at = buyukAtom(c, svg, C, { simge: 'Cl', iyon: 'Cl^{−}', p: '17p^{+}', e0: '17e^{−}', gri: GRI.klor, ton: RENK.eksi, yazi: KOYU, r0: 74, r1: 100 });
    const e = yuk(c, svg, [480, 250], 'eksi', 14);
    const W = (T) => [462 + 70 * Math.sin(0.9 * T + 0.4), 330 + 150 * Math.sin(0.6 * T + 1.2)];
    e.tasi(W(0));
    const tb = tabloBaslik(c, svg), r1 = tabloSatir(c, svg, 270, ['Cl atomu', '17', '17', '0']), r2 = tabloSatir(c, svg, 332, ['Cl^{−}', '17', '?', '?']);
    gizle(tb, r1.g, r2.g, e.g);
    const durum = { dur: false };
    await belir(c, [tb, r1.g], 500);
    await belir(c, e.g, 400);
    gez(c, e, W, durum);
    await c.say('Klor atomları ortamdaki serbest elektronlardan birini alır.');
    await par(c.say('Klor atomunda 17 proton ve 17 elektron vardır.', { speak: 'Klor atomunda on yedi proton ve on yedi elektron vardır.' }), belir(c, r1.cerceve, 400));
    await par(c.say('Bir elektron alınca elektronlar protonlardan fazla olur.'), belir(c, r1.cerceve, 300, 0), belir(c, r2.g, 500));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Cl<sup>−</sup> taneciğinde kaç elektron vardır?',
      options: ['16', '18', '17'], answer: 1,
      hints: ['Atomda 17 elektron vardı; bir tane daha alındı.', '', 'Elektron alınca elektron sayısı artar.'],
      right: 'Evet. 17 elektrona bir elektron eklendi: 18.',
    });
    durum.dur = true;
    const from = [e.yer[0], e.yer[1]];
    await c.tween(1300, (u) => {
      e.tasi([lerp(from[0], C[0] + 40, u), lerp(from[1], C[1] + 70, u)]);
      at.ciz(u * u);
    }, ease.inOut);
    at.ciz(1); e.g.style.opacity = 0; at.sayi('18e^{−}');
    yaz(c, r2.t[2], '18'); yaz(c, r2.t[3], '1−', RENK.vurgu);
    await par(c.say('17 proton, 18 elektron: yük 1−, tanecik Cl<sup>−</sup>.', { speak: 'On yedi proton, on sekiz elektron: yük bir eksi, tanecik klorür iyonu.' }), belir(c, r2.cerceve, 400));
    await c.say('Elektron alan klor atomu anyona dönüşür; adı klorür.');
    await c.choice({
      tag: 'Sıra sende', q: 'Cl<sub>2</sub> molekülü yüksüzdür. Cl<sup>−</sup> iyonu nasıl oluşur?',
      options: ['Molekül bütün hâlde bir elektron alır', 'Molekül iki elektron verir', 'Molekül atomlarına ayrılır; her atom bir elektron alır'], answer: 2,
      hints: ['Enerji klor moleküllerini atomlarına ayırmıştı.', 'İyon, tek bir atomun elektron almasıyla oluşur.', ''],
      right: 'Evet. Önce atomlara ayrılır, sonra her atom bir elektron alır.',
    });
    await c.say('Cl<sub>2</sub> molekülü değil, ayrılmış klor atomu elektron alır.', { speak: 'Klor molekülü değil, ayrılmış klor atomu elektron alır.' });
  }

  /* ---- 6. İyonlar bir araya gelir ---- */
  async function bulus(c) {
    const svg = c.svg(1000, 562);
    const sr = serit(c, svg); sr.vurgula(5);
    const t = tepkime(c, svg, { metal: 'Na', x: 50, y: 120 });
    t.hemen(5);
    const urun = c.S('g', {}, svg);
    c.S('rect', { x: 400, y: 440, width: 200, height: 44, rx: 10, fill: '#eef1ff' }, urun);
    yazi(c, urun, 500, 530, 'sodyum klorür', { size: 28, kalin: 700 });
    gizle(urun);

    await par(c.say('Kapta artık çok sayıda Na<sup>+</sup> ve Cl<sup>−</sup> iyonu vardır.', { speak: 'Kapta artık çok sayıda sodyum ve klorür iyonu vardır.' }));
    sr.vurgula(6);
    await par(c.say('Zıt yüklü bu iyonlar birbirine yaklaşıp bir araya gelir.'), t.git(6, 2200));
    await par(c.say('Böylece tepkimenin ürünü, sodyum klorür oluşur.'), belir(c, urun, 700));
    c.note('<b>Metal ile ametal tepkimesinde metal katyon, ametal anyon olur.</b> Örnek: Na<sup>+</sup>, Cl<sup>−</sup>.', 'Katyon ve anyon', 'katyon-anyon');

    // Dene: aşamaları gez.
    await c.say('Aşamaları gez; her aşamada sodyuma ve klora ne olduğuna bak.', { noWait: true });
    const sl = c.slider({
      tag: 'Dene', label: 'Tepkime aşaması', min: 1, max: 6, step: 1, value: 1, fmt: (v) => String(v),
      onInput: (v) => { t.hemen(v); sr.vurgula(v, ASAMA[v - 1]); urun.style.opacity = v === 6 ? 1 : 0; },
    });
    await c.cont('Devam ›');
    c.clearAct();
  }

  /* ---- 7. Gördüğünle yorumladığın ---- */
  async function yorum(c) {
    const svg = c.svg(1000, 562);
    const sr = serit(c, svg);
    const bagla = async (k, n, ad) => {
      const l = cizgi(c, svg, k.ust, k.ust, RENK.vurgu, 3), B = sr.alt(n);
      sr.vurgula(n, ad);
      await c.tween(700, (u) => { l.setAttribute('x2', lerp(k.ust[0], B[0], u)); l.setAttribute('y2', lerp(k.ust[1], B[1], u)); });
      return l;
    };
    const kopuk = async (k) => {
      const g = c.S('g', {}, svg), son = [k.ust[0], k.ust[1] - 110];
      cizgi(c, g, k.ust, son, RENK.soluk, 3, { 'stroke-dasharray': '6 8' });
      isaret(c, g, son[0], son[1], 'no', 18);
      g.style.opacity = 0;
      await belir(c, g, 500);
      return g;
    };
    const A = kart(c, svg, 80, 360, 420, ['Sodyum atomları', 'elektron kaybetti.']), B = kart(c, svg, 540, 360, 420, ['Sodyum, iyonlaşma enerjisi düşük', 'olduğu için elektron verir.']);
    gizle(A.g, B.g);
    const vurgu = (k, a) => { k.r.style.stroke = a ? RENK.vurgu : RENK.kenarlik; k.r.style.strokeWidth = a ? 5 : 2.5; };

    await par(c.say('Tepkimeyi izlerken, olanı anlatan cümleler kurarız: bunlara önerme denir.'), belir(c, A.g, 500));
    const lA = await bagla(A, 4, ASAMA[3]);
    await c.say('İzlediğin bir olaya dayanan önerme, gözleme dayalıdır.');
    await par(c.say('Hiçbir gözleme dayanmayan önerme, bir açıklama ya da tahmindir.'), belir(c, B.g, 500));
    const xB = await kopuk(B);
    await c.say('Böyle bir önerme yanlış olmak zorunda değildir; yalnızca gözlemle desteklenmemiştir.');
    vurgu(A, true);
    await c.say('Bu önerme dördüncü aşamaya, elektronun ayrılışına dayanır.');
    vurgu(A, false); vurgu(B, true);
    await c.say('Bu önerme hiçbir aşamada görülmez; bir açıklamadır.');
    vurgu(B, false);
    await par(belir(c, [A.g, B.g, lA, xB], 400, 0));
    sr.vurgula(null);

    const Cc = kart(c, svg, 80, 360, 420, ['Klor atomları', 'elektron aldı.']);
    gizle(Cc.g);
    await belir(c, Cc.g, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: '“Klor atomları elektron aldı.” önermesi hangi gözleme dayanır?',
      options: ['3. aşama: klor atomları oluşur', '5. aşama: klor atomları elektron alır', 'Hiçbir aşamaya dayanmaz'], answer: 1,
      hints: ['Önerme elektron alınmasını anlatıyor.', '', 'Klor atomunun elektron aldığı aşamayı bul.'],
      right: 'Evet. Elektron alışı 5. aşamada görülür.',
    });
    await bagla(Cc, 5, ASAMA[4]);
    await c.say('Klor atomlarının elektron alışı beşinci aşamada görülür.');
    const D = kart(c, svg, 540, 360, 420, ['Aynı tepkime lityumla', 'da olur.']);
    gizle(D.g);
    await belir(c, D.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: '“Aynı tepkime lityumla da olur.” önermesi gözleme dayalı mıdır?',
      options: ['Evet; 4. aşamaya dayanır', 'Hayır; lityum tepkimesi izlenmedi', 'Evet; 6. aşamaya dayanır'], answer: 1,
      hints: ['Hangi aşamada lityum var?', '', 'İzlediğimiz tek tepkime sodyumunki.'],
      right: 'Evet. İzlenen tek tepkime sodyumunki; bu bir tahmindir.',
    });
    await kopuk(D);
    const damga = c.S('g', {}, svg);
    c.S('rect', { x: 680, y: 480, width: 160, height: 46, rx: 10, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, damga);
    yazi(c, damga, 760, 513, 'tahmin', { size: 28, kalin: 700, renk: RENK.vurgu });
    damga.style.opacity = 0;
    await belir(c, damga, 500);
    await c.say('Gözleme dayalı olmayan önermeler, yeni gözlemlerle sınanabilir.');
  }

  /* ---- 8. Ayır: gözleme dayalı mı, değil mi? ---- */
  async function ayir(c) {
    const svg = c.svg(1000, 562);
    const sr = serit(c, svg);
    const KUTU = [[40, 'Gözleme dayalı'], [520, 'Gözleme dayalı değil']];
    KUTU.forEach(([x, ad]) => {
      kutu(c, svg, x, 330, 440, 190, { rx: 16 });
      yazi(c, svg, x + 220, 372, ad, { size: 28, kalin: 700, renk: RENK.vurgu });
    });
    const sayac = [0, 0];
    const KARTLAR = [
      { satir: ['Klor molekülleri', 'atomlarına ayrıldı.'], kutu: 0, a: 3, neden: '3. aşamada Cl<sub>2</sub> molekülleri ikişer klor atomuna ayrılır.', ipucu: 'Bu olay tepkimede izleniyor. Hangi aşamada görülür?' },
      { satir: ['İyonlar, zıt yükleri nedeniyle', 'birbirini çekti.'], kutu: 1, neden: 'Çekim kuvveti görülmez; bir araya gelmeden çıkarılan bir sonuçtur.', ipucu: 'Çekimi bir aşamada görebilir misin?' },
      { satir: ['Sodyum atomlarından artı', 'yüklü iyonlar oluştu.'], kutu: 0, a: 4, neden: '4. aşamada sodyum atomlarından elektron ayrılır.', ipucu: 'Bu olay tepkimede izleniyor. Hangi aşamada görülür?' },
      { satir: ['Potasyum da klor gazıyla aynı', 'biçimde tepkimeye girer.'], kutu: 1, neden: 'Potasyumun tepkimesi izlenmedi; bu bir tahmindir.', ipucu: 'İzlediğimiz tek tepkime sodyumunki.' },
      { satir: ['Klor atomlarından eksi', 'yüklü iyonlar oluştu.'], kutu: 0, a: 5, neden: '5. aşamada klor atomları elektron alır.', ipucu: 'Bu olay tepkimede izleniyor. Hangi aşamada görülür?' },
      { satir: ['Tepkimede ışık yayıldı,', 'çok ısı açığa çıktı.'], kutu: 0, a: 2, neden: 'İkisi de 2. aşamada görülür.', ipucu: 'Işık ve ısı tepkimede görülüyor.' },
      { satir: ['Klor atomunun çekirdeği, serbest', 'elektronu kendine çeker.'], kutu: 1, neden: 'Çekirdeğin çekimi görülmez; bir açıklamadır.', ipucu: 'Çekimi bir aşamada görebilir misin?' },
      { satir: ['Zıt yüklü iyonlar', 'bir araya geldi.'], kutu: 0, a: 6, neden: '6. aşamada iyonlar bir araya gelir.', ipucu: 'Bu olay tepkimede izleniyor. Hangi aşamada görülür?' },
    ];
    let simdiki = null;
    await c.say('Her önermeyi, gözleme dayalı olup olmadığına göre ayır.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k[1]), kartlar: KARTLAR,
      soru: (k) => `“${k.satir.join(' ')}” önermesi gözleme dayalı mı?`,
      sec: async (i, k) => {
        simdiki = kart(c, svg, 150, 130, 700, k.satir, { size: 30 });
        simdiki.g.style.opacity = 0;
        await belir(c, simdiki.g, 350);
      },
      yerlestir: async (i, k) => {
        const n = sayac[k.kutu]++, x = KUTU[k.kutu][0] + 50 + (n % 8) * 48, y = 432 + Math.floor(n / 8) * 44;
        const nokta = c.S('circle', { cx: 500, cy: 190, r: 16, fill: RENK.cizgi }, svg);
        nokta.style.opacity = 0;
        let hat = null;
        await par(belir(c, simdiki.g, 300, 0), c.tween(700, (u) => {
          nokta.setAttribute('cx', lerp(500, x, u)); nokta.setAttribute('cy', lerp(190, y, u)); nokta.style.opacity = u;
        }));
        simdiki.g.remove();
        if (k.a) {
          const B = sr.alt(k.a);
          hat = cizgi(c, svg, [x, y], [x, y], RENK.vurgu, 3); sr.vurgula(k.a);
          await c.tween(700, (u) => { hat.setAttribute('x2', lerp(x, B[0], u)); hat.setAttribute('y2', lerp(y, B[1], u)); });
          await c.wait(500);
          await belir(c, hat, 300, 0); hat.remove(); sr.vurgula(null);
        }
      },
    });
    await c.say('Gözleme dayalı olmayan önermeler yanlış olmak zorunda değildir.');
    await c.say('Bunları yeni tepkimelerle sınayabiliriz.');
  }

  Ders.start({
    id: 'cesitlilik-b1', kicker: 'Konu B · İyonik bağ', title: 'Metal ametalle buluşunca: katyon ve anyon', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Metal ametalle buluşunca: katyon ve anyon',
      hook: 'Sofradaki tuz bir metal ile bir ametalden oluşur; ikisi karşılaştığında atomlarına ne olur?',
      button: 'Derse başla ›',
    },
    goals: ['Sodyum ile klor gazının tepkimesini aşama aşama anlatır.', 'Metal atomunun katyona, ametal atomunun anyona dönüşümünü proton ve elektron sayısıyla açıklar.', 'Gözleme dayalı ve gözleme dayalı olmayan önermeleri ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Metalin elektron vermesini ve elektronların itmesini hatırla.', run: hatirla },
      { title: 'Sodyum, klor ve tuz', goal: 'İki maddenin özelliklerini ve ürünü tanı.', run: tuz },
      { title: 'Tepkimeyi izle', goal: 'Gözle görülenleri ve klor molekülünün atomlarına ayrılışını gör.', run: izle },
      { title: 'Sodyum atomundan katyon', goal: 'Elektron kaybeden atomun neden artı yüklü olduğunu gör.', run: katyon },
      { title: 'Klor atomundan anyon', goal: 'Elektron alan atomun neden eksi yüklü olduğunu gör.', run: anyon },
      { title: 'İyonlar bir araya gelir', goal: 'Altı aşamayı gezerek tepkimeyi bir arada gör.', run: bulus },
      { title: 'Gördüğünle yorumladığın', goal: 'Gözleme dayalı ve dayalı olmayan önermeyi ayır.', run: yorum },
      { title: 'Ayır: gözleme dayalı mı, değil mi?', goal: 'Sekiz önermeyi gözleme dayalı olup olmadığına göre ayır.', run: ayir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Tepkimede 3 klor molekülü (Cl<sub>2</sub>) tamamen Cl<sup>−</sup> iyonlarına dönüşüyor. Toplam kaç elektron alınır?',
        options: ['3', '2', '6'], answer: 2,
        why: ['3, yalnızca molekül sayısıdır; her molekül iki klor atomuna ayrılır.', 'Üç molekülden altı atom çıkar; 2 bu sayıyı karşılamaz.', 'Üç molekülden altı klor atomu çıkar ve her atom bir elektron alır.'], scene: 4 },
      { q: 'Potasyum atomunun 19 protonu ve 19 elektronu vardır. Bir elektron verirse oluşan taneciğin proton sayısı, elektron sayısı ve yükü nedir?',
        options: ['19 proton, 20 elektron; 1−', '19 proton, 18 elektron; 1+', '18 proton, 19 elektron; 1−'], answer: 1,
        why: ['Elektron veren atomun elektron sayısı artmaz, azalır.', 'Proton sayısı değişmez; elektron 18’e iner ve yük 1+ olur.', 'Elektron verilirken proton sayısı değişmez.'], scene: 3 },
      { q: 'Tepkimede oluşan iyonlardan hangisi bir ametal atomundan oluşmuştur?',
        options: ['Cl<sup>−</sup>', 'Na<sup>+</sup>', 'İkisi de'], answer: 0,
        why: ['Klor bir ametaldir ve elektron alarak Cl<sup>−</sup> olur.', 'Sodyum bir metaldir; Na<sup>+</sup> metal atomundan oluşur.', 'Yalnızca Cl<sup>−</sup> ametal atomundan oluşur.'], scene: 4 },
      { q: 'Bir öğrenci sodyum ile klor gazının tepkimesini izliyor. Hangi önerme gözleme dayalıdır?',
        options: ['Sodyum, iyonlaşma enerjisi düşük olduğu için elektron verir.', 'Rubidyum da klor gazıyla aynı biçimde tepkimeye girer.', 'Tepkimede parlak sarı ışık yayıldı.'], answer: 2,
        why: ['Bu bir açıklamadır; hiçbir aşamada görülmez.', 'Rubidyum tepkimesi izlenmedi; bu bir tahmindir.', 'Işık, tepkime sırasında gözle görülür.'], scene: 6 },
      { q: 'Gözleme dayalı olmayan bir önerme için hangisi doğrudur?',
        options: ['Yanlıştır', 'Yanlış olmak zorunda değildir; yalnızca izlenen bir olaya dayanmaz', 'Hiçbir zaman sınanamaz'], answer: 1,
        why: ['Gözlemle desteklenmemesi, önermeyi yanlış yapmaz.', 'Önerme doğru olabilir; yalnızca bir gözleme dayanmaz.', 'Yeni gözlemlerle sınanabilir.'], scene: 7 },
    ],
    summary: ['Tepkimede ışık ve ısı görülür; atom düzeyinde elektron verilir ve alınır.', '<b>Metal atomu katyona, ametal atomu anyona dönüşür.</b>', 'Gözleme dayalı olmayan önerme yanlış değildir; yalnızca izlenmemiştir.'],
    nextLesson: { href: 'b2-iyonik-bag.html', label: 'Sonraki: İyonik bağ ›' },
  });
})();
