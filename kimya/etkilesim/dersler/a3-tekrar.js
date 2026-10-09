/* A3 — Konu tekrarı: Günlük hayatta kimya
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#f5b04c';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Özellik işi belirler
    const g1 = yeni();
    yazi(c, g1, 500, 120, 'Maddenin özelliği → ürünün işi', { size: 38, kalin: 700, renk });
    yazi(c, g1, 500, 260, 'Limon tuzu kireci çözer.', { size: 34 });
    yazi(c, g1, 500, 340, 'Gazlı içecek paslı metali temizler.', { size: 34 });
    yazi(c, g1, 500, 460, 'Önce maddenin özelliğine bak', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Bir ürünün ne işe yaradığını, içindeki maddenin özelliği belirler.');
    await c.say('Limon tuzu kireci çözer; bu yüzden kireç çözücü olarak kullanılır.');
    c.note('<b>Ürünün işini, içindeki maddenin özelliği belirler.</b><br>Limon tuzu kireci çözer.', 'Özellik ve iş', 'etkilesim-ozellik-is');
    await sil(g1);

    // Koşul sonucu değiştirir: asitlik ve sıcaklık
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Koşul değişir, sonuç değişir', { size: 38, kalin: 700, renk });
    yazi(c, g2, 500, 200, 'pH 7’den küçük: asidik · büyük: bazik', { size: 32 });
    yazi(c, g2, 500, 270, 'pH küçüldükçe asitlik artar', { size: 32 });
    yazi(c, g2, 500, 390, 'Asidik sos, sıcak fırın', { size: 34, kalin: 700, renk: RENK.a });
    yazi(c, g2, 500, 460, 'yiyeceğe daha çok alüminyum', { size: 34 });
    await goster(g2, 'pH yediden küçükse madde asidik, yediden büyükse baziktir.', { speak: 'Pehaş yediden küçükse madde asidik, yediden büyükse baziktir.' });
    await c.say('pH küçüldükçe asitlik artar.', { speak: 'Pehaş küçüldükçe asitlik artar.' });
    await c.say('Sos asidikleştikçe ve fırın ısındıkça yiyeceğe daha çok alüminyum geçti.');
    c.note('<b>Sos asidikleştikçe yiyeceğe geçen alüminyum artar.</b><br>Sos B: pH 5,23 → 0,125 mg', 'Asitlik', 'etkilesim-asitlik');
    await sil(g2);

    // Güvenilir bilgi koşulu ve ölçüyü söyler
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'Güvenilir bilgi', { size: 38, kalin: 700, renk });
    kart(c, g3, 'Koşul var · ölçü var', ['Sos B · 200 °C', '0,130 mg alüminyum'], { x: 60, y: 190, w: 420, h: 250, renk: RENK.b, size: 30 });
    kart(c, g3, 'Koşul yok · ölçü yok', ['“Alüminyum folyo', 'zararlıdır.”'], { x: 520, y: 190, w: 420, h: 250, renk: RENK.vurgu, size: 30 });
    await goster(g3, 'Güvenilir bilgide kimin neyi, hangi koşulda ölçtüğü bellidir.');
    await c.say('Bir sonuç, yalnızca ölçüldüğü koşullar için geçerlidir.');
    c.note('<b>Güvenilir bilgi koşulu ve ölçüyü söyler.</b><br>Sos B, 200 °C: 0,130 mg', 'Ölçümle karar', 'etkilesim-olcumle-karar');
    await sil(g3);

    // Altı dal, altı soru
    const g4 = yeni();
    [['Analitik kimya', 'ne var, ne kadar?'], ['Biyokimya', 'canlılar'], ['Organik kimya', 'karbon bileşikleri'],
      ['Anorganik kimya', 'tuzlar, metaller'], ['Fizikokimya', 'koşul, enerji'], ['Polimer kimyası', 'büyük moleküller']].forEach(([ad, konu], i) => {
      const y = 95 + i * 80;
      yazi(c, g4, 130, y, ad, { size: 32, kalin: 700, hiza: 'start', renk });
      yazi(c, g4, 520, y, konu, { size: 32, hiza: 'start' });
    });
    await goster(g4, 'Kimya altı dala ayrılır; her dal maddeye başka bir soru sorar.');
    await c.say('Organik kimya karbon bileşiklerine, anorganik kimya geri kalanına bakar.');
    await c.say('Etki eden koşul ve enerji soruluyorsa dal fizikokimyadır.');
    c.note('<b>Kimyanın altı dalı var; her biri maddeye başka soru sorar.</b><br>Analitik, biyokimya, organik, anorganik, fizikokimya, polimer', 'Altı dal', 'etkilesim-alti-dal');
    await sil(g4);

    // Nitel ve nicel analiz
    const g5 = yeni();
    yazi(c, g5, 500, 100, 'Analitik kimyanın iki sorusu', { size: 38, kalin: 700, renk });
    kart(c, g5, 'Nitel analiz', ['Ne var?'], { x: 60, y: 170, w: 420, h: 200, renk: RENK.a, size: 34 });
    kart(c, g5, 'Nicel analiz', ['Ne kadar var?'], { x: 520, y: 170, w: 420, h: 200, renk: RENK.b, size: 34 });
    yazi(c, g5, 500, 470, 'Kandaki şeker miktarı: nicel analiz', { size: 30, renk: RENK.soluk });
    await goster(g5, 'Bileşenlerin ne olduğunu bulmaya nitel analiz denir.');
    await c.say('Her bileşenin miktarını bulmaya nicel analiz denir.');
    c.note('<b>Nitel analiz: ne var? Nicel analiz: ne kadar var?</b><br>Kandaki şeker miktarı: nicel analiz.', 'Nitel ve nicel', 'etkilesim-nitel-nicel');
    await sil(g5);

    // Kimyadan mesleğe
    const g6 = yeni();
    yazi(c, g6, 500, 100, 'Kimya eğitimi, farklı işler', { size: 38, kalin: 700, renk });
    yazi(c, g6, 500, 210, 'Ön lisans: kimya teknikeri', { size: 32 });
    yazi(c, g6, 500, 280, 'Lisans: kimyager, mühendis, öğretmen', { size: 32 });
    yazi(c, g6, 500, 400, 'İlaç · gıda · enerji · tarım · çevre', { size: 34, kalin: 700, renk: RENK.b });
    await goster(g6, 'Aynı kimya eğitimi, birbirinden çok farklı işlere açılır.');
    await c.say('Kimya okuyanlar ilaç, gıda, enerji, tarım ve çevre alanlarında çalışır.');
    await c.say('Su arıtma çevre alanının, pil teknolojileri enerji alanının işidir.');
    c.note('<b>Aynı kimya eğitimi çok farklı işlere açılır.</b><br>İlaç, gıda, enerji, tarım, çevre.', 'Kimyadan mesleğe', 'etkilesim-meslek');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-a3', kicker: 'Konu A · Günlük hayatta kimya', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Günlük hayatta kimya',
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
        q: 'Bir araştırmacı, yeni bir yapıştırıcının nasıl üretileceğini ve yapısını inceliyor. Hangi dalda çalışır?',
        options: ['Polimer kimyası', 'Anorganik kimya', 'Biyokimya'], answer: 0,
        why: ['Evet. Yapıştırıcılar polimerdir; üretimleri ve yapıları bu dalın konusudur.', 'Anorganik kimya asitlere, bazlara, tuzlara ve metallere bakar.', 'Biyokimya canlılardaki bileşikleri ve tepkimeleri inceler.'], scene: 0,
      },
      {
        q: 'Üç sıvının pH değeri ölçülüyor: sirke 3, süt 6,5 ve sabunlu su 9. Hangisi baziktir?',
        options: ['Sirke', 'Süt', 'Sabunlu su'], answer: 2,
        why: ['Sirkenin pH değeri yediden küçük; sirke asidiktir.', '6,5 yediye yakın ama yine yediden küçük; süt asidiktir.', 'Evet. pH yediden büyükse madde baziktir.'], scene: 0,
      },
      {
        q: 'Pil üreten bir fabrikada çalışan kimya mühendisi hangi alanda çalışıyor?',
        options: ['Gıda ve içecek endüstrisi', 'Enerji sektörü', 'Çevre ve sürdürülebilirlik'], answer: 1,
        why: ['Pil bir gıda ürünü değildir.', 'Evet. Pil ve yenilenebilir enerji teknolojileri enerji alanının işleridir.', 'Çevre alanının işleri su arıtma ve atık yönetimidir; burada pil üretiliyor.'], scene: 0,
      },
      {
        q: 'Demir bir bahçe kapısının kolu paslanmış. Pası temizlemek için hangi ürün kullanılabilir?',
        options: ['Antiasit tablet', 'Gazlı içecek', 'Diş macunu'], answer: 1,
        why: ['Antiasit tablet mide yanmasını gidermek için kullanılır.', 'Evet. Gazlı içecekler paslı metalleri temizlemekte kullanılabilir.', 'Diş macunu bir öz bakım ürünüdür; pası temizlediğini görmedik.'], scene: 0,
      },
      {
        q: 'Ali: “Analitik kimya yalnızca miktar ölçer.” Hangi örnek Ali’nin yanıldığını gösterir?',
        options: ['Bir suda hangi maddelerin bulunduğunu belirlemek', 'Kandaki şeker miktarını ölçmek', 'Pancardaki şeker miktarını belirlemek'], answer: 0,
        why: ['Evet. Bileşenlerin ne olduğunu bulmak nitel analizdir; miktar ölçülmez.', 'Bu bir miktar ölçümüdür; Ali’nin sözünü çürütmez.', 'Burada da miktar bulunuyor; nicel analizdir.'], scene: 0,
      },
      {
        q: 'Folyoya sarılan yiyeceğe hangi koşulda en çok alüminyum geçmesi beklenir?',
        options: ['pH 6 olan sos, 150 °C', 'pH 5 olan sos, 150 °C', 'pH 5 olan sos, 250 °C'], answer: 2,
        why: ['Bu sos daha az asidik, fırın da daha soğuk; birikim en az burada olur.', 'Sos asidik ama fırın soğuk; sıcaklık artınca birikim de artar.', 'Evet. Hem asitlik hem sıcaklık arttıkça yiyeceğe geçen alüminyum artar.'], scene: 0,
      },
      {
        q: 'Tuz, sıcak suda soğuk sudakinden daha hızlı çözünüyor. Sıcaklığın çözünmeye etkisini hangi dal açıklar?',
        options: ['Analitik kimya', 'Biyokimya', 'Fizikokimya'], answer: 2,
        why: ['Analitik kimya maddede ne olduğunu ve miktarını bulur; burada bir etki açıklanıyor.', 'Biyokimya canlıların kimyasıdır; burada canlı yok.', 'Evet. Çözünme ve sıcaklık gibi koşulların etkisi fizikokimyanın sorusudur.'], scene: 0,
      },
      {
        q: 'Bir yazıda şu cümle var: “Laboratuvar, kapta bekleyen suya 0,02 mg madde geçtiğini ölçtü.” Bu bilgide eksik olan nedir?',
        options: ['Ölçülen miktar', 'Ölçümün koşulu', 'Ölçümü yapan'], answer: 1,
        why: ['Miktar verilmiş: 0,02 mg.', 'Evet. Suyun kaç derecede, ne kadar beklediği söylenmiyor.', 'Ölçümü laboratuvarın yaptığı söyleniyor.'], scene: 0,
      },
    ],
    summary: [
      '<b>Ürünün işini ve güvenli kullanımını, içindeki maddenin özelliği belirler.</b>',
      'Bir sonuç, <b>ölçüldüğü koşullar</b> için geçerlidir; güvenilir bilgi koşulu ve ölçüyü söyler.',
      '<b>Kimya tek bilim, çok daldır;</b> her dal maddeye başka bir soru sorar.',
    ],
    nextLesson: { href: 'b1-kazayi-anlamak.html', label: 'Sonraki konu: Kimyasal maddeler ve güvenlik ›' },
  });
})();
