/* Kaynak: MEB Biyoloji 9, s. 18–20; BİY.9.1.1 d. */
(() => {'use strict';const K=KIT;
 async function kanit(c){const s=c.svg(1000,562);K.kart(c,s,150,120,700,220,'Dönüm noktası kartları',['Araştırma bilgisi','İnsan yaşamına katkı'],{renk:K.renkler.A});K.kaynak(c,s,'18–20');
  await c.say('Bir buluş hakkında bilgi topladıktan sonra katkısını yorumlarız.');
  await c.say('Çıkarım, topladığımız bilgiden ulaştığımız sonuçtur.');
  await c.say('Bu sonuç, kullanılan bilginin sınırlarını korumalıdır.');
  await K.soru(c,'Penisilin tedaviye katkı sağladı bilgisinden hangisi çıkarılabilir?',['Her hastalık artık önlenir.','Bakteri kaynaklı hastalıkların tedavisi gelişmiştir.','Hiçbir araştırma gerekli değildir.'],1,'Katkı belirli bir alandadır; bütün hastalıklara genellenemez.');
  K.temiz(s);K.kart(c,s,70,150,390,175,'Kanıt',['Penisilin keşfi'],{renk:K.renkler.A});K.ok(c,s,465,240,535,240);K.kart(c,s,540,150,390,175,'Çıkarım',['Tedavide gelişme'],{renk:K.renkler.A});K.kaynak(c,s,'17–18');
  await c.say('Katkıyı belirtmek, bütün sorunların çözüldüğünü söylemek değildir.');
  await c.say('Bir kayıt, desteklenen sonuçla henüz bilinmeyeni ayrı tutmalıdır.');
  await K.soru(c,'Penisilinin tedavi katkısı biliniyor. Hangi sonuç henüz desteklenmez?',['Bakteri kaynaklı hastalıkların tedavisinde gelişme','Bu buluşun her hastalığı önlediği','Cerrahi tedavinin güvenilirliğine katkı'],1,'Kaynak bilgi, bütün hastalıkların önlendiğini göstermez.');
  await c.say('Kanıt, belirli bir katkıyı destekler; sınırsız bir sonucu değil.');
  c.note('Çıkarım, kanıtın sınırlarını korur.','Kanıttan çıkarım');
 }
 async function iliski(c){const s=c.svg(1000,562);K.kart(c,s,110,120,780,220,'Rekombinant DNA',['Genetik materyalin aktarılması','Tıp · tarım · endüstri'],{renk:K.renkler.A});K.kaynak(c,s,19);
  await c.say('Bir teknolojinin katkısı farklı alanlarda ortaya çıkabilir.');
  await c.say('Rekombinant DNA, tıp, tarım ve endüstri alanlarında katkı sağlar.');
  await K.soru(c,'Bu bilgilerden hangi çıkarım desteklenir?',['Biyoloji yalnız hastanelerde kullanılır.','Tek bir buluş farklı alanlara katkı sağlayabilir.','Tarımın biyolojiyle ilişkisi yoktur.'],1,'Kaynak aynı teknolojinin farklı alanlardaki katkısını gösteriyor.');
  K.temiz(s);K.kart(c,s,200,130,600,200,'Farklı bakış açıları',['Sağlık','Gıda üretimi','Çevrenin korunması'],{renk:K.renkler.A});K.kaynak(c,s,17);
  await c.say('Aynı katkıyı değerlendirirken farklı toplumsal ihtiyaçlara bakabiliriz.');
  await c.say('Enerji alanı da biyolojik araştırmaların katkısıyla ilişkilendirilebilir.');
  await c.say('Araştırmanın etkisini değerlendirirken hangi bakış açısını kullandığını belirt.');
  await K.soru(c,'Tarımsal verim artışı hakkında farklı bakış açıları hangisidir?',['Gıda üretimi ve doğal kaynakların kullanımı','Yalnız aynı cümleyi iki kez yazmak','Yalnız buluşun adını değiştirmek'],0,'Gıda ihtiyacı ve çevresel kaynaklar aynı katkının farklı yönleridir.');
  await c.say('Farklı bakış açısı, kaynağın söylemediği sonucu eklemek değildir.');
  await c.cont('Çıkarımı düşün ›');
 }
 async function kaydet(c){const s=c.svg(1000,562);K.kart(c,s,150,110,700,235,'Ne Öğrendim?',['Bilgi → katkı → çıkarım','Kaynak: MEB Biyoloji ders kitabı'],{renk:K.renkler.A});
  await c.say('Araştırmadan sonra öğrenme tablosunun son sütunu doldurulur.');
  await K.soru(c,'Ne öğrendim sütununa hangi ifade uygundur?',['PZR genetik araştırmalar için DNA çoğaltmayı sağlar.','PZR hakkında henüz ne soracağımı bilmiyorum.','Kaynak okumadan her şeyi öğrendim.'],0,'Bu ifade, araştırmada ulaşılan katkıyı kaydeder.');
  await c.say('Kayıt, öğrenilen bilgiyi önceki merak sorusuyla ilişkilendirir.');
  await K.soru(c,'PZR’nin katkısını araştırdın. Hangi kayıt kapsamı korur?',['DNA çoğaltma araştırmaya katkı sunar; her sorunu çözdüğü bilinmez.','Artık genetik araştırma gerekmez.','PZR her geni değiştirir.'],0,'Bilgiye dayanan katkı ile desteklenmeyen genelleme ayrı tutulur.');
  await c.say('Ne öğrendim kaydı, cevaplanan soruyu ve sonucun sınırını gösterir.');
  await c.say('Bilinmeyeni, kesin bilgi gibi yazmak çıkarımı aşar.');
  await c.say('Sınıftaki tartışma ve öğrenme günlüğü ayrıca yapılır.');
  await c.say('Bilgi toplanır, çıkarım kanıta dayanır.');
 }
 Ders.start({id:'yasam-a3',kicker:'Konu A · Biyolojinin dönüm noktaları',title:'Bilgiden çıkarıma',accent:K.renkler.A,back:'index.html',intro:{title:'Bilgiden çıkarıma',hook:'Bir buluşun katkısı hakkında hangi çıkarım kanıta dayanır?',button:'Derse başla ›'},goals:[],scenes:[{title:'Kanıtın sınırı',goal:'Desteklenen çıkarımı seç.',run:kanit},{title:'Toplumsal katkı',goal:'Katkıyı farklı alanlarla ilişkilendir.',run:iliski},{title:'Öğrenileni kaydet',goal:'Son sütun için çıkarım seç.',run:kaydet}],quizTitle:'Çıkış soruları',quiz:[{q:'Katkıdan çıkarım yaparken ne korunmalıdır?',options:['Kanıtın kapsamı','En iddialı söz','Kaynak göstermemek'],answer:0,why:['Çıkarım kaynakta desteklenen sınırı korur.','İddialı olmak kanıt değildir.','Kaynak izlenebilir olmalıdır.'],scene:0},{q:'Ne Öğrendim? bölümü ne zaman doldurulur?',options:['Soruyu seçmeden önce','Bilgi toplayıp değerlendirdikten sonra','Kaynağı okumadan önce'],answer:1,why:['Önce soru ve bilgi ihtiyacı belirlenir.','Bilgi toplandıktan ve değerlendirildikten sonra öğrenilenler kaydedilir.','Kaynak görülmeden bilgi değerlendirilmez.'],scene:2}],summary:['Bilgi toplanır, çıkarım kanıta dayanır.']});
})();
