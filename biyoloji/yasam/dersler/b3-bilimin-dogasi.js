/* Kaynak: MEB Biyoloji 9 s.23,27–28. Söğüt sayıları kitabın hayalî etkinlik örneğidir. */
(() => {
'use strict';const K=KIT,renk=K.renkler.B;
function kayit(c,s){K.yazi(c,s,500,65,'Söğüt · örnek kayıt',{size:30,renk});
 K.kart(c,s,75,130,350,220,'Kuzey',['400 ağaç','400 sağlıklı'],{renk});K.kart(c,s,515,130,410,220,'Güney',['80 ağaç','60 hastalıklı'],{renk});
 K.yazi(c,s,500,425,'Hastalıklılardan 42’si drenaja yakın',{size:30});}
async function gozlem(c){const s=c.svg(1000,562);kayit(c,s);
 await c.say('Bir gölün iki kıyısındaki söğütlerin yaprakları farklı görünüyor.');
 await c.say('Kuzeydekiler sağlıklı; güneydekilerde sararma ve gelişim geriliği görülüyor.');
 await c.say('Bu sayılar öğretici örnek kaydıdır; gerçek saha ölçümü değildir.');
 await K.soru(c,'Bu kayıt hangi yorumu destekler?',['Hastalığın tek nedeni kesinlikle atık sudur.','Hastalıkla drenaj yakınlığının ilişkisi araştırılmalıdır.','Kuzeydeki bütün söğütler hastalıklıdır.'],1,'Birlikte görülme, olası ilişkiyi araştırmayı gerektirir; nedeni kesinleştirmez.');
 K.temiz(s);K.kart(c,s,80,145,350,155,'Gözlem',['Hastalık + drenaj yakınlığı'],{renk,altSize:26});K.ok(c,s,445,225,555,225,renk);K.kart(c,s,570,145,350,155,'Çıkarım',['Olası ilişki'],{renk});
 await c.say('Gözlemden çıkarım yapılır; neden için ek kanıt gerekir.');c.note('Kendi cümlen, aynı anlam.','Bilimin doğası');}
async function kanit(c){const s=c.svg(1000,562);K.yazi(c,s,500,65,'Hipotezi sınama',{size:30,renk});
 K.kart(c,s,70,125,365,205,'Özdeş fidanlar',['Normal göl suyu'],{renk});K.kart(c,s,525,125,405,205,'Özdeş fidanlar',['Atık su karışımlı su'],{renk});
 await c.say('Atık suyun hastalıkla ilişkisi kontrollü deneyle sınanabilir.');
 await c.say('Sulama suyu değişir; fidanların durumu gözlenir ve karşılaştırılır.');
 await K.soru(c,'Bu sınama hangi özelliğin araştırmadaki karşılığıdır?',['Bilginin gözlem ve çıkarımlara dayanması','Bilginin kanıttan bağımsız olması','Her araştırmada aynı sıranın zorunlu olması'],0,'Fidan gözlemleri yorumlanarak hipotez değerlendirilir.');
 K.ok(c,s,250,345,420,400,renk);K.ok(c,s,720,345,580,400,renk);K.yazi(c,s,500,445,'Gözlem → çıkarım → değerlendirme',{size:30});
 await c.say('Bir önerme, gözlenen bulgularla karşılaştırılarak değerlendirilir.');}
async function yeni(c){const s=c.svg(1000,562);K.kart(c,s,160,95,680,160,'Başka olasılık',['Mantar enfeksiyonu'],{renk});
 await c.say('Aynı hastalık görünümü başka bir nedenden de kaynaklanabilir.');
 await c.say('Örneğin o bölgeye özgü mantar enfeksiyonu da araştırılır.');
 await c.cont('Diğer olasılığı gör ›');
 K.temiz(s);K.kart(c,s,160,95,680,160,'Başka olasılık',['Taban suyu seviyesinin farkı'],{renk});
 await c.say('Taban suyu seviyesinin farkı da olası başka nedendir.');
 await K.soru(c,'Yeni kanıt atık su hipoteziyle çelişirse ne yapılır?',['Hipotez değişmez, veri görmezden gelinir.','Hipotez gözden geçirilir; gerekirse değiştirilir.','Bütün bilimsel bilgiler terk edilir.'],1,'Yeni kanıtla açıklama yeniden değerlendirilir.');
 K.temiz(s);K.kart(c,s,80,155,330,150,'Yeni kanıt',[],{renk});K.ok(c,s,430,230,560,230,renk);K.kart(c,s,585,155,330,150,'Yeniden değerlendirme',[],{renk,size:25});
 await c.say('Bilgi, yeni bulgularla değişebilir; bu, araştırmanın işleyişidir.');}
async function ifade(c){const s=c.svg(1000,562);K.kart(c,s,130,100,740,180,'Örnek kayıt',['60 hastalıklı ağaç','Bunların 42’si drenaja yakın'],{renk});
 await c.say('Şimdi gözlem kaydını anlamını koruyarak başka biçimde söyleyeceksin.');
 await K.soru(c,'Hangi ifade kaydın anlamını korur?',['Güneydeki 80 ağacın hepsi drenaja yakındır.','Kuzeyde 42 hastalıklı ağaç vardır.','Hastalıklı söğütlerin 42’si drenaja yakın bölgede bulunur.'],2,'42 sayısı hastalıklı söğütlerin drenaja yakın olanlarını gösterir.');
 K.temiz(s);K.kart(c,s,60,125,390,190,'Kanıt',['42 hastalıklı ağaç','Drenaja yakın'],{renk});K.ok(c,s,467,220,537,220,renk);K.kart(c,s,555,125,385,190,'Yorum',['Olası ilişki','Neden henüz kesin değil'],{renk,altSize:26});
 K.yazi(c,s,500,440,'Yeni kanıt → yeniden değerlendirme',{size:30});
 await c.say('Kendi ifaden, sayının kapsadığı grubu değiştirmemeli.');
 await c.say('Bu ilişki ağı, araştırma yorumunu ve dayandığı kanıtı kaydeder.');}
Ders.start({id:'yasam-b3',kicker:'Konu B · Bilimsel araştırma ve bilimin doğası',title:'Araştırmada bilimin doğasını bulmak',accent:renk,back:'index.html',intro:{title:'Araştırmada bilimin doğasını bulmak',hook:'Söğütlerde drenaj yakınlığı, hastalığın nedenini kesinleştirir mi?',button:'Derse başla ›'},goals:[],scenes:[{title:'Kaydı yorumla',goal:'Kanıtın sınırını koru.',run:gozlem},{title:'Kanıt bağlantısını kur',goal:'Araştırmada doğa özelliğini bul.',run:kanit},{title:'Yeni kanıtla yeniden düşün',goal:'Açıklamayı yeniden değerlendir.',run:yeni},{title:'Kendi cümlen, aynı anlam',goal:'Kaydı anlamını koruyarak ifade et.',run:ifade}],quizTitle:'Çıkış soruları',quiz:[{q:'Yeni kanıtla hipotezin yeniden değerlendirilmesi neyi gösterir?',options:['Bilginin değişebilir olduğunu','Bilginin hiçbir zaman değişmediğini','Kanıta ihtiyaç olmadığını'],answer:0,why:['Açıklama yeni bulgularla gözden geçirilir.','Yeni kanıt değişimi gerektirebilir.','Yeniden değerlendirme kanıta dayanır.'],scene:2},{q:'“60 hastalıklı ağacın 42’si drenaja yakın” hangi ifadeyle korunur?',options:['Güneydeki bütün ağaçlar drenaja yakındır.','Hastalıklı ağaçlardan 42’si drenaja yakın bölgede bulunur.','Kuzeyde 42 hastalıklı ağaç vardır.'],answer:1,why:['Kayıt bütün güney ağaçlarını kapsamaz.','Sayı ve kapsanan grup korunmuştur.','Yer ve grup değiştirilmiştir.'],scene:3}],summary:['Kendi cümlen, aynı anlam.'],nextLesson:{href:'c1-etige-uygun-mu.html',label:'Sonraki: Bilim etiği ›'}});
})();
