/* F2 · KİM.9.1.6 · MEB Kimya 9 s.67–70.
   Cu gözlenen dizilimi kaynak verisidir; istisna türetimi yapılmaz. */
(() => {
  'use strict';
  const { yazi, belir } = KIT, renk = '#ff8a5b';
  const ic = '1s² 2s² 2p⁶ 3s² 3p⁶';
  const veriler = [
    { ad: 'Sc', s: 2, d: 1, grup: '3B', iupac: 3 },
    { ad: 'Fe', s: 2, d: 6, grup: '8B', iupac: 8 },
    { ad: 'Co', s: 2, d: 7, grup: '8B', iupac: 9 },
    { ad: 'Ni', s: 2, d: 8, grup: '8B', iupac: 10 },
    { ad: 'Cu', s: 1, d: 10, grup: '1B', iupac: 11 },
    { ad: 'Zn', s: 2, d: 10, grup: '2B', iupac: 12 },
    { ad: 'V', s: 2, d: 3, grup: '5B', iupac: 5 },
  ];
  const us = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰'];
  function tablo(c, svg, d, gorunur = true) {
    const g = c.S('g', {}, svg), x = 105, y = 267, w = 42, h = 32;
    for (let p = 1; p <= 7; p++) for (let k = 1; k <= 18; k++) {
      if ((p === 1 && k !== 1 && k !== 18) || (p <= 3 && p > 1 && k > 2 && k < 13)) continue;
      const sec = gorunur && p === 4 && k === d.iupac;
      c.S('rect', { x: x + (k - 1) * w, y: y + (p - 1) * h, width: w - 3, height: h - 3, rx: 3, fill: sec ? renk : '#1b2942', stroke: sec ? renk : '#53627f' }, g);
    }
    if (gorunur) {
      yazi(c, g, 75, y + 3.5 * h + 9, '4', { size: 30, renk });
      yazi(c, g, x + (d.iupac - .5) * w - 1, y - 18, d.grup, { size: 30, renk });
      yazi(c, g, x + (d.iupac - .5) * w - 1, y + 3.5 * h + 9, d.ad, { size: 30, renk: '#101827' });
    }
    yazi(c, g, 500, 534, 'Kitap s. 67–70', { size: 30, renk: 'var(--muted)' });
    return g;
  }
  function atom(c, svg, d, sonuc = false) {
    svg.replaceChildren();
    yazi(c, svg, 500, 48, d.ad, { size: 40, renk });
    yazi(c, svg, 500, 100, ic, { size: 32 });
    yazi(c, svg, 500, 145, '4s' + us[d.s] + ' 3d' + us[d.d], { size: 36 });
    const total = d.s + d.d;
    yazi(c, svg, 500, 206, d.s + '+' + d.d + '=' + total + (sonuc ? ' → ' + d.grup + ' / ' + d.iupac + '. grup' : ' → ?'), { size: 36, renk });
    return tablo(c, svg, d, sonuc);
  }
  async function ayir(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 52, 'Ca ve Sc', { size: 40, renk });
    yazi(c, svg, 500, 110, ic, { size: 32 });
    yazi(c, svg, 290, 180, 'Ca: 4s²', { size: 38 });
    yazi(c, svg, 705, 180, 'Sc: 4s² 3d¹', { size: 38 });
    tablo(c, svg, veriler[0], false);
    await c.say('Ortak iç dizilimden sonra Ca ve Sc farklı orbital türleriyle biter.');
    await c.choice({ q: 'Ca için A kuralı var. Sc için ne önerirsin?', options: ['d elektronlarını da hesaba kat.', 'Yalnız dış 4s elektronlarını say.'], answer: 0, hints: ['', 'Yalnız 4s sayısı, Sc’yi Ca ile aynı gruba koyar.'], right: 'Sc’de d yerleşimi vardır; kaynak örnekleriyle yeni örüntü ara.' });
    await belir(c, atom(c, svg, veriler[0], true));
    await c.say('Kaynakta Ca 2A, Sc ise 3B grubundadır.');
    c.note('<b>s/p bitişi A; d bitişi B.</b><br>Örnek: Sc → B', 'A ve B');
    await c.choice({ tag: 'Sınıflandır', q: 'Sc’de 3d¹ en son yazıldı. Periyot kaçtır?', options: ['3', '4'], answer: 1, hints: ['4s bulunur; en yüksek n=4’tür.', ''], right: 'B grubunda da periyot en yüksek n’dir.' });
    await c.say('Son yazılan orbitalin sayısı, periyot için tek başına yeterli değildir.');
  }
  async function oruntu(c) {
    const svg = c.svg(); atom(c, svg, veriler[0], true);
    await c.say('s ve d toplamını kaynakta verilen grupla karşılaştır.');
    for (const i of [1, 2, 3]) {
      await belir(c, atom(c, svg, veriler[i], true), 400);
      await c.say(veriler[i].ad + ': toplam ' + (veriler[i].s + veriler[i].d) + ', kaynakta grup 8B.');
    }
    await c.choice({ tag: 'Örüntü kur', q: 'Fe, Co ve Ni verilerinden hangi genellemeyi önerirsin?', options: ['Toplam 8, 9, 10 ise 8B.', 'Toplam 9 ise 9B.', 'Yalnız d sayısı grup numarasıdır.'], answer: 0, hints: ['', 'Co’nun toplamı 9, fakat kaynakta grubu 8B.', 'Sc için d=1 iken kaynakta grup 3B.'], right: 'Üç farklı toplam, aynı harfli grup adına karşılık geliyor.' });
    await c.say('8B adı üç sütunu kapsar; sayılı adları farklıdır.');
    c.slider({ label: 'Kaynak örneklerini karşılaştır', min: 0, max: 3, step: 1, value: 0, fmt: i => veriler[i].ad, onInput: i => atom(c, svg, veriler[i], true) });
    await c.cont();
  }
  async function kural(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 66, 'Bilimsel B kuralı', { size: 40, renk });
    yazi(c, svg, 500, 155, 'ns + (n−1)d', { size: 44 });
    yazi(c, svg, 500, 245, '8–10 → 8B', { size: 40, renk });
    yazi(c, svg, 500, 320, '11 → 1B', { size: 40, renk });
    yazi(c, svg, 500, 395, '12 → 2B', { size: 40, renk });
    yazi(c, svg, 500, 520, 'Kitap s. 69', { size: 30, renk: 'var(--muted)' });
    await c.say('Şimdi örüntünü kitapta verilen bilimsel kuralla karşılaştır.');
    await c.say('B toplamında ns ile bir alt katmandaki d elektronları birlikte sayılır.');
    await c.say('Bilimsel kural sekizden ona 8B; on bire 1B, on ikiye 2B verir.');
    atom(c, svg, veriler[4]);
    await c.choice({ tag: 'Kuralı uygula', q: 'Cu’da 4s elektronları hangi alt düzeyle birlikte toplanmalıdır?', options: ['3d', '4d', '2p'], answer: 0, hints: ['', 'n=4 için n−1=3’tür.', 'Kural ns ile (n−1)d toplamını kullanır.'], right: 'n=4 için bir alt katmanın d alt düzeyi 3d’dir.' });
    await belir(c, atom(c, svg, veriler[4], true));
    await c.say('Cu’nun gözlenen dizilimi hazır veridir: toplam on bir, grup 1B.');
    c.note('<b>B: ns+(n−1)d.</b><br>Örnek: Cu, 1+10=11 → 1B', 'Bilimsel kural');
    atom(c, svg, veriler[5]);
    await c.choice({ tag: 'Genellemeyi karşılaştır', q: '“Zn’nin toplamı 12; harfli grubu 12B.” çıkarımı nasıl değerlendirilir?', options: ['Özel dönüşüm eksik; Zn 2B olmalıdır.', 'Toplam kuralı yeterli; 12B doğrudur.'], answer: 0, hints: ['', 'Öğretilen bilimsel kural toplam 12’yi 2B’ye dönüştürür.'], right: 'Genellemeye özel dönüşümü ekleyerek yeni örneği düzelttin.' });
    await belir(c, atom(c, svg, veriler[5], true));
    await c.say('Zn’de toplam on iki, grup 2B; IUPAC adı on ikinci gruptur.');
    c.slider({ label: 'Özel dönüşümleri sınayarak incele', min: 1, max: 5, step: 1, value: 5, fmt: i => veriler[i].ad, onInput: i => atom(c, svg, veriler[i], true) });
    await c.cont();
  }
  async function grid(c) {
    const svg = c.svg();
    const cizGrid = () => {
      svg.replaceChildren(); yazi(c, svg, 500, 62, 'Adres kartları', { size: 40 });
      ['① V', '② Co', '③ Zn'].forEach((ad, i) => {
        const x = 105 + i * 270;
        c.S('rect', { x, y: 145, width: 250, height: 240, rx: 10, fill: '#1b2942', stroke: renk, 'stroke-width': 3 }, svg);
        yazi(c, svg, x + 125, 218, ad, { size: 42, renk });
        yazi(c, svg, x + 125, 296, ['4s² 3d³', '4s² 3d⁷', '4s² 3d¹⁰'][i], { size: 34 });
      });
      yazi(c, svg, 500, 450, 'Ortak iç dizilim:', { size: 30 }); yazi(c, svg, 500, 495, ic, { size: 32 });
    };
    cizGrid();
    await c.say('Gridde üç atomun ortak iç dizilimi bir kez gösterildi.');
    for (const [adres, i, dogru] of [['4. periyot · 8B', 2, 1], ['4. periyot · 2B', 5, 2], ['4. periyot · 5B', 6, 0]]) {
      cizGrid();
      await c.choice({ tag: 'Gridde eşleştir', q: adres + ' adresine hangi kart gider?', options: ['① V', '② Co', '③ Zn'], answer: dogru, hints: ['V: toplam 2+3=5, grup 5B.', 'Co: toplam 2+7=9, grup 8B.', 'Zn: toplam 2+10=12, grup 2B.'], right: 'Kartın toplamı ve adresi uyumlu.' });
      await belir(c, atom(c, svg, veriler[i], true), 450);
      await c.say(veriler[i].ad + ' kutusu dördüncü satırdaki doğru sütuna yerleşti.');
    }
    c.note('<b>Toplamı bul; B grubunun özel eşlemesini uygula.</b><br>Örnek: Co → 8B', 'Adres kontrolü');
  }
  Ders.start({ id: 'etkilesim-f2', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Yeni örnek kuralı sınar', accent: renk, back: 'index.html',
    intro: { title: 'Yeni örnek kuralı sınar', hook: 'Demire A grubu kuralını uygularsan ne olur?', button: 'Derse başla ›' },
    scenes: [{ title: 'A mı B mi?', goal: 'Ca ve Sc üzerinden A/B ayrımını yap.', run: ayir }, { title: 'B örüntüsü', goal: 'Sc, Fe, Co, Ni verilerinden genelleme oluştur.', run: oruntu }, { title: 'Bilimsel kuralla karşılaştır', goal: 'B toplamını ve özel eşlemeleri verilen kuralla sınayarak kullan.', run: kural }, { title: 'Gridde dene', goal: 'V, Co ve Zn kartlarını tablo adresleriyle eşleştir.', run: grid }],
    quizTitle: 'Çıkış soruları', quiz: [
      { q: 'Co: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁷. Adresi?', options: ['3. periyot · 9B', '4. periyot · 7A', '4. periyot · 8B'], answer: 2, why: ['En yüksek n=4; toplam 9 için grup 8B’dir.', 'Dizilim d ile biter; B grubudur.', 'En yüksek n=4; s+d=9, özel eşleme 8B.'], scene: 3 },
      { q: 'Zn: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰. Harfli grup?', options: ['12B', '2B', '2A'], answer: 1, why: ['Toplam 12, harfli sistemde 2B’ye karşılık gelir.', 's+d=12; 2B’dir. IUPAC sisteminde 12. gruptur.', 'Yalnız 4s elektronlarını saymak yeterli değildir.'], scene: 2 }],
    summary: ['<b>Toplamı bul; B grubunun özel eşlemesini uygula.</b>', 'B toplamı: ns+(n−1)d; periyot: en yüksek n.', '8–10→8B; 11→1B; 12→2B.'], nextLesson: { href: 'f3-bloklar-ve-gruplar.html', label: 'Sonraki: Bloklar ve gruplar ›' } });
})();
