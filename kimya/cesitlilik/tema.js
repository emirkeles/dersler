/* Biçim: ortak/katalog.js başındaki açıklama. Her kısa ders yazıldıkça konusuna bir satır eklenir.
   Satırın beşinci öğesini (yaklaşık süre, saniye) elle yazma; node araclar/sure.js kimya/cesitlilik ekler.
   13 konu, 6 renkli palet: renkler sırayla döner, komşu konular farklı renktedir. */
KATALOG.tema('kimya', 'cesitlilik', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Atomları bir arada tutan ne, molekülleri birbirine çeken ne? Bu temada bağlardan başlayıp katıların ve sıvıların özelliklerine varıyoruz.',
  konular: [
    { harf: 'A', ad: 'Metalik bağ', renk: '#f5b04c', dersler: [
      ['a1-itme-ve-cekme.html', 'İki atom yaklaşınca: itme ve çekme', 'Demir bir çubuğun atomlarını o uzaklıkta tutan ne?', 4, 342],
      ['a2-metalik-bag.html', 'Metalik bağ: artı iyonlar ve elektron denizi', 'Bir bakır telin içinde sayısız atomu birbirine ne bağlar?', 5, 461],
      ['a3-tekrar.html', 'Konu tekrarı: Metalik bağ', 'İki dersin kuralları aklında mı?', 1, 225],
    ] },
    { harf: 'B', ad: 'İyonik bağ', renk: '#3ddc97', dersler: [
      ['b1-katyon-anyon.html', 'Metal ametalle buluşunca: katyon ve anyon', 'Sofradaki tuz bir metal ile bir ametalden oluşur; ikisi karşılaştığında atomlarına ne olur?', 8, 659],
      ['b2-iyonik-bag.html', 'İyonik bağ: zıt yüklü iyonların çekimi', 'Bir tuzun nasıl oluştuğunu gördün; başka bir metal ve ametal için sonucu görmeden söyleyebilir misin?', 7, 737],
      ['b3-iyonlardan-formule.html', 'İyonlardan formüle', 'Bir ambalajın içindekiler listesindeki bileşiğin formülünü, iyonlarını bilerek kendin yazabilir misin?', 8, 685],
      ['b4-tekrar.html', 'Konu tekrarı: İyonik bağ', 'Üç dersin kuralları aklında mı?', 1, 278],
    ] },
    { harf: 'C', ad: 'Kovalent bağ', renk: '#c792ff', dersler: [
      ['c1-elektronlar-ortak-kullanilir.html', 'İki ametal yaklaşınca: elektronlar ortak kullanılır', 'Su molekülünde hiçbir atom elektron verip iyon olmuyorsa atomları bir arada tutan ne?', 7, 714],
      ['c2-gorunmeyeni-tahmin-et.html', 'Görünmeyeni tahmin et: çekirdekler ortak elektronları çeker', 'Elektronların iki atomun arasına yerleştiğini gördün; onları orada tutan kuvveti görebildin mi?', 6, 662],
      ['c3-tekrar.html', 'Konu tekrarı: Kovalent bağ', 'İki dersin kuralları aklında mı?', 1, 266],
    ] },
    { harf: 'D', ad: 'Lewis nokta yapısı', renk: '#3cc8e8', dersler: [
      ['d1-lewis-nokta-yapisi.html', 'Lewis nokta yapısı: valans elektronları noktalarla', 'Bir kimyacı, molekülde hangi elektronların bağ yaptığını kâğıt üstünde birkaç noktayla nasıl gösterir?', 7, 722],
      ['d2-oktet-dublet.html', 'Oktet ve dublet: Lewis yapısını kur', 'Su molekülünde oksijen neden tam iki hidrojenle bağ yapar, bir ya da üç değil?', 8, 629],
      ['d3-ortaklanmamis-cift.html', 'Ortaklanmamış çift molekülü biçimlendirir', 'Su molekülü neden düz bir çizgi gibi değil de kırık bir V gibi durur?', 6, 442],
      ['d4-tekrar.html', 'Konu tekrarı: Lewis nokta yapısı', 'Üç dersin kuralları aklında mı?', 1, 253],
    ] },
    { harf: 'E', ad: 'Molekül polarlığı', renk: '#6ea8ff', dersler: [
      ['e1-elektronegatiflik-farki.html', 'Elektronegatiflik farkı: elektronlar eşit paylaşılmaz', 'İki kişi bir halatı çekerken güçlü olan halatı kendine kaydırır; atomlar ortak elektronları hep eşit mi çeker?', 5, 524],
      ['e2-polar-mi-apolar-mi.html', 'Polar mı, apolar mı: molekülün bütününe bak', 'Bağlarının hepsi polar olan bir molekül, bütün olarak apolar olabilir mi?', 7, 831],
      ['e3-tekrar.html', 'Konu tekrarı: Molekül polarlığı', 'İki dersin kuralları aklında mı?', 1, 297],
    ] },
    { harf: 'F', ad: 'Bileşiklerin adlandırılması', renk: '#ff8a5b', dersler: [
      ['f1-iyonik-bilesik-adi.html', 'İyonik bileşiğin adı: katyonun adı, anyonun adı', 'Bir bileşiğin adını ilk kez duyuyorsun; yalnızca adından formülünü çıkarabilir misin?', 7, 659],
      ['f2-romen-rakami.html', 'Birden fazla katyonu olan metaller: ad yükü söyler', 'Demirin klorla iki ayrı bileşiği var; ikisine de “demir klorür” denirse hangisi olduğu nasıl anlaşılır?', 7, 610],
      ['f3-on-ekler.html', 'Kovalent bileşiğin adı: ön ekler atomları sayar', 'Karbon monoksit ile karbon dioksit arasındaki tek hecelik fark neyi anlatır?', 10, 956],
      ['f4-tekrar.html', 'Konu tekrarı: Bileşiklerin adlandırılması', 'Üç dersin kuralları aklında mı?', 1, 257],
    ] },
    { harf: 'G', ad: 'Moleküller arası etkileşimler', renk: '#f5b04c', dersler: [
      ['g1-tanecikler-arasi-etkilesim.html', 'Tanecikler arası etkileşim: kim kiminle?', 'Gecko kertenkelesi dik ve düz bir yüzeyde yapıştırıcı olmadan nasıl yürür?', 6, 527],
      ['g2-dipol-dipol-iyon-dipol.html', 'Dipol-dipol ve iyon-dipol', 'Bir ucu artı, bir ucu eksi olan iki molekül yan yana gelince birbirine hangi uçlarıyla döner?', 6, 540],
      ['g3-induklenmis-dipol.html', 'İndüklenmiş dipol: apolar tanecikler de etkileşir', 'Soy gaz atomlarının artı ya da eksi ucu yok; yine de birbirlerini çekebilirler mi?', 7, 686],
      ['g4-hidrojen-bagi.html', 'Hidrojen bağı', 'DNA’nın iki zincirini bir fermuar gibi bir arada tutan ne?', 6, 672],
      ['g5-tekrar.html', 'Konu tekrarı: Moleküller arası etkileşimler', 'Dört dersin kuralları aklında mı?', 1, 292],
    ] },
    { harf: 'H', ad: 'Katılar', renk: '#3ddc97', dersler: [
      ['h1-kristal-amorf.html', 'Kristal katı, amorf katı', 'Kar tanesi, elmas ve cam birer katı; tanecikleri aynı biçimde mi dizilir?', 7, 540],
      ['h2-katinin-ozelligi.html', 'Katının özelliğini etkileşim belirler', 'Buz 0 °C’ta erir, sofra tuzu 801 °C’ta; ikisi de kristal katı. Fark nereden gelir?', 10, 888],
      ['h3-tekrar.html', 'Konu tekrarı: Katılar', 'İki dersin kuralları aklında mı?', 1, 266],
    ] },
    { harf: 'I', ad: 'Buhar basıncı', renk: '#c792ff', dersler: [
      ['i1-buhar-basinci.html', 'Buhar basıncı nedir?', 'Eline dökülen alkol birkaç saniyede uçar, su kalır; neden?', 8, 607],
      ['i2-faktorler.html', 'Buhar basıncını ne etkiler: değişkeni tek tek sına', 'Buhar basıncını neyin değiştirdiğini bulmak istiyorsun; bir denemede kaç şeyi birden değiştirebilirsin?', 9, 698],
      ['i3-tekrar.html', 'Konu tekrarı: Buhar basıncı', 'İki dersin kuralları aklında mı?', 1, 248],
    ] },
    { harf: 'J', ad: 'Kaynama sıcaklığı', renk: '#3cc8e8', dersler: [
      ['j1-kaynama-dis-basinc.html', 'Kaynama: buhar basıncı dış basınca eşitlenince', 'Yüksek bir dağın tepesinde çay suyu da 100 °C’ta mı kaynar?', 7, 613],
      ['j2-kaynama-etkilesim-turu.html', 'Kaynama noktası ve etkileşim türü: hidrojen bağının etkisi', 'Aynı ocakta, aynı mutfakta su ile etil alkol neden farklı sıcaklıkta kaynar?', 8, 970],
      ['j3-tekrar.html', 'Konu tekrarı: Kaynama sıcaklığı', 'İki dersin kuralları aklında mı?', 1, 240],
    ] },
    { harf: 'K', ad: 'Viskozite', renk: '#6ea8ff', dersler: [
      ['k1-viskozite.html', 'Viskozite: akmaya karşı direnç', 'Bal kavanozdan neden sudan çok daha yavaş akar?', 8, 677],
      ['k2-sicaklik-viskozite.html', 'Sıcaklık ve viskozite: ısınınca sıvı daha kolay akar', 'Buzdolabından çıkan bal ile ılık bal kaşıktan aynı hızda mı akar?', 8, 848],
      ['k3-tekrar.html', 'Konu tekrarı: Viskozite', 'İki dersin kuralları aklında mı?', 1, 265],
    ] },
    { harf: 'L', ad: 'Adezyon ve kohezyon', renk: '#ff8a5b', dersler: [
      ['l1-kohezyon-adezyon.html', 'Kohezyon ve adezyon: ıslatır mı, ıslatmaz mı?', 'Yağmurluk ıslanmaz, pamuklu tişört ıslanır; fark suda mı, kumaşta mı?', 8, 633],
      ['l2-yuzey-gerilimi-kilcallik.html', 'Yüzey gerilimi ve kılcallık', 'Bir böcek suyun üzerinde batmadan nasıl durur?', 8, 657],
      ['l3-tekrar.html', 'Konu tekrarı: Adezyon ve kohezyon', 'İki dersin kuralları aklında mı?', 1, 249],
    ] },
    { harf: 'M', ad: 'Yüzey gerilimi', renk: '#f5b04c', dersler: [
      ['m1-yuzey-gerilimi-sicaklik.html', 'Yüzey gerilimi ve sıcaklık: soruyu kur, sına', 'Suyu ısıtırsan yüzeyi daha mı gergin olur, daha mı gevşek?', 9, 687],
      ['m2-cozunen-madde-gunluk-hayat.html', 'Çözünen madde ve günlük hayat', 'Suya bir madde çözersen yüzeyi aynı gerginlikte kalır mı?', 9, 642],
      ['m3-tekrar.html', 'Konu tekrarı: Yüzey gerilimi', 'İki dersin kuralları aklında mı?', 1, 228],
    ] },
  ],
});
