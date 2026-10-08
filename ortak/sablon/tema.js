/* ŞABLON. Kopyalayınca 'matematik' ve 'sablon' yerine dersin ve temanın klasör adını yaz.
   Biçim: ortak/katalog.js başındaki açıklama. Her kısa ders yazıldıkça konusuna bir satır eklenir.
   Satırın beşinci öğesini (yaklaşık süre, saniye) elle yazma; node araclar/sure.js <ders>/<tema> ekler. */
KATALOG.tema('matematik', 'sablon', {
  kural: 2,   // 8 Ekim 2026 anlatım kuralları (plan/KURALLAR.md 3.2, 3.4); denetle.js ve sure.js buna göre denetler
  tanitim: 'Tema sayfasının başında görünen bir iki cümle.',
  konular: [
    { harf: 'A', ad: 'Konunun adı', renk: '#f5b04c', dersler: [
      ['a1-ornek.html', 'İki sayının ortası', '2 ile 8’in tam ortasında hangi sayı durur?', 2],
      // Konunun son satırı konu tekrarı dersidir: ['a9-tekrar.html', 'Konu tekrarı', '…', 1]
    ] },
  ],
});
