/* Kaynak: MEB Biyoloji 9, s. 17–19. Kapsam: BİY.9.1.1. */
(() => {
 'use strict';const K=KIT;
 async function saglik(c){
  const s=c.svg(1000,562);K.kart(c,s,230,115,540,225,'Sağlık',['Toplumsal sorun','Biyoloji araştırması'],{renk:K.renkler.A});K.kaynak(c,s,'17–19');
  await c.say('Biyoloji buluşları günlük yaşamda karşılaştığımız sorunlarla ilişkilidir.');
  await c.say('Bir dönüm noktası, sonraki araştırmaların yönünü değiştirir.');
  await c.say('Sağlıktaki bir araştırmayla başlayıp farklı buluşları inceleyeceğiz.');
  await K.soru(c,'Yeni bir buluşun topluma etkisini araştırırken hangi soru yararlıdır?',['Kimlerin hangi sorununun çözümüne katkı sağladı?','Buluşun adı kaç harflidir?','Araştırma kartının rengi nedir?'],0,'Bir katkı, etkilediği kişiler ve çözüme katkı sunduğu sorunla değerlendirilir.');
  K.temiz(s);K.kart(c,s,170,130,660,190,'Antibiyotik',['Bakteri kaynaklı hastalık','Tedavi'],{renk:K.renkler.A});K.kaynak(c,s,18);
  await c.say('Penisilin, bakteri kaynaklı hastalıkların tedavisine katkı sağladı.');
  await c.say('Bu keşif, cerrahi ve diğer tedavilerin güvenilirliğini de artırdı.');
  K.temiz(s);K.kart(c,s,170,130,660,190,'Aşı',['Hastalığa karşı korunma','Yeni nesil aşılar'],{renk:K.renkler.A});K.kaynak(c,s,19);
  await c.say('Yeni nesil aşılar, pandemiyle mücadelede toplum sağlığına katkı sundu.');
  await c.say('Bu katkı, toplum sağlığı açısından değerlendirilir.');
  c.note('Buluşun katkısını, çözdüğü sorunla eşleştir.','Dönüm noktası');
 }
 async function bilgi(c){const s=c.svg(1000,562);
  K.kart(c,s,180,120,640,210,'Kalıtım',['Ebeveyn → yavru','Özelliklerin aktarımı'],{renk:K.renkler.A});K.kaynak(c,s,18);
  await c.say('Mendel’in çalışmaları, özelliklerin nesiller arasındaki aktarımını anlamaya katkı sağladı.');
  await c.say('Bu kart, bir tedaviyi değil bilgi birikimini gösterir.');
  
  K.temiz(s);K.kart(c,s,180,120,640,210,'DNA’nın yapısı',['Çift sarmal','Genetik materyalin saklanması'],{renk:K.renkler.A});K.kaynak(c,s,18);
  await c.say('Çift sarmalın belirlenmesi, genetik materyalin anlaşılmasını geliştirdi.');
  await K.soru(c,'DNA yapısının bilinmesi hangi yeni çalışmaya temel olabilir?',['Genetik materyalle ilgili yeni soruların incelenmesine','Kalıtım araştırmalarını tamamen bitirmeye','Her bireyin özelliklerini aynı yapmaya'],0,'Bir yapıyı anlamak, onunla ilgili yeni soruları araştırmayı mümkün kılar.');
  await c.say('Bir buluş yeni soruları ve yeni araştırmaları da açabilir.');
 }
 async function teknik(c){const s=c.svg(1000,562);
  const cards=[['Rekombinant DNA','Genetik materyalin aktarılması','Tıp, tarım, endüstri'],['PZR','Belirli DNA dizisinin çoğaltılması','Genetik araştırmalar'],['Klonlama','Genetik kopyaların üretilmesi','Araştırma olanakları']];
  for(const [ad,a,b] of cards){K.temiz(s);K.kart(c,s,110,115,780,230,ad,[a,b],{renk:K.renkler.A});K.kaynak(c,s,19);
   await K.belir(c,s.firstChild);await c.say(ad==='PZR'?'PZR, araştırılacak belirli DNA dizisinin çoğaltılmasını sağlar.':ad==='Klonlama'?'Klonlama, organizmaların genetik kopyalarının üretilmesine olanak sağlar.':'Rekombinant DNA teknolojisi, genetik materyalin aktarılmasına olanak sağlar.');
   await c.say('Katkıyı düşünürken teknolojinin neyi mümkün kıldığına bak.');await c.cont('Sonraki buluş ›');}
  await K.soru(c,'Az miktardaki belirli DNA dizisini çoğaltan teknik hangisidir?',['Klonlama','PZR','Aşı'],1,'PZR belirli DNA dizisini çoğaltmak için kullanılır.');
 }
 async function genom(c){const s=c.svg(1000,562);K.kart(c,s,170,100,660,200,'İnsan genom projesi',['İnsan DNA dizisi','Genetik araştırmalar'],{renk:K.renkler.A});K.kaynak(c,s,19);
  await c.say('İnsan genom projesi, insanın DNA dizisinin ortaya çıkarılmasını sağladı.');
  await c.say('Bu bilgi, genetik araştırmalar için yeni bir temel oluşturdu.');
  
  K.temiz(s);K.kart(c,s,170,100,660,240,'CRISPR-Cas',['Kontrollü gen düzenleme','Gen tedavisi','Bitki ve hayvanlarda iyileştirme'],{renk:K.renkler.A});K.kaynak(c,s,19);
  await c.say('CRISPR-Cas, istenilen gen bölgesinde kontrollü düzenlemeye olanak sağlar.');
  await c.say('Bu teknoloji sağlık ve tarım alanlarında kullanılabilir.');
  await K.soru(c,'Genom projesi ile CRISPR-Cas’ın katkısı nasıl ayrılır?',['Biri dizi bilgisi sağlar; diğeri kontrollü düzenlemeye olanak verir.','İkisi de yalnız DNA çoğaltır.','İkisi de bütün hastalıkları bitirir.'],0,'İnsan genom projesi dizi bilgisi, CRISPR-Cas kontrollü gen düzenlemesiyle ilişkilidir.');
  await c.say('Bu katkılar, her sorunun çözüldüğü anlamına gelmez.');
 }
 async function bakis(c){const s=c.svg(1000,562);K.kart(c,s,170,100,660,165,'Biyolojiye katkı',['Akşemseddin · bilim insanları'],{renk:K.renkler.A});K.kaynak(c,s,'17–19');
  await c.say('Akşemseddin, biyoloji alanına katkı sağlayan bilim insanları arasındadır.');
  K.temiz(s);['Sağlık','Çevre','Enerji','Gıda'].forEach((a,i)=>K.kart(c,s,80+i*230,180,210,140,a,[],{renk:K.renkler.A}));K.kaynak(c,s,17);
  await c.say('Katkılar sağlık, çevre, enerji ve gıda sorunlarıyla ilişkilendirilebilir.');
  await c.say('Çevrenin korunması ve tarımsal verimlilik de biyolojik araştırmalardan yararlanır.');
  await K.soru(c,'Tarımsal verimliliği artıran bir buluş hangi açıdan değerlendirilebilir?',['Yalnız laboratuvar araçlarının rengi','Gıda üretimi ve çevreye etkisi','Yalnız araştırmacının adı'],1,'Aynı katkı, gıda üretimi ve çevre açısından değerlendirilebilir.');
  await c.say('Her dönüm noktası, bir sorunun çözümüne katkı sunar.');
 }
 Ders.start({id:'yasam-a1',kicker:'Konu A · Biyolojinin dönüm noktaları',title:'Bir buluş, bir sorunu çözer',accent:K.renkler.A,back:'index.html',intro:{title:'Bir buluş, bir sorunu çözer',hook:'Bir biyoloji buluşu hangi soruna çözüm getirir?',button:'Derse başla ›'},goals:[],scenes:[
 {title:'Sağlık sorunu',goal:'Buluşla katkıyı ilişkilendir.',run:saglik},{title:'Bilginin katkısı',goal:'Kalıtım ve DNA katkılarını değerlendir.',run:bilgi},{title:'Yeni teknikler',goal:'Üç tekniğin katkısını ayırt et.',run:teknik},{title:'Genetik araştırmalar',goal:'Genom ve düzenleme katkısını ayır.',run:genom},{title:'Farklı bakış açıları',goal:'Katkıyı toplumla ilişkilendir.',run:bakis}],quizTitle:'Çıkış soruları',quiz:[
 {q:'PZR hangi katkıyı sağlar?',options:['Belirli DNA dizisini çoğaltma','Bütün hastalıkları önleme','Her genin işlevini değiştirme'],answer:0,why:['PZR, belirli DNA dizisini çoğaltır.','PZR bir aşı değildir.','PZR gen düzenlemesi değildir.'],scene:2},
 {q:'Bir tarım buluşunun katkısı değerlendirilirken neye bakılır?',options:['Yalnız buluşun adına','Gıda üretimi ve çevreye etkisine','Yalnız araştırmacının yaşına'],answer:1,why:['Ad, katkının kanıtı değildir.','Katkı farklı bakış açılarıyla değerlendirilir.','Yaş, buluşun toplumsal katkısını açıklamaz.'],scene:4}],summary:['Her dönüm noktası, bir sorunun çözümüne katkı sunar.'],nextLesson:{href:'a2-soru-ve-kaynak.html',label:'Sonraki: Soru ve kaynak ›'}});
})();
