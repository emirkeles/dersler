/* C2 — Konu tekrarı: Fizik bilimine yön verenler
   Yeni bilgi yok. Tek sahnede konunun beş kuralı toplanır; ardından altı karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, belir, kart } = window.KIT;
  const renk = '#f5b04c';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const kartO = (baslik, metin, r) => ({ baslik, metin, renk: r, baslikSize: 26, size: 26 });

    // Bilim öncekilerin çalışmalarına dayanır
    const g1 = yeni();
    yazi(c, g1, 500, 90, 'Bilim öncekilerin çalışmalarına dayanır', { size: 34, kalin: 700 });
    kart(c, g1, 150, 150, 300, 150, kartO('Galileo Galilei', 'yasaları', RENK.kisi));
    kart(c, g1, 550, 150, 300, 150, kartO('Johannes Kepler', 'yasaları', RENK.kisi));
    cizgi(c, g1, 300, 300, 420, 370, RENK.ince);
    cizgi(c, g1, 700, 300, 580, 370, RENK.ince);
    kart(c, g1, 350, 370, 300, 150, kartO('Isaac Newton', 'kendi yasalarını buldu', RENK.fizik));
    await goster(g1, 'Bilim insanı, öncekilerin çalışmalarını inceleyerek ilerler.');
    await c.say('Newton, Galileo ve Kepler’in yasalarından yola çıkıp kendi yasalarını buldu.', { speak: 'Nüvtın, Galileyo ve Kepler’in yasalarından yola çıkıp kendi yasalarını buldu.' });
    c.note('<b>Bilim insanı, öncekilerin çalışmalarını inceleyerek ilerler.</b><br>Newton, Galileo ve Kepler’in yasalarından yola çıkıp kendi yasalarını buldu.', 'Öncekilere dayanmak', 'fizik-onceki-calismalar');
    await sil(g1);

    // Üç bilim insanının çalışma biçimi
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Üç bilim insanı, üç çalışma biçimi', { size: 34, kalin: 700 });
    [['İbnülheysem', 'önceki bilgiyi sorgular'], ['Hazini', 'gözleme ve ispata dayanır'], ['Einstein', 'anlama merakı']].forEach(([ad, bicim], i) => {
      const y = 230 + i * 100;
      yazi(c, g2, 90, y, ad, { size: 32, kalin: 700, hiza: 'start', renk: RENK.kisi });
      cizgi(c, g2, 330, y - 11, 410, y - 11, RENK.ince);
      yazi(c, g2, 450, y, bicim, { size: 32, hiza: 'start', renk: RENK.fizik });
    });
    await goster(g2, 'İbnülheysem eski bilgiyi sorguladı, yeni bir açıklama getirdi.');
    await c.say('Hazini sonucu gözleme ve ispata dayandırdı.');
    await c.say('Einstein’ı derin bir anlama merakı yürüttü.', { speak: 'Aynştayn’ı derin bir anlama merakı yürüttü.' });
    c.note('<b>İbnülheysem önceki bilgiyi sorgular, Hazini gözleme ve ispata dayanır.</b><br>Einstein’ı anlama merakı yürütür.', 'Çalışma biçimleri', 'fizik-calisma-bicimleri');
    await sil(g2);

    // Bir yaşam öyküsünden çıkarım yapma
    const g3 = yeni();
    yazi(c, g3, 500, 110, 'Yaşam öyküsünden çıkarım', { size: 36, kalin: 700 });
    kart(c, g3, 60, 190, 400, 230, kartO('Yaşam öyküsü', 'dört yıl iş bulamadı; yılmadı', RENK.kisi));
    cizgi(c, g3, 470, 305, 530, 305, RENK.cizgi);
    kart(c, g3, 540, 190, 400, 230, kartO('Çıkarım', 'engeller onu durdurmadı; kararlıydı', RENK.fizik));
    await goster(g3, 'Einstein dört yıl iş bulamadı; çalışmayı bırakmadı.', { speak: 'Aynştayn dört yıl iş bulamadı; çalışmayı bırakmadı.' });
    await c.say('Engeller onu durdurmadı; kararlıydı.');
    await c.say('Yaşam öyküsünden böyle sonuç çıkarmaya çıkarım denir.');
    c.note('<b>Çıkarım:</b> bir yaşam öyküsünden sonuç çıkarmak.<br>Dört yıl iş bulamadı, yılmadı; kararlıydı.', 'Çıkarım', 'fizik-cikarim');
    await sil(g3);

    // Çıkarımı değerlendirmede kullanılan unsurlar
    const g4 = yeni();
    yazi(c, g4, 500, 100, 'Çıkarım yedi unsurla değerlendirilir', { size: 34, kalin: 700 });
    [['kararlılık', 'tutku', 'bilimsel erdem', 'ilke'], ['eğitim', 'laboratuvar deneyimi', 'araştırma becerileri']].forEach((sutun, k) => {
      sutun.forEach((u, i) => yazi(c, g4, 130 + k * 460, 210 + i * 82, u, { size: 32, hiza: 'start', kalin: 700, renk: k ? RENK.disiplin : RENK.fizik }));
    });
    await goster(g4, 'Bir çıkarım yedi unsura göre değerlendirilir.');
    await c.say('Vazgeçmemek kararlılık, merak tutku, doğru ölçmek araştırma becerisidir.');
    await c.say('Çıkarımı unsurlara göre tartmaya değerlendirme denir.');
    c.note('<b>Çıkarım yedi unsura göre değerlendirilir:</b> kararlılık, tutku, bilimsel erdem, ilke, eğitim, laboratuvar deneyimi, araştırma becerileri.', 'Değerlendirme', 'fizik-degerlendirme');
    await sil(g4);

    // Bilim insanının ortak özellikleri
    const g5 = yeni();
    yazi(c, g5, 500, 130, 'Bilim insanı', { size: 40, kalin: 700, renk: RENK.fizik });
    ['meraklı', 'sabırlı', 'kararlı', 'sorgulayıcı'].forEach((ad, i) => kart(c, g5, 40 + i * 235, 220, 220, 140, { metin: ad, renk: RENK.kisi, size: 28 }));
    await goster(g5, 'Dört bilim insanının ortak yanı bu dört özellik.');
    await c.say('Bilim insanı meraklı, sabırlı, kararlı ve sorgulayıcıdır.');
    c.note('<b>Bilim insanı:</b> meraklı, sabırlı, kararlı, sorgulayıcı', 'Ortak özellikler', 'ortak-ozellikler');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-c2', kicker: 'Konu C · Fizik bilimine yön verenler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Fizik bilimine yön verenler',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>altı karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun beş kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir araştırmacının yaşam öyküsünde şu bilgi var: Üç yıl boyunca destek bulamadı, deneyini kendi imkânlarıyla sürdürdü. Bu yaşam öyküsünden hangi çıkarım yapılır?',
        options: ['Çalışması ona hiç zorluk çıkarmadı', 'Zorluklara karşın sürdürdüğü için kararlıydı', 'Başkalarının çalışmalarından hiç yararlanmadı'], answer: 1,
        why: ['Anlatılan şey tam tersi: destek bulamadı, yani zorluk yaşadı.', 'Evet. Einstein’da olduğu gibi engellere karşın sürdürmek kararlılığı gösterir.', 'Yaşam öyküsünde başkalarının çalışmalarından söz edilmiyor; bu sonuç çıkarılamaz.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı, yıllardır doğru sayılan bir açıklamanın tutmayabileceğini düşündü ve bunu bir ölçümle sınadı. Bu araştırmacının çalışma biçimi hangisidir?',
        options: ['Eski bir açıklamayı sorgulayıp sınamak', 'Eski açıklamayı olduğu gibi benimsemek', 'Açıklamayı tahminle seçmek'], answer: 0,
        why: ['Evet. İbnülheysem de eski kuramı sorguladı ve gözlemle sınadı.', 'Araştırmacı açıklamayı benimsemedi, tam tersine kuşkuyla baktı.', 'Araştırmacı tahmin etmedi, ölçümle sınadı.'], scene: 0,
      },
      {
        q: 'Bir kuruluş, yeni bir terazinin doğru olduğuna ne zaman inanmalıdır? Hazini’nin çalışma biçimine göre doğru ölçüt hangisidir?',
        options: ['Aynı terazi onlarca yıldır satılıyorsa', 'Terazi çok tanınmış bir firmadan geliyorsa', 'Doğruluğu gözlemle ve ispatla gösterilmişse'], answer: 2,
        why: ['Eskiden beri bilinmek, bir sonucu doğru yapmaz.', 'Ünlü birinin söylemesi, bir sonucu doğru yapmaz.', 'Evet. Hazini sonucu gözleme ve ispata dayandırırdı.'], scene: 0,
      },
      {
        q: 'Bir öğrenci dört bilim insanının ortak özelliklerini sayıyor. Hangisi listede yer almaz?',
        options: ['Şansa güvenmek', 'Sorgulayıcı olmak', 'Sabırlı olmak'], answer: 0,
        why: ['Evet. Ortak özellikler meraklı, sabırlı, kararlı ve sorgulayıcı olmaktır; şans bunlardan değil.', 'Sorgulayıcı olmak ortak özelliklerden biridir; İbnülheysem eski bilgiyi sorguladı.', 'Sabırlı olmak ortak özelliklerden biridir.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı, yeni bir ölçüm yöntemi geliştirmeden önce aynı konuda çalışmış kişilerin raporlarını inceleyip eksik yerleri tamamladı. Hangi söz bu yolu anlatır?',
        options: ['Her şeyi tek başına bulmak', 'Kendinden öncekilerin çalışmalarından yararlanmak', 'Bulguyu şansa bırakmak'], answer: 1,
        why: ['Araştırmacı başkalarının raporlarını inceledi; tek başına başlamadı.', 'Evet. Newton da Galileo ve Kepler’in yasalarından yola çıkıp kendi yasalarını buldu.', 'Araştırmacı raporları inceleyerek ilerledi; şansa bırakmadı.'], scene: 0 },
      {
        q: 'Bir araştırmacı, okuduğu üniversite derslerinin çalışmalarına temel olduğunu söylüyor. Bu durum hangi unsurla değerlendirilir?',
        options: ['Kararlılık', 'Tutku', 'Eğitim'], answer: 2,
        why: ['Kararlılık, zorluğa karşın sürdürmektir; burada zorluk anlatılmıyor.', 'Tutku, bir şeyi çok isteyerek yapmaktır; burada öğrenim anlatılıyor.', 'Evet. Einstein’ın cebir ve geometriyi öğrenmesi gibi, öğrenim eğitimle ilgilidir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Bilim, öncekilerin çalışmalarına dayanır.</b> İbnülheysem sorgular, Hazini gözleme ve ispata dayanır, Einstein’ı merak yürütür.',
      'Bir yaşam öyküsünden <b>çıkarım</b> yapılır; çıkarım yedi unsura göre <b>değerlendirilir</b>.',
      'Bilim insanı <b>meraklı, sabırlı, kararlı ve sorgulayıcıdır</b>.',
    ],
    nextLesson: { href: 'd1-merak-et-sor.html', label: 'Sonraki konu: Fizik bilimi ile ilgili kariyer keşfi ›' },
  });
})();
