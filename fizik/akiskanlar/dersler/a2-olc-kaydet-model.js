/* A2 — Ölç, kaydet, modele ulaş
   Kuvvet, yüzey alanı ve basınç ölçülüp tabloya kaydedilince basıncın modeli çıkar: P = F / A.
   Senaryo: plan/fizik/akiskanlar/senaryolar/A-basinc.md (A2). Sayılar P = F / A ile hesaplanmış örnek veridir.
   Basınçölçer ilk kez bu derste kullanılır (KIT_A.basincOlcer). Tuğla blokları bu dosyada çizilir:
   iki tuğlanın dikilip yatırılması dikdörtgenin boyutunu değiştirerek (dik ↔ yatık) gösterilir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, koy, gizle, belir, par, ok, tablo } = window.KIT;
  const { TUGLA, kumKabi, tugla, yigin, batir, basincOlcer } = window.KIT_A;
  const { lerp, ease } = Ders;
  const ZEMIN = '#10162b';

  /* ---- ortak düzenek: basınçölçer, tuğla blokları, ok, etiketler, tablo ---- */
  const CX = 245;                                   // düzeneğin ortası
  const TABLO_X = 430, TABLO_Y = 120, TABLO_H = 46;
  const SUTUN = [
    { ad: 'Kuvvet (N)', w: 140, renk: RENK.kuvvet },
    { ad: 'Yüzey alanı (m²)', w: 200, renk: RENK.alan },
    { ad: 'Basınç (Pa)', w: 150, renk: RENK.basinc },
  ];
  const TABLO_W = SUTUN.reduce((s, k) => s + k.w, 0);
  const TEMAS = { dik: 70, yatik: 140, yan: 280 };  // kuma değen yüzün genişliği (0,01 / 0,02 / 0,04 m²)

  /* n tuğlanın dizilişi: her biri [x, y, w, h]. 'yatik' ve 'dik' üst üste, 'yan' iki sütun yan yana. */
  function dizilis(n, tur, LY) {
    const r = [];
    if (tur === 'yatik') for (let i = 0; i < n; i++) r.push([CX - 70, LY - 70 * (i + 1), 140, 70]);
    else if (tur === 'dik') for (let i = 0; i < n; i++) r.push([CX - 35, LY - 140 * (i + 1), 70, 140]);
    else if (n === 1) r.push([CX - 70, LY - 70, 140, 70]);
    else {
      r.push([CX - 140, LY - 70, 140, 70], [CX, LY - 70, 140, 70]);
      if (n === 3) r.push([CX - 140, LY - 140, 140, 70]);
    }
    return r;
  }
  /* Boyutu tween ile değişebilen tuğla. */
  function blok(c, p, x, y, w, h) {
    const el = c.S('rect', { rx: 5, fill: TUGLA.dolgu, stroke: TUGLA.kenar, 'stroke-width': 2.5 }, p);
    const b = {
      el, x, y, w, h,
      koy(X, Y, W, H) {
        b.x = X; b.y = Y; b.w = W; b.h = H;
        el.setAttribute('x', X); el.setAttribute('y', Y); el.setAttribute('width', W); el.setAttribute('height', H);
      },
    };
    b.koy(x, y, w, h);
    return b;
  }
  const git = (c, b, hedef, ms = 700) => {
    const s = [b.x, b.y, b.w, b.h];
    return c.tween(ms, (e) => b.koy(...hedef.map((v, k) => lerp(s[k], v, e))), ease.inOut);
  };

  /* Basınçölçer + tuğlalar + (isteğe bağlı) kuvvet oku, kuvvet ve yüzey etiketleri.
     d.diz(n, tur) tuğlaları hemen dizer; d.gecis(n, tur, ms) aynı tuğlaları yeni düzene taşır.
     o: { y: levha yüksekliği, yalin: ok ve etiketsiz }. */
  function duzenek(c, svg, o = {}) {
    const LY = o.y || 400;
    const olcer = basincOlcer(c, svg, { x1: 90, x2: 400, y: LY });
    const tg = c.S('g', {}, svg), bl = [];
    const temas = cizgi(c, svg, [CX - 70, LY], [CX + 70, LY], RENK.alan, 7);
    const okk = o.yalin ? null : ok(c, svg, [CX, 240], [CX, 318], RENK.kuvvet, 6);
    const etiket = o.yalin ? null : yazi(c, svg, CX + 18, 290, '', { hiza: 'start', size: 24, kalin: 600, renk: RENK.kuvvet });
    const alan = o.yalin ? null : yazi(c, svg, CX, 538, '', { size: 24, kalin: 600, renk: RENK.alan });
    const d = { olcer, tg, bl, temas, ok: okk, etiket, alan, tw: 140, LY };
    d.guncelle = () => {
      koy(temas, [CX - d.tw / 2, LY], [CX + d.tw / 2, LY]);
      if (!okk || !bl.length) return;
      const tip = Math.min(...bl.map((b) => b.y)) - 12, kuyruk = tip - 80;
      okk.ciz([CX, kuyruk], [CX, tip]);
      etiket.setAttribute('x', CX + 18); etiket.setAttribute('y', (tip + kuyruk) / 2 + 8);
    };
    d.diz = (n, tur) => {
      tg.textContent = ''; bl.length = 0;
      dizilis(n, tur, LY).forEach((r) => bl.push(blok(c, tg, ...r)));
      d.tw = TEMAS[tur]; d.guncelle();
    };
    d.gecis = (n, tur, ms = 800) => {
      const hedef = dizilis(n, tur, LY), bas = bl.map((b) => [b.x, b.y, b.w, b.h]), tw0 = d.tw, tw1 = TEMAS[tur];
      return c.tween(ms, (e) => {
        bl.forEach((b, i) => b.koy(...hedef[i].map((v, k) => lerp(bas[i][k], v, e))));
        d.tw = lerp(tw0, tw1, e); d.guncelle();
      }, ease.inOut);
    };
    return d;
  }

  const tab = (c, p, satir, o = {}) => tablo(c, p, { x: o.x == null ? TABLO_X : o.x, y: o.y == null ? TABLO_Y : o.y, satir, h: TABLO_H, size: 20, sutunlar: SUTUN });
  const satirYaz = (t, i, f, a, pb) => { t.yaz(i, 0, f, RENK.kuvvet); t.yaz(i, 1, a, RENK.alan); t.yaz(i, 2, pb, RENK.basinc); };
  const hemen = (t, i) => { t.satirlar[i].g.style.opacity = 1; };
  /* Basınç sütununun sağında, satırın hizasında "× 2" gibi bir işaret. */
  const isaret = (c, p, i, metin) => yazi(c, p, TABLO_X + TABLO_W + 10, TABLO_Y + TABLO_H * (i + 1) + TABLO_H / 2 + 8, metin, { hiza: 'start', size: 24, kalin: 700, renk: RENK.basinc });

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const sahne = c.S('g', {}, svg);
    const kum = kumKabi(c, sahne), Y = kum.y;
    const ckA = kum.cukur(250, 140), ckB = kum.cukur(610, 70);
    const a = yigin(c, sahne, 0), b = yigin(c, sahne, 0);
    tugla(c, a.g, 250, Y, {}); tugla(c, b.g, 610, Y, { dik: true });
    gizle(sahne);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, sahne, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Özdeş iki tuğladan biri yatık, biri dik kuma konuyor. Hangisi daha derine batar?',
      options: ['Yatık duran', 'İkisi aynı derinliğe batar', 'Dik duran'], answer: 2,
      hints: ['Kuvvet aynıyken yüzey alanı küçülürse basınç artar.', 'Kuvvet aynıyken yüzey alanı küçülürse basınç artar.', ''],
      right: 'Evet. Dar yüzeyde basınç daha büyük.',
    });
    c.clearSay();
    await par(c.say('Dik duran tuğla daha derine battı.'), par(batir(c, a, ckA, 14), batir(c, b, ckB, 28)));
    c.clearSay();
    await belir(c, sahne, 400, 0); sahne.remove();
    await c.choice({
      tag: 'Hatırla', q: 'Basınç hangi iki şeye bağlıdır?',
      options: ['Yalnızca kuvvete', 'Kuvvete ve yüzey alanına', 'Cismin yüksekliğine ve biçimine'], answer: 1,
      hints: ['Basınç, kuvvete ve kuvvetin yayıldığı yüzey alanına bağlıdır.', '', 'Basınç, kuvvete ve kuvvetin yayıldığı yüzey alanına bağlıdır.'],
      right: 'Evet. Kuvvet ve yüzey alanı.',
    });
    c.clearSay();
    const iki = renkli(c, svg, 500, 292, [['kuvvet', RENK.kuvvet], ' + ', ['yüzey alanı', RENK.alan], ' → ', ['basınç', RENK.basinc]], { size: 44, kalin: 700 });
    gizle(iki);
    await par(c.say('Bugün bu iki etmeni ölçüp sayıya dökeceğiz.'), belir(c, iki, 450));
  }

  /* ---- 2. Ölçüm düzeneği ---- */
  async function duzenekSahnesi(c) {
    const svg = c.svg(1000, 562);
    const kum = kumKabi(c, svg, { x1: 90, x2: 400, y: 400, dip: 500 });
    kum.cukur(110, 140).derinlik(14); kum.cukur(290, 70).derinlik(28);
    const d = duzenek(c, svg); d.diz(1, 'yatik');
    const t = tab(c, svg, 3);
    gizle(kum.g, d.olcer.g, d.tg, d.temas, d.ok.g, d.etiket, d.alan, t.g);
    d.olcer.goster('');

    await par(c.say('Kumdaki çukur basıncı karşılaştırır ama sayı vermez.', { speak: '[thoughtful] Kumdaki çukur basıncı karşılaştırır ama sayı vermez.' }), belir(c, kum.g, 450));
    await par(c.say('Ela tuğlayı bu kez bir basınçölçerin üstüne koyuyor.'), (async () => {
      await belir(c, kum.g, 300, 0); kum.g.remove();
      await belir(c, [d.olcer.g, d.tg], 400);
    })());
    d.etiket.textContent = 'N'; d.alan.textContent = 'm²';
    await par(c.say('Kuvvetin birimi newton, yüzey alanının birimi metrekaredir.'), belir(c, [d.ok.g, d.etiket, d.temas, d.alan], 400));
    d.olcer.goster('Pa');
    await c.say('Basıncın birimi pascaldır; kısaca Pa yazılır.', { speak: 'Basıncın birimi pascaldır; kısaca pe a yazılır.' });
    d.etiket.textContent = '20 N'; d.alan.textContent = '0,02 m²';
    await c.say('Tuğlanın ağırlığı 20 newton; geniş yüzünün alanı 0,02 metrekare.', { speak: 'Tuğlanın ağırlığı yirmi newton; geniş yüzünün alanı sıfır virgül sıfır iki metrekare.' });
    d.olcer.goster(0);
    await par(c.say('Basınçölçer 1.000 pascal gösteriyor.', { speak: 'Basınçölçer bin pascal gösteriyor.' }), d.olcer.say(1000, 600));
    satirYaz(t, 0, '20', '0,02', '1.000');
    await par(c.say('Ölçümü tabloya kaydediyoruz: kuvvet, yüzey alanı, basınç.'), (async () => { await belir(c, t.g, 350); await t.goster(0); })());
  }

  /* ---- 3. Kuvveti değiştir ---- */
  async function kuvvetiDegistir(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg); d.diz(1, 'yatik');
    d.etiket.textContent = '20 N'; d.alan.textContent = '0,02 m²'; d.olcer.goster(1000);
    const t = tab(c, svg, 3);
    satirYaz(t, 0, '20', '0,02', '1.000'); hemen(t, 0);
    const m2 = isaret(c, svg, 1, '× 2'), m3 = isaret(c, svg, 2, '× 3');
    gizle(m2, m3);
    /* Yeni tuğla yukarıdan iner; ok ve etiket inerken söner. */
    const indir = async (hedefY) => {
      await belir(c, [d.ok.g, d.etiket], 200, 0);
      const b = blok(c, d.tg, CX - 70, hedefY - 150, 140, 70); d.bl.push(b);
      await git(c, b, [CX - 70, hedefY, 140, 70], 700);
      d.guncelle();
    };

    await par(c.say('Yüzey alanını sabit tutup üstüne ikinci tuğlayı koyuyoruz.'), indir(260));
    d.etiket.textContent = '40 N';
    await par(c.say('Kuvvet 40 newton oldu; basınçölçer 2.000 pascal gösteriyor.', { speak: 'Kuvvet kırk newton oldu; basınçölçer iki bin pascal gösteriyor.' }), (async () => {
      satirYaz(t, 1, '40', '0,02', '2.000');
      await par(belir(c, [d.ok.g, d.etiket], 300), d.olcer.say(2000, 600));
      await t.goster(1);
    })());
    await par(c.say('Kuvvet iki katına çıktı; basınç da iki katına çıktı.'), belir(c, m2, 350));

    // Birlikte çöz: üçüncü tuğla.
    c.clearSay();
    await indir(190);
    d.etiket.textContent = '60 N'; d.olcer.goster('?');
    satirYaz(t, 2, '60', '0,02', '?');
    await par(belir(c, [d.ok.g, d.etiket], 300), t.goster(2));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü tuğla da konuyor: kuvvet 60 N, yüzey alanı yine 0,02 m². Üçüncü satırı sen tamamla: basınçölçer kaç pascal gösterir?',
      options: ['2.500 Pa', '3.000 Pa', '4.000 Pa'], answer: 1,
      hints: ['Her tuğla basıncı aynı miktarda artırıyor: 1.000 Pa.', '', 'Kuvvet ilk ölçümün üç katı; basınç da öyle olmalı.'],
      right: 'Evet. 60 ÷ 0,02 = 3.000.',
    });
    c.clearSay();
    t.yaz(2, 2, '3.000', RENK.basinc);
    await par(c.say('Kuvvet üç katına çıkınca basınç da üç katına çıktı.'), par(d.olcer.say(3000, 600), belir(c, m3, 350)));
    await c.say('Yüzey alanı sabitken basınç, kuvvetle doğru orantılıdır.');
  }

  /* ---- 4. Yüzey alanını değiştir ---- */
  async function yuzeyiDegistir(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg); d.diz(2, 'yatik');
    d.etiket.textContent = '40 N'; d.alan.textContent = '0,02 m²'; d.olcer.goster('');
    const t = tab(c, svg, 3);
    const m2 = isaret(c, svg, 1, '× 2'), mb = isaret(c, svg, 2, '÷ 2');
    gizle(d.olcer.g, d.tg, d.temas, d.ok.g, d.etiket, d.alan, t.g, m2, mb);

    await par(c.say('Şimdi kuvveti sabit tutalım: hep iki tuğla, 40 newton.', { speak: 'Şimdi kuvveti sabit tutalım: hep iki tuğla, kırk newton.' }), belir(c, [d.olcer.g, d.tg, d.ok.g, d.etiket, t.g], 450));
    satirYaz(t, 0, '40', '0,02', '2.000');
    d.olcer.goster(0);
    await par(c.say('Tuğlalar yatık ve üst üste: 0,02 metrekare, 2.000 pascal.', { speak: 'Tuğlalar yatık ve üst üste: sıfır virgül sıfır iki metrekare, iki bin pascal.' }), (async () => {
      await par(belir(c, [d.temas, d.alan], 350), d.olcer.say(2000, 600));
      await t.goster(0);
    })());
    d.alan.textContent = '0,01 m²'; d.olcer.goster('?');
    satirYaz(t, 1, '40', '0,01', '?');
    await par(c.say('Tuğlaları dikip üst üste koyuyoruz: yüzey alanı 0,01 metrekare.', { speak: 'Tuğlaları dikip üst üste koyuyoruz: yüzey alanı sıfır virgül sıfır bir metrekare.' }), par(d.gecis(2, 'dik', 800), t.goster(1)));
    t.yaz(1, 2, '4.000', RENK.basinc);
    await par(c.say('Basınçölçer 4.000 pascal gösteriyor.', { speak: 'Basınçölçer dört bin pascal gösteriyor.' }), d.olcer.say(4000, 600));
    await par(c.say('Yüzey alanı yarıya indi; basınç iki katına çıktı.'), belir(c, m2, 350));

    // Sıra sende: iki tuğla yatık, yan yana.
    c.clearSay();
    d.alan.textContent = '0,04 m²'; d.olcer.goster('?');
    satirYaz(t, 2, '40', '0,04', '?');
    await par(d.gecis(2, 'yan', 800), t.goster(2));
    await c.choice({
      tag: 'Sıra sende', q: 'Ela iki tuğlayı yatırıp yan yana koyuyor: yüzey alanı 0,04 m², kuvvet yine 40 N. Basınçölçer ne gösterir?',
      options: ['4.000 Pa', '1.000 Pa', '2.000 Pa'], answer: 1,
      hints: ['Yüzey büyüdü: aynı kuvvet daha geniş alana yayılıyor, basınç artamaz.', '', 'Yüzey alanı 0,02’den 0,04’e çıktı; basınç aynı kalmaz.'],
      right: 'Evet. 40 ÷ 0,04 = 1.000.',
    });
    c.clearSay();
    t.yaz(2, 2, '1.000', RENK.basinc);
    await par(c.say('Yüzey alanı iki katına çıktı; basınç yarıya indi.'), par(d.olcer.say(1000, 600), belir(c, mb, 350)));
    await c.say('Kuvvet sabitken basınç, yüzey alanıyla ters orantılıdır.');
  }

  /* ---- 5. Model: P = F / A ---- */
  async function model(c) {
    const svg = c.svg(1000, 562);
    const t = tab(c, svg, 4, { x: 40, y: 110 });
    [['20', '0,02', '1.000'], ['60', '0,02', '3.000'], ['40', '0,01', '4.000'], ['40', '0,04', '1.000']].forEach((s, i) => { satirYaz(t, i, ...s); hemen(t, i); });
    const b1 = renkli(c, svg, 760, 150, [['20', RENK.kuvvet], ' ÷ ', ['0,02', RENK.alan], ' = ', ['1.000', RENK.basinc]], { size: 30, kalin: 700 });
    const b2 = renkli(c, svg, 760, 200, [['40', RENK.kuvvet], ' ÷ ', ['0,01', RENK.alan], ' = ', ['4.000', RENK.basinc]], { size: 30, kalin: 700 });
    const mdl = renkli(c, svg, 760, 335, [['P', RENK.basinc], ' = ', ['F', RENK.kuvvet], ' / ', ['A', RENK.alan]], { size: 52, kalin: 700 });
    const acik = [
      renkli(c, svg, 760, 392, [['P', RENK.basinc], ': basınç (Pa)'], { size: 24 }),
      renkli(c, svg, 760, 428, [['F', RENK.kuvvet], ': kuvvet (N)'], { size: 24 }),
      renkli(c, svg, 760, 464, [['A', RENK.alan], ': yüzey alanı (m²)'], { size: 24 }),
    ];
    const pa = renkli(c, svg, 760, 515, [['1 Pa', RENK.basinc], ' = ', ['1 N', RENK.kuvvet], ' / ', ['1 m²', RENK.alan]], { size: 30, kalin: 700 });
    const yatay = renkli(c, svg, 285, 430, ['yatay zeminde: ', ['F', RENK.kuvvet], ' = ', ['G', RENK.kuvvet], ' (ağırlık)'], { size: 24 });
    gizle(t.g, b1, b2, mdl, acik, pa, yatay);

    await par(c.say('İki tablonun satırlarına birlikte bakalım: hepsinde aynı işlem gizli.'), belir(c, t.g, 450));
    t.vurgula(0);
    await par(c.say('20’yi 0,02’ye böl: 1.000 eder.', { speak: 'Yirmiyi sıfır virgül sıfır ikiye böl: bin eder.' }), belir(c, b1, 400));
    t.vurgula(0, false); t.vurgula(2);
    await par(c.say('40’ı 0,01’e böl: 4.000 eder.', { speak: 'Kırkı sıfır virgül sıfır bire böl: dört bin eder.' }), belir(c, b2, 400));
    t.vurgula(2, false);
    await par(c.say('Her satırda basınç, kuvvetin yüzey alanına bölümüdür.'), par(belir(c, [b1, b2], 400, 0.3), belir(c, mdl, 450)));
    await par(
      c.say('Basıncın matematiksel modeli budur: P eşittir F bölü A.', { speak: 'Basıncın matematiksel modeli budur: [short pause] pe eşittir fe bölü a.' }),
      par(belir(c, t.g, 400, 0.3), belir(c, acik, 450)),
    );
    c.note('<b>P = F / A</b> (Pa = N/m²)', 'Basıncın modeli', 'akiskanlar-a2-model');
    await par(c.say('Bir pascal, bir metrekareye düşen bir newtonluk kuvvettir.'), belir(c, pa, 450));
    await par(c.say('Yatay zeminde duran cismin uyguladığı kuvvet, kendi ağırlığıdır.'), belir(c, yatay, 450));
  }

  /* ---- 6. Modelle çıkarım ---- */
  const KUP = { dolgu: '#8f9bc4', kenar: '#c3cbea' };
  const kup = (c, p, x, y) => c.S('rect', { x, y, width: 70, height: 70, rx: 4, fill: KUP.dolgu, stroke: KUP.kenar, 'stroke-width': 2.5 }, p);
  const sonuc = (c, p, x, y, parcalar) => renkli(c, p, x, y, parcalar, { size: 26, kalin: 700 });
  const P_ = ['P', RENK.basinc];

  async function cikarim(c) {
    const svg = c.svg(1000, 562);
    cizgi(c, svg, [60, 440], [940, 440], RENK.ince, 3);
    const g1 = c.S('g', {}, svg);
    const mdl = renkli(c, g1, 500, 292, [P_, ' = ', ['F', RENK.kuvvet], ' / ', ['A', RENK.alan]], { size: 60, kalin: 700 });
    // Sol: dört küp üst üste.
    const kL = c.S('g', {}, g1);
    [0, 1, 2, 3].forEach((i) => kup(c, kL, 150, 370 - 70 * i));
    const gL = yazi(c, kL, 185, 205, 'G', { size: 28, kalin: 700, renk: ZEMIN });
    const okL = c.S('g', {}, g1);
    ok(c, okL, [185, 80], [185, 150], RENK.kuvvet, 6);
    yazi(c, okL, 203, 122, '4G', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kuvvet });
    const tbL = c.S('g', {}, g1);
    cizgi(c, tbL, [150, 447], [220, 447], RENK.alan, 6);
    yazi(c, tbL, 185, 484, 'A', { size: 26, kalin: 700, renk: RENK.alan });
    const snL = sonuc(c, g1, 185, 56, [P_, ' = ', ['4G', RENK.kuvvet], ' / ', ['A', RENK.alan]]);
    // Sağ: dört küp yan yana.
    const okR = c.S('g', {}, g1);
    ok(c, okR, [660, 296], [660, 362], RENK.kuvvet, 6);
    yazi(c, okR, 678, 332, '4G', { hiza: 'start', size: 26, kalin: 700, renk: RENK.kuvvet });
    const tbR = c.S('g', {}, g1);
    cizgi(c, tbR, [520, 447], [800, 447], RENK.alan, 6);
    yazi(c, tbR, 660, 484, '4A', { size: 26, kalin: 700, renk: RENK.alan });
    const snR = sonuc(c, g1, 660, 262, [P_, ' = ', ['4G', RENK.kuvvet], ' / ', ['4A', RENK.alan], ' = ', ['G', RENK.kuvvet], ' / ', ['A', RENK.alan]]);
    const nbsp = '   ';
    const kat = renkli(c, g1, 660, 534, [['yüzey × 4', RENK.alan], nbsp, ['basınç ÷ 4', RENK.basinc]], { size: 26, kalin: 700 });
    gizle(mdl, kL, okL, tbL, snL, okR, tbR, snR, kat);

    await par(c.say('Model elimizdeyken ölçmeden de çıkarım yapabiliriz.', { speak: '[curious] Model elimizdeyken ölçmeden de çıkarım yapabiliriz.' }), belir(c, mdl, 450));
    await par(c.say('Dört özdeş küp üst üste; her birinin ağırlığı G.', { speak: 'Dört özdeş küp üst üste; her birinin ağırlığı ge.' }), (async () => {
      await belir(c, mdl, 300, 0); mdl.remove(); await belir(c, kL, 450);
    })());
    await par(c.say('Yere binen kuvvet 4G; yere değen yüzey tek küpün yüzü, A.', { speak: 'Yere binen kuvvet dört ge; yere değen yüzey tek küpün yüzü, a.' }), belir(c, [okL, tbL], 450));
    await par(c.say('Basınç, 4G bölü A.', { speak: 'Basınç, dört ge bölü a.' }), belir(c, snL, 450));

    // Küpler yan yana dizilir: soldaki kopya soluk kalır.
    const kM = c.S('g', {}, g1);
    const mk = [0, 1, 2, 3].map((i) => kup(c, kM, 150, 370 - 70 * i));
    const tasi = c.tween(900, (e) => mk.forEach((r, i) => {
      r.setAttribute('x', lerp(150, 520 + 70 * i, e)); r.setAttribute('y', lerp(370 - 70 * i, 370, e));
    }), ease.inOut);
    await par(
      c.say('Küpleri yan yana diziyoruz: kuvvet yine 4G, yüzey 4A.', { speak: 'Küpleri yan yana diziyoruz: kuvvet yine dört ge, yüzey dört a.' }),
      (async () => {
        await par(tasi, belir(c, kL, 900, 0.3), belir(c, [okL, tbL, snL], 400, 0));
        gL.remove(); okL.remove(); tbL.remove(); snL.remove();
        await belir(c, [okR, tbR], 450);
      })(),
    );
    await par(c.say('Basınç 4G bölü 4A: yani G bölü A.', { speak: 'Basınç dört ge bölü dört a: yani ge bölü a.' }), belir(c, snR, 450));
    await par(c.say('Kuvvet değişmedi; yüzey dört katına çıktı, basınç dörtte birine indi.'), belir(c, kat, 450));

    // Altı küp, üçü yerde.
    c.clearSay();
    await belir(c, g1, 400, 0); g1.remove();
    const gA = c.S('g', {}, svg), gB = c.S('g', {}, svg);
    [0, 1, 2].forEach((i) => { kup(c, gA, 150 + 70 * i, 370); kup(c, gA, 150 + 70 * i, 300); });
    cizgi(c, gA, [150, 447], [360, 447], RENK.alan, 6);
    yazi(c, gA, 255, 484, '3A', { size: 26, kalin: 700, renk: RENK.alan });
    sonuc(c, gA, 255, 190, [P_, ' = ', ['6G', RENK.kuvvet], ' / ', ['3A', RENK.alan], ' = ', ['2G', RENK.kuvvet], ' / ', ['A', RENK.alan]]);
    [0, 1].forEach((j) => [0, 1, 2].forEach((i) => kup(c, gB, 600 + 70 * j, 370 - 70 * i)));
    cizgi(c, gB, [600, 447], [740, 447], RENK.alan, 6);
    yazi(c, gB, 670, 484, '2A', { size: 26, kalin: 700, renk: RENK.alan });
    const snB = sonuc(c, gB, 670, 190, [P_, ' = ?']);
    gizle(gA, gB);
    await par(c.say('Altı küp, üçü yerde: kuvvet 6G, yüzey 3A, basınç 2G bölü A.', { speak: 'Altı küp, üçü yerde: kuvvet altı ge, yüzey üç a, basınç iki ge bölü a.' }), belir(c, gA, 450));

    c.clearSay();
    await belir(c, gB, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı altı küp iki sütun hâline getiriliyor: yerde iki küp var. Basınç ne olur?',
      options: ['2G / A', '12G / A', '3G / A'], answer: 2,
      hints: ['Küp sayısı aynı: kuvvet yine 6G. Yere değen yüzey 2A oldu.', 'Kuvvet yüzeye bölünür, çarpılmaz.', ''],
      right: 'Evet. 6G ÷ 2A = 3G / A.',
    });
    c.clearSay();
    parcaKoy(c, snB, [P_, ' = ', ['6G', RENK.kuvvet], ' / ', ['2A', RENK.alan], ' = ', ['3G', RENK.kuvvet], ' / ', ['A', RENK.alan]]);
    await c.say('Kuvvet 6G, yüzey 2A: basınç 3G bölü A.', { speak: 'Kuvvet altı ge, yüzey iki a: basınç üç ge bölü a.' });
  }

  /* ---- 7. Dene: kuvvet ve yüzey alanı ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { y: 440, yalin: true });
    const FN = [20, 40, 60], AN = ['0,01', '0,02', '0,04'], TUR = ['dik', 'yatik', 'yan'];
    const PT = [[2000, 1000, 500], [4000, 2000, 1000], [6000, 3000, 1500]];   // [kuvvet sırası][alan sırası], Pa
    const pt = yazi(c, svg, 720, 240, '', { size: 44, kalin: 700, renk: RENK.basinc });
    const ft = yazi(c, svg, 720, 292, '', { size: 28, kalin: 600, renk: RENK.kuvvet });
    const at = yazi(c, svg, 720, 334, '', { size: 28, kalin: 600, renk: RENK.alan });
    let fi = 1, ai = 1;
    const guncelle = () => {
      d.diz(fi + 1, TUR[ai]);
      const p = PT[fi][ai];
      d.olcer.goster(p);
      pt.textContent = 'P = ' + d.olcer.bin(p) + ' Pa';
      ft.textContent = 'F = ' + FN[fi] + ' N';
      at.textContent = 'A = ' + AN[ai] + ' m²';
    };
    guncelle();
    await c.say('Kuvveti ve yüzey alanını değiştir; basınca bak.', { noWait: true });
    const slF = c.slider({ label: 'Kuvvet', min: 0, max: 2, step: 1, value: 1, fmt: (v) => FN[+v] + ' N', onInput: (v) => { fi = +v; guncelle(); } });
    const slA = c.slider({ label: 'Yüzey alanı', min: 0, max: 2, step: 1, value: 1, fmt: (v) => AN[+v] + ' m²', onInput: (v) => { ai = +v; guncelle(); } });
    await c.cont('Devam ›');
    slF.remove(); slA.remove(); c.clearSay();

    const k1 = renkli(c, svg, 720, 410, [['F', RENK.kuvvet], ' × 2 → ', ['P', RENK.basinc], ' × 2'], { size: 30, kalin: 700 });
    const k2 = renkli(c, svg, 720, 410, [['A', RENK.alan], ' × 2 → ', ['P', RENK.basinc], ' ÷ 2'], { size: 30, kalin: 700 });
    const k3 = renkli(c, svg, 720, 410, [['P', RENK.basinc], ' = ', ['F', RENK.kuvvet], ' / ', ['A', RENK.alan]], { size: 36, kalin: 700 });
    gizle(k1); gizle(k2); gizle(k3);
    await par(c.say('Kuvvet iki katına çıkarsa basınç da iki katına çıkar.'), belir(c, k1, 400));
    k1.remove();
    await par(c.say('Yüzey alanı iki katına çıkarsa basınç yarıya iner.'), belir(c, k2, 400));
    k2.remove();
    await par(c.say('Basınç, kuvvetin yüzey alanına bölümüdür.'), belir(c, k3, 400));
  }

  Ders.start({
    id: 'akiskanlar-a2', kicker: 'Konu A · Basınç', title: 'Ölç, kaydet, modele ulaş', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Ölç, kaydet, modele ulaş',
      hook: 'Bir tuğlanın kuma dikken yatıktan daha çok bastırdığını gördün; kaç kat daha çok?',
      button: 'Derse başla ›',
    },
    goals: ['Kuvvet, yüzey alanı ve basıncın birimlerini söyler.', 'Ölçüm tablosundan basıncın kuvvetle ve yüzey alanıyla ilişkisini çıkarır.', 'Basıncı P = F / A modeliyle hesaplar ve ölçmeden çıkarım yapar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Basıncın neye bağlı olduğunu hatırla.', run: hatirla },
      { title: 'Ölçüm düzeneği', goal: 'Basıncı bir basınçölçerle ölç ve tabloya kaydet.', run: duzenekSahnesi },
      { title: 'Kuvveti değiştir', goal: 'Yüzey alanı sabitken kuvvetin basınca etkisini ölç.', run: kuvvetiDegistir },
      { title: 'Yüzey alanını değiştir', goal: 'Kuvvet sabitken yüzey alanının basınca etkisini ölç.', run: yuzeyiDegistir },
      { title: 'Model: P = F / A', goal: 'Tablodaki satırlardan basıncın modelini çıkar.', run: model },
      { title: 'Modelle çıkarım', goal: 'Modeli kullanarak ölçmeden basıncı bul.', run: cikarim },
      { title: 'Dene: kuvvet ve yüzey alanı', goal: 'Kuvveti ve yüzey alanını değiştirip basıncı gözle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '60 N ağırlığındaki bir kutu yere 0,03 m² yüzeyle değiyor. Yere yaptığı basınç kaç pascaldır?',
        options: ['180 Pa', '2.000 Pa', '1,8 Pa'], answer: 1,
        why: ['Bu sayı bölmeden çıkmaz; basınç kuvvetin yüzeye bölümüdür.', 'P = F / A: 60 ÷ 0,03 = 2.000 Pa.', '60 ile 0,03 çarpılmış; oysa kuvvet yüzey alanına bölünür.'], scene: 4 },
      { q: 'Bir sandık yere P basıncı yapıyor. Üstüne kendi ağırlığında bir sandık daha konuyor; yere değen yüzey değişmiyor. Yeni basınç nedir?',
        options: ['P', 'P / 2', '2P'], answer: 2,
        why: ['Kuvvet iki katına çıktı; yüzey aynıyken basınç da değişir.', 'Kuvvet artınca basınç azalmaz, çünkü basınç kuvvetle doğru orantılıdır.', 'Yüzey aynıyken kuvvet iki katına çıkınca basınç da iki katına çıkar.'], scene: 2 },
      { q: 'Aynı kuvvet, iki kat büyük bir yüzeye yayılırsa basınç nasıl değişir?',
        options: ['Yarıya iner', 'İki katına çıkar', 'Değişmez'], answer: 0,
        why: ['Kuvvet sabitken yüzey alanı iki katına çıkarsa basınç yarıya iner.', 'Yüzey büyüyünce basınç artmaz; basınç yüzey alanıyla ters orantılıdır.', 'P = F / A olduğundan yüzey değişince basınç da değişir.'], scene: 3 },
      { q: 'Sekiz özdeş küpün dördü yerde, dördü onların üstünde duruyor. Küplerin hepsi yere tek sıra dizilirse basınç nasıl değişir?',
        options: ['2G / A olarak kalır', '2G / A’dan 4G / A’ya çıkar', '2G / A’dan G / A’ya iner'], answer: 2,
        why: ['Yüzey 4A’dan 8A’ya çıkar; kuvvet aynı kalsa da basınç değişir.', 'Yüzey büyüyünce basınç artmaz; 8G ÷ 8A = G / A olur.', 'Kuvvet 8G kalır, yüzey 4A’dan 8A’ya çıkar: basınç 2G / A’dan G / A’ya iner.'], scene: 5 },
      { q: 'Hangi değişiklik basıncı değiştirmez?',
        options: ['Kuvveti de yüzey alanını da iki katına çıkarmak', 'Yalnızca kuvveti iki katına çıkarmak', 'Yalnızca yüzey alanını yarıya indirmek'], answer: 0,
        why: ['2F ÷ 2A = F ÷ A: iki değişiklik birbirini dengeler.', 'Kuvvet iki katına çıkarsa basınç da iki katına çıkar.', 'Yüzey alanı yarıya inerse basınç iki katına çıkar.'], scene: 4 },
    ],
    summary: ['Kuvvetin birimi newton, yüzey alanının birimi metrekare, basıncın birimi pascaldır.', 'Basınç kuvvetle doğru, yüzey alanıyla ters orantılıdır.', '<b>Basınç, kuvvetin yüzey alanına bölümüdür: P = F / A.</b>'],
    nextLesson: { href: 'a3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
