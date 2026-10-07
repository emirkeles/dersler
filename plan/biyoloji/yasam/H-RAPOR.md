# H · Uygulama raporu

H1–H3, her biri 4 sahne ve 2 çıkış sorusu. Kaynaklar MEB Biyoloji 9 s.26,67,79–83. H1 S1 bağımsız/bağımlı/kontrol; S2 maya–ters silindir düzenek ve beş dakikalık kabarcık ölçümü; S3 hata kontrolü; S4 hamur/uygun koşul. H2 S1 s83 karaciğer–balon sıcaklık koşulları, S2 yavaşlama/denatürasyon, S3 nitel sıcaklık grafiği, S4 mayalanma/saklama ve ayrı maya–silindir ölçüm yöntemi. H3 S1–2 farklı enzimlerin nitel pH ilişkisi, S3 s83 karaciğer–balon pH koşulları ve ayrı ölçüm yöntemi, S4 mide ortamı/günlük yaşam.

Kaynak ayrımı: s83 numaralı tüplerde karaciğer özütü ve hidrojen peroksit vardır; balon hacmindeki değişim gözlenir. s80–82 maya–ters silindir düzeneğinde beş dakikalık oksijen kabarcık sayısı kaydedilir. Bunlar aynı düzeneğin ölçümü gibi sunulmaz. Her iki ölçümün gerçek sonucu kitapta hazır olmadığı için sayı üretilmez. Nitel grafik s67 ilişkisine dayanır; ölçülmüş katalaz eğrisi değildir.

Son zorunlu ölçümler: `node araclar/olc.js biyoloji/yasam/hN --goruntu /tmp/yasam-olc/hN`, loglar hN-son.log, JSON/PNG ilgili dizinde. H1 19 altyazı/133 kelime; H2 17/123; H3 15/113. Bütün yerleşim/yazı bütçesi sayaçları 0, konsol temiz, tamamlanamayan sahne yok. Son sahne görüntüleri incelendi; değişken kartları, düzenek ayrımı ve grafik işaretleri okunur.

Ek gerçek tarayıcı testi: `node plan/biyoloji/yasam/davranis-denetimi.cjs`. İlk koşuda H2 optimum bölge seçilemiyordu; H3 işareti pH3/8'de tepeyi kesmiyordu. Önce hatalar yeniden üretildi; H2 35–40°C bandı ve 5°C kaydırıcı adımı, H3 işaret yüksekliği düzeltildi. Son koşuda iki davranış da temiz. H2 noktası çizilmiş path geometrisini izler; yeri ayrı bir tahmin eğrisiyle hesaplanmaz.

Karşılanma: deney tasarımı/nitel koşul analizi benzetim; gerçek aktivite ölçümü, nicel tablo/grafik ve sınıf deneyi site dışı. H çıktısının uygulamalı yönü tamamlanmış sayılmaz. Gerçek enzim optimumu/gerçek kabarcık veya hacim verisi doğrulanmadı; s82 tabloları boş, s83 yalnız koşulları verir. Gerçek öğrenci 4–6 dakika süresi ölçülmedi.
