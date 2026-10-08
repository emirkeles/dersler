/* A1 · KİM.9.1.1 · Senaryo: plan/kimya/etkilesim/senaryolar/A-gunluk-hayatta-kimya.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 20–24 ve 26'dan; pH ölçeği ortaokul ön bilgisi. Öğrenciye kitap, sayfa ya da
   "hazır veri" anılmaz. Hiçbir ürüne pH değeri yazılmaz; rapordaki hastalık adları anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kart, belir } = KIT;
  const ASIT = 'var(--c2)', NOTR = 'var(--c1)', KOYU = '#162038';
  const sayi = (v) => String(v).replace('.', ',');
  const soslar = [
    { ad: 'A', ph: 6.12, al: 0.047, sicaklik: [0.051, 0.055, 0.062] },
    { ad: 'B', ph: 5.23, al: 0.125, sicaklik: [0.128, 0.130, 0.134] },
    { ad: 'C', ph: 6.07, al: 0.058, sicaklik: [0.061, 0.063, 0.066] },
  ];
  const DERECE = ['150 °C', '200 °C', '250 °C'];

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const ok = (c, p, x1, y, x2) => c.S('path', { d: `M ${x1} ${y} L ${x2} ${y} M ${x2 - 12} ${y - 9} L ${x2} ${y} L ${x2 - 12} ${y + 9}`,
    fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, p);

  /* Küçük çizimler: her biri (x, y) merkezli, yaklaşık 90 birim genişliğinde. */
  const ciz = {
    sabun(c, g, x, y) {
      kutu(c, g, x - 42, y - 8, 84, 44, { rx: 14, renk: NOTR });
      [[-22, -26, 12], [4, -34, 9], [24, -22, 7]].forEach(([dx, dy, r]) => c.S('circle', { cx: x + dx, cy: y + dy, r, fill: 'none', stroke: NOTR, 'stroke-width': 3 }, g));
    },
    ilac(c, g, x, y) {
      kutu(c, g, x - 44, y - 18, 88, 36, { rx: 18, renk: ASIT });
      c.S('line', { x1: x, y1: y - 18, x2: x, y2: y + 18, stroke: ASIT, 'stroke-width': 3 }, g);
    },
    cip(c, g, x, y) {
      kutu(c, g, x - 28, y - 28, 56, 56, { rx: 6, renk: RENK.vurgu });
      for (let k = -1; k <= 1; k++) {
        c.S('line', { x1: x - 44, y1: y + k * 16, x2: x - 28, y2: y + k * 16, stroke: RENK.vurgu, 'stroke-width': 3 }, g);
        c.S('line', { x1: x + 28, y1: y + k * 16, x2: x + 44, y2: y + k * 16, stroke: RENK.vurgu, 'stroke-width': 3 }, g);
      }
    },
    kase(c, g, x, y) {
      c.S('path', { d: `M ${x - 44} ${y - 6} Q ${x} ${y + 62} ${x + 44} ${y - 6} Z`, fill: KOYU, stroke: ASIT, 'stroke-width': 3 }, g);
      c.S('ellipse', { cx: x, cy: y - 2, rx: 22, ry: 9, fill: ASIT }, g);
    },
    folyo(c, g, x, y) {
      c.S('path', { d: `M ${x - 44} ${y + 6} L ${x - 22} ${y - 22} L ${x + 26} ${y - 26} L ${x + 44} ${y + 2} L ${x + 20} ${y + 26} L ${x - 26} ${y + 24} Z`,
        fill: '#c9d1e6', stroke: '#8f9bbd', 'stroke-width': 3 }, g);
      c.S('path', { d: `M ${x - 22} ${y - 22} L ${x - 4} ${y + 4} L ${x + 26} ${y - 26} M ${x - 4} ${y + 4} L ${x + 20} ${y + 26}`, fill: 'none', stroke: '#8f9bbd', 'stroke-width': 2 }, g);
    },
    firin(c, g, x, y) {
      kutu(c, g, x - 40, y - 34, 80, 68, { rx: 8, renk: RENK.vurgu });
      kutu(c, g, x - 26, y - 8, 52, 30, { rx: 4, renk: RENK.vurgu, kalin: 2 });
      [-16, 0, 16].forEach((dx) => c.S('circle', { cx: x + dx, cy: y - 22, r: 4, fill: RENK.vurgu }, g));
    },
    sise(c, g, x, y) {
      c.S('path', { d: `M ${x - 10} ${y - 34} L ${x + 10} ${y - 34} L ${x + 10} ${y - 8} L ${x + 34} ${y + 30} L ${x - 34} ${y + 30} L ${x - 10} ${y - 8} Z`,
        fill: KOYU, stroke: NOTR, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('path', { d: `M ${x - 20} ${y + 10} L ${x + 20} ${y + 10} L ${x + 30} ${y + 27} L ${x - 30} ${y + 27} Z`, fill: NOTR }, g);
    },
  };

  /* Çubuk grafik. degerler[i] null ise çubuk boş çerçeve ve "?" olarak çizilir. oran: 0→1 dolma animasyonu için. */
  function grafik(c, svg, { baslik, adlar, altlar, degerler, max, vurgu = -1, oran = () => 1 }) {
    svg.replaceChildren();
    const g = c.S('g', {}, svg), taban = 400, h = 250, adim = 720 / adlar.length;
    yazi(c, g, 500, 62, baslik, { size: 32 });
    c.S('line', { x1: 130, y1: taban, x2: 870, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    adlar.forEach((ad, i) => {
      const x = 140 + adim * (i + 0.5), v = degerler[i], renk = i === vurgu ? ASIT : NOTR;
      if (v == null) {
        c.S('rect', { x: x - 44, y: taban - 150, width: 88, height: 150, rx: 4, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, g);
        yazi(c, g, x, taban - 62, '?', { size: 44, renk: RENK.soluk });
      } else {
        const bh = v / max * h * oran(i);
        c.S('rect', { x: x - 44, y: taban - bh, width: 88, height: bh, rx: 4, fill: renk }, g);
        if (oran(i) > 0.98) yazi(c, g, x, taban - bh - 18, sayi(v), { size: 30 });
      }
      yazi(c, g, x, 446, ad, { size: 30 });
      if (altlar) yazi(c, g, x, 486, altlar[i], { size: 26, renk: RENK.soluk });
    });
    yazi(c, g, 500, 536, '100 g yiyecekte biriken alüminyum (mg)', { size: 24, renk: RENK.soluk });
    return g;
  }

  /* ---- Sahne 1 · Kimya her gün yanımızda ---- */
  const GRUPLAR = ['Temizlik', 'Mutfak', 'Öz bakım', 'Hazır gıda'];
  async function gunluk(c) {
    const svg = c.svg();
    const gun = c.S('g', {}, svg);
    const durak = (x, cizim, ad) => { const g = c.S('g', {}, gun); cizim(c, g, x, 230); yazi(c, g, x, 330, ad, { size: 30 }); return g; };
    yazi(c, gun, 500, 90, 'Bir günün içinde', { size: 34, renk: RENK.soluk });
    await belir(c, durak(220, ciz.sabun, 'Sabun'));
    await c.say('Sabah yüzünü yıkarken su ve sabun kullanırsın.');
    const ilac = durak(500, ciz.ilac, 'İlaç'), cip = durak(780, ciz.cip, 'Bilgisayar çipi');
    await Promise.all([belir(c, ilac), belir(c, cip)]);
    await c.say('Hastalandığında ilaç, ders çalışırken bilgisayar kullanırsın.');
    await belir(c, yazi(c, gun, 500, 420, 'Hepsi kimyasal maddelerden yapılır', { size: 30, renk: RENK.vurgu }));
    await c.say('Sabun, ilaç ve bilgisayardaki silisyum çip kimyasal maddelerden yapılır.');
    await belir(c, yazi(c, gun, 500, 490, 'Kimya: maddelerin özellikleri ve etkileşimleri', { size: 30 }));
    await c.say('Kimya, maddelerin özelliklerini ve birbirleriyle etkileşimlerini inceler.');

    await c.tween(350, (e) => { gun.style.opacity = 1 - e; });
    gun.remove();
    const kutular = c.S('g', {}, svg);
    const yer = (i) => ({ x: 52 + i * 226, y: 150 });
    yazi(c, kutular, 500, 90, 'Evdeki ürünler: dört grup', { size: 34, renk: RENK.soluk });
    const icerik = GRUPLAR.map(() => []);
    GRUPLAR.forEach((ad, i) => { const { x, y } = yer(i); kutu(c, kutular, x, y, 218, 330); yazi(c, kutular, x + 109, y + 46, ad, { size: 28, renk: RENK.vurgu }); });
    const koy = (i, ad) => { const { x, y } = yer(i); const t = yazi(c, kutular, x + 109, y + 106 + icerik[i].length * 46, ad, { size: 24 }); icerik[i].push(ad); return belir(c, t, 350); };
    await belir(c, kutular);
    await c.say('Evdeki ürünleri kullanım alanlarına göre dört grupta toplayabiliriz.');
    await c.say('Temizlik malzemeleri, mutfak gereç ve malzemeleri, öz bakım ürünleri, hazır gıdalar.');
    await Promise.all([koy(0, 'Sıvı sabun'), koy(1, 'Alüminyum folyo')]);
    await c.say('Sıvı sabun temizlik malzemesidir; alüminyum folyo mutfak gerecidir.');

    const urunler = [['Sirke', 1, 'Sirke yemeklerde kullanılır.'], ['Diş macunu', 2, 'Diş macunu kişisel bakım içindir.'],
      ['Gazlı içecek', 3, 'Gazlı içecek, satın alınıp tüketilen hazır bir üründür.'], ['Kireç çözücü', 0, 'Kireç çözücü temizlikte kullanılır.']];
    for (const [ad, grup, neden] of urunler) {
      const bekleyen = yazi(c, svg, 500, 525, ad + ' →  ?', { size: 30, renk: ASIT });
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> hangi gruba girer?`, options: GRUPLAR, answer: grup,
        hints: GRUPLAR.map(() => 'Bu ürünün evde ne için kullanıldığını düşün.'), right: neden,
        onPick: (i, dogru) => { if (dogru) { bekleyen.remove(); koy(grup, ad); } } });
    }
    await c.say('Aynı grupta olsalar bile ürünlerin özellikleri birbirinden farklıdır.');
  }

  /* ---- Sahne 2 · Özellik işi belirler ---- */
  async function ozellik(c) {
    const svg = c.svg();
    const es = c.S('g', {}, svg);
    yazi(c, es, 500, 70, 'Maddenin özelliği → ürünün işi', { size: 32, renk: RENK.soluk });
    const satir = (i, sol, fiil, sag) => {
      const g = c.S('g', {}, es), y = 130 + i * 118;
      kutu(c, g, 90, y, 300, 84, { renk: ASIT }); yazi(c, g, 240, y + 54, sol, { size: 30 });
      ok(c, g, 410, y + 42, 590); yazi(c, g, 500, y + 26, fiil, { size: 24, renk: RENK.soluk });
      kutu(c, g, 610, y, 300, 84); yazi(c, g, 760, y + 54, sag, { size: 30 });
      return g;
    };
    await c.say('Bir ürünün ne işe yaradığını, içindeki maddenin özelliği belirler.');
    const s1 = satir(0, 'Limon tuzu', 'çözer', 'Kireç');
    const kirec = yazi(c, s1, 760, 130 + 84 + 26, 'kalsiyum karbonat', { size: 24, renk: RENK.soluk });
    await belir(c, s1);
    await c.say('Çaydanlığın dibinde biriken kireç, kalsiyum karbonattır.');
    await c.say('Limon tuzu bu kireci çözer; bu yüzden kireç çözücü olarak kullanılır.');
    kirec.remove();
    await belir(c, satir(1, 'Gazlı içecek', 'temizler', 'Pas'));
    await c.say('Gazlı içecekler paslı metalleri temizlemekte kullanılabilir.');
    await belir(c, satir(2, 'Antiasit tablet', 'giderir', 'Mide yanması'));
    await c.say('Antiasit tablet, mide yanmasını gidermek için çiğnenen bir ilaçtır.');
    await belir(c, yazi(c, es, 500, 510, 'Diş macunu: bazik özellik gösterir', { size: 28, renk: RENK.vurgu }));
    await c.say('Diş macunu bazik özellik gösteren bir öz bakım ürünüdür.');

    await c.tween(350, (e) => { es.style.opacity = 1 - e; });
    es.remove();
    const ph = c.S('g', {}, svg);
    yazi(c, ph, 500, 110, 'pH değeri', { size: 36 });
    const x0 = 130, gen = 740, y = 230, px = (v) => x0 + gen * v / 14;
    c.S('rect', { x: x0, y, width: px(7) - x0, height: 56, rx: 6, fill: ASIT, opacity: 0.85 }, ph);
    c.S('rect', { x: px(7), y, width: x0 + gen - px(7), height: 56, rx: 6, fill: NOTR, opacity: 0.85 }, ph);
    [0, 7, 14].forEach((v) => yazi(c, ph, px(v), y + 100, String(v), { size: 30 }));
    c.S('line', { x1: px(7), y1: y - 14, x2: px(7), y2: y + 70, stroke: 'var(--text)', 'stroke-width': 3 }, ph);
    await belir(c, ph);
    await c.say('Bir maddenin asidik mi bazik mi olduğunu pH değeri gösterir.',
      { speak: 'Bir maddenin asidik mi bazik mi olduğunu pehaş değeri gösterir.' });
    const adlar = c.S('g', {}, ph);
    yazi(c, adlar, (x0 + px(7)) / 2, y + 38, 'asidik', { size: 28, renk: '#0b0d12' });
    yazi(c, adlar, (px(7) + x0 + gen) / 2, y + 38, 'bazik', { size: 28, renk: '#0b0d12' });
    await belir(c, adlar, 350);
    await c.say('pH yediden küçükse madde asidik, yediden büyükse baziktir.',
      { speak: 'Pehaş yediden küçükse madde asidik, yediden büyükse baziktir.' });
    const artis = c.S('g', {}, ph);
    c.S('path', { d: `M ${px(6.4)} ${y + 150} L ${x0 + 20} ${y + 150} M ${x0 + 34} ${y + 140} L ${x0 + 20} ${y + 150} L ${x0 + 34} ${y + 160}`, fill: 'none', stroke: ASIT, 'stroke-width': 4, 'stroke-linecap': 'round' }, artis);
    yazi(c, artis, (x0 + px(7)) / 2, y + 196, 'asitlik artar', { size: 28, renk: ASIT });
    await belir(c, artis, 350);
    await c.say('pH küçüldükçe asitlik artar.', { speak: 'Pehaş küçüldükçe asitlik artar.' });

    await c.tween(300, (e) => { ph.style.opacity = 1 - e; });
    ph.remove();
    const musluk = c.S('g', {}, svg);
    kart(c, musluk, 'Musluğun ucunda kireç', ['Çaydanlıktaki ile aynı madde:', 'kalsiyum karbonat'], { renk: ASIT });
    await belir(c, musluk, 350);
    await c.choice({ tag: 'Uygula', q: 'Musluğun ucunda kireç birikmiş. Hangi ürün işe yarar?', options: ['Limon tuzu', 'Diş macunu', 'Antiasit tablet'], answer: 0,
      hints: ['', 'Diş macunu bir öz bakım ürünüdür; kireci çözdüğünü görmedik.', 'Antiasit tablet mide yanması için kullanılır.'],
      right: 'Limon tuzu. Kireç nerede olursa olsun aynı maddedir.' });
    await c.say('Limon tuzu kireci çözdüğü için musluktaki kirece de etki eder.');
    await c.say('Ürünü seçerken önce içindeki maddenin özelliğine bakarız.');
    c.note('<b>Ürünün işini, içindeki maddenin özelliği belirler.</b><br>Limon tuzu kireci çözer.', 'Özellik ve iş');
  }

  /* ---- Sahne 3 · Bir aşçının sorusu ---- */
  async function asci(c) {
    const svg = c.svg();
    const oyku = c.S('g', {}, svg);
    const adim = (i, cizim, ad) => { const g = c.S('g', {}, oyku), x = 140 + i * 240; cizim(c, g, x, 200); yazi(c, g, x, 290, ad, { size: 26 }); if (i) ok(c, g, x - 170, 200, x - 70); return g; };
    await belir(c, adim(1, ciz.folyo, 'Alüminyum folyo'));
    await c.say('Alüminyum folyo, mutfakta yiyecekleri sarmak ve pişirmek için kullanılır.');
    await belir(c, adim(0, ciz.kase, 'Sosta bekletme'));
    await c.say('Bir aşçı etleri pişirmeden önce sosta bekletiyor; buna marinasyon denir.');
    await belir(c, adim(2, ciz.firin, 'Fırın'));
    await c.say('Sonra eti alüminyum folyoya sarıp fırına veriyor.');
    const soru = yazi(c, oyku, 500, 400, 'Uzun süre kullanım: sağlık için risk olabilir', { size: 28, renk: RENK.vurgu });
    await belir(c, soru, 350);
    await c.say('Alüminyum içeren malzemelerin uzun süre kullanımı sağlık için risk oluşturabilir.');
    await c.say('Bunu Dünya Sağlık Örgütünün de yer aldığı bir rapor belirtiyor.');
    soru.textContent = 'Yemeğe alüminyum geçiyor mu?';
    await c.say('Aşçı, yemeğine alüminyum geçip geçmediğini merak ediyor.');
    await belir(c, adim(3, ciz.sise, 'Laboratuvar'));
    await c.say('Yemek örneklerini bir gıda analiz laboratuvarına gönderiyor.');
    soru.textContent = 'Ölçülen: 100 g yiyecekteki alüminyum (mg)';
    await c.say('Laboratuvar, yüz gram yiyecekte biriken alüminyumu miligram olarak ölçüyor.');

    await c.tween(350, (e) => { oyku.style.opacity = 1 - e; });
    oyku.remove();
    const tablo = c.S('g', {}, svg);
    yazi(c, tablo, 500, 80, 'Üç ayrı sos', { size: 34, renk: RENK.soluk });
    yazi(c, tablo, 330, 150, 'Sos', { size: 28, renk: RENK.soluk }); const phBaslik = yazi(c, tablo, 670, 150, 'pH değeri', { size: 28, renk: RENK.soluk });
    const satirlar = soslar.map((s, i) => {
      const g = c.S('g', {}, tablo), y = 180 + i * 96;
      const r = kutu(c, g, 190, y, 620, 76);
      yazi(c, g, 330, y + 50, 'Sos ' + s.ad, { size: 32 });
      const deger = yazi(c, g, 670, y + 50, sayi(s.ph), { size: 32 });
      return { r, deger };
    });
    phBaslik.style.opacity = 0; satirlar.forEach((s) => { s.deger.style.opacity = 0; });
    await belir(c, tablo);
    await c.say('Üç ayrı sos denendi: A, B ve C.');
    await c.tween(400, (e) => { phBaslik.style.opacity = e; satirlar.forEach((s) => { s.deger.style.opacity = e; }); });
    await c.say('Her sosun pH değeri de ölçüldü.', { speak: 'Her sosun pehaş değeri de ölçüldü.' });
    await c.choice({ tag: 'Uygula', q: 'pH değerlerine göre en asidik sos hangisi?', options: ['A: 6,12', 'B: 5,23', 'C: 6,07'], answer: 1,
      hints: ['6,12 bu üç değerin en büyüğü; en az asidik olan bu.', '', '6,07, 5,23’ten büyük.'], right: 'B. pH küçüldükçe asitlik artar.',
      onPick: (i, dogru) => { if (dogru) satirlar[1].r.setAttribute('stroke', ASIT); } });
    await c.say('B sosunun pH değeri en küçük; yani en asidik sos B.', { speak: 'B sosunun pehaş değeri en küçük; yani en asidik sos B.' });
  }

  /* ---- Sahne 4 · Asitlik ve alüminyum ---- */
  async function asitlik(c) {
    const svg = c.svg();
    const ortak = { baslik: 'Yiyecekte biriken alüminyum', adlar: soslar.map((s) => 'Sos ' + s.ad), altlar: soslar.map((s) => 'pH ' + sayi(s.ph)), max: 0.145 };
    grafik(c, svg, { ...ortak, degerler: [null, null, null] });
    await c.say('Şimdi yiyecekte biriken alüminyum miktarlarına bakalım.');
    await c.say('Üç sosu birbirinden ayıran özellik asitlikleri.');
    await c.say('Asitlik, folyodan yiyeceğe geçen alüminyumu değiştirir mi?', { speak: '[curious] Asitlik, folyodan yiyeceğe geçen alüminyumu değiştirir mi?' });
    await c.choice({ q: 'En çok alüminyum hangi sosla hazırlanan yiyecekte birikmiştir?', options: ['Sos A', 'Sos B', 'Sos C'], answer: 1,
      hints: ['A en az asidik sos. Asitlik bir fark yaratıyorsa en asidik sosa bak.', '', 'C’nin pH değeri A’ya çok yakın. En asidik sos hangisiydi?'],
      right: 'B, en asidik sos. Şimdi ölçümlere bakalım.' });
    const al = soslar.map((s) => s.al);
    await c.tween(700, (e) => grafik(c, svg, { ...ortak, degerler: [al[0], null, al[2]], oran: () => e }));
    await c.say('A sosunda 0,047, C sosunda 0,058 miligram alüminyum birikti.',
      { speak: 'A sosunda sıfır virgül sıfır kırk yedi, C sosunda sıfır virgül sıfır elli sekiz miligram alüminyum birikti.' });
    await c.tween(800, (e) => grafik(c, svg, { ...ortak, degerler: al, vurgu: 1, oran: (i) => (i === 1 ? e : 1) }));
    await c.say('B sosunda ise 0,125 miligram.', { speak: 'B sosunda ise sıfır virgül yüz yirmi beş miligram.' });
    await c.say('En asidik sosta birikim, ötekilerin iki katından fazla.');
    await c.say('Sos ne kadar asidikse yiyeceğe o kadar çok alüminyum geçmiş.');
    await c.say('Demek ki folyonun etkisi, sardığı yiyeceğin asitliğine göre değişir.');
    c.note('<b>Sos asidikleştikçe yiyeceğe geçen alüminyum artar.</b><br>Sos B: pH 5,23 → 0,125 mg', 'Asitlik');
  }

  /* ---- Sahne 5 · Sıcaklık da etkiler ---- */
  async function sicaklik(c) {
    const svg = c.svg();
    const tek = (i, degerler, oran) => grafik(c, svg, { baslik: 'Sos ' + soslar[i].ad + ' · fırın sıcaklığı', adlar: DERECE, degerler, max: 0.145, vurgu: -1, oran });
    tek(0, [null, null, null]);
    await c.say('Aşçı ikinci bir şeyi de merak etti: fırının sıcaklığı.');
    await c.say('Laboratuvar her sosu üç ayrı sıcaklıkta pişirip yeniden ölçtü.');
    await c.say('Sıcaklıklar 150, 200 ve 250 derece.', { speak: 'Sıcaklıklar yüz elli, iki yüz ve iki yüz elli derece.' });
    const a = soslar[0].sicaklik;
    await c.tween(600, (e) => tek(0, [a[0], null, null], () => e));
    await c.say('A sosunda 150 derecede 0,051 miligram alüminyum birikti.',
      { speak: 'A sosunda yüz elli derecede sıfır virgül sıfır elli bir miligram alüminyum birikti.' });
    await c.choice({ q: 'Sıcaklık 250 dereceye çıkınca A sosundaki birikim nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
      hints: ['', 'Ölçümlere bakınca birikimin azalmadığını göreceksin.', 'Sıcaklık bir koşuldur; koşul değişince sonuç da değişebilir.'],
      right: 'Artar. Şimdi ölçülen değerlere bakalım.' });
    await c.tween(700, (e) => tek(0, a, (i) => (i ? e : 1)));
    await c.say('200 derecede 0,055, 250 derecede 0,062 miligram ölçüldü.',
      { speak: 'İki yüz derecede sıfır virgül sıfır elli beş, iki yüz elli derecede sıfır virgül sıfır altmış iki miligram ölçüldü.' });
    await c.say('Sıcaklık arttıkça yiyeceğe geçen alüminyum da arttı.');
    const sec = c.slider({ label: 'Sos', min: 0, max: 2, value: 0, fmt: (i) => soslar[i].ad, onInput: (i) => tek(i, soslar[i].sicaklik) });
    await c.say('Sosu değiştir, üç sıcaklığı karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();

    svg.replaceChildren();
    const g = c.S('g', {}, svg), taban = 400, h = 250, max = 0.145;
    yazi(c, g, 500, 62, 'Üç sos, üç sıcaklık', { size: 32 });
    c.S('line', { x1: 130, y1: taban, x2: 870, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    soslar.forEach((s, i) => {
      const x = 260 + i * 240;
      s.sicaklik.forEach((v, k) => { const bh = v / max * h; c.S('rect', { x: x - 78 + k * 54, y: taban - bh, width: 48, height: bh, rx: 3, fill: i === 1 ? ASIT : NOTR, opacity: 0.6 + k * 0.2 }, g); });
      yazi(c, g, x, 446, 'Sos ' + s.ad, { size: 30 });
    });
    yazi(c, g, 500, 500, 'Her sosta soldan sağa: 150, 200, 250 °C', { size: 24, renk: RENK.soluk });
    await belir(c, g);
    await c.say('Öteki iki sosta da sıcaklık arttıkça birikim artıyor.');
    await c.say('Ama sosun asitliği, sıcaklıktan daha büyük fark yaratıyor.');
  }

  /* ---- Sahne 6 · Ölçümle karar ver ---- */
  async function karar(c) {
    const svg = c.svg();
    const olcum = kart(c, svg, 'Ölçüm', ['Sos B · 200 °C', '0,130 mg alüminyum'], { x: 70, y: 110, w: 410, h: 250, size: 30 });
    await belir(c, olcum);
    await c.say('Aşçı artık kararını ölçüme dayanarak verebilir.');
    const olcumAlt = yazi(c, svg, 275, 420, 'Koşul var · ölçü var', { size: 28, renk: 'var(--good)' });
    await belir(c, olcumAlt, 350);
    await c.say('Ölçüm kartı koşulu söyler: hangi sos, hangi sıcaklık, kaç miligram.');
    const soz = kart(c, svg, 'Söz', ['“Alüminyum folyo', 'zararlıdır.”'], { x: 520, y: 110, w: 410, h: 250, size: 30, renk: RENK.b });
    await belir(c, soz);
    const sozAlt = yazi(c, svg, 725, 420, 'Koşul yok · ölçü yok', { size: 28, renk: 'var(--bad)' });
    await belir(c, sozAlt, 350);
    await c.say('“Alüminyum folyo zararlıdır” sözü ise ölçü de koşul da vermez.');
    await c.say('Güvenilir bilgide kimin neyi, hangi koşulda ölçtüğü bellidir.');
    await c.say('Bir sonuç, yalnızca ölçüldüğü koşullar için geçerlidir.');
    await c.choice({ tag: 'Uygula', q: 'Hangisi bu ölçümlerin desteklediği bir yorumdur?',
      options: ['Folyo her koşulda aynı miktarda alüminyum bırakır.', 'Asidik sosta yiyeceğe daha çok alüminyum geçmiştir.', 'Bütün mutfak gereçleri sağlığa zararlıdır.'], answer: 1,
      hints: ['Ölçümler sosa ve sıcaklığa göre değişti.', '', 'Ölçülen yalnızca alüminyum folyoydu; başka gereç ölçülmedi.'],
      right: 'Bu yorum, ölçülen koşulların dışına çıkmıyor.' });
    await c.tween(350, (e) => { svg.style.opacity = 1 - e; });
    svg.replaceChildren(); svg.style.opacity = 1;
    await belir(c, kart(c, svg, 'Kimya bilgisiyle seçim', ['Koşula uygun kullanım', 'Sağlık', 'Çevre'], { renk: RENK.vurgu }));
    await c.say('Kimya bilgisi, bir ürünü hangi koşulda kullanacağımızı seçmemizi sağlar.');
    await c.say('Kullandığımız ürünlerin atıkları da doğaya karışır.');
    await c.say('Doğru seçim hem sağlığımızı hem çevreyi korur.');
    c.note('<b>Güvenilir bilgi koşulu ve ölçüyü söyler.</b><br>Sos B, 200 °C: 0,130 mg', 'Ölçümle karar');
  }

  Ders.start({
    id: 'etkilesim-a1', kicker: 'Konu A · Günlük hayatta kimya', title: 'Ürünün işi ve kullanım koşulu', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Ürünün işi ve kullanım koşulu', hook: 'Aynı alüminyum folyo her yiyecekte aynı sonucu verir mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kimya her gün yanımızda', goal: 'Evdeki ürünleri kullanım alanına göre grupla.', run: gunluk },
      { title: 'Özellik işi belirler', goal: 'Ürünün işini maddenin özelliğine bağla.', run: ozellik },
      { title: 'Bir aşçının sorusu', goal: 'Neyin, neden ölçüldüğünü izle.', run: asci },
      { title: 'Asitlik ve alüminyum', goal: 'Asitlikle birikimi karşılaştır.', run: asitlik },
      { title: 'Sıcaklık da etkiler', goal: 'Sıcaklık değişince birikimi izle.', run: sicaklik },
      { title: 'Ölçümle karar ver', goal: 'Ölçüme dayanan yorumu ayır.', run: karar },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'pH değeri 5,2 ve 6,1 olan iki sos var. Folyoda pişen yiyeceğe hangisinde daha çok alüminyum geçmesi beklenir?',
        options: ['pH 6,1 olan', 'pH 5,2 olan', 'İkisinde eşit'], answer: 1,
        why: ['pH 6,1 olan sos daha az asidiktir.', 'pH küçüldükçe asitlik artar; asidik sosta birikim daha fazlaydı.', 'Asitlik değişince birikim de değişmişti.'], scene: 3 },
      { q: 'Çaydanlıktaki kireç için limon tuzunun seçilmesinin nedeni nedir?',
        options: ['Limon tuzu kireci çözer.', 'Limon tuzu güzel kokar.', 'Her temizlik ürünü kireci çözer.'], answer: 0,
        why: ['Ürünün işini, içindeki maddenin özelliği belirler.', 'Koku, kirecin çözülmesini açıklamaz.', 'Ürünlerin özellikleri birbirinden farklıdır.'], scene: 1 },
    ], summary: ['<b>Ürünün işini ve güvenli kullanımını, içindeki maddenin özelliği belirler.</b>', 'Sos asidikleştikçe ve fırın ısındıkça yiyeceğe daha çok alüminyum geçti.'],
    nextLesson: { href: 'a2-kimyanin-dallari.html', label: 'Sonraki: Bir bilim, farklı sorular ›' },
  });
})();
