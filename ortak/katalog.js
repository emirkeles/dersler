/* Sitenin ders kataloğu: Ders → Ünite → Konu → Kısa ders.

   Bu dosya yalnızca dersleri ve ünitelerin sırasını tutar. Her ünitenin kısa dersleri kendi klasöründeki
   unite.js dosyasındadır (<ders>/<ünite>/unite.js) ve KATALOG.unite(...) ile kaydolur; böylece üniteler
   birbirinin dosyasına dokunmadan, paralel yazılabilir.

   Yayına alma: ünite hazır olunca aşağıdaki satırına `yayinda: true` eklenir. Ana sayfa yalnızca yayındaki
   ünitelerin unite.js dosyasını yükler; ötekiler "Hazırlanan üniteler" listesinde görünür. Ünitenin kendi
   sayfası (<ders>/<ünite>/index.html) yayında olmasa da çalışır, önizleme için açılabilir.

   unite.js biçimi:
     KATALOG.unite('<ders kimliği>', '<ünite kimliği>', {
       tanitim: 'ünite sayfasının başındaki bir iki cümle',
       konular: [ { harf: 'A', ad: 'Konu adı', renk: '#f5b04c', dersler: [
         ['a1-dosya-adi.html', 'Başlık', 'Açılış sorusu', sahneSayisi], … ] }, … ],
       hikayeler: [ { kod: 'A8', ders: 'Dersin başlığı', ad: 'Hikâyenin adı', video: 'hikaye/…mp4' } ],   // isteğe bağlı
     });
   Kısa dersin kimliği <ünite kimliği>-<dosyanın kodu> olur (sayilar-a1) ve dersin kendi `id` alanıyla aynı
   olmalıdır; ilerleme tarayıcıda 'ders:<kimlik>' anahtarıyla durur. Yayındaki ünitenin kimliği ve ders kodları
   değiştirilmez. Sahne sayısı dersin kendi sahneleridir (çıkış soruları ve özet hariç).
   Denetim: node araclar/denetle.js <ders>/<ünite> */
window.KATALOG = {
  sinif: '9. Sınıf',
  dersler: [
    { id: 'matematik', ad: 'Matematik', simge: '√x', uniteler: [
      { id: 'sayilar', ad: 'Sayılar', yayinda: true },
      { id: 'nicelikler-ve-degisimler', ad: 'Nicelikler ve Değişimler' },
      { id: 'geometrik-sekiller', ad: 'Geometrik Şekiller' },
      { id: 'eslik-ve-benzerlik', ad: 'Eşlik ve Benzerlik' },
      { id: 'algoritma-ve-bilisim', ad: 'Algoritma ve Bilişim' },
      { id: 'istatistiksel-arastirma-sureci', ad: 'İstatistiksel Araştırma Süreci' },
      { id: 'veriden-olasiliga', ad: 'Veriden Olasılığa' },
    ] },
  ],
  /* Ünitenin unite.js dosyası bunu çağırır. */
  unite(dersId, uniteId, veri) {
    const ders = this.dersler.find((d) => d.id === dersId);
    const u = ders && ders.uniteler.find((x) => x.id === uniteId);
    if (!u) throw new Error('Katalogda böyle bir ünite yok: ' + dersId + '/' + uniteId + ' (ortak/katalog.js)');
    Object.assign(u, veri, { yol: dersId + '/' + uniteId + '/' });
  },
};
