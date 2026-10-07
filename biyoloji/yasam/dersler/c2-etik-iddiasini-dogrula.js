/* MEB Biyoloji 9, s. 31–32; BİY.9.1.3 a–ç. */
(() => {'use strict';const K=KIT;
 async function arac(c){const s=c.svg(1000,562);K.kart(c,s,150,110,700,220,'Park ödevi raporları',['Bir iddia','İncelenecek belge'],{renk:K.renkler.C});K.kaynak(c,s,31);
  await c.say('Bir araştırma hakkında söylenenlerin dayanağını inceleyeceğiz.');
  await c.say('Bilgiye ulaşmak için kullanılacak araç, soruyla ilişkili olmalıdır.');
  await K.soru(c,'Kaynakların gösterilip gösterilmediğini hangi araçla incelersin?',['Paylaşım sayısıyla','Raporun kaynakçasıyla','Yalnız rapor başlığıyla'],1,'Kaynakça, raporun kullandığı kaynakları incelemeyi sağlar.');
  K.temiz(s);K.kart(c,s,160,130,680,200,'Araç seçimi',['Rapor → kaynakça','Katkı → görev kaydı'],{renk:K.renkler.C});K.kaynak(c,s,31);
  await c.say('Aracı seçmek, bilgiyi doğrulamış olmak değildir.');
  c.note('Aracı soruya göre seç: kaynakça, görev kaydı.','Araç');
 }
 async function ulas(c){const s=c.svg(1000,562);K.kart(c,s,160,100,680,250,'Park ödevindeki üçüncü rapor',['Fotoğraflar ikinci raporla aynı.','Kaynakça yok.','İş bölümü belirtilmemiş.'],{renk:K.renkler.C});K.kaynak(c,s,31);
  await c.say('İncelediğimiz üçüncü raporda kaynakça ve iş bölümü belirtilmemiştir.');
  await c.say('Aynı fotoğrafın görülmesi, kaynağını sorma gereği doğurur.');
  await K.soru(c,'Hangi bilgi doğrudan vaka metninde verilmiştir?',['Bütün fotoğraflar öğrencilerin kendi çekimidir.','Üçüncü raporda kaynakça bulunmamaktadır.','Üçüncü grubun bütün gözlemleri yanlıştır.'],1,'Vaka metni, üçüncü raporda kaynakça bulunmadığını açıkça bildirir.');
  await c.say('Metnin vermediği ayrıntıyı verilmiş gibi kaydetme.');
  await K.soru(c,'İki raporda aynı fotoğraf var. Hangi hüküm henüz kurulamaz?',['Fotoğrafın kaynağı araştırılmalıdır.','İki raporda aynı görüntü kullanılmıştır.','Üçüncü grup fotoğrafı kesin kendisi çekmiştir.'],2,'Görüntülerin aynı olması, fotoğrafı kimin çektiğini tek başına kanıtlamaz.');
  await c.say('Aynı görüntü kanıttır; görüntünün kökeni ayrıca araştırılır.');
 }
 async function dogrula(c){const s=c.svg(1000,562);K.kart(c,s,150,130,700,200,'Doğrulama',['İddia ↔ güvenilir kaynak','Farklı kaynaklarla karşılaştırma'],{renk:K.renkler.C});K.kaynak(c,s,32);
  await c.say('Rapor bilgisini farklı güvenilir kaynaklarla karşılaştırarak doğrula.');
  await c.say('Aynı bilginin iki kez aktarılması bağımsız kanıt olmayabilir.');
  await K.soru(c,'Aynı haberin kopyalandığı iki sayfa için ne söylenebilir?',['İki bağımsız araştırma kesin vardır.','Artık hiçbir belgeye bakılmaz.','İkisinin ortak kaynağı araştırılmalıdır.'],2,'Aynı iddianın tekrarı bağımsız doğrulama değildir.');
  await c.say('Her kaynağın bilgiyi nereden aldığını da incele.');
  await K.soru(c,'Fotoğrafın kökenini incelemek için hangi ek bilgi yararlıdır?',['Çekim kaydı ve belirtilen kaynak','Raporun yalnız başlığı','Fotoğrafın en çok paylaşılan hâli'],0,'Çekim ve kaynak kayıtları, görüntünün nereden geldiğini incelemeye yardım eder.');
  await c.say('Kanıtın bulunmasıyla onun yeterli olması farklı değerlendirmelerdir.');
  c.note('Kaynak sayısı değil, kanıtın niteliği belirler.','Doğrulama');
 }
 async function kayit(c){const s=c.svg(1000,562);K.kart(c,s,150,110,700,250,'Doğrulanabilir kayıt',['Üçüncü rapor: kaynakça yok.','Dayanak: incelenen rapor','Fotoğrafın kaynağı: belirsiz'],{renk:K.renkler.C});
  await c.say('Doğrudan verilen bilgiyi ve belirsizliği ayrı kaydet.');
  await K.soru(c,'Bu vakadan hangi kayıt yapılabilir?',['Kaynakça yok; fotoğraf kaynağı ayrıca araştırılmalı.','Hiçbir bilgi eksik değildir.','Bütün fotoğrafları kesin üçüncü grup çekmiştir.'],0,'Kanıtlanmış bilgi ve araştırılması gereken nokta ayrıdır.');
  await K.soru(c,'Eksik kaynakça için hangi kayıt daha ölçülüdür?',['Kaynakça yok; kullanılan kaynaklar doğrulanmalıdır.','Bütün bilgiler kesinlikle yanlıştır.','Kaynakların hepsi kesinlikle güvenilirdir.'],0,'Kaynakça eksikliği inceleme ihtiyacını gösterir; bütün bilgi hakkında kesin hüküm vermez.');
  await c.say('Doğrulanan bilgiyle araştırılması gereken nokta birlikte görünür kalır.');
  await c.say('Rapor hazırlama ve serbest kaynak araştırması sınıfta yapılır.');
  await c.say('İncele, doğrula, belirsizliği saklamadan kaydet.');
 }
 Ders.start({id:'yasam-c2',kicker:'Konu C · Bilim etiği',title:'Etik iddiasını doğrula, kaydet',accent:K.renkler.C,back:'index.html',intro:{title:'Etik iddiasını doğrula, kaydet',hook:'Bir raporun etik olduğuna hangi kanıtla karar verirsin?',button:'Derse başla ›'},goals:[],scenes:[{title:'Aracı seç',goal:'Soruyla ilişkili belgeyi belirle.',run:arac},{title:'Bilgiye ulaş',goal:'Vakanın verdiği bilgiyi ayır.',run:ulas},{title:'Doğrula',goal:'Kaynak tekrarını doğrulamadan ayır.',run:dogrula},{title:'Kaydet',goal:'Bilgi ve belirsizliği kaydet.',run:kayit}],quizTitle:'Çıkış soruları',quiz:[{q:'Kaynak gösterilip gösterilmediği nasıl incelenir?',options:['Rapor ve kaynakçayla','Paylaşım sayısıyla','Yalnız başlıkla'],answer:0,why:['Bu belgeler kullanılan kaynağı izlemeyi sağlar.','Paylaşım sayısı kaynağı göstermez.','Başlık bu bilgiyi vermez.'],scene:0},{q:'Aynı haberin iki kopyası neyi gösterir?',options:['Kesin bağımsız doğrulama','İncelemeye gerek olmadığını','Bağımsız doğrulama olmayabileceğini'],answer:2,why:['İki kopya aynı kaynağa dayanabilir.','Ortak kaynak araştırılmalıdır.','Bilginin kökeni ve kanıtı ayrıca incelenir.'],scene:2}],summary:['Kaynak sayısı değil, kanıtın niteliği belirler.']});
})();
