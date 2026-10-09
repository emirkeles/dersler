/* A1 · FİZ.9.2.1 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/A-temel-ve-turetilmis-nicelikler.md
   Yazar notu: içerik MEB Fizik 9 s. 53–55, 58, 59 ve 123'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Birim dönüştürme hesabı yoktur; gündelik birim ile SI birimi yalnızca eşleştirilir. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, kart, tablo, gosterge, otobus } = KIT;
  const { lerp, ease } = Ders;

  /* ---- Sahne 1 · Ölçmek karşılaştırmaktır ---- */
  async function olcmek(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const PX = 500, PY = 170, KOL = 230, AS = 150;
    cizgi(c, g, 420, 440, 580, 440, { kalin: 6 }); cizgi(c, g, PX, 440, PX, PY, { kalin: 6 });
    const kol = cizgi(c, g, 0, 0, 0, 0, { renk: RENK.yazi, kalin: 6 });
    const solG = c.S('g', {}, g), sagG = c.S('g', {}, g);
    const kefe = (p, x) => {
      yol(c, p, `M ${x} ${PY} L ${x - 70} ${PY + AS} M ${x} ${PY} L ${x + 70} ${PY + AS}`, { kalin: 2 });
      yol(c, p, `M ${x - 84} ${PY + AS} Q ${x} ${PY + AS + 34} ${x + 84} ${PY + AS}`, { renk: RENK.yazi, kalin: 4 });
    };
    kefe(solG, PX - KOL); kefe(sagG, PX + KOL);
    c.S('circle', { cx: PX, cy: PY, r: 9, fill: RENK.yazi }, g);
    const karpuz = c.S('g', {}, solG);
    c.S('ellipse', { cx: PX - KOL, cy: PY + AS - 44, rx: 60, ry: 48, fill: '#1f7a4d', stroke: RENK.r, 'stroke-width': 3 }, karpuz);
    [-30, 0, 30].forEach((dx) => yol(c, karpuz, `M ${PX - KOL + dx} ${PY + AS - 88} Q ${PX - KOL + dx * 1.5} ${PY + AS - 44} ${PX - KOL + dx} ${PY + AS}`, { renk: '#0f4a2e', kalin: 3 }));
    const egim = (dy) => {
      kol.setAttribute('x1', PX - KOL); kol.setAttribute('y1', PY + dy); kol.setAttribute('x2', PX + KOL); kol.setAttribute('y2', PY - dy);
      solG.setAttribute('transform', `translate(0 ${dy})`); sagG.setAttribute('transform', `translate(0 ${-dy})`);
    };
    egim(0); karpuz.style.opacity = 0;
    await c.say('Pazarda bir karpuz seçtin; satıcı onu teraziye koydu.', { noWait: false });
    await par(belir(c, karpuz, 300), c.tween(700, (e) => egim(lerp(0, 40, e)), ease.out));
    const kutle = (x, w, h, ad) => { const k = kart(c, sagG, x - w / 2, PY + AS - h + 6, w, h, ad, { renk: RENK.vurgu, size: 22, rx: 5 }); k.style.opacity = 0; return k; };
    const k5 = kutle(PX + KOL - 44, 62, 62, '5 kg'), k2 = kutle(PX + KOL + 16, 50, 46, '2 kg'), k1 = kutle(PX + KOL + 64, 34, 34, '1'), k1ad = yazi(c, sagG, PX + KOL + 64, PY + AS + 36, '1 kg', { size: 22, renk: RENK.vurgu });
    k1ad.style.opacity = 0;
    const adim = async (el, a, b) => { await par(belir(c, el, 300), c.tween(600, (e) => egim(lerp(a, b, e)), ease.inOut)); };
    await c.say('Öbür kefeye demir kütleler diziyor: beş, iki ve bir kilogram.', { noWait: true });
    await adim(k5, 40, 18); await adim(k2, 18, 8); await adim([k1, k1ad], 8, 0);
    await c.wait(600);
    await c.say('Kefeler dengeye gelince karpuzun kütlesi belli olur: sekiz kilogram.');
    const esit = yazi(c, svg, 500, 520, '8 kg = 8 × 1 kg', { size: 36, renk: RENK.vurgu });
    await belir(c, esit);
    await c.say('Bu sayı, karpuzun bir kilogramlık kütlenin sekiz katı olduğunu söyler.');
    await c.say('Ölçmek, bir büyüklüğü aynı cinsten bilinen bir büyüklükle karşılaştırmaktır.');
    const b = yazi(c, svg, 760, 70, 'birim: kilogram', { size: 30, renk: RENK.vurgu });
    await belir(c, b);
    await c.say('Karşılaştırdığımız o bilinen büyüklüğe birim denir.');
    const n = yazi(c, svg, 240, 70, 'nicelik: kütle', { size: 30, renk: RENK.r });
    await belir(c, n);
    await c.say('Kütle bir niceliktir; kilogram ise o niceliğin birimidir.');
    await c.choice({ tag: 'Uygula', q: 'Bir ipin uzunluğu 3 metre ölçüldü. Bu ölçümde <b>nicelik</b> hangisidir?', options: ['Metre', 'Uzunluk', '3'], answer: 1,
      hints: ['Metre birimdir; ölçülen özellik, yani nicelik uzunluktur.', '', '3 yalnızca sayıdır; ipin metrenin kaç katı olduğunu söyler.'],
      right: 'Evet. Ölçülen özellik uzunluktur.' });
    await c.say('Uzunluk niceliktir; metre, onu ölçerken kullandığımız birimdir.');
    await c.say('Her ölçüm iki parçadan oluşur: bir sayı ve bir birim.', { speak: 'Her ölçüm iki parçadan oluşur: [short pause] bir sayı ve bir birim.' });
  }

  /* ---- Sahne 2 · Herkes kendi birimini kullanırsa ---- */
  async function bardak(c) {
    const svg = c.svg(1000, 562);
    const tarif = kart(c, svg, 60, 60, 300, 130, ['Kek tarifi', '1 bardak un'], { renk: RENK.vurgu, size: 30 });
    const miktar = tarif.querySelectorAll('text')[1];
    const bar = (x, w, h, ad) => {
      const g = c.S('g', {}, svg), y = 300;
      yol(c, g, `M ${x - w / 2} ${y - h} L ${x - w * 0.38} ${y} L ${x + w * 0.38} ${y} L ${x + w / 2} ${y - h}`, { renk: RENK.yazi, kalin: 4 });
      c.S('path', { d: `M ${x - w * 0.47} ${y - h * 0.75} L ${x - w * 0.38} ${y - 2} L ${x + w * 0.38} ${y - 2} L ${x + w * 0.47} ${y - h * 0.75} Z`, fill: '#e8e2d0', opacity: 0.85 }, g);
      yazi(c, g, x, y + 34, ad, { size: 24, renk: RENK.soluk });
      return g;
    };
    const kek = (x, w, h) => { const g = c.S('g', {}, svg); const r = kutu(c, g, x - w / 2, 500 - h, w, h, { renk: RENK.b, fill: '#7a4a22', rx: 14 }); g.kutu = r; return g; };
    const b1 = bar(520, 130, 150, 'tarifi yazanın bardağı'), b2 = bar(800, 84, 100, 'senin bardağın');
    b1.style.opacity = 0; b2.style.opacity = 0;
    await belir(c, tarif);
    await c.say('Bir kek tarifinde “bir bardak un” yazıyor.');
    await par(belir(c, b1), belir(c, b2));
    await c.say('Tarifi yazanın bardağı büyük, seninki küçük olabilir.');
    const k1 = kek(520, 200, 96), k2 = kek(800, 130, 62);
    k1.style.opacity = 0; k2.style.opacity = 0;
    await par(belir(c, k1), belir(c, k2));
    await c.say('Aynı tarif, iki mutfakta farklı miktarda un demek olur.');
    await c.say('Birim herkes için aynı değilse ölçüm karışıklık yaratır.', { speak: '[thoughtful] Birim herkes için aynı değilse ölçüm karışıklık yaratır.' });
    await c.say('İnsanlar yaşadıkları yere ve döneme göre farklı birimler kullanmıştır.');
    await c.say('Ticaret gelişip bilim yayıldıkça ortak birimlere ihtiyaç doğmuştur.');
    await c.choice({ tag: 'Uygula', q: 'Tarifte “bir bardak un” yerine ne yazsaydı herkes aynı miktarı koyardı?', options: ['Bir büyük bardak un', '250 gram un', 'Bir avuç un'], answer: 1,
      hints: ['“Büyük” de kişiden kişiye değişir; birim yine ortak değil.', '', 'Avuç da herkes için aynı büyüklükte değildir.'],
      right: 'Evet. Gram herkes için aynıdır.' });
    miktar.textContent = '250 g un';
    await c.tween(700, (e) => {
      const w = lerp(130, 200, e), h = lerp(62, 96, e);
      k2.kutu.setAttribute('x', 800 - w / 2); k2.kutu.setAttribute('y', 500 - h); k2.kutu.setAttribute('width', w); k2.kutu.setAttribute('height', h);
    }, ease.inOut);
    await c.say('Gram herkes için aynı büyüklüktedir; böyle birimlere standart birim denir.');
    await c.say('Standart birimle yapılan ölçümü her yerde herkes aynı anlar.');
  }

  /* ---- Sahne 3 · SI: ortak birim sistemi ---- */
  async function si(c) {
    const svg = c.svg(1000, 562);
    const baslik = yazi(c, svg, 500, 130, 'SI', { size: 110, renk: RENK.vurgu, kalin: 700 });
    const alt = yazi(c, svg, 500, 190, 'Uluslararası Birimler Sistemi', { size: 32 });
    const yil = yazi(c, svg, 860, 70, '1960, Paris', { size: 26, renk: RENK.soluk });
    [alt, yil].forEach((e) => { e.style.opacity = 0; });
    const t = tablo(c, svg, { x: 200, y: 240, basliksiz: true, satir: 68, size: 34, sutunlar: [{ w: 220 }, { w: 220 }, { w: 160 }] });
    const satirlar = [['uzunluk', 'metre', 'm'], ['kütle', 'kilogram', 'kg'], ['zaman', 'saniye', 's']].map((s) => { const r = t.satir([s[0], s[1], null], { renkler: [RENK.r, RENK.yazi] }); r.style.opacity = 0; return r; });
    const semboller = ['m', 'kg', 's'].map((s, i) => { const [x, y] = t.hucre(i, 2); const e = yazi(c, svg, x, y, s, { size: 34, renk: RENK.vurgu }); e.style.opacity = 0; return e; });
    await belir(c, baslik);
    await c.say('Dünyada birçok birim sistemi vardır.');
    await belir(c, alt);
    await c.say('En çok kullanılanlardan biri Uluslararası Birimler Sistemi’dir.');
    await c.say('Kısa adı SI’dır; Türkiye’de de bu sistem kullanılır.', { speak: 'Kısa adı se i dir; Türkiye’de de bu sistem kullanılır.' });
    await belir(c, yil);
    await c.say('SI, 1960 yılında Paris’te toplanan bir konferansta tanımlandı.', { speak: 'Se i, bin dokuz yüz altmış yılında Paris’te toplanan bir konferansta tanımlandı.' });
    for (const r of satirlar) await belir(c, r, 300);
    await c.say('SI’da uzunluk metre, kütle kilogram, zaman saniye ile ölçülür.', { speak: 'Se i sisteminde uzunluk metre, kütle kilogram, zaman saniye ile ölçülür.' });
    await belir(c, semboller);
    await c.say('Her birimin bir de sembolü vardır: m, kg ve s.', { speak: 'Her birimin bir de sembolü vardır: me, ka ge ve se.' });
    await c.say('SI’nın kabul edilmesi, ülkeler arasındaki iletişimi kolaylaştırdı.', { speak: 'Se i sisteminin kabul edilmesi, ülkeler arasındaki iletişimi kolaylaştırdı.' });
  }

  /* ---- Sahne 4 · Bildiğin nicelikler, SI birimleri ---- */
  async function nicelikler(c) {
    const svg = c.svg(1000, 562);
    const sut = [{ ad: 'Nicelik', w: 280 }, { ad: 'SI birimi', w: 360 }, { ad: 'Sembol', w: 160 }];
    const t1 = tablo(c, svg, { x: 100, y: 40, satir: 56, size: 28, sutunlar: sut });
    const ekle = async (t, h) => { const r = t.satir(h, { renkler: [RENK.r, RENK.yazi, RENK.vurgu] }); r.style.opacity = 0; await belir(c, r, 300); return r; };
    await c.say('Pek çok niceliği zaten tanıyorsun: uzunluk, kütle, zaman, sıcaklık.');
    await ekle(t1, ['uzunluk', 'metre', 'm']); await ekle(t1, ['kütle', 'kilogram', 'kg']); await ekle(t1, ['zaman', 'saniye', 's']);
    await c.say('SI’da uzunluğun birimi metre, kütlenin kilogram, zamanın saniyedir.', { speak: 'Se i sisteminde uzunluğun birimi metre, kütlenin kilogram, zamanın saniyedir.' });
    await ekle(t1, ['sıcaklık', 'kelvin', 'K']);
    await c.say('Sıcaklığın SI birimi kelvindir; sembolü büyük K harfidir.', { speak: 'Sıcaklığın se i birimi kelvindir; sembolü büyük ke harfidir.' });
    await kaybol(c, t1.g, 350);
    const t2 = tablo(c, svg, { x: 100, y: 40, satir: 56, size: 28, sutunlar: sut });
    await c.say('Bazı birimler başka birimlerden kurulur.');
    await ekle(t2, ['alan', 'metrekare', 'm²']); await ekle(t2, ['hacim', 'metreküp', 'm³']);
    await c.say('Alanın birimi metrekare, hacmin birimi metreküptür.');
    await ekle(t2, ['sürat, hız', 'metre/saniye', 'm/s']);
    await c.say('Sürat ve hızın birimi aynıdır: metre bölü saniye.');
    await ekle(t2, ['yoğunluk', 'kilogram/metreküp', 'kg/m³']);
    await c.say('Yoğunluğun birimi kilogram bölü metreküptür.');
    await ekle(t2, ['kuvvet', 'newton', 'N']);
    await c.say('Kuvvetin biriminin özel bir adı vardır: newton, sembolü N.', { speak: 'Kuvvetin biriminin özel bir adı vardır: newton, sembolü ne.' });
    await kaybol(c, t2.g, 350);

    // Dene: dokuz nicelik, her biri için üç seçenek. Doğru cevapla satır tabloya düşer.
    const t3 = tablo(c, svg, { x: 60, y: 20, basliksiz: true, satir: 52, size: 26, sutunlar: [{ w: 300 }, { w: 140 }, { w: 300 }, { w: 140 }] });
    const sorular = [['Uzunluk', 'm', ['m', 's', 'kg']], ['Kütle', 'kg', ['N', 'kg', 'K']], ['Zaman', 's', ['m/s', 'm', 's']], ['Sıcaklık', 'K', ['K', 'kg', 'N']],
      ['Alan', 'm²', ['m', 'm³', 'm²']], ['Hacim', 'm³', ['m³', 'm²', 'kg/m³']], ['Sürat', 'm/s', ['m', 'm/s', 's']], ['Yoğunluk', 'kg/m³', ['kg', 'm³', 'kg/m³']], ['Kuvvet', 'N', ['kg', 'N', 'K']]];
    await c.say('Dokuz niceliği SI birimiyle eşleştir.', { noWait: true });
    let n = 0;
    for (const [ad, birim, sec] of sorular) {
      const bekleyen = yazi(c, svg, 500, 520, ad + '  →  ?', { size: 30, renk: RENK.vurgu });
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> niceliğinin SI birimi hangisidir?`, options: sec, answer: sec.indexOf(birim),
        hints: sec.map(() => 'Bu birim başka bir niceliğe ait. Niceliğin neyi ölçtüğünü düşün.'), right: `${ad}: ${birim}.`,
        onPick: (i, dogru) => {
          if (!dogru) return;
          bekleyen.remove();
          const r = Math.floor(n / 2), k = (n % 2) * 2, [x1, y1] = t3.hucre(r, k), [x2] = t3.hucre(r, k + 1);
          belir(c, [yazi(c, svg, x1, y1, ad, { size: 26, renk: RENK.r }), yazi(c, svg, x2, y1, birim, { size: 26, renk: RENK.vurgu })], 300); n++;
        } });
    }
    await c.say('Her niceliğin SI’da bir birimi vardır.', { speak: 'Her niceliğin se i sisteminde bir birimi vardır.' });
    c.note('<b>Her niceliğin SI’da bir birimi vardır.</b><br>uzunluk → metre (m)', 'SI birimi', 'si');
  }

  /* ---- Sahne 5 · Gündelik birim, SI birimi ---- */
  async function duyuru(c) {
    const svg = c.svg(1000, 562);
    const oto = otobus(c, svg, 500, 130, { s: 1.3 }); oto.style.opacity = 0;
    yazi(c, oto, 500, 30, 'Sivas → Çanakkale', { size: 24, renk: RENK.soluk });
    const veriler = [['1.100 km', 'uzunluk', 'metre'], ['16 saat', 'zaman', 'saniye'], ['100 km/h', 'sürat', 'm/s'], ['15 m', 'uzunluk', 'metre'], ['21 °C', 'sıcaklık', 'kelvin']];
    const kartlar = veriler.map(([v], i) => { const k = kart(c, svg, 40 + i * 188, 190, 170, 80, v, { renk: RENK.vurgu, size: 30 }); k.style.opacity = 0; return k; });
    const alt = (i) => {
      const g = c.S('g', {}, svg), x = 125 + i * 188;
      yazi(c, g, x, 320, veriler[i][1], { size: 26, renk: RENK.r }); yazi(c, g, x, 362, 'SI: ' + veriler[i][2], { size: 24 });
      g.style.opacity = 0; return g;
    };
    await belir(c, oto);
    await c.say('Bir okul gezisi başlıyor; otobüs Sivas’tan Çanakkale’ye gidecek.');
    await belir(c, kartlar[0]);
    await c.say('Şoför duyuru yapıyor: yol yaklaşık 1.100 kilometre.', { speak: 'Şoför duyuru yapıyor: yol yaklaşık bin yüz kilometre.' });
    await belir(c, kartlar[1]);
    await c.say('Yolculuk yaklaşık 16 saat sürecek.', { speak: 'Yolculuk yaklaşık on altı saat sürecek.' });
    await belir(c, kartlar[2]);
    await c.say('Otoyolda sürat sınırı 100 km/h.', { speak: 'Otoyolda sürat sınırı yüz kilometre bölü saat.' });
    await par(belir(c, kartlar[3]), belir(c, kartlar[4]));
    await c.say('Çanakkale’nin rakımı 15 metre, beklenen hava sıcaklığı 21 °C.', { speak: 'Çanakkale’nin rakımı on beş metre, beklenen hava sıcaklığı yirmi bir derece selsiyus.' });
    await c.say('Duyuruda beş ölçüm var; her biri bir niceliği anlatıyor.');
    const a0 = alt(0), a1 = alt(1), a3 = alt(3);
    await belir(c, [a0, a1, a3]);
    await c.say('1.100 kilometre ve 15 metre uzunluk, 16 saat zaman ölçümüdür.', { speak: 'Bin yüz kilometre ve on beş metre uzunluk, on altı saat zaman ölçümüdür.' });
    await c.say('Kilometre ve saat gündelik hayatta kullanışlıdır ama SI birimi değildir.', { speak: '[thoughtful] Kilometre ve saat gündelik hayatta kullanışlıdır ama se i birimi değildir.' });
    await c.say('Uzunluğun SI birimi metre, zamanın SI birimi saniyedir.', { speak: 'Uzunluğun se i birimi metre, zamanın se i birimi saniyedir.' });
    await c.choice({ tag: 'Uygula', q: '“Sürat sınırı 100 km/h” ölçümündeki niceliğin <b>SI birimi</b> hangisidir?', options: ['km/h', 'm/s', 'm'], answer: 1,
      hints: ['Gündelik bir birimdir; kilometre de saat de SI birimi değildir.', '', 'Metre uzunluğun birimidir; buradaki nicelik sürattir.'],
      right: 'Evet. Süratin SI birimi metre bölü saniyedir.' });
    await kaybol(c, [a0, a1, a3]);
    const a2 = alt(2), a4 = alt(4);
    await belir(c, a2);
    await c.say('Nicelik sürattir; SI birimi metre bölü saniyedir.', { speak: 'Nicelik sürattir; se i birimi metre bölü saniyedir.' });
    await belir(c, a4);
    await c.say('Derece Celsius da gündelik bir birimdir; sıcaklığın SI birimi kelvindir.', { speak: 'Derece selsiyus da gündelik bir birimdir; sıcaklığın se i birimi kelvindir.' });
    await kaybol(c, [a2, a4, kartlar[0], kartlar[1], kartlar[3]]);
    const son = yazi(c, svg, 500, 470, 'litre → metreküp     gram → kilogram', { size: 30, renk: RENK.vurgu });
    await belir(c, son);
    await c.say('Litre ve gram da öyledir: SI’da hacim metreküp, kütle kilogramdır.', { speak: 'Litre ve gram da öyledir: [short pause] se i sisteminde hacim metreküp, kütle kilogramdır.' });
  }

  /* ---- Sahne 6 · Her niceliğin bir ölçüm aleti ---- */
  const alet = {
    cetvel(c, g, x, y) { kutu(c, g, x - 60, y - 14, 120, 28, { renk: RENK.vurgu, rx: 3 }); for (let k = 0; k <= 8; k++) cizgi(c, g, x - 52 + k * 13, y - 14, x - 52 + k * 13, y - (k % 2 ? 6 : 0), { renk: RENK.vurgu, kalin: 2 }); },
    kronometre(c, g, x, y) { daire(c, g, x, y + 4, 34, { renk: RENK.vurgu }); kutu(c, g, x - 8, y - 44, 16, 12, { renk: RENK.vurgu, rx: 2 }); cizgi(c, g, x, y + 4, x + 14, y - 14, { renk: RENK.vurgu }); },
    termometre(c, g, x, y) { kutu(c, g, x - 8, y - 44, 16, 66, { renk: RENK.b, rx: 8 }); c.S('circle', { cx: x, cy: y + 28, r: 15, fill: RENK.b }, g); cizgi(c, g, x, y + 20, x, y - 14, { renk: RENK.b, kalin: 6 }); },
    terazi(c, g, x, y) { cizgi(c, g, x, y + 36, x, y - 30, { renk: RENK.a }); cizgi(c, g, x - 46, y - 30, x + 46, y - 30, { renk: RENK.a }); [-46, 46].forEach((d) => yol(c, g, `M ${x + d - 18} ${y} Q ${x + d} ${y + 16} ${x + d + 18} ${y} M ${x + d} ${y - 30} L ${x + d - 18} ${y} M ${x + d} ${y - 30} L ${x + d + 18} ${y}`, { renk: RENK.a, kalin: 2 })); cizgi(c, g, x - 24, y + 36, x + 24, y + 36, { renk: RENK.a }); },
    dinamometre(c, g, x, y) { kutu(c, g, x - 13, y - 44, 26, 60, { renk: RENK.r, rx: 5 }); yol(c, g, `M ${x} ${y - 36} l 8 6 l -16 6 l 16 6 l -16 6 l 16 6 l -8 6 L ${x} ${y + 26} q 10 4 0 14`, { renk: RENK.r, kalin: 2 }); },
    silindir(c, g, x, y) { yol(c, g, `M ${x - 16} ${y - 44} L ${x - 16} ${y + 36} L ${x + 16} ${y + 36} L ${x + 16} ${y - 44}`, { renk: RENK.turkuaz }); c.S('rect', { x: x - 14, y: y - 6, width: 28, height: 40, fill: RENK.turkuaz, opacity: 0.5 }, g); cizgi(c, g, x - 26, y + 36, x + 26, y + 36, { renk: RENK.turkuaz }); for (let k = 0; k < 4; k++) cizgi(c, g, x + 4, y - 30 + k * 16, x + 16, y - 30 + k * 16, { renk: RENK.turkuaz, kalin: 2 }); },
    gosterge(c, g, x, y) { gosterge(c, g, x, y, 40, { sayisiz: true, deger: 90, birim: ' ' }); },
  };
  async function aletler(c) {
    const svg = c.svg(1000, 562);
    const liste = [['cetvel', 'cetvel', 'uzunluk'], ['kronometre', 'kronometre', 'zaman'], ['termometre', 'termometre', 'sıcaklık'], ['terazi', 'terazi', 'kütle'],
      ['dinamometre', 'dinamometre', 'kuvvet'], ['silindir', 'dereceli silindir', 'hacim'], ['gosterge', 'sürat göstergesi', 'sürat']];
    const yer = (i) => (i < 4 ? [140 + i * 240, 130] : [260 + (i - 4) * 240, 370]);
    const gs = liste.map(([cizim, ad, nicelik], i) => {
      const g = c.S('g', {}, svg), [x, y] = yer(i);
      alet[cizim](c, g, x, y); yazi(c, g, x, y + 76, ad, { size: 24 }); yazi(c, g, x, y + 108, nicelik, { size: 24, renk: RENK.r });
      g.style.opacity = 0; return g;
    });
    await c.say('Her nicelik kendine uygun bir aletle ölçülür.');
    await belir(c, gs[0]);
    await c.say('Uzunluk cetvelle ya da şerit metreyle ölçülür.');
    await par(belir(c, gs[1]), belir(c, gs[2]));
    await c.say('Zaman kronometreyle, sıcaklık termometreyle ölçülür.');
    await sol(c, gs.slice(0, 3), 0.3);
    await belir(c, gs[3]);
    await c.say('Terazi kütleyi ölçer; sonucu kilogramla yazarız.');
    await belir(c, gs[4]);
    await c.say('Dinamometre kuvveti ölçer; sonucu newtonla yazarız.');
    await belir(c, gs[5]);
    await c.say('Dereceli silindir bir sıvının hacmini ölçer.');
    await belir(c, gs[6]);
    await c.say('Arabadaki sürat göstergesi aracın süratini gösterir.');
    const eslesme = [['Terazi', ['kütle, kg', 'kuvvet, N', 'hacim, m³'], 0, 'Terazi kütleyi ölçer; SI birimi kilogramdır.'],
      ['Dinamometre', ['kütle, kg', 'kuvvet, N', 'hacim, m³'], 1, 'Dinamometre kuvveti ölçer; birimi newtondur.'],
      ['Dereceli silindir', ['kütle, kg', 'kuvvet, N', 'hacim, m³'], 2, 'Dereceli silindir hacmi ölçer; SI birimi metreküptür.']];
    for (const [ad, sec, dogru, neden] of eslesme) {
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}</b> hangi niceliği ölçer, SI birimi nedir?`, options: sec, answer: dogru,
        hints: sec.map(() => 'Aletin neyi ölçtüğünü tahtadan bul.'), right: neden });
    }
    await c.choice({ tag: 'Düşün', q: 'Bir çantayı önce teraziye koydun, sonra dinamometreye astın. İki alet aynı niceliği mi ölçtü?',
      options: ['Evet; ikisi de kütleyi ölçtü.', 'Evet; ikisi de kuvveti ölçtü.', 'Hayır; terazi kütleyi, dinamometre kuvveti ölçtü.'], answer: 2,
      hints: ['Dinamometre kütleyi değil kuvveti ölçer; birimi newtondur.', 'Terazi kuvveti değil kütleyi ölçer; birimi kilogramdır.', ''],
      right: 'Evet. İki ayrı nicelik, iki ayrı birim.' });
    await c.say('Kütle ile kuvvet ayrı niceliklerdir; aletleri de birimleri de ayrıdır.', { speak: '[thoughtful] Kütle ile kuvvet ayrı niceliklerdir; aletleri de birimleri de ayrıdır.' });
    await c.say('Bir ölçümü okurken üç şeye bak: nicelik, sayı ve birim.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-a1', kicker: 'Konu A · Temel ve türetilmiş nicelikler', title: 'Her niceliğin bir SI birimi var', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Her niceliğin bir SI birimi var', hook: 'Tarifte “bir bardak un” yazıyor; senin bardağınla tarifi yazanın bardağı aynı mı?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Ölçmek karşılaştırmaktır', goal: 'Niceliği ve birimi birbirinden ayır.', run: olcmek },
      { title: 'Herkes kendi birimini kullanırsa', goal: 'Ortak birimin neden gerektiğini gör.', run: bardak },
      { title: 'SI: ortak birim sistemi', goal: 'SI’yı ve üç birimini tanı.', run: si },
      { title: 'Bildiğin nicelikler, SI birimleri', goal: 'Dokuz niceliği SI birimiyle eşleştir.', run: nicelikler },
      { title: 'Gündelik birim, SI birimi', goal: 'Bir duyurudaki nicelikleri ve SI birimlerini bul.', run: duyuru },
      { title: 'Her niceliğin bir ölçüm aleti', goal: 'Aleti, ölçtüğü nicelikle eşleştir.', run: aletler },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Şoför “Yolculuğumuz yaklaşık 16 saat sürecek.” dedi. Bu ölçümdeki nicelik ve o niceliğin SI birimi hangisidir?',
        options: ['Zaman, saat', 'Zaman, saniye', 'Sürat, m/s'], answer: 1,
        why: ['Nicelik doğru; ama saat gündelik bir birimdir, SI birimi değildir.', 'Nicelik zamandır; zamanın SI birimi saniyedir.', '16 saat bir süreyi söyler; sürat değil, zaman ölçümüdür.'], scene: 4 },
      { q: 'Hangisi bir nicelik değil, bir birimdir?', options: ['Kütle', 'Sıcaklık', 'Kilogram'], answer: 2,
        why: ['Kütle ölçülen bir niceliktir.', 'Sıcaklık ölçülen bir niceliktir.', 'Kilogram, kütleyi ölçerken kullandığımız birimdir.'], scene: 0 },
      { q: 'Bir satıcı halının boyunu “altı adım” diye söyledi. Alıcı evde kendi adımıyla ölçünce halı odaya sığmadı. Sorun nedir?',
        options: ['Adım kişiden kişiye değişir; birim ortak değildir.', 'Satıcı uzunluğu değil, alanı ölçmeliydi.', 'Altı küçük bir sayıdır; ölçüm büyük sayıyla yapılmalıydı.'], answer: 0,
        why: ['Evet. Adım standart bir birim değildir; herkes aynı uzunluğu anlamaz.', 'Nicelik doğru seçilmiş: halının boyu bir uzunluktur. Sorun birimdedir.', 'Sayının büyüklüğü sorun değildir; birim herkes için aynı olmalıdır.'], scene: 1 },
      { q: 'Deniz: “Termometrem derece Celsius gösteriyor; demek ki sıcaklığın SI birimi °C’dir.” Doğru karşılık hangisidir?',
        options: ['Haklı; aletin gösterdiği birim SI birimidir.', 'Haksız; sıcaklık bir nicelik değildir, birimi olmaz.', 'Haksız; °C gündelik birimdir, SI birimi kelvindir.'], answer: 2,
        why: ['Aletler gündelik birim de gösterebilir; SI birimi alete göre belirlenmez.', 'Sıcaklık ölçülen bir niceliktir; her niceliğin SI’da bir birimi vardır.', 'Evet. Derece Celsius gündelik bir birimdir; sıcaklığın SI birimi kelvindir.'], scene: 4 },
    ],
    summary: ['<b>Ölçmek, bir büyüklüğü aynı cinsten bilinen bir büyüklükle karşılaştırmaktır.</b>', 'Her niceliğin SI’da bir birimi vardır: uzunluk metre, kütle kilogram, zaman saniye.', 'Kilometre, saat, litre, gram ve °C gündelik birimlerdir; SI birimi değildir.'],
    nextLesson: { href: 'a2-temel-ve-turetilmis.html', label: 'Sonraki: Temel mi, türetilmiş mi? ›' },
  });
})();
