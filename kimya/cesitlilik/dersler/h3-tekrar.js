/* H3 — Konu tekrarı: Katılar
   Yeni bilgi yok. Tek sahnede konunun altı kuralı beş panoda toplanır ve deftere düşer; ardından sekiz karışık soru gelir
   (plan/KURALLAR.md 3.4). Senaryo: plan/kimya/cesitlilik/senaryolar/H-katilar.md ("H3"). Seslendirme yok.
   Kuralın uzun hâli altyazıda ve defterdedir; panoda çizim ve kısa etiket vardır. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par } = window.KIT;
  const { katiCizimi, termometre, mini } = window.KIT_H;
  const { ease } = Ders;
  const duz = (c, p, x, y, m, size, o = {}) => yazi(c, p, x, y, m, Object.assign({ size, kalin: 700 }, o));

  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P = [[15, 15, 330, 255], [360, 15, 625, 255], [15, 285, 310, 262], [345, 285, 310, 262], [675, 285, 310, 262]];
    const cerceve = c.S('g', {}, svg);
    P.forEach(([x, y, w, h]) => kutu(c, cerceve, x, y, w, h));
    gizle(cerceve);

    // Pano 1: düzenli ve düzensiz büyüteç daireleri, belirli erime noktası.
    const g1 = c.S('g', {}, svg), g1t = c.S('g', {}, svg);
    katiCizimi(c, g1, 'tuz', 80, 115, 52, { cizgi: true }); katiCizimi(c, g1, 'cam', 255, 115, 52);
    duz(c, g1, 80, 215, 'kristal', 26); duz(c, g1, 255, 215, 'amorf', 26);
    termometre(c, g1t, 150, 130, 0.7); termometre(c, g1t, 325, 130, null);
    gizle(g1, g1t);

    // Pano 2: dört tür, tanecik düzeniyle ve etkileşim adıyla.
    const g2 = c.S('g', {}, svg), T2 = [['tuz', 'iyonik', 'iyonik bağ'], ['buz', 'moleküler', 'moleküller arası'], ['elmas', 'kovalent', 'kovalent bağ'], ['sodyum', 'metalik', 'metalik bağ']];
    T2.forEach(([k, ad, et], i) => {
      const x = 435 + i * 150;
      katiCizimi(c, g2, k, x, 105, 44, { cizgi: true });
      duz(c, g2, x, 195, ad, 22); duz(c, g2, x, 224, et, 18, { kalin: 500, renk: RENK.soluk });
    });
    gizle(g2);

    // Pano 3: erime noktası aralığı, dört tür.
    const g3 = c.S('g', {}, svg), A = [['moleküler', -79, 0], ['metalik', 98, 660], ['iyonik', 681, 2572], ['kovalent', 1785, 3927]];
    const x0 = 140, ol = 0.043, bars = A.map(([ad, a, b], i) => {
      const y = 340 + i * 52;
      duz(c, g3, 125, y + 7, ad, 20, { hiza: 'end', kalin: 600 });
      const r = c.S('rect', { x: x0 + (a + 100) * ol, y: y - 10, width: 0, height: 20, rx: 4, fill: '#a7adbd' }, g3);
      return { r, w: Math.max(4, (b - a) * ol) };
    });
    cizgi(c, g3, [x0, 315], [x0, 515], RENK.ince, 2);
    gizle(g3);

    // Pano 4: iletir / iletmez.
    const g4 = c.S('g', {}, svg);
    duz(c, g4, 370, 360, 'metalik', 24, { hiza: 'start' }); duz(c, g4, 520, 360, 'iletir', 28, { hiza: 'start' });
    duz(c, g4, 370, 440, 'öteki', 22, { hiza: 'start', kalin: 500, renk: RENK.soluk }); duz(c, g4, 520, 440, 'iletmez', 24, { hiza: 'start', kalin: 500, renk: RENK.soluk });
    gizle(g4);

    // Pano 5: grafit, kovalent katıların kuralının dışında.
    const g5 = c.S('g', {}, svg);
    duz(c, g5, 700, 410, 'grafit', 28, { hiza: 'start', renk: RENK.vurgu }); duz(c, g5, 830, 410, 'iletir', 30, { hiza: 'start', renk: RENK.vurgu });
    gizle(g5);

    await par(c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.'), belir(c, cerceve, 500));
    await par(c.say('Kristal katıda tanecikler düzenli, amorf katıda düzensiz dizilir.'), belir(c, g1, 600));
    c.note('<b>Kristal düzenli, amorf düzensiz dizilir.</b> Örnek: tuz, cam.', 'Düzen', 'tekrar-duzen');
    await par(c.say('Kristal katının belirli erime noktası vardır, amorf katınınki yoktur.'), belir(c, g1t, 600));
    c.note('<b>Kristalin belirli erime noktası vardır; amorfınki yoktur.</b>', 'Erime noktası', 'tekrar-belirli');
    await par(c.say('Kristal katılar iyonik, moleküler, kovalent ve metalik olarak dört gruptur.'), belir(c, g2, 700));
    c.note('<b>Kristal katılar:</b> iyonik, moleküler, kovalent, metalik.', 'Dört tür', 'tekrar-tur');
    await par(c.say('Moleküler katının erime noktası düşüktür; iyonik ve kovalentinki yüksektir.'), belir(c, g3, 400).then(() =>
      c.tween(1300, (e) => bars.forEach((b, i) => b.r.setAttribute('width', b.w * Math.max(0, Math.min(1, e * 1.5 - i * 0.15)))), ease.out)));
    c.note('<b>Moleküler düşük, iyonik ve kovalent yüksek sıcaklıkta erir.</b>', 'Erime noktası ve tür', 'tekrar-tur-erime');
    await par(c.say('Metalik katılar elektriği iletir; öteki gruplar genellikle iletmez.'), belir(c, g4, 600));
    c.note('<b>Metalik katılar iletir; öteki gruplar genellikle iletmez.</b>', 'İletkenlik', 'tekrar-iletkenlik');
    await par(c.say('Grafit, kovalent katıların "genellikle yalıtkan" kuralının dışında kalır.'), belir(c, g5, 600));
    c.note('<b>Grafit kovalent katıdır ama elektriği iletir.</b>', 'Grafit', 'tekrar-grafit');
  }

  Ders.start({
    id: 'cesitlilik-h3', kicker: 'Konu H · Katılar', title: 'Konu tekrarı: Katılar', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Katılar',
      hook: 'Kristal ve amorf katıyı, dört kristal türünü ve niteliklerini hatırlıyor musun? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun kurallarını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      { q: 'Bir katının çiziminde tanecikler gelişigüzel dizilmiştir; belirli bir desen yoktur. Bu katı için hangisi doğrudur?<br>' + mini('cam'),
        options: ['Kristal katıdır; belirli erime noktası vardır', 'Amorf katıdır; belirli erime noktası yoktur', 'Kristal katıdır; belirli erime noktası yoktur'], answer: 1,
        why: ['Desen yoksa katı kristal değildir.', 'Düzensiz dizilen katı amorftur ve belirli bir erime noktası yoktur.', 'Desen yoksa katı kristal değildir; belirli erime noktası da kristal katıya özgüdür.'], scene: 0 },
      { q: 'Hangisi amorf katıdır?',
        options: ['Kar tanesi', 'Kurşun kalem ucu', 'Lastik'], answer: 2,
        why: ['Kar tanesi düzenli dizilmiş su moleküllerinden oluşan kristal katıdır.', 'Kurşun kalem ucundaki grafitte atomlar yinelenen düzende dizilir; kristal katıdır.', 'Lastik, cam, plastik, mum ve tereyağı gibi amorf katıdır.'], scene: 0 },
      { q: 'Çinko, Zn katyonları ve elektron denizinden oluşur. Çinko için hangisi beklenir?',
        options: ['Elektriği iletir', 'Elektriği iletmez', 'Çok sert ve yalıtkandır'], answer: 0,
        why: ['Katyonlar ve elektron denizi içeren metalik katılar elektriği iletir.', 'Ölçümlerde metalik katıların üçü de elektriği iletti.', 'Çok sert ve yalıtkan olmak kovalent katıların örüntüsüdür.'], scene: 0 },
      { q: 'Magnezyum oksit Mg<sup>2+</sup> ve O<sup>2−</sup> iyonlarından oluşur. Hangi grup ve hangi etkileşim?',
        options: ['Moleküler katı; hidrojen bağı', 'Metalik katı; metalik bağ', 'İyonik katı; iyonik bağ'], answer: 2,
        why: ['Tanecikleri molekül değil iyonlardır.', 'Elektron denizi yok; katyon ve anyon var.', 'Katyon ve anyon içeren katı iyonik katıdır; iyonları iyonik bağ tutar.'], scene: 0 },
      { q: 'Katı iyot, I<sub>2</sub> moleküllerinden oluşur. Hangi nitelikler beklenir?',
        options: ['Düşük erime noktası, yumuşak, yalıtkan', 'Yüksek erime noktası, çok sert, yalıtkan', 'Elektriği iyi iletir'], answer: 0,
        why: ['Moleküler katılar düşük sıcaklıkta erir, yumuşaktır ve elektriği iletmez.', 'Bu, kovalent katıların örüntüsüdür.', 'Moleküler katılar elektriği iletmez.'], scene: 0 },
      { q: 'Elmas, grafit ve kuvarsın ortak yanı hangisidir?',
        options: ['Üçünün sertliği aynıdır', 'Üçü de kovalent bağlı atomlardan oluşur', 'Üçü de elektriği iletir'], answer: 1,
        why: ['Elmas 10, kuvars 7, grafit 1,5 sertliğindedir.', 'Üçü de kovalent katıdır; tanecikleri kovalent bağlı atomlardır.', 'Yalnızca grafit iletir; elmas ve kuvars iletmez.'], scene: 0 },
      { q: 'Buz 0 °C\'ta, sofra tuzu 801 °C\'ta erir; ikisi de kristal katıdır. Fark nereden gelir?',
        options: ['Taneciklerini tutan etkileşim farklıdır', 'Biri kristal, öteki amorftur', 'Biri katı, öteki değildir'], answer: 0,
        why: ['Buzu moleküller arası etkileşimler, tuzu iyonik bağ tutar; erime noktaları bu yüzden ayrılır.', 'İkisi de kristal katıdır; tanecikleri düzenlidir.', 'İkisi de katıdır.'], scene: 0 },
      { q: 'Sodyum ile alüminyumun ikisi de metalik katıdır. Hangisinin erime noktası daha yüksektir?',
        options: ['Sodyum; iyon yükü daha küçük', 'İkisi aynıdır', 'Alüminyum; iyon yükü ve serbest elektron sayısı daha büyük'], answer: 2,
        why: ['İyon yükü küçük olan metalde bağ daha zayıftır; sodyum 98 °C\'ta erir.', 'Erime noktaları 98 ve 660 °C\'tır; aynı değildir.', 'Yük ve serbest elektron sayısı büyüdükçe metalik bağ kuvvetlenir; alüminyum 660 °C\'ta erir.'], scene: 0 },
    ],
    summary: [
      'Kristalde tanecikler düzenli, amorf katıda düzensiz dizilir; belirli erime noktası kristale özgüdür.',
      'Kristal katılar iyonik, moleküler, kovalent ve metalik olmak üzere dört gruptur.',
      'Moleküler katı düşük, iyonik ve kovalent katı yüksek sıcaklıkta erir; metalik katı iletir.',
      '<b>Dizilişe bakarak kristal ile amorfu, etkileşime bakarak kristal katının türünü ve niteliklerini bulursun.</b>',
    ],
    nextLesson: { href: 'i1-buhar-basinci.html', label: 'Sonraki konu: Buhar basıncı ›' },
  });
})();
