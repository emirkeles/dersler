/* K2 — Sıcaklık ve viskozite
   Aynı sıvının akışkanlığı sıcaklıkla değişir: sıcaklık arttıkça moleküller arası etkileşim zayıflar, akışkanlık artar, viskozite azalır.
   Etkiyi görmek için tek değişken değişir. Senaryo: plan/kimya/cesitlilik/senaryolar/K-viskozite.md (K2). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Benzetimde bilyenin yolu şekilden okunan bölme sayısıdır (her bölme 2 cm; okuma yaklaşıktır):
   I propil alkol 25 °C 7 · II propilen glikol 25 °C 4 · III gliserin 25 °C 1 · IV propil alkol 30 °C dibe · V propilen glikol 15 °C 2 · VI gliserin 60 °C 4.
   Sıcaklık kaydırıcısı iki konumludur; ara sıcaklıkta durmaz. Süre ve yol için başka sayı uydurulmaz. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { GRI, SIVI, sb, olcekYaz, yapi, kayma, tup, sayac, termometre, deneyTablosu, etiketBlok, yolGrafik } = window.KIT_K;

  /* Altı tüp: sıvı, sıcaklık ve şekilden okunan yol (bölme). */
  const TUP = {
    I: { sivi: 'propil alkol', ton: SIVI.propilalkol, sic: 25, bolme: 7 },
    II: { sivi: 'propilen glikol', ton: SIVI.propilenglikol, sic: 25, bolme: 4 },
    III: { sivi: 'gliserin', ton: SIVI.gliserin, sic: 25, bolme: 1 },
    IV: { sivi: 'propil alkol', ton: SIVI.propilalkol, sic: 30, dibe: true },
    V: { sivi: 'propilen glikol', ton: SIVI.propilenglikol, sic: 15, bolme: 2 },
    VI: { sivi: 'gliserin', ton: SIVI.gliserin, sic: 60, bolme: 4 },
  };
  const NO = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  const satirDe = (no) => { const t = TUP[no]; return { no, sivi: t.sivi, sic: t.sic, bolme: t.bolme, cm: t.dibe ? 0 : t.bolme * 2, dibe: !!t.dibe, yuva: NO.indexOf(no) }; };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Soru 1: viskozitesi büyük sıvıda moleküller zor kayar.
    const g1 = c.S('g', {}, svg);
    const k1 = kayma(c, g1, { x: 345, y: 160, w: 310, h: 200, hiz: 'yavas' });
    yazi(c, g1, 500, 140, 'viskozitesi büyük sıvı', { size: 30, kalin: 700 });
    // Soru 2: kapalı kapta sıcaklık artıyor.
    const g2 = c.S('g', {}, svg);
    kutu(c, g2, 400, 120, 280, 300, { rx: 10, dolgu: 'none', w: 3 });
    c.S('rect', { x: 402, y: 340, width: 276, height: 78, rx: 8, fill: SIVI.su, 'fill-opacity': 0.9 }, g2);
    [[440, 180], [510, 240], [590, 170], [640, 290], [460, 290], [550, 215], [620, 230], [495, 160]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 8, fill: GRI.molekul }, g2));
    termometre(c, g2, 280, 300, 2);
    ok(c, g2, [280, 200], [280, 140], RENK.yazi, 5);
    yazi(c, g2, 280, 400, 'sıcaklık artıyor', { size: 26, kalin: 700 });
    gizle(g1, g2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 600), k1.kay(2400));
    await c.choice({
      tag: 'Hatırla', q: 'Bir sıvının viskozitesi büyükse akışkanlığı nasıldır?',
      options: ['Büyüktür', 'Küçüktür', 'Değişmez'], answer: 1,
      hints: ['Viskozite arttıkça akışkanlık azalır.', '', 'Viskozite arttıkça akışkanlık azalır.'],
      right: 'Evet. Viskozite arttıkça akışkanlık azalır.',
    });
    c.clearSay();
    await belir(c, g1, 400, 0);
    await belir(c, g2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Kapalı kapta dengedeki bir sıvının sıcaklığı artırılıyor. Denge buhar basıncı ne olur?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['Sıcaklık artınca buhar fazına geçen molekül sayısı artar; basınç yükselir.', 'Sıcaklık artınca buhar fazına geçen molekül sayısı artar; basınç yükselir.', ''],
      right: 'Evet. Sıcaklık artınca buhar fazına geçen molekül sayısı artar.',
    });
    c.clearSay();
    await belir(c, g2, 400, 0);
    await c.say('Bugün sıcaklığın sıvının akışına etkisine bakacağız.');
  }

  /* ---- 2. Bilye ile akışkanlık ölçmek ---- */
  async function bilye(c) {
    const svg = c.svg(1000, 562);
    const A = tup(c, svg, { x: 200, y: 78, k: 1, ton: SIVI.su, bolme: 7, etiket: ['A'], esize: 32 });
    const B = tup(c, svg, { x: 470, y: 78, k: 1, ton: SIVI.etilenglikol, bolme: 4, etiket: ['B'], esize: 32 });
    const sy = sayac(c, svg, 760, 150, { size: 46 });
    const olcek = c.S('g', {}, svg);
    olcekYaz(c, olcek, 760, 260, 28);
    const alt = c.S('g', {}, svg);
    yazi(c, alt, 200, 495, 'akışkanlık büyük', { size: 26, kalin: 700, renk: RENK.vurgu }); yazi(c, alt, 470, 495, 'viskozite büyük', { size: 26, kalin: 700, renk: RENK.vurgu });
    gizle(A.g, B.g, sy.g, olcek, alt);

    await par(c.say('Akışkanlığı ölçmenin bir yolu: sıvıya çelik bilye bırakmak.'), belir(c, A.g, 600));
    await par(c.say('Özdeş tüplere eşit miktarda sıvı koyup bilyeleri aynı anda bırakırız.'), belir(c, B.g, 600));
    await par(c.say('Bilye, viskoz sıvıda yavaş iner.'), belir(c, sy.g, 300), A.birak(3600), B.birak(3600), sy.git(3600));
    sy.t.style.fill = RENK.vurgu;
    await c.say('On saniye sonra bilyenin aldığı yola bakarız.');
    await par(c.say('Tüpler eşit bölmelidir; her bölme 2 cm’dir.', { speak: 'Tüpler eşit bölmelidir; her bölme iki santimetredir.' }), belir(c, olcek, 500));
    await par(c.say('Bilye ne kadar çok inerse sıvı o kadar akışkandır.'), A.isaret(7), B.isaret(4));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'İki tüpte 10 saniye sonra A tüpündeki bilye, B tüpündekinden daha çok yol aldı. Hangisi doğrudur?',
      options: ['A’daki sıvının viskozitesi daha büyüktür', 'A’daki sıvının akışkanlığı daha büyüktür', 'İkisinin akışkanlığı eşittir'], answer: 1,
      hints: ['Bilye çok iniyorsa sıvı kolay akıyor; direnç küçük.', '', 'Bilyeler farklı yol aldı; akışkanlıklar eşit olamaz.'],
      right: 'Evet. Bilye çok indiyse sıvı kolay akıyor.',
    });
    await par(c.say('Bilyenin yolu büyükse akışkanlık büyük, viskozite küçüktür.'), belir(c, alt, 600));
  }

  /* ---- 3. Üç sıvı, 25 °C ---- */
  async function ucSivi(c) {
    const svg = c.svg(1000, 562), X = [110, 280, 450], YOL = ['I', 'II', 'III'], Y0 = 215;
    const T = YOL.map((no, i) => tup(c, svg, { x: X[i], y: Y0, k: 0.8, ton: TUP[no].ton, sic: 25, bolme: TUP[no].bolme, etiket: [no], esize: 26 }));
    const SYF = ['propilalkol', 'propilenglikol', 'gliserin'];
    const F = SYF.map((s, i) => yapi(c, svg, { x: X[i], y: 66, sivi: s, size: 20, rozetY: 150 }));
    const sy = sayac(c, svg, 770, 470, { size: 40 });
    const olcek = c.S('g', {}, svg);
    olcekYaz(c, olcek, 770, 530, 26);
    const tab = deneyTablosu(c, svg, { x: 560, y: 60, w: 430, yer: 3 });
    gizle(T.map((t) => t.g), F.map((f) => f.g), sy.g, olcek, tab.g);
    T.forEach((t) => { t.sicT.style.opacity = 0; });

    await par(c.say('Bir grup öğrenci özdeş tüplere üç sıvı koydu.'), belir(c, T.map((t) => t.g), 600));
    await belir(c, tab.g, 1, 1);
    const ST = YOL.map((no) => Object.assign(satirDe(no), { bolmeGizli: true, cmGizli: true }));
    await par(c.say('Propil alkol, propilen glikol, gliserin: üçü de 25 °C’ta.', { speak: 'Propil alkol, propilen glikol, gliserin: üçü de yirmi beş derecede.' }),
      (async () => { for (let i = 0; i < 3; i++) { await tab.satirEkle(ST[i]); await belir(c, T[i].sicT, 300, 1); } })());
    await par(c.say('Çelik bilyeler aynı anda, aynı yükseklikten bırakıldı.'), belir(c, sy.g, 300), ...T.map((t) => t.birak(3600)), sy.git(3600));
    await par(c.say('Propil alkolde bir, propilen glikolde iki, gliserinde üç OH var.', { speak: 'Propil alkolde bir, propilen glikolde iki, gliserinde üç o ha var.' }),
      belir(c, F.map((f) => f.g), 500), c.wait(600).then(() => Promise.all(F.map((f) => f.vurgula(500)))));
    await par(c.say('On saniye sonra bilyeler 7, 4 ve 1 bölme inmişti.', { speak: 'On saniye sonra bilyeler yedi, dört ve bir bölme inmişti.' }),
      belir(c, F.map((f) => f.g), 400, 0.1), ...T.map((t) => t.isaret()), ...T.map((t, i) => tab.bolmeYaz(i)));
    await par(c.say('Her bölme 2 cm’dir; yollar 14, 8 ve 2 cm.', { speak: 'Her bölme iki santimetredir; yollar on dört, sekiz ve iki santimetre.' }),
      belir(c, olcek, 500), (async () => { for (let i = 0; i < 3; i++) { await tab.cmYaz(i); await c.wait(250); } })());

    // Birlikte çöz: tüpler soluklaşır; iki adım yazılır.
    c.clearSay();
    await belir(c, [...T.map((t) => t.g), sy.g, olcek], 400, 0.1);
    const st = c.S('g', {}, svg);
    etiketBlok(c, st, 560, 320, ['1. En çok propil alkolde,', 'en az gliserinde indi:', 'akışkanlık en çok propil alkolde.'], { hiza: 'start', size: 22, kalin: 600, aralik: 30 });
    const st2 = etiketBlok(c, st, 560, 430, ['2. Viskozite en büyük olan: ?'], { hiza: 'start', size: 22, kalin: 600 });
    gizle(st); await belir(c, st, 450, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Hangi sıvının viskozitesi en büyüktür?',
      options: ['Propil alkol', 'Gliserin', 'Propilen glikol'], answer: 1,
      hints: ['Bilyenin yolu en kısa olan sıvı en az akışkandır.', '', 'Bilye bu sıvıda gliserindekinden daha çok indi.'],
      right: 'Evet. Akışkanlık en küçükse viskozite en büyüktür.',
    });
    st2.firstChild.textContent = '2. Viskozite en büyük olan: gliserin';
    await c.say('Bilye gliserinde en az indi; viskozitesi en büyük olan o.');

    // Sor: OH sayısı ile yol arasındaki örüntü.
    c.clearSay();
    await par(belir(c, [tab.g, st], 400, 0), belir(c, [...T.map((t) => t.g), sy.g, olcek], 400, 1), belir(c, F.map((f) => f.g), 400, 1));
    await c.choice({
      tag: 'Sıra sende', q: 'OH grubu sayısı ile bilyenin yolu arasında hangi örüntü var?',
      options: ['OH sayısı arttıkça yol artar', 'OH sayısı ile yol arasında ilişki yok', 'OH sayısı arttıkça yol azalır'], answer: 2,
      hints: ['Bir, iki, üç OH’lu tüpleri sırayla karşılaştır.', 'Tüpler OH sayısına göre sıralanıyor: bir ilişki var.', ''],
      right: 'Evet. OH sayısı arttıkça bilyenin yolu azalır.',
    });
    await c.say('Hidrojen bağı arttıkça sıvı zor akar; bilye az iner.');
  }

  /* ---- 4. Aynı gliserini ısıtırsak ---- */
  async function isitma(c) {
    const svg = c.svg(1000, 562);
    const III = tup(c, svg, { x: 170, y: 100, k: 0.8, ton: SIVI.gliserin, sic: 25, bolme: 1, etiket: ['III', 'gliserin'], esize: 24 });
    const VI = tup(c, svg, { x: 450, y: 100, k: 0.8, ton: SIVI.gliserin, sic: 60, bolme: 4, etiket: ['VI', 'gliserin'], esize: 24 });
    III.konum(1);
    const term = termometre(c, svg, 590, 250, 1.5);
    const sy = sayac(c, svg, 790, 170, { size: 44 });
    const cer = c.S('g', {}, svg);
    kutu(c, cer, 240, 458, 520, 86, { rx: 14, w: 3, renk: RENK.vurgu });
    yazi(c, cer, 500, 492, 'Değişen: sıcaklık', { size: 26, kalin: 700, renk: RENK.vurgu });
    yazi(c, cer, 500, 526, 'Sabit: sıvı, miktar, bilye', { size: 26, kalin: 700 });
    gizle(VI.g, term, sy.g, cer);
    await III.isaret(1, 1);

    await par(c.say('Aynı gliserini 60 °C’a kadar ısıttık.', { speak: 'Aynı gliserini altmış dereceye kadar ısıttık.' }), belir(c, [VI.g, term], 600));
    await par(c.say('Başka her şey aynı: tüp, miktar ve bilye.'), belir(c, cer, 500));
    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Isınan gliserinde bilye 10 saniyede 25 °C’takinden nasıl iner?',
      options: ['Daha az', 'Daha çok', 'Aynı kadar'], answer: 1,
      hints: ['Isıtılmış bal kaşıktan nasıl akar?', '', 'Gliserin de bal gibi koyu bir sıvı; ısınınca davranışı değişir.'],
      right: 'Evet. Isınan sıvı daha kolay akar.',
    });
    await par(c.say('Bilyeyi 60 °C’lık gliserine bırakalım.', { speak: 'Bilyeyi altmış derecelik gliserine bırakalım.' }), belir(c, sy.g, 300), VI.birak(3600), sy.git(3600));
    await par(c.say('25 °C’ta bilye 1 bölme, 60 °C’ta 4 bölme indi.', { speak: 'Yirmi beş derecede bilye bir bölme, altmış derecede dört bölme indi.' }), VI.isaret(4));
    await c.say('Isınan gliserin daha kolay akıyor.');
  }

  /* ---- 5. Hangi iki tüpü karşılaştırmalı? ---- */
  async function karsilastir(c) {
    const svg = c.svg(1000, 562), K = 0.55;
    const X = NO.map((_, i) => 95 + i * 162), tubes = [], frames = [];
    NO.forEach((no, i) => {
      const t = tup(c, svg, { x: X[i], y: 190, k: K, ton: TUP[no].ton });
      t.bilye.style.opacity = 0;
      const e = etiketBlok(c, svg, X[i], t.dip + 34, [no, TUP[no].sivi, [String(TUP[no].sic), '°C']], { size: 21, kalin: 600, aralik: 27, renkler: [RENK.vurgu] });
      e.firstChild.setAttribute('font-weight', 700);
      tubes.push({ t, e });
      const f = c.S('rect', { x: X[i] - 79, y: 168, width: 158, height: t.dip + 118 - 168, rx: 12, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4 }, svg);
      f.style.opacity = 0; frames.push(f);
    });
    const k1 = c.S('g', {}, svg), k2 = c.S('g', {}, svg);
    kutu(c, k1, 40, 36, 440, 70, { rx: 14, w: 3, renk: RENK.vurgu }); yazi(c, k1, 260, 82, 'sıvı sabit, sıcaklık değişir', { size: 26, kalin: 700 });
    kutu(c, k2, 520, 36, 440, 70, { rx: 14, w: 3, renk: RENK.vurgu }); yazi(c, k2, 740, 82, 'sıcaklık sabit, sıvı değişir', { size: 26, kalin: 700 });
    gizle(tubes.map((q) => q.t.g), tubes.map((q) => q.e), k1, k2);

    await par(c.say('Altı tüpte üç sıvı, farklı sıcaklıklarda duruyor.'), belir(c, [...tubes.map((q) => q.t.g), ...tubes.map((q) => q.e)], 700));
    await par(c.say('Sıcaklığın etkisini görmek için sıvı sabit kalmalıdır.'), belir(c, k1, 500));
    await par(c.say('Sıvı türünün etkisini görmek için sıcaklık sabit kalmalıdır.'), belir(c, k2, 500));
    await c.say('Etkiyi görmek için tek değişkeni değiştiririz.');
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Sıcaklığın etkisini bulmak için hangi iki tüp seçilmelidir?',
      options: ['II ve III', 'I ve VI', 'II ve V'], answer: 2,
      hints: ['II ve III’te sıvılar farklı.', 'I ve VI’da hem sıvı hem sıcaklık farklı.', ''],
      right: 'Evet. II ve V’te sıvı aynı, sıcaklık farklı.',
    });
    await par(belir(c, frames[1], 350, 1), belir(c, frames[4], 350, 1));
    await c.say('II ve V’te sıvı aynı, yalnızca sıcaklık farklı.');
    c.clearSay();
    await par(belir(c, [frames[1], frames[4]], 300, 0), belir(c, [k1], 300, 0.25), belir(c, k2, 300, 1));
    await c.choice({
      tag: 'Sıra sende', q: 'Sıvı türünün etkisini bulmak için hangi iki tüp seçilmelidir?',
      options: ['III ve VI', 'II ve V', 'I ve II'], answer: 2,
      hints: ['III ve VI’da sıvı aynı, sıcaklık farklı.', 'II ve V’te sıvı aynı.', ''],
      right: 'Evet. I ve II’de sıcaklık aynı, sıvı farklı.',
    });
    await par(belir(c, frames[0], 350, 1), belir(c, frames[1], 350, 1));
    await c.say('I ve II’de sıcaklık aynı, yalnızca sıvı farklı.');
    c.clearSay();
    await par(belir(c, frames, 300, 0), belir(c, [k1, k2], 300, 1));
    await c.say('Tek değişkeni değiştirince fark, o değişkenden gelir.');
  }

  /* ---- 6. Sıvıyı ve sıcaklığı seç ---- */
  async function sec(c) {
    const svg = c.svg(1000, 562);
    const SIV = [['propil alkol', SIVI.propilalkol, [25, 30]], ['propilen glikol', SIVI.propilenglikol, [15, 25]], ['gliserin', SIVI.gliserin, [25, 60]]];
    const SONUC = [['I', 'IV'], ['V', 'II'], ['III', 'VI']];
    const T = tup(c, svg, { x: 140, y: 96, k: 0.92, ton: SIV[0][1], sic: 25 });
    const ad = yazi(c, svg, 140, 72, 'propil alkol', { size: 26, kalin: 700 });
    const sy = sayac(c, svg, 330, 140, { size: 40 });
    const olcek = olcekYaz(c, svg, 200, 520, 24);
    const cer = c.S('g', {}, svg);
    kutu(c, cer, 440, 20, 550, 54, { rx: 12, w: 3, renk: RENK.vurgu }); yazi(c, cer, 715, 56, 'Sabit: tüp, miktar, bilye', { size: 26, kalin: 700 });
    const tab = deneyTablosu(c, svg, { x: 440, y: 92, w: 540, yer: 6, satirlar: ['I', 'II', 'III', 'VI'].map(satirDe) });
    gizle(T.g, ad, sy.g, olcek, cer, tab.g);
    const yazilan = new Set(['I', 'II', 'III', 'VI']);
    await belir(c, [T.g, ad, sy.g, olcek, cer, tab.g], 600);

    await c.say('Sıcaklığı değiştirerek ölçmediğimiz tüpleri de deneyelim.');
    await c.say('Sıvıyı ve sıcaklığı seç; bilyeyi bırak.');
    await c.say('Sonucu tabloya yaz.');
    await c.say('Propil alkolü 30 °C’ta, propilen glikolü 15 °C’ta dene; sonuçları tabloya yaz.', { noWait: true, speak: 'Propil alkolü otuz derecede, propilen glikolü on beş derecede dene; sonuçları tabloya yaz.' });

    // Denetimler: sıvı seçimi, iki konumlu kaydırıcı, düğmeler.
    let sv = 0, sk = 0, mesgul = false, birakildi = false;
    let devamAc;
    const devamP = new Promise((r) => { devamAc = r; });
    const birakBtn = c.h('button', { class: 'btn pulse', onclick: () => birak() }, 'Bilyeyi bırak ›');
    const yazBtn = c.h('button', { class: 'btn pulse', onclick: () => yaz() }, 'Tabloya yaz ›');
    const devamBtn = c.h('button', { class: 'btn pulse', onclick: () => { if (!mesgul) devamAc(); } }, 'Devam ›');
    const opts = c.h('div', { class: 'opts' });
    const sivBtn = SIV.map(([a], i) => {
      const b = c.h('button', { class: 'opt', html: a });
      b.addEventListener('click', () => { sv = i; sl.set(0); });
      opts.appendChild(b); return b;
    });
    c.panel('Dene', c.h('p', { class: 'q', html: 'Sıvı' }), opts);
    const nb = c.h('div');
    const not = (tur, html) => { nb.className = 'fb ' + tur; nb.innerHTML = html; };
    const guncelle = () => {
      sivBtn.forEach((b, i) => { b.style.borderColor = i === sv ? 'var(--c5)' : ''; b.style.fontWeight = i === sv ? '700' : ''; });
      ad.textContent = SIV[sv][0]; T.ton(SIV[sv][1]); T.sicaklik(SIV[sv][2][sk]);
      T.konum(0); T.isaretSil(); sy.sifirla(); birakildi = false;
      if (yazBtn.parentNode) yazBtn.remove();
    };
    const sl = c.slider({
      tag: false, label: 'Sıcaklık', min: 0, max: 1, step: 1, value: 0, fmt: (v) => `${SIV[sv][2][v]} °C`,
      onInput: (v) => { sk = v; guncelle(); },
    });
    c.panel(null, nb);
    const sonuc = () => TUP[SONUC[sv][sk]];
    const no = () => SONUC[sv][sk];
    const birak = async () => {
      if (mesgul) return; mesgul = true;
      const t = sonuc();
      await par(T.birak(2800, t.dibe ? undefined : t.bolme, !!t.dibe), sy.git(2800));
      if (!t.dibe) await T.isaret(t.bolme, 350);
      birakildi = true; mesgul = false;
      if (!yazBtn.parentNode) c.act.insertBefore(yazBtn, birakBtn);
    };
    const yaz = async () => {
      if (mesgul || !birakildi) return;
      const n = no();
      if (yazilan.has(n)) not('info', 'Bu tüp tabloda var. Önce sıvıyı ya da sıcaklığı değiştir.');
      else { yazilan.add(n); mesgul = true; await tab.satirEkle(satirDe(n)); mesgul = false; not('ok', `Tüp ${n} tabloya yazıldı.`); }
      if (!devamBtn.parentNode) c.act.insertBefore(devamBtn, c.act.querySelector('button.btn'));
    };
    c.act.appendChild(birakBtn);
    guncelle();
    await devamP;
    c.clearAct();
    // Eksik kalan IV ve V satırlarını tahta kendisi doldurur.
    let eksik = 0;
    for (const [s, k] of [[0, 1], [1, 0]]) {
      if (yazilan.has(SONUC[s][k])) continue;
      eksik++; sv = s; sk = k; ad.textContent = SIV[s][0]; T.ton(SIV[s][1]); T.sicaklik(SIV[s][2][k]); T.konum(0); T.isaretSil(); sy.sifirla();
      const t = TUP[SONUC[s][k]];
      await par(T.birak(2000, t.dibe ? undefined : t.bolme, !!t.dibe), sy.git(2000));
      if (!t.dibe) await T.isaret(t.bolme, 300);
      yazilan.add(SONUC[s][k]); await tab.satirEkle(satirDe(SONUC[s][k]));
    }
    if (eksik) await c.say('Eksik kalan ölçümler de tabloya yazıldı.');
    else c.clearSay();

    // Gör: tablo tamamlanır; yol–sıcaklık grafiği.
    await belir(c, [T.g, ad, sy.g, olcek, cer, tab.g], 450, 0);
    const G = yolGrafik(c, svg, {
      x: 200, y: 70, w: 640, h: 290, legendX: 190, legendW: 270, legendY: 490,
      seriler: [
        { ad: 'propil alkol', sim: 'daire', noktalar: [[25, 14], [30, null]] },
        { ad: 'propilen glikol', sim: 'kare', noktalar: [[15, 4], [25, 8]] },
        { ad: 'gliserin', sim: 'ucgen', noktalar: [[25, 2], [60, 8]] },
      ],
    });
    const halka = G.halka(30, null);
    await par(c.say('Üç sıvıda da sıcaklık arttıkça bilyenin yolu arttı.'), (async () => { for (let i = 0; i < 3; i++) { await G.goster(i, 600); await c.wait(250); } })());
    await par(c.say('Propil alkolde bilye 30 °C’ta dibe ulaştı.', { speak: 'Propil alkolde bilye otuz derecede dibe ulaştı.' }), belir(c, halka, 400, 1));
    await c.choice({
      tag: 'Sıra sende', q: 'Grafiğe göre hangi sonuç çıkar?',
      options: ['Sıcaklık yalnızca gliserinde etkili oldu', 'Sıcaklık arttıkça üç sıvıda da akışkanlık arttı', 'Sıcaklık arttıkça üç sıvıda da akışkanlık azaldı'], answer: 1,
      hints: ['Her sıvının iki satırını karşılaştır.', '', 'Sıcaklık yüksek olan satırda yol uzun mu, kısa mı?'],
      right: 'Evet. Sıcaklık arttıkça üç sıvıda da bilyenin yolu arttı.',
    });
    await c.say('Sıcaklık arttıkça sıvılar daha kolay akıyor.');
  }

  /* ---- 7. Neden: ısınınca etkileşim zayıflar ---- */
  async function neden(c) {
    const svg = c.svg(1000, 562), XL = 60, XR = 590;
    const A = kayma(c, svg, { x: XL, y: 110, w: 310, h: 200, bag: 3, hiz: 'yavas', guc: 'guclu' }), B = kayma(c, svg, { x: XR, y: 110, w: 310, h: 200, bag: 3, hiz: 'hizli', guc: 'zayif' });
    const bas = c.S('g', {}, svg);
    sb(c, bas, XL + 155, 90, '25', '°C', { size: 32, kalin: 700, brenk: RENK.yazi, bsize: 26, dx: 4 }); sb(c, bas, XR + 155, 90, '60', '°C', { size: 32, kalin: 700, brenk: RENK.yazi, bsize: 26, dx: 4 });
    const vz = c.S('g', {}, svg);
    yazi(c, vz, XL + 155, 336, 'viskozite büyük', { size: 26, kalin: 700, renk: RENK.vurgu }); yazi(c, vz, XR + 155, 336, 'viskozite küçük', { size: 26, kalin: 700, renk: RENK.vurgu });
    // Zift: ısıtılan kazan ve dökülen koyu sıvı. Reçel: sıcak doldurulan kavanoz.
    const zift = c.S('g', {}, svg), recel = c.S('g', {}, svg), ZX = 215, RX = 745;
    c.S('path', { d: `M${ZX - 55},400 L${ZX + 55},400 L${ZX + 45},452 L${ZX - 45},452 Z`, fill: GRI.koyu, stroke: GRI.cam, 'stroke-width': 3, 'stroke-linejoin': 'round' }, zift);
    c.S('ellipse', { cx: ZX, cy: 400, rx: 55, ry: 8, fill: '#3b4160' }, zift);
    cizgi(c, zift, [ZX + 55, 408], [ZX + 82, 392], GRI.koyu, 6);
    cizgi(c, zift, [ZX + 82, 392], [ZX + 82, 470], '#3b4160', 8);
    [-25, 0, 25].forEach((d) => c.S('path', { d: `M${ZX + d},392 q8,-12 0,-24 q-8,-12 0,-24`, fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round' }, zift));
    yazi(c, zift, ZX, 505, 'zift', { size: 26, kalin: 700 });
    c.S('rect', { x: RX - 40, y: 410, width: 80, height: 62, rx: 10, fill: '#c9a9b6', 'fill-opacity': 0.92, stroke: GRI.cam, 'stroke-width': 3 }, recel);
    c.S('rect', { x: RX - 44, y: 396, width: 88, height: 16, rx: 4, fill: GRI.alt }, recel);
    [-18, 8, 28].forEach((d) => c.S('path', { d: `M${RX + d},388 q8,-12 0,-24 q-8,-12 0,-24`, fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round' }, recel));
    yazi(c, recel, RX, 505, 'reçel', { size: 26, kalin: 700 });
    gizle(A.g, B.g, bas, vz, zift, recel);

    await par(c.say('Sıvı ısındıkça moleküller arası etkileşim kuvvetleri zayıflar.'), belir(c, [A.g, B.g, bas], 700));
    await par(c.say('Moleküller birbirinin üzerinden daha kolay kayar.'), A.kay(3000), B.kay(3000));
    await par(c.say('Akışkanlık artar, viskozite azalır.'), belir(c, vz, 600));
    await par(c.say('Asfalt dökülürken zift ısıtılır: viskozitesi azalır.'), belir(c, zift, 600));
    await par(c.say('Reçel de kavanoza sıcak doldurulur.'), belir(c, recel, 600));
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Buzdolabından yeni çıkan bal ile ılık bal kaşıktan akıtılıyor. Hangisi daha yavaş akar?',
      options: ['Ilık olan', 'İkisi aynı hızda akar', 'Buzdolabından çıkan'], answer: 2,
      hints: ['Soğuyan sıvıda etkileşim ne olur?', 'Sıcaklık farklı; akışkanlık da farklı olur.', ''],
      right: 'Evet. Soğuyan sıvıda etkileşim büyür.',
    });

    // Gör: iki bal kesiti.
    await belir(c, svg, 400, 0); svg.remove();
    const s2 = c.svg(1000, 562);
    const SB = kayma(c, s2, { x: XL, y: 130, w: 310, h: 200, bag: 3, hiz: 'yavas', guc: 'guclu' }), IB = kayma(c, s2, { x: XR, y: 130, w: 310, h: 200, bag: 3, hiz: 'hizli', guc: 'zayif' });
    const t2 = c.S('g', {}, s2);
    yazi(c, t2, XL + 155, 108, 'soğuk bal', { size: 32, kalin: 700 }); yazi(c, t2, XR + 155, 108, 'ılık bal', { size: 32, kalin: 700 });
    gizle(SB.g, IB.g, t2);
    await belir(c, [SB.g, IB.g, t2], 500);
    await par(c.say('Soğuk balda etkileşim güçlüdür; ılık balda zayıftır.'), SB.kay(3000), IB.kay(3000));
    c.note('<b>Sıcaklık arttıkça akışkanlık artar, viskozite azalır.</b><br>Örnek: sıcak bal.', 'Sıcaklık ve akışkanlık', 'sicaklik-akiskanlik');
  }

  /* ---- 8. İki etki yan yana ---- */
  async function ikiEtki(c) {
    const svg = c.svg(1000, 562);
    const I = tup(c, svg, { x: 130, y: 90, k: 0.95, ton: TUP.I.ton, sic: 25, bolme: 7, etiket: ['I', 'propil alkol'], esize: 24 });
    const VI = tup(c, svg, { x: 420, y: 90, k: 0.95, ton: TUP.VI.ton, sic: 60, bolme: 4, etiket: ['VI', 'gliserin'], esize: 24 });
    const soru = yazi(c, svg, 290, 290, '?', { size: 72, kalin: 700, renk: RENK.vurgu });
    const sy = sayac(c, svg, 280, 480, { size: 36 });
    const satirlar = c.S('g', {}, svg);
    const sat = (y, ad, sic, b) => { const t = yazi(c, satirlar, 560, y, '', { hiza: 'start', size: 28, kalin: 600 }); c.S('tspan', { text: ad + ', ' }, t); c.S('tspan', { text: String(sic) }, t); c.S('tspan', { text: '°C:', dx: 3 }, t); c.S('tspan', { text: String(b), dx: 8, style: 'fill:' + RENK.vurgu, 'font-weight': 700 }, t); c.S('tspan', { text: 'bölme', dx: 6 }, t); return t; };
    const s1 = sat(180, 'gliserin', 25, 1), s2 = sat(240, 'gliserin', 60, 4), s3 = sat(300, 'propil alkol', 25, 7);
    gizle(I.g, VI.g, soru, sy.g, s1, s2, s3);
    await belir(c, [I.g, VI.g, soru], 600);

    await par(c.say('Gliserin 25 °C’ta bir, 60 °C’ta dört bölme indi.', { speak: 'Gliserin yirmi beş derecede bir, altmış derecede dört bölme indi.' }), belir(c, [s1, s2], 600));
    await par(c.say('Propil alkolde bilye, 25 °C’ta yedi bölme indi.', { speak: 'Propil alkolde bilye, yirmi beş derecede yedi bölme indi.' }), belir(c, s3, 600));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Isıtılmış gliserin (60 °C) ile soğuk propil alkol (25 °C) karşılaştırılıyor. Bilye 10 saniyede hangisinde daha çok iner?',
      options: ['Gliserinde', 'İkisinde aynı kadar', 'Propil alkolde'], answer: 2,
      hints: ['Isınma gliserinin yolunu artırdı; ama ne kadar?', 'Yazılı iki yolu karşılaştır: aynı değiller.', ''],
      right: 'Evet. Propil alkolde bilye daha çok iner.',
    });
    await par(c.say('Bilyeleri bırakalım; iki yol yan yana.', { speak: 'Bilyeleri bırakalım; iki yol yan yana.' }), belir(c, sy.g, 300), I.birak(3600), VI.birak(3600), sy.git(3600));
    await par(c.say('Isınan gliserin kolay akıyor; ama propil alkole yetişemedi.'), I.isaret(7), VI.isaret(4));
    await c.say('Gliserindeki hidrojen bağı fazlalığı 60 °C’ta da fark yaratıyor.', { speak: 'Gliserindeki hidrojen bağı fazlalığı altmış derecede de fark yaratıyor.' });
  }

  Ders.start({
    id: 'cesitlilik-k2', kicker: 'Konu K · Viskozite', title: 'Sıcaklık ve viskozite: ısınınca sıvı daha kolay akar', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Sıcaklık ve viskozite',
      hook: 'Buzdolabından çıkan bal ile ılık bal kaşıktan aynı hızda mı akar?',
      button: 'Derse başla ›',
    },
    goals: ['Bilyenin yolundan sıvıların akışkanlığını karşılaştırır.', 'Sıcaklığın etkisini bulmak için tek değişkeni değiştirir.', 'Sıcaklık arttıkça akışkanlığın arttığını, viskozitenin azaldığını etkileşimle açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Viskozite ile akışkanlığı ve sıcaklığın buhar basıncına etkisini hatırla.', run: hatirla },
      { title: 'Bilye ile akışkanlık ölçmek', goal: 'Bilyenin yolundan akışkanlığı okumayı öğren.', run: bilye },
      { title: 'Üç sıvı, 25 °C', goal: 'Üç sıvıda bilyenin yolunu OH sayısıyla ilişkilendir.', run: ucSivi },
      { title: 'Aynı gliserini ısıtırsak', goal: 'Sıcaklığı tek değişken olarak değiştirip sonucu gör.', run: isitma },
      { title: 'Hangi iki tüpü karşılaştırmalı?', goal: 'Sıcaklığın ve sıvı türünün etkisi için doğru tüpleri seç.', run: karsilastir },
      { title: 'Sıvıyı ve sıcaklığı seç', goal: 'Sıvı ve sıcaklık seçip tabloyu ve grafiği tamamla.', run: sec },
      { title: 'Neden: ısınınca etkileşim zayıflar', goal: 'Sıcaklığın etkisini moleküller arası etkileşimle açıkla.', run: neden },
      { title: 'İki etki yan yana', goal: 'Sıvı türünün ve sıcaklığın etkisini birlikte oku.', run: ikiEtki },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Sıcaklık arttıkça sıvının akışkanlığı ve viskozitesi nasıl değişir?',
        options: ['Akışkanlık azalır, viskozite artar', 'İkisi de artar', 'Akışkanlık artar, viskozite azalır'], answer: 2,
        why: ['Bu, soğumada olan değişimdir; ısınınca etkileşim zayıflar ve sıvı kolay akar.', 'Akışkanlık ile viskozite her zaman ters yönde değişir.', 'Isınınca moleküller kolay kayar; akışkanlık artar, viskozite azalır.'], scene: 5 },
      { q: 'Bir sıvı ısıtılıyor. Viskozitesi için hangisi doğrudur?',
        options: ['Azalır; moleküller arası etkileşim zayıflar', 'Artar; sıvı koyulaşır', 'Değişmez; sıcaklık etkileşimi etkilemez'], answer: 0,
        why: ['Isınınca etkileşim zayıflar, moleküller kolay kayar; viskozite azalır.', 'Isınan sıvı koyulaşmaz; daha kolay akar.', 'Sıcaklık etkileşimi zayıflatır; viskozite değişir.'], scene: 6 },
      { q: 'Bir öğrenci zeytinyağının viskozitesini azaltmak istiyor. Ne yapmalıdır?',
        options: ['Soğutmalıdır', 'Isıtmalıdır', 'Aynı sıcaklıkta bekletmelidir'], answer: 1,
        why: ['Soğuyan sıvıda etkileşim büyür; viskozite artar.', 'Isınan sıvıda etkileşim zayıflar; viskozite azalır.', 'Sıcaklık değişmezse viskozite de değişmez.'], scene: 6 },
      { q: 'Bir cilt serumunun etiketinde “buzdolabında saklamayın” yazıyor. Serum soğuyunca ne olur?',
        options: ['Viskozitesi azalır; daha kolay akar', 'Viskozitesi değişmez', 'Viskozitesi artar; daha zor akar'], answer: 2,
        why: ['Isınınca viskozite azalır; soğuyunca artar.', 'Sıcaklık değişince viskozite de değişir.', 'Soğuyunca etkileşim büyür, moleküller zor kayar; serum zor akar.'], scene: 6 },
      { q: 'Üç tüp var: P (X sıvısı, soğuk), Q (X sıvısı, sıcak), R (Y sıvısı, soğuk). Sıcaklığın etkisini hangi iki tüp gösterir?',
        options: ['P ve R', 'Q ve R', 'P ve Q'], answer: 2,
        why: ['P ve R’de sıvı farklı, sıcaklık aynı; bu çift sıvı türünün etkisini gösterir.', 'Q ve R’de hem sıvı hem sıcaklık farklı; etkiyi ayıramazsın.', 'P ve Q’da sıvı aynı, yalnızca sıcaklık farklı; tek değişken değişir.'], scene: 4 },
    ],
    summary: [
      'Bilyenin yolu büyükse akışkanlık büyüktür.',
      'Tek değişkeni değiştirip ötekileri sabit tutarız.',
      'Sıcaklık arttıkça etkileşim zayıflar, viskozite azalır.',
      '<b>Sıvı ısındıkça daha kolay akar.</b>',
    ],
    nextLesson: { href: 'k3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
