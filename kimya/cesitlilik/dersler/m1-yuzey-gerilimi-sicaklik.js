/* M1 — Yüzey gerilimi ve sıcaklık: soruyu kur, sına
   Yüzey gerilimi madenî para yöntemiyle dolaylı ölçülür (kubbe yüksekliği, taşmadan duran damla sayısı); araştırılabilir soru kurulur,
   önerme moleküller arası çekimle çıkarılır, sıcaklığın etkisi sıvı ve sıcaklık kaydırıcılarıyla sınanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/M-yuzey-gerilimi.md ("M1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Benzetimdeki damla sayıları örnek veridir (300 × N/m, yuvarlanmış): su 22 · 20, gliserin 19 · 17, etilen glikol 14 · 13, etanol 7 · 6 (20 °C · 50 °C).
   Kaydırıcılar yalnızca verisi olan konumlarda durur. Araçlar: m-araclar.js (KIT_M). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, isaret, sinifla } = window.KIT;
  const { GRI, DAMLA, kubbeH, sb, etiketSatiri, para, minipara, beher, deneyMatrisi, karsilastirma, sorukarti, degiskenler, zincir, cekim, kutuTahtasi } = window.KIT_M;

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const G = cekim(c, svg, { x: 230, y: 70, w: 540, h: 400, sutun: 6, satir: 4, kalin: 3.5, r: 18 });
    const B = beher(c, svg, { x: 215, y: 450, k: 0.9, sic: 20 });
    const P = para(c, svg, { x: 640, y: 450, k: 0.9, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 9, sayac: false });
    gizle(G.g, B.kok, P.kok);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, G.g, 600));
    await c.choice({
      tag: 'Hatırla', q: 'Su yüzeyindeki bir molekül nasıl çekilir?',
      options: ['Her yönden eşit', 'Yalnızca yandan ve alttan', 'Yalnızca yukarıdan'], answer: 1,
      hints: ['Yüzeydeki molekülün üstünde su molekülü yoktur; yandan ve alttan çekilir.', '', 'Yüzeydeki molekülün üstünde su molekülü yoktur; yandan ve alttan çekilir.'],
      right: 'Evet. Üstünde su molekülü yoktur; yandan ve alttan çekilir.',
    });
    c.clearSay();
    await par(c.say('Yüzeydeki molekül yandan ve alttan çekilir.'), G.vurgula(true, 600));
    await belir(c, G.g, 450, 0);
    await belir(c, [B.kok, P.kok], 600, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Bir faktörün etkisini sınarken sabit tuttuğumuz değişkene ne denir?',
      options: ['Bağımsız değişken', 'Bağımlı değişken', 'Kontrol değişkeni'], answer: 2,
      hints: ['Değiştirdiğimiz bağımsız, ölçtüğümüz bağımlı, sabit tuttuğumuz kontrol değişkenidir.', 'Değiştirdiğimiz bağımsız, ölçtüğümüz bağımlı, sabit tuttuğumuz kontrol değişkenidir.', ''],
      right: 'Evet. Sabit tuttuğumuz değişken, kontrol değişkenidir.',
    });
    c.clearSay();
    await par(c.say('Bugün sıcaklığın yüzey gerilimine etkisini araştıracağız.', { speak: '[curious] Bugün sıcaklığın yüzey gerilimine etkisini araştıracağız.' }), B.git(50, 700));
  }

  /* ---- 2. Dolaylı yöntem: para ve damla ---- */
  async function dolayli(c) {
    const svg = c.svg(1000, 562);
    const P = para(c, svg, { x: 420, y: 455, k: 1, sivi: 'su', N: DAMLA['su-20'], H: kubbeH('su-20') });
    const soru = etiketSatiri(c, svg, 420, 300, 'yüzey gerilimi', '?', { size: 34, renkDeger: RENK.vurgu });
    const kl = c.S('g', {}, svg);
    yazi(c, kl, 270, 395, 'kubbe', { hiza: 'end', size: 28, kalin: 700, renk: RENK.vurgu });
    ok(c, kl, [282, 395], [338, 436], RENK.vurgu, 4);
    const sag = c.S('g', {}, svg);
    const duranYazi = yazi(c, sag, 700, 538, 'taşmadan duran damla', { hiza: 'start', size: 24, kalin: 600, renk: RENK.vurgu });
    const duranOk = ok(c, sag, [688, 532], [606, 532], RENK.vurgu, 4);
    const yukYazi = yazi(c, sag, 600, 412, 'kubbe yüksekliği', { hiza: 'start', size: 24, kalin: 600, renk: RENK.vurgu });
    const k1 = yazi(c, svg, 820, 190, 'yüksek kubbe', { size: 32, kalin: 700 });
    const ko = ok(c, svg, [820, 208], [820, 262], RENK.yazi, 5);
    const k2 = yazi(c, svg, 820, 310, 'büyük yüzey gerilimi', { size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(P.damlalik, P.sayacEl, soru, kl, sag, k1, ko.g, k2);
    P.olcuG.style.opacity = 0;

    await par(c.say('Yüzey gerilimini doğrudan göremeyiz; dolaylı bir yol kullanırız.'), belir(c, soru, 500));
    await par(c.say('Madenî paranın üstüne damlalıkla damla damla sıvı eklenir.'), belir(c, soru, 300, 0), belir(c, [P.damlalik, P.sayacEl], 500).then(() => P.say(4, 1500)));
    await par(c.say('Sıvı, paranın üstünde bombeli bir kubbe oluşturur.'), P.say(8, 1300), belir(c, kl, 500));
    await par(c.say('Damla eklendikçe kubbe yükselir; sonunda sıvı taşar.'), (async () => { await P.say(DAMLA['su-20'], 3000); await P.tasir(900); })());
    P.tasmaGizle();
    await par(c.say('Taşmadan duran damla sayısına ve kubbenin yüksekliğine bakılır.'), belir(c, kl, 300, 0), belir(c, sag, 500), P.olcu(true, 500));
    await par(c.say('Kubbe ne kadar yüksekse yüzey gerilimi o kadar büyüktür.'), belir(c, sag, 300, 0), belir(c, [k1, ko.g, k2], 600));
    // Sonra: kubbe yüksekse çok damla taşır.
    await belir(c, k2, 300, 0);
    k2.textContent = 'daha çok damla taşır';
    await par(c.say('Kubbesi yüksek olan sıvı, para üstünde daha çok damla taşır.'), belir(c, k2, 500, 1));
  }

  /* ---- 3. İki sıvıyı karşılaştır ---- */
  async function iki(c) {
    const svg = c.svg(1000, 562), k = 0.62;
    const A = para(c, svg, { x: 110, y: 470, k, sivi: 'su', N: DAMLA['su-20'], H: kubbeH('su-20'), etiket: false, size: 24, sayacYer: [110, 528] });
    const B = para(c, svg, { x: 350, y: 470, k, sivi: 'etanol', N: DAMLA['etanol-20'], H: kubbeH('etanol-20'), etiket: false, size: 24, sayacYer: [350, 528] });
    const ust = c.S('g', {}, svg);
    yazi(c, ust, 110, 286, 'su', { size: 30, kalin: 700 }); yazi(c, ust, 350, 286, 'etanol', { size: 30, kalin: 700 });
    sb(c, ust, 230, 232, '20', '°C', { size: 34, kalin: 700, brenk: RENK.yazi });
    yazi(c, ust, 230, 553, 'örnek veri', { size: 20, kalin: 500, renk: RENK.soluk });
    const T = karsilastirma(c, svg, { x: 510, y: 90, w: 470 });
    gizle(A.kok, B.kok, ust, T.g);

    await par(c.say('Aynı para, aynı damlalık, aynı sıcaklık: yalnızca sıvı farklıdır.'), belir(c, [A.kok, B.kok, ust, T.g], 700));
    await par(c.say('Suyun kubbesi yüksek, etanolün kubbesi alçaktır.'), A.say(DAMLA['su-20'], 3600), B.say(DAMLA['etanol-20'], 3600));
    await par(c.say('Su 22 damla taşar; etanol yalnızca 7 damla.', { speak: 'Su yirmi iki damla taşar; etanol yalnızca yedi damla.' }),
      (async () => {
        await par(A.tasir(800), B.tasir(800));
        await T.satirEkle({ sivi: 'su', h: kubbeH('su-20'), damla: DAMLA['su-20'] });
        await T.satirEkle({ sivi: 'etanol', ton: 'etanol', h: kubbeH('etanol-20'), damla: DAMLA['etanol-20'] });
      })());
    A.tasmaGizle(); B.tasmaGizle();
    await par(c.say('Kubbesi yüksek olan suyun yüzey gerilimi daha büyüktür.'), T.doldur(0, 'daha büyük'), T.doldur(1, 'daha küçük'));

    // Birlikte çöz: gliserin ve etilen glikol.
    c.clearSay();
    await par(belir(c, [A.kok, B.kok, ust], 450, 0), c.tween(700, (e) => T.g.setAttribute('transform', `translate(${-250 * e},0)`)));
    await par(c.say('Tabloya iki sıvı daha ekleyelim: gliserin ve etilen glikol.'),
      (async () => {
        await T.satirEkle({ sivi: 'gliserin', ton: 'gliserin', h: kubbeH('gliserin-20'), damla: DAMLA['gliserin-20'] });
        await T.satirEkle({ sivi: 'etilen glikol', ton: 'etilen', h: kubbeH('etilen-20'), damla: DAMLA['etilen-20'] });
      })());
    await c.choice({
      tag: 'Birlikte çöz', q: 'Gliserin ile etilen glikolden hangisinin yüzey gerilimi daha büyüktür?',
      options: ['Etilen glikolün', 'İkisininki eşit', 'Gliserinin'], answer: 2,
      hints: ['Kubbesi yüksek olanın yüzey gerilimi büyüktür.', 'Hangisinin kubbesi daha yüksek, hangisi daha çok damla taşıyor?', ''],
      right: 'Evet. Gliserinin kubbesi daha yüksek.',
    });
    c.clearSay();
    await par(c.say('Gliserinin kubbesi daha yüksek: yüzey gerilimi daha büyüktür.'), T.doldur(2, 'daha büyük'), T.doldur(3, 'daha küçük'));

    // Sıra sende: P ve Q.
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'P sıvısı para üstünde Q sıvısından daha çok damla taşıyor. Hangisinin yüzey gerilimi daha büyüktür?',
      options: ['Q’nun', 'İkisininki eşit', 'P’nin'], answer: 2,
      hints: ['Daha çok damla taşıyan sıvının kubbesi nasıl duruyordu?', 'Su 22, etanol 7 damla taşımıştı; hangisinin gerilimi büyüktü?', ''],
      right: 'Evet. Daha çok damla taşıyan sıvının kubbesi yüksektir.',
    });
    c.clearSay();
    await belir(c, T.g, 450, 0);
    const pq = c.S('g', {}, svg);
    minipara(c, pq, { x: 290, y: 400, k: 1, h: kubbeH('su-20'), sivi: 'su' });
    minipara(c, pq, { x: 710, y: 400, k: 1, h: kubbeH('etanol-20'), sivi: 'su' });
    yazi(c, pq, 290, 490, 'P', { size: 46, kalin: 700 }); yazi(c, pq, 710, 490, 'Q', { size: 46, kalin: 700 });
    gizle(pq);
    await par(c.say('P’nin kubbesi yüksek: yüzey gerilimi daha büyüktür.'), belir(c, pq, 600));
    c.note('<b>Kubbe yüksekse yüzey gerilimi büyüktür.</b> Örnek: su, etanolden yüksek.', 'Dolaylı yöntem', 'dolayli-yontem');
  }

  /* ---- 4. Araştırılabilir soru ---- */
  async function arastirilabilir(c) {
    const svg = c.svg(1000, 562);
    const P = para(c, svg, { x: 105, y: 150, k: 0.38, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 10, sayac: false });
    const K = sorukarti(c, svg, { x: 170, y: 120, w: 660, h: 150, satirlar: ['Sıcaklık artarsa taşmadan duran', 'damla sayısı değişir mi?'], size: 30 });
    gizle(K.g);

    await par(c.say('Yüzey gerilimini neyin değiştirdiğini araştırmak istiyoruz.', { speak: '[curious] Yüzey gerilimini neyin değiştirdiğini araştırmak istiyoruz.' }), c.wait(300));
    await par(c.say('Bir şeyi değiştirip ölçerek cevaplanan soru araştırılabilirdir.'), belir(c, K.g, 600));
    await par(c.say('Sıcaklığı değiştirir, taşmadan duran damla sayısını ölçeriz.'), K.etiket(0, 'değiştirdiğimiz', 'sıcaklık'), K.etiket(1, 'ölçtüğümüz', 'damla sayısı'));

    // Birlikte çöz.
    c.clearSay();
    await belir(c, K.g, 400, 0);
    const K2 = sorukarti(c, svg, { x: 170, y: 120, w: 660, h: 150, satirlar: ['Suya sabun katılırsa taşmadan duran', 'damla sayısı değişir mi?'], size: 30 });
    gizle(K2.g);
    await belir(c, K2.g, 500);
    await par(K2.etiket(0, 'değiştirdiğimiz', '?'), K2.etiket(1, 'ölçtüğümüz', 'damla sayısı'));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bu soruda değiştirdiğimiz nedir?',
      options: ['Paranın büyüklüğü', 'Damla sayısı', 'Suya katılan madde'], answer: 2,
      hints: ['Para sabit kalır; onu değiştirmiyoruz.', 'Damla sayısını ölçeriz, değiştirmeyiz.', ''],
      right: 'Evet. Suya katılan maddeyi değiştiririz.',
    });
    c.clearSay();
    await par(c.say('Değiştirdiğimiz, suya katılan maddedir.'), K2.etiket(0, 'değiştirdiğimiz', 'suya katılan madde'));

    // Dene: sınıflandır.
    c.clearSay();
    await belir(c, [K2.g, K2.et[0], K2.et[1], P.kok], 450, 0);
    const KUTU = [{ baslik: 'Araştırılabilir', x: 40, y: 250, w: 440, h: 290 }, { baslik: 'Araştırılamaz', x: 520, y: 250, w: 440, h: 290 }];
    const KART = [
      { satir: ['Su ısıtılırsa para üstünde taşmadan duran', 'damla sayısı değişir mi?'], chip: 'ısıtılan su', kutu: 0, neden: 'Sıcaklığı değiştirir, damla sayısını ölçeriz.' },
      { satir: ['Suya sofra tuzu katılırsa taşmadan duran', 'damla sayısı değişir mi?'], chip: 'tuzlu su', kutu: 0, neden: 'Katılan maddeyi değiştirir, damla sayısını ölçeriz.' },
      { satir: ['Hangi sıvının damlası', 'daha güzel görünür?'], chip: 'güzel damla', kutu: 1, neden: '“Güzel”i ölçemeyiz; değiştirip ölçecek bir şey yok.' },
      { satir: ['Yüzey gerilimi neden', 'bu kadar önemlidir?'], chip: 'önem sorusu', kutu: 1, neden: 'Bir şeyi değiştirip ölçerek cevaplanmaz.' },
    ];
    const tahta = c.S('g', {}, svg);
    const T = kutuTahtasi(c, tahta, {
      kutular: KUTU, aralik: 54,
      ciz: (k, g) => { kutu(c, g, 100, 50, 800, 150, { rx: 16 }); k.satir.forEach((s, i) => yazi(c, g, 500, 112 + i * 40, s, { size: 30, kalin: 600 })); },
      chip: (k, p, x, y) => { const g = c.S('g', {}, p); kutu(c, g, x - 110, y - 22, 220, 44, { rx: 10 }); yazi(c, g, x, y + 8, k.chip, { size: 24, kalin: 600 }); return g; },
    });
    await c.say('Soruları araştırılabilir olup olmadıklarına göre ayır.', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: KUTU.map((q) => q.baslik), kartlar: KART,
      soru: (k) => `“${k.satir.join(' ')}” Bu soru hangi kutuya girer?`,
      sec: T.sec, yerlestir: T.yerlestir,
    });

    // Sonra.
    c.clearSay();
    await belir(c, tahta, 400, 0);
    const iki2 = c.S('g', {}, svg);
    kutu(c, iki2, 80, 200, 360, 130, { rx: 16, w: 3, renk: RENK.vurgu }); yazi(c, iki2, 260, 280, 'sıcaklık', { size: 42, kalin: 700 });
    kutu(c, iki2, 560, 200, 360, 130, { rx: 16, w: 3, renk: RENK.vurgu }); yazi(c, iki2, 740, 280, 'çözünen madde', { size: 38, kalin: 700 });
    gizle(iki2);
    await par(c.say('Sıcaklık ve çözünen madde, yüzey gerilimini araştırdığımız iki faktördür.'), belir(c, iki2, 600));
  }

  /* ---- 5. Önerme: çekimden yüzey gerilimine ---- */
  async function onerme(c) {
    const svg = c.svg(1000, 562);
    const Z = zincir(c, svg, { x: 40, y: 104, w: 920, h: 84, adlar: [['moleküller', 'arası çekim'], ['kohezyon'], ['yüzey', 'gerilimi']], size: 26 });
    const ustOk = Z.ustOk('büyür', RENK.cekme);
    const L = cekim(c, svg, { x: 40, y: 236, w: 430, h: 304, sutun: 6, satir: 4, kalin: 5.5, vurgu: true, r: 16 });
    const R = cekim(c, svg, { x: 530, y: 236, w: 430, h: 304, sutun: 6, satir: 4, kalin: 1.6, iz: 24, r: 16, tohum: 8 });
    const isinan = yazi(c, svg, 745, 220, 'ısınan sıvı', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(L.g, R.g, isinan, ustOk);

    await par(c.say('Yüzey gerilimi, kohezyonun sonucudur.'), belir(c, L.g, 600), Z.goster(1, 500), Z.goster(2, 500).then(() => Z.okAc(1, 400)));
    await par(c.say('Moleküller arası çekim büyüdükçe kohezyon ve yüzey gerilimi büyür.'), Z.goster(0, 500).then(() => Z.okAc(0, 400)), belir(c, ustOk, 700));
    await par(c.say('Isınan sıvıda moleküller arası çekim zayıflar.', { speak: '[thoughtful] Isınan sıvıda moleküller arası çekim zayıflar.' }), belir(c, [R.g, isinan], 700));

    await c.choice({
      tag: 'Tahmin et', q: 'Bu bilgilere göre ısınan sıvının yüzey gerilimi için hangi önerme kurulur?',
      options: ['Çekim zayıflar; yüzey gerilimi artar', 'Çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır', 'Isınma yüzey gerilimini değiştirmez'], answer: 1,
      hints: ['Çekim zayıflayınca kohezyona ne olur? Yüzey gerilimi kohezyonun sonucuydu.', '', 'Çekim zayıflıyor; yüzey gerilimi kohezyonun sonucu olduğundan o da değişir.'],
      right: 'Evet. Çekim zayıflar, kohezyon azalır; yüzey gerilimi azalır.',
    });

    // Sonra: ısınan sıvı için zincir.
    c.clearSay();
    await belir(c, [Z.g, L.g, R.g, isinan, ustOk], 450, 0);
    const Z2 = zincir(c, svg, { x: 40, y: 250, w: 920, h: 90, adlar: [['çekim', 'zayıflar'], ['kohezyon', 'azalır'], ['yüzey gerilimi', 'azalır']], size: 28 });
    const etik = yazi(c, svg, 500, 200, 'önerme', { size: 34, kalin: 700, renk: RENK.vurgu });
    gizle(etik);
    await par(c.say('Önerme, bilgilerden çıkarılan ve deneyle sınanabilen bir açıklamadır.'), belir(c, etik, 500), Z2.goster(0, 500));
    await par(Z2.okAc(0, 400), Z2.goster(1, 500));
    await par(Z2.okAc(1, 400), Z2.goster(2, 500));
    etik.textContent = 'bizim önermemiz';
    Z2.vurgu(2, true);
    await par(c.say('Bizim önermemiz: ısındıkça yüzey gerilimi azalır.'), c.wait(600));
  }

  /* ---- 6. Araştırmayı planla ---- */
  async function planla(c) {
    const svg = c.svg(1000, 562);
    const B = beher(c, svg, { x: 105, y: 440, k: 0.85, sic: 20 });
    const P = para(c, svg, { x: 310, y: 440, k: 0.65, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 22, sayac: false });
    const F = degiskenler(c, svg, { x: 410, y: 110, w: 580, h: 300, size: 26 });
    gizle(B.kok, P.kok, F.g);

    await par(c.say('Önermeyi sınamak için sıcaklığı değiştirip kubbeye bakacağız.'), belir(c, [B.kok, P.kok], 600));
    await par(c.say('Çerçeveyi bu araştırma için dolduralım.'), belir(c, F.g, 500));
    await par(c.say('Değiştirdiğimiz sıcaklıktır; ölçtüğümüz damla sayısı ve kubbedir.'), F.yaz(1, ['sıcaklık']), F.yaz(0, ['damla sayısı', 'kubbe']));

    // Birlikte çöz.
    await F.yaz(2, ['madenî para', 'damlalık', '?'], [RENK.yazi, RENK.yazi, RENK.vurgu]);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü kontrol değişkeni hangisi olmalı?',
      options: ['Sıcaklık', 'Taşmadan duran damla sayısı', 'Sıvının cinsi'], answer: 2,
      hints: ['Sıcaklık zaten başka sütunda; onu değiştireceğiz.', 'Damla sayısını ölçeriz; o başka sütunda.', ''],
      right: 'Evet. Sıcaklığın etkisini görmek için sıvıyı sabit tutarız.',
    });
    c.clearSay();
    await par(c.say('Sıvının cinsi, para ve damlalık sabit kalan kontrol değişkenleridir.'), F.yaz(2, ['madenî para', 'damlalık', 'sıvının cinsi']));

    // Sıra sende.
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Hangi düzenek sıcaklığın etkisini doğru sınar?',
      options: ['İki farklı sıvı: biri 20 °C, biri 50 °C', 'Aynı sıcaklıkta iki farklı sıvı', 'Aynı sıvıdan iki örnek: biri 20 °C, biri 50 °C; aynı para ve damlalık'], answer: 2,
      hints: ['Fark sıvıdan mı sıcaklıktan mı gelir? Kaç şey birden değişiyor?', 'Burada sıcaklık değişmiyor; sıvının etkisi sınanır.', ''],
      right: 'Evet. Yalnızca sıcaklık değişir.',
    });
    c.clearSay();
    await belir(c, [B.kok, P.kok, F.g], 450, 0);
    const D = c.S('g', {}, svg);
    const B1 = beher(c, D, { x: 130, y: 440, k: 0.8, sic: 20 }), B2 = beher(c, D, { x: 570, y: 440, k: 0.8, sic: 50 });
    minipara(c, D, { x: 330, y: 440, k: 0.5, h: kubbeH('su-20'), sivi: 'su' }); minipara(c, D, { x: 770, y: 440, k: 0.5, h: kubbeH('su-20'), sivi: 'su' });
    yazi(c, D, 230, 520, 'aynı sıvı, aynı para', { size: 26, kalin: 600, renk: RENK.soluk });
    yazi(c, D, 670, 520, 'aynı sıvı, aynı para', { size: 26, kalin: 600, renk: RENK.soluk });
    B2.git(50, 1);
    gizle(D);
    await par(c.say('Yalnızca sıcaklık farklıdır; sıvı, para ve damlalık aynıdır.'), belir(c, D, 700));
  }

  /* ---- 7. Araştırmayı uygula ---- */
  const SIVILAR = [['su', 'Su'], ['gliserin', 'Gliserin'], ['etilen', 'Etilen glikol'], ['etanol', 'Etanol']];
  async function uygula(c) {
    const svg = c.svg(1000, 562);
    const S = { sivi: 'su', sic: 20 };
    const B = beher(c, svg, { x: 105, y: 450, k: 0.75, sic: 20 });
    const P = para(c, svg, { x: 385, y: 450, k: 0.8, sivi: 'su', N: DAMLA['su-20'], H: kubbeH('su-20') });
    const T = deneyMatrisi(c, svg, { x: 640, y: 90, w: 340, sivilar: [{ ad: 'Su', anahtar: 'su' }, { ad: 'Gliserin', anahtar: 'gliserin' }, { ad: 'Etilen glikol', anahtar: 'etilen' }, { ad: 'Etanol', anahtar: 'etanol' }] });
    gizle(B.kok, P.kok, T.g);

    await par(c.say('Şimdi planı uygulayalım: sıvıyı seç, sıcaklığı değiştir.'), belir(c, [B.kok, P.kok, T.g], 600));
    await c.choice({
      tag: 'Tahmin et', q: 'Önerme doğruysa suyu 20 °C’tan 50 °C’a ısıtınca taşmadan duran damla sayısı nasıl değişir?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Önermemiz, ısınınca yüzey gerilimi azalır diyordu.', '', 'Yüzey gerilimi azalırsa kubbe nasıl olur?'],
      right: 'Evet. Yüzey gerilimi azalırsa kubbe alçalır, damla sayısı azalır.',
    });
    await c.say('Bir sıvıyı iki sıcaklıkta dene; her denemeyi tabloya yaz.', { noWait: true });

    // Kaydırıcılı deneme: kaydırıcıyı oyna, “Tabloya yaz” ile hücre doldur, “Devam” ile sürdür. Eksik kalan denemeleri tahta kendisi yapar.
    const yazilan = [];
    const guncelle = () => {
      const an = `${S.sivi}-${S.sic}`, ghost = S.sic === 50 ? kubbeH(`${S.sivi}-20`) : 0;
      B.git(S.sic, 500); B.ton(S.sivi);
      P.kur({ sivi: S.sivi, N: DAMLA[an], H: kubbeH(an), n: 0, ghost, tasma: 0 });
      P.say(DAMLA[an], 1500).then((devam) => (devam ? P.tasir(500) : null));
    };
    const sl = [
      c.slider({ tag: 'Dene', label: 'Sıvı', min: 0, max: 3, step: 1, value: 0, fmt: (v) => SIVILAR[v][1], onInput: (v) => { S.sivi = SIVILAR[v][0]; guncelle(); } }),
      c.slider({ tag: false, label: 'Sıcaklık', min: 0, max: 1, step: 1, value: 0, fmt: (v) => (v ? '50 °C' : '20 °C'), onInput: (v) => { S.sic = v ? 50 : 20; guncelle(); } }),
    ];
    const nb = c.h('div'); c.panel(null, nb);
    const not = (tur, html) => { nb.className = 'fb ' + tur; nb.innerHTML = html; };
    const ekle = async (sessiz) => {
      const an = `${S.sivi}-${S.sic}`;
      if (yazilan.some((q) => q.an === an)) { not('info', 'Bu deneme tabloda var. Önce kaydırıcıyı oynat.'); return false; }
      const onceki = yazilan[yazilan.length - 1];
      yazilan.push({ an, sivi: S.sivi, sic: S.sic });
      await T.yaz(S.sivi, S.sic, DAMLA[an]);
      if (!sessiz) {
        if (!onceki) not('info', 'İlk deneme yazıldı.');
        else {
          const ds = onceki.sivi !== S.sivi, dc = onceki.sic !== S.sic;
          if (ds && dc) not('no', 'Birden çok değişken değişti: etkiyi ayıramazsın.');
          else if (ds) not('ok', 'Tek değişken değişti: sıvı.');
          else not('ok', 'Tek değişken değişti: sıcaklık.');
        }
      }
      return true;
    };
    let devam = null;
    for (;;) {
      const yaz = c.cont('Tabloya yaz ›').then(() => 'y');
      const sonuc = await Promise.race(devam ? [yaz, devam.then(() => 'd')] : [yaz]);
      if (sonuc === 'd') break;
      if (!devam) devam = c.cont('Devam ›');
      await ekle(false);
    }
    let eksik = 0;
    for (let i = 0; i < SIVILAR.length; i++) for (const sic of [20, 50]) {
      const sivi = SIVILAR[i][0];
      if (yazilan.some((q) => q.sivi === sivi && q.sic === sic)) continue;
      if (!eksik) c.clearAct();
      eksik++;
      sl[0].set(i); sl[1].set(sic === 50 ? 1 : 0);
      await c.wait(1900); await ekle(true); await c.wait(300);
    }
    c.clearAct();
    if (eksik) await c.say('Eksik kalan denemeler de tabloya yazıldı.');

    // Gör: tablo vurgulanır, oklar, tahmin ve gözlem.
    c.clearSay();
    await belir(c, [B.kok, P.kok], 450, 0);
    const tg = c.S('g', {}, svg);
    etiketSatiri(c, tg, 320, 220, 'tahmin', 'azalır', { size: 38, renkDeger: RENK.vurgu });
    etiketSatiri(c, tg, 320, 290, 'gözlem', 'azaldı', { size: 38, renkDeger: RENK.vurgu });
    gizle(tg);
    T.vurgu(true);
    await par(c.say('Her sıvıda damla sayısı, ısınınca azaldı.'), T.oklar(600), belir(c, tg, 700));
  }

  /* ---- 8. Veriyi yorumla ---- */
  async function yorumla(c) {
    const svg = c.svg(1000, 562);
    const Z = zincir(c, svg, { x: 30, y: 70, w: 940, h: 96, adlar: [['sıcaklık', 'artar'], ['çekim', 'zayıflar'], ['kohezyon', 'azalır'], ['yüzey gerilimi', 'azalır']], ara: 50, size: 26 });
    const M = c.S('g', {}, svg);
    [['su', 'su'], ['gliserin', 'gliserin'], ['etilen', 'etilen glikol'], ['etanol', 'etanol']].forEach(([k, ad], i) => {
      const x = 125 + i * 250;
      minipara(c, M, { x, y: 400, k: 1, h: kubbeH(k + '-50'), hayalet: kubbeH(k + '-20'), sivi: k });
      yazi(c, M, x, 480, ad, { size: 28, kalin: 700 });
    });
    const lej = c.S('g', {}, M);
    cizgi(c, lej, [330, 530], [390, 530], GRI.acik, 3, { 'stroke-dasharray': '7 6' }); sb(c, lej, 408, 538, '20', '°C', { hiza: 'start', size: 26, kalin: 600, brenk: RENK.yazi });
    cizgi(c, lej, [560, 530], [620, 530], GRI.acik, 4); sb(c, lej, 638, 538, '50', '°C', { hiza: 'start', size: 26, kalin: 600, brenk: RENK.yazi });
    const onay = isaret(c, svg, 940, 215, 'ok', 26);
    gizle(M, onay);

    await par(c.say('Dört sıvıda da sıcaklık artınca kubbe alçaldı, damla sayısı azaldı.'), belir(c, M, 700));
    await par(c.say('Kubbe alçalınca yüzey gerilimi azalır.'), Z.goster(3, 500));
    await par(c.say('Veri, önermemizi destekledi.'), Z.goster(0, 500), belir(c, onay, 500));
    await par(c.say('Isınan sıvıda çekim zayıflar, kohezyon azalır.'), Z.goster(1, 500), Z.goster(2, 500), par(Z.okAc(0, 500), Z.okAc(1, 500), Z.okAc(2, 500)));

    await c.choice({
      tag: 'Sıra sende', q: 'Isıtılan dört sıvıda da damla sayısı azaldı. Veri “ısındıkça yüzey gerilimi azalır” önermesini nasıl etkiler?',
      options: ['Çürütür', 'Önermeyle ilgisizdir', 'Destekler'], answer: 2,
      hints: ['Önerme azalma diyordu; veri ne gösterdi?', 'Veri ile önerme aynı yönü gösteriyor mu?', ''],
      right: 'Evet. Veri ile önerme aynı yönü gösterir.',
    });
    c.clearSay();
    Z.vurgu(3, true);
    await c.say('Veri destekledi: ısındıkça yüzey gerilimi azalır.');
    c.note('<b>Sıcaklık arttıkça yüzey gerilimi azalır.</b> Örnek: su, 20 °C’tan 50 °C’a.', 'Sıcaklık', 'sicaklik');
  }

  /* ---- 9. Değişkenleri ayır ---- */
  async function ayir(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ baslik: 'Bağımlı', x: 40, y: 230, w: 280, h: 300 }, { baslik: 'Bağımsız', x: 360, y: 230, w: 280, h: 300 }, { baslik: 'Kontrol', x: 680, y: 230, w: 280, h: 300 }];
    const KART = [
      { metin: 'Sıcaklık', chip: 'sıcaklık', kutu: 1, neden: 'Değiştirdiğimiz değişken.' },
      { metin: 'Taşmadan duran damla sayısı', chip: 'damla sayısı', kutu: 0, neden: 'Ölçtüğümüz değişken.' },
      { metin: 'Sıvının cinsi', chip: 'sıvının cinsi', kutu: 2, neden: 'Aynı sıvıyı iki sıcaklıkta denedik.' },
      { metin: 'Madenî para', chip: 'madenî para', kutu: 2, neden: 'İki denemede de aynı para.' },
      { metin: 'Damlalık', chip: 'damlalık', kutu: 2, neden: 'İki denemede de aynı damlalık.' },
    ];
    const T = kutuTahtasi(c, svg, {
      kutular: KUTU, aralik: 56,
      ciz: (k, g) => { kutu(c, g, 250, 60, 500, 110, { rx: 16 }); yazi(c, g, 500, 128, k.metin, { size: 36, kalin: 700 }); },
      chip: (k, p, x, y) => { const g = c.S('g', {}, p); kutu(c, g, x - 118, y - 22, 236, 44, { rx: 10 }); yazi(c, g, x, y + 8, k.chip, { size: 24, kalin: 600 }); return g; },
    });
    await c.say('Her değişkeni kutusuna yerleştir.', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: KUTU.map((q) => q.baslik), kartlar: KART,
      soru: (k) => `“${k.metin}” hangi değişkendir?`,
      sec: T.sec, yerlestir: T.yerlestir,
    });
  }

  Ders.start({
    id: 'cesitlilik-m1', kicker: 'Konu M · Yüzey gerilimi', title: 'Yüzey gerilimi ve sıcaklık: soruyu kur, sına', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Yüzey gerilimi ve sıcaklık: soruyu kur, sına',
      hook: 'Suyu ısıtırsan yüzeyi daha mı gergin olur, daha mı gevşek?',
      button: 'Derse başla ›',
    },
    goals: [
      'Yüzey gerilimini madenî para ve damla yöntemiyle dolaylı olarak karşılaştırır.',
      'Araştırılabilir soru kurar ve önermeyi moleküller arası çekimle gerekçelendirir.',
      'Sıcaklığın etkisini tek değişken değiştirerek sınar, veriyi yorumlar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'Yüzeydeki molekülün çekimini ve kontrol değişkenini hatırla.', run: hatirla },
      { title: 'Dolaylı yöntem: para ve damla', goal: 'Kubbeye ve damla sayısına bakarak yüzey gerilimini karşılaştır.', run: dolayli },
      { title: 'İki sıvıyı karşılaştır', goal: 'Kubbesi yüksek olanın yüzey geriliminin büyük olduğunu gör.', run: iki },
      { title: 'Araştırılabilir soru', goal: 'Değiştirip ölçerek cevaplanan soruyu ayırt et.', run: arastirilabilir },
      { title: 'Önerme: çekimden yüzey gerilimine', goal: 'Sıcaklığın etkisi için çekimden önerme kur.', run: onerme },
      { title: 'Araştırmayı planla', goal: 'Bağımlı, bağımsız ve kontrol değişkenlerini belirle.', run: planla },
      { title: 'Araştırmayı uygula', goal: 'Sıvı ve sıcaklığı değiştirip damla sayısını tabloya yaz.', run: uygula },
      { title: 'Veriyi yorumla', goal: 'Veriyi önermeyle karşılaştır ve çekimle açıkla.', run: yorumla },
      { title: 'Değişkenleri ayır', goal: 'Değişkenleri kutularına yerleştir.', run: ayir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Sıvı A para üstünde sıvı B’den daha yüksek bir kubbe oluşturuyor. Hangisi doğrudur?',
        options: ['B’nin yüzey gerilimi daha büyüktür', 'İkisininki eşittir', 'A’nın yüzey gerilimi daha büyüktür'], answer: 2,
        why: ['Daha yüksek kubbe daha büyük yüzey gerilimi demektir; A’nın kubbesi yüksek.', 'Kubbe yükseklikleri farklıysa yüzey gerilimleri de farklıdır.', 'Kubbe ne kadar yüksekse yüzey gerilimi o kadar büyüktür.'], scene: 1 },
      { q: 'Bir sıvı ısıtılırsa yüzey gerilimi nasıl değişir?',
        options: ['Artar, çünkü moleküller hızlanır', 'Azalır', 'Değişmez'], answer: 1,
        why: ['Hızlanma çekimi güçlendirmez; ısınan sıvıda çekim zayıflar ve yüzey gerilimi azalır.', 'Isınan sıvıda moleküller arası çekim zayıflar; kohezyon ve yüzey gerilimi azalır.', 'Sıcaklık yüzey gerilimini etkiler; ısınınca azalır.'], scene: 4 },
      { q: 'Bir öğrenci etanolün 20 °C’taki ve 50 °C’taki yüzey gerilimini karşılaştırıyor. Hangisi kontrol değişkenidir?',
        options: ['Sıcaklık', 'Taşmadan duran damla sayısı', 'Madenî para'], answer: 2,
        why: ['Sıcaklığı değiştiriyoruz; bağımsız değişken odur.', 'Damla sayısını ölçüyoruz; bağımlı değişken odur.', 'Para iki denemede de aynı kalır; kontrol değişkenidir.'], scene: 5 },
      { q: 'Bir öğrenci 20 °C’taki gliserinle 50 °C’taki suyu karşılaştırıp sıcaklığın etkisini bulmaya çalışıyor. Sorun nedir?',
        options: ['Gliserin kullanılmış', 'Sıvı da sıcaklık da farklı', 'Para kullanılmış'], answer: 1,
        why: ['Gliserin de bir sıvıdır; kullanılabilir.', 'İki şey birden değişince fark sıvıdan mı sıcaklıktan mı geldiği anlaşılmaz.', 'Para kontrol değişkenidir; sorun değildir.'], scene: 5 },
      { q: 'Isıtılan sıvıda yüzey geriliminin azalmasının nedeni nedir?',
        options: ['Sıvının miktarı azalır', 'Moleküller arası çekim güçlenir', 'Moleküller arası çekim zayıflar, kohezyon azalır'], answer: 2,
        why: ['Miktar azalsa da yüzey gerilimi miktara bağlı değildir.', 'Isınınca çekim güçlenmez, zayıflar.', 'Çekim zayıflayınca kohezyon ve yüzey gerilimi azalır.'], scene: 7 },
    ],
    summary: [
      'Kubbe yüksekse yüzey gerilimi büyüktür.',
      'Önerme çekimden kurulur, deneyle sınanır.',
      'Tek değişken değişir, ötekiler sabit kalır.',
      '<b>Isındıkça çekim zayıflar; yüzey gerilimi azalır.</b>',
    ],
    nextLesson: { href: 'm2-cozunen-madde-gunluk-hayat.html', label: 'Sonraki ders ›' },
  });
})();
