/* G1 · KİM.9.1.7 · MEB Kimya 9 s.73–76, 7 Ekim 2026.
   Hazır atom/iyon dizilimleri: s.73. K: s.74; Cl: s.75; Mg ve tanım: s.76.
   İlk 20 element; tam dizilim. Kutu orbitaldir, ok elektrondur; yörünge çizilmez. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const elektron = '#6ea8ff', proton = '#ff8a5b', vurgu = '#ff6b7a', soluk = '#667591';
  const d10 = '1s²2s²2p⁶', d18 = '1s²2s²2p⁶3s²3p⁶';
  const veriler = [
    { ad: 'F', iyon: 'F⁻', p: 9, e: 10, once: '1s²2s²2p⁵', sonra: d10, shell: [['2p', 5, 6]], sayfa: 73 },
    { ad: 'N', iyon: 'N³⁻', p: 7, e: 10, once: '1s²2s²2p³', sonra: d10, shell: [['2p', 3, 6]], sayfa: 73 },
    { ad: 'S', iyon: 'S²⁻', p: 16, e: 18, once: '1s²2s²2p⁶3s²3p⁴', sonra: d18, shell: [['3p', 4, 6]], sayfa: 73 },
    { ad: 'Na', iyon: 'Na⁺', p: 11, e: 10, once: d10 + '3s¹', sonra: d10, shell: [['3s', 1, 0]], sayfa: 73 },
    { ad: 'Ca', iyon: 'Ca²⁺', p: 20, e: 18, once: d18 + '4s²', sonra: d18, shell: [['4s', 2, 0]], sayfa: 73 },
    { ad: 'Al', iyon: 'Al³⁺', p: 13, e: 10, once: d10 + '3s²3p¹', sonra: d10, shell: [['3s', 2, 0], ['3p', 1, 0]], sayfa: 73 },
  ];
  const K = { ad: 'K', iyon: 'K⁺', p: 19, e: 18, once: d18 + '4s¹', sonra: d18, shell: [['4s', 1, 0]], sayfa: 74 };
  const Cl = { ad: 'Cl', iyon: 'Cl⁻', p: 17, e: 18, once: d18.replace('3p⁶', '3p⁵'), sonra: d18, shell: [['3p', 5, 6]], sayfa: 75 };
  const Mg = { ad: 'Mg', iyon: 'Mg²⁺', p: 12, e: 10, once: d10 + '3s²', sonra: d10, shell: [['3s', 2, 0]], sayfa: 76 };
  function source(c, svg, n) { yazi(c, svg, 500, 535, 'Kitap s. ' + n, { size: 30, renk: 'var(--muted)' }); }
  function electronArrow(c, svg, x, y, down, color = elektron) {
    return c.S('path', { d: down ? `M${x},${y - 20}v40m-8,-10l8,10l8,-10` : `M${x},${y + 20}v-40m-8,10l8,-10l8,10`,
      fill: 'none', stroke: color, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  }
  function positions(ad, n, x, y) {
    const nb = ad.endsWith('p') ? 3 : 1, pos = [];
    for (let j = 0; j < n; j++) {
      const box = j < nb ? j : j - nb, down = j >= nb;
      pos.push({ x: x + box * 78 + (down ? 41 : 20), y, down });
    }
    return pos;
  }
  // The proton badge remains the same SVG node while electrons move.
  function schema(c, svg, v, final = false) {
    svg.replaceChildren();
    yazi(c, svg, 500, 57, v.ad + ' → ' + v.iyon, { size: 40 });
    yazi(c, svg, 170, 122, v.ad + ' · ' + v.p + 'e⁻', { size: 34, renk: elektron });
    yazi(c, svg, 610, 122, v.once, { size: 34 });
    c.S('circle', { cx: 145, cy: 270, r: 65, fill: '#162038', stroke: proton, 'stroke-width': 4 }, svg);
    yazi(c, svg, 145, 280, v.p + 'p⁺', { size: 36, renk: proton });
    const result = c.S('g', { opacity: final ? 1 : 0 }, svg);
    yazi(c, result, 170, 439, v.iyon + ' · ' + v.e + 'e⁻', { size: 34, renk: elektron });
    yazi(c, result, 610, 439, v.sonra, { size: 34 });
    source(c, svg, v.sayfa);
    const moving = [];
    v.shell.forEach(([ad, before, after], i) => {
      const nb = ad.endsWith('p') ? 3 : 1, x = v.shell.length > 1 ? 310 + i * 215 : 370, y = 280;
      yazi(c, svg, x + (nb * 78 - 15) / 2, 213, ad, { size: 32, renk: elektron });
      for (let b = 0; b < nb; b++) c.S('rect', { x: x + b * 78, y: y - 35, width: 62, height: 70, rx: 4, fill: 'none', stroke: soluk, 'stroke-width': 3 }, svg);
      positions(ad, Math.max(before, after), x, y).forEach((pos, j) => {
        const changes = j >= Math.min(before, after), fromOutside = after > before;
        const a = electronArrow(c, svg, pos.x, pos.y, pos.down);
        if (changes) {
          const dx = 860 - pos.x, dy = -35 - (j - Math.min(before, after)) * 28;
          if (final) { if (fromOutside) a.style.opacity = 1; else a.style.opacity = 0; }
          else if (fromOutside) a.setAttribute('transform', `translate(${dx} ${dy})`);
          moving.push({ a, dx, dy, fromOutside });
        }
      });
    });
    if (final) yazi(c, svg, 815, 285, (v.e > v.p ? '+' : '−') + Math.abs(v.e - v.p) + 'e⁻', { size: 34, renk: elektron });
    return { moving, result };
  }
  async function transfer(c, svg, v) {
    const { moving, result } = schema(c, svg, v);
    await c.tween(1300, (t) => moving.forEach(({ a, dx, dy, fromOutside }) => {
      const e = fromOutside ? 1 - t : t;
      a.setAttribute('transform', `translate(${dx * e} ${dy * e})`);
      if (!fromOutside) a.style.opacity = 1 - t;
    }));
    await belir(c, result);
    yazi(c, svg, 815, 285, (v.e > v.p ? '+' : '−') + Math.abs(v.e - v.p) + 'e⁻', { size: 34, renk: elektron });
  }
  async function sonKatman(c) {
    const svg = c.svg(), Na = veriler[3], F = veriler[0];
    schema(c, svg, Na);
    await c.say('Na⁺ oluşurken hangi tanecik değişir?');
    await c.choice({ tag: 'Tahmin et', q: 'Na → Na⁺ geçişinde ne olur?', options: ['Bir elektron verilir.', 'Bir proton verilir.', 'Bir elektron alınır.'], answer: 0,
      hints: ['', 'Proton değişirse elementin kimliği değişir.', 'Elektron almak negatif yük oluşturur.'], right: '3s elektronunu izle; proton rozeti yerinde kalacak.' });
    await transfer(c, svg, Na);
    await c.say('3s elektronu gider; çekirdekteki protonlar kalır.');
    schema(c, svg, F);
    await c.choice({ tag: 'Tahmin et', q: 'F → F⁻ geçişini tahmin et.', options: ['Bir elektron alınır.', 'Bir proton verilir.', 'Bir elektron verilir.'], answer: 0,
      hints: ['', 'İyonlaşmada proton sayısı değişmez.', 'Elektron vermek pozitif yük oluşturur.'], right: '2p orbitalindeki eksik eş tamamlanacak.' });
    await transfer(c, svg, F);
    await c.say('Gelen elektron 2p’ye yerleşir; proton sayısı yine sabittir.');
  }
  async function hazirVeri(c) {
    const svg = c.svg();
    const draw = (i) => schema(c, svg, veriler[i], true);
    draw(0);
    await c.say('Hazır çiftlerde dizilim değişirken proton sayısı korunur.');
    await c.choice({ q: 'N → N³⁻ geçişinde kaç elektron alınır?', options: ['3', '1', '7'], answer: 0,
      hints: ['', '7 elektron 10’a çıkar; fark üçtür.', 'Yedi, N atomunun proton sayısıdır.'], right: 'Üç elektron alınır; 2p³, 2p⁶ olur.' });
    c.slider({ label: 'Atom–iyon çiftini seç', min: 0, max: 5, step: 1, value: 0, fmt: (i) => veriler[i].ad + ' → ' + veriler[i].iyon, onInput: draw });
    await c.say('Altı çiftte elektron değişimini, son katmanı ve protonları karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function genelle(c) {
    const svg = c.svg();
    schema(c, svg, Mg);
    await c.say('Elektron sayısını proton sayısıyla karşılaştırarak yükü bul.');
    await c.choice({ q: 'Mg iki elektron verirse hangi tanecik oluşur?', options: ['Mg²⁺ katyonu', 'Mg²⁻ anyonu', 'Ne atomu'], answer: 0,
      hints: ['', 'Elektron vermek negatif yük oluşturmaz.', 'Proton sayısı 12 kalır; element Mg’dir.'], right: '12 proton ve 10 elektron: net yük +2.' });
    await transfer(c, svg, Mg);
    await c.say('Elektron veren atom pozitif yüklü katyon oluşturur.');
    c.note('<b>Elektron ver → katyon; al → anyon. Proton sabit.</b><br>Mg → Mg²⁺', 'İyon oluşumu');
    schema(c, svg, veriler[2], true);
    await c.choice({ tag: 'Sınıflandır', q: 'S²⁻: 16 proton, 18 elektron. Atom mu, iyon mu?', options: ['Negatif iyon: anyon', 'Pozitif iyon: katyon', 'Nötr atom'], answer: 0,
      hints: ['', 'Elektron fazlası negatif yük demektir.', 'Proton ve elektron sayıları eşit değil.'], right: 'Elektron alan atom anyon oluşturur.' });
    await c.say('Elektron fazlası negatif yük; proton fazlası pozitif yük demektir.');
  }
  async function orbitalDene(c) {
    const svg = c.svg();
    for (const [v, soru, options, answer, hints] of [
      [K, 'K⁺ oluşurken elektron hangi orbitalden verilir?', ['4s', '3p', '1s'], 0, ['', '3p dolu kalır; en yüksek enerji düzeyi 4’tür.', '1s iç katmandadır.']],
      [Cl, 'Cl⁻ oluşurken elektron hangi orbitale alınır?', ['4s', '3p', '2p'], 1, ['Son katmandaki 3p’de boş eş yeri vardır.', '', '2p zaten tam doludur.']],
      [Mg, 'Mg²⁺ için hangi orbitalden iki elektron verilir?', ['2p', '3s', '1s'], 1, ['2p iç katmanda dolu kalır.', '', '1s iç katmanda dolu kalır.']],
    ]) {
      schema(c, svg, v);
      await c.say('Tam dizilimde en yüksek enerji düzeyindeki orbitalleri bul.');
      await c.choice({ tag: 'Dene', q: soru, options, answer, hints, right: 'Şemada elektronun hareketini kontrol et.' });
      await transfer(c, svg, v);
      await c.say(v.ad === 'Cl' ? '3p’ye alınan elektron, Cl⁻ dizilimini tamamlar.' : v.ad + ' elektron verir; boşalan orbital iyon diziliminde yazılmaz.');
    }
    c.slider({ label: 'Orbital örneğini seç', min: 0, max: 2, step: 1, value: 2, fmt: (i) => [K, Cl, Mg][i].ad, onInput: (i) => schema(c, svg, [K, Cl, Mg][i], true) });
    await c.say('K, Cl ve Mg’de verilen veya alınan orbitalleri yeniden incele.', { noWait: true });
    await c.cont();
  }
  const gruplar = [
    { e: 10, d: d10, particles: [['Na⁺', 11], ['Mg²⁺', 12], ['Ne', 10]] },
    { e: 18, d: d18, particles: [['K⁺', 19], ['Cl⁻', 17], ['Ar', 18]] },
  ];
  function group(c, svg, i) {
    svg.replaceChildren(); const g = gruplar[i];
    yazi(c, svg, 500, 65, 'İzoelektronik', { size: 40 });
    g.particles.forEach(([ad, p], j) => {
      const x = 200 + j * 300;
      c.S('rect', { x: x - 120, y: 130, width: 240, height: 230, rx: 12, fill: '#162038', stroke: elektron, 'stroke-width': 3 }, svg);
      yazi(c, svg, x, 188, ad, { size: 42 });
      yazi(c, svg, x, 250, p + 'p⁺', { size: 36, renk: proton });
      yazi(c, svg, x, 318, g.e + 'e⁻', { size: 36, renk: elektron });
    });
    yazi(c, svg, 500, 425, g.d, { size: 40, renk: elektron });
    yazi(c, svg, 500, 483, 'Aynı dizilim · farklı proton', { size: 32 });
    source(c, svg, i ? '75–76' : 76);
  }
  async function izoelektronik(c) {
    const svg = c.svg(); group(c, svg, 0);
    await c.say('Elektron sayıları ve dizilimleri aynı; proton sayıları farklı.');
    await c.choice({ q: 'Na⁺, Mg²⁺ ve Ne aynı element midir?', options: ['Hayır; proton sayıları farklı.', 'Evet; elektron sayıları aynı.', 'Evet; dizilimleri aynı.'], answer: 0,
      hints: ['', 'Elementi elektron değil, proton sayısı belirler.', 'Aynı dizilim aynı element demek değildir.'], right: 'İzoelektronik tanecikler aynı element olmak zorunda değildir.' });
    c.note('<b>Elektron sayısı ve dizilimi aynı, protonları farklı: izoelektronik.</b><br>Na⁺/Mg²⁺/Ne', 'İzoelektronik');
    const adaylar = [['K⁺', 18, d18, 1], ['Cl⁻', 18, d18, 1], ['Ar', 18, d18, 1], ['Na', 11, d10 + '3s¹', 2]];
    for (const [ad, e, d, dogru] of adaylar) {
      svg.replaceChildren();
      const card = c.S('g', {}, svg);
      yazi(c, card, 500, 100, ad + ' · ' + e + 'e⁻', { size: 40, renk: elektron });
      yazi(c, card, 500, 170, d, { size: 36 });
      ['10e⁻', '18e⁻', 'Hiçbiri'].forEach((label, i) => {
        c.S('rect', { x: 65 + i * 310, y: 330, width: 250, height: 115, rx: 12, fill: '#162038', stroke: soluk, 'stroke-width': 3 }, svg);
        yazi(c, svg, 190 + i * 310, 408, label, { size: 36 });
      });
      source(c, svg, '75–76');
      await c.say('Taneciği elektron sayısı ve tam dizilimiyle sınıflandır.', { noWait: true });
      await c.choice({ tag: 'Sınıflandır', q: ad + ' hangi izoelektronik grubun dizilimine uyar?', options: ['Na⁺/Mg²⁺/Ne · 10 elektron', 'K⁺/Cl⁻/Ar · 18 elektron', 'Bu gruplardan hiçbirine'], answer: dogru,
        hints: dogru === 1 ? ['10 elektronlu dizilimle aynı değil.', '', '18 elektronlu grubun dizilimi aynıdır.'] : ['Na nötr atomu 11 elektronludur.', '18 elektronlu dizilimle aynı değil.', ''], right: dogru === 1 ? '18 elektron ve aynı tam dizilim.' : 'Nötr Na, Na⁺ ile aynı dizilimde değildir.' });
      await c.tween(650, (t) => card.setAttribute('transform', `translate(${(dogru - 1) * 310 * t} ${150 * t})`));
    }
    group(c, svg, 1);
    c.slider({ label: 'İzoelektronik grubu seç', min: 0, max: 1, step: 1, value: 1, fmt: (i) => gruplar[i].e + ' elektron', onInput: (i) => group(c, svg, i) });
    await c.say('Elektron değişir; proton sayısı elementin kimliğini korur.', { noWait: true });
    await c.cont();
  }
  Ders.start({
    id: 'etkilesim-g1', kicker: 'Konu G · İyon oluşumu', title: 'Elektron değişir, proton kalır', accent: vurgu, back: 'index.html',
    intro: { title: 'Elektron değişir, proton kalır', hook: 'Na ile Na⁺ aynı dizilime mi sahip?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Son katmanı izle', goal: 'Elektron verme ve alma hareketini tahmin et.', run: sonKatman },
      { title: 'Hazır veriyi seç', goal: 'Altı kaynaklı atom–iyon çiftindeki örüntüyü bul.', run: hazirVeri },
      { title: 'İyonu adlandır', goal: 'Katyon ve anyonu elektron–proton sayısıyla ayır.', run: genelle },
      { title: 'Orbitali göster', goal: 'K, Cl ve Mg’de değişen orbitali seç.', run: orbitalDene },
      { title: 'İzoelektronik gruplar', goal: 'Elektron sayısı ve dizilimle sınıflandır.', run: izoelektronik },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Na⁺ oluşurken ne olur?', options: ['Bir proton verilir.', 'Bir elektron verilir.', 'Bir elektron alınır.'], answer: 1,
        why: ['Proton sayısı 11 kalır; proton kaybı elementin kimliğini değiştirirdi.', '3s elektronu verilir; 11 proton ve 10 elektronla +1 yük oluşur.', 'Elektron alınması negatif yük oluştururdu.'], scene: 0 },
      { q: 'Na⁺/Mg²⁺/Ne taneciklerinin ortaklığı nedir?', options: ['Aynı proton sayısı', 'Aynı atom yarıçapı', 'Aynı elektron sayısı ve dizilim'], answer: 2,
        why: ['Proton sayıları 11, 12 ve 10’dur.', 'Aynı dizilim, yarıçapların aynı olmasını gerektirmez.', 'Hepsi 10 elektronlu ve 1s²2s²2p⁶ dizilimlidir; izoelektroniktir.'], scene: 4 },
    ],
    summary: ['<b>İyonlaşmada elektron değişir, proton sayısı kalır.</b>', 'Elektron veren katyon; elektron alan anyon oluşturur.', 'İzoelektronik: elektron sayısı ve dizilim aynı, proton sayıları farklı.'],
    nextLesson: { href: 'h1-atom-yaricapi.html', label: 'Sonraki: Atom yarıçapı ›' },
  });
})();
