/* C3 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md (## C3)
   Yazar notu: içerik MEB Fizik 9 s. 61, 66 ve 68–71'den. Öğrenciye kitap ya da sayfa anılmaz. Sıfırla çarpma yoktur.
   Renk: çarpılan vektör (K, F) RENK.a; çarpım sonucu RENK.b. Kaydırıcı sekiz duraklıdır; sıfır durağı yoktur. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, belir, sol, kaybol, par, gizle, ok, okCiz, yonGulu, izgara, kutular, tablo, insan, araba } = KIT;

  /* ---- Konu C'nin ortak yardımcıları (C1–C3 dosyalarında aynıdır) ---- */
  /* t yazısının i. harfinin üstüne küçük ok çizer. */
  function ustOk(c, g, t, i, size, renk) {
    const n = t.textContent.length, kucuk = /[a-zçğıöşü]/.test(t.textContent[i]);
    let a = null, b = null;
    try { a = t.getStartPositionOfChar(i).x; b = t.getEndPositionOfChar(i).x; } catch (e) { a = null; }
    if (a == null || !(b > a)) {
      const w = size * 0.6, x = +t.getAttribute('x'), hiza = t.getAttribute('text-anchor');
      a = (hiza === 'middle' ? x - n * w / 2 : hiza === 'end' ? x - n * w : x) + i * w; b = a + w;
    }
    const y = +t.getAttribute('y') - size * (kucuk ? 0.7 : 0.9), m = (a + b) / 2, w = Math.max((b - a) / 2 + 1, size * 0.3), u = size * 0.15;
    return c.S('path', { d: `M ${m - w} ${y} L ${m + w} ${y} M ${m + w - u} ${y - u} L ${m + w} ${y} L ${m + w - u} ${y + u}`, fill: 'none', stroke: renk, 'stroke-width': Math.max(2, size * 0.075), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  }
  /* Üstü oklu harf içeren yazı: ^ işaretinden sonraki harfin üstüne ok konur ('^A = −^D'). Grup döner; g.yazi yazının kendisidir. */
  function vyazi(c, p, x, y, metin, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 28, renk = o.renk || RENK.yazi, idx = [];
    let duz = '';
    for (const ch of metin) { if (ch === '^') idx.push(duz.length); else duz += ch; }
    const t = yazi(c, g, x, y, duz, { size, renk, hiza: o.hiza, kalin: o.kalin });
    g.oklar = idx.map((i) => ustOk(c, g, t, i, size, renk));
    g.yazi = t; return g;
  }
  /* Kareli düzlemdeki oka üstü oklu ad verir; ad okla birlikte taşınır (v.ad). */
  function adla(c, iz, v, ad, o = {}) {
    const g = vyazi(c, iz.g, 0, 0, ad, { size: o.size || 26, renk: o.renk || RENK.a }), yer = {};
    v.etiket = { setAttribute: (k, d) => { yer[k] = d; g.setAttribute('transform', `translate(${yer.x || 0} ${yer.y || 0})`); } };
    v.ad = g; v.koy(v.i, v.j);
    return g;
  }
  const hepsi = (vs) => [vs].flat().flatMap((v) => (v.ad ? [v, v.ad] : [v]));
  const ciz = (c, v, ms = 500) => { v.style.opacity = ''; return par(okCiz(c, v, ms), v.ad ? belir(c, v.ad, ms) : []); };
  const mat = (c, vs, hedef = 0.3, ms = 300) => sol(c, hepsi(vs), hedef, ms);
  const sessiz = (p) => { p.catch(() => {}); };

  /* Düz pist: kulvarlar alt alta, çizgiler 50 m arayla. x(m) çizginin, y(k) kulvar ortasının yeri. */
  function pist(c, p, kulvarlar, o = {}) {
    const g = c.S('g', {}, p), x0 = o.x0 || 210, x1 = o.x1 || 840, y0 = o.y || 78, h = o.h || 52, n = kulvarlar.length;
    const x = (m) => x0 + (x1 - x0) * m / 200, y = (k) => y0 + h * (k + 0.5);
    kutu(c, g, x0 - 16, y0, x1 - x0 + 32, n * h, { renk: RENK.cizgi, kalin: 2, rx: 4 });
    for (let k = 1; k < n; k++) cizgi(c, g, x0 - 16, y0 + k * h, x1 + 16, y0 + k * h, { renk: RENK.ince, kalin: 2 });
    [0, 50, 100, 150, 200].forEach((m) => {
      cizgi(c, g, x(m), y0, x(m), y0 + n * h, { renk: RENK.cizgi, kalin: 2 });
      yazi(c, g, x(m), y0 - 16, m === 200 ? '200 m' : String(m), { size: 24, renk: RENK.soluk, kalin: 500 });
    });
    kulvarlar.forEach(([no, ad], k) => { yazi(c, g, 44, y(k) + 8, no, { size: 24, renk: RENK.soluk }); yazi(c, g, 76, y(k) + 8, ad, { size: 24, hiza: 'start' }); });
    const okKat = c.S('g', {}, g), noktaKat = c.S('g', {}, g);
    const noktalar = (k, m1, m2) => {
      const ng = c.S('g', {}, noktaKat);
      c.S('circle', { cx: x(m1), cy: y(k), r: 8, fill: RENK.vurgu }, ng);
      c.S('circle', { cx: x(m2), cy: y(k), r: 8, fill: RENK.koyu, stroke: RENK.vurgu, 'stroke-width': 3 }, ng);
      return ng;
    };
    const kosu = (k, m1, m2) => ok(c, okKat, x(m1), y(k), x(m2) - Math.sign(m2 - m1) * 9, y(k), { renk: RENK.a, kalin: 6 });
    return { g, x, y, noktalar, kosu, alt: y0 + n * h };
  }

  const sayiYaz = (k) => String(k).replace('.', ',').replace('-', '−');

  /* Koli ve ona etki eden altı kuvvet (1 kare = 10 N): F₁–F₃ doğuya, F₄–F₆ batıya bakar. */
  function koliDuzlem(c, svg) {
    const iz = izgara(c, svg, { kare: 50, sutun: 14, satir: 6, x: 150, y: 40, olcek: '1 kare = 10 N' });
    const gul = yonGulu(c, svg, 925, 100, { r: 26 }), [kx, ky] = iz.P(6, 5.6), F = {};
    kutu(c, iz.g, kx, ky, 100, 260, { renk: '#c9a36b', fill: '#4a3a24', rx: 6 }); cizgi(c, iz.g, kx + 50, ky, kx + 50, ky + 260, { renk: '#c9a36b', kalin: 2 });
    [['F₁', 4, 5, 2], ['F₂', 5, 3, 1], ['F₃', 5, 1, 1], ['F₄', 10, 5, -2], ['F₅', 10, 3, -2], ['F₆', 9, 1, -1]].forEach(([ad, i, j, di]) => {
      const v = iz.vektor(i, j, di, 0), [x, y] = iz.P(i, j);
      v.ad = vyazi(c, iz.g, x - Math.sign(di) * 12, y + 9, '^' + ad, { size: 26, renk: RENK.a, hiza: di > 0 ? 'end' : 'start' });
      v.yon = di > 0 ? 'doğu' : 'batı'; v.N = Math.abs(di) * 10;
      F[ad] = v;
    });
    const adlar = Object.keys(F), odak = (sec) => par(adlar.map((ad) => mat(c, F[ad], sec.includes(ad) ? 1 : 0.3, 250)));
    return { iz, gul, F, adlar, odak };
  }

  /* Çarpma düzlemi (sahne 2 ve 3): oklar i0 düşey çizgisinden başlar; solda adı, sağda yönü ve büyüklüğü yazar.
     satir(j, n, ad, renk): j. satırda n karelik ok (eksi: batı). */
  function carpmaDuzlem(c, svg, i0) {
    const iz = izgara(c, svg, { kare: 50, sutun: 10, satir: 8, x: 220, y: 50 }), gul = yonGulu(c, svg, 880, 490, { r: 26 });
    const [bx, b0] = iz.P(i0, 0), [, b1] = iz.P(i0, 8);
    cizgi(c, iz.g, bx, b0, bx, b1, { renk: RENK.vurgu, kalin: 2, kesik: '6 8' });
    const alt = c.S('g', {}, iz.g);
    const satir = (j, n, ad, renk) => {
      const v = iz.vektor(i0, j, n, 0, { renk }), [, y] = iz.P(0, j);
      v.ad = vyazi(c, svg, 200, y + 10, ad, { size: 28, renk, hiza: 'end' });
      v.sonuc = yazi(c, svg, 740, y + 9, `${n > 0 ? 'doğu' : 'batı'}, ${Math.abs(n)} birim`, { size: 24, hiza: 'start' });
      gizle(v, v.ad, v.sonuc); return v;
    };
    return { iz, gul, alt, satir };
  }

  /* ---- Sahne 1 · İki kişi itince ---- */
  async function ikiKisi(c) {
    const svg = c.svg(1000, 562), on = c.S('g', {}, svg), YOL = 450;
    const v0 = ok(c, on, 320, 270, 680, 270, { renk: RENK.a, kalin: 8, uc: 24 });
    const yonAd = yazi(c, on, 680, 232, 'yön', { size: 28, renk: RENK.vurgu }), olcu = c.S('g', {}, on);
    cizgi(c, olcu, 320, 330, 680, 330, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, 320, 320, 320, 340, { renk: RENK.vurgu, kalin: 2 }); cizgi(c, olcu, 680, 320, 680, 340, { renk: RENK.vurgu, kalin: 2 });
    yazi(c, olcu, 500, 374, 'büyüklük', { size: 28, renk: RENK.vurgu });
    gizle(yonAd, olcu);
    await okCiz(c, v0, 700);
    await par(c.say('Bir vektörün yönünü okun ucu, büyüklüğünü okun boyu gösterir.'), (async () => { await belir(c, yonAd); await c.wait(900); await belir(c, olcu); })());
    await kaybol(c, on);
    // Yol, araba ve iten kişi
    const S = c.S('g', {}, svg);
    cizgi(c, S, 60, YOL, 940, YOL, { renk: RENK.ince, kalin: 4 });
    araba(c, S, 610, YOL, { s: 2.2, renk: RENK.soluk });
    insan(c, S, 472, YOL, { s: 1.5, kol: 1, renk: RENK.yazi });
    const arkadas = insan(c, svg, 420, YOL + 12, { s: 1.5, kol: 1, renk: RENK.yazi });
    const iz = izgara(c, svg, { kare: 60, sutun: 8, satir: 2, x: 260, y: 130, olcek: '1 kare = 100 N' }), gul = yonGulu(c, svg, 880, 160, { r: 26 });
    const F = iz.vektor(1, 1, 2, 0), [fx, fy] = iz.P(2, 1);
    adla(c, iz, F, '^F');
    const deger = yazi(c, svg, fx, fy + 38, '200 N', { size: 26, renk: RENK.a });
    gizle(S, arkadas, iz.g, gul, hepsi(F), deger);
    await belir(c, S, 500);
    await c.say('Yolda kalan bir arabayı tek başına doğuya doğru itiyorsun.');
    await belir(c, [iz.g, gul]);
    await c.say('İtme kuvvetin 200 N; ölçek 1 kare = 100 N.', { speak: 'İtme kuvvetin iki yüz newton; ölçek bir kare eşittir yüz newton.' });
    await par(ciz(c, F, 700), belir(c, deger, 700));
    await c.say('Oku doğuya bakan 2 kare olarak çizer ve F deriz.', { speak: 'Oku doğuya bakan iki kare olarak çizer ve fe deriz.' });
    await belir(c, arkadas, 500);
    await c.say('Yanına bir arkadaşın geliyor; o da doğuya 200 N ile itiyor.', { speak: 'Yanına bir arkadaşın geliyor; o da doğuya iki yüz newton ile itiyor.' });
    await c.say('Aynı yöndeki kuvvetlerin büyüklükleri toplanır; kanepede de böyle olmuştu.');
    const toplam = yazi(c, svg, 500, 90, '200 N + 200 N = 400 N', { size: 32, renk: RENK.vurgu }); gizle(toplam);
    await belir(c, toplam);
    await c.say('İkinizin birlikte itişi 200 N + 200 N = 400 N eder.', { speak: 'İkinizin birlikte itişi iki yüz newton artı iki yüz newton eşittir dört yüz newton eder.' });
    await c.choice({ tag: 'Uygula', q: 'İkinizin itişini tek okla çizeceksin. Yeni ok, F okuna göre nasıl olmalı?',
      options: ['Aynı yönde, iki katı boyda', 'Aynı yönde, aynı boyda', 'Ters yönde, iki katı boyda'], answer: 0,
      hints: ['', 'Aynı boydaki ok yine 200 N’ı gösterir. 400 N için ok 4 kare, yani iki katı olmalı.', 'İkiniz de doğuya itiyorsunuz; okun yönü değişmez, yalnızca boyu uzar.'],
      right: 'Evet. Yön aynı kalır, boy iki katına çıkar.' });
    F.children[0].setAttribute('stroke', RENK.b); F.children[1].setAttribute('fill', RENK.b);
    await par(kaybol(c, [F.ad, deger, toplam]), c.tween(900, (e) => F.koy(1, 1, 2 + 2 * e, 0)));
    F.koy(1, 1, 4, 0);
    const [gx, gy] = iz.P(3, 1), deger2 = yazi(c, svg, gx, gy + 38, '400 N', { size: 26, renk: RENK.b }); gizle(deger2);
    await belir(c, deger2);
    await c.say('Yeni ok doğuya bakan 4 kare: F okunun tam 2 katı.', { speak: 'Yeni ok doğuya bakan dört kare: fe okunun tam iki katı.' });
    adla(c, iz, F, '2^F', { renk: RENK.b }); gizle(F.ad);
    await belir(c, F.ad);
    await c.say('Bu vektörü 2F diye yazarız.', { speak: 'Bu vektörü iki fe diye yazarız.' });
    await c.say('Bir vektörü bir sayıyla çarpmak, ondan yeni bir vektör elde etmektir.', { speak: 'Bir vektörü bir sayıyla çarpmak, [short pause] ondan yeni bir vektör elde etmektir.' });
  }

  /* ---- Sahne 2 · Pozitif sayıyla çarpmak ---- */
  async function pozitif(c) {
    const svg = c.svg(1000, 562), { iz, gul, alt, satir } = carpmaDuzlem(c, svg, 3);
    const K = satir(7, 2, '^K', RENK.a), K2 = satir(5, 4, '2^K', RENK.b), Ky = satir(3, 1, '½^K', RENK.b), K32 = satir(1, 3, '3/2 ^K', RENK.b);
    const goster = async (v, ms = 700) => { await par(ciz(c, v, ms)); };
    gizle(iz.g, gul);
    await belir(c, [iz.g, gul], 500);
    await c.say('Bir vektör bir gerçek sayıyla çarpılabilir.');
    await goster(K); await belir(c, K.sonuc);
    await c.say('K vektörü doğu yönünde 2 birim olsun.', { speak: 'Ke vektörü doğu yönünde iki birim olsun.' });
    // 2K: kareler ikişer ikişer yanar
    const [x0, y0] = iz.P(3, 5), k1 = c.S('rect', { x: x0 + 3, y: y0 + 3, width: 94, height: 44, rx: 6, fill: RENK.b, 'fill-opacity': 0.22 }, alt), k2 = c.S('rect', { x: x0 + 103, y: y0 + 3, width: 94, height: 44, rx: 6, fill: RENK.b, 'fill-opacity': 0.4 }, alt);
    gizle(k1, k2);
    K2.style.opacity = ''; K2.koy(3, 5, 0, 0);
    await par(belir(c, K2.ad), belir(c, k1, 400), c.tween(600, (e) => K2.koy(3, 5, 2 * e, 0)));
    await c.wait(350);
    await par(belir(c, k2, 400), c.tween(600, (e) => K2.koy(3, 5, 2 + 2 * e, 0)));
    K2.koy(3, 5, 4, 0);
    await c.say('K’yi 2 ile çarpınca 2K vektörünü elde ederiz.', { speak: 'Ke vektörünü iki ile çarpınca iki ke vektörünü elde ederiz.' });
    await belir(c, K2.sonuc);
    await c.say('2K yine doğuya bakar; büyüklüğü 2 × 2 = 4 birimdir.', { speak: 'İki ke yine doğuya bakar; büyüklüğü iki çarpı iki eşittir dört birimdir.' });
    await c.say('Sayı pozitif ve 1’den büyükse yön değişmez, büyüklük artar.', { speak: 'Sayı pozitif ve birden büyükse yön değişmez, büyüklük artar.' });
    await belir(c, Ky.ad);
    await c.say('Şimdi K’yi 1/2 ile çarpalım.', { speak: 'Şimdi ke vektörünü bir bölü iki ile çarpalım.' });
    await goster(Ky); await belir(c, Ky.sonuc);
    await c.say('½K yine doğuya bakar; büyüklüğü 2’nin yarısı, yani 1 birimdir.', { speak: 'Bir bölü iki ke yine doğuya bakar; büyüklüğü ikinin yarısı, yani bir birimdir.' });
    await c.say('Sayı pozitif ve 1’den küçükse yön değişmez, büyüklük azalır.', { speak: 'Sayı pozitif ve birden küçükse yön değişmez, büyüklük azalır.' });
    await c.choice({ tag: 'Uygula', q: 'K doğu yönünde 2 birim. K’yi 3/2 ile çarpınca elde edilen vektör hangisidir?',
      options: ['Batı yönünde 3 birim', 'Doğu yönünde 1 birim', 'Doğu yönünde 3 birim'], answer: 2,
      hints: ['Yönü çeviren kesir değil, eksi işaretidir. 3/2 pozitiftir; ok doğuya bakmayı sürdürür.', 'Her kesir küçültmez: 3/2 sayısı 1’den büyüktür. 2 birimin 3/2 katı 3 birimdir.', ''],
      right: 'Evet. Yön aynı, boy 3 birim.' });
    await goster(K32, 900);
    await c.say('3/2 pozitif olduğu için yön doğu kalır.', { speak: 'Üç bölü iki pozitif olduğu için yön doğu kalır.' });
    await belir(c, K32.sonuc);
    await c.say('3/2, 1’den büyük olduğu için boy 2 birimden 3 birime çıkar.', { speak: 'Üç bölü iki, birden büyük olduğu için boy iki birimden üç birime çıkar.' });
    c.note('<b>Pozitif sayı yönü değiştirmez; 1’den büyükse ok uzar, 1’den küçükse kısalır.</b><br>K doğu 2 birim → 2K doğu 4 birim', 'Pozitif çarpan', 'c3-pozitif');
  }

  /* ---- Sahne 3 · Negatif sayıyla çarpmak ---- */
  async function negatif(c) {
    const svg = c.svg(1000, 562), { iz, satir } = carpmaDuzlem(c, svg, 5);
    const K = satir(7, 2, '^K', RENK.a), Ke = satir(5, -2, '−^K', RENK.b), K32 = satir(3, -3, '−3/2 ^K', RENK.b), K2 = satir(1, -4, '−2^K', RENK.b);
    /* Ok önce K'nin kopyası olarak belirir, sonra ters döner. */
    const kopya = async (v) => { v.koy(5, v.j, 2, 0); v.style.opacity = 0; await par(belir(c, v, 400), belir(c, v.ad, 400)); };
    const cevir = (v, a, b, ms = 900) => c.tween(ms, (e) => v.koy(5, v.j, a + (b - a) * e, 0)).then(() => v.koy(5, v.j, b, 0));
    K.style.opacity = ''; gizle(K.ad, K.sonuc);
    await belir(c, [K.ad, K.sonuc], 400);
    await kopya(Ke);
    await c.say('Şimdi K’yi negatif bir sayıyla, −1 ile çarpalım.', { speak: 'Şimdi ke vektörünü negatif bir sayıyla, eksi bir ile çarpalım.' });
    await cevir(Ke, 2, -2);
    await c.say('Çarpılan sayı negatifse vektörün yönü tersine döner.', { speak: '[thoughtful] Çarpılan sayı negatifse vektörün yönü tersine döner.' });
    await belir(c, Ke.sonuc);
    await c.say('−K batıya bakar; büyüklüğü yine 2 birimdir.', { speak: 'Eksi ke batıya bakar; büyüklüğü yine iki birimdir.' });
    await par(c.say('Büyüklüğü aynı, yönü ters: −K, K’nin zıt vektörüdür.', { speak: 'Büyüklüğü aynı, yönü ters: eksi ke, ke vektörünün zıt vektörüdür.' }),
      (async () => { await iz.tasi(c, Ke, 5, 7, { ms: 800 }); await c.wait(1300); await iz.tasi(c, Ke, 5, 5, { ms: 800 }); })());
    await c.say('Yani bir vektörü −1 ile çarpmak onun zıt vektörünü verir.', { speak: 'Yani bir vektörü eksi bir ile çarpmak onun zıt vektörünü verir.' });
    await kopya(K32);
    await c.say('Şimdi K’yi −3/2 ile çarpalım.', { speak: 'Şimdi ke vektörünü eksi üç bölü iki ile çarpalım.' });
    await cevir(K32, 2, -2);
    await c.say('Eksi işareti yönü çevirir: ok batıya bakar.');
    await cevir(K32, -2, -3, 700);
    await c.say('3/2 ise boyu ayarlar: 2 birimin 3/2 katı 3 birimdir.', { speak: 'Üç bölü iki ise boyu ayarlar: iki birimin üç bölü iki katı üç birimdir.' });
    await belir(c, K32.sonuc);
    await c.say('Demek ki −3/2 K batı yönünde 3 birimdir.', { speak: 'Demek ki eksi üç bölü iki ke batı yönünde üç birimdir.' });
    await c.choice({ tag: 'Uygula', q: 'K doğu yönünde 2 birim. −2K vektörü hangisidir?',
      options: ['Batı yönünde 1 birim', 'Batı yönünde 4 birim', 'Doğu yönünde −4 birim'], answer: 1,
      hints: ['Eksi işareti vektörü küçültmez, yalnızca yönünü çevirir. Boyu 2 sayısı ayarlar: 2 × 2 = 4 birim.', '', 'Büyüklük okun boyudur, eksi olmaz. Eksi işareti okun ters yöne, batıya baktığını söyler.'],
      right: 'Evet. Yön ters, boy iki katı.' });
    await kopya(K2); await cevir(K2, 2, -2); await cevir(K2, -2, -4, 700);
    await belir(c, K2.sonuc);
    await c.say('−2K batıya bakar ve boyu 4 birimdir.', { speak: 'Eksi iki ke batıya bakar ve boyu dört birimdir.' });
    await c.say('K’den kısa değil, K’nin iki katı uzunluğundadır.', { speak: '[thoughtful] Ke vektöründen kısa değil, ke vektörünün iki katı uzunluğundadır.' });
    c.note('<b>Negatif sayı yönü ters çevirir; boyu sayının büyüklüğü ayarlar.</b><br>−K, K’nin zıt vektörüdür', 'Negatif çarpan', 'c3-negatif');
  }

  /* ---- Sahne 4 · Doğrultu değişmez: beş durum ---- */
  async function besDurum(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 50, sutun: 8, satir: 8, x: 110, y: 60 });
    const [dx0, dy] = iz.P(0, 7), [dx1] = iz.P(8, 7);
    const dogru = cizgi(c, svg, dx0 - 20, dy, dx1 + 20, dy, { renk: RENK.vurgu, kalin: 2, kesik: true }), dogruAd = yazi(c, svg, (dx0 + dx1) / 2, dy - 14, 'doğu–batı doğrultusu', { size: 24, renk: RENK.vurgu });
    const V = [[6, 2, '^K', RENK.a], [5, 4, '2^K', RENK.b], [4, 1, '½^K', RENK.b], [3, -2, '−^K', RENK.b], [2, -3, '−3/2 ^K', RENK.b]].map(([j, n, ad, renk]) => {
      const v = iz.vektor(4, j, n, 0, { renk }), [, y] = iz.P(0, j);
      v.ad = vyazi(c, svg, 96, y + 10, ad, { size: 26, renk, hiza: 'end' }); gizle(v, v.ad); return v;
    });
    const yari = iz.vektor(4, 1, -1, 0, { renk: RENK.b }); gizle(yari);
    for (const v of V) await ciz(c, v, 320);
    await c.say('Beş okun hepsi doğu–batı doğrultusunda kaldı.');
    await c.say('Bir sayıyla çarpmak vektörün doğrultusunu değiştirmez.');
    const t = tablo(c, svg, { x: 535, y: 70, satir: 58, size: 24, sutunlar: [{ ad: '', w: 205 }, { ad: 'yön', w: 100 }, { ad: 'büyüklük', w: 140 }] });
    gizle(t.g);
    await par(kaybol(c, [dogruAd, ...V.map((v) => v.ad)]), sol(c, V.slice(1), 0.3));
    await belir(c, t.g);
    await c.say('Değişebilen iki şey vardır: yön ve büyüklük.', { speak: 'Değişebilen iki şey vardır: [short pause] yön ve büyüklük.' });
    const satir = async (h, parlak) => {
      const r = t.satir(h, { renkler: [RENK.vurgu] }); gizle(r);
      await par(belir(c, r, 350), sol(c, [...V.slice(1), yari].filter((v) => v !== parlak && +v.style.opacity > 0.3), 0.3, 250), parlak ? sol(c, parlak, 1, 250) : []);
    };
    await satir(['1’den büyük', 'aynı', 'artar'], V[1]);
    await c.say('Sayı 1’den büyükse yön aynı kalır, büyüklük artar.', { speak: 'Sayı birden büyükse yön aynı kalır, büyüklük artar.' });
    await satir(['0 ile 1 arası', 'aynı', 'azalır'], V[2]);
    await c.say('Sayı 0 ile 1 arasındaysa yön aynı kalır, büyüklük azalır.', { speak: 'Sayı sıfır ile bir arasındaysa yön aynı kalır, büyüklük azalır.' });
    yari.style.opacity = 0.3;
    await par(satir(['−1 ile 0 arası', 'ters', 'azalır'], yari), okCiz(c, yari, 600));
    await c.say('Sayı −1 ile 0 arasındaysa yön ters döner, büyüklük azalır.', { speak: 'Sayı eksi bir ile sıfır arasındaysa yön ters döner, büyüklük azalır.' });
    await satir(['−1', 'ters', 'aynı'], V[3]);
    await c.say('Sayı −1 ise yön ters döner, büyüklük değişmez.', { speak: 'Sayı eksi bir ise yön ters döner, büyüklük değişmez.' });
    await satir(['−1’den küçük', 'ters', 'artar'], V[4]);
    await c.say('Sayı −1’den küçükse yön ters döner, büyüklük artar.', { speak: 'Sayı eksi birden küçükse yön ters döner, büyüklük artar.' });
    // Soru: kuzeye 4 birimlik ok, −0,5 ile çarpılıyor
    await kaybol(c, [t.g, dogru, yari, ...V]);
    const gul = yonGulu(c, svg, 900, 110, { r: 26 }), kuzey = iz.vektor(3, 2, 0, 4, { renk: RENK.a }), guney = iz.vektor(5, 6, 0, -2, { renk: RENK.b });
    const [kx, ky] = iz.P(3, 4), [gx, gy] = iz.P(5, 5);
    kuzey.ad = yazi(c, svg, kx - 14, ky + 9, '4 birim', { size: 24, renk: RENK.a, hiza: 'end' }); guney.ad = yazi(c, svg, gx + 14, gy + 9, '2 birim', { size: 24, renk: RENK.b, hiza: 'start' });
    const carp = yazi(c, svg, 690, 150, '× (−0,5)', { size: 34, renk: RENK.vurgu });
    gizle(gul, hepsi([kuzey, guney]), carp);
    await par(belir(c, [gul, carp]), ciz(c, kuzey, 700));
    await c.choice({ tag: 'Uygula', q: 'Kuzey yönünde 4 birimlik bir vektör −0,5 ile çarpılıyor. Sonuç hangisidir?',
      options: ['Güney yönünde 2 birim', 'Kuzey yönünde 2 birim', 'Doğu yönünde 2 birim'], answer: 0,
      hints: ['', 'Çarpan negatif; yön ters döner. Boy yarıya iner ama ok artık güneye bakar.', 'Sayıyla çarpmak doğrultuyu değiştirmez. Ok kuzey–güney doğrusunda kalır, yalnızca ters yöne döner.'],
      right: 'Evet. Yön ters döner, boy yarıya iner.' });
    await ciz(c, guney, 800);
    await c.say('Ok kuzey–güney doğrultusundan çıkmaz; eksi işareti onu güneye çevirir.');
    const t2 = tablo(c, svg, { x: 535, y: 250, satir: 58, size: 24, sutunlar: [{ ad: '', w: 205 }, { ad: 'yön', w: 100 }, { ad: 'büyüklük', w: 140 }] });
    t2.satir(['−1 ile 0 arası', 'ters', 'azalır'], { renkler: [RENK.vurgu] }); gizle(t2.g);
    await belir(c, t2.g);
    await c.say('−0,5 sayısı −1 ile 0 arasındadır: boy 4 birimden 2 birime iner.', { speak: 'Eksi sıfır virgül beş sayısı eksi bir ile sıfır arasındadır: boy dört birimden iki birime iner.' });
    c.note('<b>Sayıyla çarpınca doğrultu değişmez; işaret yönü, sayının büyüklüğü boyu belirler.</b><br>−0,5 → yön ters, boy yarı', 'Çarpanın etkisi', 'c3-bes-durum');
  }

  /* ---- Sahne 5 · Çarpanı sen seç ---- */
  async function secici(c) {
    const svg = c.svg(1000, 562), DEG = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2];
    const iz = izgara(c, svg, { kare: 60, sutun: 10, satir: 4, x: 200, y: 90 }), gul = yonGulu(c, svg, 900, 150, { r: 26 });
    const K = iz.vektor(5, 3, 2, 0, { renk: RENK.a }); adla(c, iz, K, '^K');
    const carp = iz.vektor(5, 1, 2, 0, { renk: RENK.b }), [, y1] = iz.P(0, 1);
    const sonuc = yazi(c, svg, 500, 410, '', { size: 34, renk: RENK.b });
    let et = null, simdiki = 1;
    const etiketle = (k, acik) => {
      if (et) et.remove();
      et = vyazi(c, svg, 172, y1 + 11, sayiYaz(k) + ' ^K', { size: 30, renk: RENK.b, hiza: 'end' });
      sonuc.textContent = acik ? `${k > 0 ? 'doğu' : 'batı'}, ${sayiYaz(Math.abs(k) * 2)} birim` : '?';
    };
    const git = (k, ms = 900) => { const a = simdiki; simdiki = k; return c.tween(ms, (e) => carp.koy(5, 1, 2 * (a + (k - a) * e), 0)).then(() => carp.koy(5, 1, 2 * k, 0)); };
    gizle(iz.g, gul, carp, hepsi(K));
    await belir(c, [iz.g, gul], 500);
    await c.say('Şimdi çarpanı sen seçeceksin.');
    await ciz(c, K, 600);
    await c.say('K vektörü doğu yönünde 2 birim.', { speak: 'Ke vektörü doğu yönünde iki birim.' });
    await mat(c, K, 0.5);
    etiketle(1, true); await ciz(c, carp, 600);
    await c.say('Önce çarpanın işaretine bak: artıysa ok doğuya, eksiyse batıya bakar.');
    await c.say('Sonra sayının büyüklüğüne bak: boy, 2 birimin o kadar katıdır.', { speak: 'Sonra sayının büyüklüğüne bak: boy, iki birimin o kadar katıdır.' });
    etiketle(1.5, true); await git(1.5);
    await c.say('Örneğin çarpan 1,5 ise ok doğu yönünde 3 birimdir.', { speak: 'Örneğin çarpan bir virgül beş ise ok doğu yönünde üç birimdir.' });
    // Dene: önce tahmin, sonra ok
    const tahminler = [
      [2, ['doğu, 4 birim', 'batı, 4 birim', 'doğu, 1 birim'], 0, ['', 'Çarpan pozitif; yön değişmez, ok doğuya bakar.', '2 ile çarpmak boyu 2 katına çıkarır: 4 birim.']],
      [0.5, ['batı, 1 birim', 'doğu, 1 birim', 'doğu, 4 birim'], 1, ['Kesir yönü çevirmez; yönü yalnızca eksi işareti çevirir.', '', '0,5 ile çarpmak boyu yarıya indirir: 1 birim.']],
      [-1, ['doğu, 2 birim', 'batı, 1 birim', 'batı, 2 birim'], 2, ['Çarpan negatif; ok ters yöne, batıya bakar.', '−1 ile çarpınca boy değişmez: 2 birim.', '']],
      [-0.5, ['batı, 1 birim', 'doğu, 1 birim', 'batı, 4 birim'], 0, ['', 'Çarpan negatif; ok ters yöne, batıya bakar.', '0,5 boyu yarıya indirir: 1 birim.']],
      [-1.5, ['doğu, 3 birim', 'batı, 3 birim', 'batı, 1 birim'], 1, ['Çarpan negatif olduğunda ok ters yöne, batıya bakar.', '', 'Eksi işareti küçültmez; boy 2 birimin 1,5 katıdır: 3 birim.']],
      [-2, ['batı, 1 birim', 'doğu, 4 birim', 'batı, 4 birim'], 2, ['Eksi işareti küçültmez; yönü çevirir, boy 2 katına çıkar.', 'Çarpan negatif; ok ters yöne, batıya bakar.', '']],
    ];
    await c.say('Oku görmeden önce yönünü ve boyunu tahmin et.', { noWait: true });
    for (const [k, sec, dogru, ipucu] of tahminler) {
      await sol(c, carp, 0, 250); etiketle(k, false);
      await c.choice({ tag: 'Tahmin et', q: `Çarpan <b>${sayiYaz(k)}</b> olursa ok nasıl olur?`, options: sec, answer: dogru, hints: ipucu,
        right: k === -1 ? 'Evet. Batı yönünde 2 birim: K’nin zıt vektörü.' : `Evet. ${sec[dogru][0].toUpperCase()}${sec[dogru].slice(1).replace(',', ' yönünde')}.`,
        onPick: (i, tamam) => { if (tamam) { etiketle(k, true); carp.style.opacity = 1; sessiz(git(k)); } } });
    }
    // Serbest keşif: sekiz duraklı kaydırıcı (sıfır yok)
    await c.say('Kaydırıcıyla çarpanı değiştir; okun yönünü ve boyunu izle.', { noWait: true });
    const sl = c.slider({ label: 'Çarpan', min: 0, max: 7, step: 1, value: 5, fmt: (i) => sayiYaz(DEG[i]),
      onInput: (i) => { const k = DEG[i]; simdiki = k; carp.koy(5, 1, 2 * k, 0); etiketle(k, true); } });
    await c.cont('Devam ›');
    sl.remove();
    etiketle(-2, true); await git(-2);
    await c.say('Çarpan −2 iken ok en uzun hâlindeydi: eksi işareti oku küçültmedi.', { speak: '[thoughtful] Çarpan eksi iki iken ok en uzun hâlindeydi: eksi işareti oku küçültmedi.' });
    etiketle(0.5, true); await git(0.5);
    await c.say('Çarpan 0,5 iken ok kısaldı ama yönü değişmedi.', { speak: 'Çarpan sıfır virgül beş iken ok kısaldı ama yönü değişmedi.' });
    const [lx0, ly] = iz.P(0, 1), [lx1] = iz.P(10, 1), cizgiDB = cizgi(c, svg, lx0 - 12, ly, lx0 - 12, ly, { renk: RENK.vurgu, kalin: 2, kesik: true });
    await c.tween(700, (e) => cizgiDB.setAttribute('x2', lx0 - 12 + (lx1 - lx0 + 24) * e));
    await c.say('Hangi çarpanı seçersen seç, ok doğu–batı doğrultusunda kaldı.');
  }

  /* ---- Sahne 6 · Bir vektörü ötekinin cinsinden yazmak ---- */
  async function cinsinden(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 60, sutun: 10, satir: 5, x: 200, y: 60 }), gul = yonGulu(c, svg, 110, 120, { r: 26 });
    const T = [['A', 2, 4, -2, 1], ['B', 3, 4, 4, -1], ['C', 3, 2, -2, 1], ['D', 4, 2, 2, -1]], V = {};
    T.forEach(([ad, i, j, di, yan]) => { const v = iz.vektor(i, j, di, 0, { yan }); adla(c, iz, v, `^${ad}\u00a0\u00a0${Math.abs(di)} birim`, { size: 24 }); gizle(hepsi(v)); V[ad] = v; });
    const adlar = T.map((t) => t[0]), odak = (sec) => par(adlar.map((ad) => mat(c, V[ad], sec.includes(ad) ? 1 : 0.3, 250)));
    const esitlik = (x, metin) => { const e = vyazi(c, svg, x, 450, metin, { size: 44, renk: RENK.vurgu }); gizle(e); return e; };
    await par(c.say('Bazen bir vektörü başka bir vektör cinsinden yazmak gerekir.'), (async () => { for (const ad of adlar) await ciz(c, V[ad], 350); })());
    await c.say('Bunun için iki şeye bakarız: yönler aynı mı, boylar kaç kat?', { speak: '[curious] Bunun için iki şeye bakarız: yönler aynı mı, boylar kaç kat?' });
    await odak(['B', 'D']);
    await c.say('D doğu yönünde 2 birim, B doğu yönünde 4 birim.', { speak: 'De vektörü doğu yönünde iki birim, be vektörü doğu yönünde dört birim.' });
    await iz.tasi(c, V.D, 3, 3, { ms: 900 });
    await c.say('Yönler aynı; öyleyse çarpan pozitif.');
    const iki = iz.vektor(3, 3, 2, 0, { renk: RENK.a, kalin: 4 }); iki.style.opacity = 0.6;
    await iz.tasi(c, iki, 5, 3, { ms: 900 });
    const e1 = esitlik(360, '^B = 2^D');
    await belir(c, e1);
    await c.say('B’nin boyu D’nin boyunun 2 katı: B = 2D.', { speak: 'Be vektörünün boyu de vektörünün boyunun iki katı: be eşittir iki de.' });
    await par(kaybol(c, iki), iz.tasi(c, V.D, 4, 2, { ms: 700 }));
    await odak(['A', 'B']);
    await c.say('Şimdi A ile B’ye bakalım: A batı yönünde 2 birim.', { speak: 'Şimdi a vektörüyle be vektörüne bakalım: a vektörü batı yönünde iki birim.' });
    await iz.tasi(c, V.A, 5, 3, { ms: 900 });
    await c.say('Yönler ters; öyleyse çarpan negatif.');
    const e2 = esitlik(650, '^A = −^B/2');
    await belir(c, e2);
    await c.say('A’nın boyu B’nin boyunun yarısı: A = −B/2.', { speak: 'a vektörünün boyu be vektörünün boyunun yarısı: a eşittir eksi be bölü iki.' });
    await iz.tasi(c, V.A, 2, 4, { ms: 700 });
    await odak(['B', 'C']);
    await c.choice({ tag: 'Uygula', q: 'C batı yönünde 2 birim, B doğu yönünde 4 birim. B vektörü C cinsinden nasıl yazılır?', options: ['B = 2C', 'B = −2C', 'B = −C/2'], answer: 1,
      hints: ['2C batıya bakar; oysa B doğuya bakıyor. Yönler ters olduğu için çarpan negatif olmalı.', '', '−C/2 doğuya bakar ama boyu 1 birim olur. B’nin boyu C’nin boyunun 2 katıdır.'],
      right: 'Evet. B = −2C.' });
    await kaybol(c, [e1, e2]);
    const e3 = esitlik(500, '^B = −2^C');
    await belir(c, e3);
    await c.say('Yönler ters olduğu için eksi, boy iki kat olduğu için 2.', { speak: 'Yönler ters olduğu için eksi, boy iki kat olduğu için iki.' });
    await kaybol(c, [iz.g, gul, e3]);
    // Koli: kuvvetleri F₁ cinsinden yaz
    const k = koliDuzlem(c, svg);
    const kt = kutular(c, svg, ['F₁/2', '−F₁', '−F₁/2'], { x: 110, y: 398, w: 250, h: 148, bosluk: 15, baslikBoy: 26, yaziBoy: 22, adim: 30 });
    kt.basliklar.forEach(([t]) => ustOk(c, kt.g, t, t.textContent.indexOf('F'), 26, RENK.vurgu));
    gizle(k.iz.g, k.gul, kt.g);
    await belir(c, [k.iz.g, k.gul], 500);
    await c.say('Bir koliye etki eden kuvvetleri de böyle yazabiliriz.');
    await k.odak(['F₁']);
    await c.say('F₁ doğu yönünde 20 N; öteki kuvvetleri F₁ cinsinden yazalım.', { speak: 'Fe bir doğu yönünde yirmi newton; öteki kuvvetleri fe bir cinsinden yazalım.' });
    await belir(c, kt.g);
    const sec = ['F₁/2', '−F₁', '−F₁/2'], ozellik = [['doğu', 10], ['batı', 20], ['batı', 10]];
    await c.say('Her kuvveti, onu F₁ cinsinden yazan kartla eşleştir.', { noWait: true });
    for (const ad of ['F₄', 'F₂', 'F₆', 'F₃', 'F₅']) {
      const f = k.F[ad], dogru = ozellik.findIndex(([yon, n]) => yon === f.yon && n === f.N);
      await k.odak(['F₁', ad]);
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> ${f.yon} yönünde ${f.N} N. F₁ cinsinden nasıl yazılır?`, options: sec, answer: dogru,
        hints: ozellik.map(([yon, n], i) => (i === dogru ? '' : yon !== f.yon ? `${sec[i]} ${yon}ya bakar; ${ad} ${f.yon}ya bakıyor.` : `${sec[i]} ${n} N olur; ${ad} ${f.N} N.`)),
        right: `Evet. ${ad} = ${sec[dogru]}.`,
        onPick: (i, tamam) => { if (tamam) sessiz(kt.koy(c, dogru, ad)); } });
    }
    await k.odak(k.adlar);
    await kaybol(c, [k.iz.g, k.gul, kt.g]);
    // Pist: Cihan, Sudem, Şule
    const p = pist(c, svg, [['I', 'Cihan'], ['II', 'Sudem'], ['V', 'Şule']], { y: 130, h: 70 }), gul2 = yonGulu(c, svg, 930, 200, { r: 26 });
    const kosular = [[0, 50], [0, 200], [150, 50]];
    const nk = kosular.map(([a, b], i) => p.noktalar(i, a, b)), oklar = kosular.map(([a, b], i) => p.kosu(i, a, b));
    gizle(p.g, gul2, nk[2], oklar[2]);
    await belir(c, [p.g, gul2], 500);
    await c.say('Pistte Cihan doğuya 50 m, Sudem doğuya 200 m koştu.', { speak: 'Pistte Cihan doğuya elli metre, Sudem doğuya iki yüz metre koştu.' });
    // Cihan'ın oku Sudem'in kulvarında dört kez
    const adim = ok(c, svg, p.x(0), p.y(0), p.x(50), p.y(0), { renk: RENK.yazi, kalin: 4 }); adim.style.opacity = 0.75;
    const isaret = c.S('g', {}, svg);
    await c.tween(600, (e) => adim.ayarla(p.x(0), p.y(0) + (p.y(1) - 18 - p.y(0)) * e, p.x(50), p.y(0) + (p.y(1) - 18 - p.y(0)) * e));
    for (let n = 1; n <= 4; n++) {
      cizgi(c, isaret, p.x(50 * n), p.y(1) - 26, p.x(50 * n), p.y(1) - 10, { renk: RENK.yazi, kalin: 3 });
      if (n < 4) await c.tween(450, (e) => adim.ayarla(p.x(50 * (n - 1 + e)), p.y(1) - 18, p.x(50 * (n + e)), p.y(1) - 18));
    }
    await c.say('Sudem’in vektörü, Cihan’ın vektörünün 4 katıdır.', { speak: 'Sudem’in vektörü, Cihan’ın vektörünün dört katıdır.' });
    await kaybol(c, [adim, isaret]);
    await par(belir(c, nk[2]), ciz(c, oklar[2], 800));
    await c.say('Şule ise batıya 100 m koştu.', { speak: 'Şule ise batıya yüz metre koştu.' });
    await c.choice({ tag: 'Düşün', q: 'Sudem doğu yönünde 200 m, Şule batı yönünde 100 m koştu. Şule’nin vektörü, Sudem’in vektörünün kaç katıdır?', options: ['−2 katı', '1/2 katı', '−1/2 katı'], answer: 2,
      hints: ['−2, Sudem’in vektörünü Şule’ninki cinsinden yazarken çıkar. Şule’nin oku daha kısadır: 100 m, 200 m’nin yarısıdır.', 'Boy oranı doğru ama Şule batıya, Sudem doğuya koştu. Yönler ters olduğu için çarpan negatiftir.', ''],
      right: 'Evet. Ters yön, yarı boy.' });
    await sol(c, [oklar[0], nk[0]], 0.3);
    const son = yazi(c, svg, 525, 420, 'çarpan: −1/2', { size: 34, renk: RENK.vurgu }); gizle(son);
    await belir(c, son);
    await c.say('Şule’nin oku ters yönde ve yarı boyda: çarpan −1/2.', { speak: 'Şule’nin oku ters yönde ve yarı boyda: çarpan eksi bir bölü iki.' });
    await c.say('Sayı okun boyunu ayarlar, eksi işareti yönünü çevirir.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c3', kicker: 'Konu C · Vektörler', title: 'Vektörü bir sayıyla çarpmak', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Vektörü bir sayıyla çarpmak', hook: 'Arabayı tek başına itiyordun; yanına aynı büyüklükte kuvvetle iten bir arkadaşın geldi. İtme okunu nasıl değiştirirsin?', button: 'Derse başla ›' },
    scenes: [
      { title: 'İki kişi itince', goal: 'İki katı kuvveti iki katı boyda bir okla göster.', run: ikiKisi },
      { title: 'Pozitif sayıyla çarpmak', goal: 'Pozitif çarpanın okun boyunu nasıl değiştirdiğini gör.', run: pozitif },
      { title: 'Negatif sayıyla çarpmak', goal: 'Negatif çarpanın yönü ters çevirdiğini gör.', run: negatif },
      { title: 'Doğrultu değişmez: beş durum', goal: 'Çarpanın beş durumunu yön ve büyüklükle eşleştir.', run: besDurum },
      { title: 'Çarpanı sen seç', goal: 'Çarpana bakıp okun yönünü ve boyunu tahmin et.', run: secici },
      { title: 'Bir vektörü ötekinin cinsinden yazmak', goal: 'Bir vektörü başka bir vektörün katı olarak yaz.', run: cinsinden },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'K vektörü doğu yönünde 4 birim. −½K vektörü hangisidir?',
        options: ['Batı yönünde 2 birim', 'Doğu yönünde 2 birim', 'Batı yönünde 8 birim'], answer: 0,
        why: ['Eksi yönü çevirir, 1/2 boyu yarıya indirir: 4 birim → 2 birim.', 'Boy doğru ama eksi işareti atlanmış; ok batıya döner.', '1/2 ile çarpmak boyu yarıya indirir; 8 birim, 2 ile çarpınca çıkar.'], scene: 2 },
      { q: '−3K vektörünün boyu, K’nin boyundan kısa mıdır?',
        options: ['Evet; eksi sayıyla çarpınca vektör küçülür', 'Hayır; boyu K’nin 3 katıdır, yalnızca yönü terstir', 'Evet; büyüklüğü eksi olur'], answer: 1,
        why: ['Eksi işareti küçültmez; yalnızca yönü ters çevirir.', '−1’den küçük sayı yönü ters çevirir, büyüklüğü artırır.', 'Büyüklük okun boyudur; eksi olmaz.'], scene: 3 },
    ],
    summary: ['<b>Sayı okun boyunu ayarlar, eksi işareti yönünü çevirir.</b>', 'Bir sayıyla çarpmak vektörün doğrultusunu değiştirmez.', '−1 ile çarpmak zıt vektörü verir: −K, K’nin zıddıdır.'],
    nextLesson: { href: 'c4-ayni-dogrultuda-bileske.html', label: 'Sonraki: Aynı doğrultuda iki vektör: bileşke ›' },
  });
})();
