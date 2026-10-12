/* E1 — Dar yerde hızlı, hızlı yerde düşük basınç
   Akışkan, borunun daraldığı yerde süratlenir; süratin arttığı yerde basınç azalır: Bernoulli İlkesi.
   Senaryo: plan/fizik/akiskanlar/senaryolar/E-bernoulli-ilkesi.md (E1). Tamamen kavramsal: formül, oran, sayı yok.
   Sürat ok boyuyla, basınç düşey borudaki su yüksekliğiyle ya da etiket tonuyla gösterilir. Çizim araçları e-araclar.js içindedir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, koy, kutu, gizle, belir, par, ok, sinifla } = window.KIT;
  const { akisMotoru, akisDemeti, basincEtiketi, kuvvetOku, halka, ela, boruDuzenegi, venturi, venturiSatiri } = window.KIT_E;
  const { lerp, ease } = Ders;
  const BEYAZ = '#ffffff', CEPER = '#c3cbea';

  /* Önceki satırı soluklaştırıp yenisini açar (tahtada aynı anda en çok iki satır tam görünür). */
  const satirAc = (c, once, yeni) => par(once.length ? belir(c, once, 300, 0.45) : Promise.resolve(), belir(c, yeni, 400));

  /* ---- Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const geri = 'Evet. İki yüzey ya da iki bölge arasındaki basınç farkı, hareketi ve kuvveti doğurur.';
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    await c.choice({
      tag: 'Hatırla', q: 'Sıvıdaki bir cismin alt yüzeyindeki basınç, üst yüzeyindekinden büyüktür. Bu fark cisme ne yapar?',
      options: ['Cismi aşağı bastırır', 'Cismi yukarı iten kaldırma kuvveti doğurur', 'Hiçbir etkisi olmaz'], answer: 1,
      hints: ['Alt yüzeydeki basınç büyükse, fark cismi yukarı iter.', '', 'Alt yüzeydeki basınç büyükse, fark cismi yukarı iter.'], right: geri,
    });
    await c.choice({
      tag: 'Hatırla', q: 'Hava basıncı iki bölgede farklıysa hava nasıl hareket eder?',
      options: ['Alçak basınçlı bölgeden yüksek basınçlı bölgeye', 'Yerinde durur', 'Yüksek basınçlı bölgeden alçak basınçlı bölgeye'], answer: 2,
      hints: ['Hava, basıncın büyük olduğu yerden küçük olduğu yere doğru hareket eder.', 'Hava, basıncın büyük olduğu yerden küçük olduğu yere doğru hareket eder.', ''], right: geri,
    });
    c.clearSay();
    const t = renkli(c, svg, 500, 290, [['basınç', RENK.basinc], ' farkı → ', ['kuvvet', RENK.kuvvet]], { size: 44, kalin: 700 });
    gizle(t);
    await par(c.say('Basınç farkı kuvveti doğurur; bugün bunu akan akışkanda göreceğiz.'), belir(c, t, 450));
  }

  /* ---- 1. Hortumun ucunu sıkınca ---- */
  async function hortum(c) {
    const svg = c.svg(1000, 562);
    const zemin = cizgi(c, svg, [60, 480], [940, 480], RENK.gri, 3);
    const kisi = ela(c, svg, { x: 150, y: 308, r: 26, govde: 420, bacak: 480, kol: [190, 400] });
    const hortum = c.S('path', { d: 'M190,400 C250,400 290,330 340,330 L358,330', fill: 'none', stroke: RENK.gri, 'stroke-width': 24, 'stroke-linecap': 'butt' }, svg);
    const agizCiz = c.S('polygon', { fill: RENK.gri }, svg);
    const kesit = cizgi(c, svg, [378, 318], [378, 342], RENK.alan, 4);
    const agiz = (h) => { agizCiz.setAttribute('points', `354,318 380,${330 - h / 2} 380,${330 + h / 2} 354,342`); koy(kesit, [378, 330 - h / 2], [378, 330 + h / 2]); };
    agiz(24);
    const yol = c.S('path', { fill: 'none', stroke: RENK.sivi, 'stroke-linecap': 'round' }, svg);
    const suCiz = (xs, w, a) => {
      let d = '';
      for (let i = 0; i <= 36; i++) { const x = 380 + ((xs - 380) * i) / 36; d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (330 + a * (x - 380) ** 2).toFixed(1); }
      yol.setAttribute('d', d); yol.setAttribute('stroke-width', w);
    };
    const cent1 = cizgi(c, svg, [640, 470], [640, 490], RENK.gri, 3), cent2 = cizgi(c, svg, [880, 470], [880, 490], RENK.gri, 3);
    const surOk = ok(c, svg, [390, 330], [450, 330], BEYAZ, 5);
    const surEt = yazi(c, svg, 420, 298, 'sürat', { size: 22, kalin: 600, renk: BEYAZ });
    const sonuc = renkli(c, svg, 500, 535, [['çıkış deliği', RENK.alan], ' küçüldü → ', ['sürat', BEYAZ], ' arttı'], { size: 28, kalin: 700 });
    gizle(zemin, kisi, hortum, agizCiz, kesit, yol, cent1, cent2, surOk.g, surEt, sonuc);

    await par(c.say('Ela bahçeyi hortumla suluyor; su yakına düşüyor.'), (async () => {
      await belir(c, [zemin, kisi, hortum, agizCiz], 400);
      await belir(c, [yol, surOk.g, surEt], 200);
      await c.tween(800, (e) => suCiz(380 + 260 * e, 12, 150 / 67600), ease.linear);
      await belir(c, cent1, 300);
    })());
    await par(c.say('Hortumun ucunu sıkıyor: çıkış deliği küçülüyor.', { speak: '[curious] Hortumun ucunu sıkıyor: çıkış deliği küçülüyor.' }), belir(c, kesit, 400));

    await c.choice({
      tag: 'Tahmin et', q: 'Ucu sıkınca çıkan suyun sürati nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['Su yakına mı düşecek, uzağa mı?', 'Uzağa giden suyun sürati nasıldır?', ''], right: 'Evet. Suya bakalım.',
    });
    c.clearSay();
    await par(
      c.tween(500, (e) => agiz(lerp(24, 10, e)), ease.inOut),
      c.tween(800, (e) => { const xs = lerp(640, 880, e); suCiz(xs, lerp(12, 6, e), 150 / (xs - 380) ** 2); }, ease.inOut),
      c.tween(700, (e) => surOk.ciz([390, 330], [390 + lerp(60, 120, e), 330]), ease.inOut),
    );
    await belir(c, cent2, 400);
    await par(c.say('Su çok daha uzağa gidiyor: çıkış sürati arttı.'), belir(c, sonuc, 400));
    await c.say('Akışkan daha dar bir yerden geçerken sürati artıyor.');
    await c.say('Bunu şeffaf bir boruyla yakından inceleyelim.');
  }

  /* ---- 2. Kesit alanı küçülünce sürat artar ---- */
  async function kesit(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c), b = boruDuzenegi(c, svg, motor, {});
    b.depo.vanaKur(true);
    const sonuc = renkli(c, svg, 500, 436, [['kesit alanı', RENK.alan], ' daraldı → ', ['sürat', BEYAZ], ' arttı'], { size: 28, kalin: 700 });
    gizle(sonuc);

    await par(c.say('Ela şeffaf bir boru kuruyor; suyun içinde küçük işaretler akıyor.'), (async () => {
      await belir(c, [b.depo.g, b.tp.g], 450);
      await belir(c, [b.isaret.g, b.damla], 400);
    })());
    await par(c.say('Borunun akışa dik kesitinin alanına kesit alanı denir.'), belir(c, b.kesit, 400));
    await par(c.say('Sol bölümde sürat küçük; sürat okunu kısa çiziyoruz.'), belir(c, [b.solOk.g, b.solEt], 400));
    await par(c.say('Ela sürgüyü çevirip sağ bölümün kesit alanını küçültüyor.'), (async () => {
      await belir(c, [b.sagOk.g, b.surgu.g], 350);
      await b.yukseklik(1, 700);
    })());
    await par(c.say('Sağ bölümde işaretlerin sürati artıyor; sürat oku uzuyor.'), b.sur(1, 700));
    await par(c.say('Kesit alanı daraldıkça akışkanın sürati artar.'), belir(c, sonuc, 400));

    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sürgüyü dar konuma getireceğiz. Sağ bölümde sürat oku, orta konumdakine göre nasıl olur?',
      options: ['Aynı boyda', 'Daha kısa', 'Daha uzun'], answer: 2,
      hints: ['Dar konumda kesit alanı orta konumdakinden de küçük.', 'Kesit alanı küçüldükçe sürat artıyor.', ''], right: 'Evet. Dar konumda ok daha da uzar.',
    });
    await par(c.say('Kesit alanı ne kadar küçülürse, sürat o kadar artıyor.'), b.konum(2, 700));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir dere geniş yatağından dar bir boğaza giriyor. Boğazda suyun sürati nasıl olur?',
      options: ['Geniş yataktakiyle aynıdır', 'Geniş yataktakinden büyüktür', 'Geniş yataktakinden küçüktür'], answer: 1,
      hints: ['Boğazda kesit alanı küçüldü.', '', 'Kesit alanı daraldıkça sürat artar.'], right: 'Evet. Boğazda kesit alanı küçüldüğü için sürat artar.',
    });
    await c.say('Dere boğazı, borunun dar yeri gibidir: sürat artar.');
  }

  /* ---- 3. Sürat artınca basınç azalır ---- */
  async function basinc(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c), b = boruDuzenegi(c, svg, motor, { dusey: true });
    const yan = renkli(c, svg, 485, 170, [['sürat', BEYAZ], ' arttı → ', ['basınç', RENK.basinc], ' azaldı'], { size: 24, kalin: 700 });
    const son = renkli(c, svg, 500, 436, [['sürat', BEYAZ], ' arttı → ', ['basınç', RENK.basinc], ' azaldı'], { size: 28, kalin: 700 });
    gizle(yan, son);

    await par(c.say('Hareket hâlindeki akışkanın yaptığı basınca akışkan basıncı denir.'), belir(c, [b.depo.g, b.tp.g], 450));
    await par(c.say('Borunun üstüne iki düşey boru ekliyoruz: biri solda, biri sağda.'), par(b.sol.goster(500), b.sag.goster(500)));
    await par(c.say('Düşey borudaki su yüksekliği, o yerdeki basıncı gösterir.'), belir(c, [b.sol.p, b.sag.p], 400));
    await c.say('Su yüksekse basınç büyük, su alçaksa basınç küçüktür.');
    await par(c.say('Vana kapalıyken akış yok: iki borudaki su da en üstte.'), belir(c, b.durgun, 400));
    await par(c.say('Vanayı açıyoruz: su akıyor, düşey borulardaki seviye iniyor.'), (async () => {
      await b.depo.ac(400);
      await par(belir(c, [b.isaret.g, b.damla, b.solOk.g, b.sagOk.g, b.solEt], 400), b.suDus(700));
    })());
    await c.say('Akan akışkanın basıncı, durgun hâldekinden küçüktür.');
    await par(c.say('Sürgüyü orta konuma getiriyoruz: sağ düşey borunun suyu alçalıyor.'), (async () => {
      await belir(c, b.surgu.g, 300);
      await b.konum(1, 700);
    })());
    await par(c.say('Sağ bölümde sürat arttı, basınç azaldı.'), belir(c, yan, 400));

    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sürgüyü dar konuma getireceğiz. Sağ düşey borudaki su, orta konumdakine göre nasıl olur?',
      options: ['Aynı yükseklikte', 'Daha yüksek', 'Daha alçak'], answer: 2,
      hints: ['Dar konumda sürat orta konumdakinden de büyük.', 'Sürat arttıkça basınç azalır; su yüksekliği basıncı gösterir.', ''], right: 'Evet. Sürat arttıkça basınç azalır; su alçalır.',
    });
    await b.konum(2, 700);
    await belir(c, yan, 300, 0);
    await par(c.say('Kesit alanı daraldıkça sürat arttı, basınç azaldı.'), belir(c, son, 400));
    await c.say('Sürati artan akışkan, boru çeperlerine daha az basınç yapıyor.');

    c.clearSay();
    const ha = halka(c, svg, 293, 100, 44, 18);
    await c.choice({
      tag: 'Sıra sende', q: 'Sürgü dar konumdayken hangi bölümde basınç daha büyüktür?',
      options: ['Sağ bölümde; akışkan orada sıkışmıştır', 'İki bölümde de aynıdır', 'Sol bölümde; düşey borudaki su orada daha yüksek'], answer: 2,
      hints: ['Düşey borulardaki su yüksekliklerini karşılaştır.', 'Daha yüksek su, daha büyük basınçtır.', ''], right: 'Evet. Sol bölümde su daha yüksek; basınç orada daha büyük.',
    });
    await par(c.say('Sol düşey borudaki su daha yüksek; orada basınç daha büyük.'), belir(c, ha, 400));
  }

  /* ---- 4. Venturi tüpü ---- */
  async function venturiSahne(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c), v = venturi(c, svg, motor);
    const baslik = yazi(c, svg, 500, 38, 'Venturi tüpü', { size: 28, kalin: 700 });
    const sA = venturiSatiri(c, svg, 410, 'A', RENK.alan), sV = venturiSatiri(c, svg, 450, 'v', BEYAZ);
    const sP = venturiSatiri(c, svg, 490, 'P', RENK.basinc), sH = venturiSatiri(c, svg, 530, 'h', RENK.basinc, { size: 24 });
    gizle(v.depo.g, v.tp.g, baslik);
    const olcular = v.dus.map((d) => d.olcu);

    await par(c.say('Kesit alanı iki kez daralan, düşey borulu düzeneğe Venturi tüpü denir.'), (async () => {
      await belir(c, [v.depo.g, v.tp.g, baslik], 450);
      await par(...v.dus.map((d) => d.goster(500)), belir(c, [...v.dus.map((d) => d.p), v.durgun, v.isaret.g, ...v.oklar.map((o) => o.g)], 500));
    })());
    await par(c.say('Kesit alanlarının sıralaması: A₁ > A₂ > A₃.', { speak: 'Kesit alanlarının sıralaması: A bir büyüktür A iki büyüktür A üç.' }), belir(c, sA, 400));
    await par(c.say('Kesit alanı daraldıkça sürat artar: v₃ > v₂ > v₁.', { speak: 'Kesit alanı daraldıkça sürat artar: v üç büyüktür v iki büyüktür v bir.' }), satirAc(c, [sA], sV));
    await par(c.say('Sürati artan yerde basınç azalır: P₁ > P₂ > P₃.', { speak: 'Sürati artan yerde basınç azalır: P bir büyüktür P iki büyüktür P üç.' }), satirAc(c, [sV], sP));
    await par(c.say('Düşey borulardaki su yükseklikleri de aynı sırada: h₁ > h₂ > h₃.', { speak: 'Düşey borulardaki su yükseklikleri de aynı sırada: h bir büyüktür h iki büyüktür h üç.' }), par(satirAc(c, [sP], sH), belir(c, olcular, 400)));

    c.clearSay();
    await belir(c, [sA, sV, sP, sH, ...olcular], 300, 0);
    const ha = halka(c, svg, 780, 195, 34, 14);
    await c.choice({
      tag: 'Sıra sende', q: 'Kesit alanları A₂ > A₁ > A₃ olan bir Venturi tüpünden su akıyor. Hangi kesitte basınç en küçüktür?',
      options: ['1. kesitte', '2. kesitte', '3. kesitte'], answer: 2,
      hints: ['Önce kesit alanlarını sırala: en küçüğü hangisi?', 'En küçük kesit alanında sürat en büyük, basınç en küçüktür.', ''], right: 'Evet. En küçük kesit alanında basınç en küçüktür.',
    });
    await par(v.ayarla([80, 120, 40], 700), belir(c, sA, 400));
    await par(c.say('Kesit alanı en küçük yerde sürat en büyük, basınç en küçüktür.'), belir(c, ha, 400));
  }

  /* ---- 5. Kâğıda üfleme ---- */
  async function kagit(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c);
    const kisi = ela(c, svg, { x: 160, y: 230, r: 45, govde: 420, kol: [226, 262] });
    const sayfa = cizgi(c, svg, [230, 260], [430, 330], BEYAZ, 5);
    const ust = akisDemeti(c, svg, motor, { P: [215, 235], Q: [520, 235], n: 4, ara: [0, -10], hiz: 300, aralik: 30 });
    const alt = akisDemeti(c, svg, motor, { P: [230, 350], Q: [470, 350], n: 3, ara: [0, 30], hiz: 100 });
    const dusuk = basincEtiketi(c, svg, 420, 170, 'dusuk'), yuksek = basincEtiketi(c, svg, 420, 440, 'yuksek');
    const kv = kuvvetOku(c, svg, [430, 320], [430, 240], { etiket: [448, 296], hiza: 'start' });
    gizle(kisi, sayfa, ust.g, alt.g);

    await par(c.say('Hava da bir akışkandır; sürat–basınç ilişkisi havada da geçerlidir.'), belir(c, kisi, 450));
    await par(c.say('Ela bir A4 kâğıdının üst kenarını dudağına tutuyor; kâğıt aşağı sarkıyor.', { speak: 'Ela bir A dört kâğıdının üst kenarını dudağına tutuyor; kâğıt aşağı sarkıyor.' }), belir(c, sayfa, 400));

    await c.choice({
      tag: 'Tahmin et', q: 'Ela kâğıdın üst yüzeyinden üflerse kâğıdın sarkan ucu ne yapar?',
      options: ['Aşağı sarkmaya devam eder', 'Daha çok aşağı iner', 'Yukarı kalkar'], answer: 2,
      hints: ['Üflenen havanın sürati artar; üstte basınç ne olur?', 'Kâğıdın iki yüzündeki basıncı karşılaştır.', ''], right: 'Evet. Kâğıda bakalım.',
    });
    c.clearSay();
    await par(belir(c, [ust.g, alt.g], 400), c.tween(800, (e) => koy(sayfa, [230, 260], [430, lerp(330, 262, e)]), ease.inOut));
    await par(c.say('Üstteki havanın sürati arttı; üst yüzeyde basınç azaldı.'), belir(c, dusuk, 400));
    await par(c.say('Alttaki hava daha yavaş: orada basınç yüksek kalıyor.'), belir(c, yuksek, 400));
    await par(c.say('Yüksek basınç kâğıdı, düşük basınçlı yüze doğru yukarı itiyor.'), belir(c, kv, 400));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Kâğıdı yukarı kaldıran fark hangisidir?',
      options: ['Üst yüzeydeki basınç, alt yüzeydekinden büyüktür', 'İki yüzeydeki basınç eşittir', 'Alt yüzeydeki basınç, üst yüzeydekinden büyüktür'], answer: 2,
      hints: ['Hangi yüzeyde hava daha yavaş akıyor?', 'Kuvvet, düşük basınçlı yüze doğrudur.', ''], right: 'Evet. Alt yüzeydeki yüksek basınç kâğıdı yukarı iter.',
    });
    await c.say('Alt yüzeydeki basınç büyük olduğu için kâğıt yukarı kalkar.');
  }

  /* ---- 6. Asılı iki kâğıt ---- */
  async function ikiKagit(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c);
    const cubuk = cizgi(c, svg, [300, 110], [700, 110], RENK.gri, 8);
    const sol = cizgi(c, svg, [420, 110], [420, 330], BEYAZ, 6), sag = cizgi(c, svg, [580, 110], [580, 330], BEYAZ, 6);
    const kisi = ela(c, svg, { x: 500, y: 480, r: 40, agiz: 'ust' });
    const orta = akisDemeti(c, svg, motor, { P: [480, 430], Q: [480, 120], n: 5, ara: [10, 0], hiz: 300, aralik: 30 });
    const dsol = akisDemeti(c, svg, motor, { P: [330, 430], Q: [330, 300], hiz: 100 }), dsag = akisDemeti(c, svg, motor, { P: [670, 430], Q: [670, 300], hiz: 100 });
    const dusuk = basincEtiketi(c, svg, 500, 72, 'dusuk');
    const yk1 = basincEtiketi(c, svg, 330, 250, 'yuksek'), yk2 = basincEtiketi(c, svg, 670, 250, 'yuksek');
    const k1 = kuvvetOku(c, svg, [370, 300], [430, 300], { etiket: [400, 336] }), k2 = kuvvetOku(c, svg, [630, 300], [570, 300], { etiket: [600, 336] });
    gizle(cubuk, sol, sag, kisi, orta.g, dsol.g, dsag.g);

    await par(c.say('Ela iki kâğıdı yan yana, aralarında küçük bir boşlukla asıyor.'), belir(c, [cubuk, sol, sag, kisi], 450));
    await c.choice({
      tag: 'Tahmin et', q: 'Ela iki kâğıdın arasına üflerse kâğıtlar ne yapar?',
      options: ['Yerinde kalır', 'Birbirine yaklaşır', 'Birbirinden uzaklaşır'], answer: 1,
      hints: ['Kâğıtların arasında hava hızlı akacak; orada basınç ne olur?', '', 'Kâğıtların dış yüzlerindeki basınçla karşılaştır.'], right: 'Evet. Kâğıtlara bakalım.',
    });
    c.clearSay();
    await par(belir(c, [orta.g, dsol.g, dsag.g], 400), c.tween(900, (e) => {
      koy(sol, [420, 110], [lerp(420, 470, e), lerp(330, 326, e)]); koy(sag, [580, 110], [lerp(580, 530, e), lerp(330, 326, e)]);
    }, ease.inOut));
    await par(c.say('Kâğıtların arasındaki havanın sürati arttı; orada basınç azaldı.'), belir(c, dusuk, 400));
    await par(c.say('Kâğıtların dış yüzlerindeki hava daha yavaş; orada basınç yüksek.'), belir(c, [yk1, yk2], 400));
    await par(c.say('Dış yüzlerdeki yüksek basınç kâğıtları birbirine doğru itiyor.'), belir(c, [k1, k2], 400));
  }

  /* ---- 7. Saç kurutma makinesi ve top ---- */
  async function top(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c);
    const zemin = cizgi(c, svg, [60, 520], [940, 520], RENK.gri, 3);
    const sutun = c.S('rect', { x: 470, y: 150, width: 60, height: 280, fill: '#7f93b8', 'fill-opacity': 0.12 }, svg);
    const makine = c.S('g', {}, svg);
    c.S('rect', { x: 460, y: 430, width: 80, height: 90, rx: 8, fill: RENK.gri, stroke: CEPER, 'stroke-width': 3 }, makine);
    c.S('rect', { x: 470, y: 420, width: 60, height: 10, rx: 3, fill: CEPER }, makine);
    const orta = akisDemeti(c, svg, motor, { P: [475, 430], Q: [475, 150], n: 6, ara: [10, 0], hiz: 300, aralik: 30 });
    const dsol = akisDemeti(c, svg, motor, { P: [400, 430], Q: [400, 330], hiz: 100 }), dsag = akisDemeti(c, svg, motor, { P: [600, 430], Q: [600, 330], hiz: 100 });
    const topun = c.S('circle', { cx: 500, cy: 250, r: 30, fill: '#e8ecff', stroke: CEPER, 'stroke-width': 3 }, svg);
    const kv = kuvvetOku(c, svg, [616, 250], [556, 250], { etiket: [586, 228] });
    const dusuk = basincEtiketi(c, svg, 500, 120, 'dusuk'), yuksek = basincEtiketi(c, svg, 700, 300, 'yuksek');
    gizle(zemin, sutun, makine, topun, orta.g, dsol.g, dsag.g);
    const kay = (x, ms, eg) => { const x0 = +topun.getAttribute('cx'); return c.tween(ms, (e) => topun.setAttribute('cx', lerp(x0, x, e)), eg); };

    await par(c.say('Ela, yukarı bakan saç kurutma makinesinin hava akımına masa tenisi topu bırakıyor.'), belir(c, [zemin, sutun, makine, topun], 450));
    await c.choice({
      tag: 'Tahmin et', q: 'Ela topu hava akımından hafifçe yana iterse top ne yapar?',
      options: ['Akımdan uzaklaşıp düşer', 'Akımın içine geri döner', 'Yana doğru kayıp gider'], answer: 1,
      hints: ['Akımın içinde ve çevresinde hava aynı süratte mi?', '', 'Basıncı düşük olan tarafa doğru kuvvet etkir.'], right: 'Evet. Topa bakalım.',
    });
    c.clearSay();
    await belir(c, [orta.g, dsol.g, dsag.g], 400);
    await kay(520, 400, ease.out);
    await belir(c, kv, 300);
    await kay(500, 600, ease.inOut);
    await belir(c, kv, 300, 0);
    await par(c.say('Akımın içinde hava hızlı akıyor: orada basınç düşük.'), belir(c, dusuk, 400));
    await par(c.say('Akımın çevresinde hava daha yavaş: orada basınç yüksek.'), belir(c, yuksek, 400));
    await par(c.say('Top kenara kayınca, çevredeki yüksek basınç onu akıma geri itiyor.'), (async () => { await kay(520, 400, ease.out); await belir(c, kv, 300); })());
  }

  /* ---- 8. Bernoulli İlkesi ---- */
  async function bernoulli(c) {
    const svg = c.svg(1000, 562);
    const KX = [60, 290, 520, 750];
    const kutular = KX.map((x, i) => {
      const g = c.S('g', {}, svg), cx = x + 100;
      kutu(c, g, x, 90, 200, 190, { rx: 12 });
      if (i === 0) {
        const T = [[75, 150], [115, 150], [145, 173], [175, 173], [205, 150], [245, 150]], A = [[75, 240], [115, 240], [145, 217], [175, 217], [205, 240], [245, 240]];
        [T, A].forEach((q) => c.S('path', { d: 'M' + q.map((n) => n.join(',')).join(' L'), fill: 'none', stroke: CEPER, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g));
        ok(c, g, [110, 195], [215, 195], BEYAZ, 5);
      } else if (i === 1) {
        cizgi(c, g, [320, 205], [460, 215], CEPER, 4);
        ok(c, g, [330, 170], [450, 170], BEYAZ, 5);
      } else if (i === 2) {
        cizgi(c, g, [580, 140], [580, 236], CEPER, 4); cizgi(c, g, [660, 140], [660, 236], CEPER, 4);
        ok(c, g, [620, 230], [620, 150], BEYAZ, 5);
      } else {
        ok(c, g, [850, 236], [850, 142], BEYAZ, 5);
        c.S('circle', { cx: 850, cy: 195, r: 28, fill: 'none', stroke: CEPER, 'stroke-width': 4 }, g);
      }
      const et = basincEtiketi(c, g, cx, 118, 'dusuk', { kisa: true });
      yazi(c, g, cx, 266, ['dar boru', 'kâğıt', 'iki kâğıt', 'top'][i], { size: 22, kalin: 600, renk: RENK.soluk });
      gizle(g);
      return { g, et };
    });
    const ilke = renkli(c, svg, 500, 400, [['sürat', BEYAZ], ' arttı → ', ['basınç', RENK.basinc], ' azaldı'], { size: 36, kalin: 700 });
    const daniel = yazi(c, svg, 500, 470, 'Daniel Bernoulli', { size: 26, kalin: 600, renk: RENK.soluk });
    const ad = yazi(c, svg, 500, 530, 'Bernoulli İlkesi', { size: 34, kalin: 700, renk: RENK.basinc });
    gizle(ilke, daniel, ad);
    kutular.forEach((k) => { k.et.style.opacity = 1; });

    await par(c.say('Boruda, kâğıtta ve hava akımında aynı ilişkiyi gördük.'), (async () => {
      for (const k of kutular) { await belir(c, k.g, 400); }
    })());
    await par(c.say('Sürat arttığı her yerde basınç azalıyor.'), belir(c, ilke, 400));
    await par(c.say('Bu ilişkiyi ilk kez Daniel Bernoulli ortaya koymuştur.', { speak: '[thoughtful] Bu ilişkiyi ilk kez Daniel Bernoulli ortaya koymuştur.' }), belir(c, daniel, 400));
    await par(c.say('Akışkanın sürati arttığında basıncı azalır; buna Bernoulli İlkesi denir.'), par(belir(c, daniel, 300, 0.45), belir(c, ad, 400)));
    c.note('<b>Sürat artarsa basınç azalır.</b> Örnek: borunun dar yeri.', 'Bernoulli İlkesi', 'akiskanlar-e1-bernoulli');

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir akışkanın sürati azalırsa basıncı nasıl değişir?',
      options: ['Azalır', 'Artar', 'Değişmez'], answer: 1,
      hints: ['Sürat artınca basınç azalıyordu; tersine ne olur?', '', 'Venturi tüpünün geniş kesitine bak.'], right: 'Evet. Sürat azalırsa basınç artar.',
    });
    await belir(c, ilke, 300, 0); ilke.remove();
    const ters = renkli(c, svg, 500, 400, [['sürat', BEYAZ], ' azaldı → ', ['basınç', RENK.basinc], ' arttı'], { size: 36, kalin: 700 });
    gizle(ters);
    await par(c.say('Süratin azaldığı yerde basınç artar.'), belir(c, ters, 400));
  }

  /* ---- 9. Sürgüyü sen çevir ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c), b = boruDuzenegi(c, svg, motor, { dusey: true, vanaAcik: true });
    b.kur(0); b.sol.yaz(100);
    gizle(b.depo.g, b.tp.g);
    await par(c.say('Sürgüyü üç konuma getir; sürat okuna ve düşey boruya bak.', { noWait: true }), (async () => {
      await belir(c, [b.depo.g, b.tp.g], 450);
      await par(b.sol.goster(450), b.sag.goster(450), belir(c, [b.sol.p, b.sag.p, b.durgun, b.isaret.g, b.damla, b.solOk.g, b.sagOk.g, b.surgu.g], 450));
    })());
    const AD = ['geniş', 'orta', 'dar'], gorulen = new Set([0]);
    const sl = c.slider({ label: 'Sürgü', min: 0, max: 2, step: 1, value: 0, fmt: (v) => AD[+v], onInput: (v) => { gorulen.add(+v); b.konum(+v, 700); } });
    await c.cont('Sırala ›');
    for (const i of [0, 1, 2].filter((j) => !gorulen.has(j))) { gorulen.add(i); sl.set(i); await b.konum(i, 700); await c.wait(400); }
    sl.remove(); c.clearSay();

    /* Sıralama: kart başına seçim. Sürgü kaybolur, sıra kartları ve yuvalar gelir. */
    await belir(c, b.surgu.g, 300, 0);
    const yuvalar = c.S('g', {}, svg);
    [360, 500, 640].forEach((x) => c.S('rect', { x: x - 70, y: 498, width: 140, height: 44, rx: 10, fill: 'none', stroke: RENK.gri, 'stroke-width': 2, 'stroke-dasharray': '7 5' }, yuvalar));
    const baslik = yazi(c, svg, 500, 414, '', { size: 24, kalin: 600, renk: RENK.soluk });
    gizle(yuvalar, baslik);
    let kartG = null; const yerlesen = [];
    const goster = async (k) => {
      kartG = c.S('g', {}, svg);
      kutu(c, kartG, 430, 430, 140, 44, { rx: 10, renk: RENK.alan });
      yazi(c, kartG, 500, 461, k.ad, { size: 26, kalin: 700 });
      gizle(kartG);
      await par(belir(c, kartG, 350), b.konum(k.i, 600));
    };
    const otur = async (rank) => {
      const el = kartG, dx = [360, 500, 640][rank] - 500;
      await c.tween(500, (e) => el.setAttribute('transform', `translate(${lerp(0, dx, e)},${lerp(0, 68, e)})`), ease.inOut);
      yerlesen.push(el);
    };
    const gorev = async (ad, sira, geri, kartlar, son) => {
      baslik.textContent = ad;
      await par(belir(c, [yuvalar, baslik], 350));
      await sinifla(c, {
        tag: 'Dene', kutular: ['Birinci', 'İkinci', 'Üçüncü'],
        kartlar: kartlar.map((k, j) => Object.assign({ ipucu: 'İlk sırada sürati ya da basıncı en büyük olan konum olacak; ok boyuna ve su yüksekliğine bak.', neden: j === kartlar.length - 1 ? geri : 'Evet.' }, k, { kutu: sira.indexOf(k.i) })),
        soru: (k) => `${ad}: ${k.ad} konum kaçıncı sırada?`,
        sec: (_, k) => goster(k), yerlestir: (_, k) => otur(sira.indexOf(k.i)),
      });
      await c.say(son);
      await belir(c, [yuvalar, baslik, ...yerlesen], 350, 0);
      yerlesen.forEach((e) => e.remove()); yerlesen.length = 0;
      c.clearSay();
    };
    await gorev('Sağ bölümdeki sürat, büyükten küçüğe', [2, 1, 0], 'Evet. Kesit alanı küçüldükçe sürat artar.', [{ ad: 'orta', i: 1 }, { ad: 'dar', i: 2 }, { ad: 'geniş', i: 0 }], 'Kesit alanı küçüldükçe sürat artar.');
    await gorev('Sağ düşey borudaki su yüksekliği, büyükten küçüğe', [0, 1, 2], 'Evet. Sürat arttıkça basınç azalır; su alçalır.', [{ ad: 'dar', i: 2 }, { ad: 'geniş', i: 0 }, { ad: 'orta', i: 1 }], 'Sürat arttıkça basınç azalır; su alçalır.');
  }

  /* ---- 10. Basınç düşük mü, yüksek mi? ---- */
  async function siniflama(c) {
    const svg = c.svg(1000, 562), motor = akisMotoru(c);
    const KUTU = [{ x: 80, ad: 'Basınç düşük' }, { x: 520, ad: 'Basınç yüksek' }], sayac = [0, 0];
    const eski = [];
    KUTU.forEach((k) => { eski.push(kutu(c, svg, k.x, 60, 400, 50, { rx: 10 }), yazi(c, svg, k.x + 200, 94, k.ad, { size: 26, kalin: 700, renk: RENK.basinc })); });
    let cizim = null, temiz = [], baslik = null;
    const duz = (g, P, Q, w = 3) => cizgi(c, g, P, Q, CEPER, w);
    const KART = {
      dar() { const g = c.S('g', {}, svg); c.S('rect', { x: 365, y: 222, width: 270, height: 36, fill: RENK.sivi, 'fill-opacity': 0.35 }, g); duz(g, [365, 222], [635, 222]); duz(g, [365, 258], [635, 258]); ok(c, g, [410, 240], [590, 240], BEYAZ, 5); return g; },
      genis() { const g = c.S('g', {}, svg); c.S('rect', { x: 365, y: 185, width: 270, height: 110, fill: RENK.sivi, 'fill-opacity': 0.35 }, g); duz(g, [365, 185], [635, 185]); duz(g, [365, 295], [635, 295]); ok(c, g, [470, 240], [530, 240], BEYAZ, 5); return g; },
      ust() { const g = c.S('g', {}, svg); duz(g, [380, 280], [620, 280], 5); const d = akisDemeti(c, g, motor, { P: [375, 262], Q: [625, 262], n: 3, ara: [0, -10], hiz: 300, aralik: 30 }); temiz.push(d); return g; },
      alt() { const g = c.S('g', {}, svg); duz(g, [380, 200], [620, 200], 5); const d = akisDemeti(c, g, motor, { P: [375, 232], Q: [625, 232], n: 2, ara: [0, 34], hiz: 100 }); temiz.push(d); return g; },
      iki() { const g = c.S('g', {}, svg); duz(g, [450, 180], [450, 300], 5); duz(g, [550, 180], [550, 300], 5); const d = akisDemeti(c, g, motor, { P: [480, 300], Q: [480, 180], n: 5, ara: [10, 0], hiz: 300, aralik: 30 }); temiz.push(d); return g; },
      cevre() {
        const g = c.S('g', {}, svg); c.S('rect', { x: 470, y: 175, width: 60, height: 130, fill: '#7f93b8', 'fill-opacity': 0.12 }, g);
        temiz.push(akisDemeti(c, g, motor, { P: [480, 305], Q: [480, 175], n: 5, ara: [10, 0], hiz: 300, aralik: 30 }));
        temiz.push(akisDemeti(c, g, motor, { P: [410, 305], Q: [410, 175], hiz: 100 }), akisDemeti(c, g, motor, { P: [590, 305], Q: [590, 175], hiz: 100 }));
        return g;
      },
    };
    const goster = async (k) => {
      cizim = c.S('g', {}, svg); temiz = [];
      kutu(c, cizim, 350, 150, 300, 180, { rx: 12 });
      KART[k.tur] && cizim.appendChild(KART[k.tur]());
      baslik = yazi(c, svg, 500, 368, k.ad, { size: 26, kalin: 700 });
      gizle(cizim, baslik);
      await belir(c, [cizim, baslik], 350);
    };
    const yerlestir = async (k) => {
      const kx = k.kutu === 0 ? 100 : 665, ky = 150 + sayac[k.kutu] * 36, el = cizim, bs = baslik, tz = temiz;
      const tx = KUTU[k.kutu].x + 200 - 500, ty = 135 - 240;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, tx, e)},${lerp(0, ty, e)}) translate(500,240) scale(${lerp(1, 0.15, e)}) translate(-500,-240)`);
        el.style.opacity = 1 - e; bs.style.opacity = 1 - e;
      }, ease.inOut);
      tz.forEach((d) => d.kaldir()); el.remove(); bs.remove();
      const t = yazi(c, svg, kx, ky, k.kisa, { hiza: 'start', size: 22, kalin: 600 });
      gizle(t); eski.push(t); await belir(c, t, 300);
      sayac[k.kutu]++;
    };
    const KARTLAR = [
      { tur: 'dar', ad: 'Venturi tüpünün en dar kesiti', kisa: 'Venturi, dar kesit', uzun: 'Venturi tüpünün en dar kesitinde', kutu: 0, neden: 'Evet. En dar kesitte sürat en büyük, basınç en küçük.' },
      { tur: 'ust', ad: 'Kâğıdın üstündeki hızlı hava', kisa: 'Kâğıdın üstü', uzun: 'Kâğıdın üstündeki hızlı havada', kutu: 0, neden: 'Evet. Sürat arttı, basınç azaldı.' },
      { tur: 'cevre', ad: 'Saç kurutma makinesinin hava akımının çevresi', kisa: 'Akımın çevresi', uzun: 'Saç kurutma makinesinin hava akımının çevresinde', kutu: 1, neden: 'Evet. Çevredeki hava yavaş; basınç yüksek.' },
      { tur: 'iki', ad: 'İki kâğıdın arasındaki hava', kisa: 'İki kâğıt arası', uzun: 'İki kâğıdın arasındaki havada', kutu: 0, neden: 'Evet. Aradaki havanın sürati büyük.' },
      { tur: 'genis', ad: 'Venturi tüpünün en geniş kesiti', kisa: 'Venturi, geniş kesit', uzun: 'Venturi tüpünün en geniş kesitinde', kutu: 1, neden: 'Evet. Burada sürat küçük, basınç büyük.' },
      { tur: 'alt', ad: 'Kâğıdın altındaki yavaş hava', kisa: 'Kâğıdın altı', uzun: 'Kâğıdın altındaki yavaş havada', kutu: 1, neden: 'Evet. Hava yavaş, basınç yüksek kaldı.' },
    ];
    await c.say('Şimdi bölgeleri basıncına göre ayıralım.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Önce o bölgede sürat büyük mü, küçük mü, ona bak.' }, k)),
      soru: (k) => `${k.uzun} basınç düşük mü, yüksek mi?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    c.clearSay();
    await belir(c, eski, 350, 0); eski.forEach((e) => e.remove());
    const l1 = renkli(c, svg, 500, 250, [['sürat', BEYAZ], ' büyük → ', ['basınç', RENK.basinc], ' düşük'], { size: 30, kalin: 700 });
    const l2 = yazi(c, svg, 500, 320, 'Akışkan hızlandığı yerde daha az bastırır.', { size: 30, kalin: 700 });
    gizle(l1, l2);
    await par(c.say('Süratin büyük olduğu her yerde basınç düşüktür.'), belir(c, l1, 400));
    await par(c.say('Akışkan hızlandığı yerde daha az bastırır.'), belir(c, l2, 400));
  }

  Ders.start({
    id: 'akiskanlar-e1', kicker: 'Konu E · Bernoulli İlkesi', title: 'Dar yerde hızlı, hızlı yerde düşük basınç', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Dar yerde hızlı, hızlı yerde düşük basınç',
      hook: 'Bahçe hortumunun ucunu parmağınla sıkınca su neden daha uzağa fışkırır?',
      button: 'Derse başla ›',
    },
    goals: ['Kesit alanı daraldıkça akışkanın süratinin arttığını söyler.', 'Süratin arttığı yerde basıncın azaldığını boruda ve havada gösterir.', 'Bernoulli İlkesi’ni verilen bir durumda uygular.'],
    scenes: [
      { title: 'Hatırla', goal: 'Basınç farkının kuvveti doğurduğunu hatırla.', run: hatirla },
      { title: 'Hortumun ucunu sıkınca', goal: 'Dar yerden geçen suyun süratinin arttığını gör.', run: hortum },
      { title: 'Kesit alanı küçülünce sürat artar', goal: 'Kesit alanı ile sürat arasındaki ilişkiyi bul.', run: kesit },
      { title: 'Sürat artınca basınç azalır', goal: 'Düşey borudaki su yüksekliğinden basıncı oku.', run: basinc },
      { title: 'Venturi tüpü', goal: 'Kesit alanı, sürat ve basıncı sıraya diz.', run: venturiSahne },
      { title: 'Kâğıda üfleme', goal: 'Aynı ilişkinin havada da geçerli olduğunu gör.', run: kagit },
      { title: 'Asılı iki kâğıt', goal: 'İki kâğıdın arasında basıncın neden düştüğünü açıkla.', run: ikiKagit },
      { title: 'Saç kurutma makinesi ve top', goal: 'Topun hava akımında neden kaldığını açıkla.', run: top },
      { title: 'Bernoulli İlkesi', goal: 'Dört durumdaki ortak ilişkiyi adlandır.', run: bernoulli },
      { title: 'Sürgüyü sen çevir', goal: 'Sürgü konumlarını sürat ve su yüksekliğine göre sırala.', run: dene },
      { title: 'Basınç düşük mü, yüksek mi?', goal: 'Bölgeleri basıncına göre ayır.', run: siniflama },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yatay bir borunun bir bölümü daralıyor. Orada akışkanın basıncı, geniş bölümdekine göre nasıl olur?',
        options: ['Daha büyük; akışkan sıkıştığı için', 'Aynı; akışkan değişmediği için', 'Daha küçük; sürati arttığı için'], answer: 2,
        why: ['Dar yerde akışkan sıkışmaz; hızlanır, hızlanınca da basıncı azalır.', 'Daralan yerde akışkanın sürati değişir, bu yüzden basıncı da değişir.', 'Kesit alanı daralınca sürat artar; sürat artınca basınç azalır.'], scene: 3 },
      { q: 'Ela çeşme ağzına ince uçlu bir başlık takıyor. Çıkan suyun sürati nasıl değişir?',
        options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
        why: ['Çıkış deliğinin kesit alanı küçülür; sürat artar.', 'Kesit alanı küçülünce sürat azalmaz, artar.', 'Kesit alanı değişince sürat de değişir.'], scene: 1 },
      { q: 'Kesit alanları A₃ > A₁ > A₂ olan bir Venturi tüpünde, hangi kesitin düşey borusunda su en alçaktır?',
        options: ['1. kesitin', '2. kesitin', '3. kesitin'], answer: 1,
        why: ['1. kesit en küçük kesit alanı değildir; orada sürat en büyük değildir.', 'A₂ en küçük kesit alanıdır: sürat en büyük, basınç en küçüktür, su en alçaktır.', '3. kesit en büyük kesit alanıdır; orada basınç büyük, su yüksektir.'], scene: 4 },
      { q: 'Ela, saç kurutma makinesinin hava akımındaki topu kenara itiyor; top akıma geri dönüyor. Neden?',
        options: ['Akımın içinde ve çevresinde basınç aynıdır', 'Akımın içinde basınç yüksek, çevresinde düşüktür', 'Akımın çevresinde basınç yüksek, içinde düşüktür'], answer: 2,
        why: ['Basınç aynı olsaydı topu geri iten bir kuvvet olmazdı.', 'Akımın içinde hava hızlıdır; orada basınç düşüktür.', 'Çevredeki yüksek basınç, topu düşük basınçlı akıma doğru iter.'], scene: 7 },
      { q: 'Ela, ipten asılı yan yana iki balonun arasına üflüyor. Balonlar ne yapar?',
        options: ['Birbirine yaklaşır; aradaki basınç düşer', 'Birbirinden uzaklaşır; aradaki basınç düşer', 'Birbirinden uzaklaşır; aradaki basınç artar'], answer: 0,
        why: ['Aradaki havanın sürati artar, basıncı düşer; dışarıdaki yüksek basınç balonları birbirine iter.', 'Aradaki basınç düşer; kuvvet düşük basınçlı tarafa, yani içeri doğrudur.', 'Aradaki hava hızlanır; basıncı artmaz, azalır.'], scene: 6 },
    ],
    summary: ['Kesit alanı daraldıkça akışkanın sürati artar.', 'Sürati artan yerde basınç azalır: Bernoulli İlkesi.', '<b>Akışkan hızlandığı yerde daha az bastırır.</b>'],
    nextLesson: { href: 'e2-bernoulli-her-yerde.html', label: 'Sonraki: Bernoulli her yerde ›' },
  });
})();
