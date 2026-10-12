/* A3 — Konu tekrarı: İç enerji, ısı, sıcaklık
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/A-ic-enerji-isi-sicaklik.md (A3). Çizimler şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, kutu, gizle, belir, par, ok } = window.KIT;
  const { motor, pencere, termometre, cubuk } = window.KIT_A;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, ic: RENK.icEnerji };
  const ust = 20, alt = 290;               // iki satırın üst kenarı
  const X = [170, 500, 830];               // üç sütunun ortası

  /* Kuralın kısa etiketi: renkli ad ve altında tek satır (tam cümle altyazıda ve defterde). */
  function etiket(c, g, cx, y0, ad, renk, alt2) {
    yazi(c, g, cx, y0 + 198, ad, { size: 30, kalin: 700, renk });
    yazi(c, g, cx, y0 + 230, alt2, { size: 24, kalin: 600 });
  }

  /* ---- 1. Sıcaklık: ortalama hareket enerjisi (yavaş ve hızlı titreşen tanecikler) ---- */
  function sicaklik(c, g, mot) {
    const cx = X[0], cy = ust + 90;
    pencere(c, g, mot, { cx: cx - 75, cy, r: 62, n: 3, T: 20, tohum: 3 });
    pencere(c, g, mot, { cx: cx + 75, cy, r: 62, n: 3, T: 80, tohum: 5 });
    etiket(c, g, cx, ust, 'sıcaklık', S.sicaklik, 'ortalama hareket');
  }

  /* ---- 2. İç enerji: bütün taneciklerin toplamı (dolu pencere ve mor çubuk) ---- */
  function icEnerji(c, g, mot) {
    const cx = X[1], cy = ust + 90;
    pencere(c, g, mot, { cx: cx - 85, cy, r: 70, n: 9, T: 40, tohum: 7 });
    const cb = cubuk(c, g, { x: cx + 15, y: cy, boy: 130 });
    etiket(c, g, cx, ust, 'iç enerji', S.ic, 'toplam enerji');
    return cb;
  }

  /* ---- 3. Isı: iki cisim arasında aktarılan enerji ---- */
  function isi(c, g) {
    const cx = X[2], y = ust + 40;
    kutu(c, g, cx - 150, y, 90, 100, { rx: 14 });
    kutu(c, g, cx + 60, y, 90, 100, { rx: 14 });
    ok(c, g, [cx - 48, y + 50], [cx + 48, y + 50], S.isi, 7);
    etiket(c, g, cx, ust, 'ısı', S.isi, 'aktarılan enerji');
  }

  /* ---- 4. Isı sıcaktan soğuğa: sıcak ve soğuk cisim, ok sıcaktan soğuğa ---- */
  function yon(c, g) {
    const cx = X[0], y = alt + 25;
    const sicak = kutu(c, g, cx - 150, y, 100, 125, { rx: 14, dolgu: S.sicaklik, renk: S.sicaklik });
    const soguk = kutu(c, g, cx + 50, y, 100, 125, { rx: 14, dolgu: RENK.soguk, renk: RENK.soguk });
    sicak.setAttribute('fill-opacity', 0.28); soguk.setAttribute('fill-opacity', 0.28);
    termometre(c, g, { x: cx - 100, y: y + 112, h: 92, T: 80 });
    termometre(c, g, { x: cx + 100, y: y + 112, h: 92, T: 20 });
    ok(c, g, [cx - 40, y + 62], [cx + 40, y + 62], S.isi, 7);
    etiket(c, g, cx, alt, 'ısı', S.isi, 'sıcaktan soğuğa');
  }

  /* ---- 5. İç enerji büyür: madde miktarı ve sıcaklık arttıkça (boyu büyüyen iki mor çubuk) ---- */
  function buyur(c, g) {
    const cx = X[1];
    const a = cubuk(c, g, { x: cx - 25, y: alt + 55, boy: 40, etiket: 'miktar' });
    const b = cubuk(c, g, { x: cx - 25, y: alt + 115, boy: 40, etiket: 'sıcaklık' });
    etiket(c, g, cx, alt, 'iç enerji', S.ic, 'büyür');
    return { a, b };
  }

  /* ---- 6. Isı alan artar, veren azalır (ok alana doğru; alanda çubuk uzar, verende kısalır) ---- */
  function alisVeris(c, g) {
    const cx = X[2], y = alt + 15;
    kutu(c, g, cx - 150, y, 100, 80, { rx: 14 });
    kutu(c, g, cx + 50, y, 100, 80, { rx: 14 });
    ok(c, g, [cx - 40, y + 40], [cx + 40, y + 40], S.isi, 7);
    const veren = cubuk(c, g, { x: cx - 150, y: y + 118, boy: 100 });
    const alan = cubuk(c, g, { x: cx + 50, y: y + 118, boy: 45 });
    etiket(c, g, cx, alt, 'iç enerji', S.ic, 'alan artar, veren azalır');
    return { veren, alan };
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const mot = motor(c);
    const onceki = [];
    const kural = async (yap, cumle, hareket) => {
      const g = c.S('g', {}, svg); const r = yap(c, g, mot); gizle(g);
      c.clearSay();
      await par(c.say(cumle), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)), hareket ? hareket(r) : null);
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'İç enerji, ısı, sıcaklık', { size: 64, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(sicaklik, 'Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.');
    c.note('Ortalama hareket enerjisinin göstergesi.', 'Sıcaklık', 'en-a3-sicaklik');
    await kural(icEnerji, 'İç enerji, bütün taneciklerin toplam enerjisidir.');
    c.note('Bütün taneciklerin toplam enerjisi.', 'İç enerji', 'en-a3-ic');
    await kural(isi, 'Isı, sıcaklık farkı yüzünden aktarılan enerjidir.');
    c.note('Sıcaklık farkıyla aktarılan enerji.', 'Isı', 'en-a3-isi');
    await kural(yon, 'Isı hep sıcak olandan soğuk olana aktarılır.');
    c.note('Hep sıcaktan soğuğa aktarılır.', 'Isının yönü', 'en-a3-yon');
    await kural(buyur, 'İç enerji, madde miktarı ve sıcaklık arttıkça büyür.', (r) => par(r.a.git(c, 130, 400), r.b.git(c, 130, 400)));
    c.note('Madde miktarı ve sıcaklık arttıkça büyür.', 'İç enerji büyür', 'en-a3-buyur');
    await kural(alisVeris, 'Isı alan maddenin iç enerjisi artar, verenin azalır.', (r) => par(r.veren.git(c, 45, 400), r.alan.git(c, 100, 400)));
    c.note('Alanın iç enerjisi artar, verenin azalır.', 'Isı alıp vermek', 'en-a3-alis');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-a3', kicker: 'Konu A · İç enerji, ısı, sıcaklık', title: 'Konu tekrarı: İç enerji, ısı, sıcaklık', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: İç enerji, ısı, sıcaklık',
      hook: 'Üç kavramın kuralları aklında mı? Önce altı kuralı topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Kışın dışarıdan gelen Ela ellerini kalorifer peteğine yaklaştırıyor. Hangisi doğrudur?',
        options: ['Ellerden peteğe soğukluk aktarılır', 'Petekten ellere ısı aktarılır; ellerin iç enerjisi artar', 'Peteğin ısısı ellerin ısısından büyüktür'], answer: 1,
        why: ['Soğukluk diye aktarılan bir şey yoktur; aktarılan enerji ısıdır ve sıcaktan soğuğa gider.', 'Petek ellerden sıcaktır; ısı petekten ellere aktarılır ve ısı alan ellerin iç enerjisi artar.', 'Bir cismin ısısı olmaz; ısı yalnızca aktarılırken vardır.'], scene: 0,
      },
      {
        q: 'Bir haberde “Bugün ölçülen en yüksek ısı 41 derece” yazıyor. Doğrusu hangisidir?',
        options: ['En yüksek sıcaklık 41 derece', 'En yüksek iç enerji 41 derece', 'Cümle doğrudur'], answer: 0,
        why: ['Termometreyle dereceyle ölçülen değer sıcaklıktır.', 'İç enerji toplam enerjidir; dereceyle söylenmez.', 'Dereceyle söylenen şey sıcaklıktır, ısı değildir; cümle bu yüzden yanlıştır.'], scene: 0,
      },
      {
        q: 'Aynı miktarda iki sudan birinin tanecikleri daha hızlı hareket ediyor. Bu su için ne söylenir?',
        options: ['Yalnızca sıcaklığı daha büyüktür; iç enerjiler eşittir', 'Isısı daha büyüktür', 'Sıcaklığı ve iç enerjisi daha büyüktür'], answer: 2,
        why: ['Madde miktarı aynıyken hareket arttıkça iç enerji de artar; iç enerjiler eşit olmaz.', 'Bir maddenin ısısı olmaz; hızlı hareket sıcaklığı ve iç enerjiyi büyütür.', 'Tanecik sayısı aynı, hareket daha hızlı olduğundan hem sıcaklık hem iç enerji daha büyüktür.'], scene: 0,
      },
      {
        q: 'Bir havuzdaki su ile o havuzdan doldurulan bir kova su için hangisi doğrudur?',
        options: ['İç enerjileri aynı, havuzun sıcaklığı büyüktür', 'Sıcaklıkları aynı, havuzun iç enerjisi büyüktür', 'Sıcaklıkları da iç enerjileri de aynıdır'], answer: 1,
        why: ['Aynı sudan alındıkları için sıcaklıkları aynıdır; havuzda madde çok daha fazladır.', 'Sıcaklık aynıdır ama havuzda çok daha fazla tanecik vardır; toplam enerji, yani iç enerji daha büyüktür.', 'Sıcaklıklar aynı olsa da iç enerji madde miktarına bağlıdır; havuzunki çok daha büyüktür.'], scene: 0,
      },
      {
        q: 'Üç kapta su var: X 400 g · 30 °C, Y 400 g · 50 °C, Z 250 g · 30 °C. İç enerjilerin sıralaması hangisidir?',
        options: ['X > Y > Z', 'Z > X > Y', 'Y > X > Z'], answer: 2,
        why: ['X ile Y’nin miktarı eşittir ama Y daha sıcaktır; Y, X’ten büyüktür.', 'Z’nin miktarı en azdır ve sıcaklığı X ile aynıdır; iç enerjisi en küçüktür.', 'Y, X ile aynı miktarda ama daha sıcaktır; X de Z ile aynı sıcaklıkta ama daha çoktur. Sıralama Y > X > Z olur.'], scene: 0,
      },
      {
        q: 'Dondurmayı tutan el üşüyor. Bunun nedeni hangisidir?',
        options: ['Elden dondurmaya ısı aktarılır', 'Dondurmadan ele soğukluk aktarılır', 'Dondurmanın iç enerjisi yoktur'], answer: 0,
        why: ['El dondurmadan sıcaktır; ısı elden dondurmaya aktarılır ve elin iç enerjisi azalır.', 'Soğukluk diye aktarılan bir şey yoktur; aktarılan enerji ısıdır.', 'Dondurmanın da tanecikleri vardır; her maddenin bir iç enerjisi vardır.'], scene: 0,
      },
      {
        q: 'Ütü prizden çekilip odada bırakılıyor. Bir süre boyunca ne olur?',
        options: ['Ütü ısı alır; iç enerjisi artar', 'Ütü ısı verir; iç enerjisi azalır', 'Odanın iç enerjisi azalır'], answer: 1,
        why: ['Ütü odadan sıcaktır; ısı alan değil, ısı veren taraftır.', 'Ütü odadan sıcaktır; ısı verir ve iç enerjisi azalır.', 'Odayı ısı alan taraf olur; odanın iç enerjisi artar.'], scene: 0,
      },
      {
        q: 'Hangisi bir maddenin içinde bulunmaz, yalnızca aktarılırken vardır?',
        options: ['İç enerji', 'Taneciklerin hareket enerjisi', 'Isı'], answer: 2,
        why: ['Her maddenin içinde bir iç enerji bulunur.', 'Tanecikler hareket eder; bu enerji maddenin içindedir.', 'Isı, sıcaklık farkı yüzünden aktarılan enerjidir; yalnızca aktarılırken vardır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Isı sıcaktan soğuğa aktarılır; alanın iç enerjisi artar, verenin azalır.</b>',
      'Sıcaklık, ortalama hareket enerjisinin göstergesidir; iç enerji, toplam enerjidir.',
      'İç enerji, madde miktarı ve sıcaklık arttıkça büyür.',
    ],
  });
})();
