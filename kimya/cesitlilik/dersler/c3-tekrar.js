/* C3 — Konu tekrarı: Kovalent bağ
   Yeni bilgi yok. Tek sahnede konunun dört kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/C-kovalent-bag.md (C3). Seslendirme yok.
   Tahtada dört küçük pano durur; kuralın uzun hâli altyazıda ve defterdedir, panoda çizim ve kısa etiket vardır. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, gizle, belir, par, ok, yuk, isaret } = window.KIT;
  const { ASAMA, atomYalin, iki } = window.KIT_C;

  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P1 = [30, 20], P2 = [520, 20], P3 = [30, 290], P4 = [520, 290], W = 450, H = 245;
    const cerceve = c.S('g', {}, svg);
    [P1, P2, P3, P4].forEach((p) => kutu(c, cerceve, p[0], p[1], W, H));
    gizle(cerceve);

    // Kural 1: iyon yok; elektron oku üstü çarpılı.
    const g1 = c.S('g', {}, svg);
    yazi(c, g1, P1[0] + W / 2, P1[1] + 46, 'elektron verilmez', { size: 26, kalin: 700 });
    atomYalin(c, g1, [P1[0] + 95, 170], { R: 62, e: 0, ed: 38 }); atomYalin(c, g1, [P1[0] + 355, 170], { R: 62, e: Math.PI, ed: 38 });
    ok(c, g1, [P1[0] + 150, 170], [P1[0] + 300, 170], RENK.eksi, 4);
    isaret(c, g1, P1[0] + 225, 170, 'no', 24);
    gizle(g1);

    // Kural 2: elektronlar iki çekirdeğin çevresinde ortak dolaşır.
    const g2 = c.S('g', {}, svg);
    yazi(c, g2, P2[0] + W / 2, P2[1] + 46, 'ortak kullanılır', { size: 26, kalin: 700 });
    const a = iki(c, g2, { cx: P2[0] + W / 2, cy: 160, d: ASAMA[3].d, tohum: 4 });
    gizle(g2);

    // Kural 3: iki çekirdek de ortak elektronları çeker.
    const g3 = c.S('g', {}, svg);
    yazi(c, g3, P3[0] + W / 2, P3[1] + 46, 'iki çekirdek de çeker', { size: 26, kalin: 700, renk: RENK.cekme });
    const N1 = [P3[0] + 110, 430], N2 = [P3[0] + 340, 430], E1 = [P3[0] + 190, 400], E2 = [P3[0] + 260, 460];
    [N1, N2].forEach((N) => [E1, E2].forEach((E) => {
      const dx = E[0] - N[0], dy = E[1] - N[1], d = Math.hypot(dx, dy), u = [dx / d, dy / d];
      ok(c, g3, [N[0] + u[0] * 24, N[1] + u[1] * 24], [E[0] - u[0] * 14, E[1] - u[1] * 14], RENK.cekme, 3.5);
    }));
    yuk(c, g3, N1, 'arti', 18); yuk(c, g3, N2, 'arti', 18); yuk(c, g3, E1, 'eksi', 10); yuk(c, g3, E2, 'eksi', 10);
    gizle(g3);

    // Kural 4: dört aşamalı süreç; tahmin görselle sınanır.
    const g4 = c.S('g', {}, svg);
    yazi(c, g4, P4[0] + W / 2, P4[1] + 46, 'tahmin görselle sınanır', { size: 26, kalin: 700 });
    [0, 1, 2, 3].forEach((i) => {
      const x = P4[0] + 60 + i * 110;
      iki(c, g4, { cx: x, cy: 410, olcek: 0.3, d: i === 0 ? 180 : ASAMA[i].d, T0: 1.1 * (i + 1), tohum: 4 });
      yazi(c, g4, x, 482, String(i + 1), { size: 22, kalin: 700, renk: RENK.soluk });
    });
    gizle(g4);

    await par(c.say('Bu konuda öğrendiklerimizi dört kuralda toplayalım.'), belir(c, cerceve, 500));
    await par(c.say('Ametal atomundan elektron koparmak zordur: elektron verilmez, ortak kullanılır.'), belir(c, g1, 500));
    c.note('<b>Elektron verilmez, ortak kullanılır.</b><br>Örnek: H<sub>2</sub>.', 'Elektron verilmez', 'tekrar-elektron');
    a.canlan();
    await par(c.say('Çekirdeklerle ortak elektronlar arasındaki güçlü etkileşim kovalent bağdır.'), belir(c, g2, 500));
    c.note('<b>Kovalent bağ:</b> çekirdekler ile ortak elektronlar arasındaki güçlü etkileşim.', 'Kovalent bağ', 'tekrar-kovalent-bag');
    await par(c.say('Aynı yükler iter, zıt yükler çeker: iki çekirdek de ortak elektronları çeker.'), belir(c, g3, 500));
    c.note('<b>İki çekirdek de ortak elektronları çeker.</b><br>Örnek: HF.', 'Görünmeyen çekim', 'tekrar-cekim');
    await par(c.say('Gözlem gördüğümüze dayanır; görünmeyeni yüklerden tahmin edip görselle sınarız.'), belir(c, g4, 500));
    c.note('<b>Gözlem gördüğüne dayanır;</b> tahmin görselle sınanır.', 'Gözlem ve tahmin', 'tekrar-gozlem');
  }

  Ders.start({
    id: 'cesitlilik-c3', kicker: 'Konu C · Kovalent bağ', title: 'Konu tekrarı: Kovalent bağ', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Kovalent bağ',
      hook: 'Kovalent bağın kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun dört kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun dört kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Azotun iyonlaşma enerjisi 1402 kJ/mol’dür. İki azot atomu karşılaşırsa ne olur?',
        options: ['Biri elektron verip katyon olur, öteki alıp anyon olur', 'İkisi de elektronunu serbest bırakıp elektron denizi oluşturur', 'Elektronlarını ortak kullanırlar'], answer: 2,
        why: ['İyonlaşma enerjisi yüksektir; azottan elektron koparmak zordur, iyon oluşmaz.', 'Elektron denizi metallerde oluşur; azot ametaldir.', 'İki aynı ametal atomu elektron vermez; elektronlarını ortak kullanır.'], scene: 0 },
      { q: 'Hangi atom çifti arasında kovalent bağ kurulur?',
        options: ['Potasyum ile flor', 'İki flor atomu', 'İki potasyum atomu'], answer: 1,
        why: ['Potasyum metal, flor ametaldir; aralarında iyonik bağ kurulur.', 'İki ametal atomu arasında kovalent bağ kurulur.', 'İki potasyum atomu arasında metalik bağ kurulur.'], scene: 0 },
      { q: 'Animasyonu izleyen bir öğrenci hangi önermeyi gözlemine dayandırabilir?',
        options: ['Çekirdekler ortak elektronları çekiyor', 'Ortak elektronlar sabit bir noktada durmuyor', 'Bir atom elektronunu ötekine verdi'], answer: 1,
        why: ['Çekimin kendisi ekranda görünmez; bu bir tahmindir.', 'Animasyonda ortak elektronlar sürekli yer değiştirdi.', 'Hiçbir aşamada elektron ötekine geçip kalmadı.'], scene: 0 },
      { q: 'İki klor atomu bağ kuruyor. Çekirdekler arasındaki kuvvet hangisidir?',
        options: ['Çekme', 'Kuvvet yoktur', 'İtme'], answer: 2,
        why: ['Çekme zıt yükler arasında olur; iki çekirdek de artıdır.', 'Yüklü tanecikler arasında kuvvet vardır.', 'İki çekirdek de artı yüklüdür; aynı yükler birbirini iter.'], scene: 0 },
      { q: 'Bir öğrenci hidrojen florürde ortak kullanılan iki elektronun birbirini çektiğini tahmin etti. Bu tahmin nasıldır?',
        options: ['Geçersizdir; ikisi de eksi yüklüdür, birbirini iter', 'Geçerlidir; elektronlar ortak kullanıldığı için çeker', 'Geçerlidir; elektronlar yalnızca çekirdeği çeker'], answer: 0,
        why: ['Aynı yükler iter; iki elektron da eksi yüklüdür.', 'Ortak kullanılmaları yüklerini değiştirmez; eksi yükler iter.', 'Elektronlar çekirdeği çeker ama birbirini de iter.'], scene: 0 },
      { q: 'Bağ yapmış iki hidrojen atomu bir miktar daha yaklaştırılıyor. Ne olur?',
        options: ['Çekme büyür; atomlar daha da yaklaşır', 'İtme büyür; atomlar geri itilir', 'İtme ile çekme eşit kalır'], answer: 1,
        why: ['Çok yakında çekirdekler birbirini kuvvetle iter; büyüyen itmedir.', 'Çok yaklaşınca itme büyür ve atomları geri iter.', 'Eşitlik yalnızca denge uzaklığındadır.'], scene: 0 },
      { q: 'Hangisi kovalent bağlı moleküllerden oluşur?',
        options: ['Magnezyum oksit (MgO)', 'Alüminyum (Al)', 'Oksijen gazı (O<sub>2</sub>)'], answer: 2,
        why: ['MgO, metal ile ametalden oluşan iyonik bir bileşiktir.', 'Alüminyum bir metaldir; atomları metalik bağla bağlanır.', 'O<sub>2</sub>, iki ametal atomunun kovalent bağla bağlandığı moleküllerden oluşur.'], scene: 0 },
      { q: 'Hidrojen ve flor atomları yaklaşırken üç olay oluyor:<br>(I) Ortak elektronlar çekirdeklerin arasında sürekli hareket eder.<br>(II) Atomlar uzaktadır, kuvvet yoktur.<br>(III) Her elektron öteki çekirdeğe doğru da çekilir, çekirdekler birbirini iter.<br>Doğru sıra hangisidir?',
        options: ['III, I, II', 'II, III, I', 'I, II, III'], answer: 1,
        why: ['Önce atomlar uzaktadır; kuvvetler yaklaşırken oluşur.', 'Uzakta kuvvet yoktur; yaklaşırken çekme ve itme oluşur; en sonda ortak elektronlar hareket eder.', 'Ortak elektronlar en sonda oluşur; önce atomlar uzaktadır.'], scene: 0 },
    ],
    summary: [
      'Ametal atomundan elektron koparmak zordur; <b>elektron verilmez, ortak kullanılır</b>.',
      '<b>Kovalent bağ</b>, çekirdekler ile ortak elektronlar arasındaki güçlü etkileşimdir.',
      'Aynı yükler iter, zıt yükler çeker: iki çekirdek de ortak elektronları çeker.',
      '<b>Kovalent bağda elektron verilmez, ortak kullanılır; onları iki çekirdek birlikte çeker.</b>',
    ],
    nextLesson: { href: 'd1-lewis-nokta-yapisi.html', label: 'Sonraki konu: Lewis nokta yapısı ›' },
  });
})();
