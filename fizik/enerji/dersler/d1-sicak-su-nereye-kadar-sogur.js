/* D1 — Sıcak su nereye kadar soğur?
   Sıcaklıkları farklı maddeler bir aradayken sıcaklıkları eşitlenene kadar değişir; bu duruma ısıl denge denir.
   Senaryo: plan/fizik/enerji/senaryolar/D-isil-denge.md (D1). Hesap yok: denge sıcaklığı hesaplatılmaz, formül gösterilmez.
   Figür Ş3 (DENGE) y 12, h 488 kurulur: etiket noktaları tezgâhın ön kenarının altındadır, daha büyük figürde etiketin ikinci satırı tahtadan taşar.
   Yan içerik x 500–985 sütunundadır. Bütün yazılar en az 24 birimdir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, cubuk, sinifla } = window.KIT;
  const { motor, kap, pencere, termometre, isiOku } = window.KIT_A;
  const { halo, okuma, etiket, degisim, esitCizgi, temasOku, yalitim } = window.KIT_D;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle };
  const CAM = '#c3cbea';
  const FIG = { x: 70, y: 12, h: 488 };
  const BASLA = { ic: 60, dis: 20, icSeviye: 0.3, disSeviye: 0.7, icIcerik: 'su', disIcerik: 'su', icte: 0 };

  /* Figür, sıcaklık yazıları ve kütle etiketleri. Hepsi p grubunun içinde kurulur. */
  function duzenek(c, p, ayar) {
    const f = DENGE.kur(c, p, FIG);
    f.ayar(ayar);
    const ust = c.S('g', {}, p);
    const okIc = okuma(c, ust, f, 'ic.termometre'), okDis = okuma(c, ust, f, 'dis.termometre');
    okIc.guncelle(ayar.ic); okDis.guncelle(ayar.dis);
    const etIc = etiket(c, ust, f, 'ic', 'erlenmayer: 100 g su'), etDis = etiket(c, ust, f, 'dis', 'beher: 300 g su');
    return { f, ust, okIc, okDis, etIc, etDis };
  }
  /* Sıcaklıkları şimdikinden verilen değerlere götürür (yavaşlayarak oturur); ek(e) her adımda çağrılır. */
  async function isinma(c, d, ic1, dis1, ms, ek) {
    const i0 = d.okIc.T, b0 = d.okDis.T;
    await c.tween(ms, (e) => {
      const a = lerp(i0, ic1, e), b = lerp(b0, dis1, e);
      d.f.ayar({ ic: a, dis: b }); d.okIc.guncelle(a); d.okDis.guncelle(b);
      if (d.esit) d.esit.ciz();
      if (ek) ek(e);
    }, ease.out);
  }
  /* Erlenmayeri beherin içine indirir; sıcaklık yazısı ve ısı oku erlenmayeri izler. */
  const indir = (c, d, oku) => c.tween(2000, (e) => { d.f.ayar({ icte: e }); d.okIc.izle(); if (oku) oku.izle(); }, ease.inOut);

  /* Düz termometre ve yanında sarı sıcaklık yazısı (figür dışı çizimler). yan: 'sag' | 'sol'. */
  function duzTerm(c, p, o) {
    const g = c.S('g', {}, p), tm = termometre(c, g, { x: o.x, y: o.y, h: o.h });
    const yz = halo(yazi(c, g, 0, 0, '', { hiza: o.yan === 'sol' ? 'end' : 'start', size: 24, kalin: 700, renk: S.sicaklik }));
    const kur = (T) => {
      tm.kur(T);
      const ust = o.y - 14 - (10 + (o.h - 30) * Math.max(0, Math.min(100, T)) / 100);
      yz.setAttribute('x', o.x + (o.yan === 'sol' ? -16 : 16)); yz.setAttribute('y', ust + 8); yz.textContent = Math.round(T) + ' °C';
    };
    kur(o.T);
    return { g, kur, get T() { return tm.T; }, git(c2, T, ms, e = ease.out) { const T0 = tm.T; return c2.tween(ms, (k) => kur(lerp(T0, T, k)), e); } };
  }
  /* "ad → tanım" kartı: iki satır (gizli başlar). */
  function tanimKarti(c, p, x, y, w, ad, metin) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, w, 90, { rx: 14 });
    yazi(c, g, x + w / 2, y + 36, ad, { size: 26, kalin: 700 });
    yazi(c, g, x + w / 2, y + 71, '→ ' + metin, { size: 24, kalin: 600, renk: RENK.soluk });
    gizle(g);
    return g;
  }
  const kup = (c, p, x, y, harf) => {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: 100, height: 100, rx: 10, fill: CAM, 'fill-opacity': 0.25, stroke: CAM, 'stroke-width': 3 }, g);
    const t = yazi(c, g, x + 50, y + 62, harf, { size: 32, kalin: 700 });
    return { g, t };
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    c.S('path', { d: 'M300,240 H620 Q620,350 460,350 Q300,350 300,240 Z', fill: '#f5b04c', 'fill-opacity': 0.22, stroke: CAM, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g1);
    cizgi(c, g1, [300, 240], [620, 240], CAM, 3);
    yazi(c, g1, 460, 388, 'çorba', { size: 26, kalin: 600 });
    cizgi(c, g1, [700, 150], [570, 285], CAM, 9);
    c.S('ellipse', { cx: 556, cy: 296, rx: 28, ry: 16, transform: 'rotate(-45 556 296)', fill: CAM }, g1);
    yazi(c, g1, 720, 150, 'kaşık', { size: 26, kalin: 600, hiza: 'start' });
    const isi = isiOku(c, g1, [380, 300], [520, 300]);
    gizle(g1);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 400));
    await c.choice({
      tag: 'Hatırla', q: 'Soğuk bir kaşık sıcak çorbaya batırılıyor. Isı hangi yönde aktarılır?',
      options: ['Kaşıktan çorbaya', 'Çorbadan kaşığa', 'İki yöne eşit'], answer: 1,
      hints: ['Isı, sıcaklığı yüksek olandan düşük olana aktarılır.', '', 'Isı, sıcaklığı yüksek olandan düşük olana aktarılır.'],
      right: 'Evet. Çorba sıcak, kaşık soğuk.',
    });
    await par(c.say('Isı, çorbadan kaşığa aktarılır.'), belir(c, isi.g, 500));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 260, y: 190, w: 150, h: 150, su: 45 });
    kap(c, g2, { x: 590, y: 190, w: 150, h: 150, su: 105 });
    yazi(c, g2, 335, 382, '100 g su', { size: 26, kalin: 600, renk: S.kutle });
    yazi(c, g2, 665, 382, '300 g su', { size: 26, kalin: 600, renk: S.kutle });
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı sıcaklıkta 100 g su ile 300 g su var. Hangisinin ısı sığası daha büyüktür?',
      options: ['100 g suyun; sıcaklığı daha çabuk değişir', 'İkisinin eşit; ikisi de su', '300 g suyun; kütle arttıkça ısı sığası artar'], answer: 2,
      hints: ['Isı sığası kütleyle artar: C = m · c.', 'Isı sığası kütleyle artar: C = m · c.', ''],
      right: 'Evet. Kütle arttıkça ısı sığası artar.',
    });
    await c.say('Kütle arttıkça ısı sığası artar.');
    await c.say('Bugün sıcak ile soğuğun birbirine ne yaptığına bakacağız.');
  }

  /* ---- 2. Masada unutulan çay ---- */
  async function cay(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg), mug = c.S('g', {}, g1);
    kap(c, mug, { x: 120, y: 230, w: 220, h: 160, su: 100 });
    c.S('path', { d: 'M340,262 Q392,262 392,308 Q392,354 340,354', fill: 'none', stroke: CAM, 'stroke-width': 8, 'stroke-linecap': 'round' }, mug);
    yazi(c, mug, 230, 428, 'çay', { size: 26, kalin: 600 });
    const oda = c.S('g', {}, g1);
    c.S('rect', { x: 500, y: 120, width: 440, height: 300, rx: 14, fill: 'none', stroke: CAM, 'stroke-width': 3 }, oda);
    yazi(c, oda, 524, 166, 'oda', { size: 26, kalin: 600, hiza: 'start' });
    const tCay = duzTerm(c, g1, { x: 230, y: 372, h: 220, T: 70 }), tOda = duzTerm(c, oda, { x: 720, y: 372, h: 220, T: 22 });
    const isi = isiOku(c, g1, [400, 300], [488, 300]);
    gizle(mug, oda, tCay.g);

    await par(c.say('Ela sabah bir kupa sıcak çay koyup masada unutuyor.'), belir(c, mug, 450));
    await par(c.say('Çay 70 °C; oda ise 22 °C.', { speak: 'Çay yetmiş derece; oda ise yirmi iki derece.' }), belir(c, [tCay.g, oda], 450));
    await c.say('Çayın sıcaklığı odadan yüksek, yani sıcaklıkları farklı.');
    await par(c.say('Isı, sıcaklığı yüksek olan çaydan odaya aktarılır.'), belir(c, isi.g, 500));
    await c.say('Çay ısı verdikçe soğur.');

    await c.choice({
      tag: 'Tahmin et', q: 'Bir saat sonra çay kaç derece olur?',
      options: ['70 °C; hiç değişmez', 'Yaklaşık 10 °C; odadan bile soğuk', 'Yaklaşık 22 °C; odayla aynı sıcaklık'], answer: 2,
      hints: ['Isı çaydan odaya aktarılıyor; çay soğur. Ne zamana kadar?', 'Çay, ısı verdiği odadan daha soğuk olursa ısı hangi yöne aktarılırdı?', ''],
      right: 'Evet. Çay oda sıcaklığına kadar soğur.',
    });
    await par(c.say('Bir saat sonra termometrelere bakalım.'), (async () => { await tCay.git(c, 22, 4000, ease.out); await belir(c, isi.g, 400, 0); })());
    await c.say('Çay soğudu ve 22 °C’ta durdu.', { speak: 'Çay soğudu ve yirmi iki derecede durdu.' });
    await c.say('Oda çok büyük olduğu için sıcaklığı değişmedi.');
    await c.say('İkisinin sıcaklığı eşit olunca ısı aktarımı da durdu.');
    await c.say('Çay, 70 ile 22’nin ortasında değil, oda sıcaklığında durdu.', { speak: '[thoughtful] Çay, yetmiş ile yirmi ikinin ortasında değil, oda sıcaklığında durdu.' });
    c.note('Çay soğuyup oda sıcaklığında durur; sıcaklıklar eşit, ısı aktarımı yok.', 'Oda sıcaklığı');
  }

  /* ---- 3. Erlenmayer beherin içinde ---- */
  async function erlenmayer(c) {
    const svg = c.svg(1000, 562), gf = c.S('g', {}, svg);
    const d = duzenek(c, gf, BASLA), { f } = d;
    const yal = yalitim(c, d.ust, 84, 8, 410, 488, { tx: 478, ty: 46 });
    const oku = temasOku(c, d.ust, f);
    d.esit = esitCizgi(c, d.ust, f);
    const sure = yazi(c, svg, 742, 150, 'bir süre sonra', { size: 26, kalin: 600, renk: RENK.soluk });
    const k1 = tanimKarti(c, svg, 520, 215, 445, 'ısıl denge', 'sıcaklıklar eşit');
    const k2 = tanimKarti(c, svg, 520, 335, 445, 'denge sıcaklığı', 'ortak son sıcaklık');
    gizle(d.okIc.g, d.okDis.g, d.etIc, d.etDis, yal.g, sure);
    gizle(f.el);

    await par(c.say('Ela iki kap hazırlıyor.'), belir(c, f.el, 450));
    await par(c.say('Erlenmayerdeki 100 g su 60 °C’a kadar ısıtılmış.', { speak: 'Erlenmayerdeki yüz gram su altmış dereceye kadar ısıtılmış.' }), belir(c, [d.etIc, d.okIc.g], 400));
    await par(c.say('Beherdeki 300 g su ise 20 °C.', { speak: 'Beherdeki üç yüz gram su ise yirmi derece.' }), belir(c, [d.etDis, d.okDis.g], 400));
    await par(c.say('Kapların dışı yalıtılmış; ısı yalnızca ikisi arasında aktarılır.'), belir(c, yal.g, 400));
    await c.say('Termometreler kapların içinde kalıyor, hiç çıkarılmıyor.');

    await c.choice({
      tag: 'Tahmin et', q: 'Ela erlenmayeri beherin içine koyacak. Sıcaklıklar nasıl değişir?',
      options: ['İkisininki de yükselir', 'İkisininki de aynı kalır', 'Sıcak olanınki düşer, soğuk olanınki yükselir'], answer: 2,
      hints: ['Isı sıcak olandan soğuk olana aktarılır; hangisi ısı verir, hangisi alır?', 'Isı alan maddenin sıcaklığı yükselir, veren maddenin düşer.', ''],
      right: 'Evet. Sıcak su ısı verir, soğuk su ısı alır.',
    });
    await par(c.say('Ela erlenmayeri beherin içine koyuyor.'), (async () => {
      await indir(c, d, oku);
      oku.izle();
      await belir(c, oku.g, 500);
    })());
    await par(c.say('Bir süre bekliyoruz, sonra termometrelere bakıyoruz.'), (async () => {
      belir(c, sure, 400);
      await isinma(c, d, 30, 30, 5000);
      await par(belir(c, oku.g, 400, 0), belir(c, d.esit.g, 300));
    })());
    await c.say('Erlenmayerin sıcaklığı düştü, beherin sıcaklığı yükseldi.');
    await c.say('Sonunda iki termometre de 30 °C gösteriyor.', { speak: 'Sonunda iki termometre de otuz derece gösteriyor.' });
    await par(c.say('Sıcaklıkları eşitlenen maddeler ısıl dengeye gelmiştir.'), belir(c, [d.etIc, d.etDis], 300, 0), belir(c, k1, 400));
    await par(c.say('Ulaştıkları ortak sıcaklığa denge sıcaklığı denir.'), belir(c, k2, 400));
    c.note('Sıcaklıkları eşitlenen maddeler ısıl dengededir; ortak sıcaklık denge sıcaklığıdır.', 'Isıl denge');
  }

  /* ---- 4. Dengede ne olur? ---- */
  async function dengede(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg), gf = c.S('g', {}, g1);
    gf.style.opacity = 1;
    const d = duzenek(c, gf, Object.assign({}, BASLA, { icte: 1 }));
    d.esit = esitCizgi(c, d.ust, d.f);
    const sag = c.S('g', {}, g1);
    const penE = pencere(c, sag, mot, { cx: 700, cy: 135, n: 6, T: 60, tohum: 5, bag: [305, 300] });
    const penB = pencere(c, sag, mot, { cx: 700, cy: 420, n: 6, T: 20, tohum: 6, bag: [336, 360] });
    yazi(c, sag, 792, 143, 'erlenmayer', { size: 26, kalin: 600, hiza: 'start', renk: RENK.soluk });
    yazi(c, sag, 792, 428, 'beher', { size: 26, kalin: 600, hiza: 'start', renk: RENK.soluk });
    const isi = isiOku(c, sag, [700, 252], [700, 322]);
    const kupa = c.S('g', {}, g1);
    const kapA = kap(c, kupa, { x: 640, y: 250, w: 90, h: 90, su: 60 }), kapB = kap(c, kupa, { x: 730, y: 250, w: 90, h: 90, su: 60 });
    yazi(c, kupa, 685, 226, '35 °C', { size: 26, kalin: 700, renk: S.sicaklik });
    yazi(c, kupa, 775, 226, '35 °C', { size: 26, kalin: 700, renk: S.sicaklik });
    gizle(sag, kupa);
    const pen = (e, a, b, c1, d1) => { penE.kur(lerp(a, b, e)); penB.kur(lerp(c1, d1, e)); };

    await par(c.say('Erlenmayerdeki tanecikler hızlı, beherdekiler yavaş titreşiyor.'), belir(c, sag, 450));
    await par(c.say('Sıcak sudan soğuk suya ısı aktarılıyor.'), belir(c, isi.g, 500));
    await par(c.say('Erlenmayerdeki taneciklerin hareketi yavaşlıyor, beherdekiler hızlanıyor.'), isinma(c, d, 45, 25, 2000, (e) => pen(e, 60, 45, 20, 25)));
    await par(c.say('Termometreler birbirine yaklaşıyor.'), isinma(c, d, 30, 30, 2000, (e) => pen(e, 45, 30, 25, 30)));
    await par(c.say('Sıcaklıklar eşit olunca iki sudaki tanecikler aynı hareketlilikte.'), belir(c, d.esit.g, 300));
    await par(c.say('Artık ikisi arasında sıcaklık farkı yok; ısı aktarımı bitti.'), belir(c, isi.g, 400, 0));
    await c.say('Yani ısıl dengede ısı alışverişi olmaz.', { speak: '[short pause] Yani ısıl dengede ısı alışverişi olmaz.' });
    await par(c.say('Sıcaklıkları baştan eşit olan maddeler zaten ısıl dengededir.'), belir(c, sag, 300, 0), belir(c, gf, 400, 0.35), belir(c, kupa, 450));

    // Sor: yeni durum.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 445, y: 210, w: 110, h: 130, su: 90 });
    kutu(c, g2, 300, 340, 400, 70, { rx: 12 });
    renkli(c, g2, 500, 184, ['bardak · ', ['22 °C', S.sicaklik]], { size: 26, kalin: 600 });
    renkli(c, g2, 500, 388, ['masa · ', ['22 °C', S.sicaklik]], { size: 26, kalin: 600 });
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Bardak ve masa uzun süredir yan yana duruyor, ikisi de 22 °C. Aralarında ne olur?',
      options: ['Bardak masaya ısı verir', 'Isıl dengededirler; aralarında ısı alışverişi olmaz', 'Masa bardağa soğukluk verir'], answer: 1,
      hints: ['Sıcaklıkları eşitse aralarında sıcaklık farkı yoktur; ısı neden aktarılsın?', '', 'Soğukluk diye bir şey aktarılmaz; ısı yalnızca sıcaklık farkı varken aktarılır.'],
      right: 'Evet. Sıcaklıkları eşit; ısı alışverişi olmaz.',
    });
    const w1 = pencere(c, g2, mot, { cx: 420, cy: 480, r: 60, n: 5, T: 22, tohum: 7 }), w2 = pencere(c, g2, mot, { cx: 580, cy: 480, r: 60, n: 5, T: 22, tohum: 8 });
    gizle(w1.g, w2.g);
    await par(c.say('Sıcaklıklar eşit, tanecikler aynı hareketlilikte, ısı aktarımı yok.'), belir(c, [w1.g, w2.g], 600));
    c.note('Sıcaklıklar eşitlenince ısı alışverişi biter.', 'Isıl dengede');
  }

  /* ---- 5. Verilen ısı, alınan ısıya eşit ---- */
  async function verilenAlinan(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg), gf = c.S('g', {}, g1);
    gf.style.opacity = 1;
    const d = duzenek(c, gf, Object.assign({}, BASLA, { icte: 1 }));
    const dIc = degisim(c, d.ust, d.f, 'ic.termometre'), dDis = degisim(c, d.ust, d.f, 'dis.termometre', { etiket: 'ust', uzak: 140 });
    const oku = temasOku(c, d.ust, d.f);
    const sag = c.S('g', {}, g1);
    yazi(c, sag, 645, 209, 'verilen ısı', { size: 26, kalin: 600, hiza: 'end', renk: S.isi });
    yazi(c, sag, 645, 299, 'alınan ısı', { size: 26, kalin: 600, hiza: 'end', renk: S.isi });
    const c1 = cubuk(c, sag, 660, 200, S.isi, { h: 30 }), c2 = cubuk(c, sag, 660, 290, S.isi, { h: 30 });
    const esit = yazi(c, sag, 780, 255, '=', { size: 34, kalin: 700 });
    gizle(sag, esit);
    const halka = c.S('ellipse', { cx: 0, cy: 0, rx: 20, ry: 26, fill: 'none', stroke: S.kutle, 'stroke-width': 4 }, d.ust);
    gizle(halka);

    await par(c.say('Dengeye gelene kadar sıcak su ısı verdi, soğuk su ısı aldı.'), (async () => {
      await belir(c, oku.g, 400);
      await isinma(c, d, 30, 30, 2000);
      await belir(c, oku.g, 400, 0);
    })());
    await c.say('Isı dışarı kaçmadı.');
    await par(c.say('Bu yüzden verilen ısı, alınan ısıya eşittir.'), (async () => {
      sag.style.opacity = 1;
      await c.tween(700, (e) => { c1.boy(240 * e); c2.boy(240 * e); }, ease.out);
      await belir(c, esit, 300);
    })());
    await c.say('Ama iki suyun sıcaklık değişimi eşit değil.', { speak: '[curious] Ama iki suyun sıcaklık değişimi eşit değil.' });
    await par(c.say('Erlenmayerin sıcaklığı 30 °C düştü.', { speak: 'Erlenmayerin sıcaklığı otuz derece düştü.' }), dIc.goster(c, '–30 °C'));
    await par(c.say('Beherin sıcaklığı yalnızca 10 °C yükseldi.', { speak: 'Beherin sıcaklığı yalnızca on derece yükseldi.' }), dDis.goster(c, '+10 °C'));
    await c.say('Beherde üç kat su var; ısı sığası daha büyük.');
    const [hx, hy] = dDis.orta();
    halka.setAttribute('cx', hx); halka.setAttribute('cy', hy);
    await par(c.say('Isı sığası büyük olan cismin sıcaklığı daha az değişir.'), belir(c, halka, 300));

    // Sor: yeni durum, yalıtılmış iki cisim.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    yalitim(c, g2, 250, 150, 500, 250, { tx: 726, ty: 190 });
    const a = kup(c, g2, 330, 280, 'A'), b = kup(c, g2, 570, 280, 'B');
    const isi = isiOku(c, g2, [440, 330], [560, 330]);
    const barlar = c.S('g', {}, g2);
    yazi(c, barlar, 318, 439, 'verilen ısı', { size: 24, kalin: 600, hiza: 'end', renk: S.isi });
    yazi(c, barlar, 318, 479, 'alınan ısı', { size: 24, kalin: 600, hiza: 'end', renk: S.isi });
    const b1 = cubuk(c, barlar, 330, 430, S.isi, { h: 24 }), b2 = cubuk(c, barlar, 330, 470, S.isi, { h: 24 });
    b1.boy(240); b2.boy(240);
    gizle(g2, barlar);
    isi.g.style.opacity = 1;
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'A cismi ısı verdi, B cismi ısı aldı; ikisi de yalıtılmış. A’nın sıcaklığı çok düştü, B’ninki az yükseldi. Hangisi doğrudur?',
      options: ['A daha çok ısı verdi; sıcaklığı çok düştü', 'Verilen ısı, alınan ısıya eşittir', 'B daha çok ısı aldı; sıcaklığı yükseldi'], answer: 1,
      hints: ['Isı dışarı kaçmadıysa verilen ısıyla alınan ısı arasında ne ilişki var?', '', 'Sıcaklık değişimi, ısının miktarını değil, ısı sığasını da hesaba katar.'],
      right: 'Evet. Verilen ısı, alınan ısıya eşit.',
    });
    await par(c.say('Sıcaklık değişimleri farklı olsa da verilen ve alınan ısı eşittir.'), belir(c, barlar, 500));
    c.note('Verilen ısı = alınan ısı; sıcaklık değişimleri eşit olmak zorunda değil.', 'Verilen ısı = alınan ısı');
  }

  /* ---- 6. Termometre de dengeye gelir ---- */
  async function termometreDenge(c) {
    const svg = c.svg(1000, 562), g0 = c.S('g', {}, svg), g1 = c.S('g', {}, g0);
    g1.setAttribute('transform', 'translate(-150,-84) scale(1.3)');   // mug ve termometre büyük: tahta boş kalmasın
    const bardak = c.S('g', {}, g1);
    kap(c, bardak, { x: 380, y: 230, w: 220, h: 160, su: 100 });
    renkli(c, bardak, 490, 428, ['su · ', ['45 °C', S.sicaklik]], { size: 26, kalin: 600 });
    const tg = c.S('g', {}, g1), tm = duzTerm(c, tg, { x: 490, y: 372, h: 220, T: 22 });
    tg.setAttribute('transform', 'translate(310,0)');
    const isi = isiOku(c, g1, [582, 365], [524, 365]);
    const siga = c.S('g', {}, g0);
    yazi(c, siga, 720, 180, 'ısı sığası', { size: 26, kalin: 700, hiza: 'start' });
    yazi(c, siga, 720, 250, 'vücut', { size: 26, kalin: 600, hiza: 'start', renk: RENK.soluk });
    c.S('rect', { x: 720, y: 264, width: 250, height: 28, rx: 6, fill: S.kutle }, siga);
    yazi(c, siga, 720, 340, 'termometre', { size: 26, kalin: 600, hiza: 'start', renk: RENK.soluk });
    c.S('rect', { x: 720, y: 354, width: 50, height: 28, rx: 6, fill: S.kutle }, siga);
    gizle(g1, siga);

    await par(c.say('Termometre de aynı kuralla çalışır.'), belir(c, g1, 450));
    await par(c.say('Sıcak suya batırılan termometreye sudan ısı aktarılır.'), (async () => {
      await c.tween(900, (e) => tg.setAttribute('transform', `translate(${310 * (1 - e)},0)`), ease.inOut);
      await belir(c, isi.g, 400);
      await tm.git(c, 45, 3000, ease.out);
    })());
    await par(c.say('Termometre ile su ısıl dengeye gelince sütun durur.'), belir(c, isi.g, 400, 0));
    await c.say('Okuduğumuz değer, bu denge sıcaklığıdır.');
    await c.say('Bu yüzden ölçerken sütun durana kadar bekleriz.');
    await par(c.say('Vücudun ısı sığası termometreninkinden çok büyüktür.'), belir(c, siga, 450));
    await c.say('Bu yüzden denge sıcaklığı vücut sıcaklığına çok yakın çıkar.');

    // Sor: sütun hâlâ yükseliyor.
    c.clearSay();
    await belir(c, siga, 300, 0);
    tm.kur(30);
    await belir(c, isi.g, 400);
    await c.choice({
      tag: 'Sor', q: 'Ela termometreyi sıcak suya batırdı; sütun hâlâ yükseliyor. Değeri ne zaman okumalı?',
      options: ['Hemen; sıcaklık zaten okunur', 'Sütun durunca; ısıl denge sağlanmıştır', 'Sütun yükselirken; en doğru değer odur'], answer: 1,
      hints: ['Termometre sudan ısı alırken sütun yükselir; ne zaman ısı almayı bırakır?', '', 'Okunan değer, termometre ile suyun denge sıcaklığıdır; bu değere ulaşılmış mı?'],
      right: 'Evet. Sütun durunca denge sağlanmıştır.',
    });
    await par(c.say('Sütun durdu: termometre ile su ısıl dengeye geldi.'), (async () => {
      await tm.git(c, 45, 1800, ease.out);
      await belir(c, isi.g, 400, 0);
    })());
  }

  /* ---- 7. Yalıtılmış kutuda iki cisim ---- */
  async function kutuda(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    yalitim(c, g1, 150, 120, 700, 320, { tx: 830, ty: 424 });
    const A = kup(c, g1, 320, 330, 'A'), B = kup(c, g1, 580, 330, 'B');
    const tA = termometre(c, g1, { x: 370, y: 322, h: 170 }), tB = termometre(c, g1, { x: 630, y: 322, h: 170 });
    tA.kur(85); tB.kur(31);
    const isi = isiOku(c, g1, [430, 380], [570, 380]);
    gizle(tA.g, tB.g);

    await par(c.say('Yalıtılmış bir kutuda A ve B cisimleri var.'), belir(c, g1, 450));
    await par(c.say('Bir süre sonra A’dan B’ye ısı aktarıldığı görülüyor.'), belir(c, isi.g, 500));
    await c.say('Isı, sıcaklığı yüksek olandan düşük olana aktarılır.');
    await par(c.say('O hâlde A’nın sıcaklığı B’ninkinden yüksektir.'), (async () => { await belir(c, tA.g, 500); await belir(c, tB.g, 500); })());

    // Birlikte çöz: K ve L; kartta iki boşluk.
    c.clearSay();
    await belir(c, [tA.g, tB.g, isi.g], 300, 0);
    A.t.textContent = 'K'; B.t.textContent = 'L';
    const kart = c.S('g', {}, g1);
    kutu(c, kart, 190, 140, 620, 160, { rx: 14 });
    yazi(c, kart, 500, 188, 'K ile L’nin sıcaklıkları eşitlenmiş.', { size: 26, kalin: 600 });
    const s2 = renkli(c, kart, 500, 238, ['Bu yüzden aralarında ısı ', ['……', RENK.soluk]], { size: 26, kalin: 600 });
    const s3 = renkli(c, kart, 500, 280, ['ve ikisi ', ['……', RENK.soluk], ' dengededir.'], { size: 26, kalin: 600 });
    gizle(kart);
    await belir(c, kart, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Boşluklara hangisi gelir?',
      options: ['alışverişi sürer; ısıl', 'alışverişi olmaz; ısıl', 'alışverişi olmaz; ısı sığası'], answer: 1,
      hints: ['Sıcaklıklar eşitse sıcaklık farkı yoktur; ısı aktarılmaz.', '', 'Sıcaklıkları eşit olan maddelerin durumuna ne denir?'],
      right: 'Evet. Sıcaklıkları eşit olan maddeler ısıl dengededir.',
    });
    parcaKoy(c, s2, ['Bu yüzden aralarında ısı ', ['alışverişi olmaz', RENK.iyi]]);
    parcaKoy(c, s3, ['ve ikisi ', ['ısıl', RENK.iyi], ' dengededir.']);
    await c.say('K ile L ısıl dengede; aralarında ısı alışverişi yok.');

    // Sor: yeni durum, süt ve oda.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kutu(c, g2, 90, 270, 110, 120, { rx: 10 });
    yazi(c, g2, 145, 340, 'süt', { size: 26, kalin: 600 });
    const tS = duzTerm(c, g2, { x: 300, y: 372, h: 220, T: 4, yan: 'sol' });
    c.S('rect', { x: 450, y: 130, width: 450, height: 290, rx: 14, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g2);
    yazi(c, g2, 474, 172, 'oda', { size: 26, kalin: 600, hiza: 'start' });
    duzTerm(c, g2, { x: 700, y: 372, h: 220, T: 22 });
    const isi2 = isiOku(c, g2, [440, 300], [335, 300]);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Ela buzdolabından 4 °C’lık süt çıkarıp 22 °C’lık odada masaya bırakıyor. Uzun süre sonra süt kaç derece olur?',
      options: ['4 °C; hiç değişmez', '22 °C; oda sıcaklığı', '13 °C; ikisinin ortası'], answer: 1,
      hints: ['Süt, odadan soğuk; ısı hangi yönde aktarılır ve ne zamana kadar?', '', 'Çay da ortada durmamıştı: ısı aktarımı sıcaklıklar eşit olunca biter.'],
      right: 'Evet. Süt oda sıcaklığında durur.',
    });
    await par(c.say('Süt ısı aldı, oda sıcaklığına geldi ve orada durdu.'), (async () => {
      await belir(c, isi2.g, 500);
      await tS.git(c, 22, 4000, ease.out);
      await belir(c, isi2.g, 400, 0);
    })());
    c.note('Isı sıcaktan soğuğa aktarılır; denge ortada buluşmak değil, eşitlenmektir.', 'Denge ortada değil');
  }

  /* ---- 8. Isıl dengede mi? ---- */
  const KARTLAR = [
    { ust: 'Masa ve üstündeki bardak:', alt: 'ikisi de 22 °C.', ad: 'masa–bardak', kutu: 0,
      neden: 'Evet. Sıcaklıkları eşit; ısı alışverişi olmaz.', ipucu: 'Sıcaklıkları aynıysa aralarında ısı aktarılır mı?' },
    { ust: 'Buzdolabından yeni çıkan', alt: 'süt ve oda.', ad: 'süt–oda', kutu: 1,
      neden: 'Evet. Sıcaklıkları farklı; süt ısı alıyor.', ipucu: 'Süt hâlâ odadan soğuk mu, aynı sıcaklıkta mı?' },
    { ust: 'Termometre ve su:', alt: 'sütun artık değişmiyor.', ad: 'termometre–su', kutu: 0,
      neden: 'Evet. Sütun durdu; sıcaklıkları eşit.', ipucu: 'Sütun durduysa termometre suyla aynı sıcaklığa gelmiştir.' },
    { ust: 'Kaynar çaya yeni', alt: 'batırılan kaşık.', ad: 'kaşık–çay', kutu: 1,
      neden: 'Evet. Çay daha sıcak; ısı çaydan kaşığa aktarılıyor.', ipucu: 'Kaşık henüz çaya yeni girdi; sıcaklıkları eşitlenmiş olabilir mi?' },
    { ust: 'Erlenmayer 30 °C,', alt: 'beher 30 °C.', ad: 'erlenmayer–beher', kutu: 0,
      neden: 'Evet. Sıcaklıkları eşit.', ipucu: 'İki termometre aynı değeri gösteriyor; sıcaklık farkı var mı?' },
    { ust: 'A cismi 45 °C, B cismi 40 °C;', alt: 'birbirine değiyorlar.', ad: 'A–B', kutu: 1,
      neden: 'Evet. Fark küçük olsa da ısı A’dan B’ye aktarılır.', ipucu: 'Sıcaklıkları tam eşit mi, yoksa küçük de olsa bir fark var mı?' },
  ];
  async function denge(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 80, ad: 'Isıl dengede' }, { x: 520, ad: 'Isıl dengede değil' }], sayac = [0, 0];
    const ust = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, ust, k.x, 40, 400, 54, { rx: 10 }); yazi(c, ust, k.x + 200, 76, k.ad, { size: 26, kalin: 700 }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 330, 700, 130, { rx: 14 });
      yazi(c, kart, 500, 384, k.ust, { size: 26, kalin: 600 });
      yazi(c, kart, 500, 422, k.alt, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    /* Kart yerinde küçülüp söner; kısa adı kutusunun altındaki listeye yazılır. */
    const yerlestir = async (k) => {
      const el = kart, kx = KUTU[k.kutu].x + 200, ky = 136 + sayac[k.kutu] * 38;
      sayac[k.kutu] += 1;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${395 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const ad = yazi(c, ust, kx, ky, k.ad, { size: 24, kalin: 600, renk: RENK.soluk });
      gizle(ad);
      await belir(c, ad, 300);
    };
    gizle(ust);

    await par(c.say('Şimdi altı duruma bakalım.'), belir(c, ust, 400));
    await c.say('Her biri için karar ver: ısıl denge var mı?');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR,
      soru: () => 'Bu iki madde ısıl dengede mi?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });

    await belir(c, ust, 400, 0.45);
    const k1 = tanimKarti(c, svg, 240, 340, 520, 'ısıl denge', 'sıcaklıklar eşit');
    const k2 = tanimKarti(c, svg, 240, 440, 520, 'denge sıcaklığı', 'ortak son sıcaklık');
    await par(c.say('Sıcaklıkları eşit olan maddeler ısıl dengededir.'), belir(c, k1, 500));
    await par(c.say('Sıcaklıklar eşitlenince ısı alışverişi biter.'), belir(c, k2, 500));
  }

  Ders.start({
    id: 'enerji-d1', kicker: 'Konu D · Isıl denge', title: 'Sıcak su nereye kadar soğur?', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Sıcak su nereye kadar soğur?',
      hook: 'Masada unuttuğun sıcak çay bir saat sonra kaç derece olur; daha da soğur mu?',
      button: 'Derse başla ›',
    },
    goals: ['Sıcaklıkları farklı maddeler arasında ısının sıcaktan soğuğa aktarıldığını söyler.', 'Isıl dengeyi ve denge sıcaklığını açıklar.', 'Isıl dengede ısı alışverişinin olmadığını söyler.', 'Yalıtılmış sistemde verilen ısının alınan ısıya eşit olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Isının yönünü ve ısı sığasını hatırla.', run: hatirla },
      { title: 'Masada unutulan çay', goal: 'Çayın nereye kadar soğuduğunu gör.', run: cay },
      { title: 'Erlenmayer beherin içinde', goal: 'Sıcak ve soğuk suyun sıcaklıklarının eşitlendiğini gör.', run: erlenmayer },
      { title: 'Dengede ne olur?', goal: 'Isıl dengede ısı alışverişinin bittiğini gör.', run: dengede },
      { title: 'Verilen ısı, alınan ısıya eşit', goal: 'Yalıtılmış sistemde verilen ve alınan ısıyı karşılaştır.', run: verilenAlinan },
      { title: 'Termometre de dengeye gelir', goal: 'Termometrenin okuduğu değerin ne olduğunu gör.', run: termometreDenge },
      { title: 'Yalıtılmış kutuda iki cisim', goal: 'Isı aktarımından sıcaklıkları karşılaştır; dengeyi çöz.', run: kutuda },
      { title: 'Isıl dengede mi?', goal: 'Altı durumda ısıl denge olup olmadığına karar ver.', run: denge },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Fırından çıkan 200 °C’lık tepsi 22 °C’lık mutfakta bekletiliyor. Uzun süre sonra tepsinin sıcaklığı için hangisi doğrudur?',
        options: ['200 °C’ta kalır; fırından çıkmıştır', '22 °C’a düşer; sonra ısı alışverişi biter', '22 °C’ın altına düşer; çünkü ısı verir'], answer: 1,
        why: ['Tepsi odadan sıcak olduğu sürece ısı verir; sıcaklığı düşer.', 'Sıcaklıklar eşitlenince ısıl denge kurulur ve ısı alışverişi biter.', 'Isı yalnızca sıcaklık farkı varken aktarılır; tepsi odadan soğuk olmaz.'], scene: 1 },
      { q: 'Sıcak su ile soğuk su yalıtılmış kapta ısıl dengeye geliyor. Termometrelerde ne görülür?',
        options: ['Sıcak olan soğuğun, soğuk olan sıcağın ilk değerini gösterir', 'Sıcak olan hâlâ daha sıcaktır', 'İkisi de aynı değeri gösterir'], answer: 2,
        why: ['Sıcaklıklar yer değiştirmez; eşitlenir.', 'Isıl dengede iki suyun sıcaklığı eşittir.', 'Isıl denge, sıcaklıkların eşitlenmesidir; iki termometre ortak değeri gösterir.'], scene: 2 },
      { q: 'Yalıtılmış sistemde A’nın sıcaklığı 5 °C düştü, B’ninki 25 °C yükseldi. Hangisi doğrudur?',
        options: ['Verilen ısı alınan ısıya eşittir; A’nın ısı sığası daha büyüktür', 'B daha çok ısı aldı; sıcaklığı çok yükseldi', 'A ile B ısıl dengede olduğu için ısı sığaları eşittir'], answer: 0,
        why: ['Isı dışarı kaçmadığından verilen ısı alınana eşittir; ısı sığası büyük olanın sıcaklığı daha az değişir.', 'Alınan ısı verilen ısıya eşittir; sıcaklığın çok yükselmesi daha çok ısı aldığını göstermez.', 'Isı sığaları sıcaklık değişimine bakılarak karşılaştırılır; burada farklıdır.'], scene: 4 },
      { q: 'Ela termometreyi sıcak çaya batırıyor ve sütun hâlâ yükselirken okuyor. Okuduğu değer için hangisi doğrudur?',
        options: ['Çayın sıcaklığını doğru gösterir', 'Çayın denge sıcaklığından düşüktür; sütun henüz durmadı', 'Çayın sıcaklığından yüksektir'], answer: 1,
        why: ['Sütun yükseliyorsa termometre henüz çayla dengeye gelmemiştir.', 'Sütun durana kadar termometre çaydan ısı alır; okunan değer denge değerinin altındadır.', 'Termometre çaydan ısı alarak yükselir; çayın sıcaklığını aşmaz.'], scene: 5 },
      { q: 'Aynı odada duran iki bardak su 35 °C’tır ve birbirine değiyor. Aralarında ne olur?',
        options: ['Bir süre ısı aktarılır, sonra durur', 'Isı sığaları farklıysa ısı aktarılır', 'Zaten ısıl dengededirler; ısı alışverişi olmaz'], answer: 2,
        why: ['Sıcaklıkları baştan eşitse ısı hiç aktarılmaz.', 'Isı, sıcaklık farkı varken aktarılır; ısı sığasına bağlı değildir.', 'Sıcaklıkları eşit olan maddeler zaten ısıl dengededir.'], scene: 3 },
    ],
    summary: ['Sıcaklıkları farklı maddeler arasında ısı, sıcaktan soğuğa aktarılır.', 'Sıcaklıklar eşitlenince ısıl denge kurulur; ortak sıcaklığa denge sıcaklığı denir. Yalıtılmış sistemde verilen ısı, alınan ısıya eşittir.', '<b>Sıcaklıklar eşitlenince ısı alışverişi biter.</b>'],
    nextLesson: { href: 'd2-son-sicaklik-nerede-durur.html', label: 'Sonraki: Son sıcaklık nerede durur? ›' },
  });
})();
