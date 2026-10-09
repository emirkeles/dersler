/* A1 — Yansıma ve öteleme: yer değişir, ölçü değişmez
   Yansıma ve öteleme şeklin yerini değiştirir; kenar, açı, çevre ve alan değişmez: görüntü şekle eştir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md
   Sıra plan/KURALLAR.md 3.2'ye göredir: önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, ara, araHepsi, yansit, otele, yazi, renkli, cizgi, nokta, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma, aciYayi, aciIci, bayrak } = window.KIT;

  const ABC = [[2, 3], [2, 7], [5, 7]];          // |AB| = 4, |BC| = 3, |AC| = 5 birim; dik açı B'de
  const HARF = ['A', 'B', 'C'], HARF2 = ['A′', 'B′', 'C′'];
  const TX = 706;                                 // sağdaki tablonun sol kenarı
  const BOSLUK = '\u00a0\u00a0\u00a0';                // tablo sütunları arasındaki boşluk (daralmaz)

  /* Zemin, mavi ABC, dikey yansıma doğrusu (sütun s) ve turuncu görüntü. */
  function yansimaKur(c, o = {}) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), s = o.sutun || 8;
    const P = z.N(o.pts || ABC), U = z.P(s, -0.4), V = z.P(s, 11.4);
    const d = dogru(c, svg, U, V, { ad: o.dAd === false ? null : 'd', adKay: [20, 22] });
    const u = cokgen(c, svg, P, RENK.sekil, { harf: o.harf === false ? null : HARF });
    const P2 = P.map((k) => yansit(k, U, V));
    const g = cokgen(c, svg, P2, RENK.goruntu, { harf: o.harf2 === false ? null : HARF2 });
    return { svg, z, P, P2, U, V, d, u, g };
  }
  /* Tablo satırı: mavi şekil ölçüsü, turuncu görüntü ölçüsü. */
  const satir = (c, svg, i, sol, sag) => renkli(c, svg, TX, 150 + i * 52, [[sol, RENK.sekil], BOSLUK, [sag, RENK.goruntu]], { hiza: 'start', size: 25 });
  const kalin = (c, svg, P, Q, renk) => cizgi(c, svg, P, Q, renk, 7);

  /* ---- 1. Yansıma ---- */
  async function yansima(c) {
    const k = yansimaKur(c), { svg, z, P, P2 } = k;
    gizle(k.u.g, k.d.g, k.g.g, k.g.adlar);
    k.g.koy(P);

    await c.say('Bir kilim ustası motiflerini önce kareli kâğıda çizer.');
    await par(c.say('Bu üçgen bir motifin parçası; köşeleri A, B ve C.'), belir(c, k.u.g, 450));
    await par(c.say('Usta üçgeni d doğrusuna göre yansıtıyor.'), belir(c, k.d.g, 450));
    await par(c.say('Her köşe doğrunun öbür yanına, aynı uzaklığa geçer.'), (async () => {
      await belir(c, k.g.g, 250);
      await c.tween(1500, (e) => k.g.koy(araHepsi(P, P2, e)), Ders.ease.inOut);
    })());
    // C köşesi: doğrunun iki yanında 3'er birim.
    const olcu = c.S('g', {}, svg), M = z.P(8, 7);
    cizgi(c, olcu, P[2], M, RENK.sekil, 5); cizgi(c, olcu, M, P2[2], RENK.goruntu, 5);
    yazi(c, olcu, (P[2][0] + M[0]) / 2, M[1] + 30, '3', { size: 24, kalin: 700, renk: RENK.sekil });
    yazi(c, olcu, (P2[2][0] + M[0]) / 2, M[1] + 30, '3', { size: 24, kalin: 700, renk: RENK.goruntu });
    gizle(olcu);
    await par(c.say('C köşesi doğruya 3 birim uzakta; görüntüsü C′ de öyle.', { speak: 'C köşesi doğruya üç birim uzakta; görüntüsü C üssü de öyle.' }), belir(c, olcu, 400));
    olcu.remove();
    await par(c.say('Üç köşeyi birleştirince üçgenin görüntüsü çıkar: A′B′C′.', { speak: 'Üç köşeyi birleştirince üçgenin görüntüsü çıkar: A üssü, B üssü, C üssü.' }), belir(c, k.g.adlar, 400));
    await par(c.say('d doğrusuna <b>yansıma doğrusu</b> denir.'), c.tween(900, (e) => k.d.hat.setAttribute('stroke-width', 3.5 + 4 * Math.sin(Math.PI * e))));
    const Pn = nokta(c, svg, z.P(8, 5), RENK.dogru, 8), halka = c.S('circle', { cx: z.P(8, 5)[0], cy: z.P(8, 5)[1], r: 8, fill: 'none', stroke: RENK.dogru, 'stroke-width': 2.5 }, svg);
    gizle(Pn);
    await par(c.say('Doğrunun üstündeki bir nokta yansıyınca yerinde kalır.'), (async () => {
      await belir(c, Pn, 300);
      await c.tween(900, (e) => { halka.setAttribute('r', 8 + 22 * e); halka.style.opacity = 1 - e; });
    })());
    halka.remove();

    // Örnekle göster: kenarlar tek tek karşılaştırılır.
    await c.say('Şimdi üçgen ile görüntüsünün kenarlarını karşılaştıralım.');
    const s1 = satir(c, svg, 0, 'AB 4', 'A′B′ 4'), s2 = satir(c, svg, 1, 'BC 3', 'B′C′ 3');
    const s3 = satir(c, svg, 2, 'AC 5', 'A′C′ ?'), soru = s3.lastChild;
    gizle(s1, s2, s3);
    let v = [kalin(c, svg, P[0], P[1], RENK.sekil), kalin(c, svg, P2[0], P2[1], RENK.goruntu)];
    await par(c.say('AB kenarı 4 birim; görüntüsü A′B′ de 4 birim.', { speak: 'A B kenarı dört birim; görüntüsü A üssü B üssü de dört birim.' }), belir(c, s1, 400));
    v.forEach((e) => e.remove());
    v = [kalin(c, svg, P[1], P[2], RENK.sekil), kalin(c, svg, P2[1], P2[2], RENK.goruntu)];
    await par(c.say('BC kenarı 3 birim; B′C′ de 3 birim.', { speak: 'B C kenarı üç birim; B üssü C üssü de üç birim.' }), belir(c, s2, 400));
    v.forEach((e) => e.remove());

    // Birlikte çöz: tablonun üçüncü satırını öğrenci tamamlar.
    v = [kalin(c, svg, P[0], P[2], RENK.sekil), kalin(c, svg, P2[0], P2[2], RENK.goruntu)];
    await belir(c, s3, 350);
    await c.choice({
      tag: 'Birlikte çöz', q: 'AC kenarı 5 birim. A′C′ kaç birimdir?',
      options: ['3 birim', '5 birim', '8 birim'], answer: 1,
      hints: ['3 birim B′C′ kenarıydı; A′C′ en uzun kenarın görüntüsü.', '', 'Yansıma kenarı uzatmaz; öteki iki kenar da aynı kalmıştı.'],
      right: 'Evet. A′C′ de 5 birim.',
    });
    cevapla(soru, 'A′C′ 5');
    v.forEach((e) => e.remove());
    await c.say('Üç kenarın üçü de aynı kaldı.');
  }

  /* ---- 2. Ne değişti, ne değişmedi? ---- */
  async function neDegisti(c) {
    const k = yansimaKur(c, { dAd: false }), { svg, P, P2 } = k;
    const row = (i, m, renk) => yazi(c, svg, TX, 130 + i * 50, m, { hiza: 'start', size: 25, renk: renk || RENK.yazi });
    const r0 = row(0, 'kenarlar: aynı'), r1 = row(1, 'açılar: aynı'), r2 = row(2, 'çevre: 12 = 12'), r3 = row(3, 'alan: 6 = ?');
    gizle(r1, r2, r3);
    // Açı işaretleri: dik açı ve iki dar açı, iki üçgende aynı biçimde.
    const isaret = (Q, renk) => {
      const dik = aciYayi(c, svg, Q[1], Q[0], Q[2], renk, 30, { dik: true });
      const ya = aciYayi(c, svg, Q[0], Q[1], Q[2], renk, 44), yc = aciYayi(c, svg, Q[2], Q[0], Q[1], renk, 30);
      const ia = aciIci(Q[0], Q[1], Q[2], 70), ic = aciIci(Q[2], Q[0], Q[1], 52);
      const ta = yazi(c, svg, ia[0], ia[1] + 8, '37°', { size: 20, kalin: 700, renk }), tc = yazi(c, svg, ic[0], ic[1] + 8, '53°', { size: 20, kalin: 700, renk });
      return { dik, yay: [ya, yc], olcu: [ta, tc] };
    };
    const i1 = isaret(P, RENK.sekil), i2 = isaret(P2, RENK.goruntu);
    gizle(i1.dik, i2.dik, i1.yay, i2.yay, i1.olcu, i2.olcu);

    await c.say('Kenarlar aynı kaldı; peki açılar?');
    await par(c.say('B köşesindeki açı dik; B′ köşesindeki de dik.', { speak: 'B köşesindeki açı dik; B üssü köşesindeki de dik.' }), belir(c, [i1.dik, i2.dik], 400));
    await par(c.say('Öteki iki açı da görüntüde aynı ölçüde.'), belir(c, [...i1.yay, ...i2.yay, ...i1.olcu, ...i2.olcu, r1], 450));
    [...i1.olcu, ...i2.olcu].forEach((e) => e.remove());
    await c.say('Çevre, kenarların toplamıdır: 4 + 3 + 5 = 12 birim.', { speak: 'Çevre, kenarların toplamıdır: dört artı üç artı beş, on iki birim.' });
    await par(c.say('Görüntünün kenarları aynı; çevresi de 12 birim.', { speak: 'Görüntünün kenarları aynı; çevresi de on iki birim.' }), belir(c, r2, 400));
    await par(c.say('Alan dik kenarlardan bulunur: 4 × 3 ÷ 2 = 6 birimkare.', { speak: 'Alan dik kenarlardan bulunur: dört çarpı üç bölü iki, altı birimkare.' }), belir(c, r3, 400));

    // Sor: alan.
    await c.choice({
      tag: 'Sıra sende', q: 'Görüntünün dik kenarları da 4 ve 3 birim. Alanı kaç birimkaredir?',
      options: ['12', '3', '6'], answer: 2,
      hints: ['12 çevrenin ölçüsüydü; alan dik kenarlardan bulunur.', 'Dik kenarlar yine 4 ve 3 birim; alan küçülmez.', ''],
      right: 'Evet. Aynı dik kenarlar, aynı alan: 6 birimkare.',
    });
    cevapla(r3, 'alan: 6 = 6');
    await c.say('Kenar, açı, çevre, alan: dördü de değişmedi.');

    // Değişenler: yer ve ters çevrilme.
    [r0, r1, r2, r3].forEach((e) => e.remove());
    row(0, 'değişmeyen:', RENK.soluk); row(1, 'kenar, açı, çevre, alan');
    const d0 = row(3, 'değişen:', RENK.soluk), d1 = row(4, 'yer'), d2 = row(5, 'ters çevrildi');
    gizle(d0, d1, d2);
    await par(c.say('Değişen ilk şey üçgenin yeri.'), belir(c, [d0, d1], 400));
    await par(c.say('Bir şey daha değişti: görüntü <b>ters çevrilmiş</b>.'), belir(c, d2, 400));
    const o1 = dolasma(c, svg, P, RENK.sekil), o2 = dolasma(c, svg, P2, RENK.goruntu);
    gizle(o1, o2);
    await par(c.say('A’dan B’ye, sonra C’ye gidelim: saatin tersi yönünde dönüyoruz.', { speak: '[thoughtful] A’dan B’ye, sonra C’ye gidelim: saatin tersi yönünde dönüyoruz.' }), belir(c, o1, 450));
    await par(c.say('Görüntüde aynı sırayla gidince saat yönünde dönüyoruz.'), belir(c, o2, 450));
    await c.say('Ayna görüntüsü böyledir: sağ ile sol yer değiştirir.');
    c.note('<b>Yansıma:</b> kenar, açı, çevre, alan değişmez; şekil ters çevrilir.', 'Yansıma', 'eb-yansima');
  }

  /* ---- 3. Öteleme ---- */
  async function oteleme(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    const P = z.N([[2, 5], [2, 9], [5, 9]]), v = [8 * z.b, -3 * z.b], P2 = P.map((k) => otele(k, v));
    cokgen(c, svg, P, RENK.sekil, { harf: HARF });
    const g = cokgen(c, svg, P, RENK.goruntu, { harf: HARF2 });
    const oklar = c.S('g', {}, svg);
    P.forEach((k, i) => ok(c, oklar, ara(k, P2[i], 0.04), ara(k, P2[i], 0.96)));
    const rows = [satir(c, svg, 0, 'AB 4', 'A′B′ 4'), satir(c, svg, 1, 'BC 3', 'B′C′ 3'), satir(c, svg, 2, 'AC 5', 'A′C′ 5')];
    gizle(g.g, g.adlar, oklar, rows);

    await par(c.say('Usta aynı üçgeni bu kez kaydırıyor: 8 birim sağa, 3 birim yukarı.', { speak: 'Usta aynı üçgeni bu kez kaydırıyor: sekiz birim sağa, üç birim yukarı.' }), (async () => {
      await belir(c, g.g, 250);
      await c.tween(1600, (e) => g.koy(araHepsi(P, P2, e)), Ders.ease.inOut);
      await belir(c, g.adlar, 300);
    })());
    await c.say('Bu dönüşümün adı <b>öteleme</b>.');
    await par(c.say('Ötelemede her nokta aynı doğrultuda, aynı yönde, aynı uzaklıkta kayar.'), belir(c, oklar, 500));
    await c.say('Üç köşenin okları aynı boyda ve birbirine paralel.');
    await belir(c, oklar, 300, 0.25);
    await par(c.say('Kenarlar yine 4, 3 ve 5 birim.', { speak: 'Kenarlar yine dört, üç ve beş birim.' }), belir(c, rows, 450));
    await c.say('Açılar, çevre ve alan da aynı.');

    // Sor: ters çevrilme ötelemede var mı?
    await c.choice({
      tag: 'Sıra sende', q: 'Yansımada görüntü ters çevrilmişti. Ötelenen üçgen için hangisi doğrudur?',
      options: ['Ters çevrildi; sağı ile solu yer değiştirdi', 'Ters çevrilmedi; yalnızca yeri değişti', 'Yeri de değişmedi'], answer: 1,
      hints: ['Köşeleri dolaş: iki üçgende de aynı yönde dönüyorsun.', '', 'Üçgen 8 birim sağa, 3 birim yukarı gitti.'],
      right: 'Evet. Köşeleri dolaşma yönü iki üçgende de aynı.',
    });
    const o1 = dolasma(c, svg, P, RENK.sekil), o2 = dolasma(c, svg, P2, RENK.goruntu);
    gizle(o1, o2);
    await par(c.say('Öteleme şekli ters çevirmez; yalnızca kaydırır.'), belir(c, [o1, o2], 450));
    c.note('<b>Öteleme:</b> her nokta aynı yönde, aynı uzaklıkta kayar; ölçüler değişmez.', 'Öteleme', 'eb-oteleme');
  }

  /* ---- 4. Hangi dönüşüm? ---- */
  async function hangiDonusum(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g1 = c.S('g', {}, svg);
    const P = z.N(ABC), d = dogru(c, g1, z.P(8, -0.4), z.P(8, 11.4), { ad: 'd', adKay: [20, 22] });
    cokgen(c, g1, P, RENK.sekil, { harf: HARF });
    const g = cokgen(c, g1, P, RENK.goruntu, { harf: HARF2 });
    yazi(c, g1, TX, 150, 'kenarlar: 4, 3, 5', { hiza: 'start', size: 25, renk: RENK.goruntu });
    const t1 = yazi(c, g1, TX, 202, '', { hiza: 'start', size: 25, renk: RENK.sekil }), t2 = yazi(c, g1, TX, 254, '', { hiza: 'start', size: 25, renk: RENK.goruntu });
    const ciz = (s) => {
      const U = z.P(s, -0.4), V = z.P(s, 11.4);
      d.koy(U, V); g.koy(P.map((k) => yansit(k, U, V)));
      const n = String(s - 5).replace('.', ',');
      t1.textContent = 'C ile d arası: ' + n; t2.textContent = 'C′ ile d arası: ' + n;
    };
    ciz(7);

    // Dene: doğru kayar, ölçüler değişmez.
    await c.say('Doğruyu kaydır; kenarlara ve uzaklıklara bak.', { noWait: true });
    const sl = c.slider({ label: 'Yansıma doğrusunun yeri', min: 6, max: 8, step: 0.5, value: 7, fmt: () => '', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await c.say('Doğru nereye giderse gitsin kenarlar değişmiyor.');
    await c.say('Köşe ile görüntüsü, doğruya hep eşit uzaklıkta.');

    // Anlat: yer değiştirme uzaklıkları yansımada farklı, ötelemede eşit.
    ciz(8); t1.remove(); t2.remove();
    const P2 = g.pts(), yol = c.S('g', {}, g1);
    cizgi(c, yol, P[0], P2[0], RENK.cizgi, 2.5, { 'stroke-dasharray': '5 6' }); cizgi(c, yol, P[2], P2[2], RENK.cizgi, 2.5, { 'stroke-dasharray': '5 6' });
    yazi(c, yol, z.P(6.6, 3)[0], P[0][1] - 12, '12', { size: 24, kalin: 700 }); yazi(c, yol, z.P(9.4, 7)[0], P[2][1] + 32, '6', { size: 24, kalin: 700 });
    gizle(yol);
    await par(c.say('Yansımada doğruya yakın köşe az, uzak köşe çok yer değiştirir.'), belir(c, yol, 450));
    yol.remove(); gizle(d.g);
    const P3 = P.map((k) => otele(k, [8 * z.b, 2 * z.b])), oklar = c.S('g', {}, g1);
    P.forEach((k, i) => ok(c, oklar, ara(k, P3[i], 0.05), ara(k, P3[i], 0.95)));
    gizle(oklar);
    await par(c.say('Ötelemede ise bütün köşeler aynı uzaklıkta yer değiştirir.'), (async () => {
      await belir(c, [g.g, ...g.adlar], 250, 0); g.koy(P3);
      await belir(c, [g.g, ...g.adlar, oklar], 400);
    })());

    // Sınıflandır: üç çift; doğru ve oklar cevaptan sonra belirir.
    c.clearSay(); g1.remove();
    const ciftler = [
      { a: bayrak(3, 2), don: (k) => otele(k, [6 * z.b, 2 * z.b]), cevap: 1, ipucu: 'Bayrağın ucu iki şekilde de sağa bakıyor; ters çevrilmemiş.', dogru: 'Evet. Bütün köşeler aynı uzaklıkta kaymış: öteleme.' },
      { a: bayrak(3, 3), eksen: [[8, -0.4], [8, 11.4]], cevap: 0, ipucu: 'Bayrağın ucu öbür yana bakıyor: şekil ters çevrilmiş.', dogru: 'Evet. Şekil ters çevrilmiş: yansıma.' },
      { a: bayrak(6, 1), eksen: [[1, 5.5], [15, 5.5]], cevap: 0, ipucu: 'Köşeler aynı uzaklıkta kaymamış: direğin tepesi çok, dibi az yer değiştirmiş.', dogru: 'Evet. Bayrak baş aşağı çevrilmiş: yansıma.' },
    ];
    for (const cf of ciftler) {
      const gr = c.S('g', {}, svg), A = z.N(cf.a);
      const E = cf.eksen ? z.N(cf.eksen) : null, B = A.map((k) => (E ? yansit(k, E[0], E[1]) : cf.don(k)));
      cokgen(c, gr, A, RENK.sekil); cokgen(c, gr, B, RENK.goruntu);
      gizle(gr); await belir(c, gr, 400);
      await c.choice({
        tag: 'Sıra sende', q: 'Bu çiftte hangi dönüşüm var?', options: ['Yansıma', 'Öteleme'], answer: cf.cevap,
        hints: cf.cevap === 0 ? ['', cf.ipucu] : [cf.ipucu, ''], right: cf.dogru,
      });
      const iz = c.S('g', {}, gr);
      if (E) dogru(c, iz, E[0], E[1]); else [0, 2, 5].forEach((i) => ok(c, iz, ara(A[i], B[i], 0.05), ara(A[i], B[i], 0.95)));
      gizle(iz); await belir(c, iz, 450); await c.wait(900);
      if (cf !== ciftler[ciftler.length - 1]) { await belir(c, gr, 300, 0); gr.remove(); }
    }
    await c.say('Ters çevrilmişse yansıma, yalnızca kaymışsa öteleme.');
  }

  /* ---- 5. Eş şekiller ---- */
  async function esSekiller(c) {
    const k = yansimaKur(c, { harf2: false, dAd: false }), { svg, z, P, P2 } = k;
    const onerme = yazi(c, svg, 500, 36, 'Yansıma ya da öteleme altındaki görüntü, şekle eştir.', { size: 23, kalin: 700 });
    gizle(onerme);

    // Örnekle göster: katla, üst üste otur.
    await par(c.say('Kâğıdı yansıma doğrusundan katlayalım.'), c.tween(1700, (e) => k.g.koy(araHepsi(P2, P, e)), Ders.ease.inOut));
    await c.say('Görüntü üçgenin tam üstüne oturdu: hiçbir yeri taşmıyor.');
    await c.say('Üst üste tam oturan şekillere <b>eş şekiller</b> denir.');
    const P3 = P.map((q) => otele(q, [8 * z.b, 2 * z.b]));
    await belir(c, [k.g.g, k.d.g], 250, 0); k.g.koy(P3); await belir(c, k.g.g, 300);
    await par(c.say('Ötelenen üçgeni geri kaydırınca o da tam oturur.'), c.tween(1500, (e) => k.g.koy(araHepsi(P3, P, e)), Ders.ease.inOut));

    // Başka şekil, başka doğru.
    await belir(c, [k.u.g, k.g.g], 300, 0); k.u.g.remove(); k.g.g.remove(); k.d.g.remove();
    const D = z.N([[3, 1], [6, 2], [5, 5], [2, 4]]), U = z.P(1.6, 10.4), V = z.P(11.4, 0.6), D2 = D.map((q) => yansit(q, U, V));
    const g2 = c.S('g', {}, svg);
    dogru(c, g2, U, V); cokgen(c, g2, D, RENK.sekil); const gor = cokgen(c, g2, D2, RENK.goruntu);
    gizle(g2);
    await par(c.say('Başka bir şekille, başka bir doğruyla denesek sonuç değişmez.'), (async () => {
      await belir(c, g2, 400); await c.wait(500);
      await c.tween(1500, (e) => gor.koy(araHepsi(D2, D, e)), Ders.ease.inOut);
      await c.wait(500);
      await c.tween(900, (e) => gor.koy(araHepsi(D, D2, e)), Ders.ease.inOut);
    })());
    await c.say('Bunu bir önerme olarak yazalım.');
    await par(c.say('Bir şeklin yansıma ya da öteleme altındaki görüntüsü şekle eştir.'), belir(c, onerme, 450));

    // Sor: önerme yeni bir şekle uygulanır.
    c.clearSay(); await belir(c, g2, 300, 0); g2.remove();
    const R = z.N([[2, 3], [6, 3], [6, 6], [2, 6]]), U2 = z.P(8, 0.2), V2 = z.P(8, 10.8), R2 = R.map((q) => yansit(q, U2, V2));
    const g3 = c.S('g', {}, svg);
    dogru(c, g3, U2, V2); cokgen(c, g3, R, RENK.sekil);
    cizgi(c, g3, R[3], R[1], RENK.sekil, 3); yazi(c, g3, z.P(3.7, 4.2)[0], z.P(3.7, 4.2)[1], '5', { size: 26, kalin: 700, renk: RENK.sekil });
    const gr = c.S('g', {}, g3);
    cokgen(c, gr, R2, RENK.goruntu); cizgi(c, gr, R2[3], R2[1], RENK.goruntu, 3);
    const cvp = yazi(c, gr, z.P(12.3, 4.2)[0], z.P(12.3, 4.2)[1], '?', { size: 26, kalin: 700, renk: RENK.goruntu });
    gizle(g3, gr);
    await belir(c, g3, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Köşegeni 5 birim olan bu dikdörtgen doğruya göre yansıtılıyor. Görüntünün köşegeni kaç birimdir?',
      options: ['10 birim', 'Doğrunun yerine bağlıdır', '5 birim'], answer: 2,
      hints: ['Yansıma uzunluğu iki katına çıkarmaz; görüntü şekle eştir.', 'Doğru kayınca görüntünün yeri değişir, ölçüleri değişmez.', ''],
      right: 'Evet. Görüntü eş; köşegeni de 5 birim.',
    });
    await belir(c, gr, 450); cevapla(cvp, '5');
    await c.say('Görüntü eş olduğuna göre bütün uzunlukları aynıdır: köşegeni de.');
    c.note('<b>Yansıma ve öteleme:</b> görüntü şekle eştir. Yer değişir, ölçü değişmez.', 'Eşlik', 'eb-eslik-donusum');
    await c.say('Yer değişir, ölçü değişmez.', { speak: '[thoughtful] Yer değişir, ölçü değişmez.' });
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a1', kicker: 'Konu A · Geometrik dönüşümler', title: 'Yansıma ve öteleme: yer değişir, ölçü değişmez', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Yansıma ve öteleme: yer değişir, ölçü değişmez',
      hook: 'Bir kilimde aynı motif hem yan yana hem ayna gibi ters durur. İkisi de <b>aynı motif</b> midir?',
      button: 'Derse başla ›',
    },
    goals: ['Yansıma ve ötelemede değişen ve değişmeyen özellikleri ayırır.', 'Bir çiftte yansıma mı öteleme mi uygulandığını söyler.', 'Görüntünün şekle eş olduğunu önerme olarak ifade eder ve kullanır.'],
    scenes: [
      { title: 'Yansıma', goal: 'Üçgen ile yansımasının kenarlarını karşılaştır.', run: yansima },
      { title: 'Ne değişti, ne değişmedi?', goal: 'Ölçüler aynı kalır; yer değişir, şekil ters çevrilir.', run: neDegisti },
      { title: 'Öteleme', goal: 'Her nokta aynı yönde, aynı uzaklıkta kayar.', run: oteleme },
      { title: 'Hangi dönüşüm?', goal: 'Ters çevrilmişse yansıma, yalnızca kaymışsa öteleme.', run: hangiDonusum },
      { title: 'Eş şekiller', goal: 'Görüntü şeklin tam üstüne oturur: eştirler.', run: esSekiller },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgen bir doğruya göre yansıtıldı; görüntüsü ters çevrilmiş duruyor. Üçgen ile görüntüsü için hangisi doğrudur?',
        options: ['Eş değildirler; ters çevrilince açılar değişir.', 'Eştirler; kenarları ve açıları aynıdır.', 'Eş değildirler; uzak köşeler çok kaydığı için kenarlar uzar.'], answer: 1,
        why: ['Yansıma açıları değiştirmez; yalnızca şekli ters çevirir.', 'Ters çevrilmek ölçüyü değiştirmez; görüntü üçgenin üstüne tam oturur.', 'Köşeler farklı uzaklıkta kayar ama kenar uzunlukları aynı kalır.'],
        scene: 4,
      },
      {
        q: 'Bir kenarı 5 cm olan kare 7 cm sola ötelendi. Görüntünün çevresi kaç cm’dir?',
        options: ['20 cm', '27 cm', '13 cm'], answer: 0,
        why: ['Öteleme kenarları değiştirmez: 4 × 5 = 20 cm.', '7 cm karenin ne kadar kaydığıdır; çevreye eklenmez.', 'Çevre dört kenarın toplamıdır; kayma uzaklığıyla ilgisi yoktur.'],
        scene: 2,
      },
      {
        q: 'Yansımada aşağıdakilerden hangisi değişir?',
        options: ['Şeklin alanı', 'Şeklin iç açıları', 'Şeklin yeri'], answer: 2,
        why: ['Kenarlar aynı kaldığı için alan da aynı kalır.', 'Dik açı dik kalır; öteki açılar da değişmez.', 'Görüntü doğrunun öbür yanındadır; ölçüler aynı kalır.'],
        scene: 1,
      },
      {
        q: 'Bir bayrak motifinin direği solda, ucu sağa bakıyor. Görüntüsünde direk sağda, uç sola bakıyor. Hangi dönüşüm uygulanmıştır?',
        options: ['Yansıma', 'Öteleme', 'İkisi de olabilir'], answer: 0,
        why: ['Sağ ile sol yer değiştirmiş: şekil ters çevrilmiş.', 'Öteleme şekli ters çevirmez; uç yine sağa bakardı.', 'Öteleme ters çevirmediği için bu görüntüyü veremez.'],
        scene: 3,
      },
      {
        q: 'ABC üçgeninde |AB| = 7 cm. Üçgen önce bir doğruya göre yansıtıldı, sonra ötelendi. Son görüntüde bu kenarın karşılığı kaç cm’dir?',
        options: ['14 cm', 'Bilinemez', '7 cm'], answer: 2,
        why: ['İki dönüşüm uzunlukları toplamaz; ikisi de uzunluğu korur.', 'Doğrunun ve ötelemenin yeri bilinmese de uzunluk değişmez.', 'Yansıma da öteleme de kenar uzunluğunu değiştirmez.'],
        scene: 4,
      },
    ],
    summary: [
      '<b>Yer değişir, ölçü değişmez.</b>',
      'Yansıma ve öteleme kenarı, açıyı, çevreyi ve alanı değiştirmez.',
      'Yansıma şekli <b>ters çevirir</b>; öteleme yalnızca kaydırır.',
      'Görüntü şekle <b>eştir</b>.',
    ],
    nextLesson: { href: 'a2-donme.html', label: 'Sonraki: Dönme: merkez ve açı ›' },
  });
})();
