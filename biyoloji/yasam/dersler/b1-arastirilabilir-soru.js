/* Kaynak: MEB Biyoloji 9, s.25–28; kapsam BİY.9.1.2. */
(() => {
'use strict'; const K=KIT, renk=K.renkler.B;
function kanat(c,s,x,desen){
 c.S('path',{d:`M${x} 165 Q${x-170} 105 ${x-165} 255 Q${x-120} 360 ${x} 295 Q${x+120} 360 ${x+165} 255 Q${x+170} 105 ${x} 165`,fill:'#394157',stroke:renk,'stroke-width':3},s);
 c.S('ellipse',{cx:x,cy:232,rx:12,ry:74,fill:renk},s);
 if(desen) [-85,85].forEach(d=>{c.S('circle',{cx:x+d,cy:226,r:37,fill:'#807b69',stroke:renk,'stroke-width':3},s);c.S('circle',{cx:x+d,cy:226,r:14,fill:'#162039'},s);});
 K.yazi(c,s,x,392,desen?'Göz desenli':'Desensiz',{size:30});
}
async function gozlem(c){const s=c.svg(1000,562);kanat(c,s,500,true);K.yazi(c,s,500,80,'Güve kanadı · şema',{size:30,renk});K.kaynak(c,s,25);
 await c.say('Ormanda bir güve gözlemlediğini düşün.');
 await c.say('Kanadındaki lekeler, baykuş yüzünü andırıyor.');
 await c.say('Bu gözlemden bir araştırma sorusu çıkaracaksın.');
 await K.soru(c,'Bu gözlem hangi problemi düşündürür?',['Göz desenleri güveye ne sağlar?','Hangi güve daha güzel?','Araştırmacının en sevdiği renk nedir?'],0,'Desenlerin güveye etkisi araştırılabilir.');
 K.temiz(s);K.kart(c,s,80,175,330,145,'Gözlem',['Göz desenleri'],{renk});K.ok(c,s,425,250,565,250,renk);K.kart(c,s,590,175,330,145,'Problem',['Desenlerin etkisi'],{renk});K.kaynak(c,s,25);
 await c.say('Gözlenen bir özellik, araştırılacak probleme dönüşür.');c.note('Sınanabilen soru, araştırmanın başıdır.','Araştırma');}
async function soru(c){const s=c.svg(1000,562);kanat(c,s,270,true);kanat(c,s,730,false);K.kaynak(c,s,'25–26');
 await c.say('İki kanat şeması, desen durumunu karşılaştırıyor.');
 await K.soru(c,'Hangi soru gözlem veya deneyle cevaplanabilir?',['Göz desenleri avcı kuşların güveyi avlamasını etkiler mi?','Güveler dünyanın en güzel canlıları mı?','Göz desenlerini herkes beğenir mi?'],0,'Avlanma durumu, desen durumuna göre karşılaştırılabilir.');
 K.temiz(s);K.kart(c,s,180,165,640,220,'Araştırma sorusu',['Göz deseni → avlanma?'],{renk});K.kaynak(c,s,'25–26');
 await c.say('Sorunun cevabı, avlanma durumunu karşılaştırarak aranabilir.');}
async function hipotez(c){const s=c.svg(1000,562);K.kart(c,s,110,155,350,160,'Kuşlar',['Güveleri yiyebilir'],{renk});K.kart(c,s,540,155,350,160,'Baykuşlar',['Kuşları avlayabilir'],{renk});K.kaynak(c,s,26);
 await c.say('Bu iki bilgi, göz desenlerinin etkisini düşünmeye yardımcı olur.');
 await K.soru(c,'Bu probleme hangi hipotez bir açıklama sunar?',['Göz desenleri güveyi yiyebilecek avcıları uzaklaştırır.','Göz desenleri var mı?','Sonuç, sınanmadan kesinleşmiştir.'],0,'Bu açıklama gözlem veya deneyle sınanabilir.');
 K.temiz(s);K.kart(c,s,175,140,650,220,'Hipotez',['Göz desenleri → avcıların uzaklaşması'],{renk});K.kaynak(c,s,26);
 await c.say('Bu, sınanacak açıklamadır; henüz kesin sonuç değildir.');}
async function sinama(c){const s=c.svg(1000,562);K.kart(c,s,90,105,355,205,'Göz desenli',['Eşit başlangıç','Aynı avcı ortamı'],{renk});K.kart(c,s,555,105,355,205,'Desensiz',['Eşit başlangıç','Aynı avcı ortamı'],{renk});K.kaynak(c,s,26);
 await c.say('İki grup, aynı avcı ortamında karşılaştırılabilir.');
 await K.soru(c,'Desenlerin etkisini sınamak için ne karşılaştırılır?',['Araştırmacının sevdiği renk','Bir süre sonra kalan güve sayıları','Güvelere verilen adlar'],1,'Desen durumuna göre kalan güve sayıları karşılaştırılır.');
 K.ok(c,s,270,330,270,385,renk);K.ok(c,s,730,330,730,385,renk);K.yazi(c,s,270,435,'Kalan güve sayısı',{size:30});K.yazi(c,s,730,435,'Kalan güve sayısı',{size:30});
 await c.say('Burada gerçek deney yapmıyoruz; sınama yolunu seçiyoruz.');
 await c.say('Fizik ve kimya da deney ve gözlemden yararlanır.');}
Ders.start({id:'yasam-b1',kicker:'Konu B · Bilimsel araştırma ve bilimin doğası',title:'Meraktan araştırılabilir soruya',accent:renk,back:'index.html',intro:{title:'Meraktan araştırılabilir soruya',hook:'Güvenin göz desenleri için hangi soru araştırılabilir?',button:'Derse başla ›'},goals:[],scenes:[{title:'Gözlemden probleme',goal:'Gözlemi probleme dönüştür.',run:gozlem},{title:'Araştırılabilir soru',goal:'Sınanabilir soruyu seç.',run:soru},{title:'Hipotez kur',goal:'Soruyla açıklamayı ayır.',run:hipotez},{title:'Sınama yolunu seç',goal:'Karşılaştırılacak sonucu belirle.',run:sinama}],quizTitle:'Çıkış soruları',quiz:[{q:'Hangi soru araştırılabilir?',options:['En güzel güve hangisi?','Desen durumu kalan güve sayısını etkiler mi?','Araştırmacı hangi deseni sever?'],answer:1,why:['Güzellik yargısı bu karşılaştırmanın konusu değildir.','Desen durumuna göre kalan sayılar karşılaştırılabilir.','Kişisel tercih desenin etkisini açıklamaz.'],scene:1},{q:'Hangi ifade hipotezdir?',options:['Göz desenleri avcıları uzaklaştırır.','Göz desenleri var mı?','Sonuç sınanmadan kesindir.'],answer:0,why:['Bu, sınanabilir bir açıklamadır.','Bu bir sorudur.','Sınanmadan kesin sonuç kurulmaz.'],scene:2}],summary:['Sınanabilen soru, araştırmanın başıdır.'],nextLesson:{href:'b2-arastirma-basamaklari.html',label:'Sonraki: Araştırmanın basamakları ›'}});
})();
