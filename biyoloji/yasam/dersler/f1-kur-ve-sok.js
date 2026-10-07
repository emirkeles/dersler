/* Kaynak: MEB 9 Biyoloji, s. 56–57. Kapsam: BİY.9.1.6. Şematik modeller; açık formül yok. */
(()=>{
"use strict";const K=KIT,R=K.renkler.F;
function ask(c,q,options,answer,right){return K.soru(c,q,options,answer,right,options.map((_,i)=>i===answer?'':'Modelin parçalarını ve süreç yönünü yeniden değerlendir.'));}
function text(c,p,x,y,t,size=30,col){return K.yazi(c,p,x,y,t,{size,renk:col});}
function chain(c,p,x,y,n=7,fold=false){for(let i=0;i<n;i++){let xx=x+i*46,yy=y+(fold?Math.sin(i*1.2)*44:0);if(i)K.cizgi(c,p,xx-46,y+(fold?Math.sin((i-1)*1.2)*44:0),xx,yy,R);c.S('circle',{cx:xx,cy:yy,r:16,fill:R},p);}}
function sugar(c,p,x,y,label,sides=6,col=R){let pts=[];for(let i=0;i<sides;i++){let a=-Math.PI/2+i*2*Math.PI/sides;pts.push([x+52*Math.cos(a),y+52*Math.sin(a)].join(','));}c.S('polygon',{points:pts.join(' '),fill:'#202a43',stroke:col,'stroke-width':4},p);text(c,p,x,y+95,label);}
function drop(c,p,x,y){c.S('path',{d:`M ${x} ${y-32} Q ${x-36} ${y+10} ${x-18} ${y+28} Q ${x} ${y+45} ${x+18} ${y+28} Q ${x+36} ${y+10} ${x} ${y-32}`,fill:'var(--c6)'},p);text(c,p,x,y+82,'Su');}
function fat(c,p,x,y,tails=3){K.kutu(c,p,x,y,40,145,{renk:R,rx:10});for(let i=0;i<tails;i++)c.S('path',{d:`M ${x+40} ${y+25+i*48} l 38 0 l 18 14 l 24 -14 l 24 14 l 24 -14 l 24 14 l 24 -14`,fill:'none',stroke:R,'stroke-width':9,'stroke-linecap':'round'},p);}
async function s1(c){const s=c.svg(1000,562),g=c.S("g",{},s);text(c,s,500,65,"Küçük birimden zincire",32);sugar(c,g,285,245,'Birim');sugar(c,g,715,245,'Birim');
await c.say('Organik moleküllerin büyüklükleri ve görevleri birbirinden farklıdır.');
await c.say('Bazı büyük moleküller, monomer denilen küçük birimlerden kurulur.');
await c.say('Modeldeki parçaların birleşmesini ve ayrılmasını izleyeceğiz.');
await ask(c,'Küçük birimleri birleştirince model nasıl değişir?',['Bağlanan birimlerden uzun yapı oluşur','Bütün birimler kaybolur','Yalnız su kalır'],0,'Birimler kaybolmaz; birbirine bağlanarak daha büyük yapı oluşturur.');
K.temiz(g);chain(c,g,270,265,11);text(c,g,500,390,'Polimerizasyon');await c.tween(900,e=>g.setAttribute('opacity',e));
await c.say('Monomerlerin bağlanarak polimer oluşturmasına polimerizasyon denir.');
await c.say('Zincirdeki her parça küçük bir moleküler birimi temsil eder.');
await c.say('Şema molekülün açık formülünü göstermez.');
}
async function s2(c){const s=c.svg(1000,562),g=c.S("g",{},s);text(c,s,500,65,"Su dışarı çıkar",32);sugar(c,g,300,235,'Monomer');sugar(c,g,700,235,'Monomer');await c.say('İki birimin birleşme sürecinde suyun konumuna bak.');
await ask(c,'Birimler birleşirken su için hangi değişimi beklersin?',['Kullanılır','Açığa çıkar','Her zaman değişmez'],1,'Dehidrasyonda genellikle su açığa çıkar.');
K.temiz(g);sugar(c,g,360,240,'Birim');sugar(c,g,530,240,'Birim');K.cizgi(c,g,415,240,475,240,R);drop(c,g,780,220);K.ok(c,g,620,240,720,240,'var(--c6)');text(c,g,445,425,'Dehidrasyon');
await K.belir(c,g);await c.say('Birimler birleşirken genellikle su açığa çıkar.');
await c.say('Dehidrasyon, enzim aracılığıyla gerçekleşen ve enerji gerektiren bir süreçtir.');
await c.say('Bu olay büyük molekülün kurulmasıyla ilişkilidir.');
}
async function s3(c){const s=c.svg(1000,562),g=c.S("g",{},s);text(c,s,500,65,"Su ayrılmaya katılır",32);chain(c,g,295,245,10);drop(c,g,500,370);await c.say('Sindirimde büyük moleküller küçük birimlerine ayrılabilir.');await c.say('Hidroliz, dehidrasyonun tersine işleyen süreçtir.');
await ask(c,'Hidroliz sırasında suyun rolü nedir?',['Ayrılma sırasında kullanılır','Mutlaka dışarı atılır','Polimerin yerine geçer'],0,'Su kullanılarak polimer küçük birimlerine ayrılır.');
K.temiz(g);for(let i=0;i<10;i++)c.S('circle',{cx:140+i*80,cy:245,r:18,fill:R},g);text(c,g,500,340,'Monomerler');text(c,g,500,420,'Hidroliz');
await c.say('Modelde zincir ayrıldı; küçük parçalar ortaya çıktı.');await c.say('İnsan sindirimindeki parçalanma, hidrolize örnektir.');c.note('Su çıkışı dehidrasyonla, su kullanımı hidrolizle ilişkilidir.','Kur ve sök');
}
async function s4(c){const s=c.svg(1000,562),g=c.S("g",{},s);text(c,s,500,65,"Her büyük molekül polimer mi?",32);chain(c,g,145,235,6);fat(c,g,625,190);text(c,g,260,385,'Tekrarlı birim zinciri',26);text(c,g,750,385,'Lipit',28);await c.say('Büyüklük, bir molekülün polimer olduğunu tek başına göstermez.');await c.say('Lipitler organik moleküllerdir; polimerik yapı oluşturmazlar.');await c.say('Polimer, çok sayıda küçük birimin bağlandığı yapıdır.');await ask(c,'Hangi modeli polimer olarak sınıflandırırsın?',['Tekrarlı birim zincirini','Lipit modelini','Büyük olan her modeli'],0,'Tekrarlı birim zinciri polimer modelidir; lipitler polimer değildir.');
K.temiz(g);['Karbohidrat','Lipit','Protein','Nükleik asit','Vitamin'].forEach((t,i)=>{c.S('circle',{cx:140+i*180,cy:240,r:35,fill:R},g);text(c,g,140+i*180,335,t,28);});await c.say('Organik gruplar yapı ve işlevleri bakımından birlikte incelenir.');await c.say('Lipitleri bütün organik moleküller gibi zincir polimer sayamayız.');
}
const cfg={"id": "yasam-f1", "kicker": "Konu F · Organik moleküller", "title": "Büyük molekülü kur, sök", "back": "index.html", "intro": {"title": "Büyük molekülü kur, sök", "hook": "Büyük bir molekül küçük birimlerine nasıl ayrılır?", "button": "Derse başla ›"}, "goals": [], "quizTitle": "Çıkış soruları", "summary": ["Su çıkışı dehidrasyonla, su kullanımı hidrolizle ilişkilidir."], "quiz": [{"q": "Polimeri monomerlere ayıran süreç hangisidir?", "options": ["Hidroliz", "Dehidrasyon", "Polimerizasyon"], "answer": 0, "why": ["Hidrolizde su kullanılır; polimer küçük birimlerine ayrılır.", "Dehidrasyonda birimler birleşirken genellikle su açığa çıkar.", "Polimerizasyon monomerleri birleştirir; ayırma süreci değildir."], "scene": 2}, {"q": "Lipitler için hangi ifade doğrudur?", "options": ["Hepsi polimerdir", "Organiktir; polimer değildir", "Yalnız sudan oluşur"], "answer": 1, "why": ["Lipitler, tekrar eden monomerlerin oluşturduğu polimer zincirler değildir.", "Lipitler organik moleküllerdir; polimerik yapı oluşturmazlar.", "Lipitler yalnız su içermez; farklı organik yapıları vardır."], "scene": 3}], "nextLesson": {"href": "f2-bes-seker.html", "label": "Sonraki: Monosakkaritler: beş şeker ›"}};cfg.accent=R;cfg.scenes=[{title:"Küçük birimden zincire",goal:"Yapı ve işlevi ilişkilendir.",run:s1},{title:"Su dışarı çıkar",goal:"Yapı ve işlevi ilişkilendir.",run:s2},{title:"Su ayrılmaya katılır",goal:"Yapı ve işlevi ilişkilendir.",run:s3},{title:"Her büyük molekül polimer mi?",goal:"Yapı ve işlevi ilişkilendir.",run:s4}];Ders.start(cfg);})();
