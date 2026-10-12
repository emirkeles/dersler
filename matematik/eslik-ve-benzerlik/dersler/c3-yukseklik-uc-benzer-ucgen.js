/* C3 — Dik köşeden inen yükseklik üç benzer üçgen verir
   Dik üçgende dik köşeden hipotenüse inen yükseklik, ilk üçgenle birlikte açıları a, b ve 90° olan üç benzer üçgen oluşturur.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/C-benzer-ucgenler-olusturma.md (C3)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, rad, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, cevapla, zemin, cokgen, aciYayi, aciIci, agirlik } = window.KIT;
  const C = window.KIT_C;
  const EL = C.ESLEME;                              // mavi, turuncu, yeşil
  const MAVI = EL[0], TUR = EL[1], YES = EL[2], SARI = RENK.merkez;
  const TX = 706;                                   // sağdaki yazı sütununun sol kenarı
  const GOZ = false;                                // true: soru anında geçici altyazı koyar (yalnızca ölçüm için)

  const sag = (c, p, y, parcalar, size = 25) => renkli(c, p, TX, y, parcalar, { hiza: 'start', size, kalin: 700 });
  const duz = (...x) => x.flat(Infinity);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); (Array.isArray(el) ? el : [el]).forEach((e) => e.remove()); };
  const soluk = (c, items, v, ms = 300) => {
    const es = duz(items), b = es.map((e) => (e.style.opacity === '' ? 1 : +e.style.opacity));
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = b[i] + (v - b[i]) * e; }));
  };
  const goz = async (c) => { if (GOZ) { await c.say('·'); c.clearSay(); } };
  const harf = (c, p, P, ad, dx, dy, renk = RENK.yazi, size = 24) => yazi(c, p, P[0] + dx, P[1] + dy, ad, { size, kalin: 700, renk });
  const ucAcik = (c, p, pts, renk, dolgu = 0.2) => { const t = cokgen(c, p, pts, renk, { dolgu }); t.yuz.setAttribute('stroke-width', 0); return t; };
  const yaylar = (c, p, V, P, Q, n, renk, r0 = 34, ar = 7) => { const g = c.S('g', {}, p); for (let k = 0; k < n; k++) aciYayi(c, g, V, P, Q, renk, r0 + k * ar); return g; };
  const etiket = (c, p, V, P, Q, metin, renk, r, size = 24) => { const m = aciIci(V, P, Q, r); return yazi(c, p, m[0], m[1] + size * 0.33, metin, { size, kalin: 700, renk }); };
  /* Çizgilerin kalınlığı bir kez artıp azalır. */
  const nab = (c, hatlar, w0 = 5, ms = 800) => c.tween(ms, (e) => duz(hatlar).forEach((h) => h.setAttribute('stroke-width', w0 + 3.5 * Math.sin(Math.PI * e))));
  const vurgula = (c, hatlar, ms = 900) => c.tween(ms, (e) => duz(hatlar).forEach((h) => { h.style.opacity = Math.sin(Math.PI * e); }));
  const temizle = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };
  /* Soru işareti yerine cevap: iki öğeyi değiştirir (eskisi söner, yenisi belirir). */
  const degis = async (c, eski, yeni, ms = 350) => { await par(belir(c, eski, ms, 0), belir(c, yeni, ms)); duz(eski).forEach((e) => e.remove()); };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Soru 1: DE paralel BC, benzerlik koşulu.
    const g1 = c.S('g', {}, svg);
    const A = [330, 80], Bn = [110, 400], Cn = [550, 400], D = ara(A, Bn, 0.4), E = ara(A, Cn, 0.4);
    cokgen(c, g1, [A, Bn, Cn], MAVI, { harf: ['A', 'B', 'C'] });
    ucAcik(c, g1, [A, D, E], TUR, 0.22);
    cizgi(c, g1, D, E, RENK.dogru, 4, { 'stroke-dasharray': '10 8' });
    cizgi(c, g1, Bn, Cn, RENK.dogru, 4, { 'stroke-dasharray': '10 8' });
    nokta(c, g1, D, TUR, 7); nokta(c, g1, E, TUR, 7);
    harf(c, g1, D, 'D', -26, -2, TUR); harf(c, g1, E, 'E', 26, -2, TUR);
    const kk = C.ortakKose(c, g1, [A, Bn, Cn], [A, D, E], { yayR: 30 });
    const aa = yazi(c, g1, 790, 250, 'Açı-Açı', { size: 36, kalin: 700, renk: RENK.iyi });
    gizle(kk.g, aa); gizle(g1); await belir(c, g1, 450);
    await goz(c);
    await c.choice({
      tag: 'Hatırla', q: 'DE doğrusu BC’ye paralel çizilince ADE üçgeni ABC üçgenine benzer çıktı. Bu benzerlik hangi koşula dayanır?',
      options: ['Kenar-Açı-Kenar', 'Açı-Açı', 'Kenar-Kenar-Kenar'], answer: 1,
      hints: ['Burada kenar oranı verilmedi; paralel çizgi açıları eşitledi.', '', 'Burada kenar oranı verilmedi; paralel çizgi açıları eşitledi.'],
      right: 'Evet. İki açı eşit.',
    });
    await par(c.say('Yöndeş açılar eşit, A ortak: iki açı eşit, Açı-Açı.'), par(belir(c, kk.g, 450), belir(c, aa, 450)));
    c.clearSay();
    await sil(c, g1, 350);

    // Soru 2: dik üçgende öbür dar açı.
    const g2 = c.S('g', {}, svg); g2.setAttribute('transform', 'translate(110 0)');
    const Bp = [130, 400], Cp = [560, 400], Ap = [130, 400 - 430 * Math.tan(rad(25))];
    cokgen(c, g2, [Ap, Bp, Cp], MAVI);
    aciYayi(c, g2, Bp, Ap, Cp, MAVI, 34, { dik: true });
    aciYayi(c, g2, Cp, Bp, Ap, SARI, 60); aciYayi(c, g2, Ap, Bp, Cp, SARI, 44);
    etiket(c, g2, Cp, Bp, Ap, '25°', SARI, 125);
    const soru = etiket(c, g2, Ap, Bp, Cp, '?', SARI, 84, 30);
    gizle(g2); await belir(c, g2, 450);
    await goz(c);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dik üçgende dar açılardan biri 25°. Öbür dar açı kaç derecedir?',
      options: ['75°', '155°', '65°'], answer: 2,
      hints: ['İç açılar toplamı 180°: 180° − 90° − 25° = 65°.', 'İç açılar toplamı 180°: 180° − 90° − 25° = 65°.', ''],
      right: 'Evet. 180° − 90° − 25° = 65°.',
    });
    cevapla(soru, '65°');
    await c.say('İç açılar toplamı 180°: 180° − 90° − 25° = 65°.', { speak: 'İç açılar toplamı yüz seksen derece: yüz seksen eksi doksan eksi yirmi beş eşittir altmış beş derece.' });
  }

  /* ---- 2. Gönyeyi kes ---- */
  async function gonye(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const R = z.P(1, 10), S = z.P(14, 10), P = z.P(5, 4), H = z.P(5, 10);
    const fRH = ucAcik(c, g, [P, R, H], RENK.cizgi, 0.3), fHS = ucAcik(c, g, [P, H, S], RENK.cizgi, 0.12);
    const prs = cokgen(c, g, [P, R, S], MAVI, { harf: ['P', 'R', 'S'], dolgu: 0.08 });
    const hRS = cizgi(c, g, R, S, MAVI, 8);
    const dikP = aciYayi(c, g, P, R, S, MAVI, 32, { dik: true });
    const ph = cizgi(c, g, P, P, SARI, 5);
    const dikH = c.S('g', {}, g); aciYayi(c, dikH, H, P, S, MAVI, 30, { dik: true }); aciYayi(c, dikH, H, P, R, MAVI, 30, { dik: true });
    const hH = harf(c, g, H, 'H', 0, 36);
    const aR = yaylar(c, g, R, P, S, 2, TUR, 36, 7), lA = etiket(c, g, R, P, S, 'a', TUR, 78);
    const aS = yaylar(c, g, S, P, R, 3, YES, 36, 7), lB = etiket(c, g, S, P, R, 'b', YES, 92);
    const eq = sag(c, g, 130, [['a', TUR], ' + ', ['b', YES], ' = ', ['90°', MAVI]], 28);
    // P'deki iki küçük açı: sorulan (sarı) ve cevap (renkli).
    const qRPH = yaylar(c, g, P, R, H, 1, SARI, 50), lqRPH = etiket(c, g, P, R, H, '?', SARI, 98, 28);
    const bRPH = yaylar(c, g, P, R, H, 3, YES, 48, 7), lbRPH = etiket(c, g, P, R, H, 'b', YES, 100);
    const qHPS = yaylar(c, g, P, H, S, 1, SARI, 50), lqHPS = etiket(c, g, P, H, S, '?', SARI, 98, 28);
    const aHPS = yaylar(c, g, P, H, S, 2, TUR, 48, 7), laHPS = etiket(c, g, P, H, S, 'a', TUR, 90);
    gizle(fRH.g, fHS.g, prs.g, hRS, dikP, ph, dikH, hH, aR, lA, aS, lB, eq, qRPH, lqRPH, bRPH, lbRPH, qHPS, lqHPS, aHPS, laHPS);

    await par(c.say('Bir gönyenin dik köşesi P; karşısındaki kenar RS, hipotenüs.', { speak: 'Bir gönyenin dik köşesi P; karşısındaki kenar R S, hipotenüs.' }), (async () => {
      await belir(c, [prs.g, dikP], 500); await vurgula(c, [hRS], 1100);
    })());
    ph.style.opacity = 1;
    await par(c.say('P’den RS’ye dik bir çizgi indirelim: PH.', { speak: '[curious] P’den R S’ye dik bir çizgi indirelim: P H.' }), (async () => {
      await c.tween(800, (e) => koy(ph, P, ara(P, H, e)));
      await par(belir(c, dikH, 350), belir(c, hH, 350));
    })());
    await par(c.say('PH bir yüksekliktir; H, RS üzerindedir.', { speak: 'P H bir yüksekliktir; H, R S üzerindedir.' }), nab(c, [ph], 5, 900));
    await par(c.say('PH gönyeyi iki küçük dik üçgene ayırdı: PRH ve PHS.', { speak: 'P H gönyeyi iki küçük dik üçgene ayırdı: P R H ve P H S.' }), (async () => {
      await belir(c, fRH.g, 450); await c.wait(300); await belir(c, fHS.g, 450);
    })());
    await par(c.say('PRS’de R açısına a, S açısına b diyelim.', { speak: 'P R S’de R açısına a, S açısına b diyelim.' }), (async () => {
      await par(belir(c, aR, 400), belir(c, lA, 400)); await c.wait(300); await par(belir(c, aS, 400), belir(c, lB, 400));
    })());
    await par(c.say('Dik üçgende iki dar açının toplamı 90°: a + b = 90°.', { speak: 'Dik üçgende iki dar açının toplamı doksan derece: a artı b eşittir doksan derece.' }), belir(c, eq, 450));
    c.clearSay();

    // Birlikte çöz: PRH.
    const l1 = sag(c, g, 230, ['R açısı = ', ['a', TUR]]), l2 = sag(c, g, 275, ['H açısı = ', ['90°', MAVI]]), l3 = sag(c, g, 320, ['RPH açısı = ?']);
    gizle(l1, l2, l3);
    await par(soluk(c, [fHS.g], 0), soluk(c, [fRH.g], 1), belir(c, [l1, l2, l3, qRPH, lqRPH], 450));
    await goz(c);
    await c.choice({
      tag: 'Birlikte çöz', q: 'PRH üçgeninde R açısı a, H açısı 90°. RPH açısı kaçtır?', options: ['a', 'b', '90°'], answer: 1,
      hints: ['İç açılar toplamı 180°: a + 90° + ? = 180°.', '', 'a + b = 90° olduğundan 90° − a = b.'],
      right: 'Evet. Kalan açı b.',
    });
    parcaKoy(c, l3, ['RPH açısı = ', ['b', YES]]);
    await par(degis(c, [qRPH, lqRPH], [bRPH, lbRPH]), soluk(c, [fRH.g], 0.3));
    await c.say('Kalan açı 90° − a, yani b.', { speak: 'Kalan açı doksan eksi a, yani b.' });
    c.clearSay();

    // Sıra sende: PHS.
    const m1 = sag(c, g, 230, ['S açısı = ', ['b', YES]]), m2 = sag(c, g, 275, ['H açısı = ', ['90°', MAVI]]), m3 = sag(c, g, 320, ['HPS açısı = ?']);
    gizle(m1, m2, m3);
    await par(belir(c, [l1, l2, l3], 350, 0), soluk(c, [fRH.g], 0.12), soluk(c, [fHS.g], 0.3));
    await par(belir(c, [m1, m2, m3, qHPS, lqHPS], 450), soluk(c, [fHS.g], 1));
    await goz(c);
    await c.choice({
      tag: 'Sıra sende', q: 'PHS üçgeninde S açısı b, H açısı 90°. HPS açısı kaçtır?', options: ['b', '90°', 'a'], answer: 2,
      hints: ['Yine iç açılar toplamı: b + 90° + ? = 180°.', '90° − b = a, çünkü a + b = 90°.', ''],
      right: 'Evet. Kalan açı a.',
    });
    parcaKoy(c, m3, ['HPS açısı = ', ['a', TUR]]);
    await degis(c, [qHPS, lqHPS], [aHPS, laHPS]);
    await c.say('Kalan açı 90° − b, yani a.', { speak: 'Kalan açı doksan eksi b, yani a.' });
    c.clearSay();
    await par(belir(c, [m1, m2, m3], 350, 0), soluk(c, [fRH.g, fHS.g], 0.3));
    await par(c.say('Üç üçgenin açıları da a, b ve 90°.', { speak: 'Üç üçgenin açıları da a, b ve doksan derece.' }), nab(c, [ph], 5, 700));
  }

  /* ---- 3. Üç benzer üçgen ---- */
  /* Üç dik üçgen yan yana: büyük olan ayakta, küçük ikisi kesilmiş duruşta; kesilip çevrilir, döndürülür, ayakta duruşa oturur. */
  async function uc(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const s = 15, yb = 320;
    const PR = Math.hypot(4, 6), PS = Math.hypot(9, 6);
    /* Ayakta duruş: [dik köşe, a köşesi (solda), b köşesi (sağda)]; da: a köşesine komşu dik kenar, db: öteki dik kenar, L: hipotenüs (birim). */
    const ayakta = (x0, da, db, L) => [[x0 + (da * da / L) * s, yb - (da * db / L) * s], [x0, yb], [x0 + L * s, yb]];
    const Tb = ayakta(32, PR, PS, 13);                   // [P, R, S]
    const T1 = ayakta(305, 4, 6, PR);                    // [H, R, P]
    const T2 = ayakta(305 + PR * s + 80, 6, 9, PS);      // [H, P, S]
    const kes = (goreli, T) => { const cx = agirlik(T)[0], cg = goreli.reduce((a, q) => a + q[0], 0) / 3; return goreli.map((q) => [q[0] + cx - cg, yb + q[1]]); };
    const S1 = kes([[4 * s, 0], [0, 0], [4 * s, -6 * s]], T1);   // [H, R, P]: PRH, asıl şekildeki duruşu
    const S2 = kes([[0, 0], [0, -6 * s], [9 * s, 0]], T2);       // [H, P, S]: PHS
    const kopa = [0, -55];
    const opt = { dik: 0, yayR: 24, aralik: 6, w: 5 };
    const tamam = (k) => { k.kenarK.forEach((e) => e.remove()); k.yayK.forEach((e) => e.remove()); return k; };

    const gB = c.S('g', {}, g);
    const big = cokgen(c, gB, Tb, RENK.cizgi, { harf: ['P', 'R', 'S'], dolgu: 0.12 });
    const kB = tamam(C.ortakKose(c, gB, Tb, Tb, { ...opt, yayR: 28 }));
    const ct1 = C.cevirTasi(c, g, S1, T1, RENK.cizgi, { kopar: kopa, harf: ['H', 'R', 'P'], dolgu: 0.12 });
    const tg1 = c.S('g', {}, g), k1 = tamam(C.ortakKose(c, tg1, S1, S1, opt));
    const ct2 = C.cevirTasi(c, g, S2, T2, RENK.cizgi, { kopar: kopa, harf: ['H', 'P', 'S'], dolgu: 0.12 });
    const tg2 = c.S('g', {}, g), k2 = tamam(C.ortakKose(c, tg2, S2, S2, opt));
    [big, ct1.cok, ct2.cok].forEach((t) => t.adlar.forEach((a) => { a.style.fill = RENK.yazi; }));

    /* Gruptaki işaretler, parçayla birlikte aynı dönüşümle (ters çevirme, dönme, taşıma) hareket eder. */
    const eslestir = (tg, S0, T0, ct) => {
      const Cs = agirlik(S0), Ct = agirlik(T0), d = ct.donus(), teta = rad(d.aci);
      return (k, f, r, u) => {
        const K0 = [Cs[0] + kopa[0] * k, Cs[1] + kopa[1] * k], Cp = ara(K0, Ct, u), sc = 1 + (d.olcek - 1) * u, m = 1 - 2 * f, th = teta * r;
        const a = sc * Math.cos(th), b = sc * Math.sin(th), c2 = -sc * m * Math.sin(th), d2 = sc * m * Math.cos(th);
        tg.setAttribute('transform', 'matrix(' + [a, b, c2, d2, Cp[0] - (a * Cs[0] + c2 * Cs[1]), Cp[1] - (b * Cs[0] + d2 * Cs[1])].join(' ') + ')');
      };
    };
    const uy1 = eslestir(tg1, S1, T1, ct1), uy2 = eslestir(tg2, S2, T2, ct2);
    const isler = [{ ct: ct1, uyg: uy1 }, { ct: ct2, uyg: uy2 }];
    const oyna = async (ms = 800) => {
      const st = [0, 0, 0, 0];
      for (let i = 0; i < 4; i++) {
        const gerek = i === 1 ? isler.some(({ ct }) => ct.donus().yansima) : i === 2 ? isler.some(({ ct }) => Math.abs(ct.donus().aci) > 0.5) : true;
        if (!gerek) continue;
        await c.tween(ms, (e) => { st[i] = e; isler.forEach(({ ct, uyg }) => { ct.durum(st[0], st[1], st[2], st[3]); uyg(st[0], st[1], st[2], st[3]); }); }, Ders.ease.inOut);
        await goz(c);
      }
    };

    const yaylarHepsi = duz(kB.yayB, k1.yayB, k2.yayB), kenarlar = duz(kB.kenarB, k1.kenarB, k2.kenarB);
    const renkYay = (i) => [kB.yayB[i], k1.yayB[i], k2.yayB[i]];
    const renkKenar = (i) => [kB.kenarB[i], k1.kenarB[i], k2.kenarB[i]];
    const yayNab = (i, ms = 800) => c.tween(ms, (e) => renkYay(i).forEach((gr) => [...gr.querySelectorAll('path')].forEach((y) => y.setAttribute('stroke-width', 3 + 3.5 * Math.sin(Math.PI * e)))));
    const adlar = renkli(c, g, 344, 410, [['P', MAVI], ['R', TUR], ['S', YES], ' ~ ', ['H', MAVI], ['R', TUR], ['P', YES]], { size: 30, kalin: 700 });
    const tb = C.tablo(c, g, {
      x: TX, y: 190, adim: 56, kolon: [0, 85, 160, 235],
      satir: [['PRS', ['RS', MAVI], ['PS', TUR], ['PR', YES]], ['PRH', ['PR', MAVI], ['PH', TUR], ['?', RENK.soluk]], ['PHS', ['PS', MAVI], ['HS', TUR], ['?', RENK.soluk]]],
    });
    gizle(yaylarHepsi, kenarlar, adlar, g);
    await par(c.say('İki açısı eşit olan üçgenler benzerdir: Açı-Açı.'), belir(c, g, 600));
    await par(c.say('Üç üçgenin açıları a, b ve 90°: üçü de benzer.', { speak: 'Üç üçgenin açıları a, b ve doksan derece: üçü de benzer.' }), belir(c, yaylarHepsi, 500));
    await par(c.say('Küçük iki üçgeni kesip ters çevirelim ve büyükle aynı duruşa getirelim.'), (async () => {
      await oyna(800);
      await belir(c, [ct1.hayalet.g, ct2.hayalet.g], 400, 0);
    })());
    await par(c.say('Hepsinde a solda, b sağda, dik açı üstte.'), (async () => { for (let i = 0; i < 3; i++) await yayNab(i, 600); })());
    await par(c.say('Benzerliği yazarken eşit açılar aynı sırada yazılır.'), (async () => { for (let i = 0; i < 3; i++) await yayNab(i, 600); })());
    await par(c.say('PRS ~ HRP: P–H, R–R, S–P karşılıklıdır.', { speak: 'P R S, H R P’ye benzerdir: P ile H, R ile R, S ile P karşılıklıdır.' }), belir(c, adlar, 500));
    await par(c.say('Her kenar karşısındaki açının rengini alır.'), belir(c, kenarlar, 600));
    await par(c.say('Hipotenüs dik açının karşısında: mavi.'), nab(c, renkKenar(0), 5, 900));
    await par(c.say('a’nın karşısındaki kenar turuncu, b’nin karşısındaki yeşil.'), (async () => {
      await nab(c, renkKenar(1), 5, 800); await nab(c, renkKenar(2), 5, 800);
      for (let i = 0; i < 3; i++) { await tb.goster(i, 300); await c.wait(150); }
    })());
    c.clearSay();

    // Birlikte çöz: PRH'de yeşil kenar.
    const BIG = [gB], U1 = [ct1.g, tg1], U2 = [ct2.g, tg2];
    await par(soluk(c, BIG, 0.25), soluk(c, U2, 0.25));
    await goz(c);
    await c.choice({
      tag: 'Birlikte çöz', q: 'PRH’de yeşil kenar hangisidir?', options: ['PH', 'PR', 'RH'], answer: 2,
      hints: ['PRH’de PH turuncu; yeşil başka bir kenar.', 'PR hipotenüs, yani mavi.', ''],
      right: 'Evet. RH yeşil.',
    });
    tb.hucre(1, 3, 'RH', YES);
    await par(c.say('PRH’de b açısı P’de; karşısı RH, yeşil.', { speak: 'P R H’de b açısı P’de; karşısı R H, yeşil.' }), nab(c, k1.kenarB[2], 5, 900));
    c.clearSay();

    // Sıra sende: PHS'de yeşil kenar.
    await par(soluk(c, U1, 0.25), soluk(c, U2, 1));
    await goz(c);
    await c.choice({
      tag: 'Sıra sende', q: 'PHS’de yeşil kenar hangisidir?', options: ['PH', 'HS', 'PS'], answer: 0,
      hints: ['', 'HS, a açısının karşısındadır; turuncu.', 'PS hipotenüs, yani mavi.'],
      right: 'Evet. PH yeşil.',
    });
    tb.hucre(2, 3, 'PH', YES);
    await par(c.say('PHS’de b açısı S’de; karşısı PH, yeşil.', { speak: 'P H S’de b açısı S’de; karşısı P H, yeşil.' }), nab(c, k2.kenarB[2], 5, 900));
    c.clearSay();
    await soluk(c, [BIG, U1, U2], 1, 350);
    await par(c.say('PH, bir üçgende turuncu, ötekinde yeşildir.', { speak: 'P H, bir üçgende turuncu, ötekinde yeşildir.' }), par(nab(c, k1.kenarB[1], 5, 1000), nab(c, k2.kenarB[2], 5, 1000)));
    await c.say('Benzer üçgenlerde aynı renkli kenarlar karşılıklıdır.');
    await par(c.say('Böylece üç benzerliği yazarız: PRS ~ HRP ~ HPS.', { speak: 'Böylece üç benzerliği yazarız: P R S, H R P’ye, H R P de H P S’ye benzerdir.' }), (async () => {
      parcaKoy(c, adlar, [['P', MAVI], ['R', TUR], ['S', YES], ' ~ ', ['H', MAVI], ['R', TUR], ['P', YES], ' ~ ', ['H', MAVI], ['P', TUR], ['S', YES]]);
      await c.wait(500);
    })());
    c.note('<b>Dik köşeden inen yükseklik:</b> üç benzer üçgen. PRS ~ HRP ~ HPS.', 'Üç benzer üçgen', 'c3-uc-benzer');
  }

  /* ---- 4. Köprü halatları ---- */
  function kopruCiz(c, g, z) {
    const R = z.P(1, 10), H = z.P(5, 10), S = z.P(14, 10), P = z.P(5, 4);
    const zem = cizgi(c, g, R, S, RENK.cizgi, 4);
    const hPR = cizgi(c, g, P, R, RENK.yazi, 5), hPS = cizgi(c, g, P, S, RENK.yazi, 5);
    const kule = cizgi(c, g, P, H, SARI, 5);
    const dikP = aciYayi(c, g, P, R, S, MAVI, 48, { dik: true });
    const dikH = c.S('g', {}, g); aciYayi(c, dikH, H, P, S, MAVI, 30, { dik: true }); aciYayi(c, dikH, H, P, R, MAVI, 30, { dik: true });
    const hP = harf(c, g, P, 'P', 0, -18), hR = harf(c, g, R, 'R', -6, 36), hH = harf(c, g, H, 'H', 0, 36), hS = harf(c, g, S, 'S', 6, 36);
    const d40 = yazi(c, g, (R[0] + H[0]) / 2, 494, '40 m', { size: 24, kalin: 700 }), d90 = yazi(c, g, (H[0] + S[0]) / 2, 494, '90 m', { size: 24, kalin: 700 });
    return { R, H, S, P, zem, hPR, hPS, kule, dikP, dikH, hP, hR, hH, hS, d40, d90 };
  }

  async function kopru(c) {
    const svg = c.svg(1000, 562), z = zemin(c, svg), g = c.S('g', {}, svg);
    const k = kopruCiz(c, g, z), { R, H, S, P } = k;
    const fPRS = ucAcik(c, g, [P, R, S], RENK.cizgi, 0.12), fPRH = ucAcik(c, g, [P, R, H], RENK.cizgi, 0.3), fPHS = ucAcik(c, g, [P, H, S], RENK.cizgi, 0.12);
    const ph = yazi(c, g, H[0] + 16, 345, 'PH = ?', { size: 24, kalin: 700, renk: SARI, hiza: 'start' });
    const oRH = [cizgi(c, g, P, R, MAVI, 8), cizgi(c, g, P, H, TUR, 8), cizgi(c, g, R, H, YES, 8)];
    const oHS = [cizgi(c, g, P, S, MAVI, 8), cizgi(c, g, H, S, TUR, 8), cizgi(c, g, P, H, YES, 8)];
    const e1 = sag(c, g, 150, [['turuncu', TUR], ' / ', ['yeşil', YES]], 25), e2 = sag(c, g, 200, ['=']), e3 = sag(c, g, 250, [['turuncu', TUR], ' / ', ['yeşil', YES]], 25);
    const f1 = sag(c, g, 150, [['|PH|', TUR], '/', ['|RH|', YES], ' = ', ['|HS|', TUR], '/', ['|PH|', YES]], 22);
    const f2 = sag(c, g, 200, [['|PH|', TUR], '/40 = 90/', ['|PH|', YES]], 22);
    const f3 = sag(c, g, 150, ['|PH| × |PH| = 40 × 90'], 22), f4 = sag(c, g, 200, ['= 3600'], 22);
    const f5 = sag(c, g, 150, ['60 × 60 = 3600'], 25), f6 = sag(c, g, 200, [['|PH| = 60 m', RENK.iyi]], 25);
    gizle(k.zem, k.hPR, k.hPS, k.kule, k.dikP, k.dikH, k.hP, k.hR, k.hH, k.hS, k.d40, k.d90, fPRS.g, fPRH.g, fPHS.g, ph, oRH, oHS, e1, e2, e3, f1, f2, f3, f4, f5, f6);

    await par(c.say('Bir köprünün iki halatı P noktasında dik açı yapar.'), belir(c, [k.zem, k.hPR, k.hPS, k.dikP, k.hP, k.hR, k.hS], 600));
    await par(c.say('Halatlar PR ve PS; P’den yere inen dikme PH.', { speak: 'Halatlar P R ve P S; P’den yere inen dikme P H.' }), belir(c, [k.kule, k.dikH, k.hH], 600));
    await par(c.say('R ile H arası 40 m, H ile S arası 90 m.', { speak: 'R ile H arası kırk metre, H ile S arası doksan metre.' }), belir(c, [k.d40, k.d90], 500));
    await par(c.say('PRS bir dik üçgen, PH de yüksekliğidir.', { speak: 'P R S bir dik üçgen, P H de yüksekliğidir.' }), par(belir(c, fPRS.g, 500), belir(c, ph, 500)));
    await par(c.say('Öyleyse PRH ile PHS benzerdir.', { speak: 'Öyleyse P R H ile P H S benzerdir.' }), par(belir(c, fPRS.g, 400, 0), belir(c, [fPRH.g, fPHS.g], 500)));
    await par(c.say('PRH’de PH turuncu, RH yeşildir.', { speak: 'P R H’de P H turuncu, R H yeşildir.' }), belir(c, oRH, 500));
    await par(c.say('PHS’de HS turuncu, PH yeşildir.', { speak: 'P H S’de H S turuncu, P H yeşildir.' }), par(belir(c, oRH, 400, 0), belir(c, oHS, 500)));
    await par(c.say('Turuncu bölü yeşil oranı iki üçgende eşittir.'), par(belir(c, oHS, 400, 0), belir(c, [e1, e2, e3], 450)));
    await par(c.say('|PH|/|RH| = |HS|/|PH|; yani |PH|/40 = 90/|PH|.', { speak: 'P H uzunluğu bölü R H uzunluğu eşittir H S uzunluğu bölü P H uzunluğu; yani P H uzunluğu bölü kırk eşittir doksan bölü P H uzunluğu.' }), (async () => {
      await belir(c, [e1, e2, e3], 300, 0); await belir(c, f1, 400); await c.wait(300); await belir(c, f2, 400);
    })());
    await par(c.say('|PH| × |PH| = 40 × 90 = 3600.', { speak: 'P H uzunluğu çarpı P H uzunluğu eşittir kırk çarpı doksan eşittir üç bin altı yüz.' }), (async () => {
      await belir(c, [f1, f2], 300, 0); await belir(c, f3, 400); await c.wait(300); await belir(c, f4, 400);
    })());
    await par(c.say('60 × 60 = 3600: |PH| = 60 m.', { speak: 'altmış çarpı altmış eşittir üç bin altı yüz: P H uzunluğu altmış metre.' }), (async () => {
      await belir(c, [f3, f4], 300, 0); await belir(c, f5, 400); cevapla(ph, 'PH = 60 m'); await c.wait(300); await belir(c, f6, 400);
    })());
    c.clearSay();
    await sil(c, g, 350);

    // Birlikte çöz: |KN| = 1 m, |NM| = 9 m.
    const g2 = c.S('g', {}, svg);
    const K = z.P(1, 9), N = z.P(2, 9), M = z.P(11, 9), L = z.P(2, 6);
    cizgi(c, g2, K, M, RENK.cizgi, 4);
    cizgi(c, g2, K, L, RENK.yazi, 5); cizgi(c, g2, L, M, RENK.yazi, 5);
    cizgi(c, g2, L, N, SARI, 5);
    cizgi(c, g2, K, N, YES, 8); cizgi(c, g2, N, M, TUR, 8);
    aciYayi(c, g2, L, K, M, MAVI, 44, { dik: true });
    aciYayi(c, g2, N, L, M, MAVI, 26, { dik: true }); aciYayi(c, g2, N, L, K, MAVI, 26, { dik: true });
    harf(c, g2, K, 'K', -8, 36); harf(c, g2, N, 'N', 6, 36); harf(c, g2, M, 'M', 8, 36); harf(c, g2, L, 'L', 0, -16);
    yazi(c, g2, (K[0] + N[0]) / 2, 482, '1 m', { size: 24, kalin: 700, renk: YES });
    yazi(c, g2, (N[0] + M[0]) / 2, 482, '9 m', { size: 24, kalin: 700, renk: TUR });
    sag(c, g2, 140, ['KLN: ', ['LN', TUR], ', ', ['KN', YES]]);
    sag(c, g2, 185, ['LNM: ', ['NM', TUR], ', ', ['LN', YES]]);
    sag(c, g2, 245, [['|LN|', TUR], '/', ['|KN|', YES], ' = ', ['|NM|', TUR], '/', ['|LN|', YES]], 22);
    sag(c, g2, 290, ['|LN|/1 = 9/|LN|'], 22);
    const son = sag(c, g2, 335, ['|LN| × |LN| = 9'], 22);
    gizle(g2); await belir(c, g2, 450);
    await goz(c);
    await c.choice({
      tag: 'Birlikte çöz', q: '|KN| = 1 m ve |NM| = 9 m. |LN| kaç metredir?', options: ['5 m', '3 m', '9 m'], answer: 1,
      hints: ['5, 1 ile 9’un ortası; burada çarpım aranıyor.', '', 'Hangi sayıyı kendisiyle çarpınca 9 olur?'],
      right: 'Evet. 3 × 3 = 9.',
    });
    parcaKoy(c, son, [['|LN| = 3 m', RENK.iyi]]);
    await c.say('3 × 3 = 9 olduğundan |LN| = 3 m.', { speak: 'üç çarpı üç eşittir dokuz olduğundan L N uzunluğu üç metre.' });
    c.clearSay();
    await sil(c, g2, 350);

    // Sıra sende: |RH| = 2 m, |PH| = 4 m.
    const g3 = c.S('g', {}, svg);
    const R3 = z.P(2, 9), H3 = z.P(4, 9), S3 = z.P(12, 9), P3 = z.P(4, 5);
    cizgi(c, g3, R3, S3, RENK.cizgi, 4);
    cizgi(c, g3, P3, R3, RENK.yazi, 5); cizgi(c, g3, P3, S3, RENK.yazi, 5);
    cizgi(c, g3, P3, H3, SARI, 5);
    aciYayi(c, g3, P3, R3, S3, MAVI, 44, { dik: true });
    aciYayi(c, g3, H3, P3, S3, MAVI, 26, { dik: true }); aciYayi(c, g3, H3, P3, R3, MAVI, 26, { dik: true });
    harf(c, g3, P3, 'P', 0, -16); harf(c, g3, R3, 'R', -8, 36); harf(c, g3, H3, 'H', 0, 36); harf(c, g3, S3, 'S', 8, 36);
    sag(c, g3, 150, ['|RH| = 2 m']); sag(c, g3, 200, ['|PH| = 4 m']);
    const sorH = sag(c, g3, 250, ['|HS| = ?']);
    gizle(g3); await belir(c, g3, 450);
    await goz(c);
    await c.choice({
      tag: 'Sıra sende', q: 'Başka bir köprüde |RH| = 2 m ve |PH| = 4 m. |HS| kaç metredir?', options: ['6 m', '2 m', '8 m'], answer: 2,
      hints: ['Turuncu bölü yeşil: PRH’de 4/2, PHS’de |HS|/4.', '4/2 = |HS|/4 olduğundan |HS| = 2 × 4.', ''],
      right: 'Evet. 8 m.',
    });
    parcaKoy(c, sorH, [['|HS| = 8 m', RENK.iyi]]);
    const oran = sag(c, g3, 310, [['4', TUR], '/', ['2', YES], ' = ', ['8', TUR], '/', ['4', YES], ' = 2']);
    gizle(oran);
    await par(c.say('4/2 = 8/4 = 2: oranlar eşit, |HS| = 8 m.', { speak: 'dört bölü iki eşittir sekiz bölü dört eşittir iki: oranlar eşit, H S uzunluğu sekiz metre.' }), belir(c, oran, 450));
    await c.say('Üç benzer üçgen, bilinmeyen uzunluğu bulmamızı sağlar.');
    c.note('<b>Turuncu/yeşil eşit:</b> |PH|/40 = 90/|PH|; |PH| = 60.', 'Oran kur', 'c3-oran-kur');
  }

  /* ---- 5. a değişirse ---- */
  async function degisir(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const AC = [20, 30, 45, 60, 70], RHd = ['11,5', '9,8', '6,5', '3,3', '1,5'], HSd = ['1,5', '3,3', '6,5', '9,8', '11,5'];
    const s1 = 30, R0 = [60, 260], S0 = [60 + 13 * s1, 260], s2 = 17, yb = 505;
    const gM = c.S('g', {}, g), gH = c.S('g', {}, g), gT = c.S('g', {}, g), gR = c.S('g', {}, g);
    const prs = cokgen(c, gM, [R0, R0, S0], MAVI, { harf: ['P', 'R', 'S'], dolgu: 0.08 });
    const dinM = c.S('g', {}, gM);
    const ph = cizgi(c, gH, R0, R0, SARI, 5), dinH = c.S('g', {}, gH), hH = harf(c, gH, R0, 'H', 0, 0);
    const dinT = c.S('g', {}, gT);
    const t1 = sag(c, gR, 170, ['a'], 25), t2 = sag(c, gR, 215, ['b'], 25), t3 = sag(c, gR, 280, ['|RH|'], 25), t4 = sag(c, gR, 325, ['|HS|'], 25), t5 = sag(c, gR, 400, ['eş değil'], 28);
    const ayakta = (x0, da, db, L) => [[x0 + (da * da / L) * s2, yb - (da * db / L) * s2], [x0, yb], [x0 + L * s2, yb]];
    const ayarla = (v) => {
      const i = +v - 1, a = rad(AC[i]), cs = Math.cos(a), sn = Math.sin(a);
      const P = [R0[0] + 13 * s1 * cs * cs, R0[1] - 13 * s1 * sn * cs], H = [P[0], R0[1]];
      prs.koy([P, R0, S0]); koy(ph, P, H); hH.setAttribute('x', H[0]); hH.setAttribute('y', H[1] + 36);
      temizle(dinM); temizle(dinH);
      aciYayi(c, dinM, P, R0, S0, MAVI, 26, { dik: true });
      for (let k = 0; k < 2; k++) aciYayi(c, dinM, R0, P, S0, TUR, 32 + k * 6);
      for (let k = 0; k < 3; k++) aciYayi(c, dinM, S0, P, R0, YES, 32 + k * 6);
      aciYayi(c, dinH, H, P, S0, MAVI, 22, { dik: true }); aciYayi(c, dinH, H, P, R0, MAVI, 22, { dik: true });
      // Ayakta üç üçgen: aynı duruş, hipotenüs altta.
      temizle(dinT);
      const cosA = cs, sinA = sn;
      const Tb = ayakta(40, 13 * cosA, 13 * sinA, 13);
      const T1 = ayakta(290, 13 * cs * cs, 13 * sn * cs, 13 * cosA);
      const T2 = ayakta(290 + 13 * cosA * s2 + 30, 13 * sn * cs, 13 * sn * sn, 13 * sinA);
      const ik = { dik: 0, yayR: 16, aralik: 4, w: 4 };
      [[Tb, 28, 'PRS'], [T1, 16, 'PRH'], [T2, 16, 'PHS']].forEach(([T, r, ad]) => {
        cokgen(c, dinT, T, RENK.cizgi, { dolgu: 0.12 });
        const kk = C.ortakKose(c, dinT, T, T, { ...ik, yayR: r });
        kk.kenarK.forEach((e) => e.remove()); kk.yayK.forEach((e) => e.remove());
        yazi(c, dinT, (T[1][0] + T[2][0]) / 2, 545, ad, { size: 24, kalin: 700 });
      });
      if (i === 2) {
        const dx = T2[1][0] - T1[1][0];
        c.S('polygon', { points: T1.map((q) => (q[0] + dx).toFixed(1) + ',' + q[1].toFixed(1)).join(' '), fill: 'none', stroke: RENK.iyi, 'stroke-width': 4, 'stroke-dasharray': '9 7', 'stroke-linejoin': 'round' }, dinT);
      }
      parcaKoy(c, t1, [['a', TUR], ' = ' + AC[i] + '°']);
      parcaKoy(c, t2, [['90° − a', YES], ' = ' + (90 - AC[i]) + '°']);
      parcaKoy(c, t3, ['|RH| = ' + RHd[i]]);
      parcaKoy(c, t4, ['|HS| = ' + HSd[i]]);
      parcaKoy(c, t5, i === 2 ? [['eş', RENK.iyi]] : [['eş değil', RENK.soluk]]);
    };
    ayarla(2);
    gizle(gM, gH, gT, gR);

    await par(c.say('Dik açı yerinde kalsın, a açısını değiştirelim.'), belir(c, gM, 600));
    await par(c.say('Yükseklik yine hipotenüse iner.'), belir(c, gH, 600));
    await par(c.say('Üç üçgenin açılarına ve küçük iki üçgenin boyuna bakalım.', { speak: '[curious] Üç üçgenin açılarına ve küçük iki üçgenin boyuna bakalım.' }), par(belir(c, gT, 600), belir(c, gR, 600)));
    await c.say('a’yı değiştir; açılara ve küçük üçgenlerin boyuna bak.', { noWait: true });
    const sl = c.slider({ label: 'a açısı', min: 1, max: 5, step: 1, value: 2, fmt: (v) => AC[+v - 1] + '°', onInput: ayarla });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    ayarla(2);
    await c.say('a açısı ne olursa olsun üç üçgen benzerdir.');
    ayarla(3);
    await c.say('Yalnızca a = 45° iken küçük üçgenler eştir.', { speak: '[thoughtful] Yalnızca a eşittir kırk beş derece iken küçük üçgenler eştir.' });
    ayarla(4);
    await c.say('Başka açılarda küçük üçgenler benzerdir, eş değildir.');
    c.clearSay();
    await sil(c, g, 350);

    // Sıra sende: PRH ile PHS eş mi?
    const g2 = c.S('g', {}, svg), zz = zemin(c, g2);
    const k = kopruCiz(c, g2, zz), { R, H, S, P } = k;
    const phE = sag(c, g2, 150, [['|PH| = 60 m', SARI]]);
    gizle(g2); await belir(c, g2, 450);
    await goz(c);
    await c.choice({
      tag: 'Sıra sende', q: 'Köprüde |RH| = 40 m, |HS| = 90 m ve |PH| = 60 m. PRH ile PHS için hangisi doğrudur?',
      options: ['Benzerdir; eş değildir', 'Eştir; PH ortak kenardır', 'Benzer değildir; kenarları farklıdır'], answer: 0,
      hints: ['', 'Ortak kenar tek başına eşlik vermez; benzerlik oranı 3/2.', 'Açıları aynı: benzerdir. Kenarlar 40 ile 90, 60 ile 40: aynı değil.'],
      right: 'Evet. Açılar aynı, kenarlar farklı.',
    });
    // PRH: [H, R, P] (dik, a, b) → PHS'nin H köşesine, kenarları PHS'nin kenarları boyunca oturur.
    const S1 = [H, R, P], T1 = [H, [H[0], H[1] - 4 * 40], [H[0] + 6 * 40, H[1]]];
    const tasan = ucAcik(c, g2, [P, S, T1[2], T1[1]], RENK.soluk, 0.4); gizle(tasan.g);
    const ct = C.cevirTasi(c, g2, S1, T1, TUR, { kopar: [0, -60], dolgu: 0.3 });
    const oran = sag(c, g2, 200, ['oran 3/2']); gizle(oran);
    await par(c.say('PRH, PHS’nin içine sığıyor; taşan kısım var: eş değil.', { speak: 'P R H, P H S’nin içine sığıyor; taşan kısım var: eş değil.' }), (async () => {
      await ct.hepsi(700); await belir(c, tasan.g, 500);
    })());
    await par(c.say('Benzerlik oranı 3/2.', { speak: 'Benzerlik oranı ikide üç.' }), belir(c, oran, 450));
    c.note('<b>Küçük üçgenler</b> benzerdir; eş olmaları gerekmez.', 'Küçük üçgenler', 'c3-kucuk-ucgenler');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-c3', kicker: 'Konu C · Benzer üçgenler oluşturma', title: 'Dik köşeden inen yükseklik üç benzer üçgen verir', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Dik köşeden inen yükseklik üç benzer üçgen verir',
      hook: 'Bir gönyeyi dik köşesinden karşı kenara <b>dik bir çizgiyle</b> kesersen çıkan iki parça gönyeyle aynı biçimde midir?',
      button: 'Derse başla ›',
    },
    goals: ['Dik köşeden hipotenüse inen yüksekliğin üç dik üçgen oluşturduğunu söyler.', 'Üç üçgenin açılarının a, b ve 90° olduğunu ve üçünün benzer olduğunu gösterir.', 'Aynı renkli kenarları eşleyip oran kurarak bilinmeyen uzunluğu bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Açı-Açı koşulunu ve dik üçgenin dar açılarını hatırla.', run: hatirla },
      { title: 'Gönyeyi kes', goal: 'Yükseklik gönyeyi iki küçük dik üçgene ayırır; açılar a, b ve 90°.', run: gonye },
      { title: 'Üç benzer üçgen', goal: 'Üç üçgeni aynı duruşa getir; aynı renkli kenarlar karşılıklıdır.', run: uc },
      { title: 'Köprü halatları', goal: 'Üç benzer üçgenle bilinmeyen uzunluğu bul.', run: kopru },
      { title: 'a değişirse', goal: 'Açı değişse de üç üçgen benzerdir; küçükler yalnızca 45° iken eştir.', run: degisir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Dik üçgende dik köşeden hipotenüse yükseklik çizildi. Oluşan iki küçük dik üçgen için hangisi doğrudur?',
        options: ['Birbirine eştir', 'Birbirine ve ilk üçgene benzerdir', 'Yalnızca ilk üçgene benzerdir'], answer: 1,
        why: ['Küçük üçgenlerin açıları aynıdır ama boyları farklı olabilir; eş olmaları gerekmez.', 'Üç üçgenin açıları da a, b ve 90°; Açı-Açı ile üçü de benzerdir.', 'İki küçük üçgenin açıları da a, b ve 90°; birbirlerine de benzerler.'],
        scene: 2,
      },
      {
        q: 'Bir dik üçgenin dar açılarından biri 35°. Yüksekliğin ayırdığı iki küçük üçgenin dar açıları kaç derecedir?',
        options: ['35° ve 35°', '45° ve 45°', '35° ve 55°'], answer: 2,
        why: ['Dar açılar 35° ve 35° olsaydı açılar toplamı 35° + 35° + 90° = 160° olurdu; 180° etmez.', 'Dar açılardan biri 35° olduğundan 45° ve 45° olamaz.', 'Öbür dar açı 90° − 35° = 55°; küçük üçgenlerin her biri 35°, 55° ve 90° taşır.'],
        scene: 1,
      },
      {
        q: 'PRS ~ HRP yazılmıştır. RS kenarının karşılığı hangisidir?',
        options: ['RP', 'HR', 'HP'], answer: 0,
        why: ['R–R ve S–P karşılıklı olduğundan RS’nin karşılığı RP’dir.', 'HR, PR kenarının karşılığıdır (P–H, R–R); RS’nin karşılığı değil.', 'HP, PS kenarının karşılığıdır (P–H, S–P); RS’nin karşılığı değil.'],
        scene: 2,
      },
      {
        q: 'KLM dik üçgeninde L’de dik açı var; LN, KM’ye dik; |KN| = 1 cm, |NM| = 4 cm. |LN| kaç cm’dir?',
        options: ['4 cm', '2 cm', '2,5 cm'], answer: 1,
        why: ['4 cm, |NM| uzunluğudur; |LN| × |LN| = 1 × 4 = 4 olduğundan |LN| = 2 cm.', 'KLN ile LNM benzer: |LN|/1 = 4/|LN|, yani |LN| × |LN| = 4 ve |LN| = 2 cm.', '2,5 cm, 1 ile 4’ün ortasıdır; burada çarpım aranıyor: |LN| × |LN| = 4.'],
        scene: 3,
      },
      {
        q: 'Bir dik üçgende dik köşeden hipotenüse inen yükseklik 6 cm; hipotenüsün parçalarından biri 4 cm. Öteki parça kaç cm’dir?',
        options: ['2 cm', '10 cm', '9 cm'], answer: 2,
        why: ['2 cm, 6 ile 4’ün farkıdır; fark değil oran kurulur: 6/4 = x/6.', '10 cm, 6 ile 4’ün toplamıdır; oran kurulur: 6/4 = x/6 ve x = 9.', 'İki küçük üçgen benzer: 6/4 = x/6, yani 6 × 6 = 4 × x ve x = 9 cm.'],
        scene: 3,
      },
    ],
    summary: [
      'Dik üçgende dik köşeden inen yükseklik, ilk üçgenle birlikte üç dik üçgen oluşturur.',
      'Üçünün de açıları a, b ve 90°’dir; üçü benzerdir.',
      '<b>Dik köşeden inen yükseklik üç benzer üçgen verir.</b>',
      'Küçük iki üçgen benzerdir; eş olmaları gerekmez.',
    ],
    nextLesson: { href: 'c4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
