/* G3 — İndüklenmiş dipol: apolar tanecikler de etkileşir
   Apolar moleküllerde ve soy gaz atomlarında yük dağılımı geçici olarak bozulabilir (indüklenmiş dipol). Üç etkileşim daha doğar: dipol-indüklenmiş dipol,
   iyon-indüklenmiş dipol, indüklenmiş dipol-indüklenmiş dipol (London). Beş etkileşimin adı etkileşen taneciklerin türünden çıkar.
   Senaryo: plan/kimya/cesitlilik/senaryolar/G-molekuller-arasi-etkilesimler.md ("G3"). Sıra plan/KURALLAR.md 3.2'ye göredir. Seslendirme yok.
   Etkileşim türleri yalnızca bu beşidir ve hidrojen bağı. London için kuvvet sıralaması, mol kütlesi ve temas yüzeyi yok. Çizimler şematiktir. */
(() => {
  'use strict';
  const { RENK, yazi, par, sinifla } = window.KIT;
  const G = window.KIT_G;
  const { B, Gz, cf, ch, tanecik, cift, cekim, serit, uzayDolgu, golgeOf, DLT, lewis, bulutAtom, matris5, maddeTablosu } = G;

  const ESIT = (n) => Array(n).fill(0.34);

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const p1 = cift(c, svg, 'HCl', 'HCl', 500, 280, { serit: true, boy: 200, bosluk: 120, olcek: 1.0, deltaPunto: 28 });
    const L = lewis(c, svg, 'CH4', 500, 280, { olcek: 1.9, merkez: 0 });
    Gz(p1.g, L.g);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), B(c, p1.g, 600));
    await c.choice({
      tag: 'Hatırla', q: 'İki polar molekül arasındaki etkileşimin adı nedir?',
      options: ['İyon-dipol', 'Atom-atom', 'Dipol-dipol'], answer: 2,
      hints: ['İyon yok; iki tanecik de polar molekül.', 'Polar molekül polar molekülle dipol-dipol etkileşir.', ''],
      right: 'Evet. Polar molekül polar molekülle dipol-dipol etkileşir.',
    });
    c.clearSay();
    await B(c, p1.g, 400, 0);
    await B(c, L.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'CH<sub>4</sub> molekülü polar mı, apolar mı?',
      options: ['Polar; C–H bağları polar', 'Polar; hidrojen içerir', 'Apolar; merkez karbonda ortaklanmamış çift yok'], answer: 2,
      hints: ['Merkez atomda ortaklanmamış çift yoksa dipol momenti sıfırdır; molekül apolardır.', 'Merkez atomda ortaklanmamış çift yoksa dipol momenti sıfırdır; molekül apolardır.', ''],
      right: 'Evet. Merkez atomda çift yok; molekül apolar.',
    });
    await c.say('Bugün apolar taneciklerin de nasıl etkileştiğine bakacağız.', { speak: '[curious] Bugün apolar taneciklerin de nasıl etkileştiğine bakacağız.' });
  }

  /* ---- 2. Soy gaz atomunda anlık kutuplaşma ---- */
  async function anlik(c) {
    const svg = c.svg(1000, 562);
    const he = bulutAtom(c, svg, 500, 270, { r: 110, aci: 0, etiket: false, deltaPunto: 30, ad: 'He' });
    const gd = yazi(c, svg, 500, 500, 'geçici dipol = indüklenmiş dipol', { size: 30, kalin: 700, renk: RENK.vurgu });
    Gz(he.g, gd);
    await par(c.say('Helyum bir soy gaz atomudur; elektron bulutu dengeli dağılır.'), B(c, he.g, 600));
    await par(c.say('Elektron dağılımı dalgalanır; bir an bir yanda yoğunlaşır.'), he.git(1, 1100));
    await par(c.say('Elektronların yığıldığı uç kısmen eksi, karşı uç kısmen artı olur.'), he.etiketAc(true, 600));
    await par(c.say('Bu geçici kutuplaşmaya geçici dipol ya da indüklenmiş dipol denir.'), B(c, gd, 500));
    await par(c.say('Yük dağılımı sürekli değişir; kutuplaşma kalıcı değildir.'), (async () => { await he.git(0, 700); await he.git(-1, 1000); await he.git(1, 1000); await he.git(0, 700); })());

    // Birlikte çöz: bulut sağa yığıldı.
    c.clearSay();
    await par(B(c, gd, 400, 0), he.etiketAc(false, 300));
    await he.git(1, 800);
    const s1 = yazi(c, svg, 500, 60, 'Bulut sağa yığıldı', { size: 30, kalin: 600 });
    const s2 = yazi(c, svg, 500, 490, 'Sağ uç: ?', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(s1, s2); await B(c, [s1, s2], 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sağ uç nasıl yüklenir?',
      options: ['Kısmen artı', 'Yüksüz', 'Kısmen eksi'], answer: 2,
      hints: ['Elektronlar eksi yüklüdür.', 'Elektronlar eksi yüklüdür.', ''],
      right: 'Evet. Elektronların yığıldığı uç kısmen eksidir.',
    });
    s2.textContent = 'Sağ uç: kısmen eksi';
    await par(c.say('Elektronların yığıldığı sağ uç kısmen eksidir.'), he.etiketAc(true, 500));

    // Sor: elektronlar sola yığılıyor.
    c.clearSay();
    await par(he.etiketAc(false, 300), B(c, s1, 300, 0));
    await he.git(-1, 900);
    s1.textContent = 'Bulut sola yığıldı'; s2.textContent = 'Sağ uç: ?';
    await B(c, s1, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Bir an sonra elektronlar sola yığılıyor. Sağ uç nasıl olur?',
      options: ['Kısmen eksi', 'Yüksüz', 'Kısmen artı'], answer: 2,
      hints: ['Elektronlar sağdan ayrıldı.', 'Elektronlar azaldığında artı yük baskın olur.', ''],
      right: 'Evet. Elektronlar azalınca artı yük baskın olur.',
    });
    s2.textContent = 'Sağ uç: kısmen artı';
    await par(c.say('Elektronlar sola geçince sağ uç kısmen artı olur.'), he.etiketAc(true, 500));
  }

  /* ---- 3. İyon yaklaşınca ---- */
  async function iyon(c) {
    const svg = c.svg(1000, 562);
    const he = bulutAtom(c, svg, 660, 280, { r: 90, aci: 180, etiket: false, deltaPunto: 28, ad: 'He' });
    const na = tanecik(c, svg, 'Na+', 120, 280, { olcek: 1.3 }), cl = tanecik(c, svg, 'Cl-', 360, 280, { olcek: 1.3 });
    const ad = yazi(c, svg, 500, 500, 'iyon-indüklenmiş dipol', { size: 32, kalin: 700, renk: RENK.vurgu });
    Gz(he.g, na.g, cl.g, ad);
    const git = (q, x0, x1, ms) => c.tween(ms, (e) => q.g.setAttribute('transform', `translate(${x0 + (x1 - x0) * e - q.x},0)`));
    await B(c, he.g, 500);
    await par(c.say('Helyumun yanına bir iyon gelsin: Na<sup>+</sup>.', { speak: 'Helyumun yanına bir iyon gelsin: sodyum artı.' }),
      B(c, na.g, 400).then(() => git(na, 120, 330, 1600)));
    await par(c.say('Artı yüklü iyon, elektronları kendine doğru çeker.'), he.git(1, 1200));
    await par(c.say('Helyumun iyona yakın ucu kısmen eksi, uzak ucu kısmen artı olur.'), he.etiketAc(true, 600));
    await c.say('İyon, helyumda bir dipol indüklemiştir.');
    const z = cekim(c, svg, [330 + 44 + 12, 280], [660 - 90 - 40 - 30, 280], { w: 6 }); Gz(z);
    await par(c.say('İyon ile bu indüklenmiş dipol birbirini çeker.'), B(c, z, 500));
    await par(c.say('Buna iyon-indüklenmiş dipol etkileşimi denir.'), B(c, ad, 500));

    // Eksi iyon: Cl⁻.
    await par(B(c, [na.g, z, ad], 400, 0), he.etiketAc(false, 300));
    await he.git(0, 600);
    await B(c, cl.g, 500);
    await par(c.say('Eksi yüklü bir iyon gelseydi, elektronlar iyondan uzaklaşırdı.'), he.git(-1, 1200));
    await par(c.say('O zaman helyumun iyona yakın ucu kısmen artı olurdu.'), he.etiketAc(true, 600));

    // Sor: Cl⁻ ve Ne.
    c.clearSay();
    await par(he.etiketAc(false, 300), B(c, [he.g, cl.g], 400, 0));
    const ne = bulutAtom(c, svg, 660, 280, { r: 90, aci: 180, elektron: 0, etiket: false, deltaPunto: 28, ad: 'Ne' });
    Gz(ne.g); await B(c, ne.g, 500);
    await B(c, cl.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'Cl<sup>−</sup> iyonu bir neon atomuna yaklaşıyor. Neonun iyona yakın ucu nasıl yüklenir?',
      options: ['Kısmen eksi', 'Yüksüz', 'Kısmen artı'], answer: 2,
      hints: ['Eksi iyon elektronları kendinden uzağa iter.', 'Eksi iyon elektronları kendinden uzağa iter; elektronlar karşı uca yığılır.', ''],
      right: 'Evet. Elektronlar karşı uca yığılır.',
    });
    await ne.git(-1, 900);
    await par(c.say('Cl<sup>−</sup> elektronları iter: neonun yakın ucu kısmen artı olur.', { speak: 'Klorür elektronları iter: neonun yakın ucu kısmen artı olur.' }), ne.etiketAc(true, 600));
    c.note('<b>Yaklaşan tanecik, apolar taneciğin yük dağılımını geçici bozar.</b> Örnek: Na<sup>+</sup>–He.', 'İndüklenmiş dipol', 'induklenmis-dipol');
  }

  /* ---- 4. Polar molekül yaklaşınca ---- */
  async function polar(c) {
    const svg = c.svg(1000, 562);
    const hc = uzayDolgu(c, svg, 'HCl', 290, 280, { olcek: 1.7, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 28 });
    const he = bulutAtom(c, svg, 700, 280, { r: 90, aci: 0, etiket: false, deltaPunto: 28, ad: 'He' });
    const ad = yazi(c, svg, 500, 500, 'dipol-indüklenmiş dipol', { size: 32, kalin: 700, renk: RENK.vurgu });
    Gz(hc.g, hc.golgeG, hc.deltaG, he.g, ad);
    await B(c, he.g, 500);
    await par(c.say('Şimdi helyuma polar bir molekül yaklaşsın: HCl.', { speak: 'Şimdi helyuma polar bir molekül yaklaşsın: H Cl.' }), B(c, hc.g, 600));
    await par(c.say('HCl\'nin klor ucu eksidir; helyumun elektronlarını iter.', { speak: 'H Cl\'nin klor ucu eksidir; helyumun elektronlarını iter.' }), B(c, [hc.golgeG, hc.deltaG], 700));
    await par(c.say('Helyumun yakın ucu kısmen artı, uzak ucu kısmen eksi olur.'), he.git(1, 1200).then(() => he.etiketAc(true, 500)));
    await c.say('HCl\'nin kalıcı dipolü, helyumda dipol indüklemiştir.', { speak: 'H Cl\'nin kalıcı dipolü, helyumda dipol indüklemiştir.' });
    const z = cekim(c, svg, [hc.atomlar[1].x + hc.atomlar[1].r + 12, 280], [700 - 90 - 40 - 30, 280], { w: 6 }); Gz(z);
    await par(c.say('Bu iki dipolün zıt uçları birbirini çeker.'), B(c, z, 500));
    await par(c.say('Buna dipol-indüklenmiş dipol etkileşimi denir.'), B(c, ad, 500));

    // Birlikte çöz: Ne ve HCl'nin hidrojen ucu.
    c.clearSay();
    await par(B(c, [hc.g, hc.golgeG, hc.deltaG, he.g, z, ad], 400, 0), he.etiketAc(false, 200));
    he.ayarla(0);
    const hc2 = uzayDolgu(c, svg, 'HCl', 290, 270, { olcek: 1.7, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 28, ayna: true });
    const ne = bulutAtom(c, svg, 700, 270, { r: 90, aci: 180, elektron: 0, etiket: false, deltaPunto: 28, ad: 'Ne' });
    const s1 = yazi(c, svg, 500, 440, 'Hidrojen ucu artıdır: elektronları kendine çeker', { size: 26, kalin: 600 });
    const s2 = yazi(c, svg, 500, 495, 'Neonun yakın ucu: ?', { size: 32, kalin: 700, renk: RENK.vurgu });
    Gz(hc2.g, hc2.golgeG, hc2.deltaG, ne.g, s1, s2);
    await B(c, [hc2.g, hc2.golgeG, hc2.deltaG, ne.g, s1, s2], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Neonun HCl\'ye yakın ucu nasıl yüklenir?',
      options: ['Kısmen artı', 'Yüksüz', 'Kısmen eksi'], answer: 2,
      hints: ['Artı uç elektronları kendine çeker.', 'Artı uç elektronları kendine çeker; elektronlar yakın uca yığılır.', ''],
      right: 'Evet. Elektronlar yakın uca yığılır.',
    });
    await ne.git(1, 900);
    s2.textContent = 'Neonun yakın ucu: kısmen eksi';
    await par(c.say('Elektronlar artı uca yığılır: yakın uç kısmen eksi olur.'), ne.etiketAc(true, 600));

    // Sor: HCl ve CH₄.
    c.clearSay();
    await par(B(c, [hc2.g, hc2.golgeG, hc2.deltaG, ne.g, s1, s2], 450, 0), ne.etiketAc(false, 200));
    const p = cift(c, svg, 'HCl', 'CH4', 500, 250, { serit: true, boy: 150, bosluk: 150, olcek: 1.2, cizgi: false, deltaPunto: 28 });
    const z2 = cekim(c, svg, [p.xa + p.wa + 14, 250], [p.xb - p.wb - 14, 250], { w: 6 }); Gz(p.g, z2);
    await B(c, p.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'HCl ile CH<sub>4</sub> arasındaki etkileşim hangisidir?',
      options: ['Dipol-dipol', 'Dipol-indüklenmiş dipol', 'İyon-indüklenmiş dipol'], answer: 1,
      hints: ['HCl polar; CH₄ apolar.'.replace('CH₄', 'CH<sub>4</sub>'), '', 'İyon yok; HCl polar bir molekül.'],
      right: 'Evet. Apolar tanecikte dipol indüklenir.',
    });
    const ad2 = yazi(c, svg, 500, 400, 'dipol-indüklenmiş dipol', { size: 32, kalin: 700, renk: RENK.vurgu }); Gz(ad2);
    await par(c.say('Polar HCl, apolar CH<sub>4</sub>\'te dipol indükler.', { speak: 'Polar H Cl, apolar C H dörtte dipol indükler.' }), B(c, [z2, ad2], 600));
    c.note('<b>Polar molekül ile apolar tanecik: dipol-indüklenmiş dipol.</b> Örnek: HCl–He.', 'Dipol-indüklenmiş dipol', 'dipol-induklenmis-dipol');
  }

  /* ---- 5. İki apolar tanecik: London kuvveti ---- */
  async function london(c) {
    const svg = c.svg(1000, 562);
    const Y = 130;
    const a = uzayDolgu(c, svg, 'H2', 330, Y, { olcek: 1.7, golge: ESIT(2), deltaPunto: 26 }), b = uzayDolgu(c, svg, 'H2', 670, Y, { olcek: 1.7, golge: ESIT(2), deltaPunto: 26 });
    // δ etiketleri: solda δ⁻ sol atomda, δ⁺ sağ atomda; sağdaki molekülde de aynı yön.
    const etA = c.S('g', {}, svg), etB = c.S('g', {}, svg);
    [[a, etA], [b, etB]].forEach(([m, g]) => {
      G.delta(c, g, m.atomlar[0].x, m.atomlar[0].y - m.atomlar[0].r - 12, '-', 26);
      G.delta(c, g, m.atomlar[1].x, m.atomlar[1].y - m.atomlar[1].r - 12, '+', 26);
    });
    const yogA = [0.75, 0.14];
    const z = cekim(c, svg, [a.atomlar[1].x + a.atomlar[1].r + 16, Y], [b.atomlar[0].x - b.atomlar[0].r - 16, Y], { w: 6 });
    const lk = yazi(c, svg, 500, Y + 100, 'London kuvveti', { size: 30, kalin: 700, renk: RENK.vurgu });
    // Alt sıra: iki He ve iki O₂.
    const heA = bulutAtom(c, svg, 140, 400, { r: 52, aci: 180, elektron: 0, etiket: true, deltaPunto: 22 }), heB = bulutAtom(c, svg, 440, 400, { r: 52, aci: 180, elektron: 0, etiket: true, deltaPunto: 22 });
    const oA = uzayDolgu(c, svg, 'O2', 700, 400, { olcek: 1.0, harf: false, golge: yogA, delta: [[0, '-', 'ust'], [1, '+', 'ust']], deltaPunto: 22 });
    const oB = uzayDolgu(c, svg, 'O2', 900, 400, { olcek: 1.0, harf: false, golge: yogA, delta: [[0, '-', 'ust'], [1, '+', 'ust']], deltaPunto: 22 });
    const zHe = cekim(c, svg, [140 + 92 + 26, 400], [440 - 92 - 26, 400], { w: 5 }), zO = cekim(c, svg, [oA.atomlar[1].x + oA.atomlar[1].r + 10, 400], [oB.atomlar[0].x - oB.atomlar[0].r - 10, 400], { w: 5 });
    const altG = [heA.g, heB.g, oA.g, oB.g, oA.golgeG, oB.golgeG, oA.deltaG, oB.deltaG, zHe, zO];
    Gz(a.g, b.g, a.golgeG, b.golgeG, etA, etB, z, lk, altG);
    a.golgeG.style.opacity = 0; b.golgeG.style.opacity = 0;
    heA.ayarla(1); heB.ayarla(1);
    await par(c.say('İki H<sub>2</sub> molekülü yan yana gelsin; ikisi de apolardır.', { speak: 'İki H iki molekülü yan yana gelsin; ikisi de apolardır.' }), B(c, [a.g, b.g], 600));
    // Sol molekülün bulutu sola yığılır.
    a.daireler.forEach((d, i) => d.setAttribute('fill-opacity', ESIT(2)[i]));
    b.daireler.forEach((d, i) => d.setAttribute('fill-opacity', ESIT(2)[i]));
    a.golgeG.style.opacity = 1; b.golgeG.style.opacity = 1;
    await par(c.say('Birinde elektron bulutu bir an yığılır ve geçici dipol oluşur.'), a.golge(yogA, 900).then(() => B(c, etA, 500)));
    await par(c.say('Bu geçici dipol, komşu molekülde de bir dipol indükler.'), b.golge(yogA, 900).then(() => B(c, etB, 500)));
    await par(c.say('İki dipolün zıt uçları arasında çekim kurulur.'), B(c, z, 500));
    await par(c.say('Buna indüklenmiş dipol-indüklenmiş dipol etkileşimi, yani London kuvveti denir.'), B(c, lk, 500));
    await par(c.say('Soy gaz atomları ve apolar moleküller arasında bu çekim etkindir.'), B(c, altG, 700));
    await c.say('Elektron sayısı fazla ve bulut yaygınsa London kuvveti artar.');

    // Sor: O₂–O₂.
    c.clearSay();
    await B(c, [a.g, b.g, etA, etB, z, lk, altG], 450, 0);
    const p = cift(c, svg, 'O2', 'O2', 500, 250, { olcek: 1.5, bosluk: 120, cizgi: false, harf: false, golge: ESIT(2) });
    const etP = c.S('g', {}, svg);
    [p.A, p.B].forEach((m) => { G.delta(c, etP, m.atomlar[0].x, m.atomlar[0].y - m.atomlar[0].r - 12, '-', 28); G.delta(c, etP, m.atomlar[1].x, m.atomlar[1].y - m.atomlar[1].r - 12, '+', 28); });
    const z2 = cekim(c, svg, [p.xa + p.wa + 14, 250], [p.xb - p.wb - 14, 250], { w: 6 });
    const lk2 = yazi(c, svg, 500, 400, 'London kuvveti', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(p.g, z2, lk2, etP);
    await B(c, p.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'O<sub>2</sub> molekülleri arasında etkin olan çekim hangisidir?',
      options: ['Dipol-dipol', 'İyon-dipol', 'London kuvveti'], answer: 2,
      hints: ['O₂ apolar bir moleküldür.'.replace('O₂', 'O<sub>2</sub>'), 'O₂ apolar bir moleküldür; iyon yok.'.replace('O₂', 'O<sub>2</sub>'), ''],
      right: 'Evet. Apolar moleküller arasında London kuvveti etkindir.',
    });
    await par(c.say('O<sub>2</sub> apolardır: moleküller arasında London kuvveti etkindir.', { speak: 'O iki apolardır: moleküller arasında London kuvveti etkindir.' }),
      par(p.A.golge(yogA, 900), p.B.golge(yogA, 900)).then(() => B(c, [etP, z2, lk2], 600)));
    c.note('<b>Apolar tanecikler arasında London kuvveti etkindir.</b> Örnek: He–He.', 'London kuvveti', 'london');
  }

  /* ---- 6. Beş etkileşim, tek tablo ---- */
  async function bes(c) {
    const svg = c.svg(1000, 562);
    const m = matris5(c, svg, { x: 200, y: 150, w: 250, h: 100, ad: false });
    const vd = yazi(c, svg, 500, 520, 'van der Waals', { size: 32, kalin: 700, renk: RENK.vurgu });
    Gz(m.g, vd);
    await par(c.say('Etkileşimin adı, etkileşen taneciklerin türünden çıkar.'), B(c, m.g, 700));
    await par(c.say('Polar molekül, etkileşimin adına “dipol” olarak girer.'), m.hucre.pp.yaz());
    await par(c.say('Apolar molekül ve soy gaz atomu “indüklenmiş dipol” olarak girer.'), m.hucre.pa.yaz().then(() => m.hucre.aa.yaz()));
    await par(c.say('İyon, adına “iyon” olarak girer.'), m.hucre.pi.yaz().then(() => m.hucre.ia.yaz()));
    await par(c.say('İki tanecik türü yan yana gelince etkileşimin adı çıkar.'), m.hucre.ii.yaz());
    const vurgu = ['pp', 'pa', 'aa'];
    await par(c.say('London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimlerine birlikte van der Waals kuvvetleri denir.', { speak: 'London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimlerine birlikte van der Vals kuvvetleri denir.' }),
      (() => { vurgu.forEach((id) => m.hucre[id].g.firstChild.setAttribute('stroke', 'var(--c5)')); return B(c, vd, 500); })());

    // Birlikte çöz: Na⁺ ve He.
    c.clearSay();
    await B(c, [m.g, vd], 450, 0);
    const na = tanecik(c, svg, 'Na+', 330, 150, { olcek: 1.6 }), he = tanecik(c, svg, 'He', 670, 150, { olcek: 2.0 });
    const s1 = yazi(c, svg, 500, 330, 'Na^{+}: iyon · He: soy gaz atomu → indüklenmiş dipol', { size: 26, kalin: 600, math: true });
    const s2 = yazi(c, svg, 500, 420, 'Etkileşim: ?', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(na.g, he.g, s1, s2);
    await B(c, [na.g, he.g, s1, s2], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Na<sup>+</sup> ile He arasındaki etkileşimin adı nedir?',
      options: ['İyon-dipol', 'İndüklenmiş dipol-indüklenmiş dipol', 'İyon-indüklenmiş dipol'], answer: 2,
      hints: ['İyon, iyon olarak girer; soy gaz atomu dipol olarak girmez.', 'İyon, iyon olarak girer.', ''],
      right: 'Evet. İyon ile soy gaz atomu: iyon-indüklenmiş dipol.',
    });
    s2.textContent = 'Etkileşim: iyon-indüklenmiş dipol';
    await c.say('İyon ile soy gaz atomu: iyon-indüklenmiş dipol.');
    c.note('<b>Polar: dipol. Apolar, soy gaz: indüklenmiş dipol. İyon: iyon.</b> Na<sup>+</sup>–He: iyon-indüklenmiş dipol.', 'Etkileşimin adı', 'etkilesimin-adi');

    // Sor: NH₃ ve CH₄.
    c.clearSay();
    await B(c, [na.g, he.g, s1, s2], 450, 0);
    const p = cift(c, svg, 'NH3', 'CH4', 500, 170, { olcek: 1.0, bosluk: 100 });
    const q1 = yazi(c, svg, 500, 400, 'NH_{3} polardır, CH_{4} apolardır', { size: 28, kalin: 600, math: true });
    Gz(p.g, q1);
    await B(c, [p.g, q1], 600);
    await c.choice({
      tag: 'Sıra sende', q: 'NH<sub>3</sub> ile CH<sub>4</sub> arasındaki etkileşimin adı nedir?',
      options: ['Dipol-dipol', 'Dipol-indüklenmiş dipol', 'İndüklenmiş dipol-indüklenmiş dipol'], answer: 1,
      hints: ['NH₃ polardır, CH₄ apolardır.'.replace('NH₃', 'NH<sub>3</sub>').replace('CH₄', 'CH<sub>4</sub>'), '', 'Polar molekül dipol, apolar molekül indüklenmiş dipol olarak girer.'],
      right: 'Evet. Polar molekül dipol, apolar molekül indüklenmiş dipol olarak girer.',
    });
    await c.say('Polar NH<sub>3</sub> ile apolar CH<sub>4</sub>: dipol-indüklenmiş dipol.', { speak: 'Polar N H üç ile apolar C H dört: dipol-indüklenmiş dipol.' });
    c.note('<b>van der Waals: London, dipol-dipol, dipol-indüklenmiş dipol.</b> Örnek: He–He.', 'van der Waals', 'van-der-waals');
  }

  /* ---- 7. Madde çiftlerini adlandır ---- */
  async function tablo(c) {
    const svg = c.svg(1000, 562);
    const AD = ['dipol-dipol', 'iyon-dipol', 'dipol-indüklenmiş dipol', 'iyon-indüklenmiş dipol', 'indüklenmiş dipol-indüklenmiş dipol (London)'];
    const KISA = ['dipol-dipol', 'iyon-dipol', 'dipol-indüklenmiş dipol', 'iyon-indüklenmiş dipol', 'London'];
    const K = [
      ['He', 'He', 4, 'İkisi de soy gaz atomu.'], ['O2', 'O2', 4, 'İki apolar molekül.'], ['H2S', 'H2S', 0, 'İki polar molekül.'],
      ['CH4', 'HF', 2, 'HF polar, CH<sub>4</sub> apolar.'], ['Mg2+', 'CO2', 3, 'Mg<sup>2+</sup> iyon, CO<sub>2</sub> apolar.'], ['CH4', 'N2', 4, 'İki apolar molekül.'],
      ['Na+', 'H2O', 1, 'Na<sup>+</sup> iyon, H<sub>2</sub>O polar.'], ['He', 'Ne', 4, 'İki soy gaz atomu.'], ['Cl-', 'H2O', 1, 'Cl<sup>−</sup> iyon, H<sub>2</sub>O polar.'],
      ['HF', 'BH3', 2, 'HF polar, BH<sub>3</sub> apolar.'], ['NH3', 'HF', 0, 'İki polar molekül.'], ['CO', 'BH3', 2, 'CO polar (iki atomlu, elektronegatifliği farklı), BH<sub>3</sub> apolar.'],
    ];
    const KART = K.map(([a, b, kutu, neden]) => ({ a, b, kutu, neden, html: ch(a, b), ipucu: 'Önce iki taneciğin türüne bak: polar, apolar, iyon, soy gaz.' }));
    const tb = maddeTablosu(c, svg, K.map(([a, b]) => cf(a, b)), { x: 20, y: 40, w: 560, satir: 41, sol: 200, puntoSol: 24, puntoSag: 20 });
    Gz(tb.g);
    let kart = null;
    await par(c.say('On iki çiftin etkileşimini tabloya yazalım.'), B(c, tb.g, 600));
    await sinifla(c, {
      tag: 'Adlandır', kutular: AD, kartlar: KART,
      soru: (k) => `<b>${k.html}</b> çifti arasındaki etkileşimin adı nedir?`,
      sec: async (i, k) => {
        if (!i) c.clearSay();
        if (i === 6) await tb.soluk(0, 6, 0.12, 400);
        tb.satirG[i].firstChild.setAttribute('stroke', 'var(--c5)');
        kart = c.S('g', {}, svg); Gz(kart);
        cift(c, kart, k.a, k.b, 790, 230, { serit: true, boy: 120, olcek: 0.85, bosluk: 70, etiket: false, harf: !(k.a === 'O2'), cw: 5 });
        await B(c, kart, 350);
      },
      yerlestir: async (i, k) => {
        tb.satirG[i].firstChild.setAttribute('stroke', RENK.kenarlik);
        await B(c, kart, 250, 0); kart.remove();
        await tb.doldur(i, KISA[k.kutu]);
      },
    });
    await c.say('On iki çiftin hepsinde etkileşim, taneciklerin türünden çıktı.');
  }

  Ders.start({
    id: 'cesitlilik-g3', kicker: 'Konu G · Moleküller arası etkileşimler', title: 'İndüklenmiş dipol: apolar tanecikler de etkileşir', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'İndüklenmiş dipol: apolar tanecikler de etkileşir',
      hook: 'Soy gaz atomlarının artı ya da eksi ucu yok; yine de birbirlerini çekebilirler mi?',
      button: 'Derse başla ›',
    },
    goals: ['Soy gaz atomunda ve apolar molekülde geçici dipolün oluştuğunu açıklar.', 'Dipol-indüklenmiş dipol, iyon-indüklenmiş dipol ve London kuvvetini ayırt eder.', 'Beş etkileşimin adını taneciklerin türünden çıkarır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Dipol-dipol etkileşimini ve apolar molekülü hatırla.', run: hatirla },
      { title: 'Soy gaz atomunda anlık kutuplaşma', goal: 'Geçici dipolü gör.', run: anlik },
      { title: 'İyon yaklaşınca', goal: 'İyonun apolar taneciğe dipol indüklediğini gör.', run: iyon },
      { title: 'Polar molekül yaklaşınca', goal: 'Polar molekülün dipol indüklediğini gör.', run: polar },
      { title: 'İki apolar tanecik: London kuvveti', goal: 'London kuvvetini tanı.', run: london },
      { title: 'Beş etkileşim, tek tablo', goal: 'Etkileşimin adını taneciklerin türünden çıkar.', run: bes },
      { title: 'Madde çiftlerini adlandır', goal: 'On iki çiftin etkileşimini adlandır.', run: tablo },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İki argon atomu arasındaki etkileşim hangisidir?',
        options: ['Dipol-dipol', 'İndüklenmiş dipol-indüklenmiş dipol (London)', 'İyon-dipol'], answer: 1,
        why: ['Argon atomunun kalıcı dipolü yok; dipol-dipol için iki polar molekül gerekir.', 'Soy gaz atomları arasında geçici dipollerin çekimi etkindir: London kuvveti.', 'İyon yok; iki tanecik de yüksüz atomdur.'], scene: 4 },
      { q: 'K<sup>+</sup> iyonu bir CF<sub>4</sub> molekülüne yaklaşıyor. Etkileşim hangisidir?',
        options: ['İyon-dipol', 'Dipol-indüklenmiş dipol', 'İyon-indüklenmiş dipol'], answer: 2,
        why: ['İyon-dipol için polar molekül gerekir; CF<sub>4</sub> merkez karbonda çift olmadığı için apolardır.', 'Polar molekül yok; yaklaşan tanecik bir iyon.', 'İyon, apolar CF<sub>4</sub>\'te dipol indükler: iyon-indüklenmiş dipol.'], scene: 5 },
      { q: 'H<sub>2</sub>O ile Ne arasındaki etkileşim hangisidir?',
        options: ['Dipol-indüklenmiş dipol', 'Dipol-dipol', 'İyon-dipol'], answer: 0,
        why: ['Polar H<sub>2</sub>O, soy gaz atomu Ne\'de dipol indükler.', 'Neon polar bir molekül değildir.', 'İyon yok; iki tanecik de yüksüz.'], scene: 5 },
      { q: 'CH<sub>4</sub> molekülleri arasında etkileşim olur mu?',
        options: ['Olmaz; CH<sub>4</sub> apolardır', 'Olmaz; CH<sub>4</sub>\'ün dipol momenti sıfırdır', 'Olur; London kuvveti etkindir'], answer: 2,
        why: ['Apolar moleküller de geçici dipoller oluşturur ve birbirini çeker.', 'Dipol momentinin sıfır olması, geçici dipolün oluşmasını engellemez.', 'Apolar moleküller arasında geçici dipollerin çekimi olan London kuvveti etkindir.'], scene: 4 },
      { q: 'Hangisi van der Waals kuvvetlerinden biridir?',
        options: ['İyon-dipol', 'İyon-indüklenmiş dipol', 'Dipol-indüklenmiş dipol'], answer: 2,
        why: ['İyon-dipol, van der Waals kuvvetleri arasında sayılmaz.', 'İyon-indüklenmiş dipol, van der Waals kuvvetleri arasında sayılmaz.', 'London, dipol-dipol ve dipol-indüklenmiş dipol birlikte van der Waals kuvvetleridir.'], scene: 5 },
    ],
    summary: ['Apolar tanecikte yük dağılımı geçici bozulur.', 'Yaklaşan tanecik dipol indükler.', 'Beş etkileşimin adı taneciklerin türünden çıkar.', '<b>Dipolü olmayan tanecikte de dipol indüklenir.</b>'],
    nextLesson: { href: 'g4-hidrojen-bagi.html', label: 'Sonraki ders ›' },
  });
})();
