/* H1 · BİY.9.1.8 a · Yazar notu: içerik MEB Biyoloji 9 s. 79 (hamur, en uygun koşul, düşük sıcaklıkta yavaşlama),
   s. 80–81 (katalaz, maya ve ters silindir düzeneği, beş dakikalık kabarcık sayımı, güvenlik), s. 82 (değişkenler,
   kontrol değişkenlerinin sabit tutulması), s. 26 (bağımsız ve bağımlı değişken tanımı).
   8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): önce olgu, sonra ölçüm
   yöntemi, sonra değişkenler ve beklenen sonuç. Kitap kabarcık sayısı vermez; sonuç nitel gösterilir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.H, SOGUK = 'var(--c1)', ILIK = 'var(--c2)', SUB = 'var(--c6)';
  const CAM = '#a8b3c7', SU = '#274960', KARISIM = '#7d5a86', TIPA = '#b5533c', GAZ = '#d7ecff';
  const yazi = (c, p, x, y, t, size = 28, renk, hiza) => K.yazi(c, p, x, y, t, { size, renk, hiza });
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  /* Kâse ve hamur: h, hamurun kâse ağzından yüksekliği. */
  function kase(c, p, x, y) {
    const g = c.S('g', {}, p);
    const hamur = c.S('path', { fill: '#e6d3ab' }, g);
    c.S('path', { d: `M ${x - 120} ${y} Q ${x - 105} ${y + 100} ${x} ${y + 100} Q ${x + 105} ${y + 100} ${x + 120} ${y} Z`, fill: '#394157', stroke: CAM, 'stroke-width': 3 }, g);
    const kabar = (h) => hamur.setAttribute('d', `M ${x - 108} ${y} Q ${x - 100} ${y - 2 * h} ${x} ${y - 2 * h} Q ${x + 100} ${y - 2 * h} ${x + 108} ${y} Z`);
    kabar(9);
    return { g, kabar };
  }

  /* Maya ve ters silindir düzeneği (kitaptaki katalaz etkinliği). */
  function duzenek(c, p) {
    const d = { tup: c.S('g', {}, p), kap: c.S('g', {}, p) };
    c.S('path', { d: 'M 153 310 L 153 400 Q 153 437 190 437 Q 227 437 227 400 L 227 310 Z', fill: KARISIM }, d.tup);
    c.S('path', { d: 'M 150 170 L 150 400 Q 150 440 190 440 Q 230 440 230 400 L 230 170', fill: 'none', stroke: CAM, 'stroke-width': 3 }, d.tup);
    d.tipa = c.S('rect', { x: 144, y: 150, width: 92, height: 38, rx: 6, fill: TIPA }, d.tup);
    c.S('rect', { x: 443, y: 300, width: 354, height: 167, fill: SU }, d.kap);
    c.S('path', { d: 'M 440 250 L 440 470 L 800 470 L 800 250', fill: 'none', stroke: CAM, 'stroke-width': 3 }, d.kap);
    c.S('rect', { x: 563, y: 133, width: 74, height: 307, fill: SU }, d.kap);
    d.gaz = c.S('rect', { x: 563, y: 133, width: 74, height: 0, fill: '#10162b' }, d.kap);
    c.S('path', { d: 'M 560 440 L 560 130 L 640 130 L 640 440', fill: 'none', stroke: CAM, 'stroke-width': 3 }, d.kap);
    for (let i = 0; i < 6; i++) K.cizgi(c, d.kap, 640, 170 + i * 45, 654, 170 + i * 45, CAM, { width: 2 });
    c.S('path', { d: 'M 190 152 L 190 95 L 500 95 L 500 452 L 600 452 L 600 428', fill: 'none', stroke: '#c9705f', 'stroke-width': 8, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, d.kap);
    d.kabarcik = c.S('g', {}, p);
    return d;
  }
  /* Kabarcıklar silindirde yükselir; üstte gaz birikir. */
  function kabarciklar(c, d, ms, adet = 5) {
    d.kabarcik.replaceChildren();
    const b = Array.from({ length: adet }, () => c.S('circle', { r: 7, fill: GAZ }, d.kabarcik));
    return c.tween(ms, (e, t) => {
      b.forEach((el, i) => {
        const f = (t * 3 + i / adet) % 1;
        el.setAttribute('cx', 600 + 15 * Math.sin(i * 2.1 + f * 6));
        el.setAttribute('cy', 420 - f * 250);
      });
      d.gaz.setAttribute('height', 55 * t);
    }, Ders.ease.linear);
  }
  /* Su banyosunda bekleyen deney tüpü. */
  function banyo(c, p, x, y, renk, ad) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 85, y: y + 30, width: 170, height: 110, fill: renk, opacity: 0.3 }, g);
    c.S('path', { d: `M ${x - 88} ${y} L ${x - 88} ${y + 143} L ${x + 88} ${y + 143} L ${x + 88} ${y}`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    c.S('path', { d: `M ${x - 21} ${y + 60} L ${x - 21} ${y + 103} Q ${x - 21} ${y + 126} ${x} ${y + 126} Q ${x + 21} ${y + 126} ${x + 21} ${y + 103} L ${x + 21} ${y + 60} Z`, fill: KARISIM }, g);
    c.S('path', { d: `M ${x - 24} ${y - 40} L ${x - 24} ${y + 103} Q ${x - 24} ${y + 129} ${x} ${y + 129} Q ${x + 24} ${y + 129} ${x + 24} ${y + 103} L ${x + 24} ${y - 40}`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    c.S('rect', { x: x - 29, y: y - 52, width: 58, height: 22, rx: 4, fill: TIPA }, g);
    const etiket = yazi(c, g, x, y + 185, ad, 28, renk);
    return { g, etiket };
  }

  /* ---- Sahne 1 · Hamur neden kabarmadı? ---- */
  async function hamur(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const ilik = kase(c, g, 270, 270);
    yazi(c, g, 270, 420, 'Ilık ortam', 28, ILIK); yazi(c, g, 270, 460, '30–35 °C', 28, ILIK);
    await K.belir(c, g);
    await c.tween(1400, (e) => ilik.kabar(9 + 46 * e));
    await c.say('Ekmek hamuru, kabarması için ılık bir yerde bekletilir.');
    const sag = c.S('g', {}, g);
    kase(c, sag, 730, 270); yazi(c, sag, 730, 420, 'Soğuk ortam', 28, SOGUK);
    await K.belir(c, sag);
    await c.say('Soğuk bir yerde bekleyen hamur ise kabarmaz.', { speak: '[curious] Soğuk bir yerde bekleyen hamur ise kabarmaz.' });
    const ust = yazi(c, g, 500, 70, 'Hamuru kabartan: mayadaki enzimler', 30);
    await K.belir(c, ust, 350);
    await c.say('Hamuru kabartan, mayanın enzimlerle yürüttüğü tepkimelerdir.');
    ust.textContent = 'Enzim aktivitesi: enzimli tepkimenin hızı';
    await K.belir(c, ust, 350);
    await c.say('Enzimli bir tepkimenin hızına enzim aktivitesi denir.', { speak: 'Enzimli bir tepkimenin hızına [short pause] enzim aktivitesi denir.' });
    const dusuk = yazi(c, sag, 730, 460, 'Enzim aktivitesi düşük', 28, SOGUK);
    await K.belir(c, dusuk, 350);
    await c.say('Soğukta mayadaki enzimlerin aktivitesi düşer; hamur kabarmaz.');
    await sil(c, g);
    const k = c.S('g', {}, s);
    K.kart(c, k, 90, 90, 340, 130, 'Sıcaklık', [], { renk: ILIK });
    const ph = K.kart(c, k, 570, 90, 340, 130, 'pH', [], { renk: SUB });
    const akt = K.kart(c, k, 280, 320, 440, 140, 'Enzim aktivitesi', [], { renk: R });
    K.ok(c, k, 300, 225, 420, 310, ILIK); K.ok(c, k, 700, 225, 580, 310, SUB);
    await K.belir(c, k);
    await c.say('Enzim aktivitesi ortamın sıcaklığına ve pH değerine bağlıdır.', { speak: 'Enzim aktivitesi ortamın sıcaklığına ve pehaş değerine bağlıdır.' });
    await K.belir(c, yazi(c, ph, 740, 188, 'asidik ya da bazik'), 350);
    await c.say('pH, ortamın asidik ya da bazik olma derecesini gösterir.', { speak: 'Pehaş, ortamın asidik ya da bazik olma derecesini gösterir.' });
    await K.belir(c, yazi(c, akt, 500, 418, 'En uygun koşulda en yüksek'), 350);
    await c.say('Her enzimin en hızlı çalıştığı en uygun koşullar vardır.');
    await c.choice({ tag: 'Uygula', q: 'Oda sıcaklığındaki tohumlar, soğuk ortamdaki tohumlardan önce çimleniyor. En olası açıklama hangisidir?',
      options: ['Soğuk ortamdaki tohumlarda enzim bulunmaz.', 'Soğukta tohumun enzimleri daha yavaş çalışır.', 'Çimlenme sıcaklıktan etkilenmez.'], answer: 1,
      hints: ['Enzimler iki tohumda da vardır; fark çalışma hızındadır.', '', 'İki grup arasındaki tek fark sıcaklık; çimlenme süresi de değişmiş.'],
      right: 'Çimlenmeyi sağlayan tepkimeleri de enzimler yürütür; soğuk onları yavaşlatır.' });
    await c.say('Tohumda da hamurda da soğuk, enzimlerin çalışmasını yavaşlatır.');
    c.note('<b>Enzim aktivitesi: enzimli tepkimenin hızı.</b><br>Sıcaklığa ve pH değerine bağlıdır.', 'Enzim aktivitesi');
  }

  /* ---- Sahne 2 · Aktivite nasıl ölçülür? ---- */
  async function olcum(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    c.S('path', { d: 'M 245 320 Q 180 180 290 180 Q 335 240 380 180 Q 515 220 435 345 Z', fill: '#202a43', stroke: R, 'stroke-width': 6 }, g);
    yazi(c, g, 340, 410, 'Katalaz', 30, R);
    const sub = c.S('ellipse', { cx: 680, cy: 200, rx: 50, ry: 30, fill: SUB }, g);
    const subAd = yazi(c, g, 680, 140, 'Hidrojen peroksit');
    await K.belir(c, g);
    await c.say('Katalaz, hücrelerde oluşan zararlı hidrojen peroksidi etkisizleştiren bir enzimdir.');
    await c.tween(900, (e) => { sub.setAttribute('cx', 680 - 345 * e); sub.setAttribute('cy', 200 + 8 * e); subAd.style.opacity = 1 - e; });
    sub.remove(); subAd.remove();
    const urun = c.S('g', {}, g);
    const su = c.S('circle', { cx: 335, cy: 208, r: 24, fill: SOGUK }, urun), oksijen = c.S('circle', { cx: 335, cy: 208, r: 24, fill: GAZ }, urun);
    await c.tween(900, (e) => { su.setAttribute('cx', 335 + 285 * e); su.setAttribute('cy', 208 + 22 * e); oksijen.setAttribute('cx', 335 + 465 * e); oksijen.setAttribute('cy', 208 + 22 * e); });
    yazi(c, urun, 620, 300, 'Su'); yazi(c, urun, 800, 300, 'Oksijen');
    await c.say('Katalaz, hidrojen peroksidi su ve oksijene dönüştürür.');
    await K.belir(c, c.S('circle', { cx: 800, cy: 230, r: 40, fill: 'none', stroke: R, 'stroke-width': 3 }, urun), 350);
    await c.say('Oluşan oksijen ölçülürse katalazın ne kadar hızlı çalıştığı anlaşılır.');
    await K.belir(c, yazi(c, g, 500, 500, 'Hamur mayası: katalaz kaynağı', 28, R), 350);
    await c.say('Hamur mayası katalaz içerir; deneyde enzim kaynağı olarak kullanılır.');
    await sil(c, g);

    const dg = c.S('g', {}, s), d = duzenek(c, dg);
    d.kap.style.opacity = 0;
    const e1 = c.S('g', {}, dg);
    yazi(c, e1, 190, 485, 'Deney tüpü'); yazi(c, e1, 190, 525, 'Maya + hidrojen peroksit', 26); yazi(c, e1, 255, 178, 'Tıpa', 26, undefined, 'start');
    await K.belir(c, dg);
    await c.say('Deney tüpüne maya çözeltisi ve hidrojen peroksit konur; tıpa kapatılır.');
    const e2 = c.S('g', {}, dg);
    yazi(c, e2, 345, 75, 'Kauçuk boru', 26); yazi(c, e2, 670, 115, 'Su dolu ters silindir', 26, undefined, 'start');
    e2.style.opacity = 0;
    await c.tween(450, (e) => { d.kap.style.opacity = e; e2.style.opacity = e; });
    await c.say('Oluşan oksijen, kauçuk borudan geçip su dolu ters silindire ulaşır.');
    await kabarciklar(c, d, 2400);
    await c.say('Oksijen, silindirin içinde kabarcıklar hâlinde yükselir.');
    await K.belir(c, yazi(c, dg, 620, 520, 'Süre: 5 dakika', 28, R), 350);
    await c.say('Beş dakika boyunca çıkan kabarcıklar sayılır.');
    await c.choice({ tag: 'Uygula', q: 'İki tüpten birinde aynı sürede daha çok kabarcık sayıldı. Bu ne anlama gelir?',
      options: ['O tüpte katalaz daha yavaş çalışmıştır.', 'İki tüpte katalaz aynı hızda çalışmıştır.', 'O tüpte katalaz daha hızlı çalışmıştır.'], answer: 2,
      hints: ['Kabarcık tepkimenin ürünüdür; yavaş tepkime az ürün verir.', 'Hız aynı olsaydı aynı sürede aynı sayıda kabarcık çıkardı.', ''],
      right: 'Aynı sürede daha çok oksijen, daha hızlı tepkime demektir.' });
    await kabarciklar(c, d, 1500);
    await c.say('Kabarcık çoksa oksijen çoktur; yani enzim aktivitesi yüksektir.');
    c.note('<b>Kabarcık sayısı enzim aktivitesini gösterir.</b><br>Katalaz: hidrojen peroksit → su + oksijen', 'Ölçüm');
  }

  /* ---- Sahne 3 · Birini değiştir, birini ölç ---- */
  async function degisken(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const hip = yazi(c, g, 500, 55, 'Hipotez: Düşük sıcaklık katalazı yavaşlatır', 28, R);
    await K.belir(c, hip, 350);
    await c.say('Sınanacak hipotez: Düşük sıcaklık katalazın aktivitesini düşürür.');
    const b1 = banyo(c, g, 330, 135, SOGUK, 'Soğuk su'), b2 = banyo(c, g, 670, 135, ILIK, 'Ilık su');
    await Promise.all([K.belir(c, b1.g), K.belir(c, b2.g)]);
    await c.say('İki tüp hazırlanır: biri soğuk, öteki ılık suda bekletilir.');
    const satir = (y, ad, deger, renk) => {
      const r = c.S('g', {}, g);
      yazi(c, r, 480, y, ad, 28, renk, 'end');
      return { r, deger: yazi(c, r, 510, y, deger, 28, undefined, 'start') };
    };
    const bagimsiz = satir(405, 'Bağımsız değişken', 'sıcaklık', R);
    await K.belir(c, bagimsiz.r, 350);
    await c.say('Araştırmacının değiştirdiği koşula bağımsız değişken denir; burada sıcaklıktır.');
    const bagimli = satir(455, 'Bağımlı değişken', 'kabarcık sayısı', ILIK);
    await K.belir(c, bagimli.r, 350);
    await c.say('Ona bağlı olarak değişen kabarcık sayısı ise bağımlı değişkendir.');
    const kontrol = satir(505, 'Kontrol değişkenleri', 'miktarlar, pH, süre', SUB);
    await K.belir(c, kontrol.r, 350);
    await c.say('Öteki koşullar iki tüpte aynı tutulur; bunlar kontrol değişkenleridir.');
    await c.say('Maya ve hidrojen peroksit miktarı, pH ve süre iki tüpte eşittir.', { speak: 'Maya ve hidrojen peroksit miktarı, pehaş ve süre iki tüpte eşittir.' });
    await c.say('Böylece kabarcık sayısındaki fark yalnızca sıcaklığa bağlanabilir.', { speak: '[thoughtful] Böylece kabarcık sayısındaki fark yalnızca sıcaklığa bağlanabilir.' });
    hip.textContent = 'Katalaz · amilaz · lipaz';
    await K.belir(c, hip, 350);
    await c.say('Aynı tasarım amilaz ya da lipaz gibi başka enzimlerle de kurulur.');
    await c.choice({ tag: 'Uygula', q: 'Bu kez pH değerinin etkisi araştırılacak. Tüpler nasıl hazırlanır?',
      options: ['pH değerleri farklı, sıcaklıkları aynı', 'Sıcaklıkları farklı, pH değerleri aynı', 'Hem pH değerleri hem sıcaklıkları farklı'], answer: 0,
      hints: ['', 'Böyle hazırlanan tüpler sıcaklığın etkisini gösterir.', 'İki koşul birden değişirse hangisinin etkili olduğu anlaşılmaz.'],
      right: 'Etkisi araştırılan pH değiştirilir; sıcaklık sabit tutulur.' });
    hip.textContent = 'Araştırılan: pH değerinin etkisi';
    b1.etiket.textContent = 'pH düşük'; b2.etiket.textContent = 'pH yüksek';
    [b1, b2].forEach((b) => { b.etiket.style.fill = 'var(--text)'; b.g.querySelector('rect').setAttribute('fill', ILIK); });
    bagimsiz.deger.textContent = 'pH'; kontrol.deger.textContent = 'miktarlar, sıcaklık, süre';
    await c.say('pH araştırılırken sıcaklık, kontrol değişkenlerinden biri olur.', { speak: 'Pehaş araştırılırken sıcaklık, kontrol değişkenlerinden biri olur.' });
    await c.choice({ tag: 'Uygula', q: 'Bir öğrenci tüplerden birini hem soğuttu hem pH değerini değiştirdi. Bu tüpte az kabarcık çıktı. Ne söylenebilir?',
      options: ['Soğuk, enzimi yavaşlatmıştır.', 'pH değişimi enzimi yavaşlatmıştır.', 'Nedeni ayırt edilemez.'], answer: 2,
      hints: ['Olabilir; ama pH de değişti, ikisi ayrılamıyor.', 'Olabilir; ama sıcaklık da değişti, ikisi ayrılamıyor.', ''],
      right: 'İki koşul birlikte değişince hangisinin etkili olduğu anlaşılmaz.' });
    await c.say('Bu yüzden her deneyde yalnızca bir koşul değiştirilir.');
    c.note('<b>Birini değiştir, birini ölç, gerisini sabit tut.</b><br>Sıcaklık değişir, kabarcık sayılır.', 'Kontrollü deney');
  }

  /* ---- Sahne 4 · Hata kaynakları ve sonuç ---- */
  async function hata(c) {
    const s = c.svg(1000, 562), dg = c.S('g', {}, s), d = duzenek(c, dg);
    const ust = yazi(c, dg, 500, 50, 'Hata kaynağı: ölçümü yanıltan her şey', 28, R);
    await K.belir(c, dg);
    await c.say('Ölçümü yanıltan her şey bir hata kaynağıdır.');
    await kabarciklar(c, d, 1600);
    await c.say('Düzenekte oksijenin silindire ulaşmasının tek yolu kauçuk borudur.');
    const halka = c.S('circle', { cx: 190, cy: 168, r: 62, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 4 }, dg);
    ust.remove();
    await K.belir(c, halka, 350);
    await c.choice({ q: 'Bir tüpün tıpası gevşek kaldı. Bu tüpte sayılan kabarcık sayısı nasıl etkilenir?',
      options: ['Olduğundan çok sayılır.', 'Olduğundan az sayılır.', 'Etkilenmez.'], answer: 1,
      hints: ['Gevşek tıpa oksijen eklemez; oksijenin kaçmasına yol açar.', '', 'Oksijenin bir kısmı boruya girmeden tıpanın kenarından kaçar.'],
      right: 'Kaçan oksijen silindire ulaşmaz; aktivite olduğundan düşük görünür.' });
    const kacak = c.S('g', {}, dg);
    K.ok(c, kacak, 128, 150, 70, 105, 'var(--warn)'); yazi(c, kacak, 150, 85, 'Oksijen kaçar', 26, 'var(--warn)');
    await K.belir(c, kacak, 350);
    await c.say('Bu yüzden tıpa her tüpte sıkıca kapatılır.', { speak: '[thoughtful] Bu yüzden tıpa her tüpte sıkıca kapatılır.' });
    await sil(c, dg);
    const liste = c.S('g', {}, s);
    yazi(c, liste, 500, 80, 'Hatayı azaltan önlemler', 30, R);
    const madde = (i, t) => K.belir(c, yazi(c, liste, 250, 180 + i * 80, t, 28, undefined, 'start'), 350);
    yazi(c, liste, 250, 180, 'Tıpa sıkıca kapalı', 28, undefined, 'start');
    await K.belir(c, liste, 350);
    await madde(1, 'Yeni hazırlanmış, aynı çözelti');
    await c.say('Bütün tüplerde yeni hazırlanmış, aynı hidrojen peroksit çözeltisi kullanılır.');
    await madde(2, 'Kronometreyle 5 dakika');
    await c.say('Süre kronometreyle tutulur; her tüpte tam beş dakika sayılır.');
    await madde(3, 'Eldiven, gözlük, önlük');
    await c.say('Hidrojen peroksit güçlü bir ağartıcıdır; eldiven, gözlük ve önlük kullanılır.');
    await c.choice({ q: 'Hipotez “Düşük sıcaklık katalazı yavaşlatır.” idi. Doğruysa hangi sonuç beklenir?',
      options: ['Soğuk sudaki tüpte daha az kabarcık', 'İki tüpte eşit sayıda kabarcık', 'Soğuk sudaki tüpte daha çok kabarcık'], answer: 0,
      hints: ['', 'Eşit sonuç, sıcaklığın etkisi olmadığını gösterirdi.', 'Çok kabarcık hızlı tepkime demektir; hipotez yavaşlama öngörüyor.'],
      right: 'Yavaşlayan enzim aynı sürede daha az oksijen oluşturur.' });
    await sil(c, liste);
    const sonuc = c.S('g', {}, s);
    yazi(c, sonuc, 500, 70, 'Beklenen sonuç', 30, R);
    K.cizgi(c, sonuc, 220, 400, 780, 400);
    const cubuk = (x, h, ad, renk) => { c.S('rect', { x: x - 65, y: 400 - h, width: 130, height: h, rx: 4, fill: renk }, sonuc); yazi(c, sonuc, x, 445, ad, 28, renk); };
    cubuk(360, 250, 'Ilık su', ILIK); cubuk(640, 80, 'Soğuk su', SOGUK);
    yazi(c, sonuc, 500, 510, 'Beş dakikada sayılan kabarcık', 26, 'var(--muted)');
    await K.belir(c, sonuc);
    await c.say('Hipotez doğruysa soğuk sudaki tüpte daha az kabarcık sayılır.');
    await c.say('Düşük sıcaklık gerçekten enzimi yavaşlatır; hamur da bu yüzden kabarmaz.');
  }

  Ders.start({
    id: 'yasam-h1', kicker: 'Konu H · Enzim deneyi', title: 'Enzim deneyini tasarla', accent: R, back: 'index.html',
    intro: { title: 'Enzim deneyini tasarla', hook: 'Hamurun soğukta neden kabarmadığını bir deneyle nasıl gösterirsin?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Hamur neden kabarmadı?', goal: 'Enzim aktivitesini ortam koşullarına bağla.', run: hamur },
      { title: 'Aktivite nasıl ölçülür?', goal: 'Kabarcık sayısının neyi gösterdiğini bul.', run: olcum },
      { title: 'Birini değiştir, birini ölç', goal: 'Deneyin değişkenlerini belirle.', run: degisken },
      { title: 'Hata kaynakları ve sonuç', goal: 'Ölçümü koru, beklenen sonucu çıkar.', run: hata },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'pH değerinin katalaza etkisi araştırılıyor. Bağımlı değişken hangisidir?', options: ['Ortamın pH değeri', 'Ortamın sıcaklığı', 'Beş dakikada sayılan kabarcık'], answer: 2,
        why: ['pH, araştırmacının değiştirdiği bağımsız değişkendir.', 'Sıcaklık bu deneyde sabit tutulan bir kontrol değişkenidir.', 'Ölçülen ve pH değerine bağlı olarak değişen, kabarcık sayısıdır.'], scene: 2 },
      { q: 'Hangi karşılaştırma yalnızca sıcaklığın etkisini gösterir?', options: ['Soğuk tüpe daha az maya konur.', 'İki tüpte yalnızca suyun sıcaklığı farklıdır.', 'Soğuk tüp üç, ılık tüp beş dakika sayılır.'], answer: 1,
        why: ['Maya miktarı da değişirse fark sıcaklığa bağlanamaz.', 'Öteki koşullar eşitken fark yalnızca sıcaklıktan kaynaklanır.', 'Süre farklıysa kabarcık sayıları karşılaştırılamaz.'], scene: 2 },
    ], summary: ['<b>Birini değiştir, birini ölç, gerisini sabit tut.</b>', 'Sıcaklık ya da pH değişir, kabarcık sayılır; miktarlar ve süre eşit kalır.'],
    nextLesson: { href: 'h2-sicaklik-ve-enzim.html', label: 'Sonraki: Sıcaklık ve enzim ›' },
  });
})();
