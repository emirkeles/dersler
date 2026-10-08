/* D7 — Konu tekrarı: Canlıların ortak özellikleri
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.D, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);
    // Yazıları gizli kurup altyazıyla birlikte açar (bir kural birkaç adımda kurulurken).
    const gizle = (...els) => { els.flat().forEach((el) => { el.style.opacity = 0; }); return els.flat(); };
    const ac = (els, metin, o) => Promise.all([c.say(metin, o), c.tween(400, (e) => els.forEach((el) => { el.style.opacity = e; }))]);

    // Gözlem düzeni (D1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 150, 'Gözlem düzeni', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 250, 'düzenli aralıklarla bak', { size: 32 });
    K.yazi(c, g1, 500, 310, 'gördüğünü hemen yaz', { size: 32 });
    K.yazi(c, g1, 500, 410, 'sonraya bırakırsan ayrıntı unutulur', { size: 28, renk: SOLUK });
    await goster(g1, 'Gözlem düzenli aralıklarla yapılır: her sabah ve her akşam bakılır.');
    await c.say('Görülen, görüldüğü gün hemen tabloya işlenir.');
    c.note('<b>Gözlem düzenli aralıklarla yapılır.</b><br>Üç gün, her sabah ve her akşam.', 'Gözlem düzeni', 'yasam-d-gozlem-duzeni');
    await sil(g1);

    // Gözlem ve yorum (D1)
    const g2 = yeni();
    K.kart(c, g2, 60, 150, 400, 220, 'Gözlem', ['görüleni yazar', '“otu yedi”'], { renk });
    K.kart(c, g2, 540, 150, 400, 220, 'Yorum', ['görülenden çıkarılır', '“acıkmıştı”'], { renk: IKINCI });
    await goster(g2, 'Gözlem görüleni yazar; yorum görülenden çıkarılır.');
    await c.say('Gözlem tablosuna görülen yazılır; yorum gözlemin yerine geçmez.');
    c.note('<b>Gözlem görüleni yazar; yorum görülenden çıkarılır.</b><br>“Otu yedi” gözlem, “acıkmıştı” yorum.', 'Gözlem ve yorum', 'yasam-d-gozlem-ve-yorum');
    await sil(g2);

    // Görülmeyen özellik (D1)
    const g3 = yeni();
    K.yazi(c, g3, 500, 170, 'Eksi “yok” demek değildir', { size: 42, kalin: 700, renk });
    K.yazi(c, g3, 500, 270, 'Üreme üç günde gözlemlenemedi', { size: 32 });
    K.yazi(c, g3, 500, 340, 'özellik bu sürede görülmedi', { size: 28, renk: SOLUK });
    await goster(g3, 'Eksi, özelliğin olmadığını değil, bu sürede görülmediğini gösterir.');
    await c.say('Görülmeyen özellik “gözlemlenemedi” diye kaydedilir.');
    c.note('<b>Eksi “yok” demek değildir.</b><br>Üreme üç günde gözlemlenemedi.', 'Görülmeyen özellik', 'yasam-d-gorulmeyen-ozellik');
    await sil(g3);

    // Özellik ortak, yolu farklı (D2)
    const g4 = c.S('g', {}, svg);
    const baslik4 = gizle(K.yazi(c, g4, 500, 80, 'Özellik ortak, yolu farklı', { size: 38, kalin: 700, renk }));
    const satir = (i, ad, is, r) => {
      const g = c.S('g', {}, g4), y = 180 + i * 85;
      K.yazi(c, g, 110, y, ad, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, 300, y - 10, 380, y - 10, r);
      K.yazi(c, g, 410, y, is, { size: 30, hiza: 'start' });
      return gizle(g)[0];
    };
    const s1 = satir(0, 'Beslenme', 'üretir ya da hazır alır', renk), s2 = satir(1, 'Boşaltım', 'atıkları uzaklaştırır', renk);
    const s3 = satir(2, 'Büyüme', 'hacim ve kütle artışı', IKINCI), s4 = satir(3, 'Gelişme', 'görev olgunluğuna erişir', IKINCI);
    await ac([...baslik4, s1], 'Özellik ortaktır, yolu farklıdır: bitki besinini üretir, hayvan hazır alır.');
    await ac([s2, s3], 'Boşaltım atıkları uzaklaştırır; büyüme hacim ve kütle artışıdır.');
    await ac([s4], 'Gelişme, yapıların belirli bir görevi yapacak olgunluğa erişmesidir.');
    c.note('<b>Özellik ortak, yolu farklı.</b><br>Bitki besinini üretir, hayvan hazır alır.', 'Beslenme', 'yasam-d-beslenme');
    await sil(g4);

    // Fark ile neden, tepki ile uyum (D3)
    const g5 = c.S('g', {}, svg);
    const k1 = gizle(K.kart(c, g5, 60, 150, 400, 220, 'Gözlenen fark', ['kalıtsal nedeni', 'tek başına kanıtlamaz'], { renk }));
    const k2 = gizle(K.kart(c, g5, 540, 150, 400, 220, 'Anlık tepki', ['kalıtsal uyum', 'değildir'], { renk: IKINCI }));
    await ac(k1, 'Gözlenen fark, kalıtsal nedeni tek başına kanıtlamaz.');
    await ac(k2, 'Bir bireyin anlık tepkisi, kalıtsal uyumla aynı şey değildir.');
    c.note('Gözlenen fark, kalıtsal nedeni tek başına kanıtlamaz.', 'Varyasyon', 'yasam-d-varyasyon');
    await sil(g5);

    // Hücre (D4)
    const g6 = c.S('g', {}, svg);
    const h1 = gizle(K.kart(c, g6, 60, 130, 400, 200, 'Prokaryot', ['belirgin çekirdek', 'yok'], { renk: IKINCI }));
    const h2 = gizle(K.kart(c, g6, 540, 130, 400, 200, 'Ökaryot', ['çekirdek var'], { renk }));
    const h3 = gizle(K.yazi(c, g6, 500, 420, 'Boyut ve dış şekil ölçüt değil', { size: 30, renk: SOLUK }));
    await ac([...h1, ...h2], 'Ökaryot hücrede çekirdek bulunur; prokaryotta belirgin çekirdek yoktur.');
    await ac(h3, 'Boyut veya dış şekil, bu ayrımın yerine geçmez.');
    await c.say('Hücre tahminini araç ve kaynakla doğrula.');
    c.note('Hücre tahminini araç ve kaynakla doğrula.', 'Hücresel yapı', 'yasam-d-hucresel-yapi');
    await sil(g6);

    // İç süreç (D5)
    const g7 = c.S('g', {}, svg);
    const baslik7 = gizle(K.yazi(c, g7, 500, 90, 'Etkiden iç sürece', { size: 38, kalin: 700, renk }));
    const eslesme = (i, sol, sag, r) => {
      const g = c.S('g', {}, g7), y = 210 + i * 90;
      K.yazi(c, g, 110, y, sol, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, 400, y - 10, 480, y - 10, r);
      K.yazi(c, g, 510, y, sag, { size: 30, hiza: 'start' });
      return gizle(g)[0];
    };
    const e1 = eslesme(0, 'Kas kasılması', 'ATP’nin enerjisi', renk);
    const e2 = eslesme(1, 'Terleme', 'iç dengenin korunması', renk);
    const e3 = eslesme(2, 'Protein oluşması', 'yapım', IKINCI);
    await ac([...baslik7, e1], 'Kas kasılması ATP’nin sağladığı enerjiye ihtiyaç duyar.',
      { speak: 'Kas kasılması a te pe’nin sağladığı enerjiye ihtiyaç duyar.' });
    await ac([e2], 'Terleme, vücut sıcaklığını düzenlemeye katkı sağlayan bir faaliyettir.');
    await ac([e3], 'Küçük moleküllerden büyük molekül oluşturmak yapım sürecidir.');
    c.note('İç süreç, etkisi ve kaynağıyla değerlendirilir.', 'İç süreç', 'yasam-d-ic-surec');
    await sil(g7);

    // Virüs (D6)
    const g8 = c.S('g', {}, svg);
    const v1 = gizle(
      K.yazi(c, g8, 500, 110, 'Virüs = genetik madde + protein kılıf', { size: 36, kalin: 700, renk }),
      K.yazi(c, g8, 500, 180, 'hücre değildir', { size: 32 }),
      K.yazi(c, g8, 500, 240, 'ribozomu ve enerji üreten yapısı yok', { size: 28, renk: SOLUK }));
    const v2 = gizle(K.yazi(c, g8, 500, 350, 'yalnızca canlı hücrede çoğalır', { size: 34, kalin: 700, renk: YESIL }));
    const v3 = gizle(K.yazi(c, g8, 500, 430, 'canlı ile cansız arasında', { size: 34, kalin: 700, renk: IKINCI }));
    await ac(v1, 'Virüs bir hücre değildir; genetik madde ve protein kılıftan oluşur.');
    await ac(v2, 'Virüs yalnızca canlı bir hücrenin içinde çoğalabilir.');
    await ac(v3, 'Virüs hücre dışında cansız gibi durur, hücre içinde canlıya benzer.');
    c.note('<b>Virüs: canlı ile cansız arasında.</b><br>Hücre dışında cansız gibi; yalnızca hücre içinde çoğalır.', 'Canlılık sınırı', 'yasam-d-canlilik-siniri');
    await c.say('Şimdi altı dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-d7', kicker: 'Konu D · Canlıların ortak özellikleri', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Canlıların ortak özellikleri',
      hook: 'Altı dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Altı dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir sporcu koşarken hızlı nefes alıp verir; akciğerleri karbondioksit ve su buharı atar. Bu faaliyet hangisidir?',
        options: ['Boşaltım', 'Beslenme', 'Büyüme'], answer: 0,
        why: ['Atıkların vücuttan uzaklaştırılmasına boşaltım denir; akciğer de bu görevi yapar.', 'Beslenme besin elde etmektir; burada atık uzaklaştırılıyor.', 'Büyüme hacim ve kütle artışıdır; burada bir artış yok.'], scene: 0,
      },
      {
        q: 'Bir hücrede büyük bir besin molekülü daha küçük parçalara ayrılıyor ve enerji açığa çıkıyor. Bu süreç hangisidir?',
        options: ['Yapım', 'Boşaltım', 'Yıkım'], answer: 2,
        why: ['Yapım, küçük moleküllerden büyük molekül oluşturmaktır; burada tersi oluyor.', 'Boşaltım atıkların uzaklaştırılmasıdır; burada büyük molekül parçalanıyor.', 'Büyük molekülün küçük parçalara ayrılması yıkımdır.'], scene: 0,
      },
      {
        q: 'Ayşe bir kaktüsü iki hafta gözledi, çiçek açtığını görmedi ve “Bu kaktüs çiçek açmaz.” diye yazdı. Bu cümle için hangisi söylenir?',
        options: ['Doğrudur; görülmeyen özellik canlıda yoktur.', 'Fazlasını söylüyor; “çiçek açma gözlemlenemedi” yazılmalıydı.', 'Doğrudur; iki hafta her özellik için yeterlidir.'], answer: 1,
        why: ['Eksi “yok” demek değildir; özellik yalnızca görülmemiştir.', 'Görülmeyen özellik “gözlemlenemedi” diye kaydedilir, yok sayılmaz.', 'Süre kısa kalmış olabilir; görülmeyen özellik yok sayılmaz.'], scene: 0,
      },
      {
        q: 'Bir virüs yalnızca karaciğer hücrelerine tutunabiliyor. Bu virüs yalnız kemik hücreleri bulunan bir ortama konursa ne olur?',
        options: ['Tutunamaz ve çoğalamaz; virüs yalnızca uygun hücreye tutunur.', 'Kemik hücresinde de çoğalır; virüs her hücreye tutunur.', 'Kemik hücresini karaciğer hücresine dönüştürüp çoğalır.'], answer: 0,
        why: ['Her virüs yalnızca kendine uygun hücreye tutunur; çoğalma tutunduğu hücrede olur.', 'Her virüs her hücreye tutunamaz.', 'Virüs hücreyi dönüştürmez; bilgiyi verir, parçaları hücre üretir.'], scene: 0,
      },
      {
        q: 'Hangisi anlık bir tepkidir, kalıtsal uyum değildir?',
        options: ['Balığın solungaçlarıyla suda solunum yapması', 'Çocuğun elini sıcak çaydanlıktan hemen çekmesi', 'Kutup ayısının kalın kürke sahip olması'], answer: 1,
        why: ['Solungaç balık türüne özgü kalıtsal bir özelliktir; yaşamı destekler.', 'Sıcak çaydanlık bir uyarıdır; el çekme o anda verilen tepkidir.', 'Kalın kürk türe özgü kalıtsal bir özelliktir; yaşamı destekler.'], scene: 0,
      },
      {
        q: 'Bir öğrenci elmanın üzerindeki küf lekesine bakıp “Hücrelerinde çekirdek vardır.” diyor. Bu tahmin en iyi nasıl doğrulanır?',
        options: ['Lekenin rengine ve büyüklüğüne bakarak', 'Yalnızca lekenin fotoğrafına bakarak', 'Uygun araçla inceleyip kaynakla doğrulayarak'], answer: 2,
        why: ['Renk ve büyüklük, iç yapıyı göstermez.', 'Fotoğraf görünüşü gösterir; hücreyi tek başına göstermez.', 'Tahmin, uygun araç ve güvenilir kaynakla doğrulanır.'], scene: 0,
      },
      {
        q: 'Tabloya “Muhabbet kuşu çok mutluydu.” yazan öğrenci bunu gözleme çevirmek istiyor. Hangisini yazmalıdır?',
        options: ['Muhabbet kuşu öttü ve tüneğinde zıpladı.', 'Muhabbet kuşu, bence, çok mutluydu.', 'Muhabbet kuşu kendini çok iyi hissediyordu.'], answer: 0,
        why: ['Görülen davranış yazılır; mutluluk bu davranıştan çıkarılan yorumdur.', '“Bence” eklemek yorumu gözleme çevirmez.', 'Hissetmek görülmez; bu da bir yorumdur.'], scene: 0,
      },
      {
        q: 'Yetişkin bir köpek artık boy uzatmıyor; yetişkin bir çınar ise yeni dallar çıkarıp kalınlaşmaya devam ediyor. Bu fark nasıl açıklanır?',
        options: ['Köpek canlılığını yitirmiştir; büyüme bitmiştir.', 'Çınar yalnız gelişir, köpek yalnız büyür.', 'Hayvanlarda büyüme sınırlıdır; bitkiler yaşamları boyunca büyür.'], answer: 2,
        why: ['Büyümenin durması canlılığın bittiği anlamına gelmez.', 'İkisi de hem büyür hem gelişir; fark büyümenin sürmesindedir.', 'Hayvanlarda büyüme sınırlıdır; bitkiler yaşamları boyunca büyür.'], scene: 0,
      },
      {
        q: 'Bir öğrenci “Virüs de bakteri gibi dışarıdan besin alıp enerji üretir.” diyor. Hangisi doğrudur?',
        options: ['Doğru; virüs hücre dışında besin alarak çoğalır.', 'Yanlış; virüs besin almaz, enerji üreten yapısı da yoktur.', 'Yanlış; virüs besin almaz ama enerjiyi kendi ribozomlarıyla üretir.'], answer: 1,
        why: ['Virüs hücre dışında hiçbir yaşamsal faaliyet göstermez; çoğalma yalnızca canlı hücrede olur.', 'Virüste enerji üreten yapı yoktur; beslenmez, dışarıdan madde almaz.', 'Ribozom protein üretir ve virüste ribozom yoktur.'], scene: 0,
      },
      {
        q: 'Bol su içen bir kişi normalden çok idrar yapar. Bu durum iç dengeyle nasıl ilişkilendirilir?',
        options: ['İç dengenin tamamen bozulduğunu gösterir.', 'Metabolizmanın durduğunu gösterir.', 'Fazla suyun atılmasıyla su miktarı korunur.'], answer: 2,
        why: ['İç denge, düzenleme faaliyetleriyle korunur; fazla suyu atmak bunlardan biridir.', 'Metabolizma yaşam boyunca sürer; idrar yapmak onun durması demek değildir.', 'Fazla su uzaklaştırılarak su miktarı korunur; bu iç dengeyle ilişkilidir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Gözlem düzenli yapılır, görülen hemen yazılır.</b> Gözlem görüleni yazar; eksi “yok” demek değildir.',
      '<b>Özellik ortak, yolu farklı.</b> Gözlenen fark, kalıtsal nedeni tek başına kanıtlamaz.',
      '<b>Hücre tahmini ve iç süreç</b> araç ve kaynakla doğrulanır; virüs canlı ile cansız arasındadır.',
    ],
    nextLesson: { href: 'e1-inorganik-ozellikler.html', label: 'Sonraki konu: İnorganik moleküller ›' },
  });
})();
