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
      ['b1-derine-dalmak.html', 'Derine dalmak neden zor?', 'Serbest dalışta rekor deneyen bir sporcu indikçe kulaklarındaki baskı neden artar?', 7, 530],
      ['b2-durgun-sivi-basinci.html', 'Deneyle modele: durgun sıvının basıncı', 'Baraj duvarları neden aşağıya doğru kalınlaşır?', 11, 713],
      ['b3-sivi-basinciyla-calisan-sistemler.html', 'Sıvı basıncıyla çalışan sistemler', 'Oto tamircisi tek eliyle bir kola bastırıp koca bir arabayı nasıl kaldırır?', 7, 481],
      ['b4-merak-et-sor-dogrula.html', 'Merak et, sor, doğrula', 'İnternette “hidrolik fren asla bozulmaz” diye bir yazı gördün; doğru olduğunu nasıl anlarsın?', 9, 735],
      ['b5-tekrar.html', 'Konu tekrarı: Sıvılarda basınç', 'Dört dersin kuralları aklında mı?', 1, 317],
    ] },
    { harf: 'C', ad: 'Açık hava basıncı', renk: '#6ea8ff', dersler: [
      ['c1-hava-da-bir-akiskandir.html', 'Hava da bir akışkandır', 'Dağa çıkan bir otobüste kulakların neden tıkanır?', 7, 562],
      ['c2-torricelli.html', 'Torricelli havayı nasıl tarttı?', 'Cıva dolu bir cam boruyu ters çevirip kaba daldırınca cıva neden hepsi boşalmaz?', 7, 450],
      ['c3-atmosfer-basinci-degisir.html', 'Atmosfer basıncı her yerde aynı değil', 'Hava durumu haritasındaki “alçak basınç” yazısı yarın rüzgâr çıkacağını nasıl haber verir?', 10, 636],
      ['c4-tekrar.html', 'Konu tekrarı: Açık hava basıncı', 'Üç dersin kuralları aklında mı?', 1, 252],
    ] },
    { harf: 'D', ad: 'Kaldırma kuvveti', renk: '#3ddc97', dersler: [
      ['d1-kaldirma-kuvveti-deneyi.html', 'Kaldırma kuvveti neye bağlı? Deneyi kur', 'Denizde bir arkadaşını kucağına almak karadakinden neden çok daha kolaydır?', 10, 682],
      ['d2-arsimet-ilkesi.html', 'Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır', 'Ağzına kadar dolu küvete girince taşan su ile hafiflemen arasında bir bağ var mı?', 10, 578],
      ['d3-kaldirma-kuvveti-nereden-gelir.html', 'Kaldırma kuvveti nereden gelir?', 'Suya batırdığın topu alttan yukarı iten şey nedir?', 10, 543],
      ['d4-gemi-denizalti-cop-adasi.html', 'Gemi, denizaltı, çöp adası', 'Çelik bir çivi batarken binlerce ton çelikten yapılmış gemi nasıl yüzer?', 10, 859],
      ['d5-olcumu-ilkeyle-sina.html', 'Ölçümü de önermeyi de ilkeyle sına', 'Bir ölçümün hatalı olduğunu, deneyi yeniden yapmadan anlayabilir misin?', 7, 533],
      ['d6-tekrar.html', 'Konu tekrarı: Kaldırma kuvveti', 'Beş dersin kuralları aklında mı?', 1, 329],
    ] },
    { harf: 'E', ad: 'Bernoulli İlkesi', renk: '#c792ff', dersler: [
      ['e1-dar-yerde-hizli.html', 'Dar yerde hızlı, hızlı yerde düşük basınç', 'Bahçe hortumunun ucunu parmağınla sıkınca su neden daha uzağa fışkırır?', 11, 838],
      ['e2-bernoulli-her-yerde.html', 'Bernoulli her yerde', 'Fırtınada bir çatı aşağı bastırılmak yerine neden yukarı doğru kalkıp uçar?', 10, 596],
      ['e3-tekrar.html', 'Konu tekrarı: Bernoulli İlkesi', 'İki dersin kuralları aklında mı?', 1, 264],
    ] },
  ],
});
