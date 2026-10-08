/* J3 — Konu tekrarı: Kaynama sıcaklığı
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/J-kaynama-sicakligi.md (J3). Seslendirme yok.
   Tahtada altı küçük pano durur; kuralın uzun hâli altyazıda ve defterdedir, panoda küçük çizim ve etiket vardır. */
(() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { GRI, DIS, IC, TON, EGRI, okK } = window.KIT_J;
  const { ease } = Ders;

  /* ---- 1. Konunun kuralları: altı pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const W = 300, H = 236, PX = [30, 350, 670], PY = [24, 290];
    const pano = (i) => { const x = PX[i % 3], y = PY[Math.floor(i / 3)], g = c.S('g', {}, svg); kutu(c, g, x, y, W, H, { rx: 14 }); return { g, x, y }; };
    const etiket = (P, m) => yazi(c, P.g, P.x + W / 2, P.y + H - 20, m, { size: 24, kalin: 700, renk: RENK.vurgu });

    // 1) Kabarcık: iç basınç = dış basınç.
    const P1 = pano(0), C1 = [P1.x + W / 2, P1.y + 100];
    c.S('circle', { cx: C1[0], cy: C1[1], r: 58, fill: GRI.ic, stroke: GRI.acik, 'stroke-width': 3 }, P1.g);
    [0.785, 2.356, 3.927, 5.498].forEach((a) => okK(c, P1.g, ileri(C1, a, 12), ileri(C1, a, 46), IC, 5));
    [0, 1.571, 3.142, 4.712].forEach((a) => okK(c, P1.g, ileri(C1, a, 96), ileri(C1, a, 63), DIS, 5, true));
    etiket(P1, 'iç = dış');

    // 2) Grafik: iki kesikli çizgi, iki kaynama noktası.
    const P2 = pano(1), X0 = P2.x + 40, Y0 = P2.y + 170, PXG = 1.9;
    const Pb = (T) => Math.pow(10, 8.07131 - 1730.63 / (233.426 + T)), gy = (mm) => Y0 - mm * 0.15, gx = (T) => X0 + T * PXG;
    cizgi(c, P2.g, [X0, Y0], [X0, P2.y + 22], GRI.cam, 3); cizgi(c, P2.g, [X0, Y0], [P2.x + W - 22, Y0], GRI.cam, 3);
    let d = ''; for (let T = 0; T <= 104; T += 2) d += (T ? 'L' : 'M') + gx(T) + ',' + gy(Pb(T));
    c.S('path', { d, fill: 'none', stroke: EGRI, 'stroke-width': 4, 'stroke-linecap': 'round' }, P2.g);
    [[228, 69.5], [760, 100]].forEach(([mm, T]) => {
      cizgi(c, P2.g, [X0, gy(mm)], [gx(T), gy(mm)], RENK.vurgu, 3, { 'stroke-dasharray': '7 5' }); cizgi(c, P2.g, [gx(T), gy(mm)], [gx(T), Y0], RENK.vurgu, 3, { 'stroke-dasharray': '7 5' });
      c.S('circle', { cx: gx(T), cy: gy(mm), r: 7, fill: GRI.tahta, stroke: GRI.acik, 'stroke-width': 2.5 }, P2.g);
    });
    etiket(P2, 'basınç ↑');

    // 3) Üç çubuk ve çekim çizgileri.
    const P3 = pano(2), B3 = P3.y + 160;
    [[0, 40, 2.5], [1, 82, 4.5], [2, 124, 8]].forEach(([i, h, w]) => {
      const x = P3.x + 56 + i * 94;
      c.S('rect', { x: x - 26, y: B3 - h, width: 52, height: h, rx: 5, fill: [TON.eter, TON.alkol, TON.su][i] }, P3.g);
      cizgi(c, P3.g, [x - 22, B3 + 26], [x + 22, B3 + 26], RENK.cekme, w, { 'stroke-dasharray': '8 6', 'stroke-linecap': 'butt' });
    });
    etiket(P3, 'etkileşim ↑');

    // 4) Hidrojenli bileşikler: üç yüksek çubuk.
    const P4 = pano(3), B4 = P4.y + 168;
    [[0, 96, 56], [1, 118, 64], [2, 100, 50]].forEach(([i, h1, h2]) => {
      const x = P4.x + 40 + i * 84;
      c.S('rect', { x, y: B4 - h1, width: 30, height: h1, rx: 4, fill: TON.su }, P4.g);
      c.S('rect', { x: x + 34, y: B4 - h2, width: 30, height: h2, rx: 4, fill: TON.alkol, 'fill-opacity': 0.8 }, P4.g);
      c.S('rect', { x: x - 4, y: B4 - h1 - 8, width: 38, height: h1 + 12, rx: 6, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, P4.g);
    });
    cizgi(c, P4.g, [P4.x + 24, B4], [P4.x + W - 24, B4], GRI.cam, 3);
    etiket(P4, 'H bağı');

    // 5) Bağ sayısı: su dört, HF iki.
    const P5 = pano(4);
    [[P5.x + 82, 4], [P5.x + 218, 2]].forEach(([x, n]) => {
      const cy = P5.y + 96;
      c.S('circle', { cx: x, cy, r: 26, fill: n === 4 ? '#bdbdbd' : '#d2d2d2', stroke: '#4d4d4d', 'stroke-width': 1.5 }, P5.g);
      const ac = n === 4 ? [0.8, 2.34, 3.94, 5.5] : [0, 3.14];
      ac.forEach((a) => cizgi(c, P5.g, ileri([x, cy], a, 36), ileri([x, cy], a, 70), RENK.cekme, 5, { 'stroke-dasharray': '7 5', 'stroke-linecap': 'butt' }));
      yazi(c, P5.g, x, cy + 76 + 14, String(n), { size: 30, kalin: 700, renk: RENK.cekme });
    });
    etiket(P5, 'bağ sayısı');

    // 6) İki ölçüt kutusu.
    const P6 = pano(5);
    [['dış', 'basınç'], ['etkileşim', 'türü']].forEach(([a, b], i) => {
      const x = P6.x + 22 + i * 140;
      kutu(c, P6.g, x, P6.y + 40, 116, 110, { rx: 12, renk: RENK.vurgu });
      yazi(c, P6.g, x + 58, P6.y + 92, a, { size: 22, kalin: 700 }); yazi(c, P6.g, x + 58, P6.y + 122, b, { size: 22, kalin: 700 });
    });
    etiket(P6, 'iki ölçüt');

    const P = [P1, P2, P3, P4, P5, P6];
    P.forEach((q) => gizle(q.g));
    const NOT = [
      ['<b>Buhar basıncı dış basınca eşitlenince sıvı kaynar.</b>', 'Kaynama', 'tekrar-kaynama'],
      ['<b>Dış basınç arttıkça kaynama noktası yükselir.</b> Örnek: su, 100 → 149 °C.', 'Dış basınç ve kaynama', 'tekrar-dis-basinc'],
      ['<b>Etkileşim güçlendikçe kaynama noktası yükselir.</b> Örnek: eter, alkol, su.', 'Etkileşim ve kaynama', 'tekrar-etkilesim'],
      ['<b>Hidrojen bağı kaynama noktasını beklenenden yüksek yapar.</b> Örnek: H<sub>2</sub>O, HF.', 'Hidrojen bağı', 'tekrar-hidrojen-bagi'],
      ['<b>Bağ sayısı ve elektronegatiflik farkı aradaki farkı açıklar.</b> Örnek: su, HF.', 'Hidrojen bağlı sıvılar', 'tekrar-bag-sayisi'],
      ['<b>Kaynama noktasını dış basınç ve etkileşim türü belirler.</b>', 'İki ölçüt', 'tekrar-iki-olcut'],
    ];
    const CAP = [
      'Buhar basıncı dış basınca eşitlenince sıvı kaynar.',
      'Dış basınç arttıkça kaynama noktası yükselir.',
      'Etkileşim güçlendikçe kaynama noktası yükselir.',
      'Hidrojen bağı, kaynama noktasını beklenenden yüksek yapar.',
      'Hidrojen bağı sayısı ve elektronegatiflik farkı aralarındaki farkı açıklar.',
      'Saf sıvının kaynama noktasını dış basınç ve etkileşim türü belirler.',
    ];
    const SPEAK = [null, null, null, null, 'Hidrojen bağı sayısı ve elektronegatiflik farkı aralarındaki farkı açıklar.', null];
    await c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.');
    for (let i = 0; i < 6; i++) {
      await par(c.say(CAP[i], SPEAK[i] ? { speak: SPEAK[i] } : undefined), belir(c, P[i].g, 600));
      c.note(...NOT[i]);
      if (i > 0) belir(c, P[i - 1].g, 500, 0.55);
    }
    belir(c, P[5].g, 500, 0.55);
    await c.wait(300);
  }

  Ders.start({
    id: 'cesitlilik-j3', kicker: 'Konu J · Kaynama sıcaklığı', title: 'Konu tekrarı: Kaynama sıcaklığı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Kaynama sıcaklığı',
      hook: 'İki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Kaynayan bir sıvıda kabarcığın içindeki buharın basıncı için hangisi doğrudur?',
        options: ['Dış basınçtan küçüktür', 'Dış basınca eşittir', 'Dış basınçtan büyüktür'], answer: 1,
        why: ['Dış basınçtan küçük iç basınçlı kabarcık oluşamaz.', 'Kaynarken buhar basıncı dış basınca eşitlenir.', 'Kabarcık, iç basınç dış basınca ulaşınca oluşur; ondan büyük olması gerekmez.'], scene: 0 },
      { q: 'Kapaklı bir kapta suyun üstündeki dış basınç artırılıyor. Kaynama sıcaklığı nasıl değişir?',
        options: ['Düşer', 'Değişmez', 'Yükselir'], answer: 2,
        why: ['Dış basınç artınca kaynama sıcaklığı düşmez.', 'Dış basınç değişince kaynama sıcaklığı da değişir.', 'Buhar basıncının daha yüksek bir dış basınca ulaşması için sıvı daha çok ısınmalıdır.'], scene: 0 },
      { q: 'Bir dağın tepesinde su 100 °C’tan düşük bir sıcaklıkta kaynıyor. Bunun nedeni nedir?',
        options: ['Su orada daha saftır', 'Isıtıcı orada daha zayıftır', 'Dış basınç deniz seviyesinden azdır'], answer: 2,
        why: ['Saf su da dış basınç düşünce daha düşük sıcaklıkta kaynar; saflık nedeni değildir.', 'Kaynama noktası ısıtıcının gücüne bağlı değildir.', 'Dış basınç azalınca buhar basıncı daha düşük bir sıcaklıkta ona eşitlenir.'], scene: 0 },
      { q: 'Su 1862 mmHg’de 127 °C’ta kaynıyor. Basınç 2896 mmHg’ye çıkarılırsa kaynama sıcaklığı nasıl olur?',
        options: ['127 °C’tan yüksek', '127 °C’tan düşük', '127 °C'], answer: 0,
        why: ['Dış basınç arttıkça kaynama sıcaklığı yükselir; 2896 mmHg’de su 142 °C’ta kaynar.', 'Dış basınç artınca kaynama sıcaklığı düşmez.', 'Basınç değişince kaynama sıcaklığı da değişir.'], scene: 0 },
      { q: 'Aynı sıcaklıkta K sıvısının buhar basıncı L’ninkinden büyük. Aynı dış basınçta hangisi daha düşük sıcaklıkta kaynar?',
        options: ['K', 'L', 'İkisi aynı sıcaklıkta'], answer: 0,
        why: ['K’nin çekimi zayıf, buhar basıncı büyük; dış basınca daha önce ulaşır.', 'L’nin buhar basıncı küçük; dış basınca ulaşması için daha çok ısınmalıdır.', 'Buhar basınçları farklıysa kaynama sıcaklıkları da farklıdır.'], scene: 0 },
      { q: 'HF ile HCl aynı dış basınçta kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar?',
        options: ['İkisi aynı sıcaklıkta', 'HF', 'HCl'], answer: 1,
        why: ['HF hidrojen bağı kurar, HCl kuramaz; sıcaklıkları farklıdır.', 'F–H bağı hidrojen bağı kurdurur; hidrojen bağı kaynama noktasını yükseltir.', 'HCl hidrojen bağı kuramaz; kaynama noktası HF’den düşüktür.'], scene: 0 },
      { q: 'Su 100 °C’ta, HF 19,5 °C’ta kaynar (1 atm). Aradaki farkı hangi ölçüt açıklar?',
        options: ['Su dört, HF iki hidrojen bağı kurabilir', 'HF’de hidrojen yoktur', 'Su daha yüksek dış basınçta kaynar'], answer: 0,
        why: ['Hidrojen bağı sayısı arttıkça etkinliği artar; su daha çok bağ kurar.', 'HF’de hidrojen vardır; F–H bağı hidrojen bağı kurdurur.', 'İkisi de aynı dış basınçta, 1 atm’de kaynatıldı.'], scene: 0 },
      { q: 'Hangisi saf bir sıvının kaynama noktasını belirleyen ölçütlerden biridir?',
        options: ['Kabın şekli', 'Ocağın gücü', 'Moleküller arası etkileşimin türü'], answer: 2,
        why: ['Kap değişse de kaynama noktası aynı kalır.', 'Güçlü ocak sıvıyı daha çabuk kaynatır, daha yüksek sıcaklıkta değil.', 'Dış basınç ve etkileşimin türü kaynama noktasını belirler.'], scene: 0 },
    ],
    summary: [
      '<b>Buhar basıncı dış basınca eşitlenince</b> sıvı kaynar.',
      'Dış basınç arttıkça kaynama noktası yükselir.',
      'Etkileşim güçlendikçe kaynama noktası yükselir; hidrojen bağı onu beklenenden yüksek yapar.',
      '<b>Kaynama noktasını dış basınç ve etkileşimin türü belirler.</b>',
    ],
    nextLesson: { href: 'k1-viskozite.html', label: 'Sonraki konu: Viskozite ›' },
  });
})();
