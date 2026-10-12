/* C1 — Hava da bir akışkandır
   Hava da sıvı gibi bir akışkandır ve ağırlığıyla basınç yapar; ama yoğunluğu her yerde aynı değildir, yükseldikçe azalır.
   Senaryo: plan/fizik/akiskanlar/senaryolar/C-acik-hava-basinci.md (C1). Sayı ve formül yoktur; havaya P = h·d·g uygulanmaz.
   Sahne 5 (kulak) kitapta yok; yalnızca "yükseldikçe açık hava basıncı azalır" ilkesine dayanır (PLAN.md karar 9). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, tablo, sinifla } = window.KIT;
  const { HAVA, ZEMIN_RENK, nokta, havaAlani, zemin, dag, cerceve, sivKabi, agirlikOku, olcuOku, yuzeyOklari, esitX,
    tanecikSatirlari, SEYREK_SATIRLAR } = window.KIT_C;
  const { lerp, ease } = Ders;
  const ACIK_MAVI = '#9ec3ff';

  /* Öğeleri sırayla (ara ms arayla) belirtir; her biri ms sürer. */
  const sirayla = (c, ogeler, ara, ms) => par(...ogeler.map((o, i) => (async () => { await c.wait(i * ara); await belir(c, o, ms); })()));
  /* bekle ms sonra öğeyi belirtir. */
  const sonra = async (c, bekle, el, ms) => { await c.wait(bekle); await belir(c, el, ms); };
  const kesikCizgi = (c, p, P, Q, renk) => cizgi(c, p, P, Q, renk, 3, { 'stroke-dasharray': '10 7' });

  /* ---- 0. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Soru 1: sıvıda bir nokta.
    const s1 = c.S('g', {}, svg);
    sivKabi(c, s1, { x1: 330, x2: 670, yUst: 100, yAlt: 470, yYuzey: 140 });
    nokta(c, s1, 500, 400, RENK.basinc);
    const soru = yazi(c, s1, 524, 410, '?', { hiza: 'start', size: 30, kalin: 700 });
    const acik1 = c.S('g', {}, svg);
    cerceve(c, acik1, 470, 140, 530, 400, ACIK_MAVI);
    agirlikOku(c, acik1, 500, 300, 389);
    yazi(c, acik1, 545, 352, 'ağırlık', { hiza: 'start', size: 22, renk: RENK.kuvvet });
    yazi(c, acik1, 545, 232, 'üstteki sıvı', { hiza: 'start', size: 22, renk: RENK.sivi });
    gizle(s1, acik1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, s1, 450));
    const dogru1 = 'Doğru cevap: noktanın üstündeki sıvının ağırlığı.';
    await c.choice({
      tag: 'Hatırla', q: 'Sıvının içindeki bir noktada basınca ne neden olur?',
      options: ['Kabın şekli', 'Üstündeki sıvının ağırlığı', 'Sıvının hareketi'], answer: 1,
      hints: [dogru1, '', dogru1], right: 'Evet. Üstündeki sıvının ağırlığı.',
    });
    c.clearSay();
    await par(c.say('Üstündeki sıvının ağırlığı noktaya basınç yapar.'), belir(c, soru, 200, 0), belir(c, acik1, 450));
    c.clearSay();
    await belir(c, [s1, acik1], 400, 0); s1.remove(); acik1.remove();

    // Soru 2: kuvvet iki katına çıkar, yüzey aynı kalır.
    const s2 = c.S('g', {}, svg);
    cizgi(c, s2, [300, 400], [700, 400], '#8f9bc4', 5);
    c.S('rect', { x: 400, y: 330, width: 200, height: 70, rx: 5, fill: '#b9683f', stroke: '#eaa77e', 'stroke-width': 2.5 }, s2);
    cizgi(c, s2, [404, 400], [596, 400], RENK.alan, 7);
    yazi(c, s2, 500, 446, 'yüzey aynı', { size: 26, kalin: 600, renk: RENK.alan });
    const kok = ok(c, s2, [500, 190], [500, 322], RENK.kuvvet, 6);
    const etiket = yazi(c, s2, 520, 262, 'F', { hiza: 'start', size: 30, kalin: 700, renk: RENK.kuvvet });
    gizle(s2);
    await belir(c, s2, 450);
    const dogru2 = 'Doğru cevap: basınç da iki katına çıkar.';
    await c.choice({
      tag: 'Hatırla', q: 'Bir yüzeye etki eden kuvvet iki katına çıkıyor, yüzey aynı kalıyor. Basınç nasıl değişir?',
      options: ['Yarıya iner', 'Değişmez', 'İki katına çıkar'], answer: 2,
      hints: [dogru2, dogru2, ''], right: 'Evet. Kuvvet iki katına çıkarsa basınç da iki katına çıkar.',
    });
    c.clearSay();
    await par(c.say('Kuvvet iki katına çıkınca basınç da iki katına çıkar.'), c.tween(600, (e) => {
      const y1 = lerp(190, 60, e);
      kok.ciz([500, y1], [500, 322]); etiket.setAttribute('y', (y1 + 322) / 2 + 6);
      etiket.textContent = e > 0.5 ? '2F' : 'F';
    }, ease.inOut));
    c.clearSay();
    await belir(c, s2, 400, 0); s2.remove();
    const iki = renkli(c, svg, 500, 292, [['sıvı', RENK.sivi], ' ve ', ['hava', HAVA.cizgi], ' → akışkan?'], { size: 44, kalin: 700 });
    gizle(iki);
    await par(c.say('Bugün havanın da bir akışkan olup olmadığına bakacağız.'), belir(c, iki, 450));
  }

  /* ---- 1. Hava da sıvı gibi basınç yapar ---- */
  async function havaBasinc(c) {
    const svg = c.svg(1000, 562);
    // Sol bölme: sıvı.
    const sol = c.S('g', {}, svg);
    sivKabi(c, sol, { x1: 90, x2: 430, yUst: 150, yAlt: 470, yYuzey: 190 });
    nokta(c, sol, 260, 420, RENK.basinc);
    const solOk = c.S('g', {}, svg);
    cerceve(c, solOk, 230, 190, 290, 420, ACIK_MAVI);
    agirlikOku(c, solOk, 260, 330, 410);
    yazi(c, solOk, 300, 376, 'ağırlık', { hiza: 'start', size: 22, renk: RENK.kuvvet });
    yazi(c, solOk, 300, 256, 'üstteki sıvı', { hiza: 'start', size: 22, renk: RENK.sivi });
    // Sağ bölme: hava.
    const sag = c.S('g', {}, svg);
    havaAlani(c, sag, { x1: 520, x2: 940, y1: 90, y2: 470, ust: 0.25, alt: 0.25, kademe: 1 });
    zemin(c, sag, 520, 940, 470);
    nokta(c, sag, 730, 455, RENK.basinc);
    const ust = c.S('g', {}, svg);
    kesikCizgi(c, ust, [520, 90], [940, 90], HAVA.cizgi);
    yazi(c, ust, 600, 124, 'atmosferin üstü', { size: 22, renk: HAVA.cizgi });
    const sagOk = c.S('g', {}, svg);
    cerceve(c, sagOk, 700, 90, 760, 455, ACIK_MAVI);
    agirlikOku(c, sagOk, 730, 365, 445);
    yazi(c, sagOk, 770, 411, 'ağırlık', { hiza: 'start', size: 22, renk: RENK.kuvvet });
    yazi(c, sagOk, 770, 256, 'üstteki hava', { hiza: 'start', size: 22, renk: HAVA.cizgi });
    const ad = yazi(c, svg, 730, 525, 'açık hava basıncı', { size: 26, kalin: 700, renk: RENK.basinc });
    gizle(sol, solOk, sag, ust, sagOk, ad);

    await par(c.say('Sıvının içindeki bir noktaya, üstündeki sıvının ağırlığı basınç yapar.'), (async () => { await belir(c, sol, 500); await belir(c, solOk, 400); })());
    await par(c.say('Hava da sıvı gibi bir akışkandır.', { speak: '[curious] Hava da sıvı gibi bir akışkandır.' }), belir(c, sag, 600));
    await par(c.say('Atmosfer, azot, oksijen ve diğer gazlardan oluşan bir gaz tabakasıdır.'), belir(c, ust, 400));

    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Yeryüzündeki bir noktanın üstünde, atmosferin tepesine kadar hava var. Bu hava noktaya ne yapar?',
      options: ['Hiçbir şey yapmaz; hava çok hafiftir', 'Yalnızca rüzgâr eserken bastırır', 'Ağırlığıyla bastırır; basınç yapar'], answer: 2,
      hints: ['Sıvıda basıncı yapan şey, üstteki sıvının ağırlığıydı.', 'Havanın da üstünde atmosferin sonuna kadar uzanan bir sütun var.', ''],
      right: 'Evet. Havanın ağırlığı da basınç yapar.',
    });
    c.clearSay();
    await par(c.say('Atmosferi oluşturan gazlar, ağırlıklarıyla yüzeylere basınç uygular.'), belir(c, sagOk, 400));
    await par(c.say('Bu basınca açık hava basıncı denir.'), belir(c, ad, 400));
    c.note('<b>Atmosferin ağırlığı yüzeye basınç yapar.</b><br>Örnek: yerdeki her nokta.', 'Açık hava basıncı', 'acik-hava-basinci');
  }

  /* ---- 2. Sıvı sıkışmaz, hava sıkışır ---- */
  async function sikisma(c) {
    const svg = c.svg(1000, 562);
    // Sıvı kolonu: 6 sütun × 12 satır.
    const cs = cerceve(c, svg, 130, 100, 330, 470, RENK.sivi, { kesik: false });
    const bs = yazi(c, svg, 190, 80, 'sıvı', { hiza: 'start', size: 26, kalin: 700, renk: RENK.sivi });
    const sivSatirlari = Array.from({ length: 12 }, (_, i) => ({ y: 460 - 30 * i, xs: [160, 190, 220, 250, 280, 310] }));
    const siv = tanecikSatirlari(c, svg, sivSatirlari, { renk: RENK.sivi });
    // Hava kolonu: alttan üste seyrelir.
    const ch = cerceve(c, svg, 560, 100, 760, 470, HAVA.cizgi, { kesik: false });
    const bh = yazi(c, svg, 620, 80, 'hava', { hiza: 'start', size: 26, kalin: 700, renk: HAVA.cizgi });
    const hava = tanecikSatirlari(c, svg, SEYREK_SATIRLAR(590, 740));
    const sik = yazi(c, svg, 780, 440, 'sık', { hiza: 'start', size: 24, kalin: 600, renk: HAVA.cizgi });
    const seyrek = yazi(c, svg, 780, 130, 'seyrek', { hiza: 'start', size: 24, kalin: 600, renk: HAVA.cizgi });
    // Karşılaştırma pencereleri (200 × 60).
    const pencereler = c.S('g', {}, svg);
    [[130, 412], [130, 110], [560, 412], [560, 110]].forEach(([x, y]) => cerceve(c, pencereler, x, y, x + 200, y + 60, '#e6ecff', { kesik: false, w: 3 }));
    gizle(cs, bs, siv.satirlar.map((s) => s.g), ch, bh, hava.satirlar.map((s) => s.g), sik, seyrek, pencereler);

    await par(c.say('Sıvıların molekülleri arasındaki boşluk azdır; sıvılar sıkıştırılamaz kabul edilir.'),
      (async () => { await belir(c, [cs, bs], 300); await sirayla(c, siv.satirlar.map((s) => s.g), 40, 300); })());
    await c.say('Sıvıda yoğunluk her derinlikte aynıdır.');
    await par(c.say('Gazların molekülleri arasındaki mesafe büyüktür; gazlar sıkıştırılabilir.'), belir(c, [ch, bh], 300));
    const hg = hava.satirlar.map((s) => s.g);
    await par(c.say('Dünya yüzeyine yakın bölgelerde hava yoğunluğu daha fazladır.'), sirayla(c, hg.slice(0, 3), 60, 300));
    await par(c.say('Yükseldikçe hava seyrelir; yoğunluğu azalır.'), (async () => { await sirayla(c, hg.slice(3), 60, 300); await belir(c, [sik, seyrek], 400); })());

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bir dağın eteğindeki hava ile zirvesindeki hava karşılaştırılıyor. Hangisi doğrudur?',
      options: ['Zirvede hava yoğunluğu daha fazladır', 'Eteğin yakınında hava yoğunluğu daha fazladır', 'İkisinde hava aynı yoğunluktadır'], answer: 1,
      hints: ['Yeryüzüne yakın yerde hava daha sıkıdır.', '', 'Yükseldikçe hava seyrelir.'],
      right: 'Evet. Yeryüzüne yakın hava daha sıktır.',
    });
    c.clearSay();
    // Pencerelerin (y 110–170 ve 412–472) dışındaki satırlar soluklaşır: sıvıda 130, 160, 430, 460; havada 128, 428, 460 pencerelidir.
    const disarida = [];
    siv.satirlar.forEach((s) => { if (!(s.y >= 412 || s.y <= 170)) disarida.push(s.g); });
    hava.satirlar.forEach((s) => { if (!(s.y >= 412 || s.y <= 170)) disarida.push(s.g); });
    await par(c.say('Sıvı her yerde aynı yoğunluktadır; hava değil.'), belir(c, pencereler, 400), belir(c, disarida, 400, 0.3));
  }

  /* ---- 3. Derinlik ve yükseklik ---- */
  async function derinlikYukseklik(c) {
    const svg = c.svg(1000, 562);
    // Sol panel: sıvı.
    const sol = c.S('g', {}, svg);
    sivKabi(c, sol, { x1: 100, x2: 400, yUst: 90, yAlt: 470, yYuzey: 90 });
    const dOk1 = c.S('g', {}, svg), dOk2 = c.S('g', {}, svg);
    agirlikOku(c, dOk1, 250, 154, 190); agirlikOku(c, dOk2, 250, 301, 410);
    nokta(c, sol, 250, 200, RENK.basinc); nokta(c, sol, 250, 420, RENK.basinc);
    yazi(c, sol, 268, 208, 'D_{1}', { hiza: 'start', size: 22, renk: RENK.basinc, math: 'D_{1}' });
    yazi(c, sol, 268, 428, 'D_{2}', { hiza: 'start', size: 22, renk: RENK.basinc, math: 'D_{2}' });
    const derinlik = olcuOku(c, svg, 80, 90, 420, 'derinlik', { etiketX: 56 });
    // Sağ panel: hava ve dağ.
    const sag = c.S('g', {}, svg);
    havaAlani(c, sag, { x1: 540, x2: 900, y1: 90, y2: 470, ust: 0.10, alt: 0.40 });
    zemin(c, sag, 540, 900, 470);
    kesikCizgi(c, sag, [540, 90], [900, 90], HAVA.cizgi);
    yazi(c, sag, 600, 118, 'atmosferin üstü', { size: 22, renk: HAVA.cizgi });
    dag(c, sag, [[660, 470], [780, 230], [900, 470]]);
    nokta(c, sag, 590, 460, RENK.basinc); nokta(c, sag, 780, 221, RENK.basinc);
    yazi(c, sag, 606, 453, 'Y_{1}', { hiza: 'start', size: 22, renk: RENK.basinc, math: 'Y_{1}' });
    yazi(c, sag, 798, 214, 'Y_{2}', { hiza: 'start', size: 22, renk: RENK.basinc, math: 'Y_{2}' });
    const yukseklik = olcuOku(c, sag, 920, 221, 470, 'yükseklik', { etiketX: 950 });
    const yOk1 = c.S('g', {}, sag), yOk2 = c.S('g', {}, sag);
    agirlikOku(c, yOk1, 590, 359, 451); agirlikOku(c, yOk2, 780, 179, 212);
    gizle(sol, dOk1, dOk2, derinlik, sag, yOk1, yOk2);

    await par(c.say('Sıvıda derinlik arttıkça üstteki sıvı çoğalır, basınç artar.'),
      (async () => { await belir(c, sol, 500); await par(belir(c, dOk1, 400), sonra(c, 300, dOk2, 400)); })());
    await par(c.say('Derinlik, sıvının serbest yüzeyinden aşağıya doğru ölçülür.'), belir(c, derinlik, 400));
    await par(c.say('Havada yükseklik, deniz seviyesinden yukarı doğru ölçülür.'), belir(c, sag, 600));

    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Ela Y₁ noktasından dağın tepesindeki Y₂ noktasına çıkıyor. Açık hava basıncı nasıl değişir?',
      options: ['Artar; hava yükseldikçe çoğalır', 'Değişmez; hava her yerde aynı basıncı yapar', 'Azalır; üstündeki hava azalır'], answer: 2,
      hints: ['Sıvıda üstteki sıvı azalınca basınç azalıyordu.', 'Tepedeki bir noktanın üstünde, atmosferin sonuna kadar ne kadar hava var?', ''],
      right: 'Evet. Tepede üstteki hava daha az.',
    });
    c.clearSay();
    await par(c.say('Dağın tepesinde, atmosferin üstüne kadar olan hava daha azdır.'), par(belir(c, yOk1, 400), sonra(c, 300, yOk2, 400)));
    await c.say('Üstteki hava azaldığı için açık hava basıncı da azalır.');
    await c.say('Sıvıda derinlik arttıkça, havada yükseklik azaldıkça basınç artar.');
  }

  /* ---- 4. Yukarı çık, aşağı in ---- */
  async function yukariAsagi(c) {
    const svg = c.svg(1000, 562);
    dag(c, svg, [[60, 470], [280, 150], [500, 470]]);
    const ela = c.S('g', {}, svg);
    c.S('circle', { cx: 0, cy: 0, r: 10, fill: '#ffffff' }, ela);
    yazi(c, ela, -16, -6, 'Ela', { hiza: 'end', size: 22, kalin: 600 });
    const elaYer = (x, y) => ela.setAttribute('transform', `translate(${x},${y})`);
    elaYer(110, 397);
    const tab = tablo(c, svg, { x: 500, y: 130, satir: 2, h: 60, size: 22, sutunlar: [{ ad: 'Ne değişti?', w: 200 }, { ad: 'Üstteki hava', w: 170 }, { ad: 'Basınç', w: 110, renk: RENK.basinc }] });
    ['yükseklik arttı', 'azaldı', 'azaldı'].forEach((m, j) => tab.yaz(0, j, m));
    ['yükseklik azaldı', '?', '?'].forEach((m, j) => tab.yaz(1, j, m));
    const gez = (x0, y0, x1, y1) => c.tween(1200, (e) => elaYer(lerp(x0, x1, e), lerp(y0, y1, e)), ease.inOut);

    await par(c.say('Ela dağa tırmanırken yükseklik arttıkça üstündeki hava azalıyor.'), gez(110, 397, 280, 140));
    await par(c.say('Açık hava basıncı da azalıyor; sonucu tabloya yazalım.'), tab.goster(0));
    await par(c.say('Şimdi Ela tepeden vadiye iniyor: yükseklik azalıyor.'), tab.goster(1));

    c.clearSay();
    await c.choice({
      tag: 'Birlikte çöz', q: 'Tablonun ikinci satırını sen tamamla. Yükseklik azalınca üstteki hava ve açık hava basıncı ne olur?',
      options: ['Hava azalır; basınç artar', 'Hava çoğalır; basınç artar', 'Hava çoğalır; basınç azalır'], answer: 1,
      hints: ['Vadide Ela’nın üstünde daha çok hava var.', '', 'Üstteki hava çoğalınca basınç da çoğalır.'],
      right: 'Evet. Üstteki hava çoğalır, basınç artar.',
    });
    c.clearSay();
    tab.yaz(1, 1, 'çoğaldı'); tab.yaz(1, 2, 'arttı');
    await par(c.say('Vadide Ela’nın üstündeki hava çoğalır; açık hava basıncı artar.'), gez(280, 140, 110, 397));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Deniz kıyısında yüzen biri ile yüksek bir dağın zirvesinde duran biri karşılaştırılıyor. Hangisi daha büyük açık hava basıncı altındadır?',
      options: ['Zirvedeki', 'İkisi aynı basınç altındadır', 'Deniz kıyısındaki'], answer: 2,
      hints: ['Yükseldikçe açık hava basıncı azalır.', 'Kimin üstünde daha çok hava var?', ''],
      right: 'Evet. Kıyıda üstteki hava daha çok.',
    });
    c.clearSay();
    tab.vurgula(1);
    await c.say('Deniz kıyısında üstteki hava daha çok; basınç daha büyük.');
    c.note('<b>Yükseldikçe açık hava basıncı azalır.</b><br>Örnek: dağ zirvesi.', 'Yükseklik ve basınç', 'yukseklik-basinc');
  }

  /* ---- 5. Dağcının kulağı ---- */
  async function kulak(c) {
    const svg = c.svg(1000, 562);
    const g = c.S('g', {}, svg);
    c.S('rect', { x: 120, y: 150, width: 760, height: 260, fill: HAVA.dolgu, 'fill-opacity': 0.15 }, g);
    kutu(c, g, 360, 220, 280, 120, { rx: 16, dolgu: 'none', renk: RENK.cizgi, w: 3 });
    // İçerideki hava: oklar y = 280'den geçtiği için tanecikler iki satırda durur.
    [245, 315].forEach((y) => esitX(410, 590, 6).forEach((x) => c.S('circle', { cx: x, cy: y, r: 5, fill: HAVA.tanecik }, g)));
    yazi(c, g, 500, 376, 'kulağın içi', { size: 22, renk: RENK.cizgi });
    const solDis = yuzeyOklari(c, g, [360, 220], [360, 340], { n: 1, boy: 80, taraf: [300, 280] });
    const solIc = yuzeyOklari(c, g, [360, 220], [360, 340], { n: 1, boy: 80, taraf: [450, 280] });
    const sagDis = yuzeyOklari(c, g, [640, 220], [640, 340], { n: 1, boy: 80, taraf: [700, 280] });
    const sagIc = yuzeyOklari(c, g, [640, 220], [640, 340], { n: 1, boy: 80, taraf: [560, 280] });
    const vadi = yazi(c, svg, 140, 120, 'vadi', { hiza: 'start', size: 26, kalin: 700 });
    const zirve = yazi(c, svg, 140, 120, 'zirve', { hiza: 'start', size: 26, kalin: 700 });
    gizle(g, vadi, zirve);

    await par(c.say('Vadide kulağın içindeki ve dışındaki basınç eşittir.'), belir(c, [g, vadi], 450));
    await par(c.say('Dağcı tırmanınca dışarıdaki açık hava basıncı azalır.'),
      c.tween(700, (e) => { solDis.ciz(lerp(80, 30, e)); sagDis.ciz(lerp(80, 30, e)); }, ease.inOut),
      belir(c, vadi, 300, 0).then(() => { vadi.remove(); return belir(c, zirve, 300); }));
    await c.say('Kulağın içindeki basınç hemen azalmaz; kulak tıkanır.', { speak: '[thoughtful] Kulağın içindeki basınç hemen azalmaz; kulak tıkanır.' });
    await c.say('Dağa çıkan otobüste kulakların bu yüzden tıkanır.');
  }

  /* ---- 6. Sıvı ile hava: benzerlik ve fark ---- */
  async function benzerlikFark(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [
      { x: 25, ad: 'Benzerlik', renk: RENK.cizgi }, { x: 350, ad: 'Yalnızca sıvıda', renk: RENK.sivi }, { x: 675, ad: 'Yalnızca havada', renk: HAVA.cizgi },
    ];
    const sayac = [0, 0, 0];
    const kutular = c.S('g', {}, svg);
    KUTU.forEach((k) => {
      kutu(c, kutular, k.x, 60, 300, 50, { rx: 10, renk: k.renk });
      yazi(c, kutular, k.x + 150, 94, k.ad, { size: 26, kalin: 700, renk: k.renk });
      kutu(c, kutular, k.x, 130, 300, 390, { rx: 10, dolgu: 'none', renk: k.renk, w: 2 });
    });
    gizle(kutular);
    const sahne = c.S('g', {}, svg);
    let kart = null;
    /* Sıradaki kart ortada belirir (320–680, 190–310). */
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 320, 190, 360, 120, { rx: 14, renk: RENK.cizgi, w: 3 });
      const y0 = k.satirlar.length === 1 ? 262 : 242;
      k.satirlar.forEach((m, i) => yazi(c, kart, 500, y0 + i * 40, m, { size: 30, kalin: 700 }));
      gizle(kart);
      await belir(c, kart, 350);
    };
    /* Kart kutusunun içine küçülerek gider; adı listeye yazılır. */
    const yerlestir = async (k) => {
      const kx = KUTU[k.kutu].x + 150, ky = 170 + sayac[k.kutu] * 70, el = kart;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, kx - 500, e)},${lerp(0, ky - 250, e)}) translate(500,250) scale(${lerp(1, 0.2, e)}) translate(-500,-250)`);
        el.style.opacity = 1 - e;
      }, ease.inOut);
      el.remove();
      const adlar = k.satirlar.map((m, i) => yazi(c, svg, kx, ky + i * 26, m, { size: 22, kalin: 600 }));
      gizle(adlar); await belir(c, adlar, 300);
      sayac[k.kutu]++;
    };
    const ORNEK = [
      { ad: 'Akışkandır', satirlar: ['Akışkandır'], kutu: 0 },
      { ad: 'Sıkıştırılamaz sayılır', satirlar: ['Sıkıştırılamaz', 'sayılır'], kutu: 1 },
    ];
    const IPUCU = 'Önce iki akışkanda da var mı diye bak; ikisinde de varsa “Benzerlik”.';
    const KARTLAR = [
      { ad: 'Ağırlığıyla basınç yapar', satirlar: ['Ağırlığıyla', 'basınç yapar'], kutu: 0, neden: 'Evet. Sıvı da hava da ağırlığıyla basınç yapar.' },
      { ad: 'Yoğunluğu her yerde aynıdır', satirlar: ['Yoğunluğu her', 'yerde aynıdır'], kutu: 1, neden: 'Evet. Sıvının yoğunluğu her derinlikte aynıdır.' },
      { ad: 'Basınç derinlikle artar', satirlar: ['Basınç', 'derinlikle artar'], kutu: 1, neden: 'Evet. Derinlik arttıkça üstteki sıvı çoğalır.' },
      { ad: 'Sıkıştırılabilir', satirlar: ['Sıkıştırılabilir'], kutu: 2, neden: 'Evet. Hava bir gazdır; sıkıştırılabilir.' },
      { ad: 'Yoğunluğu yükseldikçe azalır', satirlar: ['Yoğunluğu', 'yükseldikçe azalır'], kutu: 2, neden: 'Evet. Yükseldikçe hava seyrelir.' },
      { ad: 'Basınç yükseldikçe azalır', satirlar: ['Basınç', 'yükseldikçe azalır'], kutu: 2, neden: 'Evet. Yükseldikçe üstteki hava azalır.' },
    ];

    await par(c.say('Sıvı ile havayı yan yana koyup karşılaştıralım.'), belir(c, kutular, 450));
    await par(c.say('İkisi de akışkandır.'), goster(ORNEK[0]));
    await yerlestir(ORNEK[0]);
    await par(c.say('Sıvı sıkıştırılamaz kabul edilir.'), goster(ORNEK[1]));
    await yerlestir(ORNEK[1]);

    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: IPUCU }, k)),
      soru: (k) => `“${k.ad}” sıvı ile hava için nasıldır?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Sıvı ve hava, ağırlıklarıyla basınç yapan iki akışkandır.');
    await c.say('Sıvıda derinlik, havada yükseklik basıncı değiştirir.');
    await c.say('Bir hava denizinin dibinde yaşıyoruz.', { speak: '[short pause] Bir hava denizinin dibinde yaşıyoruz.' });
  }

  Ders.start({
    id: 'akiskanlar-c1', kicker: 'Konu C · Açık hava basıncı', title: 'Hava da bir akışkandır', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Hava da bir akışkandır',
      hook: 'Dağa çıkan bir otobüste kulakların neden tıkanır?',
      button: 'Derse başla ›',
    },
    goals: [
      'Havanın da sıvı gibi ağırlığıyla basınç yaptığını söyler.',
      'Sıvı ile havanın benzerliklerini ve farklarını ayırır.',
      'Yükseldikçe açık hava basıncının neden azaldığını açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Sıvı basıncını ve basıncın neye bağlı olduğunu hatırla.', run: hatirla },
      { title: 'Hava da sıvı gibi basınç yapar', goal: 'Havanın ağırlığının basınç yaptığını gör.', run: havaBasinc },
      { title: 'Sıvı sıkışmaz, hava sıkışır', goal: 'Sıvı ile havanın yoğunluğunu karşılaştır.', run: sikisma },
      { title: 'Derinlik ve yükseklik', goal: 'Sıvıda derinlik ile havada yüksekliğin basınca etkisini karşılaştır.', run: derinlikYukseklik },
      { title: 'Yukarı çık, aşağı in', goal: 'Yükseklik değişince açık hava basıncının nasıl değiştiğini bul.', run: yukariAsagi },
      { title: 'Dağcının kulağı', goal: 'Kulağın dağda neden tıkandığını açıkla.', run: kulak },
      { title: 'Sıvı ile hava: benzerlik ve fark', goal: 'Özellikleri benzerlik ve fark diye ayır.', run: benzerlikFark },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela “Hava çok hafif, bu yüzden bir yüzeye basınç yapmaz” diyor. Hangisi doğrudur?',
        options: ['Hava yalnızca hareket ederken basınç yapar', 'Atmosferi oluşturan gazlar ağırlıklarıyla yüzeylere basınç yapar', 'Basıncı yalnızca sıvılar yapar'], answer: 1,
        why: ['Hareketsiz hava da ağırlığı yüzünden basınç yapar.', 'Havanın ağırlığı az görünse de üstündeki bütün sütun bastırır. Bu basınca açık hava basıncı denir.', 'Hava da bir akışkandır; o da ağırlığıyla basınç yapar.'], scene: 1 },
      { q: 'Hangisi sıvı ile hava arasındaki bir farktır?',
        options: ['Sıvı sıkıştırılamaz kabul edilir, hava sıkıştırılabilir', 'Yalnızca sıvı ağırlığıyla basınç yapar', 'Yalnızca hava akışkandır'], answer: 0,
        why: ['Gazların molekülleri arasındaki mesafe büyüktür; hava sıkıştırılabilir, sıvı sıkıştırılamaz kabul edilir.', 'İkisi de ağırlığıyla basınç yapar; bu bir benzerliktir.', 'Sıvı da akışkandır; bu bir benzerliktir.'], scene: 2 },
      { q: 'Deniz kıyısındaki bir kasaba ile yüksek bir yayla karşılaştırılıyor. Hangisi doğrudur?',
        options: ['Yaylada açık hava basıncı daha büyüktür', 'İkisinde de aynıdır; hava her yerde aynı yoğunluktadır', 'Yaylada üstteki hava daha az olduğundan açık hava basıncı daha küçüktür'], answer: 2,
        why: ['Yükseldikçe üstteki hava azalır; basınç büyümez.', 'Havanın yoğunluğu yükseldikçe azalır; her yerde aynı değildir.', 'Yaylanın üstünde daha az hava vardır; açık hava basıncı daha küçüktür.'], scene: 3 },
      { q: 'Bir dalgıç daha derine iniyor, bir dağcı daha yükseğe çıkıyor. Dalgıcın çevresindeki sıvı basıncı ve dağcının çevresindeki açık hava basıncı nasıl değişir?',
        options: ['İkisinde de artar', 'Dalgıçta artar, dağcıda azalır', 'Dalgıçta azalır, dağcıda artar'], answer: 1,
        why: ['Dağcı yükseldikçe üstündeki hava azalır; basıncı artmaz.', 'Dalgıcın üstündeki sıvı çoğalır, dağcının üstündeki hava azalır.', 'Durum ters: derine inen dalgıçta basınç artar, yükselen dağcıda azalır.'], scene: 3 },
      { q: 'Bir otobüs kıyıdan yüksek bir dağın tepesine çıkarken yolcuların kulakları tıkanıyor. Neden?',
        options: ['Dışarıdaki açık hava basıncı azalıyor', 'Dışarıdaki açık hava basıncı artıyor', 'Otobüsün üstündeki hava çoğalıyor'], answer: 0,
        why: ['Dışarıdaki basınç azalırken kulağın içindeki hemen azalmaz; basınçlar eşit kalmaz, kulak tıkanır.', 'Yükseldikçe açık hava basıncı artmaz, azalır.', 'Yükseldikçe otobüsün üstündeki hava çoğalmaz, azalır.'], scene: 5 },
    ],
    summary: [
      'Hava da sıvı gibi bir akışkandır; ağırlığıyla basınç yapar.',
      'Havanın yoğunluğu yükseldikçe azalır; sıvının yoğunluğu her yerde aynıdır.',
      'Sıvıda derinlik arttıkça, havada yükseklik azaldıkça basınç artar.',
      '<b>Bir hava denizinin dibinde yaşıyoruz.</b>',
    ],
    nextLesson: { href: 'c2-torricelli.html', label: 'Sonraki: Torricelli havayı nasıl tarttı? ›' },
  });
})();
