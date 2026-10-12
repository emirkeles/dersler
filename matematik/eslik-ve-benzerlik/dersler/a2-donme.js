/* A2 — Dönme: merkez ve açı
   Dönme, şekli bir merkez çevresinde, bir açı kadar, belli bir yönde çevirir; görüntü şekle eştir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md
   Sıra plan/KURALLAR.md 3.2'ye göredir: önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, ara, yansit, otele, dondur, uz, agirlik, yazi, renkli, cizgi, gizle, belir, par, cevapla, zemin, cokgen, dogru, ok, dolasma, aciYayi, bayrak } = window.KIT;
  const { merkezNokta, halka, donenCokgen, donuyor, yayIz, merkezAci, yaricap, ucDonusum } = window.KIT_A;

  const KANAT = [[11, 2], [8, 2], [11, 6]];       // A, B, C; |AB| = 3, |AC| = 4, |BC| = 5; dik açı A'da
  const HARF = ['A', 'B', 'C'], HARF2 = ['A′', 'B′', 'C′'];
  const TX = 706;                                  // sağdaki tablonun sol kenarı
  const BOSLUK = '   ';                // tablo sütunları arasındaki boşluk (daralmaz)
  const f = (x) => String(Math.round((x / 40) * 100) / 100).replace('.', ',');   // px → birim

  /* Zemin, mavi kanat, O merkezi ve d derece dönmüş turuncu görüntü (O en üstte). hayalet: rüzgârgülünün öteki üç kanadı. */
  function kanatKur(c, o = {}) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), O = z.P(8, 6), P = z.N(KANAT);
    let hay = null;
    if (o.hayalet) {
      hay = c.S('g', {}, svg);
      [90, 180, 270].forEach((d) => c.S('polygon', {
        points: P.map((q) => dondur(q, O, d)).map((q) => q.join(',')).join(' '), fill: 'none', stroke: RENK.cizgi,
        'stroke-width': 2, 'stroke-opacity': 0.35, 'stroke-linejoin': 'round',
      }, hay));
    }
    const u = cokgen(c, svg, P, RENK.sekil, { harf: HARF });
    const g = donenCokgen(c, svg, O, P, RENK.goruntu, { harf: HARF2 });
    g.don(o.d == null ? 90 : o.d);
    const m = merkezNokta(c, svg, O, 'O');
    return { svg, z, O, P, u, g, m, hay };
  }
  const satir = (c, svg, i, parcalar) => renkli(c, svg, TX, 150 + i * 52, parcalar, { hiza: 'start', size: 25 });
  const vurgula = (c, el, w) => c.tween(700, (e) => el.setAttribute('stroke-width', w + 4 * Math.sin(Math.PI * e)));
  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');

    // Yansıma: görüntüde yalnızca yer değişir.
    const g1 = c.S('g', {}, svg), P = z.N([[2, 3], [2, 7], [5, 7]]), U = z.P(8, -0.4), V = z.P(8, 11.4);
    dogru(c, g1, U, V, { ad: 'd', adKay: [20, 22] });
    cokgen(c, g1, P, RENK.sekil, { harf: HARF });
    cokgen(c, g1, P.map((q) => yansit(q, U, V)), RENK.goruntu, { harf: HARF2 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir üçgen bir doğruya göre yansıtıldı. Görüntüde hangisi değişir?',
      options: ['Kenar uzunlukları', 'İç açıları', 'Üçgenin yeri'], answer: 2,
      hints: ['Yansıma kenarı, açıyı, çevreyi ve alanı değiştirmez; yer değişir.', 'Yansıma kenarı, açıyı, çevreyi ve alanı değiştirmez; yer değişir.', ''],
      right: 'Evet. Yansımada yalnızca yer değişir.',
    });
    await c.say('Yansıma yalnızca yeri değiştirir; kenar ve açılar aynı kalır.');

    // Öteleme: her nokta aynı uzaklıkta kayar.
    c.clearSay(); await belir(c, g1, 300, 0); g1.remove();
    const g2 = c.S('g', {}, svg), Q = z.N([[2, 5], [2, 9], [5, 9]]), Q2 = Q.map((q) => otele(q, [8 * z.b, -3 * z.b]));
    cokgen(c, g2, Q, RENK.sekil, { harf: HARF });
    cokgen(c, g2, Q2, RENK.goruntu, { harf: HARF2 });
    const oklar = c.S('g', {}, g2);
    Q.forEach((q, i) => ok(c, oklar, ara(q, Q2[i], 0.04), ara(q, Q2[i], 0.96)));
    gizle(g2, oklar); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir şekil ötelendi. Köşelerin yer değiştirme uzaklıkları için hangisi doğrudur?',
      options: ['Hepsi aynıdır', 'Köşeden köşeye değişir', 'Yalnızca ikisi aynıdır'], answer: 0,
      hints: ['', 'Ötelemede her nokta aynı yönde, aynı uzaklıkta kayar.', 'Ötelemede her nokta aynı yönde, aynı uzaklıkta kayar.'],
      right: 'Evet. Bütün köşeler aynı uzaklıkta kayar.',
    });
    await par(c.say('Ötelemede her köşe aynı yönde, aynı uzaklıkta kayar.'), belir(c, oklar, 450));
  }

  /* ---- 2. Dönen kanat ---- */
  async function donenKanat(c) {
    const k = kanatKur(c, { d: 0, hayalet: true }), { svg, O, P, u, g, m, hay } = k;
    const iz = P.map((V) => yayIz(c, svg, O, V));
    const ac = merkezAci(c, svg, O, P[0], 90);
    ac.yayAc(0);
    gizle(u.g, hay, g.g, g.adlar, m.g, ac.g, iz.map((i) => i.g), iz.map((i) => i.uc));

    await par(c.say('Bir rüzgârgülünün kanadı kareli kâğıda çizilmiş: ABC üçgeni.'), belir(c, u.g, 450));
    await par(c.say('Kanat, ortadaki O noktasına tutturulmuş.'), belir(c, [hay, m.g], 450));
    await par(c.say('Rüzgâr esince kanat O çevresinde dönüyor.'), (async () => {
      await belir(c, [g.g, ...iz.map((i) => i.g)], 200);
      await donuyor(c, [g, ...iz], 0, 90, 1800);
    })());
    await par(c.say('O noktası yerinden oynamaz: buna <b>dönme merkezi</b> denir.', { speak: 'O noktası yerinden oynamaz: buna dönme merkezi denir.' }), halka(c, svg, O));
    await par(c.say('Kanat çeyrek tur döndü: <b>dönme açısı</b> 90°.', { speak: 'Kanat çeyrek tur döndü: dönme açısı doksan derece.' }), (async () => {
      await belir(c, ac.g, 250);
      await c.tween(900, (e) => ac.yayAc(90 * e));
    })());
    await par(c.say('Dönmenin bir de yönü vardır: bu dönme saat yönünde.'), belir(c, iz.map((i) => i.uc), 450));
    await par(c.say('Kanadın yeni yeri onun görüntüsüdür: A′B′C′.', { speak: 'Kanadın yeni yeri onun görüntüsüdür: A üssü, B üssü, C üssü.' }), belir(c, g.adlar, 400));
    await par(c.say('Merkez, açı ve yön: bir dönmeyi bu üçü belirler.'), (async () => {
      await halka(c, svg, O, RENK.merkez, 9, 30, 700);
      await vurgula(c, ac.yay, 4);
      await vurgula(c, iz[0].yol, 2.5);
    })());

    // Sor: toplam dönme açısı.
    await c.choice({
      tag: 'Sıra sende', q: 'Kanat aynı merkez çevresinde, saat yönünde bir çeyrek tur daha dönerse toplam dönme açısı kaç derece olur?',
      options: ['90°', '180°', '360°'], answer: 1,
      hints: ['90° yalnızca ilk çeyrek turdu; bir çeyrek daha eklenir.', '', '360° tam turdur; iki çeyrek tur yarım tur eder.'],
      right: 'Evet. İki çeyrek tur: 180°.',
    });
    gizle(g.adlar);
    await par(c.say('İki çeyrek tur yarım tur eder: 180°.', { speak: 'İki çeyrek tur yarım tur eder: yüz seksen derece.' }), (async () => {
      await donuyor(c, [g, ...iz, ac], 90, 180, 1700);
      ['A″', 'B″', 'C″'].forEach((t, i) => { g.adlar[i].textContent = t; });
      await belir(c, g.adlar, 350);
    })());
  }

  /* ---- 3. Merkeze uzaklık ---- */
  async function merkezeUzaklik(c) {
    const k = kanatKur(c, { d: 90 }), { svg, O, P, u, g, m } = k, Q = g.pts();
    // C köşesi OB′ doğrusu üzerinde; varsayılan yer (aşağı) turuncu görüntünün kenarına değiyor: harf sağ üste alınır.
    u.adlar[2].setAttribute('x', P[2][0] + 19); u.adlar[2].setAttribute('y', P[2][1] - 14);
    const iz = P.map((V) => yayIz(c, svg, O, V));
    iz[0].don(0); iz[1].don(90); iz[2].don(90);
    iz[0].uc.setAttribute('d', ''); iz[0].don(0);
    gizle(iz[1].g, iz[2].g);
    const cember = c.S('circle', { cx: O[0], cy: O[1], r: uz(O, P[0]), fill: 'none', stroke: RENK.cizgi, 'stroke-width': 1.5, 'stroke-opacity': 0.5 }, svg);
    gizle(cember);
    const parca = (sol, sag) => [[sol, RENK.sekil], BOSLUK, [sag, RENK.goruntu]];

    await par(c.say('A köşesinin dönerken çizdiği yola bakalım.'), c.tween(1400, (e) => iz[0].don(90 * e), Ders.ease.inOut));
    await par(c.say('A, merkezi O olan bir çember yayı üzerinde ilerliyor.'), halka(c, svg, O));
    await par(c.say('Çember üzerindeki her nokta merkeze aynı uzaklıktadır.'), belir(c, cember, 500));

    // A: 5 birim.
    let r1 = [yaricap(c, svg, O, P[0], '5', RENK.merkez, { taraf: -1 }), yaricap(c, svg, O, Q[0], '5', RENK.merkez, { taraf: 1, t: 0.7 })];
    gizle(r1.map((r) => r.g));
    const s0 = satir(c, svg, 0, parca('|OA| 5', '|OA′| 5')), s1 = satir(c, svg, 1, parca('|OB| 4', '|OB′| 4'));
    const s2 = satir(c, svg, 2, parca('|OC| 3', '|OC′| ?')), soru = s2.lastChild;
    gizle(s0, s1, s2);
    await par(c.say('A merkeze 5 birim uzakta; A′ de 5 birim uzakta.', { speak: 'A merkeze beş birim uzakta; A üssü de beş birim uzakta.' }), belir(c, [...r1.map((r) => r.g), s0], 450));

    // B: 4 birim.
    await kaldir(c, r1.map((r) => r.g)); r1 = [yaricap(c, svg, O, P[1], '4', RENK.merkez, { taraf: -1 }), yaricap(c, svg, O, Q[1], '4', RENK.merkez, { taraf: 1, t: 0.4 })];
    gizle(r1.map((r) => r.g));
    await par(c.say('B köşesi merkeze 4 birim uzakta; B′ de öyle.', { speak: 'B köşesi merkeze dört birim uzakta; B üssü de öyle.' }), belir(c, [...r1.map((r) => r.g), s1], 450));

    // Birlikte çöz: C′ merkeze kaç birim?
    c.clearSay(); await kaldir(c, r1.map((r) => r.g));
    const r2 = [yaricap(c, svg, O, P[2], '3', RENK.merkez, { taraf: -1 }), yaricap(c, svg, O, Q[2], '?', RENK.merkez, { taraf: 1 })];
    gizle(r2.map((r) => r.g));
    await belir(c, [...r2.map((r) => r.g), s2], 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'C köşesi merkeze 3 birim uzakta. C′ merkeze kaç birim uzaktadır?',
      options: ['5 birim', '3 birim', '4 birim'], answer: 1,
      hints: ['5 birim A köşesinin uzaklığıydı.', '', '4 birim B köşesinin uzaklığıydı; C kendi çemberinde döner.'],
      right: 'Evet. C′ de 3 birim uzakta.',
    });
    cevapla(r2[1].etiket, '3'); cevapla(soru, '|OC′| 3');
    await c.say('C′ de merkeze 3 birim uzakta.', { speak: 'C üssü de merkeze üç birim uzakta.' });
    await c.say('Dönmede her nokta merkeze uzaklığını korur.');

    // Açılar.
    c.clearSay(); await kaldir(c, r2.map((r) => r.g), s0, s1, s2, cember);
    const ac = [merkezAci(c, svg, O, P[0], 90), merkezAci(c, svg, O, P[1], 90), merkezAci(c, svg, O, P[2], 90)];
    gizle(ac.map((a) => a.g));
    const aciSatir = (i, ad, deger) => satir(c, svg, i, [[ad, RENK.yazi], BOSLUK, [deger, RENK.merkez]]);
    const t0 = aciSatir(0, 'AOA′', '90°'), t1 = aciSatir(1, 'BOB′', '90°'), t2 = aciSatir(2, 'COC′', '?');
    gizle(t0, t1, t2);
    await par(c.say('Şimdi açılara bakalım: OA ile OA′ arasındaki açı 90°.', { speak: '[curious] Şimdi açılara bakalım: O A ile O A üssü arasındaki açı doksan derece.' }), belir(c, [ac[0].g, t0], 450));
    await kaldir(c, ac[0].g);
    await par(c.say('OB ile OB′ arasındaki açı da 90°.', { speak: 'O B ile O B üssü arasındaki açı da doksan derece.' }), belir(c, [ac[1].g, t1], 450));

    // Sor: yakın köşenin açısı.
    c.clearSay(); await kaldir(c, ac[1].g);
    ac[2].yayAc(0); await belir(c, [ac[2].g, t2], 450);
    await c.choice({
      tag: 'Sıra sende', q: 'C, merkeze en yakın köşe. OC ile OC′ arasındaki açı için hangisi doğrudur?',
      options: ['90°den küçüktür; yakın köşe az döner', '90°dir; bütün köşeler aynı açıyla döner', '90°den büyüktür; yakın köşe çok döner'], answer: 1,
      hints: ['Yakın köşenin yayı kısadır, açısı değil.', '', 'Kanat tek parça döndü: çeyrek tur.'],
      right: 'Evet. Bütün köşeler aynı açıyla döner.',
    });
    await par(c.say('C’nin yayı en kısa, ama açısı yine 90°.', { speak: 'C’nin yayı en kısa, ama açısı yine doksan derece.' }), (async () => {
      await c.tween(900, (e) => ac[2].yayAc(90 * e));
      await belir(c, [iz[1].g, iz[2].g], 450);
    })());
    cevapla(t2.lastChild, '90°');
    await par(c.say('Yakın ya da uzak, bütün noktalar aynı açı kadar döner.'), vurgula(c, iz[2].yol, 2.5));
    await par(c.say('Uzak nokta daha uzun bir yay çizer, ama açısı aynıdır.'), vurgula(c, iz[0].yol, 2.5));
    c.note('<b>Dönme:</b> merkez, açı, yön. |OA| = |OA′|; her nokta aynı açıyla döner.', 'Dönme', 'eb-donme');
  }

  /* ---- 4. Ne değişti, ne değişmedi? ---- */
  async function neDegisti(c) {
    const k = kanatKur(c, { d: 90 }), { svg, O, P, u, g, m } = k, Q = g.pts();
    const row = (i, parcalar) => renkli(c, svg, TX, 130 + i * 50, parcalar, { hiza: 'start', size: 25 });
    const kenarSayilari = (Pt, sayilar, renk) => {
      const gr = c.S('g', {}, svg), mrk = agirlik(Pt);
      Pt.forEach((a, i) => {
        const mid = ara(a, Pt[(i + 1) % 3], 0.5), d = uz(mrk, mid) || 1;
        yazi(c, gr, mid[0] + ((mid[0] - mrk[0]) / d) * 20, mid[1] + ((mid[1] - mrk[1]) / d) * 20 + 8, sayilar[i], { size: 22, kalin: 700, renk });
      });
      return gr;
    };
    const sayilar1 = kenarSayilari(P, ['3', '5', '4'], RENK.sekil), sayilar2 = kenarSayilari(Q, ['3', '5', '4'], RENK.goruntu);
    const r0 = row(0, ['kenarlar: aynı']), r1 = row(1, ['açılar: aynı']);
    const r2 = row(2, ['çevre: ', ['12', RENK.sekil], ' = ', ['12', RENK.goruntu]]), r3 = row(3, ['alan: ', ['6', RENK.sekil], ' = ', ['6', RENK.goruntu]]);
    const r4 = row(5.4, [['değişen:', RENK.soluk]]), r5 = row(6.4, ['yer, baktığı yön']);
    gizle(sayilar1, sayilar2, r0, r1, r2, r3, r4, r5);
    // Açı işaretleri: dik açı A ve A′'de, öteki açılar iki yayla.
    const isr = c.S('g', {}, svg);
    [[P, RENK.sekil], [Q, RENK.goruntu]].forEach(([Pt, renk]) => {
      aciYayi(c, isr, Pt[0], Pt[1], Pt[2], renk, 28, { dik: true });
      aciYayi(c, isr, Pt[1], Pt[2], Pt[0], renk, 34); aciYayi(c, isr, Pt[2], Pt[0], Pt[1], renk, 26);
    });
    gizle(isr);

    await c.say('Kanat ile görüntüsünü karşılaştıralım.');
    await par(c.say('Kenarlar 3, 4 ve 5 birim; görüntüde de aynı.', { speak: 'Kenarlar üç, dört ve beş birim; görüntüde de aynı.' }), belir(c, [sayilar1, sayilar2, r0], 450));
    await par(c.say('Dik açı yine dik; öteki açılar da aynı.'), (async () => { await belir(c, [sayilar1, sayilar2], 300, 0); await belir(c, [isr, r1], 450); })());
    await par(c.say('Kenarlar aynı olduğuna göre çevre ve alan da aynı.'), belir(c, [r2, r3], 450));
    await par(c.say('Değişen, kanadın yeri ve baktığı yön.'), belir(c, [r4, r5], 450));
    const o1 = dolasma(c, svg, P, RENK.sekil), o2 = dolasma(c, svg, Q, RENK.goruntu);
    gizle(o1, o2);
    await par(c.say('Kanat ters çevrilmedi: köşeleri dolaşma yönü aynı kaldı.', { speak: '[thoughtful] Kanat ters çevrilmedi: köşeleri dolaşma yönü aynı kaldı.' }), belir(c, [o1, o2], 450));

    // Dene: dönme açısını değiştir; ölçüler sabit kalır.
    await belir(c, [o1, o2, isr, r0, r1, r2, r3, r4, r5], 350, 0);
    [o1, o2, isr, r0, r1, r2, r3, r4, r5].forEach((e) => e.remove());
    const ac = merkezAci(c, svg, O, P[0], 90);
    const d0 = row(0, [['kenarlar: ', RENK.soluk], ['3, 4, 5', RENK.goruntu]]), d1 = row(1, [['|OA′| = 5', RENK.goruntu]]);
    const d2 = row(2, [['|OB′| = 4', RENK.goruntu]]), d3 = row(3, [['|OC′| = 3', RENK.goruntu]]);
    gizle(ac.g, d0, d1, d2, d3);
    await belir(c, [ac.g, d0, d1, d2, d3], 400);
    const ciz = (d) => {
      g.don(d); ac.don(d);
      const R = g.pts();
      g.adlar.forEach((t) => { t.style.opacity = Math.abs(d % 360) < 1 ? 0 : 1; });
      d0.lastChild.textContent = [uz(R[0], R[1]), uz(R[0], R[2]), uz(R[1], R[2])].map(f).join(', ');
      d1.lastChild.textContent = '|OA′| = ' + f(uz(O, R[0]));
      d2.lastChild.textContent = '|OB′| = ' + f(uz(O, R[1]));
      d3.lastChild.textContent = '|OC′| = ' + f(uz(O, R[2]));
    };
    await c.say('Açıyı değiştir; kenarlara ve merkeze uzaklıklara bak.', { noWait: true });
    const sl = c.slider({ label: 'Dönme açısı (saat yönünde)', min: 0, max: 345, step: 15, value: 90, fmt: () => '', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await c.say('Açı ne olursa olsun kenarlar ve merkeze uzaklıklar değişmiyor.');
  }

  /* ---- 5. Üç dönüşüm ---- */
  async function ucDonusumSahnesi(c) {
    const k = kanatKur(c, { d: 90 }), { svg, z, O, P, u, g, m } = k;
    const onerme = yazi(c, svg, 500, 36, 'Dönme altındaki görüntü, şekle eştir.', { size: 23, kalin: 700 });
    gizle(onerme);

    // Örnekle göster: görüntüyü geri döndür, kanadın üstüne otursun.
    gizle(g.adlar);
    await par(c.say('Görüntüyü geri döndürelim: kanadın tam üstüne oturuyor.'), donuyor(c, [g], 90, 0, 1600));
    await par(c.say('Üst üste tam oturdular: kanat ile görüntüsü eş.'), c.tween(800, (e) => { const w = 3 + 4 * Math.sin(Math.PI * e); u.yuz.setAttribute('stroke-width', w); g.yuz.setAttribute('stroke-width', w); }));
    await par(c.say('Bir şeklin dönme altındaki görüntüsü şekle eştir.'), belir(c, onerme, 450));

    // Sor: yeni durum, bir köşe çevresinde 40°.
    c.clearSay(); await kaldir(c, u.g, g.g, m.g);
    const O2 = z.P(6, 8), K = z.N([[6, 8], [6, 5], [9, 5], [9, 8]]), K2 = K.map((q) => dondur(q, O2, 40));
    const kg = c.S('g', {}, svg);
    cokgen(c, kg, K, RENK.sekil); cokgen(c, kg, K2, RENK.goruntu);
    merkezNokta(c, kg, O2, null);
    merkezAci(c, kg, O2, K[1], 40, { etiketR: 86 });
    gizle(kg); await belir(c, kg, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir kare, köşelerinden biri çevresinde 40° döndürüldü. Görüntü için hangisi doğrudur?',
      options: ['Açıları 40° büyür', 'Kenarları kısalır', 'Yine karedir; kenarları aynı uzunluktadır'], answer: 2,
      hints: ['40° şeklin açısına eklenmez; şeklin ne kadar çevrildiğini söyler.', 'Görüntü şekle eştir: uzunluklar değişmez.', ''],
      right: 'Evet. Görüntü şekle eş; yine kare.',
    });
    const dik = c.S('g', {}, kg);
    [K, K2].forEach((Pt) => Pt.forEach((V, i) => aciYayi(c, dik, V, Pt[(i + 3) % 4], Pt[(i + 1) % 4], Pt === K ? RENK.sekil : RENK.goruntu, 26, { dik: true })));
    gizle(dik);
    await par(c.say('Görüntü yine kare; 40° şeklin açısına eklenmez.', { speak: 'Görüntü yine kare; kırk derece şeklin açısına eklenmez.' }), belir(c, dik, 450));

    // Üç dönüşüm yan yana.
    c.clearSay(); await kaldir(c, kg); z.g.remove();
    const uc = ucDonusum(c, svg), pn = uc.paneller;
    gizle(pn.map((p) => p.g), pn.map((p) => p.baslik), pn.map((p) => p.iz));
    const es = pn.map((p, i) => yazi(c, p.g, 20 + i * 320 + 150, 492, 'görüntü eş', { size: 22, renk: RENK.soluk }));
    gizle(es);
    await par(c.say('Şimdi üç dönüşümü yan yana koyalım.'), belir(c, pn.map((p) => p.g), 450));
    await par(c.say('Öteleme kaydırır, yansıma ters çevirir, dönme döndürür.'), (async () => {
      for (const p of pn) {
        belir(c, [p.baslik, p.iz], 350);
        await c.tween(1000, (e) => p.ilerle(e), Ders.ease.inOut);
      }
    })());
    await par(c.say('Üçünde de görüntü şekle eştir.'), belir(c, es, 450));

    // Sor: hangi dönüşüm?
    c.clearSay(); await kaldir(c, pn.map((p) => p.g));
    const z2 = zemin(c, svg), O3 = z2.P(7, 5), F = z2.N(bayrak(3, 3)), F2 = F.map((q) => dondur(q, O3, 90));
    const fg = c.S('g', {}, svg);
    cokgen(c, fg, F, RENK.sekil); cokgen(c, fg, F2, RENK.goruntu);
    gizle(fg); await belir(c, fg, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Bu çiftte hangi dönüşüm var?', options: ['Yansıma', 'Dönme', 'Öteleme'], answer: 1,
      hints: ['Köşeleri dolaş: yön aynı; şekil ters çevrilmemiş.', '', 'Öteleme yalnızca kaydırır; burada bayrak başka yöne bakıyor.'],
      right: 'Evet. Ters çevrilmeden başka yöne bakıyor: dönme.',
    });
    const o1 = dolasma(c, fg, F, RENK.sekil), o2 = dolasma(c, fg, F2, RENK.goruntu);
    const merkez = c.S('g', {}, fg);
    merkezNokta(c, merkez, O3, null);
    const yay = yayIz(c, merkez, O3, F[2], { renk: RENK.merkez, w: 3, derece: 90 });
    gizle(o1, o2, merkez);
    await par(c.say('Köşeleri dolaşma yönü aynı: ters çevrilmedi, başka yöne baktı.'), belir(c, [o1, o2, merkez], 500));
    c.clearSay();
    onerme.textContent = 'Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.';
    await c.say('Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.');
    c.note('<b>Dönme:</b> görüntü şekle eştir; şekil ters çevrilmez.', 'Dönme ve eşlik', 'eb-donme-eslik');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-a2', kicker: 'Konu A · Geometrik dönüşümler', title: 'Dönme: merkez ve açı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dönme: merkez ve açı',
      hook: 'Bir rüzgârgülü dönerken kanatları yer değiştirir. Kanadın <b>biçimi</b> bozulur mu?',
      button: 'Derse başla ›',
    },
    goals: ['Bir dönmeyi merkezi, açısı ve yönüyle belirler.', 'Dönmede her noktanın merkeze uzaklığını koruduğunu ve aynı açıyla döndüğünü açıklar.', 'Dönme altındaki görüntünün şekle eş olduğunu söyler ve dönmeyi öteleme ile yansımadan ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Yansıma ve ötelemede neyin değiştiğini hatırla.', run: hatirla },
      { title: 'Dönen kanat', goal: 'Merkez, açı ve yön bir dönmeyi belirler.', run: donenKanat },
      { title: 'Merkeze uzaklık', goal: 'Her nokta merkeze uzaklığını korur ve aynı açıyla döner.', run: merkezeUzaklik },
      { title: 'Ne değişti, ne değişmedi?', goal: 'Ölçüler aynı kalır; yer ve baktığı yön değişir.', run: neDegisti },
      { title: 'Üç dönüşüm', goal: 'Görüntü şekle eştir; dönmeyi öteleme ve yansımadan ayır.', run: ucDonusumSahnesi },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir şekil O noktası çevresinde 70° döndürülüyor. P noktası O’ya 6 cm uzaktaysa görüntüsü P′, O’ya kaç cm uzaktadır?',
        options: ['12 cm', '3 cm', '6 cm'], answer: 2,
        why: ['Dönme uzaklığı iki katına çıkarmaz; nokta merkeze aynı uzaklıkta kalır.', 'Uzaklık yarıya inmez; P′ de P ile aynı çemberin üzerindedir.', 'Dönmede her nokta merkeze uzaklığını korur: P′ de 6 cm uzaktadır.'],
        scene: 2,
      },
      {
        q: 'Bir üçgen 60° döndürüldü. Merkeze yakın K köşesi ile uzak L köşesi için hangisi doğrudur?',
        options: ['İkisi de 60° döner', 'L daha büyük açıyla döner', 'K daha büyük açıyla döner'], answer: 0,
        why: ['Üçgen tek parça döner; her köşe aynı açı kadar döner.', 'Uzak köşenin yayı daha uzundur ama açısı aynıdır.', 'Yakın köşenin yayı daha kısadır; açısı yine aynıdır.'],
        scene: 2,
      },
      {
        q: 'İç açıları 50°, 60° ve 70° olan bir üçgen 90° döndürüldü. Görüntünün iç açıları nedir?',
        options: ['140°, 150°, 160°', '50°, 60°, 70°', 'Üçü de 90°'], answer: 1,
        why: ['Dönme açısı şeklin iç açılarına eklenmez; iç açılar aynı kalır.', 'Görüntü şekle eştir: iç açıları da aynıdır.', '90° şeklin ne kadar çevrildiğini söyler; iç açılar değişmez.'],
        scene: 3,
      },
      {
        q: 'Bir saatin yelkovanı 12’den 3’e geldi. Bu dönmenin merkezi ve açısı nedir?',
        options: ['Yelkovanın ucu; 90°', 'Yelkovanın bağlı olduğu nokta; 30°', 'Yelkovanın bağlı olduğu nokta; 90°'], answer: 2,
        why: ['Yelkovanın ucu yer değiştirir; dönme merkezi yerinde kalan noktadır.', 'Merkez doğru ama 12’den 3’e çeyrek tur dönülür: 90°.', 'Merkez yerinde kalan bağlantı noktasıdır; çeyrek tur 90°dir.'],
        scene: 1,
      },
      {
        q: 'Bir harf motifi ile görüntüsü karşılaştırılıyor: görüntü ters çevrilmemiş ama başka yöne bakıyor. Hangi dönüşüm uygulanmıştır?',
        options: ['Yansıma', 'Dönme', 'Öteleme'], answer: 1,
        why: ['Yansımada şekil ters çevrilir; burada ters çevrilme yok.', 'Ters çevrilme yok ama motif başka yöne bakıyor: bu dönmedir.', 'Öteleme yalnızca kaydırır; motif aynı yöne bakardı.'],
        scene: 4,
      },
    ],
    summary: [
      'Bir dönmeyi <b>merkez</b>, <b>açı</b> ve yön belirler.',
      'Her nokta merkeze uzaklığını korur ve aynı açıyla döner.',
      '<b>Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.</b>',
      'Görüntü şekle eştir; şekil ters çevrilmez.',
    ],
    nextLesson: { href: 'a3-oteleme-iki-yansima.html', label: 'Sonraki: Öteleme, iki yansımadır ›' },
  });
})();
