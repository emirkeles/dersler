/* H5 — Konu tekrarı: Periyodik özellikler
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart, cubuklar } = window.KIT;
  const renk = '#ffc857';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Konum ve atom yarıçapı
    const g1 = yeni();
    yazi(c, g1, 500, 110, 'Konum ve yarıçap', { size: 38, kalin: 700, renk });
    yazi(c, g1, 500, 230, 'Grupta aşağı: enerji seviyesi artar', { size: 34 });
    yazi(c, g1, 500, 310, 'Periyotta sağa: çekim güçlenir', { size: 34 });
    yazi(c, g1, 500, 440, 'K 227 > Na 186 > Mg 160 pm', { size: 34, kalin: 700, renk: RENK.b });
    await goster(g1, 'Grupta aşağı inildikçe enerji seviyesi artar, yarıçap büyür.');
    await c.say('Periyotta sağa gidildikçe çekim güçlenir, yarıçap küçülür.');
    await c.say('Yani tabloda sola ve aşağı gidildikçe atom büyür.');
    c.note('<b>Tabloda sola ve aşağı gidildikçe atom büyür.</b><br>K 227 &gt; Na 186 &gt; Mg 160 pm', 'Konum ve yarıçap', 'etkilesim-konum-yaricap');
    await sil(g1);

    // İzoelektronik tanecikler
    const g2 = yeni();
    cubuklar(c, g2, ['F⁻', 'Na⁺', 'Mg²⁺'], [136, 95, 65], { birim: 'pm', baslik: 'İzoelektronik: 10 elektron', renk: RENK.a });
    await goster(g2, 'F⁻, Na⁺ ve Mg²⁺ iyonlarının her birinde on elektron vardır.',
      { speak: 'Eksi bir yüklü flor, artı bir yüklü sodyum ve artı iki yüklü magnezyum iyonlarının her birinde on elektron vardır.' });
    await c.say('Çekirdek yükü büyüdükçe aynı elektronlar daha güçlü çekilir.');
    await c.say('Proton çoksa yarıçap küçüktür.');
    c.note('<b>İzoelektronik taneciklerde proton çoksa yarıçap küçüktür.</b><br>F⁻ 136 &gt; Na⁺ 95 &gt; Mg²⁺ 65 pm', 'İzoelektronik tanecikler', 'etkilesim-izoelektronik');
    await sil(g2);

    // Birinci iyonlaşma enerjisinin eğilimi
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'İE₁ eğilimi', { size: 38, kalin: 700, renk });
    yazi(c, g3, 500, 195, 'Grupta aşağı: azalır', { size: 34, kalin: 700, renk: RENK.a });
    yazi(c, g3, 500, 255, 'Li 520 > Na 496 > K 419', { size: 32 });
    yazi(c, g3, 500, 355, 'Periyotta sağa: genel olarak artar', { size: 34, kalin: 700, renk: RENK.b });
    yazi(c, g3, 500, 415, 'Na 496 → Ar 1520', { size: 32 });
    yazi(c, g3, 500, 500, 'kJ/mol', { size: 28, renk: RENK.soluk });
    await goster(g3, 'Grupta aşağı inildikçe yarıçap büyür, birinci iyonlaşma enerjisi azalır.');
    await c.say('Periyotta sağa gidildikçe enerji genel olarak artar.');
    await c.say('Güçlü tutulan elektronu koparmak daha çok enerji ister.');
    c.note('<b>Grupta aşağı İE₁ azalır; periyotta sağa genel olarak artar.</b><br>Li 520 &gt; Na 496 &gt; K 419 · Na 496 &lt; Ar 1520 kJ/mol', 'İyonlaşma enerjisi eğilimi', 'etkilesim-iyonlasma-egilimi');
    await sil(g3);

    // Küresel simetri
    const g4 = yeni();
    yazi(c, g4, 500, 90, 'Küresel simetri', { size: 38, kalin: 700, renk });
    kart(c, g4, 'Mg · 3s²', ['tam dolu', '738'], { x: 60, y: 140, w: 420, h: 230, renk: RENK.b, size: 32 });
    kart(c, g4, 'Al · 3p¹', ['ne yarı ne tam dolu', '577'], { x: 520, y: 140, w: 420, h: 230, renk: RENK.a, size: 32 });
    yazi(c, g4, 500, 450, 'Mg > Al · kJ/mol', { size: 34, kalin: 700 });
    await goster(g4, 'Yarı ya da tam dolu orbitallerle biten atom küresel simetri gösterir.');
    await c.say('Küresel simetri gösteren atomdan elektron zor kopar.');
    await c.say('Bu yüzden magnezyumun enerjisi alüminyumunkinden, fosforunki kükürdünkinden büyüktür.');
    c.note('<b>Küresel simetri gösteren atomdan elektron zor kopar.</b><br>Mg 738 &gt; Al 577 kJ/mol', 'Küresel simetri', 'etkilesim-kuresel-simetri');
    await sil(g4);

    // Sıçrama ve valans elektron sayısı
    const g5 = yeni();
    yazi(c, g5, 500, 95, 'Enerjilerden valans elektron sayısına', { size: 36, kalin: 700, renk });
    yazi(c, g5, 610, 260, '577 · 1817 · 2745', { size: 34, hiza: 'end' });
    c.S('line', { x1: 640, y1: 215, x2: 640, y2: 280, stroke: RENK.cizgi, 'stroke-width': 3 }, g5);
    yazi(c, g5, 670, 260, '11 578', { size: 34, kalin: 700, hiza: 'start', renk: RENK.vurgu });
    yazi(c, g5, 500, 370, 'Sıçramadan önce 3 enerji', { size: 34 });
    yazi(c, g5, 500, 450, '3 valans elektronu → 3A', { size: 34, kalin: 700, renk: RENK.b });
    await goster(g5, 'Sıçramadan önceki enerji sayısı, valans elektron sayısını verir.');
    await c.say('Üç enerji sıçramadan önce gelir; element 3A grubundadır.', { speak: 'Üç enerji sıçramadan önce gelir; element üç A grubundadır.' });
    c.note('<b>Sıçramadan önceki enerji sayısı = valans elektron sayısı.</b><br>Al: 3 → 3A', 'Enerjilerden valansa', 'etkilesim-sicrama-valans');
    await sil(g5);

    // Kararlı iyon
    const g6 = yeni();
    yazi(c, g6, 500, 100, 'Kararlı iyon', { size: 38, kalin: 700, renk });
    yazi(c, g6, 500, 205, 'Na: 1 elektron → Na⁺', { size: 34 });
    yazi(c, g6, 500, 285, 'Mg: 2 elektron → Mg²⁺', { size: 34 });
    yazi(c, g6, 500, 365, 'Al: 3 elektron → Al³⁺', { size: 34 });
    yazi(c, g6, 500, 470, 'Üçü de neon dizilimi', { size: 30, renk: RENK.soluk });
    await goster(g6, 'Atom, sıçramadan önceki elektronlarını verir.');
    await c.say('Sodyum bir, magnezyum iki, alüminyum üç elektron verir.');
    await c.say('Verilen elektron sayısı, kararlı iyonun yüküdür.');
    c.note('<b>Sıçramadan önce verilen elektron sayısı iyon yüküdür.</b><br>Na⁺, Mg²⁺, Al³⁺', 'Kararlı iyon', 'etkilesim-kararli-iyon');
    await sil(g6);

    // Elektronegatiflik
    const g7 = yeni();
    yazi(c, g7, 500, 100, 'Elektronegatiflik', { size: 38, kalin: 700, renk });
    yazi(c, g7, 500, 200, 'Bağ elektronlarını çekme gücü', { size: 34 });
    yazi(c, g7, 500, 280, 'H–Cl bağında Cl daha çok çeker', { size: 34 });
    yazi(c, g7, 500, 390, 'H 2,20 < Cl 3,16', { size: 34, kalin: 700, renk: RENK.b });
    yazi(c, g7, 500, 470, 'Pauling ölçeği: göreceli, birimsiz', { size: 30, renk: RENK.soluk });
    await goster(g7, 'Elektronegatiflik, atomun bağ elektronlarını kendine çekme gücüdür.');
    await c.say('Hidrojen ile klor bağ yaptığında bağ elektronlarını klor daha çok çeker.');
    await c.say('Pauling ölçeği göreceli ve birimsizdir.', { speak: 'Poling ölçeği göreceli ve birimsizdir.' });
    c.note('<b>Elektronegatiflik: atomun bağ elektronlarını kendine çekme gücü.</b><br>H–Cl bağında Cl daha çok çeker.', 'Elektronegatiflik', 'etkilesim-elektronegatiflik');
    await sil(g7);

    // Elektronegatifliğin eğilimi
    const g8 = yeni();
    yazi(c, g8, 500, 95, 'Elektronegatiflik eğilimi', { size: 38, kalin: 700, renk });
    yazi(c, g8, 500, 190, 'Periyotta sağa: artar', { size: 34, kalin: 700, renk: RENK.a });
    yazi(c, g8, 500, 260, 'Grupta aşağı: azalır', { size: 34, kalin: 700, renk: RENK.b });
    yazi(c, g8, 500, 370, 'F 4,00 > Cl 3,16 > Na 0,93', { size: 34 });
    yazi(c, g8, 500, 460, 'Soy gazlar: değer yok', { size: 30, renk: RENK.soluk });
    await goster(g8, 'Elektronegatiflik periyotta sağa gidildikçe artar, grupta aşağı inildikçe azalır.');
    await c.say('Flor klorun üstünde, klor da sodyumun sağındadır.');
    await c.say('Soy gazların elektronegatiflik değeri yoktur.');
    c.note('<b>Sağa gidildikçe artar, aşağı inildikçe azalır.</b><br>F 4,00 &gt; Cl 3,16 &gt; Na 0,93', 'Konumdan sıralama', 'etkilesim-konumdan-siralama');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-h5', kicker: 'Konu H · Periyodik özellikler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Periyodik özellikler',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Üçüncü periyotta alüminyum, fosfor ve klor soldan sağa bu sırayla dizilir. Bağ yaptıklarında bağ elektronlarını en çok hangisi çeker?',
        options: ['Fosfor', 'Alüminyum', 'Klor'], answer: 2,
        why: ['Fosfor alüminyumun sağındadır ama klorun solundadır; değeri klorunkinden küçüktür.', 'Alüminyum en soldadır; çekirdeğinin çekimi üçünün en zayıfıdır.', 'Evet. Periyotta sağa gidildikçe elektronegatiflik artar; en sağdaki klor en büyük değere sahiptir.'], scene: 0,
      },
      {
        q: 'Atom numaraları 13 ve 15 olan iki atomun elektron dizilimi üçüncü enerji seviyesinde biter. Hangisinin yarıçapı daha büyüktür?',
        options: ['Atom numarası 15 olan', 'Atom numarası 13 olan', 'İkisi eşit'], answer: 1,
        why: ['Bu atom daha sağdadır; protonu çoktur, çekim güçlüdür ve atom daha küçüktür.', 'Evet. Aynı periyotta protonu az olan atom solda kalır; çekimi daha zayıf olduğu için daha büyüktür.', 'Enerji seviyesi sayıları eşittir ama proton sayıları farklıdır; çekim aynı olmaz.'], scene: 0,
      },
      {
        q: 'Kararlı iyonu X³⁺ olan bir A grubu elementinin ardışık iyonlaşma enerjilerinde en büyük sıçrama hangi iki enerji arasındadır?',
        options: ['Üçüncü ile dördüncü', 'İkinci ile üçüncü', 'Dördüncü ile beşinci'], answer: 0,
        why: ['Evet. Atom üç elektron verdiği için sıçrama üçüncü enerjiden sonra gelir.', 'Sıçrama ikinci enerjiden sonra olsaydı atom iki elektron verir ve kararlı iyonu X²⁺ olurdu.', 'Sıçrama dördüncü enerjiden sonra olsaydı atom dört elektron verir ve kararlı iyonu X⁴⁺ olurdu.'], scene: 0,
      },
      {
        q: 'Silisyum ve klor üçüncü periyottadır; klor, silisyumun sağındadır. Hangisinden ilk elektronu koparmak daha çok enerji ister?',
        options: ['Klor', 'Silisyum', 'İkisi eşit'], answer: 0,
        why: ['Evet. Periyotta sağa gidildikçe çekim güçlenir ve iyonlaşma enerjisi genel olarak artar.', 'Silisyum solda, protonu az; dış elektronu daha zayıf tutulur ve daha kolay kopar.', 'Proton sayıları farklıdır; dış elektronlar aynı güçle tutulmaz.'], scene: 0,
      },
      {
        q: 'N³⁻, O²⁻ ve F⁻ iyonlarının her birinde 10 elektron vardır; proton sayıları 7, 8 ve 9’dur. Yarıçapı en küçük olan hangisidir?',
        options: ['O²⁻', 'N³⁻', 'F⁻'], answer: 2,
        why: ['Bu iyonda 8 proton var; 9 protonlu bir iyon daha var ve 10 elektronu daha güçlü çeker.', 'Bu iyonda yalnızca 7 proton var; 10 elektronu en zayıf o çeker ve en büyüğü o olur.', 'Evet. En çok proton onda; on elektronu en güçlü o çeker ve en küçüğü o olur.'], scene: 0,
      },
      {
        q: 'Hangi atom çiftinde ikinci atomun elektronegatifliği birincisinden küçüktür?',
        options: ['Magnezyum ve kükürt (aynı periyot, kükürt sağda)', 'Flor ve klor (aynı grup, klor aşağıda)', 'Lityum ve flor (aynı periyot, flor sağda)'], answer: 1,
        why: ['Kükürt magnezyumun sağındadır; sağa gidildikçe değer artar, kükürtün değeri daha büyüktür.', 'Evet. Grupta aşağı inildikçe elektronegatiflik azalır; klorun değeri florunkinden küçüktür.', 'Flor lityumun sağındadır; sağa gidildikçe değer artar, florun değeri daha büyüktür.'], scene: 0,
      },
      {
        q: 'Azotun dizilimi 2s² 2p³, oksijeninki 2s² 2p⁴ ile biter. İkisi de ikinci periyottadır; oksijen azotun sağındadır. Hangisinin birinci iyonlaşma enerjisi daha büyüktür?',
        options: ['Oksijen', 'İkisi eşit', 'Azot'], answer: 2,
        why: ['Oksijen sağdadır ama 2p⁴ ile biter; yarı ya da tam dolu orbitali yoktur.', 'Dizilimler farklı biter; yarı dolu orbitalli atom daha kararlıdır, değerler eşit olmaz.', 'Evet. 2p³ yarı doludur ve küresel simetri gösterir; azottan elektron koparmak daha zordur.'], scene: 0,
      },
      {
        q: 'Bir A grubu elementinde en büyük sıçrama üçüncü enerjiden sonra gelir. Dördüncü elektronu koparmak neden çok daha fazla enerji ister?',
        options: ['Elektron, çekirdeğe daha yakın bir iç enerji seviyesindedir.', 'Atomdaki elektronlar arası itme bu adımda artar.', 'Sıçramadan sonra çekirdekteki proton sayısı artar.'], answer: 0,
        why: ['Evet. Valans elektronları bittikten sonra sıra iç enerji seviyesine gelir; bu elektronlar çok daha zor kopar.', 'Elektron sayısı azaldıkça itme azalır; artmaz.', 'Proton sayısı iyonlaşmada değişmez; yalnızca elektron sayısı azalır.'], scene: 0,
      },
      {
        q: 'Dizilimleri 2s² 2p⁵ ve 3s² 3p⁵ ile biten iki atom aynı gruptadır; ikincisi bir alt periyottadır. Hangisinin yarıçapı daha büyüktür?',
        options: ['2s² 2p⁵ ile biten', '3s² 3p⁵ ile biten', 'İkisi eşit'], answer: 1,
        why: ['Bu atomun enerji seviyesi sayısı daha azdır; grupta yukarıdaki atom daha küçüktür.', 'Evet. Aşağıdaki atomda bir enerji seviyesi daha vardır; elektronlar çekirdekten uzaktır.', 'Enerji seviyesi sayıları farklıdır; yarıçap eşit olmaz.'], scene: 0,
      },
      {
        q: 'Karbon ve silisyum 4A grubundadır; silisyum karbonun altındadır. Silisyumun elektronegatifliği neden karbonunkinden küçüktür?',
        options: ['Silisyumun çekirdeğinde karbondan daha az proton vardır.', 'Silisyumun elektronları karbonunkinden daha az enerji seviyesindedir.', 'Silisyumda bağ elektronları çekirdekten daha uzaktadır.'], answer: 2,
        why: ['Grupta aşağı inildikçe proton sayısı artar; azalmaz.', 'Grupta aşağı inildikçe enerji seviyesi sayısı artar; azalmaz.', 'Evet. Silisyum daha büyüktür; bağ elektronları çekirdekten uzaktır ve daha zayıf çekilir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Yarıçap, enerji seviyesi sayısı, çekirdek yükü ve elektronların itmesiyle belirlenir;</b> sola ve aşağı gidildikçe atom büyür.',
      '<b>İyonlaşma enerjisi grupta aşağı azalır, periyotta sağa genel olarak artar;</b> küresel simetri bu artışı bozar.',
      '<b>Büyük sıçramadan önceki enerji sayısı valans elektron sayısını verir;</b> elektronegatiflik sağa artar, aşağı azalır.',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
