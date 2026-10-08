/* B4 — Konu tekrarı: İyonik bağ
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/B-iyonik-bag.md (B4). Seslendirme yok.
   Tahtada altı küçük pano durur; kuralın uzun hâli altyazıda ve defterdedir, panoda küçük çizim vardır. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, etkilesim } = window.KIT;
  const { iyon } = window.KIT_B;
  const { ease } = Ders;

  /* ---- 1. Konunun kuralları: altı pano ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const W = 300, H = 245, PX = [30, 350, 670], PY = [20, 290];
    const pano = (i, baslik) => {
      const x = PX[i % 3], y = PY[Math.floor(i / 3)], g = c.S('g', {}, svg);
      kutu(c, g, x, y, W, H);
      yazi(c, g, x + W / 2, y + 42, baslik, { size: 26, kalin: 700 });
      g.style.opacity = 0;
      return { g, x, y };
    };
    // Küçük aşama şeridi: altı kutu, vurgulanan iki aşama.
    const seritCiz = (p, vur) => {
      const kut = [];
      for (let k = 0; k < 6; k++) {
        const r = c.S('rect', { x: p.x + 22 + k * 44, y: p.y + 66, width: 36, height: 28, rx: 6, fill: RENK.yuzey, stroke: vur.includes(k + 1) ? RENK.vurgu : RENK.kenarlik, 'stroke-width': vur.includes(k + 1) ? 4 : 2 }, p.g);
        kut.push(r);
      }
      return kut;
    };

    // 1: tepkime aşamaları, katyon ve anyon.
    const p1 = pano(0, 'Katyon ve anyon');
    seritCiz(p1, [4, 5]);
    iyon(c, p1.g, p1.x + 95, p1.y + 170, 'arti', 'Na^{+}', { r: 30, size: 22 }); iyon(c, p1.g, p1.x + 205, p1.y + 170, 'eksi', 'Cl^{−}', { r: 36, size: 22 });
    // 2: önerme kartı, aşamaya çizgi.
    const p2 = pano(1, 'Gözleme dayalı');
    seritCiz(p2, [4]);
    kutu(c, p2.g, p2.x + 40, p2.y + 170, 220, 48, { rx: 12 });
    yazi(c, p2.g, p2.x + 150, p2.y + 202, 'önerme', { size: 24, kalin: 600 });
    cizgi(c, p2.g, [p2.x + 150, p2.y + 170], [p2.x + 172 + 0, p2.y + 94], RENK.vurgu, 4);
    // 3: katyon ile anyon arasında çekim.
    const p3 = pano(2, 'İyonik bağ');
    iyon(c, p3.g, p3.x + 70, p3.y + 150, 'arti', 'Na^{+}', { r: 30, size: 22 }); iyon(c, p3.g, p3.x + 232, p3.y + 150, 'eksi', 'Cl^{−}', { r: 36, size: 22 });
    etkilesim(c, p3.g, [p3.x + 70, p3.y + 150], [p3.x + 232, p3.y + 150], 'cekme', { b: 34, boy: 36 });
    // 4: iyonlaşma enerjisi küçük (veren), elektronegatiflik büyük (alan).
    const p4 = pano(3, 'Veren ve alan');
    yazi(c, p4.g, p4.x + 24, p4.y + 96, 'iyonlaşma enerjisi', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    c.S('rect', { x: p4.x + 24, y: p4.y + 108, width: 80, height: 26, rx: 6, fill: RENK.arti }, p4.g);
    yazi(c, p4.g, p4.x + 24, p4.y + 172, 'elektronegatiflik', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    c.S('rect', { x: p4.x + 24, y: p4.y + 184, width: 250, height: 26, rx: 6, fill: RENK.eksi }, p4.g);
    // 5: Na+ ve çevresinde altı Cl-.
    const p5 = pano(4, 'Kristal'), C5 = [p5.x + 150, p5.y + 146];
    const YER = [[-64, 0], [64, 0], [34, -22], [-34, 22], [0, -62], [0, 62]];
    const cek5 = YER.map(([a, b]) => cizgi(c, p5.g, C5, [C5[0] + a, C5[1] + b], RENK.cekme, 3));
    YER.forEach(([a, b]) => iyon(c, p5.g, C5[0] + a, C5[1] + b, 'eksi', '', { r: 17, size: 18 }));
    iyon(c, p5.g, C5[0], C5[1], 'arti', '', { r: 22, size: 18 });
    // 6: yük terazisi.
    const p6 = pano(5, 'Formül');
    const O = [p6.x + 150, p6.y + 84];
    cizgi(c, p6.g, [O[0] - 88, O[1]], [O[0] + 88, O[1]], RENK.cizgi, 6);
    c.S('path', { d: `M${O[0] - 18},${O[1] + 40} L${O[0]},${O[1]} L${O[0] + 18},${O[1] + 40} Z`, fill: RENK.kenarlik }, p6.g);
    [[-88, 'sol'], [88, 'sag']].forEach(([dx]) => {
      cizgi(c, p6.g, [O[0] + dx, O[1]], [O[0] + dx - 40, O[1] + 44], RENK.ince, 2); cizgi(c, p6.g, [O[0] + dx, O[1]], [O[0] + dx + 40, O[1] + 44], RENK.ince, 2);
      cizgi(c, p6.g, [O[0] + dx - 46, O[1] + 44], [O[0] + dx + 46, O[1] + 44], RENK.cizgi, 5);
    });
    iyon(c, p6.g, O[0] - 88, O[1] + 22, 'arti', '', { r: 17, size: 18 });
    iyon(c, p6.g, O[0] + 70, O[1] + 22, 'eksi', '', { r: 17, size: 18 }); iyon(c, p6.g, O[0] + 106, O[1] + 22, 'eksi', '', { r: 17, size: 18 });
    yazi(c, p6.g, p6.x + 150, p6.y + 204, 'CaCl_{2}', { size: 40, kalin: 700, math: true });

    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), c.wait(300));
    await par(c.say('Metal atomu elektron verip katyon, ametal atomu alıp anyon olur.'), belir(c, p1.g, 500));
    c.note('<b>Metal katyon, ametal anyon olur.</b> Örnek: Na<sup>+</sup>, Cl<sup>−</sup>.', 'Katyon ve anyon', 'tekrar-katyon-anyon');
    await par(c.say('Gözleme dayalı olmayan önerme yanlış olmak zorunda değildir.'), belir(c, p2.g, 500));
    c.note('<b>Gözleme dayalı olmayan önerme yanlış olmak zorunda değildir.</b>', 'Önerme', 'tekrar-onerme');
    await par(c.say('İyonik bağ, katyon ile anyonun elektrostatik çekimidir.', { speak: '[thoughtful] İyonik bağ, katyon ile anyonun elektrostatik çekimidir.' }), belir(c, p3.g, 500));
    c.note('<b>İyonik bağ:</b> katyon ile anyonun elektrostatik çekimi. Örnek: Na<sup>+</sup> ve Cl<sup>−</sup>.', 'İyonik bağ', 'tekrar-iyonik-bag');
    await par(c.say('Düşük iyonlaşma enerjili metal ile yüksek elektronegatifli ametal arasında iyonik bağ oluşur.'), belir(c, p4.g, 500));
    c.note('<b>Düşük iyonlaşma enerjili metal verir, yüksek elektronegatifli ametal alır.</b>', 'Veren ve alan', 'tekrar-veren-alan');
    await par(c.say('Kristalde her iyon, çevresindeki zıt yüklü iyonların hepsini çeker.'), belir(c, p5.g, 500),
      c.wait(600).then(() => c.tween(700, (e) => cek5.forEach((l) => l.setAttribute('stroke-width', 3 + 3 * e)))));
    c.note('<b>Kristalde her iyon, zıt yüklü komşularının hepsini çeker.</b> Örnek: Na<sup>+</sup>, 6 Cl<sup>−</sup>.', 'Kristal', 'tekrar-kristal');
    await par(c.say('Formül, toplam yükü sıfır yapan en az sayıda iyonu gösterir.'), belir(c, p6.g, 500));
    c.note('<b>Formül, yük toplamını sıfır yapan en az iyonu gösterir.</b> Örnek: CaCl<sub>2</sub>.', 'Formül', 'tekrar-formul');
    await c.wait(800);
  }

  Ders.start({
    id: 'cesitlilik-b4', kicker: 'Konu B · İyonik bağ', title: 'Konu tekrarı: İyonik bağ', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: İyonik bağ',
      hook: 'İyonik bağın altı kuralı aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Tepkimede 2 klor molekülü (Cl<sub>2</sub>) tamamen Cl<sup>−</sup> iyonlarına dönüşüyor. Toplam kaç elektron alınır?',
        options: ['2', '8', '4'], answer: 2,
        why: ['2, yalnızca molekül sayısıdır; her molekül iki atoma ayrılır.', 'İki molekülden sekiz değil, dört klor atomu çıkar.', 'İki molekülden dört klor atomu çıkar; her atom bir elektron alır.'], scene: 0 },
      { q: 'Mg<sup>2+</sup> ve F<sup>−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['MgF<sub>2</sub>', 'MgF', 'Mg<sub>2</sub>F'], answer: 0,
        why: ['Bir Mg<sup>2+</sup> 2+ eder; iki F<sup>−</sup> 2− ile dengelenir.', 'Bir F<sup>−</sup> 1−, Mg<sup>2+</sup> 2+ yükünü dengelemez.', 'İki Mg<sup>2+</sup> 4+ eder; bir F<sup>−</sup> bunu dengelemez.'], scene: 0 },
      { q: 'Sodyum ile klor gazının tepkimesi için hangisi gözleme dayalı değildir?',
        options: ['Tepkimede ışık yayıldı.', 'Sodyum, iyonlaşma enerjisi düşük olduğu için elektron verir.', 'Klor molekülleri atomlarına ayrıldı.'], answer: 1,
        why: ['Işık yayılması 2. aşamada görülür.', 'İyonlaşma enerjisi izlenen bir olay değil, bir açıklamadır.', 'Klor moleküllerinin ayrılması 3. aşamada görülür.'], scene: 0 },
      { q: 'Brom atomunun 35 protonu ve 35 elektronu vardır. Bir elektron alınca oluşan iyonun elektron sayısı ve yükü nedir?',
        options: ['34 elektron; 1+', '36 elektron; 1+', '36 elektron; 1−'], answer: 2,
        why: ['Elektron alan atomun elektronu azalmaz, artar.', 'Elektron sayısı doğru, ama elektronlar protonlardan fazla: yük eksi olur.', 'Proton 35, elektron 36: elektronlar bir fazla, yük 1−.'], scene: 0 },
      { q: 'Hangi atom çifti arasında iyonik bağ oluşur?',
        options: ['Mg ile O', 'F ile O', 'Li ile Mg'], answer: 0,
        why: ['Mg elektron verir, O alır.', 'İkisi de elektronu kuvvetle çeker; elektron veren yok.', 'İkisi de elektron verir; alan yok.'], scene: 0 },
      { q: 'İyonik bağ hangi tanecikler arasındaki çekimdir?',
        options: ['Atom çekirdekleri ile iç elektronlar', 'Katyonlar ile anyonlar', 'Aynı yüklü iyonlar'], answer: 1,
        why: ['Bu çekim atomun içinde vardır; bağ değildir.', 'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.', 'Aynı yüklü iyonlar birbirini iter.'], scene: 0 },
      { q: 'Kristaldeki bir Cl<sup>−</sup> iyonu için hangisi doğrudur?',
        options: ['Yalnızca elektronunu aldığı Na<sup>+</sup> ile çekim yapar', 'Çevresindeki Na<sup>+</sup> iyonlarından yalnızca birini çeker', 'Çevresindeki altı Na<sup>+</sup> iyonunun hepsiyle çekim yapar'], answer: 2,
        why: ['Elektron ortamda dolaşır; Cl<sup>−</sup> tek bir iyona bağlı değildir.', 'Çevresindeki altı iyonun çekimi aynı büyüklüktedir.', 'Her Cl<sup>−</sup> iyonu altı Na<sup>+</sup> iyonuyla çevrilidir ve hepsini çeker.'], scene: 0 },
      { q: 'NH<sub>4</sub><sup>+</sup> ve PO<sub>4</sub><sup>3−</sup> iyonlarından oluşan bileşiğin formülü hangisidir?',
        options: ['(NH<sub>4</sub>)<sub>3</sub>PO<sub>4</sub>', 'NH<sub>4</sub>PO<sub>4</sub>', '(NH<sub>4</sub>)<sub>2</sub>PO<sub>4</sub>'], answer: 0,
        why: ['Üç NH<sub>4</sub><sup>+</sup> 3+ eder; bir PO<sub>4</sub><sup>3−</sup> ile dengelenir.', 'Bir NH<sub>4</sub><sup>+</sup> 1+, PO<sub>4</sub><sup>3−</sup> 3− yükünü dengelemez.', 'İki NH<sub>4</sub><sup>+</sup> 2+ eder; 3− yükünü dengelemez.'], scene: 0 },
      { q: 'CaCl<sub>2</sub> formülündeki 2 neyi gösterir?',
        options: ['Ca\'nın yükünün 2 olduğunu', 'Her Ca<sup>2+</sup> için iki Cl<sup>−</sup> bulunduğunu', 'Cl\'nin yükünün 2 olduğunu'], answer: 1,
        why: ['Alt indis iyonun yükünü değil, iyon sayısını gösterir.', 'Alt indis, o iyondan kaç tane olduğunu gösterir.', 'Cl<sup>−</sup> 1− yüklüdür; 2 sayısı iyon sayısıdır.'], scene: 0 },
      { q: 'Rubidyum, potasyumla aynı gruptadır. Rubidyum ile klor gazının tepkimesinde hangi iyonlar oluşur?',
        options: ['Rb<sup>2+</sup> ve Cl<sup>−</sup>', 'Rb<sup>−</sup> ve Cl<sup>+</sup>', 'Rb<sup>+</sup> ve Cl<sup>−</sup>'], answer: 2,
        why: ['Gruptaki metaller yalnızca 1+ yüklü iyon oluşturur.', 'Metal elektron verir, ametal alır; yükler ters yazılmış.', 'Gruptaki metaller 1+ yüklü iyon verir; klor 1− yüklü anyon olur.'], scene: 0 },
    ],
    summary: [
      'Metal elektron verip katyon, ametal elektron alıp anyon olur.',
      'Gözleme dayalı olmayan önerme yanlış olmak zorunda değildir.',
      'İyonik bağ, katyon ile anyonun elektrostatik çekimidir.',
      'Kristalde her iyon, zıt yüklü iyonların hepsini çeker.',
      '<b>Metal elektron verir, ametal alır; artı ile eksi yükler çeker ve formülde dengelenir.</b>',
    ],
    nextLesson: { href: 'c1-elektronlar-ortak-kullanilir.html', label: 'Sonraki konu: Kovalent bağ ›' },
  });
})();
