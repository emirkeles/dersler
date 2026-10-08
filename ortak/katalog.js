/* Sitenin ders kataloğu: Ders → Tema → Konu → Kısa ders.

   Bu dosya yalnızca dersleri ve temaların sırasını tutar. Her temanın kısa dersleri kendi klasöründeki
   tema.js dosyasındadır (<ders>/<tema>/tema.js) ve KATALOG.tema(...) ile kaydolur; böylece temalar
   birbirinin dosyasına dokunmadan, paralel yazılabilir.

   Dersin `simge` ve `renk` alanları ana sayfadaki ders listesinde kullanılır.

   Yayına alma: tema hazır olunca aşağıdaki satırına `yayinda: true` eklenir. Ana sayfa yalnızca yayındaki
   temaların tema.js dosyasını yükler; ötekiler "Hazırlanan temalar" listesinde görünür. Temanın kendi
   sayfası (<ders>/<tema>/index.html) yayında olmasa da çalışır, önizleme için açılabilir.

   tema.js biçimi:
     KATALOG.tema('<ders kimliği>', '<tema kimliği>', {
       tanitim: 'tema sayfasının başındaki bir iki cümle',
       konular: [ { harf: 'A', ad: 'Konu adı', renk: '#f5b04c', dersler: [
         ['a1-dosya-adi.html', 'Başlık', 'Açılış sorusu', sahneSayisi, sureSaniye], … ] }, … ],
       hikayeler: [ { kod: 'A8', ders: 'Dersin başlığı', ad: 'Hikâyenin adı', video: 'hikaye/…mp4', kapak: 'hikaye/…/kapak.jpg' } ],   // isteğe bağlı; kapak da isteğe bağlı
     });
   Kısa dersin kimliği <tema kimliği>-<dosyanın kodu> olur (sayilar-a1) ve dersin kendi `id` alanıyla aynı
   olmalıdır; ilerleme tarayıcıda 'ders:<kimlik>' anahtarıyla durur. Yayındaki temanın kimliği ve ders kodları
   değiştirilmez. Sahne sayısı dersin kendi sahneleridir (çıkış soruları ve özet hariç).
   Süre dersin yaklaşık süresidir (saniye); elle yazılmaz, node araclar/sure.js <ders>/<tema> ölçer ve yazar.
   Sayfalar konu ve tema toplamlarını bu sayılardan çıkarır.
   Denetim: node araclar/denetle.js <ders>/<tema> */
window.KATALOG = {
  sinif: '9. Sınıf',
  dersler: [
    { id: 'matematik', ad: 'Matematik', simge: '√x', renk: '#6ea8ff', temalar: [
      { id: 'sayilar', ad: 'Sayılar', yayinda: true },
      { id: 'nicelikler-ve-degisimler', ad: 'Nicelikler ve Değişimler', yayinda: true },
      { id: 'geometrik-sekiller', ad: 'Geometrik Şekiller' },
      { id: 'eslik-ve-benzerlik', ad: 'Eşlik ve Benzerlik' },
      { id: 'algoritma-ve-bilisim', ad: 'Algoritma ve Bilişim' },
      { id: 'istatistiksel-arastirma-sureci', ad: 'İstatistiksel Araştırma Süreci' },
      { id: 'veriden-olasiliga', ad: 'Veriden Olasılığa' },
    ] },
    { id: 'fizik', ad: 'Fizik', simge: 'Δv', renk: '#ff8a5b', temalar: [
      { id: 'fizik-bilimi-ve-kariyer-kesfi', ad: 'Fizik Bilimi ve Kariyer Keşfi', yayinda: true },
      { id: 'kuvvet-ve-hareket', ad: 'Kuvvet ve Hareket' },
      { id: 'akiskanlar', ad: 'Akışkanlar' },
      { id: 'enerji', ad: 'Enerji' },
    ] },
    { id: 'kimya', ad: 'Kimya', simge: 'H₂O', renk: '#c792ff', temalar: [
      { id: 'etkilesim', ad: 'Etkileşim' },
      { id: 'cesitlilik', ad: 'Çeşitlilik' },
      { id: 'surdurulebilirlik', ad: 'Sürdürülebilirlik' },
    ] },
    { id: 'biyoloji', ad: 'Biyoloji', simge: 'DNA', renk: '#3ddc97', temalar: [
      { id: 'yasam', ad: 'Yaşam' },
      { id: 'organizasyon', ad: 'Organizasyon' },
    ] },
    { id: 'turk-dili-ve-edebiyati', ad: 'Türk Dili ve Edebiyatı', simge: 'Aa', renk: '#ff8fab', temalar: [
      { id: 'sozun-inceligi', ad: 'Sözün İnceliği' },
      { id: 'anlam-arayisi', ad: 'Anlam Arayışı' },
      { id: 'anlamin-yapi-taslari', ad: 'Anlamın Yapı Taşları' },
      { id: 'dilin-zenginligi', ad: 'Dilin Zenginliği' },
    ] },
    { id: 'tarih', ad: 'Tarih', simge: 'MÖ', renk: '#f5b04c', temalar: [
      { id: 'gecmisin-insa-surecinde-tarih', ad: 'Geçmişin İnşa Sürecinde Tarih' },
      { id: 'eski-cag-medeniyetleri', ad: 'Eski Çağ Medeniyetleri' },
      { id: 'orta-cag-medeniyetleri', ad: 'Orta Çağ Medeniyetleri' },
    ] },
    { id: 'cografya', ad: 'Coğrafya', simge: '39°', renk: '#3cc8e8', temalar: [
      { id: 'cografyanin-dogasi', ad: 'Coğrafyanın Doğası' },
      { id: 'mekansal-bilgi-teknolojileri', ad: 'Mekânsal Bilgi Teknolojileri' },
      { id: 'dogal-sistemler-ve-surecler', ad: 'Doğal Sistemler ve Süreçler' },
      { id: 'beseri-sistemler-ve-surecler', ad: 'Beşerî Sistemler ve Süreçler' },
      { id: 'ekonomik-faaliyetler-ve-etkileri', ad: 'Ekonomik Faaliyetler ve Etkileri' },
      { id: 'afetler-ve-surdurulebilir-cevre', ad: 'Afetler ve Sürdürülebilir Çevre' },
      { id: 'bolgeler-ulkeler-ve-kuresel-baglantilar', ad: 'Bölgeler, Ülkeler ve Küresel Bağlantılar' },
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
