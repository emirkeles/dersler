/* A2 · BİY.9.1.1 b, c, ç · Yazar notu: içerik MEB Biyoloji 9 s. 20 (“Ne Biliyorum?, Ne Bilmek İstiyorum?, Ne Öğrendim?”
   tablosu; kaynakları not etme; kaynak güvenilirliği tablosunun beş ölçütü: bilimsel makale, hakem/editör değerlendirmesi,
   .edu/.gov uzantısı, uzman incelemesi ya da görüşü, son gelişmeleri yansıtma), s. 17–18 (penisilin) ve s. 84 (penisilinin
   tedavide kullanılması Fleming’den sonra başlar). İki kaynak (paylaşım, üniversite sayfası) ölçütleri uygulatmak için
   kurulmuş örnek durumdur. Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"). */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.A, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  function miniKap(c, p, cx, cy, r) {
    const g = c.S('g', {}, p), kx = cx + r * 0.32, ky = cy - r * 0.25;
    c.S('circle', { cx, cy, r, fill: '#1b2440', stroke: '#8f9bc0', 'stroke-width': 4 }, g);
    for (let i = 0; i < 40; i++) {
      const rr = (r - 16) * Math.sqrt((i + 0.5) / 40), a = i * 2.39996, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      if (Math.hypot(x - kx, y - ky) > r * 0.55) c.S('circle', { cx: x, cy: y, r: 6 + (i % 3), fill: IKINCI }, g);
    }
    [[0, 0, 0.2], [-0.14, -0.09, 0.11], [0.14, -0.1, 0.12], [0.15, 0.08, 0.11], [-0.05, 0.16, 0.12]].forEach(([a, b, k]) => c.S('circle', { cx: kx + a * r, cy: ky + b * r, r: k * r, fill: '#b9c7ae' }, g));
    return g;
  }
  /* Üç sütunlu öğrenme tablosu */
  function tablo(c, p) {
    const g = c.S('g', {}, p), X = [30, 350, 670], AD = ['Ne Biliyorum?', 'Ne Bilmek İstiyorum?', 'Ne Öğrendim?'];
    const sutun = X.map((x, i) => {
      const k = c.S('g', {}, g);
      K.kutu(c, k, x, 70, 300, 400);
      K.yazi(c, k, x + 150, 118, AD[i], { size: 26, renk: i === 1 ? IKINCI : renk });
      K.cizgi(c, k, x + 20, 142, x + 280, 142, '#5b678f');
      return k;
    });
    return { g, sutun, X };
  }
  const satirlar = (c, p, x, y, metin, o = {}) => { const g = c.S('g', {}, p); metin.forEach((m, i) => K.yazi(c, g, x, y + i * 36, m, { size: 26, ...o })); return g; };

  /* ---- Sahne 1 · Ne biliyorum, ne bilmek istiyorum? ---- */
  async function soruSor(c) {
    const s = c.svg(1000, 562), on = c.S('g', {}, s);
    miniKap(c, on, 500, 240, 150);
    K.yazi(c, on, 500, 470, 'Penisilin', { size: 34, renk, kalin: 700 });
    await K.belir(c, on);
    await c.say('Penisilinin küflü bir kapta keşfedildiğini öğrendin; daha fazlasını merak ediyorsun.');
    await sil(c, on);
    const t = tablo(c, s);
    t.sutun[1].style.opacity = 0.3; t.sutun[2].style.opacity = 0.3;
    await K.belir(c, t.g);
    await c.say('Araştırmaya, bildiklerini bir tablonun ilk sütununa yazarak başlarsın.');
    const bilinen = c.S('g', {}, t.sutun[0]);
    satirlar(c, bilinen, 180, 215, ['Penisilin ilk', 'antibiyotiktir.']);
    satirlar(c, bilinen, 180, 335, ['Küflü bir kapta', 'keşfedildi.']);
    await K.belir(c, bilinen);
    await c.say('Bildiklerin: penisilin ilk antibiyotiktir ve küflü bir kapta keşfedilmiştir.');
    const isaret = K.yazi(c, t.sutun[1], 500, 330, '?', { size: 96, renk: IKINCI, kalin: 700 });
    await c.tween(450, (e) => { t.sutun[1].style.opacity = 0.3 + 0.7 * e; });
    await c.say('Ama ilacın hastalara ne zaman ulaştığını bilmiyorsun.', { speak: '[thoughtful] Ama ilacın hastalara ne zaman ulaştığını bilmiyorsun.' });
    isaret.remove();
    await K.belir(c, satirlar(c, t.sutun[1], 500, 215, ['İlaç hastalara', 'ne zaman ulaştı?']), 350);
    await c.say('Bilmediğini bir soruya çevirir ve ikinci sütuna yazarsın.');
    await c.choice({ tag: 'Uygula', q: 'Bir arkadaşın aşıları araştırıyor. İlk sütuna “Yeni nesil aşılar pandemiyi kontrol altına aldı.” yazdı. İkinci sütuna hangisini yazar?',
      options: ['Bu aşılar nasıl geliştirildi?', 'Aşılar pandemiyi kontrol altına aldı mı?', 'Aşılar çok önemlidir.'], answer: 0,
      hints: ['', 'Bunu zaten biliyor; ilk sütuna yazmış.', 'Bu bir soru değil; ikinci sütuna merak edilen sorular yazılır.'],
      right: 'İkinci sütuna, bildiklerinin cevaplamadığı bir soru yazılır.' });
    await c.tween(450, (e) => { t.sutun[2].style.opacity = 0.3 + 0.7 * e; });
    await K.belir(c, K.yazi(c, t.sutun[2], 820, 250, 'Şimdilik boş', { size: 26, renk: SOLUK }), 350);
    await c.say('Üçüncü sütun şimdilik boş kalır; cevabı bulunca doldurulur.');
    c.note('<b>Bildiklerini yaz, bilmediğini soruya çevir.</b><br>Penisilin hastalara ne zaman ulaştı?', 'Araştırma sorusu');
  }

  /* ---- Sahne 2 · İki kaynak, iki cevap ---- */
  function kaynakKarti(c, p, x, baslik, soz, cizgi) {
    const g = c.S('g', {}, p);
    K.kutu(c, g, x, 60, 430, 230, { renk: cizgi });
    K.yazi(c, g, x + 215, 112, baslik, { size: 30, renk: cizgi, kalin: 700 });
    satirlar(c, g, x + 215, 185, soz);
    return g;
  }
  async function ikiKaynak(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const a = kaynakKarti(c, g, 30, 'Paylaşım', ['“Fleming penisilini buldu,', 'hastalar hemen iyileşti.”'], IKINCI);
    const b = kaynakKarti(c, g, 540, 'Üniversite sayfası', ['“İlaç ancak yıllar sonra', 'hastalarda kullanılabildi.”'], renk);
    a.style.opacity = 0; b.style.opacity = 0;
    const ara = c.S('g', {}, s);
    K.kutu(c, ara, 150, 220, 700, 90, { rx: 45, renk });
    c.S('circle', { cx: 208, cy: 261, r: 14, fill: 'none', stroke: renk, 'stroke-width': 4 }, ara);
    K.cizgi(c, ara, 218, 272, 232, 287, renk, { width: 4 });
    K.yazi(c, ara, 530, 275, 'penisilin hastalara ne zaman ulaştı', { size: 28 });
    await K.belir(c, ara);
    await c.say('Sorunu internette aratınca karşına iki ayrı cevap çıkıyor.');
    await sil(c, ara);
    await K.belir(c, a);
    await c.say('Bir paylaşıma göre Fleming penisilini buldu ve hastalar hemen iyileşti.');
    await K.belir(c, b);
    await c.say('Bir üniversite sayfasına göre ise ilaç ancak yıllar sonra hastalarda kullanılabildi.');
    const fark = c.S('g', {}, g);
    K.cizgi(c, fark, 480, 165, 520, 165, '#fff', { width: 5 }); K.cizgi(c, fark, 480, 185, 520, 185, '#fff', { width: 5 }); K.cizgi(c, fark, 488, 200, 512, 150, '#fff', { width: 5 });
    await K.belir(c, fark, 350);
    await c.say('İki cevap çelişiyor; ikisi birden doğru olamaz.', { speak: '[curious] İki cevap çelişiyor; ikisi birden doğru olamaz.' });
    await c.say('Hangisine güveneceğine, bilginin nereden geldiğine bakarak karar verirsin.');
    const notlar = c.S('g', {}, g);
    K.kutu(c, notlar, 30, 330, 430, 130, { renk: '#5b678f' }); satirlar(c, notlar, 245, 380, ['Yazan: belirsiz', 'Tarih: yok']);
    K.kutu(c, notlar, 540, 330, 430, 130, { renk: '#5b678f' }); satirlar(c, notlar, 755, 380, ['Yazan: profesör', 'Tarih: bu yıl']);
    await K.belir(c, notlar);
    await c.say('Bu yüzden her bilginin yanına kaynağını not edersin: yazan, yer, tarih.');
    await c.choice({ tag: 'Uygula', q: 'Bir arkadaşın defterine şunu yazmış: “PZR, DNA dizisini çoğaltır. Kaynak: internet.” Bu notta eksik olan nedir?',
      options: ['Hiçbir şey; “internet” yeterli bir kaynaktır.', 'Bilgiyi kaç kişinin beğendiği', 'Bilgiyi kimin, nerede ve ne zaman yayımladığı'], answer: 2,
      hints: ['“İnternet” bilgiyi kimin yazdığını söylemez; orada herkes yazabilir.', 'Beğeni sayısı bilginin nereden geldiğini göstermez.', ''],
      right: 'Yazan, yer ve tarih belli olursa bilgi yeniden bulunup sınanabilir.' });
    c.note('<b>Bilginin yanına kaynağını yaz: yazan, yer, tarih.</b><br>“Kaynak: internet” yetmez.', 'Kaynak notu');
  }

  /* ---- Sahne 3 · Kaynak güvenilir mi? ---- */
  async function olcut(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const satir = (y, soru, cevaplar, r) => {
      const k = c.S('g', {}, g);
      K.yazi(c, k, 190, y + 10, soru, { size: 30, renk: r, kalin: 700 });
      cevaplar.forEach((m, i) => K.yazi(c, k, 660, y + 10 - (cevaplar.length - 1) * 20 + i * 40, m, { size: 26 }));
      k.style.opacity = 0;
      return k;
    };
    const kim = satir(100, 'Kim denetledi?', ['Hakem/editör denetimi', 'Uzman incelemesi, görüşü'], renk);
    const nerede = satir(280, 'Nerede yayımlandı?', ['Bilimsel makale', '.edu, .gov uzantılı site'], IKINCI);
    const zaman = satir(460, 'Ne zaman?', ['Son gelişmeleri yansıtıyor'], YESIL);
    [kim, nerede, zaman].forEach((k) => { [...k.children].slice(1).forEach((m) => { m.style.opacity = 0; }); });
    const ac = (k) => c.tween(400, (e) => { [...k.children].slice(1).forEach((m) => { m.style.opacity = e; }); });
    K.cizgi(c, g, 60, 190, 940, 190, '#3a4566', { width: 2 }); K.cizgi(c, g, 60, 370, 940, 370, '#3a4566', { width: 2 });
    await c.tween(500, (e) => { kim.style.opacity = e; nerede.style.opacity = e; zaman.style.opacity = e; });
    await c.say('Bir kaynağı üç soruyla sınarsın: kim denetledi, nerede yayımlandı, ne zaman?');
    await ac(kim);
    await c.say('Güvenilir kaynağı, yayımlanmadan önce hakem denen uzmanlar ya da editör denetler.');
    await c.say('Konunun uzmanı da kaynağı incelemiş ya da hakkında görüş bildirmiştir.');
    await ac(nerede);
    await c.say('Bilimsel makaleler ile .edu ve .gov uzantılı siteler daha güvenilir sayılır.',
      { speak: 'Bilimsel makaleler ile nokta edu ve nokta gov uzantılı siteler daha güvenilir sayılır.' });
    await c.say('Bu uzantıları üniversiteler ve devlet kurumları kullanır.');
    await ac(zaman);
    await c.say('Güvenilir kaynak, alanındaki son gelişmeleri de yansıtır.');
    await c.choice({ tag: 'Uygula', q: 'Bir uzmanın incelediği yazı yirmi yıl önce yayımlanmış ve hiç güncellenmemiş. Bu kaynak hangi soruda zayıf kalır?',
      options: ['Kim denetledi?', 'Ne zaman?', 'Hiçbirinde; uzman incelediyse hep günceldir.'], answer: 1,
      hints: ['Yazıyı bir uzman incelemiş; zayıf yanı burası değil.', '', 'Uzman incelemesi, yazının bugün de güncel olduğunu göstermez.'],
      right: 'Yirmi yıllık bir yazı, alanındaki son gelişmeleri yansıtmayabilir.' });
    c.note('<b>Kaynağı sına: kim denetledi, nerede yayımlandı, ne zaman?</b><br>Hakem, uzman, .edu/.gov, güncellik.', 'Kaynak güvenilir mi?');
  }

  /* ---- Sahne 4 · İki kaynağı sına ---- */
  async function sina(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const a = K.kart(c, g, 30, 50, 430, 280, 'Paylaşım', ['Yazarı belli değil', 'Tarihi yok', '12 bin beğeni'], { renk: IKINCI });
    await K.belir(c, a);
    await c.say('Paylaşımın yazarı da tarihi de belli değil; yalnızca çok beğenilmiş.');
    await c.choice({ tag: 'Uygula', q: 'Paylaşım üç sorudan hangisini karşılıyor?',
      options: ['Kim denetledi: on iki bin kişi beğenmiş.', 'Hiçbirini: denetleyen yok, yeri sosyal medya, tarihi belirsiz.', 'Ne zaman: internette olduğuna göre günceldir.'], answer: 1,
      hints: ['Beğenmek denetlemek değildir; beğenenlerin uzman olup olmadığı bilinmiyor.', '', 'İnternette olması güncel olduğunu göstermez; paylaşımın tarihi yok.'],
      right: 'Çok beğenilmesi, bilginin doğru olduğunu göstermez.' });
    await K.belir(c, K.yazi(c, g, 245, 390, 'Güvenilir değil', { size: 32, renk: IKINCI, kalin: 700 }), 350);
    const b = K.kart(c, g, 540, 50, 430, 280, 'Üniversite sayfası', ['.edu uzantılı', 'Editör denetledi', 'Profesör inceledi', 'Bu yıl güncellendi'], { renk });
    await K.belir(c, b);
    await c.say('Üniversite sayfası .edu uzantılı; yazıyı bir editör denetlemiş, bir profesör incelemiş.',
      { speak: 'Üniversite sayfası nokta edu uzantılı; yazıyı bir editör denetlemiş, bir profesör incelemiş.' });
    await c.say('Sayfa bu yıl güncellenmiş.');
    await K.belir(c, K.yazi(c, g, 755, 390, 'Güvenilir', { size: 32, renk, kalin: 700 }), 350);
    await c.say('Üç soruyu da karşılayan üniversite sayfası daha güvenilirdir.');
    await sil(c, g);
    const kayit = K.kart(c, s, 130, 110, 740, 300, 'Kaynaklı not', ['Penisilin hastalara, keşfinden', 'yıllar sonra ulaştı.'], { renk });
    K.cizgi(c, kayit, 170, 300, 830, 300, '#5b678f');
    K.yazi(c, kayit, 500, 350, 'Kaynak: üniversite sayfası, bu yıl', { size: 26, renk: SOLUK });
    await K.belir(c, kayit);
    await c.say('Bu kaynağa göre penisilin, hastalara keşfinden yıllar sonra ulaştı.');
    await c.say('Cevabı, kaynağıyla birlikte not edersin.');
    await c.say('Önce soru, sonra kaynak, en son cevap.', { speak: 'Önce soru, [short pause] sonra kaynak, [short pause] en son cevap.' });
  }

  Ders.start({
    id: 'yasam-a2', kicker: 'Konu A · Biyolojinin dönüm noktaları', title: 'Soru sor, kaynağını sına', accent: renk, back: 'index.html',
    intro: { title: 'Soru sor, kaynağını sına', hook: 'İki kaynak aynı buluşu farklı anlatıyor; hangisine güvenirsin?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Ne biliyorum, ne bilmek istiyorum?', goal: 'Bilmediğini soruya çevir.', run: soruSor },
      { title: 'İki kaynak, iki cevap', goal: 'Bilginin kaynağını not et.', run: ikiKaynak },
      { title: 'Kaynak güvenilir mi?', goal: 'Kaynağı üç soruyla sına.', run: olcut },
      { title: 'İki kaynağı sına', goal: 'Güvenilir kaynağı seç.', run: sina },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir konuda bildiklerini ilk sütuna yazdın. Sıradaki adım hangisidir?', options: ['Üçüncü sütuna cevabı yazmak', 'İlk bulduğun kaynağı doğru kabul etmek', 'Bilmediğini soruya çevirip ikinci sütuna yazmak'], answer: 2,
        why: ['Üçüncü sütun, cevap bulununca doldurulur.', 'Kaynak önce sınanır; ilk çıkan kaynak doğru olmayabilir.', 'Soru, hangi bilgiyi arayacağını belirler.'], scene: 0 },
      { q: 'İki kaynak çelişiyor: biri hakem denetiminden geçmiş bir bilimsel makale, öteki yazarı ve tarihi belli olmayan bir blog yazısı. Hangisine güvenirsin?',
        options: ['Makaleye; denetleyeni ve yayımlandığı yer belli.', 'Blog yazısına; okuması daha kolay.', 'Hangisi daha çok paylaşıldıysa ona.'], answer: 0,
        why: ['Makale “kim denetledi” ve “nerede yayımlandı” sorularını karşılıyor.', 'Kolay okunması, bilginin doğru olduğunu göstermez.', 'Paylaşım sayısı bir güvenilirlik ölçütü değildir.'], scene: 2 },
    ], summary: ['<b>Önce soru, sonra kaynak, en son cevap.</b>', 'Kaynağı sına: kim denetledi, nerede yayımlandı, ne zaman?'],
    nextLesson: { href: 'a3-kanittan-cikarima.html', label: 'Sonraki: Bilgiden çıkarıma ›' },
  });
})();
