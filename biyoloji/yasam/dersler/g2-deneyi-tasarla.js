/* G2 · BİY.9.1.7 a · Yazar notu: içerik MEB Biyoloji 9 s. 76 (besinlerin içeriğini tahmin etme, bir besinin birden fazla
   sütuna yazılabilmesi, ayıraç ve deney planı), s. 75 (ayıraç tablosu ve renkler), s. 26–28 (kontrollü deney, kontrol grubu).
   Besinlerin içeriği: s. 55 (fasulye: protein), s. 58–59 (süt şekeri laktoz), s. 60 (nişasta: tohum, mısır), s. 62 (zeytinyağı,
   tereyağı), s. 64 (yumurta ve süt proteinleri). Anlatım 8 Ekim 2026'da baştan yazıldı: plan somut besinlerle kurulur,
   planlanan deneyin sonucu tüpte gösterilir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.G, IKINCI = 'var(--c2)';
  const BOS = '#3a4763', MAVIMOR = '#5f56d6', MOR = '#a55fd0';

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const karis = (a, b, e) => { const x = rgb(a), y = rgb(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * e)).join(',')})`; };

  /* Deney tüpü: x tüpün ortası, y ağzı. Besinin adı altında, sonuç onun altında yazar. */
  function tup(c, p, x, y, ad) {
    const g = c.S('g', {}, p);
    const sivi = c.S('path', { d: `M ${x - 42} ${y + 120} V ${y + 204} Q ${x - 42} ${y + 246} ${x} ${y + 246} Q ${x + 42} ${y + 246} ${x + 42} ${y + 204} V ${y + 120} Z`, fill: BOS }, g);
    c.S('path', { d: `M ${x - 50} ${y} V ${y + 204} Q ${x - 50} ${y + 254} ${x} ${y + 254} Q ${x + 50} ${y + 254} ${x + 50} ${y + 204} V ${y}`, fill: 'none', stroke: '#9aa7bc', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    K.yazi(c, g, x, y + 298, ad, { size: 28 });
    return { g, sivi, x, y };
  }
  async function ayrac(c, t, ad) {
    t.ayrac = K.yazi(c, t.g, t.x, t.y - 58, ad, { size: 26, renk: R });
    await K.belir(c, t.ayrac, 300);
  }
  const sonucYaz = (c, t, renk, sonuc) => K.belir(c, K.yazi(c, t.g, t.x, t.y + 336, sonuc, { size: 26, renk: renk ? 'var(--text)' : 'var(--muted)' }), 300);
  async function damlat(c, t, renk, sonuc) {
    const d = c.S('circle', { cx: t.x, cy: t.y - 34, r: 9, fill: '#dfe5f0' }, t.g);
    await c.tween(650, (e) => d.setAttribute('cy', t.y - 34 + 160 * e), Ders.ease.in);
    d.remove();
    if (renk) await c.tween(750, (e) => t.sivi.setAttribute('fill', karis(BOS, renk, e)));
    else await c.wait(450);
    await sonucYaz(c, t, renk, sonuc);
  }

  /* ---- Sahne 1 · Önce tahmin ---- */
  async function tahmin(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.yazi(c, g, 500, 62, 'Mısır · Yumurta · Zeytinyağı · Süt · Fasulye', { size: 28 }), 350);
    await c.say('Kahvaltıdaki besinlerde hangi molekül olduğunu deneyle göstermek istiyorsun.');
    await c.say('Deney, ilk damladan önce kâğıt üzerinde tasarlanır.');
    const sutunlar = ['Karbohidrat', 'Protein', 'Yağ'], dolu = [0, 0, 0];
    const tablo = c.S('g', {}, g);
    sutunlar.forEach((ad, i) => {
      K.kutu(c, tablo, 50 + i * 310, 110, 280, 330, { renk: R });
      K.yazi(c, tablo, 190 + i * 310, 160, ad, { size: 28, renk: R });
    });
    const yaz = (i, besin) => K.belir(c, K.yazi(c, g, 190 + i * 310, 230 + dolu[i]++ * 60, besin, { size: 28 }), 350);
    await K.belir(c, tablo);
    await c.say('Tasarım tahminle başlar: hangi besinde hangi molekül var?', { speak: '[curious] Tasarım tahminle başlar: hangi besinde hangi molekül var?' });
    await yaz(0, 'Mısır');
    await c.say('Mısır tanesi nişasta depolar; karbohidrat sütununa yazılır.');
    await Promise.all([yaz(2, 'Zeytinyağı'), yaz(1, 'Yumurta')]);
    await c.say('Zeytinyağı yağ sütununa, yumurta protein sütununa yazılır.');
    await Promise.all([yaz(1, 'Süt'), yaz(0, 'Süt')]);
    await c.say('Süt hem protein hem süt şekeri içerir; iki sütuna da yazılır.');
    await c.say('Bunlar tahmin; doğru olup olmadıklarını ayraçlar gösterecek.',
      { speak: '[thoughtful] Bunlar tahmin; doğru olup olmadıklarını ayraçlar gösterecek.' });
    await c.choice({ tag: 'Uygula', q: 'Fasulyede protein bulunur. Fasulye aynı zamanda bir tohumdur; tohumlar nişasta depolar. Fasulye nereye yazılır?',
      options: ['Yalnız protein sütununa', 'Protein ve karbohidrat sütunlarına', 'Yalnız yağ sütununa'], answer: 1,
      hints: ['Tohum olduğu için nişasta da bekleniyor; tek sütun yetmez.', '', 'Verilen iki bilgide yağdan söz edilmiyor.'],
      right: 'Bir besin, içerdiği her molekül için ayrı sütuna yazılır.' });
    await Promise.all([yaz(1, 'Fasulye'), yaz(0, 'Fasulye')]);
    await c.say('Fasulye iki sütunda: nişasta için de protein için de deney gerekecek.');
    c.note('<b>Önce tahmin: hangi besinde hangi molekül?</b><br>Süt: protein ve süt şekeri', 'Tahmin');
  }

  /* ---- Sahne 2 · Tahminden plana ---- */
  async function plan(c) {
    const s = c.svg(1000, 562), hatirla = c.S('g', {}, s);
    [['Lugol', 'Nişasta'], ['Benedict', 'Glikoz, fruktoz'], ['Biüret', 'Protein'], ['Sudan III/IV', 'Yağ']].forEach(([ad, molekul], i) => {
      K.kart(c, hatirla, 70 + (i % 2) * 450, 90 + Math.floor(i / 2) * 200, 410, 150, ad, [molekul], { renk: R });
    });
    await K.belir(c, hatirla);
    await c.say('Önceki dersten: Lugol nişastayı, Benedict şekeri, Biüret proteini, Sudan yağı arar.');
    await sil(c, hatirla);
    const g = c.S('g', {}, s);
    const xs = [130, 370, 610, 850], ys = [185, 270, 355];
    ['Besin', 'Aranan molekül', 'Ayraç', 'Beklenen renk'].forEach((ad, i) => K.yazi(c, g, xs[i], 95, ad, { size: 26, renk: R }));
    K.cizgi(c, g, 40, 125, 960, 125, R, { width: 2 });
    const satir = (j, hucreler) => {
      const r = c.S('g', {}, g);
      hucreler.forEach((v, i) => K.yazi(c, r, xs[i], ys[j], v, { size: 28 }));
      if (j < 2) K.cizgi(c, r, 40, ys[j] + 35, 960, ys[j] + 35, '#374561', { width: 2 });
      return r;
    };
    await K.belir(c, g);
    await c.say('Her tahmin, planda bir satıra dönüşür.');
    await c.say('Satırda dört şey yazar: besin, aranan molekül, ayraç, beklenen renk.');
    await K.belir(c, satir(0, ['Mısır', 'Nişasta', 'Lugol', 'mavi-mor']));
    await c.say('Mısırda nişasta aranacak: ayraç Lugol, beklenen renk mavi-mor.', { speak: 'Mısırda nişasta aranacak: ayraç Lugol, beklenen renk mavi mor.' });
    await c.say('Ayracı besinin adı değil, aranan molekül belirler.');
    await c.say('Beklenen rengi yazarsan tüpte neye bakacağını bilirsin.');
    const yumurta = satir(1, ['Yumurta', 'Protein', '?', '?']);
    await K.belir(c, yumurta);
    await c.choice({ tag: 'Sıra sende', q: 'Yumurta satırını tamamla: protein hangi ayraçla aranır, hangi renk beklenir?',
      options: ['Lugol; mavi-mor', 'Benedict; kiremit kırmızısı', 'Biüret; açık mavi ya da mor'], answer: 2,
      hints: ['Lugol nişastayı arar; proteini göstermez.', 'Benedict glikoz ve fruktozu arar; proteini göstermez.', ''],
      right: 'Proteini Biüret arar; bulursa açık mavi ya da mor renk oluşur.' });
    yumurta.children[2].textContent = 'Biüret'; yumurta.children[3].textContent = 'açık mavi, mor';
    const yag = satir(2, ['Zeytinyağı', 'Yağ', 'Lugol', 'mavi-mor']);
    await K.belir(c, yag);
    await c.say('Bir arkadaşın zeytinyağı satırını böyle doldurmuş.');
    await c.choice({ tag: 'Uygula', q: 'Zeytinyağı satırında düzeltilmesi gereken ne?',
      options: ['Ayraç ve renk: yağı Sudan arar.', 'Aranan molekül: zeytinyağında nişasta aranmalı.', 'Besin: zeytinyağı test edilemez.'], answer: 0,
      hints: ['', 'Zeytinyağı bir yağdır; aranan molekül doğru yazılmış.', 'Zeytinyağına da ayraç damlatılabilir; sorun besinde değil.'],
      right: 'Aranan molekül yağ; yağı Lugol değil Sudan arar.' });
    yag.children[2].textContent = 'Sudan III/IV'; yag.children[3].textContent = 'kırmızı, turuncu';
    [2, 3].forEach((i) => { yag.children[i].style.fill = R; });
    await c.say('Yağ aranıyorsa ayraç Sudan, beklenen renk kırmızı ya da turuncudur.');
    c.note('<b>Plan satırı: besin, aranan molekül, ayraç, beklenen renk.</b><br>Mısır · nişasta · Lugol · mavi-mor', 'Deney planı');
  }

  /* ---- Sahne 3 · Kontrol tüpü ---- */
  async function kontrol(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const misir = tup(c, g, 300, 175, 'Mısır');
    K.yazi(c, misir.g, 300, 58, 'Deney tüpü', { size: 28 });
    await K.belir(c, misir.g);
    await c.say('Rengin değiştiğini anlamak için karşılaştıracak ikinci bir tüp gerekir.');
    const su = tup(c, g, 700, 175, 'Su');
    K.yazi(c, su.g, 700, 58, 'Kontrol tüpü', { size: 28, renk: IKINCI });
    await K.belir(c, su.g);
    await c.say('Buna kontrol tüpü denir: besin yerine yalnızca su konur.',
      { speak: 'Buna [short pause] kontrol tüpü denir: besin yerine yalnızca su konur.' });
    await Promise.all([ayrac(c, misir, 'Lugol'), ayrac(c, su, 'Lugol')]);
    await c.say('İki tüpe de aynı ayraç, aynı miktarda damlatılır.');
    await c.say('Böylece iki tüp arasındaki tek fark besindir.');
    await c.choice({ q: 'Mısırda nişasta varsa, Lugol damlatılınca iki tüpte ne görülür?',
      options: ['İki tüp de mavi-mor olur.', 'Mısır tüpü mavi-mor olur; kontrol tüpünde renk oluşmaz.', 'Yalnız kontrol tüpü mavi-mor olur.'], answer: 1,
      hints: ['Suda nişasta yok; kontrol tüpünde Lugolün bulacağı bir şey yok.', '', 'Nişasta mısır tüpünde; renk orada beklenir.'],
      right: 'Renk yalnızca nişastanın bulunduğu tüpte oluşur.' });
    await Promise.all([damlat(c, misir, MAVIMOR, 'mavi-mor'), damlat(c, su, null, 'renk oluşmadı')]);
    await c.say('Mısır tüpü mavi-mor oldu; kontrol tüpünde renk oluşmadı.', { speak: 'Mısır tüpü mavi mor oldu; kontrol tüpünde renk oluşmadı.' });
    await c.say('Fark besinden geliyor: mısırda nişasta var.');
    c.note('<b>Kontrol tüpü: besin yok, yalnızca su ve aynı ayraç.</b><br>Tek fark besin olmalı.', 'Kontrol tüpü');
  }

  /* ---- Sahne 4 · İki molekül, iki tüp ---- */
  async function ikiTup(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const baslik = K.yazi(c, g, 500, 58, 'Fasulye: nişasta ve protein tahmini', { size: 28 });
    await K.belir(c, baslik, 350);
    await c.say('Fasulye için iki tahmin vardı: nişasta ve protein.');
    const bir = tup(c, g, 300, 175, 'Fasulye · 1. tüp'), iki = tup(c, g, 700, 175, 'Fasulye · 2. tüp');
    await Promise.all([K.belir(c, bir.g), K.belir(c, iki.g)]);
    await c.say('Aranan her molekül için ayrı bir tüp hazırlanır.');
    await c.say('Çünkü aynı tüpte iki ayracın rengi birbirine karışır.');
    await Promise.all([ayrac(c, bir, 'Lugol'), ayrac(c, iki, '?')]);
    await c.choice({ tag: 'Uygula', q: 'Birinci fasulye tüpüne Lugol damlatılacak. İkinci tüpe hangi ayraç damlatılır?',
      options: ['Biüret', 'Yine Lugol', 'Sudan III/IV'], answer: 0,
      hints: ['', 'Lugol nişastayı zaten birinci tüpte arıyor.', 'Sudan yağı arar; tahminlerde yağ yoktu.'],
      right: 'İkinci tahmin proteindi; proteini Biüret arar.' });
    iki.ayrac.textContent = 'Biüret';
    baslik.textContent = 'Tahminler doğruysa beklenen renkler';
    await Promise.all([
      c.tween(750, (e) => bir.sivi.setAttribute('fill', karis(BOS, MAVIMOR, e))),
      c.tween(750, (e) => iki.sivi.setAttribute('fill', karis(BOS, MOR, e))),
    ]);
    await Promise.all([sonucYaz(c, bir, MAVIMOR, 'mavi-mor'), sonucYaz(c, iki, MOR, 'açık mavi ya da mor')]);
    await c.say('Tahminler doğruysa birinci tüp mavi-mor, ikinci tüp mor olur.', { speak: 'Tahminler doğruysa birinci tüp mavi mor, ikinci tüp mor olur.' });
    await sil(c, g);
    const ozet = c.S('g', {}, s);
    ['Tahmin', 'Plan satırı', 'Kontrol tüpü', 'Ayrı tüpler'].forEach((ad, i) => {
      K.kutu(c, ozet, 35 + i * 240, 210, 210, 110, { renk: R });
      K.yazi(c, ozet, 140 + i * 240, 275, ad, { size: 28 });
      if (i < 3) K.ok(c, ozet, 248 + i * 240, 265, 272 + i * 240, 265, R);
    });
    await K.belir(c, ozet);
    await c.say('Plan tamam: tahmin, plan satırı, kontrol tüpü, her molekül için ayrı tüp.');
  }

  Ders.start({
    id: 'yasam-g2', kicker: 'Konu G · Besinlerde organik molekül arama', title: 'Deneyi tasarla: hangi besin, hangi ayraç', accent: R, back: 'index.html',
    intro: { title: 'Deneyi tasarla: hangi besin, hangi ayraç', hook: 'Damlayı damlatmadan önce neye karar vermen gerekir?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Önce tahmin', goal: 'Besinleri molekül sütunlarına yaz.', run: tahmin },
      { title: 'Tahminden plana', goal: 'Plan satırını tamamla ve düzelt.', run: plan },
      { title: 'Kontrol tüpü', goal: 'Deney tüpünü kontrolle karşılaştır.', run: kontrol },
      { title: 'İki molekül, iki tüp', goal: 'Her molekül için ayrı tüp planla.', run: ikiTup },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Tereyağında yağ aranacak. Plan satırı hangisi olmalı?',
        options: ['Tereyağı · yağ · Lugol · mavi-mor', 'Tereyağı · protein · Sudan III/IV · mor', 'Tereyağı · yağ · Sudan III/IV · kırmızı ya da turuncu'], answer: 2,
        why: ['Lugol nişastayı arar; yağ için Sudan gerekir.', 'Aranan molekül yağ; Sudanın beklenen rengi de mor değil.', 'Yağı Sudan arar; beklenen renk kırmızı ya da turuncudur.'], scene: 1 },
      { q: 'Sütte protein aranıyor. Kontrol tüpüne ne konur?',
        options: ['Süt; ayraç damlatılmaz', 'Su ve Biüret', 'Süt ve Lugol'], answer: 1,
        why: ['Kontrol tüpünde besin olmaz; ayraç ise iki tüpe de damlatılır.', 'Kontrol tüpünde besin yerine su, deney tüpündeki ayracın aynısı bulunur.', 'Kontrol tüpüne besin konmaz; ayraç da deney tüpündekiyle aynı olmalı.'], scene: 2 },
    ], summary: ['<b>Önce plan, sonra damla.</b>', 'Tahmin → aranan molekül → ayraç → beklenen renk; yanında kontrol tüpü.'],
    nextLesson: { href: 'g3-sonucu-analiz-et.html', label: 'Sonraki: Deneyi yap, sonucu analiz et ›' },
  });
})();
