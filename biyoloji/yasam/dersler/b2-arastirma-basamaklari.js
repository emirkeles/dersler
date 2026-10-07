/* Kaynak: MEB Biyoloji 9, s.25–28; yedi basamak olay içinde kullanılır. */
(() => {
'use strict';const K=KIT,renk=K.renkler.B;
async function esle(c,s,olaylar,sayfa){
 const etiketler=[];
 function ciz(olay){K.temiz(s);K.kart(c,s,130,80,740,180,'Güve örneği',[olay],{renk});
  etiketler.forEach((a,i)=>{K.kart(c,s,65+i*315,355,270,105,a,[],{renk,size:26});if(i<etiketler.length-1)K.ok(c,s,343+i*315,407,369+i*315,407,renk);});K.kaynak(c,s,sayfa);}
 for(const a of olaylar){ciz(a.olay);if(a.once)await c.say(a.once);
  await K.soru(c,'Bu olay hangi basamağa karşılık gelir?',a.sec,a.cevap,a.acik);
  etiketler.push(a.sec[a.cevap]);ciz(a.olay);await c.say(a.sonra);}
}
async function ilk(c){const s=c.svg(1000,562);K.kart(c,s,190,120,620,200,'Araştırma kaydı',['Güve · kanatta göz desenleri'],{renk});K.kaynak(c,s,25);
 await c.say('Güvenin göz desenleri, avlanmayla ilgili bir araştırma başlatır.');
 await c.say('Araştırmacı, bir açıklama kurup bu açıklamayı kanıtlarla sınar.');
 await c.say('Bu örnek akış, her araştırmanın zorunlu sırası değildir.');
 await esle(c,s,[
 {olay:'Kanatta göz desenleri fark edilir.',sec:['Sonuç çıkarma','Gözlem yapma','Deney tasarlama'],cevap:1,acik:'Deseni fark etme, gözlem yapmadır.',sonra:'Fark edilen özellik, araştırmanın çıkış noktasıdır.'},
 {olay:'Desenler neden var?',sec:['Problemi belirleme','Hipotez oluşturma','Analiz'],cevap:0,acik:'Neden sorusu araştırılacak problemi belirler.',sonra:'Bu olayda araştırılacak durum açıkça sorulur.'},
 {olay:'Önceki desen araştırmaları aranır.',sec:['Tahmin','Sonuç çıkarma','Veri toplama'],cevap:2,acik:'Önceki araştırmaları incelemek veri toplama kapsamındadır.',sonra:'Konuyla ilgili önceki çalışmalar doğru kaynaklardan araştırılır.'}
 ],25);c.note('Yol değişir, basamaklar tanınır.','Araştırma süreci');}
async function orta(c){const s=c.svg(1000,562);
 await esle(c,s,[
 {olay:'Göz desenleri avcıları uzaklaştırır.',sec:['Hipotez oluşturma','Gözlem yapma','Veri toplama'],cevap:0,acik:'Olayı açıklayan, sınanabilir önerme hipotezdir.',once:'Şimdi açıklama, beklenti ve sınama tasarımını ayıracağız.',sonra:'Bu açıklama henüz sınanacak bir önermedir.'},
 {olay:'Desenliyse avcı kuş yemekten kaçınır.',sec:['Analiz','Tahmin','Problemi belirleme'],cevap:1,acik:'Hipotezden çıkarılan sınama beklentisidir.',sonra:'Hipotezden beklenen sonuç, deney yapılmadan düşünülür.'},
 {olay:'Eşit başlangıçlı iki grup karşılaştırılır.',sec:['Veri toplama','Problemi belirleme','Deney tasarlama'],cevap:2,acik:'Desenli ve desensiz güveler için karşılaştırma tasarlanır.',sonra:'Kalan güve sayıları desen durumuna göre karşılaştırılır.'}
 ],26);}
async function sonuc(c){const s=c.svg(1000,562);K.kart(c,s,140,90,720,190,'Koşullu sonuç',['Desenliler daha az avlanırsa…'],{renk});K.kaynak(c,s,26);
 await c.say('Burada henüz ölçüm yok; hipotezin nasıl sınanacağını düşünüyoruz.');
 await K.soru(c,'Verinin hipotezi desteklediğine karar vermek hangi basamaktır?',['Analiz ve sonuç çıkarma','Problemi belirleme','Hipoteze dayalı tahmin'],0,'Veri yorumlanır ve hipotezle karşılaştırılır.');
 K.temiz(s);K.kart(c,s,95,130,810,140,'Analiz ve sonuç çıkarma',['Veri ↔ hipotez'],{renk});K.kart(c,s,95,350,350,120,'Yetersiz veri',[],{renk});K.kaynak(c,s,26);
 await c.say('Veri, hipotezi desteklemek için yetersiz de olabilir.');
 await K.soru(c,'Kanıt yetersizse araştırmacı ne yapar?',['Hipotezi kesin doğru ilan eder.','Yeni gözlem veya deneyle veri toplar.','Sınamayı gereksiz sayar.'],1,'Ek veriler için yeni gözlem veya deney yapılır.');
 K.kart(c,s,570,350,335,120,'Yeni veri',[],{renk});K.ok(c,s,460,410,555,410,renk);K.ok(c,s,740,340,740,287,renk);
 await c.say('Araştırma, yeniden veri toplamaya dönebilir.');}
async function sogut(c){const s=c.svg(1000,562);K.yazi(c,s,500,65,'Söğüt · örnek araştırma',{size:30,renk});
 K.kart(c,s,65,130,395,220,'Özdeş fidanlar',['Normal göl suyu','Kontrol grubu'],{renk});K.kart(c,s,540,130,395,220,'Özdeş fidanlar',['Atık su karışımlı göl suyu','Deney grubu'],{renk,altSize:26});K.kaynak(c,s,'27–28');
 await c.say('Başka bir örnekte kuzey ve güney söğütlerinin yaprakları farklıdır.');
 await c.say('Bu öğretici örnek, gerçek saha ölçümü değildir.');
 await c.say('Atık su hipotezi, özdeş fidanların sulandığı suyla sınanabilir.');
 await K.soru(c,'Bu iki grubu planlayan araştırmacı hangi işi yapar?',['Sonucu önceden kesinleştirir.','Kontrollü deney tasarlar.','Yalnız kişisel görüş belirtir.'],1,'Sulama suyu farklı iki grup, hipotezi sınamak için tasarlanır.');
 K.yazi(c,s,500,438,'Gözlem → laboratuvar sınaması',{size:30});
 await c.say('Güvede ek gözlem, söğütte laboratuvar deneyi önerilmiştir.');
 await c.say('Araştırma sorusuna göre yaklaşım ve adımlar değişebilir.');}
Ders.start({id:'yasam-b2',kicker:'Konu B · Bilimsel araştırma ve bilimin doğası',title:'Bir araştırmanın basamakları',accent:renk,back:'index.html',intro:{title:'Bir araştırmanın basamakları',hook:'Güve olayında hangi işlem hangi araştırma basamağıdır?',button:'Derse başla ›'},goals:[],scenes:[{title:'Gözlem, problem, veri',goal:'Üç olayı basamaklarıyla eşleştir.',run:ilk},{title:'Hipotez, tahmin, deney',goal:'Açıklama, beklenti ve sınamayı ayır.',run:orta},{title:'Analiz ve sonuç',goal:'Veriyi yorumla, geri dönüşü fark et.',run:sonuc},{title:'Farklı araştırmada aynı iş',goal:'Basamakları söğüt olayında bul.',run:sogut}],quizTitle:'Çıkış soruları',quiz:[{q:'Önceki güve araştırmalarını aramak hangi basamaktır?',options:['Veri toplama','Sonuç çıkarma','Deney tasarlama'],answer:0,why:['Önceki çalışmalar araştırma için bilgi ve veri sağlar.','Burada sonuç yorumlanmaz.','Burada yeni deney planlanmaz.'],scene:0},{q:'Veri hipotezi desteklemek için yetersizse ne yapılır?',options:['Hipotez kesinleşir.','Her araştırma aynı sıraya zorlanır.','Yeni gözlem veya deneyle veri toplanır.'],answer:2,why:['Yetersiz veri kesin sonuç sağlamaz.','Tek ve değişmez araştırma yolu yoktur.','Ek kanıtla hipotez yeniden değerlendirilir.'],scene:2}],summary:['Yol değişir, basamaklar tanınır.'],nextLesson:{href:'b3-bilimin-dogasi.html',label:'Sonraki: Araştırmada bilimin doğası ›'}});
})();
