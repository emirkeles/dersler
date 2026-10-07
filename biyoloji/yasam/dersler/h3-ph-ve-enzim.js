/* MEB Biyoloji 9 s.67,82–83. Grafikler nitel; katalaz ölçümü değildir. */
(() => {'use strict';const K=KIT;
 function ciz(c,s){K.yazi(c,s,500,60,'İki enzimin nitel pH modeli');K.ok(c,s,130,420,900,420);K.ok(c,s,130,420,130,140);K.yazi(c,s,540,505,'Ortam pH değeri');K.yazi(c,s,300,110,'Enzim aktivitesi');
  c.S('path',{d:'M 140 410 C 190 405 185 220 290 165 C 380 185 420 390 465 410',fill:'none',stroke:'#3cc8e8','stroke-width':5},s);
  c.S('path',{d:'M 505 410 C 590 390 600 210 715 165 C 820 190 835 375 890 410',fill:'none',stroke:K.renkler.H,'stroke-width':5},s);
  K.yazi(c,s,290,150,'Mide enzimi',{renk:'#3cc8e8'});K.yazi(c,s,715,150,'Bağırsak enzimi',{renk:K.renkler.H});[1,4,7,10].forEach((v,i)=>K.yazi(c,s,140+i*250,460,String(v),{size:28}));
 }
 async function soru(c){const s=c.svg(1000,562);K.kart(c,s,170,110,660,210,'Ortam pH’si',['Farklı koşullar','Enzim aktivitesi'],{renk:K.renkler.H});
  await c.say('pH, enzim deneyinde incelenen bir ortam koşuludur.');
  await c.say('Enzimlerin aktivitesi aynı koşullarda karşılaştırılarak değerlendirilebilir.');
  await K.soru(c,'Farklı enzimlerin en etkin pH değeri için hangisi sınanmalıdır?',['Hepsi kesinlikle 7’de en etkindir.','Farklı enzimlerde farklı olabilir.','pH hiçbir enzimi etkilemez.'],1,'Farklı enzimler farklı pH koşullarında en etkin olabilir.');
  K.temiz(s);ciz(c,s);await c.say('Mide ve bağırsak enzimleri farklı ortam koşullarında çalışır.');
  await c.say('Nötr pH, her enzim için ortak optimum değildir.');
  c.note('Aynı pH, her enzim için aynı etkiyi vermez.','pH ve enzim');
 }
 async function model(c){const s=c.svg(1000,562);ciz(c,s);const marker=K.cizgi(c,s,140,160,140,420,'#f5b04c',{width:3});
  await c.say('Eğriler, farklı pH bölgelerinde etkinlik gösterebilir.');
  await c.say('Bunlar nitel modellerdir; katalazın ölçülmüş kabarcık sayıları değildir.');
  c.slider({label:'Modelde ortam pH’si',min:1,max:10,step:1,value:1,onInput:v=>{const x=140+(v-1)/9*750;marker.setAttribute('x1',x);marker.setAttribute('x2',x);}});
  await c.say('İşareti kaydır; iki eğride aynı pH’yı karşılaştır.',{noWait:true});await c.cont('Karşılaştırdım ›');
  await K.soru(c,'Asidik bölgede iki enzimin aktivitesi nasıl yorumlanır?',['İkisinde de mutlaka aynıdır.','Eğrilere göre farklı olabilir.','İkisinde de mutlaka sıfırdır.'],1,'Aynı ortam pH’si farklı enzimlerde farklı etkinlikle ilişkilidir.');
 }
 async function deney(c){const s=c.svg(1000,562);[['2. tüp','pH 7'],['3. tüp','pH 4'],['6. tüp','pH 12']].forEach(([a,v],i)=>K.kart(c,s,55+i*315,110,290,190,a,[v,'37 °C'],{renk:K.renkler.H}));K.yazi(c,s,500,385,'Miktarlar eşit');K.yazi(c,s,500,460,'Karaciğer özütü · balon');
  await c.say('Karaciğer özütü ve balon kullanılan bu örnekte pH karşılaştırılır.');
  await c.say('Balon hacmindeki değişim, oluşan gazla ilişkilidir.');
  await c.say('Bu tüplerde sıcaklık, madde miktarları ve ölçüm süresi eşit tutulur.');
  await K.soru(c,'Bu koşul tablosundan katalazın kesin optimumu çıkarılabilir mi?',['Hayır; aktivite ölçümleri de gerekir.','Evet; pH 7 her enzim için optimumdur.','Evet; sıcaklık sayısı yeterlidir.'],0,'Koşul tablosu sonuç verisi değildir; aynı sürede aktivite ölçülmelidir.');
  await c.say('Maya–silindir yönteminde ise beş dakikalık kabarcık sayısı kaydedilir.');
  await c.say('Bu sayılar tablo ve grafikte karşılaştırılarak yorumlanır.');
 }
 async function mide(c){const s=c.svg(1000,562);K.kart(c,s,120,120,760,230,'Günlük yaşam ilişkisi',['Mide ortamının pH’si','Sindirim enziminin aktivitesi'],{renk:K.renkler.H});
  await c.say('Mide asitliğini değiştiren beslenme alışkanlıkları enzim koşullarını etkileyebilir.');
  await K.soru(c,'Bu ilişkiden hangi sınırlı yorum yapılabilir?',['Ortam pH’si enzim aktivitesiyle ilişkilidir.','Her besin bütün enzimleri aynı etkiler.','Bir enzim sonucu bütün enzimlere aynen genellenir.'],0,'Yorum enzime ve ortam koşuluna bağlı kalmalıdır.');
  await c.say('Bir deneyin sonuçları bütün enzimlere aynen genellenemez.');
  await c.say('Aynı pH, her enzim için aynı etkiyi vermez.');
 }
 Ders.start({id:'yasam-h3',kicker:'Konu H · Enzim deneyi',title:'pH ve enzim',accent:K.renkler.H,back:'index.html',intro:{title:'pH ve enzim',hook:'Her enzim aynı pH değerinde mi en iyi çalışır?',button:'Derse başla ›'},goals:[],scenes:[{title:'Farklı enzimler',goal:'Ortak optimum yanılgısını sorgula.',run:soru},{title:'Nitel eğriyi oku',goal:'Aynı pH’de iki eğriyi karşılaştır.',run:model},{title:'Katalaz koşulları',goal:'Koşul ile ölçüm sonucunu ayır.',run:deney},{title:'Günlük yaşam',goal:'pH etkisini sınırlı yorumla.',run:mide}],quizTitle:'Çıkış soruları',quiz:[{q:'Farklı enzimlerin optimum pH değerleri nasıl olabilir?',options:['Her zaman 7’dir.','Her zaman aynıdır.','Farklı olabilir.'],answer:2,why:['Nötr pH her enzim için optimum değildir.','Farklı enzimler farklı koşullarda çalışabilir.','Optimum değer enzime bağlıdır.'],scene:0},{q:'pH etkisi için hangi tüpler karşılaştırılır?',options:['2, 3, 6: pH değişen','2, 4, 5: sıcaklık değişen','2, 7, 8: miktarlar değişen'],answer:0,why:['Sıcaklık ve miktarlar eşitken pH değişir.','Bu karşılaştırma sıcaklık içindir.','Miktarlar eşit olmadığı için yalnız pH etkisi ayrılamaz.'],scene:2}],summary:['Aynı pH, her enzim için aynı etkiyi vermez.']});
})();
