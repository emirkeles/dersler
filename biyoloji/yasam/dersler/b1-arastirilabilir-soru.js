/* B1 · BİY.9.1.2 · Yazar notu: içerik MEB Biyoloji 9 s. 25–26 (gözlem, problem, hipotez tanımı, güve örneği, kontrollü deney).
   Anlatım 8 Ekim 2026'da yeniden kuruldu (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): kavram önce
   öğretilir, soru sonra gelir; öğrenciye kitap, sınıf ya da "gerçek deney yapmıyoruz" gibi uyarılar söylenmez. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.B, IKINCI = 'var(--c2)';

  function kanat(c, p, x, y, desen, olcek = 1) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${olcek})` }, p);
    c.S('path', { d: 'M0 -65 Q-170 -125 -165 25 Q-120 130 0 65 Q120 130 165 25 Q170 -125 0 -65', fill: '#394157', stroke: renk, 'stroke-width': 3 }, g);
    c.S('ellipse', { cx: 0, cy: 2, rx: 12, ry: 74, fill: renk }, g);
    if (desen) [-85, 85].forEach((d) => {
      c.S('circle', { cx: d, cy: -4, r: 37, fill: '#807b69', stroke: renk, 'stroke-width': 3 }, g);
      c.S('circle', { cx: d, cy: -4, r: 14, fill: '#162039' }, g);
    });
    return g;
  }
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  /* ---- Sahne 1 · Gözlemden probleme ---- */
  async function gozlem(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, kanat(c, g, 500, 235, false));
    await c.say('Ormanda yürürken ağaç gövdesinde dinlenen bir güve görüyorsun.');
    g.replaceChildren(); kanat(c, g, 500, 235, true);
    await K.belir(c, K.yazi(c, g, 500, 430, 'Baykuş yüzüne benzeyen göz desenleri', { size: 28, renk }), 350);
    await c.say('Kanatlarında baykuş yüzüne benzeyen göz desenleri var.');
    await K.belir(c, K.yazi(c, g, 500, 70, 'Gözlem: dikkatli bilgi toplama', { size: 30 }), 350);
    await c.say('Duyularla ya da araçlarla dikkatli bilgi toplamaya gözlem denir.');
    await c.say('Gözlem çoğu zaman bir soru doğurur: neden, nasıl?', { speak: '[curious] Gözlem çoğu zaman bir soru doğurur: neden, nasıl?' });
    await sil(c, g);
    const zincir = c.S('g', {}, s);
    K.kart(c, zincir, 70, 170, 350, 170, 'Gözlem', ['Kanatta göz desenleri'], { renk });
    K.ok(c, zincir, 435, 255, 555, 255, renk);
    K.kart(c, zincir, 580, 170, 350, 170, 'Problem', ['Neden göz deseni var?'], { renk: IKINCI });
    await K.belir(c, zincir);
    await c.say('“Kanatlarda neden göz deseni var?” sorusu araştırmanın problemidir.');
    await c.choice({ tag: 'Uygula', q: 'Aynı bitkinin gölgedeki yaprakları, güneştekilerden daha büyük. Bu gözlemden çıkan problem hangisidir?',
      options: ['Yapraklar yeşildir.', 'Gölgedeki yapraklar neden daha büyük?', 'Bu bitki bahçeye yakışıyor mu?'], answer: 1,
      hints: ['Bu bir gözlem cümlesi; neden ya da nasıl diye sormuyor.', '', 'Bu soru gözlenen farkla ilgili değil.'],
      right: 'Problem, gözlenen farkın nedenini soruyor.' });
    await c.say('Problem, gözlenen durumun nedenini ya da nasıl olduğunu sorar.');
  }

  /* ---- Sahne 2 · Araştırılabilir soru ---- */
  async function soru(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await c.say('Her soru bilimsel olarak araştırılamaz.');
    await K.belir(c, K.yazi(c, g, 500, 80, 'Araştırılabilir soru: gözlem ya da deneyle cevaplanır', { size: 28 }), 350);
    await c.say('Araştırılabilir soru, gözlem ya da deneyle cevaplanabilen sorudur.', { speak: 'Araştırılabilir soru, [short pause] gözlem ya da deneyle cevaplanabilen sorudur.' });
    const a = K.kart(c, g, 70, 150, 400, 190, 'Araştırılamaz', ['“En güzel güve', 'hangisi?”'], { renk: 'var(--muted)' });
    await K.belir(c, a);
    await c.say('“En güzel güve hangisi?” sorusunun cevabı kişiden kişiye değişir.');
    const b = K.kart(c, g, 530, 150, 400, 190, 'Araştırılabilir', ['“Göz desenleri', 'avlanmayı etkiler mi?”'], { renk });
    await K.belir(c, b);
    await c.say('“Göz desenleri güvenin avlanmasını etkiler mi?” sorusu ise sınanabilir.', { speak: 'Göz desenleri güve’nin avlanmasını etkiler mi sorusu ise sınanabilir.' });
    const cift = c.S('g', {}, g);
    kanat(c, cift, 640, 440, true, 0.42); kanat(c, cift, 820, 440, false, 0.42);
    await K.belir(c, cift, 350);
    await c.say('Çünkü desenli ve desensiz güvelerin avlanma durumu karşılaştırılabilir.');
    await c.choice({ tag: 'Uygula', q: 'Hangi soru gözlem ya da deneyle cevaplanabilir?',
      options: ['Göz desenleri güveye yakışıyor mu?', 'Güveler kelebeklerden daha mı sevimli?', 'Büyük göz desenli güveler daha az mı avlanır?'], answer: 2,
      hints: ['“Yakışmak” kişiye göre değişir; ölçülemez.', '“Sevimli” kişiye göre değişir; ölçülemez.', ''],
      right: 'Avlanan güveler sayılabilir; soru sınanabilir.' });
    await c.say('Bu sorunun cevabı sayılarak bulunur: kaç güve avlandı?');
    c.note('<b>Araştırılabilir soru gözlem ya da deneyle cevaplanır.</b><br>Göz desenleri avlanmayı etkiler mi?', 'Araştırılabilir soru');
  }

  /* ---- Sahne 3 · Hipotez ---- */
  async function hipotez(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await c.say('Soruya cevap aramadan önce konu hakkında bilinenler toplanır.');
    await K.belir(c, K.kart(c, g, 70, 120, 400, 150, 'Bilinen 1', ['Bazı kuşlar güveleri yer'], { renk }));
    await c.say('Bazı kuşların güveleri yediği biliniyor.');
    await K.belir(c, K.kart(c, g, 530, 120, 400, 150, 'Bilinen 2', ['Baykuşlar başka kuşları avlar'], { renk }));
    await c.say('Baykuşların da başka kuşları avladığı biliniyor.');
    await c.say('Bu bilgilerle soruya geçici bir cevap önerilebilir.');
    await K.belir(c, K.yazi(c, g, 500, 360, 'Hipotez: sınanabilir açıklama önerisi', { size: 30, renk: IKINCI }), 350);
    await c.say('Bir olayın nedenini açıklamak için sunulan önermeye hipotez denir.', { speak: 'Bir olayın nedenini açıklamak için sunulan önermeye [short pause] hipotez denir.' });
    await c.say('Hipotez, gözlem ya da deneyle sınanabilir olmalıdır.');
    await c.choice({ tag: 'Uygula', q: 'Bu iki bilgiye dayanan hipotez hangisidir?',
      options: ['Göz desenleri neden var?', 'Göz desenleri, güveyi yiyebilecek avcıları uzaklaştırır.', 'Göz desenleri güveyi güzelleştirir.'], answer: 1,
      hints: ['Bu bir soru; hipotez bir açıklama önerir.', '', 'Güzellik sınanamaz; iki bilgiyle de ilgisi yok.'],
      right: 'Baykuşa benzeyen desen, güveyi yiyen kuşları korkutuyor olabilir.' });
    await sil(c, g);
    await K.belir(c, K.kart(c, s, 150, 160, 700, 200, 'Hipotez', ['Göz desenleri, güveyi yiyebilecek', 'avcıları uzaklaştırır.'], { renk: IKINCI }));
    await c.say('Soru cümlesi hipotez olamaz; hipotez bir açıklama önerir.');
    await c.say('Hipotez henüz doğrulanmış değildir; sınanması gerekir.', { speak: '[thoughtful] Hipotez henüz doğrulanmış değildir; sınanması gerekir.' });
    c.note('<b>Hipotez: sınanabilir açıklama önerisi.</b><br>Göz desenleri avcıları uzaklaştırır.', 'Hipotez');
  }

  /* ---- Sahne 4 · Hipotez nasıl sınanır? ---- */
  async function sinama(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await c.say('Hipotezi sınamak için kontrollü bir deney tasarlanabilir.');
    const grup = (x, desen, ad) => {
      const k = c.S('g', {}, g);
      K.kutu(c, k, x, 110, 380, 230, { renk: desen ? renk : 'var(--muted)' });
      K.yazi(c, k, x + 190, 155, ad, { size: 28, renk: desen ? renk : 'var(--muted)' });
      for (let i = 0; i < 6; i++) kanat(c, k, x + 70 + (i % 3) * 120, 215 + Math.floor(i / 3) * 70, desen, 0.26);
      return k;
    };
    const sol = grup(80, true, 'Göz desenli'), sag = grup(540, false, 'Desensiz');
    const ortam = K.yazi(c, g, 500, 395, 'Eşit sayıda güve · aynı ortam · avcı kuşlar', { size: 28 });
    await Promise.all([K.belir(c, sol), K.belir(c, sag), K.belir(c, ortam)]);
    await c.say('Eşit sayıda desenli ve desensiz güve, avcı kuşların bulunduğu ortama bırakılır.');
    ortam.textContent = 'Bir süre sonra: kalan güveler sayılır';
    await c.say('Bir süre sonra iki gruptan kalan güveler sayılır.');
    await c.choice({ q: 'Hipotez doğruysa hangi sonuç beklenir?',
      options: ['Desensiz güvelerden daha çok kalır.', 'İki gruptan eşit sayıda kalır.', 'Desenli güvelerden daha çok kalır.'], answer: 2,
      hints: ['Hipotez, desenin avcıları uzaklaştırdığını söylüyor.', 'Eşit sonuç, desenin etkisi olmadığını gösterirdi.', ''],
      right: 'Avcılar desenli güvelerden kaçınırsa onlardan daha çok kalır.' });
    await sil(c, g);
    const sonuc = c.S('g', {}, s);
    K.yazi(c, sonuc, 500, 80, 'Hipotez doğruysa beklenen sonuç', { size: 30 });
    K.cizgi(c, sonuc, 200, 400, 800, 400);
    const cubuk = (x, h, ad, r) => { c.S('rect', { x: x - 60, y: 400 - h, width: 120, height: h, rx: 4, fill: r }, sonuc); K.yazi(c, sonuc, x, 445, ad, { size: 28 }); };
    cubuk(350, 230, 'Göz desenli', renk); cubuk(650, 90, 'Desensiz', 'var(--muted)');
    K.yazi(c, sonuc, 500, 505, 'Kalan güve sayısı', { size: 26, renk: 'var(--muted)' });
    await K.belir(c, sonuc);
    await c.say('Hipotez doğruysa avcılar desenli güvelerden kaçınır; onlardan daha çok kalır.');
    await c.say('Sonuç böyle çıkarsa hipotez desteklenmiş olur.');
    await c.say('Fizik ve kimyada da araştırma gözlem, hipotez ve deneyle ilerler.');
  }

  Ders.start({
    id: 'yasam-b1', kicker: 'Konu B · Bilimsel araştırma ve bilimin doğası', title: 'Meraktan araştırılabilir soruya', accent: renk, back: 'index.html',
    intro: { title: 'Meraktan araştırılabilir soruya', hook: 'Güvenin göz desenleri için hangi soru araştırılabilir?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Gözlemden probleme', goal: 'Gözlemi probleme dönüştür.', run: gozlem },
      { title: 'Araştırılabilir soru', goal: 'Sınanabilir soruyu ayır.', run: soru },
      { title: 'Hipotez kur', goal: 'Soruyla açıklamayı ayır.', run: hipotez },
      { title: 'Hipotez nasıl sınanır?', goal: 'Hipotezden beklenen sonucu çıkar.', run: sinama },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi soru araştırılabilir?', options: ['En güzel güve hangisi?', 'Desen durumu kalan güve sayısını etkiler mi?', 'Araştırmacı hangi deseni sever?'], answer: 1,
        why: ['Güzellik kişiye göre değişir; gözlem ya da deneyle cevaplanamaz.', 'Kalan güveler sayılıp karşılaştırılabilir.', 'Kişisel tercih, desenin etkisini açıklamaz.'], scene: 1 },
      { q: 'Hangisi bir hipotezdir?', options: ['Göz desenleri avcıları uzaklaştırır.', 'Göz desenleri var mı?', 'Göz desenleri çok güzeldir.'], answer: 0,
        why: ['Sınanabilir bir açıklama önerir.', 'Bu bir sorudur; açıklama önermez.', 'Güzellik yargısı sınanamaz.'], scene: 2 },
      { q: 'Bir öğrenci yağmurdan sonra bahçede daha çok salyangoz gördü ve “Nem, salyangozları dışarı çıkarır.” hipotezini kurdu. Hipotez doğruysa hangi sonuç beklenir?',
        options: ['Nemli ve kuru ortamda aynı sayıda salyangoz dışarı çıkar.', 'Kuru ortamda salyangozlar daha çok dışarı çıkar.', 'Nemli ortamda salyangozlar daha çok dışarı çıkar.'], answer: 2,
        why: ['Eşit sonuç, nemin etkisi olmadığını gösterirdi.', 'Hipotez nemin salyangozları dışarı çıkardığını söylüyor; kuru ortamda daha çok çıkmazlar.', 'Nem salyangozları dışarı çıkarıyorsa nemli ortamda daha çok salyangoz görülmelidir.'], scene: 3 },
      { q: 'Bir öğrenci “Hipotez, doğruluğu kanıtlanmış bir bilgidir.” diyor. Bu söz için hangisi doğrudur?',
        options: ['Doğru; hipotez deneyden önce de kesin bilgi sayılır.', 'Yanlış; hipotez henüz doğrulanmamıştır, sınanması gerekir.', 'Yanlış; hipotez gözlem ya da deneyle sınanamayan bir öneridir.'], answer: 1,
        why: ['Hipotez, sınanmadan doğrulanmış sayılmaz; önerilen bir açıklamadır.', 'Hipotez bir açıklama önerisidir; gözlem ya da deneyle sınanır.', 'Hipotez tam tersine, gözlem ya da deneyle sınanabilir olmalıdır.'], scene: 2 },
    ], summary: ['<b>Sınanabilen soru, araştırmanın başıdır.</b>', 'Gözlem → problem → araştırılabilir soru → hipotez → sınama.'],
    nextLesson: { href: 'b2-arastirma-basamaklari.html', label: 'Sonraki: Bir araştırmanın basamakları ›' },
  });
})();
