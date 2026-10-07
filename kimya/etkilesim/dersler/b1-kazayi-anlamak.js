/* B1 · KİM.9.1.2 a–b · MEB Kimya 9, s.39–40.
   Kitap örnekleri sözlü neden-sonuç şemasıdır; uygulama tarifi değildir. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const yesil = '#3ddc97', kirmizi = 'var(--bad)', soluk = 'var(--muted)';
  function ok(c, p, x1, y, x2, renk = yesil) {
    const g = c.S('g', {}, p);
    c.S('line', { x1, y1: y, x2: x2 - 14, y2: y, stroke: renk, 'stroke-width': 5 }, g);
    c.S('path', { d: `M${x2 - 22} ${y - 12}L${x2} ${y}L${x2 - 22} ${y + 12}`, fill: 'none', stroke: renk, 'stroke-width': 5 }, g);
    return g;
  }
  function sise(c, p, x, ad, madde) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x + 68, y: 110, width: 84, height: 45, rx: 5, fill: '#596581' }, g);
    c.S('path', { d: `M${x + 68} 155 L${x + 30} 195 V355 Q${x + 30} 375 ${x + 50} 375 H${x + 170} Q${x + 190} 375 ${x + 190} 355 V195 L${x + 152} 155Z`, fill: '#162038', stroke: yesil, 'stroke-width': 4 }, g);
    c.S('rect', { x: x + 42, y: 232, width: 136, height: 75, rx: 6, fill: '#253249' }, g);
    yazi(c, g, x + 110, 285, madde, { size: 38, renk: yesil });
    yazi(c, g, x + 110, 425, ad, { size: 34 });
    return g;
  }
  function kutu(c, p, x, y, satirlar, renk = yesil, w = 250) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: w, height: 140, rx: 12, fill: '#162038', stroke: renk, 'stroke-width': 3 }, g);
    satirlar.forEach((s, i) => yazi(c, g, x + w / 2, y + 55 + i * 48, s, { size: 32, renk: i ? 'var(--text)' : renk }));
    return g;
  }
  async function olay(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 60, 'Aynı yüzeyde iki temizleyici', { size: 36 });
    sise(c, svg, 90, 'Tuz ruhu', 'HCl');
    sise(c, svg, 680, 'Çamaşır suyu', 'NaClO');
    const bag = ok(c, svg, 350, 265, 650, soluk);
    yazi(c, svg, 500, 500, 'Örnek olay · kitap s. 39', { size: 30, renk: soluk });
    await c.say('Kitaptaki olayda iki temizleyici, aynı yüzeyde karşılaşır.');
    await c.say('Ürünlerin etkisini, içerdikleri kimyasal maddelerin özellikleri belirler.');
    await c.say('Farklı maddeler karşılaşınca, temizlik dışında yeni bir tehlike doğabilir.');
    await c.choice({ q: 'Olaydaki hata hangisi?', options: ['İki temizleyiciyi gelişigüzel birleştirmek', 'Ürün adlarını bilmek', 'Etiketi okumak'], answer: 0,
      hints: ['', 'Adı bilmek hatalı kullanım değildir.', 'Etiketi okumak güvenli kullanımın başlangıcıdır.'], right: 'Hata, kimyasal maddelerin gelişigüzel karıştırılmasıdır.' });
    await c.tween(650, (e) => { bag.style.opacity = 1 - e; });
    const carp = c.S('g', {}, svg);
    c.S('path', { d: 'M460 220L540 310M540 220L460 310', stroke: kirmizi, 'stroke-width': 12, fill: 'none' }, carp);
    await belir(c, carp);
    await c.say('Ürünler farklı maddeler içerir; karşılaşmaları yeni bir tehlike doğurabilir.');
  }
  async function neden(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 65, 'Maddeden sonuca', { size: 36 });
    kutu(c, svg, 70, 170, ['Çamaşır suyu', 'NaClO']);
    kutu(c, svg, 70, 350, ['Tuz ruhu', 'HCl']);
    const sonuc = c.S('g', { opacity: 0 }, svg);
    c.S('path', { d: 'M340 240H430V330H550M340 420H430V330', stroke: yesil, 'stroke-width': 5, fill: 'none' }, sonuc);
    ok(c, sonuc, 550, 330, 620, kirmizi);
    [[745, 230, 48], [815, 250, 50], [700, 275, 42], [765, 285, 53], [835, 295, 34]].forEach(([cx, cy, r]) => c.S('circle', { cx, cy, r, fill: '#523d39', stroke: kirmizi, 'stroke-width': 3 }, sonuc));
    yazi(c, sonuc, 765, 390, 'Klor gazı', { size: 38, renk: kirmizi });
    yazi(c, sonuc, 765, 440, 'Solunum tehlikesi', { size: 32 });
    yazi(c, svg, 500, 535, 'Kitap s. 39', { size: 30, renk: soluk });
    await c.say('Çamaşır suyunun etken maddesi genellikle sodyum hipoklorittir: NaClO.');
    await c.say('Tuz ruhu, hidrojen klorürün sulu çözeltisidir: HCl.');
    await c.tween(800, (e) => { sonuc.setAttribute('opacity', e); });
    await c.say('Bu ürünlerin karşılaşmasından çıkan klor gazı, solunum için tehlikelidir.');
    await c.choice({ q: 'Ürün adı farklı, içerik aynı: bu olayın riski nasıl değerlendirilir?', options: ['İçerikler ve karşılaşmaları üzerinden değerlendirilir.', 'Farklı adlar etkileşimi ortadan kaldırır.', 'Temizleyici adıyla satıldığı için risk yoktur.'], answer: 0,
      hints: ['', 'Etkileşimi ürün adı değil, maddelerin özellikleri belirler.', 'Kullanım amacı, hatalı kullanımdaki riski ortadan kaldırmaz.'], right: 'Yeni ad, içerikleri değiştirmez. Önceki neden zinciri bu duruma da uygulanır.' });
    await c.say('Aynı içerikler farklı adlarla satılsa da risk ortadan kalkmaz.');
    c.note('<b>Madde, hata ve sonuç ilişkilendirilir.</b><br>Karıştırma: klor gazı riski.', 'Neden zinciri');
  }
  async function yuzey(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 65, 'Kireç çözücü ve derz', { size: 36 });
    kutu(c, svg, 50, 200, ['Asidik', 'temizleyici'], yesil, 260);
    ok(c, svg, 330, 270, 430);
    const zemin = c.S('g', {}, svg);
    const derz = c.S('rect', { x: 475, y: 145, width: 450, height: 300, fill: '#baa17c' }, zemin);
    for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) c.S('rect', { x: 481 + k * 150, y: 151 + r * 150, width: 138, height: 138, rx: 3, fill: '#344863' }, zemin);
    yazi(c, svg, 700, 490, 'Derz: mineral bileşenler', { size: 32 });
    yazi(c, svg, 500, 535, 'Kitap s. 39–40', { size: 30, renk: soluk });
    await c.say('Kitapta kireç çözücülerin asidik olduğu belirtilir.');
    await c.say('Derzin mineral bileşenleri, asidik maddelerle tepkime verir.');
    await c.choice({ q: 'Asidik temizleyici derzle etkileşirse ne beklenir?', options: ['Derz zarar görebilir.', 'Bütün yüzeyler güçlenir.', 'Yüzey türü önemsizdir.'], answer: 0,
      hints: ['', 'Asit, derzin mineral bileşenleriyle tepkime verebilir.', 'Maddenin özelliği ve yüzey türü birlikte değerlendirilir.'], right: 'Kitap, derzin mineral bileşenlerinin asitlerle tepkime verdiğini belirtir.' });
    await c.tween(850, (e) => { derz.setAttribute('opacity', 1 - e); });
    yazi(c, svg, 180, 425, 'Derz hasarı', { size: 32, renk: kirmizi });
    await c.say('Şema, derzin zarar görmesini gösterir; ölçüm sonucu değildir.');
  }
  async function ozet(c) {
    const svg = c.svg();
    const zincirler = [
      [['İki temizleyici'], ['Karıştırma'], ['Klor gazı', 'Sağlık riski']],
      [['Asidik temizleyici'], ['Uygunsuz yüzey'], ['Derz hasarı', 'Yüzey sorunu']],
      [['Fabrika: cıva'], ['Denize atık'], ['Çevre zararı', 'Sağlık riski']],
      [['Laboratuvar: sodyum'], ['Fazla miktar', 'Suya temas'], ['Şiddetli tepkime', 'Kaza riski']],
    ];
    const ciz = (i) => {
      svg.replaceChildren();
      ['Madde', 'Hata', 'Sonuç'].forEach((ad, j) => yazi(c, svg, 175 + j * 325, 150, ad, { size: 34, renk: soluk }));
      zincirler[i].forEach((s, j) => kutu(c, svg, 50 + j * 325, 210, s, j === 2 ? kirmizi : yesil));
      ok(c, svg, 305, 280, 370); ok(c, svg, 630, 280, 695, kirmizi);
      yazi(c, svg, 500, 450, 'Kitap s. 39–40', { size: 30, renk: soluk });
    };
    ciz(2);
    await c.say('Cıva zehirli bir metaldir; denize bırakılması çevreyi kirletir.');
    ciz(3);
    await c.say('Sodyumun suyla teması, şiddetli tepkime ve kaza riski taşır.');
    await c.say('Madde nedenin parçasıdır; yanlış işlem hata, ortaya çıkan zarar sonuçtur.');
    ciz(0);
    await c.choice({ tag: 'Sınıflandır', q: 'Fabrika olayında “denize atık bırakma” zincirin hangi bölümüdür?', options: ['Madde', 'Hatalı kullanım', 'Sonuç'], answer: 1,
      hints: ['Madde cıvadır; atık bırakma yapılan işlemdir.', '', 'Çevre zararı, atık bırakmanın sonucudur.'], right: 'Ortam değişse de yanlış işlem, hatalı kullanım bölümüne yerleşir.' });
    const ortamlar = ['Ev: temizleyiciler', 'Ev: derz', 'Fabrika atığı', 'Laboratuvar kazası'];
    c.slider({ label: 'Olayı karşılaştır', min: 0, max: 3, step: 1, value: 0, fmt: (i) => ortamlar[i], onInput: ciz });
    await c.say('Olayı değiştir; madde, hata ve sonucu birlikte oku.', { noWait: true });
    await c.cont();
  }
  Ders.start({
    id: 'etkilesim-b1', kicker: 'Konu B · Kimyasal maddeler ve güvenlik', title: 'Kazayı neden zinciriyle tanımla', accent: yesil, back: 'index.html',
    intro: { title: 'Kazayı neden zinciriyle tanımla', hook: 'İki temizleyici daha güçlü temizlik anlamına mı gelir?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Hatalı kullanımı bul', goal: 'Örnek olaydaki problemi belirle.', run: olay },
      { title: 'Madde ve sonuç', goal: 'Problemin nedenini açıkla.', run: neden },
      { title: 'Başka bir yüzey', goal: 'İki problemi karşılaştır.', run: yuzey },
      { title: 'Neden zincirini kur', goal: 'Problemi genelleyerek özetle.', run: ozet },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Çamaşır suyu ve tuz ruhunun karşılaşmasında hangi risk vardır?', options: ['Klor gazı oluşması', 'Her koşulda etkisiz kalması', 'Yalnız su oluşması'], answer: 0,
        why: ['Kitabın örnek olayı klor gazı riskini gösterir.', 'Maddeler etkileşebilir; etkisiz oldukları söylenemez.', 'Kitap yalnız su oluştuğunu belirtmez.'], scene: 1 },
      { q: 'Problemi doğru özetlemek için hangisi gerekir?', options: ['Yalnız marka adını söylemek', 'Madde, hatalı kullanım ve sonucu ilişkilendirmek', 'Daha çok ürün önermek'], answer: 1,
        why: ['Marka adı, problemin nedenini açıklamaz.', 'Bu zincir iki olayı karşılaştırıp özetlemeyi sağlar.', 'Daha çok ürün kullanmak neden zinciri kurmaz.'], scene: 3 },
    ], summary: ['<b>Hangi madde, hangi hata, hangi sonuç?</b>', 'Sağlık riski ve yüzey hasarı farklı sonuçlardır.'],
    nextLesson: { href: 'b2-etiket-ve-guvenlik.html', label: 'Sonraki: Önlem kanıtla seçilir ›' },
  });
})();
