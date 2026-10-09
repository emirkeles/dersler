/* D3 — Konu tekrarı: Fizik bilimi ile ilgili kariyer keşfi
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, belir, kart } = window.KIT;
  const renk = '#c792ff';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const kartO = (baslik, metin, r) => ({ baslik, metin, renk: r, baslikSize: 26, size: 26 });

    // Bilimsel araştırma merkezinde disiplinler birlikte çalışır
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Bilimsel araştırma merkezi', { size: 38, kalin: 700, renk });
    ['Fizik', 'Kimya', 'Biyoloji', 'Mühendislik'].forEach((ad, i) => {
      kart(c, g1, 30 + i * 240, 190, 220, 110, { metin: ad, renk: RENK.disiplin, size: 26 });
    });
    yazi(c, g1, 500, 400, 'birlikte deney ve araştırma', { size: 32, renk: RENK.soluk });
    await goster(g1, 'Fizikçiler araştırma merkezlerinde başka disiplinlerle birlikte çalışır.');
    await c.say('Bilimsel araştırma merkezi, bilim insanlarının birlikte deney yaptığı kurumdur.');
    c.note('<b>Bilimsel araştırma merkezi:</b> bilim insanlarının birlikte deney ve araştırma yaptığı kurum', 'Anahtar kavram', 'arastirma-merkezi');
    await sil(g1);

    // Kurumun adı yaptığı işi söyler
    const g2 = yeni();
    yazi(c, g2, 500, 80, 'Kurum ve yaptığı iş', { size: 36, kalin: 700 });
    kart(c, g2, 60, 130, 420, 140, kartO('TÜBİTAK', 'araştırmaları destekler', RENK.kurum));
    kart(c, g2, 520, 130, 420, 140, kartO('TENMAK', 'nükleer teknoloji', RENK.kurum));
    kart(c, g2, 60, 300, 420, 140, kartO('ASELSAN', 'haberleşme ve radar', RENK.kurum));
    kart(c, g2, 520, 300, 420, 140, kartO('CERN', 'atom altı parçacıklar', RENK.kurum));
    await goster(g2, 'Kurumun adı, yaptığı işi söyler.');
    await c.say('TÜBİTAK araştırmaları destekler, TENMAK nükleer teknoloji üzerine çalışır.');
    await c.say('ASELSAN haberleşme ve radar geliştirir, CERN atom altı parçacıkları inceler.', { speak: 'ASELSAN haberleşme ve radar geliştirir, Sörn atom altı parçacıkları inceler.' });
    c.note('<b>Kurumun adı, yaptığı işi söyler.</b><br>Sekiz kurumun hepsinde fizikle ilgili çalışma yapılır.', 'Kurumlar', 'fizik-kurumlar');
    await sil(g2);

    // Merak et, soruya çevir
    const g3 = yeni();
    yazi(c, g3, 500, 80, 'Merak et, soruya çevir', { size: 36, kalin: 700 });
    kart(c, g3, 60, 150, 420, 250, kartO('Çalışmaya yönelik', 'ASELSAN sağlık alanında hangi cihazları geliştirdi?', RENK.kurum));
    kart(c, g3, 520, 150, 420, 250, kartO('Mesleğe yönelik', 'TENMAK’ta fizikçiler hangi işleri yapar?', RENK.kisi));
    await goster(g3, 'Merak, soruya çevrilince araştırılabilir.');
    await c.say('Soru kurumdaki işi soruyorsa çalışmaya yönelir.');
    await c.say('Orada çalışan insanları soruyorsa mesleğe yönelir.');
    c.note('<b>Merak et, soruya çevir.</b><br>Soru çalışmaya ya da mesleğe yönelir.', 'Soru sorma', 'soru-sorma');
    await sil(g3);

    // Kaynağı sına
    const g4 = yeni();
    yazi(c, g4, 500, 90, 'Kaynağı sına', { size: 40, kalin: 700, renk });
    kart(c, g4, 40, 170, 280, 140, { metin: 'Kim yazdı?', renk: RENK.kaynak, size: 26 });
    kart(c, g4, 360, 170, 280, 140, { metin: 'İlk elden mi?', renk: RENK.kaynak, size: 26 });
    kart(c, g4, 680, 170, 280, 140, { metin: 'Güncel mi?', renk: RENK.kaynak, size: 26 });
    yazi(c, g4, 500, 420, 'Sınanmalı, yanlış demek değildir', { size: 28, renk: RENK.soluk });
    await goster(g4, 'Bir kaynağı üç soruyla sınarsın.');
    await c.say('Kim yazdı, ilk elden mi, güncel mi?');
    await c.say('Sınanmalı, yanlış demek değildir; başka kaynakla doğrulanır.');
    c.note('<b>Kaynağı sına:</b> kim yazdı, ilk elden mi, güncel mi?', 'Kaynak', 'kaynak');
    await sil(g4);

    // Bilgiyi kaynaklı notla karşılaştır
    const g5 = yeni();
    yazi(c, g5, 500, 70, 'Bilgiyi notla karşılaştır', { size: 36, kalin: 700 });
    kart(c, g5, 100, 110, 800, 140, kartO('Notum', 'TENMAK’ta fizikçiler santral güvenliği üzerine çalışır.', RENK.kaynak));
    kart(c, g5, 100, 290, 390, 190, kartO('Notta var', 'bilgi uyuşuyor', RENK.iyi));
    kart(c, g5, 510, 290, 390, 190, kartO('Notta yok', 'doğrulanana kadar kullanılmaz', RENK.kisi));
    await goster(g5, 'Bulduğun bilgiyi kaynağıyla birlikte not edersin.');
    await c.say('Sonra duyduğun her cümleyi notunla karşılaştırırsın.');
    await c.say('Notta olmayan bilgi, doğrulanana kadar kullanılmaz.');
    c.note('<b>Bilgiyi kaynağıyla not et, sonra karşılaştır.</b><br>Notta olmayan bilgi, doğrulanana kadar kullanılmaz.', 'Kaynaklı not', 'fizik-kaynakli-not');
    await sil(g5);

    // Dersten mesleğe ve yol haritası
    const g6 = yeni();
    yazi(c, g6, 500, 70, 'Dersten mesleğe', { size: 38, kalin: 700, renk });
    yazi(c, g6, 120, 175, 'Isı transferi', { size: 32, kalin: 700, hiza: 'start', renk: RENK.disiplin });
    cizgi(c, g6, 400, 164, 500, 164, RENK.ince);
    yazi(c, g6, 540, 175, 'termodinamik', { size: 32, hiza: 'start', renk: RENK.dal });
    kart(c, g6, 30, 270, 290, 200, { metin: 'Fizik bölümü', renk: RENK.dal, size: 26 });
    kart(c, g6, 355, 270, 290, 200, { metin: 'Yüksek lisans ya da doktora', renk: RENK.dal, size: 26 });
    kart(c, g6, 680, 270, 290, 200, { metin: 'Medikal fizik', renk: RENK.dal, size: 26 });
    cizgi(c, g6, 322, 370, 353, 370, RENK.ince);
    cizgi(c, g6, 647, 370, 678, 370, RENK.ince);
    await goster(g6, 'Dersin açıklamasındaki konuya bakıp mesleğin alt dalını çıkarırsın.');
    await c.say('Isı ve sıcaklık, termodinamiğin konusudur.');
    await c.say('Yol, fizik bölümünden yüksek lisans ya da doktoraya, kariyer alanına uzanır.');
    c.note('<b>Dersin konusu, mesleğin yararlandığı alt dalı gösterir.</b><br>Yol: fizik bölümü, yüksek lisans ya da doktora, kariyer alanı.', 'Meslek ve yol', 'fizik-meslek-yol');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-d3', kicker: 'Konu D · Fizik bilimi ile ilgili kariyer keşfi', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Fizik bilimi ile ilgili kariyer keşfi',
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
        q: 'Bir öğrenci ESA’nın bir görevi hakkında iki kaynak buldu: ESA’nın kendi sitesindeki tarihli duyuru ve bir öğrencinin duyuruyu yorumladığı blog yazısı. Hangisi ilk elden kaynaktır?',
        options: ['ESA’nın kendi sitesindeki tarihli duyuru', 'Bir öğrencinin yorumladığı blog yazısı', 'İkisi de aynı ölçüde ilk elden'], answer: 0,
        why: ['Evet. Kurumun kendi sitesindeki tarihli duyuruda yazan belli, bilgi ilk elden ve tarihli.', 'Blog yazısı bilgiyi başka birinin duyurusundan aktarıyor; ilk elden değil.', 'İkisi aynı değil: bilgiyi kurumun kendisi veriyorsa kaynak ilk elden; yorum yazısı bilgiyi aktarır.'], scene: 0,
      },
      {
        q: 'Bir öğrenci, nükleer santrallerin güvenliği üzerine çalışan bir fizikçi olmak istiyor. Hangi kurumun çalışmalarına bakmalı?',
        options: ['ASELSAN', 'TENMAK', 'ESA'], answer: 1,
        why: ['ASELSAN haberleşme, radar ve insansız sistemler geliştirir; santral güvenliği onun işi değil.', 'Evet. TENMAK nükleer teknoloji ve radyasyon üzerine çalışır; fizikçileri nükleer santrallerin güvenliği üzerine de çalışır.', 'ESA uzayın keşfi için kurulmuştur; santral güvenliği onun işi değil.'], scene: 0,
      },
      {
        q: 'Notunda şu yazıyor: “NASA’da astrofizikçiler yıldız ve galaksileri araştırır (kaynak: NASA’nın kendi sitesi).” Bir arkadaşın “NASA’nın bütçesi her yıl artıyor” dedi. Ne yaparsın?',
        options: ['Arkadaşım söylediği için doğru bilgi olarak notuma yazarım.', 'Notumdaki bilgiyi yanlış sayıp silerim.', 'Notumda böyle bir bilgi yok; doğrulanana kadar kullanmam.'], answer: 2,
        why: ['Kaynağı olmayan bir cümle notuna doğrudan girmez; önce doğrulanır.', 'Arkadaşının cümlesi notundaki bilgiyi çürütmüyor; notun kaynaklı olduğu için yerinde durur.', 'Evet. Notta olmayan bilgi, doğrulanana kadar kullanılmaz.'], scene: 0,
      },
      {
        q: 'Bir öğrenci medikal fizik uzmanı olmak istiyor. Üniversitede fizik bölümünü bitirdi. Yolda sıradaki durak hangisi?',
        options: ['Doğrudan medikal fizikte çalışmaya başlamak', 'Yüksek lisans ya da doktora', 'Yeniden lise eğitimi almak'], answer: 1,
        why: ['Uzmanlıktan önce bir eğitim daha var; bölümden sonra doğrudan alana geçilmez.', 'Evet. Mezunlar yüksek lisans ya da doktorayla uzmanlaşır, sonra medikal fiziğe varır.', 'Lise, yolun başındadır; üniversiteden sonra geri dönülmez.'], scene: 0,
      },
      {
        q: 'Bir öğrenci “ESA’da çalışmak istiyorum” diyor. Hangi soru bu merakı mesleğe yönelik bir soruya çevirir?',
        options: ['ESA’da hangi meslek grubundan olsam görev alabilirim?', 'ESA uzayı keşfetmek için hangi çalışmaları yürütüyor?', 'ESA’nın merkezi hangi şehirdedir?'], answer: 0,
        why: ['Evet. Soru, kurumda çalışan meslekleri soruyor.', 'Bu soru mesleği değil, kurumda yapılan çalışmaları soruyor.', 'Bu soru kurumun yerini soruyor; mesleği sormuyor.'], scene: 0,
      },
      {
        q: 'Gezegen, yıldız ve galaksileri araştıracak yeni bir bilimsel araştırma ekibi kuruluyor. Ekip nasıl oluşturulmalı?',
        options: ['Yalnızca astrofizikçilerden; çünkü konu uzaydır.', 'Yalnızca mühendislerden; çünkü düzeneği onlar kurar.', 'Astrofizikçiler ve başka disiplinlerden uzmanlar bir arada.'], answer: 2,
        why: ['Düzeneği kurmak, çalıştırmak ve veriyi çözmek tek uzmanlıkla olmaz.', 'Mühendisler gerekli ama deneyi tasarlayan ve sonucu yorumlayan bilim insanları da gerekir.', 'Evet. Bilimsel araştırma merkezlerinde farklı disiplinler birlikte çalışır.'], scene: 0,
      },
      {
        q: 'Bir üniversite dersinin açıklaması: “kristal yapılar ve çip üretimi”. Bu ders fiziğin hangi alt dalına dayanır?',
        options: ['Atom fiziği', 'Katı hâl fiziği', 'Nükleer fizik'], answer: 1,
        why: ['Atom fiziği atomun bütününe bakar; kristal ve çip için “katı” sözü ipucudur.', 'Evet. Kristal de çip de katıdır; dersin konusu katı hâl fiziğine dayanır.', 'Nükleer fizik atom çekirdeğini inceler; dersin açıklamasında çekirdek yok.'], scene: 0,
      },
      {
        q: 'Bir öğrenci: “Parçacık fiziği laboratuvarı günlük hayatıma dokunmaz.” diyor. Hangi bilgi öğrencinin yanıldığını gösterir?',
        options: ['Dokunmatik ekranlar ve World Wide Web CERN’de geliştirildi.', 'Büyük Hadron Çarpıştırıcısı 27 kilometre uzunluğundadır.', 'CERN, Fransa-İsviçre sınırında, Cenevre yakınlarındadır.'], answer: 0,
        why: ['Evet. Dokunmatik ekran ve web gibi günlük hayatın parçaları CERN’de geliştirildi.', 'Bu bilgi doğru ama günlük hayatla bir bağ kurmuyor.', 'Bu bilgi de doğru ama CERN’in yerini söylüyor; günlük hayatla bağını göstermiyor.'], scene: 0,
      },
    ],
    summary: [
      '<b>İyi araştırma, iyi sorulmuş bir soruyla başlar.</b> Soru çalışmaya ya da mesleğe yönelir.',
      'Bilimsel araştırma merkezlerinde farklı disiplinler <b>birlikte</b> çalışır; her kurumun adı yaptığı işi söyler.',
      '<b>Önce kaynağı sına, sonra bilgiye güven:</b> kim yazdı, ilk elden mi, güncel mi? Bilgiyi kaynaklı notunla karşılaştır.',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
