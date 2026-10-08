/* I2 — Buhar basıncını ne etkiler: değişkeni tek tek sına
   Bir faktörün etkisi, ötekileri sabit tutup yalnızca onu değiştirerek bulunur; sıvının cinsi ve sıcaklık etkiler; sıvı miktarı,
   kabın biçimi ve kabın hacmi etkilemez; etki moleküller arası çekimle açıklanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/I-buhar-basinci.md ("I2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Benzetimde gösterilen her sayı kitaptaki değerdir: su 25 °C 23,8 · su 40 °C 55,3 · benzen 25 °C 95,3 · benzen 40 °C 183 mmHg;
   etil alkol 5,85 · su 2,33 · dietil eter 58,96 kPa (20 °C). Kaydırıcı yalnızca bu değerlerin bulunduğu konumlarda durur. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, isaret } = window.KIT;
  const { GRI, DEGER, OLCU, virgul, sb, dizi, dolas, kapliU, cekim, sorukarti, degiskenler, deneyTablosu, cubuklar, kureModeli } = window.KIT_I;
  const { ease } = Ders;

  /* Buhar molekülü yoğunluğu (şematik): basınç büyüdükçe artar. */
  const YOG = { 'su-25': 3.5, 'su-40': 5.5, 'benzen-25': 8, 'benzen-40': 11 };
  /* Etiketli iki parçalı satır: soluk ad + değer. */
  const etiketSatiri = (c, p, x, y, ad, deger, o = {}) => {
    const t = yazi(c, p, x, y, '', Object.assign({ size: 26, kalin: 600 }, o));
    c.S('tspan', { text: ad + ': ', style: 'fill:' + RENK.soluk }, t);
    t.deger = c.S('tspan', { text: deger, style: 'fill:' + (o.renkDeger || RENK.yazi) }, t);
    return t;
  };
  const yeniden = (c, t, parcalar, dx = 10) => {
    t.textContent = '';
    parcalar.forEach((q, i) => { const [m, r] = Array.isArray(q) ? q : [q, null]; const ts = c.S('tspan', { text: m, dx: i ? dx : 0 }, t); if (r) ts.style.fill = r; });
  };

  /* ---- deney durumu: kaydırıcılar ve tablo satırı ---- */
  const REF = { sivi: 'su', sic: 25, miktar: 1, bicim: 'standart', hacim: 'kucuk' };
  const DEG = [['sivi', 'sıvının cinsi'], ['sic', 'sıcaklık'], ['miktar', 'sıvı miktarı'], ['bicim', 'kabın biçimi'], ['hacim', 'kabın hacmi']];
  const degisen = (a, b) => DEG.filter(([k]) => a[k] !== b[k]).map(([, ad]) => ad);
  const basinc = (s) => DEGER[`${s.sivi}-${s.sic}`];
  const kapMetni = (s) => (s.bicim === 'genis' ? (s.hacim === 'buyuk' ? 'geniş büyük' : 'geniş') : (s.hacim === 'buyuk' ? 'büyük' : 'standart'));
  const satir = (s) => ({ sivi: s.sivi === 'su' ? 'su' : 'benzen', sic: s.sic, miktar: s.miktar === 2 ? '2V' : 'V', kap: kapMetni(s), p: basinc(s), d: Object.assign({}, s) });
  const ayni = (a, b) => DEG.every(([k]) => a[k] === b[k]);

  /* Kaydırıcılı deneme: kaydırıcıyı oyna, "Tabloya yaz" ile satır ekle, "Devam" ile sürdür.
     o: { U, tablo, S (durum), tanim: [{ k, etiket, fmt, deger: (0|1) → durum değeri }], gerekli: [yama], etiket (çerçeve yazısı) }
     Devam'a basıldığında tabloda bulunmayan gerekli deneme olursa tahta onu kendisi yapar. */
  async function dene(c, o) {
    const { U, tablo, S, tanim } = o;
    const guncelle = () => {
      const p = basinc(S);
      U.git({ sivi: S.sivi, miktar: S.miktar, bicim: S.bicim, hacim: S.hacim, mmHg: p, yog: YOG[`${S.sivi}-${S.sic}`] }, 450);
      U.okunan(p);
      if (o.baslik) { const d = degisen(REF, S); yeniden(c, o.baslik, ['Bağımsız:', d.length === 1 ? d[0] : d.length ? 'birden çok' : '?'], 8); }
    };
    const sl = tanim.map((t, i) => c.slider({
      tag: i === 0 ? 'Dene' : false, label: t.etiket, min: 0, max: 1, step: 1, value: 0, fmt: (v) => t.fmt[v],
      onInput: (v) => { S[t.k] = t.deger[v]; guncelle(); },
    }));
    const nb = c.h('div'); c.panel(null, nb);
    const not = (tur, html) => { nb.className = 'fb ' + tur; nb.innerHTML = html; };
    const uygula = (yama) => tanim.forEach((t, i) => sl[i].set(Math.max(0, t.deger.indexOf((yama[t.k] != null ? yama[t.k] : REF[t.k])))));
    const ekle = async () => {
      const r = satir(S);
      if (tablo.satirlar.some((q) => ayni(q.d, r.d))) { not('info', 'Bu satır tabloda var. Önce kaydırıcıyı oynat.'); return false; }
      await tablo.satirEkle(r);
      const d = degisen(REF, S);
      if (d.length === 1) not('ok', `Tek değişken değişti: ${d[0]}.`);
      else if (d.length > 1) not('no', 'Birden çok değişken değişti: etkiyi ayıramazsın.');
      return true;
    };
    let devam = null;
    for (;;) {
      const yaz = c.cont('Tabloya yaz ›').then(() => 'y');
      const sonuc = await Promise.race(devam ? [yaz, devam.then(() => 'd')] : [yaz]);
      if (sonuc === 'd') break;
      if (!devam) devam = c.cont('Devam ›');
      await ekle();
    }
    // Eksik kalan gerekli denemeleri tahta kendisi yapar.
    let eksik = 0;
    for (const y of o.gerekli) {
      const hedef = Object.assign({}, REF, y);
      if (tablo.satirlar.some((q) => ayni(q.d, hedef))) continue;
      if (!eksik) { c.clearAct(); }
      eksik++;
      uygula(y); await c.wait(600); await ekle(); await c.wait(300);
    }
    c.clearAct();
    return eksik;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.3, x: 150, y: 470, kapak: 1, mmHg: 23.8, yog: 3.5, sev: 0.93 });
    d.ekle(U);
    const g2 = c.S('g', {}, svg);
    kureModeli(c, g2, 'CH4', 330, 235, 1.7); kureModeli(c, g2, 'CH4', 670, 235, 1.7);
    [215, 235, 255].forEach((y) => cizgi(c, g2, [450, y], [550, y], RENK.cekme, 3, { 'stroke-dasharray': '3 8' }));
    yazi(c, g2, 500, 420, 'apolar moleküller', { size: 32, kalin: 700 });
    gizle(U.kok, g2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, U.kok, 600));
    await c.choice({
      tag: 'Hatırla', q: 'Kapalı kaptaki U borusunda cıva seviyeleri farkı neyi gösterir?',
      options: ['Sıvının sıcaklığını', 'Buhar basıncını', 'Sıvının miktarını'], answer: 1,
      hints: ['Buhar molekülleri çeperlere çarpıp cıvayı iter; fark buhar basıncını gösterir.', '', 'Buhar molekülleri çeperlere çarpıp cıvayı iter; fark buhar basıncını gösterir.'],
      right: 'Evet. Fark, buharın çeperlere uyguladığı basıncı gösterir.',
    });
    c.clearSay();
    await belir(c, U.kok, 400, 0);
    await belir(c, g2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Apolar moleküller arasında hangi etkileşim bulunur?',
      options: ['Hidrojen bağı', 'İyon-dipol', 'London kuvveti'], answer: 2,
      hints: ['Hidrojen bağı için H atomu F, O ya da N’ye bağlı olmalı; apolar moleküllerde yok.', 'İyon-dipol, iyon ile polar molekül arasındadır; apolar moleküllerde iyon yok.', ''],
      right: 'Evet. Apolar moleküllerde indüklenmiş dipoller arasındaki London kuvveti etkir.',
    });
    c.clearSay();
    await belir(c, g2, 400, 0);
    await c.say('Bugün bu basıncı neyin değiştirdiğini sınayacağız.');
  }

  /* ---- 2. Sıvının cinsi: iki sıvı, bir ölçüm ---- */
  async function cins(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const A = kapliU(c, svg, { k: 0.8, x: 24, y: 460, sivi: 'su', kapak: 1 });
    const B = kapliU(c, svg, { k: 0.8, x: 510, y: 460, sivi: 'benzen', kapak: 1, tohum: 5 });
    d.ekle(A); d.ekle(B);
    const ust = c.S('g', {}, svg);
    sb(c, ust, 410, 130, '25', '°C', { size: 38, kalin: 700, brenk: RENK.yazi });
    sb(c, ust, 590, 130, '1', 'atm', { size: 38, kalin: 700, brenk: RENK.yazi });
    const ad = c.S('g', {}, svg);
    yazi(c, ad, A.X(75), 520, 'su', { size: 32, kalin: 700 }); yazi(c, ad, B.X(75), 520, 'benzen', { size: 32, kalin: 700 });
    gizle(A.kok, B.kok, ust, ad);

    await par(c.say('Bir araştırmacı su ve benzeni kapalı kaplarda 25 °C’ta dengeye getirdi.', { speak: 'Bir araştırmacı su ve benzeni kapalı kaplarda yirmi beş derecede dengeye getirdi.' }),
      belir(c, [A.kok, B.kok, ust, ad], 600));
    await par(c.say('Suyun denge buhar basıncı 23,8 mmHg çıktı.', { speak: 'Suyun denge buhar basıncı yirmi üç virgül sekiz milimetre cıva çıktı.' }), A.git({ mmHg: DEGER['su-25'], yog: YOG['su-25'] }, 1600).then(() => A.okunan(DEGER['su-25'])));
    await par(c.say('Benzeninki 95,3 mmHg çıktı.', { speak: 'Benzeninki doksan beş virgül üç milimetre cıva çıktı.' }), B.git({ mmHg: DEGER['benzen-25'], yog: YOG['benzen-25'] }, 1900).then(() => B.okunan(DEGER['benzen-25'])));
    await c.say('Dış basınç, sıcaklık ve kaplar aynıydı.');
    await c.say('Yalnızca sıvı farklıydı.');
    await c.choice({
      tag: 'Sıra sende', q: 'Bu veriden hangi neden-sonuç cümlesi çıkar?',
      options: ['Buhar basıncı değişince sıvının cinsi değişti', 'Sıcaklık değişince buhar basıncı değişti', 'Sıvının cinsi değişince buhar basıncı değişti'], answer: 2,
      hints: ['Sıvıyı biz seçtik; basıncı ölçtük. Neden sıvıdır.', 'Sıcaklık iki kapta da aynıydı.', ''],
      right: 'Evet. Sıvıyı değiştirdik, basıncı ölçtük.',
    });
    // Gör: neden ve sonuç kartları.
    c.clearSay();
    await belir(c, [A.kok, B.kok, ust, ad, A.oku, B.oku], 450, 0);
    const k = c.S('g', {}, svg);
    kutu(c, k, 60, 190, 380, 150, { rx: 16 }); kutu(c, k, 560, 190, 380, 150, { rx: 16 });
    etiketSatiri(c, k, 250, 245, 'neden', '', { size: 28 });
    yazi(c, k, 250, 295, 'sıvının cinsi değişti', { size: 30, kalin: 700 });
    etiketSatiri(c, k, 750, 245, 'sonuç', '', { size: 28 });
    yazi(c, k, 750, 295, 'buhar basıncı değişti', { size: 30, kalin: 700 });
    ok(c, k, [452, 265], [548, 265], RENK.yazi, 5);
    gizle(k);
    await par(c.say('Sıvının cinsi değişince buhar basıncı değişir.'), belir(c, k, 700, 1));
  }

  /* ---- 3. Sıcaklık ---- */
  async function sicaklik(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 1.25, x: 50, y: 490, kapak: 1, mmHg: DEGER['su-25'], yog: YOG['su-25'] });
    d.ekle(U); U.okunan(DEGER['su-25']);
    const sc = c.S('g', {}, svg);
    const t = sb(c, sc, U.X(75), U.Y(-190) - 40, '25', '°C', { size: 36, kalin: 700, brenk: RENK.yazi });
    const dal = c.S('g', {}, svg);
    [510, 528].forEach((y) => c.S('path', { d: `M80,${y} q15,-12 30,0 t30,0 t30,0 t30,0 t30,0`, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4, 'stroke-linecap': 'round' }, dal));
    const ayni2 = c.S('g', {}, svg);
    yazi(c, ayni2, 730, 150, 'aynı su', { hiza: 'start', size: 28, kalin: 600, renk: RENK.soluk }); yazi(c, ayni2, 730, 192, 'aynı kap', { hiza: 'start', size: 28, kalin: 600, renk: RENK.soluk });
    gizle(dal, ayni2, U.oku, sc);
    await belir(c, [sc, U.oku], 500, 1);

    await par(c.say('Araştırmacı aynı suyun sıcaklığını 40 °C’a çıkardı.', { speak: 'Araştırmacı aynı suyun sıcaklığını kırk dereceye çıkardı.' }),
      belir(c, [dal, ayni2], 500, 1).then(() => c.wait(300)).then(() => { t.firstChild.textContent = '40'; return c.wait(700); }));
    await par(c.say('Denge buhar basıncı 23,8’den 55,3 mmHg’ye yükseldi.', { speak: 'Denge buhar basıncı yirmi üç virgül sekizden elli beş virgül üç milimetre cıvaya yükseldi.' }),
      U.git({ mmHg: DEGER['su-40'], yog: YOG['su-40'] }, 2400), c.wait(500).then(() => U.okunan(DEGER['su-40'])), belir(c, dal, 600, 0));

    // Birlikte çöz: neden-sonuç tablosu.
    const nt = c.S('g', {}, svg);
    etiketSatiri(c, nt, 730, 250, 'Değişen', 'sıcaklık', { hiza: 'start' });
    etiketSatiri(c, nt, 730, 300, 'Değişmeyen', 'sıvı, kap', { hiza: 'start' });
    const son = etiketSatiri(c, nt, 730, 350, 'Sonuç', '?', { hiza: 'start', renkDeger: RENK.vurgu });
    gizle(nt); await belir(c, nt, 500, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Sıcaklık arttıkça su için denge buhar basıncı ne oldu?',
      options: ['Azaldı', 'Aynı kaldı', 'Arttı'], answer: 2,
      hints: ['23,8 ile 55,3’ü karşılaştır.', 'Sayı büyüdü mü, küçüldü mü?', ''],
      right: 'Evet. 23,8’den 55,3’e yükseldi.',
    });
    son.deger.textContent = 'arttı';
    await par(c.say('Sıcaklık arttıkça buhar basıncı arttı.'), c.wait(1200));
  }

  /* ---- 4. Değişkenler ---- */
  async function degiskenAd(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const U = kapliU(c, svg, { k: 0.55, x: 380, y: 160, kapak: 1, mmHg: DEGER['su-25'], yog: YOG['su-25'] });
    d.ekle(U);
    const F = degiskenler(c, svg, { x: 30, y: 235, w: 940, h: 300 });
    const bas = yazi(c, svg, 40, 130, '', { hiza: 'start', size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(F.g, bas);

    await par(c.say('Araştırmada ölçtüğümüz değişkene bağımlı değişken denir.'), belir(c, F.g, 500, 1).then(() => F.vurgu(0, true)));
    F.vurgu(0, false); F.vurgu(1, true);
    await c.say('Değiştirdiğimiz değişkene bağımsız değişken denir.');
    F.vurgu(1, false); F.vurgu(2, true);
    await c.say('Sabit tuttuğumuz değişkenlere kontrol değişkenleri denir.');
    F.vurgu(2, false);

    // Örnek: sıcaklığın etkisi.
    bas.textContent = 'Sıcaklığın etkisi'; await belir(c, bas, 400, 1);
    await par(c.say('Sıcaklığın etkisini araştırırken buhar basıncını ölçeriz.'), F.yaz(0, ['buhar basıncı']));
    await par(c.say('Değiştirdiğimiz sıcaklıktır; bağımsız değişken odur.'), F.yaz(1, ['sıcaklık']));
    await par(c.say('Sabit kalan sıvı, miktar ve kap kontrol değişkenleridir.'), F.yaz(2, ['sıvı', 'sıvı miktarı', 'kap', 'dış basınç, 1 atm'], RENK.yazi, 700));

    // Birlikte çöz: sıvının cinsinin etkisi.
    c.clearSay();
    await belir(c, [bas, F.kol[0].icerik, F.kol[1].icerik, F.kol[2].icerik], 350, 0);
    bas.textContent = 'Sıvının cinsinin etkisi';
    await belir(c, bas, 350, 1);
    await F.yaz(0, ['buhar basıncı']); await F.soru(1); await F.yaz(2, ['sıcaklık', 'sıvı miktarı', 'kap', 'dış basınç'], RENK.yazi);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bu araştırmada bağımsız değişken hangisidir?',
      options: ['Sıcaklık', 'Buhar basıncı', 'Sıvının cinsi'], answer: 2,
      hints: ['Sıcaklık bu araştırmada sabit kalıyor.', 'Bağımsız değişken, değiştirdiğin şeydir.', ''],
      right: 'Evet. Burada sıvıyı değiştiririz.',
    });
    await par(c.say('Burada sıvıyı değiştirir, buhar basıncını ölçeriz.'), F.yaz(1, ['sıvının cinsi']));

    // Karşı örnek: iki ölçüm, iki değişken birden farklı.
    c.clearSay();
    await belir(c, [F.g, bas, U.kok], 450, 0);
    const kr = c.S('g', {}, svg), cx = [290, 500, 710];
    ['Sıvı', 'Sıcaklık', 'Basınç'].forEach((a, i) => yazi(c, kr, cx[i], 160, a, { size: 24, kalin: 600, renk: RENK.soluk }));
    cizgi(c, kr, [200, 180], [800, 180], GRI.cam, 2);
    const R1 = [yazi(c, kr, cx[0], 250, 'su', { size: 32, kalin: 700 }), sb(c, kr, cx[1], 250, '40', '°C', { size: 32, kalin: 700, brenk: RENK.yazi }), sb(c, kr, cx[2], 250, '55,3', 'mmHg', { size: 32, kalin: 700, brenk: RENK.soluk })];
    const R2 = [yazi(c, kr, cx[0], 330, 'benzen', { size: 32, kalin: 700 }), sb(c, kr, cx[1], 330, '25', '°C', { size: 32, kalin: 700, brenk: RENK.yazi }), sb(c, kr, cx[2], 330, '95,3', 'mmHg', { size: 32, kalin: 700, brenk: RENK.soluk })];
    const hv = c.S('rect', { x: 215, y: 205, width: 370, height: 160, rx: 14, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4, 'stroke-dasharray': '8 6' }, kr);
    gizle(kr, hv);
    await belir(c, kr, 500, 1);
    await par(c.say('Bu iki ölçümde sıvı da sıcaklık da farklı.'), belir(c, hv, 500, 1));
    await c.choice({
      tag: 'Sıra sende', q: 'Araştırmacı su 40 °C ile benzen 25 °C’ı karşılaştırdı. Bu iki ölçüm sıvının cinsinin etkisini gösterir mi?',
      options: ['Gösterir; iki sıvının basıncı farklı', 'Gösterir; benzenin basıncı daha büyük', 'Göstermez; sıcaklık da farklı'], answer: 2,
      hints: ['Kaç şey birden değişmiş?', 'Fark sıvıdan mı, sıcaklıktan mı geldi, bilebilir misin?', ''],
      right: 'Evet. Fark iki değişkenden de gelebilir.',
    });
    // Doğrusu: yalnızca sıvı değişir.
    c.clearSay();
    await belir(c, [kr, hv], 350, 0);
    R1[1].firstChild.textContent = '25'; R1[2].firstChild.textContent = '23,8';
    const dg = isaret(c, kr, 840, 290, 'ok', 22);
    const hv2 = c.S('rect', { x: 215, y: 205, width: 185, height: 160, rx: 14, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4, 'stroke-dasharray': '8 6' }, kr);
    gizle(dg, hv2);
    await belir(c, kr, 350, 1);
    await par(c.say('Etkiyi görmek için tek değişkeni değiştirir, ötekileri sabit tutarız.'), belir(c, [dg, hv2], 600, 1));
    c.note('<b>Tek değişkeni değiştir, ötekileri sabit tut.</b> Örnek: sıcaklık değişir, sıvı sabit.', 'Değişkenleri sınamak', 'degiskenleri-sinamak');
  }

  /* ---- 5. Deneme 1: sıvı miktarı ---- */
  async function deneme1(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const S = Object.assign({}, REF);
    const U = kapliU(c, svg, { x: 24, y: 482, kapak: 1, mmHg: DEGER['su-25'], yog: YOG['su-25'] });
    d.ekle(U); U.okunan(DEGER['su-25']);
    const baslik = yazi(c, svg, 568, 70, '', { hiza: 'start', size: 22, kalin: 600, renk: RENK.vurgu });
    yeniden(c, baslik, ['Bağımsız:', 'sıvı miktarı'], 8);
    const tablo = deneyTablosu(c, svg, { x: 568, y: 100, w: 420, satirlar: [satir(REF)] });
    gizle(baslik, tablo.g);
    await belir(c, [baslik, tablo.g], 500, 1);

    await c.say('Sıvı miktarının etkisini sınayalım.');
    await c.say('Sıvı miktarı bağımsız, ötekiler kontrol değişkenidir.');
    await c.say('Miktarı değiştir; cıva seviyeleri farkına ve okunan değere bak.', { noWait: true });
    const eksik = await dene(c, { U, tablo, S, baslik: null, gerekli: [{ miktar: 2 }], tanim: [{ k: 'miktar', etiket: 'Sıvı miktarı', fmt: ['V', '2V'], deger: [1, 2] }] });
    await U.git({ miktar: 2, mmHg: DEGER['su-25'] }, 500);
    if (eksik) await c.say('Eksik kalan deneme de tabloya yazıldı.');
    await c.choice({
      tag: 'Sıra sende', q: 'Sıvı miktarı V’den 2V’ye çıkınca denge buhar basıncı ne oldu?',
      options: ['Arttı', 'Azaldı', 'Değişmedi; 23,8 mmHg'], answer: 2,
      hints: ['Tablodaki iki satırı karşılaştır.', 'Okunan değer değişti mi?', ''],
      right: 'Evet. Miktar iki katına çıktı, basınç aynı kaldı.',
    });
    await c.say('Sıvı miktarı değişti, buhar basıncı değişmedi.');
  }

  /* ---- 6. Deneme 2: kabın biçimi ve hacmi ---- */
  async function deneme2(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const S = Object.assign({}, REF);
    const U = kapliU(c, svg, { x: 24, y: 482, kapak: 1, mmHg: DEGER['su-25'], yog: YOG['su-25'] });
    d.ekle(U); U.okunan(DEGER['su-25']);
    const baslik = yazi(c, svg, 568, 70, '', { hiza: 'start', size: 22, kalin: 600, renk: RENK.vurgu });
    yeniden(c, baslik, ['Bağımsız:', '?'], 8);
    const tablo = deneyTablosu(c, svg, { x: 568, y: 100, w: 420, satirlar: [satir(REF)] });
    gizle(baslik, tablo.g);
    await belir(c, [baslik, tablo.g], 500, 1);

    await c.say('Şimdi kabın biçimini ve hacmini sınayalım.');
    await c.say('Her denemede yalnızca birini değiştirip ötekini sabit tut.');
    await c.say('Birini değiştir, tabloya yaz; sonra ötekini dene.', { noWait: true });
    const eksik = await dene(c, {
      U, tablo, S, baslik, gerekli: [{ bicim: 'genis' }, { hacim: 'buyuk' }],
      tanim: [
        { k: 'bicim', etiket: 'Kabın biçimi', fmt: ['Standart', 'Geniş ve sığ'], deger: ['standart', 'genis'] },
        { k: 'hacim', etiket: 'Kabın hacmi', fmt: ['Küçük', 'Büyük'], deger: ['kucuk', 'buyuk'] },
      ],
    });
    yeniden(c, baslik, ['Bağımsız:', 'biçim, hacim'], 8);
    await U.git({ bicim: 'standart', hacim: 'kucuk', mmHg: DEGER['su-25'] }, 500);
    if (eksik) await c.say('Eksik kalan denemeler de tabloya yazıldı.');
    await c.choice({
      tag: 'Sıra sende', q: 'Kabın biçimi ve hacmi değişince denge buhar basıncı ne oldu?',
      options: ['Geniş kapta arttı', 'İkisinde de değişmedi', 'Hacim büyüyünce azaldı'], answer: 1,
      hints: ['Okunan değer hep aynı mı?', '', 'Tablodaki satırların son sütununa bak.'],
      right: 'Evet. Her satırda 23,8 mmHg.',
    });
    await c.say('Kabın biçimi ve hacmi de buhar basıncını değiştirmedi.');
  }

  /* ---- 7. Deneme 3: sıvı ve sıcaklık ---- */
  async function deneme3(c) {
    const svg = c.svg(1000, 562), d = dolas(c);
    const S = Object.assign({}, REF);
    const U = kapliU(c, svg, { x: 24, y: 482, kapak: 1, mmHg: DEGER['su-25'], yog: YOG['su-25'] });
    d.ekle(U); U.okunan(DEGER['su-25']);
    const baslik = yazi(c, svg, 568, 70, '', { hiza: 'start', size: 22, kalin: 600, renk: RENK.vurgu });
    yeniden(c, baslik, ['Bağımsız:', '?'], 8);
    const tablo = deneyTablosu(c, svg, { x: 568, y: 100, w: 420, sut: [0, 1, 4], satirlar: [satir(REF)] });
    gizle(baslik, tablo.g);
    await belir(c, [baslik, tablo.g], 500, 1);

    await c.say('Şimdi benzeni 40 °C’ta deneyelim.', { speak: 'Şimdi benzeni kırk derecede deneyelim.' });
    await c.choice({
      tag: 'Tahmin et', q: 'Benzenin 25 °C’taki değeri 95,3 mmHg idi. 40 °C’ta denge buhar basıncı ne olur?',
      options: ['95,3 mmHg’den küçük', '95,3 mmHg’den büyük', '95,3 mmHg'], answer: 1,
      hints: ['Benzen de bir sıvı; neden farklı davransın?', '', 'Suda sıcaklık artınca basınç ne olmuştu?'],
      right: 'Evet. Sıcaklık artınca buhar basıncı artar.',
    });
    await c.say('Benzeni seç, sıcaklığı 40 °C’a getir; tabloya yaz.', { speak: 'Benzeni seç, sıcaklığı kırk dereceye getir; tabloya yaz.', noWait: true });
    const eksik = await dene(c, {
      U, tablo, S, baslik, gerekli: [{ sivi: 'su', sic: 40 }, { sivi: 'benzen', sic: 25 }, { sivi: 'benzen', sic: 40 }],
      tanim: [
        { k: 'sivi', etiket: 'Sıvı', fmt: ['Su', 'Benzen'], deger: ['su', 'benzen'] },
        { k: 'sic', etiket: 'Sıcaklık', fmt: ['25 °C', '40 °C'], deger: [25, 40] },
      ],
    });
    // Gör: tablo tamamlanır, benzen 40 °C satırı vurgulanır.
    await U.git({ sivi: 'benzen', sic: 40, mmHg: DEGER['benzen-40'], yog: YOG['benzen-40'] }, 700);
    U.okunan(DEGER['benzen-40']);
    yeniden(c, baslik, ['Bağımsız:', 'cins, sıcaklık'], 8);
    const son = tablo.satirlar.findIndex((q) => q.sivi === 'benzen' && q.sic === 40);
    tablo.vurgu(son, true);
    const gz = c.S('g', {}, svg);
    etiketSatiri(c, gz, 568, 440, 'tahmin', 'büyük', { hiza: 'start', size: 26 });
    etiketSatiri(c, gz, 568, 486, 'gözlem', '183 mmHg', { hiza: 'start', size: 26, renkDeger: RENK.vurgu });
    gizle(gz);
    await par(c.say('Benzen 40 °C’ta 183 mmHg çıktı.', { speak: 'Benzen kırk derecede yüz seksen üç milimetre cıva çıktı.' }), belir(c, gz, 600, 1));
    if (eksik) await c.say('Eksik kalan ölçümler de tabloya yazıldı.');
    await c.choice({
      tag: 'Sıra sende', q: 'Tabloya göre denge buhar basıncını hangi iki değişken değiştirdi?',
      options: ['Sıvı miktarı ve sıcaklık', 'Kabın biçimi ve sıvının cinsi', 'Sıvının cinsi ve sıcaklık'], answer: 2,
      hints: ['Miktar ve kap değişince değer aynıydı.', 'Hangi satırlarda değer değişti, hangilerinde aynı kaldı?', ''],
      right: 'Evet. Cins ve sıcaklık değişince değer değişti.',
    });

    // Gör: beş değişken iki gruba ayrılır.
    c.clearSay();
    await belir(c, [U.kok, U.oku, baslik, tablo.g, gz], 450, 0);
    const gr = c.S('g', {}, svg);
    kutu(c, gr, 40, 90, 440, 330, { rx: 16, w: 4, renk: RENK.vurgu });
    kutu(c, gr, 520, 90, 440, 330, { rx: 16, w: 1.5 });
    yazi(c, gr, 260, 150, 'değiştirir', { size: 34, kalin: 700, renk: RENK.vurgu });
    ['sıvının cinsi', 'sıcaklık'].forEach((s, i) => yazi(c, gr, 260, 230 + i * 56, s, { size: 32, kalin: 600 }));
    yazi(c, gr, 740, 150, 'değiştirmez', { size: 34, kalin: 700, renk: RENK.soluk });
    ['sıvı miktarı', 'kabın biçimi', 'kabın hacmi'].forEach((s, i) => yazi(c, gr, 740, 230 + i * 56, s, { size: 32, kalin: 600, renk: RENK.soluk }));
    gizle(gr);
    await par(c.say('Sıvının cinsi ve sıcaklık değiştirir; ötekiler değiştirmez.'), belir(c, gr, 700, 1));
    c.note('<b>Cins ve sıcaklık etkiler; miktar, kap biçimi, kap hacmi etkilemez.</b>', 'Buhar basıncını ne etkiler', 'ne-etkiler');
  }

  /* ---- 8. Neden: çekim ve sıcaklık ---- */
  async function neden(c) {
    const svg = c.svg(1000, 562);
    const G = cekim(c, svg, { x: 280, y: 100, w: 440, h: 300, kalin: 4, ayrilan: 1, iz: 8 });
    const bar = c.S('g', {}, svg), bd = c.S('rect', { x: 790, y: 400, width: 40, height: 0, rx: 6, fill: GRI.koyu }, bar);
    c.S('rect', { x: 790, y: 140, width: 40, height: 260, rx: 6, fill: 'none', stroke: GRI.cam, 'stroke-width': 2.5 }, bar);
    yazi(c, bar, 810, 438, 'basınç', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(G.g, bar);

    await par(c.say('Moleküller arası çekim, yüzeyden ayrılmayı zorlaştırır.'), belir(c, G.g, 600, 1));
    await par(c.say('Çekim zayıfladıkça buhar fazına geçen molekül sayısı artar.'), G.ayarla({ kalin: 1.6, ayrilan: 4 }, 1600));
    await par(c.say('Buhar fazındaki molekül sayısı arttıkça buhar basıncı da artar.'), belir(c, bar, 400, 1).then(() => c.tween(1500, (e) => { bd.setAttribute('y', 400 - 200 * e); bd.setAttribute('height', 200 * e); })));

    // Su ve benzen.
    c.clearSay();
    await belir(c, [G.g, bar], 450, 0);
    const P1 = cekim(c, svg, { x: 40, y: 100, w: 440, h: 300, sivi: 'su', kalin: 6.5, ayrilan: 2, iz: 8 });
    const P2 = cekim(c, svg, { x: 520, y: 100, w: 440, h: 300, sivi: 'benzen', kalin: 1.6, ayrilan: 6, iz: 8 });
    const t1 = yazi(c, svg, 260, 440, 'su', { size: 32, kalin: 700 }), t2 = yazi(c, svg, 740, 440, 'benzen', { size: 32, kalin: 700 });
    const l1 = yazi(c, svg, 260, 482, 'hidrojen bağı', { size: 26, kalin: 600, renk: RENK.cekme }), l2 = yazi(c, svg, 740, 482, 'London kuvveti', { size: 26, kalin: 600, renk: RENK.cekme });
    gizle(P1.g, P2.g, t1, t2, l1, l2);
    await par(c.say('Suyun buhar basıncı küçük olduğuna göre çekimi daha büyüktür.'), belir(c, [P1.g, t1], 600, 1));
    await par(c.say('Su molekülleri birbirine hidrojen bağıyla bağlanır.'), belir(c, l1, 500, 1));
    await par(c.say('Benzen molekülleri arasında yalnızca London kuvveti vardır.'), belir(c, [P2.g, t2, l2], 600, 1));

    // Sıcaklık: aynı su, 25 °C ve 40 °C.
    c.clearSay();
    await belir(c, [P1.g, P2.g, t1, t2, l1, l2], 450, 0);
    const A = cekim(c, svg, { x: 40, y: 100, w: 440, h: 300, sivi: 'su', kalin: 6.5, ayrilan: 2, iz: 6 });
    const B = cekim(c, svg, { x: 520, y: 100, w: 440, h: 300, sivi: 'su', kalin: 6.5, ayrilan: 2, iz: 26 });
    const ta = sb(c, svg, 260, 446, '25', '°C', { size: 36, kalin: 700, brenk: RENK.yazi }), tb = sb(c, svg, 740, 446, '40', '°C', { size: 36, kalin: 700, brenk: RENK.yazi });
    gizle(A.g, B.g, ta, tb);
    await par(c.say('Sıcaklık artınca moleküllerin kinetik enerjisi artar.'), belir(c, [A.g, B.g, ta, tb], 600, 1));
    await par(c.say('Buhar fazına geçen molekül sayısı artınca buhar basıncı yükselir.'), B.ayarla({ ayrilan: 5 }, 1400));

    // Önermeyi destekle.
    c.clearSay();
    await belir(c, [A.g, B.g, ta, tb], 450, 0);
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 60, 150, 880, 170, { rx: 18 });
    const k1 = yazi(c, kart, 500, 225, '', { size: 38, kalin: 700 }), k2 = yazi(c, kart, 500, 280, '', { size: 38, kalin: 700 });
    const onay = isaret(c, kart, 880, 190, 'ok', 28);
    gizle(kart, onay);
    const sor = async (satirlar, gerekce, soru, secenekler, dogru, ipuclari, sagMetin, ozet) => {
      c.clearSay(); onay.style.opacity = 0;
      k1.textContent = satirlar[0]; k2.textContent = satirlar[1];
      await belir(c, kart, 450, 1);
      await c.choice({ tag: 'Önermeyi destekle', q: soru, options: secenekler, answer: dogru, hints: ipuclari, right: sagMetin });
      await par(c.say(ozet), belir(c, onay, 500, 1));
    };
    await sor(['Benzenin buhar basıncı', 'suyunkinden büyüktür.'], null,
      'Önerme: “Benzenin buhar basıncı suyunkinden büyüktür.” Hangi gerekçe bu önermeyi destekler?',
      ['Benzende moleküller arası çekim daha kuvvetlidir', 'Benzenin kabı daha geniştir', 'Benzende moleküller arası çekim daha zayıftır; buhar fazına daha çok molekül geçer'], 2,
      ['Çekim kuvvetliyse buhar fazına geçen molekül azalır.', 'Kaplar aynıydı; kap biçimi basıncı değiştirmedi.', ''],
      'Evet. Çekim zayıflayınca buhar fazına geçen molekül artar.', 'Benzende çekim daha zayıf; buhar fazına daha çok molekül geçer.');
    await sor(['Su, 40 °C’ta 25 °C’takinden', 'büyük basınç yapar.'], null,
      'Önerme: “Su, 40 °C’ta 25 °C’takinden büyük basınç yapar.” Hangi gerekçe bu önermeyi destekler?',
      ['Kinetik enerji artar; buhar fazına geçen molekül sayısı artar', 'Moleküller arası çekim güçlenir', 'Sıvı miktarı artar'], 0,
      ['', 'Sıcaklık artınca moleküller daha hızlı hareket eder.', 'Sıvı miktarı değişmedi; basıncı etkilemez.'],
      'Evet. Sıcaklık artınca moleküller daha hızlı hareket eder.', 'Sıcaklık artınca kinetik enerji ve buhara geçen molekül artar.');
    await sor(['Su, aynı sıcaklıkta benzenden', 'küçük basınç yapar.'], null,
      'Önerme: “Su, aynı sıcaklıkta benzenden küçük basınç yapar.” Hangi gerekçe bu önermeyi destekler?',
      ['Su benzenden daha sıcaktır', 'Su molekülleri arasında çekim yoktur', 'Su molekülleri hidrojen bağıyla bağlanır; çekim daha büyüktür'], 2,
      ['Sıcaklık aynıydı.', 'Su moleküllerini hidrojen bağı çeker.', ''],
      'Evet. Hidrojen bağı çekimi büyütür; ayrılan molekül azalır.', 'Su molekülleri hidrojen bağıyla bağlanır; çekim daha büyüktür.');
    c.note('<b>Çekim zayıfladıkça buhar basıncı artar.</b> Örnek: benzen &gt; su.', 'Çekim ve basınç', 'cekim-ve-basinc');
  }

  /* ---- 9. Başa dön: alkol neden önce bitti? ---- */
  async function basaDon(c) {
    const svg = c.svg(1000, 562);
    const C = cubuklar(c, svg, { x: 330, y: 220, w: 520, max: 60, aralik: 100, satirlar: [{ ad: 'su', deger: 2.33 }, { ad: 'etil alkol', deger: 5.85 }, { ad: 'dietil eter', deger: 58.96 }] });
    const ust = c.S('g', {}, svg);
    sb(c, ust, 440, 84, '20', '°C', { size: 38, kalin: 700, brenk: RENK.yazi });
    yazi(c, ust, 590, 84, 'kPa', { size: 28, kalin: 600, renk: RENK.soluk });
    const isr = c.S('g', {}, svg);
    ok(c, isr, [600, 486], [600, 452], RENK.cekme, 5);
    yazi(c, isr, 600, 522, 'çekim: en zayıf', { size: 30, kalin: 700, renk: RENK.cekme });
    gizle(ust, isr);

    await par(c.say('Baştaki kaplara dönelim: etil alkol suyun önünde bitmişti.'), belir(c, ust, 500, 1));
    await par(c.say('Basınç kPa ile de yazılır.', { speak: 'Basınç kilopaskal ile de yazılır.' }), c.wait(300));
    await par(c.say('20 °C’ta suyun denge buhar basıncı 2,33 kPa’dır.', { speak: 'Yirmi derecede suyun denge buhar basıncı iki virgül otuz üç kilopaskaldır.' }), C.goster(0, 700));
    await par(c.say('Etil alkolünki 5,85 kPa’dır.', { speak: 'Etil alkolünki beş virgül seksen beş kilopaskaldır.' }), C.goster(1, 900));
    await c.say('Etil alkolün buhar basıncı büyük olduğuna göre çekimi daha zayıftır.');
    await par(c.say('20 °C’ta dietil eterin denge buhar basıncı 58,96 kPa’dır.', { speak: 'Yirmi derecede dietil eterin denge buhar basıncı elli sekiz virgül doksan altı kilopaskaldır.' }), C.goster(2, 1600));
    await c.choice({
      tag: 'Sıra sende', q: '20 °C’ta dietil eterin denge buhar basıncı 58,96 kPa, etil alkolünki 5,85 kPa’dır. Hangisinde moleküller arası çekim daha zayıftır?',
      options: ['Etil alkolde', 'İkisinde eşit', 'Dietil eterde'], answer: 2,
      hints: ['Basıncı büyük olan hangisi?', 'Çekim zayıfladıkça buhar basıncı ne olur?', ''],
      right: 'Evet. Basıncı en büyük olanın çekimi en zayıftır.',
    });
    await par(c.say('Dietil eterin buhar basıncı en büyük; çekimi en zayıftır.'), belir(c, isr, 700, 1));
  }

  Ders.start({
    id: 'cesitlilik-i2', kicker: 'Konu I · Buhar basıncı', title: 'Buhar basıncını ne etkiler: değişkeni tek tek sına', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Buhar basıncını ne etkiler: değişkeni tek tek sına',
      hook: 'Buhar basıncını neyin değiştirdiğini bulmak istiyorsun; bir denemede kaç şeyi birden değiştirebilirsin?',
      button: 'Derse başla ›',
    },
    goals: [
      'Bağımlı, bağımsız ve kontrol değişkenlerini belirler.',
      'Değişkenleri tek tek değiştirerek denge buhar basıncının sıvının cinsine ve sıcaklığa bağlı olduğunu, sıvı miktarına, kabın biçimine ve hacmine bağlı olmadığını gösterir.',
      'Sıvının cinsinin ve sıcaklığın etkisini moleküller arası çekimle açıklar.',
    ],
    scenes: [
      { title: 'Hatırla', goal: 'U borusunu ve London kuvvetini hatırla.', run: hatirla },
      { title: 'Sıvının cinsi: iki sıvı, bir ölçüm', goal: 'Su ve benzenin buhar basıncından neden-sonuç cümlesi kur.', run: cins },
      { title: 'Sıcaklık', goal: 'Sıcaklık artınca buhar basıncının nasıl değiştiğini gör.', run: sicaklik },
      { title: 'Değişkenler: ölç, değiştir, sabit tut', goal: 'Bağımlı, bağımsız ve kontrol değişkenini ayır.', run: degiskenAd },
      { title: 'Deneme 1: sıvı miktarı', goal: 'Sıvı miktarını değiştirip basıncı ölç.', run: deneme1 },
      { title: 'Deneme 2: kabın biçimi ve hacmi', goal: 'Kabın biçimini ve hacmini ayrı ayrı sına.', run: deneme2 },
      { title: 'Deneme 3: sıvı ve sıcaklık', goal: 'Sıvıyı ve sıcaklığı değiştirip tabloyu tamamla.', run: deneme3 },
      { title: 'Neden: çekim ve sıcaklık', goal: 'Sonuçları moleküller arası çekimle açıkla.', run: neden },
      { title: 'Başa dön: alkol neden önce bitti?', goal: 'Etil alkolün hızlı buharlaşmasını çekimle açıkla.', run: basaDon },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kabın hacminin etkisi araştırılırken bağımsız değişken hangisidir?',
        options: ['Buhar basıncı', 'Kabın hacmi', 'Sıcaklık'], answer: 1,
        why: ['Buhar basıncını ölçeriz; bağımlı değişken odur.', 'Değiştirdiğimiz değişken kabın hacmidir; bağımsız değişken odur.', 'Sıcaklık sabit tutulur; kontrol değişkenidir.'], scene: 3 },
      { q: 'Aynı sudan dolu iki kapalı kap 25 °C’ta dengede; birinde sıvı miktarı V, ötekinde 2V. Denge buhar basınçları için hangisi doğrudur?',
        options: ['2V olanda büyüktür', 'V olanda büyüktür', 'Eşittir'], answer: 2,
        why: ['Sıvı miktarı denge buhar basıncını değiştirmez.', 'Az sıvı olması basıncı büyütmez.', 'Sıvı miktarı etkilemediği için iki basınç eşittir.'], scene: 4 },
      { q: 'Kapalı kapta dengedeki bir X sıvısının sıcaklığı 25 °C’tan 60 °C’a çıkarılıp yeniden dengeye getiriliyor. Cıva seviyeleri farkı nasıl olur?',
        options: ['Büyür', 'Küçülür', 'Aynı kalır'], answer: 0,
        why: ['Sıcaklık artınca buhar basıncı artar; cıva farkı büyür.', 'Sıcaklık artınca basınç azalmaz; fark küçülmez.', 'Sıcaklık denge buhar basıncını etkiler; fark değişir.'], scene: 2 },
      { q: 'Aynı sıcaklıkta Y sıvısının buhar basıncı Z sıvısınınkinden büyük. Hangisi doğrudur?',
        options: ['Y’nin miktarı Z’ninkinden azdır', 'Y’nin molekülleri arasındaki çekim daha zayıftır', 'Y’nin molekülleri arasındaki çekim daha kuvvetlidir'], answer: 1,
        why: ['Sıvı miktarı buhar basıncını belirlemez.', 'Çekim zayıfladıkça buhar fazına geçen molekül ve basınç artar.', 'Çekim kuvvetli olsaydı buhar basıncı küçük olurdu.'], scene: 7 },
      { q: 'Bir öğrenci su 25 °C ile etil alkol 40 °C’ı karşılaştırıp sıvının cinsinin etkisini bulmaya çalışıyor. Sorun nedir?',
        options: ['Sıvı ve sıcaklık birlikte değişmiş', 'Kaplar kapalı', 'Su kullanılmış'], answer: 0,
        why: ['Fark sıvıdan mı sıcaklıktan mı geldiği bilinemez.', 'Kapalı kap gerekli; deney bozulmaz.', 'Su da bir sıvıdır; kullanılabilir.'], scene: 3 },
    ],
    summary: [
      'Etkiyi bulmak için tek değişken değişir, ötekiler sabit kalır.',
      'Sıvının cinsi ve sıcaklık buhar basıncını değiştirir; miktar, kabın biçimi ve hacmi değiştirmez.',
      'Çekim zayıfladıkça ve sıcaklık arttıkça buhar basıncı artar.',
      '<b>Tek değişkeni değiştir, ötekileri sabit tut.</b>',
    ],
    nextLesson: { href: 'i3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
