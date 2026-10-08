/* B5 — c ile yukarı aşağı: ±|h(x)| ± c
   c grafiği yukarı ya da aşağı taşır; en büyük ya da en küçük değeri ve sıfırların sayısını değiştirir.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md
   Renkler: grafik turkuaz, c ve uç değer turuncu, sıfırlar sarı. */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, ciz, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, serit, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const DZ = { x0: 70, y0: 50, w: 460, h: 460, xmin: -3, xmax: 7, ymin: -4, ymax: 6, xsayi: 2, ysayi: 3 };
  const satir = (svg, y, metin) => yazi(svg, 600, y, metin, { size: 30, hiza: 'start' });
  const cYaz = (cc) => (cc > 0 ? ' + ' + sayi(cc) : cc < 0 ? ' − ' + sayi(-cc) : '');

  /* ---- 1. Yukarı taşı ---- */
  async function yukari(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ);
    const golge = kirik(dz, mutlakNoktalar(dz, 1, -2), { renk: RENK.soluk, kalin: 3, kesik: true });
    const yatay = dogru(dz, 0, 1, { renk: RENK.g, kalin: 2.5, kesik: '6 6' });
    const v = kirik(dz, mutlakNoktalar(dz, 1, -2));
    const uc = nokta(dz, 2, 1, { renk: RENK.g, r: 9 });
    const kuralT = yazi(svg, 765, 130, ['m(x) = |x − 2|', [' + 1', RENK.g]], { size: 38, kalin: 700, renk: RENK.mutlak });
    const ucT = satir(svg, 260, ['en küçük değer:  ', ['1', RENK.g]]), sayT = satir(svg, 330, ['sıfır sayısı:  ', ['0', RENK.sifir]]);
    gizle(golge.el, yatay.el, v.el, uc.el, kuralT, ucT, sayT);

    await par(soyle(c, 'Paketleme makinesinin sapması bu fonksiyonla veriliyor.'), belir(c, kuralT, 500));
    await par(soyle(c, 'Önce tanıdık kısmı çiz: |x − 2|, ucu 2’de.', { speak: 'Önce tanıdık kısmı çiz: x eksi ikinin mutlak değeri, ucu ikide.' }), ciz(c, v, 900));
    golge.el.style.opacity = 0.6;
    await par(soyle(c, 'Sonra her çıktıya 1 ekle: V bir birim yukarı kayar.'), c.tween(1500, (e) => v.ayarla(mutlakNoktalar(dz, 1, -2, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: 'm(x) sıfır olur mu?',
      options: ['Evet, x = 2’de', 'Evet, iki ayrı x’te', 'Hayır, hiç olmaz'], answer: 2,
      hints: ['m(2) = |2 − 2| + 1 = 1 eder; sıfır değil.', 'Grafik x eksenine hiç inmiyor.', ''],
      right: '|x − 2| en az 0’dır; 1 eklenince en az 1 olur.',
    });
    await par(soyle(c, 'En alttaki nokta (2, 1): en küçük değer 1.', { speak: 'En alttaki nokta, iki bir noktası: en küçük değer bir.', dur: true }), pop(c, uc, dz.X(2), dz.Y(1), 450), belir(c, [yatay.el, ucT], 500));
    await par(soyle(c, 'Grafik x eksenine değmiyor: bu fonksiyonun sıfırı yok.', { ton: 'thoughtful' }), belir(c, sayT, 500));
    await soyle(c, 'Makinenin sapması da hiç 0 olmaz; en azı 1’dir.');
    c.note('<b>|h(x)| + c ≥ c</b><br>|x − 2| + 1 ≥ 1', 'c ile yukarı', 'b5-yukari');
  }

  /* isaret · |x − 2| + c: grafik, uç noktası, sıfırlar ve sağ sütundaki üç satır */
  function kur(svg, isaret) {
    const dz = duzlem(svg, DZ);
    const kilavuz = S('line', { x1: dz.X(2), x2: dz.X(2), y1: dz.y0, y2: dz.y0 + dz.h, stroke: RENK.soluk, 'stroke-width': 2.5, 'stroke-dasharray': '5 6', opacity: 0 }, dz.orta);
    const yatay = dogru(dz, 0, 0, { renk: RENK.g, kalin: 2.5, kesik: '6 6' });
    const v = kirik(dz, mutlakNoktalar(dz, 1, -2, 0, isaret));
    const uc = nokta(dz, 2, 0, { renk: RENK.g, r: 9 }), z1 = nokta(dz, 2, 0, { r: 9 }), z2 = nokta(dz, 2, 0, { r: 9 });
    const kuralT = yazi(svg, 765, 130, '', { size: 38, kalin: 700, renk: RENK.mutlak });
    const ucT = satir(svg, 260, ''), sayT = satir(svg, 330, '');
    const sifirSayisi = (cc) => (isaret * cc < 0 ? 2 : cc === 0 ? 1 : 0);
    const cizim = (cc) => {
      const n = sifirSayisi(cc), d = Math.abs(cc);
      v.ayarla(mutlakNoktalar(dz, 1, -2, cc, isaret)); uc.git(2, cc); yatay.ayarla(0, cc);
      z1.el.style.display = n ? '' : 'none'; z2.el.style.display = n === 2 ? '' : 'none';
      z1.git(2 - d, 0); z2.git(2 + d, 0);
    };
    const metin = (cc) => {
      yaz(kuralT, ['m(x) = ' + (isaret < 0 ? '−' : '') + '|x − 2|', [cYaz(cc), RENK.g]]);
      yaz(ucT, [isaret > 0 ? 'en küçük değer:  ' : 'en büyük değer:  ', [sayi(cc), RENK.g]]);
      yaz(sayT, ['sıfır sayısı:  ', [String(sifirSayisi(cc)), RENK.sifir]]);
    };
    const koy = (cc) => { cizim(cc); metin(cc); };
    /* c'yi a'dan b'ye yürütür; yazılar yarım adımlarla güncellenir */
    const yurut = (c, a, b, ms) => c.tween(ms, (e) => { const cc = lerp(a, b, e); cizim(cc); metin(Math.round(cc * 2) / 2); }, ease.inOut).then(() => koy(b));
    return { dz, koy, yurut, kilavuz };
  }

  /* ---- 2. c değiştikçe ---- */
  async function cDegistikce(c) {
    const svg = c.svg(1000, 562);
    const k = kur(svg, 1);
    k.koy(1);
    await soyle(c, 'Sondaki sayıya c diyelim ve onu değiştirelim.');
    await c.choice({
      tag: 'Tahmin et', q: 'c = −3 olursa grafik x eksenini kaç noktada keser?',
      options: ['Hiç kesmez', 'Bir noktada', 'İki noktada'], answer: 2,
      hints: ['Uç eksenin altına iner; kollar yukarı çıkarken ekseni keser.', 'Uç artık eksende değil; iki kol ekseni ayrı ayrı keser.', ''],
      right: 'Uç (2, −3)’e iner; iki kol ekseni −1’de ve 5’te keser.',
    });
    await par(soyle(c, 'V aşağı kaydı; iki kol ekseni iki ayrı yerde kesti.'), k.yurut(c, 1, -3, 2200));
    await par(soyle(c, 'Uç sağa sola gitmedi: hep x = 2 hizasında.'), belir(c, k.kilavuz, 500, 0.8));
    await soyle(c, 'c’yi değiştir; sıfır sayısını izle.', { noWait: true });
    c.slider({ label: 'c', min: -3, max: 3, step: 0.5, value: -3, fmt: (x) => sayi(x), onInput: k.koy });
    await c.cont('Devam ›');
    await soyle(c, 'c pozitifse sıfır yok, sıfırsa bir, negatifse iki sıfır var.', { speak: 'c pozitifse sıfır yok, c sıfırsa tek sıfır var, c negatifse iki sıfır var.' });
    c.note('c pozitif: sıfır yok<br>c sıfır: bir sıfır<br>c negatif: iki sıfır', '|h(x)| + c’nin sıfırları', 'b5-sifir-sayisi');
  }

  /* ---- 3. Ters V'de ---- */
  async function tersV(c) {
    const svg = c.svg(1000, 562);
    const k = kur(svg, -1);
    k.koy(0);
    await soyle(c, 'Şimdi mutlak değerin önünde eksi var: V ters.');
    await c.choice({
      tag: 'Tahmin et', q: 'c = 2 olursa kaç sıfır olur?',
      options: ['Hiç', 'Bir', 'İki'], answer: 2,
      hints: ['Tepe eksenin üstüne çıkar; kollar aşağı inerken ekseni keser.', 'Tepe artık eksende değil; iki kol ekseni ayrı ayrı keser.', ''],
      right: 'Tepe (2, 2)’ye çıkar; kollar ekseni 0’da ve 4’te keser.',
    });
    await par(soyle(c, 'Tepe yukarı çıktı: en büyük değer artık 2.'), k.yurut(c, 0, 2, 1800));
    await soyle(c, 'c’yi değiştir; hangi c’lerde sıfır kalmıyor?', { noWait: true });
    c.slider({ label: 'c', min: -3, max: 3, step: 0.5, value: 2, fmt: (x) => sayi(x), onInput: k.koy });
    await c.cont('Devam ›');
    await soyle(c, 'Ters V’de durum tersine döner: c negatifse sıfır yok.', { ton: 'thoughtful' });
    c.note('c pozitif: iki sıfır<br>c sıfır: bir sıfır<br>c negatif: sıfır yok', '−|h(x)| + c’nin sıfırları', 'b5-ters');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 70, y0: 50, w: 460, h: 460, xmin: -6, xmax: 4, ymin: -4, ymax: 6, xsayi: 2, ysayi: 3, xad: '', yad: '' });
    const yS = serit(dz, 'y', -3, 6, { renk: RENK.g });
    const yatay = dogru(dz, 0, -3, { renk: RENK.g, kalin: 2.5, kesik: '6 6' });
    const v = kirik(dz, mutlakNoktalar(dz, 1, 1, -3));
    const uc = nokta(dz, -1, -3, { renk: RENK.g, r: 9 }), z1 = nokta(dz, -4, 0, { r: 9 }), z2 = nokta(dz, 2, 0, { r: 9 });
    const satirlar = [satir(svg, 260, ['en küçük değer:  ', ['−3', RENK.g]]), satir(svg, 325, ['sıfır sayısı:  ', ['2', RENK.sifir]]), satir(svg, 390, ['görüntü kümesi:  ', ['[−3, ∞)', RENK.g]])];
    gizle(yS.el, yatay.el, v.el, uc.el, z1.el, z2.el, satirlar);
    const tb = soruTahtasi(c, svg, { x: 580, y: 60, w: 390, h: 110, size: 34 });
    tb.ifade.style.fill = RENK.mutlak;
    const ac = (...els) => { belir(c, els, 400).catch(() => {}); };
    const KURAL = ['m(x) = |x + 1|', [' − 3', RENK.g]];

    await soyle(c, 'Bu kez grafiği görmeden, kuraldan oku.', { noWait: true });
    await tb.sor(KURAL, {
      q: 'En küçük değeri kaçtır?', options: ['−1', '0', '−3'], answer: 2,
      hints: ['−1, en küçük değerin alındığı x’tir; değerin kendisi değil.', '|x + 1| en az 0’dır; ondan 3 çıkarılıyor.', ''],
      right: '|x + 1| en az 0: m en az 0 − 3 = −3.',
      onPick: (k, ok) => { if (ok) ac(satirlar[0], v.el, uc.el, yatay.el); },
    });
    await tb.sor(KURAL, {
      q: 'Kaç sıfırı vardır?', options: ['2', '1', 'Yok'], answer: 0,
      hints: ['', 'Uç eksenin altında; iki kol ekseni ayrı ayrı keser.', 'c negatif: uç eksenin altında, kollar ekseni keser.'],
      right: 'c = −3 negatif: iki sıfır, x = −4 ve x = 2.',
      onPick: (k, ok) => { if (ok) ac(satirlar[1], z1.el, z2.el); },
    });
    await tb.sor(KURAL, {
      q: 'Görüntü kümesi hangisidir?', options: ['[0, ∞)', '[−3, ∞)', '(−∞, −3]'], answer: 1,
      hints: ['c = −3 grafiği aşağı taşıdı; negatif değerler de alıyor.', '', 'Kollar yukarı çıkıyor; −3 en küçük değerdir.'],
      right: 'En küçük değer −3, kollar yukarı sınırsız: [−3, ∞).',
      onPick: (k, ok) => { if (ok) ac(satirlar[2], yS.el); },
    });
    await soyle(c, 'Kuraldaki c, en küçük değeri ve sıfır sayısını söyledi.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b5', kicker: 'Konu B · Mutlak değer fonksiyonu', title: 'c ile yukarı aşağı: ±|h(x)| ± c', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'c ile yukarı aşağı: ±|h(x)| ± c', hook: 'Paketleme makinesinin sapması hiçbir zaman 0 olmuyorsa <b>en küçük sapma neye eşittir?</b>', button: 'Derse başla ›' },
    goals: ['c’nin grafiği nasıl taşıdığını görür.', 'Sıfırların sayısını c’ye göre belirler.', 'En büyük ya da en küçük değeri kuraldan okur.'],
    scenes: [
      { title: 'Yukarı taşı', goal: 'c’nin V’yi nasıl taşıdığını gör.', run: yukari },
      { title: 'c değiştikçe', goal: 'c’ye göre sıfır sayısını bul.', run: cDegistikce },
      { title: 'Ters V’de', goal: 'Ters V’de c’nin etkisini gör.', run: tersV },
      { title: 'Sıra sende', goal: 'Özellikleri kuraldan oku.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'm(x) = |x − 4| + 3 fonksiyonunun en küçük değeri kaçtır?', options: ['4', '3', '0'], answer: 1,
        why: ['4, en küçük değerin alındığı x’tir.', '|x − 4| en az 0’dır; 3 eklenince en az 3 olur.', '0, |x − 4|’ün en küçük değeridir; c = 3 grafiği yukarı taşır.'], scene: 0 },
      { q: 'm(x) = −|x| + 2 fonksiyonunun kaç sıfırı vardır?', options: ['2', '1', '0'], answer: 0,
        why: ['Tepe (0, 2)’de; kollar ekseni −2’de ve 2’de keser.', 'Tek sıfır c = 0 iken olur; burada tepe eksenin üstünde.', 'Ters V’de c pozitifse kollar aşağı inerken ekseni keser.'], scene: 2 },
    ],
    summary: [
      '<b>c grafiği taşır; sıfırların sayısı da değişir.</b>',
      '|h(x)| + c’nin en küçük değeri c’dir; −|h(x)| + c’nin en büyük değeri c’dir.',
      'Uç eksenin neresindeyse sıfır sayısı ona göredir: yok, bir ya da iki.',
    ],
    nextLesson: { href: 'b6-mutlak-degerli-fonksiyonun-parcali-gosterimi.html', label: 'Sonraki: Mutlak değerli fonksiyonun parçalı gösterimi ›' },
  });
})();
