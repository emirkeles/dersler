/* C4 — Konu tekrarı: Doğrulamayı sınamak ve kullanmak
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, gizle, belir, par } = window.KIT;

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const sil = (...els) => belir(c, els.flat(), 300, 0);

    // İspatı başka türde bir üçgende sına (C1)
    const g1 = c.S('g', {}, svg);
    yazi(c, g1, 500, 190, 'Her adımı başka türde bir üçgende kontrol et', { size: 32, kalin: 700 });
    yazi(c, g1, 500, 290, 'dik üçgen: adımlar tutuyor', { size: 30, kalin: 600, renk: RENK.iyi });
    yazi(c, g1, 500, 360, 'dik olmayan üçgen: dikdörtgen çıkmadı', { size: 30, kalin: 600, renk: RENK.kotu });
    gizle(g1);
    await par(c.say('Bir ispat, her üçgende geçerli olmalı.'), belir(c, g1, 400));
    await c.say('Sınamak için adımları başka türde bir üçgende dene.');
    c.note('<b>Değerlendir:</b> adımları başka türde bir üçgende tek tek kontrol et.', 'İspatı sınamak', 'gs-degerlendir');
    await sil(g1);

    // Özel üçgene dayanan adım genellemeyi taşımaz (C1)
    const g2 = c.S('g', {}, svg);
    yazi(c, g2, 500, 190, 'Eşkenar üçgende her açı 60°', { size: 32, kalin: 700 });
    yazi(c, g2, 500, 280, '3 · 60° = 180°', { size: 36, kalin: 700 });
    yazi(c, g2, 500, 380, 'yalnızca eşkenar üçgen için geçerli', { size: 30, kalin: 600, renk: RENK.kotu });
    gizle(g2);
    await par(c.say('Özel üçgenin özelliğine dayanan adım, genellemeyi taşımaz.'), belir(c, g2, 400));
    await c.say('Böyle bir ispat yalnızca o tür üçgen için geçerlidir.');
    c.note('<b>Özel üçgenin özelliğine dayanan adım</b> yalnızca o tür için geçerlidir.<br>Eşkenar: 3 · 60° = 180°', 'Özel üçgen', 'gs-ozel-ucgen');
    await sil(g2);

    // İçe dönük köşe (C2): bumerang biçimli dörtgen
    const g3 = c.S('g', {}, svg);
    const A = [500, 70], B = [280, 360], C = [720, 360], D = [500, 230];
    c.S('polygon', { points: [A, B, D, C].map((q) => q.join(',')).join(' '), fill: 'rgba(110,168,255,.07)', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g3);
    yazi(c, g3, 500, 148, 'a', { size: 28, kalin: 700, renk: RENK.A });
    yazi(c, g3, 347, 308, 'b', { size: 28, kalin: 700, renk: RENK.B });
    yazi(c, g3, 653, 308, 'c', { size: 28, kalin: 700, renk: RENK.C });
    yazi(c, g3, 500, 296, 'x', { size: 28, kalin: 700, renk: RENK.dis });
    yazi(c, g3, 500, 450, 'x = a + b + c', { size: 36, kalin: 700 });
    yazi(c, g3, 500, 510, '50° + 30° + 25° = 105°', { size: 30, kalin: 600, renk: RENK.soluk });
    gizle(g3);
    await par(c.say('Yeni şekilde tanıdık üçgeni ara.'), belir(c, g3, 400));
    await c.say('İçe dönük köşede x, a + b + c eder.', { speak: 'İçe dönük köşede x, a artı b artı c eder.' });
    await c.say('Dış açı önermesini iki kez kullandık; bu bir ispattır.');
    c.note('<b>x = a + b + c</b><br>50° + 30° + 25° = 105°', 'İçe dönük köşe', 'gs-ice-donuk');
    await sil(g3);

    // İç nokta: ölçerek doğrulama (C2)
    const g4 = c.S('g', {}, svg);
    yazi(c, g4, 500, 190, '|DB| + |DC| < |AB| + |AC|', { size: 38, kalin: 700 });
    yazi(c, g4, 500, 290, 'çok noktada ölçtük: hep tuttu', { size: 30, kalin: 600, renk: RENK.A });
    yazi(c, g4, 500, 380, 'ölçmek ispat değil, doğrulama', { size: 30, kalin: 600, renk: RENK.dis });
    gizle(g4);
    await par(c.say('Birçok noktada ölçtük, önerme hep tuttu.'), belir(c, g4, 400));
    await c.say('Ölçmek doğrulamadır, ispat değil.');
    c.note('<b>|DB| + |DC| &lt; |AB| + |AC|</b><br>D içeride; ölçerek doğrulandı.', 'İç nokta', 'gs-ic-nokta');
    await sil(g4);

    // Hangi önerme? (C3)
    const g5 = c.S('g', {}, svg);
    yazi(c, g5, 500, 170, 'Verilene bak, önermeyi seç', { size: 34, kalin: 700 });
    yazi(c, g5, 500, 270, 'açılar verilmiş: iç ya da dış açı önermesi', { size: 28, kalin: 600, renk: RENK.A });
    yazi(c, g5, 500, 350, 'kenarlar verilmiş: sıralama ya da üçgen eşitsizliği', { size: 28, kalin: 600, renk: RENK.B });
    gizle(g5);
    await par(c.say('Önce verilene bak, sonra önermeyi seç.'), belir(c, g5, 400));
    await c.say('Açılar verilmişse iç açılar toplamı ya da dış açı önermesi.');
    await c.say('Kenarlar verilmişse sıralama ya da üçgen eşitsizliği.');
    c.note('Verilene bak, önermeyi seç:<br>açılar → 180° · çubuklar → üçgen eşitsizliği', 'Hangi önerme?', 'gs-hangi-onerme');
    await sil(g5);

    // İspatlı bilgi ölçmeden sonuç verir (C3)
    const g6 = c.S('g', {}, svg);
    yazi(c, g6, 500, 170, 'İspatlı bilgi ölçmeden de sonuç verir', { size: 34, kalin: 700 });
    yazi(c, g6, 500, 270, 'iki açı 65° ve 50° ise üçüncüsü:', { size: 30, kalin: 600 });
    yazi(c, g6, 500, 350, '180° − 65° − 50° = 65°', { size: 36, kalin: 700, renk: RENK.iyi });
    yazi(c, g6, 500, 440, 'hiçbir açıyı ölçmedik', { size: 28, kalin: 600, renk: RENK.soluk });
    gizle(g6);
    await par(c.say('İspatlı bilgi, ölçmeden de sonuç verir.'), belir(c, g6, 400));
    await c.say('Çok adımlı soruda her adım tek bir önermedir.');
    c.note('<b>İspatlı bilgi</b> ölçmeden de sonuç verir.<br>Çok adımlı soruda her adım tek bir önerme.', 'İspatlı bilgi', 'gs-ispatli-bilgi');
    await c.say('Şimdi üç dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'geometrik-sekiller-c4', kicker: 'Konu C · Doğrulamayı sınamak ve kullanmak', title: 'Konu tekrarı', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Doğrulamayı sınamak ve kullanmak',
      hook: 'Üç dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Üç dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'İkizkenar bir üçgenin bir taban açısı 50°. Tepe köşesindeki dış açı kaç derecedir?',
        options: ['80°', '100°', '130°'], answer: 1,
        why: ['80° tepe köşesindeki iç açıdır; dış açı onu 180°’ye tamamlar.', 'Tepe açısı 180° − 50° − 50° = 80°; dış açı 180° − 80° = 100° (50° + 50°).', '130° bir taban köşesindeki dış açıdır, tepe köşesindeki değil.'], scene: 0,
      },
      {
        q: 'Bir öğrenci şöyle yazdı: “İkizkenar üçgende taban açıları eşit; demek ki her üçgenin iki açısı eşittir.” Bu akıl yürütmedeki hata nedir?',
        options: ['İkizkenar üçgene özgü bir özelliği bütün üçgenlere genelliyor.', 'İkizkenar üçgenin taban açıları eşit değildir.', 'Üçgenlerde açılar hiç kıyaslanamaz.'], answer: 0,
        why: ['Eşit kenarlı üçgenin özelliği yalnızca o tür için geçerlidir; kenarları farklı üçgende açılar da farklıdır.', 'Eşit kenarların karşısındaki açılar eşittir; hata sonuçtadır, bu cümlede değil.', 'Açılar kıyaslanır: en uzun kenarın karşısı en büyük açıdır.'], scene: 0,
      },
      {
        q: 'Bumerang biçimli bir tasarımda içe dönük köşedeki açı x = 96°. Öbür üç açı birbirine eşit. Her biri kaç derecedir?',
        options: ['48°', '96°', '32°'], answer: 2,
        why: ['96° ikiye bölünmez; eşit üç açı var.', '96° x’in kendisidir, üç açının toplamıdır.', 'x = a + b + c ve üç açı eşit: 96° : 3 = 32°.'], scene: 0,
      },
      {
        q: 'Kenarları 7 cm, 8 cm ve 12 cm olan üçgenin en küçük açısı hangi kenarın karşısındadır?',
        options: ['7 cm’lik', '8 cm’lik', '12 cm’lik'], answer: 0,
        why: ['En kısa kenarın karşısı en küçük açıdır.', '8 cm ortancadır; karşısındaki açı da ortancadır.', '12 cm en uzun kenardır; karşısındaki açı en büyüktür.'], scene: 0,
      },
      {
        q: 'ABC üçgeninin içinde bir D noktası var ve |AB| + |AC| = 17 cm. |DB| + |DC| için hangisi kesinlikle olamaz?',
        options: ['14 cm', '16 cm', '18 cm'], answer: 2,
        why: ['14, 17’den küçük; iç nokta önermesine aykırı değil.', '16 da 17’den küçük; önermeye aykırı değil.', 'İçteki toplam 17’den küçük kalır; 18 bu önermeye aykırı.'], scene: 0,
      },
      {
        q: 'Bir ispatın ilk adımı “iki eş üçgeni birleştirince dikdörtgen olur” diyor. Bu adım hangi üçgenlerde tutar?',
        options: ['Bütün üçgenlerde', 'Yalnızca dik üçgenlerde', 'Yalnızca geniş açılı üçgenlerde'], answer: 1,
        why: ['Dik olmayan üçgenlerde birleşen şekil paralelkenar olur.', 'Dik üçgenlerde dört köşe de 90° olur; şekil dikdörtgendir.', 'Geniş açılı üçgende köşeler 90° olmaz; şekil dikdörtgen değildir.'], scene: 0,
      },
      {
        q: 'İçe dönük köşeli bir dörtgende a = 55°; b ve c de sıfırdan büyük birer açı. x için hangisi doğrudur?',
        options: ['x, 55°’den büyüktür.', 'x, 55°’ye eşittir.', 'x, 55°’den küçüktür.'], answer: 0,
        why: ['x = a + b + c: 55°’nin üstüne b ve c eklenir.', 'b ve c sıfır olsaydı eşit olurdu; ikisi de sıfırdan büyük.', 'x, a’ya iki açı eklenerek bulunur; a’dan küçük olamaz.'], scene: 0,
      },
      {
        q: 'Bir üçgenin iki dış açısı 150° ve 100°. Üçüncü dış açı kaç derecedir?',
        options: ['70°', '80°', '110°'], answer: 2,
        why: ['70°, iki açının toplamından 180° çıkarılınca bulunur; oysa dış açılar 360°’ye tamamlanır.', '80°, 100°’lik dış açının komşu iç açısıdır.', 'Dış açılar toplamı 360°: 360° − 150° − 100° = 110°.'], scene: 0,
      },
    ],
    summary: [
      '<b>İspat, çizdiğin üçgene değil her üçgene uymalı</b>; adımlar başka türde bir üçgende denenir.',
      'Yeni şekilde tanıdık üçgeni ara: içe dönük köşede <b>x = a + b + c</b>.',
      'Ölçerek yapılan çalışma <b>doğrulamadır</b>, ispat değil.',
      'Verilene bak, önermeyi seç; <b>ispatlı bilgi</b> ölçmeden de sonuç verir.',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
