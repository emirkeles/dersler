# Görev: bir konunun senaryosunu yaz (Fizik · Enerji)

Proje kökü: `/Users/emirkeles/matematik-sayilar`. 9. sınıf için etkileşimli kısa dersler (Türkçe). Bu görevde KOD YAZILMAZ; bir konunun senaryo dosyası yazılır. Dersleri bu senaryodan başka bir ajan kodlayacak; senaryo o yüzden eksiksiz ve kendi başına anlaşılır olmalı.

## Oku (yalnızca bunlar, sırayla; satır aralıkları görev iletisinde, Read'e `offset` ve `limit` ver)
1. `plan/fizik/enerji/MUFREDAT.md`: konunun öğrenme çıktısı, süreç bileşenleri ve "Öğrenme-öğretme uygulamaları" altındaki bölümü; ayrıca "Temel kabuller".
2. `plan/fizik/enerji/PLAN.md`: konunun kısa dersleri (fikir, anlatılacaklar, program dayanağı, sınır, açılış sorusu, akılda kalıcı cümle); bilerek alınmayanlar; görev iletisinde numarası verilen kararlar; konunun ders kitabı paragrafı.
3. Örnek senaryo (biçim, ayrıntı düzeyi ve üslup bağlayıcıdır): `plan/fizik/enerji/senaryolar/A-ic-enerji-isi-sicaklik.md` içinde baştaki okuma kılavuzu (satır 1–22) ve A1 dersinin bölümü (satır 24–177); "Hatırla" sahnesi örneği satır 189–198, konu tekrarı örneği satır 325–347, karşılaştırma tablosu 349–365. Tamamını okuma.
3b. `plan/fizik/enerji/IZOMETRIK.md` bölüm 6b ("Arayüz sözleşmesi", satır 94–110): konunun figürünün satırı ve üstündeki iki paragraf.
4. Ders kitabının konuya ait satırları (görev iletisinde yolu ve satır aralığı verilen metin dosyası). Metinde tabloların simgeleri eksik çıkar; senaryoya alacağın tablo, şekil ya da verinin sayfasını görüntüye çevirip Read ile bak:

       <kitap klasörü>/venv/bin/python -I plan/fizik/enerji/gorev/png.py <kitap klasörü>/kitap/fizik9.pdf <kitap klasörü>/png/<HARF> 85 <sayfa> <sayfa> …

   Görev iletisi konunun dökümünü de verir (`<kitap klasörü>/dokum/<HARF>.md`: sayfa sayfa tanımlar, formüller, deneyler, tablolar, örnekler); önce onu oku, ham metne yalnızca dökümde bulamadığın şey için bak. `PLAN.md` bölüm 8'deki konu satırları bu dökümün özetidir.

   Yalnızca senaryoya alacağın örneğin sayfasına bak; her sayfaya bir kez.

Başka dosya okuma. `plan/KURALLAR.md`, `plan/ISLEME.md`, öteki konuların senaryoları ve ders dosyaları bu listede yok; gereken kurallar aşağıda yazılı. İkinci ajansan konunun ilk senaryo dosyasını okuma: `grep -n` ile ders başlıklarına ve akılda kalıcı cümlelerine bak. Burada cevabını bulamadığın bir şey için `grep -n` ile tek başlığa bak ve raporda "görev tanımında eksik" başlığıyla yaz.

