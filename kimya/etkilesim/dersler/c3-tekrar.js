/* C3 — Konu tekrarı: Atom teorileri
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#c792ff';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Teori açıklar, model temsil eder
    const g1 = yeni();
    yazi(c, g1, 500, 85, 'Teori ve model', { size: 38, kalin: 700, renk });
    kart(c, g1, 'Teori', ['açıklar'], { x: 60, y: 160, w: 420, h: 200, renk: RENK.a, size: 34 });
    kart(c, g1, 'Model', ['temsil eder'], { x: 520, y: 160, w: 420, h: 200, renk: RENK.b, size: 34 });
    yazi(c, g1, 500, 470, 'Atomun çizimi bir modeldir', { size: 30, renk: RENK.soluk });
    await goster(g1, 'Teori, bir olayı genel ve sistemli biçimde açıklar.');
    await c.say('Model, teoriyi temsil eden çizim, sembol ya da matematiksel ifadedir.');
    await c.say('Atom modeli, atomun kendisi değil, teorinin temsilidir.');
    c.note('<b>Teori açıklar, model temsil eder.</b><br>Çubuk mıknatıs çizimi bir modeldir.', 'Teori ve model', 'etkilesim-teori-model');
    await sil(g1);

    // Beş model, beş kavram
    const g2 = yeni();
    yazi(c, g2, 500, 85, 'Her model bir kavram ekledi', { size: 38, kalin: 700, renk });
    [['1803', 'küre'], ['1897', 'yüklü tanecik'], ['1911', 'çekirdek'], ['1913', 'yörünge'], ['1926', 'orbital']].forEach(([yil, kavram], i) => {
      const y = 190 + i * 70;
      yazi(c, g2, 250, y, yil, { size: 34, kalin: 700, hiza: 'start', renk: RENK.b });
      yazi(c, g2, 400, y, kavram, { size: 34, hiza: 'start' });
    });
    await goster(g2, 'Atom için 1803’ten 1926’ya kadar beş model önerildi.',
      { speak: 'Atom için bin sekiz yüz üçten bin dokuz yüz yirmi altıya kadar beş model önerildi.' });
    await c.say('Her yeni model, atoma yeni bir kavram ekledi.');
    await c.say('Sırayla küre, yüklü tanecik, çekirdek, yörünge ve orbital geldi.');
    c.note('<b>Her model bir kavram ekledi.</b><br>Küre → yüklü tanecik → çekirdek → yörünge → orbital', 'Beş model', 'etkilesim-bes-model');
    await sil(g2);

    // Üç temel tanecik
    const g3 = yeni();
    yazi(c, g3, 500, 85, 'Üç temel tanecik', { size: 38, kalin: 700, renk });
    [['Proton', '+1', RENK.b], ['Elektron', '−1', RENK.a], ['Nötron', '0', RENK.vurgu]].forEach(([ad, yuk, r], i) => {
      const y = 170 + i * 65;
      yazi(c, g3, 280, y, ad, { size: 34, hiza: 'start' });
      yazi(c, g3, 650, y, yuk, { size: 36, kalin: 700, hiza: 'start', renk: r });
    });
    yazi(c, g3, 500, 400, 'Nötr atom: proton = elektron', { size: 32, kalin: 700, renk });
    yazi(c, g3, 500, 470, 'Kütle: proton ≈ 1836 × elektron', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Proton +1, elektron −1 yüklüdür; nötron yüksüzdür.',
      { speak: 'Proton artı bir, elektron eksi bir yüklüdür; nötron yüksüzdür.' });
    await c.say('Nötr bir atomda proton sayısı elektron sayısına eşittir.');
    await c.say('Protonun kütlesi elektronunkinin yaklaşık 1836 katıdır; nötronunki biraz büyüktür.',
      { speak: 'Protonun kütlesi elektronunkinin yaklaşık bin sekiz yüz otuz altı katıdır; nötronunki biraz büyüktür.' });
    c.note('<b>Proton +1, elektron −1, nötron 0.</b><br>Kütle: proton ≈ 1836 × elektron; nötron biraz daha büyük.', 'Üç tanecik', 'etkilesim-uc-tanecik');
    await sil(g3);

    // Atom aynı kaldı, model değişti
    const g4 = yeni();
    yazi(c, g4, 500, 85, 'Önce veri, sonra model', { size: 38, kalin: 700, renk });
    kart(c, g4, 'Atom', ['aynı kaldı'], { x: 60, y: 160, w: 420, h: 200, renk: RENK.a, size: 34 });
    kart(c, g4, 'Bilgi ve model', ['değişti'], { x: 520, y: 160, w: 420, h: 200, renk: RENK.b, size: 34 });
    yazi(c, g4, 500, 470, 'Yeni veri → yeni model', { size: 30, renk: RENK.soluk });
    await goster(g4, 'Önce yeni veri gelir, sonra model değişir.');
    await c.say('Eksi yüklü tanecik bulununca, model atomun içine yüklü tanecikler koydu.');
    await c.say('Atom 1803’ten 1926’ya aynı kaldı; değişen, onu anlatan modeldi.',
      { speak: 'Atom bin sekiz yüz üçten bin dokuz yüz yirmi altıya aynı kaldı; değişen, onu anlatan modeldi.' });
    c.note('<b>Atom aynı kaldı; yeni veri gelince model değişti.</b><br>1803–1926: beş model, tek atom', 'Değişen bilgi', 'etkilesim-degisen-bilgi');
    await sil(g4);

    // Bohr: enerji seviyeleri
    const g5 = yeni();
    yazi(c, g5, 500, 85, 'Bohr: enerji seviyeleri', { size: 38, kalin: 700, renk });
    kart(c, g5, 'Soğurma', ['enerji alır', 'yüksek seviyeye çıkar'], { x: 60, y: 150, w: 420, h: 230, renk: RENK.a, size: 28 });
    kart(c, g5, 'Yayma', ['enerji verir', 'düşük seviyeye iner'], { x: 520, y: 150, w: 420, h: 230, renk: RENK.b, size: 28 });
    yazi(c, g5, 500, 470, 'Yalnızca tek elektronlu sistemler', { size: 30, renk: RENK.soluk });
    await goster(g5, 'Bohr’a göre yörüngeler birer enerji seviyesidir; çekirdekten uzaklaştıkça enerji artar.',
      { speak: 'Bor’a göre yörüngeler birer enerji seviyesidir; çekirdekten uzaklaştıkça enerji artar.' });
    await c.say('Elektron daha yüksek seviyeye çıkarsa atom enerji soğurur, inerse yayar.');
    await c.say('Bohr teorisi yalnızca tek elektronlu sistemlerde geçerlidir.',
      { speak: 'Bor teorisi yalnızca tek elektronlu sistemlerde geçerlidir.' });
    c.note('<b>Soğurma (absorbsiyon): enerji alır, daha yüksek enerji seviyesine çıkar.</b><br>Yayma (emisyon): enerji verir, daha düşük enerji seviyesine iner.', 'Soğurma ve yayma', 'etkilesim-sogurma-yayma');
    await sil(g5);

    // Orbital: yol değil, bölge
    const g6 = yeni();
    yazi(c, g6, 500, 85, 'Yol değil, bölge', { size: 38, kalin: 700, renk });
    kart(c, g6, 'Yörünge', ['kesin yol'], { x: 60, y: 160, w: 420, h: 200, renk: RENK.a, size: 34 });
    kart(c, g6, 'Orbital', ['olasılık bölgesi'], { x: 520, y: 160, w: 420, h: 200, renk: RENK.b, size: 34 });
    yazi(c, g6, 500, 470, 'Yer ve hız birlikte kesin bilinmez', { size: 30, renk: RENK.soluk });
    await goster(g6, 'Elektronun yeri ve hızı aynı anda kesin olarak belirlenemez.');
    await c.say('Bu yüzden elektrona kesin bir yol çizilemez.');
    await c.say('Bulunma olasılığının yüksek olduğu bölgeye orbital denir.');
    c.note('<b>Orbital: elektronun bulunma olasılığının yüksek olduğu bölge.</b><br>Yol değil, bölge.', 'Orbital', 'etkilesim-orbital');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-c3', kicker: 'Konu C · Atom teorileri', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Atom teorileri',
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
        q: 'Okulun fen laboratuvarında bir atom maketi yapıldı: renkli toplar çubuklarla bağlanmış. Maket için hangisi doğrudur?',
        options: ['Maket atomun kendisidir; yalnızca büyütülmüştür.', 'Maket bir modeldir; atomu açıklayan teoriyi temsil eder.', 'Maket bir teoridir; atomu genel ve sistemli açıklar.'], answer: 1,
        why: ['Atom gözle görülemez; maket atomun kendisi değil, bir temsildir.', 'Evet. Model, bir teoriyi temsil eden çizim, sembol ya da ifadedir; atomun kendisi değildir.', 'Teori bir açıklamadır; maket ise bir şeyin temsilidir, yani modeldir.'], scene: 0,
      },
      {
        q: 'Bir atomda elektron n = 1’den n = 2’ye çıkarken ve ayrı bir durumda n = 1’den n = 3’e çıkarken enerji soğuruyor. İlk geçişte soğurulan enerji ikincisine göre nasıldır?',
        options: ['Daha fazladır; çünkü yakın yörünge daha çok enerji ister.', 'Eşittir; çünkü iki geçişte de elektron n = 1’den başlar.', 'Daha azdır; çünkü n = 2, n = 3’ten daha düşük enerjilidir.'], answer: 2,
        why: ['Enerji çekirdekten uzaklaştıkça artar; n = 2’ye çıkmak, n = 3’e çıkmaktan daha az enerji ister.', 'Soğurulan enerji, başlangıç ile varış yörüngesi arasındaki farka eşittir; varış farklı olunca fark da değişir.', 'Evet. Soğurulan enerji iki yörüngenin enerji farkıdır; n = 1 ile n = 2 arasındaki fark, n = 1 ile n = 3 arasındakinden küçüktür.'], scene: 0,
      },
      {
        q: 'A ve B nötr atomlarının ikisinde de 4 proton var. A’nın çekirdeğinde 4, B’nin çekirdeğinde 6 nötron bulunuyor. Hangisinin kütlesi daha büyüktür?',
        options: ['B’nin; nötronlar da kütleye katkı yapar.', 'Eşit; nötron yüksüz olduğu için kütlesi yoktur.', 'A’nın; daha az nötronlu atom daha ağırdır.'], answer: 0,
        why: ['Evet. Atomun kütlesinin büyük kısmını proton ve nötronlar oluşturur; B’de iki nötron fazla.', 'Yüksüz olmak kütlesiz olmak değildir; nötronun kütlesi protonunkine çok yakındır.', 'Nötron sayısı arttıkça kütle artar; B’nin çekirdeğinde daha çok nötron var.'], scene: 0,
      },
      {
        q: 'Hangi cümle elektron için modern atom teorisiyle uyumludur?',
        options: ['Elektron, çekirdeğin çevresinde sabit bir daire üzerinde döner.', 'Elektronun belirli bir anda tam yeri kesin olarak bilinir.', 'Elektronun bulunma olasılığının yüksek olduğu bölgeler belirlenebilir.'], answer: 2,
        why: ['Sabit bir daire üzerinde dönme, kesin yörünge fikridir; modern teoride elektron belirli bir yörüngede dolanmaz.', 'Elektronun belirli bir anda tam yeri kesin olarak söylenemez.', 'Evet. Tam yer bilinmez ama olasılığı yüksek bölgeler, yani orbitaller belirlenebilir.'], scene: 0,
      },
      {
        q: 'Atomda eksi yük bulunduğu 1891’de ortaya kondu; çekirdek kavramı ise 1911’deki modelle geldi. Bu iki tarih arasında kurulan model hangisidir?',
        options: ['Dalton modeli', 'Thomson modeli', 'Bohr modeli'], answer: 1,
        why: ['Dalton modeli 1803’te kuruldu; 1891’den öncedir.', 'Evet. Thomson modeli 1897’de kuruldu; iki tarihin arasındadır.', 'Bohr modeli 1913’te kuruldu; 1911’den sonradır.'], scene: 0,
      },
      {
        q: 'Berilyum atomunun 4 elektronu vardır. Bohr teorisi hangisindeki elektronu açıklayabilir?',
        options: ['Üç elektronunu kaybetmiş Be³⁺ iyonu', 'Nötr Be atomu', 'Bir elektronunu kaybetmiş Be⁺ iyonu'], answer: 0,
        why: ['Evet. Dört elektrondan üçü gidince tek elektron kalır; teori tek elektronlu sistemlerde geçerlidir.', 'Nötr atomda dört elektron vardır; teori iki ya da daha çok elektronda yetersiz kalır.', 'Be⁺ iyonunda üç elektron kalır; teori yine yetersiz kalır.'], scene: 0,
      },
      {
        q: '1913’teki Bohr modeli, atom modeline hangi yeni kavramı ekledi?',
        options: ['Çekirdek', 'Orbital', 'Yörünge'], answer: 2,
        why: ['Çekirdek kavramı 1911’deki Rutherford modeliyle geldi.', 'Orbital kavramı 1926’daki modern atom teorisiyle geldi.', 'Evet. 1913’teki Bohr modeli yörünge kavramını ekledi.'], scene: 0,
      },
      {
        q: 'Bir öğrenci “Elektronun hem yerini hem hızını aynı anda tam olarak ölçtüm” diyor. Bu iddia hangi bilgiyle çelişir?',
        options: ['Elektronun yeri ve hızı aynı anda kesin belirlenemez.', 'Elektron çekirdeğin çevresinde bulunur.', 'Atom enerji soğurabilir ve yayabilir.'], answer: 0,
        why: ['Evet. Yer ve hız aynı anda kesin belirlenemez; bu, belirsizlik ilkesidir.', 'Bu bilgi elektronun nerede bulunabileceğini söyler; ölçümün kesinliğiyle çelişmez.', 'Enerji alışverişi, yer ve hız ölçümüyle ilgili değildir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Atom aynı kaldı; yeni veri gelince model değişti.</b> Her model atoma bir kavram ekledi.',
      'Proton +1, elektron −1, nötron 0; <b>nötr atomda proton sayısı elektron sayısına eşittir.</b>',
      '<b>Elektronun yolu çizilmez; bulunabileceği bölge çizilir.</b> Kesin yörüngenin yerini orbital aldı.',
    ],
    nextLesson: { href: 'd1-orbital-enerjileri.html', label: 'Sonraki konu: Orbitallerin enerjisi ›' },
  });
})();
