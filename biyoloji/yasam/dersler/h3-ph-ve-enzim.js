/* H3 · BİY.9.1.8 b · Yazar notu: içerik MEB Biyoloji 9 s. 67 (aktif bölgenin pH değerine göre yapısı, optimum pH,
   hücre içi enzimlerde 6–8, pepsin ve tripsin, Grafik 1.3), s. 79 (uç pH değerlerinin kalıcı etkisi; "sindirim
   enzimlerinin çoğu niçin midede çalışmaz" sorusu), s. 80 (katalazın hücrede üretilmesi), s. 82 (sonuçların her enzime
   genellenmesi, asitli içecekler ve mide asitliği), s. 83 (karaciğer özütü ve balon düzeneği; 2, 3 ve 6. tüpler:
   pH 7, 4 ve 12, 37 °C, 10 ml + 10 ml).
   8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): önce olgu ve nedeni, sonra
   iki enzimin eğrisi, sonra deney ve yorumu. Kitap balon hacmi vermez; üç tüpün sonucu, kitabın ilkelerinden çıkan
   beklenen sonuç olarak nitel gösterilir. Eğriler kitaptaki Grafik 1.3'ün biçimidir. Programın sınırı: enzimlerin
   isimlendirilmesi anlatılmaz; pepsin ve tripsin yalnızca kitabın örneği olarak adlarıyla geçer. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.H, ASIT = 'var(--c2)', BAZ = 'var(--c1)', ILIK = 'var(--c2)', SUB = 'var(--c6)', ISARET = 'var(--c5)';
  const CAM = '#a8b3c7', OZUT = '#8a5a52';
  const yazi = (c, p, x, y, t, size = 28, renk, hiza) => K.yazi(c, p, x, y, t, { size, renk, hiza });
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  /* Enzim: üstteki girinti aktif bölgedir. BOZUK, yapısı bozulmuş biçimdir. */
  const NORMAL = [-95, 60, -160, -80, -50, -80, -5, -20, 40, -80, 175, -40, 95, 85];
  const BOZUK = [-80, 75, -185, -5, -90, -45, -30, -100, 25, -50, 115, -115, 125, 70];
  const bicim = (oran) => { const v = NORMAL.map((n, i) => Ders.lerp(n, BOZUK[i], oran)); return `M ${v[0]} ${v[1]} Q ${v[2]} ${v[3]} ${v[4]} ${v[5]} Q ${v[6]} ${v[7]} ${v[8]} ${v[9]} Q ${v[10]} ${v[11]} ${v[12]} ${v[13]} Z`; };

  /* pH şeridi: 0–14; sol yarı asidik, sağ yarı bazik. */
  const SX = (v) => 150 + v * 50;
  function serit(c, p, y) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: SX(0), y, width: 350, height: 44, fill: ASIT, opacity: 0.3 }, g);
    c.S('rect', { x: SX(7), y, width: 350, height: 44, fill: BAZ, opacity: 0.3 }, g);
    c.S('rect', { x: SX(0), y, width: 700, height: 44, fill: 'none', stroke: CAM, 'stroke-width': 2 }, g);
    for (let v = 0; v <= 14; v++) K.cizgi(c, g, SX(v), y + 44, SX(v), y + 53, CAM, { width: 2 });
    [0, 7, 14].forEach((v) => yazi(c, g, SX(v), y + 85, String(v), 24));
    return g;
  }
  function isaret(c, p, y, ad) {
    const g = c.S('g', {}, p);
    c.S('path', { d: 'M -12 -18 L 12 -18 L 0 -2 Z', fill: ISARET }, g);
    const metin = yazi(c, g, 0, -30, '', 26, ISARET);
    const git = (v) => { g.setAttribute('transform', `translate(${SX(v)} ${y})`); metin.textContent = ad || 'pH ' + Math.round(v); };
    return { g, git };
  }

  /* ---- Sahne 1 · pH enzimi nasıl etkiler? ---- */
  async function etki(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, serit(c, g, 100));
    await c.say('pH, bir ortamın ne kadar asidik ya da bazik olduğunu gösterir.', { speak: 'Pehaş, bir ortamın ne kadar asidik ya da bazik olduğunu gösterir.' });
    const bolge = c.S('g', {}, g);
    yazi(c, bolge, SX(3.5), 131, 'Asidik', 26, ASIT); yazi(c, bolge, SX(10.5), 131, 'Bazik', 26, BAZ);
    await K.belir(c, bolge, 350);
    await c.say('pH 7’den küçükse ortam asidik, büyükse baziktir.', { speak: 'Pehaş yediden küçükse ortam asidik, büyükse baziktir.' });
    const eg = c.S('g', {}, g);
    const enz = c.S('path', { d: bicim(0), transform: 'translate(480 365)', fill: '#202a43', stroke: R, 'stroke-width': 6 }, eg);
    const ok = isaret(c, eg, 100); ok.git(7);
    await K.belir(c, eg);
    const kay = (a, b, o1, o2, ms = 1300) => c.tween(ms, (e) => { ok.git(Ders.lerp(a, b, e)); enz.setAttribute('d', bicim(Ders.lerp(o1, o2, e))); });
    await kay(7, 4, 0, 0.45);
    await c.say('Enzimin aktif bölgesinin yapısı, ortamın pH değerine göre değişir.', { speak: 'Enzimin aktif bölgesinin yapısı, ortamın pehaş değerine göre değişir.' });
    await c.say('Bu yüzden enzim her pH değerinde aynı hızda çalışmaz.', { speak: 'Bu yüzden enzim her pehaş değerinde aynı hızda çalışmaz.' });
    await kay(4, 7, 0.45, 0);
    const sub = c.S('ellipse', { cx: 760, cy: 290, rx: 30, ry: 18, fill: SUB }, eg);
    await c.tween(800, (e) => { sub.setAttribute('cx', Ders.lerp(760, 475, e)); sub.setAttribute('cy', Ders.lerp(290, 302, e)); });
    const durum = yazi(c, eg, 480, 505, 'Optimum pH: aktivite en yüksek', 28, R);
    await K.belir(c, durum, 350);
    await c.say('Enzimin en aktif olduğu pH değerine optimum pH denir.', { speak: 'Enzimin en aktif olduğu pehaş değerine [short pause] optimum pehaş denir.' });
    await Promise.all([kay(7, 9.5, 0, 0.45), c.tween(1300, (e) => { sub.setAttribute('cx', Ders.lerp(475, 740, e)); sub.setAttribute('cy', Ders.lerp(302, 270, e)); })]);
    durum.textContent = 'Aktivite düşük';
    await c.say('pH optimumdan uzaklaştıkça enzim aktivitesi düşer.', { speak: 'Pehaş optimumdan uzaklaştıkça enzim aktivitesi düşer.' });
    await kay(9.5, 13, 0.45, 1);
    durum.textContent = 'Yapı bozuldu'; durum.style.fill = 'var(--bad)';
    await c.say('Uç pH değerleri enzimin yapısını kalıcı olarak bozar.', { speak: '[thoughtful] Uç pehaş değerleri enzimin yapısını kalıcı olarak bozar.' });
    await sil(c, eg);
    const bant = c.S('g', {}, g);
    c.S('rect', { x: SX(6), y: 94, width: 100, height: 56, rx: 6, fill: 'none', stroke: R, 'stroke-width': 4 }, bant);
    yazi(c, bant, 500, 290, 'Hücre içindeki birçok enzim', 28); yazi(c, bant, 500, 335, 'Optimum pH: 6–8', 30, R);
    await K.belir(c, bant);
    await c.say('Hücre içindeki birçok enzimin optimum pH değeri 6–8 arasındadır.', { speak: 'Hücre içindeki birçok enzimin optimum pehaş değeri altı ile sekiz arasındadır.' });
    await c.choice({ tag: 'Uygula', q: 'Optimum pH değeri 7 olan bir enzim, pH değeri 2 olan bir ortama konuyor. Ne beklenir?',
      options: ['Aktivitesi artar; asidik ortam tepkimeyi hızlandırır.', 'Aktivitesi düşer; aktif bölgesinin yapısı değişir.', 'Aktivitesi değişmez.'], answer: 1,
      hints: ['Enzim en hızlı, optimum pH değerinde çalışır; pH 2 optimumdan uzaktır.', '', 'Aktif bölgenin yapısı ortamın pH değerine göre değişir.'],
      right: 'pH 2, bu enzimin optimumundan çok uzaktır; aktif bölgenin yapısı değişir.' });
    await c.say('Asidik ortam bu enzimi hızlandırmaz; optimumundan uzaklaştırır.');
    c.note('<b>Optimum pH: enzimin en aktif olduğu pH değeri.</b><br>Hücre içindeki birçok enzim: pH 6–8', 'Optimum pH');
  }

  /* ---- Sahne 2 · İki enzim, iki optimum ---- */
  async function ikiEnzim(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const X = (v) => 150 + v * 70, TABAN = 420, TEPE = 170;
    K.ok(c, g, 150, TABAN, 890, TABAN, CAM); K.ok(c, g, 150, TABAN, 150, 95, CAM);
    for (let v = 0; v <= 10; v++) { K.cizgi(c, g, X(v), TABAN, X(v), TABAN + 9, CAM, { width: 2 }); yazi(c, g, X(v), TABAN + 38, String(v), 24); }
    yazi(c, g, 500, 508, 'pH', 26);
    c.S('text', { x: 105, y: 280, text: 'Enzim aktivitesi', 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 550, transform: 'rotate(-90 105 280)', style: 'fill:var(--text)' }, g);
    await K.belir(c, g);
    await c.say('Bazı enzimlerin optimum pH değeri asidik ya da bazik bölgededir.', { speak: 'Bazı enzimlerin optimum pehaş değeri asidik ya da bazik bölgededir.' });
    const ciz = async (d, renk) => {
      const p = c.S('path', { d, fill: 'none', stroke: renk, 'stroke-width': 6, 'stroke-linecap': 'round' }, g), L = p.getTotalLength();
      p.setAttribute('stroke-dasharray', L);
      await c.tween(1500, (e) => p.setAttribute('stroke-dashoffset', L * (1 - e)));
      p.removeAttribute('stroke-dasharray'); p.removeAttribute('stroke-dashoffset');
      return p;
    };
    const ad = (x, ust, alt, renk) => { const a = c.S('g', {}, g); yazi(c, a, x, 105, ust, 28, renk); yazi(c, a, x, 140, alt, 24); return a; };
    await K.belir(c, ad(X(2.3), 'Pepsin', 'midede', ASIT), 350);
    await c.say('Midenin içi asidiktir; burada pepsin adlı sindirim enzimi çalışır.');
    const pepsin = await ciz(`M ${X(0)} ${TABAN} C ${X(0.7)} 395 ${X(1.2)} ${TEPE} ${X(2.3)} ${TEPE} C ${X(3.3)} ${TEPE} ${X(3.7)} 405 ${X(4.6)} ${TABAN}`, ASIT);
    K.cizgi(c, g, X(2.3), TEPE, X(2.3), TABAN, ASIT, { width: 2, 'stroke-dasharray': '7 7' });
    await c.say('Pepsinin aktivitesi pH 2 ile 3 arasında en yüksektir.', { speak: 'Pepsinin aktivitesi pehaş iki ile üç arasında en yüksektir.' });
    await K.belir(c, ad(X(7.8), 'Tripsin', 'ince bağırsakta', BAZ), 350);
    await c.say('İnce bağırsak ise bazik bir ortamdır; burada tripsin çalışır.');
    const tripsin = await ciz(`M ${X(5.4)} ${TABAN} C ${X(6.2)} 405 ${X(6.6)} ${TEPE} ${X(7.8)} ${TEPE} C ${X(8.9)} ${TEPE} ${X(9.2)} 400 ${X(10)} ${TABAN}`, BAZ);
    K.cizgi(c, g, X(7.8), TEPE, X(7.8), TABAN, BAZ, { width: 2, 'stroke-dasharray': '7 7' });
    await c.say('Tripsinin aktivitesi pH 8 dolayında en yüksektir.', { speak: 'Tripsinin aktivitesi pehaş sekiz dolayında en yüksektir.' });
    /* kaydırıcı: pH çizgisi iki eğriyi keser */
    const kg = c.S('g', {}, g);
    const cizgi = K.cizgi(c, kg, 0, TEPE - 15, 0, TABAN, ISARET, { width: 3 });
    const np = c.S('circle', { r: 11, fill: ASIT, stroke: '#10162b', 'stroke-width': 3 }, kg), nt = c.S('circle', { r: 11, fill: BAZ, stroke: '#10162b', 'stroke-width': 3 }, kg);
    const durum = yazi(c, kg, 500, 60, '', 26, ISARET);
    const yukseklik = (yol, v, bas, son) => {
      if (v <= bas || v >= son) return TABAN;
      let a = 0, b = yol.getTotalLength();
      for (let i = 0; i < 20; i++) { const m = (a + b) / 2; if (yol.getPointAtLength(m).x < X(v)) a = m; else b = m; }
      return yol.getPointAtLength((a + b) / 2).y;
    };
    const sl = c.slider({ label: 'Ortamın pH değeri', min: 0, max: 10, step: 0.5, value: 5, fmt: (v) => String(v).replace('.', ','), onInput: (v) => {
      const yp = yukseklik(pepsin, v, 0, 4.6), yt = yukseklik(tripsin, v, 5.4, 10), esik = TABAN - 20;
      cizgi.setAttribute('x1', X(v)); cizgi.setAttribute('x2', X(v));
      np.setAttribute('cx', X(v)); np.setAttribute('cy', yp); nt.setAttribute('cx', X(v)); nt.setAttribute('cy', yt);
      durum.textContent = yp < esik ? 'Pepsin çalışıyor' : yt < esik ? 'Tripsin çalışıyor' : 'İki enzim de çalışmıyor';
    } });
    await c.say('pH değerini değiştir; hangi enzimin çalıştığını izle.', { noWait: true });
    await c.cont('İzledim ›');
    sl.remove(); kg.remove(); c.clearSay();
    await c.choice({ tag: 'Uygula', q: 'Sindirim enzimlerinin çoğu midede çalışmaz. Bunun nedeni hangisidir?',
      options: ['Midede enzimlerin etki edeceği substrat bulunmaz.', 'Mide, enzimlerin çalışamayacağı kadar soğuktur.', 'Midenin asidik ortamı, çoğu enzimin optimum pH değerinden uzaktır.'], answer: 2,
      hints: ['Eksik olan substrat değil; ortamın pH değeri uygun değil.', 'Fark sıcaklıkta değil, ortamın pH değerindedir.', ''],
      right: 'Mide asidiktir; çoğu enzimin optimum pH değeri ise bu kadar düşük değildir.' });
    await c.say('Pepsin ise tam bu asidik ortamda en iyi çalışan enzimdir.');
    c.note('<b>Her enzimin kendi optimum pH değeri vardır.</b><br>Pepsin asidik, tripsin bazik ortamda çalışır.', 'İki enzim');
  }

  /* Su banyosunda deney tüpü ve ağzında balon. */
  function tup(c, p, x) {
    const g = c.S('g', {}, p), banyoG = c.S('g', {}, g);
    c.S('rect', { x: x - 90, y: 345, width: 180, height: 107, fill: ILIK, opacity: 0.3 }, banyoG);
    c.S('path', { d: `M ${x - 93} 315 L ${x - 93} 455 L ${x + 93} 455 L ${x + 93} 315`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, banyoG);
    banyoG.style.opacity = 0;
    const balon = c.S('ellipse', { cx: x, fill: R }, g);
    c.S('rect', { x: x - 11, y: 222, width: 22, height: 14, rx: 3, fill: R }, g);
    c.S('path', { d: `M ${x - 21} 370 L ${x - 21} 412 Q ${x - 21} 434 ${x} 434 Q ${x + 21} 434 ${x + 21} 412 L ${x + 21} 370 Z`, fill: OZUT }, g);
    c.S('path', { d: `M ${x - 24} 232 L ${x - 24} 412 Q ${x - 24} 437 ${x} 437 Q ${x + 24} 437 ${x + 24} 412 L ${x + 24} 232`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    const sisir = (ry) => { balon.setAttribute('rx', Math.max(9, ry * 0.82)); balon.setAttribute('ry', ry); balon.setAttribute('cy', 226 - ry); };
    sisir(15);
    return { g, banyoG, sisir };
  }

  /* ---- Sahne 3 · Üç tüp, üç pH ---- */
  async function deney(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const X = [200, 500, 800], DEGER = ['pH 4', 'pH 7', 'pH 12'], RENK = [ASIT, 'var(--text)', BAZ];
    const t = X.map((x) => tup(c, g, x));
    const ust = yazi(c, g, 500, 50, 'Katalaz: hidrojen peroksit → su + oksijen', 28, R);
    await K.belir(c, g);
    await c.say('Önceki derste gördük: katalazın oluşturduğu oksijen, tüpün ağzındaki balonu şişirir.');
    const etiket = c.S('g', {}, g);
    X.forEach((x, i) => yazi(c, etiket, x, 505, DEGER[i], 30, RENK[i]));
    await K.belir(c, etiket, 350);
    await c.say('Bu kez üç tüpün pH değerleri 4, 7 ve 12 olarak ayarlanır.', { speak: 'Bu kez üç tüpün pehaş değerleri dört, yedi ve on iki olarak ayarlanır.' });
    ust.textContent = 'Üç tüp de 37 °C sıcaklıktaki suda';
    await c.tween(450, (e) => t.forEach((u) => { u.banyoG.style.opacity = e; }));
    await c.say('Üç tüp de 37 °C sıcaklıktaki suda bekletilir.', { speak: 'Üç tüp de otuz yedi derece sıcaklıktaki suda bekletilir.' });
    ust.textContent = 'Değişen yalnızca pH';
    await K.belir(c, ust, 350);
    await c.say('Karaciğer özütü ve hidrojen peroksit miktarı da eşittir; yalnızca pH farklıdır.', { speak: 'Karaciğer özütü ve hidrojen peroksit miktarı da eşittir; yalnızca pehaş farklıdır.' });
    ust.textContent = 'Hücre içindeki birçok enzim: optimum pH 6–8';
    await K.belir(c, ust, 350);
    await c.say('Katalaz, hücre içinde çalışan bir enzimdir.');
    await c.choice({ q: 'Balonun en çok şişmesi hangi tüpte beklenir?',
      options: ['pH 4', 'pH 12', 'pH 7'], answer: 2,
      hints: ['pH 4, hücre içindeki birçok enzimin 6–8 aralığının altındadır.', 'pH 12, 6–8 aralığının çok üstündedir.', ''],
      right: 'Hücre içindeki birçok enzimin optimumu 6–8 arasındadır; üç değerden yalnızca 7 bu aralıktadır.' });
    ust.textContent = 'Beklenen sonuç';
    await c.tween(1800, (e) => { t[0].sisir(15 + 11 * e); t[1].sisir(15 + 55 * e); t[2].sisir(15 + 11 * e); });
    await c.say('pH 7 tüpünde katalaz en hızlı çalışır; balon en çok şişer.', { speak: 'Pehaş yedi tüpünde katalaz en hızlı çalışır; balon en çok şişer.' });
    await c.say('pH 4 ve pH 12 optimumdan uzaktır; bu tüplerde balon az şişer.', { speak: 'Pehaş dört ve pehaş on iki optimumdan uzaktır; bu tüplerde balon az şişer.' });
  }

  /* ---- Sahne 4 · Sonucu yorumla ---- */
  async function yorum(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    yazi(c, g, 500, 60, 'Katalaz: beklenen sonuç', 30, R);
    K.cizgi(c, g, 200, 400, 800, 400);
    const cubuk = (x, h, ad, renk) => { c.S('rect', { x: x - 60, y: 400 - h, width: 120, height: h, rx: 4, fill: R }, g); yazi(c, g, x, 445, ad, 28, renk); };
    cubuk(300, 60, 'pH 4', ASIT); cubuk(500, 260, 'pH 7'); cubuk(700, 60, 'pH 12', BAZ);
    yazi(c, g, 500, 510, 'Balonun şişmesi', 26, 'var(--muted)');
    await K.belir(c, g);
    await c.say('Sonuçlar grafiğe aktarılınca en yüksek sütun pH 7’de görülür.', { speak: 'Sonuçlar grafiğe aktarılınca en yüksek sütun pehaş yedide görülür.' });
    await c.choice({ tag: 'Uygula', q: 'Aynı deney pepsinle yapılsaydı en yüksek aktivite hangi tüpte beklenirdi?',
      options: ['pH 4', 'pH 7', 'pH 12'], answer: 0,
      hints: ['', 'Pepsinin eğrisi pH 7’de sıfırdaydı.', 'Pepsin bazik ortamda çalışmaz.'],
      right: 'Pepsin asidik ortamda çalışır; üç değerden yalnızca pH 4 asidiktir.' });
    const pepsin = c.S('g', {}, g);
    yazi(c, pepsin, 300, 270, 'Pepsin', 28, ASIT); yazi(c, pepsin, 300, 308, 'burada çalışır', 26, ASIT);
    await K.belir(c, pepsin, 350);
    await c.say('Bir enzimle bulunan sonuç, başka bir enzime genellenemez.', { speak: '[thoughtful] Bir enzimle bulunan sonuç, başka bir enzime genellenemez.' });
    await sil(c, g);
    const m = c.S('g', {}, s);
    serit(c, m, 170);
    yazi(c, m, SX(5), 201, 'Asidik', 26, ASIT); yazi(c, m, SX(10.5), 201, 'Bazik', 26, BAZ);
    c.S('rect', { x: SX(2), y: 164, width: 50, height: 56, rx: 6, fill: 'none', stroke: R, 'stroke-width': 4 }, m);
    yazi(c, m, SX(2.5), 320, 'Pepsinin optimumu', 28, R);
    K.cizgi(c, m, SX(2.5), 228, SX(2.5), 288, R, { width: 2 });
    const mide = isaret(c, m, 164, 'Mide'); mide.git(2.5);
    const durum = yazi(c, m, 500, 440, 'Mide optimumda: pepsin hızlı çalışır', 28);
    await K.belir(c, m);
    await c.say('Asitli içecekler gibi beslenme alışkanlıkları mide asitliğini değiştirebilir.');
    await c.choice({ tag: 'Uygula', q: 'Bir kişinin mide pH değeri, pepsinin optimumundan uzaklaşıp 5’e çıkıyor. Pepsinin aktivitesi nasıl değişir?',
      options: ['Artar; pH yükseldikçe her enzim hızlanır.', 'Düşer; pH 5, pepsinin çalıştığı aralığın dışındadır.', 'Değişmez; pepsin her pH değerinde aynı çalışır.'], answer: 1,
      hints: ['Enzim, optimumundan uzaklaştıkça yavaşlar.', '', 'Pepsinin eğrisi yalnızca asidik bölgede yükseliyordu.'],
      right: 'pH 5’te pepsinin eğrisi sıfıra inmişti; optimumdan uzaklaşan enzim yavaşlar.' });
    await c.tween(1200, (e) => mide.git(Ders.lerp(2.5, 5, e)));
    durum.textContent = 'Optimumdan uzak: pepsinin aktivitesi düşük';
    await K.belir(c, durum, 350);
    await c.say('Midenin pH değeri optimumdan uzaklaşırsa pepsinin aktivitesi düşer.', { speak: 'Midenin pehaş değeri optimumdan uzaklaşırsa pepsinin aktivitesi düşer.' });
    await c.say('Her enzim, kendi optimum pH değerinde en hızlı çalışır.', { speak: 'Her enzim, kendi optimum pehaş değerinde en hızlı çalışır.' });
  }

  Ders.start({
    id: 'yasam-h3', kicker: 'Konu H · Enzim deneyi', title: 'pH ve enzim', accent: R, back: 'index.html',
    intro: { title: 'pH ve enzim', hook: 'Her enzim aynı pH değerinde mi en iyi çalışır?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'pH enzimi nasıl etkiler?', goal: 'Optimum pH kavramını öğren.', run: etki },
      { title: 'İki enzim, iki optimum', goal: 'Pepsin ve tripsinin eğrilerini karşılaştır.', run: ikiEnzim },
      { title: 'Üç tüp, üç pH', goal: 'Deneyin sonucunu tahmin et.', run: deney },
      { title: 'Sonucu yorumla', goal: 'Sonucu başka enzime ve mideye uygula.', run: yorum },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Pepsin, pH değeri 8 olan bir çözeltiye konursa ne beklenir?', options: ['En hızlı hâliyle çalışır.', 'Çalışmaz; bu değer pepsinin çalıştığı aralığın dışındadır.', 'Tripsine dönüşür.'], answer: 1,
        why: ['pH 8 tripsinin optimumuna yakındır; pepsinin optimumu asidik bölgededir.', 'Pepsin yalnızca asidik ortamda çalışır.', 'Ortamın pH değeri bir enzimi başka bir enzime dönüştürmez.'], scene: 1 },
      { q: 'Bir enzimin optimum pH değeri 7 bulundu. Bundan hangi sonuç çıkar?', options: ['Bu enzim pH 7’de en hızlı çalışır; başka enzimlerin optimumu farklı olabilir.', 'Bütün enzimlerin optimum pH değeri 7’dir.', 'Bu enzim pH 7 dışında hiç çalışmaz.'], answer: 0,
        why: ['Her enzimin kendi optimum pH değeri vardır.', 'Pepsinin optimumu asidik, tripsininki bazik bölgededir.', 'Optimumdan uzaklaştıkça aktivite düşer; hemen sıfıra inmez.'], scene: 3 },
      { q: 'Yeni bulunan bir enzim pH 10’da en hızlı çalışıyor. Bu enzim hangi ortamda en hızlı çalışır?',
        options: ['Mide gibi asidik bir ortam', 'Hücre içi gibi pH 6–8 arasındaki bir ortam', 'pH değeri 7’den çok büyük, bazik bir ortam'], answer: 2,
        why: ['Asidik ortamın pH değeri 7’den küçüktür; bu enzimin optimumu ise 7’den büyüktür.', 'Hücre içindeki birçok enzimin optimumu 6–8 arasındadır; pH 10 bu aralığın dışındadır.', 'pH 7’den büyük değerler baziktir; tripsin gibi bu enzimin de optimumu bazik bölgededir.'], scene: 1 },
      { q: 'Bir öğrenci “Bir enzimi çok bazik bir ortamda bekletsem de ortamı optimum pH değerine getirince eski hızında çalışır.” diyor. Bu söz için ne söylenir?',
        options: ['Doğru; aktif bölgenin yapısı pH değerinden etkilenmez.', 'Yanlış; uç pH değerleri enzimin yapısını kalıcı olarak bozar.', 'Yanlış; enzimin optimum pH değeri ortama göre değişir.'], answer: 1,
        why: ['Aktif bölgenin yapısı ortamın pH değerine göre değişir.', 'Yapısı bozulan enzim optimum pH değerine dönülse de eski hızına ulaşamaz.', 'Optimum pH enzimin kendine özgü değeridir; ortam değiştiği için değişmez.'], scene: 0 },
    ], summary: ['<b>Her enzimin kendi optimum pH değeri vardır.</b>', 'Pepsin asidik midede, tripsin bazik ince bağırsakta, hücre içindeki birçok enzim pH 6–8 arasında çalışır.'],
    nextLesson: { href: 'h4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
