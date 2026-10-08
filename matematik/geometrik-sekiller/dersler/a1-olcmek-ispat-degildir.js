/* A1 — Ölçmek ispat değildir
   Birkaç üçgende ölçüp 180° bulmak bütün üçgenler için bir şey göstermez; genelleme ispat ister.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md ("Pilot" bölümü).
   Sıra plan/KURALLAR.md 3.2'ye göredir: önce anlat, örnekle göster, birlikte çöz, sonra sor. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, kutu, gizle, belir, par, cevapla, ucgen, tepeKontrol } = window.KIT;

  /* Yan yana üç üçgen: önce açılar, sonra altlarına toplam yazılır. */
  async function ucUcgen(c, svg, koseler, adlar) {
    const us = koseler.map((k) => ucgen(c, svg, k[0], k[1], k[2], { harf: false, olcu: 'derece', r: 34, olcuSize: 20 }));
    const toplamlar = koseler.map((k) => yazi(c, svg, (k[1][0] + k[2][0]) / 2, 418, '180°', { size: 30, kalin: 700 }));
    const adYazi = (adlar || []).map((ad, i) => yazi(c, svg, (koseler[i][1][0] + koseler[i][2][0]) / 2, 462, ad, { size: 22, kalin: 500, renk: RENK.soluk }));
    us.forEach((u) => gizle(u.g, u.olculer)); gizle(toplamlar, adYazi);
    return { us, toplamlar, adYazi };
  }
  async function olc(c, d) {
    for (let i = 0; i < d.us.length; i++) {
      await belir(c, d.us[i].olculer, 350); await c.wait(250);
      await belir(c, d.toplamlar[i], 300); await c.wait(200);
    }
  }
  /* Ölçüler okunduktan sonra silinir; tahtada yalnızca toplamlar kalır. */
  const olculeriSil = (c, d) => belir(c, d.us.flatMap((u) => u.olculer), 300, 0);

  /* ---- 1. Üç maket: genelleme ve doğrulama ---- */
  async function ucMaket(c) {
    const svg = c.svg(1000, 562);
    const d = await ucUcgen(c, svg, [
      [[170, 170], [70, 360], [290, 360]],
      [[520, 150], [400, 360], [620, 360]],
      [[800, 190], [720, 360], [930, 360]],
    ]);
    const onerme = yazi(c, svg, 500, 64, 'Her üçgende iç açılar toplamı 180°dir.', { size: 30, kalin: 700 });
    const etiket = yazi(c, svg, 500, 468, 'doğrulama: ölçülen üç üçgen', { size: 24, kalin: 600, renk: RENK.iyi });
    const alt = yazi(c, svg, 500, 512, 'üçü de dar açılı', { size: 24, kalin: 600, renk: RENK.dis });
    gizle(onerme, etiket, alt);

    // Anlat: durum, sonra iki kavram (genelleme, doğrulama) adlandırılır.
    await par(c.say('Bir mimar üç maket üçgenin açılarını ölçüyor.'), (async () => {
      for (const u of d.us) { await belir(c, u.g, 350); await c.wait(150); }
    })());
    await par(c.say('Üçünde de açıların toplamı <b>180°</b> çıktı.', { speak: 'Üçünde de açıların toplamı yüz seksen derece çıktı.' }), olc(c, d));
    await olculeriSil(c, d);
    await par(c.say('Mimar bir sonuca varıyor: her üçgende toplam 180°dir.', { speak: 'Mimar bir sonuca varıyor: her üçgende toplam yüz seksen derecedir.' }), belir(c, onerme, 450));
    await c.say('Bu cümle bir <b>genelleme</b>: bütün üçgenlerden söz ediyor.');
    await par(c.say('Ölçmek ise <b>doğrulama</b>dır: yalnızca ölçülen üçgenleri kapsar.'), belir(c, etiket, 400));
    await par(c.say('Üstelik üç maket de aynı türden: hepsi <b>dar açılı</b>.'), belir(c, alt, 400));

    // Sor: anlatılan, ölçümün kapsamına uygulanır.
    await c.choice({
      tag: 'Sıra sende', q: 'Üç ölçüm hangi üçgenler için kesin bilgi verir?',
      options: ['Bütün üçgenler', 'Yalnızca ölçülen üç üçgen', 'Bütün dar açılı üçgenler'], answer: 1,
      hints: ['Ölçülmemiş üçgenler hakkında elimizde bir ölçüm yok.', '', 'Öteki dar açılı üçgenler de ölçülmedi.'],
      right: 'Evet. Ölçüm yalnızca ölçülen üçgeni anlatır.',
    });
    await c.say('Genelleme hepsini söylüyor; elimizde yalnızca üç ölçüm var.', { speak: '[thoughtful] Genelleme hepsini söylüyor; elimizde yalnızca üç ölçüm var.' });
  }

  /* ---- 2. Başka türler: çeşitlilik güveni artırır, listeyi bitirmez ---- */
  async function baskaTurler(c) {
    const svg = c.svg(1000, 562);
    const d = await ucUcgen(c, svg, [
      [[70, 150], [70, 360], [290, 360]],
      [[640, 200], [390, 360], [570, 360]],
      [[830, 140], [750, 360], [910, 360]],
    ], ['dik', 'geniş açılı', 'ikizkenar']);
    await par(c.say('Mimar bu kez başka türleri ölçüyor: dik, geniş açılı, ikizkenar.'), (async () => {
      for (let i = 0; i < 3; i++) { await par(belir(c, d.us[i].g, 350), belir(c, d.adYazi[i], 350)); await c.wait(150); }
    })());
    await par(c.say('Toplam yine <b>180°</b>.', { speak: 'Toplam yine yüz seksen derece.' }), olc(c, d));
    await olculeriSil(c, d);
    await c.say('Aynı türden üçgenler birbirine benzer; farklı türler denemeyi güçlendirir.');
    await c.say('Yine de her türde sayısız üçgen var; biz altısını ölçtük.', { speak: 'Yine de her türde sayısız üçgen var; biz altısını ölçtük.' });

    // Birlikte çöz: üç cümlelik tablo; ilk ikisi adlandırılmış, üçüncüyü öğrenci adlandırır.
    await belir(c, [...d.us.map((u) => u.g), ...d.toplamlar, ...d.adYazi], 300, 0);
    const tablo = c.S('g', {}, svg);
    const satirlar = [['“Bu makette toplam 180°.”', 'örnek'], ['“Altı üçgende toplam 180° çıktı.”', 'doğrulama'], ['“Her üçgende toplam 180°dir.”', '?']];
    const adlar = satirlar.map(([cumle, ad], i) => {
      const y = 150 + i * 120;
      kutu(c, tablo, 90, y - 46, 820, 84);
      yazi(c, tablo, 120, y + 6, cumle, { hiza: 'start', size: 26, kalin: 600 });
      return yazi(c, tablo, 880, y + 6, ad, { hiza: 'end', size: 26, kalin: 700, renk: ad === '?' ? RENK.dis : RENK.soluk });
    });
    gizle(tablo);
    await par(c.say('Üç cümleyi adlandıralım; ilk ikisi hazır.'), belir(c, tablo, 400));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü cümle hangisidir?',
      options: ['Örnek', 'Doğrulama', 'Genelleme'], answer: 2,
      hints: ['Örnek tek bir üçgeni anlatır; bu cümle hepsinden söz ediyor.', 'Doğrulama ölçülen üçgenleri söyler; burada “her üçgen” deniyor.', ''],
      right: 'Evet. “Her üçgende” diyen cümle bir genellemedir.',
    });
    cevapla(adlar[2], 'genelleme');
    await c.say('Farklı türler güveni artırır, ama denenecek üçgen bitmez.', { speak: '[thoughtful] Farklı türler güveni artırır, ama denenecek üçgen bitmez.' });
  }

  /* ---- 3. Dene: denenmemiş üçgen hep kalır ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const B = [250, 430], C = [750, 430];
    const u = ucgen(c, svg, [450, 170], B, C, { olcu: 'derece' });
    const toplam = renkli(c, svg, 500, 520, [''], { size: 34, kalin: 700 });
    const sayac = yazi(c, svg, 40, 48, '', { hiza: 'start', size: 22, kalin: 600 });
    yazi(c, svg, 40, 80, 'Denenmemiş: sonsuz', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    let n = 0;
    const ciz = (P) => {
      u.koy(P, B, C); const [a, b, g] = u.D(); n++;
      parcaKoy(c, toplam, [[a + '°', RENK.A], ' + ', [b + '°', RENK.B], ' + ', [g + '°', RENK.C], ' = 180°']);
      sayac.textContent = 'Denenen üçgen: ' + n;
    };
    ciz([450, 170]);

    // Anlat ve göster: köşe azıcık kayınca başka bir üçgen olur.
    await par(c.say('Tepe köşesi azıcık kayınca ortaya yeni bir üçgen çıkar.'),
      c.tween(1600, (e) => ciz([450 + 130 * Math.sin(Math.PI * e), 170 + 40 * Math.sin(Math.PI * e)])));
    n = 1; ciz([450, 170]); n = 1; sayac.textContent = 'Denenen üçgen: 1';
    await c.say('Köşenin durabileceği yerler bitmez; üçgenler de bitmez.');

    await c.say('Tepe köşesini gezdir: toplam hiç değişiyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [150, 850], y: [130, 330], bas: [450, 170], ciz });
    await c.cont('Devam ›');
    t.kaldir();

    // Sor: öğrenci tek başına.
    await c.choice({
      tag: 'Sıra sende', q: '1000 üçgen denedin, hepsinde 180° çıktı. Denenmemiş kaç üçgen kaldı?',
      options: ['Hiç kalmadı', 'Birkaç tane', 'Sonsuz sayıda'], answer: 2,
      hints: ['Köşeyi azıcık kaydır: yeni bir üçgen daha.', 'Köşenin her konumu ayrı bir üçgen; konumlar bitmez.', ''],
      right: 'Evet. Denenenler artar, denenmemişler bitmez.',
    });
    await c.say('Kaç üçgen denersen dene, denenmemişler hep kalır.');
  }

  /* ---- 4. Doğrulama ve ispat ---- */
  async function adlandir(c) {
    const svg = c.svg(1000, 562);
    const kucuk = (p, x, y, s, k, renk) => c.S('polygon', {
      points: k.map((q) => (x + q[0] * s) + ',' + (y + q[1] * s)).join(' '), fill: 'none', stroke: renk, 'stroke-width': 2, 'stroke-linejoin': 'round',
    }, p);
    const bicimler = [[[0, 0], [-10, 20], [12, 20]], [[-10, 0], [-10, 20], [12, 20]], [[14, 4], [-12, 20], [6, 20]], [[0, -4], [-8, 20], [8, 20]], [[-4, 2], [-12, 20], [14, 20]], [[6, 0], [-12, 20], [10, 20]]];
    const onerme = yazi(c, svg, 500, 70, 'Her üçgende iç açılar toplamı 180°dir.', { size: 30, kalin: 700 });
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    kutu(c, sol, 70, 130, 400, 330); kutu(c, sag, 530, 130, 400, 330, { renk: RENK.iyi });
    yazi(c, sol, 270, 180, 'Doğrulama', { size: 30, kalin: 700 });
    yazi(c, sol, 270, 428, 'denediğin üçgenler', { size: 24, kalin: 500, renk: RENK.soluk });
    bicimler.forEach((b, i) => kucuk(sol, 150 + (i % 3) * 120, 240 + Math.floor(i / 3) * 80, 2.2, b, RENK.cizgi));
    yazi(c, sag, 730, 180, 'İspat', { size: 30, kalin: 700, renk: RENK.iyi });
    yazi(c, sag, 730, 428, 'bütün üçgenler', { size: 24, kalin: 500, renk: RENK.soluk });
    for (let i = 0; i < 40; i++) kucuk(sag, 562 + (i % 10) * 37.5, 222 + Math.floor(i / 10) * 46, 0.95, bicimler[(i * 5 + Math.floor(i / 10)) % 6], RENK.iyi);
    gizle(onerme, sol, sag);

    // Anlat: iki yol yan yana kurulur; ispatın ne yaptığı sorudan önce söylenir.
    await par(c.say('Genellememiz bütün üçgenler hakkında konuşuyor.'), belir(c, onerme, 450));
    await par(c.say('Ölçerek <b>doğruladık</b>: yalnızca denediğimiz üçgenler için.'), belir(c, sol, 450));
    await par(c.say('<b>İspat</b> tek tek denemez; her üçgende geçerli adımlarla gösterir.', { speak: 'İspat, [short pause] tek tek denemez; her üçgende geçerli adımlarla gösterir.' }), belir(c, sag, 450));
    await c.say('Adımlar üçgenin biçimine bakmaz; bu yüzden hepsini kapsar.');
    await c.choice({
      tag: 'Sıra sende', q: 'Hangisi bir ispatın işidir?',
      options: ['Çok sayıda üçgeni ölçmek', 'En düzgün üçgeni çizmek', 'Her üçgende geçerli adımlarla göstermek'], answer: 2,
      hints: ['Ölçüm kaç olursa olsun, denenmemiş üçgen kalır.', 'En düzgün çizim de tek bir üçgendir.', ''],
      right: 'Evet. İspat, tek tek denemeden hepsini kapsar.',
    });
    c.note('<b>Doğrulama:</b> denenen örnekler.<br><b>İspat:</b> bütün üçgenler.', 'Doğrulama ve ispat', 'gs-dogrulama-ispat');
    await c.say('Sonraki derslerde bu genellemeyi ispatlayacağız.');
  }

  Ders.start({
    id: 'geometrik-sekiller-a1', kicker: 'Konu A · Açılar ve ispat', title: 'Ölçmek ispat değildir', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Ölçmek ispat değildir',
      hook: 'Bir mimar üç maket üçgende açıları ölçtü; üçünde de toplam <b>180°</b> çıktı. Çizeceği <b>bütün</b> üçgenler için emin olabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Genellemeyi, örneği ve doğrulamayı birbirinden ayırır.', 'Birkaç örneğin bir genellemeyi ispatlamadığını görür.', 'Doğrulama ile ispatı birbirinden ayırır.'],
    scenes: [
      { title: 'Üç maket', goal: 'Genelleme hepsini söyler; ölçüm yalnızca ölçüleni.', run: ucMaket },
      { title: 'Başka türler', goal: 'Farklı türde üçgenler dene; liste yine bitmez.', run: baskaTurler },
      { title: 'Dene', goal: 'Tepe köşesini gezdir; denenmemiş üçgen hep kalır.', run: dene },
      { title: 'Doğrulama ve ispat', goal: 'Doğrulama örnekleri, ispat bütün üçgenleri kapsar.', run: adlandir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Elif 50 farklı üçgende iç açıları ölçtü, hepsinde toplam 180° çıktı. Bu ne gösterir?',
        options: ['Önerme bütün üçgenler için ispatlandı.', 'Önerme 50 üçgen için doğrulandı; bütün üçgenler için ispat gerekir.', '50 örnek yetmez, ama 1000 örnek ispat olur.'], answer: 1,
        why: ['Denenmemiş üçgenler var; ölçmek onları kapsamaz.', 'Ölçmek yalnızca denenen üçgenleri kapsar.', 'Örnek sayısı kaç olursa olsun denenmemiş üçgen kalır.'],
        scene: 3,
      },
      {
        q: 'Bir genellemeyi sınarken hangi üç üçgen daha iyi bir denemedir?',
        options: ['Üç eşkenar üçgen', 'Aynı üçgenin küçük, orta ve büyük boyu', 'Dar, dik ve geniş açılı birer üçgen'], answer: 2,
        why: ['Üçü de aynı türden; başka türler denenmemiş olur.', 'Boy değişir, açılar aynı kalır: tek üçgen denemiş olursun.', 'Farklı türler, tek biçime bağlı kalmanı önler.'],
        scene: 1,
      },
      {
        q: 'Deniz 10 dörtgende iç açıları ölçtü, hepsinde toplam 360° buldu ve “Her dörtgende 360°dir.” dedi. Deniz’in elinde ne var?',
        options: ['Bütün dörtgenler için bir ispat', '10 dörtgen için bir doğrulama', 'Yanlış bir ölçüm'], answer: 1,
        why: ['Ölçülmemiş dörtgenler var; ölçüm onları kapsamaz.', 'Ölçüm yalnızca ölçülen 10 dörtgeni anlatır.', 'Ölçüm doğru olabilir; eksik olan ispattır.'],
        scene: 0,
      },
      {
        q: 'Hangisi bir genellemedir?',
        options: ['Bu üçgenin açıları 50°, 60° ve 70°dir.', 'Ölçtüğüm altı üçgende toplam 180° çıktı.', 'Her üçgende iç açılar toplamı 180°dir.'], answer: 2,
        why: ['Tek bir üçgeni anlatıyor: bu bir örnek.', 'Ölçülen altı üçgeni anlatıyor: bu bir doğrulama.', '“Her üçgen” diyerek hepsinden söz ediyor.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Ölçmek örnek verir, ispat hepsini kapsar.</b>',
      '<b>Genelleme</b> bütün üçgenlerden söz eder; <b>doğrulama</b> yalnızca denediğin üçgenler içindir.',
      '“Her üçgende 180°” bir genellemedir; <b>ispat</b> ister.',
    ],
    nextLesson: { href: 'a2-ispat-neye-dayanir.html', label: 'Sonraki: İspat doğru bilgilerin üstüne kurulur ›' },
  });
})();
