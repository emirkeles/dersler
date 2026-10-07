# Yaşam — İşleme raporu

7 Ekim 2026. Tema önizlemesi: `biyoloji/yasam/index.html`.

## Blocked on me

Tam müfredat kapsamı iki kaynakta duruyor:

- **D6:** MEB kitabı s41 hücre tanımına uymama/boyut bilgilerini verir; s42 virüs yapısı ve genel çoğalma anlatımını EBA videosuna bırakır. PDF karekod bağlantısı `https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=cea5d7aa622370b61fa89ad5d43f3166&resourceType=1&resourceLocation=2` curl ile EBA giriş sayfasına yönlendi. Kitabın tamamında `virüs/kapsit/kapsid` araması da bu ayrıntıları vermedi. Yapı/çoğalma öğretilmiş sayılmaz; BİY.9.1.4 c kısmî.
- **E1:** s46 karşılaştırma tablosu boş; s45 animasyon bağlantısı `https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=3d45da285a3549002b315f9e91f4c0a8&resourceType=1&resourceLocation=2` aynı giriş ekranına yönlendi. Su üretimi, su/minerallerin sindirim-solunum-zar geçişi bütün cevapları alınamadı. S161 cevap anahtarı karekod URL’si `resourceId=95048d59574b5f9593cf0a1553cbba9a` da EBA giriş ekranına yönlendi; buradan ek cevap alınamadı. Kaynakta doğrulanmış su görevleri ve minerallerin üretilememesi (s45,51) öğretildi. BİY.9.1.5 a tam karşılanmış sayılmaz.

Bilgi boşlukları hafızadan doldurulmadı. Kaynağın erişilebilir içeriği gelince devam noktası DURUM.md’de.

## Changed

- **8 konu, 37 kısa ders, 136 özgün sahne, 74 çıkış sorusu.** Tema sayfası, katalog satırları, tema içi SVG yardımcıları, her dersin HTML/JS dosyası ve A–H senaryoları yazıldı.
- Öğrenci kitabı açmadan izleyebileceği bağımsız kurs anlatımı: sayfa numaraları ve kaynak izi geliştirme kayıtlarında; gerekli kavram/örnek/görsel ders içinde. İlk sorudan önce 2–3 bağlam altyazısı; buluş, mineral ve molekül bilgileri öğretilmeden trivia şeklinde sorulmuyor.
- Gerçekçi dört görüntü ders kitabı s33/s39’dan kırpıldı: menekşe, tavşan, kelebek desenleri, ördek/perdeli ayak. WebP, <1600 px ve <300 KB. KAYNAK.md’de kaynak/hak bilgileri var; açık formüllü kitap şekilleri kullanılmadı. Düzenek, süreç ve molekül modelleri SVG.
- Dokuz dönüm noktası, on bir mineral, programdaki molekül çeşitleri ve sınırlamaları işlendi. Ayraç ad/renkleri s75; su düzenekleri s47–49; enzim düzenekleri s80–83; diğer bilgiler PLAN.md bölüm8’de sayfalı. Programın saydığı 11 besin G2 seçiminde; ölçülmemiş besin sonucu atanmaz.
- PLAN.md: bütün başlangıç soruları karara bağlandı, 96 müfredat denetim satırı ders/benzetim/site dışı ve sahne numarasıyla işlendi, 37 ders için anlatım/gerekçe yazıldı. DURUM.md ve TASKS.md devam noktalarını tutar.
- Bağımsız içerik incelemesinin bulguları giderildi: A1/F1/F2/mineral öğretim sırası; kaynaklı aşı bağlamı; iki katalaz düzeneğinin ayrımı; değişken adları; grafik geometrisi; kapsamı koruyan ek kanıt uygulamaları. Ayrıntı INCELEME.md’de.

Tema **yayında değil**. Bu oturum yayın/seslendirme/görsel üretimi/commit/push veya dal değişimi yapmadı. Yalnız iki tema klasörüne yazdı; kitap ve QA ara dosyaları talimat gereği proje dışındaki geçici klasörlerde.

## Found

**Son doğrulama:**

