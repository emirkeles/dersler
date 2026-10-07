/* MEB Biyoloji 9 s.67,79,82–83. Eğri nitel model; ölçüm verisi değildir. */
(() => {'use strict';const K=KIT;
 function kosullar(c,s){[['2. tüp','37 °C'],['4. tüp','5 °C'],['5. tüp','80 °C']].forEach(([ad,v],i)=>K.kart(c,s,55+i*315,110,290,190,ad,[v,'pH 7'],{renk:K.renkler.H}));K.yazi(c,s,500,385,'Miktarlar eşit');K.yazi(c,s,500,460,'Karaciğer özütü · balon');}
 async function karsilastir(c){const s=c.svg(1000,562);K.kart(c,s,170,100,660,220,'Sıcaklık deneyi',['Koşullar','Kontrollü karşılaştırma'],{renk:K.renkler.H});
  await c.say('Bir enzimi farklı sıcaklıklarda karşılaştıracağız.');
  await c.say('Bu karşılaştırmada ortam pH’si ve madde miktarları önemlidir.');
  await K.soru(c,'Sıcaklığın etkisini hangi düzen izole eder?',['Sıcaklık farklı, pH ve miktarlar aynı.','Sıcaklık ve pH birlikte farklı.','Enzim miktarı her tüpte farklı.'],0,'Yalnız sıcaklık değişirse sıcaklık etkisi karşılaştırılır.');
  K.temiz(s);kosullar(c,s);await c.say('Bu örnekte karaciğer özütü ve balon kullanılan tüpler karşılaştırılır.');
  await c.say('Balon hacmindeki değişim, tepkimede oluşan gazla ilişkilidir.');
  await c.say('Üç koşulda sıcaklık değişir; pH ve miktarlar eşittir.');
  await c.say('Bu tablo deney koşullarını verir; ölçülen balon hacmini vermez.');
  c.note('Sıcaklık değişir; pH, miktarlar ve süre sabit kalır.','Sıcaklık deneyi');
 }
 async function etki(c){const s=c.svg(1000,562);K.kart(c,s,65,85,400,110,'Düşük sıcaklık',[],{renk:'#3cc8e8'});K.kart(c,s,535,85,400,110,'Yüksek sıcaklık',[],{renk:K.renkler.H});
  const a=c.S('circle',{cx:140,cy:300,r:34,fill:'#3cc8e8'},s);const b=c.S('circle',{cx:375,cy:300,r:20,fill:'#f5b04c'},s);const enz=c.S('path',{d:'M 610 335 Q 570 230 670 235 Q 745 225 750 310 Q 690 300 680 345 Z',fill:'#ec9ec4'},s);
  await c.tween(1800,e=>b.setAttribute('cx',375-70*e));
  await c.say('Soğukta moleküllerin etkileşimleri yavaşlar; aktivite azalabilir.');
  await c.say('Düşük sıcaklık, enzimin yapısını mutlaka bozmaz.');
  await c.tween(1100,e=>{const a=[610,335,570,230,670,235,745,225,750,310,690,300,680,345],b=[620,365,650,250,710,300,790,320,805,365,720,390,650,375];const v=a.map((n,i)=>n+(b[i]-n)*e);enz.setAttribute('d',`M ${v[0]} ${v[1]} Q ${v[2]} ${v[3]} ${v[4]} ${v[5]} Q ${v[6]} ${v[7]} ${v[8]} ${v[9]} Q ${v[10]} ${v[11]} ${v[12]} ${v[13]} Z`);});
  await c.say('Yüksek sıcaklık protein yapılı enzimin biçimini bozabilir.');
  await K.soru(c,'Soğuk ile aşırı sıcağın etkisi neden aynı sayılmaz?',['Soğukta yavaşlama, aşırı sıcakta yapı bozulması olabilir.','İkisi de her zaman aktiviteyi artırır.','İkisi de enzimi mutlaka aynı şekilde bozar.'],0,'Yavaşlayan etkileşim ile denatürasyon farklı durumlardır.');
  K.yazi(c,s,265,420,'Yavaş etkileşim');K.yazi(c,s,735,420,'Denatürasyon');
 }
 async function egri(c){const s=c.svg(1000,562);K.yazi(c,s,500,65,'Nitel sıcaklık modeli');K.ok(c,s,120,435,900,435);K.ok(c,s,120,435,120,135);K.yazi(c,s,500,505,'Sıcaklık (°C)');K.yazi(c,s,290,110,'Enzim aktivitesi');
  K.kutu(c,s,490,135,59.17,290,{fill:'#ec9ec4',renk:'#ec9ec4',rx:0}).style.opacity=.13;
  const egri=c.S('path',{d:'M 135 420 C 255 320 400 160 535 145 C 665 145 760 285 845 420',fill:'none',stroke:K.renkler.H,'stroke-width':6},s);
  [5,35,65].forEach((v,i)=>K.yazi(c,s,[135,490,845][i],470,String(v),{size:27}));K.yazi(c,s,535,95,'Optimum');
  const nok=c.S('circle',{cx:135,cy:420,r:11,fill:'#f5b04c'},s);
  await c.say('Aktivite uygun sıcaklığa kadar artabilir, sonra azalabilir.');
  await c.say('Bu nitel model, gerçek kabarcık sayısı göstermez.');
  c.slider({label:'Modelde sıcaklık',min:5,max:65,step:5,value:5,fmt:v=>v+' °C',onInput:v=>{const x=135+(v-5)/60*710;let lo=0,hi=egri.getTotalLength();for(let i=0;i<20;i++){const mid=(lo+hi)/2;if(egri.getPointAtLength(mid).x<x)lo=mid;else hi=mid;}const p=egri.getPointAtLength((lo+hi)/2);nok.setAttribute('cx',p.x);nok.setAttribute('cy',p.y);}});
  await c.say('Sıcaklığı değiştir; yükselen ve düşen bölgeyi karşılaştır.',{noWait:true});await c.cont('Karşılaştırdım ›');
  await K.soru(c,'Bu eğri bütün enzimler için aynı optimumu kanıtlar mı?',['Evet, her enzim aynıdır.','Hayır, uygun koşul enzime bağlıdır.','Evet, tüm ölçümler tamamlandı.'],1,'Farklı enzimlerin uygun sıcaklıkları farklı olabilir.');
 }
 async function aktar(c){const s=c.svg(1000,562);K.kart(c,s,100,130,370,200,'Mayalanma',['Uygun sıcaklık'],{renk:K.renkler.H});K.kart(c,s,530,130,370,200,'Gıda saklama',['Düşük aktivite'],{renk:'#3cc8e8'});
  await c.say('Mayalanmada uygun sıcaklık, enzimatik süreçlerin gerçekleşmesine katkı sağlar.');
  await c.say('Gıdalar soğukta saklandığında birçok enzimatik süreç yavaşlar.');
  await c.say('Maya ve ters silindir kullanılan diğer yöntemde kabarcıklar sayılır.');
  await K.soru(c,'Maya–silindir yönteminde tabloya hangi veri yazılır?',['Her koşulda beş dakika boyunca ölçülen kabarcık sayısı','Bu eğriden uydurulan kabarcık sayısı','Yalnız gıdanın adı'],0,'Maya–silindir yönteminde her koşulun beş dakikalık kabarcık ölçümü kaydedilir.');
  await c.say('Ölçüm tablosundan çizilen grafik, koşulların karşılaştırılmasını sağlar.');
  await c.say('Sıcaklığın etkisi, koşula ve enzime bağlıdır.');
 }
 Ders.start({id:'yasam-h2',kicker:'Konu H · Enzim deneyi',title:'Sıcaklık ve enzim',accent:K.renkler.H,back:'index.html',intro:{title:'Sıcaklık ve enzim',hook:'Soğuk ve çok sıcak ortam enzimi aynı yolla mı etkiler?',button:'Derse başla ›'},goals:[],scenes:[{title:'Kontrollü koşullar',goal:'Koşulları karşılaştır.',run:karsilastir},{title:'İki farklı etki',goal:'Yavaşlama ile denatürasyonu ayır.',run:etki},{title:'Nitel eğri',goal:'Eğrinin bölgelerini keşfet.',run:egri},{title:'Günlük yaşam',goal:'Koşulları günlük yaşamla ilişkilendir.',run:aktar}],quizTitle:'Çıkış soruları',quiz:[{q:'Düşük sıcaklık enzimi nasıl etkileyebilir?',options:['Aktivitesini yavaşlatır.','Mutlaka kalıcı olarak bozar.','Her zaman hızlandırır.'],answer:0,why:['Moleküler etkileşimler yavaşlayabilir.','Soğuk enzimi mutlaka denatüre etmez.','Aktivite düşük sıcaklıkta azalabilir.'],scene:1},{q:'Sıcaklık etkisi için hangi tüpler karşılaştırılır?',options:['2, 3, 6: pH değişen','2, 4, 5: sıcaklık değişen','2, 7, 8: miktarlar değişen'],answer:1,why:['Bu karşılaştırma pH içindir.','Sabit pH ve miktarlarda sıcaklık değişir.','Miktarlar eşit olmadığı için yalnız sıcaklık etkisi ayrılamaz.'],scene:0}],summary:['Sıcaklığın etkisi, koşula ve enzime bağlıdır.'],nextLesson:{href:'h3-ph-ve-enzim.html',label:'Sonraki: pH ›'}});
})();
