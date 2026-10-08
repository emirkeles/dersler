/* L2 — Yüzey gerilimi ve kılcallık
   Sıvının yüzeyi kohezyon yüzünden gergin bir zar gibi davranır (yüzey gerilimi); kohezyon büyüdükçe yüzey gerilimi büyür.
   İnce tüpte adezyon yeterince büyükse sıvı kendiliğinden yükselir (kılcallık). Suyun bitkide taşınması ve ince tüple kan alma bunlara dayanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/L-adezyon-ve-kohezyon.md ("L2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Değerler yalnızca verinin kendisidir (20 °C ve 25 °C ayrı sahnelerde); çubuklar ve oklar şematiktir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, sinifla } = window.KIT;
  const { GRI, damlaYuzey, kuvvetCubuklari, tup, kapliTup, yuzeyMolekulu, kureH2O, sivi4, cubuk4, kartTahtasi, kanTupu, bitkiSu } = window.KIT_L;
  const { lerp, ease } = Ders;

  const KUCUK = 0.3, ORTA = 0.62, BUYUK = 0.95;

  /* Su yüzeyi yan görünüşte: gövde ve yüzey çizgisi; dimples: ayak ya da cismin bastığı yerler [x, genişlik, derinlik]. */
  function suYuzeyi(c, p, o) {
    const g = c.S('g', {}, p), y = o.y, x0 = o.x0 || 40, x1 = o.x1 || 960;
    c.S('rect', { x: x0, y, width: x1 - x0, height: 560 - y - 14, fill: GRI.su, 'fill-opacity': 0.3 }, g);
    let d = `M${x0},${y}`;
    (o.cukur || []).forEach(([x, w, h]) => { d += ` L${x - w},${y} Q${x},${y + 2 * h} ${x + w},${y}`; });
    d += ` L${x1},${y}`;
    const yz = c.S('path', { d, fill: 'none', stroke: '#e8e8e8', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    return { g, yz };
  }
  function bocek(c, p, x, y, k = 1) {
    const g = c.S('g', k === 1 ? {} : { transform: `translate(${x},${y}) scale(${k}) translate(${-x},${-y})` }, p), govde = '#8a8a8a';
    [[-44, -36], [-16, -30], [16, -30], [44, -36]].forEach(([dx, dy]) => cizgi(c, g, [x + dx / 2.2, y - 38], [x + dx * 1.6, y + 4], '#bdbdbd', 4));
    c.S('ellipse', { cx: x, cy: y - 54, rx: 54, ry: 22, fill: govde, stroke: '#cfcfcf', 'stroke-width': 2.5 }, g);
    c.S('circle', { cx: x - 62, cy: y - 58, r: 14, fill: govde, stroke: '#cfcfcf', 'stroke-width': 2.5 }, g);
    return g;
  }
  function atas(c, p, x, y, k = 1) {
    const g = c.S('g', k === 1 ? {} : { transform: `translate(${x},${y}) scale(${k}) translate(${-x},${-y})` }, p);
    c.S('rect', { x: x - 62, y: y - 5, width: 124, height: 10, rx: 5, fill: '#b5b5b5', stroke: '#e0e0e0', 'stroke-width': 2 }, g);
    return g;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const s1 = c.S('g', {}, svg), s2 = c.S('g', {}, svg);
    damlaYuzey(c, s1, { cx: 500, y: 330, w: 440, ad: 'cam', t: 1 });
    // Sıvı ve yüzeyinden ayrılan moleküller.
    c.S('rect', { x: 280, y: 360, width: 440, height: 120, rx: 8, fill: GRI.su, 'fill-opacity': 0.45, stroke: '#8c8c8c', 'stroke-width': 2 }, s2);
    yazi(c, s2, 500, 432, 'sıvı', { size: 30, kalin: 700 });
    [[400, 250], [510, 214], [620, 262]].forEach(([x, y]) => {
      c.S('circle', { cx: x, cy: y, r: 17, fill: GRI.su, stroke: GRI.suK, 'stroke-width': 2 }, s2);
      ok(c, s2, [x, y + 44], [x, y + 22], GRI.acik, 4);
    });
    yazi(c, s2, 500, 150, 'buhar', { size: 30, kalin: 700, renk: RENK.soluk });
    gizle(s1, s2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Cam yüzeyde yayılan bir sıvıda hangi kuvvet baskındır?',
      options: ['Kohezyon', 'İkisi eşit', 'Adezyon'], answer: 2,
      hints: ['Yayılan sıvıda yüzeyle çekim, kendi içindeki çekimden büyüktür: adezyon baskındır.', 'Yayılan sıvıda yüzeyle çekim, kendi içindeki çekimden büyüktür: adezyon baskındır.', ''],
      right: 'Evet. Yayılan sıvıda adezyon baskındır.',
    });
    c.clearSay();
    await belir(c, s1, 400, 0);
    await belir(c, s2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Moleküller arası çekim zayıfladıkça sıvının buhar basıncı nasıl değişir?',
      options: ['Azalır', 'Artar', 'Değişmez'], answer: 1,
      hints: ['Çekim zayıflayınca buhar fazına geçen molekül artar; buhar basıncı yükselir.', '', 'Çekim zayıflayınca buhar fazına geçen molekül artar; buhar basıncı yükselir.'],
      right: 'Evet. Çekim zayıflayınca daha çok molekül buhara geçer.',
    });
    await belir(c, s2, 400, 0);
    await c.say('Bugün sıvı yüzeyinin neden gergin durduğuna bakacağız.');
  }

  /* ---- 2. Böcek ve ataş ---- */
  async function bocekAtas(c) {
    const svg = c.svg(1000, 562), Y = 340;
    const su = suYuzeyi(c, svg, { y: Y, cukur: [[94, 14, 9], [174, 14, 9], [266, 14, 9], [346, 14, 9], [720, 130, 12]] });
    const film = cizgi(c, svg, [40, Y], [960, Y], RENK.vurgu, 5); film.style.opacity = 0;
    const b = bocek(c, svg, 220, Y + 2, 1.8), a = atas(c, svg, 720, Y + 8, 1.8);
    const yoguk = yazi(c, svg, 720, Y - 70, 'yoğunluk: sudan fazla', { size: 26, kalin: 600 });
    const ad = yazi(c, svg, 500, Y + 110, 'yüzey gerilimi', { size: 36, kalin: 700, renk: RENK.vurgu });
    gizle(su.g, b, a, yoguk, ad);

    await par(c.say('Bir böcek, suyun yüzeyinde batmadan durabilir.'), belir(c, [su.g, b], 600));
    await par(c.say('Suya dikkatle bırakılan ataş da yüzeyde kalır.'), belir(c, a, 600));
    await par(c.say('Ataşın yoğunluğu suyunkinden fazladır; yine de batmaz.'), belir(c, yoguk, 500));
    await par(c.say('Su yüzeyi, gergin bir streç film gibi davranır.'), belir(c, film, 600));
    await par(c.say('Bu gerginliğe yüzey gerilimi denir.'), belir(c, ad, 600));
  }

  /* ---- 3. Yüzey gerilimi nereden gelir? ---- */
  async function nereden(c) {
    const svg = c.svg(1000, 562);
    const M = yuzeyMolekulu(c, svg, { cx: 400, y: 170 });
    const hepsi = (...x) => x.flat();
    gizle(M.bic, M.byz, M.icOk, M.yzOk, M.birlesik, M.sifir, M.et.ic, M.et.yz, M.et.koh, M.et.net, M.et.yzNet);

    await par(c.say('Sıvının iç kısmından bir molekül seçelim; çevresi başka moleküllerle dolu.'), belir(c, hepsi(M.bic, M.et.ic), 600));
    await par(c.say('Komşu moleküller onu kohezyonla kendilerine doğru çeker.'), belir(c, hepsi(M.icOk, M.et.koh), 600));
    await c.say('Sıvının içindeki molekül, her yönden eşit çekilir.');

    // Birlikte çöz: iç molekülün net kuvveti.
    c.clearSay();
    await belir(c, M.et.net, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'İçteki moleküle etki eden net kuvvet nasıl?',
      options: ['Yukarı yönlü', 'Sıfır; çekimler birbirini dengeler', 'Aşağı yönlü'], answer: 1,
      hints: ['Altı yönde de eşit çekim var.', '', 'Eşit çekimler birbirini dengeler; bağ da böyle kurulmuştu.'],
      right: 'Evet. Eşit çekimler birbirini dengeler.',
    });
    M.et.net.textContent = 'net kuvvet: sıfır';
    await belir(c, M.sifir, 400);
    await c.wait(500);

    // Yüzeydeki molekül.
    c.clearSay();
    await belir(c, hepsi(M.bic, M.icOk, M.et.ic, M.et.koh, M.et.net, M.sifir), 400, 0);
    await par(c.say('Yüzeydeki molekülün üstünde sıvı molekülü yoktur.'), belir(c, hepsi(M.byz, M.et.yz), 600));
    await par(c.say('Yüzeydeki molekül yalnızca yanlardan ve alttan çekilir.'), belir(c, M.yzOk, 600));

    // Soru: net kuvvet yönü.
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Yüzeydeki molekülün net kuvveti hangi yöndedir?',
      options: ['Yukarı doğru', 'Net kuvvet sıfırdır', 'Sıvının içine doğru'], answer: 2,
      hints: ['Üstten çekim yok; alttan ve yanlardan var.', 'Yan çekimler birbirini dengeler; alttaki kalır.', ''],
      right: 'Evet. Yan çekimler birbirini dengeler; alttaki kalır.',
    });
    await par(c.say('Yüzeydeki moleküller içeri girmeye çalışır; yüzey küçülür.'), (async () => {
      await par(belir(c, M.birlesik, 500), belir(c, M.et.yzNet, 500));
      await M.cek(1600);
    })());
    await c.say('Yüzey gerilimi, kohezyonun doğrudan sonucudur.');
    await c.say('Gergin yüzey, suyu dış kuvvetlere karşı dayanıklı yapar.');

    // Soru: ataş neden batmaz? (yanılgı)
    c.clearSay();
    await belir(c, svg, 450, 0);
    svg.remove();
    const s2 = c.svg(1000, 562), Y = 330;
    const su = suYuzeyi(c, s2, { y: Y, cukur: [[500, 130, 12]] });
    const film = cizgi(c, s2, [40, Y], [960, Y], RENK.vurgu, 5); film.style.opacity = 0;
    const a = atas(c, s2, 500, Y + 8, 1.8);
    yazi(c, s2, 500, Y - 64, 'yoğunluk: sudan fazla', { size: 26, kalin: 600 });
    gizle(su.g, a);
    await belir(c, [su.g, a], 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Yoğunluğu sudan fazla olan ataş, suda neden batmadan durur?',
      options: ['Ataş sudan hafif olduğu için', 'Yüzeydeki moleküller dışa doğru çekildiği için', 'Yüzey gerilimi suyun yüzeyini dış kuvvetlere dayanıklı yapar'], answer: 2,
      hints: ['Ataşın yoğunluğu sudan fazlaydı.', 'Yüzeydeki molekülün net kuvveti içe doğruydu.', ''],
      right: 'Evet. Gergin yüzey ataşı taşır.',
    });
    await par(c.say('Ataşı yüzey gerilimi taşır; sudan hafif olması gerekmez.'), belir(c, film, 600));
    c.note('<b>Yüzey gerilimi kohezyonun sonucudur; yüzey küçülmeye çalışır.</b> Örnek: su yüzeyinde ataş.', 'Yüzey gerilimi', 'yuzey-gerilimi');
  }

  /* ---- 4. Dört sıvının yüzey gerilimi ---- */
  async function dortSivi(c) {
    const svg = c.svg(1000, 562);
    const K = sivi4(c, svg, { y: 54 });
    const bas = yazi(c, svg, 500, 32, '20 °C · dyn/cm', { size: 24, kalin: 600, renk: RENK.soluk });
    const kart = [...K.kartlar.map((k) => k.g), bas];
    gizle(kart);
    const B = cubuk4(c, svg, {
      x: 250, y: 352, w: 420, max: 73, aralik: 56,
      satirlar: K.kartlar.map((k) => ({ ad: k.ad, deger: k.deger })),
    });
    const oka = c.S('g', {}, svg);
    ok(c, oka, [900, 330], [900, 520], RENK.cekme, 7);
    yazi(c, oka, 900, 306, 'kohezyon', { size: 24, kalin: 700, renk: RENK.cekme });
    gizle(oka);
    const sat = c.S('g', {}, svg);
    yazi(c, sat, 40, 330, 'su · 73 · kohezyon: en büyük', { hiza: 'start', size: 28, kalin: 600 });
    const q2 = renkli(c, sat, 40, 384, ['gliserin · 63 · kohezyon: ', ['?', RENK.vurgu]], { hiza: 'start', size: 28, kalin: 600 });
    gizle(sat);

    await par(c.say('Bir araştırmacı dört sıvının yüzey gerilimini 20 °C’ta ölçtü.', { speak: 'Bir araştırmacı dört sıvının yüzey gerilimini yirmi derecede ölçtü.' }), belir(c, kart, 700));
    await par(c.say('Su 73, gliserin 63, etil alkol 22, n-hekzan 18 dyn/cm çıktı.', { speak: 'Su yetmiş üç, gliserin altmış üç, etil alkol yirmi iki, n-hekzan on sekiz [short pause] din bölü santimetre çıktı.' }), (async () => {
      for (const k of K.kartlar) { await k.cevir(700); await c.wait(150); }
    })());
    await c.say('Yüzey gerilimi kohezyonun sonucudur.');
    await c.say('Yüzey gerilimi büyük olan sıvıda kohezyon da büyüktür.');

    // Birlikte çöz.
    c.clearSay();
    await belir(c, kart, 400, 0.1);
    await belir(c, sat, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Gliserinin kohezyonu suyunkine göre nasıl?',
      options: ['Daha büyük', 'Aynı', 'Daha küçük'], answer: 2,
      hints: ['63 ile 73’ü karşılaştır.', '63 ile 73 aynı değil.', ''],
      right: 'Evet. Yüzey gerilimi küçükse kohezyon da küçüktür.',
    });
    q2.textContent = ''; c.S('tspan', { text: 'gliserin · 63 · kohezyon: ' }, q2); const t = c.S('tspan', { text: 'daha küçük' }, q2); t.style.fill = RENK.cekme;
    await c.wait(500);

    // Soru.
    c.clearSay();
    await par(belir(c, sat, 400, 0), belir(c, kart, 400, 1));
    await c.choice({
      tag: 'Sıra sende', q: 'Etil alkol ile n-hekzandan hangisinin molekülleri birbirini daha çok çeker?',
      options: ['n-hekzan', 'İkisi eşit', 'Etil alkol'], answer: 2,
      hints: ['22 ile 18’i karşılaştır.', '22 ile 18 eşit değil.', ''],
      right: 'Evet. Yüzey gerilimi büyük olanda kohezyon büyüktür.',
    });

    // Gör: dört çubuk.
    c.clearSay();
    await par(c.say('Yüzey gerilimi azaldıkça kohezyon da azalır.'), (async () => {
      await belir(c, kart, 400, 0.1);
      for (let i = 0; i < 4; i++) await B.goster(i, 600);
      await belir(c, oka, 500);
    })());
  }

  /* ---- 5. Etkileşim türü ve kohezyon ---- */
  async function etkilesimTuru(c) {
    const svg = c.svg(1000, 562);
    const K = sivi4(c, svg, { y: 40, h: 150, degersiz: true });
    const B = cubuk4(c, svg, {
      x: 250, y: 300, w: 420, max: 73, aralik: 56,
      satirlar: K.kartlar.map((k) => ({ ad: k.ad, deger: k.deger })),
    });
    const ETK = [[true, 'hidrojen bağı'], [true, 'hidrojen bağı'], [true, 'hidrojen bağı'], [false, 'London']];
    // Kartların altında etkileşim türü; çubuklar gelince aynı türler çubukların yanına geçer.
    const altE = c.S('g', {}, svg), yanE = c.S('g', {}, svg);
    const altO = ETK.map(([h, ad], i) => {
      const k = K.kartlar[i], g = c.S('g', {}, altE);
      cizgi(c, g, [k.cx - 40, 222], [k.cx + 40, 222], RENK.cekme, h ? 8 : 2.5);
      yazi(c, g, k.cx, 256, ad, { size: 22, kalin: 600, renk: RENK.cekme });
      g.style.opacity = 0; return g;
    });
    ETK.forEach(([h, ad], i) => {
      const y = B.sat[i].y;
      cizgi(c, yanE, [740, y], [800, y], RENK.cekme, h ? 8 : 2.5);
      yazi(c, yanE, 814, y + 8, ad, { hiza: 'start', size: 22, kalin: 600, renk: RENK.cekme });
    });
    gizle(yanE, B.g);

    await par(c.say('Su, etil alkol ve gliserinin moleküllerinde O–H bağı vardır.', { speak: 'Su, etil alkol ve gliserinin moleküllerinde O H bağı vardır.' }), par(...K.kartlar.map((k) => k.cerceve(true))));
    await par(c.say('Bu üç sıvının molekülleri arasında hidrojen bağı kurulur.'), belir(c, altO.slice(0, 3), 600));
    await par(c.say('n-hekzan apolardır; moleküller arasında yalnızca London kuvveti vardır.'), belir(c, altO[3], 600));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Moleküller arasında yalnızca London kuvveti olan n-hekzanın kohezyonu, hidrojen bağlı üç sıvıya göre nasıl?',
      options: ['Daha büyüktür', 'Aynıdır', 'Daha küçüktür'], answer: 2,
      hints: ['n-hekzanın yüzey gerilimi en küçüktü.', 'n-hekzanın 18’i, ötekilerden küçük.', ''],
      right: 'Evet. Yüzey gerilimi küçükse kohezyon da küçüktür.',
    });
    await par(c.say('Moleküller arası etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar.'), (async () => {
      B.tamam(0);
      await par(belir(c, [...K.kartlar.map((k) => k.g), altE], 400, 0.1), belir(c, [yanE, B.g], 400, 1));
      await belir(c, B.sat.map((q) => q.e), 600, 1);
    })());
    c.note('<b>Etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar.</b> Örnek: su &gt; n-hekzan.', 'Etkileşim ve yüzey gerilimi', 'etkilesim-yuzey-gerilimi');
  }

  /* ---- 6. Kılcallık ---- */
  async function kilcallik(c) {
    const svg = c.svg(1000, 562);
    const YK = 330, alt = c.S('g', {}, svg);
    const L = kapliTup(c, alt, { x: 200, yK: YK, sivi: 'su' }), R = kapliTup(c, alt, { x: 700, yK: YK, sivi: 'civa' });
    const et = c.S('g', {}, svg);
    const e1 = c.S('g', {}, et), e2 = c.S('g', {}, et);
    renkli(c, e1, 250, 60, ['su · 25 °C · ', ['72 dyn/cm', RENK.vurgu]], { size: 24, kalin: 600 });
    renkli(c, e2, 750, 60, ['cıva · 25 °C · ', ['480 dyn/cm', RENK.vurgu]], { size: 24, kalin: 600 });
    yazi(c, alt, 200, 500, 'su', { size: 28, kalin: 700 }); yazi(c, alt, 700, 500, 'cıva', { size: 28, kalin: 700 });
    const cL = kuvvetCubuklari(c, alt, { x: 395, y: 440, h: 130 }), cR = kuvvetCubuklari(c, alt, { x: 885, y: 440, h: 130 });
    const kil = yazi(c, svg, 500, 100, 'kılcallık', { size: 36, kalin: 700, renk: RENK.vurgu });
    gizle(e1, e2, alt, kil);

    await par(c.say('Cıvanın yüzey gerilimi 25 °C’ta 480 dyn/cm’dir.', { speak: 'Cıvanın yüzey gerilimi yirmi beş derecede dört yüz seksen din bölü santimetredir.' }), belir(c, e2, 600));
    await par(c.say('Suyun yüzey gerilimi ise 72 dyn/cm’dir.', { speak: 'Suyun yüzey gerilimi ise yetmiş iki din bölü santimetredir.' }), belir(c, e1, 600));
    await c.say('Cıvanın atomları arasındaki çekim, suyunkinden çok büyüktür.');
    await par(c.say('Cam yüzeyde su yayılır; cıva damla kalır.'), (async () => {
      await belir(c, alt, 600);
      await par(cL.git(BUYUK, KUCUK + 0.1, 800), cR.git(KUCUK, BUYUK, 800));
    })());
    await par(c.say('İnce tüpte su kendiliğinden yükselir; cıva ise alçalır.'), par(L.git(1, 1800), R.git(1, 1800)));
    await c.say('İnce tüpte adezyon yeterince büyükse sıvı kendiliğinden yükselir.');
    await par(c.say('Bu olaya kılcallık denir.'), belir(c, kil, 500));
    await c.say('Adezyon kohezyondan zayıfsa sıvı çok az yükselir ya da alçalır.');

    // Birlikte çöz.
    c.clearSay();
    await par(belir(c, [alt, kil, e1, e2], 450, 0));
    const sat = c.S('g', {}, svg);
    yazi(c, sat, 100, 230, 'su tüpte yükselir → adezyon büyük', { hiza: 'start', size: 32, kalin: 600 });
    const q2 = renkli(c, sat, 100, 300, ['cıva tüpte alçalır → ', ['?', RENK.vurgu]], { hiza: 'start', size: 32, kalin: 600 });
    gizle(sat); await belir(c, sat, 450);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Cıva tüpte alçalıyor. Hangi kuvvet büyüktür?',
      options: ['Adezyon', 'İkisi eşit', 'Kohezyon'], answer: 2,
      hints: ['Adezyon büyük olsaydı sıvı yükselirdi.', 'Eşitse sıvı ne yükselir ne alçalırdı.', ''],
      right: 'Evet. Cıva camda yayılmıyordu; kohezyon baskın.',
    });
    q2.textContent = ''; c.S('tspan', { text: 'cıva tüpte alçalır → ' }, q2); const t = c.S('tspan', { text: 'kohezyon büyük' }, q2); t.style.fill = RENK.cekme;
    await c.wait(600);

    // Dene: sıvıyı değiştir.
    c.clearSay();
    await belir(c, sat, 400, 0);
    svg.remove();
    const s2 = c.svg(1000, 562);
    const D = kapliTup(c, s2, { x: 300, yK: 330, sivi: 'su', e: 0 });
    const cb = kuvvetCubuklari(c, s2, { x: 740, y: 450, h: 150 });
    const baslik = c.S('g', {}, s2), bs = renkli(c, baslik, 500, 60, ['su · 25 °C · ', ['72 dyn/cm', RENK.vurgu]], { size: 28, kalin: 600 });
    const durum = yazi(c, s2, 300, 500, 'tüpte yükselir, içbükey', { size: 28, kalin: 700 });
    let sira = 0; const goruldu = new Set([0]);
    // İki tüp de çizili durur; kaydırıcı hangisinin görüneceğini seçer.
    const Dc = kapliTup(c, s2, { x: 300, yK: 330, sivi: 'civa', e: 0 });
    Dc.g.style.opacity = 0;
    const DUR = [
      { ad: 'Su', t: D, ot: Dc, a: BUYUK, k: KUCUK + 0.1, yaz: 'tüpte yükselir, içbükey', ust: ['su · 25 °C · ', ['72 dyn/cm', RENK.vurgu]] },
      { ad: 'Cıva', t: Dc, ot: D, a: KUCUK, k: BUYUK, yaz: 'tüpte alçalır, dışbükey', ust: ['cıva · 25 °C · ', ['480 dyn/cm', RENK.vurgu]] },
    ];
    cb.ayarla(BUYUK, KUCUK + 0.1);
    gizle(D.g, cb.g, baslik, durum);
    await belir(c, [D.g, cb.g, baslik, durum], 500);
    await D.git(1, 1200);
    await c.say('Sıvıyı değiştir; tüpteki seviyeye ve yüzeyin eğimine bak.', { noWait: true });
    const konumla = (v) => {
      const q = DUR[v], j = ++sira, a0 = cb.deger().a, k0 = cb.deger().k;
      goruldu.add(v);
      q.ot.g.style.opacity = 0; q.t.g.style.opacity = 1; q.t.ayarla(0);
      durum.textContent = q.yaz; window.KIT.parcaKoy(c, bs, q.ust);
      c.tween(1200, (e) => { if (j !== sira) return; q.t.ayarla(e); cb.ayarla(lerp(a0, q.a, e), lerp(k0, q.k, e)); }, ease.inOut).catch((err) => { if (!(err instanceof Ders.Cancelled)) throw err; });
    };
    const sl = c.slider({ tag: 'Dene', label: 'Sıvı', min: 0, max: 1, step: 1, value: 0, fmt: (v) => DUR[v].ad, onInput: (v) => { if (v !== 0 || sira) konumla(v); } });
    await c.cont('Devam ›');
    if (!goruldu.has(1)) { sl.set(1); await c.wait(1700); }
    c.clearAct();

    // Soru.
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();
    const s3 = c.svg(1000, 562);
    const T = tup(c, s3, { x: 500, y: 130, h: 260, w: 100, e: 0, dolgu: 0.5 });
    yazi(c, s3, 500, 100, 'ince cam tüp', { size: 26, kalin: 600 });
    const yz = yazi(c, s3, 500, 450, '', { size: 30, kalin: 700 });
    gizle(T.g);
    await belir(c, T.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir sıvı ince cam tüpte kendiliğinden yükseliyor. Yüzeyi tüpte nasıl durur?',
      options: ['Dışbükey', 'Düz', 'İçbükey'], answer: 2,
      hints: ['Sıvı yükseliyorsa hangi kuvvet büyük?', 'Düz yüzey, kuvvetlerin eşit olduğu durumdur.', ''],
      right: 'Evet. Adezyon büyükse yüzey içe kavislenir.',
    });
    await par(c.say('Yükselen sıvı, tüpte içbükey durur.'), T.git(0.95, 1200));
    yz.textContent = 'içbükey';
    c.note('<b>İnce tüpte adezyon büyükse sıvı yükselir: kılcallık.</b> Örnek: su, cam tüp.', 'Kılcallık', 'kilcallik');
  }

  /* ---- 7. Suyun canlılardaki rolü ---- */
  async function canlilar(c) {
    const svg = c.svg(1000, 562);
    const kan = c.S('g', {}, svg);
    const KT = kanTupu(c, kan, { x: 170, y: 340, tuyH: 170 });
    const kanAd = yazi(c, kan, 170, 520, 'kan alma', { size: 26, kalin: 700 });
    const kanEt = yazi(c, kan, 214, 332, 'kan', { hiza: 'start', size: 24, kalin: 600 });
    const B = bitkiSu(c, svg, { x: 560, yTaban: 470, yUst: 160, bx: 780, by: 290, br: 100 });
    const ad = c.S('g', {}, svg);
    yazi(c, ad, 560, 112, 'yaprak', { size: 24, kalin: 600 });
    yazi(c, ad, 536, 330, 'gövde', { hiza: 'end', size: 24, kalin: 600 });
    yazi(c, ad, 676, 520, 'kök', { hiza: 'start', size: 24, kalin: 600 });
    const duvar = yazi(c, svg, 780, 424, 'hücre duvarı', { size: 22, kalin: 600 });
    const yukari = ok(c, svg, [610, 420], [610, 190], GRI.acik, 6).g;
    gizle(kan, B.bitki, B.buyutme, B.bag, B.koh, B.adh, B.et.koh, B.et.adh, ad, duvar, yukari);

    await par(c.say('Sağlık görevlisi, parmağından kanı ince bir tüple alır.'), belir(c, kan, 600));
    await par(c.say('Tüpün ucu kana değince kan tüpe kılcallıkla çıkar.'), KT.yuksel(1, 2200));
    await par(c.say('Aynı güç suyun bitkide kökten yaprağa taşınmasında da rol oynar.'), par(belir(c, kan, 500, 0.25), belir(c, [B.bitki, ad], 700)));
    await par(c.say('Su molekülleri birbirine ve hücre duvarlarına yapışır.'), (async () => {
      await belir(c, [B.buyutme, ...B.bag, duvar], 600);
      await belir(c, [B.koh, B.et.koh], 500);
      await belir(c, [B.adh, B.et.adh], 500);
    })());
    await par(c.say('Kohezyon ve adezyon, suyu yer çekimine karşı yapraklara çıkarır.'), belir(c, yukari, 600));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bitkide su moleküllerinin hücre duvarlarına tutunmasını hangi kuvvet sağlar?',
      options: ['Kohezyon', 'Yüzey gerilimi', 'Adezyon'], answer: 2,
      hints: ['Su ile hücre duvarı farklı maddeler; aynı tür moleküller arasındaki çekim kohezyondu.', 'Su ile hücre duvarı farklı maddeler.', ''],
      right: 'Evet. Farklı maddeler arasındaki çekim adezyondur.',
    });
    await c.say('Suyun bu özellikleri bitkinin hayatta kalmasını sağlar.');
  }

  /* ---- 8. Etkileşimi bilinen sıvıyı tahmin et ---- */
  async function tahmin(c) {
    const svg = c.svg(1000, 562), Y = 190;
    const X = damlaYuzey(c, svg, { cx: 170, y: Y, w: 280, a: 62, h: 74 });
    const Yd = damlaYuzey(c, svg, { cx: 500, y: Y, w: 280, a: 126, h: 22 });
    const Z = damlaYuzey(c, svg, { cx: 830, y: Y, w: 280, a: 46, h: 108 });
    const harf = [['X', 170], ['Y', 500], ['Z', 830]].map(([h, x]) => yazi(c, svg, x, Y + 82, h, { size: 34, kalin: 700 }));
    const ust = yazi(c, svg, 500, 44, 'biri polar · biri apolar · biri hidrojen bağı yapar', { size: 26, kalin: 600 });
    const kutular = [
      { baslik: 'X', x: 30, y: 360, w: 300, h: 185 },
      { baslik: 'Y', x: 350, y: 360, w: 300, h: 185 },
      { baslik: 'Z', x: 670, y: 360, w: 300, h: 185 },
    ];
    const grup = c.S('g', {}, svg);
    gizle(X.g, Yd.g, Z.g, harf, ust);

    const kt = kartTahtasi(c, grup, {
      kutular, aralik: 40,
      ciz: (k, g) => { kutu(c, g, 110, 262, 780, 70, { rx: 14 }); yazi(c, g, 500, 308, k.metin, { size: 26, kalin: 600 }); },
      chip: (k, p, x, y) => yazi(c, p, x, y + 0, k.chip, { size: 22, kalin: 600 }),
    });
    // Kutular kartlarla birlikte açılır; ilk anlatımda gizli durur.
    gizle(grup);

    await par(c.say('Eşit hacimli X, Y, Z sıvıları aynı cam yüzeye damlatıldı.'), belir(c, [X.g, Yd.g, Z.g, ...harf], 700));
    await par(c.say('Biri polar, biri apolar, biri hidrojen bağı kurar.'), belir(c, ust, 500));
    await c.say('Damla ne kadar yuvarlaksa, sıvının kohezyonu o kadar baskındır.');
    await par(c.say('Damla ne kadar yayılırsa, adezyon o kadar baskındır.'), belir(c, grup, 600));

    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Hangi sıvı?`, kutular: ['X', 'Y', 'Z'],
      kartlar: [
        { metin: 'Yüzeyi en çok ıslatır.', chip: 'en çok ıslatır', kutu: 1, neden: 'En çok yayılan damlada adezyon baskındır.', ipucu: 'En çok yayılan damla hangisi?' },
        { metin: 'Molekülleri arasında hidrojen bağı vardır.', chip: 'hidrojen bağı', kutu: 2, neden: 'En yuvarlak damla en büyük kohezyonu gösterir; en güçlü etkileşim hidrojen bağıdır.', ipucu: 'En güçlü etkileşim hangi damlada?' },
        { metin: 'Molekülleri arasında yalnızca London kuvveti vardır.', chip: 'yalnızca London', kutu: 1, neden: 'Kohezyonu en küçük sıvıda etkileşim en zayıftır.', ipucu: 'En zayıf etkileşimde kohezyon en küçük.' },
        { metin: 'Cam tüpte içbükey durur.', chip: 'tüpte içbükey', kutu: 1, neden: 'Adezyonu baskın sıvı tüpte içbükey durur.', ipucu: 'İçbükeylik hangi kuvvetin baskın olduğunu gösterir?' },
        { metin: 'Yüzey gerilimi en büyüktür.', chip: 'gerilim en büyük', kutu: 2, neden: 'Kohezyonu en büyük sıvıda yüzey gerilimi de en büyüktür.', ipucu: 'Kohezyonu en büyük sıvı hangisi?' },
        { metin: 'Su yüzeyinde yürüyen bir böcek en kolay bunda yürür.', chip: 'böcek en kolay', kutu: 2, neden: 'Yüzey gerilimi en büyük sıvının yüzeyi en dayanıklıdır.', ipucu: 'Yüzeyi en dayanıklı sıvı hangisi?' },
        { metin: 'Molekülleri arasında dipol-dipol etkileşimi vardır.', chip: 'dipol-dipol', kutu: 0, neden: 'Biri hidrojen bağlı, biri apolar; kalan polar sıvı X’tir.', ipucu: 'Hidrojen bağlı ve apolar olanı çıkar; kalan hangisi?' },
      ],
      sec: kt.sec, yerlestir: kt.yerlestir,
    });

    // Gör: tablo.
    c.clearSay();
    await belir(c, svg, 450, 0);
    svg.remove();
    const s2 = c.svg(1000, 562);
    const COL = [540, 710, 880], Y0 = 40, SAT = 66, tab = c.S('g', {}, s2);
    ['X', 'Y', 'Z'].forEach((h, i) => yazi(c, tab, COL[i], Y0, h, { size: 30, kalin: 700 }));
    cizgi(c, tab, [24, Y0 + 14], [976, Y0 + 14], RENK.kenarlik, 2);
    const SATIR = [
      ['etkileşim', 'dipol-dipol', 'London', 'hidrojen bağı'],
      ['kohezyon', 'orta', 'en küçük', 'en büyük'],
      ['yüzey gerilimi', 'orta', 'en küçük', 'en büyük'],
      ['adezyon, cam ile', 'orta', 'en büyük', 'en küçük'],
      ['cam üstünde', 'Y ile Z arasında', 'yayılır', 'yuvarlak kalır'],
      ['tüpte', 'Y ile Z arasında', 'içbükey', 'dışbükey'],
      ['ince tüpte', 'Y ile Z arasında', 'yükselir', ['az yükselir', 'ya da alçalır']],
    ];
    const gs = SATIR.map((r, i) => {
      const g = c.S('g', {}, tab), y = Y0 + 50 + i * SAT;
      yazi(c, g, 30, y, r[0], { hiza: 'start', size: 22, kalin: 700, renk: RENK.soluk });
      [1, 2, 3].forEach((j) => {
        const m = r[j];
        if (Array.isArray(m)) m.forEach((s, k) => yazi(c, g, COL[j - 1], y - 10 + k * 26, s, { size: 21, kalin: 600 }));
        else yazi(c, g, COL[j - 1], y, m, { size: 21, kalin: 600 });
      });
      cizgi(c, g, [24, y + 22], [976, y + 22], RENK.kenarlik, 1.2);
      g.style.opacity = 0; return g;
    });
    for (let i = 0; i < gs.length; i++) await belir(c, gs[i], 350);
    await c.say('Etkileşim güçlüyse kohezyon ve yüzey gerilimi büyüktür.');
  }

  Ders.start({
    id: 'cesitlilik-l2', kicker: 'Konu L · Adezyon ve kohezyon', title: 'Yüzey gerilimi ve kılcallık', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Yüzey gerilimi ve kılcallık',
      hook: 'Bir böcek suyun üzerinde batmadan nasıl durur?',
      button: 'Derse başla ›',
    },
    goals: [
      'Yüzey gerilimini kohezyonun bir sonucu olarak açıklar.',
      'Moleküller arası etkileşimi ile yüzey gerilimi arasındaki ilişkiyi söyler.',
      'Kılcallığı adezyon ve kohezyonla ilişkilendirir.',
      'Suyun canlılardaki rolünü bu özelliklerle bağlar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Adezyon baskınlığını ve buhar basıncını hatırla.', run: hatirla },
      { title: 'Böcek ve ataş', goal: 'Suyun yüzeyinin neden gergin davrandığını gör.', run: bocekAtas },
      { title: 'Yüzey gerilimi nereden gelir?', goal: 'İç ve yüzey molekülüne etkiyen kuvvetleri karşılaştır.', run: nereden },
      { title: 'Dört sıvının yüzey gerilimi', goal: 'Yüzey gerilimi verilerini kohezyonla ilişkilendir.', run: dortSivi },
      { title: 'Etkileşim türü ve kohezyon', goal: 'Etkileşim türünü yüzey gerilimiyle ilişkilendir.', run: etkilesimTuru },
      { title: 'Kılcallık: su yükselir, cıva alçalır', goal: 'İnce tüpte sıvının yükselmesini ya da alçalmasını adezyonla açıkla.', run: kilcallik },
      { title: 'Suyun canlılardaki rolü', goal: 'Kılcallığın kan almada ve bitkide suyun taşınmasındaki rolünü gör.', run: canlilar },
      { title: 'Etkileşimi bilinen sıvıyı tahmin et', goal: 'Damla biçiminden sıvının özelliklerini tahmin et.', run: tahmin },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yüzey gerilimi hangi kuvvetin sonucudur?',
        options: ['Yer çekimi', 'Kohezyon', 'Adezyon'], answer: 1,
        why: ['Yüzey gerilimi moleküller arası çekimden gelir, yer çekiminden değil.', 'Yüzeydeki moleküller yalnızca alttan ve yanlardan çekilir; bu kohezyonun sonucudur.', 'Adezyon farklı maddeler arasındadır; yüzey gerilimi sıvının kendi moleküllerinden gelir.'], scene: 2 },
      { q: 'Hangisi doğrudur?',
        options: ['Yüzey gerilimi yalnızca böcekler için vardır', 'Yüzey gerilimi, sudan yoğun bir nesneyi de yüzeyde tutabilir', 'Su yüzeyinde yalnızca sudan hafif nesneler durabilir'], answer: 1,
        why: ['Yüzey gerilimi bütün sıvıların yüzeyinde vardır.', 'Ataş sudan yoğundur; yine de gergin yüzey onu taşır.', 'Ataşın yoğunluğu sudan fazladır, buna rağmen yüzeyde kalır.'], scene: 1 },
      { q: 'K sıvısının molekülleri arasında hidrojen bağı, L sıvısının moleküllerinde yalnızca London kuvveti var. Hangisinin yüzey gerilimi büyüktür?',
        options: ['L’nin', 'İkisinin eşittir', 'K’nin'], answer: 2,
        why: ['London kuvveti daha zayıf; L’nin kohezyonu ve yüzey gerilimi daha küçüktür.', 'Etkileşimleri farklı olduğu için kohezyonları da farklıdır.', 'Hidrojen bağı daha güçlü etkileşimdir; kohezyon ve yüzey gerilimi daha büyüktür.'], scene: 4 },
      { q: 'Bir sıvı ince cam tüpte kabın seviyesinin altına iniyor. Hangisi doğrudur?',
        options: ['Adezyon, kohezyondan büyüktür', 'Kuvvetler eşittir', 'Kohezyon, adezyondan büyüktür'], answer: 2,
        why: ['Adezyon büyük olsaydı sıvı tüpte yükselirdi.', 'Eşit olsaydı sıvı ne yükselir ne alçalırdı.', 'Cıva gibi kohezyonu baskın sıvı tüpte alçalır.'], scene: 5 },
      { q: 'Bir böcek 20 °C’ta n-hekzan (18 dyn/cm) ve su (73 dyn/cm) yüzeylerinde yürümeye çalışıyor. Hangisinde daha kolay yürür?',
        options: ['n-hekzanda', 'İkisinde aynı', 'Suda'], answer: 2,
        why: ['n-hekzanın yüzey gerilimi küçük; yüzeyi daha az dayanıklıdır.', 'Yüzey gerilimleri farklı olduğu için yüzeyin dayanıklılığı da farklıdır.', 'Suyun yüzey gerilimi daha büyük; yüzeyi daha dayanıklıdır.'], scene: 3 },
    ],
    summary: [
      'Yüzey gerilimi kohezyonun sonucudur; yüzey küçülmeye çalışır.',
      'Etkileşim güçlendikçe kohezyon ve yüzey gerilimi artar.',
      'İnce tüpte adezyon büyükse sıvı yükselir.',
      '<b>Yüzeyi kohezyon gerer; ince boruda sıvıyı adezyon tırmandırır.</b>',
    ],
    nextLesson: { href: 'l3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
