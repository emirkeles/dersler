/* ŞABLON. Kopyalayınca 'matematik' ve 'sablon' yerine dersin ve temanın klasör adını yaz.
   Biçim: ortak/katalog.js başındaki açıklama. Her kısa ders yazıldıkça konusuna bir satır eklenir.
   Satırın beşinci öğesini (yaklaşık süre, saniye) elle yazma; node araclar/sure.js <ders>/<tema> ekler. */
KATALOG.tema('matematik', 'sablon', {
  tanitim: 'Tema sayfasının başında görünen bir iki cümle.',
  konular: [
    { harf: 'A', ad: 'Konunun adı', renk: '#f5b04c', dersler: [
      ['a1-ornek.html', 'İki sayının ortası', '2 ile 8’in tam ortasında hangi sayı durur?', 2],
    ] },
  ],
});
