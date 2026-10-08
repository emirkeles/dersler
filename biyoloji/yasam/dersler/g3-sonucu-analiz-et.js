/* G3 · BİY.9.1.7 b · Yazar notu: içerik MEB Biyoloji 9 s. 77 (bulgu tablosu: besin, ayıraç, gözlem, sonuç; renk değişimi
   görülmezse farklı ayıraçla tekrar; ekiplerin farklı bulgularının nedenlerini arama), s. 75 (ayıraçlar ve renkler).
   Besinlerin içeriği: s. 58 (fruktoz: bal; nişasta bitkilerde depolanır), s. 60 (nişasta: mısır tohumu), s. 62 (zeytinyağı),
   s. 64 (süt ve yumurta proteinleri). Anlatım 8 Ekim 2026'da baştan yazıldı: deney tüpte yapılır, sonuç görülür,
   kaydedilir ve yorumlanır; beklenmeyen sonuçta hata bulunup deney tekrarlanır. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.G, IKINCI = 'var(--c2)';
  const BOS = '#3a4763', MAVIMOR = '#5f56d6', KIREMIT = '#b9553d', MOR = '#a55fd0', KIRMIZI = '#e2493f';

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
  /* Damla düşer; renk verilmişse sıvı o renge döner. Sonuç tüpün altına yazılır. */
  async function damlat(c, t, renk, sonuc) {
    const d = c.S('circle', { cx: t.x, cy: t.y - 34, r: 9, fill: '#dfe5f0' }, t.g);
    await c.tween(650, (e) => d.setAttribute('cy', t.y - 34 + 160 * e), Ders.ease.in);
    d.remove();
    if (renk) await c.tween(750, (e) => t.sivi.setAttribute('fill', karis(BOS, renk, e)));
    else await c.wait(450);
    if (t.sonuc) t.sonuc.remove();
    t.sonuc = K.yazi(c, t.g, t.x, t.y + 336, sonuc, { size: 26, renk: renk ? 'var(--text)' : 'var(--muted)' });
    await K.belir(c, t.sonuc, 300);
  }

  /* ---- Sahne 1 · Gözlem ve sonuç ---- */
  async function kayit(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const sut = tup(c, g, 140, 165, 'Süt'), su = tup(c, g, 340, 165, 'Su');
    await Promise.all([K.belir(c, sut.g), K.belir(c, su.g)]);
    await Promise.all([ayrac(c, sut, 'Biüret'), ayrac(c, su, 'Biüret')]);
    await c.say('Plan hazır: süt tüpüne ve kontrol tüpüne Biüret damlatılıyor.');
    await Promise.all([damlat(c, sut, MOR, 'mor'), damlat(c, su, null, 'renk oluşmadı')]);
    await c.say('Süt tüpü mor oldu; kontrol tüpünde renk oluşmadı.');
    const kart = c.S('g', {}, g);
    K.kutu(c, kart, 490, 105, 470, 330, { renk: R });
    K.yazi(c, kart, 725, 155, 'Deney kaydı', { size: 28, renk: R });
    const yaz = (i, metin, renk) => K.yazi(c, kart, 520, 220 + i * 58, metin, { size: 26, hiza: 'start', renk });
    yaz(0, 'Besin: süt'); yaz(1, 'Ayraç: Biüret');
    await K.belir(c, kart);
    await c.say('Görülenler hemen kayda geçirilir: besin süt, ayraç Biüret.');
    await K.belir(c, yaz(2, 'Gözlem: renk değişimi var, mor'), 350);
    await c.say('Gözlem satırına görülen yazılır: renk değişimi var, renk mor.');
    const sonuc = yaz(3, 'Sonuç: ?', IKINCI);
    await K.belir(c, sonuc, 350);
    await c.say('Sonuç satırı, bu gözlemin ne anlama geldiğini söyler.');
    await c.choice({ tag: 'Uygula', q: 'Sonuç satırına ne yazılır?',
      options: ['Karışım mor oldu.', 'Sütte protein var.', 'Sütte nişasta var.'], answer: 1,
      hints: ['Bu, gözlemin kendisi; sonuç onun ne anlama geldiğini söyler.', '', 'Nişastayı Lugol arar; bu tüpe Biüret damlatıldı.'],
      right: 'Biüret proteini arar; mor renk sütte protein olduğunu gösterir.' });
    sonuc.textContent = 'Sonuç: sütte protein var';
    await c.say('Gözlem gördüğündür; sonuç, gözlemden çıkardığındır.',
      { speak: 'Gözlem gördüğündür; [short pause] sonuç, gözlemden çıkardığındır.' });
    c.note('<b>Önce gözlem, sonra sonuç.</b><br>Mor renk → sütte protein var', 'Deney kaydı');
  }

  /* ---- Sahne 2 · Tabloyu oku ---- */
  async function tablo(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const ys = [175, 255, 335, 415];
    [[115, 'Besin'], [320, 'Ayraç'], [560, 'Renk'], [860, 'Sonuç']].forEach(([x, ad]) => K.yazi(c, g, x, 90, ad, { size: 26, renk: R }));
    K.cizgi(c, g, 30, 120, 970, 120, R, { width: 2 });
    const satirlar = [['Mısır', 'Lugol', MAVIMOR, 'mavi-mor', 'Nişasta'], ['Bal', 'Benedict', KIREMIT, 'kiremit kırmızısı', 'Glikoz, fruktoz'],
      ['Zeytinyağı', 'Sudan III/IV', KIRMIZI, 'kırmızı', 'Yağ'], ['Süt', 'Biüret', MOR, 'mor', 'Protein']];
    const sonuc = satirlar.map(([besin, ad, renk, renkAd], j) => {
      K.yazi(c, g, 115, ys[j], besin, { size: 28 });
      K.yazi(c, g, 320, ys[j], ad, { size: 28 });
      c.S('circle', { cx: 450, cy: ys[j] - 9, r: 15, fill: renk }, g);
      K.yazi(c, g, 478, ys[j], renkAd, { size: 28, hiza: 'start' });
      if (j < 3) K.cizgi(c, g, 30, ys[j] + 32, 970, ys[j] + 32, '#374561', { width: 2 });
      return K.yazi(c, g, 860, ys[j], j === 3 ? 'Protein' : '', { size: 28, renk: IKINCI });
    });
    const doldur = (j) => { sonuc[j].textContent = satirlar[j][4]; return K.belir(c, sonuc[j], 350); };
    await K.belir(c, g);
    await c.say('Ekip dört besini test etti ve gördüğü renkleri tabloya yazdı.');
    await doldur(0);
    await c.say('Mısır Lugol ile mavi-mor oldu: mısırda nişasta var.', { speak: 'Mısır Lugol ile mavi mor oldu: mısırda nişasta var.' });
    await doldur(2);
    await c.say('Zeytinyağı Sudan ile kırmızı oldu: zeytinyağında yağ var.');
    sonuc[1].textContent = '?';
    await c.choice({ tag: 'Uygula', q: 'Bal tüpü Benedict ile kiremit kırmızısı oldu. Sonuç sütununa ne yazılır?',
      options: ['Glikoz ya da fruktoz', 'Nişasta', 'Protein'], answer: 0,
      hints: ['', 'Nişastayı Lugol arar; bala Benedict damlatıldı.', 'Proteini Biüret arar; bala Benedict damlatıldı.'],
      right: 'Benedict glikoz ve fruktozu arar; balda bu şekerlerden var.' });
    await doldur(1);
    await c.say('Her satır yalnızca denenen ayracın aradığı molekülü anlatır.',
      { speak: '[thoughtful] Her satır yalnızca denenen ayracın aradığı molekülü anlatır.' });
    await c.say('Mısıra yalnızca Lugol damlatıldı; Biüret ya da Sudan denenmedi.');
    await c.choice({ tag: 'Uygula', q: 'Bu tabloya göre mısır için hangisi söylenebilir?',
      options: ['Mısırda protein yok.', 'Mısırda yalnızca nişasta var.', 'Mısırda nişasta var; protein için deney yapılmadı.'], answer: 2,
      hints: ['Mısıra Biüret damlatılmadı; protein hakkında bilgi yok.', 'Öteki moleküller aranmadı; “yalnızca” denemez.', ''],
      right: 'Denenmeyen ayracın molekülü hakkında sonuç yazılamaz.' });
    await c.say('Mısırda protein aramak için yeni bir tüp ve Biüret gerekir.');
  }

  /* ---- Sahne 3 · Renk oluşmadıysa ---- */
  async function hata(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const ilk = tup(c, g, 150, 175, 'Yumurta');
    await K.belir(c, ilk.g);
    await ayrac(c, ilk, 'Ayraç');
    await damlat(c, ilk, null, 'renk oluşmadı');
    await c.say('Ekip yumurta tüpüne ayracı damlattı; renk oluşmadı.');
    const kart = c.S('g', {}, g);
    K.kutu(c, kart, 530, 95, 430, 200, { renk: R });
    K.yazi(c, kart, 560, 150, 'Aranan: protein', { size: 26, hiza: 'start' });
    K.yazi(c, kart, 560, 205, 'Beklenen: mor renk', { size: 26, hiza: 'start' });
    K.yazi(c, kart, 560, 260, 'Görülen: renk oluşmadı', { size: 26, hiza: 'start', renk: IKINCI });
    await K.belir(c, kart);
    await c.say('Oysa yumurtada protein bulunur; planda mor renk bekleniyordu.', { speak: '[curious] Oysa yumurtada protein bulunur; planda mor renk bekleniyordu.' });
    await c.say('Renk oluşmamasının iki nedeni olabilir.');
    const neden = c.S('g', {}, g);
    K.yazi(c, neden, 745, 365, 'Molekül yok mu?', { size: 28 });
    K.yazi(c, neden, 745, 420, 'Deney hatalı mı?', { size: 28 });
    await K.belir(c, neden, 350);
    await c.say('Ya aranan molekül yoktur ya da deneyde bir hata vardır.');
    await c.say('Beklenmeyen sonuçta önce deney kontrol edilir.');
    ilk.ayrac.textContent = 'Lugol'; ilk.ayrac.style.fill = IKINCI;
    neden.firstChild.style.opacity = 0.35; neden.lastChild.style.fill = IKINCI;
    await K.belir(c, ilk.ayrac, 350);
    await c.say('Ekip şişeye bakıyor: yumurtaya Biüret yerine Lugol damlatılmış.');
    await c.choice({ tag: 'Uygula', q: 'Yumurtaya yanlış ayraç damlatılmış. Şimdi ne yapılır?',
      options: ['“Yumurtada protein yok” yazılır.', 'Deney Biüret ile tekrarlanır.', 'Kayda beklenen renk, yani mor yazılır.'], answer: 1,
      hints: ['Lugol proteini aramaz; bu tüp protein için bir şey söylemez.', '', 'Kayda yalnızca görülen yazılır; mor renk görülmedi.'],
      right: 'Hata yöntemde; doğru ayraçla yeni bir tüp gerekir.' });
    const tekrar = tup(c, g, 370, 175, 'Yumurta');
    await K.belir(c, tekrar.g);
    await ayrac(c, tekrar, 'Biüret');
    await damlat(c, tekrar, MOR, 'mor');
    await c.say('Tekrarda yumurta tüpü mor oldu: yumurtada protein var.');
    c.note('<b>Beklenmeyen sonuç, önce deneyi sorgulatır.</b><br>Yanlış ayraç → doğru ayraçla tekrar', 'Tekrar');
  }

  /* ---- Sahne 4 · Aynı besin, farklı bulgu ---- */
  async function ikiEkip(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const bir = tup(c, g, 290, 150, '1. ekip · süt'), iki = tup(c, g, 710, 150, '2. ekip · süt');
    await Promise.all([K.belir(c, bir.g), K.belir(c, iki.g)]);
    await Promise.all([ayrac(c, bir, 'Biüret'), ayrac(c, iki, 'Biüret')]);
    await c.say('İki ekip aynı sütü Biüret ile test etti.');
    await Promise.all([damlat(c, bir, MOR, 'mor'), damlat(c, iki, null, 'renk oluşmadı')]);
    await c.say('Birinci ekibin tüpü mor oldu; ikinci ekibin tüpünde renk oluşmadı.');
    await c.say('Besin aynı, ayraç aynı; sonucun da aynı olması gerekirdi.');
    await c.say('Bu yüzden iki ekip yaptıklarını adım adım karşılaştırır.');
    const not = K.yazi(c, g, 710, 530, 'Tüpler etiketsiz', { size: 26, renk: IKINCI });
    await K.belir(c, not, 350);
    await c.say('İkinci ekip tüplerini etiketlememiş; süt tüpüyle kontrol tüpü karışmış.');
    await c.choice({ tag: 'Uygula', q: 'İkinci ekip ne yapmalı?',
      options: ['Tüpleri etiketleyip deneyi tekrarlamalı.', 'Sonucunu birinci ekibe bakarak “mor” diye değiştirmeli.', '“Sütte protein yok” yazıp bırakmalı.'], answer: 0,
      hints: ['', 'Kayda yalnızca görülen yazılır; sonuç yeni deneyden gelmeli.', 'Damla süte değil suya düşmüş olabilir; bu sonuç süte ait değil.'],
      right: 'Hata düzeltilir, deney tekrarlanır; sonuç yeni gözlemden yazılır.' });
    not.textContent = 'Tüpler etiketli · tekrar';
    await damlat(c, iki, MOR, 'mor');
    await c.say('Tekrarda ikinci ekibin süt tüpü de mor oldu.');
    await c.say('Artık iki sonuç uyuşuyor: sütte protein var.');
  }

  Ders.start({
    id: 'yasam-g3', kicker: 'Konu G · Besinlerde organik molekül arama', title: 'Deneyi yap, sonucu analiz et', accent: R, back: 'index.html',
    intro: { title: 'Deneyi yap, sonucu analiz et', hook: 'Tüpte renk oluşmadı: molekül mü yok, deney mi hatalı?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Gözlem ve sonuç', goal: 'Gözlemi sonuçtan ayırarak kaydet.', run: kayit },
      { title: 'Tabloyu oku', goal: 'Her satırdan çıkan sonucu bul.', run: tablo },
      { title: 'Renk oluşmadıysa', goal: 'Hatayı bul, deneyi tekrarla.', run: hata },
      { title: 'Aynı besin, farklı bulgu', goal: 'Farklı bulgunun nedenini ara.', run: ikiEkip },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Zeytinyağında yağ aranıyordu; tüpe yanlışlıkla Biüret damlatıldı ve renk oluşmadı. Ne yapılır?',
        options: ['“Zeytinyağında yağ yok” yazılır.', 'Kayda kırmızı yazılır.', 'Deney Sudan ile tekrarlanır.'], answer: 2,
        why: ['Biüret yağı aramaz; bu tüp yağ için bir şey söylemez.', 'Kayda yalnızca görülen renk yazılır.', 'Yağı Sudan arar; doğru ayraçla tekrar gerekir.'], scene: 2 },
      { q: 'Kayıtta yalnızca “Bal · Benedict · kiremit kırmızısı” satırı var. Hangisi söylenebilir?',
        options: ['Balda glikoz ya da fruktoz var.', 'Balda protein yok.', 'Balda yalnızca şeker var.'], answer: 0,
        why: ['Benedict bu şekerleri arar; renk oluştuğuna göre bulmuştur.', 'Bala Biüret damlatılmadı; protein hakkında bilgi yok.', 'Öteki moleküller aranmadı; “yalnızca” denemez.'], scene: 1 },
      { q: 'Pirinç tüpü de kontrol tüpü de Lugol damlatılınca mavi-mor oldu. Ne yapılır?',
        options: ['Pirinçte nişasta olduğu yazılır; iki tüpte de renk oluştuğu için sonuç kesindir.', 'Deneyden kuşkulanılır; adımlar gözden geçirilip deney tekrarlanır.', 'Pirinçte nişasta olmadığı yazılır; kontrol tüpüyle aynı renk çıkmıştır.'], answer: 1,
        why: ['Kontrol tüpünde renk oluşmaması gerekir; renk oluştuysa sonuca güvenilemez.', 'Kontrol tüpü yalnızca su içerir; renk çıkması deneyde bir hata olduğunu gösterir.', 'Aynı rengin çıkması nişasta olmadığını göstermez; önce deneyin hatası aranır.'], scene: 2 },
      { q: 'Bir öğrenci tavuk tüpüne Biüret damlattı, tüp mor oldu. Gözlem satırına “Tavukta protein var.” yazdı. Bu satır için ne söylenir?',
        options: ['Doğru; gözlem satırına molekülün adı yazılır.', 'Yanlış; gözlem satırına yalnızca ayracın adı yazılır.', 'Yanlış; gözlem satırına görülen renk yazılır, “protein var” sonuç satırına gider.'], answer: 2,
        why: ['“Protein var” gözlemin ne anlama geldiğidir, yani sonuçtur.', 'Ayraç ayrı bir satırda yazılır; gözlem satırı görülen renk değişimini anlatır.', 'Gözlem gördüğündür; sonuç, gözlemden çıkardığındır.'], scene: 0 },
    ], summary: ['<b>Beklenmeyen sonuç, önce deneyi sorgulatır.</b>', 'Gözlemi yaz, sonucu çıkar; renk oluşmadıysa deneyi kontrol et ve tekrarla.'],
    nextLesson: { href: 'g4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
