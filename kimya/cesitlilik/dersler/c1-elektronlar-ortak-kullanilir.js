/* C1 — İki ametal yaklaşınca: elektronlar ortak kullanılır
   İki ametal atomu elektron alıp vermez; yeterince yaklaşınca valans elektronlarını ortaklaşa kullanır. Çekirdekler ile ortak
   kullanılan elektronlar arasındaki güçlü etkileşim kovalent bağdır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/C-kovalent-bag.md ("C1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Önerme ve kart sınıflandırmaları kart başına seçimle kurulur (sürükleme yok). Kuvvet oku bu derste çizilmez (C2). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, yuk, isaret, etkilesim, sinifla } = window.KIT;
  const { ASAMA, atomYalin, iki, kart, rozet, bosKutu } = window.KIT_C;
  const { lerp, ease } = Ders;
  const KOYU = '#10162b';

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // İyonik bağ: Na+ ve Cl−.
    const iy = c.S('g', {}, svg);
    c.S('circle', { cx: 340, cy: 240, r: 62, fill: RENK.arti, 'fill-opacity': 0.92 }, iy);
    yazi(c, iy, 340, 252, 'Na^{+}', { size: 34, kalin: 700, renk: KOYU, math: true });
    c.S('circle', { cx: 660, cy: 240, r: 62, fill: RENK.eksi }, iy);
    yazi(c, iy, 660, 252, 'Cl^{−}', { size: 34, kalin: 700, renk: KOYU, math: true });
    const cek = etkilesim(c, svg, [340, 240], [660, 240], 'cekme', { b: 70, boy: 70 });
    // Bağ yapmış iki atom, sonra bastırılmış hâli.
    const a = iki(c, svg, { cx: 500, cy: 240, olcek: 1.4, d: 190, s: 0, tohum: 9 });
    const itme = etkilesim(c, svg, [451, 240], [549, 240], 'itme', { b: 22, boy: 60 });
    gizle(iy, cek, a.g, itme);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, iy, 500));
    await c.choice({
      tag: 'Hatırla', q: 'İyonik bağ hangi tanecikler arasındaki çekimdir?',
      options: ['Katyon ile anyon', 'İki ametal atomu', 'Artı iyonlar ile elektron denizi'], answer: 0,
      hints: ['', 'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.', 'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.'],
      right: 'Evet. İyonik bağ, katyon ile anyonun elektrostatik çekimidir.',
    });
    await par(belir(c, cek, 450), c.say('Katyon ile anyon birbirini çeker.'));
    await c.wait(500);
    c.clearSay();
    await belir(c, [iy, cek], 400, 0);
    a.canlan();
    await belir(c, a.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Bağ yapmış iki atom birbirine çok yaklaştırılırsa hangi kuvvet büyür?',
      options: ['İtme', 'Çekme', 'İkisi de sıfır olur'], answer: 0,
      hints: ['', 'Çok yaklaşınca çekirdekler birbirini kuvvetle iter; atomlar geri itilir.', 'Çok yaklaşınca çekirdekler birbirini kuvvetle iter; atomlar geri itilir.'],
      right: 'Evet. Çok yaklaşınca çekirdekler birbirini kuvvetle iter.',
    });
    await par(a.git(70, 1000), belir(c, itme, 700), c.say('Çok yaklaşınca çekirdekler birbirini iter.'));
    await c.wait(500);
    await c.say('Bugün iki ametal atomunun nasıl bağ kurduğuna bakacağız.', { speak: '[curious] Bugün iki ametal atomunun nasıl bağ kurduğuna bakacağız.' });
  }

  /* Tablo başlığı ve satırları (S2, S3): atom · iyonlaşma enerjisi · elektronegatiflik. */
  function degerTablosu(c, p) {
    const g = c.S('g', {}, p);
    const bas = [
      yazi(c, g, 60, 64, 'atom', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk }),
      yazi(c, g, 470, 64, 'iyonlaşma enerjisi (kJ/mol)', { size: 22, kalin: 500, renk: RENK.soluk }),
      yazi(c, g, 850, 64, 'elektronegatiflik', { size: 22, kalin: 500, renk: RENK.soluk }),
    ];
    cizgi(c, g, [40, 84], [960, 84], RENK.kenarlik, 1.5);
    const satir = (y, ad, a, b) => {
      const r = c.S('g', {}, p);
      yazi(c, r, 60, y, ad, { hiza: 'start', size: 28, kalin: 600 });
      yazi(c, r, 470, y, a, { size: 30, kalin: 700 });
      yazi(c, r, 850, y, b, { size: 30, kalin: 700 });
      return r;
    };
    return { g, bas, satir };
  }

  /* ---- 2. Elektronu kim verir, kim alır? ---- */
  async function veren(c) {
    const svg = c.svg(1000, 562);
    // Evre 1: metalik ve iyonik bağ şemaları.
    const sema = c.S('g', {}, svg), mG = c.S('g', {}, sema), iG = c.S('g', {}, sema);
    kutu(c, mG, 70, 70, 400, 280); kutu(c, iG, 530, 70, 400, 280);
    [[140, 140], [270, 140], [400, 140], [140, 260], [270, 260], [400, 260]].forEach((P) => yuk(c, mG, P, 'arti', 24));
    [[205, 140], [335, 140], [205, 260], [335, 260], [140, 200], [270, 200], [400, 200]].forEach((P) => yuk(c, mG, P, 'eksi', 8));
    yazi(c, mG, 270, 396, 'metalik bağ', { size: 26, kalin: 600 });
    c.S('circle', { cx: 640, cy: 210, r: 56, fill: RENK.arti, 'fill-opacity': 0.92 }, iG);
    yazi(c, iG, 640, 221, 'Na^{+}', { size: 32, kalin: 700, renk: KOYU, math: true });
    c.S('circle', { cx: 820, cy: 210, r: 56, fill: RENK.eksi }, iG);
    yazi(c, iG, 820, 221, 'Cl^{−}', { size: 32, kalin: 700, renk: KOYU, math: true });
    yazi(c, iG, 730, 396, 'iyonik bağ', { size: 26, kalin: 600 });
    gizle(mG, iG);

    // Evre 2: değer tablosu ve iki atom.
    const T = degerTablosu(c, svg);
    const sodyum = T.satir(126, 'sodyum', '496', '0,93'), flor = T.satir(186, 'flor', '1681', '4,00');
    const na = atomYalin(c, svg, [290, 410], { R: 80, e: 0, ed: 64 }), f = atomYalin(c, svg, [710, 410], { R: 80 });
    const naAd = yazi(c, svg, 290, 525, 'Na', { size: 26, kalin: 600, math: true }), fAd = yazi(c, svg, 710, 525, 'F', { size: 26, kalin: 600 });
    const hat = ok(c, svg, [374, 410], [620, 410], RENK.eksi, 5);
    const isNa = yazi(c, svg, 290, 312, 'Na^{+}', { size: 30, kalin: 700, renk: RENK.arti, math: true });
    const isF = yazi(c, svg, 710, 312, 'F^{−}', { size: 30, kalin: 700, renk: RENK.eksi, math: true });
    gizle(T.g, sodyum, flor, na.g, f.g, naAd, fAd, hat.g, isNa, isF);

    await par(c.say('Metalik bağda metal atomları elektronlarını serbest bırakır.'), belir(c, mG, 500));
    await par(c.say('İyonik bağda metal elektron verir, ametal elektron alır.'), belir(c, iG, 500));
    await par(c.say('Atomların bunu yapıp yapmayacağını iki değer belirler.'), belir(c, sema, 450, 0), belir(c, T.g, 500));
    T.bas[1].style.fill = RENK.vurgu;
    await c.say('İyonlaşma enerjisi, atomdan elektron koparmak için gereken enerjidir.');
    T.bas[1].style.fill = ''; T.bas[2].style.fill = RENK.vurgu;
    await c.say('Elektronegatiflik, atomun bağ elektronlarını çekme gücüdür.');
    T.bas[2].style.fill = '';
    await par(c.say('Sodyumda iki değer de düşüktür: elektronunu kolay verir.'), belir(c, [sodyum, na.g, naAd], 500));
    await par(c.say('Florda iki değer de yüksektir: elektronu güçlü çeker.'), belir(c, [flor, f.g, fAd], 500));
    await par(c.say('Aralarındaki fark büyük: sodyum verir, flor alır.'), (async () => {
      await belir(c, hat.g, 450);
      await c.tween(1300, (e) => na.elektron.tasi([lerp(354, 672, e), lerp(410, 380, e)]), ease.inOut);
      await belir(c, hat.g, 400, 0);
    })());
    await par(c.say('Böylece Na<sup>+</sup> ve F<sup>−</sup> oluşur: NaF iyonik bir bileşiktir.',
      { speak: 'Böylece sodyum iyonu ve florür iyonu oluşur: sodyum florür iyonik bir bileşiktir.' }), belir(c, [isNa, isF], 600));
  }

  /* ---- 3. İki hidrojen atomu karşılaşınca ---- */
  async function hidrojen(c) {
    const svg = c.svg(1000, 562);
    const A = degerTablosu(c, svg);
    const sodyum = A.satir(126, 'sodyum', '496', '0,93'), hid = A.satir(186, 'hidrojen', '1312', '2,20');
    // Sonuç tablosu.
    const S = c.S('g', {}, svg);
    yazi(c, S, 60, 64, 'çift', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, S, 470, 64, 'fark', { size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, S, 780, 64, 'sonuç', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, S, [40, 84], [960, 84], RENK.kenarlik, 1.5);
    const sat = (y, ad, fark, sonuc, renk) => {
      const g = c.S('g', {}, svg);
      yazi(c, g, 60, y, ad, { hiza: 'start', size: 28, kalin: 600 });
      yazi(c, g, 470, y, fark, { size: 28, kalin: 700 });
      const s = yazi(c, g, 780, y, sonuc, { size: 28, kalin: 700, renk });
      return { g, s };
    };
    const r1 = sat(126, 'sodyum–flor', 'büyük', 'verir ve alır: iyon', RENK.yazi);
    const r2 = sat(186, 'hidrojen–hidrojen', 'yok', '?', RENK.vurgu);
    const r3 = sat(246, 'flor–flor', 'yok', 'iyon oluşmaz', RENK.yazi);
    gizle(A.g, sodyum, hid, S, r1.g, r2.g, r3.g);

    // İki hidrojen atomu ve elektron oku; sonra iki flor atomu.
    const h1 = atomYalin(c, svg, [300, 410], { R: 80, e: 0, ed: 50 }), h2 = atomYalin(c, svg, [700, 410], { R: 80, e: Math.PI, ed: 50 });
    const f1 = atomYalin(c, svg, [300, 410], { R: 80, e: 0, ed: 50 }), f2 = atomYalin(c, svg, [700, 410], { R: 80, e: Math.PI, ed: 50 });
    const hAd = c.S('g', {}, svg), fAd = c.S('g', {}, svg);
    yazi(c, hAd, 300, 525, 'hidrojen', { size: 24, kalin: 600 }); yazi(c, hAd, 700, 525, 'hidrojen', { size: 24, kalin: 600 });
    yazi(c, fAd, 300, 525, 'flor', { size: 24, kalin: 600 }); yazi(c, fAd, 700, 525, 'flor', { size: 24, kalin: 600 });
    const hat = ok(c, svg, [372, 410], [628, 410], RENK.eksi, 5);
    const soru = yazi(c, svg, 500, 378, '?', { size: 44, kalin: 700, renk: RENK.vurgu });
    const carpi = isaret(c, svg, 500, 410, 'no', 30);
    gizle(h1.g, h2.g, f1.g, f2.g, hAd, fAd, hat.g, soru, carpi);

    await par(c.say('Şimdi iki hidrojen atomu karşılaşıyor.'), belir(c, [h1.g, h2.g, hAd, hat.g, soru], 500));
    await c.say('İki atom birbirinin aynısı: aralarında fark yok.');
    await par(c.say('Hidrojenin iyonlaşma enerjisi 1312 kJ/mol: sodyumunkinden çok yüksek.',
      { speak: 'Hidrojenin iyonlaşma enerjisi bin üç yüz on iki kilojul bölü mol: sodyumunkinden çok yüksek.' }), belir(c, [A.g, sodyum, hid], 500));
    await c.say('Yüksek iyonlaşma enerjisi, elektron koparmanın zor olduğunu gösterir.');

    // Birlikte çöz: sonuç tablosunda hidrojen satırı.
    c.clearSay();
    await par(belir(c, [A.g, sodyum, hid], 400, 0), belir(c, [S, r1.g, r2.g], 500));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sodyum–flor satırı tamamlandı. İki hidrojen atomu arasında elektron alışverişi olur mu?',
      options: ['Olmaz; ikisi de elektronu zor verir, aralarında fark yok', 'Olur; biri verir, öteki alır', 'Olur; ikisi de elektronlarını serbest bırakır'], answer: 0,
      hints: ['', 'İkisi de aynı; biri verirse öteki neden alsın?', 'İyonlaşma enerjisi 1312: elektron koparmak zor.'],
      right: 'Evet. İkisi de elektronu zor verir; aralarında fark yok.',
    });
    r2.s.textContent = 'iyon oluşmaz'; r2.s.style.fill = '';
    await par(belir(c, carpi, 400), belir(c, soru, 300, 0), c.say('Hidrojen atomu öteki atomdan elektron koparıp anyon oluşturamaz.'));

    // Sor: iki flor atomu.
    c.clearSay();
    await par(belir(c, [h1.g, h2.g, hAd, carpi], 400, 0));
    await par(belir(c, [f1.g, f2.g, fAd, soru], 500));
    await c.choice({
      tag: 'Sıra sende', q: 'İki flor atomu karşılaşıyor. Biri ötekinin elektronunu koparıp F<sup>−</sup> iyonu oluşturabilir mi?',
      options: ['Oluşturamaz; flordan da elektron koparmak çok zordur', 'Oluşturabilir; florun elektronegatifliği yüksektir', 'Oluşturabilir; flor bir metaldir'], answer: 0,
      hints: ['', 'Florun iyonlaşma enerjisi 1681 kJ/mol; tablodaki en yüksek değer.', 'Öteki flor atomu da elektronunu sıkıca tutar.'],
      right: 'Evet. Flordan da elektron koparmak çok zordur.',
    });
    await par(belir(c, carpi, 400), belir(c, soru, 300, 0), belir(c, r3.g, 500), c.say('Elektron verilmezse ne iyon oluşur ne elektron denizi.'));
    await c.say('Yine de iki ametal atomu bir arada durabilir: H<sub>2</sub> molekülü vardır.',
      { speak: 'Yine de iki ametal atomu bir arada durabilir: H iki molekülü vardır.' });
    await c.say('Bu bağ iyonik de değildir, metalik de.', { speak: '[short pause] Bu bağ iyonik de değildir, metalik de.' });
    await c.say('Atomların elektronlarına ne olduğunu bir animasyonda izleyelim.', { speak: '[curious] Atomların elektronlarına ne olduğunu bir animasyonda izleyelim.' });
  }

  /* Aşama düğmeleri (göstergedir): aşama adı yazan kutular. */
  function asamaCipleri(c, svg, y) {
    const W = 182, ARA = 12, cipler = ASAMA.map((s, i) => {
      const g = c.S('g', { transform: `translate(0,${y})` }, svg);
      const r = c.S('rect', { width: W, height: 44, rx: 10, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2.5 }, g);
      const t = yazi(c, g, W / 2, 29, s.ad, { size: 20, kalin: 600 });
      return { g, r, t, x: 0 };
    });
    const konum = (n) => (1000 - (n * W + (n - 1) * ARA)) / 2;
    const koy = (i, x) => { cipler[i].x = x; cipler[i].g.setAttribute('transform', `translate(${x},${y})`); };
    const diz = (n) => cipler.slice(0, n).forEach((q, i) => koy(i, konum(n) + i * (W + ARA)));
    const dizTween = (n, ms = 500) => {
      const x0 = cipler.map((q) => q.x), x1 = cipler.map((q, i) => konum(n) + i * (W + ARA));
      return c.tween(ms, (e) => cipler.forEach((q, i) => { if (i < n) koy(i, lerp(x0[i], x1[i], e)); }));
    };
    const sec = (i) => cipler.forEach((q, j) => {
      q.r.style.stroke = i === j ? RENK.vurgu : RENK.kenarlik; q.t.style.fill = i === j ? RENK.vurgu : RENK.yazi;
    });
    diz(4); koy(4, konum(5) + 4 * (W + ARA));
    return { cipler, diz, dizTween, sec };
  }

  /* ---- 4. Elektronlar ne yapıyor? ---- */
  async function animasyon(c) {
    const svg = c.svg(1000, 562);
    const a = iki(c, svg, { cx: 500, cy: 225, olcek: 1.4, d: ASAMA[0].d, tohum: 5 });
    const ch = asamaCipleri(c, svg, 470);
    ch.sec(0);
    const mesaj = yazi(c, svg, 500, 420, 'Çok yaklaşınca itme büyür; atomlar geri itilir.', { size: 26, kalin: 700, renk: RENK.itme });
    gizle(a.g, ch.cipler[0].g, ch.cipler[1].g, ch.cipler[2].g, ch.cipler[3].g, ch.cipler[4].g, mesaj);
    a.canlan();

    await par(c.say('İki hidrojen atomu birbirinden çok uzakta.'), belir(c, [a.g, ch.cipler[0].g, ch.cipler[1].g, ch.cipler[2].g, ch.cipler[3].g], 500));
    await c.say('Her elektron kendi çekirdeğinin çevresinde dolaşır.');
    await c.say('Atomlar uzaktayken birbirini etkilemez.');
    ch.sec(1);
    await par(c.say('Yaklaştıkça elektronların dolaştığı bölgeler üst üste biner.'), a.git(ASAMA[1].d, 2200));
    ch.sec(2);
    await par(c.say('Yeterince yaklaşınca elektronlar iki çekirdeğin çevresinde birlikte dolaşır.'), a.git(ASAMA[2].d, 1800));
    ch.sec(3);
    await par(c.say('Bu elektronlar çoğunlukla iki çekirdeğin arasında bulunur.'), a.git(ASAMA[3].d, 1400));
    await c.say('Sabit bir noktada durmaz; sürekli yer değiştirir.');
    await c.say('Artık her çekirdeğin çevresinde iki elektron dolaşır.');

    // Sor: yeni görüntü, elektronlar başka yerlerde.
    c.clearSay();
    a.durdur(); a.atla(7.3);
    await c.choice({
      tag: 'Sıra sende', q: 'Yeterince yaklaşmış iki hidrojen atomunun yeni bir görüntüsü: elektronlar önceki karedekinden farklı yerlerde. Bir an sonra elektronlardan ne beklersin?',
      options: ['Yine iki çekirdeğin çevresinde, çoğunlukla aralarında dolaşırlar', 'İki çekirdeğin tam ortasında sabit dururlar', 'Biri öteki atomun çevresine geçip kalır, ikincisi yerinde kalır'], answer: 0,
      hints: ['', 'Elektronlar sabit bir noktada durmuyordu.', 'İkisi de iki çekirdeğin çevresinde dolaşıyordu.'],
      right: 'Evet. Elektronlar iki çekirdeğin çevresinde, çoğunlukla aralarında yer değiştirir.',
    });
    const kareler = (async () => { for (let i = 0; i < 3; i++) { a.atla(1.9); await c.wait(600); } })();
    await par(c.say('Elektronlar yer değiştirir ama iki çekirdeğin çevresinde kalır.'), kareler);
    a.canlan();

    // Dene: uzaklık kaydırıcısı, beş konum.
    await c.say('Uzaklığı değiştir; elektronların yerine bak.', { noWait: true });
    await ch.dizTween(5, 500); await belir(c, ch.cipler[4].g, 400);
    let yay = 0, sl = null;
    const konumla = (v) => {
      const i = 4 - v, j = ++yay;
      ch.sec(i); mesaj.style.opacity = i === 4 ? 1 : 0; a.ayarla(ASAMA[i].d);
      if (i === 4) (async () => {
        try {
          await c.wait(1400);
          if (j !== yay) return;
          await c.tween(600, (e) => { if (j === yay) a.ayarla(lerp(ASAMA[4].d, ASAMA[3].d, e)); }, ease.out);
          if (j === yay && sl) sl.set(1);
        } catch (err) { if (!(err instanceof Ders.Cancelled)) throw err; }
      })();
    };
    sl = c.slider({ tag: 'Dene', label: 'Çekirdekler arası uzaklık', min: 0, max: 4, step: 1, value: 1, fmt: (v) => ASAMA[4 - v].ad, onInput: konumla });
    await c.cont('Devam ›');
    c.clearAct(); yay++;
    ch.sec(4); mesaj.style.opacity = 1;
    await par(a.git(ASAMA[4].d, 700), c.say('Atomlar çok yaklaştırılırsa itme büyür ve onları geri iter.'));
  }

  /* ---- 5. Gözleme dayalı mı? ---- */
  async function gozlem(c) {
    const svg = c.svg(1000, 562);
    const TX = [135, 375, 615, 855];
    const kucuk = c.S('g', {}, svg);
    const cer = TX.map((x, i) => {
      const r = c.S('rect', { x: x - 114, y: 76, width: 228, height: 100, rx: 12, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2 }, kucuk);
      iki(c, kucuk, { cx: x, cy: 134, olcek: 0.38, d: i === 0 ? 300 : ASAMA[i].d, T0: 1.3 * (i + 1), tohum: 5 });
      yazi(c, kucuk, x - 90, 104, String(i + 1), { size: 24, kalin: 700, renk: RENK.soluk });
      return r;
    });
    const vurgula = (liste) => cer.forEach((r, i) => { r.style.stroke = liste.includes(i) ? RENK.vurgu : RENK.kenarlik; r.style.strokeWidth = liste.includes(i) ? 4 : 2; });
    const baslikSatiri = c.S('g', {}, svg);
    yazi(c, baslikSatiri, 500, 46, 'Elektron ötekine geçti mi?', { size: 24, kalin: 600 });
    const hayir = [0, 1, 2, 3].map((i) => yazi(c, baslikSatiri, TX[i], 216, 'hayır', { size: 24, kalin: 700, renk: RENK.iyi }));
    gizle(hayir[2], hayir[3]);
    const sutunA = yazi(c, svg, 250, 266, 'Gözleme dayalı', { size: 26, kalin: 700 });
    const sutunB = yazi(c, svg, 750, 266, 'Gözleme dayalı değil', { size: 26, kalin: 700 });
    gizle(kucuk, baslikSatiri, sutunA, sutunB);

    const KART = [
      { metin: 'Uzaktayken her elektron kendi atomunun çevresinde dolaşıyordu.', kisa: 'kendi çevresinde', dayali: true, kanit: '1' },
      { metin: 'Bir atom elektronunu ötekine verdi.', kisa: 'elektron verdi', dayali: false },
      { metin: 'Yaklaşınca elektronlar iki çekirdeğin çevresinde birlikte dolaştı.', kisa: 'birlikte dolaşır', dayali: true, kanit: '3–4', neden: 'Üçüncü ve dördüncü aşamada ekranda görüldü.' },
      { metin: 'Ortak elektronlar sabit bir noktada durmadı.', kisa: 'sabit durmaz', dayali: true, kanit: '4', neden: 'Dördüncü aşamada elektronlar sürekli yer değiştirdi.' },
      { metin: 'Atomlar uzakken de birbirini çekiyordu.', kisa: 'uzakta çeker', dayali: false, neden: 'Birinci aşamada hiçbir değişiklik görülmedi; önerme gördüğümüze aykırı.' },
      { metin: 'Çekirdekler ortak elektronları çekiyor.', kisa: 'çekirdekler çeker', dayali: false, neden: 'Elektronların yerini gördük; çekimin kendisi ekranda görünmedi.' },
    ];
    const bos = [0, 0];
    const BX = [40, 540], BEKLE = [290, 478];
    let bekleyen = null;
    const getir = async (k) => {
      bekleyen = kart(c, svg, BEKLE[0], BEKLE[1], 420, 50, k.kisa);
      bekleyen.g.style.opacity = 0;
      await belir(c, bekleyen.g, 400);
      return bekleyen;
    };
    const yerlesTir = async (k) => {
      const kt = bekleyen, s = k.dayali ? 0 : 1, y = 290 + 60 * bos[s]++;
      await c.tween(550, (e) => kt.tasi(lerp(BEKLE[0], BX[s], e), lerp(BEKLE[1], y, e)));
      if (k.dayali) rozet(c, kt, k.kanit); else bosKutu(c, kt);
      kt.k = k; k.kt = kt;
    };

    await par(c.say('Öğrenciler animasyonu izleyip önermeler kurdu.'), belir(c, kucuk, 500));
    await par(c.say('Gözleme dayalı önerme, ekranda gördüğümüzü söyler.'), belir(c, sutunA, 450));
    await par(c.say('Dayalı olmayan önerme görmediğimizi söyler ya da gördüğümüze aykırıdır.'), belir(c, sutunB, 450));
    c.clearSay();
    await par(getir(KART[0]), c.say('Örnek: “Uzaktayken her elektron kendi atomunun çevresinde dolaşıyordu.”'));
    vurgula([0]);
    await par(c.say('Bunu birinci aşamada gördük: gözleme dayalıdır.'), yerlesTir(KART[0]));
    vurgula([]);

    // Birlikte çöz.
    c.clearSay();
    await par(getir(KART[1]), belir(c, baslikSatiri, 500));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Önerme: “Bir atom elektronunu ötekine verdi.” Bu önerme gözleme dayalı mı?',
      options: ['Dayalı değil; hiçbir aşamada elektron ötekine geçip kalmadı', 'Dayalı; üçüncü aşamada gördük', 'Dayalı; ikinci aşamada gördük'], answer: 0,
      hints: ['', 'Üçüncü ve dördüncü aşamada elektronlara bak.', 'Elektronlar iki çekirdeğin çevresinde dolaşıyordu.'],
      right: 'Evet. Hiçbir aşamada elektron ötekine geçip kalmadı.',
    });
    vurgula([2, 3]);
    await belir(c, [hayir[2], hayir[3]], 450);
    await par(c.say('Elektron hiçbir aşamada ötekine geçmedi: önerme gözleme dayalı değildir.'), yerlesTir(KART[1]));
    vurgula([]);
    await belir(c, baslikSatiri, 400, 0);
    c.clearSay();

    // Sor: dört kart, kart başına seçim.
    await sinifla(c, {
      tag: 'Sıra sende', kutular: ['Gözleme dayalı', 'Gözleme dayalı değil'], kartlar: KART.slice(2).map((k) => Object.assign({ kutu: k.dayali ? 0 : 1, ipucu: k.neden }, k, { neden: 'Evet. ' + k.neden })),
      soru: (k) => `Önerme: “${k.metin}” Bu önerme gözleme dayalı mı?`,
      sec: async (i, k) => { await getir(k); },
      yerlestir: async (i, k) => { await yerlesTir(k); },
    });

    // Gör: iki sütun dolu; sonuç çıkarma.
    await par(c.say('Elimizde gözleme dayalı üç önerme var.'), belir(c, kucuk, 450, 0));
    await c.choice({
      tag: 'Sıra sende', q: 'Yalnızca gözleme dayalı önermelere bakarak iki hidrojen atomu arasındaki bağın nasıl oluştuğuna dair hangi yargıya varılır?',
      options: ['Atomlar elektronlarını ortaklaşa kullanır', 'Bir atom elektronunu ötekine verir', 'Elektronlar atomlardan ayrılıp serbestçe dolaşır'], answer: 0,
      hints: ['', 'Hiçbir elektron ötekine geçmedi.', 'Elektronlar iki çekirdeğin çevresinde birlikte dolaştı.'],
      right: 'Evet. Gözlemler, elektronların ortak kullanıldığını gösterir.',
    });
    const sonuc = c.S('g', {}, svg);
    c.S('path', { d: 'M40,296 H26 V448 H40', fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sonuc);
    ok(c, sonuc, [250, 460], [250, 486], RENK.vurgu, 4);
    yazi(c, sonuc, 250, 524, 'elektronlar ortak kullanılıyor', { size: 26, kalin: 700, renk: RENK.vurgu });
    gizle(sonuc);
    await par(c.say('İyon oluşmaz; elektronlar iki atom tarafından ortaklaşa kullanılır.'), belir(c, sonuc, 600));
  }

  /* ---- 6. Kovalent bağ ve molekül ---- */
  async function tanim(c) {
    const svg = c.svg(1000, 562);
    const a = iki(c, svg, { cx: 270, cy: 290, olcek: 1.3, d: ASAMA[3].d, tohum: 8 });
    a.canlan();
    const bant = c.S('rect', { x: 140, y: 218, width: 260, height: 144, rx: 72, fill: RENK.cekme, 'fill-opacity': 0.1, stroke: RENK.cekme, 'stroke-width': 3.5 }, svg);
    const bantAd = yazi(c, svg, 270, 196, 'güçlü etkileşim', { size: 28, kalin: 700, renk: RENK.cekme });
    const cift = c.S('g', {}, svg);
    cizgi(c, cift, [270, 366], [270, 398], RENK.ince, 2, { 'stroke-dasharray': '3 5' });
    yazi(c, cift, 270, 428, 'bağ elektron çifti', { size: 26, kalin: 600, renk: RENK.eksi });
    // Molekül kutusu.
    const mol = c.S('g', {}, svg);
    kutu(c, mol, 560, 80, 410, 370);
    yazi(c, mol, 765, 132, 'molekül', { size: 32, kalin: 700 });
    const sira1 = c.S('g', {}, svg), sira2 = c.S('g', {}, svg);
    [['H_{2}', 625], ['Cl_{2}', 765], ['N_{2}', 905]].forEach(([m, x]) => yazi(c, sira1, x, 245, m, { size: 42, kalin: 700, math: true }));
    [['H_{2}O', 665], ['CO_{2}', 865]].forEach(([m, x]) => yazi(c, sira2, x, 365, m, { size: 42, kalin: 700, math: true }));
    gizle(a.g, bant, bantAd, cift, mol, sira1, sira2);

    await par(c.say('İki ametal atomu elektronlarını ortak kullanır.'), belir(c, a.g, 600));
    await par(c.say('Çekirdeklerle ortak kullanılan elektronlar arasındaki güçlü etkileşime kovalent bağ denir.'), belir(c, [bant, bantAd], 600));
    await bantAdDegis(c, bantAd);
    await par(c.say('Bağı oluşturan iki elektrona bağ elektron çifti denir.'), belir(c, cift, 500));
    await par(c.say('Kovalent bağla bağlanan atom grubuna molekül denir.'), belir(c, mol, 500));
    await par(c.say('H<sub>2</sub>, Cl<sub>2</sub> ve N<sub>2</sub> elementlerin moleküllerine örnektir.',
      { speak: 'H iki, klor iki ve azot iki elementlerin moleküllerine örnektir.' }), belir(c, sira1, 500));
    await par(c.say('H<sub>2</sub>O ve CO<sub>2</sub> ise bileşiklerin molekülleridir.',
      { speak: 'Su ve karbon dioksit ise bileşiklerin molekülleridir.' }), belir(c, sira2, 500));
    c.note('<b>Kovalent bağda elektron verilmez, ortak kullanılır.</b><br>Örnek: H<sub>2</sub>.', 'Kovalent bağ', 'kovalent-bag');
  }
  async function bantAdDegis(c, t) {
    await belir(c, t, 250, 0); t.textContent = 'kovalent bağ'; await belir(c, t, 300, 1);
  }

  /* ---- 7. Hangi bağ? ---- */
  async function hangiBag(c) {
    const svg = c.svg(1000, 562);
    const BX = [30, 355, 680], BW = 290;
    const AD = ['Metalik bağ', 'İyonik bağ', 'Kovalent bağ'];
    const KURAL = ['Metal atomları arasında', 'Metal ile ametal arasında', 'İki ametal atomu arasında'];
    const kutular = BX.map((x, i) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, x, 60, BW, 310);
      yazi(c, g, x + BW / 2, 106, AD[i], { size: 28, kalin: 700 });
      return g;
    });
    const kurallar = KURAL.map((k, i) => yazi(c, svg, BX[i] + BW / 2, 146, k, { size: 20, kalin: 500, renk: RENK.soluk }));
    gizle(kutular, kurallar);
    const KARTLAR = [
      { ad: 'Na', soru: 'Sodyum atomları (sodyum metali)', kutu: 0, neden: 'Metal atomları arasında metalik bağ kurulur.' },
      { ad: 'NaCl', soru: 'Sodyum ile klor (NaCl)', kutu: 1, neden: 'Metal ile ametal arasında iyonik bağ kurulur.' },
      { ad: 'H_{2}', soru: 'İki hidrojen atomu (H<sub>2</sub>)', kutu: 2, neden: 'Ametal ile ametal arasında elektronlar ortak kullanılır.' },
      { ad: 'Cl_{2}', soru: 'İki klor atomu (Cl<sub>2</sub>)', kutu: 2, neden: 'İki klor atomu da ametaldir; elektronlarını ortak kullanır.' },
      { ad: 'MgO', soru: 'Magnezyum ile oksijen (MgO)', kutu: 1, neden: 'Magnezyum metal, oksijen ametaldir: iyonik bağ kurulur.' },
      { ad: 'O_{2}', soru: 'İki oksijen atomu (O<sub>2</sub>)', kutu: 2, neden: 'İki oksijen atomu da ametaldir; elektronlarını ortak kullanır.' },
    ];
    const dolu = [0, 0, 0];
    let bekleyen = null;
    const kartlar = KARTLAR.map((k) => Object.assign({}, k, { ipucu: k.neden, neden: 'Evet. ' + k.neden }));

    await par(c.say('Üç bağı yan yana koyalım: metalik, iyonik, kovalent.'), belir(c, kutular, 500));
    await par(c.say('Metal atomları arasında metalik bağ kurulur.'), belir(c, kurallar[0], 400));
    await par(c.say('Metal ile ametal arasında iyonik bağ kurulur.'), belir(c, kurallar[1], 400));
    await par(c.say('İki ametal atomu arasında kovalent bağ kurulur.'), belir(c, kurallar[2], 400));
    await c.say('Her kartın bağ türünü seç.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', kutular: AD, kartlar,
      soru: (k) => `${k.soru}: hangi bağ kurulur?`,
      sec: async (i, k) => {
        bekleyen = yazi(c, svg, 500, 462, k.ad, { size: 46, kalin: 700, math: true });
        bekleyen.style.opacity = 0; await belir(c, bekleyen, 350);
      },
      yerlestir: async (i, k) => {
        const x = BX[k.kutu] + BW / 2, y = 215 + 52 * dolu[k.kutu]++, t = bekleyen;
        await c.tween(500, (e) => { t.setAttribute('x', lerp(500, x, e)); t.setAttribute('y', lerp(462, y, e)); t.setAttribute('font-size', lerp(46, 34, e)); });
      },
    });
  }

  Ders.start({
    id: 'cesitlilik-c1', kicker: 'Konu C · Kovalent bağ', title: 'İki ametal yaklaşınca: elektronlar ortak kullanılır', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'İki ametal yaklaşınca: elektronlar ortak kullanılır',
      hook: 'Su molekülünde hiçbir atom elektron verip iyon olmuyorsa atomları bir arada tutan ne?',
      button: 'Derse başla ›',
    },
    goals: ['Ametal atomlarının neden elektron alıp vermediğini açıklar.', 'Yaklaşan iki atomda elektronların nasıl davrandığını söyler.', 'Kovalent bağı tanımlar ve metalik, iyonik bağdan ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'İyonik bağı ve yakın atomlardaki itmeyi hatırla.', run: hatirla },
      { title: 'Elektronu kim verir, kim alır?', goal: 'İyonlaşma enerjisi ve elektronegatiflikle elektron alışverişini yorumla.', run: veren },
      { title: 'İki hidrojen atomu karşılaşınca', goal: 'Aynı iki atom arasında elektron alışverişi olup olmadığını bul.', run: hidrojen },
      { title: 'Elektronlar ne yapıyor?', goal: 'Atomlar yaklaşırken elektronların yerini izle.', run: animasyon },
      { title: 'Gözleme dayalı mı?', goal: 'Önermeleri gözleme dayalı olup olmamasına göre ayır ve yargıya var.', run: gozlem },
      { title: 'Kovalent bağ ve molekül', goal: 'Kovalent bağı, bağ elektron çiftini ve molekülü adlandır.', run: tanim },
      { title: 'Hangi bağ?', goal: 'Metalik, iyonik ve kovalent bağı ayır.', run: hangiBag },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kovalent bağ hangi tanecikler arasındaki güçlü etkileşimdir?',
        options: ['Katyonlar ile anyonlar', 'Çekirdekler ile ortak kullanılan elektronlar', 'Artı iyonlar ile elektron denizi'], answer: 1,
        why: ['Katyon ile anyonun çekimi iyonik bağdır.', 'Kovalent bağ, çekirdekler ile ortak kullanılan elektronlar arasındadır.', 'Artı iyonlar ile elektron denizinin çekimi metalik bağdır.'], scene: 5 },
      { q: 'İki klor atomu bağ kuruyor; klorun iyonlaşma enerjisi 1255 kJ/mol’dür. Atomlara ne olur?',
        options: ['Biri elektron verip Cl<sup>+</sup>, öteki alıp Cl<sup>−</sup> olur', 'İkisi de elektronunu serbest bırakır', 'Elektronlarını ortak kullanırlar'], answer: 2,
        why: ['İyonlaşma enerjisi yüksektir; klordan elektron koparmak zordur, iyon oluşmaz.', 'Serbest elektronlar denizi metallere özgüdür; ametallerde oluşmaz.', 'İki aynı ametal atomu elektron vermez; elektronlarını ortak kullanır.'], scene: 2 },
      { q: 'H<sub>2</sub> molekülünde ortak kullanılan elektronlar için hangisi doğrudur?',
        options: ['İki çekirdeğin çevresinde, çoğunlukla aralarında sürekli yer değiştirirler', 'İki çekirdeğin tam ortasında sabit dururlar', 'Bir atomdan ötekine geçip orada kalırlar'], answer: 0,
        why: ['Animasyonda elektronlar iki çekirdeğin çevresinde, çoğunlukla aralarında gezindi.', 'Ortak elektronlar sabit bir noktada durmaz.', 'Hiçbir elektron ötekine geçip kalmaz; ortak kullanılır.'], scene: 3 },
      { q: 'İki oksijen atomu yaklaşıyor. Üç olay var:<br>(I) Elektronlar iki çekirdeğin çevresinde ortak dolaşır.<br>(II) Atomlar uzaktadır ve birbirini etkilemez.<br>(III) Atomlar yaklaşır ve elektronların dolaştığı bölgeler üst üste biner.<br>Doğru sıra hangisidir?',
        options: ['I, II, III', 'II, III, I', 'III, II, I'], answer: 1,
        why: ['Ortak dolaşım en sonda olur; önce atomlar uzakta durur.', 'Önce atomlar uzaktadır, sonra bölgeler üst üste biner, en sonda elektronlar ortak dolaşır.', 'Bu sıra tersine işler: atomlar önce uzaktadır.'], scene: 3 },
      { q: 'Karbon ve oksijen ametaldir. CO<sub>2</sub> molekülünde bu atomlar arasında hangi bağ kurulur?',
        options: ['Kovalent bağ', 'İyonik bağ', 'Metalik bağ'], answer: 0,
        why: ['İki ametal atomu arasında kovalent bağ kurulur.', 'İyonik bağ metal ile ametal arasında kurulur.', 'Metalik bağ metal atomları arasında kurulur.'], scene: 6 },
    ],
    summary: ['Ametal atomundan elektron koparmak zordur; iyon oluşmaz.', 'Atomlar yaklaşınca elektronlar iki çekirdeğin çevresinde ortak dolaşır.', '<b>Kovalent bağda elektron verilmez, ortak kullanılır.</b>'],
    nextLesson: { href: 'c2-gorunmeyeni-tahmin-et.html', label: 'Sonraki: Görünmeyeni tahmin et ›' },
  });
})();
