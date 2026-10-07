/* F1 · KİM.9.1.6 · MEB Kimya 9 s.67–70. İlk 36 element kesiti.
   Se katman sayıları s.68 dizilimindeki aynı n değerleri toplanarak bulunur. */
(() => {
  'use strict';
  const { yazi, belir } = KIT, renk = '#ff8a5b';
  const veri = [
    { ad: 'Li', n: 2, grup: 1, diz: ['1s² 2s¹'], dis: '2s¹', toplam: '1', katman: '2 + 1' },
    { ad: 'C', n: 2, grup: 14, diz: ['1s² 2s² 2p²'], dis: '2s² + 2p²', toplam: '4', katman: '2 + 4' },
    { ad: 'Se', n: 4, grup: 16, diz: ['1s² 2s² 2p⁶ 3s² 3p⁶', '4s² 3d¹⁰ 4p⁴'], dis: '4s² + 4p⁴', toplam: '6', katman: '2 + 8 + 18 + 6' },
    { ad: 'He', n: 1, grup: 18, diz: ['1s²'], dis: '1s²', toplam: '2', katman: '2' },
    { ad: 'Ca', n: 4, grup: 2, diz: ['1s² 2s² 2p⁶ 3s² 3p⁶ 4s²'], dis: '4s²', toplam: '2', katman: '2 + 8 + 8 + 2' },
    { ad: 'S', n: 3, grup: 16, diz: ['1s² 2s² 2p⁶ 3s² 3p⁴'], dis: '3s² + 3p⁴', toplam: '6', katman: '2 + 8 + 6' },
    { ad: 'Be', n: 2, grup: 2, diz: ['1s² 2s²'], dis: '2s²', toplam: '2', katman: '2 + 2' },
  ];
  const eski = (g) => g <= 2 ? g + 'A' : (g - 10) + 'A';
  function tablo(c, svg, d, etiket = 'adres', vurgula = true) {
    const g = c.S('g', {}, svg), x = 105, y = 215, w = 42, h = 42;
    for (let p = 1; p <= 7; p++) for (let k = 1; k <= 18; k++) {
      if ((p === 1 && k !== 1 && k !== 18) || (p <= 3 && p > 1 && k > 2 && k < 13)) continue;
      const sec = vurgula && d && p === d.n && k === d.grup;
      c.S('rect', { x: x + (k - 1) * w, y: y + (p - 1) * h, width: w - 3, height: h - 3, rx: 3, fill: sec ? renk : '#1b2942', stroke: sec ? renk : '#53627f' }, g);
    }
    if (d && vurgula) {
      yazi(c, g, x + (d.grup - .5) * w - 1.5, y + (d.n - .5) * h + 9, d.ad, { size: 30, renk: '#101827' });
      yazi(c, g, 80, y + (d.n - .5) * h + 9, String(d.n), { size: 30, renk });
      yazi(c, g, x + (d.grup - .5) * w - 1.5, y - 16, eski(d.grup), { size: 30, renk });
    }
    yazi(c, g, 500, 542, etiket + ' · Kitap s. 67–70', { size: 30, renk: 'var(--muted)' });
    return g;
  }
  function dizilim(c, svg, d, alt = '') {
    yazi(c, svg, 500, 53, d.ad, { size: 42, renk });
    d.diz.forEach((s, i) => yazi(c, svg, 500, 105 + i * 43, s, { size: 32 }));
    if (alt) yazi(c, svg, 500, 183, alt, { size: 32, renk });
  }
  async function adlar(c) {
    const svg = c.svg();
    const ciz = (g = 1, acik = false) => {
      svg.replaceChildren();
      yazi(c, svg, 500, 65, 'Aynı sütun, iki ad', { size: 40 });
      const d = { ad: '', n: 3, grup: g };
      tablo(c, svg, d, 'Sütun = grup', false);
      const x = 105 + (g - 1) * 42;
      const sec = c.S('rect', { x, y: 210, width: 39, height: 294, rx: 3, fill: renk, opacity: .28 }, svg);
      yazi(c, svg, 500, 130, eski(g) + (acik ? ' ↔ ' + g + '. grup' : ' ↔ ?'), { size: 44, renk });
      return sec;
    };
    ciz(1, true);
    await c.say('Dikey sütunlar gruptur; IUPAC soldan sağa birden on sekize numaralandırır.');
    await c.say('Harfli adlandırma aynı sütunlara sayı ve harfle ad verir.');
    await c.say('Kaynak şemasında 1A sütunu, IUPAC birinci gruptur.');
    for (const g of [2, 17, 18]) {
      await belir(c, ciz(g, true), 350);
      await c.say(eski(g) + ' sütunu, IUPAC ' + g + '. gruptur.');
    }
    ciz(1);
    await c.choice({ tag: 'Etiketi uygula', q: 'Li, 1A grubundadır. Sayılı etiketini hangi kart doğru yazar?', options: ['Li · 1. grup', 'Li · 11. grup', 'Li · 18. grup'], answer: 0, hints: ['', '11. grup 1B sütunudur.', '18. grup 8A sütunudur.'], right: 'Li’nin sütununa öğretilen iki adlandırmayı uyguladın.' });
    await belir(c, ciz(1, true));
    await c.say('Sütun değişmez; yalnız adlandırma değişir.');
    c.note('<b>Grup iki adla anılır.</b><br>Örnek: 7A = 17. grup', 'Grup adları');
    for (const g of [2, 17, 18]) {
      ciz(g);
      const ad = { 2: 'Mg', 17: 'Cl', 18: 'He' }[g];
      await c.choice({ tag: 'Etiketi uygula', q: ad + ' için ' + eski(g) + ' yazıyor. Sayılı etiketi seç.', options: [ad + ' · ' + g + '. grup', ad + ' · ' + (g === 2 ? 12 : g - 10) + '. grup'], answer: 0, hints: ['', 'Kaynak haritasındaki aynı sütunun IUPAC numarasını kullan.'], right: ad + ' için iki etiket aynı sütunu gösterir.' });
      await belir(c, ciz(g, true), 350);
    }
    await c.say('1A, 2A, 7A, 8A karşılıklarını aynı şemada eşleştirdin.');
  }
  async function periyot(c) {
    const svg = c.svg();
    const ciz = (i, acik = true) => { svg.replaceChildren(); const d = veri[i]; dizilim(c, svg, d, acik ? 'En yüksek n = ' + d.n : 'En yüksek n = ?'); return tablo(c, svg, d, 'Satır = periyot', acik); };
    ciz(1);
    await c.say('Periyot yatay satırdır; orbitalin başındaki sayı katman numarası n’dir.');
    await c.say('C örneğinde en yüksek n iki; kaynak adresi ikinci periyottur.');
    ciz(2);
    await c.say('Se örneğinde en yüksek n dört; kaynak adresi dördüncü periyottur.');
    ciz(0, false);
    await c.say('Bu örüntüyü Li’nin dizilimine uygula.');
    await c.choice({ q: 'Li diziliminden hangi periyodu tahmin edersin?', options: ['1. periyot', '2. periyot', '3. periyot'], answer: 1, hints: ['1s var, fakat 2s de var.', '', 'Dizilimde n=3 yok.'], right: 'En yüksek n=2; ikinci satır.' });
    await belir(c, ciz(0));
    await c.say('Dolu katmanlar içinde en yüksek n, tablo satırına karşılık gelir.');
    c.note('<b>Periyot, dizilimdeki en yüksek n’dir.</b><br>Örnek: Li → 2', 'Periyot');
    ciz(2, false);
    await c.choice({ tag: 'Yeni örnekte dene', q: 'Se’de 3d¹⁰ bulunuyor. Periyot kaçtır?', options: ['3', '4'], answer: 1, hints: ['4s ve 4p bulunduğu için en yüksek n=4.', ''], right: '3d’ye bakıp durma; en yüksek n=4.' });
    await belir(c, ciz(2));
    c.slider({ label: 'Li / C / Se dizilimlerini karşılaştır', min: 0, max: 2, value: 2, step: 1, fmt: i => veri[i].ad, onInput: ciz });
    await c.say('Son yazılan orbital yerine bütün dizilimdeki en yüksek n’yi kullan.', { noWait: true });
    await c.cont();
  }
  async function agrubu(c) {
    const svg = c.svg();
    const ciz = (i, sonuc = false) => {
      svg.replaceChildren(); const d = veri[i]; dizilim(c, svg, d, d.dis + ' → ' + (sonuc ? (d.ad === 'He' ? '8A (istisna)' : d.toplam + 'A') : '?'));
      return tablo(c, svg, d, 'Dış s+p', sonuc);
    };
    ciz(6, true);
    await c.say('A grubunda en yüksek n’deki s ve p elektronları birlikte sayılır.');
    await c.say('Be’nin dış katmanında iki elektron vardır; kaynak grubu 2A’dır.');
    ciz(1);
    await c.say('Bu kuralı C’nin dış s ve p elektronlarına uygula.');
    await c.choice({ q: 'C için 2s² ve 2p² hangi A grubunu gösterir?', options: ['2A', '4A', '6A'], answer: 1, hints: ['p elektronlarını da toplamalısın.', '', 'Dış toplam 2+2=4.'], right: '2+2=4; C, 4A grubundadır.' });
    await belir(c, ciz(1, true));
    await c.say('Dış katmandaki toplamı grubun A numarasıyla karşılaştır.');
    c.note('<b>A grubu: dış s+p toplamı.</b><br>Örnek: C, 2+2=4A', 'A grubu');
    ciz(3, true);
    await c.say('He toplam kuralının istisnasıdır: 1s² dizilimine rağmen 8A grubundadır.');
    await c.choice({ tag: 'Etiketi değerlendir', q: '“He: 2. periyot, 8A” kartını nasıl düzeltirsin?', options: ['Periyodu 1 yap; 8A doğru.', 'Grubu 2A yap; periyot 2 doğru.'], answer: 0, hints: ['', 'He istisnası 8A’dır; en yüksek n=1 periyodu belirler.'], right: 'Periyot kuralını ve öğretilen He istisnasını birlikte uyguladın.' });
    await belir(c, ciz(3, true));
    await c.say('Helyum birinci periyotta, soy gazların bulunduğu 8A sütunundadır.');
    c.note('<b>He istisnadır: 1s² → 1. periyot, 8A.</b>', 'Helyum');
    c.slider({ label: 'A grubu adreslerini incele', min: 0, max: 3, step: 1, value: 3, fmt: i => veri[i].ad, onInput: i => ciz(i, true) });
    await c.cont();
  }
  async function adres(c) {
    const svg = c.svg();
    for (const [i, secenekler, dogru] of [[4, ['4. periyot · 2A', '3. periyot · 2A', '4. periyot · 8A'], 0], [5, ['3. periyot · 4A', '3. periyot · 6A', '2. periyot · 6A'], 1], [2, ['3. periyot · 6A', '4. periyot · 4A', '4. periyot · 6A'], 2]]) {
      const d = veri[i]; svg.replaceChildren(); dizilim(c, svg, d); tablo(c, svg, d, 'Adresini seç', false);
      await c.say(d.ad + ' için periyot ve grubu birlikte seç.');
      await c.choice({ tag: 'Adres seç', q: d.ad + ' atomunu hangi tablo kutusuna yerleştirirsin?', options: secenekler, answer: dogru, hints: secenekler.map((_, j) => j === dogru ? '' : 'En yüksek n=' + d.n + '; dış s+p=' + d.toplam + '.'), right: 'İki bilgi aynı kutuyu belirler.' });
      svg.replaceChildren(); dizilim(c, svg, d); await belir(c, tablo(c, svg, d));
    }
    svg.replaceChildren(); dizilim(c, svg, veri[2], 'Katmanlar: ' + veri[2].katman.replaceAll(' ', '')); tablo(c, svg, veri[2], 'İlk 36 element kesiti');
    await c.say('Se’nin üçüncü katmanı 3s, 3p ve 3d elektronlarını birlikte içerir.');
    await c.say('A/B ayrımında katman sayıları yanında dizilimdeki orbital türü de kullanılır.');
    await c.choice({ tag: 'Veriyi değerlendir', q: 'Se adresini denetleyen hangi yöntem kaynak dizilimini kullanır?', options: ['Katman dağılımıyla orbital türünü birlikte incelemek.', 'Üçüncü katmanı sekiz sayıp orbital türünü atlamak.'], answer: 0, hints: ['', 'Kaynakta üçüncü katmanda 18 elektron vardır; 3d’yi atlayamazsın.'], right: 'İlk 36 için katman dağılımını orbital bilgisiyle birlikte değerlendirdin.' });
    await c.say('Katman dağılımı, orbital bilgisini ortadan kaldırmaz.');
  }
  Ders.start({ id: 'etkilesim-f1', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Dizilim adres verir', accent: renk, back: 'index.html',
    intro: { title: 'Dizilim adres verir', hook: 'Yalnız dizilimden periyot ve grubu bulabilir misin?', button: 'Derse başla ›' },
    scenes: [{ title: 'İki adlandırma', goal: 'Harfli ve IUPAC grup adlarını eşleştir.', run: adlar }, { title: 'En yüksek n', goal: 'Dizilimden periyodu belirle.', run: periyot }, { title: 'A grubu ve He', goal: 'Dış s+p toplamını kullan; He istisnasını ayır.', run: agrubu }, { title: 'Yeni adres', goal: 'Ca, S, Se adreslerini ve katman kapsamını sınayarak belirle.', run: adres }],
    quizTitle: 'Çıkış soruları', quiz: [
      { q: 'Cl: 1s² 2s² 2p⁶ 3s² 3p⁵. Adresi nedir?', options: ['2. periyot · 7A', '3. periyot · 7A', '3. periyot · 5A'], answer: 1, why: ['Dizilimde en yüksek n=3’tür.', 'En yüksek n=3; dış s+p toplamı 2+5=7.', 'Yalnız p elektronlarını saydın; dış s elektronları da eklenir.'], scene: 3 },
      { q: 'He 1s² için doğru adres hangisidir?', options: ['1. periyot · 2A', '2. periyot · 8A', '1. periyot · 8A'], answer: 2, why: ['He, A grubu toplam kuralının istisnasıdır.', 'Dizilimde en yüksek n=1’dir.', 'He, birinci periyotta 8A grubunda yer alır.'], scene: 2 }],
    summary: ['<b>Periyot en yüksek n; A grubunda dış s+p.</b>', '1A/2A/7A/8A = 1/2/17/18. grup.', 'He: 1s², birinci periyot ve 8A.'], nextLesson: { href: 'f2-b-gruplari.html', label: 'Sonraki: B grupları ›' } });
})();
