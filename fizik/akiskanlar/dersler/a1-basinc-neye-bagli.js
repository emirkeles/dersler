/* A1 — Basınç neye bağlı?
   Basınç iki şeye bağlıdır: yüzeye etki eden kuvvete ve kuvvetin yayıldığı yüzey alanına.
   Senaryo: plan/fizik/akiskanlar/senaryolar/A-basinc.md. Sıra plan/KURALLAR.md 3.2'ye göredir.
   Temanın ilk dersidir; "Hatırla" sahnesi yoktur. Kuma batma derinliği şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, tablo, sinifla } = window.KIT;
  const { BATMA, kumKabi, tugla, yigin, batir, kaldir, duzelt } = window.KIT_A;
  const { lerp, ease } = Ders;
  const ZEMIN = '#10162b', GOVDE = '#8f9bc4', GOVDE_KENAR = '#c3cbea';

  /* Tabanın altında aşağı bakan n küçük ok: aynı toplam kuvvetin yüzeye nasıl bölüştüğünü gösterir. */
  function basincOklari(c, p, x1, x2, y, n = 8, boy = 24) {
    const g = c.S('g', {}, p), ara = (x2 - x1) / n;
    for (let i = 0; i < n; i++) { const x = x1 + ara * (i + 0.5); ok(c, g, [x, y], [x, y + boy], RENK.basinc, 3); }
    return g;
  }
  /* Kuvvet oku ve yanında etiketi. */
  function kuvvetOku(c, p, x, y1, y2, etiket) {
    const g = c.S('g', {}, p);
    ok(c, g, [x, y1], [x, y2], RENK.kuvvet, 6);
    if (etiket) yazi(c, g, x + 18, (y1 + y2) / 2 + 6, etiket, { hiza: 'start', size: 24, kalin: 600, renk: RENK.kuvvet });
    return g;
  }

  /* ---- 1. Karda iki ayakkabı ---- */
  async function kar(c) {
    const svg = c.svg(1000, 562);
    const KY = 400;
    c.S('rect', { x: 60, y: KY, width: 880, height: 120, rx: 6, fill: '#cfd8ee', 'fill-opacity': 0.3 }, svg);
    const izler = c.S('g', {}, svg);
    cizgi(c, svg, [60, KY], [940, KY], '#e8eefc', 3);
    const iz = (x, w) => {
      const el = c.S('rect', { x, y: KY - 2, width: w, height: 0, fill: ZEMIN }, izler);
      return (d) => el.setAttribute('height', d > 0 ? d + 2 : 0);
    };
    const BOT = 'M4,0 H76 Q80,0 80,-6 V-24 Q80,-42 58,-44 H46 V-110 H6 V-6 Q6,0 4,0 Z';
    const bot = (p, x) => c.S('path', { d: BOT, transform: `translate(${x},${KY})`, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, p);

    // Sol: bot. Sağ: aynı bot, kar ayakkabısının üstünde.
    const sol = yigin(c, svg), sag = yigin(c, svg);
    bot(sol.g, 200);
    const solOk = kuvvetOku(c, sol.g, 240, KY - 220, KY - 124, 'ağırlık');
    const solTemas = cizgi(c, sol.g, [204, KY], [276, KY], RENK.alan, 7);
    c.S('rect', { x: 600, y: KY - 14, width: 260, height: 14, rx: 6, fill: '#aab4d6', stroke: GOVDE_KENAR, 'stroke-width': 2 }, sag.g);
    c.S('path', { d: BOT, transform: `translate(690,${KY - 14})`, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, sag.g);
    const sagOk = kuvvetOku(c, sag.g, 730, KY - 234, KY - 138, 'ağırlık');
    const sagTemas = cizgi(c, sag.g, [604, KY], [856, KY], RENK.alan, 7);
    const solIz = iz(200, 80), sagIz = iz(600, 260);
    const solOklar = basincOklari(c, svg, 204, 276, KY + 70), sagOklar = basincOklari(c, svg, 606, 854, KY + 16);
    const tanim = renkli(c, svg, 500, 550, [['basınç', RENK.basinc], ': yüzeyin her birimine düşen ', ['kuvvet', RENK.kuvvet]], { size: 24, kalin: 600 });
    gizle(sag.g, solOk, sagOk, solTemas, sagTemas, solOklar, sagOklar, tanim);
    const gom = (yg, izFn, d, ms = 1000) => c.tween(ms, (e) => { yg.koy(d * e); izFn(d * e); }, ease.inOut);

    // Anlat: durum, kuvvet, değişen tek şey, basıncın adı.
    await par(c.say('Ela karda botlarıyla yürüyor; her adımda ayağı kara gömülüyor.'), gom(sol, solIz, 64));
    await par(c.say('Ayağını kara bastıran kuvvet, Ela’nın ağırlığıdır.'), belir(c, solOk, 400));
    await par(c.say('Ela kar ayakkabısı takıyor: ayağı artık batmıyor.'), (async () => { await belir(c, sag.g, 450); await gom(sag, sagIz, 10); })());
    await par(c.say('Ela’nın ağırlığı değişmedi; kara bastıran kuvvet aynı.'), belir(c, sagOk, 400));
    await par(c.say('Değişen tek şey, kara değen yüzeyin büyüklüğü.'), belir(c, [solTemas, sagTemas], 400));
    await par(c.say('Aynı kuvvet geniş yüzeye yayılınca her yere daha azı düşer.'), belir(c, [solOklar, sagOklar], 400));
    await par(c.say('Yüzeyin her birimine düşen kuvvete basınç denir.'), belir(c, tanim, 400));

    // Sor: aynı ağırlık, bottan da küçük yüzey.
    c.clearSay();
    await belir(c, [sag.g, sagOklar], 300, 0.25);
    await c.choice({
      tag: 'Sıra sende', q: 'Ela ince topuklu bir ayakkabı giyip karda duruyor. Topuk kara nasıl batar?',
      options: ['Bot kadar batar', 'Bottan daha derine batar', 'Hiç batmaz'], answer: 1,
      hints: ['Ağırlık aynı; topuğun kara değen yüzeyi bottan da küçük.', '', 'Yüzey küçüldükçe kar daha çok ezilir.'],
      right: 'Evet. Yüzey küçüldükçe basınç büyür.',
    });
    // Gör: ince topuk bottan derine gömülür.
    const topuk = yigin(c, svg);
    c.S('path', { d: `M412,${KY - 150} H488 V${KY - 112} H473 L458,${KY} H442 L427,${KY - 112} H412 Z`, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, topuk.g);
    kuvvetOku(c, topuk.g, 450, KY - 250, KY - 164);
    cizgi(c, topuk.g, [443, KY], [457, KY], RENK.alan, 7);
    const topukIz = iz(440, 20);
    gizle(topuk.g);
    await belir(c, topuk.g, 400);
    await gom(topuk, topukIz, 108, 800);
    await c.say('Topuğun ucu küçücük: aynı ağırlık çok küçük bir yüzeye biniyor.');
  }

  /* ---- 2. Kumda tuğla: yüzey alanı ---- */
  async function yuzeyAlani(c) {
    const svg = c.svg(1000, 562);
    const kum = kumKabi(c, svg), Y = kum.y;
    const ckA = kum.cukur(250, 140), ckB = kum.cukur(610, 70);
    const a = yigin(c, svg, -40), b = yigin(c, svg, -40);
    const tA = tugla(c, a.g, 250, Y, { harf: 'A', temas: true });
    const okA = kuvvetOku(c, a.g, 320, Y - 170, Y - 84);
    const tB0 = tugla(c, b.g, 575, Y, { harf: 'B' });
    const tB = tugla(c, b.g, 610, Y, { dik: true, harf: 'B', temas: true });
    const okB0 = kuvvetOku(c, b.g, 645, Y - 170, Y - 84), okB = kuvvetOku(c, b.g, 645, Y - 240, Y - 154);
    const sig = yazi(c, svg, 320, Y + 62, 'sığ', { size: 26, kalin: 700, renk: ZEMIN });
    const derin = yazi(c, svg, 645, Y + 62, 'derin', { size: 26, kalin: 700, renk: ZEMIN });
    const sonuc = renkli(c, svg, 500, 546, [['yüzey alanı', RENK.alan], ' küçüldü → ', ['basınç', RENK.basinc], ' arttı'], { size: 28, kalin: 700 });
    gizle(kum.g, a.g, b.g, tB.g, okB, okA, okB0, tA.temas, tB.temas, sig, derin, sonuc);

    // Anlat: düzenek ve iki duruş.
    await par(c.say('Bunu sınamak için kum dolu bir kap ve özdeş tuğlalar alalım.'), (async () => { await belir(c, kum.g, 450); await belir(c, [a.g, b.g], 400); })());
    await par(c.say('Özdeş tuğlaların ağırlığı aynıdır: kuma aynı kuvvetle bastırırlar.'), belir(c, [okA, okB0], 400));
    await c.say('A tuğlasını geniş yüzünün üstüne yatırıyoruz.');
    await par(c.say('B tuğlasını dar yüzünün üstüne dikiyoruz.'), par(belir(c, [tB0.g, okB0], 350, 0), belir(c, [tB.g, okB], 350)));
    await par(c.say('Kuvvetler eşit; yalnızca kuma değen yüzey alanı farklı.'), belir(c, [tA.temas, tB.temas], 400));

    // Tahmin: kuvvet aynı, yüzey farklı.
    await c.choice({
      tag: 'Tahmin et', q: 'Tuğlalar kuma bırakılınca hangisi daha derine batar?',
      options: ['Yatık duran A', 'İkisi aynı derinliğe batar', 'Dik duran B'], answer: 2,
      hints: ['A’nın ağırlığı daha geniş bir yüzeye yayılıyor.', 'Kuvvetler eşit ama kuma değen yüzeyler farklı.', ''],
      right: 'Evet. Dar yüzeyde basınç daha büyük.',
    });
    // Gör: iki tuğla kuma iner, sonra kaldırılır.
    await par(batir(c, a, ckA, BATMA.yatik), batir(c, b, ckB, BATMA.dik));
    await c.wait(500);
    await par(kaldir(c, a, 120), kaldir(c, b, 120));
    await par(c.say('Tuğlaları kaldırınca çukurlar görünüyor: B’nin çukuru daha derin.'), belir(c, [sig, derin], 400));
    await par(c.say('Kuvvet aynıyken yüzey alanı küçülürse basınç artar.'), belir(c, sonuc, 400));
  }

  /* ---- 3. Kumda tuğla: kuvvet ---- */
  async function kuvvet(c) {
    const svg = c.svg(1000, 562);
    const kum = kumKabi(c, svg, { x1: 60, x2: 520 }), Y = kum.y;
    const ckA = kum.cukur(130, 70), ckB = kum.cukur(360, 70);
    const a = yigin(c, svg, -40), b = yigin(c, svg, -40);
    tugla(c, a.g, 130, Y, { dik: true, harf: 'A', temas: true });
    tugla(c, b.g, 360, Y, { dik: true, harf: 'B', temas: true });
    const tC = tugla(c, b.g, 360, Y - 190, { dik: true, harf: 'C' });
    const okA = kuvvetOku(c, a.g, 100, Y - 110, Y - 50), okB = kuvvetOku(c, b.g, 330, Y - 170, Y - 50);
    const tb = tablo(c, svg, { x: 548, y: 130, satir: 2, h: 52, sutunlar: [{ ad: 'Ne değişti?', w: 192 }, { ad: 'Ne oldu?', w: 132 }, { ad: 'Basınç', w: 100, renk: RENK.basinc }] });
    tb.yaz(0, 0, 'alan küçüldü', RENK.alan); tb.yaz(0, 1, 'daha derin'); tb.yaz(0, 2, 'arttı', RENK.basinc);
    tb.yaz(1, 0, 'kuvvet büyüdü', RENK.kuvvet); tb.yaz(1, 1, '?'); tb.yaz(1, 2, '?', RENK.basinc);
    gizle(tb.g, tC.g, okA, okB);

    // Anlat: önce eşit iki tuğla, sonra üstüne üçüncüsü.
    await c.say('Şimdi yüzey alanını sabit tutup kuvveti değiştirelim.');
    await par(c.say('A ve B tuğlaları dik duruyor; ikisi kuma aynı derinlikte batıyor.'), (async () => {
      await par(batir(c, a, ckA, BATMA.dik), batir(c, b, ckB, BATMA.dik));
      await c.wait(400);
      await par(kaldir(c, a), kaldir(c, b));
    })());
    await par(c.say('Az önceki sonucu bir tabloya yazalım: yüzey alanı küçüldü, basınç arttı.'), (async () => { await belir(c, tb.g, 400); await tb.goster(0); })());
    await par(c.say('Kumu düzeltip B’nin üstüne özdeş bir C tuğlası koyuyoruz.'), (async () => {
      await par(duzelt(c, ckA), duzelt(c, ckB));
      await belir(c, tC.g, 300);
      await tC.git(360, Y - 140, 700);
    })());
    await par(c.say('B’nin kuma değen yüzeyi aynı; üstündeki ağırlık iki katına çıktı.'), belir(c, [okA, okB], 400), tb.goster(1));

    // Birlikte çöz: tablonun ikinci satırı.
    c.clearSay();
    tb.vurgula(1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Tablonun ikinci satırını sen tamamla. Kuvvet büyüyünce tuğla nasıl batar, basınç ne olur?',
      options: ['Daha derin batar; basınç artar', 'Aynı derinliğe batar; basınç değişmez', 'Daha az batar; basınç azalır'], answer: 0,
      hints: ['', 'Aynı yüzeye şimdi iki tuğlanın ağırlığı biniyor.', 'Yüzeyin her birimine düşen kuvvet arttı.'],
      right: 'Evet. Aynı yüzeye daha büyük kuvvet biniyor.',
    });
    // Gör: tek tuğla ve iki tuğla kuma iner, kaldırılır.
    await par(batir(c, a, ckA, BATMA.dik), batir(c, b, ckB, BATMA.cift));
    await c.wait(500);
    await par(kaldir(c, a), kaldir(c, b));
    tb.yaz(1, 1, 'daha derin'); tb.yaz(1, 2, 'arttı', RENK.basinc); tb.vurgula(1, false);
    await c.say('Üst üste iki tuğla, tek tuğladan daha derine battı.');
    await c.say('Yüzey alanı aynıyken kuvvet büyürse basınç artar.');
  }

  /* ---- 4. Aynı kuvvet, aynı yüzey ---- */
  async function ayniBasinc(c) {
    const svg = c.svg(1000, 562);
    const kum = kumKabi(c, svg), Y = kum.y;
    const ckS = kum.cukur(260, 70), ckR = kum.cukur(640, 70);
    const s = yigin(c, svg, -30), r = yigin(c, svg, -30);
    tugla(c, s.g, 260, Y, { dik: true, harf: 'B', temas: true });
    const sA = tugla(c, s.g, 260, Y - 140, { dik: true, harf: 'A' });
    tugla(c, r.g, 640, Y, { dik: true, harf: 'B', temas: true });
    const rA = tugla(c, r.g, 605, Y - 140, { harf: 'A' });
    const dip = cizgi(c, svg, [200, Y + BATMA.cift], [800, Y + BATMA.cift], ZEMIN, 3, { 'stroke-dasharray': '10 8' });
    const k1 = renkli(c, svg, 500, 62, [['kuvvet', RENK.kuvvet], ' büyürse ', ['basınç', RENK.basinc], ' artar'], { size: 26, kalin: 700 });
    const k2 = renkli(c, svg, 500, 100, [['yüzey alanı', RENK.alan], ' büyürse ', ['basınç', RENK.basinc], ' azalır'], { size: 26, kalin: 700 });
    gizle(s.g, r.g, sA.g, rA.g, dip, k1, k2);

    // Anlat: iki ayrı diziliş.
    await par(c.say('Son deneme: iki tuğlayı iki ayrı biçimde üst üste koyuyoruz.'), belir(c, [s.g, r.g], 450));
    await par(c.say('Solda A, dik duran B’nin üstünde dik duruyor.'), belir(c, sA.g, 400));
    await par(c.say('Sağda A, dik duran B’nin üstüne yatırılmış.'), belir(c, rA.g, 400));

    // Sor: hedeflenen yanılgı.
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi düzenek kuma daha derine batar?',
      options: ['Soldaki; daha yüksek', 'Sağdaki; üstü daha geniş', 'İkisi aynı derinliğe batar'], answer: 2,
      hints: ['Yükseklik kuma değmez. Toplam ağırlığa ve kuma değen yüzeye bak.', 'Üstteki tuğlanın duruşu, kuma değen yüzeyi değiştirmez.', ''],
      right: 'Evet. Kuvvet de kuma değen yüzey de aynı.',
    });
    // Gör: ikisi aynı derinliğe iner.
    await par(batir(c, s, ckS, BATMA.cift), batir(c, r, ckR, BATMA.cift));
    await belir(c, dip, 400);
    await c.say('İki düzenekte de kuma iki tuğlanın ağırlığı biniyor.');
    await c.say('İkisinde de kuma değen yüzey, B’nin dar yüzü.');
    await c.say('Kuvvet ve yüzey alanı aynıysa basınç da aynıdır.', { speak: '[thoughtful] Kuvvet ve yüzey alanı aynıysa basınç da aynıdır.' });
    await par(c.say('Basınç iki şeye bağlıdır: kuvvete ve kuvvetin yayıldığı yüzey alanına.'), (async () => { await belir(c, k1, 400); await belir(c, k2, 400); })());
    c.note('<b>Basınç kuvvete ve yüzey alanına bağlıdır.</b><br>Örnek: dik tuğla derin batar.', 'Basınç', 'basinc');
  }

  /* ---- 5. Çivi nasıl çakılır? ---- */
  async function civi(c) {
    const svg = c.svg(1000, 562);
    const BY = 380, CX = 420, METAL = '#c3cbea';
    c.S('rect', { x: 250, y: BY, width: 500, height: 140, rx: 8, fill: '#7a5236', stroke: '#a9764f', 'stroke-width': 2.5 }, svg);
    // Çivi: başı üstte, sivri ucu tahtanın yüzeyinde. Kuvvet okları çiviyle birlikte iner.
    const cv = yigin(c, svg);
    c.S('path', { d: `M${CX - 45},150 H${CX + 45} V162 H${CX + 7} V${BY - 30} L${CX},${BY} L${CX - 7},${BY - 30} V162 H${CX - 45} Z`, fill: METAL }, cv.g);
    const okBas = kuvvetOku(c, cv.g, CX, 50, 140, 'kuvvet');
    const okUc = kuvvetOku(c, svg, CX + 34, 284, 374, 'aynı kuvvet');
    const genis = yazi(c, cv.g, CX - 62, 164, 'geniş yüzey', { hiza: 'end', size: 24, kalin: 600, renk: RENK.alan });
    const dar = yazi(c, svg, CX - 24, 372, 'dar yüzey', { hiza: 'end', size: 24, kalin: 600, renk: RENK.alan });
    const kucuk = yazi(c, cv.g, CX - 62, 196, 'küçük basınç', { hiza: 'end', size: 24, kalin: 700, renk: RENK.basinc });
    const buyuk = yazi(c, svg, CX - 24, 340, 'büyük basınç', { hiza: 'end', size: 24, kalin: 700, renk: RENK.basinc });
    // Ters çivi: başı tahtada, ucu yukarıda; işe yaramayan yol gridir.
    const ters = c.S('g', {}, svg), TX = 660;
    c.S('path', { d: `M${TX - 45},${BY} H${TX + 45} V${BY - 12} H${TX + 7} V180 L${TX},150 L${TX - 7},180 V${BY - 12} H${TX - 45} Z`, fill: RENK.gri }, ters);
    const tersOk = yigin(c, ters);
    ok(c, tersOk.g, [TX, 50], [TX, 140], RENK.kuvvet, 6);
    gizle(okBas, okUc, genis, dar, kucuk, buyuk, ters);

    // Anlat: kuvvet iletilir, yüzeyler farklıdır.
    await par(c.say('Çekiçle çivinin başına vuruyorsun: çivi tahtaya giriyor.'), belir(c, okBas, 400));
    await par(c.say('Çivi, başına uygulanan kuvveti ucuna aynen iletir.'), belir(c, okUc, 400));
    await par(c.say('Başta ve uçta kuvvet aynı; yüzey alanları ise çok farklı.'), belir(c, [genis, dar], 400));
    await par(c.say('Çivinin başı geniştir: orada basınç küçüktür.'), belir(c, kucuk, 400));

    // Sor: aynı kuvvet, çok küçük yüzey.
    await c.choice({
      tag: 'Sıra sende', q: 'Çivinin sivri ucunda basınç nasıldır?',
      options: ['Baştakiyle aynıdır', 'Baştakinden küçüktür', 'Baştakinden çok büyüktür'], answer: 2,
      hints: ['Kuvvet aynı ama uçtaki yüzey çok daha küçük.', 'Küçük yüzeyde basınç artar.', ''],
      right: 'Evet. Aynı kuvvet çok küçük bir yüzeye biniyor.',
    });
    await belir(c, buyuk, 400);
    await par(c.say('Uçtaki büyük basınç tahtayı deler; çivi içeri girer.'), (async () => { await belir(c, okUc, 250, 0); await cv.git(90, 700); })());
    await par(c.say('Çiviyi ters çevirip başından çakmayı dene: girmez.'), (async () => {
      await belir(c, ters, 400);
      await tersOk.git(12, 300); await tersOk.git(0, 300);
    })());
    await c.say('Kuvvet aynı; geniş yüzeydeki basınç tahtayı delmeye yetmez.');
  }

  /* ---- 6. Artır mı, azalt mı? ---- */
  /* Kartın şeması: gri gövde, zemin çizgisi ve zemine değen turkuaz kenar. Merkez (500, 230), zemin y = 300. */
  function kartCiz(c, p, tur) {
    const g = c.S('g', {}, p), Z = 300, X = 500;
    const govde = (d) => c.S('path', { d, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
    const temas = (w) => cizgi(c, g, [X - w / 2, Z], [X + w / 2, Z], RENK.alan, 8);
    cizgi(c, g, [X - 150, Z], [X + 150, Z], RENK.ince, 3);
    if (tur === 'bicak') { govde(`M${X - 22},160 H${X + 22} L${X},${Z} Z`); temas(8); }
    if (tur === 'palet') {
      govde(`M${X - 70},178 H${X + 50} V236 H${X - 70} Z`);
      c.S('rect', { x: X - 120, y: 244, width: 240, height: 56, rx: 28, fill: '#5b678f', stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, g);
      [-84, -28, 28, 84].forEach((dx) => c.S('circle', { cx: X + dx, cy: 272, r: 17, fill: ZEMIN, stroke: GOVDE_KENAR, 'stroke-width': 2 }, g));
      temas(196);
    }
    if (tur === 'raptiye') { govde(`M${X - 46},168 H${X + 46} V188 H${X + 6} L${X},${Z} L${X - 6},188 H${X - 46} Z`); temas(8); }
    if (tur === 'tekerlek') {
      c.S('rect', { x: X - 70, y: 164, width: 140, height: 136, rx: 26, fill: '#5b678f', stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, g);
      [-42, -14, 14, 42].forEach((dx) => cizgi(c, g, [X + dx, 176], [X + dx, 288], ZEMIN, 5));
      temas(128);
    }
    if (tur === 'kazik') { govde(`M${X + 40},158 L${X + 62},168 L${X + 4},${Z} L${X - 4},${Z} Z`); temas(10); }
    if (tur === 'aski') {
      c.S('path', { d: `M${X - 130},${Z} Q${X},196 ${X + 130},${Z} Z`, fill: '#5b678f', stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, g);
      c.S('path', { d: `M${X - 52},276 Q${X},236 ${X + 52},276`, fill: 'none', stroke: RENK.alan, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
      govde(`M${X - 52},168 H${X + 52} V262 Q${X},224 ${X - 52},262 Z`);
    }
    if (tur === 'topuk') {
      govde(`M${X - 30},160 H${X + 30} V196 H${X + 18} L${X + 8},284 H${X - 8} L${X - 18},196 H${X - 30} Z`);
      c.S('rect', { x: X - 34, y: 284, width: 68, height: 16, rx: 5, fill: '#aab4d6', stroke: GOVDE_KENAR, 'stroke-width': 2 }, g);
      temas(60);
    }
    return g;
  }

  async function artirAzalt(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 80, ad: 'Basıncı artırır' }, { x: 520, ad: 'Basıncı azaltır' }], sayac = [0, 0];
    KUTU.forEach((k) => { kutu(c, svg, k.x, 56, 400, 54, { rx: 10 }); yazi(c, svg, k.x + 200, 92, k.ad, { size: 26, kalin: 700, renk: RENK.basinc }); });
    const sahne = c.S('g', {}, svg);
    let cizim = null, baslik = null;
    const goster = async (k) => {
      cizim = kartCiz(c, sahne, k.tur);
      baslik = yazi(c, sahne, 500, 344, k.ad, { size: 26, kalin: 700 });
      gizle(cizim, baslik);
      await belir(c, [cizim, baslik], 350);
    };
    /* Kart kutusunun altına küçülerek gider; adı listeye yazılır. */
    const yerlestir = async (k) => {
      const kx = KUTU[k.kutu].x + 200, ky = 400 + sayac[k.kutu] * 36;
      const el = cizim, bs = baslik;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, kx - 500, e)},${lerp(0, ky - 230, e)}) translate(500,230) scale(${lerp(1, 0.15, e)}) translate(-500,-230)`);
        el.style.opacity = 1 - e; bs.style.opacity = 1 - e;
      }, ease.inOut);
      el.remove(); bs.remove();
      const ad = yazi(c, svg, kx, ky, k.ad, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300);
      sayac[k.kutu]++;
    };
    const ORNEK = [{ tur: 'bicak', ad: 'Bıçak ağzı', kutu: 0 }, { tur: 'palet', ad: 'Paletli iş makinesi', kutu: 1 }];
    const KARTLAR = [
      { tur: 'raptiye', ad: 'Raptiye ucu', uzun: 'Raptiyenin sivri ucu', kutu: 0, neden: 'Evet. Sivri uç panoya az kuvvetle girer: kolaylık.' },
      { tur: 'tekerlek', ad: 'Traktör tekerleği', uzun: 'Traktörün geniş arka tekerleği', kutu: 1, neden: 'Evet. Geniş tekerlek yumuşak toprağa batmaz.' },
      { tur: 'kazik', ad: 'Çadır kazığı', uzun: 'Çadır kazığının sivri ucu', kutu: 0, neden: 'Evet. Sivri uç toprağa kolay girer.' },
      { tur: 'aski', ad: 'Çanta askısı', uzun: 'Sırt çantasının geniş askısı', kutu: 1, neden: 'Evet. Geniş askı omzu daha az ezer: konfor.' },
      { tur: 'topuk', ad: 'Geniş topuk ucu', uzun: 'İnce topuğa takılan geniş uç', kutu: 1, neden: 'Evet. Topuk çime batmaz, yürümek rahatlar.' },
    ];

    // Anlat: iki amaç, birer örnek.
    await c.say('Bazı araçlar basıncı artırmak, bazıları azaltmak için tasarlanır.');
    await par(c.say('Kesmek ve delmek için basınç artırılır: yüzey küçültülür.'), goster(ORNEK[0]));
    await c.say('Bıçağın ağzı incedir: az kuvvetle büyük basınç yapar, ekmeği kolay keser.');
    await yerlestir(ORNEK[0]);
    await par(c.say('Batmamak ve ezmemek için basınç azaltılır: yüzey büyütülür.'), goster(ORNEK[1]));
    await c.say('Paletli iş makinesi ağırdır; geniş paletleri sayesinde çamura batmaz.');
    await yerlestir(ORNEK[1]);

    // Dene: beş kartı öğrenci yerleştirir.
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Zemine değen yüzeye bak: küçük mü, büyük mü?' }, k)),
      soru: (k) => `${k.uzun} basıncı artırmak için mi, azaltmak için mi böyle yapılmıştır?`,
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Bir aleti kullanışlı yapmak, çoğu zaman yüzey alanını değiştirmektir.');
    await c.say('Aynı kuvvet, küçük yüzeyde daha büyük basınç yapar.');
  }

  Ders.start({
    id: 'akiskanlar-a1', kicker: 'Konu A · Basınç', title: 'Basınç neye bağlı?', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Basınç neye bağlı?',
      hook: 'Karda botla yürürken batıyorsun, kar ayakkabısıyla batmıyorsun; ağırlığın aynıyken değişen ne?',
      button: 'Derse başla ›',
    },
    goals: ['Basıncın kuvvete ve yüzey alanına bağlı olduğunu söyler.', 'Biri sabitken öteki değişince basıncın nasıl değiştiğini açıklar.', 'Bir aracın basıncı artırmak için mi azaltmak için mi tasarlandığını ayırır.'],
    scenes: [
      { title: 'Karda iki ayakkabı', goal: 'Aynı ağırlığın farklı yüzeylerde karı nasıl ezdiğini gör.', run: kar },
      { title: 'Kumda tuğla: yüzey alanı', goal: 'Kuvvet aynıyken yüzey alanı değişince ne olduğunu bul.', run: yuzeyAlani },
      { title: 'Kumda tuğla: kuvvet', goal: 'Yüzey alanı aynıyken kuvvet değişince ne olduğunu bul.', run: kuvvet },
      { title: 'Aynı kuvvet, aynı yüzey', goal: 'Basıncın yalnızca kuvvete ve yüzey alanına bağlı olduğunu gör.', run: ayniBasinc },
      { title: 'Çivi nasıl çakılır?', goal: 'Aynı kuvvetin sivri uçta neden büyük basınç yaptığını açıkla.', run: civi },
      { title: 'Artır mı, azalt mı?', goal: 'Araçları basıncı artıranlar ve azaltanlar diye ayır.', run: artirAzalt },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir çocuk kumsalda önce iki ayağının üstünde, sonra parmak uçlarında duruyor. Kuma yaptığı basınç nasıl değişir?',
        options: ['Değişmez; ağırlığı aynıdır', 'Artar; aynı ağırlık daha küçük yüzeye biner', 'Azalır; kuma daha az yeri değer'], answer: 1,
        why: ['Ağırlık aynı kalır ama basınç yüzey alanına da bağlıdır.', 'Kuvvet aynıyken yüzey alanı küçülürse basınç artar.', 'Değen yüzeyin küçülmesi basıncı azaltmaz, artırır.'], scene: 1 },
      { q: 'Özdeş iki tuğladan biri yatık, biri dik duruyor. Hangisi doğrudur?',
        options: ['Yere uyguladıkları kuvvet eşit, basınç farklıdır', 'Kuvvetleri de basınçları da eşittir', 'Dik duran tuğla daha ağırdır'], answer: 0,
        why: ['Ağırlıkları aynıdır; yere değen yüzeyleri farklı olduğu için basınçları farklıdır.', 'Yere değen yüzeyleri farklıdır; basınç eşit olamaz.', 'Özdeş tuğlaların ağırlığı duruşa göre değişmez.'], scene: 1 },
      { q: 'Yüklü bir kamyon yumuşak toprağa batıyor; yükü boşaltılınca batmadan ilerliyor. Neden?',
        options: ['Tekerleklerin yere değen yüzeyi büyüdü', 'Kuvvet azaldı ama basınç aynı kaldı', 'Kuvvet azaldı; aynı yüzeyde basınç azaldı'], answer: 2,
        why: ['Tekerlekler değişmedi; değişen, toprağa binen ağırlıktır.', 'Yüzey aynıyken kuvvet azalırsa basınç da azalır.', 'Yüzey alanı aynıyken kuvvet küçülürse basınç azalır.'], scene: 2 },
      { q: 'Raptiyenin başına parmağınla bastırıyorsun; parmağın delinmiyor, pano deliniyor. Neden?',
        options: ['Uçtaki kuvvet baştakinden büyük', 'Kuvvet aynı; sivri uçta yüzey küçük, basınç büyük', 'Baştaki basınç uçtakinden büyük'], answer: 1,
        why: ['Raptiye kuvveti ucuna aynen iletir; kuvvet büyümez.', 'Aynı kuvvet uçta çok küçük bir yüzeye biner.', 'Baş geniştir; orada basınç küçüktür.'], scene: 4 },
      { q: 'Ağır bir dolabın ince ayakları parkede iz bırakıyor. İzi azaltmak için hangisi işe yarar?',
        options: ['Ayakları daha ince olanlarla değiştirmek', 'Dolabın içine daha çok eşya koymak', 'Ayakların altına geniş pullar koymak'], answer: 2,
        why: ['Yüzey küçülürse basınç artar; iz derinleşir.', 'Kuvvet büyürse basınç artar; iz derinleşir.', 'Aynı ağırlık daha geniş yüzeye yayılır; basınç azalır.'], scene: 5 },
    ],
    summary: ['Basınç, yüzeyin her birimine düşen kuvvettir.', 'Kuvvet büyürse basınç artar; yüzey alanı büyürse basınç azalır.', '<b>Aynı kuvvet, küçük yüzeyde daha büyük basınç yapar.</b>'],
    nextLesson: { href: 'a2-olc-kaydet-model.html', label: 'Sonraki: Ölç, kaydet, modele ulaş ›' },
  });
})();
