/* Eşlik ve Benzerlik temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama.
   Her kısa ders yazıldıkça konusuna bir satır eklenir; beşinci öğeyi (süre, saniye) araclar/sure.js yazar. */
KATALOG.tema('matematik', 'eslik-ve-benzerlik', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Bir şekli kaydırınca, çevirince ya da aynada görünce ne değişir, ne aynı kalır? Bu temada dönüşümlerden eş ve benzer üçgenlere, oradan Tales, Öklid ve Pisagor teoremlerinin ispatına gidiyoruz.',
  konular: [
    { harf: 'A', ad: 'Geometrik dönüşümler', renk: '#6ea8ff', dersler: [
      ['a1-yansima-ve-oteleme.html', 'Yansıma ve öteleme: yer değişir, ölçü değişmez', 'Bir kilimde aynı motif hem yan yana hem ayna gibi ters durur; ikisi de aynı motif midir?', 5, 430],
      ['a2-donme.html', 'Dönme: merkez ve açı', 'Bir rüzgârgülü dönerken kanatları yer değiştirir; kanadın biçimi bozulur mu?', 5, 427],
      ['a3-oteleme-iki-yansima.html', 'Öteleme, iki yansımadır', 'Karşılıklı iki aynanın arasında durunca ikinci görüntün neden sana ters değil, düz bakar?', 5, 412],
      ['a4-donme-iki-yansima.html', 'Dönme, iki yansımadır', 'Kesişen iki aynadan yapılmış bir kaleydoskopta görüntüler neden bir nokta çevresinde dizilir?', 6, 452],
      ['a5-suslemede-donusumler.html', 'Süslemede dönüşümler', 'Bir kilimin bütün deseni tek bir motiften çıkabilir mi?', 6, 504],
      ['a6-tekrar.html', 'Konu tekrarı: Geometrik dönüşümler', 'Beş dersin kuralları aklında mı?', 1, 236],
    ] },
    { harf: 'B', ad: 'Eşlik ve benzerlik koşulları', renk: '#3ddc97', dersler: [
      ['b1-es-ucgenler.html', 'Eş üçgenler: dönüşümle çakışan üçgenler', 'Bir çini panodaki üçgenlerin hepsi aynı kalıptan mı çıkmıştır?', 7, 633],
      ['b2-eslik-kosullari.html', 'Eşlik için en az ne gerekir?', 'Bir marangoza üçgen bir rafın yalnızca üç kenar uzunluğunu söylesen aynı rafı yapabilir mi?', 7, 713],
      ['b3-benzer-ucgenler.html', 'Benzer üçgenler: açılar eşit, kenarlar orantılı', 'Bir binanın maketi neden gerçeğiyle aynı biçimde görünür?', 6, 485],
      ['b4-aci-aci.html', 'Açı-Açı: iki açı yeter', 'Aynı anda, yan yana duran bir direk ile bir çocuğun gölge üçgenleri neden aynı biçimdedir?', 5, 391],
      ['b5-kenarlarla-benzerlik.html', 'Kenarlarla benzerlik', 'Bir resmi yalnızca yatayda iki katına çıkarırsan şekil aynı kalır mı?', 7, 609],
      ['b6-tekrar.html', 'Konu tekrarı: Eşlik ve benzerlik koşulları', 'Beş dersin kuralları aklında mı?', 1, 285],
    ] },
    { harf: 'C', ad: 'Benzer üçgenler oluşturma', renk: '#f5b04c', dersler: [
      ['c1-ayni-oranda-bol.html', 'İki kenarı aynı oranda böl', 'Üçgen bir havuzu tek bir düz bölmeyle ayırıp aynı biçimde küçük bir havuz elde edebilir misin?', 5, 539],
      ['c2-kenara-paralel.html', 'Kenara paralel çiz', 'Bir çatı makasına kirişe paralel bir ara çubuk takılınca üstte kalan küçük üçgen çatıya benzer mi?', 7, 536],
      ['c3-yukseklik-uc-benzer-ucgen.html', 'Dik köşeden inen yükseklik üç benzer üçgen verir', 'Bir gönyeyi dik köşesinden karşı kenara dik bir çizgiyle kesersen çıkan iki parça gönyeyle aynı biçimde midir?', 5, 448],
      ['c4-tekrar.html', 'Konu tekrarı: Benzer üçgenler oluşturma', 'Üç dersin kuralları aklında mı?', 1, 272],
    ] },
    { harf: 'D', ad: 'Tales, Öklid ve Pisagor teoremleri', renk: '#c792ff', dersler: [
      ['d1-temel-oranti.html', 'Üçgende paralel doğru kenarları aynı oranda böler', 'Üçgen bir arsayı bir kenarına paralel bir çitle bölersen öbür iki kenar hangi oranda bölünür?', 6, 449],
      ['d2-tales.html', 'Tales teoremi: paraleller ve kesenler', 'Üç paralel sokağı iki cadde kesiyor; bloklar neden aynı oranda dizilir?', 10, 543],
      ['d3-oklid-yukseklik.html', 'Öklid teoremi: yüksekliğin karesi', 'Dik köşeden inen patikanın boyu, kenarı bölen iki parçadan bulunabilir mi?', 8, 428],
      ['d4-oklid-dik-kenar.html', 'Öklid teoremi: dik kenarın karesi', 'Dik üçgen bir tarlanın bir kenarını, karşı kenarı ölçmeden bulabilir misin?', 8, 430],
      ['d5-pisagor-ispati.html', 'Pisagor teoreminin ispatı', 'Duvara dayalı bir merdivenin boyu, yüksekliği ve duvara uzaklığı arasında neden hep aynı bağ vardır?', 8, 483],
      ['d6-dar-ve-genis-aci.html', 'Açı dik değilse: dar ve geniş açılı üçgenler', 'Bir makasın kollarını açtıkça uçları arasındaki uzaklık nasıl değişir?', 5, 363],
      ['d7-tekrar.html', 'Konu tekrarı: Tales, Öklid ve Pisagor teoremleri', 'Altı dersin kuralları aklında mı?', 1, 281],
    ] },
    { harf: 'E', ad: 'Eşlik ve benzerlik problemleri', renk: '#ff8a5b', dersler: [
      ['e1-sekle-dok.html', 'Çözmeden önce şekle dök', 'Bir tepenin yüksekliğini tırmanmadan, yere koyduğun bir aynayla bulabilir misin?', 7, 628],
      ['e2-strateji.html', 'Strateji kur, uygula, kontrol et', 'Aynı şekilde hem Pisagor hem benzerlik kullanılabiliyorsa hangisinden başlarsın?', 8, 625],
      ['e3-kisa-yol-cikmaz-yol.html', 'Kısa yol ve çıkmaz yol', 'Arkadaşın aynı problemi başka yoldan çözdü; hangisi daha kısa, hangi deneme hiç sonuca varmaz?', 7, 503],
      ['e4-yol-baska-nerede.html', 'Bu yol başka nerede işe yarar?', 'Bir problemde işe yarayan yol, başka hangi problemlerde de işe yarar?', 6, 490],
    ] },
  ],
});
