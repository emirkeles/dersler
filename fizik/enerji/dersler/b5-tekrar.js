/* B5 — Konu tekrarı: Isının hesabı
   Yeni bilgi yok. Tek sahnede konunun altı kuralı 3 × 2 ızgarada sırayla toplanır; ardından dokuz soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/B-isinin-hesabi.md (B5). Çizimler şematiktir; kuralların küçük çizimleri düz vektördür. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, cubuk } = window.KIT;
  const { kap, termometre } = window.KIT_A;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, soguk: RENK.soguk };
  const CAM = RENK.cizgi;
  const X = [190, 510, 830];               // üç sütunun ortası (hücreler 40–340, 360–660, 680–980)
  const Y = [70, 290];                     // iki satırın üst kenarı (hücre yüksekliği 190)

  /* Kuralın kısa etiketi: hücrenin altında 24 birimlik yazı (tam cümle altyazıda ve defterde). */
  const etiket = (c, g, cx, y0, metin, renk) => yazi(c, g, cx, y0 + 183, metin, { size: 24, kalin: 600, renk });
  const cerceve = (c, g, x, y, w, h, rx = 3) => c.S('rect', { x, y, width: w, height: h, rx, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);

  /* ---- 1. Sıcaklık aynı, ölçek farklı: tek sarı sütun ve üç kısa cetvel ---- */
  function olcek(c, g, cx, y0) {
    termometre(c, g, { x: cx - 85, y: y0 + 150, h: 125, T: 60 });
    const yer = (k, n) => y0 + 25 + (125 * k) / n;
    [[cx - 25, 5], [cx + 20, 9], [cx + 65, 5]].forEach(([x, n]) => {
      cizgi(c, g, [x, y0 + 25], [x, y0 + 150], CAM, 3);
      for (let k = 0; k <= n; k++) cizgi(c, g, [x, yer(k, n)], [x + 14, yer(k, n)], CAM, 2);
    });
    etiket(c, g, cx, y0, 'üç ölçek', S.sicaklik);
  }

  /* ---- 2. Termometre türü: beş küçük simge (sıvılı, metal, gazlı, kızılötesi, dijital) ---- */
  function turler(c, g, cx, y0) {
    const cy = y0 + 85, d = (k) => cx + (k - 2) * 58;
    // sıvılı: ince cam boru, altında hazne, içinde sarı sütun
    cerceve(c, g, d(0) - 5, cy - 40, 10, 62, 5);
    c.S('rect', { x: d(0) - 2, y: cy - 10, width: 4, height: 34, fill: S.sicaklik }, g);
    c.S('circle', { cx: d(0), cy: cy + 30, r: 11, fill: S.sicaklik, stroke: CAM, 'stroke-width': 3 }, g);
    // metal: yuvarlak kadran ve uzun ince sap
    c.S('circle', { cx: d(1), cy: cy - 20, r: 18, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    cizgi(c, g, [d(1), cy - 20], [d(1) + 9, cy - 28], CAM, 3);
    cizgi(c, g, [d(1), cy - 2], [d(1), cy + 42], CAM, 4);
    // gazlı: yuvarlak kadran ve yanından çıkan kısa düz sap
    c.S('circle', { cx: d(2) - 8, cy: cy - 5, r: 18, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    cizgi(c, g, [d(2) - 8, cy - 5], [d(2) - 1, cy - 13], CAM, 3);
    cizgi(c, g, [d(2) + 10, cy - 5], [d(2) + 26, cy - 5], CAM, 4);
    // kızılötesi: tabanca biçimli gövde ve ucundan çıkan üç kısa ışın
    cerceve(c, g, d(3) - 24, cy - 22, 32, 18, 4);
    cerceve(c, g, d(3) - 16, cy - 4, 12, 24, 3);
    cizgi(c, g, [d(3) + 13, cy - 13], [d(3) + 25, cy - 25], CAM, 3);
    cizgi(c, g, [d(3) + 13, cy - 13], [d(3) + 27, cy - 13], CAM, 3);
    cizgi(c, g, [d(3) + 13, cy - 13], [d(3) + 25, cy - 1], CAM, 3);
    // dijital: ince çubuk ve ortasında küçük ekran
    cerceve(c, g, d(4) - 9, cy - 40, 18, 80, 5);
    cerceve(c, g, d(4) - 5, cy - 24, 10, 16, 2);
    etiket(c, g, cx, y0, 'beş tür');
  }

  /* ---- 3. Öz ısı: beher, üstünde turuncu ok ve "1 °C" ---- */
  function ozIsi(c, g, cx, y0) {
    kap(c, g, { x: cx - 55, y: y0 + 55, w: 110, h: 95, su: 58 });
    ok(c, g, [cx, y0 + 4], [cx, y0 + 48], S.isi, 7);
    yazi(c, g, cx + 20, y0 + 32, '1 °C', { size: 26, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    etiket(c, g, cx, y0, 'öz ısı');
  }

  /* ---- 4. Isı sığası: bir blok ve yanında iki kat yüksek blok ("C", "2 C") ---- */
  function sigasi(c, g, cx, y0) {
    const alt = y0 + 150, boyAz = 50, boyCok = 100;
    const a = kutu(c, g, cx - 90, alt - boyAz, 70, boyAz, { rx: 6, renk: S.kutle }), b = kutu(c, g, cx + 20, alt - boyCok, 70, boyCok, { rx: 6, renk: S.kutle });
    a.setAttribute('fill', S.kutle); a.setAttribute('fill-opacity', 0.25); b.setAttribute('fill', S.kutle); b.setAttribute('fill-opacity', 0.25);
    yazi(c, g, cx - 55, alt - boyAz - 12, 'C', { size: 28, kalin: 700 });
    yazi(c, g, cx + 55, alt - boyCok - 12, '2 C', { size: 28, kalin: 700 });
    etiket(c, g, cx, y0, 'ısı sığası');
  }

  /* ---- 5. Model: renkli formül ---- */
  function model(c, g, cx, y0) {
    renkli(c, g, cx, y0 + 105, [['Q', S.isi], ' = ', ['m', S.kutle], ' · c · ', ['ΔT', S.sicaklik]], { size: 34, kalin: 700 });
  }

  /* ---- 6. Ters orantı: uzun sarı çubuğun yanında kısa turkuaz, kısa sarının yanında uzun turkuaz ---- */
  function ters(c, g, cx, y0) {
    const x = cx - 85, uzun = 170, kisa = 55;
    [[y0 + 40, S.sicaklik, uzun], [y0 + 68, S.kutle, kisa], [y0 + 105, S.sicaklik, kisa], [y0 + 133, S.kutle, uzun]].forEach(([y, renk, w]) => {
      cubuk(c, g, x, y, renk).boy(w);
    });
    etiket(c, g, cx, y0, 'ters orantı');
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const kural = async (yap, k, cumle, opt) => {
      const g = c.S('g', {}, svg); yap(c, g, X[k % 3], Y[Math.floor(k / 3)]); gizle(g);
      c.clearSay();
      await par(c.say(cumle, opt), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)));
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Isının hesabı', { size: 64, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(olcek, 0, 'Sıcaklık aynı kalır; ölçek değişince sayı değişir.');
    c.note('Sıcaklık aynı, ölçek farklı.', 'Ölçek', 'en-b5-olcek');
    await kural(turler, 1, 'Termometre türü, ölçülecek ortama göre seçilir.');
    c.note('Termometre türü ortama göre seçilir.', 'Termometre türü', 'en-b5-tur');
    await kural(ozIsi, 2, 'Öz ısı, birim kütlenin 1 °C için istediği ısıdır; maddeye aittir.',
      { speak: 'Öz ısı, birim kütlenin bir derece için istediği ısıdır; maddeye aittir.' });
    c.note('Öz ısı maddenin özelliğidir.', 'Öz ısı', 'en-b5-ozisi');
    await kural(sigasi, 3, 'Isı sığası cisme aittir: C = m · c.',
      { speak: 'Isı sığası cisme aittir: büyük C eşittir m çarpı küçük c.' });
    c.note('Isı sığası cismin özelliğidir: C = m · c.', 'Isı sığası', 'en-b5-sigasi');
    await kural(model, 4, 'Model: Q = m · c · ΔT.',
      { speak: 'Model: Q eşittir m çarpı c çarpı delta T.' });
    c.note('Q = m · c · ΔT', 'Isının hesabı', 'en-b5-model');
    await kural(ters, 5, 'Eşit ısıda ΔT, kütleyle ve öz ısıyla ters orantılıdır.',
      { speak: 'Eşit ısıda delta T, kütleyle ve öz ısıyla ters orantılıdır.' });
    c.note('Eşit ısıda ΔT, m ve c ile ters orantılıdır.', 'Ters orantı', 'en-b5-ters');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-b5', kicker: 'Konu B · Isının hesabı', title: 'Konu tekrarı: Isının hesabı', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Isının hesabı',
      hook: 'Ölçek, öz ısı, ısı sığası, <b>Q = m · c · ΔT</b>: önce altı kuralı topla, sonra <b>dokuz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Ela’nın termometresi suyun donma sıcaklığında 273 gösteriyor. Termometrenin ölçeği hangisidir?',
        options: ['Celsius', 'Kelvin', 'Fahrenheit'], answer: 1,
        why: ['Celsius ölçeğinde suyun donma sıcaklığı 0 olarak okunur.', 'Suyun donma sıcaklığı Kelvin ölçeğinde 273 olarak okunur; sıcaklık aynı, yalnızca sayı farklıdır.', 'Fahrenheit ölçeğinde suyun donma sıcaklığı 32 olarak okunur.'], scene: 0,
      },
      {
        q: 'Aynı odada bir Celsius ve bir Fahrenheit termometresi farklı sayılar gösteriyor. Hangisi doğrudur?',
        options: ['Sıcaklık aynı, ölçek farklı', 'Oda iki ayrı sıcaklıktadır', 'Termometrelerden biri bozuktur'], answer: 0,
        why: ['Ölçek değişince sıcaklık değişmez, yalnızca onu gösteren sayı değişir.', 'Odanın sıcaklığı tektir; iki sayı aynı sıcaklığın iki ayrı ölçekteki yazılışıdır.', 'İki termometre de doğru çalışıyor; sayılar ölçekleri farklı olduğu için farklıdır.'], scene: 0,
      },
      {
        q: 'Bir gıda tesisinde ürünlerin sıcaklığı, ürünlere dokunmadan ölçülecek. Hangi termometre uygundur?',
        options: ['Sıvılı', 'Metal', 'Kızılötesi'], answer: 2,
        why: ['Sıvılı termometre vücut ve ortam sıcaklığını ölçer; dokunmadan ölçmez.', 'Metal termometre fırın ve termostat gibi yerlerde kullanılır; dokunmadan ölçmez.', 'Kızılötesi termometre cisme dokunmadan, ışınları algılayarak ölçer.'], scene: 0,
      },
      {
        q: 'Aynı maddeden 300 g ve 600 g iki cisim için hangisi doğrudur?',
        options: ['Isı sığaları eşit; 600 g’ın öz ısısı iki katıdır', 'Öz ısıları eşit; 600 g’ın ısı sığası iki katıdır', 'Öz ısıları da ısı sığaları da eşittir'], answer: 1,
        why: ['Öz ısı maddeye aittir, kütleye değil; ısı sığası ise C = m · c olduğundan kütleyle büyür.', 'Aynı maddeden oldukları için öz ısıları eşittir; C = m · c olduğundan kütlesi iki katı olanın ısı sığası da iki katıdır.', 'Öz ısıları eşit, ama ısı sığası cisme aittir ve kütleyle değişir.'], scene: 0,
      },
      {
        q: 'Ela 400 g suyu 25 °C’tan 35 °C’a ısıtıyor (su 4,18 J/g · °C). Gereken ısı kaç J’dür?',
        options: ['1.672', '58.520', '16.720'], answer: 2,
        why: ['1.672, ΔT ile çarpmayı unutmaktır; 400 · 4,18 yalnızca 1 °C için gereken ısıdır.', 'ΔT son sıcaklık değildir; ΔT = 35 − 25 = 10 olur, 35 ile çarpılmaz.', 'ΔT = 10; Q = 400 · 4,18 · 10 = 16.720 J.'], scene: 0,
      },
      {
        q: 'Öz ısısı 0,45 J/g · °C olan B maddesinden 200 g, sıcaklığı 20 °C artıncaya kadar ısıtılıyor. Gereken ısı kaç J’dür?',
        options: ['1.800', '90', '4.000'], answer: 0,
        why: ['Q = 200 · 0,45 · 20 = 90 · 20 = 1.800 J.', '90, ΔT ile çarpmayı unutmaktır; 200 · 0,45 yalnızca 1 °C için gereken ısıdır.', '4.000, öz ısıyı unutmaktır; 200 · 20 yazılmış, 0,45 ile çarpılmamıştır.'], scene: 0,
      },
      {
        q: '250 g su 5.225 J ısı alıyor (su 4,18 J/g · °C). Sıcaklığı kaç °C artar?',
        options: ['10', '5', '25'], answer: 1,
        why: ['Bölme yanlış yapılmış; 5.225 ÷ 1.045 sonucu 10 değildir.', 'ΔT = Q ÷ (m · c) = 5.225 ÷ (250 · 4,18) = 5.225 ÷ 1.045 = 5 °C.', '25, öz ısıdaki virgülü kaydırmaktır: 4,18 yerine 0,836 ile çarpmaya benzer.'], scene: 0,
      },
      {
        q: 'Aynı ısıtıcıyla aynı süre ısıtılan, aynı maddeden 4 m kütleli cismin ΔT’si m kütleli olanın kaç katıdır?',
        options: ['Dörtte biri', '4 katı', 'Aynı'], answer: 0,
        why: ['Q ve c eşit olduğundan m · ΔT sabittir; kütle 4 katına çıkınca ΔT dörtte birine iner.', 'Kütle arttıkça ΔT artmaz, azalır; ikisi ters orantılıdır.', 'Isı eşit olsa da kütle farklıdır; m · ΔT sabit olduğundan ΔT aynı kalmaz.'], scene: 0,
      },
      {
        q: 'm kütleli, c öz ısılı cisme Q ısı verilince sıcaklık değişimi T oluyor. Kütlesi 3 m, öz ısısı c/2 olan başka bir cisme 6 Q verilirse sıcaklık değişimi kaç T olur?',
        options: ['2 T', '6 T', '4 T'], answer: 2,
        why: ['2 T, öz ısıyı hesaba katmamaktır; 6 Q = 3 m · c · ΔT′ yazılmıştır.', '6 T, yalnızca ısı oranını almaktır; kütle ve öz ısı da değişmiştir.', 'Q = m · c · T olduğundan 6 Q = 3 m · (c/2) · ΔT′ = 1,5 · m · c · ΔT′ olur; buradan ΔT′ = 4 T bulunur.'], scene: 0,
      },
    ],
    summary: [
      '<b>Q = m · c · ΔT; eşit ısıda ΔT, kütleyle ve öz ısıyla ters orantılıdır.</b>',
      'Sıcaklık ölçekten bağımsızdır; termometre türü ortama göre seçilir.',
      'Öz ısı maddeye, ısı sığası cisme aittir: C = m · c.',
    ],
  });
})();
