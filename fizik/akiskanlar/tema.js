/* Akışkanlar temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama.
   Her kısa ders yazıldıkça konusuna bir satır eklenir; beşinci öğeyi (süre, saniye) araclar/sure.js yazar. */
KATALOG.tema('fizik', 'akiskanlar', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Kar ayakkabısı neden batmaz, dalgıç neden derinde zorlanır, gemi nasıl yüzer, çatı fırtınada neden uçar? Bu temada basınçtan sıvıların ve havanın basıncına, kaldırma kuvvetine ve Bernoulli İlkesi’ne gidiyoruz.',
  konular: [
    { harf: 'A', ad: 'Basınç', renk: '#f5b04c', dersler: [
      ['a1-basinc-neye-bagli.html', 'Basınç neye bağlı?', 'Karda botla yürürken batıyorsun, kar ayakkabısıyla batmıyorsun; ağırlığın aynıyken değişen ne?', 6, 528],
      ['a2-olc-kaydet-model.html', 'Ölç, kaydet, modele ulaş', 'Bir tuğlanın kuma dikken yatıktan daha çok bastırdığını gördün; kaç kat daha çok?', 7, 402],
      ['a3-tekrar.html', 'Konu tekrarı: Basınç', 'İki dersin kuralları aklında mı?', 1, 235],
    ] },
    { harf: 'B', ad: 'Sıvılarda basınç', renk: '#3cc8e8', dersler: [
    ] },
    { harf: 'C', ad: 'Açık hava basıncı', renk: '#6ea8ff', dersler: [
    ] },
    { harf: 'D', ad: 'Kaldırma kuvveti', renk: '#3ddc97', dersler: [
    ] },
    { harf: 'E', ad: 'Bernoulli İlkesi', renk: '#c792ff', dersler: [
    ] },
  ],
});
