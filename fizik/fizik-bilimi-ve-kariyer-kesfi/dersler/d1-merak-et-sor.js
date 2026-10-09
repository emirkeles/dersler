/* D1 — Bilimsel araştırma merkezinde fizik: merak et, sor (FİZ.9.1.4 a, b)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/D-kariyer-kesfi.md
   Kurumlar programın saydığı sekizle sınırlıdır; bilgileri ders kitabından: s. 36 (CERN okuma parçası),
   s. 40–41 (kurumlar ve açılımları). Logo kullanılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, kart, etiket, yer, sec, sirayla, yol } = window.KIT;

  /* ---- 1. Kimler çalışır? ---- */
  async function kimler(c) {
    const svg = c.svg(1000, 562);
    const YER = 150;
    cizgi(c, svg, 40, YER, 960, YER, RENK.ince, 3);
    yol(c, svg, 'M120 150 v-34 h50 v34 M200 150 v-52 h36 v52 M760 150 v-28 h70 v28', { stroke: RENK.ince, 'stroke-width': 3 });
    yazi(c, svg, 500, 96, 'CERN', { size: 34, renk: RENK.kurum });
    const halka = c.S('ellipse', { cx: 500, cy: 352, rx: 330, ry: 128, fill: 'none', stroke: RENK.kurum, 'stroke-width': 6 }, svg);
    const km = yazi(c, svg, 500, 512, '27 km', { size: 24, renk: RENK.kurum });
    const derin = c.S('g', {}, svg);
    cizgi(c, derin, 500, YER + 6, 500, 218, RENK.cizgi, 2, { 'stroke-dasharray': '6 6' });
    yazi(c, derin, 514, 196, '100 m', { size: 22, hiza: 'start' });
    gizle(halka, km, derin);
    await c.say('Fizik araştırmaları büyük kurumlarda, büyük düzeneklerle yapılır.');
    await c.say('CERN, dünyanın en büyük parçacık fiziği laboratuvarıdır.', { speak: 'Sörn, dünyanın en büyük parçacık fiziği laboratuvarıdır.' });
    await belir(c, halka, 600); await belir(c, [km, derin]);
    await c.say('CERN’de 27 kilometrelik bir halka, yerin 100 metre altındadır.', { speak: 'Sörn’de yirmi yedi kilometrelik bir halka, yerin yüz metre altındadır.' });
    const p = c.S('circle', { r: 8, fill: RENK.fizik }, svg);
    await c.tween(2200, (e) => { const a = e * Math.PI * 4; p.setAttribute('cx', 500 + 330 * Math.cos(a)); p.setAttribute('cy', 352 + 128 * Math.sin(a)); }, Ders.ease.in);
    p.remove();
    await c.say('Halkada atom altı parçacıklar hızlandırılır ve çarpıştırılır.');
    await c.choice({
      tag: 'Tahmin et', q: 'Böyle bir araştırma merkezinde kimler çalışır?',
      options: ['Yalnızca fizikçiler', 'Farklı disiplinlerden uzmanlar birlikte', 'Yalnızca mühendisler'], answer: 1,
      hints: ['Halkayı kurmak, çalıştırmak ve veriyi çözmek tek uzmanlıkla olmaz.', '', 'Deneyi tasarlayan ve sonucu yorumlayan bilim insanları da gerekir.'],
      right: 'Evet. Fizikçiler başka disiplinlerden uzmanlarla birlikte çalışır.',
    });
    const D = [['fizik', 330, 320], ['kimya', 670, 320], ['biyoloji', 380, 400], ['mühendislik', 630, 400]].map(([ad, x, y]) => etiket(c, svg, x, y, ad, { renk: RENK.disiplin, size: 21 }).g);
    gizle(D);
    for (const d of D) await belir(c, d, 250);
    await c.say('Fizik, kimya, biyoloji ve mühendislik burada birlikte çalışır.');
    c.note('<b>Bilimsel araştırma merkezi:</b> bilim insanlarının birlikte deney ve araştırma yaptığı kurum', 'Anahtar kavram', 'arastirma-merkezi');
    await c.say('Böyle kurumlara <b>bilimsel araştırma merkezi</b> denir.');
  }

  /* ---- 2. Sekiz kurum ---- */
  const KURUM = {
    TUBITAK: ['TÜBİTAK', 'Türkiye Bilimsel ve Teknolojik Araştırma Kurumu'], TENMAK: ['TENMAK', 'Türkiye Enerji, Nükleer ve Maden Araştırma Kurumu'],
    MTA: ['MTA', 'Maden Tetkik ve Arama Genel Müdürlüğü'], TUA: ['TUA', 'Türkiye Uzay Ajansı'], ASELSAN: ['ASELSAN', 'Askerî Elektronik Sanayi'],
    CERN: ['CERN', 'Avrupa Nükleer Araştırma Merkezi'], NASA: ['NASA', 'Amerika Ulusal Havacılık ve Uzay Dairesi'], ESA: ['ESA', 'Avrupa Uzay Ajansı'],
  };
  const TR = ['TUBITAK', 'TENMAK', 'MTA', 'TUA', 'ASELSAN'], DUNYA = ['CERN', 'NASA', 'ESA'];
  const IS1 = [
    { k: 'TUA', metin: 'Uzay ve havacılık teknolojileri üzerine çalışır.', gerekce: 'TUA, bir devlet kuruluşudur.' },
    { k: 'MTA', metin: 'Maden ve enerji arar; jeoloji ve jeofizik çalışması yapar.', gerekce: 'MTA deniz araştırmaları da yapar.' },
    { k: 'TENMAK', metin: 'Nükleer teknoloji, radyasyon ve parçacık hızlandırıcılar üzerine çalışır.', gerekce: 'TENMAK’ta fizikçiler nükleer santrallerin güvenliği üzerine de çalışır.' },
    { k: 'ASELSAN', metin: 'Haberleşme, radar ve insansız sistemler geliştirir.', gerekce: 'ASELSAN’da fizikçiler ve fizik mühendisleri de çalışır.' },
    { k: 'TUBITAK', metin: 'Araştırmaları destekler; burs, ödül ve proje fonu sağlar.', gerekce: 'TÜBİTAK’ta fizikçiler temel ve uygulamalı araştırma yapar.' },
  ];
  const IS2 = [
    { k: 'CERN', metin: 'Atom altı parçacıkları parçacık hızlandırıcılarla inceler.', gerekce: 'CERN, dünyanın en büyük parçacık fiziği laboratuvarıdır.' },
    { k: 'NASA', metin: 'ABD’de uzay çalışmalarını ve programlarını yürütür.', gerekce: 'Burada fizikçiler ve astrofizikçiler gezegen, yıldız ve galaksileri araştırır.' },
    { k: 'ESA', metin: 'Uzayın keşfi için Paris’te kurulan hükûmetler arası kuruluştur.', gerekce: 'ESA’da da fizikçiler ve astrofizikçiler çalışır.' },
  ];
  async function sekizKurum(c) {
    const svg = c.svg(1000, 562);
    const E = {};
    const sira = (ids, y, xs) => ids.forEach((id, i) => { E[id] = etiket(c, svg, xs[i], y, KURUM[id][0], { renk: RENK.kurum, size: 23, w: 160, h: 56 }); E[id].g.style.opacity = 0; });
    const b1 = yazi(c, svg, 500, 268, 'Türkiye', { size: 19, renk: RENK.soluk, kalin: 500 });
    sira(TR, 320, [120, 310, 500, 690, 880]);
    const b2 = yazi(c, svg, 500, 418, 'dünya', { size: 19, renk: RENK.soluk, kalin: 500 });
    sira(DUNYA, 470, [310, 500, 690]);
    gizle(b1, b2);
    let k = null;
    const tur = (ids, isler) => sirayla(c, isler, {
      tag: 'Hangi kurum?', soru: 'Bu işi hangi kurum yapar?',
      secenekler: () => ids.map((id) => `<b>${KURUM[id][0]}</b> · ${KURUM[id][1]}`), dogru: (o) => ids.indexOf(o.k),
      ipucu: () => 'Açılımlara bak: kurumun adı yaptığı işi söyler.', gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 150, 40, 700, 150, { metin: o.metin, renk: RENK.kurum, size: 24 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => {
        const e = E[o.k];
        await c.tween(600, (t) => { yer(k.g, 150 + (e.cx - 150 - 70) * t, 40 + (e.cy - 40 - 15) * t, 1 - 0.8 * t); k.g.style.opacity = Math.max(0, 1 - 2.2 * t); });
        k.g.remove();
        e.kutu.setAttribute('stroke', RENK.iyi);
      },
      bekle: 1300,
    });
    await belir(c, [b1, ...TR.map((id) => E[id].g)]);
    await c.say('Türkiye’den beş kurumun açılımı, yaptığı işi söylüyor.');
    c.say('Bu işi hangi kurum yapar?', { noWait: true });
    await tur(TR, IS1);
    await belir(c, [b2, ...DUNYA.map((id) => E[id].g)]);
    await c.say('Şimdi dünyadan üç kurum geliyor.');
    c.say('Bu işi hangi kurum yapar?', { noWait: true });
    await tur(DUNYA, IS2);
    await c.say('Sekiz kurumun hepsinde fizikle ilgili çalışma yapılıyor.');
  }

  /* ---- 3. Oku, merak et ---- */
  const PARCA = [
    'CERN, Fransa-İsviçre sınırında, Cenevre yakınlarındadır. Dünyanın en büyük parçacık hızlandırıcısı buradadır.',
    'Büyük Hadron Çarpıştırıcısı yerin 100 metre altındadır. Halka biçimindedir ve 27 km uzunluğundadır.',
    'Dokunmatik ekranlar, tıbbi görüntüleme teknolojileri ve World Wide Web CERN’de geliştirildi.',
  ];
  const MERAK = ['Çarpıştırıcı neden yerin altında?', 'CERN’de başka neler geliştirildi?', 'Orada hangi mesleklerden insanlar çalışır?'];
  async function okuMerakEt(c) {
    const svg = c.svg(1000, 562);
    await c.say('CERN hakkında üç parçalık kısa bir metin okuyacaksın.', { speak: 'Sörn hakkında üç parçalık kısa bir metin okuyacaksın.' });
    let k = null;
    for (let i = 0; i < PARCA.length; i++) {
      const eski = k;
      k = kart(c, svg, 130, 110, 740, 250, { baslik: `Okuma parçası ${i + 1}/3`, metin: PARCA[i], renk: RENK.kurum, size: 26, pad: 32 });
      gizle(k.g);
      if (eski) { await belir(c, eski.g, 200, 0); eski.g.remove(); }
      await belir(c, k.g, 300);
      c.say('Parçayı oku, sonra devam et.', { noWait: true });
      await c.cont(i < PARCA.length - 1 ? 'Okudum ›' : 'Okudum, bitti ›');
    }
    await belir(c, k.g, 250, 0); k.g.remove();
    await c.say('Metni okurken aklına bir şey takıldı mı?');
    const r = await sec(c, {
      tag: 'Merak et', q: 'Bu metinde en çok neyi merak ettin?', options: MERAK,
      right: ['Güzel. Bu, CERN’deki bir çalışmaya yönelik merak.', 'Güzel. Bu, CERN’deki çalışmalara yönelik merak.', 'Güzel. Bu, mesleklere yönelik merak.'],
    });
    const m = kart(c, svg, 150, 150, 700, 190, { baslik: 'Merak ettiğim konu', metin: MERAK[r.picked], renk: RENK.fizik, size: 28, pad: 32 });
    gizle(m.g); await belir(c, m.g);
    await c.say('Merak ettiğin konuyu belirlemek, araştırmanın ilk adımıdır.');
    c.clearAct();
  }

  /* ---- 4. Soruya çevir ---- */
  const SORULAR = [
    { metin: 'Büyük Hadron Çarpıştırıcısı neden yerin 100 metre altına kuruldu?', kutu: 0, gerekce: 'Soru, kurumda yapılan bir çalışmayı soruyor.' },
    { metin: 'Hangi meslek grubundan olsam CERN’de görev alabilirim?', kutu: 1, gerekce: 'Soru, orada çalışan meslekleri soruyor.' },
    { metin: 'TENMAK’ta fizikçiler hangi işleri yapar?', kutu: 1, gerekce: 'Soru, bir mesleğin yaptığı işi soruyor.' },
    { metin: 'ASELSAN sağlık alanında hangi cihazları geliştirdi?', kutu: 0, gerekce: 'Soru, kurumun bir çalışmasını soruyor.' },
  ];
  async function soruyaCevir(c) {
    const svg = c.svg(1000, 562);
    const K = [[60, 'çalışmaya yönelik soru'], [520, 'mesleğe yönelik soru']].map(([x, ad]) => {
      const cerceve = kutu(c, svg, x, 330, 420, 150, { renk: RENK.fizik });
      yazi(c, svg, x + 210, 378, ad, { size: 23, renk: RENK.fizik });
      return { cerceve, x, n: 0 };
    });
    await c.say('Merak, soruya çevrilince araştırılabilir.');
    c.say('Soru neye yönelik?', { noWait: true });
    let k = null;
    await sirayla(c, SORULAR, {
      tag: 'Soru sor', soru: 'Bu soru neye yönelik?', secenekler: () => ['Çalışmaya', 'Mesleğe'], dogru: (o) => o.kutu,
      ipucu: (o) => (o.kutu ? 'Soru bir işi değil, o işi yapan insanları soruyor.' : 'Soru insanları değil, kurumda yapılan işi soruyor.'), gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 150, 40, 700, 170, { metin: o.metin, renk: RENK.kurum, size: 25 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => {
        const h = K[o.kutu], x = h.x + 150 + h.n * 40;
        await c.tween(600, (e) => { yer(k.g, 150 + (x - 150) * e, 40 + (430 - 40) * e, 1 - 0.95 * e); k.g.style.opacity = 1 - e; });
        k.g.remove();
        c.S('circle', { cx: x + 20, cy: 432, r: 11, fill: RENK.iyi }, svg); h.n++;
      },
      bekle: 1200,
    });
    await c.say('Sorular ya bir çalışmaya ya da bir mesleğe yönelir.');
    c.note('<b>Merak et, soruya çevir.</b><br>Soru çalışmaya ya da mesleğe yönelir.', 'Soru sorma', 'soru-sorma');
    const mc = kart(c, svg, 150, 40, 700, 170, { baslik: 'Marie Curie', metin: 'Radyoaktivite üzerine araştırma yaptı.', renk: RENK.kisi, size: 26 });
    gizle(mc.g); await belir(c, mc.g);
    await c.choice({
      tag: 'Tahmin et', q: 'Marie Curie bugün yaşasaydı hangi kurumun çalışmalarına yakın dururdu?',
      options: ['MTA', 'TENMAK', 'TUA'], answer: 1,
      hints: ['MTA maden ve enerji arar.', '', 'TUA uzay ve havacılık üzerine çalışır.'],
      right: 'Kesin cevabı yok; ama TENMAK radyasyon ve nükleer teknoloji üzerine çalışır.',
    });
    await c.say('Aynı soruyu Cezeri ve Nikola Tesla için de sorabilirsin.');
    await c.say('İyi araştırma, iyi sorulmuş bir soruyla başlar.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-d1', kicker: 'Konu D · Fizik bilimi ile ilgili kariyer keşfi', title: 'Bilimsel araştırma merkezinde fizik: merak et, sor',
    accent: '#c792ff', back: 'index.html',
    intro: { title: 'Bilimsel araştırma merkezinde fizik: merak et, sor', hook: 'Bir araştırma merkezinde yalnızca fizikçiler mi çalışır?', button: 'Derse başla ›' },
    goals: ['Kurumlardaki fizikle ilişkili çalışmalara ve mesleklere yönelik merak ettiği konuyu belirler.', 'Merak ettiği konuya yönelik soru sorar.'],
    scenes: [
      { title: 'Kimler çalışır?', goal: 'Bir araştırma merkezinde disiplinlerin birlikte çalıştığını gör.', run: kimler },
      { title: 'Sekiz kurum', goal: 'Sekiz kurumu yaptığı işle eşleştir.', run: sekizKurum },
      { title: 'Oku, merak et', goal: 'Bir metinden merak ettiğin konuyu belirle.', run: okuMerakEt },
      { title: 'Soruya çevir', goal: 'Sorunun çalışmaya mı mesleğe mi yöneldiğini ayır.', run: soruyaCevir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Atom altı parçacıkları parçacık hızlandırıcılarla inceleyen kurum hangisi?', options: ['MTA', 'TUA', 'CERN'], answer: 2,
        why: ['MTA maden ve enerji arar.', 'TUA uzay ve havacılık teknolojileri üzerine çalışır.', 'Evet. CERN, dünyanın en büyük parçacık fiziği laboratuvarıdır.'], scene: 1 },
      { q: 'Hangisi mesleğe yönelik bir sorudur?', options: ['Büyük Hadron Çarpıştırıcısı kaç kilometredir?', 'TENMAK’ta fizikçiler hangi işleri yapar?', 'ESA hangi şehirde kuruldu?'], answer: 1,
        why: ['Bu soru bir cihazın özelliğini soruyor.', 'Evet. Soru, bir mesleğin yaptığı işi soruyor.', 'Bu soru kurumun yerini soruyor.'], scene: 3 },
      { q: 'Bir öğrenci TÜBİTAK hakkında okuduğu metinden üç soru çıkardı. Hangisi kurumda yapılan bir çalışmaya yöneliktir?',
        options: ['TÜBİTAK hangi araştırmalara proje fonu sağlıyor?', 'TÜBİTAK’ta hangi meslek grubundan olsam görev alabilirim?', 'TÜBİTAK’ın merkezi hangi şehirdedir?'], answer: 0,
        why: ['Evet. Soru, kurumun yaptığı bir işi soruyor: araştırmalara fon sağlamak.', 'Bu soru kurumdaki işi değil, orada çalışan meslekleri soruyor.', 'Bu soru kurumun yerini soruyor; yapılan bir işi sormuyor.'], scene: 3 },
      { q: 'Emre: “Bir araştırma merkezinde yalnızca fizikçiler çalışır; çünkü orada yapılan iş fizik araştırmasıdır.” Hangi bilgi Emre’nin yanıldığını gösterir?',
        options: ['Halka, yerin 100 metre altında ve 27 kilometre uzunluğundadır.', 'Fizik, kimya, biyoloji ve mühendislik bir arada çalışır.', 'CERN, dünyanın en büyük parçacık fiziği laboratuvarıdır.'], answer: 1,
        why: ['Bu bilgi doğru ama çalışanların kim olduğunu söylemez; Emre’yi çürütmez.', 'Evet. Düzeneği kurmak, çalıştırmak ve veriyi çözmek tek uzmanlıkla olmaz; farklı disiplinler birlikte çalışır.', 'Bu bilgi de doğru ama çalışanları söylemiyor. Fizik laboratuvarında fizikçinin yanında başka uzmanlar da çalışır.'], scene: 0 },
    ],
    summary: ['<b>İyi araştırma, iyi sorulmuş bir soruyla başlar.</b>', 'Bilimsel araştırma merkezlerinde farklı disiplinler <b>birlikte</b> çalışır.'],
    nextLesson: { href: 'd2-kaynaktan-meslege.html', label: 'Sonraki: Bu bilgi güvenilir mi? ›' },
  });
})();
