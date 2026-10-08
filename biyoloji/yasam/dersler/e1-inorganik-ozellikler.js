/* E1 · BİY.9.1.5 a · Yazar notu: 1 ve 2. sahneler MEB Biyoloji 9 s. 45–46, 51. 3 ve 4. sahneler s. 46'daki
   "İnorganik Moleküllerin Genel Özellikleri" tablosunun altı satırıdır; kitap tabloyu boş verir, cevapları karekodlu
   animasyona bırakır (giriş istediği için açılamadı). Kullanıcı kararıyla (8 Ekim 2026) satırlar kitap dışı genel biyoloji
   bilgisinden dolduruldu (plan/biyoloji/yasam/PLAN.md bölüm 13). "Üretilir mi" satırı "Dışarıdan alınır mı?" diye
   soruldu: mineral hiç üretilemez; su tepkimelerde açığa çıksa da canlı ihtiyacını dışarıdan karşılar. */
(()=>{'use strict';const K=KIT,R=K.renkler.E;
 async function su(c){const s=c.svg(1000,562);c.S('path',{d:'M 210 145 Q 100 290 210 360 Q 320 290 210 145',fill:'#244e64',stroke:R,'stroke-width':4},s);K.yazi(c,s,210,430,'Su');K.ok(c,s,335,255,470,255,R);K.kart(c,s,500,125,410,260,'Hücre',['Yapısal bütünlük','Biyolojik süreçler'],{renk:R});
  await c.say('Hücrelerde organik bileşenlerin yanında inorganik bileşenler de bulunur.');await c.say('Su ve mineraller, bu bileşenlerin önemli örnekleridir.');await c.say('Bir bileşenin önemi, hücrede üstlendiği işlerle değerlendirilir.');
  await K.soru(c,'İnorganik bileşenlerin hücredeki önemi nasıl değerlendirilir?',['Yalnız görünüşlerinin basitliğiyle','Yapı ve biyolojik süreçlere katkısıyla','Hücrede işlevlerinin bulunmadığını varsayarak'],1,'Su ve mineraller, yapıya ve yaşamsal işlevlere katkı sağlar.');
  await c.say('Hücrelerde ve vücutta en fazla bulunan molekül sudur.',{speak:'Hücrelerde ve vücutta en fazla bulunan molekül [short pause] sudur.'});await c.say('Suyun çözücülüğü, besinlerin taşınmasına yardımcı olur.');await c.say('Metabolik atıkların uzaklaştırılmasında da bu özellik önemlidir.');K.temiz(s);K.kart(c,s,110,160,350,210,'Taşıma',['Besinler'],{renk:R});K.kart(c,s,540,160,350,210,'Uzaklaştırma',['Metabolik atıklar'],{renk:R});K.yazi(c,s,500,450,'Suyun çözücülüğü',{renk:R});await c.say('Su, metabolik reaksiyonlar ve enzimlerin çalışması için de gereklidir.');await c.say('Vücut sıcaklığı ve yapısal bütünlük, suyla ilişkili diğer görevlerdir.');c.note('Su ve mineraller yaşamsal işlevlere katılır.','İnorganik bileşenler');
 }
 async function mineral(c){const s=c.svg(1000,562);K.kart(c,s,60,150,260,190,'Toprak ve su',['Mineraller'],{renk:R});K.kart(c,s,380,150,240,190,'Bitki',['Çözünmüş alım'],{renk:R});K.kart(c,s,680,150,260,190,'Hayvan',['Besin ve su'],{renk:R});K.ok(c,s,330,245,365,245,R);K.ok(c,s,635,245,670,245,R);
  await c.say('Mineraller, büyüme ve vücut işlevlerinde görev alır.');await K.soru(c,'Minerallerin alınması için hangi açıklama uygundur?',['Organizmalar mineralleri kendi bünyesinde üretir','Mineraller dışarıdan alınır','Mineraller yalnız cansız ortamda bulunur'],1,'Organizmalar ihtiyaç duydukları mineralleri kendi bünyesinde üretemez.');
  await c.say('Bitkiler gerekli mineralleri topraktan çözünmüş olarak alır.');await c.say('Hayvanlar besinler ve içme suyuyla mineral alır.');await c.say('Minerallerin kemik, kas ve sinir işlevlerinde farklı görevleri vardır.');await c.say('Su dengesinin düzenlenmesinde de mineraller rol alır.');await c.say('Bazı mineraller hormonları ve enzimleri destekler.');await c.say('Bu görevler, bütün minerallerin aynı işi yaptığı anlamına gelmez.');await c.say('Besin kaynağı ile görev bilgisi birlikte değerlendirilir.');
 }
 /* Altı özelliğin tablosu: üçer satır, iki sahnede. */
 function tablo(c,s){K.yazi(c,s,110,105,'Özellik',{hiza:'start',size:26,renk:'var(--muted)'});K.yazi(c,s,640,105,'Su',{size:28,renk:R});K.yazi(c,s,820,105,'Mineral',{size:28,renk:R});K.cizgi(c,s,90,130,910,130,'var(--muted)',{width:2});
  return (i,ad,su,mineral)=>{const g=c.S('g',{},s),y=200+i*85,renk=(v)=>v==='Evet'?R:'var(--c2)';K.yazi(c,g,110,y,ad,{hiza:'start',size:28});K.yazi(c,g,640,y,su,{size:28,renk:renk(su)});K.yazi(c,g,820,y,mineral,{size:28,renk:renk(mineral)});return K.belir(c,g,350);};}

 /* ---- Sahne 3 · Sindirilmez, zardan geçer, enerji vermez ---- */
 async function kucuk(c){const s=c.svg(1000,562),zar=c.S('g',{},s);
  K.cizgi(c,zar,550,70,550,430,R,{width:5});K.cizgi(c,zar,572,70,572,430,R,{width:5});K.yazi(c,zar,561,480,'Hücre zarı',{size:26,renk:R});K.yazi(c,zar,790,110,'Hücre içi',{size:26,renk:'var(--muted)'});
  const zincir=c.S('g',{},s);for(let i=0;i<6;i++){if(i)K.cizgi(c,zincir,95+i*52,190,125+i*52,190,'var(--c2)',{width:4});c.S('circle',{cx:110+i*52,cy:190,r:20,fill:'#4a3324',stroke:'var(--c2)','stroke-width':3},zincir);}K.yazi(c,zincir,240,255,'Nişasta',{size:26,renk:'var(--c2)'});
  await K.belir(c,zar,350);await K.belir(c,zincir);
  await c.say('Nişasta ve protein gibi besinler büyük moleküllerdir.');
  await c.tween(700,(e)=>zincir.setAttribute('transform',`translate(${150*e} 0)`));
  await c.say('Büyük moleküller hücre zarından geçemez; önce sindirilerek küçültülür.');
  const su=c.S('g',{},s);c.S('circle',{cx:240,cy:340,r:9,fill:R},su);K.yazi(c,su,240,390,'Su',{size:26,renk:R});
  const mi=c.S('g',{},s);c.S('circle',{cx:400,cy:340,r:9,fill:'var(--c4)'},mi);K.yazi(c,mi,400,390,'Mineral',{size:26,renk:'var(--c4)'});
  await K.belir(c,su,350);await K.belir(c,mi,350);
  await c.say('Su ve mineraller ise zaten çok küçüktür.');
  await c.choice({tag:'Tahmin et',q:'İçtiğin su, hücrelerine girmeden önce sindirilir mi?',options:['Evet, alınan her madde sindirilir.','Hayır, zardan geçecek kadar küçüktür.','Evet, ama yalnızca midede.'],answer:1,hints:['Sindirim, büyük molekülü küçültmek içindir.','','Su molekülü zaten küçüktür; küçültülecek bir şey yok.'],right:'Su ve mineraller sindirilmeden hücre zarından geçer.'});
  await c.tween(900,(e)=>{su.setAttribute('transform',`translate(${480*e} 0)`);mi.setAttribute('transform',`translate(${400*e} 0)`);});
  await c.say('Su ve mineraller sindirilmez; hücre zarından doğrudan geçer.');
  K.temiz(s);const satir=tablo(c,s);await satir(0,'Sindirilir mi?','Hayır','Hayır');await satir(1,'Zardan geçer mi?','Evet','Evet');
  await c.say('Hücresel solunumda besinler parçalanır ve enerji açığa çıkar.');
  await c.say('Bu iş için karbonhidrat ve yağ gibi organik besinler kullanılır.');
  await satir(2,'Enerji verir mi?','Hayır','Hayır');
  await c.say('Su ve mineraller enerji vermez; hücresel solunumda yakıt olarak kullanılmaz.',{speak:'Su ve mineraller enerji vermez; [short pause] hücresel solunumda yakıt olarak kullanılmaz.'});
  c.note('<b>Su ve mineraller sindirilmez, enerji vermez.</b><br>Küçük oldukları için hücre zarından doğrudan geçerler.','Küçük molekül');
 }

 /* ---- Sahne 4 · Dışarıdan alınır, yapıya katılır, düzenler ---- */
 async function gorev(c){const s=c.svg(1000,562),satir=tablo(c,s);
  await c.say('Mineralleri hiçbir canlı kendi bünyesinde üretemez; hepsi dışarıdan alınır.');
  await c.say('Canlı, ihtiyacı olan suyu da dışarıdan alır.');
  await c.say('Bazı tepkimelerde su açığa çıkar, ama bu ihtiyacı karşılamaz.',{speak:'[thoughtful] Bazı tepkimelerde su açığa çıkar, ama bu ihtiyacı karşılamaz.'});
  await satir(0,'Dışarıdan alınır mı?','Evet','Evet');
  await c.say('Su, hücrenin büyük bölümünü oluşturur.');
  await c.say('Kalsiyum ve fosfor mineralleri kemiklerin ve dişlerin yapısına katılır.');
  await satir(1,'Yapıya katılır mı?','Evet','Evet');
  await c.say('Düzenleyici molekül, vücuttaki olayların dengeli ve düzgün yürümesini sağlar.');
  await c.say('Terlediğinde su, vücut sıcaklığını dengeler.');
  await c.choice({tag:'Uygula',q:'Mineraller kasların ve sinirlerin çalışmasında görev alır. Bu hangi özelliğe örnektir?',options:['Enerji verme','Yaşamsal faaliyetleri düzenleme','Sindirilme'],answer:1,hints:['Su ve mineraller enerji vermez.','','Mineraller sindirilmez; burada bir görevden söz ediliyor.'],right:'Kas ve sinirlerin düzgün çalışmasını sağlamak düzenleyici bir görevdir.'});
  await satir(2,'Düzenleyici mi?','Evet','Evet');
  await c.say('Su sıcaklığı dengeler; mineraller kas, sinir ve su dengesinde görev alır.');
  await c.say('Su ve mineraller enerji vermez; ama onlarsız hiçbir yaşamsal faaliyet yürümez.',{speak:'[thoughtful] Su ve mineraller enerji vermez; ama onlarsız hiçbir yaşamsal faaliyet yürümez.'});
  c.note('<b>Su ve mineraller yapıya katılır ve düzenler.</b><br>Canlı ikisini de dışarıdan alır.','İnorganik moleküller');
 }
 Ders.start({id:'yasam-e1',kicker:'Konu E · İnorganik moleküller',title:'Su ve minerallerin yaşamsal görevleri',accent:R,back:'index.html',intro:{title:'Su ve mineraller',hook:'Su ve mineraller enerji vermez. Peki neden onlarsız yaşayamayız?',button:'Derse başla ›'},goals:[],scenes:[{title:'Suyun hücredeki işleri',goal:'Su görevleriyle çıkarım yap.',run:su},{title:'Mineraller dışarıdan alınır',goal:'Alımla görevleri ilişkilendir.',run:mineral},{title:'Küçük molekül, doğrudan geçiş',goal:'Sindirim, zar geçişi ve enerjiyi değerlendir.',run:kucuk},{title:'Yapıya katılır, düzenler',goal:'Alım, yapı ve düzenleme görevini değerlendir.',run:gorev}],quizTitle:'Çıkış soruları',quiz:[{q:'Su ve mineraller için hangisi doğrudur?',options:['Sindirilmeden hücre zarından geçerler.','Hücresel solunumda enerji verirler.','Canlının yapısına katılmazlar.'],answer:0,why:['Küçük oldukları için sindirilmeleri gerekmez.','Enerji veren, karbonhidrat ve yağ gibi organik besinlerdir.','Su hücrenin büyük bölümüdür; kalsiyum kemiğin yapısındadır.'],scene:2},{q:'Mineraller organizmaya nasıl sağlanır?',options:['Her zaman bünyede üretilir','Dışarıdan alınır','Yalnız hayvanlarda bulunur'],answer:1,why:['Organizmalar ihtiyaç duydukları mineralleri üretemez.','Bitki ve hayvanlarda dışarıdan alım yolları vardır.','Bitkiler de mineral alır.'],scene:1},
      { q: 'Bir koşucu, terle kaybettiği suyu ve mineralleri yalnızca su ve mineral içeren bir içecekle geri alıyor. İçecekteki su ve mineraller için hangisi doğrudur?',
        options: ['Büyük molekül oldukları için hücreye girmeden önce sindirilmeleri gerekir.', 'Hücresel solunumda parçalanıp koşucuya enerji sağlarlar.', 'Dışarıdan alınır, sindirilmeden hücre zarından geçer, enerji vermezler.'], answer: 2,
        why: ['Su ve mineraller zaten çok küçüktür; sindirilecek bir şey yoktur.', 'Enerji veren, karbonhidrat ve yağ gibi organik besinlerdir; su ve mineraller yakıt olmaz.', 'Dışarıdan alınan su ve mineraller küçük oldukları için doğrudan geçer ve enerji vermez.'], scene: 2 },
      { q: 'Aylin: “Su ve mineraller enerji vermez; bu yüzden hücrede hiçbir işe yaramazlar.” Bu cümleye en uygun karşılık hangisidir?',
        options: ['Enerji vermezler; ama yapıya katılır ve yaşamsal işlevleri düzenlerler.', 'Aylin haklı; enerji vermeyen bir molekül hücrede görev almaz.', 'Su hücrede sindirilerek enerjiye dönüştüğü için cümle yanlıştır.'], answer: 0,
        why: ['Su sıcaklığı dengeler, mineraller kas ve sinirlerde görev alır; enerji vermemek işe yaramamak değildir.', 'Enerji vermeyen moleküller de yapıya katılır ve düzenleyici görev yapar.', 'Su sindirilmez ve enerji vermez; cümlenin yanlışlığı başka yerdedir.'], scene: 3 }],summary:['<b>Su ve mineraller sindirilmez, enerji vermez, dışarıdan alınır.</b>','Zardan doğrudan geçer, yapıya katılır ve yaşamsal faaliyetleri düzenler.'],nextLesson:{href:'e2-su-tutunur.html',label:'Sonraki: Su tutunur ›'}});
})();
