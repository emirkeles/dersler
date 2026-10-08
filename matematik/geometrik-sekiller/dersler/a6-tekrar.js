/* A6 — Konu tekrarı: Açılar ve ispat
   Yeni bilgi yok. Tek sahnede konunun beş kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/A-acilar-ve-ispat.md ("Pilot" bölümü, A6). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, gizle, belir, par, ucgen, disAci } = window.KIT;

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const sil = (...els) => belir(c, els.flat(), 300, 0);

    // Doğrulama ve ispat (A1)
    const g1 = c.S('g', {}, svg);
    kutu(c, g1, 90, 170, 380, 200); kutu(c, g1, 530, 170, 380, 200, { renk: RENK.iyi });
    yazi(c, g1, 280, 262, 'Doğrulama', { size: 32, kalin: 700 });
    yazi(c, g1, 280, 314, 'denenen örnekler', { size: 24, kalin: 500, renk: RENK.soluk });
    yazi(c, g1, 720, 262, 'İspat', { size: 32, kalin: 700, renk: RENK.iyi });
    yazi(c, g1, 720, 314, 'bütün üçgenler', { size: 24, kalin: 500, renk: RENK.soluk });
    gizle(g1);
    await par(c.say('Ölçmek doğrular, ama yalnızca denenen üçgenleri kapsar.', { speak: '[thoughtful] Ölçmek doğrular, ama yalnızca denenen üçgenleri kapsar.' }), belir(c, g1, 400));
    await c.say('İspat ise bütün üçgenleri birden kapsar.');
    c.note('<b>Doğrulama:</b> denenen örnekler.<br><b>İspat:</b> bütün üçgenler.', 'Doğrulama ve ispat', 'gs-dogrulama-ispat');
    await sil(g1);

    // İspat doğru bilgilere dayanır; en altta aksiyomlar (A2)
    const g2 = c.S('g', {}, svg);
    kutu(c, g2, 330, 110, 340, 80, { renk: RENK.iyi });
    yazi(c, g2, 500, 160, 'ispatlanan bilgi', { size: 26, kalin: 700, renk: RENK.iyi });
    kutu(c, g2, 250, 230, 500, 80);
    yazi(c, g2, 500, 280, 'dayandığı doğru bilgiler', { size: 26, kalin: 600 });
    kutu(c, g2, 170, 350, 660, 80, { renk: RENK.dis });
    yazi(c, g2, 500, 400, 'aksiyomlar: ispatsız kabul edilir', { size: 26, kalin: 700, renk: RENK.dis });
    gizle(g2);
    await par(c.say('Her ispat, doğruluğundan emin olunan bilgilere dayanır.'), belir(c, g2, 400));
    await c.say('En altta, ispatsız kabul edilen aksiyomlar durur.');
    c.note('<b>Aksiyom:</b> ispatsız kabul edilen temel bilgi.<br>İki noktadan bir doğru geçer.', 'Aksiyom', 'gs-aksiyom');
    await sil(g2);

    // İç açılar toplamı (A3)
    const A = [470, 120], B = [300, 360], C = [640, 360];
    const u = ucgen(c, svg, A, B, C, { olcu: ['α', 'β', 'γ'] });
    const kural = yazi(c, svg, 500, 500, 'α + β + γ = 180°', { size: 34, kalin: 700 });
    gizle(u.g, kural);
    await par(c.say('Her üçgende iç açıların toplamı <b>180°</b>dir.', { speak: 'Her üçgende iç açıların toplamı yüz seksen derecedir.' }), belir(c, [u.g, kural], 400));
    c.note('<b>α + β + γ = 180°</b><br>Her üçgende geçerli.', 'İç açılar toplamı', 'gs-ic-acilar');

    // Dış açılar toplamı (A4): her köşeden birer dış açı
    const dA = disAci(c, svg, A, C, B), dB = disAci(c, svg, B, A, C), dC = disAci(c, svg, C, B, A);
    gizle(dA.g, dB.g, dC.g);
    await sil(kural);
    kural.textContent = 'dış açılar toplamı = 360°';
    await par(c.say('Her köşeden birer dış açı alınır; toplamları <b>360°</b>dir.', { speak: 'Her köşeden birer dış açı alınır; toplamları üç yüz altmış derecedir.' }),
      belir(c, [dA.g, dB.g, dC.g, kural], 400));
    c.note('<b>Dış açılar toplamı = 360°</b><br>3 · 180° − 180° = 360°', 'Dış açılar toplamı', 'gs-dis-acilar');

    // Dış açı = uzaktaki iki iç açı (A5): yalnızca C'deki dış açı kalır
    await sil(dA.g, dB.g, kural);
    kural.textContent = 'C’deki dış açı = α + β';
    await par(c.say('Bir dış açı, komşu olmayan iki iç açının toplamıdır.'), belir(c, kural, 400));
    c.note('<b>dış açı = α + β</b><br>Örnek: 50° + 60° = 110°', 'Dış açı', 'gs-dis-aci');
    await c.say('Şimdi beş dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'geometrik-sekiller-a6', kicker: 'Konu A · Açılar ve ispat', title: 'Konu tekrarı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Açılar ve ispat',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun beş kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Beş dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir üçgenin iki iç açısı 55° ve 65°dir. Üçüncü köşedeki dış açı kaç derecedir?',
        options: ['60°', '120°', '240°'], answer: 1,
        why: ['60°, üçüncü köşedeki iç açıdır.', 'Dış açı, uzaktaki iki iç açının toplamıdır: 55° + 65°.', 'Bir dış açı 180°’den küçüktür.'], scene: 0,
      },
      {
        q: 'Deniz 200 üçgende dış açıları ölçtü, hepsinde toplam 360° buldu. Deniz’in elinde ne var?',
        options: ['200 üçgen için bir doğrulama', 'Bütün üçgenler için bir ispat', 'Bir aksiyom'], answer: 0,
        why: ['Ölçüm yalnızca ölçülen üçgenleri kapsar.', 'Ölçülmemiş üçgenler var; ispat hepsini kapsamalıdır.', 'Aksiyom ispatsız kabul edilir; bu ise bir ölçüm sonucudur.'], scene: 0,
      },
      {
        q: 'Bir üçgenin açıları x, x + 20° ve x + 40°dir. En küçük açı kaç derecedir?',
        options: ['40°', '60°', '80°'], answer: 0,
        why: ['3x + 60° = 180° olduğundan x = 40°.', '60° ortanca açıdır: x + 20°.', '80° en büyük açıdır: x + 40°.'], scene: 0,
      },
      {
        q: 'Bir üçgenin iki dış açısı 100° ve 140°dir. Üçüncü dış açı kaç derecedir?',
        options: ['60°', '120°', '240°'], answer: 1,
        why: ['60°, üçüncü köşedeki iç açıdır.', '360° − 100° − 140° = 120°.', '240°, verilen iki dış açının toplamıdır.'], scene: 0,
      },
      {
        q: 'İspatsız kabul edilen temel bilgilere ne denir?',
        options: ['Genelleme', 'Doğrulama', 'Aksiyom'], answer: 2,
        why: ['Genelleme, bütün örneklerden söz eden cümledir.', 'Doğrulama, bir özelliği denenen örneklerde görmektir.', 'Aksiyom ispatlanmaz; ispatlar ona dayanır.'], scene: 0,
      },
      {
        q: 'Bir köşedeki dış açı 125°dir. Aynı köşedeki iç açı kaç derecedir?',
        options: ['55°', '125°', '235°'], answer: 0,
        why: ['İç açı ile dış açı bir doğru açı eder: 180° − 125°.', 'İkisi yalnızca 90° olduklarında eşittir.', 'Bir iç açı 180°’den küçüktür.'], scene: 0,
      },
      {
        q: 'İç açılar toplamının ispatı hangi çizimle başlar?',
        options: ['A’dan BC’ye paralel bir doğru', 'A’dan BC’ye bir dikme', 'A’daki açının açıortayı'], answer: 0,
        why: ['Paralel doğru, B ve C’deki açıların eşlerini A’ya taşır.', 'Dikme, üç açıyı yan yana getirmez.', 'Açıortay yalnızca A’daki açıyı böler.'], scene: 0,
      },
      {
        q: 'Eşkenar üçgenin bir dış açısı kaç derecedir?',
        options: ['60°', '120°', '240°'], answer: 1,
        why: ['60°, eşkenar üçgenin iç açısıdır.', 'İç açı 60°dir; dış açı 180° − 60° = 120°.', 'Bir dış açı 180°’den küçüktür.'], scene: 0,
      },
    ],
    summary: [
      '<b>Ölçmek örnek verir, ispat hepsini kapsar.</b>',
      'İspat doğru bilgilere dayanır; en altta <b>aksiyomlar</b> durur.',
      '<b>α + β + γ = 180°</b> · dış açılar toplamı <b>360°</b>',
      '<b>Dış açı</b>, uzaktaki iki iç açının toplamıdır.',
    ],
    nextLesson: { href: 'b1-en-uzun-kenar-en-buyuk-aci.html', label: 'Sonraki konu: Kenarlar ve açılar ›' },
  });
})();
