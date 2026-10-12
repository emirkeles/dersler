/* A2 — İç enerji ısıyla değişir, sıcaklıkla izlenir
   İç enerji madde miktarıyla ve sıcaklıkla büyür; ısı alanın artar, verenin azalır.
   Senaryo: plan/fizik/enerji/senaryolar/A-ic-enerji-isi-sicaklik.md (A2). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Tanecik sayısı ve mor çubuk şematiktir: çubuk yalnızca sıralamayı gösterir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, belir, par, tablo } = window.KIT;
  const { motor, kap, pencere, termometre, cubuk, isiOku, tanim, titresim } = window.KIT_A;
  const { ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, ic: RENK.icEnerji, kutle: RENK.kutle };
  const etiket = (m, T) => [[m + ' g', S.kutle], ' · ', [T + ' °C', S.sicaklik]];
  const AYNI_ISI = 'Isı, sıcaklığı yüksek olandan düşük olana aktarılır.';

  /* ---- yerel yardımcılar ---- */
  /* Kap + altında, tam altında duran tanecik penceresi. o.bag: bağ çizgilerinin başladığı y. */
  function takim(c, p, mot, o) {
    const g = c.S('g', {}, p);
    const k = kap(c, g, { x: o.x, y: o.y, w: o.w, h: o.h, su: o.su, etiket: o.etiket, harf: o.harf });
    const pn = pencere(c, g, mot, { cx: k.cx, cy: o.cy, r: o.r, n: o.n, T: o.T, tohum: o.tohum, bag: [k.cx, o.bag] });
    return { g, k, pn };
  }
  /* Etiketi (ya da öğeyi) kısa süre büyütüp eski boyuna getirir: 1 → 1,15 → 1, 400 ms. */
  const olcek = (el, s) => { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'center'; el.style.transform = `scale(${s})`; };
  async function parla(c, ...els) {
    await c.tween(200, (e) => els.forEach((el) => olcek(el, 1 + 0.15 * e)), ease.out);
    await c.tween(200, (e) => els.forEach((el) => olcek(el, 1.15 - 0.15 * e)), ease.in);
  }
  /* Yukarı bakan, 22 birimlik küçük ısı oku (kitin oku bu boyda gövdeyi yutar). */
  function kisaOk(c, p, x) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [x, 372], [x, 362], S.isi, 5);
    c.S('path', { d: `M${x},350 L${x - 8},364 L${x + 8},364 Z`, fill: S.isi }, g);
    return g;
  }
  /* Düz çizilmiş el: parmak ucu y = hy, avucun sol kenarı x = hx. */
  function elCiz(c, p, hx, hy) {
    const g = c.S('g', {}, p), cl = '#e2b79b';
    for (let i = 0; i < 4; i++) c.S('rect', { x: hx + 4 + i * 26, y: hy, width: 22, height: 76, rx: 11, fill: cl }, g);
    c.S('rect', { x: hx, y: hy + 52, width: 110, height: 130, rx: 22, fill: cl }, g);
    c.S('rect', { x: hx + 98, y: hy + 100, width: 44, height: 26, rx: 13, fill: cl, transform: `rotate(-25 ${hx + 98} ${hy + 113})` }, g);
    return g;
  }
  /* Bardak ve ona değen el (sahne 1 ve 5). Bardak x 330–480, el x 482–592; ısı okunun yeri üst boşluktadır. */
  function bardakEl(c, p, o) {
    const k = kap(c, p, { x: 330, y: 150, su: 140, etiket: o.kapEtiket });
    const el = elCiz(c, p, 482, 128);
    const elEt = renkli(c, p, 537, 356, o.elEtiket, { size: 22, kalin: 600 });
    return { k, el, elEt };
  }
  const OK_BAS = [405, 98], OK_SON = [537, 98];

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    bardakEl(c, g1, { kapEtiket: ['sıcak çay'], elEtiket: ['el'] });
    gizle(g1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Sıcak çay bardağını tutan elde ısı hangi yönde aktarılır?',
      options: ['Elden çaya', 'Çaydan ele', 'İki yöne eşit'], answer: 1,
      hints: [AYNI_ISI, '', AYNI_ISI], right: 'Evet. ' + AYNI_ISI,
    });
    const ok = isiOku(c, g1, OK_BAS, OK_SON);
    await par(c.say('Isı, çaydan ele doğru aktarılıyor.'), belir(c, ok.g, 400));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 425, y: 100, su: 130 });
    pencere(c, g2, mot, { cx: 500, cy: 400, r: 100, n: 12, T: 20, bag: [500, 282] });
    const tn = tanim(c, g2, 56, 'iç enerji', S.ic, 'bütün taneciklerin toplam enerjisi');
    gizle(g2);
    await belir(c, g2, 400);
    const IC = 'İç enerji toplamdır: bütün taneciklerin enerjisi.';
    await c.choice({
      tag: 'Hatırla', q: 'İç enerji nedir?',
      options: ['Taneciklerin ne kadar hareketli olduğunun göstergesi', 'Bir cisimden ötekine aktarılan enerji', 'Bir maddedeki bütün taneciklerin toplam enerjisi'], answer: 2,
      hints: [IC, IC, ''], right: 'Evet. İç enerji, bütün taneciklerin toplam enerjisidir.',
    });
    await par(c.say('Pencerede görünen bütün taneciklerin enerjisi toplanır.'), belir(c, tn, 400));
    await c.say('Bugün iç enerjinin neye göre büyüyüp küçüldüğüne bakacağız.');
  }

  /* ---- 2. Aynı sıcaklık, farklı miktar ---- */
  async function ayniSicaklik(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const ort = { y: 100, cy: 420, r: 85, bag: 322 };
    const A = takim(c, svg, mot, Object.assign({ x: 170, su: 100, etiket: etiket(500, 20), n: 10, T: 20, tohum: 1 }, ort));
    const B = takim(c, svg, mot, Object.assign({ x: 680, su: 140, etiket: etiket(700, 20), n: 14, T: 20, tohum: 2 }, ort));
    const b1 = cubuk(c, svg, { x: 170, y: 524, etiket: 'iç enerji' }), b2 = cubuk(c, svg, { x: 680, y: 524 });
    const son = renkli(c, svg, 500, 60, [['madde miktarı', S.kutle], ' arttı → ', ['iç enerji', S.ic], ' arttı'], { size: 28, kalin: 700 });
    gizle(A.g, B.g, A.pn.g, B.pn.g, b1.g, b2.g, son);

    await par(c.say('Ela iki kaba su koyuyor; ikisi de 20 °C.', { speak: 'Ela iki kaba su koyuyor; ikisi de yirmi derece.' }), belir(c, [A.g, B.g], 450));
    await par(c.say('Sıcaklık aynı: tanecikler iki kapta da aynı hareketlilikte.'), belir(c, [A.pn.g, B.pn.g], 450));
    await par(c.say('Fark miktarda: birinde 500, ötekinde 700 gram su var.', { speak: 'Fark miktarda: birinde beş yüz, ötekinde yedi yüz gram su var.' }), parla(c, A.k.etiketEl, B.k.etiketEl));
    await c.say('Su çoğaldıkça toplanacak tanecik de çoğalır.');
    await par(c.say('O yüzden 700 gramlık suyun iç enerjisi daha büyüktür.', { speak: 'O yüzden yedi yüz gramlık suyun iç enerjisi daha büyüktür.' }),
      (async () => { gizle(b1.g, b2.g); await belir(c, [b1.g, b2.g], 200); await par(b1.git(c, 100, 700), b2.git(c, 140, 700)); })());
    await par(c.say('Sıcaklık aynıysa, miktarı fazla olanın iç enerjisi büyüktür.'), belir(c, son, 400));
  }

  /* ---- 3. Aynı miktar, farklı sıcaklık ---- */
  async function ayniMiktar(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const ort = { y: 100, cy: 420, r: 85, bag: 322 };
    const g1 = c.S('g', {}, svg);
    const A = takim(c, g1, mot, Object.assign({ x: 170, su: 140, etiket: etiket(700, 20), n: 14, T: 20, tohum: 1 }, ort));
    const B = takim(c, g1, mot, Object.assign({ x: 680, su: 140, etiket: etiket(700, 80), n: 14, T: 80, tohum: 2 }, ort));
    const b1 = cubuk(c, g1, { x: 170, y: 524, etiket: 'iç enerji' }), b2 = cubuk(c, g1, { x: 560, y: 524 });
    const son = renkli(c, g1, 500, 60, [['sıcaklık', S.sicaklik], ' arttı → ', ['iç enerji', S.ic], ' arttı'], { size: 28, kalin: 700 });
    gizle(g1, A.pn.g, B.pn.g, b1.g, b2.g, son);

    await par(c.say('Şimdi miktarı eşitleyelim: iki kapta da 700 gram su var.', { speak: 'Şimdi miktarı eşitleyelim: iki kapta da yedi yüz gram su var.' }), belir(c, g1, 450));
    await par(c.say('Tanecik sayısı aynı.'), belir(c, [A.pn.g, B.pn.g], 450));
    await par(c.say('Bu kez sıcaklık farklı: biri 20, öteki 80 °C.', { speak: 'Bu kez sıcaklık farklı: biri yirmi, öteki seksen derece.' }), parla(c, A.k.etiketEl, B.k.etiketEl));
    await c.say('Sıcak suda her tanecik daha çok hareket enerjisi taşır.');
    await par(c.say('Toplam da büyür: sıcak suyun iç enerjisi daha fazladır.'),
      (async () => { await belir(c, [b1.g, b2.g], 200); await par(b1.git(c, 140, 700), b2.git(c, 364, 700)); })());
    await par(c.say('Miktar aynıysa, sıcaklığı yüksek olanın iç enerjisi büyüktür.'), belir(c, son, 400));

    // Sor: yeni kaplar, çubuklar gizli.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const C = takim(c, g2, mot, Object.assign({ x: 170, su: 100, etiket: etiket(500, 20), n: 10, T: 20, tohum: 3 }, ort));
    const D = takim(c, g2, mot, Object.assign({ x: 680, su: 100, etiket: etiket(500, 10), n: 10, T: 10, tohum: 4 }, ort));
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Bu iki kaptan hangisindeki suyun iç enerjisi daha büyüktür?',
      options: ['10 °C’taki; soğuk su daha yoğundur', '20 °C’taki; miktar aynı, sıcaklığı yüksek', 'Eşittir; ikisi de 500 gram'], answer: 1,
      hints: ['Miktar aynı; taneciklerin hareketliliğine bak.', '', 'Kütle eşit olsa da tanecik başına enerji farklı: sıcaklıklar aynı değil.'],
      right: 'Evet. Miktar aynıysa sıcaklığı yüksek olanın iç enerjisi büyüktür.',
    });
    const c1 = cubuk(c, g2, { x: 170, y: 524, etiket: 'iç enerji' }), c2 = cubuk(c, g2, { x: 680, y: 524 });
    await par(c.say('Aynı miktarda suda sıcak olan daha çok iç enerji taşır.'), c1.git(c, 100, 700), c2.git(c, 60, 700));
  }

  /* ---- 4. Üç kabı sırala ---- */
  async function ucKap(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const XK = [130, 425, 720], HARF = ['K', 'L', 'M'], MK = [300, 300, 200], TK = [20, 60, 20];
    const t = XK.map((x, i) => takim(c, svg, mot, { x, y: 110, su: MK[i] * 0.2, etiket: etiket(MK[i], TK[i]), harf: HARF[i], n: MK[i] / 50, T: TK[i], tohum: i + 1, cy: 420, r: 65, bag: 330 }));
    const sira1 = yazi(c, svg, 330, 530, 'L > K', { size: 32, kalin: 700, renk: S.ic });
    const sira2 = yazi(c, svg, 670, 530, 'K > M', { size: 32, kalin: 700, renk: S.ic });
    const sira3 = yazi(c, svg, 500, 530, 'L > K > M', { size: 32, kalin: 700, renk: S.ic });
    gizle(...t.map((q) => q.g), sira1, sira2, sira3);

    await par(c.say('Ela’nın masasında bu kez üç kap var: K, L ve M.', { speak: 'Ela’nın masasında bu kez üç kap var: ke, le ve me.' }), belir(c, t.map((q) => q.g), 450));
    await c.say('Hepsinde su var; iç enerjilerini sıralayalım.');
    await par(c.say('Önce K ile L: miktarları aynı, 300 gram.', { speak: 'Önce ke ile le: miktarları aynı, üç yüz gram.' }), belir(c, t[2].g, 350, 0.35));
    await par(c.say('L daha sıcak; öyleyse L’nin iç enerjisi K’ninkinden büyük.', { speak: 'Le daha sıcak; öyleyse le’nin iç enerjisi ke’ninkinden büyük.' }), belir(c, sira1, 400));
    await par(c.say('Şimdi K ile M: sıcaklıkları aynı, 20 °C.', { speak: 'Şimdi ke ile me: sıcaklıkları aynı, yirmi derece.' }), par(belir(c, t[2].g, 350, 1), belir(c, t[1].g, 350, 0.35)));
    await par(c.say('K’de daha çok su var; K’nin iç enerjisi M’ninkinden büyük.', { speak: 'Ke’de daha çok su var; ke’nin iç enerjisi me’ninkinden büyük.' }), belir(c, sira2, 400));
    await par(c.say('Sıralama tamam: en büyük L, sonra K, sonra M.', { speak: 'Sıralama tamam: en büyük le, sonra ke, sonra me.' }),
      (async () => {
        await par(belir(c, t[1].g, 300, 1), belir(c, [sira1, sira2], 300, 0));
        sira1.remove(); sira2.remove();
        await belir(c, sira3, 400);
      })());
    await c.say('Her adımda yalnızca tek bir şeyin değiştiği çifti karşılaştırdık.');

    // Sor: yanılgı. K ve M kalır, L söner.
    c.clearSay();
    await belir(c, [t[1].g, sira3], 350, 0); t[1].g.remove(); sira3.remove();
    await c.choice({
      tag: 'Sor', q: 'K’de M’den daha çok su var. K’nin sıcaklığı için ne söylenir?',
      options: ['Daha yüksektir; suyu fazla olan daha sıcaktır', 'M ile aynıdır; ikisi de 20 °C', 'Daha düşüktür; ısı daha çok suya dağılır'], answer: 1,
      hints: ['Miktar iç enerjiyi büyütür; sıcaklığı termometre söyler. Etiketlere bak.', '', 'Suyun çok olması onu soğutmaz; iki kabın etiketi de 20 °C.'],
      right: 'Evet. İki kabın da sıcaklığı 20 °C.',
    });
    await par(c.say('Miktarı fazla olanın iç enerjisi büyüktür, sıcaklığı değil.'), parla(c, t[0].k.etiketEl, t[2].k.etiketEl));
  }

  /* ---- 5. Isı gelince iç enerji değişir ---- */
  async function isiGelince(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    c.S('rect', { x: 120, y: 380, width: 180, height: 40, rx: 6, fill: '#3a4260', stroke: RENK.ince, 'stroke-width': 2 }, g1);
    yazi(c, g1, 210, 448, 'ocak', { size: 22, kalin: 600, renk: RENK.soluk });
    kap(c, g1, { x: 135, y: 210, su: 120 });
    yazi(c, g1, 210, 192, '1 litre su', { size: 24, kalin: 600 });
    const tm = termometre(c, g1, { x: 185, y: 365, h: 110, T: 20 });
    const tz = yazi(c, g1, 185, 243, '20 °C', { size: 22, kalin: 700, renk: S.sicaklik });
    const pn = pencere(c, g1, mot, { cx: 750, cy: 240, r: 100, n: 20, T: 20, bag: [290, 300] });
    const cb = cubuk(c, g1, { x: 620, y: 480, boy: 120, etiket: 'iç enerji', hiza: 'ust' });
    const oklar = c.S('g', {}, g1);
    [222, 246, 270].forEach((x) => kisaOk(c, oklar, x));
    yazi(c, oklar, 312, 368, 'ısı', { hiza: 'start', size: 24, kalin: 700, renk: S.isi });
    gizle(g1, oklar);

    await par(c.say('Ela bir litre suyu ocağa koyuyor; su 20 °C.', { speak: 'Ela bir litre suyu ocağa koyuyor; su yirmi derece.' }), belir(c, g1, 450));
    await c.say('Ocak sudan çok daha sıcak.');
    await par(c.say('Öyleyse ocaktan suya ısı aktarılır.'), belir(c, oklar, 400));
    const anim = c.tween(3000, (e) => {
      const T = 20 + 40 * e;
      tm.kur(T); pn.kur(T); cb.boy(120 + 80 * e);
    }, ease.linear);
    await c.say('Isı alan suyun tanecikleri hızlanıyor.');
    await c.say('Tanecikler hızlanınca suyun iç enerjisi artıyor.');
    await c.say('Termometre de yükseliyor: su 60 °C oldu.', { speak: 'Termometre de yükseliyor: su altmış derece oldu.' });
    await anim;
    tz.textContent = '60 °C';
    await par(c.say('Kural şu: ısı alan maddenin iç enerjisi artar.'), belir(c, oklar, 400, 0));

    // İkinci durum: sıcak su ve el.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const bd = bardakEl(c, g2, { kapEtiket: [['60 °C', S.sicaklik]], elEtiket: [['33 °C', S.sicaklik]] });
    const e1 = cubuk(c, g2, { x: 330, y: 450, boy: 170, etiket: 'iç enerji', hiza: 'ust' }), e2 = cubuk(c, g2, { x: 520, y: 450, boy: 100 });
    const ok = isiOku(c, g2, OK_BAS, OK_SON);
    gizle(g2);
    await par(c.say('Ela bu sudan bir bardak doldurup avucuna alıyor.'), belir(c, g2, 450));
    await par(c.say('Şimdi ısı sudan ele aktarılıyor.'), belir(c, ok.g, 400));
    await c.choice({
      tag: 'Sor', q: 'Isı veren sudaki iç enerji nasıl değişir?',
      options: ['Artar; su hâlâ elden sıcaktır', 'Değişmez; ısı yalnızca eli etkiler', 'Azalır; enerjinin bir bölümü ele aktarılır'], answer: 2,
      hints: ['Su daha sıcak olabilir ama enerji veriyor; veren tarafın toplamı ne olur?', 'Aktarılan enerji bir yerden gelir: sudaki toplamdan.', ''],
      right: 'Evet. Isı veren suyun iç enerjisi azalır.',
    });
    await par(c.say('Suyun iç enerjisi azaldı, elinki arttı.'),
      c.tween(1200, (e) => { e1.boy(170 - 20 * e); e2.boy(100 + 20 * e); }, ease.inOut));
    await c.say('Isı veren maddenin iç enerjisi azalır, alanınki artar.');
    await c.say('Geçen dersteki tahminin cevabı da bu: elin iç enerjisi arttı.');
    c.note('Isı alan maddenin iç enerjisi artar, ısı verenin azalır.', 'Isı ve iç enerji');
  }

  /* ---- 6. Genelle: sınıflama tablosu ---- */
  async function genelle(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const tb = tablo(c, svg, { x: 110, y: 80, satir: 4, h: 58, size: 22, sutunlar: [{ ad: 'Durum', w: 280 }, { ad: 'Değişen', w: 260 }, { ad: 'İç enerji', w: 240, renk: S.ic }] });
    tb.yaz(0, 0, 'miktar fazla'); tb.yaz(0, 1, 'madde miktarı', S.kutle); tb.yaz(0, 2, 'büyük', S.ic);
    tb.yaz(1, 0, 'sıcaklık yüksek'); tb.yaz(1, 1, 'sıcaklık', S.sicaklik); tb.yaz(1, 2, 'büyük', S.ic);
    tb.yaz(2, 0, 'ısı aldı'); tb.yaz(2, 1, 'ısı', S.isi); tb.yaz(2, 2, '?', RENK.soluk);
    tb.yaz(3, 0, 'ısı verdi'); tb.yaz(3, 1, 'ısı', S.isi); tb.yaz(3, 2, '?', RENK.soluk);
    gizle(tb.g);

    await par(c.say('Gördüklerimizi tek tabloda toplayalım.'), belir(c, tb.g, 400));
    await par(c.say('Miktar fazlaysa iç enerji büyük; ilk satır bunu söylüyor.'), tb.goster(0));
    await par(c.say('Sıcaklık yüksekse iç enerji yine büyük; bu da ikinci satır.'), tb.goster(1));

    c.clearSay();
    await tb.goster(2); tb.vurgula(2, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü satır: madde ısı aldı. İç enerjisi için ne yazılır?',
      options: ['artar', 'azalır', 'değişmez'], answer: 0,
      hints: ['', 'Isı aktarılan enerjidir; alan tarafın toplamı ne olur?', 'Isı aktarılan enerjidir; alan tarafın toplamı ne olur?'],
      right: 'Evet. Isı alan maddenin iç enerjisi artar.',
    });
    tb.yaz(2, 2, 'artar', S.ic); tb.vurgula(2, false);
    await c.say('Isı alan maddenin iç enerjisi artar.');

    c.clearSay();
    await tb.goster(3); tb.vurgula(3, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Dördüncü satır: madde ısı verdi. İç enerjisi için ne yazılır?',
      options: ['değişmez', 'azalır', 'artar'], answer: 1,
      hints: ['Enerji veren tarafın toplamı küçülür.', '', 'Enerji veren tarafın toplamı küçülür.'],
      right: 'Evet. Isı veren maddenin iç enerjisi azalır.',
    });
    tb.yaz(3, 2, 'azalır', S.ic); tb.vurgula(3, false);
    await c.say('Isı veren maddenin iç enerjisi azalır.');

    // Fincan ve küvet.
    c.clearSay();
    await belir(c, tb.g, 400, 0); tb.g.remove();
    const g2 = c.S('g', {}, svg);
    const F = takim(c, g2, mot, { x: 150, y: 100, w: 130, h: 110, su: 80, etiket: ['sıcak çay · ', ['80 °C', S.sicaklik]], n: 3, T: 80, tohum: 1, cy: 400, r: 95, bag: 262 });
    const K = takim(c, g2, mot, { x: 450, y: 100, w: 400, h: 110, su: 90, etiket: ['ılık su · ', ['33 °C', S.sicaklik]], n: 40, T: 33, tohum: 2, cy: 395, r: 110, bag: 262 });
    gizle(g2);
    await par(c.say('Şimdi baştaki soruya dönelim: fincan mı, küvet mi?'), belir(c, g2, 450));
    await c.say('Çayın tanecikleri daha hareketli; çay daha sıcak.');
    await c.say('Ama küvetteki su, fincandakinin yüzlerce katıdır.');
    const b1 = cubuk(c, g2, { x: 150, y: 530, etiket: 'iç enerji' }), b2 = cubuk(c, g2, { x: 450, y: 530 });
    await par(c.say('Toplanınca küvetin iç enerjisi çok daha büyük çıkar.'), b1.git(c, 30, 700), b2.git(c, 300, 700));
    await c.say('Sıcaklığı yüksek olanın iç enerjisi her zaman büyük değildir.');
    c.note('Aynı madde için: miktar ve sıcaklık arttıkça iç enerji büyür.', 'İç enerji neye bağlı?');
  }

  /* ---- 7. Dene: miktar ve sıcaklık ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const MS = [200, 400, 600, 800], TS = [10, 20, 40, 60, 80];
    const k = kap(c, svg, { x: 425, y: 90, su: 80 });
    const tm = termometre(c, svg, { x: 500, y: 250, h: 110, T: 20, deger: true });
    const pn = pencere(c, svg, mot, { cx: 500, cy: 400, r: 100, n: 8, T: 20, bag: [500, 272] });
    const cb = cubuk(c, svg, { x: 680, y: 300, etiket: 'iç enerji', hiza: 'ust' });
    let mi = 1, ti = 1;
    const cubukGuncelle = () => cb.boy((MS[mi] / 50) * titresim(TS[ti]).genlik * 1.3);
    const miktar = (i) => { mi = i; k.suKoy(MS[i] * 0.2); pn.say(MS[i] / 50); cubukGuncelle(); };
    const sicak = (i) => { ti = i; tm.kur(TS[i]); pn.kur(TS[i]); cubukGuncelle(); };

    c.say('Su miktarını ve sıcaklığı değiştir; mor çubuğu izle.', { noWait: true });
    const s1 = c.slider({ label: 'Su miktarı', min: 200, max: 800, step: 200, value: 400, fmt: (v) => v + ' g', onInput: (v) => miktar(+v / 200 - 1) });
    const s2 = c.slider({ label: 'Sıcaklık', min: 0, max: 4, step: 1, value: 1, fmt: (v) => TS[+v] + ' °C', onInput: (v) => sicak(+v) });
    await c.cont('Devam ›');
    s1.remove(); s2.remove(); c.clearSay();

    await par(c.say('Miktarı artırınca tanecik çoğaldı; iç enerji büyüdü.'), (async () => {
      sicak(1);
      for (let i = 0; i < 4; i++) { miktar(i); await c.wait(550); }
    })());
    await par(c.say('Sıcaklığı artırınca tanecikler hızlandı; iç enerji yine büyüdü.'), (async () => {
      miktar(1);
      for (let i = 0; i < 5; i++) { sicak(i); await c.wait(500); }
    })());
    await c.say('Isı alan maddenin iç enerjisi artar; iç enerji sıcaklığa ve miktara bağlıdır.');
  }

  Ders.start({
    id: 'enerji-a2', kicker: 'Konu A · İç enerji, ısı, sıcaklık', title: 'İç enerji ısıyla değişir, sıcaklıkla izlenir', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'İç enerji ısıyla değişir, sıcaklıkla izlenir',
      hook: 'Bir fincan sıcak çay mı, yoksa ılık suyla dolu bir küvet mi daha çok iç enerji taşır?',
      button: 'Derse başla ›',
    },
    goals: ['Aynı sıcaklıkta miktarı fazla olanın iç enerjisinin büyük olduğunu açıklar.', 'Aynı miktarda sıcaklığı yüksek olanın iç enerjisinin büyük olduğunu açıklar.', 'Isı alan maddenin iç enerjisinin arttığını, verenin azaldığını söyler.', 'İç enerjinin madde miktarına ve sıcaklığa bağlı olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Isının yönünü ve iç enerjinin ne olduğunu hatırla.', run: hatirla },
      { title: 'Aynı sıcaklık, farklı miktar', goal: 'Sıcaklık aynıyken miktarın iç enerjiyi nasıl etkilediğini gör.', run: ayniSicaklik },
      { title: 'Aynı miktar, farklı sıcaklık', goal: 'Miktar aynıyken sıcaklığın iç enerjiyi nasıl etkilediğini gör.', run: ayniMiktar },
      { title: 'Üç kabı sırala', goal: 'Her adımda tek bir şeyi değiştirerek üç kabı sırala.', run: ucKap },
      { title: 'Isı gelince iç enerji değişir', goal: 'Isı alanın iç enerjisinin arttığını, verenin azaldığını gör.', run: isiGelince },
      { title: 'Genelle: sınıflama tablosu', goal: 'Gördüklerini tabloda topla; sıcaklığın tek başına yetmediğini gör.', run: genelle },
      { title: 'Dene: miktar ve sıcaklık', goal: 'Miktarı ve sıcaklığı değiştirip iç enerjiyi izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Aynı sıcaklıkta bir çay kaşığı çorba ile bir tencere çorba var. Hangisi doğrudur?',
        options: ['Sıcaklıkları aynı olduğu için iç enerjileri eşittir', 'Kaşıktaki çorba daha çabuk soğuduğu için iç enerjisi büyüktür', 'Tenceredeki çorbanın iç enerjisi daha büyüktür'], answer: 2,
        why: ['Sıcaklık aynıdır ama tencerede çok daha fazla tanecik vardır; toplam enerji farklıdır.', 'Çabuk soğuması iç enerjinin büyük olduğunu göstermez; kaşıkta tanecik azdır.', 'Sıcaklık aynıysa, miktarı fazla olanın iç enerjisi büyüktür.'], scene: 1 },
      { q: 'Aynı odada duran aynı cins iki demir bilyeden büyüğü için ne söylenir?',
        options: ['İç enerjisi daha büyüktür, sıcaklığı küçüğününkiyle aynıdır', 'Hem sıcaklığı hem iç enerjisi daha büyüktür', 'Sıcaklığı daha büyüktür, iç enerjisi aynıdır'], answer: 0,
        why: ['Aynı odadaki bilyelerin sıcaklığı eşittir; büyük bilyede tanecik çok olduğu için iç enerji büyüktür.', 'Aynı odadaki bilyelerin sıcaklığı eşittir; boyut sıcaklığı değiştirmez.', 'Sıcaklık aynıdır; iç enerji ise tanecik sayısı fazla olan büyük bilyede daha büyüktür.'], scene: 3 },
      { q: 'Sıcak çorbaya soğuk bir kaşık daldırılıyor. İç enerjiler nasıl değişir?',
        options: ['İkisininki de artar', 'Kaşığınki artar, çorbanınki azalır', 'Kaşığınki artar, çorbanınki değişmez'], answer: 1,
        why: ['Enerjiyi veren çorbanın iç enerjisi artmaz; azalır.', 'Isı alan kaşığın iç enerjisi artar, ısı veren çorbanınki azalır.', 'Isı veren çorbanın iç enerjisi de değişir; azalır.'], scene: 4 },
      { q: 'İki bardakta eşit miktarda su var; biri 15 °C, öteki 45 °C. Hangisi doğrudur?',
        options: ['15 °C’taki suyun iç enerjisi daha büyüktür', 'Miktarlar eşit olduğu için iç enerjiler eşittir', '45 °C’taki suyun iç enerjisi daha büyüktür'], answer: 2,
        why: ['Soğuk suyun tanecikleri daha az hareketlidir; iç enerjisi daha küçüktür.', 'Miktar eşit olsa da sıcaklık farklıdır; sıcak suyun iç enerjisi daha büyüktür.', 'Miktar aynıysa, sıcaklığı yüksek olanın iç enerjisi büyüktür.'], scene: 2 },
      { q: '“Sıcaklığı yüksek olan cismin iç enerjisi her zaman daha büyüktür.” Bu cümle için ne söylenir?',
        options: ['Yanlıştır; iç enerji madde miktarına da bağlıdır', 'Doğrudur; sıcaklık iç enerjinin ölçüsüdür', 'Doğrudur; sıcak cisim her zaman daha çok ısı içerir'], answer: 0,
        why: ['Fincan ve küvet örneğinde gördüğün gibi, ılık ama bol su daha büyük iç enerji taşıyabilir.', 'Sıcaklık tanecik başına hareketi gösterir; toplam, tanecik sayısına da bağlıdır.', 'Bir madde ısı içermez; ısı aktarılan enerjidir.'], scene: 5 },
    ],
    summary: ['İç enerji, madde miktarı ve sıcaklık arttıkça büyür.', 'Isı veren maddenin iç enerjisi azalır; sıcaklığı yüksek olanın iç enerjisi her zaman büyük değildir.', '<b>Isı alan maddenin iç enerjisi artar; iç enerji sıcaklığa ve madde miktarına bağlıdır.</b>'],
    nextLesson: { href: 'a3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
