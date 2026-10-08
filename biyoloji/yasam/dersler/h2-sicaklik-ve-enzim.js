/* H2 · BİY.9.1.8 b · Yazar notu: içerik MEB Biyoloji 9 s. 67 (optimum sıcaklık, 35–40 °C, sıcaklıkla artış, optimumun
   üstünde denatürasyon, Grafik 1.2), s. 79 (düşük sıcaklıkta yavaşlama ve yapının bozulmaması, buzluk, yüksek ateş,
   yüksek sıcaklığın kalıcı etkisi), s. 82 (yoğurt mayalanması ve gıda saklamada sıcaklık), s. 83 (karaciğer özütü ve
   balon düzeneği; 2, 4 ve 5. tüpler: 37, 5 ve 80 °C, pH 7, 10 ml + 10 ml).
   8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): önce olgu ve nedeni, sonra
   deney, sonra grafik. Kitap balon hacmi vermez; üç tüpün sonucu, kitabın ilkelerinden çıkan beklenen sonuç olarak
   nitel gösterilir. Eğri, kitaptaki Grafik 1.2'nin biçimidir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.H, SOGUK = 'var(--c1)', ILIK = 'var(--c2)', SICAK = 'var(--bad)', SUB = 'var(--c6)';
  const CAM = '#a8b3c7', URUN = '#d7ecff', OZUT = '#8a5a52';
  const yazi = (c, p, x, y, t, size = 28, renk, hiza) => K.yazi(c, p, x, y, t, { size, renk, hiza });

  /* Enzim: üstteki girinti aktif bölgedir. BOZUK, denatüre olmuş biçimdir. */
  const NORMAL = [-95, 60, -160, -80, -50, -80, -5, -20, 40, -80, 175, -40, 95, 85];
  const BOZUK = [-80, 75, -185, -5, -90, -45, -30, -100, 25, -50, 115, -115, 125, 70];
  const bicim = (v) => `M ${v[0]} ${v[1]} Q ${v[2]} ${v[3]} ${v[4]} ${v[5]} Q ${v[6]} ${v[7]} ${v[8]} ${v[9]} Q ${v[10]} ${v[11]} ${v[12]} ${v[13]} Z`;
  const enzim = (c, p, x, y, olcek) => c.S('path', { d: bicim(NORMAL), transform: `translate(${x} ${y}) scale(${olcek})`, fill: '#202a43', stroke: R, 'stroke-width': 6 / olcek }, p);
  const urunCifti = (c, p, x, y) => {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x - 11, cy: y, r: 10, fill: URUN }, g); c.S('circle', { cx: x + 11, cy: y, r: 10, fill: URUN }, g);
    g.style.opacity = 0;
    return g;
  };

  /* Bir ortam kutusu: enzim, bekleyen dört substrat, ürün sütunu. */
  function ortam(c, p, cx, ad, renk) {
    const g = c.S('g', {}, p);
    K.kutu(c, g, cx - 205, 100, 410, 350, { renk });
    const baslik = yazi(c, g, cx, 75, ad, 28, renk);
    enzim(c, g, cx - 70, 325, 0.7);
    const bekle = [0, 1, 2, 3].map((i) => [cx - 135 + i * 90, 190]);
    const subs = bekle.map(([x, y]) => c.S('ellipse', { cx: x, cy: y, rx: 21, ry: 13, fill: SUB }, g));
    const urunler = [0, 1, 2, 3].map((i) => urunCifti(c, g, cx + 125, 275 + i * 32));
    return { g, cx, baslik, bekle, subs, urunler, hedef: [cx - 73, 280] };
  }
  /* adet kadar substrat sırayla enzime ulaşıp ürüne dönüşür; titreme hızı molekül hareketini gösterir. */
  function karsilas(c, o, adet, titreme, ms) {
    return c.tween(ms, (e, t) => {
      o.subs.forEach((el, i) => {
        const u = Ders.clamp((t - i / adet) * adet, 0, 1), [bx, by] = o.bekle[i];
        if (i >= adet || u <= 0) {
          el.setAttribute('cx', bx + 7 * Math.cos(t * titreme + i * 1.7)); el.setAttribute('cy', by + 7 * Math.sin(t * titreme * 1.3 + i));
        } else if (u < 1) {
          el.setAttribute('cx', Ders.lerp(bx, o.hedef[0], u)); el.setAttribute('cy', Ders.lerp(by, o.hedef[1], u));
        } else { el.style.opacity = 0; o.urunler[i].style.opacity = 1; }
      });
    }, Ders.ease.linear);
  }

  /* ---- Sahne 1 · Soğukta ne olur? ---- */
  async function soguk(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const a = ortam(c, g, 265, 'Soğuk ortam', SOGUK), b = ortam(c, g, 735, 'Ilık ortam', ILIK);
    a.baslik.style.opacity = 0; b.baslik.style.opacity = 0;
    yazi(c, g, 195, 425, 'Enzim', 26, R); yazi(c, g, 665, 425, 'Enzim', 26, R);
    const subAd = c.S('g', {}, g);
    yazi(c, subAd, 265, 147, 'Substrat', 26, SUB); yazi(c, subAd, 735, 147, 'Substrat', 26, SUB);
    await K.belir(c, g);
    await c.say('Enzim, substratını aktif bölgesine bağlayarak ürüne dönüştürür.');
    await c.say('Bunun için enzim ile substratın önce karşılaşması gerekir.');
    await c.tween(400, (e) => { a.baslik.style.opacity = e; b.baslik.style.opacity = e; subAd.style.opacity = 1 - e; });
    subAd.remove();
    await Promise.all([karsilas(c, a, 1, 9, 4200), karsilas(c, b, 4, 40, 4200)]);
    await c.say('Soğukta moleküller yavaş hareket eder; enzimle substrat seyrek karşılaşır.');
    const urunAd = c.S('g', {}, g);
    yazi(c, urunAd, 390, 425, 'Ürün', 26, URUN); yazi(c, urunAd, 860, 425, 'Ürün', 26, URUN);
    await K.belir(c, urunAd, 350);
    await c.say('Bu yüzden soğukta aynı sürede daha az ürün oluşur.');
    await c.say('Tepkime durmaz, yalnızca yavaşlar; enzimin yapısı da bozulmaz.', { speak: '[thoughtful] Tepkime durmaz, yalnızca yavaşlar; enzimin yapısı da bozulmaz.' });
    await c.choice({ tag: 'Uygula', q: 'Buzluktaki gıdalar uzun süre bozulmadan kalır. Bunun nedeni hangisidir?',
      options: ['Soğukta enzimli tepkimeler çok yavaşlar.', 'Soğuk, gıdadaki enzimlerin yapısını bozar.', 'Soğukta enzimler daha hızlı çalışır.'], answer: 0,
      hints: ['', 'Düşük sıcaklık enzimin yapısını bozmaz.', 'Soğukta moleküller yavaşlar; enzimle substrat seyrek karşılaşır.'],
      right: 'Gıdayı bozan tepkimeler de enzimlerle yürür; soğukta çok yavaş ilerler.' });
    await c.say('Soğuk enzimi bozmaz; gıdayı bozan tepkimeleri yavaşlatır.');
    c.note('<b>Düşük sıcaklık enzimi yavaşlatır, yapısını bozmaz.</b><br>Buzluktaki gıda bu yüzden geç bozulur.', 'Düşük sıcaklık');
  }

  /* ---- Sahne 2 · Aşırı sıcakta ne olur? ---- */
  async function sicak(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const enz = enzim(c, g, 330, 300, 1.1), HEDEF = [324, 232];
    /* termometre */
    const sivi = c.S('rect', { x: 868, y: 400, width: 24, height: 0, fill: SOGUK }, g);
    c.S('rect', { x: 865, y: 110, width: 30, height: 300, rx: 15, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    const hazne = c.S('circle', { cx: 880, cy: 425, r: 25, fill: SOGUK, stroke: CAM, 'stroke-width': 3 }, g);
    yazi(c, g, 880, 495, 'Sıcaklık', 26);
    const derece = (oran, renk) => { sivi.setAttribute('y', 402 - 280 * oran); sivi.setAttribute('height', 280 * oran); sivi.setAttribute('fill', renk); hazne.setAttribute('fill', renk); };
    derece(0.15, SOGUK);
    const subs = [0, 1, 2, 3].map((i) => c.S('ellipse', { cx: 600 + (i % 2) * 90, cy: 140 + Math.floor(i / 2) * 60, rx: 32, ry: 19, fill: SUB }, g));
    const bas = subs.map((el) => [+el.getAttribute('cx'), +el.getAttribute('cy')]);
    const urunler = [0, 1, 2, 3].map((i) => urunCifti(c, g, 570 + i * 60, 400));
    await K.belir(c, g);
    /* sıcaklık yükselir; substratlar giderek daha hızlı ürüne dönüşür */
    const sinir = [0, 0.4, 0.68, 0.87, 1];
    await c.tween(4200, (e, t) => {
      derece(0.15 + 0.4 * t, t > 0.5 ? ILIK : SOGUK);
      subs.forEach((el, i) => {
        const u = Ders.clamp((t - sinir[i]) / (sinir[i + 1] - sinir[i]), 0, 1);
        if (u <= 0) return;
        if (u < 1) { el.setAttribute('cx', Ders.lerp(bas[i][0], HEDEF[0], u)); el.setAttribute('cy', Ders.lerp(bas[i][1], HEDEF[1], u)); }
        else { el.style.opacity = 0; urunler[i].style.opacity = 1; }
      });
    }, Ders.ease.linear);
    const urunAd = yazi(c, g, 660, 450, 'Ürün', 26, URUN);
    await c.say('Sıcaklık arttıkça moleküller hızlanır; enzimle substrat daha sık karşılaşır.');
    await c.say('Enzim aktivitesi bu yüzden sıcaklıkla birlikte artar.');
    const ad = yazi(c, g, 330, 455, 'Protein yapılı enzim', 28, R);
    await K.belir(c, ad, 350);
    await c.say('Ama enzimler genellikle protein yapılıdır; işlevleri üç boyutlu biçimlerine bağlıdır.');
    await c.tween(1600, (e) => { derece(0.55 + 0.42 * e, e > 0.4 ? SICAK : ILIK); enz.setAttribute('d', bicim(NORMAL.map((n, i) => Ders.lerp(n, BOZUK[i], e)))); });
    ad.textContent = 'Denatürasyon'; ad.style.fill = SICAK;
    await c.say('Yüksek sıcaklıkta protein doğal biçimini kaybeder; buna denatürasyon denir.', { speak: 'Yüksek sıcaklıkta protein doğal biçimini kaybeder; buna [short pause] denatürasyon denir.' });
    urunler.forEach((u) => { u.style.opacity = 0; }); urunAd.remove();
    const yeni = c.S('ellipse', { cx: 640, cy: 150, rx: 32, ry: 19, fill: SUB }, g);
    await c.tween(900, (e) => { yeni.setAttribute('cx', Ders.lerp(640, 345, e)); yeni.setAttribute('cy', Ders.lerp(150, 185, e)); });
    await c.tween(700, (e) => { yeni.setAttribute('cx', Ders.lerp(345, 520, e)); yeni.setAttribute('cy', Ders.lerp(185, 130, e)); });
    await c.say('Biçimi bozulan enzim, substratını ürüne dönüştüremez.');
    await c.say('Yüksek sıcaklığın enzimde yol açtığı bu bozulma kalıcıdır.');
    await c.choice({ tag: 'Uygula', q: 'İki eş enzim örneğinden biri buzlukta, öteki çok sıcak suda bekletildi. Sonra ikisi de ılık ortama alındı. Hangisi yeniden çalışır?',
      options: ['İkisi de çalışır.', 'Yalnızca çok sıcak suda bekleyen', 'Yalnızca buzlukta bekleyen'], answer: 2,
      hints: ['Yüksek sıcaklık enzimin yapısını kalıcı olarak bozar.', 'Yapıyı bozan yüksek sıcaklıktır; soğuk bozmaz.', ''],
      right: 'Soğuk, yapıyı bozmamıştı; ortam ısınınca enzim yeniden hızlanır.' });
    await c.say('Soğuk enzimi yavaşlatır; yüksek sıcaklık ise yapısını bozar.');
    c.note('<b>Yüksek sıcaklık enzimi denatüre eder.</b><br>Biçimi bozulan enzim çalışamaz; bozulma kalıcıdır.', 'Yüksek sıcaklık');
  }

  /* Su banyosunda deney tüpü ve ağzında balon. */
  function tup(c, p, x) {
    const g = c.S('g', {}, p), banyoG = c.S('g', {}, g);
    const su = c.S('rect', { x: x - 90, y: 345, width: 180, height: 107, opacity: 0.3 }, banyoG);
    c.S('path', { d: `M ${x - 93} 315 L ${x - 93} 455 L ${x + 93} 455 L ${x + 93} 315`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, banyoG);
    banyoG.style.opacity = 0;
    const balon = c.S('ellipse', { cx: x, fill: R }, g), boyun = c.S('rect', { x: x - 11, y: 222, width: 22, height: 14, rx: 3, fill: R }, g);
    c.S('path', { d: `M ${x - 21} 370 L ${x - 21} 412 Q ${x - 21} 434 ${x} 434 Q ${x + 21} 434 ${x + 21} 412 L ${x + 21} 370 Z`, fill: OZUT }, g);
    c.S('path', { d: `M ${x - 24} 232 L ${x - 24} 412 Q ${x - 24} 437 ${x} 437 Q ${x + 24} 437 ${x + 24} 412 L ${x + 24} 232`, fill: 'none', stroke: CAM, 'stroke-width': 3 }, g);
    const sisir = (ry) => { balon.setAttribute('rx', Math.max(9, ry * 0.82)); balon.setAttribute('ry', ry); balon.setAttribute('cy', 226 - ry); };
    sisir(15); balon.style.opacity = 0; boyun.style.opacity = 0;
    return { g, banyoG, su, balon, boyun, sisir };
  }

  /* ---- Sahne 3 · Üç tüp, üç sıcaklık ---- */
  async function deney(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const X = [200, 500, 800], DERECE = ['5 °C', '37 °C', '80 °C'], RENK = [SOGUK, ILIK, SICAK];
    const t = X.map((x) => tup(c, g, x));
    const ust = yazi(c, g, 500, 50, 'Katalaz: hidrojen peroksit → su + oksijen', 28, R);
    await K.belir(c, g);
    await c.say('Önceki derste gördük: katalaz, hidrojen peroksidi su ve oksijene dönüştürür.');
    const alt = yazi(c, g, 500, 505, 'Katalaz kaynağı: tavuk karaciğeri özütü', 28);
    await K.belir(c, alt, 350);
    await c.say('Bu deneyde katalaz kaynağı, tavuk karaciğerinden hazırlanan özüttür.');
    alt.textContent = 'Her tüpte 10 ml özüt, 10 ml hidrojen peroksit';
    await K.belir(c, alt, 350);
    await c.say('Üç tüpe eşit miktarda karaciğer özütü ve hidrojen peroksit konur.');
    ust.textContent = 'Oksijen balonu şişirir';
    await c.tween(450, (e) => t.forEach((u) => { u.balon.style.opacity = e; u.boyun.style.opacity = e; }));
    await c.say('Her tüpün ağzına balon takılır; oluşan oksijen balonu şişirir.');
    alt.remove();
    const etiket = X.map((x, i) => { t[i].su.setAttribute('fill', RENK[i]); return yazi(c, g, x, 505, DERECE[i], 30, RENK[i]); });
    etiket.forEach((el) => { el.style.opacity = 0; });
    await c.tween(450, (e) => { t.forEach((u) => { u.banyoG.style.opacity = e; }); etiket.forEach((el) => { el.style.opacity = e; }); });
    await c.say('Tüpler 5, 37 ve 80 °C sıcaklıktaki suda bekletilir.', { speak: 'Tüpler beş, otuz yedi ve seksen derece sıcaklıktaki suda bekletilir.' });
    ust.textContent = 'Değişen yalnızca sıcaklık';
    await K.belir(c, ust, 350);
    await c.say('Yalnızca sıcaklık farklıdır; ölçülen, balonun ne kadar şiştiğidir.');
    await c.choice({ q: 'Balonun en çok şişmesi hangi tüpte beklenir?',
      options: ['5 °C', '37 °C', '80 °C'], answer: 1,
      hints: ['5 °C’de moleküller yavaştır; aynı sürede az oksijen oluşur.', '', '80 °C’de enzimin yapısı bozulur.'],
      right: 'Soğuk tüpte tepkime yavaştır, sıcak tüpte enzim bozulur. En çok oksijen 37 °C tüpünde oluşur.' });
    ust.textContent = 'Beklenen sonuç';
    await c.tween(1800, (e) => { t[0].sisir(15 + 13 * e); t[1].sisir(15 + 55 * e); });
    await c.say('5 °C tüpünde balon az şişer: tepkime yavaştır.', { speak: 'Beş derecelik tüpte balon az şişer: tepkime yavaştır.' });
    await c.say('80 °C tüpünde balon şişmez: katalaz denatüre olmuştur.', { speak: 'Seksen derecelik tüpte balon şişmez: katalaz denatüre olmuştur.' });
    await c.say('37 °C tüpünde katalaz hızlı çalışır; balon en çok şişer.', { speak: 'Otuz yedi derecelik tüpte katalaz hızlı çalışır; balon en çok şişer.' });
  }

  /* ---- Sahne 4 · Optimum sıcaklık ---- */
  async function egri(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const X = (T) => 170 + (T - 5) / 60 * 680, TABAN = 420, TEPE = 135;
    K.ok(c, g, 150, TABAN, 915, TABAN, CAM); K.ok(c, g, 150, TABAN, 150, 95, CAM);
    for (let T = 5; T <= 65; T += 10) { K.cizgi(c, g, X(T), TABAN, X(T), TABAN + 9, CAM, { width: 2 }); yazi(c, g, X(T), TABAN + 38, String(T), 24); }
    yazi(c, g, 532, 508, 'Sıcaklık (°C)', 26); yazi(c, g, 165, 70, 'Tepkime hızı', 26, undefined, 'start');
    await K.belir(c, g);
    await c.say('Deney daha çok sıcaklıkta yinelenirse sonuçlar bir grafiğe işlenebilir.');
    const ciz = async (d) => {
      const p = c.S('path', { d, fill: 'none', stroke: R, 'stroke-width': 6, 'stroke-linecap': 'round' }, g), L = p.getTotalLength();
      p.setAttribute('stroke-dasharray', L);
      await c.tween(1300, (e) => p.setAttribute('stroke-dashoffset', L * (1 - e)));
      p.removeAttribute('stroke-dasharray'); p.removeAttribute('stroke-dashoffset');
      return p;
    };
    const cikis = await ciz(`M ${X(5)} ${TABAN} C ${X(12)} 250 ${X(24)} ${TEPE} ${X(36)} ${TEPE}`);
    await c.say('Sıcaklık arttıkça tepkime hızı önce yükselir.');
    const tepe = c.S('g', {}, g);
    K.cizgi(c, tepe, X(36), TEPE, X(36), TABAN, R, { width: 2, 'stroke-dasharray': '7 7' });
    c.S('circle', { cx: X(36), cy: TEPE, r: 9, fill: R }, tepe);
    yazi(c, tepe, X(36), 105, 'Optimum sıcaklık', 26, R);
    await K.belir(c, tepe, 350);
    await c.say('Hızın en yüksek olduğu sıcaklığa optimum sıcaklık denir.', { speak: 'Hızın en yüksek olduğu sıcaklığa [short pause] optimum sıcaklık denir.' });
    const inis = await ciz(`M ${X(36)} ${TEPE} C ${X(48)} ${TEPE} ${X(59)} 250 ${X(65)} ${TABAN}`);
    await c.say('Optimumun üstünde denatürasyon başlar; hız düşer.');
    await K.belir(c, c.S('circle', { cx: X(65), cy: TABAN, r: 9, fill: SICAK }, g), 350);
    await c.say('Enzim tümüyle denatüre olduğunda tepkime durur.');
    const bant = c.S('g', {}, g);
    c.S('rect', { x: X(35), y: TEPE, width: X(40) - X(35), height: TABAN - TEPE, fill: R, opacity: 0.22 }, bant);
    yazi(c, bant, X(37.5) + 45, 300, '35–40 °C', 26, undefined, 'start');
    await K.belir(c, bant, 350);
    await c.say('İnsandaki birçok enzimin optimum sıcaklığı 35–40 °C arasındadır.', { speak: 'İnsandaki birçok enzimin optimum sıcaklığı otuz beş ile kırk derece arasındadır.' });
    const nokta = c.S('circle', { r: 12, fill: 'var(--c5)', stroke: '#10162b', 'stroke-width': 3 }, g);
    const durum = yazi(c, g, 610, 70, '', 26, 'var(--c5)');
    const uzerinde = (T) => {
      const yol = T <= 36 ? cikis : inis, x = Math.min(X(T), X(65));
      let a = 0, b = yol.getTotalLength();
      for (let i = 0; i < 20; i++) { const m = (a + b) / 2; if (yol.getPointAtLength(m).x < x) a = m; else b = m; }
      return yol.getPointAtLength((a + b) / 2);
    };
    const sl = c.slider({ label: 'Sıcaklık', min: 5, max: 65, step: 5, value: 5, fmt: (v) => v + ' °C', onInput: (T) => {
      const p = uzerinde(T); nokta.setAttribute('cx', p.x); nokta.setAttribute('cy', p.y);
      durum.textContent = T < 35 ? 'Optimumun altı: hız artıyor' : T <= 40 ? 'Optimum: hız en yüksek' : T < 65 ? 'Denatürasyon: hız düşüyor' : 'Tepkime durdu';
    } });
    await c.say('Sıcaklığı değiştir; hızın nerede arttığını, nerede düştüğünü izle.', { noWait: true });
    await c.cont('İzledim ›');
    sl.remove(); nokta.remove(); durum.remove(); c.clearSay();
    await c.choice({ tag: 'Uygula', q: 'Yüksek ateşte vücut sıcaklığı 40 °C’nin üstüne çıkabilir. İnsan enzimleri bundan nasıl etkilenir?',
      options: ['Daha da hızlanır; hız sıcaklıkla hep artar.', 'Etkilenmez.', 'Yapıları bozulmaya başlar; aktiviteleri düşer.'], answer: 2,
      hints: ['Hız yalnızca optimuma kadar artar; insanda optimum 35–40 °C arasındadır.', 'Grafikte hız sıcaklıkla değişiyor.', ''],
      right: '40 °C’nin üstü, eğrinin inen tarafıdır: enzimlerin yapısı bozulmaya başlar.' });
    await c.say('Yüksek ateş bu yüzden vücuttaki tepkimeleri aksatır.');
    await c.choice({ tag: 'Uygula', q: 'Yoğurt mayalanırken kabın ılık kalmasına dikkat edilir. Bunun nedeni hangisidir?',
      options: ['Soğuk, enzimlerin yapısını kalıcı olarak bozar.', 'Mayalanmayı sağlayan enzimler ılıkta hızlı çalışır.', 'Sıcaklık ne kadar yüksekse enzimler o kadar hızlıdır.'], answer: 1,
      hints: ['Soğuk enzimi bozmaz, yalnızca yavaşlatır.', '', 'Optimumun üstünde enzim denatüre olur; hız düşer.'],
      right: 'Ilık ortam optimuma yakındır. Soğukta mayalanma yavaşlar, aşırı sıcakta enzimler bozulur.' });
    await c.say('Her enzimin en hızlı çalıştığı bir optimum sıcaklık vardır.', { speak: '[curious] Her enzimin en hızlı çalıştığı bir optimum sıcaklık vardır.' });
    c.note('<b>Optimum sıcaklık: aktivitenin en yüksek olduğu sıcaklık.</b><br>İnsanda birçok enzim: 35–40 °C', 'Optimum sıcaklık');
  }

  Ders.start({
    id: 'yasam-h2', kicker: 'Konu H · Enzim deneyi', title: 'Sıcaklık ve enzim', accent: R, back: 'index.html',
    intro: { title: 'Sıcaklık ve enzim', hook: 'Soğuk ve çok sıcak ortam enzimi aynı yolla mı etkiler?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Soğukta ne olur?', goal: 'Düşük sıcaklığın enzimi neden yavaşlattığını gör.', run: soguk },
      { title: 'Aşırı sıcakta ne olur?', goal: 'Yavaşlama ile denatürasyonu ayır.', run: sicak },
      { title: 'Üç tüp, üç sıcaklık', goal: 'Deneyin sonucunu tahmin et ve yorumla.', run: deney },
      { title: 'Optimum sıcaklık', goal: 'Sıcaklık ve tepkime hızı grafiğini oku.', run: egri },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Düşük sıcaklık enzimi nasıl etkiler?', options: ['Yapısını kalıcı olarak bozar.', 'Yavaşlatır; yapısını bozmaz.', 'Hızlandırır.'], answer: 1,
        why: ['Yapıyı bozan yüksek sıcaklıktır; soğuk yalnızca yavaşlatır.', 'Moleküller yavaşlar; enzimle substrat seyrek karşılaşır.', 'Soğukta moleküller yavaşlar; tepkime hızı düşer.'], scene: 0 },
      { q: 'Sıcaklık ve tepkime hızı grafiğinde eğrinin tepe noktası neyi gösterir?', options: ['Optimum sıcaklığı', 'Enzimin tümüyle denatüre olduğu sıcaklığı', 'Tepkimenin başladığı sıcaklığı'], answer: 0,
        why: ['Tepe, tepkime hızının en yüksek olduğu sıcaklıktır.', 'Tam denatürasyonda hız sıfıra iner; bu, eğrinin sağ ucudur.', 'Tepkime, tepeden düşük sıcaklıklarda da yavaşça ilerler.'], scene: 3 },
    ], summary: ['<b>Her enzimin bir optimum sıcaklığı vardır.</b>', 'Soğuk enzimi yavaşlatır; optimumun üstündeki sıcaklık yapısını bozar.'],
    nextLesson: { href: 'h3-ph-ve-enzim.html', label: 'Sonraki: pH ve enzim ›' },
  });
})();
