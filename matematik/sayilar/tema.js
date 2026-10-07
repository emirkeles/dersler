/* Sayılar temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama. */
KATALOG.tema('matematik', 'sayilar', {
  tanitim: 'Kuralı ezberleme, nereden geldiğini gör. Her kısa ders bir soruyla başlar; önce sen tahmin edersin, sonra tahtada birlikte bakarız.',
  konular: [
    { harf: 'A', ad: 'Üslü ve köklü gösterimler', renk: '#f5b04c', dersler: [
      ['a1-us-bir-sayactir.html', 'Üs bir sayaçtır', 'Bir video 10 turda neden 1024 kişiye ulaşır?', 5],
      ['a2-geri-sar.html', 'Geri sar: sıfır ve negatif üs', 'Videoyu başlangıcın da gerisine sararsak ne olur?', 2],
      ['a3-kok-yarim-us.html', 'Kök = yarım üs', 'Yolculuğun tam ortasında kaç kişi vardı?', 2],
      ['a4-koklerle-islem.html', 'Köklerle işlem', '√9 + √16 ile √(9+16) aynı mı?', 4],
      ['a5-rasyonel-us.html', 'Rasyonel üs ve n. kök', 'Yolu üçe bölersek ilk parçanın sonunda kaç kişi vardı?', 4],
      ['a6-eslenik.html', 'Eşlenik', 'Paydada √3 − 1 varsa kökten nasıl kurtuluruz?', 4],
      ['a7-bilimsel-gosterim.html', 'Bilimsel gösterim', '150 000 000 km. Bu sıfırları her seferinde yazacak mıyız?', 3],
      ['a8-yaklasik-deger.html', 'Yaklaşık değer', 'Alanı 1000 m² olan kare tarlanın kenarı kaç metre?', 4],
    ] },
    { harf: 'B', ad: 'Aralıklar ve kümeler', renk: '#3ddc97', dersler: [
      ['b1-kume-dili.html', 'Küme dili', 'Beğendiğin şarkıyı bir kez daha beğenirsen liste uzar mı?', 5],
      ['b2-dolu-nokta-bos-nokta.html', 'Dolu nokta, boş nokta', 'Kapıda “140 cm ve üzeri” yazıyor. Tam 140 olan biner mi?', 4],
      ['b3-parantez-dili.html', 'Parantez dili ve sonsuz', 'Bir aralık iki sayı ve iki parantezle nasıl yazılır?', 3],
      ['b4-dort-dil-tek-kume.html', 'Dört dil, tek küme', 'ℝ yerine ℤ yazarsak aynı küme mi kalır?', 3],
      ['b5-kesisim-ve-birlesim.html', 'Kesişim ve birleşim', 'İki oyuncağa da binebilenler kimler?', 4],
      ['b6-fark-ve-tumleme.html', 'Fark ve tümleme', 'Hız trenine binip çarpışan arabaya binemeyenler kimler?', 5],
      ['b7-mutlak-degerle-aralik.html', 'Mutlak değerle aralık', 'Boyunu 165 cm diye tahmin eden görevli hangi boylarda kazanır?', 4],
    ] },
    { harf: 'C', ad: 'Sayı kümeleri', renk: '#c792ff', dersler: [
      ['c1-her-kutu-bir-ihtiyac.html', 'Her kutu bir ihtiyaçtan doğdu', '3 − 5’in cevabı mı yok, yoksa cevabın konacağı kutu mu?', 5],
      ['c2-ondalik-acilim.html', 'Ondalık açılımın adresi', '0,333… hiç bitmiyor. Bitmeyen bir sayı hâlâ kesir midir?', 4],
      ['c3-sayi-dogrusundaki-delik.html', 'Sayı doğrusundaki delik', 'Karenin köşegenini ölçebilirsin. Peki kesir olarak yazabilir misin?', 4],
      ['c4-siralama-ve-arada-olma.html', 'Sıralama ve arada olma', '3’ten sonraki tam sayı 4. Peki 0,5’ten sonraki sayı hangisi?', 4],
      ['c5-ispat-mi-karsi-ornek-mi.html', 'İspat mı, karşı örnek mi?', 'Kaç örnek “her zaman” demeye yeter?', 3],
    ] },
    { harf: 'D', ad: 'İşlem özellikleri ve cebir', renk: '#3cc8e8', dersler: [
      ['d1-onerme.html', 'Önerme: doğru ya da yanlış', '“Her asal sayı tektir.” Yanlış çıkarmak için kaç sayı gerekir?', 5],
      ['d2-ve-veya-ya-da.html', 'Ve, veya, ya da', '6 için “çift veya 3’ün katı” demek doğru olur mu?', 5],
      ['d3-ise-ancak-ve-ancak.html', 'İse, ancak ve ancak', '“x > 5 ise x > 3” doğru. Tersi de doğru mu?', 4],
      ['d4-degisme-ve-birlesme.html', 'Değişme ve birleşme', '17 + 28 + 12: kasiyer önce hangi ikisini toplar?', 5],
      ['d5-dagilma.html', 'Dağılma', 'Kasiyer 7 × 98’i hesap makinesinden önce nasıl buluyor?', 5],
      ['d6-birim-ters-yutan.html', 'Birim, ters, yutan', 'Hangi sayıya basarsan hesap makinesinin ekranı değişmez?', 5],
      ['d7-ozdeslikler.html', 'Özdeşlikler', '(3 + 4)² ile 3² + 4² eşit mi?', 4],
      ['d8-carpanlara-ayirma.html', 'Çarpanlara ayırma ve sıfır çarpım', 'Kasiyer 51 × 49’u zihinden nasıl söylüyor?', 4],
    ] },
  ],
  // Hikâye videoları dersin son sahnesinde de oynar; burada tek tek yeniden izlenebilir.
  hikayeler: [
    { kod: 'A8', ders: 'Yaklaşık değer', ad: 'Bir dönüm tarla, kaç metre çit?', video: 'hikaye/a8-tarla-cit/renders/sesli-taslak.mp4' },
    { kod: 'B7', ders: 'Mutlak değerle aralık', ad: 'Kombi 22 derecede', video: 'hikaye/b7-kombi-22/renders/b7-kombi-22.mp4' },
  ]
});
