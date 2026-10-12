/* B2 — Öz ısı ve ısı sığası
   Aynı ısıyı alan maddelerin sıcaklığı aynı kadar artmaz; bunu maddeye ait öz ısı ve cisme ait ısı sığası anlatır.
   Senaryo: plan/fizik/enerji/senaryolar/B-isinin-hesabi.md (B2). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Sahne 3 ve 5'te Ş2 (ISITMA) izometrik figürü; öteki sahneler düz vektördür. Kum, deniz ve öz ısı sıralaması sayısızdır.
   Bakırın öz ısısı sayıyla yazılmaz: bloklar "C" ve "2 C" ile anlatılır. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, tahminAl, sinifla } = window.KIT;
  const { kap, termometre, cubuk: icCubuk, isiOku } = window.KIT_A;
  const { P, sayi, kalinOk, cozumKarti, dogruGrafigi, cubukCifti, sicaklikEtiketi, sureEtiketi } = window.KIT_B;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, su: RENK.soguk, yazi: RENK.yazi, iyi: RENK.iyi };
  /* Suyun içinde birkaç kabarcık (kaynayan su; sabit, hareketsiz). */
  const kabarcik = (c, p, noktalar) => noktalar.forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 6, fill: '#ffffff', 'fill-opacity': 0.8 }, p));

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    kap(c, g1, { x: 430, y: 150, w: 140, h: 140, su: 110 });
    kabarcik(c, g1, [[470, 250], [500, 232], [530, 256], [514, 210]]);
    termometre(c, g1, { x: 330, y: 330, h: 200, T: 100 });
    termometre(c, g1, { x: 670, y: 330, h: 200, T: 100 });
    yazi(c, g1, 330, 108, '100 °C', { size: 26, kalin: 700, renk: S.sicaklik });
    yazi(c, g1, 670, 108, '373 K', { size: 26, kalin: 700, renk: S.sicaklik });
    gizle(g1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    const H1 = 'Sıcaklık aynı, ölçek farklı: 100 °C ile 373 K aynı sıcaklıktır.';
    await c.choice({
      tag: 'Hatırla', q: 'Ela aynı kaynayan suyu bir Celsius ve bir Kelvin termometresiyle ölçüyor. Hangisi doğrudur?',
      options: ['Sıcaklıklar farklı, sayılar farklı', 'Sıcaklık aynı, sayılar farklı', 'Sayılar aynı, sıcaklık farklı'], answer: 1,
      hints: [H1, '', H1], right: 'Evet. ' + H1,
    });
    await c.say('İki termometre aynı sıcaklığı farklı sayılarla gösteriyor.', { speak: 'İki termometre aynı sıcaklığı farklı sayılarla gösteriyor.' });

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 430, y: 150, w: 140, h: 140, su: 110 });
    const ok = isiOku(c, g2, [250, 220], [420, 220]);
    const ic = icCubuk(c, g2, { x: 430, y: 360, boy: 70, etiket: 'iç enerji', hiza: 'ust' });
    gizle(g2, ok.g);
    await belir(c, [g2, ok.g], 400);
    const H2 = 'Isı alan maddenin iç enerjisi artar, ısı verenin azalır.';
    await c.choice({
      tag: 'Hatırla', q: 'Isı alan bir maddenin iç enerjisi nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: [H2, H2, ''], right: 'Evet. ' + H2,
    });
    await par(c.say('Isı alan maddenin iç enerjisi artar.'), ic.git(c, 150, 900));
    await c.say('Bugün aynı ısıyı alan maddelerin sıcaklığı neden aynı kadar artmıyor, ona bakacağız.');
  }

  /* ---- 2. Kum ve deniz ---- */
  async function kumDeniz(c) {
    const svg = c.svg(1000, 562);
    const zemin = c.S('g', {}, svg);
    // Güneş ve ışınları
    c.S('circle', { cx: 500, cy: 85, r: 34, fill: S.isi }, zemin);
    [0, 45, 90, 135, 180].forEach((d) => {
      const a = d * Math.PI / 180;
      cizgi(c, zemin, [500 + 48 * Math.cos(a), 85 + 48 * Math.sin(a)], [500 + 66 * Math.cos(a), 85 + 66 * Math.sin(a)], S.isi, 4);
    });
    // Kum yığını
    c.S('path', { d: 'M130,430 L190,340 L330,340 L390,430 Z', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, zemin);
    [[200, 400], [240, 375], [280, 405], [310, 380], [180, 415], [350, 415], [260, 357], [225, 417], [300, 422]]
      .forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 3.5, fill: RENK.cizgi }, zemin));
    // Deniz
    c.S('rect', { x: 610, y: 340, width: 260, height: 90, fill: S.su, 'fill-opacity': 0.3 }, zemin);
    ['M610,354 q21.7,-10 43.3,0 t43.3,0 t43.3,0 t43.3,0 t43.3,0 t43.3,0', 'M610,384 q21.7,-10 43.3,0 t43.3,0 t43.3,0 t43.3,0 t43.3,0 t43.3,0']
      .forEach((d) => c.S('path', { d, fill: 'none', stroke: S.su, 'stroke-width': 3, 'stroke-linecap': 'round' }, zemin));
    // Isı okları ve termometreler
    const oklar = c.S('g', {}, svg);
    const o1 = isiOku(c, oklar, [260, 150], [260, 320]), o2 = isiOku(c, oklar, [740, 150], [740, 320]);
    const terG = c.S('g', {}, svg);
    const Tb = (boy) => (boy - 10) * 100 / 110;       // sütun boyu (birim) → termometre değeri
    const tKum = termometre(c, terG, { x: 450, y: 430, h: 140, T: Tb(40) });
    const tDen = termometre(c, terG, { x: 550, y: 430, h: 140, T: Tb(40) });
    yazi(c, terG, 450, 470, 'kum', { size: 24, kalin: 600 });
    yazi(c, terG, 550, 470, 'deniz', { size: 24, kalin: 600 });
    gizle(zemin, terG);
    gizle(o1.g, o2.g);

    await par(c.say('Yaz günü öğlen kumsala gidiyorsun.'), belir(c, zemin, 450));
    await c.say('Kum ayağını yakar; deniz ise serindir.');
    await par(c.say('Güneş, ikisine de aynı süre ısı veriyor.'), belir(c, [o1.g, o2.g, terG], 500));
    await par(c.say('Ama kumun sıcaklığı, suyunkinden çok daha fazla artıyor.', { speak: '[curious] Ama kumun sıcaklığı, suyunkinden çok daha fazla artıyor.' }),
      tKum.git(c, Tb(120), 1500, ease.linear), tDen.git(c, Tb(70), 1500, ease.linear));
    await c.say('Aynı ısıyı alan maddelerin sıcaklığı aynı kadar artmaz.');
    await c.say('Sıcaklık değişimi, maddenin kütlesine ve cinsine bağlıdır.');
    await c.cont('Devam ›');
  }

  /* ---- 3. Aynı ısı, aynı kütle, iki madde ---- */
  async function ayniIsi(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 24, alev: 0 });
    f.ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 24, alev: 0 });
    const [sx, sy] = f.nokta('sol.etiket'), [gx, gy] = f.nokta('sag.etiket');
    const eSu = yazi(c, svg, sx, sy + 24, 'su', { size: 24, kalin: 600 });
    const eYag = yazi(c, svg, gx, gy + 24, 'zeytinyağı', { size: 24, kalin: 600 });
    const kutleT = yazi(c, svg, 625, 130, 'aynı kütle', { size: 26, kalin: 600, renk: S.kutle, hiza: 'start' });
    const isiT = yazi(c, svg, 625, 172, 'aynı ısı', { size: 26, kalin: 600, renk: S.isi, hiza: 'start' });
    const tSu = sicaklikEtiketi(c, svg, f, 'sol.termometre'), tYag = sicaklikEtiketi(c, svg, f, 'sag.termometre');
    tSu.guncelle(24); tYag.guncelle(24);
    const sure = sureEtiketi(c, svg, f, { dy: 100 });
    const cb = cubukCifti(c, svg, { adX: 625, x0: 625, y: [340, 440], adlar: ['', ''] });
    const cbAd = c.S('g', {}, svg);
    yazi(c, cbAd, 625, 300, 'su', { size: 24, kalin: 600, hiza: 'start' });
    yazi(c, cbAd, 625, 400, 'zeytinyağı', { size: 24, kalin: 600, hiza: 'start' });
    gizle(f.el, eSu, eYag, kutleT, isiT, tSu.g, tYag.g, cb.g, cbAd);

    await par(c.say('Ela iki özdeş kaba eşit kütlede su ve zeytinyağı koyuyor.'), belir(c, [f.el, eSu, eYag, kutleT], 450));
    await par(c.say('İkisinin sıcaklığı da 24 °C.', { speak: 'İkisinin sıcaklığı da yirmi dört derece.' }), belir(c, [tSu.g, tYag.g], 350));
    f.ayar('sol', { alev: 2 }); f.ayar('sag', { alev: 2 });
    await c.say('İki özdeş ısıtıcıyı aynı anda açıyor.');
    await par(c.say('Özdeş ısıtıcılar eşit sürede eşit ısı verir.'), belir(c, isiT, 350));
    c.clearSay();
    await tahminAl(c, { tag: 'Tahmin et', q: 'Sence beş dakika sonra hangi termometre daha yüksekte olur?', options: ['Su', 'Zeytinyağı', 'İkisi aynı'] });
    await par(
      c.say('Beş dakika sonra su 27 °C, zeytinyağı 30 °C gösteriyor.', { speak: 'Beş dakika sonra su yirmi yedi derece, zeytinyağı otuz derece gösteriyor.' }),
      (async () => {
        await c.tween(1600, (e) => {
          const a = lerp(24, 27, e), b = lerp(24, 30, e);
          f.ayar('sol', { sicaklik: a }); f.ayar('sag', { sicaklik: b }); f.sure(300 * e);
          tSu.guncelle(a); tYag.guncelle(b);
        }, ease.linear);
        sure.yaz('5. dk');
      })(),
    );
    await par(c.say('Su 3 °C, zeytinyağı 6 °C ısındı.', { speak: 'Su üç derece, zeytinyağı altı derece ısındı.' }),
      (async () => {
        await belir(c, [cb.g, cbAd], 200);
        cb.deger(0, sayi(3, '°C')); cb.deger(1, sayi(6, '°C'));
        await cb.git(c, [102, 204], 600);
      })());
    await c.say('Kütle de ısı da aynı; yine de artışlar farklı.');
    await c.say('Demek ki sıcaklık artışı maddenin cinsine de bağlıdır.');
  }

  /* ---- 4. Öz ısı: bir kilogram, bir derece ---- */
  async function ozIsi(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg), sol = c.S('g', {}, g1), sag = c.S('g', {}, g1);
    // Solda 1 kg su
    kap(c, sol, { x: 190, y: 190, w: 140, h: 140, su: 110 });
    yazi(c, sol, 260, 372, '1 kg su', { size: 24, kalin: 600, renk: S.kutle });
    kalinOk(c, sol, [260, 90], [260, 150], 8, S.isi);
    yazi(c, sol, 284, 128, '4.186 J', { size: 26, kalin: 700, renk: S.isi, hiza: 'start' });
    c.S('rect', { x: 240, y: 158, width: 40, height: 22, rx: 6, fill: S.sicaklik }, sol);
    yazi(c, sol, 292, 177, '1 °C', { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    // Sağda 1 kg buz
    [[540, 300], [600, 300], [570, 255]].forEach(([x, y]) => c.S('rect', { x, y, width: 30, height: 30, rx: 5, fill: '#cfe6ff', stroke: '#9cc2ff', 'stroke-width': 2 }, sag));
    yazi(c, sag, 585, 372, '1 kg buz', { size: 24, kalin: 600, renk: S.kutle });
    kalinOk(c, sag, [585, 90], [585, 150], 4, S.isi);
    yazi(c, sag, 609, 128, '2.100 J', { size: 26, kalin: 700, renk: S.isi, hiza: 'start' });
    c.S('rect', { x: 565, y: 158, width: 40, height: 22, rx: 6, fill: S.sicaklik }, sag);
    yazi(c, sag, 617, 177, '1 °C', { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    const tanim = renkli(c, g1, 500, 450, [['öz ısı', S.yazi]], { size: 26, kalin: 700 });
    gizle(sol, sag, tanim);

    // Sıralama paneli
    const g3 = c.S('g', {}, svg);
    yazi(c, g3, 500, 100, 'öz ısı sıralaması', { size: 26, kalin: 700 });
    const ADLAR = ['su', 'demir', 'bakır'], YL = [160, 240, 320], W = [400, 120, 100], cub = [];
    ADLAR.forEach((ad, i) => {
      yazi(c, g3, 90, YL[i] + 9, ad, { size: 26, kalin: 600, hiza: 'start' });
      cub.push(c.S('rect', { x: 300, y: YL[i] - 11, width: 0, height: 22, rx: 6, fill: RENK.cizgi }, g3));
    });
    gizle(g3);

    await c.say('Her madde, aynı ısıyla aynı kadar ısınmaz.');
    await c.say('Bunu anlatan sayı, maddeye ait bir özelliktir.');
    await par(c.say('1 kg suyun sıcaklığını 1 °C artırmak için 4.186 J gerekir.', { speak: 'Bir kilogram suyun sıcaklığını bir derece artırmak için dört bin yüz seksen altı jul gerekir.' }), belir(c, sol, 500));
    await par(c.say('1 kg buzun sıcaklığını 1 °C artırmak 2.100 J ister.', { speak: 'Bir kilogram buzun sıcaklığını bir derece artırmak iki bin yüz jul ister.' }), belir(c, sag, 500));
    await par(c.say('Birim kütlenin sıcaklığını 1 °C değiştiren ısıya öz ısı denir.', { speak: 'Birim kütlenin sıcaklığını bir derece değiştiren ısıya öz ısı denir.' }), belir(c, tanim, 400));
    parcaKoy(c, tanim, [['öz ısı: ', S.yazi], ['c', S.yazi]]);
    await c.say('Öz ısı c ile gösterilir; maddeyi ayırt eden bir özelliktir.', { speak: 'Öz ısı küçük c ile gösterilir; maddeyi ayırt eden bir özelliktir.' });
    parcaKoy(c, tanim, [['su: c = 4,18 J/g · °C', S.yazi]]);
    await c.say('Hesaplarda gram kullanacağız: suyun öz ısısı 4,18 J/g · °C alınır.', { speak: 'Hesaplarda gram kullanacağız: suyun öz ısısı dört virgül on sekiz jul bölü gram derece alınır.' });

    await par(c.say('Su, demir ve bakır arasında en büyük öz ısı suyundur.'), (async () => {
      await belir(c, [g1], 300, 0);
      await belir(c, g3, 300);
      await c.tween(600, (e) => cub.forEach((r, i) => r.setAttribute('width', W[i] * e)), ease.out);
    })());
    await c.say('Bakırın öz ısısı üçünün en küçüğüdür.');
    await c.say('Aynı kütlede öz ısısı küçük madde, aynı ısıyla daha çok ısınır.');
    await c.say('Zeytinyağının öz ısısı suyunkinden küçüktür; bu yüzden daha çok ısındı.');

    // Sor: üç kap kartı
    c.clearSay();
    const kartG = c.S('g', {}, svg), kartlar = [];
    ['demir', 'bakır', 'su'].forEach((ad, i) => {
      const k = kutu(c, kartG, 230 + 200 * i, 385, 140, 56, { rx: 10 });
      yazi(c, kartG, 300 + 200 * i, 422, ad, { size: 26, kalin: 600 });
      kartlar.push(k);
    });
    yazi(c, kartG, 500, 488, 'aynı kütle, özdeş ısıtıcı, eşit süre', { size: 24, kalin: 600, renk: RENK.soluk });
    gizle(kartG);
    await belir(c, kartG, 400);
    await c.choice({
      tag: 'Sor', q: 'Aynı kütledeki demir, bakır ve su özdeş ısıtıcılarla eşit süre ısıtılıyor. Hangisinin sıcaklığı en çok artar?',
      options: ['Demir', 'Bakır', 'Su'], answer: 1,
      hints: ['Eşit ısıda öz ısısı en küçük olan en çok ısınır; sıralamaya bak.', '', 'Su, üçünün öz ısısı en büyük olanıdır; en az o ısınır.'],
      right: 'Evet. Öz ısısı en küçük olan bakır en çok ısınır.',
    });
    kartlar[1].setAttribute('stroke', S.iyi); kartlar[1].setAttribute('stroke-width', 4);
    const enCok = yazi(c, g3, 414, 329, 'en çok ısınır', { size: 24, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    gizle(enCok);
    await par(c.say('Bakırın öz ısısı en küçük; en çok o ısınır.'), belir(c, enCok, 400));
    c.note('Birim kütlenin sıcaklığını 1 °C değiştiren ısı. Maddeye özgüdür.', 'Öz ısı');
  }

  /* ---- 5. Isı sığası: cismin ısı sığası ---- */
  async function isiSigasi(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'su', seviye: 0.3, sicaklik: 20, alev: 2 });
    f.ayar('sag', { icerik: 'su', seviye: 0.9, sicaklik: 20, alev: 2 });
    const [sx, sy] = f.nokta('sol.etiket'), [gx, gy] = f.nokta('sag.etiket');
    const eSol = yazi(c, svg, sx, sy + 24, 'cezve', { size: 24, kalin: 600 });
    const eSag = yazi(c, svg, gx, gy + 24, 'tencere', { size: 24, kalin: 600 });
    const tSol = sicaklikEtiketi(c, svg, f, 'sol.termometre'), tSag = sicaklikEtiketi(c, svg, f, 'sag.termometre');
    tSol.guncelle(20); tSag.guncelle(20);
    // Sağ bölme: tanım
    const tn1 = renkli(c, svg, 797, 215, [['ısı sığası', S.yazi]], { size: 30, kalin: 700 });
    const tn2 = renkli(c, svg, 797, 265, [['birim: J/°C', S.yazi]], { size: 30, kalin: 700 });
    // Sağ bölme: iki satır
    const satir = (y, q, w, c1) => {
      const g = c.S('g', {}, svg);
      yazi(c, g, 620, y + 10, q, { size: 30, kalin: 700, renk: S.isi, hiza: 'start' });
      const oku = kalinOk(c, g, [690, y], [690, y], w, S.isi);
      const son = c.S('g', {}, g);
      c.S('rect', { x: 775, y: y - 11, width: 40, height: 22, rx: 6, fill: S.sicaklik }, son);
      yazi(c, son, 825, y + 8, '1 °C', { size: 26, kalin: 700, renk: S.sicaklik, hiza: 'start' });
      yazi(c, son, 905, y + 10, c1, { size: 30, kalin: 700, hiza: 'start' });
      gizle(son);
      return { g, oku, son, ciz: async () => { await c.tween(500, (e) => oku.ciz([690, y], [lerp(690, 760, e), y]), ease.out); await belir(c, son, 300); } };
    };
    const r1 = satir(190, 'Q', 7, 'C'), r2 = satir(300, '2 Q', 14, '2 C');
    gizle(r1.g, r2.g);
    // Formül ve notlar
    const form = renkli(c, svg, 797, 400, [P.C, ' = ', P.m, ' · ', P.c], { size: 36, kalin: 700 });
    const not1 = renkli(c, svg, 797, 320, [P.C, ': kütleye bağlı'], { size: 28, kalin: 600 });
    const not2 = renkli(c, svg, 797, 368, [P.c, ': maddeyi ayırt eder'], { size: 28, kalin: 600 });
    gizle(f.el, eSol, eSag, tSol.g, tSag.g, tn1, tn2, form, not1, not2);

    await par(c.say('Bir cezve ve bir tencere dolusu su, özdeş ısıtıcılarla ısıtılıyor.'), belir(c, [f.el, eSol, eSag, tSol.g, tSag.g], 450));
    await par(c.say('Eşit süre sonra cezvedeki suyun sıcaklığı daha çok artıyor.'),
      c.tween(1600, (e) => {
        const a = lerp(20, 60, e), b = lerp(20, 35, e);
        f.ayar('sol', { sicaklik: a }); f.ayar('sag', { sicaklik: b }); tSol.guncelle(a); tSag.guncelle(b);
      }, ease.linear));
    await c.say('Aynı ısıyla sıcaklık artışını, cismin kütlesi de belirler.');
    await par(c.say('Cismin sıcaklığını 1 °C değiştirmek için gereken ısıya ısı sığası denir.', { speak: 'Cismin sıcaklığını bir derece değiştirmek için gereken ısıya ısı sığası denir.' }), belir(c, tn1, 400));
    parcaKoy(c, tn1, [['ısı sığası: ', S.yazi], ['C', S.yazi]]);
    await c.say('Isı sığası C ile gösterilir; ısı kapasitesi de denir.', { speak: 'Isı sığası büyük C ile gösterilir; ısı kapasitesi de denir.' });
    await par(c.say('Birimi J/°C’tır.', { speak: 'Birimi jul bölü derecedir.' }), belir(c, tn2, 400));
    await c.say('Şimdi 1 kg ve 2 kg bakır blokları birer derece ısıtalım.', { speak: 'Şimdi bir kilogram ve iki kilogram bakır blokları birer derece ısıtalım.' });
    // İstasyonlar bakır bloğa döner.
    await par(belir(c, f.el, 150, 0), belir(c, [tSol.g, tSag.g, tn1, tn2], 150, 0));
    f.ayar('sol', { icerik: 'blok', seviye: 0.5, sicaklik: 20, alev: 1 });
    f.ayar('sag', { icerik: 'blok', seviye: 1, sicaklik: 20, alev: 2 });
    parcaKoy(c, eSol, [['1 kg bakır', S.kutle]]); parcaKoy(c, eSag, [['2 kg bakır', S.kutle]]);
    await belir(c, f.el, 150, 1);
    gizle(r1.g, r2.g);
    await par(c.say('Bir kilogramlık blok için gereken ısıya Q diyelim; ısı sığası C olsun.', { speak: 'Bir kilogramlık blok için gereken ısıya Q diyelim; ısı sığası büyük C olsun.' }),
      (async () => { await belir(c, r1.g, 150); await r1.ciz(); parcaKoy(c, eSol, [['1 kg bakır · C', S.kutle]]); })());
    await par(c.say('İki kilogramlık blok 2 Q ister; ısı sığası 2 C olur.', { speak: 'İki kilogramlık blok iki Q ister; ısı sığası iki büyük C olur.' }),
      (async () => { await belir(c, r2.g, 150); await r2.ciz(); parcaKoy(c, eSag, [['2 kg bakır · 2 C', S.kutle]]); })());
    await c.say('Kütle iki katına çıkınca ısı sığası da iki katına çıkar.');
    await par(c.say('Isı sığası, kütle ile öz ısının çarpımıdır: C = m · c.', { speak: 'Isı sığası, kütle ile öz ısının çarpımıdır: büyük C eşittir m çarpı küçük c.' }), (async () => {
      await belir(c, [r1.g, r2.g], 300, 0);
      form.setAttribute('y', 260);
      await belir(c, form, 400);
    })());
    await par(c.say('Isı sığası kütleye bağlıdır; maddeyi ayırt eden özellik değildir.'), belir(c, not1, 400));
    await par(c.say('Öz ısı ise maddeyi ayırt eden özelliktir.'), belir(c, not2, 400));
    await c.say('Isı sığası büyük cismin sıcaklığı, aynı ısıyla daha az değişir.');

    // Sor: figür ve blok etiketleri kalır; sağ sütunda küçük not.
    c.clearSay();
    const kosul = yazi(c, svg, 797, 300, 'özdeş ısıtıcı, eşit süre', { size: 24, kalin: 600, renk: RENK.soluk });
    gizle(kosul);
    await belir(c, [form, not1, not2], 350, 0);
    await belir(c, kosul, 400);
    await c.choice({
      tag: 'Sor', q: 'Özdeş ısıtıcılarla eşit süre ısıtılan 1 kg ve 2 kg bakır bloklardan hangisinin sıcaklığı daha çok artar?',
      options: ['2 kg’lık; kütlesi daha büyük', 'İkisi eşit; ikisi de bakır', '1 kg’lık; ısı sığası daha küçük'], answer: 2,
      hints: ['İkisi de bakır, yani öz ısıları eşit; ısı sığaları ise kütleleri kadar farklıdır.', 'İkisi de bakır, yani öz ısıları eşit; ısı sığaları ise kütleleri kadar farklıdır.', ''],
      right: 'Evet. Eşit ısıyı alan iki cisimden ısı sığası küçük olan daha çok ısınır.',
    });
    parcaKoy(c, eSol, [['1 kg bakır · C', S.iyi]]);
    const dc = yazi(c, svg, sx, sy + 58, 'daha çok ısınır', { size: 24, kalin: 700, renk: S.sicaklik });
    gizle(dc);
    await par(c.say('Isı sığası küçük olan 1 kg’lık blok daha çok ısınır.', { speak: 'Isı sığası küçük olan bir kilogramlık blok daha çok ısınır.' }), belir(c, dc, 400));
    c.note('C = m · c. Cisme aittir; kütle arttıkça büyür.', 'Isı sığası');
  }

  /* ---- 6. Isı sığasını hesapla ---- */
  async function hesapla(c) {
    const svg = c.svg(1000, 562);
    const k = kap(c, svg, { x: 60, y: 160, w: 140, h: 140, su: 110 });
    const kt = renkli(c, svg, 130, 340, [['250 g ', S.kutle], ['su', S.su]], { size: 26, kalin: 600 });
    const cn = yazi(c, svg, 60, 400, 'c = 4,18 J/g · °C', { size: 24, kalin: 600, hiza: 'start' });
    const kart = cozumKarti(c, svg, { x: 280, y: 140, w: 660 });
    gizle(k.g, kt, cn, kart.g);

    await par(c.say('Ela 250 g suyun ısı sığasını hesaplıyor.', { speak: 'Ela iki yüz elli gram suyun ısı sığasını hesaplıyor.' }), belir(c, [k.g, kt, kart.g], 450));
    await par(c.say('Suyun öz ısısı 4,18 J/g · °C’tır.', { speak: 'Suyun öz ısısı dört virgül on sekiz jul bölü gram derecedir.' }), belir(c, cn, 400));
    await par(c.say('C = m · c olduğundan 250 · 4,18 yazılır.', { speak: 'Büyük C eşittir m çarpı küçük c olduğundan iki yüz elli çarpı dört virgül on sekiz yazılır.' }),
      (async () => {
        await kart.ekle([P.C, ' = ', P.m, ' · ', P.c]);
        await kart.ekle([P.C, ' = ', ['250', S.kutle], ' · 4,18']);
      })());
    await par(c.say('Çarpım 1.045 eder.', { speak: 'Çarpım bin kırk beş eder.' }), kart.ekle([P.C, ' = 1.045']));
    kart.degistir(2, [P.C, ' = ' + sayi(1045, 'J/°C')]);
    await c.say('Isı sığası 1.045 J/°C’tır.', { speak: 'Isı sığası bin kırk beş jul bölü derecedir.' });
    await c.say('Bu su, 1 °C ısınmak için 1.045 J ister.', { speak: 'Bu su, bir derece ısınmak için bin kırk beş jul ister.' });

    // Birlikte çöz: 400 g su
    c.clearSay();
    await belir(c, kart.g, 300, 0); kart.g.remove();
    parcaKoy(c, kt, [['400 g ', S.kutle], ['su', S.su]]);
    k.suKoy(130);
    const kart2 = cozumKarti(c, svg, { x: 280, y: 140, w: 660 });
    gizle(kart2.g);
    await kart2.ekle([P.C, ' = ', P.m, ' · ', P.c], { ms: 0, soluk: false });
    await kart2.ekle([P.C, ' = ', ['400', S.kutle], ' · 4,18'], { ms: 0, soluk: false });
    await kart2.ekle([P.C, ' = ', ['……', RENK.soluk], ' J/°C'], { ms: 0, soluk: false });
    await belir(c, kart2.g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'C kaç J/°C’tır?',
      options: ['16.720', '1.672', '167,2'], answer: 1,
      hints: ['Sonuç, 4,18’in yaklaşık 400 katı olmalı.', '', '400 · 4 = 1.600 ve 400 · 0,18 = 72; ikisini topla.'],
      right: 'Evet. 400 · 4,18 = 1.672.',
    });
    kart2.degistir(2, [P.C, ' = ', [sayi(1672), S.yazi], ' J/°C']);
    await c.say('400 g su 1 °C ısınmak için 1.672 J ister.', { speak: 'Dört yüz gram su bir derece ısınmak için bin altı yüz yetmiş iki jul ister.' });
    await c.say('Kütle arttıkça aynı maddenin ısı sığası da büyür.');
  }

  /* ---- 7. K ve L ---- */
  async function kl(c) {
    const svg = c.svg(1000, 562);
    const gr = dogruGrafigi(c, svg, { o: [110, 430], xSon: [560, 430], ySon: [110, 110], xAd: 'Kütle (g)', yAd: 'Isı sığası (J/°C)' });
    const AK = '#ffb48f', AL = '#9cc2ff';
    const dK = gr.dogru([560, 160], AK), dL = gr.dogru([560, 300], AL);
    const tK = yazi(c, svg, 574, 168, 'K', { size: 28, kalin: 700, hiza: 'start', renk: AK });
    const tL = yazi(c, svg, 574, 308, 'L', { size: 28, kalin: 700, hiza: 'start', renk: AL });
    const mT = yazi(c, svg, 330, 468, 'm', { size: 28, kalin: 700, renk: S.kutle });
    const mCiz = gr.kesik([330, 430], [330, 298], S.kutle);
    const hK = gr.kesik([330, 298], [110, 298], AK), hL = gr.kesik([330, 366], [110, 366], AL);
    const r1 = renkli(c, svg, 640, 220, [['K', S.sicaklik], ': daha çok ısı'], { size: 28, kalin: 600, hiza: 'start' });
    const r2 = renkli(c, svg, 640, 280, [['c', S.yazi], ' büyük: ', ['K', S.sicaklik]], { size: 28, kalin: 600, hiza: 'start' });
    gizle(tK, tL, mT, r1, r2);

    await par(c.say('Grafikte K ve L maddelerinin ısı sığası, kütleyle çizilmiş.'),
      (async () => { await par(dK.ciz(800), dL.ciz(800)); await belir(c, [tK, tL], 300); })());
    await par(c.say('Kütle ekseninde bir m değeri seçelim; ikisi eşit kütleli olsun.', { speak: '[thoughtful] Kütle ekseninde bir m değeri seçelim; ikisi eşit kütleli olsun.' }), belir(c, [mT, mCiz], 500));
    await par(c.say('Eşit kütlede K’nin ısı sığası, L’ninkinden büyüktür.'), belir(c, [hK, hL], 500));
    await c.say('Isı sığası, 1 °C için gereken ısıdır.', { speak: 'Isı sığası, bir derece için gereken ısıdır.' });
    await par(c.say('Demek ki K’yi 1 °C ısıtmak daha çok ısı ister.', { speak: 'Demek ki K’yi bir derece ısıtmak daha çok ısı ister.' }), belir(c, r1, 400));
    await par(c.say('Kütle eşitse C büyük olanın öz ısısı da büyüktür.', { speak: 'Kütle eşitse büyük C büyük olanın öz ısısı da büyüktür.' }), belir(c, r2, 400));
    await c.say('K’nin öz ısısı, L’ninkinden büyüktür.');
  }

  /* ---- 8. Öz ısı mı, ısı sığası mı? ---- */
  const KARTLAR = [
    { ust: 'Maddenin cinsine bağlıdır;', alt: 'maddeyi tanıtır.', ad: 'cinsine bağlı', kutu: 0,
      neden: 'Evet. Öz ısı maddeyi ayırt eden özelliktir.', ipucu: 'Maddeyi ayırt eden hangisiydi?' },
    { ust: 'Cismin kütlesine bağlıdır.', alt: '', ad: 'kütleye bağlı', kutu: 1,
      neden: 'Evet. C = m · c; kütle arttıkça C artar.', ipucu: 'Kütleyle birlikte büyüyen hangisiydi?' },
    { ust: 'Birimi J/g · °C’tır.', alt: '', ad: 'J/g · °C', kutu: 0,
      neden: 'Evet. Birim kütle başına ısıdır.', ipucu: 'Gram başına ısı hangisinin birimine girer?' },
    { ust: 'Birimi J/°C’tır.', alt: '', ad: 'J/°C', kutu: 1,
      neden: 'Evet. Cismin 1 °C değişimi için gereken ısıdır.', ipucu: 'Kütle birimi içermeyen birim hangisinin?' },
    { ust: '1 kg bakırda ve 2 kg bakırda', alt: 'aynıdır.', ad: 'aynı madde', kutu: 0,
      neden: 'Evet. İkisi de bakır; öz ısı değişmez.', ipucu: 'Madde aynıysa değişmeyen hangisi?' },
    { ust: '2 kg bakırda, 1 kg bakırdakinin', alt: 'iki katıdır.', ad: 'iki katı', kutu: 1,
      neden: 'Evet. Kütle iki katına çıkınca C de iki katına çıkar.', ipucu: 'Kütleyle iki katına çıkan hangisi?' },
  ];
  async function sinifSahnesi(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 90, ad: 'Öz ısı' }, { x: 520, ad: 'Isı sığası' }], sayac = [0, 0];
    const ust = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, ust, k.x, 70, 390, 180, { rx: 14 }); yazi(c, ust, k.x + 195, 110, k.ad, { size: 28, kalin: 700 }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 300, 700, 120, { rx: 14 });
      if (k.alt) { yazi(c, kart, 500, 354, k.ust, { size: 26, kalin: 600 }); yazi(c, kart, 500, 392, k.alt, { size: 26, kalin: 600 }); }
      else yazi(c, kart, 500, 372, k.ust, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    /* Kart yerinde küçülüp söner; kısa adı kutusunun içindeki listeye yazılır. */
    const yerlestir = async (k) => {
      const el = kart, kx = KUTU[k.kutu].x + 195, ky = 160 + sayac[k.kutu] * 38;
      sayac[k.kutu] += 1;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${360 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const ad = yazi(c, ust, kx, ky, k.ad, { size: 24, kalin: 600, renk: RENK.soluk });
      gizle(ad);
      await belir(c, ad, 300);
    };
    gizle(ust);

    await par(c.say('Şimdi özellikleri doğru kavramla eşleştirelim.'), belir(c, ust, 400));
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR,
      soru: () => 'Bu özellik hangisine aittir?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    const alt1 = yazi(c, ust, 285, 290, 'maddenin özelliği', { size: 26, kalin: 700, renk: S.yazi });
    const alt2 = yazi(c, ust, 715, 290, 'cismin özelliği', { size: 26, kalin: 700, renk: S.yazi });
    gizle(alt1, alt2);
    await par(c.say('Öz ısı maddenin, ısı sığası cismin özelliğidir.', { speak: '[short pause] Öz ısı maddenin, ısı sığası cismin özelliğidir.' }), belir(c, [alt1, alt2], 500));
  }

  Ders.start({
    id: 'enerji-b2', kicker: 'Konu B · Isının hesabı', title: 'Öz ısı ve ısı sığası', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Öz ısı ve ısı sığası',
      hook: 'Yaz günü öğlen kumsalda kum ayağını yakarken deniz neden hâlâ serin?',
      button: 'Derse başla ›',
    },
    goals: ['Aynı ısıyı alan maddelerin sıcaklığının aynı kadar artmadığını gösterir.', 'Öz ısıyı maddeyi ayırt eden özellik olarak tanımlar.', 'Isı sığasını C = m · c ile hesaplar.', 'Öz ısı ile ısı sığasını birbirinden ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Sıcaklık ölçeklerini ve ısı alan maddenin iç enerjisini hatırla.', run: hatirla },
      { title: 'Kum ve deniz', goal: 'Aynı ısıyı alan iki maddenin sıcaklığının farklı arttığını gör.', run: kumDeniz },
      { title: 'Aynı ısı, aynı kütle, iki madde', goal: 'Aynı koşulda su ile zeytinyağının sıcaklığını karşılaştır.', run: ayniIsi },
      { title: 'Öz ısı: bir kilogram, bir derece', goal: 'Öz ısının maddeye ait bir özellik olduğunu gör.', run: ozIsi },
      { title: 'Isı sığası: cismin ısı sığası', goal: 'Isı sığasının kütleyle büyüdüğünü gör.', run: isiSigasi },
      { title: 'Isı sığasını hesapla', goal: 'C = m · c ile ısı sığasını hesapla.', run: hesapla },
      { title: 'K ve L: hangisi daha çok ısı ister?', goal: 'Grafikten ısı sığası ve öz ısıyı karşılaştır.', run: kl },
      { title: 'Öz ısı mı, ısı sığası mı?', goal: 'Özellikleri doğru kavramla eşleştir.', run: sinifSahnesi },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '1 kg bakır ve 2 kg bakır için hangisi doğrudur?',
        options: ['Isı sığaları eşit; 2 kg’ın öz ısısı iki katıdır', 'İkisi de 2 kg’da iki katıdır', 'Öz ısıları eşit; 2 kg’ın ısı sığası iki katıdır'], answer: 2,
        why: ['Öz ısı maddeye aittir, kütleyle değişmez; ısı sığası ise kütleyle büyür.', 'Öz ısı maddeyi tanıtır; madde aynı olduğundan iki katına çıkmaz.', 'Öz ısı aynı maddede sabittir; C = m · c olduğundan kütle iki katına çıkınca C de iki katına çıkar.'], scene: 4 },
      { q: 'Ela 500 g suyun ısı sığasını hesaplıyor. Suyun öz ısısı 4,18 J/g · °C ise C kaç J/°C’tır?',
        options: ['209', '2.090', '20.900'], answer: 1,
        why: ['Virgül yanlış yerde; 500 · 4,18 = 2.090 olur, 209 değil.', 'C = m · c = 500 · 4,18 = 2.090 J/°C.', 'Bir sıfır fazla yazılmış; 500 · 4,18 = 2.090 eder.'], scene: 5 },
      { q: 'Özdeş ısıtıcılarla eşit süre ısıtılan eşit kütleli A ve B maddelerinden A’nın sıcaklığı daha çok arttı. Hangisi doğrudur?',
        options: ['A’nın öz ısısı B’ninkinden küçüktür', 'A’nın öz ısısı B’ninkinden büyüktür', 'Öz ısıları eşittir'], answer: 0,
        why: ['Eşit ısıda daha çok ısınan maddenin öz ısısı daha küçüktür.', 'Öz ısısı büyük madde aynı ısıyla daha az ısınır; A daha çok ısındı.', 'Öz ısıları eşit olsaydı sıcaklık artışları da eşit olurdu.'], scene: 3 },
      { q: 'Ekim ayında hava soğurken deniz suyu hâlâ yaz kadar sıcak. Neden?',
        options: ['Denizin ısı sığası küçük; sıcaklığı hızla değişir', 'Denizin kütlesi küçük olduğu için ısı sığası büyüktür', 'Denizin ısı sığası büyük; sıcaklığı yavaş değişir'], answer: 2,
        why: ['Isı sığası küçük olsaydı deniz de hava gibi çabuk soğurdu.', 'Kütle küçükse ısı sığası da küçük olur; denizin kütlesi ise çok büyüktür.', 'Isı sığası büyük cismin sıcaklığı, aynı ısı alışverişinde az değişir.'], scene: 4 },
      { q: 'Hangisi bir maddeyi ayırt eden özelliktir?',
        options: ['Kütle', 'Öz ısı', 'Isı sığası'], answer: 1,
        why: ['Kütle her maddede farklı miktarda olabilir; maddeyi tanıtmaz.', 'Öz ısı maddenin cinsine bağlıdır; maddeyi ayırt eder.', 'Isı sığası kütleye de bağlıdır; aynı maddenin farklı parçalarında farklıdır.'], scene: 3 },
    ],
    summary: ['Aynı ısıyı alan maddelerin sıcaklığı aynı kadar artmaz; bunu öz ısı anlatır.', 'Isı sığası, cismin sıcaklığını 1 °C değiştirmek için gereken ısıdır: C = m · c.', '<b>Öz ısı maddenin, ısı sığası cismin özelliğidir.</b>'],
    nextLesson: { href: 'b3-deneyle-modele.html', label: 'Sonraki: Deneyle modele ›' },
  });
})();
