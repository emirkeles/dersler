/* A6 — Doğruyu kaydırmak: f(x) + k ve f(x ± r)
   Çıktıya eklenen k doğruyu yukarı-aşağı, girdiden çıkarılan r sağa-sola kaydırır; eğim değişmez.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, MIN, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, nokta, etiket, tablo, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };
  const SADE = Object.assign({ xad: '', yad: '' }, D);   // yazısı çok olan sahnelerde eksen adları kapalı
  const isaretli = (v) => (v < 0 ? MIN + ' ' : '+ ') + sayi(Math.abs(v));   // 2 → "+ 2", −3 → "− 3"

  /* İki düzlem noktası arasında ok (kaydırmanın yönü ve boyu). o: { renk, pay: ucun hedeften önce durduğu boşluk }
     Düzlemin kutusuna kırpılır; boyu çok kısaysa gizlenir. Döner: { g, ayarla(x1, y1, x2, y2) }. */
  function ok(dz, o = {}) {
    const renk = o.renk || RENK.sifir, g = S('g', {}, dz.orta);
    const cizgi = S('line', { stroke: renk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g), uc = S('path', { fill: renk }, g);
    const api = { g, ayarla(x1, y1, x2, y2) {
      const ax = dz.X(x1), ay = dz.Y(y1), L0 = Math.hypot(dz.X(x2) - ax, dz.Y(y2) - ay), L = L0 - (o.pay || 0);
      g.style.display = L < 8 ? 'none' : '';
      if (L < 8) return api;
      const ux = (dz.X(x2) - ax) / L0, uy = (dz.Y(y2) - ay) / L0, bx = ax + ux * L, by = ay + uy * L, k = Math.min(13, L * 0.6);
      cizgi.setAttribute('x1', ax); cizgi.setAttribute('y1', ay); cizgi.setAttribute('x2', bx - ux * k); cizgi.setAttribute('y2', by - uy * k);
      uc.setAttribute('d', `M${bx},${by} L${bx - ux * k - uy * k * 0.5},${by - uy * k + ux * k * 0.5} L${bx - ux * k + uy * k * 0.5},${by - uy * k - ux * k * 0.5} Z`);
      return api;
    } };
    return api;
  }
  const yerlestir = (t, x, y) => { t.setAttribute('x', x); t.setAttribute('y', y); };

  /* ---- 1. Çıktıya ekle: f(x) + k ---- */
  async function ciktiyaEkle(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, SADE);
    dogru(dz, 1, 0);
    etiket(dz, -4.2, -4.2, 'f', { renk: RENK.f, dx: 26, dy: 10 });
    const g = dogru(dz, 1, 0, { renk: RENK.g }); gizle(g.el);
    const gAd = etiket(dz, 0, 0, 'g', { renk: RENK.g });
    const XS = [-3, -1, 1];   // tablodaki girdiler; noktalar f üzerinde
    const oklar = XS.map(() => ok(dz, { pay: 9 }));
    const fn = XS.map((x) => nokta(dz, x, x, { renk: RENK.f, r: 7 }));
    const gn = XS.map((x) => nokta(dz, x, x, { renk: RENK.g, r: 7 }));
    const fark = etiket(dz, 0, 0, '', { renk: RENK.sifir, hiza: 'start' });
    gizle(gAd, fark, fn.map((n) => n.el), gn.map((n) => n.el));
    const koy = (b) => {   // g(x) = x + b
      g.ayarla(1, b);
      XS.forEach((x, i) => { oklar[i].ayarla(x, x, x, x + b); gn[i].git(x, x + b); gn[i].el.style.display = x + b < dz.ymin ? 'none' : ''; });
      yerlestir(gAd, dz.X(1.2) + (b >= 0 ? -22 : 24), dz.Y(1.2 + b) + (b >= 0 ? -12 : 26));
      yerlestir(fark, dz.X(1) + 12, dz.Y(1 + (b >= 0 ? b / 2 : b / 6)) + 8);
    };
    koy(0);

    const kuralT = yazi(svg, 765, 110, '', { size: 36, kalin: 700 });
    const acik = yazi(svg, 765, 170, '', { size: 36, kalin: 700, renk: RENK.g });
    const kuralYaz = (k) => { yaz(kuralT, [['g(x)', RENK.g], ' = ', ['f(x)', RENK.f], ' ', [isaretli(k), RENK.sifir]]); yaz(acik, '= ' + kural(1, k)); yaz(fark, (k > 0 ? '+' : '') + sayi(k)); };
    kuralYaz(2); gizle(kuralT, acik);
    const tb = tablo(svg, { x: 610, y: 230, basliklar: ['f(x)', 'g(x)'], n: 3, hucre: 74, yuk: 56, basGen: 96, size: 26, renkler: [RENK.f, RENK.g] });
    XS.forEach((x, k) => tb.yaz(0, k, sayi(x), RENK.f));
    gizle(tb.g);

    await par(soyle(c, 'f’nin her çıktısına 2 ekleyen yeni bir fonksiyon: g.', { speak: 'f fonksiyonunun her çıktısına iki ekleyen yeni bir fonksiyon: g.' }), belir(c, kuralT, 450));
    await par(soyle(c, 'Tabloda g’nin her çıktısı f’ninkinden 2 büyük.', { speak: 'Tabloda g fonksiyonunun her çıktısı, f fonksiyonunun çıktısından iki büyük.' }), (async () => {
      await belir(c, tb.g, 400);
      for (let k = 0; k < XS.length; k++) { await c.wait(350); tb.yaz(1, k, sayi(XS[k] + 2), RENK.g); }
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'g’nin grafiği f’ye göre nasıl olur?',
      options: ['Daha dik olur', 'Yukarı kayar', 'Aşağı kayar'], answer: 1,
      hints: ['Her çıktıya aynı sayı eklendi; bir yer öbüründen fazla yükselmez.', '', 'Çıktılar büyüdü; noktalar yukarı çıkar.'],
      right: 'Her çıktı 2 büyüdü: her nokta 2 birim yukarı çıkar.',
    });
    await belir(c, fn.map((n) => n.el), 300);
    gn.forEach((n) => { n.el.style.opacity = 1; }); g.el.style.opacity = 1;
    await par(soyle(c, 'Her nokta 2 birim yukarı çıkıyor.'), (async () => {
      await c.tween(1500, (e) => koy(2 * e), ease.inOut);
      await belir(c, fark, 300);
    })());
    await kaybol(c, tb.g, 300);
    await par(soyle(c, 'Doğru yukarı kaydı; eğimi aynı kaldı.'), belir(c, gAd, 400));
    await par(soyle(c, 'Kuralı kısa: çıktı, girdinin 2 fazlası.', { dur: true }), belir(c, acik, 450));
    c.note('<b>g(x) = f(x) + k</b><br>k = 2: doğru 2 birim yukarı', 'Çıktıya ekle', 'a6-k');
    await kaybol(c, [fark, gAd], 250);
    kuralYaz(-3);
    await par(soyle(c, 'Eklenen sayı negatifse doğru aşağı kayar.'), (async () => {
      await c.tween(2000, (e) => koy(lerp(2, -3, e)), ease.inOut);
      await belir(c, [fark, gAd], 300);
    })());
  }

  /* ---- 2. Girdiye ekle: f(x − r) ---- */
  async function girdiyeEkle(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    etiket(dz, -4.2, -4.2, 'f', { renk: RENK.f, dx: 26, dy: 10 });
    const g = dogru(dz, 1, 0, { renk: RENK.g }); gizle(g.el);
    const gAd = etiket(dz, 0, 0, 'g', { renk: RENK.g });
    const YS = [0, 1, -1];   // f üzerindeki noktalar: (0, 0), (1, 1), (−1, −1)
    const oklar = YS.map(() => ok(dz, { pay: 9 }));
    const fn = YS.map((v) => nokta(dz, v, v, { renk: RENK.f, r: 7 }));
    const gn = YS.map((v) => nokta(dz, v, v, { renk: RENK.g, r: 7 }));
    const kok = nokta(dz, 2, 0, { r: 9 });
    gizle(gAd, kok.el, fn.map((n) => n.el), gn.map((n) => n.el));
    const koy = (s) => {   // g(x) = f(x − s) = x − s
      g.ayarla(1, -s); kok.git(s, 0);
      YS.forEach((v, i) => { oklar[i].ayarla(v, v, v + s, v); gn[i].git(v + s, v); });
      if (s >= 0) yerlestir(gAd, dz.X(3.2) + 24, dz.Y(3.2 - s) + 26); else yerlestir(gAd, dz.X(2.4) - 22, dz.Y(2.4 - s) - 12);
    };
    koy(0);
    const kuralT = yazi(svg, 765, 110, '', { size: 36, kalin: 700 });
    const hesap = yazi(svg, 765, 200, '', { size: 32, kalin: 650 });
    const acik = yazi(svg, 765, 170, '', { size: 36, kalin: 700, renk: RENK.g });
    const kuralYaz = (s) => { yaz(kuralT, [['g(x)', RENK.g], ' = ', ['f(x ', RENK.f], [isaretli(-s), RENK.sifir], [')', RENK.f]]); yaz(acik, '= ' + kural(1, -s)); };
    kuralYaz(2); gizle(kuralT, acik, hesap);

    await par(soyle(c, 'Bu kez sayı çıktıya değil, girdiye dokunuyor.', { ton: 'thoughtful' }), belir(c, kuralT, 450));
    await soyle(c, 'g, f’nin 2 önceki girdiye verdiği çıktıyı verir.', { speak: 'g, f fonksiyonunun iki önceki girdiye verdiği çıktıyı verir.' });
    yaz(hesap, ['g(2) = ', ['f(0)', RENK.f], ' = 0']);
    await par(soyle(c, 'g(2) için f’nin 0’daki çıktısına bakılır.', { speak: 'g fonksiyonunun ikideki değeri için, f fonksiyonunun sıfırdaki çıktısına bakılır.' }), belir(c, hesap, 350), pop(c, fn[0], dz.X(0), dz.Y(0)));
    await kaybol(c, hesap, 200);
    yaz(hesap, ['g(3) = ', ['f(1)', RENK.f], ' = 1']);
    await par(soyle(c, 'g(3) için f’nin 1’deki çıktısına.', { speak: 'g fonksiyonunun üçteki değeri için, f fonksiyonunun birdeki çıktısına.' }), belir(c, hesap, 350), pop(c, fn[1], dz.X(1), dz.Y(1)));
    await c.choice({
      tag: 'Tahmin et', q: 'g’nin grafiği f’ye göre hangi yöne kayar?',
      options: ['Sola 2 birim', 'Sağa 2 birim', 'Yukarı 2 birim'], answer: 1,
      hints: ['f, 0 çıktısını x = 0’da veriyor; g aynı çıktıyı x = 2’de veriyor.', '', 'g(2) = 0: x = 2’de doğru yükselmedi, eksenin üstünde durur.'],
      right: 'g her çıktıyı f’den 2 birim sonra verir.',
    });
    await kaybol(c, hesap, 250); yaz(hesap, '');
    await pop(c, fn[2], dz.X(-1), dz.Y(-1), 300);
    gn.forEach((n) => { n.el.style.opacity = 1; }); g.el.style.opacity = 1;
    await par(soyle(c, 'Her nokta 2 birim sağa gidiyor.'), c.tween(1600, (e) => koy(2 * e), ease.inOut));
    await belir(c, gAd, 300);
    await par(soyle(c, 'g, x eksenini 2’de kesiyor.'), pop(c, kok, dz.X(2), dz.Y(0)));
    await par(soyle(c, 'Kuralı kısa: çıktı, girdinin 2 eksiği.'), belir(c, acik, 450));
    c.note('<b>g(x) = f(x − r)</b><br>r = 2: doğru 2 birim sağa', 'Girdiden çıkar', 'a6-r');
    await kaybol(c, gAd, 250);
    kuralYaz(-2);
    await par(soyle(c, 'Girdiye 2 eklenirse doğru 2 birim sola kayar.', { ton: 'thoughtful' }), (async () => {
      await c.tween(2200, (e) => koy(lerp(2, -2, e)), ease.inOut);
      await belir(c, gAd, 300);
    })());
  }

  /* ---- 3. İkisi birlikte ---- */
  async function ikisiBirlikte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, SADE);
    dogru(dz, 1, 0).el.style.opacity = 0.45;
    const g = dogru(dz, 1, 0, { renk: RENK.g });
    const yatay = ok(dz), dikey = ok(dz);
    nokta(dz, 0, 0, { renk: RENK.f, r: 6 });
    const p = nokta(dz, 0, 0, { r: 9 });
    const k1 = yazi(svg, 765, 150, '', { size: 34, kalin: 700 });
    const k2 = yazi(svg, 765, 212, '', { size: 34, kalin: 700, renk: RENK.g });
    const ayni = yazi(svg, 765, 270, 'f ile aynı doğru', { size: 24, renk: RENK.f });
    /* r, k: çizimdeki değerler (kayarken kesirli); ry, ky: kuralda yazan tam sayılar */
    const koy = (r, k, ry = r, ky = k) => {
      g.ayarla(1, k - r); yatay.ayarla(0, 0, r, 0); dikey.ayarla(r, 0, r, k); p.git(r, k);
      yaz(k1, [['g(x)', RENK.g], ' = ', ['f(x', RENK.f], [ry ? ' ' + isaretli(-ry) : '', RENK.sifir], [')', RENK.f], [ky ? ' ' + isaretli(ky) : '', RENK.sifir]]);
      yaz(k2, '= ' + kural(1, ky - ry));
      ayni.style.opacity = ry === ky && r === ry && k === ky ? 1 : 0;
    };
    koy(0, 0);

    await soyle(c, 'Şimdi iki kaydırmayı arka arkaya yapalım.');
    await par(soyle(c, 'Girdiden 2 çıkar: doğru 2 birim sağa.'), c.tween(1500, (e) => koy(2 * e, 0, 2, 0), ease.inOut));
    await par(soyle(c, 'Çıktıya 1 ekle: doğru 1 birim yukarı.'), c.tween(1200, (e) => koy(2, e, 2, 1), ease.inOut));
    await soyle(c, 'Orijindeki nokta (2, 1)’e taşındı; eğim aynı.', { speak: 'Orijindeki nokta, iki, bir noktasına taşındı; eğim aynı.' });
    let R = 2, K = 1;
    await soyle(c, 'r ile k’yi değiştir; eğim hiç değişiyor mu?', { noWait: true });
    c.slider({ label: 'r (sağa)', min: -3, max: 3, step: 1, value: R, fmt: (v) => sayi(v), onInput: (v) => { R = v; koy(R, K); } });
    c.slider({ label: 'k (yukarı)', min: -3, max: 3, step: 1, value: K, fmt: (v) => sayi(v), tag: false, onInput: (v) => { K = v; koy(R, K); } });
    await c.cont('Devam ›');
    await soyle(c, 'Hangi r ve k’yi seçersen seç, eğim değişmedi.', { speak: 'Hangi r ve k sayılarını seçersen seç, eğim değişmedi.' });
    c.note('<b>g(x) = f(x − r) + k</b><br>r sağa, k yukarı kaydırır', 'İki kaydırma', 'a6-rk');
  }

  /* ---- 4. Sıra sende ---- */
  async function siraSende(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, SADE);
    dogru(dz, 1, 0);
    etiket(dz, -4.2, -4.2, 'f', { renk: RENK.f, dx: 26, dy: 10 });
    const g = dogru(dz, 1, 0, { renk: RENK.g }); gizle(g.el);
    const p = nokta(dz, 0, 0, { r: 9 }); gizle(p.el);
    const tb = soruTahtasi(c, svg, { x: 580, y: 150, w: 380, h: 150, size: 34 });
    let tur = 0;   // sıradaki karta geçilince yarım kalan belirme dursun
    /* Doğru cevapta g(x) = x + b belirir; kx verilmişse x eksenini kestiği nokta da yanar. */
    const goster = (b, kx) => (i, dogruMu) => {
      if (!dogruMu) return;
      const t = ++tur, els = kx == null ? [g.el] : [g.el, p.el];
      g.ayarla(1, b); if (kx != null) p.git(kx, 0);
      c.tween(500, (e) => { if (t === tur) els.forEach((el) => { el.style.opacity = e; }); }, ease.out).catch(() => {});
    };
    const temizle = () => { tur++; gizle(g.el, p.el); };

    await soyle(c, 'Sıra sende: kurala bak, grafiği gözünde canlandır.', { noWait: true });
    await tb.sor([['g(x)', RENK.g], ' = ', ['f(x)', RENK.f], ' − 4'], {
      q: 'g’nin grafiği f’ye göre nerede?', options: ['4 birim yukarıda', '4 birim aşağıda', 'Aynı yerde, daha dik'], answer: 1,
      hints: ['Çıktıdan 4 çıkarıldı; noktalar alçalır.', '', 'Çıktıya sayı eklemek ya da çıkarmak eğimi değiştirmez.'],
      right: 'Her çıktı 4 küçüldü: doğru 4 birim aşağı kaydı.', kanit: 'g(x) = x − 4', renk: RENK.g, onPick: goster(-4),
    });
    temizle();
    await tb.sor([['g(x)', RENK.g], ' = ', ['f(x + 3)', RENK.f]], {
      q: 'g, x eksenini nerede keser?', options: ['x = 3', 'x = 0', 'x = −3'], answer: 2,
      hints: ['g(3) = f(6) = 6; sıfır değil.', 'g(0) = f(3) = 3; sıfır değil.', ''],
      right: 'Girdiye 3 eklendi: doğru 3 birim sola kaydı.', kanit: 'g(−3) = f(0) = 0', renk: RENK.sifir, onPick: goster(3, -3),
    });
    temizle();
    await tb.sor('f, 1 birim yukarı kaydı', {
      q: 'Yeni doğrunun kuralı hangisi?', options: ['g(x) = x + 1', 'g(x) = x − 1', 'g(x) = x'], answer: 0,
      hints: ['', 'x − 1’de çıktılar küçülür; doğru aşağı kayar.', 'Bu, f’nin kendisi: hiç kaymamış.'],
      right: 'Yukarı 1 birim: her çıktıya 1 eklenir.', kanit: 'g(x) = f(x) + 1', renk: RENK.g, onPick: goster(1),
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a6', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Doğruyu kaydırmak: f(x) + k ve f(x ± r)', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Doğruyu kaydırmak', hook: 'Bir otoparkın giriş ücreti 5 lira artarsa <b>saat–ücret grafiği nasıl değişir?</b>', button: 'Derse başla ›' },
    goals: ['Çıktıya eklenen sayının doğruyu yukarı ya da aşağı kaydırdığını görür.', 'Girdiden çıkarılan sayının doğruyu sağa kaydırdığını görür.', 'Kaydırılan doğrunun kuralını yazar.'],
    scenes: [
      { title: 'Çıktıya ekle: f(x) + k', goal: 'Çıktıya eklenen sayının doğruyu yukarı ya da aşağı kaydırdığını gör.', run: ciktiyaEkle },
      { title: 'Girdiye ekle: f(x − r)', goal: 'Girdiden çıkarılan sayının doğruyu sağa kaydırdığını gör.', run: girdiyeEkle },
      { title: 'İkisi birlikte', goal: 'r ve k’yi değiştir; eğimin aynı kaldığını gör.', run: ikisiBirlikte },
      { title: 'Sıra sende', goal: 'Kuraldan kaymayı, kaymadan kuralı bul.', run: siraSende },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'g(x) = f(x) − 4 grafiği f(x) = x grafiğine göre nasıldır?', options: ['4 birim yukarıda', 'Daha dik', '4 birim aşağıda'], answer: 2,
        why: ['Çıktıdan 4 çıkarıldı; noktalar yukarı değil, aşağı gider.', 'Çıktıya sayı eklemek ya da çıkarmak eğimi değiştirmez.', 'Her çıktı 4 küçülür: doğru 4 birim aşağı kayar.'], scene: 0 },
      { q: 'g(x) = f(x − 3) grafiği x eksenini hangi noktada keser?', options: ['x = −3', 'x = 3', 'x = 0'], answer: 1,
        why: ['g(−3) = f(−6) = −6; sıfır değil. Girdiden çıkarmak sağa kaydırır.', 'g(3) = f(0) = 0: doğru 3 birim sağa kaymıştır.', 'x = 0 f’nin sıfırıdır; g(0) = f(−3) = −3.'], scene: 1 },
    ],
    summary: [
      '<b>Kaydırma doğrunun eğimini değil, yerini değiştirir.</b>',
      '<b>f(x) + k:</b> doğru k birim yukarı kayar; k negatifse aşağı.',
      '<b>f(x − r):</b> doğru r birim sağa kayar; f(x + r) sola.',
    ],
    nextLesson: { href: 'a7-egimi-belirleyen-a.html', label: 'Sonraki: Eğimi belirleyen a ›' },
  });
})();
