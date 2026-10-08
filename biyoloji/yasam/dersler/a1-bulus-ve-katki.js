/* A1 · BİY.9.1.1 a · Yazar notu: içerik MEB Biyoloji 9 s. 17 (biyolojinin önemi, dönüm noktası, penisilinin katkısı),
   s. 18–19 (Akşemseddin, kalıtım, antibiyotik, DNA çift sarmalı, rekombinant DNA, PZR, klonlama, insan genom projesi,
   CRISPR-Cas, yeni nesil aşılar), s. 21 (bulmaca tanımları), s. 84 (Fleming ve küflü kap), s. 144 (yenilenebilir enerji).
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): her buluşun
   hangi sorunu çözdüğü ya da neyi mümkün kıldığı sorudan önce anlatılır. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.A, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';
  const BAZ = ['#6ea8ff', '#f5b04c', '#3ddc97', '#c792ff'];
  const SIRA = [0, 2, 1, 3, 1, 0, 3, 2, 2, 1, 0, 3, 0, 3, 1, 2, 1, 2, 0, 3, 3, 0, 2, 1];
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  /* DNA dizisi: renkli kutulardan şerit */
  function dizi(c, p, x, y, n, o = {}) {
    const g = c.S('g', {}, p), w = o.w || 26, h = o.h || 30;
    for (let i = 0; i < n; i++) c.S('rect', { x: x + i * (w + 3), y, width: w, height: h, rx: 4, fill: o.fill || BAZ[SIRA[(i + (o.kay || 0)) % SIRA.length]] }, g);
    return g;
  }
  function sarmal(c, p, x0, x1, cy, A, tur) {
    const g = c.S('g', {}, p), N = 140, k = (tur * 2 * Math.PI) / (x1 - x0);
    const yol = (isaret) => Array.from({ length: N + 1 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / N;
      return `${i ? 'L' : 'M'} ${x.toFixed(1)} ${(cy + isaret * A * Math.sin(k * (x - x0))).toFixed(1)}`;
    }).join(' ');
    for (let i = 1; i < tur * 10; i++) {
      const x = x0 + ((x1 - x0) * i) / (tur * 10), d = A * Math.sin(k * (x - x0));
      if (Math.abs(d) > 14) c.S('line', { x1: x, y1: cy - d, x2: x, y2: cy + d, stroke: '#8f9bc0', 'stroke-width': 4 }, g);
    }
    c.S('path', { d: yol(1), fill: 'none', stroke: renk, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    c.S('path', { d: yol(-1), fill: 'none', stroke: IKINCI, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
    return g;
  }
  function bakla(c, p, x, y, olcek = 1) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${olcek})` }, p);
    c.S('path', { d: 'M -90 0 Q -70 -42 0 -42 Q 70 -42 90 0 Q 70 42 0 42 Q -70 42 -90 0 Z', fill: '#244d3e', stroke: YESIL, 'stroke-width': 3 }, g);
    [-48, -16, 16, 48].forEach((d) => c.S('circle', { cx: d, cy: 0, r: 15, fill: YESIL }, g));
    return g;
  }
  function insan(c, p, x, y, cizgi) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y - 72, r: 30, fill: '#394157', stroke: cizgi, 'stroke-width': 3 }, g);
    c.S('path', { d: `M ${x - 55} ${y + 70} Q ${x - 55} ${y - 30} ${x} ${y - 30} Q ${x + 55} ${y - 30} ${x + 55} ${y + 70} Z`, fill: '#394157', stroke: cizgi, 'stroke-width': 3 }, g);
    return g;
  }
  function koyun(c, p, x, y) {
    const g = c.S('g', { transform: `translate(${x} ${y})` }, p);
    [-30, -12, 12, 30].forEach((d) => c.S('rect', { x: d - 4, y: 18, width: 8, height: 34, rx: 3, fill: '#5b678f' }, g));
    [[-32, 0, 26], [0, -10, 30], [32, 0, 26], [-14, 12, 24], [16, 12, 24]].forEach(([a, b, r]) => c.S('circle', { cx: a, cy: b, r, fill: '#e8ecf7' }, g));
    c.S('ellipse', { cx: 60, cy: -14, rx: 17, ry: 22, fill: '#5b678f' }, g);
    return g;
  }

  /* ---- Sahne 1 · Küflü kap: penisilin ---- */
  async function kufluKap(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s), yan = c.S('g', {}, s);
    const CX = 290, CY = 285, R = 205, KX = CX + 70, KY = CY - 50;
    c.S('circle', { cx: CX, cy: CY, r: R, fill: '#1b2440', stroke: '#8f9bc0', 'stroke-width': 5 }, g);
    const uzak = c.S('g', {}, g), yakin = c.S('g', {}, g);
    for (let i = 0; i < 70; i++) {
      const rr = (R - 26) * Math.sqrt((i + 0.5) / 70), a = i * 2.39996;
      const x = CX + rr * Math.cos(a), y = CY + rr * Math.sin(a);
      c.S('circle', { cx: x, cy: y, r: 8 + (i % 3) * 2, fill: IKINCI }, Math.hypot(x - KX, y - KY) < 112 ? yakin : uzak);
    }
    const kapak = c.S('circle', { cx: CX, cy: CY, r: R + 10, fill: 'rgba(200,212,245,.12)', stroke: '#c9d2ee', 'stroke-width': 4 }, g);
    K.cizgi(c, yan, 470, 420, 600, 420, IKINCI);
    K.yazi(c, yan, 770, 430, 'Bakteri kolonileri', { size: 28, renk: IKINCI });
    await Promise.all([K.belir(c, g), K.belir(c, yan)]);
    await c.say('Alexander Fleming, laboratuvarında bakterileri yok etmenin yolunu arıyordu.', { speak: 'Aleksandır Fleming, laboratuvarında bakterileri yok etmenin yolunu arıyordu.' });
    await c.tween(700, (e) => { kapak.setAttribute('transform', `translate(${e * 300} ${-e * 70})`); kapak.style.opacity = 1 - e; });
    kapak.remove();
    await c.say('Tatile çıkarken içinde bakteri bulunan bir kabı açık unuttu.');
    const kuf = c.S('g', {}, g);
    [[0, 0, 40], [-30, -18, 22], [28, -22, 24], [34, 14, 22], [-8, 32, 24], [-36, 16, 20]].forEach(([a, b, r]) => c.S('circle', { cx: KX + a, cy: KY + b, r, fill: '#b9c7ae' }, kuf));
    [[-10, -8, 9], [14, 6, 8], [2, 20, 7], [-22, 10, 6], [20, -18, 7]].forEach(([a, b, r]) => c.S('circle', { cx: KX + a, cy: KY + b, r, fill: '#8fa184' }, kuf));
    const kufEtiket = c.S('g', {}, yan);
    K.cizgi(c, kufEtiket, KX + 45, KY - 30, 600, 150, '#b9c7ae');
    K.yazi(c, kufEtiket, 770, 160, 'Küf mantarı', { size: 28, renk: '#b9c7ae' });
    await Promise.all([K.belir(c, kuf), K.belir(c, kufEtiket)]);
    await c.say('Döndüğünde kaba bir küf mantarı yerleşmişti.');
    const halka = c.S('circle', { cx: KX, cy: KY, r: 108, fill: 'none', stroke: '#dfe6f7', 'stroke-width': 3, 'stroke-dasharray': '10 9', opacity: 0 }, g);
    const bos = c.S('g', {}, yan);
    K.cizgi(c, bos, KX + 100, KY + 45, 600, 290, '#dfe6f7');
    K.yazi(c, bos, 770, 300, 'Burada bakteri yok', { size: 28 });
    bos.style.opacity = 0;
    await c.tween(900, (e) => { yakin.style.opacity = 1 - e; halka.setAttribute('opacity', e); bos.style.opacity = e; });
    await c.say('Küfün çevresinde hiç bakteri yoktu; kabın kalanı bakteri doluydu.', { speak: '[curious] Küfün çevresinde hiç bakteri yoktu; kabın kalanı bakteri doluydu.' });
    await c.choice({ q: 'Küfün çevresinde neden bakteri yok?',
      options: ['Bakteriler kabın o bölümüne hiç ulaşmamış.', 'Küf, bakterilere besin sağlıyor.', 'Küf, bakterileri yok eden bir madde salgılıyor.'], answer: 2,
      hints: ['Bakteriler kabın her yanına yayılmış; boş kalan yalnızca küfün çevresi.', 'Besin sağlasaydı küfün çevresinde daha çok bakteri olurdu.', ''],
      right: 'Boşluk yalnızca küfün çevresinde; bakterileri yok eden şey küften geliyor.' });
    bos.remove();
    const pen = c.S('g', {}, yan);
    K.cizgi(c, pen, KX + 100, KY + 45, 600, 290, renk);
    K.yazi(c, pen, 770, 285, 'Penisilin', { size: 32, renk, kalin: 700 });
    K.yazi(c, pen, 770, 325, 'bakterileri yok eder', { size: 26 });
    halka.setAttribute('stroke', renk);
    await K.belir(c, pen, 350);
    await c.say('Fleming, bakterileri yok eden bu maddeye penisilin adını verdi.');
    await Promise.all([sil(c, g), sil(c, yan)]);
    const son = c.S('g', {}, s);
    await K.belir(c, K.kart(c, son, 150, 50, 700, 150, 'Antibiyotik', ['Bakteri kaynaklı hastalıkları tedavi eden ilaç'], { renk }));
    await c.say('Penisilin ilk antibiyotiktir; antibiyotikler bakteri kaynaklı hastalıkları tedavi eder.');
    await K.belir(c, K.yazi(c, son, 500, 265, 'Ölümcül hastalıklar kontrol altında', { size: 28 }), 350);
    await c.say('Önceden ölümcül olan birçok hastalık penisilinle kontrol altına alındı.');
    await K.belir(c, K.yazi(c, son, 500, 320, 'Ameliyatlar daha güvenli', { size: 28 }), 350);
    await c.say('Ameliyatlar ve başka tedaviler de daha güvenli hâle geldi.');
    await K.belir(c, K.kart(c, son, 150, 380, 700, 140, 'Dönüm noktası', ['Yaşamı değiştirir, araştırmalara yön verir'], { renk: IKINCI }));
    await c.say('Yaşamı böyle değiştiren ve sonraki araştırmalara yön veren buluşlara dönüm noktası denir.',
      { speak: 'Yaşamı böyle değiştiren ve sonraki araştırmalara yön veren buluşlara [short pause] dönüm noktası denir.' });
    c.note('<b>Dönüm noktası: yaşamı değiştiren, araştırmalara yön veren buluş.</b><br>Penisilin, ilk antibiyotik.', 'Dönüm noktası');
  }

  /* ---- Sahne 2 · Mikroptan aşıya ---- */
  async function asi(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    insan(c, g, 150, 300, renk); insan(c, g, 420, 300, renk);
    K.yazi(c, g, 285, 90, 'Akşemseddin', { size: 32, renk, kalin: 700 });
    await K.belir(c, g);
    await c.say('Penisilinden yüzyıllar önce hekim Akşemseddin önemli bir düşünce ileri sürdü.');
    const mikrop = c.S('g', {}, g);
    const noktalar = [[0, -20], [14, 8], [-12, 22], [26, -30], [-24, -4]].map(([a, b]) => c.S('ellipse', { cx: 215 + a, cy: 250 + b, rx: 9, ry: 6, fill: IKINCI }, mikrop));
    const dusunce = K.kart(c, g, 570, 150, 380, 230, 'Düşüncesi', ['Hastalıklar', 'mikroorganizmalarla', 'bulaşabilir'], { renk });
    dusunce.style.opacity = 0;
    await c.tween(1100, (e) => { noktalar.forEach((n, i) => n.setAttribute('transform', `translate(${e * (120 + i * 6)} ${Math.sin(e * Math.PI) * -18})`)); dusunce.style.opacity = e; });
    await c.say('Ona göre hastalıklar, mikroorganizmalar aracılığıyla bulaşabilirdi.');
    await K.belir(c, K.yazi(c, g, 500, 480, 'Mikroorganizma: gözle görülemeyen küçük canlı', { size: 28, renk: IKINCI }), 350);
    await c.say('Mikroorganizmalar, bakteriler gibi gözle görülemeyecek kadar küçük canlılardır.');
    await c.say('Akşemseddin, mikroorganizmaların hastalıklardaki rolünü ortaya koyan öncü hekimlerden biridir.');
    await sil(c, g);
    const h = c.S('g', {}, s);
    await K.belir(c, K.kart(c, h, 60, 150, 400, 220, 'COVID-19', ['Bir virüsün yol açtığı', 'pandemi'], { renk: IKINCI }));
    await c.say('Her hastalığa bakteri yol açmaz; COVID-19’a bir virüs yol açtı.',
      { speak: 'Her hastalığa bakteri yol açmaz; kovid on dokuza bir virüs yol açtı.' });
    const sag = c.S('g', {}, h);
    K.ok(c, sag, 475, 260, 525, 260, renk);
    const asiKart = K.kart(c, sag, 540, 150, 400, 220, 'Yeni nesil aşılar', ['Pandemi kontrol altında'], { renk });
    await K.belir(c, sag);
    await c.say('Bu pandemi, yeni nesil aşılarla kontrol altına alındı.');
    await K.belir(c, K.yazi(c, asiKart, 740, 288, 'Kanser tedavisinde umut', { size: 28 }), 350);
    await c.say('Aynı aşı teknolojisi kanser tedavisi için de umut verici sonuçlar verdi.');
    await c.choice({ tag: 'Uygula', q: 'Yeni bir salgına bir virüsün yol açtığı anlaşıldı. Penisilin bu salgını durdurur mu?',
      options: ['Hayır; penisilin bakteri kaynaklı hastalıkları tedavi eder.', 'Evet; penisilin bütün hastalıkları tedavi eder.', 'Evet; penisilin de bir aşıdır.'], answer: 0,
      hints: ['', 'Penisilin bakterileri yok eder; bu salgına bir virüs yol açıyor.', 'Penisilin aşı değil, antibiyotiktir.'],
      right: 'Penisilin bakterilere karşı etkilidir; bu salgının nedeni bir virüs.' });
    await c.say('Her buluş belirli bir sorunu çözer; bütün sorunları birden değil.', { speak: '[thoughtful] Her buluş belirli bir sorunu çözer; bütün sorunları birden değil.' });
    c.note('<b>Her buluş belirli bir sorunu çözer.</b><br>Antibiyotik bakteriye, aşı salgına karşı.', 'Buluş ve sorun');
  }

  /* ---- Sahne 3 · Kalıtım ve DNA’nın yapısı ---- */
  async function kalitim(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const nesil = c.S('g', {}, g);
    bakla(c, nesil, 440, 175); bakla(c, nesil, 680, 175);
    K.yazi(c, nesil, 190, 185, 'Ebeveyn', { size: 28 });
    [380, 560, 740].forEach((x) => bakla(c, nesil, x, 365, 0.8));
    K.yazi(c, nesil, 190, 375, 'Yavrular', { size: 28 });
    await K.belir(c, nesil);
    await c.say('Yavrular ebeveynlerine benzer; peki özellikler nasıl aktarılır?', { speak: '[curious] Yavrular ebeveynlerine benzer; peki özellikler nasıl aktarılır?' });
    const alt = K.yazi(c, g, 500, 490, 'Mendel: bezelyelerle çalıştı', { size: 28 });
    await K.belir(c, alt, 350);
    await c.say('Gregor Mendel bu soruyu bezelyelerle çalışarak araştırdı.');
    const aktar = c.S('g', {}, g);
    K.ok(c, aktar, 560, 235, 560, 300, YESIL);
    await K.belir(c, aktar, 350);
    await c.say('Bazı özelliklerin ebeveynden yavruya belirli kalıplarla aktarıldığını gösterdi.');
    await K.belir(c, K.yazi(c, g, 500, 75, 'Kalıtım: özelliklerin nesilden nesile aktarılması', { size: 28, renk: YESIL }), 350);
    await c.say('Bu, özelliklerin nesilden nesile aktarılmasının, yani kalıtımın ilk açıklamasıydı.');
    alt.textContent = 'Bilgi hücrede nasıl saklanır?'; alt.style.fill = IKINCI;
    await K.belir(c, alt, 350);
    await c.say('Ama aktarılan bilginin hücrede nasıl saklandığı henüz bilinmiyordu.');
    await sil(c, g);
    const d = c.S('g', {}, s);
    K.yazi(c, d, 500, 80, 'DNA: kalıtsal bilgiyi taşıyan molekül', { size: 30 });
    const duz = c.S('g', {}, d);
    K.cizgi(c, duz, 150, 250, 850, 250, renk, { width: 7 }); K.cizgi(c, duz, 150, 290, 850, 290, IKINCI, { width: 7 });
    await K.belir(c, d);
    await c.say('Kalıtsal bilgiyi DNA adlı molekül taşır.', { speak: 'Kalıtsal bilgiyi de ne a adlı molekül taşır.' });
    duz.remove();
    await K.belir(c, sarmal(c, d, 150, 850, 270, 75, 2.5), 700);
    await K.belir(c, K.yazi(c, d, 500, 420, 'Çift sarmal', { size: 32, renk, kalin: 700 }), 350);
    await c.say('DNA’nın kendi etrafında dönen bir çift sarmal olduğu bulundu.', { speak: 'De ne a’nın kendi etrafında dönen bir çift sarmal olduğu bulundu.' });
    await K.belir(c, K.yazi(c, d, 500, 480, 'Kalıtsal bilgi hücrede böyle saklanır', { size: 28 }), 350);
    await c.say('Böylece kalıtsal bilginin hücrede nasıl saklandığı ortaya çıktı.');
    await c.say('Bu buluş genetikte yeni bir çağ başlattı.');
    await c.choice({ tag: 'Uygula', q: 'Kalıtımın açıklanması ve DNA’nın yapısı bir hastalığı tedavi etmedi. Neden dönüm noktası sayılırlar?',
      options: ['Bezelye üretimini artırdıkları için', 'Canlıyı anlama biçimini değiştirip sonraki araştırmalara yön verdikleri için', 'Aslında dönüm noktası sayılmazlar.'], answer: 1,
      hints: ['Mendel bezelyeyi üretmek için değil, kalıtımı anlamak için kullandı.', '', 'Dönüm noktası yalnızca tedavi demek değildir; araştırmalara yön vermesi yeter.'],
      right: 'Bu iki buluş kalıtımı anlaşılır kıldı ve genetik araştırmalarının yolunu açtı.' });
    c.note('<b>Kalıtım: özelliklerin nesilden nesile aktarılması.</b><br>Bilgi DNA’da, çift sarmalda saklanır.', 'Kalıtım ve DNA');
  }

  /* ---- Sahne 4 · Çoğalt, aktar, kopyala ---- */
  async function teknikler(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const ad = (p, y, fiil, isim) => { K.yazi(c, p, 760, y - 8, fiil, { size: 32, renk, kalin: 700 }); K.yazi(c, p, 760, y + 34, isim, { size: 28 }); };
    const tek = c.S('g', {}, g);
    dizi(c, tek, 80, 95, 5);
    K.yazi(c, tek, 152, 165, 'DNA dizisi', { size: 26, renk: SOLUK });
    await K.belir(c, tek);
    await c.say('DNA’nın yapısı bulunduktan sonra DNA ile çalışan teknikler geliştirildi.',
      { speak: 'De ne a’nın yapısı bulunduktan sonra de ne a ile çalışan teknikler geliştirildi.' });
    const r1 = c.S('g', {}, g);
    K.ok(c, r1, 245, 110, 305, 110, renk);
    dizi(c, r1, 330, 82, 5, { h: 22 }); dizi(c, r1, 330, 112, 5, { h: 22 });
    ad(r1, 110, 'Çoğalt', 'PZR');
    await K.belir(c, r1);
    await c.say('Polimeraz zincir reaksiyonu, kısaca PZR, belirli bir DNA dizisini çoğaltır.',
      { speak: 'Polimeraz zincir reaksiyonu, kısaca pe ze re, belirli bir de ne a dizisini çoğaltır.' });
    const cok = c.S('g', {}, g);
    dizi(c, cok, 330, 52, 5, { h: 22 }); dizi(c, cok, 330, 142, 5, { h: 22 });
    await K.belir(c, cok, 350);
    await c.say('Tek bir diziden milyonlarca kopya elde edilir.');
    await c.say('Bu teknik genetik araştırmaları kökten değiştirdi.');
    const r2 = c.S('g', {}, g);
    c.S('circle', { cx: 150, cy: 280, r: 58, fill: '#202a43', stroke: IKINCI, 'stroke-width': 3 }, r2);
    dizi(c, r2, 107, 266, 3);
    K.ok(c, r2, 225, 280, 285, 280, renk);
    c.S('rect', { x: 310, y: 222, width: 220, height: 116, rx: 30, fill: '#202a43', stroke: YESIL, 'stroke-width': 3 }, r2);
    dizi(c, r2, 333, 266, 2, { fill: '#5b678f' }); dizi(c, r2, 478, 266, 1, { fill: '#5b678f' });
    const parca = dizi(c, r2, 391, 266, 3);
    parca.style.opacity = 0;
    ad(r2, 280, 'Aktar', 'Rekombinant DNA');
    await K.belir(c, r2);
    await c.tween(600, (e) => { parca.style.opacity = e; });
    await c.say('Rekombinant DNA teknolojisi, genetik materyali çoğaltıp başka bir canlıya aktarır.',
      { speak: 'Rekombinant de ne a teknolojisi, genetik materyali çoğaltıp başka bir canlıya aktarır.' });
    await c.say('Bu teknoloji tıpta, tarımda ve endüstride önemli gelişmeler sağladı.');
    const r3 = c.S('g', {}, g);
    koyun(c, r3, 150, 450); K.ok(c, r3, 250, 455, 310, 455, renk); koyun(c, r3, 410, 450);
    ad(r3, 450, 'Kopyala', 'Klonlama');
    await K.belir(c, r3);
    await c.say('Klonlama, bir canlının genetik olarak bire bir kopyasını üretir.');
    await K.belir(c, K.yazi(c, r3, 410, 540, 'Dolly', { size: 26, renk: SOLUK }), 350);
    await c.say('Dolly adlı koyun, yetişkin bir vücut hücresinden klonlanan ilk memelidir.', { speak: 'Doli adlı koyun, yetişkin bir vücut hücresinden klonlanan ilk memelidir.' });
    await c.choice({ tag: 'Uygula', q: 'Bir araştırmacının elinde çok az DNA var; incelemek için çok sayıda kopya gerekiyor. Hangi tekniği kullanır?',
      options: ['Klonlama', 'PZR', 'Rekombinant DNA teknolojisi'], answer: 1,
      hints: ['Klonlama bir DNA dizisini değil, canlının kendisini kopyalar.', '', 'Bu teknoloji genetik materyali başka bir canlıya aktarmak içindir.'],
      right: 'PZR belirli bir DNA dizisini milyonlarca kez çoğaltır.' });
    c.note('<b>PZR çoğaltır, rekombinant DNA aktarır, klonlama kopyalar.</b><br>Dolly: klonlanan ilk memeli.', 'DNA teknikleri');
  }

  /* ---- Sahne 5 · Oku, düzenle; dört alan ---- */
  async function okuDuzenle(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    K.yazi(c, g, 500, 60, 'İnsan Genom Projesi', { size: 30, renk, kalin: 700 });
    const uzun = dizi(c, g, 152, 85, 24);
    [...uzun.children].forEach((k) => { k.style.opacity = 0; });
    await c.tween(1400, (e) => { [...uzun.children].forEach((k, i) => { k.style.opacity = Ders.clamp(e * 24 - i, 0, 1); }); });
    await c.say('İnsan Genom Projesi, insan DNA’sının dizisini baştan sona ortaya çıkardı.',
      { speak: 'İnsan Genom Projesi, insan de ne a’sının dizisini baştan sona ortaya çıkardı.' });
    await K.belir(c, K.yazi(c, g, 500, 165, 'Genetik araştırmalarda önemli gelişmeler', { size: 26 }), 350);
    await c.say('Bu bilgi genetik araştırmalarda önemli gelişmelerin önünü açtı.');
    const cr = c.S('g', {}, g);
    K.yazi(c, cr, 500, 265, 'CRISPR-Cas', { size: 30, renk: IKINCI, kalin: 700 });
    const serit = dizi(c, cr, 152, 290, 24);
    const cerceve = c.S('rect', { x: 152 + 10 * 29 - 5, y: 283, width: 4 * 29 + 7, height: 44, rx: 8, fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-dasharray': '8 6' }, cr);
    K.yazi(c, cr, 152 + 12 * 29, 365, 'Gen bölgesi', { size: 26 });
    await K.belir(c, cr);
    await c.tween(800, (e) => { [10, 11, 12, 13].forEach((i) => { serit.children[i].setAttribute('fill', e > 0.5 ? '#ffffff' : BAZ[SIRA[i]]); }); cerceve.setAttribute('stroke', e > 0.5 ? IKINCI : '#fff'); });
    await c.say('CRISPR-Cas, DNA’nın istenen bir gen bölgesinde kontrollü düzenleme yapmayı sağlar.',
      { speak: 'Krispır Kas, de ne a’nın istenen bir gen bölgesinde kontrollü düzenleme yapmayı sağlar.' });
    await K.belir(c, K.yazi(c, cr, 500, 440, 'Sağlık: genetik hastalıkların düzeltilmesi', { size: 28 }), 350);
    await c.say('Sağlık alanında gen tedavisinin ve genetik hastalıkların düzeltilmesinin yolunu açtı.');
    await K.belir(c, K.yazi(c, cr, 500, 495, 'Gıda: bitki ve hayvanlarda iyileştirme', { size: 28 }), 350);
    await c.say('Gıda alanında bitki ve hayvanların genetik olarak iyileştirilmesini sağladı.');
    await c.choice({ tag: 'Uygula', q: 'Bir bitkide tek bir gen bölgesi değiştirilerek genetik iyileştirme yapılacak. Bunu hangi buluş sağlar?',
      options: ['İnsan Genom Projesi', 'PZR', 'CRISPR-Cas'], answer: 2,
      hints: ['Bu proje insan DNA’sının dizisini ortaya çıkardı; DNA’yı değiştirmedi.', 'PZR bir DNA dizisini çoğaltır; değiştirmez.', ''],
      right: 'CRISPR-Cas istenen gen bölgesinde kontrollü düzenleme yapar.' });
    await sil(c, g);
    const a = c.S('g', {}, s);
    const ust = c.S('g', {}, a), alt = c.S('g', {}, a);
    K.kart(c, ust, 70, 70, 400, 170, 'Sağlık', ['Antibiyotik, aşı, gen tedavisi'], { renk });
    K.kart(c, ust, 530, 70, 400, 170, 'Gıda', ['Tarımsal verim, gıda üretimi'], { renk: YESIL });
    await K.belir(c, ust);
    await c.say('Aynı buluşa sağlık açısından da gıda açısından da bakılabilir.');
    K.kart(c, alt, 70, 300, 400, 170, 'Çevre', ['Ekosistemlerin korunması'], { renk: 'var(--c6)' });
    K.kart(c, alt, 530, 300, 400, 170, 'Enerji', ['Yenilenebilir enerji üretimi'], { renk: IKINCI });
    await K.belir(c, alt);
    await c.say('Biyoloji, çevre ve enerji sorunlarına da çözüm üretir.');
    await c.say('Her dönüm noktası ya bir sorunu çözer ya yeni bir yol açar.',
      { speak: 'Her dönüm noktası [short pause] ya bir sorunu çözer ya yeni bir yol açar.' });
  }

  Ders.start({
    id: 'yasam-a1', kicker: 'Konu A · Biyolojinin dönüm noktaları', title: 'Bir buluş, bir sorunu çözer', accent: renk, back: 'index.html',
    intro: { title: 'Bir buluş, bir sorunu çözer', hook: 'Açık unutulan küflü bir kap, tıbbı nasıl değiştirdi?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Küflü kap', goal: 'Penisilinin hangi sorunu çözdüğünü gör.', run: kufluKap },
      { title: 'Mikroptan aşıya', goal: 'Her buluşun çözdüğü sorunu ayır.', run: asi },
      { title: 'Kalıtım ve DNA', goal: 'Anlamayı değiştiren iki buluşu tanı.', run: kalitim },
      { title: 'Çoğalt, aktar, kopyala', goal: 'Üç tekniğin işini ayırt et.', run: teknikler },
      { title: 'Oku, düzenle', goal: 'Genom projesi ile CRISPR-Cas’ı ayır.', run: okuDuzenle },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi eşleşme doğrudur?', options: ['PZR: bir geni başka bir canlıya aktarır.', 'CRISPR-Cas: insan DNA’sının dizisini baştan sona ortaya çıkarır.', 'Klonlama: bir canlının genetik olarak bire bir kopyasını üretir.'], answer: 2,
        why: ['PZR belirli bir DNA dizisini çoğaltır; aktarma rekombinant DNA teknolojisinin işidir.', 'Diziyi ortaya çıkaran İnsan Genom Projesi’dir; CRISPR-Cas gen bölgesini düzenler.', 'Dolly adlı koyun böyle klonlandı.'], scene: 3 },
      { q: 'CRISPR-Cas’a gıda açısından bakan biri hangi katkıyı öne çıkarır?', options: ['Bitki ve hayvanlarda genetik iyileştirme', 'Genetik hastalıkların düzeltilmesi', 'Ameliyatların daha güvenli olması'], answer: 0,
        why: ['Gıda üretimi bitki ve hayvanlara dayanır.', 'Bu, aynı buluşun sağlık açısından katkısıdır.', 'Bu katkı penisilinindir.'], scene: 4 },
    ], summary: ['<b>Her dönüm noktası ya bir sorunu çözer ya yeni bir yol açar.</b>', 'Antibiyotik ve aşı sağlığı korudu; DNA’nın yapısı genetikte yeni bir çağ başlattı.'],
    nextLesson: { href: 'a2-soru-ve-kaynak.html', label: 'Sonraki: Soru sor, kaynağını sına ›' },
  });
})();
