/* B2 — İyonik bağ: zıt yüklü iyonların çekimi
   Katyon ile anyon arasındaki elektrostatik çekim iyonik bağdır; çekim gözlemden çıkarılır, lityum ve potasyum için
   tahmin edilir, iyonlaşma enerjisi ve elektronegatiflik verisiyle sınanır; kristalde her iyon altı zıt yüklü iyonla çevrilidir.
   Senaryo: plan/kimya/cesitlilik/senaryolar/B-iyonik-bag.md ("B2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Tepkime çizimi dersler/b-araclar.js içindedir (B1 ile ortak). Çekim çizgileri şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, isaret, etkilesim, metal, sinifla } = window.KIT;
  const { GRI, KOYU, AC, ASAMA, serit, tepkime, iyon } = window.KIT_B;
  const { lerp, ease, clamp } = Ders;

  /* ---- yardımcılar ---- */

  /* Gri atom diski: yüksüz atom (koyu gri metal ya da açık gri klor). */
  function atomDisk(c, p, x, y, r, renk, etiket, yaziRenk) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r, fill: renk }, g);
    yazi(c, g, x, y + 10, etiket, { size: r > 40 ? 32 : 22, kalin: 700, renk: yaziRenk || KOYU, math: true });
    return g;
  }
  /* Cl2 molekülü: iki açık gri atom. */
  function cl2(c, p, x, y, a) {
    const g = c.S('g', {}, p);
    [-1, 1].forEach((s) => atomDisk(c, g, x + s * 22 * Math.cos(a), y + s * 22 * Math.sin(a), 22, GRI.klor, 'Cl'));
    return g;
  }
  /* "Tahminim" ve "Gözlem" kutuları (4. ve 5. sahne). */
  function tahminKutulari(c, p) {
    const k = [[40, 'Tahminim'], [520, 'Gözlem']].map(([x, ad]) => {
      const g = c.S('g', {}, p);
      kutu(c, g, x, 380, 440, 150, { rx: 16 });
      yazi(c, g, x + 20, 418, ad, { hiza: 'start', size: 26, kalin: 600, renk: RENK.soluk });
      const metin = yazi(c, g, x + 220, 472, '', { size: 32, kalin: 700, math: true });
      metin.style.opacity = 0;
      return { g, metin, x };
    });
    const uyustu = yazi(c, p, 260, 516, 'gözlemle uyuştu', { size: 24, kalin: 600, renk: RENK.iyi });
    uyustu.style.opacity = 0;
    return { tahmin: k[0], gozlem: k[1], uyustu };
  }
  const yaz = (c, t, m, renk) => { c.mathText(t.metin, m); if (renk) t.metin.style.fill = renk; return belir(c, t.metin, 500); };

  /* 4. ve 5. sahnenin ortak çizimi: solda metal atomu, ortada ölçüm satırları, sağda Cl2; altta tahmin ve gözlem kutuları.
     Tepkime çizimi (üstte, 0,8 ölçekli) önce görünmez. */
  function tahminSahnesi(c, o) {
    const svg = c.svg(1000, 562), ust = c.S('g', {}, svg);
    atomDisk(c, ust, 140, 150, 62, GRI.metal, o.simge, AC);
    yazi(c, ust, 140, 252, `${o.p}p^{+} ${o.p}e^{−}`, { size: 24, kalin: 700, renk: RENK.soluk, math: true });
    // Ölçüm tablosu (iki satır).
    yazi(c, ust, 520, 78, 'İyonlaşma enerjisi', { size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, ust, 730, 78, 'Elektronegatiflik', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, ust, [330, 96], [820, 96], RENK.kenarlik, 1.5);
    o.satirlar.forEach(([ad, ie, en], i) => {
      const y = 148 + i * 64;
      yazi(c, ust, 360, y, ad, { hiza: 'start', size: 30, kalin: 700, math: true });
      yazi(c, ust, 520, y, ie, { size: 28, kalin: 600 });
      yazi(c, ust, 730, y, en, { size: 28, kalin: 600 });
    });
    cl2(c, ust, 890, 150, 0.5); cl2(c, ust, 900, 250, -0.4);
    const kt = tahminKutulari(c, svg);
    const T = tepkime(c, svg, { metal: o.metal, x: 140, y: 12, olcek: 0.8, rozet: true });
    T.hemen(3); T.g.style.opacity = 0;
    return { svg, ust, kt, T };
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Solda klor atomu ve serbest elektron.
    const sol = c.S('g', {}, svg), C = [250, 250];
    const gri = c.S('circle', { cx: C[0], cy: C[1], r: 70, fill: GRI.klor }, sol), ton = c.S('circle', { cx: C[0], cy: C[1], r: 70, fill: RENK.eksi }, sol);
    ton.style.opacity = 0;
    const la = yazi(c, sol, C[0], C[1] + 12, 'Cl', { size: 34, kalin: 700, renk: KOYU, math: true });
    const li = yazi(c, sol, C[0], C[1] + 12, 'Cl^{−}', { size: 34, kalin: 700, renk: KOYU, math: true });
    li.style.opacity = 0;
    const el = window.KIT.yuk(c, sol, [C[0] + 190, C[1] - 90], 'eksi', 16);
    yazi(c, sol, C[0], C[1] + 130, 'klor atomu', { size: 26, kalin: 600, renk: RENK.soluk });
    // Sağda metal: artı iyonlar ve serbest elektronlar.
    const sag = c.S('g', {}, svg);
    const m = metal(c, sag, { x: 560, y: 170, w: 380, h: 170, sutun: 4, satir: 2, etiket: 'Na^{+}', yukSayisi: 1, r: 34, re: 8, size: 22, dagit: 1, tohum: 6 });
    yazi(c, sag, 750, 390, 'metal parçası', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(sag);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, sol, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Bir klor atomu bir elektron alırsa oluşan taneciğin adı ve yükü nedir?',
      options: ['Katyon; 1+', 'Anyon; 1−', 'Anyon; 1+'], answer: 1,
      hints: ['Elektron alan atom eksi yüklü anyon olur.', '', 'Elektron alan atom eksi yüklü anyon olur.'],
      right: 'Evet. Elektron alan atom eksi yüklü anyon olur.',
    });
    await par(c.tween(1000, (e) => { el.tasi([C[0] + 190 - 150 * e, C[1] - 90 + 60 * e]); el.g.style.opacity = 1 - e; }),
      c.tween(1000, (e) => { gri.setAttribute('r', 70 + 26 * e); ton.setAttribute('r', 70 + 26 * e); ton.style.opacity = e; la.style.opacity = e < 0.5 ? 1 : 0; li.style.opacity = e < 0.5 ? 0 : 1; }));
    await c.wait(500);
    await par(belir(c, sol, 400, 0.15), belir(c, sag, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Metalik bağ hangi tanecikler arasındaki çekimdir?',
      options: ['Çekirdekler ile iç elektronlar', 'İki çekirdek', 'Artı metal iyonları ile serbest valans elektronları'], answer: 2,
      hints: ['Metalik bağ, artı iyonlar ile elektron denizi arasındaki çekimdir.', 'Metalik bağ, artı iyonlar ile elektron denizi arasındaki çekimdir.', ''],
      right: 'Evet. Metalik bağ, artı iyonlar ile elektron denizi arasındaki çekimdir.',
    });
    await m.dolas(1200);
    await c.say('Bugün katyonlar ile anyonlar arasındaki çekime bakacağız.', { speak: '[curious] Bugün katyonlar ile anyonlar arasındaki çekime bakacağız.' });
  }

  /* ---- 2. Çekimi göremeyiz, çıkarırız ---- */
  async function cekim(c) {
    const svg = c.svg(1000, 562);
    const T = tepkime(c, svg, { metal: 'Na', x: 72, y: 0, olcek: 0.95 });
    T.hemen(5);
    // Gördüğümüz ve çıkardığımız kutuları.
    const kg = c.S('g', {}, svg);
    kutu(c, kg, 40, 350, 440, 120, { rx: 16 }); kutu(c, kg, 520, 350, 440, 120, { rx: 16 });
    yazi(c, kg, 260, 392, 'Gördüğümüz:', { size: 24, kalin: 600, renk: RENK.soluk });
    yazi(c, kg, 740, 392, 'Çıkardığımız:', { size: 24, kalin: 600, renk: RENK.soluk });
    const g1 = yazi(c, kg, 260, 440, 'iyonlar bir araya geldi', { size: 30, kalin: 700 });
    const g2 = yazi(c, kg, 740, 440, '?', { size: 44, kalin: 700, renk: RENK.soluk });
    gizle(kg, g1);
    // İki iyon çifti (soru için).
    const cift = c.S('g', {}, svg);
    iyon(c, cift, 400, 150, 'eksi', 'Cl^{−}', { r: 40, size: 28 }); iyon(c, cift, 600, 150, 'eksi', 'Cl^{−}', { r: 40, size: 28 });
    const itme = etkilesim(c, cift, [400, 150], [600, 150], 'itme', { b: 42, boy: 50 });
    const cift2 = c.S('g', {}, svg);
    iyon(c, cift2, 400, 150, 'arti', 'Na^{+}', { r: 34, size: 28 }); iyon(c, cift2, 600, 150, 'eksi', 'Cl^{−}', { r: 40, size: 28 });
    const cek = etkilesim(c, cift2, [400, 150], [600, 150], 'cekme', { b: 38, boy: 50 });
    gizle(cift, cift2);
    const bag = yazi(c, svg, 500, 336, 'iyonik bağ', { size: 36, kalin: 700, renk: RENK.cekme });
    gizle(bag);

    await par(c.say('Tepkimenin sonunda kapta çok sayıda Na<sup>+</sup> ve Cl<sup>−</sup> vardır.', { speak: 'Tepkimenin sonunda kapta çok sayıda sodyum iyonu ve klorür iyonu vardır.' }), belir(c, T.g, 400, 1));
    await par(c.say('İyonlar birbirine yaklaşır ve bir araya gelir; bunu gözleriz.'), T.git(6, 2200), belir(c, kg, 500), c.wait(1200).then(() => belir(c, g1, 500)));
    await c.say('Zıt yükler birbirini çeker, aynı yükler iter.');
    await c.say('Çekimi göremeyiz; iyonların bir araya gelmesinden çıkarırız.');
    await belir(c, T.g, 400, 0);
    await belir(c, cift, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Kapta iki Cl<sup>−</sup> iyonu birbirine yaklaştırılırsa aralarındaki kuvvet nasıl olur?',
      options: ['Çekme', 'Kuvvet olmaz', 'İtme'], answer: 2,
      hints: ['İkisi de eksi yüklü; aynı yükler birbirini iter.', 'İkisi de eksi yüklü; aynı yükler birbirini iter.', ''],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    await c.say('İki Cl<sup>−</sup> da eksi yüklüdür: birbirini iter.', { speak: 'İki klorür iyonu da eksi yüklüdür: birbirini iter.' });
    await par(belir(c, cift, 400, 0), belir(c, cift2, 500));
    await c.say('Na<sup>+</sup> ile Cl<sup>−</sup> zıt yüklüdür: birbirini çeker.', { speak: 'Sodyum iyonu ile klorür iyonu zıt yüklüdür: birbirini çeker.' });
    g2.textContent = 'zıt yükler çeker'; g2.style.fill = RENK.yazi; g2.setAttribute('font-size', 30);
    await belir(c, g2, 500, 1);
    await par(c.say('Katyon ile anyon arasındaki bu güçlü çekime iyonik bağ denir.'), belir(c, bag, 600));
    c.note('<b>İyonik bağ:</b> katyon ile anyon arasındaki elektrostatik çekim. Örnek: Na<sup>+</sup> ve Cl<sup>−</sup>.', 'İyonik bağ', 'iyonik-bag');

    // Dene: önerme kartlarını sınıflandır.
    await par(belir(c, [kg, bag, cift2, T.g], 500, 0));
    const s = serit(c, svg);
    const KG = [[40, 300], [520, 300]], KW = 440, KH = 230, kutular = ['Gözleme dayalı', 'Gözleme dayalı değil'];
    KG.forEach(([x, y], i) => {
      kutu(c, svg, x, y, KW, KH, { rx: 16 });
      yazi(c, svg, x + KW / 2, y + 42, kutular[i], { size: 28, kalin: 700, renk: i === 0 ? RENK.iyi : RENK.vurgu });
    });
    const KART = [
      { metin: 'Na⁺ ile Cl⁻ bir araya geldi.', kutu: 0, asama: 6, neden: 'Bu, 6. aşamada görülür.' },
      { metin: 'Na⁺ ile Cl⁻ birbirini çeker.', kutu: 1, neden: 'Çekim görülmez; bir araya gelmeden çıkarılır.' },
      { metin: 'Kapta hem Na⁺ hem Cl⁻ vardı.', kutu: 0, asama: 4, neden: '4. ve 5. aşamalarda oluşurlar.' },
      { metin: 'İyonlar aynı yüklü olsaydı bir araya gelmezdi.', kutu: 1, neden: 'Böyle bir durum izlenmedi; bir tahmindir.' },
    ];
    let acik = null;
    const sayac = [0, 0];
    await c.say('Önermeleri, gözleme dayalı olup olmadıklarına göre ayır.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', kutular, kartlar: KART,
      soru: (k) => `“${k.metin.replace('Na⁺', 'Na<sup>+</sup>').replace('Cl⁻', 'Cl<sup>−</sup>')}” Bu önerme gözleme dayalı mı?`,
      sec: async (i, k) => {
        acik = window.KIT_B.kart(c, svg, 150, 120, 700, [k.metin], { size: 30 });
        acik.g.style.opacity = 0;
        await belir(c, acik.g, 400);
      },
      yerlestir: async (i, k) => {
        const kg2 = KG[k.kutu], j = sayac[k.kutu]++, nokta = [kg2[0] + 50 + j * 52, kg2[1] + 130];
        const d = c.S('circle', { cx: nokta[0], cy: nokta[1], r: 16, fill: k.kutu === 0 ? RENK.iyi : RENK.vurgu }, svg);
        d.style.opacity = 0;
        let L = null;
        if (k.asama) { L = cizgi(c, svg, nokta, s.alt(k.asama), RENK.iyi, 3); s.vurgula(k.asama, ASAMA[k.asama - 1]); }
        await par(belir(c, acik.g, 450, 0), belir(c, d, 450));
        acik.g.remove();
        if (L) { await c.wait(700); await belir(c, L, 350, 0); L.remove(); s.vurgula(null); }
      },
    });
  }

  /* ---- 3. Sodyum neden verir, klor neden alır? ---- */
  async function veri(c) {
    const svg = c.svg(1000, 562);
    const ATOM = { Li: [520, 0.98], Na: [496, 0.93], K: [419, 0.82], Cl: [1255, 3.16] };
    const Y = { Li: 170, Na: 250, K: 330, Cl: 410 };
    const sut = c.S('g', {}, svg);
    yazi(c, sut, 70, 62, 'Atom', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, sut, 345, 62, 'İyonlaşma enerjisi (kJ/mol)', { size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, sut, 705, 62, 'Elektronegatiflik', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, sut, [50, 82], [960, 82], RENK.kenarlik, 1.5);
    const satir = {};
    ['Li', 'Na', 'K', 'Cl'].forEach((ad) => {
      const y = Y[ad], g = c.S('g', {}, svg), [ie, en] = ATOM[ad];
      yazi(c, g, 70, y + 10, ad, { hiza: 'start', size: 32, kalin: 700 });
      const nIE = yazi(c, g, 200, y + 8, String(ie), { hiza: 'end', size: 26, kalin: 600 });
      const bIE = c.S('rect', { x: 215, y: y - 13, width: ie / 1255 * 270, height: 26, rx: 6, fill: '#8f9bc4' }, g);
      const nEN = yazi(c, g, 590, y + 8, String(en).replace('.', ','), { hiza: 'end', size: 26, kalin: 600 });
      const bEN = c.S('rect', { x: 605, y: y - 13, width: en / 3.16 * 200, height: 26, rx: 6, fill: '#8f9bc4' }, g);
      satir[ad] = { g, nIE, bIE, nEN, bEN };
      g.style.opacity = 0;
    });
    gizle(sut);
    const vur = (ler, hangi, a) => ler.forEach((ad) => { const b = satir[ad][hangi]; b.style.fill = a ? RENK.vurgu : '#8f9bc4'; });
    // K satırı: ölçüm yazılı, çubuk ve "ne kadar kolay?" hücresi boş.
    const kBar = satir.K.bIE, kBarEN = satir.K.bEN, kW = kBar.getAttribute('width');
    kBar.setAttribute('width', 0);
    const nasil = yazi(c, svg, 215, Y.K + 8, 'ne kadar kolay?', { hiza: 'start', size: 24, kalin: 600, renk: RENK.vurgu });
    const kolay = yazi(c, svg, 330, Y.K + 8, 'daha kolay', { hiza: 'start', size: 26, kalin: 700, renk: RENK.vurgu });
    gizle(nasil, kolay); kBarEN.style.opacity = 0;

    await par(c.say('Sodyum neden elektron verir, klor neden alır?'), belir(c, [sut, satir.Na.g, satir.Cl.g], 500));
    await c.say('İyonlaşma enerjisi, bir atomdan elektron koparmak için gereken enerjidir.');
    await c.say('Elektronegatiflik, atomun bağ elektronlarını kendine çekme gücüdür.');
    vur(['Na', 'Cl'], 'bIE', true);
    await c.say('Sodyumun iyonlaşma enerjisi klorunkinden çok küçüktür: elektronunu kolay verir.');
    vur(['Na', 'Cl'], 'bIE', false); vur(['Na', 'Cl'], 'bEN', true);
    await c.say('Klorun elektronegatifliği sodyumunkinden çok büyüktür: elektronu kuvvetle çeker.');
    vur(['Na', 'Cl'], 'bEN', false);
    await c.say('İyonlaşma enerjisi ne kadar küçükse, elektron o kadar kolay verilir.');
    await par(c.say('Düşük iyonlaşma enerjili metal elektron verir, yüksek elektronegatifli ametal alır.'), belir(c, satir.Li.g, 600));
    // Birlikte çöz: potasyum.
    await belir(c, satir.K.g, 500); kBarEN.style.opacity = 1;
    await belir(c, nasil, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Potasyumun iyonlaşma enerjisi 419\'dur. Potasyum elektronunu sodyumdan nasıl verir?',
      options: ['Daha zor', 'Aynı güçlükte', 'Daha kolay'], answer: 2,
      hints: ['İyonlaşma enerjisi küçüldükçe elektron daha kolay verilir. 496 ile 419\'u karşılaştır.', 'İyonlaşma enerjisi küçüldükçe elektron daha kolay verilir. 496 ile 419\'u karşılaştır.', ''],
      right: 'Evet. 419, sodyumun 496\'sından küçüktür; elektron daha kolay verilir.',
    });
    await belir(c, nasil, 300, 0);
    await par(c.tween(900, (e) => kBar.setAttribute('width', kW * e)), belir(c, kolay, 600));
    vur(['K'], 'bIE', true);
  }

  /* ---- 4. Görmediğin tepkimeyi tahmin et: lityum ---- */
  async function lityum(c) {
    const { svg, ust, kt, T } = tahminSahnesi(c, { metal: 'Li', simge: 'Li', p: 3, satirlar: [['Li', '520', '0,98'], ['Cl', '1255', '3,16']] });
    await par(c.say('Lityumun klor gazıyla tepkimesini henüz izlemedik.'), belir(c, ust, 500, 1));
    await c.say('Lityum, sodyumla aynı grupta yer alan bir metaldir.');
    await c.choice({
      tag: 'Tahmin et', q: 'Lityum atomu ile klor atomu karşılaşırsa elektronlara ne olur?',
      options: ['Klor bir elektron verir, lityum bir elektron alır', 'Lityum bir elektron verir, klor bir elektron alır', 'İkisi de elektron vermez'], answer: 1,
      hints: ['Elektronu kuvvetle çeken, elektronegatifliği büyük olan klordur.', '', 'Hangi atomun iyonlaşma enerjisi küçük? O atom elektron verir.'],
      right: 'Evet. Lityumun iyonlaşma enerjisi küçük, klorun elektronegatifliği büyük.',
    });
    await yaz(c, kt.tahmin, 'Li verir, Cl alır');
    await c.choice({
      tag: 'Sıra sende', q: 'Bu tahmini hangi veri destekler?',
      options: ['Lityumun atom numarasının küçük olması', 'Lityumun iyonlaşma enerjisi ve elektronegatifliği klorunkinden çok küçüktür', 'Lityumun klorla aynı grupta olması'], answer: 1,
      hints: ['Atom numarası elektron verme kolaylığını göstermez. Tablodaki iki ölçüme bak.', '', 'Lityum ile klor aynı grupta değil. Elektron verme kolaylığını gösteren veriye bak.'],
      right: 'Evet. Küçük iyonlaşma enerjisi, elektron vermeyi kolaylaştırır.',
    });
    // Gör: tepkime lityumla oynar.
    await belir(c, ust, 400, 0);
    await belir(c, T.g, 500, 1);
    await par(c.say('Lityum bir elektron verir ve Li<sup>+</sup> katyonu olur.', { speak: 'Lityum bir elektron verir ve lityum katyonu olur.' }), T.git(4, 2000));
    await par(c.say('Klor atomu bir elektron alır ve Cl<sup>−</sup> anyonu olur.', { speak: 'Klor atomu bir elektron alır ve klorür anyonu olur.' }), T.git(5, 2000));
    await par(c.say('Li<sup>+</sup> ile Cl<sup>−</sup> bir araya gelip lityum klorür oluşturur.', { speak: 'Lityum iyonu ile klorür iyonu bir araya gelip lityum klorür oluşturur.' }), T.git(6, 2200),
      c.wait(1500).then(() => yaz(c, kt.gozlem, 'LiCl: Li^{+} ve Cl^{−}')));
    await belir(c, kt.uyustu, 500);
    await c.say('Tepkime, sodyumdakiyle aynı sırayı izler.');
    await c.say('Bu gruptaki metaller bileşiklerinde yalnızca 1+ yüklü iyon oluşturur.', { speak: 'Bu gruptaki metaller bileşiklerinde yalnızca bir artı yüklü iyon oluşturur.' });
  }

  /* ---- 5. Görmediğin tepkimeyi tahmin et: potasyum ---- */
  async function potasyum(c) {
    const { svg, ust, kt, T } = tahminSahnesi(c, { metal: 'K', simge: 'K', p: 19, satirlar: [['K', '419', '0,82'], ['Cl', '1255', '3,16']] });
    await par(c.say('Şimdi aynı gruptaki potasyumu tahmin edelim.'), belir(c, ust, 500, 1));
    await c.choice({
      tag: 'Tahmin et', q: 'Potasyum klor gazıyla tepkimeye girerse hangi iyonlar oluşur?',
      options: ['K<sup>2+</sup> ve Cl<sup>−</sup>', 'K<sup>+</sup> ve Cl<sup>−</sup>', 'K<sup>−</sup> ve Cl<sup>+</sup>'], answer: 1,
      hints: ['Lityum ve sodyum 1+ yüklü iyon verdi. Gruptaki metaller yalnızca 1+ verir.', '', 'Metal elektron verir, artı yüklü olur. Lityum ve sodyum nasıl bir iyon verdi?'],
      right: 'Evet. Gruptaki metaller yalnızca 1+ yüklü iyon verir.',
    });
    await yaz(c, kt.tahmin, 'K^{+} ve Cl^{−}');
    await belir(c, ust, 400, 0);
    await belir(c, T.g, 500, 1);
    await par(T.git(4, 1800), c.wait(100));
    await par(T.git(5, 1800), c.wait(100));
    await par(T.git(6, 2000), c.wait(1400).then(() => yaz(c, kt.gozlem, 'KCl: K^{+} ve Cl^{−}')));
    await belir(c, kt.uyustu, 500);
    await c.say('Üç tepkime aynı sırayı izler.');

    // Karşılaştırma tablosu.
    await belir(c, [T.g, kt.tahmin.g, kt.gozlem.g, kt.uyustu], 400, 0);
    const KOL = [['', 60, 'start'], ['Verdiği elektron', 220, 'middle'], ['Katyon', 390, 'middle'], ['Anyon', 520, 'middle'], ['Bileşik', 660, 'middle'], ['İyonlaşma enerjisi', 850, 'middle']];
    const tb = c.S('g', {}, svg);
    KOL.forEach(([t, x, h]) => t && yazi(c, tb, x, 92, t, { hiza: h, size: 22, kalin: 500, renk: RENK.soluk }));
    cizgi(c, tb, [40, 112], [960, 112], RENK.kenarlik, 1.5);
    const SAT = [['Na', '1', 'Na^{+}', 'Cl^{−}', 'NaCl', '496'], ['Li', '1', 'Li^{+}', 'Cl^{−}', 'LiCl', '520'], ['K', '1', 'K^{+}', 'Cl^{−}', 'KCl', '419']];
    const sat = SAT.map((v, i) => {
      const g = c.S('g', {}, tb);
      v.forEach((t, j) => yazi(c, g, KOL[j][1], 180 + i * 78, t, { hiza: KOL[j][2], size: j === 0 ? 32 : 30, kalin: 700, math: true }));
      g.style.opacity = 0; return g;
    });
    gizle(tb);
    await belir(c, tb, 400);
    await belir(c, sat[0], 500); await belir(c, sat[1], 500); await belir(c, sat[2], 500);
    await c.say('Üçünde de metal bir elektron verir, klor bir elektron alır.');
    await c.say('Elektronu en kolay veren, iyonlaşma enerjisi en küçük olan potasyumdur.');
    await c.choice({
      tag: 'Sıra sende', q: 'Üç tepkimeyi karşılaştır. Klora elektronunu en kolay hangi metal verir?',
      options: ['Lityum', 'Sodyum', 'Potasyum'], answer: 2,
      hints: ['Lityumun iyonlaşma enerjisi üçünün en büyüğü. Tablonun son sütununa bak.', 'Sodyumun iyonlaşma enerjisi 496; potasyumunki bundan küçük. Tablonun son sütununa bak.', ''],
      right: 'Evet. İyonlaşma enerjisi en küçük olan potasyum, elektronu en kolay verir.',
    });
  }

  /* ---- 6. Tahminin geçerli mi? Veriyle sına ---- */
  async function sina(c) {
    const svg = c.svg(1000, 562);
    const ATOM = [['Li', '520', '0,98'], ['Na', '496', '0,93'], ['Mg', '738', '1,31'], ['F', '1681', '4,00'], ['Cl', '1255', '3,16'], ['O', '1314', '3,44']];
    const tb = c.S('g', {}, svg);
    yazi(c, tb, 40, 56, 'Atom', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, tb, 205, 56, 'İyonlaşma enerjisi', { size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, tb, 405, 56, 'Elektronegatiflik', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, tb, [30, 74], [505, 74], RENK.kenarlik, 1.5);
    const sat = {};
    ATOM.forEach(([ad, ie, en], i) => {
      const g = c.S('g', {}, tb), y = 118 + i * 66;
      yazi(c, g, 40, y, ad, { hiza: 'start', size: 30, kalin: 700 });
      yazi(c, g, 205, y, ie, { size: 28, kalin: 600 }); yazi(c, g, 405, y, en, { size: 28, kalin: 600 });
      sat[ad] = g;
    });
    gizle(tb);
    const sadece = (...ler) => Object.keys(sat).forEach((k) => { sat[k].style.opacity = ler.includes(k) ? 1 : 0.12; });
    const hepsi = () => Object.keys(sat).forEach((k) => { sat[k].style.opacity = 1; });

    await par(c.say('İyonik bağ için bir atom elektron verir, ötekisi alır.'), belir(c, tb, 500));
    await c.say('Elektronu veren atomun iyonlaşma enerjisi küçük olmalıdır.');
    await c.say('Elektronu alan atomun elektronegatifliği büyük olmalıdır.');
    await c.say('İkisi birden sağlanmazsa iyonik bağ oluşmaz.');

    // Birlikte çöz: Mg ve O.
    sadece('Mg', 'O');
    const kural = c.S('g', {}, svg);
    yazi(c, kural, 520, 150, 'Mg: iyonlaşma enerjisi 738, küçük', { hiza: 'start', size: 24, kalin: 600 });
    yazi(c, kural, 520, 230, 'O: elektronegatiflik 3,44, ?', { hiza: 'start', size: 24, kalin: 600 });
    yazi(c, kural, 520, 310, 'Sonuç: ?', { hiza: 'start', size: 24, kalin: 700, renk: RENK.vurgu });
    const tik = isaret(c, kural, 930, 142, 'ok', 15);
    gizle(kural);
    await belir(c, kural, 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Mg ile O arasında iyonik bağ oluşur mu?',
      options: ['Oluşmaz; ikisi de elektron vermez', 'Oluşmaz; ikisi de elektron alır', 'Oluşur; Mg elektron verir, O alır'], answer: 2,
      hints: ['Mg\'nin iyonlaşma enerjisi küçüktür, O\'nunki büyük. Mg elektron verebilir.', 'Oksijenin elektronegatifliği Mg\'ninkinden çok büyük. Alan oksijendir; veren de var.', ''],
      right: 'Evet. Mg elektron verir, O alır; iyonik bağ oluşur.',
    });
    await c.say('Magnezyum elektron verir, oksijen alır: iyonik bağ oluşur.');

    // Sor: Li ve Na.
    await belir(c, kural, 300, 0);
    sadece('Li', 'Na');
    const cift = c.S('g', {}, svg);
    yazi(c, cift, 700, 170, 'Li – Na', { size: 56, kalin: 700 });
    const carpi = isaret(c, cift, 700, 260, 'no', 28);
    const yok = yazi(c, cift, 700, 340, 'elektronu alan yok', { size: 28, kalin: 600, renk: RENK.itme });
    gizle(cift);
    await belir(c, cift.firstChild, 300);
    cift.style.opacity = 1; gizle(carpi, yok);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir öğrenci “Li ile Na da iyonik bağ yapar” tahmininde bulunuyor. Veriye göre bu tahmin geçerli midir?',
      options: ['Geçerli; ikisinin de iyonlaşma enerjisi küçük', 'Geçerli; ikisi de aynı gruptadır', 'Geçerli değil; ikisinin de elektronegatifliği küçük, elektronu alan atom yok'], answer: 2,
      hints: ['Kural iki şart istiyor: veren ve alan. Li ve Na\'nın elektronegatiflikleri 1\'den küçük.', 'Aynı grupta olmak yetmez. Kural iki şart istiyor: veren ve alan.', ''],
      right: 'Evet. İkisi de elektron verir, alan yoktur.',
    });
    await par(belir(c, carpi, 400), belir(c, yok, 500));
    await c.say('Metal atomları bir arada olunca elektron denizi oluşur; bu metalik bağdır.');

    // Dene: altı atom çiftini sınıflandır.
    await belir(c, cift, 400, 0);
    hepsi();
    const KG = [[520, 160], [520, 330]], KW = 440, KH = 150, kutular = ['İyonik bağ oluşur', 'İyonik bağ oluşmaz'];
    kutular.forEach((ad, i) => {
      kutu(c, svg, KG[i][0], KG[i][1], KW, KH, { rx: 16 });
      yazi(c, svg, KG[i][0] + KW / 2, KG[i][1] + 38, i ? 'oluşmaz' : 'oluşur', { size: 28, kalin: 700, renk: i ? RENK.vurgu : RENK.iyi });
    });
    const KART = [
      { metin: 'Na–F', kutu: 0, neden: 'Na elektronu kolay verir; F elektronu çok kuvvetli çeker.' },
      { metin: 'Mg–O', kutu: 0, neden: 'Mg verir, O alır.' },
      { metin: 'Li–Cl', kutu: 0, neden: 'Li verir, Cl alır; daha önce gördük.' },
      { metin: 'F–O', kutu: 1, neden: 'İkisi de elektronu kuvvetle çeker; hiçbiri vermez.' },
      { metin: 'Cl–O', kutu: 1, neden: 'İkisinin de iyonlaşma enerjisi büyük, elektron veren atom yok.' },
      { metin: 'Li–Mg', kutu: 1, neden: 'İkisi de elektron verir, alan yok; metal atomları arasında metalik bağ kurulur.' },
    ];
    let acik = null;
    const sayac = [0, 0];
    await c.say('Her atom çifti için iyonik bağ oluşup oluşmayacağını söyle.', { noWait: true });
    await sinifla(c, {
      tag: 'Dene', kutular, kartlar: KART,
      soru: (k) => `${k.metin} atomları arasında iyonik bağ oluşur mu?`,
      sec: async (i, k) => {
        acik = yazi(c, svg, 740, 118, k.metin, { size: 56, kalin: 700 });
        acik.style.opacity = 0;
        await belir(c, acik, 400);
      },
      yerlestir: async (i, k) => {
        const kg = KG[k.kutu], j = sayac[k.kutu]++, nokta = [kg[0] + 50 + j * 52, kg[1] + 100];
        const d = c.S('circle', { cx: nokta[0], cy: nokta[1], r: 16, fill: k.kutu === 0 ? RENK.iyi : RENK.vurgu }, svg);
        d.style.opacity = 0;
        await par(belir(c, acik, 450, 0), belir(c, d, 450));
        acik.remove();
      },
    });
  }

  /* ---- 7. Kristalde her iyon çok iyonla çevrilidir ---- */
  async function kristal(c) {
    const svg = c.svg(1000, 562);
    const C0 = [500, 285];
    // Kristal: belirli bir düzende dizili iyonlar (uzaklaştıkça soluk).
    const kafes = c.S('g', {}, svg);
    for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) {
      const x = 500 + (i - 4) * 62, y = 285 + (j - 2) * 62, d = Math.hypot(x - 500, y - 285);
      const d1 = c.S('circle', { cx: x, cy: y, r: (i + j) % 2 ? 22 : 17, fill: (i + j) % 2 ? RENK.eksi : RENK.arti, 'fill-opacity': clamp(1.1 - d / 330, 0.15, 1) }, kafes);
      d1.style.opacity = 1;
    }
    yazi(c, svg, 500, 520, 'sodyum klorür kristali', { size: 28, kalin: 700 });
    const ad1 = svg.lastChild; ad1.style.opacity = 0;
    // Altı komşulu çizim: merkez Na+ ve çevresinde altı Cl- (sonra rol değişir).
    const YER = [[350, 285], [650, 285], [580, 235], [420, 345], [500, 135], [500, 435]];
    const kur = (merkezArti) => {
      const g = c.S('g', {}, svg), cl = [];
      const cizgiler = YER.map((q) => cizgi(c, g, C0, q, RENK.cekme, 4));
      const komsu = YER.map((q) => (merkezArti ? iyon(c, g, q[0], q[1], 'eksi', 'Cl^{−}', { r: 40, size: 26 }) : iyon(c, g, q[0], q[1], 'arti', 'Na^{+}', { r: 34, size: 26 })));
      const orta = merkezArti ? iyon(c, g, C0[0], C0[1], 'arti', 'Na^{+}', { r: 34, size: 26 }) : iyon(c, g, C0[0], C0[1], 'eksi', 'Cl^{−}', { r: 40, size: 26 });
      g.style.opacity = 0;
      return { g, cizgiler, komsu, orta };
    };
    const A = kur(true), B = kur(false);

    await par(c.say('Çok sayıda Na<sup>+</sup> ve Cl<sup>−</sup> bir araya gelip sodyum klorür kristalini oluşturur.', { speak: 'Çok sayıda sodyum iyonu ve klorür iyonu bir araya gelip sodyum klorür kristalini oluşturur.' }), belir(c, [kafes, ad1], 600));
    await c.say('Kristalde iyonlar belirli bir düzende dizilir.');
    await c.say('Zıt yüklerin çekimi en çok, aynı yüklerin itmesi en az olur.');
    await par(belir(c, [kafes, ad1], 500, 0), belir(c, A.g, 600));
    await c.say('Her Na<sup>+</sup> iyonu, altı Cl<sup>−</sup> iyonuyla çevrilidir.', { speak: 'Her sodyum iyonu, altı klorür iyonuyla çevrilidir.' });
    await belir(c, A.g, 400, 0); await belir(c, B.g, 500);
    await c.say('Her Cl<sup>−</sup> iyonu da altı Na<sup>+</sup> iyonuyla çevrilidir.', { speak: 'Her klorür iyonu da altı sodyum iyonuyla çevrilidir.' });
    await belir(c, B.g, 400, 0); await belir(c, A.g, 500);
    await c.say('Na<sup>+</sup>, çevresindeki altı Cl<sup>−</sup> iyonunun hepsini aynı büyüklükte çeker.', { speak: 'Sodyum iyonu, çevresindeki altı klorür iyonunun hepsini aynı büyüklükte çeker.' });
    await c.choice({
      tag: 'Sıra sende', q: 'Kristaldeki bir Na<sup>+</sup> iyonu için hangisi doğrudur?',
      options: ['Yalnızca elektronunu verdiği Cl<sup>−</sup> iyonuyla çekim yapar', 'Çevresindeki Cl<sup>−</sup> iyonlarından yalnızca birini çeker', 'Çevresindeki altı Cl<sup>−</sup> iyonunun hepsiyle çekim yapar'], answer: 2,
      hints: ['Verilen elektron ortamda serbest dolaşır; klor atomu herhangi bir elektronu alır. Na<sup>+</sup>\'ı çevreleyen Cl<sup>−</sup> iyonlarını say.', 'Çevresindeki altı Cl<sup>−</sup> iyonunun çekimleri aynı büyüklükte. Çizgileri say.', ''],
      right: 'Evet. Çevresindeki altı Cl<sup>−</sup> iyonunun hepsini aynı büyüklükte çeker.',
    });
    await c.tween(700, (e) => A.cizgiler.forEach((l) => l.setAttribute('stroke-width', 4 + 5 * e)));
    await c.say('Sodyum atomu bir elektron verir; ama Na<sup>+</sup>, altı Cl<sup>−</sup> ile çekim yapar.', { speak: 'Sodyum atomu bir elektron verir; ama sodyum iyonu, altı klorür iyonuyla çekim yapar.' });
    c.note('<b>Her iyon, çevresindeki zıt yüklü iyonların hepsini çeker.</b> Örnek: Na<sup>+</sup>, 6 Cl<sup>−</sup>.', 'Kristal', 'kristal');
  }

  Ders.start({
    id: 'cesitlilik-b2', kicker: 'Konu B · İyonik bağ', title: 'İyonik bağ: zıt yüklü iyonların çekimi', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'İyonik bağ: zıt yüklü iyonların çekimi',
      hook: 'Bir tuzun nasıl oluştuğunu gördün; başka bir metal ve ametal için sonucu görmeden söyleyebilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['İyonik bağı, katyon ile anyon arasındaki elektrostatik çekim olarak tanımlar.', 'İyonlaşma enerjisi ve elektronegatiflik verisiyle iyonik bağın oluşup oluşmayacağını tahmin eder.', 'Kristalde her iyonun çevresindeki zıt yüklü iyonların hepsini çektiğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Anyon oluşumunu ve metalik bağı hatırla.', run: hatirla },
      { title: 'Çekimi göremeyiz, çıkarırız', goal: 'İyonların bir araya gelmesinden çekimi çıkar.', run: cekim },
      { title: 'Sodyum neden verir, klor neden alır?', goal: 'İyonlaşma enerjisi ve elektronegatiflikle elektron vermeyi açıkla.', run: veri },
      { title: 'Görmediğin tepkimeyi tahmin et: lityum', goal: 'Lityumun klor gazıyla tepkimesini veriyle tahmin et.', run: lityum },
      { title: 'Görmediğin tepkimeyi tahmin et: potasyum', goal: 'Potasyumun tepkimesini tahmin et ve üç tepkimeyi karşılaştır.', run: potasyum },
      { title: 'Tahminin geçerli mi? Veriyle sına', goal: 'Verilen atom çiftleri için iyonik bağ oluşup oluşmayacağını bul.', run: sina },
      { title: 'Kristalde her iyon çok iyonla çevrilidir', goal: 'Kristalde bir iyonun çevresindeki zıt yüklü iyonları say.', run: kristal },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İyonik bağ hangi tanecikler arasındaki çekimdir?',
        options: ['Katyonlar ile anyonlar', 'Aynı yüklü iyonlar', 'Artı iyonlar ile elektron denizi'], answer: 0,
        why: ['İyonik bağ, katyon ile anyon arasındaki elektrostatik çekimdir.', 'Aynı yüklü iyonlar birbirini iter, çekmez.', 'Artı iyonlar ile elektron denizi arasındaki çekim metalik bağdır.'], scene: 1 },
      { q: 'Rubidyum, lityum, sodyum ve potasyumla aynı gruptadır. Rubidyumun klor gazıyla tepkimesinde hangi iyonlar oluşur?',
        options: ['Rb<sup>−</sup> ve Cl<sup>+</sup>', 'Rb<sup>2+</sup> ve Cl<sup>−</sup>', 'Rb<sup>+</sup> ve Cl<sup>−</sup>'], answer: 2,
        why: ['Metal elektron verir, ametal alır; yükler ters yazılmış.', 'Gruptaki metaller yalnızca 1+ yüklü iyon oluşturur.', 'Gruptaki metaller 1+ yüklü iyon verir; klor 1− yüklü anyon olur.'], scene: 3 },
      { q: 'Klorun iyonlaşma enerjisi 1255, elektronegatifliği 3,16; oksijeninki 1314 ve 3,44\'tür. Klor ile oksijen arasında iyonik bağ oluşur mu?',
        options: ['Oluşur; oksijen elektron verir', 'Oluşmaz; ikisi de elektronu kuvvetle çeker, vermez', 'Oluşur; klor elektron verir'], answer: 1,
        why: ['Oksijenin iyonlaşma enerjisi büyük; elektron vermesi zordur.', 'İkisinin de iyonlaşma enerjisi büyük, elektron veren atom yok.', 'Klorun iyonlaşma enerjisi büyük; elektron vermesi zordur.'], scene: 5 },
      { q: 'Bir öğrenci “Bir sodyum atomu yalnızca bir iyonik bağ yapar, çünkü yalnızca bir elektron verir” diyor. Hangisi bu düşünceyi düzeltir?',
        options: ['Kristalde Na<sup>+</sup> iyonu, çevresindeki altı Cl<sup>−</sup> iyonuyla çekim yapar', 'Sodyum atomu iki elektron verir', 'Sodyum atomu hiç elektron vermez'], answer: 0,
        why: ['Verilen elektron ortamda dolaşır; Na<sup>+</sup> altı Cl<sup>−</sup> ile çekim yapar.', 'Sodyum atomu bir elektron verir ve 1+ yüklü olur.', 'Sodyum elektron verip Na<sup>+</sup> olur.'], scene: 6 },
      { q: 'İyonların bir araya geldiği gözlendi. Bu gözlemden çıkan sonuç hangisidir?',
        options: ['İyonların hepsi aynı yüklüdür', 'İyonlar elektron alıp vermemiştir', 'Zıt yüklü iyonlar arasında çekim vardır'], answer: 2,
        why: ['Aynı yükler iter; iyonlar bir araya gelemezdi.', 'İyonlar, elektron alıp vererek oluşmuştur.', 'İyonların bir araya gelmesinden zıt yükler arasında çekim olduğu çıkarılır.'], scene: 1 },
    ],
    summary: ['Katyon ile anyon bir araya gelir; çekimi gözlemden çıkarırız.', 'Elektronu kolay veren metal ile elektronu kuvvetle çeken ametal arasında iyonik bağ oluşur.', 'Kristalde her iyon altı zıt yüklü iyonla çevrilidir.', '<b>İyonik bağ, katyon ile anyonun elektrostatik çekimidir.</b>'],
    nextLesson: { href: 'b3-iyonlardan-formule.html', label: 'Sonraki: İyonlardan formüle ›' },
  });
})();
