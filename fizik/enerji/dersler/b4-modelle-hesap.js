/* B4 — Modelle hesap
   Q = m · c · ΔT modeli, kütle, madde ya da sıcaklık farkı değişince alınan ya da verilen ısıyı hesaplamaya yarar.
   Senaryo: plan/fizik/enerji/senaryolar/B-isinin-hesabi.md (B4). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Sahne 2 ve 5'te Ş2 (ISITMA) izometrik figürü hazır pozla (ayarlar sahne boyunca değişmez); öteki sahneler düz vektördür.
   Suyun öz ısısı 4,18 J/g · °C; A ve B maddelerinin öz ısıları 0,9 ve 0,45 J/g · °C. Bakırın öz ısısı sayıyla yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, ok, cubuk, sinifla } = window.KIT;
  const { kap, isiOku } = window.KIT_A;
  const { P, sayi, kalinOk, sicaklikEtiketi } = window.KIT_B;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, su: RENK.soguk, yazi: RENK.yazi };


  /* KIT_B.cozumKarti'nın düzeltilmiş kopyası: dördüncü satır gelince yeni satır, eski satır sönerken tam görünür ve
     eskisinin üstünde duruyordu (üst üste yazı). Burada yeni satır oluşur oluşmaz gizlenir. Arayüz aynıdır. */
  function cozumKarti(c, p, o) {
    const g = c.S('g', {}, p), size = o.size || 26, sat = o.satir || 52, h = o.h || sat * 3 + 44;
    kutu(c, g, o.x, o.y, o.w, h, { rx: 14 });
    const slotY = (s) => o.y + 22 + sat * s + sat / 2 + size * 0.36;
    const hepsi = [], gorunen = [];
    async function ekle(parcalar, op = {}) {
      const ms = op.ms == null ? 300 : op.ms, soluk = op.soluk !== false;
      const t = renkli(c, g, o.x + 36, slotY(0), parcalar, { size, kalin: 600, hiza: 'start' });
      gizle(t);
      const r = { t };
      hepsi.push(r);
      if (gorunen.length === 3) {
        const eski = gorunen.shift();
        if (ms) await belir(c, eski.t, 300, 0); else gizle(eski.t);
        eski.t.remove();
        if (ms) await c.tween(300, (e) => gorunen.forEach((q, i) => q.t.setAttribute('y', lerp(slotY(i + 1), slotY(i), e))), ease.inOut);
        gorunen.forEach((q, i) => q.t.setAttribute('y', slotY(i)));
      }
      gorunen.push(r);
      r.t.setAttribute('y', slotY(gorunen.length - 1));
      const oncekiler = gorunen.slice(0, -1);
      if (ms) {
        await Promise.all([belir(c, t, ms), soluk && oncekiler.length ? belir(c, oncekiler.map((q) => q.t), ms, 0.45) : null]);
      } else {
        t.style.opacity = 1;
        if (soluk) oncekiler.forEach((q) => { q.t.style.opacity = 0.45; });
      }
      return r;
    }
    return { g, ekle, degistir(i, parcalar) { parcaKoy(c, hepsi[i].t, parcalar); }, satir(i) { return hepsi[i].t; } };
  }

  /* Figürün yanındaki yazılar için tahta renginde kontur. */
  const konturlu = (t) => { t.style.stroke = RENK.koyu; t.style.strokeWidth = '6px'; t.style.paintOrder = 'stroke'; t.style.strokeLinejoin = 'round'; return t; };

  /* Isı çubuğu satırı: solda adı, çubuk x0'dan sağa uzar, değer çubuğun ucunun 12 birim sağındadır.
     o: { y (çubuğun orta çizgisi), x0, olcek (J/birim), adX, adY?, ad (renkli parçaları), size? } */
  function isiSatiri(c, p, o) {
    const size = o.size || 26;
    const et = renkli(c, p, o.adX, o.adY == null ? o.y + 9 : o.adY, o.ad, { size, kalin: 600, hiza: 'start' });
    const cb = cubuk(c, p, o.x0, o.y, S.isi, { h: 24 });
    const dg = yazi(c, p, o.x0 + 12, o.y + 9, '', { size, kalin: 700, hiza: 'start', renk: S.isi });
    let w = 0;
    const koy = (w2) => { w = w2; cb.boy(w2); dg.setAttribute('x', o.x0 + w2 + 12); };
    gizle(dg);
    return {
      et, cb, dg,
      git(J, ms = 600, deger = true) {
        dg.textContent = sayi(J, 'J');
        const w0 = w, w1 = J / o.olcek;
        return Promise.all([deger ? belir(c, dg, Math.min(ms, 300)) : null, c.tween(ms, (e) => koy(lerp(w0, w1, e)), ease.out)]);
      },
      degerAc(ms = 300) { return belir(c, dg, ms); },
    };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    kutu(c, g1, 330, 250, 100, 100, { rx: 10, dolgu: S.kutle, renk: S.kutle });
    kutu(c, g1, 540, 150, 140, 200, { rx: 10, dolgu: S.kutle, renk: S.kutle });
    yazi(c, g1, 380, 394, 'm', { size: 28, kalin: 700, renk: S.kutle });
    yazi(c, g1, 610, 394, '2 m', { size: 28, kalin: 700, renk: S.kutle });
    const o1 = isiOku(c, g1, [220, 300], [320, 300]), o2 = isiOku(c, g1, [440, 250], [530, 250]);
    const d1 = ok(c, g1, [380, 238], [380, 178], S.sicaklik, 5), d2 = ok(c, g1, [610, 138], [610, 108], S.sicaklik, 5);
    const e1 = yazi(c, g1, 398, 216, 'ΔT', { size: 26, kalin: 700, hiza: 'start', renk: S.sicaklik });
    const e2 = yazi(c, g1, 628, 130, 'ΔT', { size: 26, kalin: 700, hiza: 'start', renk: S.sicaklik });
    gizle(g1, o1.g, o2.g, d1.g, d2.g, e1, e2);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, [g1, o1.g, o2.g], 450));
    const H1 = 'Eşit ısıda ΔT, kütleyle ters orantılıdır.';
    await c.choice({
      tag: 'Hatırla', q: 'Aynı maddeden iki cisme eşit ısı verilirken kütle iki katına çıkarsa ΔT nasıl değişir?',
      options: ['İki katına çıkar', 'Değişmez', 'Yarıya iner'], answer: 2,
      hints: [H1, H1, ''], right: 'Evet. ' + H1,
    });
    await par(c.say('Eşit ısıda kütle iki katına çıkınca ΔT yarıya iner.', { speak: 'Eşit ısıda kütle iki katına çıkınca delta T yarıya iner.' }), belir(c, [d1.g, d2.g, e1, e2], 450));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    await belir(c, [o1.g, o2.g, d1.g, d2.g, e1, e2], 100, 0);
    const g2 = c.S('g', {}, svg);
    const blok = (x, y, w, h) => c.S('rect', { x, y, width: w, height: h, rx: 10, fill: S.isi, 'fill-opacity': 0.5, stroke: S.isi, 'stroke-width': 3 }, g2);
    blok(330, 200, 100, 100); blok(540, 130, 140, 170);
    yazi(c, g2, 380, 342, '1 kg', { size: 28, kalin: 700 });
    yazi(c, g2, 610, 342, '2 kg', { size: 28, kalin: 700 });
    const c1 = yazi(c, g2, 380, 182, 'C', { size: 28, kalin: 700 }), c2 = yazi(c, g2, 610, 112, '2 C', { size: 28, kalin: 700 });
    gizle(g2, c1, c2);
    await belir(c, g2, 400);
    const H2 = 'Kütle iki katına çıkınca ısı sığası da iki katına çıkar.';
    await c.choice({
      tag: 'Hatırla', q: '1 kg bakırın ısı sığası C ise 2 kg bakırın ısı sığası kaçtır?',
      options: ['C', '2 C', 'C / 2'], answer: 1,
      hints: [H2, '', H2], right: 'Evet. ' + H2,
    });
    await par(c.say('Kütle iki katına çıkınca ısı sığası da iki katı oldu.'), belir(c, [c1, c2], 450));
    await c.say('Bugün bu modelle gerçek hesaplar yapacağız.');
  }

  /* ---- 2. Çözülmüş örnek: Ela'nın 500 g suyu ---- */
  async function ornek(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 20, alev: 2 });
    f.goster('sag', 0);
    f.bak(ISITMA.kadraj.sol);
    const kt = renkli(c, svg, 520, 130, [['500 g ', S.kutle], ['su', S.su]], { size: 30, kalin: 600, hiza: 'start' });
    const tT = sicaklikEtiketi(c, svg, f, 'sol.termometre'); tT.guncelle(20);
    const [tx, ty] = f.nokta('sol.termometre');
    const dok = ok(c, svg, [tx, ty - 12], [tx, ty - 52], S.sicaklik, 6);
    const dt = konturlu(yazi(c, svg, tx + 12, ty - 26, '+5 °C', { size: 24, kalin: 700, hiza: 'start', renk: S.sicaklik }));
    const KX = 500, KY = 190, KW = 490;
    const kart = cozumKarti(c, svg, { x: KX, y: KY, w: KW, size: 28, satir: 62 });
    gizle(f.el, kt, tT.g, kart.g, dok.g, dt);

    await par(c.say('Ela 500 g suya 10.450 J ısı veriyor; su 20 °C’ta.', { speak: 'Ela beş yüz gram suya on bin dört yüz elli jul ısı veriyor; su yirmi derecede.' }), belir(c, [f.el, kt, tT.g, kart.g], 450));
    await c.say('Suyun son sıcaklığını modelle bulacağız.');
    await par(c.say('Model: Q = m · c · ΔT.', { speak: '[short pause] Model: Q eşittir m çarpı c çarpı delta T.' }), kart.ekle([P.Q, ' = ', P.m, ' · ', P.c, ' · ', P.dT]));
    await c.say('Suyun öz ısısı 4,18 J/g · °C alınır.', { speak: 'Suyun öz ısısı dört virgül on sekiz jul bölü gram derece alınır.' });
    await par(c.say('Değerleri yazalım: 10.450 = 500 · 4,18 · ΔT.', { speak: 'Değerleri yazalım: on bin dört yüz elli eşittir beş yüz çarpı dört virgül on sekiz çarpı delta T.' }),
      kart.ekle([['10.450', S.isi], ' = ', ['500', S.kutle], ' · 4,18 · ', P.dT]));
    await c.say('500 ile 4,18’in çarpımı 2.090 eder.', { speak: 'Beş yüz ile dört virgül on sekizin çarpımı iki bin doksan eder.' });
    await par(c.say('ΔT, 10.450’nin 2.090’a bölümüdür: 5 °C.', { speak: 'Delta T, on bin dört yüz ellinin iki bin doksana bölümüdür: beş derece.' }),
      kart.ekle([P.dT, ' = ', ['5 °C', S.sicaklik]]));
    await par(c.say('Su 5 °C ısındı.', { speak: 'Su beş derece ısındı.' }), belir(c, [dok.g, dt], 400));
    await c.say('Son sıcaklık, ilk sıcaklığa ΔT eklenerek bulunur.', { speak: 'Son sıcaklık, ilk sıcaklığa delta T eklenerek bulunur.' });
    await par(c.say('20 + 5 = 25 °C.', { speak: 'Yirmi artı beş eşittir yirmi beş derece.' }),
      kart.ekle([['20', S.sicaklik], ' + ', ['5', S.sicaklik], ' = ', ['25 °C', S.sicaklik]]));

    // İkinci yol: ısı sığası. Önceki kart söner, yenisi gelir.
    await par(c.say('Aynı sonucu ısı sığasıyla da bulabiliriz.'), belir(c, kart.g, 400, 0));
    kart.g.remove();
    const kart2 = cozumKarti(c, svg, { x: KX, y: KY, w: KW, size: 28, satir: 62 });
    gizle(kart2.g);
    await belir(c, kart2.g, 300);
    await par(c.say('Önce ısı sığası: C = 2.090 J/°C.', { speak: 'Önce ısı sığası: büyük C eşittir iki bin doksan jul bölü derece.' }), (async () => {
      await kart2.ekle([P.C, ' = ', ['500', S.kutle], ' · 4,18']);
      await c.wait(500);
      await kart2.ekle([P.C, ' = 2.090 J/°C']);
    })());
    await par(c.say('ΔT = Q / C = 10.450 / 2.090 = 5 °C.', { speak: 'Delta T eşittir Q bölü büyük C eşittir on bin dört yüz elli bölü iki bin doksan eşittir beş derece.' }), (async () => {
      await kart2.ekle([P.dT, ' = ', P.Q, ' / ', P.C]);
      await c.wait(500);
      await kart2.ekle([P.dT, ' = ', ['10.450', S.isi], ' / 2.090']);
      await c.wait(500);
      await kart2.ekle([P.dT, ' = ', ['5 °C', S.sicaklik]]);
    })());
    await c.say('İki yol da aynı sonucu verdi.');
    await c.cont('Devam ›');
  }

  /* ---- 3. Kütle değişirse ---- */
  async function kutleDegisir(c) {
    const svg = c.svg(1000, 562);
    const OL = 40, X0 = 250;
    const ust = renkli(c, svg, 90, 120, [['su', S.su], ' · ', ['ΔT = 5 °C', S.sicaklik]], { size: 28, kalin: 600, hiza: 'start' });
    const G = c.S('g', {}, svg);
    const sat = (y, g) => isiSatiri(c, G, { y, x0: X0, olcek: OL, adX: 90, ad: [[g + ' g', S.kutle]], size: 28 });
    const r250 = sat(230, '250'), r500 = sat(340, '500'), r1000 = sat(450, '1.000');
    const hesapT = renkli(c, svg, 90, 535, [['1.000', S.kutle], ' · 4,18 · ', ['5', S.sicaklik], ' = ', ['20.900', S.isi]], { size: 28, kalin: 600, hiza: 'start' });
    gizle(ust, r250.et, r500.et, r1000.et, hesapT);

    await par(c.say('Şimdi kütleyi değiştirelim; madde su, ΔT yine 5 °C.', { speak: 'Şimdi kütleyi değiştirelim; madde su, delta T yine beş derece.' }), (async () => {
      await belir(c, [ust, r500.et, r1000.et], 450);
      await r500.git(10450, 600);
    })());
    await par(c.say('1.000 g su için hesap tahtada.', { speak: 'Bin gram su için hesap tahtada.' }), belir(c, hesapT, 400));
    await par(c.say('Isı 20.900 J bulunur.', { speak: 'Isı yirmi bin dokuz yüz jul bulunur.' }), r1000.git(20900, 700));
    await c.say('Kütle iki katına çıkınca gereken ısı da iki katına çıktı.');

    // Birlikte çöz: tahta yalnızca hesap kartı kalır.
    c.clearSay();
    await belir(c, [G, hesapT], 350, 0);
    const kart = cozumKarti(c, svg, { x: 190, y: 210, w: 620, size: 28, satir: 56 });
    gizle(kart.g);
    const sf = { ms: 0, soluk: false };
    await kart.ekle([P.Q, ' = ', P.m, ' · ', P.c, ' · ', P.dT], sf);
    await kart.ekle([P.Q, ' = ', ['250', S.kutle], ' · 4,18 · ', ['5', S.sicaklik]], sf);
    await kart.ekle([['250', S.kutle], ' · 4,18 = 1.045'], sf);
    await kart.ekle([P.Q, ' = 1.045 · ', ['5', S.sicaklik], ' = ', ['……', RENK.soluk]], sf);
    await belir(c, kart.g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: '250 g su için Q kaç J’dür?',
      options: ['1.045', '5.225', '10.450'], answer: 1,
      hints: ['1.045’i ΔT ile çarpmayı unutma.', '', 'Kütle 500 g’ın yarısı; ısı 10.450 J’ün yarısı olmalı.'],
      right: 'Evet. 1.045 · 5 = 5.225.',
    });
    kart.degistir(3, [P.Q, ' = 1.045 · ', ['5', S.sicaklik], ' = ', ['5.225', S.isi]]);
    await c.say('Q = 1.045 · 5 = 5.225 J bulunur.', { speak: 'Q eşittir bin kırk beş çarpı beş eşittir beş bin iki yüz yirmi beş jul bulunur.' });

    c.clearSay();
    await belir(c, kart.g, 300, 0); kart.g.remove();
    await belir(c, G, 350);
    await par(c.say('Kütle yarıya inince ısı da yarıya indi.'), (async () => {
      await belir(c, r250.et, 300);
      await r250.git(5225, 600);
    })());
    await c.say('Madde ve ΔT aynıysa Q, kütleyle doğru orantılıdır.', { speak: 'Madde ve delta T aynıysa Q, kütleyle doğru orantılıdır.' });
  }

  /* ---- 4. Madde değişirse ---- */
  async function maddeDegisir(c) {
    const svg = c.svg(1000, 562);
    const OL = 24, X0 = 300;
    const G = c.S('g', {}, svg);
    const ust = renkli(c, G, 80, 115, [['500 g', S.kutle], ' · ', ['ΔT = 5 °C', S.sicaklik]], { size: 28, kalin: 600, hiza: 'start' });
    const bas = yazi(c, G, 80, 175, 'c (J/g · °C)', { size: 24, kalin: 600, hiza: 'start' });
    const sat = (y, ad) => isiSatiri(c, G, { y, x0: X0, olcek: OL, adX: 80, ad, size: 28 });
    const rSu = sat(250, [['su', S.su], ' 4,18']), rA = sat(345, ['A 0,9']), rB = sat(440, ['B 0,45']);
    const hesapT = renkli(c, svg, 80, 535, [['500', S.kutle], ' · 0,9 · ', ['5', S.sicaklik], ' = ', ['2.250', S.isi]], { size: 28, kalin: 600, hiza: 'start' });
    gizle(G, rA.et, rB.et, hesapT);

    await par(c.say('Şimdi maddeyi değiştirelim: 500 g, ΔT yine 5 °C.', { speak: 'Şimdi maddeyi değiştirelim: beş yüz gram, delta T yine beş derece.' }), (async () => {
      await belir(c, G, 450);
      await rSu.git(10450, 600);
    })());
    await par(c.say('A maddesinin öz ısısı 0,9 J/g · °C’tır.', { speak: 'A maddesinin öz ısısı sıfır virgül dokuz jul bölü gram derecedir.' }), belir(c, rA.et, 400));
    await par(c.say('Q = 500 · 0,9 · 5 = 2.250 J bulunur.', { speak: 'Q eşittir beş yüz çarpı sıfır virgül dokuz çarpı beş eşittir iki bin iki yüz elli jul bulunur.' }), (async () => {
      await belir(c, hesapT, 400);
      await rA.git(2250, 600, false);
    })());
    await belir(c, hesapT, 350, 0);
    await rA.degerAc(350);

    // Birlikte çöz: tahta yalnızca hesap kartı kalır.
    c.clearSay();
    await belir(c, G, 350, 0);
    const bT = yazi(c, svg, 500, 150, 'B maddesi', { size: 28, kalin: 700 });
    const kart = cozumKarti(c, svg, { x: 190, y: 190, w: 620, size: 28, satir: 56 });
    gizle(kart.g, bT);
    const sf = { ms: 0, soluk: false };
    await kart.ekle([P.Q, ' = ', P.m, ' · ', P.c, ' · ', P.dT], sf);
    await kart.ekle([P.Q, ' = ', ['500', S.kutle], ' · 0,45 · ', ['5', S.sicaklik]], sf);
    await kart.ekle([['500', S.kutle], ' · 0,45 = 225'], sf);
    await kart.ekle([P.Q, ' = 225 · ', ['5', S.sicaklik], ' = ', ['……', RENK.soluk]], sf);
    await belir(c, [kart.g, bT], 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'B maddesi için Q kaç J’dür?',
      options: ['225', '2.250', '1.125'], answer: 2,
      hints: ['225’i ΔT ile çarpmak kaldı.', 'B’nin öz ısısı A’nın yarısı; ısı da yarısı olmalı.', ''],
      right: 'Evet. 225 · 5 = 1.125.',
    });
    kart.degistir(3, [P.Q, ' = 225 · ', ['5', S.sicaklik], ' = ', ['1.125', S.isi]]);
    await c.say('Q = 225 · 5 = 1.125 J bulunur.', { speak: 'Q eşittir iki yüz yirmi beş çarpı beş eşittir bin yüz yirmi beş jul bulunur.' });

    c.clearSay();
    await belir(c, [kart.g, bT], 300, 0); kart.g.remove(); bT.remove();
    await belir(c, G, 350);
    await par(c.say('B’nin öz ısısı A’nın yarısı; gereken ısı da yarısıdır.'), (async () => {
      await belir(c, rB.et, 300);
      await rB.git(1125, 600);
    })());
    await c.say('Su için gereken ısı, ikisinden de çok daha büyük.');
    await c.say('Kütle ve ΔT aynıysa Q, öz ısıyla doğru orantılıdır.', { speak: 'Kütle ve delta T aynıysa Q, öz ısıyla doğru orantılıdır.' });

    // Sor: eşit ısı, iki madde.
    c.clearSay();
    await belir(c, G, 350, 0); G.remove();
    const H = c.S('g', {}, svg);
    kap(c, H, { x: 230, y: 150, su: 100, harf: 'A' });
    kap(c, H, { x: 660, y: 150, su: 100, harf: 'B' });
    yazi(c, H, 305, 362, '1.000 g', { size: 28, kalin: 600, renk: S.kutle });
    yazi(c, H, 735, 362, '1.000 g', { size: 28, kalin: 600, renk: S.kutle });
    kalinOk(c, H, [80, 245], [205, 245], 9);
    kalinOk(c, H, [510, 245], [635, 245], 9);
    yazi(c, H, 142, 210, '4.500 J', { size: 28, kalin: 700, renk: S.isi });
    yazi(c, H, 572, 210, '4.500 J', { size: 28, kalin: 700, renk: S.isi });
    gizle(H);
    await belir(c, H, 450);
    await c.choice({
      tag: 'Sor', q: '1.000 g A ve 1.000 g B maddesine eşit 4.500 J ısı veriliyor. Hangisinin ΔT’si daha büyük ve kaç °C’tır?',
      options: ['A; ΔT = 10 °C', 'İkisinin ΔT’si de 5 °C', 'B; ΔT = 10 °C'], answer: 2,
      hints: ['ΔT = Q / (m · c); B’nin c’si daha küçük, paydası da küçük.', 'Isı eşit olsa bile ΔT öz ısıya bağlıdır.', ''],
      right: 'Evet. ΔT = 4.500 / 450 = 10 °C.',
    });
    const D = c.S('g', {}, H);
    const dBar = (x0, Wd, deger) => {
      yazi(c, D, x0 - 14, 459, 'ΔT', { size: 26, kalin: 700, hiza: 'end', renk: S.sicaklik });
      const cb = cubuk(c, D, x0, 450, S.sicaklik, { h: 24 });
      const tv = yazi(c, D, x0 + 12, 459, deger, { size: 26, kalin: 700, hiza: 'start', renk: S.sicaklik });
      return (e) => { cb.boy(Wd * e); tv.setAttribute('x', x0 + Wd * e + 12); };
    };
    const bA = dBar(255, 100, '5 °C'), bB = dBar(685, 200, '10 °C');
    await par(c.say('B’nin ΔT’si 10 °C, A’nınki 5 °C.', { speak: 'B’nin delta T’si on derece, A’nınki beş derece.' }),
      c.tween(600, (e) => { bA(e); bB(e); }, ease.out));
  }

  /* ---- 5. Sıcaklık değişimi değişirse ---- */
  async function sicaklikDegisir(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 20, alev: 2 });
    f.goster('sag', 0);
    f.bak(ISITMA.kadraj.sol);
    const kt = renkli(c, svg, 520, 110, [['500 g ', S.kutle], ['su', S.su]], { size: 30, kalin: 600, hiza: 'start' });
    const tT = sicaklikEtiketi(c, svg, f, 'sol.termometre'); tT.guncelle(20);
    const [tx, ty] = f.nokta('sol.termometre');
    const dok = ok(c, svg, [tx, ty - 12], [tx, ty - 52], S.sicaklik, 6);
    const dt = konturlu(yazi(c, svg, tx + 12, ty - 26, '30 °C', { size: 24, kalin: 700, hiza: 'start', renk: S.sicaklik }));
    const G = c.S('g', {}, svg);
    const OL = 130, X0 = 520;
    const sat = (y, T) => isiSatiri(c, G, { y, x0: X0, olcek: OL, adX: X0, adY: y - 32, ad: [['ΔT = ' + T + ' °C', S.sicaklik]] });
    const r1 = sat(235, 5), r2 = sat(335, 10), r3 = sat(435, 15);
    const hesapT = renkli(c, svg, 520, 520, [['500', S.kutle], ' · 4,18 · ', ['10', S.sicaklik], ' = ', ['20.900', S.isi]], { size: 26, kalin: 600, hiza: 'start' });
    gizle(f.el, kt, tT.g, dok.g, dt, r1.et, r2.et, r3.et, hesapT);

    await par(c.say('Şimdi ΔT’yi değiştirelim: yine 500 g su.', { speak: 'Şimdi delta T’yi değiştirelim: yine beş yüz gram su.' }), (async () => {
      await belir(c, [f.el, kt, tT.g, r1.et], 450);
      await r1.git(10450, 600);
    })());
    await par(c.say('Ela suyu 20 °C’tan 30 °C’a ısıtıyor.', { speak: 'Ela suyu yirmi dereceden otuz dereceye ısıtıyor.' }), belir(c, [dok.g, dt], 400));
    await par(c.say('ΔT, 30 eksi 20; yani 10 °C.', { speak: 'Delta T, otuz eksi yirmi; yani on derece.' }), (async () => {
      dt.textContent = '+10 °C';
      await belir(c, r2.et, 400);
    })());
    await par(c.say('Q = 500 · 4,18 · 10 = 20.900 J bulunur.', { speak: 'Q eşittir beş yüz çarpı dört virgül on sekiz çarpı on eşittir yirmi bin dokuz yüz jul bulunur.' }), (async () => {
      await belir(c, [dok.g, dt], 250, 0);
      await belir(c, hesapT, 350);
      await r2.git(20900, 600);
    })());
    await c.say('ΔT iki katına çıkınca gereken ısı da iki katına çıktı.', { speak: 'Delta T iki katına çıkınca gereken ısı da iki katına çıktı.' });
    await c.say('Kütle ve madde aynıysa Q, ΔT ile doğru orantılıdır.', { speak: 'Kütle ve madde aynıysa Q, delta T ile doğru orantılıdır.' });

    c.clearSay();
    await belir(c, hesapT, 250, 0);
    await c.choice({
      tag: 'Sor', q: 'Ela aynı 500 g suyu 20 °C’tan 35 °C’a ısıtıyor. Gereken ısı kaç J’dür?',
      options: ['73.150', '2.090', '31.350'], answer: 2,
      hints: ['Formülde ΔT var; son sıcaklık değil, sıcaklık değişimi.', 'ΔT = 35 − 20 = 15 °C; 2.090 ile çarp.', ''],
      right: 'Evet. ΔT = 15 °C; 2.090 · 15 = 31.350.',
    });
    await par(c.say('Q = 500 · 4,18 · 15 = 31.350 J bulunur.', { speak: 'Q eşittir beş yüz çarpı dört virgül on sekiz çarpı on beş eşittir otuz bir bin üç yüz elli jul bulunur.' }), (async () => {
      await belir(c, r3.et, 300);
      await r3.git(31350, 700);
    })());
    c.note('Q = m · c · ΔT: ΔT, son eksi ilk sıcaklıktır.', 'Hesap adımları');
  }

  /* ---- 6. Üçünü birlikte değiştir ---- */
  async function birlikteDegistir(c) {
    const svg = c.svg(1000, 562);
    const MADDE = [{ ad: 'su', c: 418 }, { ad: 'A', c: 90 }, { ad: 'B', c: 45 }]; // c × 100 (J/g · °C)
    const OL = 120, X0 = 110;
    const G = c.S('g', {}, svg);
    const CIP = [{ x: 70, ad: 'kütle', renk: S.kutle }, { x: 380, ad: 'madde', renk: S.yazi }, { x: 690, ad: 'ΔT', renk: S.sicaklik }];
    const cipYazi = CIP.map((k) => {
      yazi(c, G, k.x + 120, 142, k.ad, { size: 26, kalin: 600, renk: k.renk });
      kutu(c, G, k.x, 160, 240, 84, { rx: 14, renk: k.renk });
      return yazi(c, G, k.x + 120, 216, '', { size: 34, kalin: 700, renk: k.renk });
    });
    yazi(c, G, 345, 214, '×', { size: 34, kalin: 700 }); yazi(c, G, 655, 214, '×', { size: 34, kalin: 700 });
    yazi(c, G, 90, 445, 'Q', { size: 36, kalin: 700, hiza: 'end', renk: S.isi });
    const cb = cubuk(c, G, X0, 436, S.isi, { h: 36 });
    const dg = yazi(c, G, X0 + 14, 448, '', { size: 32, kalin: 700, hiza: 'start', renk: S.isi });
    gizle(G);

    const st = { m: 500, md: 0, dT: 5, w: 0, tok: 0, ms: 400, ilk: true, oto: false };
    const koy = (w) => { st.w = w; cb.boy(w); dg.setAttribute('x', X0 + w + 14); };
    const qOf = (m, md, dT) => Math.round(m * MADDE[md].c * dT) / 100;
    const genis = (Q) => Math.max(Q / OL, 1.5);
    const guncelle = () => {
      const Q = qOf(st.m, st.md, st.dT), tok = ++st.tok;
      cipYazi[0].textContent = sayi(st.m, 'g');
      cipYazi[1].textContent = MADDE[st.md].ad; cipYazi[1].style.fill = st.md === 0 ? S.su : S.yazi;
      cipYazi[2].textContent = st.dT + ' °C';
      dg.textContent = sayi(Q, 'J');
      if (st.oto) return;
      const w0 = st.w, w1 = genis(Q);
      if (st.ilk) { koy(w1); return; }
      c.tween(st.ms, (e) => { if (tok === st.tok) koy(lerp(w0, w1, e)); }, ease.inOut);
    };
    /* Kaydırıcılar: sorular sırasında yan sütunda yer kalsın diye soru öncesi kaldırılır, sonra son durumla yeniden kurulur. */
    let sl = null;
    const kur = () => {
      st.ilk = true;
      sl = {
        K: c.slider({ label: 'kütle', min: 100, max: 1000, step: 50, value: st.m, fmt: (v) => sayi(+v, 'g'), onInput: (v) => { st.m = +v; guncelle(); } }),
        M: c.slider({ tag: false, label: 'madde', min: 0, max: 2, step: 1, value: st.md, fmt: (v) => MADDE[v].ad, onInput: (v) => { st.md = +v; guncelle(); } }),
        D: c.slider({ tag: false, label: 'ΔT', min: 1, max: 20, step: 1, value: st.dT, fmt: (v) => v + ' °C', onInput: (v) => { st.dT = +v; guncelle(); } }),
      };
      st.ilk = false;
    };
    const kaldir = () => { sl.K.remove(); sl.M.remove(); sl.D.remove(); };
    /* Kaydırıcılar ve çubuk birlikte 800 ms'de (inOut) yeni değerlere gider. */
    const ayarla = async (m1, md1, dT1) => {
      const m0 = st.m, d0 = st.dT, md0 = st.md;
      st.oto = true;
      await c.tween(800, (e) => {
        sl.K.set(Math.round(lerp(m0, m1, e) / 50) * 50); sl.M.set(e < 0.5 ? md0 : md1); sl.D.set(Math.round(lerp(d0, dT1, e)));
        koy(genis(lerp(qOf(m0, md0, d0), qOf(m1, md1, dT1), e)));
      }, ease.inOut);
      st.oto = false; st.ilk = true;
      sl.K.set(m1); sl.M.set(md1); sl.D.set(dT1);
      st.ilk = false;
    };
    kur();

    await par(c.say('Üç çarpanı birlikte değiştirebilirsin: kütle, madde, ΔT.', { speak: 'Üç çarpanı birlikte değiştirebilirsin: kütle, madde, delta T.' }), belir(c, G, 450));
    await c.say('Çubuk, gereken ısıyı gösterir.');

    c.clearSay(); kaldir();
    await c.choice({
      tag: 'Sor', q: 'Kütleyi 1.000 g’a, ΔT’yi 10 °C’a çıkarırsan (madde su) Q kaç katı olur?',
      options: ['2 katı', '4 katı', '3 katı'], answer: 1,
      hints: ['Kütle iki katına çıkınca Q iki katı, ΔT de iki katına çıkınca yine iki katı.', '', 'İki etki çarpılır.'],
      right: 'Evet. 2 · 2 = 4.',
    });
    kur();
    await par(c.say('Çubuk dört katına uzadı: Q = 41.800 J.', { speak: 'Çubuk dört katına uzadı: Q eşittir kırk bir bin sekiz yüz jul.' }), ayarla(1000, 0, 10));

    c.clearSay();
    await ayarla(500, 0, 5); kaldir();
    await c.choice({
      tag: 'Sor', q: 'Kütleyi yarıya (250 g), ΔT’yi iki katına (10 °C) getirirsen Q ne olur?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 2,
      hints: ['Biri yarıya inip öteki iki katına çıkarsa çarpım aynı kalır.', 'Kütle yarısı, ΔT iki katı.', ''],
      right: 'Evet. Yarı ile iki katının çarpımı bir eder.',
    });
    kur();
    await par(c.say('Kütle yarıya, ΔT iki katına çıktı; ısı değişmedi.', { speak: 'Kütle yarıya, delta T iki katına çıktı; ısı değişmedi.' }), ayarla(250, 0, 10));

    c.clearSay();
    await ayarla(500, 0, 5); kaldir();
    await c.choice({
      tag: 'Sor', q: 'Maddeyi su yerine A yaparsan (kütle ve ΔT aynı) Q ne olur?',
      options: ['Azalır', 'Artar', 'Değişmez'], answer: 0,
      hints: ['', 'A’nın öz ısısı suyunkinden küçük.', 'Kütle ve ΔT aynıysa Q, öz ısıyla doğru orantılıdır.'],
      right: 'Evet. A’nın öz ısısı küçük; Q azalır.',
    });
    kur();
    await par(c.say('A maddesinde gereken ısı azaldı: 2.250 J.', { speak: 'A maddesinde gereken ısı azaldı: iki bin iki yüz elli jul.' }), ayarla(500, 1, 5));

    c.clearSay();
    await ayarla(500, 0, 5);
    c.say('Şimdi sen dene: üç çarpanı istediğin gibi değiştir.', { noWait: true });
    await c.cont('Devam ›');
    kaldir(); c.clearSay();
  }

  /* ---- 7. Hangisi artınca ne artar? ---- */
  const KARTLAR = [
    { ust: 'Kütle üç katına çıkıyor;', alt: 'madde ve ΔT aynı.', ad: 'kütle', kutu: 0,
      neden: 'Evet. Q, kütleyle doğru orantılıdır.', ipucu: 'Kütle artınca Q nasıl değişiyordu?' },
    { ust: 'Madde B oluyor (öz ısısı daha küçük);', alt: 'kütle ve ΔT aynı.', ad: 'madde', kutu: 1,
      neden: 'Evet. Öz ısı küçülünce Q küçülür.', ipucu: 'Öz ısı küçülünce Q için ne olmuştu?' },
    { ust: 'ΔT yarıya iniyor;', alt: 'kütle ve madde aynı.', ad: 'ΔT', kutu: 1,
      neden: 'Evet. Q, ΔT ile doğru orantılıdır.', ipucu: 'ΔT küçülünce Q ne olur?' },
    { ust: 'Kütle iki katına çıkıyor, ΔT yarıya iniyor;', alt: 'madde aynı.', ad: 'kütle–ΔT', kutu: 2,
      neden: 'Evet. İki ile bir bölü ikinin çarpımı bir eder.', ipucu: 'İki etkiyi çarp: iki kat ve yarı.' },
    { ust: 'ΔT iki katına çıkıyor, öz ısı yarıya iniyor;', alt: 'kütle aynı.', ad: 'ΔT–c', kutu: 2,
      neden: 'Evet. İki katı ve yarısı birbirini götürür.', ipucu: 'İki katı ile yarısını çarp.' },
  ];
  async function genelle(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 60, ad: 'Q artar' }, { x: 360, ad: 'Q azalır' }, { x: 660, ad: 'Q değişmez' }], sayac = [0, 0, 0];
    const ust = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, ust, k.x, 70, 280, 160, { rx: 14 }); yazi(c, ust, k.x + 140, 112, k.ad, { size: 28, kalin: 700 }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 100, 290, 800, 130, { rx: 14 });
      yazi(c, kart, 500, 344, k.ust, { size: 28, kalin: 600 });
      yazi(c, kart, 500, 388, k.alt, { size: 28, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    /* Kart yerinde küçülüp söner; kısa adı kutusunun içindeki listeye yazılır. */
    const yerlestir = async (k) => {
      const el = kart, kx = KUTU[k.kutu].x + 140, ky = 168 + sayac[k.kutu] * 38;
      sayac[k.kutu] += 1;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${355 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const ad = yazi(c, ust, kx, ky, k.ad, { size: 24, kalin: 600, renk: RENK.soluk });
      gizle(ad);
      await belir(c, ad, 300);
    };
    gizle(ust);

    await par(c.say('Hesaplardan bir genelleme çıkaralım.'), belir(c, ust, 400));
    await c.say('Kütle, öz ısı ya da ΔT artınca Q artar.', { speak: 'Kütle, öz ısı ya da delta T artınca Q artar.' });
    await c.say('Q, bu üçünün her biriyle doğru orantılıdır.', { speak: '[thoughtful] Q, bu üçünün her biriyle doğru orantılıdır.' });
    await c.say('Biri artıp biri azalırsa Q değişmeyebilir.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR,
      soru: () => 'Aynı ısı hesabında Q ne olur?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    const fo = renkli(c, svg, 500, 400, [P.Q, ' = ', P.m, ' · ', P.c, ' · ', P.dT], { size: 52, kalin: 700 });
    gizle(fo);
    await par(c.say('Kütle, madde ve ΔT belliyse ısı hesaplanır.', { speak: 'Kütle, madde ve delta T belliyse ısı hesaplanır.' }), belir(c, fo, 500));
    c.note('Kütle, madde, ΔT belliyse ısı hesaplanır.', 'Hesap');
    c.note('Q; m, c ve ΔT ile doğru orantılıdır.', 'Orantı');
  }

  Ders.start({
    id: 'enerji-b4', kicker: 'Konu B · Isının hesabı', title: 'Modelle hesap', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Modelle hesap',
      hook: 'Bir bardak çay suyunu kaynatmak için ne kadar ısı gerekir; bardak iki katına çıkarsa?',
      button: 'Derse başla ›',
    },
    goals: ['Q = m · c · ΔT ile alınan ya da verilen ısıyı hesaplar.', 'ΔT’yi son ve ilk sıcaklığın farkı olarak bulur.', 'Kütle, madde ya da ΔT değişince ısının nasıl değiştiğini söyler.', 'Isının kütle, öz ısı ve ΔT ile doğru orantılı olduğunu söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kütlenin ΔT ve ısı sığasına etkisini hatırla.', run: hatirla },
      { title: 'Çözülmüş örnek: Ela’nın 500 g suyu', goal: 'Modeli baştan sona çözülmüş bir örnekte gör.', run: ornek },
      { title: 'Kütle değişirse ısı nasıl değişir?', goal: 'Kütle iki katına çıkınca ısının nasıl değiştiğini gör.', run: kutleDegisir },
      { title: 'Madde değişirse ısı nasıl değişir?', goal: 'Öz ısı değişince ısının nasıl değiştiğini gör.', run: maddeDegisir },
      { title: 'Sıcaklık değişimi değişirse ısı nasıl değişir?', goal: 'ΔT değişince ısının nasıl değiştiğini gör.', run: sicaklikDegisir },
      { title: 'Üçünü birlikte değiştir', goal: 'Kütle, madde ve ΔT’yi birlikte değiştirip ısıyı izle.', run: birlikteDegistir },
      { title: 'Hangisi artınca ne artar?', goal: 'Değişiklikleri Q’ya etkisine göre sınıfla.', run: genelle },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela 300 g suyu 20 °C’tan 30 °C’a ısıtıyor. Gereken ısı kaç J’dür?',
        options: ['1.254', '12.540', '37.620'], answer: 1,
        why: ['ΔT ile çarpmak unutulmuş: ΔT = 10 °C olduğundan 1.254 · 10 gerekir.', 'ΔT = 30 − 20 = 10 °C; Q = 300 · 4,18 · 10 = 12.540 J.', 'ΔT yerine son sıcaklık (30) yazılmış; ΔT = 10 °C alınmalıdır.'], scene: 4 },
      { q: 'Ela öz ısısı 0,9 J/g · °C olan A maddesinden 400 g alıp 10 °C ısıtıyor. Gereken ısı kaç J’dür?',
        options: ['360', '4.000', '3.600'], answer: 2,
        why: ['ΔT ile çarpmak unutulmuş: 400 · 0,9 = 360, bir de 10 ile çarpılır.', 'Öz ısı hesaba katılmamış; Q = 400 · 0,9 · 10 = 3.600 J.', 'Q = m · c · ΔT = 400 · 0,9 · 10 = 3.600 J.'], scene: 3 },
      { q: 'Aynı maddeden iki cismin her birini 10 °C ısıtmak için gereken ısı karşılaştırılıyor; ikincinin kütlesi birincinin iki katı. Hangisi doğrudur?',
        options: ['İkincisi için gereken ısı iki katıdır', 'İkisi için gereken ısı aynıdır; ΔT eşit', 'İkincisi için gereken ısı yarısıdır'], answer: 0,
        why: ['Madde ve ΔT aynı olduğundan Q, kütleyle doğru orantılıdır.', 'ΔT eşit olsa da kütle farklıdır; Q = m · c · ΔT kütleye de bağlıdır.', 'Kütle arttıkça gereken ısı artar, azalmaz.'], scene: 2 },
      { q: '500 g su 20.900 J ısı alıyor. ΔT kaç °C’tır?',
        options: ['5', '10', '20'], answer: 1,
        why: ['5 °C, 10.450 J’lük örneğin sonucudur; burada ısı iki katı olduğundan ΔT de iki katıdır.', 'ΔT = Q / (m · c) = 20.900 / (500 · 4,18) = 20.900 / 2.090 = 10 °C.', '20.900 / 2.090 = 10 eder; 20 sonucu yanlış okumadan gelir.'], scene: 1 },
      { q: 'Kütlesi 2 m, öz ısısı c olan cisme 2 Q ısı verilince sıcaklık değişimi T oluyor. Aynı maddeden m kütleli cisme 8 Q verilirse sıcaklık değişimi kaç T olur?',
        options: ['8 T', '4 T', '2 T'], answer: 0,
        why: ['2 Q = 2 m · c · T olduğundan Q = m · c · T; 8 Q = m · c · ΔT′ için ΔT′ = 8 T.', 'Yalnızca ısı oranı (8 Q / 2 Q = 4) alınmış; kütle oranı da hesaba katılmalı.', 'Yalnızca kütle oranı alınmış; ısının dört katına çıktığı da hesaba katılmalı.'], scene: 5 },
    ],
    summary: ['ΔT, son sıcaklıktan ilk sıcaklık çıkarılarak bulunur.', 'Q; kütle, öz ısı ve ΔT ile doğru orantılıdır.', '<b>Kütle, madde ve sıcaklık farkı belliyse ısı hesaplanır.</b>'],
    nextLesson: { href: 'b5-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
