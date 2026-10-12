/* D7 — Konu tekrarı: Tales, Öklid ve Pisagor teoremleri
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla belirip silinir ve deftere düşer; ardından dokuz karışık soru gelir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/D-tales-oklid-pisagor.md (D7). */
(() => {
  'use strict';
  const K = window.KIT, KD = window.KIT_D;
  const { RENK, gizle, belir, par, yazi, renkli, cizgi, nokta, ara, cokgen, aciYayi } = K;
  const TURUNCU = RENK.goruntu, YESIL = RENK.ok, MAVI = RENK.sekil, MOR = RENK.dogru, SARI = RENK.merkez;
  const KONTROL = false; /* true: her kuralın bittiği karede ölçüm aracı görüntü alsın diye geçici altyazı */

  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };
  const kesik = { 'stroke-dasharray': '10 8' };

  /* Sağ sütundaki kural yazısı: parçalar renkli tek <text>. */
  const sagYazi = (c, g, y, parcalar, size = 34) => renkli(c, g, 800, y, parcalar, { size, kalin: 700 });

  /* A'da dik açılı üçgen ve yükseklik (D3'ün şekli): H harfi alta, H'de iki dik açı işareti. */
  function dikSekil(c, g, o) {
    const t = KD.dikUcgen(c, g, o);
    t.adlar.H.setAttribute('x', t.H[0]); t.adlar.H.setAttribute('y', t.H[1] + 46);
    t.dik.H2 = aciYayi(c, t.g, t.H, t.A, t.C, RENK.cizgi, 30, { dik: true });
    t.ilk = [t.yuz, t.hat.a, t.hat.b, t.hat.c, t.dik.A, t.adlar.A, t.adlar.B, t.adlar.C];
    t.yuk = [t.hat.h, t.dik.H, t.dik.H2, t.adlar.H];
    t.parca = [t.ayak.p, t.ayak.k];
    return t;
  }
  const DIK = { B: [90, 430], p: 4, k: 9, olcek: 36 };

  /* ---- 1. Tales: BC'ye paralel çit ---- */
  async function tales1(c, g) {
    const A = [260, 110], B = [90, 430], C = [570, 430], D = ara(A, B, 2 / 3), E = ara(A, C, 2 / 3);
    const u = cokgen(c, g, [A, B, C], MAVI, {});
    const harf = [yazi(c, g, 260, 92, 'A', { size: 26, kalin: 700 }), yazi(c, g, 64, 452, 'B', { size: 26, kalin: 700 }), yazi(c, g, 596, 452, 'C', { size: 26, kalin: 700 })];
    const dh = [yazi(c, g, D[0] - 26, D[1] + 8, 'D', { size: 26, kalin: 700 }), yazi(c, g, E[0] + 26, E[1] + 8, 'E', { size: 26, kalin: 700 })];
    const de = [cizgi(c, g, D, E, MOR, 4, kesik), nokta(c, g, D, RENK.yazi, 5), nokta(c, g, E, RENK.yazi, 5), ...dh];
    const alt = [cizgi(c, g, A, D, TURUNCU, 7), cizgi(c, g, A, E, TURUNCU, 7)], ust = [cizgi(c, g, D, B, YESIL, 7), cizgi(c, g, E, C, YESIL, 7)];
    const sart = sagYazi(c, g, 240, [['DE // BC', MOR]]);
    const f = sagYazi(c, g, 330, [['|AD|', TURUNCU], '/', ['|DB|', YESIL], ' = ', ['|AE|', TURUNCU], '/', ['|EC|', YESIL]], 32);
    gizle(harf, de, alt, ust, sart, f);
    await belir(c, harf, 400);
    await belir(c, de, 450);
    await belir(c, sart, 350);
    await belir(c, [...alt, ...ust], 450);
    await belir(c, f, 450);
  }

  /* ---- 2. Tales: üç paralel, iki kesen ---- */
  async function tales2(c, g) {
    const pk = KD.paralelKesen(c, g, {
      aci: 0,
      paraleller: [{ nokta: [300, 150], ad: 'd₃' }, { nokta: [300, 270], ad: 'd₄' }, { nokta: [300, 430], ad: 'd₅' }],
      keseler: [{ nokta: [140, 270], aci: 72, harf: ['A', 'B', 'C'], kay: [-28, 24] }, { nokta: [440, 270], aci: 108, harf: ['D', 'E', 'F'], kay: [28, 24] }],
      uzatma: 40,
    });
    const alt = [pk.parcaCiz(0, 0, TURUNCU, 8), pk.parcaCiz(1, 0, TURUNCU, 8)], ust = [pk.parcaCiz(0, 1, YESIL, 8), pk.parcaCiz(1, 1, YESIL, 8)];
    const sart = sagYazi(c, g, 240, [['d₃ // d₄ // d₅', MOR]]);
    const f = sagYazi(c, g, 330, [['|AB|', TURUNCU], '/', ['|BC|', YESIL], ' = ', ['|DE|', TURUNCU], '/', ['|EF|', YESIL]], 32);
    gizle(alt, ust, sart, f);
    await belir(c, sart, 400);
    await belir(c, [...alt, ...ust], 500);
    await belir(c, f, 450);
  }

  /* ---- 3. Öklid: yükseklik ---- */
  async function oklidH(c, g) {
    const t = dikSekil(c, g, Object.assign({ etiket: { h: 'h', p: 'p', k: 'k' } }, DIK));
    const f = sagYazi(c, g, 290, [['h²', SARI], ' = ', ['p', TURUNCU], '·', ['k', YESIL]], 44);
    const et = [t.etiket.h, t.etiket.p, t.etiket.k];
    gizle(t.yuk, t.parca, et, f);
    await belir(c, t.yuk, 450);
    await belir(c, [...t.parca, t.etiket.p, t.etiket.k, t.etiket.h], 450);
    await belir(c, f, 450);
  }

  /* ---- 4. Öklid: dik kenar ---- */
  async function oklidKenar(c, g) {
    const t = dikSekil(c, g, Object.assign({ etiket: { a: 'a', b: 'b', c: 'c', p: 'p', k: 'k' } }, DIK));
    const f1 = sagYazi(c, g, 250, [['c²', TURUNCU], ' = ', ['p', TURUNCU], '·', ['a', MAVI]], 42);
    const f2 = sagYazi(c, g, 350, [['b²', YESIL], ' = ', ['k', YESIL], '·', ['a', MAVI]], 42);
    gizle(t.yuk, t.parca, Object.values(t.etiket), f1, f2);
    await belir(c, [t.hat.h, t.dik.H, t.dik.H2, t.adlar.H], 400, 0.35);
    await belir(c, [...t.parca, ...Object.values(t.etiket)], 450);
    await belir(c, f1, 450);
    await belir(c, f2, 450);
  }

  /* ---- 5. Pisagor: dik kenarlar a ve b, hipotenüs c ---- */
  async function pisagor(c, g) {
    const P = [110, 440], X = [430, 440], Y = [110, 200];
    const u = cokgen(c, g, [P, X, Y], MAVI, { dolgu: 0.1, w: 1 });
    u.yuz.setAttribute('stroke', 'none');
    const a = cizgi(c, g, P, X, MAVI, 6), b = cizgi(c, g, P, Y, YESIL, 6), h = cizgi(c, g, X, Y, TURUNCU, 6);
    const dik = aciYayi(c, g, P, X, Y, RENK.cizgi, 34, { dik: true });
    const et = [yazi(c, g, 270, 484, 'a', { size: 28, kalin: 700, renk: MAVI }), yazi(c, g, 82, 328, 'b', { size: 28, kalin: 700, renk: YESIL }), yazi(c, g, 296, 306, 'c', { size: 28, kalin: 700, renk: TURUNCU })];
    const f = sagYazi(c, g, 290, [['a²', MAVI], ' + ', ['b²', YESIL], ' = ', ['c²', TURUNCU]], 44);
    const hip = yazi(c, g, 800, 350, 'c: hipotenüs', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(a, b, h, dik, et, f, hip);
    await belir(c, [dik], 300);
    await belir(c, [a, b, h, ...et], 500);
    await belir(c, [f, hip], 450);
  }

  /* ---- 6. Karşı kenarın karesi: açı geniş ya da dar ---- */
  async function mentese(c, g) {
    const m = KD.menteseGrafik(c, g, [200, 450], 3, 4, { olcek: 52, aci: 90, gx: 640, gy: 400, gw: 320, gh: 260 });
    gizle(m.g);
    await belir(c, m.g, 500);
    await c.wait(300);
    await c.tween(1100, (e) => m.ac(90 + 30 * e));
    const genis = renkli(c, g, 800, 520, [['geniş açı: ', RENK.soluk], ['c²', TURUNCU], ' > ', ['a² + b²', MAVI]], { size: 28, kalin: 700 });
    gizle(genis); await belir(c, genis, 350);
    await c.wait(700);
    await belir(c, genis, 250, 0); genis.remove();
    await c.tween(1300, (e) => m.ac(120 - 60 * e));
    const dar = renkli(c, g, 800, 520, [['dar açı: ', RENK.soluk], ['c²', TURUNCU], ' < ', ['a² + b²', MAVI]], { size: 28, kalin: 700 });
    gizle(dar); await belir(c, dar, 350);
  }

  /* ---- Kapanış: iki benzerlik şekli ---- */
  async function kapanis(c, g) {
    const A = [230, 190], B = [90, 420], C = [400, 420], D = ara(A, B, 0.6), E = ara(A, C, 0.6);
    const buyuk = cokgen(c, g, [A, B, C], MAVI, { dolgu: 0.1 });
    const kucuk = cokgen(c, g, [A, D, E], TURUNCU, { dolgu: 0.3 });
    const de = cizgi(c, g, D, E, MOR, 4, kesik);
    const t = KD.dikUcgen(c, g, { B: [580, 420], p: 4, k: 9, olcek: 27 });
    ['A', 'B', 'C', 'H'].forEach((k) => t.adlar[k].remove());
    t.dik.H.remove(); t.hat.h.setAttribute('stroke-width', 3.5);
    const sol = c.S('polygon', { points: [t.A, t.B, t.H].map((q) => q.join(',')).join(' '), fill: TURUNCU, 'fill-opacity': 0.3, stroke: 'none' }, g);
    const sag = c.S('polygon', { points: [t.A, t.H, t.C].map((q) => q.join(',')).join(' '), fill: YESIL, 'fill-opacity': 0.3, stroke: 'none' }, g);
    const baslik = yazi(c, g, 500, 100, 'Hepsi benzer üçgenlerden çıkar', { size: 40, kalin: 700 });
    gizle(buyuk.g, kucuk.g, de, t.g, sol, sag, baslik);
    await belir(c, baslik, 450);
    await belir(c, [buyuk.g, t.g], 500);
    await belir(c, [kucuk.g, de, sol, sag], 500);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const bos = () => c.S('g', {}, svg);
    const kural = async (yap, cumle, secenek) => {
      const g = bos();
      await par(c.say(cumle, secenek), yap(c, g));
      await c.wait(500);
      if (KONTROL) await c.say('Kontrol.');
      return g;
    };
    const gec = async (g) => { c.clearSay(); await kaldir(c, g); };

    const g0 = bos(); yazi(c, g0, 500, 290, 'Tales, Öklid ve Pisagor', { size: 46, kalin: 700 }); gizle(g0);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, g0, 450));
    await gec(g0);

    const g1 = await kural(tales1, 'Paralel doğru, üçgenin iki kenarını aynı oranda böler.');
    c.note('<b>Tales:</b> DE // BC ise |AD|/|DB| = |AE|/|EC|', 'Teoremler', 'eb-d7-tales1');
    await gec(g1);

    const g2 = await kural(tales2, 'Paralel üç doğru, kesenlerde orantılı parçalar ayırır.');
    c.note('<b>Tales:</b> |AB|/|BC| = |DE|/|EF|', 'Teoremler', 'eb-d7-tales2');
    await gec(g2);

    const g3 = await kural(oklidH, 'Dik üçgende yüksekliğin karesi, iki parçanın çarpımıdır.');
    c.note('<b>Öklid:</b> h² = p·k', 'Teoremler', 'eb-d7-oklid1');
    await gec(g3);

    const g4 = await kural(oklidKenar, 'Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.');
    c.note('<b>Öklid:</b> c² = p·a, b² = k·a', 'Teoremler', 'eb-d7-oklid2');
    await gec(g4);

    const g5 = await kural(pisagor, 'Dik kenarların kareleri toplamı, hipotenüsün karesidir.');
    c.note('<b>Pisagor:</b> a² + b² = c²', 'Teoremler', 'eb-d7-pisagor');
    await gec(g5);

    const g6 = await kural(mentese, 'Geniş açıda karşı kenarın karesi toplamı aşar; dar açıda altında kalır.');
    c.note('<b>Karşı kenar:</b> geniş açıda c² > a² + b²; dar açıda c² < a² + b².', 'Teoremler', 'eb-d7-karsi');
    await gec(g6);

    const g7 = bos();
    await par(c.say('Hepsi benzer üçgenlerden çıkar.'), kapanis(c, g7));
    c.note('<b>Teoremler:</b> hepsi benzer üçgenlerden çıkar.', 'Teoremler', 'eb-d7-benzer');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-d7', kicker: 'Konu D · Tales, Öklid ve Pisagor teoremleri', title: 'Konu tekrarı: Tales, Öklid ve Pisagor teoremleri', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Tales, Öklid ve Pisagor teoremleri',
      hook: 'Altı dersin kuralları aklında mı? Önce kuralları topla, sonra <b>dokuz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Tales, Öklid ve Pisagor teoremlerini hatırlar.', 'Teoremleri karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      {
        q: 'ABC üçgeninde D noktası AB üzerinde, E noktası AC üzerindedir ve DE // BC. |AD| = 6 cm, |DB| = 3 cm ve |AE| = 8 cm ise |EC| kaç cm’dir?',
        options: ['16 cm', '4 cm', '3 cm'], answer: 1,
        why: ['16, 6 × 8 ÷ 3’tür; oran ters kurulmuştur. Doğru oran: 6/3 = 8/|EC|.', 'DE // BC olduğundan |AD|/|DB| = |AE|/|EC|. 6/3 = 8/|EC| için |EC| = 4 cm.', 'Paralel doğru kenarları aynı oranda böler, aynı uzunlukta değil; |EC| = |DB| olmak zorunda değildir.'], scene: 0,
      },
      {
        q: 'Üç paralel doğru, bir kesende A, B, C noktalarını, ötekinde D, E, F noktalarını (aynı sırayla) belirliyor. |AB| = 4 cm, |BC| = 10 cm ve |DE| = 6 cm ise |EF| kaç cm’dir?',
        options: ['15 cm', '10 cm', '2,4 cm'], answer: 0,
        why: ['Paralel üç doğru kesenlerde orantılı parçalar ayırır: 4/10 = 6/|EF| için |EF| = 15 cm.', '|EF| = |BC| diyemezsin; iki kesende parçalar aynı oranda büyür, eşit olmak zorunda değildir.', '2,4, 4 × 6 ÷ 10’dur; oran ters kurulmuştur. Doğru oran: 4/10 = 6/|EF|.'], scene: 0,
      },
      {
        q: 'Bir dik üçgende hipotenüse inen yükseklik, hipotenüsü 3 cm ve 12 cm’lik parçalara ayırıyor. Yüksekliği kaç cm’dir?',
        options: ['36 cm', '7,5 cm', '6 cm'], answer: 2,
        why: ['h² = 3 × 12 = 36’dır; 36, yüksekliğin karesidir, kendisi değil.', '7,5, iki parçanın ortalamasıdır; yükseklik ortalamayla değil h² = p·k ile bulunur.', 'h² = p·k = 3 × 12 = 36 olduğundan h = 6 cm.'], scene: 0,
      },
      {
        q: 'BAC dik üçgeninde A açısı diktir, AH ⊥ BC ve H noktası BC üzerindedir. |BH| = 2 cm ve |BC| = 18 cm ise |AB| kaç cm’dir?',
        options: ['16 cm', '6 cm', '36 cm'], answer: 1,
        why: ['16, 18 − 2’dir; bu |HC| uzunluğudur, |AB| değil.', 'c² = p·a = 2 × 18 = 36 olduğundan |AB| = 6 cm.', 'c² = 36’dır; 36, kenarın karesidir, kendisi değil.'], scene: 0,
      },
      {
        q: 'Dik kenarları 8 cm ve 15 cm olan dik üçgenin hipotenüsü kaç cm’dir?',
        options: ['17 cm', '23 cm', '120 cm'], answer: 0,
        why: ['8² + 15² = 64 + 225 = 289 olduğundan hipotenüs 17 cm.', '23, 8 + 15’tir; uzunluklar toplanmaz, kareler toplanır.', '120, 8 × 15’tir; Pisagor çarpım değil, kareler toplamıdır.'], scene: 0,
      },
      {
        q: '25 m’lik bir tel, bir direğin tepesinden yerde direğin ayağından 7 m uzaktaki bir noktaya gerilmiştir. Direk yere dik olduğuna göre kaç metre yüksekliktedir?',
        options: ['18 m', '32 m', '24 m'], answer: 2,
        why: ['18, 25 − 7’dir; kenar uzunlukları çıkarılmaz, kareler çıkarılır.', '32, 25 + 7’dir; tel en uzun kenardır, direk ondan kısa olmalıdır.', 'Tel hipotenüstür: yükseklik² = 25² − 7² = 625 − 49 = 576, yükseklik 24 m.'], scene: 0,
      },
      {
        q: 'İki kenarı 5 cm ve 7 cm, bu kenarların arasındaki açı 95° olan üçgende karşı kenarın karesi 74 ile nasıl karşılaştırılır?',
        options: ['74’ten büyük', '74’e eşit', '74’ten küçük'], answer: 0,
        why: ['95° geniş açıdır; karşı kenarın karesi 5² + 7² = 74’ten büyüktür.', 'Eşitlik yalnızca açı 90° iken olur; burada açı 95°’dir.', 'Küçük olması dar açıda olurdu; 95° geniş açıdır.'], scene: 0,
      },
      {
        q: 'AB // CD’dir. AC ve BD doğruları H noktasında kesişiyor; H, A ile C arasında ve B ile D arasındadır. |AB| = 8 cm, |BH| = 10 cm ve |HD| = 5 cm ise |CD| kaç cm’dir?',
        options: ['3 cm', '4 cm', '16 cm'], answer: 1,
        why: ['3, 8 − 5’tir; uzunluklar çıkarılarak değil benzerlik oranıyla bulunur.', 'HAB ile HDC üçgenleri benzerdir: 8/|CD| = 10/5 = 2 olduğundan |CD| = 4 cm.', '16, 8 × 10 ÷ 5’tir; oran ters kurulmuştur. Doğru oran: 8/|CD| = 10/5.'], scene: 0,
      },
      {
        q: 'a² + b² = c² eşitliği hangi durumda yazılabilir?',
        options: ['Her üçgende, c en uzun kenarsa', 'Açısı 60° olan her üçgende', 'Dik üçgende, c dik açının karşısındaki kenarsa'], answer: 2,
        why: ['En uzun kenar olması yetmez; dik olmayan üçgende c², a² + b²’den farklıdır.', 'Bir açının 60° olması eşitliği vermez; eşitlik dik açıya bağlıdır.', 'Pisagor yalnızca dik üçgende geçerlidir ve c hipotenüs, yani dik açının karşısındaki kenardır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Paralel, dik ve karşı kenar: hepsi benzer üçgenlerden çıkar.</b>',
      'Tales: paralel doğru kenarları aynı oranda böler; paralel üç doğru kesenlerde orantılı parçalar ayırır.',
      'Öklid: h² = p·k; dik kenarın karesi hipotenüs çarpı kendi parçasıdır.',
      'Pisagor: a² + b² = c²; geniş açıda c² > a² + b², dar açıda c² < a² + b².',
    ],
  });
})();
