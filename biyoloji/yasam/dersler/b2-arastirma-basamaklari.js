/* B2 · BİY.9.1.2 · Yazar notu: içerik MEB Biyoloji 9 s. 24 (ampul örneği), s. 25–26 (yedi basamak, güve örneği, tahmin,
   bağımsız ve bağımlı değişken, analiz ve sonuç), s. 25 ve 27 (tek bir bilimsel yöntem yoktur), s. 27–28 (söğüt örneği).
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): basamaklar güve
   örneğinde sırayla öğretilir, sonra söğüt örneğinde uygulatılır; öğrenciye kitap, sınıf ya da çekince söylenmez. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.B, IKINCI = 'var(--c1)', SOLUK = 'var(--muted)';
  const ADLAR = ['Gözlem', 'Problem', 'Veri', 'Hipotez', 'Tahmin', 'Deney', 'Analiz'];

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const satirlar = (kart) => [...kart.querySelectorAll('text')].slice(1);

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

  /* Yedi basamağın şeridi: öğretilen basamak adını alır, sıradaki vurgulanır. */
  function serit(c, s, acik = 0) {
    const g = c.S('g', {}, s);
    const kutular = ADLAR.map((ad, i) => {
      const x = 28 + i * 136;
      const r = K.kutu(c, g, x, 22, 128, 52, { rx: 10 });
      const t = K.yazi(c, g, x + 64, 57, String(i + 1), { size: 24, renk: SOLUK });
      return { r, t };
    });
    const boya = (i, tur) => {
      const { r, t } = kutular[i];
      t.textContent = ADLAR[i];
      t.style.fill = tur === 'aktif' ? renk : 'var(--text)';
      r.setAttribute('stroke', tur === 'aktif' ? renk : '#5b678f');
      r.setAttribute('stroke-width', tur === 'aktif' ? 4 : 2);
    };
    let aktif = -1;
    for (let i = 0; i < acik; i++) boya(i, 'gecti');
    return {
      g,
      ac(i) { if (aktif >= 0) boya(aktif, 'gecti'); boya(i, 'aktif'); aktif = i; },
      vurgula(i) { boya(i, 'aktif'); },
    };
  }

  /* ---- Sahne 1 · Gözlem, problem, veri ---- */
  async function ilkUc(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, kanat(c, g, 500, 300, true, 0.9));
    await c.say('Önceki derste güvenin göz desenlerinden bir hipoteze ulaştık.', { speak: 'Önceki derste güve’nin göz desenlerinden bir hipoteze ulaştık.' });
    const ser = serit(c, s);
    await K.belir(c, ser.g, 350);
    await c.say('Araştırmalarda sık izlenen yol yedi basamaktan oluşur.');
    ser.ac(0);
    const alt = K.yazi(c, g, 500, 485, 'Kanatlarda göz desenleri fark edilir', { size: 28, renk });
    await K.belir(c, alt, 300);
    await c.say('İlk basamak gözlemdir: güvenin kanatlarındaki göz desenleri fark edilir.', { speak: 'İlk basamak gözlemdir: güve’nin kanatlarındaki göz desenleri fark edilir.' });
    ser.ac(1);
    alt.textContent = '“Kanatlarda neden göz deseni var?”';
    await c.say('İkinci basamakta problem belirlenir: bu desenler neden var?');
    await sil(c, g);
    ser.ac(2);
    const v = c.S('g', {}, s);
    const ara = K.kart(c, v, 50, 160, 440, 190, 'Veri toplama', ['Konu hakkında', 'bilinenler araştırılır'], { renk });
    const [a1, a2] = satirlar(ara);
    await K.belir(c, ara);
    await c.say('Üçüncü basamak veri toplamadır: konu hakkında bilinenler araştırılır.');
    a1.textContent = 'Önceki araştırmalar'; a2.textContent = 'güvenilir kaynaklardan okunur';
    await c.say('Güve desenleriyle ilgili önceki araştırmalar güvenilir kaynaklardan okunur.');
    await K.belir(c, K.kart(c, v, 520, 160, 430, 190, 'Bulunan', ['Bazı kuşlar güve yer', 'Baykuşlar kuş avlar'], { renk: IKINCI }));
    await c.say('Bazı kuşların güve yediği, baykuşların da kuş avladığı böyle öğrenilir.');
    a1.textContent = 'Çözüm, çok sayıda'; a2.textContent = 'veriye dayanmalıdır';
    await c.say('Önerilen çözümün bilimsel olması için çok sayıda veriye dayanması gerekir.',
      { speak: '[thoughtful] Önerilen çözümün bilimsel olması için çok sayıda veriye dayanması gerekir.' });
    await c.choice({ tag: 'Uygula', q: 'Bir öğrenci “Gölgedeki yapraklar neden daha büyük?” diye soruyor, sonra bu konuda yazılmış araştırmaları okuyor. Okuması hangi basamaktır?',
      options: ['Veri toplama', 'Gözlem yapma', 'Problemi belirleme'], answer: 0,
      hints: ['', 'Gözlem yaprakların kendisine bakmaktır; öğrenci yazılanları okuyor.', 'Problemi zaten belirledi: “Neden daha büyük?”'],
      right: 'Konu hakkında bilinenleri kaynaklardan araştırmak veri toplamadır.' });
    c.note('<b>Gözlem → problem → veri toplama.</b><br>Deseni gör, nedenini sor, bilineni araştır.', 'İlk üç basamak');
  }

  /* ---- Sahne 2 · Hipotez ve tahmin ---- */
  async function hipotezTahmin(c) {
    const s = c.svg(1000, 562), ser = serit(c, s, 3), g = c.S('g', {}, s);
    ser.ac(3);
    await K.belir(c, K.kart(c, g, 150, 105, 700, 130, 'Hipotez', ['Göz desenleri avcıları uzaklaştırır.'], { renk: IKINCI }));
    await c.say('Dördüncü basamak hipotezdir: göz desenleri, güveyi yiyebilecek avcıları uzaklaştırır.');
    ser.ac(4);
    const ok = c.S('g', {}, g);
    K.ok(c, ok, 500, 245, 500, 295, renk);
    const tanim = K.yazi(c, g, 500, 350, 'Tahmin: hipotezden çıkarılan sonuç', { size: 28, renk });
    await Promise.all([K.belir(c, ok, 300), K.belir(c, tanim, 300)]);
    await c.say('Beşinci basamak hipoteze dayalı tahmindir.');
    await c.say('Hipotez sınanmadan önce ondan akıl yürütmeyle çıkarılan sonuca tahmin denir.',
      { speak: 'Hipotez sınanmadan önce ondan akıl yürütmeyle çıkarılan sonuca [short pause] tahmin denir.' });
    tanim.remove();
    await K.belir(c, K.kart(c, g, 150, 305, 700, 175, 'Tahmin', ['Kanatta göz deseni varsa', 'avcı kuşlar güveyi yemekten kaçınır.'], { renk }));
    await c.say('Tahminimiz: güvenin kanadında göz deseni varsa avcı kuşlar onu yemekten kaçınır.', { speak: 'Tahminimiz: güve’nin kanadında göz deseni varsa avcı kuşlar onu yemekten kaçınır.' });
    await c.say('Tahmin, sınamada neye bakılacağını önceden belirler; araştırmayı kolaylaştırır.');
    await sil(c, g);
    const l = c.S('g', {}, s);
    c.S('circle', { cx: 500, cy: 215, r: 62, fill: '#2a3350', stroke: SOLUK, 'stroke-width': 4 }, l);
    c.S('path', { d: 'M 478 232 L 490 200 L 500 222 L 510 200 L 522 232', fill: 'none', stroke: SOLUK, 'stroke-width': 3 }, l);
    c.S('rect', { x: 474, y: 272, width: 52, height: 44, rx: 6, fill: '#5b678f' }, l);
    const yazi = K.yazi(c, l, 500, 385, 'Lamba yanmıyor', { size: 28 });
    await K.belir(c, l);
    await c.say('Aynı düşünme günlük hayatta da işler: odadaki lamba yanmıyor.');
    yazi.textContent = 'Hipotez: “Ampul patlamış.”'; yazi.style.fill = IKINCI;
    await c.choice({ tag: 'Uygula', q: 'Lamba yanmıyor. Hipotez: “Ampul patlamış.” Bu hipoteze dayalı tahmin hangisidir?',
      options: ['Lamba neden yanmıyor?', 'Lamba dün akşam yanıyordu.', 'Ampul değiştirilirse lamba yanar.'], answer: 2,
      hints: ['Bu, problemi belirleyen sorudur.', 'Bu bir gözlemdir; hipotezden çıkarılmış bir sonuç değildir.', ''],
      right: 'Ampul patlamışsa yenisi takılınca lamba yanmalıdır.' });
    await K.belir(c, K.yazi(c, l, 500, 445, 'Tahmin: ampul değiştirilirse lamba yanar', { size: 28, renk }), 300);
    await c.say('Tahmin sınanabilir: ampul değiştirilir, lambanın yanıp yanmadığına bakılır.');
    c.note('<b>Tahmin: hipotezden çıkarılan, sınanacak sonuç.</b><br>Desen varsa kuşlar güveyi yemekten kaçınır.', 'Hipoteze dayalı tahmin');
  }

  /* ---- Sahne 3 · Deney ve değişkenler ---- */
  async function deney(c) {
    const s = c.svg(1000, 562), ser = serit(c, s, 5), g = c.S('g', {}, s);
    ser.ac(5);
    const grup = (x, desen, ad) => {
      const k = c.S('g', {}, g);
      K.kutu(c, k, x, 105, 380, 215, { renk: desen ? renk : SOLUK });
      K.yazi(c, k, x + 190, 148, ad, { size: 28, renk: desen ? renk : SOLUK });
      for (let i = 0; i < 6; i++) kanat(c, k, x + 70 + (i % 3) * 120, 200 + Math.floor(i / 3) * 68, desen, 0.26);
      return k;
    };
    const sol = grup(80, true, 'Göz desenli'), sag = grup(540, false, 'Desensiz');
    await Promise.all([K.belir(c, sol), K.belir(c, sag)]);
    await c.say('Altıncı basamakta tahmini sınayacak kontrollü bir deney tasarlanır.');
    const ortam = K.yazi(c, g, 500, 372, 'Eşit sayıda güve, aynı ortam, avcı kuşlar', { size: 28 });
    await K.belir(c, ortam, 300);
    await c.say('Eşit sayıda desenli ve desensiz güve, avcı kuşların bulunduğu ortama bırakılır.');
    ortam.textContent = 'Bir süre sonra kalan güveler sayılır';
    await c.say('Bir süre sonra iki gruptan kalan güveler sayılır.');
    ortam.remove();
    const b1 = K.yazi(c, g, 500, 372, 'Bağımsız değişken', { size: 28, renk });
    await K.belir(c, b1, 300);
    await c.say('Araştırmacının değiştirdiği ve etkisini araştırdığı değişkene bağımsız değişken denir.',
      { speak: 'Araştırmacının değiştirdiği ve etkisini araştırdığı değişkene [short pause] bağımsız değişken denir.' });
    b1.textContent = 'Bağımsız değişken: göz deseni var mı?';
    await c.say('Burada bağımsız değişken, güvede göz deseninin bulunup bulunmamasıdır.');
    const b2 = K.yazi(c, g, 500, 430, 'Bağımlı değişken', { size: 28, renk: IKINCI });
    await K.belir(c, b2, 300);
    await c.say('Bağımsız değişkene bağlı olarak değişen değişkene bağımlı değişken denir.');
    b2.textContent = 'Bağımlı değişken: kalan güve sayısı';
    await c.say('Burada bağımlı değişken, kalan güve sayısıdır.');
    await c.choice({ tag: 'Uygula', q: 'Bir öğrenci gübrenin domates fidesinin boyunu etkileyip etkilemediğini sınıyor. Bir gruba gübre veriyor, ötekine vermiyor; sonra boyları ölçüyor. Bağımlı değişken hangisidir?',
      options: ['Gübre verilip verilmemesi', 'Fidelerin boyu', 'Fidelerin sayısı'], answer: 1,
      hints: ['Bunu öğrenci kendisi değiştiriyor; bu bağımsız değişkendir.', '', 'Fide sayısı gübreye bağlı değişmez.'],
      right: 'Boy, gübreye bağlı olarak değişebilir; öğrenci onu ölçüyor.' });
    c.note('<b>Bağımsız değişken değiştirilir; bağımlı değişken ona bağlı değişir.</b><br>Göz deseni → kalan güve sayısı', 'Değişkenler');
  }

  /* ---- Sahne 4 · Analiz ve sonuç ---- */
  async function analiz(c) {
    const s = c.svg(1000, 562), ser = serit(c, s, 6), g = c.S('g', {}, s);
    ser.ac(6);
    const ust = K.kart(c, g, 250, 100, 500, 125, 'Analiz ve sonuç çıkarma', ['Veriler yorumlanır'], { renk });
    await K.belir(c, ust);
    await c.say('Yedinci basamak analiz ve sonuç çıkarmadır: toplanan veriler yorumlanır.');
    satirlar(ust)[0].textContent = 'Verileri yorumlama: çıkarım';
    await c.say('Elde edilen verilerin yorumlanmasına çıkarım denir.');
    const dal = (x, baslik, satir, r) => {
      const k = c.S('g', {}, g);
      K.ok(c, k, 500 + (x + 145 - 500) * 0.45, 232, x + 145, 282, r);
      K.kart(c, k, x, 290, 290, 170, baslik, satir, { renk: r, altSize: 26 });
      return k;
    };
    const d1 = dal(40, 'Destekliyor', ['Raporla, duyur'], 'var(--good)');
    const rapor = satirlar(d1)[0];
    rapor.style.visibility = 'hidden';
    await K.belir(c, d1);
    await c.say('Desenli güveler daha az avlanmışsa veriler hipotezi destekler.');
    rapor.style.visibility = 'visible';
    await K.belir(c, rapor, 300);
    await c.say('Bu durumda sonuçlar raporlanır ve bilim çevrelerine duyurulur.');
    const d2 = dal(355, 'Çelişiyor', ['Hipotezi', 'gözden geçir'], 'var(--bad)');
    await K.belir(c, d2);
    await c.say('Veriler hipotezle çelişirse hipotez gözden geçirilir, gerekirse değiştirilir.');
    const d3 = dal(670, 'Yetersiz', ['Yeni veri topla'], IKINCI);
    await K.belir(c, d3);
    await c.say('Veriler yeterli değilse yeni gözlem ya da deneylerle yeni veri toplanır.');
    await c.choice({ tag: 'Uygula', q: 'Hipotez: “Ampul patlamış.” Ampul değiştirildi ama lamba yine yanmadı. Şimdi ne yapılır?',
      options: ['Hipotez gözden geçirilir; başka bir neden aranır.', 'Hipotez desteklendi; sonuç duyurulur.', 'Lamba yanmış gibi kaydedilir.'], answer: 0,
      hints: ['', 'Tahmin tutmadı: lamba yanmadı. Veri hipotezle çelişiyor.', 'Veri olduğu gibi kaydedilir; hipoteze uydurulmaz.'],
      right: 'Veri hipotezle çelişti; hipotez gözden geçirilir.' });
    await Promise.all([sil(c, ust), sil(c, d1), sil(c, d3)]);
    d2.querySelector('line').remove(); d2.querySelector('path').remove();
    const don = c.S('g', {}, g);
    K.ok(c, don, 500, 282, 500, 84, 'var(--bad)');
    K.yazi(c, don, 520, 190, 'Yeni hipotez', { size: 28, hiza: 'start' });
    ser.vurgula(3);
    await K.belir(c, don, 350);
    await c.say('Araştırma böylece geri döner: yeni hipotez, yeni tahmin, yeni sınama.');
    c.note('<b>Veri destekliyorsa duyur, çelişiyorsa hipotezi gözden geçir.</b><br>Yetersizse yeni veri topla.', 'Analiz ve sonuç');
  }

  /* ---- Sahne 5 · Söğütlerde aynı basamaklar ---- */
  async function sogut(c) {
    const s = c.svg(1000, 562), ser = serit(c, s, 7), g = c.S('g', {}, s);
    const agac = (x, y, r) => {
      c.S('rect', { x: x - 4, y, width: 8, height: 24, fill: '#6b5a45' }, g);
      c.S('circle', { cx: x, cy: y - 8, r: 19, fill: r }, g);
    };
    c.S('ellipse', { cx: 470, cy: 265, rx: 330, ry: 58, fill: '#1d3a5f', stroke: '#3c6ea8', 'stroke-width': 3 }, g);
    for (let i = 0; i < 9; i++) agac(210 + i * 65, 165, '#2f9e6e');
    for (let i = 0; i < 8; i++) agac(240 + i * 65, 358, i === 0 || i === 2 ? '#2f9e6e' : '#c9b458');
    const kuzey = K.yazi(c, g, 470, 118, 'Kuzey kıyı: sağlıklı', { size: 26 });
    const guney = K.yazi(c, g, 400, 440, 'Güney kıyı: yapraklar sararıyor', { size: 26 });
    await K.belir(c, g);
    await c.say('Başka bir araştırma: bir gölün kuzey kıyısındaki söğütlerin hepsi sağlıklı.',
      { speak: '[curious] Başka bir araştırma: bir gölün kuzey kıyısındaki söğütlerin hepsi sağlıklı.' });
    await c.say('Güney kıyıdaki söğütlerde ise yapraklar sararıyor, erken dökülüyor.');
    kuzey.textContent = 'Kuzey: 400 söğüt, hepsi sağlıklı';
    guney.textContent = 'Güney: 80 söğüt, 60’ı hastalıklı';
    await c.say('Araştırmacı ağaçları sayıyor: güneydeki 80 söğüdün 60’ı hastalıklı.',
      { speak: 'Araştırmacı ağaçları sayıyor: güneydeki seksen söğüdün altmışı hastalıklı.' });
    const park = c.S('g', {}, g);
    K.kutu(c, park, 800, 395, 160, 62, { rx: 8, fill: '#3a4055' });
    K.yazi(c, park, 880, 435, 'Otopark', { size: 24 });
    K.cizgi(c, park, 800, 415, 640, 345, 'var(--bad)', { 'stroke-dasharray': '10 8' });
    const hat = K.yazi(c, g, 500, 512, 'Hastalıklıların 42’si atık su hattına yakın', { size: 26, renk: 'var(--bad)' });
    await Promise.all([K.belir(c, park, 350), K.belir(c, hat, 350)]);
    await c.say('Hastalıklı 60 ağacın 42’si, otoparktan sızan atık suyun aktığı hatta yakın.',
      { speak: 'Hastalıklı altmış ağacın kırk ikisi, otoparktan sızan atık suyun aktığı hatta yakın.' });
    await c.choice({ tag: 'Uygula', q: 'Araştırmacı şöyle düşünüyor: “Otoparktan sızan atık su söğütleri hasta ediyor.” Bu cümle hangi basamaktır?',
      options: ['Gözlem yapma', 'Hipotez oluşturma', 'Analiz ve sonuç çıkarma'], answer: 1,
      hints: ['Gözlem görüleni kaydeder; bu cümle bir neden öneriyor.', '', 'Henüz sınama yapılmadı; veri yorumlanmıyor.'],
      right: 'Hastalığın nedenini açıklayan, sınanabilir bir öneri: hipotez.' });
    ser.vurgula(3);
    hat.textContent = 'Hipotez: atık su söğütleri hasta ediyor'; hat.style.fill = renk;
    await c.wait(1400);
    await sil(c, g);
    const d = c.S('g', {}, s);
    const fidan = (p, x, y, r) => {
      c.S('line', { x1: x, y1: y, x2: x, y2: y - 62, stroke: '#6b5a45', 'stroke-width': 5 }, p);
      [[-17, -40, -28], [17, -52, 28]].forEach(([dx, dy, a]) =>
        c.S('ellipse', { cx: x + dx, cy: y + dy, rx: 18, ry: 8, fill: r, transform: `rotate(${a} ${x + dx} ${y + dy})`, class: 'yaprak' }, p));
    };
    const fgrup = (x, su, ad, r) => {
      const k = c.S('g', {}, d);
      K.kutu(c, k, x, 105, 410, 250, { renk: r });
      const ust = K.yazi(c, k, x + 205, 148, su, { size: 24, renk: r });
      for (let i = 0; i < 5; i++) fidan(k, x + 55 + i * 75, 270, '#2f9e6e');
      const alt = K.yazi(c, k, x + 205, 328, ad, { size: 26 });
      ust.style.opacity = 0; alt.style.opacity = 0;
      return { k, ust, alt };
    };
    const kontrol = fgrup(60, 'Normal göl suyu', 'Kontrol grubu', SOLUK);
    const deneyG = fgrup(530, 'Atık su karışımlı göl suyu', 'Deney grubu', renk);
    await Promise.all([K.belir(c, kontrol.k), K.belir(c, deneyG.k)]);
    await c.say('Bu hipotezi sınamak için özdeş genç söğüt fidanları iki gruba ayrılır.');
    await Promise.all([K.belir(c, kontrol.ust, 300), K.belir(c, deneyG.ust, 300)]);
    await c.say('Bir grup normal göl suyuyla, öteki atık su karışımlı göl suyuyla sulanır.');
    await Promise.all([K.belir(c, kontrol.alt, 300), K.belir(c, deneyG.alt, 300)]);
    await c.say('Normal suyla sulanan gruba kontrol grubu, ötekine deney grubu denir.');
    await c.choice({ tag: 'Uygula', q: 'Bu deneyde bağımsız değişken hangisidir?',
      options: ['Fidanların sağlık durumu', 'Fidanların yaşı', 'Fidanların sulandığı su'], answer: 2,
      hints: ['Bu, suya bağlı olarak değişebilir; bağımlı değişkendir.', 'Fidanlar özdeş; yaş iki grupta aynı.', ''],
      right: 'Araştırmacının değiştirdiği tek şey sulama suyudur.' });
    ser.vurgula(5);
    deneyG.k.querySelectorAll('.yaprak').forEach((y) => y.setAttribute('fill', '#c9b458'));
    await K.belir(c, K.yazi(c, d, 500, 420, 'Hipotez doğruysa beklenen sonuç', { size: 28 }), 300);
    ser.vurgula(6);
    await c.say('Atık suyla sulanan fidanlar hastalanır, ötekiler sağlıklı kalırsa hipotez desteklenir.');
    await sil(c, d);
    const son = c.S('g', {}, s);
    K.kart(c, son, 70, 130, 400, 170, 'Güve hipotezi', ['Doğada gözlem ya da deney'], { renk, altSize: 26 });
    K.kart(c, son, 530, 130, 400, 170, 'Söğüt hipotezi', ['Laboratuvarda deney'], { renk: IKINCI, altSize: 26 });
    await K.belir(c, son);
    await c.say('Güve hipotezi doğada gözlemle de sınanabilirdi; söğüt hipotezi laboratuvarda sınanıyor.');
    await K.belir(c, K.yazi(c, son, 500, 400, 'Tek bir bilimsel yöntem yoktur', { size: 30, renk }), 300);
    await c.say('Bilimde tek bir yöntem yoktur; yol, soruya ve bilim dalına göre değişir.',
      { speak: '[thoughtful] Bilimde tek bir yöntem yoktur; yol, soruya ve bilim dalına göre değişir.' });
  }

  Ders.start({
    id: 'yasam-b2', kicker: 'Konu B · Bilimsel araştırma ve bilimin doğası', title: 'Bir araştırmanın basamakları', accent: renk, back: 'index.html',
    intro: { title: 'Bir araştırmanın basamakları', hook: 'Bir hipotezin doğru olup olmadığı nasıl anlaşılır?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Gözlem, problem, veri', goal: 'İlk üç basamağı güve örneğinde gör.', run: ilkUc },
      { title: 'Hipotez ve tahmin', goal: 'Hipotezden tahmin çıkar.', run: hipotezTahmin },
      { title: 'Deney ve değişkenler', goal: 'Bağımsız ve bağımlı değişkeni ayır.', run: deney },
      { title: 'Analiz ve sonuç', goal: 'Veriye göre ne yapılacağını seç.', run: analiz },
      { title: 'Söğütlerde aynı basamaklar', goal: 'Basamakları yeni bir araştırmada bul.', run: sogut },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir deneyde bitkilere farklı miktarda su veriliyor, sonra boyları ölçülüyor. Bağımsız değişken hangisidir?',
        options: ['Verilen su miktarı', 'Bitkilerin boyu', 'Bitkilerin türü'], answer: 0,
        why: ['Araştırmacının değiştirdiği ve etkisini araştırdığı değişken budur.', 'Boy, suya bağlı olarak değişir; bağımlı değişkendir.', 'Tür deneyde değiştirilmiyor.'], scene: 2 },
      { q: 'Deney verileri hipotezle çelişiyor. Araştırmacı ne yapar?',
        options: ['Verileri hipoteze uyacak biçimde değiştirir.', 'Hipotezi desteklenmiş sayıp duyurur.', 'Hipotezi gözden geçirir, gerekirse değiştirir.'], answer: 2,
        why: ['Veri olduğu gibi kalır; değişen hipotez olur.', 'Çelişen veri hipotezi desteklemez.', 'Çelişen veri, hipotezin yeniden düşünülmesini gerektirir.'], scene: 3 },
      { q: 'Bir araştırmacı, bir bitki özütünün karıncaları uzaklaştırıp uzaklaştırmadığını sınıyor. Bir karınca grubunun yoluna özütle, ötekinin yoluna yalnızca suyla ıslatılmış kâğıt koyuyor. Kontrol grubu hangisidir?',
        options: ['Suyla ıslatılmış kâğıt konan karıncalar', 'Özütlü kâğıt konan karıncalar', 'Kâğıttan uzak duran karınca sayısı'], answer: 0,
        why: ['Özüt almayan, yalnızca suyla ıslatılan grup kontrol grubudur; söğüt deneyindeki normal suyla sulanan grup gibi.', 'Özüt verilen bu grup, deney grubudur.', 'Bu sayı ölçülen bağımlı değişkendir; bir grup değildir.'], scene: 4 },
      { q: 'Bir öğrenci “Tahmin, deney bittikten sonra verilerden çıkan sonuçtur.” diyor. Hangisi bu söze doğru karşılıktır?',
        options: ['Doğru; tahmin, verilerin yorumlanmasıdır.', 'Yanlış; tahmin ile hipotez aynı basamaktır.', 'Yanlış; tahmin, deneyden önce hipotezden çıkarılır.'], answer: 2,
        why: ['Verilerin yorumu çıkarımdır; tahmin deneyden önce çıkarılır.', 'Hipotez dördüncü, tahmin beşinci basamaktır; ikisi ayrıdır.', 'Tahmin, sınamada neye bakılacağını önceden belirler.'], scene: 1 },
    ], summary: ['<b>Yol değişir, basamaklar tanınır.</b>', 'Gözlem → problem → veri → hipotez → tahmin → deney → analiz ve sonuç.'],
    nextLesson: { href: 'b3-bilimin-dogasi.html', label: 'Sonraki: Araştırmada bilimin doğasını bulmak ›' },
  });
})();
