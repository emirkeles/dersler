/* C2 · KİM.9.1.3 · MEB Kimya 9 s.47, 50–52.
   Enerji aralıkları ve olasılık noktaları temsili; hesap veya elektron izi değildir. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const MOR='#c792ff', ELEKTRON='var(--c1)', CEKIRDEK='var(--c2)';
  const nokta=(c,p,x,y,r=12,renk=ELEKTRON)=>c.S('circle',{cx:x,cy:y,r,fill:renk},p);
  function bohr(c,p,x,y,r,adet=1) {
    const g=c.S('g',{},p);
    [r*.45,r*.72,r].forEach((rr)=>c.S('circle',{cx:x,cy:y,r:rr,fill:'none',stroke:MOR,'stroke-width':3},g));
    nokta(c,g,x,y,14,CEKIRDEK);
    for(let i=0;i<adet;i++) {const a=i*2.39996,rr=i===0?r*.45:r*.72; nokta(c,g,x+Math.cos(a)*rr,y+Math.sin(a)*rr);}
    return g;
  }
  function olasilik(c,p,x,y,r) {
    const g=c.S('g',{},p);
    c.S('circle',{cx:x,cy:y,r,fill:ELEKTRON,'fill-opacity':.08},g);
    // Çok sayıda muhtemel konumun şeması: çizgiyle birleşmez, tek elektronun yolu değildir.
    for(let i=0;i<140;i++) {
      const a=i*2.39996323, rr=r*Math.pow((i+.5)/140,1.15);
      nokta(c,g,x+Math.cos(a)*rr,y+Math.sin(a)*rr,3.5);
    }
    nokta(c,g,x,y,14,CEKIRDEK);
    return g;
  }
  function ok(c,p,x1,y1,x2,y2,renk=MOR) {
    c.S('line',{x1,y1,x2,y2,stroke:renk,'stroke-width':5},p);
    const a=Math.atan2(y2-y1,x2-x1),l=18;
    c.S('path',{d:`M ${x2-l*Math.cos(a-.55)} ${y2-l*Math.sin(a-.55)} L ${x2} ${y2} L ${x2-l*Math.cos(a+.55)} ${y2-l*Math.sin(a+.55)}`,fill:'none',stroke:renk,'stroke-width':5},p);
  }
  async function hatirlat(c) {
    const svg=c.svg();
    yazi(c,svg,500,60,'Bohr · kısa hatırlatma',{size:36,renk:MOR});
    bohr(c,svg,370,280,150,0);
    const e=nokta(c,svg,437.5,280);
    yazi(c,svg,720,190,'n = 3',{size:34});
    yazi(c,svg,720,275,'n = 2',{size:34});
    yazi(c,svg,720,360,'n = 1',{size:34});
    ok(c,svg,865,380,865,160);
    yazi(c,svg,720,450,'Enerji artar',{size:34});
    await c.say('Bohr modelinde elektron, belirli enerji düzeylerinde bulunur.');
    await c.choice({q:'Bohr modelinde çekirdekten uzak düzeyin enerjisi nasıl olur?',options:['Daha yüksek','Daha düşük','Her düzey aynı'],answer:0,
      hints:['','Bu modelde uzaklaştıkça enerji artar.','Enerji düzeyleri farklıdır.'],right:'Daha yüksek. Kesin yörünge Bohr modelinin varsayımıdır.'});
    const yaricap=[67.5,108,150];
    c.slider({label:'Bohr enerji düzeyi',min:1,max:3,step:1,value:1,fmt:(i)=>'n = '+i,onInput:(i)=>{e.setAttribute('cx',370+yaricap[i-1]);}});
    await c.say('Düzeyi değiştir; noktanın konumunu model içinde karşılaştır.',{noWait:true});
    await c.cont();
  }
  async function gecis(c) {
    const svg=c.svg();
    yazi(c,svg,500,55,'Bohr modelinde enerji geçişleri',{size:36});
    [[260,'Soğurma (absorbsiyon)'],[740,'Yayma (emisyon)']].forEach(([x,ad])=>{
      yazi(c,svg,x,125,ad,{size:32,renk:MOR});
      c.S('line',{x1:x-155,y1:225,x2:x+155,y2:225,stroke:'#5b678f','stroke-width':4},svg);
      c.S('line',{x1:x-155,y1:375,x2:x+155,y2:375,stroke:'#5b678f','stroke-width':4},svg);
      yazi(c,svg,x-155,205,'Üst düzey',{size:30,hiza:'start'});
      yazi(c,svg,x-155,425,'Alt düzey',{size:30,hiza:'start'});
    });
    const alan=nokta(c,svg,260,375), veren=nokta(c,svg,740,225);
    await c.say('Soğurma enerji alma, yayma enerji verme sürecidir.');
    await c.say('Üst düzeyin enerjisi, alt düzeyinkinden daha yüksektir.');
    await c.say('Enerji alan elektronun geçiş yönünü önce tahmin et.');
    await c.choice({q:'Soğurmada elektron hangi düzeye geçebilir?',options:['Üst düzeye','Alt düzeye','Her zaman çekirdeğe'],answer:0,
      hints:['','Alt düzeye geçişte enerji yayılabilir.','Elektron çekirdeğe taşınmaz.'],right:'Üst düzeye. Yaymada ise daha düşük düzeye geçilir.'});
    ok(c,svg,325,355,325,245,ELEKTRON); ok(c,svg,805,245,805,355,CEKIRDEK);
    await c.tween(1400,(e)=>{alan.setAttribute('cy',375-150*e);veren.setAttribute('cy',225+150*e);});
    yazi(c,svg,260,495,'Enerji alınır',{size:34,renk:ELEKTRON});
    yazi(c,svg,740,495,'Enerji yayılır',{size:34,renk:CEKIRDEK});
    await c.say('İki geçişte enerjinin yönü birbirinin tersidir.');
    c.note('<b>Soğurma: alır; yayma: verir.</b><br>Örnek: alt → üst, soğurma', 'Enerji geçişi');
  }
  async function sinir(c) {
    const svg=c.svg();
    yazi(c,svg,500,65,'Bohr modelinin sınırı',{size:36});
    bohr(c,svg,260,280,130,1);bohr(c,svg,740,280,130,5);
    yazi(c,svg,260,465,'Tek elektron',{size:34});
    yazi(c,svg,740,465,'Çok elektron',{size:34});
    await c.say('Bir modelin her atomu açıklaması zorunlu değildir.');
    await c.say('Bohr modeli, tek elektronlu sistemleri açıklayabilir.');
    await c.say('Birden çok elektron arasındaki etkileşimlerde açıklaması yetersiz kalır.');
    await c.choice({q:'Bohr modeli hangi sistemlerde yetersiz kalır?',options:['Hidrojen atomunda','Çok elektronlu atomlarda','Tek elektronlu iyonlarda'],answer:1,
      hints:['Kitap hidrojen atomunu geçerli örnek olarak verir.','','Kitap tek elektronlu iyonları geçerli örnek olarak verir.'],right:'Çok elektronlu sistemlerde yetersizdir. Daha kapsamlı açıklama gerekir.'});
    const g=c.S('g',{},svg);
    yazi(c,g,260,530,'Açıklar',{size:34,renk:'var(--good)'});
    yazi(c,g,740,530,'Yetersiz',{size:34,renk:'var(--bad)'});
    await belir(c,g,600);
    await c.say('Eksik kalan açıklama, modern modelin geliştirilmesine yol açtı.');
  }
  async function belirsizlik(c) {
    const svg=c.svg();
    yazi(c,svg,500,65,'Heisenberg belirsizlik ilkesi',{size:36,renk:MOR});
    bohr(c,svg,500,270,130,1);
    const kesin=c.S('g',{},svg);
    yazi(c,kesin,210,280,'Konum: kesin?',{size:32});
    yazi(c,kesin,790,280,'Hız: kesin?',{size:32});
    await c.say('Heisenberg ilkesi, konum ve hızı birlikte ele alır.');
    await c.say('Elektronda ikisi aynı anda kesin olarak belirlenemez.');
    await c.say('Bu, ölçüm cihazının bozuk olmasına bağlı değildir.');
    await c.choice({q:'“Daha iyi cihazla konum ve hız birlikte kesin bulunur.” iddiası?',options:['Belirsizlik ilkesine aykırıdır.','Belirsizlik ilkesiyle uyumludur.','İlke yalnız bozuk cihazda geçerlidir.'],answer:0,
      hints:['','İlke, ikisinin aynı anda kesin belirlenmesine izin vermez.','İlke cihaz bozukluğuyla açıklanmaz.'],right:'Kesin yörünge varsayımı bu bilgiyle yeniden değerlendirilir.'});
    svg.replaceChildren();
    yazi(c,svg,500,65,'Heisenberg belirsizlik ilkesi',{size:36,renk:MOR});
    const g=olasilik(c,svg,500,265,150);await belir(c,g,800);
    yazi(c,svg,500,465,'Konum + hız',{size:38});
    yazi(c,svg,500,520,'Birlikte kesin belirlenemez',{size:34});
    await c.say('Kesin yörünge yerine olasılığa dayanan açıklama geliştirilir.');
    c.note('<b>Konum ve hız birlikte kesin belirlenemez.</b><br>Örnek: elektron', 'Belirsizlik');
  }
  async function orbital(c) {
    const svg=c.svg();
    const ciz=(i)=>{
      svg.replaceChildren();
      yazi(c,svg,500,60,i?'Modern: orbital':'Bohr: yörünge',{size:38,renk:MOR});
      if(i)olasilik(c,svg,500,270,145);else bohr(c,svg,500,270,145,1);
      yazi(c,svg,500,460,i?'Yüksek bulunma olasılığı':'Kesin dairesel yol',{size:36});
      yazi(c,svg,500,520,'Ortak fikir: enerji düzeyleri',{size:32});
    };
    ciz(0);
    await c.say('Çizgi bir yol gösterir; nokta dağılımı olası konumları temsil eder.');
    ciz(1);
    await c.say('Orbital, elektronun bulunma olasılığının yüksek olduğu bölgedir.');
    await c.say('Bu bölge kesin bir yörünge çizgisi değildir.');
    await c.choice({q:'Olasılık noktalarını birleştirip kesin elektron yolu çizebilir miyiz?',options:['Hayır; dağılım olası konumları gösterir.','Evet; noktalar kesin yoldur.','Noktalar farklı elektronlardır.'],answer:0,
      hints:['','Orbital kesin bir yörünge değildir.','Noktalar tek elektronun farklı olası konumlarını temsil eder.'],right:'Bölgeyle yolu ayır. Nokta dağılımı yörünge çizgisi değildir.'});
    ciz(1);await belir(c,svg.children[1],700);
    c.note('<b>Orbital: yüksek bulunma olasılığının bölgesi.</b><br>Örnek: çekirdek çevresindeki bölge', 'Orbital');
    c.slider({label:'İki modeli karşılaştır',min:0,max:1,step:1,value:1,fmt:(i)=>i?'Modern':'Bohr',onInput:ciz});
    await c.say('Modelleri değiştir; ortak enerji fikrini ve farklı yer açıklamasını karşılaştır.',{noWait:true});
    await c.cont();
    c.clearAct();svg.replaceChildren();
    c.S('circle',{cx:180,cy:270,r:60,fill:MOR,'fill-opacity':.25,stroke:MOR,'stroke-width':3},svg);
    yazi(c,svg,180,282,'TENMAK',{size:30});
    ok(c,svg,290,270,410,270);
    yazi(c,svg,675,240,'Hızlandırıcı teknolojileri',{size:34});
    yazi(c,svg,675,310,'Atom / atom altı projeler',{size:34});
    await c.say('TENMAK, atom ve atom altı düzeydeki millî projelerle anılır.');
    ciz(1);
    await c.say('Noktalar elektronun yolunu değil, olası konumlarını temsil eder.');
  }
  Ders.start({
    id:'etkilesim-c2',kicker:'Konu C · Atom teorileri',title:'Yörüngeden orbitale',accent:MOR,back:'index.html',
    intro:{title:'Yörüngeden orbitale',hook:'Elektron için kesin bir yol çizebilir miyiz?',button:'Derse başla ›'},
    scenes:[
      {title:'Bohr hatırlatma',goal:'Yörünge ile enerji düzeyini hatırla.',run:hatirlat},
      {title:'Soğurma ve yayma',goal:'Enerji geçişlerinin yönünü karşılaştır.',run:gecis},
      {title:'Modelin sınırı',goal:'Çok elektronlu sistemlerdeki eksikliği belirle.',run:sinir},
      {title:'Konum ve hız',goal:'Aynı anda kesin belirlenememesini açıkla.',run:belirsizlik},
      {title:'Olasılık bölgesi',goal:'Orbital ile yörüngeyi ayır.',run:orbital},
    ],quizTitle:'Çıkış soruları',
    quiz:[
      {q:'Orbital nedir?',options:['Kesin dairesel yol','Bulunma olasılığının yüksek olduğu bölge','Elektronun kendisi'],answer:1,
        why:['Yörünge, Bohr modelinin varsayımıdır.','Modern modelde orbital olasılık bölgesidir.','Orbital bir parçacık değildir.'],scene:4},
      {q:'Enerji alarak üst düzeye geçişe ne denir?',options:['Yayma (emisyon)','İyonun proton kazanması','Soğurma (absorbsiyon)'],answer:2,
        why:['Yayma, enerji çıkışıyla alt düzeye geçiştir.','Bu geçişte proton kazanılmaz.','Enerji alınır; üst enerji düzeyine geçilir.'],scene:1},
    ],summary:['<b>Elektronun yolu değil, bulunma olasılığı gösterilir.</b>','Bohr ve modern model enerji düzeylerini kullanır; yer açıklamaları farklıdır.'],
    nextLesson:{href:'d1-orbital-enerjileri.html',label:'Sonraki: Orbitallerin enerjisi ›'},
  });
})();
