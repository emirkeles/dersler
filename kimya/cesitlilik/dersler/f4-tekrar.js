/* F4 — Konu tekrarı: Bileşiklerin adlandırılması
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/F-bilesiklerin-adlandirilmasi.md (F4). Seslendirme yok.
   Tahtada altı küçük pano durur; her kural kendi panosuna çizilir, biten pano soluklaşır. Kuralın uzun hâli altyazıda ve defterdedir. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, kutu, gizle, belir, par } = window.KIT;
  const { oku, yaz, iyon, adOnEk, atom } = window.KIT_F;
  const A = RENK.arti, B = RENK.eksi;

  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const W = 300, Hh = 230, PX = (i) => 25 + (i % 3) * 325, PY = (i) => 40 + Math.floor(i / 3) * 255;
    const cerceve = c.S('g', {}, svg);
    for (let i = 0; i < 6; i++) kutu(c, cerceve, PX(i), PY(i), W, Hh, { rx: 14 });
    gizle(cerceve);
    const cx = (i) => PX(i) + W / 2, y0 = (i) => PY(i);
    const pano = [0, 1, 2, 3, 4, 5].map(() => c.S('g', {}, svg));

    // 1. İyonik: Na2S, sodyum sülfür.
    yaz(c, pano[0], cx(0), y0(0) + 95, [['Na', A], ['_{2}', A], ['S', B]], { size: 54, kalin: 700 });
    renkli(c, pano[0], cx(0), y0(0) + 175, [['sodyum ', A], ['sülfür', B]], { size: 30, kalin: 600 });
    // 2. Çok atomlu iyon: kalsiyum karbonat.
    iyon(c, pano[1], cx(1) - 80, y0(1) + 85, 'arti', 'Ca^{2+}', { r: 34, size: 22 });
    iyon(c, pano[1], cx(1) + 55, y0(1) + 85, 'eksi', 'CO_{3}^{2−}', { kutu: true, w: 120, h: 50, size: 22 });
    renkli(c, pano[1], cx(1), y0(1) + 175, [['kalsiyum ', A], ['karbonat', B]], { size: 30, kalin: 600 });
    // 3. Çok katyonlu metal: demir(III) klorür.
    iyon(c, pano[2], cx(2), y0(2) + 85, 'arti', 'Fe^{3+}', { r: 38, size: 24 });
    renkli(c, pano[2], cx(2), y0(2) + 175, [['demir', A], ['(III)', A], [' klorür', B]], { size: 30, kalin: 600 });
    // 4. Kovalent: karbon tetraklorür.
    yaz(c, pano[3], cx(3), y0(3) + 95, ['CCl_{4}'], { size: 54, kalin: 700 });
    adOnEk(c, pano[3], cx(3), y0(3) + 175, 'karbon tetraklorür', { size: 30 });
    // 5. İlk elementte mono yok; oksit önünde ünlü düşer.
    adOnEk(c, pano[4], cx(4), y0(4) + 65, 'karbon monoksit', { size: 30 });
    const sol = yazi(c, pano[4], cx(4) - 6, y0(4) + 135, '', { hiza: 'end', size: 30, kalin: 800 });
    c.S('tspan', { text: 'tetr' }, sol); const unlu = c.S('tspan', { text: 'a' }, sol); unlu.style.fill = RENK.itme; unlu.style.opacity = 0.35;
    yazi(c, pano[4], cx(4) + 8, y0(4) + 135, 'oksit', { hiza: 'start', size: 30, kalin: 500, renk: '#b4bddf' });
    adOnEk(c, pano[4], cx(4), y0(4) + 200, '', { size: 30, parcalar: ['→ ', ['tetr', true], 'oksit'] });
    // 6. Formülde sıra: elektronegatifliği az olan öne.
    atom(c, pano[5], cx(5) - 70, y0(5) + 85, 'C', 34); atom(c, pano[5], cx(5) + 70, y0(5) + 85, 'Cl', 34);
    yazi(c, pano[5], cx(5) - 70, y0(5) + 170, '2,55', { size: 30, kalin: 700, renk: RENK.soluk });
    yazi(c, pano[5], cx(5) + 70, y0(5) + 170, '3,16', { size: 30, kalin: 700, renk: RENK.soluk });
    gizle(pano);
    const sonrakiyle = (i) => belir(c, pano[i], 500);
    const soldur = (i) => belir(c, pano[i], 400, 0.3);

    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, cerceve, 500));
    await par(c.say('İyonik bileşikte önce katyonun, sonra anyonun adı yazılır; sayı yazılmaz.'), sonrakiyle(0));
    c.note('<b>İyonik: katyon adı, anyon adı; sayı yok.</b><br>Na<sub>2</sub>S: sodyum sülfür.', 'İyonik bileşik', 'tekrar-iyonik');
    await par(c.say('Çok atomlu iyon, aynı kuralı değiştirmez.'), soldur(0), sonrakiyle(1));
    await par(c.say('Çok katyonlu metalde ad, yükü Romen rakamıyla söyler.'), soldur(1), sonrakiyle(2));
    c.note('<b>Çok katyonlu metal: Romen rakamı.</b><br>FeCl<sub>3</sub>: demir(III) klorür.', 'Çok katyonlu metal', 'tekrar-romen');
    await par(c.say('Kovalent bileşikte ön ek, atom sayısını söyler.'), soldur(2), sonrakiyle(3));
    c.note('<b>Kovalent: ön ek atom sayısını söyler.</b><br>CCl<sub>4</sub>: karbon tetraklorür.', 'Kovalent bileşik', 'tekrar-kovalent');
    await par(c.say('İlk elementte mono yazılmaz; oksit önünde son ünlü düşer.'), soldur(3), sonrakiyle(4));
    await par(c.say('Formülde elektronegatifliği az olan öne yazılır.'), soldur(4), sonrakiyle(5));
  }

  Ders.start({
    id: 'cesitlilik-f4', kicker: 'Konu F · Bileşiklerin adlandırılması', title: 'Konu tekrarı: Bileşiklerin adlandırılması', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Bileşiklerin adlandırılması',
      hook: 'Üç adlandırma kuralını karıştırmadan kullanabiliyor musun? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Li<sub>2</sub>SO<sub>4</sub> bileşiğinin adı hangisidir?',
        options: ['Dilityum sülfat', 'Lityum sülfat', 'Sülfat lityum'], answer: 1,
        why: ['İyonik bileşiğin adında sayı yazılmaz; “di” ön eki kullanılmaz.', 'Katyon lityum, anyon sülfat; önce katyonun adı yazılır, sayı yazılmaz.', 'Önce katyonun adı yazılır, anyonun adı sonra gelir.'], scene: 0 },
      { q: 'Stronsiyum klorürün formülü hangisidir?',
        options: ['SrCl<sub>2</sub>', 'SrCl', 'Sr<sub>2</sub>Cl'], answer: 0,
        why: ['Sr<sup>2+</sup> 2+ yüklüdür; iki Cl<sup>−</sup> 2− ile dengeler.', 'Bir Cl<sup>−</sup> 1−, Sr<sup>2+</sup> 2+ yükünü dengelemez.', 'İki Sr<sup>2+</sup> 4+ eder; bir Cl<sup>−</sup> bunu dengelemez.'], scene: 0 },
      { q: 'Ba(CH<sub>3</sub>COO)<sub>2</sub> bileşiğinin adı hangisidir?',
        options: ['Baryum iki asetat', 'Asetat baryum', 'Baryum asetat'], answer: 2,
        why: ['Adlarda sayı yazılmaz; parantez ve dış indis ada girmez.', 'Önce katyonun adı yazılır: baryum.', 'Katyon baryum, anyon asetat; çok atomlu iyon kuralı değiştirmez.'], scene: 0 },
      { q: 'FeS bileşiğinde demirin yükü 2+\'dır. Bileşiğin adı hangisidir?',
        options: ['Demir(II) sülfür', 'Demir(III) sülfür', 'Demir sülfür'], answer: 0,
        why: ['Demir birden çok katyon verir; yükü 2+ olduğu için demir(II) yazılır.', 'III, 3+ yük demektir; burada demir 2+ taşır.', 'Demir çok katyonlu bir metaldir; ad yükü de söylemelidir.'], scene: 0 },
      { q: 'Kurşun(II) oksit bileşiğinin formülü hangisidir?',
        options: ['PbO<sub>2</sub>', 'Pb<sub>2</sub>O', 'PbO'], answer: 2,
        why: ['İki O<sup>2−</sup> 4− eder; kurşun 4+ olsaydı kurşun(IV) oksit olurdu.', 'İki Pb<sup>2+</sup> 4+ eder; bir O<sup>2−</sup> bunu dengelemez.', 'Pb<sup>2+</sup> 2+, O<sup>2−</sup> 2− eder; birer iyon yeter.'], scene: 0 },
      { q: 'Bir öğrenci Fe<sub>2</sub>O<sub>3</sub>\'e “demir(II) oksit” diyor. Hata nedir?',
        options: ['Oksidin adını yanlış yazmış', 'Romen rakamını demir atomu sayısından almış; demirin yükü 3+', 'Metalin adını sona yazmış'], answer: 1,
        why: ['Oksit doğru; hata Romen rakamında.', 'İki demir 6+ taşır; her biri 3+ olur. Rakam atom sayısını değil, yükü gösterir: demir(III) oksit.', 'Metalin adı doğru yerde, başta.'], scene: 0 },
      { q: 'Hangi bileşiğin adında Romen rakamı kullanılmaz?',
        options: ['SnCl<sub>2</sub>', 'CoCl<sub>2</sub>', 'ZnCl<sub>2</sub>'], answer: 2,
        why: ['Kalay birden çok katyon verir; kalay(II) klorür.', 'Kobalt birden çok katyon verir; kobalt(II) klorür.', 'Çinko yalnız Zn<sup>2+</sup> verir; adı çinko klorür, rakam yok.'], scene: 0 },
      { q: 'NF<sub>3</sub> bileşiğinin adı hangisidir?',
        options: ['Azot triflorür', 'Monoazot triflorür', 'Azot flor'], answer: 0,
        why: ['İlk element azot ön eksiz; üç flor: triflorür.', 'İlk elementte “mono” kullanılmaz.', 'Kovalent bileşikte atom sayısı ön ekle söylenir; üç flor var.'], scene: 0 },
      { q: 'CO bileşiğinin adı hangisidir?',
        options: ['Monokarbon monoksit', 'Karbon monoksit', 'Karbon monooksit'], answer: 1,
        why: ['Karbon ilk elementtir; ilk elementte “mono” kullanılmaz.', 'İlk elementte ön ek yok; ikinci elementte mono kullanılır ve oksit önünde ünlü düşer: monoksit.', 'Mono, oksit önünde son ünlüsünü bırakır: monoksit.'], scene: 0 },
      { q: 'Aşağıdakilerden hangi ikisi aynı kuralla adlandırılır?',
        options: ['FeO ve N<sub>2</sub>O', 'NH<sub>4</sub>Cl ve CaCl<sub>2</sub>', 'SF<sub>6</sub> ve CuCl'], answer: 1,
        why: ['FeO Romen rakamlı, N<sub>2</sub>O Latince ön eklidir; kuralları farklı.', 'İkisi de iyonik ve tek katyonlu: katyon adı, anyon adı. Amonyum klorür ve kalsiyum klorür.', 'SF<sub>6</sub> ön ekli, CuCl Romen rakamlı adlandırılır; kuralları farklı.'], scene: 0 },
    ],
    summary: [
      'İyonik bileşikte önce katyonun, sonra anyonun adı yazılır; sayı yazılmaz.',
      'Çok katyonlu metalde ad, yükü Romen rakamıyla söyler.',
      'Kovalent bileşikte ön ek atom sayısını söyler; ilk elementte mono yok.',
      '<b>Adın nasıl kurulacağını bileşiğin türü belirler; metalin yükünü ya da atomların sayısını ad söyler.</b>',
    ],
    nextLesson: { href: 'g1-tanecikler-arasi-etkilesim.html', label: 'Sonraki konu: Moleküller arası etkileşimler ›' },
  });
})();
