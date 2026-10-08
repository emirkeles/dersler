/* B1 · KİM.9.1.2 a–b · Senaryo: plan/kimya/etkilesim/senaryolar/B-kimyasal-maddeler-ve-guvenlik.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 35 ve 39–40'tan (madde özellikleri tablosu, beş örnek olay). Öğrenciye kitap ya da
   sayfa anılmaz. Tepkimeler yalnızca sözle verilir, denklem yazılmaz; formüller yalnızca tahtadadır, seslendirilmez.
   Çizimler şematiktir: derzin soluklaşması ve sıçrayan damlalar ölçüm ya da hasar ölçüsü değildir. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const KOYU = '#162038', GRI = '#8f9bbd';
  /* Bir kavrama bir renk: zincirin halkaları ve madde türleri ders boyunca aynı renktedir. */
  const MADDE = 'var(--c1)', HATA = 'var(--c5)', SONUC = 'var(--bad)';
  const ASIT = 'var(--c2)', BAZ = 'var(--c4)', METAL = '#c9d1e6';
  const SAGLIK = 'var(--bad)', ZEMIN = 'var(--c6)', CEVRE = 'var(--c3)';

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const cizgi = (c, p, d, renk = RENK.cizgi, kalin = 4) => c.S('path', { d, fill: 'none', stroke: renk, 'stroke-width': kalin,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  /* (x1, y1) noktasından (x2, y2) noktasına ok. */
  function ok(c, p, x1, y1, x2, y2, renk = RENK.cizgi) {
    const a = Math.atan2(y2 - y1, x2 - x1), u = 13;
    const kanat = (d) => `M ${x2} ${y2} L ${x2 - u * Math.cos(a + d)} ${y2 - u * Math.sin(a + d)}`;
    return cizgi(c, p, `M ${x1} ${y1} L ${x2} ${y2} ${kanat(0.5)} ${kanat(-0.5)}`, renk);
  }
  const sil = async (c, el, ms = 300) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };

  /* Neden zinciri: Madde → Hata → Sonuç. yaz(i, satırlar) i. kutunun içini doldurur. */
  const HALKA = [{ ad: 'Madde', renk: MADDE }, { ad: 'Hata', renk: HATA }, { ad: 'Sonuç', renk: SONUC }];
  function zincir(c, p, y, h = 104) {
    const g = c.S('g', {}, p), w = 280, x = (i) => 30 + i * 330;
    const kutular = HALKA.map((halka, i) => {
      const kg = c.S('g', {}, g);
      const okEl = i ? ok(c, kg, x(i) - 42, y + h / 2, x(i) - 8, y + h / 2) : null;
      const r = kutu(c, kg, x(i), y, w, h, { renk: halka.renk });
      const ad = yazi(c, kg, x(i) + w / 2, y - 14, halka.ad, { size: 26, renk: halka.renk });
      return { g: kg, r, ad, okEl, ic: c.S('g', {}, kg) };
    });
    const yaz = (i, satirlar, renk, size = 24) => {
      const k = kutular[i], bas = y + h / 2 + size * 0.36 - (satirlar.length - 1) * 16;
      k.ic.replaceChildren();
      satirlar.forEach((s, n) => yazi(c, k.ic, x(i) + w / 2, bas + n * 32, s, { size, renk }));
      return k.ic;
    };
    const kalin = (i) => kutular.forEach((k, n) => k.r.setAttribute('stroke-width', n === i ? 6 : 3));
    return { g, kutular, yaz, kalin };
  }

  /* Küçük çizimler. Aksi yazılmadıkça (x, y) tabanın ortasıdır. */
  const ciz = {
    sise(c, p, x, y, renk, w = 64, h = 104) {
      const g = c.S('g', {}, p), k = w / 2;
      c.S('rect', { x: x - 13, y: y - h - 26, width: 26, height: 14, rx: 3, fill: renk }, g);
      c.S('path', { d: `M ${x - 11} ${y - h - 12} L ${x - 11} ${y - h} L ${x - k} ${y - h + 22} L ${x - k} ${y - 8} Q ${x - k} ${y} ${x - k + 8} ${y}
        L ${x + k - 8} ${y} Q ${x + k} ${y} ${x + k} ${y - 8} L ${x + k} ${y - h + 22} L ${x + 11} ${y - h} L ${x + 11} ${y - h - 12} Z`,
        fill: KOYU, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('rect', { x: x - k + 8, y: y - h + 42, width: w - 16, height: h * 0.32, rx: 4, fill: renk, opacity: 0.35 }, g);
      return g;
    },
    filiz(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x - 70} ${y} L ${x + 70} ${y}`, GRI, 4);
      [-44, 0, 44].forEach((dx) => {
        cizgi(c, g, `M ${x + dx} ${y} L ${x + dx} ${y - 46}`, renk, 4);
        c.S('path', { d: `M ${x + dx} ${y - 30} Q ${x + dx - 22} ${y - 44} ${x + dx - 20} ${y - 60} Q ${x + dx - 2} ${y - 52} ${x + dx} ${y - 30} Z`, fill: renk }, g);
        c.S('path', { d: `M ${x + dx} ${y - 46} Q ${x + dx + 22} ${y - 58} ${x + dx + 20} ${y - 76} Q ${x + dx + 2} ${y - 68} ${x + dx} ${y - 46} Z`, fill: renk }, g);
      });
      return g;
    },
    ilacKutusu(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      kutu(c, g, x - 48, y - 76, 96, 76, { rx: 8, renk });
      cizgi(c, g, `M ${x} ${y - 58} L ${x} ${y - 18} M ${x - 20} ${y - 38} L ${x + 20} ${y - 38}`, renk, 7);
      return g;
    },
    fabrika(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      c.S('circle', { cx: x + 52, cy: y - 146, r: 10, fill: GRI, opacity: 0.5 }, g);
      c.S('circle', { cx: x + 68, cy: y - 166, r: 14, fill: GRI, opacity: 0.35 }, g);
      c.S('path', { d: `M ${x - 70} ${y} L ${x - 70} ${y - 66} L ${x - 30} ${y - 92} L ${x - 30} ${y - 66} L ${x + 10} ${y - 92} L ${x + 10} ${y - 66}
        L ${x + 36} ${y - 66} L ${x + 36} ${y - 130} L ${x + 60} ${y - 130} L ${x + 60} ${y - 66} L ${x + 70} ${y - 66} L ${x + 70} ${y} Z`,
        fill: KOYU, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      [-50, -10].forEach((dx) => c.S('rect', { x: x + dx, y: y - 44, width: 22, height: 20, rx: 2, fill: renk, opacity: 0.5 }, g));
      return g;
    },
    ev(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 46} ${y} L ${x - 46} ${y - 50} L ${x} ${y - 88} L ${x + 46} ${y - 50} L ${x + 46} ${y} Z`,
        fill: KOYU, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('rect', { x: x - 11, y: y - 34, width: 22, height: 34, fill: renk, opacity: 0.5 }, g);
      return g;
    },
    /* Deney balonu: laboratuvarın simgesi. */
    balon(c, p, x, y, renk) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 11} ${y - 88} L ${x + 11} ${y - 88} L ${x + 11} ${y - 52} L ${x + 40} ${y - 6} Q ${x + 44} ${y} ${x + 36} ${y}
        L ${x - 36} ${y} Q ${x - 44} ${y} ${x - 40} ${y - 6} L ${x - 11} ${y - 52} Z`, fill: KOYU, stroke: renk, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('path', { d: `M ${x - 24} ${y - 30} L ${x + 24} ${y - 30} L ${x + 38} ${y - 5} L ${x - 38} ${y - 5} Z`, fill: renk, opacity: 0.5 }, g);
      return g;
    },
    /* Tava: (x, y) ağzın ortası; sap sağa uzanır. */
    tava(c, p, x, y, renk = GRI) {
      const g = c.S('g', {}, p);
      cizgi(c, g, `M ${x + 44} ${y} L ${x + 88} ${y - 7}`, renk, 7);
      c.S('ellipse', { cx: x, cy: y, rx: 48, ry: 12, fill: '#2b3757', stroke: renk, 'stroke-width': 3 }, g);
      return g;
    },
    /* Balık: (x, y) gövdenin ortası; s ölçek. Baş sağdadır. */
    balik(c, p, x, y, s, renk) {
      const g = c.S('g', {}, p);
      c.S('path', { d: `M ${x - 26 * s} ${y} L ${x - 46 * s} ${y - 14 * s} L ${x - 46 * s} ${y + 14 * s} Z`, fill: renk }, g);
      c.S('ellipse', { cx: x, cy: y, rx: 30 * s, ry: 14 * s, fill: renk }, g);
      c.S('circle', { cx: x + 16 * s, cy: y - 3 * s, r: 2.5 * s, fill: KOYU }, g);
      return g;
    },
    bulut(c, p, x, y, renk, s = 1) {
      const g = c.S('g', {}, p);
      [[-34, 6, 28], [0, -10, 36], [36, 8, 27], [-6, 16, 30]].forEach(([dx, dy, r]) => c.S('circle', { cx: x + dx * s, cy: y + dy * s, r: r * s, fill: renk, opacity: 0.45 }, g));
      return g;
    },
  };

  /* ---- Sahne 1 · Kazaya üç soru ---- */
  async function ucSoru(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    const alan = (x, ad, cizim) => {
      const g = c.S('g', {}, giris);
      cizim(g, x);
      yazi(c, g, x, 330, ad, { size: 30 });
      g.style.opacity = 0;
      return g;
    };
    const alanlar = [
      alan(220, 'Tarım', (g, x) => ciz.filiz(c, g, x, 270, 'var(--c3)')),
      alan(500, 'İlaç', (g, x) => ciz.ilacKutusu(c, g, x, 270, MADDE)),
      alan(780, 'Temizlik', (g, x) => ciz.sise(c, g, x, 270, BAZ)),
    ];
    for (const g of alanlar) await belir(c, g, 280);
    await c.say('Kimyasal maddeler tarımda, ilaç yapımında ve temizlikte yaygın olarak kullanılır.');
    await belir(c, yazi(c, giris, 500, 440, 'Yanlış kullanım: sağlığa ve çevreye zarar', { size: 30, renk: SONUC }), 350);
    await c.say('Yanlış kullanılırlarsa insan sağlığına ve çevreye zarar verebilirler.');

    await sil(c, giris, 350);
    const z = zincir(c, svg, 200, 120);
    z.kutular.forEach((k, i) => { k.ad.style.opacity = 0; z.yaz(i, ['?'], RENK.soluk, 44); });
    await belir(c, z.g);
    await c.say('Böyle bir kazayı anlamak için üç soru sorarız.');
    const sor = async (i, metin) => {
      z.yaz(i, [metin], undefined, 28);
      z.kalin(i);
      await c.tween(300, (e) => { z.kutular[i].ad.style.opacity = e; });
    };
    await sor(0, 'Hangi madde?');
    await c.say('Hangi madde kullanıldı?', { speak: '[curious] Hangi madde kullanıldı?' });
    await sor(1, 'Hangi hata?');
    await c.say('Kullanırken hangi hata yapıldı?');
    await sor(2, 'Hangi sonuç?');
    await c.say('Bu hata hangi sonuca yol açtı?');
    z.kalin(-1);
    z.kutular.forEach((k) => { if (k.okEl) k.okEl.setAttribute('stroke', 'var(--text)'); });
    const baslik = yazi(c, svg, 500, 110, 'Neden zinciri', { size: 36 });
    await belir(c, baslik, 350);
    await c.say('Madde, hata ve sonuç birlikte kazanın neden zincirini oluşturur.');

    /* Zincir yukarı çıkar; altına banyo çizilir. */
    baslik.remove();
    [0, 1, 2].forEach((i) => z.yaz(i, []));
    const banyo = c.S('g', {}, svg);
    for (let x = 120; x <= 880; x += 76) cizgi(c, banyo, `M ${x} 200 L ${x} 468`, '#24304f', 2);
    for (let y = 200; y <= 468; y += 67) cizgi(c, banyo, `M 120 ${y} L 880 ${y}`, '#24304f', 2);
    cizgi(c, banyo, 'M 80 470 L 920 470', RENK.cizgi, 4);
    c.S('path', { d: 'M 640 378 L 880 378 L 870 440 Q 866 464 842 464 L 678 464 Q 654 464 650 440 Z', fill: KOYU, stroke: GRI, 'stroke-width': 3 }, banyo);
    yazi(c, banyo, 760, 432, 'Banyo', { size: 28, renk: RENK.soluk });
    banyo.style.opacity = 0;
    await c.tween(500, (e) => { z.g.setAttribute('transform', `translate(0 ${-142 * e})`); banyo.style.opacity = e; });
    await c.say('İlk olay bir evin banyosunda geçiyor.');
    const urun = (x, ad, renk) => {
      const g = c.S('g', {}, banyo);
      ciz.sise(c, g, x, 466, renk);
      yazi(c, g, x, 508, ad, { size: 26, renk });
      return g;
    };
    const leke = (renk) => c.S('ellipse', { cx: 390, cy: 462, rx: 0, ry: 6, fill: renk, opacity: 0.75 }, banyo);
    const leke1 = leke(ASIT);
    await belir(c, urun(250, 'Tuz ruhu', ASIT), 350);
    await c.tween(450, (e) => { leke1.setAttribute('rx', 80 * e); });
    z.yaz(0, ['Tuz ruhu']);
    await c.say('Evin büyüklerinden biri banyoyu tuz ruhuyla temizliyor.');
    const leke2 = leke(BAZ);
    await belir(c, urun(530, 'Çamaşır suyu', BAZ), 350);
    await c.tween(450, (e) => { leke2.setAttribute('rx', 56 * e); });
    z.yaz(0, ['Tuz ruhu +', 'çamaşır suyu']);
    await c.say('Ardından yüzeyi suyla durulamadan üstüne çamaşır suyu döküyor.');
    const amac = yazi(c, banyo, 390, 290, 'Amaç: daha iyi temizlik', { size: 28, renk: RENK.soluk });
    await belir(c, amac, 350);
    await c.say('Amacı banyoyu daha iyi temizlemek.');

    await c.choice({ tag: 'Uygula', q: '“Yüzeyi durulamadan çamaşır suyu dökmek” zincirin hangi halkasına yazılır?', options: ['Madde', 'Hata', 'Sonuç'], answer: 1,
      hints: ['Madde, kullanılan ürünlerdir: tuz ruhu ve çamaşır suyu.', '', 'Sonuç, hatanın ardından ortaya çıkan şeydir; dökmek ise bir davranış.'],
      right: 'Hata. Durulamadan dökmek, kişinin yaptığı bir davranıştır.',
      onPick: (i, dogru) => { if (dogru) { z.yaz(1, ['Durulamadan', 'üstüne dökmek']); z.kalin(1); } } });
    amac.remove();
    await c.say('Dökmek bir davranıştır; zincirde hata halkasına yazılır.');
    z.yaz(2, ['?'], SONUC, 44);
    z.kalin(2);
    await c.say('Sonuç kutusu hâlâ boş; onu maddelerin özellikleri dolduracak.');
  }

  /* ---- Sahne 2 · İki ürün, bir gaz ---- */
  async function ikiUrun(c) {
    const svg = c.svg();
    const kartlar = c.S('g', {}, svg);
    /* Ürün kartı: solda şişe, sağda ad ve satırlar; altta kullanım ya da tür. */
    const urunKart = (x, ad, renk) => {
      const g = c.S('g', {}, kartlar);
      kutu(c, g, x, 60, 380, 290, { renk });
      ciz.sise(c, g, x + 62, 250, renk, 68, 116);
      yazi(c, g, x + 122, 118, ad, { size: 30, renk, hiza: 'start' });
      const satir = (i, metin) => belir(c, yazi(c, g, x + 122, 166 + i * 44, metin, { size: 26, hiza: 'start' }), 350);
      const alt = c.S('g', {}, g);
      const altYaz = (satirlar, o = {}) => {
        alt.replaceChildren();
        satirlar.forEach((s, i) => yazi(c, alt, x + 190, 322 - (satirlar.length - 1) * 30 + i * 30, s, { size: o.size || 24, renk: o.renk || RENK.soluk }));
        return belir(c, alt, 350);
      };
      return { g, satir, altYaz, x };
    };
    const tuz = urunKart(40, 'Tuz ruhu', ASIT);
    tuz.satir(0, 'HCl çözeltisi');
    await belir(c, tuz.g);
    await c.say('Tuz ruhu, hidrojen klorür gazının sulu çözeltisidir.');
    await tuz.satir(1, 'Hidroklorik asit');
    await c.say('Kimyadaki adı hidroklorik asittir.');
    await tuz.altYaz(['Kireç ve kir giderir']);
    await c.say('Evlerde fayanstaki kireci ve kiri gidermek için kullanılır.');
    const camasir = urunKart(580, 'Çamaşır suyu', BAZ);
    camasir.satir(0, 'NaClO');
    camasir.satir(1, 'Sodyum hipoklorit');
    await belir(c, camasir.g);
    await c.say('Çamaşır suyunun içinde genellikle sodyum hipoklorit bulunur.');
    await camasir.altYaz(['Ağartır, temizler,', 'dezenfekte eder']);
    await c.say('Çamaşır suyu ağartmak, temizlemek ve dezenfekte etmek için kullanılır.');
    await Promise.all([tuz.altYaz(['Asit'], { size: 32, renk: ASIT }), camasir.altYaz(['Baz'], { size: 32, renk: BAZ })]);
    await c.say('Tuz ruhu asittir; çamaşır suyu ise baz özellik gösterir.');

    const gaz = c.S('g', {}, svg);
    const oklar = c.S('g', {}, gaz);
    ok(c, oklar, 300, 358, 420, 420, ASIT);
    ok(c, oklar, 700, 358, 580, 420, BAZ);
    const bulut = ciz.bulut(c, gaz, 500, 430, SONUC);
    yazi(c, gaz, 500, 508, 'Klor gazı (Cl₂)', { size: 30, renk: SONUC });
    bulut.style.opacity = 0;
    await belir(c, gaz, 350);
    await c.tween(600, (e) => { bulut.style.opacity = e; bulut.setAttribute('transform', `translate(0 ${14 * (1 - e)})`); });
    await c.say('Bu iki ürün karışınca klor gazı açığa çıkar.');
    await belir(c, yazi(c, gaz, 500, 546, 'Öksürük, nefes darlığı, göğüs ağrısı', { size: 24 }), 350);
    await c.say('Klor gazı solunduğunda öksürük, nefes darlığı ve göğüs ağrısı yapabilir.');

    const sira = c.S('g', {}, svg);
    yazi(c, sira, 770, 42, 'Önce', { size: 26 });
    yazi(c, sira, 230, 42, 'Sonra', { size: 26 });
    await belir(c, sira, 350);
    await c.choice({ tag: 'Uygula', q: 'Başka bir gün lavaboya önce çamaşır suyu, ardından tuz ruhu dökülüyor. Ne beklenir?',
      options: ['Sıra değiştiği için gaz çıkmaz.', 'Lavabo iki kat temizlenir.', 'Yine klor gazı çıkabilir.'], answer: 2,
      hints: ['Lavaboda iki ürün yine birbirine karışıyor.', 'İki ürün karışınca temizlik artmamış, klor gazı çıkmıştı.', ''],
      right: 'İki ürün yine karışıyor; klor gazı yine çıkabilir.' });
    sira.style.opacity = 0.35;
    oklar.querySelectorAll('path').forEach((p) => p.setAttribute('stroke-width', 7));
    await belir(c, yazi(c, svg, 500, 368, 'Karışma', { size: 28, renk: SONUC }), 350);
    await c.say('Gazı çıkaran, ürünlerin sırası değil birbirine karışmasıdır.',
      { speak: '[thoughtful] Gazı çıkaran, ürünlerin sırası değil birbirine karışmasıdır.' });

    await c.tween(350, (e) => { svg.style.opacity = 1 - e; });
    svg.replaceChildren(); svg.style.opacity = 1;
    const z = zincir(c, svg, 150, 120);
    z.yaz(0, ['Tuz ruhu +', 'çamaşır suyu']);
    z.yaz(1, ['Durulamadan', 'üstüne dökmek']);
    z.yaz(2, ['Klor gazı'], SONUC, 28);
    z.kalin(2);
    ciz.bulut(c, z.g, 830, 350, SONUC, 0.9);
    yazi(c, z.g, 345, 400, 'Daha iyi temizlik değil,', { size: 30 });
    yazi(c, z.g, 345, 442, 'zararlı bir gaz', { size: 30, renk: SONUC });
    await belir(c, z.g);
    await c.say('İki temizleyici birlikte daha iyi temizlemedi; zararlı bir gaz çıkardı.');
    c.note('<b>Çamaşır suyu ile tuz ruhu karışırsa klor gazı çıkar.</b>', 'İki ürün, bir gaz');
  }

  /* ---- Sahne 3 · Zemindeki derz ---- */
  async function derz(c) {
    const svg = c.svg();
    const z = zincir(c, svg, 56, 96);
    const zemin = c.S('g', {}, svg);
    /* Zemin: derz renginde taban, üstünde altı seramik. Seramikler arasında kalan şeritler derzdir. */
    const derzEl = c.S('rect', { x: 440, y: 196, width: 500, height: 296, rx: 4, fill: '#6f6a5c' }, zemin);
    for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) {
      c.S('rect', { x: 450 + k * 164, y: 206 + r * 143, width: 152, height: 133, rx: 3, fill: '#2b3757' }, zemin);
    }
    const alt = yazi(c, svg, 690, 532, 'Banyo zemini', { size: 26, renk: RENK.soluk });
    await Promise.all([belir(c, z.g), belir(c, zemin), belir(c, alt)]);
    await c.say('İkinci olay da bir banyoda geçiyor.');
    const lekeler = c.S('g', {}, zemin);
    [[520, 262, 34, 16], [700, 300, 26, 14], [850, 250, 30, 13], [560, 420, 28, 15], [760, 430, 36, 14]]
      .forEach(([cx, cy, rx, ry]) => c.S('ellipse', { cx, cy, rx, ry, fill: '#e8ecf5', opacity: 0.75 }, lekeler));
    const siseG = c.S('g', {}, svg);
    ciz.sise(c, siseG, 210, 410, ASIT, 92, 150);
    const siseAd = yazi(c, svg, 210, 452, 'Kireç çözücü', { size: 28, renk: ASIT });
    alt.textContent = 'Seramiklerde kireç lekeleri';
    await Promise.all([belir(c, lekeler, 400), belir(c, siseG, 400), belir(c, siseAd, 400)]);
    await c.say('Kireç çözücü, kireç lekelerini temizleyen bir temizlik ürünüdür.');
    const asitAd = yazi(c, svg, 210, 492, 'Asit içerir', { size: 26 });
    await belir(c, asitAd, 350);
    await c.say('Kireç çözücülerin yapımında asitler kullanılır.');
    alt.textContent = 'Seramiklerin arası: derz';
    alt.style.fill = 'var(--text)';
    derzEl.setAttribute('fill', '#d8c9a0');
    await c.tween(500, (e) => { lekeler.style.opacity = 1 - 0.7 * e; });
    await c.say('Yer seramiklerinin arası derz denen bir dolguyla doldurulur.');
    alt.textContent = 'Derz: çimento';
    await c.say('Derz dolgusu çimentodan yapılır.');
    alt.textContent = 'Çimentodaki mineraller asitle tepkime verir';
    await c.say('Çimentonun içindeki mineraller asidik maddelerle tepkime verir.');
    /* Şişe eğilir; sıvı bütün zemine yayılır (şematik). */
    const sivi = c.S('rect', { x: 440, y: 196, width: 0, height: 296, rx: 4, fill: ASIT, opacity: 0.3 }, zemin);
    z.yaz(0, ['Kireç çözücü', '(asit içerir)']);
    await c.tween(900, (e) => { siseG.setAttribute('transform', `rotate(${50 * e} 256 410)`); sivi.setAttribute('width', 500 * e); lekeler.style.opacity = 0.3 * (1 - e); });
    await c.say('Bir kişi güçlü kireç çözücüyü sulandırmadan bütün zemine döküyor.');

    await c.choice({ q: 'Asit içeren çözücü, zeminde kireç lekelerinden başka neyle tepkime verebilir?',
      options: ['Yalnızca kireçle; başka hiçbir şeyle', 'Seramiklerin arasındaki derzle', 'Hiçbir şeyle; sulandırılmadığı için etkisizdir.'], answer: 1,
      hints: ['Asit yalnızca kireci seçmez. Derzin neyden yapıldığını düşün.', '', 'Çözücü güçlüdür ve sulandırılmamıştır; etkisiz olamaz.'],
      right: 'Derz çimentodandır; çimentodaki mineraller asitle tepkime verir.' });
    alt.textContent = 'Şematik gösterim';
    alt.style.fill = RENK.soluk;
    await c.tween(800, (e) => { derzEl.style.opacity = 1 - 0.8 * e; sivi.setAttribute('opacity', 0.3 - 0.2 * e); });
    z.yaz(2, ['Derz zarar', 'görebilir']);
    z.kalin(2);
    await c.say('Çözücüdeki asit, derzdeki minerallerle de tepkime verir; derz zarar görebilir.');
    z.yaz(1, ['Sulandırmadan', 'bütün zemine dökmek']);
    z.kalin(1);
    await c.say('Hata, güçlü çözücüyü sulandırmadan bütün zemine dökmekti.',
      { speak: 'Hata, [short pause] güçlü çözücüyü sulandırmadan bütün zemine dökmekti.' });
  }

  /* ---- Sahne 4 · Denize bırakılan cıva ---- */
  async function civa(c) {
    const svg = c.svg();
    const yol = c.S('g', {}, svg);
    const fabrika = c.S('g', {}, yol);
    ciz.fabrika(c, fabrika, 140, 460, GRI);
    yazi(c, fabrika, 140, 500, 'Fabrika', { size: 28 });
    await belir(c, fabrika);
    await c.say('Üçüncü olay bir fabrikada geçiyor.');
    const kartG = c.S('g', {}, svg);
    kutu(c, kartG, 200, 24, 600, 176, { renk: METAL });
    c.S('ellipse', { cx: 270, cy: 112, rx: 34, ry: 22, fill: METAL }, kartG);
    c.S('ellipse', { cx: 260, cy: 104, rx: 10, ry: 5, fill: '#ffffff', opacity: 0.8 }, kartG);
    yazi(c, kartG, 540, 76, 'Cıva (Hg)', { size: 34, renk: METAL });
    yazi(c, kartG, 540, 124, 'Sıvı, ağır bir metal', { size: 28 });
    await belir(c, kartG);
    await c.say('Cıva, oda sıcaklığında sıvı hâlde bulunan ağır bir metaldir.');
    const zehir = yazi(c, kartG, 540, 170, 'Zehirli', { size: 28, renk: SONUC });
    await belir(c, zehir, 350);
    await c.say('Cıva zehirlidir; vücuda girince organlara yayılır.');
    zehir.textContent = 'Böbrek, karaciğer, sinir sistemi';
    await c.say('Böbreklere, karaciğere ve sinir sistemine zarar verebilir.');
    zehir.textContent = 'Zehirli';
    /* Deniz: fabrikadan çıkan atık borusu denize açılır. */
    const deniz = c.S('g', {}, yol);
    c.S('rect', { x: 330, y: 346, width: 320, height: 116, rx: 8, fill: 'var(--c1)', opacity: 0.22 }, deniz);
    cizgi(c, deniz, 'M 330 346 Q 350 332 370 346 T 410 346 T 450 346 T 490 346 T 530 346 T 570 346 T 610 346 T 650 346', 'var(--c1)', 4);
    yazi(c, deniz, 490, 500, 'Deniz', { size: 28 });
    cizgi(c, deniz, 'M 212 430 L 322 430', GRI, 9);
    await belir(c, deniz);
    const damla = (x, y) => c.S('circle', { cx: x, cy: y, r: 7, fill: METAL }, yol);
    const atik = [0, 1, 2].map(() => damla(216, 430));
    for (let i = 0; i < 3; i++) {
      await c.tween(380, (e) => { atik[i].setAttribute('cx', Ders.lerp(216, 370 + i * 42, e)); atik[i].setAttribute('cy', Ders.lerp(430, 420 + (i % 2) * 22, e)); });
    }
    await c.say('Kimyasal madde üreten bir fabrika, atık cıvasını denize bırakıyor.');
    const zincirG = c.S('g', {}, yol);
    ciz.balik(c, zincirG, 440, 396, 0.7, 'var(--c6)');
    ok(c, zincirG, 478, 398, 508, 402, 'var(--text)');
    ciz.balik(c, zincirG, 572, 408, 1.25, 'var(--c6)');
    yazi(c, zincirG, 490, 322, 'Besin zinciri', { size: 26, renk: 'var(--c6)' });
    await belir(c, zincirG, 400);
    await c.say('Denizdeki canlılar birbirini yiyerek beslenir; buna besin zinciri denir.');
    const sofra = c.S('g', {}, yol);
    ok(c, sofra, 662, 410, 748, 410, 'var(--text)');
    c.S('ellipse', { cx: 850, cy: 420, rx: 86, ry: 26, fill: KOYU, stroke: GRI, 'stroke-width': 3 }, sofra);
    ciz.balik(c, sofra, 852, 414, 1.1, 'var(--c6)');
    yazi(c, sofra, 850, 500, 'Sofra', { size: 28 });
    await belir(c, sofra, 400);
    /* Cıva damlaları balıklara, oradan sofradaki balığa geçer. */
    const hedef = [[440, 396], [580, 408], [860, 414]];
    await c.tween(700, (e) => atik.forEach((d, i) => {
      d.setAttribute('cx', Ders.lerp(370 + i * 42, hedef[i][0], e)); d.setAttribute('cy', Ders.lerp(420 + (i % 2) * 22, hedef[i][1], e)); d.setAttribute('r', 7 - 2 * e);
    }));
    yol.append(...atik);
    await c.say('Sudaki cıva, besin zinciriyle insana kadar ulaşabilir.');

    await c.choice({ tag: 'Uygula', q: 'Fabrikadan çok uzakta yaşayan biri bu denizden tutulan balığı yiyor. Cıvadan etkilenebilir mi?',
      options: ['Evet; cıva besin zinciriyle ona ulaşabilir.', 'Hayır; cıva yalnızca fabrikada çalışanları etkiler.', 'Hayır; deniz suyu cıvayı zararsız yapar.'], answer: 0,
      hints: ['', 'Cıva fabrikada kalmadı; atık olarak denize bırakıldı.', 'Sudaki cıva besin zincirine girer; balıkla birlikte sofraya gelebilir.'],
      right: 'Balık o denizden geldiği için cıva sofraya kadar ulaşabilir.' });
    const etiketler = c.S('g', {}, svg);
    yazi(c, etiketler, 140, 538, 'Hata', { size: 26, renk: HATA });
    const s1 = yazi(c, etiketler, 490, 538, 'Sonuç', { size: 26, renk: SONUC });
    const s2 = yazi(c, etiketler, 850, 538, 'Sonuç', { size: 26, renk: SONUC });
    await belir(c, etiketler, 350);
    await c.say('Hata fabrikada yapıldı; sonuç denizde ve sofrada ortaya çıktı.',
      { speak: 'Hata fabrikada yapıldı; [short pause] sonuç denizde ve sofrada ortaya çıktı.' });
    s1.textContent = 'Sonuç: çevre';
    s2.textContent = 'Sonuç: insan sağlığı';
    await c.say('Bu olayda zarar hem çevreye hem insan sağlığına dokunuyor.');
  }

  /* ---- Sahne 5 · Su dolu kapta sodyum ---- */
  async function sodyum(c) {
    const svg = c.svg();
    cizgi(c, svg, 'M 40 442 L 960 442', RENK.cizgi, 4);
    const ust = yazi(c, svg, 500, 76, 'Kimya laboratuvarı', { size: 34, renk: RENK.soluk });
    const balon = ciz.balon(c, svg, 500, 438, GRI);
    await belir(c, svg);
    await c.say('Dördüncü olay bir kimya laboratuvarında geçiyor.');
    balon.remove();
    ust.textContent = 'Sodyum (Na)';
    ust.style.fill = METAL;
    const ozellik = yazi(c, svg, 500, 124, 'Yumuşak, kaygan bir metal', { size: 28 });
    const parca = c.S('rect', { x: 440, y: 250, width: 120, height: 80, rx: 16, fill: METAL, stroke: GRI, 'stroke-width': 3 }, svg);
    await Promise.all([belir(c, ozellik, 350), belir(c, parca, 350)]);
    await c.say('Sodyum yumuşak ve kaygan bir metaldir.');
    ozellik.textContent = 'Çok kolay tepkimeye girer';
    const kivilcim = c.S('g', {}, svg);
    [[-92, -20, -70, -10], [-88, 46, -68, 34], [92, -20, 70, -10], [88, 46, 68, 34], [0, -70, 0, -50]]
      .forEach(([x1, y1, x2, y2]) => cizgi(c, kivilcim, `M ${500 + x1} ${290 + y1} L ${500 + x2} ${290 + y2}`, HATA, 4));
    await belir(c, kivilcim, 350);
    await c.say('Başka maddelerle çok kolay tepkimeye girer.');
    kivilcim.remove();
    /* Su dolu cam kap. */
    const kap = c.S('g', {}, svg);
    c.S('rect', { x: 743, y: 330, width: 154, height: 108, fill: 'var(--c1)', opacity: 0.3 }, kap);
    cizgi(c, kap, 'M 740 286 L 740 430 Q 740 440 750 440 L 890 440 Q 900 440 900 430 L 900 286', GRI, 4);
    yazi(c, kap, 820, 486, 'Su', { size: 28, renk: 'var(--c1)' });
    ozellik.textContent = 'Suyla şiddetli tepkime: patlama riski';
    ozellik.style.fill = SONUC;
    await belir(c, kap);
    await c.say('Suyla şiddetli bir tepkime verir; suya değmesi patlama riski taşır.');
    /* Yağ dolu kavanoz: sodyum parçası içine girer. */
    const kavanoz = c.S('g', {}, svg);
    c.S('rect', { x: 108, y: 330, width: 124, height: 108, fill: '#d9b44a', opacity: 0.4 }, kavanoz);
    [[124, 408], [190, 400]].forEach(([x, y]) => c.S('rect', { x, y, width: 30, height: 20, rx: 5, fill: METAL }, kavanoz));
    const cam = cizgi(c, kavanoz, 'M 105 296 L 105 430 Q 105 440 115 440 L 225 440 Q 235 440 235 430 L 235 296', GRI, 4);
    c.S('rect', { x: 98, y: 282, width: 144, height: 14, rx: 4, fill: GRI }, kavanoz);
    const yagAd = yazi(c, kavanoz, 170, 486, 'Yağ içinde saklanır', { size: 26, renk: '#d9b44a' });
    await belir(c, kavanoz);
    await c.tween(600, (e) => {
      parca.setAttribute('x', Ders.lerp(440, 154, e)); parca.setAttribute('y', Ders.lerp(250, 380, e));
      parca.setAttribute('width', Ders.lerp(120, 34, e)); parca.setAttribute('height', Ders.lerp(80, 22, e)); parca.setAttribute('rx', Ders.lerp(16, 5, e));
    });
    await c.say('Sodyum, yağ içinde saklanır.');
    const olcu = c.S('g', {}, svg);
    c.S('rect', { x: 420, y: 412, width: 44, height: 28, rx: 6, fill: METAL }, olcu);
    cizgi(c, olcu, 'M 414 400 L 470 400 M 414 394 L 414 406 M 470 394 L 470 406', 'var(--text)', 3);
    yazi(c, olcu, 500, 486, 'Belirtilen miktar', { size: 26 });
    await belir(c, olcu, 350);
    await c.say('Bir deneyde suya konacak sodyumun miktarı önceden belirlenmiş.');
    const fazla = c.S('g', {}, svg);
    const buyuk = c.S('rect', { x: 496, y: 378, width: 104, height: 62, rx: 12, fill: METAL, stroke: HATA, 'stroke-width': 4 }, fazla);
    const fazlaAd = yazi(c, fazla, 548, 360, 'Fazla', { size: 28, renk: HATA });
    await belir(c, fazla, 350);
    await c.tween(900, (e) => {
      buyuk.setAttribute('x', Ders.lerp(496, 768, e));
      buyuk.setAttribute('y', Ders.lerp(378, 356, e) - 150 * Math.sin(Math.PI * e));
      fazlaAd.setAttribute('x', Ders.lerp(548, 820, e));
      fazlaAd.setAttribute('y', Ders.lerp(360, 268, e));
    });
    await c.say('Bir öğretmen belirtilenden fazla sodyum alıp su dolu kaba koyuyor.');

    await c.choice({ tag: 'Uygula', q: 'Bu olayda hata hangisidir?',
      options: ['Sodyumu yağ içinde saklamak', 'Belirtilenden fazla sodyumu suya koymak', 'Deneyi laboratuvarda yapmak'], answer: 1,
      hints: ['Sodyum zaten yağ içinde saklanır; bu doğru bir davranıştır.', '', 'Kimya deneyleri laboratuvarda yapılır; hata bu değildir.'],
      right: 'Miktar önceden belirlenmişti; öğretmen bundan fazlasını suya koydu.' });
    const patlama = c.S('g', {}, svg);
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * Math.PI * 2, r1 = 62, r2 = 62 + (k % 2 ? 22 : 38);
      cizgi(c, patlama, `M ${820 + r1 * Math.cos(a)} ${388 + r1 * 0.8 * Math.sin(a)} L ${820 + r2 * Math.cos(a)} ${388 + r2 * 0.8 * Math.sin(a)}`, SONUC, 5);
    }
    await belir(c, patlama, 400);
    await c.say('Fazla sodyum, suyla daha şiddetli bir tepkime demektir.');
    cam.setAttribute('stroke', 'var(--good)');
    yagAd.textContent = 'Yağ içinde: hata değil';
    yagAd.style.fill = 'var(--good)';
    await c.say('Yağ içinde saklamak hata değildir; sodyum zaten öyle saklanır.',
      { speak: '[thoughtful] Yağ içinde saklamak hata değildir; sodyum zaten öyle saklanır.' });
  }

  /* ---- Sahne 6 · Mutfakta yağ çözücü ---- */
  async function mutfak(c) {
    const svg = c.svg();
    const sahne = c.S('g', {}, svg);
    cizgi(c, sahne, 'M 40 270 L 960 270', RENK.cizgi, 4);
    const ust = yazi(c, sahne, 290, 56, 'Restoran mutfağı', { size: 32, renk: RENK.soluk });
    const z = zincir(c, svg, 362, 88);
    await Promise.all([belir(c, sahne), belir(c, z.g)]);
    await c.say('Son olay bir restoranın mutfağında geçiyor.');
    const urun = c.S('g', {}, sahne);
    ciz.sise(c, urun, 120, 268, BAZ);
    yazi(c, urun, 120, 302, 'Yağ çözücü', { size: 24, renk: BAZ });
    const yagli = c.S('g', {}, sahne);
    ciz.tava(c, yagli, 300, 256);
    c.S('ellipse', { cx: 296, cy: 256, rx: 26, ry: 6, fill: '#d9b44a', opacity: 0.8 }, yagli);
    await Promise.all([belir(c, urun, 350), belir(c, yagli, 350)]);
    await c.say('Yağ çözücü, mutfak eşyalarındaki yağ tabakasını temizler.');
    ust.textContent = 'Sodyum hidroksit: bir baz';
    ust.style.fill = BAZ;
    await c.say('İçinde çoğunlukla sodyum hidroksit denen bir baz bulunur.');
    ust.textContent = 'Göze: yanma, cilde: tahriş';
    ust.style.fill = SONUC;
    await c.say('Bu madde göze değerse yanma, cilde değerse tahriş yapabilir.');
    /* Öğrenci, içinde yağ çözücülü su olan büyük kap ve üç tava. */
    yagli.remove();
    const ogrenci = c.S('g', {}, sahne);
    c.S('circle', { cx: 850, cy: 140, r: 40, fill: KOYU, stroke: 'var(--text)', 'stroke-width': 3 }, ogrenci);
    [836, 864].forEach((cx) => c.S('circle', { cx, cy: 134, r: 4, fill: 'var(--text)' }, ogrenci));
    cizgi(c, ogrenci, 'M 786 268 Q 786 196 850 196 Q 914 196 914 268', 'var(--text)', 3);
    const tavalar = c.S('g', {}, sahne);
    [0, 1, 2].forEach((i) => ciz.tava(c, tavalar, 540, 150 - i * 15));
    const kap = c.S('g', {}, sahne);
    c.S('path', { d: 'M 424 206 L 432 256 Q 434 268 446 268 L 634 268 Q 646 268 648 256 L 656 206 Z', fill: BAZ, opacity: 0.3 }, kap);
    cizgi(c, kap, 'M 418 172 L 432 256 Q 434 268 446 268 L 634 268 Q 646 268 648 256 L 662 172', GRI, 4);
    await Promise.all([belir(c, ogrenci, 350), belir(c, tavalar, 350), belir(c, kap, 350)]);
    const tasi = (y0, y1, ms, ease) => c.tween(ms, (e) => tavalar.setAttribute('transform', `translate(0 ${Ders.lerp(y0, y1, e)})`), ease);
    await tasi(0, 84, 600);
    await c.say('Mutfakta çalışan bir öğrenci tavaları yağ çözücülü suya batırıyor.');
    /* Eldiven: sapları tutan el. */
    const eldiven = c.S('g', {}, sahne);
    c.S('path', { d: 'M 594 74 Q 594 58 610 58 L 634 58 Q 650 58 650 74 L 650 118 Q 650 132 636 132 L 608 132 Q 594 132 594 118 Z', fill: 'var(--c3)' }, eldiven);
    c.S('path', { d: 'M 594 96 Q 574 92 576 110 Q 578 124 596 120 Z', fill: 'var(--c3)' }, eldiven);
    c.S('rect', { x: 598, y: 40, width: 48, height: 20, rx: 5, fill: 'var(--c3)', opacity: 0.6 }, eldiven);
    eldiven.style.opacity = 0;
    await Promise.all([tasi(84, -30, 700), c.tween(500, (e) => { eldiven.style.opacity = e; })]);
    await c.say('Eldivenini giyip üç büyük tavayı aynı anda kaldırıyor.');
    const damlalar = [[838, 128], [862, 150], [826, 160], [874, 120], [760, 100], [700, 150]].map((hedef) => ({ hedef, el: c.S('circle', { cx: 540, cy: 214, r: 6, fill: BAZ }, sahne) }));
    await tasi(-30, 84, 320, Ders.ease.in);
    await c.tween(500, (e) => damlalar.forEach((d) => {
      d.el.setAttribute('cx', Ders.lerp(540, d.hedef[0], e));
      d.el.setAttribute('cy', Ders.lerp(214, d.hedef[1], e) - 70 * Math.sin(Math.PI * e));
    }));
    await c.say('Tavalar elinden kayıp kaba düşüyor; sıvı yüzüne sıçrıyor.');

    const KARTLAR = [
      { metin: 'Üç büyük tavayı aynı anda kaldırmak', halka: 1, satirlar: ['Üç büyük tavayı', 'aynı anda kaldırmak'], neden: 'Kaldırmak bir davranıştır; hata halkasına yazılır.' },
      { metin: 'Yüze sıçrayan sıvı', halka: 2, satirlar: ['Yüze sıçrayan sıvı'], neden: 'Sıvının sıçraması, hatanın ardından ortaya çıkan sonuçtur.' },
      { metin: 'Yağ çözücü (sodyum hidroksit)', halka: 0, satirlar: ['Yağ çözücü', '(sodyum hidroksit)'], neden: 'Yağ çözücü, bu kazadaki kimyasal maddedir.' },
    ];
    const IPUCU = ['Madde, kullanılan kimyasaldır; bu kartta bir maddenin adı yok.', 'Hata, kişinin yaptığı davranıştır; bu kart bir davranış değil.',
      'Sonuç, hatanın ardından ortaya çıkan zarardır; bu kart öyle değil.'];
    for (const k of KARTLAR) {
      const bekleyen = c.S('g', {}, svg);
      kutu(c, bekleyen, 200, 472, 600, 60, { renk: 'var(--text)' });
      yazi(c, bekleyen, 500, 511, k.metin, { size: 26 });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: `<b>${k.metin}</b> zincirde hangi halkaya konur?`, options: HALKA.map((h) => h.ad), answer: k.halka,
        hints: IPUCU.map((ipucu, i) => (i === k.halka ? '' : ipucu)), right: k.neden,
        onPick: (i, dogru) => { if (dogru) { bekleyen.remove(); belir(c, z.yaz(k.halka, k.satirlar), 350); } } });
    }
    sahne.style.opacity = 0.4;
    z.kutular.forEach((k) => k.r.setAttribute('stroke-width', 5));
    await c.say('Ortam mutfak olsa da zincir aynı üç halkadan oluşuyor.');
  }

  /* ---- Sahne 7 · Beş olay, tek özet ---- */
  async function ozet(c) {
    const svg = c.svg();
    const tablo = c.S('g', {}, svg);
    const X = (i) => 108 + i * 196;
    const OLAYLAR = [
      { ortam: 'Ev', cizim: ciz.ev, maddeler: [['Tuz ruhu', ASIT], ['Çamaşır suyu', BAZ]], sonuc: [SAGLIK] },
      { ortam: 'Ev', cizim: ciz.ev, maddeler: [['Kireç çözücü', ASIT]], sonuc: [ZEMIN] },
      { ortam: 'Fabrika', cizim: ciz.fabrika, maddeler: [['Cıva', METAL]], sonuc: [CEVRE, SAGLIK] },
      { ortam: 'Laboratuvar', cizim: ciz.balon, maddeler: [['Sodyum', METAL]], sonuc: [SAGLIK] },
      { ortam: 'Mutfak', cizim: (cc, g, x, y, renk) => ciz.tava(cc, g, x - 16, y - 30, renk), maddeler: [['Yağ çözücü', BAZ]], sonuc: [SAGLIK] },
    ];
    const simgeler = c.S('g', {}, tablo);
    OLAYLAR.forEach((o, i) => {
      kutu(c, simgeler, X(i) - 88, 30, 176, 372, { renk: RENK.cizgi, kalin: 2 });
      const g = c.S('g', { transform: `translate(${X(i) * 0.4} 54) scale(0.6)` }, simgeler);
      o.cizim(c, g, X(i), 150, GRI);
    });
    await belir(c, tablo);
    await c.say('Beş olayı yan yana koyalım.');
    const ortamlar = c.S('g', {}, tablo);
    OLAYLAR.forEach((o, i) => yazi(c, ortamlar, X(i), 190, o.ortam, { size: 26 }));
    await belir(c, ortamlar, 350);
    await c.say('Ortamlar farklı: ev, fabrika, laboratuvar ve restoran mutfağı.');
    const maddeler = c.S('g', {}, tablo);
    OLAYLAR.forEach((o, i) => o.maddeler.forEach(([ad, renk], k) => yazi(c, maddeler, X(i), 250 + k * 34, ad, { size: 24, renk })));
    const turler = c.S('g', {}, tablo);
    [['Asit', ASIT, 290], ['Baz', BAZ, 470], ['Metal', METAL, 640]].forEach(([ad, renk, x]) => {
      c.S('circle', { cx: x, cy: 448, r: 9, fill: renk }, turler);
      yazi(c, turler, x + 20, 458, ad, { size: 28, renk, hiza: 'start' });
    });
    await Promise.all([belir(c, maddeler, 350), belir(c, turler, 350)]);
    await c.say('Maddeler de farklı: asitler, bazlar ve metaller.');
    turler.remove();
    const sonuclar = c.S('g', {}, tablo);
    OLAYLAR.forEach((o, i) => o.sonuc.forEach((renk, k) => c.S('circle', { cx: X(i) + (k - (o.sonuc.length - 1) / 2) * 44, cy: 358, r: 15, fill: renk }, sonuclar)));
    [['Sağlık', SAGLIK, 190], ['Zemin hasarı', ZEMIN, 480], ['Çevre', CEVRE, 800]].forEach(([ad, renk, x]) => {
      c.S('circle', { cx: x - 22, cy: 462, r: 12, fill: renk }, sonuclar);
      yazi(c, sonuclar, x, 472, ad, { size: 28, renk, hiza: 'start' });
    });
    await belir(c, sonuclar, 400);
    await c.say('Sonuçlar da farklı: sağlık sorunu, zemin hasarı, çevre kirliliği.');

    await c.choice({ tag: 'Uygula', q: 'Beş olayın ortak problemi hangisidir?',
      options: ['Hepsinde aynı madde kullanıldı.', 'Hepsi aynı ortamda yaşandı.', 'Madde, özelliği hesaba katılmadan kullanıldı.'], answer: 2,
      hints: ['Maddeler farklıydı: asitler, bazlar ve metaller.', 'Ortamlar farklıydı: ev, fabrika, laboratuvar ve mutfak.', ''],
      right: 'Beş olayda da maddenin özelliği hesaba katılmadı.' });
    await sil(c, tablo, 350);
    const genel = c.S('g', {}, svg);
    const hucre = (x, w, metin, renk) => { kutu(c, genel, x, 80, w, 90, { renk }); yazi(c, genel, x + w / 2, 136, metin, { size: 28, renk }); };
    hucre(40, 290, 'Maddenin özelliği', MADDE);
    yazi(c, genel, 360, 138, '+', { size: 40 });
    hucre(390, 230, 'Yapılan hata', HATA);
    ok(c, genel, 634, 125, 706, 125, 'var(--text)');
    hucre(720, 240, 'Sonuç', SONUC);
    await belir(c, genel);
    await c.say('Her olayda sonucu, maddenin özelliği ile yapılan hata birlikte belirledi.');
    const problem = c.S('g', {}, genel);
    kutu(c, problem, 150, 250, 220, 80, { renk: GRI });
    yazi(c, problem, 260, 301, 'Kaza', { size: 30 });
    ok(c, problem, 384, 290, 486, 290, 'var(--text)');
    kutu(c, problem, 500, 250, 350, 80, { renk: 'var(--good)' });
    yazi(c, problem, 675, 301, 'Çözülebilir problem', { size: 30, renk: 'var(--good)' });
    await belir(c, problem, 400);
    await c.say('Kazayı böyle tanımlamak, onu çözülebilir bir probleme çevirir.');
    const ucSoruG = c.S('g', {}, genel);
    [['Hangi madde?', MADDE, 185], ['Hangi hata?', HATA, 500], ['Hangi sonuç?', SONUC, 815]].forEach(([metin, renk, x]) => yazi(c, ucSoruG, x, 450, metin, { size: 34, renk }));
    await belir(c, ucSoruG, 400);
    await c.say('Aklında kalsın: hangi madde, hangi hata, hangi sonuç?',
      { speak: 'Aklında kalsın: [short pause] hangi madde, hangi hata, hangi sonuç?' });
    c.note('<b>Kaza zinciri: madde → hata → sonuç.</b><br>Cıva → denize atık → kirlilik', 'Neden zinciri');
  }

  Ders.start({
    id: 'etkilesim-b1', kicker: 'Konu B · Kimyasal maddeler ve güvenlik', title: 'Kazayı neden zinciriyle tanımla', accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Kazayı neden zinciriyle tanımla', hook: 'İki temizleyici daha güçlü temizlik anlamına mı gelir?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kazaya üç soru', goal: 'Bir kazayı üç halkaya ayır.', run: ucSoru },
      { title: 'İki ürün, bir gaz', goal: 'Karışımın sonucunu maddelerin özelliğine bağla.', run: ikiUrun },
      { title: 'Zemindeki derz', goal: 'Asidin neyle tepkime vereceğini öngör.', run: derz },
      { title: 'Denize bırakılan cıva', goal: 'Zararın nereye kadar ulaştığını izle.', run: civa },
      { title: 'Su dolu kapta sodyum', goal: 'Olaydaki hatayı ayırt et.', run: sodyum },
      { title: 'Mutfakta yağ çözücü', goal: 'Zincirin üç halkasını yerleştir.', run: mutfak },
      { title: 'Beş olay, tek özet', goal: 'Olayları karşılaştır, ortak problemi bul.', run: ozet },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Banyoda tuz ruhu ile çamaşır suyu karıştı; evdekiler öksürmeye başladı. Bunun nedeni nedir?',
        options: ['Tuz ruhunun kireci çözmesi', 'Karışımdan klor gazı çıkması', 'Yüzeyin ıslak kalması'], answer: 1,
        why: ['Kireci çözmek tuz ruhunun işidir; öksürüğü açıklamaz.', 'İki ürün karışınca klor gazı çıkar; solunduğunda öksürük yapar.', 'Öksürüğün nedeni ıslaklık değil, solunan gazdır.'], scene: 1 },
      { q: 'Bir usta, güçlü kireç çözücüyü sulandırmadan balkon seramiklerine döküyor; derzler zarar görüyor. Bu olayda “hata” hangisidir?',
        options: ['Kireç çözücünün asit içermesi', 'Derzlerin zarar görmesi', 'Çözücüyü sulandırmadan dökmek'], answer: 2,
        why: ['Asit içermesi maddenin özelliğidir; bir davranış değildir.', 'Derzlerin zarar görmesi olayın sonucudur.', 'Hata, yapılan davranıştır: çözücü sulandırılmadan döküldü.'], scene: 2 },
    ], summary: ['<b>Hangi madde, hangi hata, hangi sonuç?</b>', 'Bir kazayı bu üç halkayla tanımlamak, onu çözülebilir bir probleme çevirir.'],
    nextLesson: { href: 'b2-etiket-ve-guvenlik.html', label: 'Sonraki: Önlem kanıtla seçilir ›' },
  });
})();
