/* A4 — Dış açıların toplamı 360°dir
   İki yol karşılaştırılır: dolaşma (doğrulama) ve hesap (ispat). Son sahnede önerme bilinmeyenli sorularda kullanılır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md ("Pilot" bölümü).
   Sıra plan/KURALLAR.md 3.2'ye göredir: hatırla, önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, yon, ileri, ara, kisa, yazi, renkli, parcaKoy, cizgi, koy, kutu, gizle, belir, par, dilimYolu, ucgen, disAci, ok, isaret, adimlar, tahminAl, tepeKontrol, tepe, cevapla } = window.KIT;
  const { ease } = Ders;
  let tahmin = null;   // "Dış açı" sahnesinde yapılan tahmin; "Yol 1" sahnesinde anılır

  /* Üçgen ve üç dış açısı (C, A, B köşelerinde; kenarlar aynı dönüş yönünde uzatılır). */
  function disli(c, svg, A, B, C, o = {}) {
    const dis = [disAci(c, svg, C, B, A), disAci(c, svg, A, C, B), disAci(c, svg, B, A, C)];
    const u = ucgen(c, svg, A, B, C, Object.assign({ harf: false }, o));
    const koyHepsi = (P) => { u.koy(P, B, C); dis[0].ciz(C, B, P); dis[1].ciz(P, C, B); dis[2].ciz(B, P, C); };
    /* dış açı ölçüleri: C, A, B sırasıyla; toplamları 360 */
    const olcu = () => { const [a, b, g] = u.D(); return [180 - g, 180 - a, 180 - b]; };
    return { u, dis, koy: koyHepsi, olcu };
  }
  /* V köşesinden geçen doğru açının bandı: P → V kenarı ve V'den ötedeki uzantısı. */
  const bant = (c, svg, P, V) => cizgi(c, svg, P, ileri(V, yon(P, V), 110), RENK.dis, 12, { 'stroke-opacity': 0.25 });
  /* Gizli duran yazıya metnini verip görünür kılar. */
  const yazBelir = (c, t, metin, ms = 350) => { t.textContent = metin; gizle(t); return belir(c, t, ms); };

  /* ---- 1. Hatırla: iç açılar toplamı (A3), doğrulama (A1) ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const B = [310, 430], C = [690, 430];
    const u = ucgen(c, svg, tepe(B, C, 50, 70), B, C, { harf: false, r: 48, olcu: ['?', '50°', '70°'], olcuSize: 28 });
    const kucuk = [[[170, 190], [80, 370], [290, 370]], [[420, 170], [420, 370], [620, 370]], [[960, 250], [700, 370], [860, 370]]]
      .map((k) => ucgen(c, svg, k[0], k[1], k[2], { harf: false, r: 30 }).g);
    const onay = [185, 520, 780].map((x) => isaret(c, svg, x, 420, 'ok', 16));
    const ad = yazi(c, svg, 500, 500, 'doğrulama', { size: 30, kalin: 700, renk: RENK.iyi });
    gizle(u.g, kucuk, onay, ad);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, u.g, 450));
    await c.choice({
      tag: 'Hatırla', q: 'İki açısı 50° ve 70° olan üçgenin üçüncü açısı kaç derecedir?',
      options: ['120°', '60°', '70°'], answer: 1,
      hints: ['Üçgenin iç açıları toplamı 180°dir; 120° ile toplam 240° olur.', '', 'Üçgenin iç açıları toplamı 180°dir; 70° ile toplam 190° olur.'],
      right: '180° − 50° − 70° = 60°.',
    });
    cevapla(u.olculer[0], '60°');
    await c.wait(700);

    await belir(c, u.g, 300, 0);
    for (let i = 0; i < 3; i++) { await belir(c, kucuk[i], 250); await belir(c, onay[i], 200); }
    await c.choice({
      tag: 'Hatırla', q: 'Bir özelliği birkaç üçgende ölçüp görmek nedir?',
      options: ['İspat', 'Doğrulama', 'Aksiyom'], answer: 1,
      hints: ['İspat ölçmez; her üçgende geçerli adımlarla gösterir.', '', 'Aksiyom, ispatsız kabul edilen temel bilgidir; ölçülerek bulunmaz.'],
      right: 'Evet. Ölçmek yalnızca ölçülen üçgenleri kapsar.',
    });
    await par(c.say('Bu iki bilgi bugün işimize yarayacak.'), belir(c, ad, 400));
  }

  /* ---- 2. Dış açı: tanım, iç açıyla doğru açı, örnek, yanılgı; sonra üç dış açı ve tahmin ---- */
  async function disAciNedir(c) {
    const svg = c.svg(1000, 562);
    const B = [170, 430], C = [500, 430], A = tepe(B, C, 50, 70);
    // Yanılgı: köşenin dışında kalan bütün bölge (290°). Öteki çizimlerin altında durur.
    const a0 = yon(C, A), ic = kisa(yon(C, B) - a0);
    const butun = c.S('path', { d: dilimYolu(C, a0, ic - Math.sign(ic) * 2 * Math.PI, 52), fill: RENK.kotu, 'fill-opacity': 0.25, stroke: RENK.kotu, 'stroke-width': 2, 'stroke-linejoin': 'round' }, svg);
    const duz = bant(c, svg, B, C);
    const s = disli(c, svg, A, B, C, { olcu: ['', '', ''] });
    const ad = yazi(c, svg, 580, 382, 'dış açı', { hiza: 'start', size: 22, kalin: 700, renk: RENK.dis });
    const kural = renkli(c, svg, 800, 190, [['iç açı', RENK.C], ' + ', ['dış açı', RENK.dis], ' = 180°'], { size: 26, kalin: 700 });
    const ornek = yazi(c, svg, 800, 250, '180° − 70° = 110°', { size: 26, kalin: 700 });
    const carpi = isaret(c, svg, 500, 520, 'no');
    const degil = yazi(c, svg, 524, 529, '290°', { hiza: 'start', size: 24, kalin: 700, renk: RENK.kotu });
    gizle(butun, duz, s.dis.map((d) => d.g), s.dis[0].dilim.el, ad, kural, ornek, carpi, degil);

    // Anlat: dış açı nasıl oluşur, iç açıyla ilişkisi.
    await c.say('Üçgenin içindeki açıları biliyoruz: <b>iç açılar</b>.');
    koy(s.dis[0].uzanti, C, C); s.dis[0].g.style.opacity = 1;
    await par(c.say('BC kenarını C’den öteye uzatıyoruz.'), c.tween(900, (e) => koy(s.dis[0].uzanti, C, ileri(C, 0, 110 * e)), ease.inOut));
    await par(c.say('Uzantı ile öbür kenar arasındaki açı: <b>dış açı</b>.'), belir(c, [s.dis[0].dilim.el, ad], 450));
    await par(c.say('İç açı ile dış açı birlikte bir <b>doğru açı</b> eder.'), (async () => { await belir(c, duz, 400); await belir(c, kural, 400); })());

    // Örnekle göster: iç açı 70° ise dış açı 110°.
    await par(c.say('Örnek: iç açı 70° ise dış açı 110°dir.', { speak: 'Örnek: iç açı yetmiş derece ise dış açı yüz on derecedir.' }), (async () => {
      await belir(c, duz, 300, 0);
      await yazBelir(c, s.u.olculer[2], '70°'); await belir(c, ornek, 400); await yazBelir(c, s.dis[0].yazi, '110°');
    })());

    // Sık yapılan yanlış: köşenin bütün dışı.
    await par(c.say('Köşenin dışındaki bütün bölge, 290°, dış açı <b>değildir</b>.', { speak: '[thoughtful] Köşenin dışındaki bütün bölge, iki yüz doksan derece, dış açı değildir.' }),
      belir(c, [butun, carpi, degil], 450));
    await c.say('Dış açı yalnızca uzantı ile kenarın arasıdır.');
    await belir(c, [butun, carpi, degil], 400, 0);

    // Sor: anlatılan, başka bir ölçüye uygulanır.
    await c.choice({
      tag: 'Sıra sende', q: 'C’deki iç açı 60° olsaydı dış açı kaç derece olurdu?',
      options: ['300°', '120°', '60°'], answer: 1,
      hints: ['Dış açı köşenin bütün dışı değil; yalnızca uzantı ile kenarın arası.', '', 'İç açı ile dış açı birlikte bir doğru açı eder.'],
      right: '180° − 60° = 120°.',
    });

    // Üç köşe, üç dış açı; tahmin.
    await belir(c, [ad, ornek, s.u.olculer[2], s.dis[0].yazi], 300, 0);
    await par(c.say('Öbür kenarları da aynı yönde uzatalım: her köşede bir dış açı.'), (async () => { await belir(c, s.dis[1].g, 400); await belir(c, s.dis[2].g, 400); })());
    tahmin = await tahminAl(c, { q: 'Üç dış açının toplamı sence kaç derecedir?', options: ['180°', '270°', '360°'] });
    await c.say('Tahminini aklında tut; iki ayrı yoldan bakacağız.');
  }

  /* ---- 3. Yol 1: dolaş ---- */
  async function dolas(c) {
    const svg = c.svg(1000, 562);
    const A = [340, 140], B = [130, 400], C = [500, 400], Dc = [800, 250], DR = 90;
    const s = disli(c, svg, A, B, C);
    c.S('circle', { cx: Dc[0], cy: Dc[1], r: DR, fill: 'none', stroke: RENK.ince, 'stroke-width': 2 }, svg);
    const kama = c.S('path', { fill: RENK.dis, 'fill-opacity': 0.5, stroke: RENK.dis, 'stroke-width': 2, 'stroke-linejoin': 'round' }, svg);
    const ayrac = c.S('g', {}, svg);
    const igne = ok(c, svg, Dc, ileri(Dc, 0, DR - 6), RENK.yazi, 3);
    yazi(c, svg, Dc[0], Dc[1] - DR - 26, 'dönülen açı', { size: 22, kalin: 500, renk: RENK.soluk });
    const donus = yazi(c, svg, Dc[0], Dc[1] + DR + 54, '0°', { size: 36, kalin: 700, renk: RENK.dis });
    const toplam = renkli(c, svg, 320, 532, [''], { size: 28, kalin: 700, renk: RENK.dis });
    const yuruyen = ok(c, svg, B, C, RENK.yazi, 5);
    const yer = (p, h) => yuruyen.ciz(ileri(p, h, -26), ileri(p, h, 26));
    const ayracEkle = (h) => cizgi(c, ayrac, Dc, ileri(Dc, h, DR), RENK.dis, 2);
    let h = 0, cum = 0, sayi = 0;
    const olcu = s.olcu(), M = ara(B, C, 0.5);
    yer(M, 0);
    const yuru = (P, Q) => c.tween(700, (e) => yer(ara(P, Q, e), h), ease.inOut);
    const don = async (V, yeni, derece) => {
      const d = kisa(yeni - h), h0 = h, c0 = cum, s0 = sayi;
      await c.tween(900, (e) => {
        h = h0 + d * e; cum = c0 + d * e; yer(V, h);
        kama.setAttribute('d', dilimYolu(Dc, 0, cum, DR)); igne.ciz(Dc, ileri(Dc, h, DR - 6));
        donus.textContent = Math.round(s0 + derece * e) + '°';
      }, ease.inOut);
      sayi = s0 + derece; ayracEkle(h);
    };
    ayracEkle(0);

    // Anlat: önce durum (park), sonra köşedeki dönüşün dış açı olduğu.
    await par(c.say('Üçgen bir parkın çevresinde yürüyen biri her köşede döner.'), yuru(M, C));
    await par(c.say('Köşede uzantıdan yeni kenara döner: tam dış açı kadar.'), don(C, yon(C, A), olcu[0]));
    await par(c.say('Sağdaki daire, dönülen açıları üst üste biriktiriyor.'), (async () => {
      await yuru(C, A); await don(A, yon(A, B), olcu[1]);
      await yuru(A, B); await don(B, 0, olcu[2]); await yuru(B, M);
    })());
    await c.say('Ok ilk yönüne döndü: dilimler bir <b>tam tur</b> etti, 360°.', { speak: 'Ok ilk yönüne döndü: dilimler bir tam tur etti, üç yüz altmış derece.' });
    gizle(yuruyen.g, igne.g);

    // Dene: üçgen değişir, daire yine kapanır.
    const ciz = (P) => {
      s.koy(P); const o = s.olcu();
      s.dis.forEach((d, i) => d.yaz(o[i] + '°'));
      ayrac.replaceChildren(); [0, yon(C, P), yon(P, B)].forEach(ayracEkle);
      parcaKoy(c, toplam, [o[0] + '° + ' + o[1] + '° + ' + o[2] + '° = 360°']);
    };
    ciz(A);
    await c.say('Üçgeni değiştir: daire yine kapanıyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [100, 560], y: [120, 300], bas: A, ciz });
    await c.cont('Devam ›');
    t.kaldir();
    // Okunan metin iki kolda aynıdır (tek klip); "Tahminin tuttu" yalnızca ekranda görünür.
    await c.say(tahmin === 2 ? 'Tahminin tuttu: dış açılar hep bir tam tur ediyor, 360°.' : 'Dış açılar hep bir tam tur ediyor: 360°.', { speak: 'Dış açılar hep bir tam tur ediyor: üç yüz altmış derece.' });
  }

  /* ---- 4. Yol 2: hesapla ---- */
  async function hesapla(c) {
    const svg = c.svg(1000, 562);
    const A = [340, 140], B = [130, 400], C = [500, 400];
    const duz = [bant(c, svg, B, C), bant(c, svg, C, A), bant(c, svg, A, B)];   // üç köşenin doğru açıları
    const s = disli(c, svg, A, B, C);
    const icler = s.u.dilimler.map((d) => d.el), dislar = s.dis.map((d) => d.dilim.el);
    gizle(duz);
    const liste = adimlar(c, svg, 660, 150, { size: 28, aralik: 100 });
    const a1 = liste.ekle('iç + dış = 180°', 'doğru açı'), a2 = liste.ekle('3 · 180° = 540°', 'üç köşe'), a3 = liste.ekle('540° − ? = dış açılar', '');

    // Anlat: üç doğru açı; içinde hem iç hem dış açılar var.
    await par(c.say('Her köşede iç açı ile dış açı bir doğru açı eder.'), (async () => { await belir(c, duz[0], 400); await belir(c, a1.g, 400); })());
    await par(c.say('Üç köşe var: üç doğru açı, 540°.', { speak: 'Üç köşe var: üç doğru açı, beş yüz kırk derece.' }), (async () => {
      await belir(c, duz[1], 350); await belir(c, duz[2], 350); await belir(c, a2.g, 400);
    })());
    await par(c.say('Bu 540°’nin içinde üç iç açı ve üç dış açı var.', { speak: 'Bu beş yüz kırk derecenin içinde üç iç açı ve üç dış açı var.' }), (async () => {
      await belir(c, duz, 300, 0);
      await belir(c, dislar, 300, 0.2); await c.wait(500); await belir(c, dislar, 300);
      await belir(c, icler, 300, 0.2); await c.wait(500); await belir(c, icler, 300);
    })());
    await par(c.say('Biz yalnızca dış açıların toplamını arıyoruz.'), belir(c, a3.g, 400));

    // Birlikte çöz: ilk iki adım tahtada, eksik olanı öğrenci tamamlar.
    await c.choice({
      tag: 'Birlikte çöz', q: '540° hem iç hem dış açıları sayıyor. Yalnızca dış açılar kalsın diye ne çıkarılır?',
      options: ['Bir doğru açının yarısı: 90°', 'Bir dış açı', 'İç açıların toplamı: 180°'], answer: 2,
      hints: ['Fazlalık olan, üç iç açının hepsi.', 'Dış açıları saymak istiyoruz; çıkarılacak olan iç açılar.', ''],
      right: 'İç açıların toplamı 180°: bunu ispatlamıştık.',
    });
    await par(c.say('Kalan, dış açıların toplamı: <b>360°</b>.', { speak: 'Kalan, dış açıların toplamı: [short pause] üç yüz altmış derece.' }), (async () => {
      await belir(c, icler, 400, 0.25); await belir(c, a3.g, 250, 0);
      a3.ifade.textContent = '540° − 180° = 360°'; a3.gerekce('iç açılar: 180°');
      await belir(c, a3.g, 450);
    })());
    c.note('<b>Dış açılar toplamı = 360°</b><br>3 · 180° − 180° = 360°', 'Dış açılar toplamı', 'gs-dis-acilar');
  }

  /* ---- 5. Karşılaştır, seç ---- */
  async function karsilastir(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    kutu(c, sol, 60, 80, 410, 380);
    const k2 = kutu(c, sag, 530, 80, 410, 380);
    yazi(c, sol, 265, 136, 'Yol 1: dolaş', { size: 30, kalin: 700 });
    const Dc = [265, 256];
    c.S('path', { d: dilimYolu(Dc, 0, -2 * Math.PI, 72), fill: RENK.dis, 'fill-opacity': 0.5, stroke: RENK.dis, 'stroke-width': 2 }, sol);
    [0, -2.05, -4.3].forEach((h) => cizgi(c, sol, Dc, ileri(Dc, h, 72), RENK.dis, 2));
    const b1 = yazi(c, sol, 265, 372, 'birkaç üçgen', { size: 22, kalin: 500, renk: RENK.soluk });
    const e1 = yazi(c, sol, 265, 425, 'doğrulama', { size: 26, kalin: 700, renk: RENK.dis });
    yazi(c, sag, 735, 136, 'Yol 2: hesapla', { size: 30, kalin: 700 });
    yazi(c, sag, 735, 212, '3 · 180° − 180°', { size: 34, kalin: 700 });
    yazi(c, sag, 735, 262, '= 360°', { size: 34, kalin: 700 });
    const b2 = [yazi(c, sag, 735, 328, 'doğru açı: 180°', { size: 22, kalin: 500, renk: RENK.soluk }), yazi(c, sag, 735, 362, 'iç açılar: 180°', { size: 22, kalin: 500, renk: RENK.soluk })];
    const e2 = yazi(c, sag, 735, 425, 'ispat', { size: 26, kalin: 700, renk: RENK.iyi });
    gizle(sol, sag, b1, b2, e1, e2);

    // Anlat: iki yolun neye dayandığı sorudan önce söylenir.
    await par(c.say('Aynı sonuca iki yoldan vardık.'), (async () => { await belir(c, sol, 450); await belir(c, sag, 450); })());
    await par(c.say('Yol 1’de birkaç üçgen denedik; her birinde daire kapandı.', { speak: 'Birinci yolda birkaç üçgen denedik; her birinde daire kapandı.' }), belir(c, b1, 400));
    await par(c.say('Yol 2’de iki bilgi kullandık: doğru açı ve iç açılar toplamı.', { speak: 'İkinci yolda iki bilgi kullandık: doğru açı ve iç açılar toplamı.' }), (async () => { await belir(c, b2[0], 350); await belir(c, b2[1], 350); })());
    await c.choice({
      tag: 'Karşılaştır', q: 'Hangi yol bütün üçgenler için kesinlik verir?',
      options: ['Yol 1: birkaç üçgende dairenin kapandığını gördük', 'Yol 2: her adımı ispatlanmış bilgiye dayanıyor'], answer: 1,
      hints: ['Görmek doğrular; ama denemediğimiz üçgenler kalır.', ''],
      right: 'Doğru açı ve iç açılar toplamı her üçgende geçerli.',
    });
    k2.setAttribute('stroke', RENK.iyi);
    await par(c.say('Yol 1 gözle <b>doğrular</b>; Yol 2 adım adım <b>ispatlar</b>.', { speak: 'Birinci yol gözle doğrular; ikinci yol adım adım ispatlar.' }), belir(c, [e1, e2], 450));
    await c.say('Yol 1 nedenini sezdirir; kesinlik için Yol 2’yi seçeriz.', { speak: '[thoughtful] Birinci yol nedenini sezdirir; kesinlik için ikinci yolu seçeriz.' });
  }

  /* ---- 6. Sıra sende: çözülmüş örnek, birlikte çöz, iki soru tek başına ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const B = [140, 410], C = [450, 410];
    let g = null, liste = null;
    /* Eski üçgeni ve adımları siler; açılarına göre yeni üçgeni ve üç dış açısını kurar (dis sırası C, A, B). */
    const kur = async (beta, gama, o) => {
      if (g) { await belir(c, [g, liste.g], 250, 0); g.remove(); liste.g.remove(); }
      g = c.S('g', {}, svg); liste = adimlar(c, svg, 610, 190, { size: 26, aralik: 92 });
      const s = disli(c, g, tepe(B, C, beta, gama), B, C, o);
      gizle(g); return s;
    };
    const goster = () => belir(c, g, 400);

    // Örnek: baştan sona tahtada çözülür.
    let s = await kur(60, 60, { olcu: ['', '', ''] });
    s.dis.forEach((d) => d.yaz('?'));
    let a = [liste.ekle('üç eş açı, toplam 360°'), liste.ekle('360° ÷ 3 = 120°'), liste.ekle('180° − 120° = 60°', 'iç açı')];
    await par(c.say('Örnek: bir üçgenin üç dış açısı birbirine eşit.'), goster());
    await par(c.say('Dış açıların toplamı 360°dir.', { speak: 'Dış açıların toplamı üç yüz altmış derecedir.' }), belir(c, a[0].g, 400));
    await par(c.say('Üçü eşit olduğundan toplamı üçe böleriz: 120°.', { speak: 'Üçü eşit olduğundan toplamı üçe böleriz: yüz yirmi derece.' }), (async () => {
      await belir(c, a[1].g, 400); await belir(c, s.dis.map((d) => d.yazi), 200, 0);
      s.dis.forEach((d) => d.yaz('120°')); await belir(c, s.dis.map((d) => d.yazi), 350);
    })());
    await par(c.say('Yanındaki iç açı onu 180°’ye tamamlar: 60°.', { speak: 'Yanındaki iç açı onu yüz seksen dereceye tamamlar: altmış derece.' }), (async () => {
      await belir(c, a[2].g, 400);
      s.u.olculer.forEach((t) => { t.textContent = '60°'; }); gizle(s.u.olculer); await belir(c, s.u.olculer, 350);
    })());

    // Birlikte çöz: eşitlik tahtada kurulur, x'i öğrenci bulur.
    s = await kur(36, 60);
    s.dis[0].yaz('120°'); s.dis[1].yaz('2x'); s.dis[2].yaz('3x');
    a = [liste.ekle('2x + 3x + 120° = 360°', 'dış açılar toplamı'), liste.ekle('5x = 240°'), liste.ekle('x = 48°')];
    await par(c.say('Şimdi dış açılar 2x, 3x ve 120°.', { speak: 'Şimdi dış açılar iki x, üç x ve yüz yirmi derece.' }), goster());
    await par(c.say('Üçünün toplamını 360°’ye eşitleriz.', { speak: 'Üçünün toplamını üç yüz altmış dereceye eşitleriz.' }), belir(c, a[0].g, 400));
    await par(c.say('İki yandan 120° çıkarınca 5x = 240° kalır.', { speak: 'İki yandan yüz yirmi derece çıkarınca beş x eşittir iki yüz kırk derece kalır.' }), belir(c, a[1].g, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: '5x = 240° ise x kaç derecedir?',
      options: ['40°', '48°', '72°'], answer: 1,
      hints: ['5 · 40° = 200° eder; 240° olmalı.', '', '72° olsaydı 5x tek başına 360° ederdi.'],
      right: '240° ÷ 5 = 48°.',
    });
    cevapla(s.dis[1].yazi, '96°'); cevapla(s.dis[2].yazi, '144°');
    await par(c.say('x = 48°: dış açılar 96°, 144° ve 120°.', { speak: 'x eşittir kırk sekiz derece: dış açılar doksan altı, yüz kırk dört ve yüz yirmi derece.' }), belir(c, a[2].g, 400));

    // Tek başına 1: önce üçüncü dış açı, sonra yanındaki iç açı.
    s = await kur(50, 60, { olcu: ['', '', '?'], olcuSize: 24 });
    s.dis[1].yaz('110°'); s.dis[2].yaz('130°');
    a = [liste.ekle('360° − 110° − 130° = 120°', 'üçüncü dış açı'), liste.ekle('180° − 120° = 60°', 'yanındaki iç açı')];
    await par(c.say('Sıra sende: bu üçgende iki dış açı belli.'), goster());
    await c.choice({
      tag: 'Soru 1 / 2', q: 'İki dış açı 110° ve 130°. Üçüncü köşedeki <b>iç</b> açı kaç derece?',
      options: ['120°', '60°', '100°'], answer: 1,
      hints: ['120°, üçüncü dış açıdır; sorulan onun yanındaki iç açı.', '', 'Önce üçüncü dış açıyı bul: 360° − 110° − 130°.'],
      right: 'Üçüncü dış açı 120°; iç açı 180° − 120° = 60°.',
    });
    await belir(c, a[0].g, 350); s.dis[0].yaz('120°');
    await belir(c, a[1].g, 350); cevapla(s.u.olculer[2], '60°');
    await c.wait(900);

    // Tek başına 2: bir köşede iki dış açı.
    s = await kur(55, 60);
    const d2 = disAci(c, g, C, s.u.K()[0], B);
    s.dis[0].yaz('120°'); d2.yaz('?');
    a = [liste.ekle('iki dış açı eşit', 'ters açılar')];
    gizle(s.dis[1].g, s.dis[2].g, d2.g);
    await goster();
    await par(c.say('C köşesinde öbür kenarı da uzatıyoruz: ikinci bir dış açı.'), belir(c, d2.g, 500));
    await c.say('İkisi de bir uzantı ile bir kenarın arasında duruyor.');
    await c.choice({
      tag: 'Soru 2 / 2', q: 'C köşesindeki iki dış açı için ne söylenir?',
      options: ['Eşittirler: ters açılar', 'Toplamları 360° eder', 'Biri iç açıya eşittir'], answer: 0,
      hints: ['', 'İkisi de iç açıyı 180°’ye tamamlar; toplamları 240° eder.', 'İkisi de iç açının yanında durur; ona eşit değil, onu 180°’ye tamamlar.'],
      right: 'İki uzantı bir X çizer: karşı karşıya duran açılar eşittir.',
    });
    cevapla(d2.yazi, '120°');
    await par(c.say('Toplamda her köşeden yalnızca biri sayılır.'), belir(c, a[0].g, 400));
  }

  Ders.start({
    id: 'geometrik-sekiller-a4', kicker: 'Konu A · Açılar ve ispat', title: 'Dış açıların toplamı 360°dir', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dış açıların toplamı 360°dir',
      hook: 'Üçgen biçimli bir parkın çevresini dolaşıp başladığın yöne döndün. Toplam <b>kaç derece</b> dönmüş olursun?',
      button: 'Derse başla ›',
    },
    goals: ['Üçgende dış açıyı tanır; iç açıyla birlikte 180° ettiğini bilir.', 'Dış açılar toplamının 360° olduğunu iki ayrı yoldan görür.', 'Bir doğrulama ile bir ispatı karşılaştırır, uygun olanı seçer.', 'Önermeyi bilinmeyenli sorularda kullanır.'],
    scenes: [
      { title: 'Hatırla', goal: 'İç açılar toplamını ve doğrulamayı hatırla.', run: hatirla },
      { title: 'Dış açı', goal: 'Dış açı, uzantı ile kenarın arasıdır; iç açıyla 180° eder.', run: disAciNedir },
      { title: 'Yol 1: dolaş', goal: 'Köşelerde dönülen açıların bir tam tur ettiğini gör.', run: dolas },
      { title: 'Yol 2: hesapla', goal: 'Üç doğru açıdan iç açıları çıkar.', run: hesapla },
      { title: 'Karşılaştır, seç', goal: 'Doğrulama ile ispatı ayır; uygun yolu seç.', run: karsilastir },
      { title: 'Sıra sende', goal: 'Bir örneği izle, birini birlikte çöz, ikisini tek başına çöz.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgenin iki dış açısı 130° ve 110°. Üçüncü dış açı kaç derecedir?',
        options: ['60°', '100°', '120°'], answer: 2,
        why: ['130° + 110° + 60° = 300°; toplam 360° olmalı.', '130° + 110° + 100° = 340°; toplam 360° olmalı.', '360° − 130° − 110° = 120°.'],
        scene: 2,
      },
      {
        q: 'Hesap yolunda 540°’den neden 180° çıkardık?',
        options: ['540° iç ve dış açıların hepsini sayıyor; iç açılar 180° eder.', 'Köşelerden biri iki kez sayıldığı için.', 'Doğru açı 180° olduğu için bir tanesi atılır.'], answer: 0,
        why: ['Üç doğru açı = üç iç açı + üç dış açı. İç açılar 180° olduğundan kalan 360°.', 'Her köşe bir kez sayıldı; fazlalık iç açılardır.', 'Çıkarılan bir doğru açı değil, üç iç açının toplamıdır.'],
        scene: 3,
      },
      {
        q: 'Bir köşedeki iç açı 65° ise aynı köşedeki dış açı kaç derecedir?',
        options: ['295°', '115°', '25°'], answer: 1,
        why: ['295° köşenin dışındaki bütün bölgedir; dış açı iç açıyı 180°’ye tamamlar.', 'İç açı ile dış açı bir doğru açı eder: 180° − 65° = 115°.', 'İç açı ile dış açının toplamı 90° değil, 180°dir.'],
        scene: 1,
      },
      {
        q: 'İç açıları 50°, 60° ve 70° olan üçgenin dış açıları toplamı kaç derecedir?',
        options: ['180°', '540°', '360°'], answer: 2,
        why: ['180° iç açıların toplamıdır; dış açılar 130°, 120° ve 110°dir.', '540° üç doğru açıdır; içinde iç açılar da sayılır.', 'Dış açılar toplamı her üçgende 360°dir: 130° + 120° + 110°.'],
        scene: 3,
      },
    ],
    summary: [
      '<b>Dış açılar bir tam turdur: 360°.</b>',
      '<b>Dış açı:</b> bir kenarın uzantısı ile öbür kenar arasındaki açı. İç açı + dış açı = 180°. Toplamda her köşeden biri sayılır.',
      'Dolaşmak <b>doğrular</b>; 3 · 180° − 180° = 360° hesabı <b>ispatlar</b>.',
    ],
    nextLesson: { href: 'a5-dis-aci-iki-ic-aci.html', label: 'Sonraki: Dış açı, uzaktaki iki iç açının toplamıdır ›' },
  });
})();
