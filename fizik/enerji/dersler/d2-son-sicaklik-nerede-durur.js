/* D2 — Son sıcaklık nerede durur?
   Isıl dengeye ulaşan maddelerin son sıcaklığı ilk sıcaklıkların arasındadır; nerede duracağını ısı sığası belirler: büyük olana yakın durur.
   Senaryo: plan/fizik/enerji/senaryolar/D-isil-denge.md (D2). Hesap yok: denge sıcaklığı hesaplatılmaz, formül gösterilmez.
   Figür Ş3 (DENGE) y 12, h 488 kurulur (D1 ile aynı); yan sütun x 500–985. Bütün yazılar en az 24 birimdir.
   Tahtada aynı anda en çok 25 kelime: deney tabloları bu yüzden üç sütunludur (değişen şey ve son sıcaklık); kap bilgisi figürün etiketlerindedir. */
(() => {
  'use strict';
  const { RENK, sayi, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, tablo } = window.KIT;
  const { termometre, isiOku, kap } = window.KIT_A;
  const { okuma, etiket, degisim, esitCizgi, temasOku, yalitim, sicaklikSatiri } = window.KIT_D;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, soguk: RENK.soguk };
  const CAM = '#c3cbea';
  const FIG = { x: 70, y: 12, h: 488 };
  const BASLA = { ic: 60, dis: 30, icSeviye: 0.3, disSeviye: 0.3, icIcerik: 'su', disIcerik: 'su', icte: 0 };
  /* Kütleye göre doluluk (senaryonun eşlemesi). */
  const SEV = { 50: 0.2, 100: 0.3, 150: 0.4, 200: 0.5, 300: 0.7, 400: 0.8 };
  const metin = (T) => (Number.isInteger(T) ? T : sayi(T)) + ' °C';

  /* ---- ortak: düzenek, sıfırlama, deneme ---- */

  /* Figür, okuma yazıları, kap etiketleri, eşitlik çizgisi ve ısı oku; hepsi gf grubunda. */
  function duzenek(c, svg, ayar, etIc, etDis) {
    const gf = c.S('g', {}, svg);
    gf.style.opacity = 1;
    const f = DENGE.kur(c, gf, FIG);
    f.ayar(ayar);
    const ust = c.S('g', {}, gf);
    const okIc = okuma(c, ust, f, 'ic.termometre'), okDis = okuma(c, ust, f, 'dis.termometre');
    okIc.guncelle(ayar.ic); okDis.guncelle(ayar.dis);
    const et = { ic: etiket(c, ust, f, 'ic', etIc), dis: etiket(c, ust, f, 'dis', etDis) };
    const esit = esitCizgi(c, ust, f), oku = temasOku(c, ust, f);
    gizle(oku.g);
    return { gf, f, ust, okIc, okDis, et, esit, oku, oklar: [] };
  }
  /* Sıcaklıkları şimdikinden verilen değerlere götürür (yavaşlayarak oturur). */
  async function isinma(c, d, ic1, dis1, ms) {
    const i0 = d.okIc.T, b0 = d.okDis.T;
    await c.tween(ms, (e) => {
      const a = lerp(i0, ic1, e), b = lerp(b0, dis1, e);
      d.f.ayar({ ic: a, dis: b }); d.okIc.guncelle(a); d.okDis.guncelle(b); d.esit.ciz();
    }, ease.out);
    d.okIc.g.textContent = metin(ic1); d.okDis.g.textContent = metin(dis1);
  }
  /* Yeni deneme için düzenek başa alınır: erlenmayer altlığa döner, sıcaklıklar ilk değerlerine gider. */
  async function sifirla(c, d, ayar, etIc, etDis) {
    await belir(c, d.gf, 250, 0);
    d.oklar.forEach((o) => o.g.remove()); d.oklar = [];
    d.f.ayar(Object.assign({}, ayar, { icte: 0 }));
    d.okIc.guncelle(ayar.ic); d.okDis.guncelle(ayar.dis);
    d.et.ic.textContent = etIc; d.et.dis.textContent = etDis;
    d.et.ic.style.opacity = 1; d.et.dis.style.opacity = 1;
    gizle(d.esit.g, d.oku.g); d.esit.ciz(); d.oku.izle();
    await belir(c, d.gf, 250, 1);
  }
  /* Bir deneme: erlenmayer beherin içine iner, sıcaklıklar son değere oturur; istenirse değişim okları çizilir.
     o: { oklar = true, sat (sicaklikSatiri: nokta son sıcaklığa kayar) } */
  async function oyna(c, d, son, o = {}) {
    const ic0 = d.okIc.T, dis0 = d.okDis.T;
    await c.tween(1800, (e) => { d.f.ayar({ icte: e }); d.okIc.izle(); d.oku.izle(); }, ease.inOut);
    d.oku.izle();
    belir(c, d.oku.g, 400);
    if (o.oklar !== false) {
      d.oklar = [
        degisim(c, d.ust, d.f, 'ic.termometre', { etiket: 'ust', uzak: 100 }),
        degisim(c, d.ust, d.f, 'dis.termometre', { etiket: 'ust', uzak: 140 }),
      ];
    }
    await par(isinma(c, d, son, son, 3500), o.sat ? o.sat.denge(c, son, 1200) : null);
    await par(belir(c, d.oku.g, 350, 0), belir(c, d.esit.g, 300));
    if (o.oklar !== false) {
      await belir(c, [d.et.ic, d.et.dis], 300, 0);
      const isaret = (v) => (v < 0 ? '−' : '+') + sayi(Math.abs(v)) + ' °C';
      await par(d.oklar[0].goster(c, isaret(son - ic0)), d.oklar[1].goster(c, isaret(son - dis0)));
    }
  }
  /* Üç sütunlu deney tablosu (sağ kenarı x 975) ve satır yazma. */
  function tabloKur(c, p, basliklar, w) {
    return tablo(c, p, { x: 975 - w.reduce((t, v) => t + v, 0), y: 40, satir: 3, h: 80, size: 26, sutunlar: basliklar.map((ad, i) => ({ ad, w: w[i] })) });
  }
  function satirYaz(tb, i, a, b, son, renk) {
    tb.yaz(i, 0, a, renk); tb.yaz(i, 1, b, renk); tb.yaz(i, 2, son, S.sicaklik);
    for (let k = 0; k < 3; k++) tb.vurgula(k, k === i);
    return tb.goster(i, 400);
  }
  /* Düz termometre ve yanında sarı sıcaklık yazısı (figür dışı çizimler). */
  function duzTerm(c, p, o) {
    const g = c.S('g', {}, p), tm = termometre(c, g, { x: o.x, y: o.y, h: o.h });
    const yz = yazi(c, g, o.x + 18, 0, '', { hiza: 'start', size: 26, kalin: 700, renk: S.sicaklik });
    tm.kur(o.T);
    yz.setAttribute('y', o.y - 14 - (10 + (o.h - 30) * o.T / 100) + 8); yz.textContent = o.T + ' °C';
    return { g, tm };
  }
  const kup = (c, p, x, y, harf) => {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: 100, height: 100, rx: 10, fill: CAM, 'fill-opacity': 0.25, stroke: CAM, 'stroke-width': 3 }, g);
    const t = yazi(c, g, x + 50, y + 62, harf, { size: 32, kalin: 700 });
    return { g, t };
  };
  /* Sıcaklık satırında bir ucun halkasını turkuaz ve büyük yapar (i: 0 sol uç, 1 sağ uç; 2 denge noktası). */
  const halkaBuyut = (c, sat, i, r1 = 20, ms = 300) => {
    const el = sat.g.querySelectorAll('circle')[i], r0 = +el.getAttribute('r');
    el.setAttribute('stroke', S.kutle);
    return c.tween(ms, (e) => el.setAttribute('r', lerp(r0, r1, e)), ease.out);
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    c.S('path', { d: 'M335,190 H365 V240 L400,340 H300 L335,240 Z', fill: S.soguk, 'fill-opacity': 0.3, stroke: CAM, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g1);
    yazi(c, g1, 350, 384, 'erlenmayer', { size: 26, kalin: 600 });
    kap(c, g1, { x: 600, y: 190, w: 140, h: 150, su: 105 });
    yazi(c, g1, 670, 384, 'beher', { size: 26, kalin: 600 });
    const t1 = duzTerm(c, g1, { x: 450, y: 340, h: 150, T: 30 }), t2 = duzTerm(c, g1, { x: 790, y: 340, h: 150, T: 30 });
    gizle(g1, t1.g, t2.g);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 400));
    await c.choice({
      tag: 'Hatırla', q: 'Erlenmayerdeki sıcak su, beherdeki soğuk suyla ısıl dengeye geldi. Termometreler ne gösterir?',
      options: ['Erlenmayerdeki hâlâ daha sıcak', 'İkisi aynı değeri', 'Beherdeki daha sıcak'], answer: 1,
      hints: ['Isıl dengede sıcaklıklar eşittir; ısı alışverişi biter.', '', 'Isıl dengede sıcaklıklar eşittir; ısı alışverişi biter.'],
      right: 'Evet. Isıl dengede sıcaklıklar eşit.',
    });
    await par(c.say('Isıl dengede iki termometre de aynı değeri gösterir.'), belir(c, [t1.g, t2.g], 450));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const tA = termometre(c, g2, { x: 400, y: 380, h: 220, T: 20 }), tB = termometre(c, g2, { x: 600, y: 380, h: 220, T: 20 });
    yazi(c, g2, 400, 432, 'A', { size: 30, kalin: 700 });
    yazi(c, g2, 600, 432, 'B', { size: 30, kalin: 700 });
    isiOku(c, g2, [340, 500], [660, 500]).g.style.opacity = 1;
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı ısıyı alan iki cisimden hangisinin sıcaklığı daha az artar?',
      options: ['Isı sığası küçük olanın', 'İkisininki aynı kadar artar', 'Isı sığası büyük olanın'], answer: 2,
      hints: ['Isı sığası büyük olan cismin sıcaklığı az değişir.', 'Isı sığası büyük olan cismin sıcaklığı az değişir.', ''],
      right: 'Evet. Isı sığası büyük olan az ısınır.',
    });
    await par(c.say('Isı sığası büyük olanın sıcaklığı daha az artar.'), tA.git(c, 70, 1400), tB.git(c, 40, 1400));
    await c.say('Bugün denge sıcaklığının nerede duracağına bakacağız.');
  }

  /* ---- 2. Üç deney, bir tablo ---- */
  async function ucDeney(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, BASLA, '100 g su', '100 g su');
    const sag = c.S('g', {}, svg);
    const chip = (y, ad, renk) => {
      const g = c.S('g', {}, sag);
      kutu(c, g, 540, y, 400, 76, { rx: 14, renk });
      yazi(c, g, 740, y + 49, ad, { size: 30, kalin: 700, renk });
      return g;
    };
    const chips = c.S('g', {}, sag);
    const cK = chip(70, 'kütle', S.kutle), cM = chip(170, 'madde', S.soguk), cI = chip(270, 'ilk sıcaklık', S.sicaklik);
    [cK, cM, cI].forEach((g) => chips.appendChild(g));
    const tb = tabloKur(c, sag, ['Sıcak (g)', 'Soğuk (g)', 'Son (°C)'], [155, 155, 145]);
    const lg1 = renkli(c, sag, 740, 160, ['su → ', ['c', RENK.yazi]], { size: 34, kalin: 700 });
    const lg2 = renkli(c, sag, 740, 250, ['zeytinyağı → ', ['c / 2', RENK.yazi]], { size: 34, kalin: 700 });
    const kart1 = c.S('g', {}, sag), kart2 = c.S('g', {}, sag);
    kutu(c, kart1, 530, 130, 430, 150, { rx: 14 });
    yazi(c, kart1, 745, 192, 'ısı sığası büyük', { size: 32, kalin: 700, renk: S.kutle });
    yazi(c, kart1, 745, 244, 'sıcaklık az değişir', { size: 32, kalin: 700, renk: S.sicaklik });
    kutu(c, kart2, 530, 130, 430, 150, { rx: 14 });
    renkli(c, kart2, 745, 192, [['kütle', S.kutle], ' ve ', ['öz ısı', S.soguk], ' büyüdükçe'], { size: 30, kalin: 700 });
    yazi(c, kart2, 745, 244, 'ısı sığası büyür', { size: 32, kalin: 700 });
    gizle(d.gf, sag, chips, tb.g, lg1, lg2, kart1, kart2, cK, cM, cI);
    sag.style.opacity = 1;

    await par(c.say('Geçen derste sıcak ve soğuk su ısıl dengeye geldi.'), belir(c, d.gf, 450));
    await c.say('Bugün denge sıcaklığının nerede durduğunu inceleyeceğiz.');
    await c.say('Ela bunun için üç deney yapıyor.');
    chips.style.opacity = 1;
    await par(c.say('Birinde kütleyi, birinde maddeyi, birinde ilk sıcaklıkları değiştiriyor.'),
      (async () => { for (const g of [cK, cM, cI]) await belir(c, g, 300); })());
    await c.say('Her deneyde yalnızca bir şey değişir; ötekiler sabit kalır.');
    await par(c.say('Sonuçları her deneyde bir tabloya yazıyor.'), belir(c, chips, 300, 0), belir(c, tb.g, 400));
    await c.say('Tabloda değişen şey ile son sıcaklık yer alır.');
    await par(c.say('Suyun öz ısısına c diyelim.', { speak: 'Suyun öz ısısına ce diyelim.' }), belir(c, tb.g, 300, 0), belir(c, lg1, 400));
    await par(c.say('Zeytinyağının öz ısısı suyunkinin yarısıdır: c / 2.', { speak: 'Zeytinyağının öz ısısı suyunkinin yarısıdır: ce bölü iki.' }), belir(c, lg2, 400));
    await par(c.say('Hatırlayalım: ısı sığası büyük olan cismin sıcaklığı daha az değişir.'), (async () => { await belir(c, [lg1, lg2], 250, 0); await belir(c, kart1, 400); })());
    await par(c.say('Isı sığası, kütle ve öz ısı büyüdükçe büyür.'), (async () => { await belir(c, kart1, 250, 0); await belir(c, kart2, 400); })());

    // Sor: tahta aynı kalır; yalnızca değişen şeyi hatırlatan üç kutu geri gelir, "madde" öne çıkar.
    c.clearSay();
    await par(belir(c, kart2, 300, 0), belir(c, chips, 300));
    cK.style.opacity = 1; cM.style.opacity = 1; cI.style.opacity = 1;
    await c.choice({
      tag: 'Sor', q: 'Ela maddenin etkisine bakıyor. Hangilerini sabit tutmalı?',
      options: ['Yalnızca kütleleri', 'Kütleleri ve ilk sıcaklıkları', 'Hiçbirini; hepsi değişebilir'], answer: 1,
      hints: ['Her deneyde yalnızca bir şey değişir; madde değişiyorsa ötekilere ne olur?', '', 'İki şeyi birden değiştirirsen sonucu hangisinin yaptığını bilemezsin.'],
      right: 'Evet. Madde değişirken kütle ve ilk sıcaklık sabit kalır.',
    });
    await c.say('Madde değişirken kütleler ve ilk sıcaklıklar sabit kalır.');
    c.note('Her seferinde yalnızca bir şeyi değiştir; ötekiler sabit kalsın.', 'Tek değişken');
  }

  /* ---- 3. Deney 1: kütle ---- */
  async function kutle(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, BASLA, '100 g su', '100 g su');
    const tb = tabloKur(c, svg, ['Sıcak (g)', 'Soğuk (g)', 'Son (°C)'], [155, 155, 145]);
    // Anlatım 12–13: bir kaşık ve bir bardak soğuk su (sayı yok).
    const cz = c.S('g', {}, svg);
    const bardak = (g, x, y, su, renk) => {
      c.S('rect', { x: x + 3, y: y + 101 - su, width: 94, height: su, rx: 4, fill: renk, 'fill-opacity': 0.45 }, g);
      c.S('path', { d: `M${x},${y} V${y + 94} Q${x},${y + 104} ${x + 10},${y + 104} H${x + 90} Q${x + 100},${y + 104} ${x + 100},${y + 94} V${y}`, fill: 'none', stroke: CAM, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    };
    const cizim1 = c.S('g', {}, cz), cizim2 = c.S('g', {}, cz);
    bardak(cizim1, 570, 428, 62, S.isi);
    cizgi(c, cizim1, [672, 396], [750, 374], CAM, 7);
    c.S('ellipse', { cx: 656, cy: 398, rx: 24, ry: 12, transform: 'rotate(-15 656 398)', fill: S.soguk, 'fill-opacity': 0.85 }, cizim1);
    c.S('path', { d: 'M630,408 q7,12 0,20 q-7,-8 0,-20 Z', fill: S.soguk }, cizim1);
    bardak(cizim2, 570, 428, 62, S.isi);
    bardak(cizim2, 720, 428, 98, S.soguk);
    gizle(d.gf, d.et.ic, d.et.dis, tb.g, cizim1, cizim2);

    await par(c.say('Önce kütlenin etkisine bakalım.'), belir(c, d.gf, 450));
    await c.say('İkisi de su; erlenmayerde 60 °C, beherde 30 °C.', { speak: 'İkisi de su; erlenmayerde altmış derece, beherde otuz derece.' });
    await par(c.say('Birinci denemede iki kapta da 100 g su var.', { speak: 'Birinci denemede iki kapta da yüz gram su var.' }), belir(c, [d.et.ic, d.et.dis], 400), belir(c, tb.g, 400));
    await par(c.say('Sıcaklıklar eşitlenene kadar bekliyoruz.'), oyna(c, d, 45));
    await par(c.say('Erlenmayer 15 °C düştü, beher 15 °C yükseldi.', { speak: 'Erlenmayer on beş derece düştü, beher on beş derece yükseldi.' }), satirYaz(tb, 0, '100', '100', '45', S.kutle));
    await c.say('Aynı su miktarında denge sıcaklığı tam ortada, 45 °C.', { speak: 'Aynı su miktarında denge sıcaklığı tam ortada, kırk beş derece.' });
    await par(c.say('İkinci denemede beherdeki soğuk su 200 g oluyor.', { speak: 'İkinci denemede beherdeki soğuk su iki yüz gram oluyor.' }),
      sifirla(c, d, Object.assign({}, BASLA, { disSeviye: SEV[200] }), '100 g su', '200 g su'));

    await c.choice({
      tag: 'Tahmin et', q: 'Soğuk su artınca denge sıcaklığı 45 °C’a göre nasıl olur?',
      options: ['45 °C’ta kalır', '45 °C’tan düşük olur', '45 °C’tan yüksek olur'], answer: 1,
      hints: ['Soğuk kabın sıcaklığı az değişirse denge hangi sıcaklığa yakın kalır?', '', 'Beherdeki suyun kütlesi arttı; ısı sığası ne oldu, sıcaklığı ne kadar değişir?'],
      right: 'Evet. Soğuk su çoğalınca denge sıcaklığı düşer.',
    });
    c.clearSay();
    await par(c.say('Bu kez beherde daha çok soğuk su var.'), oyna(c, d, 40));
    await par(c.say('Erlenmayer 20 °C düştü, beher yalnızca 10 °C yükseldi.', { speak: 'Erlenmayer yirmi derece düştü, beher yalnızca on derece yükseldi.' }), satirYaz(tb, 1, '100', '200', '40', S.kutle));
    await c.say('Soğuk su çoğalınca denge sıcaklığı soğuk suyun ilk sıcaklığına yaklaştı.');
    await par(c.say('Üçüncü denemede sıcak su 200 g, soğuk su 100 g olacak.', { speak: 'Üçüncü denemede sıcak su iki yüz gram, soğuk su yüz gram olacak.' }),
      sifirla(c, d, Object.assign({}, BASLA, { icSeviye: SEV[200] }), '200 g su', '100 g su'));

    await c.choice({
      tag: 'Sor', q: 'Sıcak su 200 g, soğuk su 100 g. Denge sıcaklığı 45 °C’a göre nasıl olur?',
      options: ['45 °C’tan yüksek olur', '45 °C’ta kalır', '45 °C’tan düşük olur'], answer: 0,
      hints: ['', 'Sıcak kabın sıcaklığı az değişirse denge 60 °C’a yakın kalır.', 'İkinci denemede çoğalan soğuk suydu; şimdi çoğalan hangisi?'],
      right: 'Evet. Sıcak su çoğalınca denge sıcaklığı yükselir.',
    });
    c.clearSay();
    await par(c.say('Bu kez erlenmayerde daha çok sıcak su var.'), oyna(c, d, 50));
    await par(c.say('Sıcak su çoğalınca denge sıcaklığı sıcak suyun ilk sıcaklığına yaklaştı.'), satirYaz(tb, 2, '200', '100', '50', S.kutle));
    await c.say('Kütlesi büyük olan, sıcaklığını daha az değiştirir.');
    await par(c.say('Bir kaşık soğuk su, sıcak suyu çok az soğutur.'), belir(c, tb.g, 400, 0.45), belir(c, cizim1, 500));
    await par(c.say('Bir bardak soğuk su ise daha çok soğutur.'), belir(c, cizim1, 300, 0), belir(c, cizim2, 500));
    c.note('Kütlesi büyük olanın sıcaklığı az değişir; denge ona yakın durur.', 'Kütle');
  }

  /* ---- 4. Deney 2: maddenin cinsi ---- */
  async function madde(c) {
    const AYAR = Object.assign({}, BASLA, { disIcerik: 'yag' });
    const d = duzenek(c, c.svg(1000, 562), AYAR, '100 g su, c', '100 g zeytinyağı, c / 2');
    const svg = d.gf.parentNode;
    const tb = tabloKur(c, svg, ['Sıcak', 'Soğuk', 'Son (°C)'], [165, 165, 135]);
    gizle(d.gf, d.et.ic, d.et.dis, tb.g);

    await par(c.say('Şimdi maddenin cinsine bakalım.'), belir(c, d.gf, 450));
    await par(c.say('Kütleler 100 g, ilk sıcaklıklar yine 60 °C ve 30 °C.', { speak: 'Kütleler yüz gram, ilk sıcaklıklar yine altmış derece ve otuz derece.' }), belir(c, [d.et.ic, d.et.dis], 400));
    satirYaz(tb, 0, 'su', 'su', '45'); tb.vurgula(0, false); gizle(tb.satirlar[0].g);
    await par(c.say('İlk satırı zaten biliyoruz: iki su, 45 °C.', { speak: 'İlk satırı zaten biliyoruz: iki su, kırk beş derece.' }), belir(c, tb.g, 400), tb.goster(0, 400));
    await c.say('Şimdi erlenmayerde sıcak su, beherde soğuk zeytinyağı var.');

    await c.choice({
      tag: 'Tahmin et', q: 'Soğuk zeytinyağı denge sıcaklığını 45 °C’a göre nasıl değiştirir?',
      options: ['45 °C’tan düşük olur', '45 °C’tan yüksek olur; suyun sıcaklığı daha az düşer', '45 °C’ta kalır'], answer: 1,
      hints: ['Hangisinin öz ısısı büyük: sıcak suyunki mi, soğuk yağınki mi?', '', 'Öz ısısı büyük olan kütle aynıysa ısı sığası büyük olan demektir; sıcaklığı az değişir.'],
      right: 'Evet. Suyun öz ısısı büyük; sıcaklığı daha az düşer.',
    });
    c.clearSay();
    await par(c.say('Sıcak su soğuk zeytinyağına ısı veriyor.'), oyna(c, d, 50));
    await par(c.say('Sıcak su 10 °C düştü, zeytinyağı 20 °C yükseldi.', { speak: 'Sıcak su on derece düştü, zeytinyağı yirmi derece yükseldi.' }), satirYaz(tb, 1, 'su', 'zeytinyağı', '50'));
    await c.say('Suyun öz ısısı büyük; sıcaklığı daha az değişti.');
    await c.say('Denge sıcaklığı suyun ilk sıcaklığına yaklaştı.');
    await par(c.say('Şimdi yerleri değiştirelim: sıcak olan zeytinyağı, soğuk olan su.'),
      sifirla(c, d, Object.assign({}, BASLA, { icIcerik: 'yag' }), '100 g zeytinyağı, c / 2', '100 g su, c'));

    await c.choice({
      tag: 'Sor', q: 'Sıcak zeytinyağı 60 °C, soğuk su 30 °C; ikisi 100 g. Denge sıcaklığı 45 °C’a göre nasıl olur?',
      options: ['45 °C’tan yüksek olur', '45 °C’ta kalır', '45 °C’tan düşük olur'], answer: 2,
      hints: ['Bu kez su soğuk kaptadır; öz ısısı büyük olan hangisi?', 'Suyun sıcaklığı az değişirse denge, suyun ilk sıcaklığına yakın kalır.', ''],
      right: 'Evet. Denge sıcaklığı 45 °C’tan düşük olur.',
    });
    c.clearSay();
    await par(c.say('Şimdi sıcak zeytinyağı soğuk suya ısı veriyor.'), oyna(c, d, 40));
    await par(c.say('Denge sıcaklığı yine suyun ilk sıcaklığına yaklaştı.'), satirYaz(tb, 2, 'zeytinyağı', 'su', '40'));
    await c.say('Öz ısısı büyük olan, sıcaklığını daha az değiştirir.');
    c.note('Öz ısısı büyük olanın sıcaklığı az değişir; denge ona yakın durur.', 'Madde');
  }

  /* ---- 5. Deney 3: ilk sıcaklık ---- */
  async function ilkSicaklik(c) {
    const d = duzenek(c, c.svg(1000, 562), BASLA, '100 g su', '100 g su');
    const svg = d.gf.parentNode;
    const tb = tabloKur(c, svg, ['Sıcak (°C)', 'Soğuk (°C)', 'Son (°C)'], [155, 155, 145]);
    gizle(d.gf, d.et.ic, d.et.dis, tb.g);

    await par(c.say('Son olarak ilk sıcaklıklara bakalım.'), belir(c, d.gf, 450));
    await par(c.say('İki kapta da 100 g su var.', { speak: 'İki kapta da yüz gram su var.' }), belir(c, [d.et.ic, d.et.dis], 400));
    satirYaz(tb, 0, '60', '30', '45'); tb.vurgula(0, false); gizle(tb.satirlar[0].g);
    await par(c.say('İlk satırda sıcaklıklar 60 °C ve 30 °C; son 45 °C.', { speak: 'İlk satırda sıcaklıklar altmış derece ve otuz derece; son kırk beş derece.' }), belir(c, tb.g, 400), tb.goster(0, 400));
    await par(c.say('İkinci denemede erlenmayerdeki su 80 °C’a ısıtılıyor.', { speak: 'İkinci denemede erlenmayerdeki su seksen dereceye ısıtılıyor.' }),
      sifirla(c, d, Object.assign({}, BASLA, { ic: 80 }), '100 g su', '100 g su'));

    await c.choice({
      tag: 'Tahmin et', q: 'Sıcak su 80 °C olursa denge sıcaklığı 45 °C’a göre nasıl olur?',
      options: ['45 °C’ta kalır', '45 °C’tan yüksek olur', '45 °C’tan düşük olur'], answer: 1,
      hints: ['Soğuk kap aynı; sıcak kabın verdiği ısı artarsa soğuk kabın sıcaklığı ne olur?', '', 'Erlenmayer artık daha sıcak; ısı daha çok mu, daha az mı aktarılır?'],
      right: 'Evet. Daha sıcak suyla denge sıcaklığı yükselir.',
    });
    c.clearSay();
    await par(c.say('Erlenmayer daha sıcak; yine dengeye geliyorlar.'), oyna(c, d, 55));
    await par(c.say('Sıcak su 25 °C düştü, soğuk su 25 °C yükseldi.', { speak: 'Sıcak su yirmi beş derece düştü, soğuk su yirmi beş derece yükseldi.' }), satirYaz(tb, 1, '80', '30', '55'));
    await c.say('Kütle ve madde aynı olduğundan denge yine tam ortada.');
    await par(c.say('Üçüncü denemede soğuk su 10 °C; sıcak su 60 °C.', { speak: 'Üçüncü denemede soğuk su on derece; sıcak su altmış derece.' }),
      sifirla(c, d, Object.assign({}, BASLA, { dis: 10 }), '100 g su', '100 g su'));

    await c.choice({
      tag: 'Sor', q: 'Soğuk su 10 °C, sıcak su 60 °C; ikisi 100 g su. Denge sıcaklığı nerede olur?',
      options: ['60 °C’a yakın', '10 °C’a yakın', 'İki ilk sıcaklığın tam ortasında'], answer: 2,
      hints: ['Kütle ve madde aynı; ikinci denemede denge nerede çıkmıştı?', 'Sıcaklıklar değişti, ama iki kap hâlâ aynı su miktarında.', ''],
      right: 'Evet. Aynı su miktarında denge tam ortada.',
    });
    c.clearSay();
    await par(c.say('Sıcaklıklar yine eşitlenene kadar bekliyoruz.'), oyna(c, d, 35));
    await par(c.say('Aynı su miktarında denge, sıcaklıklar ne olursa olsun tam ortada.'), satirYaz(tb, 2, '60', '10', '35'));
    c.note('Aynı su miktarında denge, ilk sıcaklıkların tam ortasındadır.', 'İlk sıcaklık');
  }

  /* ---- 6. Veriler ne diyor? ---- */
  const X6 = (T) => 110 + (T - 10) * 11.5;
  const ROW6 = [[30, 60, 45], [30, 60, 40], [30, 60, 50], [30, 60, 50], [30, 60, 40], [30, 80, 55], [10, 60, 35]];
  async function veriler(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    const satirlar = ROW6.map(([a, b, T], i) => {
      const y = 110 + i * 58, g = c.S('g', {}, g1);
      cizgi(c, g, [X6(a), y], [X6(b), y], RENK.gri, 3);
      const ha = [a, b].map((v) => c.S('circle', { cx: X6(v), cy: y, r: 8, fill: RENK.koyu, stroke: S.sicaklik, 'stroke-width': 3.5 }, g));
      const nk = c.S('circle', { cx: X6(T), cy: y, r: 11, fill: S.sicaklik }, g);
      yazi(c, g, X6(T), y - 24, T + ' °C', { size: 24, kalin: 700, renk: S.sicaklik });
      gizle(g);
      return { g, ha, nk };
    });

    await par(c.say('Yedi farklı denemenin sonucunu aynı sıcaklık çizgisinde görelim.'), (async () => { for (const s of satirlar) await belir(c, s.g, 300); })());
    await c.say('Her satırda uçlar ilk sıcaklıkları, nokta son sıcaklığı gösterir.');
    await c.say('Son sıcaklık her satırda iki ilk sıcaklığın arasında.');
    await c.say('Hiçbir zaman sıcak olanın üstüne ya da soğuk olanın altına çıkmıyor.');
    await par(c.say('Isı sığaları eşit olduğunda nokta tam ortada.'),
      c.tween(600, (e) => [0, 5, 6].forEach((i) => satirlar[i].nk.setAttribute('r', 11 + 3.3 * Math.sin(Math.PI * e))), ease.inOut));
    await par(c.say('Ötekilerde nokta, ısı sığası büyük olan kabın ilk sıcaklığına yakın.'),
      ...[[1, 0], [2, 1], [3, 1], [4, 0]].map(([i, k]) => {
        const el = satirlar[i].ha[k];
        el.setAttribute('stroke', S.kutle);
        return c.tween(300, (e) => el.setAttribute('r', lerp(8, 14, e)), ease.out);
      }));
    await c.say('Burada kütlesi ya da öz ısısı büyük olanın ısı sığası büyük.');

    // Sor: tek satır, 20 °C ve 80 °C uçları, nokta 70 °C'ta.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const sat = sicaklikSatiri(c, g2, { x: 140, y: 300, w: 700, min: 20, max: 80, uclar: [{ T: 20, ad: '', renk: S.sicaklik }, { T: 80, ad: '', renk: S.sicaklik }] });
    const yz = yazi(c, g2, sat.konum(70), 270, '70 °C', { size: 26, kalin: 700, renk: S.sicaklik });
    gizle(yz);
    await sat.denge(c, 70);
    await belir(c, yz, 300);
    await c.choice({
      tag: 'Sor', q: 'Bir deneyde son sıcaklık 70 °C çıktı. Hangi kabın ısı sığası daha büyük?',
      options: ['20 °C’taki kabın', '80 °C’taki kabın', 'İkisininki eşit'], answer: 1,
      hints: ['Nokta, ısı sığası büyük olan kabın ilk sıcaklığına yakın durur; hangi uca yakın?', '', 'Nokta tam ortada olsaydı ısı sığaları eşit olurdu; burada ortada değil.'],
      right: 'Evet. Nokta 80 °C’a yakın.',
    });
    await par(c.say('Nokta 80 °C’a yakın; o kabın ısı sığası büyük.', { speak: 'Nokta seksen dereceye yakın; o kabın ısı sığası büyük.' }), halkaBuyut(c, sat, 1));
  }

  /* ---- 7. Isı sığası belirler ---- */
  async function sigaBelirler(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    yalitim(c, g1, 150, 240, 700, 210);
    const A = kup(c, g1, 320, 340, 'A'), B = kup(c, g1, 580, 340, 'B');
    const isi = isiOku(c, g1, [430, 390], [570, 390]);
    const satirKur = (pr, sol, sag) => {
      const sat = sicaklikSatiri(c, g1, { x: 250, y: 150, w: 500, min: 0, max: 100, uclar: [{ T: 0, ad: sol, renk: S.sicaklik }, { T: 100, ad: sag, renk: S.sicaklik }] });
      [...sat.g.querySelectorAll('text')].filter((t) => /°C$/.test(t.textContent)).forEach((t) => t.remove());
      gizle(sat.g);
      return sat;
    };
    const sat1 = satirKur(null, 'B', 'A');
    gizle(g1);

    await par(c.say('Yalıtılmış bir kutuda A ve B cisimleri var.'), belir(c, g1, 450));
    await par(c.say('Isı A’dan B’ye aktarılıyor; A daha sıcak.'), (async () => { await belir(c, isi.g, 500); await belir(c, sat1.g, 400); })());
    await par(c.say('A’nın ısı sığası B’ninkinden büyük.'), halkaBuyut(c, sat1, 1));
    await c.say('Isı sığası büyük olanın sıcaklığı daha az değişir.');
    await par(c.say('O hâlde denge sıcaklığı A’nın ilk sıcaklığına daha yakındır.'), sat1.denge(c, 80));

    // Birlikte çöz: K ve L.
    c.clearSay();
    await par(belir(c, isi.g, 300, 0), belir(c, sat1.g, 300, 0));
    sat1.g.remove();
    A.t.textContent = 'K'; B.t.textContent = 'L';
    const sat2 = satirKur(null, 'L', 'K');
    sat2.g.style.opacity = 0;
    halkaBuyut(c, sat2, 0);
    await par(belir(c, sat2.g, 400), belir(c, isi.g, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'K’den L’ye ısı aktarılıyor ve L’nin ısı sığası daha büyük. Denge sıcaklığı nerede?',
      options: ['K’nin ilk sıcaklığına yakın', 'L’nin ilk sıcaklığına yakın', 'İkisine eşit uzaklıkta'], answer: 1,
      hints: ['Isı sığası büyük olan hangisi ve onun sıcaklığı çok mu, az mı değişir?', '', 'Sıcaklığı az değişen kap, denge sıcaklığına kendi ilk sıcaklığına yakın bir değerde ulaşır.'],
      right: 'Evet. L’nin sıcaklığı az değişir.',
    });
    await par(c.say('Denge noktası L’nin ilk sıcaklığına yakın çıktı.'), sat2.denge(c, 26));
    // Anlatım 6–7: kütle ve öz ısı kartı.
    c.clearSay();
    const kart = c.S('g', {}, g1);
    kutu(c, kart, 200, 468, 600, 76, { rx: 14 });
    const kt = renkli(c, kart, 500, 518, [['kütle', S.kutle], ' iki kat → ısı sığası iki kat'], { size: 28, kalin: 700 });
    gizle(kart);
    await par(c.say('Kütle iki katına çıkarsa ısı sığası da iki katına çıkar.'), belir(c, kart, 400));
    await par(c.say('Öz ısı yarıya inerse ısı sığası da yarıya iner.'), (async () => {
      await belir(c, kart, 250, 0);
      parcaKoy(c, kt, [['öz ısı', S.soguk], ' yarı → ısı sığası yarı']);
      await belir(c, kart, 350);
    })());

    // Sor: yeni durum; figür ve sağda sıcaklık satırı.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const d = duzenek(c, svg, Object.assign({}, BASLA, { disSeviye: SEV[200], disIcerik: 'yag' }), '100 g su, c', '200 g zeytinyağı, c / 2');
    const sat3 = sicaklikSatiri(c, d.gf, { x: 570, y: 300, w: 370, min: 30, max: 60, uclar: [{ T: 30, ad: 'zeytinyağı', renk: S.sicaklik }, { T: 60, ad: 'su', renk: S.sicaklik }] });
    gizle(d.gf);
    await belir(c, d.gf, 400);
    await c.choice({
      tag: 'Sor', q: 'Erlenmayerde 100 g su 60 °C, beherde 200 g zeytinyağı 30 °C. Denge sıcaklığı nerede?',
      options: ['Zeytinyağının ilk sıcaklığına yakın', 'Suyun ilk sıcaklığına yakın', 'İki ilk sıcaklığın tam ortasında'], answer: 2,
      hints: ['Yağın kütlesi iki kat, öz ısısı yarı; ısı sığası için ikisi birlikte ne yapar?', 'Isı sığaları eşit olan kaplarda denge tam ortada çıkmıştı.', ''],
      right: 'Evet. Isı sığaları eşit; denge tam ortada.',
    });
    c.clearSay();
    await par(c.say('Sıcak su ile zeytinyağı dengeye geliyor.'), oyna(c, d, 45, { sat: sat3 }));
    await c.say('Kütle iki kat, öz ısı yarı; ısı sığaları eşit çıktı.');
    await c.say('Isı sığaları eşitse denge sıcaklığı tam ortada olur.');
    c.note('Son sıcaklık arada kalır; ısı sığası büyük olana yakın durur.', 'Isı sığası');
  }

  /* ---- 8. Soğuk su miktarını sen seç ---- */
  const G8 = [50, 100, 150, 200, 300, 400];
  const T8 = { 50: 50, 100: 45, 150: 42, 200: 40, 300: 37.5, 400: 36 };
  async function sec(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, BASLA, '100 g su', '100 g su');
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 530, 50, 440, 90, { rx: 14 });
    const kt = renkli(c, kart, 750, 106, ['Hedef: denge sıcaklığı ', ['40 °C', S.sicaklik]], { size: 28, kalin: 700 });
    const sat = sicaklikSatiri(c, svg, { x: 570, y: 300, w: 370, min: 30, max: 60, uclar: [{ T: 30, ad: 'soğuk', renk: S.sicaklik }, { T: 60, ad: 'sıcak', renk: S.sicaklik }] });
    const ip1 = yazi(c, svg, 750, 440, 'Soğuk suyu artırırsan', { size: 28, kalin: 600, renk: S.kutle });
    const ip2 = yazi(c, svg, 750, 480, 'denge sıcaklığı düşer.', { size: 28, kalin: 600, renk: S.kutle });
    gizle(d.gf, kart, sat.g, ip1, ip2);

    await par(c.say('Şimdi sıra sende: beherdeki soğuk suyun miktarını sen seç.'), belir(c, d.gf, 450));
    await c.say('Erlenmayerde hep 100 g su var, 60 °C.', { speak: 'Erlenmayerde hep yüz gram su var, altmış derece.' });
    await par(c.say('Beherdeki suyun sıcaklığı 30 °C.', { speak: 'Beherdeki suyun sıcaklığı otuz derece.' }), belir(c, sat.g, 400));
    await par(c.say('Denge sıcaklığı 40 °C olsun; miktarı bul.', { speak: 'Denge sıcaklığı kırk derece olsun; miktarı bul.' }), belir(c, kart, 400));

    // Kaydırıcı: yalnızca verisi olan konumlar (0–5 sıra numarası); bırakılınca deneme oynar, deneme sırasında kilitli.
    const iz = (T) => {
      const el = c.S('circle', { cx: sat.konum(T), cy: 300, r: 7, fill: RENK.koyu, stroke: RENK.gri, 'stroke-width': 3 }, sat.g);
      sat.g.insertBefore(el, sat.g.firstChild);
    };
    let simdiki = 1, istek = null, mesgul = false, hazir = false, yanlis = 0, buyuk = false, bulundu = false, sl = null;
    const dene = async (k) => {
      const g = G8[k], T = T8[g];
      sl && (sl.input.disabled = true);
      await sifirla(c, d, Object.assign({}, BASLA, { disSeviye: SEV[g] }), '100 g su', g + ' g su');
      await oyna(c, d, T, { oklar: false, sat });
      iz(T);
      simdiki = k;
      if (g >= 300) buyuk = true;
      if (T === 40) {
        bulundu = true;
        parcaKoy(c, kt, ['Hedef: denge sıcaklığı ', ['40 °C', RENK.iyi]]);
      } else if (++yanlis === 3 && !bulundu) {
        await par(belir(c, ip1, 400), belir(c, ip2, 400));
      }
      sl && (sl.input.disabled = false);
    };
    const dongu = async () => {
      if (mesgul) return;
      mesgul = true;
      try {
        while (istek != null) {
          await c.wait(500);
          const k = istek; istek = null;
          if (k !== simdiki) await dene(k);
        }
      } catch (_) { /* sahne değişti */ } finally { mesgul = false; }
    };
    c.say('Kaydırıcıyla soğuk su miktarını seç.', { noWait: true });
    sl = c.slider({
      label: 'soğuk su', min: 0, max: 5, step: 1, value: 1, fmt: (v) => G8[v] + ' g',
      onInput: (v) => { if (!hazir) return; istek = v; dongu(); },
    });
    hazir = true;
    await c.cont('Devam ›');
    while (mesgul) await c.wait(200);
    sl.remove(); c.clearSay();
    await par(c.say('Beherde 200 g su olunca denge sıcaklığı 40 °C çıkıyor.', { speak: 'Beherde iki yüz gram su olunca denge sıcaklığı kırk derece çıkıyor.' }),
      (async () => {
        if (simdiki !== 3) await dene(3);
        parcaKoy(c, kt, ['Hedef: denge sıcaklığı ', ['40 °C', RENK.iyi]]);
        await belir(c, [ip1, ip2], 300, 0);
      })());
    await c.say('Soğuk su çoğaldıkça denge sıcaklığı 30 °C’a yaklaşır, ama ulaşmaz.', { speak: 'Soğuk su çoğaldıkça denge sıcaklığı otuz dereceye yaklaşır, ama ulaşmaz.' });
  }

  Ders.start({
    id: 'enerji-d2', kicker: 'Konu D · Isıl denge', title: 'Son sıcaklık nerede durur?', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Son sıcaklık nerede durur?',
      hook: 'Bir bardak sıcak suya bir kaşık soğuk su katmakla bir bardak soğuk su katmak aynı sonucu verir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Son sıcaklığın iki ilk sıcaklığın arasında kaldığını söyler.', 'Kütlenin ve maddenin cinsinin son sıcaklığa etkisini deneyden çıkarır.', 'Son sıcaklığın ısı sığası büyük olanın ilk sıcaklığına yakın durduğunu söyler.', 'Isı sığaları eşitken son sıcaklığın tam ortada olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Isıl dengeyi ve ısı sığasını hatırla.', run: hatirla },
      { title: 'Üç deney, bir tablo', goal: 'Her deneyde yalnızca bir şeyin değiştiğini gör.', run: ucDeney },
      { title: 'Deney 1: kütle', goal: 'Kütlenin son sıcaklığa etkisini gör.', run: kutle },
      { title: 'Deney 2: maddenin cinsi', goal: 'Maddenin cinsinin son sıcaklığa etkisini gör.', run: madde },
      { title: 'Deney 3: ilk sıcaklık', goal: 'İlk sıcaklıkların son sıcaklığa etkisini gör.', run: ilkSicaklik },
      { title: 'Veriler ne diyor?', goal: 'Bütün sonuçları tek sıcaklık çizgisinde karşılaştır.', run: veriler },
      { title: 'Isı sığası belirler', goal: 'Son sıcaklığın yerini ısı sığasının belirlediğini gör.', run: sigaBelirler },
      { title: 'Soğuk su miktarını sen seç', goal: 'Hedef denge sıcaklığı için soğuk su miktarını bul.', run: sec },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yalıtılmış kapta 40 °C’taki 300 g su ile 80 °C’taki 100 g su karıştırılıyor. Denge sıcaklığı hangisine daha yakındır?',
        options: ['İkisinin tam ortasına', '40 °C’a; kütlesi büyük olan suyun ilk sıcaklığına', '80 °C’a; sıcak su ısı verdiği için'], answer: 1,
        why: ['Kütleler eşit olsaydı ortada olurdu; burada soğuk suyun kütlesi üç kat.', 'Kütlesi büyük olanın ısı sığası büyüktür; sıcaklığı az değişir, denge ona yakın durur.', 'Isı verdiği için değil, ısı sığası küçük olduğu için sıcak suyun sıcaklığı daha çok değişir.'], scene: 2 },
      { q: 'Aynı kütlede 80 °C’lık zeytinyağı ile 20 °C’lık su yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur?',
        options: ['80 °C’a daha yakındır; yağ daha sıcaktır', 'Tam ortasındadır', '20 °C’a daha yakındır; suyun ısı sığası büyüktür'], answer: 2,
        why: ['Daha sıcak olan sonucu belirlemez; ısı sığası belirler.', 'Öz ısıları farklı olduğundan ısı sığaları eşit değildir; denge ortada olmaz.', 'Aynı kütlede öz ısısı büyük olan suyun ısı sığası büyüktür; denge ona yakın durur.'], scene: 3 },
      { q: '70 °C’ta 50 g su ile 20 °C’ta 100 g zeytinyağı yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur?',
        options: ['İki ilk sıcaklığın tam ortasındadır; ısı sığaları eşittir', 'Zeytinyağının ilk sıcaklığına yakındır', 'Suyun ilk sıcaklığına yakındır'], answer: 0,
        why: ['Kütle iki kat, öz ısı yarı olduğundan ısı sığaları eşittir; denge tam ortada olur.', 'Yağın kütlesi büyük ama öz ısısı yarıdır; ısı sığası suyunkinden büyük değildir.', 'Suyun öz ısısı büyük ama kütlesi yarıdır; ısı sığası yağınkinden büyük değildir.'], scene: 6 },
      { q: '20 °C ve 80 °C’taki iki su ısıl dengeye geliyor. Son sıcaklık hangisi olamaz?',
        options: ['40 °C', '85 °C', '60 °C'], answer: 1,
        why: ['40 °C iki ilk sıcaklığın arasındadır; olabilir.', 'Son sıcaklık sıcak olanın üstüne çıkamaz; 85 °C, 80 °C’tan yüksektir.', '60 °C iki ilk sıcaklığın arasındadır; olabilir.'], scene: 5 },
      { q: 'Bir deneyde erlenmayerdeki sıcak suyun miktarı artırılıyor; ötekiler aynı. Denge sıcaklığı nasıl değişir?',
        options: ['Soğuk suyun ilk sıcaklığına yaklaşır', 'Hiç değişmez', 'Sıcak suyun ilk sıcaklığına yaklaşır'], answer: 2,
        why: ['Çoğalan sıcak su olduğundan denge soğuğa değil, sıcağa yaklaşır.', 'Sıcak suyun ısı sığası arttığından denge sıcaklığı değişir.', 'Sıcak suyun kütlesi artınca ısı sığası büyür; denge onun ilk sıcaklığına yaklaşır.'], scene: 2 },
    ],
    summary: ['Son sıcaklık, iki ilk sıcaklığın arasında kalır.', 'Isı sığaları eşitse denge tam ortadadır; değilse ısı sığası büyük olana yakındır.', '<b>Son sıcaklık arada kalır; ısı sığası büyük olana yakın durur.</b>'],
    nextLesson: { href: 'd3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
