/* B2 · FİZ.9.2.2 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/B-skaler-ve-vektorel-nicelikler.md
   Yazar notu: içerik MEB Fizik 9 s. 58, 61–63, 72, 106 ve 122–123'ten; metindeki kurum adı ve "batıya gidiyoruz" kurgusu dışında veri eklenmedi.
   Öğrenciye kitap ya da sayfa anılmaz.
   Renkler: skaler yeşil, vektörel mor (B1 ile aynı); temel turkuaz, türetilmiş sarı (A2 ile aynı); benzerlik mavi, farklılık turuncu. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, belir, sol, kaybol, par, ok, okCiz, kart, kutular, sinifla, otobus } = KIT;
  const { ease } = Ders;
  const SK = RENK.r, VK = RENK.mor, TEMEL = RENK.turkuaz, TURET = RENK.vurgu, BENZ = RENK.a, FARK = RENK.b;
  const gizli = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };
  const sessiz = (p) => { p.catch(() => {}); };
  const ts = (m, renk) => `<tspan style="fill:${renk}">${m}</tspan>`;
  const vurgula = (c, el) => c.tween(500, (e) => el.setAttribute('stroke-width', 3 + 4 * Math.sin(e * Math.PI)), ease.linear);
  const ciz = (c, g, ms) => { const u = g.uclar; g.ayarla(u[0], u[1], u[0], u[1]); g.uclar = u; return okCiz(c, g, ms); };
  const buyukHarf = (m) => m[0].toLocaleUpperCase('tr') + m.slice(1);

  /* ---- Sahne 1 · Aynı rüzgâr, iki cümle ---- */
  async function ruzgar(c) {
    const svg = c.svg(1000, 562);
    const hat = c.S('g', {}, svg);
    const h1 = gizli(yazi(c, hat, 500, 230, 'skaler: sayı + birim', { size: 40, renk: SK })), h2 = gizli(yazi(c, hat, 500, 320, 'vektörel: sayı + birim + yön', { size: 40, renk: VK }));
    await belir(c, h1, 350); await belir(c, h2, 350);
    await c.say('Skalerin sayı ve birimle, vektörelin ayrıca yönle anlatıldığını biliyorsun.');
    await kaybol(c, hat);

    // Tepe, deniz ve türbin
    const TX = 200, GY = 196, man = gizli(c.S('g', {}, svg));
    yol(c, man, 'M 30 486 q 22 -12 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0', { renk: RENK.a, kalin: 3 });
    c.S('path', { d: `M 40 484 Q ${TX} 352 ${TX + 140} 484 Z`, fill: '#1f3a2e', stroke: RENK.r, 'stroke-width': 3 }, man);
    c.S('path', { d: `M ${TX - 9} 418 L ${TX - 4} ${GY} L ${TX + 4} ${GY} L ${TX + 9} 418 Z`, fill: RENK.koyu, stroke: RENK.yazi, 'stroke-width': 3 }, man);
    const pervane = c.S('g', {}, man);
    [0, 120, 240].forEach((a) => c.S('path', { d: `M ${TX} ${GY} q 11 -52 0 -104 q -7 52 0 104 Z`, fill: RENK.yazi, transform: `rotate(${a} ${TX} ${GY})` }, pervane));
    c.S('circle', { cx: TX, cy: GY, r: 9, fill: RENK.yazi }, man);
    let aci = 0;
    const don = (ms) => { const a0 = aci; aci += ms * 0.09; return c.tween(ms, (e, t) => pervane.setAttribute('transform', `rotate(${a0 + t * ms * 0.09} ${TX} ${GY})`), ease.linear); };
    const yuk = gizli(c.S('g', {}, svg));
    cizgi(c, yuk, 356, 484, 356, GY, { renk: RENK.soluk, kalin: 3 }); cizgi(c, yuk, 344, 484, 368, 484, { renk: RENK.soluk, kalin: 3 }); cizgi(c, yuk, 344, GY, 368, GY, { renk: RENK.soluk, kalin: 3 });
    cizgi(c, yuk, TX + 14, GY, 340, GY, { renk: RENK.soluk, kalin: 2, kesik: '5 7' });
    yazi(c, yuk, 370, 350, '50 m', { size: 26, renk: RENK.soluk, hiza: 'start' });
    const bilgi = (y, onek, deger, sonek) => {
      const g = gizli(c.S('g', {}, svg));
      g.cer = kutu(c, g, 456, y, 420, 84);
      g.t = yazi(c, g, 666, y + 54, `${onek} ${deger} m/s${sonek}`, { size: 32 });
      g.boya = () => { g.t.innerHTML = `${onek} ${deger} ${ts('m/s', BENZ)}${sonek}`; };
      return g;
    };
    const k1 = bilgi(96, 'Sürat:', '7,5', ''), k2 = bilgi(262, 'Hız:', '8,1', ', kuzeydoğu');
    const pus = gizli(c.S('g', {}, svg)), PX = 934, PY = 304;
    cizgi(c, pus, PX - 34, PY, PX + 34, PY, { renk: RENK.ince, kalin: 2 }); cizgi(c, pus, PX, PY - 34, PX, PY + 34, { renk: RENK.ince, kalin: 2 });
    yazi(c, pus, PX, PY - 42, 'K', { size: 22, renk: RENK.soluk });
    ok(c, pus, PX - 22, PY + 22, PX + 26, PY - 26, { renk: VK, kalin: 6, uc: 16 });
    await belir(c, man);
    await par(c.say('Rüzgârdan elektrik üreten santraller, rüzgârın güçlü estiği yerlere kurulur.'), don(5200));
    await belir(c, yuk);
    await par(c.say('Bunun için deniz seviyesinden 50 metre yükseklikte rüzgâr ölçülür.', { speak: 'Bunun için deniz seviyesinden elli metre yükseklikte rüzgâr ölçülür.' }), don(4600));
    await belir(c, k1);
    await par(c.say('Rüzgârın sürati 7,5 m/s’nin üzerindeyse orası santrale uygundur.', { speak: 'Rüzgârın sürati yedi buçuk metre bölü saniyenin üzerindeyse orası santrale uygundur.' }), don(4400));
    await par(belir(c, k2), belir(c, pus));
    await par(c.say('Çanakkale’de bu yükseklikte ortalama rüzgâr hızı 8,1 m/s’dir; yönü kuzeydoğudur.', { speak: 'Çanakkale’de bu yükseklikte ortalama rüzgâr hızı sekiz virgül bir metre bölü saniyedir; yönü kuzeydoğudur.' }), don(5600));
    await vurgula(c, k1.cer);
    await c.say('İlk ölçümde yalnızca sayı ve birim var: 7,5 m/s.', { speak: 'İlk ölçümde yalnızca sayı ve birim var: yedi buçuk metre bölü saniye.' });
    await vurgula(c, k2.cer);
    await c.say('İkincisinde sayı ve birimin yanında yön de var.');
    await c.choice({ tag: 'Düşün', q: '“Rüzgârın sürati 8 m/s” ile “Rüzgâr kuzeydoğuya 8 m/s hızla esiyor” aynı bilgiyi mi verir?',
      options: ['Evet; sürat ile hız aynı şeydir.', 'Hayır; birimleri farklıdır.', 'Hayır; ikincisi yönü de söyler.'], answer: 2,
      hints: ['Sürat yalnızca ne kadar hızlı olduğunu söyler; hız yönü de söyler.', 'İkisinin birimi de m/s’dir; fark birimde değil, yöndedir.', ''],
      right: 'Evet. İkinci cümlede yön de var.' });
    const e1 = gizli(yazi(c, svg, 666, 218, 'skaler', { size: 30, renk: SK })), e2 = gizli(yazi(c, svg, 666, 384, 'vektörel', { size: 30, renk: VK }));
    k1.cer.setAttribute('stroke', SK); k2.cer.setAttribute('stroke', VK);
    await belir(c, [e1, e2]);
    await c.say('Sürat skaler, hız vektörel bir niceliktir.', { speak: 'Sürat skaler, [short pause] hız vektörel bir niceliktir.' });
    k1.boya(); k2.boya();
    await c.say('İkisinin birimi aynıdır: metre bölü saniye.');
  }

  /* ---- Sahne 2 · Benzerlikler ---- */
  async function benzer(c) {
    const svg = c.svg(1000, 562);
    const sut = [[60, 'Skaler', SK], [520, 'Vektörel', VK]].map(([x, ad, renk]) => {
      const g = gizli(c.S('g', {}, svg));
      g.cer = kutu(c, g, x, 26, 420, 250, { renk }); yazi(c, g, x + 210, 72, ad, { size: 32, renk });
      return g;
    });
    const serit = gizli(c.S('g', {}, svg));
    cizgi(c, serit, 270, 276, 270, 318, { renk: BENZ, kalin: 3 }); cizgi(c, serit, 730, 276, 730, 318, { renk: BENZ, kalin: 3 });
    kutu(c, serit, 140, 318, 720, 222, { renk: BENZ });
    yazi(c, serit, 500, 362, 'Benzerlik', { size: 30, renk: BENZ });
    const madde = ['ölçülür', 'sayı ve birim', 'aynı tür nicelikle toplanır'].map((m, i) => gizli(yazi(c, svg, 500, 414 + i * 46, m, { size: 28 })));
    const ornek = gizli([yazi(c, svg, 270, 150, '5 kg', { size: 48 }), yazi(c, svg, 730, 150, '60 N', { size: 48 })]);
    await belir(c, sut);
    await belir(c, serit);
    await c.say('Önce iki tür niceliğin ortak yanlarına bakalım.');
    await belir(c, madde[0]);
    await c.say('İkisi de fiziksel niceliktir; ikisi de ölçülür.');
    await belir(c, madde[1]);
    await c.say('İkisinin büyüklüğü de bir sayı ve bir birimle yazılır.');
    await belir(c, ornek);
    await c.say('Kütle 5 kilogram, kuvvet 60 newton: ikisinde de sayı ve birim var.', { speak: 'Kütle beş kilogram, kuvvet altmış newton: ikisinde de sayı ve birim var.' });
    await belir(c, madde[2]);
    await c.say('İkisinde de yalnızca aynı tür nicelikler birbiriyle toplanır.');
    const top = gizli(c.S('g', {}, svg));
    yazi(c, top, 270, 226, 'kütle + kütle', { size: 28, renk: RENK.soluk }); yazi(c, top, 712, 208, 'kuvvet + kuvvet', { size: 28, renk: RENK.soluk });
    yazi(c, top, 712, 252, 'hız + kuvvet', { size: 28, renk: RENK.soluk }); yol(c, top, 'M 822 232 L 842 252 M 842 232 L 822 252', { renk: RENK.kotu, kalin: 5 });
    await belir(c, top);
    await c.say('Kütle kütleyle, kuvvet kuvvetle toplanır; hız ile kuvvet toplanmaz.');
    await c.choice({ tag: 'Düşün', q: 'Hangisi skaler ve vektörel niceliklerin ortak bir özelliğidir?',
      options: ['İkisinin de yönü vardır.', 'İkisinin büyüklüğü de sayı ve birimle yazılır.', 'İkisinde de sayılar doğrudan toplanır.'], answer: 1,
      hints: ['Yön yalnızca vektörel niceliklerde vardır.', '', 'Vektörel nicelikte yöne bakılır; 60 N ile 40 N her zaman 100 N etmez.'],
      right: 'Evet. Sayı ve birim ikisinde de var.' });
    const yon = ok(c, svg, 812, 134, 892, 134, { renk: VK });
    madde[1].style.fill = BENZ;
    await ciz(c, yon);
    await c.say('Yön yalnızca vektörel niceliklerde vardır; ortak olan sayı ve birimdir.');
  }

  /* ---- Sahne 3 · Farklılıklar ---- */
  async function farkli(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg), A = RENK.a, B = RENK.b;
    const iskelet = gizli(c.S('g', {}, g1));
    kutu(c, iskelet, 50, 26, 900, 470, { renk: RENK.cizgi });
    cizgi(c, iskelet, 230, 26, 230, 496, { kalin: 2 }); cizgi(c, iskelet, 560, 26, 560, 496, { kalin: 2 });
    cizgi(c, iskelet, 50, 96, 950, 96, { kalin: 2 }); cizgi(c, iskelet, 50, 196, 950, 196, { kalin: 2 });
    yazi(c, iskelet, 395, 74, 'Skaler', { size: 32, renk: SK }); yazi(c, iskelet, 755, 74, 'Vektörel', { size: 32, renk: VK });
    const yonSatir = gizli(c.S('g', {}, g1));
    yazi(c, yonSatir, 140, 158, 'Yön', { size: 30, renk: FARK });
    yazi(c, yonSatir, 395, 158, 'yok', { size: 30 }); yazi(c, yonSatir, 715, 158, 'var', { size: 30 });
    ok(c, yonSatir, 760, 148, 836, 148, { renk: VK });
    const topAd = gizli(yazi(c, g1, 140, 358, 'Toplama', { size: 30, renk: FARK }));
    const skTop = gizli(yazi(c, g1, 395, 358, '3 kg + 2 kg = 5 kg', { size: 30 }));
    const vkTop = gizli(c.S('g', {}, g1)), X = 590, K = 1.5;
    yazi(c, vkTop, X + 45, 260, '60 N', { size: 24, renk: A }); yazi(c, vkTop, X + 136, 260, '40 N', { size: 24, renk: B });
    ok(c, vkTop, X, 290, X + 60 * K, 290, { renk: A }); ok(c, vkTop, X + 106, 290, X + 106 + 40 * K, 290, { renk: B });
    yazi(c, vkTop, 870, 300, '100 N', { size: 30, renk: TURET });
    ok(c, vkTop, X, 420, X + 60 * K, 420, { renk: A }); ok(c, vkTop, X + 106 + 40 * K, 420, X + 106, 420, { renk: B });
    yazi(c, vkTop, 870, 430, '20 N', { size: 30, renk: TURET });
    await belir(c, iskelet);
    await c.say('Şimdi iki türün ayrıldığı yerlere bakalım.');
    await belir(c, yonSatir);
    await c.say('İlk fark yöndür: skalerde yön yoktur, vektörelde vardır.');
    await belir(c, topAd);
    await c.say('İkinci fark toplamadadır.');
    await belir(c, skTop);
    await c.say('Üç kilogram ile iki kilogram her zaman beş kilogram eder.');
    await belir(c, vkTop);
    await c.say('60 ve 40 newton ise yöne göre 100 ya da 20 eder.', { speak: 'Altmış ve kırk newton ise yöne göre yüz ya da yirmi eder.' });
    await c.say('Vektörel nicelikte yön söylenmezse bilgi yarım kalır.', { speak: '[thoughtful] Vektörel nicelikte yön söylenmezse bilgi yarım kalır.' });
    await kaybol(c, g1, 400);

    const kt = kutular(c, svg, ['Benzerlik', 'Farklılık'], { x: 60, y: 50, w: 430, h: 290, bosluk: 20, renkler: [BENZ, FARK], baslikBoy: 30, yaziBoy: 28 });
    gizli(kt.g); await belir(c, kt.g, 300);
    await c.say('Altı ifadeyi benzerlik ve farklılık kutularına ayır.', { noWait: true });
    const BI = 'Bu, iki tür için de doğru; ortak bir özellik.', FI = 'Bu, iki türde aynı değil; birini ötekinden ayırır.';
    await sinifla(c, kt, [
      { ad: 'İkisi de ölçülür.', kisa: 'ölçülür', kutu: 0, neden: 'Ortak: ikisi de fiziksel niceliktir.', ipucu: ['', BI] },
      { ad: 'Biri yön ister, öbürü istemez.', kisa: 'yön', kutu: 1, neden: 'Fark: yön yalnızca vektörelde vardır.', ipucu: [FI, ''] },
      { ad: 'İkisi de sayı ve birimle yazılır.', kisa: 'sayı ve birim', kutu: 0, neden: 'Ortak: ikisinde de sayı ve birim var.', ipucu: ['', BI] },
      { ad: 'Toplarken birinde yöne bakılır.', kisa: 'toplama biçimi', kutu: 1, neden: 'Fark: skalerde sayılar doğrudan toplanır.', ipucu: [FI, ''] },
      { ad: 'İkisinde de aynı tür nicelikler toplanır.', kisa: 'aynı tür toplanır', kutu: 0, neden: 'Ortak: kütle kütleyle, kuvvet kuvvetle toplanır.', ipucu: ['', BI] },
      { ad: 'Biri sayı ve birimle tam anlatılır, öbürü anlatılmaz.', kisa: 'tam anlatılma', kutu: 1, neden: 'Fark: vektörelde yön de gerekir.', ipucu: [FI, ''] },
    ], { tag: 'Sıra sende', y: 420, size: 26, soru: (a) => `“${a}”<br>Bu ifade bir benzerlik mi, bir farklılık mı?` });
    const son = gizli(c.S('g', {}, svg));
    yazi(c, son, 275, 420, 'sayı ve birimde', { size: 30, renk: BENZ }); yazi(c, son, 725, 420, 'yönde', { size: 30, renk: FARK });
    await belir(c, son);
    await c.say('Benzerlik sayı ve birimde, farklılık yönde toplanıyor.');
    c.note('<b>Sayı ve birim:</b> ikisinde de var<br><b>Yön:</b> skalerde yok, vektörelde var<br><b>Toplama:</b> skalerde sayılar toplanır, vektörelde yöne bakılır', 'Skaler ile vektörel', 'benzer-ayri');
  }

  /* ---- Sahne 4 · İki soru, bir tablo ---- */
  async function ikiSoru(c) {
    const svg = c.svg(1000, 562), XS = [40, 230, 585, 940], YS = [24, 84, 292, 500];
    const iskelet = gizli(c.S('g', {}, svg));
    kutu(c, iskelet, XS[0], YS[0], XS[3] - XS[0], YS[3] - YS[0], { renk: RENK.cizgi });
    [1, 2].forEach((k) => { cizgi(c, iskelet, XS[k], YS[0], XS[k], YS[3], { kalin: 2 }); cizgi(c, iskelet, XS[0], YS[k], XS[3], YS[k], { kalin: 2 }); });
    const satirAd = gizli([yazi(c, svg, 135, 198, 'Temel', { size: 30, renk: TEMEL }), yazi(c, svg, 135, 406, 'Türetilmiş', { size: 30, renk: TURET })]);
    const sutunAd = gizli([yazi(c, svg, 407, 66, 'Skaler', { size: 30, renk: SK }), yazi(c, svg, 762, 66, 'Vektörel', { size: 30, renk: VK })]);
    const dolu = [[0, 0], [0, 0]];
    /* r: 0 temel, 1 türetilmiş; k: 0 skaler, 1 vektörel. Gözün sıradaki boş yerini verir. */
    const yer = (r, k) => {
      const n = dolu[r][k]++, cx = (XS[k + 1] + XS[k + 2]) / 2, cy = (YS[r + 1] + YS[r + 2]) / 2;
      return [cx + (n % 2 ? 88 : -88), cy + (n < 2 ? -30 : 44)];
    };
    const BX = 500, BY = 544;
    const bekleyen = (ad) => gizli(yazi(c, svg, BX, BY, ad, { size: 28, renk: RENK.yazi }));
    const yerlestir = (t, r, k) => {
      const [x, y] = yer(r, k); let gecti = false;
      return c.tween(520, (e, u) => { if (u >= 0.5 && !gecti) { gecti = true; t.textContent = t.ad; t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('font-size', 26); } t.style.opacity = Math.abs(1 - 2 * u); }, ease.linear);
    };
    await belir(c, iskelet);
    await c.say('Bir niceliğe iki ayrı soru sorabiliriz.');
    await belir(c, satirAd);
    await c.say('Birinci soru: temel mi, türetilmiş mi?', { speak: '[curious] Birinci soru: temel mi, türetilmiş mi?' });
    await belir(c, sutunAd);
    await c.say('İkinci soru: skaler mi, vektörel mi?');
    const kutle = Object.assign(bekleyen('kütle'), { ad: 'kütle' });
    await belir(c, kutle);
    await c.say('Kütleyi ele alalım: yedi temel nicelikten biridir ve yön gerektirmez.');
    await yerlestir(kutle, 0, 0);
    await c.say('Kütle hem temel hem skalerdir.');
    const kuvvet = Object.assign(bekleyen('kuvvet'), { ad: 'kuvvet' });
    await belir(c, kuvvet);
    await c.say('Kuvvetin birimi kg·m/s²’dir ve kuvvet yön ister.', { speak: 'Kuvvetin birimi kilogram çarpı metre bölü saniyekaredir ve kuvvet yön ister.' });
    await yerlestir(kuvvet, 1, 1);
    await c.say('Kuvvet hem türetilmiş hem vektöreldir.');

    // Dene: yedi nicelik, dört göz
    const SEC = ['Temel ve skaler', 'Temel ve vektörel', 'Türetilmiş ve skaler', 'Türetilmiş ve vektörel'];
    const liste = [['zaman', 0, 0, 'Zamanın birimi saniye tek başına durur; zaman temeldir.'], ['hacim', 1, 0, 'Metreküp üç metrenin çarpımıdır; hacim türetilmiştir.'],
      ['sıcaklık', 0, 0, 'Sıcaklığın birimi kelvin tek başına durur; sıcaklık temeldir.'], ['yoğunluk', 1, 0, 'Yoğunluğun birimi kg/m³ iki birimden kurulur; yoğunluk türetilmiştir.'],
      ['uzunluk', 0, 0, 'Uzunluğun birimi metre tek başına durur; uzunluk temeldir.'], ['enerji', 1, 0, 'Joule kısa bir addır; kilogram, metre ve saniyeden kurulur.'],
      ['hız', 1, 1, 'Hızın birimi m/s iki birimden kurulur; hız türetilmiştir.']];
    const yazilar = {};
    await c.say('Yedi niceliği tablodaki doğru göze yerleştir.', { noWait: true });
    for (const [ad, r, k, b] of liste) {
      const t = Object.assign(bekleyen(ad + '  →  ?'), { ad }), Ad = buyukHarf(ad);
      yazilar[ad] = t; t.style.fill = TURET; t.style.opacity = 1;
      const ipucu = (i) => {
        if (i === r * 2 + k) return '';
        if ((i >> 1) !== r) return b;
        return k ? `${Ad} yön ister; vektöreldir.` : `${Ad} yön gerektirmez; skalerdir.`;
      };
      await c.choice({ tag: 'Sıra sende', q: `<b>${Ad}</b> tablonun hangi gözüne girer?`, options: SEC, answer: r * 2 + k, hints: SEC.map((_, i) => ipucu(i)),
        right: `${Ad}: ${r ? 'türetilmiş' : 'temel'} ve ${k ? 'vektörel' : 'skaler'}.`,
        onPick: (i, dogru) => { if (dogru) { t.style.fill = RENK.yazi; sessiz(yerlestir(t, r, k)); } } });
    }
    yazilar['yoğunluk'].style.fill = TURET;
    await c.choice({ tag: 'Düşün', q: 'Yoğunluk türetilmiş bir niceliktir. Öyleyse vektörel midir?',
      options: ['Evet; türetilmiş nicelikler vektöreldir.', 'Evet; çünkü birimi iki birimden kurulmuştur.', 'Hayır; yoğunluk yön gerektirmez, skalerdir.'], answer: 2,
      hints: ['Tabloya bak: hacim ve enerji de türetilmiştir ama skalerdir.', 'Birim, niceliğin temel mi türetilmiş mi olduğunu söyler; yönü söylemez.', ''],
      right: 'Evet. Yoğunluk türetilmiş ve skalerdir.' });
    yazilar['yoğunluk'].style.fill = RENK.yazi;
    await c.say('Türetilmiş olmak, vektörel olmak demek değildir.', { speak: '[thoughtful] Türetilmiş olmak, vektörel olmak demek değildir.' });
    const cerceve = (x, y, w, h, renk) => c.S('rect', { x, y, width: w, height: h, rx: 10, fill: 'none', stroke: renk, 'stroke-width': 5, opacity: 0 }, svg);
    const c1 = cerceve(XS[1] + 6, YS[1] + 6, XS[2] - XS[1] - 12, YS[2] - YS[1] - 12, TEMEL);
    const bos = gizli(yazi(c, svg, (XS[2] + XS[3]) / 2, (YS[1] + YS[2]) / 2 + 10, 'boş', { size: 28, renk: RENK.soluk }));
    await par(belir(c, c1), belir(c, bos));
    await c.say('Bu tablodaki temel niceliklerin hepsi skalerdir.');
    const c2 = cerceve(XS[1] + 6, YS[2] + 6, XS[3] - XS[1] - 12, YS[3] - YS[2] - 12, TURET);
    await par(sol(c, c1, 0, 300), belir(c, c2));
    await c.say('Türetilmiş niceliklerin bir kısmı skaler, bir kısmı vektöreldir.');
    await sol(c, c2, 0, 300);
    await par(vurgula(c, iskelet.firstElementChild));
    await c.say('İki soru birbirinden bağımsızdır; her birini ayrı sor.');
  }

  /* ---- Sahne 5 · Otobüs duyurusu, iki soruyla ---- */
  async function duyuru(c) {
    const svg = c.S('g', { transform: 'translate(0 36)' }, c.svg(1000, 562));
    const oto = gizli(c.S('g', {}, svg));
    otobus(c, oto, 500, 136, { s: 1.3 }); yazi(c, oto, 500, 36, 'Sivas → Çanakkale', { size: 24, renk: RENK.soluk });
    const veri = [['1.100 km', 'uzunluk', 0], ['16 saat', 'zaman', 0], ['21 °C', 'sıcaklık', 0], ['100 km/h', 'sürat', 1]];
    const kx = (i) => 162.5 + i * 225;
    const kartlar = gizli(veri.map(([v], i) => kart(c, svg, kx(i) - 95, 196, 190, 80, v, { size: 30 })));
    const etiket = veri.map(([, ad, r], i) => ({
      ad: gizli(yazi(c, svg, kx(i), 330, ad, { size: 28 })),
      tur: gizli([yazi(c, svg, kx(i), 378, r ? 'türetilmiş' : 'temel', { size: 26, renk: r ? TURET : TEMEL }), yazi(c, svg, kx(i), 420, 'skaler', { size: 26, renk: SK })]),
    }));
    const cer = (i) => kartlar[i].querySelector('rect');
    const anlat = async (i, metin, speak) => { cer(i).setAttribute('stroke', RENK.yazi); await belir(c, etiket[i].ad, 300); await belir(c, etiket[i].tur, 300); await c.say(metin, { speak }); cer(i).setAttribute('stroke', RENK.cizgi); };
    await belir(c, oto);
    for (const k of kartlar) await belir(c, k, 200);
    await c.say('Sivas’tan Çanakkale’ye giden otobüsün duyurusunu hatırla.');
    await anlat(0, 'Yol 1.100 kilometre: nicelik uzunluk; temel ve skaler.', 'Yol bin yüz kilometre: nicelik uzunluk; temel ve skaler.');
    await anlat(1, 'Yolculuk 16 saat: nicelik zaman; temel ve skaler.', 'Yolculuk on altı saat: nicelik zaman; temel ve skaler.');
    await anlat(2, 'Hava sıcaklığı 21 °C: nicelik sıcaklık; temel ve skaler.', 'Hava sıcaklığı yirmi bir derece selsiyus: nicelik sıcaklık; temel ve skaler.');
    cer(3).setAttribute('stroke', RENK.yazi);
    await belir(c, etiket[3].ad);
    await c.say('Sürat sınırı 100 km/h: nicelik sürat.', { speak: 'Sürat sınırı yüz kilometre bölü saat: nicelik sürat.' });
    await c.choice({ tag: 'Uygula', q: 'Sürat, tablonun hangi gözüne girer?', options: ['Temel ve skaler', 'Türetilmiş ve skaler', 'Türetilmiş ve vektörel'], answer: 1,
      hints: ['Süratin birimi m/s’dir; iki birimden kurulur, yani türetilmiştir.', '', 'Yönü olan hızdır; süratte yön söylenmez.'],
      right: 'Evet. Sürat türetilmiş ve skalerdir.' });
    await belir(c, etiket[3].tur);
    await c.say('Sürat uzunluk ve zamandan kurulur; yönü yoktur.');
    cer(3).setAttribute('stroke', RENK.cizgi);
    const alt = etiket.map((e, i) => c.S('line', { x1: kx(i) - 44, y1: 432, x2: kx(i) + 44, y2: 432, stroke: SK, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }, svg));
    await belir(c, alt);
    await c.say('Duyuruda yön isteyen tek bir nicelik bile yok.');
    const bati = gizli(yazi(c, svg, 274, 104, 'batı', { size: 28, renk: VK, hiza: 'end' }));
    const yon = ok(c, svg, 384, 94, 290, 94, { renk: VK });
    await par(ciz(c, yon), belir(c, bati));
    await c.say('Şoför “batıya doğru gidiyoruz” deseydi hızdan söz etmiş olurdu.', { speak: 'Şoför “batıya doğru gidiyoruz” deseydi [short pause] hızdan söz etmiş olurdu.' });
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-b2', kicker: 'Konu B · Skaler ve vektörel nicelikler', title: 'Skaler ile vektörel: nerede benzer, nerede ayrı?', accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Skaler ile vektörel: nerede benzer, nerede ayrı?', hook: '“Rüzgârın sürati 8 m/s” ile “Rüzgâr kuzeydoğuya 8 m/s hızla esiyor” aynı bilgiyi mi verir?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Aynı rüzgâr, iki cümle', goal: 'Sürat ile hızın farkını gör.', run: ruzgar },
      { title: 'Benzerlikler', goal: 'İki türün ortak yanlarını bul.', run: benzer },
      { title: 'Farklılıklar', goal: 'İki türün ayrıldığı yerleri bul.', run: farkli },
      { title: 'İki soru, bir tablo', goal: 'Nicelikleri iki soruyla dört göze yerleştir.', run: ikiSoru },
      { title: 'Otobüs duyurusu, iki soruyla', goal: 'Bir duyurudaki nicelikleri iki soruyla ayır.', run: duyuru },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hız ile süratin birimi aynıdır: m/s. Aralarındaki fark nedir?',
        options: ['Hız türetilmiş, sürat temeldir.', 'Hız daha büyük sayılarla yazılır.', 'Hızın yönü vardır, süratin yoktur.'], answer: 2,
        why: ['İkisi de türetilmiştir; birimleri m/s’dir.', 'Sayının büyüklüğü niceliğin türünü belirlemez.', 'Sürat skaler, hız vektöreldir; ayıran yöndür.'], scene: 0 },
      { q: 'Bir bisiklet parçasının etiketinde “1.250 N” yazıyor. Bu nicelik için hangisi doğrudur?',
        options: ['Temel ve vektörel', 'Türetilmiş ve skaler', 'Türetilmiş ve vektörel'], answer: 2,
        why: ['Newton kg·m/s² demektir; kuvvet temel değil, türetilmiştir.', 'Kuvvet yön ister; skaler değil, vektöreldir.', 'Newton kuvvetin birimidir; kuvvet türetilmiş ve vektöreldir.'], scene: 3 },
      { q: 'Hangi toplama anlamlıdır?',
        options: ['Bir kutunun kütlesini, üstüne etki eden kuvvetle', 'Bir odanın uzunluğunu, genişliğiyle', 'Bir bisikletçinin hızını, kendi kütlesiyle'], answer: 1,
        why: ['Kütle ile kuvvet farklı cins niceliklerdir; birbiriyle toplanmaz.', 'Evet. İkisi de uzunluktur; aynı tür nicelikler birbiriyle toplanır.', 'Hız ile kütle farklı cins niceliklerdir; birbiriyle toplanmaz.'], scene: 1 },
      { q: 'Barış: “Joule türetilmiş bir birim; öyleyse enerji de vektörel bir niceliktir.” Doğru karşılık hangisidir?',
        options: ['Haksız; enerji türetilmiştir ama yön gerektirmez, skalerdir.', 'Haksız; enerji temel bir niceliktir, o yüzden skalerdir.', 'Haklı; birimi türetilmiş olan her nicelik vektöreldir.'], answer: 0,
        why: ['Evet. Türetilmiş olmak vektörel olmak demek değildir; enerji yön gerektirmez.', 'Enerji temel değil, türetilmiştir: joule kilogram, metre ve saniyeden kurulur.', 'Birim niceliğin temel mi türetilmiş mi olduğunu söyler; yönü söylemez.'], scene: 3 },
    ],
    summary: ['<b>Sayı ve birim ortak, yön ayırır.</b>',
      'Sürat skaler, hız vektöreldir; ikisinin birimi de m/s’dir.',
      'Temel mi, türetilmiş mi? Skaler mi, vektörel mi? İki soru birbirinden bağımsızdır.'],
    nextLesson: { href: 'b3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
