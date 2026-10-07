/* C1 · KİM.9.1.3 · MEB Kimya 9 s.46, 48–50, 52.
   Keşif basamakları kitabın veri setidir; tek kanonik keşif yılı değildir. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const MOR = '#c792ff', E = 'var(--c1)', P = 'var(--c2)', N = 'var(--c3)';
  const modeller = [
    ['Dalton', '1803', 'Bölünmez, dolu küre'],
    ['Thomson', '1897', 'Pozitif yapı içinde elektronlar'],
    ['Rutherford', '1911', 'Küçük çekirdek, büyük boşluk'],
    ['Bohr', '1913', 'Belirli enerjili yörüngeler'],
    ['Modern', '1926', 'Elektronun bulunma olasılığı'],
  ];
  const parcaciklar = [
    { ad: 'Elektron', simge: '−', renk: E, yuk: '−1,6022×10⁻¹⁹ C', kutle: '9,1096×10⁻²⁸ g', kesif: ['1832 · katot ışınları', '1891 · atomda eksi yük'] },
    { ad: 'Proton', simge: '+', renk: P, yuk: '+1,6022×10⁻¹⁹ C', kutle: '1,6726×10⁻²⁴ g', kesif: ['1886 · pozitif ışınlar', '1906 · atomda pozitif yük'] },
    { ad: 'Nötron', simge: '0', renk: N, yuk: '0 C', kutle: '1,6749×10⁻²⁴ g', kesif: ['1913 · yüksüz tanecikler', '1932 · nötron'] },
  ];
  function tanecik(c, p, x, y, r, renk, simge) {
    c.S('circle', { cx: x, cy: y, r, fill: renk }, p);
    if (simge) yazi(c, p, x, y + 11, simge, { size: 34, renk: '#111827' });
  }
  function model(c, p, i, x, y, r) {
    const g = c.S('g', {}, p);
    if (i === 0) c.S('circle', { cx: x, cy: y, r, fill: MOR, opacity: .65, stroke: MOR, 'stroke-width': 4 }, g);
    if (i === 1) {
      c.S('circle', { cx: x, cy: y, r, fill: P, 'fill-opacity': .3, stroke: P, 'stroke-width': 4 }, g);
      [[-.42,-.35],[.4,-.2],[0,.42]].forEach(([a,b]) => tanecik(c,g,x+a*r,y+b*r,r*.14,E,''));
    }
    if (i === 2 || i === 3) {
      [r*.58,r].forEach((rr) => c.S('circle',{cx:x,cy:y,r:rr,fill:'none',stroke:i===3?MOR:'#5b678f','stroke-width':3,'stroke-dasharray':i===2?'8 9':'none'},g));
      tanecik(c,g,x,y,r*.13,P,'');
      [[1,0],[-.58,0],[0,-1]].forEach(([a,b])=>tanecik(c,g,x+a*r,y+b*r,r*.09,E,''));
    }
    if (i === 4) {
      c.S('circle',{cx:x,cy:y,r,fill:E,'fill-opacity':.1},g);
      for(let j=0;j<70;j++) {
        const a=j*2.39996, rr=r*Math.sqrt((j+.5)/70);
        c.S('circle',{cx:x+Math.cos(a)*rr,cy:y+Math.sin(a)*rr,r:3.5,fill:E,opacity:.75},g);
      }
      tanecik(c,g,x,y,r*.13,P,'');
    }
    return g;
  }
  async function sira(c) {
    const svg = c.svg();
    yazi(c,svg,500,70,'Atom modelleri · kitap s. 46, 48',{size:34});
    await c.say('Bilinen modelleri kısa bir zaman şeridinde karşılaştıralım.');
    await c.choice({tag:'Sırala',q:'İlk üç modelin doğru sırası hangisi?',options:['Thomson → Dalton → Rutherford','Dalton → Thomson → Rutherford','Rutherford → Thomson → Dalton'],answer:1,
      hints:['1803, 1897’den öncedir.','','Rutherford, ilk iki modelden sonra gelir.'],right:'Dalton, Thomson, Rutherford. Yeni bilgi, yeni açıklamalara yol açtı.'});
    c.S('line',{x1:95,y1:380,x2:905,y2:380,stroke:'#5b678f','stroke-width':4},svg);
    for(let i=0;i<5;i++) {
      const x=100+i*200, g=c.S('g',{},svg);
      model(c,g,i,x,245,62);
      yazi(c,g,x,350,modeller[i][0],{size:30,renk:MOR});
      c.S('circle',{cx:x,cy:380,r:7,fill:MOR},g);
      yazi(c,g,x,435,modeller[i][1],{size:34});
      await belir(c,g,350);
    }
    await c.say('Değişen, atom hakkındaki açıklamamızdır.');
    c.note('<b>Yeni veri, modeli geliştirir.</b><br>Örnek: elektronun varlığı', 'Bilimsel bilgi');
  }
  async function fark(c) {
    const svg=c.svg();
    const ciz=(i)=>{
      svg.replaceChildren(); const m=modeller[i];
      yazi(c,svg,500,70,m[0]+' · '+m[1],{size:38,renk:MOR});
      model(c,svg,i,500,280,140);
      yazi(c,svg,500,480,m[2],{size:34});
      yazi(c,svg,500,535,'Şematik karşılaştırma',{size:30,renk:'var(--muted)'});
    };
    ciz(0);
    await c.say('Şekilleri değiştir; yapıyla ilgili varsayımların farkını bul.');
    await c.choice({q:'Pozitif yükü küçük çekirdekte toplayan model hangisi?',options:['Dalton','Thomson','Rutherford'],answer:2,
      hints:['Dalton modeli dolu küreyle gösterilir.','Thomson’da pozitif yük tüm yapıya dağılır.',''],right:'Rutherford: küçük çekirdek, büyük boşluk.'});
    ciz(2);
    c.slider({label:'Modeli seç',min:0,max:4,step:1,value:2,fmt:(i)=>modeller[i][0],onInput:ciz});
    await c.say('Her modeli seç; tek değişen şemayı karşılaştır.',{noWait:true});
    await c.cont();
  }
  async function veri(c) {
    const svg=c.svg();
    const ciz=(i)=>{
      svg.replaceChildren(); const d=parcaciklar[i];
      yazi(c,svg,500,55,'Kitaptaki keşif basamakları (s.48)',{size:34});
      c.S('rect',{x:70,y:92,width:860,height:425,rx:16,fill:'#162038',stroke:d.renk,'stroke-width':3},svg);
      tanecik(c,svg,150,160,45,d.renk,d.simge);
      yazi(c,svg,240,172,d.ad,{size:40,hiza:'start',renk:d.renk});
      yazi(c,svg,150,245,d.kesif[0],{size:32,hiza:'start'});
      yazi(c,svg,150,297,d.kesif[1],{size:32,hiza:'start'});
      yazi(c,svg,150,385,'Yük: '+d.yuk,{size:36,hiza:'start'});
      yazi(c,svg,150,447,'Kütle: '+d.kutle,{size:36,hiza:'start'});
      yazi(c,svg,500,550,'Yük/kütle: s.50',{size:30,renk:'var(--muted)'});
    };
    for (let i = 0; i < parcaciklar.length; i++) {
      ciz(i);
      await c.say('Karttaki yük ve kütle değerlerini, birimleriyle birlikte oku.');
    }
    await c.say('Üç hazır kayıt, taneciklerin özelliklerini karşılaştırmamızı sağlar.');
    await c.choice({q:'Elektron ve protonun elektrik yükleri nasıl karşılaştırılır?',options:['İkisi de pozitiftir.','Miktarları eşit, işaretleri zıttır.','Elektron yüksüzdür.'],answer:1,
      hints:['Elektronun yükü negatiftir.','','Elektron kartında sıfır yük yazmıyor.'],right:'Miktarları eşittir; elektron negatif, proton pozitiftir.'});
    c.slider({label:'Parçacık kartı',min:0,max:2,step:1,value:0,fmt:(i)=>parcaciklar[i].ad,onInput:ciz});
    await c.say('Üç kartı incele; yük ve kütle sayılarını karşılaştır.',{noWait:true});
    await c.cont();
    c.note('<b>Yük miktarı aynı, işaret zıt.</b><br>Elektron −; proton +', 'Hazır veri');
  }
  async function bag(c) {
    const svg=c.svg();
    const baglar=[
      ['Elektron verisi','Bölünmez küre yetersiz',0,1],
      ['Pozitif yükün yeri','Küçük çekirdek',1,2],
      ['Yüksüz tanecik verisi','Çekirdek bilgisi gelişti',2,4],
    ];
    const ciz=(i)=>{
      svg.replaceChildren();const b=baglar[i];
      yazi(c,svg,500,65,b[0],{size:38,renk:parcaciklar[i].renk});
      model(c,svg,b[2],260,265,110);
      if (i === 2) {
        // 1932 nötron verisi, 1926 modern modelinin nedeni diye gösterilmez.
        model(c,svg,2,740,265,110);
        c.S('circle',{cx:740,cy:265,r:28,fill:'#101827'},svg);
        tanecik(c,svg,726,265,17,P,'');
        tanecik(c,svg,756,265,17,N,'');
      } else model(c,svg,b[3],740,265,110);
      c.S('path',{d:'M 420 265 H 555 M 535 248 L 555 265 L 535 282',fill:'none',stroke:MOR,'stroke-width':5},svg);
      yazi(c,svg,260,435,'Önceki açıklama',{size:32});
      yazi(c,svg,740,435,'Gelişen açıklama',{size:32});
      yazi(c,svg,500,515,b[1],{size:34});
    };
    ciz(0);
    await c.say('Bir parçacığın varlığı, önceki varsayımı sınamamızı sağlar.');
    await c.choice({q:'Elektronun varlığı hangi varsayımı yetersiz bırakır?',options:['Atom bölünmez, dolu küredir.','Atomun yapısı araştırılabilir.','Veriyle model karşılaştırılır.'],answer:0,
      hints:['','Araştırılabilir olması veriyle çelişmez.','Veriyle model karşılaştırmak bilimsel yöntemdir.'],right:'Elektron, atomdan daha küçük bir parçacıktır.'});
    await belir(c,svg.lastElementChild,500);
    c.slider({label:'Veri–model bağı',min:0,max:2,step:1,value:0,fmt:(i)=>baglar[i][0],onInput:ciz});
    await c.say('Diğer verileri seç; açıklamanın nasıl geliştiğini karşılaştır.',{noWait:true});
    await c.cont();
  }
  async function degisim(c) {
    const svg=c.svg();
    model(c,svg,0,500,265,130);
    yazi(c,svg,500,475,'Atom hakkındaki açıklama',{size:36});
    await c.say('Yeni veri geldiğinde atom mu değişir, açıklama mı?');
    await c.choice({q:'Yeni bulgu eski modele uymuyorsa ne yapılır?',options:['Atomların kendisi değiştirilir.','Model veriyle geliştirilir.','Bulgu görmezden gelinir.'],answer:1,
      hints:['Model, atomun kendisi değildir.','','Bilimsel açıklama yeni veriyle sınanır.'],right:'Açıklama gelişir. Eski modelin uygun kalan fikirleri korunabilir.'});
    svg.replaceChildren();
    const g=model(c,svg,4,500,265,150);
    await belir(c,g,800);
    yazi(c,svg,500,475,'Yeni veri → gelişen model',{size:36,renk:MOR});
    await c.say('Elektronun açıklaması da yeni bir modele gereksinim duydu.');
    c.note('<b>Model yeni veriyle değişebilir.</b><br>Örnek: modern atom modeli', 'Değişebilirlik');
  }
  Ders.start({
    id:'etkilesim-c1',kicker:'Konu C · Atom teorileri',title:'Yeni veri modeli değiştirir',accent:MOR,back:'index.html',
    intro:{title:'Yeni veri modeli değiştirir',hook:'Atom mu değişti, atom hakkında bildiklerimiz mi?',button:'Derse başla ›'},
    scenes:[
      {title:'Modellerin sırası',goal:'Modelleri kronolojik sıraya koy.',run:sira},
      {title:'Varsayımların farkı',goal:'Şemalardaki yapısal farkı karşılaştır.',run:fark},
      {title:'Üç parçacığın verisi',goal:'Keşif basamaklarını, yükü ve kütleyi oku.',run:veri},
      {title:'Veri ile model',goal:'Veriyi açıklamanın gelişmesiyle ilişkilendir.',run:bag},
      {title:'Değişen bilgi',goal:'Yeni veriyle modelin değişmesini değerlendir.',run:degisim},
    ],quizTitle:'Çıkış soruları',
    quiz:[
      {q:'Yeni veri neyi değiştirebilir?',options:['Atomun açıklama modelini','Bütün atomları başka maddeye dönüştürür.','Bilimsel araştırmayı gereksiz kılar.'],answer:0,
        why:['Yeni veri, açıklamayı geliştirebilir.','Modelin değişmesi atomların değişmesi değildir.','Yeni veri araştırmayı sürdürmemizi sağlar.'],scene:4},
      {q:'Kitaptaki kütlelerin büyükten küçüğe doğru sırası?',options:['Elektron > proton > nötron','Üçü eşittir.','Nötron > proton > elektron'],answer:2,
        why:['Elektronun kütlesi çok daha küçüktür.','Proton ve nötron yakın kütlelidir; tam eşit değildir.','S. 50 sayıları bu sıralamayı gösterir.'],scene:2},
    ],summary:['<b>Yeni veri gelince atomun modeli gelişir.</b>','Parçacık verisini açıklamayla karşılaştır; modelin sınırını belirle.'],
    nextLesson:{href:'c2-yorungeden-orbitale.html',label:'Sonraki: Yörüngeden orbitale ›'},
  });
})();
