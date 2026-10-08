/* K3 — Konu tekrarı: Viskozite
   Yeni bilgi yok. Tek sahnede konunun kuralları dört panoda toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/K-viskozite.md (K3). Seslendirme yok.
   Panolarda çizim ve kısa etiket vardır; kuralın uzun hâli altyazıda ve defterdedir. Tüpteki bilye yolları K2'deki okunan değerlerdir (gliserin 25 °C 1 bölme, 60 °C 4 bölme; propilen glikol 15 °C 2 bölme, 25 °C 4 bölme). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par } = window.KIT;
  const { GRI, SIVI, tup } = window.KIT_K;

  /* ---- 1. Konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P1 = [30, 20], P2 = [520, 20], P3 = [30, 290], P4 = [520, 290], W = 450, H = 245;
    const cerceve = c.S('g', {}, svg);
    [P1, P2, P3, P4].forEach((p) => kutu(c, cerceve, p[0], p[1], W, H));
    gizle(cerceve);

    // Pano 1: bal ve su; direnç ve akış çubukları ters yönde.
    const g1 = c.S('g', {}, svg);
    yazi(c, g1, P1[0] + W / 2, P1[1] + 44, 'direnç ve akış', { size: 26, kalin: 700 });
    const bar = (g, x, y, w, renk) => c.S('rect', { x, y, width: w, height: 28, rx: 6, fill: renk }, g);
    yazi(c, g1, 90, 118, 'bal', { size: 26, kalin: 700 }); yazi(c, g1, 90, 198, 'su', { size: 26, kalin: 700 });
    bar(g1, 150, 92, 280, GRI.koyu); bar(g1, 150, 128, 60, '#e3e7f3');
    bar(g1, 150, 172, 60, GRI.koyu); bar(g1, 150, 208, 280, '#e3e7f3');
    gizle(g1);

    // Pano 2: iki katman molekül; hidrojen bağı 1 ve 3.
    const g2 = c.S('g', {}, svg);
    yazi(c, g2, P2[0] + W / 2, P2[1] + 44, 'hidrojen bağı', { size: 26, kalin: 700, renk: RENK.cekme });
    const mini = (x0, y0, n, hiz) => {
      for (let i = 0; i < 4; i++) c.S('circle', { cx: x0 + i * 40, cy: y0 + 72, r: 11, fill: GRI.alt }, g2);
      const idx = { 1: [2], 3: [0, 1, 3] }[n];
      for (let i = 0; i < 4; i++) c.S('circle', { cx: x0 + i * 40 + hiz, cy: y0, r: 11, fill: GRI.molekul }, g2);
      idx.forEach((i) => cizgi(c, g2, [x0 + i * 40 + hiz, y0 + 12], [x0 + i * 40, y0 + 60], RENK.cekme, n === 3 ? 5 : 2.5, { 'stroke-dasharray': '6 5' }));
    };
    mini(580, 140, 1, 34); mini(790, 140, 3, 6);
    yazi(c, g2, 640, 262, '1', { size: 30, kalin: 700 }); yazi(c, g2, 850, 262, '3', { size: 30, kalin: 700 });
    gizle(g2);

    // Pano 3: tüpte bilye, iki sıcaklık (aynı sıvı).
    const g3 = c.S('g', {}, svg);
    yazi(c, g3, P3[0] + W / 2, P3[1] + 44, 'sıcaklık', { size: 26, kalin: 700 });
    const t1 = tup(c, g3, { x: 100, y: 352, k: 0.4, ton: SIVI.gliserin, bolme: 1, etiket: ['soğuk'], esize: 22 });
    const t2 = tup(c, g3, { x: 370, y: 352, k: 0.4, ton: SIVI.gliserin, bolme: 4, etiket: ['sıcak'], esize: 22 });
    gizle(g3);

    // Pano 4: iki tüp, sıvı sabit, yalnızca sıcaklık değişir.
    const g4 = c.S('g', {}, svg);
    yazi(c, g4, P4[0] + W / 2, P4[1] + 44, 'tek değişken', { size: 26, kalin: 700, renk: RENK.vurgu });
    const t3 = tup(c, g4, { x: 600, y: 352, k: 0.4, ton: SIVI.propilenglikol, sic: 15, bolme: 2 });
    const t4 = tup(c, g4, { x: 820, y: 352, k: 0.4, ton: SIVI.propilenglikol, sic: 25, bolme: 4 });
    gizle(g4);

    await par(c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.'), belir(c, cerceve, 500));

    await par(c.say('Viskozite, sıvının akmaya karşı gösterdiği dirençtir.'), belir(c, g1, 500));
    c.note('<b>Viskozite</b> akmaya karşı dirençtir.<br>Örnek: bal.', 'Viskozite', 'tekrar-viskozite');
    await c.say('Viskozite arttıkça akışkanlık azalır.');
    c.note('<b>Viskozite arttıkça akışkanlık azalır.</b><br>Örnek: bal, su.', 'Viskozite ve akışkanlık', 'tekrar-akiskanlik');

    await par(c.say('OH sayısı arttıkça hidrojen bağı çoğalır, moleküller zor kayar.', { speak: 'o ha sayısı arttıkça hidrojen bağı çoğalır, moleküller zor kayar.' }), belir(c, g2, 500));
    c.note('<b>OH sayısı arttıkça hidrojen bağı çoğalır; viskozite artar.</b><br>Örnek: gliserin.', 'OH sayısı', 'tekrar-oh');
    await c.say('Etkileşim büyüdükçe viskozite artar.');
    c.note('<b>Etkileşim büyüdükçe viskozite artar.</b><br>Örnek: gliserin, 3 OH.', 'Etkileşim ve viskozite', 'tekrar-etkilesim');

    await par(c.say('Sıcaklık arttıkça etkileşim zayıflar; viskozite azalır.'), (async () => {
      await belir(c, g3, 500);
      await par(t1.birak(2800), t2.birak(2800));
      await par(t1.isaret(), t2.isaret());
    })());
    c.note('<b>Sıcaklık arttıkça viskozite azalır.</b><br>Örnek: sıcak bal.', 'Sıcaklık', 'tekrar-sicaklik');

    await par(c.say('Bir etkiyi görmek için tek değişkeni değiştiririz.'), (async () => {
      await belir(c, g4, 500);
      await par(t3.birak(2800), t4.birak(2800));
      await par(t3.isaret(), t4.isaret());
    })());
    c.note('<b>Bir etkiyi görmek için tek değişkeni değiştir.</b><br>Örnek: sıvı sabit, sıcaklık değişir.', 'Tek değişken', 'tekrar-degisken');
  }

  Ders.start({
    id: 'cesitlilik-k3', kicker: 'Konu K · Viskozite', title: 'Konu tekrarı: Viskozite', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Viskozite',
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
      { q: 'Viskozite aşağıdakilerden hangisidir?',
        options: ['Sıvının kaynamaya başladığı sıcaklık', 'Sıvının akmaya karşı gösterdiği direnç', 'Sıvı yüzeyindeki buharın basıncı'], answer: 1,
        why: ['Kaynama sıcaklığı akışı değil, sıvının buharlaşmasını anlatır.', 'Sıvı akarken karşılaştığı dirence viskozite denir.', 'Buhar basıncı başka bir niteliktir; akışla ilgisi yoktur.'], scene: 0 },
      { q: 'Özdeş büretlerin muslukları aynı anda açılıp kapatıldı. A sıvısı B sıvısından daha küçük leke bıraktı. Hangisi doğrudur?',
        options: ['A’nın akışkanlığı daha büyüktür', 'İkisinin viskozitesi eşittir', 'A’nın viskozitesi daha büyüktür'], answer: 2,
        why: ['Küçük leke, aynı sürede az akmak demektir; akışkanlık küçüktür.', 'Lekeler farklı büyüklükte; sıvılar aynı sürede farklı miktarda akmıştır.', 'A aynı sürede daha az aktı; direnci yani viskozitesi daha büyüktür.'], scene: 0 },
      { q: 'Aynı sıcaklıkta X sıvısının molekülünde 1, Y sıvısının molekülünde 2 OH grubu var. Hangisi doğrudur?',
        options: ['Y daha viskozdur', 'X daha viskozdur', 'İkisinin viskozitesi eşittir'], answer: 0,
        why: ['Y’de OH çok, hidrojen bağı çok; moleküller zor kayar, viskozite büyüktür.', 'X’te OH ve hidrojen bağı daha az; moleküller daha kolay kayar.', 'OH sayıları farklı olduğundan hidrojen bağı sayıları da farklıdır.'], scene: 0 },
      { q: 'Su ve gliserinin ikisi de hidrojen bağı kuruyor. Hangisi doğrudur?',
        options: ['Etkileşim türü aynı olduğundan akışkanlıkları eşittir', 'Gliserinde hidrojen bağı sayısı fazla; viskozitesi daha büyük', 'Suyun viskozitesi gliserininkinden büyüktür'], answer: 1,
        why: ['Bağ türü aynı olsa da bağ sayısı farklıdır; akışkanlık eşit olmaz.', 'Gliserinde OH çok; çok hidrojen bağı moleküllerin kaymasını zorlaştırır.', 'Suyun lekesi gliserininkinden çok büyüktür; viskozitesi daha küçüktür.'], scene: 0 },
      { q: 'Bir sıvının ısıtılmış hâliyle soğuk hâlinde bilye 10 saniyede ne kadar iner?',
        options: ['Soğukta daha çok iner', 'İkisinde aynı kadar iner', 'Isıtılmışta daha çok iner'], answer: 2,
        why: ['Soğuyan sıvıda etkileşim büyür; bilye daha az iner.', 'Sıcaklık değişince viskozite de değişir; bilyenin yolu aynı kalmaz.', 'Isınınca etkileşim zayıflar, sıvı kolay akar; bilye daha çok iner.'], scene: 0 },
      { q: 'Üç tüp: P (X sıvısı, soğuk), Q (X sıvısı, sıcak), R (Y sıvısı, soğuk). Sıvı türünün etkisini hangi iki tüp gösterir?',
        options: ['P ve Q', 'P ve R', 'Q ve R'], answer: 1,
        why: ['P ve Q’da sıvı aynı, sıcaklık farklı; bu çift sıcaklığın etkisini gösterir.', 'P ve R’de sıcaklık aynı, yalnızca sıvı farklı; tek değişken değişir.', 'Q ve R’de hem sıvı hem sıcaklık farklı; etkiyi ayıramazsın.'], scene: 0 },
      { q: 'Kavanozdaki bal çok yavaş akıyor. Daha kolay akması için ne yapılır?',
        options: ['Kavanoz buzdolabına konur', 'Kavanoz ılık suda bekletilir', 'Kavanoz aynı sıcaklıkta bırakılır'], answer: 1,
        why: ['Soğuyan balda etkileşim büyür; daha yavaş akar.', 'Isınan balda etkileşim zayıflar; viskozitesi azalır, daha kolay akar.', 'Sıcaklık değişmezse bal aynı hızda akmaya devam eder.'], scene: 0 },
      { q: 'Aynı sıcaklıkta K sıvısında bilye, L sıvısındakinden daha çok iniyor. Hangisi doğrudur?',
        options: ['K’nin viskozitesi daha büyüktür', 'K’nin molekülleri arasındaki etkileşim daha kuvvetlidir', 'K’nin molekülleri arasındaki etkileşim daha zayıftır'], answer: 2,
        why: ['Bilye K’de daha çok indi; K daha kolay akıyor, viskozitesi daha küçüktür.', 'Kuvvetli etkileşimde moleküller zor kayar ve bilye az iner.', 'Bilye çok indiyse K kolay akıyordur; moleküller arası etkileşim daha zayıftır.'], scene: 0 },
    ],
    summary: [
      'Viskozite, akmaya karşı dirençtir; arttıkça akışkanlık azalır.',
      'OH sayısı ve hidrojen bağı arttıkça etkileşim büyür, viskozite artar.',
      'Sıcaklık arttıkça etkileşim zayıflar, viskozite azalır.',
      'Bir etkiyi görmek için tek değişkeni değiştiririz.',
      '<b>Etkileşim büyüdükçe viskozite artar; sıcaklık artınca azalır.</b>',
    ],
    nextLesson: { href: 'l1-kohezyon-adezyon.html', label: 'Sonraki konu: Adezyon ve kohezyon ›' },
  });
})();
