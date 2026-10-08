/* B3 · BİY.9.1.2 · Yazar notu: içerik MEB Biyoloji 9 s. 23 (bilimin doğasının tanımı ve yedi özelliği), s. 24 (DNA'nın
   yapısının keşfi: tartışma, Watson ve Crick'in çıkarımları, Franklin'in X ışını çalışmaları), s. 27 (fizik ve sosyal
   bilimlerde yöntem), s. 27–28 (söğüt örneği, tek kanıtla yetinmeme, başka olası nedenler).
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): özellikler önce
   DNA örneğiyle öğretilir, sonra söğüt araştırmasında buldurulur; öğrenciye kitap, sınıf ya da çekince söylenmez. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.B, IKINCI = 'var(--c1)', SOLUK = 'var(--muted)';

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const satirlar = (kart) => [...kart.querySelectorAll('text')].slice(1);
  const yaz = (kart, ...metin) => satirlar(kart).forEach((t, i) => { t.textContent = metin[i] || ''; });

  function sarmal(c, p, x, y, h) {
    const g = c.S('g', {}, p), N = 48, A = 58, tur = Math.PI * 3;
    let d1 = '', d2 = '';
    for (let i = 0; i <= N; i++) {
      const t = i / N, dx = A * Math.sin(t * tur);
      d1 += `${i ? 'L' : 'M'} ${x + dx} ${y + t * h} `;
      d2 += `${i ? 'L' : 'M'} ${x - dx} ${y + t * h} `;
    }
    for (let i = 1; i < 14; i++) {
      const t = i / 14, dx = A * Math.sin(t * tur);
      if (Math.abs(dx) > 10) K.cizgi(c, g, x - dx, y + t * h, x + dx, y + t * h, SOLUK);
    }
    c.S('path', { d: d1, fill: 'none', stroke: renk, 'stroke-width': 6 }, g);
    c.S('path', { d: d2, fill: 'none', stroke: IKINCI, 'stroke-width': 6 }, g);
    return g;
  }

  /* ---- Sahne 1 · Bilgi değişebilir ---- */
  async function degisir(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    K.yazi(c, g, 500, 75, 'Genetik bilgiyi hangi molekül taşır?', { size: 30 });
    const mol = (x, ad) => {
      const k = c.S('g', {}, g);
      const kutu = K.kutu(c, k, x, 120, 260, 150, { renk: SOLUK });
      K.yazi(c, k, x + 130, 190, ad, { size: 34 });
      const soru = K.yazi(c, k, x + 130, 240, '?', { size: 30, renk: SOLUK });
      soru.style.visibility = 'hidden';
      return { k, kutu, soru };
    };
    const protein = mol(50, 'Protein'), rna = mol(370, 'RNA'), dna = mol(690, 'DNA');
    protein.k.style.opacity = 0; rna.k.style.opacity = 0;
    dna.kutu.setAttribute('stroke', renk); dna.kutu.setAttribute('stroke-width', 4);
    await K.belir(c, g);
    await c.say('Genetik bilgiyi DNA’nın taşıdığını bugün biliyoruz.', { speak: 'Genetik bilgiyi de ne a’nın taşıdığını bugün biliyoruz.' });
    dna.kutu.setAttribute('stroke', SOLUK); dna.kutu.setAttribute('stroke-width', 2);
    [protein, rna, dna].forEach((m) => { m.soru.style.visibility = 'visible'; });
    await Promise.all([K.belir(c, protein.k), K.belir(c, rna.k)]);
    await c.say('Bir zamanlar bilim insanları bunu tartışıyordu: protein mi, RNA mı, DNA mı?',
      { speak: '[curious] Bir zamanlar bilim insanları bunu tartışıyordu: protein mi, re ne a mı, de ne a mı?' });
    [protein, rna, dna].forEach((m) => m.soru.remove());
    protein.k.style.opacity = 0.35; rna.k.style.opacity = 0.35;
    dna.kutu.setAttribute('stroke', renk); dna.kutu.setAttribute('stroke-width', 4);
    await K.belir(c, K.yazi(c, g, 500, 335, 'Yeni teknolojiler, daha çok deney verisi', { size: 28, renk }), 350);
    await c.say('Yeni teknolojiler ve daha çok deney verisiyle sorumlu molekülün DNA olduğu gösterildi.',
      { speak: 'Yeni teknolojiler ve daha çok deney verisiyle sorumlu molekülün de ne a olduğu gösterildi.' });
    const alt = K.yazi(c, g, 500, 420, 'Bilimin doğası: bilgi nasıl elde edilir, nasıl değerlendirilir?', { size: 26 });
    await K.belir(c, alt, 350);
    await c.say('Bilimin doğası, bilimsel bilginin nasıl elde edildiğini ve değerlendirildiğini açıklar.');
    alt.textContent = 'Bilimsel bilgi kesin ve değişmez değildir'; alt.style.fill = renk;
    await c.say('Bu tartışma onun bir özelliğini gösterir: bilimsel bilgi kesin ve değişmez değildir.');
    await K.belir(c, K.yazi(c, g, 500, 468, 'Yeni bulgularla değişebilir', { size: 26, renk }), 300);
    await c.say('Yeni bulgular ve gelişmeler ışığında zamanla değişebilir.');
    await c.choice({ tag: 'Uygula', q: 'Bir bilgi, yeni deney sonuçları yayımlanınca güncelleniyor. Bu durum neyi gösterir?',
      options: ['Bilimsel bilgiye güvenilemeyeceğini', 'Eski bilim insanlarının dikkatsiz çalıştığını', 'Bilimsel bilginin yeni bulgularla değişebildiğini'], answer: 2,
      hints: ['Güncellenen bilgi daha çok veriye dayanır; bu onu güvenilmez yapmaz.', 'Eski bilgi o günün verilerine dayanıyordu; yeni veri sonradan geldi.', ''],
      right: 'Bilgi, yeni bulgular ışığında güncellenir; değişebilir olması budur.' });
    c.note('<b>Bilimsel bilgi yeni bulgularla değişebilir.</b><br>Protein mi, RNA mı? → DNA', 'Değişebilirlik');
  }

  /* ---- Sahne 2 · Özgünlük, çıkarım, bakış açısı ---- */
  async function kesif(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    sarmal(c, g, 200, 60, 370);
    K.yazi(c, g, 200, 478, 'DNA: çift sarmal', { size: 26 });
    const kim = K.yazi(c, g, 200, 520, 'Watson ve Crick', { size: 24, renk: SOLUK });
    await K.belir(c, g);
    await c.say('DNA’nın çift sarmal yapısını James Watson ve Francis Crick ortaya koydu.',
      { speak: 'De ne a’nın çift sarmal yapısını Ceyms Vatsın ve Frensis Krik ortaya koydu.' });
    const liste = c.S('g', {}, s);
    let sira = 0;
    const topla = (ad) => K.belir(c, K.yazi(c, liste, 695, 395 + 44 * sira++, ad, { size: 26, renk }), 300);
    const kart = (baslik, s1, s2) => K.kart(c, s, 430, 80, 530, 200, baslik, [s1, s2], { renk, altSize: 26 });

    let k = kart('Özgünlük', 'Bilinmeyen bir gerçeği', 'açığa çıkarmak');
    await K.belir(c, k);
    await c.say('Daha önce bilinmeyen bir gerçeği açığa çıkarmak, bilimsel bilginin özgünlüğüdür.',
      { speak: 'Daha önce bilinmeyen bir gerçeği açığa çıkarmak, [short pause] bilimsel bilginin özgünlüğüdür.' });
    yaz(k, 'ya da bilineni yeni bir', 'bakış açısıyla değerlendirmek');
    await c.say('Bilinen bir bilgiyi yeni bir bakış açısıyla yeniden değerlendirmek de özgünlüktür.');
    k.remove(); await topla('Özgünlük');

    k = kart('Gözlem ve çıkarım', 'Önceki bulgulara dayanıldı,', 'çıkarımlar yapıldı');
    await K.belir(c, k);
    await c.say('Watson ve Crick, önceki araştırmacıların bulgularına dayanarak birçok çıkarım yaptı.',
      { speak: 'Vatsın ve Krik, önceki araştırmacıların bulgularına dayanarak birçok çıkarım yaptı.' });
    yaz(k, 'Bilimsel bilgi gözlemlere', 've çıkarımlara dayanır');
    await c.say('Bilimsel bilgi böyle elde edilir: gözlemlere ve çıkarımlara dayanır.');
    yaz(k, 'Gözlem: veri', 'Çıkarım: verinin yorumu');
    await c.say('Gözlem veriyi verir; çıkarım, o verinin yorumlanmasıdır.');
    k.remove(); await topla('Gözlem ve çıkarım');

    kim.textContent = 'Franklin: X ışını çalışmaları'; kim.style.fill = 'var(--text)';
    await c.say('Rosalind Franklin’in X ışını çalışmaları da bu keşifte kilit rol oynadı.',
      { speak: 'Rozalind Frenklin’in iks ışını çalışmaları da bu keşifte kilit rol oynadı.' });
    k = kart('Öznellik', 'Aynı konu,', 'farklı bakış açıları');
    await K.belir(c, k);
    await c.say('Farklı bilim insanları aynı konuya farklı bakış açıları getirebilir.');
    yaz(k, 'Eğitim, bakış açısı, değerler', 'yorumu etkileyebilir');
    await c.say('Bilim insanının eğitimi, bakış açısı ve değerleri yorumunu etkileyebilir; buna öznellik denir.',
      { speak: 'Bilim insanının eğitimi, bakış açısı ve değerleri yorumunu etkileyebilir; [short pause] buna öznellik denir.' });
    await c.choice({ tag: 'Uygula', q: 'İki bilim insanı aynı verileri inceliyor ama farklı yorumluyor. Bu, bilimin doğasının hangi özelliğidir?',
      options: ['Öznellik', 'Özgünlük', 'Değişebilirlik'], answer: 0,
      hints: ['', 'Özgünlük, bilinmeyen bir gerçeği açığa çıkarmaktır.', 'Değişebilirlik, bilginin yeni bulgularla değişmesidir; burada veri aynı.'],
      right: 'Aynı veri, bakış açısına göre farklı yorumlanabilir.' });
    k.remove(); await topla('Öznellik');
    c.note('<b>Bilgi gözlem ve çıkarıma dayanır; yorumu bakış açısı etkiler.</b><br>Önceki bulgular → çift sarmal', 'Çıkarım ve öznellik');
  }

  /* ---- Sahne 3 · Kanun, teori, yöntem, toplum ---- */
  async function kanunTeori(c) {
    const s = c.svg(1000, 562);
    let g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 70, 90, 390, 170, 'Kanun', ['Olay nasıl gerçekleşir?'], { renk }));
    await c.say('Kanun, doğal bir olayın nasıl gerçekleştiğini söyler.');
    const teori = K.kart(c, g, 540, 90, 390, 170, 'Teori', ['Olay neden gerçekleşir?', ''], { renk: IKINCI });
    await K.belir(c, teori);
    satirlar(teori)[1].textContent = 'Kanunları açıklar';
    await c.say('Teori ise kanunları açıklar; olayın neden gerçekleştiği sorusuna cevap arar.');
    const yok = c.S('g', {}, g);
    K.ok(c, yok, 640, 320, 360, 320, SOLUK);
    K.cizgi(c, yok, 482, 302, 518, 338, 'var(--bad)', { width: 5 });
    K.cizgi(c, yok, 518, 302, 482, 338, 'var(--bad)', { width: 5 });
    K.yazi(c, yok, 500, 395, 'Teori zamanla kanuna dönüşmez', { size: 28 });
    K.yazi(c, yok, 500, 440, 'Aralarında üstünlük sırası yok', { size: 28 });
    await K.belir(c, yok, 350);
    await c.say('Teori ile kanun arasında üstünlük sırası yoktur; biri zamanla ötekine dönüşmez.',
      { speak: '[thoughtful] Teori ile kanun arasında üstünlük sırası yoktur; biri zamanla ötekine dönüşmez.' });
    await c.choice({ tag: 'Uygula', q: 'Bir arkadaşın “Teori yeterince kanıtlanırsa kanun olur.” diyor. Bu söz doğru mu?',
      options: ['Doğru; kanun, kanıtlanmış teoridir.', 'Yanlış; ikisi farklı sorulara cevap verir, birbirine dönüşmez.', 'Doğru; teori yalnızca bir tahmindir.'], answer: 1,
      hints: ['Aralarında böyle bir sıra yok: kanun “nasıl”, teori “neden” sorusuna bakar.', '', 'Teori tahmin değildir; kanunları açıklayan bilgidir.'],
      right: 'Kanun “nasıl”ı söyler, teori “neden”i açıklar; biri ötekine dönüşmez.' });
    c.note('<b>Kanun “nasıl”ı söyler, teori “neden”i açıklar.</b><br>Biri zamanla ötekine dönüşmez.', 'Kanun ve teori');
    await sil(c, g);

    g = c.S('g', {}, s);
    await K.belir(c, K.yazi(c, g, 500, 85, 'Tek bir bilimsel yöntem yoktur', { size: 30, renk }), 350);
    await c.say('Bilimin doğasının bir özelliği de şudur: tek bir bilimsel yöntem yoktur.');
    const dallar = c.S('g', {}, g);
    K.kart(c, dallar, 70, 130, 390, 190, 'Fizik', ['Deney', 'Matematiksel model'], { renk });
    K.kart(c, dallar, 540, 130, 390, 190, 'Sosyal bilimler', ['Gözlem', 'Anket'], { renk: IKINCI });
    await K.belir(c, dallar);
    await c.say('Fizikte deney ve matematiksel model, sosyal bilimlerde gözlem ve anket öne çıkar.');
    await K.belir(c, K.yazi(c, g, 500, 400, '“Her araştırma aynı sırayla ilerler”: yanılgı', { size: 28 }), 300);
    await c.say('Basamakların her araştırmada aynı sırayla ilerlemesi gerektiği düşüncesi bir yanılgıdır.');
    await c.choice({ tag: 'Uygula', q: 'Bir araştırmacı deney yapmıyor; yıllarca gözlem yaparak sonuca ulaşıyor. Bu çalışma bilimsel sayılır mı?',
      options: ['Sayılmaz; her araştırmada deney zorunludur.', 'Sayılmaz; gözlem bilimsel değildir.', 'Sayılır; bilimde tek bir yöntem yoktur.'], answer: 2,
      hints: ['Basamakların her araştırmada aynı biçimde izlenmesi gerekmez.', 'Gözlem, bilimsel bilginin dayanaklarından biridir.', ''],
      right: 'Araştırmanın yolu sorusuna göre değişir; gözlem de bilimsel bir yöntemdir.' });
    await sil(c, g);

    g = c.S('g', {}, s);
    const toplum = K.kart(c, g, 150, 130, 700, 200, 'Bilim ve toplum', ['Bilim, toplumun kültüründen', 'bağımsız düşünülemez'], { renk });
    await K.belir(c, toplum);
    await c.say('Bilim, içinde yapıldığı toplumun kültüründen bağımsız düşünülemez.');
    yaz(toplum, 'Yaşam tarzı, anlayış, kabuller', 'bilginin üretilmesini etkiler');
    await c.say('Toplumun yaşam tarzı, anlayışı ve kabulleri bilimsel bilginin üretilmesinde etkilidir.');
    await sil(c, g);

    g = c.S('g', {}, s);
    K.yazi(c, g, 500, 85, 'Bilimin doğası', { size: 32, renk });
    ['Değişebilir', 'Özgün', 'Öznel', 'Gözlem ve çıkarım'].forEach((ad, i) => K.yazi(c, g, 270, 175 + i * 70, ad, { size: 28 }));
    ['Kanun ve teori ayrı', 'Tek yöntem yok', 'Toplumdan bağımsız değil'].forEach((ad, i) => K.yazi(c, g, 730, 175 + i * 70, ad, { size: 28 }));
    await K.belir(c, g);
    await c.say('Bu özellikler birlikte bilimin doğasını anlatır.');
  }

  /* ---- Sahne 4 · Söğüt araştırmasında özellikler ---- */
  async function sogut(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const agac = (x, y, r) => {
      c.S('rect', { x: x - 4, y, width: 8, height: 24, fill: '#6b5a45' }, g);
      c.S('circle', { cx: x, cy: y - 8, r: 19, fill: r }, g);
    };
    c.S('ellipse', { cx: 470, cy: 225, rx: 330, ry: 58, fill: '#1d3a5f', stroke: '#3c6ea8', 'stroke-width': 3 }, g);
    for (let i = 0; i < 9; i++) agac(210 + i * 65, 125, '#2f9e6e');
    for (let i = 0; i < 8; i++) agac(240 + i * 65, 318, i === 0 || i === 2 ? '#2f9e6e' : '#c9b458');
    K.yazi(c, g, 470, 75, 'Kuzey kıyı: sağlıklı', { size: 26 });
    K.yazi(c, g, 400, 400, 'Güney kıyı: hastalıklı', { size: 26 });
    await K.belir(c, g);
    await c.say('Bir gölün güney kıyısındaki söğütler hastalanmıştı; kuzeydekiler sağlıklıydı.');
    const park = c.S('g', {}, g);
    K.kutu(c, park, 800, 355, 160, 62, { rx: 8, fill: '#3a4055' });
    K.yazi(c, park, 880, 395, 'Otopark', { size: 24 });
    K.cizgi(c, park, 800, 375, 640, 305, 'var(--bad)', { 'stroke-dasharray': '10 8' });
    K.yazi(c, park, 500, 465, 'Hastalıklıların çoğu atık su hattına yakın', { size: 26, renk: 'var(--bad)' });
    await K.belir(c, park, 350);
    await c.say('Araştırmacı ağaçları saydı: hastalıklıların çoğu otoparkın atık su hattına yakındı.');
    await K.belir(c, K.yazi(c, g, 500, 515, 'Çıkarım: neden atık su olabilir', { size: 26, renk }), 300);
    await c.say('Bundan şu sonucu çıkardı: hastalığın nedeni atık su olabilir.');
    await c.choice({ tag: 'Uygula', q: 'Ağaçları saymak ve sayılardan bir neden önermek, bilimin doğasının hangi özelliğini gösterir?',
      options: ['Bilimsel bilgi gözlemlere ve çıkarımlara dayanır.', 'Kanun ve teori birbirinden farklıdır.', 'Bilim toplumdan bağımsız değildir.'], answer: 0,
      hints: ['', 'Bu olayda bir kanun ya da teori yok.', 'Bu olayda toplumun etkisi anlatılmıyor.'],
      right: 'Sayım gözlemdir; “neden atık su olabilir” ise çıkarımdır.' });
    await sil(c, g);

    const harita = c.S('g', {}, s);
    const olay = (y, s1, s2) => {
      const k = c.S('g', {}, harita);
      K.kutu(c, k, 40, y, 470, 120);
      const a = K.yazi(c, k, 275, y + 52, s1, { size: 26 }), b = K.yazi(c, k, 275, y + 90, s2, { size: 26 });
      return { k, yaz: (m1, m2) => { a.textContent = m1; b.textContent = m2 || ''; } };
    };
    const ozellik = (y, ad) => {
      const k = c.S('g', {}, harita);
      K.ok(c, k, 520, y + 60, 585, y + 60, renk);
      K.kutu(c, k, 595, y + 20, 365, 80, { renk });
      K.yazi(c, k, 777, y + 70, ad, { size: 26, renk });
      return K.belir(c, k, 350);
    };
    const o1 = olay(30, 'Ağaçlar sayıldı,', 'bir neden önerildi');
    await K.belir(c, o1.k, 300);
    await ozellik(30, 'Gözlem ve çıkarım');
    const o2 = olay(200, 'Deney: fidanlar iki', 'farklı suyla sulanır');
    await K.belir(c, o2.k, 300);
    await c.say('Araştırmacı bu hipotezi, fidanları iki farklı suyla sulayarak sınar.');
    o2.yaz('Tek kanıtla', 'yetinilmez');
    await c.say('Ama bilim insanı bir sonuca varmak için tek kanıtla yetinmez.');
    o2.yaz('Başka neden: mantar enfeksiyonu', 'ya da taban suyu farkı');
    await c.say('Hastalığın nedeni bir mantar enfeksiyonu ya da taban suyu farkı da olabilir.');
    o2.yaz('Farklı deneyler,', 'yeni kanıtlar');
    await c.say('Bu yüzden farklı deneylerle yeni kanıt aramayı sürdürür.');
    await c.choice({ tag: 'Uygula', q: 'Yeni deneyler asıl nedenin mantar olduğunu gösterirse “neden atık su” açıklaması bırakılır. Bu, hangi özelliğin örneğidir?',
      options: ['Bilimsel bilginin öznelliği', 'Bilimsel bilginin değişebilir olması', 'Bilimsel bilginin özgünlüğü'], answer: 1,
      hints: ['Öznellik, yorumu bilim insanının bakış açısının etkilemesidir.', '', 'Özgünlük, bilinmeyen bir gerçeği açığa çıkarmaktır.'],
      right: 'Açıklama yeni bulguyla değişti: bilimsel bilgi değişebilir.' });
    await ozellik(200, 'Değişebilirlik');
    const o3 = olay(370, 'Güve: doğada gözlem', '');
    await K.belir(c, o3.k, 300);
    await c.say('Önceki derslerdeki güve hipotezi doğada gözlemle de sınanabiliyordu.');
    o3.yaz('Güve: doğada gözlem', 'Söğüt: laboratuvar deneyi');
    await ozellik(370, 'Tek yöntem yok');
    await c.say('Söğüt hipotezi ise laboratuvar deneyiyle sınanır: bilimde tek bir yöntem yoktur.');
    c.note('<b>Araştırmadaki her olay bir özelliği gösterir.</b><br>Yeni kanıt arama → bilgi değişebilir', 'Araştırmada bilimin doğası');
  }

  /* ---- Sahne 5 · Kendi cümlenle, aynı anlamla ---- */
  async function kendiCumlen(c) {
    const s = c.svg(1000, 562);
    const ozgun = K.kart(c, s, 120, 40, 760, 160, 'Özgün cümle', ['Bilimsel bilgi kesin ve değişmez değildir;', 'yeni bulgularla değişebilir.'], { renk, altSize: 26 });
    await K.belir(c, ozgun);
    await c.say('Öğrendiğin bilgiyi kendi cümlenle anlatırken anlamı aynı kalmalıdır.');
    const kotu = K.kart(c, s, 40, 250, 440, 180, 'Anlam değişti', ['“Bilimsel bilgi', 'güvenilmezdir.”'], { renk: 'var(--bad)', altSize: 26 });
    await K.belir(c, kotu);
    await c.say('“Bilimsel bilgi güvenilmezdir” dersen anlamı değiştirmiş olursun.');
    await c.say('Özgün cümle bilginin kanıtla değiştiğini söylüyor, güvenilmez olduğunu değil.');
    const iyi = K.kart(c, s, 520, 250, 440, 180, 'Anlam aynı', ['“Yeni kanıtlar bilimsel', 'bilgiyi güncelleyebilir.”'], { renk: 'var(--good)', altSize: 26 });
    await K.belir(c, iyi);
    await c.say('“Yeni kanıtlar bilimsel bilgiyi güncelleyebilir” cümlesi ise aynı anlamı taşır.');
    await Promise.all([sil(c, kotu), sil(c, iyi)]);
    yaz(ozgun, 'Bilim insanının bakış açısı ve değerleri', 'yorumunu etkileyebilir.');
    await c.choice({ tag: 'Uygula', q: 'Hangi cümle tahtadaki özgün cümleyle aynı anlamı taşır?',
      options: ['Bilim insanları verileri istedikleri gibi değiştirir.', 'Bilim insanının geçmişi ve görüşü, veriyi yorumlayışına yansıyabilir.', 'Bilimde her görüş eşit derecede doğrudur.'], answer: 1,
      hints: ['Özgün cümle yorumdan söz ediyor; veriyi değiştirmekten değil.', '', 'Özgün cümle yorumun etkilendiğini söylüyor; her yorumun doğru olduğunu değil.'],
      right: 'Söylenen aynı kaldı: bakış açısı yorumu etkileyebilir.' });
    yaz(ozgun, 'Güney kıyıdaki 80 söğüdün', '60’ı hastalıklı.');
    await K.belir(c, K.yazi(c, s, 500, 290, 'Yer, grup ve oran aynı kalmalı', { size: 28 }), 300);
    await c.say('Sayı içeren bir bilgide yer, grup ve oran da aynı kalmalıdır.');
    await c.choice({ tag: 'Uygula', q: 'Hangi cümle tahtadaki kayıtla aynı anlamı taşır?',
      options: ['Güneydeki söğütlerin hepsi hastalıklıdır.', 'Göldeki söğütlerin çoğu hastalıklıdır.', 'Güney kıyıdaki her dört söğütten üçü hastalıklıdır.'], answer: 2,
      hints: ['“Hepsi” değil: 80 söğüdün 20’si sağlıklı.', 'Kayıt yalnızca güney kıyıyı anlatıyor; kuzeydeki söğütler sağlıklı.', ''],
      right: '80’de 60, dörtte üç eder; yer de oran da korunuyor.' });
    await K.belir(c, K.kart(c, s, 200, 340, 600, 170, 'Anlam aynı', ['“Güney kıyıdaki her dört', 'söğütten üçü hastalıklı.”'], { renk: 'var(--good)', altSize: 26 }));
    c.note('<b>Kendi cümlen, aynı anlam.</b><br>80 söğüdün 60’ı = her dört söğütten üçü', 'Yeniden ifade');
  }

  Ders.start({
    id: 'yasam-b3', kicker: 'Konu B · Bilimsel araştırma ve bilimin doğası', title: 'Araştırmada bilimin doğasını bulmak', accent: renk, back: 'index.html',
    intro: { title: 'Araştırmada bilimin doğasını bulmak', hook: 'Bilim insanları genetik bilgiyi DNA’nın taşıdığından hep emin miydi?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Bilgi değişebilir', goal: 'DNA tartışmasında değişebilirliği gör.', run: degisir },
      { title: 'Özgünlük, çıkarım, bakış açısı', goal: 'Keşifte üç özelliği tanı.', run: kesif },
      { title: 'Kanun, teori, yöntem, toplum', goal: 'Kalan özellikleri ayır.', run: kanunTeori },
      { title: 'Söğüt araştırmasında özellikler', goal: 'Olayı özellikle eşleştir.', run: sogut },
      { title: 'Kendi cümlenle, aynı anlamla', goal: 'Anlamı koruyan cümleyi seç.', run: kendiCumlen },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir hipotez doğada gözlemle, bir başkası laboratuvar deneyiyle sınanıyor. Bu fark hangi özelliği gösterir?',
        options: ['Tek bir bilimsel yöntem yoktur.', 'Bilimsel bilgi özgündür.', 'Teori zamanla kanuna dönüşür.'], answer: 0,
        why: ['Araştırmanın yolu soruya ve bilim dalına göre değişir.', 'Özgünlük, bilinmeyen bir gerçeği açığa çıkarmaktır.', 'Teori ve kanun birbirine dönüşmez.'], scene: 2 },
      { q: '“Bilimsel bilgi gözlemlere ve çıkarımlara dayanır.” Hangi cümle aynı anlamı taşır?',
        options: ['Bilimsel bilgi yalnızca tahminlerden oluşur.', 'Bilim insanları veri toplar ve onu yorumlayarak bilgiye ulaşır.', 'Gözlem yapılırsa yoruma gerek kalmaz.'], answer: 1,
        why: ['Cümle tahminden değil, gözlem ve çıkarımdan söz ediyor.', 'Gözlem veriyi verir, çıkarım o veriyi yorumlar.', 'Cümle ikisini birlikte sayıyor; çıkarım çıkarılamaz.'], scene: 4 },
    ], summary: ['<b>Bilimsel bilgi kanıta dayanır, yeni kanıtla değişebilir.</b>', 'Kendi cümlenle anlatırken anlamı koru.'],
    nextLesson: { href: 'c1-etige-uygun-mu.html', label: 'Sonraki: Bu araştırma etiğe uygun mu? ›' },
  });
})();