- Her ders için `node araclar/olc.js biyoloji/yasam/<kod>` çalıştı: 37 ders/136 sahne; tüm yerleşim/yazı bütçesi sayaçları 0, konsol temiz, tamamlanamayan sahne yok. En küçük görülen punto 19,7 px. Döküm OLCUM.md’de; her sahnenin son görüntüsü incelendi.
- `node araclar/denetle.js biyoloji/yasam`: “37 kısa ders, yayında değil. Sorun yok.” Kimlikler, sahne sayıları, kayıt ve dosyalar/tema bağlantıları temiz.
- `node plan/biyoloji/yasam/davranis-denetimi.cjs --girisler`: bütün 37 girişte ilk seçim öncesi 2–3 bilgilendirme ve ikişer çıkış sorusu; H2/H3 bütün seçilebilir kontrol değerleri temiz. Grafik hataları önce gerçek tarayıcıda üretildi, sonra düzeltildi. G3 ilk soru öncesi uygulama düğmesi testte ayrıca geçirildi.
- `--tema`: 8 konu/37 ders ve konsol temiz; tema ana görünümü ve sekiz açılmış konu listesinin görüntüleri incelendi.
- Görsel boyut/büyüklük sınırları temiz; proje altında kitap PDF'i yok. Temaya ait diff boşluk denetimi temiz. Chrome sandbox içinde bootstrap izni yüzünden açılmadı; gerekli ölçümler onaylı yükseltilmiş komutla çalıştırıldı.

**Doğrulanmayanlar ve bakılan yerler:**

- Yukarıdaki D6/E1 EBA içerikleri: kitap tam metni, s41–42/s45–46 ve PDF içindeki iki URL/giriş yönlendirmesi kontrol edildi; içerik alınamadı.
- Gerçek üç günlük canlı gözlemi, öğrencinin serbest kaynak taraması, grup çalışması ve rapor/broşür/bilgi görseli üretimi site dışında; öğrenci başarısı gerçekleşmiş sayılmaz. Dayanak MUFREDAT.md uygulamalar ve kitap s20,28,31–32,40–41,52–56,77,82–83.
- Gerçek besin deneyi sonuçları ve enzim kabarcık/hacim sayıları kitap s76–77/s82–83’te dolu sonuç verisi olarak bulunmuyor. Su maddelerinin tek tek çözünme sonucu, para/taşma sayısı ve ısıtma sıcaklıkları s47–49’da hazır ölçüm değil. Uydurulmadı. Benzetim yalnız kaynaklı koşul, nitel model ve sonuç yorumlama yöntemini karşılar; nicel deney grafiği sınıfta çizilir.
- Gerçek öğrenci **4–6 dakika** hedefi öğrenciyle zamanlanmadı; otomatik oynatma düşünme ve cevaplama süresini ölçmez. Bağımsız inceleme ve otomatik ölçüm süreleri incelendi; süre hedefi doğrulanmış diye sunulmaz.
- Mobil ekran, klavye erişilebilirliği ve bütün yanlış cevap/baştan yolları ayrı tam QA ile denenmedi. Zorunlu bütün ölçümler Chrome’da **1366×657**; genel motor bu oturumda değiştirilmedi. H grafik kontrolleri ve ilk soru/quiz yolları ayrıca gerçek tarayıcıda denetlendi.
- Görsel **yeniden yayın lisansı** kesin doğrulanmadı: kitabın s2 “Her hakkı saklıdır ve Millî Eğitim Bakanlığına aittir.” notu ve s161 görsel kaynakça karekoduna bakıldı. Görsel kaynakça URL’si `resourceId=f40a7dbf54f6a107794f5182f9d08efe` EBA giriş ekranına yönlendi; dört kırpımın ayrı stok lisansı alınamadı. Açık lisans iddiası yapılmadı; tema yayınlanmadı. KAYNAK.md kaydı bu sınırı gösterir.
- `plan/biyoloji/TEMALAR.md` durum satırı yazma sınırının dışında olduğu için güncellenmedi. Sayılar zaten 8/37, fakat dış dosyada taslak durum metni kalır. Ortak motor/araç/katalog ve öteki tema dosyaları değiştirilmedi. Eşzamanlı oturumların git işlemleri bu oturumun yetkisinde değildir; bu oturum git mutasyonu yapmadı.

**Sonuç:** Teknik olarak açılabilen ve temiz ölçülen önizleme hazırdır. D6/E1 kaynak eksikleri nedeniyle temanın tam müfredat kapsamında tamamlandığı ilan edilmez.
