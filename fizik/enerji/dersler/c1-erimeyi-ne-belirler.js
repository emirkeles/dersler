/* C1 — Erimeyi ne belirler?
   Hâl değiştirme sıcaklığındaki madde ısı almadan hâl değiştirmez; gereken ısı kütleye ve maddenin cinsine bağlıdır.
   Senaryo: plan/fizik/enerji/senaryolar/C-hal-degisimi.md (C1). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Benzetim sayıları senaryonun örnek veri tablosundandır (ısıtıcı saniyede 200 J). Bal mumunun sıcaklığı tahtaya yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, tablo, sinifla, onay, cubuk: yatayCubuk } = window.KIT;
  const { kap, cubuk: icCubuk, isiOku } = window.KIT_A;
  const { kutleEtiketi, isiSayaci, sicaklikEtiketi, sureEtiketi, bin } = window.KIT_C;
  const { lerp, ease } = Ders;
  const KAD = ISITMA.kadraj;
  const ISI = RENK.isi, KUTLE = RENK.kutle;
  const BUZ = '#a9d4ff', BUZ_KENAR = '#e6f3ff';

  /* ---- yerel yardımcılar ---- */
  /* Güneş, buz küpü ve buzul (sahne 2 ve 9). */
  function manzara(c, p) {
    const g = c.S('g', {}, p), gunes = c.S('g', {}, g), kup = c.S('g', {}, g), buzul = c.S('g', {}, g);
    c.S('circle', { cx: 500, cy: 80, r: 34, fill: '#ffd25e' }, gunes);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      cizgi(c, gunes, [500 + 46 * Math.cos(a), 80 + 46 * Math.sin(a)], [500 + 68 * Math.cos(a), 80 + 68 * Math.sin(a)], '#ffd25e', 5);
    }
    c.S('rect', { x: 140, y: 250, width: 110, height: 110, rx: 8, fill: BUZ, stroke: BUZ_KENAR, 'stroke-width': 3 }, kup);
    yazi(c, kup, 195, 405, 'buz küpü', { size: 26 });
    c.S('path', { d: 'M470,360 L500,262 L555,214 L615,240 L680,170 L760,222 L820,196 L880,270 L880,360 Z', fill: '#d8ecff', stroke: '#8fb8ee', 'stroke-width': 3, 'stroke-linejoin': 'round' }, buzul);
    yazi(c, buzul, 675, 405, 'buzul', { size: 26 });
    gunes.style.opacity = 1;
    return { g, gunes, kup, buzul };
  }
  /* Turkuaz kütle karesi: (x, y) sol üst köşe. */
  function kare(c, p, x, y, metin, h = 80) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: 80, height: h, rx: 8, fill: KUTLE, 'fill-opacity': 0.22, stroke: KUTLE, 'stroke-width': 3 }, g);
    yazi(c, g, x + 40, y + h / 2 + 8, metin, { size: 24, kalin: 700 });
    return g;
  }
  /* Kayıt tablosu: figürün sağındaki sütun (x 610–985); sütunlar en uzun hücreye göre. */
  function kayit(c, p, y, satir) {
    const tb = tablo(c, p, { x: 610, y, satir, h: 52, size: 24, sutunlar: [{ ad: 'Madde', w: 120 }, { ad: 'Kütle', w: 95 }, { ad: 'Gereken ısı', w: 160 }] });
    gizle(tb.g);
    return tb;
  }
  const satirYaz = (tb, i, m, k, q) => { tb.yaz(i, 0, m); tb.yaz(i, 1, k); tb.yaz(i, 2, q); };
  /* Ayar yardımcısı: iki istasyonun ortak başlangıcı. */
  const BUZ_AYAR = (seviye) => ({ icerik: 'buz', seviye, sicaklik: 0, alev: 0, kati: 1 });
  const seviyeOf = (g) => 0.05 + 0.2 * g / 100;
  /* Alev kapanması (300 ms, in) için t anına göre değer. */
  const alevKapan = (ms, bas) => (ms < bas ? 2 : lerp(2, 0, ease.in(Math.min(1, (ms - bas) / 300))));

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    c.S('rect', { x: 250, y: 220, width: 140, height: 90, rx: 8, fill: '#c9794a', stroke: '#e8b08a', 'stroke-width': 3 }, g1);
    c.S('rect', { x: 520, y: 220, width: 280, height: 90, rx: 8, fill: '#c9794a', stroke: '#e8b08a', 'stroke-width': 3 }, g1);
    yazi(c, g1, 320, 352, 'm', { size: 30, kalin: 700, renk: KUTLE });
    yazi(c, g1, 660, 352, '2m', { size: 30, kalin: 700, renk: KUTLE });
    const isi1 = c.S('g', {}, g1), isi2 = c.S('g', {}, g1);
    const b1 = yatayCubuk(c, isi1, 250, 420, ISI, { h: 24 }), b2 = yatayCubuk(c, isi2, 520, 420, ISI, { h: 24 });
    yazi(c, isi1, 232, 428, 'ısı', { size: 24, kalin: 700, renk: ISI, hiza: 'end' });
    yazi(c, isi2, 502, 428, 'ısı', { size: 24, kalin: 700, renk: ISI, hiza: 'end' });
    gizle(g1, isi1, isi2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Aynı maddeden bir cismin kütlesi iki katına çıkıyor. Sıcaklığı aynı kadar artırmak için gereken ısı ne olur?',
      options: ['Yarıya iner', 'İki katına çıkar', 'Değişmez'], answer: 1,
      hints: ['Q = m · c · ΔT: kütle iki katına çıkınca ısı da iki katına çıkar.', '', 'Q = m · c · ΔT: kütle iki katına çıkınca ısı da iki katına çıkar.'],
      right: 'Evet. Kütle iki katına çıkınca ısı da iki katına çıkar.',
    });
    belir(c, [isi1, isi2], 300); // çubuklar kendi boyuna gelirken altyazı yazılır
    await par(c.say('Kütle iki katına çıkınca gereken ısı da iki katına çıkar.'),
      c.tween(700, (e) => { b1.boy(70 * e); b2.boy(140 * e); }, ease.out));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 400, y: 120, su: 110 });
    const ic = icCubuk(c, g2, { x: 330, y: 420, boy: 120 });
    yazi(c, g2, 316, 428, 'iç enerji', { size: 24, kalin: 600, renk: RENK.soluk, hiza: 'end' });
    const ok2 = isiOku(c, g2, [225, 215], [392, 215]);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Hatırla', q: 'Isı alan maddenin iç enerjisi nasıl değişir?',
      options: ['Azalır', 'Değişmez', 'Artar'], answer: 2,
      hints: ['Isı alan maddenin iç enerjisi artar; ısı verenin azalır.', 'Isı alan maddenin iç enerjisi artar; ısı verenin azalır.', ''],
      right: 'Evet. Isı alan maddenin iç enerjisi artar.',
    });
    await belir(c, ok2.g, 350);
    await par(c.say('Isı alan maddenin iç enerjisi artar.'), ic.git(c, 200, 800));
    await c.say('Bugün bir maddenin hâl değiştirmesi için ne kadar ısı gerektiğine bakacağız.');
  }

  /* ---- 2. Buz küpü ve buzul ---- */
  async function buzulSahnesi(c) {
    const svg = c.svg(1000, 562);
    const m = manzara(c, svg);
    gizle(m.gunes, m.kup, m.buzul);
    await par(c.say('Güneşin altında bir buz küpü dakikalar içinde erir.'), belir(c, [m.gunes, m.kup], 450));
    await par(c.say('Aynı güneşin altındaki buzul yıllarca dayanır.'), belir(c, m.buzul, 450));
    await c.say('Dünyanın ortalama sıcaklığı arttıkça buzullar eriyor.');
    await c.say('Erimek için maddeye ısı verilmesi gerekir.');
    await c.say('Buz küpü ile buzul arasındaki fark ne olabilir?');
    await c.choice({
      tag: 'Tahmin et', q: 'Buzulun tamamı erirken, buz küpünün tamamı erirken aldığından …… ısı alır.',
      options: ['çok daha fazla', 'çok daha az', 'aynı miktarda'], answer: 0,
      hints: ['', 'Buzulun büyüklüğünü buz küpününkiyle karşılaştır.', 'Erimek için ısı gerekir; çok madde varsa ısı da çok gerekir mi?'],
      right: 'Evet. Çok maddeyi eritmek için çok ısı gerekir.',
    });
    await par(c.say('Bunu Ela’nın deneyiyle sınayalım.'), belir(c, m.gunes, 400, 0.3));
  }

  /* ---- 3. Erime sıcaklığındaki buz ısı almadan erimez ---- */
  async function isisiz(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 420 });
    f.goster('sag', 0);
    f.ayar('sol', BUZ_AYAR(0.25));
    f.sure(0);
    f.bak(KAD.sol);
    const L = c.S('g', {}, svg);
    const kut = kutleEtiketi(c, L, f, 'sol', '100 g buz', { sabit: [797, 165] }), say = isiSayaci(c, L, f, 'sol', { sabit: [797, 220] });
    const sic = sicaklikEtiketi(c, L, f, 'sol.termometre'), sure = sureEtiketi(c, L, f, { sabit: [797, 275] });
    sic.guncelle(0);
    const tb = kayit(c, svg, 335, 1);
    satirYaz(tb, 0, 'buz', '100 g', '33.400 J');
    gizle(f.el, kut.g, say.g, sic.g, sure.g);

    await par(c.say('Ela 100 g buzu bir behere koyuyor.', { speak: 'Ela yüz gram buzu bir behere koyuyor.' }), belir(c, [f.el, kut.g], 450));
    await par(c.say('Buz erime sıcaklığında; termometre 0 °C gösteriyor.', { speak: 'Buz erime sıcaklığında; termometre sıfır derece gösteriyor.' }), belir(c, sic.g, 400));
    await par(c.say('Isıtıcı kapalıyken buza ısı girmiyor.'), belir(c, [say.g, sure.g], 400));
    await c.say('Buz olduğu gibi duruyor; hiçbir parçası erimiyor.');
    await c.wait(1200);
    await par(c.say('Ela ısıtıcıyı açıyor: saniyede 200 joule veriyor.', { speak: 'Ela ısıtıcıyı açıyor: saniyede iki yüz jul veriyor.' }),
      c.tween(300, (e) => f.ayar('sol', { alev: 2 * e }), ease.out));
    await par(c.say('Isı girdikçe sayaç ilerliyor, buz azalıyor.'),
      c.tween(5000, (e) => {
        f.ayar('sol', { kati: 1 - e }); f.sure(167 * e); sure.yaz(167 * e); say.yaz(33400 * e); sic.guncelle(0);
      }, ease.linear));
    await c.tween(300, (e) => f.ayar('sol', { alev: 2 * (1 - e) }), ease.in);
    await par(c.say('Buzun tamamı 167 saniyede erimiş oldu.', { speak: 'Buzun tamamı yüz altmış yedi saniyede erimiş oldu.' }));
    await c.say('100 g buzu eritmek için 33.400 joule gerekti.', { speak: 'Yüz gram buzu eritmek için otuz üç bin dört yüz jul gerekti.' });
    await c.say('Termometre hep 0 °C’ta kaldı; nedenini sonraki derste göreceğiz.', { speak: 'Termometre hep sıfır derecede kaldı; nedenini sonraki derste göreceğiz.' });
    await belir(c, tb.g, 300);
    await tb.goster(0, 400);

    // Sor: ısıtıcı kapalı, taze buz.
    c.clearSay();
    await c.tween(500, (e) => { f.ayar('sol', { kati: e }); f.sure(167 * (1 - e)); sure.yaz(167 * (1 - e)); say.yaz(33400 * (1 - e)); }, ease.inOut);
    await c.choice({
      tag: 'Sor', q: 'Ela erime sıcaklığındaki bir buz parçasına hiç ısı vermiyor. Ne olur?',
      options: ['Buz yavaş yavaş erir', 'Buzun sıcaklığı yükselir', 'Buz olduğu gibi kalır'], answer: 2,
      hints: ['Erimesi için buza ısı girmesi gerekir; burada giren ısı var mı?', 'Isıtıcı kapalıyken sayaç 0 J’da duruyordu; buz da yerindeydi.', ''],
      right: 'Evet. Isı girmeyen buz olduğu gibi kalır.',
    });
    await c.say('Isı girmedikçe buz olduğu gibi durur.');
    c.note('Erime sıcaklığındaki buz, ısı almadan erimez.', 'Erime için ısı');
  }

  /* ---- 4. Kütle: iki kat buz, iki kat ısı ---- */
  async function kutle(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', BUZ_AYAR(0.25)); f.ayar('sag', BUZ_AYAR(0.45));
    f.sure(0);
    const L = c.S('g', {}, svg);
    const kS = kutleEtiketi(c, L, f, 'sol', '100 g buz'), kG = kutleEtiketi(c, L, f, 'sag', '200 g buz');
    const sS = isiSayaci(c, L, f, 'sol'), sG = isiSayaci(c, L, f, 'sag');
    const tS = sicaklikEtiketi(c, L, f, 'sol.termometre'), tG = sicaklikEtiketi(c, L, f, 'sag.termometre');
    tS.guncelle(0); tG.guncelle(0);
    const sure = sureEtiketi(c, L, f);
    const tb = kayit(c, svg, 120, 2);
    satirYaz(tb, 0, 'buz', '100 g', '33.400 J'); satirYaz(tb, 1, 'buz', '200 g', '66.800 J');
    tb.goster(0, 0);
    const ornek = c.S('g', {}, svg);
    gizle(f.el, L, tb.g, ornek);
    f.el.style.opacity = 0; L.style.opacity = 0;

    await par(c.say('Ela şimdi iki beherle çalışıyor: 100 g ve 200 g buz.', { speak: 'Ela şimdi iki beherle çalışıyor: yüz gram ve iki yüz gram buz.' }), belir(c, [f.el, L, tb.g], 450));
    await c.say('İkisi de erime sıcaklığında.');
    await c.say('Isıtıcılar özdeş; saniyede aynı ısıyı veriyorlar.');
    await c.choice({
      tag: 'Tahmin et', q: 'Hangi beherdeki buz önce tamamen erir?',
      options: ['200 g olan', '100 g olan', 'İkisi aynı anda'], answer: 1,
      hints: ['Büyük buzu eritmek için daha çok ısı gerekir mi?', '', 'Sayaçlar aynı hızla ilerleyecek; hangi buzun daha az ısıya ihtiyacı var?'],
      right: 'Evet. Küçük buzun ihtiyacı olan ısı daha azdır.',
    });
    c.clearSay();
    await c.tween(300, (e) => { f.ayar('sol', { alev: 2 * e }); f.ayar('sag', { alev: 2 * e }); }, ease.out);
    await c.tween(8000, (e) => {
      const t = e * 8000, a = Math.min(1, t / 4000);
      f.ayar('sol', { kati: 1 - a, alev: alevKapan(t, 4000) });
      f.ayar('sag', { kati: 1 - e });
      f.sure(334 * e); sure.yaz(334 * e); sS.yaz(33400 * a); sG.yaz(66800 * e);
      tS.guncelle(0); tG.guncelle(0);
    }, ease.linear);
    await c.tween(300, (e) => f.ayar('sag', { alev: 2 * (1 - e) }), ease.in);
    await c.say('100 g buz 167 saniyede eridi; sayaç 33.400 J’da durdu.', { speak: 'Yüz gram buz yüz altmış yedi saniyede eridi; sayaç otuz üç bin dört yüz julde durdu.' });
    await c.say('200 g buz 334 saniye sürdü; sayaç 66.800 J oldu.', { speak: 'İki yüz gram buz üç yüz otuz dört saniye sürdü; sayaç altmış altı bin sekiz yüz jul oldu.' });
    await par(c.say('Kütle iki katına çıkınca gereken ısı da iki katına çıktı.'), (async () => {
      await par(belir(c, f.el, 350, 0.35), belir(c, L, 350, 0));
      await belir(c, tb.g, 300); await tb.goster(1, 400);
    })());

    // Çözülmüş örnek: kareler gelir.
    c.clearSay();
    const k = [0, 1, 2].map((i) => kare(c, ornek, 610 + i * 100, 300, '100 g'));
    const form = yazi(c, ornek, 750, 430, '3 · 33.400 J', { size: 28, kalin: 700, renk: ISI });
    gizle(k, form);
    ornek.style.opacity = 1;
    await par(c.say('Üç tane 100 g’lık parça 300 g eder.', { speak: 'Üç tane yüz gramlık parça üç yüz gram eder.' }), (async () => { for (const q of k) { await belir(c, q, 300); } })());
    await par(c.say('Her parça 33.400 joule isterse, 300 g buz üç katı ister.', { speak: 'Her parça otuz üç bin dört yüz jul isterse, üç yüz gram buz üç katı ister.' }), belir(c, form, 400));

    // Birlikte çöz: bir tam kare, bir yarım kare.
    c.clearSay();
    await belir(c, ornek, 300, 0); ornek.textContent = '';
    const tam = kare(c, ornek, 610, 300, '100 g'), yarim = kare(c, ornek, 740, 340, '50 g', 40);
    const soru = yazi(c, ornek, 780, 322, '?', { size: 32, kalin: 700, renk: ISI });
    gizle(tam, yarim, soru);
    ornek.style.opacity = 1;
    await par(belir(c, [tam, yarim], 350), belir(c, soru, 350));
    await c.choice({
      tag: 'Birlikte çöz', q: '50 g buzu eritmek için gereken ısı, 100 g buzunkinin kaçta kaçıdır?',
      options: ['İki katı', 'Dörtte biri', 'Yarısı'], answer: 2,
      hints: ['Kütle küçülünce gereken ısı da küçülür.', '50 g, 100 g’ın yarısıdır; ısı da aynı oranda değişir.', ''],
      right: 'Evet. Kütle yarıya inince gereken ısı da yarıya iner.',
    });
    soru.textContent = 'yarısı'; soru.setAttribute('x', 780); soru.setAttribute('font-size', 26);
    await c.say('Yarı kütle, yarı ısı.');

    // Sor: 400 g.
    c.clearSay();
    await belir(c, [ornek, tb.g], 300, 0); ornek.textContent = '';
    const bir = kare(c, ornek, 610, 300, '100 g'), dort = [0, 1, 2, 3].map((i) => kare(c, ornek, 610 + i * 90, 410, '100 g'));
    const kat = yazi(c, ornek, 850, 360, '4 katı', { size: 32, kalin: 700, renk: RENK.iyi });
    gizle(bir, dort, kat);
    ornek.style.opacity = 1;
    await belir(c, bir, 350);
    await c.choice({
      tag: 'Sor', q: '400 g buzu eritmek için gereken ısı, 100 g buzunkinin kaç katıdır?',
      options: ['2 katı', '4 katı', '400 katı'], answer: 1,
      hints: ['400 g, 100 g’ın kaç katı?', '', 'Kütle kaç katına çıkarsa gereken ısı da o kadar katına çıkar.'],
      right: 'Evet. 400 g, 100 g’ın dört katıdır.',
    });
    await par(c.say('Dört kat kütle, dört kat ısı.'), belir(c, dort, 400));
    await belir(c, kat, 300);
    c.note('Kütle büyüdükçe erimek için gereken ısı da büyür.', 'Kütle');
  }

  /* ---- 5. Cins: buz ve bal mumu ---- */
  async function cins(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', BUZ_AYAR(0.25)); f.ayar('sag', { icerik: 'mum', seviye: 0.25, sicaklik: 40, alev: 0, kati: 1 });
    f.sure(0);
    const L = c.S('g', {}, svg);
    const kS = kutleEtiketi(c, L, f, 'sol', '100 g buz'), kG = kutleEtiketi(c, L, f, 'sag', '100 g bal mumu');
    const sS = isiSayaci(c, L, f, 'sol'), sG = isiSayaci(c, L, f, 'sag');
    const tS = sicaklikEtiketi(c, L, f, 'sol.termometre');
    tS.guncelle(0);
    const sure = sureEtiketi(c, L, f);
    const tb = kayit(c, svg, 120, 3);
    satirYaz(tb, 0, 'buz', '100 g', '33.400 J'); satirYaz(tb, 1, 'bal mumu', '100 g', '16.800 J'); satirYaz(tb, 2, 'bal mumu', '200 g', '33.600 J');
    tb.goster(0, 0);
    f.el.style.opacity = 0; L.style.opacity = 0; gizle(tb.g);

    await par(c.say('Şimdi aynı kütlede iki farklı madde var.'), belir(c, [f.el, L, tb.g], 450));
    await c.say('Biri 100 g buz, öteki 100 g bal mumu.', { speak: 'Biri yüz gram buz, öteki yüz gram bal mumu.' });
    await c.say('İkisi de erime sıcaklığında; ısıtıcılar özdeş.');
    await c.choice({
      tag: 'Tahmin et', q: 'Aynı ısıtıcıyla hangisi daha geç erir?',
      options: ['Buz', 'Bal mumu', 'İkisi aynı anda'], answer: 0,
      hints: ['', 'Hangi maddenin tamamını eritmek daha çok ısı ister?', 'Sayaçlar aynı hızla ilerler; daha çok ısı isteyen daha geç biter.'],
      right: 'Evet. Buzun tamamını eritmek daha çok ısı ister.',
    });
    c.clearSay();
    await c.tween(300, (e) => { f.ayar('sol', { alev: 2 * e }); f.ayar('sag', { alev: 2 * e }); }, ease.out);
    await c.tween(5000, (e) => {
      const t = e * 5000, a = Math.min(1, t / 2515);
      f.ayar('sag', { kati: 1 - a, alev: alevKapan(t, 2515) });
      f.ayar('sol', { kati: 1 - e });
      f.sure(167 * e); sure.yaz(167 * e); sG.yaz(16800 * a); sS.yaz(33400 * e); tS.guncelle(0);
    }, ease.linear);
    await c.tween(300, (e) => f.ayar('sol', { alev: 2 * (1 - e) }), ease.in);
    await c.say('Bal mumu 84 saniyede eridi: 16.800 joule.', { speak: 'Bal mumu seksen dört saniyede eridi: on altı bin sekiz yüz jul.' });
    await c.say('Buz 167 saniyede eridi: 33.400 joule.', { speak: 'Buz yüz altmış yedi saniyede eridi: otuz üç bin dört yüz jul.' });
    // Kayıt tablosu: figür söner, iki satır görünür.
    await par(c.say('Aynı kütlede buz, bal mumunun yaklaşık iki katı ısı istedi.'), (async () => {
      await par(belir(c, f.el, 350, 0.35), belir(c, L, 350, 0));
      await tb.goster(1, 400);
    })());
    await c.say('Gereken ısı maddenin cinsine de bağlıdır.');
    c.note('Aynı kütlede gereken ısı, maddenin cinsine göre değişir.', 'Cins');

    // Karşılaştırma: 100 g buz ve 200 g bal mumu.
    c.clearSay();
    await belir(c, tb.satirlar[1].g, 300, 0);
    f.ayar('sol', { kati: 1 }); f.ayar('sag', { kati: 1, seviye: 0.45 }); f.sure(0);
    sure.yaz(0); sS.yaz(0); sG.yaz(0); kG.yaz('200 g bal mumu'); tS.guncelle(0);
    await par(belir(c, f.el, 400), belir(c, L, 400));
    await c.say('Ela şimdi 100 g buzu 200 g bal mumuyla karşılaştırıyor.', { speak: 'Ela şimdi yüz gram buzu iki yüz gram bal mumuyla karşılaştırıyor.' });
    await c.say('Buzun bir gramı, bal mumunun yaklaşık iki gramı kadar ısı ister.');
    await c.choice({
      tag: 'Sor', q: 'Ela 100 g buzu eriten ısıyı bal mumuna veriyor. Bu ısıyla kaç gram bal mumu erir?',
      options: ['Yaklaşık 100 g', 'Yaklaşık 200 g', 'Yaklaşık 50 g'], answer: 1,
      hints: ['Buz, aynı kütlede bal mumunun iki katı ısı ister; verilen ısıyla kaç katı bal mumu erir?', '', 'Bal mumu daha az ısı istiyorsa aynı ısı daha çok bal mumunu eritir.'],
      right: 'Evet. Aynı ısı, buzun iki katı kadar bal mumunu eritir.',
    });
    c.clearSay();
    await c.tween(300, (e) => { f.ayar('sol', { alev: 2 * e }); f.ayar('sag', { alev: 2 * e }); }, ease.out);
    await c.tween(5000, (e) => {
      const t = e * 5000, a = Math.min(1, t / 4970);
      f.ayar('sol', { kati: 1 - a, alev: alevKapan(t, 4970) });
      f.ayar('sag', { kati: 1 - e });
      f.sure(168 * e); sure.yaz(168 * e); sS.yaz(33400 * a); sG.yaz(33600 * e); tS.guncelle(0);
    }, ease.linear);
    await c.tween(300, (e) => f.ayar('sag', { alev: 2 * (1 - e) }), ease.in);
    await par(c.say('Aynı ısı, 100 g buzu ya da 200 g bal mumunu eritir.', { speak: 'Aynı ısı, yüz gram buzu ya da iki yüz gram bal mumunu eritir.' }), (async () => {
      await par(belir(c, f.el, 400, 0.35), belir(c, L, 400, 0));
      await tb.goster(1, 300); await tb.goster(2, 400);
    })());
  }

  /* ---- 6. Başka iki etmen: saflık ve basınç ---- */
  async function etmenler(c) {
    const svg = c.svg(1000, 562);
    const solK = c.S('g', {}, svg), sagK = c.S('g', {}, svg);
    kutu(c, solK, 80, 120, 390, 300, { rx: 16, w: 3 });
    yazi(c, solK, 275, 168, 'saflık', { size: 30, kalin: 700 });
    c.S('rect', { x: 215, y: 240, width: 120, height: 80, rx: 10, fill: BUZ, stroke: BUZ_KENAR, 'stroke-width': 2 }, solK);
    const tuz = c.S('g', {}, solK);
    [[232, 252], [262, 262], [300, 250], [322, 276], [246, 292], [282, 300], [312, 308], [236, 312]].forEach((q) => c.S('circle', { cx: q[0], cy: q[1], r: 4, fill: '#ffffff' }, tuz));
    kutu(c, sagK, 530, 120, 390, 300, { rx: 16, w: 3 });
    yazi(c, sagK, 725, 168, 'basınç', { size: 30, kalin: 700 });
    c.S('rect', { x: 650, y: 245, width: 150, height: 100, rx: 10, fill: '#aab3c8', stroke: '#e1e6f5', 'stroke-width': 3 }, sagK);
    c.S('rect', { x: 656, y: 290, width: 138, height: 49, rx: 6, fill: RENK.soguk, 'fill-opacity': 0.55 }, sagK);
    c.S('rect', { x: 630, y: 268, width: 20, height: 14, rx: 5, fill: '#7b849c' }, sagK);
    c.S('rect', { x: 800, y: 268, width: 20, height: 14, rx: 5, fill: '#7b849c' }, sagK);
    c.S('rect', { x: 640, y: 223, width: 170, height: 22, rx: 8, fill: '#c3cbea', stroke: '#e1e6f5', 'stroke-width': 2 }, sagK);
    c.S('rect', { x: 717, y: 204, width: 16, height: 19, rx: 4, fill: '#7b849c' }, sagK);
    gizle(solK, sagK, tuz);

    await c.say('Hâl değişimini etkileyen iki etmen daha var.');
    await par(c.say('Saf maddeye başka bir madde karışırsa saflığı bozulur.'), belir(c, solK, 400));
    await par(c.say('Buzlu yola tuz atılınca buz daha düşük sıcaklıkta erir.'), belir(c, tuz, 500));
    await par(c.say('Maddenin üzerine etkiyen basınç da hâl değişimini etkiler.'), belir(c, sagK, 400));
    await c.say('Düdüklü tencerede basınç yüksektir; su daha yüksek sıcaklıkta kaynar.');
    await c.say('Saflık ve basınç, hâl değişim sıcaklığını değiştirir.');
    await c.say('Deneylerimizde madde saf, basınç da hep aynı olacak.');
    c.note('Saflık ve basınç, hâl değişim sıcaklığını değiştirir.', 'Saflık ve basınç');
  }

  /* ---- 7. Hangi etmen? ---- */
  const KARTLAR = [
    { ust: 'İri buz parçaları, küçük olanlara göre', alt: 'daha uzun süre erimeden kalır.', ad: 'iri buz', kutu: 0,
      neden: 'Evet. Büyük parçayı eritmek için daha çok ısı gerekir.', ipucu: 'Parçaların büyüklüğü, yani kütleleri farklı.' },
    { ust: 'Yeterince sıcak ortamda tereyağı, eşit', alt: 'kütledeki buzdan daha çabuk erir.', ad: 'tereyağı', kutu: 1,
      neden: 'Evet. Kütle eşit; madde farklı.', ipucu: 'İkisinin kütlesi eşit. Değişen şey ne?' },
    { ust: 'Kışın buzlu yollara', alt: 'tuz serpilir.', ad: 'yola tuz', kutu: 2,
      neden: 'Evet. Tuz buzun saflığını bozar, erime sıcaklığını düşürür.', ipucu: 'Buza başka bir madde karışıyor.' },
    { ust: 'Düdüklü tencerede su', alt: 'daha yüksek sıcaklıkta kaynar.', ad: 'düdüklü tencere', kutu: 3,
      neden: 'Evet. Düdüklü tencerenin içinde basınç yüksektir.', ipucu: 'Kapağı sıkıca kapalı tencerenin içinde ne artar?' },
  ];
  async function hangiEtmen(c) {
    const svg = c.svg(1000, 562);
    const AD = ['kütle', 'cins', 'saflık', 'basınç'], X = [40, 275, 510, 745];
    const ust = c.S('g', {}, svg), sahne = c.S('g', {}, svg), kutular = [];
    AD.forEach((ad, i) => {
      const g = c.S('g', {}, ust);
      kutu(c, g, X[i], 60, 215, 100, { rx: 12 });
      yazi(c, g, X[i] + 107, 98, ad, { size: 28, kalin: 700, renk: i === 0 ? KUTLE : RENK.yazi });
      kutular.push(g);
    });
    let kart = null, sayac = 0;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 250, 700, 130, { rx: 14 });
      yazi(c, kart, 500, 305, k.ust, { size: 26, kalin: 600 });
      yazi(c, kart, 500, 345, k.alt, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const el = kart;
      await c.tween(400, (e) => {
        const s = 1 - 0.4 * e;
        el.setAttribute('transform', `translate(${500 * (1 - s)},${315 * (1 - s)}) scale(${s})`); el.style.opacity = 1 - e;
      }, ease.in);
      el.remove();
      const ad = yazi(c, kutular[k.kutu], X[k.kutu] + 107, 140, k.ad, { size: 24, kalin: 600, renk: RENK.soluk });
      gizle(ad);
      await belir(c, ad, 300);
      sayac += 1;
    };
    gizle(ust);

    await par(c.say('Şimdi günlük hayattan dört olaya bakalım.'), belir(c, ust, 400));
    await c.say('Her olayda hâl değişimini etkileyen etmeni bul.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: AD, kartlar: KARTLAR,
      soru: () => 'Bu olayda hâl değişimini hangi etmen etkiliyor?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await par(c.say('Kütle ve cins, gereken ısıyı belirler.'), belir(c, ust, 450, 0.45));
    await c.say('Saflık ve basınç, hâl değişim sıcaklığını değiştirir.');
  }

  /* ---- 8. Dene: kütleyi ve maddeyi seç ---- */
  const VERI = { buz: { 100: [33400, 167], 200: [66800, 334], 300: [100200, 501], 400: [133600, 668] },
    mum: { 100: [16800, 84], 200: [33600, 168], 300: [50400, 252], 400: [67200, 336] } };
  const MADDE = ['buz', 'bal mumu'];
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 420 });
    f.goster('sag', 0);
    f.ayar('sol', BUZ_AYAR(0.25));
    f.bak(KAD.sol);
    const L = c.S('g', {}, svg);
    const sic = sicaklikEtiketi(c, L, f, 'sol.termometre');
    sic.guncelle(0);
    // sağ taraf: hedef satırı (üstte) ve seçilen satır (altta)
    const R = c.S('g', {}, svg), hedef = c.S('g', {}, R), simdi = c.S('g', {}, R);
    const hEt = yazi(c, hedef, 610, 150, '', { size: 24, kalin: 700, renk: KUTLE, hiza: 'start' });
    const hSayi = yazi(c, hedef, 985, 150, '', { size: 24, kalin: 700, renk: ISI, hiza: 'end' });
    const hBar = c.S('rect', { x: 610, y: 166, width: 0, height: 40, rx: 6, fill: ISI, 'fill-opacity': 0.5 }, hedef);
    const sEt = yazi(c, simdi, 610, 280, '', { size: 24, kalin: 700, renk: KUTLE, hiza: 'start' });
    const sSayi = yazi(c, simdi, 985, 280, '', { size: 24, kalin: 700, renk: ISI, hiza: 'end' });
    const sBar = c.S('rect', { x: 610, y: 296, width: 0, height: 40, rx: 6, fill: ISI }, simdi);
    const sSure = yazi(c, simdi, 610, 390, '', { size: 24, kalin: 600, renk: RENK.yazi, hiza: 'start' });
    const gec1 = yazi(c, R, 610, 450, 'Çubuk boyları', { size: 24, kalin: 600, renk: RENK.soluk, hiza: 'start' });
    const gec2 = yazi(c, R, 610, 482, 'yaklaşık aynı olmalı.', { size: 24, kalin: 600, renk: RENK.soluk, hiza: 'start' });
    const gec = c.S('g', {}, R); gec.append(gec1, gec2);
    const tik = onay(c, R, 955, 395);
    gizle(hedef, gec, tik);

    const st = { madde: 0, kutle: 100, sev: 0.25, tok: 0 };
    const uygula = (anlik) => {
      const mum = st.madde === 1, [Q, sn] = VERI[mum ? 'mum' : 'buz'][st.kutle], tok = ++st.tok;
      f.ayar('sol', { icerik: mum ? 'mum' : 'buz', sicaklik: mum ? 40 : 0, kati: 1 });
      sic.g.style.visibility = mum ? 'hidden' : 'visible';
      sEt.textContent = MADDE[st.madde] + ' ' + st.kutle + ' g'; sSayi.textContent = bin(Q) + ' J';
      sSure.textContent = 'gereken süre: ' + sn + ' sn';
      const s0 = st.sev, s1 = seviyeOf(st.kutle), w0 = +sBar.getAttribute('width'), w1 = Q / 400;
      st.sev = s1;
      if (anlik) { f.ayar('sol', { seviye: s1 }); sBar.setAttribute('width', w1); return; }
      c.tween(500, (e) => { if (tok !== st.tok) return; f.ayar('sol', { seviye: lerp(s0, s1, e) }); sBar.setAttribute('width', lerp(w0, w1, e)); }, ease.inOut);
    };
    uygula(true);
    gizle(simdi);

    const sM = c.slider({ label: 'Madde', min: 0, max: 1, step: 1, value: 0, fmt: (v) => MADDE[v], onInput: (v) => { st.madde = +v; uygula(); } });
    const sK = c.slider({ tag: false, label: 'Kütle', min: 100, max: 400, step: 100, value: 100, fmt: (v) => v + ' g', onInput: (v) => { st.kutle = +v; uygula(); } });
    const ayarla = (mad, kut2) => { sM.set(mad); sK.set(kut2); };
    const hedefKoy = () => {
      const mum = st.madde === 1, [Q] = VERI[mum ? 'mum' : 'buz'][st.kutle];
      hEt.textContent = MADDE[st.madde] + ' ' + st.kutle + ' g'; hSayi.textContent = bin(Q) + ' J'; hBar.setAttribute('width', Q / 400);
      return Q;
    };
    const yakin = (Q1) => { const mum = st.madde === 1, [Q2] = VERI[mum ? 'mum' : 'buz'][st.kutle]; return Math.abs(Q1 - Q2) <= 0.01 * Q1; };

    await par(c.say('Kütleyi ve maddeyi sen seç; gereken ısıyı çubuk gösterir.'), belir(c, [f.el, sic.g, simdi], 450));

    /* iki görev: [hedefin ayarı, doğru ayar, yönerge] */
    const gorevler = [
      { h: [1, 200], d: [0, 100], y: 'Önce bal mumuyla 200 g’ı seç.', ys: 'Önce bal mumuyla iki yüz gramı seç.', y2: 'Şimdi aynı çubuk boyunu buzla yakala.' },
      { h: [0, 200], d: [1, 400], y: 'Buzun 200 g çubuğuna yakın bal mumu ayarını bul.', ys: 'Buzun iki yüz gram çubuğuna yakın bal mumu ayarını bul.', y2: null },
    ];
    for (let gi = 0; gi < gorevler.length; gi++) {
      const gv = gorevler[gi];
      let Q1;
      if (gi === 0) {
        c.say(gv.y, { speak: gv.ys, noWait: true });
        await c.cont('Devam ›');
        ayarla(gv.h[0], gv.h[1]); Q1 = hedefKoy();
        await belir(c, hedef, 400);
        c.say(gv.y2, { noWait: true });
      } else {
        await belir(c, hedef, 300, 0);
        ayarla(gv.h[0], gv.h[1]); Q1 = hedefKoy();
        await belir(c, hedef, 400);
        c.say(gv.y, { speak: gv.ys, noWait: true });
      }
      ayarla(0, 100);
      await c.cont('Devam ›');
      if (!(gi === 0 ? st.madde === 0 : st.madde === 1) || !yakin(Q1)) {
        await belir(c, gec, 300);
        await c.cont('Devam ›');
        ayarla(gv.d[0], gv.d[1]);
        await belir(c, gec, 300, 0);
      }
      await par(belir(c, tik, 400), c.wait(900));
      if (gi < gorevler.length - 1) { c.clearSay(); await belir(c, tik, 250, 0); }
    }
    sM.remove(); sK.remove();
    await c.say('Buzun bir gramı, bal mumunun iki gramı kadar ısı istiyor.');
  }

  /* ---- 9. Buzula dönelim ---- */
  async function buzulaDon(c) {
    const svg = c.svg(1000, 562);
    const m = manzara(c, svg);
    const bk = c.S('g', {}, svg), bb = c.S('g', {}, svg);
    c.S('rect', { x: 140, y: 205, width: 50, height: 20, rx: 6, fill: ISI }, bk);
    yazi(c, bk, 202, 223, 'az ısı', { size: 24, kalin: 700, renk: ISI, hiza: 'start' });
    c.S('rect', { x: 530, y: 142, width: 350, height: 20, rx: 6, fill: ISI }, bb);
    yazi(c, bb, 705, 132, 'çok ısı', { size: 24, kalin: 700, renk: ISI });
    gizle(m.g, bk, bb);
    await belir(c, m.g, 500);
    await par(c.say('Buz küpünün kütlesi küçüktür; az ısıyla tamamen erir.'), belir(c, bk, 450));
    await par(c.say('Buzulun kütlesi çok büyüktür; erimesi için çok ısı gerekir.'), belir(c, bb, 450));
    await c.say('Bu yüzden buzul, aynı güneşin altında yıllarca dayanır.');
  }

  Ders.start({
    id: 'enerji-c1', kicker: 'Konu C · Hâl değişimi', title: 'Erimeyi ne belirler?', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Erimeyi ne belirler?',
      hook: 'Bir buz küpü dakikalar içinde erir; aynı güneşin altındaki buzul neden yıllarca dayanır?',
      button: 'Derse başla ›',
    },
    goals: ['Hâl değiştirme sıcaklığındaki maddenin ısı almadan hâl değiştirmediğini söyler.', 'Kütle büyüdükçe hâl değişimi için gereken ısının da büyüdüğünü söyler.', 'Aynı kütlede gereken ısının maddenin cinsine bağlı olduğunu söyler.', 'Saflık ve basıncın hâl değişim sıcaklığını değiştirdiğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kütle ve ısı ilişkisini ve iç enerjiyi hatırla.', run: hatirla },
      { title: 'Buz küpü ve buzul', goal: 'Aynı güneşin altında iki buzun neden farklı davrandığını sor.', run: buzulSahnesi },
      { title: 'Erime sıcaklığındaki buz ısı almadan erimez', goal: 'Erimenin ısı girmesine bağlı olduğunu gör.', run: isisiz },
      { title: 'Kütle: iki kat buz, iki kat ısı', goal: 'Kütle büyüdükçe gereken ısının büyüdüğünü gör.', run: kutle },
      { title: 'Cins: buz ve bal mumu', goal: 'Aynı kütlede gereken ısının maddeye göre değiştiğini gör.', run: cins },
      { title: 'Başka iki etmen: saflık ve basınç', goal: 'Saflık ve basıncın hâl değişim sıcaklığını değiştirdiğini öğren.', run: etmenler },
      { title: 'Hangi etmen?', goal: 'Günlük olaylarda hâl değişimini etkileyen etmeni bul.', run: hangiEtmen },
      { title: 'Dene: kütleyi ve maddeyi seç', goal: 'Kütle ve madde seçerek gereken ısıyı karşılaştır.', run: dene },
      { title: 'Buzula dönelim', goal: 'Buz küpü ile buzul arasındaki farkı kütleyle açıkla.', run: buzulaDon },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela özdeş ısıtıcılarla erime sıcaklığındaki 500 g ve 100 g buzu eritiyor. Hangisi doğrudur?',
        options: ['İkisi de aynı ısıyı ister; ikisi de 0 °C’tadır', '100 g buz daha çok ısı ister; çünkü daha hızlı erir', '500 g buz, 100 g buzdan beş kat ısı ister'], answer: 2,
        why: ['Sıcaklıkları aynıdır ama kütleleri farklıdır; gereken ısı kütleye bağlıdır.', 'Küçük kütle daha az ısıyla ve daha çabuk erir; daha çok ısı istemez.', 'Kütle beş katına çıkınca gereken ısı da beş katına çıkar.'], scene: 3 },
      { q: '“Erime sıcaklığına gelen buz, ısı almadan kendiliğinden erir.” Bu cümle için ne söylenir?',
        options: ['Yanlıştır; erimesi için ısı girmesi gerekir', 'Doğrudur; erime sıcaklığı yeterlidir', 'Doğrudur; yalnızca büyük parçalar için'], answer: 0,
        why: ['Isıtıcı kapalıyken buz olduğu gibi durur; erimesi için ısı girmelidir.', 'Erime sıcaklığına gelmek yetmez; buzun ısı alması gerekir.', 'Büyük ya da küçük, her parçanın erimesi için ısı girmesi gerekir.'], scene: 2 },
      { q: 'Aynı kütlede bal mumu ve buz, erime sıcaklığında özdeş ısıtıcılarla ısıtılıyor. Hangisi önce tamamen erir?',
        options: ['Buz; daha az ısı ister', 'Bal mumu; daha az ısı ister', 'İkisi aynı anda erir'], answer: 1,
        why: ['Buz, aynı kütlede bal mumunun yaklaşık iki katı ısı ister.', 'Bal mumu aynı kütlede daha az ısı ister; bu yüzden önce erir.', 'Gereken ısı maddenin cinsine bağlıdır; ikisi aynı ısıyı istemez.'], scene: 4 },
      { q: '100 g bal mumunu eriten ısı, buzun yaklaşık kaç gramını eritir?',
        options: ['Yaklaşık 100 g', 'Yaklaşık 200 g', 'Yaklaşık 50 g'], answer: 2,
        why: ['Aynı kütlede iki madde aynı ısıyı istemez.', 'Buz daha çok ısı ister; aynı ısı buzun daha az gramını eritir.', 'Buz, bal mumunun yaklaşık iki katı ısı ister; aynı ısı buzun yarısını eritir.'], scene: 4 },
      { q: 'Buzlu yollara tuz serpilmesinin nedeni hangisidir?',
        options: ['Tuz, buza ısı verir', 'Tuz, buzun erime sıcaklığını düşürür', 'Tuz, buzun kütlesini azaltır'], answer: 1,
        why: ['Tuz bir ısı kaynağı değildir; buza ısı vermez.', 'Tuz buzun saflığını bozar ve erime sıcaklığını düşürür.', 'Tuz buzun kütlesini azaltmaz; erime sıcaklığını değiştirir.'], scene: 5 },
    ],
    summary: ['Hâl değiştirme sıcaklığındaki madde, ısı almadan hâl değiştirmez.', 'Gereken ısı kütleye ve cinse bağlıdır; saflık ve basınç hâl değişim sıcaklığını değiştirir.', '<b>Kütle büyüdükçe erimek için gereken ısı da büyür.</b>'],
    nextLesson: { href: 'c2-sicaklik-yerinde-sayiyor.html', label: 'Sonraki: Isı veriyorsun, sıcaklık yerinde sayıyor ›' },
  });
})();
