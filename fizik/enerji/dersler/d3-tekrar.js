/* D3 — Konu tekrarı: Isıl denge
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından yedi soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/D-isil-denge.md (D3). Bu konuda hesap yoktur; çizimler şematiktir, sayı taşımaz.
   Sol taraftaki düzenek (yalıtılmış beher ve içindeki erlenmayer) izometrik figür olmadan, düz vektörle kurulur. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, belir, par } = window.KIT;
  const { termometre, kap } = window.KIT_A;
  const CAM = '#c3cbea';
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, soguk: RENK.soguk };
  const SATIR = [110, 180, 250, 320, 390, 460];   // kural satırlarının üst kenarı (her satır 60 birim)
  const XC = 360, XY = 440;                       // küçük çizim ve yazı sütunları

  /* ---- sol düzenek: yalıtılmış beherin içinde erlenmayer; iki termometre aynı seviyede (denge pozu) ---- */
  function duzenek(c, p) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: 42, y: 128, width: 266, height: 322, rx: 14, fill: 'none', stroke: RENK.gri, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, g);
    kap(c, g, { x: 55, y: 150, w: 240, h: 270, su: 150 });
    c.S('path', { d: 'M150,300 L105,390 Q100,400 110,400 H240 Q250,400 245,390 L200,300 Z', fill: S.soguk, 'fill-opacity': 0.3 }, g);
    c.S('path', { d: 'M150,215 V300 L105,390 Q100,400 110,400 H240 Q250,400 245,390 L200,300 V215', fill: 'none', stroke: CAM, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    termometre(c, g, { x: 175, y: 392, h: 150, T: 30 });
    termometre(c, g, { x: 80, y: 392, h: 150, T: 30 });
    yazi(c, g, 175, 482, 'yalıtılmış', { size: 24, renk: RENK.gri });
    return g;
  }

  /* ---- satır çizimleri (60 × 44, sol kenarı XC, satırın üstü y0) ---- */
  const cy = (y0) => y0 + 30;
  function kucukOk(c, g, x1, x2, y, renk) {
    cizgi(c, g, [x1, y], [x2 - 6, y], renk, 4);
    c.S('path', { d: `M${x2},${y} L${x2 - 10},${y - 6.5} L${x2 - 10},${y + 6.5} Z`, fill: renk }, g);
  }
  function kucukTermometre(c, g, x, y0, boy) {
    c.S('rect', { x: x - 6, y: y0 + 8, width: 12, height: 44, rx: 6, fill: '#0c1226', stroke: CAM, 'stroke-width': 2 }, g);
    c.S('rect', { x: x - 3, y: y0 + 52 - boy, width: 6, height: boy, rx: 2, fill: S.sicaklik }, g);
  }
  function cizim1(c, g, y0) {   // sıcak kutudan soğuk kutuya turuncu ok
    c.S('rect', { x: XC, y: y0 + 8, width: 18, height: 44, rx: 5, fill: S.sicaklik, 'fill-opacity': 0.3, stroke: S.sicaklik, 'stroke-width': 2 }, g);
    c.S('rect', { x: XC + 42, y: y0 + 8, width: 18, height: 44, rx: 5, fill: S.soguk, 'fill-opacity': 0.3, stroke: S.soguk, 'stroke-width': 2 }, g);
    kucukOk(c, g, XC + 21, XC + 39, cy(y0), S.isi);
  }
  function cizim2(c, g, y0) {   // iki termometre, sütunlar birbirine yaklaşmış (40 ve 30)
    kucukTermometre(c, g, XC + 14, y0, 40);
    kucukTermometre(c, g, XC + 46, y0, 30);
  }
  function cizim3(c, g, y0) {   // iki termometre, sütunlar eşit
    kucukTermometre(c, g, XC + 14, y0, 35);
    kucukTermometre(c, g, XC + 46, y0, 35);
  }
  function cizim4(c, g, y0) {   // alt alta iki eşit turuncu çubuk ve aralarında "="
    c.S('rect', { x: XC, y: y0 + 8, width: 44, height: 12, rx: 4, fill: S.isi }, g);
    c.S('rect', { x: XC, y: y0 + 40, width: 44, height: 12, rx: 4, fill: S.isi }, g);
    cizgi(c, g, [XC + 14, y0 + 26], [XC + 30, y0 + 26], RENK.yazi, 3);
    cizgi(c, g, [XC + 14, y0 + 34], [XC + 30, y0 + 34], RENK.yazi, 3);
  }
  function sicaklikCizgisi(c, g, y0) {
    cizgi(c, g, [XC + 4, cy(y0)], [XC + 56, cy(y0)], RENK.ince, 3);
  }
  function cizim5(c, g, y0) {   // iki sarı halka, ortada nokta
    sicaklikCizgisi(c, g, y0);
    c.S('circle', { cx: XC + 6, cy: cy(y0), r: 6, fill: RENK.koyu, stroke: S.sicaklik, 'stroke-width': 3 }, g);
    c.S('circle', { cx: XC + 54, cy: cy(y0), r: 6, fill: RENK.koyu, stroke: S.sicaklik, 'stroke-width': 3 }, g);
    c.S('circle', { cx: XC + 30, cy: cy(y0), r: 4.5, fill: RENK.yazi }, g);
  }
  function cizim6(c, g, y0) {   // bir ucunda turkuaz büyük halka, nokta ona yakın
    sicaklikCizgisi(c, g, y0);
    c.S('circle', { cx: XC + 12, cy: cy(y0), r: 12, fill: S.kutle, 'fill-opacity': 0.3, stroke: S.kutle, 'stroke-width': 3 }, g);
    c.S('circle', { cx: XC + 54, cy: cy(y0), r: 6, fill: RENK.koyu, stroke: S.sicaklik, 'stroke-width': 3 }, g);
    c.S('circle', { cx: XC + 30, cy: cy(y0), r: 4.5, fill: RENK.yazi }, g);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const fig = duzenek(c, svg); gizle(fig);
    const onceki = [];
    const kural = async (i, cizim, parcalar, cumle) => {
      const g = c.S('g', {}, svg);
      cizim(c, g, SATIR[i]);
      renkli(c, g, XY, SATIR[i] + 39, parcalar, { hiza: 'start', size: 26, kalin: 600 });
      gizle(g);
      c.clearSay();
      await par(c.say(cumle), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)));
      await c.wait(400);
      onceki.push(g);
    };

    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, fig, 400));
    await c.wait(300);
    await kural(0, cizim1, [['ısı', S.isi], ': sıcaktan soğuğa'], 'Isı, sıcaklığı yüksek olandan düşük olana aktarılır.');
    c.note('Sıcaktan soğuğa aktarılır.', 'Isının yönü', 'en-d3-yon');
    await kural(1, cizim2, ['eşitlenene kadar sürer'], 'Isı aktarımı, sıcaklıklar eşitlenene kadar sürer.');
    c.note('Sıcaklıklar eşitlenene kadar sürer.', 'Isı aktarımı', 'en-d3-surer');
    await kural(2, cizim3, [['sıcaklıklar eşit', S.sicaklik], ': ısıl denge'], 'Sıcaklıkları eşit olan maddeler ısıl dengededir; ısı alışverişi olmaz.');
    c.note('Sıcaklıklar eşit; ısı alışverişi olmaz.', 'Isıl denge', 'en-d3-denge');
    await kural(3, cizim4, [['verilen ısı = alınan ısı', S.isi]], 'Verilen ısı, alınan ısıya eşittir.');
    c.note('Verilen ısı, alınan ısıya eşittir.', 'Isı alışverişi', 'en-d3-esit');
    await kural(4, cizim5, [['son sıcaklık', S.sicaklik], ': arada'], 'Son sıcaklık, ilk sıcaklıkların arasındadır.');
    c.note('İlk sıcaklıkların arasındadır.', 'Son sıcaklık', 'en-d3-arada');
    await kural(5, cizim6, [['büyük ısı sığası', S.kutle], ': ona yakın'], 'Isı sığası büyük olana yakın durur; eşitse tam ortadadır.');
    c.note('Isı sığası büyük olana yakındır; eşitse ortadadır.', 'Isı sığası', 'en-d3-sigi');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-d3', kicker: 'Konu D · Isıl denge', title: 'Konu tekrarı: Isıl denge', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Isıl denge',
      hook: 'Isıl dengenin kuralları aklında mı? Önce altı kuralı topla, sonra <b>yedi soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Isıl denge konusunun altı kuralını hatırlar.', 'Kuralları yeni durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Buzdolabından çıkan 4 °C’lık limonata, 28 °C’lık odada masada unutuluyor. Uzun süre sonra limonatanın sıcaklığı için hangisi doğrudur?',
        options: ['16 °C olur; ikisinin ortasıdır', '28 °C olur; sonra ısı alışverişi biter', '4 °C’ta kalır'], answer: 1,
        why: ['Tam ortada buluşma ısı sığaları eşitse olur; oda çok büyük olduğundan limonata odanın sıcaklığına gelir.', 'Isı aktarımı sıcaklıklar eşitlenene kadar sürer; limonata odayla aynı sıcaklığa gelince ısı alışverişi biter.', 'Limonata odadan soğuktur; ısı alır ve sıcaklığı yükselir.'], scene: 0,
      },
      {
        q: 'Aynı kütlede 60 °C’lık su ile 20 °C’lık zeytinyağı yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur?',
        options: ['60 °C’a daha yakındır; suyun ısı sığası büyüktür', '20 °C’a daha yakındır; yağ daha soğuktur', 'Tam ortasındadır'], answer: 0,
        why: ['Isı sığası büyük olanın sıcaklığı daha az değişir; zeytinyağının öz ısısı suyunkinin yarısı olduğundan denge sıcaklığı suya yakın olur.', 'Yakınlığı soğuk ya da sıcak olmak belirlemez; ısı sığası büyük olan suya yakın durulur.', 'Tam orta, yalnızca ısı sığaları eşitse olur; su ile zeytinyağınınki eşit değildir.'], scene: 0,
      },
      {
        q: 'Isıl dengedeki iki madde için hangisi doğrudur?',
        options: ['Sıcaklıkları eşittir; ısı bir yönde aktarılmaya devam eder', 'Isı sığaları eşittir', 'Sıcaklıkları eşittir; aralarında ısı alışverişi olmaz'], answer: 2,
        why: ['Sıcaklıklar eşitse ısı aktarımı sona ermiştir; aktarım devam etmez.', 'Isıl denge sıcaklıkların eşitliğidir; ısı sığaları farklı olabilir.', 'Isıl dengede sıcaklıklar eşittir ve ısı alışverişi olmaz.'], scene: 0,
      },
      {
        q: 'Yalıtılmış sistemde A’nın sıcaklığı 20 °C düştü, B’ninki 4 °C yükseldi. Hangisi doğrudur?',
        options: ['A daha çok ısı verdi; B’nin ısı sığası daha küçüktür', 'Verilen ısı alınan ısıya eşittir; B’nin ısı sığası daha büyüktür', 'A’nın ısı sığası daha büyüktür; verilen ısı alınandan fazladır'], answer: 1,
        why: ['Verilen ısı alınan ısıya eşittir, A fazla ısı vermemiştir; sıcaklığı az değişenin ısı sığası büyüktür.', 'Yalıtılmış sistemde verilen ısı alınan ısıya eşittir; B’nin sıcaklığı daha az değiştiği için ısı sığası daha büyüktür.', 'Verilen ısı alınandan fazla olamaz; ayrıca sıcaklığı çok değişen A’nın ısı sığası küçüktür.'], scene: 0,
      },
      {
        q: '10 °C ve 50 °C’taki iki su ısıl dengeye geliyor. Son sıcaklık hangisi olamaz?',
        options: ['55 °C', '30 °C', '25 °C'], answer: 0,
        why: ['Son sıcaklık ilk sıcaklıkların arasındadır; 55 °C en sıcak olan 50 °C’tan da yüksektir, bu yüzden olamaz.', 'Bu değer iki ilk sıcaklığın arasındadır; olabilir.', 'Bu değer de iki ilk sıcaklığın arasındadır; olabilir.'], scene: 0,
      },
      {
        q: 'Termometre ile vücut sıcaklığı ölçülüyor ve sütun duruyor. Okunan değer için hangisi doğrudur?',
        options: ['Termometrenin ilk sıcaklığına yakındır', 'İkisinin tam ortasındadır', 'Vücut sıcaklığına çok yakındır; vücudun ısı sığası çok büyüktür'], answer: 2,
        why: ['Isı sığası küçük olan termometrenin sıcaklığı çok değişir; ilk sıcaklığında kalmaz.', 'Tam orta, ısı sığaları eşitse olur; vücudun ısı sığası termometreninkinden çok büyüktür.', 'Isı sığası büyük olan vücudun sıcaklığı hemen hiç değişmez; termometre ona yakın bir değerde durur.'], scene: 0,
      },
      {
        q: '80 °C’taki 300 g su, 20 °C’taki 100 g suya katılıyor. Denge sıcaklığı hangisine daha yakındır?',
        options: ['20 °C’a; soğuk su ısı alır', '80 °C’a; kütlesi büyük olan suyun ilk sıcaklığına', 'İkisinin tam ortasına'], answer: 1,
        why: ['Soğuk suyun ısı alması, denge sıcaklığının ona yakın olması demek değildir; ısı sığası küçük olanın sıcaklığı çok değişir.', 'Kütlesi büyük olan suyun ısı sığası büyüktür; denge sıcaklığı ona yakın durur.', 'Tam orta, ısı sığaları eşitse olur; burada sıcak suyun kütlesi, dolayısıyla ısı sığası daha büyüktür.'], scene: 0,
      },
    ],
    summary: [
      '<b>Isı sıcaktan soğuğa aktarılır; sıcaklıklar eşitlenince ısıl denge kurulur.</b>',
      'Verilen ısı alınan ısıya eşittir; son sıcaklık ilk sıcaklıkların arasındadır.',
      'Son sıcaklık, ısı sığası büyük olana yakın durur; ısı sığaları eşitse tam ortadadır.',
    ],
  });
})();
