/* F3 · KİM.9.1.6 · MEB Kimya 9 s.70–72.
   Şema konum içindir; f elementlerinde dizilim veya grup hesabı yapılmaz. */
(() => {
  'use strict';
  const { yazi, belir } = KIT, renk = '#ff8a5b';
  const blokRenk = { s: '#6ea8ff', p: '#3ddc97', d: '#ff8a5b', f: '#c792ff' };
  const atomlar = [
    { ad: 'Na', p: 3, g: 1, blok: 's', diz: ['1s² 2s² 2p⁶ 3s¹'] },
    { ad: 'Cl', p: 3, g: 17, blok: 'p', diz: ['1s² 2s² 2p⁶ 3s² 3p⁵'] },
    { ad: 'Fe', p: 4, g: 8, blok: 'd', diz: ['1s² 2s² 2p⁶ 3s² 3p⁶', '4s² 3d⁶'] },
    { ad: 'He', p: 1, g: 18, blok: 's', diz: ['1s²'] },
  ];
  const gruplar = [
    { ad: '1A', g: 1, isim: 'Alkali metaller', bilgi: ['H hariç', '+1 yüklü iyon'], ornek: 'Na', p: 3 },
    { ad: '2A', g: 2, isim: 'Toprak alkali metaller', bilgi: ['Metaller', '+2 yüklü iyon'], ornek: 'Mg', p: 3 },
    { ad: '3A', g: 13, isim: 'Toprak metalleri', bilgi: ['B yarı metal', 'Çoğunlukla +3 yüklü iyon'], ornek: 'B', p: 2 },
    { ad: '7A', g: 17, isim: 'Halojenler', bilgi: ['F ve Cl: ametal', 'Oda sıcaklığında gaz'], ornek: 'F', p: 2 },
    { ad: '8A', g: 18, isim: 'Soy gazlar', bilgi: ['Tek atomlu', 'Oda sıcaklığında gaz'], ornek: 'Ne', p: 2 },
  ];
  function harita(c, svg, { blok = null, atom = null, grup = null, fSatir = -1, etiketler = true, f = true, y = 174 } = {}) {
    const kat = c.S('g', {}, svg), x = 100, w = 43, h = 31;
    for (let p = 1; p <= 7; p++) for (let g = 1; g <= 18; g++) {
      if ((p === 1 && g !== 1 && g !== 18) || (p <= 3 && p > 1 && g > 2 && g < 13)) continue;
      const tur = g <= 2 || (p === 1 && g === 18) ? 's' : g >= 13 ? 'p' : 'd';
      const sec = atom && atom.p === p && atom.g === g;
      const aktif = grup ? grup.g === g : !blok || blok === tur;
      c.S('rect', { x: x + (g - 1) * w, y: y + (p - 1) * h, width: w - 3, height: h - 3, rx: 2, fill: sec ? '#fff1df' : aktif ? (grup ? renk : blokRenk[tur]) : '#27314b', 'fill-opacity': sec ? 1 : aktif ? .65 : 1, stroke: sec ? '#fff1df' : '#53627f', 'stroke-width': sec ? 3 : 1 }, kat);
      if (sec) yazi(c, kat, x + (g - .5) * w - 1, y + (p - .5) * h + 9, atom.ad, { size: 30, renk: '#101827' });
    }
    if (etiketler) {
      [['s', 140], ['d', 400], ['p', 745]].forEach(([ad, xx]) => yazi(c, kat, xx, y + 7 * h + 29, ad + ' blok', { size: 30, renk: blokRenk[ad] }));
    }
    if (f) {
      const fx = 260, fy = 442, fw = 38;
      for (let i = 0; i < 2; i++) {
        const sec = (!blok || blok === 'f') && (fSatir < 0 || fSatir === i);
        for (let j = 0; j < 14; j++) c.S('rect', { x: fx + j * fw, y: fy + i * 38, width: fw - 3, height: 28, rx: 2, fill: sec ? blokRenk.f : '#27314b', 'fill-opacity': sec ? .65 : 1, stroke: '#53627f' }, kat);
        c.S('path', { d: 'M ' + (x + 2 * w - 3) + ' ' + (y + (5.5 + i) * h) + ' H 205 V ' + (fy + i * 38 + 14) + ' H ' + fx, fill: 'none', stroke: blokRenk.f, 'stroke-width': 2, 'stroke-dasharray': '5 5' }, kat);
      }
      if (etiketler) yazi(c, kat, 863, 483, 'f blok', { size: 30, renk: blokRenk.f });
    }
    yazi(c, kat, 500, 546, 'Kitap s. 70–72', { size: 30, renk: 'var(--muted)' });
    return kat;
  }
  function atomCiz(c, svg, i) {
    svg.replaceChildren(); const d = atomlar[i];
    yazi(c, svg, 500, 42, d.ad + ' → ' + d.blok + ' blok', { size: 38, renk: blokRenk[d.blok] });
    d.diz.forEach((s, j) => yazi(c, svg, 500, 91 + j * 43, s, { size: 32 }));
    return harita(c, svg, { blok: d.blok, atom: d });
  }
  async function blok(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 62, 'Yerleşim türü ve blok', { size: 38 });
    harita(c, svg);
    await c.say('Dört orbital türü, tablonun dört bölgesiyle ilişkilidir.');
    await c.say('Son yerleşilen orbital türü s, p, d veya f bloğunu belirler.');
    for (const i of [0, 1, 2]) {
      await belir(c, atomCiz(c, svg, i), 350);
      await c.say(atomlar[i].ad + ' dizilimi ' + atomlar[i].blok + ' ile biter; kaynakta ' + atomlar[i].blok + ' bloktadır.');
    }
    atomCiz(c, svg, 3);
    await c.say('He 8A sütunundadır; 1s² dizilimi nedeniyle s blok elementidir.');
    await c.choice({ tag: 'Çizimi değerlendir', q: 'Bir çizim He’yi “8A olduğu için p blok” diye etiketliyor. Düzeltme?', options: ['Grup 8A kalır; blok s olmalıdır.', 'Grup 2A olur; blok p kalmalıdır.', 'Grup 8A kalır; blok d olmalıdır.'], answer: 0, hints: ['', 'He’nin istisna grup adresi 8A’dır; dizilimi 1s²’dir.', 'He diziliminde d yerleşimi yok.'], right: 'Grup adresiyle blok bilgisini ayrı ölçütlerle denetledin.' });
    await belir(c, atomCiz(c, svg, 3));
    await c.say('Helyum sağ sütunda görünür; elektron dizilimi s bloğunu gösterir.');
    c.note('<b>Son yerleşim türü bloğu gösterir.</b><br>Örnek: He 1s² → s', 'Blok');
    c.slider({ label: 'Dizilim ile bloğu eşleştir', min: 0, max: 3, step: 1, value: 3, fmt: i => atomlar[i].ad, onInput: i => atomCiz(c, svg, i) });
    await c.say('Na, Cl ve Fe seç; yerleşim türünün bölgesini karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function df(c) {
    const svg = c.svg();
    const ciz = (i = 0) => {
      svg.replaceChildren();
      yazi(c, svg, 500, 63, i === 0 ? 'd blok · Geçiş metalleri' : 'f blok · İç geçiş metalleri', { size: 38, renk: blokRenk[i === 0 ? 'd' : 'f'] });
      const kat = harita(c, svg, { blok: i === 0 ? 'd' : 'f', fSatir: i === 0 ? -1 : i - 1 });
      if (i > 0) yazi(c, svg, 500, 110, i === 1 ? 'Lantanitler · 6. periyot' : 'Aktinitler · 7. periyot', { size: 34, renk: blokRenk.f });
      return kat;
    };
    ciz();
    await c.say('d blok geçiş metalleri; f blok iç geçiş metalleri olarak adlandırılır.');
    await belir(c, ciz(1));
    await c.say('Üst ayrılmış satır, altıncı periyottaki lantanitlerin konumunu gösterir.');
    await belir(c, ciz(2));
    await c.say('Alt ayrılmış satır, yedinci periyottaki aktinitlerin konumunu gösterir.');
    await c.choice({ tag: 'Bağlantıyı değerlendir', q: 'Alttaki iki satırı “8. ve 9. periyot” diye numaralayan çizim doğru mu?', options: ['Hayır; ana tablonun 6. ve 7. periyotlarına bağlanırlar.', 'Evet; ayrı çizildikleri için iki yeni periyottur.', 'Hayır; ikisi de 4. periyottaki d bloktur.'], answer: 0, hints: ['', 'Ayrı çizim yeni periyot oluşturmaz; bağlantı kesikli çizgilerle gösterilir.', 'd bölgesiyle f bölgesi farklıdır; kaynak f satırlarını 6/7’ye bağlar.'], right: 'Yerleşim şemasını kullanarak yanlış periyot etiketlerini düzelttin.' });
    c.note('<b>f blok: iç geçiş metalleri.</b><br>Örnek: lantanitler', 'd ve f');
    c.slider({ label: 'd / lantanit / aktinit konumlarını incele', min: 0, max: 2, step: 1, value: 2, fmt: i => ['d blok', 'Lantanitler', 'Aktinitler'][i], onInput: ciz });
    await c.cont();
  }
  function grupCiz(c, svg, i, ad = true, ozellik = false) {
    const d = gruplar[i]; svg.replaceChildren();
    yazi(c, svg, 500, 56, d.ad + (ad ? ' · ' + d.isim : ' → ?'), { size: 38, renk });
    const kat = harita(c, svg, { grup: d, atom: { ad: d.ornek, p: d.p, g: d.g }, etiketler: false, f: false, y: 158 });
    if (ozellik) d.bilgi.forEach((s, j) => yazi(c, svg, 500, 437 + j * 50, s, { size: 36 }));
    return kat;
  }
  async function adlar(c) {
    const svg = c.svg();
    for (let i = 0; i < gruplar.length; i++) {
      await belir(c, grupCiz(c, svg, i), 350);
      await c.say(gruplar[i].ad + ' özel adı: ' + gruplar[i].isim + (i === 0 ? ', H hariç.' : '.'));
    }
    const yeni = ['Li', 'Be', 'Al', 'Cl', 'Ar'];
    for (let i = 0; i < gruplar.length; i++) {
      grupCiz(c, svg, i, false);
      await c.say(yeni[i] + ' için verilen grup adresine özel adı uygula.');
      const dogru = gruplar[i].isim, yanlis = gruplar[(i + 1) % 5].isim;
      await c.choice({ tag: 'Yeni kartı eşleştir', q: yeni[i] + ', ' + gruplar[i].ad + ' grubundadır. Element kartının özel adını seç.', options: [dogru, yanlis], answer: 0, hints: ['', yanlis + ', ' + gruplar[(i + 1) % 5].ad + ' grubunun adıdır.'], right: yeni[i] + ' kartını grubunun özel adıyla eşleştirdin.' });
      await belir(c, grupCiz(c, svg, i), 350);
    }
    c.note('<b>Grup adını sütunuyla eşleştir.</b><br>Örnek: 7A → halojenler', 'Özel adlar');
    c.slider({ label: 'Tek grup kartını değiştir', min: 0, max: 4, step: 1, value: 4, fmt: i => gruplar[i].ad, onInput: i => grupCiz(c, svg, i) });
    await c.say('Her özel adın tablodaki sütununu karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function ozellik(c) {
    const svg = c.svg();
    const anlatim = [
      ['1A’da H ametaldir; diğerleri alkali metaldir.', 'Alkali metaller bileşiklerinde +1 yüklü iyon oluşturur.'],
      ['2A toprak alkali metallerdir; gruptaki elementler metaldir.', '2A metalleri bileşiklerinde +2 yüklü iyon oluşturur.'],
      ['3A’da B yarı metaldir; diğerleri metaldir.', '3A elementleri bileşiklerinde çoğunlukla +3 yüklü iyon oluşturur.'],
      ['7A halojenlerdir; F ve Cl ametal örnekleridir.', 'F ve Cl oda sıcaklığında gazdır.'],
      ['8A soy gazları tek atomlu yapıdadır.', 'Soy gazlar oda sıcaklığında gazdır.'],
    ];
    for (let i = 0; i < gruplar.length; i++) {
      await belir(c, grupCiz(c, svg, i, true, true), 350);
      for (const cumle of anlatim[i]) await c.say(cumle);
    }
    const sorular = [
      ['“Li ve H, 1A’da; ikisi de alkali metal.” çıkarımının düzeltmesi?', ['H ametaldir; alkali metal adı Li için uygundur.', 'İkisi de alkali metaldir; düzeltme gerekmez.'], 'H, 1A’da yer alır fakat ametaldir.'],
      ['Be, 2A’dadır. “Bileşiğinde Be⁺” yazan kartın grup özelliğine uygun düzeltmesi?', ['Be²⁺', 'Be⁺ doğru; değiştirme.'], '2A metalleri bileşiklerinde +2 yüklü iyon oluşturur.'],
      ['Al, 3A’dadır. Grup özelliğini uygulayan hangi yorum uygundur?', ['Al için çoğunlukla +3 iyon; B için yarı metal.', 'Al için yalnız +1 iyon; B için metal.'], 'B yarı metaldir; kitap çoğunlukla +3 ifadesini kullanır.'],
      ['Cl, 7A’dadır. Oda sıcaklığındaki örnek kartını seç.', ['Halojen; gaz hâlinde ametal.', 'Soy gaz; tek atomlu.'], 'Cl, 7A halojen grubundadır; oda sıcaklığında gazdır.'],
      ['Ar, 8A’dadır. Oda sıcaklığındaki örnek kartını seç.', ['Tek atomlu gaz.', 'Katı metal.'], '8A soy gaz özelliği Ar için de uygulanır.'],
    ];
    for (let i = 0; i < gruplar.length; i++) {
      grupCiz(c, svg, i);
      await c.say(gruplar[i].ad + ' için doğru genel özellik kartını eşleştir.');
      await c.choice({ tag: 'Özelliği sınıflandır', q: sorular[i][0], options: sorular[i][1], answer: 0, hints: ['', sorular[i][2]], right: sorular[i][2] });
      await belir(c, grupCiz(c, svg, i, true, true), 350);
    }
    c.note('<b>Grup ortak özellikleri gösterir.</b><br>Örnek: 8A → tek atomlu gaz', 'Genel özellik');
    c.slider({ label: 'Grup ve özellik kartını incele', min: 0, max: 4, step: 1, value: 4, fmt: i => gruplar[i].ad, onInput: i => grupCiz(c, svg, i, true, true) });
    await c.say('Bloğu yerleşim türü, grup adını ortak özellikleriyle birlikte düşün.', { noWait: true });
    await c.cont();
  }
  Ders.start({ id: 'etkilesim-f3', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Bloğu yerleşim türü söyler', accent: renk, back: 'index.html',
    intro: { title: 'Bloğu yerleşim türü söyler', hook: 'Tablonun altında iki satır neden var?', button: 'Derse başla ›' },
    scenes: [{ title: 'Bloğu gör', goal: 's/p/d/f bölgelerini dizilimle ilişkilendir.', run: blok }, { title: 'd ve f konumları', goal: 'Geçiş, iç geçiş, lantanit ve aktinit konumlarını göster.', run: df }, { title: 'Adları eşleştir', goal: '1A/2A/3A/7A/8A özel adlarını sütunlarıyla eşleştir.', run: adlar }, { title: 'Özelliği sınıflandır', goal: 'Beş grubun genel özelliklerini ve H istisnasını ayır.', run: ozellik }],
    quizTitle: 'Çıkış soruları', quiz: [
      { q: '1A için “alkali metaller” adında hangi istisna vardır?', options: ['H alkali metal değildir.', 'Na alkali metal değildir.', 'Li soy gazdır.'], answer: 0, why: ['H, 1A’da bulunduğu hâlde ametaldir.', 'Na, 1A alkali metalidir.', 'Li, 1A alkali metalidir; soy gaz değildir.'], scene: 3 },
      { q: 'Lantanitler ve aktinitler hangi bloktadır?', options: ['s blok', 'p blok', 'f blok'], answer: 2, why: ['s blok soldaki bölgeyi ve He’yi kapsar.', 'p blok sağdaki bölgedir; He s blok istisnasıdır.', 'Lantanit ve aktinit konumları f blokta gösterilir.'], scene: 1 }],
    summary: ['<b>Son yerleşim türü bloğu, grup ortak özellikleri gösterir.</b>', 'He 8A grubunda, s bloktadır; H alkali metal değildir.', 'd: geçiş; f: iç geçiş metalleri (lantanit ve aktinit).'], nextLesson: { href: 'g1-iyon-olusumu.html', label: 'Sonraki: İyon oluşumu ›' } });
})();
