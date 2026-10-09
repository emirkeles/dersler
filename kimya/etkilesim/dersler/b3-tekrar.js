/* B3 — Konu tekrarı: Kimyasal maddeler ve güvenlik
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#3ddc97';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Kaza zinciri: madde, hata, sonuç
    const g1 = yeni();
    yazi(c, g1, 500, 95, 'Kaza zinciri', { size: 38, kalin: 700, renk });
    kart(c, g1, 'Madde', ['Cıva'], { x: 40, y: 150, w: 290, h: 190, renk: RENK.a, size: 32 });
    kart(c, g1, 'Hata', ['denize atık'], { x: 355, y: 150, w: 290, h: 190, renk: RENK.b, size: 32 });
    kart(c, g1, 'Sonuç', ['kirlilik'], { x: 670, y: 150, w: 290, h: 190, renk: RENK.vurgu, size: 32 });
    yazi(c, g1, 500, 450, 'Hata, kişinin davranışıdır', { size: 30, renk: RENK.soluk });
    await goster(g1, 'Her kaza üç halkadan oluşur: madde, hata ve sonuç.');
    await c.say('Hata, kişinin yaptığı davranıştır; sonuç, hatanın ardından çıkan zarardır.');
    c.note('<b>Kaza zinciri: madde → hata → sonuç.</b><br>Cıva → denize atık → kirlilik', 'Neden zinciri', 'etkilesim-neden-zinciri');
    await sil(g1);

    // Sonucu özellik ile hata birlikte belirler
    const g2 = yeni();
    yazi(c, g2, 500, 95, 'Sonucu iki şey belirler', { size: 38, kalin: 700, renk });
    kart(c, g2, 'Maddenin özelliği', ['Tuz ruhu: asit', 'Çamaşır suyu: baz'], { x: 60, y: 150, w: 420, h: 230, renk: RENK.a, size: 30 });
    kart(c, g2, 'Yapılan hata', ['Durulamadan dökmek'], { x: 520, y: 150, w: 420, h: 230, renk: RENK.b, size: 30 });
    yazi(c, g2, 500, 470, 'Sonuç: klor gazı', { size: 34, kalin: 700, renk: RENK.vurgu });
    await goster(g2, 'Sonucu, maddenin özelliği ile yapılan hata birlikte belirler.');
    await c.say('Tuz ruhu asittir, çamaşır suyu bazdır; karışınca klor gazı çıkar.');
    c.note('<b>Çamaşır suyu ile tuz ruhu karışırsa klor gazı çıkar.</b>', 'İki ürün, bir gaz', 'etkilesim-iki-urun-bir-gaz');
    await sil(g2);

    // Önce etiket okunur
    const g3 = yeni();
    yazi(c, g3, 500, 95, 'Önce etiketi oku', { size: 38, kalin: 700, renk });
    kart(c, g3, 'Alev işareti', ['Ateşten, ısıdan', 'uzak tut'], { x: 60, y: 150, w: 420, h: 250, renk: RENK.b, size: 30 });
    kart(c, g3, 'Zehirli madde', ['Vücuda değdirme,', 'buharını soluma'], { x: 520, y: 150, w: 420, h: 250, renk: RENK.a, size: 30 });
    yazi(c, g3, 500, 475, 'İşaret önlemi önceden söyler', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Kimyasal maddenin etiketinde uyarı, risk ve önlem bilgileri bulunur.');
    await c.say('Etiketteki sağlık ve güvenlik işaretlerine risk piktogramı denir.');
    await c.say('Alev işareti, maddeyi ateşten ve ısıdan uzak tut demektir.');
    await c.say('Zehirli madde vücuda değdirilmez, buharı solunmaz.');
    c.note('<b>Risk piktogramı: etiketteki sağlık ve güvenlik işareti.</b><br>Önce etiket okunur.', 'Risk piktogramı', 'etkilesim-risk-piktogrami');
    await sil(g3);

    // Laboratuvar güvenlik kuralları
    const g4 = yeni();
    yazi(c, g4, 500, 95, 'Laboratuvar kuralları', { size: 38, kalin: 700, renk });
    kart(c, g4, 'Yapılır', ['Gözlük ve eldiven tak', 'Önce izin al'], { x: 60, y: 150, w: 420, h: 250, renk: RENK.a, size: 30 });
    kart(c, g4, 'Yapılmaz', ['Koklama, tatma', 'Ağızla çekme'], { x: 520, y: 150, w: 420, h: 250, renk: RENK.b, size: 30 });
    await goster(g4, 'Önlük, gözlük ve eldiven kişisel koruyucu ekipmandır.');
    await c.say('Sorumlu kişi izin vermeden hiçbir maddeye ve düzeneğe dokunulmaz.');
    await c.say('Kimyasal maddeler koklanmaz, tadına bakılmaz; sıvı ağızla değil puarla çekilir.');
    c.note('<b>Gözlük ve eldiven takılır, izin alınır.</b><br>Koklanmaz, tadına bakılmaz, sıvı ağızla çekilmez.', 'Laboratuvar kuralları', 'etkilesim-laboratuvar-kurallari');
    await sil(g4);

    // Önlem bütün uyarıları karşılar
    const g5 = yeni();
    yazi(c, g5, 500, 95, 'Önlem bütün uyarıları karşılar', { size: 38, kalin: 700, renk });
    kart(c, g5, 'Eldiven', ['eli korur'], { x: 60, y: 150, w: 420, h: 190, renk: RENK.a, size: 32 });
    kart(c, g5, 'Gözlük', ['gözü korur'], { x: 520, y: 150, w: 420, h: 190, renk: RENK.b, size: 32 });
    yazi(c, g5, 500, 450, 'Önlem zinciri hata halkasından koparır', { size: 28, renk: RENK.soluk });
    await goster(g5, 'Önlem, etiketteki uyarıya ve güvenlik kuralına dayanır.');
    await c.say('Eldiven yalnızca eli örter; gözü gözlük korur.');
    await c.say('İşaretin adını bilmek yetmez; önlem bütün uyarıları karşılamalıdır.');
    c.note('<b>Önlem, etiketteki uyarıya ve güvenlik kuralına dayanır.</b><br>Göz için gözlük', 'Önlemi değerlendir', 'etkilesim-onlemi-degerlendir');
    await sil(g5);

    // Atık kabı
    const g6 = yeni();
    yazi(c, g6, 500, 95, 'Atık nereye gider?', { size: 38, kalin: 700, renk });
    kart(c, g6, 'Uygun atık kabı', ['Atık kimyasallar', 'burada toplanır'], { x: 60, y: 150, w: 420, h: 250, renk: RENK.a, size: 30 });
    kart(c, g6, 'Lavabo, toprak', ['Atık dökülmez'], { x: 520, y: 150, w: 420, h: 250, renk: RENK.b, size: 30 });
    yazi(c, g6, 500, 475, 'Berrak görünmek zararsız demek değil', { size: 28, renk: RENK.soluk });
    await goster(g6, 'Atık kimyasallar uygun atık kaplarında toplanır.');
    await c.say('Berrak görünmek zararsız olmak demek değildir; kural her atık için geçerlidir.');
    c.note('<b>Atık kimyasallar uygun atık kaplarında toplanır.</b><br>Berrak görünen atık da zararsız değildir.', 'Atık kabı', 'etkilesim-atik-kabi');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-b3', kicker: 'Konu B · Kimyasal maddeler ve güvenlik', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Kimyasal maddeler ve güvenlik',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Çiftçi, tarım ilacını gereğinden fazla döküyor; ilaç dereye karışıyor ve dere kirleniyor. Kazanın zinciri “madde → hata → sonuç” sırasıyla hangisidir?',
        options: ['Dere kirlendi → ilacı fazla dökmek → tarım ilacı', 'İlacı fazla dökmek → tarım ilacı → dere kirlendi', 'Tarım ilacı → ilacı fazla dökmek → dere kirlendi'], answer: 2,
        why: ['Sıra ters: dere kirlenmesi sonuçtur, zincirin sonuna yazılır.', 'Zincir maddeyle başlar; hata, o maddenin nasıl kullanıldığıdır.', 'Evet. Madde tarım ilacı, hata fazla dökmek, sonuç derenin kirlenmesidir.'], scene: 0,
      },
      {
        q: 'Etiketinde halkasız alev işareti bulunan bir boya tinerinin yanında hangi davranış uyarıya aykırıdır?',
        options: ['Yanında kibrit yakmak', 'Kapağını sıkıca kapatmak', 'Etiketini yeniden okumak'], answer: 0,
        why: ['Evet. Alev işareti, maddeyi ateşten, kıvılcımdan ve ısıdan uzak tut demektir.', 'Kapağı kapatmak uyarıya aykırı değildir.', 'Etiketi okumak uyarıya aykırı değil, gereklidir.'], scene: 0,
      },
      {
        q: 'Aşağıdaki cümlelerden hangisi yalnızca bir maddenin özelliğini söyler?',
        options: ['Öğrenci, tavaları yağ çözücülü suya batırdı.', 'Yağ çözücü göze değerse yanma yapabilir.', 'Sıvı öğrencinin yüzüne sıçradı.'], answer: 1,
        why: ['Bu, öğrencinin yaptığı bir davranıştır; hata halkasına girer.', 'Evet. Göze değince yanma yapması, yağ çözücünün özelliğidir.', 'Sıçrama, hatanın ardından çıkan sonuçtur.'], scene: 0,
      },
      {
        q: 'Öğretmen sınıftan çıktığında bir öğrenci masadaki düzeneği merak ediyor. Kurala uygun davranış hangisidir?',
        options: ['Bir kez çalıştırıp bakmak', 'İzin verilene kadar dokunmamak', 'Sıvının kokusuna bakmak'], answer: 1,
        why: ['Sorumlu kişi izin vermeden hiçbir düzeneğe dokunulmaz.', 'Evet. İzin verilmeden hiçbir maddeye ve düzeneğe dokunulmaz.', 'Kimyasal maddeler koklanmaz.'], scene: 0,
      },
      {
        q: 'Duru: “Deney sonunda kalan sıvı su gibi berrak ve kokusuz; lavaboya dökebiliriz.” Duru için ne söylenebilir?',
        options: ['Haksız; berrak görünen atık da uygun atık kabına konur.', 'Haklı; berrak sıvı lavaboya dökülünce zarar vermez.', 'Haksız; atık yalnızca bahçedeki toprağa dökülür.'], answer: 0,
        why: ['Evet. Berrak görünmek zararsız olmak demek değildir; kural her atık için geçerlidir.', 'Lavaboya dökülen atık suya karışır; berrak görünmesi zararsız olduğunu göstermez.', 'Toprak da doğanın parçasıdır; atık oraya dökülmez.'], scene: 0,
      },
      {
        q: 'Sodyum yağ içinde dururken kaza çıkarmıyor; suya konunca şiddetli tepkime veriyor. Bu durum neyi gösterir?',
        options: ['Sodyumun suyla tepkime özelliği yalnızca yağ içinde ortaya çıkar.', 'Kazanın sonucunu yalnızca sodyumun kendisi belirler.', 'Sonuç, özelliğe ve yapılan davranışa birlikte bağlıdır.'], answer: 2,
        why: ['Sodyum suya konunca tepkime verir; özelliği yağ içinde ortaya çıkmaz.', 'Aynı sodyum yağ içinde güvenli, suya konunca tehlikelidir; yalnızca madde belirleyici değildir.', 'Evet. Sodyum aynı, yapılan davranış farklı; sonuç ikisine birlikte bağlıdır.'], scene: 0,
      },
      {
        q: 'Tahriş edici madde ve yanıcı-parlayıcı madde işaretleri taşıyan bir sıvıyı aktaracak öğrenci ne yapmalıdır?',
        options: ['Gözlük ve eldiven takıp ateşten uzakta aktarmak', 'Gözlük ve eldiven takıp yanan ocağın yanında aktarmak', 'Eldivensiz ve gözlüksüz, ateşten uzakta aktarmak'], answer: 0,
        why: ['Evet. Tahriş edici madde deriye ve göze zarar verir; yanıcı madde ateşten uzak tutulur.', 'Koruyucu ekipman var ama yanıcı-parlayıcı madde ateşten ve ısıdan uzak tutulmalı.', 'Eldiven mutlaka takılır, göz için gözlük gerekir; ateşten uzak olması tek başına yetmez.'], scene: 0,
      },
      {
        q: 'Bir kaza raporunda yalnızca “Banyoda iki kişi öksürmeye ve nefes darlığına başladı.” yazıyor. Zincirin hangi halkaları eksiktir?',
        options: ['Yalnızca hata', 'Madde ve hata', 'Yalnızca madde'], answer: 1,
        why: ['Madde de yazılmamış; hangi ürünün kullanıldığı bilinmiyor.', 'Evet. Raporda yalnızca sonuç var; kullanılan madde ile yapılan hata eksik.', 'Hata da yazılmamış; ne yapıldığı bilinmiyor.'], scene: 0,
      },
    ],
    summary: [
      '<b>Hangi madde, hangi hata, hangi sonuç?</b> Bir kazayı bu üç halkayla tanımlarız.',
      'Önlem, zinciri <b>hata halkasından koparır</b>; etiketteki uyarıya ve güvenlik kuralına dayanır.',
      '<b>Önce etiket, sonra uygun önlem.</b> Atık kimyasallar uygun atık kaplarında toplanır.',
    ],
    nextLesson: { href: 'c1-atom-modelleri.html', label: 'Sonraki konu: Atom teorileri ›' },
  });
})();
