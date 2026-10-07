/* E2 · KİM.9.1.5 a,b · MEB Kimya 9 s.60–63.
   Kutu-ok şemaları elektron yönlerini gösterir; uzaysal orbital şekilleri değildir. */
(() => {
  'use strict';
  const { yazi }=KIT, renk='#6ea8ff';
  const atomlar=[{ad:'C',diz:'1s² 2s² 2p²',p:[1,1,0]},{ad:'N',diz:'1s² 2s² 2p³',p:[1,1,1]},{ad:'O',diz:'1s² 2s² 2p⁴',p:[2,1,1]}];
  const ok = (c, p, x, y, yon, r = renk) => KIT.elektronOku(c, p, x, y, yon, { renk: r });
  const kutu = (c, p, x, y, adet, ayni = false) => KIT.orbitalKutusu(c, p, x, y, adet, { renk, ayni });
  function pSirasi(c,svg,dolu,y=235){
    dolu.forEach((n,i)=>kutu(c,svg,340+i*110,y,n));yazi(c,svg,500,y+132,'2p',{size:38,renk});
  }
  function kaynak(c,svg){yazi(c,svg,500,520,'Kitap s. 60–63 · kutu: orbital · ok: elektron',{size:30,renk:'var(--muted)'});}
  function atom(c,svg,a,pBos=false){
    svg.replaceChildren();yazi(c,svg,500,70,a.ad+' · '+a.diz,{size:42});
    kutu(c,svg,160,235,2);kutu(c,svg,300,235,2);
    yazi(c,svg,200,365,'1s',{size:36});yazi(c,svg,340,365,'2s',{size:36});
    a.p.forEach((n,i)=>kutu(c,svg,465+i*105,235,pBos?0:n));yazi(c,svg,610,365,'2p',{size:36,renk});kaynak(c,svg);
  }
  async function pDoldur(c,svg,n,x=340,y=235){
    for(let e=0;e<n;e++){
      const i=e<3?e:e-3,yon=e<3?1:-1,tx=x+i*(x===465?105:110)+(yon===1?24:54),g=ok(c,svg,tx,y,yon);
      await c.tween(500,t=>g.setAttribute('transform',`translate(${(790-tx)*(1-t)} ${(-190)*(1-t)})`));
    }
  }
  async function pauli(c){
    const svg=c.svg();yazi(c,svg,500,70,'He · 1s²',{size:44});
    kutu(c,svg,290,220,2,false);kutu(c,svg,630,220,2,true);
    yazi(c,svg,330,365,'A',{size:40});yazi(c,svg,670,365,'B',{size:40});kaynak(c,svg);
    await c.say('Bir orbital, en çok iki elektron içerebilir.');
    await c.say('Birlikte bulunan bu elektronların okları zıt yönlü gösterilir.');
    await c.say('Bu yerleşim koşulu, Pauli dışlama ilkesi olarak adlandırılır.');
    await c.say('İki elektronlu kutularda okların yönlerini karşılaştır.');
    await c.choice({tag:'Tahmin et',q:'He için hangi kutu uygun?',options:['A: zıt yönlü iki ok','B: aynı yönlü iki ok'],answer:0,hints:['','Aynı orbitaldeki iki elektron zıt yönlü olmalı.'],right:'Kaynak He şemasında zıt yönlü iki elektron bulunur.'});
    svg.replaceChildren();yazi(c,svg,500,80,'Pauli dışlama ilkesi',{size:40});kutu(c,svg,460,235,0);
    const ilk=ok(c,svg,484,235,1);await c.tween(550,e=>ilk.setAttribute('transform',`translate(0 ${-170*(1-e)})`));
    const ikinci=ok(c,svg,514,235,-1);await c.tween(550,e=>ikinci.setAttribute('transform',`translate(0 ${-170*(1-e)})`));kaynak(c,svg);
    await c.say('Bir orbitalde en çok iki elektron, zıt yönlü bulunur.');
    c.note('<b>Bir orbital: en çok iki zıt yönlü elektron.</b><br>He: 1s²','Pauli');
    await c.choice({q:'Üçüncü elektron aynı kutuya eklenebilir mi?',options:['Hayır','Evet'],answer:0,hints:['','En çok iki elektron bulunabilir.'],right:'Kapasite iki; üçüncü elektron başka uygun orbitale yerleşir.'});
  }
  async function hund(c){
    const svg=c.svg();
    yazi(c,svg,500,70,'C · 2p² kaynak örneği',{size:44});pSirasi(c,svg,[1,1,0]);kaynak(c,svg);
    await c.say('C örneğinde eş enerjili kutulara elektronlar birer yerleşmiş.');
    await c.say('Hund kuralı, eş enerjililere önce birer aynı yönlü yerleşim ister.');
    svg.replaceChildren();const titre=yazi(c,svg,500,70,'N · 2p³',{size:44});pSirasi(c,svg,[0,0,0]);kaynak(c,svg);
    await c.say('Üç eş enerjili orbital için üç elektronun yerini tahmin et.');
    await c.choice({tag:'Tahmin et',q:'2p³ elektronları nasıl dağılır?',options:['Birer birer aynı yönlü','Önce bir kutuda eşleşerek'],answer:0,hints:['','Eş enerjili boş orbitaller varken önce birer yerleşir.'],right:'Üç kutuya birer aynı yönlü elektron yerleşir.'});
    await pDoldur(c,svg,3);await c.say('Önce tek tek aynı yönlü: bu örüntü Hund kuralıdır.');
    c.note('<b>Eş enerjiye önce birer aynı yönlü elektron.</b><br>N: 2p³','Hund');
    await c.choice({q:'O’nun dördüncü 2p elektronu nasıl yerleşir?',options:['Bir kutuda zıt yönlü eşleşir.','Dördüncü bir 2p kutusu açılır.','Aynı yönlü çift oluşturur.'],answer:0,hints:['','2p alt düzeyinde üç orbital bulunur.','Pauli ilkesi aynı yönlü çifte izin vermez.'],right:'Üç orbitalde birer elektron var; sonraki elektron zıt yönlü eşleşir.'});
    titre.textContent='O · 2p⁴'; const g=ok(c,svg,394,235,-1);await c.tween(600,e=>g.setAttribute('transform',`translate(${360*(1-e)} ${-190*(1-e)})`));
    await c.say('Eşleşme başlayınca Pauli ilkesi de korunur.');
  }
  async function birlikte(c){
    const svg=c.svg();atom(c,svg,atomlar[0]);
    await c.say('Dizilim ve orbital şeması üç kuralı birlikte karşılamalı.');
    await c.choice({q:'C için 1s² 2s² 2p² şemasında 2p nasıl dolar?',options:['İki ayrı kutuda birer aynı yönlü','Tek kutuda aynı yönlü iki','Tek kutuda zıt yönlü iki'],answer:0,hints:['','Bu Pauli ilkesine uymaz.','Eş enerjili boş kutular varken erken eşleme Hund’a uymaz.'],right:'Aufbau enerji sırasını, Pauli kapasiteyi, Hund eş enerjili dağılımı denetler.'});
    atom(c,svg,atomlar[0],true);await pDoldur(c,svg,2,465);
    c.slider({label:'C / N / O örnekleri',min:0,max:2,step:1,value:0,fmt:i=>atomlar[i].ad,onInput:i=>atom(c,svg,atomlar[i])});
    await c.say('Atomu değiştir; önce tek yerleşim, sonra eşleşmeyi karşılaştır.',{noWait:true});await c.cont();
  }
  async function duzelt(c){
    const svg=c.svg();yazi(c,svg,500,70,'N · hatalı 2p³ şeması',{size:42});pSirasi(c,svg,[2,1,0]);kaynak(c,svg);
    await c.say('Üç elektronun sayısı doğru; yerleşimini kurallarla denetle.');
    await c.choice({tag:'Sınıflandır',q:'Bu şema hangi kurala uymaz?',options:['Hund','Pauli','Aufbau'],answer:0,hints:['','Kutudaki çift zıt yönlü ve kapasiteyi aşmıyor.','Burada hata eş enerjili 2p içindeki dağılım.'],right:'Boş eş enerjili kutu varken erken eşleşme yapılmış.'});
    svg.replaceChildren();yazi(c,svg,500,70,'N · doğru 2p³ şeması',{size:42});pSirasi(c,svg,[0,0,0]);kaynak(c,svg);await pDoldur(c,svg,3);
    await c.say('Doğru dağılım: üç kutuya birer aynı yönlü elektron.');
    await c.cont('İkinci hatayı incele ›');
    svg.replaceChildren();yazi(c,svg,500,70,'Hatalı tek orbital',{size:42});kutu(c,svg,460,235,2,true);kaynak(c,svg);
    await c.choice({tag:'Sınıflandır',q:'Aynı kutudaki aynı yönlü iki ok hangi kurala uymaz?',options:['Hund','Aufbau','Pauli'],answer:2,hints:['Hund eş enerjili kutular arasındaki dağılımı düzenler.','Aufbau düşükten yükseğe enerji sırasını düzenler.',''],right:'Bir orbitaldeki iki elektron zıt yönlü olmalı.'});
    svg.replaceChildren();yazi(c,svg,500,70,'Doğru tek orbital',{size:42});kutu(c,svg,460,235,0);kaynak(c,svg);
    const a=ok(c,svg,484,235,1),b=ok(c,svg,514,235,-1);await c.tween(650,e=>{a.style.opacity=e;b.setAttribute('transform',`translate(0 ${-140*(1-e)})`);});
    await c.say('Önce tek tek; sonra zıt yönlü eşle.');
  }
  Ders.start({id:'etkilesim-e2',kicker:'Konu E · Elektron dizilimi',title:'Eş enerjiye önce tek tek',accent:renk,back:'index.html',intro:{title:'Eş enerjiye önce tek tek',hook:'Eş enerjili üç boş orbital nasıl dolar?',button:'Derse başla ›'},
    scenes:[{title:'Pauli örüntüsü',goal:'Tek kutunun kapasitesini ve elektron yönlerini denetle.',run:pauli},{title:'Hund örüntüsü',goal:'Eş enerjili kutuların dolma kuralını bul.',run:hund},{title:'Kuralları birleştir',goal:'C/N/O şemalarını üç ilkeyle kontrol et.',run:birlikte},{title:'Yanlış şemayı düzelt',goal:'Hatanın ilgili olduğu kuralı ayır.',run:duzelt}],quizTitle:'Çıkış soruları',
    quiz:[{q:'Bir orbitalde en çok ne bulunabilir?',options:['Zıt yönlü iki elektron','Üç elektron','Aynı yönlü iki elektron'],answer:0,why:['Pauli ilkesi kapasiteyi ve zıt yönü birlikte belirtir.','Kapasite ikidir.','İki elektron zıt yönlü olmalı.'],scene:0},{q:'Hund kuralına uygun p³ dağılımı hangisi?',options:['↑↓ | ↑ | boş','↑ | ↑ | ↑','↑↑ | ↑ | boş'],answer:1,why:['Boş eş enerjili orbital varken erken eşleşme yapılmış.','Üç eş enerjili orbitalde birer aynı yönlü elektron vardır.','Aynı kutudaki aynı yönlü çift Pauli ilkesine uymaz.'],scene:1}],summary:['<b>Önce tek tek; sonra zıt yönlü eşle.</b>','Aufbau: enerji sırası. Pauli: tek kutu. Hund: eş enerjili kutular.'],nextLesson:{href:'e3-valans-ve-simetri.html',label:'Sonraki: Dengeli doluluk ve valans ›'}});
})();
