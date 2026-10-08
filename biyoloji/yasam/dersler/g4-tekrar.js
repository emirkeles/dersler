/* G4 — Konu tekrarı: Besinlerde organik molekül arama
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.G, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);

    // Ayraç (G1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 150, 'Ayraç', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 250, 'aradığı molekülle renk değiştirir', { size: 32 });
    K.yazi(c, g1, 500, 330, 'renk oluşmadı: bulunamadı', { size: 32 });
    K.yazi(c, g1, 500, 440, 'Var ya da yok der; miktarı söylemez', { size: 28, renk: SOLUK });
    await goster(g1, 'Ayraç, aradığı molekülle karşılaşınca renk değiştirir.');
    await c.say('Renk oluşmazsa aranan molekül bulunamadı demektir.');
    await c.say('Renk yalnızca var ya da yok der; miktarı söylemez.');
    c.note('<b>Ayraç, aradığı molekülle renk değiştirir.</b><br>Nişasta + Lugol → mavi-mor', 'Ayraç', 'yasam-ayrac');
    await sil(g1);

    // Dört ayraç (G1)
    const g2 = c.S('g', {}, svg);
    K.yazi(c, g2, 500, 70, 'Dört ayraç', { size: 36, kalin: 700 });
    const satir = (i, ad, mol, nokta, rengi, r) => {
      const g = c.S('g', {}, g2), y = 175 + i * 95;
      g.style.opacity = 0;
      K.yazi(c, g, 70, y, ad + ': ' + mol, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, 460, y - 10, 530, y - 10, r);
      c.S('circle', { cx: 570, cy: y - 10, r: 15, fill: nokta }, g);
      K.yazi(c, g, 605, y, rengi, { size: 30, hiza: 'start' });
      return g;
    };
    const ilk = [satir(0, 'Lugol', 'nişasta', '#6a4fd6', 'mavi-mor', renk), satir(1, 'Benedict', 'glikoz, fruktoz', '#b8452c', 'kiremit kırmızısı', renk)];
    const son = [satir(2, 'Biüret', 'protein', '#8f9cf0', 'açık mavi ya da mor', IKINCI), satir(3, 'Sudan III/IV', 'yağ', '#ff7a3d', 'kırmızı ya da turuncu', IKINCI)];
    const hepsi = (els) => c.tween(400, (e) => els.forEach((el) => { el.style.opacity = e; }));
    await Promise.all([c.say('Lugol nişastayı, Benedict glikoz ve fruktozu arar.'), hepsi(ilk)]);
    await Promise.all([c.say('Biüret proteini, Sudan yağı arar.'), hepsi(son)]);
    await c.say('Her ayraç kendi molekülünü arar ve kendi rengini verir.');
    c.note('<b>Lugol nişastayı, Benedict şekeri, Biüret proteini, Sudan yağı arar.</b>', 'Dört ayraç', 'yasam-dort-ayrac');
    await sil(g2);

    // Plan satırı (G2)
    const g3 = yeni();
    K.yazi(c, g3, 500, 90, 'Plan satırı', { size: 40, kalin: 700, renk });
    [['Besin', 'Mısır'], ['Aranan molekül', 'nişasta'], ['Ayraç', 'Lugol'], ['Beklenen renk', 'mavi-mor']].forEach(([ad, ornek], i) => {
      const x = 35 + i * 240;
      K.kutu(c, g3, x, 160, 210, 170);
      K.yazi(c, g3, x + 105, 215, ad, { size: 24, renk: i === 1 ? IKINCI : renk });
      K.cizgi(c, g3, x + 15, 240, x + 195, 240, '#5b678f');
      K.yazi(c, g3, x + 105, 295, ornek, { size: 28 });
    });
    K.yazi(c, g3, 500, 440, 'Ayracı aranan molekül belirler', { size: 32, kalin: 700, renk: YESIL });
    await goster(g3, 'Her tahmin, planda bir satıra dönüşür.');
    await c.say('Satırda besin, aranan molekül, ayraç ve beklenen renk yazar.');
    await c.say('Ayracı besinin adı değil, aranan molekül belirler.');
    c.note('<b>Plan satırı: besin, aranan molekül, ayraç, beklenen renk.</b><br>Mısır · nişasta · Lugol · mavi-mor', 'Deney planı', 'yasam-deney-plani');
    await sil(g3);

    // Kontrol tüpü (G2)
    const g4 = yeni();
    K.kart(c, g4, 110, 120, 360, 200, 'Deney tüpü', ['besin + ayraç'], { renk });
    K.kart(c, g4, 530, 120, 360, 200, 'Kontrol tüpü', ['su + aynı ayraç'], { renk: IKINCI });
    K.yazi(c, g4, 500, 430, 'Tek fark besin olmalı', { size: 36, kalin: 700, renk: YESIL });
    await goster(g4, 'Kontrol tüpünde besin yerine yalnızca su bulunur.');
    await c.say('İki tüpe de aynı ayraç, aynı miktarda damlatılır.');
    await c.say('Böylece iki tüp arasındaki tek fark besindir.');
    c.note('<b>Kontrol tüpü: besin yok, yalnızca su ve aynı ayraç.</b><br>Tek fark besin olmalı.', 'Kontrol tüpü', 'yasam-kontrol-tupu');
    await sil(g4);

    // Ayrı tüpler (G2)
    const g5 = yeni();
    K.yazi(c, g5, 500, 90, 'Aranan her molekül için ayrı tüp', { size: 34, kalin: 700 });
    K.kart(c, g5, 110, 160, 360, 220, 'Birinci tüp', ['nişasta', 'Lugol'], { renk });
    K.kart(c, g5, 530, 160, 360, 220, 'İkinci tüp', ['protein', 'Biüret'], { renk: IKINCI });
    K.yazi(c, g5, 500, 460, 'İki ayraç aynı tüpte karışır', { size: 28, renk: SOLUK });
    await goster(g5, 'Aranan her molekül için ayrı bir tüp hazırlanır.');
    await c.say('Çünkü aynı tüpte iki ayracın rengi birbirine karışır.');
    c.note('<b>Aranan her molekül için ayrı tüp.</b><br>Aynı tüpte iki ayracın rengi karışır.', 'Ayrı tüpler', 'yasam-ayri-tupler');
    await sil(g5);

    // Gözlem ve sonuç (G3)
    const g6 = yeni();
    K.yazi(c, g6, 250, 150, 'Gözlem', { size: 40, kalin: 700, renk });
    K.yazi(c, g6, 250, 215, 'gördüğün', { size: 28 });
    K.yazi(c, g6, 250, 255, 'tüp mor oldu', { size: 28 });
    K.ok(c, g6, 420, 140, 570, 140, SOLUK);
    K.yazi(c, g6, 750, 150, 'Sonuç', { size: 40, kalin: 700, renk: IKINCI });
    K.yazi(c, g6, 750, 215, 'çıkardığın', { size: 28 });
    K.yazi(c, g6, 750, 255, 'sütte protein var', { size: 28 });
    K.yazi(c, g6, 500, 400, 'Önce görülen yazılır', { size: 34, kalin: 700, renk: YESIL });
    await goster(g6, 'Kayda önce gördüğün, yani gözlem yazılır.');
    await c.say('Sonuç, gözlemden çıkardığın anlamdır.');
    await c.say('Süt tüpü mor oldu; sonuç, sütte protein olduğudur.');
    c.note('<b>Önce gözlem, sonra sonuç.</b><br>Mor renk → sütte protein var', 'Deney kaydı', 'yasam-deney-kaydi');
    await sil(g6);

    // Beklenmeyen sonuç (G3)
    const g7 = yeni();
    K.yazi(c, g7, 500, 110, 'Beklenmeyen sonuç', { size: 42, kalin: 700, renk });
    K.yazi(c, g7, 500, 215, 'Molekül yok mu?', { size: 32 });
    K.yazi(c, g7, 500, 275, 'Deney hatalı mı?', { size: 32 });
    K.yazi(c, g7, 500, 375, 'Önce deney kontrol edilir', { size: 36, kalin: 700, renk: YESIL });
    K.yazi(c, g7, 500, 455, 'Yanlış ayraç: doğru ayraçla tekrar', { size: 28, renk: SOLUK });
    await goster(g7, 'Renk oluşmadıysa ya molekül yoktur ya deneyde hata vardır.');
    await c.say('Beklenmeyen sonuçta önce deney kontrol edilir.');
    await c.say('Hata bulunursa düzeltilir ve deney tekrarlanır.');
    c.note('<b>Beklenmeyen sonuç, önce deneyi sorgulatır.</b><br>Yanlış ayraç → doğru ayraçla tekrar', 'Tekrar', 'yasam-beklenmeyen-sonuc');
    await c.say('Şimdi üç dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-g4', kicker: 'Konu G · Besinlerde organik molekül arama', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Besinlerde organik molekül arama',
      hook: 'Üç dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Üç dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Makarna tüpüne Lugol damlatıldı. Aşağıdakilerden hangisi bir sonuçtur, gözlem değildir?',
        options: ['Tüp mavi-mor oldu.', 'Kontrol tüpünde renk oluşmadı.', 'Makarnada nişasta var.'], answer: 2,
        why: ['Bu, tüpte görülen renktir; yani gözlemdir.', 'Bu da görülendir; gözlem satırına yazılır.', 'Görülenden çıkarılan anlam sonuçtur: mavi-mor renk nişasta olduğunu gösterir.'], scene: 0,
      },
      {
        q: 'Ceviz ezmesine Sudan III/IV damlatılınca turuncu renk oluştu. Hangisi söylenebilir?',
        options: ['Ezmede yağ var; ne kadar olduğunu bu renk söylemez.', 'Ezmede hem yağ hem protein var.', 'Ezmede en çok bulunan molekül yağdır.'], answer: 0,
        why: ['Sudan yağı arar; renk yalnızca var ya da yok der.', 'Sudan yalnızca yağı arar; protein için Biüret gerekir.', 'Renk miktar söylemez; hangi molekülün en çok olduğu bu tüpten çıkmaz.'], scene: 0,
      },
      {
        q: 'Elma için hazırlanan plan satırında ayraç Benedict, beklenen renk kiremit kırmızısı yazıyor. Aranan molekül sütununa ne yazılmalı?',
        options: ['Nişasta', 'Glikoz ya da fruktoz', 'Protein'], answer: 1,
        why: ['Nişastayı Lugol arar; beklenen renk de mavi-mor olurdu.', 'Benedict glikoz ve fruktozu arar; bulursa kiremit kırmızısı renk oluşur.', 'Proteini Biüret arar; beklenen renk de açık mavi ya da mor olurdu.'], scene: 0,
      },
      {
        q: 'Nohut tüpünde Biüret ile mor renk oluştu; nohuta başka ayraç denenmedi. Bu kayıttan hangisi söylenebilir?',
        options: ['Nohutta protein var; nişasta için deney yapılmadı.', 'Nohutta nişasta yok.', 'Nohutta yalnızca protein var.'], answer: 0,
        why: ['Biüret proteini arar; öteki moleküller hakkında bilgi yok.', 'Nohuta Lugol damlatılmadı; nişasta hakkında bilgi yok.', 'Öteki moleküller aranmadı; “yalnızca” denemez.'], scene: 0,
      },
      {
        q: 'Ton balığında protein aranıyor. Bir ekip kontrol tüpüne su yerine biraz ton balığı koydu. Bu neden kontrol tüpü olmaz?',
        options: ['Kontrol tüpüne ayraç damlatılmaz.', 'Kontrol tüpüne daha çok ayraç damlatılır.', 'Kontrol tüpüne besin konmaz; iki tüp arasındaki tek fark besin olmalıdır.'], answer: 2,
        why: ['Ayraç iki tüpe de damlatılır; kontrol tüpünden çıkan fark besinden gelsin diye.', 'İki tüpe de aynı miktarda ayraç damlatılır.', 'Kontrol tüpünde yalnızca su ve aynı ayraç bulunur.'], scene: 0,
      },
      {
        q: 'Mercimekte nişasta ve protein aranıyor. Hangi eşleşme doğrudur?',
        options: ['Nişasta: Benedict, kiremit kırmızısı; protein: Biüret, açık mavi ya da mor', 'Nişasta: Lugol, mavi-mor; protein: Biüret, açık mavi ya da mor', 'Nişasta: Lugol, mavi-mor; protein: Sudan III/IV, kırmızı ya da turuncu'], answer: 1,
        why: ['Benedict nişastayı değil, glikoz ve fruktozu arar.', 'Nişastayı Lugol, proteini Biüret arar; renkler de doğru.', 'Sudan yağı arar; proteini Biüret arar.'], scene: 0,
      },
      {
        q: 'Üç ekip aynı patates ezmesini Lugol ile test etti. İkisinin tüpü mavi-mor oldu, üçüncünün tüpünde renk oluşmadı. Üçüncü ekip ne yapmalı?',
        options: ['Adımlarını ötekilerle karşılaştırıp deneyi tekrarlamalı.', 'Sonucunu ötekilere uydurup “mavi-mor” yazmalı.', 'Renk oluşmadığı için “patateste nişasta yok” yazıp bırakmalı.'], answer: 0,
        why: ['Beklenmeyen sonuçta önce deney kontrol edilir; sonuç yeni gözlemden yazılır.', 'Kayda yalnızca görülen yazılır; mavi-mor görülmedi.', 'Aynı besinde farklı bulgu, deneyde bir hata olabileceğini gösterir; önce o aranır.'], scene: 0,
      },
      {
        q: 'Bir arkadaşın plan satırında beklenen renk boş bırakılmış. Bu neden eksiktir?',
        options: ['Ayraç seçilemez; ayracı beklenen renk belirler.', 'Tüpte neye bakılacağı belli olmaz.', 'Kontrol tüpü hazırlanamaz.'], answer: 1,
        why: ['Ayracı aranan molekül belirler; renk ayraca göre yazılır.', 'Beklenen rengi yazarsan tüpte neye bakacağını bilirsin.', 'Kontrol tüpü beklenen renkten bağımsız hazırlanır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Doğru ayraç, aranan molekülü gösterir.</b> Lugol nişastayı, Benedict glikoz ve fruktozu, Biüret proteini, Sudan yağı arar.',
      '<b>Önce plan, sonra damla.</b> Tahmin → aranan molekül → ayraç → beklenen renk; yanında kontrol tüpü.',
      '<b>Beklenmeyen sonuç, önce deneyi sorgulatır.</b> Gözlemi yaz, sonucu çıkar; renk oluşmadıysa deneyi kontrol et ve tekrarla.',
    ],
    nextLesson: { href: 'h1-deneyi-tasarla.html', label: 'Sonraki konu: Enzim deneyi ›' },
  });
})();
