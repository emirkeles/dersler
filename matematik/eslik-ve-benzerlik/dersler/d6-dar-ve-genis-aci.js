/* D6 — Açı dik değilse: dar ve geniş açılı üçgenler
   İki kenar sabitken aradaki açı 90°'den büyükse c² > a² + b², küçükse c² < a² + b²; eşitlik yalnızca dik açıda.
   Menteşeli çubuklar (3 ve 4 birim), geniş ve dar açı kuralı, üç üçgen, açıyı kaydırarak deneme.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D6)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, uz, rad, yazi, renkli, parcaKoy, cizgi, gizle, belir, par, cevapla, cokgen, aciYayi, aciIci, agirlik } = window.KIT;
  const D = window.KIT_D;
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez;

  const TX = 706;                                    // sağdaki sütunun sol kenarı
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };
  const virgul = (n) => String(n).replace('.', ',');

  /* Menteşeli çubuklar + yanında kare çubuk grafiği (KIT_D.menteseGrafik) ve kendi yazılarım.
     Aracın 'a, b, c' yazıları yerine 3, 4 ve c yazılır; istenirse A, B, C harfleri de konur (B: 3 birimlik kolun ucu, A: 4 birimlik kolun ucu).
     Araç yalnızca ac(derece) bilir; yazıların yeri her açıda yeniden hesaplanır (yerle). */
  function menteseKur(c, p, V, o = {}) {
    const mg = D.menteseGrafik(c, p, V, 3, 4, Object.assign({ adlar: false, sayilar: true, olcek: 50, aci: 90, gx: 455, gy: 415, gw: 230, gh: 300 }, o.arac || {}));
    const m = mg.mentese;
    const et = { a: yazi(c, mg.g, 0, 0, '3', { size: 26, kalin: 700, renk: MAVI }), b: yazi(c, mg.g, 0, 0, '4', { size: 26, kalin: 700, renk: YESIL }), c: yazi(c, mg.g, 0, 0, 'c', { size: 26, kalin: 700, renk: TURUNCU }) };
    const hf = o.harf ? { A: yazi(c, mg.g, 0, 0, 'A', { size: 26, kalin: 700 }), B: yazi(c, mg.g, 0, 0, 'B', { size: 26, kalin: 700 }), C: yazi(c, mg.g, 0, 0, 'C', { size: 26, kalin: 700 }) } : null;
    const dis = (t, P, Q, M, bos = 10) => {
      const d = uz(P, Q) || 1; let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
      const mid = ara(P, Q, 0.5);
      if ((mid[0] - M[0]) * nx + (mid[1] - M[1]) * ny < 0) { nx = -nx; ny = -ny; }
      let w = 30, h = 26;
      try { const b = t.getBBox(); if (b.width) { w = b.width; h = b.height; } } catch (e) { /* ölçülemezse varsayılan */ }
      const u = bos + (Math.abs(nx) * w) / 2 + (Math.abs(ny) * h) / 2;      // yazının kutusu kenardan bos kadar uzakta
      t.setAttribute('x', mid[0] + nx * u); t.setAttribute('y', mid[1] + ny * u + 9);
    };
    const koseHarf = (t, Q, M, u = 26) => {
      const d = uz(M, Q) || 1;
      t.setAttribute('x', Q[0] + ((Q[0] - M[0]) / d) * u); t.setAttribute('y', Q[1] + ((Q[1] - M[1]) / d) * u + 9);
    };
    /* Aracın açı yazısı geniş açılarda üçgenin üçüncü kenarına ya da yayın üstüne biniyor. Yazı, açıortay üzerinde yayın
       dışında ve üçgenin içinde sığdığı ilk yere konur; sığmıyorsa (130° ve üstü: üçgen çok yassı) köşenin sol altına alınır.
       Her ac çağrısından sonra bir kez çalışır. */
    const icinde = (P, T, mar) => {
      const [A, B, C] = T, sg = Math.sign((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]));
      return [[A, B], [B, C], [C, A]].every(([p1, q1]) => (sg * ((q1[0] - p1[0]) * (P[1] - p1[1]) - (q1[1] - p1[1]) * (P[0] - p1[0]))) / (uz(p1, q1) || 1) >= mar);
    };
    const aciKaydir = () => {
      const e = m.etiket, T = m.uc(), [v, P1, P2] = T;
      let w = 56, h = 18;
      try { const bb = e.getBBox(); if (bb.width) { w = bb.width - 4; h = 18; } } catch (err) { /* ölçülemezse varsayılan */ }
      let yer = null;
      for (let d = 34; d <= 150 && !yer; d += 2) {
        const o = aciIci(v, P1, P2, d);
        const koseler = [[-w / 2, -h / 2], [w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]].map((q) => [o[0] + q[0], o[1] + q[1]]);
        const yakin = Math.hypot(Math.max(Math.abs(o[0] - v[0]) - w / 2, 0), Math.max(Math.abs(o[1] - v[1]) - h / 2, 0));   // yazı kutusunun köşeye en yakın uzaklığı (yay yarıçapı 30)
        if (yakin >= 38 && koseler.every((q) => icinde(q, T, 4))) yer = o;
      }
      if (!yer) yer = [v[0] - w / 2 - (hf ? 26 : 6), v[1] + 28];
      e.setAttribute('x', yer[0]); e.setAttribute('y', yer[1] + 8);
    };
    const yerle = () => {
      const [v, P1, P2] = m.uc(), M = agirlik([v, P1, P2]);
      dis(et.a, v, P1, M); dis(et.b, v, P2, M); dis(et.c, P1, P2, M);
      if (hf) { koseHarf(hf.C, v, M); koseHarf(hf.B, P1, M); koseHarf(hf.A, P2, M); }
    };
    yerle(); aciKaydir();
    const ac = (d) => { mg.ac(d); aciKaydir(); yerle(); };
    const git = (d0, d1, ms = 1200) => c.tween(ms, (e) => ac(d0 + (d1 - d0) * e));
    return { mg, m, et, hf, ac, git, yerle, grafik: mg.grafik.g, kareler: mg.kareler };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');

    // Birinci soru: dik kenarları 5 ve 12 olan dik üçgenin hipotenüsü.
    const g1 = c.S('g', {}, svg);
    const A = [300, 400], Bn = [300, 250], Cn = [660, 400], M1 = agirlik([A, Bn, Cn]);
    cokgen(c, g1, [A, Bn, Cn], MAVI, { dolgu: 0.1 });
    aciYayi(c, g1, A, Bn, Cn, RENK.cizgi, 30, { dik: true });
    D.kenarYazi(c, g1, A, Bn, '5', YESIL, { merkez: M1, size: 28 });
    D.kenarYazi(c, g1, A, Cn, '12', YESIL, { merkez: M1, size: 28 });
    const soru1 = D.kenarYazi(c, g1, Bn, Cn, '?', TURUNCU, { merkez: M1, size: 32, uzak: 38 });
    gizle(g1); await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Dik kenarları 5 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm’dir?',
      options: ['17 cm', '13 cm', '60 cm'], answer: 1,
      hints: ['Pisagor: a² + b² = c²; 25 + 144 = 169, c = 13.', '', 'Pisagor: a² + b² = c²; 25 + 144 = 169, c = 13.'],
      right: 'Evet. 25 + 144 = 169 ve c = 13.',
    });
    c.clearSay();
    cevapla(soru1, '13');
    const e1 = renkli(c, g1, 480, 500, ['25 + 144 = 169'], { size: 32, kalin: 700 }); gizle(e1);
    await par(c.say('Hipotenüsün karesi 25 + 144 = 169; hipotenüs 13.', { speak: 'Hipotenüsün karesi yirmi beş artı yüz kırk dört, eşittir yüz altmış dokuz; hipotenüs on üç.' }), belir(c, e1, 450));
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: hipotenüs 20, dik kenarın hipotenüs üzerindeki parçası 5.
    const g2 = c.S('g', {}, svg), s = 30;
    const Bb = [180, 430], Hh = [Bb[0] + 15 * s, 430], Cc = [Bb[0] + 20 * s, 430], Aa = [Hh[0], 430 - Math.sqrt(75) * s], M2 = agirlik([Aa, Bb, Cc]);
    cokgen(c, g2, [Aa, Bb, Cc], MAVI, { dolgu: 0.1, harf: ['A', 'B', 'C'], harfSize: 26, harfUzak: 24 });
    cizgi(c, g2, Aa, Hh, SARI, 4);
    cizgi(c, g2, Aa, Cc, YESIL, 5);
    cizgi(c, g2, [Hh[0], 430], [Cc[0], 430], TURUNCU, 7);
    aciYayi(c, g2, Aa, Bb, Cc, RENK.cizgi, 30, { dik: true });
    aciYayi(c, g2, Hh, Aa, Bb, RENK.cizgi, 24, { dik: true });
    yazi(c, g2, Hh[0] + 18, 430 + 32, 'H', { size: 26, kalin: 700 });
    D.kenarYazi(c, g2, Hh, Cc, '5', TURUNCU, { merkez: [Hh[0], 300], size: 28, uzak: 38 });
    const sol = [Bb[0], 490], sag = [Cc[0], 490];
    cizgi(c, g2, sol, sag, RENK.cizgi, 2.5); cizgi(c, g2, [sol[0], 482], [sol[0], 498], RENK.cizgi, 2.5); cizgi(c, g2, [sag[0], 482], [sag[0], 498], RENK.cizgi, 2.5);
    yazi(c, g2, 480, 530, '20', { size: 28, kalin: 700 });
    const soru2 = D.kenarYazi(c, g2, Aa, Cc, '?', YESIL, { merkez: M2, size: 32, uzak: 34 });
    gizle(g2); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Bir dik üçgende hipotenüs 20 cm; bir dik kenarın hipotenüs üzerindeki parçası 5 cm. Bu dik kenar kaç cm’dir?',
      options: ['10 cm', '100 cm', '15 cm'], answer: 0,
      hints: ['', 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 5 × 20 = 100; kenar 10.', 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 5 × 20 = 100; kenar 10.'],
      right: 'Evet. Kenarın karesi 100; kenar 10.',
    });
    c.clearSay();
    cevapla(soru2, '10');
    const e2 = renkli(c, g2, 380, 130, ['b² = 5 × 20 = 100'], { size: 30, kalin: 700 }); gizle(e2);
    await par(c.say('Dik kenarın karesi 5 × 20 = 100; kenar 10.', { speak: 'Dik kenarın karesi beş çarpı yirmi, eşittir yüz; kenar on.' }), belir(c, e2, 450));
  }

  /* ---- 2. Menteşeli çubuklar ---- */
  async function mentese(c) {
    const svg = c.svg(1000, 562);
    const mk = menteseKur(c, svg, [215, 385], { harf: true });
    const m = mk.m;
    const harfAB = [mk.hf.A, mk.hf.B];
    gizle(mk.grafik, m.k3, m.yay, m.etiket, mk.et.c, harfAB);
    gizle(mk.mg.g);
    await belir(c, mk.mg.g, 1);                       // grup görünür; çocuklar tek tek gizli
    await par(c.say('İki çubuk C köşesinde bir menteşeyle bağlı: 3 ve 4 birim.', { speak: 'İki çubuk C köşesinde bir menteşeyle bağlı: üç ve dört birim.' }));
    await par(c.say('Çubukların uçları A ve B; aralarındaki uzaklık |AB| = c.', { speak: 'Çubukların uçları A ve B; aralarındaki uzaklık A B uzunluğu, yani c.' }), belir(c, [m.k3, mk.et.c, ...harfAB], 500));
    await par(c.say('Açı 90° iken Pisagor geçerli: c² = 3² + 4² = 25.', { speak: 'Açı doksan derece iken Pisagor geçerli: c kare eşittir üç kare artı dört kare, eşittir yirmi beş.' }), belir(c, [m.yay, m.etiket, mk.grafik], 600));
    mk.et.c.textContent = 'c = 5';
    await c.say('Yani uçlar arası c = 5 birim.', { speak: 'Yani uçlar arası c eşittir beş birim.' });
    mk.et.c.textContent = 'c';
    await par(c.say('Açıyı 120°’ye açalım: uçlar uzaklaşıyor.', { speak: '[curious] Açıyı yüz yirmi dereceye açalım: uçlar uzaklaşıyor.' }), mk.git(90, 120, 1400));
    mk.et.c.textContent = 'c ≈ 6,1'; mk.yerle();
    await c.say('Uçlar arası yaklaşık 6,1 birim; karesi yaklaşık 37.', { speak: 'Uçlar arası yaklaşık altı virgül bir birim; karesi yaklaşık otuz yedi.' });
    await c.say('37, 25’ten büyük: c² > a² + b².', { speak: 'Otuz yedi, yirmi beşten büyük: c kare, a kare artı b kareden büyüktür.' });
    mk.et.c.textContent = 'c'; mk.yerle();
    await par(c.say('Açıyı 60°’ye kapatalım: uçlar yaklaşıyor.', { speak: 'Açıyı altmış dereceye kapatalım: uçlar yaklaşıyor.' }), mk.git(120, 60, 1800));
    mk.et.c.textContent = 'c ≈ 3,6'; mk.yerle();
    await c.say('Uçlar arası yaklaşık 3,6 birim; karesi yaklaşık 13.', { speak: 'Uçlar arası yaklaşık üç virgül altı birim; karesi yaklaşık on üç.' });
    await c.say('13, 25’ten küçük: c² < a² + b².', { speak: 'On üç, yirmi beşten küçük: c kare, a kare artı b kareden küçüktür.' });
  }

  /* ---- 3. Geniş ve dar açı ---- */
  function satirCizim(c, p, V, th, ua, ub) {
    const g = c.S('g', {}, p);
    const P1 = [V[0] + ua, V[1]], P2 = [V[0] + ub * Math.cos(rad(th)), V[1] - ub * Math.sin(rad(th))];
    cizgi(c, g, V, P1, MAVI, 5); cizgi(c, g, V, P2, YESIL, 5); cizgi(c, g, P1, P2, TURUNCU, 5);
    if (th === 90) aciYayi(c, g, V, P1, P2, SARI, 24, { dik: true }); else aciYayi(c, g, V, P1, P2, SARI, 30);
    return g;
  }
  const kuralYazi = (c, p, y, kosul, isaret) => renkli(c, p, 400, y, [[kosul, SARI], '  ', ['c²', TURUNCU], ' ' + isaret + ' ', ['a²', MAVI], ' + ', ['b²', YESIL]], { hiza: 'start', size: 34, kalin: 700 });

  async function genisDar(c) {
    const svg = c.svg(1000, 562);
    const rows = c.S('g', {}, svg);
    const r1 = satirCizim(c, rows, [220, 170], 120, 100, 130), r2 = satirCizim(c, rows, [220, 335], 90, 90, 120), r3 = satirCizim(c, rows, [220, 485], 60, 110, 100);
    const t1 = kuralYazi(c, rows, 150, 'm(C) > 90°:', '>'), t2 = kuralYazi(c, rows, 315, 'm(C) = 90°:', '='), t3 = kuralYazi(c, rows, 465, 'm(C) < 90°:', '<');
    gizle(r1, r2, r3, t1, t2, t3);
    await par(c.say('Bu, 3 ve 4 birimlik kollara özgü değil; her üçgende geçerli.', { speak: 'Bu, üç ve dört birimlik kollara özgü değil; her üçgende geçerli.' }), belir(c, [r1, r2, r3], 600));
    await par(c.say('Geniş açının karşısındaki kenarın karesi, öbür iki kenarın kareleri toplamından büyüktür.', { speak: 'Geniş açının karşısındaki kenarın karesi, öbür iki kenarın kareleri toplamından büyüktür.' }), belir(c, t1, 500));
    await par(c.say('Dar açının karşısındaki kenarın karesi, o toplamdan küçüktür.'), belir(c, t3, 500));
    await par(c.say('Dik açıda eşitlik var: Pisagor.'), belir(c, t2, 500));
    c.clearSay();
    await sil(c, rows, 400);

    // Birlikte çöz: kollar 3 ve 4, açı 100°.
    const mk = menteseKur(c, svg, [215, 385], { arac: { aci: 100 } });
    gizle(mk.grafik);
    await belir(c, mk.mg.g, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kollar 3 ve 4 birim, aradaki açı 100°. Karşı kenarın karesi 25 ile nasıl karşılaştırılır?',
      options: ['25’e eşit', '25’ten büyük', '25’ten küçük'], answer: 1,
      hints: ['100°, 90°’den büyük: geniş açı.', '', 'Geniş açının karşısında kare toplamı aşılır.'],
      right: 'Evet. Geniş açıda kare toplamı aşılır.',
    });
    c.clearSay();
    await par(c.say('Açı 90°’yi aşınca karşı kenarın karesi 25’i aşıyor.', { speak: 'Açı doksan dereceyi aşınca karşı kenarın karesi yirmi beşi aşıyor.' }), belir(c, mk.grafik, 600));

    // Sıra sende: açı 40°.
    c.clearSay();
    gizle(mk.grafik);
    await mk.git(100, 40, 1400);
    await c.choice({
      tag: 'Sıra sende', q: 'Kollar 3 ve 4 birim, aradaki açı 40°. Karşı kenarın karesi 25 ile nasıl karşılaştırılır?',
      options: ['25’e eşit', '25’ten büyük', '25’ten küçük'], answer: 2,
      hints: ['40°, 90°’den küçük: dar açı.', 'Dar açının karşısında kare toplamının altında kalınır.', ''],
      right: 'Evet. Dar açıda kare toplamının altında kalınır.',
    });
    c.clearSay();
    await par(c.say('Karesi yaklaşık 6,6; 25’in çok altında kalıyor.', { speak: 'Karesi yaklaşık altı virgül altı; yirmi beşin çok altında kalıyor.' }), belir(c, mk.grafik, 600));
    c.note('<b>Geniş:</b> m(C) &gt; 90° ise <b>c² &gt; a² + b²</b>.', 'Geniş açı', 'd6-genis');
    c.note('<b>Dar:</b> m(C) &lt; 90° ise <b>c² &lt; a² + b²</b>.', 'Dar açı', 'd6-dar');
  }

  /* ---- 4. Üç üçgen ---- */
  async function ucUcgen(c) {
    const svg = c.svg(1000, 562);
    const s = 52, YB = 350;
    const kur = (V, th, ad, derece, sonuc) => {
      const g = c.S('g', {}, svg);
      const P1 = [V[0] + 4 * s, V[1]], P2 = [V[0] + 3 * s * Math.cos(rad(th)), V[1] - 3 * s * Math.sin(rad(th))], M = agirlik([V, P1, P2]);
      cokgen(c, g, [V, P1, P2], MAVI, { dolgu: 0.08, w: 0.01 }).yuz.setAttribute('stroke', 'none');
      cizgi(c, g, V, P2, MAVI, 5); cizgi(c, g, V, P1, YESIL, 5);
      const kars = cizgi(c, g, P2, P1, TURUNCU, 3.5, { 'stroke-dasharray': '10 8' });
      if (th === 90) aciYayi(c, g, V, P1, P2, SARI, 22, { dik: true }); else aciYayi(c, g, V, P1, P2, SARI, 30);
      const dp = aciIci(V, P1, P2, th === 90 ? 52 : 66);
      const aci = yazi(c, g, dp[0], dp[1] + 8, derece, { size: 24, kalin: 700, renk: SARI });
      const n3 = D.kenarYazi(c, g, V, P2, '3', MAVI, { merkez: M, size: 26 }), n4 = D.kenarYazi(c, g, V, P1, '4', YESIL, { merkez: M, size: 26 });
      const cx = (Math.min(V[0], P2[0]) + P1[0]) / 2;
      const ad_ = yazi(c, g, cx, YB + 74, ad, { size: 28, kalin: 700 });
      const res = yazi(c, g, cx, YB + 120, sonuc || '', { size: 26, kalin: 700 });
      gizle(res);
      return { g, kars, aci, n34: [n3, n4], res, P1, P2 };
    };
    const u1 = kur([180, YB], 120, 'ABC', '120°'), u2 = kur([435, YB], 90, 'DEF', '90°'), u3 = kur([690, YB], 60, 'KLM', '60°');
    gizle(u1.g, u2.g, u3.g);
    await par(c.say('Üç üçgende de iki kenar 3 ve 4 birim.', { speak: 'Üç üçgende de iki kenar üç ve dört birim.' }), belir(c, [u1.g, u2.g, u3.g], 700));
    await par(belir(c, [...u1.n34, ...u2.n34, ...u3.n34], 400, 0));
    [...u1.n34, ...u2.n34, ...u3.n34].forEach((t) => t.remove());
    const goster = async (u, metin, sp, say) => {
      parcaKoy(c, u.res, [[metin, null]]); u.res.style.opacity = 0;
      await par(c.say(say, { speak: sp }), belir(c, u.res, 450));
    };
    const degis = async (u, metin) => { await belir(c, u.res, 250, 0); parcaKoy(c, u.res, [[metin, null]]); await belir(c, u.res, 250, 1); };
    const vurgu = (u, w) => u.kars.setAttribute('stroke-width', w);
    const dash = (u) => { u.kars.removeAttribute('stroke-dasharray'); vurgu(u, 6); };

    const yeni = (u) => { u.kars.removeAttribute('stroke-dasharray'); u.kars.setAttribute('stroke-width', 6); };
    const soluk = (u) => { u.kars.setAttribute('stroke-width', 4); };
    yeni(u2);
    await goster(u2, '|DF|² = 3² + 4² = 25', 'D E F üçgeninde aradaki açı doksan derece: D F uzunluğunun karesi, üç kare artı dört kare, eşittir yirmi beş.', 'DEF’de aradaki açı 90°: |DF|² = 3² + 4² = 25.');
    await par(c.say('Yani |DF| = 5 birim.', { speak: 'Yani D F uzunluğu beş birim.' }), degis(u2, '|DF| = 5'));
    soluk(u2); yeni(u1);
    await goster(u1, '|AC|² > 25', 'A B C üçgeninde aradaki B açısı geniş: A C uzunluğunun karesi, yirmi beşten büyük.', 'ABC’de aradaki B açısı geniş: |AC|² > 25.');
    await par(c.say('Yani |AC| > 5 birim.', { speak: 'Yani A C uzunluğu, beş birimden büyük.' }), degis(u1, '|AC| > 5'));
    soluk(u1); yeni(u3);
    await goster(u3, '|KM|² < 25', 'K L M üçgeninde aradaki L açısı dar: K M uzunluğunun karesi, yirmi beşten küçük.', 'KLM’de aradaki L açısı dar: |KM|² < 25.');
    await par(c.say('Yani |KM| < 5 birim.', { speak: 'Yani K M uzunluğu, beş birimden küçük.' }), degis(u3, '|KM| < 5'));
    c.clearSay();
    await sil(c, [u1.g, u2.g, u3.g], 450);
    [u1, u2, u3].forEach((u) => u.g.remove());

    // Sıra sende: |AB| = 5, |AC| = 12, A geniş.
    const g = c.S('g', {}, svg), s2 = 50;
    const Ax = [262, 350], Cx = [Ax[0] + 12 * s2, 350], Bx = [Ax[0] - 2.5 * s2, 350 - 4.33 * s2], Mx = agirlik([Ax, Bx, Cx]);
    cokgen(c, g, [Ax, Bx, Cx], MAVI, { dolgu: 0.1, harf: ['A', 'B', 'C'], harfSize: 26, harfUzak: 24 });
    aciYayi(c, g, Ax, Cx, Bx, SARI, 30);
    D.kenarYazi(c, g, Ax, Bx, '5', MAVI, { merkez: Mx, size: 26 });
    D.kenarYazi(c, g, Ax, Cx, '12', YESIL, { merkez: Mx, size: 26 });
    const soru = D.kenarYazi(c, g, Bx, Cx, '?', TURUNCU, { merkez: Mx, size: 32, uzak: 40 });
    gizle(g); await belir(c, g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'ABC üçgeninde |AB| = 5 birim, |AC| = 12 birim ve m(A) geniş. |BC| için hangisi doğrudur?',
      options: ['13’ten kısadır', '13’tür', '13’ten uzundur'], answer: 2,
      hints: ['5² + 12² = 169; 169’un karekökü 13.', 'Geniş açı A; karşısındaki kenar BC.', ''],
      right: 'Evet. Geniş açının karşısındaki kenar 13’ten uzun.',
    });
    c.clearSay();
    cevapla(soru, '> 13');
    const ek = renkli(c, g, 560, 500, ['|BC|² > 5² + 12² = 169'], { size: 30, kalin: 700 }); gizle(ek);
    await par(c.say('Geniş açıda |BC|² > 169, yani |BC| > 13.', { speak: 'Geniş açıda B C uzunluğunun karesi, yüz altmış dokuzdan büyük; yani B C, on üçten büyük.' }), belir(c, ek, 450));
  }

  /* ---- 5. Dene: menteşenin açısı ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const mk = menteseKur(c, svg, [215, 385], { arac: { sayilar: false } });
    const VERI = { 30: '4,2', 40: '6,6', 50: '9,6', 60: '13,0', 70: '16,8', 80: '20,8', 90: '25,0', 100: '29,2', 110: '33,2', 120: '37,0', 130: '40,4', 140: '43,4', 150: '45,8' };
    const VX = TX + 156, satirY = [160, 222, 284, 346];
    const etik = [[['Açı', null]], [['c²', TURUNCU]], [['a²', MAVI], ' + ', ['b²', YESIL]], [['Türü', null]]];
    const sat = satirY.map((y) => renkli(c, svg, TX, y, [''], { hiza: 'start', size: 25, kalin: 700 }));
    const yaz = (t, parcalar, deger, renk) => { parcaKoy(c, t, parcalar); const s = c.S('tspan', { text: deger, x: VX }, t); if (renk) s.style.fill = renk; };
    let simdiki = 90;
    const guncelle = (d) => {
      simdiki = +d;
      const tur = simdiki < 90 ? 'dar' : simdiki === 90 ? 'dik' : 'geniş';
      mk.ac(simdiki);
      yaz(sat[0], etik[0], simdiki + '°', SARI); yaz(sat[1], etik[1], VERI[simdiki], TURUNCU); yaz(sat[2], etik[2], '25', null); yaz(sat[3], etik[3], tur, tur === 'dik' ? YESIL : null);
    };
    guncelle(90);
    gizle(sat); await belir(c, sat, 450);
    await c.say('Açıyı kaydır; çubuğun 25 çizgisine göre yerine bak.', { noWait: true });
    const sl = c.slider({ label: 'Menteşenin açısı', min: 30, max: 150, step: 10, value: 90, fmt: (v) => v + '°', onInput: (v) => { guncelle(v); } });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    const git = async (d) => { await mk.git(simdiki, d, 1300); guncelle(d); };
    await par(c.say('Açı 90°’yi geçince c² çubuğu 25 çizgisinin üstüne çıkıyor.', { speak: 'Açı doksan dereceyi geçince c kare çubuğu yirmi beş çizgisinin üstüne çıkıyor.' }), git(120));
    await par(c.say('Açı 90°’nin altındayken çubuk 25 çizgisinin altında kalıyor.', { speak: 'Açı doksan derecenin altındayken çubuk yirmi beş çizgisinin altında kalıyor.' }), git(60));
    await par(c.say('Tam 90°’de çubuk çizgiye değiyor: Pisagor.', { speak: '[thoughtful] Tam doksan derecede çubuk çizgiye değiyor: Pisagor.' }), git(90));
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d6', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Açı dik değilse: dar ve geniş açılı üçgenler', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Açı dik değilse: dar ve geniş açılı üçgenler',
      hook: 'Bir makasın kollarını açtıkça <b>uçları arasındaki uzaklık</b> nasıl değişir?',
      button: 'Derse başla ›',
    },
    goals: ['İki kenar sabitken aradaki açı büyüdükçe karşı kenarın uzadığını gösterir.', 'Geniş açıda c² > a² + b², dar açıda c² < a² + b² olduğunu söyler.', 'Eşitliğin yalnızca dik açıda olduğunu açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Pisagor teoremi ve dik kenar kuralı.', run: hatirla },
      { title: 'Menteşeli çubuklar', goal: 'Açı büyüyünce karşı kenar uzar; c² ile a² + b² karşılaştırılır.', run: mentese },
      { title: 'Geniş ve dar açı', goal: 'Geniş açıda c² daha büyük, dar açıda daha küçüktür.', run: genisDar },
      { title: 'Üç üçgen', goal: 'Aynı iki kenar, üç ayrı açı: dik, geniş, dar.', run: ucUcgen },
      { title: 'Dene: menteşenin açısı', goal: 'Açı 90°’yi geçince c² çubuğu 25’in üstüne çıkar.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: '“a² + b² = c² her üçgende geçerlidir.” Bu cümle için hangisi doğrudur?',
        options: ['Doğrudur', 'Yanlıştır; eşitlik yalnızca c dik açının karşısındaysa olur', 'Yanlıştır; hiçbir üçgende geçerli değildir'], answer: 1,
        why: ['Eşitlik her üçgende değil, yalnızca dik açının karşısındaki kenar için geçerlidir. Dar ya da geniş açıda c² farklı çıkar.', 'Eşitlik yalnızca c dik açının karşısındaysa olur. Geniş açıda c² > a² + b², dar açıda c² < a² + b² olur.', 'Dik üçgenlerde eşitlik geçerlidir; “hiçbir üçgende” demek yanlıştır.'],
        scene: 2,
      },
      {
        q: 'İki kenarı 6 cm ve 8 cm, aralarındaki açı 110° olan üçgende karşı kenarın karesi 100 ile nasıl karşılaştırılır?',
        options: ['100’e eşit', '100’den küçük', '100’den büyük'], answer: 2,
        why: ['Eşitlik yalnızca 90°’de olur: 6² + 8² = 100. Açı 110° olduğu için dik değil.', 'Küçük çıkması dar açıda olur; 110° ise dik açıdan büyüktür.', '110° geniş açıdır; karşısındaki kenarın karesi 6² + 8² = 100’den büyüktür.'],
        scene: 2,
      },
      {
        q: 'İki kenarı 5 cm ve 12 cm, aralarındaki açı 45° olan üçgende karşı kenarın karesi 169 ile nasıl karşılaştırılır?',
        options: ['169’dan küçük', '169’a eşit', '169’dan büyük'], answer: 0,
        why: ['45° dar açıdır; karşısındaki kenarın karesi 5² + 12² = 169’dan küçüktür.', 'Eşitlik yalnızca 90°’de olur; 45° dik açı değildir.', 'Büyük çıkması geniş açıda olur; 45° dar açıdır.'],
        scene: 2,
      },
      {
        q: 'ABC üçgeninde |AB| = 8 cm, |AC| = 15 cm ve m(A) geniş. |BC| için hangisi doğrudur?',
        options: ['17 cm’dir', '17 cm’den uzundur', '17 cm’den kısadır'], answer: 1,
        why: ['17 cm, A dik açı olsaydı çıkardı: 8² + 15² = 289. A geniş olduğundan |BC| daha uzundur.', 'A geniş olduğundan |BC|² > 8² + 15² = 289; yani |BC| 17 cm’den uzundur.', 'Kısa çıkması dar açıda olur; A açısı geniştir.'],
        scene: 3,
      },
      {
        q: 'Bir makasın kolları 9 cm ve 12 cm. Kollar 90° açıldığında uçlar 15 cm uzakta. Kollar daha çok açılırsa uçlar arası uzaklık için hangisi doğrudur?',
        options: ['15 cm’den az olur', '15 cm olur', '15 cm’den fazla olur'], answer: 2,
        why: ['Uzaklık, açı küçülünce azalır; burada kollar daha çok açılıyor.', '15 cm yalnızca 90°’de olur (9² + 12² = 225). Açı değişince uzaklık da değişir.', 'Açı 90°’yi aşınca karşı kenarın karesi 225’i, kendisi de 15 cm’yi geçer.'],
        scene: 1,
      },
    ],
    summary: [
      'Aradaki açı dik açıya eşitse c² = a² + b².',
      'Geniş açıda c² daha büyük, dar açıda daha küçüktür.',
      '<b>Açı dikten büyükse kare toplamı aşılır, küçükse altında kalınır.</b>',
      'Pisagor eşitliği yalnızca dik açıda olur.',
    ],
    nextLesson: { href: 'd7-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
