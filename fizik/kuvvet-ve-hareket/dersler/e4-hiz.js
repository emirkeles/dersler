/* E4 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md ("## E4")
   Renk rolleri: konum (referans halkası) = RENK.mor, alınan yol ve sürat = RENK.vurgu, yer değiştirme ve hız = RENK.r, süre = RENK.a.
   Grafik çizilmez; birim dönüştürme yoktur (sahne 7 yalnızca km ve h, ötekiler yalnızca m ve s). */
(() => {
  'use strict';
  const { RENK, sayi, par, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, ok, okCiz, yonGulu, izgara, tablo, gosterge, sayiDogrusu, insan, araba } = KIT;
  const { lerp, ease } = Ders;
  const YOL = RENK.vurgu, YER = RENK.r, KONUM = RENK.mor, SURE = RENK.a;

  /* ---- Derse özel yardımcılar ---- */
  const gizli = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };
  const vurgula = (c, el, ms = 800) => {
    const els = [el].flat();
    return c.tween(ms, (e, t) => els.forEach((x) => { x.style.opacity = 1 - 0.75 * Math.sin(Math.PI * t); })).then(() => els.forEach((x) => { x.style.opacity = 1; }));
  };
  /* Tek parça: düz yazı ya da üstünde ok olan sembol. { t | vek, renk, kalin } */
  function simge(c, p, t, size, renk) {
    const g = c.S('g', {}, p), q = typeof t === 'string' ? { t } : t, r = q.renk || renk;
    const el = yazi(c, g, 0, 0, q.vek || q.t, { size, renk: r, hiza: 'start', kalin: q.kalin });
    const w = el.getComputedTextLength();
    if (q.vek) ok(c, g, 0, -size * 0.88, w + 2, -size * 0.88, { renk: r, kalin: 2.2, uc: 7 });
    return { g, w };
  }
  /* Soldan sağa dizilen satır; { ust, alt } parçası kesir çizer. g.p parçaları tutar. */
  function satir(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 30, ara = o.ara == null ? size * 0.4 : o.ara, renk = o.renk || RENK.yazi;
    let cx = 0; g.p = [];
    parcalar.forEach((pr) => {
      const q = typeof pr === 'string' ? { t: pr } : pr, sg = c.S('g', {}, g);
      let w;
      if (q.ust != null) {
        const u = simge(c, sg, q.ust, size, q.renk || renk), a = simge(c, sg, q.alt, size, q.renk || renk);
        w = Math.max(u.w, a.w) + size * 0.5;
        u.g.setAttribute('transform', `translate(${(w - u.w) / 2} ${-size * 0.62})`);
        a.g.setAttribute('transform', `translate(${(w - a.w) / 2} ${size * 0.72})`);
        cizgi(c, sg, 0, -size * 0.3, w, -size * 0.3, { renk: q.cizgi || RENK.yazi, kalin: 2.5 });
      } else w = simge(c, sg, q, size, renk).w;
      sg.setAttribute('transform', `translate(${cx} 0)`); cx += w + ara; g.p.push(sg);
    });
    const W = cx - ara, sx = o.hiza === 'start' ? x : o.hiza === 'end' ? x - W : x - W / 2;
    g.setAttribute('transform', `translate(${sx} ${y})`); g.w = W;
    return g;
  }
  /* Kronometre: g.yaz(saniye, tur) yazıyı ve ibreyi günceller. */
  function krono(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || SURE;
    daire(c, g, x, y, 17, { renk, kalin: 3 }); kutu(c, g, x - 5, y - 27, 10, 8, { renk, rx: 2, kalin: 2, fill: 'none' });
    const ibre = cizgi(c, g, x, y, x, y - 11, { renk, kalin: 3 });
    const t = yazi(c, g, x + 28, y + 9, '0 s', { size: o.size || 26, renk, hiza: 'start' });
    g.yaz = (v, tur = 0) => {
      t.textContent = Math.round(v) + ' s'; const a = tur * 2 * Math.PI;
      ibre.setAttribute('x2', x + Math.sin(a) * 11); ibre.setAttribute('y2', y - Math.cos(a) * 11);
    };
    return g;
  }
  /* Adım adım çizilen yol (yol rengi). el.git(t) yolun t kadarını gösterir, o noktanın yerini döndürür. */
  function izYol(c, p, d, o = {}) {
    const el = yol(c, p, d, { renk: o.renk || YOL, kalin: o.kalin || 6 }), L = el.getTotalLength();
    el.setAttribute('stroke-dasharray', `${L} ${L}`);
    el.git = (t) => { el.setAttribute('stroke-dashoffset', L * (1 - t)); el.style.visibility = t <= 0 ? 'hidden' : ''; return el.getPointAtLength(L * t); };
    el.git(0);
    return el;
  }
  const yerlestir = (nk, q) => { nk.setAttribute('cx', q.x); nk.setAttribute('cy', q.y); };
  /* Gizli duran oku başından ucuna doğru çizer; verilen koşucu noktası okun ucunu örtmesin diye solar. */
  const okGoster = (c, g, nk) => { g.style.opacity = 1; return par(okCiz(c, g, 700), nk ? sol(c, nk, 0, 300) : []); };
  /* "batı ← → doğu" yön çizgisi */
  function batiDogu(c, p, x, y) {
    const g = c.S('g', {}, p);
    yazi(c, g, x - 98, y + 8, 'batı', { size: 24, renk: RENK.soluk }); yazi(c, g, x + 100, y + 8, 'doğu', { size: 24, renk: RENK.soluk });
    ok(c, g, x - 8, y, x - 60, y, { renk: RENK.soluk, kalin: 3, uc: 10 }); ok(c, g, x + 8, y, x + 60, y, { renk: RENK.soluk, kalin: 3, uc: 10 });
    return g;
  }
  /* Düz yol şeridi: koyu bant, ortasında kesik çizgi. */
  function yolSeridi(c, p, x0, x1, y, h = 44) {
    const g = c.S('g', {}, p);
    kutu(c, g, x0, y - h / 2, x1 - x0, h, { rx: 6, kalin: 2 });
    cizgi(c, g, x0 + 14, y, x1 - 14, y, { renk: RENK.soluk, kalin: 2, kesik: '14 12' });
    return g;
  }
  /* Bisikletli: tekerlekler (0, 0) zemininde, sağa bakar. */
  function bisiklet(c, p, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.a, k = { renk: RENK.yazi, kalin: 4 };
    daire(c, g, -28, -20, 20, { renk }); daire(c, g, 28, -20, 20, { renk });
    yol(c, g, 'M -28 -20 L -8 -54 L 20 -54 L 28 -20 M -8 -54 L 2 -20 L -28 -20 M 20 -54 L 23 -66 L 34 -68 M -14 -58 L -2 -58', { renk, kalin: 3 });
    daire(c, g, 10, -108, 9, k);
    yol(c, g, 'M 6 -98 L -8 -62 L 8 -42 L 2 -20 M 4 -92 L 30 -68', k);
    return g;
  }
  /* Kuş bakışı 50 m havuz; sol duvar referans noktası. koy(yolM): yüzücü 0–100 m yol almış. */
  function havuz(c, p) {
    const g = c.S('g', {}, p), X0 = 150, X1 = 850, xm = (m) => lerp(X0 + 16, X1 - 16, m / 50);
    kutu(c, g, X0, 120, X1 - X0, 120, { renk: RENK.turkuaz, fill: '#12304a', rx: 4 });
    cizgi(c, g, X0 + 12, 180, X1 - 12, 180, { renk: RENK.ince, kalin: 2, kesik: '12 10' });
    cizgi(c, g, X0, 104, X1, 104, { renk: RENK.soluk, kalin: 2 }); [X0, X1].forEach((x) => cizgi(c, g, x, 97, x, 111, { renk: RENK.soluk, kalin: 2 }));
    yazi(c, g, 500, 92, '50 m', { size: 24, renk: RENK.soluk });
    daire(c, g, X0, 180, 15, { renk: KONUM, kalin: 4 });
    const gid = cizgi(c, g, xm(0), 152, xm(0), 152, { renk: YOL, kalin: 5 }), don = cizgi(c, g, xm(50), 170, xm(50), 170, { renk: YOL, kalin: 5 });
    const okY = ok(c, g, xm(0), 212, xm(0), 212, { renk: YER });
    const nk = c.S('circle', { cx: xm(0), cy: 152, r: 11, fill: RENK.yazi }, g);
    const koy = (yolM) => {
      const a = Math.min(yolM, 50), b = Math.max(yolM - 50, 0), x = xm(a - b);
      gid.setAttribute('x2', xm(a)); don.setAttribute('x2', xm(50 - b)); don.style.display = b > 0 ? '' : 'none';
      nk.setAttribute('cx', x); nk.setAttribute('cy', b > 0 ? 170 : 152);
      okY.ayarla(xm(0), 212, x, 212);
    };
    koy(0);
    return { g, koy };
  }
  /* Defterde üstünde ok olan sembol */
  const vh = (h) => `<span style="position:relative;display:inline-block">${h}<span style="position:absolute;left:0;right:0;top:-.62em;text-align:center;font-size:.7em;line-height:1">→</span></span>`;

  /* ---- Sahne 1 · Havuzda gidiş–dönüş ---- */
  async function havuzda(c) {
    const svg = c.svg(1000, 562);
    // Ön bilgi: yol, yer değiştirme, başa dönüş
    const on = c.S('g', {}, svg);
    const gid = izYol(c, on, 'M 250 330 C 350 110 540 420 750 200'), don = izYol(c, on, 'M 750 200 C 830 400 430 480 250 330');
    c.S('circle', { cx: 250, cy: 330, r: 7, fill: RENK.yazi }, on); c.S('circle', { cx: 750, cy: 200, r: 7, fill: RENK.yazi }, on);
    const nk = c.S('circle', { cx: 250, cy: 330, r: 11, fill: RENK.yazi }, on);
    const model = gizli(satir(c, on, 500, 80, [{ t: 'sürat', renk: YOL }, '=', { ust: { t: 'alınan yol', renk: YOL }, alt: { t: 'zaman', renk: SURE } }], { size: 28 }));
    await belir(c, model);
    await par(c.say('Sürat, birim zamanda alınan yoldu; skaler bir nicelikti.'), c.tween(2800, (e) => yerlestir(nk, gid.git(e))));
    const o2 = ok(c, on, 250, 330, 750, 200, { renk: YER }), yd = gizli(yazi(c, on, 500, 530, 'yer değiştirme', { size: 28, renk: YER }));
    await par(okCiz(c, o2, 700), belir(c, yd));
    await c.say('Yer değiştirme ise ilk konumdan son konuma çizilen vektördü.');
    await par(c.say('Başlanan yere dönülünce yer değiştirme sıfır oluyordu.'),
      c.tween(2800, (e) => { const q = don.git(e); yerlestir(nk, q); o2.ayarla(250, 330, q.x, q.y); }).then(() => { yd.textContent = 'yer değiştirme: 0'; }));
    await kaybol(c, on);

    const ana = gizli(c.S('g', {}, svg)), hv = havuz(c, ana), kr = krono(c, ana, 160, 52);
    const sayac = yazi(c, ana, 850, 61, 'yol: 0 m', { size: 26, renk: YOL, hiza: 'end' });
    await belir(c, ana);
    await par(c.say('Bir yüzücü 50 metrelik havuzda karşı duvara gidip geri dönüyor.', { speak: 'Bir yüzücü elli metrelik havuzda karşı duvara gidip geri dönüyor.' }),
      c.tween(5200, (e) => { hv.koy(e * 100); kr.yaz(e * 50, e); sayac.textContent = `yol: ${Math.round(e * 100)} m`; }, ease.linear));
    await par(c.say('Başladığı duvara dokunduğunda 50 saniye geçmiş oluyor.', { speak: 'Başladığı duvara dokunduğunda elli saniye geçmiş oluyor.' }), vurgula(c, kr, 1200));
    await par(c.say('Gidiş ve dönüşle toplam 100 metre yol alıyor.', { speak: 'Gidiş ve dönüşle toplam yüz metre yol alıyor.' }), vurgula(c, sayac, 1200));
    const l1 = satir(c, svg, 500, 350, [{ ust: { t: 'yol', renk: YOL }, alt: { t: 'süre', renk: SURE } }, '=', { ust: { t: '100 m', renk: YOL }, alt: { t: '50 s', renk: SURE } }, '=', { t: '2 m/s', renk: YOL, kalin: 700 }], { size: 30 });
    gizli(l1.p);
    await belir(c, l1.p[0]); await belir(c, [l1.p[1], l1.p[2]]); await belir(c, [l1.p[3], l1.p[4]]);
    await c.say('Ortalama sürati 100 ÷ 50 = 2 metre bölü saniye.', { speak: 'Ortalama sürati yüz bölü elli eşittir iki metre bölü saniye.' });
    const l2 = gizli(satir(c, svg, 500, 470, [{ ust: { t: 'yer değiştirme', renk: YER }, alt: { t: 'süre', renk: SURE } }, '=', { t: '?', renk: YER, kalin: 700 }], { size: 30 }));
    await belir(c, l2);
    await c.say('Şimdi yol yerine yer değiştirmeyi süreye bölmeyi deneyelim.');
    await c.choice({ tag: 'Tahmin et', q: 'Yüzücünün yer değiştirmesini süreye bölersek ne çıkar?',
      options: ['2 m/s; ortalama süratiyle aynı', 'Sıfır; çünkü yer değiştirmesi sıfır', '1 m/s; yalnızca gidiş sayılır'], answer: 1,
      hints: ['2 m/s, 100 m’lik yolun süreye bölümüdür. Yüzücü başladığı duvarda olduğu için yer değiştirmesi 100 m değil, sıfırdır.', '',
        'Yer değiştirme hareketin tamamı için, ilk ve son konumdan bulunur; ikisi de aynı duvar olduğundan sıfırdır.'],
      right: 'Evet. Başladığı duvara döndü; yer değiştirmesi sıfır.' });
    l2.p[2].querySelector('text').textContent = '0';
    await vurgula(c, l2.p[2], 600);
    await c.say('Yer değiştirme sıfır olduğu için bölüm de sıfır çıkar.');
    await c.say('Yer değiştirmeyi zamana bölünce süratten farklı, yeni bir nicelik çıkıyor.', { speak: '[thoughtful] Yer değiştirmeyi zamana bölünce süratten farklı, yeni bir nicelik çıkıyor.' });
    const ad = gizli([yazi(c, svg, 820, 352, 'sürat', { size: 30, renk: YOL }), yazi(c, svg, 820, 472, 'hız', { size: 30, renk: YER })]);
    await belir(c, ad);
    await c.say('Bu niceliğin adı hız; onu iki örnekle tanıyalım.');
  }

  /* ---- Sahne 2 · İki sporcu: hız ---- */
  async function ikiSporcu(c) {
    const svg = c.svg(1000, 562);
    const kroki = (x0, o) => {
      const g = c.S('g', {}, svg), iz = izgara(c, g, { kare: 50, sutun: 7, satir: 5, x: x0, y: 50 }), pt = (i, j) => iz.P(i, j).join(' ');
      const [ax, ay] = iz.P(...o.a), [bx, by] = iz.P(...o.b);
      const yolEl = izYol(c, g, o.d(pt));
      [[ax, ay], [bx, by]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: RENK.yazi }, g));
      yazi(c, g, ax - 22, ay + 9, o.ad[0], { size: 26 }); yazi(c, g, bx + 22, by + 9, o.ad[1], { size: 26 });
      const nk = c.S('circle', { cx: ax, cy: ay, r: 10, fill: RENK.a, stroke: RENK.yazi, 'stroke-width': 2 }, g);
      const okY = gizli(ok(c, g, ax, ay, bx, by, { renk: YER }));
      const olcek = gizli(c.S('g', {}, g));
      cizgi(c, olcek, x0, 320, x0 + 50, 320, { renk: RENK.soluk, kalin: 3 }); [x0, x0 + 50].forEach((x) => cizgi(c, olcek, x, 313, x, 327, { renk: RENK.soluk, kalin: 3 }));
      yazi(c, olcek, x0 + 64, 329, o.kare + ' m', { size: 24, renk: RENK.soluk, hiza: 'start' });
      const kr = krono(c, g, x0 + 210, 340);
      const okAd = gizli(yazi(c, g, (ax + bx) / 2, ay + 36, o.yer, { size: 24, renk: YER }));
      const sonuc = gizli(yazi(c, g, x0 + 175, 420, o.sonuc, { size: 34, renk: YER }));
      const kos = (ms) => c.tween(ms, (e) => { yerlestir(nk, yolEl.git(e)); kr.yaz(e * o.sure, e); }, ease.linear);
      return { g, olcek, kr, okY, okAd, sonuc, kos, nk };
    };
    const k1 = kroki(40, { a: [1, 1], b: [6, 1], ad: ['A', 'B'], kare: 50, sure: 50, yer: 'doğu, 250 m', sonuc: '5 m/s',
      d: (pt) => `M ${pt(1, 1)} Q ${pt(3.5, 6.4)} ${pt(6, 1)}` });
    const k2 = kroki(600, { a: [2, 1], b: [5, 1], ad: ['K', 'L'], kare: 60, sure: 30, yer: 'doğu, 180 m', sonuc: '6 m/s',
      d: (pt) => `M ${pt(2, 1)} C ${pt(2, 3)} ${pt(2.6, 4.6)} ${pt(3.2, 3.4)} S ${pt(3.8, 1.6)} ${pt(4.3, 2.8)} S ${pt(5, 4.2)} ${pt(5, 1)}` });
    gizli(k2.g);
    yonGulu(c, svg, 495, 110, { r: 26, adlar: ['K', 'D', '', ''] });
    await par(c.say('Bir sporcu yay biçimli bir yoldan A’dan B’ye koşuyor.', { speak: 'Bir sporcu yay biçimli bir yoldan a noktasından be noktasına koşuyor.' }), k1.kos(3600));
    await belir(c, k1.olcek); await okGoster(c, k1.okY, k1.nk);
    await c.say('Krokide her kare 50 metre; B, A’nın 5 kare doğusunda.', { speak: 'Krokide her kare elli metre; be noktası, a noktasının beş kare doğusunda.' });
    await belir(c, k1.sonuc);
    await c.say('Koşusu 50 saniye sürüyor; hızının büyüklüğü 5 metre bölü saniye.', { speak: 'Koşusu elli saniye sürüyor; hızının büyüklüğü beş metre bölü saniye.' });
    await belir(c, k2.g);
    await par(c.say('İkinci sporcu kıvrımlı bir yoldan K’den L’ye 30 saniyede koşuyor.', { speak: 'İkinci sporcu kıvrımlı bir yoldan ke noktasından le noktasına otuz saniyede koşuyor.' }), k2.kos(3600));
    await belir(c, k2.olcek); await okGoster(c, k2.okY, k2.nk);
    await c.say('Bu krokide her kare 60 metre; L, K’nin 3 kare doğusunda.', { speak: 'Bu krokide her kare altmış metre; le noktası, ke noktasının üç kare doğusunda.' });
    await belir(c, k2.sonuc);
    await c.say('Onun hızının büyüklüğü 6 metre bölü saniye.', { speak: 'Onun hızının büyüklüğü altı metre bölü saniye.' });
    await c.choice({ tag: 'Düşün', q: '5 ve 6 sayıları hangi bölmeden çıkıyor?',
      options: ['Koşulan yolun uzunluğu ÷ süre', 'Başlangıçtan bitişe düz uzaklık ÷ süre', 'Kare sayısı ÷ süre'], answer: 1,
      hints: ['Koşulan yay 250 metreden uzun; süreye bölünce 5’ten büyük çıkardı. Yol bölü süre sürati verir, hızı değil.', '',
        '5 ÷ 50 ve 3 ÷ 30, 5 ile 6’yı vermez; önce kareler metreye çevrilir: 250 ÷ 50 = 5, 180 ÷ 30 = 6.'],
      right: 'Evet. Bölünen, başlangıçtan bitişe düz uzaklık.' });
    const bolme = async (k, metin) => { await kaybol(c, [k.kr, k.olcek]); gizli(k.sonuc); k.sonuc.textContent = metin; await belir(c, [k.okAd, k.sonuc]); };
    await bolme(k1, '250 ÷ 50 = 5');
    await c.say('Birinci sporcunun yer değiştirmesi doğuya 250 metre: 250 ÷ 50 = 5.', { speak: 'Birinci sporcunun yer değiştirmesi doğuya iki yüz elli metre: iki yüz elli bölü elli eşittir beş.' });
    await bolme(k2, '180 ÷ 30 = 6');
    await c.say('İkincisinin yer değiştirmesi doğuya 180 metre: 180 ÷ 30 = 6.', { speak: 'İkincisinin yer değiştirmesi doğuya yüz seksen metre: yüz seksen bölü otuz eşittir altı.' });
    await kaybol(c, k2.g);
    const ad = gizli(yazi(c, svg, 775, 90, 'hız', { size: 40, renk: YER, kalin: 700 }));
    await belir(c, ad);
    await c.say('Hareketlinin birim zamanda yaptığı yer değiştirmeye hız denir.', { speak: 'Hareketlinin birim zamanda yaptığı yer değiştirmeye [short pause] hız denir.' });
    await kaybol(c, ad);
    const model = gizli(satir(c, svg, 775, 150, [{ t: 'hız', renk: YER, kalin: 700 }, '=', { ust: { t: 'yer değiştirme', renk: YER }, alt: { t: 'zaman', renk: SURE } }], { size: 30 }));
    await belir(c, model);
    await c.say('Modeli: hız eşittir yer değiştirme bölü zaman.');
    const birim = gizli(yazi(c, svg, 775, 240, 'birimi: m/s', { size: 26, renk: RENK.soluk }));
    await belir(c, birim);
    await c.say('Hızın SI birimi de metre bölü saniyedir.', { speak: 'Hızın se i birimi de metre bölü saniyedir.' });
    const sembol = gizli(satir(c, svg, 775, 340, [{ vek: 'v', renk: YER }, '=', { ust: { vek: 'Δx', renk: YER }, alt: { t: 'Δt', renk: SURE } }], { size: 34 }));
    const vk = gizli(yazi(c, svg, 775, 420, 'vektörel', { size: 26, renk: RENK.soluk }));
    await belir(c, [sembol, vk]);
    await c.say('Hız vektöreldir; yönü yer değiştirmenin yönüdür.');
    await kaybol(c, k1.sonuc);
    const hiz1 = gizli(satir(c, svg, 215, 420, [{ vek: 'v', renk: YER }, { t: ': doğu, 5 m/s', renk: YER }], { size: 30, ara: 3 }));
    await belir(c, hiz1);
    await c.say('Birinci sporcunun hızı doğuya 5 metre bölü saniyedir.', { speak: 'Birinci sporcunun hızı doğuya beş metre bölü saniyedir.' });
    c.note(`<b>Hız = ${c.M.frac('yer değiştirme', 'zaman')}</b> (${vh('v')} = ${vh('Δx')} / Δt); vektörel.<br>doğuya 250 m / 50 s = doğuya 5 m/s`, 'Hız', 'hiz');
  }

  /* ---- Sahne 3 · Hız büyüklük ve yönle söylenir ---- */
  async function buyuklukVeYon(c) {
    const svg = c.svg(1000, 562), sah = c.S('g', {}, svg), X1 = 840, X2 = 260;
    batiDogu(c, sah, 400, 50);
    yolSeridi(c, sah, 60, 940, 320, 40);
    const bis = c.S('g', {}, sah); bisiklet(c, bis);
    const koy = (x) => bis.setAttribute('transform', `translate(${x} 298) scale(-1 1)`); koy(X1);
    const kr = krono(c, sah, 800, 120);
    const yer = ok(c, sah, X1, 384, X1, 384, { renk: YER });
    const yerAd = gizli(yazi(c, sah, (X1 + X2) / 2, 424, 'batı, 100 m', { size: 26, renk: YER }));
    await c.say('Hız vektörel olduğu için iki bilgiyle söylenir: büyüklük ve yön.');
    await par(c.say('Bir bisikletli düz yolda 20 saniyede batıya 100 metre yer değiştiriyor.', { speak: 'Bir bisikletli düz yolda yirmi saniyede batıya yüz metre yer değiştiriyor.' }),
      c.tween(3800, (e) => { const x = lerp(X1, X2, e); koy(x); yer.ayarla(X1, 384, x, 384); kr.yaz(e * 20, e); }, ease.linear).then(() => belir(c, yerAd)));
    const bol = gizli(yazi(c, sah, 550, 500, '100 ÷ 20 = 5', { size: 34 }));
    await belir(c, bol);
    await c.say('Hızının büyüklüğü 100 ÷ 20 = 5 metre bölü saniye.', { speak: 'Hızının büyüklüğü yüz bölü yirmi eşittir beş metre bölü saniye.' });
    const hiz = ok(c, sah, X2 - 56, 252, X2 - 186, 252, { renk: YER, kalin: 7 });
    await okCiz(c, hiz, 700);
    await c.say('Yönü, yer değiştirmesinin yönü: batı.');
    const hAd = gizli(satir(c, sah, 560, 170, [{ vek: 'v', renk: YER }, { t: ': batı, 5 m/s', renk: YER }], { size: 30, ara: 3 }));
    await belir(c, hAd);
    await c.say('Bisikletlinin hızı batıya 5 metre bölü saniyedir.', { speak: 'Bisikletlinin hızı batıya beş metre bölü saniyedir.' });
    const hB = gizli(yazi(c, sah, 560, 226, 'v = 5 m/s', { size: 30 }));
    await belir(c, hB);
    await c.say('Hızın sembolü üstünde ok olan v’dir; büyüklüğü oksuz v ile yazılır.', { speak: 'Hızın sembolü üstünde ok olan ve’dir; büyüklüğü oksuz ve ile yazılır.' });
    await kaybol(c, sah);
    // Kurye: 50 m uzaktaki noktalar bir çember doldurur
    const kg = gizli(c.S('g', {}, svg)), CX = 500, CY = 290, R = 170, yon = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    daire(c, kg, CX, CY, R, { renk: RENK.soluk, kalin: 3 }).setAttribute('stroke-dasharray', '10 9');
    cizgi(c, kg, CX, CY, CX + R, CY, { renk: RENK.soluk, kalin: 2, kesik: '6 6' }); yazi(c, kg, CX + R / 2, CY - 12, '50 m', { size: 24, renk: RENK.soluk });
    yon.forEach(([dx, dy]) => yazi(c, kg, CX + dx * (R + 30), CY + dy * (R + 30) + 11, '?', { size: 34, renk: YOL }));
    const oklar = gizli(yon.map(([dx, dy]) => ok(c, kg, CX + dx * 20, CY + dy * 20, CX + dx * (R - 8), CY + dy * (R - 8), { renk: YER, kalin: 4, kesik: true })));
    c.S('circle', { cx: CX, cy: CY, r: 12, fill: RENK.yazi }, kg);
    await belir(c, kg);
    await c.choice({ tag: 'Düşün', q: 'Bir kurye için yalnızca “hızının büyüklüğü 5 m/s” deniyor. 10 saniye sonra nerede olacağı bulunur mu?',
      options: ['Bulunur; 50 m ötededir, yön önemli değil', 'Bulunamaz; hangi yöne gittiği de söylenmeli', 'Bulunur; 5 m/s demek yönü de söylemek demektir'], answer: 1,
      hints: ['50 m uzaktaki noktalar bir çember doldurur; yön söylenmeden hangisi olduğu bilinmez. Hız, büyüklük ve yönle tam söylenir.', '',
        '5 m/s yalnızca büyüklüktür; hızın tamamı için yön de eklenir: “kuzeye 5 m/s” gibi.'],
      right: 'Evet. Yön söylenmeden varılan nokta bilinmez.' });
    await belir(c, oklar);
    await c.say('Büyüklük “saniyede 5 metre” der; nereye olduğunu yön söyler.', { speak: 'Büyüklük saniyede beş metre der; nereye olduğunu yön söyler.' });
    const son = gizli([yazi(c, svg, 160, 200, 'sürat: 5 m/s', { size: 28, renk: YOL }), yazi(c, svg, 845, 200, 'hız: 5 m/s + yön', { size: 28, renk: YER })]);
    await belir(c, son);
    await c.say('Sürat tek sayıyla, hız büyüklük ve yönle söylenir.', { speak: 'Sürat tek sayıyla, [short pause] hız büyüklük ve yönle söylenir.' });
  }

  /* ---- Sahne 4 · Ortalama hız ---- */
  async function ortalamaHiz(c) {
    const svg = c.svg(1000, 562);
    // Öykü: yarıçapı 100 m olan çember (1 kare = 50 m)
    const g1 = c.S('g', {}, svg), iz1 = izgara(c, g1, { kare: 50, sutun: 8, satir: 6, x: 30, y: 40 }), [ox, oy] = iz1.P(4, 3);
    daire(c, g1, ox, oy, 100, { renk: RENK.cizgi, kalin: 2 });
    const m1 = c.S('g', {}, g1);
    c.S('circle', { cx: ox, cy: oy, r: 5, fill: RENK.yazi }, m1); yazi(c, m1, ox - 16, oy - 10, 'O', { size: 24 });
    cizgi(c, m1, ox, oy, ox + 100, oy, { renk: RENK.soluk, kalin: 2, kesik: '6 6' }); yazi(c, m1, ox + 56, oy - 10, '100 m', { size: 24, renk: RENK.soluk });
    const h1 = gizli(c.S('g', {}, g1));
    yazi(c, h1, ox - 122, oy + 9, 'A', { size: 26 }); yazi(c, h1, ox, oy - 114, 'B', { size: 26 }); yazi(c, h1, ox + 122, oy + 9, 'C', { size: 26 });
    const yay = izYol(c, g1, `M ${ox - 100} ${oy} A 100 100 0 0 1 ${ox + 100} ${oy}`);
    [ox - 100, ox + 100].forEach((x) => c.S('circle', { cx: x, cy: oy, r: 7, fill: RENK.yazi }, g1));
    const nk1 = c.S('circle', { cx: ox - 100, cy: oy, r: 10, fill: RENK.a, stroke: RENK.yazi, 'stroke-width': 2 }, g1);
    const ok1 = gizli(ok(c, g1, ox - 100, oy, ox + 100, oy, { renk: YER }));
    const ok1Ad = gizli(yazi(c, g1, ox, oy + 38, 'doğu, 200 m', { size: 24, renk: YER }));
    const kr1 = krono(c, g1, 180, 378), s1 = gizli(yazi(c, g1, 230, 445, '8 m/s', { size: 34, renk: YER }));
    yonGulu(c, svg, 490, 92, { r: 26, adlar: ['K', 'D', '', ''] });
    // Yusufhan: üç düz parça (1 kare = 10 m)
    const g2 = gizli(c.S('g', {}, svg)), iz2 = izgara(c, g2, { kare: 50, sutun: 8, satir: 6, x: 550, y: 40 });
    const [kx, ky] = iz2.P(3, 1), [lx, ly] = iz2.P(7, 1), [mx, my] = iz2.P(7, 4), [nx, ny] = iz2.P(3, 4);
    const taslak = yol(c, g2, `M ${kx} ${ky} L ${lx} ${ly} L ${mx} ${my} L ${nx} ${ny}`, { renk: RENK.soluk, kalin: 3 }); taslak.setAttribute('stroke-dasharray', '8 8');
    const uc = izYol(c, g2, `M ${kx} ${ky} L ${lx} ${ly} L ${mx} ${my} L ${nx} ${ny}`);
    [[kx, ky], [lx, ly], [mx, my], [nx, ny]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: RENK.yazi }, g2));
    yazi(c, g2, kx - 20, ky + 30, 'K', { size: 26 }); yazi(c, g2, lx + 20, ly + 30, 'L', { size: 26 }); yazi(c, g2, mx + 20, my - 8, 'M', { size: 26 }); yazi(c, g2, nx - 20, ny - 8, 'N', { size: 26 });
    const nk2 = c.S('circle', { cx: kx, cy: ky, r: 10, fill: RENK.a, stroke: RENK.yazi, 'stroke-width': 2 }, g2);
    const ok2 = gizli(ok(c, g2, kx, ky, nx, ny, { renk: YER }));
    const parca = gizli([yazi(c, g2, (kx + lx) / 2, ky + 30, '40 m', { size: 24, renk: YOL }), yazi(c, g2, lx + 12, (ly + my) / 2 + 8, '30 m', { size: 24, renk: YOL, hiza: 'start' }), yazi(c, g2, (mx + nx) / 2, my - 12, '40 m', { size: 24, renk: YOL })]);
    const ok2Ad = gizli(yazi(c, g2, kx - 14, (ky + ny) / 2 + 8, 'kuzey, 30 m', { size: 24, renk: YER, hiza: 'end' }));
    const kr2 = krono(c, g2, 700, 378), s2 = gizli(yazi(c, g2, 750, 445, '3 m/s', { size: 34, renk: YER }));

    await c.say('Öykü, yarıçapı 100 metre olan çembersel yolda bisiklet sürüyor.', { speak: 'Öykü, yarıçapı yüz metre olan çembersel yolda bisiklet sürüyor.' });
    await belir(c, h1);
    await par(c.say('A’dan yola çıkıp yarım tur atıyor ve tam karşıdaki C’ye varıyor.', { speak: 'a noktasından yola çıkıp yarım tur atıyor ve tam karşıdaki ce noktasına varıyor.' }), c.tween(3600, (e) => { yerlestir(nk1, yay.git(e)); kr1.yaz(e * 25, e); }, ease.linear));
    await okGoster(c, ok1, nk1); await belir(c, ok1Ad);
    await c.say('A ile C arası çemberin çapı kadar: yer değiştirmesi doğuya 200 metre.', { speak: 'a ile ce arası çemberin çapı kadar: yer değiştirmesi doğuya iki yüz metre.' });
    await belir(c, s1);
    await c.say('Yarım tur 25 saniye sürüyor; ortalama hızının büyüklüğü 8 metre bölü saniye.', { speak: 'Yarım tur yirmi beş saniye sürüyor; ortalama hızının büyüklüğü sekiz metre bölü saniye.' });
    await kaybol(c, [m1, h1, kr1]);
    await belir(c, g2);
    await c.say('Yusufhan ise üç düz parçadan oluşan bir yolda K’den N’ye gidiyor.', { speak: 'Yusufhan ise üç düz parçadan oluşan bir yolda ke noktasından ne noktasına gidiyor.' });
    await par(c.say('Doğuya 40, kuzeye 30, batıya 40 metre gidip N’ye varıyor.', { speak: 'Doğuya kırk, kuzeye otuz, batıya kırk metre gidip ne noktasına varıyor.' }),
      c.tween(3900, (e) => { yerlestir(nk2, uc.git(e)); kr2.yaz(e * 10, e); parca.forEach((p, i) => { if (e >= [4, 7, 11][i] / 11) p.style.opacity = 1; }); }, ease.linear));
    await okGoster(c, ok2, nk2); await belir(c, ok2Ad);
    await c.say('N noktası K’nin tam 30 metre kuzeyinde; yolculuk 10 saniye sürüyor.', { speak: 'Ne noktası, ke noktasının tam otuz metre kuzeyinde; yolculuk on saniye sürüyor.' });
    await belir(c, s2);
    await c.say('Onun ortalama hızının büyüklüğü 3 metre bölü saniye.', { speak: 'Onun ortalama hızının büyüklüğü üç metre bölü saniye.' });
    await c.choice({ tag: 'Düşün', q: 'Yusufhan 10 s’de 110 m yol aldı. Ortalama hızının büyüklüğü olan 3, hangi bölmeden çıkar?',
      options: ['110 ÷ 10', '40 ÷ 10', '30 ÷ 10'], answer: 2,
      hints: ['11 eder; bu, alınan yolun süreye bölümü, yani ortalama sürat. Ortalama hız yer değiştirmeden bulunur.',
        '4 eder; 40 m yolun yalnızca ilk parçası. Bütün hareketin yer değiştirmesi kuzeye 30 m.', ''],
      right: 'Evet. Yer değiştirme süreye bölünür.' });
    await kaybol(c, [kr2, ...parca]);
    gizli([s1, s2]); s1.textContent = '200 ÷ 25 = 8'; s2.textContent = '30 ÷ 10 = 3';
    await belir(c, [s1, s2]);
    await c.say('Öykü’de 200 ÷ 25 = 8, Yusufhan’da 30 ÷ 10 = 3.', { speak: 'Öykü’de iki yüz bölü yirmi beş eşittir sekiz, Yusufhan’da otuz bölü on eşittir üç.' });
    await par(c.say('İkisinde de bütün hareketin yer değiştirmesi hareket süresine bölündü.'), vurgula(c, [ok1, ok2], 1400));
    await c.say('Toplam yer değiştirmenin hareket süresine oranına ortalama hız denir.', { speak: 'Toplam yer değiştirmenin hareket süresine oranına [short pause] ortalama hız denir.' });
    await par(c.say('Ortalama hız vektöreldir; yönü yer değiştirmenin yönüdür.'), vurgula(c, [ok1, ok2], 1400));
    gizli([s1, s2]); s1.textContent = 'doğu, 8 m/s'; s2.textContent = 'kuzey, 3 m/s';
    await belir(c, [s1, s2]);
    await c.say('Öykü’nün ortalama hızı doğuya 8, Yusufhan’ınki kuzeye 3 metre bölü saniye.', { speak: 'Öykü’nün ortalama hızı doğuya sekiz, Yusufhan’ınki kuzeye üç metre bölü saniye.' });
    c.note(`<b>Ortalama hız = ${c.M.frac('toplam yer değiştirme', 'hareket süresi')}</b>; vektörel.<br>doğuya 200 m / 25 s = doğuya 8 m/s`, 'Ortalama hız', 'ortalama-hiz');
  }

  /* ---- Sahne 5 · Sürat ile hız ne zaman aynı büyüklükte? ---- */
  async function neZamanEsit(c) {
    const svg = c.svg(1000, 562), kg = c.S('g', {}, svg);
    const K = [110, 200], L = [270, 200], M = [270, 80], N = [110, 80];
    yol(c, kg, `M ${K} L ${L} L ${M} L ${N}`, { renk: YOL, kalin: 6 });
    ok(c, kg, K[0], K[1], N[0], N[1], { renk: YER });
    [K, L, M, N].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 6, fill: RENK.yazi }, kg));
    const harf = c.S('g', {}, kg);
    yazi(c, harf, K[0] - 20, K[1] + 26, 'K', { size: 24 }); yazi(c, harf, L[0] + 20, L[1] + 26, 'L', { size: 24 }); yazi(c, harf, M[0] + 20, M[1] - 6, 'M', { size: 24 }); yazi(c, harf, N[0] - 20, N[1] - 6, 'N', { size: 24 });
    const l1 = gizli(satir(c, svg, 350, 105, [{ t: 'ortalama sürat:', renk: YOL }, { ust: { t: '110 m', renk: YOL }, alt: { t: '10 s', renk: SURE } }, '=', { t: '11 m/s', renk: YOL, kalin: 700 }], { size: 28, hiza: 'start' }));
    const l2 = gizli(satir(c, svg, 350, 205, [{ t: 'ortalama hız:', renk: YER }, { ust: { t: '30 m', renk: YER }, alt: { t: '10 s', renk: SURE } }, '=', { t: '3 m/s, kuzey', renk: YER, kalin: 700 }], { size: 28, hiza: 'start' }));
    await belir(c, l1);
    await c.say('Yusufhan’ın ortalama sürati 110 ÷ 10 = 11 metre bölü saniye.', { speak: 'Yusufhan’ın ortalama sürati yüz on bölü on eşittir on bir metre bölü saniye.' });
    await belir(c, l2);
    await c.say('Ortalama hızının büyüklüğü ise 3’tü: aynı yolculuk, iki ayrı sayı.', { speak: 'Ortalama hızının büyüklüğü ise üçtü: aynı yolculuk, iki ayrı sayı.' });
    await c.say('Çünkü sürat alınan yoldan, hız yer değiştirmeden hesaplanır.', { speak: '[thoughtful] Çünkü sürat alınan yoldan, hız yer değiştirmeden hesaplanır.' });
    await kaybol(c, [l1, l2, harf]);
    const ozet = gizli([yazi(c, svg, 350, 122, 'sürat: 11 m/s', { size: 28, renk: YOL, hiza: 'start' }), yazi(c, svg, 350, 172, 'hız: 3 m/s', { size: 28, renk: YER, hiza: 'start' })]);
    // Düz yolda koşucu
    const dz = gizli(c.S('g', {}, svg)), sd = sayiDogrusu(c, dz, { x0: 120, x1: 880, y: 400, min: 0, max: 60, adim: 10, sayisiz: true });
    yazi(c, dz, sd.x(0), 442, '0', { size: 24, renk: RENK.soluk }); yazi(c, dz, sd.x(60), 442, '60 m', { size: 24, renk: RENK.soluk });
    const bant = cizgi(c, dz, sd.x(0), 400, sd.x(0), 400, { renk: YOL, kalin: 14 });
    const okY = gizli(ok(c, dz, sd.x(0), 400, sd.x(60), 400, { renk: YER, kalin: 5 }));
    const kos = c.S('g', {}, dz); insan(c, kos, 0, 0, { s: 0.8 });
    const koy = (m) => kos.setAttribute('transform', `translate(${sd.x(m)} 388)`); koy(0);
    const kr = krono(c, dz, 760, 300);
    await belir(c, [...ozet, dz]);
    await c.say('Şimdi düz yolda, hiç dönmeden doğuya 60 metre koşan birine bakalım.', { speak: 'Şimdi düz yolda, hiç dönmeden doğuya altmış metre koşan birine bakalım.' });
    await par(c.say('Koşusu 12 saniye sürüyor; aldığı yol 60 metre.', { speak: 'Koşusu on iki saniye sürüyor; aldığı yol altmış metre.' }), c.tween(3400, (e) => { koy(e * 60); bant.setAttribute('x2', sd.x(e * 60)); kr.yaz(e * 12, e); }, ease.linear));
    await okGoster(c, okY);
    await c.say('Yer değiştirmesi de doğuya 60 metre.', { speak: 'Yer değiştirmesi de doğuya altmış metre.' });
    const hes = gizli([yazi(c, svg, 290, 512, 'sürat: 60 ÷ 12 = 5', { size: 28, renk: YOL }), yazi(c, svg, 710, 512, 'hız: 60 ÷ 12 = 5', { size: 28, renk: YER })]);
    await belir(c, hes);
    await c.say('Ortalama sürati 60 ÷ 12 = 5; ortalama hızının büyüklüğü de 5.', { speak: 'Ortalama sürati altmış bölü on iki eşittir beş; ortalama hızının büyüklüğü de beş.' });
    await c.choice({ tag: 'Düşün', q: 'Hangi harekette ortalama hızın büyüklüğü ortalama sürate eşit olur?',
      options: ['Havuzda gidip geri dönen yüzücüde', 'Düz kaldırımda hiç dönmeden yürüyen çocukta', 'Çembersel yolda yarım tur atan bisikletlide', 'Hepsinde; ikisi her zaman eşittir'], answer: 1,
      hints: ['Geri dönünce yer değiştirme küçülür ama yol artmaya devam eder; hızın büyüklüğü süratten küçük kalır.', '',
        'Yarım çember, çaptan uzundur; yol yer değiştirmeden büyük olduğu için sürat daha büyük çıkar.',
        'Eşitlik yalnızca doğrusal yolda, yön değiştirmeden gidilirken olur; Yusufhan’da 11 ve 3 çıkmıştı.'],
      right: 'Evet. Düz yolda, dönmeden gidilirse ikisi eşittir.' });
    await c.say('Doğrusal yolda yön değiştirmeden giden cismin sürati, hızının büyüklüğüne eşittir.');
    await c.say('Yol kıvrılır ya da geri dönülürse hızın büyüklüğü süratten küçük kalır.');
    c.note('<b>Doğrusal yolda, yön değiştirmeden: sürat = hızın büyüklüğü.</b><br>60 m, 12 s → ikisi de 5 m/s', 'Sürat ile hız', 'surat-hiz');
  }

  /* ---- Sahne 6 · Başa dönünce: ortalama hız sıfır ---- */
  async function basaDonunce(c) {
    const svg = c.svg(1000, 562), ilk = c.S('g', {}, svg), hv = havuz(c, ilk);
    const yuz = (ms) => c.tween(ms, (e) => hv.koy(e * 100), ease.linear);
    await par(c.say('Havuzdaki yüzücüye dönelim: 100 metre yol aldı, 50 saniye sürdü.', { speak: 'Havuzdaki yüzücüye dönelim: yüz metre yol aldı, elli saniye sürdü.' }), yuz(4200));
    const l1 = gizli(satir(c, ilk, 500, 350, [{ t: 'ortalama sürat', renk: YOL }, '=', { ust: { t: '100 m', renk: YOL }, alt: { t: '50 s', renk: SURE } }, '=', { t: '2 m/s', renk: YOL, kalin: 700 }], { size: 30 }));
    await belir(c, l1);
    await c.say('Ortalama sürati 2 metre bölü saniyeydi.', { speak: 'Ortalama sürati iki metre bölü saniyeydi.' });
    const l2 = gizli(satir(c, ilk, 500, 470, [{ t: 'ortalama hız', renk: YER }, '=', { ust: { t: '0 m', renk: YER }, alt: { t: '50 s', renk: SURE } }, '=', { t: '0', renk: YER, kalin: 700 }], { size: 30 }));
    await belir(c, l2);
    await c.say('Yer değiştirmesi sıfır olduğu için ortalama hızı da sıfır.');
    await par(c.say('Oysa yüzücü 50 saniye boyunca hiç durmadı.', { speak: 'Oysa yüzücü elli saniye boyunca hiç durmadı.' }), yuz(3400));
    await c.choice({ tag: 'Düşün', q: 'Bir koşucunun koşu sonunda ortalama hızı sıfır çıktı. Hangisi kesin doğrudur?',
      options: ['Koşucu hiç hareket etmemiştir', 'Koşucunun ortalama sürati de sıfırdır', 'Koşucu başladığı noktaya dönmüştür'], answer: 2,
      hints: ['Yüzücü de 100 m yol aldı ama ortalama hızı sıfır çıktı; sıfır, hareket edilmediğini değil ilk ve son konumun aynı olduğunu söyler.',
        'Ortalama sürat alınan yoldan bulunur; koşucu yol aldıysa sürati sıfır olamaz.', ''],
      right: 'Evet. İlk ve son konumu aynı.' });
    await c.say('Ortalama hız yalnızca ilk ve son konuma bakar; aradaki yolu görmez.');
    await c.say('Ortalama hızın sıfır olması, cismin durduğu anlamına gelmez.', { speak: '[thoughtful] Ortalama hızın sıfır olması, cismin durduğu anlamına gelmez.' });
    await kaybol(c, ilk);

    // Dene: sayı doğrusunda koşucu; her görev 20 s
    const dn = gizli(c.S('g', {}, svg));
    batiDogu(c, dn, 500, 40);
    const sd = sayiDogrusu(c, dn, { x0: 100, x1: 900, y: 230, min: 0, max: 80, adim: 10, sayisiz: true }), X = sd.x;
    daire(c, dn, X(0), 230, 15, { renk: KONUM, kalin: 4 });
    yazi(c, dn, X(0), 320, '0', { size: 24, renk: RENK.soluk });
    const kr = krono(c, dn, 790, 112);
    const iz1 = cizgi(c, dn, X(0), 250, X(0), 250, { renk: YOL, kalin: 6 }), iz2 = cizgi(c, dn, X(0), 263, X(0), 263, { renk: YOL, kalin: 6 });
    const okY = ok(c, dn, X(0), 286, X(0), 286, { renk: YER });
    const bayrak = [0, 1].map(() => {
      const g = c.S('g', {}, dn); cizgi(c, g, 0, 0, 0, -68, { renk: RENK.yazi, kalin: 3 }); c.S('path', { d: 'M 0 -68 L 30 -57 L 0 -46 Z', fill: RENK.b }, g);
      g.ad = yazi(c, dn, 0, 320, '', { size: 24, renk: RENK.soluk }); return g;
    });
    const kos = c.S('g', {}, dn); insan(c, kos, 0, 0, { s: 0.8 });
    const GX = [70, 290, 510, 730], gozAd = ['alınan yol', 'ortalama sürat', 'yer değiştirme', 'ortalama hız'];
    const goz = GX.map((x, i) => {
      kutu(c, dn, x, 352, 200, 138, { renk: i < 2 ? YOL : YER });
      yazi(c, dn, x + 100, 394, gozAd[i], { size: 24, renk: RENK.soluk });
      return yazi(c, dn, x + 100, 454, '', { size: 28, renk: i < 2 ? YOL : YER });
    });
    const konum = (durak, e) => {
      const nok = [0, ...durak], b1 = Math.abs(nok[1]), b2 = nok.length > 2 ? Math.abs(nok[2] - nok[1]) : 0, git = e * (b1 + b2);
      const p = git <= b1 ? git : nok[1] + Math.sign(nok[2] - nok[1]) * (git - b1);
      iz1.setAttribute('x2', X(Math.min(git, b1)));
      iz2.style.display = git > b1 ? '' : 'none'; iz2.setAttribute('x1', X(nok[1])); iz2.setAttribute('x2', X(p));
      okY.ayarla(X(0), 286, X(p), 286); kos.setAttribute('transform', `translate(${X(p)} 222)`); kr.yaz(e * 20, e);
    };
    const kur = (durak) => {
      bayrak.forEach((b, i) => {
        const p = durak[i]; b.style.display = p ? '' : 'none';
        if (p) { b.setAttribute('transform', `translate(${X(p)} 230)`); b.ad.setAttribute('x', X(p)); }
        b.ad.textContent = p ? String(p) : '';
      });
      goz.forEach((g) => { g.textContent = ''; }); konum(durak, 0);
    };
    const gorevler = [
      { durak: [60], tarif: 'doğuya 60 m', deger: ['60 m', '3 m/s', 'doğuya 60 m', 'doğuya 3 m/s'],
        s1: { options: ['60 m; 3 m/s', '60 m; 80 m/s', '3 m; 60 m/s'], answer: 0, hints: ['', 'Sürat için yol süreye bölünür, toplanmaz: 60 ÷ 20.', 'Alınan yol 60 m; sürat için onu 20 saniyeye böl.'], right: 'Evet. 60 ÷ 20 = 3 m/s.' },
        s2: { options: ['Doğuya 60 m; doğuya 3 m/s', 'Doğuya 60 m; sıfır', 'Sıfır; sıfır'], answer: 0, hints: ['', 'Yer değiştirme sıfır değil; onu 20 saniyeye böl.', 'Koşucu başladığı yere dönmedi; 0’dan 60’a geldi.'], right: 'Evet. Hiç dönmedi; yol ile yer değiştirme aynı büyüklükte.' } },
      { durak: [60, 40], tarif: 'doğuya 60 m, sonra batıya 20 m', deger: ['80 m', '4 m/s', 'doğuya 40 m', 'doğuya 2 m/s'],
        s1: { options: ['40 m; 2 m/s', '80 m; 4 m/s', '80 m; 2 m/s'], answer: 1, hints: ['Yol için bölümler toplanır: 60 + 20.', '', 'Yol doğru; sürat için 80 metreyi 20 saniyeye böl.'], right: 'Evet. 60 + 20 = 80 m; 80 ÷ 20 = 4 m/s.' },
        s2: { options: ['Doğuya 80 m; doğuya 4 m/s', 'Doğuya 40 m; doğuya 2 m/s', 'Batıya 20 m; batıya 1 m/s'], answer: 1, hints: ['80 m alınan yol. Yer değiştirme ilk ve son konuma bakar: 0’dan 40’a.', '', 'Bu yalnızca dönüş bölümü. Bütün hareket 0’da başlayıp 40’ta bitti.'], right: 'Evet. Son konum 40 m doğuda; 40 ÷ 20 = 2 m/s.' } },
      { durak: [40, 0], tarif: 'doğuya 40 m, sonra batıya 40 m', deger: ['80 m', '4 m/s', '0 m', '0 m/s'],
        s1: { options: ['80 m; 4 m/s', '0 m; 0 m/s', '40 m; 2 m/s'], answer: 0, hints: ['', 'Başa dönmek koşulan yolu silmez: 40 + 40.', 'Dönüş de yola eklenir: 40 + 40.'], right: 'Evet. Yol 80 m, ortalama sürat 4 m/s.' },
        s2: { options: ['Doğuya 80 m; doğuya 4 m/s', 'Batıya 40 m; batıya 2 m/s', 'Sıfır; sıfır'], answer: 2, hints: ['80 m alınan yol. İlk ve son konum aynı nokta.', 'Bu yalnızca dönüş bölümü. Bütün hareket 0’da başlayıp 0’da bitti.', ''], right: 'Evet. Başa döndü; yer değiştirme de ortalama hız da sıfır.' } },
    ];
    await c.say('Her görevde dört gözü doldur.', { noWait: true });
    for (let n = 0; n < gorevler.length; n++) {
      const g = gorevler[n];
      kur(g.durak);
      await belir(c, dn, 300);
      await c.tween(2600, (e) => konum(g.durak, e), ease.linear);
      await c.choice({ tag: 'Sıra sende', q: `<b>${n + 1}. görev:</b> koşucu 20 saniyede ${g.tarif} koştu. Alınan yol ve ortalama sürat?`, ...g.s1 });
      goz[0].textContent = g.deger[0]; goz[1].textContent = g.deger[1];
      await c.choice({ tag: 'Sıra sende', q: `<b>${n + 1}. görev:</b> yer değiştirme ve ortalama hız?`, ...g.s2 });
      goz[2].textContent = g.deger[2]; goz[3].textContent = g.deger[3];
      await c.wait(1500);
    }
    await c.say('Üç görevde süre aynıydı; sürati yol, hızı yer değiştirme belirledi.');
    await c.say('Son iki görevde sürat aynı, ortalama hız farklı çıktı.');
  }

  /* ---- Sahne 7 · Anlık hız ---- */
  async function anlikHiz(c) {
    const svg = c.svg(1000, 562);
    batiDogu(c, svg, 200, 50);
    kutu(c, svg, 40, 235, 920, 100, { rx: 6, kalin: 2 }); cizgi(c, svg, 56, 285, 944, 285, { renk: RENK.soluk, kalin: 2, kesik: '18 14' });
    const car1 = c.S('g', {}, svg); araba(c, car1, 0, 0, { renk: RENK.a });
    const koy1 = (x) => car1.setAttribute('transform', `translate(${x} 328)`); koy1(180);
    const g1 = gosterge(c, svg, 190, 445, 78, { sayisiz: true, birim: ' ', renk: YOL });
    const d1 = gizli(yazi(c, svg, 290, 458, '60 km/h', { size: 30, renk: YOL, hiza: 'start' }));
    await par(g1.git(c, 60, 900), belir(c, d1, 900));
    await c.say('Sürat göstergesinde o an okunan değer anlık sürattı.');
    await c.say('Bir aracın göstergesi 60 kilometre bölü saati gösteriyor.', { speak: 'Bir aracın göstergesi altmış kilometre bölü saati gösteriyor.' });
    await par(c.say('Araç o anda doğu yönünde gidiyor.'), c.tween(2200, (e) => koy1(lerp(180, 330, e))));
    const ok1 = ok(c, svg, 384, 304, 504, 304, { renk: YER, kalin: 7 }), ad1 = gizli(yazi(c, svg, 480, 376, 'doğu, 60 km/h', { size: 26, renk: YER }));
    await okCiz(c, ok1, 700); await belir(c, ad1);
    await c.say('Aracın anlık hızı doğu yönünde 60 kilometre bölü saattir.', { speak: 'Aracın anlık hızı doğu yönünde altmış kilometre bölü saattir.' });
    ad1.textContent = 'anlık hız: doğu, 60 km/h';
    await c.say('Bir hareketlinin belirli bir andaki hızına anlık hız denir.', { speak: 'Bir hareketlinin belirli bir andaki hızına [short pause] anlık hız denir.' });
    d1.textContent = 'anlık sürat: 60 km/h';
    await c.say('Anlık hız vektöreldir; anlık sürat ise anlık hızın büyüklüğüdür.');
    // Karşı şeritte ikinci araç: gösterge aynı, yön zıt
    const iki = gizli(c.S('g', {}, svg));
    const car2 = c.S('g', {}, iki); araba(c, car2, 0, 0, { renk: RENK.b }); car2.setAttribute('transform', 'translate(720 280) scale(-1 1)');
    const g2 = gosterge(c, iki, 800, 120, 78, { sayisiz: true, birim: ' ', renk: YOL });
    yazi(c, iki, 700, 132, '60 km/h', { size: 30, renk: YOL, hiza: 'end' });
    const ok2 = gizli(ok(c, iki, 666, 256, 546, 256, { renk: YER, kalin: 7 }));
    await belir(c, iki); await g2.git(c, 60, 700);
    await okGoster(c, ok2);
    await c.choice({ tag: 'Düşün', q: 'İki aracın göstergesi de 60 km/h gösteriyor; biri doğuya, öteki batıya gidiyor. Hangisi doğru?',
      options: ['Anlık süratleri de anlık hızları da aynı', 'Anlık süratleri aynı, anlık hızları farklı', 'Anlık hızları aynı, anlık süratleri farklı'], answer: 1,
      hints: ['Göstergeler aynı olduğu için anlık süratler eşit; ama biri doğuya, öteki batıya gittiğinden anlık hızlar zıt yönlüdür.', '',
        'Tersine: göstergede okunan değer anlık sürattir ve ikisinde de 60 km/h; farklı olan yön, yani hız.'],
      right: 'Evet. Büyüklük aynı, yön zıt.' });
    const ad2 = gizli(yazi(c, svg, 560, 216, 'batı, 60 km/h', { size: 26, renk: YER }));
    await belir(c, ad2);
    await c.say('Gösterge yalnızca büyüklüğü verir; yönü aracın gittiği taraf söyler.');
  }

  /* ---- Sahne 8 · Anlık hız değişebilir ---- */
  async function degisebilir(c) {
    const svg = c.svg(1000, 562), sah = c.S('g', {}, svg), KOL = [200, 300, 440, 620, 820], OL = 7.5;
    yazi(c, sah, 30, 62, 'zaman (s)', { size: 24, renk: RENK.soluk, hiza: 'start' });
    const zaman = gizli(KOL.map((x, i) => yazi(c, sah, x, 62, String(i), { size: 26, renk: SURE })));
    const yon = c.S('g', {}, sah); yazi(c, yon, 850, 502, 'doğu', { size: 24, renk: RENK.soluk }); ok(c, yon, 888, 494, 946, 494, { renk: RENK.soluk, kalin: 3, uc: 10 });
    const aciklama = gizli(yazi(c, sah, 420, 502, 'sayılar: hız büyüklüğü (m/s)', { size: 24, renk: RENK.soluk }));
    const serit = (yb, harf, hizlar, renk) => {
      const g = c.S('g', {}, sah);
      cizgi(c, g, 150, yb + 3, 985, yb + 3, { kalin: 3 }); yazi(c, g, 80, yb - 6, harf, { size: 32 });
      const an = hizlar.map((v, i) => {
        const a = gizli(c.S('g', {}, g)), car = c.S('g', {}, a); araba(c, car, 0, 0, { s: 0.6, renk });
        car.setAttribute('transform', `translate(${KOL[i]} ${yb})`); a.car = car;
        if (v) ok(c, a, KOL[i] + 34, yb - 14, KOL[i] + 34 + v * OL, yb - 14, { renk: YER, kalin: 5, uc: 14 });
        yazi(c, a, KOL[i], yb - 48, String(v), { size: 28, renk: YER });
        return a;
      });
      const goster = (i, ms = 500) => par(belir(c, an[i], ms), c.tween(ms, (e) => an[i].car.setAttribute('transform', `translate(${lerp(KOL[Math.max(i - 1, 0)], KOL[i], e)} ${yb})`)));
      return { g, goster };
    };
    const K = serit(215, 'K', [0, 2, 4, 6, 8], RENK.a), L = serit(392, 'L', [0, 4, 8, 12, 16], RENK.b);
    gizli(L.g);
    const an = (s, i) => par(s.goster(i), belir(c, zaman[i], 400));
    await an(K, 0);
    await c.say('Düz bir yolda doğuya giden K aracının hızına her saniye bakalım.', { speak: 'Düz bir yolda doğuya giden ke aracının hızına her saniye bakalım.' });
    await belir(c, aciklama); await an(K, 1);
    await c.say('Başlangıçta duruyor; 1. saniyede hızının büyüklüğü 2 metre bölü saniye.', { speak: 'Başlangıçta duruyor; birinci saniyede hızının büyüklüğü iki metre bölü saniye.' });
    for (const i of [2, 3, 4]) await an(K, i);
    await c.say('Sonraki saniyelerde 4, 6 ve 8 metre bölü saniye.', { speak: 'Sonraki saniyelerde dört, altı ve sekiz metre bölü saniye.' });
    await belir(c, L.g, 300);
    for (let i = 0; i < 5; i++) await L.goster(i, 380);
    await c.say('Başka bir yoldaki L aracında değerler 0, 4, 8, 12 ve 16.', { speak: 'Başka bir yoldaki le aracında değerler sıfır, dört, sekiz, on iki ve on altı.' });
    await c.choice({ tag: 'Düşün', q: 'K aracının tablosundaki 6 m/s neyi söyler?',
      options: ['K aracının ilk 3 saniyedeki ortalama hızını', 'K aracının 3 saniyede aldığı yolu', 'K aracının 3. saniyedeki anlık hızının büyüklüğünü'], answer: 2,
      hints: ['Ortalama hız bütün yer değiştirmenin süreye bölümüdür; tablodaki değer tek bir ana, 3. saniyeye ait.', 'Yolun birimi metredir; 6 m/s bir hız büyüklüğüdür ve yalnızca o anı anlatır.', ''],
      right: 'Evet. Her sayı tek bir ana ait.' });
    await c.say('İki tabloda da her sayı tek bir andaki anlık hızın büyüklüğü.');
    await c.say('Anlık hız sabit kalmak zorunda değil; burada her saniye büyüyor.');
    await par(c.say('Yönü değişmiyor: iki araç da hep doğuya gidiyor.'), vurgula(c, yon, 1400));
    await c.say('Hızın zamanla nasıl değiştiği, hareketi anlatmanın bir sonraki adımıdır.');
    await kaybol(c, sah);
    const t = tablo(c, svg, { x: 90, y: 90, basliksiz: true, satir: 92, size: 28, sutunlar: [{ w: 240 }, { w: 580 }] });
    gizli(t.g);
    t.satir(['sürat', 'alınan yol / zaman; skaler'], { renkler: [YOL] }); t.satir(['hız', 'yer değiştirme / zaman; vektörel'], { renkler: [YER] });
    t.satir(['ortalama hız', 'toplam yer değiştirme / hareket süresi'], { renkler: [YER] }); t.satir(['anlık sürat', 'anlık hızın büyüklüğü'], { renkler: [YOL] });
    await belir(c, t.g);
    await c.say('Sürat “ne kadar hızlı” der, hız “nereye doğru”yu da söyler.');
    c.note('<b>Sürat:</b> alınan yol / zaman; skaler.<br><b>Hız:</b> yer değiştirme / zaman; vektörel.<br><b>Ortalama hız:</b> toplam yer değiştirme / hareket süresi.<br><b>Anlık sürat:</b> anlık hızın büyüklüğü.', 'Sürat ve hız', 'surat-ve-hiz');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e4', kicker: 'Konu E · Hareketin temel kavramları', title: 'Hız: yönü olan sürat', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Hız: yönü olan sürat', hook: 'Yüzücü havuzda gidip geldi ve başladığı duvara dokundu; sürati sıfır değildi, peki ortalama hızı?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Havuzda gidiş–dönüş', goal: 'Yer değiştirmeyi süreye bölünce ne çıktığını gör.', run: havuzda },
      { title: 'İki sporcu: hız', goal: 'Hızın yer değiştirme ve süreden nasıl bulunduğunu gör.', run: ikiSporcu },
      { title: 'Hız büyüklük ve yönle söylenir', goal: 'Hızı büyüklüğü ve yönüyle söyle.', run: buyuklukVeYon },
      { title: 'Ortalama hız', goal: 'Toplam yer değiştirmeyi hareket süresine böl.', run: ortalamaHiz },
      { title: 'Sürat ile hız ne zaman aynı büyüklükte?', goal: 'Sürat ile hızın büyüklüğünü karşılaştır.', run: neZamanEsit },
      { title: 'Başa dönünce: ortalama hız sıfır', goal: 'Üç koşuda dört niceliği bul.', run: basaDonunce },
      { title: 'Anlık hız', goal: 'Anlık hız ile anlık sürati ayır.', run: anlikHiz },
      { title: 'Anlık hız değişebilir', goal: 'Saniye saniye anlık hızı oku.', run: degisebilir },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir koşucu düz yolda doğuya 80 m gidip batıya 20 m geri dönüyor; hepsi 20 s sürüyor. Ortalama hızı nedir?', options: ['Doğuya 5 m/s', 'Doğuya 3 m/s', 'Batıya 1 m/s'], answer: 1,
        why: ['5 m/s, alınan yolun (100 m) süreye bölümüdür; bu ortalama sürattir.', 'Yer değiştirme doğuya 60 m: 60 ÷ 20 = 3 m/s.', 'Bu yalnızca dönüş parçasına bakmaktır; ortalama hız bütün hareketin yer değiştirmesinden bulunur.'], scene: 5 },
      { q: 'Çembersel pistte tam bir tur atıp başladığı noktada duran koşucunun ortalama hızı ile ortalama sürati için hangisi doğru?',
        options: ['İkisi eşittir; ikisi de aynı koşuyu anlatır', 'Ortalama hızı sıfır, ortalama sürati sıfırdan büyük', 'İkisi de sıfırdır'], answer: 1,
        why: ['Sürat alınan yoldan, hız yer değiştirmeden bulunur; tam turda bu ikisi farklıdır.', 'Tam turda yer değiştirme sıfır, alınan yol pistin çevresi kadardır.', 'Başa dönmek yolu sıfırlamaz; koşucu yol aldığı için ortalama sürati sıfır olamaz.'], scene: 5 },
      { q: 'Bir paten sporcusu düz pistte doğuya 50 m, sonra batıya 90 m, sonra yine doğuya 20 m gidiyor; hepsi 10 s sürüyor. Ortalama hızı nedir?',
        options: ['Batıya 16 m/s', 'Doğuya 2 m/s', 'Batıya 2 m/s'], answer: 2,
        why: ['16 m/s, alınan yolun (160 m) süreye bölümüdür; bu ortalama sürattir. Ortalama hız yer değiştirmeden bulunur.', 'Sayı doğru ama yön yanlış: 50 − 90 + 20 = −20, son konum başlangıcın batısında.', 'Son konum başlangıcın 20 m batısında; 20 ÷ 10 = 2, yani batıya 2 m/s.'], scene: 5 },
      { q: 'Poyraz ile Defne aynı 10 s boyunca koşuyor. Poyraz’ın ortalama hızı doğuya 4 m/s, Defne’ninki doğuya 2 m/s. Poyraz “Hızım büyük, demek ki daha çok yol aldım” diyor. Poyraz haklı mı?',
        options: ['Haksız; hız yer değiştirmeden bulunur, yolu kesin söylemez', 'Haklı; hızı büyük olan aynı sürede daha çok yol alır', 'Haksız; ortalama hızı küçük olanın yolu kesin daha fazladır'], answer: 0,
        why: ['Ortalama hız yer değiştirmeden bulunur; Defne geri dönüşlerle Poyraz’dan daha çok yol almış olabilir.', 'Hız büyükse yer değiştirme büyüktür; yol geri dönüşleri de içerdiği için büyük olmak zorunda değildir.', 'Kesin değil: ikisi de dönmeden düz koşsaydı yol, yer değiştirmeye eşit olur ve Poyraz’ınki daha uzun çıkardı.'], scene: 4 },
    ],
    summary: ['<b>Sürat “ne kadar hızlı” der, hız “nereye doğru”yu da söyler.</b>', 'Hız = yer değiştirme / zaman; vektöreldir, yönü yer değiştirmenin yönüdür.', 'Başa dönen cismin ortalama hızı sıfırdır; ortalama sürati sıfır değildir.'],
    nextLesson: { href: 'e5-ivme.html', label: 'Sonraki: İvme: hız değişiyorsa ›' },
  });
})();
