/* B3 — Konu tekrarı: Skaler ve vektörel nicelikler
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, ok, belir } = window.KIT;
  const renk = '#3ddc97';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    /* Başlıklı kart: çerçeve, renkli başlık ve ortalı satırlar. */
    const kart = (g, x, y, w, h, baslik, satirlar, o = {}) => {
      kutu(c, g, x, y, w, h, { renk: o.renk });
      yazi(c, g, x + w / 2, y + 52, baslik, { size: o.size || 30, kalin: 700, renk: o.renk });
      satirlar.forEach((m, i) => yazi(c, g, x + w / 2, y + 118 + i * 52, m, { size: o.size || 30 }));
    };

    // Skaler nicelik
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Skaler: sayı ve birim', { size: 38, kalin: 700, renk });
    ['kütle: 5 kg', 'hacim: 1,5 L', 'sıcaklık: 21 °C', 'zaman: 6 saat'].forEach((m, i) => yazi(c, g1, 500, 200 + i * 70, m, { size: 38, kalin: 700, renk: RENK.a }));
    yazi(c, g1, 500, 490, 'Yön gerekmez', { size: 30, renk: RENK.soluk });
    await goster(g1, 'Skaler nicelik, bir sayı ve bir birimle tam anlatılır.');
    await c.say('Kütle, hacim, sıcaklık ve zaman böyledir.');
    await c.say('Bunlarda “hangi yöne?” diye sormak gerekmez.');
    c.note('<b>Skaler: sayı ve birim.</b><br>5 kg skaler', 'Skaler nicelik', 'kuvvet-skaler');
    await sil(g1);

    // Vektörel nicelik
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Vektörel: sayı, birim ve yön', { size: 38, kalin: 700, renk });
    yazi(c, g2, 90, 245, 'kuvvet: 60 N, doğu', { size: 36, kalin: 700, hiza: 'start' });
    ok(c, g2, 620, 232, 880, 232, { renk: RENK.b });
    yazi(c, g2, 90, 365, 'hız: 60 km/h, batı', { size: 36, kalin: 700, hiza: 'start' });
    ok(c, g2, 880, 352, 620, 352, { renk: RENK.a });
    yazi(c, g2, 500, 490, 'Yön söylenmezse bilgi yarım kalır', { size: 30, renk: RENK.soluk });
    await goster(g2, 'Vektörel nicelikte sayı ve birimin yanında yön de gerekir.');
    await c.say('Kuvvet ve hız böyledir.');
    await c.say('Yön söylenmezse bilgi yarım kalır.');
    c.note('<b>Vektörel: sayı, birim ve yön.</b><br>doğuya 60 N vektörel', 'Vektörel nicelik', 'kuvvet-vektorel');
    await sil(g2);

    // Türü belirleyen tek soru
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'Tek soru: yön gerekir mi?', { size: 38, kalin: 700, renk });
    kart(g3, 60, 150, 420, 230, 'Yön gerekmez', ['skaler', 'kamyon: 20.000 kg'], { renk: RENK.a });
    kart(g3, 520, 150, 420, 230, 'Yön gerekir', ['vektörel', 'kuvvet: 60 N, doğu'], { renk: RENK.b });
    yazi(c, g3, 500, 465, 'Sayının büyüklüğü belirlemez', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Türü bulmak için tek soru yeter: yön gerekir mi?');
    await c.say('Yön gerekmiyorsa skaler, gerekiyorsa vektörel.');
    await c.say('Sayının büyüklüğü değil, yönün gerekip gerekmediği belirler.');
    c.note('<b>Niceliğin türünü sayının büyüklüğü değil, yön gerekip gerekmediği belirler.</b><br>kamyonun kütlesi 20.000 kg: skaler', 'Niceliğin türü', 'kuvvet-nicelik-turu');
    await sil(g3);

    // Toplama
    const g4 = yeni();
    yazi(c, g4, 500, 100, 'Nicelikler nasıl toplanır?', { size: 38, kalin: 700, renk });
    kart(g4, 60, 150, 420, 230, 'Skaler', ['3 kg + 2 kg = 5 kg'], { renk: RENK.a });
    kart(g4, 520, 150, 420, 230, 'Vektörel', ['60 N + 40 N', '100 N ya da 20 N'], { renk: RENK.b });
    await goster(g4, 'Skalerde sayılar doğrudan toplanır; vektörelde yöne bakılır.');
    await c.say('60 ve 40 newton, yöne göre 100 ya da 20 eder.', { speak: 'Altmış ve kırk newton, yöne göre yüz ya da yirmi eder.' });
    await c.say('İkisinde de yalnızca aynı tür nicelikler toplanır.');
    c.note('<b>Toplama:</b> skalerde sayılar toplanır, vektörelde yöne bakılır<br>3 kg + 2 kg = 5 kg; 60 N + 40 N = 100 N ya da 20 N', 'Toplama', 'kuvvet-toplama');
    await sil(g4);

    // Sürat ve hız
    const g5 = yeni();
    yazi(c, g5, 500, 100, 'Sürat ve hız', { size: 38, kalin: 700, renk });
    kart(g5, 60, 150, 420, 230, 'Sürat', ['8 m/s', 'skaler'], { renk: RENK.a });
    kart(g5, 520, 150, 420, 230, 'Hız', ['8 m/s, kuzeydoğu', 'vektörel'], { renk: RENK.b });
    yazi(c, g5, 500, 465, 'Birimi aynı, fark yönde', { size: 30, renk: RENK.soluk });
    await goster(g5, 'Sürat skaler, hız vektörel bir niceliktir.', { speak: 'Sürat skaler, [short pause] hız vektörel bir niceliktir.' });
    await c.say('İkisinin birimi de m/s’dir.', { speak: 'İkisinin birimi de metre bölü saniyedir.' });
    await c.say('Aralarındaki fark birimde değil, yöndedir.');
    c.note('<b>Sürat skaler, hız vektöreldir.</b><br>İkisinin birimi de m/s’dir; ayıran yöndür', 'Sürat ve hız', 'kuvvet-surat-hiz');
    await sil(g5);

    // İki ayrı soru
    const g6 = yeni();
    yazi(c, g6, 500, 100, 'İki ayrı soru', { size: 38, kalin: 700, renk });
    kart(g6, 60, 150, 420, 230, 'Birinci soru', ['temel mi,', 'türetilmiş mi?'], { renk: RENK.a });
    kart(g6, 520, 150, 420, 230, 'İkinci soru', ['skaler mi,', 'vektörel mi?'], { renk: RENK.b });
    yazi(c, g6, 500, 465, 'Türetilmiş, vektörel demek değildir', { size: 30, renk: RENK.soluk });
    await goster(g6, 'Birinci soru: temel mi, türetilmiş mi?', { speak: '[curious] Birinci soru: temel mi, türetilmiş mi?' });
    await c.say('İkinci soru: skaler mi, vektörel mi?', { speak: '[curious] İkinci soru: skaler mi, vektörel mi?' });
    await c.say('Türetilmiş olmak, vektörel olmak demek değildir.', { speak: '[thoughtful] Türetilmiş olmak, vektörel olmak demek değildir.' });
    c.note('<b>İki soru birbirinden bağımsızdır.</b><br>kütle: temel ve skaler; kuvvet: türetilmiş ve vektörel', 'İki ayrı soru', 'kuvvet-iki-soru');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-b3', kicker: 'Konu B · Skaler ve vektörel nicelikler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Skaler ve vektörel nicelikler',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Havuzda bir yüzme antrenmanı yapılıyor. Hangi cümledeki nicelik skalerdir?',
        options: ['Yüzücü havuzda batıya doğru 2 m/s hızla ilerliyor.', 'Havuzdaki suyun sıcaklığı 26 °C’dir.', 'Yüzücü suyu kuzeye doğru 90 N ile itiyor.'], answer: 1,
        why: ['Hız yön ister ve cümlede yön de söylenmiş; vektörel bir niceliktir.', 'Evet. Sıcaklık yön gerektirmez; sayı ve birimle tam anlatılır.', 'Kuvvet yön ister ve cümlede yön de söylenmiş; vektörel bir niceliktir.'], scene: 0,
      },
      {
        q: 'Sıkışmış bir kapıyı içerideki kişi doğuya doğru 90 N, dışarıdaki kişi batıya doğru 70 N ile itiyor. Kapıya etki eden toplam kuvvet nedir?',
        options: ['20 N, doğuya', '160 N, doğuya', '20 N, batıya'], answer: 0,
        why: ['Evet. Zıt yönlü kuvvetlerde büyük olandan küçük olan çıkar: 90 − 70 = 20. Toplam, büyük kuvvetin yönündedir.', 'Kuvvetler zıt yönlü; sayılar doğrudan toplanmaz.', 'Sayı doğru ama yön yanlış; toplam, büyük olan kuvvetin yönündedir.'], scene: 0,
      },
      {
        q: 'Bir yolcu uçağıyla ilgili hangi cümlede anlatılan nicelik hızdır?',
        options: ['Uçak bu yükseklikte 800 km/h ile uçabilir.', 'Uçağın göstergesinde 850 km/h okunuyor.', 'Uçak 900 km/h ile güneye doğru uçuyor.'], answer: 2,
        why: ['Yön söylenmemiş; yalnızca ne kadar hızlı olduğu var. Bu sürattir.', 'Gösterge sayı ve birim verir; yön yok. Bu da sürattir.', 'Evet. Sayı ve birimin yanında yön de söylenmiş; bu hızdır.'], scene: 0,
      },
      {
        q: 'Bir tarlanın alanı 400 m². Alan için hangisi doğrudur?',
        options: ['Alan uzunluktan türetilmiştir ve vektöreldir.', 'Alan temel bir niceliktir; birimi metrekaredir.', 'Alan uzunluktan türetilmiştir; yön gerektirmez.'], answer: 2,
        why: ['Alan yön gerektirmez; vektörel değil, skalerdir.', 'Metrekare, metre çarpı metredir; alan temel değil, türetilmiştir.', 'Evet. Metrekare iki uzunluğun çarpımıdır ve alan için yön gerekmez.'], scene: 0,
      },
      {
        q: 'Bir öğrenci, uyguladığı bir kuvveti defterine yazacak. Hangi kayıt kuvveti tam anlatır?',
        options: ['Kuzeye doğru 12 N', '12 N, dinamometreyle ölçüldü', '12 N, bir kutuya etki ediyor'], answer: 0,
        why: ['Evet. Kuvvet vektöreldir; sayı ve birimin yanında yön de gerekir.', 'Aletin adı bilgiyi tamamlamaz; kuvvetin yönü eksik.', 'Kuvvetin neye etki ettiğini söylemek, yönünü söylemek değildir.'], scene: 0,
      },
      {
        q: 'Bir akvaryumda 35 L su var; içine 15 L su daha ekleniyor. Akvaryumdaki toplam su hacmi için hangisi doğrudur?',
        options: ['Önce suyun yönü bilinmeli; toplam söylenemez.', '50 L; hacim skalerdir, sayılar doğrudan toplanır.', '20 L; büyük hacimden küçük olan çıkarılır.'], answer: 1,
        why: ['Hacim yön gerektirmez; yönü sormaya gerek yok.', 'Evet. Skaler niceliklerde sayılar doğrudan toplanır: 35 + 15 = 50.', 'Büyükten küçüğü çıkarmak zıt yönlü kuvvetler içindir; hacim skalerdir, sayılar toplanır.'], scene: 0,
      },
      {
        q: 'Kaan: “Kütle de hacim de skaler; ikisi de sayı ve birimle yazıldığına göre 3 kg ile 2 L’yi toplayıp ‘5’ diyebilirim.” Doğru karşılık hangisidir?',
        options: ['Haklı; skaler nicelikler birbiriyle toplanır.', 'Haksız; yalnızca vektörel nicelikler toplanabilir.', 'Haksız; kütle ile hacim farklı cins niceliklerdir.'], answer: 2,
        why: ['Skaler olmak yetmez; toplanacak niceliklerin aynı türden olması gerekir.', 'Skaler nicelikler de toplanır; kütle kütleyle, hacim hacimle.', 'Evet. Yalnızca aynı tür nicelikler birbiriyle toplanır.'], scene: 0,
      },
      {
        q: 'Aşağıdakilerden hangisi hem temel hem skaler bir niceliktir?',
        options: ['Buz pistinin sıcaklığı', 'Buz tabakasının yoğunluğu', 'Buza uygulanan kuvvet'], answer: 0,
        why: ['Evet. Sıcaklık yedi temel niceliktendir ve yön gerektirmez.', 'Yoğunluk skalerdir ama kg/m³ biriminden kurulur; türetilmiştir.', 'Kuvvet türetilmiştir ve yön ister; vektörel bir niceliktir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Skaler nicelik sayı ve birimle, vektörel nicelik ayrıca yönle anlatılır.</b>',
      'Niceliğin türünü sayının büyüklüğü değil, <b>yön gerekip gerekmediği</b> belirler.',
      '<b>Skalerde sayılar toplanır, vektörelde yöne bakılır;</b> sürat skaler, hız vektöreldir.',
    ],
    nextLesson: { href: 'c1-vektor.html', label: 'Sonraki konu: Vektörler ›' },
  });
})();
