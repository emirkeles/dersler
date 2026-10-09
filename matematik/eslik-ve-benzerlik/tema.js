/* Eşlik ve Benzerlik temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama.
   Her kısa ders yazıldıkça konusuna bir satır eklenir; beşinci öğeyi (süre, saniye) araclar/sure.js yazar. */
KATALOG.tema('matematik', 'eslik-ve-benzerlik', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Bir şekli kaydırınca, çevirince ya da aynada görünce ne değişir, ne aynı kalır? Bu temada dönüşümlerden eş ve benzer üçgenlere, oradan Tales, Öklid ve Pisagor teoremlerinin ispatına gidiyoruz.',
  konular: [
    { harf: 'A', ad: 'Geometrik dönüşümler', renk: '#6ea8ff', dersler: [
      ['a1-yansima-ve-oteleme.html', 'Yansıma ve öteleme: yer değişir, ölçü değişmez', 'Bir kilimde aynı motif hem yan yana hem ayna gibi ters durur; ikisi de aynı motif midir?', 5, 430],
    ] },
    { harf: 'B', ad: 'Eşlik ve benzerlik koşulları', renk: '#3ddc97', dersler: [] },
    { harf: 'C', ad: 'Benzer üçgenler oluşturma', renk: '#f5b04c', dersler: [] },
    { harf: 'D', ad: 'Tales, Öklid ve Pisagor teoremleri', renk: '#c792ff', dersler: [] },
    { harf: 'E', ad: 'Eşlik ve benzerlik problemleri', renk: '#ff8a5b', dersler: [] },
  ],
});
