/* I3 — Konu tekrarı: Buhar basıncı
   Yeni bilgi yok. Tek sahnede konunun kuralları dört panoda toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/I-buhar-basinci.md (I3). Seslendirme yok.
   Panoda çizim ve kısa etiket vardır; kuralın uzun hâli altyazıda ve defterdedir. Oklar ve molekül sayıları şematiktir. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { GRI, OLCU, dizi, dolas, kapliU, akis } = window.KIT_I;

  /* ---- 1. Konunun kuralları: dört pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const P1 = [30, 20], P2 = [520, 20], P3 = [30, 290], P4 = [520, 290], W = 450, H = 245;
    const cerceve = c.S('g', {}, svg);
    [P1, P2, P3, P4].forEach((p) => kutu(c, cerceve, p[0], p[1], W, H));
    const baslik = (p, ad) => yazi(c, svg, p[0] + W / 2, p[1] + 38, ad, { size: 26, kalin: 700, renk: RENK.soluk });
    const bas = [baslik(P1, 'Denge'), baslik(P2, 'Etkenler'), baslik(P3, 'Değişkenler'), baslik(P4, 'Çekim')];
    gizle(cerceve, bas);

    // Pano 1: kapalı kap, oklar, cıva farkı; sonra Vb = Vy.
    const U = kapliU(c, svg, { k: 0.55, x: 150, y: 245, kapak: 1, mmHg: 0, yog: 0, carpma: true });
    d.ekle(U);
    const A = akis(c, U);
    const esit = dizi(c, svg, P1[0] + 360, P1[1] + 120, ['Vb', '=', 'Vy'], { size: 30, kalin: 700 });
    gizle(U.kok, esit);

    // Pano 2: değiştirir / değiştirmez.
    const g2a = c.S('g', {}, svg), g2b = c.S('g', {}, svg);
    yazi(c, g2a, P2[0] + 115, P2[1] + 98, 'değiştirir', { size: 24, kalin: 700, renk: RENK.vurgu });
    ['sıvının cinsi', 'sıcaklık'].forEach((s, i) => yazi(c, g2a, P2[0] + 115, P2[1] + 136 + i * 36, s, { size: 22, kalin: 600 }));
    yazi(c, g2b, P2[0] + 335, P2[1] + 98, 'değiştirmez', { size: 24, kalin: 700, renk: RENK.soluk });
    ['sıvı miktarı', 'kabın biçimi', 'kabın hacmi'].forEach((s, i) => yazi(c, g2b, P2[0] + 335, P2[1] + 136 + i * 36, s, { size: 22, kalin: 600, renk: RENK.soluk }));
    kutu(c, g2a, P2[0] + 20, P2[1] + 72, 190, 160, { rx: 12, w: 3.5, renk: RENK.vurgu, dolgu: 'none' });
    kutu(c, g2b, P2[0] + 240, P2[1] + 72, 190, 160, { rx: 12, w: 1.5, dolgu: 'none' });
    gizle(g2a, g2b);

    // Pano 3: üç sütunlu değişken çerçevesi.
    const g3 = c.S('g', {}, svg);
    [['Bağımlı', 'ölçülür'], ['Bağımsız', 'değişir'], ['Kontrol', 'sabit']].forEach(([a, b], i) => {
      const x = P3[0] + 18 + i * 142;
      kutu(c, g3, x, P3[1] + 70, 130, 150, { rx: 12 });
      yazi(c, g3, x + 65, P3[1] + 106, a, { size: 22, kalin: 700, renk: RENK.soluk });
      cizgi(c, g3, [x + 14, P3[1] + 120], [x + 116, P3[1] + 120], GRI.cam, 2);
      yazi(c, g3, x + 65, P3[1] + 170, b, { size: 22, kalin: 600, renk: i === 1 ? RENK.vurgu : RENK.yazi });
    });
    gizle(g3);

    // Pano 4: iki sıvı kesiti; kalın ve ince çekim çizgileri.
    const g4 = c.S('g', {}, svg);
    [[P4[0] + 120, 6, 1, 'su'], [P4[0] + 330, 1.8, 3, 'benzen']].forEach(([cx, kalin, n, ad]) => {
      const pts = [];
      for (let r = 0; r < 2; r++) for (let q = 0; q < 3; q++) pts.push([cx + (q - 1) * 38 + (r ? 19 : 0) - 9, P4[1] + 158 + r * 38]);
      pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 46) cizgi(c, g4, a, b, RENK.cekme, kalin); }));
      pts.forEach((a) => c.S('circle', { cx: a[0], cy: a[1], r: 11, fill: GRI.molekul }, g4));
      cizgi(c, g4, [cx - 70, P4[1] + 128], [cx + 70, P4[1] + 128], GRI.molekul, 2.5, { 'stroke-opacity': 0.7 });
      for (let i = 0; i < n; i++) {
        const x = cx + (i - (n - 1) / 2) * 38;
        c.S('circle', { cx: x, cy: P4[1] + 96, r: 8, fill: GRI.molekul }, g4);
        ok(c, g4, [x, P4[1] + 120], [x, P4[1] + 102], GRI.koyu, 3);
      }
      yazi(c, g4, cx, P4[1] + 232, ad, { size: 22, kalin: 700 });
    });
    gizle(g4);

    // Anlatım: kurallar sırayla, her biri panosuyla ve defter satırıyla.
    await par(c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.'), belir(c, [cerceve, ...bas], 500));

    await par(c.say('Kapalı kapta buharlaşma ve yoğuşma birlikte sürer.'), belir(c, U.kok, 450).then(() => U.git({ yog: 3.5 }, 600)).then(() => A.ayarla(2, 2, 600)));
    c.note('Kapalı kapta <b>buharlaşma ve yoğuşma</b> birlikte sürer.', 'Kapalı kap', 'tekrar-kapali-kap');
    await par(c.say('Buhar basıncı, buharın çeperlere çarpmasıyla oluşan basınçtır.'), U.git({ mmHg: 23.8 }, 1800));
    c.note('<b>Buhar basıncı:</b> buharın çeperlere çarpmasıyla oluşan basınç.', 'Buhar basıncı', 'tekrar-buhar-basinci');
    await par(c.say('Denge kurulunca iki olay aynı hızla sürer, basınç değişmez.', { speak: '[thoughtful] Denge kurulunca iki olay aynı hızla sürer, basınç değişmez.' }), belir(c, esit, 500, 1), c.wait(2400));
    c.note('<b>Denge:</b> Vb = Vy; basınç değişmez.', 'Denge', 'tekrar-denge');

    await par(c.say('Sıvının cinsi ve sıcaklık denge buhar basıncını etkiler.'), belir(c, g2a, 600, 1));
    await par(c.say('Miktar, kabın biçimi ve kabın hacmi etkilemez.'), belir(c, g2b, 600, 1));
    c.note('<b>Cins ve sıcaklık etkiler;</b> miktar, kap biçimi, kap hacmi etkilemez.', 'Etkenler', 'tekrar-etkenler');

    await par(c.say('Etkiyi bulmak için tek değişken değişir, ötekiler sabit kalır.'), belir(c, g3, 600, 1));
    c.note('<b>Tek değişkeni değiştir, ötekileri sabit tut.</b>', 'Değişkenler', 'tekrar-degiskenler');

    await par(c.say('Çekim zayıfladıkça ve sıcaklık arttıkça buhar basıncı artar.'), belir(c, g4, 600, 1));
    c.note('<b>Çekim zayıfladıkça ve sıcaklık arttıkça buhar basıncı artar.</b>', 'Çekim ve sıcaklık', 'tekrar-cekim');
  }

  Ders.start({
    id: 'cesitlilik-i3', kicker: 'Konu I · Buhar basıncı', title: 'Konu tekrarı: Buhar basıncı', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Buhar basıncı',
      hook: 'İki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun kurallarını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Kapalı kapta buharlaşma hızı yoğuşma hızından büyük. Cıva seviyeleri farkı nasıl değişir?',
        options: ['Azalır', 'Artar', 'Aynı kalır'], answer: 1,
        why: ['Buhar hâlâ birikiyor; basınç azalmaz.', 'Buharlaşma hızlı olduğu için buhar birikir, basınç ve fark artar.', 'Fark ancak iki hız eşitlenince sabitlenir.'], scene: 0 },
      { q: 'Dengeye ulaşmış kapalı kapta hangisi doğrudur?',
        options: ['Buharlaşma durur', 'Yoğuşma durur', 'Buharlaşma ve yoğuşma aynı hızla sürer'], answer: 2,
        why: ['Sıvıdan molekül çıkışı durmaz.', 'Buhardan sıvıya dönüş de sürer.', 'Çıkan ve dönen molekül sayısı eşit olduğu için basınç değişmez.'], scene: 0 },
      { q: 'Aynı suyla dolu iki kapalı kap 25 °C’ta dengede; biri geniş ve sığ, öbürü dar ve yüksek. Denge buhar basınçları için hangisi doğrudur?',
        options: ['Eşittir', 'Geniş olanda büyüktür', 'Dar olanda büyüktür'], answer: 0,
        why: ['Kabın biçimi denge buhar basıncını değiştirmez; ikisi eşittir.', 'Geniş yüzey basıncı büyütmez; kabın biçimi etkilemez.', 'Dar kap basıncı büyütmez; kabın biçimi etkilemez.'], scene: 0 },
      { q: '25 °C’ta dengedeki benzenin sıcaklığı 40 °C’a çıkarılıp yeniden dengeye getiriliyor. Denge buhar basıncı nasıl değişir?',
        options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
        why: ['Sıcaklık artınca basınç azalmaz.', 'Sıcaklık denge buhar basıncını etkiler.', 'Sıcaklık artınca buhar fazına geçen molekül artar; basınç yükselir.'], scene: 0 },
      { q: 'Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden küçük. Hangisi doğrudur?',
        options: ['K’nin molekülleri arasındaki çekim daha zayıftır', 'K’nin molekülleri arasındaki çekim daha kuvvetlidir', 'İkisinde çekim eşittir'], answer: 1,
        why: ['Çekim zayıf olsaydı basınç büyük olurdu.', 'Çekim kuvvetliyse buhar fazına az molekül geçer; basınç küçük olur.', 'Basınçlar farklıysa çekimler de farklıdır.'], scene: 0 },
      { q: 'Sıvı miktarının etkisi araştırılıyor. Hangisi kontrol değişkenidir?',
        options: ['Sıvı miktarı', 'Buhar basıncı', 'Sıcaklık'], answer: 2,
        why: ['Sıvı miktarını değiştiririz; bağımsız değişken odur.', 'Buhar basıncını ölçeriz; bağımlı değişken odur.', 'Sıcaklık sabit tutulur; kontrol değişkenidir.'], scene: 0 },
      { q: 'Bir öğrenci kaba daha çok sıvı koyarak 25 °C’taki denge buhar basıncını artırmaya çalışıyor. Ne olur?',
        options: ['Basınç artar', 'Basınç değişmez; sıvı miktarı etkilemez', 'Basınç azalır'], answer: 1,
        why: ['Sıvı miktarı basıncı artırmaz.', 'Sıvı miktarı denge buhar basıncını etkilemez.', 'Sıvı miktarı basıncı azaltmaz.'], scene: 0 },
      { q: 'Hangisi araştırılabilir bir sorudur?',
        options: ['Hangi sıvı daha güzel kokar?', 'Sıvının cinsi değişirse cıva seviyeleri farkı değişir mi?', 'Buhar basıncı neden bu kadar önemlidir?'], answer: 1,
        why: ['Koku cıva farkıyla ölçülmez.', 'Sıvıyı değiştirir, cıva farkını ölçeriz.', '“Önem” değiştirip ölçebileceğimiz bir şey değildir.'], scene: 0 },
    ],
    summary: [
      'Kapalı kapta buharlaşma ve yoğuşma birlikte sürer; denge kurulunca hızlar eşittir.',
      'Sıvının cinsi ve sıcaklık denge buhar basıncını değiştirir; miktar, kabın biçimi ve hacmi değiştirmez.',
      'Etkiyi bulmak için tek değişken değişir, ötekiler sabit kalır.',
      '<b>Dengede iki olay sürer; basıncı sıvının cinsi ve sıcaklık belirler.</b>',
    ],
    nextLesson: { href: 'j1-kaynama-dis-basinc.html', label: 'Sonraki konu: Kaynama sıcaklığı ›' },
  });
})();
