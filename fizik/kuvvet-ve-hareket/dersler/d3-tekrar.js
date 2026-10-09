/* D3 — Konu tekrarı: Doğadaki temel kuvvetler
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, daire, belir, ok } = window.KIT;
  const renk = '#ff8a5b';

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

    // Kütle çekim kuvveti
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Kütle çekim kuvveti', { size: 38, kalin: 700, renk });
    daire(c, g1, 250, 290, 80, { renk: RENK.a });
    daire(c, g1, 750, 290, 80, { renk: RENK.b });
    yazi(c, g1, 250, 302, 'kütle', { size: 32, renk: RENK.a });
    yazi(c, g1, 750, 302, 'kütle', { size: 32, renk: RENK.b });
    ok(c, g1, 345, 290, 455, 290, { renk: RENK.a });
    ok(c, g1, 655, 290, 545, 290, { renk: RENK.b });
    yazi(c, g1, 500, 410, 'birbirini çeker', { size: 36, kalin: 700 });
    yazi(c, g1, 500, 495, 'elma düşer, gezegen dolanır', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Doğada dört temel kuvvet vardır; birincisi kütle çekim kuvvetidir.');
    await c.say('Kütlesi olan bütün maddeler birbirini çeker.');
    await c.say('Elmayı düşüren ve gezegenleri dolandıran bu kuvvettir.');
    c.note('<b>Kütle çekim kuvveti:</b> kütlesi olan bütün maddeler birbirini çeker.<br>Örnek: düşen elma, Güneş’in etrafında dolanan gezegen.', 'Kütle çekim kuvveti', 'kuvvet-kutle-cekim');
    await sil(g1);

    // Elektromanyetik kuvvet
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Elektromanyetik kuvvet', { size: 38, kalin: 700, renk });
    kart(g2, 60, 160, 420, 170, 'Elektrik yükleri', ['tarak ve kâğıt'], { renk: RENK.a });
    kart(g2, 520, 160, 420, 170, 'Manyetik kutuplar', ['mıknatıs ve iğne'], { renk: RENK.b });
    yazi(c, g2, 500, 450, 'iter ya da çeker', { size: 38, kalin: 700 });
    await goster(g2, 'Elektromanyetik kuvvet, elektrik yükleriyle ve manyetik kutuplarla ilgilidir.');
    await c.say('Bu kuvvet iter ya da çeker.');
    await c.say('Sürtülen tarak kâğıdı, mıknatıs iğneleri çeker.');
    c.note('<b>Elektromanyetik kuvvet:</b> elektrik yükleri ve manyetik kutuplar iter ya da çeker.<br>Örnek: iğneleri toplayan mıknatıs.', 'Elektromanyetik kuvvet', 'kuvvet-elektromanyetik');
    await sil(g2);

    // Güçlü nükleer kuvvet
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'Güçlü nükleer kuvvet', { size: 38, kalin: 700, renk });
    yazi(c, g3, 500, 240, 'proton ve nötronları', { size: 48, kalin: 700 });
    yazi(c, g3, 500, 315, 'bir arada tutar', { size: 48, kalin: 700 });
    yazi(c, g3, 500, 430, 'etki mesafesi: çekirdekle sınırlı', { size: 32, renk: RENK.soluk });
    await goster(g3, 'Güçlü nükleer kuvvet, proton ve nötronları bir arada tutar.');
    await c.say('Demir çekirdeği bu kuvvet sayesinde dağılmaz.');
    await c.say('Etki mesafesi atom çekirdeğiyle sınırlıdır.');
    c.note('<b>Güçlü nükleer kuvvet:</b> proton ve nötronları bir arada tutar, çekirdekle sınırlıdır.<br>Örnek: demir çekirdeği dağılmaz.', 'Güçlü nükleer kuvvet', 'kuvvet-guclu-nukleer');
    await sil(g3);

    // Zayıf nükleer kuvvet
    const g4 = yeni();
    yazi(c, g4, 500, 100, 'Zayıf nükleer kuvvet', { size: 38, kalin: 700, renk });
    yazi(c, g4, 500, 235, 'çekirdek kararsız olur', { size: 44, kalin: 700 });
    yazi(c, g4, 500, 315, 'proton ve nötron dönüşür', { size: 44, kalin: 700 });
    yazi(c, g4, 500, 440, 'güçlü korur, zayıf değiştirir', { size: 34, kalin: 700, renk: RENK.r });
    await goster(g4, 'Zayıf nükleer kuvvet, çekirdeğin kararsız olmasına yol açar.');
    await c.say('Proton ve nötronların başka parçacıklara dönüşmesini sağlar.');
    await c.say('Çekirdeği güçlü nükleer kuvvet korur, zayıf nükleer kuvvet değiştirir.');
    c.note('<b>Zayıf nükleer kuvvet:</b> çekirdeği kararsız kılar, proton ve nötronları dönüştürür.<br>Örnek: çekirdeğin parçalanması.', 'Zayıf nükleer kuvvet', 'kuvvet-zayif-nukleer');
    await sil(g4);

    // Nerede etkili, ne kadar uzağa
    const g5 = yeni();
    yazi(c, g5, 500, 90, 'Nerede etkili, ne kadar uzağa?', { size: 36, kalin: 700, renk });
    kart(g5, 60, 140, 420, 300, 'Çekirdeğin dışında da', ['kütle çekim', 'elektromanyetik', 'mesafe: sonsuz'], { renk: RENK.a });
    kart(g5, 520, 140, 420, 300, 'Yalnızca çekirdekte', ['güçlü nükleer', 'zayıf nükleer', 'mesafe: sınırlı'], { renk: RENK.b });
    await goster(g5, 'Kütle çekim ve elektromanyetik kuvvet çekirdeğin dışında da etkilidir.');
    await c.say('Bu ikisinin etki mesafesi sonsuz kabul edilir.');
    await c.say('Güçlü ve zayıf nükleer kuvvet yalnızca çekirdekte etkilidir.');
    c.note('<b>Kütle çekim:</b> çekirdeğin dışında da; sonsuz kabul edilir<br><b>Elektromanyetik:</b> çekirdeğin dışında da; sonsuz kabul edilir<br><b>Güçlü nükleer:</b> yalnızca çekirdekte; çekirdekle sınırlı<br><b>Zayıf nükleer:</b> yalnızca çekirdekte; daha da kısa',
      'Nerede etkili, ne kadar uzağa', 'kuvvet-nerede-mesafe');
    await sil(g5);

    // Güç ve etki mesafesi
    const g6 = yeni();
    yazi(c, g6, 500, 90, 'Güç ve etki mesafesi', { size: 38, kalin: 700, renk });
    kart(g6, 60, 150, 420, 250, 'En güçlü', ['güçlü nükleer', 'çekirdekle sınırlı'], { renk: RENK.a });
    kart(g6, 520, 150, 420, 250, 'Etki mesafesi sonsuz', ['kütle çekim', 'elektromanyetik'], { renk: RENK.r });
    yazi(c, g6, 500, 480, 'İki ayrı özellik', { size: 36, kalin: 700 });
    await goster(g6, 'Dört kuvvet içinde en güçlü olan, güçlü nükleer kuvvettir.');
    await c.say('Ama etki mesafesi atom çekirdeğiyle sınırlıdır.');
    await c.say('Güçlü olmak ile uzağa ulaşmak iki ayrı özelliktir.');
    c.note('<b>Güçlü olmak ile uzağa ulaşmak ayrı özelliklerdir.</b><br>Örnek: güçlü nükleer kuvvet en güçlüdür, çekirdekle sınırlıdır.', 'Güç ve etki mesafesi', 'kuvvet-guc-ve-mesafe');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-d3', kicker: 'Konu D · Doğadaki temel kuvvetler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Doğadaki temel kuvvetler',
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
        q: 'Ay yüzeyinde duran bir astronotun ağırlığının sebebi hangisidir?',
        options: ['Ay’ın astronotu kütle çekim kuvvetiyle çekmesi', 'Ay’ın astronotu elektromanyetik kuvvetle çekmesi', 'Ay’ın astronotu güçlü nükleer kuvvetle çekmesi'], answer: 0,
        why: ['Evet. Ağırlığın sebebi kütle çekim kuvvetidir; kütlesi olan Ay da astronotu çeker.', 'Elektromanyetik kuvvet elektrik yükü ve manyetik kutuplarla ilgilidir; ağırlık kütleyle ilgilidir.', 'Güçlü nükleer kuvvet yalnızca atom çekirdeğinde etkilidir; ağırlığın sebebi o değildir.'], scene: 0,
      },
      {
        q: 'Hangi olayda etkili olan temel kuvvet ötekilerden farklıdır?',
        options: ['Rafın kenarından düşen bardağın yere inmesi', 'Yamaçtan kopan kayanın aşağı yuvarlanması', 'Mıknatıslı kutunun kapağının kapalı kalması'], answer: 2,
        why: ['Bardağı yere çeken kütle çekim kuvvetidir; kayayı da aynı kuvvet çeker, fark bu olay değil.', 'Kayayı aşağı çeken kütle çekim kuvvetidir; bardakla aynı kuvvet olduğundan fark bu olay değil.', 'Evet. Kapağı tutan, manyetik kutuplarla ilgili elektromanyetik kuvvettir; ötekilerde kütle çekim kuvveti etkilidir.'], scene: 0,
      },
      {
        q: 'Bir altın yüzüğü oluşturan atomların çekirdekleri parçalanmadan duruyor. Çekirdekleri bir arada tutan kuvvet için hangisi doğrudur?',
        options: ['Etkisi yüzüğün dışına, parmağa kadar ulaşır', 'Etkisi atom çekirdeğiyle sınırlıdır', 'Yüzüğün kütlesi büyük olduğu için etkilidir'], answer: 1,
        why: ['Çekirdekleri tutan güçlü nükleer kuvvet çekirdeğin dışına ulaşmaz; parmağa etkisi yoktur.', 'Evet. Güçlü nükleer kuvvet proton ve nötronları tutar; etki mesafesi çekirdekle sınırlıdır.', 'Güçlü nükleer kuvvet kütleyle değil, çekirdekteki proton ve nötronlarla ilgilidir.'], scene: 0,
      },
      {
        q: 'Bir atomun çekirdeğindeki parçacıklardan biri başka bir parçacığa dönüşüyor. Atom ve dönüşüm için hangisi doğrudur?',
        options: ['Başka bir elementin atomu olabilir; zayıf nükleer kuvvet sağlar', 'Aynı elementin atomu kalır; güçlü nükleer kuvvet sağlar', 'Başka bir elementin atomu olabilir; elektromanyetik kuvvet sağlar'], answer: 0,
        why: ['Evet. Çekirdekteki parçacıkların dönüşmesini zayıf nükleer kuvvet sağlar; atom başka bir elementin atomu olabilir.', 'Güçlü nükleer kuvvet çekirdeği korur; parçacıkları dönüştüren o değildir.', 'Elektromanyetik kuvvet yüklerle ve kutuplarla ilgilidir; çekirdekte parçacıkları dönüştüren zayıf nükleer kuvvettir.'], scene: 0,
      },
      {
        q: 'Dört temel kuvvet, etkilerinin ulaştığı uzaklığa göre sıralanıyor. En kısa uzağa ulaşan hangisidir?',
        options: ['Güçlü nükleer kuvvet', 'Zayıf nükleer kuvvet', 'Elektromanyetik kuvvet'], answer: 1,
        why: ['Güçlü nükleer kuvvetin etkisi çekirdekle sınırlıdır ama zayıf nükleer kuvvetinki ondan da kısadır.', 'Evet. Zayıf nükleer kuvvetin etki alanı güçlü nükleer kuvvetinkinden daha kısadır.', 'Elektromanyetik kuvvetin etki mesafesi sonsuz kabul edilir; en uzağa ulaşanlardan biridir.'], scene: 0,
      },
      {
        q: 'İki mıknatıs yaklaştırıldığında birbirini itiyor. Bu itmeyi hangi temel kuvvet sağlar?',
        options: ['Kütle çekim kuvveti; çünkü kütleler birbirini iter', 'Güçlü nükleer kuvvet; çünkü en güçlü kuvvet odur', 'Elektromanyetik kuvvet; çünkü kutuplar iter ya da çeker'], answer: 2,
        why: ['Kütle çekim kuvveti çeker, itmez; iten, kutuplarla ilgili başka bir kuvvettir.', 'Güçlü nükleer kuvvet çekirdekte etkilidir; en güçlü olması her yerde etkili olduğunu göstermez.', 'Evet. Elektromanyetik kuvvet kutuplar arasında iter ya da çeker.'], scene: 0,
      },
      {
        q: 'Aşağıdaki olaylardan hangisi gündelik hayatta kolayca gözlemlenemez?',
        options: ['Salıncaktaki çocuğun aşağı doğru inmesi', 'Çekirdekteki bir nötronun başka parçacığa dönüşmesi', 'Mıknatısın çelik bir çiviyi kendine çekmesi'], answer: 1,
        why: ['Salıncaktaki çocuğu çeken kütle çekim kuvvetinin etkisi makro düzeydedir; gözümüzün önündedir.', 'Evet. Çekirdekteki dönüşümler mikro düzeydedir; kolayca gözlemlenemez.', 'Mıknatısın çekmesi elektromanyetik kuvvetin makro düzeydeki etkisidir; kolayca gözlemlenir.'], scene: 0,
      },
      {
        q: 'Üç öğrenci kuvvetleri tartışıyor. Hangisi doğru söylüyor?',
        options: ['Mert: Kütle çekimin etkisi çok uzağa ulaşır ama en güçlü kuvvet değildir.', 'Ada: En güçlü kuvvetin etkisi, ötekilerden daha uzağa ulaşır.', 'Sinan: Çekirdekte çalışan kuvvetler, kütle çekimden daha uzağa ulaşır.'], answer: 0,
        why: ['Evet. Kütle çekimin etki mesafesi sonsuz kabul edilir; en güçlü kuvvet güçlü nükleer kuvvettir.', 'En güçlü kuvvet olan güçlü nükleer kuvvetin etkisi çekirdeğin dışına ulaşmaz.', 'Çekirdekte çalışan kuvvetlerin etki mesafesi çekirdekle sınırlıdır; sonsuz olan kütle çekimdir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Dört temel kuvvet:</b> kütle çekim ve elektromanyetik kuvvet çekirdeğin dışında da, güçlü ve zayıf nükleer kuvvet yalnızca çekirdekte etkilidir.',
      'Güçlü nükleer kuvvet çekirdeği <b>bir arada tutar,</b> zayıf nükleer kuvvet çekirdeğin yapısını <b>değiştirir.</b>',
      '<b>Güçlü olmak ile uzağa ulaşmak ayrı özelliklerdir:</b> en güçlü kuvvet çekirdeğin dışına ulaşmaz.',
    ],
    nextLesson: { href: 'e1-referans-ve-konum.html', label: 'Sonraki konu: Hareketin temel kavramları ›' },
  });
})();
