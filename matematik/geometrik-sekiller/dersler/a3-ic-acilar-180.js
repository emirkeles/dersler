/* A3 — İç açıların toplamı 180°dir
   Tepe köşesinden karşı kenara çizilen tek paralel, üç açıyı bir doğru açıda yan yana getirir.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md ("Pilot" bölümü).
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, rad, yon, ileri, ara, kisa, yazi, renkli, parcaKoy, cizgi, koy, nokta, kutu, gizle, belir, par, dilim, ucgen, adimlar, tepeKontrol, tepe, cevapla, paralelDuzen: duzen, aciTasi: tasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* ---- 0. Hatırla: ispat neye dayanır (A2), ölçmek nedir (A1) ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    /* Taş: içinde tek bilgi yazan kutu (A2'deki duvarın taşı). */
    const tas = (p, x, y, w, metin, size = 21) => {
      const g = c.S('g', {}, p);
      kutu(c, g, x, y, w, 80, { rx: 8 }); yazi(c, g, x + w / 2, y + 40 + size * 0.35, metin, { size, kalin: 600 });
      gizle(g); return g;
    };
    const duvar = c.S('g', {}, svg);
    const ust = tas(duvar, 290, 160, 420, 'İç açılar toplamı 180°', 26);
    const alt = ['Doğru açı 180°dir', 'İç ters açılar eşittir', 'Bir noktadan tek paralel'].map((m, i) => tas(duvar, 20 + i * 330, 252, 300, m));
    const dayanak = yazi(c, duvar, 500, 412, '?', { size: 28, kalin: 700, renk: RENK.dis });
    gizle(dayanak);

    await c.say('Başlamadan önce iki şeyi hatırlayalım.');
    await par(c.say('Önceki derste bir ispatı taş duvar gibi kurduk.'), (async () => {
      await belir(c, ust, 400);
      for (const a of alt) { await belir(c, a, 300); await c.wait(150); }
    })());
    await par(c.say('Üstteki önerme, alttaki üç bilgiye dayanıyor.'), belir(c, dayanak, 350));
    await c.choice({
      tag: 'Hatırla', q: 'Bir ispatta kullanılan her bilgi nasıl olmalı?',
      options: ['Yeni ölçülmüş', 'Doğruluğundan emin olunan', 'Çoğunluğun kabul ettiği'], answer: 1,
      hints: ['Ölçüm yalnızca örnek verir; ispat doğruluğundan emin olunan bilgiye dayanır.', '', 'Çoğunluk da yanılabilir; ispat doğruluğundan emin olunan bilgiye dayanır.'],
      right: 'Evet. İspatın her adımı sağlam bir bilgiye basar.',
    });
    cevapla(dayanak, 'doğruluğundan emin olunan bilgiler');
    await c.wait(900);
    await belir(c, duvar, 350, 0); duvar.remove();

    /* A1'in üç maketi: açılar ölçülmüş, altlarında toplam. */
    const maket = c.S('g', {}, svg);
    [[[170, 170], [70, 350], [290, 350]], [[520, 150], [400, 350], [620, 350]], [[800, 190], [720, 350], [930, 350]]].forEach((k) => {
      ucgen(c, maket, k[0], k[1], k[2], { harf: false, r: 34 });
      yazi(c, maket, (k[1][0] + k[2][0]) / 2, 408, '180°', { size: 30, kalin: 700 });
    });
    const ad = yazi(c, maket, 500, 478, '?', { size: 28, kalin: 700, renk: RENK.dis });
    const onerme = yazi(c, svg, 500, 64, 'Her üçgende iç açılar toplamı 180°dir.', { size: 30, kalin: 700 });
    gizle(maket, onerme);
    await par(c.say('Bir mimar üç makette ölçmüş, hep 180° bulmuştu.', { speak: 'Bir mimar üç makette ölçmüş, hep yüz seksen derece bulmuştu.' }), belir(c, maket, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Üç üçgende ölçüp 180° bulmak nedir?',
      options: ['İspat', 'Aksiyom', 'Doğrulama'], answer: 2,
      hints: ['İspat bütün üçgenleri kapsar; ölçmek yalnızca ölçülen üçgenleri doğrular.', 'Aksiyom ispatsız kabul edilen temel bilgidir; ölçüp görmek doğrulamadır.', ''],
      right: 'Evet. Ölçmek yalnızca ölçülen üçgenleri doğrular.',
    });
    cevapla(ad, 'doğrulama: ölçülen üç üçgen');
    await par(c.say('Bugün bu genellemeyi bütün üçgenler için ispatlayacağız.'), belir(c, onerme, 450));
  }

  /* ---- 1. Kopar, yan yana koy ---- */
  async function kopar(c) {
    const svg = c.svg(1000, 562);
    const A = [500, 90], B = [250, 380], C = [750, 380], O = [500, 500];
    const u = ucgen(c, svg, A, B, C, { r: 56, harf: false });
    const hat = cizgi(c, svg, [300, 500], [700, 500], RENK.cizgi, 3);
    const koseler = u.dilimler.map((d) => d.el);
    gizle(u.g, koseler, hat);
    const K = [A, B, C], renk = [RENK.A, RENK.B, RENK.C];
    /* her köşe: başlangıç yönü ve süpürme; bitişte O noktasında yan yana (β, α, γ) */
    const bas = K.map((V, i) => { const P = K[(i + 1) % 3], Q = K[(i + 2) % 3], a0 = yon(V, P), s = kisa(yon(V, Q) - a0); return s > 0 ? [a0, s] : [a0 + s, -s]; });
    const son = [Math.PI + bas[1][1], Math.PI, Math.PI + bas[1][1] + bas[0][1]];
    const kopya = K.map((V, i) => { const k = dilim(c, svg, V, V, V, renk[i], 56, { dolgu: 0.75 }); k.yon(bas[i][0], bas[i][1], V, 56); gizle(k.el); return k; });

    // Anlat: durum tanıtılır (ressamın üçgeni, üç renkli köşe, altta bir çizgi).
    await par(c.say('Ressamın kompozisyonu üç köşeli: bir üçgen.'), belir(c, u.g, 450));
    await par(c.say('Üç köşedeki açılar üç renkle işaretli.'), belir(c, koseler, 450));
    await par(c.say('Bu köşeleri koparıp alttaki çizgiye yan yana dizeceğiz.'), belir(c, hat, 400));

    // Tahmin: durum tanıtıldıktan sonra, sezgiyle.
    await c.choice({
      tag: 'Tahmin et', q: 'Üç köşe yan yana gelince ne oluşur?',
      options: ['Bir dik açı', 'Düz bir çizgi', 'Tam bir daire'], answer: 1,
      hints: ['Dik açı 90° eder; üç köşe daha çok yer kaplar.', '', 'Tam daire 360° ister; üç köşe o kadar etmez.'],
      right: 'Üç köşe bir doğrunun üstünü tam doldurur.',
    });
    await par(c.say('Köşeler sırayla çizgiye iniyor.'), (async () => {
      for (const i of [1, 0, 2]) {
        kopya[i].el.style.opacity = 1;
        await c.tween(1000, (e) => kopya[i].yon(bas[i][0] + kisa(son[i] - bas[i][0]) * e, bas[i][1], ara(K[i], O, e), 56), ease.inOut);
      }
    })());
    await c.say('Üç köşe yan yana: tam bir <b>düz çizgi</b>.');
    await c.say('Ama bu tek bir üçgen: yalnızca bir <b>doğrulama</b>.', { speak: '[thoughtful] Ama bu tek bir üçgen: yalnızca bir doğrulama.' });
    await c.say('Bütün üçgenler için ispat gerekir; yardımcımız paralel doğru olacak.');
  }

  /* ---- 2. Tek paralel ---- */
  async function tekParalel(c) {
    const svg = c.svg(1000, 562);
    const A = [400, 180], B = [140, 440], C = [600, 440], P = [720, 520];
    cizgi(c, svg, [40, 440], [960, 440], RENK.ince, 2);
    ucgen(c, svg, A, B, C, { dilim: false });
    /* V'den geçen, döndürülebilen doğru ve BC ile kesişim noktası (tahtanın dışına çıkınca görünmez). */
    const doner = (V) => {
      const hat = cizgi(c, svg, V, V, RENK.cizgi, 3), kes = nokta(c, svg, V, RENK.dis, 8);
      const cevir = (derece) => {
        const t = rad(derece);
        koy(hat, ileri(V, t, -1000), ileri(V, t, 1000));
        const x = Math.abs(derece) < 0.05 ? Infinity : V[0] + (C[1] - V[1]) / Math.tan(t);
        kes.setAttribute('cx', x > 40 && x < 960 ? x : -100); kes.setAttribute('cy', C[1]);
      };
      return { hat, kes, cevir };
    };
    const d = doner(A);
    const ad = yazi(c, svg, 940, 160, 'd // BC', { hiza: 'end', size: 26, kalin: 700, renk: RENK.paralel });
    gizle(ad);
    d.cevir(32);

    // Anlat ve göster: doğru döner; yalnızca bir konumda BC'yi kesmez.
    await c.say('A’dan geçen bir doğru, BC’yi bir noktada kesiyor.', { speak: 'A noktasından geçen bir doğru, BC doğrusunu bir noktada kesiyor.' });
    await par(c.say('Doğruyu döndürdükçe kesişim noktası sağa doğru uzaklaşıyor.'), c.tween(2200, (e) => d.cevir(lerp(32, 16, e)), ease.inOut));
    await par(c.say('Bu konumda ise doğru BC’yi hiç kesmiyor.', { speak: 'Bu konumda ise doğru, BC doğrusunu hiç kesmiyor.' }), (async () => {
      await c.tween(1600, (e) => d.cevir(lerp(16, 0, e)), ease.inOut);
      d.hat.setAttribute('stroke', RENK.paralel);
    })());
    await par(c.say('Hiç kesişmeyen doğrulara <b>paralel</b> doğrular denir.'), belir(c, ad, 350));
    await par(c.say('Biraz daha dönünce doğru BC’yi öbür yandan kesiyor.', { speak: 'Biraz daha dönünce doğru, BC doğrusunu öbür yandan kesiyor.' }), (async () => {
      d.hat.setAttribute('stroke', RENK.cizgi); await belir(c, ad, 250, 0);
      await c.tween(1800, (e) => d.cevir(lerp(0, -39, e)), ease.inOut);
    })());
    await par(c.say('Kesmediği tek konum var: A’dan BC’ye paralel tektir.', { speak: 'Kesmediği tek konum var: [short pause] A noktasından BC doğrusuna paralel tektir.' }), (async () => {
      await c.tween(1800, (e) => d.cevir(lerp(-39, 0, e)), ease.inOut);
      d.hat.setAttribute('stroke', RENK.paralel); await belir(c, ad, 350);
    })());
    c.note('Bir doğruya dışındaki bir noktadan <b>yalnızca bir paralel</b> çizilir.', 'Tek paralel', 'gs-tek-paralel');

    // Sor: kural başka bir noktaya uygulanır.
    const pg = c.S('g', {}, svg), p = doner(P);
    nokta(c, pg, P, RENK.yazi, 7); yazi(c, pg, P[0] + 22, P[1] - 18, 'P', { size: 24, kalin: 700 });
    gizle(pg, p.hat, p.kes); p.cevir(28);
    await par(c.say('Şimdi BC’nin dışında başka bir nokta alalım: P.', { speak: 'Şimdi BC doğrusunun dışında başka bir nokta alalım: P noktası.' }), belir(c, pg, 400));
    await c.choice({
      tag: 'Sıra sende', q: 'P noktasından BC’ye kaç paralel doğru çizilebilir?',
      options: ['Hiç', 'İstediğimiz kadar', 'Yalnızca bir'], answer: 2,
      hints: ['P’den geçen doğru dönerken bir konumda BC’yi kesmez.', 'Öteki bütün konumlarda doğru BC’yi bir yandan keser.', ''],
      right: 'Evet. Nokta değişir, kural değişmez: tek paralel.',
    });
    await par(c.say('P’den geçen doğrulardan da yalnızca biri BC’yi kesmiyor.', { speak: 'P noktasından geçen doğrulardan da yalnızca biri BC doğrusunu kesmiyor.' }), (async () => {
      await belir(c, [p.hat, p.kes], 300);
      await c.tween(2000, (e) => p.cevir(lerp(28, 0, e)), ease.inOut);
      p.hat.setAttribute('stroke', RENK.paralel);
    })());
  }

  /* ---- 3. İç ters açılar ---- */
  async function icTers(c) {
    const svg = c.svg(1000, 562);
    const A = [400, 180], B = [140, 440], C = [600, 440];
    const iz = (noktalar, renk) => { const p = c.S('polyline', { points: noktalar.map((q) => q.join(',')).join(' '), fill: 'none', stroke: renk, 'stroke-width': 12, 'stroke-opacity': 0.3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg); gizle(p); return p; };
    const zB = iz([[A[0] - 190, A[1]], A, B, [B[0] + 190, B[1]]], RENK.B), zC = iz([[A[0] + 190, A[1]], A, C, [C[0] - 190, C[1]]], RENK.C);
    const s = duzen(c, svg, A, B, C);
    gizle(s.bK.el, s.gK.el, s.bAd, s.gAd, s.dg, s.u.g);
    /* Hatırlatma: iki paralel, bir kesen ve üç eş açı çifti. Sabit dilim P1'de; eşi çiftine göre yer değiştirir. */
    const h = c.S('g', {}, svg), P1 = [423.5, 190], P2 = [576.5, 370], ustUc = [330, 80], altUc = [670, 480];
    cizgi(c, h, [150, 190], [850, 190], RENK.paralel, 3); cizgi(c, h, [150, 370], [850, 370], RENK.paralel, 3);
    cizgi(c, h, ustUc, altUc, RENK.cizgi, 3);
    dilim(c, h, P1, [P1[0] + 100, 190], P2, RENK.B, 48);
    const es = dilim(c, h, P2, [P2[0] + 100, 370], altUc, RENK.B, 48);
    const cift = yazi(c, h, 760, 130, '', { size: 34, kalin: 700, renk: RENK.B });
    gizle(es.el);
    const goster = async (V, P, Q, ad) => {
      await belir(c, [es.el, cift], 250, 0);
      es.ciz(V, P, Q); cift.textContent = ad;
      await belir(c, [es.el, cift], 400);
    };

    // Anlat: üç eş açı çifti adlarıyla hatırlatılır.
    await c.say('İki paralel doğruyu kesen üçüncü doğruya <b>kesen</b> denir.');
    await par(c.say('Kesenin aynı yanında, aynı konumdaki açılar: <b>yöndeş</b>.'), goster(P2, [P2[0] + 100, 370], altUc, 'yöndeş'));
    await par(c.say('Paralellerin arasında, kesenin zıt yanlarındakiler: <b>iç ters</b>.'), goster(P2, [P2[0] - 100, 370], P1, 'iç ters'));
    await par(c.say('Aynı köşede karşı karşıya duranlar: <b>ters</b> açılar.'), goster(P1, [P1[0] - 100, 190], ustUc, 'ters'));
    await c.say('Üç çiftte de açılar birbirine eşittir.');
    await belir(c, h, 400, 0); h.remove();

    // Göster: üçgende paralel d ve AB keseni; B'deki açının eşi A'da belirir.
    await belir(c, s.u.g, 400);
    await par(c.say('A’dan BC’ye paralel d doğrusunu çizdik.', { speak: 'A noktasından BC doğrusuna paralel d doğrusunu çizdik.' }), belir(c, s.dg, 500));
    await par(c.say('AB kenarı iki paraleli de kesiyor: bir kesen.', { speak: 'AB kenarı iki paraleli de kesiyor: bir kesen.' }), belir(c, zB, 400));
    await par(c.say('B’deki açıyı kesen boyunca A’ya taşıyalım.', { speak: 'B köşesindeki açıyı kesen boyunca A köşesine taşıyalım.' }), (async () => {
      s.bK.el.style.opacity = 1;
      await tasi(c, s.bK, B, A, C, A); await belir(c, s.bAd, 300);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'B’deki açı ile A’nın solundaki açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 1,
      hints: ['Yöndeş açılar kesenin aynı yanında durur; bunlar zıt yanlarda.', '', 'Ters açılar aynı köşede karşı karşıya durur; bunların köşeleri farklı.'],
      right: 'Paralel iki doğru ve bir kesen: iç ters açılar eşittir.',
    });
    await belir(c, zB, 300, 0);

    // Sor: aynı fikir öbür kesene uygulanır.
    await c.choice({
      tag: 'Sıra sende', q: 'Kesen AC olursa, C’deki açının iç ters eşi nerede belirir?',
      options: ['A’nın sağında, d ile AC arasında', 'A’nın solunda, d ile AB arasında', 'B köşesinde'], answer: 0,
      hints: ['', 'Orası AB keseninin yeri; AC öbür yanda.', 'İç ters açının köşesi öbür paralelin üstündedir: A’da.'],
      right: 'AC keseninin öbür yanında, d’nin altında.',
    });
    await par(c.say('C’deki açının eşi de A’nın sağına yerleşiyor.', { speak: 'C köşesindeki açının eşi de A köşesinin sağına yerleşiyor.' }), (async () => {
      await belir(c, zC, 400); s.gK.el.style.opacity = 1;
      await tasi(c, s.gK, C, A, B, A); await belir(c, s.gAd, 300); await belir(c, zC, 300, 0);
    })());
    await c.say('Böylece üç açı A köşesinde yan yana geldi.');
  }

  /* ---- 4. İspatı tamamla ---- */
  async function tamamla(c) {
    const svg = c.svg(1000, 562);
    const A = [360, 180], B = [100, 440], C = [560, 440];
    const s = duzen(c, svg, A, B, C, { harf: ['A', '', ''], x1: 640 });
    const liste = adimlar(c, svg, 700, 150, { size: 26, aralik: 96 });
    const a1 = liste.ekle('d // BC', 'tek paralel'), a2 = liste.ekle('eş açılar', 'iç ters'), a3 = liste.ekle('β + α + γ = ?', '?');

    // Anlat: ilk iki adım gerekçeleriyle tahtaya gelir.
    await par(c.say('Birinci adım: A’dan BC’ye paralel d doğrusunu çizdik.', { speak: 'Birinci adım: A noktasından BC kenarına paralel d doğrusunu çizdik.' }), belir(c, a1.g, 400));
    await par(c.say('İkinci adım: β ve γ’nın iç ters eşleri A’da.', { speak: 'İkinci adım: beta ve gamanın iç ters eşleri A köşesinde.' }), belir(c, a2.g, 400));
    await par(c.say('A noktasında üç açı yan yana duruyor.'), (async () => {
      for (const k of [s.bK, s.u.dilimler[0], s.gK]) { await c.tween(300, (e) => k.el.setAttribute('fill-opacity', lerp(0.55, 0.95, e))); await c.tween(300, (e) => k.el.setAttribute('fill-opacity', lerp(0.95, 0.55, e))); }
    })());
    await par(c.say('Üçü birlikte d doğrusunun alt yanını boşluksuz kaplıyor.'), belir(c, a3.g, 400));

    // Birlikte çöz: son adımı ve gerekçesini öğrenci tamamlar.
    await c.choice({
      tag: 'Birlikte çöz', q: 'Son adım: A’daki üç açının toplamı kaç derecedir, neden?',
      options: ['90°: bir dik açı ederler', '180°: d bir doğru, üçü bir doğru açıyı doldurur', '360°: A’nın çevresini doldururlar'], answer: 1,
      hints: ['Dik açı d’nin altının yalnızca yarısını kaplar; üçü tamamını kaplıyor.', '', 'Yalnızca d’nin altını dolduruyorlar; üstü boş.'],
      right: 'Doğru açı 180°dir.',
    });
    a3.ifade.textContent = 'β + α + γ = 180°'; a3.gerekce('doğru açı', RENK.iyi);
    await c.say('Üç açı bir doğru açıyı doldurur: toplam <b>180°</b>.', { speak: 'Üç açı bir doğru açıyı doldurur: toplam [short pause] yüz seksen derece.' });
    await c.say('A’daki β ve γ, üçgenin kendi açılarının eşi: ispat tamam.', { speak: 'A’daki beta ve gama, üçgenin kendi açılarının eşi: ispat tamam.' });
    c.note('<b>α + β + γ = 180°</b><br>Her üçgende geçerli.', 'İç açılar toplamı', 'gs-ic-acilar');
  }

  /* ---- 5. Her üçgende ---- */
  async function herUcgende(c) {
    const svg = c.svg(1000, 562);
    const B = [200, 440], C = [700, 440];
    const s = duzen(c, svg, [480, 190], B, C, { olcu: 'derece' });
    gizle(s.bAd, s.gAd);
    const toplam = renkli(c, svg, 500, 520, [''], { size: 32, kalin: 700 });
    const ciz = (P) => { s.koy(P); const [a, b, g] = s.u.D(); parcaKoy(c, toplam, [[b + '°', RENK.B], ' + ', [a + '°', RENK.A], ' + ', [g + '°', RENK.C], ' = 180°']); };
    const git = (P, Q, ms = 2000) => c.tween(ms, (e) => ciz([Math.round(lerp(P[0], Q[0], e)), Math.round(lerp(P[1], Q[1], e))]), ease.inOut);
    ciz([480, 190]);

    // Anlat ve göster: tepe kayınca paralel de eş açılar da onunla gelir.
    await par(c.say('Tepe köşesi kayınca paralel doğru da onunla birlikte kayıyor.'), git([480, 190], [160, 260]));
    await par(c.say('B ve C’deki açıların eşleri yine A’nın iki yanında.', { speak: 'B ve C köşelerindeki açıların eşleri yine A köşesinin iki yanında.' }), git([160, 260], [620, 170]));

    await c.say('Tepe köşesini gezdir: dar, dik, geniş açılı üçgenler dene.', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [120, 800], y: [150, 320], bas: [620, 170], ciz });
    await c.cont('Devam ›');
    t.kaldir();
    await c.choice({
      tag: 'Sıra sende', q: 'İspatın adımlarında üçgenin türünü (dar, dik, geniş açılı) kullandık mı?',
      options: ['Evet, yalnızca dar açılı üçgende çalışır', 'Hayır, adımlar her üçgende aynı'], answer: 1,
      hints: ['Tepeyi sola çekip üçgeni geniş açılı yaptığında adımlardan biri bozuldu mu?', ''],
      right: 'Paralel, iç ters açılar, doğru açı: hiçbiri türe bakmaz.',
    });
    await c.say('Bu yüzden sonuç bütün üçgenler için geçerli: bu bir <b>ispat</b>.');
  }

  /* ---- 6. Sıra sende: çözülmüş örnek, yarısı çözülmüş örnek, tek başına soru ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    let g = null;
    const yeni = async () => { if (g) { await belir(c, g, 300, 0); g.remove(); } g = c.S('g', {}, svg); return g; };
    /* tabandaki ölçüler kenarlara binmesin: dilimin yanına, taban boyunca yazılır */
    const yer = (t, x, y, hiza) => { t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('text-anchor', hiza); };
    const satir = (y, metin, renk) => { const t = yazi(c, g, 600, y, metin, { hiza: 'start', size: 28, kalin: 700, renk }); gizle(t); return t; };

    // Örnek: baştan sona çözülür, soru yok.
    let B = [60, 440], C = [540, 440];
    let u = ucgen(c, await yeni(), tepe(B, C, 60, 30), B, C, { harf: false, olcu: ['3x', '2x', 'x'], olcuSize: 26, r: 46 });
    yer(u.olculer[1], B[0] + 58, B[1] - 14, 'start'); yer(u.olculer[2], C[0] - 92, C[1] - 12, 'end');
    const liste = adimlar(c, g, 600, 170, { size: 28, aralik: 84 });
    const o1 = liste.ekle('x + 2x + 3x = 180°', 'iç açılar toplamı'), o2 = liste.ekle('6x = 180°'), o3 = liste.ekle('x = 30°'), o4 = liste.ekle('3x = 90°');
    o4.ifade.style.fill = RENK.iyi;
    gizle(u.g);
    await par(c.say('Bir üçgenin açıları x, 2x ve 3x.', { speak: 'Bir üçgenin açıları x, iki x ve üç x.' }), belir(c, u.g, 450));
    await c.say('En büyük açıyı arıyoruz: 3x yazan köşe.', { speak: 'En büyük açıyı arıyoruz: üç x yazan köşe.' });
    await par(c.say('İç açıların toplamı 180°dir; üçünü toplayıp 180°’ye eşitleriz.', { speak: 'İç açıların toplamı yüz seksen derecedir; üçünü toplayıp yüz seksen dereceye eşitleriz.' }), belir(c, o1.g, 400));
    await par(c.say('Sol yandaki x’leri toplarız: altı tane x eder.', { speak: 'Sol yandaki x terimlerini toplarız: altı tane x eder.' }), belir(c, o2.g, 400));
    await par(c.say('İki yanı 6’ya böleriz: x bulunur.', { speak: 'İki yanı altıya böleriz: x bulunur.' }), belir(c, o3.g, 400));
    await par(c.say('En büyük açı 3x: 30°’nin üç katı.', { speak: 'En büyük açı üç x: otuz derecenin üç katı.' }), (async () => {
      await belir(c, o4.g, 400);
      ['90°', '60°', '30°'].forEach((m, i) => cevapla(u.olculer[i], m));
    })());
    await c.wait(900);

    // Birlikte çöz: denklem tahtada kurulur, x'i öğrenci bulur.
    B = [40, 450]; C = [500, 450];
    u = ucgen(c, await yeni(), tepe(B, C, 50, 60), B, C, { harf: false, olcu: ['2x − 10°', 'x + 10°', 'x + 20°'], olcuSize: 24, r: 40 });
    /* uzun etiketlerde tepedeki ölçü de dilimin altına iner */
    yer(u.olculer[0], u.K()[0][0], u.K()[0][1] + 112, 'middle'); yer(u.olculer[1], B[0] + 58, B[1] - 14, 'start'); yer(u.olculer[2], C[0] - 58, C[1] - 14, 'end');
    const xler = satir(170, 'x + x + 2x = 4x'), sayilar = satir(250, '10° + 20° − 10° = 20°');
    const denklem = satir(170, '4x + 20° = 180°'), b2 = satir(250, '4x = 160°'), b3 = satir(330, 'x = 40°', RENK.iyi);
    gizle(u.g);
    await par(c.say('Bu üçgenin açıları da x’e bağlı.', { speak: 'Bu üçgenin açıları da x değerine bağlı.' }), belir(c, u.g, 450));
    await c.say('Yine üç açıyı toplayıp 180°’ye eşitleyeceğiz.', { speak: 'Yine üç açıyı toplayıp yüz seksen dereceye eşitleyeceğiz.' });
    await par(c.say('Önce x’leri toplarız: dört tane x eder.', { speak: 'Önce x terimlerini toplarız: dört tane x eder.' }), belir(c, xler, 400));
    await par(c.say('Sonra sayıları toplarız: geriye 20° kalır.', { speak: 'Sonra sayıları toplarız: geriye yirmi derece kalır.' }), belir(c, sayilar, 400));
    await par(c.say('Toplamı 180°’ye eşitleyince denklem kuruldu.', { speak: 'Toplamı yüz seksen dereceye eşitleyince denklem kuruldu.' }), (async () => {
      await belir(c, [xler, sayilar], 300, 0);   // biten adımlar silinir, yerlerine denklem gelir
      await belir(c, denklem, 400);
    })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'Denklem tahtada: 4x + 20° = 180°. x kaç derece?',
      options: ['40°', '45°', '50°'], answer: 0,
      hints: ['', '45°, 180° ÷ 4 eder; önce iki yandan 20° çıkar.', 'İki yandan 20° çıkar: 4x = 160° olur, 200° değil.'],
      right: 'Evet. 4x = 160°, x = 40°.',
    });
    await belir(c, b2, 350); await belir(c, b3, 350);
    ['70°', '50°', '60°'].forEach((m, i) => cevapla(u.olculer[i], m));
    await c.say('Açılar 50°, 60° ve 70°: toplamları gerçekten 180°.', { speak: 'Açılar elli, altmış ve yetmiş derece: toplamları gerçekten yüz seksen derece.' });

    // Tek başına: ispatın çizimi araç olur.
    B = [240, 440]; C = [680, 440];
    const s = duzen(c, await yeni(), tepe(B, C, 48, 62), B, C, { olcu: ['?', '', ''] });
    s.bAd.textContent = '48°'; s.gAd.textContent = '62°';
    s.bAd.setAttribute('x', +s.bAd.getAttribute('x') - 22); s.gAd.setAttribute('x', +s.gAd.getAttribute('x') + 22);   // ölçüler kenarların üstüne binmesin
    gizle(g);
    await par(c.say('Bu üçgende A’dan BC’ye paralel d doğrusu çizili.', { speak: 'Bu üçgende A noktasından BC kenarına paralel d doğrusu çizili.' }), belir(c, g, 450));
    await c.say('d ile kenarlar arasındaki iki açı verilmiş.', { speak: 'd doğrusu ile kenarlar arasındaki iki açı verilmiş.' });
    await c.choice({
      tag: 'Sıra sende', q: 'd // BC. d ile AB arası 48°, d ile AC arası 62°. A’daki açı kaç derece?',
      options: ['70°', '110°', '48°'], answer: 0,
      hints: ['', '110°, iki açının toplamı; A’daki açı doğru açıdan kalandır.', '48°, B’deki açının iç ters eşi.'],
      right: 'Üçü bir doğru açı eder: 180° − 48° − 62° = 70°.',
    });
    cevapla(s.u.olculer[0], '70°');
    await c.say('Üç açının toplamı 180°: bilinmeyeni bu eşitlik verir.', { speak: 'Üç açının toplamı yüz seksen derece: bilinmeyeni bu eşitlik verir.' });
  }

  Ders.start({
    id: 'geometrik-sekiller-a3', kicker: 'Konu A · Açılar ve ispat', title: 'İç açıların toplamı 180°dir', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'İç açıların toplamı 180°dir',
      hook: 'Bir ressam üç köşeli bir kompozisyon çiziyor. Üç köşedeki açıların toplamını <b>çizmeden</b> bilebilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['İç açılar toplamının 180° olduğunu paralel doğru yardımıyla ispatlar.', 'İspatın her adımının gerekçesini söyler.', 'Önermeyi bilinmeyenli açı sorularında kullanır.'],
    scenes: [
      { title: 'Hatırla', goal: 'İspatın neye dayandığını ve ölçmenin ne olduğunu hatırla.', run: hatirla },
      { title: 'Kopar, yan yana koy', goal: 'Üç köşenin bir düz çizgi ettiğini tek üçgende doğrula.', run: kopar },
      { title: 'Tek paralel', goal: 'Bir noktadan bir doğruya yalnızca bir paralel çizildiğini gör.', run: tekParalel },
      { title: 'İç ters açılar', goal: 'Eş açı çiftlerini hatırla; B ve C’deki açıların eşlerini A’da bul.', run: icTers },
      { title: 'İspatı tamamla', goal: 'İspatın son adımını gerekçesiyle sen tamamla.', run: tamamla },
      { title: 'Her üçgende', goal: 'Adımların üçgenin biçimine bağlı olmadığını gör.', run: herUcgende },
      { title: 'Sıra sende', goal: 'Bir örneği izle, birini birlikte çöz, birini tek başına çöz.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'İspatta B’deki açı ile A’nın solundaki açı neden eşittir?',
        options: ['İkisi de dar açı olduğu için', 'Paralel doğrularda iç ters açılar oldukları için', 'Üçgen ikizkenar olduğu için'], answer: 1,
        why: ['İki dar açı eşit olmak zorunda değildir.', 'd // BC ve AB kesen: iç ters açılar eşittir.', 'İspat üçgenin türünü kullanmadı.'],
        scene: 3,
      },
      {
        q: 'Bir üçgenin iki açısı 65° ve 45°. Üçüncü açı kaç derecedir?',
        options: ['70°', '80°', '110°'], answer: 0,
        why: ['180° − 65° − 45° = 70°.', '65° + 45° + 80° = 190°; toplam 180° olmalı.', '110°, verilen iki açının toplamıdır; üçüncü açı 180° − 110° = 70°.'],
        scene: 6,
      },
      {
        q: 'Bir üçgenin açıları 2x, 3x ve 4x. En küçük açı kaç derecedir?',
        options: ['20°', '40°', '80°'], answer: 1,
        why: ['20°, x’in değeridir; en küçük açı 2x’tir.', '9x = 180°, x = 20°; en küçük açı 2x = 40°.', '80°, en büyük açı olan 4x’in ölçüsüdür.'],
        scene: 6,
      },
      {
        q: 'Kesenin zıt yanlarında, paralellerin arasında kalan eş açılara ne denir?',
        options: ['Yöndeş açılar', 'Ters açılar', 'İç ters açılar'], answer: 2,
        why: ['Yöndeş açılar kesenin aynı yanında, aynı konumda durur.', 'Ters açılar aynı köşede karşı karşıya durur.', 'Zıt yanlarda ve paralellerin arasında: iç ters açılar.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>Üç açı yan yana gelince düz çizgi olur: 180°.</b>',
      'İspatın dayanakları: <b>tek paralel</b>, <b>iç ters açılar</b>, <b>doğru açı</b>.',
      'Adımlar üçgenin türüne bakmaz; sonuç <b>her üçgende</b> geçerlidir.',
    ],
    nextLesson: { href: 'a4-dis-acilar-360.html', label: 'Sonraki: Dış açıların toplamı 360°dir ›' },
  });
})();
