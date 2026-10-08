/* L3 — Konu tekrarı: Adezyon ve kohezyon
   Yeni bilgi yok. Tek sahnede konunun kuralları toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/L-adezyon-ve-kohezyon.md (L3). Seslendirme yok.
   Tahtada beş küçük pano durur: kuralın uzun hâli altyazıda ve defterdedir, panoda çizim ve kısa etiket vardır. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { GRI, damlaYuzey, tup, kapliTup } = window.KIT_L;
  const { ease } = Ders;

  /* ---- 1. Konunun kuralları: beş pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const W3 = 308, H3 = 250, W2 = 470, H2 = 250;
    const P1 = [24, 20], P2 = [346, 20], P3 = [668, 20], P4 = [24, 292], P5 = [506, 292];
    const cerceve = c.S('g', {}, svg);
    [[P1, W3, H3], [P2, W3, H3], [P3, W3, H3], [P4, W2, H2], [P5, W2, H2]].forEach(([p, w, h]) => kutu(c, cerceve, p[0], p[1], w, h));
    gizle(cerceve);
    const baslik = (g, p, w, m) => yazi(c, g, p[0] + w / 2, p[1] + 40, m, { size: 24, kalin: 700 });
    const mol = (g, x, y, r, f = GRI.su) => c.S('circle', { cx: x, cy: y, r, fill: f, stroke: f === GRI.su ? GRI.suK : GRI.yuzK, 'stroke-width': 2 }, g);

    // Kural 1: iki çekim.
    const g1 = c.S('g', {}, svg);
    baslik(g1, P1, W3, 'iki çekim');
    const x1 = P1[0], y1 = P1[1];
    cizgi(c, g1, [x1 + 80, y1 + 112], [x1 + 140, y1 + 112], RENK.cekme, 5);
    cizgi(c, g1, [x1 + 110, y1 + 176], [x1 + 110, y1 + 218], RENK.cekme, 5);
    mol(g1, x1 + 80, y1 + 112, 16); mol(g1, x1 + 140, y1 + 112, 16); mol(g1, x1 + 110, y1 + 176, 16); mol(g1, x1 + 110, y1 + 226, 16, GRI.yuz);
    yazi(c, g1, x1 + 176, y1 + 120, 'kohezyon', { hiza: 'start', size: 22, kalin: 700, renk: RENK.cekme });
    yazi(c, g1, x1 + 176, y1 + 208, 'adezyon', { hiza: 'start', size: 22, kalin: 700, renk: RENK.cekme });
    gizle(g1);

    // Kural 2: yayılır ya da damla kalır.
    const g2 = c.S('g', {}, svg);
    baslik(g2, P2, W3, 'yayılma');
    damlaYuzey(c, g2, { cx: P2[0] + 80, y: P2[1] + 180, w: 136, th: 20, a: 60, h: 14 });
    damlaYuzey(c, g2, { cx: P2[0] + 232, y: P2[1] + 180, w: 136, th: 20, a: 34, h: 62 });
    yazi(c, g2, P2[0] + 80, P2[1] + 232, 'adezyon büyük', { size: 19, kalin: 600 });
    yazi(c, g2, P2[0] + 232, P2[1] + 232, 'kohezyon büyük', { size: 19, kalin: 600 });
    gizle(g2);

    // Kural 3: içbükey, düz, dışbükey.
    const g3 = c.S('g', {}, svg);
    baslik(g3, P3, W3, 'kapta yüzey');
    [['dışbükey', 55, -0.95, 'civa'], ['düz', 154, 0, 'su'], ['içbükey', 253, 0.95, 'su']].forEach(([ad, dx, e, sv]) => {
      tup(c, g3, { x: P3[0] + dx, y: P3[1] + 66, h: 118, w: 46, e, sivi: sv, dolgu: 0.55 });
      yazi(c, g3, P3[0] + dx, P3[1] + 222, ad, { size: 20, kalin: 600 });
    });
    gizle(g3);

    // Kural 4: yüzey molekülü ve içe doğru çekim.
    const g4 = c.S('g', {}, svg);
    baslik(g4, P4, W2, 'yüzey gerilimi');
    const cx4 = P4[0] + W2 / 2, ty = P4[1] + 96;
    [[5, 0], [4, 1], [5, 2]].forEach(([n, s]) => {
      for (let i = 0; i < n; i++) {
        const x = cx4 + (i - (n - 1) / 2) * 62, y = ty + s * 50;
        if (s === 0 && i === 2) continue;
        mol(g4, x, y, 15);
      }
    });
    mol(g4, cx4, ty, 22, '#e6e6e6');
    ok(c, g4, [cx4 - 28, ty], [cx4 - 52, ty], RENK.cekme, 4); ok(c, g4, [cx4 + 28, ty], [cx4 + 52, ty], RENK.cekme, 4);
    ok(c, g4, [cx4, ty + 26], [cx4, ty + 70], RENK.cekme, 8);
    yazi(c, g4, cx4, P4[1] + 232, 'yüzey içe çekilir', { size: 22, kalin: 600 });
    gizle(g4);

    // Kural 5: kılcallık.
    const g5 = c.S('g', {}, svg);
    baslik(g5, P5, W2, 'kılcallık');
    const k5 = kapliTup(c, g5, { x: P5[0] + 130, yK: P5[1] + 152, sivi: 'su', e: 1, k: 0.62 });
    yazi(c, g5, P5[0] + 270, P5[1] + 120, 'adezyon büyük', { hiza: 'start', size: 22, kalin: 700, renk: RENK.cekme });
    yazi(c, g5, P5[0] + 270, P5[1] + 160, 'sıvı yükselir', { hiza: 'start', size: 22, kalin: 600 });
    gizle(g5);

    // Anlatım: beş kural sırayla, her biri panosuyla ve defter satırıyla.
    await par(c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.'), belir(c, cerceve, 500));

    await par(c.say('Kohezyon aynı tür moleküller, adezyon farklı maddeler arasındaki çekimdir.'), belir(c, g1, 600));
    c.note('<b>Kohezyon: aynı tür moleküller. Adezyon: farklı madde tanecikleri.</b>', 'Kohezyon ve adezyon', 'tekrar-iki-cekim');
    await belir(c, g1, 400, 0.35);

    await par(c.say('Adezyon büyükse sıvı yayılır; kohezyon büyükse damla kalır.'), belir(c, g2, 600));
    c.note('<b>Adezyon büyükse sıvı yayılır; kohezyon büyükse damla kalır.</b>', 'Islatma', 'tekrar-yayilma');
    await belir(c, g2, 400, 0.35);

    await par(c.say('Adezyon büyükse yüzey içbükey, kohezyon büyükse dışbükey durur.'), belir(c, g3, 600));
    c.note('<b>Adezyon büyükse içbükey, kohezyon büyükse dışbükey; eşitse düz.</b>', 'Kapta yüzey', 'tekrar-yuzey');
    await belir(c, g3, 400, 0.35);

    await par(c.say('Yüzey gerilimi kohezyonun sonucudur; etkileşim güçlendikçe artar.'), belir(c, g4, 600));
    c.note('<b>Yüzey gerilimi kohezyonun sonucudur; etkileşim güçlendikçe artar.</b>', 'Yüzey gerilimi', 'tekrar-yuzey-gerilimi');
    await belir(c, g4, 400, 0.35);

    await par(c.say('İnce tüpte adezyon büyükse sıvı kendiliğinden yükselir.'), (async () => {
      await belir(c, g5, 600);
      await k5.git(1, 900);
    })());
    c.note('<b>İnce tüpte adezyon büyükse sıvı kendiliğinden yükselir.</b>', 'Kılcallık', 'tekrar-kilcallik');
  }

  Ders.start({
    id: 'cesitlilik-l3', kicker: 'Konu L · Adezyon ve kohezyon', title: 'Konu tekrarı: Adezyon ve kohezyon', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Adezyon ve kohezyon',
      hook: 'Kohezyon, adezyon, yüzey gerilimi ve kılcallık aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun kurallarını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Bir sıvı camın üzerinde yayılıyor. Aynı sıvı dar cam tüpte nasıl durur?',
        options: ['Dışbükey', 'Düz', 'İçbükey'], answer: 2,
        why: ['Dışbükey yüzey, kohezyonun baskın olduğu sıvıda görülür; yayılan sıvıda adezyon baskındır.', 'Düz yüzey, iki kuvvetin eşit olduğu durumda görülür.', 'Yayılan sıvıda adezyon baskındır; tüpte yüzey içe kavislenir.'], scene: 0 },
      { q: 'Yüzeydeki bir sıvı molekülünün net kuvveti hangi yöndedir?',
        options: ['Sıvının içine doğru', 'Yukarı doğru', 'Sıfırdır'], answer: 0,
        why: ['Üstten çekim yok; yan çekimler birbirini dengeler, alttaki çekim kalır.', 'Molekülün üstünde sıvı molekülü yoktur; yukarı çekim olmaz.', 'Net kuvvetin sıfır olduğu molekül sıvının içindekidir.'], scene: 0 },
      { q: 'Yaprağın üzerindeki su damlası yuvarlaktır. Hangisi doğrudur?',
        options: ['Yaprakla hiç çekim yoktur', 'Yaprakla adezyon vardır; kohezyon daha büyüktür', 'Yalnızca adezyon vardır'], answer: 1,
        why: ['Damla yaprağa yapışır; yani yaprakla adezyon vardır.', 'Yuvarlaklık kohezyonun, yapışma adezyonun işaretidir.', 'Damla yuvarlak olduğuna göre kohezyon da vardır ve daha büyüktür.'], scene: 0 },
      { q: 'K sıvısının molekülleri arasında hidrojen bağı, T sıvısının moleküllerinde yalnızca London kuvveti var. Hangisinin yüzey gerilimi büyüktür?',
        options: ['T’nin', 'İkisinin eşittir', 'K’nin'], answer: 2,
        why: ['London kuvveti daha zayıftır; T’nin yüzey gerilimi daha küçüktür.', 'Etkileşimleri farklı olduğu için yüzey gerilimleri de farklıdır.', 'Hidrojen bağı daha güçlü etkileşimdir; kohezyon ve yüzey gerilimi daha büyüktür.'], scene: 0 },
      { q: 'Bir sıvı ince cam tüpte kendiliğinden yükseliyor. Hangisi doğrudur?',
        options: ['Sıvının kohezyonu adezyondan büyüktür', 'Cam ile adezyon yeterince büyüktür', 'Sıvı camı ıslatmaz'], answer: 1,
        why: ['Kohezyon baskın olsaydı sıvı yükselmezdi.', 'İnce tüpte sıvı, adezyon yeterince büyükse kendiliğinden yükselir.', 'Yükselen sıvı camı ıslatır; adezyon baskındır.'], scene: 0 },
      { q: 'Bir üretici su geçirmeyen bir kumaş yapıyor. Kumaş ile su arasındaki adezyon nasıl olmalı?',
        options: ['Suyun kohezyonuna eşit', 'Suyun kohezyonundan büyük', 'Suyun kohezyonundan küçük'], answer: 2,
        why: ['Eşitse kapta yüzey düz kalır; su kumaşta damla olmaz.', 'Adezyon büyükse su kumaşta yayılır ve kumaşı ıslatır.', 'Adezyon küçükse su kumaşta damla kalır ve kumaşı ıslatmaz.'], scene: 0 },
      { q: 'Cıva cam yüzeyde damla kalıyor. Aynı cıva ince cam tüpe daldırılırsa tüpte nasıl davranır?',
        options: ['Kabın seviyesinin altına iner', 'Kabın seviyesinin üstüne çıkar', 'Kabın seviyesinde kalır'], answer: 0,
        why: ['Damla kalan sıvıda kohezyon baskındır; ince tüpte sıvı alçalır.', 'Yükselmesi için adezyonun kohezyondan büyük olması gerekirdi.', 'Kuvvetler eşit olmadığı için seviye değişir.'], scene: 0 },
      { q: 'Bitkinin hücre duvarlarına yapışan su molekülleri arasındaki çekim hangisidir?',
        options: ['Adezyon', 'Kohezyon', 'İyon-dipol'], answer: 0,
        why: ['Su ile hücre duvarı farklı maddelerdir; aralarındaki çekim adezyondur.', 'Kohezyon aynı tür moleküller arasındadır; duvar su molekülü değildir.', 'İyon-dipol, iyon ile polar molekül arasındadır; burada iyon yok.'], scene: 0 },
    ],
    summary: [
      'Kohezyon aynı tür moleküller, adezyon farklı maddeler arasındaki çekimdir.',
      'Adezyon büyükse sıvı yayılır ve içbükey durur; kohezyon büyükse damla kalır ve dışbükey durur.',
      'Yüzey gerilimi kohezyonun sonucudur; etkileşim güçlendikçe artar.',
      'İnce tüpte adezyon büyükse sıvı kendiliğinden yükselir.',
      '<b>Aynı tür çeker, farklı maddeyle çeker; hangisi baskınsa sıvının davranışını o belirler.</b>',
    ],
    nextLesson: { href: 'm1-yuzey-gerilimi-sicaklik.html', label: 'Sonraki konu: Yüzey gerilimi ›' },
  });
})();
