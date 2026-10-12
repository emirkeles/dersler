/* B2 — Deneyle modele: durgun sıvının basıncı
   Değişkenler teker teker değiştirilir, ölçümler kaydedilir; veriler P = h·d·g modelini gösterir ve model çıkarımda kullanılır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/B-sivilarda-basinc.md (B2). Sayılar P = h·d·g ile (g = 9,8 m/s², su 1.000 kg/m³) hesaplanmıştır.
   Derinlik ölçeği: 1 m = 500 birim. Kabın yan yüzeyine etki eden kuvvet hesaplanmaz; oklar yalnızca yön ve boy gösterir. */
(() => {
  'use strict';
  const { RENK, sayi, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, tablo, sinifla } = window.KIT;
  const B = window.KIT_B;
  const { lerp, ease } = Ders;
  const BEYAZ = '#ffffff', GOVDE = '#8f9bc4', ZEMIN = '#10162b';
  const ORTA = { dolgu: '#3f6fd0', o: 1 };            // yoğunluğu 2d olan sıvı
  const bin = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  /* Sıvı dolgusunu boyar: 'acik' (su, d), 'orta' (2d), 'koyu' (3d). */
  function boya(el, ad) {
    const r = ad === 'orta' ? ORTA : (B.SIVI[ad] || B.SIVI.acik);
    el.setAttribute('fill', r.dolgu); el.setAttribute('fill-opacity', r.o);
  }
  /* Bir yazının çevresine çerçeve çizer. */
  function cerceve(c, p, el, pad = 9, renk = BEYAZ) {
    const b = el.getBBox();
    return c.S('rect', { x: b.x - pad, y: b.y - pad * 0.5, width: b.width + 2 * pad, height: b.height + pad, rx: 8, fill: 'none', stroke: renk, 'stroke-width': 3 }, p);
  }

  /* ---- basınçölçer ekranı ---- */
  function ekran(c, p, o) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: o.x, y: o.y, width: o.w, height: o.h, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
    const t = yazi(c, g, o.x + o.w / 2, o.y + o.h / 2 + o.size * 0.36, '— Pa', { size: o.size, kalin: 700, renk: RENK.gri });
    return {
      g, t,
      yaz(m, gri) { t.textContent = m; t.style.fill = gri ? RENK.gri : RENK.basinc; t.style.opacity = 1; },
      goster(m, ms = 300) { t.textContent = m; t.style.fill = RENK.basinc; t.style.opacity = 0; return belir(c, t, ms); },
    };
  }
  /* ---- sonda: yüzeyin üstünden inen açık gri çubuk, ucunda sarı çerçeveli daire ---- */
  function sonda(c, p, o) {
    const g = c.S('g', {}, p);
    const cubuk = cizgi(c, g, [o.x, o.top], [o.x, o.y], RENK.cizgi, 3);
    const halka = c.S('circle', { cx: o.x, cy: o.y, r: 26, fill: 'none', stroke: BEYAZ, 'stroke-width': 3 }, g);
    halka.style.opacity = 0;
    const daire = c.S('circle', { cx: o.x, cy: o.y, r: 14, fill: ZEMIN, stroke: RENK.basinc, 'stroke-width': 4 }, g);
    let yy = o.y;
    const koy = (y) => { yy = y; cubuk.setAttribute('y2', y); daire.setAttribute('cy', y); halka.setAttribute('cy', y); };
    return { g, halka, koy, get y() { return yy; }, in(cc, y, ms = 700) { const y0 = yy; return cc.tween(ms, (e) => koy(lerp(y0, y, e)), ease.inOut); } };
  }
  /* ---- Ela'nın düzeneği: kap + ekran + sonda (kap x 80–480, yüzey y 130, taban y 550) ---- */
  function olcumKabi(c, p, o = {}) {
    const x1 = o.x1 == null ? 80 : o.x1, x2 = o.x2 == null ? 480 : o.x2, y = o.y == null ? 130 : o.y, dip = o.dip || 550;
    const ek = o.ekran || { x: x1, y: 30, w: x2 - x1, h: 60, size: 36 };
    const kap = o.sade ? null : B.sivKabi(c, p, { x1, x2, y, dip, sivi: o.sivi, ust: o.ust });
    const ekr = ekran(c, p, ek);
    const sn = sonda(c, p, { x: o.sx == null ? (x1 + x2) / 2 : o.sx, top: ek.y + ek.h + 6, y: o.sy == null ? y - 22 : o.sy });
    return { kap, ek: ekr, sn, hepsi: [kap && kap.g, ekr.g, sn.g].filter(Boolean) };
  }
  /* ---- sol kenarda derinlik cetveli (x 60); yalnızca verilen derinliklere yazı konur ---- */
  function cetvel(c, p, o) {
    const k = B.derinlikCetveli(c, p, { x: 60, y0: 130, olcek: 500, son: o.son, taraf: 'sol', yazilar: [] });
    const yazilar = {};
    (o.yazilar || []).forEach((d) => { yazilar[d] = yazi(c, k.g, 42, 130 + d * 500 + 8, sayi(d), { hiza: 'end', size: 22, renk: RENK.cizgi }); });
    const m = yazi(c, k.g, 60, 114, 'm', { size: 22, renk: RENK.cizgi });
    return { g: k.g, yazilar, m };
  }
  /* ---- düz duvarlı, ölçüsü verilen kap (taban genişliği wB, yüzeyde wU); sıvı alttan dolar ---- */
  let kapNo = 0;
  function sekilliKap(c, p, o) {
    const id = 'b2klp' + (kapNo++);
    const yar = (y) => lerp(o.wB / 2, o.wU / 2, (o.dip - y) / (o.dip - o.yuz));
    const xl = (y) => o.cx - yar(y), xr = (y) => o.cx + yar(y);
    const g = c.S('g', {}, p);
    const kp = c.S('clipPath', { id }, g);
    const kr = c.S('rect', { x: 0, y: o.dip + 10, width: 1000, height: 0 }, kp);
    const sivi = c.S('polygon', { points: `${xl(o.yuz)},${o.yuz} ${xr(o.yuz)},${o.yuz} ${xr(o.dip)},${o.dip} ${xl(o.dip)},${o.dip}`, 'clip-path': `url(#${id})` }, g);
    boya(sivi, 'acik');
    c.S('path', { d: `M${xl(o.ust)},${o.ust} L${xl(o.dip)},${o.dip} L${xr(o.dip)},${o.dip} L${xr(o.ust)},${o.ust}`, fill: 'none', stroke: GOVDE, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    let yy = o.dip + 10;
    const seviye = (y) => { yy = y; kr.setAttribute('y', y); kr.setAttribute('height', Math.max(0, o.dip + 10 - y)); };
    return {
      g, sivi, seviye, boya: (ad) => boya(sivi, ad),
      doldur(cc, ms = 800) { const y0 = yy; return cc.tween(ms, (e) => seviye(lerp(y0, o.yuz, e)), ease.inOut); },
    };
  }
  /* Delikten fışkıran su: yatay fırlatılan parabol; ac() çizer. */
  function akinti(c, p, hx, hy, yon, L) {
    const H = 470 - hy;
    const yol = c.S('path', { d: `M${hx},${hy}`, fill: 'none', stroke: RENK.sivi, 'stroke-width': 5, 'stroke-linecap': 'round' }, p);
    const ciz = (f) => {
      let d = `M${hx},${hy}`; const n = Math.max(1, Math.round(f * 24));
      for (let i = 1; i <= n; i++) { const s = f * i / n; d += ` L${hx + yon * L * s},${hy + H * s * s}`; }
      yol.setAttribute('d', d);
    };
    return { yol, ciz, ac(cc, ms = 700) { return cc.tween(ms, (e) => ciz(e), ease.linear); } };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const sahne = c.S('g', {}, svg);
    B.sivKabi(c, sahne, { x1: 330, x2: 670, y: 170, dip: 500 });
    ok(c, sahne, [290, 175], [290, 470], BEYAZ, 3);
    yazi(c, sahne, 275, 330, 'derinlik', { hiza: 'end', size: 24, kalin: 600 });
    [230, 430].forEach((y) => c.S('circle', { cx: 500, cy: y, r: 14, fill: ZEMIN, stroke: RENK.basinc, 'stroke-width': 4 }, sahne));
    gizle(sahne);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, sahne, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Sıvıda derine inildikçe basınç nasıl değişir?',
      options: ['Azalır', 'Artar', 'Değişmez'], answer: 1,
      hints: ['Derindeki noktanın üstünde daha yüksek bir su sütunu var.', '', 'Sporcu indikçe kulağındaki baskı artıyordu.'],
      right: 'Evet. Yüksek sütun ağır, ağır sütun büyük basınç.',
    });
    c.clearSay();
    await belir(c, sahne, 400, 0); sahne.remove();
    const blok = c.S('g', {}, svg);
    c.S('rect', { x: 400, y: 300, width: 200, height: 100, rx: 6, fill: GOVDE, 'fill-opacity': 0.55, stroke: RENK.cizgi, 'stroke-width': 3 }, blok);
    cizgi(c, blok, [300, 400], [700, 400], RENK.cizgi, 3);
    cizgi(c, blok, [400, 400], [600, 400], RENK.alan, 7);
    ok(c, blok, [500, 200], [500, 296], RENK.kuvvet, 7);
    yazi(c, blok, 530, 252, 'G', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet });
    yazi(c, blok, 500, 446, 'A', { size: 28, kalin: 700, renk: RENK.alan });
    gizle(blok); await belir(c, blok, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Yatay zeminde duran bir cismin zemine yaptığı basınç hangi bağıntıyla bulunur?',
      options: ['P = G · A', 'P = A / G', 'P = G / A'], answer: 2,
      hints: ['Basınç, kuvvetin yüzey alanına bölümüdür.', 'Yatay zeminde kuvvet cismin ağırlığıdır.', ''],
      right: 'Evet. Basınç, ağırlığın yüzey alanına bölümüdür.',
    });
    c.clearSay();
    await belir(c, blok, 400, 0); blok.remove();
    const son = renkli(c, svg, 500, 292, [['ölç', RENK.alan], ' → kaydet → ', ['model', RENK.basinc]], { size: 44, kalin: 700 });
    gizle(son);
    await par(c.say('Bugün durgun sıvının basıncını ölçüp modele dökeceğiz.'), belir(c, son, 450));
  }

  /* ---- 2. Deneyi tasarla ---- */
  async function tasarla(c) {
    const svg = c.svg(1000, 562);
    const d = olcumKabi(c, svg);
    const cet = cetvel(c, svg, { son: 0.1, yazilar: [0.1] });
    // derinlik gösterimi: yüzeyden sondaya dik kesikli çizgi
    const kes = c.S('g', {}, svg);
    cizgi(c, kes, [330, 130], [330, 180], BEYAZ, 2, { 'stroke-dasharray': '6 5' });
    cizgi(c, kes, [296, 180], [330, 180], BEYAZ, 2, { 'stroke-dasharray': '6 5' });
    yazi(c, kes, 345, 162, 'derinlik', { hiza: 'start', size: 22, kalin: 600 });
    const KUT = [{ x: 560, ad: 'Değişir', renk: BEYAZ }, { x: 760, ad: 'Sabit kalır', renk: RENK.gri }];
    const kutular = KUT.map((k) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, k.x, 405, 180, 140, { rx: 10 });
      yazi(c, g, k.x + 90, 436, k.ad, { size: 22, kalin: 700, renk: k.renk });
      return g;
    });
    const KART = [{ ad: 'derinlik', kutu: 0, cumle: 'Derinlik değişen değişkendir.', neden: 'Evet. Etkisi ölçülen değişken değişir.' },
      { ad: 'sıvının türü', kutu: 1, cumle: 'Sıvının türü sabit kalır.', neden: 'Evet. Hep aynı sıvıyla ölçülür.' },
      { ad: 'kabın şekli', kutu: 1, cumle: 'Kabın şekli sabit kalır.', neden: 'Evet. Hep aynı kapla ölçülür.' }];
    KART.forEach((k, i) => {
      k.g = c.S('g', {}, svg);
      k.r = kutu(c, k.g, 560, 140 + 90 * i, 380, 70, { rx: 12 });
      yazi(c, k.g, 750, 140 + 90 * i + 44, k.ad, { size: 28, kalin: 700 });
      k.cy = 140 + 90 * i + 35;
    });
    const sayac = [0, 0];
    gizle(d.hepsi, cet.g, kes, kutular, KART.map((k) => k.g));
    gizle(cet.yazilar[0.1]);

    await par(c.say('Ela, durgun sıvının basıncına neyin etki ettiğini ölçmek istiyor.'), belir(c, d.hepsi, 450));
    await par(c.say('Sıvıya daldırılan bir basınçölçer, o noktadaki basıncı gösterir.'), (async () => {
      await par(belir(c, cet.g, 300), belir(c, cet.yazilar[0.1], 300));
      await d.sn.in(c, 180, 700);
      await d.ek.goster('980 Pa', 300);
    })());
    await par(c.say('Sondanın serbest yüzeyden dik uzaklığı, derinliktir.'), belir(c, kes, 400));
    await c.say('Deneyde bir değişken değiştirilir, ötekiler sabit tutulur.');
    await c.say('Böylece basıncın değişmesinin nedeni, değiştirilen değişkendir.');
    await par(c.say('İlk deneyde Ela derinliği değiştiriyor.'), (async () => {
      await belir(c, kutular, 300);
      for (const k of KART) { await belir(c, k.g, 300); await c.wait(300); }
    })());
    c.clearSay();
    // Dene: her kart bir kutuya yerleşir.
    await sinifla(c, {
      tag: 'Dene', kutular: ['Değişir', 'Sabit kalır'],
      kartlar: KART.map((k) => Object.assign({ ipucu: 'Bir seferde yalnızca bir değişken değişir.' }, k)),
      soru: (k) => `Ela derinliğin etkisini ölçüyor. “${k.ad}” deneyde değişir mi, sabit mi kalır?`,
      sec: async (_, k) => { k.r.setAttribute('stroke', BEYAZ); k.r.setAttribute('stroke-width', 4); },
      yerlestir: async (_, k) => {
        const tx = KUT[k.kutu].x + 90, ty = 474 + sayac[k.kutu] * 34;
        const ad = yazi(c, svg, tx, ty, k.ad, { size: 22, kalin: 600 });
        gizle(ad);
        // Kart yerinde küçülüp söner (kutuya doğru uçarsa yazısı kutu başlığının üstünden geçer), adı kutuda belirir.
        await c.tween(400, (e) => {
          k.g.setAttribute('transform', `translate(750,${k.cy}) scale(${lerp(1, 0.6, e)}) translate(-750,${-k.cy})`);
          k.g.style.opacity = 1 - e;
        }, ease.in);
        k.g.remove();
        await par(c.say(k.cumle), belir(c, ad, 300));
        sayac[k.kutu]++;
      },
    });
    c.clearSay();
    await c.say('Değişen tek şey derinlik olunca, ölçerdeki değişimin nedeni derinliktir.');
  }

  /* ---- 3. Derinlik ve basınç ---- */
  async function derinlik(c) {
    const svg = c.svg(1000, 562);
    const d = olcumKabi(c, svg);
    const cet = cetvel(c, svg, { son: 0.4, yazilar: [0.1, 0.2, 0.4] });
    const tb = tablo(c, svg, { x: 560, y: 130, satir: 3, h: 50, sutunlar: [{ ad: 'Derinlik (m)', w: 170 }, { ad: 'Basınç (Pa)', w: 170, renk: RENK.basinc }] });
    [['0,1', '980'], ['0,2', '1.960'], ['0,4', '3.920']].forEach((s, i) => { tb.yaz(i, 0, s[0]); tb.yaz(i, 1, s[1], RENK.basinc); });
    const sSivi = yazi(c, svg, 650, 62, 'sıvı: sabit', { size: 22, renk: RENK.gri });
    const sKap = yazi(c, svg, 840, 62, 'kap: sabit', { size: 22, renk: RENK.gri });
    const vur = c.S('rect', { x: 563, y: 133, width: 164, height: 194, rx: 8, fill: 'none', stroke: BEYAZ, 'stroke-width': 3 }, svg);
    const sonuc = renkli(c, svg, 735, 500, ['derinlik ↑ → ', ['basınç', RENK.basinc], ' ↑ (doğru orantı)'], { size: 24, kalin: 600 });
    gizle(d.hepsi, cet.g, tb.g, sSivi, sKap, vur, sonuc, Object.values(cet.yazilar));
    const yaz = (k) => belir(c, cet.yazilar[k], 250);

    await par(c.say('Ela sondayı yüzeyin 0,1 metre altına indiriyor.', { speak: 'Ela sondayı yüzeyin sıfır virgül bir metre altına indiriyor.' }), (async () => {
      await par(belir(c, d.hepsi, 450), belir(c, cet.g, 450), belir(c, [tb.g, sSivi, sKap], 450));
      await d.sn.in(c, 180, 700); await yaz(0.1);
    })());
    await par(c.say('Basınçölçer 980 pascal gösteriyor.', { speak: 'Basınçölçer dokuz yüz seksen pascal gösteriyor.' }), par(d.ek.goster('980 Pa', 300), tb.goster(0, 400)));

    await c.choice({
      tag: 'Tahmin et', q: 'Sonda 0,2 metreye inerse ölçerin değeri nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
      hints: ['', 'Daha derinde üstteki sütun daha yüksek.', 'Yüksek sütun daha büyük basınç yapar.'],
      right: 'Evet. Daha derinde basınç daha büyük.',
    });
    c.clearSay();
    await belir(c, vur, 300); d.sn.halka.style.opacity = 1;
    await par(c.say('Sonda 0,2 metreye iniyor; ölçer 1.960 pascal gösteriyor.', { speak: 'Sonda sıfır virgül iki metreye iniyor; ölçer bin dokuz yüz altmış pascal gösteriyor.' }), (async () => {
      await d.sn.in(c, 230, 700); await par(yaz(0.2), d.ek.goster('1.960 Pa', 300), tb.goster(1, 400));
    })());
    await par(c.say('Sonda 0,4 metreye iniyor; ölçer 3.920 pascal gösteriyor.', { speak: 'Sonda sıfır virgül dört metreye iniyor; ölçer üç bin dokuz yüz yirmi pascal gösteriyor.' }), (async () => {
      await d.sn.in(c, 330, 700); await par(yaz(0.4), d.ek.goster('3.920 Pa', 300), tb.goster(2, 400));
    })());
    tb.vurgula(0); tb.vurgula(1);
    await c.say('Derinlik iki katına çıkınca basınç da iki katına çıktı.');
    tb.vurgula(1, false); tb.vurgula(2);
    await c.say('Derinlik dört katına çıkınca basınç da dört katına çıktı.');
    tb.vurgula(0, false); tb.vurgula(2, false);
    await par(c.say('Basınç, derinlikle doğru orantılıdır.'), belir(c, sonuc, 450));
  }

  /* ---- 4. Sıvı türü ve basınç ---- */
  async function siviTuru(c) {
    const svg = c.svg(1000, 562);
    const X = [[80, 300], [390, 610], [700, 920]], AD = ['su (d)', 'sıvı L (2d)', 'sıvı M (3d)'], RN = ['acik', 'orta', 'koyu'];
    const kaplar = X.map(([x1, x2], i) => {
      const g = c.S('g', {}, svg);
      const o = olcumKabi(c, g, { x1, x2, y: 180, dip: 480, ust: 150, ekran: { x: x1, y: 60, w: x2 - x1, h: 60, size: 28 }, sy: 280 });
      boya(o.kap.sivi, RN[i]);
      const kes = cizgi(c, g, [x1, 280], [x2, 280], BEYAZ, 2, { 'stroke-dasharray': '8 6' });
      g.insertBefore(kes, o.sn.g);
      yazi(c, g, (x1 + x2) / 2, 512, AD[i], { size: 22, kalin: 600 });
      return Object.assign(o, { grp: g });
    });
    kaplar[0].ek.yaz('1.960 Pa');
    const etiket = yazi(c, svg, 45, 288, '0,2 m', { size: 22, kalin: 600 });
    const dSabit = yazi(c, svg, 250, 548, 'derinlik: sabit', { size: 22, renk: RENK.gri });
    const yDeg = yazi(c, svg, 720, 548, 'yoğunluk: değişir', { size: 22, kalin: 700 });
    const yCer = cerceve(c, svg, yDeg);
    const x2 = yazi(c, svg, 345, 104, '× 2', { size: 24, kalin: 700 });
    const x3g = c.S('g', {}, svg);
    c.S('path', { d: 'M190,60 V50 H810 V60', fill: 'none', stroke: BEYAZ, 'stroke-width': 2 }, x3g);
    yazi(c, x3g, 500, 40, '× 3', { size: 24, kalin: 700 });
    const oran = renkli(c, svg, 500, 548, ['yoğunluk ↑ → ', ['basınç', RENK.basinc], ' ↑ (doğru orantı)'], { size: 24, kalin: 600 });
    gizle(kaplar[0].grp, kaplar[1].grp, kaplar[2].grp, etiket, dSabit, yDeg, yCer, x2, x3g, oran);

    await par(c.say('Şimdi Ela derinliği 0,2 metrede sabit tutuyor, sıvıyı değiştiriyor.', { speak: 'Şimdi Ela derinliği sıfır virgül iki metrede sabit tutuyor, sıvıyı değiştiriyor.' }), belir(c, [kaplar[0].grp, etiket, dSabit], 450));
    await c.say('Birinci kapta su var; yoğunluğu d.', { speak: 'Birinci kapta su var; yoğunluğu de.' });
    await par(c.say('İkinci kaptaki sıvının yoğunluğu 2d, üçüncününki 3d.', { speak: 'İkinci kaptaki sıvının yoğunluğu iki de, üçüncününki üç de.' }), (async () => {
      await belir(c, kaplar[1].grp, 400); await belir(c, kaplar[2].grp, 400); await par(belir(c, yDeg, 300), belir(c, yCer, 300));
    })());
    await par(c.say('Ölçerler 1.960, 3.920 ve 5.880 pascal gösteriyor.', { speak: 'Ölçerler bin dokuz yüz altmış, üç bin dokuz yüz yirmi ve beş bin sekiz yüz seksen pascal gösteriyor.' }), (async () => {
      await kaplar[1].ek.goster('3.920 Pa', 300); await c.wait(300); await kaplar[2].ek.goster('5.880 Pa', 300);
    })());
    await par(c.say('Yoğunluk iki katına çıkınca basınç da iki katına çıkıyor.'), belir(c, x2, 400));
    await par(c.say('Yoğunluk üç katına çıkınca basınç da üç katına çıkıyor.'), (async () => { await belir(c, x2, 250, 0); await belir(c, x3g, 400); })());
    await belir(c, [x3g, dSabit, yDeg, yCer], 300, 0);
    await par(c.say('Basınç, yoğunlukla doğru orantılıdır.'), belir(c, oran, 450));
  }

  /* ---- 5. Kabın şekli ve sıvı miktarı ---- */
  async function kapSekli(c) {
    const svg = c.svg(1000, 562);
    const TAB = 430, YUZ = 280;
    const PR = [{ cx: 140, wB: 100, wU: 160, et: 'A', mik: 'az sıvı' }, { cx: 390, wB: 200, wU: 200, et: '2A', mik: 'orta sıvı' }, { cx: 740, wB: 300, wU: 160, et: '3A', mik: 'çok sıvı' }];
    const kaplar = PR.map((q) => {
      const g = c.S('g', {}, svg);
      const k = sekilliKap(c, g, { cx: q.cx, dip: TAB, yuz: YUZ, ust: 250, wB: q.wB, wU: q.wU });
      cizgi(c, g, [q.cx - q.wB / 2, TAB], [q.cx + q.wB / 2, TAB], RENK.alan, 7);
      const et = yazi(c, g, q.cx, 470, q.et, { size: 22, kalin: 700, renk: RENK.alan });
      const mik = yazi(c, g, q.cx, 512, q.mik, { size: 22, kalin: 600 });
      gizle(mik);
      const ek = ekran(c, g, { x: q.cx - 100, y: 90, w: 200, h: 60, size: 28 });
      const sn = sonda(c, g, { x: q.cx, top: 156, y: 226 });
      gizle(ek.g, sn.g);
      return Object.assign(k, { grp: g, mik, ek, sn });
    });
    const h = c.S('g', {}, svg);
    cizgi(c, h, [50, YUZ], [830, YUZ], BEYAZ, 2, { 'stroke-dasharray': '8 6' });
    yazi(c, h, 575, 268, 'h = 0,3 m', { size: 22, kalin: 600 });
    const sabit = yazi(c, svg, 500, 60, 'su: sabit', { size: 22, renk: RENK.gri });
    // orta kabın duvarlarına yan basınç okları (yalnızca yön ve boy)
    const yanlar = c.S('g', {}, svg);
    [[0.25, 20], [0.5, 40], [0.75, 60]].forEach(([f, L]) => {
      const y = YUZ + f * (TAB - YUZ);
      ok(c, yanlar, [290 + L, y], [290, y], RENK.basinc, 5);
      ok(c, yanlar, [490 - L, y], [490, y], RENK.basinc, 5);
    });
    gizle(h, sabit, yanlar);

    await c.say('Ela şekilleri farklı üç kap alıyor; taban alanları A, 2A ve 3A.', { speak: 'Ela şekilleri farklı üç kap alıyor; taban alanları a, iki a ve üç a.' });
    await par(c.say('Hepsine aynı sıvıdan, 0,3 metre yüksekliğe kadar dolduruyor.', { speak: 'Hepsine aynı sıvıdan, sıfır virgül üç metre yüksekliğe kadar dolduruyor.' }), (async () => {
      await par(...kaplar.map((k) => k.doldur(c, 900)));
      await par(belir(c, h, 350), belir(c, sabit, 350));
    })());
    await par(c.say('Sağdaki kapta en çok sıvı, en geniş taban var.'), belir(c, kaplar.map((k) => k.mik), 400));
    c.clearSay();
    await belir(c, kaplar.flatMap((k) => [k.ek.g, k.sn.g]), 400);
    await c.choice({
      tag: 'Tahmin et', q: 'Ela basınçölçerleri kapların tabanına indiriyor. Tabandaki basınç nasıl olur?',
      options: ['Sağdaki kapta daha büyük', 'Üç kapta da aynı', 'Soldaki kapta daha büyük'], answer: 1,
      hints: ['Basınç hangi üç şeye bağlıydı?', '', 'Üç kapta derinlik, yoğunluk ve g aynı.'],
      right: 'Evet. Derinlik, yoğunluk ve g aynı.',
    });
    c.clearSay();
    await par(c.say('Ela basınçölçerleri kapların tabanına indiriyor.'), par(...kaplar.map((k) => k.sn.in(c, 420, 700))));
    await par(c.say('Üç ölçer de tabanda 2.940 pascal gösteriyor.', { speak: 'Üç ölçer de tabanda iki bin dokuz yüz kırk pascal gösteriyor.' }), par(...kaplar.map((k) => k.ek.goster('2.940 Pa', 300))));
    await c.say('Taban alanı ve sıvı miktarı değişti; basınç değişmedi.', { speak: '[thoughtful] Taban alanı ve sıvı miktarı değişti; basınç değişmedi.' });
    await c.say('Basınç, kabın şekline ve sıvının miktarına bağlı değildir.');
    await par(c.say('Sıvı, kabın tabanına olduğu gibi yan yüzeylerine de basınç uygular.'), belir(c, yanlar, 450));
  }

  /* ---- 6. Verilerden modele ---- */
  async function veridenModele(c) {
    const svg = c.svg(1000, 562);
    const tb = tablo(c, svg, {
      x: 190, y: 90, satir: 3, h: 60, size: 24,
      sutunlar: [{ ad: 'h (m)', w: 130 }, { ad: 'd (kg/m³)', w: 170 }, { ad: 'P (Pa)', w: 140, renk: RENK.basinc }, { ad: 'P ÷ (h·d)', w: 180 }],
    });
    [['0,1', '1.000', '980'], ['0,2', '1.000', '1.960'], ['0,4', '1.000', '3.920']].forEach((s, i) => {
      tb.yaz(i, 0, s[0]); tb.yaz(i, 1, s[1]); tb.yaz(i, 2, s[2], RENK.basinc);
    });
    const baslik4 = tb.g.querySelectorAll('text')[3];
    const cerc = [0, 1, 2].map((i) => {
      const r = c.S('rect', { x: 634, y: 150 + 60 * i + 4, width: 172, height: 52, rx: 8, fill: 'none', stroke: BEYAZ, 'stroke-width': 3 }, tb.satirlar[i].g);
      r.style.opacity = 0; return r;
    });
    const formul = renkli(c, svg, 500, 440, [['P', RENK.basinc], ' = 9,8·h·d'], { size: 44, kalin: 700 });
    tb.satirlar.forEach((q) => gizle(q.hucreler[3]));
    gizle(baslik4, formul);
    tb.g.style.opacity = 0;

    await par(c.say('Suyun yoğunluğu 1.000 kilogram bölü metreküptür.', { speak: 'Suyun yoğunluğu bin kilogram bölü metreküptür.' }), (async () => {
      await belir(c, tb.g, 300);
      for (let i = 0; i < 3; i++) { await tb.goster(i, 350); }
    })());
    await par(c.say('Her satırda basıncı, h ile d’nin çarpımına bölüyoruz.', { speak: 'Her satırda basıncı, he ile de’nin çarpımına bölüyoruz.' }), belir(c, baslik4, 400));
    await par(c.say('Bölüm her satırda aynı çıkıyor: 9,8.', { speak: 'Bölüm her satırda aynı çıkıyor: dokuz virgül sekiz.' }), (async () => {
      for (let i = 0; i < 3; i++) { tb.yaz(i, 3, '9,8'); await par(belir(c, tb.satirlar[i].hucreler[3], 400), belir(c, cerc[i], 400)); await c.wait(300); }
    })());
    await par(c.say('Demek ki basınç, derinlik ile yoğunluğun çarpımının 9,8 katıdır.', { speak: 'Demek ki basınç, derinlik ile yoğunluğun çarpımının dokuz virgül sekiz katıdır.' }), belir(c, formul, 500));
  }

  /* ---- 7. Aynı model ağırlıktan çıkar ---- */
  async function agirlik(c) {
    const svg = c.svg(1000, 562);
    const kap = B.sivKabi(c, svg, { x1: 90, x2: 290, y: 150, dip: 470, ust: 110 });
    const taban = cizgi(c, svg, [90, 470], [290, 470], RENK.alan, 7);
    const aE = yazi(c, svg, 190, 508, 'A', { size: 28, kalin: 700, renk: RENK.alan });
    const hU = ok(c, svg, [70, 310], [70, 150], BEYAZ, 3), hD = ok(c, svg, [70, 310], [70, 470], BEYAZ, 3);
    const hE = yazi(c, svg, 40, 318, 'h', { size: 28, kalin: 700 });
    const dE = yazi(c, svg, 130, 430, 'd', { size: 28, kalin: 700 });
    const Gok = ok(c, svg, [190, 262], [190, 346], RENK.kuvvet, 7);
    const gE = yazi(c, svg, 212, 310, 'G', { hiza: 'start', size: 28, kalin: 700, renk: RENK.kuvvet });
    const SAT = [110, 190, 270, 350, 430];
    const mk = (i, parcalar) => renkli(c, svg, 400, SAT[i] + 12, parcalar, { hiza: 'start', size: 36, kalin: 700 });
    const r1 = mk(0, [['P', RENK.basinc], ' = ', ['G', RENK.kuvvet], ' / ', ['A', RENK.alan]]);
    const r2 = mk(1, ['V = ', ['A', RENK.alan], '·h']);
    const r3 = mk(2, ['m = d·V']);
    const r4 = mk(3, [['G', RENK.kuvvet], ' = m·g']);
    const r5 = mk(4, [['P', RENK.basinc], ' = h·d·g']);
    // A'nın sadeleştiği ara satır: P = d·A·h·g / A
    const frac = c.S('g', {}, svg);
    yazi(c, frac, 400, 442, 'P =', { hiza: 'start', size: 36, kalin: 700, renk: RENK.basinc });
    const pay = renkli(c, frac, 590, 424, ['d·', ['A', RENK.alan], '·h·g'], { size: 32, kalin: 700 });
    cizgi(c, frac, [490, 434], [690, 434], BEYAZ, 3);
    const payda = yazi(c, frac, 590, 470, 'A', { size: 32, kalin: 700, renk: RENK.alan });
    const cerceve5 = c.S('rect', { x: 388, y: 392, width: 330, height: 60, rx: 10, fill: 'none', stroke: RENK.basinc, 'stroke-width': 4 }, svg);
    const gSat = renkli(c, svg, 660, 505, ['g = 9,8 m/s²'], { size: 30, kalin: 700 });
    const birim = renkli(c, svg, 660, 505, ['h: m · d: kg/m³ · g: m/s² · ', ['P: Pa', RENK.basinc]], { size: 26, kalin: 600 });
    gizle(kap.g, taban, aE, hU.g, hD.g, hE, dE, Gok.g, gE, r1, r2, r3, r4, r5, frac, cerceve5, gSat, birim);

    await par(c.say('Silindirik bir kapta sıvının ağırlığı, tabana bastırır.'), belir(c, [kap.g, Gok.g, gE], 450));
    await par(c.say('Basınç, ağırlığın taban alanına bölümüdür: P = G / A.', { speak: 'Basınç, ağırlığın taban alanına bölümüdür: pe eşittir ge bölü a.' }), belir(c, [r1, taban, aE], 400));
    await par(c.say('Sıvının hacmi, taban alanı çarpı yüksekliktir: V = A·h.', { speak: 'Sıvının hacmi, taban alanı çarpı yüksekliktir: ve eşittir a çarpı he.' }), belir(c, [r2, hU.g, hD.g, hE], 400));
    await par(c.say('Kütle, yoğunluk çarpı hacimdir: m = d·V.', { speak: 'Kütle, yoğunluk çarpı hacimdir: em eşittir de çarpı ve.' }), belir(c, [r3, dE], 400));
    await par(c.say('Ağırlık, kütle çarpı g’dir: G = m·g.', { speak: 'Ağırlık, kütle çarpı ge’dir: ge eşittir em çarpı ge.' }), belir(c, r4, 400));
    // Hepsini P = G / A içine yaz: A sadeleşir.
    await par(c.say('Hepsini P = G / A içine yazınca A sadeleşir.', { speak: 'Hepsini pe eşittir ge bölü a içine yazınca a sadeleşir.' }), (async () => {
      await par(belir(c, [r1, r2, r3, r4], 400, 0.45), belir(c, frac, 400));
      const e1 = pay.getExtentOfChar(2), e2 = payda.getExtentOfChar(0);
      const kes = (e) => cizgi(c, frac, [e.x - 3, e.y + e.height * 0.9], [e.x + e.width + 3, e.y + e.height * 0.1], BEYAZ, 3);
      const k1 = kes(e1), k2 = kes(e2);
      gizle(k1, k2); await belir(c, [k1, k2], 400);
    })());
    await par(c.say('Sonuç: P = h·d·g.', { speak: '[short pause] Sonuç: pe eşittir he çarpı de çarpı ge.' }), (async () => {
      await belir(c, frac, 300, 0); frac.remove();
      await belir(c, r5, 400); await belir(c, cerceve5, 300);
    })());
    await par(c.say('Tablodaki 9,8, yer çekimi ivmesidir: g = 9,8 m/s².', { speak: 'Tablodaki dokuz virgül sekiz, yer çekimi ivmesidir: ge eşittir dokuz virgül sekiz metre bölü saniye kare.' }), belir(c, gSat, 400));
    await par(c.say('h metre, d kg/m³, g m/s² olunca P pascal çıkar.', { speak: 'He metre, de kilogram bölü metreküp, ge metre bölü saniye kare olunca pe pascal çıkar.' }), (async () => {
      await belir(c, [r1, r2, r3, r4, gSat], 300, 0); gSat.remove();
      await belir(c, birim, 450);
    })());
  }

  /* ---- 8. Modelle çıkarım ---- */
  async function cikarim(c) {
    const svg = c.svg(1000, 562);
    const d = olcumKabi(c, svg, { sy: 180 });
    const cet = cetvel(c, svg, { son: 0.8, yazilar: [0.1, 0.5, 0.4, 0.8] });
    const Y = (m) => 130 + m * 500;
    d.sn.koy(Y(0.1));
    d.ek.yaz('980 Pa');
    // koyu sıvı katmanı (yoğunluğu 2d)
    const kat = c.S('rect', { x: 80, y: 130, width: 400, height: 420, fill: ORTA.dolgu, 'fill-opacity': 1 }, d.kap.g);
    d.kap.g.insertBefore(kat, d.kap.sivi.nextSibling);
    kat.style.opacity = 0;
    const SX = 520;
    const l1 = renkli(c, svg, SX, 220, [['P', RENK.basinc], ' = h·d·g'], { hiza: 'start', size: 28, kalin: 700 });
    // iki parçalı satır: ana + parantez; ikincisi birincinin sağına gelir
    const satir = (y, ana, ek) => {
      const a = renkli(c, svg, SX, y, ana, { hiza: 'start', size: 28, kalin: 700 });
      const w = a.getBBox().width;
      const b = renkli(c, svg, SX + w + 14, y, [ek], { hiza: 'start', size: 28, kalin: 600 });
      b.style.fill = RENK.gri; gizle(a, b); return { a, b, sil() { a.remove(); b.remove(); } };
    };
    const hepsi = [...d.hepsi, cet.g, l1];
    gizle(hepsi, Object.values(cet.yazilar));
    const yaz = (k, ms = 250) => belir(c, cet.yazilar[k], ms);
    d.ek.yaz('980 Pa');

    await par(c.say('Model elimizdeyken ölçmeden de çıkarım yapabiliriz.', { speak: '[curious] Model elimizdeyken ölçmeden de çıkarım yapabiliriz.' }), (async () => {
      await belir(c, [...d.hepsi, cet.g], 450); await belir(c, l1, 400);
    })());
    await par(c.say('Ela suda 0,1 metre derinlikte 980 pascal ölçmüştü.', { speak: 'Ela suda sıfır virgül bir metre derinlikte dokuz yüz seksen pascal ölçmüştü.' }), yaz(0.1));
    let s2 = satir(310, ['h × 5'], '(d ve g aynı)');
    let s3 = satir(400, [['P', RENK.basinc], ' × 5 = 4.900 Pa'], '');
    await par(c.say('Sonda 0,5 metreye iniyor: derinlik beş katına çıktı.', { speak: 'Sonda sıfır virgül beş metreye iniyor: derinlik beş katına çıktı.' }), (async () => {
      await d.sn.in(c, Y(0.5), 700); await par(yaz(0.5), belir(c, s2.a, 400));
    })());
    await par(c.say('Sıvı da yer de aynı: d ile g değişmedi.', { speak: 'Sıvı da yer de aynı: de ile ge değişmedi.' }), belir(c, s2.b, 400));
    await par(c.say('Basınç da beş katına çıkar: 4.900 pascal.', { speak: 'Basınç da beş katına çıkar: dört bin dokuz yüz pascal.' }), par(belir(c, s3.a, 400), d.ek.goster('4.900 Pa', 300)));

    // Birlikte çöz: sıvı yoğunlaşır (2d)
    c.clearSay();
    s2.sil(); s3.sil();
    await belir(c, [cet.yazilar[0.1]], 250, 0);
    await par(c.say('Şimdi Ela suyu, yoğunluğu suyun iki katı olan bir sıvıyla değiştiriyor.'), belir(c, kat, 500));
    s2 = satir(310, ['d × 2'], '(h ve g aynı)');
    s3 = satir(400, [['P', RENK.basinc], ' × ?'], '');
    await par(belir(c, [s2.a, s2.b], 400), belir(c, s3.a, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sonda yine 0,5 metrede, sıvının yoğunluğu 2d. Basınç ne olur?',
      options: ['Değişmez: 4.900 Pa', 'Dört katına çıkar: 19.600 Pa', 'İki katına çıkar: 9.800 Pa'], answer: 2,
      hints: ['Modelde yalnızca d değişti; h ve g aynı.', 'd iki katına çıktı; basınç da aynı oranda değişir.', ''],
      right: 'Evet. d iki katına çıkınca basınç da iki katına çıkar.',
    });
    c.clearSay();
    s3.sil(); s3 = satir(400, [['P', RENK.basinc], ' × 2 = 9.800 Pa'], '');
    await par(c.say('Yoğunluk iki katına çıktı; basınç da iki katına çıktı: 9.800 pascal.', { speak: 'Yoğunluk iki katına çıktı; basınç da iki katına çıktı: dokuz bin sekiz yüz pascal.' }), par(belir(c, s3.a, 400), d.ek.goster('9.800 Pa', 300)));

    // Sıra sende: su geri gelir, sonda 0,4 metrede
    c.clearSay();
    s2.sil(); s3.sil();
    await par(belir(c, kat, 500, 0), belir(c, cet.yazilar[0.5], 250, 0), d.sn.in(c, Y(0.4), 700));
    await par(c.say('Kapta yine su var; sonda 0,4 metrede, ölçer 3.920 pascal gösteriyor.', { speak: 'Kapta yine su var; sonda sıfır virgül dört metrede, ölçer üç bin dokuz yüz yirmi pascal gösteriyor.' }), par(yaz(0.4), d.ek.goster('3.920 Pa', 300)));
    await c.choice({
      tag: 'Sıra sende', q: 'Ela sondayı 0,8 metreye indirirse ekran ne gösterir?',
      options: ['3.920 Pa', '7.840 Pa', '1.960 Pa'], answer: 1,
      hints: ['Derinlik iki katına çıktı; sıvı aynı.', '', 'Derine inince basınç azalmaz.'],
      right: 'Evet. Derinlik iki katına çıkınca basınç da iki katına çıkar.',
    });
    c.clearSay();
    s2 = satir(310, ['h × 2'], '(d ve g aynı)');
    s3 = satir(400, [['P', RENK.basinc], ' × 2 = 7.840 Pa'], '');
    await par(c.say('Derinlik iki katına çıktı; basınç da iki katına çıktı: 7.840 pascal.', { speak: 'Derinlik iki katına çıktı; basınç da iki katına çıktı: yedi bin sekiz yüz kırk pascal.' }), (async () => {
      await d.sn.in(c, Y(0.8), 700);
      await par(yaz(0.8), d.ek.goster('7.840 Pa', 300), belir(c, [s2.a, s2.b], 400), belir(c, s3.a, 400));
    })());
    c.note('<b>P = h·d·g</b><br>Örnek: derinlik iki katı, basınç iki katı.', 'Sıvı basıncı', 'akiskanlar-b2-model');
  }

  /* ---- 9. Baraj duvarı ---- */
  async function baraj(c) {
    const svg = c.svg(1000, 562);
    const gol = c.S('rect', { x: 60, y: 180, width: 410, height: 320 }, svg);
    boya(gol, 'acik');
    const yuzCizgi = cizgi(c, svg, [60, 180], [470, 180], RENK.cizgi, 3);
    const duvar = c.S('polygon', { points: '470,180 530,180 670,500 470,500', fill: GOVDE, 'fill-opacity': 0.2, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, svg);
    const zemin = cizgi(c, svg, [40, 500], [760, 500], RENK.gri, 3);
    const dE = yazi(c, svg, 600, 250, 'baraj duvarı', { hiza: 'start', size: 22, kalin: 600 });
    const sE = yazi(c, svg, 200, 340, 'su', { size: 24, kalin: 600 });
    const oklar = [[220, 20], [300, 60], [380, 100], [460, 140]].map(([y, L]) => ok(c, svg, [470 - L, y], [470, y], RENK.basinc, 6));
    const kal = c.S('g', {}, svg);
    cizgi(c, kal, [470, 160], [530, 160], RENK.cizgi, 3); cizgi(c, kal, [470, 152], [470, 168], RENK.cizgi, 3); cizgi(c, kal, [530, 152], [530, 168], RENK.cizgi, 3);
    yazi(c, kal, 500, 138, 'ince', { size: 22, kalin: 600 });
    cizgi(c, kal, [470, 525], [670, 525], RENK.cizgi, 3); cizgi(c, kal, [470, 517], [470, 533], RENK.cizgi, 3); cizgi(c, kal, [670, 517], [670, 533], RENK.cizgi, 3);
    yazi(c, kal, 570, 552, 'kalın', { size: 22, kalin: 600 });
    gizle(gol, yuzCizgi, duvar, zemin, dE, sE, oklar.map((o) => o.g), kal);

    await par(c.say('Barajlar, nehrin akışını durdurup suyu bir gölde toplar.'), belir(c, [gol, yuzCizgi, duvar, zemin, dE, sE], 500));
    await par(c.say('Su, baraj duvarının suya değen yüzüne basınç uygular.'), belir(c, oklar[0].g, 400));
    await par(c.say('Derinlik arttıkça basınç artar; oklar aşağı doğru uzar.'), (async () => {
      for (let i = 1; i < 4; i++) { await belir(c, oklar[i].g, 400); await c.wait(300); }
    })());
    await c.say('Alt duvara üst duvardan daha büyük basınç biner.');
    await c.choice({
      tag: 'Tahmin et', q: 'Barajın alt duvarı üst duvarından daha kalın yapılır. Neden?',
      options: ['Alt duvara daha büyük basınç biner', 'Alt duvara daha küçük basınç biner', 'Su yalnızca üst duvara basınç uygular'], answer: 0,
      hints: ['', 'Okların boyuna bak: aşağıda ne olmuş?', 'Daha büyük basınca dayanmak için duvar kalınlaşır.'],
      right: 'Evet. Alt duvara daha büyük basınç biner.',
    });
    c.clearSay();
    await par(c.say('Duvarın altı, üstünden çok daha kalın.'), belir(c, kal, 400));
    await c.say('Büyük basınca dayanmak için barajların alt duvarı daha kalın yapılır.');
  }

  /* ---- 10. Delikli şişe ---- */
  async function sise(c) {
    const svg = c.svg(1000, 562);
    cizgi(c, svg, [60, 470], [940, 470], RENK.gri, 3);
    const sisele = (x1, x2, ad) => {
      const g = c.S('g', {}, svg);
      const su = c.S('rect', { x: x1, y: 150, width: x2 - x1, height: 320 }, g); boya(su, 'acik');
      c.S('path', { d: `M${x1},130 V470 H${x2} V130`, fill: 'none', stroke: GOVDE, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
      yazi(c, g, (x1 + x2) / 2, 108, ad, { size: 24, kalin: 700 });
      return g;
    };
    const s1 = sisele(180, 300, 'Şekil I'), s2 = sisele(640, 760, 'Şekil II');
    const delik = (g, x, y) => c.S('circle', { cx: x, cy: y, r: 5, fill: ZEMIN }, g);
    delik(s1, 180, 230); delik(s1, 300, 230);
    [['A', 180], ['B', 230], ['C', 280]].forEach(([h, y]) => { delik(s2, 760, y); yazi(c, s2, 668, y + 8, h, { hiza: 'end', size: 22, kalin: 700 }); });
    const aS = akinti(c, svg, 180, 230, -1, 110), aS2 = akinti(c, svg, 300, 230, 1, 110);
    const aB = [akinti(c, svg, 760, 180, 1, 75), akinti(c, svg, 760, 230, 1, 111), akinti(c, svg, 760, 280, 1, 126)];
    const ok1 = c.S('g', {}, svg);
    ok(c, ok1, [220, 230], [180, 230], RENK.basinc, 5); ok(c, ok1, [260, 230], [300, 230], RENK.basinc, 5);
    const ok2 = [15, 40, 65].map((L, i) => ok(c, svg, [760 - L, 180 + 50 * i], [760, 180 + 50 * i], RENK.basinc, 5).g);
    gizle(s1, s2, ok1, ok2);
    // harfler s2 içinde: gizlenince birlikte gizlenir

    await par(c.say('Su dolu bir şişenin yan yüzünde delikler açılıyor.'), belir(c, [s1, s2], 500));
    await c.say('Basınç, yan yüzeylerde de derinliğe bağlıdır.');
    await par(c.say('Aynı seviyedeki deliklerde derinlik aynıdır; basınç da aynıdır.'), belir(c, ok1, 400));
    await par(c.say('Bu yüzden sular aynı uzaklığa düşer.'), par(aS.ac(c, 700), aS2.ac(c, 700)));
    await par(c.say('Düşey sıralı deliklerin derinlikleri farklıdır; basınçları da farklıdır.'), (async () => {
      for (const o of ok2) { await belir(c, o, 300); await c.wait(300); }
    })());
    await par(c.say('Derindeki delikte basınç büyüktür; su daha uzağa fışkırır.'), (async () => {
      for (const a of aB) { await a.ac(c, 700); await c.wait(300); }
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'Şekil II’de hangi delikte basınç en büyüktür?',
      options: ['Üç delikte de aynıdır', 'C deliğinde', 'A deliğinde'], answer: 1,
      hints: ['Derinlik arttıkça basınç artar.', '', 'Hangi delik serbest yüzeyden en uzak?'],
      right: 'Evet. En derindeki delikte basınç en büyüktür.',
    });
  }

  /* ---- 11. Kendin dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const PRF = [{ wB: 120, wU: 300 }, { wB: 220, wU: 220 }, { wB: 380, wU: 200 }];
    const kaplar = PRF.map((q) => {
      const k = sekilliKap(c, svg, { cx: 280, dip: 550, yuz: 130, ust: 100, wB: q.wB, wU: q.wU });
      k.seviye(130); return k;
    });
    const d = olcumKabi(c, svg, { sade: true, sy: 130 + 0.2 * 500 });
    const cet = cetvel(c, svg, { son: 0.8, yazilar: [0.2, 0.4, 0.6] });
    let hi = 2, ki = 1, si = 0;
    const SN = ['acik', 'orta', 'koyu'];
    const guncelle = () => {
      kaplar.forEach((k, i) => { k.g.style.opacity = i === ki ? 1 : 0; k.boya(SN[si]); });
      d.sn.koy(130 + hi * 50);
      d.ek.yaz(bin(hi * (si + 1) * 980) + ' Pa');
    };
    guncelle();
    const mtr = (v) => sayi(Math.round(+v * 10) / 10) + ' m';

    await c.say('Şimdi derinliği, sıvıyı ve kabı sen değiştir.');
    await c.say('Her denemede bir değişkeni değiştir, ötekileri sabit tut.');

    // 1. deneme: derinlik
    c.clearSay();
    hi = 2; ki = 1; si = 0; guncelle();
    await c.say('Su, L kabı, derinlik 0,2 metre: ölçer 1.960 pascal gösteriyor.', { speak: 'Su, L kabı, derinlik sıfır virgül iki metre: ölçer bin dokuz yüz altmış pascal gösteriyor.' });
    await c.choice({
      tag: 'Dene', q: 'Derinlik 0,2 metreden 0,6 metreye çıkarsa basınç kaç katına çıkar?',
      options: ['2 katına', '6 katına', '3 katına'], answer: 2,
      hints: ['0,6, 0,2’nin kaç katı?', '0,6, 0,2’nin kaç katı?', ''], right: 'Evet. Derinlik 3 katına çıkar, basınç da.',
    });
    c.clearSay();
    await c.say('Kaydırıcıyı 0,6 metreye getir.', { noWait: true });
    const sl1 = c.slider({ label: 'Derinlik', min: 0.1, max: 0.8, step: 0.1, value: 0.2, fmt: mtr, onInput: (v) => { hi = Math.round(+v * 10); guncelle(); } });
    await c.cont('Devam ›');
    sl1.remove(); hi = 6; guncelle(); c.clearSay();
    await c.say('Derinlik üç katına çıktı; basınç da üç katına çıktı.', { speak: 'Derinlik üç katına çıktı; basınç da üç katına çıktı.' });

    // 2. deneme: kabın şekli
    c.clearSay();
    hi = 4; ki = 0; si = 0; guncelle();
    await c.say('Su, 0,4 metre, K kabı: ölçer 3.920 pascal gösteriyor.', { speak: 'Su, sıfır virgül dört metre, K kabı: ölçer üç bin dokuz yüz yirmi pascal gösteriyor.' });
    await c.choice({
      tag: 'Dene', q: 'Kabı K’dan M’ye değiştirirsek basınç nasıl değişir?',
      options: ['M’de artar', 'Değişmez', 'M’de azalır'], answer: 1,
      hints: ['Kabın şekli basıncı etkilemez.', '', 'Kabın şekli basıncı etkilemez.'], right: 'Evet. Basınç kabın şekline bağlı değil.',
    });
    c.clearSay();
    await c.say('Kabı M’ye getir.', { noWait: true });
    const sl2 = c.slider({ label: 'Kap', min: 0, max: 2, step: 1, value: 0, fmt: (v) => ['K', 'L', 'M'][+v], onInput: (v) => { ki = +v; guncelle(); } });
    await c.cont('Devam ›');
    sl2.remove(); ki = 2; guncelle(); c.clearSay();
    await c.say('Kap değişti; basınç değişmedi.');

    // 3. deneme: sıvı
    c.clearSay();
    hi = 2; ki = 1; si = 0; guncelle();
    await c.say('L kabı, 0,2 metre, su: ölçer 1.960 pascal gösteriyor.', { speak: 'L kabı, sıfır virgül iki metre, su: ölçer bin dokuz yüz altmış pascal gösteriyor.' });
    await c.choice({
      tag: 'Dene', q: 'Sıvıyı d’den 3d’ye değiştirirsek basınç kaç katına çıkar?',
      options: ['Değişmez', '3 katına', '2 katına'], answer: 1,
      hints: ['Yoğunluk üç katına çıktı.', '', 'Yoğunluk üç katına çıktı.'], right: 'Evet. Yoğunluk 3 katına çıkar, basınç da.',
    });
    c.clearSay();
    await c.say('Sıvıyı 3d’ye getir.', { noWait: true, speak: 'Sıvıyı üç de’ye getir.' });
    const sl3 = c.slider({ label: 'Sıvı', min: 0, max: 2, step: 1, value: 0, fmt: (v) => ['d', '2d', '3d'][+v], onInput: (v) => { si = +v; guncelle(); } });
    await c.cont('Devam ›');
    sl3.remove(); si = 2; guncelle(); c.clearSay();
    await c.say('Yoğunluk üç katına çıktı; basınç da üç katına çıktı.');
  }

  Ders.start({
    id: 'akiskanlar-b2', kicker: 'Konu B · Sıvılarda basınç', title: 'Deneyle modele: durgun sıvının basıncı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Deneyle modele: durgun sıvının basıncı',
      hook: 'Baraj duvarları neden aşağıya doğru kalınlaşır?',
      button: 'Derse başla ›',
    },
    goals: ['Değişkenleri teker teker değiştirerek durgun sıvının basıncının neye bağlı olduğunu bulur.', 'Ölçümlerden P = h·d·g modeline ulaşır.', 'Modelle derinlik ya da yoğunluk değişince basıncın nasıl değişeceğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Sıvı basıncı ve basınç bağıntısı hakkında bildiklerini yokla.', run: hatirla },
      { title: 'Deneyi tasarla', goal: 'Hangi değişkenin değişip hangilerinin sabit kalacağını belirle.', run: tasarla },
      { title: 'Derinlik ve basınç', goal: 'Derinlik değişince basıncın nasıl değiştiğini ölç.', run: derinlik },
      { title: 'Sıvı türü ve basınç', goal: 'Yoğunluk değişince basıncın nasıl değiştiğini ölç.', run: siviTuru },
      { title: 'Kabın şekli ve sıvı miktarı', goal: 'Kabın şeklinin ve sıvı miktarının basıncı etkileyip etkilemediğini ölç.', run: kapSekli },
      { title: 'Verilerden modele', goal: 'Ölçümlerden basıncın matematiksel modelini bul.', run: veridenModele },
      { title: 'Aynı model ağırlıktan çıkar', goal: 'Aynı bağıntıyı sıvının ağırlığından türet.', run: agirlik },
      { title: 'Modelle çıkarım', goal: 'Modeli kullanarak ölçmeden basıncı bul.', run: cikarim },
      { title: 'Baraj duvarı', goal: 'Barajın alt duvarının neden kalın olduğunu açıkla.', run: baraj },
      { title: 'Delikli şişe', goal: 'Yan yüzeydeki basıncın derinlikle değiştiğini gör.', run: sise },
      { title: 'Kendin dene', goal: 'Derinliği, sıvıyı ve kabı değiştirerek modeli sına.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Geniş bir gölle dar bir kuyu aynı derinlikte, ikisi de su dolu. Dipteki basınçlar için hangisi doğrudur?',
        options: ['Gölde büyüktür; daha çok su var', 'Aynıdır; basınç şekle ve miktara bağlı değildir', 'Kuyuda büyüktür; su dar yerde sıkışır'], answer: 1,
        why: ['Su miktarı basıncı değiştirmez; derinlik ve yoğunluk aynı.', 'Basınç derinliğe, yoğunluğa ve g’ye bağlıdır; şekil ve miktar etkisizdir.', 'Dar yerde su sıkışmaz; basınç yalnızca derinlikle belirlenir.'], scene: 4 },
      { q: 'Aynı denizde bir dalgıç 5 metreden 15 metreye iniyor. Çevresindeki basınç nasıl değişir?',
        options: ['Değişmez', '2 katına çıkar', '3 katına çıkar'], answer: 2,
        why: ['Derinlik arttığı için basınç da değişir.', '15 metre, 5 metrenin 2 katı değil; 3 katıdır.', 'Derinlik 3 katına çıkar; basınç derinlikle doğru orantılı olduğundan o da 3 katına çıkar.'], scene: 2 },
      { q: 'Yoğunluğu d olan suyun 0,4 metre derinliğindeki basınç, yoğunluğu 2d olan bir sıvının kaç metre derinliğindeki basınca eşittir?',
        options: ['0,2 metre', '0,4 metre', '0,8 metre'], answer: 0,
        why: ['Yoğunluk 2 katına çıktı; aynı basınç için derinlik yarıya iner.', 'Aynı derinlikte 2d’lik sıvıda basınç 2 katı olur.', 'Derinlik artarsa basınç daha da büyür; eşitlik sağlanmaz.'], scene: 3 },
      { q: 'Özdeş üç silindirin tabanlarındaki basınç eşit. K silindirinde sıvı en yüksek, M’de orta, L’de en alçak. Sıvıların yoğunlukları nasıl sıralanır?',
        options: ['K > M > L', 'L > M > K', 'Hepsi eşit'], answer: 1,
        why: ['Yüksek sıvıdaki yoğunluk küçük olmalı; sıralama ters.', 'Basınç eşitse h·d çarpımı eşittir; sıvı alçaksa yoğunluk büyüktür.', 'Yükseklikler farklıyken yoğunluklar eşit olsaydı basınçlar eşit olmazdı.'], scene: 6 },
      { q: 'Su dolu bir deponun yan duvarında biri üstte, biri altta iki delik açılıyor. Hangi delikte basınç daha büyüktür?',
        options: ['Alttaki', 'Üstteki', 'İkisinde aynı'], answer: 0,
        why: ['Alttaki delik serbest yüzeyden daha uzaktır; derinlik büyük, basınç büyük.', 'Üstteki delik yüzeye daha yakındır; basıncı daha küçüktür.', 'Delikler farklı derinliktedir; basınçları aynı olamaz.'], scene: 9 },
    ],
    summary: ['Değişkenler teker teker değiştirilince veriler modeli gösterir.', 'Durgun sıvının basıncı P = h·d·g’dir; kabın şekline ve sıvı miktarına bağlı değildir.', '<b>Bir değişkeni değiştir, ötekileri sabit tut; ilişki kendini gösterir.</b>'],
    nextLesson: { href: 'b3-sivi-basinciyla-calisan-sistemler.html', label: 'Sonraki: Sıvı basıncıyla çalışan sistemler ›' },
  });
})();
