/* G5 — Konu tekrarı: Moleküller arası etkileşimler
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/G-molekuller-arasi-etkilesimler.md (G5). Seslendirme yok.
   Tahtada yedi pano durur (üst sırada dört, altta üçgen tablo ile iki küçük pano); kuralın uzun hâli altyazıda ve defterdedir.
   Biten pano soluklaşır; tahtada aynı anda en çok 25 kelime kalsın diye soluk panolar sayıma girmez. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, par } = window.KIT;
  const G = window.KIT_G;
  const { B, Gz, tanecik, serit, cekim, matris5, hidrojenBagiZinciri } = G;

  const SOLUK = 0.12;

  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const UST = [0, 1, 2, 3].map((i) => [10 + i * 245, 10, 235, 190]);
    const ALT = [[10, 210, 690, 342], [710, 210, 280, 110], [710, 330, 280, 222]];
    const pano = [...UST, ...ALT].map(([x, y, w, h]) => { const g = c.S('g', {}, svg); kutu(c, g, x, y, w, h); return { g, x, y, w, h, cx: x + w / 2, cy: y + h / 2 }; });
    Gz(pano.map((p) => p.g));
    const ic = pano.map(() => c.S('g', {}, svg));   // panoların içerik grupları (panoyla birlikte soluklaşır)
    Gz(ic);

    // Pano 0: dört tanecik türü.
    tanecik(c, ic[0], 'He', 70, 70, { olcek: 1.0 }); tanecik(c, ic[0], 'Na+', 168, 70, { olcek: 0.9 });
    serit(c, ic[0], 72, 150, { boy: 90, kalin: 28, etiket: false }); tanecik(c, ic[0], 'O2', 172, 150, { olcek: 0.7, harf: false });
    // Pano 1: üç sınıf.
    ['atom-atom', 'iyon-molekül', 'molekül-molekül'].forEach((t, i) => yazi(c, ic[1], pano[1].cx, 70 + i * 52, t, { size: 24, kalin: 700 }));
    // Pano 2: iki şerit ve adı.
    serit(c, ic[2], 565, 80, { boy: 78, kalin: 26, etiket: false }); serit(c, ic[2], 685, 80, { boy: 78, kalin: 26, etiket: false });
    cekim(c, ic[2], [565 + 46, 80], [685 - 46, 80], { w: 4, dash: '7 6' });
    yazi(c, ic[2], pano[2].cx, 150, 'dipol-dipol', { size: 26, kalin: 700, renk: RENK.vurgu });
    // Pano 3: adlandırma kuralı.
    const L3 = [['polar: dipol', RENK.yazi], ['apolar, soy gaz:', RENK.yazi], ['indüklenmiş dipol', RENK.yazi], ['iyon: iyon', RENK.yazi]];
    [60, 104, 134, 176].forEach((y, i) => yazi(c, ic[3], pano[3].cx, y, L3[i][0], { size: 22, kalin: 700, renk: i === 2 ? RENK.vurgu : RENK.yazi }));
    // Pano 4: üçgen tablo.
    const m = matris5(c, ic[4], { x: 140, y: 308, w: 185, h: 78, ad: false });
    // Pano 5: van der Waals.
    yazi(c, ic[5], pano[5].cx, pano[5].cy + 10, 'van der Waals', { size: 30, kalin: 700, renk: RENK.vurgu });
    // Pano 6: hidrojen bağı zinciri ve ölçüt.
    const kz = hidrojenBagiZinciri(c, ic[6], 745, 508, { olcek: 0.42, delta: false, harf: false });
    yazi(c, ic[6], pano[6].cx, 378, 'F–H   O–H   N–H', { size: 26, kalin: 700, renk: RENK.vurgu });
    const lb = yazi(c, ic[6], 900, 522, 'daha güçlü', { size: 22, kalin: 700, renk: RENK.cekme });
    Gz(lb);
    Gz(kz.hbG);

    const goster = async (i, onceki) => {
      const isler = [];
      if (onceki != null) onceki.forEach((j) => isler.push(B(c, [pano[j].g, ic[j]], 350, SOLUK)));
      isler.push(B(c, [pano[i].g, ic[i]], 450));
      await Promise.all(isler);
    };
    await c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.');

    await par(c.say('Etkileşimin sınıfını, karşılaşan taneciklerin türü belirler.'), goster(0));
    c.note('<b>Sınıfı, taneciklerin türü belirler.</b> Örnek: Na<sup>+</sup>–H<sub>2</sub>O iyon-molekül.', 'Etkileşimin sınıfı', 'tekrar-sinif');

    await par(c.say('Etkileşimler molekül-molekül, iyon-molekül ve atom-atom olarak ayrılır.'), goster(1, [0]));
    c.note('<b>Üç sınıf:</b> molekül-molekül, iyon-molekül, atom-atom.', 'Üç sınıf', 'tekrar-uc-sinif');

    await par(c.say('Etkileşimin adı, iki tanecik türünün adından çıkar.'), goster(2, [1]));
    c.note('<b>Ad, iki tanecik türünün adından çıkar.</b> Örnek: polar–polar dipol-dipol.', 'Etkileşimin adı', 'tekrar-ad');

    await par(c.say('Polar molekül “dipol”, apolar molekül ve soy gaz atomu “indüklenmiş dipol” olur.'), goster(3, [2]));
    c.note('<b>Polar: dipol. Apolar, soy gaz: indüklenmiş dipol. İyon: iyon.</b>', 'Tür adları', 'tekrar-tur-adlari');

    await par(c.say('Beş etkileşim vardır: dipol-dipol, iyon-dipol ve indüklenmiş dipollü üç tür.'), goster(4, [3]));
    await par(m.hucre.pp.yaz(), m.hucre.pi.yaz(), m.hucre.pa.yaz(), m.hucre.ia.yaz(), m.hucre.aa.yaz(), m.hucre.ii.yaz());
    c.note('<b>Beş etkileşim:</b> dipol-dipol, iyon-dipol, üç indüklenmiş dipollü tür.', 'Beş etkileşim', 'tekrar-bes');

    await par(c.say('London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimleri van der Waals kuvvetleridir.', { speak: 'London, dipol-dipol ve dipol-indüklenmiş dipol etkileşimleri van der Vals kuvvetleridir.' }),
      (() => { ['pp', 'pa', 'aa'].forEach((id) => m.hucre[id].g.firstChild.setAttribute('stroke', 'var(--c5)')); return B(c, [pano[5].g, ic[5]], 500); })());
    c.note('<b>London, dipol-dipol, dipol-indüklenmiş dipol: van der Waals.</b>', 'van der Waals', 'tekrar-vdw');

    await par(c.say('F–H, O–H ya da N–H bağı taşıyan moleküller hidrojen bağı kurar.', { speak: 'Flor hidrojen, oksijen hidrojen ya da azot hidrojen bağı taşıyan moleküller hidrojen bağı kurar.' }),
      B(c, [pano[4].g, ic[4], pano[5].g, ic[5]], 350, SOLUK).then(() => B(c, [pano[6].g, ic[6]], 450)).then(() => B(c, kz.hbG, 500)));
    c.note('<b>F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulur.</b>', 'Hidrojen bağı', 'tekrar-hb');

    await par(c.say('Hidrojen bağı, dipol-dipol etkileşimlerinin ayrı ve daha güçlü grubudur.'), B(c, lb, 500));
    c.note('<b>Hidrojen bağı, dipol-dipol etkileşimlerinin ayrı ve güçlü grubudur.</b>', 'Hidrojen bağı grubu', 'tekrar-hb-grup');
  }

  Ders.start({
    id: 'cesitlilik-g5', kicker: 'Konu G · Moleküller arası etkileşimler', title: 'Konu tekrarı: Moleküller arası etkileşimler', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Moleküller arası etkileşimler',
      hook: 'Etkileşimin adını taneciklerin türü verir. Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Br<sup>−</sup> iyonu ile H<sub>2</sub>O arasındaki etkileşim hangisidir?',
        options: ['Dipol-dipol', 'İyon-dipol', 'İyon-indüklenmiş dipol'], answer: 1,
        why: ['Br<sup>−</sup> bir iyondur; iki polar molekül karşılaşmıyor.', 'İyon ile polar molekül arasındaki etkileşim iyon-dipoldür.', 'H<sub>2</sub>O polardır; iyon-indüklenmiş dipol için apolar tanecik gerekir.'], scene: 0 },
      { q: 'Ne ile Ne arasındaki etkileşim hangisidir?',
        options: ['Dipol-dipol', 'Atom-dipol', 'İndüklenmiş dipol-indüklenmiş dipol (London)'], answer: 2,
        why: ['Neonun kalıcı dipolü yok; dipol-dipol için polar molekül gerekir.', 'Böyle bir etkileşim adı yoktur; soy gaz atomu indüklenmiş dipol olarak girer.', 'Soy gaz atomları arasında geçici dipollerin çekimi etkindir: London kuvveti.'], scene: 0 },
      { q: 'CCl<sub>4</sub>\'ün merkez karbonunda ortaklanmamış çift yoktur. NH<sub>3</sub> ile CCl<sub>4</sub> arasındaki etkileşim hangisidir?',
        options: ['Dipol-indüklenmiş dipol', 'Dipol-dipol', 'İyon-dipol'], answer: 0,
        why: ['NH<sub>3</sub> polar, CCl<sub>4</sub> apolar: polar molekül apolar molekülde dipol indükler.', 'CCl<sub>4</sub> merkez atomunda çift olmadığı için apolardır; iki polar molekül yok.', 'İyon yok; iki tanecik de moleküldür.'], scene: 0 },
      { q: 'K<sup>+</sup> iyonu bir CH<sub>4</sub> molekülüne yaklaşıyor. Etkileşim hangisidir?',
        options: ['İyon-dipol', 'İyon-indüklenmiş dipol', 'Dipol-indüklenmiş dipol'], answer: 1,
        why: ['CH<sub>4</sub> apolardır; iyon-dipol için polar molekül gerekir.', 'İyon, apolar CH<sub>4</sub>\'te dipol indükler: iyon-indüklenmiş dipol.', 'Yaklaşan tanecik polar molekül değil, bir iyondur.'], scene: 0 },
      { q: 'H<sub>2</sub>S ile HCl arasındaki etkileşim hangisidir?',
        options: ['Dipol-dipol', 'Hidrojen bağı', 'London kuvveti'], answer: 0,
        why: ['İki polar molekül karşılaşıyor ve ikisinde de F–H, O–H, N–H bağı yok: dipol-dipol.', 'Hidrojen S\'ye ve Cl\'ye bağlı; F, O ya da N\'ye bağlı değil.', 'London kuvveti apolar tanecikler arasında etkindir; ikisi de polardır.'], scene: 0 },
      { q: 'HF ile NH<sub>3</sub> karıştırılıyor. Aralarında hangi etkileşim oluşur?',
        options: ['Yalnızca London kuvveti', 'İyon-dipol', 'Hidrojen bağı'], answer: 2,
        why: ['İki polar molekül arasında London kuvvetinden daha güçlü etkileşim vardır.', 'İyon yok; iki tanecik de moleküldür.', 'İkisi de F–H ya da N–H bağı taşır: hidrojen bağı kurulur.'], scene: 0 },
      { q: 'CH<sub>4</sub> molekülleri arasında hangisi doğrudur?',
        options: ['Etkileşim olmaz, çünkü CH<sub>4</sub> apolardır', 'Hidrojen bağı kurulur, çünkü CH<sub>4</sub> hidrojen içerir', 'London kuvveti etkindir'], answer: 2,
        why: ['Apolar moleküller de geçici dipoller oluşturur ve birbirini çeker.', 'Hidrojen C\'ye bağlı; F, O ya da N\'ye bağlı olmadığı için hidrojen bağı kurulmaz.', 'Apolar CH<sub>4</sub> moleküllerini London kuvveti bir arada tutar.'], scene: 0 },
      { q: 'Hangi çift iyon-molekül etkileşimidir?',
        options: ['Mg<sup>2+</sup> ile NH<sub>3</sub>', 'NH<sub>3</sub> ile NH<sub>3</sub>', 'Ne ile Ne'], answer: 0,
        why: ['Mg<sup>2+</sup> bir iyon, NH<sub>3</sub> bir molekül: iyon-molekül.', 'İki tanecik de molekül: molekül-molekül etkileşimi.', 'İki tanecik de soy gaz atomu: atom-atom etkileşimi.'], scene: 0 },
      { q: 'Mg<sup>2+</sup> ile CO<sub>2</sub> arasında iyon-dipol etkileşimi oluşur mu?',
        options: ['Oluşur; CO<sub>2</sub>\'de polar bağlar vardır', 'Oluşur; Mg<sup>2+</sup> bir iyondur', 'Oluşmaz; CO<sub>2</sub> apolardır, iyon-indüklenmiş dipol oluşur'], answer: 2,
        why: ['Bağlar polar olsa da CO<sub>2</sub>\'nin dipol momenti sıfırdır; molekül apolardır.', 'İyon-dipol için iyonun yanında polar molekül de gerekir.', 'CO<sub>2</sub> apolardır; iyon onda dipol indükler: iyon-indüklenmiş dipol.'], scene: 0 },
      { q: 'Hangisi van der Waals kuvvetlerinden biridir?',
        options: ['İyon-dipol', 'Dipol-indüklenmiş dipol', 'İyon-indüklenmiş dipol'], answer: 1,
        why: ['İyon-dipol, van der Waals kuvvetleri arasında sayılmaz.', 'London, dipol-dipol ve dipol-indüklenmiş dipol birlikte van der Waals kuvvetleridir.', 'İyon-indüklenmiş dipol, van der Waals kuvvetleri arasında sayılmaz.'], scene: 0 },
    ],
    summary: [
      'Etkileşimin sınıfını, karşılaşan taneciklerin türü belirler.',
      'Etkileşimin adı, iki tanecik türünün adından çıkar.',
      'London, dipol-dipol ve dipol-indüklenmiş dipol van der Waals kuvvetleridir.',
      '<b>Etkileşimin adını taneciklerin türü verir; F–H, O–H ya da N–H bağı varsa hidrojen bağı da kurulur.</b>',
    ],
    nextLesson: { href: 'h1-kristal-amorf.html', label: 'Sonraki konu: Katılar ›' },
  });
})();
