/* MEB Biyoloji 9 s.75–77; BİY.9.1.7 b. Modeller pozitif renk ilişkisidir, besin ölçümü değildir. */
(() => {
'use strict';const K=KIT,renk=K.renkler.G;
function tup(c,s,hedef,ayrac){K.temiz(s);K.yazi(c,s,500,65,'Hedef içeren model örnek',{size:30,renk});
 c.S('path',{d:'M220 140 L220 355 Q220 410 280 410 Q340 410 340 355 L340 140',fill:'none',stroke:'#9aa7bc','stroke-width':4},s);
 const sivi=c.S('path',{d:'M228 280 L228 355 Q228 402 280 402 Q332 402 332 355 L332 280 Z',fill:'#334058'},s);
 const damla=c.S('circle',{cx:280,cy:110,r:11,fill:renk,opacity:0},s);K.yazi(c,s,280,470,hedef+' modeli',{size:30});K.kart(c,s,550,140,380,150,'Ayraç',[ayrac],{renk});return {sivi,damla};}
async function uygula(c,s,t,fill,ad){await c.tween(650,e=>{t.damla.setAttribute('opacity',e<.96?1:0);t.damla.setAttribute('cy',110+170*e);});t.sivi.setAttribute('fill',fill);K.yazi(c,s,740,380,ad,{size:30});}
function tablo(c,s){K.temiz(s);K.yazi(c,s,500,70,'Model sonuçları · nitel',{size:30,renk});
 const xs=[160,415,630,840];['Örnek','Ayraç','Renk','Sonuç'].forEach((a,i)=>K.yazi(c,s,xs[i],155,a,{size:27,renk}));
 const satirlar=[['Nişasta modeli','Lugol','Mavi-mor','Nişasta'],['Protein modeli','Biüret','Mor','Protein'],['Yağ modeli','Sudan III/IV','Kırmızı','Yağ']];
 satirlar.forEach((a,j)=>{K.cizgi(c,s,50,185+j*100,950,185+j*100,'#374561');a.forEach((v,i)=>K.yazi(c,s,xs[i],245+j*100,v,{size:25}));});}
async function kaydet(c){const s=c.svg(1000,562);const t=tup(c,s,'Protein','Biüret');
 await c.say('Bir deney kaydı, örneği ve kullanılan ayracı belirtir.');
 await c.say('Gözlenen renk, yorumdan ayrı kaydedilir.');
 await c.say('Bu sahnede protein içeren bir model örnek kullanıyoruz.');
 await c.cont('Biüreti modele uygula ›');await uygula(c,s,t,'#ac72cc','Mor');
 await K.soru(c,'Bu model uygulaması hangi kayıtla korunur?',['Süt · Lugol · mor · kesin 10 gram','Protein modeli · Biüret · mor · protein var','Bütün besinler · Biüret · tüm moleküller var'],1,'Örnek, ayraç ve renk korunarak nitel sonuç kaydedilir.');
 K.temiz(s);K.kart(c,s,80,150,390,185,'Gözlem',['Protein modeli · Biüret','Mor renk'],{renk,altSize:26});K.ok(c,s,485,240,535,240,renk);K.kart(c,s,550,150,370,185,'Nitel sonuç',['Modelde protein var'],{renk});
 await c.say('Bu kayıt, gerçek süt ölçümü veya gram miktarı değildir.');c.note('Beklenmeyen sonuç, önce deneyi sorgulatır.','Sonuç analizi');}
async function analiz(c){const s=c.svg(1000,562);tablo(c,s);
 await c.say('Üç modelin hedefi baştan verilmiştir; uygun ayraç renk oluşturur.');
 await c.say('Tablo, farklı hedeflerin nitel sonuçlarını birlikte incelemeyi sağlar.');
 await K.soru(c,'Bu model tablosundan hangi yorum çıkarılabilir?',['Her gerçek besinin kesin gram miktarı bilinmektedir.','Bütün besinler yalnız bir molekül içerir.','Uygun ayraç verilen hedefte nitel renk tepkimesi göstermiştir.'],2,'Tablo yalnız bu modellerin hedef–ayraç–renk ilişkisini kaydeder.');
 await c.say('Gerçek besinlerde aynı sonuç, uygun deney yapılmadan ilan edilmez.');}
async function hata(c){const s=c.svg(1000,562);const t=tup(c,s,'Nişasta','Biüret');K.yazi(c,s,740,380,'Hedefle eşleşmiyor',{size:25});
 await c.say('Nişasta arama planında yanlışlıkla Biüret seçildiğini düşün.');
 await K.soru(c,'Bu yöntem hatasında nasıl devam edersin?',['Nişasta kesin yok diye yazılır.','Sonuç tahmine göre uydurulur.','Uygun ayraç seçilip işlem tekrarlanır.'],2,'Yanlış ayraçla nişasta hakkında yokluk kararı kurulmaz.');
 await K.soru(c,'Nişasta hedefi için hangi ayraçla tekrar yapılır?',['Lugol','Biüret','Sudan III/IV'],0,'Nişasta hedefi Lugol ile eşleşir.');
 const tekrar=tup(c,s,'Nişasta','Lugol');await uygula(c,s,tekrar,'#7563cf','Mavi-mor');
 await c.say('Hedef içeren model, düzeltilmiş ayraç seçiminde mavi-mor verir.');
 await c.say('Gerçek deneyde yöntem ve olası hatalar kontrol edilerek tekrar yapılır.');}
async function gercek(c){const s=c.svg(1000,562);K.yazi(c,s,500,70,'Gerçek deney için kayıt',{size:30,renk});
 K.kart(c,s,90,135,820,245,'Patateste nişasta araştırması',['Ayraç: Lugol','Gözlem: henüz yapılmadı','Sonuç: boş'],{renk});
 await c.say('Gerçek besin seçimi, henüz bir deney sonucu sağlamaz.');
 await K.soru(c,'Bu aşamada sonuç alanına ne yazılabilir?',['Gözlem yok; sonuç henüz belirlenmedi.','Nişasta kesin yok.','Nişasta miktarı kesin biliniyor.'],0,'Sonuç gözlemle belirlenir; yokluk veya miktar uydurulmaz.');
 await c.say('İki ekip aynı besinde farklı bulgular elde edebilir.');
 await K.soru(c,'Farklı bulgular karşısında hangi yol izlenir?',['Bir ekibin sonucu sebepsizce silinir.','Yöntem ve hata kaynakları incelenir, deney tekrarlanır.','Sonuçlar tahmine göre değiştirilir.'],1,'Yöntem veya deneysel hata olasılığı araştırılır, tekrar yapılır.');
 K.temiz(s);K.kart(c,s,50,185,275,140,'Yöntem kontrolü',[],{renk,size:26});K.ok(c,s,340,255,365,255,renk);K.kart(c,s,380,185,240,140,'Tekrar',[],{renk});K.ok(c,s,635,255,660,255,renk);K.kart(c,s,675,185,275,140,'Yeni kayıt',[],{renk});
 await c.say('Gerçek uygulama, öğretmen rehberliğinde laboratuvar kurallarına uygun yapılır.');
 await c.say('Rapor, sunu ve dijital paylaşım sınıftaki çalışmayı tamamlar.');}
Ders.start({id:'yasam-g3',kicker:'Konu G · Besinlerde organik molekül arama',title:'Deneyi yap, sonucu analiz et',accent:renk,back:'index.html',intro:{title:'Deneyi yap, sonucu analiz et',hook:'Sonuç beklenmedikse önce neyi kontrol edersin?',button:'Derse başla ›'},goals:[],scenes:[{title:'Uygula ve kaydet',goal:'Model uygulamasını doğru kaydet.',run:kaydet},{title:'Sonuçları yorumla',goal:'Nitel sonuçların kapsamını koru.',run:analiz},{title:'Hatayı bul, tekrar et',goal:'Yanlış ayraç seçimini düzelt.',run:hata},{title:'Gerçek besinin sonucu',goal:'Ölçülmemiş sonuç hakkında karar verme.',run:gercek}],quizTitle:'Çıkış soruları',quiz:[{q:'Nişasta ararken yanlış ayraç kullanılmışsa ne yapılır?',options:['Nişasta yokluğu kesinleştirilir.','Yöntem düzeltilip deney tekrarlanır.','Sonuç tahmine göre yazılır.'],answer:1,why:['Yöntem hatası yokluk kanıtı değildir.','Uygun ayraçla tekrar ve gözlem gerekir.','Sonuç gözleme dayanmalıdır.'],scene:2},{q:'Üç modelin renk tablosu neyi gösterir?',options:['Bütün besinlerin tam içeriğini','Gerçek besinlerin kesin gram miktarını','Verilen modellerin nitel renk sonuçlarını'],answer:2,why:['Modeller bütün besinleri temsil etmez.','Renk tablosu gram ölçmez.','Örnek, hedef, ayraç ve renk ilişkisi korunur.'],scene:1}],summary:['Beklenmeyen sonuç, önce deneyi sorgulatır.'],nextLesson:{href:'h1-deneyi-tasarla.html',label:'Sonraki: Enzim deneyini tasarla ›'}});
})();