## Kurallar
- Müfredat bağlayıcıdır: programın istemediği konu girmez, istediği eksik kalmaz. `PLAN.md` içindeki "Sınır" satırlarına ve kararlara uy.
- Hiçbir tanım, sayı, formül, ad hafızadan yazılmaz: her bilgi ders kitabında görülür ve dersin "Kaynak" satırında sayfasıyla anılır. Kitapta yoksa yazılmaz, raporda bildirilir. Benzetim için sayı gerekiyor ama kitapta yoksa sıralama kullanılır ve sayı "örnek veri" diye işaretlenir.
- Öğrenciye kitap, sayfa, sınıf, "veri hazır verildi" denmez; veri bir durumun içinde sunulur (kim ölçtü, neyi, neden).
- Her ders bir fikir; süre ve sahne sınırı yok; bilgi sığmıyorsa sahne eklenir. Ders yeni bir soruyla açılmaz: önce anlat, örnekle göster, sonra sor. Her sorunun gerektirdiği bilgi sorudan ÖNCE anlatılmıştır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- İskelet: Hatırla (başlığı "Hatırla"; 1–2 soru; biri bir önceki dersten, biri daha eski bir dersten; bu dersin dayanacağı bilgi seçilir) → anlat → baştan sona çözülmüş örnek → yarısı çözülmüş örnek (`tag: 'Birlikte çöz'`) → öğrencinin tek başına çözdüğü soru → gör → adlandır (defter satırı: formül ya da kural + tek örnek, en çok 12 kelime) → dene (kaydırıcı, sınıflandırma, sıralama, eşleştirme) → 4–5 çıkış sorusu (en az ikisi yeni duruma uygulama, en az biri hedeflenen yanılgı; her soruda bir doğru, iki çeldirici; çeldirici öğretilmemiş bir konuya dayanmaz).
- "Anlatım" satırları altyazının kendisidir: tek cümle, en çok 12 kelime, tek yeni fikir. Tahtada aynı anda en çok 25 kelime ve 12 öğe. Kelime sayımında rakam ve simgeler de kelimedir (ölçüm aracı "4 × 3 = 12" yazısını beş kelime sayar); işlem içeren satır kısa tutulur.
- Anlaşılması güç her kavram için tahtada ne çizileceği yazılır (somuttan soyuta); çizimin ölçüleri senaryoda verilir, böylece dersi yazan ajan ölçü uydurmaz.
- Hareket sıfatla değil sayıyla yazılır ("yavaşça kayar" yazılmaz): ne hareket eder, nereden nereye, kaç ms, hangi eğriyle. Eğriler: beliren öğe `out`, kaybolan `in`, yer değiştiren `inOut`, sabit hızı ya da düzgün dönmeyi gösteren `linear`; `back`, `bounce`, `elastic` yalnızca hareketin kendisi konuysa. Süre: küçük hareket 300–500 ms, sahnenin ana hareketi 600–1200 ms. Bir anda tek ana hareket olur; yazı okunurken yer değiştirmez.
- Program bir modelde hesabı sınırlıyorsa değer yerine koyarak hesap yaptıran sahne ve soru yazılmaz (bu temada: ısıl dengede hesap yok, ısı iletim hızında formül yok, termometre ölçekleri arasında dönüşüm yok). Programın hesap istediği iki modelde (Q = m · c · ΔT ve Q = m · L) hesap yapılır.
- Doğruluk senaryoda denetlenir: her örneğin, her sorunun ve her çeldiricinin hesabını yap; hesabını yaptığın soruları raporda "hesaplandı" diye say.
- Varsayım, genelleme, karşılaştırma isteyen bentler benzetim olur: öğrenci değişkeni (kaydırıcı) değiştirir, tahmin eder, sonucu görür. "Önerme kurar", "soru oluşturur" bentleri seçenekli tahmin ve sınıflandırmayla karşılanır.
- Tahta koyu renklidir: "siyah çizgi" yazılmaz. Kırmızı kullanılmaz; işe yaramayan yol gri çizilir. Yeşil doğru cevabın rengidir.
- Yazarın çekinceleri ve üst dil ("bu sahnede…", "bu benzetim gerçek ölçüm değildir") altyazıya yazılmaz.
- Konunun sonuna konu tekrarı dersinin senaryosu yazılır (`<harf><n>-tekrar.html`): yeni bilgi yok; tek sahnede konunun kuralları; 6–10 karışık soru, çoğu yeni duruma uygulama.
- En sona "Program metniyle karşılaştırma" tablosu: programın konuya dair her isteği (süreç bileşenleri ve uygulama metni) → hangi ders, hangi sahne; "fazla olan", "eksik olan" satırları.

