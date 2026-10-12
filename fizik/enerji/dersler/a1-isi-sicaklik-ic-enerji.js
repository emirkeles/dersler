/* A1 — Isı, sıcaklık, iç enerji: üç ayrı şey
   Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.
   Senaryo: plan/fizik/enerji/senaryolar/A-ic-enerji-isi-sicaklik.md. Sıra plan/KURALLAR.md 3.2'ye göredir.
   Temanın ilk dersidir; "Hatırla" sahnesi yoktur. Tanecik sayısı ve iç enerji çubuğu şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, tablo, tahminAl, sinifla } = window.KIT;
  const { motor, kap, pencere, termometre, cubuk, isiOku, tanim } = window.KIT_A;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, ic: RENK.icEnerji, kutle: RENK.kutle };
  const etiket = (ad, T) => [ad + ' · ', [T + ' °C', S.sicaklik]];

  /* Hava durumu ekranı ve sunucunun cümlesi (sahne 1 ve 6). */
  function ekran(c, p) {
    const g = c.S('g', {}, p);
    kutu(c, g, 90, 90, 380, 240, { rx: 16 });
    c.S('circle', { cx: 210, cy: 210, r: 44, fill: S.sicaklik }, g);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      cizgi(c, g, [210 + 58 * Math.cos(a), 210 + 58 * Math.sin(a)], [210 + 78 * Math.cos(a), 210 + 78 * Math.sin(a)], S.sicaklik, 5);
    }
    yazi(c, g, 370, 228, '30 °C', { size: 48, kalin: 700 });
    return g;
  }
  function cumleKarti(c, p, y) {
    const g = c.S('g', {}, p);
    kutu(c, g, 70, y, 420, 80, { rx: 14 });
    const t = renkli(c, g, 280, y + 49, ['“Yarın ', ['ısı', RENK.yazi], ' 30 derece olacak.”'], { size: 26, kalin: 600 });
    return { g, t };
  }

  /* ---- 1. "Yarın ısı 30 derece" ---- */
  async function havaDurumu(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const tv = ekran(c, svg), kart = cumleKarti(c, svg, 360);
    const adlar = [['sıcaklık', S.sicaklik], ['ısı', S.isi], ['iç enerji', S.ic]].map(([ad, renk], i) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, 560, 110 + i * 110, 360, 90, { rx: 14 });
      yazi(c, g, 740, 166 + i * 110, ad, { size: 32, kalin: 700, renk });
      return g;
    });
    const su = c.S('g', {}, svg);
    kap(c, su, { x: 425, y: 60, w: 150, h: 170, su: 110, etiket: ['bir bardak su'] });
    pencere(c, su, mot, { cx: 500, cy: 400, r: 110, n: 16, T: 20, bag: [500, 300] });
    gizle(tv, kart.g, su, ...adlar);

    await par(c.say('Hava durumunda sık sık şu cümleyi duyarsın.'), belir(c, [tv, kart.g], 450));
    await c.say('Günlük dilde ısı ile sıcaklığı birbirinin yerine kullanırız.');
    await c.say('Fizikte bunlar ayrı kavramlardır; yanlarında bir üçüncüsü daha var.');
    await par(c.say('Sıcaklık, ısı ve iç enerji: üç kelime, üç ayrı şey.'), (async () => { for (const g of adlar) await belir(c, g, 350); })());
    await c.say('Üçünü ayırmak için maddenin içine bakmamız gerekiyor.');
    await belir(c, [tv, kart.g, ...adlar], 400, 0);
    [tv, kart.g, ...adlar].forEach((g) => g.remove());
    await par(c.say('Bütün maddeler gözle görülmeyen taneciklerden oluşur.'), belir(c, su, 500));
    await c.say('Bu tanecikler hiç durmaz; sürekli hareket eder.');
    const son = yazi(c, svg, 500, 546, 'hareket eden tanecik → hareket enerjisi', { size: 26, kalin: 700 });
    gizle(son);
    await par(c.say('Hareket eden her taneciğin bir hareket enerjisi vardır.'), belir(c, son, 400));
  }

  /* ---- 2. Sıcaklık: tanecikler ne kadar hareketli? ---- */
  async function sicaklik(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg), sol = c.S('g', {}, g1), sag = c.S('g', {}, g1);
    kap(c, sol, { x: 170, y: 110, su: 100, etiket: etiket('soğuk su', 10) });
    termometre(c, sol, { x: 275, y: 268, T: 10 });
    pencere(c, sol, mot, { cx: 245, cy: 430, n: 10, T: 10, tohum: 1 });
    kap(c, sag, { x: 680, y: 110, su: 100, etiket: etiket('sıcak su', 80) });
    termometre(c, sag, { x: 785, y: 268, T: 80 });
    pencere(c, sag, mot, { cx: 755, cy: 430, n: 10, T: 80, tohum: 2 });
    const ara1 = yazi(c, g1, 500, 420, 'aynı sayıda tanecik,', { size: 24, kalin: 600, renk: RENK.soluk });
    const ara2 = yazi(c, g1, 500, 452, 'farklı hareket', { size: 24, kalin: 600, renk: RENK.soluk });
    const tn = tanim(c, g1, 60, 'sıcaklık', S.sicaklik, 'taneciklerin ne kadar hareketli olduğu');
    gizle(sol, sag, ara1, ara2);

    await par(c.say('Ela bir kaba soğuk su koyuyor: termometre 10 °C gösteriyor.', { speak: 'Ela bir kaba soğuk su koyuyor: termometre on derece gösteriyor.' }), belir(c, sol, 450));
    await c.say('Taneciklere yakından bakalım: yerlerinde yavaşça titreşiyorlar.');
    await par(c.say('İkinci kapta aynı miktarda sıcak su var: 80 °C.', { speak: 'İkinci kapta aynı miktarda sıcak su var: seksen derece.' }), belir(c, sag, 450));
    await c.say('Buradaki tanecikler çok daha hızlı hareket ediyor.');
    await par(c.say('İki kapta tanecik sayısı aynı; değişen yalnızca hareketleri.'), belir(c, [ara1, ara2], 400));
    await c.say('Tanecik ne kadar hareketliyse hareket enerjisi o kadar büyüktür.');
    await par(c.say('Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.'), belir(c, tn, 400));
    await c.say('Sıcaklığı termometreyle ölçeriz; günlük birimi derece santigrattır.');
    await c.say('Bilimde kullanılan uluslararası birimi ise kelvindir.');

    // Sor: termometre yok, yalnızca tanecikler.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 170, y: 110, su: 70, harf: 'P' });
    kap(c, g2, { x: 680, y: 110, su: 70, harf: 'R' });
    const tP = termometre(c, g2, { x: 275, y: 268, T: 60, deger: true }), tR = termometre(c, g2, { x: 785, y: 268, T: 20, deger: true });
    pencere(c, g2, mot, { cx: 245, cy: 420, n: 6, T: 60, tohum: 3 });
    pencere(c, g2, mot, { cx: 755, cy: 420, n: 6, T: 20, tohum: 4 });
    gizle(g2, tP.g, tR.g);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'P ve R kaplarında aynı miktarda su var. Hangisinin sıcaklığı daha yüksek?',
      options: ['R; tanecikleri daha sakin', 'P; tanecikleri daha hareketli', 'İkisi aynı; tanecik sayıları eşit'], answer: 1,
      hints: ['Sıcaklık, taneciklerin hareketliliğini gösterir; hangisi daha hızlı titreşiyor?', '', 'Tanecik sayısı sıcaklığı belirlemez; harekete bak.'],
      right: 'Evet. Tanecikler ne kadar hareketliyse sıcaklık o kadar yüksek.',
    });
    await belir(c, [tP.g, tR.g], 400);
    await c.say('Termometre de aynısını söylüyor: P kabı daha sıcak.');
    c.note('Taneciklerin ortalama hareket enerjisinin göstergesi. Termometreyle ölçülür.', 'Sıcaklık');
  }

  /* ---- 3. İç enerji: hepsinin toplamı ---- */
  async function icEnerji(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const bardak = c.S('g', {}, svg), kova = c.S('g', {}, svg);
    kap(c, bardak, { x: 150, y: 170, w: 100, h: 110, su: 70, etiket: etiket('bardak', 20) });
    pencere(c, bardak, mot, { cx: 200, cy: 430, r: 70, n: 4, T: 20, tohum: 5 });
    kap(c, kova, { x: 600, y: 80, w: 260, h: 200, su: 150, etiket: etiket('kova', 20) });
    pencere(c, kova, mot, { cx: 730, cy: 440, r: 100, n: 24, T: 20, tohum: 6 });
    const cB = cubuk(c, svg, { x: 390, y: 410, etiket: 'bardak' }), cK = cubuk(c, svg, { x: 390, y: 462, etiket: 'kova' });
    const tn = tanim(c, svg, 50, 'iç enerji', S.ic, 'bütün taneciklerin toplam enerjisi');
    gizle(bardak, kova, cB.g, cK.g);

    await par(c.say('Şimdi aynı sıcaklıkta bir bardak ve bir kova su düşün.'), belir(c, [bardak, kova], 500));
    await c.say('Sıcaklık aynı: iki kapta da tanecikler aynı hareketlilikte.');
    await c.say('Ama kovada çok daha fazla tanecik var.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bütün taneciklerin enerjisini toplasak hangisinde toplam daha büyük çıkar?',
      options: ['Kovada; tanecik sayısı çok daha fazla', 'Bardakta; su daha az', 'İkisinde eşit; sıcaklıkları aynı'], answer: 0,
      hints: ['', 'Su az olunca toplanacak tanecik de azalır.', 'Sıcaklık tanecik başına hareketi söyler; toplam için tanecik sayısı da gerekir.'],
      right: 'Evet. Aynı hareketlilikte çok daha fazla tanecik var.',
    });
    await belir(c, [cB.g, cK.g], 300);
    await par(cB.git(c, 40), cK.git(c, 220));
    await c.say('Toplam, kovada çok daha büyük çıkıyor.');
    await par(c.say('Bir maddedeki bütün taneciklerin toplam enerjisine iç enerji denir.'), belir(c, tn, 400));
    await c.say('Bu toplama taneciklerin hareket enerjisi girer.');
    await c.say('Taneciklerin birbirini çekip itmesinden gelen enerji de girer.');
    await c.say('Sıcak ya da soğuk, her maddenin bir iç enerjisi vardır.');
    c.note('Bütün taneciklerin toplam enerjisi. Her maddenin iç enerjisi vardır.', 'İç enerji');
  }

  /* Elin şeması: yuvarlatılmış kutu ve etiketi. */
  function elKutu(c, p, x) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y: 180, width: 200, height: 130, rx: 40, fill: RENK.yuzey, stroke: '#c3cbea', 'stroke-width': 3 }, g);
    renkli(c, g, x + 100, 346, etiket('el', 33), { size: 22, kalin: 600 });
    return g;
  }

  /* ---- 4. Isı: yoldaki enerji ---- */
  async function isi(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    kap(c, g1, { x: 350, y: 180, w: 110, h: 130, su: 100, etiket: etiket('çay', 70) });
    const el = elKutu(c, g1, 660);
    const pC = pencere(c, g1, mot, { cx: 380, cy: 455, r: 70, n: 8, T: 70, tohum: 7 });
    const pE = pencere(c, g1, mot, { cx: 610, cy: 455, r: 70, n: 8, T: 33, tohum: 8 });
    const okI = isiOku(c, g1, [405, 150], [580, 150]);
    const tn = tanim(c, g1, 60, 'ısı', S.isi, 'sıcaklık farkı yüzünden aktarılan enerji');
    gizle(g1);

    await par(c.say('Ela soğuk bir günde sıcak çay bardağını avucuna alıyor.'), belir(c, g1, 450));
    await par(c.say('Çay 70 °C, Ela’nın eli yaklaşık 33 °C.', { speak: 'Çay yetmiş derece, Ela’nın eli yaklaşık otuz üç derece.' }),
      c.tween(700, (e) => el.setAttribute('transform', `translate(${lerp(0, -180, e)},0)`), ease.inOut));
    await c.say('İkisi birbirine değiyor ve sıcaklıkları farklı.');
    await par(c.say('Bu durumda sıcak olandan soğuk olana enerji aktarılır.'), belir(c, okI.g, 500));
    await par(c.say('Çayın tanecikleri biraz yavaşlıyor.'), pC.isin(c, 62, 1500));
    await par(c.say('Elin tanecikleri biraz hızlanıyor.'), pE.isin(c, 38, 1500));
    await par(c.say('Sıcaklık farkı yüzünden aktarılan bu enerjiye ısı denir.'), belir(c, tn, 400));
    await c.say('Isı hep sıcaklığı yüksek olandan düşük olana aktarılır.');
    await par(c.say('Isı bir maddenin içinde durmaz; yalnızca aktarılırken vardır.'), belir(c, okI.g, 400, 0));
    await c.say('Bu yüzden “çayın ısısı” denmez; çayın sıcaklığı ve iç enerjisi vardır.');
    await c.say('Isı bir enerji olduğu için birimi joule’dür.', { speak: 'Isı bir enerji olduğu için birimi juldür.' });

    // Sor: soğuk kutu ve el.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 350, y: 180, w: 110, h: 130, su: 110, etiket: etiket('kutu', 5) });
    elKutu(c, g2, 480);
    const pK = pencere(c, g2, mot, { cx: 380, cy: 455, r: 70, n: 8, T: 10, tohum: 9 });
    const pE2 = pencere(c, g2, mot, { cx: 610, cy: 455, r: 70, n: 8, T: 33, tohum: 10 });
    const ok2 = isiOku(c, g2, [580, 150], [405, 150]);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Ela buzdolabından çıkan 5 °C’luk kutuyu tutuyor. Isı hangi yönde aktarılır?',
      options: ['Kutudan ele', 'Hiçbir yöne; kutu soğuk olduğu için ısı aktarılmaz', 'Elden kutuya'], answer: 2,
      hints: ['Isı, sıcaklığı yüksek olandan düşük olana aktarılır; hangisi daha sıcak?', 'Kutu soğuktur ama elden daha soğuktur: sıcaklık farkı var.', ''],
      right: 'Evet. El daha sıcak; ısı elden kutuya aktarılır.',
    });
    await par(belir(c, ok2.g, 500), pE2.isin(c, 28, 1200), pK.isin(c, 16, 1200));
    await c.say('El ısı verdiği için kutu “soğuk” hissedilir.');
    c.clearSay();
    await tahminAl(c, { tag: 'Tahmin et', q: 'Çaydan ısı alan elin iç enerjisi sence nasıl değişti?', options: ['Arttı', 'Azaldı', 'Değişmedi'] });
    await c.say('Bu tahmini aklında tut; cevabını bir sonraki derste bulacağız.');
    c.note('Sıcaklık farkı yüzünden aktarılan enerji. Sıcaktan soğuğa; birimi joule.', 'Isı');
  }

  /* Boşluklu cümle kartı: parçalar renkli() biçimindedir. */
  function cumle(c, p, parcalar) {
    const g = c.S('g', {}, p);
    kutu(c, g, 90, 380, 820, 90, { rx: 14 });
    const t = renkli(c, g, 500, 434, parcalar, { size: 24, kalin: 600 });
    return { g, t };
  }

  /* ---- 5. Üç kelime yan yana ---- */
  async function ucKelime(c) {
    const svg = c.svg(1000, 562);
    const tb = tablo(c, svg, { x: 160, y: 70, satir: 3, h: 62, size: 24, sutunlar: [{ ad: 'Kavram', w: 220 }, { ad: 'Ne?', w: 460 }] });
    tb.yaz(0, 0, 'sıcaklık', S.sicaklik); tb.yaz(0, 1, 'taneciklerin hareketliliği');
    tb.yaz(1, 0, 'iç enerji', S.ic); tb.yaz(1, 1, 'taneciklerin toplam enerjisi');
    tb.yaz(2, 0, 'ısı', S.isi); tb.yaz(2, 1, 'aktarılan enerji');
    gizle(tb.g);

    await par(c.say('Üç kavramı yan yana koyalım.'), belir(c, tb.g, 400));
    await par(c.say('Sıcaklık, taneciklerin ne kadar hareketli olduğunu söyler.'), tb.goster(0));
    await par(c.say('İç enerji, bütün taneciklerin toplam enerjisidir.'), tb.goster(1));
    await par(c.say('Isı ise bir cisimden ötekine aktarılan enerjidir.'), tb.goster(2));
    await c.say('Şimdi bu üç kelimeyi cümlelerde doğru yere koyalım.');

    // Çözülmüş örnek.
    const k1 = cumle(c, svg, ['Tost makinesi çalışınca mutfağın ', ['……', RENK.soluk], ' yükseldi.']);
    gizle(k1.g);
    await belir(c, k1.g, 400);
    await c.say('Mutfakta yükselen şey termometrenin gösterdiği değerdir.');
    window.KIT.parcaKoy(c, k1.t, ['Tost makinesi çalışınca mutfağın ', ['sıcaklığı', S.sicaklik], ' yükseldi.']);
    await c.say('O hâlde boşluğa “sıcaklığı” yazılır.');

    // Birlikte çöz: ilk boşluk dolu gelir.
    c.clearSay();
    await belir(c, k1.g, 300, 0); k1.g.remove();
    const k2 = cumle(c, svg, ['Çaydan elime ', ['ısı', S.isi], ' geçti ve elimin ', ['……', RENK.soluk], ' arttı.']);
    gizle(k2.g);
    await belir(c, k2.g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'İkinci boşluğa hangisi yazılır?', options: ['ısısı', 'sıcaklığı', 'soğukluğu'], answer: 1,
      hints: ['Isı aktarılır; bir cismin “ısısı” artmaz. Elde artan, termometrenin göstereceği şeydir.', '', 'Soğukluk diye bir şey aktarılmaz ve artmaz; aktarılan enerji ısıdır.'],
      right: 'Evet. Elde artan şey sıcaklıktır.',
    });
    window.KIT.parcaKoy(c, k2.t, ['Çaydan elime ', ['ısı', S.isi], ' geçti ve elimin ', ['sıcaklığı', S.sicaklik], ' arttı.']);
    await c.say('Çaydan ele geçen ısıdır; elde artan sıcaklıktır.');
    c.note('Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.', 'Üç kavram');
  }

  /* ---- 6. Doğru mu, yanlış mı? ---- */
  const KARTLAR = [
    { ust: '“Yarın İstanbul’da hava sıcaklığının', alt: 'artması bekleniyor.”', ad: 'hava sıcaklığı', kutu: 0,
      neden: 'Evet. Hava için termometrenin gösterdiği değer sıcaklıktır.', ipucu: 'Havada ölçülen şey sıcaklıktır; cümle bunu söylüyor.' },
    { ust: '“Çocuğun vücut ısısı', alt: '39 °C olmuş.”', ad: 'vücut ısısı', kutu: 1,
      neden: 'Evet. Dereceyle ölçülen sıcaklıktır: “vücut sıcaklığı 39 °C”.', ipucu: '39 °C termometreden okunur; termometre neyi ölçer?' },
    { ust: '“Soba yanınca', alt: 'çevresine ısı verir.”', ad: 'sobanın verdiği ısı', kutu: 0,
      neden: 'Evet. Sıcak sobadan soğuk odaya aktarılan enerji ısıdır.', ipucu: 'Sobadan odaya bir şey aktarılıyor; aktarılan enerjinin adı ne?' },
    { ust: '“Isı termometreyle', alt: 'ölçülür.”', ad: 'termometre', kutu: 1,
      neden: 'Evet. Termometre sıcaklığı ölçer.', ipucu: 'Termometre taneciklerin hareketliliğini gösterir; bu hangi kavram?' },
    { ust: '“Pencereyi açınca asfaltın', alt: 'sıcaklığı içeri girdi.”', ad: 'asfalt', kutu: 1,
      neden: 'Evet. İçeri giren, aktarılan enerjidir: ısı.', ipucu: 'Bir yerden bir yere geçen şey sıcaklık olabilir mi?' },
    { ust: '“Öğle güneşinde balkon demirinin', alt: 'ısısı havanınkinden fazlaydı.”', ad: 'balkon demiri', kutu: 1,
      neden: 'Evet. Maddenin ısısı olmaz; demirin sıcaklığı havanınkinden yüksekti.', ipucu: 'Isı bir maddenin içinde durmaz; karşılaştırılan şey ne olmalı?' },
  ];
  async function dogruYanlis(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 80, ad: 'Doğru kullanım' }, { x: 520, ad: 'Yanlış kullanım' }], sayac = [0, 0];
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

    await par(c.say('Şimdi günlük hayattan altı cümleye bakalım.'), belir(c, ust, 400));
    await c.say('Her biri için karar ver: kelime doğru mu kullanılmış?');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR,
      soru: () => 'Bu cümlede kavram doğru mu kullanılmış?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });

    // Sunucunun cümlesine dönüş.
    await belir(c, ust, 400, 0.45);
    const son = c.S('g', {}, svg);
    kutu(c, son, 250, 340, 500, 110, { rx: 14 });
    const cum = renkli(c, son, 500, 405, ['“Yarın ', ['ısı', RENK.yazi], ' 30 derece olacak.”'], { size: 28, kalin: 600 });
    gizle(son);
    await par(c.say('Sunucunun cümlesine dönelim.'), belir(c, son, 450));
    window.KIT.parcaKoy(c, cum, ['“Yarın ', ['ısı', S.isi], ' 30 derece olacak.”']);
    await c.say('Otuz derece termometreden okunur: yanlış kelime “ısı”dır.');
    await belir(c, cum, 250, 0);
    window.KIT.parcaKoy(c, cum, ['“Yarın ', ['sıcaklık', S.sicaklik], ' 30 derece olacak.”']);
    await par(c.say('Doğrusu şudur: yarın sıcaklık 30 derece olacak.', { speak: 'Doğrusu şudur: yarın sıcaklık otuz derece olacak.' }), belir(c, cum, 400));
    await c.say('Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.');
  }

  Ders.start({
    id: 'enerji-a1', kicker: 'Konu A · İç enerji, ısı, sıcaklık', title: 'Isı, sıcaklık, iç enerji: üç ayrı şey', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Isı, sıcaklık, iç enerji: üç ayrı şey',
      hook: 'Hava durumu sunucusu “yarın ısı 30 derece olacak” dedi; bu cümlede yanlış olan ne?',
      button: 'Derse başla ›',
    },
    goals: ['Sıcaklığı taneciklerin hareketliliğiyle açıklar.', 'İç enerjinin bütün taneciklerin toplam enerjisi olduğunu söyler.', 'Isının aktarılan enerji olduğunu ve yönünü söyler.', 'Günlük cümlelerde ısı ile sıcaklığın doğru kullanımını ayırır.'],
    scenes: [
      { title: '“Yarın ısı 30 derece”', goal: 'Üç kavramı ayırmak için maddenin içine bak.', run: havaDurumu },
      { title: 'Sıcaklık: tanecikler ne kadar hareketli?', goal: 'Sıcaklığın taneciklerin hareketliliğini gösterdiğini gör.', run: sicaklik },
      { title: 'İç enerji: hepsinin toplamı', goal: 'İç enerjinin bütün taneciklerin toplam enerjisi olduğunu gör.', run: icEnerji },
      { title: 'Isı: yoldaki enerji', goal: 'Isının sıcaktan soğuğa aktarılan enerji olduğunu gör.', run: isi },
      { title: 'Üç kelime yan yana', goal: 'Üç kavramı cümlelerde doğru yere koy.', run: ucKelime },
      { title: 'Doğru mu, yanlış mı?', goal: 'Günlük cümlelerde kavramın doğru kullanılıp kullanılmadığına karar ver.', run: dogruYanlis },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Fırından çıkan tepsi mutfak tezgâhına konuyor. Hangisi doğrudur?',
        options: ['Tezgâhtan tepsiye soğukluk aktarılır', 'Tepsiden tezgâha ısı aktarılır', 'Tepsinin ısısı tezgâhın ısısından fazladır'], answer: 1,
        why: ['Soğukluk diye aktarılan bir şey yoktur; aktarılan enerji ısıdır.', 'Isı, sıcaklığı yüksek olan tepsiden düşük olan tezgâha aktarılır.', 'Bir maddenin ısısı olmaz; ısı yalnızca aktarılırken vardır.'], scene: 3 },
      { q: '“Bugün hava çok ısılı, ısı 35 derece” diyen biri hangi kelimeyi kullanmalıydı?',
        options: ['Sıcaklık; dereceyle ölçülen odur', 'İç enerji; hava çok sıcak', 'Kelimesi doğru; ısı dereceyle ölçülür'], answer: 0,
        why: ['Termometreden okunan değer sıcaklıktır.', 'İç enerji toplam enerjidir; dereceyle söylenmez.', 'Isı aktarılan enerjidir; birimi derece değil joule’dür.'], scene: 5 },
      { q: 'Aynı sıcaklıkta bir damla su ile bir sürahi su var. Hangisi doğrudur?',
        options: ['İç enerjileri eşittir; sıcaklıkları aynıdır', 'Damlanın iç enerjisi yoktur; çok küçüktür', 'Sürahinin iç enerjisi daha büyüktür; taneciği daha çoktur'], answer: 2,
        why: ['Sıcaklık tanecik başına hareketi söyler; toplam, tanecik sayısına da bağlıdır.', 'Her maddenin, ne kadar az olursa olsun, bir iç enerjisi vardır.', 'İç enerji bütün taneciklerin toplamıdır; sürahide tanecik çok daha fazladır.'], scene: 2 },
      { q: 'Bir kaptaki suyun tanecikleri eskisinden daha hızlı hareket ediyorsa ne değişmiştir?',
        options: ['Sudaki tanecik sayısı artmıştır', 'Suyun sıcaklığı artmıştır', 'Suyun ısısı artmıştır'], answer: 1,
        why: ['Taneciklerin hızlanması sayılarının değiştiğini göstermez.', 'Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.', 'Suyun ısısı olmaz; artan şey sıcaklığıdır.'], scene: 1 },
      { q: 'Hangi cümlede kavram doğru kullanılmıştır?',
        options: ['Çorbanın ısısı 60 derece', 'Kaşık çorbadan sıcaklık aldı', 'Sıcak çorbadan kaşığa ısı aktarıldı'], answer: 2,
        why: ['Dereceyle söylenen sıcaklıktır; maddenin ısısı olmaz.', 'Aktarılan şey sıcaklık değil, ısıdır.', 'Sıcaktan soğuğa aktarılan enerji ısıdır.'], scene: 3 },
    ],
    summary: ['Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.', 'İç enerji, bütün taneciklerin toplam enerjisidir; ısı, sıcaktan soğuğa aktarılan enerjidir.', '<b>Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.</b>'],
    nextLesson: { href: 'a2-ic-enerji-isiyla-degisir.html', label: 'Sonraki: İç enerji ısıyla değişir, sıcaklıkla izlenir ›' },
  });
})();
