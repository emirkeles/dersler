/* C2 · KİM.9.1.3 · Senaryo: plan/kimya/etkilesim/senaryolar/C-atom-teorileri.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 45, 47, 50–51 ve 54'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Enerji seviyesi çizgilerinin aralığı, yörünge yarıçapları ve olasılık noktaları şemadır; hesap ya da ölçek değildir.
   Terim: yalnızca "enerji seviyesi"; soğurma ve yaymada "daha yüksek / daha düşük enerji seviyesi". */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const MOR = '#c792ff', ELEKTRON = 'var(--c1)', CEKIRDEK = 'var(--c2)', ENERJI = 'var(--c5)', KOYU = '#162038', GRI = '#8f9bbd', SIYAH = '#0b0d12';
  const IYI = 'var(--good)', KOTU = 'var(--bad)';
  const TAU = Math.PI * 2;

  /* ---- Genel çizim yardımcıları ---- */
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: 12,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  /* İki nokta arasında düz ok. */
  function ok(c, p, x1, y1, x2, y2, renk = RENK.cizgi, kalin = 4) {
    const g = c.S('g', {}, p), a = Math.atan2(y2 - y1, x2 - x1), u = 13;
    c.S('path', { d: `M ${x1} ${y1} L ${x2} ${y2} M ${x2 - u * Math.cos(a - 0.5)} ${y2 - u * Math.sin(a - 0.5)} L ${x2} ${y2} L ${x2 - u * Math.cos(a + 0.5)} ${y2 - u * Math.sin(a + 0.5)}`,
      fill: 'none', stroke: renk, 'stroke-width': kalin, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }
  /* Yatay dalgalı ok: enerjinin girişi ya da çıkışı (x1 → x2). */
  function dalga(c, p, x1, y, x2) {
    const yon = Math.sign(x2 - x1), adim = 22, n = Math.floor((Math.abs(x2 - x1) - 16) / adim);
    let d = `M ${x1} ${y}`;
    for (let k = 0; k < n; k++) d += ` q ${yon * adim / 2} ${k % 2 ? 13 : -13} ${yon * adim} 0`;
    d += ` L ${x2} ${y} M ${x2 - yon * 12} ${y - 9} L ${x2} ${y} L ${x2 - yon * 12} ${y + 9}`;
    return c.S('path', { d, fill: 'none', stroke: ENERJI, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  }
  /* Üst simge içeren tahta yazısı ("Li^{2+}"). */
  const usYazi = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 28,
    'font-weight': 600, style: 'fill:' + (o.renk || 'var(--text)'), math: metin }, p);
  const sil = async (c, g, ms = 300) => {
    await c.tween(ms, (e) => { g.style.opacity = 1 - e; });
    g.remove();
  };
  /* Çekirdek: artı işaretli turuncu daire. */
  function cekirdek(c, p, x, y, r = 16) {
    const g = c.S('g', {}, p), b = r * 0.5;
    c.S('circle', { cx: x, cy: y, r, fill: CEKIRDEK }, g);
    if (r >= 9) c.S('path', { d: `M ${x - b} ${y} H ${x + b} M ${x} ${y - b} V ${y + b}`, fill: 'none', stroke: SIYAH, 'stroke-width': Math.max(2, r * 0.22), 'stroke-linecap': 'round' }, g);
    return g;
  }
  /* Elektron: eksi işaretli mavi daire. Yeri transform ile verilir; tasi() ile oynatılır. */
  function elektron(c, p, x, y, r = 11) {
    const g = c.S('g', { transform: `translate(${x} ${y})` }, p);
    c.S('circle', { r, fill: ELEKTRON }, g);
    if (r >= 8) c.S('path', { d: `M ${-r * 0.5} 0 H ${r * 0.5}`, fill: 'none', stroke: SIYAH, 'stroke-width': Math.max(2, r * 0.25), 'stroke-linecap': 'round' }, g);
    return g;
  }
  const tasi = (el, x, y) => el.setAttribute('transform', `translate(${x} ${y})`);

  /* Bohr atomu: ortada çekirdek, verilen yarıçaplarda yörüngeler. yer(n, açı) yörünge üzerindeki noktayı verir. */
  function bohrAtom(c, p, x, y, yaricaplar, o = {}) {
    const g = c.S('g', {}, p);
    const yorungeler = yaricaplar.map((r) => c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: MOR, 'stroke-width': o.kalin || 3 }, g));
    cekirdek(c, g, x, y, o.cekirdek || 16);
    const yer = (n, aci) => [x + Math.cos(aci) * yaricaplar[n - 1], y + Math.sin(aci) * yaricaplar[n - 1]];
    return { g, x, y, yorungeler, yer, koy: (n, aci, r) => elektron(c, g, ...yer(n, aci), r) };
  }
  /* Elektronu n. yörüngede a0 açısından başlatıp tur kadar döndürür. */
  const dondur = (c, atom, el, n, a0, tur, ms) => c.tween(ms, (e) => tasi(el, ...atom.yer(n, a0 + e * tur * TAU)), Ders.ease.linear);

  /* Olasılık noktaları: çekirdeğe yakın sık, uzakta seyrek. Dönen: { g, noktalar: [{ x, y, rr, el }] }. */
  function bulut(c, p, x, y, R, adet, tohum = 7) {
    const g = c.S('g', {}, p), noktalar = [];
    let t = tohum;
    const rasgele = () => { t = (t * 16807) % 2147483647; return t / 2147483647; };
    for (let j = 0; j < adet; j++) {
      const a = rasgele() * TAU, rr = R * Math.pow(rasgele(), 1.1);
      const nx = x + Math.cos(a) * rr, ny = y + Math.sin(a) * rr;
      noktalar.push({ x: nx, y: ny, rr, el: c.S('circle', { cx: nx, cy: ny, r: Math.max(1.8, R * 0.019), fill: ELEKTRON, opacity: 0.85 }, g) });
    }
    return { g, noktalar };
  }
  /* Küçük şemalar (karşılaştırma ve zincir için). */
  function bohrSema(c, p, x, y, r) {
    const a = bohrAtom(c, p, x, y, [r * 0.55, r], { cekirdek: Math.max(5, r * 0.14), kalin: r < 70 ? 2 : 3 });
    a.koy(1, 0.6, Math.max(4, r * 0.1));
    return a;
  }
  function modernSema(c, p, x, y, r) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r, fill: ELEKTRON, 'fill-opacity': 0.1 }, g);
    bulut(c, g, x, y, r, r < 70 ? 60 : 110, 11);
    cekirdek(c, g, x, y, Math.max(5, r * 0.14));
    return g;
  }

  /* ---- Sahne 1 · Bohr'un atomu ---- */
  async function bohrunAtomu(c) {
    const svg = c.svg();
    const AX = 300, AY = 292, R = [70, 125, 180], ACI = 2.6;
    yazi(c, svg, 500, 52, 'Bohr · 1913', { size: 30, renk: MOR });
    const atom = bohrAtom(c, svg, AX, AY, R);
    atom.yorungeler[1].style.opacity = 0;
    atom.yorungeler[2].style.opacity = 0;
    const e1 = atom.koy(1, ACI);
    const sag = c.S('g', {}, svg);
    /* Sağ yandaki iki satırlık açıklama. */
    const sagYaz = (satirlar, renk) => {
      sag.replaceChildren();
      satirlar.forEach((s, i) => yazi(c, sag, 760, 262 + i * 46, s, { size: 30, renk }));
      return belir(c, sag, 350);
    };
    sagYaz(['Eklenen kavram:', 'yörünge'], ENERJI);
    await belir(c, svg);
    await c.say('Önceki derste gördük: 1913’te Bohr, atoma yörünge kavramını ekledi.',
      { speak: 'Önceki derste gördük: bin dokuz yüz on üçte Bor, atoma yörünge kavramını ekledi.' });
    sagYaz(['Elektron: dairesel', 'yörüngelerde']);
    await c.tween(450, (e) => { atom.yorungeler[1].style.opacity = e; atom.yorungeler[2].style.opacity = e; });
    await Promise.all([
      dondur(c, atom, e1, 1, ACI, 2, 3600),
      c.say('Bohr’a göre elektron, çekirdeğin çevresindeki dairesel yörüngelerde hareket eder.',
        { speak: 'Bor’a göre elektron, çekirdeğin çevresindeki dairesel yörüngelerde hareket eder.' }),
    ]);
    const uzaklik = c.S('g', {}, svg);
    [0.35, 0.8, 1.25].forEach((aci, k) => {
      const [x, y] = atom.yer(k + 1, aci);
      c.S('line', { x1: AX, y1: AY, x2: x, y2: y, stroke: ENERJI, 'stroke-width': 3, 'stroke-dasharray': '7 7' }, uzaklik);
      c.S('circle', { cx: x, cy: y, r: 6, fill: ENERJI }, uzaklik);
    });
    sagYaz(['Her yörünge:', 'belirli bir uzaklık']);
    await belir(c, uzaklik, 350);
    await c.say('Her yörünge çekirdekten belirli bir uzaklıktadır.');
    await sil(c, uzaklik);
    await sagYaz(['Yörünge =', 'enerji seviyesi'], ENERJI);
    await c.say('Bu yörüngelere enerji seviyesi de denir.');
    const numaralar = c.S('g', {}, svg);
    R.forEach((r, k) => yazi(c, numaralar, AX, AY - r - 12, 'n = ' + (k + 1), { size: 24 }));
    sagYaz(['Çekirdekten dışa doğru:', 'n = 1, 2, 3']);
    await belir(c, numaralar, 350);
    await c.say('Enerji seviyeleri çekirdekten dışa doğru n = 1, 2, 3 diye numaralanır.',
      { speak: 'Enerji seviyeleri çekirdekten dışa doğru ne eşittir bir, iki, üç diye numaralanır.' });

    sag.replaceChildren();
    const amfi = c.S('g', {}, svg);
    yazi(c, amfi, 790, 150, 'Amfi tiyatro', { size: 28, renk: RENK.soluk });
    c.S('rect', { x: 600, y: 432, width: 92, height: 14, rx: 3, fill: GRI }, amfi);
    yazi(c, amfi, 646, 480, 'Sahne', { size: 24 });
    for (let k = 0; k < 3; k++) kutu(c, amfi, 705 + k * 78, 392 - k * 56, 78, 54 + k * 56, { kalin: 2 }).setAttribute('rx', 3);
    yazi(c, amfi, 822, 500, 'Sıralar yükselir', { size: 26 });
    await belir(c, amfi);
    await c.say('Bir amfi tiyatro düşün: sahneden uzaklaştıkça sıralar yükselir.');
    const artis = c.S('g', {}, svg);
    ok(c, artis, 712, 372, 912, 228, ENERJI);
    ok(c, artis, AX + 30 * Math.cos(-0.75), AY + 30 * Math.sin(-0.75), AX + 208 * Math.cos(-0.75), AY + 208 * Math.sin(-0.75), ENERJI);
    yazi(c, artis, 492, 122, 'Enerji artar', { size: 26, renk: ENERJI });
    await belir(c, artis, 400);
    await c.say('Atomda da çekirdekten uzaklaştıkça yörüngenin ve elektronun enerjisi artar.');

    await Promise.all([sil(c, amfi), sil(c, artis)]);
    tasi(e1, ...atom.yer(1, 2.6));
    const e3 = atom.koy(3, -2.5);
    const halkalar = c.S('g', {}, svg);
    [[1, 2.6], [3, -2.5]].forEach(([n, aci]) => { const [x, y] = atom.yer(n, aci); c.S('circle', { cx: x, cy: y, r: 20, fill: 'none', stroke: ENERJI, 'stroke-width': 3 }, halkalar); });
    sagYaz(['Hangisinin enerjisi', 'daha yüksek?']);
    await c.choice({ tag: 'Uygula', q: 'Bir elektron n = 1’de, bir başkası n = 3’te bulunuyor. Hangisinin enerjisi daha yüksektir?',
      options: ['n = 1’deki', 'n = 3’teki', 'İkisi eşittir'], answer: 1,
      hints: ['n = 1 çekirdeğe en yakın yörüngedir; enerji çekirdekten uzaklaştıkça artar.', '', 'Yörüngelerin enerjisi aynı değildir; çekirdekten uzaklaştıkça artar.'],
      right: 'n = 3’teki. Çekirdekten uzaklaştıkça enerji artar.',
      onPick: (i, dogru) => { if (dogru) halkalar.firstChild.remove(); } });
    sagYaz(['n = 3: daha uzak,', 'enerjisi daha yüksek'], ENERJI);
    await c.say('n = 3 çekirdekten daha uzaktır; oradaki elektronun enerjisi daha yüksektir.',
      { speak: 'Ne eşittir üç çekirdekten daha uzaktır; oradaki elektronun enerjisi daha yüksektir.' });

    halkalar.remove();
    e3.remove();
    sag.replaceChildren();
    const merdiven = c.S('g', {}, svg), SY = (n) => 530 - n * 100;
    ok(c, merdiven, 612, 450, 612, 200, ENERJI);
    yazi(c, merdiven, 612, 176, 'Enerji', { size: 26, renk: ENERJI });
    [1, 2, 3].forEach((n) => {
      c.S('line', { x1: 650, y1: SY(n), x2: 860, y2: SY(n), stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, merdiven);
      yazi(c, merdiven, 880, SY(n) + 9, 'n = ' + n, { size: 24, hiza: 'start' });
    });
    const isaretci = elektron(c, merdiven, 755, SY(1));
    const sec = c.slider({ label: 'Enerji seviyesi', min: 1, max: 3, value: 1, fmt: (n) => 'n = ' + n, onInput: (n) => {
      tasi(e1, ...atom.yer(n, 2.6));
      tasi(isaretci, 755, SY(n));
      atom.yorungeler.forEach((y, k) => { y.setAttribute('stroke', k === n - 1 ? ENERJI : MOR); y.setAttribute('stroke-width', k === n - 1 ? 5 : 3); });
    } });
    await c.say('Enerji seviyesini değiştir; elektronun yörüngesini ve enerjisini izle.', { noWait: true });
    await c.cont();
    const secilen = sec.get();
    sec.remove();

    await sil(c, merdiven);
    sagYaz(['Elektronun yeri:', 'bir çizgi (yörünge)'], ENERJI);
    await dondur(c, atom, e1, secilen, 2.6, 1, 1800);
    await c.say('Bohr’un atomunda elektronun yeri bir çizgiyle gösterilir: yörünge.',
      { speak: 'Bor’un atomunda elektronun yeri bir çizgiyle gösterilir: [short pause] yörünge.' });
    c.note('<b>Bohr: elektron belirli dairesel yörüngelerde hareket eder.</b><br>Çekirdekten uzaklaştıkça enerji artar.', 'Bohr atom teorisi');
  }

  /* ---- Sahne 2 · Soğurma ve yayma ---- */
  /* İki enerji seviyesi: x merkezli iki yatay çizgi (üstte yüksek, altta düşük enerjili). */
  const YUKSEK = 190, DUSUK = 390;
  function ikiSeviye(c, p, x) {
    const g = c.S('g', {}, p);
    [YUKSEK, DUSUK].forEach((y) => c.S('line', { x1: x - 140, y1: y, x2: x + 140, y2: y, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g));
    return g;
  }
  /* Üç enerji seviyesi: n = 1 altta. x1–x2 arasında çizgiler, etiketler solda. */
  const SEVIYE = { 1: 410, 2: 290, 3: 170 };
  function ucSeviye(c, p, x1, x2) {
    const g = c.S('g', {}, p);
    [1, 2, 3].forEach((n) => {
      c.S('line', { x1, y1: SEVIYE[n], x2, y2: SEVIYE[n], stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      yazi(c, g, x1 - 22, SEVIYE[n] + 9, 'n = ' + n, { size: 26, hiza: 'end' });
    });
    return g;
  }
  async function sogurmaYayma(c) {
    const svg = c.svg();
    const sahne = c.S('g', {}, svg);
    const SOL = 230, SAG = 770;
    const sol = ikiSeviye(c, sahne, SOL);
    const eSol = elektron(c, sol, SOL, DUSUK, 13);
    const dusukYazi = yazi(c, sahne, 500, DUSUK + 9, 'daha düşük enerji', { size: 24, renk: RENK.soluk });
    const solDurum = yazi(c, sahne, SOL, 462, 'Temel hâl', { size: 28 });
    await belir(c, sahne);
    await c.say('Elektronlar en düşük enerjili yörüngelerdeyse atom temel hâldedir.');
    const yuksekYazi = yazi(c, sahne, 500, YUKSEK + 9, 'daha yüksek enerji', { size: 24, renk: RENK.soluk });
    const giren = dalga(c, sol, 40, 290, 190);
    await Promise.all([belir(c, yuksekYazi, 350), belir(c, giren, 350)]);
    await c.tween(1100, (e) => { tasi(eSol, SOL, DUSUK + (YUKSEK - DUSUK) * e); solDurum.style.opacity = 1 - e; });
    await c.say('Temel hâldeki atom enerji alırsa elektron daha yüksek enerjili yörüngeye geçebilir.');
    await belir(c, yazi(c, sol, SOL, 110, 'Soğurma (absorbsiyon)', { size: 28, renk: ENERJI }), 350);
    await c.say('Bu olaya soğurma ya da absorbsiyon denir.');
    const fark = c.S('g', {}, sol);
    ok(c, fark, 322, DUSUK - 12, 322, YUKSEK + 12, ENERJI, 3);
    ok(c, fark, 322, YUKSEK + 12, 322, DUSUK - 12, ENERJI, 3);
    const farkYazi = yazi(c, sahne, 500, 520, 'Soğurulan enerji = iki yörüngenin enerji farkı', { size: 28, renk: ENERJI });
    await Promise.all([belir(c, fark, 350), belir(c, farkYazi, 350)]);
    await c.say('Soğurulan enerji, iki yörünge arasındaki enerji farkına eşittir.');
    await Promise.all([sil(c, fark), sil(c, farkYazi)]);
    solDurum.textContent = 'Uyarılmış atom';
    solDurum.style.fill = ENERJI;
    await belir(c, solDurum, 350);
    await c.say('Elektronu daha yüksek enerji seviyesine çıkmış atoma uyarılmış atom denir.');

    const sag = ikiSeviye(c, sahne, SAG);
    const eSag = elektron(c, sag, SAG, YUKSEK, 13);
    const sagDurum = yazi(c, sahne, SAG, 462, 'Uyarılmış atom: kararlı değil', { size: 28 });
    solDurum.style.fill = 'var(--text)';
    await Promise.all([belir(c, sag), belir(c, sagDurum)]);
    await c.tween(900, (e) => tasi(eSag, SAG + 7 * Math.sin(e * TAU * 4) * (1 - e), YUKSEK));
    await c.say('Uyarılmış atom kararlı değildir; bu hâlde kalmaz.');
    const cikan = dalga(c, sag, 810, 290, 960);
    const isima = yazi(c, sag, 885, 258, 'ışıma', { size: 24, renk: ENERJI });
    await Promise.all([belir(c, cikan, 350), belir(c, isima, 350)]);
    await c.say('Fazla enerjisini ışıma olarak geri yayar.');
    await c.tween(1100, (e) => { tasi(eSag, SAG, YUKSEK + (DUSUK - YUKSEK) * e); sagDurum.style.opacity = 1 - e; });
    sagDurum.remove();
    await c.say('Böylece elektron daha düşük enerjili bir yörüngeye iner.');
    await belir(c, yazi(c, sag, SAG, 110, 'Yayma (emisyon)', { size: 28, renk: ENERJI }), 350);
    await c.say('Bu olaya yayma ya da emisyon denir.');

    await sil(c, sahne);
    const soru = c.S('g', {}, svg);
    ucSeviye(c, soru, 300, 760);
    const eSoru = elektron(c, soru, 500, SEVIYE[3], 13);
    const inis = c.S('g', {}, soru);
    c.S('line', { x1: 560, y1: SEVIYE[3] + 14, x2: 560, y2: SEVIYE[1] - 26, stroke: ELEKTRON, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, inis);
    ok(c, inis, 560, SEVIYE[1] - 30, 560, SEVIYE[1] - 12, ELEKTRON, 3);
    await belir(c, soru);
    await c.choice({ tag: 'Uygula', q: 'Bir elektron n = 3’ten n = 1’e iniyor. Bu sırada atom ne yapar?',
      options: ['Enerji soğurur (absorbsiyon).', 'Enerji alıp vermez.', 'Enerji yayar (emisyon).'], answer: 2,
      hints: ['Soğurmada elektron daha yüksek enerji seviyesine çıkar; burada iniyor.', 'İki seviyenin enerjisi farklıdır; geçişte bu fark alınır ya da verilir.', ''],
      right: 'Enerji yayar. Elektron daha düşük enerji seviyesine iniyor.' });
    inis.remove();
    await c.tween(1100, (e) => tasi(eSoru, 500, SEVIYE[3] + (SEVIYE[1] - SEVIYE[3]) * e));
    const yayilan = c.S('g', {}, soru);
    dalga(c, yayilan, 790, 290, 950);
    yazi(c, yayilan, 530, 500, 'Aradaki fark dışarı yayılır', { size: 28, renk: ENERJI });
    await belir(c, yayilan, 350);
    await c.say('n = 1’in enerjisi daha düşüktür; aradaki fark dışarı yayılır.',
      { speak: 'Ne eşittir birin enerjisi daha düşüktür; aradaki fark dışarı yayılır.' });

    /* Sınıflandırma: dört geçiş, iki kutu. Yerleşen geçiş kutusunda bir ok olarak kalır. */
    await sil(c, soru);
    const tablo = c.S('g', {}, svg);
    const kutular = [kutu(c, tablo, 150, 70, 290, 400, { fill: 'none', renk: ENERJI, kalin: 2 }), kutu(c, tablo, 620, 70, 290, 400, { fill: 'none', renk: ENERJI, kalin: 2 })];
    yazi(c, tablo, 295, 116, 'Soğurma', { size: 28, renk: ENERJI });
    yazi(c, tablo, 765, 116, 'Yayma', { size: 28, renk: ENERJI });
    ucSeviye(c, tablo, 110, 950);
    /* Bir geçişi x konumuna çizer: başlangıç seviyesinde elektron, bitişe ok; soğurmada giren, yaymada çıkan dalga. */
    const gecisCiz = (p, x, n1, n2, renk, dalgali) => {
      const g = c.S('g', {}, p), yon = Math.sign(SEVIYE[n2] - SEVIYE[n1]);
      ok(c, g, x, SEVIYE[n1] + yon * 16, x, SEVIYE[n2] - yon * 8, renk);
      elektron(c, g, x, SEVIYE[n1], 12);
      if (dalgali) dalga(c, g, n2 > n1 ? x - 74 : x + 14, (SEVIYE[n1] + SEVIYE[n2]) / 2, n2 > n1 ? x - 14 : x + 74);
      return g;
    };
    await belir(c, tablo);
    const gecisler = [[1, 2, 235], [3, 2, 705], [2, 3, 355], [2, 1, 825]];
    for (const [n1, n2, x] of gecisler) {
      const cikis = n2 > n1 ? 0 : 1;
      const bekleyen = c.S('g', {}, svg);
      gecisCiz(bekleyen, 530, n1, n2, RENK.soluk, false);
      yazi(c, bekleyen, 530, 116, '?', { size: 36, renk: RENK.soluk });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: `<b>n = ${n1} → n = ${n2}</b> geçişi hangi kutuya girer?`, options: ['Soğurma', 'Yayma'], answer: cikis,
        hints: cikis === 0 ? ['', 'Yaymada elektron daha düşük enerji seviyesine iner; burada çıkıyor.'] : ['Soğurmada elektron daha yüksek enerji seviyesine çıkar; burada iniyor.', ''],
        right: cikis === 0 ? 'Elektron daha yüksek enerji seviyesine çıkıyor: atom enerji soğurur.' : 'Elektron daha düşük enerji seviyesine iniyor: atom enerji yayar.',
        onPick: (i, dogru) => { if (dogru) { bekleyen.remove(); belir(c, gecisCiz(tablo, x, n1, n2, ELEKTRON, true), 350); } } });
    }
    kutular.forEach((k) => k.setAttribute('stroke-width', 3));
    await belir(c, yazi(c, tablo, 530, 525, 'Bohr teorisinin temeli: enerji alışverişi', { size: 28, renk: ENERJI }), 350);
    await c.say('Bohr, teorisini atomların bu enerji alışverişi üzerine kurdu.', { speak: 'Bor, teorisini atomların bu enerji alışverişi üzerine kurdu.' });
    c.note('<b>Soğurma (absorbsiyon): enerji alır, daha yüksek enerji seviyesine çıkar.</b><br>Yayma (emisyon): enerji verir, daha düşük enerji seviyesine iner.', 'Soğurma ve yayma');
  }

  /* ---- Sahne 3 · Tek elektronda başarılı ---- */
  /* Küçük Bohr atomu: dizilim [[n, açı], …] elektronların yeri. Dönen: { atom, elektronlar }. */
  function kucukAtom(c, p, x, y, dizilim, R = [40, 80]) {
    const atom = bohrAtom(c, p, x, y, R, { cekirdek: 13 });
    return { atom, elektronlar: dizilim.map(([n, aci]) => atom.koy(n, aci, 10)) };
  }
  async function tekElektron(c) {
    const svg = c.svg();
    const sahne = c.S('g', {}, svg);
    const hidrojen = c.S('g', {}, sahne);
    const h = kucukAtom(c, hidrojen, 150, 240, [[1, -0.8]]);
    yazi(c, hidrojen, 150, 366, 'Hidrojen', { size: 28 });
    const aciklar = yazi(c, sahne, 265, 84, 'Açıklar', { size: 32, renk: IYI });
    await belir(c, sahne);
    await c.say('Bohr teorisi hidrojen atomunu açıklar.', { speak: 'Bor teorisi hidrojen atomunu açıklar.' });
    await belir(c, yazi(c, hidrojen, 150, 404, '1 elektron', { size: 26, renk: ELEKTRON }), 300);
    await dondur(c, h.atom, h.elektronlar[0], 1, -0.8, 1, 1200);
    await c.say('Hidrojenin yalnızca bir elektronu vardır.');
    const lityum = c.S('g', {}, sahne);
    const li = kucukAtom(c, lityum, 380, 240, [[1, -0.8], [1, 2.3], [2, 0.5]]);
    const liAd = yazi(c, lityum, 380, 366, 'Lityum', { size: 28 });
    const liSayi = yazi(c, lityum, 380, 404, '3 elektron', { size: 26, renk: ELEKTRON });
    await belir(c, lityum);
    await c.say('Teori, tek elektronu kalmış iyonlarda da geçerlidir.');
    await c.tween(1000, (e) => {
      tasi(li.elektronlar[1], ...li.atom.yer(1, 2.3).map((v, k) => v + (k ? 70 : -70) * e));
      tasi(li.elektronlar[2], ...li.atom.yer(2, 0.5).map((v, k) => v + (k ? 60 : 70) * e));
      li.elektronlar[1].style.opacity = 1 - e;
      li.elektronlar[2].style.opacity = 1 - e;
    });
    liAd.remove();
    usYazi(c, lityum, 380, 366, 'Li^{2+} iyonu', { size: 28 });
    liSayi.textContent = '1 elektron';
    await c.say('Üç elektronlu lityum iki elektron kaybederse tek elektronlu Li²⁺ iyonu olur.',
      { speak: 'Üç elektronlu lityum iki elektron kaybederse tek elektronlu, artı iki yüklü lityum iyonu olur.' });
    const cok = c.S('g', {}, sahne);
    c.S('line', { x1: 540, y1: 60, x2: 540, y2: 440, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '8 8' }, cok);
    yazi(c, cok, 760, 84, 'Yetersiz', { size: 32, renk: KOTU });
    kucukAtom(c, cok, 760, 240, [[1, -0.8], [1, 2.3], [2, 0.5], [2, 2.1], [2, 3.7], [2, 5.3]]);
    yazi(c, cok, 760, 366, 'İki ya da daha çok elektron', { size: 28 });
    await belir(c, cok);
    await c.say('İki ya da daha çok elektronlu atomlarda ise teori yetersiz kalır.');
    await belir(c, yazi(c, sahne, 500, 500, 'Hidrojen dışındaki bütün atomlar: birden çok elektron', { size: 28, renk: ENERJI }), 350);
    await c.say('Oysa hidrojen dışındaki bütün atomlarda birden çok elektron vardır.',
      { speak: '[thoughtful] Oysa hidrojen dışındaki bütün atomlarda birden çok elektron vardır.' });

    await sil(c, sahne);
    const soru = c.S('g', {}, svg);
    kucukAtom(c, soru, 270, 220, [[1, -0.8], [1, 2.3]], [52, 100]);
    yazi(c, soru, 270, 372, 'Helyum atomu', { size: 28 });
    yazi(c, soru, 270, 410, '2 elektron', { size: 26, renk: ELEKTRON });
    kucukAtom(c, soru, 730, 220, [[1, -0.8]], [52, 100]);
    usYazi(c, soru, 730, 372, 'Helyum iyonu (He^{+})', { size: 28 });
    yazi(c, soru, 730, 410, '1 elektron', { size: 26, renk: ELEKTRON });
    await belir(c, soru);
    await c.choice({ tag: 'Uygula', q: 'Helyum atomunun 2 elektronu vardır. Bohr teorisi hangisini açıklayabilir?',
      options: ['Nötr helyum atomu', 'Bir elektronunu kaybetmiş helyum iyonu (He⁺)', 'İkisini de'], answer: 1,
      hints: ['Nötr helyum atomunda iki elektron vardır; teori iki ya da daha çok elektronda yetersiz kalır.', '', 'Teori ikisinden yalnızca tek elektronlu olanı açıklar.'],
      right: 'He⁺ iyonu. Bir elektron kaybedince geriye tek elektron kalır.' });
    const karar = c.S('g', {}, soru);
    yazi(c, karar, 270, 462, 'Yetersiz', { size: 30, renk: KOTU });
    yazi(c, karar, 730, 462, 'Açıklar', { size: 30, renk: IYI });
    await belir(c, karar, 350);
    await c.say('He⁺ iyonunda tek elektron kalır; teori yalnızca böyle sistemlerde geçerlidir.',
      { speak: 'Artı bir yüklü helyum iyonunda tek elektron kalır; teori yalnızca böyle sistemlerde geçerlidir.' });
    await belir(c, yazi(c, soru, 500, 528, 'Birinci eksik: yalnızca tek elektronlu sistemler', { size: 28, renk: ENERJI }), 350);
    await c.say('Bu, Bohr teorisinin ilk eksiğidir.', { speak: 'Bu, Bor teorisinin ilk eksiğidir.' });
  }

  /* ---- Sahne 4 · Yeri ve hızı birlikte bilinmez ---- */
  async function belirsizlik(c) {
    const svg = c.svg();
    const AX = 280, AY = 300, R = 150;
    const sahne = c.S('g', {}, svg);
    const baslik = yazi(c, sahne, 500, 58, 'İkinci eksik: yörünge fikri', { size: 32, renk: ENERJI });
    const atom = bohrAtom(c, sahne, AX, AY, [R]);
    const e = atom.koy(1, -2.4, 13);
    const sag = c.S('g', {}, sahne);
    const sagYaz = (satirlar, o = {}) => {
      sag.replaceChildren();
      satirlar.forEach((s, i) => yazi(c, sag, 740, (o.y || 250) + i * (o.aralik || 50), s, { size: o.size || 30, renk: Array.isArray(o.renk) ? o.renk[i] : o.renk }));
      return belir(c, sag, 350);
    };
    sagYaz(['Bohr teorisi:', 'kesin bir yörünge'], { y: 280 });
    await belir(c, sahne);
    await c.say('İkinci eksik, yörünge fikrinin kendisiyle ilgilidir.');
    sagYaz(['Kesin yörünge:', 'Yer: her an belli', 'Hız: her an belli'], { y: 230, renk: [RENK.soluk, 'var(--text)', 'var(--text)'] });
    const hiz = c.S('g', {}, sahne);
    await dondur(c, atom, e, 1, -2.4, 1.25, 2600);
    const [ex, ey] = atom.yer(1, -2.4 + 0.25 * TAU);
    ok(c, hiz, ex + 14, ey + 12, ex + 62, ey + 54, ELEKTRON);
    await belir(c, hiz, 300);
    await c.say('Kesin bir yörünge, elektronun yerinin ve hızının her an bilindiğini varsayar.');
    await sagYaz(['Elektron çok küçük', 'Bilgi: dolaylı ölçümle'], { y: 270 });
    await c.say('Elektron çok küçüktür; hakkında ancak dolaylı ölçümlerle bilgi edinilir.');
    await sagYaz(['Heisenberg', 'Ölçümlerle ilgili bir ilke'], { y: 270, renk: [MOR, 'var(--text)'] });
    await c.say('Heisenberg, bu ölçümlerle ilgili bir ilke ortaya koydu.', { speak: 'Haysenbörg, bu ölçümlerle ilgili bir ilke ortaya koydu.' });
    hiz.remove();
    const bulanik = c.S('circle', { cx: ex, cy: ey, r: 34, fill: ELEKTRON, 'fill-opacity': 0.22 }, sahne);
    sagYaz(['Yer?   Hız?', 'Aynı anda kesin', 'belirlenemez'], { y: 240, renk: [ENERJI, 'var(--text)', 'var(--text)'] });
    await belir(c, bulanik, 350);
    await c.say('Elektronun yeri ve hızı aynı anda kesin olarak belirlenemez.',
      { speak: 'Elektronun yeri ve hızı [short pause] aynı anda kesin olarak belirlenemez.' });
    baslik.textContent = 'Heisenberg belirsizlik ilkesi';
    baslik.style.fill = MOR;
    await belir(c, baslik, 350);
    await c.say('Buna Heisenberg belirsizlik ilkesi denir.', { speak: 'Buna Haysenbörg belirsizlik ilkesi denir.' });
    await c.choice({ tag: 'Uygula', q: 'Belirsizlik ilkesi, Bohr teorisinin hangi varsayımıyla çelişir?',
      options: ['Çekirdekten uzaklaştıkça enerji artar.', 'Atom enerji soğurabilir ve yayabilir.', 'Elektron belirli bir dairesel yörüngede hareket eder.'], answer: 2,
      hints: ['İlke enerjiyle değil, elektronun yeri ve hızıyla ilgilidir.', 'İlke enerji alışverişiyle değil, elektronun yeri ve hızıyla ilgilidir.', ''],
      right: 'Kesin bir yörünge, yerin ve hızın her an bilindiğini varsayar.' });
    atom.yorungeler[0].setAttribute('stroke-dasharray', '10 12');
    sagYaz(['Kesin bir yol', 'çizilemez'], { y: 270, renk: ENERJI });
    await c.tween(600, (k) => { atom.yorungeler[0].style.opacity = 1 - 0.5 * k; });
    await c.say('Yeri ve hızı birlikte bilinemeyen elektrona kesin bir yol çizilemez.',
      { speak: '[thoughtful] Yeri ve hızı birlikte bilinemeyen elektrona kesin bir yol çizilemez.' });
    sagYaz(['Elektron belirli bir', 'yörüngede hareket etmez'], { y: 270 });
    await c.tween(600, (k) => { atom.yorungeler[0].style.opacity = 0.5 - 0.32 * k; bulanik.setAttribute('r', 34 + 26 * k); });
    await c.say('Demek ki elektron, tam olarak belirli bir yörüngede hareket etmez.');

    await sil(c, sahne);
    const ikili = c.S('g', {}, svg);
    yazi(c, ikili, 500, 80, 'Elektron: hem tanecik hem dalga', { size: 32, renk: ELEKTRON });
    elektron(c, ikili, 270, 250, 26);
    yazi(c, ikili, 270, 360, 'tanecik', { size: 30 });
    let d = 'M 590 250';
    for (let k = 0; k < 6; k++) d += ` q 25 ${k % 2 ? 60 : -60} 50 0`;
    c.S('path', { d, fill: 'none', stroke: ELEKTRON, 'stroke-width': 5, 'stroke-linecap': 'round' }, ikili);
    yazi(c, ikili, 740, 360, 'dalga', { size: 30 });
    await belir(c, ikili);
    await c.say('Sonradan elektronun hem tanecik hem dalga özelliği gösterdiği anlaşıldı.');
    await belir(c, yazi(c, ikili, 500, 470, 'Üçüncü eksik: Bohr teorisi bunu açıklayamadı', { size: 28, renk: ENERJI }), 350);
    await c.say('Bohr teorisi bunu da açıklayamadı; bu üçüncü eksiktir.', { speak: 'Bor teorisi bunu da açıklayamadı; bu üçüncü eksiktir.' });

    await sil(c, ikili);
    const liste = c.S('g', {}, svg);
    kutu(c, liste, 170, 50, 660, 330, { renk: MOR });
    yazi(c, liste, 500, 108, 'Bohr teorisinin eksikleri', { size: 32, renk: MOR });
    ['1. Çok elektronlu atomlar', '2. Yer ve hız', '3. Tanecik ve dalga'].forEach((s, i) => yazi(c, liste, 250, 180 + i * 62, s, { size: 30, hiza: 'start' }));
    ok(c, liste, 500, 394, 500, 440, ENERJI);
    yazi(c, liste, 500, 496, 'Yeni bir atom modeli gerekli', { size: 32, renk: ENERJI });
    await belir(c, liste);
    await c.say('Bu eksikler yeni bir atom modelini gerekli kıldı.');
    c.note('<b>Elektronun yeri ve hızı aynı anda kesin belirlenemez.</b><br>Heisenberg belirsizlik ilkesi', 'Belirsizlik ilkesi');
  }

  /* ---- Sahne 5 · Orbital: olasılık bölgesi ---- */
  async function orbital(c) {
    const svg = c.svg();
    const AX = 500, AY = 275, YORUNGE = 115, BULUT = 190, SINIR = 168;
    const baslik = yazi(c, svg, 500, 52, 'Bohr atom teorisi', { size: 30, renk: RENK.soluk });
    const atom = bohrAtom(c, svg, AX, AY, [YORUNGE]);
    const e = atom.koy(1, -0.9, 12);
    const alt = yazi(c, svg, 500, 528, '', { size: 28 });
    const altYaz = (metin, renk) => { alt.textContent = metin; alt.style.fill = renk || 'var(--text)'; return belir(c, alt, 350); };
    await belir(c, svg);
    await c.wait(700);
    baslik.textContent = 'Modern atom teorisi';
    baslik.style.fill = MOR;
    await Promise.all([belir(c, baslik, 500), c.tween(500, (k) => { atom.yorungeler[0].style.opacity = 1 - 0.4 * k; })]);
    await c.say('Bohr teorisinin yerini modern atom teorisi aldı.', { speak: 'Bor teorisinin yerini modern atom teorisi aldı.' });
    atom.yorungeler[0].setAttribute('stroke-dasharray', '10 12');
    altYaz('Belirli bir yörünge yok');
    await c.tween(600, (k) => { atom.yorungeler[0].style.opacity = 0.6 - 0.4 * k; });
    await c.say('Bu teoriye göre elektron belirli bir yörüngede dolanmaz.');
    /* Elektron sırayla farklı yerlerde belirir; uğradığı her yer soluk bir iz bırakır. */
    const izler = c.S('g', {}, svg);
    const yerler = [[0.4, 60], [2.2, 130], [3.6, 40], [5.1, 150], [1.2, 95], [4.3, 110], [2.9, 170], [0.1, 120], [5.7, 70]];
    const gez = async (bas, son) => {
      for (const [aci, rr] of yerler.slice(bas, son)) {
        const x = AX + Math.cos(aci) * rr, y = AY + Math.sin(aci) * rr;
        c.S('circle', { cx: x, cy: y, r: 4, fill: ELEKTRON, opacity: 0.6 }, izler);
        tasi(e, x, y);
        await c.wait(430);
      }
    };
    altYaz('Çekirdeğin çevresinde herhangi bir yerde');
    await Promise.all([gez(0, 5), c.say('Çekirdeğin çevresinde herhangi bir yerde bulunabilir.')]);
    altYaz('Tam yeri: kesin olarak söylenemez');
    await Promise.all([gez(5, 9), c.say('Belirli bir anda tam nerede olduğu kesin olarak söylenemez.')]);
    e.remove();
    atom.yorungeler[0].remove();
    const b = bulut(c, svg, AX, AY, BULUT, 150);
    svg.insertBefore(b.g, atom.g);
    const sinir = c.S('circle', { cx: AX, cy: AY, r: SINIR, fill: ELEKTRON, 'fill-opacity': 0.07, stroke: ENERJI, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, svg);
    svg.insertBefore(sinir, b.g);
    sinir.style.opacity = 0;
    altYaz('Bulunma olasılığı yüksek bölge', ENERJI);
    await Promise.all([belir(c, b.g, 700), sil(c, izler, 500)]);
    await belir(c, sinir, 500);
    await c.say('Ama bulunma olasılığının yüksek olduğu bölgeler belirlenebilir.');
    const orbitalAdi = c.S('g', {}, svg);
    c.S('line', { x1: 628, y1: 166, x2: 716, y2: 122, stroke: ENERJI, 'stroke-width': 2 }, orbitalAdi);
    yazi(c, orbitalAdi, 790, 122, 'Orbital', { size: 34, renk: ENERJI });
    await belir(c, orbitalAdi, 350);
    await c.say('Bu bölgelere orbital denir.', { speak: 'Bu bölgelere [short pause] orbital denir.' });
    /* Sol üstte, çekirdekten orta uzaklıkta bir nokta seçilir. */
    const secili = b.noktalar.filter((n) => n.x < AX - 40 && n.y < AY - 20 && n.rr > 80).sort((p, q) => p.rr - q.rr)[0] || b.noktalar[0];
    const tekNokta = c.S('g', {}, svg);
    c.S('circle', { cx: secili.x, cy: secili.y, r: 12, fill: 'none', stroke: 'var(--text)', 'stroke-width': 3 }, tekNokta);
    c.S('line', { x1: secili.x - 10, y1: secili.y - 8, x2: 268, y2: 132, stroke: 'var(--text)', 'stroke-width': 2 }, tekNokta);
    yazi(c, tekNokta, 190, 122, 'olası bir yer', { size: 28 });
    altYaz('Her nokta: elektronun olası bir yeri');
    await belir(c, tekNokta, 350);
    await c.say('Çizimdeki her nokta, elektronun bulunabileceği olası bir yeri gösterir.');
    tekNokta.remove();
    const siklik = c.S('g', {}, svg);
    c.S('line', { x1: AX - 30, y1: AY + 26, x2: 250, y2: 400, stroke: 'var(--text)', 'stroke-width': 2 }, siklik);
    yazi(c, siklik, 150, 436, 'sık: olasılık yüksek', { size: 26 });
    c.S('line', { x1: AX + 150, y1: AY + 60, x2: 760, y2: 400, stroke: 'var(--text)', 'stroke-width': 2 }, siklik);
    yazi(c, siklik, 850, 436, 'seyrek: olasılık düşük', { size: 26 });
    altYaz('');
    await belir(c, siklik, 350);
    await c.say('Noktaların sık olduğu yerde elektronun bulunma olasılığı daha yüksektir.');

    siklik.remove();
    /* Öğrencinin çizgisi: birkaç noktayı sırayla birleştirir. */
    const ugrak = [...b.noktalar].filter((n) => n.rr > 45).sort((p, q) => Math.atan2(p.y - AY, p.x - AX) - Math.atan2(q.y - AY, q.x - AX)).filter((n, k) => k % 14 === 0);
    const yol = c.S('g', {}, svg);
    c.S('path', { d: 'M ' + ugrak.map((n) => `${n.x} ${n.y}`).join(' L '), fill: 'none', stroke: KOTU, 'stroke-width': 3, 'stroke-linejoin': 'round' }, yol);
    yazi(c, yol, 170, 122, '“Elektronun yolu bu.”', { size: 28, renk: KOTU });
    await belir(c, yol, 400);
    await c.choice({ tag: 'Uygula', q: 'Bir öğrenci noktaları bir çizgiyle birleştirip “Elektronun yolu bu.” diyor. Haklı mı?',
      options: ['Evet; elektron noktalara sırayla uğrar.', 'Hayır; noktalar olası yerlerdir, bir yol değildir.', 'Hayır; çünkü her nokta ayrı bir elektrondur.'], answer: 1,
      hints: ['Elektronun belirli bir anda tam nerede olduğu söylenemez; sıra da bilinemez.', '', 'Noktaların hepsi aynı elektronun bulunabileceği olası yerlerdir.'],
      right: 'Noktalar olası yerleri gösterir; aralarında bir sıra yoktur.' });
    altYaz('Noktalar sıraya konamaz');
    await sil(c, yol, 600);
    await c.say('Elektronun tam yeri bilinmediği için noktalar sıraya konamaz.',
      { speak: '[thoughtful] Elektronun tam yeri bilinmediği için noktalar sıraya konamaz.' });
    altYaz('Yol değil, bölge', ENERJI);
    alt.setAttribute('font-size', 34);
    await c.tween(900, (k) => { sinir.setAttribute('stroke-width', 3 + 4 * Math.sin(k * Math.PI)); });
    await c.say('Elektronun yolu çizilmez; bulunabileceği bölge çizilir.',
      { speak: 'Elektronun yolu çizilmez; [short pause] bulunabileceği bölge çizilir.' });
    c.note('<b>Orbital: elektronun bulunma olasılığının yüksek olduğu bölge.</b><br>Yol değil, bölge.', 'Orbital');
  }

  /* ---- Sahne 6 · Ne kaldı, ne değişti? ---- */
  async function karsilastir(c) {
    const svg = c.svg();
    const BX = 440, MX = 790, SY = [270, 350, 430];
    const tablo = c.S('g', {}, svg);
    bohrSema(c, tablo, BX, 92, 62);
    yazi(c, tablo, BX, 196, 'Bohr', { size: 30, renk: MOR });
    modernSema(c, tablo, MX, 92, 62);
    yazi(c, tablo, MX, 196, 'Modern', { size: 30, renk: MOR });
    c.S('line', { x1: 50, y1: 222, x2: 950, y2: 222, stroke: RENK.cizgi, 'stroke-width': 2 }, tablo);
    /* Bir satır: solda başlık, iki sütunda değer. */
    const satir = (i, ad, bohr, modern, renk) => {
      const g = c.S('g', {}, tablo);
      yazi(c, g, 60, SY[i], ad, { size: 28, hiza: 'start', renk: RENK.soluk });
      g.bohr = yazi(c, g, BX, SY[i], bohr, { size: 30, renk });
      g.modern = yazi(c, g, MX, SY[i], modern, { size: 30, renk });
      return g;
    };
    await belir(c, tablo);
    await c.say('Modern teori, Bohr teorisinin her fikrini bırakmadı.', { speak: 'Modern teori, Bor teorisinin her fikrini bırakmadı.' });
    await belir(c, satir(0, 'Çekirdek', 'merkezde', 'merkezde', IYI));
    await c.say('İki teoride de çekirdek atomun merkezindedir.');
    const enerji = satir(1, 'Enerji seviyeleri', 'var', 'var', IYI);
    await belir(c, enerji);
    await c.say('İki teoride de enerji seviyeleri vardır.');
    enerji.modern.textContent = 'var: orbitaller burada';
    await belir(c, enerji.modern, 350);
    await c.say('Orbitaller de belirli enerji seviyelerinde yer alır.');
    enerji.modern.textContent = 'var';
    const yer = satir(2, 'Elektronun yeri', '?', '?', ENERJI);
    await belir(c, yer);
    await c.say('Değişen, elektronun yerinin nasıl anlatıldığıdır.');
    yer.bohr.textContent = 'kesin bir yörünge';
    yer.modern.textContent = 'bir orbital';
    await Promise.all([belir(c, yer.bohr, 350), belir(c, yer.modern, 350)]);
    await c.say('Bohr’da elektron kesin bir yörüngededir; modern teoride bir orbitalde.',
      { speak: 'Bor’da elektron kesin bir yörüngededir; modern teoride bir orbitalde.' });

    /* Sınıflandırma: beş ifade, üç kutu. Yerleşen ifade kısa adıyla kutusuna yazılır. */
    await sil(c, tablo);
    const KUTULAR = ['Yalnız Bohr', 'Yalnız modern', 'İkisi de'], KX = [30, 350, 670];
    const kutular = c.S('g', {}, svg), icerik = KUTULAR.map(() => 0);
    const cerceveler = KUTULAR.map((ad, k) => {
      const r = kutu(c, kutular, KX[k], 150, 300, 300);
      yazi(c, kutular, KX[k] + 150, 198, ad, { size: 28, renk: MOR });
      return r;
    });
    const koy = (k, kisa) => belir(c, yazi(c, kutular, KX[k] + 150, 262 + icerik[k]++ * 50, kisa, { size: 26 }), 350);
    await belir(c, kutular);
    const ifadeler = [
      { tam: 'Çekirdek merkezdedir.', kisa: 'Çekirdek merkezde', kutu: 2, dogru: 'İki teoride de çekirdek atomun merkezindedir.',
        ipucu: ['Modern teoride de çekirdek atomun merkezindedir.', 'Bohr teorisinde de çekirdek atomun merkezindedir.', ''] },
      { tam: 'Elektron dairesel yörüngede hareket eder.', kisa: 'Dairesel yörünge', kutu: 0, dogru: 'Dairesel yörünge yalnızca Bohr teorisindedir.',
        ipucu: ['', 'Modern teoriye göre elektron belirli bir yörüngede dolanmaz.', 'Modern teoriye göre elektron belirli bir yörüngede dolanmaz.'] },
      { tam: 'Orbital kavramı kullanılır.', kisa: 'Orbital kavramı', kutu: 1, dogru: 'Orbital, modern atom teorisinin kavramıdır.',
        ipucu: ['Bohr teorisinde elektronun yeri bir yörüngeyle anlatılır.', '', 'Bohr teorisinde elektronun yeri bir yörüngeyle anlatılır.'] },
      { tam: 'Enerji seviyeleri vardır.', kisa: 'Enerji seviyeleri', kutu: 2, dogru: 'İki teoride de enerji seviyeleri vardır.',
        ipucu: ['Modern teoride orbitaller de enerji seviyelerinde yer alır.', 'Bohr teorisinde yörüngelere enerji seviyesi de denir.', ''] },
      { tam: 'Elektronun yeri ve hızı aynı anda kesin belirlenemez.', kisa: 'Yer ve hız belirsiz', kutu: 1, dogru: 'Belirsizlik ilkesi, kesin yörünge fikriyle çelişir.',
        ipucu: ['Kesin bir yörünge, yerin ve hızın her an bilindiğini varsayar.', '', 'Kesin bir yörünge, yerin ve hızın her an bilindiğini varsayar.'] },
    ];
    for (const f of ifadeler) {
      const bekleyen = yazi(c, svg, 500, 90, f.kisa + '  →  ?', { size: 30, renk: ENERJI });
      await belir(c, bekleyen, 300);
      await c.choice({ tag: 'Sıra sende', q: `<b>“${f.tam}”</b> Bu ifade hangi kutuya girer?`, options: KUTULAR, answer: f.kutu, hints: f.ipucu, right: f.dogru,
        onPick: (i, dogru) => { if (dogru) { bekleyen.remove(); koy(f.kutu, f.kisa); } } });
    }
    cerceveler[2].setAttribute('stroke', IYI);
    cerceveler[0].setAttribute('stroke', ENERJI);
    const sonuc = c.S('g', {}, svg);
    yazi(c, sonuc, KX[2] + 150, 500, 'korundu', { size: 30, renk: IYI });
    yazi(c, sonuc, KX[0] + 150, 500, 'değişti', { size: 30, renk: ENERJI });
    await belir(c, sonuc, 350);
    await c.say('Yeni model, eskisinin işe yarayan fikirlerini korudu; yetmeyeni değiştirdi.');
    c.note('<b>Ortak: çekirdek ve enerji seviyeleri. Fark: elektronun yeri.</b><br>Yörünge (kesin yol) → orbital (olasılık bölgesi)', 'Bohr ve modern');
  }

  /* ---- Sahne 7 · Araştırma sürüyor ---- */
  async function arastirma(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    modernSema(c, giris, 500, 240, 130);
    yazi(c, giris, 500, 450, 'Atomun içi: araştırma sürüyor', { size: 30, renk: ENERJI });
    await belir(c, giris);
    await c.say('Atomun içini araştırmak bugün de sürüyor.');

    await sil(c, giris);
    const HX = 330, HY = 285, HR = 180, DEMET = ['var(--c6)', 'var(--c3)'];
    const hizlandirici = c.S('g', {}, svg);
    [HR - 10, HR + 10].forEach((r) => c.S('circle', { cx: HX, cy: HY, r, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, hizlandirici));
    yazi(c, hizlandirici, HX - 16, HY - 8, 'Parçacık', { size: 28 });
    yazi(c, hizlandirici, HX - 16, HY + 28, 'hızlandırıcısı', { size: 28 });
    await belir(c, hizlandirici);
    await c.say('Bunun için parçacık hızlandırıcıları kullanılır.');
    /* İki demet karşılıklı yönde hızlanarak döner ve sağdaki noktada karşılaşır. */
    const parcaciklar = DEMET.map((renk) => c.S('circle', { cx: HX - HR, cy: HY, r: 10, fill: renk }, hizlandirici));
    const yonler = c.S('g', {}, hizlandirici);
    ok(c, yonler, HX - 40, HY - HR - 30, HX + 40, HY - HR - 30, DEMET[0], 3);
    ok(c, yonler, HX + 40, HY + HR + 30, HX - 40, HY + HR + 30, DEMET[0], 3);
    ok(c, yonler, HX + 40, HY - HR + 34, HX - 40, HY - HR + 34, DEMET[1], 3);
    ok(c, yonler, HX - 40, HY + HR - 34, HX + 40, HY + HR - 34, DEMET[1], 3);
    const carpisma = c.S('g', { opacity: 0 }, svg);
    for (let k = 0; k < 8; k++) {
      const a = k * TAU / 8 + 0.2;
      c.S('line', { x1: HX + HR + Math.cos(a) * 16, y1: HY + Math.sin(a) * 16, x2: HX + HR + Math.cos(a) * 36, y2: HY + Math.sin(a) * 36, stroke: ENERJI, 'stroke-width': 4, 'stroke-linecap': 'round' }, carpisma);
    }
    yazi(c, carpisma, 760, HY + 10, 'Çarpışma', { size: 30, renk: ENERJI });
    const donus = c.tween(3600, (e) => {
      parcaciklar.forEach((p, k) => {
        const a = Math.PI + (k ? -1 : 1) * 5 * Math.PI * e;
        p.setAttribute('cx', HX + Math.cos(a) * HR);
        p.setAttribute('cy', HY + Math.sin(a) * HR);
      });
    }, Ders.ease.in).then(() => belir(c, carpisma, 250));
    await Promise.all([donus, c.say('Hızlandırıcıda parçacıklar çok yüksek hızlara çıkarılıp birbiriyle çarpıştırılır.')]);
    carpisma.lastChild.remove();
    const dedektor = c.S('g', {}, svg);
    kutu(c, dedektor, HX + HR - 70, HY - 130, 260, 260, { fill: 'none', renk: ENERJI });
    [[-0.5, 150], [0.35, 190], [-1.1, 120], [1.0, 130], [0.0, 110]].forEach(([a, boy], k) => {
      const x = HX + HR + Math.cos(a) * boy, y = HY + Math.sin(a) * boy;
      c.S('line', { x1: HX + HR + Math.cos(a) * 40, y1: HY + Math.sin(a) * 40, x2: x, y2: y, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dedektor);
      c.S('circle', { cx: x, cy: y, r: 7, fill: ['var(--c4)', 'var(--c6)', 'var(--c3)', 'var(--c1)', 'var(--c2)'][k] }, dedektor);
    });
    yazi(c, dedektor, 790, 126, 'Dedektör (algılayıcı)', { size: 28, renk: ENERJI });
    yazi(c, dedektor, 850, 295, 'Yeni parçacıklar', { size: 28 });
    await belir(c, dedektor);
    await c.say('Çarpışmada ortaya çıkan yeni parçacıklar dedektör denen algılayıcılarla incelenir.');

    await Promise.all([sil(c, hizlandirici), sil(c, carpisma), sil(c, dedektor)]);
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 110, 50, 780, 440, { renk: MOR });
    yazi(c, kart, 500, 122, 'TENMAK', { size: 46, renk: MOR });
    yazi(c, kart, 500, 182, 'Türkiye Enerji, Nükleer ve Maden', { size: 28 });
    yazi(c, kart, 500, 220, 'Araştırma Kurumu', { size: 28 });
    await belir(c, kart);
    await c.say('Türkiye Enerji, Nükleer ve Maden Araştırma Kurumunun kısa adı TENMAK’tır.',
      { speak: 'Türkiye Enerji, Nükleer ve Maden Araştırma Kurumunun kısa adı Tenmak’tır.' });
    const alanlar = c.S('g', {}, kart);
    c.S('line', { x1: 160, y1: 256, x2: 840, y2: 256, stroke: RENK.cizgi, 'stroke-width': 2 }, alanlar);
    const alanYazi = [['Enerji', 310, 312], ['Maden', 690, 312], ['Parçacık hızlandırıcıları', 310, 372], ['Nükleer teknoloji', 690, 372]]
      .map(([ad, x, y]) => yazi(c, alanlar, x, y, ad, { size: 28, renk: RENK.soluk }));
    await belir(c, alanlar);
    await c.say('TENMAK; enerji, maden, parçacık hızlandırıcıları ve nükleer teknoloji alanlarında çalışır.',
      { speak: 'Tenmak; enerji, maden, parçacık hızlandırıcıları ve nükleer teknoloji alanlarında çalışır.' });
    alanYazi[2].style.fill = ENERJI;
    await belir(c, yazi(c, kart, 500, 446, 'Atom ve atom altı düzeyde projeler', { size: 28, renk: ENERJI }), 350);
    await c.say('Hızlandırıcı teknolojileriyle atom ve atom altı düzeyde projeler yürütür.');
    await c.choice({ tag: 'Uygula', q: 'Hızlandırıcılarda bugünkü modelle açıklanamayan yeni bir veri bulunursa ne beklenir?',
      options: ['Model yeni veriye göre geliştirilir.', 'Model değişmez; son hâlini almıştır.', 'Atomların yapısı değişir.'], answer: 0,
      hints: ['', 'Bohr modeli de eksikleri görülünce değişti; hiçbir model son söz değildir.', 'Değişen atom değil, atomu anlatan modeldir.'],
      right: 'Yeni veri gelince model geliştirilir; atom aynı kalır.' });

    await sil(c, kart);
    const zincir = c.S('g', {}, svg);
    bohrSema(c, zincir, 190, 230, 95);
    yazi(c, zincir, 190, 372, 'Bohr modeli', { size: 28, renk: MOR });
    ok(c, zincir, 310, 230, 380, 230, ENERJI);
    modernSema(c, zincir, 500, 230, 95);
    yazi(c, zincir, 500, 372, 'Bugünkü model', { size: 28, renk: MOR });
    ok(c, zincir, 620, 230, 690, 230, ENERJI);
    c.S('circle', { cx: 810, cy: 230, r: 95, fill: 'none', stroke: ENERJI, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, zincir);
    yazi(c, zincir, 810, 250, '?', { size: 64, renk: ENERJI });
    yazi(c, zincir, 810, 372, 'Yeni veriyle', { size: 28, renk: ENERJI });
    await belir(c, zincir);
    await c.say('Bohr modeli nasıl değiştiyse bugünkü model de yeni veriyle gelişebilir.',
      { speak: 'Bor modeli nasıl değiştiyse bugünkü model de yeni veriyle gelişebilir.' });
    await belir(c, yazi(c, zincir, 500, 480, 'Projeler: bilimde ve teknolojide gelişmeye katkı', { size: 30 }), 350);
    await c.say('Bu projeler ülkemizin bilimde ve teknolojide gelişmesine katkı sağlar.');
  }

  Ders.start({
    id: 'etkilesim-c2', kicker: 'Konu C · Atom teorileri', title: 'Yörüngeden orbitale', accent: MOR, back: 'index.html',
    intro: { title: 'Yörüngeden orbitale', hook: 'Elektron için kesin bir yol çizebilir miyiz?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Bohr’un atomu', goal: 'Yörüngeyi ve enerji seviyesini ilişkilendir.', run: bohrunAtomu },
      { title: 'Soğurma ve yayma', goal: 'Geçişleri soğurma ve yayma diye ayır.', run: sogurmaYayma },
      { title: 'Tek elektronda başarılı', goal: 'Bohr teorisinin geçerli olduğu sistemleri belirle.', run: tekElektron },
      { title: 'Yeri ve hızı birlikte bilinmez', goal: 'Belirsizlik ilkesini yörünge fikriyle karşılaştır.', run: belirsizlik },
      { title: 'Orbital: olasılık bölgesi', goal: 'Orbitali yörüngeden ayır.', run: orbital },
      { title: 'Ne kaldı, ne değişti?', goal: 'Bohr ve modern teoriyi karşılaştır.', run: karsilastir },
      { title: 'Araştırma sürüyor', goal: 'Hızlandırıcıların ne işe yaradığını açıkla.', run: arastirma },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir orbital çiziminde noktalar bir bölgede çok sık, başka bir bölgede seyrektir. Bu ne anlama gelir?',
        options: ['Elektron sık bölgede durur, oradan hiç ayrılmaz.', 'Sık bölgede elektronun bulunma olasılığı daha yüksektir.', 'Sık bölgede daha çok elektron vardır.'], answer: 1,
        why: ['Noktalar olası yerlerdir; elektronun kesin yerini göstermez.', 'Her nokta olası bir yerdir; nokta sıklığı olasılığı gösterir.', 'Noktalar elektron sayısını değil, tek elektronun olası yerlerini gösterir.'], scene: 4 },
      { q: 'Temel hâldeki bir atom enerji alıyor ve elektronu daha yüksek enerji seviyesine çıkıyor. Hangisi doğrudur?',
        options: ['Olay yaymadır; atom uyarılmış hâle geçer.', 'Olay soğurmadır; atom temel hâlde kalır.', 'Olay soğurmadır; atom uyarılmış hâle geçer.'], answer: 2,
        why: ['Yaymada atom enerji verir; burada enerji alıyor.', 'Elektronu daha yüksek enerji seviyesine çıkan atom artık temel hâlde değildir.', 'Enerji alıp daha yüksek enerji seviyesine çıkış soğurmadır; atom uyarılmış olur.'], scene: 1 },
      { q: 'Kerem: “Orbital, yörüngenin yeni adıdır; ikisi de elektronun izlediği yoldur.” Kerem’e hangi karşılık verilmeli?',
        options: ['Haksız; orbital de bir yoldur ama yörüngeden daha kısadır.', 'Haksız; yörünge kesin bir yol, orbital bir olasılık bölgesidir.', 'Haklı; orbital yalnızca yörüngenin yeni adıdır, anlamı aynıdır.'], answer: 1,
        why: ['Orbital bir yol değildir; elektronun yolu çizilemez, yalnızca bulunabileceği bölge çizilir.', 'Evet. Yörünge kesin bir yoldur; orbital ise elektronun bulunma olasılığının yüksek olduğu bölgedir.', 'İkisi aynı şey değildir: yörünge kesin bir yol, orbital bir olasılık bölgesidir.'], scene: 4 },
      { q: 'Bir hidrojen atomunun tek elektronu n = 2 enerji seviyesinde bulunuyor. Atom hangi hâldedir?',
        options: ['Uyarılmış hâlde; elektron en düşük enerjili yörüngede değildir.', 'Uyarılmış hâlde; çünkü hidrojen tek elektronlu bir atomdur.', 'Temel hâlde; n = 2 çekirdeğe en yakın yörüngedir.'], answer: 0,
        why: ['Evet. En düşük enerjili yörünge n = 1’dir; elektron n = 2’de olduğu için atom uyarılmıştır.', 'Elektron sayısı hâli belirlemez; elektronun hangi yörüngede olduğu belirler.', 'Çekirdeğe en yakın yörünge n = 1’dir; elektron daha uzak yörüngede olduğu için atom temel hâlde değildir.'], scene: 1 },
    ], summary: ['<b>Elektronun yolu çizilmez; bulunabileceği bölge çizilir.</b>', 'Çekirdek ve enerji seviyeleri kaldı; kesin yörüngenin yerini orbital aldı.'],
    nextLesson: { href: 'c3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
