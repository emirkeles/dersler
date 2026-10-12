/* B2 — Eşlik için en az ne gerekir?
   Üç kenar, iki kenar ve aradaki açı ya da iki açı ve bir kenar eşlik için yeter; üç açı yetmez.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/B-eslik-ve-benzerlik-kosullari.md (B2)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, araHepsi, uz, yon, ileri, rad, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciYayi, aciIci, agirlik, ok } = window.KIT;
  const B = window.KIT_B;
  const EL = B.ESLEME;                              // mavi, turuncu, yeşil: 1., 2., 3. karşılıklı çift

  const TX = 706;                                   // sağdaki tablonun sol kenarı
  const BOSLUK = '   ';              // tablo sütunları arasındaki boşluk (daralmaz)
  const satir = (c, p, i, parcalar, y0 = 150) => renkli(c, p, TX, y0 + i * 52, parcalar, { hiza: 'start', size: 25 });
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); (Array.isArray(el) ? el : [el]).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => c.tween(ms, (e) => hatlar.forEach((h) => h.setAttribute('stroke-width', 6 + 5 * Math.sin(Math.PI * e))));
  const nk = (P) => P.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
  const poly = (c, p, P, renk, fo) => c.S('polygon', { points: nk(P), fill: renk, 'fill-opacity': fo, stroke: 'none' }, p);
  const virgul = (v) => String(v).replace('.', ',');

  /* Açı işareti: yay (ya da dik açı işareti) ve isteğe bağlı değer yazısı (bisektör üzerinde, V'den d uzaklıkta). */
  function acisi(c, p, V, P, Q, metin, renk, o = {}) {
    const g = c.S('g', {}, p), r = o.r || 28;
    const yay = aciYayi(c, g, V, P, Q, renk, r, { dik: o.dik });
    let et = null;
    if (metin) { const m = aciIci(V, P, Q, o.d || r + 24); et = yazi(c, g, m[0], m[1] + 8, metin, { size: o.size || 22, kalin: 700, renk }); }
    return { g, yay, et };
  }
  /* Dinamik açı yayları (üçgen büyürken yayların boyutu sabit kalır). Üçgen [A, E, C]; E (sıra 1) dik açılı köşe. */
  function yayD(V, P, Q, r) {
    const a = yon(V, P), b = yon(V, Q); let d = b - a;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    const S = ileri(V, a, r), E = ileri(V, b, r);
    return `M${S[0].toFixed(1)},${S[1].toFixed(1)} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${E[0].toFixed(1)},${E[1].toFixed(1)}`;
  }
  function dikD(V, P, Q, r) {
    const k1 = ileri(V, yon(V, P), r * 0.6), k2 = ileri(V, yon(V, Q), r * 0.6), k3 = [k1[0] + k2[0] - V[0], k1[1] + k2[1] - V[1]];
    return `M${k1[0].toFixed(1)},${k1[1].toFixed(1)} L${k3[0].toFixed(1)},${k3[1].toFixed(1)} L${k2[0].toFixed(1)},${k2[1].toFixed(1)}`;
  }
  function aciGrubu(c, p, alPts, renk, r = 28) {
    const g = c.S('g', {}, p);
    const yol = [0, 1, 2].map(() => c.S('path', { fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g));
    const guncelle = () => { const T = alPts(); yol.forEach((y, i) => { y.setAttribute('d', (i === 1 ? dikD : yayD)(T[i], T[(i + 1) % 3], T[(i + 2) % 3], r)); }); };
    guncelle();
    return { g, guncelle };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: ABC ≅ DEF yazısında karşılıklı kenar.
    const g1 = c.S('g', {}, svg);
    const P = [[190, 230], [190, 390], [310, 390]], Q = [[600, 260], [760, 260], [760, 380]], duz = [RENK.yazi, RENK.yazi, RENK.yazi];
    B.notrUcgen(c, g1, P, ['A', 'B', 'C'], { renkler: duz }); B.notrUcgen(c, g1, Q, ['D', 'E', 'F'], { renkler: duz });
    aciYayi(c, g1, P[1], P[0], P[2], RENK.cizgi, 24, { dik: true }); aciYayi(c, g1, Q[1], Q[0], Q[2], RENK.cizgi, 24, { dik: true });
    yazi(c, g1, 500, 130, 'ABC ≅ DEF', { size: 52, kalin: 700 });
    const bc = cizgi(c, g1, P[1], P[2], RENK.iyi, 7), ef = cizgi(c, g1, Q[1], Q[2], RENK.iyi, 7);
    gizle(g1, bc, ef); await belir(c, g1, 450);
    const h1 = 'Harfler aynı sırada eşlenir: B ile E, C ile F; BC ile EF.';
    await c.choice({
      tag: 'Hatırla', q: 'ABC ≅ DEF yazısında BC kenarının karşılığı hangisidir?',
      options: ['DE', 'EF', 'DF'], answer: 1, hints: [h1, '', h1],
      right: 'Evet. B ile E, C ile F eşlenir.',
    });
    await par(c.say('BC ile EF karşılıklı kenarlardır.', { speak: 'B C ile E F karşılıklı kenarlardır.' }), belir(c, [bc, ef], 450));
    c.clearSay();
    await sil(c, g1, 350);

    // İkinci soru: öteleme çevreyi değiştirmez.
    const g2 = c.S('g', {}, svg);
    const Y = [[180, 220], [180, 340], [270, 340]], Y2 = Y.map((q) => [q[0] + 440, q[1]]);
    cokgen(c, g2, Y, RENK.sekil); cokgen(c, g2, Y2, RENK.goruntu);
    ok(c, g2, [330, 190], [560, 190]);
    yazi(c, g2, 225, 405, 'çevre 12', { size: 30, kalin: 700, renk: RENK.sekil });
    const soru = yazi(c, g2, 665, 405, 'çevre ?', { size: 30, kalin: 700, renk: RENK.goruntu });
    gizle(g2); await belir(c, g2, 450);
    const h2 = 'Öteleme çevreyi değiştirmez; görüntü şekle eştir.';
    await c.choice({
      tag: 'Hatırla', q: 'Çevresi 12 birim olan bir üçgen ötelendi. Görüntünün çevresi kaç birimdir?',
      options: ['24 birim', '6 birim', '12 birim'], answer: 2, hints: [h2, h2, ''],
      right: 'Evet. Öteleme çevreyi değiştirmez.',
    });
    cevapla(soru, 'çevre 12');
    await c.say('Görüntünün çevresi de 12 birimdir.', { speak: 'Görüntünün çevresi de on iki birimdir.' });
  }

  /* ---- 2. Üç kenar ---- */
  async function ucKenar(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { x0: 90, sutun: 15 });
    gizle(z.g);
    const W = c.S('g', {}, svg);
    const P = z.N([[1, 3], [1, 7], [4, 7]]), Q = z.N([[8, 4], [12, 4], [12, 7]]), MP = agirlik(P);

    // Altı eşitlik: iki üçgen, üç kenar çifti ve üç açı çifti.
    const P0 = [[190, 150], [190, 390], [370, 390]], Q0 = P0.map((q) => [q[0] + 450, q[1]]);
    const e0 = B.esleme(c, W, P0, Q0, { dik: 1 });
    gizle(e0.g, e0.yaylar, e0.kenarlar);
    await par(c.say('Eşlik tanımı altı eşitlik ister: üç kenar ve üç açı.'), (async () => {
      await belir(c, e0.g, 400); await belir(c, [...e0.yaylar, ...e0.kenarlar], 600);
    })());
    await c.say('Hepsini denetlemek gerekir mi? Deneyelim.', { speak: '[curious] Hepsini denetlemek gerekir mi? Deneyelim.' });
    c.clearSay();
    await belir(c, e0.g, 350, 0); e0.g.remove();
    await belir(c, z.g, 400);

    // Üç çubuk: 6, 8 ve 10 cm.
    const kr = 1.4, sp = [[0.5, 3.5, 6], [4.5, 8.5, 8], [9.5, 14.5, 10]];
    const st = sp.map(([a, b, cm]) => {
      const g = c.S('g', {}, W), pa = z.P(a, kr), pb = z.P(b, kr);
      const L = cizgi(c, g, pa, pb, RENK.cizgi, 10), t = yazi(c, g, (pa[0] + pb[0]) / 2, pa[1] - 22, cm + ' cm', { size: 26, kalin: 700 });
      return { g, L, t, a: pa, b: pb };
    });
    gizle(st.map((s) => s.g));
    await par(c.say('İki usta üçgen çerçeve yapacak; çubuklar 6, 8 ve 10 cm.', { speak: 'İki usta üçgen çerçeve yapacak; çubuklar altı, sekiz ve on santimetre.' }), belir(c, st.map((s) => s.g), 450));

    // Birinci usta: ABC çerçevesi.
    const hedef = [[P[1], P[2]], [P[0], P[1]], [P[0], P[2]]];
    const abc = cokgen(c, W, P, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const eP = [B.kenarEtiketi(c, W, P[1], P[2], '6 cm', RENK.sekil, { merkez: MP }), B.kenarEtiketi(c, W, P[0], P[1], '8 cm', RENK.sekil, { merkez: MP }), B.kenarEtiketi(c, W, P[0], P[2], '10 cm', RENK.sekil, { merkez: MP })];
    gizle(abc.g, eP);
    await par(c.say('Birinci usta çubukları uç uca bağladı: ABC çerçevesi.', { speak: 'Birinci usta çubukları uç uca bağladı: A B C çerçevesi.' }), (async () => {
      await belir(c, st.map((s) => s.t), 250, 0);
      await c.tween(1500, (x) => st.forEach((s, i) => koy(s.L, ara(s.a, hedef[i][0], x), ara(s.b, hedef[i][1], x))), Ders.ease.inOut);
      await belir(c, abc.g, 350);
      await par(belir(c, st.map((s) => s.g), 300, 0), belir(c, eP, 400));
    })());

    // İkinci usta: DEF çerçevesi.
    const def = cokgen(c, W, Q, RENK.goruntu, { harf: ['D', 'E', 'F'] });
    gizle(def.g);
    await par(c.say('İkinci usta aynı üç çubukla DEF çerçevesini kurdu.', { speak: 'İkinci usta aynı üç çubukla D E F çerçevesini kurdu.' }), belir(c, def.g, 600));

    // Çubuklar yalnızca bu biçimde kapanır: E'deki menteşe açılıp kapanır, 10 cm'lik çubuk ancak 90° iken F'ye ulaşır.
    const D = Q[0], E = Q[1], F0 = Q[2];
    const t1 = cizgi(c, W, E, D, RENK.goruntu, 9), t2 = cizgi(c, W, E, F0, RENK.goruntu, 9), t3 = cizgi(c, W, D, F0, RENK.goruntu, 9);
    const mF = c.S('circle', { cx: F0[0], cy: F0[1], r: 13, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, W);
    const mG = c.S('circle', { cx: F0[0], cy: F0[1], r: 7, fill: RENK.yazi }, W);
    const bosluk = cizgi(c, W, F0, F0, RENK.cizgi, 3, { 'stroke-dasharray': '5 5' });
    const sticks = [t1, t2, t3, mF, mG, bosluk];
    gizle(sticks);
    const dene = (th) => {
      const F = ileri(E, rad(180 - th), 120), G = ileri(D, yon(D, F), 200);
      koy(t2, E, F); koy(t3, D, G); koy(bosluk, G, F);
      mF.setAttribute('cx', F[0]); mF.setAttribute('cy', F[1]); mG.setAttribute('cx', G[0]); mG.setAttribute('cy', G[1]);
    };
    await par(c.say('Çubuklar yalnızca tek biçimde kapanıyor; başka üçgen çıkmıyor.'), (async () => {
      await par(belir(c, def.yuz, 250, 0), belir(c, sticks, 250));
      await c.tween(900, (x) => dene(90 - 35 * x), Ders.ease.inOut);
      await c.tween(1200, (x) => dene(55 + 70 * x), Ders.ease.inOut);
      await c.tween(900, (x) => dene(125 - 35 * x), Ders.ease.inOut);
      await par(belir(c, sticks, 250, 0), belir(c, def.yuz, 250, 1));
    })());

    // DEF ters çevrilip ABC'nin üstüne oturur.
    await par(c.say('DEF’i ters çevirip kaydırınca ABC’nin üstüne tam oturdu.', { speak: 'D E F’i ters çevirip kaydırınca A B C’nin üstüne tam oturdu.' }), (async () => {
      await belir(c, def.adlar, 250, 0);
      await c.tween(1800, (x) => def.koy(araHepsi(Q, P, x)), Ders.ease.inOut);
    })());
    await c.say('Üç kenar uzunluğu belliyse yalnızca bir üçgen çizilebilir.');

    // Açılar da aynı çıkar.
    const yA = [B.esitYay(c, W, P[0], P[1], P[2], 1, EL[0]), B.esitYay(c, W, P[1], P[0], P[2], 2, EL[1], { dik: true }), B.esitYay(c, W, P[2], P[0], P[1], 3, EL[2])];
    gizle(yA);
    const tab = [['A 37°', 'D 37°', EL[0]], ['B 90°', 'E 90°', EL[1]], ['C 53°', 'F 53°', EL[2]]].map((r, i) => satir(c, W, i, [[r[0], r[2]], BOSLUK, [r[1], r[2]]]));
    gizle(tab);
    await par(c.say('Üç kenarı eşit iki üçgenin açıları da eşit çıkar.'), (async () => {
      await belir(c, eP, 250, 0);
      await belir(c, [...yA, ...tab], 600);
    })());
    const ad = yazi(c, W, 400, 470, 'Kenar-Kenar-Kenar (K.K.K.)', { size: 34, kalin: 700 });
    gizle(ad);
    await par(c.say('Bu koşulun adı Kenar-Kenar-Kenar eşliğidir.'), belir(c, ad, 500));
    c.clearSay();

    // Birlikte çöz: köşelerin karşılığı.
    await belir(c, [W, z.g], 350, 0); W.remove(); z.g.remove();
    const W2 = c.S('g', {}, svg), duz = [RENK.yazi, RENK.yazi, RENK.yazi];
    const U1 = B.ucgenKur('KKK', [5, 7, 9], [120, 380], { olcek: 24, aci: 0 }), U2 = B.ucgenKur('KKK', [7, 9, 5], [560, 400], { olcek: 24, aci: -30 });
    const abc2 = B.notrUcgen(c, W2, U1, ['A', 'B', 'C'], { renkler: duz }), klm = B.notrUcgen(c, W2, U2, ['K', 'L', 'M'], { renkler: duz });
    const M1 = agirlik(U1), M2 = agirlik(U2);
    const eslen = [[U1, 0, 1, 1, '5', M1], [U1, 1, 2, 2, '7', M1], [U1, 2, 0, 3, '9', M1], [U2, 0, 1, 2, '7', M2], [U2, 1, 2, 3, '9', M2], [U2, 2, 0, 1, '5', M2]];
    const sayilar = eslen.map(([T, i, j, n, sayi, M]) => {
      B.esitCentik(c, W2, T[i], T[j], n, EL[n - 1]);
      return B.kenarEtiketi(c, W2, T[i], T[j], sayi, EL[n - 1], { merkez: M });
    });
    gizle(W2); await belir(c, W2, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ve KLM üçgenleri eş; AB ile KM, AC ile LM eşleniyor. A köşesi hangi köşeye karşılık gelir?',
      options: ['K', 'M', 'L'], answer: 1,
      hints: ['A, AB ile AC’nin ortak ucu; karşılıkları KM ile LM’nin ortak ucu.', '', 'KM ile LM, M’de buluşur.'],
      right: 'Evet. Ortak uçlar eşlenir: A ile M.',
    });
    abc2.adlar[0].style.fill = RENK.iyi; klm.adlar[2].style.fill = RENK.iyi;
    await c.say('Ortak uçlar karşılıklıdır: A ile M.');
    c.clearSay();

    // Sıra sende: eşlik yazısı.
    abc2.adlar[0].style.fill = RENK.yazi; klm.adlar[2].style.fill = RENK.yazi;
    await belir(c, sayilar, 300, 0);
    const yz = renkli(c, W2, 500, 110, [['ABC', RENK.yazi], ' ≅ ', ['???', RENK.yazi]], { size: 46, kalin: 700 });
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı iki üçgen için B köşesi K’ye, C köşesi L’ye karşılık geliyor. Eşlik nasıl yazılır?',
      options: ['ABC ≅ KLM', 'ABC ≅ MKL', 'ABC ≅ LMK'], answer: 1,
      hints: ['Yazıda A, B, C sırası; karşılıkları M, K, L sırasıyla yazılır.', '', 'İlk harfler eşlenir: A ile M.'],
      right: 'Evet. A–M, B–K, C–L eşlenir.',
    });
    parcaKoy(c, yz, [['ABC', RENK.yazi], ' ≅ ', ['MKL', RENK.iyi]]);
    await c.say('A–M, B–K, C–L: eşlik yazısı ABC ≅ MKL.', { speak: 'A M, B K, C L: eşlik yazısı A B C eştir M K L.' });
    await c.say('Eşlik için altı eşitlik gerekmez; üç kenar yeter.');
  }

  /* ---- 3. İki kenar ve aradaki açı ---- */
  async function ikiKenarAci(c) {
    const svg = c.svg(1000, 562);
    const V = [200, 420], u1 = 120, u2 = 160;
    const Wm = c.S('g', {}, svg);
    const m = B.mentese(c, Wm, V, u1, u2, { yon: 0, aci: 90 });
    m.k3.setAttribute('stroke-dasharray', '8 7');
    const tri = poly(c, Wm, [V, [V[0] + u1, V[1]], [V[0], V[1] - u2]], RENK.sekil, 0.16);
    const lab1 = yazi(c, Wm, V[0] + u1 / 2, V[1] + 38, '6 cm', { size: 26, kalin: 700 });
    const lab2 = yazi(c, Wm, 0, 0, '8 cm', { size: 26, kalin: 700 });
    const lab2Koy = () => {
      const [v, , p2] = m.uc(), q = ileri(ara(v, p2, 0.5), yon(v, p2) - Math.PI / 2, 42);
      lab2.setAttribute('x', q[0]); lab2.setAttribute('y', q[1] + 8);
    };
    lab2Koy();
    const kutu = c.S('g', {}, Wm);
    c.S('rect', { x: 560, y: 160, width: 380, height: 140, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, kutu);
    yazi(c, kutu, 750, 206, 'Ölçülen üçüncü kenar', { size: 26, kalin: 700 });
    const deger = yazi(c, kutu, 750, 272, '10,0 cm', { size: 52, kalin: 700, renk: RENK.goruntu });
    gizle(Wm, m.k3, m.yay, m.etiket, lab1, lab2, kutu, tri);

    await par(c.say('Şimdi iki çubuğu ve aralarındaki açıyı düşünelim.'), belir(c, Wm, 450));
    await par(c.say('6 cm ve 8 cm’lik çubuklar menteşeyle birleşti.', { speak: 'Altı santimetre ve sekiz santimetrelik çubuklar menteşeyle birleşti.' }), belir(c, [lab1, lab2], 450));
    await par(c.say('Menteşeyi 90°’ye kilitledik.', { speak: 'Menteşeyi doksan dereceye kilitledik.' }), belir(c, [m.yay, m.etiket], 450));
    await par(c.say('Açı kilitliyken üçüncü kenar tek uzunlukta kapanıyor: 10 cm.', { speak: 'Açı kilitliyken üçüncü kenar tek uzunlukta kapanıyor: on santimetre.' }), belir(c, [m.k3, kutu], 600));
    c.clearSay();

    // Dene: menteşenin açısı.
    const DEG = { 30: '4,1', 45: '5,7', 60: '7,2', 75: '8,7', 90: '10,0', 105: '11,2', 120: '12,2', 135: '13,0', 150: '13,5' };
    await c.say('Açıyı kaydır; üçüncü kenara bak.', { noWait: true });
    const sl = c.slider({
      label: 'Menteşenin açısı', min: 30, max: 150, step: 15, value: 90, fmt: (v) => v + '°',
      onInput: (v) => { const d = Math.round(+v); m.ac(d); lab2Koy(); deger.textContent = DEG[d] + ' cm'; },
    });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    const a0 = m.aci();
    await c.tween(700, (x) => { m.ac(a0 + (90 - a0) * x); lab2Koy(); }, Ders.ease.inOut);
    m.ac(90); lab2Koy(); deger.textContent = DEG[90] + ' cm';

    await c.say('Her açıda üçüncü kenar yalnızca bir uzunlukta kapanıyor.');
    await par(c.say('İki kenar ve aralarındaki açı belliyse tek bir üçgen çizilir.'), belir(c, tri, 500));

    // Bu üçgene eş her üçgenin kalan elemanları da eşit çıkar.
    await belir(c, Wm, 350, 0); Wm.remove();
    const We = c.S('g', {}, svg);
    const Pm = [V, [V[0] + u1, V[1]], [V[0], V[1] - u2]], Qm = B.ucgenKur('KAK', [3, 90, 4], [640, 280], { olcek: 40, aci: 90, taraf: 1 });
    const e = B.esleme(c, We, Pm, Qm, { dik: 0 });
    gizle(We, e.yaylar, e.kenarlar);
    await par(c.say('Bu üçgene eş her üçgenin kalan kenarı ve açıları da eşit çıkar.'), (async () => {
      await belir(c, We, 400); await belir(c, [...e.yaylar, ...e.kenarlar], 700);
    })());
    const ad = yazi(c, We, 500, 130, 'Kenar-Açı-Kenar (K.A.K.)', { size: 36, kalin: 700 });
    gizle(ad);
    await par(c.say('Bu koşulun adı Kenar-Açı-Kenar eşliğidir.'), belir(c, ad, 500));
    c.clearSay();

    // Birlikte çöz: hangi koşul?
    await belir(c, We, 350, 0); We.remove();
    const W3 = c.S('g', {}, svg), duz = [RENK.yazi, RENK.yazi, RENK.yazi];
    const T1 = B.ucgenKur('KAK', [5, 60, 8], [90, 380], { olcek: 20, aci: 0, taraf: 1 }), T2 = B.ucgenKur('KAK', [5, 60, 8], [420, 260], { olcek: 20, aci: 0, taraf: -1 });
    B.notrUcgen(c, W3, T1, ['A', 'B', 'C'], { renkler: duz }); B.notrUcgen(c, W3, T2, ['K', 'L', 'M'], { renkler: duz });
    const M1 = agirlik(T1), M2 = agirlik(T2);
    [[T1, 0, 1, 1, '5', M1], [T1, 0, 2, 2, '8', M1], [T2, 0, 1, 1, null, M2], [T2, 0, 2, 2, null, M2]].forEach(([T, i, j, n, sayi, M]) => {
      B.esitCentik(c, W3, T[i], T[j], n, EL[n - 1]);
      if (sayi) B.kenarEtiketi(c, W3, T[i], T[j], sayi, EL[n - 1], { merkez: M });
    });
    acisi(c, W3, T1[0], T1[1], T1[2], '60°', RENK.merkez, { r: 30, d: 58 }); acisi(c, W3, T2[0], T2[1], T2[2], null, RENK.merkez, { r: 30 });
    const tr = [[['AB = KL ✓', EL[0]]], [['AC = KM ✓', EL[1]]], [['m(A) = m(K) ✓', RENK.merkez]]].map((r, i) => satir(c, W3, i, r));
    gizle(W3); await belir(c, W3, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ve KLM’de |AB| = |KL| = 5 cm, |AC| = |KM| = 8 cm ve m(A) = m(K) = 60°. Hangi eşlik koşulu uygulanır?',
      options: ['Kenar-Kenar-Kenar', 'Kenar-Açı-Kenar', 'Açı-Kenar-Açı'], answer: 1,
      hints: ['Üçüncü kenarlar verilmemiş; üç kenar eşit değil.', '', 'İki kenar ve aralarındaki açı eşit.'],
      right: 'Evet. İki kenar ve aradaki açı eşit.',
    });
    await c.say('İki kenar ve aradaki açı eşit: Kenar-Açı-Kenar.');
    c.clearSay();

    // Sıra sende: kalan kenar.
    await belir(c, W3, 350, 0); W3.remove();
    const W4 = c.S('g', {}, svg);
    const R1 = B.ucgenKur('KAK', [3, 60, 8], [150, 390], { olcek: 24, aci: 0, taraf: 1 }), R2 = B.ucgenKur('KAK', [3, 60, 8], [650, 390], { olcek: 24, aci: 180, taraf: -1 });
    const S1 = [R1[1], R1[0], R1[2]], S2 = [R2[1], R2[0], R2[2]];           // [A, B, C] ve [D, E, F]; açı B ve E köşesinde
    B.notrUcgen(c, W4, S1, ['A', 'B', 'C'], { renkler: duz }); B.notrUcgen(c, W4, S2, ['D', 'E', 'F'], { renkler: duz });
    const N1 = agirlik(S1), N2 = agirlik(S2);
    [[S1, 1, 0, 1, '3 cm', N1], [S1, 1, 2, 2, '8 cm', N1], [S2, 1, 0, 1, null, N2], [S2, 1, 2, 2, null, N2]].forEach(([T, i, j, n, sayi, M]) => {
      B.esitCentik(c, W4, T[i], T[j], n, EL[n - 1]);
      if (sayi) B.kenarEtiketi(c, W4, T[i], T[j], sayi, EL[n - 1], { merkez: M });
    });
    acisi(c, W4, S1[1], S1[0], S1[2], '60°', RENK.merkez, { r: 30, d: 62 }); acisi(c, W4, S2[1], S2[0], S2[2], null, RENK.merkez, { r: 30 });
    B.kenarEtiketi(c, W4, S1[0], S1[2], '7 cm', RENK.yazi, { merkez: N1 });
    const df = B.kenarEtiketi(c, W4, S2[0], S2[2], '?', RENK.goruntu, { merkez: N2, uzak: 36 });
    gizle(W4); await belir(c, W4, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'ABC ve DEF’de |AB| = |DE| = 3 cm, |BC| = |EF| = 8 cm ve m(B) = m(E) = 60°. |AC| = 7 cm ise |DF| kaç cm’dir?',
      options: ['3 cm', '7 cm', '14 cm'], answer: 1,
      hints: ['AC ile DF karşılıklı kenarlar.', '', 'Üçgenler Kenar-Açı-Kenar ile eş; kalan kenarlar da eşit.'],
      right: 'Evet. Karşılıklı kenarlar eşit.',
    });
    cevapla(df, '7 cm');
    await c.say('Üçgenler eş; AC’nin karşılığı DF de 7 cm.', { speak: 'Üçgenler eş; A C’nin karşılığı D F de yedi santimetre.' });
  }

  /* ---- 4. İki açı ve bir kenar ---- */
  async function ikiAciKenar(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { x0: 90, sutun: 15 });
    const W = c.S('g', {}, svg);
    const T = B.ucgenKur('AKA', [4, 37, 90], z.P(1, 3), { olcek: 40, aci: 90, taraf: 1 });
    const U = B.ucgenKur('AKA', [4, 37, 90], z.P(8, 4), { olcek: 40, aci: 0, taraf: -1 });
    const [A, Bn, Cn] = T, [D, E, F] = U;
    const isinlar = [];
    const isin = (V, dir, L, renk) => { const l = cizgi(c, W, V, V, renk, 3.5); isinlar.push(l); return (x) => koy(l, V, ileri(V, dir, L * x)); };
    const abc = cokgen(c, W, T, RENK.sekil, { harf: ['A', 'B', 'C'] });
    const taban = cizgi(c, W, A, Bn, RENK.sekil, 6);
    const l8 = B.kenarEtiketi(c, W, A, Bn, '8 cm', RENK.sekil, { merkez: [400, 262] });
    const rA = isin(A, rad(53), 300, RENK.cizgi), rB = isin(Bn, 0, 300, RENK.cizgi);
    const dirA = ileri(A, rad(53), 100), dirB = ileri(Bn, 0, 100);
    const a37 = acisi(c, W, A, Bn, dirA, '37°', RENK.merkez, { r: 36, d: 82 });
    const a90 = acisi(c, W, Bn, A, dirB, null, RENK.merkez, { r: 30, dik: true });
    const t90 = yazi(c, W, Bn[0] + 42, Bn[1] + 36, '90°', { size: 22, kalin: 700, renk: RENK.merkez });
    const a53 = acisi(c, W, Cn, Bn, A, '53°', RENK.merkez, { r: 34, d: 62 });
    const nc = nokta(c, W, Cn, RENK.yazi, 7);
    const eq = yazi(c, W, 330, 482, '180° − 37° − 90° = 53°', { size: 30, kalin: 700 });
    gizle(abc.yuz, abc.adlar, taban, l8, a37.g, a90.g, t90, a53.g, nc, eq);

    await par(c.say('Bu kez 8 cm’lik bir kenarın iki ucundan açı çiziyoruz.', { speak: 'Bu kez sekiz santimetrelik bir kenarın iki ucundan açı çiziyoruz.' }), (async () => {
      await belir(c, [taban, l8, abc.adlar[0], abc.adlar[1]], 500);
    })());
    await par(c.say('Bir uçta 37°, öbür uçta 90°.', { speak: 'Bir uçta otuz yedi derece, öbür uçta doksan derece.' }), belir(c, [a37.g, a90.g, t90], 500));
    await par(c.say('İki ışın tek bir noktada kesişiyor; üçgen tamam.'), (async () => {
      await c.tween(1700, (x) => { rA(x); rB(x); }, Ders.ease.inOut);
      await par(belir(c, [nc, abc.adlar[2]], 350), belir(c, abc.yuz, 500));
    })());
    await par(c.say('Üçüncü açı hesaplanır: 180° − 37° − 90° = 53°.', { speak: 'Üçüncü açı hesaplanır: yüz seksen eksi otuz yedi eksi doksan eşittir elli üç derece.' }), belir(c, [a53.g, eq], 500));
    c.clearSay();

    // Aynı kenar ve açılarla kurulan DEF, ABC'nin üstüne oturur.
    const def = cokgen(c, W, U, RENK.goruntu), tabanD = cizgi(c, W, D, E, RENK.goruntu, 6);
    const aD = acisi(c, W, D, E, ileri(D, rad(37), 100), null, RENK.merkez, { r: 36 }), dE = acisi(c, W, E, D, ileri(E, rad(90), 100), null, RENK.merkez, { r: 30, dik: true });
    const rD = isin(D, rad(37), 300, RENK.goruntu), rE = isin(E, rad(90), 240, RENK.goruntu);
    gizle(def.g, tabanD, aD.g, dE.g);
    await par(c.say('Aynı kenar ve açılarla kurulan her üçgen buna oturuyor.'), (async () => {
      await par(belir(c, eq, 300, 0), belir(c, [tabanD, aD.g, dE.g], 450));
      await c.tween(1500, (x) => { rD(x); rE(x); }, Ders.ease.inOut);
      await belir(c, def.g, 400);
      await par(sil(c, [tabanD, aD.g, dE.g], 300), belir(c, isinlar, 300, 0));
      await c.tween(1700, (x) => def.koy(araHepsi(U, T, x)), Ders.ease.inOut);
    })());
    await c.say('İki açı ve bir kenar belliyse tek bir üçgen çizilir.');
    await par(c.say('Kenar hangi iki açının arasındaysa, üçüncü açı hesaplanınca bilinir.'), vurgula(c, [taban], 900));
    const ad = yazi(c, W, 400, 480, 'Açı-Kenar-Açı (A.K.A.)', { size: 34, kalin: 700 });
    gizle(ad);
    await par(c.say('Bu koşulun adı Açı-Kenar-Açı eşliğidir.'), belir(c, ad, 500));
    c.clearSay();

    // Birlikte çöz: üçüncü açı.
    await belir(c, [W, z.g], 350, 0); W.remove(); z.g.remove();
    const W2 = c.S('g', {}, svg), duz = [RENK.yazi, RENK.yazi, RENK.yazi];
    const r1 = B.ucgenKur('AKA', [7, 60, 70], [110, 330], { olcek: 20, aci: 0, taraf: 1 }), r2 = B.ucgenKur('AKA', [7, 60, 70], [540, 215], { olcek: 20, aci: 0, taraf: -1 });
    const X1 = [r1[2], r1[0], r1[1]], X2 = [r2[2], r2[0], r2[1]];             // [A, B, C] ve [D, E, F]
    B.notrUcgen(c, W2, X1, ['A', 'B', 'C'], { renkler: duz }); B.notrUcgen(c, W2, X2, ['D', 'E', 'F'], { renkler: duz });
    const N1 = agirlik(X1), N2 = agirlik(X2);
    [[X1, 1, 2, '7', N1], [X2, 1, 2, null, N2]].forEach(([Tt, i, j, sayi, M]) => {
      B.esitCentik(c, W2, Tt[i], Tt[j], 1, EL[0]);
      if (sayi) B.kenarEtiketi(c, W2, Tt[i], Tt[j], sayi, EL[0], { merkez: M });
    });
    const dg = [['50°', 50], ['60°', 60], ['70°', 70]];
    const ac1 = [0, 1, 2].map((i) => acisi(c, W2, X1[i], X1[(i + 1) % 3], X1[(i + 2) % 3], dg[i][0], RENK.merkez, { r: 26, d: i === 0 ? 62 : 48 }));
    const ac2 = [0, 1, 2].map((i) => acisi(c, W2, X2[i], X2[(i + 1) % 3], X2[(i + 2) % 3], i === 2 ? '?' : null, RENK.merkez, { r: 26, d: 48 }));
    const eq2 = yazi(c, W2, 500, 480, 'm(C) = 180° − 50° − 60° = 70°', { size: 30, kalin: 700 });
    gizle(W2); await belir(c, W2, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ABC ve DEF’de m(A) = m(D) = 50°, m(B) = m(E) = 60° ve |BC| = |EF| = 7 cm. m(F) kaç derecedir?',
      options: ['60°', '50°', '70°'], answer: 2,
      hints: ['İlk iki açı aynı; üçüncüsü de aynı hesaptan çıkar.', '180° − 50° − 60°.', ''],
      right: 'Evet. F açısı C açısına eşit.',
    });
    cevapla(ac2[2].et, '70°');
    await c.say('F açısı, C açısına eşit: 70°.', { speak: 'F açısı, C açısına eşit: yetmiş derece.' });
    c.clearSay();

    // Sıra sende: eş mi?
    await belir(c, W2, 350, 0); W2.remove();
    const W3 = c.S('g', {}, svg);
    const q1 = B.ucgenKur('AKA', [6, 40, 80], [110, 420], { olcek: 34, aci: 0, taraf: 1 }), q2 = B.ucgenKur('AKA', [6, 40, 80], [560, 170], { olcek: 34, aci: 0, taraf: -1 });
    B.notrUcgen(c, W3, q1, ['A', 'B', 'C'], { renkler: duz }); B.notrUcgen(c, W3, q2, ['D', 'E', 'F'], { renkler: duz });
    const O1 = agirlik(q1), O2 = agirlik(q2);
    [[q1, O1, '6 cm'], [q2, O2, null]].forEach(([Tt, M, ad]) => {
      B.esitCentik(c, W3, Tt[0], Tt[1], 1, EL[0]);
      if (ad) B.kenarEtiketi(c, W3, Tt[0], Tt[1], ad, EL[0], { merkez: M });
    });
    const dd = ['40°', '80°', '?'], dn = [null, null, '?'];
    const bs1 = [0, 1, 2].map((i) => acisi(c, W3, q1[i], q1[(i + 1) % 3], q1[(i + 2) % 3], dd[i], RENK.merkez, { r: 28, d: [78, 50, 50][i] }));
    const bs2 = [0, 1, 2].map((i) => acisi(c, W3, q2[i], q2[(i + 1) % 3], q2[(i + 2) % 3], dn[i], RENK.merkez, { r: 28, d: [78, 50, 50][i] }));
    gizle(W3); await belir(c, W3, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'ABC ve DEF’de m(A) = m(D) = 40°, m(B) = m(E) = 80° ve |AB| = |DE| = 6 cm. Üçgenler eş midir?',
      options: ['Hayır; yalnızca iki açı eşit', 'Evet; Açı-Kenar-Açı', 'Evet; Kenar-Kenar-Kenar'], answer: 1,
      hints: ['Üçüncü açılar da 60°; AB, A ile B’nin arasında.', '', 'Üç kenar eşit denmedi; iki açı ve bir kenar eşit.'],
      right: 'Evet. İki açı ve aralarındaki kenar eşit.',
    });
    cevapla(bs1[2].et, '60°'); cevapla(bs2[2].et, '60°');
    await c.say('Üçüncü açılar 60°; AB iki açının arasında: Açı-Kenar-Açı.', { speak: 'Üçüncü açılar altmış derece; A B iki açının arasında: Açı Kenar Açı.' });
  }

  /* ---- 5. Üç açı yetmez ---- */
  async function ucAciYetmez(c) {
    const svg = c.svg(1000, 562);
    const W = c.S('g', {}, svg);
    const A = [170, 308], E = [170, 500], C = [314, 500];
    const ic = B.icice(c, W, [A, E, C], 1, { k0: 1 });
    const acK = aciGrubu(c, W, () => [A, E, C], RENK.merkez), acB = aciGrubu(c, W, () => ic.pts(), RENK.merkez);
    const etK = [['37°', A, E, C, 84], ['90°', E, C, A, 48], ['53°', C, A, E, 62]].map(([m, V, P1, Q1, d]) => { const q = aciIci(V, P1, Q1, d); return yazi(c, W, q[0], q[1] + 8, m, { size: 22, kalin: 700, renk: RENK.merkez }); });
    const NB = '     ';
    const uc3 = yazi(c, W, 500, 300, '37°' + NB + '53°' + NB + '90°', { size: 60, kalin: 700, renk: RENK.merkez });
    const MK = agirlik([A, E, C]);
    const lK = [B.kenarEtiketi(c, W, A, E, '8 cm', RENK.sekil, { merkez: MK }), B.kenarEtiketi(c, W, E, C, '6 cm', RENK.sekil, { merkez: [240, 300] })];
    const Pb = ic.hesap(2), MB = agirlik(Pb);
    const lB = [B.kenarEtiketi(c, W, Pb[0], Pb[1], '16 cm', RENK.goruntu, { merkez: MB }), B.kenarEtiketi(c, W, Pb[1], Pb[2], '12 cm', RENK.goruntu, { merkez: MB })];
    lB[1].setAttribute('x', 372);
    const hayal = [1.25, 1.5, 1.75].map((k) => c.S('polygon', { points: nk(ic.hesap(k)), fill: 'none', stroke: RENK.goruntu, 'stroke-width': 2, 'stroke-opacity': 0.45, 'stroke-dasharray': '6 6' }, W));
    gizle(ic.kucuk.g, ic.buyuk.g, acK.g, acB.g, etK, lK, lB, hayal);

    await par(c.say('Şimdi yalnızca açılara bakalım: 37°, 53° ve 90°.', { speak: 'Şimdi yalnızca açılara bakalım: otuz yedi derece, elli üç derece ve doksan derece.' }), (async () => {
      uc3.style.opacity = 0; await belir(c, uc3, 450);
    })());
    await par(c.say('Bu üç açıyla bir üçgen çizdik.'), (async () => {
      await belir(c, uc3, 300, 0); await belir(c, [ic.kucuk.g, acK.g, ...etK], 600);
    })());
    await par(c.say('Aynı üç açıyla daha büyük bir üçgen de çizilebilir.'), (async () => {
      await belir(c, [ic.buyuk.g, acB.g], 300);
      await c.tween(1700, (x) => { ic.buyut(1 + x); acB.guncelle(); }, Ders.ease.inOut);
    })());
    await par(c.say('Büyüdükçe kenarlar uzuyor, açılar aynı kalıyor.'), belir(c, [...lK, ...lB], 500));
    await par(c.say('Üç açısı belli sonsuz tane üçgen çizilebilir.'), belir(c, hayal, 600));
    await c.say('Üç açı eşit olsa bile üçgenler eş olmayabilir.', { speak: '[thoughtful] Üç açı eşit olsa bile üçgenler eş olmayabilir.' });
    c.clearSay();

    // Birlikte çöz: tablo.
    const tab = [['37°', '37°'], ['53°', '53°'], ['90°', '90°'], ['8 cm', '16 cm']].map((r, i) => satir(c, W, i, [[r[0], RENK.sekil], BOSLUK, [r[1], RENK.goruntu]]));
    gizle(tab); await belir(c, [...tab], 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Tabloda iki üçgenin açıları ve bir kenarı yazılı. Bu iki üçgen eş midir?',
      options: ['Evet; üç açı eşit', 'Hayır; açıları eşit ama kenarları eşit değil', 'Evet; ikisi de dik üçgen'], answer: 1,
      hints: ['Karşılıklı kenarlar 8 ve 16: eşit değil.', '', 'Aynı açılarla büyük ve küçük üçgen çizilebilir.'],
      right: 'Evet. Kenarlar 8 ve 16, eşit değil.',
    });
    await c.say('Açılar eşit ama kenarlar 8 ve 16: eş değiller.', { speak: 'Açılar eşit ama kenarlar sekiz ve on altı: eş değiller.' });
    c.clearSay();
    await sil(c, [...tab], 300);

    // Sıra sende: iki eşkenar üçgen.
    await belir(c, W, 350, 0); W.remove();
    const W2 = c.S('g', {}, svg);
    const eskenar = (x0, y0, s) => [[x0, y0], [x0 + s, y0], [x0 + s / 2, y0 - s * Math.sqrt(3) / 2]];
    const e1 = eskenar(120, 420, 140), e2 = eskenar(380, 420, 224);
    [[e1, '5 cm'], [e2, '8 cm']].forEach(([T, ad]) => {
      cokgen(c, W2, T, RENK.cizgi, { dolgu: 0.12 });
      const M = agirlik(T);
      T.forEach((V, i) => {
        aciYayi(c, W2, V, T[(i + 1) % 3], T[(i + 2) % 3], RENK.merkez, 26);
        const d = uz(M, V), q = [V[0] + ((V[0] - M[0]) / d) * 40, V[1] + ((V[1] - M[1]) / d) * 40];
        yazi(c, W2, q[0], q[1] + 8, '60°', { size: 22, kalin: 700, renk: RENK.merkez });
      });
      B.kenarEtiketi(c, W2, T[0], T[1], ad, RENK.yazi, { merkez: M, uzak: 44 });
    });
    gizle(W2); await belir(c, W2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Üç açısı da 60° olan iki üçgenden birinin kenarları 5 cm, ötekinin kenarları 8 cm’dir. Bu üçgenler için hangisi doğrudur?',
      options: ['Eştirler; ikisi de eşkenar', 'Eştirler; üç açı eşit', 'Eş değildirler'], answer: 2,
      hints: ['Kenarlar 5 ve 8: eşit değil.', 'Üç açı eşitliği eşlik için yetmez.', ''],
      right: 'Evet. Kenarlar farklı olduğundan eş değiller.',
    });
    await c.say('Kenarlar 5 ve 8 olduğundan üçgenler eş değil.', { speak: 'Kenarlar beş ve sekiz olduğundan üçgenler eş değil.' });
    c.clearSay();

    // Gör: büyüyen üçgen.
    await belir(c, W2, 350, 0); W2.remove();
    const W3 = c.S('g', {}, svg);
    const ic3 = B.icice(c, W3, [A, E, C], 1, { k0: 1 });
    aciGrubu(c, W3, () => [A, E, C], RENK.merkez);
    const acB3 = aciGrubu(c, W3, () => ic3.pts(), RENK.merkez);
    [['37°', A, E, C, 84], ['90°', E, C, A, 48], ['53°', C, A, E, 62]].forEach(([m, V, P1, Q1, d]) => { const q = aciIci(V, P1, Q1, d); yazi(c, W3, q[0], q[1] + 8, m, { size: 22, kalin: 700, renk: RENK.merkez }); });
    const lg = c.S('g', {}, W3);
    const etiketle = (k) => {
      while (lg.firstChild) lg.removeChild(lg.firstChild);
      const Pk = ic3.hesap(k), Mk = agirlik(Pk);
      B.kenarEtiketi(c, lg, Pk[0], Pk[1], virgul(8 * k) + ' cm', RENK.goruntu, { merkez: Mk });
      B.kenarEtiketi(c, lg, Pk[1], Pk[2], virgul(6 * k) + ' cm', RENK.goruntu, { merkez: Mk });
      B.kenarEtiketi(c, lg, Pk[0], Pk[2], virgul(10 * k) + ' cm', RENK.goruntu, { merkez: Mk });
    };
    etiketle(1);
    gizle(W3); await belir(c, W3, 450);
    await c.say('Üçgeni büyüt; açılara ve kenarlara bak.', { noWait: true });
    const sl = c.slider({
      label: 'Üçgenin büyüklüğü', min: 1, max: 2, step: 0.25, value: 1, fmt: (v) => virgul(v) + '×',
      onInput: (v) => { const k = +v; ic3.buyut(k); acB3.guncelle(); etiketle(k); },
    });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    const k0 = ic3.k();
    if (k0 !== 2) await c.tween(700, (x) => { const k = k0 + (2 - k0) * x; ic3.buyut(k); acB3.guncelle(); }, Ders.ease.inOut);
    ic3.buyut(2); acB3.guncelle(); etiketle(2);
    await c.say('Eşlik için üç açı yetmez; en az bir kenar gerekir.');
    c.note('<b>Eşlik için:</b> K.K.K. · K.A.K. · A.K.A. Üç açı yetmez.', 'Eşlik koşulları', 'b2-kosullar');
  }

  /* ---- 6. Masa örtüsü ---- */
  async function masa(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg, { sutun: 9, x0: 90, b: 44, y0: 50 });
    const K = z.P(1, 10), N = z.P(8, 10), M = z.P(8, 3), L = z.P(1, 3), A = z.P(1, 6), Bn = z.P(4, 10), Cn = z.P(8, 7), D = z.P(5, 3);
    const W = c.S('g', {}, svg);
    const ortu = cokgen(c, W, [K, N, M, L], RENK.cizgi, { harf: ['K', 'N', 'M', 'L'], dolgu: 0.06 });
    const masaP = cokgen(c, W, [A, Bn, Cn, D], RENK.sekil, { harf: ['A', 'B', 'C', 'D'], dolgu: 0.2 });
    const t1 = poly(c, W, [A, K, Bn], RENK.cizgi, 0.22), t2 = poly(c, W, [Bn, N, Cn], RENK.cizgi, 0.22);
    const olcek = yazi(c, W, 760, 100, '1 kare = 10 cm', { size: 28, kalin: 600, renk: RENK.soluk });
    const l30 = yazi(c, W, (K[0] + Bn[0]) / 2, K[1] + 34, '30 cm', { size: 24, kalin: 700 }), l40 = yazi(c, W, (Bn[0] + N[0]) / 2, N[1] + 34, '40 cm', { size: 24, kalin: 700 });
    const lax = A[0] - 62, lay = (A[1] + K[1]) / 2 + 8;
    const lAK = yazi(c, W, lax, lay, '40 cm', { size: 24, kalin: 700 });
    const eq = yazi(c, W, 760, 180, '', { size: 32, kalin: 700 });
    const eqYaz = async (metin, renk) => {
      await belir(c, eq, 200, 0); parcaKoy(c, eq, [[metin, renk || RENK.yazi]]); await belir(c, eq, 300, 1);
    };
    const dK = acisi(c, W, K, A, Bn, null, EL[1], { r: 30, dik: true }), dN = acisi(c, W, N, Bn, Cn, null, EL[1], { r: 30, dik: true });
    const aX = acisi(c, W, A, K, Bn, 'x', EL[0], { r: 26, d: 60 }), aY = acisi(c, W, Bn, K, A, 'y', EL[2], { r: 26, d: 60 });
    const dB = acisi(c, W, Bn, A, Cn, '90°', EL[1], { r: 30, dik: true, d: 54 }), aC = acisi(c, W, Bn, Cn, N, '?', RENK.cizgi, { r: 26, d: 50 });
    const aYc = acisi(c, W, Cn, N, Bn, 'y', EL[2], { r: 26, d: 50 });
    const kenar = (V, U, n, renk) => { const g = c.S('g', {}, W); cizgi(c, g, V, U, renk, 6); B.esitCentik(c, g, V, U, n, renk); return g; };
    const ed = [kenar(A, K, 3, EL[2]), kenar(Bn, N, 3, EL[2]), kenar(K, Bn, 1, EL[0]), kenar(N, Cn, 1, EL[0]), kenar(A, Bn, 2, EL[1]), kenar(Bn, Cn, 2, EL[1])];
    const yz = B.eslemeYazisi(c, W, 760, 190, 'AKB', 'BNC', '≅', { ucgenSimge: false, size: 46 });
    gizle(ortu.g, masaP.g, ortu.adlar, masaP.adlar, t1, t2, olcek, l30, l40, lAK, eq, dK.g, dN.g, aX.g, aY.g, dB.g, aC.g, aYc.g, ed, yz);

    await par(c.say('Kare bir masaya kare bir örtü serilmiş.'), belir(c, [ortu.g, masaP.g, olcek], 500));
    await par(c.say('Masanın köşeleri örtünün kenarlarında; B, KN kenarında.', { speak: 'Masanın köşeleri örtünün kenarlarında; B, K N kenarında.' }), belir(c, [...ortu.adlar, ...masaP.adlar], 500));
    await par(c.say('|KB| = 30 cm ve |BN| = 40 cm.', { speak: 'K B uzunluğu otuz santimetre ve B N uzunluğu kırk santimetre.' }), belir(c, [l30, l40], 500));
    await par(belir(c, olcek, 300, 0), eqYaz('|KN| = 30 + 40 = 70 cm'));
    await c.say('Örtünün kenarı |KN| = 30 + 40 = 70 cm.', { speak: 'Örtünün kenarı, K N uzunluğu, otuz artı kırk eşittir yetmiş santimetre.' });
    await eqYaz('70 × 70 = 4 900 cm²');
    await c.say('Örtünün alanı 70 × 70 = 4 900 cm².', { speak: 'Örtünün alanı yetmiş çarpı yetmiş eşittir dört bin dokuz yüz santimetre kare.' });
    // Masanın alanı için AB gerekir.
    await par(c.say('Masanın alanı için AB kenarı lazım; AKB dik üçgen, ama AK bilinmiyor.', { speak: 'Masanın alanı için A B kenarı lazım; A K B dik üçgen, ama A K bilinmiyor.' }), (async () => {
      await belir(c, eq, 250, 0); await par(belir(c, [t1, dK.g], 450), belir(c, [l30, l40, ortu.adlar[2], ortu.adlar[3], masaP.adlar[3]], 250, 0));
      lAK.textContent = '?'; lAK.setAttribute('x', lax + 14); await belir(c, lAK, 350);
    })());
    await par(c.say('AKB ile BNC üçgenlerine bakalım: eş olabilirler mi?', { speak: 'A K B ile B N C üçgenlerine bakalım: eş olabilirler mi?' }), belir(c, [t2, dN.g], 450));
    // x ve y açıları.
    await par(c.say('AKB’de KAB açısı x, KBA açısı y: x + y = 90°.', { speak: 'A K B’de K A B açısı x, K B A açısı y: x artı y eşittir doksan derece.' }), (async () => {
      await belir(c, [aX.g, aY.g], 450); await eqYaz('x + y = 90°');
    })());
    await par(c.say('B köşesinde düz açı var: y, 90° ve CBN açıları toplamı 180°.', { speak: 'B köşesinde düz açı var: y, doksan derece ve C B N açıları toplamı yüz seksen derece.' }), (async () => {
      await par(belir(c, [dB.g, aC.g], 450), eqYaz('y + 90° + CBN = 180°'));
    })());
    await par(c.say('Buradan CBN açısı 90° − y = x.', { speak: 'Buradan C B N açısı, doksan eksi y, eşittir x.' }), (async () => {
      aC.et.textContent = 'x'; aC.et.style.fill = EL[0]; aC.yay.setAttribute('stroke', EL[0]);
      await eqYaz('CBN = 90° − y = x');
    })());
    await par(c.say('BNC’de N dik açı: BCN açısı 90° − x = y.', { speak: 'B N C’de N dik açı: B C N açısı, doksan eksi x, eşittir y.' }), (async () => {
      await belir(c, aYc.g, 450); await eqYaz('BCN = 90° − x = y');
    })());
    await par(c.say('Masa kare: |AB| = |BC|; kenar, x ve y açılarının arasında.', { speak: 'Masa kare: A B uzunluğu, B C uzunluğuna eşit; kenar, x ve y açılarının arasında.' }), (async () => {
      await belir(c, [ed[4], ed[5]], 500); await eqYaz('|AB| = |BC|');
    })());
    await par(c.say('İki açı ve aradaki kenar eşit: AKB ≅ BNC (Açı-Kenar-Açı).', { speak: 'İki açı ve aradaki kenar eşit: A K B eştir B N C, Açı Kenar Açı eşliği.' }), (async () => {
      await belir(c, [ed[0], ed[1], ed[2], ed[3]], 500); await belir(c, eq, 250, 0); await belir(c, yz, 450);
    })());
    c.clearSay();

    // Birlikte çöz.
    await belir(c, lAK, 200, 0);
    await c.choice({
      tag: 'Birlikte çöz', q: 'AKB ≅ BNC ve karşılıklı köşeler A–B, K–N, B–C. |AK| hangi kenara eşittir?',
      options: ['|KB| = 30 cm', '|BN| = 40 cm', '|BC|'], answer: 1,
      hints: ['AK, ilk iki harf; karşılığı BN.', '', 'Karşılıklı kenarlar eşit.'],
      right: 'Evet. A–B ve K–N eşlendiğinden AK, BN’ye eşit.',
    });
    lAK.textContent = '40 cm'; lAK.setAttribute('x', lax); lAK.style.fill = RENK.iyi;
    await par(c.say('AK, karşılığı BN’ye eşit: 40 cm.', { speak: 'A K, karşılığı B N’ye eşit: kırk santimetre.' }), belir(c, lAK, 400));
    c.clearSay();

    // Pisagor ile AB.
    lAK.style.fill = RENK.yazi;
    await par(belir(c, [dB.g, aC.g, aX.g, aY.g, aYc.g, dN.g, yz, ...ed], 350, 0), belir(c, [l30, l40], 400));
    await c.say('AKB dik üçgeninde |AK| = 40 ve |KB| = 30 cm.', { speak: 'A K B dik üçgeninde A K uzunluğu kırk, K B uzunluğu otuz santimetre.' });
    await eqYaz('|AB|² = 40² + 30² = 2 500');
    await c.say('Pisagor bağıntısıyla |AB|² = 40² + 30² = 2 500.', { speak: 'Pisagor bağıntısıyla A B uzunluğunun karesi, kırk kare artı otuz kare, eşittir iki bin beş yüz.' });
    await eqYaz('|AB| = 50 cm');
    const alan = yazi(c, W, 760, 250, 'Masanın alanı 2 500 cm²', { size: 30, kalin: 700, renk: RENK.sekil });
    gizle(alan);
    await par(c.say('|AB| = 50 cm; masanın alanı 2 500 cm².', { speak: 'A B uzunluğu elli santimetre; masanın alanı iki bin beş yüz santimetre kare.' }), belir(c, alan, 500));
    c.clearSay();

    // Sıra sende: yeni masa.
    await par(belir(c, [eq, alan, t1, t2, dK.g], 350, 0), belir(c, lAK, 200, 0));
    olcek.textContent = '1 kare = 2 cm'; l30.textContent = '6 cm'; l40.textContent = '8 cm';
    const mab = ara(A, Bn, 0.5);                      // AB'nin ortası; etiket masanın içine, AB'ye dik konur
    const nu = Math.hypot(Bn[1] - A[1], Bn[0] - A[0]), dn = [(Bn[1] - A[1]) / nu, -(Bn[0] - A[0]) / nu];
    const qq = yazi(c, W, mab[0] + dn[0] * 50, mab[1] + dn[1] * 50 + 8, '?', { size: 28, kalin: 700, renk: RENK.goruntu });
    const ab = kenar(A, Bn, 2, EL[1]);
    gizle(qq, ab);
    await par(belir(c, [olcek, ab, qq], 450));
    await c.choice({
      tag: 'Sıra sende', q: 'Başka bir masada |BK| = 6 cm ve |BN| = 8 cm. Masanın bir kenarı kaç cm’dir?',
      options: ['14 cm', '48 cm', '10 cm'], answer: 2,
      hints: ['14 cm örtünün kenarıydı; masanınki değil.', '|AK| = |BN| = 8 cm; AKB dik üçgeninde 6 ve 8.', ''],
      right: 'Evet. 6, 8 ve 10 cm.',
    });
    cevapla(qq, '10 cm');
    await c.say('|AK| = |BN| = 8 cm; masanın kenarı 10 cm.', { speak: 'A K uzunluğu, B N uzunluğuna eşit, sekiz santimetre; masanın kenarı on santimetre.' });
  }

  /* ---- 7. Hangi veri hangi koşulu verir? ---- */
  async function siniflandir(c) {
    const svg = c.svg(1000, 562);
    const adlar = ['Eş (K.K.K.)', 'Eş (K.A.K.)', 'Eş (A.K.A.)', 'Eş olduğu söylenemez'];
    const kx = [15, 325, 515, 705], kw = [290, 170, 170, 280];
    const KG = c.S('g', {}, svg);
    adlar.forEach((ad, i) => {
      const g = c.S('g', {}, KG);
      c.S('rect', { x: kx[i], y: 388, width: kw[i], height: 150, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      yazi(c, g, kx[i] + 16, 422, ad, { hiza: 'start', size: 22, kalin: 700 });
    });
    gizle(KG); await belir(c, KG, 400);

    // Kartların çizimi: iki üçgen, eşit olduğu bilinen kenar ve açılar işaretli.
    const kur = (g, s) => {
      const P = B.ucgenKur(s.tur, s.veri, [250, 300], { olcek: s.olcek, aci: 0, taraf: 1 });
      const Q = B.ucgenKur(s.tur, s.veri2 || s.veri, [600, 300], { olcek: s.olcek, aci: 180, taraf: -1 });
      const e = B.esleme(c, g, P, Q, { harf1: [], harf2: [], dik: -1 });
      e.yaylar.forEach((y, i) => { if (!s.yay.includes(i)) gizle(y); });
      e.kenarlar.forEach((k, i) => { if (!s.ken.includes(i)) gizle(k); });
    };
    const KKK = { yay: [], ken: [0, 1, 2, 3, 4, 5] }, KAK = { yay: [0, 3], ken: [1, 2, 4, 5] }, AKA = { yay: [0, 1, 3, 4], ken: [2, 5] }, ACI = { yay: [0, 1, 2, 3, 4, 5], ken: [] };
    const kartlar = [
      Object.assign({ yazi: 'Karşılıklı üç kenarı 5, 6, 7 cm olan iki üçgen', tur: 'KKK', veri: [5, 6, 7], olcek: 26, cevap: 0,
        ip: ['', 'Aradaki açı verilmedi; üç kenar verildi.', 'Hiçbir açı verilmedi; üç kenar verildi.', 'Üç kenar eşitse üçgenler eştir.'], dogru: 'Evet. Üç kenar eşit: Kenar-Kenar-Kenar.' }, KKK),
      Object.assign({ yazi: 'Karşılıklı iki kenarı 4 ve 9 cm, aralarındaki açı 70° olan iki üçgen', tur: 'KAK', veri: [4, 70, 9], olcek: 20, cevap: 1,
        ip: ['Üçüncü kenar verilmedi; iki kenar ve aradaki açı verildi.', '', 'İki açı verilmedi; bir açı ve iki kenar verildi.', 'İki kenar ve aradaki açı eşlik için yeter.'], dogru: 'Evet. İki kenar ve aradaki açı eşit.' }, KAK),
      Object.assign({ yazi: 'Karşılıklı iki açısı 40° ve 65°, aralarındaki kenar 8 cm olan iki üçgen', tur: 'AKA', veri: [8, 40, 65], olcek: 20, cevap: 2,
        ip: ['Üç kenar verilmedi; iki açı ve bir kenar verildi.', 'İki kenar verilmedi; kenar iki açının arasında.', '', 'İki açı ve aralarındaki kenar eşlik için yeter.'], dogru: 'Evet. İki açı ve aradaki kenar eşit.' }, AKA),
      Object.assign({ yazi: 'Karşılıklı kenarları 3, 4, 5 cm olan iki üçgen', tur: 'KKK', veri: [4, 3, 5], olcek: 34, cevap: 0,
        ip: ['', 'Hiçbir açı verilmedi; üç kenar verildi.', 'Hiçbir açı verilmedi; üç kenar verildi.', 'Üç kenar eşitse üçgenler eştir.'], dogru: 'Evet. Üç kenar eşit: Kenar-Kenar-Kenar.' }, KKK),
      Object.assign({ yazi: 'Karşılıklı üç açısı 30°, 60°, 90° olan iki üçgen', tur: 'AKA', veri: [6, 30, 60], veri2: [9.6, 30, 60], olcek: 20, cevap: 3,
        ip: ['Üç açı eşit, ama kenarlar farklı olabilir.', 'Üç açı eşit, ama kenarlar farklı olabilir.', 'Üç açı eşit, ama kenarlar farklı olabilir.', ''], dogru: 'Evet. Üç açı eşit, ama kenarlar farklı olabilir.' }, ACI),
      Object.assign({ yazi: 'Karşılıklı üç açısı 50°, 60°, 70° olan iki üçgen', tur: 'AKA', veri: [6, 50, 60], veri2: [9.5, 50, 60], olcek: 20, cevap: 3,
        ip: ['Üç açı eşitliği eşlik için yetmez.', 'Üç açı eşitliği eşlik için yetmez.', 'Üç açı eşitliği eşlik için yetmez.', ''], dogru: 'Evet. Üç açı eşitliği eşlik için yetmez.' }, ACI),
    ];
    const merkez = [[87, 233], [410], [600], [777, 913]], sayac = [0, 0, 0, 0];
    await c.say('Her kartı verinin girdiği kutuya göre seç.', { noWait: true });
    for (const k of kartlar) {
      const g = c.S('g', {}, svg);
      kur(g, k);
      const cap = yazi(c, g, 500, 352, k.yazi, { size: 24, kalin: 600 });
      gizle(g); await belir(c, g, 400);
      await c.choice({ tag: 'Sıra sende', q: 'Kart hangi kutuya girer?', options: adlar, answer: k.cevap, hints: k.ip, right: k.dogru });
      await c.wait(400);
      cap.remove();
      const bb = g.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, s = 0.34;
      const hx = merkez[k.cevap][sayac[k.cevap]++], hy = 484;
      KG.appendChild(g);
      await c.tween(700, (x) => {
        const mm = 1 + (s - 1) * x;
        g.setAttribute('transform', `translate(${x * (hx - s * cx)},${x * (hy - s * cy)}) scale(${mm})`);
      }, Ders.ease.inOut);
    }
    c.clearSay();
    await c.tween(600, (x) => KG.setAttribute('transform', `translate(0,${-110 * x})`), Ders.ease.inOut);
    await c.say('Üç kenar, K.A.K. ve A.K.A. eşlik verir; üç açı vermez.', { speak: 'Üç kenar, Kenar Açı Kenar ve Açı Kenar Açı eşlik verir; üç açı vermez.' });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-b2', kicker: 'Konu B · Eşlik ve benzerlik koşulları', title: 'Eşlik için en az ne gerekir?', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Eşlik için en az ne gerekir?',
      hook: 'Bir marangoza üçgen bir rafın yalnızca <b>üç kenar uzunluğunu</b> söylesen aynı rafı yapabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Eşlik için üç kenarın, iki kenar ve aradaki açının ya da iki açı ve bir kenarın yeterli olduğunu söyler.', 'Verilen karşılıklı elemanlara bakarak hangi eşlik koşulunun uygulanacağını bulur.', 'Üç açı eşitliğinin eşlik için yetmediğini örnekle açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Eşlik yazısından karşılıklı kenarı oku; öteleme çevreyi değiştirmez.', run: hatirla },
      { title: 'Üç kenar', goal: 'Üç kenarı eşit iki üçgen eştir.', run: ucKenar },
      { title: 'İki kenar ve aradaki açı', goal: 'İki kenar ve aralarındaki açı belliyse tek üçgen çizilir.', run: ikiKenarAci },
      { title: 'İki açı ve bir kenar', goal: 'İki açı ve aralarındaki kenar belliyse tek üçgen çizilir.', run: ikiAciKenar },
      { title: 'Üç açı yetmez', goal: 'Aynı üç açıyla sonsuz tane üçgen çizilebilir.', run: ucAciYetmez },
      { title: 'Masa örtüsü', goal: 'Açı-Kenar-Açı ile eşliği bulup masanın kenarını hesapla.', run: masa },
      { title: 'Hangi veri hangi koşulu verir?', goal: 'Verilen eşitliklerden eşlik koşulunu belirle.', run: siniflandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'İki üçgenin karşılıklı üç açısı eşittir. Bu üçgenler için hangisi doğrudur?',
        options: ['Eş olmayabilirler; kenarları farklı olabilir', 'Eştirler', 'Eş olamazlar'], answer: 0,
        why: ['Aynı üç açıyla büyük ve küçük üçgenler çizilebilir; üç açı eşitliği eşlik için yetmez.', 'Üç açı eşitliği eşlik için yetmez; kenarlar farklıysa üçgenler eş değildir.', 'Kenarları da eşitse eş olurlar; yalnızca açılara bakarak karar verilemez.'],
        scene: 4,
      },
      {
        q: 'ABC ve DEF’de |AB| = |DE| = 6 cm, |BC| = |EF| = 8 cm ve m(B) = m(E) = 50°. Üçgenler hangi koşulla eştir?',
        options: ['Kenar-Kenar-Kenar', 'Kenar-Açı-Kenar', 'Açı-Kenar-Açı'], answer: 1,
        why: ['Üçüncü kenarlar verilmemiş; üç kenar eşit değil.', 'İki kenar ve aralarındaki açı eşit: Kenar-Açı-Kenar.', 'İki açı eşit değil; yalnızca bir açı verilmiş.'],
        scene: 2,
      },
      {
        q: '|AB| = |AC| olan ikizkenar ABC üçgeninde H, BC kenarının orta noktasıdır. ABH ve ACH üçgenleri hangi koşulla eştir?',
        options: ['Kenar-Açı-Kenar', 'Açı-Kenar-Açı', 'Kenar-Kenar-Kenar'], answer: 2,
        why: ['Eşit bir açı verilmedi; verilen eşitlikler yalnızca kenarlarla ilgili.', 'Hiçbir açı eşitliği verilmedi; A.K.A. kullanılamaz.', '|AB| = |AC|, |BH| = |CH| ve AH ortak kenar: üç kenar eşit.'],
        scene: 1,
      },
      {
        q: 'Kare bir masaya, köşeleri örtünün kenarlarında olacak biçimde kare bir örtü serildi. |BK| = 5 cm ve |BN| = 12 cm ise masanın bir kenarı kaç cm’dir?',
        options: ['17 cm', '13 cm', '60 cm'], answer: 1,
        why: ['17 cm örtünün kenarıdır: 5 + 12; masanınki değil.', '|AK| = |BN| = 12 cm olduğundan AKB dik üçgeninde 5 ve 12 var: |AB| = 13 cm.', '60 cm iki uzunluğun çarpımıdır; kenar uzunluğu çarpımla bulunmaz.'],
        scene: 5,
      },
      {
        q: 'Hangisi iki üçgenin eş olduğunu söylemek için yeterli değildir?',
        options: ['Karşılıklı iki açı ve bir kenarlarının eşit olması', 'Karşılıklı üç kenarlarının eşit olması', 'Karşılıklı üç açılarının eşit olması'], answer: 2,
        why: ['Açı-Kenar-Açı koşuludur; eşlik için yeterlidir.', 'Kenar-Kenar-Kenar koşuludur; eşlik için yeterlidir.', 'Üç açı eşit olsa bile kenarlar farklı olabilir; bu yetmez.'],
        scene: 4,
      },
    ],
    summary: [
      'Eşlik için üç kenar, iki kenar ve aradaki açı ya da iki açı ve bir kenar yeter.',
      'Koşul bulununca kalan elemanlar da eşittir.',
      '<b>Üç kenar tek üçgen verir; üç açı vermez.</b>',
      'Üç açı eşitliği eşlik için yetmez.',
    ],
    nextLesson: { href: 'b3-benzer-ucgenler.html', label: 'Sonraki: Benzer üçgenler: açılar eşit, kenarlar orantılı ›' },
  });
})();
