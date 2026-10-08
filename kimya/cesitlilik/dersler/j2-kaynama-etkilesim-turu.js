/* J2 — Kaynama noktası ve etkileşim türü: hidrojen bağının etkisi
   Aynı dış basınçta farklı sıvıların kaynama noktası, moleküller arası etkileşimin türüne bağlıdır: etkileşim güçlendikçe kaynama noktası yükselir.
   Hidrojen bağı içeren üç sıvı arasındaki fark, hidrojen bağı sayısı ile F, O, N atomlarının elektronegatifliğiyle açıklanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/J-kaynama-sicakligi.md ("J2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Hidrür grafiğinde çubuk yükseklikleri grafikten okunan yaklaşık sıradır; yalnızca metindeki üç değer (metan, hidrojen sülfür, su) yazılır. */
(() => {
  'use strict';
  const { RENK, rastgele, yazi, cizgi, kutu, gizle, belir, par, isaret, sinifla } = window.KIT;
  const { GRI, TON, DIS, KPA, dolas, kap, suMol, okK, cubukKpa, kaynamaCubuklari, hidrurGrafigi, hidrojenBagiSayisi, tekTablo, kutuTahtasi, iddiaCercevesi } = window.KIT_J;
  const { ease } = Ders;

  const pill = (c, p, x, y, metin, renk = RENK.yazi, size = 22) => {
    const g = c.S('g', {}, p), w = metin.length * size * 0.54 + 26;
    c.S('rect', { x: x - w / 2, y: y - size * 0.95, width: w, height: size * 1.5, rx: 8, fill: GRI.tahta, 'fill-opacity': 0.92, stroke: renk, 'stroke-opacity': 0.7, 'stroke-width': 2 }, g);
    yazi(c, g, x, y + 3, metin, { size, kalin: 700, renk });
    return g;
  };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), d = dolas(c), rnd = rastgele(5);
    const s1 = c.S('g', {}, svg), s2 = c.S('g', {}, svg), s3 = c.S('g', {}, svg);
    // 1) Kaynayan sıvı ve dış basınç.
    d.ekle(kap(c, s1, { x: 340, y: 200, w: 320, h: 220, su: 0.62, kabarcik: 9, alev: 1, oklar: 0.55, tohum: 4 }));
    pill(c, s1, 500, 106, 'dış basınç', DIS);
    // 2) Aynı sıcaklıkta K ve L: K'de buhar daha çok.
    const mk = (x, n, ad) => {
      kap(c, s2, { x, y: 170, w: 260, h: 250, su: 0.35, kapak: true, tohum: 6 });
      for (let i = 0; i < n; i++) { const m = suMol(c, s2, 10); m.setAttribute('transform', `translate(${x + 24 + rnd() * 212},${192 + rnd() * 124}) rotate(${rnd() * 120 - 60})`); }
      yazi(c, s2, x + 130, 140, ad, { size: 34, kalin: 700 });
    };
    mk(160, 10, 'K'); mk(580, 3, 'L');
    // 3) Üç sıvı, farklı sıcaklıklarda kaynar.
    [[80, 0.3], [400, 0.55], [720, 0.85]].forEach(([x, t], i) => d.ekle(kap(c, s3, { x, y: 230, w: 200, h: 170, su: 0.6, kabarcik: 7, alev: 1, termo: t, tohum: 3 + i })));
    gizle(s1, s2, s3);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Bir sıvı kaynarken buhar basıncı ile dış basınç nasıldır?',
      options: ['Buhar basıncı daha büyüktür', 'Eşittir', 'Buhar basıncı sıfırdır'], answer: 1,
      hints: ['Sıvı, buhar basıncı dış basınca eşit olduğunda kaynar.', '', 'Sıvı, buhar basıncı dış basınca eşit olduğunda kaynar.'],
      right: 'Evet. Kaynarken buhar basıncı dış basınca eşittir.',
    });
    c.clearSay();
    await belir(c, s1, 400, 0);
    await belir(c, s2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden büyük. Hangisinde moleküller arası çekim daha zayıftır?',
      options: ['L’de', 'İkisinde eşit', 'K’de'], answer: 2,
      hints: ['Çekim zayıfladıkça buhar fazına geçen molekül artar; buhar basıncı büyür.', 'Buhar basıncı farklı; demek ki çekim de farklı. Çekim zayıfladıkça buhar basıncı büyür.', ''],
      right: 'Evet. Buhar basıncı büyük olan sıvıda çekim daha zayıftır.',
    });
    c.clearSay();
    await belir(c, s2, 400, 0);
    await par(c.say('Bugün aynı dış basınçta farklı sıvıların neden farklı sıcaklıkta kaynadığına bakacağız.', { speak: '[curious] Bugün aynı dış basınçta farklı sıvıların neden farklı sıcaklıkta kaynadığına bakacağız.' }), belir(c, s3, 600, 1));
  }

  /* ---- 2. Aynı dış basınç, üç sıvı ---- */
  async function ucSivi(c) {
    const svg = c.svg(1000, 562);
    const Q = cubukKpa(c, svg);
    gizle(Q.ek, Q.tb); Q.bar.forEach((b) => gizle(b.r, b.et, b.ad));
    await par(c.say('Deniz seviyesinde dış basınç 1 atm, yaklaşık 101,3 kPa’dır.', { speak: 'Deniz seviyesinde dış basınç bir atmosfer, yaklaşık yüz bir virgül üç kilopaskaldır.' }), belir(c, Q.ek, 600));
    await par(c.say('Bir araştırmacı üç sıvının buhar basıncını sıcaklık artırarak ölçtü.'), belir(c, Q.bar.flatMap((b) => [b.r, b.et, b.ad]), 600));
    await c.say('Sıvı, buhar basıncı 101,3 kPa’a ulaşınca kaynar.', { speak: 'Sıvı, buhar basıncı yüz bir virgül üç kilopaskala ulaşınca kaynar.' });

    // Dene: sıcaklık kaydırıcısı.
    await c.say('Sıcaklığı artır; hangi sıvının çubuğu çizgiye önce ulaşıyor?', { noWait: true });
    const T = [0, 20, 40, 60, 80, 100];
    const sl = c.slider({ tag: 'Dene', label: 'Sıcaklık', min: 0, max: 5, step: 1, value: 0, fmt: (i) => T[i] + ' °C', onInput: (i) => Q.git(i) });
    await c.cont('Devam ›');
    // Kaydırıcı 100 °C'a getirilmediyse tahta getirir.
    for (let i = sl.get() + 1; i <= 5; i++) { sl.set(i); await c.wait(500); }
    c.clearAct(); c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Hangi sıvı 1 atm’de en düşük sıcaklıkta kaynar?',
      options: ['Su', 'Dietil eter', 'Etil alkol'], answer: 1,
      hints: ['101,3 kPa’a hangi sıvı en önce ulaştı? 40 °C’ta hangi çubuk çizgiyi geçmişti?', '', '101,3 kPa’a hangi sıvı en önce ulaştı? 40 °C’ta hangi çubuk çizgiyi geçmişti?'],
      right: 'Evet. Dietil eterin çubuğu çizgiye en önce, 20 ile 40 °C arasında ulaştı.',
    });
    Q.tb.style.opacity = 1; Q.satir.forEach((e) => gizle(e));
    await par(c.say('Aynı dış basınçta üç sıvı üç ayrı sıcaklıkta kaynar.'), (async () => { for (const e of Q.satir) { await belir(c, e, 450, 1); await c.wait(250); } })());
    await par(c.say('Buhar basıncı büyük olan sıvı daha düşük sıcaklıkta kaynar.'), Promise.resolve(Q.git(2)));
    await par(c.say('Aynı sıcaklıkta buhar basıncı büyükse çekim zayıftır.'), Promise.resolve(Q.git(1)));
    const isi = c.S('g', {}, svg);
    [60, 130, 190].forEach((u, i) => okK(c, isi, [702, 200 + i * 92 + 36], [702 + u, 200 + i * 92 + 36], RENK.vurgu, 5));
    yazi(c, isi, 920, 200 + 2 * 92 + 44, 'ısı', { size: 24, kalin: 700, renk: RENK.vurgu });
    gizle(isi);
    await par(c.say('Çekimi güçlü sıvının buhar basıncının yükselmesi için daha çok ısı gerekir.'), belir(c, isi, 700, 1));

    // Birlikte çöz: 20 °C'taki buhar basıncı ve çekim.
    c.clearSay();
    await belir(c, [Q.g, isi], 450, 0);
    const bt = c.S('g', {}, svg), X = [200, 500, 800], AD = ['dietil eter', 'etil alkol', 'su'], DG = ['58,96', '5,85', '2,33'];
    AD.forEach((m, i) => { yazi(c, bt, X[i], 120, m, { size: 32, kalin: 700 }); yazi(c, bt, X[i], 235, DG[i], { size: 42, kalin: 700, renk: RENK.vurgu }); });
    yazi(c, bt, 500, 176, '20 °C’ta buhar basıncı (kPa)', { size: 22, kalin: 600, renk: RENK.soluk });
    yazi(c, bt, 500, 340, 'moleküller arası çekim', { size: 24, kalin: 600, renk: RENK.soluk });
    const hu = X.map((x, i) => {
      const e = c.S('g', {}, bt); kutu(c, e, x - 120, 362, 240, 84, { rx: 12 });
      const t = yazi(c, e, x, 416, i === 0 ? '?' : ['', 'daha güçlü', 'en güçlü'][i], { size: i === 0 ? 44 : 28, kalin: 700, renk: i === 0 ? RENK.vurgu : RENK.yazi });
      if (i) e.style.opacity = 0;
      return { e, t };
    });
    gizle(bt); await belir(c, bt, 500, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Moleküller arası çekimi en zayıf sıvı hangisidir?',
      options: ['Su', 'Etil alkol', 'Dietil eter'], answer: 2,
      hints: ['Aynı sıcaklıkta buhar basıncı en büyük olan hangisi? Buhar basıncı büyükse çekim zayıftır.', 'Etil alkolün buhar basıncı eterinkinden küçük; çekim daha güçlü.', ''],
      right: 'Evet. Buhar basıncı en büyük olan dietil eterde çekim en zayıftır.',
    });
    await belir(c, hu[0].t, 250, 0); hu[0].t.textContent = 'en zayıf'; hu[0].t.setAttribute('font-size', 28);
    await par(belir(c, hu[0].t, 350, 1), belir(c, [hu[1].e, hu[2].e], 450, 1));
    await c.say('Çekimi en zayıf dietil eter, en düşük sıcaklıkta kaynar.');

    // Yeni durum: K ve L.
    c.clearSay();
    await belir(c, bt, 450, 0);
    const kl = c.S('g', {}, svg), BY = 420;
    cizgi(c, kl, [220, BY], [780, BY], GRI.cam, 3); cizgi(c, kl, [220, BY], [220, 110], GRI.cam, 3);
    const yt = yazi(c, kl, 190, 265, 'buhar basıncı', { size: 22, kalin: 600, renk: RENK.soluk }); yt.setAttribute('transform', 'rotate(-90 190 265)');
    c.S('rect', { x: 330, y: BY - 230, width: 100, height: 230, rx: 6, fill: TON.alkol }, kl); c.S('rect', { x: 570, y: BY - 105, width: 100, height: 105, rx: 6, fill: TON.su }, kl);
    yazi(c, kl, 380, BY + 40, 'K', { size: 36, kalin: 700 }); yazi(c, kl, 620, BY + 40, 'L', { size: 36, kalin: 700 });
    gizle(kl); await belir(c, kl, 500, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı sıcaklıkta K sıvısının buhar basıncı L sıvısınınkinden büyük. Aynı dış basınçta hangisi daha yüksek sıcaklıkta kaynar?',
      options: ['L', 'K', 'İkisi aynı sıcaklıkta'], answer: 0,
      hints: ['Buhar basıncı büyük olan daha önce kaynıyordu; K’nin buhar basıncı L’ninkinden büyük.', 'İkisinin buhar basıncı farklı; dış basınca ulaştıkları sıcaklık da farklı.', ''],
      right: 'Evet. L’nin buhar basıncı küçük; dış basınca ulaşması için daha çok ısınmalı.',
    });
    const isi2 = c.S('g', {}, svg);
    okK(c, isi2, [330, 505], [400, 505], RENK.vurgu, 6); okK(c, isi2, [570, 505], [700, 505], RENK.vurgu, 6);
    yazi(c, isi2, 800, 512, 'ısı', { size: 24, kalin: 700, renk: RENK.vurgu });
    gizle(isi2);
    await par(c.say('Etkileşim güçlendikçe sıvı daha yüksek sıcaklıkta kaynar.'), belir(c, isi2, 600, 1));
    c.note('<b>Etkileşim güçlendikçe kaynama noktası yükselir.</b> Örnek: eter, alkol, su.', 'Etkileşim ve kaynama', 'etkilesim-kaynama');
  }

  /* ---- 3. Üç sıvı, üç etkileşim türü ---- */
  async function ucTur(c) {
    const svg = c.svg(1000, 562);
    const K = kaynamaCubuklari(c, svg);
    await par(c.say('Aynı şartlarda üç sıvının kaynama sıcaklıkları ölçüldü.'), belir(c, K.cub.map((q) => q.adT), 600));
    await par(c.say('Metan 112,65 K’de kaynar; molekülleri apolardır.', { speak: 'Metan yüz on iki virgül altmış beş kelvinde kaynar; molekülleri apolardır.' }), K.buyut(0), belir(c, K.cub[0].cf.g, 800, 1));
    await par(c.say('Hidrojen sülfür 213,15 K’de kaynar; molekülleri polardır.', { speak: 'Hidrojen sülfür iki yüz on üç virgül on beş kelvinde kaynar; molekülleri polardır.' }), K.buyut(1), belir(c, K.cub[1].cf.g, 800, 1));
    await par(c.say('Su 373,15 K’de kaynar; molekülleri hidrojen bağı kurar.', { speak: 'Su üç yüz yetmiş üç virgül on beş kelvinde kaynar; molekülleri hidrojen bağı kurar.' }), K.buyut(2), belir(c, K.cub[2].cf.g, 800, 1));

    // Birlikte çöz: üç satırlı tablo.
    c.clearSay();
    await belir(c, K.g, 450, 0);
    const bt = c.S('g', {}, svg), X = [200, 520, 830];
    ['sıvı', 'molekül', 'etkileşim'].forEach((m, i) => yazi(c, bt, X[i], 92, m, { size: 24, kalin: 700, renk: RENK.soluk }));
    cizgi(c, bt, [60, 112], [940, 112], GRI.cam, 2);
    const SAT = [['metan', 'apolar', 'London'], ['hidrojen sülfür', 'polar; S–H', '?'], ['su', 'O–H', 'hidrojen bağı']];
    const hu = SAT.map((s, i) => s.map((m, j) => yazi(c, bt, X[j], 205 + i * 110, m, { size: m === '?' ? 46 : 30, kalin: j === 2 ? 700 : 600, renk: j === 2 ? RENK.vurgu : RENK.yazi })));
    gizle(bt); await belir(c, bt, 500, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Hidrojen sülfür molekülleri arasında hangi etkileşim etkindir?',
      options: ['London kuvveti', 'Dipol-dipol', 'Hidrojen bağı'], answer: 1,
      hints: ['Hidrojen sülfür polar bir moleküldür; polar moleküller arasında London dışında bir etkileşim de vardır.', '', 'Hidrojen kükürte bağlı; hidrojen bağı için F, O ya da N’ye bağlı olmalı.'],
      right: 'Evet. Polar ama S–H bağlı; moleküller arasında dipol-dipol etkir.',
    });
    await belir(c, hu[1][2], 250, 0); hu[1][2].textContent = 'dipol-dipol'; hu[1][2].setAttribute('font-size', 30);
    await belir(c, hu[1][2], 350, 1);
    await c.wait(500);
    c.clearSay();
    await belir(c, bt, 450, 0);
    await belir(c, K.g, 450, 1);

    await par(c.say('Üç sıvıda kaynama sıcaklığı London’dan hidrojen bağına doğru yükselir.', { speak: 'Üç sıvıda kaynama sıcaklığı London kuvvetinden hidrojen bağına doğru yükselir.' }),
      (async () => { for (const q of K.cub) { await belir(c, q.et2, 450, 1); await c.wait(300); } })());
    await par(c.say('Saf maddelerde en güçlü etkileşim hidrojen bağıdır.'), belir(c, K.dl, 500, 1));
    await par(c.say('Hidrojen bağlı sıvıların kaynama sıcaklığı yüksektir.'), c.tween(900, (e) => K.cub[2].r.setAttribute('stroke-width', 5 * Math.sin(Math.PI * e))), Promise.resolve(K.cub[2].r.setAttribute('stroke', RENK.vurgu)));
    K.cub[2].r.setAttribute('stroke-width', 0);

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı dış basınçta hidrojen sülfür ile su kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar ve neden?',
      options: ['Hidrojen sülfür; molekülleri polardır', 'İkisi aynı; ikisi de polardır', 'Su; molekülleri hidrojen bağı kurar'], answer: 2,
      hints: ['Hangisinde hidrojen bağı var? Hidrojen bağı en güçlü etkileşimdi.', 'İkisinin kaynama sıcaklığı farklı; hidrojen bağı en güçlü etkileşimdi.', ''],
      right: 'Evet. Su çubuğu hidrojen sülfürünkinin çok üstünde.',
    });
    // Gör: su çubuğu çok üstte.
    const yx = c.S('g', {}, svg), ty = 330 - 250, th = 330 - (213.15 / 373.15) * 250;
    cizgi(c, yx, [610, th], [940, th], RENK.vurgu, 3, { 'stroke-dasharray': '8 6' });
    okK(c, yx, [940, th + 6], [940, ty + 6], RENK.vurgu, 5);
    gizle(yx); await belir(c, yx, 600, 1);
  }

  /* ---- 4. Beklenenden yüksek olanlar ---- */
  async function yuksek(c) {
    const svg = c.svg(1000, 562);
    const H = hidrurGrafigi(c, svg);
    const okG = c.S('g', {}, svg); gizle(okG);
    const g0 = H.grup[0].cubuklar;
    okK(c, okG, [g0[0].xc, g0[0].ust - 52], [g0[3].xc - 4, g0[3].ust - 52], RENK.vurgu, 5);
    await par(c.say('Grafik, dört gruptaki hidrojenli bileşiklerin kaynama sıcaklığını gösterir.'), belir(c, H.grup[0].e, 700));
    await par(c.say('4A’da yukarıdan aşağı inildikçe kaynama sıcaklığı artar.'), belir(c, okG, 700, 1));
    await par(c.say('5A, 6A ve 7A’da ilk bileşik ikinciden daha yüksektir.'), belir(c, [H.grup[1].e, H.grup[2].e, H.grup[3].e], 800, 1), (async () => { await c.wait(500); [1, 2, 3].forEach((i) => { H.grup[i].fr.style.opacity = 1; }); })());

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: '5A, 6A ve 7A’da, ilk bileşiği ikinciden yüksek olan üç bileşik hangileridir?',
      options: ['PH<sub>3</sub>, H<sub>2</sub>S, HCl', 'NH<sub>3</sub>, H<sub>2</sub>O, HF', 'AsH<sub>3</sub>, H<sub>2</sub>Se, HBr'], answer: 1,
      hints: ['Her grupta ilk iki çubuğu karşılaştır; bunlar ikinci bileşikler.', '', 'Bunlar üçüncü bileşikler; her grupta ilk iki çubuğu karşılaştır.'],
      right: 'Evet. NH<sub>3</sub>, H<sub>2</sub>O ve HF çubukları ikincilerden yüksek.',
    });
    // Gör: ilk üyeler ikincilerden yüksek.
    const ok2 = c.S('g', {}, svg);
    [1, 2, 3].forEach((i) => { const a = H.grup[i].cubuklar; okK(c, ok2, [a[0].xc + 24, a[0].ust + 4], [a[1].xc - 6, a[1].ust - 36], RENK.vurgu, 4); });
    gizle(ok2); await belir(c, ok2, 600, 1);
    await c.wait(800);

    // Bağlar: N–H, O–H, F–H.
    c.clearSay();
    await belir(c, [H.g, okG, ok2], 450, 0);
    const bg = c.S('g', {}, svg), BX = [40, 362, 684], AD = ['NH_{3}', 'H_{2}O', 'HF'], BAG = ['N–H', 'O–H', 'F–H'];
    const hb = BX.map((x, i) => {
      kutu(c, bg, x, 150, 276, 250, { rx: 16 });
      yazi(c, bg, x + 138, 235, AD[i], { size: 50, kalin: 700, math: true });
      yazi(c, bg, x + 138, 315, BAG[i], { size: 44, kalin: 700, renk: RENK.vurgu });
      const e = c.S('g', {}, bg);
      cizgi(c, e, [x + 50, 352], [x + 226, 352], RENK.cekme, 5, { 'stroke-dasharray': '10 8', 'stroke-linecap': 'butt' });
      yazi(c, e, x + 138, 386, 'hidrojen bağı', { size: 22, kalin: 700, renk: RENK.cekme });
      e.style.opacity = 0;
      return e;
    });
    gizle(bg);
    await par(c.say('NH₃’te N–H, H₂O’da O–H, HF’de F–H bağı vardır.', { speak: 'Amonyakta N H, suda O H, hidrojen florürde F H bağı vardır.' }), belir(c, bg, 600, 1));
    await par(c.say('Bu üçü hidrojen bağı kurar; ötekiler kuramaz.'), belir(c, hb, 700, 1));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Hidrojen bağı, sıvının kaynama sıcaklığını nasıl etkiler?',
      options: ['Düşürür', 'Yükseltir', 'Etkilemez'], answer: 1,
      hints: ['NH<sub>3</sub>, H<sub>2</sub>O ve HF’nin çubukları beklenenden yüksekti; üçünde de hidrojen bağı var.', '', 'Üçünde de hidrojen bağı var ve çubukları beklenenden yüksekti.'],
      right: 'Evet. Hidrojen bağlı sıvıların kaynama sıcaklığı yüksektir.',
    });
    await belir(c, bg, 400, 0);
    await par(c.say('Hidrojen bağı, kaynama noktasını beklenenden yüksek yapar.'), belir(c, [H.g, ok2], 600, 1));

    // Yeni durum: HF ve HBr.
    c.clearSay();
    await belir(c, [H.grup[0].e, H.grup[1].e, H.grup[2].e, ok2], 500, 0.25);
    await c.choice({
      tag: 'Sıra sende', q: 'HF ile HBr aynı dış basınçta kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar?',
      options: ['HBr', 'HF', 'İkisi aynı sıcaklıkta'], answer: 1,
      hints: ['Hangisinde F–H, O–H ya da N–H bağı var? Hidrojen bağı kaynama noktasını yükseltir.', '', 'Grafikte HF çubuğu 7A’nın ilk çubuğuydu; çubukların yüksekliği farklı.'],
      right: 'Evet. HF hidrojen bağı kurar, HBr kuramaz.',
    });
    c.note('<b>Hidrojen bağı kaynama noktasını yükseltir.</b> Örnek: H<sub>2</sub>O, HF, NH<sub>3</sub>.', 'Hidrojen bağı', 'hidrojen-bagi-kaynama');
  }

  /* ---- 5. Hidrojen bağı sayısı ve elektronegatiflik farkı ---- */
  const SAT5 = [
    { ad: 'H_{2}O', t: 100, tx: '100', e: ['H 2,20', 'O 3,44'] },
    { ad: 'HF', t: 19.5, tx: '19,5', e: ['H 2,20', 'F 4,00'] },
    { ad: 'NH_{3}', t: -33.3, tx: '−33,3', e: ['H 2,20', 'N 3,04'] },
  ];
  async function sayi(c) {
    const svg = c.svg(1000, 562);
    // Tablo: ad, kaynama çubuğu, elektronegatiflik.
    const T = c.S('g', {}, svg), YS = [170, 275, 380], BX = 400, SK = 2.2;
    const ad = SAT5.map((s, i) => yazi(c, T, 70, YS[i] + 12, s.ad, { hiza: 'start', size: 38, kalin: 700, math: true }));
    const hK = yazi(c, T, 560, 100, '°C', { size: 26, kalin: 700, renk: RENK.soluk }), hE = yazi(c, T, 850, 100, 'elektronegatiflik', { size: 24, kalin: 700, renk: RENK.soluk });
    cizgi(c, T, [BX, 118], [BX, 440], GRI.cam, 2);
    const cb = SAT5.map((s, i) => {
      const e = c.S('g', {}, T), w = Math.abs(s.t) * SK, x = s.t >= 0 ? BX : BX - w;
      c.S('rect', { x, y: YS[i] - 20, width: w, height: 40, rx: 6, fill: TON.su }, e);
      yazi(c, e, s.t >= 0 ? BX + w + 12 : BX - w - 12, YS[i] + 9, s.tx, { hiza: s.t >= 0 ? 'start' : 'end', size: 28, kalin: 700, renk: RENK.vurgu });
      e.style.opacity = 0; return e;
    });
    const en = SAT5.map((s, i) => {
      const e = c.S('g', {}, T);
      s.e.forEach((m, j) => yazi(c, e, 850, YS[i] - 8 + j * 38, m, { size: 26, kalin: 600, renk: j === 0 ? RENK.vurgu : RENK.yazi }));
      e.style.opacity = 0; return e;
    });
    const rozet = [0, 1].map((i) => { const e = c.S('g', {}, T); c.S('circle', { cx: 240, cy: YS[i], r: 24, fill: GRI.tahta, stroke: RENK.cekme, 'stroke-width': 3 }, e); yazi(c, e, 240, YS[i] + 10, i ? '2' : '4', { size: 28, kalin: 700, renk: RENK.cekme }); e.style.opacity = 0; return e; });
    const cerceve = [0, 1].map((i) => { const r = c.S('rect', { x: 50, y: YS[i] - 40, width: 560, height: 80, rx: 12, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, T); r.style.opacity = 0; return r; });
    const kn = pill(c, svg, 500, 52, '1 atm', RENK.vurgu, 26);
    gizle(T, hK, hE, kn, ad);
    const mol = hidrojenBagiSayisi(c, svg, { k: 1.8, kf: 1.25 });
    gizle(mol.su.g, mol.hf.g, mol.su.ad, mol.hf.ad);

    await par(c.say('Su, HF ve NH₃ hidrojen bağı kurar.', { speak: 'Su, hidrojen florür ve amonyak hidrojen bağı kurar.' }), belir(c, [T, ...ad], 600));
    await par(c.say('Üçü de aynı dış basınçta, 1 atm’de kaynatıldı.', { speak: 'Üçü de aynı dış basınçta, bir atmosferde kaynatıldı.' }), belir(c, kn, 500));
    await par(c.say('Her su molekülü dört, her HF molekülü iki hidrojen bağı kurabilir.', { speak: 'Her su molekülü dört, her hidrojen florür molekülü iki hidrojen bağı kurabilir.' }), (async () => {
      await par(belir(c, [T, kn], 450, 0));
      await par(belir(c, [mol.su.g, mol.su.ad], 500, 1));
      for (const h of mol.su.hb) { await belir(c, [h.e, h.t], 420, 1); await c.wait(350); }
      await belir(c, [mol.hf.g, mol.hf.ad], 500, 1);
      for (const h of mol.hf.hb) { await belir(c, [h.e, h.t], 420, 1); await c.wait(350); }
    })());

    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Su ile HF 1 atm’de kaynatılıyor. Hangisi daha yüksek sıcaklıkta kaynar?',
      options: ['HF', 'İkisi aynı sıcaklıkta', 'Su'], answer: 2,
      hints: ['Hidrojen bağı çoksa çekim daha güçlüdür; çekim güçlü olunca kaynama sıcaklığı yükselir.', 'Hidrojen bağı sayıları farklı; çekim de farklıdır.', ''],
      right: 'Evet. Su daha çok hidrojen bağı kurar, daha yüksek sıcaklıkta kaynar.',
    });
    await belir(c, [mol.su.g, mol.hf.g, mol.su.ad, mol.hf.ad, ...mol.su.hb.flatMap((h) => [h.e, h.t]), ...mol.hf.hb.flatMap((h) => [h.e, h.t])], 450, 0);
    await par(belir(c, [T, hK, ...ad, kn], 500, 1));
    await par(c.say('Su 100 °C’ta, HF 19,5 °C’ta, NH₃ −33,3 °C’ta kaynar.', { speak: 'Su yüz derecede, hidrojen florür on dokuz virgül beş derecede, amonyak eksi otuz üç virgül üç derecede kaynar.' }),
      (async () => { for (const e of cb) { await belir(c, e, 500, 1); await c.wait(250); } })());
    await par(c.say('Hidrojen bağı sayısı arttıkça hidrojen bağının etkinliği artar.'), belir(c, [rozet[0], rozet[1], ...[]], 500, 1), belir(c, kn, 400, 0));
    await par(c.say('Su, daha çok hidrojen bağı kurduğu için HF’den yüksek kaynar.', { speak: 'Su, daha çok hidrojen bağı kurduğu için hidrojen florürden yüksek kaynar.' }), belir(c, cerceve, 500, 1));
    await par(c.say('HF ile NH₃ arasındaki farka elektronegatifliklerden bakalım.', { speak: 'Hidrojen florür ile amonyak arasındaki farka elektronegatifliklerden bakalım.' }), belir(c, [hE, ...en], 600, 1), belir(c, [...rozet, ...cerceve], 400, 0));
    await par(c.say('Hidrojenin elektronegatifliği 2,20; F, O, N bundan büyüktür.', { speak: 'Hidrojenin elektronegatifliği iki virgül yirmi; flor, oksijen ve azot bundan büyüktür.' }), c.wait(1500));

    // Birlikte çöz: farkları hesapla.
    c.clearSay();
    await belir(c, [T, hK, hE], 450, 0);
    const hs = c.S('g', {}, svg), SATIR = [['H–O: 3,44 − 2,20 =', '1,24'], ['H–N: 3,04 − 2,20 =', '0,84'], ['H–F: 4,00 − 2,20 =', '?']], YH = [170, 275, 380];
    const hu = SATIR.map(([l, r], i) => { const a = yazi(c, hs, 600, YH[i], l, { hiza: 'end', size: 36, kalin: 600 }); const b = yazi(c, hs, 630, YH[i], r, { hiza: 'start', size: i === 2 ? 48 : 36, kalin: 700, renk: RENK.vurgu }); return { a, b }; });
    const fr = c.S('rect', { x: 100, y: YH[2] - 46, width: 650, height: 70, rx: 12, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, hs); fr.style.opacity = 0;
    const fb = c.S('g', {}, hs);
    [1.24, 0.84, 1.80].forEach((v, i) => c.S('rect', { x: 770, y: YH[i] - 18, width: v * 90, height: 36, rx: 6, fill: TON.su }, fb));
    fb.style.opacity = 0;
    gizle(hs); await belir(c, hs, 500, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'H–F bağında elektronegatiflik farkı kaçtır?',
      options: ['6,20', '1,24', '1,80'], answer: 2,
      hints: ['Büyük değerden küçüğü çıkarmalısın; çıkarma işlemi yap, toplama değil.', 'F’nin değeri 4,00, hidrojenin 2,20; 1,24, H–O bağının farkıydı.', ''],
      right: 'Evet. 4,00 − 2,20 = 1,80.',
    });
    await belir(c, hu[2].b, 250, 0); hu[2].b.textContent = '1,80'; hu[2].b.setAttribute('font-size', 36);
    await belir(c, hu[2].b, 350, 1);
    await par(c.say('En büyük elektronegatiflik farkı H–F bağındadır.', { speak: 'En büyük elektronegatiflik farkı hidrojen flor bağındadır.' }), belir(c, fr, 500, 1));
    await par(c.say('Fark büyüdükçe kısmi yük yoğunluğu ve moleküller arası çekim artar.'), belir(c, fb, 700, 1));
    c.clearSay();
    await belir(c, [hs], 450, 0);
    const cm = c.S('g', {}, svg);
    [['HF', 19.5, '19,5'], ['NH_{3}', -33.3, '−33,3']].forEach(([m, t, tx], i) => {
      const y = 220 + i * 110, w = Math.abs(t) * SK, x = t >= 0 ? BX : BX - w;
      yazi(c, cm, 70, y + 12, m, { hiza: 'start', size: 38, kalin: 700, math: true });
      c.S('rect', { x, y: y - 20, width: w, height: 40, rx: 6, fill: TON.su }, cm);
      yazi(c, cm, t >= 0 ? BX + w + 12 : BX - w - 12, y + 9, tx, { hiza: t >= 0 ? 'start' : 'end', size: 28, kalin: 700, renk: RENK.vurgu });
    });
    cizgi(c, cm, [BX, 160], [BX, 380], GRI.cam, 2);
    yazi(c, cm, 560, 150, '°C', { size: 26, kalin: 700, renk: RENK.soluk });
    gizle(cm); await par(c.say('Bu yüzden HF, NH₃’ten daha yüksek sıcaklıkta kaynar.', { speak: 'Bu yüzden hidrojen florür, amonyaktan daha yüksek sıcaklıkta kaynar.' }), belir(c, cm, 600, 1));

    // Dene: kart başına seçim.
    c.clearSay();
    await belir(c, cm, 400, 0);
    const cumle = yazi(c, svg, 500, 546, '', { size: 22, kalin: 600, renk: RENK.yazi }); cumle.style.opacity = 0;
    const kt = kutuTahtasi(c, svg, {
      baslikPunto: 22,
      kutular: [{ baslik: 'Hidrojen bağı sayısı', x: 14, y: 250, w: 320, h: 270 }, { baslik: 'Elektronegatiflik farkı', x: 340, y: 250, w: 320, h: 270 }, { baslik: 'Etkileşimin türü', x: 666, y: 250, w: 320, h: 270 }],
      ciz: (k, g) => k.satir.forEach((s, i) => yazi(c, g, 500, 110 + i * 50, s, { size: 32, kalin: 600, math: true })),
      chip: (k, p, x, y) => yazi(c, p, x, y, k.chip, { size: 26, kalin: 600, math: true }),
    });
    await c.say('Her kartta iki sıvı var; farkı hangi ölçüt açıklar?', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Bu iki sıvının kaynama sıcaklığı farkını hangi ölçüt açıklar?`,
      kutular: ['Hidrojen bağı sayısı', 'Elektronegatiflik farkı', 'Etkileşimin türü'],
      kartlar: [
        { metin: 'Metan (112,65 K) ile hidrojen sülfür (213,15 K)', satir: ['metan 112,65 K', 'H_{2}S 213,15 K'], kutu: 2, chip: 'CH_{4}–H_{2}S', neden: 'London ve dipol-dipol; etkileşimin türü farklı.', ipucu: 'İkisinin etkileşim türü aynı mı? Metan apolar, hidrojen sülfür polar.' },
        { metin: 'Hidrojen sülfür (213,15 K) ile su (373,15 K)', satir: ['H_{2}S 213,15 K', 'su 373,15 K'], kutu: 2, chip: 'H_{2}S–H_{2}O', neden: 'Dipol-dipol ve hidrojen bağı; etkileşimin türü farklı.', ipucu: 'Hidrojen sülfür hidrojen bağı kurmaz, su kurar.' },
        { metin: 'Su (100 °C) ile HF (19,5 °C)', satir: ['su 100 °C', 'HF 19,5 °C'], kutu: 0, chip: 'H_{2}O–HF', neden: 'İkisi de hidrojen bağı kurar; su dört, HF iki bağ kurar.', ipucu: 'İkisi de hidrojen bağı kurar; kaç bağ kurduklarına bak.' },
        { metin: 'HF (19,5 °C) ile NH₃ (−33,3 °C)', satir: ['HF 19,5 °C', 'NH_{3} −33,3 °C'], kutu: 1, chip: 'HF–NH_{3}', neden: 'İkisi de hidrojen bağı kurar; H–F bağında fark en büyük.', ipucu: 'İkisi de hidrojen bağı kurar; bağlardaki elektronegatiflik farkına bak.' },
      ],
      sec: async (i, k) => { if (cumle.textContent) await belir(c, cumle, 250, 0); await kt.sec(i, k); },
      yerlestir: async (i, k) => { await kt.yerlestir(i, k); cumle.textContent = k.neden; await belir(c, cumle, 350, 1); },
    });
    c.note('<b>Bağ sayısı ve elektronegatiflik farkı belirler.</b> Örnek: su, HF, NH<sub>3</sub>.', 'Hidrojen bağlı sıvılar', 'hidrojen-bagli-sivilar');
  }

  /* ---- 6. Tek tabloda: dış basınç ve sıvı türü ---- */
  async function tekTabloS(c) {
    const svg = c.svg(1000, 562);
    const T = tekTablo(c, svg, { baslik: ['dış basınç değişir', 'sıvı değişir (1 atm)'] });
    gizle(T.g);
    await par(c.say('Kaynama sıcaklığını iki şey değiştirebilir: dış basınç ve sıvı.'), belir(c, T.g, 600));
    await c.say('Bir etkiyi görmek için yalnızca birini değiştirmek gerekir.');

    c.clearSay();
    const ROW = [
      [[['', '760 mmHg', '100'], ['', '3517 mmHg', '149']], 0],
      [[['su', '', '100'], ['HF', '', '19,5'], ['NH_{3}', '', '−33,3']], 1],
      [[['', '1 atm', '100'], ['', '0,3 atm', '70']], 0],
      [[['dietil eter', '', '20–40'], ['etil alkol', '', '60–80'], ['su', '', '100']], 1],
    ];
    await T.notGoster(true);
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Hangi etkiyi gösterir?`,
      kutular: ['Dış basıncın etkisi', 'Sıvı türünün etkisi'],
      kartlar: [
        { metin: 'Su: 760 mmHg’de 100 °C, 3517 mmHg’de 149 °C', satir: ['su, 760 ve 3517 mmHg'], kutu: 0, neden: 'Sıvı aynı, dış basınç farklı.', ipucu: 'Sıvı değişiyor mu, dış basınç mı?' },
        { metin: 'Su, HF, NH₃ (1 atm): 100 °C, 19,5 °C, −33,3 °C', satir: ['su, HF, NH_{3}; 1 atm'], kutu: 1, neden: 'Dış basınç aynı, sıvı farklı.', ipucu: 'Dış basınç hep 1 atm; değişen ne?' },
        { metin: 'Su: 1 atm’de 100 °C, 0,3 atm’de 70 °C', satir: ['su, 1 atm ve 0,3 atm'], kutu: 0, neden: 'Sıvı aynı, dış basınç farklı.', ipucu: 'Sıvı değişiyor mu, dış basınç mı?' },
        { metin: 'Dietil eter, etil alkol, su (1 atm): 101,3 kPa’a 20–40, 60–80, 100 °C’ta ulaşırlar', satir: ['dietil eter, etil alkol, su; 1 atm'], kutu: 1, neden: 'Dış basınç aynı, sıvı farklı.', ipucu: 'Dış basınç hep 1 atm; değişen ne?' },
      ].map((k, i) => Object.assign(k, { i })),
      sec: async (i, k) => {
        if (i === 2) { await par(T.sil(0), T.notGoster(false)); }
        if (i === 3) await T.sil(1);
        await T.kart(k.satir);
      },
      yerlestir: async (i, k) => { await T.kartKaldir(); await T.yaz(ROW[i][1], ROW[i][0]); },
    });
    await c.say('Aynı sıvıda dış basınç değişince kaynama sıcaklığı değişti.');
    await c.say('Aynı dış basınçta sıvı değişince kaynama sıcaklığı değişti.');

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir öğrenci “Sıvı türü, kaynama sıcaklığını değiştirir” iddiasını sınamak istiyor. Hangi iki ölçüm yeterlidir?',
      options: ['Farklı sıvıların farklı dış basınçlardaki kaynama sıcaklığı', 'Aynı sıvının iki farklı dış basınçta kaynama sıcaklığı', 'Aynı dış basınçta iki farklı sıvının kaynama sıcaklığı'], answer: 2,
      hints: ['Son seçenekte iki şey birden değişiyor; etkiyi ayıramazsın.', 'Bu, dış basıncın etkisini gösterir; sıvı türü için sıvı değişmeli, dış basınç sabit kalmalı.', ''],
      right: 'Evet. Yalnızca sıvı değişir, dış basınç sabit kalır.',
    });
    c.note('<b>Kaynama noktasını dış basınç ve etkileşim türü belirler.</b> Örnek: su, 1 atm.', 'İki ölçüt', 'iki-olcut');
  }

  /* ---- 7. Neler belirler, neler belirlemez? ---- */
  async function belirler(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const g1 = c.S('g', {}, svg), g2 = c.S('g', {}, svg), g3 = c.S('g', {}, svg);
    d.ekle(kap(c, g1, { x: 140, y: 190, w: 240, h: 200, su: 0.62, kabarcik: 9, alev: 1, alevK: 0.55, termo: 0.62, tohum: 2 }));
    d.ekle(kap(c, g1, { x: 620, y: 190, w: 240, h: 200, su: 0.62, kabarcik: 9, alev: 1, alevK: 1.6, termo: 0.62, tohum: 5 }));
    d.ekle(kap(c, g2, { x: 100, y: 150, w: 130, h: 250, su: 0.3, kabarcik: 5, alev: 1, termo: 0.62, tohum: 3 }));
    d.ekle(kap(c, g2, { x: 400, y: 240, w: 480, h: 160, su: 0.8, kabarcik: 11, alev: 1, termo: 0.62, tohum: 7 }));
    const aynı = yazi(c, svg, 500, 520, 'aynı kaynama noktası', { size: 30, kalin: 700, renk: RENK.vurgu });
    pill(c, g3, 280, 270, 'dış basınç', RENK.vurgu, 38); pill(c, g3, 720, 270, 'etkileşim türü', RENK.vurgu, 38);
    gizle(g1, g2, g3, aynı);
    await par(c.say('Kaynama noktası ısıtıcının gücüne bağlı değildir.'), belir(c, [g1, aynı], 600));
    await par(c.say('Sıvının miktarına ve kabın şekline de bağlı değildir.'), belir(c, g1, 400, 0).then(() => belir(c, g2, 500, 1)));
    await par(c.say('Saf sıvının kaynama noktasını iki ölçüt belirler.'), belir(c, [g2, aynı], 400, 0).then(() => belir(c, g3, 500, 1)));

    c.clearSay();
    await belir(c, g3, 400, 0);
    const cumle = yazi(c, svg, 500, 548, '', { size: 22, kalin: 600 }); cumle.style.opacity = 0;
    const kt = kutuTahtasi(c, svg, {
      kutular: [{ baslik: 'Kaynama noktasını belirler', x: 40, y: 210, w: 440, h: 300 }, { baslik: 'Belirlemez', x: 520, y: 210, w: 440, h: 300 }],
      ciz: (k, g) => k.satir.forEach((s, i) => yazi(c, g, 500, 110 + i * 48, s, { size: 34, kalin: 600 })),
      chip: (k, p, x, y) => yazi(c, p, x, y, k.chip, { size: 26, kalin: 600 }),
    });
    await c.say('Her kart bir etken; kaynama noktasını belirler mi?', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Hangi kutuya girer?`,
      kutular: ['Kaynama noktasını belirler', 'Belirlemez'],
      kartlar: [
        { metin: 'Sıvı yüzeyine etki eden dış basınç', satir: ['sıvı yüzeyine etki', 'eden dış basınç'], kutu: 0, chip: 'dış basınç', neden: 'Dış basınç arttıkça kaynama noktası yükselir.', ipucu: 'Dış basınç arttıkça kaynama noktası değişiyordu.' },
        { metin: 'Isıtıcının gücü', satir: ['ısıtıcının gücü'], kutu: 1, chip: 'ısıtıcı gücü', neden: 'Daha güçlü ısıtınca sıvı daha çabuk kaynar, daha yüksek sıcaklıkta değil.', ipucu: 'Güçlü ısıtıcı sıvıyı çabuk kaynatır; kaynama sıcaklığı değişir mi?' },
        { metin: 'Moleküller arası etkileşimin türü', satir: ['moleküller arası', 'etkileşimin türü'], kutu: 0, chip: 'etkileşim türü', neden: 'Etkileşim güçlendikçe kaynama noktası yükselir.', ipucu: 'Etkileşim güçlendikçe kaynama noktası yükseliyordu.' },
        { metin: 'Sıvının miktarı', satir: ['sıvının miktarı'], kutu: 1, chip: 'sıvı miktarı', neden: 'Miktar değişse de kaynama noktası aynı kalır.', ipucu: 'Az su da çok su da aynı sıcaklıkta kaynar.' },
        { metin: 'Kabın şekli', satir: ['kabın şekli'], kutu: 1, chip: 'kap şekli', neden: 'Kap değişse de kaynama noktası aynı kalır.', ipucu: 'Dar kapta da geniş kapta da aynı sıcaklıkta kaynar.' },
      ],
      sec: async (i, k) => { if (cumle.textContent) await belir(c, cumle, 250, 0); await kt.sec(i, k); },
      yerlestir: async (i, k) => { await kt.yerlestir(i, k); cumle.textContent = k.neden; await belir(c, cumle, 350, 1); },
    });
    await belir(c, cumle, 300, 0);
    await c.say('Gerisi sabit kalırsa kaynama noktasını bu iki ölçüt belirler.');
  }

  /* ---- 8. İddiayı kanıtla ---- */
  async function iddia(c) {
    const svg = c.svg(1000, 562);
    const F = iddiaCercevesi(c, svg, { y: 130, h: 300 });
    gizle(F.g);
    await par(c.say('İddia: hidrojen bağı, sıvının kaynama noktasını yükseltir.'), belir(c, F.g, 600), F.doldur(0, ['Hidrojen bağı', 'kaynama noktasını', 'yükseltir.']));
    F.cerceve(0, true);
    await F.sor(1);
    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'İddia kutusu dolu. Bu iddiayı hangi veri destekler?',
      options: ['Metan 112,65 K’de kaynar', 'Su 373,15 K’de, hidrojen sülfür 213,15 K’de, metan 112,65 K’de kaynar', 'Su 100 °C’ta, 0,3 atm’de 70 °C’ta kaynar'], answer: 1,
      hints: ['Bir tek sıvının değeri karşılaştırma vermez; hidrojen bağlı bir sıvıyı kurmayanlarla karşılaştıran veri gerekir.', '', 'Bu veri dış basıncın etkisini gösteriyor, hidrojen bağının değil.'],
      right: 'Evet. Üç sıvı yan yana: hidrojen bağlı olan en yüksekte.',
    });
    F.cerceve(0, false);
    await F.doldur(1, ['metan 112,65 K', 'H_{2}S 213,15 K', 'su 373,15 K'], 450, RENK.yazi);
    F.cerceve(1, true);
    await c.say('Kanıt hazır; şimdi gerekçeyi bulalım.');
    F.cerceve(1, false);
    await F.sor(2);

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'İddia ve kanıt dolu. Gerekçe hangisidir?',
      options: ['Hidrojen bağı dış basıncı artırır', 'Hidrojen bağı çekimi güçlendirir; buhar basıncının dış basınca ulaşması için daha çok ısı gerekir', 'Hidrojen bağı sıvıyı soğutur'], answer: 1,
      hints: ['Hidrojen bağı dış basıncı değiştirmez; dış basınç ortamın özelliğidir.', '', 'Çekim güçlüyse buhar basıncı nasıldı? Kaynama için buhar basıncı neye eşitlenmeliydi?'],
      right: 'Evet. Çekim güçlüyse buhar basıncı düşük kalır; dış basınca ulaşmak için daha çok ısı gerekir.',
    });
    await F.doldur(2, ['çekim güçlü;', 'daha çok ısı gerekir']);
    F.cerceve(2, true);
    await c.say('İddia, kanıt ve gerekçe birlikte tam bir açıklama oluşturur.');
    F.cerceve(2, false);

    // Yanılgı: HF ve HCl.
    c.clearSay();
    await belir(c, F.g, 350, 0);
    [0, 1, 2].forEach((i) => F.temizle(i));
    await F.doldur(0, ['HF ve HCl aynı', 'sıcaklıkta kaynar'], 10);
    await F.sor(1);
    await belir(c, F.g, 450, 1);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir öğrenci “HF ile HCl aynı dış basınçta aynı sıcaklıkta kaynar” diyor. Hangi veri bu iddiayı çürütür?',
      options: ['HCl’nin elektronegatifliği 3,16’dır', 'HF’de F–H bağı vardır', 'Grafikte HF çubuğu HCl çubuğundan yüksektir'], answer: 2,
      hints: ['Elektronegatiflik ölçülmüş bir kaynama sıcaklığı değildir; iki sıvının kaynama sıcaklığını karşılaştıran bir veri gerekir.', 'Bağ, ölçülmüş bir kaynama sıcaklığı değildir; çürütmek için iki sıvının kaynama sıcaklığı karşılaştırılmalı.', ''],
      right: 'Evet. HF çubuğunun daha yüksek olması iki sıvının aynı sıcaklıkta kaynamadığını gösterir.',
    });
    await F.doldur(1, ['grafikte HF çubuğu', 'HCl’den yüksek']);
    isaret(c, F.kolon[0].e, 176, 385, 'no', 22);
    await c.say('Saf sıvının kaynama sıcaklığı dış basınca ve etkileşim türüne bağlıdır.');

    // Bilimsel bilgiyle karşılaştır.
    c.clearSay();
    await belir(c, F.g, 450, 0);
    const kk = c.S('g', {}, svg);
    kutu(c, kk, 40, 100, 440, 370, { rx: 16 }); kutu(c, kk, 520, 100, 440, 370, { rx: 16 });
    yazi(c, kk, 260, 150, 'iddialar', { size: 26, kalin: 700, renk: RENK.soluk });
    ['Dış basınç düşünce', 'kaynama noktası düşer.'].forEach((s, i) => yazi(c, kk, 260, 215 + i * 40, s, { size: 28, kalin: 600 }));
    ['Hidrojen bağı', 'kaynama noktasını yükseltir.'].forEach((s, i) => yazi(c, kk, 260, 325 + i * 40, s, { size: 28, kalin: 600 }));
    yazi(c, kk, 740, 150, 'bilimsel bilgi', { size: 26, kalin: 700, renk: RENK.vurgu });
    ['Saf sıvının kaynama', 'sıcaklığı dış basınca', 've etkileşim türüne', 'bağlıdır.'].forEach((s, i) => yazi(c, kk, 740, 215 + i * 42, s, { size: 28, kalin: 600 }));
    isaret(c, kk, 260, 425, 'ok', 20); isaret(c, kk, 740, 425, 'ok', 20);
    gizle(kk);
    await par(c.say('Bilimsel bilgi iki iddiayı da doğrular.'), belir(c, kk, 600, 1));
  }

  Ders.start({
    id: 'cesitlilik-j2', kicker: 'Konu J · Kaynama sıcaklığı', title: 'Kaynama noktası ve etkileşim türü', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Kaynama noktası ve etkileşim türü',
      hook: 'Aynı ocakta, aynı mutfakta su ile etil alkol neden farklı sıcaklıkta kaynar?',
      button: 'Derse başla ›',
    },
    goals: [
      'Aynı dış basınçta farklı sıvıların farklı sıcaklıkta kaynadığını buhar basıncı verisiyle gösterir.',
      'Etkileşim güçlendikçe kaynama noktasının yükseldiğini açıklar.',
      'Hidrojen bağının kaynama noktasını beklenenden yüksek yaptığını, bağ sayısı ve elektronegatiflik farkıyla ilişkilendirir.',
      'Kaynama noktasını belirleyen iki ölçütü ayırt eder ve iddiasını kanıt ve gerekçeyle açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Kaynamayı ve çekimle buhar basıncı ilişkisini hatırla.', run: hatirla },
      { title: 'Aynı dış basınç, üç sıvı', goal: 'Üç sıvının kaynama sıcaklıklarını buhar basıncından oku.', run: ucSivi },
      { title: 'Üç sıvı, üç etkileşim türü', goal: 'Metan, hidrojen sülfür ve suyun kaynama sıcaklığını etkileşimle ilişkilendir.', run: ucTur },
      { title: 'Beklenenden yüksek olanlar', goal: 'Hidrojenli bileşiklerin grafiğini oku.', run: yuksek },
      { title: 'Hidrojen bağı sayısı ve elektronegatiflik farkı', goal: 'Hidrojen bağlı sıvılar arasındaki farkı açıkla.', run: sayi },
      { title: 'Tek tabloda: dış basınç ve sıvı türü', goal: 'İki etkiyi ayrı ayrı gör.', run: tekTabloS },
      { title: 'Neler belirler, neler belirlemez?', goal: 'Kaynama noktasını belirleyenleri ayır.', run: belirler },
      { title: 'İddiayı kanıtla', goal: 'İddia, kanıt ve gerekçeyi kur.', run: iddia },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İki sıvının buhar basıncı aynı sıcaklıkta farklıdır; birinin moleküller arası çekimi daha kuvvetlidir. Aynı dış basınçta bu sıvının kaynama noktası nasıldır?',
        options: ['Daha düşüktür', 'Aynıdır', 'Daha yüksektir'], answer: 2,
        why: ['Kuvvetli çekim buhar basıncını düşük tutar; kaynama noktası düşmez.', 'Çekim farklıysa buhar basıncı da kaynama noktası da farklıdır.', 'Çekim kuvvetliyse buhar basıncı düşük kalır; dış basınca ulaşması için daha çok ısı gerekir.'], scene: 1 },
      { q: 'HF ile HBr aynı dış basınçta kaynatılıyor. HF’nin daha yüksek kaynamasının nedeni nedir?',
        options: ['HF daha büyük bir moleküldür', 'HF hidrojen bağı kurar', 'HF’nin buhar basıncı daha büyüktür'], answer: 1,
        why: ['Molekül büyüklüğü bu dersin ölçütü değildir.', 'F–H bağı hidrojen bağı kurdurur; hidrojen bağı kaynama noktasını yükseltir.', 'Buhar basıncı büyük olan sıvı daha düşük sıcaklıkta kaynar; HF’nin kaynama noktası yüksek.'], scene: 3 },
      { q: 'Su, HF ve NH₃ hidrojen bağı kurar. Kaynama sıcaklıkları için hangisi doğrudur?',
        options: ['Hidrojen bağı sayısı ve elektronegatiflik farkı yüzünden farklıdır', 'Hepsi hidrojen bağı kurduğu için aynıdır', 'Hepsi 100 °C’ta kaynar'], answer: 0,
        why: ['Su, HF’den daha çok hidrojen bağı kurar; HF’de fark NH₃’tekinden büyüktür.', 'Hidrojen bağı kuran sıvıların kaynama sıcaklığı bağ sayısına ve farka göre değişir.', 'Su 100, HF 19,5, NH₃ −33,3 °C’ta kaynar.'], scene: 4 },
      { q: 'Bir öğrenci dış basıncın etkisini sınamak istiyor. Hangi ölçümleri karşılaştırmalıdır?',
        options: ['İki farklı sıvının aynı dış basınçta kaynama sıcaklığını', 'İki farklı sıvının iki farklı basınçta kaynama sıcaklığını', 'Aynı sıvının iki farklı dış basınçta kaynama sıcaklığını'], answer: 2,
        why: ['Bu karşılaştırma sıvı türünün etkisini gösterir.', 'İki şey birden değişiyor; etkiyi ayıramazsın.', 'Yalnızca dış basınç değişir, sıvı sabit kalır.'], scene: 5 },
      { q: 'Bir öğrenci “Isıtıcıyı güçlendirirsem su 1 atm’de daha yüksek sıcaklıkta kaynar” diyor. Doğru mu?',
        options: ['Evet; ısı arttıkça kaynama noktası yükselir', 'Hayır; kaynama noktası ısıtıcının gücüne bağlı değildir', 'Hayır; yalnızca kabın şekline bağlıdır'], answer: 1,
        why: ['Daha güçlü ısıtıcı suyu daha çabuk kaynatır, daha yüksek sıcaklıkta değil.', 'Kaynama noktasını dış basınç ve etkileşim türü belirler; ısıtıcının gücü belirlemez.', 'Kaynama noktası kabın şekline de bağlı değildir.'], scene: 6 },
    ],
    summary: [
      'Çekim güçlendikçe kaynama noktası yükselir.',
      'Hidrojen bağı kaynama noktasını beklenenden yüksek yapar.',
      'Hidrojen bağı sayısı ve F, O, N’nin elektronegatifliği hidrojen bağlı sıvılar arasındaki farkı açıklar.',
      '<b>Etkileşim güçlendikçe kaynama noktası yükselir.</b>',
    ],
    nextLesson: { href: 'j3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
