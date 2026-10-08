/* D4 — Konu tekrarı: Lewis nokta yapısı
   Yeni bilgi yok. Tek sahnede konunun kuralları beş panoda toplanır; ardından dokuz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/D-lewis-nokta-yapisi.md (D4). Seslendirme yok.
   Panolarda çizim ve en kısa etiket durur; kuralın söylenişi altyazıda ve defterdedir. Araçlar: d-araclar.js (KIT_D). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par } = window.KIT;
  const D = window.KIT_D;

  const say = (c, html, speak) => c.say(html, speak ? { speak } : undefined);

  /* ---- 1. Konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P1 = [30, 20, 300, 250], P2 = [350, 20, 300, 250], P3 = [670, 20, 300, 250], P4 = [30, 290, 450, 250], P5 = [500, 290, 470, 250];
    const cerceve = c.S('g', {}, svg);
    [P1, P2, P3, P4, P5].forEach((p) => kutu(c, cerceve, p[0], p[1], p[2], p[3]));
    gizle(cerceve);

    // Kural 1: azot atomu, beş nokta.
    const g1 = c.S('g', {}, svg), N = D.lewis(c, g1, [180, 145], 'N', { size: 60 });
    [0, 1, 2, 3, 0].forEach((y) => N.hemen(y));
    gizle(g1);

    // Kural 2: HF, ortaklanmış ve ortaklanmamış çift.
    const g2 = c.S('g', {}, svg), hf = D.molekul(c, g2, D.sablon('HF', 500, 125, 110, { size: 40 }));
    yazi(c, g2, 497, 226, 'ortaklanmış', { size: 18, kalin: 600, renk: RENK.eksi }); yazi(c, g2, 572, 256, 'ortaklanmamış', { size: 18, kalin: 600, renk: RENK.eksi });
    cizgi(c, g2, [497, 208], [497, 150], RENK.eksi, 2); cizgi(c, g2, [585, 238], [585, 140], RENK.eksi, 2);
    gizle(g2);

    // Kural 3: oktete eksik elektron (O: 8 − 6 = 2).
    const g3 = c.S('g', {}, svg);
    yazi(c, g3, 820, 100, 'O', { size: 40 });
    for (let k = 0; k < 8; k++) {
      const dolu = k < 6;
      c.S('rect', { x: 692 + k * 32, y: 130, width: 28, height: 30, rx: 6, fill: dolu ? RENK.eksi : 'none', stroke: RENK.eksi, 'stroke-width': 2.5, 'stroke-dasharray': dolu ? '' : '4 4' }, g3);
    }
    yazi(c, g3, 820, 225, '8−6=2', { size: 40, renk: RENK.vurgu });
    gizle(g3);

    // Kural 4: H₂O'yu kurma sırası.
    const g4 = c.S('g', {}, svg), su = D.molekul(c, g4, D.sablon('H2O', 150, 415, 80, { size: 36 }));
    [0, 1, 2, 3].forEach((i) => {
      const x = 310 + i * 44;
      c.S('circle', { cx: x, cy: 415, r: 18, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 2.5 }, g4);
      yazi(c, g4, x, 423, String(i + 1), { size: 22, renk: RENK.vurgu });
    });
    gizle(g4);

    // Kural 5: NH₃ ve CH₄ modelleri.
    const g5 = c.S('g', {}, svg), m1 = D.model(c, g5, 'NH3', 640, 415, 1.1), m2 = D.model(c, g5, 'CH4', 860, 415, 1.1);
    gizle(g5);

    await par(say(c, 'Bu konuda öğrendiklerimizi beş kuralda toplayalım.'), belir(c, cerceve, 500));
    await par(say(c, 'Noktalar, sembolün çevresinde valans elektronlarını gösterir.'), belir(c, g1, 500));
    c.note('<b>Noktalar valans elektronlarını gösterir.</b> Örnek: N, 5 nokta.', 'Noktalar', 'tekrar-noktalar');
    await par(say(c, 'İki atomun arasındaki çift ortaklanmış, atomun çevresindeki ortaklanmamıştır.'), belir(c, g2, 500));
    c.note('<b>Ortaklanmış çift atomlar arasında, ortaklanmamış çift çevresinde.</b> Örnek: HF.', 'Çiftler', 'tekrar-ciftler');
    await par(say(c, 'Atomlar çevrelerini 2\'ye (dublet) ya da 8\'e (oktet) tamamlar.', 'Atomlar çevrelerini ikiye (dublet) ya da sekize (oktet) tamamlar.'), belir(c, g3, 500));
    c.note('<b>Dublet 2, oktet 8 nokta.</b> Örnek: H 2, O 8.', 'Dublet ve oktet', 'tekrar-dublet-oktet');
    await par(say(c, 'Ortaklanmış çift sayısı, tamamlamak için eksik elektron sayısıdır.'), belir(c, g4, 500));
    c.note('<b>Ortaklanmış çift = eksik elektron.</b> Örnek: O, 8−6=2.', 'Eksik sayısı', 'tekrar-eksik');
    await par(say(c, 'Merkez atomda ortaklanmamış çift varsa atomlar bir yana itilir.'), belir(c, g5, 500));
    c.note('<b>Merkezde ortaklanmamış çift varsa atomlar bir yana itilir.</b> Örnek: NH<sub>3</sub>.', 'Elektron itmesi', 'tekrar-itme');
    await c.wait(1200);
  }

  Ders.start({
    id: 'cesitlilik-d4', kicker: 'Konu D · Lewis nokta yapısı', title: 'Konu tekrarı: Lewis nokta yapısı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Lewis nokta yapısı',
      hook: 'Üç dersin kuralları aklında mı? Önce kuralları topla, sonra <b>dokuz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun kurallarını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Oksijenin 6 valans elektronu var. Lewis nokta yapısı hangisidir?',
        options: [D.miniSvg('O', [1, 1, 1, 1]) + ' Dört yanda birer nokta', D.miniSvg('O', [2, 1, 2, 1]) + ' İki yanda çift, iki yanda tek nokta', D.miniSvg('O', [2, 2, 2, 0]) + ' Üç yanda çift, bir yan boş'], answer: 1,
        why: ['Bu yapıda yalnızca 4 nokta var; 6 valans elektronu için iki nokta daha gerekir.', 'Önce dört yana birer nokta konur, kalan iki nokta iki noktanın yanına eşlenir: toplam 6.', 'Çift, dört yan da dolmadan oluşmaz; bir yan boş kalamaz.'], scene: 0 },
      { q: 'NCl<sub>3</sub>\'te azotun kaç ortaklanmamış elektronu vardır? (valans 5, 3\'ü ortaklanmış)',
        options: ['3', '5', '2'], answer: 2,
        why: ['3 azotun ortaklanmış elektron sayısıdır.', '5 bütün valans elektronlarıdır; ortaklananlar çıkarılmalı.', '5 − 3 = 2 ortaklanmamış elektron, bir çift.'], scene: 0 },
      { q: 'CF<sub>4</sub>\'te karbon ile bir flor arasında kaç ortaklanmış çift vardır?',
        options: ['2', '4', '1'], answer: 2,
        why: ['Florun oktete eksiği yalnızca 1; 2 çift gerekmez.', 'Karbon toplam 4 çift yapar; her flor ile 1 tane.', 'Florun eksiği 1; her flor karbonla 1 ortaklanmış çift yapar.'], scene: 0 },
      { q: 'CCl<sub>4</sub>\'te karbon atomunun çevresinde toplam kaç nokta vardır?',
        options: ['8', '4', '16'], answer: 0,
        why: ['Dört ortaklanmış çift 8 nokta eder; karbon oktete ulaşır.', '4 yalnızca valans elektron sayısıdır; ortaklanmış çiftler 8 nokta yapar.', '16, dört klorun noktaları da sayıldığında çıkar; yalnızca karbonun çevresi sorulur.'], scene: 0 },
      { q: 'Hidrojen için hangisi doğrudur?',
        options: ['Ortaklanmamış çifti vardır', 'Çevresini 2 noktaya tamamlar', 'Çevresini 8 noktaya tamamlar'], answer: 1,
        why: ['Hidrojenin 1 elektronu ortaklanır; ortaklanmamış çifti kalmaz.', 'Hidrojen dublet kuralına uyar ve helyum gibi 2 noktaya tamamlar.', '8 oktettir; hidrojen oktete değil dublete uyar.'], scene: 0 },
      { q: 'N<sub>2</sub>\'de iki azot arasında kaç ortaklanmış çift vardır?',
        options: ['3', '1', '5'], answer: 0,
        why: ['Azotun oktete eksiği 3; iki azot arasında 3 çift olur.', '1 çift azotu oktete tamamlamaz.', '5 azotun valans elektron sayısıdır, çift sayısı değil.'], scene: 0 },
      { q: 'CF<sub>4</sub>\'ün merkez atomu karbondur ve ortaklanmamış çifti yoktur. Modelde flor atomları nasıl durur?',
        options: ['Bir yanda toplanır', 'Bükülmüş olur', 'Karbonun çevresine eşit dağılır'], answer: 2,
        why: ['Bir yanda toplanma, merkezde ortaklanmamış çift olan moleküllerde olur.', 'Bükülme, merkezdeki ortaklanmamış çiftlerin itmesiyle olur.', 'Merkezde çift yoksa itme de yoktur; atomlar eşit dağılır.'], scene: 0 },
      { q: 'H<sub>2</sub>O ve CO<sub>2</sub>\'nin Lewis yapıları düz yazılır, ama su bükülmüştür. Neden?',
        options: ['Hidrojen küçük olduğu için', 'Oksijendeki ortaklanmamış çiftler hidrojenleri bir yana iter', 'Karbon dioksitte atom sayısı fazla olduğu için'], answer: 1,
        why: ['CH<sub>4</sub> de hidrojen içerir ama bükülmez.', 'Merkezdeki ortaklanmamış çiftler bağ elektronlarını iter, atomlar bir yana kayar.', 'İkisinde de üç atom var.'], scene: 0 },
      { q: 'NCl<sub>3</sub>, CCl<sub>4</sub> ve CO<sub>2</sub>\'den hangisinin merkez atomunda ortaklanmamış çift vardır?',
        options: ['CCl<sub>4</sub>', 'CO<sub>2</sub>', 'NCl<sub>3</sub>'], answer: 2,
        why: ['CCl<sub>4</sub>\'te karbonun elektronlarının hepsi ortaklanmıştır.', 'CO<sub>2</sub>\'de karbonun elektronlarının hepsi ortaklanmıştır; çiftler oksijenlerdedir.', 'Azotun 5 elektronundan 3\'ü ortaklanır; kalan 2 elektron bir ortaklanmamış çifttir.'], scene: 0 },
    ],
    summary: [
      'Noktalar, sembolün çevresinde <b>valans elektronlarını</b> gösterir.',
      'İki atomun arasındaki çift <b>ortaklanmış</b>, atomun çevresindeki <b>ortaklanmamıştır</b>.',
      'Atomlar çevrelerini hidrojende 2\'ye, öbürlerinde 8\'e tamamlar; ortaklanmış çift sayısı eksik elektron kadardır.',
      '<b>Noktaları say, çiftleri ayır; ortaklanmamış çift şekli değiştirir.</b>',
    ],
    nextLesson: { href: 'e1-elektronegatiflik-farki.html', label: 'Sonraki konu: Molekül polarlığı ›' },
  });
})();
