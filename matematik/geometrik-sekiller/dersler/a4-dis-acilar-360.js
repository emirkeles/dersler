/* A4 — Dış açıların toplamı 360°dir
   İki yol karşılaştırılır: dolaşma (doğrulama) ve hesap (ispat). Son sahnede önerme bilinmeyenli sorularda kullanılır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md */
(() => {
  'use strict';
  const { RENK, yon, ileri, ara, kisa, yazi, renkli, parcaKoy, cizgi, koy, kutu, gizle, belir, par, dilimYolu, ucgen, disAci, ok, adimlar, tahminAl, tepeKontrol, tepe, cevapla } = window.KIT;
  const { ease } = Ders;
  let tahmin = null;   // 1. sahnede yapılan tahmin; 2. sahnede anılır

  /* Üçgen ve üç dış açısı (C, A, B köşelerinde; kenarlar aynı dönüş yönünde uzatılır). */
  function disli(c, svg, A, B, C, o = {}) {
    const dis = [disAci(c, svg, C, B, A), disAci(c, svg, A, C, B), disAci(c, svg, B, A, C)];
    const u = ucgen(c, svg, A, B, C, Object.assign({ harf: false }, o));
    const koyHepsi = (P) => { u.koy(P, B, C); dis[0].ciz(C, B, P); dis[1].ciz(P, C, B); dis[2].ciz(B, P, C); };
    /* dış açı ölçüleri: C, A, B sırasıyla; toplamları 360 */
    const olcu = () => { const [a, b, g] = u.D(); return [180 - g, 180 - a, 180 - b]; };
    return { u, dis, koy: koyHepsi, olcu };
  }

  /* ---- 1. Dış açı ---- */
  async function disAciNedir(c) {
    const svg = c.svg(1000, 562);
    const A = [470, 120], B = [250, 400], C = [610, 400];
    const s = disli(c, svg, A, B, C);
    gizle(s.dis.map((d) => d.g), s.dis[0].dilim.el);
    await c.say('Üçgenin içindeki açıları biliyoruz: <b>iç açılar</b>.');
    s.dis[0].g.style.opacity = 1;
    await par(c.say('BC kenarını C’den öteye uzatıyoruz.'), c.tween(900, (e) => koy(s.dis[0].uzanti, C, ileri(C, 0, 110 * e)), ease.inOut));
    await par(c.say('Uzantı ile öbür kenar arasındaki açı: <b>dış açı</b>.'), belir(c, s.dis[0].dilim.el, 450));
    await c.choice({
      tag: 'Tahmin et', q: 'C’deki iç açı 60° olsaydı dış açı kaç derece olurdu?',
      options: ['300°', '120°', '60°'], answer: 1,
      hints: ['Dış açı köşenin bütün dışı değil; yalnızca uzantı ile kenarın arası.', '', 'İç açı ile dış açı birlikte bir doğru açı eder.'],
      right: 'İç açı + dış açı = 180°.',
    });
    await par(c.say('Her köşede bir dış açı var: üç tane.'), (async () => { await belir(c, s.dis[1].g, 400); await belir(c, s.dis[2].g, 400); })());
    tahmin = await tahminAl(c, { q: 'Üç dış açının toplamı sence kaç derecedir?', options: ['180°', '270°', '360°'] });
    await c.say('Tahminini aklında tut. İki ayrı yoldan bakacağız.');
  }

  /* ---- 2. Yol 1: dolaş ---- */
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
    await par(c.say('Bir ok kenar boyunca yürüyor; her köşede dış açı kadar dönüyor.'), (async () => {
      await yuru(M, C); await don(C, yon(C, A), olcu[0]);
    })());
    await par(c.say('Sağdaki daire, dönülen açıları üst üste biriktiriyor.'), (async () => {
      await yuru(C, A); await don(A, yon(A, B), olcu[1]);
      await yuru(A, B); await don(B, 0, olcu[2]); await yuru(B, M);
    })());
    await c.say('Ok ilk yönüne döndü: dilimler bir <b>tam tur</b> etti, 360°.', { speak: 'Ok ilk yönüne döndü: dilimler bir tam tur etti, üç yüz altmış derece.' });
    gizle(yuruyen.g, igne.g);
    await c.say('Üçgeni değiştir: daire yine kapanıyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, {
      x: [100, 560], y: [120, 300], bas: A,
      ciz: (P) => {
        s.koy(P); const o = s.olcu();
        s.dis.forEach((d, i) => d.yaz(o[i] + '°'));
        ayrac.replaceChildren(); [0, yon(C, P), yon(P, B)].forEach(ayracEkle);
        parcaKoy(c, toplam, [o[0] + '° + ' + o[1] + '° + ' + o[2] + '° = 360°']);
      },
    });
    await c.cont('Devam ›');
    t.kaldir();
    // Okunan metin iki kolda aynıdır (tek klip); "Tahminin tuttu." yalnızca ekranda görünür.
    await c.say((tahmin === 2 ? 'Tahminin tuttu. ' : '') + 'Dış açılar hep bir tam tur ediyor: 360°.', { speak: 'Dış açılar hep bir tam tur ediyor: üç yüz altmış derece.' });
  }

  /* ---- 3. Yol 2: hesapla ---- */
  async function hesapla(c) {
    const svg = c.svg(1000, 562);
    const A = [340, 140], B = [130, 400], C = [500, 400];
    const duz = cizgi(c, svg, B, ileri(C, 0, 110), RENK.dis, 12, { 'stroke-opacity': 0.25 });
    const s = disli(c, svg, A, B, C);
    gizle(duz);
    const liste = adimlar(c, svg, 660, 150, { size: 28, aralik: 100 });
    const a1 = liste.ekle('iç + dış = 180°', 'doğru açı'), a2 = liste.ekle('3 · 180° = 540°', 'üç köşe'), a3 = liste.ekle('540° − 180° = 360°', 'iç açılar: 180°');
    await par(c.say('Her köşede iç açı ile dış açı bir doğru açı eder.'), (async () => { await belir(c, duz, 400); await belir(c, a1.g, 400); })());
    await par(c.say('Üç köşe var: üç doğru açı, 540°.', { speak: 'Üç köşe var: üç doğru açı, beş yüz kırk derece.' }), (async () => { await belir(c, duz, 300, 0); await belir(c, a2.g, 400); })());
    await c.choice({
      tag: 'Boşluğu doldur', q: '540° hem iç hem dış açıları sayıyor. Yalnızca dış açılar kalsın diye ne çıkarılır?',
      options: ['Bir doğru açının yarısı: 90°', 'Bir dış açı', 'İç açıların toplamı: 180°'], answer: 2,
      hints: ['Fazlalık olan, üç iç açının hepsi.', 'Dış açıları saymak istiyoruz; çıkarılacak olan iç açılar.', ''],
      right: 'İç açıların toplamı 180°: bunu ispatlamıştık.',
    });
    await par(c.say('Kalan, dış açıların toplamı: <b>360°</b>.', { speak: 'Kalan, dış açıların toplamı: [short pause] üç yüz altmış derece.' }), (async () => {
      await belir(c, s.u.dilimler.map((d) => d.el), 400, 0.25); await belir(c, a3.g, 450);
    })());
    c.note('<b>Dış açılar toplamı = 360°</b><br>3 · 180° − 180° = 360°', 'Dış açılar toplamı', 'gs-dis-acilar');
  }

  /* ---- 4. Karşılaştır, seç ---- */
  async function karsilastir(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    kutu(c, sol, 60, 80, 410, 380);
    const k2 = kutu(c, sag, 530, 80, 410, 380);
    yazi(c, sol, 265, 136, 'Yol 1: dolaş', { size: 30, kalin: 700 });
    const Dc = [265, 270];
    c.S('path', { d: dilimYolu(Dc, 0, -2 * Math.PI, 80), fill: RENK.dis, 'fill-opacity': 0.5, stroke: RENK.dis, 'stroke-width': 2 }, sol);
    [0, -2.05, -4.3].forEach((h) => cizgi(c, sol, Dc, ileri(Dc, h, 80), RENK.dis, 2));
    const e1 = yazi(c, sol, 265, 420, 'doğrulama', { size: 26, kalin: 700, renk: RENK.dis });
    yazi(c, sag, 735, 136, 'Yol 2: hesapla', { size: 30, kalin: 700 });
    yazi(c, sag, 735, 250, '3 · 180° − 180°', { size: 34, kalin: 700 });
    yazi(c, sag, 735, 310, '= 360°', { size: 34, kalin: 700 });
    const e2 = yazi(c, sag, 735, 420, 'ispat', { size: 26, kalin: 700, renk: RENK.iyi });
    gizle(sol, sag, e1, e2);
    await par(c.say('Aynı sonuca iki yoldan vardık.'), (async () => { await belir(c, sol, 450); await belir(c, sag, 450); })());
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

  /* ---- 5. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const B = [300, 400], C = [640, 400];
    let g = null;
    /* Açılarına göre üçgen ve üç dış açısı; dis sırası C, A, B. */
    const kur = (beta, gama, o) => { if (g) g.remove(); g = c.S('g', {}, svg); return disli(c, g, tepe(B, C, beta, gama), B, C, o); };
    await c.say('Sıra sende: dış açılar toplamını kullan.', { noWait: true });

    let s = kur(60, 60);
    s.dis.forEach((d) => d.yaz('?'));
    await c.choice({
      tag: 'Soru 1 / 4', q: 'Üç dış açı birbirine eşit. Her biri kaç derece?',
      options: ['60°', '120°', '180°'], answer: 1,
      hints: ['60°, bu üçgenin iç açısıdır; dış açı onu 180°’ye tamamlar.', '', 'Üçü birlikte 360° etmeli; 180° olsa toplam 540° olurdu.'],
      right: '360° : 3 = 120°.',
    });
    s.dis.forEach((d) => cevapla(d.yazi, '120°'));
    await c.wait(700);

    s = kur(36, 60);
    s.dis[0].yaz('120°'); s.dis[1].yaz('2x'); s.dis[2].yaz('3x');
    await c.choice({
      tag: 'Soru 2 / 4', q: 'Dış açılar 2x, 3x ve 120°. x kaç derece?',
      options: ['40°', '48°', '72°'], answer: 1,
      hints: ['Eşitliği kur: 2x + 3x + 120° = 360°.', '', '72° olsaydı 5x tek başına 360° ederdi.'],
      right: '5x = 240°, x = 48°.',
    });
    cevapla(s.dis[1].yazi, '96°'); cevapla(s.dis[2].yazi, '144°');
    await c.wait(700);

    s = kur(50, 60, { olcu: ['', '', '?'], olcuSize: 24 });
    s.dis[1].yaz('110°'); s.dis[2].yaz('130°');
    await c.choice({
      tag: 'Soru 3 / 4', q: 'İki dış açı 110° ve 130°. Üçüncü köşedeki <b>iç</b> açı kaç derece?',
      options: ['120°', '60°', '100°'], answer: 1,
      hints: ['120°, üçüncü dış açıdır; sorulan onun yanındaki iç açı.', '', 'Önce üçüncü dış açıyı bul: 360° − 110° − 130°.'],
      right: 'Üçüncü dış açı 120°; iç açı 180° − 120° = 60°.',
    });
    s.dis[0].yaz('120°'); cevapla(s.u.olculer[2], '60°');
    await c.wait(700);

    s = kur(55, 60);
    const d2 = disAci(c, g, C, s.u.K()[0], B);
    s.dis[0].yaz('120°'); d2.yaz('?');
    gizle(s.dis[1].g, s.dis[2].g, d2.g);
    await par(c.say('C köşesinde öbür kenarı da uzatıyoruz: ikinci bir dış açı.'), belir(c, d2.g, 500));
    await c.choice({
      tag: 'Soru 4 / 4', q: 'C köşesindeki iki dış açı için ne söylenir?',
      options: ['Eşittirler: ters açılar', 'Toplamları 360° eder', 'Biri iç açıya eşittir'], answer: 0,
      hints: ['', 'İkisi de iç açıyı 180°’ye tamamlar; toplamları 240° eder.', 'İkisi de iç açının yanında durur; ona eşit değil, onu 180°’ye tamamlar.'],
      right: 'İki uzantı bir X çizer: karşı karşıya duran açılar eşittir.',
    });
    cevapla(d2.yazi, '120°');
    await c.say('Toplamda her köşeden yalnızca biri sayılır.');
  }

  Ders.start({
    id: 'geometrik-sekiller-a4', kicker: 'Konu A · Açılar ve ispat', title: 'Dış açıların toplamı 360°dir', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Dış açıların toplamı 360°dir',
      hook: 'Üçgen biçimli bir parkın çevresini dolaşıp başladığın yöne döndün. Toplam <b>kaç derece</b> dönmüş olursun?',
      button: 'Derse başla ›',
    },
    goals: ['Üçgende dış açıyı tanır.', 'Dış açılar toplamının 360° olduğunu iki ayrı yoldan görür.', 'Bir doğrulama ile bir ispatı karşılaştırır, uygun olanı seçer.', 'Önermeyi bilinmeyenli sorularda kullanır.'],
    scenes: [
      { title: 'Dış açı', goal: 'Dış açının uzantı ile kenar arasındaki açı olduğunu gör.', run: disAciNedir },
      { title: 'Yol 1: dolaş', goal: 'Köşelerde dönülen açıların bir tam tur ettiğini gör.', run: dolas },
      { title: 'Yol 2: hesapla', goal: 'Üç doğru açıdan iç açıları çıkar.', run: hesapla },
      { title: 'Karşılaştır, seç', goal: 'Doğrulama ile ispatı ayır; uygun yolu seç.', run: karsilastir },
      { title: 'Sıra sende', goal: 'Dış açılar toplamını dört soruda kullan.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir üçgenin iki dış açısı 130° ve 110°. Üçüncü dış açı kaç derecedir?',
        options: ['60°', '100°', '120°'], answer: 2,
        why: ['130° + 110° + 60° = 300°; toplam 360° olmalı.', '130° + 110° + 100° = 340°; toplam 360° olmalı.', '360° − 130° − 110° = 120°.'],
        scene: 1,
      },
      {
        q: 'Hesap yolunda 540°’den neden 180° çıkardık?',
        options: ['540° iç ve dış açıların hepsini sayıyor; iç açılar 180° eder.', 'Köşelerden biri iki kez sayıldığı için.', 'Doğru açı 180° olduğu için bir tanesi atılır.'], answer: 0,
        why: ['Üç doğru açı = üç iç açı + üç dış açı. İç açılar 180° olduğundan kalan 360°.', 'Her köşe bir kez sayıldı; fazlalık iç açılardır.', 'Çıkarılan bir doğru açı değil, üç iç açının toplamıdır.'],
        scene: 2,
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
