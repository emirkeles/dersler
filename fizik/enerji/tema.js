/* Enerji temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama.
   Her kısa ders yazıldıkça konusuna bir satır eklenir; beşinci öğeyi (süre, saniye) araclar/sure.js yazar. */
KATALOG.tema('fizik', 'enerji', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Hava durumunda “ısı 30 derece” demek neden yanlış, kum ayağını yakarken deniz neden serin, buz erirken termometre neden yerinde sayar, metal kaşık neden önce ısınır? Bu temada ısı, sıcaklık ve iç enerjiden ısının hesabına, hâl değişimine, ısıl dengeye, ısının üç yoluna ve yalıtıma gidiyoruz.',
  konular: [
    { harf: 'A', ad: 'İç enerji, ısı, sıcaklık', renk: '#f5b04c', dersler: [
      ['a1-isi-sicaklik-ic-enerji.html', 'Isı, sıcaklık, iç enerji: üç ayrı şey', 'Hava durumu sunucusu “yarın ısı 30 derece olacak” dedi; bu cümlede yanlış olan ne?', 6, 553],
      ['a2-ic-enerji-isiyla-degisir.html', 'İç enerji ısıyla değişir, sıcaklıkla izlenir', 'Bir fincan sıcak çay mı, yoksa ılık suyla dolu bir küvet mi daha çok iç enerji taşır?', 7, 509],
      ['a3-tekrar.html', 'Konu tekrarı: İç enerji, ısı, sıcaklık', 'Üç kavramın kuralları aklında mı?', 1, 262],
    ] },
    { harf: 'B', ad: 'Isının hesabı', renk: '#ff8a5b', dersler: [
      ['b1-uc-olcek-tek-sicaklik.html', 'Üç ölçek, tek sıcaklık', 'Bir yabancı dizide hava “70 derece” deniyor ve herkes tişörtle geziyor; nasıl olur?', 8, 631],
      ['b2-oz-isi-ve-isi-sigasi.html', 'Öz ısı ve ısı sığası', 'Yaz günü öğlen kumsalda kum ayağını yakarken deniz neden hâlâ serin?', 8, 575],
      ['b3-deneyle-modele.html', 'Deneyle modele: ısı, kütle, madde, sıcaklık farkı', 'Aynı ocakta bir bardak su mu, bir tencere su mu önce kaynar; peki iki katı su iki katı süre mi ister?', 8, 659],
      ['b4-modelle-hesap.html', 'Modelle hesap', 'Bir bardak çay suyunu kaynatmak için ne kadar ısı gerekir; bardak iki katına çıkarsa?', 7, 515],
      ['b5-tekrar.html', 'Konu tekrarı: Isının hesabı', 'Isının hesabındaki kurallar aklında mı?', 1, 260],
    ] },
    { harf: 'C', ad: 'Hâl değişimi', renk: '#3cc8e8', dersler: [
      ['c1-erimeyi-ne-belirler.html', 'Erimeyi ne belirler?', 'Bir buz küpü dakikalar içinde erir; aynı güneşin altındaki buzul neden yıllarca dayanır?', 9, 630],
      ['c2-sicaklik-yerinde-sayiyor.html', 'Isı veriyorsun, sıcaklık yerinde sayıyor', 'İçinde buz olan suyu ocağa koydun; buz bitene kadar termometre ne gösterir?', 8, 544],
      ['c3-hal-degisimi-icin-isi.html', 'Hâl değişimi için gereken ısı', '0 °C’taki 1 kilogram buzu eritmek ile 2 kilogram buzu eritmek arasında ısı bakımından ne fark var?', 10, 615],
      ['c4-tekrar.html', 'Konu tekrarı: Hâl değişimi', 'Hâl değişiminin kuralları aklında mı?', 1, 290],
    ] },
    { harf: 'D', ad: 'Isıl denge', renk: '#3ddc97', dersler: [
      ['d1-sicak-su-nereye-kadar-sogur.html', 'Sıcak su nereye kadar soğur?', 'Masada unuttuğun sıcak çay bir saat sonra kaç derece olur; daha da soğur mu?', 8, 672],
      ['d2-son-sicaklik-nerede-durur.html', 'Son sıcaklık nerede durur?', 'Bir bardak sıcak suya bir kaşık soğuk su katmakla bir bardak soğuk su katmak aynı sonucu verir mi?', 8, 736],
      ['d3-tekrar.html', 'Konu tekrarı: Isıl denge', 'Isıl dengenin kuralları aklında mı?', 1, 262],
    ] },
    { harf: 'E', ad: 'Isı aktarım yolları', renk: '#6ea8ff', dersler: [
      ['e1-isi-neyin-icinden-gecer.html', 'Isı neyin içinden geçer?', 'Güneş ile Dünya arasında hava yok; Güneş’ten gelen ısı neyin içinden geçiyor?', 7, 643],
      ['e2-uc-yol-uc-ad.html', 'Üç yol, üç ad', 'Havası boşaltılmış bir odada elektrikli ısıtıcı odayı ısıtır mı; kalorifer peteği ısıtır mı?', 12, 924],
      ['e3-tekrar.html', 'Konu tekrarı: Isı aktarım yolları', 'Isının üç yolunun kuralları aklında mı?', 1, 254],
    ] },
    { harf: 'F', ad: 'Isı iletim hızı ve yalıtım', renk: '#c792ff', dersler: [
      ['f1-metal-kasik-neden-once-isinir.html', 'Metal kaşık neden önce ısınır?', 'Aynı tencerede duran tahta kaşığı tutabiliyorsun, metal kaşığı tutamıyorsun; ikisi de aynı yemeğin içinde değil mi?', 9, 770],
      ['f2-yalitim.html', 'Yalıtım: ısıyı yavaşlatmak', 'Mimar olsaydın, yazı çok sıcak geçen bir şehirde faturası düşük gelen bir evi nasıl tasarlardın?', 9, 823],
      ['f3-tekrar.html', 'Konu tekrarı: Isı iletim hızı ve yalıtım', 'Isı iletim hızının kuralları aklında mı?', 1, 272],
    ] },
  ],
});
