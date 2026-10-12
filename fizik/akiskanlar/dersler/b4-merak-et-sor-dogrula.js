/* B4 — Merak et, sor, doğrula
   Merak edilen bir sistem hakkında soru sorulur, bilgi toplanır, bilgi sınanır, ancak ondan sonra çıkarım yapılır.
   Ders tek sistem üzerinde ilerler: hidrolik fren. Bu derste sayı yoktur.
   Senaryo: plan/fizik/akiskanlar/senaryolar/B-sivilarda-basinc.md (B4). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Yerel yardımcılar: frenCiz (hidrolik fren şeması), kart (kaynak kartı), kontrolListesi (beş soruluk Evet/Hayır tablosu). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, tablo, sinifla } = window.KIT;
  const { sivKabi, basincCubugu, basincOklari } = window.KIT_B;
  const { lerp, ease } = Ders;
  const GOVDE = '#8f9bc4', ACIK = '#c3cbea', BEYAZ = '#ffffff';
  const SIVI_DOLGU = { fill: 'var(--c1)', 'fill-opacity': 0.8 };

  /* Beyaz onay işareti (gizli başlar). */
  function tik(c, p, x, y) {
    const e = c.S('path', { d: `M${x - 9},${y} l6,7 l12,-14`, fill: 'none', stroke: BEYAZ, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
    e.style.opacity = 0;
    return e;
  }

  /* Satır satır yazılı kart: satirlar = [{ m, kalin }]; çerçeve rengi sonradan değişir. */
  function kart(c, p, x, y, w, h, satirlar, ara = 28) {
    const g = c.S('g', {}, p), cerceve = kutu(c, g, x, y, w, h, { rx: 12 });
    satirlar.forEach((s, i) => yazi(c, g, x + 16, y + 34 + i * ara, s.m, { hiza: 'start', size: 22, kalin: s.kalin ? 700 : 500 }));
    return { g, cerceve, boya(renk, kalinlik) { cerceve.setAttribute('stroke', renk); cerceve.setAttribute('stroke-width', kalinlik); } };
  }

  /* Hidrolik fren şeması (yandan, sade). Etiketsizdir; etiketleri sahne koyar. */
  function frenCiz(c, p) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [140, 372], [222, 372], ACIK, 6);
    const pedal = c.S('g', {}, g);
    cizgi(c, pedal, [170, 330], [95, 415], ACIK, 12);
    c.S('rect', Object.assign({ x: 210, y: 340, width: 120, height: 60, rx: 6, stroke: GOVDE, 'stroke-width': 4 }, SIVI_DOLGU), g);
    c.S('rect', { x: 222, y: 344, width: 8, height: 52, rx: 2, fill: ACIK }, g);
    const boru = c.S('rect', Object.assign({ x: 330, y: 365, width: 290, height: 10, stroke: GOVDE, 'stroke-width': 3 }, SIVI_DOLGU), g);
    c.S('rect', Object.assign({ x: 620, y: 330, width: 40, height: 80, rx: 4, stroke: GOVDE, 'stroke-width': 4 }, SIVI_DOLGU), g);
    const balata = c.S('rect', { x: 672, y: 330, width: 24, height: 80, rx: 3, fill: GOVDE }, g);
    c.S('rect', { x: 700, y: 250, width: 12, height: 240, rx: 3, fill: ACIK }, g);
    return { g, pedal, boru, balata };
  }

  /* Kontrol listesi: kaynağı beş soruyla sınar; Evet/Hayır işareti, altında "Hayır sayısı". */
  const SORU = ['İçeriyor mu?', 'Güvenilir mi?', 'İlişkili mi?', 'Anlaşılır mı?', 'Güncel mi?'];
  function kontrolListesi(c, p) {
    const t = tablo(c, p, { x: 540, y: 110, h: 50, size: 22, satir: 5, sutunlar: [{ ad: 'Soru', w: 220 }, { ad: 'Evet', w: 90 }, { ad: 'Hayır', w: 90 }] });
    SORU.forEach((s, i) => t.yaz(i, 0, s));
    const etiket = yazi(c, p, 660, 456, 'Hayır sayısı', { size: 24 });
    const sayac = yazi(c, p, 810, 460, '0', { size: 36, kalin: 700, renk: BEYAZ });
    let n = 0;
    /* i. satırın Evet ya da Hayır hücresine tik koyar; Hayır ise sayaç artar. */
    const isaret = (i, evet) => {
      const e = tik(c, p, evet ? 805 : 895, 185 + 50 * i);
      if (evet) return belir(c, e, 300);
      n++; sayac.textContent = String(n);
      return par(belir(c, e, 300), c.tween(300, (k) => { sayac.style.opacity = lerp(0.3, 1, k); }, ease.out));
    };
    return { t, etiket, sayac, satirlar: t.satirlar.map((s) => s.g), isaret };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Soru 1: kapalı kap ve bastıran piston.
    const k1 = c.S('g', {}, svg);
    const kap1 = kutu(c, k1, 300, 170, 400, 250, { rx: 8, dolgu: 'var(--c1)', renk: GOVDE, w: 6 });
    kap1.setAttribute('fill-opacity', 0.8);
    kutu(c, k1, 300, 146, 400, 24, { rx: 4, dolgu: ACIK, renk: ACIK });
    ok(c, k1, [500, 70], [500, 142], RENK.kuvvet, 6);
    const yuzler = [[[300, 170], [300, 420]], [[300, 170], [700, 170]], [[700, 170], [700, 420]], [[300, 420], [700, 420]]];
    const oklar = yuzler.map(([P, Q]) => basincOklari(c, k1, P, Q, [500, 300], { n: 2, boy: 46, w: 4 }));
    gizle(k1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, k1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Pascal Yasası’na göre kapalı kaptaki sıvıya uygulanan basınç nasıl iletilir?',
      options: ['Yalnızca bastırılan noktaya', 'Her noktaya eşit büyüklükte', 'Yalnızca kabın tabanına'], answer: 1,
      hints: ['Basınç artışı sıvının her yerine ulaşır.', '', 'Balon örneğini düşün.'],
      right: 'Evet. Basınç, sıvının her noktasına eşit iletilir.',
    });
    c.clearSay();
    await par(c.say('Basınç, sıvının her yerine eşit iletiliyor.'), par(...oklar.map((o) => o.ac(2, 400))));
    c.clearSay();
    await belir(c, k1, 350, 0); k1.remove();

    // Soru 2: aynı seviyede iki farklı kap.
    const k2 = c.S('g', {}, svg);
    sivKabi(c, k2, { x1: 130, x2: 410, y: 190, dip: 450, ust: 160 });
    sivKabi(c, k2, { x1: 590, x2: 710, y: 190, dip: 450, ust: 160 });
    const nA = cizgi(c, k2, [240, 330], [300, 330], RENK.alan, 6), nB = cizgi(c, k2, [620, 330], [680, 330], RENK.alan, 6);
    const cA = basincCubugu(c, k2, 430, 330), cB = basincCubugu(c, k2, 730, 330);
    const formul = yazi(c, k2, 500, 110, 'P = h·d·g', { size: 34, kalin: 700, renk: RENK.basinc });
    gizle(k2, nA, nB, formul);
    await belir(c, k2, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Hangisi durgun sıvının basıncını etkilemez?',
      options: ['Derinlik', 'Sıvının yoğunluğu', 'Kabın şekli'], answer: 2,
      hints: ['Basınç P = h·d·g idi.', 'Formülde kabın şekli yok.', ''],
      right: 'Evet. Basınç, kabın şekline bağlı değildir.',
    });
    c.clearSay();
    await par(c.say('Aynı derinlikte basınç eşit; formülde kabın şekli yok.'), par(belir(c, [nA, nB, formul], 400), cA.uzat(c, 100, 600), cB.uzat(c, 100, 600)));
    c.clearSay();
    await belir(c, k2, 350, 0); k2.remove();
    const iddia = yazi(c, svg, 500, 270, '“Hidrolik fren asla bozulmaz”', { size: 40, kalin: 700 });
    const dogru = yazi(c, svg, 500, 335, 'doğru mu?', { size: 34, renk: RENK.basinc });
    gizle(iddia, dogru);
    await par(c.say('Bugün bir iddiayı kaynaklarla sınamaya bakacağız.'), belir(c, [iddia, dogru], 450));
  }

  /* ---- 2. Hidrolik fren ---- */
  async function hidrolikFren(c) {
    const svg = c.svg(1000, 562);
    const FR = frenCiz(c, svg);
    const ETIKET = [
      { m: 'fren pedalı', x: 145, y: 480, hiza: 'middle', a: [140, 458], b: [112, 400] },
      { m: 'fren ana silindiri', x: 270, y: 280, hiza: 'middle', a: [270, 290], b: [270, 338] },
      { m: 'fren hidroliği', x: 505, y: 440, hiza: 'middle', a: [505, 418], b: [505, 378] },
      { m: 'fren pistonu', x: 630, y: 280, hiza: 'middle', a: [635, 290], b: [640, 328] },
      { m: 'fren balatası', x: 650, y: 520, hiza: 'start', a: [684, 494], b: [684, 414] },
      { m: 'fren diski', x: 815, y: 220, hiza: 'middle', a: [765, 230], b: [710, 254] },
    ].map((e) => ({ t: yazi(c, svg, e.x, e.y, e.m, { hiza: e.hiza, size: 22 }), l: cizgi(c, svg, e.a, e.b, RENK.gri, 2) }));
    const et = (...i) => i.flatMap((k) => [ETIKET[k].t, ETIKET[k].l]);
    const kuvvet = ok(c, svg, [90, 350], [90, 400], RENK.kuvvet, 6);
    const silOk = basincOklari(c, svg, [330, 346], [330, 394], [270, 370], { n: 2, boy: 44, w: 4 });
    const pisOk = basincOklari(c, svg, [658, 334], [658, 406], [636, 370], { n: 2, boy: 28, w: 4 });
    const nokta = c.S('circle', { cx: 330, cy: 370, r: 9, fill: RENK.basinc }, svg);
    gizle(FR.g, ETIKET.flatMap((e) => [e.t, e.l]), kuvvet.g, nokta);

    await par(c.say('Hidrolik frende, pedalın uyguladığı basınç sıvıyla taşınır.'), belir(c, FR.g, 500));
    await par(c.say('Sürücü fren pedalına basar.'), par(
      belir(c, [kuvvet.g, ...et(0)], 400),
      c.tween(300, (e) => FR.pedal.setAttribute('transform', `rotate(${lerp(0, -10, e)} 170 330)`), ease.inOut)));
    await par(c.say('Pedalın kuvveti, fren ana silindirindeki fren hidroliğine basınç uygular.'), par(belir(c, et(1, 2), 400), silOk.ac(2, 400)));
    await par(c.say('Pascal Yasası’na göre bu basınç, hidrolikle fren pistonuna iletilir.'), (async () => {
      await belir(c, et(3), 400);
      nokta.style.opacity = 1;
      await c.tween(800, (e) => nokta.setAttribute('cx', lerp(330, 620, e)), ease.inOut);
      await par(belir(c, nokta, 300, 0), pisOk.ac(2, 400));
    })());
    await par(c.say('Fren pistonu, balatayı diske bastırır ve araç yavaşlar.'), par(
      belir(c, et(4, 5), 400),
      c.tween(300, (e) => FR.balata.setAttribute('x', lerp(672, 680, e)), ease.inOut)));

    await c.choice({
      tag: 'Sıra sende', q: 'Pedalın uyguladığı basıncı fren pistonuna taşıyan nedir?',
      options: ['Fren diski', 'Fren balatası', 'Fren hidroliği'], answer: 2,
      hints: ['Basınç sıvıyla iletilir.', 'Borunun içinde ne var?', ''],
      right: 'Evet. Basınç, fren hidroliğiyle iletilir.',
    });
    FR.boru.setAttribute('stroke', 'var(--good)'); FR.boru.setAttribute('stroke-width', 5);
    c.clearSay();
    await c.say('Basıncı borudaki fren hidroliği taşır.');
  }

  /* ---- 3. Merak et, soru sor ---- */
  async function soruSor(c) {
    const svg = c.svg(1000, 562);
    const SIST = [['hidrolik fren', 180, 90], ['kepçe', 500, 90], ['damperli kamyon', 820, 90], ['itfaiye merdiveni', 180, 130], ['hastane yatağı', 500, 130], ['berber koltuğu', 820, 130]];
    const sistem = SIST.map(([m, x, y]) => yazi(c, svg, x, y, m, { size: 22 }));
    const cerceve = kutu(c, svg, 95, 64, 170, 34, { rx: 8, dolgu: 'none', renk: BEYAZ, w: 3 });
    const bos = c.S('g', {}, svg);
    kutu(c, bos, 110, 200, 780, 70, { rx: 12 });
    yazi(c, bos, 500, 246, '?', { size: 34, kalin: 700 });
    const KUTU = [{ x: 80, ad: 'Konuyla ilgili' }, { x: 520, ad: 'Konu dışı' }], sayac = [0, 0];
    const kutular = KUTU.map((k) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, k.x, 330, 400, 50, { rx: 10 });
      yazi(c, g, k.x + 200, 364, k.ad, { size: 24, kalin: 700, renk: RENK.basinc });
      return g;
    });
    gizle(sistem, cerceve, bos, kutular);

    await par(c.say('Ela, altı sistem arasından hidrolik freni merak ediyor.'), (async () => { await belir(c, sistem, 400); await belir(c, cerceve, 300); })());
    await par(c.say('Merak ettiği konuda sorular hazırlıyor.'), par(belir(c, sistem.slice(1), 350, 0.3), belir(c, bos, 400)));
    await par(c.say('Soru, merak edilen konuyla ilgili olmalıdır.'), belir(c, kutular, 400));
    c.clearSay();
    await belir(c, [...sistem, cerceve, bos], 300, 0);
    sistem.forEach((e) => e.remove()); cerceve.remove(); bos.remove();

    let kg = null;
    const goster = async (k) => {
      kg = c.S('g', {}, svg);
      kutu(c, kg, 110, 200, 780, 70, { rx: 12 });
      yazi(c, kg, 500, 246, k.m, { size: 22 });
      gizle(kg); await belir(c, kg, 350);
    };
    /* Kart kutusuna küçülerek gider; kısa adı kutunun altına yazılır. */
    const yerlestir = async (k) => {
      const kx = KUTU[k.kutu].x + 200, ky = 412 + sayac[k.kutu] * 36, el = kg;
      await c.tween(500, (e) => {
        el.setAttribute('transform', `translate(${lerp(0, kx - 500, e)},${lerp(0, ky - 235, e)}) translate(500,235) scale(${lerp(1, 0.15, e)}) translate(-500,-235)`);
        el.style.opacity = 1 - e;
      }, ease.inOut);
      el.remove();
      const ad = yazi(c, svg, kx, ky, k.ad, { size: 22, kalin: 600 });
      gizle(ad); await belir(c, ad, 300);
      sayac[k.kutu]++;
    };
    const KARTLAR = [
      { m: 'Pedaldaki kuvvet fren pistonuna nasıl iletilir?', ad: 'Kuvvetin iletimi', kutu: 0, neden: 'Evet. İletimi soruyor.' },
      { m: 'Hangi otomobilin freni daha güzel görünür?', ad: 'Görünüş', kutu: 1, neden: 'Evet. Görünüş, sıvı basıncıyla ilgili değil.' },
      { m: 'Fren pedalı hangi renkte olmalı?', ad: 'Pedal rengi', kutu: 1, neden: 'Evet. Renk, sıvı basıncıyla ilgili değil.' },
      { m: 'Fren hidroliğinde sıvı basıncının rolü nedir?', ad: 'Sıvı basıncının rolü', kutu: 0, neden: 'Evet. Sıvı basıncının rolünü soruyor.' },
      { m: 'En pahalı otomobil hangisidir?', ad: 'Fiyat', kutu: 1, neden: 'Evet. Fiyat, sıvı basıncıyla ilgili değil.' },
      { m: 'Pedala basınca basınç sıvının her noktasına ulaşır mı?', ad: 'Pascal Yasası', kutu: 0, neden: 'Evet. Pascal Yasası’yla ilgili.' },
    ];
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR.map((k) => Object.assign({ ipucu: 'Soru, sıvı basıncının frendeki rolünü soruyor mu?' }, k)),
      soru: () => 'Ela’nın bu sorusu hidrolik fren ve sıvı basıncıyla ilgili mi?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Üç soru konuyla ilgili, üç soru konu dışı.');
  }

  /* ---- 4. Bilgi topla ---- */
  async function bilgiTopla(c) {
    const svg = c.svg(1000, 562);
    const KAY = [['kılavuz', 80, 120], ['ders notu', 520, 120], ['forum yazısı', 80, 280], ['reklam afişi', 520, 280]];
    const kartlar = KAY.map(([ad, x, y], i) => {
      const g = c.S('g', {}, svg), r = kutu(c, g, x, y, 400, 120, { rx: 12 });
      const t = yazi(c, g, x + 200, y + 70, `Kaynak ${i + 1} · ${ad}`, { size: 24, kalin: 700 });
      return { g, r, t, ad, x, y };
    });
    const tab = tablo(c, svg, { x: 80, y: 440, h: 50, size: 22, satir: 1, sutunlar: [{ ad: 'Elde Edilen Bilgi', w: 560 }, { ad: 'Kaynak', w: 280 }] });
    gizle(kartlar.map((k) => k.g), tab.g);

    await c.say('Soruların cevabı için bilgi toplamak gerekir.');
    await c.say('Bilgi, tek bir yerden değil, farklı kaynaklardan toplanır.', { speak: '[curious] Bilgi, tek bir yerden değil, farklı kaynaklardan toplanır.' });
    await par(c.say('Ela dört kaynak topluyor: kılavuz, ders notu, forum yazısı ve reklam afişi.'), (async () => {
      for (const k of kartlar) { await belir(c, k.g, 300); await c.wait(300); }
    })());
    await c.choice({
      tag: 'Sıra sende', q: 'Ela soruların cevabını bulmak için nasıl bir yol izlemeli?',
      options: ['İlk bulduğu yazıyı almalı', 'Birkaç farklı kaynaktan bilgi toplamalı', 'Yalnızca bir arkadaşına sormalı'], answer: 1,
      hints: ['Bilgi tek bir yerden mi toplanıyor?', '', 'Farklı kaynaklar birbirini sınamaya yarar.'],
      right: 'Evet. Farklı kaynaklar birbirini sınar.',
    });
    c.clearSay();
    // Kartlar tek sıraya küçülür; altta boş tablo belirir.
    for (let i = 0; i < kartlar.length; i++) {
      const k = kartlar[i], nx = 80 + i * (190 + 80 / 3), ny = 320;
      k.t.textContent = k.ad;
      await c.tween(400, (e) => {
        const x = lerp(k.x, nx, e), y = lerp(k.y, ny, e), w = lerp(400, 190, e), h = lerp(120, 50, e);
        k.r.setAttribute('x', x); k.r.setAttribute('y', y); k.r.setAttribute('width', w); k.r.setAttribute('height', h);
        k.t.setAttribute('x', x + w / 2); k.t.setAttribute('y', y + h / 2 + 8);
      }, ease.inOut);
    }
    await par(c.say('Kaynaklar sırayla sınanacak; bulunan bilgi tabloya yazılacak.'), belir(c, tab.g, 450));
  }

  /* ---- 5. Kaynağı sına: kılavuz ---- */
  async function kilavuz(c) {
    const svg = c.svg(1000, 562);
    const K = kart(c, svg, 60, 110, 440, 220, [
      { m: 'Kaynak 1 · Bir otomobil', kalin: 1 }, { m: 'üreticisinin kullanım kılavuzu', kalin: 1 },
      { m: 'Pedala basılınca fren' }, { m: 'hidroliğindeki basınç artar.' }, { m: 'Hidrolik, basıncı fren' }, { m: 'pistonuna iletir.' }, { m: 'Yayım tarihi: bu yıl.' }]);
    const L = kontrolListesi(c, svg);
    gizle(K.g, L.t.g, L.etiket, L.sayac);

    await par(c.say('Bir kaynağı beş soruyla sınarız; cevaplar Evet ya da Hayır.'), belir(c, [K.g, L.t.g], 450));
    const SOZ = ['Birincisi: kaynak, ihtiyacımız olan bilgiyi içeriyor mu?', 'İkincisi: kaynaktaki bilgiler güvenilir mi?',
      'Üçüncüsü: kaynaktaki bilgiler araştırılan konuyla ilişkili mi?', 'Dördüncüsü: kaynaktaki bilgiler anlaşılır mı?', 'Beşincisi: kaynaktaki bilgiler güncel mi?'];
    for (let i = 0; i < 5; i++) await par(c.say(SOZ[i]), L.t.goster(i, 400));
    await par(c.say('Birden fazla Hayır varsa, kaynak gözden geçirilir.'), belir(c, [L.etiket, L.sayac], 400));
    const COZ = ['Kılavuz, pedaldan pistona basıncın iletilmesini anlatıyor: birinciye Evet.', 'Hazırlayanı belli, konuyu bilen bir kuruluş: ikinciye Evet.',
      'Fren sistemini anlatıyor: üçüncüye Evet.', 'Cümleleri kısa ve açık: dördüncüye Evet.', 'Yayım tarihi bu yıl: beşinciye Evet.'];
    for (let i = 0; i < 5; i++) { L.t.vurgula(i, true); await par(c.say(COZ[i]), L.isaret(i, true)); L.t.vurgula(i, false); }
    K.boya(RENK.yazi, 5);
    await c.say('Hiç Hayır yok; kaynak kullanılabilir.');
  }

  /* ---- 6. Kaynağı sına: ders notu ---- */
  async function dersNotu(c) {
    const svg = c.svg(1000, 562);
    const K = kart(c, svg, 60, 110, 440, 245, [
      { m: 'Kaynak 2 · Bir üniversitenin', kalin: 1 }, { m: 'mühendislik bölümünün', kalin: 1 }, { m: 'ders notları', kalin: 1 },
      { m: 'Pedaldaki basıncın pistona' }, { m: 'iletilmesi, BİH ve ŞAD' }, { m: 'terimleriyle anlatılır;' }, { m: 'terimler açıklanmamıştır.' }, { m: 'Yayım tarihi: bu yıl.' }]);
    const L = kontrolListesi(c, svg);
    gizle(K.g, L.t.g, L.etiket, L.sayac);
    await par(c.say('İkinci kaynak, bir üniversitenin mühendislik ders notları.'), belir(c, [K.g, L.t.g, L.etiket, L.sayac, ...L.satirlar], 450));
    await c.say('Bilgiyi içeriyor, hazırlayanı belli, konusu fren: ilk üçüne Evet.', { speak: '[thoughtful] Bilgiyi içeriyor, hazırlayanı belli, konusu fren: ilk üçüne Evet.' });
    await par(L.isaret(0, true), L.isaret(1, true), L.isaret(2, true));
    await c.say('Dördüncü ve beşinci soruyu sen işaretle.');

    L.t.vurgula(3, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kaynaktaki bilgiler anlaşılır mı?', options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Metindeki terimlerin anlamı yazıyor mu? Açıklanmamış terimler anlamayı zorlaştırır.', ''], right: 'Evet. Terimler açıklanmamış.',
    });
    L.t.vurgula(3, false);
    await L.isaret(3, false);
    L.t.vurgula(4, true);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kaynaktaki bilgiler güncel mi?', options: ['Evet', 'Hayır'], answer: 0,
      hints: ['', 'Yayım tarihine bak. Tarih bu yıl.'], right: 'Evet. Yayım tarihi bu yıl.',
    });
    L.t.vurgula(4, false);
    await L.isaret(4, true);
    c.clearSay();
    await c.say('Tek Hayır var; kaynak kullanılabilir.');
    await c.say('Anlaşılmayan yerler başka bir kaynakla desteklenir.');
  }

  /* ---- 7. Kaynağı sına: forum yazısı ---- */
  async function forum(c) {
    const svg = c.svg(1000, 562);
    const K = kart(c, svg, 60, 110, 440, 190, [
      { m: 'Kaynak 3 · İmzasız bir', kalin: 1 }, { m: 'forum yazısı', kalin: 1 },
      { m: 'Hidrolik fren asla bozulmaz.' }, { m: 'Yazan: imzasız. Tarih: yok.' }, { m: 'Dayanak: yok.' }]);
    const L = kontrolListesi(c, svg);
    const gozden = yazi(c, svg, 280, 345, 'gözden geçirilir', { size: 26, kalin: 700, renk: BEYAZ });
    gizle(K.g, L.t.g, L.etiket, L.sayac, gozden);
    await par(c.say('Üçüncü kaynak, imzasız bir forum yazısı.'), belir(c, [K.g, L.t.g, L.etiket, L.sayac, ...L.satirlar], 450));
    await c.say('Yazı, hidrolik frenin asla bozulmadığını söylüyor.');
    await c.say('Beş soruyu bu kaynak için sen işaretle.');

    const SATIR = [
      { q: 'Kaynak ihtiyacımız olan bilgiyi içeriyor mu?', evet: false, sik: ['Evet', 'Hayır'], ipucu: 'Yazı, basıncın pedaldan pistona nasıl iletildiğini anlatıyor mu? Sorumuz iletimle ilgiliydi.' },
      { q: 'Kaynaktaki bilgiler güvenilir mi?', evet: false, sik: ['Hayır', 'Evet'], ipucu: 'Yazanın adı ve dayanağı var mı? İmzasız ve dayanaksız yazı güvenilmez.' },
      { q: 'Kaynaktaki bilgiler araştırılan konuyla ilişkili mi?', evet: true, sik: ['Evet', 'Hayır'], ipucu: 'Yazı hangi konuda? Konu fren sistemi.' },
      { q: 'Kaynaktaki bilgiler anlaşılır mı?', evet: true, sik: ['Hayır', 'Evet'], ipucu: 'Cümleler kısa mı? Terim yok.' },
      { q: 'Kaynaktaki bilgiler güncel mi?', evet: false, sik: ['Evet', 'Hayır'], ipucu: 'Yayım tarihine bak. Tarih yok; güncel olup olmadığı bilinmez.' },
    ];
    for (let i = 0; i < SATIR.length; i++) {
      const s = SATIR[i], dogru = s.evet ? 'Evet' : 'Hayır';
      L.t.vurgula(i, true);
      await c.choice({
        tag: 'Sıra sende', q: s.q, options: s.sik, answer: s.sik.indexOf(dogru),
        hints: s.sik.map((o) => (o === dogru ? '' : s.ipucu)), right: `Evet. Cevap: ${dogru}.`,
      });
      L.t.vurgula(i, false);
      await L.isaret(i, s.evet);
    }
    c.clearSay();
    K.boya(RENK.gri, 5);
    await par(c.say('Üç Hayır var; bu kaynak gözden geçirilir.', { speak: '[thoughtful] Üç Hayır var; bu kaynak gözden geçirilir.' }), belir(c, gozden, 400));
    await c.say('Gözden geçirilen kaynaktaki iddiaya hemen güvenilmez.');
  }

  /* ---- 8. Doğrula ve çıkarım yap ---- */
  async function dogrula(c) {
    const svg = c.svg(1000, 562);
    const ust = c.S('g', {}, svg);
    const k1 = kart(c, ust, 60, 110, 270, 140, [{ m: 'Kaynak 1', kalin: 1 }, { m: 'hidrolik basıncı fren' }, { m: 'pistonuna iletir' }]);
    const k2 = kart(c, ust, 365, 110, 270, 140, [{ m: 'Kaynak 2', kalin: 1 }, { m: 'basınç pistona' }, { m: 'iletilir' }]);
    const k3 = kart(c, ust, 670, 110, 270, 140, [{ m: 'Kaynak 3', kalin: 1 }, { m: '“asla bozulmaz”' }]);
    const esit = yazi(c, ust, 347.5, 192, '=', { size: 40, kalin: 700, renk: BEYAZ });
    const soru = yazi(c, ust, 805, 292, '?', { size: 40, kalin: 700, renk: BEYAZ });
    const tab = tablo(c, ust, { x: 150, y: 320, h: 44, size: 22, satir: 4, sutunlar: [{ ad: 'Soru', w: 300 }, { ad: 'İlke', w: 400 }] });
    [['2. soru', 'güvenilirlik'], ['1. ve 3. soru', 'amaca uygunluk'], ['4. soru', 'açıklık'], ['ikinci kaynak', 'doğruluk']].forEach(([a, b], i) => { tab.yaz(i, 0, a); tab.yaz(i, 1, b); });
    k3.cerceve.setAttribute('stroke', RENK.kenarlik);
    gizle(ust, k1.g, k2.g, k3.g, esit, soru, tab.g);
    ust.style.opacity = 1;

    await par(c.say('Kılavuz ile ders notu aynı şeyi söylüyor: basınç, sıvıyla pistona iletilir.'), belir(c, [k1.g, k2.g, esit], 450));
    await c.say('Bilgi ikinci bir kaynakla tutuyorsa doğruluğuna güvenebiliriz.');
    await par(c.say('“Asla bozulmaz” iddiası başka hiçbir kaynakta yok.'), belir(c, [k3.g, soru], 450));
    k3.boya(RENK.gri, 5);
    await c.say('Üstelik forum yazısı kontrol listesinde üç Hayır aldı.');
    await c.say('Bu iddia doğrulanmadı; ona dayanarak sonuç çıkarılmaz.', { speak: '[thoughtful] Bu iddia doğrulanmadı; ona dayanarak sonuç çıkarılmaz.' });
    await par(c.say('Beş soru güvenilirliği, amaca uygunluğu ve açıklığı yoklar.'), (async () => {
      await belir(c, tab.g, 300);
      for (let i = 0; i < 3; i++) { await tab.goster(i, 400); }
    })());
    await par(c.say('İkinci kaynakla karşılaştırma ise doğruluğu yoklar.'), tab.goster(3, 400));
    await c.say('Doğrulanan bilgiler üzerinden çıkarım yapılır.');
    await c.choice({
      tag: 'Sıra sende', q: 'Doğrulanmış bilgilere göre hangi çıkarım yapılabilir?',
      options: ['Pedala uygulanan basınç, sıvı yoluyla fren pistonuna iletilir', 'Hidrolik fren asla bozulmaz', 'Fren hidroliği olmasa da fren çalışır'], answer: 0,
      hints: ['', 'Doğrulanmayan iddiadan çıkarım yapılmaz.', 'Hangi bilgi iki kaynakta da var?'], right: 'Evet. Bu bilgi iki kaynakta da var.',
    });
    k1.boya('var(--good)', 4); k2.boya('var(--good)', 4);
    c.clearSay();
    await c.say('Çıkarım, iki kaynakta da tutan bilgiye dayanır.');
    await c.say('Çıkarım bir şema, resim ya da tabloyla desteklenir.');
    await c.choice({
      tag: 'Sıra sende', q: 'Çıkarımı hangi görsel en iyi destekler?',
      options: ['Fren pedalının renkli bir resmi', 'Bir atölyenin indirim afişi', 'Pedaldan fren pistonuna giden basıncı oklarla gösteren bir şema'], answer: 2,
      hints: ['Görsel çıkarımın söylediğini göstermeli.', 'Çıkarım basıncın iletimiyle ilgili.', ''], right: 'Evet. Şema, basıncın yolunu gösterir.',
    });
    c.clearSay();
    await belir(c, ust, 350, 0); ust.remove();

    // Gör: seçilen şema belirir; turuncu → sarı ok zinciri.
    const sema = c.S('g', { transform: 'translate(-6.6,-85) scale(0.74)' }, svg);
    frenCiz(c, sema);
    const kuvvet = ok(c, sema, [90, 350], [90, 400], RENK.kuvvet, 6);
    const zincir = ok(c, sema, [330, 370], [340, 370], RENK.basinc, 6);
    const pisOk = basincOklari(c, sema, [658, 334], [658, 406], [636, 370], { n: 2, boy: 28, w: 4 });
    const sonuc = [yazi(c, svg, 570, 215, 'basınç sıvıyla', { hiza: 'start', size: 30, kalin: 700 }), yazi(c, svg, 570, 255, 'pistona iletilir', { hiza: 'start', size: 30, kalin: 700 })];
    gizle(sema, kuvvet.g, zincir.g, sonuc);
    await par(c.say('Şema, basıncın pedaldan pistona yolunu oklarla gösteriyor.'), (async () => {
      await belir(c, sema, 450);
      await belir(c, kuvvet.g, 300);
      zincir.g.style.opacity = 1;
      await c.tween(800, (e) => zincir.ciz([330, 370], [lerp(340, 610, e), 370]), ease.inOut);
      await par(pisOk.ac(2, 300), belir(c, sonuc, 400));
    })());
    c.note('<b>Önce bilgiyi sına, sonra sonuç çıkar.</b><br>Forum yazısı üç Hayır aldı.', 'Sorgulama', 'sorgulama');
  }

  /* ---- 9. Sorgulamanın adımları ---- */
  async function adimlar(c) {
    const svg = c.svg(1000, 562);
    const ADIM = ['merak edilen konuyu belirle', 'sorular sor', 'kaynaklardan bilgi topla', 'bilgilerin doğruluğunu kontrol et', 'çıkarım yap'];
    const GORUNUM = [4, 1, 3, 0, 2]; // kartların tahtadaki sırası (ADIM indeksi)
    const SAYI = ['birinci', 'ikinci', 'üçüncü', 'dördüncü'];
    const kartlar = GORUNUM.map((a, d) => {
      const x = 90 + (d % 2) * 420, y = 50 + Math.floor(d / 2) * 58;
      const g = c.S('g', {}, svg);
      kutu(c, g, x, y, 400, 48, { rx: 10 });
      yazi(c, g, x + 200, y + 32, ADIM[a], { size: 22, kalin: 600 });
      return { g, x, y, a, ad: ADIM[a] };
    });
    const yuvalar = ADIM.map((_, i) => {
      const g = c.S('g', {}, svg), y = 240 + i * 56;
      kutu(c, g, 100, y, 800, 48, { rx: 10, dolgu: 'none', renk: RENK.ince });
      yazi(c, g, 130, y + 32, String(i + 1), { size: 24, kalin: 700, renk: RENK.basinc });
      return { g, y };
    });
    gizle(kartlar.map((k) => k.g), yuvalar.map((y) => y.g));
    await par(c.say('Bir sorgulama beş adımda ilerler.'), belir(c, [...kartlar.map((k) => k.g), ...yuvalar.map((y) => y.g)], 500));

    /* Kart söner, adı yuvasında belirir (kartı yuvalara taşımak yazıların üstünden geçerdi). */
    const oturt = (k, i) => {
      const ad = yazi(c, svg, 160, yuvalar[i].y + 32, k.ad, { hiza: 'start', size: 22, kalin: 600 });
      gizle(ad);
      return par(belir(c, k.g, 400, 0), belir(c, ad, 400));
    };
    const kalan = kartlar.slice();
    for (let s = 0; s < 4; s++) {
      const dogru = kalan.find((k) => k.a === s);
      await c.choice({
        tag: 'Dene', q: `Sorgulamanın ${SAYI[s]} adımı hangisi?`, options: kalan.map((k) => k.ad), answer: kalan.indexOf(dogru),
        hints: kalan.map((k) => (k === dogru ? '' : k.a === 4 ? 'Çıkarım, bilginin sınanmasından sonra gelir.' : 'Bu adımdan önce hangisi gelmeli?')),
        right: s === 3 ? 'Evet. Önce bilgiyi sına, sonra sonuç çıkar.' : 'Evet.',
      });
      kalan.splice(kalan.indexOf(dogru), 1);
      await oturt(dogru, s);
    }
    c.clearSay();
    await par(c.say('Kalan kart son yuvaya oturur: çıkarım en sona kalır.'), oturt(kalan[0], 4));
  }

  Ders.start({
    id: 'akiskanlar-b4', kicker: 'Konu B · Sıvılarda basınç', title: 'Merak et, sor, doğrula', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Merak et, sor, doğrula',
      hook: 'İnternette “hidrolik fren asla bozulmaz” diye bir yazı gördün; doğru olduğunu nasıl anlarsın?',
      button: 'Derse başla ›',
    },
    goals: ['Merak edilen bir konuda soru hazırlar ve farklı kaynaklardan bilgi toplar.', 'Bir kaynağı beş soruluk kontrol listesiyle sınar.', 'Doğrulanan bilgiden çıkarım yapar ve çıkarımı bir şemayla destekler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Pascal Yasası’nı ve sıvı basıncının neye bağlı olduğunu an.', run: hatirla },
      { title: 'Hidrolik fren', goal: 'Basıncın pedaldan fren pistonuna nasıl taşındığını gör.', run: hidrolikFren },
      { title: 'Merak et, soru sor', goal: 'Konuyla ilgili soruları konu dışı olanlardan ayır.', run: soruSor },
      { title: 'Bilgi topla', goal: 'Bilginin farklı kaynaklardan toplanması gerektiğini gör.', run: bilgiTopla },
      { title: 'Kaynağı sına: kılavuz', goal: 'Bir kaynağı beş soruyla nasıl sınayacağını öğren.', run: kilavuz },
      { title: 'Kaynağı sına: ders notu', goal: 'Kontrol listesini birlikte doldur.', run: dersNotu },
      { title: 'Kaynağı sına: forum yazısı', goal: 'Güvenilmez bir kaynağı kontrol listesiyle yakala.', run: forum },
      { title: 'Doğrula ve çıkarım yap', goal: 'Bilgiyi ikinci kaynakla sına, sonra çıkarım yap.', run: dogrula },
      { title: 'Sorgulamanın adımları', goal: 'Sorgulamanın beş adımını sırala.', run: adimlar },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir su cenderesi hakkında imzasız ve tarihsiz bir blog yazısı buldun. Kontrol listesinde “güvenilir mi” ve “güncel mi” sorularına Hayır dedin. Ne yaparsın?',
        options: ['Yazıyı olduğu gibi kabul ederim', 'Kaynağı gözden geçirir, bilgiyi başka kaynakla da sınarım', 'Başka kaynağa bakmadan çıkarım yaparım'], answer: 1,
        why: ['İki Hayır alan kaynağa olduğu gibi güvenilmez.', 'Birden fazla Hayır varsa kaynak gözden geçirilir; bilgi ikinci bir kaynakla da sınanır.', 'Doğrulanmamış bilgiden çıkarım yapılmaz.'], scene: 6 },
      { q: 'Kaynak 4, bir atölyenin reklam afişi: “Fren onarımı, en uygun fiyat! Hemen arayın. Yayım tarihi: bu ay.” Kontrol listesinde hangi soruya Hayır dersin?',
        options: ['Kaynak ihtiyacımız olan bilgiyi içeriyor mu?', 'Bilgiler güncel mi?', 'Bilgiler anlaşılır mı?'], answer: 0,
        why: ['Afiş, basıncın nasıl iletildiğini anlatmıyor; ihtiyacımız olan bilgi yok.', 'Yayım tarihi bu ay; bilgi güncel.', 'Cümleler kısa ve açık; anlaşılır.'], scene: 4 },
      { q: 'Bir yazıda “hidrolik kepçe asla yağ kaçırmaz” yazıyor. İlk bulduğun bu yazıdan çıkarım yapmak için ne gerekir?',
        options: ['Önce bilginin doğruluğunu başka kaynakla sınamak', 'Yazıdaki cümleyi aynen kopyalamak', 'Yazının kaç kişi tarafından okunduğuna bakmak'], answer: 0,
        why: ['Bilgi ikinci bir kaynakla tutuyorsa doğruluğuna güvenilir.', 'Kopyalamak bilgiyi sınamaz; yanlış da olsa aynen geçer.', 'Okunma sayısı bilginin doğru olduğunu göstermez.'], scene: 7 },
      { q: 'Üç ayrı güvenilir kaynak, damperli kamyonun kasasını kaldıran pistona basıncın sıvıyla iletildiğini yazıyor. Hangi çıkarım doğrulanmış bilgiye dayanır?',
        options: ['Sistemin sıvısı hiç bitmez', 'Pistona basınç sıvı yoluyla iletilir', 'Sistem sıvısız da çalışır'], answer: 1,
        why: ['Kaynakların hiçbiri sıvının bitmeyeceğini söylemiyor.', 'Üç kaynak da aynı bilgiyi veriyor; çıkarım buna dayanır.', 'Kaynaklar basıncın sıvıyla iletildiğini söylüyor; sıvısız çalışmaz.'], scene: 7 },
      { q: 'Bir kaynağın yayım tarihi yok ve yazanı belli değil. Kontrol listesinde hangi iki soruya Hayır dersin?',
        options: ['İçeriyor mu? ve Anlaşılır mı?', 'İlişkili mi? ve Anlaşılır mı?', 'Güvenilir mi? ve Güncel mi?'], answer: 2,
        why: ['Bu bilgiler içeriği ve açıklığı değil, kaynağın kimliğini ve tarihini yoklar.', 'Yazanın ve tarihin olmaması konuyla ilişkiyi etkilemez.', 'Yazanı belli değilse güvenilir değil; tarihi yoksa güncel olup olmadığı bilinmez.'], scene: 6 },
    ],
    summary: ['Merak edilen konuda sorular sorulur, farklı kaynaklardan bilgi toplanır.', 'Her kaynak beş soruyla sınanır; birden fazla Hayır varsa kaynak gözden geçirilir; bilgi ikinci bir kaynakla da tutmalıdır.', '<b>Önce bilgiyi sına, sonra sonuç çıkar.</b>'],
    nextLesson: { href: 'b5-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
