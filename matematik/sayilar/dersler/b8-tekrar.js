/* B8 — Konu tekrarı: Aralıklar ve kümeler
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar B1–B7'nin defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { mathText } = Ders;
  const C = { text: '#E8ECF4', soft: '#8B95AB', base: '#3ddc97', ok: '#6BE3A0', bad: '#FF7A70' };
  const M_ = (x) => `<span class="m">${x}</span>`;

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yazi = (y, size, fill, kalin) => c.S('text', { x: 500, y, 'text-anchor': 'middle', 'font-size': size, 'font-weight': kalin ? 700 : 400, style: `fill:${fill}`, opacity: 0 }, svg);
    const sira = yazi(84, 24, C.soft), baslik = yazi(150, 40, C.base, true);
    const satir = [0, 1, 2].map((k) => yazi(256 + k * 88, 40, C.text));
    const cz = c.S('g', { opacity: 0 }, svg);   // yalın çizim katmanı (sayı doğrusu)
    const hepsi = [sira, baslik, ...satir, cz];
    const belir = (els, ms = 400) => c.tween(ms, (e) => [].concat(els).forEach((t) => t.setAttribute('opacity', e)));
    let n = 0;
    const kur = async (b, ss, renk = []) => {   // eski kuralı kaldır, yenisini yaz; satırlar görünmez kalır
      c.clearSay();
      const eski = hepsi.map((t) => +t.getAttribute('opacity'));
      await c.tween(300, (e) => hepsi.forEach((t, k) => t.setAttribute('opacity', eski[k] * (1 - e))));
      cz.textContent = '';
      n += 1;
      sira.textContent = `${n}/7`; baslik.textContent = b;
      satir.forEach((t, k) => { mathText(t, ss[k] || ''); t.style.fill = renk[k] || C.text; });
    };
    const say = (html, speak) => c.say(html, speak ? { speak } : undefined);
    const par = (...ps) => Promise.all(ps);

    /* sayı doğrusu şeridi: 3'ten sağa uzanan şerit; nokta dolu ya da boş */
    const serit = (yEtiket, yEksen, etiket, dolu) => {
      const t = (x, y, txt, size, fill) => { const e = c.S('text', { x, y, 'text-anchor': 'middle', 'font-size': size, style: `fill:${fill}` }, cz); e.textContent = txt; return e; };
      t(500, yEtiket, etiket, 34, C.text);
      c.S('line', { x1: 120, y1: yEksen, x2: 880, y2: yEksen, 'stroke-width': 3, style: `stroke:${C.soft}` }, cz);
      c.S('line', { x1: 300, y1: yEksen, x2: 860, y2: yEksen, 'stroke-width': 10, 'stroke-linecap': 'round', style: `stroke:${C.ok}` }, cz);
      c.S('circle', { cx: 300, cy: yEksen, r: 15, 'stroke-width': 5, style: `stroke:${C.ok};fill:${dolu ? C.ok : 'var(--board)'}` }, cz);
      t(300, yEksen + 44, '3', 26, C.soft);
    };

    // 1. Küme dili (B1)
    await kur('Küme dili', ['Eleman ∈, küme ⊂', '3 ∈ A,  {3} ⊂ A', 's(∅) = 0,  s({0}) = 1'], [C.text, C.text, C.ok]);
    await par(say('Eleman için ∈, küme için ⊂ yazılır.'), belir([sira, baslik, satir[0], satir[1]]));
    await par(say('Sıfır da bir elemandır; {0} boş küme değildir.'), belir(satir[2]));
    c.note(`<b>Eleman ∈, küme ⊂:</b> ${M_('3 ∈ A')} ve ${M_('{3} ⊂ A')}<br>${M_('s(∅) = 0')} ama ${M_('s({0}) = 1')}`, 'Küme dili', 'sayilar-b8-kume');

    // 2. Dolu ve boş nokta (B2)
    await kur('Dolu ve boş nokta', []);
    serit(212, 262, 'x ≥ 3: dolu nokta, 3 dahil', true);
    serit(372, 422, 'x > 3: boş nokta, 3 hariç', false);
    await par(say('Eşitlik varsa nokta dolu, yoksa boştur.'), belir([sira, baslik]));
    await par(say('Büyük sayılar sağda durur.'), belir(cz));
    c.note('<b>≥ ve ≤</b> dolu nokta (dahil) · <b>&gt; ve &lt;</b> boş nokta (hariç)<br>Büyük sayılar sağda', 'Dolu ve boş nokta', 'sayilar-b8-nokta');

    // 3. Parantez dili (B3)
    await kur('Parantez dili', ['[ ] dahil,  ( ) hariç', '∞ yanında hep ( )', 'x ≥ 7  →  [7, ∞)']);
    await par(say('Köşeli parantez dahil, yuvarlak parantez hariçtir.'), belir([sira, baslik, satir[0]]));
    await par(say('Sonsuz bir sayı değildir; yanında hep yuvarlak durur.'), belir(satir[1]));
    await par(say('Yarım çizgi de aynı kurala uyar.'), belir(satir[2]));
    c.note(`<b>[ ]</b> dahil · <b>( )</b> hariç · ∞ hep yuvarlak<br>${M_('x ≥ 7')} → ${M_('[7, ∞)')}`, 'Parantez dili', 'sayilar-b8-parantez');

    // 4. Dört dil, tek küme (B4)
    await kur('Dört dil, tek küme', ['1 < x ≤ 3  =  (1, 3]', 'x ∈ ℝ: aradaki her sayı', 'x ∈ ℤ: {2, 3}']);
    await par(say('Eşitsizlik, aralık, doğru ve küme aynı şeyi anlatır.'), belir([sira, baslik, satir[0]]));
    await par(say('ℝ yazınca aradaki her sayı girer.'), belir(satir[1]));
    await par(say('ℤ yazınca aralık ayrı noktalara dağılır.'), belir(satir[2]));
    c.note(`${M_('1 &lt; x ≤ 3')} = ${M_('(1, 3]')} · ${M_('x ∈ ℤ')} olunca ${M_('{2, 3}')}`, 'Dört dil, tek küme', 'sayilar-b8-dort-dil');

    // 5. Kesişim ve birleşim (B5)
    await kur('Kesişim ve birleşim', ['∩ = ve,  ∪ = veya', '[2, 5) ∩ [5, 9] = ∅', '[2, 5] ∩ [5, 9] = {5}'], [C.text, C.bad, C.ok]);
    await par(say('Kesişim ortak parçadır, birleşim ikisinin toplamıdır.'), belir([sira, baslik, satir[0]]));
    await par(say('Ortak uç bir aralıkta bile boşsa kesişimde yoktur.'), belir(satir[1]));
    await par(say('Tek parantez farkı sonucu değiştirir.'), belir(satir[2]));
    c.note(`<b>∩ ve, ∪ veya.</b><br>${M_('[2, 5) ∩ [5, 9] = ∅')} ama ${M_('[2, 5] ∩ [5, 9] = {5}')}`, 'Kesişim ve birleşim', 'sayilar-b8-kesisim');

    // 6. Fark ve tümleyen (B6)
    await kur('Fark ve tümleyen', ['A \\ B: A’da olup B’de olmayanlar', 'Sıra önemli: A \\ B ≠ B \\ A', 'Tümleyende dolu boşalır, boş dolar'], [C.text, C.text, C.ok]);
    await par(say('Fark, birinde olup ötekinde olmayanları bırakır.'), belir([sira, baslik, satir[0]]));
    await par(say('Sıra önemlidir; ikisi aynı küme değildir.'), belir(satir[1]));
    await par(say('Tümleyen, kümenin dışında kalan her şeydir.'), belir(satir[2]));
    c.note(`${M_('A \\ B')}: A’da olup B’de olmayanlar · ${M_('A \\ B ≠ B \\ A')}<br>${M_('(2, 5]′ = (−∞, 2] ∪ (5, ∞)')}`, 'Fark ve tümleyen', 'sayilar-b8-fark');

    // 7. Mutlak değerle aralık (B7)
    await kur('Mutlak değerle aralık', ['|x − a| < r', 'a − r < x < a + r', 'Merkez a, pay r']);
    await par(say('Mutlak değer, merkeze uzaklıktır.'), belir([sira, baslik, satir[0]]));
    await par(say('Merkezden r kadar iki yana açılan aralığı verir.'), belir([satir[1], satir[2]]));
    await par(say('Eşitlik gelirse uçlar dolar.'), c.wait(900));
    c.note(`${M_('|x − a| &lt; r')} ⇔ ${M_('a − r &lt; x &lt; a + r')}<br>${M_('|x − 5| &lt; 2')} → ${M_('(3, 7)')}; ≤ olursa ${M_('[3, 7]')}`, 'Mutlak değerle aralık', 'sayilar-b8-mutlak');
    await say('Şimdi yedi dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'sayilar-b8', kicker: 'Konu B · Aralıklar ve kümeler', title: 'Konu tekrarı', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Aralıklar ve kümeler',
      hook: 'Yedi dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Yedi dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: `${M_('K = {x : x = 4k, k ∈ ℕ}')} kümesi için hangisi doğrudur?`,
        options: [M_('0 ∉ K'), M_('10 ∈ K'), M_('{8, 12} ⊂ K'), M_('s(K) = 4')], answer: 2,
        why: ['k = 0 için 4·0 = 0: 0, K’nın elemanıdır.', '10, 4’ün katı değil: 4·2 = 8, 4·3 = 12.', '8 = 4·2 ve 12 = 4·3: ikisi de K’da, {8, 12} alt kümedir.', 'K = {0, 4, 8, 12, …} bitmez; eleman sayısı sonsuzdur.'], scene: 0,
      },
      {
        q: `${M_('x ≤ −4')} kuralını hangi sayı sağlar?`,
        options: ['−3,9', '−2', '3,9', '−4'], answer: 3,
        why: ['−3,9, −4’ün sağında; yani −4’ten büyük.', 'Eksili sayılarda da büyükler sağda: −2, −4’ten büyük.', '3,9, −4’ün çok sağında.', '≤ eşitliği de alır: −4 ≤ −4 doğru, nokta dolu.'], scene: 0,
      },
      {
        q: `${M_('(−∞, 6)')} aralığı hangi eşitsizliktir?`,
        options: [M_('x ≤ 6'), M_('x < 6'), M_('x > 6'), M_('x ≥ 6')], answer: 1,
        why: ['6 yuvarlak parantezle gösterilmiş; hariç, dahil değil.', '(−∞, 6): 6’dan küçük bütün sayılar, 6 hariç.', 'Yön ters: (−∞, 6) 6’nın solundadır; x &gt; 6 ise sağındakileri verir.', 'Hem yön ters hem 6 dahil.'], scene: 0,
      },
      {
        q: `${M_('{3, 4, 5, 6}')} kümesi hangisine eşittir?`,
        options: [M_('{x : 3 ≤ x &lt; 7, x ∈ ℤ}'), M_('{x : 3 ≤ x ≤ 7, x ∈ ℤ}'), M_('{x : 3 &lt; x ≤ 6, x ∈ ℤ}'), M_('{x : 3 ≤ x &lt; 7, x ∈ ℝ}')], answer: 0,
        why: ['3 dahil, 7 hariç, tam sayılar: 3, 4, 5, 6.', '7 de gelir: x ≤ 7 yazıyor.', '3 hariç: 3 &lt; x yazıyor; yalnızca 4, 5, 6 kalır.', 'ℝ yazınca küme aralık olur; 3,5 gibi sayılar da girer.'], scene: 0,
      },
      {
        q: `${M_('[1, 5) ∩ (3, 8]')} işleminin sonucu nedir?`,
        options: [M_('[1, 8]'), M_('(3, 5]'), M_('(3, 5)'), M_('[3, 5]')], answer: 2,
        why: ['Bu birleşim (∪). Kesişim yalnızca ortak parçadır.', '5, ilk aralıkta yok; kesişimde de olamaz.', '3, ikincide boş; 5, ilkinde boş. İkisi de dışarıda.', 'Uçları dolu almışsın; ikisi de bir aralıkta boş nokta.'], scene: 0,
      },
      {
        q: `${M_('(−∞, 2) ∪ (2, ∞)')} birleşimi gerçek sayıların tamamı mıdır?`,
        options: ['Evet; iki parça birleşince bütün doğru olur.', 'Hayır; pozitif sayılar eksiktir.', 'Hayır; ∞ eksiktir.', 'Hayır; yalnızca 2 eksiktir.'], answer: 3,
        why: ['2, iki parçada da boş nokta; birleşimde de dışarıda kalır.', 'Pozitif sayılar (2, ∞) içinde; eksik olan onlar değil.', '∞ bir sayı değildir; eksik bir eleman olamaz.', '2 dışında her gerçek sayı iki parçadan birinde var.'], scene: 0,
      },
      {
        q: `${M_('[0, 4] \\ (2, 6)')} işleminin sonucu nedir?`,
        options: [M_('(2, 4]'), M_('[0, 2)'), M_('[0, 6)'), M_('[0, 2]')], answer: 3,
        why: ['Bu kesişim: iki kümede de olanlar. Fark onları siler.', '2, (2, 6) içinde değil; farkta kalır ve dolu olur.', 'Bu birleşim. Fark, ikinci kümenin parçasını siler.', 'Silinen parça (2, 4]; 2 ikinci kümede olmadığı için kalır.'], scene: 0,
      },
      {
        q: `${M_('[−2, 4)')} kümesinin tümleyeni hangisidir?`,
        options: [M_('(−∞, −2) ∪ [4, ∞)'), M_('(−∞, −2] ∪ (4, ∞)'), M_('(−∞, −2) ∪ (4, ∞)'), M_('[−2, 4)')], answer: 0,
        why: ['−2 verilen kümede dolu, tümleyende boş. 4 boştu, doldu.', '−2 verilen kümede var; tümleyende olamaz. 4 ise tümleyende olmalı.', '4 verilen kümede yok; tümleyende olmalı, dolu.', 'Bu, kümenin kendisi. Tümleyen dışarıda kalanlardır.'], scene: 0,
      },
      {
        q: `${M_('|x − 6| ≤ 2')} hangi aralıktır?`,
        options: [M_('(4, 8)'), M_('[4, 8]'), M_('[2, 6]'), M_('[4, 6]')], answer: 1,
        why: ['≤ eşitliği de alır: uçlar dolu olmalı.', 'Merkez 6, pay 2: 6 − 2 = 4 ve 6 + 2 = 8; eşitlik var, uçlar dolu.', 'Merkezi bir uç yapmışsın. Merkez aralığın tam ortasıdır.', 'Yalnızca sola bakmışsın. 6’nın sağında da 2 pay var.'], scene: 0,
      },
      {
        q: `${M_('|x − 4| < 3')} ve ${M_('x ≥ 5')} kuralları birlikte hangi aralığı verir?`,
        options: [M_('(1, 5)'), M_('[5, 7]'), M_('[5, 7)'), M_('[5, ∞)')], answer: 2,
        why: ['Önce (1, 7) bulunur; ortak kısım 5’ten başlar, 1’den değil.', '7 hariç: |x − 4| &lt; 3 yazıyor, eşitlik yok.', '(1, 7) ile [5, ∞) ortak: 5 dahil, 7 hariç.', 'İlk kuralı unutmuşsun. Mutlak değer 7’de sınırlar.'], scene: 0,
      },
    ],
    summary: [
      '<b>Eleman ∈, küme ⊂.</b> ∅ boştur, {0} boş değildir.',
      '<b>Eşitlik varsa dolu nokta;</b> köşeli dahil, yuvarlak hariç, ∞ hep yuvarlak.',
      '<b>Aynı küme dört dilde yazılır;</b> ℝ mi ℤ mi diye bakılır.',
      '<b>∩ ve, ∪ veya.</b> Tek parantez farkı sonucu değiştirir.',
      '<b>Fark sıraya bağlıdır;</b> tümleyende dolu boşalır, boş dolar.',
      `<b>Mutlak değer uzaklıktır:</b> ${M_('|x − a| &lt; r')} ⇔ ${M_('a − r &lt; x &lt; a + r')}`,
    ],
    nextLesson: { href: 'c1-her-kutu-bir-ihtiyac.html', label: 'Sonraki konu: Sayı kümeleri ›' },
  });
})();
