/* C6 — Konu tekrarı: Sayı kümeleri
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar C1–C5'in defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { M, mathText } = Ders;
  const C = { text: '#E8ECF4', soft: '#8B95AB', base: '#c792ff', ok: '#6BE3A0', bad: '#FF7A70' };
  const F = (a, b) => M.frac(a, b);
  const ov = (s) => `<span class="ov">${s}</span>`;
  const rt = (x) => M.m(M.sqrt(x));

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yazi = (y, size, fill, kalin) => c.S('text', { x: 500, y, 'text-anchor': 'middle', 'font-size': size, 'font-weight': kalin ? 700 : 400, style: `fill:${fill}`, opacity: 0 }, svg);
    const sira = yazi(84, 24, C.soft), baslik = yazi(150, 40, C.base, true);
    const satir = [0, 1, 2].map((k) => yazi(256 + k * 88, 40, C.text));
    // 1. kuralın çizimi: iç içe kümeler (görünmez başlar, hepsi gibi soldurulur)
    const kume = c.S('g', { opacity: 0 }, svg);
    [['R', 'gerçek', 430, 175, '--r'], ['Q', 'rasyonel', 350, 140, '--q'], ['Z', 'tam sayı', 270, 105, '--z'], ['N', 'doğal', 190, 70, '--n']].forEach(([k, ad, rx, ry, v], i) => {
      c.S('ellipse', { cx: 500, cy: 372, rx, ry, style: `fill:var(${v});fill-opacity:.16;stroke:var(${v});stroke-width:3` }, kume);
      const t = c.S('text', { x: 500, y: i === 3 ? 372 : 372 - ry + 20, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 26, 'font-weight': 700, style: `fill:var(${v})` }, kume);
      t.textContent = `${k}  ${ad}`;
    });
    const hepsi = [sira, baslik, ...satir, kume];
    const belir = (els, ms = 400) => c.tween(ms, (e) => [].concat(els).forEach((t) => t.setAttribute('opacity', e)));
    let n = 0;
    const kur = async (b, ss, renk = []) => {   // eski kuralı kaldır, yenisini yaz; satırlar görünmez kalır
      c.clearSay();
      const eski = hepsi.map((t) => +t.getAttribute('opacity'));
      await c.tween(300, (e) => hepsi.forEach((t, k) => t.setAttribute('opacity', eski[k] * (1 - e))));
      n += 1;
      sira.textContent = `${n}/7`; baslik.textContent = b;
      satir.forEach((t, k) => { mathText(t, ss[k] || ''); t.style.fill = renk[k] || C.text; });
    };
    const say = (html, speak) => c.say(html, speak ? { speak } : undefined);
    const par = (...ps) => Promise.all(ps);

    // 1. İç içe kümeler (C1)
    await kur('İç içe kümeler', []);
    await par(say('Doğal sayılar tam sayıların içindedir.'), belir([sira, baslik, kume]));
    await say('Tam sayılar rasyonellerin, onlar da gerçek sayıların içindedir.');
    c.note('<b>N ⊂ Z ⊂ Q ⊂ R</b><br>Her küme bir öncekini içerir.', 'İç içe kümeler', 'sayilar-c6-ic');

    // 2. Kapalılık (C1)
    await kur('Kapalılık', ['3 − 5 = −2 ∉ N', '3 ÷ 4 ∉ Z', 'Tek karşı örnek bozar.'], [C.bad, C.bad, C.text]);
    await par(say('Sonuç hep kutuda kalıyorsa işlem kapalıdır.'), belir([sira, baslik]));
    await par(say('Yapılamayan işlem yeni kutu açar.'), belir([satir[0], satir[1]]));
    await par(say('Tek karşı örnek kapalılığı bozar.'), belir(satir[2]));
    c.note('<b>Kapalı:</b> sonuç hep kutuda kalır. N çıkarmada, Z bölmede kapalı değil.<br>Yapılamayan işlem yeni kutu açar.', 'Kapalılık', 'sayilar-c6-kapali');

    // 3. Rasyonel sayı (C1)
    await kur('Rasyonel sayı', ['a/b,  a, b tam sayı,  b ≠ 0', 'Her tam sayı rasyoneldir.', '−3 = −3/1'], [C.text, C.text, C.ok]);
    await par(say('Rasyonel sayı, iki tam sayının bölümüdür.'), belir([sira, baslik, satir[0]]));
    await par(say('Paydası bir olan kesir tam sayıdır.'), belir([satir[1], satir[2]]));
    c.note(`<b>Q = { ${F('a', 'b')} : b ≠ 0 }</b><br>−3 = −${F(3, 1)}: her tam sayı rasyoneldir.`, 'Rasyonel sayı', 'sayilar-c6-rasyonel');

    // 4. Ondalık açılım (C2)
    await kur('Ondalık açılım', ['1/4 = 0,25  (biter)', '1/3 = 0,333…  (devreder)', 'Biten ya da devreden: Q'], [C.text, C.text, C.ok]);
    await par(say('Bölmede kalan sıfır olursa ondalık biter.'), belir([sira, baslik, satir[0]]));
    await par(say('Kalan tekrar ederse rakamlar da tekrar eder.'), belir(satir[1]));
    await par(say('Biten ya da devreden her ondalık rasyoneldir.'), belir(satir[2]));
    c.note(`<b>Biten ya da devreden: rasyonel.</b><br>${F(1, 4)} = 0,25 · ${F(1, 3)} = 0,${ov('3')}`, 'Ondalık açılım', 'sayilar-c6-ondalik');

    // 5. İrrasyonel sayı (C3)
    await kur('İrrasyonel sayı', ['Ne biter ne devreder: Q′', '√5 ∈ Q′ ama √9 = 3 ∈ N', 'R = Q ∪ Q′'], [C.text, C.text, C.ok]);
    await par(say('Ne biter ne devrederse sayı irrasyoneldir.'), belir([sira, baslik, satir[0]]));
    await par(say('Kök işareti tek başına irrasyonel yapmaz.'), belir(satir[1]));
    await par(say('Rasyoneller ve irrasyoneller gerçek sayıları doldurur.'), belir(satir[2]));
    c.note(`<b>R = Q ∪ Q′</b><br>${rt(2)} = 1,41421356… · ${rt(9)} = 3`, 'İrrasyonel sayı', 'sayilar-c6-irrasyonel');

    // 6. Sıralama ve arada olma (C4)
    await kur('Sıralama, arada olma', ['Soldaki küçüktür: −1/2 < −1/3', 'Arada olma yalnızca Q, R’de', 'Ortası (a + b)/2 aradadır']);
    await par(say('Sayı doğrusunda soldaki sayı küçüktür.'), belir([sira, baslik, satir[0]]));
    await par(say('Kesirlerde bir sonraki sayı yoktur.'), belir(satir[1]));
    await par(say('İki sayının ortası her zaman aradadır.'), belir(satir[2]));
    c.note(`Soldaki küçüktür: −${F(1, 2)} &lt; −${F(1, 3)}<br><b>Arada olma</b> yalnızca Q ve R’de; ortası ${F('a + b', 2)}`, 'Sıralama, arada olma', 'sayilar-c6-sira');

    // 7. Karşı örnek ve ispat (C5)
    await kur('Karşı örnek', ['Bin örnek kanıtlamaz.', 'Tek karşı örnek çürütür.', '√2 · √2 = 2 ∈ Q'], [C.text, C.text, C.bad]);
    await par(say('Örnekler iddiayı kanıtlamaz.'), belir([sira, baslik, satir[0]]));
    await par(say('Tek karşı örnek iddiayı çürütür.'), belir([satir[1], satir[2]]));
    c.note(`<b>Bin örnek kanıtlamaz, tek karşı örnek çürütür.</b><br>“İki irrasyonelin çarpımı irrasyoneldir”: ${rt(2)}·${rt(2)} = 2`, 'Karşı örnek', 'sayilar-c6-karsi');
    await say('Şimdi beş dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'sayilar-c6', kicker: 'Konu C · Sayı kümeleri', title: 'Konu tekrarı', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Sayı kümeleri',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Beş dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Aşağıdaki işlemlerden hangisi <b>Z’nin bölmede kapalı olmadığını</b> gösterir?',
        options: ['4 − 9 = −5', '−6 · 2 = −12', '8 + (−3) = 5', `9 ÷ 6 = ${F(3, 2)}`], answer: 3,
        why: ['−5 de bir tam sayı; çıkarmada sonuç Z’de kaldı. Üstelik işlem bölme değil.', '−12 tam sayı: çarpmada sonuç Z’de kaldı.', '5 tam sayı: toplamada sonuç Z’de kaldı.', `9 ÷ 6 = ${F(3, 2)} ∉ Z. Sonuç kutudan çıktı: tek karşı örnek yeter.`], scene: 0,
      },
      {
        q: 'Hangi sayı <b>Q’da yer alır ama Z’de yer almaz</b>?',
        options: ['−8', F(14, 7), F(7, 2), rt(7)], answer: 2,
        why: ['−8 bir tam sayı; Z’de yer alır.', `${F(14, 7)} = 2 tam sayı. Önce sadeleştir.`, `${F(7, 2)} = 3,5: iki tam sayının bölümü ama tam sayı değil.`, `${rt(7)} ne biter ne devreder; Q’da bile yer almaz.`], scene: 0,
      },
      {
        q: 'Bir kesri ondalığa çevirirken kalanlar 5, 8, 2, 5, 8, 2… diye gidiyor. Bu sayı için hangisi doğrudur?',
        options: ['Ondalık açılım sonunda biter', 'Ondalık açılım devreder; sayı rasyoneldir', 'Ne biter ne devreder; sayı irrasyoneldir', 'Kalanlar tekrar ettiği için sayı kesir değildir'], answer: 1,
        why: ['Biterse kalan 0 olur; burada 0 hiç çıkmıyor.', 'Kalan 5 geri geldi: bundan sonrası aynen tekrar eder. Devreden ondalık rasyoneldir.', 'Ölçüt tekrar etmek: tekrar eden sayı irrasyonel değildir.', 'Kalan tekrar edince açılım devreder; devreden her ondalık bir kesirdir.'], scene: 0,
      },
      {
        q: `Kenarı ${rt(5)} cm olan karenin alanı kaç cm²’dir?`,
        options: ['5', rt(5), '2,5', '2' + rt(5)], answer: 0,
        why: [`${rt(5)} · ${rt(5)} = 5. Kenarı kendisiyle çarpmak alanı verir.`, 'Bu kenar uzunluğu, alan değil.', 'Kenarı ikiye bölmüşsün. Alan, kenarın kendisiyle çarpımıdır.', 'Kenarı ikiyle çarpmışsın. Alan için kenar kendisiyle çarpılır.'], scene: 0,
      },
      {
        q: 'Ne biter ne devreden bir ondalık açılımı olan sayı için hangisi doğrudur?',
        options: ['Z’dedir', 'Q’dadır, R’de değildir', 'Q′ kümesindedir ama R’de değildir', 'Q′ kümesindedir ve R’dedir'], answer: 3,
        why: ['Tam sayıların ondalık açılımı biter.', 'Q’daki her sayının açılımı biter ya da devreder.', 'R, Q ile Q′’nün birleşimidir; Q′ R’nin içindedir.', 'R = Q ∪ Q′. İrrasyonel sayılar gerçek sayıdır.'], scene: 0,
      },
      {
        q: 'Hangi sıralama küçükten büyüğe <b>doğrudur</b>?',
        options: [`−${F(1, 2)} &lt; −0,7 &lt; ${F(1, 4)} &lt; 0,3`, `−0,7 &lt; −${F(1, 2)} &lt; 0,3 &lt; ${F(1, 4)}`, `−0,7 &lt; −${F(1, 2)} &lt; ${F(1, 4)} &lt; 0,3`, `0,3 &lt; ${F(1, 4)} &lt; −${F(1, 2)} &lt; −0,7`], answer: 2,
        why: ['−0,7, −1/2’nin solunda; negatiflerde sıra tersine döner.', '1/4 = 0,25 ve 0,3 > 0,25: 1/4, 0,3’ten önce gelir.', 'Soldan sağa: −0,7, −0,5, 0,25, 0,3.', 'Bu sıra büyükten küçüğe.'], scene: 0,
      },
      {
        q: 'Hangisi <b>doğrudur</b>?',
        options: ['3 ile 4 arasında bir tam sayı vardır', '3 ile 4 arasında bir rasyonel sayı vardır', '0,5’in bir sonraki rasyonel sayısı 0,6’dır', 'Q’da arada olma yoktur'], answer: 1,
        why: ['3 ile 4 arasında tam sayı yok; Z’de arada olma yok.', '3,5 hem rasyonel hem 3 ile 4’ün arasında.', '0,5 ile 0,6 arasında 0,55 var: kesirlerde bir sonraki sayı yok.', 'Q’da ve R’de arada olma var; yalnızca N ve Z’de yok.'], scene: 0,
      },
      {
        q: `${F(1, 6)} ile ${F(1, 2)} sayılarının <b>tam ortasındaki</b> sayı hangisidir?`,
        options: [F(1, 3), F(1, 4), F(2, 3), F(1, 12)], answer: 0,
        why: [`${F(1, 6)} + ${F(1, 2)} = ${F(2, 3)}; ikiye bölününce ${F(1, 3)}. Kontrol: ${F(1, 3)} − ${F(1, 6)} = ${F(1, 6)} = ${F(1, 2)} − ${F(1, 3)}.`, '1/4 iki sayının arasında; ama tam ortası değil.', 'Toplamı almışsın, ikiye bölmeyi unutmuşsun.', 'Sayıları çarpmışsın. Ortası için toplanıp ikiye bölünür.'], scene: 0,
      },
      {
        q: '“İki rasyonelin farkı her zaman pozitiftir.” Bu iddiayı hangisi <b>çürütür</b>?',
        options: ['3 − 1 = 2', '2 − 5 = −3', `${F(1, 2)} − ${F(1, 3)} = ${F(1, 6)}`, `${rt(2)} − 1`], answer: 1,
        why: ['2 pozitif: iddiayı destekleyen bir tanık, çürütmez.', '2 ve 5 rasyonel, fark −3 negatif. Tek karşı örnek yeter.', '1/6 pozitif: bu da tanık, çürütmez.', '√2 rasyonel değil; iddia rasyoneller hakkında.'], scene: 0,
      },
      {
        q: 'Bir iddianın <b>her zaman</b> doğru olduğunu göstermek için ne gerekir?',
        options: ['Her durumu kapsayan bir gerekçe (ispat) yazmak', 'Çok sayıda örnek denemek', 'Bir örneğin tutması', 'Tek bir karşı örnek bulmak'], answer: 0,
        why: ['İspat bütün durumlar için geçerlidir; örnekler değil.', 'Bin örnek de kanıtlamaz; tutmayan çift hâlâ çıkabilir.', 'Tek örnek hiçbir şey kanıtlamaz.', 'Karşı örnek iddiayı çürütür; “her zaman doğru” göstermez.'], scene: 0,
      },
    ],
    summary: [
      '<b>N ⊂ Z ⊂ Q ⊂ R.</b> Yapılamayan işlem yeni kutu açar; tek karşı örnek kapalılığı bozar.',
      '<b>Biten ya da devreden: rasyonel.</b> Ne biter ne devreder: irrasyonel.',
      'Kesirlerde “bir sonraki sayı” yoktur; <b>arada olma</b> yalnızca Q ve R’de.',
      '<b>Bin örnek kanıtlamaz, tek karşı örnek çürütür.</b>',
    ],
    nextLesson: { href: 'd1-onerme.html', label: 'Sonraki konu: Önerme ›' },
  });
})();
