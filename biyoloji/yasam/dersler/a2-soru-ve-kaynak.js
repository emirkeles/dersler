/* Kaynak: MEB Biyoloji 9, s. 19–20; BİY.9.1.1 b,c,ç. */
(() => {'use strict';const K=KIT;
 async function ihtiyac(c){const s=c.svg(1000,562);K.kart(c,s,170,100,660,230,'PZR araştırması',['Bildiklerim','Merak ettiklerim'],{renk:K.renkler.A});K.kaynak(c,s,'19–20');
  await c.say('Bir buluş hakkında araştırmaya başlamadan bilgi ihtiyacını belirle.');
  await c.say('Öğrenme tablosu, bildiklerini ve merak ettiklerini ayrı tutar.');
  await c.say('Bu sahnede araştırma sorusu seçeceğiz; sonuç henüz yazılmayacak.');
  await K.soru(c,'PZR’nin katkısını araştırmak için hangi soru uygundur?',['PZR genetik araştırmaya nasıl katkı sağlar?','PZR sözcüğü kaç harflidir?','PZR kesinlikle her hastalığı bitirir mi?'],0,'Katkıyı araştıran soru bilgi ihtiyacını belirler.');
  K.temiz(s);K.kart(c,s,100,120,370,210,'Ne Biliyorum?',['DNA çoğaltma tekniği'],{renk:K.renkler.A});K.kart(c,s,530,120,370,210,'Ne Bilmek İstiyorum?',['Araştırmaya katkısı?'],{renk:K.renkler.A});K.kaynak(c,s,20);
  await c.say('Bildiklerini ayrı kaydet; yeni soruyu bilgiyle karıştırma.');
  await c.say('Ne öğrendim bölümünü araştırmanın sonunda dolduracağız.');
  c.note('Önce bilgi ihtiyacını belirle: PZR’nin katkısı?','Araştırma sorusu');
 }
 async function kaynak(c){const s=c.svg(1000,562);K.kart(c,s,150,120,700,210,'Kaynak kartı',['MEB ders kitabı','PZR’nin genetik araştırmalara katkısı'],{renk:K.renkler.A});K.kaynak(c,s,20);
  await c.say('Bilgiyi bulduğun yer, daha sonra yeniden incelenebilmelidir.');
  await c.say('Araştırmada yararlandığın kaynakları not etmek, bilgiyi izlenebilir kılar.');
  await K.soru(c,'Bu karttan alınan bilgiyi nasıl kaydetmelisin?',['Bilgi ve kaynağını birlikte yazarak','Yalnız kesin doğru diye','Yalnız başka biri söyledi diye'],0,'Bilgi ve kaynağını birlikte kaydetmek, yeniden incelemeyi sağlar.');
  K.temiz(s);K.kart(c,s,150,120,700,210,'Bilgi + kaynak',['Belirli DNA dizisi çoğaltılır.','Kaynak: MEB Biyoloji ders kitabı'],{renk:K.renkler.A});
  await c.say('Kaynak göstermek, iddianın izlenebilir olmasını sağlar.');
  await c.say('Kaydı olmayan bir ifade daha zor doğrulanır.');
  await c.cont('Kaydı incele ›');
 }
 async function sinama(c){const s=c.svg(1000,562);
  for(const [ad,lines] of [['Editör incelemesi',['Kaynak değerlendirilmiş mi?']],['Uzman görüşü',['Alan uzmanı incelemiş mi?']],['Güncellik',['Son gelişmeleri yansıtıyor mu?']]]){K.temiz(s);K.kart(c,s,160,120,680,210,ad,lines,{renk:K.renkler.A});K.kaynak(c,s,20);await c.say('Bir kaynağı değerlendirirken birden çok ölçüte bakılır.');await c.cont('Sonraki ölçüt ›');}
  await K.soru(c,'Bir .gov uzantısı tek başına neyi kanıtlar?',['Bütün iddiaların değişmez doğruluğunu','Kaynağın adresine dair bir ölçütü','Konuyla ilgili her sorunun cevaplandığını'],1,'Adres bir ölçüttür; uzmanlık, inceleme ve güncellik de değerlendirilir.');
  await c.say('Kaynak güvenilirliği tek bir işarete indirgenmez.');
  c.note('Uzmanlık, değerlendirme ve güncellik birlikte sorgulanır.','Kaynağı sına');
 }
 async function sec(c){const s=c.svg(1000,562);K.kart(c,s,150,130,700,200,'İki kaynak kartı',['Kitap: DNA dizisini çoğaltır.','İsimsiz ileti: her sorunu çözer.'],{renk:K.renkler.A});K.kaynak(c,s,'19–20');
  await c.say('İsimsiz ileti bu dersteki kurgu iddia kartıdır.');
  await c.say('Diğer kart, adı belli bir eğitim kaynağına dayanır.');
  await K.soru(c,'Hangisi doğrulanabilir katkı bilgisi sunar?',['İsimsiz iletideki sınırsız iddia','Kitaptaki sınırlı katkı açıklaması','İkisi de kaynak olmadan eşdeğerdir'],1,'Kitap kartı kaynağı ve sınırlı katkıyı gösterir.');
  await c.say('Soru sor, kaynağı sına, bilgiyi kaynağıyla kaydet.');
 }
 Ders.start({id:'yasam-a2',kicker:'Konu A · Biyolojinin dönüm noktaları',title:'Soru sor, kaynağını sına',accent:K.renkler.A,back:'index.html',intro:{title:'Soru sor, kaynağını sına',hook:'Bir buluş hakkında neyi, hangi kaynaktan öğrenirsin?',button:'Derse başla ›'},goals:[],scenes:[{title:'Bilgi ihtiyacı',goal:'Bir araştırma sorusu seç.',run:ihtiyac},{title:'Kaynak kaydı',goal:'Bilgiyi izlenebilir kaydet.',run:kaynak},{title:'Kaynağı sına',goal:'Güvenilirliği ölçütlerle değerlendir.',run:sinama},{title:'Kanıtı seç',goal:'Bilgi kartlarını karşılaştır.',run:sec}],quizTitle:'Çıkış soruları',quiz:[{q:'Araştırmaya başlarken hangi sütun doldurulur?',options:['Ne Bilmek İstiyorum?','Ne Öğrendim? kesin sonucu','Yalnız araştırmacının adı'],answer:0,why:['Önce bilgi ihtiyacı belirlenir.','Araştırma bitmeden sonuç yazılmaz.','Bu bilgi araştırma sorusunun yerini tutmaz.'],scene:0},{q:'Güvenilir bilgi kaydı hangisidir?',options:['Kesin doğrudur, kaynak gereksizdir.','Çok paylaşıldı, o yüzden doğrudur.','İddia, kaynak ve sayfa birlikte yazılmıştır.'],answer:2,why:['İddia yine sorgulanmalıdır.','Paylaşım sayısı bilimsel kanıt değildir.','Kaydı yeniden inceleyip değerlendirebilirsin.'],scene:1}],summary:['Bilgi ihtiyacını belirle, kaynağı sına, kaydı tut.'],nextLesson:{href:'a3-kanittan-cikarima.html',label:'Sonraki: Kanıttan çıkarıma ›'}});
})();
