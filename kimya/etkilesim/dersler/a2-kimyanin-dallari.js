/* A2 · KİM.9.1.1 · MEB Kimya 9 s.25–28. Kurumlar yalnız program kadarıyla. */
(() => {
  'use strict';
  const { yazi, kart, belir } = KIT;
  const dallar = [
    ['Analitik kimya', 'Bileşen türü ve miktarı', 'Örnek: sudaki bileşen miktarı'],
    ['Biyokimya', 'Canlılardaki kimyasal süreçler', 'Örnek: biyolojik moleküller'],
    ['Organik kimya', 'Organik bileşikler', 'Örnek: ilaçlar'],
    ['Anorganik kimya', 'Organik olmayan bileşikler', 'Örnek: tuzlar'],
    ['Fizikokimya', 'Davranış ve enerji dönüşümleri', 'Örnek: çözünme'],
    ['Polimer kimyası', 'Büyük moleküller', 'Örnek: plastikler'],
  ];
  async function tanim(c) {
    const svg = c.svg();
    const g = kart(c, svg, 'Kimya', ['Madde · özellik · etkileşim', 'Etkileşimin sonucu']);
    await belir(c, g);
    await c.say('Kimya, maddelerin özelliklerini ve etkileşimlerinin sonuçlarını inceler.');
    await c.choice({ q: 'Kimyasal bir ürünün kullanımını neyle ilişkilendirirsin?', options: ['Maddenin özelliğiyle', 'Yalnız ambalajın rengiyle', 'Yalnız markayla'], answer: 0,
      hints: ['', 'Ambalaj rengi maddenin davranışını açıklamaz.', 'Marka, bilimsel açıklamanın yerine geçmez.'], right: 'Özellik, etkileşim ve sonuç birlikte incelenir.' });
    c.note('<b>Kimya: madde ve etkileşim.</b><br>Örnek: tuzun çözünmesi', 'Kimya');
  }
  async function disiplin(c) {
    const svg = c.svg();
    const ciz = (i) => { svg.replaceChildren(); kart(c, svg, dallar[i][0], dallar[i].slice(1)); yazi(c, svg, 500, 495, 'Kitap s. 25–26', { size: 28 }); };
    ciz(0);
    await c.say('Aynı bilim, farklı çalışma sorularına ayrılır.');
    await c.choice({ q: 'Suda hangi madde, ne kadar var sorusu hangi dala örnek?', options: ['Polimer kimyası', 'Analitik kimya', 'Biyokimya'], answer: 1,
      hints: ['Polimer kimyası büyük moleküllere odaklanır.', '', 'Burada canlıdaki süreç değil, bileşen tayini soruluyor.'], right: 'Analitik kimya. Bir iş birden çok dalla da bağlantılı olabilir.' });
    c.slider({ label: 'Alt disiplin', min: 0, max: 5, value: 0, fmt: (i) => dallar[i][0], onInput: ciz });
    await c.say('Altı dalı sırayla incele; her karttaki soruyu karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function meslek(c) {
    const svg = c.svg();
    const meslekler = [
      ['Kimyager', 'Analiz ve araştırma'], ['Kimya mühendisi', 'Kimyasal üretim süreçleri'],
      ['Polimer malzeme mühendisi', 'Malzeme geliştirme'], ['Kimya öğretmeni', 'Eğitim'],
    ];
    const ciz = (i) => { svg.replaceChildren(); kart(c, svg, meslekler[i][0], [meslekler[i][1], 'Eğitim → uzmanlık → uygulama']); };
    ciz(0);
    await c.say('Teknoloji ve ürünler, farklı uzmanlık yollarıyla gelişir.');
    ciz(2);
    await c.say('Polimer kimyası, büyük moleküllerin yapısını ve özelliklerini inceler.');
    await c.say('Kitap, plastikleri bu alanın çalışma örnekleri arasında verir.');
    await c.choice({ tag: 'Eşleştir', q: 'Yeni bir büyük molekül malzemenin yapısını incelemek hangi alanla ilişkilidir?', options: ['Polimer kimyası', 'Yalnız tarih sıralaması', 'Ambalaj rengi seçimi'], answer: 0,
      hints: ['', 'Burada bilimsel malzeme geliştirme soruluyor.', 'Renk seçimi tek başına malzeme geliştirme değildir.'], right: 'Polimer kimyası. Malzeme ve nanoteknoloji kitapta kariyer alanlarıdır.' });
    c.slider({ label: 'Meslek örneği', min: 0, max: 3, value: 0, fmt: (i) => meslekler[i][0], onInput: ciz });
    await c.say('Meslek kartlarını değiştir; çalışma alanlarıyla eşleştir.', { noWait: true });
    await c.cont();
  }
  async function calisma(c) {
    const svg = c.svg();
    kart(c, svg, 'Aziz Sancar', ['DNA onarımı', 'Kitap s. 28']);
    await c.say('Bilim insanlarının çalışmaları kariyer yollarına örnek olur.');
    await c.choice({ tag: 'Eşleştir', q: 'Kitapta DNA onarımı çalışması kime bağlanır?', options: ['Aziz Sancar', 'Oktay Sinanoğlu', 'Bu iki isim verilmez.'], answer: 0,
      hints: ['', 'Sinanoğlu için burada çoklu elektron kuramı seçildi.', 'Program iki bilim insanını adıyla anıyor.'], right: 'Aziz Sancar. Biyografi yerine çalışmanın bilimle bağını görüyoruz.' });
    svg.replaceChildren();
    await belir(c, kart(c, svg, 'Oktay Sinanoğlu', ['Atom ve Moleküllerde', 'Çoklu Elektron Kuramı', 'Kitap s. 28']));
    await c.say('İkinci örnek, atom ve moleküllerdeki elektronlarla ilgilidir.');
    c.note('<b>Çalışma → bilim alanı.</b><br>Sancar: DNA onarımı', 'Kariyer örneği');
  }
  async function topluma(c) {
    const svg = c.svg();
    kart(c, svg, 'Kimya Teknoloji Merkezi', ['Günlük hayata katkı', 'Türkiye ekonomisine katkı']);
    await c.say('Program, İstanbul Kimya Teknoloji Merkezini katkı örneği olarak anar.');
    await c.choice({ tag: 'Sınıflandır', q: 'Plastiklerin yapısını incelemek hangi dala doğrudan örnektir?', options: ['Polimer kimyası', 'Yalnız biyografi', 'Kurumun adı'], answer: 0,
      hints: ['', 'Bir kişinin yaşam öyküsü malzemenin yapısını açıklamaz.', 'Kurum adı kimya disiplini değildir.'], right: 'Polimer kimyası. Bilimsel soru, çalışma alanını belirler.' });
    await c.say('Bir ürünün gelişimi, bilim ile uygulamanın ilişkisini gösterir.');
  }
  Ders.start({
    id: 'etkilesim-a2', kicker: 'Konu A · Günlük hayatta kimya', title: 'Bir bilim, farklı sorular', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Bir bilim, farklı sorular', hook: 'Bir ilacı tasarlayan ve sudaki maddeyi ölçen aynı işi mi yapar?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kimyanın sorusu', goal: 'Kimyanın çalışma konusunu ilişkilendir.', run: tanim },
      { title: 'Altı disiplin', goal: 'Disiplinleri örneklerle karşılaştır.', run: disiplin },
      { title: 'Üründen mesleğe', goal: 'Teknoloji ve kariyer bağını gör.', run: meslek },
      { title: 'İki çalışma', goal: 'Bilim insanını çalışmasıyla eşleştir.', run: calisma },
      { title: 'Bilimden topluma', goal: 'Kimyanın toplumsal katkısını gör.', run: topluma },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Sudaki bileşen miktarını belirlemek hangi dala örnek?', options: ['Polimer kimyası', 'Biyokimya', 'Analitik kimya'], answer: 2,
        why: ['Polimer kimyası büyük moleküllere odaklanır.', 'Burada canlıdaki süreç değil, miktar tayini soruluyor.', 'Bileşen türü ve miktarı analitik kimyanın konusudur.'], scene: 1 },
      { q: 'Kitabın Aziz Sancar örneği hangi çalışmayla ilişkilidir?', options: ['Plastik üretimi', 'DNA onarımı', 'Atom ve Moleküllerde Çoklu Elektron Kuramı'], answer: 1,
        why: ['Burada bu çalışma verilmedi.', 'DNA onarımı, s. 28’deki çalışma örneğidir.', 'Bu çalışma Sinanoğlu örneğidir.'], scene: 3 },
    ], summary: ['<b>Kimya tek bilim, farklı sorulara açılan dallardır.</b>', 'Çalışma konusu, disiplin ve kariyerle ilişkilidir.'],
    nextLesson: { href: 'b1-kazayi-anlamak.html', label: 'Sonraki: Kazayı anlamak ›' },
  });
})();
