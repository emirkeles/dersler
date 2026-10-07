/* E3 · KİM.9.1.5 · Kitap s.62–64,70; C/N/O/Ne/P/Cl/Ar kaynak şemaları.
   Eş enerjili p orbitallerinin yarı/tam doluluğu; orbital şekli ve istisna türetimi yok.
   B valans kapsamı ve Mn örneği yalnız s.70'teki ns+(n−1)d tanımıdır. */
(() => {
  'use strict';
  const {yazi}=KIT,renk='#6ea8ff',soluk='#667591';
  const atomlar=[
    {ad:'C',diz:'1s² 2s² 2p²',n:2,p:[1,1,0],v:4,durum:'Dengeli yarı/tam doluluk yok',sim:false},
    {ad:'N',diz:'1s² 2s² 2p³',n:2,p:[1,1,1],v:5,durum:'2p³ · yarı dolu',sim:true},
    {ad:'O',diz:'1s² 2s² 2p⁴',n:2,p:[2,1,1],v:6,durum:'Dengeli yarı/tam doluluk yok',sim:false},
    {ad:'Ne',diz:'1s² 2s² 2p⁶',n:2,p:[2,2,2],v:8,durum:'2p⁶ · tam dolu',sim:true},
    {ad:'P',diz:'1s² 2s² 2p⁶ 3s² 3p³',n:3,p:[1,1,1],v:5,durum:'3p³ · yarı dolu',sim:true},
    {ad:'Cl',diz:'1s² 2s² 2p⁶ 3s² 3p⁵',n:3,p:[2,2,1],v:7,durum:'Dengeli yarı/tam doluluk yok',sim:false},
    {ad:'Ar',diz:'1s² 2s² 2p⁶ 3s² 3p⁶',n:3,p:[2,2,2],v:8,durum:'3p⁶ · tam dolu',sim:true},
  ];
  const ok = (c, p, x, y, yon, r = renk) => KIT.elektronOku(c, p, x, y, yon, { renk: r });
  const kutu = (c, p, x, y, n, r = renk) => KIT.orbitalKutusu(c, p, x, y, n, { renk: r });
  function kaynak(c,svg,s='63–64'){yazi(c,svg,500,527,'Kitap s. '+s,{size:30,renk:'var(--muted)'});}
  function disaBak(c,svg,a,{durum=true,ic=false,dolu=true}={}){
    svg.replaceChildren();yazi(c,svg,500,65,a.ad+' · '+a.diz,{size:38});
    if(ic){kutu(c,svg,125,230,2,soluk);yazi(c,svg,165,370,'1s',{size:34,renk:soluk});}
    const x=ic?300:225;
    kutu(c,svg,x,230,dolu?2:0);yazi(c,svg,x+40,370,a.n+'s',{size:36,renk});
    a.p.forEach((n,i)=>kutu(c,svg,440+i*110,230,dolu?n:0));yazi(c,svg,590,370,a.n+'p',{size:36,renk});
    if(durum)yazi(c,svg,500,450,a.durum,{size:34,renk:a.sim?'var(--good)':'var(--muted)'});
    kaynak(c,svg);return x;
  }
  async function dol(c,svg,a,x=225){
    for(let k=0;k<2;k++){const g=ok(c,svg,x+24+k*30,230,k===0?1:-1);await c.tween(300,e=>g.setAttribute('transform',`translate(0 ${-140*(1-e)})`));}
    const toplam=a.p.reduce((x,y)=>x+y,0);
    for(let k=0;k<toplam;k++){const i=k<3?k:k-3,yon=k<3?1:-1,tx=440+i*110+(yon===1?24:54),g=ok(c,svg,tx,230,yon);await c.tween(350,e=>g.setAttribute('transform',`translate(${(820-tx)*(1-e)} ${-150*(1-e)})`));}
  }
  async function valans(c){
    const svg=c.svg();disaBak(c,svg,atomlar[1],{ic:true,durum:false});
    await c.say('Valans elektronları, atomun kimyasal davranışında belirleyicidir.');
    await c.say('A grubunda en dış katmanın s ve p elektronlarıdır.');
    await c.say('İç katman elektronları, bu valans sayımına katılmaz.');
    await c.say('N için dış katmandaki 2s ve 2p elektronlarını birlikte say.');
    await c.choice({tag:'Tahmin et',q:'N’nin valans elektron sayısı kaç?',options:['3','5','7'],answer:1,hints:['2s’deki iki elektronu da ekle.','','İç katmandaki 1s elektronlarını sayma.'],right:'Dış katman: 2s² + 2p³ = 5 elektron.'});
    const vurgu=c.S('rect',{x:275,y:205,width:495,height:205,rx:10,fill:'none',stroke:renk,'stroke-width':5},svg);
    await c.tween(700,e=>{vurgu.style.opacity=e;vurgu.setAttribute('stroke-width',3+2*e);});
    yazi(c,svg,500,458,'Valans: 2 + 3 = 5',{size:38,renk});
    await c.say('A grubunda valans, en dış katmanın s ve p elektronlarıdır.');
    c.note('<b>A grubunda valans: dış s+p elektronları.</b><br>N: 2+3=5','Valans');
    c.slider({label:'Dış katmanı karşılaştır',min:0,max:1,step:1,value:0,fmt:i=>['N','Ne'][i],onInput:i=>{const a=atomlar[i?3:1];disaBak(c,svg,a,{ic:true,durum:false});yazi(c,svg,500,458,'Valans: 2 + '+a.p.reduce((s,n)=>s+n,0)+' = '+a.v,{size:38,renk});}});
    await c.say('N ve Ne’yi seç; iç katmanı valansa katma.',{noWait:true});await c.cont();
  }
  async function doluluk(c){
    const svg=c.svg();disaBak(c,svg,atomlar[1],{durum:false});
    await c.say('Eş enerjili üç p kutusunda birer elektron bulunuyor.');
    await c.choice({tag:'Tahmin et',q:'N’nin 2p³ alt düzeyi nasıl doludur?',options:['Yarı dolu','Tam dolu','Boş'],answer:0,hints:['','Tam dolulukta üç kutuda da ikişer elektron olur.','Üç elektron var.'],right:'Her kutu kapasitesinin yarısında: üç kutuda toplam üç elektron.'});
    disaBak(c,svg,atomlar[1],{dolu:false});await dol(c,svg,atomlar[1]);
    await c.say('N yarı dolu; Ne’de aynı p kutuları tam doludur.');
    await c.cont('Tam doluluğu gör ›');disaBak(c,svg,atomlar[3],{dolu:false});await dol(c,svg,atomlar[3]);
    await c.choice({q:'Ne’nin 2p⁶ alt düzeyi nasıl doludur?',options:['Yarı dolu','Tam dolu'],answer:1,hints:['Her kutuda iki elektron var.',''],right:'Üç kutunun tamamı ikişer elektronla dolu.'});
    c.slider({label:'C / N / O / Ne karşılaştırması',min:0,max:3,step:1,value:3,fmt:i=>atomlar[i].ad,onInput:i=>disaBak(c,svg,atomlar[i])});
    await c.say('C ve O’yu seç; p kutularının eşit dolmadığını gör.',{noWait:true});await c.cont();
  }
  async function kararlilik(c){
    const svg=c.svg();disaBak(c,svg,atomlar[1]);
    await c.say('Eş enerjili orbitallere dengeli dağılım, atomun kararlılığını artırır.');
    await c.say('Yarı veya tam dolu alt düzeyler küresel simetriyle ilişkilidir.');
    await c.choice({q:'N’deki yarı dolu p kutuları hangi özellik ile ilişkilidir?',options:['Küresel simetri','Elektron bulunmaması','Çekirdekteki nötronların dizilimi'],answer:0,hints:['','Kutularda üç elektron var.','Burada incelenen elektronların orbitallere yerleşimidir.'],right:'Yarı veya tam doluluk küresel simetri ve kararlılıkla ilişkilidir.'});
    const halkalar=atomlar[1].p.map((n,i)=>c.S('rect',{x:430+i*110,y:220,width:100,height:102,rx:8,fill:'none',stroke:'var(--good)','stroke-width':4},svg));
    await c.tween(700,e=>halkalar.forEach(g=>g.style.opacity=e));
    await c.say('Küresel simetri gösteren her atom soy gaz değildir.');
    await c.choice({tag:'İddiayı sına',q:'“Yarı dolu p orbitalleri bulunan N soy gazdır.” iddiası doğru mu?',options:['Yanlış: küresel simetri soy gaz olmakla eş değildir.','Doğru: her dengeli dizilim soy gazdır.'],answer:0,hints:['','N örneği bu eşitlemeye karşı örnektir.'],right:'N küresel simetri gösterir; soy gaz değildir.'});
    c.note('<b>Küresel simetri kararlılığı artırır.</b><br>N: p³ yarı dolu','Dengeli doluluk');
    await c.say('Yarı veya tam doluluk dengeli yerleşim sağlar.');
  }
  async function yeniornek(c){
    const svg=c.svg();disaBak(c,svg,atomlar[4]);
    for(const [idx,cevap] of [[4,0],[5,2],[6,1]]){
      const a=atomlar[idx];disaBak(c,svg,a,{durum:false});
      await c.say(a.ad+' örneğini p kutularının doluluğuna göre sınıflandır.');
      await c.choice({tag:'Sınıflandır',q:a.ad+' için dış p alt düzeyinin doluluğu?',options:['Yarı dolu','Tam dolu','Yarı veya tam dolu değil'],answer:cevap,hints:['Üç kutuda birer elektron aranır.','Üç kutuda ikişer elektron aranır.','Yarı veya tam dolu şemayla karşılaştır.'],right:a.durum+'.'});
      disaBak(c,svg,a,{dolu:false});await dol(c,svg,a);
    }
    c.slider({label:'P / Cl / Ar kaynak örnekleri',min:0,max:2,step:1,value:2,fmt:i=>atomlar[i+4].ad,onInput:i=>disaBak(c,svg,atomlar[i+4])});
    await c.say('P yarı, Ar tam dolu; Cl bu iki duruma uymaz.',{noWait:true});await c.cont('Valans kapsamını karşılaştır ›');c.clearAct();
    svg.replaceChildren();yazi(c,svg,500,65,'Valans kapsamı · kitap s. 70',{size:38});
    yazi(c,svg,500,150,'A: dış s+p · O: 2s² 2p⁴ → 6',{size:36,renk});
    yazi(c,svg,500,220,'B: ns+(n−1)d',{size:38,renk});
    kutu(c,svg,165,285,2);yazi(c,svg,205,422,'4s²',{size:34});
    for(let i=0;i<5;i++)kutu(c,svg,350+i*100,285,1);
    yazi(c,svg,590,422,'3d⁵',{size:34});yazi(c,svg,500,485,'Mn: 2 + 5 = 7',{size:38});
    await c.say('B grubunda valans sayısına ns ile bir önceki d katılır.');
    await c.choice({q:'Kitabın Mn örneğinde valans hesabına hangi orbitaller katılır?',options:['Yalnız 4s','4s ve 3d','Yalnız 1s'],answer:1,hints:['B grubunda d elektronları da hesaba katılır.','','İç 1s elektronları valans hesabı değildir.'],right:'4s² ve 3d⁵: toplam 7. A ve B için kapsam farklıdır.'});
    await c.say('Yarı veya tam doluluk dengeli yerleşim sağlar.');
  }
  Ders.start({id:'etkilesim-e3',kicker:'Konu E · Elektron dizilimi',title:'Dengeli doluluk ve valans',accent:renk,back:'index.html',intro:{title:'Dengeli doluluk ve valans',hook:'N ile O dış orbitallerinde nasıl ayrılır?',button:'Derse başla ›'},
    scenes:[{title:'Valansı bul',goal:'A grubunda dış s+p elektronlarını say.',run:valans},{title:'Dolulukları karşılaştır',goal:'Yarı ve tam doluluğu kaynak şemalarda ayır.',run:doluluk},{title:'Kararlılığı ilişkilendir',goal:'Küresel simetriyi soy gaz olmakla eşitleme.',run:kararlilik},{title:'Yeni örneği sına',goal:'P/Cl/Ar şemalarını sınıflandır; valans kapsamlarını ayır.',run:yeniornek}],quizTitle:'Çıkış soruları',
    quiz:[{q:'p³ ve p⁶ alt düzeyleri sırasıyla nasıl doludur?',options:['İkisi de boş','Yarı dolu ve tam dolu','İkisi de aynı dolulukta'],answer:1,why:['Bu alt düzeylerde elektronlar bulunur.','Üç orbitalde üç elektron yarı; altı elektron tam doluluk verir.','Elektron sayıları ve dolulukları farklıdır.'],scene:1},{q:'A grubunda valans elektronları hangileridir?',options:['En dış katmandaki s ve p elektronları','Çekirdekteki protonlar','Toplam nötronlar'],answer:0,why:['Örneğin N için 2s²+2p³: 5 valans elektronu.','Protonlar elektron değildir.','Nötronlar valans elektronu değildir.'],scene:0}],
    summary:['<b>Yarı veya tam doluluk dengeli yerleşim sağlar.</b>','Küresel simetri kararlılıkla ilişkilidir; yalnız soy gazlara özgü değildir.','A valansı: dış s+p. B valansı: ns+(n−1)d.'],nextLesson:{href:'f1-dizilimden-adrese.html',label:'Sonraki: Dizilimden periyot ve gruba ›'}});
})();
