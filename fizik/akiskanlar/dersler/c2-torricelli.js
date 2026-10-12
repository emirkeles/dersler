/* C2 — Torricelli havayı nasıl tarttı?
   Açık hava basıncı, dengelediği cıva sütunuyla ölçülür; bu ölçü atmosfer (atm) biriminin dayanağıdır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/C-acik-hava-basinci.md (C2). Düz vektör, yandan görünüş.
   Cam boru, cıva kabı, cıva sütunu ve 76 cm ölçüsü bu dosyadadır (c-araclar.js'te yok).
   Çizim ölçeği: 1 cm = 3,4 birim; boru 1 m = 340 birim, 76 cm = 258 birim. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, belir, par, ok } = window.KIT;
  const { HAVA, havaAlani, zemin, sivKabi, agirlikOku, olcuOku, yuzeyOklari } = window.KIT_C;
  const { lerp, ease } = Ders;
  const CAM = HAVA.cizgi, KESIK = { 'stroke-dasharray': '8 6' };
  const KAP = { x1: 180, x2: 640, yUst: 380, yAlt: 520, yYuzey: 400 };
  const GRI_OK = '#9aa3bd';

  /* Cıva dolu kap (üstü açık, cıva mavi); isteğe bağlı "cıva" yazısı. */
  function kap(c, p, o = KAP, etiket = true) {
    const k = sivKabi(c, p, o);
    if (etiket) yazi(c, k.g, o.x1 + 20, 470, 'cıva', { hiza: 'start', size: 24, kalin: 600 });
    return k;
  }

  /* Bir ucu kapalı cam boru. Yerel çerçeve: açık uç (0, 0), eksen −y yönünde, boy L; grup (x, y) noktasında aci derece döner.
     doldur(lc): cıva sütununun açık uçtan itibaren boyu (borunun içinde; kapalı uçtaki yarım daire dahil). Tam dolu: tam = L − 3. */
  function boru(c, p, o) {
    const L = o.L || 340, w = o.w || 20, r = w - 3, tam = L - 3, yc = -(L - w);
    const g = c.S('g', {}, p);
    const civa = c.S('path', { fill: RENK.sivi, 'fill-opacity': 0.55 }, g);
    c.S('path', {
      d: `M${-w},0 L${-w},${yc} A${w},${w} 0 0 1 ${w},${yc} L${w},0`, fill: 'none', stroke: CAM, 'stroke-width': 3,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round',
    }, g);
    const t = { g, x: o.x, y: o.y, aci: o.aci || 0, tam, lc: 0 };
    t.koy = (x = t.x, y = t.y, aci = t.aci) => {
      t.x = x; t.y = y; t.aci = aci;
      g.setAttribute('transform', `translate(${x},${y}) rotate(${aci})`);
    };
    t.doldur = (lc) => {
      t.lc = lc;
      const y = -lc;
      let d;
      if (y >= yc) d = `M${-r},0 L${-r},${y} L${r},${y} L${r},0 Z`;
      else {
        const dx = Math.sqrt(Math.max(0, r * r - (yc - y) * (yc - y)));
        d = `M${-r},0 L${-r},${yc} A${r},${r} 0 0 1 ${-dx},${y} L${dx},${y} A${r},${r} 0 0 1 ${r},${yc} L${r},0 Z`;
      }
      civa.setAttribute('d', d);
    };
    t.koy(); t.doldur(o.lc == null ? tam : o.lc);
    return t;
  }

  /* 76 cm ölçüsü: kap yüzeyi (y = 400) ile cıva üstü (y = 142) arası; kesikli çizgiler, çift ok, döndürülmüş etiket. */
  function olcu76(c, p, o = {}) {
    const g = c.S('g', {}, p), x = o.x == null ? 540 : o.x;
    cizgi(c, g, [o.xa == null ? 430 : o.xa, 142], [o.xb == null ? 560 : o.xb, 142], RENK.cizgi, 2, KESIK);
    cizgi(c, g, [o.xa == null ? 430 : o.xa, 400], [o.xb == null ? 560 : o.xb, 400], RENK.cizgi, 2, KESIK);
    const ok2 = olcuOku(c, g, x, 142, 400, '76 cm', { etiketX: x + 30 });
    return { g, yazi: ok2.querySelector('text') };
  }

  const vurgu = (c, ...gs) => { gs.forEach((g) => { g.style.opacity = 0.55; }); return belir(c, gs, 350); };

  /* ---- 0. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Soru 1 çizimi: hava, zemin; cevaptan sonra ağırlık ve basınç okları gelir.
    const a = c.S('g', {}, svg);
    havaAlani(c, a, { x1: 160, x2: 840, y1: 90, y2: 430 });
    zemin(c, a, 160, 840, 430);
    yazi(c, a, 185, 130, 'hava', { hiza: 'start', size: 24, kalin: 600 });
    yazi(c, a, 500, 480, 'yeryüzü', { size: 24, kalin: 600 });
    const a2 = c.S('g', {}, svg);
    [273, 500, 726].forEach((x) => agirlikOku(c, a2, x, 150, 250));
    yuzeyOklari(c, a2, [160, 430], [840, 430], { n: 3, boy: 40, taraf: [500, 300] });
    yazi(c, a2, 295, 205, 'ağırlık', { hiza: 'start', size: 24, kalin: 700, renk: RENK.kuvvet });
    yazi(c, a2, 295, 372, 'basınç', { hiza: 'start', size: 24, kalin: 700, renk: RENK.basinc });
    gizle(a, a2);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Açık hava basıncı neden oluşur?',
      options: ['Rüzgârın esmesinden', 'Havanın sıcaklığından', 'Atmosferi oluşturan gazların ağırlığından'], answer: 2,
      hints: ['Açık hava basıncı, atmosferi oluşturan gazların ağırlığından doğar.', 'Açık hava basıncı, atmosferi oluşturan gazların ağırlığından doğar.', ''],
      right: 'Evet. Gazların ağırlığı yere basınç yapar.',
    });
    c.clearSay();
    await par(c.say('Atmosferi oluşturan gazların ağırlığı yere basınç yapar.'), belir(c, a2, 450));
    c.clearSay();
    await belir(c, [a, a2], 400, 0); a.remove(); a2.remove();

    // Soru 2 çizimi: sıvı dolu kap, tabana basınç okları.
    const b = c.S('g', {}, svg);
    sivKabi(c, b, { x1: 300, x2: 700, yUst: 150, yAlt: 440, yYuzey: 230 });
    yazi(c, b, 500, 330, 'Sıvı', { size: 26, kalin: 700 });
    const b2 = c.S('g', {}, svg);
    yuzeyOklari(c, b2, [310, 440], [690, 440], { n: 4, boy: 40, taraf: [500, 330] });
    yazi(c, b2, 500, 490, 'basınç', { size: 24, kalin: 700, renk: RENK.basinc });
    gizle(b, b2);
    await belir(c, b, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Durgun sıvının basıncını hangisi değiştirir?',
      options: ['Kabın şekli', 'Sıvının yoğunluğu', 'Sıvının miktarı'], answer: 1,
      hints: ['Durgun sıvının basıncını yoğunluk, derinlik ve g belirler; kabın şekli ve sıvı miktarı değil.', '', 'Durgun sıvının basıncını yoğunluk, derinlik ve g belirler; kabın şekli ve sıvı miktarı değil.'],
      right: 'Evet. Yoğunluk basıncı değiştirir.',
    });
    c.clearSay();
    await par(c.say('Sıvının yoğunluğu değişirse basıncı da değişir.'), belir(c, b2, 450));
    c.clearSay();
    await belir(c, [b, b2], 400, 0); b.remove(); b2.remove();
    const soru = yazi(c, svg, 500, 292, 'Açık hava basıncını nasıl ölçeriz?', { size: 44, kalin: 700 });
    gizle(soru);
    await par(c.say('Bugün açık hava basıncının nasıl ölçüldüğüne bakacağız.'), belir(c, soru, 450));
  }

  /* ---- 1. Torricelli'nin düzeneği ---- */
  async function duzenek(c) {
    const svg = c.svg(1000, 562);
    const kp = kap(c, svg);
    const deniz = yazi(c, svg, 40, 60, 'deniz seviyesi · 0 °C', { hiza: 'start', size: 26, kalin: 600 });
    const tb = boru(c, svg, { x: 410, y: 350 });
    const m1 = c.S('g', {}, svg);
    olcuOku(c, m1, 360, 100, 440, '1 m', { etiketX: 336 });
    m1.setAttribute('transform', 'translate(0,-90)');
    const ol = olcu76(c, svg);
    const bos = yazi(c, svg, 440, 128, 'boşluk', { hiza: 'start', size: 24, kalin: 600 });
    gizle(kp.g, deniz, tb.g, m1, ol.g, bos);

    await par(c.say('Açık hava basıncını ilk kez Evangelista Torricelli ölçtü.'), belir(c, kp.g, 500));
    await par(c.say('Deney deniz seviyesinde ve 0 °C sıcaklıkta yapıldı.', { speak: 'Deney deniz seviyesinde ve sıfır derece selsiyus sıcaklıkta yapıldı.' }), belir(c, deniz, 400));
    await par(c.say('Bir ucu kapalı, 1 m boyunda cam boruyu cıvayla doldurdu.', { speak: 'Bir ucu kapalı, bir metre boyunda cam boruyu cıvayla doldurdu.' }), belir(c, [tb.g, m1], 400));
    await par(c.say('Boruyu hava girmeden ters çevirip cıva dolu kaba daldırdı.'), c.tween(800, (e) => {
      tb.koy(410, 350 + 90 * e); m1.setAttribute('transform', `translate(0,${-90 + 90 * e})`);
    }, ease.inOut));
    await par(c.say('Borudaki cıva düştü, sonra bir yerde dengeye geldi.', { speak: '[thoughtful] Borudaki cıva düştü, sonra bir yerde dengeye geldi.' }),
      c.tween(1000, (e) => tb.doldur(lerp(tb.tam, 298, e)), ease.inOut));
    await par(c.say('Kaptaki yüzeyle borudaki yüzey arasındaki fark 76 cm oldu.', { speak: 'Kaptaki yüzeyle borudaki yüzey arasındaki fark yetmiş altı santimetre oldu.' }), belir(c, ol.g, 400));
    await par(c.say('Cıvanın üstünde, borunun kapalı ucuna kadar bir boşluk kaldı.'), belir(c, bos, 400));
  }

  /* ---- 2. İki basınç dengede ---- */
  async function dengede(c) {
    const svg = c.svg(1000, 562);
    kap(c, svg);
    boru(c, svg, { x: 410, y: 440, lc: 298 });
    const m1 = c.S('g', {}, svg);
    olcuOku(c, m1, 360, 100, 440, '1 m', { etiketX: 336 });
    const ol = olcu76(c, svg);
    const deniz = yazi(c, svg, 40, 60, 'deniz seviyesi · 0 °C', { hiza: 'start', size: 26, kalin: 600 });
    const bos = yazi(c, svg, 440, 128, 'boşluk', { hiza: 'start', size: 24, kalin: 600 });
    [m1, deniz, bos].forEach((e) => { e.style.opacity = 0.45; });

    // Yüzeye bastıran açık hava basıncı ve kaptan borunun ağzına ulaşması.
    const dis = c.S('g', {}, svg);
    ok(c, dis, [260, 332], [260, 398], RENK.basinc, 6);
    ok(c, dis, [580, 332], [580, 398], RENK.basinc, 6);
    yazi(c, dis, 215, 366, 'P₀', { size: 26, kalin: 700, renk: RENK.basinc });
    const egri = c.S('path', {
      d: 'M260,410 C262,480 330,508 410,508', fill: 'none', stroke: CAM, 'stroke-width': 3, 'stroke-linecap': 'round', ...KESIK,
    }, svg);
    // Borunun ağzında karşılıklı iki basınç.
    const asa = c.S('g', {}, svg);
    ok(c, asa, [410, 374], [410, 438], RENK.basinc, 6);
    yazi(c, asa, 440, 372, 'P cıva', { hiza: 'start', size: 24, kalin: 700, renk: RENK.basinc });
    const yuk = c.S('g', {}, svg);
    ok(c, yuk, [410, 510], [410, 446], RENK.basinc, 6);
    yazi(c, yuk, 440, 490, 'P₀', { hiza: 'start', size: 24, kalin: 700, renk: RENK.basinc });
    const esit = renkli(c, svg, 660, 200, [['P₀', RENK.basinc], ' = ', ['P cıva', RENK.basinc]], { hiza: 'start', size: 30, kalin: 700 });
    gizle(dis, egri, asa, yuk, esit);

    await par(c.say('Açık hava, kaptaki cıvanın yüzeyine P₀ basıncı yapar.', { speak: 'Açık hava, kaptaki cıvanın yüzeyine pe sıfır basıncı yapar.' }), belir(c, dis, 400));
    await par(c.say('Bu basınç, kaptaki cıvadan borunun ağzına ulaşır.'), belir(c, egri, 600));
    await par(c.say('Borudaki cıva sütunu da ağırlığıyla basınç yapar.'), (async () => {
      await belir(c, asa, 400); await c.wait(300); await belir(c, yuk, 400); await vurgu(c, asa, yuk);
    })());
    await par(c.say('Bu iki basınç, borunun ağzında birbirini dengeler.'), vurgu(c, asa, yuk));
    await par(c.say('Cıva sütunu bu yüzden 76 cm’de durur.', { speak: 'Cıva sütunu bu yüzden yetmiş altı santimetrede durur.' }), vurgu(c, ol.g));
    await par(c.say('Açık hava basıncı, 76 cm’lik cıva sütununun basıncına eşittir.', { speak: 'Açık hava basıncı, yetmiş altı santimetrelik cıva sütununun basıncına eşittir.' }), belir(c, esit, 400));

    await c.choice({
      tag: 'Sıra sende', q: 'Cıva sütunu 76 cm’de dururken, kaptaki cıva yüzeyine bastıran açık hava basıncı için ne söylenir?',
      options: ['Cıva sütununun basıncına eşittir', 'Cıva sütununun basıncından büyüktür', 'Cıva sütununun basıncından küçüktür'], answer: 0,
      hints: ['', 'Cıva ne yukarı çıkıyor ne düşüyor: dengede.', 'Dengede iki basınç eşittir.'],
      right: 'Evet. Cıva durgun; iki basınç eşit.',
    });
    c.note('<b>Açık hava basıncı, dengelediği cıva sütunuyla ölçülür.</b> Örnek: 76 cmHg.', 'Torricelli');
    c.clearSay();
    await c.say('İkisi de ağırlıktan doğan basınçtır; burada birbirine eşittir.');
  }

  /* ---- 3. Borunun şekli etkisiz ---- */
  async function sekil(c) {
    const svg = c.svg(1000, 562);
    const kp = kap(c, svg, { x1: 120, x2: 880, yUst: 380, yAlt: 520, yYuzey: 400 });
    const b1 = boru(c, svg, { x: 225, y: 440, w: 15 });
    const b2 = boru(c, svg, { x: 425, y: 440, w: 45 });
    const b3 = boru(c, svg, { x: 686, y: 424, w: 15, aci: 30 });
    const formul = renkli(c, svg, 40, 60, [['P cıva', RENK.basinc], ' = ', ['h', RENK.yazi], ' · d · g'], { hiza: 'start', size: 30, kalin: 700 });
    const olcu = c.S('g', {}, svg);
    cizgi(c, olcu, [150, 142], [900, 142], RENK.cizgi, 2, KESIK);
    cizgi(c, olcu, [885, 400], [925, 400], RENK.cizgi, 2, KESIK);
    olcuOku(c, olcu, 905, 142, 400, '76 cm', { etiketX: 935 });
    const h = yazi(c, olcu, 968, 278, 'h', { size: 24, kalin: 700 });
    gizle(kp.g, b1.g, b2.g, b3.g, formul, olcu);

    await par(c.say('Cıva sütununun basıncı da sıvı basıncıdır: h · d · g.', { speak: 'Cıva sütununun basıncı da sıvı basıncıdır: h çarpı d çarpı g.' }), belir(c, [kp.g, formul], 500));
    await par(c.say('Burada h, cıva sütununun dikey yüksekliğidir.'), (async () => {
      formul.querySelectorAll('tspan')[2].style.fill = RENK.sivi;
      await belir(c, [b1.g, b2.g, b3.g], 500);
    })());

    await c.choice({
      tag: 'Tahmin et', q: 'Ela aynı kapta üç boru deniyor: ince dik, kalın dik ve eğik. Cıva sütunlarının dikey yüksekliği nasıl olur?',
      options: ['Eğik boruda daha yüksek', 'Kalın boruda daha yüksek', 'Üçünde de aynı: 76 cm'], answer: 2,
      hints: ['Aynı cıva, aynı yer: d ve g aynı.', 'Basıncı h, d ve g belirler. Boru şekli bunlardan biri mi?', ''],
      right: 'Evet. Dikey yükseklik üçünde de aynı.',
    });
    c.clearSay();
    h.textContent = 'h';
    await par(c.tween(1000, (e) => {
      b1.doldur(lerp(b1.tam, 298, e)); b2.doldur(lerp(b2.tam, 298, e)); b3.doldur(lerp(b3.tam, 326, e));
    }, ease.inOut), (async () => { await c.wait(700); await belir(c, olcu, 400); })());
    await c.say('Üç boruda da dikey yükseklik aynı: 76 cm.', { speak: 'Üç boruda da dikey yükseklik aynı: yetmiş altı santimetre.' });
    await c.say('Borunun şekli, kesiti ve eğimi cıva seviyesini değiştirmez.');
    await c.say('Basıncı h, d ve g belirler; boru değil.');
  }

  /* ---- 4. 1 atm kaç pascal? ---- */
  async function hesap(c) {
    const svg = c.svg(1000, 562);
    const dz = c.S('g', {}, svg);
    kap(c, dz, KAP, false);
    boru(c, dz, { x: 410, y: 440, lc: 298 });
    const ol = olcu76(c, dz);
    const kucul = (e) => {
      const s = lerp(1, 0.6, e);
      dz.setAttribute('transform', `translate(${lerp(0, -48, e)},${lerp(0, 120, e)}) scale(${s})`);
      ol.yazi.setAttribute('font-size', 24 / s);
    };
    const X = 470;
    const satir = (y, parcalar) => renkli(c, svg, X, y, parcalar, { hiza: 'start', size: 30, kalin: 700 });
    const vh = satir(150, ['h = 0,76 m']), vd = satir(210, ['d = 13.600 kg/m³']), vg = satir(270, ['g = 9,8 m/s²']);
    const i1 = satir(180, [['P₀', RENK.basinc], ' = h · d · g']);
    const i2 = satir(260, ['= 0,76 · 13.600 · 9,8']);
    const i3 = satir(340, [['≈ 101.300 Pa', RENK.basinc]]);
    const atm = yazi(c, svg, X, 420, '1 atm', { hiza: 'start', size: 40, kalin: 700, renk: RENK.basinc });
    gizle(vh, vd, vg, i1, i2, i3, atm);

    await par(c.say('76 cm, metre cinsinden 0,76 m’dir.', { speak: 'Yetmiş altı santimetre, metre cinsinden sıfır virgül yetmiş altı metredir.' }),
      par(c.tween(600, kucul, ease.inOut), (async () => { await c.wait(300); await belir(c, vh, 400); })()));
    await par(c.say('Cıvanın yoğunluğu 13.600 kg/m³’tür.', { speak: 'Cıvanın yoğunluğu on üç bin altı yüz kilogram bölü metreküptür.' }), belir(c, vd, 400));
    await par(c.say('Yer çekimi ivmesi g, 9,8 m/s²’dir.', { speak: 'Yer çekimi ivmesi g, dokuz virgül sekiz metre bölü saniye karedir.' }), belir(c, vg, 400));
    await par(c.say('P₀, h · d · g işlemiyle bulunur.', { speak: 'pe sıfır, h çarpı d çarpı g işlemiyle bulunur.' }),
      (async () => { await belir(c, [vh, vd, vg], 300, 0); await belir(c, i1, 400); })());

    await c.choice({
      tag: 'Birlikte çöz', q: 'İkinci satırı sen yaz. Değerleri yerine koyunca hangi satır doğru olur?',
      options: ['= 76 · 13.600 · 9,8', '= 0,76 · 13.600 · 9,8', '= 0,76 + 13.600 + 9,8'], answer: 1,
      hints: ['h metre olmalı: 76 cm = 0,76 m.', '', 'Formül bir çarpımdır: h · d · g.'],
      right: 'Evet. Üç değer çarpılır; h metre olarak yazılır.',
    });
    c.clearSay();
    await par(c.say('Değerleri yerine koyunca ikinci satır böyle olur.'), belir(c, i2, 400));
    await par(c.say('Çarpınca P₀ yaklaşık 101.300 pascal bulunur.', { speak: 'Çarpınca pe sıfır yaklaşık yüz bir bin üç yüz pascal bulunur.' }), belir(c, i3, 400));
    await par(c.say('Bu değere 1 atmosfer, kısaca 1 atm denir.', { speak: 'Bu değere bir atmosfer, kısaca bir a te me denir.' }), belir(c, atm, 400));
  }

  /* ---- 5. Basınç birimleri ---- */
  async function birimler(c) {
    const svg = c.svg(1000, 562);
    const KARTLAR = [{ x: 60, w: 240, m: '76 cmHg' }, { x: 370, w: 260, m: '1,013 · 10⁵ Pa' }, { x: 700, w: 240, m: '1 atm' }];
    const kartlar = KARTLAR.map((k) => {
      const g = c.S('g', {}, svg);
      const cerceve = c.S('rect', { x: k.x, y: 235, width: k.w, height: 90, rx: 12, fill: RENK.yuzey, stroke: RENK.basinc, 'stroke-width': 3 }, g);
      yazi(c, g, k.x + k.w / 2, 291, k.m, { size: 30, kalin: 700 });
      gizle(g);
      return { g, cerceve };
    });
    const esit = [335, 665].map((x) => yazi(c, svg, x, 292, '=', { size: 40, kalin: 700 }));
    const ust = yazi(c, svg, 500, 150, 'deniz seviyesinde', { size: 24, kalin: 600 });
    gizle(esit, ust);

    await par(c.say('Günlük hayatta farklı basınç birimleri kullanılır.'), (async () => {
      for (const k of kartlar) { await belir(c, k.g, 400); await c.wait(300); }
    })());
    await par(c.say('Deniz seviyesinde açık hava basıncı 76 cmHg’dir.', { speak: 'Deniz seviyesinde açık hava basıncı yetmiş altı santimetre cıvadır.' }),
      par(belir(c, ust, 400), belir(c, [kartlar[1].g, kartlar[2].g], 300, 0.45)));
    await par(c.say('Aynı basınç, yaklaşık 1,013 · 10⁵ Pa’dır.', { speak: 'Aynı basınç, yaklaşık bir virgül sıfır on üç çarpı on üzeri beş pascaldır.' }),
      par(belir(c, kartlar[0].g, 300, 0.45), belir(c, kartlar[1].g, 300)));
    await par(c.say('Bunların hepsi 1 atmosfere eşittir.', { speak: 'Bunların hepsi bir atmosfere eşittir.' }),
      par(belir(c, kartlar.map((k) => k.g), 300), belir(c, esit, 300)));

    await c.choice({
      tag: 'Sıra sende', q: 'Bir istasyon, deniz seviyesinde açık hava basıncını 1 atm olarak veriyor. Ela bu basıncı Torricelli düzeneğiyle ölçse cıva sütunu kaç cm olur?',
      options: ['76 cm', '7,6 cm', '760 cm'], answer: 0,
      hints: ['', '1 atm, deniz seviyesindeki açık hava basıncıdır.', 'Torricelli düzeneğinde fark 76 cm idi.'],
      right: 'Evet. 1 atm, 76 cm’lik cıva sütununa denktir.',
    });
    c.note('<b>1 atm = 76 cmHg = 1,013 · 10⁵ Pa.</b>', 'Atmosfer');
    c.clearSay();
    kartlar[0].cerceve.setAttribute('stroke', RENK.iyi);
    await c.say('Bir atmosfer, 76 cm’lik cıva sütununa denk gelir.', { speak: 'Bir atmosfer, yetmiş altı santimetrelik cıva sütununa denk gelir.' });
  }

  /* ---- 6. Boruyu eğ ---- */
  async function egim(c) {
    const svg = c.svg(1000, 562);
    const kp = kap(c, svg, { x1: 140, x2: 860, yUst: 380, yAlt: 520, yYuzey: 400 });
    const tb = boru(c, svg, { x: 500, y: 424 });
    const ACI = [0, 15, 30];
    const lcDe = (a) => 282 / Math.cos((a * Math.PI) / 180);
    // Sütunun yanında boruyla paralel gri çift ok ve "boy".
    const bx = 42, boy = c.S('g', {}, tb.g);
    const ust = ok(c, boy, [bx, 0], [bx, 0], GRI_OK, 3), alt = ok(c, boy, [bx, 0], [bx, 0], GRI_OK, 3);
    const boyYazi = yazi(c, boy, bx + 36, 0, 'boy', { size: 22, kalin: 600, renk: GRI_OK });
    const boyCiz = (lc) => {
      ust.ciz([bx, -lc / 2], [bx, -lc]); alt.ciz([bx, -lc / 2], [bx, 0]);
      boyYazi.setAttribute('y', -lc / 2); boyYazi.setAttribute('transform', `rotate(-90 ${bx + 36} ${-lc / 2})`);
    };
    const olcu = c.S('g', {}, svg);
    cizgi(c, olcu, [100, 142], [900, 142], RENK.cizgi, 2, KESIK);
    cizgi(c, olcu, [100, 400], [900, 400], RENK.cizgi, 2, KESIK);
    olcuOku(c, olcu, 900, 142, 400, '76 cm');
    let simdi = { aci: 0, lc: lcDe(0) }, no = 0, ilk = true;
    const uygula = (a, lc) => { tb.koy(500, 424, a); tb.doldur(lc); boyCiz(lc); simdi = { aci: a, lc }; };
    const git = async (aci) => {
      const bas = simdi, hedef = { aci, lc: lcDe(aci) }, benim = ++no;
      await c.tween(300, (e) => { if (benim === no) uygula(lerp(bas.aci, hedef.aci, e), lerp(bas.lc, hedef.lc, e)); }, ease.linear);
    };
    uygula(0, lcDe(0));
    gizle(kp.g, tb.g, olcu);

    await par(c.say('Şimdi tek bir boruyu eğerek deneyelim.', { speak: '[curious] Şimdi tek bir boruyu eğerek deneyelim.' }), belir(c, [kp.g, tb.g, olcu], 500));

    c.say('Boruyu eğ; 76 cm ölçüsüne ve boya bak.', { noWait: true });
    const sl = c.slider({
      label: 'Boru', min: 0, max: 2, step: 1, value: 0, fmt: (v) => ['dik', 'biraz eğik', 'eğik'][+v],
      onInput: (v) => { const a = ACI[+v]; if (ilk) uygula(a, lcDe(a)); else git(a).catch(() => {}); },
    });
    ilk = false;
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();

    await c.choice({
      tag: 'Dene', q: 'Boruyu eğdikçe hangisi sabit kalır?',
      options: ['Cıva sütununun boru boyunca uzunluğu', 'Boşluğun uzunluğu', 'Cıvanın dikey yüksekliği'], answer: 2,
      hints: ['Boy uzuyor; peki dikey yükseklik?', '“76 cm” ölçüsüne bak: oynuyor mu?', ''],
      right: 'Evet. Eğim değişse de dikey yükseklik sabit.',
    });
    c.clearSay();
    await par(c.say('Eğim arttıkça cıva sütunu boru boyunca uzar.'), git(30));
    await c.say('Cıvanın dikey yüksekliği 76 cm olarak kalır.', { speak: 'Cıvanın dikey yüksekliği yetmiş altı santimetre olarak kalır.' });
    await c.say('Açık hava basıncını belirleyen, dikey yüksekliktir.');
  }

  Ders.start({
    id: 'akiskanlar-c2', kicker: 'Konu C · Açık hava basıncı', title: 'Torricelli havayı nasıl tarttı?', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Torricelli havayı nasıl tarttı?',
      hook: 'Cıva dolu bir cam boruyu ters çevirip kaba daldırınca cıva neden hepsi boşalmaz?',
      button: 'Derse başla ›',
    },
    goals: [
      'Torricelli deneyinde cıva sütununun neden 76 cm’de durduğunu açıklar.',
      'Borunun şekli, kesiti ve eğiminin cıva seviyesini değiştirmediğini söyler.',
      'P₀ = h · d · g ile açık hava basıncını hesaplar, 1 atm değerini söyler.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Açık hava basıncını ve sıvı basıncını an.', run: hatirla },
      { title: 'Torricelli’nin düzeneği', goal: 'Cıva dolu boruyu kaba daldırınca ne olduğunu gör.', run: duzenek },
      { title: 'İki basınç dengede', goal: 'Cıva sütununun neden 76 cm’de durduğunu açıkla.', run: dengede },
      { title: 'Borunun şekli etkisiz', goal: 'Boru değişince cıva sütununun yüksekliğinin değişip değişmediğini bul.', run: sekil },
      { title: '1 atm kaç pascal?', goal: 'Cıva sütunundan açık hava basıncını hesapla.', run: hesap },
      { title: 'Basınç birimleri', goal: 'Aynı basıncın farklı birimlerle yazılışını tanı.', run: birimler },
      { title: 'Boruyu eğ', goal: 'Eğimle neyin değişip neyin sabit kaldığını bul.', run: egim },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela “Kalın boruda daha çok cıva var, sütun daha yüksek durur” diyor. Doğru mu?',
        options: ['Doğru; cıva çoğalınca ağırlık artar', 'Yanlış; borunun kesiti cıva seviyesini değiştirmez', 'Doğru, ama yalnızca eğik boruda'], answer: 1,
        why: ['Basıncı h, d ve g belirler; cıvanın miktarı bunlardan biri değil.', 'Cıva sütununun dikey yüksekliği kesite bağlı değildir; her boruda 76 cm’dir.', 'Eğik boruda da dikey yükseklik 76 cm’dir; yalnızca boru boyunca uzunluk artar.'], scene: 3 },
      { q: 'Sıvı basıncı ile açık hava basıncı Torricelli düzeneğinde nasıl karşılaştırılır?',
        options: ['Sıvı basıncı ağırlıktan, açık hava basıncı rüzgârdan doğar', 'Açık hava basıncı her zaman daha büyüktür', 'İkisi de ağırlıktan doğar ve dengede eşittir'], answer: 2,
        why: ['Açık hava basıncı da atmosferdeki gazların ağırlığından doğar.', 'Cıva ne çıkıyor ne düşüyor; dengede iki basınç eşittir.', 'Cıva sütununun ve havanın basıncı ağırlıktan doğar; cıva durgun olduğundan eşittirler.'], scene: 2 },
      { q: 'P₀ = h · d · g işleminde h, Torricelli düzeneğinde neyi gösterir?',
        options: ['Cıva sütununun dikey yüksekliğini', 'Borunun toplam uzunluğunu', 'Kaptaki cıvanın derinliğini'], answer: 0,
        why: ['h, cıva sütununun dikey yüksekliğidir: 76 cm.', 'Boru 1 m boyundadır ama basıncı belirleyen bu değil.', 'Kaptaki cıvanın derinliği basıncı belirlemez; sütunun dikey yüksekliği belirler.'], scene: 3 },
      { q: 'Deniz seviyesinde, 0 °C’de bir Torricelli düzeneğinde cıva sütunu 76 cm’de duruyor. Bu basınç kaç atm’dir?',
        options: ['76 atm', '1 atm', '0,76 atm'], answer: 1,
        why: ['76, cmHg cinsinden değerdir; atm cinsinden 1’dir.', 'Deniz seviyesinde 76 cmHg, 1 atm’dir.', '0,76 yalnızca metre cinsinden yüksekliktir; basınç 1 atm’dir.'], scene: 5 },
      { q: 'Ela deneyi eğik boruyla yapıyor; cıvanın dikey yüksekliği 76 cm. Cıvanın boru boyunca ölçtüğü uzunluk için ne söylenir?',
        options: ['76 cm’den kısadır', 'Tam 76 cm’dir', '76 cm’den uzundur'], answer: 2,
        why: ['Eğik boruda sütun, dikey yükseklikten kısa olamaz.', 'Boru eğikse uzunluk dikey yükseklikten büyüktür.', 'Eğim arttıkça sütun boru boyunca uzar; dikey yükseklik 76 cm kalır.'], scene: 6 },
    ],
    summary: [
      'Açık hava basıncı, kaptaki cıvaya bastırır; cıva sütunu bunu dengeler.',
      'P₀ = P cıva = h · d · g; boru şekli, kesiti ve eğimi etkisizdir.',
      'Deniz seviyesinde 1 atm = 76 cmHg = 1,013 · 10⁵ Pa.',
      '<b>Hava dışarıdan iter, cıva sütunu içeriden tartar; ikisi dengede durur.</b>',
    ],
    nextLesson: { href: 'c3-atmosfer-basinci-degisir.html', label: 'Sonraki: Atmosfer basıncı her yerde aynı değil ›' },
  });
})();
