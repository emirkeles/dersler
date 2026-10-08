/* B4 — Üçüncü kenar hangi aralıkta?
   İki kenarı bilinen üçgende üçüncü kenar, öbür ikisinin farkından büyük, toplamından küçüktür: |b − c| < a < b + c.
   B1'in menteşesi aralığın iki ucunu gösterir (0°: fark, 180°: toplam). Program doğrulama ister.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/B-kenarlar-ve-acilar.md */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, nokta, gizle, belir, par, ok, ucgen, kenarlar, mentese, tahminAl } = window.KIT;
  const { lerp, ease } = Ders;
  const sayi = (x) => x.toFixed(1).replace('.', ',');
  const ZEMIN = '#10162b';

  /* Sayı doğrusu. o: { x0, x1, y, min, max, cizik: çentik adımı, etiket: [altına yazılacak değerler] }.
     X(v) değerin pikselini verir; aralik(lo, hi, renk) uçları açık bir bant çizer ve grubunu döndürür. */
  function sayiDogrusu(c, p, o) {
    const g = c.S('g', {}, p), X = (v) => o.x0 + ((v - o.min) / (o.max - o.min)) * (o.x1 - o.x0);
    cizgi(c, g, [o.x0 - 18, o.y], [o.x1 + 18, o.y], RENK.ince, 3);
    for (let v = o.min; v <= o.max; v += o.cizik || 1) cizgi(c, g, [X(v), o.y - 6], [X(v), o.y + 6], RENK.ince, 2);
    const et = {};
    (o.etiket || []).forEach((v) => { et[v] = yazi(c, g, X(v), o.y + 36, String(v), { size: o.size || 20, kalin: 600, renk: RENK.soluk }); });
    const aralik = (lo, hi, renk) => {
      const ag = c.S('g', {}, g);
      cizgi(c, ag, [X(lo), o.y], [X(hi), o.y], renk, 8, { 'stroke-opacity': 0.7 });
      [lo, hi].forEach((v) => c.S('circle', { cx: X(v), cy: o.y, r: 8, fill: ZEMIN, stroke: renk, 'stroke-width': 3 }, ag));
      return ag;
    };
    return { g, X, et, aralik };
  }
  /* 11'lik taban ve 7'lik kol; yanında üçüncü kenarın canlı boyu. */
  function duzenek(c, svg) {
    const m = mentese(c, svg, { A: [320, 470], taban: 11, kol: 7, S: 34 });
    yazi(c, svg, 850, 196, 'üçüncü kenar', { size: 22, kalin: 500, renk: RENK.soluk });
    const tKenar = yazi(c, svg, 850, 250, '', { size: 46, kalin: 700, renk: RENK.A });
    const ciz = (d) => { m.ciz(d); tKenar.textContent = sayi(m.karsi()); };
    ciz(60);
    return { m, ciz };
  }

  /* ---- 1. Menteşeyi aç ---- */
  async function menteseyiAc(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg);
    const ust = yazi(c, svg, 430, 96, '', { size: 36, kalin: 700 });
    gizle(ust);
    await c.say('11 ve 7 metrelik iki çubuk A’da menteşeli.', { speak: 'On bir ve yedi metrelik iki çubuk A’da menteşeli.' });
    await c.say('Uçlarını birleştiren mavi kenar, üçgenin üçüncü kenarı.');
    await tahminAl(c, { q: 'Menteşeyi açarsak üçüncü kenar en çok kaç metre olabilir?', options: ['11 m', '18 m’ye yakın', 'İstediğimiz kadar'] });
    await par(c.say('Kolu sonuna kadar açıyoruz.'), c.tween(2200, (e) => d.ciz(lerp(60, 180, e)), ease.inOut));
    ust.textContent = '7 + 11 = 18';
    await par(c.say('Üç çubuk tek çizgide: üçüncü kenar 18, ama üçgen yok.', { speak: 'Üç çubuk tek çizgide: üçüncü kenar on sekiz, ama üçgen yok.' }), belir(c, ust, 400));
    await c.say('Üçgen kalsın diye üçüncü kenar 18’den <b>kısa</b> olmalı.', { speak: 'Üçgen kalsın diye üçüncü kenar on sekizden kısa olmalı.' });
    await par(c.say('Şimdi kolu kapatıyoruz.'), (async () => { await belir(c, ust, 250, 0); await c.tween(2000, (e) => d.ciz(lerp(180, 40, e)), ease.inOut); })());
    await c.choice({
      tag: 'Tahmin et', q: 'Kol tabanın üstüne yatınca üçüncü kenar kaç metreye iner?',
      options: ['0 m', '4 m', '7 m'], answer: 1,
      hints: ['Kolun ucu B’ye ulaşamaz: kol 7, taban 11.', '', 'Kol 7 m; sorulan, kolun ucu ile B arasındaki uzaklık.'],
      right: '11 − 7 = 4.',
    });
    ust.textContent = '11 − 7 = 4';
    await par(c.say('Kol tamamen kapandı: yine tek çizgi, üçüncü kenar 4.', { speak: 'Kol tamamen kapandı: yine tek çizgi, üçüncü kenar dört.' }), (async () => { await c.tween(1300, (e) => d.ciz(lerp(40, 0, e)), ease.inOut); await belir(c, ust, 400); })());
    await c.say('Üçgen kalsın diye üçüncü kenar 4’ten <b>uzun</b> olmalı.', { speak: 'Üçgen kalsın diye üçüncü kenar dörtten uzun olmalı.' });
  }

  /* ---- 2. Aralığı gez ---- */
  async function araligiGez(c) {
    const svg = c.svg(1000, 562);
    const sd = sayiDogrusu(c, svg, { x0: 140, x1: 860, y: 70, min: 0, max: 20, cizik: 2, etiket: [0, 4, 18, 20] });
    const bant = sd.aralik(4, 18, RENK.A);
    bant.firstChild.style.opacity = 0;   // önce yalnızca iki uç; bant cevaptan sonra
    const d = duzenek(c, svg);
    const isaret = nokta(c, svg, [0, 70], RENK.A, 9);
    const durum = yazi(c, svg, 500, 150, '', { size: 24, kalin: 600 });
    const sonuc = renkli(c, svg, 500, 150, [''], { size: 34, kalin: 700 });
    gizle(sonuc);
    const ciz = (v) => {
      d.ciz(v);
      const k = d.m.karsi(), yok = v < 0.5 || v > 179.5;
      isaret.setAttribute('cx', sd.X(k)); isaret.setAttribute('fill', yok ? RENK.kotu : RENK.A);
      durum.textContent = yok ? 'tek çizgi: üçgen yok' : 'üçgen var'; durum.style.fill = yok ? RENK.kotu : RENK.iyi;
    };
    ciz(60);
    await c.say('Açıyı değiştir: üçüncü kenar hangi değerleri alıyor?', { noWait: true });
    const sl = c.slider({ label: 'Çubuklar arasındaki açı', min: 0, max: 180, step: 5, value: 60, fmt: (v) => v + '°', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove();
    await c.choice({
      tag: 'Ne gördün?', q: 'Üçgen var iken üçüncü kenar hangi değerleri aldı?',
      options: ['4 ile 18 arasındaki her değeri; 4 ve 18 hariç', '4’ten 18’e her değeri; ikisi de dahil', 'Yalnızca tam sayıları'], answer: 0,
      hints: ['', 'Tam 4 ve tam 18’de çubuklar tek çizgide: üçgen yok.', 'Nokta tam sayıların arasında da durdu: 9,6 gibi.'],
      right: 'Uçlar dahil değil: açık aralık.',
    });
    ciz(60); gizle(durum);
    parcaKoy(c, sonuc, ['4  <  ', ['a', RENK.A], '  <  18']);
    await par(c.say('Üçüncü kenar a için açık aralık: 4 ile 18 arası.', { speak: 'Üçüncü kenar a için açık aralık: dört ile on sekiz arası.' }), (async () => { await belir(c, bant.firstChild, 400, 1); await belir(c, sonuc, 400); })());
  }

  /* ---- 3. Fark ve toplam ---- */
  async function farkVeToplam(c) {
    const svg = c.svg(1000, 562);
    /* Soldaki üçgen: a = 9 çizilir; b = 7, c = 11. */
    const S = 28, Bd = Math.acos((81 + 121 - 49) / (2 * 9 * 11)), B = [104, 420], C = [104 + 9 * S, 420];
    const A = [B[0] + 11 * S * Math.cos(Bd), B[1] - 11 * S * Math.sin(Bd)];
    ucgen(c, svg, A, B, C, { harf: false });
    const k = kenarlar(c, svg, A, B, C);
    k.yaz(['a', '7', '11']);
    /* Sağda satırlar: solda eşitsizlik, sağda ondan çıkan. */
    const satir = (y, sol, sag, sagRenk) => {
      const g = c.S('g', {}, svg);
      const ifade = yazi(c, g, 470, y, sol, { hiza: 'start', size: 32, kalin: 700 });
      const okG = ok(c, g, [690, y - 11], [740, y - 11], RENK.soluk, 2).g;
      const son = yazi(c, g, 760, y, sag, { hiza: 'start', size: 32, kalin: 700, renk: sagRenk || RENK.A });
      gizle(ifade, okG, son);
      return { g, ifade, okG, son };
    };
    const s1 = satir(150, 'a < 7 + 11', 'a < 18'), s2 = satir(230, '11 < a + 7', 'a > 4'), s3 = satir(310, '7 < a + 11', 'hep doğru', RENK.soluk);
    const sonuc = renkli(c, svg, 700, 400, ['4  <  ', ['a', RENK.A], '  <  18'], { size: 40, kalin: 700 });
    const genel = yazi(c, svg, 700, 480, '|b − c| < a < b + c', { size: 34, kalin: 700, renk: RENK.dis });
    gizle(sonuc, genel);
    const kapat = (s) => belir(c, [s.ifade, s.okG], 300, 0);   // eşitsizlik silinir, çıkan sonuç kalır

    await c.say('Bu aralık üçgen eşitsizliğinden çıkar: her kenar öbür ikisinin toplamından kısa.');
    await par(c.say('Önce a için yazıyoruz: a, 18’den küçük.', { speak: 'Önce a için yazıyoruz: a, on sekizden küçük.' }), (async () => { await belir(c, s1.ifade, 400); await c.wait(500); await belir(c, [s1.okG, s1.son], 400); })());
    await kapat(s1);
    await par(c.say('Şimdi 11’lik kenar için yazıyoruz.', { speak: 'Şimdi on birlik kenar için yazıyoruz.' }), belir(c, s2.ifade, 400));
    await c.choice({
      tag: 'Boşluğu doldur', q: '11 &lt; a + 7. Buradan a için ne çıkar?',
      options: ['a &gt; 4', 'a &lt; 4', 'a &gt; 18'], answer: 0,
      hints: ['', 'İki yandan 7 çıkar: 4 &lt; a kalır.', '18 toplamdı; burada 11’den 7 çıkıyor.'],
      right: '11 − 7 &lt; a: a, 4’ten büyük.',
    });
    await par(c.say('Fark tarafı buradan gelir: a, 4’ten büyük.', { speak: 'Fark tarafı buradan gelir: a, dörtten büyük.' }), belir(c, [s2.okG, s2.son], 400));
    await kapat(s2);
    await par(c.say('7’lik kenarın eşitsizliği her zaman doğru; yeni bilgi vermez.', { speak: 'Yedilik kenarın eşitsizliği her zaman doğru; yeni bilgi vermez.' }), belir(c, [s3.ifade, s3.okG, s3.son], 400));
    await belir(c, s3.g, 300, 0);
    await par(c.say('İkisini birleştir: a, 4 ile 18 arasında.', { speak: 'İkisini birleştir: a, dört ile on sekiz arasında.' }), (async () => { await belir(c, [s1.son, s2.son], 300, 0); await belir(c, sonuc, 400); })());
    k.yaz(['a', 'b', 'c']);
    await par(c.say('Genel hâli: üçüncü kenar farktan büyük, toplamdan küçük.'), belir(c, genel, 450));
    await c.say('Hangisi büyük bilinmiyorsa farkı <b>mutlak değerle</b> yazarız.');
    await c.choice({
      tag: 'Sıra sende', q: 'Bir üçgenin iki kenarı 5 ve 12. Üçüncü kenar a hangi aralıkta?',
      options: ['7 &lt; a &lt; 17', '5 &lt; a &lt; 12', '7 ≤ a ≤ 17'], answer: 0,
      hints: ['', 'Uçlar verilen kenarlar değil: farkları ve toplamları.', 'Uçlar dahil olursa çubuklar tek çizgiye yatar.'],
      right: '12 − 5 = 7 ve 12 + 5 = 17.',
    });
    c.note('<b>|b − c| &lt; a &lt; b + c</b><br>7 ve 11 → 4 &lt; a &lt; 18', 'Üçüncü kenar', 'gs-ucuncu-kenar');
  }

  /* ---- 4. Tam sayı değerleri ---- */
  async function tamSayi(c) {
    const svg = c.svg(1000, 562);
    const sd = sayiDogrusu(c, svg, { x0: 140, x1: 860, y: 90, min: 0, max: 20, cizik: 1, etiket: [4, 18] });
    const bant = sd.aralik(4, 18, RENK.A);
    const etEk = [5, 17].map((v) => yazi(c, svg, sd.X(v), 126, String(v), { size: 20, kalin: 700, renk: RENK.iyi }));
    const tamlar = c.S('g', {}, svg);
    for (let v = 5; v <= 17; v++) nokta(c, tamlar, [sd.X(v), 90], RENK.yazi, 5);
    /* Üç ev: P–Q 11 km, P–R 7 km, R–Q = x (9 çizilir). */
    const S = 30, P = [330, 470], Q = [P[0] + 11 * S, 470], t = Math.acos((49 + 121 - 81) / (2 * 7 * 11)), R = [P[0] + 7 * S * Math.cos(t), P[1] - 7 * S * Math.sin(t)];
    cizgi(c, svg, P, Q, RENK.cizgi, 4); cizgi(c, svg, P, R, RENK.cizgi, 4); cizgi(c, svg, R, Q, RENK.A, 5);
    [P, Q, R].forEach(([x, y]) => c.S('path', { d: `M${x - 15},${y + 12} v-18 l15,-13 l15,13 v18 Z`, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg));
    yazi(c, svg, (P[0] + Q[0]) / 2, 514, '11 km', { size: 22, kalin: 700 });
    yazi(c, svg, (P[0] + R[0]) / 2 - 48, (P[1] + R[1]) / 2, '7 km', { size: 22, kalin: 700 });
    yazi(c, svg, (R[0] + Q[0]) / 2 + 44, (R[1] + Q[1]) / 2 - 8, 'x km', { size: 22, kalin: 700, renk: RENK.A });
    gizle(bant, sd.et[4], sd.et[18], etEk, tamlar);
    await c.say('Üç ev bir üçgenin köşelerinde: iki uzaklık 7 km ve 11 km.', { speak: 'Üç ev bir üçgenin köşelerinde: iki uzaklık yedi ve on bir kilometre.' });
    await par(c.say('Üçüncü uzaklık x, 4 ile 18 arasında.', { speak: 'Üçüncü uzaklık x, dört ile on sekiz arasında.' }), belir(c, [bant, sd.et[4], sd.et[18]], 450));
    await c.choice({
      tag: 'Soru 1 / 3', q: 'x’in alabileceği en küçük tam sayı değeri kaçtır?',
      options: ['3', '4', '5'], answer: 2,
      hints: ['3, aralığın dışında: 4’ten küçük.', 'x tam 4 olursa evler tek çizgide kalır; 4 dahil değil.', ''],
      right: '4’ten büyük ilk tam sayı: 5.',
    });
    await belir(c, etEk[0], 300);
    await c.choice({
      tag: 'Soru 2 / 3', q: 'x’in alabileceği en büyük tam sayı değeri kaçtır?',
      options: ['17', '18', '19'], answer: 0,
      hints: ['', '18 dahil değil: evler tek çizgide kalır.', '19, toplamdan (18) büyük.'],
      right: '18’den küçük son tam sayı: 17.',
    });
    await belir(c, [etEk[1], tamlar], 350);
    await c.choice({
      tag: 'Soru 3 / 3', q: 'x kaç farklı tam sayı değeri alabilir?',
      options: ['12', '13', '14'], answer: 1,
      hints: ['17 − 5 = 12 aradaki adım sayısı; iki uç da sayılır.', '', '4 ve 18 sayılmaz; 5’ten 17’ye say.'],
      right: '5’ten 17’ye: 17 − 5 + 1 = 13.',
    });
    await c.say('Uçlar dahil değil: sayarken 4 ile 18’i atla.', { speak: 'Uçlar dahil değil: sayarken dört ile on sekizi atla.' });
  }

  /* ---- 5. Ortak kenar ---- */
  async function ortakKenar(c) {
    const svg = c.svg(1000, 562);
    /* Şekil x = 10 için çizilir: ABC (6, 8, 10) ve ACD (8, 13, 10). */
    const S = 24, A = [150, 300], C = [A[0] + 10 * S, 300], B = [A[0] + 3.6 * S, 300 - 4.8 * S], D = [A[0] - 0.25 * S, 300 + Math.sqrt(64 - 0.0625) * S];
    c.S('polygon', { points: [A, B, C].map((p) => p.join(',')).join(' '), fill: 'rgba(255,138,91,.10)' }, svg);
    c.S('polygon', { points: [A, C, D].map((p) => p.join(',')).join(' '), fill: 'rgba(61,220,151,.10)' }, svg);
    [[A, B], [B, C], [A, D], [C, D]].forEach(([p, q]) => cizgi(c, svg, p, q, RENK.cizgi, 3));
    cizgi(c, svg, A, C, RENK.A, 5);
    const et = (x, y, m, o = {}) => yazi(c, svg, x, y, m, Object.assign({ size: 22, kalin: 700 }, o));
    et(A[0] - 22, A[1] + 8, 'A'); et(B[0], B[1] - 14, 'B'); et(C[0] + 22, C[1] + 8, 'C'); et(D[0], D[1] + 30, 'D');
    et(172, 232, '6', { renk: RENK.B }); et(332, 232, '8', { renk: RENK.B });
    et(124, 408, '8', { renk: RENK.C }); et(296, 416, '13', { renk: RENK.C });
    et(270, 290, 'x', { renk: RENK.A, size: 24 });
    /* Sağda üç sayı doğrusu: ABC'nin aralığı, ACD'nin aralığı, ortak aralık. */
    const dogru = (y, ad, lo, hi, renk) => {
      const sd = sayiDogrusu(c, svg, { x0: 540, x1: 936, y, min: 0, max: 22, cizik: 2, etiket: [lo, hi], size: 22 });
      yazi(c, sd.g, 500, y + 8, ad, { hiza: 'end', size: 22, kalin: 600, renk });
      sd.aralik(lo, hi, renk); gizle(sd.g); return sd.g;
    };
    const d1 = dogru(150, 'ABC', 2, 14, RENK.B), d2 = dogru(280, 'ACD', 5, 21, RENK.C), d3 = dogru(410, 'ortak', 5, 14, RENK.A);
    await c.say('İki üçgen aynı kenarı paylaşıyor: AC’nin boyu x.');
    await c.choice({
      tag: 'Soru 1 / 3', q: 'ABC üçgeninde öbür kenarlar 6 ve 8. x hangi aralıkta?',
      options: ['2 &lt; x &lt; 14', '6 &lt; x &lt; 8', '0 &lt; x &lt; 14'], answer: 0,
      hints: ['', 'Uçlar verilen kenarlar değil: farkları ve toplamları.', 'Alt uç fark olmalı: 8 − 6 = 2.'],
      right: '8 − 6 = 2 ve 8 + 6 = 14.',
    });
    await belir(c, d1, 400);
    await c.choice({
      tag: 'Soru 2 / 3', q: 'ACD üçgeninde öbür kenarlar 8 ve 13. x hangi aralıkta?',
      options: ['5 &lt; x &lt; 21', '8 &lt; x &lt; 13', '5 &lt; x &lt; 13'], answer: 0,
      hints: ['', 'Uçlar verilen kenarlar değil: farkları ve toplamları.', 'Üst uç toplam olmalı: 13 + 8 = 21.'],
      right: '13 − 8 = 5 ve 13 + 8 = 21.',
    });
    await belir(c, d2, 400);
    await c.choice({
      tag: 'Soru 3 / 3', q: 'x iki üçgenin de kenarı; iki aralığı birden sağlamalı. Hangi aralıkta?',
      options: ['2 &lt; x &lt; 21', '5 &lt; x &lt; 14', '2 &lt; x &lt; 5'], answer: 1,
      hints: ['x = 3 olsa ACD kurulmaz: 3 + 8, 13’ten küçük.', '', 'Bu değerlerde ACD kurulmaz: x, 5’ten büyük olmalı.'],
      right: 'İki aralığın ortak kısmı: 5 &lt; x &lt; 14.',
    });
    await par(c.say('Ortak kenar, iki aralığın <b>kesişiminde</b> kalır.'), belir(c, d3, 450));
    await c.say('Üçüncü kenar, farktan büyük, toplamdan küçüktür.');
  }

  Ders.start({
    id: 'geometrik-sekiller-b4', kicker: 'Konu B · Kenarlar ve açılar', title: 'Üçüncü kenar hangi aralıkta?', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Üçüncü kenar hangi aralıkta?',
      hook: 'Elinde <b>7 m</b> ve <b>11 m</b>’lik iki çubuk var. Üçgen kurmak için üçüncü çubuk en kısa ve en uzun ne kadar olabilir?',
      button: 'Derse başla ›',
    },
    goals: ['İki kenarı bilinen üçgende üçüncü kenarın aralığını yazar.', 'Aralıktaki tam sayı değerlerini ve ortak kenarlı iki üçgenin ortak aralığını bulur.'],
    scenes: [
      { title: 'Menteşeyi aç', goal: 'Üçüncü kenarın en çok ve en az ne kadar olabileceğini gör.', run: menteseyiAc },
      { title: 'Aralığı gez', goal: 'Üçüncü kenarın 4 ile 18 arasındaki her değeri aldığını gör.', run: araligiGez },
      { title: 'Fark ve toplam', goal: 'Aralığı üçgen eşitsizliğinden çıkar, genel hâlini yaz.', run: farkVeToplam },
      { title: 'Tam sayı değerleri', goal: 'Aralıktaki tam sayıları uçları atlayarak say.', run: tamSayi },
      { title: 'Ortak kenar', goal: 'İki üçgenin paylaştığı kenarın ortak aralığını bul.', run: ortakKenar },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgenin iki kenarı 6 ve 10. Üçüncü kenar aşağıdakilerden hangisi olamaz?',
        options: ['4', '5', '15'], answer: 0,
        why: ['10 − 6 = 4: üçüncü kenar tam 4 olursa çubuklar tek çizgiye yatar.', '4 < 5 < 16: aralığın içinde.', '4 < 15 < 16: aralığın içinde.'],
        scene: 1,
      },
      {
        q: 'İki kenar 3 ve 8. Üçüncü kenarın alabileceği tam sayı değerleri kaç tanedir?',
        options: ['5', '6', '7'], answer: 0,
        why: ['5 < a < 11: 6, 7, 8, 9, 10. Beş değer.', 'Uçlardan biri (5 ya da 11) sayılmış; ikisi de dahil değil.', '5 ve 11 dahil değil; yalnızca aradakiler sayılır.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>Üçüncü kenar, farktan büyük, toplamdan küçüktür.</b>',
      '|b − c| &lt; a &lt; b + c. Uçlar dahil değil: orada çubuklar tek çizgiye yatar.',
      'Ortak kenarlı iki üçgende kenar, iki aralığın kesişiminde kalır.',
    ],
    nextLesson: { href: 'c1-bu-ispat-her-ucgende-calisir-mi.html', label: 'Sonraki: Bu ispat her üçgende çalışır mı? ›' },
  });
})();