## Temaya özgü
- Renkler: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle (madde miktarı) turkuaz, soğuk ve su mavi. Termometre sütunu sarıdır. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir.
- Çizim: tahta 1000 × 562 birim; her sahnede öğelerin yeri ve boyu bu birimle verilir. Yazı en az 22 birim. Tablo sütun genişlikleri en uzun hücreye göre yazılır (birim taşıyan başlıkta sütun en az 200 birim). Deneyi yapan kişi Ela'dır.
- **İzometrik figür:** konunun deney düzeneği hazır bir izometrik figürdür (`IZOMETRIK.md` bölüm 6b); görev iletisi hangi figür olduğunu söyler. Figür kullanan sahnede "Tahta" paragrafının ilk satırı `Figür:` ile başlar ve şunları verir: figürün tahtadaki yeri (`x, y, h`; genişlik `h × oran`), başlangıç ayarları (sözleşmedeki ayar adlarıyla, ör. `sol: su, seviye 0,5, 20 °C, alev 0`), kadraj. Hareket, ayarların değişimi olarak yazılır ("sol termometre 24 → 33 °C, 3.000 ms, `linear`; süreölçer 0 → 120 sn"). Figürde yazı yoktur: etiket, sayı, ok ve ölçü çizgisi düz katmandadır ve figürün noktalarına bağlanır ("`sol.etiket` noktasının altında '100 g su'"). Figürün yanında kalan alan tablo, grafik ve yazı içindir; figür ile yazı üst üste gelmez. Figürün gösteremediği şey (buzdolabı, grafik, tanecik, Güneş) düz vektörle tarif edilir. Sözleşmede olmayan bir ayar gerekiyorsa sahneyi düz vektörle yaz ve raporda "sözleşmede eksik" diye bildir. Konu tekrarı dersi figürü yalnızca hazır pozuyla kullanabilir.
- Doğruluk: modeller kitabın yazımıyla (Q = m · c · ΔT, C = m · c, Q = C · ΔT, Q = m · L; `PLAN.md` karar 3 ve 4). Birimler karar 16'daki gibi: ısı joule, kütle gram, sıcaklık °C; suyun öz ısısı 4,18 J/g · °C; kalori hesapta kullanılmaz. Bakırın öz ısısı sayıyla yazılmaz (karar 17). Kitabın ölçüm verdiği deneyde kitabın sayıları kullanılır; vermediği deneyde sayılar "örnek veri"dir: dersin başına "Örnek veri" satırıyla yazılır ve kitabın modelinden hesaplanır (karar 15); her birini hesapla ve raporda göster. Isıl dengede denge sıcaklığını yazar hesaplar (alınan ısı = verilen ısı), öğrenciye hesap gösterilmez. Kitap dışı bilgi yalnızca `PLAN.md` kararlarında "kitap dışı" diye yazılanlardır.
- Yazım: çarpım "·" ile; ondalık virgül, binlik nokta ("4,18 J/g · °C", "10.450 J"); birimle sayı arasında boşluk ("20 °C", "500 g"); "Δ" delta. Kesme işareti "’". "Hâl", "rüzgâr" gibi sözcüklerde düzeltme işareti korunur.

## Yazım
Senaryoyu ders ders yaz: okuma kılavuzu ile ilk dersin bölümünü `Write` ile, sonraki her dersi dosyanın sonuna ekleyerek (`cat >> <dosya> <<'EOF'`). Yazdığın dosyayı baştan okuma; denetimi `grep -n` ile yap. Komut çıktısını kısalt (`| tail -20`, `grep -n`, `sed -n a,bp`); yüz satırı aşan çıktı alma.

## Kapsam
Yalnızca görev iletisinde adı verilen senaryo dosyasını yaz. Başka hiçbir dosyaya (`PLAN.md`, `DURUM.md`, `TASKS.md`, ders dosyaları, `ortak/`, `araclar/`) dokunma; git kullanma. Aynı anda başka ajanlar öteki konuların senaryolarını yazıyor.

## Rapor
Ders listesi (kod, ad, dosya adı önerisi `<kod>-<kisa-ad>`, sahne sayısı, senaryo dosyasındaki satır aralığı); kitaptan aldığın ve `PLAN.md` içindeki ders kitabı paragrafında OLMAYAN her bilgi (sayfasıyla); `PLAN.md` ile kitap arasında gördüğün her tutarsızlık; kitapta bulamadığın için yazmadığın şeyler; programa göre kuşkulu gördüğün her içerik; derslerin gerektireceği yeni çizim araçları (kit için); görev tanımında eksik bulduğun her şey.
