# Görseller — Kimya · Çeşitlilik

Resim üretimi ücretli dış servistir; kullanıcı ayrıca ister (`KURALLAR.md` 5.1). Bu dosya yalnızca istemleri ve yer tutucuları kaydeder. Üretilen dosyalar `kimya/cesitlilik/gorsel/` altına konur (WebP, uzun kenar en çok 1600 px, dosya başına en çok 300 KB); her resmin istemi, modeli, tarihi ve denetleyeni `gorsel/KAYNAK.md` içine yazılır.

## Üslup cümlesi (her istemde aynen kullanılır)

Koyu lacivert, düz ve tek renk arka plan; nesne ortada, tek başına, yumuşak ve tek yönlü stüdyo ışığında; gerçekçi, yakın çekim ürün fotoğrafı; gölge kısa ve yumuşak; resmin içinde yazı, rakam, ok, etiket, el ya da insan yok.

## H1 sahne 2 · Yedi katı, yedi görünüm

Sahnedeki işi: programın saydığı yedi katı yan yana durur; öğrenci görünümlerinin ne kadar farklı olduğunu görür, sonra büyüteç taneciklere iner. Adlar resmin altına SVG yazı olarak konur (resmin içinde yazı yok).

Yer tutucu: `dersler/h-araclar.js` içindeki `yedi()`; tahtada yedi kutu, kutu i için x = 12 + 142·i (i = 0…6), y = 50, genişlik 124, yükseklik 130 (tahta 1000×562 birim). Her resim kare kırpılır (1:1) ve bu kutuya oturur.

| Dosya | İstem (üslup cümlesinden sonra) | Karşılaştırılacağı yer |
|---|---|---|
| `h1-sofra-tuzu.webp` | Küçük bir yığın iri taneli sofra tuzu; tek tek küp biçimli kristaller seçiliyor | ders kitabı s. 159 (sodyum klorür) |
| `h1-celik-kasik.webp` | Parlak, düz bir çelik çay kaşığı; yatay duruyor | programın örneği; kitapta görseli yok |
| `h1-bilgisayar-ekrani.webp` | Kapalı, ince çerçeveli bir bilgisayar ekranı; önden, ekranı siyah ve boş | programın örneği; kitapta görseli yok |
| `h1-kursun-kalem-ucu.webp` | Yeni açılmış bir kurşun kalemin ucu; çok yakın çekim, koyu gri uç ve ahşap konik kısım | ders kitabı s. 160 (grafit) |
| `h1-elmas.webp` | Kesilmiş, saydam tek bir elmas; yüzeyleri ışığı yansıtıyor | ders kitabı s. 160 (elmas) |
| `h1-kar-tanesi.webp` | Tek bir kar tanesi; altı kollu, simetrik, çok yakın çekim | ders kitabı s. 159 (buz) |
| `h1-cam.webp` | Düz, saydam, kalın bir cam parçası; kenarları düzgün kesilmiş | ders kitabı s. 159 (cam) |

Denetim: her resim kitaptaki görselle karşılaştırılır (tuz kristalleri küp biçimli mi, kar tanesi altı kollu mu, kalem ucu grafit renginde mi). Kararsız çıkan resim kullanılmaz; yer tutucu vektör çizim kalır.

Tema sayfasının altına, resimler konduğunda: "Bu temadaki resimler yapay zekâ ile üretilmiştir."
