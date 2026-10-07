/* C2 — Doğrulanmış önermeler iş görür
   İç ve dış açı önermeleri, en uzun kenar önermesi ve üçgen eşitsizliği; mühendislik, mimari ve görsel sanat
   problemlerinde ölçmeden sonuç verir. Yeni önerme yok.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/C-dogrulamayi-sinamak-ve-kullanmak.md */
(() => {
  'use strict';
  const { RENK, rad, cizgi, gizle, belir, par, ucgen, kenarlar, disAci, cubuklar, soruKarti } = window.KIT;

  /* B ve C köşeleri ile bu köşelerdeki açılar (derece) verilince A köşesi. */
  const tepe = (B, C, beta, gama) => {
    const ab = ((C[0] - B[0]) * Math.sin(rad(gama))) / Math.sin(rad(180 - beta - gama));
    return [B[0] + ab * Math.cos(rad(beta)), B[1] - ab * Math.sin(rad(beta))];
  };
  const cevapla = (t, metin) => { t.textContent = metin; t.style.fill = RENK.iyi; };

  /* ---- 1. Köprü kafesi ---- */
  async function kopru(c) {
    const svg = c.svg(1000, 562);
    const Y = 400, alt = [100, 300, 500, 700, 900].map((x) => [x, Y]);
    const ust = alt.slice(0, 4).map((p) => tepe(p, [p[0] + 200, Y], 65, 50));
    const kafes = c.S('g', {}, svg);
    cizgi(c, kafes, alt[0], alt[4], RENK.ince, 6); cizgi(c, kafes, ust[0], ust[3], RENK.ince, 6);
    ust.forEach((u, i) => { cizgi(c, kafes, alt[i], u, RENK.ince, 6); cizgi(c, kafes, u, alt[i + 1], RENK.ince, 6); });
    const B = alt[1], C = alt[2], A = ust[1];
    const dis = disAci(c, svg, C, B, A, { uzun: 90 });
    const u = ucgen(c, svg, A, B, C, { r: 36, harf: false, olcu: ['?', '65°', '50°'], olcuSize: 24 });
    gizle(dis.g);
    await c.say('Bir köprünün çelik kafesi: üçgenlerden kurulu.');
    await c.choice({
      tag: 'Mühendislik', q: 'Öne çıkan üçgende iki açı 65° ve 50°. Ölçülmeyen üçüncü açı kaç derece?',
      options: ['75°', '65°', '115°'], answer: 1,
      hints: ['65° + 50° + 75° = 190°; toplam 180° olmalı.', '', '115°, verilen iki açının toplamı; üçüncü açı kalandır.'],
      right: '180° − 65° − 50° = 65°.',
    });
    cevapla(u.olculer[0], '65°');
    await c.say('Mühendis üçüncü açıyı ölçmedi: iç açılar toplamından buldu.');
    dis.yaz('?');
    await par(c.say('Aynı köşede, alt kiriş ile çubuk arasında bir dış açı var.'), belir(c, dis.g, 450));
    await c.choice({
      tag: 'Mühendislik', q: 'Bu dış açı kaç derece?',
      options: ['50°', '115°', '130°'], answer: 2,
      hints: ['50° iç açı; dış açı onu 180°’ye tamamlar.', '50° komşu açı; uzaktaki iki açı 65° ve 65°.', ''],
      right: 'Uzaktaki iki açı: 65° + 65° = 130°.',
    });
    cevapla(dis.yazi, '130°');
    await c.say('İki önerme, iki sonuç: hiçbiri ölçülmedi.');
  }

  /* ---- 2. Çatı makası ---- */
  async function cati(c) {
    const svg = c.svg(1000, 562);
    const S = 60, B = [200, 430], C = [800, 430], A = [500, 430 - Math.sqrt(36 - 25) * S];
    const g = c.S('g', {}, svg);
    const u = ucgen(c, g, A, B, C, { r: 44 }), k = kenarlar(c, g, A, B, C);
    k.yaz(['10 m', '6 m', '6 m']);
    await c.say('Bir çatı makası: kirişler 6 m, 6 m ve 10 m.');
    await c.choice({
      tag: 'Mimari', q: 'Makasın en geniş açısı hangi köşede?',
      options: ['B', 'A (tepe)', 'C'], answer: 1,
      hints: ['B’nin karşısındaki kiriş 6 m; en uzunu değil.', '', 'C’nin karşısındaki kiriş 6 m; en uzunu değil.'],
      right: 'En uzun kiriş 10 m; karşısındaki köşe tepe.',
    });
    u.dilimler.forEach((d, i) => d.el.setAttribute('fill-opacity', i === 0 ? 0.95 : 0.3)); k.kalin(0, 9);
    await c.say('En uzun kirişin karşısı en geniş açı: tepe.');
    await belir(c, g, 350, 0); g.remove();
    const d = cubuklar(c, svg, 11, 5, 5);
    d.ac(); gizle(d.g);
    await par(c.say('Usta bu kez 5, 5 ve 11 metrelik kirişleri deniyor.'), belir(c, d.g, 400));
    await c.choice({
      tag: 'Mimari', q: '5 m, 5 m ve 11 m’lik kirişlerle makas kurulur mu?',
      options: ['Kurulur', 'Kurulmaz'], answer: 1,
      hints: ['5 + 5 = 10; 11’e yetmiyor.', ''],
      right: '5 + 5 = 10, 11’den küçük.',
    });
    await par(c.say('İki kiriş birlikte tabana yetmiyor: üçgen eşitsizliği.'), d.kapat(1700));
  }

  /* ---- 3. Afiş ---- */
  async function afis(c) {
    const svg = c.svg(1000, 562);
    c.S('rect', { x: 200, y: 50, width: 600, height: 470, rx: 8, fill: '#18213f', stroke: RENK.kenarlik, 'stroke-width': 3 }, svg);
    c.S('rect', { x: 240, y: 86, width: 300, height: 22, rx: 6, fill: RENK.kenarlik }, svg);
    c.S('rect', { x: 240, y: 122, width: 180, height: 14, rx: 5, fill: RENK.kenarlik }, svg);
    const B = [270, 450], C = [570, 450], A = tepe(B, C, 55, 40);
    const dis = disAci(c, svg, C, B, A, { uzun: 228 });
    const u = ucgen(c, svg, A, B, C, { r: 40, olcu: ['85°', '?', ''], olcuSize: 24, dolgu: 'rgba(199,146,255,.22)' });
    dis.yaz('140°'); dis.yazi.setAttribute('font-size', 24);
    await c.say('Bir afiş: üçgenin bir kenarı çerçeveye kadar uzatılmış.');
    await c.choice({
      tag: 'Görsel sanat', q: 'Dış açı 140°, uzaktaki açılardan biri 85°. B’deki açı kaç derece?',
      options: ['40°', '55°', '225°'], answer: 1,
      hints: ['40°, C’deki komşu iç açı: 180° − 140°.', '', 'Toplamak değil: 140°, iki uzak açının toplamı.'],
      right: '140° − 85° = 55°.',
    });
    cevapla(u.olculer[1], '55°');
    await c.say('Tasarımcı açıyı ölçmedi; dış açı önermesinden hesapladı.');
  }

  /* ---- 4. Hangi önerme? ---- */
  async function hangiOnerme(c) {
    const svg = c.svg(1000, 562);
    const goster = soruKarti(c, svg);
    const ONERME = ['İç açılar toplamı', 'Dış açı önermesi', 'En uzun kenar önermesi', 'Üçgen eşitsizliği'];
    const sor = (no, cevap, ipucu, dogru) => c.choice({
      tag: 'Soru ' + no + ' / 3', q: 'Hangi önerme işe yarar?', options: ONERME, answer: cevap,
      hints: ONERME.map((_, i) => (i === cevap ? '' : ipucu)), right: dogru,
    });
    await c.say('Sıra sende: çözmeden önce hangi önermeyi kullanacağını seç.', { noWait: true });
    await goster(['“Üçgenin iki açısı 80° ve 45°.', 'Üçüncü açı kaç derece?”']);
    await sor(1, 0, 'Verilenler iki iç açı; aranan üçüncü iç açı.', '180° − 80° − 45° = 55°.');
    await goster(['“6 m, 7 m ve 15 m’lik kirişlerle', 'üçgen çatı kurulur mu?”']);
    await sor(2, 3, 'Verilenler üç uzunluk; soru üçgenin kurulup kurulmayacağı.', '6 + 7 = 13, 15’ten küçük: kurulmaz.');
    await goster(['“Kenarları 6, 9 ve 7 olan üçgende', 'en geniş köşe hangisi?”']);
    await sor(3, 2, 'Verilenler kenarlar; aranan en büyük açının yeri.', '9’luk kenarın karşısındaki köşe.');
    c.note('Verilene bak, önermeyi seç:<br>açılar → 180° · çubuklar → üçgen eşitsizliği', 'Hangi önerme?', 'gs-hangi-onerme');
    await c.say('İspatlı bilgi, ölçmeden de sonuç verir.');
  }

  Ders.start({
    id: 'geometrik-sekiller-c2', kicker: 'Konu C · Doğrulamayı sınamak ve kullanmak', title: 'Doğrulanmış önermeler iş görür', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Doğrulanmış önermeler iş görür',
      hook: 'Bir mühendis, çelik kafesin <b>hiç ölçmediği</b> bir açısını nasıl bulur?',
      button: 'Derse başla ›',
    },
    goals: ['Açı ve kenar önermelerini geometrik problemlerde kullanır.', 'Mühendislik, mimari ve görsel sanat bağlamındaki bir problemde uygun önermeyi seçer.'],
    scenes: [
      { title: 'Köprü kafesi', goal: 'Ölçülmeyen iç açıyı ve dış açıyı önermelerle bul.', run: kopru },
      { title: 'Çatı makası', goal: 'En geniş köşeyi bul; kirişlerin makas kurup kurmadığına karar ver.', run: cati },
      { title: 'Afiş', goal: 'Dış açıdan uzaktaki iç açıyı hesapla.', run: afis },
      { title: 'Hangi önerme?', goal: 'Verilenlere bakarak uygun önermeyi seç.', run: hangiOnerme },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'Bir kafes üçgeninde iki açı 70° ve 35°. Üçüncü açı kaç derecedir?',
        options: ['75°', '105°', '255°'], answer: 0,
        why: ['180° − 70° − 35° = 75°.', '105°, verilen iki açının toplamıdır; üçüncü açı 180° − 105° = 75°.', 'Bir iç açı 180°’den küçüktür.'],
        scene: 0,
      },
      {
        q: '4 m, 5 m ve 10 m’lik üç kirişle üçgen bir çatı kurulur mu?',
        options: ['Kurulur: üç kiriş var.', 'Kurulur: en uzunu 10 m.', 'Kurulmaz: 4 + 5, 10’dan küçük.'], answer: 2,
        why: ['Her üç uzunluk üçgen kurmaz.', 'En uzun kiriş, öbür ikisinin toplamından kısa olmalı.', '4 + 5 = 9; 10’a yetmiyor.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>İspatlı bilgi, ölçmeden de sonuç verir.</b>',
      'Açılar verilmişse: iç açılar toplamı ya da dış açı önermesi.',
      'Kenarlar verilmişse: en uzun kenar önermesi ya da üçgen eşitsizliği.',
    ],
  });
})();
