/* A3 — İç açıların toplamı 180°dir
   Tepe köşesinden karşı kenara çizilen tek paralel, üç açıyı bir doğru açıda yan yana getirir.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md */
(() => {
  'use strict';
  const { RENK, yon, ileri, ara, kisa, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, dilim, ucgen, adimlar, tepeKontrol, tepe, cevapla, paralelDuzen: duzen, aciTasi: tasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* ---- 1. Kopar, yan yana koy ---- */
  async function kopar(c) {
    const svg = c.svg(1000, 562);
    const A = [500, 90], B = [250, 380], C = [750, 380], O = [500, 500];
    ucgen(c, svg, A, B, C, { r: 56, harf: false });
    const hat = cizgi(c, svg, [300, 500], [700, 500], RENK.cizgi, 3);
    gizle(hat);
    const K = [A, B, C], renk = [RENK.A, RENK.B, RENK.C];
    /* her köşe: başlangıç yönü ve süpürme; bitişte O noktasında yan yana (β, α, γ) */
    const bas = K.map((V, i) => { const P = K[(i + 1) % 3], Q = K[(i + 2) % 3], a0 = yon(V, P), s = kisa(yon(V, Q) - a0); return s > 0 ? [a0, s] : [a0 + s, -s]; });
    const son = [Math.PI + bas[1][1], Math.PI, Math.PI + bas[1][1] + bas[0][1]];
    const kopya = K.map((V, i) => { const k = dilim(c, svg, V, V, V, renk[i], 56, { dolgu: 0.75 }); k.yon(bas[i][0], bas[i][1], V, 56); gizle(k.el); return k; });
    await c.say('Üçgenin üç köşesi üç renkle işaretli.');
    await c.choice({
      tag: 'Tahmin et', q: 'Üç köşeyi koparıp yan yana dizersek ne oluşur?',
      options: ['Bir dik açı', 'Düz bir çizgi', 'Tam bir daire'], answer: 1,
      hints: ['Dik açı 90° eder; üç köşe daha çok yer kaplar.', '', 'Tam daire 360° ister; üç köşe o kadar etmez.'],
      right: 'Üç köşe bir doğrunun üstünü tam doldurur.',
    });
    await par(c.say('Köşeleri koparıp alttaki çizgiye taşıyoruz.'), (async () => {
      await belir(c, hat, 300);
      for (const i of [1, 0, 2]) {
        kopya[i].el.style.opacity = 1;
        await c.tween(1000, (e) => kopya[i].yon(bas[i][0] + kisa(son[i] - bas[i][0]) * e, bas[i][1], ara(K[i], O, e), 56), ease.inOut);
      }
    })());
    await c.say('Üç köşe yan yana: tam bir <b>düz çizgi</b>.');
    await c.say('Ama bu tek bir üçgen: yalnızca bir <b>doğrulama</b>.');
    await c.say('Bütün üçgenler için ispat gerek. Yardımcımız: paralel doğru.');
  }

  /* ---- 2. Tek paralel ---- */
  async function tekParalel(c) {
    const svg = c.svg(1000, 562);
    const A = [400, 180], B = [140, 440], C = [600, 440];
    cizgi(c, svg, [40, 440], [960, 440], RENK.ince, 2);
    ucgen(c, svg, A, B, C, { dilim: false });
    const hat = cizgi(c, svg, A, A, RENK.cizgi, 3), kes = nokta(c, svg, A, RENK.dis, 8);
    const ad = yazi(c, svg, 940, 160, 'd // BC', { hiza: 'end', size: 26, kalin: 700, renk: RENK.paralel });
    gizle(ad);
    const cevir = (derece) => {
      const t = (derece * Math.PI) / 180;
      koy(hat, ileri(A, t, -800), ileri(A, t, 800));
      const x = Math.abs(derece) < 0.05 ? Infinity : A[0] + (C[1] - A[1]) / Math.tan(t);
      kes.setAttribute('cx', x > 40 && x < 960 ? x : -100); kes.setAttribute('cy', 440);
    };
    cevir(32);
    await c.say('A’dan geçen bir doğru, BC’yi bir noktada kesiyor.');
    await par(c.say('Doğruyu döndürdükçe kesişim noktası uzaklaşıyor.'), c.tween(2200, (e) => cevir(lerp(32, 16, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'A’dan geçip BC’yi hiç kesmeyen kaç doğru çizilebilir?',
      options: ['Hiç', 'Yalnızca bir', 'İstediğimiz kadar'], answer: 1,
      hints: ['Döndürmeye devam edersek bir konumda kesişim kaybolur.', '', 'Biraz daha dönünce doğru BC’yi öbür yandan keser.'],
      right: 'Tek bir konum var: BC’ye paralel olan.',
    });
    await par(c.say('Yalnızca bu konumda kesmiyor: <b>paralel</b> doğru.'), (async () => {
      await c.tween(1600, (e) => cevir(lerp(16, 0, e)), ease.inOut);
      hat.setAttribute('stroke', RENK.paralel); await belir(c, ad, 350);
    })());
    await par(c.say('Biraz daha dönse öbür yandan keser. Paralel tektir.'), (async () => {
      hat.setAttribute('stroke', RENK.cizgi);
      await c.tween(1300, (e) => cevir(lerp(0, -22, e)), ease.inOut); await c.wait(500);
      await c.tween(1300, (e) => cevir(lerp(-22, 0, e)), ease.inOut);
      hat.setAttribute('stroke', RENK.paralel);
    })());
    c.note('Bir doğruya dışındaki bir noktadan <b>yalnızca bir paralel</b> çizilir.', 'Tek paralel', 'gs-tek-paralel');
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
    await c.say('Hatırla: iki paralel doğruyu bir kesen kesiyor.');
    await par(c.say('Kesenin aynı yanında, aynı konumdaki açılar: <b>yöndeş</b>.'), goster(P2, [P2[0] + 100, 370], altUc, 'yöndeş'));
    await par(c.say('Paralellerin arasında, kesenin zıt yanlarındakiler: <b>iç ters</b>.'), goster(P2, [P2[0] - 100, 370], P1, 'iç ters'));
    await par(c.say('Aynı köşede karşı karşıya duranlar: <b>ters</b> açılar.'), goster(P1, [P1[0] - 100, 190], ustUc, 'ters'));
    await c.say('Üç çiftte de açılar birbirine eşittir.');
    await belir(c, h, 400, 0); h.remove();
    await belir(c, s.u.g, 400);
    await par(c.say('A’dan BC’ye paralel d doğrusunu çizdik.'), belir(c, s.dg, 500));
    await par(c.say('AB, iki paraleli kesiyor. B’deki açıyı A’ya taşıyalım.'), (async () => {
      await belir(c, zB, 400); s.bK.el.style.opacity = 1;
      await tasi(c, s.bK, B, A, C, A); await belir(c, s.bAd, 300);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'B’deki açı ile A’nın solundaki açı eşittir, çünkü bunlar … açılardır.',
      options: ['yöndeş', 'iç ters', 'ters'], answer: 1,
      hints: ['Yöndeş açılar kesenin aynı yanında durur; bunlar zıt yanlarda.', '', 'Ters açılar aynı köşede karşı karşıya durur; bunların köşeleri farklı.'],
      right: 'Paralel iki doğru ve bir kesen: iç ters açılar eşittir.',
    });
    await belir(c, zB, 300, 0);
    await c.choice({
      tag: 'Tahmin et', q: 'Kesen AC olursa, C’deki açının iç ters eşi nerede belirir?',
      options: ['A’nın sağında, d ile AC arasında', 'A’nın solunda, d ile AB arasında', 'B köşesinde'], answer: 0,
      hints: ['', 'Orası AB keseninin yeri; AC öbür yanda.', 'İç ters açının köşesi öbür paralelin üstündedir: A’da.'],
      right: 'AC keseninin öbür yanında, d’nin altında.',
    });
    await par(c.say('C’deki açının eşi de A’nın sağına yerleşiyor.'), (async () => {
      await belir(c, zC, 400); s.gK.el.style.opacity = 1;
      await tasi(c, s.gK, C, A, B, A); await belir(c, s.gAd, 300); await belir(c, zC, 300, 0);
    })());
  }

  /* ---- 4. İspatı tamamla ---- */
  async function tamamla(c) {
    const svg = c.svg(1000, 562);
    const A = [360, 180], B = [100, 440], C = [560, 440];
    const s = duzen(c, svg, A, B, C, { harf: ['A', '', ''], x1: 640 });
    const liste = adimlar(c, svg, 700, 150, { size: 26, aralik: 96 });
    const a1 = liste.ekle('d // BC', 'tek paralel'), a2 = liste.ekle('eş açılar', 'iç ters'), a3 = liste.ekle('β + α + γ = 180°', 'doğru açı');
    await par(c.say('İlk iki adım hazır: paralel doğru ve iç ters açılar.'), (async () => { await belir(c, a1.g, 400); await c.wait(500); await belir(c, a2.g, 400); })());
    await par(c.say('A noktasında üç açı yan yana duruyor.'), (async () => {
      for (const k of [s.bK, s.u.dilimler[0], s.gK]) { await c.tween(300, (e) => k.el.setAttribute('fill-opacity', lerp(0.55, 0.95, e))); await c.tween(300, (e) => k.el.setAttribute('fill-opacity', lerp(0.95, 0.55, e))); }
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'A’daki üç açının toplamı kaç derecedir, neden?',
      options: ['90°: bir dik açı ederler', '180°: d bir doğru, üçü bir doğru açıyı doldurur', '360°: A’nın çevresini doldururlar'], answer: 1,
      hints: ['Üçü birlikte d’nin alt yanını boydan boya kaplıyor.', '', 'Yalnızca d’nin altını dolduruyorlar; üstü boş.'],
      right: 'Doğru açı 180°dir.',
    });
    await par(c.say('Üç açı bir doğru açıyı doldurur: toplam <b>180°</b>.', { speak: 'Üç açı bir doğru açıyı doldurur: toplam yüz seksen derece.' }), belir(c, a3.g, 450));
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
    await c.say('Tepe köşesini gezdir: paralel ve eş açılar peşinden geliyor.', { noWait: true });
    const t = tepeKontrol(c, svg, {
      x: [120, 800], y: [150, 320], bas: [480, 190],
      ciz: (P) => { s.koy(P); const [a, b, g] = s.u.D(); parcaKoy(c, toplam, [[b + '°', RENK.B], ' + ', [a + '°', RENK.A], ' + ', [g + '°', RENK.C], ' = 180°']); },
    });
    await c.cont('Devam ›');
    t.kaldir();
    await c.choice({
      tag: 'Düşün', q: 'İspatın adımlarında üçgenin türünü (dar, dik, geniş açılı) kullandık mı?',
      options: ['Evet, yalnızca dar açılı üçgende çalışır', 'Hayır, adımlar her üçgende aynı'], answer: 1,
      hints: ['Tepeyi sola çekip üçgeni geniş açılı yaptığında adımlardan biri bozuldu mu?', ''],
      right: 'Paralel, iç ters açılar, doğru açı: hiçbiri türe bakmaz.',
    });
    await c.say('Bu yüzden sonuç bütün üçgenler için geçerli: bu bir <b>ispat</b>.');
  }

  /* ---- 6. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const B = [210, 470], C = [790, 470];
    let g = null;
    const yeni = () => { if (g) g.remove(); g = c.S('g', {}, svg); return g; };
    await c.say('Sıra sende: bilinmeyen açıyı bul.', { noWait: true });

    let u = ucgen(c, yeni(), tepe(B, C, 60, 30), B, C, { harf: false, olcu: ['3x', '2x', 'x'], olcuSize: 26, r: 46 });
    await c.choice({
      tag: 'Soru 1 / 3', q: 'Açılar x, 2x ve 3x. En büyük açı kaç derece?',
      options: ['30°', '60°', '90°'], answer: 2,
      hints: ['30°, x’in değeri; en büyük açı 3x.', '60°, 2x’in değeri; en büyük açı 3x.', ''],
      right: 'x + 2x + 3x = 180°, x = 30°; 3x = 90°.',
    });
    ['90°', '60°', '30°'].forEach((m, i) => cevapla(u.olculer[i], m));
    await c.wait(700);

    u = ucgen(c, yeni(), tepe(B, C, 50, 60), B, C, { harf: false, olcu: ['2x − 10°', 'x + 10°', 'x + 20°'], olcuSize: 24, r: 40 });
    /* uzun etiketler kenarlara binmesin: tabandakiler dilimin yanına, tepedeki dilimin altına */
    const yer = (t, x, y, hiza) => { t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('text-anchor', hiza); };
    yer(u.olculer[0], u.K()[0][0], u.K()[0][1] + 112, 'middle'); yer(u.olculer[1], B[0] + 58, B[1] - 14, 'start'); yer(u.olculer[2], C[0] - 58, C[1] - 14, 'end');
    await c.choice({
      tag: 'Soru 2 / 3', q: 'Açılar x + 10°, x + 20° ve 2x − 10°. x kaç derece?',
      options: ['40°', '45°', '50°'], answer: 0,
      hints: ['', 'Üç açıyı topla: 4x + 20° = 180°.', '50°, en küçük açının ölçüsü; sorulan x.'],
      right: '4x + 20° = 180°, x = 40°.',
    });
    ['70°', '50°', '60°'].forEach((m, i) => cevapla(u.olculer[i], m));
    await c.wait(700);

    const s = duzen(c, yeni(), tepe([240, 440], [680, 440], 48, 62), [240, 440], [680, 440], { olcu: ['?', '', ''] });
    s.bAd.textContent = '48°'; s.gAd.textContent = '62°';
    s.bAd.setAttribute('x', +s.bAd.getAttribute('x') - 22); s.gAd.setAttribute('x', +s.gAd.getAttribute('x') + 22);   // ölçüler kenarların üstüne binmesin
    await c.choice({
      tag: 'Soru 3 / 3', q: 'd // BC. d ile AB arası 48°, d ile AC arası 62°. A’daki açı kaç derece?',
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
      { title: 'Kopar, yan yana koy', goal: 'Üç köşenin bir düz çizgi ettiğini tek üçgende doğrula.', run: kopar },
      { title: 'Tek paralel', goal: 'Bir noktadan bir doğruya yalnızca bir paralel çizildiğini gör.', run: tekParalel },
      { title: 'İç ters açılar', goal: 'Eş açı çiftlerini hatırla; B ve C’deki açıların eşlerini A’da bul.', run: icTers },
      { title: 'İspatı tamamla', goal: 'Üç açının bir doğru açıyı doldurduğunu gerekçesiyle söyle.', run: tamamla },
      { title: 'Her üçgende', goal: 'Adımların üçgenin biçimine bağlı olmadığını gör.', run: herUcgende },
      { title: 'Sıra sende', goal: 'Bilinmeyen açıyı üç soruda bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'İspatta B’deki açı ile A’nın solundaki açı neden eşittir?',
        options: ['İkisi de dar açı olduğu için', 'Paralel doğrularda iç ters açılar oldukları için', 'Üçgen ikizkenar olduğu için'], answer: 1,
        why: ['İki dar açı eşit olmak zorunda değildir.', 'd // BC ve AB kesen: iç ters açılar eşittir.', 'İspat üçgenin türünü kullanmadı.'],
        scene: 2,
      },
      {
        q: 'Bir üçgenin iki açısı 65° ve 45°. Üçüncü açı kaç derecedir?',
        options: ['70°', '80°', '110°'], answer: 0,
        why: ['180° − 65° − 45° = 70°.', '65° + 45° + 80° = 190°; toplam 180° olmalı.', '110°, verilen iki açının toplamıdır; üçüncü açı 180° − 110° = 70°.'],
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
