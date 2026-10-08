/* A2 · FİZ.9.2.1 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/A-temel-ve-turetilmis-nicelikler.md
   Yazar notu: içerik MEB Fizik 9 s. 54–57, 59 ve 122–123'ten; koşu bandı kurgudur. Öğrenciye kitap ya da sayfa anılmaz.
   Renkler ders boyunca sabit: metre (uzunluk) mavi, saniye (zaman) turuncu, kilogram (kütle) yeşil, amper mor;
   temel grup turkuaz, türetilmiş grup sarı. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, ok, tablo, insan } = KIT;
  const { ease } = Ders;
  const U = RENK.a, Z = RENK.b, K = RENK.r, AK = RENK.mor, TEMEL = RENK.turkuaz, TURET = RENK.vurgu;
  const BR = { kg: K, m: U, s: Z, A: AK };

  const ts = (m, renk) => `<tspan style="fill:${renk}">${m}</tspan>`;
  /* Bir birim yazısındaki kg, m, s ve A harflerini kendi renkleriyle boyar. */
  const renkli = (birim) => birim.replace(/kg|m|s|A/g, (x) => ts(x, BR[x]));
  const zengin = (c, p, x, y, html, o) => { const t = yazi(c, p, x, y, '', o); t.innerHTML = html; return t; };
  const gizli = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };
  const sessiz = (p) => { p.catch(() => {}); };
  /* Yazının içindeki bir parçanın (n. geçişinin) orta x'i. */
  const orta = (t, parca, n = 0) => {
    const s = t.textContent; let i = -1;
    for (let k = 0; k <= n; k++) i = s.indexOf(parca, i + 1);
    return (t.getStartPositionOfChar(i).x + t.getEndPositionOfChar(i + parca.length - 1).x) / 2;
  };
  /* Birim yazısının parçalarından aşağıya çizgi indirir, ucuna nicelik adını yazar. parcalar: [[parça, kaçıncı, ad, renk, x]] */
  function altEtiket(c, p, t, parcalar, y0, y, size = 26) {
    const g = c.S('g', {}, p);
    parcalar.forEach(([parca, n, ad, renk, x]) => {
      cizgi(c, g, orta(t, parca, n), y0, x, y - size - 4, { renk, kalin: 2 });
      yazi(c, g, x, y, ad, { size, renk });
    });
    g.style.opacity = 0;
    return g;
  }
  /* Bir öğeyi söndürüp yeni yerinde yeniden belirtir; yolda başka yazıların üstünden geçmez. */
  const isinla = (c, el, koy) => { let gecti = false; sessiz(c.tween(520, (e, t) => { if (t >= 0.5 && !gecti) { gecti = true; koy(); } el.style.opacity = Math.abs(1 - 2 * t); }, ease.linear)); };
  const vurgula = (c, el, renk) => c.tween(500, (e) => { el.setAttribute('stroke-width', 3 + 4 * Math.sin(e * Math.PI)); if (renk) el.setAttribute('stroke', renk); }, ease.linear);

  /* ---- Sahne 1 · Üç ölçüm, bir fark ---- */
  async function bant(c) {
    const svg = c.svg(1000, 562);
    // Hatırlatma: üç nicelik, üç birim
    const on = c.S('g', {}, svg);
    const hat = [['uzunluk', 'm'], ['zaman', 's'], ['sürat', 'm/s']];
    const adlar = hat.map(([ad], i) => gizli(yazi(c, on, 340, 180 + i * 96, ad, { size: 42 })));
    const birimler = hat.map(([, b], i) => {
      const g = gizli(c.S('g', {}, on));
      ok(c, g, 470, 166 + i * 96, 570, 166 + i * 96, { renk: RENK.soluk, kalin: 4, uc: 14 });
      zengin(c, g, 660, 182 + i * 96, renkli(b), { size: 46 });
      return g;
    });
    await belir(c, adlar);
    await c.say('Her niceliğin SI’da bir birimi olduğunu biliyorsun.', { speak: 'Her niceliğin se i sisteminde bir birimi olduğunu biliyorsun.' });
    for (const b of birimler) await belir(c, b, 300);
    await c.say('Uzunluk metreyle, zaman saniyeyle, sürat metre bölü saniyeyle yazılır.');
    await kaybol(c, on);

    // Koşu bandı
    const G = 440, kb = gizli(c.S('g', {}, svg));
    kutu(c, kb, 60, G - 34, 330, 34, { rx: 17 });
    daire(c, kb, 78, G - 17, 9, { renk: RENK.soluk }); daire(c, kb, 372, G - 17, 9, { renk: RENK.soluk });
    const izler = [0, 1, 2, 3, 4, 5].map(() => cizgi(c, kb, 0, 0, 0, 0, { renk: RENK.soluk, kalin: 4 }));
    const izKoy = (kayma) => izler.forEach((el, k) => {
      const x = 104 + (((k * 44 - kayma) % 264) + 264) % 264;
      el.setAttribute('x1', x); el.setAttribute('x2', x - 10); el.setAttribute('y1', G - 33); el.setAttribute('y2', G - 24);
    });
    izKoy(0);
    cizgi(c, kb, 374, G - 34, 402, 252, { kalin: 6 }); cizgi(c, kb, 396, 304, 300, 304, { kalin: 5 });
    kutu(c, kb, 362, 206, 80, 46, { renk: RENK.yazi, rx: 6 });
    const kosucu = c.S('g', {}, kb); insan(c, kosucu, 215, G - 34, { s: 1.4, kol: 1 });
    const saat = gizli(c.S('g', {}, kb));
    daire(c, saat, 402, 229, 14, { renk: Z }); cizgi(c, saat, 402, 229, 402, 220, { renk: Z, kalin: 3 }); cizgi(c, saat, 402, 229, 409, 232, { renk: Z, kalin: 3 });
    const kos = (ms) => c.tween(ms, (e, t) => { izKoy(t * ms * 0.11); kosucu.setAttribute('transform', `translate(0 ${-4 * Math.abs(Math.sin(t * ms / 170))})`); }, ease.linear)
      .then(() => kosucu.setAttribute('transform', ''));

    // Ekranın büyütülmüş hâli
    const ek = gizli(c.S('g', {}, svg));
    cizgi(c, ek, 442, 206, 480, 50, { renk: RENK.ince, kalin: 2, kesik: '6 6' }); cizgi(c, ek, 442, 252, 480, 300, { renk: RENK.ince, kalin: 2, kesik: '6 6' });
    kutu(c, ek, 480, 50, 470, 250, { renk: RENK.yazi });
    const SY = [122, 190, 258];
    const vur = c.S('rect', { x: 494, y: 0, width: 442, height: 58, rx: 8, fill: '#22305a', opacity: 0 }, svg);
    const vurKoy = (i) => { vur.setAttribute('y', SY[i] - 41); return belir(c, vur, 250); };
    const satir = [['Süre', '600 s'], ['Yol', '1.800 m'], ['Sürat', '3 m/s']].map(([ad, d], i) => {
      const g = gizli(c.S('g', {}, svg));
      yazi(c, g, 512, SY[i], ad, { size: 34, hiza: 'start' });
      g.deger = yazi(c, g, 920, SY[i], d, { size: 36, hiza: 'end' });
      return g;
    });
    await belir(c, kb);
    await belir(c, ek, 300);
    await par(c.say('Spor salonunda koşu bandına çıktın; ekranda üç ölçüm var.'), kos(4200));
    for (const s of satir) await belir(c, s, 250);
    await c.say('Süre 600 saniye, yol 1.800 metre, sürat 3 m/s.', { speak: 'Süre altı yüz saniye, yol bin sekiz yüz metre, sürat üç metre bölü saniye.' });
    await par(vurKoy(0), belir(c, saat, 300));
    await c.say('Bant, süreyi içindeki saatle ölçer.');
    izler.forEach((el) => el.setAttribute('stroke', U));
    await par(c.say('Yolu ise dönen bandın uzunluğundan ölçer.'), kos(3000), vurKoy(1));
    await vurKoy(2);
    await c.say('Sürat, birim zamanda alınan yoldur.');
    await c.choice({ tag: 'Düşün', q: 'Ekrandaki üç ölçümden hangisi öbür ikisinden hesaplanmıştır?', options: ['Süre', 'Yol', 'Sürat'], answer: 2,
      hints: ['Süre doğrudan saatle ölçülür; başka bir ölçümden hesaplanmaz.', 'Yol doğrudan bandın dönüşünden ölçülür.', ''],
      right: 'Evet. Sürat, yol ile süreden hesaplanır.' });
    const es = gizli(yazi(c, svg, 715, 380, '1.800 m ÷ 600 s = 3 m/s', { size: 36 }));
    await belir(c, es);
    await c.say('1.800 metreyi 600 saniyeye bölersen 3 m/s bulursun.', { speak: 'Bin sekiz yüz metreyi altı yüz saniyeye bölersen üç metre bölü saniye bulursun.' });
    es.innerHTML = `1.800 ${ts('m', U)} ÷ 600 ${ts('s', Z)} = 3 ${renkli('m/s')}`;
    satir[0].deger.innerHTML = '600 ' + ts('s', Z); satir[1].deger.innerHTML = '1.800 ' + ts('m', U); satir[2].deger.innerHTML = '3 ' + renkli('m/s');
    await c.say('Süratin birimi de bunu gösterir: metre bölü saniye.', { speak: 'Süratin birimi de bunu gösterir: [short pause] metre bölü saniye.' });
    await sol(c, vur, 0, 250);
    const not = [['ölçülür', TEMEL], ['ölçülür', TEMEL], ['hesaplanır', TURET]].map(([m, renk], i) => gizli(yazi(c, svg, 690, SY[i] - 2, m, { size: 24, renk })));
    await belir(c, not);
    await c.say('Bazı nicelikler doğrudan ölçülür, bazıları ölçülenlerden kurulur.');
  }

  /* ---- Sahne 2 · Birim ne söylüyor? ---- */
  async function birim(c) {
    const svg = c.svg(1000, 562);
    const ust = [['uzunluk', 'm'], ['kütle', 'kg'], ['zaman', 's']].map(([ad, b], i) => {
      const g = gizli(c.S('g', {}, svg)), x = 70 + i * 300;
      kutu(c, g, x, 28, 260, 76);
      const t = zengin(c, g, x + 130, 78, `${ad}: <tspan style="fill-opacity:0">${renkli(b)}</tspan>`, { size: 34 });
      g.birim = t.firstElementChild;
      return g;
    });
    const ac = (g) => c.tween(350, (e) => { g.birim.style.fillOpacity = e; });
    const buyuk = (x, ad, b) => {
      const g = gizli(c.S('g', {}, svg));
      g.cerceve = kutu(c, g, x, 150, 360, 96);
      g.t = yazi(c, g, x + 180, 214, `${ad}: ${b}`, { size: 44 });
      g.boya = () => { g.t.innerHTML = `${ad}: ${renkli(b)}`; };
      return g;
    };
    const surat = buyuk(90, 'sürat', 'm/s'), yog = buyuk(550, 'yoğunluk', 'kg/m³');
    await belir(c, ust);
    await c.say('Bir niceliğin birimine dikkatle bakınca nasıl kurulduğu görünür.');
    await ac(ust[0]);
    await c.say('Uzunluğun birimi metredir; tek başına durur.');
    await ac(ust[1]); await ac(ust[2]);
    await c.say('Kütlenin birimi kilogram, zamanın birimi saniyedir; onlar da tek başına durur.');
    await belir(c, surat);
    await c.say('Süratin birimi metre bölü saniyedir.');
    surat.boya(); await vurgula(c, surat.cerceve);
    await c.say('Bu birim iki birimden kurulmuştur: metre saniyeye bölünmüştür.');
    await belir(c, altEtiket(c, svg, surat.t, [['m', 0, 'uzunluk', U, 250], ['s', 1, 'zaman', Z, 390]], 254, 322));
    await c.say('Demek ki sürat, uzunluk ve zamandan kurulan bir niceliktir.');
    await belir(c, yog);
    await c.say('Yoğunluğun birimi kilogram bölü metreküptür.');
    yog.boya(); await vurgula(c, yog.cerceve);
    await belir(c, altEtiket(c, svg, yog.t, [['kg', 0, 'kütle', K, 740], ['m', 0, 'uzunluk', U, 880]], 254, 322));
    await c.say('Yoğunluk da kütle ve uzunluktan kurulur.');
    const alan = gizli(c.S('g', {}, svg));
    kutu(c, alan, 200, 372, 440, 84, { renk: RENK.vurgu });
    const at = yazi(c, alan, 420, 429, 'alan: m² = m · m', { size: 40 });
    await belir(c, alan);
    await c.choice({ tag: 'Düşün', q: 'Alanın birimi metrekaredir: metre çarpı metre. Alan hangi nicelikten kurulur?',
      options: ['Uzunluk ve zamandan', 'Uzunluktan, iki kez', 'Hiçbirinden; doğrudan ölçülür.'], answer: 1,
      hints: ['Birimde saniye yok; yalnızca metre var, iki kez.', '', 'Metrekare, metrenin metreyle çarpılmasıdır; alan uzunluktan kurulur.'],
      right: 'Evet. Birimde iki metre var.' });
    at.innerHTML = `alan: ${ts('m²', U)} = ${ts('m', U)} · ${ts('m', U)}`;
    const oda = gizli(c.S('g', {}, svg));
    kutu(c, oda, 730, 374, 170, 80, { rx: 0, renk: RENK.soluk, kalin: 2 });
    cizgi(c, oda, 730, 454, 900, 454, { renk: U, kalin: 7 }); cizgi(c, oda, 730, 374, 730, 454, { renk: U, kalin: 7 });
    await belir(c, oda);
    await c.say('Bir odanın alanını bulmak için iki uzunluğu ölçüp çarparsın.');
    await belir(c, altEtiket(c, svg, at, [['m', 1, 'uzunluk', U, 450], ['m', 2, 'uzunluk', U, 590]], 462, 524));
    await c.say('Birimde tek tür nicelik görünse de alan uzunluktan kurulmuştur.', { speak: '[thoughtful] Birimde tek tür nicelik görünse de alan uzunluktan kurulmuştur.' });
  }

  /* ---- Sahne 3 · İki gruba ayır ---- */
  const NICELIK = [['uzunluk', 'm', 0], ['hız', 'm/s', 1], ['kütle', 'kg', 0], ['yoğunluk', 'kg/m³', 1], ['zaman', 's', 0],
    ['alan', 'm²', 1], ['sıcaklık', 'K', 0], ['hacim', 'm³', 1], ['elektrik akımı', 'A', 0], ['kuvvet', 'kg·m/s²', 1]];
  const NEDEN = {
    'hız': 'Metre saniyeye bölünmüş: iki birimden kurulmuş.', 'yoğunluk': 'Kilogram metreküpe bölünmüş: başka birimlerden kurulmuş.',
    'alan': 'Metrekare, metre çarpı metredir: metreden kurulmuş.', 'hacim': 'Metreküp, üç metrenin çarpımıdır: metreden kurulmuş.',
    'kuvvet': 'İçinde kilogram, metre ve saniye var.',
  };
  async function grupla(c) {
    const svg = c.svg(1000, 562), KW = 178, KH = 70;
    const kutuG = [40, 510].map((x, i) => {
      const g = gizli(c.S('g', {}, svg));
      g.cerceve = kutu(c, g, x, 196, 450, 304);
      yazi(c, g, x + 225, 234, i ? 'birimlerden kurulmuş' : 'tek başına', { size: 26, renk: i ? TURET : TEMEL });
      return g;
    });
    const kartlar = NICELIK.map(([ad, b, grup], i) => {
      const g = gizli(c.S('g', {}, svg)), x = 26 + (i % 5) * 190, y = 16 + Math.floor(i / 5) * 86 + ((i % 5) % 2 ? 10 : 0);
      g.cerceve = kutu(c, g, 0, 0, KW, KH, { rx: 10 });
      yazi(c, g, KW / 2, 28, ad, { size: 22 });
      zengin(c, g, KW / 2, 58, renkli(b), { size: 24 });
      g.setAttribute('transform', `translate(${x} ${y})`);
      return Object.assign(g, { ad, b, grup, x, y });
    });
    const dolu = [0, 0];
    const yerlestir = (k) => {
      const n = dolu[k.grup]++, x1 = (k.grup ? 510 : 40) + 30 + (n % 2) * 212, y1 = 252 + Math.floor(n / 2) * 80;
      isinla(c, k, () => {
        k.cerceve.setAttribute('stroke', k.grup ? TURET : TEMEL); k.cerceve.setAttribute('stroke-width', 3);
        k.setAttribute('transform', `translate(${x1} ${y1})`);
      });
    };
    for (let i = 0; i < kartlar.length; i += 2) await belir(c, [kartlar[i], kartlar[i + 1]], 180);
    await c.say('Şimdi nicelikleri birimlerine bakarak ikiye ayıralım.');
    await belir(c, kutuG[0]);
    await c.say('Bir kutuya birimi tek başına duranlar girecek.');
    await belir(c, kutuG[1]);
    await c.say('Öbür kutuya birimi başka birimlerden kurulanlar girecek.');
    const yeni = [kartlar[6], kartlar[8]];
    yeni.forEach((k) => { k.cerceve.setAttribute('stroke', RENK.yazi); });
    await par(yeni.map((k) => vurgula(c, k.cerceve)));
    await c.say('Sıcaklığın SI birimi kelvin, elektrik akımının SI birimi amperdir.', { speak: 'Sıcaklığın se i birimi kelvin, elektrik akımının se i birimi amperdir.' });
    await c.say('Kelvin ve amper de metre gibi tek başına duran birimlerdir.');
    yeni.forEach((k) => { k.cerceve.setAttribute('stroke', RENK.cizgi); });
    await c.say('On kartı iki kutuya ayır.', { noWait: true });
    for (const k of kartlar) {
      k.cerceve.setAttribute('stroke', RENK.yazi); k.cerceve.setAttribute('stroke-width', 5);
      await c.choice({ tag: 'Sıra sende', q: `<b>${k.ad}</b> kartındaki birim: <b>${k.b}</b>. Bu kart hangi kutuya girer?`,
        options: ['Birimi tek başına duruyor', 'Birimi başka birimlerden kurulmuş'], answer: k.grup,
        hints: k.grup ? [NEDEN[k.ad], ''] : ['', 'Bu birimin içinde başka birim yok; tek başına duruyor.'],
        right: k.grup ? NEDEN[k.ad] : `${k.b} tek başına duran bir birimdir.`,
        onPick: (i, dogru) => { if (dogru) yerlestir(k); } });
    }
    await par(kutuG.map((g) => vurgula(c, g.cerceve)));
    await c.say('İki grup ortaya çıktı; şimdi bu gruplara ad verelim.');
  }

  /* ---- Sahne 4 · Adları: temel ve türetilmiş ---- */
  function silindir(c, p, x, y) {
    const g = c.S('g', {}, p);
    yol(c, g, `M ${x - 20} ${y - 60} L ${x - 20} ${y + 40} L ${x + 20} ${y + 40} L ${x + 20} ${y - 60}`, { renk: RENK.yazi });
    c.S('rect', { x: x - 18, y: y - 14, width: 36, height: 52, fill: U, opacity: 0.45 }, g);
    cizgi(c, g, x - 32, y + 40, x + 32, y + 40, { renk: RENK.yazi });
    for (let k = 0; k < 5; k++) cizgi(c, g, x + 4, y - 46 + k * 18, x + 20, y - 46 + k * 18, { renk: RENK.yazi, kalin: 2 });
    return g;
  }
  async function adlandir(c) {
    const svg = c.svg(1000, 562);
    const cerceve = [40, 510].map((x) => kutu(c, svg, x, 30, 450, 250));
    const eski = ['tek başına', 'birimlerden kurulmuş'].map((m, i) => yazi(c, svg, 265 + i * 470, 74, m, { size: 26, renk: RENK.soluk }));
    const yeni = [['Temel nicelikler', TEMEL], ['Türetilmiş nicelikler', TURET]].map(([m, renk], i) => gizli(yazi(c, svg, 265 + i * 470, 76, m, { size: 30, renk })));
    const liste = (x, adlar) => adlar.map((ad, i) => yazi(c, svg, i === 4 ? x + 225 : x + 120 + (i % 2) * 210, 138 + Math.floor(i / 2) * 52, ad, { size: 26 }));
    const temel = liste(40, ['uzunluk', 'kütle', 'zaman', 'sıcaklık', 'elektrik akımı']), turet = liste(510, ['hız', 'yoğunluk', 'alan', 'hacim', 'kuvvet']);
    const adKoy = async (i) => { await sol(c, eski[i], 0, 250); eski[i].remove(); await par(belir(c, yeni[i]), vurgula(c, cerceve[i], i ? TURET : TEMEL)); };
    await adKoy(0);
    await c.say('Birimi tek başına duran niceliklere temel nicelik denir.');
    await vurgula(c, cerceve[0]);
    await c.say('Temel nicelik doğrudan ölçülür ve kendi başına ifade edilir.');
    await adKoy(1);
    await c.say('Birimi başka birimlerden kurulan niceliklere türetilmiş nicelik denir.');
    await vurgula(c, cerceve[1]);
    await c.say('Türetilmiş nicelik, temel niceliklerle kurulan bir matematiksel modelle tanımlanır.');
    await sol(c, [...temel, ...turet], 0.5);
    const o1 = gizli(zengin(c, svg, 500, 366, `sürat = ${ts('uzunluk', U)} ÷ ${ts('zaman', Z)}`, { size: 36 }));
    const o2 = gizli(zengin(c, svg, 500, 446, `alan = ${ts('uzunluk', U)} × ${ts('uzunluk', U)}`, { size: 36 }));
    await belir(c, o1);
    await c.say('Sürat böyle bir modeldir: uzunluk bölü zaman.');
    await belir(c, o2);
    await c.say('Alan da öyledir: uzunluk çarpı uzunluk.');
    await c.choice({ tag: 'Düşün', q: 'Hacmin SI birimi metreküptür. Hacim hangi gruba girer?',
      options: ['Temel; çünkü birimi tek sözcüktür.', 'Temel; çünkü dereceli silindirle doğrudan ölçülür.', 'Türetilmiş; çünkü metreküp üç metrenin çarpımıdır.'], answer: 2,
      hints: ['Sözcük sayısı yanıltır; metreküp, metre çarpı metre çarpı metredir.', 'Ölçülebilmek yetmez; hacim kendi başına değil, uzunlukla ifade edilir.', ''],
      right: 'Evet. Hacim uzunluktan kurulur.' });
    await kaybol(c, [o1, o2]);
    turet[3].style.fill = TURET;
    const hc = gizli(zengin(c, svg, 450, 410, `hacim: ${ts('m³', U)} = ${ts('m', U)} · ${ts('m', U)} · ${ts('m', U)}`, { size: 40 }));
    await par(belir(c, turet[3]), belir(c, hc));
    await c.say('Hacim türetilmiştir: birimi metre çarpı metre çarpı metredir.');
    await belir(c, gizli(silindir(c, svg, 840, 410)));
    await c.say('Bir aletle ölçülebilmek, niceliği tek başına temel yapmaz.', { speak: '[thoughtful] Bir aletle ölçülebilmek, niceliği tek başına temel yapmaz.' });
    c.note('<b>Temel nicelik kendi başına ifade edilir; türetilmiş nicelik temellerden kurulur.</b><br>uzunluk (m) temel, sürat (m/s) türetilmiş', 'Temel ve türetilmiş', 'temel-turetilmis');
  }

  /* ---- Sahne 5 · Yedi temel nicelik ---- */
  async function yedi(c) {
    const svg = c.svg(1000, 562);
    const sut = [{ ad: 'Temel nicelik', w: 290 }, { ad: 'SI birimi', w: 220 }, { ad: 'Sembol', w: 140 }];
    const t1 = tablo(c, svg, { x: 240, y: 50, satir: 62, size: 28, sutunlar: sut });
    gizli(t1.g);
    const yediG = gizli(yazi(c, svg, 120, 192, '7', { size: 150, renk: TEMEL, kalin: 700 }));
    const ekle = async (t, h, renk) => { const r = gizli(t.satir(h, { renkler: [RENK.yazi, RENK.yazi, renk || RENK.yazi] })); await belir(c, r, 300); return r; };
    await belir(c, yediG);
    await c.say('SI’da kaç temel nicelik olduğu bellidir: yedi tane.', { speak: 'Se i sisteminde kaç temel nicelik olduğu bellidir: yedi tane.' });
    await belir(c, t1.g);
    await c.say('Bu yedi nicelik, SI’nın tanımlandığı konferansta belirlenmiştir.', { speak: 'Bu yedi nicelik, se i sisteminin tanımlandığı konferansta belirlenmiştir.' });
    const ilk = [];
    ilk.push(await ekle(t1, ['uzunluk', 'metre', 'm'], U)); ilk.push(await ekle(t1, ['kütle', 'kilogram', 'kg'], K)); ilk.push(await ekle(t1, ['zaman', 'saniye', 's'], Z));
    await c.say('Üçünü iyi tanıyorsun: uzunluk, kütle ve zaman.');
    ilk.push(await ekle(t1, ['elektrik akımı', 'amper', 'A'], AK));
    await c.say('Dördüncüsü elektrik akımıdır; birimi amperdir.');
    // İlk dört satır kenara çekilir; tabloda son üçüne yer açılır.
    await kaybol(c, ilk, 350);
    const kenar = ['uzunluk', 'kütle', 'zaman', 'elektrik akımı'].map((ad, i) => gizli(yazi(c, svg, 120, 290 + i * 42, ad, { size: 24, renk: RENK.soluk })));
    await belir(c, kenar);
    const t2 = tablo(c, svg, { x: 240, y: 112, satir: 62, size: 28, basliksiz: true, sutunlar: sut });
    const sicak = await ekle(t2, ['sıcaklık', 'kelvin', 'K']);
    await c.say('Beşincisi sıcaklıktır; birimi kelvindir.');
    await ekle(t2, ['ışık şiddeti', 'kandela', 'cd']);
    await c.say('Altıncısı ışık şiddetidir; birimi kandeladır.');
    await ekle(t2, ['madde miktarı', 'mol', 'mol']);
    await c.say('Yedincisi madde miktarıdır; birimi moldür.');
    await c.tween(600, (e) => yediG.setAttribute('font-size', 150 + 14 * Math.sin(e * Math.PI)), ease.linear);
    await c.say('Bu yedisinin dışındaki nicelikler türetilmiş niceliklerdir.');
    await c.choice({ tag: 'Düşün', q: 'Hız, fizikte çok sık kullanılan bir niceliktir. Hız temel bir nicelik midir?',
      options: ['Evet; çok kullanılan nicelikler temeldir.', 'Hayır; yedi temel nicelik arasında yoktur, birimi m/s’dir.', 'Evet; hız göstergeden doğrudan okunur.'], answer: 1,
      hints: ['Temel olmak sık kullanılmaya bağlı değildir; liste yedi niceliktir.', '', 'Göstergeden okunsa da hızın birimi metre ve saniyeden kurulur.'],
      right: 'Evet. Hız yedi temel nicelik arasında değildir.' });
    await c.say('Bir niceliğin temel olması, çok kullanılmasına bağlı değildir.', { speak: '[thoughtful] Bir niceliğin temel olması, çok kullanılmasına bağlı değildir.' });
    const vur = c.S('rect', { x: 244, y: 117, width: 642, height: 53, rx: 8, fill: 'none', stroke: TEMEL, 'stroke-width': 3, opacity: 0 }, svg);
    const der = gizli(c.S('g', {}, svg));
    yazi(c, der, 940, 153, '°C', { size: 28, renk: RENK.soluk }); cizgi(c, der, 912, 158, 968, 128, { renk: RENK.kotu, kalin: 4 });
    sicak.querySelectorAll('text').forEach((t) => { t.style.fill = TEMEL; });
    await par(belir(c, vur), belir(c, der));
    await c.say('Sıcaklık temeldir ama SI birimi derece Celsius değil, kelvindir.', { speak: 'Sıcaklık temeldir ama se i birimi derece selsiyus değil, kelvindir.' });
  }

  /* ---- Sahne 6 · Özel adlı birimler ---- */
  async function ozelAd(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    const nt = gizli(zengin(c, g1, 500, 110, 'newton (N) <tspan style="fill-opacity:0">= kg·m/s²</tspan>', { size: 56 }));
    const acik = nt.firstElementChild;
    await belir(c, nt);
    await c.say('Bazı türetilmiş birimler uzundur; onlara kısa adlar verilmiştir.');
    await c.tween(500, (e) => { acik.style.fillOpacity = e; });
    await c.say('Kuvvetin birimi kilogram çarpı metre bölü saniyekaredir.');
    const alt = c.S('line', { x1: 210, y1: 128, x2: 470, y2: 128, stroke: TURET, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }, g1);
    alt.setAttribute('x1', nt.getStartPositionOfChar(0).x); alt.setAttribute('x2', nt.getEndPositionOfChar(9).x);
    await belir(c, alt);
    await c.say('Bu uzun birime kısaca newton denir.', { speak: 'Bu uzun birime kısaca [short pause] newton denir.' });
    acik.innerHTML = '= ' + renkli('kg·m/s²');
    await c.say('Newton tek sözcüktür ama içinde üç birim vardır.');
    await belir(c, altEtiket(c, g1, nt, [['kg', 0, 'kütle', K, 560], ['m', 0, 'uzunluk', U, 690], ['s', 0, 'zaman', Z, 820]], 134, 214));
    await c.say('Kuvvet; kütle, uzunluk ve zamandan kurulan türetilmiş bir niceliktir.');
    const jl = gizli(yazi(c, g1, 500, 330, 'joule (J) = kg·m²/s²', { size: 40 })), pa = gizli(yazi(c, g1, 500, 420, 'pascal (Pa) = kg/(m·s²)', { size: 40 }));
    await belir(c, jl, 350); await belir(c, pa, 350);
    await c.say('Enerjinin birimi joule, basıncın birimi pascal da böyle kısa adlardır.', { speak: 'Enerjinin birimi jul, basıncın birimi paskal da böyle kısa adlardır.' });
    jl.innerHTML = 'joule (J) = ' + renkli('kg·m²/s²'); pa.innerHTML = 'pascal (Pa) = ' + renkli('kg/(m·s²)');
    await c.say('Joule ve pascal da kilogram, metre ve saniyeden kurulur.', { speak: 'Jul ve paskal da kilogram, metre ve saniyeden kurulur.' });
    await kaybol(c, g1, 400);

    const guc = gizli(yazi(c, svg, 500, 120, 'güç: kg·m²/s³', { size: 60 }));
    await belir(c, guc);
    await c.say('Bir örnek çözelim: gücün birimi kg·m²/s³ olarak yazılır.', { speak: 'Bir örnek çözelim: gücün birimi kilogram çarpı metrekare bölü saniye küp olarak yazılır.' });
    guc.innerHTML = 'güç: ' + renkli('kg·m²/s³');
    await belir(c, altEtiket(c, svg, guc, [['kg', 0, 'kütle', K, 420], ['m', 0, 'uzunluk', U, 570], ['s', 0, 'zaman', Z, 720]], 146, 232));
    await c.say('Kilogram kütleyi, metre uzunluğu, saniye zamanı gösterir.');
    const tur = gizli(yazi(c, svg, 500, 296, 'türetilmiş', { size: 32, renk: TURET }));
    await belir(c, tur);
    await c.say('Öyleyse güç; kütle, uzunluk ve zamandan türetilmiştir.');
    const yuk = gizli(yazi(c, svg, 500, 420, 'elektrik yükü: A·s', { size: 46 }));
    await belir(c, yuk);
    await c.choice({ tag: 'Uygula', q: 'Elektrik yükünün birimi amper çarpı saniyedir (A·s). Elektrik yükü hangi temel niceliklerden türetilmiştir?',
      options: ['Elektrik akımı ve uzunluk', 'Kütle ve zaman', 'Elektrik akımı ve zaman'], answer: 2,
      hints: ['Birimde metre yok; amper ve saniye var.', 'Birimde kilogram yok; amper elektrik akımının birimidir.', ''],
      right: 'Evet. Amper ile saniye çarpılmış.' });
    yuk.innerHTML = 'elektrik yükü: ' + renkli('A·s');
    await belir(c, altEtiket(c, svg, yuk, [['A', 0, 'elektrik akımı', AK, 540], ['s', 0, 'zaman', Z, 770]], 446, 524));
    await c.say('Amper elektrik akımını, saniye zamanı gösterir.');
    await c.say('Türetilmiş bir birimi çözmek, içindeki temel birimleri okumaktır.');
  }

  /* ---- Sahne 7 · Etikette dört ölçüm ---- */
  function amortisor(c, p, x) {
    const g = c.S('g', {}, p);
    daire(c, g, x, 56, 15, { renk: RENK.soluk, kalin: 5 }); daire(c, g, x, 274, 15, { renk: RENK.soluk, kalin: 5 });
    cizgi(c, g, x, 71, x, 100, { renk: RENK.soluk, kalin: 8 }); cizgi(c, g, x, 232, x, 259, { renk: RENK.soluk, kalin: 8 });
    kutu(c, g, x - 22, 96, 44, 78, { renk: RENK.soluk, rx: 6 });
    cizgi(c, g, x, 174, x, 232, { renk: RENK.soluk, kalin: 6 });
    cizgi(c, g, x - 50, 104, x + 50, 104, { renk: RENK.yazi, kalin: 6 }); cizgi(c, g, x - 50, 232, x + 50, 232, { renk: RENK.yazi, kalin: 6 });
    let d = `M ${x - 44} 110`;
    for (let k = 0; k < 6; k++) d += ` L ${x + 44} ${120 + k * 20} L ${x - 44} ${130 + k * 20}`;
    yol(c, g, d, { renk: RENK.yazi, kalin: 5 });
    return g;
  }
  async function etiket(c) {
    const svg = c.svg(1000, 562), ust = c.S('g', {}, svg);
    const am = gizli(amortisor(c, ust, 190));
    const et = gizli(c.S('g', {}, ust));
    kutu(c, et, 390, 30, 550, 262, { renk: RENK.yazi });
    const SY = [80, 140, 200, 260];
    const satir = [['I.', '100 g', 'kütle', 0], ['II.', '11,8 cm³', 'hacim', 1], ['III.', '8,47 g/cm³', 'yoğunluk', 1], ['IV.', '1.250 N', 'kuvvet', 1]].map(([no, d, ad, grup], i) => {
      const g = gizli(c.S('g', {}, ust));
      yazi(c, g, 420, SY[i], no, { size: 28, hiza: 'start', renk: RENK.soluk }); yazi(c, g, 500, SY[i], d, { size: 32, hiza: 'start' });
      return Object.assign(g, { ad, grup });
    });
    const kutuG = [['Temel', TEMEL, 60], ['Türetilmiş', TURET, 520]].map(([m, renk, x]) => {
      const g = gizli(c.S('g', {}, svg));
      g.cerceve = kutu(c, g, x, 330, 420, 200, { renk });
      yazi(c, g, x + 210, 372, m, { size: 28, renk });
      return g;
    });
    const adKat = c.S('g', {}, svg); // nicelik adları kutuların üstünde durur
    satir.forEach((s, i) => { s.adY = gizli(yazi(c, adKat, 820, SY[i], s.ad, { size: 28, renk: RENK.vurgu })); });
    const YER = [[[270, 452]], [[630, 436], [840, 436], [735, 496]]], dolu = [0, 0];
    await par(belir(c, am), belir(c, et));
    await c.say('Bir bisiklet amortisörünün etiketinde dört ölçüm yazıyor.');
    const anlat = async (i, metin, speak) => { await par(belir(c, satir[i], 300), belir(c, satir[i].adY, 300)); await c.say(metin, speak ? { speak } : {}); };
    await anlat(0, 'Birinci satır kütlesini veriyor: 100 gram.', 'Birinci satır kütlesini veriyor: yüz gram.');
    await anlat(1, 'İkinci satır hacmini veriyor: 11,8 santimetreküp.', 'İkinci satır hacmini veriyor: on bir virgül sekiz santimetreküp.');
    await anlat(2, 'Üçüncü satır yoğunluğunu veriyor: santimetreküp başına 8,47 gram.', 'Üçüncü satır yoğunluğunu veriyor: santimetreküp başına sekiz virgül kırk yedi gram.');
    await anlat(3, 'Dördüncü satırda 1.250 newton yazıyor; newton kuvvetin birimidir.', 'Dördüncü satırda bin iki yüz elli newton yazıyor; newton kuvvetin birimidir.');
    await c.say('Gram ve santimetreküp gündelik birimlerdir; nicelikler yine kütle ve hacimdir.');
    await belir(c, kutuG);
    await c.say('Dört niceliği iki kutuya ayır.', { noWait: true });
    const ipucu = { 'kütle': 'Kütle yedi temel nicelikten biridir; birimi tek başına durur.', 'hacim': 'Hacmin birimi metreküptür: üç metrenin çarpımı.',
      'yoğunluk': 'Yoğunluğun birimi kg/m³’tür; iki birimden kurulur.', 'kuvvet': 'Newton kısa bir addır; kg·m/s² demektir.' };
    for (const s of satir) {
      await c.choice({ tag: 'Sıra sende', q: `Etiketteki <b>${s.ad}</b> hangi kutuya girer?`, options: ['Temel', 'Türetilmiş'], answer: s.grup,
        hints: s.grup ? [ipucu[s.ad], ''] : ['', ipucu[s.ad]], right: ipucu[s.ad],
        onPick: (i, dogru) => {
          if (!dogru) return;
          const [x1, y1] = YER[s.grup][dolu[s.grup]++];
          isinla(c, s.adY, () => { s.adY.style.fill = s.grup ? TURET : TEMEL; s.adY.setAttribute('x', x1); s.adY.setAttribute('y', y1); });
        } });
    }
    // İkinci adım: üç birimi çöz
    await kaybol(c, ust, 400);
    const BY = [86, 170, 254];
    const coz = [['m/s', [['uzunluk', U], ['zaman', Z]], ['Uzunluk ve zaman', 'Kütle ve zaman', 'Kütle ve uzunluk'], 0, 'Metre uzunluğu, saniye zamanı gösterir.'],
      ['kg/m³', [['kütle', K], ['uzunluk', U]], ['Uzunluk ve zaman', 'Kütle ve uzunluk', 'Kütle, uzunluk ve zaman'], 1, 'Kilogram kütleyi, metre uzunluğu gösterir.'],
      ['kg·m/s²', [['kütle', K], ['uzunluk', U], ['zaman', Z]], ['Kütle ve uzunluk', 'Uzunluk ve zaman', 'Kütle, uzunluk ve zaman'], 2, 'Birimde kilogram, metre ve saniye var.']].map(([b, adlar, sec, dogru, neden], i) => {
      const g = gizli(c.S('g', {}, svg));
      g.t = yazi(c, g, 280, BY[i] + 14, b, { size: 46 });
      ok(c, g, 420, BY[i], 520, BY[i], { renk: RENK.soluk, kalin: 4, uc: 14 });
      g.cevap = gizli(zengin(c, g, 730, BY[i] + 11, adlar.map(([ad, renk]) => ts(ad, renk)).join(', '), { size: 32 }));
      return Object.assign(g, { b, sec, dogru, neden });
    });
    await belir(c, coz);
    await c.say('Şimdi üç birimin içindeki temel nicelikleri bul.', { noWait: true });
    for (const g of coz) {
      await c.choice({ tag: 'Sıra sende', q: `<b>${g.b}</b> biriminin içinde hangi temel nicelikler var?`, options: g.sec, answer: g.dogru,
        hints: g.sec.map(() => 'Birimin içindeki harflere bak: kg kütle, m uzunluk, s zaman.'), right: g.neden,
        onPick: (i, dogru) => { if (dogru) { g.t.innerHTML = renkli(g.b); sessiz(belir(c, g.cevap, 350)); } } });
    }
    await vurgula(c, kutuG[0].cerceve);
    await c.say('Dört ölçümden yalnızca kütle temel bir niceliktir.', { speak: 'Dört ölçümden [short pause] yalnızca kütle temel bir niceliktir.' });
    await vurgula(c, kutuG[1].cerceve);
    await c.say('Öteki üçü, temel niceliklerden kurulmuş türetilmiş niceliklerdir.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-a2', kicker: 'Konu A · Temel ve türetilmiş nicelikler', title: 'Temel mi, türetilmiş mi?', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Temel mi, türetilmiş mi?', hook: 'Koşu bandının ekranında süre, yol ve sürat yazıyor; bu üçünden hangisi öbür ikisinden hesaplanmıştır?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Üç ölçüm, bir fark', goal: 'Ölçülen ile hesaplanan niceliği ayır.', run: bant },
      { title: 'Birim ne söylüyor?', goal: 'Birimin içindeki birimleri oku.', run: birim },
      { title: 'İki gruba ayır', goal: 'On niceliği birimine bakarak ikiye ayır.', run: grupla },
      { title: 'Adları: temel ve türetilmiş', goal: 'İki grubun adını ve tanımını öğren.', run: adlandir },
      { title: 'Yedi temel nicelik', goal: 'SI’daki yedi temel niceliği tanı.', run: yedi },
      { title: 'Özel adlı birimler', goal: 'Kısa adlı bir birimi temel birimlerine çöz.', run: ozelAd },
      { title: 'Etikette dört ölçüm', goal: 'Bir etiketteki nicelikleri iki kutuya ayır.', run: etiket },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi temel bir niceliktir?', options: ['Sürat (m/s)', 'Sıcaklık (K)', 'Alan (m²)'], answer: 1,
        why: ['Süratin birimi metre ve saniyeden kurulur; sürat türetilmiştir.', 'Sıcaklık yedi temel nicelikten biridir; birimi kelvindir.', 'Metrekare, metre çarpı metredir; alan türetilmiştir.'], scene: 4 },
      { q: 'Kuvvetin birimi newton tek sözcüktür. Kuvvet temel bir nicelik midir?',
        options: ['Evet; birimi tek sözcük olan nicelik temeldir.', 'Hayır; newton kg·m/s² demektir, kuvvet türetilmiştir.', 'Evet; kuvvet dinamometreyle doğrudan ölçülür.'], answer: 1,
        why: ['Sözcük sayısı yanıltır; newton kısa bir addır, içinde üç birim vardır.', 'Newton; kilogram, metre ve saniyeden kurulur. Kuvvet türetilmiştir.', 'Bir aletle ölçülebilmek, niceliği temel yapmaz.'], scene: 5 },
    ],
    summary: ['<b>Temel nicelik ölçülür, türetilmiş nicelik temellerden kurulur.</b>',
      'SI’da yedi temel nicelik vardır: uzunluk, kütle, zaman, elektrik akımı, sıcaklık, ışık şiddeti, madde miktarı.',
      'Newton, joule ve pascal kısa adlardır; içlerinde kilogram, metre ve saniye vardır.'],
    nextLesson: { href: 'b1-yon-isteyen-nicelikler.html', label: 'Sonraki: Bazı nicelikler yön ister ›' },
  });
})();
