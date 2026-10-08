/* A3 · BİY.9.1.1 d · Yazar notu: içerik MEB Biyoloji 9 s. 84 (Fleming penisilini küften ayıramaz; Florey ve Chain
   saflaştırır; fareler iyileşir; ilk hastada ilaç yetmez; yeterli üretimle hastalar iyileşir), s. 26 (çıkarım tanımı),
   s. 19 (rekombinant DNA teknolojisi), s. 20 (“Ne Öğrendim?” sütunu). Anlatım 8 Ekim 2026'da baştan yazıldı
   (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): önce bilgiler anlatılır, sonra çıkarım öğretilip uygulatılır. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.A, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const satirlar = (c, p, x, y, metin, o = {}) => { const g = c.S('g', {}, p); metin.forEach((m, i) => K.yazi(c, g, x, y + i * 36, m, { size: 26, ...o })); return g; };

  function miniKap(c, p, cx, cy, r) {
    const g = c.S('g', {}, p), kx = cx + r * 0.32, ky = cy - r * 0.25;
    c.S('circle', { cx, cy, r, fill: '#1b2440', stroke: '#8f9bc0', 'stroke-width': 4 }, g);
    for (let i = 0; i < 36; i++) {
      const rr = (r - 14) * Math.sqrt((i + 0.5) / 36), a = i * 2.39996, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      if (Math.hypot(x - kx, y - ky) > r * 0.55) c.S('circle', { cx: x, cy: y, r: 5 + (i % 3), fill: IKINCI }, g);
    }
    [[0, 0, 0.2], [-0.14, -0.09, 0.11], [0.14, -0.1, 0.12], [0.15, 0.08, 0.11], [-0.05, 0.16, 0.12]].forEach(([a, b, k]) => c.S('circle', { cx: kx + a * r, cy: ky + b * r, r: k * r, fill: '#b9c7ae' }, g));
    return g;
  }
  function sise(c, p, x, y) {
    const g = c.S('g', { transform: `translate(${x} ${y})` }, p);
    c.S('path', { d: 'M -32 18 L -52 58 Q -58 72 -42 72 L 42 72 Q 58 72 52 58 L 32 18 Z', fill: renk }, g);
    c.S('path', { d: 'M -18 -70 L -18 -10 L -52 58 Q -58 72 -42 72 L 42 72 Q 58 72 52 58 L 18 -10 L 18 -70', fill: 'none', stroke: '#c9d2ee', 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    K.cizgi(c, g, -24, -70, 24, -70, '#c9d2ee', { width: 4 });
    return g;
  }
  function tablo(c, p) {
    const g = c.S('g', {}, p), X = [30, 350, 670], AD = ['Ne Biliyorum?', 'Ne Bilmek İstiyorum?', 'Ne Öğrendim?'];
    const sutun = X.map((x, i) => {
      const k = c.S('g', {}, g);
      K.kutu(c, k, x, 70, 300, 400);
      K.yazi(c, k, x + 150, 118, AD[i], { size: 26, renk: i === 2 ? IKINCI : renk });
      K.cizgi(c, k, x + 20, 142, x + 280, 142, '#5b678f');
      return k;
    });
    return { g, sutun };
  }

  /* ---- Sahne 1 · Kaynaktaki bilgiler ---- */
  async function bilgiler(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const Y = [80, 180, 280, 380, 480];
    K.cizgi(c, g, 90, Y[0], 90, Y[4], '#3a4566', { width: 4 });
    const adim = (i, metin, r) => {
      const k = c.S('g', {}, g);
      c.S('circle', { cx: 90, cy: Y[i], r: 14, fill: r }, k);
      K.yazi(c, k, 130, Y[i] + 10, metin, { size: 28, hiza: 'start' });
      return k;
    };
    miniKap(c, g, 820, 150, 100);
    await K.belir(c, g);
    await c.say('Güvendiğin kaynak, penisilinin hastalara nasıl ulaştığını adım adım anlatıyor.');
    await K.belir(c, adim(0, 'Fleming: keşfetti, ayıramadı', IKINCI), 350);
    await c.say('Fleming penisilini küf mantarından ayıramadı ve çalışmayı bıraktı.');
    await c.say('Yıllar sonra Howard Florey ve Ernst Chain, Fleming’in çalışmalarını inceledi.',
      { speak: 'Yıllar sonra Hovırd Flori ve Ernst Çeyn, Fleming’in çalışmalarını inceledi.' });
    const cam = sise(c, g, 820, 390);
    await Promise.all([K.belir(c, adim(1, 'Florey ve Chain: saflaştırdı', renk), 350), K.belir(c, cam, 350)]);
    await c.say('Penisilini laboratuvarda saflaştırmayı başardılar.');
    await K.belir(c, adim(2, 'Fareler: iyileşti', renk), 350);
    await c.say('Enfeksiyon kapmış farelere verdiler; fareler iyileşti.');
    await K.belir(c, adim(3, 'İlk hasta: ilaç yetmedi', IKINCI), 350);
    await c.say('İlk hastada iyileşme görüldü, ama ilaç yetmedi; hastalık geri döndü.', { speak: '[thoughtful] İlk hastada iyileşme görüldü, ama ilaç yetmedi; hastalık geri döndü.' });
    await K.belir(c, adim(4, 'Daha çok ilaç: hastalar iyileşti', YESIL), 350);
    await c.say('Araştırmacılar daha çok penisilin üretince benzer hastalar iyileşti.');
    await c.choice({ tag: 'Uygula', q: 'Bu bilgilere göre penisilin kimin çalışmasıyla ilaca dönüştü?',
      options: ['Yalnızca Fleming’in; buluş onundu.', 'Fleming’in keşfi ile Florey ve Chain’in çalışmasının birleşmesiyle', 'Yalnızca Florey ve Chain’in; Fleming’in katkısı yoktu.'], answer: 1,
      hints: ['Fleming penisilini ayıramadı; onu ilaç hâline getiremedi.', '', 'Florey ve Chain işe Fleming’in çalışmalarını inceleyerek başladı.'],
      right: 'Keşif Fleming’in, saflaştırma Florey ve Chain’in; ilaç ikisinin sonucu.' });
  }

  /* ---- Sahne 2 · Bilgi mi, çıkarım mı? ---- */
  async function cikarim(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const sol = K.kart(c, g, 30, 50, 400, 230, 'Bilgi', ['Fleming ayıramadı.', 'Florey ve Chain', 'saflaştırdı.'], { renk });
    const sag = c.S('g', {}, g);
    K.ok(c, sag, 450, 165, 550, 165, IKINCI);
    K.kart(c, sag, 570, 50, 400, 230, 'Çıkarım', ['Buluşu birden çok', 'bilim insanı', 'tamamladı.'], { renk: IKINCI });
    await Promise.all([K.belir(c, sol), K.belir(c, sag)]);
    await c.say('Kaynak “birlikte başardılar” demiyordu; bu sonuca sen vardın.');
    await c.say('Eldeki bilgileri yorumlayarak varılan sonuca çıkarım denir.', { speak: 'Eldeki bilgileri yorumlayarak varılan sonuca [short pause] çıkarım denir.' });
    const alt = c.S('g', {}, g);
    K.yazi(c, alt, 230, 325, 'Kaynakta yazar', { size: 26, renk });
    K.yazi(c, alt, 770, 325, 'Sen yorumlarsın', { size: 26, renk: IKINCI });
    await K.belir(c, alt, 350);
    await c.say('Bilgi kaynakta yazar; çıkarımı, bilgileri birleştirerek sen yaparsın.');
    const sinir = c.S('g', {}, g);
    const cerceve = K.kutu(c, sinir, 150, 385, 700, 130, { renk: '#5b678f' });
    K.yazi(c, sinir, 500, 440, '“Penisilin her hastalığı iyileştirir.”', { size: 28 });
    await K.belir(c, sinir);
    await c.say('Sağlam bir çıkarım, bilgilerin söylediğinden fazlasını söylemez.');
    cerceve.setAttribute('stroke', 'var(--bad)');
    await K.belir(c, K.yazi(c, sinir, 500, 488, 'Bilgiyi aşıyor', { size: 26, renk: 'var(--bad)', kalin: 700 }), 350);
    await c.say('Kaynak enfeksiyonlardan söz ediyor; “her hastalığı iyileştirir” demek bilgiyi aşar.');
    await c.choice({ tag: 'Uygula', q: 'İlk hastada iyileşme görüldü, ama ilaç yetmeyince hastalık geri döndü. Bu bilgiden hangi çıkarım yapılabilir?',
      options: ['Penisilin insanlarda işe yaramıyordu.', 'Penisilin bütün hastalıkları iyileştirir.', 'Bir ilacın işe yaraması yetmez; yeterince üretilmesi de gerekir.'], answer: 2,
      hints: ['Hastada iyileşme görülmüştü; sorun ilacın bitmesiydi.', 'Bilgi tek bir hastayı anlatıyor; bütün hastalıklar için bir şey söylemiyor.', ''],
      right: 'İyileşme başlamıştı; ilaç bitince durdu. Çıkarım bu iki bilgiye dayanıyor.' });
    c.note('<b>Çıkarım: bilgileri yorumlayarak varılan sonuç.</b><br>Bilgilerin söylediğinden fazlasını söylemez.', 'Çıkarım');
  }

  /* ---- Sahne 3 · Hangi çıkarım sağlam? ---- */
  async function sagla(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 200, 25, 600, 180, 'Rekombinant DNA', ['Genetik materyali aktarır', 'Tıp, tarım, endüstri: gelişme'], { renk }));
    await c.say('Rekombinant DNA teknolojisi hakkında elinde iki bilgi var.', { speak: 'Rekombinant de ne a teknolojisi hakkında elinde iki bilgi var.' });
    await c.say('Genetik materyali başka canlıya aktarır; tıpta, tarımda ve endüstride gelişme sağlamıştır.');
    const kutular = c.S('g', {}, g);
    K.kutu(c, kutular, 30, 250, 450, 280, { renk: YESIL }); K.yazi(c, kutular, 255, 300, 'Bilgilere dayanıyor', { size: 28, renk: YESIL, kalin: 700 });
    K.kutu(c, kutular, 520, 250, 450, 280, { renk: IKINCI }); K.yazi(c, kutular, 745, 300, 'Bilgileri aşıyor', { size: 28, renk: IKINCI, kalin: 700 });
    await K.belir(c, kutular);
    c.say('Her çıkarımı sına: bilgilere dayanıyor mu, bilgileri aşıyor mu?', { noWait: true });
    const ogeler = [
      { q: '“Tek bir buluş birden çok alana katkı sağlayabilir.”', dogru: 0, etiket: 'Birden çok alana katkı',
        ipucu: 'Bilgi üç alan sayıyor: tıp, tarım, endüstri. Çıkarım bundan fazlasını söylemiyor.', right: 'Tıp, tarım ve endüstri: tek buluş, üç alan.' },
      { q: '“Bu teknoloji tarımdaki bütün sorunları çözdü.”', dogru: 1, etiket: 'Bütün sorunları çözdü',
        ipucu: 'Bilgi “gelişme sağladı” diyor; “bütün sorunlar” demiyor.', right: '“Gelişme sağladı” ile “bütün sorunları çözdü” aynı şey değil.' },
      { q: '“Bu teknoloji yalnızca hastanelerde kullanılır.”', dogru: 1, etiket: 'Yalnızca hastanelerde',
        ipucu: 'Bilgi tarımı ve endüstriyi de sayıyor.', right: 'Bilgi tarımı ve endüstriyi de sayıyor; “yalnızca” bilgiyle uyuşmuyor.' },
    ];
    const dolu = [0, 0];
    for (const o of ogeler) {
      await c.choice({ tag: 'Sıra sende', q: o.q, options: ['Bilgilere dayanıyor', 'Bilgileri aşıyor'], answer: o.dogru,
        hints: o.dogru === 0 ? ['', o.ipucu] : [o.ipucu, ''], right: o.right });
      await K.belir(c, K.yazi(c, g, o.dogru === 0 ? 255 : 745, 365 + dolu[o.dogru] * 55, o.etiket, { size: 26 }), 350);
      dolu[o.dogru]++;
    }
    await c.say('“Bütün” ya da “yalnızca” diyen bir çıkarım, çoğu zaman bilgiyi aşar.');
    c.note('<b>“Bütün” ve “yalnızca” diyen çıkarıma dikkat.</b><br>“Gelişme sağladı” ≠ “bütün sorunları çözdü”.', 'Sağlam çıkarım');
  }

  /* ---- Sahne 4 · Ne öğrendim? ---- */
  async function ogrendim(c) {
    const s = c.svg(1000, 562), t = tablo(c, s);
    satirlar(c, t.sutun[0], 180, 215, ['Penisilin ilk', 'antibiyotiktir.']);
    satirlar(c, t.sutun[1], 500, 215, ['İlaç hastalara', 'ne zaman ulaştı?']);
    await K.belir(c, t.g);
    await c.say('Araştırmanın başında tabloya bildiklerini ve sorunu yazmıştın.');
    const bos = K.yazi(c, t.sutun[2], 820, 330, '?', { size: 96, renk: IKINCI, kalin: 700 });
    await K.belir(c, bos, 350);
    await c.say('Üçüncü sütuna, sorunun cevabını ve vardığın çıkarımı yazarsın.');
    await c.choice({ tag: 'Uygula', q: '“Ne Öğrendim?” sütununa hangisi yazılır?',
      options: ['İlaç, yıllar sonra saflaştırılınca hastalara ulaştı; buluşu birden çok bilim insanı tamamladı.', 'Penisilin hastalara ne zaman ulaştı?', 'Penisilin bütün hastalıkları iyileştirir.'], answer: 0,
      hints: ['', 'Bu bir soru; ikinci sütunda zaten yazıyor.', 'Topladığın bilgiler bunu söylemiyor; bu çıkarım bilgiyi aşıyor.'],
      right: 'Önce sorunun cevabı, sonra bilgilere dayanan çıkarım.' });
    bos.remove();
    const cevap = satirlar(c, t.sutun[2], 820, 215, ['Yıllar sonra,', 'saflaştırılınca.']);
    const sonuc = satirlar(c, t.sutun[2], 820, 345, ['Buluşu birden çok', 'kişi tamamladı.'], { renk: IKINCI });
    await Promise.all([K.belir(c, cevap, 350), K.belir(c, sonuc, 350)]);
    await c.say('İlk satır kaynaktan aldığın cevap, ikincisi senin çıkarımın.');
    await c.say('Bilim insanları birbirinin çalışmasını sürdürerek biyolojiye katkı sağlar.');
    await c.say('Çıkarım bilgiye dayanır; bilgiden fazlasını söylemez.', { speak: 'Çıkarım bilgiye dayanır; [short pause] bilgiden fazlasını söylemez.' });
  }

  Ders.start({
    id: 'yasam-a3', kicker: 'Konu A · Biyolojinin dönüm noktaları', title: 'Bilgiden çıkarıma', accent: renk, back: 'index.html',
    intro: { title: 'Bilgiden çıkarıma', hook: 'Fleming penisilini ilaç yapamadı; peki hastalar nasıl iyileşti?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Kaynaktaki bilgiler', goal: 'Penisilinin hastalara nasıl ulaştığını izle.', run: bilgiler },
      { title: 'Bilgi mi, çıkarım mı?', goal: 'Bilgiyi çıkarımdan ayır.', run: cikarim },
      { title: 'Hangi çıkarım sağlam?', goal: 'Bilgiyi aşan çıkarımı yakala.', run: sagla },
      { title: 'Ne öğrendim?', goal: 'Tablonun son sütununu doldur.', run: ogrendim },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi bir çıkarımdır?', options: ['Fleming penisilini küf mantarından ayıramadı.', 'Florey ve Chain penisilini saflaştırdı.', 'Bir buluşun ilaca dönüşmesi birden çok bilim insanının çalışmasını gerektirebilir.'], answer: 2,
        why: ['Bu, kaynakta yazan bir bilgidir.', 'Bu da kaynakta yazan bir bilgidir.', 'Kaynakta yazmaz; bilgiler yorumlanarak varılan sonuçtur.'], scene: 1 },
      { q: 'Bilgi: “CRISPR-Cas, bitki ve hayvanlarda genetik iyileştirme sağladı.” Hangi çıkarım bu bilgiyi aşar?',
        options: ['CRISPR-Cas gıda üretimine katkı sağlayabilir.', 'CRISPR-Cas dünyadaki açlığı bitirdi.', 'CRISPR-Cas tarımla ilgili çalışmalarda kullanılabilir.'], answer: 1,
        why: ['Bitki ve hayvanların iyileştirilmesi gıda üretimiyle ilgilidir; bilgiye dayanır.', 'Bilgi “iyileştirme sağladı” diyor; açlığın bittiğini söylemiyor.', 'Bitkilerde iyileştirme tarımla ilgilidir; bilgiye dayanır.'], scene: 2 },
      { q: 'Bilgi: “Aynı bitkiden iki saksının biri pencere önünde, öteki kapalı dolapta bir hafta kaldı; dolaptakinin yaprakları sarardı.” Hangisi bu bilgiye dayanan sağlam bir çıkarımdır?',
        options: ['Bu bitkinin yeşil kalması ışıkla ilgili olabilir.', 'Bütün bitkiler karanlıkta bir haftada ölür.', 'Dolaptaki bitkinin yaprakları sarardı.'], answer: 0,
        why: ['İki saksının farkı ışık; “olabilir” diyerek bilgiden fazlasını söylemiyor.', 'Bilgi tek bir bitkiden ve sararmadan söz ediyor; “bütün” ve “ölür” bilgiyi aşar.', 'Bu bir çıkarım değil, bilginin kendisidir.'], scene: 2 },
      { q: 'Deniz, “Çıkarım benim yorumum; bilgilere dayanması gerekmez.” diyor. Hangisi doğrudur?',
        options: ['Deniz haklı; çıkarım kişisel görüştür.', 'Çıkarım yorumdur, ama eldeki bilgilere dayanır ve onları aşmaz.', 'Çıkarım yapılmaz; yalnızca kaynakta yazan aktarılır.'], answer: 1,
        why: ['Bilgiye dayanmayan bir yorum sağlam çıkarım olmaz.', 'Çıkarım bilgiye dayanır; bilgiden fazlasını söylemez.', 'Çıkarımı kaynak yazmaz; bilgileri yorumlayarak sen yaparsın.'], scene: 1 },
    ], summary: ['<b>Çıkarım bilgiye dayanır; bilgiden fazlasını söylemez.</b>', 'Bilgi kaynakta yazar; çıkarımı, bilgileri yorumlayarak sen yaparsın.'],
    nextLesson: { href: 'a4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
