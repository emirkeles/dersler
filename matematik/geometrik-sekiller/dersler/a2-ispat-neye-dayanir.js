/* A2 — İspat doğru bilgilerin üstüne kurulur
   Her ispat doğruluğundan emin olunan bilgilere dayanır; en altta aksiyomlar durur (Öklid geometrisi).
   Tarih şeridi ve Geometri kitabının terimleri ders kitabının yazdığı kadardır (Matematik 9, 1. Kitap, s. 183, 192);
   dört bilim insanı yalnızca adlarıyla anılır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, nokta, gizle, belir, par, ok, cevapla } = window.KIT;
  const { lerp, ease } = Ders;

  /* Taş: içinde yazı olan (ya da boş) kutu. tasi(dx, dy, açı) taşı yerinden oynatır. */
  function tas(c, p, x, y, w, h, metin, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 22;
    const k = kutu(c, g, x, y, w, h, { rx: 8, renk: o.renk });
    const t = metin ? yazi(c, g, x + w / 2, y + h / 2 + size * 0.35, metin, { size, kalin: 600 }) : null;
    const tasi = (dx, dy, rot = 0) => g.setAttribute('transform', `translate(${dx},${dy}) rotate(${rot} ${x + w / 2} ${y + h / 2})`);
    return { g, k, t, tasi };
  }
  const boya = (t, renk) => t.k.setAttribute('stroke', renk);

  /* ---- 1. Havada duran taş ---- */
  async function havadaTas(c) {
    const svg = c.svg(1000, 562);
    const ust = tas(c, svg, 290, 212, 420, 80, 'İç açılar toplamı 180°', { size: 26 });
    ust.k.setAttribute('stroke-dasharray', '8 7'); ust.tasi(0, -140);
    const soru = yazi(c, svg, 500, 300, '?', { size: 64, kalin: 700, renk: RENK.soluk });
    const alt = ['Doğru açı 180°dir', 'İç ters açılar eşittir', 'Bir noktadan tek paralel'].map((m, i) => tas(c, svg, 20 + i * 330, 300, 300, 80, m, { size: 21 }));
    gizle(ust.g, soru, alt.map((a) => a.g));
    await par(c.say('Bu önermeyi ispatlamak istiyoruz; ama altı boş.'), (async () => { await belir(c, ust.g, 400); await belir(c, soru, 300); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu önermeyi ispatlarken neye dayanmalıyız?',
      options: ['Daha çok ölçüme', 'Çoğunluğun görüşüne', 'Doğruluğundan emin olduğumuz bilgilere'], answer: 2,
      hints: ['Ölçüm örnek verir; ispat etmez.', 'Kalabalık da yanılabilir; ispat oy sayısına bakmaz.', ''],
      right: 'İspatın her adımı sağlam bir bilgiye basar.',
    });
    await par(c.say('Doğruluğundan emin olduğumuz üç bilgi geliyor.'), (async () => {
      await belir(c, soru, 250, 0);
      for (const a of alt) { await belir(c, a.g, 350); await c.wait(250); }
    })());
    await par(c.say('Önerme artık havada değil: üç bilgiye oturuyor.'), (async () => {
      await c.tween(800, (e) => ust.tasi(0, lerp(-140, 0, e)), ease.inOut);
      ust.k.removeAttribute('stroke-dasharray'); boya(ust, RENK.iyi);
    })());
    await c.say('Bu üç bilgiyi sonraki derste ispatta kullanacağız.');
  }

  /* ---- 2. Zincir nerede biter? ---- */
  async function zincir(c) {
    const svg = c.svg(1000, 562);
    tas(c, svg, 330, 24, 340, 58, 'İç açılar toplamı 180°');
    ['doğru açı', 'iç ters açılar', 'tek paralel'].forEach((m, i) => tas(c, svg, 150 + i * 240, 94, 220, 58, m));
    const r2 = c.S('g', {}, svg), r3 = c.S('g', {}, svg), noktalar = c.S('g', {}, svg), aks = c.S('g', {}, svg);
    for (let i = 0; i < 4; i++) { tas(c, r2, 116 + i * 196, 164, 180, 58); tas(c, r3, 116 + i * 196, 234, 180, 58); }
    [318, 338, 358].forEach((y) => nokta(c, noktalar, [500, y], RENK.soluk, 4));
    tas(c, aks, 134, 388, 150, 62, null, { renk: RENK.dis });
    const ornek = tas(c, aks, 300, 388, 400, 62, 'İki noktadan bir doğru geçer', { renk: RENK.dis });
    tas(c, aks, 716, 388, 150, 62, null, { renk: RENK.dis });
    yazi(c, aks, 500, 498, 'Aksiyomlar', { size: 28, kalin: 700, renk: RENK.dis });
    gizle(r2, r3, noktalar, aks);
    await c.say('Üstteki önerme üç bilgiye dayanıyor.');
    await par(c.say('Peki bu üç bilgi neye dayanıyor?'), belir(c, r2, 500));
    await par(c.say('Onlar da başka bilgilere dayanıyor; zincir aşağı iniyor.'), (async () => { await belir(c, r3, 500, 0.6); await belir(c, noktalar, 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Her bilgiyi başka bir bilgiyle ispatlarsak bu zincir nerede biter?',
      options: ['Hiç bitmez, sonsuza kadar iner', 'İspatsız kabul edilen birkaç temel bilgide', 'En çok ölçülen bilgide'], answer: 1,
      hints: ['Sonu olmayan bir zincirle hiçbir şey ispatlanamazdı.', '', 'Ölçüm bir ispatın temeli olamaz.'],
      right: 'Zincir, doğru kabul edilen temel bilgilerde durur.',
    });
    await par(c.say('En altta <b>aksiyomlar</b> durur: ispatsız kabul edilen temel bilgiler.'), belir(c, aks, 600));
    await par(c.say('Örneğin bu bilgi ispatlanmaz; doğru kabul edilir.'), (async () => {
      await c.tween(500, (e) => ornek.k.setAttribute('stroke-width', lerp(2, 5, e)));
      await c.tween(500, (e) => ornek.k.setAttribute('stroke-width', lerp(5, 3, e)));
    })());
    c.note('<b>Aksiyom:</b> ispatsız kabul edilen temel bilgi.<br>İki noktadan bir doğru geçer.', 'Aksiyom', 'gs-aksiyom');
  }

  /* ---- 3. Ölçmeden ispata ---- */
  async function serit(c) {
    const svg = c.svg(1000, 562);
    const Y = 300, X = [140, 330, 500, 670, 860];
    const ad = ['Babil, Mısır', 'Tales', 'Pisagor', 'Platon', 'Öklid'], et = ['arazi ölçümü', 'öncü', 'soyut düşünce', 'akademi', 'Elemanlar'];
    const hat = cizgi(c, svg, [50, Y], [50, Y], RENK.ince, 4);
    const durak = X.map((x, i) => {
      const g = c.S('g', {}, svg);
      nokta(c, g, [x, Y], i === 4 ? RENK.dis : RENK.cizgi, 9);
      yazi(c, g, x, Y - 30, ad[i], { size: 24, kalin: 700 });
      yazi(c, g, x, Y + 46, et[i], { size: 20, kalin: 500, renk: RENK.soluk });
      gizle(g); return g;
    });
    /* arazi: eşit kare parseller; Elemanlar: on üç cilt */
    const parsel = c.S('g', {}, svg), cilt = c.S('g', {}, svg);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) c.S('rect', { x: 95 + i * 30, y: 150 + j * 30, width: 30, height: 30, fill: 'rgba(110,168,255,.07)', stroke: RENK.ince, 'stroke-width': 2 }, parsel);
    for (let i = 0; i < 13; i++) c.S('rect', { x: 796 + i * 10, y: 150, width: 8, height: 60, rx: 2, fill: '#22305f', stroke: RENK.dis, 'stroke-width': 1.5 }, cilt);
    yazi(c, cilt, 860, Y + 76, '13 cilt', { size: 20, kalin: 600, renk: RENK.dis });
    gizle(parsel, cilt);
    const uzat = (x, ms = 700) => { const x0 = +hat.getAttribute('x2'); return c.tween(ms, (e) => hat.setAttribute('x2', lerp(x0, x, e)), ease.inOut); };
    const gel = async (i) => { await uzat(X[i] + (i === 4 ? 60 : 0)); await belir(c, durak[i], 350); };
    await par(c.say('Geometri arazi ölçmekle başladı: Babil’de ve eski Mısır’da.'), (async () => { await gel(0); await belir(c, parsel, 400); })());
    await c.say('Belli işler için kurallar buldular; ayrıntılı doğrulama aramadılar.');
    await par(c.say('Yunan geometrisinin öncüsü Miletli Tales, geometriyi daha anlaşılır kıldı.'), gel(1));
    await par(c.say('Pisagor Okulu’yla soyut düşünce hız kazandı.'), gel(2));
    await par(c.say('Platon bir matematik akademisi kurdu.'), gel(3));
    await par(c.say('O akademide yetişen Öklid, on üç ciltlik <b>Elemanlar</b>’ı yazdı.'), (async () => { await gel(4); await belir(c, cilt, 450); })());
    await c.choice({
      tag: 'Ne değişti?', q: 'Babil ve Mısır’dan Öklid’e uzanan yolda geometri neye dönüştü?',
      options: ['Pratik ölçme kurallarından kuramsal bir yapıya', 'Kuramsal bir yapıdan ölçme kurallarına', 'Hiç değişmedi'], answer: 0,
      hints: ['', 'Başlangıçta yalnızca işe yarayan kurallar vardı; kuram sonra geldi.', 'Arazi ölçen kurallar ile on üç ciltlik bir eser aynı şey değil.'],
      right: 'Geometri zamanla kuramsal ve aksiyomatik bir yapı kazandı.',
    });
    await c.say('Kurallar artık tek tek durmuyor: bir yapının parçaları.');
  }

  /* ---- 4. Geometri bir yapıdır ---- */
  async function yapi(c) {
    const svg = c.svg(1000, 562);
    const W = 150, H = 56;
    const ev = [[185, 400], [345, 400], [505, 400], [665, 400], [265, 334], [425, 334], [585, 334], [345, 268], [505, 268], [425, 202]];
    const dagi = [[60, 90, -18], [300, 60, 12], [560, 100, -8], [800, 70, 20], [120, 250, 25], [420, 230, -22], [720, 260, 10], [80, 420, -12], [380, 440, 16], [760, 430, -20]];
    const taslar = ev.map(([x, y], i) => tas(c, svg, x, y, W, H, i === 9 ? '180°' : null, { size: 24 }));
    const yerlestir = (e) => taslar.forEach((t, i) => t.tasi(lerp(dagi[i][0] - ev[i][0], 0, e), lerp(dagi[i][1] - ev[i][1], 0, e), lerp(dagi[i][2], 0, e)));
    yerlestir(0); gizle(taslar[9].t);
    const baslik = yazi(c, svg, 500, 90, 'Öklid geometrisi', { size: 36, kalin: 700 });
    const altAd = yazi(c, svg, 500, 500, 'aksiyomlar', { size: 24, kalin: 700, renk: RENK.dis });
    const ustAd = yazi(c, svg, 760, 310, 'ispatlanan önermeler', { hiza: 'start', size: 20, kalin: 500, renk: RENK.soluk });
    gizle(baslik, altAd, ustAd);
    await c.say('Tek tek bulunmuş bilgiler başta dağınık duruyordu.');
    await par(c.say('Zamanla kuramsal ve <b>aksiyomatik</b> bir yapı kazandı.'), c.tween(1700, yerlestir, ease.inOut));
    taslar.slice(0, 4).forEach((t) => boya(t, RENK.dis));
    await par(c.say('<b>Öklid geometrisi</b> böyle bir yapıdır: altta aksiyomlar, üstte ispatlananlar.'),
      belir(c, [baslik, altAd, ustAd, taslar[9].t], 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Alttaki taşlardan biri çekilirse üstündeki önerme ne olur?',
      options: ['Yerinde durur', 'Dayanağını kaybeder, düşer'], answer: 1,
      hints: ['Üstteki taş alttakine oturuyordu. Altı boşalınca ne olur?', ''],
      right: 'Bir ispat, dayandığı bilgi kadar sağlamdır.',
    });
    await par(c.say('Dayanağı çekilen önerme ayakta kalamaz.'), (async () => {
      await c.tween(700, (e) => { taslar[7].tasi(-230 * e, 0); taslar[7].g.style.opacity = 1 - 0.75 * e; }, ease.inOut);
      await c.tween(900, (e) => { taslar[9].tasi(-60 * e, 150 * e * e, -50 * e); taslar[9].g.style.opacity = 1 - e; }, ease.in);
    })());
    c.note('<b>Öklid geometrisi:</b> aksiyomlar üstüne kurulu yapı.<br>Her ispat bu yapıya dayanır.', 'Öklid geometrisi', 'gs-oklid');
  }

  /* ---- 5. Katkı sağlayanlar ve Geometri kitabı ---- */
  async function katki(c) {
    const svg = c.svg(1000, 562);
    const isimler = c.S('g', {}, svg);
    const baslik = yazi(c, isimler, 310, 76, 'Geometriye katkı sağlamış bilim insanları', { size: 24, kalin: 600, renk: RENK.soluk });
    const adlar = ['Ebülvefa Buzcani', 'Kuşyar bin Lebban', 'Kadızade-i Rumi', 'Nasirüddin Tusi']
      .map((ad, i) => tas(c, isimler, 40 + (i % 2) * 280, 120 + Math.floor(i / 2) * 120, 260, 96, ad));
    const kitap = c.S('g', {}, svg);
    c.S('rect', { x: 668, y: 110, width: 244, height: 310, rx: 6, fill: '#22305f', stroke: RENK.dis, 'stroke-width': 3 }, kitap);
    cizgi(c, kitap, [694, 112], [694, 418], RENK.dis, 2);
    cizgi(c, kitap, [730, 250], [880, 250], RENK.dis, 2);
    yazi(c, kitap, 804, 226, 'Geometri', { size: 38, kalin: 700 });
    yazi(c, kitap, 804, 300, '1936–1937', { size: 24, kalin: 600, renk: RENK.dis });
    const yazar = yazi(c, svg, 790, 466, 'Mustafa Kemal Atatürk', { size: 22, kalin: 600 });
    /* Eşleşme satırı: solda eski terim, sağda kitabın ürettiği karşılık ('?' ise sorulur). */
    const satir = (i, eski, yeni) => {
      const g = c.S('g', {}, svg), y = 96 + i * 92;
      tas(c, g, 14, y, 392, 66, eski, { size: 18 });
      ok(c, g, [412, y + 33], [436, y + 33], RENK.soluk, 3);
      const sag = tas(c, g, 444, y, 200, 66, yeni, { size: 21, renk: RENK.dis });
      gizle(g); return { g, sag };
    };
    const r = [
      satir(0, 'müselles-i mütesâviyü’l-adlâ', 'eşkenar üçgen'), satir(1, 're’sen mütekabil zâviye', 'ters açı'),
      satir(2, 'kaim zaviyeli müselles', '?'), satir(3, 'zaviyetan-ı mütekabiletan-ı dahiletan', '?'),
    ];
    gizle(baslik, adlar.map((a) => a.g), kitap, yazar);
    await par(c.say('Türk kültür ve medeniyetinde geometriye katkı sağlamış dört bilim insanı.'), (async () => {
      await belir(c, baslik, 350);
      for (const a of adlar) { await belir(c, a.g, 350); await c.wait(450); }
    })());
    await c.wait(900);
    await par(c.say('1936–1937’de Atatürk bir <b>Geometri</b> kitabı hazırladı.', { speak: 'Bin dokuz yüz otuz altı, otuz yedi yıllarında Atatürk bir Geometri kitabı hazırladı.' }),
      (async () => { await belir(c, isimler, 400, 0); isimler.remove(); await belir(c, kitap, 500); await belir(c, yazar, 350); })());
    await c.say('Kitap, Arapça ve Farsça kökenli terimlerin yerine Türkçe terimler üretti.');
    await par(c.say('Solda eski terim, sağda kitabın ürettiği karşılık.'), belir(c, r[0].g, 450));
    await par(c.say('Bir örnek daha: bu kez bir açı çifti.'), belir(c, r[1].g, 450));
    await belir(c, r[2].g, 400);
    await c.choice({
      tag: 'Eşleştir', q: '“kaim zaviyeli müselles” bugün hangi terimdir?',
      options: ['dik üçgen', 'ters açı', 'eşkenar üçgen'], answer: 0,
      hints: ['', '“müselles” eşkenar üçgenin eski adında da vardı: bu bir üçgen.', 'Eşkenar üçgenin eski adı ilk satırda; bu başka bir üçgen.'],
      right: 'Kitap “dikey üçgen” dedi; bugün dik üçgen diyoruz.',
    });
    cevapla(r[2].sag.t, 'dik üçgen');
    await belir(c, r[3].g, 400);
    await c.choice({
      tag: 'Eşleştir', q: '“zaviyetan-ı mütekabiletan-ı dahiletan” bugün hangi terimdir?',
      options: ['ikizkenar üçgen', 'yöndeş açı', 'iç ters açılar'], answer: 2,
      hints: ['“zâviye” ters açının eski adında da vardı: bu bir açı adı.', '“mütekabil” sözü ters açının eski adında da geçiyor.', ''],
      right: 'İç ters açılar: sonraki derste ispatta kullanacağın terim.',
    });
    cevapla(r[3].sag.t, 'iç ters açılar');
    await c.say('Kitabın ürettiği terimlerin çoğu bugün de kullanılıyor.');
    c.note('<b>Geometri</b> (Atatürk, 1936–1937):<br>Türkçe terimler: ters açı, iç ters açılar, eşkenar üçgen.', 'Geometri kitabı', 'gs-geometri-kitabi');
  }

  Ders.start({
    id: 'geometrik-sekiller-a2', kicker: 'Konu A · Açılar ve ispat', title: 'İspat doğru bilgilerin üstüne kurulur', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'İspat doğru bilgilerin üstüne kurulur',
      hook: 'Bir mimar “bu çizim doğru” derken hangi bilgilere güvenir?',
      button: 'Derse başla ›',
    },
    goals: ['Bir ispatın doğruluğundan emin olunan bilgilere dayandığını görür.', 'Aksiyomu ve Öklid geometrisinin aksiyomatik yapısını tanır.', 'Geometrinin ölçme kurallarından kuramsal bir yapıya nasıl dönüştüğünü anlatır.', 'Geometriye katkı sağlayan isimleri ve <i>Geometri</i> kitabının terimlerini tanır.'],
    scenes: [
      { title: 'Havada duran taş', goal: 'İspatın doğruluğundan emin olunan bilgilere dayandığını gör.', run: havadaTas },
      { title: 'Zincir nerede biter?', goal: 'Zincirin sonunda aksiyomların durduğunu gör.', run: zincir },
      { title: 'Ölçmeden ispata', goal: 'Geometrinin arazi ölçümünden kuramsal bir yapıya uzanan yolunu izle.', run: serit },
      { title: 'Geometri bir yapıdır', goal: 'Öklid geometrisinin aksiyomlar üstüne kurulduğunu gör.', run: yapi },
      { title: 'Katkı sağlayanlar ve Geometri kitabı', goal: 'Dört bilim insanını tanı; eski terimleri bugünküyle eşleştir.', run: katki },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir ispatta kullanılan her bilgi nasıl olmalıdır?',
        options: ['Yeni ölçülmüş olmalı', 'Doğruluğundan emin olunan bir bilgi olmalı', 'Çoğunluğun kabul ettiği bir görüş olmalı'], answer: 1,
        why: ['Ölçüm örnek verir; ispatın dayanağı olamaz.', 'İspat, doğruluğu bilinen bilgilerin üstüne kurulur.', 'Çoğunluk da yanılabilir; ispat oy sayısına bakmaz.'],
        scene: 0,
      },
      {
        q: 'Öklid geometrisinde ispatların temelini ne oluşturur?',
        options: ['En çok tekrar edilen ölçümler', 'Çizimlerin düzgünlüğü', 'Aksiyomlara dayanan yapı'], answer: 2,
        why: ['Tekrar edilen ölçüm yine örnektir.', 'Düzgün çizim tek bir şekli gösterir.', 'Altta aksiyomlar, üstte onlara dayanarak ispatlananlar durur.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>İspat, doğru bilgilerin üstüne taş taş kurulur.</b>',
      '<b>Aksiyom:</b> ispatsız kabul edilen temel bilgi. Öklid geometrisi aksiyomlar üstüne kurulur.',
      'Geometri arazi ölçmekle başladı; zamanla kuramsal ve aksiyomatik bir yapı kazandı.',
      'Geometriye katkı sağlayanlar: Ebülvefa Buzcani, Kuşyar bin Lebban, Kadızade-i Rumi, Nasirüddin Tusi. Atatürk 1936–1937’de hazırladığı <i>Geometri</i> kitabında Türkçe terimler üretti.',
    ],
    nextLesson: { href: 'a3-ic-acilar-180.html', label: 'Sonraki: İç açıların toplamı 180°dir ›' },
  });
})();
