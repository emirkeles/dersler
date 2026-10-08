/* G1 — Tanecikler arası etkileşim: kim kiminle?
   Etkileşim yalnızca iki molekül arasında olmaz; iyonlar ve soy gaz atomları da etkileşir. Etkileşimlerin sınıfını karşılaşan taneciklerin türü belirler:
   molekül-molekül, iyon-molekül, atom-atom. Bilimsel adlar (dipol-dipol vb.) bu derste verilmez.
   Senaryo: plan/kimya/cesitlilik/senaryolar/G-molekuller-arasi-etkilesimler.md ("G1"). Sıra plan/KURALLAR.md 3.2'ye göredir. Seslendirme yok.
   Çizimler şematiktir: çekim çizgisi ve ok boyları kuvvet değeri taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, par, sinifla } = window.KIT;
  const G = window.KIT_G;
  const { B, Gz, html, cf, ch, tanecik, cift, uzayDolgu, golgeOf, DLT, lewis, bardakSu, geckoAyak } = G;

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const su = uzayDolgu(c, svg, 'H2O', 500, 280, { olcek: 2.2, golge: golgeOf('H2O') });
    const cl = tanecik(c, svg, 'Cl-', 500, 270, { olcek: 2.6 });
    Gz(su.g, cl.g);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), B(c, su.g, 600));
    await c.choice({
      tag: 'Hatırla', q: 'Dipol momenti sıfırdan farklı olan molekül nasıl adlandırılır?',
      options: ['Polar molekül', 'Apolar molekül', 'İyon'], answer: 0,
      hints: ['', 'Dipol momenti sıfırdan farklıysa kalıcı kutuplar vardır; molekül polardır.', 'Dipol momenti sıfırdan farklıysa kalıcı kutuplar vardır; molekül polardır.'],
      right: 'Evet. Kalıcı kutuplar var; molekül polardır.',
    });
    c.clearSay();
    await B(c, su.g, 400, 0);
    await B(c, cl.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Cl<sup>−</sup> hangi tür iyondur?',
      options: ['Katyon', 'Apolar molekül', 'Anyon'], answer: 2,
      hints: ['Elektron alan ametal atomu, eksi yüklü anyona dönüşür.', 'Elektron alan ametal atomu, eksi yüklü anyona dönüşür.', ''],
      right: 'Evet. Elektron alan ametal atomu, eksi yüklü anyona dönüşür.',
    });
    await c.say('Bugün bu taneciklerin birbirini nasıl çektiğine bakacağız.', { speak: '[curious] Bugün bu taneciklerin birbirini nasıl çektiğine bakacağız.' });
  }

  /* ---- 2. Taneciklerin arasındaki çekim ---- */
  async function cekimSahnesi(c) {
    const svg = c.svg(1000, 562);
    const b = bardakSu(c, svg);
    const tBag = yazi(c, svg, b.ornekX, b.bagY + 46, 'bağ', { size: 26, kalin: 700 });
    const tCek = [yazi(c, svg, b.ornekX, b.cekY + 40, 'tanecikler', { size: 26, kalin: 700 }), yazi(c, svg, b.ornekX, b.cekY + 72, 'arası çekim', { size: 26, kalin: 700 })];
    Gz(b.bardak, b.buyutme, b.cekim, b.ornek, tBag, tCek);
    await par(c.say('Maddeyi oluşturan temel tanecikler atom, molekül ya da iyondur.'), B(c, b.bardak, 600));
    await par(c.say('Taneciklerin arasında, zıt yüklerin çekimine dayanan elektrostatik kuvvetler vardır.'), B(c, b.buyutme, 700));
    await par(c.say('Bu çekimler, katı ve sıvı maddeleri bir arada tutan kuvvetlerdir.'), B(c, b.cekim, 800));
    await c.say('Bir bardak suyun molekülleri de bu çekimle bir arada durur.');
    await par(c.say('Tanecikler arası çekimler metalik, iyonik ve kovalent bağdan daha zayıftır.'), B(c, [b.ornek, tBag, tCek], 700));
  }

  /* ---- 3. Dört tür tanecik ---- */
  async function dortTur(c) {
    const svg = c.svg(1000, 562);
    const X = [125, 375, 625, 875], W = 232;
    const kart = X.map((x) => { const g = c.S('g', {}, svg); kutu(c, g, x - W / 2, 40, W, 440, { rx: 14 }); return g; });
    const baslik = ['soy gaz atomu', 'iyon', 'polar molekül', 'apolar molekül'].map((t, i) => yazi(c, svg, X[i], 90, t, { size: 24, kalin: 700, renk: RENK.vurgu }));
    const he = tanecik(c, svg, 'He', X[0], 270, { olcek: 2.1 });
    const na = tanecik(c, svg, 'Na+', X[1] - 58, 270, { olcek: 1.2 }), cl = tanecik(c, svg, 'Cl-', X[1] + 56, 270, { olcek: 1.2 });
    const su = uzayDolgu(c, svg, 'H2O', X[2], 276, { olcek: 1.05, harf: false, golge: golgeOf('H2O'), delta: [[0, '-', 'ust'], [1, '+', 'alt'], [2, '+', 'alt']], deltaPunto: 24 });
    const ok2 = uzayDolgu(c, svg, 'O2', X[3], 270, { olcek: 1.45, harf: false, golge: golgeOf('O2') });
    const f = [yazi(c, svg, X[2], 140, 'H_{2}O', { size: 28, kalin: 700, math: true }), yazi(c, svg, X[3], 140, 'O_{2}', { size: 28, kalin: 700, math: true })];
    const dm = [
      [yazi(c, svg, X[2], 400, 'dipol momenti:', { size: 22, kalin: 500, renk: RENK.soluk }), yazi(c, svg, X[2], 436, 'sıfırdan farklı', { size: 24, kalin: 700 })],
      [yazi(c, svg, X[3], 400, 'dipol momenti:', { size: 22, kalin: 500, renk: RENK.soluk }), yazi(c, svg, X[3], 436, 'sıfır', { size: 24, kalin: 700 })],
    ];
    Gz(kart, baslik, he.g, na.g, cl.g, su.g, ok2.g, su.golgeG, su.deltaG, ok2.golgeG, f, dm);
    const sonuk = (...gs) => par(...gs.map((q) => B(c, q, 400, 0.4)));
    await par(c.say('Soy gazlar tek atomludur; helyum bir soy gaz atomudur.'), B(c, [kart[0], baslik[0], he.g], 600));
    await par(sonuk(kart[0], baslik[0], he.g), c.say('İyon, elektron alıp vermiş yüklü taneciktir: Na<sup>+</sup>, Cl<sup>−</sup>.', { speak: 'İyon, elektron alıp vermiş yüklü taneciktir: sodyum artı, klorür.' }),
      B(c, [kart[1], baslik[1], na.g, cl.g], 600));
    await par(sonuk(kart[1], baslik[1], na.g, cl.g), c.say('Molekül, kovalent bağlı atom grubudur.'), B(c, [kart[2], kart[3], su.g, ok2.g, f], 600));
    await par(c.say('Dipol momenti sıfırdan farklı molekül polardır: H<sub>2</sub>O.', { speak: 'Dipol momenti sıfırdan farklı molekül polardır: H iki O.' }),
      B(c, [baslik[2], su.golgeG], 600).then(() => B(c, [su.deltaG, dm[0]], 500)));
    await par(c.say('Dipol momenti sıfır olan molekül apolardır: O<sub>2</sub>.', { speak: 'Dipol momenti sıfır olan molekül apolardır: O iki.' }),
      B(c, [baslik[3], ok2.golgeG], 600).then(() => B(c, dm[1], 500)));
    await B(c, [kart, baslik, he.g, na.g, cl.g, su.g, f, dm], 400, 1);
    await c.say('Etkileşen taneciklerin her biri bu dört türden biridir.');

    // Birlikte çöz: NH₃.
    c.clearSay();
    await B(c, [kart, baslik, he.g, na.g, cl.g, su.g, ok2.g, f, dm, su.golgeG, su.deltaG, ok2.golgeG], 450, 0);
    const L = lewis(c, svg, 'NH3', 215, 250, { olcek: 1.75, merkez: 0, cerceve: 0 });
    const s1 = yazi(c, svg, 735, 180, 'Merkez atomda ortaklanmamış çift: var', { size: 24, kalin: 600 });
    const s2 = yazi(c, svg, 735, 240, 'Yük dağılımı: dengede değil', { size: 24, kalin: 600 });
    const s3 = yazi(c, svg, 735, 320, 'Tanecik türü: ?', { size: 30, kalin: 700, renk: RENK.vurgu });
    Gz(L.g, L.halkalar, L.cerceveler, s1, s2, s3);
    await B(c, L.g, 500);
    await par(B(c, [L.halkalar, L.cerceveler], 400), B(c, [s1, s2, s3], 500));
    await c.choice({
      tag: 'Birlikte çöz', q: 'NH<sub>3</sub> hangi tür taneciktir?',
      options: ['Polar molekül', 'Apolar molekül', 'Soy gaz atomu'], answer: 0,
      hints: ['', 'Yük dengede değilse dipol momenti sıfırdan farklıdır.', 'Dipol momenti sıfırdan farklı olan molekül hangisiydi?'],
      right: 'Evet. Merkez azotta çift var; molekül polardır.',
    });
    s3.textContent = 'Tanecik türü: polar molekül';
    await c.say('Merkez azotta çift var: NH<sub>3</sub> polar moleküldür.', { speak: 'Merkez azotta çift var: N H üç polar moleküldür.' });

    // Sor: CO₂.
    c.clearSay();
    await B(c, [L.g, L.halkalar, L.cerceveler, s1, s2, s3], 450, 0);
    const L2 = lewis(c, svg, 'CO2', 500, 250, { olcek: 2.0, merkez: 0, soluk: [1, 2] });
    Gz(L2.g); await B(c, L2.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'CO<sub>2</sub> hangi tür taneciktir?',
      options: ['Apolar molekül', 'Polar molekül', 'İyon'], answer: 0,
      hints: ['', 'Önce merkez atomda ortaklanmamış çift ara.', 'Oksijenlerin çifti merkez atomda değil.'],
      right: 'Evet. Merkez karbonda çift yok; molekül apolardır.',
    });
    await c.say('Merkez karbonda çift yok: CO<sub>2</sub> apolar moleküldür.', { speak: 'Merkez karbonda çift yok: C O iki apolar moleküldür.' });
  }

  /* ---- 4. İki tanecik karşılaşınca ---- */
  async function ikiTanecik(c) {
    const svg = c.svg(1000, 562);
    const X = [170, 500, 830], Y = 235;
    const cd = [
      cift(c, svg, 'He', 'He', X[0], Y, { olcek: 1.15, bosluk: 56 }),
      cift(c, svg, 'Na+', 'H2O', X[1], Y, { olcek: 1.0, bosluk: 56 }),
      cift(c, svg, 'O2', 'O2', X[2], Y, { olcek: 0.95, bosluk: 52, harf: false }),
    ];
    const SINIF = ['atom-atom', 'iyon-molekül', 'molekül-molekül'];
    const et = SINIF.map((t, i) => yazi(c, svg, X[i], 375, t, { size: 30, kalin: 700, renk: RENK.vurgu }));
    Gz(cd.map((q) => q.g), et);
    await par(c.say('İki helyum atomu yaklaşınca aralarında çekim oluşur.'), B(c, cd[0].g, 600));
    await par(c.say('Soy gaz atomları arasındaki etkileşim, atom-atom etkileşimidir.'), B(c, et[0], 500));
    await par(c.say('Na<sup>+</sup> iyonu ile H<sub>2</sub>O molekülü de birbirini çeker.', { speak: 'Sodyum artı iyonu ile H iki O molekülü de birbirini çeker.' }), B(c, cd[1].g, 600));
    await par(c.say('İyon ile molekül arasındaki etkileşim, iyon-molekül etkileşimidir.'), B(c, et[1], 500));
    await par(c.say('İki O<sub>2</sub> molekülü arasındaki etkileşim, molekül-molekül etkileşimidir.', { speak: 'İki O iki molekülü arasındaki etkileşim, molekül-molekül etkileşimidir.' }), B(c, [cd[2].g, et[2]], 600));
    await c.say('Etkileşim yalnızca moleküller arasında olmaz; iyonlar ve atomlar da etkileşir.');

    // Tablo: üç sütun.
    c.clearSay();
    await B(c, [cd.map((q) => q.g), et], 450, 0);
    const KOL = [30, 350, 670], W = 300;
    const kutular = KOL.map((x, i) => { const g = c.S('g', {}, svg); kutu(c, g, x, 30, W, 250, { rx: 14 }); yazi(c, g, x + W / 2, 70, SINIF[i], { size: 26, kalin: 700, renk: RENK.vurgu }); return g; });
    const chip = (kol, sat, f) => yazi(c, svg, KOL[kol] + W / 2, 130 + sat * 52, f, { size: 28, kalin: 700, math: true });
    const c1 = [chip(0, 0, cf('He', 'He')), chip(1, 0, cf('Na+', 'H2O')), chip(2, 0, cf('O2', 'O2'))];
    Gz(kutular, c1);
    await B(c, [kutular, c1], 600);
    const q1 = yazi(c, svg, 500, 360, cf('He', 'Ne'), { size: 40, kalin: 700, math: true });
    const q2 = yazi(c, svg, 500, 412, 'Ne de bir soy gaz atomu;', { size: 24, kalin: 600 });
    const q3 = yazi(c, svg, 500, 450, 'iki tanecik de: atom', { size: 24, kalin: 600 });
    const q4 = yazi(c, svg, 500, 506, 'Sınıf: ?', { size: 30, kalin: 700, renk: RENK.vurgu });
    Gz(q1, q2, q3, q4);
    await B(c, [q1, q2, q3, q4], 500);
    await c.choice({
      tag: 'Birlikte çöz', q: 'He ile Ne arasındaki etkileşim hangi sınıfa girer?',
      options: ['Atom-atom', 'Molekül-molekül', 'İyon-molekül'], answer: 0,
      hints: ['', 'İki tanecik de soy gaz atomu.', 'Soy gaz atomları arasındaki etkileşimin adı yukarıda.'],
      right: 'Evet. İki soy gaz atomu: atom-atom.',
    });
    q4.textContent = 'Sınıf: atom-atom';
    const hc = chip(0, 1, cf('He', 'Ne')); Gz(hc);
    await par(c.say('He ile Ne de atom-atom etkileşimi kurar.'), B(c, [q1, q2, q3, q4], 400, 0).then(() => B(c, hc, 500)));

    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Bu üç etkileşimi birbirinden ayıran nedir?',
      options: ['Taneciklerin rengi', 'Karşılaşan taneciklerin türü', 'Tanecik sayısı'], answer: 1,
      hints: ['Üç kutuda da etkileşen taneciklerin türü farklı.', '', 'Atom, iyon ve molekül arasındaki fark ne?'],
      right: 'Evet. Atom, iyon ve molekül farklı türlerdir.',
    });
    await c.say('Etkileşimleri taneciklerin türüne göre sınıflandırırız.');

    c.clearSay();
    const mg = cift(c, svg, 'Mg2+', 'CO2', 500, 410, { olcek: 0.85, bosluk: 70 });
    const mgf = yazi(c, svg, 500, 505, cf('Mg2+', 'CO2'), { size: 30, kalin: 700, math: true });
    Gz(mg.g, mgf);
    await B(c, [mg.g, mgf], 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Mg<sup>2+</sup> ile CO<sub>2</sub> arasındaki etkileşim hangi sınıfa girer?',
      options: ['Molekül-molekül', 'Atom-atom', 'İyon-molekül'], answer: 2,
      hints: ['Mg²⁺ bir iyondur, CO₂ bir molekül.', 'Mg²⁺ bir iyondur, CO₂ bir molekül.'.replace('Mg²⁺', 'Mg<sup>2+</sup>').replace('CO₂', 'CO<sub>2</sub>'), ''],
      right: 'Evet. İyon ile molekül karşılaşıyor.',
    });
    const hm = chip(1, 1, cf('Mg2+', 'CO2')); Gz(hm);
    await par(c.say('Mg<sup>2+</sup> iyon, CO<sub>2</sub> molekül: iyon-molekül etkileşimi.', { speak: 'Magnezyum iki artı iyon, C O iki molekül: iyon-molekül etkileşimi.' }),
      B(c, [mg.g, mgf], 400, 0).then(() => B(c, hm, 500)));
  }

  /* ---- 5. Çiftleri ayır ---- */
  async function ciftleriAyir(c) {
    const svg = c.svg(1000, 562);
    const SINIF = ['atom-atom', 'iyon-molekül', 'molekül-molekül'];
    const K = [
      ['He', 'He', 0, 'İkisi de soy gaz atomu.'], ['Na+', 'H2O', 1, 'Na<sup>+</sup> iyon, H<sub>2</sub>O molekül.'], ['O2', 'O2', 2, 'İkisi de molekül.'],
      ['Mg2+', 'CO2', 1, 'Mg<sup>2+</sup> iyon, CO<sub>2</sub> molekül.'], ['H2S', 'H2S', 2, 'İkisi de molekül.'], ['He', 'Ne', 0, 'İkisi de soy gaz atomu.'],
      ['Cl-', 'H2O', 1, 'Cl<sup>−</sup> iyon, H<sub>2</sub>O molekül.'], ['CH4', 'HF', 2, 'İkisi de molekül; biri apolar, biri polar olması sınıfı değiştirmez.'],
      ['N2', 'O2', 2, 'İkisi de molekül; farklı türden olabilir.'], ['NH3', 'HF', 2, 'İkisi de molekül.'],
    ];
    const KART = K.map(([a, b, kutu_, neden]) => ({ a, b, kutu: kutu_, neden, f: cf(a, b), html: ch(a, b), ipucu: 'Tanecik türüne bak: atom mu, iyon mu, molekül mü?' }));
    const st = G.kartTahtasi(c, svg, {
      kutular: [0, 1, 2].map((i) => ({ x: 30 + i * 325, y: 270, w: 305, h: 270, baslik: SINIF[i], punto: 26, kol: 2, ust: 90, satir: 46 })),
      kart: { x: 500, y: 120 }, fY: 112, kartPunto: 34, chipPunto: 24,
      ciz: (k, g) => { cift(c, g, k.a, k.b, 500, 120, { olcek: 0.8, bosluk: 80, harf: k.a !== 'O2' && k.b !== 'O2' }); },
    });
    Gz(st.kutularEl.map((e) => e.g));
    await par(c.say('On çifti, karşılaşan taneciklerin türüne göre üç kutuya ayıralım.'), B(c, st.kutularEl.map((e) => e.g), 600));
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: SINIF, kartlar: KART,
      soru: (k) => `<b>${k.html}</b> çifti hangi kutuya girer?`,
      sec: (i, k) => { if (!i) c.clearSay(); return st.sec(i, k); }, yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await c.say('On çift üç sınıfa ayrıldı; ölçüt taneciklerin türüydü.');
    c.note('<b>Etkileşimin sınıfını, karşılaşan taneciklerin türü belirler.</b> Örnek: Na<sup>+</sup>–H<sub>2</sub>O iyon-molekül.', 'Etkileşimin sınıfı', 'etkilesimin-sinifi');
  }

  /* ---- 6. Gecko'ya dönüş ---- */
  async function gecko(c) {
    const svg = c.svg(1000, 562);
    const G6 = geckoAyak(c, svg);
    const ad = [yazi(c, svg, 170, 490, 'gecko', { size: 26, kalin: 700 }), yazi(c, svg, 500, 490, 'ayak', { size: 26, kalin: 700 }), yazi(c, svg, 830, 490, 'tüycük ucu', { size: 26, kalin: 700 })];
    const on = [yazi(c, svg, 880, 300, 'yaklaşık', { size: 26, kalin: 700, renk: RENK.cekme }), yazi(c, svg, 880, 336, '10 N', { size: 32, kalin: 700, renk: RENK.cekme })];
    Gz(G6.f, G6.gecko, G6.ayak, G6.uc, G6.odak, G6.zoom, G6.ince, G6.kalin, ad, on, G6.hat);
    await B(c, [G6.f, G6.gecko, ad[0]], 600);
    await par(c.say('Geckonun ayağı mikroskobik, çok ince tüycüklerle kaplıdır.'), B(c, [G6.odak, G6.zoom[0]], 400).then(() => B(c, [G6.ayak, ad[1]], 700)));
    await par(c.say('Tüycüklerin uçları o kadar incedir ki yüzeyle moleküler düzeyde etkileşir.'), B(c, [G6.zoom[1]], 300).then(() => B(c, [G6.uc, ad[2]], 700)));
    G6.hat.style.opacity = 1; Gz(...G6.ince);
    const sira = (async () => { for (const l of G6.ince) { await B(c, l, 120); } })();
    await par(c.say('Ayaktaki milyonlarca etkileşimin her biri zayıf bir çekimdir.'), sira);
    await par(c.say('Milyonlarcası toplanınca yaklaşık 10 newtonluk güçlü bir tutunma olur.', { speak: 'Milyonlarcası toplanınca yaklaşık on newtonluk güçlü bir tutunma olur.' }),
      B(c, G6.ince, 600, 0).then(() => B(c, [G6.kalin, on], 700)));
    await c.say('Gecko, yapıştırıcı olmadan bu çekimlerle yüzeye tutunur.');
  }

  Ders.start({
    id: 'cesitlilik-g1', kicker: 'Konu G · Moleküller arası etkileşimler', title: 'Tanecikler arası etkileşim: kim kiminle?', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Tanecikler arası etkileşim: kim kiminle?',
      hook: 'Gecko kertenkelesi dik ve düz bir yüzeyde yapıştırıcı olmadan nasıl yürür?',
      button: 'Derse başla ›',
    },
    goals: ['Etkileşen taneciklerin atom, iyon, polar molekül ya da apolar molekül olduğunu söyler.', 'Etkileşimleri molekül-molekül, iyon-molekül ve atom-atom olarak sınıflandırır.', 'Sınıflandırmanın ölçütünün taneciklerin türü olduğunu açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Polar molekülü ve anyonu hatırla.', run: hatirla },
      { title: 'Taneciklerin arasındaki çekim', goal: 'Tanecikler arasında elektrostatik çekim olduğunu gör.', run: cekimSahnesi },
      { title: 'Dört tür tanecik', goal: 'Atom, iyon, polar ve apolar molekülü ayırt et.', run: dortTur },
      { title: 'İki tanecik karşılaşınca', goal: 'Etkileşimleri taneciklerin türüne göre adlandır.', run: ikiTanecik },
      { title: 'Çiftleri ayır', goal: 'On çifti üç sınıfa ayır.', run: ciftleriAyir },
      { title: 'Gecko\'ya dönüş', goal: 'Gecko\'nun tutunmasını tanecik düzeyinde açıkla.', run: gecko },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Argon bir soy gazdır. İki argon atomu arasındaki etkileşim hangi sınıfa girer?',
        options: ['Molekül-molekül', 'Atom-atom', 'İyon-molekül'], answer: 1,
        why: ['Argon tek atomlu bir soy gazdır; moleküller karşılaşmıyor.', 'İki tanecik de soy gaz atomu olduğu için etkileşim atom-atomdur.', 'İyon yok; iki tanecik de yüksüz bir atomdur.'], scene: 3 },
      { q: 'Moleküller arası etkileşimler için hangisi doğrudur?',
        options: ['Etkileşim yalnızca iki molekül arasında olur', 'Soy gaz atomları arasında etkileşim olmaz', 'İyon ile molekül arasında da etkileşim olur'], answer: 2,
        why: ['İyonlar ve atomlar da etkileşir; yalnızca moleküller değil.', 'İki helyum atomu arasında da çekim oluşur.', 'Na<sup>+</sup> ile H<sub>2</sub>O gibi iyon ile molekül birbirini çeker.'], scene: 3 },
      { q: 'K<sup>+</sup> ile NH<sub>3</sub> arasındaki etkileşim hangi sınıfa girer?',
        options: ['İyon-molekül', 'Molekül-molekül', 'Atom-atom'], answer: 0,
        why: ['K<sup>+</sup> bir iyon, NH<sub>3</sub> bir molekül: iyon-molekül etkileşimi.', 'İki tanecikten biri iyon; ikisi de molekül değil.', 'K<sup>+</sup> soy gaz atomu değil, iyondur.'], scene: 4 },
      { q: 'CF<sub>4</sub>\'ün merkez karbonunda ortaklanmamış çift yoktur. CF<sub>4</sub> hangi tür taneciktir?',
        options: ['Polar molekül', 'Soy gaz atomu', 'Apolar molekül'], answer: 2,
        why: ['Merkez atomda çift yoksa yük dağılımı dengededir; molekül polar değildir.', 'CF<sub>4</sub> beş atomlu bir moleküldür; soy gazlar tek atomludur.', 'Merkez atomda çift yok; dipol momenti sıfır, molekül apolardır.'], scene: 2 },
      { q: 'Gecko, yapıştırıcı olmadan yüzeye nasıl tutunur?',
        options: ['Ayağındaki milyonlarca zayıf çekimin toplamıyla', 'Ayağındaki tek bir güçlü çekimle', 'Yüzeyle iyonik bağ kurarak'], answer: 0,
        why: ['Her çekim zayıftır; milyonlarcası toplanınca yaklaşık 10 N\'luk tutunma olur.', 'Tek bir çekim bu kadar güçlü olmaz; tutunmayı çok sayıda çekim sağlar.', 'Gecko yüzeyle bağ kurmaz; tüycüklerin uçları yüzeyle etkileşir.'], scene: 5 },
    ],
    summary: ['Tanecikler arasında elektrostatik çekim vardır.', 'Etkileşen tanecikler atom, iyon, polar molekül ya da apolar moleküldür.', 'Etkileşimler molekül-molekül, iyon-molekül ve atom-atom olarak ayrılır.', '<b>Etkileşimin türünü, karşılaşan taneciklerin türü belirler.</b>'],
    nextLesson: { href: 'g2-dipol-dipol-iyon-dipol.html', label: 'Sonraki ders ›' },
  });
})();
