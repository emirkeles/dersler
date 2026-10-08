/* A5 — Dış açı, uzaktaki iki iç açının toplamıdır
   Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir. İki ispat: iç açılar toplamından ve
   C'den AB'ye çizilen paralelden (iç ters ve yöndeş açılar); ikisi karşılaştırılır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md ("Pilot" bölümü).
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, yon, ileri, ara, kisa, orta, tepe, yazi, renkli, parcaKoy, cizgi, koy, gizle, belir, par, cevapla, dilim, ucgen, disAci, adimlar, tepeKontrol } = window.KIT;
  const { ease } = Ders;
  const R = 42;

  /* Sözü edilen açı dilimlerini bir kez parlatır. */
  const parlat = async (c, ...ds) => {
    await c.tween(260, (e) => ds.forEach((d) => d.el.setAttribute('fill-opacity', 0.55 + 0.4 * e)));
    await c.tween(260, (e) => ds.forEach((d) => d.el.setAttribute('fill-opacity', 0.95 - 0.4 * e)));
  };
  /* İspat satırını parçalarının renginde yazar; parçaları (tspan) döndürür. */
  const renklendir = (c, s, parcalar) => { parcaKoy(c, s.ifade, parcalar); return [...s.ifade.querySelectorAll('tspan')]; };
  /* Tek üçgenlik soru tahtası: dönen işlev öncekini siler, açılara göre yeni üçgeni çizer.
     etiket: A, B, C köşelerine yazılanlar (verilenler ve aranan '?'); disEtiket verilirse C'de dış açı çizilir. */
  const soruTahtasi = (c, svg) => {
    let sahne = null;
    return async (beta, gama, bc, etiket, disEtiket) => {
      if (sahne) { await belir(c, sahne, 250, 0); sahne.remove(); }
      sahne = c.S('g', {}, svg);
      const cx = disEtiket == null ? 500 : 440;   // dış açı varsa uzantıya yer kalır
      const B = [cx - bc / 2, 440], C = [cx + bc / 2, 440], A = tepe(B, C, beta, gama);
      const dis = disEtiket == null ? null : disAci(c, sahne, C, B, A, { uzun: 170, size: 26 });
      const u = ucgen(c, sahne, A, B, C, { olcu: etiket, olcuSize: 26 });
      if (dis) dis.yaz(disEtiket);
      gizle(sahne); await belir(c, sahne, 350);
      return { g: sahne, u, dis };
    };
  };

  /* ---- 1. Hatırla: iç açı ile dış açı (A4), iç açılar toplamı (A3) ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), kur = soruTahtasi(c, svg);
    let s = await kur(45, 80, 300, ['', '', '80°'], '?');
    await c.say('Başlamadan önce iki şeyi hatırlayalım.', { noWait: true });
    await c.choice({
      tag: 'Hatırla', q: 'C köşesindeki iç açı 80°. Aynı köşedeki dış açı kaç derece?',
      options: ['100°', '280°', '80°'], answer: 0,
      hints: ['', 'Dış açı köşenin bütün dışı değildir; iç açıyla birlikte 180° eder.', 'İç açı ile dış açı eşit olmak zorunda değildir; birlikte 180° ederler.'],
      right: '180° − 80° = 100°.',
    });
    cevapla(s.dis.yazi, '100°');
    await c.wait(600);

    s = await kur(65, 80, 220, ['35°', '65°', '?']);
    await c.choice({
      tag: 'Hatırla', q: 'Üçgenin iki iç açısı 35° ve 65°. Üçüncü açı kaç derece?',
      options: ['100°', '90°', '80°'], answer: 2,
      hints: ['100°, verilen iki açının toplamıdır; üç iç açı birlikte 180° eder.', 'Üç iç açının toplamı 180°dir; 35° + 65° + 90° bunu aşar.', ''],
      right: '180° − 35° − 65° = 80°.',
    });
    cevapla(s.u.olculer[2], '80°');
    await c.say('Bu iki bilgi bugünkü ispatın dayanağı olacak.');
  }

  /* ---- 2. Hangi açılar? Komşu ve komşu olmayan iç açılar; uzak ikisi dış açıyı doldurur ---- */
  async function hangiAcilar(c) {
    const svg = c.svg(1000, 562);
    const B = [300, 440], C = [620, 440], A = tepe(B, C, 60, 70);
    const dis = disAci(c, svg, C, B, A, { uzun: 170 });
    const u = ucgen(c, svg, A, B, C, { olcu: 'derece' });
    dis.yaz('110°');
    const kB = dilim(c, svg, B, C, A, RENK.B, R, { dolgu: 0.8 }), kA = dilim(c, svg, A, B, C, RENK.A, R, { dolgu: 0.8 });
    const ad = (x, y, m, renk, hiza) => yazi(c, svg, x, y, m, { size: 20, kalin: 600, renk, hiza });
    const nD = ad(C[0] + 100, C[1] - 20, 'dış açı', RENK.dis, 'start'), nC = ad(C[0] - 14, C[1] + 34, 'komşu', RENK.C, 'end');
    const nA = ad(A[0] + 30, A[1] + 24, 'uzak', RENK.A, 'start'), nB = ad(B[0] - 26, B[1] - 26, 'uzak', RENK.B, 'end');
    const esit = renkli(c, svg, 500, 528, [['110°', RENK.dis], ' = ', ['50°', RENK.A], ' + ', ['60°', RENK.B]], { size: 32, kalin: 700 });
    koy(dis.uzanti, C, C);
    gizle(kB.el, kA.el, dis.dilim.el, dis.yazi, u.olculer, nD, nC, nA, nB, esit);

    // Anlat: dış açı, komşu iç açı ve komşu olmayan (uzak) iç açılar çizimde adlandırılır; sonra ölçüler.
    await par(c.say('Köprünün kafesinden bir üçgen alıp BC kenarını uzatıyoruz.'), (async () => {
      await c.wait(700);
      await c.tween(900, (e) => koy(dis.uzanti, C, ileri(C, 0, 170 * e)), ease.inOut);
    })());
    await par(c.say('Uzantı ile AC arasındaki sarı açı, C’deki <b>dış açı</b>.', { speak: 'Uzantı ile AC arasındaki sarı açı, C köşesindeki dış açı.' }), belir(c, [dis.dilim.el, nD], 450));
    await par(c.say('Onunla aynı köşeyi paylaşan iç açı, <b>komşu iç açı</b>.'), (async () => { await belir(c, nC, 350); await parlat(c, u.dilimler[2]); })());
    await par(c.say('Öbür iki iç açı uzakta: bunlar <b>komşu olmayan</b> iç açılar.'), (async () => { await belir(c, [nA, nB], 350); await parlat(c, u.dilimler[0], u.dilimler[1]); })());
    await par(c.say('Şimdi dört açının ölçüsüne bak.'), belir(c, [...u.olculer, dis.yazi], 450));

    // Tahmin: durum ve adlar tanıtıldıktan sonra.
    await c.choice({
      tag: 'Tahmin et', q: 'C’deki dış açı 110°. İçerideki hangi açılarla ilgili?',
      options: ['Komşu iç açının iki katı: 70° · 2', 'Uzaktaki iki iç açının toplamı: 50° + 60°', 'Üç iç açının toplamı'], answer: 1,
      hints: ['70° · 2 = 140°; tutmuyor.', '', 'Üç iç açının toplamı 180°; dış açı 110°.'],
      right: '50° + 60° = 110°.',
    });
    await par(c.say('Uzaktaki iki açıyı dış açının içine taşıyoruz.'), (async () => {
      kB.el.style.opacity = 1;
      const b0 = yon(B, C), bd = kisa(yon(B, A) - b0);
      await c.tween(1100, (e) => kB.yon(b0, bd, ara(B, C, e), R), ease.inOut);
      kA.el.style.opacity = 1;
      const a0 = yon(A, B), ad0 = kisa(yon(A, C) - a0);
      await c.tween(1200, (e) => kA.yon(a0 + Math.PI * e, ad0, ara(A, C, e), R), ease.inOut);
    })());
    await par(c.say('İkisi birlikte dış açıyı tam dolduruyor.'), belir(c, esit, 400));
    await c.say('<b>Dış açı</b>, kendisine komşu olmayan iki iç açının toplamı.', { speak: 'Dış açı, [short pause] kendisine komşu olmayan iki iç açının toplamı.' });
  }

  /* ---- 3. İspat: iki bilinen toplamdan önerme çıkar ---- */
  async function ispat(c) {
    const svg = c.svg(1000, 562);
    const B = [100, 440], C = [420, 440], A = tepe(B, C, 60, 70);
    const duz = cizgi(c, svg, B, ileri(C, 0, 150), RENK.dis, 12, { 'stroke-opacity': 0.25 });
    const dis = disAci(c, svg, C, B, A, { uzun: 150 });
    const u = ucgen(c, svg, A, B, C, { harf: false, olcu: ['α', 'β', 'γ'] });
    dis.yaz('dış'); gizle(duz);
    const liste = adimlar(c, svg, 660, 150, { size: 28, aralik: 100 });
    const a1 = liste.ekle('', 'doğru açı'), a2 = liste.ekle('', ''), a3 = liste.ekle('', '');
    const g1 = renklendir(c, a1, [['γ', RENK.C], ' + ', ['dış', RENK.dis], ' = 180°'])[0];
    const g2 = renklendir(c, a2, [['α', RENK.A], ' + ', ['β', RENK.B], ' + ', ['γ', RENK.C], ' = 180°'])[4];
    renklendir(c, a3, [['dış', RENK.dis], ' = ', ['α', RENK.A], ' + ', ['β', RENK.B]]);
    a2.gerekce('?', RENK.dis);

    // Anlat: tek üçgende görülen eşitlik her üçgen için ispatlanacak; ölçülerin yerini harfler alır.
    await c.say('Eşitliği tek bir üçgende gördük; şimdi her üçgen için ispatlayalım.');
    await c.say('Ölçü yerine harf yazdık: açılar her değeri alabilir.', { speak: '[thoughtful] Ölçü yerine harf yazdık: açılar her değeri alabilir.' });
    // Birinci adım gerekçesiyle tahtada verilir.
    await par(c.say('Önce dış açının köşesi: kenar ile uzantısı tek bir doğru.'), belir(c, duz, 400));
    await par(c.say('γ ile dış açı bu doğru açıyı doldurur.', { speak: 'Gama ile dış açı bu doğru açıyı doldurur.' }), belir(c, a1.g, 400));
    // Birlikte çöz: ikinci adım tahtada, gerekçesini öğrenci tamamlar.
    await par(c.say('Şimdi üçgenin içi: üç iç açıyı topluyoruz.'), (async () => {
      await belir(c, duz, 300, 0);
      for (const d of u.dilimler) await parlat(c, d);
      await belir(c, a2.g, 400);
    })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'α + β + γ = 180°. Bu adımın gerekçesi nedir?',
      options: ['Dış açıların toplamı 360°dir', 'Kenar ile uzantısı bir doğrudur: doğru açı', 'İç açıların toplamı 180°dir: bunu ispatlamıştık'], answer: 2,
      hints: ['Burada dış açıları değil, üç iç açıyı topladık.', 'Doğru açı ilk adımın gerekçesiydi; üç iç açı tek bir doğruda durmuyor.', ''],
      right: 'İspatlanmış bir önerme artık dayanak olur.',
    });
    a2.gerekce('iç açılar', RENK.iyi);
    await par(c.say('İki toplam da 180°: öyleyse birbirine eşitler.', { speak: 'İki toplam da yüz seksen derece: öyleyse birbirine eşitler.' }), (async () => {
      await belir(c, [a1.g, a2.g], 300, 0.35); await belir(c, [a1.g, a2.g], 300, 1);
    })());
    await par(c.say('İkisinde de γ var; iki toplamdan da onu çıkaralım.', { speak: 'İkisinde de gama var; iki toplamdan da onu çıkaralım.' }),
      (async () => {
        [g1, g2].forEach((t) => { t.style.textDecoration = 'line-through'; });   // üstü çizilir, sonra solar
        await c.tween(600, (e) => [g1, g2].forEach((t) => { t.style.fillOpacity = 1 - 0.55 * e; }));
      })());
    await par(c.say('Geriye kalanlar da birbirine eşit.'), belir(c, a3.g, 450));
    c.note('<b>dış açı = α + β</b><br>Örnek: 50° + 60° = 110°', 'Dış açı', 'gs-dis-aci');
    await c.say('İspat tamam: önerme artık her üçgen için doğru.');
  }

  /* ---- 4. İkinci yol: paralel ---- */
  async function ikinciYol(c) {
    const svg = c.svg(1000, 562);
    const B = [100, 440], C = [420, 440], A = tepe(B, C, 60, 70), tAB = yon(B, A), D = ileri(C, 0, 150), E = ileri(C, tAB, 290);
    const iz = c.S('polyline', { points: [B, A, C, E].map((q) => q.join(',')).join(' '), fill: 'none', stroke: RENK.A, 'stroke-width': 12, 'stroke-opacity': 0.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    const dg = c.S('g', {}, svg), d = cizgi(c, dg, C, C, RENK.paralel, 3);
    const dAd = yazi(c, dg, E[0] + 22, E[1] + 4, 'd', { size: 24, kalin: 700, renk: RENK.paralel });
    disAci(c, svg, C, B, A, { uzun: 150 });
    const u = ucgen(c, svg, A, B, C, { olcu: ['α', 'β', 'γ'] });
    const kA = dilim(c, svg, A, B, C, RENK.A, R, { dolgu: 0.8 }), kB = dilim(c, svg, B, C, A, RENK.B, R, { dolgu: 0.8 });
    const ad = (V, P, Q, m, renk) => { const y = ileri(V, orta(V, P, Q), R + 22); return yazi(c, svg, y[0], y[1] + 8, m, { size: 22, kalin: 700, renk }); };
    const aAd = ad(C, E, A, 'α', RENK.A), bAd = ad(C, D, E, 'β', RENK.B);
    gizle(iz, dAd, kA.el, kB.el, aAd, bAd);
    const liste = adimlar(c, svg, 660, 120, { size: 28, aralik: 96 });
    const a1 = liste.ekle('d // AB', 'tek paralel'), a2 = liste.ekle('α eşi', ''), a3 = liste.ekle('β eşi', ''), a4 = liste.ekle('dış = α + β', '');
    a2.gerekce('?', RENK.dis); a3.gerekce('?', RENK.dis);
    /* Hatırlatma: iki paralel ve bir kesen. Sabit dilim P1'de; eşi çiftine göre P2'de yer değiştirir. */
    const h = c.S('g', {}, svg), P1 = [776.4, 290], P2 = [853.6, 430], altUc = [895, 505];
    cizgi(c, h, [640, 290], [950, 290], RENK.paralel, 3); cizgi(c, h, [640, 430], [950, 430], RENK.paralel, 3);
    cizgi(c, h, [735, 215], altUc, RENK.cizgi, 3);
    dilim(c, h, P1, [P1[0] + 100, 290], P2, RENK.cizgi, 36);
    const es = dilim(c, h, P2, [P2[0] - 100, 430], P1, RENK.cizgi, 36);
    const cift = yazi(c, h, 880, 240, '', { size: 26, kalin: 700 });
    gizle(h, es.el, cift);
    const goster = async (P, Q, m) => {
      await belir(c, [es.el, cift], 250, 0);
      es.ciz(P2, P, Q); cift.textContent = m;
      await belir(c, [es.el, cift], 400);
    };

    await c.say('Aynı önermeyi bu kez başka bir yoldan ispatlayalım.');
    await par(c.say('C’den AB’ye paralel d doğrusunu çiziyoruz.', { speak: 'C köşesinden AB kenarına paralel d doğrusunu çiziyoruz.' }), (async () => {
      await c.tween(900, (e) => koy(d, ileri(C, tAB, -100 * e), ileri(C, tAB, 290 * e)), ease.inOut);
      await belir(c, dAd, 300); await belir(c, a1.g, 400);
    })());
    await c.say('Paralel, dış açıyı iki parçaya ayırdı.');
    // Anlat: iki sorunun da gerektirdiği bilgi (iç ters ve yöndeş açılar) sorulardan önce hatırlatılır.
    await par(c.say('Parçaları tanımak için hatırla: bir kesen iki paraleli kesiyor.'), belir(c, h, 450));
    await par(c.say('Paralellerin arasında, kesenin zıt yanlarındaki açılar: <b>iç ters</b>.'), goster([P2[0] - 100, 430], P1, 'iç ters'));
    await par(c.say('Kesenin aynı yanında, aynı konumdaki açılar: <b>yöndeş</b>.'), goster([P2[0] + 100, 430], altUc, 'yöndeş'));
    await c.say('İki çiftte de açılar birbirine eşittir.');
    await belir(c, h, 400, 0); h.remove();

    await par(c.say('Önce A’daki açı: AC keseni boyunca C’ye taşınıyor.'), (async () => {
      await belir(c, iz, 400); kA.el.style.opacity = 1;
      const a0 = yon(A, B), sw = kisa(yon(A, C) - a0);
      await c.tween(1200, (e) => kA.yon(a0 + Math.PI * e, sw, ara(A, C, e), R), ease.inOut);
      await belir(c, aAd, 300); await belir(c, a2.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'α ile C’deki mavi açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 1,
      hints: ['Yöndeş açılar kesenin aynı yanında durur; bunlar AC’nin zıt yanlarında.', '', 'Ters açılar aynı köşede durur; bunların köşeleri farklı.'],
      right: 'AB // d ve kesen AC: iç ters açılar eşittir.',
    });
    a2.gerekce('iç ters', RENK.iyi);
    await belir(c, iz, 300, 0);
    await par(c.say('Şimdi B’deki açı: BC keseni boyunca C’ye kayıyor.'), (async () => {
      kB.el.style.opacity = 1;
      const b0 = yon(B, C), sw = kisa(yon(B, A) - b0);
      await c.tween(1100, (e) => kB.yon(b0, sw, ara(B, C, e), R), ease.inOut);
      await belir(c, bAd, 300); await belir(c, a3.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'β ile C’deki turuncu açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 0,
      hints: ['', 'İç ters açılar kesenin zıt yanlarında durur; bunlar BC’nin aynı yanında.', 'Ters açılar aynı köşede durur; bunların köşeleri farklı.'],
      right: 'AB // d ve kesen BC: yöndeş açılar eşittir.',
    });
    a3.gerekce('yöndeş', RENK.iyi);
    await belir(c, u.harfler, 300, 0);   // kesenler adlandırıldı; köşe harfleri son satıra yer açar
    await par(c.say('İki parça birlikte dış açının tamamı: ispat tamam.'), belir(c, a4.g, 450));
    await c.say('İki ispat aynı sonuca vardı; şimdi dayanaklarını karşılaştır.');
    await c.choice({
      tag: 'Karşılaştır', q: 'İki ispatın dayanakları nasıl?',
      options: ['İkisi de ölçüme dayanıyor', 'İlki iç açılar toplamına, ikincisi paralel doğruya dayanıyor', 'İkisi de aynı adımları kullanıyor'], answer: 1,
      hints: ['İkisinde de ölçüm yok; her adımın bir gerekçesi var.', '', 'İlkinde paralel doğru yoktu; ikincisinde iç açılar toplamı yok.'],
      right: 'Aynı önerme, iki ayrı dayanak; ikisi de ispat.',
    });
    await c.say('Bir önermenin birden çok ispatı olabilir.');
  }

  /* ---- 5. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const B = [180, 430], C = [520, 430], A0 = [400, 150];
    const dis = disAci(c, svg, C, B, A0, { uzun: 170 }), disB = disAci(c, svg, B, A0, C, { uzun: 110 });
    const u = ucgen(c, svg, A0, B, C, { olcu: 'derece' });
    const esit = renkli(c, svg, 500, 524, [''], { size: 32, kalin: 700 });
    gizle(disB.g);
    const ciz = (P) => {
      u.koy(P, B, C); dis.ciz(C, B, P); disB.ciz(B, P, C);
      const [a, b] = u.D(); dis.yaz((a + b) + '°');
      parcaKoy(c, esit, [[(a + b) + '°', RENK.dis], ' = ', [a + '°', RENK.A], ' + ', [b + '°', RENK.B]]);
    };
    ciz(A0);
    await c.say('İspat her üçgeni kapsar: tepe köşesi nerede olursa olsun.');
    await c.say('Tepe köşesini gezdir: dış açı toplamı izliyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [140, 600], y: [110, 300], bas: A0, ciz });
    await c.cont('Devam ›');
    t.kaldir();
    u.harfler[1].setAttribute('x', B[0] - 28); u.harfler[1].setAttribute('y', B[1] - 6);   // B harfi dış açının altında kalmasın
    // Sor: önerme başka bir köşeye uygulanır.
    await par(c.say('Aynı önerme öbür köşelerde de geçerli: şimdi B’ye bak.', { speak: 'Aynı önerme öbür köşelerde de geçerli: şimdi B köşesine bak.' }), (async () => { await belir(c, [dis.g, esit], 300, 0.2); await belir(c, disB.g, 400); })());
    await c.choice({
      tag: 'Sıra sende', q: 'B’deki dış açı hangi iki iç açının toplamıdır?',
      options: ['A ve B’deki açıların', 'A ve C’deki açıların', 'B ve C’deki açıların'], answer: 1,
      hints: ['B’deki iç açı komşudur; uzak olan öbür ikisi.', '', 'B’deki iç açı komşudur; uzak olan öbür ikisi.'],
      right: 'Komşu olmayan iki açı: A ve C’dekiler.',
    });
    const [a, , g] = u.D(); disB.yaz((a + g) + '°');
    parcaKoy(c, esit, [[(a + g) + '°', RENK.dis], ' = ', [a + '°', RENK.A], ' + ', [g + '°', RENK.C]]);
    await par(c.say('Her dış açı, uzağındaki iki iç açının toplamıdır.'), belir(c, esit, 350, 1));
  }

  /* ---- 6. Sıra sende: çözülmüş örnek, yarısı çözülmüş örnek, tek başına soru ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562), kur = soruTahtasi(c, svg);
    /* Üçgenin sağına yazılan işlem satırı. */
    const satir = (g, i, parcalar) => { const t = renkli(c, g, 660, 170 + i * 70, parcalar, { hiza: 'start', size: 30, kalin: 700 }); gizle(t); return t; };

    // Örnek: baştan sona tahtada çözülür.
    let s = await kur(55, 50, 340, ['75°', '?', ''], '130°');
    const o1 = satir(s.g, 0, [['130°', RENK.dis], ' = ', ['75°', RENK.A], ' + ', ['?', RENK.B]]);
    const o2 = satir(s.g, 1, [['?', RENK.B], ' = ', ['130°', RENK.dis], ' − ', ['75°', RENK.A]]);
    const o3 = satir(s.g, 2, [['?', RENK.B], ' = ', ['55°', RENK.iyi]]);
    await c.say('Bir örnek: dış açı ve uzak açılardan biri verilmiş.');
    await par(c.say('Aranan, B’deki öbür uzak açı.', { speak: 'Aranan, B köşesindeki öbür uzak açı.' }), parlat(c, s.u.dilimler[1]));
    await par(c.say('Dış açı iki uzak açının toplamıdır: eşitliği yazalım.'), belir(c, o1, 400));
    await par(c.say('Bilinmeyeni bulmak için dış açıdan bilinen açıyı çıkarırız.'), (async () => {
      await belir(c, o2, 400); await c.wait(900);
      await belir(c, o3, 400); cevapla(s.u.olculer[1], '55°');
    })());
    await c.wait(700);

    // Birlikte çöz: toplam tahtada kurulur, sonucu öğrenci bulur.
    s = await kur(85, 55, 250, ['40°', '85°', ''], '?');
    const b1 = satir(s.g, 0, [['dış', RENK.dis], ' = ', ['40°', RENK.A], ' + ', ['85°', RENK.B]]);
    await c.say('Sıradaki üçgende iki iç açı verilmiş; dış açı soruluyor.');
    await par(c.say('İkisi de dış açıya uzak; öyleyse toplarız.'), belir(c, b1, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'dış = 40° + 85°. Dış açı kaç derece?',
      options: ['55°', '125°', '235°'], answer: 1,
      hints: ['55°, C’deki iç açıdır; sorulan dış açı.', '', 'Bir dış açı doğru açıdan (180°) küçüktür.'],
      right: '40° + 85° = 125°.',
    });
    cevapla(s.dis.yazi, '125°');
    parcaKoy(c, b1, [['dış', RENK.dis], ' = ', ['40°', RENK.A], ' + ', ['85°', RENK.B], ' = ', ['125°', RENK.iyi]]);
    await c.wait(700);

    // Sor: öğrenci tek başına.
    s = await kur(50, 60, 340, ['', '', '?'], '120°');
    const t1 = satir(s.g, 0, [['120°', RENK.dis], ' + ', ['60°', RENK.iyi], ' = 180°']);
    await c.say('Son üçgende dış açı verilmiş; komşu iç açı soruluyor.');
    await c.choice({
      tag: 'Sıra sende', q: 'Dış açı 120°. Hemen yanındaki (komşu) iç açı kaç derece?',
      options: ['120°', '240°', '60°'], answer: 2,
      hints: ['İkisi eşit değil; birlikte bir doğru açı ederler.', 'Bir iç açı 180°’den küçüktür.', ''],
      right: '180° − 120° = 60°.',
    });
    cevapla(s.u.olculer[2], '60°');
    await par(c.say('Uzak iki açı toplanır; komşu açı 180°’ye tamamlar.', { speak: '[thoughtful] Uzak iki açı toplanır; komşu açı yüz seksen dereceye tamamlar.' }), belir(c, t1, 400));
  }

  Ders.start({
    id: 'geometrik-sekiller-a5', kicker: 'Konu A · Açılar ve ispat', title: 'Dış açı, uzaktaki iki iç açının toplamıdır', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dış açı, uzaktaki iki iç açının toplamıdır',
      hook: 'Çelik bir köprünün üçgen kafesinde <b>dışarı bakan</b> bir açıyı ölçtün. İçerideki hangi açılarla ilgilidir?',
      button: 'Derse başla ›',
    },
    goals: ['Bir dış açının komşu ve komşu olmayan iç açılarını ayırt eder.', 'Bir dış açının, komşu olmayan iki iç açının toplamına eşit olduğunu ispatlar.', 'Önermeyi paralel doğruyla ikinci kez ispatlar; iki ispatı karşılaştırır.', 'Önermeyi kullanarak bilinmeyen açıyı bulur.'],
    scenes: [
      { title: 'Hatırla', goal: 'İç açı ile dış açıyı ve iç açılar toplamını hatırla.', run: hatirla },
      { title: 'Hangi açılar?', goal: 'Komşu ve uzak iç açıları ayır; uzak ikisi dış açıyı doldurur.', run: hangiAcilar },
      { title: 'İspat', goal: 'İki bilinen toplamdan önermeyi çıkar; ikinci gerekçeyi tamamla.', run: ispat },
      { title: 'İkinci yol: paralel', goal: 'Aynı önermeyi paralel doğruyla ispatla; iki yolu karşılaştır.', run: ikinciYol },
      { title: 'Dene', goal: 'Üçgen değişse de eşitliğin sürdüğünü gör.', run: dene },
      { title: 'Sıra sende', goal: 'Bir örneği izle, birini birlikte, birini tek başına çöz.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgenin iki iç açısı 40° ve 75°. Üçüncü köşedeki dış açı kaç derecedir?',
        options: ['65°', '115°', '245°'], answer: 1,
        why: ['65°, üçüncü köşedeki iç açıdır.', '40° + 75° = 115°.', 'Bir dış açı 180°’den küçüktür.'],
        scene: 1,
      },
      {
        q: 'Dersteki ilk ispat hangi iki bilgiye dayandı?',
        options: ['Doğru açı 180° ve iç açılar toplamı 180°', 'Dış açılar toplamı 360° ve tek paralel', 'İç ters açılar ve yöndeş açılar'], answer: 0,
        why: ['γ + dış = 180° (doğru açı) ve α + β + γ = 180° (iç açılar).', 'İkisi de ilk ispatta kullanılmadı.', 'İç ters ve yöndeş açılar ikinci yolun dayanağıydı.'],
        scene: 2,
      },
      {
        q: 'Bir dış açı 140°, ona uzak iç açılardan biri 60°. Öbür uzak iç açı kaç derecedir?',
        options: ['40°', '200°', '80°'], answer: 2,
        why: ['40°, komşu iç açıdır: 180° − 140°.', '140° iki uzak açının toplamıdır; bilinen açı ondan çıkarılır.', '140° − 60° = 80°.'],
        scene: 5,
      },
      {
        q: 'ABC üçgeninde C köşesindeki dış açı, hangi iki iç açının toplamına eşittir?',
        options: ['B ve C’deki açıların', 'A ve B’deki açıların', 'A ve C’deki açıların'], answer: 1,
        why: ['C’deki iç açı komşudur; toplama girmez.', 'Komşu olmayan iki iç açı A ve B’dekilerdir.', 'C’deki iç açı dış açıyla 180° eder; toplama uzak iki açı girer.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Dış açı, uzaktaki iki iç açının toplamıdır.</b>',
      'İspat: γ + dış = 180° ve α + β + γ = 180°; öyleyse <b>dış = α + β</b>.',
      'İkinci yol: C’den AB’ye paralel; <b>iç ters</b> ve <b>yöndeş</b> açılar dış açıyı doldurur.',
      'İspatlanmış bir önerme (iç açılar toplamı) yeni bir ispatın dayanağı oldu.',
    ],
    nextLesson: { href: 'a6-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
