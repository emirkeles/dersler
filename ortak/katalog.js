/* Sitenin ders kataloğu: Ders → Tema → Konu → Kısa ders.

   Bu dosya yalnızca dersleri ve temaların sırasını tutar. Her temanın kısa dersleri kendi klasöründeki
   tema.js dosyasındadır (<ders>/<tema>/tema.js) ve KATALOG.tema(...) ile kaydolur; böylece temalar
   birbirinin dosyasına dokunmadan, paralel yazılabilir.

   Yayına alma: tema hazır olunca aşağıdaki satırına `yayinda: true` eklenir. Ana sayfa yalnızca yayındaki
   temaların tema.js dosyasını yükler; ötekiler "Hazırlanan temalar" listesinde görünür. Temanın kendi
   sayfası (<ders>/<tema>/index.html) yayında olmasa da çalışır, önizleme için açılabilir.

   tema.js biçimi:
     KATALOG.tema('<ders kimliği>', '<tema kimliği>', {
       tanitim: 'tema sayfasının başındaki bir iki cümle',
       konular: [ { harf: 'A', ad: 'Konu adı', renk: '#f5b04c', dersler: [
         ['a1-dosya-adi.html', 'Başlık', 'Açılış sorusu', sahneSayisi], … ] }, … ],
       hikayeler: [ { kod: 'A8', ders: 'Dersin başlığı', ad: 'Hikâyenin adı', video: 'hikaye/…mp4' } ],   // isteğe bağlı
     });
   Kısa dersin kimliği <tema kimliği>-<dosyanın kodu> olur (sayilar-a1) ve dersin kendi `id` alanıyla aynı
   olmalıdır; ilerleme tarayıcıda 'ders:<kimlik>' anahtarıyla durur. Yayındaki temanın kimliği ve ders kodları
   değiştirilmez. Sahne sayısı dersin kendi sahneleridir (çıkış soruları ve özet hariç).
   Denetim: node araclar/denetle.js <ders>/<tema> */
window.KATALOG = {
  sinif: '9. Sınıf',
  dersler: [
    { id: 'matematik', ad: 'Matematik', simge: '√x', temalar: [
      { id: 'sayilar', ad: 'Sayılar', yayinda: true },
      { id: 'nicelikler-ve-degisimler', ad: 'Nicelikler ve Değişimler' },
      { id: 'geometrik-sekiller', ad: 'Geometrik Şekiller' },
      { id: 'eslik-ve-benzerlik', ad: 'Eşlik ve Benzerlik' },
      { id: 'algoritma-ve-bilisim', ad: 'Algoritma ve Bilişim' },
      { id: 'istatistiksel-arastirma-sureci', ad: 'İstatistiksel Araştırma Süreci' },
      { id: 'veriden-olasiliga', ad: 'Veriden Olasılığa' },
    ] },
  ],
  /* Temanın tema.js dosyası bunu çağırır. */
  tema(dersId, temaId, veri) {
    const ders = this.dersler.find((d) => d.id === dersId);
    const u = ders && ders.temalar.find((x) => x.id === temaId);
    if (!u) throw new Error('Katalogda böyle bir tema yok: ' + dersId + '/' + temaId + ' (ortak/katalog.js)');
    Object.assign(u, veri, { yol: dersId + '/' + temaId + '/' });
  },
};
