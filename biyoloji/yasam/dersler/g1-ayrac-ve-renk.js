/* MEB Biyoloji 9 s.74–75: hedef/ayraç/renk ilişkileri. Besin sonucu verilmez. */
(() => {
'use strict';const K=KIT,renk=K.renkler.G;
const modeller=[{hedef:'Nişasta',ayrac:'Lugol',renkAd:'Mavi-mor',fill:'#7563cf'}, {hedef:'Glikoz / fruktoz',ayrac:'Benedict',renkAd:'Kiremit kırmızısı',fill:'#b95342'}, {hedef:'Protein',ayrac:'Biüret',renkAd:'Mor',diger:'Açık mavi veya mor',fill:'#ac72cc'}, {hedef:'Yağ',ayrac:'Sudan III/IV',renkAd:'Kırmızı',diger:'Kırmızı veya turuncu',fill:'#d64d43'}];
function model(c,s,a){K.temiz(s);K.yazi(c,s,500,65,'Hedef içeren model örnek',{size:30,renk});
 const g=c.S('g',{},s);c.S('path',{d:'M 220 140 L 220 365 Q 220 415 280 415 Q 340 415 340 365 L 340 140',fill:'none',stroke:'#9aa7bc','stroke-width':4},g);
 const sivi=c.S('path',{d:'M 228 290 L 228 365 Q 228 407 280 407 Q 332 407 332 365 L 332 290 Z',fill:'#334058'},g);
 K.yazi(c,s,280,470,a.hedef,{size:30});K.kart(c,s,565,140,355,140,'Ayraç',[a.ayrac],{renk});
 const yazi=K.yazi(c,s,745,380,'Uygulanmadı',{size:28});
 const damla=c.S('circle',{cx:280,cy:110,r:11,fill:renk,opacity:0},s);return {sivi,yazi,damla};}
async function uygula(c,s,a,t){await c.tween(650,e=>{t.damla.setAttribute('opacity',e<.96?1:0);t.damla.setAttribute('cy',110+180*e);});t.sivi.setAttribute('fill',a.fill);t.yazi.textContent=a.renkAd;if(a.diger)K.yazi(c,s,745,435,a.diger,{size:25});}
async function kanca(c){const s=c.svg(1000,562);K.kart(c,s,70,145,365,170,'Besin etiketi',['İçerik bilgisi'],{renk});K.ok(c,s,450,230,555,230,renk);K.kart(c,s,575,145,355,170,'Ayraç testi',['Renk değişimi'],{renk});
 await c.say('Besin etiketleri, içeriği hakkında bilgi verir.');
 await c.say('Ayraçlar, hedef moleküllerle etkileşerek görünür renk değişimi oluşturabilir.');
 await c.say('Bu derste hedef molekül içeren model örneklerin tepkimelerini inceleyeceğiz.');
 await K.soru(c,'Bir renk değişiminden hangisi doğrudan söylenemez?',['Aranan molekülün kesin gram miktarı','Hedef molekülün varlığına ilişkin bulgu','Gözle görülen renk'],0,'Bu test nitel sonuç verir; kesin gram miktarını ölçmez.');
 K.temiz(s);K.kart(c,s,100,175,350,150,'Renk değişimi',[],{renk});K.ok(c,s,470,250,550,250,renk);K.kart(c,s,570,175,330,150,'Nitel gözlem',['Varlık araştırılır'],{renk});
 await c.say('Renk sonucu, aranan molekülün varlığı için değerlendirilir.');c.note('Doğru ayraç, aranan molekülü gösterir.','Ayraç');}
async function karbohidrat(c){const s=c.svg(1000,562);
 for(const a of modeller.slice(0,2)){const t=model(c,s,a);await c.say(a.hedef==='Nişasta'?'Nişasta içeren model örneğe Lugol uygulanacak.':'Glikoz veya fruktoz içeren model örneğe Benedict uygulanacak.');await c.cont('Ayracı uygula ›');await uygula(c,s,a,t);await c.say(a.hedef==='Nişasta'?'Lugol ile nişasta, mavi-mor renk verir.':'Benedict ile glikoz veya fruktoz, kiremit kırmızısı renk verir.');await c.cont('Devam ›');}
 await K.soru(c,'Bu iki test hakkında hangi yorum doğrudur?',['Lugol bütün karbohidratların gram miktarını gösterir.','Aranan karbohidrat çeşidine göre ayraç seçilir.','Benedict yağ için seçilmiştir.'],1,'Nişasta ile glikoz/fruktoz farklı hedeflerdir.');
 await c.say('Nişasta testi, bütün karbohidratları aynı biçimde göstermeye genellenmez.');}
async function proteinLipit(c){const s=c.svg(1000,562);
 for(const a of modeller.slice(2)){const t=model(c,s,a);await c.say(a.hedef==='Protein'?'Protein içeren model örnekte Biüret kullanılacak.':'Yağ içeren model örnekte Sudan III veya IV kullanılacak.');await c.cont('Ayracı uygula ›');await uygula(c,s,a,t);await c.say(a.hedef==='Protein'?'Biüret için açık mavi veya mor renk görülebilir.':'Sudan III ve IV için kırmızı veya turuncu renk görülebilir.');await c.cont('Devam ›');}
 await K.soru(c,'Protein ararken hangi ayraç seçilir?',['Lugol','Biüret','Sudan III/IV'],1,'Biüret protein hedefiyle eşleşir.');}
async function esle(c){const s=c.svg(1000,562);
 for(const a of modeller){const t=model(c,s,{...a,ayrac:'Seçilecek'});await c.say('Bu modelin hedefi belli; uygun ayracı sen seç.');const sec=['Lugol','Benedict','Biüret','Sudan III/IV'];await K.soru(c,a.hedef+' içeren model için hangi ayraç?',sec,sec.indexOf(a.ayrac),'Ayraç aranan moleküle göre seçilir.');const son=model(c,s,a);await uygula(c,s,a,son);await c.say('Bu renk, verilen model koşulunun sonucudur.');await c.cont('Sonraki hedef ›');}
 await c.say('Gerçek besinin sonucu, uygun deney yapılınca belirlenir.');}
Ders.start({id:'yasam-g1',kicker:'Konu G · Besinlerde organik molekül arama',title:'Ayraç: görünmeyeni renkle gösterir',accent:renk,back:'index.html',intro:{title:'Ayraç: görünmeyeni renkle gösterir',hook:'Bir renk değişimi, besinin içeriği hakkında ne söyler?',button:'Derse başla ›'},goals:[],scenes:[{title:'Etiketten teste',goal:'Nitel sonuçla miktarı ayır.',run:kanca},{title:'İki karbohidrat hedefi',goal:'Nişasta ve şeker hedeflerini ayır.',run:karbohidrat},{title:'Protein ve lipit',goal:'İki molekül için ayracı tanı.',run:proteinLipit},{title:'Hedefe uygun ayraç',goal:'Ayracı hedefe göre seç.',run:esle}],quizTitle:'Çıkış soruları',quiz:[{q:'Nişasta hedefi için hangi eşleşme doğrudur?',options:['Lugol → mavi-mor','Sudan III/IV → nişasta','Biüret → nişasta'],answer:0,why:['Nişasta Lugol ile mavi-mor renk verir.','Sudan III/IV yağ hedefiyle eşleşir.','Biüret protein hedefiyle eşleşir.'],scene:1},{q:'Bu dersin renk modelleri neyi gösterir?',options:['Gerçek besinlerin kesin gram miktarını','Hedef molekülün nitel tepkimesini','Bütün organik molekülleri tek testle'],answer:1,why:['Model gram miktarı ölçmez.','Hedef içeren model, ayraçla nitel renk sonucunu gösterir.','Ayraç, hedefe göre seçilir.'],scene:0}],summary:['Doğru ayraç, aranan molekülü gösterir.'],nextLesson:{href:'g2-deneyi-tasarla.html',label:'Sonraki: Deneyi tasarla ›'}});
})();
