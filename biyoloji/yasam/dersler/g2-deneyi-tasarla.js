/* Besin adları BİY.9.1.7 uygulama a; ayraç/plan MEB Biyoloji 9 s.75–77; BİY.9.1.7 a. Besin seçimi tasarımdır, sonuç değildir. */
(() => {
'use strict';const K=KIT,renk=K.renkler.G,besinler=['Ekmek','Patates','Süt','Meyve','Yumurta','Peynir','Nohut','Mercimek','Zeytinyağı','Fındık','Fıstık'];let secili='Ekmek';
function plan(c,s,besin,hedef,ayrac){K.temiz(s);K.yazi(c,s,500,65,'Deney planı',{size:30,renk});
 K.kart(c,s,50,145,260,180,'Besin',[besin],{renk});K.ok(c,s,325,235,355,235,renk);
 K.kart(c,s,370,145,260,180,'Hedef',[hedef],{renk});K.ok(c,s,645,235,675,235,renk);
 K.kart(c,s,690,145,260,180,'Ayraç',[ayrac],{renk,altSize:27});K.yazi(c,s,500,430,'Besin sonucu henüz bilinmiyor',{size:30});}
function tup(c,s){c.S('path',{d:'M220 135 L220 350 Q220 400 280 400 Q340 400 340 350 L340 135',fill:'none',stroke:'#9aa7bc','stroke-width':4},s);
 const sivi=c.S('path',{d:'M228 275 L228 350 Q228 392 280 392 Q332 392 332 350 L332 275 Z',fill:'#334058'},s);const damla=c.S('circle',{cx:280,cy:105,r:11,fill:renk,opacity:0},s);return {sivi,damla};}
async function besinSec(c){const s=c.svg(1000,562);secili='Ekmek';plan(c,s,secili,'Nişasta','Seçilecek');
 await c.say('Bir besin, birden fazla organik bileşik içerebilir.');
 await c.say('Deney önce planlanır, sonra gözlenen değişim kaydedilir.');
 await c.say('Bir tahmin, henüz gözlenmiş deney sonucu değildir.');
 await K.soru(c,'Nişasta arama planında hangi ifade bir tahmindir?',['Seçtiğim besinde nişasta olabilir.','Deney yapılmadan varlığı kesindir.','Bu besinde başka bileşik bulunamaz.'],0,'Olasılık belirten düşünce sınanmak üzere kurulmuştur.');
 await c.say('Araştırılacak besini seç; nişasta olabileceğini bir tahmin olarak düşün.');
 const sl=c.slider({label:'Araştırılacak besin',min:0,max:besinler.length-1,step:1,value:0,fmt:v=>besinler[v],onInput:v=>{secili=besinler[v];plan(c,s,secili,'Nişasta','Seçilecek');}});
 await c.cont('Bu besinle planla ›');secili=besinler[sl.get()];sl.remove();c.note('Önce plan, sonra damla.','Deney tasarımı');}
async function ayracSec(c){const s=c.svg(1000,562);plan(c,s,secili,'Nişasta','Seçilecek');
 await c.say('Hedefimiz seçilen besinde nişasta bulunup bulunmadığını araştırmak.');
 await K.soru(c,'Nişasta hedefi için hangi ayraç, neden seçilir?',['Biüret; proteinle eşleştiği için','Lugol; nişastayla eşleştiği için','Sudan III/IV; yağla eşleştiği için'],1,'Lugol bu planın hedefi olan nişastayla eşleşir.');
 plan(c,s,secili,'Nişasta','Lugol');await c.say('Ayraç seçimini, besinin adı değil aranan molekül belirler.');}
async function gozlem(c){const s=c.svg(1000,562);plan(c,s,secili,'Nişasta','Lugol');
 await K.soru(c,'Planında neyi gözleyeceksin?',['Kesin gram miktarını','Renk değişimi olup olmadığını','Besinin tüm bileşiklerini tek testle'],1,'Bu deneyde nitel renk değişimi gözlenir.');
 K.temiz(s);K.yazi(c,s,500,65,'Nişasta içeren model örnek',{size:30,renk});const t=tup(c,s);K.yazi(c,s,280,450,'Nişasta modeli',{size:30});K.kart(c,s,565,145,355,150,'Ayraç',['Lugol'],{renk});
 await c.say('Karşılaştırma için hedefi içerdiği bilinen model örneği inceleyelim.');await c.cont('Modele ayracı uygula ›');
 await c.tween(650,e=>{t.damla.setAttribute('opacity',e<.96?1:0);t.damla.setAttribute('cy',105+170*e);});t.sivi.setAttribute('fill','#7563cf');K.yazi(c,s,740,380,'Mavi-mor',{size:30});
 await c.say('Bu model mavi-mor verir; seçtiğin besin henüz test edilmedi.');
 await c.say('Plan, gerçek besinde hangi değişimi arayacağını belirler.');}
async function baska(c){const s=c.svg(1000,562);plan(c,s,'Süt','Protein','Seçilecek');
 await c.say('Sütte protein araştırmak istediğini varsay; henüz gerçek sonuç yok.');
 await K.soru(c,'Bu hedef için hangi ayraç seçilir?',['Lugol','Benedict','Biüret'],2,'Protein arama planına Biüret seçilir.');plan(c,s,'Süt','Protein','Biüret');await c.say('Planın seçilen besini, hedefi ve ayracı birlikte kaydeder.');await c.cont('Başka hedefe geç ›');
 plan(c,s,'Fındık','Lipit','Seçilecek');await c.say('Şimdi fındıkta lipit araştırma planı kuruyoruz.');
 await K.soru(c,'Lipit hedefi için hangi ayraç seçilir?',['Sudan III/IV','Lugol','Benedict'],0,'Sudan III/IV yağ hedefiyle eşleşir.');plan(c,s,'Fındık','Lipit','Sudan III/IV');
 await K.soru(c,'Bu planlar hangi yoruma izin verir?',['Her besin yalnız bir molekül içerir.','Aynı besin için farklı hedefler araştırılabilir.','Besinlerin tüm sonuçları deneyden önce bilinmektedir.'],1,'Bir besin birden fazla organik bileşik içerebilir.');
 await c.say('Tahminin doğru olup olmadığı, gerçek deney sonucuyla anlaşılır.');}
Ders.start({id:'yasam-g2',kicker:'Konu G · Besinlerde organik molekül arama',title:'Deneyi tasarla: hangi besin, hangi ayraç',accent:renk,back:'index.html',intro:{title:'Deneyi tasarla: hangi besin, hangi ayraç',hook:'Bir besinde nişasta ararken deneyi nasıl planlarsın?',button:'Derse başla ›'},goals:[],scenes:[{title:'Besin seç',goal:'Tahmin ve sonuç ayrımını koru.',run:besinSec},{title:'Ayracı gerekçeyle seç',goal:'Ayraç seçimini hedefle gerekçelendir.',run:ayracSec},{title:'Gözlemi planla',goal:'Model sonucunu besin sonucundan ayır.',run:gozlem},{title:'Başka hedef, başka plan',goal:'Protein ve lipit deneylerini planla.',run:baska}],quizTitle:'Çıkış soruları',quiz:[{q:'Bir besinde protein arama planına hangi ayraç uygundur?',options:['Lugol','Biüret','Benedict'],answer:1,why:['Bu derste Lugol nişasta için kullanıldı.','Biüret protein hedefiyle eşleşir.','Benedict glikoz/fruktoz hedefiyle eşleşir.'],scene:3},{q:'Deney yapılmadan önce hangisi kaydedilebilir?',options:['Besin, hedef, ayraç ve gözlem planı','Ölçülmemiş besinin kesin sonucu','Besinde diğer tüm bileşiklerin yokluğu'],answer:0,why:['Bunlar deney tasarımının parçalarıdır.','Gerçek sonuç gözlemle belirlenir.','Tek bir hedef için plan, tüm içeriği göstermez.'],scene:0}],summary:['Önce plan, sonra damla.'],nextLesson:{href:'g3-sonucu-analiz-et.html',label:'Sonraki: Sonucu analiz et ›'}});
})();
