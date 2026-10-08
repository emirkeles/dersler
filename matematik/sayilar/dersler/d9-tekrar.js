/* D9 — Konu tekrarı: İşlem özellikleri ve cebir
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar D1–D8'in defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { mathText } = Ders;
  const C = { text: '#E8ECF4', soft: '#8B95AB', base: '#3CC8E8', ok: '#6BE3A0', bad: '#FF7A70' };

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

    // 1. Önerme, her ve bazı (D1)
    await kur('Önerme, her ve bazı', ['Önerme: kesin doğru ya da yanlış', '∀ (her): tek istisna yeter', '∃ (bazı): tek örnek yeter']);
    await par(say('Önerme, doğru ya da yanlış olduğu kesin olan cümledir.'), belir([sira, baslik, satir[0]]));
    await par(say('Her diyen önerme tek istisnayla düşer.'), belir(satir[1]));
    await par(say('Bazı diyen önerme tek örnekle doğrulanır.'), belir(satir[2]));
    c.note('<b>Önerme:</b> doğru ya da yanlış olduğu kesin cümle. Değili doğruluğu ters çevirir.<br><b>∀</b> tek istisnayla düşer; <b>∃</b> tek örnekle doğrulanır.', 'Önerme, her ve bazı', 'sayilar-d9-onerme');

    // 2. Ve, veya, ya da (D2)
    await kur('Bağlaçlar', ['p ∧ q: ikisi de doğru', 'p ∨ q: en az biri doğru', 'p ⊻ q: yalnızca biri doğru']);
    await par(say('Ve, ikisinin de doğru olmasını ister.'), belir([sira, baslik, satir[0]]));
    await par(say('Veya için en az biri doğru olmalı.'), belir(satir[1]));
    await par(say('Ya da, yalnızca biri doğruyken doğrudur.'), belir(satir[2]));
    c.note('<b>p ∧ q</b>: ikisi de doğru. <b>p ∨ q</b>: en az biri doğru. <b>p ⊻ q</b>: yalnızca biri doğru.<br>2 &lt; x &lt; 6, yani x &gt; 2 ∧ x &lt; 6', 'Ve, veya, ya da', 'sayilar-d9-baglac');

    // 3. İse, ancak ve ancak (D3)
    await kur('Ok işaretleri', ['p ⇒ q: p doğruysa q doğru', 'Tersi yanlış olabilir: x = 4', 'p ⇔ q: iki yön de doğru'], [C.text, C.bad, C.text]);
    await par(say('İse, tek yönlüdür: p doğruysa q da doğrudur.'), belir([sira, baslik, satir[0]]));
    await par(say('Ters yön yanlış olabilir; x = 4 bunu gösterir.'), belir(satir[1]));
    await par(say('Ancak ve ancak için iki yön de doğru olmalı.'), belir(satir[2]));
    c.note('<b>p ⇒ q</b>: p doğruysa q doğru. x &gt; 5 ⇒ x &gt; 3; tersi yanlış (x = 4).<br><b>p ⇔ q</b>: iki yön de doğru. a &lt; b ⇔ b − a &gt; 0', 'İse, ancak ve ancak', 'sayilar-d9-ok');

    // 4. Değişme ve birleşme (D4)
    await kur('Değişme, birleşme', ['a + b = b + a', '(a + b) + c = a + (b + c)', 'Çıkarmada ikisi de yok'], [C.text, C.text, C.bad]);
    await par(say('Toplamada ve çarpmada sıra değişebilir.'), belir([sira, baslik, satir[0]]));
    await par(say('Parantez kayar, sonuç değişmez.'), belir(satir[1]));
    await par(say('Çıkarmada değişme de birleşme de yoktur.'), belir(satir[2]));
    c.note('<b>a + b = b + a</b> · <b>(a + b) + c = a + (b + c)</b> (çarpmada da)<br><b class="tw">Çıkarmada yok:</b> 5 − 3 ≠ 3 − 5', 'Değişme ve birleşme', 'sayilar-d9-degisme');

    // 5. Dağılma (D5)
    await kur('Dağılma', ['a · (b + c) = a·b + a·c', 'a − (b + c) = a − b − c']);
    await par(say('Dışarıdaki çarpan, parantezdeki herkesle çarpılır.'), belir([sira, baslik, satir[0]]));
    await par(say('Eksi işareti de parantezdeki herkese ulaşır.'), belir(satir[1]));
    c.note('<b>a · (b + c) = a·b + a·c</b> · <b>a · (b − c) = a·b − a·c</b><br>a − (b + c) = a − b − c · 7 · 98 = 700 − 14', 'Dağılma', 'sayilar-d9-dagilma');

    // 6. Birim, ters, yutan (D6)
    await kur('Özel elemanlar', ['Birim: 0 (toplama), 1 (çarpma)', 'Ters: −a ve 1/a', 'Yutan: a · 0 = 0']);
    await par(say('Birim eleman, sayıyı değiştirmez.'), belir([sira, baslik, satir[0]]));
    await par(say('Ters eleman, işlemi geri alır.'), belir(satir[1]));
    await par(say('Sıfırla çarpınca her şey sıfır olur.'), belir(satir[2]));
    c.note('<b>Birim:</b> a + 0 = a ve a · 1 = a. <b>Ters:</b> a + (−a) = 0, a · 1/a = 1 (a ≠ 0).<br><b>Yutan:</b> a · 0 = 0; 0’ın çarpmaya göre tersi yok.', 'Birim, ters, yutan', 'sayilar-d9-eleman');

    // 7. Karelerin açılımı (D7)
    await kur('Karelerin açılımı', ['(a + b)^{2} = a^{2} + 2ab + b^{2}', '(a − b)^{2} = a^{2} − 2ab + b^{2}']);
    await par(say('Toplamın karesinde ortadaki 2ab terimi unutulmaz.'), belir([sira, baslik, satir[0]]));
    await par(say('Farkın karesinde ortadaki terim eksi olur.'), belir(satir[1]));
    c.note('<b>(a + b)² = a² + 2ab + b²</b> · <b>(a − b)² = a² − 2ab + b²</b><br>Özdeşlik her değer için doğrudur; <b class="tw">(a + b)² ≠ a² + b²</b>', 'Özdeşlikler', 'sayilar-d9-ozdeslik');

    // 8. Çarpanlara ayırma ve sıfır çarpım (D8)
    await kur('Çarpanlara ayırma', ['x^{2} − 9 = (x − 3)(x + 3)', 'a · b = 0 ⇔ a = 0 ∨ b = 0'], [C.text, C.ok]);
    await par(say('Özdeşlikleri geriye okumak, çarpanlara ayırmaktır.'), belir([sira, baslik, satir[0]]));
    await par(say('Çarpım sıfırsa çarpanlardan en az biri sıfırdır.'), belir(satir[1]));
    c.note('<b>a·b + a·c = a·(b + c)</b> · 6x + 9 = 3·(2x + 3) · x² − 9 = (x − 3)(x + 3)<br><b>a · b = 0 ⇔ a = 0 ∨ b = 0</b>; (x − 2)(x + 5) = 0 ise x = 2 veya x = −5', 'Çarpanlara ayırma', 'sayilar-d9-carpan');
    await say('Şimdi sekiz dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'sayilar-d9', kicker: 'Konu D · İşlem özellikleri ve cebir', title: 'Konu tekrarı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: İşlem özellikleri ve cebir',
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
        q: '“Bu torbadaki bütün toplar kırmızıdır” önermesinin <b>değili</b> hangisidir?',
        options: ['Bu torbadaki bütün toplar kırmızı değildir.', 'Bu torbadaki bütün toplar mavidir.', 'Bu torbadaki bazı toplar kırmızı değildir.', 'Bu torbadaki bazı toplar kırmızıdır.'], answer: 2,
        why: ['Bu çok güçlü bir iddia: hiçbiri kırmızı değil. “Bütün”ü düşürmek için tek istisna yeter.', 'Hepsinin mavi olması gerekmez; renkler başka da olabilir.', 'Kırmızı olmayan tek top “bütün”ü düşürür: “her”in değili bir “bazı”dır.', 'Bazı toplar kırmızıyken hepsi de kırmızı olabilir; bu değili değil.'], scene: 0,
      },
      {
        q: '“x &lt; −1 ∨ x &gt; 4” önermesini hangi x doğru yapar?',
        options: ['x = −1', 'x = 0', 'x = 4', 'x = −3'], answer: 3,
        why: ['−1 &lt; −1 yanlış, −1 &gt; 4 de yanlış. Uç nokta dışarıda.', '0 &lt; −1 yanlış, 0 &gt; 4 de yanlış. “Veya” için biri doğru olmalı.', '4 &gt; 4 yanlış, 4 &lt; −1 de yanlış. Uç nokta dışarıda.', '−3 &lt; −1 doğru. “Veya” için biri yeter.'], scene: 0,
      },
      {
        q: '“x &gt; 0 ⇒ x² &gt; 0” doğrudur. Tersi olan “x² &gt; 0 ⇒ x &gt; 0” önermesini hangi x <b>çürütür</b>?',
        options: ['x = −2', 'x = 3', 'x = 0', 'x = 1/2'], answer: 0,
        why: ['(−2)² = 4 &gt; 0 doğru ama −2 &gt; 0 yanlış: karşı örnek.', 'x² = 9 &gt; 0 ve 3 &gt; 0: önermeyi destekler.', '0² = 0, yani “x² &gt; 0” zaten yanlış; önerme bu sayı hakkında bir şey söylemiyor.', 'x² = 1/4 &gt; 0 ve 1/2 &gt; 0: önermeyi destekler.'], scene: 0,
      },
      {
        q: '<b>2 · 37 · 5</b> işlemini zihinden en kolay hangisi verir?',
        options: ['(2 · 37) · 5 = 74 · 5', '(2 · 5) · 37 = 10 · 37', '2 · (37 · 5) = 2 · 185'], answer: 1,
        why: ['Sonuç doğru çıkar ama 74 · 5 zihinden zor.', 'Değişme 5’i öne alır, birleşme 2 · 5’i gruplar: 10 · 37 = 370.', 'Sonuç doğru çıkar ama 37 · 5 zihinden zor.'], scene: 0,
      },
      {
        q: '<b>5 · (50 − 2)</b> işleminin dağılma özelliğiyle sonucu hangisidir?',
        options: ['5 · 50 − 2 = 248', '5 · 50 + 5 · 2 = 260', '50 − 5 · 2 = 40', '5 · 50 − 5 · 2 = 240'], answer: 3,
        why: ['5, 2’ye ulaşmadı. 5, parantezdeki herkesle çarpılır.', 'Eksi, artıya dönmüş. Çıkarılan 5 · 2 çıkarılmalı.', '5, 50 ile çarpılmamış. Dışarıdaki çarpan içerideki herkesle çarpılır.', 'Çarpan her ikisine dağılır: 250 − 10 = 240.'], scene: 0,
      },
      {
        q: 'a ≠ 0 olmak üzere <b>a · b = a</b> ise b kaçtır?',
        options: ['1', '0', 'a', '−1'], answer: 0,
        why: ['a · 1 = a: 1, çarpmanın birim elemanıdır.', 'a · 0 = 0 ve a ≠ 0 olduğundan a değil.', 'a · a = a²; a = 1 değilse a’ya eşit olmaz.', 'a · (−1) = −a; a ≠ 0 iken a’ya eşit değil.'], scene: 0,
      },
      {
        q: 'x + y = 7 ve x · y = 12 ise <b>x² + y²</b> kaçtır?',
        options: ['49', '37', '25', '19'], answer: 2,
        why: ['(x + y)² = 49 ama bu x² + y² değil; ortadaki 2xy = 24 çıkarılmalı.', '49 − 12 almışsın. Ortadaki terim 2xy = 24 olmalı.', '(x + y)² = x² + 2xy + y² ⇒ 49 = x² + y² + 24 ⇒ x² + y² = 25.', 'x + y ile x · y’yi toplamışsın; özdeşlik kullanılmamış.'], scene: 0,
      },
      {
        q: '<b>(2x − 6)(x + 1) = 0</b> için hangisi doğrudur?',
        options: ['x = 6 ∨ x = −1', 'x = 3 ∨ x = −1', 'x = 3 ∧ x = −1', 'x = −3 ∨ x = 1'], answer: 1,
        why: ['2x − 6 = 0 ise x = 3. 2’ye bölmeyi unutmuşsun.', 'Çarpanlardan en az biri 0: 2x − 6 = 0 ya da x + 1 = 0.', 'x aynı anda iki farklı sayı olamaz; “veya” olmalı.', 'İşaretler ters: 2x − 6 = 0 ise x = 3.'], scene: 0,
      },
      {
        q: '<b>x² + 8x + 16</b> hangi çarpıma eşittir?',
        options: ['(x + 4)²', '(x − 4)(x + 4)', '(x + 8)(x + 2)', '(x + 16)(x + 1)'], answer: 0,
        why: ['x² + 2 · x · 4 + 4² = (x + 4)².', '(x − 4)(x + 4) = x² − 16: ortadaki 8x yok.', 'Açınca x² + 10x + 16 çıkar.', 'Açınca x² + 17x + 16 çıkar.'], scene: 0,
      },
      {
        q: '<b>37 · 63 + 37 · 37</b> işleminin sonucu kaçtır?',
        options: ['370', '2331', '37 000', '3700'], answer: 3,
        why: ['Ortak çarpan 37, parantezdeki 100 ile çarpılır: 370 değil.', 'Yalnızca ilk çarpımı hesaplamışsın (37 · 63).', 'Bir sıfır fazla. 37 · 100 = 3700.', '37 · (63 + 37) = 37 · 100 = 3700.'], scene: 0,
      },
    ],
    summary: [
      '<b>Her için hepsi, bazı için biri yeter.</b> Ve ikisini ister, veya en az birini, ya da yalnızca birini.',
      '<b>İse tek yön, ancak ve ancak çift yön.</b>',
      '<b>Toplama ve çarpmada değişme, birleşme var; çıkarmada yok.</b> Dışarıdaki, içerideki herkesle çarpılır.',
      '<b>0 toplamada etkisiz, çarpmada yutan.</b> (a + b)² dört parçadır, iki değil.',
      '<b>Çarpım 0 ise çarpanlardan en az biri 0’dır.</b>',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
