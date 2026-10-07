/* C1 — Dört bilim insanı, ortak bir çalışma biçimi (FİZ.9.1.3)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/C-fizik-bilimine-yon-verenler.md
   Bütün bilgi, söz ve tarihler ders kitabından: s. 29–30 (dört bilim insanı), s. 34–35 (Einstein, ortak özellikler),
   s. 47 (İbnülheysem ve görme). Portre yok; kitapta yazmayan tarih verilmez. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, par, kart, etiket, yer, sec, sirayla, ikon, yol, daire, dik } = window.KIT;

  /* Ok: çizgi ve ucunda üçgen. */
  function ok(c, p, x1, y1, x2, y2, renk, o = {}) {
    const g = c.S('g', {}, p), a = Math.atan2(y2 - y1, x2 - x1), u = 13;
    cizgi(c, g, x1, y1, x2 - 6 * Math.cos(a), y2 - 6 * Math.sin(a), renk, 4, o.kesik ? { 'stroke-dasharray': '9 8' } : {});
    c.S('path', { d: `M${x2} ${y2} L${x2 - u * Math.cos(a - 0.45)} ${y2 - u * Math.sin(a - 0.45)} L${x2 - u * Math.cos(a + 0.45)} ${y2 - u * Math.sin(a + 0.45)} Z`, fill: renk }, g);
    return g;
  }
  /* Alt sıradaki ad ve özellik yuvaları. */
  const SIRA = { newton: 140, heysem: 380, hazini: 620, einstein: 860 };
  const AD = { newton: 'Newton', heysem: 'İbnülheysem', hazini: 'Hazini', einstein: 'Einstein' };
  const OZELLIK = { newton: 'öncekilerden yararlanır', heysem: 'sorgular', hazini: 'gözleme ve ispata dayanır', einstein: 'merak eder' };
  function adKoy(c, svg, kim, y = 400) {
    const e = etiket(c, svg, SIRA[kim], y, AD[kim], { renk: RENK.kisi, size: 20 });
    const t = yazi(c, svg, SIRA[kim], y + 50, OZELLIK[kim], { size: 18, renk: RENK.dal });
    return [e.g, t];
  }

  /* ---- 1. Devlerin omuzları ---- */
  async function devler(c) {
    const svg = c.svg(1000, 562);
    await c.say('Fizik bugünkü hâline birçok bilim insanının çalışmasıyla ulaştı.');
    const adlar = ['İbnülheysem', 'Hazini', 'Isaac Newton', 'Albert Einstein'].map((ad, i) => etiket(c, svg, 150 + i * 235, 330, ad, { renk: RENK.kisi, size: 21 }).g);
    gizle(adlar);
    for (const a of adlar) await belir(c, a, 250);
    await c.say('Bu derste dördüne bakacağız.');
    await c.say('Yalnızca ne bulduklarına değil, <b>nasıl çalıştıklarına</b> da bakacağız.');
    const soz = kart(c, svg, 150, 40, 700, 160, { baslik: 'Isaac Newton', metin: '“Daha ileriyi görebildiysem bunu omuzlarından baktığım devlere borçluyum.”', renk: RENK.kisi, size: 25 });
    gizle(soz.g); await belir(c, soz.g);
    await c.say('İlk söz Isaac Newton’dan.', { speak: 'İlk söz Ayzek Nüvtın’dan.' });
    await c.choice({
      tag: 'Tahmin et', q: 'Newton bu sözle neyi öne çıkarıyor?',
      options: ['Her şeyi tek başına bulduğunu', 'Kendinden öncekilerin çalışmalarından yararlandığını', 'Şansının yaver gittiğini'], answer: 1,
      hints: ['Söz, başkalarına duyulan bir borçtan söz ediyor.', '', 'Sözde şans geçmiyor. “Devler” kim olabilir?'],
      right: 'Evet. Devler, ondan önce çalışmış bilim insanları.',
    });
    await belir(c, [soz.g, ...adlar], 350, 0); soz.g.remove(); adlar.forEach((a) => a.remove());
    const blok = (x, y, w, ad) => { const g = c.S('g', {}, svg); kutu(c, g, x, y, w, 76, { renk: RENK.kisi }); yazi(c, g, x + w / 2, y + 46, ad, { size: 23 }); gizle(g); return g; };
    const b1 = blok(190, 400, 300, 'Galileo Galilei'), b2 = blok(510, 400, 300, 'Johannes Kepler'), b3 = blok(350, 310, 300, 'Isaac Newton');
    await par(belir(c, b1), belir(c, b2));
    await c.say('Devlerden biri Galileo Galilei, öteki Johannes Kepler.', { speak: 'Devlerden biri Galileyo Galiley, öteki Yuhannes Kepler.' });
    await belir(c, b3);
    const y1 = yazi(c, svg, 500, 190, 'dinamiğin üç yasası', { size: 26, renk: RENK.fizik });
    const y2 = yazi(c, svg, 500, 236, 'evrensel kütle çekim yasası', { size: 26, renk: RENK.fizik });
    const o1 = ok(c, svg, 500, 300, 500, 256, RENK.fizik);
    gizle(y1, y2, o1);
    await belir(c, [o1, y1, y2]);
    await c.say('Newton onların yasalarından yola çıkıp kendi yasalarını buldu.', { speak: 'Nüvtın onların yasalarından yola çıkıp kendi yasalarını buldu.' });
    const [e, t] = adKoy(c, svg, 'newton', 60);
    yer(e, 500, 60); t.setAttribute('x', 500); gizle(e, t);
    await belir(c, t);
    await c.say('Bilim insanı, öncekilerin çalışmalarını inceleyerek ilerler.');
  }

  /* ---- 2. Üç bilim insanı ---- */
  async function ucKisi(c) {
    const svg = c.svg(1000, 562);
    adKoy(c, svg, 'newton');
    let k = null;
    const kartKoy = async (baslik, metin) => {
      const eski = k;
      k = kart(c, svg, 40, 36, 580, 200, { baslik, metin, renk: RENK.kisi, size: 23 });
      gizle(k.g);
      await par(belir(c, k.g, 300), eski ? belir(c, eski.g, 200, 0) : null);
      if (eski) eski.g.remove();
    };
    const sema = () => { const g = c.S('g', { transform: 'translate(660 36)' }, svg); kutu(c, g, 0, 0, 300, 200, { dolgu: RENK.koyu }); return g; };
    const bitir = async (kim, g) => {
      const es = adKoy(c, svg, kim); gizle(es);
      await par(belir(c, es), belir(c, [k.g, g], 300, 0));
      k.g.remove(); g.remove(); k = null;
    };

    /* İbnülheysem: görme nasıl olur? */
    let g = sema();
    yol(c, g, 'M214 100 Q246 70 278 100 Q246 130 214 100 Z', { fill: RENK.koyu });
    daire(c, g, 246, 100, 11, { fill: RENK.disiplin });
    yol(c, g, 'M52 150 V118 M30 118 L52 62 L74 118 Z', { stroke: RENK.dal, 'stroke-width': 4 });
    const eskiOk = ok(c, g, 206, 100, 86, 100, RENK.cizgi, { kesik: true });
    await kartKoy('İbnülheysem', 'Eski kuram: gözden çıkan ışınlar cisme değince görürüz.');
    await c.say('İbnülheysem’den önce görme böyle açıklanıyordu.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bu kuram doğru olsaydı karanlıkta ne olurdu?',
      options: ['Karanlıkta da görürdük', 'Hiçbir zaman göremezdik', 'Yalnızca gündüz görürdük'], answer: 0,
      hints: ['', 'Işın gözden çıkıyorsa göz her zaman görmeli.', 'Işın gözden çıkıyorsa gece gündüz fark etmemeli.'],
      right: 'Evet. İbnülheysem kurama tam bu soruyla karşı çıktı.',
    });
    await belir(c, eskiOk, 300, 0);
    daire(c, g, 40, 28, 13, { fill: '#ffe066' });
    const o1 = ok(c, g, 50, 42, 56, 62, '#ffe066'), o2 = ok(c, g, 82, 100, 206, 100, '#ffe066');
    gizle(o1, o2);
    await kartKoy('İbnülheysem', 'Işık cisimden sekip göze ulaşınca görürüz.');
    await belir(c, o1, 300); await belir(c, o2, 500);
    await c.say('İbnülheysem eski bilgiyi sorguladı, yeni bir açıklama getirdi.');
    await c.say('Bu açıklama <b>optik</b> alanında büyük ilerleme sağladı.');
    await sec(c, {
      tag: 'Çalışma biçimi', q: 'İbnülheysem’in çalışma biçimi hangisi?',
      options: ['Okuduğunu olduğu gibi kabul eder', 'Önceki bilgiyi sorgular', 'Yalnızca kendi düşüncesine güvenir'], answer: 1,
      hints: ['Eski kuramı kabul etmedi; karşı çıktı.', '', 'Kuramı bir gözlemle sınadı: karanlıkta göremeyiz.'],
      right: 'Evet. Bilgiyi her yönüyle inceledi ve sorguladı.',
    });
    await bitir('heysem', g);

    /* Hazini: terazi */
    g = sema();
    yol(c, g, 'M150 168 V54 M110 168 H190', { stroke: RENK.cizgi, 'stroke-width': 5 });
    yol(c, g, 'M60 62 H240', { stroke: RENK.cizgi, 'stroke-width': 5 });
    yol(c, g, 'M60 62 L38 122 M60 62 L82 122 M240 62 L218 122 M240 62 L262 122', { stroke: RENK.ince, 'stroke-width': 2 });
    yol(c, g, 'M30 122 Q60 146 90 122 Z M210 122 Q240 146 270 122 Z', { fill: RENK.cizgi, stroke: 'none' });
    dik(c, g, 48, 100, 24, 22, { rx: 3, fill: RENK.kisi });
    daire(c, g, 232, 112, 9, { fill: RENK.fizik }); daire(c, g, 250, 112, 9, { fill: RENK.fizik });
    await kartKoy('Hazini · XII. yüzyıl', 'Maddelerin yoğunluğunu ölçtü; hassas terazinin ilk örneklerini yaptı.');
    await c.say('Hazini’nin sonuçları bugünkü cihazların değerlerine çok yakın.');
    await kartKoy('Hazini · XII. yüzyıl', '“Terazinin doğruluğu, fizik gözlemlerine ve ispatlara dayanır.”');
    await sec(c, {
      tag: 'Çalışma biçimi', q: 'Hazini’ye göre bir sonuca neden güveniriz?',
      options: ['Ünlü biri söylediği için', 'Eskiden beri bilindiği için', 'Gözleme ve ispata dayandığı için'], answer: 2,
      hints: ['Sözde kişi geçmiyor; neye dayanıyor?', 'Sözde eskilik geçmiyor; neye dayanıyor?', ''],
      right: 'Evet. Sonucu gözleme ve ispata dayandırır.',
    });
    await bitir('hazini', g);

    /* Einstein: pusula ve merak */
    g = sema();
    ikon(c, g, 'pusula', 50, 25, 1.67);
    await kartKoy('Albert Einstein', '“Bende özel yetenek arayanlar yanılıyorlar, sadece derin bir anlama merakım var.”');
    await c.say('Çocukken hediye edilen bir pusula onu çok etkilemişti.');
    await sec(c, {
      tag: 'Bakış açısı', q: 'Einstein başarısını neye bağlıyor?',
      options: ['Doğuştan gelen yeteneğe', 'Şansa', 'Anlama merakına'], answer: 2,
      hints: ['Söze bak: “özel yetenek arayanlar yanılıyorlar”.', 'Sözde şans geçmiyor.', ''],
      right: 'Evet. Onu yürüten şey merakıydı.',
    });
    await bitir('einstein', g);
    c.clearAct();
    await c.say('Dört adın altında dört çalışma biçimi birikti.');
  }

  /* ---- 3. Einstein'ın yolu ---- */
  async function yol1900(c) {
    const svg = c.svg(1000, 562);
    const Y = 300, X = { a: 140, b: 420, c: 860 };
    yazi(c, svg, 500, 70, 'Albert Einstein', { size: 28, renk: RENK.kisi });
    const hat = cizgi(c, svg, 80, Y, 80, Y, RENK.ince, 4);
    const durak = (x, yil, metin, ustte) => {
      const g = c.S('g', {}, svg);
      daire(c, g, x, Y, 11, { fill: RENK.kisi });
      yazi(c, g, x, Y + (ustte ? -26 : 48), yil, { size: 26 });
      yazi(c, g, x, Y + (ustte ? -66 : 84), metin, { size: 20, kalin: 500, renk: RENK.cizgi });
      gizle(g); return g;
    };
    const uzat = (x0, x1, ms = 600) => c.tween(ms, (e) => hat.setAttribute('x2', x0 + (x1 - x0) * e));
    const d1 = durak(X.a, '1900', 'mezun; iş teklifi yok', true);
    await uzat(80, X.a, 300); await belir(c, d1);
    await c.say('Einstein 1900’de mezun oldu; bir süre iş teklifi almadı.', { speak: 'Aynştayn bin dokuz yüzde mezun oldu; bir süre iş teklifi almadı.' });
    const d2 = durak(X.b, '1905', 'Özel Görelilik, E = m·c²', false);
    await uzat(X.a, X.b); await belir(c, d2);
    await c.say('1905’te Özel Görelilik ve E = m·c² makalelerini yayımladı.', { speak: 'Bin dokuz yüz beşte Özel Görelilik ve E eşittir m c kare makalelerini yayımladı.' });
    await c.choice({
      tag: 'Tahmin et', q: 'Bu makalelerden sonra kendi alanında iş bulması ne kadar sürdü?',
      options: ['Hemen buldu', 'Dört yıl', 'Hiç bulamadı'], answer: 1,
      hints: ['Ünlü makaleler işi hemen getirmedi.', '', 'Sonunda buldu, ama kolay olmadı.'],
      right: 'Evet, tam dört yıl. Bu sürede çalışmayı bırakmadı.',
    });
    const bek = c.S('g', {}, svg);
    cizgi(c, bek, X.b + 20, Y - 22, X.b + 250, Y - 22, RENK.kotu, 3, { 'stroke-dasharray': '8 7' });
    yazi(c, bek, X.b + 135, Y - 38, 'dört yıl iş yok', { size: 20, kalin: 500, renk: RENK.kotu });
    gizle(bek); await belir(c, bek);
    const d3 = durak(X.c, '1915', 'Genel Görelilik', true);
    await uzat(X.b, X.c, 800); await belir(c, d3);
    await c.say('1915’te Genel Görelilik Teorisi’ni yayımladı.', { speak: 'Bin dokuz yüz on beşte Genel Görelilik Teorisi’ni yayımladı.' });
    const son = yazi(c, svg, 500, 470, 'fikirlerine direnildi, yılmadı', { size: 24, renk: RENK.dal });
    gizle(son); await belir(c, son);
    await c.say('Fikirlerine başta direnildi; yılmadı, teorilerini geliştirmeyi sürdürdü.');
    await c.choice({
      tag: 'Çıkarım yap', q: 'Bu yoldan hangi çıkarım yapılır?',
      options: ['Başarı ona hemen ve kolayca geldi', 'Engeller onu durdurmadı; kararlıydı', 'Kimseden yardım almadan çalıştı'], answer: 1,
      hints: ['Zaman şeridine bak: iş bulması dört yıl sürdü.', '', 'Bazı denklemler için matematik profesörlerinden yardım aldı.'],
      right: 'Evet. Yaşadıklarından bir sonuç çıkardın.',
    });
    await c.say('Bir yaşam öyküsünden böyle sonuç çıkarmaya <b>çıkarım</b> denir.');
  }

  /* ---- 4. Çıkarımı değerlendir ---- */
  const UNSUR = ['kararlılık', 'tutku', 'bilimsel erdem', 'ilke', 'eğitim', 'laboratuvar deneyimi', 'araştırma becerileri'];
  const UX = [[150, 340], [370, 340], [610, 340], [840, 340], [170, 420], [470, 420], [800, 420]];
  const CIKARIM = [
    { metin: 'Einstein yıllarca iş bulamadı; çalışmayı bırakmadı.', unsur: 0, sec: [4, 0, 5], ipucu: 'Zorluğa karşın sürdürmek hangi unsur?', gerekce: 'Evet. Vazgeçmemek kararlılıktır.' },
    { metin: 'Einstein: “…sadece derin bir anlama merakım var.”', unsur: 1, sec: [1, 3, 4], ipucu: 'Bir şeyi çok isteyerek yapmak hangi unsur?', gerekce: 'Evet. Onu yürüten merak, bir tutkudur.' },
    { metin: 'Einstein, amcası sayesinde cebir ve geometriyi sevdi.', unsur: 4, sec: [6, 0, 4], ipucu: 'Cebir ve geometri öğrenmek hangi unsur?', gerekce: 'Evet. Bu, eğitimiyle ilgili bir çıkarım.' },
    { metin: 'Hazini yoğunlukları ölçtü; sonuçları bugünkü değerlere çok yakın.', unsur: 6, sec: [1, 6, 3], ipucu: 'Doğru ölçüm yapabilmek hangi unsur?', gerekce: 'Evet. Doğru ölçmek bir araştırma becerisidir.' },
  ];
  async function degerlendir(c) {
    const svg = c.svg(1000, 562);
    const U = UNSUR.map((u, i) => etiket(c, svg, UX[i][0], UX[i][1], u, { size: 20 }));
    gizle(U.map((u) => u.g));
    for (const u of U) { belir(c, u.g, 250); await c.wait(90); }
    await c.say('Bir çıkarım bu yedi unsura göre değerlendirilir.');
    c.say('Çıkarım hangi unsurla ilgili?', { noWait: true });
    let k = null;
    await sirayla(c, CIKARIM, {
      tag: 'Değerlendir', soru: 'Bu çıkarım hangi unsurla ilgili?',
      secenekler: (o) => o.sec.map((i) => UNSUR[i]), dogru: (o) => o.sec.indexOf(o.unsur), ipucu: (o) => o.ipucu, gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 150, 50, 700, 150, { metin: o.metin, renk: RENK.kisi, size: 24 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => {
        const [x, y] = UX[o.unsur];
        await c.tween(600, (e) => { yer(k.g, 150 + (x - 150 - 70) * e, 50 + (y - 50 - 15) * e, 1 - 0.8 * e); k.g.style.opacity = 1 - e; });
        k.g.remove();
        U[o.unsur].kutu.setAttribute('stroke', RENK.iyi);
      },
      bekle: 1200,
    });
    await c.say('Çıkarımı unsurlara göre tartmaya <b>değerlendirme</b> denir.');
    kutu(c, svg, 150, 50, 700, 150, { renk: RENK.kisi });
    const b = yazi(c, svg, 500, 104, 'Ortak özellikler', { size: 20, renk: RENK.kisi });
    const o = yazi(c, svg, 500, 156, 'meraklı · sabırlı · kararlı · sorgulayıcı', { size: 27 });
    gizle(b, o); await belir(c, [b, o]);
    await c.say('Dört bilim insanının ortak yanı bu dört özellik.');
    c.note('<b>Bilim insanı:</b> meraklı, sabırlı, kararlı, sorgulayıcı', 'Ortak özellikler', 'ortak-ozellikler');
    await c.say('Çağ değişir; merak, azim ve titiz çalışma değişmez.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-c1', kicker: 'Konu C · Fizik bilimine yön verenler', title: 'Dört bilim insanı, ortak bir çalışma biçimi',
    accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Dört bilim insanı, ortak bir çalışma biçimi', hook: 'Yüzyıllar arayla yaşamış bilim insanlarının ortak yanı ne olabilir?', button: 'Derse başla ›' },
    goals: ['Bilim insanlarının bakış açısını, çalışma biçimini ve çalışmalarının etkisini inceler.', 'Deneyimlerinden çıkarım yapar ve çıkarımı değerlendirir.'],
    scenes: [
      { title: 'Devlerin omuzları', goal: 'Newton’ın öncekilerin çalışmalarına dayandığını gör.', run: devler },
      { title: 'Üç bilim insanı', goal: 'Üç bilim insanının çalışma biçimini belirle.', run: ucKisi },
      { title: 'Einstein’ın yolu', goal: 'Bir yaşam öyküsünden çıkarım yap.', run: yol1900 },
      { title: 'Çıkarımı değerlendir', goal: 'Çıkarımı programın unsurlarına göre değerlendir.', run: degerlendir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hazini’nin “Terazinin doğruluğu, fizik gözlemlerine ve ispatlara dayanır.” sözü hangi çalışma biçimini anlatır?',
        options: ['Öncekilerin sözünü olduğu gibi kabul etmek', 'Sonucu tahminle bulmak', 'Sonucu gözleme ve ispata dayandırmak'], answer: 2,
        why: ['Sözde kişi değil, gözlem ve ispat geçiyor.', 'Tahmin, gözlem ve ispatla sınanmadıkça yetmez.', 'Evet. Hazini doğruluğu gözleme ve ispata bağlar.'], scene: 1 },
      { q: 'Einstein 1905’ten sonra dört yıl kendi alanında iş bulamadı, çalışmayı bırakmadı. Bu hangi unsurla değerlendirilir?',
        options: ['Kararlılık', 'Laboratuvar deneyimi', 'Eğitim'], answer: 0,
        why: ['Evet. Zorluğa karşın sürdürmek kararlılıktır.', 'Burada bir laboratuvar çalışması anlatılmıyor.', 'Eğitim, öğrendikleriyle ilgilidir; burada vazgeçmemek anlatılıyor.'], scene: 3 },
    ],
    summary: ['<b>Çağ değişir; merak, azim ve titiz çalışma değişmez.</b>', 'Bilim insanı <b>meraklı, sabırlı, kararlı ve sorgulayıcıdır</b>.'],
    nextLesson: { href: 'd1-merak-et-sor.html', label: 'Sonraki: Merak et, sor ›' },
  });
})();
