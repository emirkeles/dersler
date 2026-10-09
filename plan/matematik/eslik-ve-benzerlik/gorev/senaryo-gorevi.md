# Görev: bir konunun senaryosunu yaz (Matematik · Eşlik ve Benzerlik)

Proje kökü: /Users/emirkeles/matematik-sayilar. 9. sınıf için etkileşimli kısa dersler (Türkçe). Bu görevde KOD YAZILMAZ; bir konunun senaryo dosyası yazılır. Dersleri bu senaryodan başka bir ajan kodlayacak; senaryo o yüzden eksiksiz ve kendi başına anlaşılır olmalı.

## Önce oku (sırayla)
1. `plan/KURALLAR.md` bölüm 2–4 (müfredat bağlayıcıdır; içerik kaynağı; kısa ders biçimi 3–3.4; yazı bütçesi).
2. `plan/matematik/eslik-ve-benzerlik/MUFREDAT.md`: konunun öğrenme çıktısı, süreç bileşenleri ve "Öğrenme-öğretme uygulamaları" altındaki bölümü; ayrıca "Temel kabuller".
3. `plan/matematik/eslik-ve-benzerlik/PLAN.md`: bölüm 3'te konunun kısa dersleri (fikir, anlatılacaklar, program dayanağı, sınır, açılış sorusu, akılda kalıcı cümle); bölüm 5 (bilerek alınmayanlar); bölüm 7 (kararlar; konunu ilgilendirenler görev iletisinde sayılı); bölüm 8'de konunun paragrafı (ders kitabından alınanlar, sayfa numaralarıyla).
4. Örnek senaryo (biçim, ayrıntı düzeyi ve üslup bağlayıcıdır): `plan/matematik/eslik-ve-benzerlik/senaryolar/A-geometrik-donusumler.md`.
5. Ders kitabının ilgili sayfaları (görev iletisinde yolu verilen metin dosyası). Metinde tabloların simgeleri eksik çıkar; tablo, şekil ya da veri gereken sayfayı görüntüye çevirip Read ile bak:

       S=<görev iletisinde verilen kitap klasörü>
       "$S/venv/bin/python" -I plan/matematik/eslik-ve-benzerlik/gorev/png.py "$S/kitap2/k2.pdf" "$S/png" 80 <sayfa> [<sayfa> …]
       # çıktı: $S/png/s<sayfa>.png

   Bu bölümde hemen her örnek şekle bağlıdır: kullanacağın her örneğin sayfasına görüntü olarak bak; sayıları ve harfleri görüntüden doğrula.

## Kurallar
- Müfredat bağlayıcıdır: programın istemediği konu girmez, istediği eksik kalmaz. `PLAN.md` bölüm 3'teki "Sınır" satırlarına ve bölüm 7'deki kararlara uy.
- Hiçbir tanım, sayı, formül, ad hafızadan yazılmaz: her bilgi ders kitabında görülür ve dersin "Kaynak" satırında sayfasıyla anılır. Kitapta yoksa yazılmaz, raporda bildirilir. Benzetim için sayı gerekiyor ama kitapta yoksa sıralama kullanılır ve sayı "örnek veri" diye işaretlenir.
- Öğrenciye kitap, sayfa, sınıf, "veri hazır verildi" denmez; veri bir durumun içinde sunulur (kim ölçtü, neyi, neden).
- Her ders bir fikir; süre ve sahne sınırı yok; bilgi sığmıyorsa sahne eklenir. Ders yeni bir soruyla açılmaz: önce anlat, örnekle göster, sonra sor. Her sorunun gerektirdiği bilgi sorudan ÖNCE anlatılmıştır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler.
- İskelet: Hatırla (başlığı "Hatırla"; 1–2 soru; biri bir önceki dersten, biri daha eski bir dersten; bu dersin dayanacağı bilgi seçilir) → anlat → baştan sona çözülmüş örnek → yarısı çözülmüş örnek (`tag: 'Birlikte çöz'`) → öğrencinin tek başına çözdüğü soru → gör → adlandır (defter satırı: formül ya da kural + tek örnek, en çok 12 kelime) → dene (kaydırıcı, sınıflandırma, sıralama, eşleştirme) → 4–5 çıkış sorusu (en az ikisi yeni duruma uygulama, en az biri hedeflenen yanılgı; her soruda bir doğru, iki çeldirici; çeldirici öğretilmemiş bir konuya dayanmaz).
- "Anlatım" satırları altyazının kendisidir: tek cümle, en çok 12 kelime, tek yeni fikir. Tahtada aynı anda en çok 25 kelime ve 12 öğe.
- Anlaşılması güç her kavram için tahtada ne çizileceği yazılır (somuttan soyuta). Renkler: şekil mavi, görüntüsü turuncu, yansıma doğrusu mor, dönme merkezi ve açısı sarı, öteleme oku yeşil; B konusundan sonra karşılıklı açılar ve karşılarındaki kenarlar aynı renkte (A ↔ D mavi, B ↔ E turuncu, C ↔ F yeşil), paralel doğrular mor, yükseklik sarı. Çizimler birim kareli zeminde ya da ölçekli çizilir; her şeklin köşeleri "(sütun, satır)" ya da uzunluk ve açılarıyla senaryoda verilir, böylece dersi yazan ajan ölçü uydurmaz. Tahtaya koordinat yazılmaz.
- Matematik doğruluğu senaryoda denetlenir: her örneğin, her sorunun ve her çeldiricinin hesabını yap; ispatın her adımını gerekçesiyle yaz (kitap ispatları etkinlik olarak bırakıyor, adımları sen kurarsın; yalnızca önceki derslerde öğretilmiş bilgi kullanılır). Hesabını yaptığın soruları raporda "hesaplandı" diye say.
- Varsayım, genelleme, karşılaştırma isteyen bentler benzetim olur: öğrenci değişkeni (kaydırıcı) değiştirir, tahmin eder, sonucu görür. "Önerme kurar", "soru oluşturur" bentleri seçenekli tahmin ve sınıflandırmayla karşılanır (verilen önermelerden gözleme dayalı olanı ayırma gibi).
- Yazarın çekinceleri ve üst dil ("bu sahnede…", "bu benzetim gerçek ölçüm değildir") altyazıya yazılmaz.
- Konunun sonuna konu tekrarı dersinin senaryosu yazılır (`<harf><n>-tekrar.html`): yeni bilgi yok; tek sahnede konunun kuralları; 6–10 karışık soru, çoğu yeni duruma uygulama.
- En sona "Program metniyle karşılaştırma" tablosu: programın konuya dair her isteği (süreç bileşenleri ve uygulama metni) → hangi ders, hangi sahne; "fazla olan", "eksik olan" satırları.

## Kapsam
Yalnızca görev iletisinde adı verilen senaryo dosyasını yaz. Başka hiçbir dosyaya (PLAN.md, DURUM.md, TASKS.md, ders dosyaları, ortak/, araclar/) dokunma; git kullanma. Aynı anda başka ajanlar öteki konuların senaryolarını yazıyor.

## Rapor
Ders listesi (kod, ad, dosya adı önerisi `<kod>-<kisa-ad>`, sahne sayısı); kitaptan aldığın ve `PLAN.md` bölüm 8'de OLMAYAN her bilgi (sayfasıyla); `PLAN.md` bölüm 8 ile kitap arasında gördüğün her tutarsızlık; kitapta bulamadığın için yazmadığın şeyler; programa göre kuşkulu gördüğün her içerik; derslerin gerektireceği yeni çizim araçları (kit için).
