/* G2 — Dipol-dipol ve iyon-dipol
   Polar moleküllerin kalıcı dipolü vardır. İki polar molekül zıt kutuplarıyla birbirini çeker: dipol-dipol. İyon ile polar molekül arasındaki çekim: iyon-dipol.
   Senaryo: plan/kimya/cesitlilik/senaryolar/G-molekuller-arasi-etkilesimler.md ("G2"). Sıra plan/KURALLAR.md 3.2'ye göredir. Seslendirme yok.
   Hidrojen bağı G4'tedir, apolar tanecikli etkileşimler G3'tedir. Kuvvet değeri ve sıralaması yok. Çizimler şematiktir. */
(() => {
  'use strict';
  const { RENK, yazi, par, sinifla, yon, ileri } = window.KIT;
  const G = window.KIT_G;
  const { B, Gz, cf, ch, tanecik, cift, cekim, serit, uzayDolgu, golgeOf, DLT, itmeOklari, kartCevir, kartTahtasi } = G;

  /* İki yuvarlak tanecik (merkez x, y; yarıçap r) arasında, kenarlardan pay kadar içeride kalan çizgi uçları. */
  const kenar = (P, r1, Q, r2, pay = 10) => { const a = yon(P, Q); return [ileri(P, a, r1 + pay), ileri(Q, a, -(r2 + pay))]; };

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const p1 = cift(c, svg, 'Na+', 'H2O', 500, 280, { olcek: 1.4, bosluk: 70 });
    const hc = uzayDolgu(c, svg, 'HCl', 500, 280, { olcek: 2.4 });
    Gz(p1.g, hc.g);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), B(c, p1.g, 600));
    await c.choice({
      tag: 'Hatırla', q: 'Na<sup>+</sup> ile H<sub>2</sub>O arasındaki etkileşim hangi sınıfa girer?',
      options: ['İyon-molekül', 'Molekül-molekül', 'Atom-atom'], answer: 0,
      hints: ['', 'Bir iyon ile bir molekül karşılaşıyor; bu iyon-molekül etkileşimidir.', 'Bir iyon ile bir molekül karşılaşıyor; bu iyon-molekül etkileşimidir.'],
      right: 'Evet. İyon ile molekül karşılaşıyor.',
    });
    c.clearSay();
    await B(c, p1.g, 400, 0);
    await B(c, hc.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'H–Cl bağında ortak elektronlar hangi atomun çevresinde daha yoğundur?',
      options: ['Hidrojen', 'Klor', 'İkisinde eşit'], answer: 1,
      hints: ['Elektronegatifliği büyük olan klor, ortak elektronları kendine çeker.', '', 'Elektronegatifliği büyük olan klor, ortak elektronları kendine çeker.'],
      right: 'Evet. Klor ortak elektronları kendine çeker.',
    });
    await c.say('Bugün polar moleküllerin birbirini nasıl çektiğine bakacağız.', { speak: '[curious] Bugün polar moleküllerin birbirini nasıl çektiğine bakacağız.' });
  }

  /* ---- 2. Polar molekülün iki ucu ---- */
  async function iki(c) {
    const svg = c.svg(1000, 562);
    const m = uzayDolgu(c, svg, 'HCl', 500, 290, { olcek: 2.4, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 32 });
    const s = serit(c, svg, 500, 290, { boy: 260, kalin: 64, deltaPunto: 34, ad: 'HCl' });
    const kd = yazi(c, svg, 500, 470, 'kalıcı dipol', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(m.g, m.golgeG, m.deltaG, s.g, kd);
    await par(c.say('HCl\'de ortak elektronlar klor çevresinde daha yoğundur.', { speak: 'H Cl\'de ortak elektronlar klor çevresinde daha yoğundur.' }),
      B(c, m.g, 500).then(() => B(c, m.golgeG, 700)));
    await par(c.say('Klor ucu kısmen eksi (δ<sup>−</sup>), hidrojen ucu kısmen artıdır (δ<sup>+</sup>).', { speak: 'Klor ucu kısmen eksi, delta eksi; hidrojen ucu kısmen artıdır, delta artı.' }), B(c, m.deltaG, 500));
    await par(c.say('Bu iki kutup kalıcıdır; bu yapıya kalıcı dipol denir.'), B(c, kd, 500));
    await c.say('Polar moleküller, kalıcı dipolü olan moleküllerdir.');
    await par(c.say('Dipoli kısaca şerit olarak çizeriz: turuncu artı, mavi eksi.'), B(c, m.g, 500, 0).then(() => B(c, s.g, 600)));

    // Sor: NH₃.
    c.clearSay();
    await B(c, [s.g, kd], 400, 0);
    const n = uzayDolgu(c, svg, 'NH3', 500, 285, { olcek: 1.8, golge: golgeOf('NH3'), delta: DLT.NH3, deltaPunto: 28 });
    const en = yazi(c, svg, 500, 60, 'N 3,04 · H 2,20', { size: 30, kalin: 700 });
    Gz(n.g, n.golgeG, n.deltaG, en);
    await B(c, [n.g, en], 500);
    await c.choice({
      tag: 'Sıra sende', q: 'NH<sub>3</sub> molekülünde hangi uç kısmen eksidir?',
      options: ['Hidrojen ucu', 'Azot ucu', 'İkisi de'], answer: 1,
      hints: ['Elektronlar elektronegatifliği büyük atomun çevresinde yoğundur.', '', 'Elektron bulutunun yoğun olduğu uç eksi kutuptur.'],
      right: 'Evet. Elektronlar azotun çevresinde yoğundur.',
    });
    await par(c.say('Azot elektronegatiftir: azot ucu δ<sup>−</sup>, hidrojen uçları δ<sup>+</sup>.', { speak: 'Azot elektronegatiftir: azot ucu delta eksi, hidrojen uçları delta artı.' }),
      B(c, n.golgeG, 600).then(() => B(c, n.deltaG, 500)));
  }

  /* ---- 3. İki polar molekül yaklaşınca ---- */
  async function yaklasinca(c) {
    const svg = c.svg(1000, 562);
    const L = 180, Y = 150;
    const sa = serit(c, svg, 290, Y, { boy: L, kalin: 46, deltaPunto: 28, ad: 'HCl' });
    const sb = serit(c, svg, 710, Y, { boy: L, kalin: 46, deltaPunto: 28, ad: 'HCl', aci: 180 });
    const itme = itmeOklari(c, svg, sa.eksi(), sb.eksi(), 46);
    const cz = cekim(c, svg, [290 + L / 2 + 14, Y], [710 - L / 2 - 14, Y], { w: 6 });
    const ma = uzayDolgu(c, svg, 'HCl', 300, 400, { olcek: 1.3, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 26 });
    const mb = uzayDolgu(c, svg, 'HCl', 700, 400, { olcek: 1.3, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 26 });
    const cz2 = cekim(c, svg, [ma.atomlar[1].x + ma.atomlar[1].r + 12, 400], [mb.atomlar[0].x - mb.atomlar[0].r - 12, 400], { w: 6 });
    Gz(sa.g, sb.g, itme, cz, ma.g, mb.g, cz2);
    await par(c.say('İki HCl molekülü yan yana gelsin.', { speak: 'İki H Cl molekülü yan yana gelsin.' }), B(c, [sa.g, sb.g], 600));
    await par(c.say('Aynı kutuplar birbirini iter, zıt kutuplar çeker.'), B(c, itme, 500));
    await B(c, itme, 300, 0);
    await par(c.say('Moleküller, zıt kutupları karşı karşıya gelecek biçimde dizilir.'), sb.don(0, 1100));
    await par(c.say('Ayrı moleküllerdeki zıt kutuplar arasında elektriksel çekim kurulur.'), B(c, cz, 500).then(() => B(c, [ma.g, mb.g, cz2], 600)));
    await c.choice({
      tag: 'Sıra sende', q: 'Bir HCl molekülünün hidrojen ucuna, öteki molekülün hangi ucu yönelir?',
      options: ['Hidrojen ucu (δ<sup>+</sup>)', 'Klor ucu (δ<sup>−</sup>)', 'Hiçbir ucu'], answer: 1,
      hints: ['Hidrojen ucu artıdır; zıt kutup çeker.', '', 'Aynı kutuplar itiyordu.'],
      right: 'Evet. Artı uç, eksi uca yönelir.',
    });
    await c.say('Artı uç, öteki molekülün eksi ucuna döner.');
  }

  /* ---- 4. Üç kart: ortak olan ne? ---- */
  async function ucKart(c) {
    const svg = c.svg(1000, 562);
    const X = [20, 350, 680], W = 300, Y = 90, H = 220;
    const K = [['HCl', 'HCl'], ['H2S', 'H2S'], ['HCl', 'H2S']];
    const kartlar = K.map(([a, b], i) => kartCevir(c, svg, X[i], Y, W, H, String(i + 1), (g) => {
      const cc = cift(c, g, a, b, X[i] + W / 2, Y + 105, { serit: true, boy: 120, bosluk: 56, olcek: 0.9, cw: 5 });
      // δ etiketleri yerine renk: kartta yazı sayısı az kalsın.
      [cc.A, cc.B].forEach((q) => q.deltaG.remove());
    }));
    const tur = X.map((x) => yazi(c, svg, x + W / 2, 355, 'polar molekül–polar molekül', { size: 22, kalin: 700, renk: RENK.vurgu }));
    Gz(tur);
    await c.say('Üç kartı da çevir.', { noWait: true });
    const AD = ['Birinci', 'İkinci', 'Üçüncü'];
    for (let i = 0; i < 3; i++) {
      await c.cont(`${AD[i]} kartı çevir ›`);
      await kartlar[i].cevir(700);
      await B(c, tur[i], 400);
    }
    c.clearSay();
    await c.say('Birinci ve ikinci kartta iki molekül aynı türdendir.');
    await c.say('Üçüncü kartta farklı türden iki molekül karşılaşmıştır.');
    await c.say('Üç kartta da etkileşen iki taneciğin kalıcı dipolü vardır.');
    await c.choice({
      tag: 'Sıra sende', q: 'Üç kartta etkileşen taneciklerin ortak özelliği nedir?',
      options: ['İkisi de aynı türden molekül', 'İkisi de polar molekül', 'İkisi de iyon'], answer: 1,
      hints: ['Üçüncü kartta moleküller farklı türden.', '', 'Üç kartta da iki taneciğin de kalıcı dipolü var.'],
      right: 'Evet. Üç kartta da iki polar molekül var.',
    });
    await c.say('Aynı ya da farklı tür fark etmez: iki polar molekül yeter.');
    await c.say('Polar molekül–polar molekül grubunun bilimdeki adı dipol-dipol etkileşimidir.');
    c.note('<b>Polar molekül ile polar molekül: dipol-dipol.</b> Örnek: HCl–HCl.', 'Dipol-dipol', 'dipol-dipol');

    // Birlikte çöz: H₂S ve NCl₃.
    c.clearSay();
    await B(c, [kartlar.map((k) => k.g), tur], 450, 0);
    const a = uzayDolgu(c, svg, 'H2S', 270, 180, { olcek: 1.2 }), b = uzayDolgu(c, svg, 'NCl3', 730, 190, { olcek: 1.05 });
    const s1 = yazi(c, svg, 500, 345, 'H_{2}S: polar (merkez kükürtte iki çift)', { size: 26, kalin: 600, math: true });
    const s2 = yazi(c, svg, 500, 395, 'NCl_{3}: polar (merkez azotta bir çift)', { size: 26, kalin: 600, math: true });
    const s3 = yazi(c, svg, 500, 465, 'Etkileşim: ?', { size: 32, kalin: 700, renk: RENK.vurgu });
    Gz(a.g, b.g, s1, s2, s3);
    await B(c, [a.g, b.g, s1, s2, s3], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'H<sub>2</sub>S ile NCl<sub>3</sub> arasında hangi etkileşim olur?',
      options: ['İyon-dipol', 'Etkileşim olmaz', 'Dipol-dipol'], answer: 2,
      hints: ['İyon yok; iki tanecik de molekül.', 'İkisi de polar molekül.', ''],
      right: 'Evet. Polar molekül ile polar molekül karşılaşıyor.',
    });
    s3.textContent = 'Etkileşim: dipol-dipol';
    const z = cekim(c, svg, [a.x + a.w + 20, 185], [b.x - b.w - 20, 185], { w: 6 }); Gz(z);
    await par(c.say('İkisi de polar: farklı tür olsalar da dipol-dipol kurarlar.'), B(c, z, 500));
  }

  /* ---- 5. İyon ile polar molekül ---- */
  async function iyonPolar(c) {
    const svg = c.svg(1000, 562);
    const su = uzayDolgu(c, svg, 'H2O', 500, 290, { olcek: 1.5, golge: golgeOf('H2O'), delta: [[0, '-', 'sol'], [1, '+', 'sol'], [2, '+', 'sag']], deltaPunto: 28 });
    const O = su.atomlar[0], H1 = su.atomlar[1], H2 = su.atomlar[2];
    const na = tanecik(c, svg, 'Na+', 500, 90, { olcek: 1.2 }), cl = tanecik(c, svg, 'Cl-', 500, 490, { olcek: 1.2 });
    const zNa = cekim(c, svg, [500, 90 + 41 + 8], [500, O.y - O.r - 8], { w: 6 });
    const zCl1 = cekim(c, svg, [cl.x - 16, cl.y - 50], [H1.x + 10, H1.y + H1.r + 8], { w: 6 }), zCl2 = cekim(c, svg, [cl.x + 16, cl.y - 50], [H2.x - 10, H2.y + H2.r + 8], { w: 6 });
    const ad = yazi(c, svg, 830, 290, 'iyon-dipol', { size: 34, kalin: 700, renk: RENK.vurgu });
    Gz(su.g, su.golgeG, su.deltaG, na.g, cl.g, zNa, zCl1, zCl2, ad);
    await par(c.say('Polar molekül, iyonla da çekim kurar.'), B(c, su.g, 500).then(() => B(c, [su.golgeG, su.deltaG], 600)));
    await par(c.say('Na<sup>+</sup> artı yüklüdür; suyun eksi ucu olan oksijene yaklaşır.', { speak: 'Sodyum artı, artı yüklüdür; suyun eksi ucu olan oksijene yaklaşır.' }),
      B(c, na.g, 500).then(() => B(c, zNa, 500)));
    await par(c.say('Cl<sup>−</sup> eksi yüklüdür; suyun artı ucu olan hidrojenlere yaklaşır.', { speak: 'Klorür eksi yüklüdür; suyun artı ucu olan hidrojenlere yaklaşır.' }),
      B(c, cl.g, 500).then(() => B(c, [zCl1, zCl2], 500)));
    await par(c.say('İyon ile polar molekül arasındaki çekime iyon-dipol etkileşimi denir.'), B(c, ad, 500));
    await c.say('Tuz suda çözünürken iyonlar su moleküllerinin kutuplarıyla etkileşir.');
    c.note('<b>İyon ile polar molekül: iyon-dipol.</b> Örnek: Na<sup>+</sup>–H<sub>2</sub>O.', 'İyon-dipol', 'iyon-dipol');

    // Birlikte çöz: K⁺ ve HCl.
    c.clearSay();
    await B(c, [su.g, su.golgeG, su.deltaG, na.g, cl.g, zNa, zCl1, zCl2, ad], 450, 0);
    const k = tanecik(c, svg, 'K+', 190, 250, { olcek: 1.4 });
    const hc = uzayDolgu(c, svg, 'HCl', 640, 250, { olcek: 2.0, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 30 });
    const s1 = yazi(c, svg, 500, 420, 'K^{+} artı yüklü: eksi ucu çeker', { size: 26, kalin: 600, math: true });
    const s2 = yazi(c, svg, 500, 480, 'K^{+}\'ya dönük uç: ?', { size: 30, kalin: 700, renk: RENK.vurgu, math: true });
    Gz(k.g, hc.g, hc.golgeG, hc.deltaG, s1, s2);
    await B(c, [k.g, hc.g, hc.golgeG, hc.deltaG, s1, s2], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'HCl\'nin hangi ucu K<sup>+</sup>\'ya döner?',
      options: ['Hidrojen ucu (δ<sup>+</sup>)', 'Klor ucu (δ<sup>−</sup>)', 'Fark etmez'], answer: 1,
      hints: ['Artı iyon eksi kutba yaklaşır.', '', 'HCl\'de eksi kutup klorda.'],
      right: 'Evet. Artı iyon eksi kutba yönelir.',
    });
    // Molekül çevrilir: klor ucu K⁺'ya bakar.
    const hc2 = uzayDolgu(c, svg, 'HCl', 640, 250, { olcek: 2.0, golge: golgeOf('HCl'), delta: DLT.HCl, deltaPunto: 30, ayna: true });
    Gz(hc2.g, hc2.golgeG, hc2.deltaG);
    Ders.mathText(s2, 'K^{+}\'ya dönük uç: klor');
    const zk = cekim(c, svg, [k.x + k.w + 12, 250], [hc2.atomlar[1].x - hc2.atomlar[1].r - 12, 250], { w: 6 }); Gz(zk);
    await par(c.say('K<sup>+</sup> iyonuna klor ucu döner.', { speak: 'Potasyum artı iyonuna klor ucu döner.' }),
      B(c, [hc.g, hc.golgeG, hc.deltaG], 400, 0).then(() => B(c, [hc2.g, hc2.golgeG, hc2.deltaG, zk], 600)));

    // Sor: Ca²⁺ ve NH₃.
    c.clearSay();
    await B(c, [k.g, hc2.g, hc2.golgeG, hc2.deltaG, zk, s1, s2], 450, 0);
    const ca = tanecik(c, svg, 'Ca2+', 220, 130, { olcek: 1.3 });
    const n = uzayDolgu(c, svg, 'NH3', 640, 300, { olcek: 1.7, golge: golgeOf('NH3'), delta: DLT.NH3, deltaPunto: 26 });
    const en = yazi(c, svg, 500, 60, 'N 3,04 · H 2,20', { size: 30, kalin: 700 });
    Gz(ca.g, n.g, n.golgeG, n.deltaG, en);
    await B(c, [ca.g, n.g, en], 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Ca<sup>2+</sup> iyonu NH<sub>3</sub> molekülüne yaklaşıyor. NH<sub>3</sub>\'ün hangi ucu Ca<sup>2+</sup>\'ya döner?',
      options: ['Hidrojen ucu (δ<sup>+</sup>)', 'Fark etmez', 'Azot ucu (δ<sup>−</sup>)'], answer: 2,
      hints: ['Ca²⁺ artı yüklü bir iyon.'.replace('Ca²⁺', 'Ca<sup>2+</sup>'), 'NH₃\'te eksi kutup azotta.'.replace('NH₃', 'NH<sub>3</sub>'), ''],
      right: 'Evet. Artı iyon eksi kutba yönelir.',
    });
    const [zc1, zc2] = kenar([ca.x, ca.y], ca.w, [n.atomlar[0].x, n.atomlar[0].y], n.atomlar[0].r), zc = cekim(c, svg, zc1, zc2, { w: 6 }); Gz(zc);
    await par(c.say('Artı iyon, polar molekülün eksi ucuna yönelir.'), B(c, [n.golgeG, n.deltaG, zc], 700));
  }

  /* ---- 6. Hangi çift hangi etkileşim? ---- */
  async function ciftler(c) {
    const svg = c.svg(1000, 562);
    const SINIF = ['dipol-dipol', 'iyon-dipol', 'ikisi de değil'];
    const K = [
      ['HCl', 'HCl', 0, 'İki polar molekül; aynı tür.'], ['H2S', 'H2S', 0, 'İki polar molekül; merkez kükürtte iki çift var.'],
      ['NCl3', 'H2S', 0, 'İki polar molekül; farklı tür olması fark etmez.'], ['Na+', 'H2O', 1, 'İyon ile polar molekül.'],
      ['Cl-', 'H2O', 1, 'İyon ile polar molekül.'], ['Ca2+', 'NH3', 1, 'İyon ile polar molekül.'],
      ['O2', 'O2', 2, 'O<sub>2</sub> apolardır; polar molekül yok.'], ['He', 'He', 2, 'Helyum bir atomdur; polar molekül yok.'],
      ['Mg2+', 'CO2', 2, 'CO<sub>2</sub> polar bağlıdır ama apolardır; iyon-dipol için polar molekül gerekir.'], ['CH4', 'HF', 2, 'CH<sub>4</sub> apolardır; iki polar molekül yok.'],
    ];
    const KART = K.map(([a, b, kutu_, neden]) => ({ a, b, kutu: kutu_, neden, f: cf(a, b), html: ch(a, b), ipucu: 'Polar molekül var mı? İki tanecik de ne türden?' }));
    const st = kartTahtasi(c, svg, {
      kutular: [0, 1, 2].map((i) => ({ x: 30 + i * 325, y: 270, w: 305, h: 270, baslik: SINIF[i], punto: 26, kol: 2, ust: 90, satir: 46 })),
      kart: { x: 500, y: 130 }, fY: 108, kartPunto: 34, chipPunto: 24,
      ciz: (k, g) => { cift(c, g, k.a, k.b, 500, 130, { serit: true, boy: 130, olcek: 0.85, bosluk: 70, harf: !(k.a === 'O2'), deltaPunto: 24 }); },
    });
    Gz(st.kutularEl.map((e) => e.g));
    await par(c.say('On çifti, taneciklerin türüne göre üç kutuya ayıralım.'), B(c, st.kutularEl.map((e) => e.g), 600));
    await sinifla(c, {
      tag: 'Sınıflandır', kutular: SINIF, kartlar: KART,
      soru: (k) => `<b>${k.html}</b> çifti hangi kutuya girer?`,
      sec: (i, k) => { if (!i) c.clearSay(); return st.sec(i, k); }, yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await c.say('Polar molekül olmayan çiftler bu iki gruba girmedi.');
  }

  Ders.start({
    id: 'cesitlilik-g2', kicker: 'Konu G · Moleküller arası etkileşimler', title: 'Dipol-dipol ve iyon-dipol', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Dipol-dipol ve iyon-dipol',
      hook: 'Bir ucu artı, bir ucu eksi olan iki molekül yan yana gelince birbirine hangi uçlarıyla döner?',
      button: 'Derse başla ›',
    },
    goals: ['Polar molekülün kalıcı dipolünü şerit olarak gösterir.', 'İki polar molekül arasındaki etkileşimi dipol-dipol olarak adlandırır.', 'İyon ile polar molekül arasındaki etkileşimi iyon-dipol olarak adlandırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'İyon-molekül sınıfını ve polar bağı hatırla.', run: hatirla },
      { title: 'Polar molekülün iki ucu', goal: 'Kalıcı dipolü ve dipol şeridini tanı.', run: iki },
      { title: 'İki polar molekül yaklaşınca', goal: 'Zıt kutupların birbirine döndüğünü gör.', run: yaklasinca },
      { title: 'Üç kart: ortak olan ne?', goal: 'Dipol-dipol etkileşiminin ölçütünü bul.', run: ucKart },
      { title: 'İyon ile polar molekül', goal: 'İyon-dipol etkileşimini tanı.', run: iyonPolar },
      { title: 'Hangi çift hangi etkileşim?', goal: 'On çifti üç kutuya ayır.', run: ciftler },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'HCl moleküllerinin kendi aralarındaki etkileşim hangisidir?',
        options: ['İyon-dipol', 'Atom-atom', 'Dipol-dipol'], answer: 2,
        why: ['İyon yok; iki tanecik de moleküldür.', 'HCl bir moleküldür, soy gaz atomu değil.', 'İki polar molekül zıt kutuplarıyla birbirini çeker: dipol-dipol.'], scene: 2 },
      { q: 'Li<sup>+</sup> iyonu NH<sub>3</sub> molekülüne yaklaşıyor. Aralarındaki etkileşim hangisidir?',
        options: ['Dipol-dipol', 'İyon-dipol', 'Etkileşim olmaz'], answer: 1,
        why: ['Li<sup>+</sup> bir iyondur; iki polar molekül karşılaşmıyor.', 'Bir iyon ile polar molekül arasındaki etkileşim iyon-dipoldür.', 'İyon ile polar molekül birbirini çeker.'], scene: 4 },
      { q: 'Mg<sup>2+</sup> ile CO<sub>2</sub> arasında iyon-dipol etkileşimi oluşur mu?',
        options: ['Oluşur; Mg<sup>2+</sup> bir iyondur', 'Oluşmaz; CO<sub>2</sub> apolar bir moleküldür', 'Oluşur; CO<sub>2</sub>\'de polar bağlar vardır'], answer: 1,
        why: ['İyon-dipol için iyonun yanında polar molekül de gerekir.', 'Merkez karbonda çift yok; CO<sub>2</sub> apolardır, iyon-dipol oluşmaz.', 'Bağlar polar olsa da molekülün dipol momenti sıfırdır.'], scene: 5 },
      { q: 'Dipol-dipol etkileşimi için hangisi doğrudur?',
        options: ['Yalnızca aynı türden iki molekül arasında olur', 'Bir polar molekül ile bir iyon arasında olur', 'İki polar molekül aynı ya da farklı türden olabilir'], answer: 2,
        why: ['H<sub>2</sub>S ile NCl<sub>3</sub> gibi farklı türden polar moleküller de dipol-dipol kurar.', 'Polar molekül ile iyon arasındaki etkileşim iyon-dipoldür.', 'İki taneciğin de polar olması yeter; tür fark etmez.'], scene: 3 },
      { q: 'Br<sup>−</sup> iyonu bir H<sub>2</sub>O molekülüne yaklaşıyor. Suyun hangi ucu Br<sup>−</sup>\'ya döner?',
        options: ['Oksijen ucu (δ<sup>−</sup>)', 'İki ucu da', 'Hidrojen ucu (δ<sup>+</sup>)'], answer: 2,
        why: ['Eksi iyon, eksi kutbu iter.', 'Molekülün yalnızca bir ucu iyona yönelir; ikisi birden olamaz.', 'Eksi iyon, suyun artı ucu olan hidrojenlere yönelir.'], scene: 4 },
    ],
    summary: ['Polar molekülün kalıcı dipolü vardır.', 'Zıt kutuplar birbirini çeker.', 'Polar–polar dipol-dipol, iyon–polar iyon-dipol etkileşimidir.', '<b>Polar molekül polar molekülle dipol-dipol, iyonla iyon-dipol etkileşir.</b>'],
    nextLesson: { href: 'g3-induklenmis-dipol.html', label: 'Sonraki ders ›' },
  });
})();
