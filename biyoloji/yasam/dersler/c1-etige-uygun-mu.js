/* C1 · BİY.9.1.3 · Yazar notu: içerik MEB Biyoloji 9 s. 30 (COVID-19 "Human Challenge" araştırması: gönüllüler, amaç,
   önlemler, ödeme, iki görüş; gönüllü onam, bireysel hak ve toplumsal yarar soruları), s. 31 (doğal yaşam parkı ödevi ve
   üç raporun değerlendirmesi), s. 32 (veri, kaynak ve katkı kuralları), s. 87 (referans göstermeden veri kullanmak).
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): önce olay anlatılır,
   kural öğretilir, sonra olaya uygulatılır; öğrenciye kitap, sınıf ya da çekince söylenmez. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.C, IKINCI = 'var(--c5)', SOLUK = 'var(--muted)', IYI = 'var(--good)', KOTU = 'var(--bad)';

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const satirlar = (kart) => [...kart.querySelectorAll('text')].slice(1);
  const yaz = (kart, ...metin) => satirlar(kart).forEach((t, i) => { t.textContent = metin[i] || ''; });

  function kisi(c, p, x, y, r = renk) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: x, cy: y, r: 11, fill: r }, g);
    c.S('path', { d: `M ${x - 17} ${y + 40} Q ${x - 17} ${y + 15} ${x} ${y + 15} Q ${x + 17} ${y + 15} ${x + 17} ${y + 40} Z`, fill: r }, g);
    return g;
  }

  /* ---- Sahne 1 · Park ödevi ---- */
  async function odev(c) {
    const s = c.svg(1000, 562);
    let g = c.S('g', {}, s);
    const gruplar = c.S('g', {}, g);
    [50, 370, 690].forEach((x, i) => {
      K.kutu(c, gruplar, x, 35, 260, 120);
      for (let j = 0; j < 4; j++) kisi(c, gruplar, x + 50 + j * 53, 60);
      K.yazi(c, gruplar, x + 130, 140, `${i + 1}. grup`, { size: 24 });
    });
    await K.belir(c, gruplar);
    await c.say('Bir biyoloji öğretmeni, dörder kişilik üç gruba dönem ödevi veriyor.');
    const is = (x, ad) => { const k = c.S('g', {}, g); K.kutu(c, k, x, 200, 215, 75, { renk }); K.yazi(c, k, x + 107, 247, ad, { size: 26 }); return K.belir(c, k, 300); };
    await Promise.all([is(40, 'Gözlem'), is(275, 'Fotoğraf')]);
    await c.say('Gruplar bir doğal yaşam parkında beş yabani hayvanı gözleyip fotoğraflayacak.');
    await Promise.all([is(510, 'Kaynak bilgisi'), is(745, 'Anket')]);
    await c.say('Hayvanlar hakkında güvenilir kaynaklardan bilgi toplayacak, on ziyaretçiye de anket uygulayacaklar.');
    const rapor = c.S('g', {}, g);
    K.ok(c, rapor, 500, 290, 500, 335, renk);
    K.kutu(c, rapor, 330, 345, 340, 80, { renk: IKINCI });
    K.yazi(c, rapor, 500, 395, 'Rapor ve sunum', { size: 28, renk: IKINCI });
    await K.belir(c, rapor, 350);
    await c.say('Sonunda bulgularını bir raporda toplayıp sınıfa sunacaklar.');
    await sil(c, g);

    g = c.S('g', {}, s);
    const iki = c.S('g', {}, g);
    K.kart(c, iki, 110, 170, 360, 150, 'Sonuç', ['Ne bulundu?'], { renk: IKINCI });
    K.kart(c, iki, 530, 170, 360, 150, 'Yol', ['Nasıl yapıldı?'], { renk });
    await K.belir(c, iki);
    await c.say('Bir araştırma, sonucu kadar nasıl yapıldığıyla da değerlendirilir.');
    await K.belir(c, K.yazi(c, g, 500, 100, 'Bilim etiği: araştırmada uyulan etik kurallar', { size: 30, renk }), 350);
    await c.say('Araştırmada uyulması gereken etik kuralların tümüne bilim etiği denir.',
      { speak: 'Araştırmada uyulması gereken etik kuralların tümüne [short pause] bilim etiği denir.' });
    await sil(c, g);

    g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 120, 45, 760, 140, 'Kural', ['Alınan her bilginin kaynağı gösterilir'], { renk }));
    await c.say('Kurallardan biri şudur: başka kaynaktan alınan her bilgi için kaynak gösterilir.');
    await K.belir(c, K.yazi(c, g, 500, 250, 'Kaynakça: kullanılan kaynakların listesi', { size: 28 }), 300);
    await c.say('Bunun için raporun sonuna kaynakça, yani kullanılan kaynakların listesi yazılır.');
    await K.belir(c, K.kart(c, g, 340, 310, 320, 150, '3. rapor', ['Kaynakça yok'], { renk: KOTU }));
    await c.say('Öğretmen raporları inceliyor: üçüncü raporda kaynakça yok.');
    await c.choice({ tag: 'Uygula', q: 'Üçüncü rapordaki hayvan bilgileri doğru olabilir. Yine de bu raporda bilim etiği açısından sorun var mı?',
      options: ['Yok; bilgi doğruysa kaynak gerekmez.', 'Var; bilgilerin nereden alındığı gösterilmemiş.', 'Var; kaynakçasız rapordaki her bilgi yanlıştır.'], answer: 1,
      hints: ['Kural bilginin doğruluğuna bağlı değil: alınan her bilginin kaynağı gösterilir.', '', 'Kaynakça olmaması bilgiyi yanlış yapmaz; kaynağını belirsiz bırakır.'],
      right: 'Bilgi doğru olsa da kaynağı gösterilmemiş; kurala uyulmamış.' });
    c.note('<b>Alınan her bilginin kaynağı gösterilir.</b><br>Üçüncü rapor: kaynakça yok.', 'Kaynak gösterme');
  }

  /* ---- Sahne 2 · Kim çalıştı? ---- */
  async function katki(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 120, 25, 760, 135, 'Kural', ['Rapora yalnızca katkısı olanın adı yazılır'], { renk }));
    await c.say('Bir başka kural: rapora yalnızca çalışmaya katkısı olanların adı yazılır.');
    const raporlar = c.S('g', {}, g);
    const r1 = K.kart(c, raporlar, 40, 200, 290, 180, '1. rapor', ['Her üyenin işi', 'yazılı'], { renk: IYI, altSize: 26 });
    await K.belir(c, r1);
    await c.say('Birinci raporda her üyenin yaptığı iş açıkça belirtilmiş.');
    const r23 = c.S('g', {}, raporlar);
    K.kart(c, r23, 355, 200, 290, 180, '2. rapor', ['İş bölümü', 'yazılmamış'], { renk: IKINCI, altSize: 26 });
    K.kart(c, r23, 670, 200, 290, 180, '3. rapor', ['İş bölümü', 'yazılmamış'], { renk: IKINCI, altSize: 26 });
    await K.belir(c, r23);
    await c.say('İkinci ve üçüncü raporlarda ise iş bölümünden hiç söz edilmemiş.');
    await sil(c, raporlar);
    const sunum = c.S('g', {}, g);
    K.kutu(c, sunum, 300, 195, 400, 150, { renk: IKINCI });
    const uyeler = [0, 1, 2, 3].map((j) => kisi(c, sunum, 365 + j * 90, 235, IKINCI));
    const durum = K.yazi(c, sunum, 500, 400, 'Sunum: sınıf 2. gruba soru soruyor', { size: 28 });
    await K.belir(c, sunum);
    await c.say('Sunumda sınıf arkadaşları gruplara sorular soruyor.');
    uyeler[2].style.opacity = 0.25; uyeler[3].style.opacity = 0.25;
    durum.textContent = '2. grup: iki üye hiç görev almamış'; durum.style.fill = KOTU;
    await c.say('İkinci gruptaki iki üyenin ödevin hiçbir aşamasında görev almadığı ortaya çıkıyor.',
      { speak: '[thoughtful] İkinci gruptaki iki üyenin ödevin hiçbir aşamasında görev almadığı ortaya çıkıyor.' });
    await c.choice({ tag: 'Uygula', q: 'Rapor, dört kişilik grubun ortak çalışması olarak teslim edilmişti. Bu durumda hangisi doğrudur?',
      options: ['Sorun yok; hepsi aynı grupta.', 'Rapordaki bütün gözlemler geçersizdir.', 'Katkısı olmayan iki kişi, çalışmayı yapmış gibi gösterilmiş.'], answer: 2,
      hints: ['Aynı grupta olmak, çalışmaya katkı yapmış olmak değildir.', 'Bu durum gözlemlerin doğruluğu hakkında bir şey söylemez.', ''],
      right: 'Rapora yalnızca katkısı olanların adı yazılır; kurala uyulmamış.' });
    await K.belir(c, K.yazi(c, sunum, 500, 455, '1. rapor: her üyenin işi yazılı', { size: 28, renk: IYI }), 300);
    await c.say('Birinci rapor gibi iş bölümünü yazmak, kimin ne yaptığını açıkça gösterir.');
    c.note('<b>Rapora yalnızca katkısı olanın adı yazılır.</b><br>İkinci grup: iki üye hiç görev almamış.', 'Katkı');
  }

  /* ---- Sahne 3 · Fotoğraf ve anket ---- */
  async function veri(c) {
    const s = c.svg(1000, 562);
    let g = c.S('g', {}, s);
    K.yazi(c, g, 500, 80, 'Veri kuralları', { size: 30, renk });
    const kural = (y, metin) => K.belir(c, K.yazi(c, g, 500, y, metin, { size: 28 }), 300);
    await kural(170, 'Veri doğru ve güvenilir olmalı; değiştirilmez');
    await c.say('Araştırmada veriler doğru ve güvenilir olmalıdır; istenen sonuca göre değiştirilemez.');
    await kural(245, 'Sonucu desteklemeyen veri gizlenmez');
    await c.say('Sonucu desteklemeyen veri de gizlenmez; raporda yer alır.');
    await kural(320, 'Başkasının verisi kaynağı gösterilerek kullanılır');
    await c.say('Başkasının verisi ya da bulgusu ancak kaynağı gösterilerek kullanılabilir.');
    await sil(c, g);

    g = c.S('g', {}, s);
    const foto = (p, x, y) => {
      const f = c.S('g', {}, p);
      c.S('rect', { x, y, width: 240, height: 150, rx: 6, fill: '#101a33', stroke: SOLUK, 'stroke-width': 3 }, f);
      c.S('ellipse', { cx: x + 115, cy: y + 85, rx: 55, ry: 30, fill: IKINCI }, f);
      c.S('circle', { cx: x + 175, cy: y + 52, r: 20, fill: IKINCI }, f);
      c.S('path', { d: `M ${x + 192} ${y + 46} L ${x + 216} ${y + 54} L ${x + 192} ${y + 60} Z`, fill: '#ff8a5b' }, f);
      K.cizgi(c, f, x + 100, y + 112, x + 100, y + 138, IKINCI);
      K.cizgi(c, f, x + 130, y + 112, x + 130, y + 138, IKINCI);
      return f;
    };
    const rapor = (x, ad) => {
      const k = c.S('g', {}, g);
      K.kutu(c, k, x, 50, 360, 290);
      K.yazi(c, k, x + 180, 98, ad, { size: 28 });
      const f = foto(k, x + 60, 150);
      const a = K.yazi(c, k, x + 180, 210, '', { size: 26 }), b = K.yazi(c, k, x + 180, 255, '', { size: 28 });
      return { k, f, yaz: (m1, m2, r) => { a.textContent = m1; b.textContent = m2; b.style.fill = r; } };
    };
    const iki = rapor(90, '2. rapor'), uc = rapor(550, '3. rapor');
    const esit = K.yazi(c, g, 500, 245, '=', { size: 60, renk });
    const alt = K.yazi(c, g, 500, 410, 'Hayvan fotoğrafları aynı', { size: 28, renk });
    await K.belir(c, g);
    await c.say('İkinci ve üçüncü raporlardaki hayvan fotoğrafları birbirinin aynısı.');
    await c.choice({ tag: 'Uygula', q: 'Ödev, her grubun fotoğrafları kendisinin çekmesini istiyordu. Aynı fotoğraflar neyi gösterir?',
      options: ['Sorun yok; iki grup da aynı hayvanları gözlemiş.', 'En az bir grup, kendi çekmediği fotoğrafı kaynak göstermeden kullanmış.', 'Üçüncü grup fotoğrafları kesinlikle ikinci gruptan almış.'], answer: 1,
      hints: ['Aynı hayvanı gözleyen iki grup birebir aynı kareyi çekemez.', '', 'Kimin kimden aldığı bu bilgiyle belli olmaz.'],
      right: 'Aynı kare iki ayrı grupça çekilemez; en az biri başkasının fotoğrafını kullanmış.' });
    iki.f.remove(); uc.f.remove(); esit.remove();
    iki.yaz('Ziyaretçilerin tamamı:', '“Kapatılmaları doğru”', IYI);
    alt.textContent = 'Anket sonuçları';
    await c.say('İkinci rapora göre ziyaretçilerin tamamı hayvanların kapatılmasını doğru buluyor.');
    uc.yaz('Ziyaretçilerin tamamı:', '“Kapatılmaları yanlış”', KOTU);
    alt.textContent = 'Aynı park, birbirine zıt anket sonuçları';
    await c.say('Üçüncü rapora göre ise ziyaretçilerin tamamı bunu yanlış buluyor.');
    await c.choice({ q: 'Aynı parkta yapılan iki anketin sonuçları birbirine zıt. Bundan ne çıkar?',
      options: ['İkinci grubun verisi kesinlikle uydurmadır.', 'İki sonuç da kesinlikle doğrudur.', 'Anket verilerinin doğruluğu sorgulanmalıdır.'], answer: 2,
      hints: ['Hangi raporun hatalı olduğu bu bilgiyle belli olmaz.', 'Herkesin iki ankette birbirine zıt cevap vermesi kuşku uyandırır.', ''],
      right: 'Zıt sonuçlar kuşku doğurur; hangisinin hatalı olduğu ayrıca araştırılır.' });
    c.note('<b>Veri değiştirilmez, gizlenmez; başkasının verisi kaynakla kullanılır.</b><br>Aynı fotoğraf, zıt anket: sorgula.', 'Veri');
  }

  /* ---- Sahne 4 · Aşı araştırması ---- */
  async function asi(c) {
    const s = c.svg(1000, 562);
    let g = c.S('g', {}, s);
    const klasik = K.kart(c, g, 70, 45, 400, 180, 'Klasik aşı araştırması', ['Virüsle doğal yoldan', 'karşılaşma beklenir'], { renk: SOLUK, altSize: 26 });
    await K.belir(c, klasik);
    await c.say('Klasik aşı araştırmalarında gönüllülerin virüsle doğal yoldan karşılaşması beklenir.');
    const yeni = K.kart(c, g, 530, 45, 400, 180, 'İngiltere, 2021', ['COVID-19 için', 'farklı bir yöntem'], { renk, altSize: 26 });
    await K.belir(c, yeni);
    await c.say('2021’de İngiltere’de COVID-19 için farklı bir araştırma onaylandı.',
      { speak: '[curious] İki bin yirmi birde İngiltere’de Kovid on dokuz için farklı bir araştırma onaylandı.' });
    await sil(c, klasik);
    yaz(yeni, '36 sağlıklı gönüllüye', 'virüs bilerek verildi');
    const gonullu = c.S('g', {}, g);
    for (let i = 0; i < 36; i++) c.S('circle', { cx: 95 + (i % 12) * 30, cy: 85 + Math.floor(i / 12) * 42, r: 11, fill: renk }, gonullu);
    K.yazi(c, gonullu, 260, 228, '18–30 yaş', { size: 26 });
    await K.belir(c, gonullu, 350);
    await c.say('18–30 yaş arası 36 sağlıklı gönüllüye virüs kontrollü koşullarda bilerek verildi.',
      { speak: 'On sekiz ile otuz yaş arası otuz altı sağlıklı gönüllüye virüs kontrollü koşullarda bilerek verildi.' });
    await K.belir(c, K.yazi(c, g, 500, 320, 'Amaç: en düşük bulaşma dozu, bağışıklığın ilk tepkisi', { size: 26 }), 300);
    await c.say('Amaç, bulaşma için gereken en düşük dozu ve bağışıklığın ilk tepkisini öğrenmekti.');
    await K.belir(c, K.yazi(c, g, 500, 385, 'Aşı ve tedavi çalışmaları hızlanabilir', { size: 26, renk: IYI }), 300);
    await c.say('Bu bilginin aşı ve tedavi çalışmalarını hızlandıracağı düşünülüyordu.');
    await sil(c, g);

    g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 70, 130, 400, 200, 'Önlemler', ['14 gün dış dünyadan ayrı', 'Sürekli doktor gözetimi'], { renk: IYI, altSize: 26 }));
    await c.say('Gönüllüler hastanede 14 gün dış dünyadan ayrı tutuldu, sürekli doktor gözetiminde izlendi.',
      { speak: 'Gönüllüler hastanede on dört gün dış dünyadan ayrı tutuldu, sürekli doktor gözetiminde izlendi.' });
    await K.belir(c, K.kart(c, g, 530, 130, 400, 200, 'Bilinmeyen', ['Virüsün gençlerdeki', 'uzun vadeli etkileri'], { renk: KOTU, altSize: 26 }));
    await c.say('O sırada virüsün gençlerdeki uzun vadeli etkileri henüz bilinmiyordu.');
    await sil(c, g);

    g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 50, 130, 430, 200, 'İtiraz', ['Sağlıklı insanı bilerek hasta', 'etmek tıp etiğiyle çelişebilir'], { renk: KOTU, altSize: 26 }));
    await c.say('Bazı uzmanlar itiraz etti: sağlıklı insanı bilerek hasta etmek tıp etiğiyle çelişebilir.');
    await K.belir(c, K.kart(c, g, 520, 130, 430, 200, 'Savunma', ['Milyonlarca insanın', 'yaşamını koruyabilir'], { renk: IYI, altSize: 26 }));
    await c.say('Bazı araştırmacılar ise savundu: çalışma milyonlarca insanın yaşamını korumaya katkı sağlayabilir.');
    await c.choice({ tag: 'Uygula', q: 'Araştırma sonunda işe yarar bilgiler elde edilirse etik tartışma biter mi?',
      options: ['Biter; iyi sonuç her yöntemi haklı çıkarır.', 'Biter; gönüllülere ödeme yapılmıştır.', 'Bitmez; araştırma nasıl yapıldığıyla da değerlendirilir.'], answer: 2,
      hints: ['Sonuç iyi olsa da gönüllülerin aldığı risk ortadan kalkmaz.', 'Ödeme, yöntemin doğru olup olmadığını göstermez.', ''],
      right: 'Bir araştırma, sonucu kadar nasıl yapıldığıyla da değerlendirilir.' });
    c.note('<b>İyi sonuç, yöntemi kendiliğinden haklı çıkarmaz.</b><br>36 gönüllüye virüs bilerek verildi: yarar mı, risk mi?', 'Aşı araştırması');
  }

  /* ---- Sahne 5 · Gönüllü onam ve acil durum ---- */
  async function onam(c) {
    const s = c.svg(1000, 562);
    let g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 150, 50, 700, 150, 'Gönüllü onam', ['Kişi araştırmaya kendi isteğiyle onay verir'], { renk, altSize: 26 }));
    await c.say('Araştırmaya katılan kişi buna kendi isteğiyle onay vermelidir; buna gönüllü onam denir.',
      { speak: 'Araştırmaya katılan kişi buna kendi isteğiyle onay vermelidir; [short pause] buna gönüllü onam denir.' });
    await K.belir(c, K.kart(c, g, 280, 250, 440, 170, 'Ödeme', ['Gönüllü başına yaklaşık', '4.500 sterlin'], { renk: IKINCI, altSize: 26 }));
    await c.say('Her gönüllüye, zamanı ve aldığı risk için yaklaşık 4.500 sterlin ödendi.',
      { speak: 'Her gönüllüye, zamanı ve aldığı risk için yaklaşık dört bin beş yüz sterlin ödendi.' });
    await c.choice({ q: 'Ödemenin yüksek olması, gönüllü onam açısından hangi kaygıyı doğurur?',
      options: ['Kişi, riski para için kabul etmiş olabilir.', 'Ödeme yapıldıysa etik bir sorun kalmaz.', 'Ödeme alan kişi hastalanmaz.'], answer: 0,
      hints: ['', 'Ödeme, onayın kendi isteğiyle verilip verilmediği sorusunu ortadan kaldırmaz.', 'Ödeme riski azaltmaz.'],
      right: 'Yüksek ödeme kararı etkileyebilir; onayın gerçekten gönüllü olup olmadığı sorulur.' });
    await sil(c, g);

    g = c.S('g', {}, s);
    const terazi = c.S('g', {}, g);
    c.S('path', { d: 'M 455 470 L 545 470 L 500 425 Z', fill: SOLUK }, terazi);
    K.cizgi(c, terazi, 500, 150, 500, 430, SOLUK, { width: 6 });
    K.cizgi(c, terazi, 250, 165, 750, 165, SOLUK, { width: 6 });
    const kefe = (x, r, ad) => {
      const k = c.S('g', {}, g);
      K.cizgi(c, k, x, 165, x - 85, 290, r); K.cizgi(c, k, x, 165, x + 85, 290, r);
      c.S('path', { d: `M ${x - 100} 290 Q ${x} 345 ${x + 100} 290 Z`, fill: r }, k);
      K.yazi(c, k, x, 390, ad, { size: 28, renk: r });
      k.style.opacity = 0;
      return k;
    };
    const sag = kefe(750, IYI, 'Toplumun yararı'), sol = kefe(250, renk, 'Bireyin hakları');
    await Promise.all([K.belir(c, terazi), K.belir(c, sag)]);
    await c.say('Pandemi gibi acil durumlarda aşının erken bulunması çok sayıda hayat kurtarabilir.');
    await K.belir(c, sol);
    await c.say('Ama kuralları esnetmek, araştırmaya katılan bireylerin haklarını zedeleyebilir.');
    await K.belir(c, K.yazi(c, g, 500, 85, 'Karar verirken ikisi birlikte tartılır', { size: 30 }), 300);
    await c.say('Bu yüzden bireyin hakları ile toplumun yararı birlikte tartılır.');
    await c.choice({ tag: 'Uygula', q: 'Biri şunu öneriyor: “Pandemide zaman yok; insanları sormadan araştırmaya katalım.” Bu öneri hangi ilkeyle çelişir?',
      options: ['Kaynak gösterme', 'İş bölümünü yazma', 'Gönüllü onam'], answer: 2,
      hints: ['Kaynak gösterme alınan bilgiyle ilgilidir; katılımcıyla değil.', 'İş bölümü, raporda kimin ne yaptığıyla ilgilidir.', ''],
      right: 'Sormadan katmak, kişinin kendi isteğiyle onay vermesini ortadan kaldırır.' });
    await c.say('Park ödevinde de aşı araştırmasında da sonuç kadar yol sorgulanır.');
    c.note('<b>Gönüllü onam: kişi kendi isteğiyle onay verir.</b><br>Bireyin hakları ↔ toplumun yararı', 'Gönüllü onam');
  }

  Ders.start({
    id: 'yasam-c1', kicker: 'Konu C · Bilim etiği', title: 'Bu araştırma etiğe uygun mu?', accent: renk, back: 'index.html',
    intro: { title: 'Bu araştırma etiğe uygun mu?', hook: 'Bir araştırma iyi sonuç verince her yöntemi uygun olur mu?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Park ödevi', goal: 'Kaynak gösterme kuralını uygula.', run: odev },
      { title: 'Kim çalıştı?', goal: 'Katkı ile adı eşleştir.', run: katki },
      { title: 'Fotoğraf ve anket', goal: 'Veri kurallarını raporlara uygula.', run: veri },
      { title: 'Aşı araştırması', goal: 'Yarar ile riski karşılaştır.', run: asi },
      { title: 'Gönüllü onam ve acil durum', goal: 'Onamı ve dengeyi sorgula.', run: onam },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir araştırmacının deneyi beklediği sonucu vermedi. Hangisi bilim etiğine uygundur?',
        options: ['Sonucu olduğu gibi kaydedip raporlamak', 'Sonuçları biraz değiştirmek', 'Uymayan verileri rapordan çıkarmak'], answer: 0,
        why: ['Veri olduğu gibi kaydedilir; desteklemeyen veri de raporda yer alır.', 'Veri istenen sonuca göre değiştirilemez.', 'Sonucu desteklemeyen veri gizlenmez.'], scene: 2 },
      { q: 'Bir makalede, çalışmaya hiç katılmamış birinin adı da yazar olarak geçiyor. Hangi kurala aykırıdır?',
        options: ['Kaynak gösterme', 'Yalnızca katkısı olanın adını yazma', 'Gönüllü onam'], answer: 1,
        why: ['Kaynak gösterme, alınan bilginin nereden geldiğiyle ilgilidir.', 'Rapora ya da makaleye yalnızca katkısı olanların adı yazılır.', 'Gönüllü onam, araştırmaya katılan kişinin onayıyla ilgilidir.'], scene: 1 },
      { q: 'Bir öğrenci, fide deneyi raporunda bir üniversitenin yayımladığı yağış tablosunu da kullanmak istiyor. Bilim etiğine uygun yol hangisidir?',
        options: ['Tabloyu kendi ölçümüymüş gibi rapora koymak', 'Tablodaki değerleri deneyine uyacak biçimde değiştirmek', 'Tabloyu kullanıp nereden aldığını raporda göstermek'], answer: 2,
        why: ['Başkasının verisi kendi verin gibi sunulmaz; kaynağı gösterilir.', 'Veri istenen sonuca göre değiştirilemez.', 'Başkasının verisi ancak kaynağı gösterilerek kullanılabilir.'], scene: 2 },
      { q: 'Bir öğrenci “Ödev yarışmasında birinci olduk; o hâlde araştırmamız bilim etiğine uygundur.” diyor. Hangisi doğrudur?',
        options: ['Haklı; başarılı olan araştırma etiğe de uymuştur.', 'Haksız; araştırma, nasıl yapıldığıyla da değerlendirilir.', 'Haksız; ödevlerde bilim etiği kuralları geçerli değildir.'], answer: 1,
        why: ['Birinci olmak yöntemin etik olduğunu göstermez; sonuç kadar yol da sorgulanır.', 'Sonuç iyi olsa da yöntem ayrıca sorgulanır.', 'Kurallar ödevde de geçerlidir; eksik olan, yolun sorgulanmasıdır.'], scene: 3 },
    ], summary: ['<b>Sonuç kadar yol da sorgulanır.</b>', 'Veri değiştirilmez, kaynak gösterilir, katkısı olan yazılır, onay gönüllü verilir.'],
    nextLesson: { href: 'c2-etik-iddiasini-dogrula.html', label: 'Sonraki: Etik iddiasını doğrula, kaydet ›' },
  });
})();
