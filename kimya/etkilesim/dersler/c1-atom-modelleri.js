/* C1 · KİM.9.1.3 · Senaryo: plan/kimya/etkilesim/senaryolar/C-atom-teorileri.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 46–50, 52 ve 103'ten; tanecik verisi PLAN.md bölüm 8. Öğrenciye kitap ya da sayfa
   anılmaz. Keşif yılları kitabın "ilgili keşiflerin yılı" sütunudur; keşfeden adı ve deney ayrıntısı yazılmaz.
   Model şemaları ve atom çizimleri ölçekli değildir. Keşif şeridi sıralıdır; aralıklar yıl farkıyla orantılı değildir. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const MOR = '#c792ff', E = 'var(--c1)', P = 'var(--c2)', N = 'var(--c3)', KOYU = '#162038', GRI = '#8f9bbd', SIYAH = '#0b0d12';
  const TAU = Math.PI * 2;

  const MODELLER = [
    { ad: 'Dalton', tam: 'Dalton modeli', yil: 1803, kavram: 'küre', ozet: 'Bölünmez küre: içinde yük yok' },
    { ad: 'Thomson', tam: 'Thomson modeli', yil: 1897, kavram: 'yüklü tanecik', ozet: 'Kürede artı ve eksi yükler' },
    { ad: 'Rutherford', tam: 'Rutherford modeli', yil: 1911, kavram: 'çekirdek', ozet: 'Artı yük küçük çekirdekte' },
    { ad: 'Bohr', tam: 'Bohr modeli', yil: 1913, kavram: 'yörünge', ozet: 'Elektron dairesel yörüngelerde' },
    { ad: 'Modern', tam: 'Modern atom teorisi', yil: 1926, kavram: 'orbital', ozet: 'Bulunma olasılığı yüksek bölge' },
  ];
  const YILLAR = MODELLER.map((m) => String(m.yil));
  const TANECIK = [
    { ad: 'Elektron', tur: 'e', renk: E, bagil: '−1', yuk: '−1,6022×10^{−19} C', kutle: '9,1096×10^{−28} g' },
    { ad: 'Proton', tur: 'p', renk: P, bagil: '+1', yuk: '+1,6022×10^{−19} C', kutle: '1,6726×10^{−24} g' },
    { ad: 'Nötron', tur: 'n', renk: N, bagil: '0', yuk: '0 C', kutle: '1,6749×10^{−24} g' },
  ];
  const TUR_RENK = { e: E, p: P, n: N };

  /* ---- Genel çizim yardımcıları ---- */
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: 12,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const ok = (c, p, x1, y, x2, renk = RENK.cizgi) => c.S('path', {
    d: `M ${x1} ${y} L ${x2} ${y} M ${x2 - 12} ${y - 9} L ${x2} ${y} L ${x2 - 12} ${y + 9}`,
    fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round' }, p);
  /* Üslü sayı içeren tahta yazısı ("10^{−19}"). */
  const usYazi = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 28,
    'font-weight': 600, style: 'fill:' + (o.renk || 'var(--text)'), math: metin }, p);
  const sil = async (c, g, ms = 300) => {
    await c.tween(ms, (e) => { g.style.opacity = 1 - e; });
    g.remove();
  };
  /* Artı ya da eksi işareti: yazı yerine çizgi (küçük şemalarda da okunur). */
  const isaret = (c, p, x, y, b, arti, renk) => c.S('path', {
    d: `M ${x - b} ${y} H ${x + b}` + (arti ? ` M ${x} ${y - b} V ${y + b}` : ''),
    fill: 'none', stroke: renk, 'stroke-width': Math.max(2, b * 0.45), 'stroke-linecap': 'round' }, p);
  /* Tek tanecik: tur 'e' (eksi), 'p' (artı), 'n' (yüksüz). */
  function top(c, p, x, y, r, tur) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r, fill: TUR_RENK[tur] }, g);
    if (tur !== 'n' && r >= 8) isaret(c, g, x, y, r * 0.5, tur === 'p', SIYAH);
    return g;
  }

  /* Beş model şeması, (x, y) merkezli, r yarıçaplı. Dönen g.elektronlar: [{ el, rr, a }] (vurgu ve dönme için). */
  function sema(c, p, i, x, y, r) {
    const g = c.S('g', {}, p);
    g.elektronlar = [];
    const cember = (rr, o) => c.S('circle', { cx: x, cy: y, r: rr, ...o }, g);
    const elektron = (rr, a) => g.elektronlar.push({ el: top(c, g, x + Math.cos(a) * rr, y + Math.sin(a) * rr, Math.max(3.5, r * 0.1), 'e'), rr, a });
    const cekirdekNoktasi = () => top(c, g, x, y, Math.max(4.5, r * 0.14), 'p');
    if (i === 0) cember(r, { fill: MOR, 'fill-opacity': 0.7, stroke: MOR, 'stroke-width': 3 });
    if (i === 1) {
      cember(r, { fill: P, 'fill-opacity': 0.25, stroke: P, 'stroke-width': 3 });
      [[0.3, -1.5], [0.66, 0.2], [0.64, 2.9], [0.08, 0]].forEach(([k, a]) => isaret(c, g, x + Math.cos(a) * r * k, y + Math.sin(a) * r * k, r * 0.1, true, P));
      [[0.56, -2.5], [0.58, -0.7], [0.6, 2.0], [0.56, 0.95]].forEach(([k, a]) => elektron(r * k, a));
    }
    if (i === 2) {
      cember(r, { fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' });
      cekirdekNoktasi();
      [[0.75, 0.3], [0.78, 2.3], [0.8, 4.0], [0.7, 5.3]].forEach(([k, a]) => elektron(r * k, a));
    }
    if (i === 3) {
      [0.55, 1].forEach((k) => cember(r * k, { fill: 'none', stroke: MOR, 'stroke-width': r < 45 ? 2 : 3 }));
      cekirdekNoktasi();
      [[0.55, 0.6], [1, 2.6], [1, 5.2]].forEach(([k, a]) => elektron(r * k, a));
    }
    if (i === 4) {
      cember(r, { fill: E, 'fill-opacity': 0.1 });
      let t = 11;
      const rasgele = () => { t = (t * 16807) % 2147483647; return t / 2147483647; };
      for (let j = 0, adet = r < 45 ? 34 : 110; j < adet; j++) {
        const a = rasgele() * TAU, rr = r * Math.pow(rasgele(), 0.9);
        c.S('circle', { cx: x + Math.cos(a) * rr, cy: y + Math.sin(a) * rr, r: Math.max(1.8, r * 0.026), fill: E, opacity: 0.85 }, g);
      }
      cekirdekNoktasi();
    }
    return g;
  }
  /* Elektronları yörüngeleri üzerinde döndürür (Bohr şeması). */
  const dondur = (c, g, ms, tur = 1) => c.tween(ms, (e) => g.elektronlar.forEach(({ el, rr, a }) => {
    const b = a + e * tur * TAU;
    el.setAttribute('transform', `translate(${(Math.cos(b) - Math.cos(a)) * rr} ${(Math.sin(b) - Math.sin(a)) * rr})`);
  }), Ders.ease.linear);
  /* Elektronları bir an büyütüp küçültür. */
  const elektronVurgu = (c, g, ms = 700) => c.tween(ms, (e) => g.elektronlar.forEach(({ el }) => {
    const x = +el.firstChild.getAttribute('cx'), y = +el.firstChild.getAttribute('cy'), k = 1 + 0.7 * Math.sin(e * Math.PI);
    el.setAttribute('transform', `translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`);
  }));

  /* Çekirdek: np proton ve nn nötron, b yarıçaplı toplar, sıkışık dizilir. */
  function cekirdek(c, p, x, y, b, np, nn) {
    const g = c.S('g', {}, p), n = np + nn;
    const halka = (adet, d, a0) => Array.from({ length: adet }, (_, k) => [Math.cos(a0 + k * TAU / adet) * d, Math.sin(a0 + k * TAU / adet) * d]);
    const yerler = n <= 4 ? halka(n, n === 1 ? 0 : b * (n === 2 ? 0.95 : 1.25), Math.PI / 4) : [[0, 0], ...halka(n - 1, b * 1.85, 0)];
    let kalanP = np, kalanN = nn, tur = nn > np ? 'n' : 'p';
    yerler.forEach(([dx, dy]) => {
      if (tur === 'p' && !kalanP) tur = 'n';
      if (tur === 'n' && !kalanN) tur = 'p';
      top(c, g, x + dx, y + dy, b, tur);
      if (tur === 'p') kalanP--; else kalanN--;
      tur = tur === 'p' ? 'n' : 'p';
    });
    return g;
  }
  /* Çekirdekli atom: ortada çekirdek, R uzaklığında ne elektron. Dönen: { g, cek, elektronlar }. */
  function atom(c, p, x, y, R, np, nn, ne, b = 18) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r: R, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, g);
    const cek = cekirdek(c, g, x, y, b, np, nn), elektronlar = c.S('g', {}, g);
    for (let k = 0; k < ne; k++) {
      const a = -0.7 + k * TAU / ne;
      top(c, elektronlar, x + Math.cos(a) * R, y + Math.sin(a) * R, b * 0.72, 'e');
    }
    return { g, cek, elektronlar };
  }

  /* Eşit aralıklı beş model şeridi (sahne 2 ve 7). */
  const X5 = (i) => 120 + i * 190;
  function serit5(c, p, y) {
    const g = c.S('g', {}, p);
    c.S('line', { x1: 40, y1: y, x2: 960, y2: y, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    MODELLER.forEach((m, i) => {
      c.S('circle', { cx: X5(i), cy: y, r: 8, fill: MOR }, g);
      yazi(c, g, X5(i), y + 46, String(m.yil), { size: 30 });
    });
    return g;
  }

  /* Keşif şeridi (sahne 5 ve 6): altta beş model, üstte keşif işaretleri. Olaylar sırayla dizilir. */
  const SX = { 1803: 70, 1832: 160, 1886: 250, 1891: 340, 1897: 440, 1906: 540, 1911: 650, 1913: 760, 1926: 860, 1932: 945 };
  function kesifSeridi(c, svg) {
    const g = c.S('g', {}, svg), Y = 335;
    c.S('line', { x1: 25, y1: Y, x2: 985, y2: Y, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    const modeller = MODELLER.map((m, i) => {
      const mg = c.S('g', {}, g), x = SX[m.yil];
      c.S('line', { x1: x, y1: Y - 9, x2: x, y2: Y + 9, stroke: MOR, 'stroke-width': 4 }, mg);
      yazi(c, mg, x, Y + 40, String(m.yil), { size: 26, renk: MOR });
      sema(c, mg, i, x, Y + 88, 30);
      yazi(c, mg, x, Y + 152, m.ad, { size: 24 });
      return mg;
    });
    const aciklama = c.S('g', {}, g);
    const adlar = TANECIK.map((t, k) => {
      const ag = c.S('g', {}, aciklama), x = 250 + k * 220;
      top(c, ag, x, 112, 12, t.tur);
      yazi(c, ag, x + 24, 121, t.ad, { size: 26, hiza: 'start' });
      return ag;
    });
    const not = yazi(c, g, 500, 58, '', { size: 28, renk: RENK.vurgu });
    const halka = c.S('circle', { cx: 0, cy: Y + 88, r: 40, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3, opacity: 0 }, g);
    return {
      g, modeller, adlar, not, Y,
      /* Keşif işareti: üstte tanecik noktası ve yılı. */
      isaret(yil, tur) {
        const ig = c.S('g', {}, g), x = SX[yil];
        top(c, ig, x, Y - 73, 13, tur);
        yazi(c, ig, x, Y - 21, String(yil), { size: 26, renk: TUR_RENK[tur] });
        return ig;
      },
      /* İşaretten kendisinden sonra gelen modele ok. */
      ok(yil, modelYili, renk) {
        const og = c.S('g', {}, g), x1 = SX[yil], x2 = SX[modelYili], y1 = Y - 90, y2 = Y - 13;
        const kx = (x1 + x2) / 2, ky = y1 - 0.3 * (x2 - x1) - 20, a = Math.atan2(y2 - ky, x2 - kx), u = 13;
        c.S('path', { d: `M ${x1} ${y1} Q ${kx} ${ky} ${x2} ${y2}`, fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, og);
        c.S('path', { d: `M ${x2 - u * Math.cos(a - 0.5)} ${y2 - u * Math.sin(a - 0.5)} L ${x2} ${y2} L ${x2 - u * Math.cos(a + 0.5)} ${y2 - u * Math.sin(a + 0.5)}`,
          fill: 'none', stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, og);
        return og;
      },
      /* Bir modelin şemasını sarı halkayla işaretler; i < 0 ise halkayı kaldırır. */
      vurgula(i) {
        halka.setAttribute('opacity', i < 0 ? 0 : 1);
        if (i >= 0) halka.setAttribute('cx', SX[MODELLER[i].yil]);
      },
    };
  }

  /* ---- Sahne 1 · Görmediğimiz bir şeyi çizmek ---- */
  async function gorunmeyen(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    const kalem = c.S('g', { transform: 'rotate(-24 250 230)' }, giris);
    c.S('rect', { x: 130, y: 212, width: 190, height: 36, rx: 4, fill: '#c9d1e6', stroke: GRI, 'stroke-width': 3 }, kalem);
    c.S('rect', { x: 130, y: 212, width: 30, height: 36, rx: 4, fill: MOR }, kalem);
    c.S('path', { d: 'M 320 212 L 372 230 L 320 248 Z', fill: KOYU, stroke: GRI, 'stroke-width': 3, 'stroke-linejoin': 'round' }, kalem);
    c.S('path', { d: 'M 356 224.5 L 372 230 L 356 235.5 Z', fill: GRI }, kalem);
    yazi(c, giris, 250, 360, 'Kalem', { size: 28 });
    c.S('path', { d: 'M 372 180 L 600 160 M 372 180 L 620 330', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, giris);
    c.S('circle', { cx: 700, cy: 240, r: 108, fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3 }, giris);
    [[-48, -34], [8, -56], [54, -10], [-8, 4], [-54, 34], [26, 52]].forEach(([dx, dy]) =>
      c.S('circle', { cx: 700 + dx, cy: 240 + dy, r: 24, fill: GRI, 'fill-opacity': 0.5, stroke: GRI, 'stroke-width': 2 }, giris));
    yazi(c, giris, 700, 392, 'Atomlar', { size: 28 });
    await belir(c, giris);
    await c.say('Elindeki kalem de soluduğun hava da atomlardan oluşur.');
    await belir(c, yazi(c, giris, 700, 440, 'gözle görülemeyecek kadar küçük', { size: 26, renk: RENK.vurgu }), 350);
    await c.say('Atom, gözle görülemeyecek kadar küçüktür.');

    await sil(c, giris);
    const tarih = c.S('g', {}, svg);
    const felsefe = c.S('g', {}, tarih);
    kutu(c, felsefe, 80, 130, 370, 230, { renk: MOR });
    yazi(c, felsefe, 265, 188, 'Demokritos', { size: 34, renk: MOR });
    yazi(c, felsefe, 265, 232, 'Antik Yunan', { size: 26, renk: RENK.soluk });
    yazi(c, felsefe, 265, 290, 'Her şey bölünemez', { size: 28 });
    yazi(c, felsefe, 265, 328, 'atomlardan oluşur', { size: 28 });
    await belir(c, felsefe);
    await c.say('Antik Yunan’da Demokritos, her şeyin bölünemez atomlardan oluştuğunu savundu.');
    await belir(c, yazi(c, tarih, 265, 412, 'Felsefi düşünce', { size: 28, renk: RENK.vurgu }), 350);
    await c.say('Bu felsefi bir düşünceydi; bilimsel bir temele dayanmıyordu.');
    const bilim = c.S('g', {}, tarih);
    ok(c, bilim, 470, 245, 530);
    kutu(c, bilim, 550, 130, 370, 230, { renk: RENK.vurgu });
    yazi(c, bilim, 735, 222, 'Bilimsel atom teorileri', { size: 30, renk: RENK.vurgu });
    yazi(c, bilim, 735, 280, '19. yüzyılın başı', { size: 28 });
    await belir(c, bilim);
    await c.say('Bilimsel atom teorileri on dokuzuncu yüzyılın başında gelişmeye başladı.');

    await sil(c, tarih);
    const tanim = c.S('g', {}, svg);
    const teori = c.S('g', {}, tanim);
    kutu(c, teori, 70, 80, 410, 220, { renk: MOR });
    yazi(c, teori, 275, 142, 'Teori', { size: 38, renk: MOR });
    yazi(c, teori, 275, 204, 'genel, sistemli', { size: 30 });
    yazi(c, teori, 275, 246, 'açıklama', { size: 30 });
    await belir(c, teori);
    await c.say('Teori; bir olay ya da olgu hakkında genel, sistemli bir açıklamadır.');
    const model = c.S('g', {}, tanim);
    kutu(c, model, 520, 80, 410, 220, { renk: RENK.vurgu });
    yazi(c, model, 725, 142, 'Model', { size: 38, renk: RENK.vurgu });
    yazi(c, model, 725, 196, 'teorinin temsili:', { size: 28 });
    yazi(c, model, 725, 234, 'çizim, sembol,', { size: 28 });
    yazi(c, model, 725, 272, 'matematiksel ifade', { size: 28 });
    await belir(c, model);
    await c.say('Model ise bir teoriyi temsil eden çizim, sembol ya da matematiksel ifadedir.');
    const miknatis = c.S('g', {}, tanim);
    c.S('rect', { x: 370, y: 356, width: 130, height: 62, fill: MOR, stroke: RENK.cizgi, 'stroke-width': 3 }, miknatis);
    c.S('rect', { x: 500, y: 356, width: 130, height: 62, fill: '#c9d1e6', stroke: RENK.cizgi, 'stroke-width': 3 }, miknatis);
    yazi(c, miknatis, 500, 470, 'Çubuk mıknatıs çizimi: iki kutup', { size: 28 });
    await belir(c, miknatis);
    await c.say('Mıknatısı iki kutuplu bir çubuk olarak çizmek de bir modeldir.');

    await sil(c, tanim);
    const cizim = c.S('g', {}, svg);
    sema(c, cizim, 1, 500, 225, 125);
    yazi(c, cizim, 500, 420, 'Bir bilim insanının çizimi', { size: 28, renk: RENK.soluk });
    await belir(c, cizim);
    await c.choice({ tag: 'Uygula', q: 'Bir bilim insanı atomu, içinde artı ve eksi yükler bulunan bir küre olarak çiziyor. Bu çizim nedir?',
      options: ['Bir teori', 'Bir model', 'Atomun büyütülmüş görüntüsü'], answer: 1,
      hints: ['Teori bir açıklamadır; burada sözü edilen bir çizim.', '', 'Atom gözle görülemez; çizim bir görüntü değil, bir temsildir.'],
      right: 'Bir model. Çizim, bir teoriyi temsil eder.' });

    await sil(c, cizim);
    const zincir = c.S('g', {}, svg);
    c.S('circle', { cx: 160, cy: 220, r: 62, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, zincir);
    c.S('circle', { cx: 160, cy: 220, r: 6, fill: GRI }, zincir);
    yazi(c, zincir, 160, 330, 'Atom', { size: 30 });
    ok(c, zincir, 250, 220, 340);
    kutu(c, zincir, 360, 170, 280, 100, { renk: MOR });
    yazi(c, zincir, 500, 232, 'Teori', { size: 34, renk: MOR });
    yazi(c, zincir, 500, 330, 'açıklama', { size: 28, renk: RENK.soluk });
    ok(c, zincir, 660, 220, 740);
    sema(c, zincir, 1, 840, 220, 78);
    yazi(c, zincir, 840, 330, 'Model', { size: 30, renk: RENK.vurgu });
    const sonuc = yazi(c, zincir, 500, 450, 'Çizim, atomun kendisi değil', { size: 30, renk: RENK.vurgu });
    await belir(c, zincir);
    await c.say('Çizim atomun kendisi değildir; onu açıklayan teorinin temsilidir.',
      { speak: '[thoughtful] Çizim atomun kendisi değildir; onu açıklayan teorinin temsilidir.' });
    sonuc.remove();
    const durum = c.S('g', {}, zincir);
    yazi(c, durum, 160, 378, 'aynı kalır', { size: 28, renk: 'var(--good)' });
    yazi(c, durum, 840, 378, 'değişebilir', { size: 28, renk: RENK.vurgu });
    await belir(c, durum, 350);
    await c.say('Bu yüzden atom aynı kalırken modeli değişebilir.');
    c.note('<b>Teori açıklar, model temsil eder.</b><br>Çubuk mıknatıs çizimi bir modeldir.', 'Teori ve model');
  }

  /* ---- Sahne 2 · Beş model, bir zaman şeridi ---- */
  async function zamanSeridi(c) {
    const svg = c.svg();
    const CY = 300, CIZGI = 425;
    const baslik = yazi(c, svg, 500, 80, 'Beş atom modeli', { size: 34, renk: RENK.soluk });
    const serit = serit5(c, svg, CIZGI);
    const yuvalar = c.S('g', {}, svg);
    /* Bir modeli şeritteki yerine çizer: şema ve adı. */
    const yerlestir = (i) => {
      const g = c.S('g', {}, yuvalar);
      sema(c, g, i, X5(i), CY, 54);
      yazi(c, g, X5(i), CIZGI - 28, MODELLER[i].ad, { size: 24 });
      return g;
    };
    await belir(c, serit);
    await c.say('1803 ile 1926 arasında atom için beş model önerildi.',
      { speak: 'Bin sekiz yüz üç ile bin dokuz yüz yirmi altı arasında atom için beş model önerildi.' });
    await belir(c, yerlestir(0));
    await c.say('İlki 1803’teki Dalton modelidir: atom bölünmez bir küredir.',
      { speak: 'İlki bin sekiz yüz üçteki Dalton modelidir: atom bölünmez bir küredir.' });
    await belir(c, yerlestir(1));
    await c.say('1897’deki Thomson modelinde küre, artı ve eksi yükler içerir.',
      { speak: 'Bin sekiz yüz doksan yedideki Tamsın modelinde küre, artı ve eksi yükler içerir.' });
    await belir(c, yerlestir(2));
    await c.say('1911’deki Rutherford modelinde artı yük, merkezdeki küçük çekirdekte toplanır.',
      { speak: 'Bin dokuz yüz on birdeki Raterford modelinde artı yük, merkezdeki küçük çekirdekte toplanır.' });
    const bohr = yerlestir(3);
    await belir(c, bohr);
    await Promise.all([
      dondur(c, bohr.firstChild, 2400),
      c.say('1913’teki Bohr modelinde elektronlar, çekirdeğin çevresindeki dairesel yörüngelerde döner.',
        { speak: 'Bin dokuz yüz on üçteki Bor modelinde elektronlar, çekirdeğin çevresindeki dairesel yörüngelerde döner.' }),
    ]);
    await belir(c, yerlestir(4));
    await c.say('Sonuncusu 1926’daki modern atom teorisidir.', { speak: 'Sonuncusu bin dokuz yüz yirmi altıdaki modern atom teorisidir.' });

    /* Sıralama: şemalar şeritten kalkar, karışık sırayla geri yerleştirilir. */
    await c.tween(350, (e) => { yuvalar.style.opacity = 1 - e; baslik.style.opacity = 1 - e; });
    yuvalar.replaceChildren();
    yuvalar.style.opacity = 1;
    baslik.remove();
    const bos = c.S('g', {}, svg);
    MODELLER.forEach((m, i) => c.S('circle', { cx: X5(i), cy: CY, r: 54, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, bos));
    await belir(c, bos, 300);
    const geriBildirim = ['1803: atom bölünmez bir küre.', '1897: küre, artı ve eksi yükler içerir.', '1911: artı yük merkezdeki küçük çekirdekte.',
      '1913: elektronlar dairesel yörüngelerde.', '1926: beş modelin sonuncusu.'];
    const sahip = ['Dalton modelinin', 'Thomson modelinin', 'Rutherford modelinin', 'Bohr modelinin', 'modern atom teorisinin'];
    for (const i of [2, 0, 4, 1, 3]) {
      const bekleyen = c.S('g', {}, svg);
      sema(c, bekleyen, i, 380, 130, 50);
      yazi(c, bekleyen, 455, 141, MODELLER[i].tam + '  →  ?', { size: 28, renk: RENK.vurgu, hiza: 'start' });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: `<b>${MODELLER[i].tam}</b> hangi yıla yerleşir?`, options: YILLAR, answer: i,
        hints: YILLAR.map((y, k) => (k === i ? '' : `${y}, ${sahip[k]} yılıdır.`)), right: geriBildirim[i],
        onPick: (k, dogru) => { if (dogru) { bekleyen.remove(); bos.children[i].setAttribute('opacity', 0); belir(c, yerlestir(i), 350); } } });
    }
    const oklar = c.S('g', {}, svg);
    for (let i = 0; i < 4; i++) ok(c, oklar, X5(i) + 66, CY, X5(i + 1) - 66, RENK.vurgu);
    yazi(c, oklar, 500, 130, 'Her yeni model: bir varsayım değişti', { size: 30, renk: RENK.vurgu });
    await belir(c, oklar);
    await c.say('Her yeni model, öncekinin bir varsayımını değiştirdi.');
  }

  /* ---- Sahne 3 · Her model ne ekledi? ---- */
  async function kavramlar(c) {
    const svg = c.svg();
    const ust = c.S('g', {}, svg), zincir = c.S('g', {}, svg);
    const ZX = [95, 300, 525, 715, 895], OKLAR = [null, [138, 196], [404, 452], [598, 646], [784, 834]];
    const kelimeler = MODELLER.map((m, i) => {
      const g = c.S('g', { opacity: 0 }, zincir);
      if (i) ok(c, g, OKLAR[i][0], 500, OKLAR[i][1]);
      g.kelime = yazi(c, g, ZX[i], 510, m.kavram, { size: 28 });
      return g;
    });
    /* Zincirde i. kavramı vurgular; öncekiler soluk, sonrakiler (hepsi değilse) gizli kalır. */
    const zinciriAyarla = (i, hepsi) => kelimeler.forEach((g, k) => {
      g.setAttribute('opacity', k === i ? 1 : k < i || hepsi ? 0.45 : 0);
      g.kelime.style.fill = k === i ? 'var(--c5)' : 'var(--text)';
    });
    let not = null;
    /* Ortadaki büyük şemayı, başlığını ve altındaki notu çizer. */
    const goster = (i, metin, hepsi) => {
      ust.replaceChildren();
      yazi(c, ust, 500, 56, MODELLER[i].tam + ' · ' + MODELLER[i].yil, { size: 32, renk: MOR });
      const g = sema(c, ust, i, 500, 222, 125);
      not = yazi(c, ust, 500, 412, metin, { size: 28 });
      zinciriAyarla(i, hepsi);
      return g;
    };
    goster(0, 'İçinde yük yok, daha küçük parça yok');
    await belir(c, svg);
    await c.say('Dalton modelinde kürenin içinde yük de daha küçük parça da yoktur.');
    const thomson = goster(1, 'Eklenen: yüklü tanecikler');
    await Promise.all([belir(c, ust), elektronVurgu(c, thomson, 900)]);
    await c.say('Thomson modeli atoma yüklü tanecikleri ekledi.', { speak: 'Tamsın modeli atoma yüklü tanecikleri ekledi.' });
    not.textContent = 'Atomdan küçük tanecikler: ilk kez';
    await belir(c, not, 350);
    await c.say('Böylece atomdan daha küçük taneciklerin varlığı ilk kez kabul edildi.');
    not.textContent = 'Artı yük: kürenin her yerinde';
    not.style.fill = P;
    await c.tween(900, (e) => { thomson.firstChild.setAttribute('fill-opacity', 0.25 + 0.4 * Math.sin(e * Math.PI)); });
    await c.say('Bu modelde artı yük kürenin her yerine dağılmıştır.');
    const rutherford = goster(2, 'Eklenen: çekirdek. Artı yük küçük merkezde');
    await belir(c, ust);
    await c.say('Rutherford modeli çekirdek kavramını ekledi: artı yük küçük bir merkezde toplanır.',
      { speak: 'Raterford modeli çekirdek kavramını ekledi: artı yük küçük bir merkezde toplanır.' });
    not.textContent = 'Elektronlar: çekirdeğin çevresinde';
    not.style.fill = E;
    await elektronVurgu(c, rutherford, 900);
    await c.say('Elektronlar ise çekirdeğin çevresindedir.');
    const bohr = goster(3, 'Eklenen: yörünge. Belirli dairesel yollar');
    await belir(c, ust);
    await Promise.all([
      dondur(c, bohr, 3200),
      c.say('Bohr modeli yörünge kavramını ekledi: elektron belirli dairesel yollarda döner.',
        { speak: 'Bor modeli yörünge kavramını ekledi: elektron belirli dairesel yollarda döner.' }),
    ]);
    goster(4, 'Eklenen: orbital. Bulunma olasılığı yüksek bölge');
    await belir(c, ust);
    await c.say('Modern teori orbital kavramını ekledi: elektronun bulunma olasılığının yüksek olduğu bölge.');

    await c.tween(300, (e) => { ust.style.opacity = 1 - e; });
    ust.replaceChildren();
    ust.style.opacity = 1;
    zinciriAyarla(-1, true);
    sema(c, ust, 1, 280, 205, 115);
    yazi(c, ust, 280, 366, 'Thomson', { size: 30, renk: MOR });
    sema(c, ust, 2, 720, 205, 115);
    yazi(c, ust, 720, 366, 'Rutherford', { size: 30, renk: MOR });
    await belir(c, ust);
    await c.choice({ tag: 'Uygula', q: 'Thomson ve Rutherford modelleri hangi konuda birbirinden ayrılır?',
      options: ['Atomda yük bulunup bulunmadığı', 'Atomun bölünüp bölünemediği', 'Artı yükün atomdaki yeri'], answer: 2,
      hints: ['İki modelde de atomda artı ve eksi yük vardır.', 'İki modelde de atomun içinde ondan küçük tanecikler vardır.', ''],
      right: 'Artı yük Thomson modelinde kürenin her yerinde, Rutherford modelinde çekirdektedir.' });
    const fark = c.S('g', {}, ust);
    yazi(c, fark, 280, 412, 'Artı yük: her yerde', { size: 28, renk: P });
    yazi(c, fark, 720, 412, 'Artı yük: çekirdekte', { size: 28, renk: P });
    await belir(c, fark, 350);
    await c.say('İkisinde de atomda yük vardır; fark, artı yükün nerede olduğudur.',
      { speak: 'İkisinde de atomda yük vardır; fark, [short pause] artı yükün nerede olduğudur.' });

    const sec = c.slider({ label: 'Model', min: 0, max: 4, value: 0, fmt: (i) => MODELLER[i].ad, onInput: (i) => goster(i, MODELLER[i].ozet, true) });
    await c.say('Modeli değiştir; eklenen kavramı karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();

    await c.tween(300, (e) => { svg.style.opacity = 1 - e; });
    ust.replaceChildren();
    zincir.remove();
    svg.style.opacity = 1;
    MODELLER.forEach((m, i) => {
      sema(c, ust, i, X5(i), 200, 66);
      yazi(c, ust, X5(i), 318, m.kavram, { size: 24 });
    });
    yazi(c, ust, 500, 430, 'Beş ayrı anlatım, aynı atom', { size: 34, renk: RENK.vurgu });
    await belir(c, ust);
    await c.say('Beş model atomu beş ayrı biçimde anlattı; atom ise aynı atomdu.');
    c.note('<b>Her model bir kavram ekledi.</b><br>Küre → yüklü tanecik → çekirdek → yörünge → orbital', 'Beş model');
  }

  /* ---- Sahne 4 · Atomun üç temel taneciği ---- */
  /* Tanecik tablosu: satırlar elektron, proton, nötron; sutunlar [{ ad, x, alan }]. Hücreler boş başlar; doldur(sütun, satır) yazar. */
  function tablo(c, p, sutunlar) {
    const g = c.S('g', {}, p), SY = [205, 295, 385];
    kutu(c, g, 50, 70, 900, 370);
    sutunlar.forEach((s) => yazi(c, g, s.x, 125, s.ad, { size: 28, renk: RENK.soluk }));
    c.S('line', { x1: 80, y1: 150, x2: 920, y2: 150, stroke: RENK.cizgi, 'stroke-width': 2 }, g);
    TANECIK.forEach((t, k) => {
      top(c, g, 110, SY[k] - 10, 20, t.tur);
      yazi(c, g, 146, SY[k], t.ad, { size: 30, hiza: 'start', renk: t.renk });
    });
    return {
      g, SY,
      doldur(si, k, ms = 400) {
        const t = TANECIK[k];
        return belir(c, usYazi(c, g, sutunlar[si].x, SY[k], t[sutunlar[si].alan], { size: 30 }), ms);
      },
    };
  }
  /* Tek tanecik kartı: ad, bağıl yük, yük, kütle. */
  function tanecikKarti(c, svg, k) {
    svg.replaceChildren();
    const t = TANECIK[k];
    kutu(c, svg, 150, 60, 700, 440, { renk: t.renk });
    top(c, svg, 240, 140, 38, t.tur);
    yazi(c, svg, 305, 154, t.ad, { size: 42, hiza: 'start', renk: t.renk });
    [['Bağıl yük', t.bagil], ['Yük', t.yuk], ['Kütle', t.kutle]].forEach(([ad, deger], i) => {
      const y = 262 + i * 82;
      yazi(c, svg, 205, y, ad, { size: 30, hiza: 'start', renk: RENK.soluk });
      usYazi(c, svg, 795, y, deger, { size: 34, hiza: 'end' });
    });
  }
  async function tanecikler(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    const a = atom(c, giris, 250, 270, 150, 2, 2, 2, 20);
    const liste = TANECIK.map((t, k) => {
      const g = c.S('g', {}, giris), sira = [2, 0, 1][k], y = 190 + sira * 80;
      top(c, g, 500, y - 10, 18, t.tur);
      g.ad = yazi(c, g, 534, y, t.ad, { size: 30, hiza: 'start' });
      return g;
    });
    await belir(c, giris);
    await c.say('Bugün atomun üç temel taneciğini biliyoruz: proton, nötron ve elektron.');
    const cekirdekEtiketi = c.S('g', {}, giris);
    c.S('circle', { cx: 250, cy: 270, r: 58, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, cekirdekEtiketi);
    c.S('line', { x1: 250, y1: 212, x2: 250, y2: 98, stroke: RENK.vurgu, 'stroke-width': 2 }, cekirdekEtiketi);
    yazi(c, cekirdekEtiketi, 250, 84, 'Çekirdek', { size: 28, renk: RENK.vurgu });
    liste[1].ad.textContent = 'Proton: çekirdekte';
    liste[2].ad.textContent = 'Nötron: çekirdekte';
    liste[0].ad.textContent = 'Elektron: çekirdeğin dışında';
    await belir(c, cekirdekEtiketi, 350);
    await c.say('Proton ve nötron çekirdektedir; elektronlar çekirdeğin dışındadır.');
    const olcek = c.S('g', {}, giris);
    yazi(c, olcek, 500, 492, 'Çekirdek yarıçapı ≈ atom yarıçapının on binde biri', { size: 28, renk: RENK.vurgu });
    yazi(c, olcek, 500, 534, 'Çizim ölçekli değil', { size: 24, renk: RENK.soluk });
    await belir(c, olcek, 350);
    await c.say('Çekirdek çok küçüktür: yarıçapı, atomun yarıçapının yaklaşık on binde biridir.');

    await sil(c, giris);
    const yukler = tablo(c, svg, [{ ad: 'Yük', x: 540, alan: 'yuk' }, { ad: 'Bağıl yük', x: 815, alan: 'bagil' }]);
    const esit = yazi(c, yukler.g, 500, 492, 'Ölçülen: yük ve kütle', { size: 30, renk: RENK.vurgu });
    await belir(c, yukler.g);
    await c.say('Bilim insanları bu üç taneciğin yükünü ve kütlesini ölçtü.');
    await Promise.all([yukler.doldur(0, 0), yukler.doldur(0, 1)]);
    esit.textContent = 'Miktar aynı, işaret zıt';
    await belir(c, esit, 350);
    await c.say('Elektron ve protonun yük miktarı aynıdır, yalnızca işaretleri zıttır.');
    esit.remove();
    await Promise.all([yukler.doldur(1, 0), yukler.doldur(1, 1), yukler.doldur(1, 2), yukler.doldur(0, 2)]);
    await c.say('Elektronun yükü −1, protonun yükü +1 sayılır; nötron yüksüzdür.',
      { speak: 'Elektronun yükü eksi bir, protonun yükü artı bir sayılır; nötron yüksüzdür.' });

    await sil(c, yukler.g);
    const notr = c.S('g', {}, svg);
    const ornek = atom(c, notr, 250, 270, 150, 2, 2, 2, 20);
    yazi(c, notr, 690, 150, 'Nötr atom', { size: 36, renk: RENK.vurgu });
    yazi(c, notr, 690, 215, 'proton sayısı = elektron sayısı', { size: 28 });
    yazi(c, notr, 690, 290, '2 proton', { size: 30, renk: P });
    yazi(c, notr, 690, 340, '2 elektron', { size: 30, renk: E });
    await belir(c, notr);
    await c.say('Nötr bir atomda proton sayısı elektron sayısına eşittir.');
    const yuksuz = yazi(c, notr, 690, 420, 'Nötron yüksüz: yükü etkilemez', { size: 28, renk: N });
    await belir(c, yuksuz, 350);
    const notronlar = [...ornek.cek.children].map((t) => t.firstChild).filter((cem) => cem.getAttribute('fill') === N);
    notronlar.forEach((cem) => cem.setAttribute('stroke', 'var(--text)'));
    await c.tween(900, (e) => notronlar.forEach((cem) => cem.setAttribute('stroke-width', 5 * Math.sin(e * Math.PI))));
    await c.say('Nötronlar yüksüz olduğu için sayıları atomun yükünü etkilemez.');

    await sil(c, notr);
    const soru = c.S('g', {}, svg);
    const yeni = atom(c, soru, 250, 270, 160, 3, 4, 0, 20);
    yazi(c, soru, 690, 150, 'Nötr atom', { size: 36, renk: RENK.vurgu });
    yazi(c, soru, 690, 240, '3 proton', { size: 30, renk: P });
    yazi(c, soru, 690, 290, '4 nötron', { size: 30, renk: N });
    const kac = yazi(c, soru, 690, 340, '? elektron', { size: 30, renk: E });
    await belir(c, soru);
    await c.choice({ tag: 'Uygula', q: 'Çekirdeğinde 3 proton ve 4 nötron bulunan nötr bir atomda kaç elektron vardır?', options: ['3', '4', '7'], answer: 0,
      hints: ['', '4, nötron sayısıdır; nötronlar atomun yükünü etkilemez.', '7, proton ve nötronların toplamıdır; elektron sayısı değildir.'],
      right: '3. Nötr atomda elektron sayısı proton sayısına eşittir.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        kac.textContent = '3 elektron';
        for (let k = 0; k < 3; k++) top(c, yeni.elektronlar, 250 + Math.cos(-0.7 + k * TAU / 3) * 160, 270 + Math.sin(-0.7 + k * TAU / 3) * 160, 14.4, 'e');
      } });
    await belir(c, yazi(c, soru, 690, 420, '3 proton = 3 elektron', { size: 30 }), 350);
    await c.say('Atom nötr olduğuna göre elektron sayısı proton sayısına eşittir: 3.',
      { speak: 'Atom nötr olduğuna göre elektron sayısı proton sayısına eşittir: [short pause] üç.' });

    await sil(c, soru);
    const kutleler = tablo(c, svg, [{ ad: 'Kütle', x: 620, alan: 'kutle' }]);
    await belir(c, kutleler.g);
    await Promise.all([kutleler.doldur(0, 0), kutleler.doldur(0, 1)]);
    const kat = yazi(c, kutleler.g, 500, 492, 'Proton ≈ 1836 × elektron', { size: 30, renk: RENK.vurgu });
    await belir(c, kat, 350);
    await c.say('Bir protonun kütlesi, elektronun kütlesinin yaklaşık 1836 katıdır.',
      { speak: 'Bir protonun kütlesi, elektronun kütlesinin yaklaşık bin sekiz yüz otuz altı katıdır.' });
    await kutleler.doldur(0, 2);
    kat.textContent = 'Nötron: protondan biraz büyük';
    await c.say('Nötronun kütlesi protonunkine çok yakındır, ama ondan biraz büyüktür.');
    const cerceve = c.S('rect', { x: 70, y: 252, width: 860, height: 168, rx: 10, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, kutleler.g);
    kat.textContent = 'Atom kütlesinin büyük kısmı: proton ve nötron';
    await belir(c, cerceve, 350);
    await c.say('Bu yüzden atomun kütlesinin büyük kısmını proton ve nötronlar oluşturur.');

    const sec = c.slider({ label: 'Tanecik', min: 0, max: 2, value: 0, fmt: (k) => TANECIK[k].ad, onInput: (k) => tanecikKarti(c, svg, k) });
    await c.say('Tanecik kartını değiştir; yükleri ve kütleleri karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();

    await c.tween(300, (e) => { svg.style.opacity = 1 - e; });
    svg.replaceChildren();
    svg.style.opacity = 1;
    const son = c.S('g', {}, svg);
    yazi(c, son, 500, 110, 'Keşif yılı', { size: 34, renk: RENK.soluk });
    TANECIK.forEach((t, k) => {
      const x = 250 + k * 250;
      top(c, son, x, 230, 36, t.tur);
      yazi(c, son, x, 320, t.ad, { size: 30, renk: t.renk });
      yazi(c, son, x, 400, '?', { size: 48, renk: RENK.vurgu });
    });
    await belir(c, son);
    await c.say('Peki bu tanecikler ne zaman keşfedildi?', { speak: '[curious] Peki bu tanecikler ne zaman keşfedildi?' });
    c.note('<b>Proton +1, elektron −1, nötron 0.</b><br>Kütle: proton ≈ 1836 × elektron; nötron biraz daha büyük.', 'Üç tanecik');
  }

  /* ---- Sahne 5 · Elektron ve proton modeli değiştirdi ---- */
  async function elektronProton(c) {
    const svg = c.svg();
    const s = kesifSeridi(c, svg);
    s.adlar[2].setAttribute('opacity', 0.4);
    s.not.textContent = 'Keşifler adım adım ilerledi';
    await belir(c, s.g);
    await c.say('Bu tanecikler bir anda bulunmadı; keşifler adım adım ilerledi.');
    s.not.textContent = 'Elektron: ilk keşif 1832';
    await belir(c, s.isaret(1832, 'e'));
    await c.say('Elektronla ilgili keşifler 1832’de başladı.', { speak: 'Elektronla ilgili keşifler bin sekiz yüz otuz ikide başladı.' });
    s.not.textContent = '1891: atomda eksi yük';
    await belir(c, s.isaret(1891, 'e'));
    await c.say('Atomda eksi yük bulunduğu ise 1891’de ortaya kondu.', { speak: 'Atomda eksi yük bulunduğu ise bin sekiz yüz doksan birde ortaya kondu.' });
    s.not.textContent = 'Eksi yüklü tanecik: atomdan küçük';
    await belir(c, s.not, 350);
    await c.say('Eksi yüklü bu tanecik atomun bir parçasıdır; yani atomdan küçüktür.');
    s.vurgula(0);
    await c.choice({ tag: 'Uygula', q: 'Atomda eksi yüklü bir taneciğin bulunması, Dalton modelinin hangi varsayımıyla çelişir?',
      options: ['Atom küre biçimindedir.', 'Atom bölünmez bir küredir.', 'Maddeler atomlardan oluşur.'], answer: 1,
      hints: ['Bir taneciğin bulunması, atomun biçimi hakkında bir şey söylemez.', '', 'Atomun içinde tanecik olması, maddelerin atomlardan oluşmasıyla çelişmez.'],
      right: 'Bölünmezlik varsayımıyla çelişir: atomun içinde ondan küçük bir tanecik var.' });
    s.not.textContent = 'İçinde tanecik var: bölünmez olamaz';
    await c.tween(400, (e) => { s.modeller[0].style.opacity = 1 - 0.6 * e; });
    await c.say('İçinde daha küçük bir tanecik bulunan atom, bölünmez olamaz.',
      { speak: '[thoughtful] İçinde daha küçük bir tanecik bulunan atom, bölünmez olamaz.' });
    s.vurgula(1);
    s.not.textContent = 'Thomson modeli: içinde yüklü tanecikler';
    const eOklari = c.S('g', {}, s.g);
    eOklari.append(s.ok(1832, 1897, E), s.ok(1891, 1897, E));
    await belir(c, eOklari);
    await c.say('1897’deki Thomson modeli bu yüzden atomun içine yüklü tanecikler koydu.',
      { speak: 'Bin sekiz yüz doksan yedideki Tamsın modeli bu yüzden atomun içine yüklü tanecikler koydu.' });
    s.vurgula(-1);
    eOklari.style.opacity = 0.3;
    s.not.textContent = 'Proton: 1886 ve 1906';
    const p1 = s.isaret(1886, 'p'), p2 = s.isaret(1906, 'p');
    await Promise.all([belir(c, p1), belir(c, p2)]);
    await c.say('Artı yüklü tanecikle, yani protonla ilgili keşifler 1886 ve 1906’da yapıldı.',
      { speak: 'Artı yüklü tanecikle, yani protonla ilgili keşifler bin sekiz yüz seksen altı ve bin dokuz yüz altıda yapıldı.' });
    s.vurgula(2);
    s.not.textContent = 'Rutherford modeli: artı yük çekirdekte';
    const pOklari = c.S('g', {}, s.g);
    pOklari.append(s.ok(1886, 1911, P), s.ok(1906, 1911, P));
    await belir(c, pOklari);
    await c.say('1911’deki Rutherford modeli artı yükü çekirdeğe yerleştirdi.',
      { speak: 'Bin dokuz yüz on birdeki Raterford modeli artı yükü çekirdeğe yerleştirdi.' });
    s.vurgula(-1);
    s.not.textContent = 'Önce veri, sonra model';
    await c.tween(400, (e) => { eOklari.style.opacity = 0.3 + 0.7 * e; });
    await c.say('İki durumda da önce veri geldi, model ardından değişti.');
  }

  /* ---- Sahne 6 · Nötron en son geldi ---- */
  async function notron(c) {
    const svg = c.svg();
    const s = kesifSeridi(c, svg);
    const onceki = c.S('g', { opacity: 0.5 }, s.g);
    [[1832, 'e'], [1891, 'e'], [1886, 'p'], [1906, 'p']].forEach(([yil, tur]) => onceki.append(s.isaret(yil, tur)));
    s.adlar[0].setAttribute('opacity', 0.5);
    s.adlar[1].setAttribute('opacity', 0.5);
    s.not.textContent = 'Nötron: keşfi daha geç';
    await belir(c, s.g);
    await c.say('Üçüncü taneciğin, nötronun keşfi daha geç tamamlandı.');
    s.not.textContent = '1913: yüksüz taneciklerle ilgili keşif';
    await belir(c, s.isaret(1913, 'n'));
    await c.say('Yüksüz taneciklerle ilgili ilk keşif 1913’te yapıldı.', { speak: 'Yüksüz taneciklerle ilgili ilk keşif bin dokuz yüz on üçte yapıldı.' });
    s.not.textContent = '1932: nötron keşfedildi';
    const sonIsaret = s.isaret(1932, 'n');
    await belir(c, sonIsaret);
    await c.say('Nötron ise 1932’de keşfedildi.', { speak: 'Nötron ise bin dokuz yüz otuz ikide keşfedildi.' });
    s.not.textContent = '1932: beş modelin hepsinden sonra';
    const sinir = c.S('g', {}, s.g);
    c.S('line', { x1: 908, y1: 150, x2: 908, y2: 505, stroke: RENK.vurgu, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, sinir);
    c.S('circle', { cx: SX[1932], cy: s.Y - 73, r: 22, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, sinir);
    await belir(c, sinir, 350);
    await c.say('Zaman şeridine bak: 1932, beş modelin hepsinden sonradır.',
      { speak: 'Zaman şeridine bak: bin dokuz yüz otuz iki, beş modelin hepsinden sonradır.' });
    sinir.remove();
    s.vurgula(2);
    s.not.textContent = 'Rutherford modeli: 1911';
    await c.choice({ tag: 'Uygula', q: 'Rutherford 1911’de modelini kurarken hangi tanecik henüz keşfedilmemişti?', options: ['Elektron', 'Proton', 'Nötron'], answer: 2,
      hints: ['Elektronla ilgili keşifler 1832 ve 1891’de, yani 1911’den önce yapıldı.', 'Protonla ilgili keşifler 1886 ve 1906’da, yani 1911’den önce yapıldı.', ''],
      right: 'Nötron. Nötronla ilgili iki keşif de 1911’den sonradır: 1913 ve 1932.' });

    await sil(c, s.g);
    const yakin = c.S('g', {}, svg);
    yazi(c, yakin, 500, 70, 'Çekirdeğe yakından bakış', { size: 32, renk: RENK.soluk });
    const eski = c.S('g', {}, yakin);
    c.S('circle', { cx: 250, cy: 240, r: 84, fill: P, 'fill-opacity': 0.75 }, eski);
    isaret(c, eski, 250, 240, 30, true, SIYAH);
    yazi(c, eski, 250, 386, '1911 modeli', { size: 30, renk: MOR });
    yazi(c, eski, 250, 430, 'yalnızca artı yük', { size: 28 });
    await belir(c, yakin);
    await c.say('1911 modelinin çekirdeğinde yalnızca artı yük vardı.', { speak: 'Bin dokuz yüz on bir modelinin çekirdeğinde yalnızca artı yük vardı.' });
    const bugun = c.S('g', {}, yakin);
    cekirdek(c, bugun, 750, 240, 27, 3, 4);
    yazi(c, bugun, 750, 386, 'Bugün', { size: 30, renk: MOR });
    yazi(c, bugun, 750, 430, 'proton ve nötron', { size: 28 });
    await belir(c, bugun);
    await c.say('Bugün çekirdekte protonların yanında nötronların da olduğunu biliyoruz.');
    const gecis = c.S('g', {}, yakin);
    ok(c, gecis, 390, 240, 600, RENK.vurgu);
    yazi(c, gecis, 495, 212, 'bilgi değişti', { size: 28, renk: RENK.vurgu });
    await belir(c, gecis, 350);
    await c.say('Model kurulduktan sonra da çekirdek hakkındaki bilgi değişmeye devam etti.');
    c.note('<b>Önce veri gelir, sonra model değişir.</b><br>Eksi yük 1891 → Thomson modeli 1897', 'Veri ve model');
  }

  /* ---- Sahne 7 · Değişen atom değil, bilgimiz ---- */
  /* Atomun kendisi: hangi modelle anlatılırsa anlatılsın aynı kalan gri küre. */
  const gercekAtom = (c, p, x, y, r) => c.S('circle', { cx: x, cy: y, r, fill: GRI, 'fill-opacity': 0.45, stroke: GRI, 'stroke-width': 3 }, p);
  async function degisen(c) {
    const svg = c.svg();
    const sahne = c.S('g', {}, svg);
    gercekAtom(c, sahne, 220, 215, 92);
    yazi(c, sahne, 220, 370, 'Atom', { size: 32 });
    kutu(c, sahne, 480, 50, 420, 360, { renk: MOR });
    const ic = c.S('g', {}, sahne);
    const etiket = yazi(c, sahne, 690, 384, '', { size: 28, renk: MOR });
    const goster = (i) => {
      ic.replaceChildren();
      sema(c, ic, i, 690, 205, 105);
      etiket.textContent = MODELLER[i].tam + ' · ' + MODELLER[i].yil;
    };
    /* Çerçevedeki modeli sırayla değiştirir; atom yerinde kalır. */
    const dongu = async (ms) => {
      for (let i = 0; i < 5; i++) {
        goster(i);
        await belir(c, ic, 200);
        await c.wait(ms);
      }
    };
    goster(0);
    await belir(c, sahne);
    const ayni = yazi(c, sahne, 220, 414, 'hiç değişmedi', { size: 28, renk: 'var(--good)' });
    await Promise.all([
      dongu(420),
      belir(c, ayni, 350),
      c.say('1803’ten 1926’ya atomun kendisi hiç değişmedi.', { speak: 'Bin sekiz yüz üçten bin dokuz yüz yirmi altıya atomun kendisi hiç değişmedi.' }),
    ]);
    await belir(c, yazi(c, sahne, 690, 456, 'Model: değişti', { size: 28, renk: RENK.vurgu }), 350);
    await c.say('Değişen, atom hakkındaki bilgimiz ve onu anlatan modeldi.',
      { speak: '[thoughtful] Değişen, atom hakkındaki bilgimiz ve onu anlatan modeldi.' });
    const alt = yazi(c, sahne, 500, 520, 'Her model: kendi zamanının bilgi birikimi', { size: 28 });
    await Promise.all([dongu(420), belir(c, alt, 350), c.say('Her model, kendi zamanının bilgi birikimiyle kuruldu.')]);
    alt.textContent = 'Yeni keşif: eski bilgi değişir ya da gelişir';
    await belir(c, alt, 350);
    await c.say('Yeni keşifler gelince eski bilgi değiştirilir ya da geliştirilir.');
    alt.textContent = 'Bilimsel bilginin değişebilirliği';
    alt.style.fill = 'var(--c5)';
    alt.setAttribute('font-size', 32);
    await belir(c, alt, 350);
    await c.say('Buna bilimsel bilginin değişebilirliği denir.');

    await sil(c, sahne);
    const serit = c.S('g', {}, svg);
    serit5(c, serit, 400);
    const kucukler = MODELLER.map((m, i) => {
      const g = c.S('g', {}, serit);
      sema(c, g, i, X5(i), 280, 50);
      yazi(c, g, X5(i), 372, m.ad, { size: 24 });
      return g;
    });
    const isaretci = c.S('g', {}, serit);
    c.S('line', { x1: 215, y1: 140, x2: 215, y2: 460, stroke: RENK.vurgu, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, isaretci);
    yazi(c, isaretci, 215, 120, '1850', { size: 32, renk: RENK.vurgu });
    await belir(c, serit);
    await c.choice({ tag: 'Uygula', q: '1850’de yaşayan bir bilim insanı atom için en fazla hangisini söyleyebilirdi?',
      options: ['Atomun merkezinde bir çekirdek vardır.', 'Atom bölünmez bir küredir.', 'Elektronlar yörüngelerde döner.'], answer: 1,
      hints: ['Çekirdek kavramı 1911’deki modelle geldi; 1850’den sonradır.', '', 'Yörünge kavramı 1913’teki modelle geldi; 1850’den sonradır.'],
      right: '1850’ye kadar önerilen tek model, 1803’teki Dalton modeliydi.' });
    await c.tween(400, (e) => { kucukler.slice(1).forEach((g) => { g.style.opacity = 1 - 0.75 * e; }); });
    await belir(c, yazi(c, serit, 620, 120, 'Yalnızca Dalton modeli vardı', { size: 30 }), 350);
    await c.say('1850’de yalnızca Dalton modeli vardı; eldeki veriyle en iyi açıklama oydu.',
      { speak: 'Bin sekiz yüz ellide yalnızca Dalton modeli vardı; eldeki veriyle en iyi açıklama oydu.' });

    await sil(c, serit);
    const sayi = c.S('g', {}, svg);
    yazi(c, sayi, 500, 250, '300+', { size: 130, renk: RENK.vurgu });
    yazi(c, sayi, 500, 330, 'atom altı parçacık', { size: 38 });
    await belir(c, sayi);
    await c.say('Bugün üç yüzden fazla atom altı parçacık biliniyor.');
    await belir(c, yazi(c, sayi, 500, 430, 'Araştırma hâlâ sürüyor', { size: 32, renk: RENK.soluk }), 350);
    await c.say('Yani atomun en küçük parçaları hakkındaki araştırma hâlâ sürüyor.');

    await sil(c, sayi);
    const gerek = c.S('g', {}, svg);
    sema(c, gerek, 3, 260, 220, 105);
    yazi(c, gerek, 260, 380, 'Bohr modeli · 1913', { size: 28, renk: MOR });
    yazi(c, gerek, 260, 424, 'Açıklayamadıkları vardı', { size: 28 });
    ok(c, gerek, 410, 220, 580, RENK.vurgu);
    c.S('circle', { cx: 740, cy: 220, r: 105, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, gerek);
    yazi(c, gerek, 740, 240, '?', { size: 64, renk: RENK.vurgu });
    yazi(c, gerek, 740, 380, 'Yeni bir model', { size: 28, renk: RENK.vurgu });
    await belir(c, gerek);
    await c.say('Bohr modelinin de açıklayamadığı şeyler vardı; yeni bir model gerekti.',
      { speak: 'Bor modelinin de açıklayamadığı şeyler vardı; yeni bir model gerekti.' });

    await sil(c, gerek);
    const ozet = c.S('g', {}, svg);
    gercekAtom(c, ozet, 160, 250, 80);
    yazi(c, ozet, 160, 390, 'Atom aynı kaldı', { size: 28, renk: 'var(--good)' });
    MODELLER.forEach((m, i) => {
      const x = 370 + i * 135;
      sema(c, ozet, i, x, 250, 44);
      if (i) ok(c, ozet, x - 86, 250, x - 50, RENK.vurgu);
    });
    yazi(c, ozet, 640, 390, 'Yeni veri gelince model değişti', { size: 28, renk: RENK.vurgu });
    await belir(c, ozet);
    await c.say('Atom aynı kaldı; yeni veri gelince model değişti.', { speak: 'Atom aynı kaldı; [short pause] yeni veri gelince model değişti.' });
    c.note('<b>Atom aynı kaldı; yeni veri gelince model değişti.</b><br>1803–1926: beş model, tek atom', 'Değişen bilgi');
  }

  Ders.start({
    id: 'etkilesim-c1', kicker: 'Konu C · Atom teorileri', title: 'Yeni veri modeli değiştirir', accent: MOR, back: 'index.html',
    intro: { title: 'Yeni veri modeli değiştirir', hook: 'Atom mu değişti, atom hakkında bildiklerimiz mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Görmediğimiz bir şeyi çizmek', goal: 'Teori ile modeli birbirinden ayır.', run: gorunmeyen },
      { title: 'Beş model, bir zaman şeridi', goal: 'Beş modeli yıllarına göre sırala.', run: zamanSeridi },
      { title: 'Her model ne ekledi?', goal: 'Her modelin eklediği kavramı karşılaştır.', run: kavramlar },
      { title: 'Atomun üç temel taneciği', goal: 'Taneciklerin yerini, yükünü ve kütlesini karşılaştır.', run: tanecikler },
      { title: 'Elektron ve proton modeli değiştirdi', goal: 'Keşifleri ardından gelen modele bağla.', run: elektronProton },
      { title: 'Nötron en son geldi', goal: 'Nötronun keşfini zaman şeridine yerleştir.', run: notron },
      { title: 'Değişen atom değil, bilgimiz', goal: 'Değişenin atom değil, bilgi olduğunu açıkla.', run: degisen },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '1900’de çizilen atom modeli ile 1930’da çizilen birbirinden farklıdır. Bunun nedeni nedir?',
        options: ['Atomların yapısı otuz yılda değişti.', 'Yeni keşiflerle atom hakkındaki bilgi değişti.', '1900’deki bilim insanları veriye bakmadı.'], answer: 1,
        why: ['Atom aynı kaldı; değişen, onu anlatan modeldi.', 'Her model kendi zamanının verisiyle kuruldu; yeni veri gelince değişti.', 'Her model, kendi zamanında eldeki veriyle kurulmuştu.'], scene: 6 },
      { q: 'Elektron, proton ve nötron kütlelerine göre büyükten küçüğe nasıl sıralanır?',
        options: ['Proton, nötron, elektron', 'Elektron, proton, nötron', 'Nötron, proton, elektron'], answer: 2,
        why: ['Nötronun kütlesi protonunkinden biraz büyüktür.', 'Elektron en hafif olandır; proton onun yaklaşık 1836 katıdır.', 'Nötron protondan biraz büyüktür; proton elektronun yaklaşık 1836 katıdır.'], scene: 3 },
      { q: 'Çekirdeğinde 5 proton ve 6 nötron bulunan, çekirdeğin dışında 5 elektron olan bir atomun toplam yükü kaçtır?',
        options: ['0', '+6', '+11'], answer: 0,
        why: ['Evet. Beş tane +1 ile beş tane −1 birbirini götürür; nötron yüksüzdür.', '6, nötron sayısıdır; nötronlar yüksüz olduğu için yüke katılmaz.', '11, proton ve nötronların toplamıdır; elektronların −1 yükü ve nötronların yüksüzlüğü hesaba katılmamış.'], scene: 3 },
      { q: 'Zeynep: “1897’de Thomson modeli gelince atomun kendisi değişti; atom artık içinde yüklü tanecikler bulunan bir küre oldu.” Zeynep’e hangi karşılık verilmeli?',
        options: ['Haklı; yeni model gelince atom da o modele uygun hâle gelir.', 'Haksız; atomun içinde yüklü tanecik yoktur, model yanlıştır.', 'Haksız; atom aynı kaldı, değişen atom hakkındaki bilgidir.'], answer: 2,
        why: ['Atom modele uymaz, model veriye uyar. Yeni veri gelince model değişti, atom aynı kaldı.', 'Atomda eksi yüklü tanecik bulunduğu ortaya konmuştu; model bu veriye dayanarak kuruldu.', 'Evet. Atom aynı kaldı; yeni veri gelince onu anlatan model değişti.'], scene: 6 },
    ], summary: ['<b>Atom aynı kaldı; yeni veri gelince model değişti.</b>', 'Elektron ve protonla ilgili keşifler modeli değiştirdi; nötron beş modelden sonra keşfedildi.'],
    nextLesson: { href: 'c2-yorungeden-orbitale.html', label: 'Sonraki: Yörüngeden orbitale ›' },
  });
})();
