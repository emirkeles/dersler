/* J1 — Kaynama: buhar basıncı dış basınca eşitlenince
   Su yalnızca 100 °C'ta kaynamaz: sıvı, buhar basıncı yüzeyine etki eden dış basınca eşit olduğu sıcaklıkta kaynar;
   dış basınç değişirse kaynama noktası da değişir.
   Senaryo: plan/kimya/cesitlilik/senaryolar/J-kaynama-sicakligi.md ("J1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Basınç okları şematiktir (kalınlık yalnızca büyüklük sırasını gösterir); grafik eğrisi ölçekli bir ilişki iddiasında değildir. */
(() => {
  'use strict';
  const { RENK, rastgele, yazi, cizgi, kutu, gizle, belir, par, isaret } = window.KIT;
  const { GRI, DIS, IC, EGRI, KAY, dolas, kap, manzara, sirinca, kabarcikModeli, buharGrafigi, kaynamaDeney, iddiaCercevesi, okK, suMol } = window.KIT_J;
  const { ease } = Ders;

  /* Okunur etiket: koyu zeminli küçük kutu içinde yazı. */
  const pill = (c, p, x, y, metin, renk = RENK.yazi, size = 22) => {
    const g = c.S('g', {}, p), w = metin.length * size * 0.54 + 26;
    c.S('rect', { x: x - w / 2, y: y - size * 0.95, width: w, height: size * 1.5, rx: 8, fill: GRI.tahta, 'fill-opacity': 0.92, stroke: renk, 'stroke-opacity': 0.7, 'stroke-width': 2 }, g);
    yazi(c, g, x, y + 3, metin, { size, kalin: 700, renk });
    return g;
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), d = dolas(c), rnd = rastgele(8);
    const s1 = c.S('g', {}, svg), s2 = c.S('g', {}, svg), s3 = c.S('g', {}, svg);
    // 1) Sıcaklığı yükselen kapalı kap.
    const K1 = kap(c, s1, { x: 340, y: 150, w: 320, h: 250, su: 0.45, kapak: true, termo: 0.3, alev: 1, tohum: 3 });
    for (let i = 0; i < 6; i++) { const m = suMol(c, s1, 10); m.setAttribute('transform', `translate(${375 + rnd() * 170},${190 + rnd() * 70}) rotate(${rnd() * 120 - 60})`); }
    // 2) Kapalı kapta buharın çeperlere çarpması.
    const K2 = kap(c, s2, { x: 300, y: 130, w: 400, h: 280, su: 0.35, kapak: true, tohum: 6 });
    const duvar = (P, Q) => cizgi(c, s2, P, Q, RENK.vurgu, 5);
    [[420, 165, 'ust'], [610, 190, 'sag'], [340, 215, 'sol'], [560, 150, 'ust'], [480, 270, 'sol']].forEach(([x, y, w]) => {
      const m = suMol(c, s2, 11); m.setAttribute('transform', `translate(${w === 'sol' ? 330 : w === 'sag' ? 668 : x},${w === 'ust' ? 150 : y}) rotate(${rnd() * 120 - 60})`);
      cizgi(c, s2, [w === 'sol' ? 330 : w === 'sag' ? 668 : x, w === 'ust' ? 150 : y], [x, y], GRI.molekul, 3, { 'stroke-opacity': 0.5 });
    });
    duvar([312, 195], [312, 235]); duvar([688, 170], [688, 210]); duvar([400, 124], [440, 124]); duvar([590, 124], [630, 124]);
    // 3) Kaynayan su, bugünün konusu.
    const K3 = kap(c, s3, { x: 360, y: 170, w: 280, h: 220, su: 0.64, kabarcik: 9, alev: 1, tohum: 5 });
    d.ekle(K3);
    gizle(s1, s2, s3);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Aynı sıvının sıcaklığı yükseltiliyor. Denge buhar basıncı nasıl değişir?',
      options: ['Azalır', 'Artar', 'Değişmez'], answer: 1,
      hints: ['Sıcaklık artınca buhar fazına geçen molekül sayısı artar; buhar basıncı yükselir.', '', 'Sıcaklık artınca buhar fazına geçen molekül sayısı artar; buhar basıncı yükselir.'],
      right: 'Evet. Sıcaklık arttıkça buhar basıncı yükselir.',
    });
    c.clearSay();
    await belir(c, s1, 400, 0);
    await belir(c, s2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Buhar basıncı nasıl oluşur?',
      options: ['Sıvı moleküllerinin kabın tabanına çarpmasıyla', 'Kapağın sıvıyı itmesiyle', 'Buhar moleküllerinin kabın çeperlerine çarpmasıyla'], answer: 2,
      hints: ['Buhar molekülleri çeperlere çarpar; bu çarpmaların basıncı buhar basıncıdır.', 'Buhar molekülleri çeperlere çarpar; bu çarpmaların basıncı buhar basıncıdır.', ''],
      right: 'Evet. Buhar basıncı, buharın çeperlere çarpmasıdır.',
    });
    c.clearSay();
    await belir(c, s2, 400, 0);
    await par(c.say('Bugün sıvıların hangi sıcaklıkta kaynadığına bakacağız.', { speak: '[curious] Bugün sıvıların hangi sıcaklıkta kaynadığına bakacağız.' }), belir(c, s3, 600, 1));
  }

  /* ---- 2. Yaklaşık 50 °C'ta kaynayan su ---- */
  async function elli(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const B = kap(c, svg, { x: 90, y: 190, w: 230, h: 200, su: 0.62, termo: 0.4, alev: 1, tohum: 5 });
    d.ekle(B);
    const l1 = yazi(c, svg, 205, 150, 'yaklaşık 50 °C', { size: 28, kalin: 700, renk: RENK.vurgu });
    const S = sirinca(c, svg, { x: 690, y: 490, k: 0.78, pull: 0, kab: 0, ok: 0.85 });
    d.ekle(S);
    const gec = okK(c, svg, [345, 300], [545, 300], DIS, 6).g;
    const l2 = yazi(c, svg, 300, 330, 'yaklaşık 50 °C', { size: 28, kalin: 700, renk: RENK.vurgu });
    const yz = pill(c, svg, 760, 350, 'yüzeydeki basınç');
    const son = pill(c, svg, 190, 430, 'sıcaklık + basınç', RENK.vurgu, 24);
    gizle(B.g, l1, S.g, gec, l2, yz, son);

    await par(c.say('Bir öğretmen suyu beherde yaklaşık 50 °C’a kadar ısıttı.', { speak: 'Bir öğretmen suyu beherde yaklaşık elli dereceye kadar ısıttı.' }), belir(c, [B.g, l1], 600));
    await par(c.say('Bir şırıngaya biraz su çekip havasını boşalttı.'), belir(c, [gec, S.g], 600));
    await par(c.say('Şırınganın ucunu parmağıyla sıkıca kapattı.'), belir(c, S.parmak, 500));
    // Şırınga büyür, beher çekilir.
    c.clearSay();
    await par(belir(c, [B.g, l1, gec], 500, 0), S.git({ x: 500, y: 490, k: 0.9 }, 900));
    await belir(c, l2, 400, 1);

    await c.choice({
      tag: 'Tahmin et', q: 'Öğretmen şırınganın pistonunu geri çekiyor. Yaklaşık 50 °C’taki su ne yapar?',
      options: ['Donar', 'Kaynar', 'Hiçbir şey olmaz'], answer: 1,
      hints: ['Pistonu çekince şırınganın içi genişliyor; suyun üstündeki basınç azalır ve su kaynar.', '', 'Isıtıcı yok; yine de pistonu çekince suyun üstündeki basınç azalır ve su kaynar.'],
      right: 'Evet. Basınç azalınca su yaklaşık 50 °C’ta bile kaynar.',
    });
    c.clearSay();
    await par(c.say('Su yaklaşık 50 °C’ta kaynadı; kaynamak için 100 °C şart değil.', { speak: 'Su yaklaşık elli derecede kaynadı; kaynamak için yüz derece şart değil.' }), S.git({ pull: 1, kab: 7, ok: 0.1 }, 2800));
    await par(c.say('Pistonu çekince suyun yüzeyine etki eden basınç azaldı.'), belir(c, yz, 450, 1), c.wait(900));
    await par(c.say('Demek ki kaynama, sıcaklığın yanında basınca da bağlıdır.', { speak: '[thoughtful] Demek ki kaynama, sıcaklığın yanında basınca da bağlıdır.' }), belir(c, son, 450, 1));
  }

  /* ---- 3. Kabarcığın içinde ne var? ---- */
  async function icinde(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const B = kap(c, svg, { x: 30, y: 170, w: 220, h: 250, su: 0.7, kabarcik: 5, alev: 1, oklar: 0.5, okOp: 0, tohum: 4 });
    d.ekle(B);
    const zoom = c.S('g', {}, svg);
    cizgi(c, zoom, [158, 303], [310, 36], GRI.cam, 2, { 'stroke-dasharray': '5 6' }); cizgi(c, zoom, [158, 357], [310, 526], GRI.cam, 2, { 'stroke-dasharray': '5 6' });
    c.S('circle', { cx: 140, cy: 330, r: 30, fill: 'none', stroke: GRI.acik, 'stroke-width': 3 }, zoom);
    const M = kabarcikModeli(c, svg, { x: 310, y: 36, w: 660, h: 490, aralik: 66, iz: 5, tohum: 4 });
    const pIc = pill(c, svg, M.C[0], M.C[1] + 62, 'iç basınç', '#b3bad1'), pDis = pill(c, svg, M.C[0], 68, 'dış basınç', DIS);
    const pK = pill(c, svg, 140, 505, 'kaynama', RENK.vurgu);
    gizle(B.g, zoom, M.g, pIc, pDis, pK);

    await par(c.say('Su ısınınca molekülleri daha hızlı hareket eder.'), belir(c, [B.g, zoom, M.g], 600), M.git({ iz: 22 }, 1800));
    await par(c.say('İç kısımdaki bazı moleküller çekimi aşıp buhar olur.'), M.git({ b: 1, iz: 24 }, 1800));
    await par(c.say('Hızlı buhar molekülleri çevresindeki sıvıyı iterek bir kabarcık açar.'), M.git({ s: 1 }, 2400));
    await par(c.say('Kabarcığın içindeki buharın basıncına iç basınç diyelim.'), M.git({ icOp: 1 }, 600), belir(c, pIc, 500, 1));
    await par(c.say('Sıvının yüzeyine havanın ve buharın uyguladığı basınç, dış basınçtır.'), M.git({ disOp: 1 }, 600), B.okOp(1, 600), belir(c, pDis, 500, 1));
    await par(c.say('Kabarcıklar yüzeye çıkar; bu olaya kaynama denir.'), B.kabarcik(12, 1200), belir(c, pK, 500, 1));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Kabarcığın içindeki basıncı ne oluşturur?',
      options: ['Sıvı moleküllerinin çarpması', 'Kabın ağırlığı', 'Buhar moleküllerinin çarpması'], answer: 2,
      hints: ['Kabarcığın içinde sıvı yok, buhar var; basıncı buhar moleküllerinin çarpması oluşturur.', 'Kabarcığın içinde buhar var; basınç, moleküllerin çarpmasından doğar.', ''],
      right: 'Evet. Kabarcığın içindeki basıncı buhar molekülleri oluşturur.',
    });
    await par(c.say('İç basınç, kabarcığın içindeki buharın basıncıdır.'), M.git({ disOp: 0.25, ic: 0.9 }, 900), belir(c, pDis, 500, 0.25));
  }

  /* ---- 4. Dış basınç kabarcığı yönetir ---- */
  async function yonetir(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const durum = { s: 0.6, b: 1, iz: 14, icOp: 1, disOp: 1, ic: 0.5, dis: 0.35 };
    const L = kabarcikModeli(c, svg, Object.assign({ x: 30, y: 96, w: 455, h: 330, aralik: 58, tohum: 4 }, durum));
    const R = kabarcikModeli(c, svg, Object.assign({ x: 515, y: 96, w: 455, h: 330, aralik: 58, tohum: 7 }, durum));
    const tL = yazi(c, svg, 257, 66, 'dış basınç artar', { size: 26, kalin: 700 }), tR = yazi(c, svg, 742, 66, 'dış basınç azalır', { size: 26, kalin: 700 });
    const xL = c.S('g', {}, svg), xR = c.S('g', {}, svg);
    isaret(c, xL, L.C[0], L.C[1], 'no', 24); isaret(c, xR, R.C[0], R.C[1] - 6, 'ok', 24);
    const eL = yazi(c, svg, 257, 472, 'oluşamaz', { size: 28, kalin: 700 }), eR = yazi(c, svg, 742, 472, 'kaynama', { size: 28, kalin: 700 });
    gizle(L.g, R.g, tL, tR, xL, xR, eL, eR);

    await par(c.say('Dış basınç artarsa kabarcıktaki buhar sıkışır.'), belir(c, [L.g, R.g, tL, tR], 600), L.git({ dis: 1, s: 0.4 }, 2000));
    await par(c.say('Buhar molekülleri yaklaşır; kabarcık küçülüp kaybolur.'), L.git({ s: 0, b: 0, icOp: 0 }, 2400));
    await par(c.say('Dış basınçtan küçük iç basınçlı kabarcık oluşamaz.'), belir(c, [xL, eL], 500, 1));
    await par(c.say('Dış basınç azalırsa buhar yayılır ve kabarcık oluşur.'), R.git({ dis: 0.08, s: 1 }, 2600));
    await par(c.say('Böyle bir sıvı kaynamaya başlar.'), belir(c, [xR, eR], 500, 1));

    // Birlikte çöz: şırınga.
    c.clearSay();
    await belir(c, [L.g, R.g, tL, tR, xL, xR, eL, eR], 450, 0);
    const S = sirinca(c, svg, { x: 250, y: 500, k: 0.88, pull: 1, kab: 7, ok: 0.1, parmak: true, tohum: 5 });
    d.ekle(S);
    const t = c.S('g', {}, svg);
    yazi(c, t, 700, 150, 'piston çekildi', { size: 30, kalin: 700 });
    okK(c, t, [700, 175], [700, 225], DIS, 6);
    yazi(c, t, 700, 268, 'şırınganın içi genişledi', { size: 30, kalin: 700 });
    yazi(c, t, 700, 360, 'suyun yüzeyine etki eden basınç:', { size: 26, kalin: 600 });
    const soru = yazi(c, t, 700, 430, '?', { size: 56, kalin: 700, renk: RENK.vurgu });
    gizle(S.g, t);
    await belir(c, [S.g, t], 600, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Piston çekilince suyun yüzeyine etki eden basınç nasıl değişti?',
      options: ['Arttı', 'Azaldı', 'Değişmedi'], answer: 1,
      hints: ['Pistonu çekince şırınganın içi genişliyor; basınç artmaz.', '', 'Basınç azalınca kabarcıklar oluşuyordu; demek ki basınç değişti.'],
      right: 'Evet. İç hacim genişleyince yüzeydeki basınç azalır.',
    });
    await belir(c, soru, 250, 0);
    soru.textContent = 'azaldı'; soru.setAttribute('font-size', 44);
    await par(belir(c, soru, 350, 1), c.say('Şırıngada dış basınç azaldı; su bu yüzden 50 °C’ta kaynadı.', { speak: 'Şırıngada dış basınç azaldı; su bu yüzden elli derecede kaynadı.' }));

    // Sor: dış basınç artarsa.
    c.clearSay();
    await belir(c, [S.g, t], 450, 0);
    const M = kabarcikModeli(c, svg, { x: 250, y: 40, w: 500, h: 470, aralik: 58, s: 1, b: 1, iz: 18, icOp: 1, disOp: 1, ic: 0.55, dis: 0.2, tohum: 6 });
    const pd = pill(c, svg, M.C[0], 66, 'dış basınç', DIS);
    gizle(M.g, pd); await belir(c, [M.g, pd], 500, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Kabarcıklı bir kaba dışarıdan uygulanan basınç artırılıyor. Kabarcığa ne olur?',
      options: ['Büyür', 'Küçülür', 'Değişmez'], answer: 1,
      hints: ['Dış basınç buharı sıkıştırır; kabarcık büyümez.', '', 'Dış basınç artınca buhar sıkışır; kabarcık aynı kalmaz.'],
      right: 'Evet. Dış basınç buharı sıkıştırır, kabarcık küçülür.',
    });
    await par(c.say('Dış basınç yüksekse kabarcık oluşamaz, kaynama gecikir.'), M.git({ dis: 1 }, 800).then(() => M.git({ s: 0, b: 0, icOp: 0 }, 2800)));
  }

  /* ---- 5. Grafik: buhar basıncı dış basınca eşitlenir ---- */
  async function grafik(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const gg = c.S('g', {}, svg), G = buharGrafigi(c, gg);
    const D = manzara(c, svg, 'deniz', 670, 20), E = manzara(c, svg, 'dag', 670, 290, { tohum: 12 });
    d.ekle(D); d.ekle(E);
    const lD = yazi(c, svg, 820, 44, 'deniz seviyesi', { size: 22, kalin: 700 }), lE = yazi(c, svg, 820, 314, 'Everest’in zirvesi', { size: 22, kalin: 700 });
    const esit = pill(c, gg, 400, 40, 'buhar basıncı = dış basınç', RENK.vurgu, 22);
    const kay = pill(c, gg, G.k[0].xi / 2 + G.k[1].xi / 2 + 4, 520, 'kaynama noktası', RENK.vurgu, 22);
    const br = c.S('g', {}, gg), bx0 = G.k[1].xi, bx1 = G.k[0].xi, by = 430 + 44;
    cizgi(c, br, [bx0, by], [bx1, by], RENK.vurgu, 3); cizgi(c, br, [bx0, by - 8], [bx0, by + 8], RENK.vurgu, 3); cizgi(c, br, [bx1, by - 8], [bx1, by + 8], RENK.vurgu, 3);
    const ay = c.S('g', {}, gg);
    okK(c, ay, [bx1 - 6, by + 22], [bx0 + 6, by + 22], RENK.vurgu, 5);
    okK(c, ay, [G.tx(28), G.py(760) + 6], [G.tx(28), G.py(228) - 6], RENK.vurgu, 5);
    gizle(D.kok, E.kok, lD, lE, esit, kay, br, ay);

    await par(c.say('Eğri, suyun buhar basıncının sıcaklıkla arttığını gösterir.'), G.egriCiz(2000));
    await par(c.say('Deniz seviyesinde su 100 °C’ta kaynar; dış basınç 1 atm’dir.', { speak: 'Deniz seviyesinde su yüz derecede kaynar; dış basınç bir atmosferdir.' }), belir(c, [D.kok, lD], 600, 1));
    await par(c.say('Bir atmosfer, 760 mmHg’ye eşittir.', { speak: 'Bir atmosfer, yedi yüz altmış milimetre cıvaya eşittir.' }), belir(c, G.k[0].yat, 600, 1));
    await par(c.say('Grafikte 100 °C’ın karşılığı 760 mmHg’dir.', { speak: 'Grafikte yüz derecenin karşılığı yedi yüz altmış milimetre cıvadır.' }), belir(c, [G.k[0].dus, G.k[0].nokta], 700, 1));

    c.clearSay();
    await belir(c, [E.kok, lE], 600, 1);
    await c.choice({
      tag: 'Tahmin et', q: 'Everest’in zirvesinde dış basınç 0,3 atm; su 70 °C’ta kaynar. Bu sıcaklıkta suyun buhar basıncı kaç atm’dir?',
      options: ['1 atm', '0,3 atm', '0,7 atm'], answer: 1,
      hints: ['Deniz seviyesinde kaynarken buhar basıncı ile dış basınç nasıldı? Aynı örüntü burada da geçerli.', '', 'Deniz seviyesinde kaynarken buhar basıncı dış basınca eşitti; burada da öyle.'],
      right: 'Evet. Kaynarken buhar basıncı dış basınca eşittir.',
    });
    await par(belir(c, G.k[1].yat, 600, 1), belir(c, [G.k[1].dus, G.k[1].nokta], 700, 1));
    await c.wait(500);
    await belir(c, [D.kok, lD, E.kok, lE], 500, 0);
    await par(c.say('İki yerde de kaynarken buhar basıncı dış basınca eşit.'), belir(c, esit, 500, 1));
    await par(c.say('Su, buhar basıncı dış basınca eşit olduğu sıcaklıkta kaynar.', { speak: '[thoughtful] Su, buhar basıncı dış basınca eşit olduğu sıcaklıkta kaynar.' }),
      c.tween(1000, (e) => G.k.forEach((q) => q.nokta.firstChild.setAttribute('r', 12 + 7 * Math.sin(Math.PI * e)))));
    await par(c.say('Bu sıcaklığa kaynama noktası denir.'), belir(c, esit, 300, 0).then(() => belir(c, [kay, br], 500, 1)));
    await par(c.say('Dış basınç düşünce kaynama noktası da düşer.'), belir(c, ay, 600, 1));

    await c.choice({
      tag: 'Sıra sende', q: 'Dış basıncın 1 atm olduğu bir kapta su kaynıyor. Kabarcıktaki buharın basıncı kaç atm’dir?',
      options: ['100 atm', '0,3 atm', '1 atm'], answer: 2,
      hints: ['100, kaynama sıcaklığıydı; basınç değil.', 'Kaynarken buhar basıncı dış basınca eşittir; dış basınç 1 atm.', ''],
      right: 'Evet. Kaynarken buhar basıncı dış basınca, yani 1 atm’e eşittir.',
    });

    // Saf sıvı kaynarken sıcaklık değişmez.
    c.clearSay();
    await belir(c, gg, 500, 0);
    const P = kap(c, svg, { x: 120, y: 170, w: 300, h: 250, su: 0.65, kabarcik: 10, alev: 1, termo: 0.65, tohum: 3 });
    d.ekle(P);
    const lt = yazi(c, svg, 120 + 300 * 0.74, 140, '100 °C', { size: 26, kalin: 700, renk: RENK.vurgu });
    const mg = c.S('g', {}, svg);
    cizgi(c, mg, [620, 440], [620, 150], GRI.cam, 3); cizgi(c, mg, [620, 440], [940, 440], GRI.cam, 3);
    cizgi(c, mg, [620, 290], [920, 290], EGRI, 5);
    yazi(c, mg, 780, 484, 'zaman', { size: 22, kalin: 600, renk: RENK.soluk });
    const ys = yazi(c, mg, 590, 295, 'sıcaklık', { size: 22, kalin: 600, renk: RENK.soluk }); ys.setAttribute('transform', 'rotate(-90 590 295)');
    gizle(P.g, lt, mg);
    await par(c.say('Saf sıvı, sabit basınçta kaynarken sıcaklığı değişmez.'), belir(c, [P.g, lt, mg], 600, 1));
    c.clearSay();
    await belir(c, [P.g, lt, mg], 450, 0);
    const M = kabarcikModeli(c, svg, { x: 140, y: 30, w: 720, h: 400, aralik: 60, iz: 12, tohum: 3 });
    const isi = c.S('g', {}, svg);
    [300, 500, 700].forEach((x) => okK(c, isi, [x, 520], [x, 452], RENK.vurgu, 9));
    yazi(c, isi, 800, 500, 'ısı', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(M.g, isi);
    await belir(c, [M.g, isi], 500, 1);
    await par(c.say('Verilen ısı, sıvı moleküllerinin arasındaki çekimi kırmaya gider.'), M.git({ b: 1, iz: 26 }, 2600));
    c.note('<b>Kaynama: buhar basıncı = dış basınç.</b> Örnek: 1 atm, 100 °C.', 'Kaynama noktası', 'kaynama-noktasi');
  }

  /* ---- 6. Dış basınç ve kaynama sıcaklığı: veriyi düzenle ---- */
  async function veri(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const D = kaynamaDeney(c, svg, { dolas: d });
    gizle(D.kapG, D.tb, D.gr);
    await par(c.say('Bir araştırmacı suyu farklı dış basınçlarda kaynattı.'), belir(c, D.kapG, 600));
    await par(c.say('Her basınçta kaynama sıcaklığını ölçüp tabloya yazdı.'), belir(c, [D.tb, D.gr], 600));

    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Dış basınç 760’tan 3517 mmHg’ye çıkarılırsa suyun kaynama sıcaklığı nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['Dış basınç yüksekken kabarcık oluşması zordu; kaynama sıcaklığı düşmez.', 'Dış basınç yüksekken buhar basıncının daha yüksek bir değere ulaşması gerekir.', ''],
      right: 'Evet. Dış basınç artınca kaynama sıcaklığı yükselir.',
    });

    // Dene: kaydırıcı, tabloya yaz.
    await c.say('Basıncı değiştir; kaynama sıcaklığına bak. Her konumu tabloya yaz.', { noWait: true });
    const sl = c.slider({ tag: 'Dene', label: 'Dış basınç', min: 0, max: 7, step: 1, value: 0, fmt: (i) => KAY[i][0] + ' mmHg', onInput: (i) => D.konum(i) });
    let devam = null;
    for (;;) {
      const yaz = c.cont('Tabloya yaz ›').then(() => 'y');
      const sonuc = await Promise.race(devam ? [yaz, devam.then(() => 'd')] : [yaz]);
      if (sonuc === 'd') break;
      await D.yaz(sl.get());
      if (!devam && D.dizi.length >= 4) devam = c.cont('Devam ›');
      if (D.dizi.length >= KAY.length) break;
      // Kaydırıcı sıradaki yazılmamış konuma geçer.
      const siradaki = KAY.findIndex((_, i) => i > sl.get() && !D.dizi.includes(i));
      sl.set(siradaki >= 0 ? siradaki : KAY.findIndex((_, i) => !D.dizi.includes(i)));
    }
    c.clearAct(); c.clearSay();
    await D.hepsi();

    // Gör: gözlem.
    const gz = c.S('g', {}, svg);
    yazi(c, gz, 150, 220, 'tahmin: arttı', { size: 28, kalin: 600 });
    yazi(c, gz, 150, 270, 'gözlem: arttı', { size: 28, kalin: 700, renk: RENK.vurgu });
    isaret(c, gz, 150, 322, 'ok', 22);
    gizle(gz);
    await belir(c, D.kapG, 450, 0);
    await belir(c, gz, 500, 1);

    D.vurgu(5, true); D.vurgu(4, true);
    await c.choice({
      tag: 'Sıra sende', q: 'Su 2482 mmHg dış basınçta kaynıyor. Basınç 2069 mmHg’ye düşürülürse kaynama sıcaklığı nasıl olur?',
      options: ['137 °C', '137 °C’tan yüksek', '137 °C’tan düşük'], answer: 2,
      hints: ['Basınç değişince kaynama sıcaklığı da değişir; tabloda 2069’un karşısına bak.', 'Basınç azalınca kaynama sıcaklığı ne oluyordu? Tabloda 2069’un karşısına bak.', ''],
      right: 'Evet. 2069 mmHg’de su 131 °C’ta kaynar.',
    });
    D.vurgu(5, false); D.vurgu(4, false);
    await par(c.say('Dış basınç arttıkça suyun kaynama sıcaklığı yükselir.'), D.birlestir());

    c.clearSay();
    await belir(c, gz, 400, 0);
    const M = kabarcikModeli(c, svg, { x: 15, y: 110, w: 265, h: 300, aralik: 46, s: 0, b: 0, iz: 14, okBoy: 30, tohum: 4 });
    gizle(M.g); await belir(c, M.g, 400, 1);
    await par(c.say('Yüksek dış basınca ulaşmak için buhar basıncı daha çok artmalıdır.'), M.git({ s: 1, b: 1, icOp: 1, disOp: 1, ic: 1, dis: 1 }, 2400));
    const isi = c.S('g', {}, svg);
    [60, 148, 236].forEach((x) => okK(c, isi, [x, 520], [x, 450], RENK.vurgu, 9));
    yazi(c, isi, 148, 548, 'ısı', { size: 24, kalin: 700, renk: RENK.vurgu });
    gizle(isi);
    await par(c.say('Bunun için sıvı daha çok ısı almalıdır.'), belir(c, isi, 600, 1));
    c.note('<b>Basınç arttıkça kaynama noktası yükselir.</b> Örnek: su, 100 → 149 °C.', 'Dış basınç ve kaynama', 'dis-basinc-kaynama');
  }

  /* ---- 7. İddiayı kanıtla ---- */
  async function iddia(c) {
    const svg = c.svg(1000, 562);
    const F = iddiaCercevesi(c, svg, { y: 130, h: 300 });
    gizle(F.g);
    await par(c.say('Bilimde iddia, kanıtla birlikte söylenir.'), belir(c, F.g, 600));
    await par(c.say('İddia: dış basınç düşünce suyun kaynama noktası düşer.'), F.doldur(0, ['Dış basınç düşünce', 'kaynama noktası düşer.']), Promise.resolve(F.cerceve(0, true)));
    await par(c.say('Kanıt, ölçülmüş bir veridir; gerekçe, o verinin nedenidir.'), Promise.resolve(F.cerceve(0, false)), F.sor(1));

    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'İddia kutusu dolu. Bu iddiayı hangi veri destekler?',
      options: ['Su 1 atm’de 100 °C’ta kaynar', 'Everest’in zirvesinde (0,3 atm) su 70 °C’ta, deniz seviyesinde (1 atm) 100 °C’ta kaynar', 'Everest’in zirvesinde hava soğuktur'], answer: 1,
      hints: ['Tek bir ölçüm iki basıncı karşılaştırmaz; iki ayrı dış basıncı yan yana koyan veri gerekir.', '', 'Hava sıcaklığı ölçülmüş bir dış basınç verisi değildir.'],
      right: 'Evet. İki basınç, iki kaynama noktası: ilişki bu ikisinden görülür.',
    });
    await F.doldur(1, ['0,3 atm: 70 °C', '1 atm: 100 °C']);
    F.cerceve(1, true);
    await c.say('İki ölçüm yan yana gelince iddia kanıt bulur.');
    F.cerceve(1, false);
    await F.sor(2);

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'İddia ve kanıt dolu. Gerekçe hangisidir?',
      options: ['Dış basınç arttıkça sıvı molekülleri küçülür', 'Su ısındıkça buhar basıncı azalır', 'Dış basınç arttıkça buhar basıncının ona ulaşması için sıvı daha çok ısınmalıdır'], answer: 2,
      hints: ['Moleküller küçülmez; kaynama için buhar basıncının neye eşitlenmesi gerektiğini düşün.', 'Isı, buhar basıncını artırıyordu.', ''],
      right: 'Evet. Buhar basıncı yüksek bir dış basınca ancak daha çok ısınınca ulaşır.',
    });
    await F.doldur(2, ['buhar basıncı', 'dış basınca ulaşmalı']);
    F.cerceve(2, true);
    await c.say('Dış basınç yüksekse kaynama için gereken sıcaklık da yüksektir.');
    F.cerceve(2, false);

    // Yanılgı: "Su her yerde 100 °C'ta kaynar".
    c.clearSay();
    await belir(c, F.g, 350, 0);
    [0, 1, 2].forEach((i) => F.temizle(i));
    await F.doldur(0, ['Su her yerde', '100 °C’ta kaynar'], 10);
    await F.sor(1);
    await belir(c, F.g, 450, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir öğrenci “Su her yerde 100 °C’ta kaynar” diyor. Hangi veri bu iddiayı çürütür?',
      options: ['Su ısındıkça buharlaşır', 'Su 1 atm’de 100 °C’ta kaynar', 'Everest’in zirvesinde su 70 °C’ta kaynar'], answer: 2,
      hints: ['Bu veri iddiayı doğrular; çürütmek için 100 °C’tan farklı bir kaynama sıcaklığı gerekir.', 'İddia “her yerde” diyor; farklı bir yerde farklı sonuç aranır.', ''],
      right: 'Evet. Farklı bir dış basınçta farklı kaynama sıcaklığı iddiayı çürütür.',
    });
    await F.doldur(1, ['Everest’te', '70 °C’ta kaynar']);
    isaret(c, F.kolon[0].e, 176, 385, 'no', 22);
    await c.say('Su her yerde değil, 1 atm’de 100 °C’ta kaynar.', { speak: 'Su her yerde değil, bir atmosferde yüz derecede kaynar.' });

    // Bilimsel bilgiyle karşılaştır.
    c.clearSay();
    await belir(c, F.g, 450, 0);
    const kk = c.S('g', {}, svg);
    kutu(c, kk, 40, 130, 410, 280, { rx: 16 }); kutu(c, kk, 550, 130, 410, 280, { rx: 16 });
    yazi(c, kk, 245, 180, 'öğrencinin iddiası', { size: 26, kalin: 700, renk: RENK.soluk });
    yazi(c, kk, 245, 275, 'Su her yerde', { size: 30, kalin: 600 }); yazi(c, kk, 245, 320, '100 °C’ta kaynar.', { size: 30, kalin: 600 });
    yazi(c, kk, 755, 180, 'bilimsel bilgi', { size: 26, kalin: 700, renk: RENK.vurgu });
    ['Dış basınç arttıkça', 'kaynama sıcaklığı artar,', 'azaldıkça düşer.'].forEach((s, i) => yazi(c, kk, 755, 245 + i * 44, s, { size: 28, kalin: 600 }));
    isaret(c, kk, 245, 372, 'no', 20); isaret(c, kk, 755, 372, 'ok', 20);
    gizle(kk);
    await par(c.say('Bilimsel bilgi de aynı sonucu söyler.'), belir(c, kk, 600, 1));
  }

  Ders.start({
    id: 'cesitlilik-j1', kicker: 'Konu J · Kaynama sıcaklığı', title: 'Kaynama: buhar basıncı dış basınca eşitlenince', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Kaynama: buhar basıncı dış basınca eşitlenince',
      hook: 'Yüksek bir dağın tepesinde çay suyu da 100 °C’ta mı kaynar?',
      button: 'Derse başla ›',
    },
    goals: [
      'Kaynamayı, kabarcığın içindeki buharın basıncının (iç basınç) dış basınca eşitlenmesi olarak açıklar.',
      'Dış basınç değişince suyun kaynama noktasının değiştiğini gösterir.',
      'Basınç ve kaynama sıcaklığı verisini tablo ve grafikle düzenler.',
      'Kaynama sıcaklığıyla ilgili iddiasını kanıt ve gerekçeyle açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Buhar basıncını hatırla.', run: hatirla },
      { title: 'Yaklaşık 50 °C’ta kaynayan su', goal: 'Piston çekilince suyun kaynadığını gör.', run: elli },
      { title: 'Kabarcığın içinde ne var?', goal: 'İç basıncı ve dış basıncı tanı.', run: icinde },
      { title: 'Dış basınç kabarcığı yönetir', goal: 'Dış basınç değişince kabarcığa ne olduğunu gör.', run: yonetir },
      { title: 'Grafik: buhar basıncı dış basınca eşitlenir', goal: 'Kaynama noktasını grafikte oku.', run: grafik },
      { title: 'Dış basınç ve kaynama sıcaklığı: veriyi düzenle', goal: 'Basınç ve kaynama sıcaklığı verisini düzenle.', run: veri },
      { title: 'İddiayı kanıtla', goal: 'İddia, kanıt ve gerekçeyi kur.', run: iddia },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir sıvının kaynama noktası nedir?',
        options: ['Buhar basıncının sıfır olduğu sıcaklık', 'Buhar basıncının dış basınca eşit olduğu sıcaklık', 'Sıvının donmaya başladığı sıcaklık'], answer: 1,
        why: ['Buhar basıncı sıvı varken hiçbir sıcaklıkta sıfır olmaz.', 'Buhar basıncı dış basınca eşitlenince kabarcıklar oluşur ve sıvı kaynar.', 'Donma, kaynamayla ilgili değildir; sıvı soğuyunca olur.'], scene: 4 },
      { q: 'Su her yerde 100 °C’ta kaynar mı?',
        options: ['Hayır; kaynama noktası dış basınca göre değişir', 'Evet; kaynama noktası suyun değişmez özelliğidir', 'Evet; yalnızca saf su 100 °C’ta kaynar'], answer: 0,
        why: ['Su 1 atm’de 100 °C’ta, Everest’in zirvesinde 70 °C’ta kaynar.', 'Kaynama noktası dış basınca bağlıdır; dış basınç değişince değişir.', 'Saf su da dış basınç düşünce daha düşük sıcaklıkta kaynar.'], scene: 4 },
      { q: 'Kaynayan bir sıvının üstündeki dış basınç artırılıyor. Kabarcıklara ne olur?',
        options: ['Büyür; kaynama hızlanır', 'Değişmez', 'Küçülür; kaynama durur'], answer: 2,
        why: ['Dış basınç artınca buhar sıkışır; kabarcık büyümez.', 'Dış basınç buharı sıkıştırdığı için kabarcık aynı kalmaz.', 'İç basınç dış basınçtan küçük kalınca kabarcık küçülür ve kaybolur.'], scene: 3 },
      { q: 'Bir dağın tepesinde dış basınç deniz seviyesinden azdır. Orada suyun kaynama sıcaklığı nasıldır?',
        options: ['100 °C’tan yüksektir', '100 °C’tan düşüktür', '100 °C’tır'], answer: 1,
        why: ['Dış basınç azalınca kaynama sıcaklığı yükselmez, düşer.', 'Dış basınç azalınca buhar basıncı daha düşük bir sıcaklıkta ona eşitlenir.', '100 °C yalnızca dış basıncın 1 atm olduğu durumdaki kaynama noktasıdır.'], scene: 5 },
      { q: 'Su 2069 mmHg dış basınçta kaynıyor. Kabarcıktaki buharın basıncı kaç mmHg’dir?',
        options: ['131 mmHg', '760 mmHg', '2069 mmHg'], answer: 2,
        why: ['131, kaynama sıcaklığıdır (°C); basınç değildir.', '760 mmHg, 1 atm’lik dış basınçtır; burada dış basınç 2069 mmHg.', 'Kaynarken buhar basıncı dış basınca eşittir.'], scene: 5 },
    ],
    summary: [
      'Dış basınç düşünce su 50 °C’ta bile kaynar.',
      'Kabarcığın iç basıncı dış basınca ulaşınca kaynama başlar.',
      'Dış basınç arttıkça kaynama noktası yükselir.',
      '<b>Buhar basıncı dış basınca eşitlenince sıvı kaynar.</b>',
    ],
    nextLesson: { href: 'j2-kaynama-etkilesim-turu.html', label: 'Sonraki: Kaynama noktası ve etkileşim türü ›' },
  });
})();
