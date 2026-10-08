/* D6 · BİY.9.1.4 c · Yazar notu: ders kitabı (MEB Biyoloji 9, s. 41) virüs için yalnızca "hücre tanımına tam uymaz,
   canlı ile cansız arasında, hücrelerden çok küçük ve basit" der; yapı ve çoğalmayı s. 42'deki karekodlu videoya bırakır.
   Video giriş istediği için açılamadı. Kullanıcı kararıyla (8 Ekim 2026) yapı, çoğalma, hastalık örnekleri ve canlı/cansız
   karşılaştırması programın istediği genellikte, kitap dışı genel biyoloji bilgisinden yazıldı (plan/biyoloji/yasam/PLAN.md
   bölüm 13). Programın sınırı: virüs çeşitleri, çoğalma döngülerinin adları ve bağışıklık anlatılmaz. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.D, IKINCI = 'var(--c2)', GEN = 'var(--c4)';

  const altigen = (x, y, r) => [0, 1, 2, 3, 4, 5].map((k) => {
    const a = Math.PI / 6 + k * Math.PI / 3;
    return (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1);
  }).join(' ');
  /* Genetik madde: kılıfın içindeki kıvrık iplik. */
  function iplik(c, p, x, y, r) {
    return c.S('path', { d: `M ${x - .5 * r} ${y} Q ${x - .25 * r} ${y - .6 * r} ${x} ${y} Q ${x + .25 * r} ${y + .6 * r} ${x + .5 * r} ${y}`,
      fill: 'none', stroke: GEN, 'stroke-width': Math.max(3, r / 12), 'stroke-linecap': 'round' }, p);
  }
  function kilif(c, p, x, y, r) {
    return c.S('polygon', { points: altigen(x, y, r), fill: '#2a2440', stroke: IKINCI, 'stroke-width': Math.max(3, r / 14), 'stroke-linejoin': 'round' }, p);
  }
  function virus(c, p, x, y, r) { const g = c.S('g', {}, p); kilif(c, g, x, y, r); iplik(c, g, x, y, r); return g; }
  /* Bakteriyofaj: baş (kılıf + genetik madde), kuyruk, ayaklar. Ayak ucu (0,0) noktasındadır. */
  function faj(c, p, o = {}) {
    const g = c.S('g', {}, p), cz = { stroke: IKINCI, 'stroke-width': 4, 'stroke-linecap': 'round' };
    c.S('line', { x1: 0, y1: -42, x2: 0, y2: -8, ...cz }, g);
    c.S('line', { x1: 0, y1: -8, x2: -26, y2: 0, ...cz }, g); c.S('line', { x1: 0, y1: -8, x2: 26, y2: 0, ...cz }, g);
    kilif(c, g, 0, -70, 30);
    if (!o.bos) g.ip = iplik(c, g, 0, -70, 30);
    return g;
  }
  const koy = (g, x, y, s = 1) => g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  const tasi = (c, g, x1, y1, x2, y2, ms, s = 1) => c.tween(ms, (e) => koy(g, x1 + (x2 - x1) * e, y1 + (y2 - y1) * e, s));

  /* ---- Sahne 1 · Virüs bir hücre mi? ---- */
  async function hucre(c) {
    const s = c.svg(1000, 562), h = c.S('g', {}, s);
    c.S('ellipse', { cx: 300, cy: 250, rx: 200, ry: 140, fill: '#244d3e', stroke: R, 'stroke-width': 5 }, h);
    K.yazi(c, h, 300, 445, 'Hücre', { renk: R });
    await K.belir(c, h);
    await c.say('Bütün canlılar bir ya da daha fazla hücreden oluşur.');
    const ic = c.S('g', {}, s);
    [[205, 215], [240, 195], [250, 240], [215, 255], [275, 215]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: GEN }, ic));
    K.yazi(c, ic, 240, 170, 'Ribozom', { size: 24 });
    K.yazi(c, ic, 370, 320, 'Sitoplazma', { size: 24 });
    K.yazi(c, ic, 300, 95, 'Hücre zarı', { size: 24 });
    await K.belir(c, ic, 350);
    await c.say('Hücrenin zarı, sitoplazması ve protein üreten ribozomları vardır.');
    await c.say('Hücre besin alır, enerji üretir, büyür ve bölünerek çoğalır.');
    const v = c.S('g', {}, s); virus(c, v, 780, 250, 24); K.yazi(c, v, 780, 445, 'Virüs', { renk: IKINCI });
    await K.belir(c, v);
    await c.say('Virüs ise bir hücre değildir; hücreden çok daha küçük ve basittir.');
    await c.choice({ tag: 'Tahmin et', q: 'Virüs hücreden çok küçüktür. Bu, tek başına cansız olduğunu gösterir mi?',
      options: ['Evet, küçük olan cansızdır.', 'Hayır, boyut canlılığın ölçütü değildir.', 'Evet, hücre olmayan her şey küçüktür.'], answer: 1,
      hints: ['Bakteriler de çok küçüktür ama canlıdır.', '', 'Bir kum tanesi de hücre değildir; soru boyutla ilgili.'],
      right: 'Canlılık boyutla değil, yapı ve yaşam süreçleriyle değerlendirilir.' });
    await c.say('Karar için virüsün yapısına ve nasıl çoğaldığına bakmak gerekir.');
    c.note('<b>Virüs hücre değildir.</b><br>Hücreden çok daha küçük ve basittir.', 'Virüs');
  }

  /* ---- Sahne 2 · Virüsün yapısı ---- */
  async function yapi(c) {
    const s = c.svg(1000, 562), X = 250, Y = 255, r = 105;
    const zarf = c.S('g', {}, s), govde = c.S('g', {}, s), et = c.S('g', {}, s);
    const kap = kilif(c, govde, X, Y, r), ip = iplik(c, govde, X, Y, r);
    await K.belir(c, govde);
    await c.say('Bir virüsün yapısında iki temel kısım bulunur.');
    const etiket = (y, metin, x1, y1, renk) => { const g = c.S('g', {}, et); K.cizgi(c, g, x1, y1, 470, y - 9, renk, { width: 2 }); K.yazi(c, g, 485, y, metin, { hiza: 'start', size: 28, renk }); return g; };
    kap.style.opacity = .35;
    await K.belir(c, etiket(190, 'Genetik madde: DNA ya da RNA', X + 40, Y - 20, GEN), 350);
    await c.say('Ortada genetik madde vardır: DNA ya da RNA.', { speak: 'Ortada genetik madde vardır: de ne a ya da re ne a.' });
    await c.say('Genetik madde, yeni virüslerin nasıl yapılacağının bilgisini taşır.');
    kap.style.opacity = 1; ip.style.opacity = .35;
    await K.belir(c, etiket(290, 'Protein kılıf: kapsit', X + r * .87, Y + 30, IKINCI), 350);
    await c.say('Genetik maddeyi saran protein kılıfa kapsit denir.', { speak: 'Genetik maddeyi saran protein kılıfa [short pause] kapsit denir.' });
    ip.style.opacity = 1;
    c.S('circle', { cx: X, cy: Y, r: r + 38, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 4, 'stroke-dasharray': '10 8' }, zarf);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; c.S('circle', { cx: X + (r + 52) * Math.cos(a), cy: Y + (r + 52) * Math.sin(a), r: 7, fill: 'var(--muted)' }, zarf); }
    await K.belir(c, zarf);
    await K.belir(c, etiket(390, 'Zarf: bazı virüslerde', X + (r + 38) * .8, Y + (r + 38) * .6, 'var(--muted)'), 350);
    await c.say('Bazı virüslerde kılıfın dışında bir de zarf bulunur.');
    et.remove();
    await K.belir(c, K.kart(c, s, 510, 110, 410, 290, 'Virüste yok', ['Sitoplazma', 'Ribozom', 'Enerji üreten yapı'], { renk: R }));
    await c.say('Virüste sitoplazma, ribozom ve enerji üreten yapılar yoktur.');
    await c.say('Oysa bir hücrede proteinleri ribozomlar üretir.');
    await c.choice({ q: 'Ribozomu olmayan bir virüs, kılıf proteinini kendi başına üretebilir mi?',
      options: ['Evet, genetik maddesi yeter.', 'Hayır, bir hücrenin ribozomuna muhtaçtır.', 'Evet, proteini dışarıdan hazır alır.'], answer: 1,
      hints: ['Genetik madde bilgidir; proteini üretecek yapı da gerekir.', '', 'Virüs beslenmez; dışarıdan madde almaz.'],
      right: 'Virüs bilgiyi taşır ama üretimi yapacak yapısı yoktur.' });
    await c.say('Bu yüzden virüs, tek başınayken hiçbir yaşamsal faaliyet göstermez.', { speak: '[thoughtful] Bu yüzden virüs, tek başınayken hiçbir yaşamsal faaliyet göstermez.' });
    c.note('<b>Virüs = genetik madde + protein kılıf.</b><br>Ribozomu ve enerji üreten yapısı yoktur.', 'Virüsün yapısı');
  }

  /* ---- Sahne 3 · Virüs nasıl çoğalır? ---- */
  async function cogal(c) {
    const s = c.svg(1000, 562), bak = c.S('g', {}, s);
    const govde = c.S('rect', { x: 110, y: 250, width: 480, height: 220, rx: 110, fill: '#244d3e', stroke: R, 'stroke-width': 5 }, bak);
    [[190, 330], [215, 400], [500, 330], [520, 395], [250, 300]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: R, opacity: .7 }, bak));
    K.yazi(c, bak, 350, 515, 'Bakteri', { size: 26, renk: R });
    await K.belir(c, bak);
    await c.say('Virüs yalnızca canlı bir hücrenin içinde çoğalabilir.');
    const f = faj(c, s); koy(f, 350, 150); K.yazi(c, s, 175, 110, 'Bakteriyofaj', { size: 26, renk: IKINCI });
    await K.belir(c, f);
    await c.say('Örneğimiz bakteriyofaj: bakterilerin içinde çoğalan bir virüs.');
    const adim = (i, metin) => K.belir(c, K.yazi(c, s, 670, 220 + i * 52, (i + 1) + ' · ' + metin, { hiza: 'start', size: 27 }), 300);
    await tasi(c, f, 350, 150, 350, 250, 700);
    await adim(0, 'Tutunma');
    await c.say('Önce virüs, kendine uygun hücrenin yüzeyine tutunur.');
    const gen = c.S('g', {}, s); iplik(c, gen, 0, 0, 30); koy(gen, 350, 180); f.ip.style.opacity = 0;
    await tasi(c, gen, 350, 180, 350, 345, 800);
    await adim(1, 'Aktarma');
    await c.say('Sonra genetik maddesini hücrenin içine aktarır.');
    await c.choice({ tag: 'Tahmin et', q: 'Virüsün genetik bilgisi artık hücrenin içinde. Yeni virüs parçalarını kim üretir?',
      options: ['Virüs, hücreden bağımsız olarak', 'Hücrenin ribozomları ve enerjisi', 'Hücrenin çevresindeki su'], answer: 1,
      hints: ['Virüsün ribozomu ve enerji üreten yapısı yoktu.', '', 'Su bir molekül üretemez; üretimi bir yapı yapar.'],
      right: 'Virüs bilgiyi verir; üretimi hücrenin kendi yapıları yapar.' });
    const parca = c.S('g', {}, s);
    [[230, 320], [290, 395], [240, 420]].forEach(([x, y]) => iplik(c, parca, x, y, 26));
    [[440, 320], [500, 400], [420, 410]].forEach(([x, y]) => kilif(c, parca, x, y, 22));
    await K.belir(c, parca, 600);
    await adim(2, 'Üretim');
    await c.say('Hücre, bu bilgiye göre yeni genetik madde ve kılıf proteini üretir.');
    parca.remove(); gen.remove();
    const yeni = [[230, 430], [350, 440], [470, 430]].map(([x, y]) => { const g = faj(c, s); koy(g, x, y, .75); return g; });
    await Promise.all(yeni.map((g) => K.belir(c, g, 500)));
    await adim(3, 'Birleşme');
    await c.say('Üretilen parçalar birleşir ve yeni virüsler oluşur.');
    govde.setAttribute('stroke-dasharray', '14 12');
    await c.tween(700, (e) => {
      bak.style.opacity = 1 - .6 * e;
      koy(yeni[0], 230 - 150 * e, 430 - 190 * e, .75); koy(yeni[1], 350 + 190 * e, 440 - 330 * e, .75); koy(yeni[2], 470 + 120 * e, 430 + 60 * e, .75);
    });
    await adim(4, 'Çıkış');
    await c.say('Yeni virüsler hücreden çıkar; hücre çoğu zaman zarar görür ya da parçalanır.');
    await c.say('Çıkan her virüs, yeni bir hücreye tutunup aynı döngüyü başlatabilir.');
    c.note('<b>Virüs yalnızca canlı hücrede çoğalır.</b><br>Bilgiyi virüs verir, parçaları hücre üretir.', 'Çoğalma');
  }

  /* ---- Sahne 4 · Hastalık ve fırsat ---- */
  async function hedef(c) {
    const s = c.svg(1000, 562);
    const satir = (y, a, b, f) => { const g = c.S('g', {}, s); if (f) koy(faj(c, g), 120, y + 22, .5); else virus(c, g, 120, y - 10, 20);
      K.yazi(c, g, 170, y, a, { hiza: 'start', size: 28, renk: IKINCI }); K.ok(c, g, 400, y - 10, 470, y - 10, 'var(--muted)'); K.yazi(c, g, 495, y, b, { hiza: 'start', size: 28 }); return g; };
    await c.say('Her virüs her hücreye tutunamaz; yalnızca kendine uygun hücreye tutunur.');
    await K.belir(c, satir(110, 'Grip virüsü', 'Solunum yolu hücresi'), 350);
    await K.belir(c, satir(190, 'Kuduz virüsü', 'Sinir hücresi'), 350);
    await c.say('Grip virüsü solunum yolu hücrelerinde, kuduz virüsü sinir hücrelerinde çoğalır.');
    await c.say('Çoğalırken hücrelere zarar verdikleri için virüsler hastalığa yol açar.');
    const hasta = K.kart(c, s, 110, 330, 780, 150, 'Virüs hastalıkları', ['Grip, kızamık, suçiçeği, kuduz, COVID-19'], { renk: IKINCI });
    await K.belir(c, hasta);
    await c.say('Grip, kızamık, suçiçeği, kuduz ve COVID-19 virüslerin neden olduğu hastalıklardır.', { speak: 'Grip, kızamık, suçiçeği, kuduz ve kovid on dokuz virüslerin neden olduğu hastalıklardır.' });
    await K.belir(c, satir(270, 'Bakteriyofaj', 'Bakteri', true), 350);
    await c.say('Bakteriyofaj ise insan hücresine tutunamaz; yalnızca bakterilerde çoğalır.');
    await c.choice({ q: 'Bakteriyofaj bakteriyi parçalar ama insan hücresine tutunamaz. Bu özellik neye yarayabilir?',
      options: ['Hastalık yapan bakterileri yok etmeye', 'İnsan hücrelerini çoğaltmaya', 'Virüs hastalıklarını bulaştırmaya'], answer: 0,
      hints: ['', 'Faj insan hücresine giremez; onu çoğaltamaz.', 'Faj insan hücresine tutunamadığı için hastalık bulaştırmaz.'],
      right: 'Bakteriyofajlar, zararlı bakterilere karşı tedavide kullanılabilir.' });
    hasta.remove();
    await K.belir(c, K.kart(c, s, 110, 330, 780, 150, 'Bakteriyofaj', ['Dirençli bakterilere karşı tedavi fırsatı'], { renk: R }));
    await c.say('Antibiyotiğe dirençli bakterilerde bakteriyofajlar alternatif bir tedavi fırsatı sunar.');
    c.note('<b>Her virüs kendine uygun hücrede çoğalır.</b><br>Bakteriyofaj yalnızca bakterileri hedefler.', 'Hedef hücre');
  }

  /* ---- Sahne 5 · Canlı mı, cansız mı? ---- */
  async function sinir(c) {
    const s = c.svg(1000, 562);
    virus(c, s, 500, 55, 24);
    K.kart(c, s, 60, 100, 410, 290, 'Cansıza benzer', [], { renk: 'var(--muted)' });
    K.kart(c, s, 530, 100, 410, 290, 'Canlıya benzer', [], { renk: R });
    const ekle = (sol, i, metin) => K.belir(c, K.yazi(c, s, sol ? 265 : 735, 215 + i * 55, metin, { size: 27 }), 350);
    await c.say('Şimdi virüsü canlıların ortak özellikleriyle karşılaştıralım.', { speak: '[curious] Şimdi virüsü canlıların ortak özellikleriyle karşılaştıralım.' });
    await ekle(true, 0, 'Hücresi yok');
    await c.say('Canlılar hücreden oluşur; virüsün hücresel yapısı yoktur.');
    await ekle(true, 1, 'Metabolizması yok');
    await c.say('Virüs beslenmez, enerji üretmez, boşaltım yapmaz ve büyümez.');
    await ekle(true, 2, 'Tek başına çoğalamaz');
    await c.say('Hücre dışındayken çoğalamaz; cansız bir madde gibi durur.');
    await c.choice({ q: 'Virüsün canlılara benzeyen yanı hangisidir?',
      options: ['Kendi enerjisini üretmesi', 'Genetik madde taşıması ve hücrede çoğalması', 'Hücrelerden oluşması'], answer: 1,
      hints: ['Virüste enerji üreten yapı yoktu.', '', 'Virüs bir hücre değildi.'],
      right: 'Genetik madde ve çoğalma, canlılarla ortak özellikleridir.' });
    await ekle(false, 0, 'Genetik maddesi var');
    await c.say('Virüs, canlılar gibi genetik madde taşır: DNA ya da RNA.', { speak: 'Virüs, canlılar gibi genetik madde taşır: de ne a ya da re ne a.' });
    await ekle(false, 1, 'Hücrede çoğalır');
    await c.say('Uygun hücrenin içinde çoğalır ve özelliklerini yeni virüslere aktarır.');
    await ekle(false, 2, 'Zamanla değişebilir');
    await c.say('Genetik maddesi zamanla değişebilir; yeni virüs çeşitleri böyle ortaya çıkar.');
    await K.belir(c, K.yazi(c, s, 500, 455, 'Canlı ile cansız arasında', { renk: IKINCI }), 350);
    await c.say('Virüs hücre dışında cansız gibi durur, hücre içinde canlıya benzer.');
    await c.say('Bu yüzden virüsler ne canlı ne de cansız olarak sınıflandırılır.', { speak: '[thoughtful] Bu yüzden virüsler ne canlı ne de cansız olarak sınıflandırılır.' });
    c.note('<b>Virüs: canlı ile cansız arasında.</b><br>Hücre dışında cansız gibi; yalnızca hücre içinde çoğalır.', 'Canlılık sınırı');
  }

  Ders.start({
    id: 'yasam-d6', kicker: 'Konu D · Canlıların ortak özellikleri', title: 'Virüs ve canlılık sınırı', accent: R, back: 'index.html',
    intro: { title: 'Virüs ve canlılık sınırı', hook: 'Virüs çoğalır ve hastalık yapar. Peki canlı mıdır?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Virüs bir hücre mi?', goal: 'Virüsü hücreyle karşılaştır.', run: hucre },
      { title: 'Virüsün yapısı', goal: 'Genetik madde ile protein kılıfı tanı.', run: yapi },
      { title: 'Virüs nasıl çoğalır?', goal: 'Hücre içindeki çoğalmayı adım adım izle.', run: cogal },
      { title: 'Hastalık ve fırsat', goal: 'Virüsün hedef hücresini ve bakteriyofajı tanı.', run: hedef },
      { title: 'Canlı mı, cansız mı?', goal: 'Sınıflandırılamama nedenlerini açıkla.', run: sinir },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir virüsün yapısında hangisi bulunur?', options: ['Genetik madde ve protein kılıf', 'Ribozom ve sitoplazma', 'Enerji üreten yapılar'], answer: 0,
        why: ['Virüs, genetik madde ile onu saran protein kılıftan oluşur.', 'Ribozom ve sitoplazma hücrede bulunur, virüste yoktur.', 'Virüs kendi enerjisini üretemez.'], scene: 1 },
      { q: 'Virüsler neden canlı olarak sınıflandırılamaz?', options: ['Genetik maddeleri olmadığı için', 'Hücre dışında hiçbir yaşamsal faaliyet göstermedikleri için', 'Çok küçük oldukları için'], answer: 1,
        why: ['Virüslerin genetik maddesi vardır: DNA ya da RNA.', 'Hücresi ve metabolizması yoktur; tek başına çoğalamaz.', 'Boyut canlılığın ölçütü değildir.'], scene: 4 },
    ], summary: ['<b>Virüs = genetik madde + protein kılıf.</b>', 'Yalnızca canlı hücrede çoğalır; canlı ile cansız arasında yer alır.'],
    nextLesson: { href: 'e1-inorganik-ozellikler.html', label: 'Sonraki: Su ve minerallerin yaşamsal görevleri ›' },
  });
})();
