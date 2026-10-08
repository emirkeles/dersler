/* A9 — Konu tekrarı: Üslü ve köklü gösterimler
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar A1–A8'in defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { M, mathText } = Ders;
  const C = { text: '#E8ECF4', soft: '#8B95AB', base: '#F2B134', ok: '#6BE3A0', bad: '#FF7A70' };
  const P = (b, e) => `<span class="m">${b}<sup>${e}</sup></span>`;
  const rt = (x) => M.m(M.sqrt(x));

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yazi = (y, size, fill, kalin) => c.S('text', { x: 500, y, 'text-anchor': 'middle', 'font-size': size, 'font-weight': kalin ? 700 : 400, style: `fill:${fill}`, opacity: 0 }, svg);
    const sira = yazi(84, 24, C.soft), baslik = yazi(150, 40, C.base, true);
    const satir = [0, 1, 2].map((k) => yazi(256 + k * 88, 40, C.text));
    const hepsi = [sira, baslik, ...satir];
    const belir = (els, ms = 400) => c.tween(ms, (e) => [].concat(els).forEach((t) => t.setAttribute('opacity', e)));
    let n = 0;
    const kur = async (b, ss, renk = []) => {   // eski kuralı kaldır, yenisini yaz; satırlar görünmez kalır
      c.clearSay();
      const eski = hepsi.map((t) => +t.getAttribute('opacity'));
      await c.tween(300, (e) => hepsi.forEach((t, k) => t.setAttribute('opacity', eski[k] * (1 - e))));
      n += 1;
      sira.textContent = `${n}/8`; baslik.textContent = b;
      satir.forEach((t, k) => { mathText(t, ss[k] || ''); t.style.fill = renk[k] || C.text; });
    };
    const say = (html, speak) => c.say(html, speak ? { speak } : undefined);
    const par = (...ps) => Promise.all(ps);

    // 1. Üs kuralları (A1)
    await kur('Üs bir sayaçtır', ['a^{m} · a^{n} = a^{m+n}', 'a^{m} / a^{n} = a^{m−n}', '(a^{m})^{n} = a^{m·n}']);
    await par(say('Üs, tabanın kaç kez çarpıldığını sayan bir sayaçtır.'), belir([sira, baslik]));
    await par(say('Çarpmada sayaçlar toplanır, bölmede çıkarılır.'), belir([satir[0], satir[1]]));
    await par(say('Üssün üssünde sayaçlar çarpılır.'), belir(satir[2]));
    c.note('<b>a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup></b> · <b>a<sup>m</sup>/a<sup>n</sup> = a<sup>m−n</sup></b> · <b>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></b><br>Toplamada kural yok: 2³ + 2⁴ = 24', 'Üs kuralları', 'sayilar-a9-us');

    // 2. Sıfır ve negatif üs (A2)
    await kur('Sıfır ve negatif üs', ['a^{0} = 1', 'a^{−n} = 1/a^{n}', '2^{−3} = 1/8'], [C.text, C.text, C.ok]);
    await par(say('Sıfırıncı kuvvet birdir.'), belir([sira, baslik, satir[0]]));
    await par(say('Eksi üs sayıyı negatif yapmaz, ters çevirir.'), belir([satir[1], satir[2]]));
    c.note('<b>a<sup>0</sup> = 1</b> (a ≠ 0) · <b>a<sup>−n</sup> = 1 / a<sup>n</sup></b><br>2⁻³ = 1/8', 'Sıfır ve negatif üs', 'sayilar-a9-negatif');

    // 3. Karekök (A3)
    await kur('Karekök', ['√a · √a = a', '√a = a^{1/2}', '√1024 = 32'], [C.text, C.text, C.ok]);
    await par(say('Karekök, kendisiyle çarpılınca sayıyı veren negatif olmayan sayıdır.'), belir([sira, baslik, satir[0]]));
    await par(say('Kök almak, sayacı ikiye bölmektir.'), belir([satir[1], satir[2]]));
    c.note('<b>√a = a<sup>1/2</sup></b> (a ≥ 0)<br>√1024 = 32, çünkü 32·32 = 1024', 'Karekök', 'sayilar-a9-kok');

    // 4. Köklerle işlem (A4)
    await kur('Köklerle işlem', ['√a · √b = √(a·b)', '2√2 + 3√2 = 5√2', '√(9 + 16) ≠ √9 + √16'], [C.text, C.text, C.bad]);
    await par(say('Kök çarpmaya dağılır.'), belir([sira, baslik, satir[0]]));
    await par(say('Kökün içi aynıysa katsayılar toplanır.'), belir(satir[1]));
    await par(say('Kök toplamaya dağılmaz.'), belir(satir[2]));
    c.note('<b>√a·√b = √(ab)</b> · √8 + √18 = 5√2 · 6/√3 = 2√3<br><b class="tw">√(a + b) ≠ √a + √b</b>', 'Köklerle işlem', 'sayilar-a9-islem');

    // 5. n. kök ve rasyonel üs (A5)
    await kur('Rasyonel üs', ['ⁿ√a = a^{1/n}', 'a^{m/n} = (ⁿ√a)^{m}', '8^{2/3} = (³√8)^{2} = 4'], [C.text, C.text, C.ok]);
    await par(say('Üssün paydası hangi kökün alınacağını söyler.'), belir([sira, baslik, satir[0]]));
    await par(say('Üssün payı, kökün kaçıncı kuvvetinin alınacağını söyler.'), belir([satir[1], satir[2]]));
    c.note(`<b>${P('a', 'm/n')} = (${M.m(M.sqrt('a', 'n'))})<sup>m</sup></b><br>Payda kökü, pay kuvveti söyler: ${P(8, '2/3')} = 4`, 'Rasyonel üs', 'sayilar-a9-rasyonel');

    // 6. Eşlenik (A6)
    await kur('Eşlenik', ['(√3 − 1)(√3 + 1) = 3 − 1 = 2', '1/(√3 − 1) = (√3 + 1)/2']);
    await par(say('Eşlenikte yalnızca ortadaki işaret değişir.'), belir([sira, baslik]));
    await par(say('Eşlenikle çarpınca köklü parçalar birbirini götürür.'), belir(satir[0]));
    await par(say('Paydayı kökten kurtarmak için pay ve payda eşlenikle çarpılır.'), belir(satir[1]));
    c.note(`<b>Eşlenik:</b> ortadaki işaret değişir.<br>(${rt(3)} − 1)(${rt(3)} + 1) = 2; pay ve payda birlikte çarpılır`, 'Eşlenik', 'sayilar-a9-eslenik');

    // 7. Bilimsel gösterim (A7)
    await kur('Bilimsel gösterim', ['a × 10^{n},  1 ≤ a < 10', '150 000 000 = 1,5 × 10^{8}', '0,000 000 003 = 3 × 10^{−9}']);
    await par(say('Bilimsel gösterimde ilk çarpan birle on arasındadır.'), belir([sira, baslik, satir[0]]));
    await par(say('Büyük sayıda üs pozitif, küçük sayıda negatiftir.'), belir([satir[1], satir[2]]));
    c.note(`<b>a × ${P(10, 'n')}</b>, 1 ≤ a &lt; 10<br>Virgül kayar, üs sayar: 150 000 000 = 1,5 × ${P(10, 8)}`, 'Bilimsel gösterim', 'sayilar-a9-bilimsel');

    // 8. Yaklaşık değer (A8)
    await kur('Yaklaşık değer', ['961 < 1000 < 1024', '31 < √1000 < 32', '√1000 ≈ 31,6'], [C.text, C.text, C.ok]);
    await par(say('Tam çıkmayan kök, ardışık iki tam sayının arasına sıkıştırılır.'), belir([sira, baslik, satir[0], satir[1]]));
    await par(say('Yaklaşık değer tam değere eşit değildir.'), belir(satir[2]));
    c.note(`31 &lt; ${rt(1000)} &lt; 32, çünkü 961 &lt; 1000 &lt; 1024<br><b>≈ eşit demek değildir:</b> 31,6² = 998,56`, 'Yaklaşık değer', 'sayilar-a9-yaklasik');
    await say('Şimdi sekiz dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'sayilar-a9', kicker: 'Konu A · Üslü ve köklü', title: 'Konu tekrarı', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Üslü ve köklü gösterimler',
      hook: 'Sekiz dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Sekiz dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Işık saniyede yaklaşık 300 000 km yol alır. Bu sayının bilimsel gösterimi hangisidir?',
        options: [`30 × ${P(10, 4)}`, `3 × ${P(10, 5)}`, `3 × ${P(10, 6)}`, `3 × ${P(10, '−5')}`], answer: 1,
        why: ['Değeri doğru; ama 30, 10’dan büyük.', 'Virgül 5 basamak sola kayar: 300 000 = 3 × 10⁵.', '10⁶ ile 3 000 000 olur.', 'Üs negatif olursa sayı 1’den küçük olur: 0,00003.'], scene: 0,
      },
      {
        q: `${P(10, '−3')} kaçtır?`,
        options: ['0,001', '−1000', '−30', '0,003'], answer: 0,
        why: ['10⁻³ = 1/1000 = 0,001.', 'Eksi üs sayıyı negatif yapmaz; 10³ = 1000’i ters çevirir.', 'Tabanla üssü çarpmışsın. Üs çarpan değildir.', '1/1000 = 0,001 eder. Üs çarpan değildir.'], scene: 0,
      },
      {
        q: `${rt(50)} − ${rt(8)} işleminin sonucu hangisidir?`,
        options: [rt(42), '3' + rt(2), '7' + rt(2), '21'], answer: 1,
        why: ['Kök içlerini çıkarmışsın (50 − 8). √42 ≈ 6,48; oysa fark ≈ 4,24.', '√50 = 5√2 ve √8 = 2√2 (çiftler dışarı). 5√2 − 2√2 = 3√2.', 'Katsayıları toplamışsın; işlem çıkarma: 5 − 2 = 3.', 'Kökleri yarı sanmışsın (25 − 4). Kök yarısı değildir.'], scene: 0,
      },
      {
        q: '<span class="m">(2·5)<sup>3</sup></span> kaçtır?',
        options: ['30', '250', '40', '1000'], answer: 3,
        why: ['10 ile 3’ü çarpmışsın. Üs sayaçtır: 10·10·10.', 'Yalnızca 5’in küpünü almışsın. Üs iki çarpana da dağılır.', 'Yalnızca 2’nin küpünü almışsın. Üs iki çarpana da dağılır.', '(2·5)³ = 2³·5³ = 8·125 = 1000.'], scene: 0,
      },
      {
        q: `${P(81, '1/4')} kaçtır?`,
        options: ['20,25', '9', '3', '324'], answer: 2,
        why: ['81’i 4’e bölmüşsün. Üs 1/4 bölme değil, dördüncü kök demektir.', 'Karekök almışsın. Payda 4: dört kez çarpılınca 81 veren sayı aranır.', '3·3·3·3 = 81, yani ⁴√81 = 3.', '81 ile 4’ü çarpmışsın. Üssün paydası kök demektir.'], scene: 0,
      },
      {
        q: `(${rt(11)} + 3)(${rt(11)} − 3) çarpımı kaçtır?`,
        options: ['20', '8', '2', `20 + 6${rt(11)}`], answer: 2,
        why: ['Kareleri toplamışsın (11 + 9). Eşleniklerin çarpımında kareler çıkarılır.', '3’ün karesini almamışsın: 3·3 = 9 ve 11 − 9 = 2.', 'Köklü parçalar birbirini götürür: 11 − 9 = 2.', 'Bu (√11 + 3)’ün karesi. Burada çarpanlar eşlenik.'], scene: 0,
      },
      {
        q: `${rt(90)} hangi iki tam sayının arasındadır?`,
        options: ['8 ile 9', '44 ile 46', '89 ile 91', '9 ile 10'], answer: 3,
        why: ['9·9 = 81 hâlâ 90’dan küçük. Kök 9’dan büyük.', '90’ın yarısını almışsın. Kök, sayının yarısı değildir.', 'Bunlar 90’ın komşuları. Aranan, karesi 90 eden sayı.', '9·9 = 81 &lt; 90 &lt; 100 = 10·10.'], scene: 0,
      },
      {
        q: `${P(49, '1/2')} + ${P(49, 0)} işleminin sonucu kaçtır?`,
        options: ['7', '25,5', '56', '8'], answer: 3,
        why: ['49⁰ = 0 almışsın. Sıfırıncı kuvvet 1’dir.', 'Üs 1/2’yi yarıya bölme sanmışsın (24,5 + 1). Üs 1/2 kök demektir.', '49⁰ = 49 almışsın. Sıfırıncı kuvvet 1’dir.', `${P(49, '1/2')} = √49 = 7 ve 49⁰ = 1. Toplam 8.`], scene: 0,
      },
      {
        q: 'Aşağıdakilerden hangisi doğrudur?',
        options: [`${rt(4)} + ${rt(9)} = ${rt(13)}`, `${rt(16)} − ${rt(9)} = ${rt(7)}`, `${rt(4)} · ${rt(9)} = ${rt(36)}`, `${rt(2)} + ${rt(2)} = ${rt(4)}`], answer: 2,
        why: ['2 + 3 = 5; oysa √13 ≈ 3,61. Kök toplamaya dağılmaz.', '4 − 3 = 1; oysa √7 ≈ 2,65.', '2·3 = 6 ve √36 = 6. Kök çarpmaya dağılır.', '√2 + √2 = 2√2 ≈ 2,83; oysa √4 = 2.'], scene: 0,
      },
      {
        q: `${P(2, 4)} · ${P(2, '−4')} kaçtır?`,
        options: ['0', '16', P(2, '−16'), '1'], answer: 3,
        why: ['Üsler toplanınca 0 çıkar; ama 2⁰ = 1’dir, 0 değil.', 'Eksi üssü yok saymışsın. 2⁻⁴ = 1/16.', 'Üsleri çarpmışsın. Çarpmada üsler toplanır.', '4 + (−4) = 0 ve 2⁰ = 1. Kontrol: 16 · 1/16 = 1.'], scene: 0,
      },
    ],
    summary: [
      '<b>Üs bir sayaçtır:</b> çarpınca toplanır, bölünce çıkarılır, üssün üssünde çarpılır.',
      '<b>Eksi üs ters çevirir, kesirli üs kök aldırır.</b>',
      'Kök çarpmaya dağılır, <b>toplamaya dağılmaz</b>.',
      'İki terimli köklü paydayı <b>eşlenik</b> kurtarır.',
      '<b>Bilimsel gösterim:</b> a × 10ⁿ, 1 ≤ a &lt; 10. <b>≈ eşit demek değildir.</b>',
    ],
    nextLesson: { href: 'b1-kume-dili.html', label: 'Sonraki konu: Aralıklar ve kümeler ›' },
  });
})();
