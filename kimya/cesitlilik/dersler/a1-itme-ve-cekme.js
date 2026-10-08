/* A1 — İki atom yaklaşınca: itme ve çekme
   İki atom arasında hem itme hem çekme kuvveti vardır; bağ, ikisinin dengelendiği uzaklıkta kurulur.
   Senaryo: plan/kimya/cesitlilik/senaryolar/A-metalik-bag.md. Sıra plan/KURALLAR.md 3.2'ye göredir.
   Temanın ilk dersidir; "Hatırla" sahnesi yoktur. Kuvvet okları ve çubukları şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, ileri, yazi, renkli, cizgi, gizle, belir, par, ok, yuk, atom, etkilesim, cubuk } = window.KIT;
  const { lerp, ease, clamp } = Ders;

  /* Şematik kuvvet modeli: D0 denge uzaklığıdır. Çekme uzakta, itme yakında büyüktür; çok uzakta ikisi de yok sayılır. */
  const D0 = 250, UZAK = 640;
  const cekme = (d) => (d >= UZAK ? 0 : Math.exp(-(d - D0) / 150));
  const itme = (d) => (d >= UZAK ? 0 : Math.exp(-(2 * (d - D0)) / 150));

  /* İki atom, altlarında toplam çekme ve toplam itme çubukları, üstlerinde net kuvvet okları. ayarla(d) hepsini günceller. */
  function duzenek(c, svg, o = {}) {
    const y = o.y || 170, yc = o.yc || 388, g = c.S('g', {}, svg);
    const a1 = atom(c, g, [0, y], { r: 70, e: 0.5, ed: 36 }), a2 = atom(c, g, [0, y], { r: 70, e: Math.PI + 0.5, ed: 36 });
    const cubuklar = c.S('g', {}, svg);
    yazi(c, cubuklar, 300, yc + 8, 'toplam çekme', { hiza: 'end', size: 22, kalin: 600, renk: RENK.cekme });
    yazi(c, cubuklar, 300, yc + 60 + 8, 'toplam itme', { hiza: 'end', size: 22, kalin: 600, renk: RENK.itme });
    const bc = cubuk(c, cubuklar, 320, yc, RENK.cekme), bi = cubuk(c, cubuklar, 320, yc + 60, RENK.itme);
    const n1 = ok(c, g, [0, 0], [0, 0], RENK.vurgu, 5), n2 = ok(c, g, [0, 0], [0, 0], RENK.vurgu, 5);
    const durum = yazi(c, svg, 500, o.yd || 300, '', { size: 26, kalin: 700, renk: RENK.vurgu });
    let uzaklik = D0;
    function ayarla(d) {
      uzaklik = d;
      const x1 = 500 - d / 2, x2 = 500 + d / 2, C = cekme(d), I = itme(d), net = C - I, boy = clamp(Math.abs(net) * 70, 0, 90);
      a1.tasi([x1, y]); a2.tasi([x2, y]);
      bc.boy(clamp(C * 80, 0, 420)); bi.boy(clamp(I * 80, 0, 420));
      const yon = Math.abs(net) < 0.04 ? 0 : Math.sign(net);
      n1.ciz([x1, y - 96], [x1 + yon * boy, y - 96]); n2.ciz([x2, y - 96], [x2 - yon * boy, y - 96]);
      durum.textContent = d >= UZAK ? 'etkileşim yok' : yon > 0 ? 'net kuvvet: yaklaştırır' : yon < 0 ? 'net kuvvet: uzaklaştırır' : 'net kuvvet sıfır';
    }
    const git = (d, ms = 1200) => { const d0 = uzaklik; return c.tween(ms, (e) => ayarla(lerp(d0, d, e)), ease.inOut); };
    ayarla(o.d == null ? D0 : o.d);
    return { g, cubuklar, durum, ayarla, git };
  }

  /* ---- 1. Atomun içindeki yükler ---- */
  async function yukler(c) {
    const svg = c.svg(1000, 562);
    // Demir çubuk ve içindeki eşit aralıklı atomlar.
    const cubukG = c.S('g', {}, svg);
    c.S('rect', { x: 150, y: 62, width: 300, height: 40, rx: 8, fill: RENK.metal }, cubukG);
    yazi(c, cubukG, 300, 140, 'demir çubuk', { size: 22, kalin: 500, renk: RENK.soluk });
    const o1 = ok(c, cubukG, [150, 82], [150, 82], RENK.yazi), o2 = ok(c, cubukG, [450, 82], [450, 82], RENK.yazi);
    const mercek = c.S('g', {}, svg);
    cizgi(c, mercek, [450, 82], [668, 96], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    c.S('circle', { cx: 760, cy: 100, r: 84, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3 }, mercek);
    for (let i = 0; i < 5; i++) c.S('circle', { cx: 696 + i * 32, cy: 100, r: 12, fill: RENK.metal }, mercek);
    gizle(mercek);
    // Hidrojen atomu ve iki yük çifti.
    const ag = c.S('g', {}, svg);
    atom(c, ag, [280, 370], { r: 104, e: -0.75, ed: 74 });
    const eY = ileri([280, 370], -0.75, 74);
    const adC = yazi(c, ag, 280, 416, 'çekirdek', { size: 22, kalin: 600, renk: RENK.arti });
    const adE = yazi(c, ag, eY[0] + 58, eY[1] - 16, 'elektron', { size: 22, kalin: 600, renk: RENK.eksi });
    const cek = ok(c, ag, ileri(eY, -0.75 + Math.PI, 14), ileri([280, 370], -0.75, 22), RENK.cekme);
    gizle(ag, adC, adE, cek.g);
    const ayni = c.S('g', {}, svg), a1 = yuk(c, ayni, [720, 300], 'arti'), a2 = yuk(c, ayni, [780, 300], 'arti');
    yazi(c, ayni, 750, 352, 'aynı yükler iter', { size: 22, kalin: 600, renk: RENK.itme });
    const zit = c.S('g', {}, svg), z1 = yuk(c, zit, [670, 440], 'arti'), z2 = yuk(c, zit, [830, 440], 'eksi');
    yazi(c, zit, 750, 492, 'zıt yükler çeker', { size: 22, kalin: 600, renk: RENK.cekme });
    gizle(ayni, zit);

    // Anlat: durum, sonra atomun içindeki yükler.
    await par(c.say('Demir bir çubuğu çekersin, uzamaz; bastırırsın, kısalmaz.'), (async () => {
      await c.tween(600, (e) => { o1.ciz([150, 82], [150 - 56 * e, 82]); o2.ciz([450, 82], [450 + 56 * e, 82]); });
      await c.wait(500);
      await c.tween(600, (e) => { o1.ciz([94, 82], [94 + 50 * e, 82]); o2.ciz([506, 82], [506 - 50 * e, 82]); });
    })());
    await par(c.say('İçindeki atomlar birbirine hep aynı uzaklıkta durur.'), belir(c, mercek, 450));
    await par(c.say('Nedenini anlamak için en küçük atoma bakalım: hidrojen.'), belir(c, [cubukG, mercek], 400, 0.3), belir(c, ag, 450));
    await par(c.say('Çekirdeğinde artı yüklü bir proton, çevresinde eksi yüklü bir elektron var.'), belir(c, [adC, adE], 400));
    await par(c.say('Aynı yükler birbirini iter.'), (async () => {
      await belir(c, ayni, 350);
      await c.tween(800, (e) => { a1.tasi([720 - 44 * e, 300]); a2.tasi([780 + 44 * e, 300]); }, ease.out);
    })());
    await par(c.say('Zıt yükler birbirini çeker.'), (async () => {
      await belir(c, zit, 350);
      await c.tween(800, (e) => { z1.tasi([670 + 46 * e, 440]); z2.tasi([830 - 46 * e, 440]); }, ease.inOut);
    })());
    await par(c.say('Çekirdek artı, elektron eksi: çekirdek kendi elektronunu çeker.'), belir(c, cek.g, 400));

    // Sor: anlatılan kural iki elektrona uygulanır.
    await c.choice({
      tag: 'Sıra sende', q: 'İki elektron yan yana gelirse aralarındaki kuvvet nasıl olur?',
      options: ['Birbirlerini çekerler', 'Birbirlerini iterler', 'Aralarında kuvvet olmaz'], answer: 1,
      hints: ['İkisi de eksi yüklü; aralarında zıt yük yok.', '', 'Yüklü tanecikler birbirini etkiler.'],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    await c.say('İki elektronun yükü aynı: birbirlerini iterler.');
  }

  /* ---- 2. İki atom, dört etkileşim ---- */
  async function dortEtkilesim(c) {
    const svg = c.svg(1000, 562);
    const N1 = [170, 290], N2 = [410, 290];
    atom(c, svg, N1, { r: 82, e: -1.1, ed: 52 });
    const h2 = atom(c, svg, N2, { r: 82, e: Math.PI - 1.1, ed: 52 });
    const E1 = ileri(N1, -1.1, 52), E2 = ileri(N2, Math.PI - 1.1, 52);
    yazi(c, svg, 170, 412, '1', { size: 24, kalin: 700, renk: RENK.soluk });
    const ad2 = yazi(c, svg, 410, 412, '2', { size: 24, kalin: 700, renk: RENK.soluk });
    gizle(h2.g, ad2);
    // Tablo: her etkileşim bir satır.
    const satir = (i, ad, sonuc, renk) => {
      const g = c.S('g', {}, svg), y = 170 + i * 66;
      yazi(c, g, 566, y, ad, { hiza: 'start', size: 21, kalin: 600 });
      const s = yazi(c, g, 968, y, sonuc, { hiza: 'end', size: 22, kalin: 700, renk });
      cizgi(c, g, [566, y + 22], [968, y + 22], RENK.kenarlik, 1.5);
      gizle(g); return { g, s };
    };
    const s1 = satir(0, 'çekirdek – çekirdek', 'itme', RENK.itme), s2 = satir(1, 'elektron – elektron', 'itme', RENK.itme);
    const s3 = satir(2, '1. çekirdek – 2. elektron', 'çekme', RENK.cekme), s4 = satir(3, '2. çekirdek – 1. elektron', '?', RENK.vurgu);
    const e1 = etkilesim(c, svg, N1, N2, 'itme', { b: 22 }), e2 = etkilesim(c, svg, E1, E2, 'itme', { b: 15, boy: 38 });
    const e3 = etkilesim(c, svg, N1, E2, 'cekme', { b: 22, boy: 60 }), e4 = etkilesim(c, svg, N2, E1, 'cekme', { b: 22, boy: 60 });
    gizle(e1, e2, e3, e4);
    const goster = async (e, s, onceki) => { await par(belir(c, e, 400), belir(c, s.g, 400), onceki ? belir(c, onceki, 300, 0.18) : null); };

    // Anlat: iki atom, dört yüklü tanecik; etkileşimler tek tek.
    await par(c.say('Şimdi iki hidrojen atomunu birbirine yaklaştıralım.'), belir(c, [h2.g, ad2], 500));
    await c.say('Artık dört yüklü tanecik var: iki çekirdek, iki elektron.');
    await par(c.say('İki çekirdek de artı yüklü: birbirlerini iterler.'), goster(e1, s1));
    await par(c.say('İki elektron da eksi yüklü: onlar da birbirini iter.'), goster(e2, s2, e1));
    await par(c.say('Birinci atomun çekirdeği, ikinci atomun elektronunu çeker.'), goster(e3, s3, e2));

    // Birlikte çöz: üç satır dolu, dördüncüyü öğrenci tamamlar.
    c.clearSay();
    await par(belir(c, e3, 300, 0.18), belir(c, s4.g, 350));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Son satırı sen tamamla: ikinci atomun çekirdeği ile birinci atomun elektronu arasındaki kuvvet hangisi?',
      options: ['İtme', 'Çekme', 'Kuvvet yok'], answer: 1,
      hints: ['Biri artı, biri eksi yüklü.', '', 'İkisi de yüklü; aralarında kuvvet var.'],
      right: 'Evet. Zıt yükler birbirini çeker.',
    });
    s4.s.textContent = 'çekme'; s4.s.style.fill = RENK.cekme;
    await belir(c, e4, 400);
    await par(c.say('İki itme, iki çekme: dördü de aynı anda etki eder.'), belir(c, [e1, e2, e3], 400, 1));

    // Sor: hangi kuvvetler yaklaştırır?
    await c.choice({
      tag: 'Sıra sende', q: 'Atomları birbirine yaklaştıran kuvvetler hangileridir?',
      options: ['Çekirdeklerin birbirini itmesi', 'Çekirdeklerin öteki atomun elektronunu çekmesi', 'Elektronların birbirini itmesi'], answer: 1,
      hints: ['İtme, çekirdekleri birbirinden uzaklaştırır.', '', 'İtme, elektronları birbirinden uzaklaştırır.'],
      right: 'Evet. Yaklaştıran, iki çekme kuvvetidir.',
    });
    await par(c.say('Çekme kuvvetleri atomları yaklaştırır, itme kuvvetleri uzaklaştırır.'), belir(c, [e1, e2], 300, 0.25));
  }

  /* ---- 3. Yaklaştıkça ne değişir? ---- */
  async function yaklastikca(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { d: 700 });

    // Anlat: üç konum (uzak, yaklaşırken, çok yakın).
    await c.say('Atomlar birbirinden çok uzakken aralarında etkileşim olmaz.');
    await par(c.say('Yaklaştıkça dört kuvvet de büyür.'), d.git(420, 1500));
    await c.say('Önce çekme daha büyüktür: atomlar birbirine doğru çekilir.');
    await par(c.say('Atomlar çok yaklaşırsa çekirdekler birbirini kuvvetle iter.'), d.git(170, 1500));
    await c.say('Bu kez itme daha büyüktür: atomlar geri itilir.');

    // Tahmin: iki uç durum anlatıldı; arası soruluyor.
    await c.choice({
      tag: 'Tahmin et', q: 'Uzakta çekme büyük, çok yakında itme büyük. Arada bir yerde ne olur?',
      options: ['Kuvvetlerin ikisi de sıfır olur', 'İtme ile çekme eşitlenir', 'Çekme hep büyük kalır'], answer: 1,
      hints: ['Atomlar yaklaştıkça kuvvetler büyüyordu; sıfırlanmazlar.', '', 'Çok yakında itme daha büyüktü.'],
      right: 'Evet. Bir uzaklıkta ikisi eşit olur.',
    });
    await d.git(D0, 1400);
    await c.say('Tam bu uzaklıkta itme ile çekme birbirini dengeler.', { speak: 'Tam bu uzaklıkta itme ile çekme [short pause] birbirini dengeler.' });

    // Dene: uzaklık kaydırıcısı.
    await c.say('Uzaklığı değiştir; hangi kuvvetin büyük olduğuna bak.', { noWait: true });
    c.slider({ tag: 'Dene', label: 'Çekirdekler arası uzaklık', min: 160, max: 520, step: 10, value: D0, fmt: () => '', onInput: (v) => d.ayarla(v) });
    await c.cont('Devam ›');
    c.clearAct();
    await d.git(D0, 700);
    await c.say('Atomlar bu uzaklıktan ne yaklaşmak ister ne uzaklaşmak.');
  }

  /* ---- 4. Bağ: itme ile çekmenin dengesi ---- */
  async function bag(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { y: 140, yc: 312, yd: 262, d: D0 });
    const kural = renkli(c, svg, 500, 462, ['bağ:  ', ['itme', RENK.itme], ' = ', ['çekme', RENK.cekme]], { size: 28, kalin: 700 });
    const demir = c.S('g', {}, svg);
    for (let i = 0; i < 7; i++) c.S('circle', { cx: 302 + i * 46, cy: 516, r: 15, fill: RENK.metal }, demir);
    yazi(c, demir, 690, 524, 'demir çubuk', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    gizle(kural, demir);

    // Anlat: denge, bağ ve yanılgı.
    await par(c.say('İtme ile çekme dengelendiğinde çekirdeklerin üzerindeki net kuvvet sıfırdır.'), belir(c, kural, 450));
    await c.say('Atomlar bu durumda bir arada kalır: aralarında bir bağ kurulmuştur.');
    await c.say('Bağ kurulunca itme kuvvetleri yok olmaz; çekmeyle dengelenir.', { speak: '[thoughtful] Bağ kurulunca itme kuvvetleri yok olmaz; çekmeyle dengelenir.' });

    // Sor: yeni durum (bağ yapmış atomlar bastırılıyor).
    await c.choice({
      tag: 'Sıra sende', q: 'Bağ yapmış iki atom birbirine doğru bastırılıp daha da yaklaştırılıyor. Hangi kuvvet büyük olur?',
      options: ['Çekme; atomlar daha da yaklaşır', 'İtme; atomlar geri itilir', 'İkisi yine eşit kalır'], answer: 1,
      hints: ['Çok yakında çekirdekler birbirini kuvvetle itiyordu.', '', 'Eşitlik yalnızca denge uzaklığında vardı.'],
      right: 'Evet. Yakında itme büyür ve atomları geri iter.',
    });
    await d.git(190, 900); await c.wait(350); await d.git(D0, 900);
    await c.say('Yaklaşınca itme büyür, uzaklaşınca çekme: atomlar dengeye geri döner.');
    await par(c.say('Demir çubuktaki atomları o uzaklıkta tutan da bu dengedir.'), belir(c, demir, 450));
    c.note('<b>Bağ: itme = çekme</b>, net kuvvet sıfır.<br>Örnek: iki hidrojen atomu.', 'Bağ', 'bag');
  }

  Ders.start({
    id: 'cesitlilik-a1', kicker: 'Konu A · Metalik bağ', title: 'İki atom yaklaşınca: itme ve çekme', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'İki atom yaklaşınca: itme ve çekme',
      hook: 'Demir bir çubuğu çekerek uzatamıyor, bastırarak kısaltamıyorsun; atomlarını o uzaklıkta tutan ne?',
      button: 'Derse başla ›',
    },
    goals: ['İki atom arasındaki itme ve çekme kuvvetlerini ayırır.', 'Atomlar yaklaşırken bu kuvvetlerin nasıl değiştiğini söyler.', 'Bağın, net kuvvetin sıfır olduğu yerde kurulduğunu açıklar.'],
    scenes: [
      { title: 'Atomun içindeki yükler', goal: 'Çekirdek ile elektronun yüklerini ve birbirine etkisini gör.', run: yukler },
      { title: 'İki atom, dört etkileşim', goal: 'İki atom arasındaki iki itmeyi ve iki çekmeyi bul.', run: dortEtkilesim },
      { title: 'Yaklaştıkça ne değişir?', goal: 'Uzaklık değişince hangi kuvvetin büyük olduğunu gör.', run: yaklastikca },
      { title: 'Bağ: itme ile çekmenin dengesi', goal: 'Bağın, kuvvetlerin dengelendiği yerde kurulduğunu söyle.', run: bag },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İki hidrojen atomu bağ yaptığında çekirdeklerin üzerindeki net kuvvet nasıldır?',
        options: ['Çekme yönündedir', 'Sıfırdır', 'İtme yönündedir'], answer: 1,
        why: ['Çekme büyük olsaydı atomlar daha da yaklaşırdı.', 'Bağda itme ile çekme birbirini dengeler.', 'İtme büyük olsaydı atomlar uzaklaşırdı.'], scene: 3 },
      { q: 'Bağ yapmış iki atom arasında itme kuvveti var mıdır?',
        options: ['Yoktur; yalnızca çekme kuvveti kalır', 'Vardır; çekme kuvvetiyle dengelenmiştir', 'Yoktur; bağ kurulunca kuvvetler biter'], answer: 1,
        why: ['Çekirdekler hâlâ artı yüklüdür ve birbirini iter.', 'İtme yok olmaz; çekmeyle eşit büyüklüktedir.', 'Yükler durdukça itme de çekme de sürer.'], scene: 3 },
      { q: 'Bir hidrojen atomu ile bir flor atomu yaklaşıyor. Hidrojenin elektronu ile florun çekirdeği arasındaki kuvvet hangisidir?',
        options: ['İtme', 'Çekme', 'Kuvvet yoktur'], answer: 1,
        why: ['İtme, aynı yüklü tanecikler arasında olur.', 'Elektron eksi, çekirdek artı yüklüdür; zıt yükler çeker.', 'İkisi de yüklüdür; aralarında kuvvet vardır.'], scene: 1 },
      { q: 'Bağ yapmış iki atom birbirinden biraz uzaklaştırılıyor. Hangi kuvvet büyük olur?',
        options: ['İtme; atomlar daha da uzaklaşır', 'Çekme; atomlar geri çekilir', 'İkisi de sıfır olur'], answer: 1,
        why: ['İtme, atomlar çok yaklaştığında büyük olur.', 'Denge uzaklığının ötesinde çekme daha büyüktür.', 'Kuvvetler ancak atomlar çok uzaklaşınca kaybolur.'], scene: 2 },
    ],
    summary: ['İki atom arasında iki itme, iki çekme vardır.', 'Çekme yaklaştırır, itme uzaklaştırır.', '<b>Bağ, itme ile çekmenin dengelendiği yerde kurulur.</b>'],
    nextLesson: { href: 'a2-metalik-bag.html', label: 'Sonraki: Metalik bağ ›' },
  });
})();
