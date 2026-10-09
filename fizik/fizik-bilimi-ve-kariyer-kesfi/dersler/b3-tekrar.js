/* B3 — Konu tekrarı: Fizik biliminin alt dalları
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, belir, kart } = window.KIT;
  const renk = '#3ddc97';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const kartO = (baslik, metin, r) => ({ baslik, metin, renk: r, baslikSize: 26, size: 26 });
    // Alt dal satırları: ad solda, çizgi, konusu sağda
    const satirlar = (g, dizi, y0, ara) => dizi.forEach(([ad, konu], i) => {
      const y = y0 + i * ara;
      yazi(c, g, 40, y, ad, { size: 28, kalin: 700, hiza: 'start', renk: RENK.dal });
      cizgi(c, g, 540, y - 10, 610, y - 10, RENK.ince);
      yazi(c, g, 640, y, konu, { size: 28, hiza: 'start' });
    });

    // Önce nitelik, sonra grup
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Önce nitelik, sonra grup', { size: 38, kalin: 700 });
    kart(c, g1, 110, 160, 360, 150, kartO('Önce', 'niteliğe bak', RENK.disiplin));
    kart(c, g1, 530, 160, 360, 150, kartO('Sonra', 'rafa koy', RENK.dal));
    cizgi(c, g1, 478, 235, 522, 235, RENK.ince);
    yazi(c, g1, 500, 410, 'prizma ve gölge: ışık olayları', { size: 30, renk: RENK.fizik });
    await goster(g1, 'Önce neye baktığını söyle, sonra grupla.');
    await c.say('Prizma ile gölge oyununu ayıran özellik aynı: ışık olayı.');
    await c.say('Böyle bir özelliğe nitelik denir.');
    c.note('<b>Önce nitelik, sonra grup.</b><br>Prizma ile gölge oyunu: ışık olayları', 'Sınıflandırma', 'siniflandirma');
    await sil(g1);

    // Niteliği aynı olan aynı rafa girer
    const g2 = yeni();
    yazi(c, g2, 500, 90, 'Aynı nitelik, aynı raf', { size: 38, kalin: 700 });
    kart(c, g2, 60, 160, 300, 100, { metin: 'Kaynayan su', renk: RENK.disiplin, size: 26 });
    kart(c, g2, 60, 300, 300, 100, { metin: 'Termometre', renk: RENK.disiplin, size: 26 });
    kart(c, g2, 600, 210, 340, 150, kartO('Raf', 'ısı ve sıcaklık', RENK.dal));
    cizgi(c, g2, 362, 210, 598, 270, RENK.ince);
    cizgi(c, g2, 362, 350, 598, 300, RENK.ince);
    await goster(g2, 'Her rafta aynı niteliği taşıyan iki görsel var.');
    await c.say('Kaynayan su ile termometrenin niteliği aynı: ısı ve sıcaklık.');
    await c.say('Yeni örnek, niteliği aynı olan rafa girer.');
    c.note('<b>Niteliği aynı olan görseller aynı rafa girer.</b><br>Kaynayan su ve termometre: ısı ve sıcaklık.', 'Aynı raf', 'fizik-ayni-raf');
    await sil(g2);

    // Rafın adı bir alt daldır
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'Rafın adı bir alt dal', { size: 38, kalin: 700 });
    kart(c, g3, 80, 170, 330, 170, kartO('Nitelik', 'atom çekirdeği', RENK.disiplin));
    kart(c, g3, 590, 170, 330, 170, kartO('Alt dal', 'nükleer fizik', RENK.dal));
    cizgi(c, g3, 422, 255, 578, 255, RENK.ince);
    yazi(c, g3, 500, 440, 'Adı, neyi incelediğini söyler', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Bu rafı niteliğiyle etiketlemiştik: atom çekirdeği.');
    await c.say('Rafın adı artık bir alt dal: nükleer fizik.');
    await c.say('Alt dalın adı, neyi incelediğini söyler.');
    c.note('<b>Rafın adı bir alt daldır.</b><br>Atom çekirdeği rafı: nükleer fizik. Ad, neyi incelediğini söyler.', 'Rafın adı', 'fizik-raf-adi');
    await sil(g3);

    // İlk dört alt dal
    const g4 = yeni();
    yazi(c, g4, 500, 80, 'İlk dört alt dal', { size: 36, kalin: 700 });
    satirlar(g4, [['Mekanik', 'kuvvet, hareket, denge'], ['Termodinamik', 'ısı, sıcaklık, hâl değişimi'], ['Elektromanyetizma', 'elektrik ve manyetizma'], ['Optik', 'ışık olayları']], 190, 100);
    await goster(g4, 'Mekanik kuvvet, hareket ve dengeyle ilgilenir.');
    await c.say('Termodinamik ısı ve sıcaklığı, optik ışık olaylarını inceler.');
    await c.say('Elektromanyetizmanın adında iki söz var: elektrik ve manyetizma.');
    c.note('<b>Mekanik, termodinamik, elektromanyetizma, optik</b>', 'Fiziğin alt dalları', 'dallar-1');
    await sil(g4);

    // Öteki dört alt dal
    const g5 = yeni();
    yazi(c, g5, 500, 80, 'Öteki alt dallar', { size: 36, kalin: 700 });
    satirlar(g5, [['Katı hâl fiziği', 'kristal, yarı iletken'], ['Atom fiziği', 'atomun yapısı'], ['Nükleer fizik', 'atom çekirdeği'], ['Yüksek enerji ve plazma fiziği', 'plazma hâli']], 190, 100);
    await goster(g5, 'Katı hâl fiziği kristal yapılı ve yarı iletken maddeleri inceler.');
    await c.say('Atom fiziği atomun bütününe, nükleer fizik çekirdeğine bakar.');
    await c.say('Yüksek enerji ve plazma fiziği, maddenin plazma hâlini inceler.');
    c.note('<b>Katı hâl, atom, nükleer, yüksek enerji ve plazma fiziği</b>', 'Fiziğin alt dalları', 'dallar-2');
    await sil(g5);

    // Terimden alt dala
    const g6 = yeni();
    yazi(c, g6, 500, 90, 'Terimden alt dala', { size: 38, kalin: 700 });
    [['ısı iletimi', 'termodinamik', RENK.dal], ['mıknatıs', 'elektromanyetizma', RENK.dal], ['hücre', 'alt dal değil: biyoloji', RENK.soluk]].forEach(([terim, dal, r], i) => {
      const y = 215 + i * 105;
      yazi(c, g6, 100, y, terim, { size: 32, kalin: 700, hiza: 'start', renk: RENK.fizik });
      cizgi(c, g6, 400, y - 11, 500, y - 11, RENK.ince);
      yazi(c, g6, 540, y, dal, { size: 32, hiza: 'start', renk: r });
    });
    await goster(g6, 'Terimi alt dalla eşleştirirken dalın adına bak.');
    await c.say('Isı iletimi termodinamiğin, mıknatıs elektromanyetizmanın konusudur.');
    await c.say('Hücreyi biyoloji inceler; fiziğin alt dalı değildir.');
    c.note('<b>Terimi, adı neyi incelediğini söyleyen alt dalla eşleştir.</b><br>Hücreyi biyoloji inceler; fiziğin alt dalı değildir.', 'Terimden alt dala', 'fizik-terim-dal');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-b3', kicker: 'Konu B · Fizik biliminin alt dalları', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Fizik biliminin alt dalları',
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
        q: 'Bir teknisyen, kablodan geçen elektrik akımının çevresinde oluşan manyetik etkiyi inceliyor. Hangi alt dalın konusudur?',
        options: ['Optik', 'Elektromanyetizma', 'Termodinamik'], answer: 1,
        why: ['Optik ışık olaylarını inceler; kabloda ışık değil, akım ve manyetik etki var.', 'Evet. Elektromanyetizma elektrik akımını ve manyetizmayı inceler.', 'Termodinamik ısı ve sıcaklıkla ilgilenir; akımın manyetik etkisini açıklamaz.'], scene: 0,
      },
      {
        q: 'Bir öğretmen, yirmi fotoğrafı raflara dizmeden önce “Bu görsellerde ne oluyor?” diye soruyor. Hangi adımı atıyor?',
        options: ['Görselleri ayıran niteliği arıyor', 'Raflara alt dal adını yazıyor', 'Görselleri büyüklüğüne göre sıralıyor'], answer: 0,
        why: ['Evet. Önce neye baktığını söylersin, sonra grupla.', 'Alt dal adı, nitelikle etiketlenen rafın sonradan aldığı addır; ilk adım değil.', 'Büyüklük görselde ne olduğunu söylemez; ilk adım niteliği bulmaktır.'], scene: 0,
      },
      {
        q: 'Bir mühendis, bir buzdolabının içindeki sıcaklığın nasıl düştüğünü ve ısının dışarı nasıl aktığını inceliyor. Hangi alt dalın konusudur?',
        options: ['Optik', 'Mekanik', 'Termodinamik'], answer: 2,
        why: ['Optik ışık olaylarını inceler; buzdolabında söz konusu olan ışık değil, ısı.', 'Mekanik kuvvet, hareket ve dengeyle ilgilenir; burada sıcaklık ve ısı var.', 'Evet. Termodinamik ısı ve sıcaklıkla ilgilenir.'], scene: 0,
      },
      {
        q: 'Cem: “Rüzgârda sallanan salıncakla yokuştan kayan kızağı aynı rafa koymak yanlış; biri parkta, biri karda.” Cem’e ne dersin?',
        options: ['Yanılıyorsun; ikisi de hareket ve kuvvet niteliğini taşır.', 'Yanılıyorsun; ikisi de açık havada olduğu için aynı rafa girer.', 'Haklısın; mekânları farklı olduğu için ayrı raflara girerler.'], answer: 0,
        why: ['Evet. İkisi de hareket eder; raf, aynı niteliği taşıyan görseller için açılır.', 'Aynı rafı açık havada olmak değil, aynı niteliği taşımak belirler.', 'Mekân, görselde ne olduğunu söylemez; ayıran özellik niteliktir.'], scene: 0,
      },
      {
        q: 'Bir fotoğraf makinesinin merceği, görüntüyü ışığı kırarak sensöre düşürüyor. Bu konuyu hangi alt dal inceler?',
        options: ['Mekanik', 'Optik', 'Termodinamik'], answer: 1,
        why: ['Mekanik kuvvet, hareket ve dengeyle ilgilenir; merceğin işi ışıkla ilgili.', 'Evet. Optik, ışığın kırılması gibi ışık olaylarını inceler.', 'Termodinamik ısı ve sıcaklıkla ilgilenir; mercekte ısı söz konusu değil.'], scene: 0,
      },
      {
        q: 'Nehir: “Bitkilerin büyümesini inceleyen alan, fiziğin sekiz alt dalından biridir.” Nehir’e ne dersin?',
        options: ['Yanılıyorsun; bitkiler optik alt dalının konusudur.', 'Yanılıyorsun; bitkileri biyoloji inceler, fiziğin alt dalı değildir.', 'Haklısın; fizik bitkilerin büyümesini de inceler.'], answer: 1,
        why: ['Optik ışık olaylarını inceler; bitkileri incelemez.', 'Evet. Hücre gibi bitkiler de biyolojinin konusudur; fiziğin alt dalları arasında yok.', 'Sekiz alt dalın hiçbiri bitkilerin büyümesini incelemez.'], scene: 0,
      },
      {
        q: 'İki yeni fotoğraf var: avuçta eriyen bir buz parçası ve sıcak suya batırılınca ısınan bir kaşık. İkisini aynı rafa koyan nitelik hangisi?',
        options: ['Isı ve sıcaklık', 'Işık olayları', 'Atom çekirdeği'], answer: 0,
        why: ['Evet. Buz ısınınca erir, kaşığın sıcaklığı artar; ikisinde de ısı ve sıcaklık var.', 'İkisinde de ışık olayı yok; bu nitelik prizma ile gölgeyi aynı rafa koyuyordu.', 'Çekirdekle ilgili bir olay yok; bu raf santral ve BT cihazı gibi görselleri alıyordu.'], scene: 0,
      },
      {
        q: 'Bir ekip, rafına “katı hâl fiziği” adını verdi. Bu rafın niteliği hangisidir?',
        options: ['Atomun yapısı', 'Plazma hâli', 'Kristal ve yarı iletken'], answer: 2,
        why: ['Atomun yapısı, atom fiziği rafının niteliğidir.', 'Plazma hâli, yüksek enerji ve plazma fiziği rafının niteliğidir.', 'Evet. Katı hâl fiziği kristal yapılı ve yarı iletken maddeleri inceler.'], scene: 0,
      },
    ],
    summary: [
      '<b>Önce nitelik, sonra grup.</b> Niteliği aynı olan görseller aynı rafa girer.',
      'Rafın adı bir <b>alt daldır</b>; ad, neyi incelediğini söyler.',
      'Fiziğin <b>sekiz alt dalı</b> var: mekanik, termodinamik, elektromanyetizma, optik, katı hâl, atom, nükleer, yüksek enerji ve plazma fiziği.',
    ],
    nextLesson: { href: 'c1-dort-bilim-insani.html', label: 'Sonraki konu: Fizik bilimine yön verenler ›' },
  });
})();
