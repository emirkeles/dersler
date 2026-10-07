/* Kaynak: MEB Biyoloji 9, s. 79–83; BİY.9.1.8 a. */
(() => {'use strict';const K=KIT;
 function duzenek(c,s){
  K.kutu(c,s,110,225,180,215,{rx:25,fill:'none',renk:K.renkler.H});K.kutu(c,s,118,325,164,106,{fill:'#647dc3',renk:'#647dc3',rx:16});
  K.yazi(c,s,200,175,'Maya + substrat');K.yazi(c,s,200,480,'Deney tüpü');
  K.kutu(c,s,520,245,370,205,{fill:'none',rx:10});K.kutu(c,s,527,335,356,108,{fill:'#274960',renk:'#274960',rx:3});
  K.kutu(c,s,625,165,150,250,{fill:'none',renk:'#a8b3c7',rx:7});
  c.S('path',{d:'M 210 225 L 210 195 L 420 195 L 420 390 L 700 390',fill:'none',stroke:'#a8b3c7','stroke-width':9},s);
  K.yazi(c,s,695,118,'Gaz toplama');K.yazi(c,s,695,495,'Ters dereceli silindir');
  return c.S('circle',{cx:700,cy:385,r:9,fill:K.renkler.H},s);
 }
 async function degisken(c){const s=c.svg(1000,562);K.kart(c,s,160,100,680,235,'Enzim aktivitesi',['pH · sıcaklık','Deneyde koşul seçimi'],{renk:K.renkler.H});
  await c.say('Enzim aktivitesi, bir tepkimenin gerçekleşme hızıyla ilişkilidir.');
  await c.say('pH ve sıcaklık, enzim deneyinde incelenebilen ortam koşullarıdır.');
  await K.soru(c,'Sıcaklığın etkisini araştırırken pH için ne yapmalısın?',['Aynı tutmalıyım.','Her denemede değiştirmeliyim.','Ölçümü farklı sürelerde yapmalıyım.'],0,'Sıcaklığın etkisini ayırmak için pH sabit tutulur.');
  K.temiz(s);K.kart(c,s,100,110,370,180,'Bağımsız değişken',['Sıcaklık'],{renk:K.renkler.H});K.kart(c,s,530,110,370,180,'Kontrol değişkeni',['pH'],{renk:'#3cc8e8'});
  K.kart(c,s,200,330,600,160,'Bağımlı değişken',['Kabarcık sayısı'],{renk:'#f5b04c'});
  await c.say('Değiştirdiğin koşul, bağımsız değişkendir.');
  await c.say('Ölçtüğün parametre, bağımlı değişkendir.');
  await c.say('Diğer değişkenleri kontrol ederek aynı tutarsın.');
  await c.say('Birden çok koşul değişirse hangi etkenin etkili olduğunu ayıramazsın.');
  await c.say('Bu tür deneylerde katalaz, amilaz veya lipaz kullanılabilir.');
  c.note('Birini değiştir, birini ölç, gerisini sabit tut.','Kontrollü deney');
 }
 async function olcum(c){const s=c.svg(1000,562);const b=duzenek(c,s);
  await c.say('Maya, bu düzenekte katalaz enziminin kaynağıdır.');
  await c.say('Katalaz, hidrojen peroksidi su ve oksijene dönüştürür.');
  await c.tween(1100,e=>b.setAttribute('cy',385-160*e));
  await c.say('Oksijen kabarcıkları, enzim aktivitesini izlemede kullanılır.');
  await K.soru(c,'Bu düzende aktiviteyi karşılaştırmak için ne ölçülür?',['Beş dakika boyunca oluşan kabarcık sayısı','Yalnız tüpün rengi','Mayanın ambalajındaki yazı'],0,'Aynı sürede sayılan oksijen kabarcıkları karşılaştırılır.');
  K.temiz(s);K.kart(c,s,160,120,680,230,'Ölçüm planı',['Maya çözeltisi: 10 ml','Hidrojen peroksit: 10 ml','Süre: 5 dakika'],{renk:K.renkler.H});
  await c.say('Karşılaştırılacak tüplerde aynı miktarlar ve aynı ölçüm süresi kullanılır.');
  await c.say('Burada görülen kabarcık, süreci gösterir; ölçüm sayısı değildir.');
 }
 async function hata(c){const s=c.svg(1000,562);K.kart(c,s,120,100,760,235,'Adil karşılaştırma',['Enzim miktarı','Substrat miktarı','Süre'],{renk:K.renkler.H});
  await c.say('Sabit koşullar değişirse sonuçtaki farkın nedeni belirsizleşir.');
  await K.soru(c,'Bir tüp beş, diğeri iki dakika sayıldı. Ne yapılmalı?',['Ölçüm süresi eşitlenmeli.','Uzun sayılan tüp kesin daha aktiftir.','Süre kaydına gerek yoktur.'],0,'Aktivite aynı süreye göre karşılaştırılmalıdır.');
  await c.say('Tıpa ve bağlantılar gazı kaybetmeden toplamalıdır.');
  await c.say('Taze substrat ve eşit ölçüm yöntemi hata kaynaklarını azaltır.');
  await K.soru(c,'pH etkisini araştırırken hangi koşul sabit tutulur?',['Sıcaklık','pH','Kabarcık sayısı'],0,'pH değiştirilirken sıcaklık sabit tutulur.');
 }
 async function yasam(c){const s=c.svg(1000,562);K.kart(c,s,180,120,640,210,'Hamurun mayalanması',['Uygun ortam koşulları','Enzim aktivitesi'],{renk:K.renkler.H});
  await c.say('Soğuk ortam, mayanın enzimatik süreçlerini yavaşlatabilir.');
  await c.say('Enzimlerin en etkin çalıştığı koşullar enzime göre değişir.');
  await K.soru(c,'Hamur soğukta yavaş kabardı. Hangi soru sınanabilir?',['Ortam sıcaklığı kabarmayı nasıl etkiler?','Hamur neden daima güzel görünür?','Her enzim kesin aynı sıcaklıkta mı çalışır?'],0,'Sıcaklık değiştirilip diğer koşullar eşit tutularak karşılaştırma yapılabilir.');
  await c.say('Gerçek laboratuvar uygulaması öğretmen rehberliğinde güvenlik önlemleriyle yapılır.');
  await c.say('Birini değiştir, birini ölç, gerisini sabit tut.');
 }
 Ders.start({id:'yasam-h1',kicker:'Konu H · Enzim deneyi',title:'Enzim deneyini tasarla',accent:K.renkler.H,back:'index.html',intro:{title:'Enzim deneyini tasarla',hook:'pH ile sıcaklığı birlikte değiştirirsen neyi öğrenirsin?',button:'Derse başla ›'},goals:[],scenes:[{title:'Değişkeni seç',goal:'Bir koşulun etkisini ayır.',run:degisken},{title:'Düzenek ve ölçüm',goal:'Ölçülen parametreyi belirle.',run:olcum},{title:'Hata kaynakları',goal:'Adil karşılaştırmayı seç.',run:hata},{title:'Günlük yaşam',goal:'Uygun koşulu araştırma sorusuna bağla.',run:yasam}],quizTitle:'Çıkış soruları',quiz:[{q:'Sıcaklığın etkisi deneyinde bağımsız değişken hangisidir?',options:['pH','Sıcaklık','Kabarcık sayısı'],answer:1,why:['pH sabit tutulur.','Araştırmacı sıcaklığı değiştirir.','Kabarcık sayısı ölçülen parametredir.'],scene:0},{q:'Adil karşılaştırma için hangisi gerekir?',options:['Miktarlar ve süre eşit tutulur.','Her tüp farklı süre sayılır.','pH ve sıcaklık birlikte değiştirilir.'],answer:0,why:['Diğer koşullar eşit tutulmalıdır.','Farklı süre ölçümü etkiler.','İki etkenin ayrı etkileri ayırt edilemez.'],scene:2}],summary:['Birini değiştir, birini ölç, gerisini sabit tut.'],nextLesson:{href:'h2-sicaklik-ve-enzim.html',label:'Sonraki: Sıcaklık ›'}});
})();
