/* B5 — Konu tekrarı: Kenarlar ve açılar
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, gizle, belir, par, tepe, ucgen, kenarlar, cubuklar } = window.KIT;

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const sil = (...els) => belir(c, els.flat(), 300, 0);

    // En uzun kenarın karşısı en büyük açı (B1)
    const g1 = c.S('g', {}, svg);
    const B = [300, 400], C = [700, 400], A = tepe(B, C, 60, 40);
    ucgen(c, g1, A, B, C, { olcu: ['80°', '60°', '40°'] });
    const k = kenarlar(c, g1, A, B, C); k.yaz(['a', 'b', 'c']);
    const kural = yazi(c, g1, 500, 500, 'En uzun kenarın karşısı en büyük açı', { size: 30, kalin: 700 });
    gizle(g1);
    await par(c.say('Bir açının karşısındaki kenar, o köşeye değmeyen kenardır.'), belir(c, g1, 400));
    k.kalin(0, 10);
    await c.say('En uzun kenarın karşısındaki açı en büyüktür.');
    c.note('En uzun kenarın karşısındaki açı <b>en büyüktür</b>.<br>7, 8, 9 → 9’un karşısı', 'Kenar ve açı', 'gs-en-uzun-kenar');

    // Kenarların sırası, açıların sırası (B2): aynı üçgen kalır
    await sil(kural);
    k.kalin(0, 5);
    kural.textContent = 'a > b > c ise A > B > C';
    await par(c.say('Kenarların sırası, karşılarındaki açıların sırasıdır.'), belir(c, kural, 400));
    await c.say('Tersi de doğru: açıların sırası kenarların sırasını verir.');
    c.note('<b>a &gt; b &gt; c ise A &gt; B &gt; C</b><br>Tersi de doğru.', 'Kenar sırası, açı sırası', 'gs-kenar-aci-sirasi');
    await sil(g1);

    // Eşit kenar, eşit açı (B2)
    const g3 = c.S('g', {}, svg);
    const B3 = [380, 420], C3 = [620, 420], A3 = tepe(B3, C3, 70, 70);
    ucgen(c, g3, A3, B3, C3, { olcu: ['40°', '70°', '70°'], renkler: [RENK.A, RENK.dis, RENK.dis] });
    cizgi(c, g3, A3, B3, RENK.dis, 6); cizgi(c, g3, A3, C3, RENK.dis, 6);
    yazi(c, g3, 500, 510, 'Eşit kenarların karşısındaki açılar eşit', { size: 30, kalin: 700 });
    gizle(g3);
    await par(c.say('Eşit kenarların karşısındaki açılar eşittir.'), belir(c, g3, 400));
    await c.say('İkizkenarda taban açıları eşittir; eşkenarda her açı <b>60°</b>dir.', { speak: 'İkizkenarda taban açıları eşittir; eşkenarda her açı altmış derecedir.' });
    c.note('<b>Eşit kenarların karşısındaki açılar eşittir.</b><br>İkizkenar: 40°, 70°, 70°', 'Eşit kenar, eşit açı', 'gs-esit-kenar');
    await sil(g3);

    // Üçgen eşitsizliği (B3)
    const g4 = c.S('g', {}, svg);
    yazi(c, g4, 500, 120, 'Her kenar, öbür ikisinin toplamından kısa', { size: 30, kalin: 700 });
    yazi(c, g4, 500, 190, '3 + 6 > 8', { size: 34, kalin: 700, renk: RENK.iyi });
    cubuklar(c, g4, 8, 3, 6, { y: 420 }).sonuc();
    gizle(g4);
    await par(c.say('Her kenar, öbür ikisinin toplamından kısadır.'), belir(c, g4, 400));
    await c.say('Toplam eşit çıkarsa düz çizgi olur, üçgen olmaz.');
    await c.say('Kısa yol: yalnızca en uzun kenarı kontrol et.');
    c.note('<b>Her kenar, öbür ikisinin toplamından kısadır.</b><br>3 + 4 &lt; 8: kurulmaz', 'Üçgen eşitsizliği', 'gs-ucgen-esitsizligi');
    await sil(g4);

    // Üçüncü kenarın aralığı (B4)
    const g5 = c.S('g', {}, svg);
    yazi(c, g5, 500, 200, '|b − c| < a < b + c', { size: 42, kalin: 700 });
    yazi(c, g5, 500, 290, '7 ve 11:  4 < a < 18', { size: 32, kalin: 600, renk: RENK.A });
    yazi(c, g5, 500, 360, 'uçlar dahil değil', { size: 26, kalin: 500, renk: RENK.soluk });
    gizle(g5);
    await par(c.say('Üçüncü kenar, farktan büyük, toplamdan küçüktür.'), belir(c, g5, 400));
    await c.say('Uçlar dahil değil: orada çubuklar tek çizgiye yatar.');
    c.note('<b>|b − c| &lt; a &lt; b + c</b><br>7 ve 11 → 4 &lt; a &lt; 18', 'Üçüncü kenar', 'gs-ucuncu-kenar');
    await sil(g5);

    // Ortak kenar (B4)
    const g6 = c.S('g', {}, svg);
    yazi(c, g6, 500, 180, 'bir üçgende:  2 < x < 14', { size: 30, kalin: 600, renk: RENK.A });
    yazi(c, g6, 500, 250, 'öbür üçgende:  5 < x < 21', { size: 30, kalin: 600, renk: RENK.B });
    yazi(c, g6, 500, 350, 'ortak kenar:  5 < x < 14', { size: 36, kalin: 700, renk: RENK.iyi });
    gizle(g6);
    await par(c.say('İki üçgenin ortak kenarı, iki aralığı birden sağlar.'), belir(c, g6, 400));
    c.note('<b>Ortak kenar</b>, iki aralığın kesişiminde kalır.<br>2 &lt; x &lt; 14 ve 5 &lt; x &lt; 21 → 5 &lt; x &lt; 14', 'Ortak kenar', 'gs-ortak-kenar');
    await c.say('Şimdi dört dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'geometrik-sekiller-b5', kicker: 'Konu B · Kenarlar ve açılar', title: 'Konu tekrarı', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Kenarlar ve açılar',
      hook: 'Dört dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Dört dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Kenarları 6, 6 ve 13 cm olan bir üçgen çizilebilir mi?',
        options: ['Evet; iki kenarı eşit, ikizkenar olur.', 'Hayır; 6 + 6, 13’ten küçük.', 'Evet; 6 + 13, 6’dan büyük.'], answer: 1,
        why: ['Kenarların eşit olması yetmez; önce toplam kontrol edilir.', 'İki kısa kenar birlikte en uzununa yetişmiyor.', 'Bu toplam her zaman tutar; en uzun kenara bakılır.'], scene: 0,
      },
      {
        q: 'Bir üçgenin açıları 35°, 60° ve 85°dir. En kısa kenar hangi açının karşısındadır?',
        options: ['35°', '60°', '85°'], answer: 0,
        why: ['En küçük açının karşısındaki kenar en kısadır.', '60° ortanca açıdır; karşısındaki kenar da ortancadır.', '85° en büyük açıdır; karşısındaki kenar en uzundur.'], scene: 0,
      },
      {
        q: 'İki kenarı 5 ve 9 olan üçgende üçüncü kenarın en küçük tam sayı değeri kaçtır?',
        options: ['4', '5', '14'], answer: 1,
        why: ['9 − 5 = 4 uçtur; orada üçgen kapanmaz.', '4 &lt; a &lt; 14: 4’ten büyük ilk tam sayı 5.', '14 toplamdır; aralığın öbür ucudur ve dahil değildir.'], scene: 0,
      },
      {
        q: 'Dik üçgende en uzun kenar hangi açının karşısındadır?',
        options: ['Dik açının', 'Küçük dar açının', 'Büyük dar açının'], answer: 0,
        why: ['Dik üçgende en büyük açı 90°dir; karşısında en uzun kenar durur.', 'En küçük açının karşısında en kısa kenar durur.', 'Dar açılar 90°’den küçüktür; en büyük açı onlar değil.'], scene: 0,
      },
      {
        q: 'Bir ABC üçgeninde A’daki açı 50°, B’deki açı 80°dir. Kenarlar için hangisi doğrudur?',
        options: ['a = b', 'b = c', 'a = c'], answer: 2,
        why: ['A 50°, B 80°: açılar farklı, karşılarındaki kenarlar da farklı.', 'B 80°, C 50°: açılar farklı, karşılarındaki kenarlar da farklı.', 'C’deki açı 180° − 50° − 80° = 50°: A ile C eşit, a ile c de eşit.'], scene: 0,
      },
      {
        q: 'Üç köyü birleştiren yollar dümdüz. A ile B arası 12 km, B ile C arası 7 km, A ile C arası 19 km. Köyler için ne söylenir?',
        options: ['Bir üçgenin köşelerindedirler.', 'Böyle üç köy olamaz.', 'Aynı doğru üzerindedirler.'], answer: 2,
        why: ['Üçgen için 12 + 7, 19’dan büyük olmalıydı.', 'Olabilir: B, A ile C’nin arasında durur.', '12 + 7 = 19: toplam eşit, üç nokta tek çizgiye dizilir.'], scene: 0,
      },
      {
        q: 'x iki üçgenin ortak kenarı. Birinde 3 &lt; x &lt; 11, öbüründe 6 &lt; x &lt; 15 bulundu. x hangi aralıktadır?',
        options: ['3 &lt; x &lt; 15', '6 &lt; x &lt; 11', '11 &lt; x &lt; 15'], answer: 1,
        why: ['x iki aralığı birden sağlamalı; 4 ikinci aralıkta yok.', 'İki aralığın ortak kısmı: 6’dan büyük, 11’den küçük.', 'Bu değerler ilk aralığın dışında kalır.'], scene: 0,
      },
      {
        q: 'Bir ABC üçgeninde a = 10, b = 10, c = 6. Açılar için hangisi doğrudur?',
        options: ['A = B &gt; C', 'A = B &lt; C', 'A &gt; B &gt; C'], answer: 0,
        why: ['a ile b eşit: A = B. En kısa kenar c: C en küçük açı.', 'c en kısa kenar; karşısındaki C en büyük olamaz.', 'a ile b eşit; karşılarındaki açılar da eşit olmalı.'], scene: 0,
      },
    ],
    summary: [
      '<b>Kenarların sırası, karşılarındaki açıların sırasıdır.</b> Eşit kenar, eşit açı.',
      '<b>Üçgen eşitsizliği:</b> her kenar, öbür ikisinin toplamından kısadır.',
      '<b>|b − c| &lt; a &lt; b + c</b>; uçlar dahil değil.',
      'Ortak kenar, iki aralığın <b>kesişiminde</b> kalır.',
    ],
    nextLesson: { href: 'c1-bu-ispat-her-ucgende-calisir-mi.html', label: 'Sonraki konu: Doğrulamayı sınamak ve kullanmak ›' },
  });
})();
