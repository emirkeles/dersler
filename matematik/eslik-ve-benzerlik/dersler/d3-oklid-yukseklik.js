/* D3 — Öklid teoremi: yüksekliğin karesi
   Dik üçgende hipotenüse inen yüksekliğin karesi, hipotenüsü ayırdığı iki parçanın çarpımına eşittir: h² = p·k.
   Önce iki küçük dik üçgen aynı duruşa getirilip sayılarla (4, 6, 9), sonra harflerle oranlanır; benzerlikten ispat; abide ve çatı; H'nin yeri.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D3)
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, anlat, örnekle göster, birlikte çöz, sonra sor, gör, adlandır, dene. */
(() => {
  'use strict';
  const { RENK, ara, uz, yazi, renkli, cizgi, koy, nokta, gizle, belir, par, cevapla, aciYayi, agirlik, dondur } = window.KIT;
  const B = window.KIT_B, D = window.KIT_D;
  const EL = B.ESLEME;                               // mavi, turuncu, yeşil: 1 yay, 2 yay, 3 yay
  const MAVI = RENK.sekil, TURUNCU = RENK.goruntu, YESIL = RENK.ok, SARI = RENK.merkez, GRI = D.GRI;

  const TX = 706;                                    // sağdaki sütunun sol kenarı
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const sil = async (c, el, ms = 300) => { await belir(c, el, ms, 0); liste(el).forEach((e) => e.remove()); };
  const vurgula = (c, hatlar, ms = 700) => { const w0 = hatlar.map((h) => +h.getAttribute('stroke-width')); return c.tween(ms, (e) => hatlar.forEach((h, i) => h.setAttribute('stroke-width', w0[i] + 4 * Math.sin(Math.PI * e)))); };
  const buyut = (c, yazilar, ms = 800) => { const s0 = liste(yazilar).map((t) => +t.getAttribute('font-size')); return c.tween(ms, (e) => liste(yazilar).forEach((t, i) => t.setAttribute('font-size', s0[i] + 6 * Math.sin(Math.PI * e)))); };
  const konumla = (t, P) => { t.setAttribute('x', P[0]); t.setAttribute('y', P[1]); };

  /* Dik üçgen (KIT_D.dikUcgen) ve onun düzeltmeleri: H harfi ayak çizgisinin altında ortada durur (araçta çizgiye değiyordu),
     p ve k yazıları ve a yazısı aşağı itilir (araçta tahtanın altına taşıyordu), H'de ikinci dik açı işareti (CAH tarafı) eklenir. */
  function ana(c, p, o) {
    const f = D.dikUcgen(c, p, o);
    konumla(f.adlar.H, [f.H[0], f.B[1] + 42]);
    ['p', 'k'].forEach((q) => { if (f.etiket[q]) f.etiket[q].setAttribute('y', f.B[1] + 62); });
    if (f.etiket.a) f.etiket.a.setAttribute('y', f.B[1] + 100);
    f.dik.H2 = aciYayi(c, f.g, f.H, f.A, f.C, RENK.cizgi, 30, { dik: true });
    return f;
  }
  const hepsiniGizle = (f) => gizle(f.yuz, Object.values(f.hat), Object.values(f.ayak), Object.values(f.dik), Object.values(f.adlar), Object.values(f.etiket));
  /* Üçgenin bir parçasını açık dolguyla gösterir (çizgilerin altında kalır). */
  function bolge(c, f, pts, renk, op = 0.3) {
    const el = c.S('polygon', { points: pts.map((q) => q.join(',')).join(' '), fill: renk, 'fill-opacity': op, stroke: 'none' }, f.g);
    f.g.insertBefore(el, f.hat.c);
    return el;
  }
  /* Ana üçgendeki eşit açılar: B ile CAH tek yay, C ile BAH çift yay. */
  function acilar(c, f, r) {
    const y = (V, P, Q, n, renk) => B.esitYay(c, f.g, V, P, Q, n, renk, { r, aralik: 7 });
    return { B: y(f.B, f.A, f.C, 1, EL[0]), CAH: y(f.A, f.H, f.C, 1, EL[0]), C: y(f.C, f.A, f.B, 2, EL[1]), BAH: y(f.A, f.B, f.H, 2, EL[1]) };
  }

  /* Dik açısı H'de olan küçük dik üçgen: kısa dik kenar yatay (sola), uzun dik kenar dikey (yukarı). ciz(t): t = 1 bu duruş,
     t = 0 bu duruşun 90° saat yönünde dönmüş hâli (CAH'nin ana üçgendeki özgün duruşu). Yazılar üçgenle birlikte döner.
     o: { renk (dolgu), kisaRenk, uzunRenk, hipRenk, harf: [sol, üst, H], sayi: [kısa, uzun] (kenar yazıları) }. */
  function sagUcgen(c, p, H, kisa, uzun, o) {
    const g = c.S('g', {}, p), L = [H[0] - kisa, H[1]], U = [H[0], H[1] - uzun], M = agirlik([L, U, H]);
    const yuz = c.S('polygon', { fill: o.renk, 'fill-opacity': 0.14, stroke: 'none' }, g);
    const kl = cizgi(c, g, H, L, o.kisaRenk, 5), ul = cizgi(c, g, H, U, o.uzunRenk, 5), hl = cizgi(c, g, L, U, o.hipRenk, 3.5, { 'stroke-opacity': 0.7 });
    const dik = c.S('path', { fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
    const dis = (V, u) => { const d = uz(M, V) || 1; return [V[0] + ((V[0] - M[0]) / d) * u, V[1] + ((V[1] - M[1]) / d) * u + 8]; };
    const konum = [dis(L, 24), dis(U, 24), dis(H, 24), [H[0] - kisa / 2, H[1] + 34], [H[0] + 28, H[1] - uzun / 2 + 9]];
    const adlar = o.harf.map((h) => yazi(c, g, 0, 0, h, { size: 26, kalin: 700 }));
    const sayi = o.sayi ? [yazi(c, g, 0, 0, o.sayi[0], { size: 26, kalin: 700, renk: o.kisaRenk }), yazi(c, g, 0, 0, o.sayi[1], { size: 26, kalin: 700, renk: o.uzunRenk })] : [];
    const yazilar = [...adlar, ...sayi];
    const ciz = (t) => {
      const th = 90 * (1 - t), R = (P) => (th ? dondur(P, H, th) : P), Lr = R(L), Ur = R(U);
      yuz.setAttribute('points', [Lr, Ur, H].map((q) => q.join(',')).join(' '));
      koy(kl, H, Lr); koy(ul, H, Ur); koy(hl, Lr, Ur);
      const u1 = [(Lr[0] - H[0]) / kisa, (Lr[1] - H[1]) / kisa], u2 = [(Ur[0] - H[0]) / uzun, (Ur[1] - H[1]) / uzun], r = 17;
      const k1 = [H[0] + u1[0] * r, H[1] + u1[1] * r], k2 = [H[0] + u2[0] * r, H[1] + u2[1] * r], k3 = [k1[0] + u2[0] * r, k1[1] + u2[1] * r];
      dik.setAttribute('d', `M${k1[0]},${k1[1]} L${k3[0]},${k3[1]} L${k2[0]},${k2[1]}`);
      konum.forEach((q, i) => { if (yazilar[i]) konumla(yazilar[i], R(q)); });   // 0–2 harfler, 3–4 kenar yazıları
    };
    ciz(1);
    return { g, yuz, kl, ul, hl, dik, adlar, sayi, ciz, L, U, H, don: (t) => ciz(t) };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    // Birinci soru: üç paralel, iki kesen (Tales).
    const g1 = c.S('g', {}, svg);
    const pk = D.paralelKesen(c, g1, {
      aci: 0, paraleller: [{ nokta: [0, 95] }, { nokta: [0, 239] }, { nokta: [0, 455] }],
      keseler: [{ nokta: [130, 95], aci: 90, harf: ['A', 'B', 'C'] }, { nokta: [330, 95], aci: Math.asin(2 / 3) * 180 / Math.PI, harf: ['D', 'E', 'F'] }],
    });
    const e1 = pk.parcaEtiket(0, 0, '4', TURUNCU, { size: 26 }), e2 = pk.parcaEtiket(0, 1, '6', YESIL, { size: 26 });
    const e3 = pk.parcaEtiket(1, 0, '6', TURUNCU, { size: 26 }), e4 = pk.parcaEtiket(1, 1, '?', YESIL, { size: 26 });
    const oran = renkli(c, g1, 560, 180, [['|AB|', TURUNCU], '/', ['|BC|', YESIL], ' = ', ['|DE|', TURUNCU], '/', ['|EF|', YESIL]], { hiza: 'start', size: 28, kalin: 700 });
    gizle(g1, oran);
    await belir(c, g1, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Üç paralel doğru iki kesen üzerinde |AB| = 4, |BC| = 6 ve |DE| = 6 parçalarını ayırıyor. |EF| kaçtır?',
      options: ['4', '9', '10'], answer: 1,
      hints: ['Tales: |AB|/|BC| = |DE|/|EF|; 4/6 = 6/|EF|.', '', 'Tales: |AB|/|BC| = |DE|/|EF|; 4/6 = 6/|EF|.'],
      right: 'Evet. 4/6 = 6/9.',
    });
    c.clearSay();
    cevapla(e4, '9');
    await par(c.say('Tales: 4/6 = 6/9, yani |EF| = 9.', { speak: 'Tales: dört bölü altı eşittir altı bölü dokuz, yani E F uzunluğu dokuz.' }), belir(c, oran, 500));
    c.clearSay();
    await sil(c, g1, 400);

    // İkinci soru: dik üçgende yükseklik, üç benzer üçgen.
    const g2 = c.S('g', {}, svg);
    const f = ana(c, g2, { B: [290, 410], p: 4, k: 9, olcek: 34 });
    gizle(f.ayak.p, f.ayak.k, f.dik.H2);
    const abh = bolge(c, f, [f.A, f.B, f.H], MAVI), cah = bolge(c, f, [f.C, f.A, f.H], TURUNCU), ac = acilar(c, f, 40);
    gizle(g2, abh, cah, Object.values(ac)); await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Dik üçgende dik köşeden hipotenüse yükseklik çizilince oluşan iki küçük üçgen ile ilk üçgen için hangisi doğrudur?',
      options: ['İki küçük üçgen birbirine eştir', 'Küçük üçgenler ilk üçgene benzemez', 'Üçü de birbirine benzerdir'], answer: 2,
      hints: ['Üç üçgende de aynı iki dar açı vardır; Açı-Açı ile üçü de benzerdir.', 'Üç üçgende de aynı iki dar açı vardır; Açı-Açı ile üçü de benzerdir.', ''],
      right: 'Evet. Aynı iki dar açı: Açı-Açı.',
    });
    c.clearSay();
    await par(belir(c, [abh, cah], 500), belir(c, Object.values(ac), 500));
    await c.say('Üç üçgende de aynı iki dar açı var; Açı-Açı.');
  }

  /* ---- 2. Üç benzer üçgen ve harfler ---- */
  async function harfler(c) {
    const svg = c.svg(1000, 562);
    const f = ana(c, svg, { B: [250, 410], p: 4, k: 9, olcek: 38, etiket: { a: 'a', b: 'b', c: 'c', h: 'h', p: 'p', k: 'k' } });
    const abh = bolge(c, f, [f.A, f.B, f.H], MAVI), cah = bolge(c, f, [f.C, f.A, f.H], TURUNCU), E = f.etiket, N = f.adlar;
    const aOlcu = cizgi(c, f.g, [f.B[0], f.B[1] + 78], [f.C[0], f.C[1] + 78], MAVI, 5);   // a yazısının hipotenüse bağı
    gizle(f.dik.H2);
    hepsiniGizle(f); gizle(abh, cah, aOlcu);

    await par(c.say('BAC dik üçgeninde dik açı A köşesinde.', { speak: 'B A C dik üçgeninde dik açı A köşesinde.' }), belir(c, [f.yuz, f.hat.a, f.hat.b, f.hat.c, N.A, N.B, N.C, f.dik.A], 500));
    await par(c.say('A’dan hipotenüs BC’ye inen dikme AH, yüksekliktir.', { speak: 'A’dan hipotenüs B C’ye inen dikme A H, yüksekliktir.' }), belir(c, [f.hat.h, N.H, f.dik.H], 500));
    await par(c.say('H noktası hipotenüsü iki parçaya ayırır: |BH| = p, |HC| = k.', { speak: 'H noktası hipotenüsü iki parçaya ayırır: B H uzunluğu p, H C uzunluğu k.' }), belir(c, [f.ayak.p, f.ayak.k, E.p, E.k], 500));
    await par(c.say('Yüksekliğe h, hipotenüse a diyelim.'), belir(c, [E.h, E.a, aOlcu], 500));
    await par(c.say('Dik kenarlar: |AB| = c ve |AC| = b.', { speak: 'Dik kenarlar: A B uzunluğu c ve A C uzunluğu b.' }), belir(c, [E.c, E.b], 500));
    await par(c.say('Yükseklik üçgeni ikiye böldü: ABH ve CAH.', { speak: 'Yükseklik üçgeni ikiye böldü: A B H ve C A H.' }), (async () => { await belir(c, abh, 500); await belir(c, cah, 500); })());
    await par(c.say('Bu üç dik üçgen birbirine benzerdir.'), vurgula(c, Object.values(f.hat), 900));
    await par(c.say('Peki h, p ve k arasında bir bağ var mı?', { speak: '[curious] Peki h, p ve k arasında bir bağ var mı?' }), buyut(c, [E.h, E.p, E.k], 900));
  }

  /* ---- 3. Sayılarla bak ---- */
  async function sayilarla(c) {
    const svg = c.svg(1000, 562);
    // Tam üçgen: p = 4, k = 9, h = 6.
    const g0 = c.S('g', {}, svg);
    const f = ana(c, g0, { B: [279, 380], p: 4, k: 9, olcek: 34, etiket: { p: '4', k: '9', h: '6' } });
    gizle(f.dik.H2, f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k, f.etiket.h);
    gizle(g0); await belir(c, g0, 450);
    await par(c.say('Bir üçgende p = 4 ve k = 9.', { speak: 'Bir üçgende p eşittir dört ve k eşittir dokuz.' }), belir(c, [f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k], 500));
    await par(c.say('Yükseklik h = 6.', { speak: 'Yükseklik h eşittir altı.' }), belir(c, f.etiket.h, 500));
    c.clearSay();
    await sil(c, g0, 400);

    // İki küçük üçgen: ABH solda, CAH sağda (özgün duruşunda).
    const H1 = [250, 350], H2 = [620, 350], s = 32;
    const t1 = sagUcgen(c, svg, H1, 4 * s, 6 * s, { renk: MAVI, kisaRenk: TURUNCU, uzunRenk: SARI, hipRenk: TURUNCU, harf: ['B', 'A', 'H'], sayi: ['4', '6'] });
    const t2 = sagUcgen(c, svg, H2, 6 * s, 9 * s, { renk: TURUNCU, kisaRenk: SARI, uzunRenk: YESIL, hipRenk: YESIL, harf: ['A', 'C', 'H'], sayi: ['6', '9'] });
    t2.ciz(0);
    const e1 = renkli(c, svg, 186, 440, [['4', TURUNCU], '/', ['6', SARI], ' = 2/3'], { size: 32, kalin: 700 });
    const e2 = renkli(c, svg, 524, 440, [['6', SARI], '/', ['9', YESIL], ' = 2/3'], { size: 32, kalin: 700 });
    gizle(t1.g, t2.g, e1, e2);

    await par(c.say('ABH’nin dik kenarları 4 ve 6.', { speak: 'A B H’nin dik kenarları dört ve altı.' }), belir(c, t1.g, 500));
    await par(c.say('CAH’nin dik kenarları 6 ve 9.', { speak: 'C A H’nin dik kenarları altı ve dokuz.' }), belir(c, t2.g, 500));
    c.clearSay();
    await par(c.say('CAH’yi çevirip ABH ile aynı duruşa getirelim.', { speak: 'C A H’yi çevirip A B H ile aynı duruşa getirelim.' }), (async () => {
      gizle(t2.adlar, t2.sayi);
      await c.tween(1800, (e) => t2.ciz(e), Ders.ease.inOut);
      await belir(c, [...t2.adlar, ...t2.sayi], 400);
    })());
    await par(c.say('Kısa dik kenarlar 4 ve 6; uzun dik kenarlar 6 ve 9.', { speak: 'Kısa dik kenarlar dört ve altı; uzun dik kenarlar altı ve dokuz.' }), (async () => { await vurgula(c, [t1.kl, t2.kl], 800); await vurgula(c, [t1.ul, t2.ul], 800); })());
    await par(c.say('Kısa bölü uzun: 4/6 ve 6/9.', { speak: 'Kısa bölü uzun: dört bölü altı ve altı bölü dokuz.' }), belir(c, [e1, e2], 500));
    await par(c.say('İkisi de 2/3: üçgenler benzer.', { speak: 'İkisi de iki bölü üç: üçgenler benzer.' }), buyut(c, [e1, e2], 800));
    await sil(c, [e1, e2], 300);
    await par(c.say('h, ABH’de uzun; CAH’de kısa dik kenar.', { speak: 'h, A B H’de uzun; C A H’de kısa dik kenar.' }), vurgula(c, [t1.ul, t2.kl], 900));
    // Harflere geç.
    const son = renkli(c, svg, 400, 500, [['p', TURUNCU], '/', ['h', SARI], ' = ', ['h', SARI], '/', ['k', YESIL]], { size: 38, kalin: 700 });
    gizle(son);
    await par(c.say('Kısa bölü uzun oranı: p/h = h/k.', { speak: 'Kısa bölü uzun oranı: p bölü h eşittir h bölü k.' }), (async () => {
      t1.sayi[0].textContent = 'p'; t1.sayi[1].textContent = 'h'; t2.sayi[0].textContent = 'h'; t2.sayi[1].textContent = 'k';
      await buyut(c, [...t1.sayi, ...t2.sayi], 700); await belir(c, son, 500);
    })());
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'p/h = h/k ise içler dışlar çarpımı hangi eşitliği verir?', options: ['h·k = p·h', 'h·h = p·k', 'h + h = p + k'], answer: 1,
      hints: ['Çarpraz çarpım: h·h ile p·k.', '', 'İçler: h ve h. Dışlar: p ve k.'],
      right: 'Evet. İçler h·h, dışlar p·k.',
    });
    await sil(c, son, 300);
    const cevap = renkli(c, svg, 400, 480, [['h', SARI], '·', ['h', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL]], { size: 38, kalin: 700 });
    gizle(cevap);
    await par(c.say('İçler dışlar çarpımı: h·h = p·k.', { speak: 'İçler dışlar çarpımı: h çarpı h eşittir p çarpı k.' }), belir(c, cevap, 500));
    const sayili = renkli(c, svg, 400, 535, ['6·6 = 4·9 = 36'], { size: 34, kalin: 700 });
    gizle(sayili);
    await par(c.say('Sayılarla: 6·6 = 4·9; ikisi de 36.', { speak: 'Sayılarla: altı çarpı altı eşittir dört çarpı dokuz; ikisi de otuz altı.' }), belir(c, sayili, 500));
  }

  /* ---- 4. İspat: açılar ---- */
  async function ispatAcilar(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const f = ana(c, g1, { B: [44, 440], p: 4, k: 9, olcek: 26, etiket: { h: 'h', p: 'p', k: 'k' } });
    const cah = bolge(c, f, [f.C, f.A, f.H], TURUNCU, 0.28), ac = acilar(c, f, 40);
    ac.CAH.querySelectorAll('path').forEach((q) => q.setAttribute('stroke', RENK.cizgi));
    const tahta = D.ispatTahtasi(c, g1, { x: 390, y: 200, aralik: 60, size: 22, gerekceSize: 18, verilen: 'm(BAC) = 90°, AH ⊥ BC', istenen: 'h² = p·k' });
    const s1 = tahta.ekle('m(B) + m(C) = 90°', 'ABC’de A dik; iç açılar toplamı 180°');
    const s2 = tahta.ekle('m(CAH) + m(C) = 90°', 'CAH’de H dik; iç açılar toplamı 180°');
    const s3 = tahta.ekle('m(CAH) = m(B)', '1 ve 2: ikisi de 90° − m(C)');
    gizle(f.dik.H2, f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k, f.etiket.h, cah, Object.values(ac), tahta.baslik);
    gizle(f.yuz, Object.values(f.hat), f.dik.A, f.dik.H, Object.values(f.adlar));

    await par(c.say('Verilen: BAC dik üçgeni, A dik; AH ⊥ BC.', { speak: 'Verilen: B A C dik üçgeni, A dik; A H, B C’ye dik.' }), (async () => {
      await belir(c, [f.yuz, ...Object.values(f.hat), f.dik.A, f.dik.H, ...Object.values(f.adlar)], 500); await belir(c, tahta.baslik[0], 400);
    })());
    await par(c.say('İstenen: h² = p·k.', { speak: 'İstenen: h kare eşittir p çarpı k.' }), belir(c, [tahta.baslik[1], f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k, f.etiket.h], 500));
    await par(c.say('ABC dik üçgeninde iki dar açının toplamı 90°.', { speak: 'A B C dik üçgeninde iki dar açının toplamı doksan derece.' }), belir(c, [ac.B, ac.C], 500));
    await par(c.say('Yani m(B) + m(C) = 90°.', { speak: 'Yani B açısının ölçüsü artı C açısının ölçüsü eşittir doksan derece.' }), tahta.ac(s1));
    await par(c.say('CAH üçgeninde de H dik: m(CAH) + m(C) = 90°.', { speak: 'C A H üçgeninde de H dik: C A H açısının ölçüsü artı C açısının ölçüsü eşittir doksan derece.' }), (async () => {
      await tahta.ac(s2); await par(belir(c, [cah, f.dik.H2], 500), belir(c, ac.CAH, 500));
    })());
    await par(c.say('İkisi de 90° − m(C): m(CAH) = m(B).', { speak: 'İkisi de doksan eksi C açısının ölçüsü: C A H açısının ölçüsü, B açısının ölçüsüne eşit.' }), (async () => {
      await tahta.ac(s3); ac.CAH.querySelectorAll('path').forEach((q) => q.setAttribute('stroke', EL[0])); await tahta.parla(s3, SARI, 800);
    })());
  }

  /* ---- 5. İspat: benzerlik ve oran ---- */
  async function ispatBenzerlik(c) {
    const svg = c.svg(1000, 562);
    const istenen = renkli(c, svg, 30, 64, [['İstenen: ', RENK.soluk], 'h² = p·k'], { hiza: 'start', size: 26, kalin: 700 });
    const t1 = sagUcgen(c, svg, [120, 470], 80, 120, { renk: MAVI, kisaRenk: TURUNCU, uzunRenk: SARI, hipRenk: TURUNCU, harf: ['B', 'A', 'H'], sayi: ['p', 'h'] });
    const t2 = sagUcgen(c, svg, [330, 470], 120, 180, { renk: TURUNCU, kisaRenk: SARI, uzunRenk: YESIL, hipRenk: YESIL, harf: ['A', 'C', 'H'], sayi: ['h', 'k'] });
    const yay = (t, n, renk, r, ar) => (n === 1 ? B.esitYay(c, svg, t.L, t.U, t.H, 1, renk, { r }) : B.esitYay(c, svg, t.U, t.L, t.H, 2, renk, { r, aralik: ar }));
    const tek = [yay(t1, 1, EL[0], 26), yay(t2, 1, EL[0], 26)], cift = [yay(t1, 2, EL[1], 26, 6), yay(t2, 2, EL[1], 26, 6)];
    const tahta = D.ispatTahtasi(c, svg, { x: 400, y: 150, aralik: 56, size: 22, gerekceSize: 18 });
    const s4 = tahta.ekle([['ABH', MAVI], ' ~ ', ['CAH', TURUNCU]], 'H’de dik açılar; m(B) = m(CAH): Açı-Açı');
    const s5 = tahta.ekle('|BH|/|AH| = |AH|/|CH|', 'karşılıklı kenarlar orantılı');
    const s6 = tahta.ekle([['p', TURUNCU], '/', ['h', SARI], ' = ', ['h', SARI], '/', ['k', YESIL]], '|BH| = p, |AH| = h, |CH| = k');
    const s7 = tahta.ekle([['h', SARI], '·', ['h', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL], ', yani h² = p·k'], 'içler dışlar çarpımı ∎');
    gizle(t1.g, t2.g, tek, cift, t1.sayi, t2.sayi, istenen);

    await par(c.say('ABH ve CAH üçgenlerinde H açıları dik.', { speak: 'A B H ve C A H üçgenlerinde H açıları dik.' }), (async () => { await belir(c, [t1.g, t2.g], 500); await belir(c, istenen, 300); })());
    await par(c.say('m(B) = m(CAH) olduğundan Açı-Açı: ABH ~ CAH.', { speak: 'B açısının ölçüsü, C A H açısının ölçüsüne eşit olduğundan Açı-Açı: A B H, C A H’ye benzer.' }), (async () => {
      await belir(c, tek, 400); await tahta.ac(s4);
    })());
    await par(c.say('Köşeler sırayla eşleşir: A↔C, B↔A, H↔H.', { speak: 'Köşeler sırayla eşleşir: A, C ile; B, A ile; H, H ile.' }), belir(c, cift, 500));
    await par(c.say('Karşılıklı kenarlar: |BH| ↔ |AH| ve |AH| ↔ |CH|.', { speak: 'Karşılıklı kenarlar: B H, A H ile; A H, C H ile.' }), (async () => { await vurgula(c, [t1.kl, t2.kl], 800); await vurgula(c, [t1.ul, t2.ul], 800); })());
    await par(c.say('Oranlar eşit: |BH|/|AH| = |AH|/|CH|.', { speak: 'Oranlar eşit: B H bölü A H, A H bölü C H’ye eşit.' }), tahta.ac(s5));
    await par(c.say('Yani p/h = h/k.', { speak: 'Yani p bölü h eşittir h bölü k.' }), (async () => { await belir(c, [...t1.sayi, ...t2.sayi], 400); await tahta.ac(s6); })());
    await par(c.say('İçler dışlar çarpımı: h·h = p·k.', { speak: 'İçler dışlar çarpımı: h çarpı h eşittir p çarpı k.' }), tahta.ac(s7));
    // Sonuç çerçevesi.
    await belir(c, tahta.g, 450, 0); tahta.kaldir();
    const sonuc = renkli(c, svg, 700, 290, [['h²', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL]], { size: 64, kalin: 700 });
    const cerceve = c.S('rect', { x: 540, y: 228, width: 320, height: 92, rx: 12, fill: 'none', stroke: SARI, 'stroke-width': 3.5 }, svg);
    const ad = yazi(c, svg, 700, 385, 'Öklid teoremi', { size: 34, kalin: 700, renk: SARI });
    const yunan = yazi(c, svg, 700, 430, 'Antik Yunan matematikçisi', { size: 26, renk: RENK.soluk });
    gizle(sonuc, cerceve, ad, yunan);
    await par(c.say('İspat tamam: h² = p·k.', { speak: '[short pause] İspat tamam: h kare eşittir p çarpı k.' }), belir(c, [sonuc, cerceve], 600));
    await par(c.say('Bu bağıntıya Öklid teoremi denir.'), belir(c, ad, 500));
    c.note('<b>Öklid:</b> h² = p·k. Örnek: 4·9 = 36, h = 6.', 'Öklid', 'd3-oklid');
    await par(c.say('Öklid, Antik Yunan’da yaşamış önemli bir matematikçidir.'), belir(c, yunan, 500));
    await par(c.say('Bu, onun ortaya koyduğu teoremlerden biridir.'), vurgula(c, [cerceve], 800));
  }

  /* ---- 6. Abidenin boyu ---- */
  async function abide(c) {
    const svg = c.svg(1000, 562);
    const s = 10.4, X = 300, yB = 505, yH = yB - 1.6 * s, yC = yB - 41.6 * s;       // 1 m = 10,4 px
    const A = [X - 8 * s, yH], Bp = [X, yB], Cp = [X, yC], Hp = [X, yH];
    const g = c.S('g', {}, svg);
    const yer = cizgi(c, g, [A[0] - 60, yB], [X + 20, yB], RENK.cizgi, 2.5);   // sağ uç kısa: "1,6 m" yazısının altından geçmesin
    const ab = cizgi(c, g, A, Bp, TURUNCU, 4.5), ac = cizgi(c, g, A, Cp, YESIL, 4.5), abideHat = cizgi(c, g, Bp, Cp, MAVI, 6);
    const dik = aciYayi(c, g, A, Bp, Cp, RENK.cizgi, 34, { dik: true });
    const ahGri = cizgi(c, g, A, Hp, GRI, 2.5, { 'stroke-dasharray': '8 6' }), ah = cizgi(c, g, A, Hp, SARI, 5);
    const goz = nokta(c, g, A, RENK.yazi, 6);
    // Gözün yerden yüksekliği (sol), BH (sağ) ve HC (sağ) ölçü çizgileri.
    const olcu = (x, y0, y1, renk) => { const o = c.S('g', {}, g); cizgi(c, o, [x, y0], [x, y1], renk, 4); cizgi(c, o, [x - 6, y0], [x + 6, y0], renk, 3); cizgi(c, o, [x - 6, y1], [x + 6, y1], renk, 3); return o; };
    const sol = olcu(A[0] - 16, yH, yB, GRI), pOlcu = olcu(X + 10, yH, yB, TURUNCU), kOlcu = olcu(X + 10, yC, yH, YESIL);
    const solY = yazi(c, g, A[0] - 26, (yH + yB) / 2 + 9, '1,6 m', { hiza: 'end', size: 24, kalin: 700, renk: GRI });
    const mesafe = yazi(c, g, (A[0] + X) / 2, yH - 16, '8 m', { size: 26, kalin: 700, renk: SARI });
    const pY = yazi(c, g, X + 26, (yH + yB) / 2 + 9, '1,6 m', { hiza: 'start', size: 24, kalin: 700, renk: TURUNCU });
    const kY = yazi(c, g, X + 28, (yC + yH) / 2 + 9, '?', { hiza: 'start', size: 28, kalin: 700, renk: YESIL });
    const hA = yazi(c, g, A[0] - 18, yH - 16, 'A', { size: 26, kalin: 700 }), hB = yazi(c, g, X + 28, yB + 30, 'B', { size: 26, kalin: 700 });
    const hC = yazi(c, g, X, yC - 14, 'C', { size: 26, kalin: 700 }), hH = yazi(c, g, X + 30, yH - 12, 'H', { size: 26, kalin: 700 });
    // Adımlar (sağda).
    const sat = (y, parcalar, size = 34) => renkli(c, svg, 520, y, parcalar, { hiza: 'start', size, kalin: 700 });
    const r1 = sat(150, [['h²', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL]]);
    const r2 = sat(210, [['h', SARI], ' = 8, ', ['p', TURUNCU], ' = 1,6'], 30);
    const r3 = sat(280, ['8² = ', ['1,6', TURUNCU], '·', ['k', YESIL]]);
    const r4 = sat(280, [['k', YESIL], ' = 40 m']);
    const r5 = sat(350, ['boy = ', ['1,6', TURUNCU], ' + ', ['40', YESIL], ' = 41,6 m'], 32);
    gizle(yer, abideHat, ab, ac, dik, ahGri, ah, goz, sol, pOlcu, kOlcu, solY, mesafe, pY, kY, hA, hB, hC, hH, r1, r2, r3, r4, r5);

    await par(c.say('Arda, Çanakkale Şehitler Abidesi’nin boyunu ölçmek istiyor.'), belir(c, [yer, abideHat], 600));
    await par(c.say('Elindeki kitabın köşesi dik açı; kenarları abidenin tepesine ve tabanına bakıyor.'), belir(c, [ab, ac, dik, goz, hA, hB, hC], 600));
    await par(c.say('Gözü yerden 1,6 m yüksekte; abideye uzaklığı 8 m.', { speak: 'Gözü yerden bir virgül altı metre yüksekte; abideye uzaklığı sekiz metre.' }), belir(c, [sol, solY, ahGri, mesafe], 600));
    await par(c.say('Gözünün hizasındaki abide noktası H olsun: |BH| = 1,6 m.', { speak: 'Gözünün hizasındaki abide noktası H olsun: B H uzunluğu bir virgül altı metre.' }), (async () => {
      await belir(c, [sol, solY], 300, 0); await belir(c, [hH, pOlcu, pY], 600);
    })());
    await par(c.say('Göz A noktası: |AH| = 8 m.', { speak: 'Göz A noktası: A H uzunluğu sekiz metre.' }), (async () => { await belir(c, ah, 500); await belir(c, ahGri, 200, 0); })());
    await par(c.say('A’da açı dik: BAC dik üçgen, AH yükseklik.', { speak: 'A’da açı dik: B A C dik üçgen, A H yükseklik.' }), (async () => { await belir(c, [kOlcu, kY], 500); await vurgula(c, [ab, ac], 700); })());
    await par(c.say('Öklid: h² = p·k; burada h = 8 ve p = 1,6.', { speak: 'Öklid: h kare eşittir p çarpı k; burada h eşittir sekiz ve p eşittir bir virgül altı.' }), (async () => { await belir(c, r1, 500); await belir(c, r2, 500); })());
    await sil(c, [r2, sol, solY], 300);
    await par(c.say('8² = 1,6·k; yani 64 = 1,6·k.', { speak: 'Sekiz kare eşittir bir virgül altı çarpı k; yani altmış dört eşittir bir virgül altı çarpı k.' }), (async () => {
      await belir(c, r3, 500); await c.wait(300);
      window.KIT.parcaKoy(c, r3, ['64 = ', ['1,6', TURUNCU], '·', ['k', YESIL]]);
    })());
    await sil(c, [r1], 300);
    await par(c.say('k = 40 m; abidenin boyu p + k = 41,6 m.', { speak: 'k eşittir kırk metre; abidenin boyu p artı k, yani kırk bir virgül altı metre.' }), (async () => {
      await sil(c, r3, 300); await belir(c, r4, 500); cevapla(kY, '40 m'); await belir(c, r5, 500);
    })());
  }

  /* ---- 7. Çatı ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const f = ana(c, g1, { B: [80, 400], p: 1.8, k: 5, olcek: 60, etiket: { p: '1,8', k: '5', h: '?' } });
    gizle(f.dik.H2);
    const sat = (y, parcalar) => renkli(c, g1, 560, y, parcalar, { hiza: 'start', size: 34, kalin: 700 });
    const r1 = sat(190, [['h²', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL], ' = ', ['1,8', TURUNCU], '·', ['5', YESIL]]);
    const r2 = sat(250, [['h²', SARI], ' = 9']);
    const r3 = sat(310, [['h', SARI], ' = 3 m']);
    hepsiniGizle(f); gizle(r1, r2, r3);

    await par(c.say('Bir evin çatısı dik açılı üçgen: BAC’de A dik.', { speak: 'Bir evin çatısı dik açılı üçgen: B A C’de A dik.' }), belir(c, [f.yuz, f.hat.a, f.hat.b, f.hat.c, f.adlar.A, f.adlar.B, f.adlar.C, f.dik.A], 500));
    await par(c.say('Çatının tepesinden tabana inen direk AH.', { speak: 'Çatının tepesinden tabana inen direk A H.' }), belir(c, [f.hat.h, f.adlar.H, f.dik.H], 500));
    await par(c.say('Direk tabanı böler: |BH| = 1,8 m, |HC| = 5 m.', { speak: 'Direk tabanı böler: B H uzunluğu bir virgül sekiz metre, H C uzunluğu beş metre.' }), belir(c, [f.ayak.p, f.ayak.k, f.etiket.p, f.etiket.k], 500));
    await par(c.say('Direğin boyu h aranıyor.'), belir(c, f.etiket.h, 500));
    await par(c.say('Öklid: h² = p·k = 1,8·5.', { speak: 'Öklid: h kare eşittir p çarpı k, eşittir bir virgül sekiz çarpı beş.' }), belir(c, r1, 500));
    c.clearSay();
    await belir(c, r2, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'h² = 1,8·5 = 9 ise direk kaç metredir?', options: ['3 m', '9 m', '6,8 m'], answer: 0,
      hints: ['', '9, h’nin karesiydi; kendisi değil.', 'Kendisiyle çarpınca 9 olan sayı.'],
      right: 'Evet. 3·3 = 9.',
    });
    await par(c.say('h = 3 m: direk 3 m boyunda.', { speak: 'h eşittir üç metre: direk üç metre boyunda.' }), (async () => { cevapla(f.etiket.h, '3'); await belir(c, r3, 500); })());
    c.clearSay();
    await sil(c, g1, 450);

    // Sıra sende.
    const g2 = c.S('g', {}, svg);
    const q = ana(c, g2, { B: [80, 400], p: 3, k: 12, olcek: 36, etiket: { p: '3', k: '?', h: '6' } });
    gizle(q.dik.H2);
    const sat2 = (y, parcalar) => renkli(c, g2, 720, y, parcalar, { hiza: 'start', size: 32, kalin: 700 });
    const q1 = sat2(170, ['6² = ', ['3', TURUNCU], '·', ['k', YESIL]]);
    const q3 = sat2(230, [['k', YESIL], ' = 12 cm']), q4 = sat2(290, ['3 + 12 = 15 cm']);
    gizle(g2, q1, q3, q4);
    await belir(c, g2, 450);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir dik üçgende hipotenüse inen yükseklik 6 cm; hipotenüsün parçalarından biri 3 cm. Öbür parça kaç cm’dir?',
      options: ['18 cm', '2 cm', '12 cm'], answer: 2,
      hints: ['h² = p·k; 6² = 3·k.', '36 = 3·k; k’yi bul.', ''],
      right: 'Evet. 36 = 3·k olduğundan k = 12.',
    });
    c.clearSay();
    await par(c.say('6² = 3·k; 36 = 3·k, yani k = 12.', { speak: 'Altı kare eşittir üç çarpı k; otuz altı eşittir üç çarpı k, yani k eşittir on iki.' }), (async () => {
      await belir(c, q1, 400); await c.wait(300); window.KIT.parcaKoy(c, q1, ['36 = ', ['3', TURUNCU], '·', ['k', YESIL]]); await c.wait(300);
      await belir(c, q3, 400); cevapla(q.etiket.k, '12');
    })());
    await par(c.say('Hipotenüs 3 + 12 = 15 cm.', { speak: 'Hipotenüs üç artı on iki eşittir on beş santimetre.' }), belir(c, q4, 500));
  }

  /* ---- 8. Dene: H'nin yeri ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const VERI = { 1: [9, 9, 9, 3], 2: [8, 16, 16, 4], 3: [7, 21, 21, '4,58'], 4: [6, 24, 24, '4,90'], 5: [5, 25, 25, 5], 6: [4, 24, 24, '4,90'], 7: [3, 21, 21, '4,58'], 8: [2, 16, 16, 4], 9: [1, 9, 9, 3] };
    const ETIK = ['p', 'k', 'h²', 'p·k', 'h'], VX = TX + 130;
    const sat = ETIK.map((e, i) => yazi(c, svg, TX, 150 + i * 56, '', { hiza: 'start', size: 26, kalin: 700 }));
    gizle(sat);
    let fig = null, renk = null, simdiki = 4;
    const yaz = (t, e, v, r) => { t.textContent = ''; c.S('tspan', { text: e }, t); const q = c.S('tspan', { text: String(v), x: VX }, t); if (r) q.style.fill = r; };
    const guncelle = (ad) => {
      simdiki = +ad; const v = VERI[simdiki];
      if (fig) fig.g.remove();
      fig = ana(c, svg, { B: [80, 400], p: simdiki, k: 10 - simdiki, olcek: 44, etiket: { p: 'p', k: 'k', h: 'h' } });
      gizle(fig.dik.H2);
      if (simdiki === 9) { fig.etiket.h.setAttribute('text-anchor', 'end'); fig.etiket.h.setAttribute('x', fig.A[0] - 22); }   // dar CAH içinde h, AC çizgisine değerdi
      [simdiki, ...v].forEach((x, i) => yaz(sat[i], ETIK[i], x, i === 2 || i === 3 ? renk : null));
    };
    guncelle(4);
    await belir(c, sat, 450);
    await c.say('H’yi kaydır; h² ile p·k’ya bak.', { noWait: true, speak: 'H’yi kaydır; h kare ile p çarpı k’ya bak.' });
    const sl = c.slider({ label: 'H’nin yeri', min: 1, max: 9, step: 1, value: 4, fmt: () => '', onInput: (v) => { guncelle(v); } });
    await c.cont('Devam ›');
    sl.remove(); c.clearSay();
    await par(c.say('H hipotenüs üzerinde kayarken p ve k değişiyor.'), c.wait(400));
    await par(c.say('h² ile p·k her konumda eşit.', { speak: 'h kare ile p çarpı k her konumda eşit.' }), (async () => { renk = SARI; guncelle(simdiki); await c.wait(500); })());
    await par(c.say('p = 2, k = 8: h = 4, p·k = 16.', { speak: 'p eşittir iki, k eşittir sekiz: h eşittir dört, p çarpı k eşittir on altı.' }), (async () => { guncelle(2); await c.wait(400); })());
    await c.say('Eşit olan h² ile p·k’dir; h ile değil.', { speak: '[thoughtful] Eşit olan h kare ile p çarpı k’dir; h ile değil.' });
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d3', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Öklid teoremi: yüksekliğin karesi', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Öklid teoremi: yüksekliğin karesi',
      hook: 'Dik köşeden karşı kenara inen patika kenarı iki parçaya böler. Patikanın boyu bu <b>iki parçadan</b> bulunabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Dik üçgende hipotenüse inen yüksekliği ve ayırdığı iki parçayı h, p ve k ile adlandırır.', 'İki küçük üçgenin benzerliğinden p/h = h/k oranını çıkarır.', 'h² = p·k bağıntısıyla bilinmeyen bir uzunluğu bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'Tales ile oranı bulmayı ve dik üçgendeki üç benzer üçgeni hatırlar.', run: hatirla },
      { title: 'Üç benzer üçgen ve harfler', goal: 'Yükseklik, p, k, h, a, b ve c adlandırılır.', run: harfler },
      { title: 'Sayılarla bak', goal: 'İki küçük üçgenden p/h = h/k çıkar.', run: sayilarla },
      { title: 'İspat: açılar', goal: 'm(CAH) = m(B) olduğu gösterilir.', run: ispatAcilar },
      { title: 'İspat: benzerlik ve oran', goal: 'Benzerlikten h² = p·k çıkar.', run: ispatBenzerlik },
      { title: 'Abidenin boyu', goal: 'Öklid teoremiyle ulaşılamayan bir boy bulunur.', run: abide },
      { title: 'Çatı', goal: 'h² = p·k ile yükseklik ve parça bulunur.', run: cati },
      { title: 'Dene: H’nin yeri', goal: 'H nereye giderse gitsin h² ile p·k eşittir.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir dik üçgende hipotenüse inen yükseklik h; hipotenüsü p ve k parçalarına ayırıyor. Hangisi doğrudur?',
        options: ['h = p·k', 'h² = p + k', 'h² = p·k'], answer: 2,
        why: ['Çarpım h’nin kendisine değil, karesine eşittir. Örnek: p = 4, k = 9 için p·k = 36 ama h = 6.', 'Toplam değil, çarpım kullanılır. p = 4, k = 9 için p + k = 13, oysa h² = 36.', 'İki küçük üçgenin benzerliğinden p/h = h/k çıkar. İçler dışlar çarpımı h² = p·k verir.'],
        scene: 4,
      },
      {
        q: 'Hipotenüse inen yükseklik hipotenüsü 5 cm ve 20 cm’lik parçalara ayırıyor. Yüksekliği kaç cm’dir?',
        options: ['10 cm', '100 cm', '12,5 cm'], answer: 0,
        why: ['h² = 5·20 = 100 olduğundan h = 10 cm.', '100, h’nin karesidir; yükseklik kendisiyle çarpınca 100 olan sayıdır, yani 10 cm.', '12,5 cm, 5 ile 20’nin toplamının yarısıdır. Oysa h² = 5·20 çarpımına eşittir.'],
        scene: 4,
      },
      {
        q: 'Bir dik üçgende hipotenüse inen yükseklik 12 cm; hipotenüsün parçalarından biri 9 cm. Hipotenüsün tamamı kaç cm’dir?',
        options: ['16 cm', '25 cm', '21 cm'], answer: 1,
        why: ['16 cm öbür parçadır. Hipotenüs iki parçanın toplamıdır: 9 + 16 = 25 cm.', '12² = 9·k olduğundan k = 16. Hipotenüs 9 + 16 = 25 cm.', '21, 9 ile 12’nin toplamıdır; oysa yükseklik hipotenüsün bir parçası değildir.'],
        scene: 6,
      },
      {
        q: 'Efe, kitabının dik köşesini gözüne tutup bir kulenin tepesini ve tabanını görüyor. Gözü yerden 1,5 m yüksekte ve kuleye 6 m uzakta. Kulenin boyu kaç metredir?',
        options: ['24 m', '9 m', '25,5 m'], answer: 2,
        why: ['24 m gözün üstünde kalan parçadır. Kulenin boyu 1,5 + 24 = 25,5 m.', '9, 6 ile 1,5’in çarpımıdır; oysa h² = p·k ve h = 6.', '6² = 1,5·k olduğundan k = 24 m. Boy 1,5 + 24 = 25,5 m.'],
        scene: 5,
      },
      {
        q: 'İspatta ABH ve CAH üçgenlerinin benzer olduğu hangi koşulla gösterildi?',
        options: ['Açı-Açı: H’de dik açılar ve m(B) = m(CAH)', 'Kenar-Kenar-Kenar', 'Kenar-Açı-Kenar'], answer: 0,
        why: ['İki üçgende de H’de dik açı var ve m(B) = m(CAH). İki açı eşit olduğundan Açı-Açı.', 'Kenar uzunlukları ispatın başında bilinmiyordu. Kenarlar benzerlikten sonra oranlandı.', 'İspatta hiçbir kenar uzunluğu verilmedi. Benzerlik yalnızca açılarla gösterildi.'],
        scene: 3,
      },
    ],
    summary: [
      'Dik köşeden inen yükseklik hipotenüsü p ve k parçalarına ayırır.',
      'İki küçük üçgenin benzerliğinden p/h = h/k çıkar.',
      'h² = p·k; bu bağıntı Öklid teoremidir.',
      '<b>Yüksekliğin karesi, iki parçanın çarpımıdır.</b>',
    ],
    nextLesson: { href: 'd4-oklid-dik-kenar.html', label: 'Sonraki: Öklid teoremi: dik kenarın karesi ›' },
  });
})();
