/* B2 · KİM.9.1.2 c–d · MEB Kimya 9, s.36–38.
   S.38'in bütün 11 işareti; şematik çizimler güvenlik etiketi değildir.
   Radyoaktif/tıbbi atık: kitaptaki sarı üçgen. Kurumlar program kadarıyla. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const yesil = '#3ddc97', soluk = 'var(--muted)', siyah = '#171717';
  const adlar = ['Patlayıcı madde', 'Korozif madde', 'Zehirli madde', 'Çevreye zararlı madde', 'Oksitleyici madde', 'Tahriş edici madde', 'Yanıcı, parlayıcı madde', 'Sağlık etkisi', 'Gaz', 'Radyoaktif madde', 'Tıbbi atık'];
  function cizgi(c, p, d, renk = siyah, en = 7) { return c.S('path', { d, fill: 'none', stroke: renk, 'stroke-width': en, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p); }
  function alev(c, p, x = 0, y = 0, s = 1) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    c.S('path', { d: 'M-35 44C-77 10-37-14-42-50C-18-34-16-7-8-22C4-42-3-67 6-84C14-62 42-45 31-10C49-26 60 7 43 31C32 49 5 60-18 51C-38 42-22 20-18 5C-9 17-13 40 4 40C18 31 2 15 10 0C25 14 30 29 20 43Z', fill: siyah }, g);
    return g;
  }
  function piktogram(c, p, i, x = 500, y = 260, s = 1) {
    const kapsayici = c.S('g', { transform: `translate(${x} ${y}) scale(${s})`, role: 'img', 'aria-label': adlar[i] }, p);
    if (i < 9) c.S('path', { d: 'M0-150L150 0L0 150L-150 0Z', fill: '#fff', stroke: '#df263c', 'stroke-width': 9, 'stroke-linejoin': 'round' }, kapsayici);
    else c.S('path', { d: 'M0-145L150 130H-150Z', fill: '#f7e41b', stroke: siyah, 'stroke-width': 9, 'stroke-linejoin': 'round' }, kapsayici);
    // Sembol çerçeveyi kesmez: yazı ölçücüsü SVG yollarının çakışmasını ölçmez.
    const g = c.S('g', { transform: 'scale(.72)' }, kapsayici);
    if (i === 0) {
      const patlama=c.S('g',{transform:'scale(.78)'},g);
      c.S('path', { d: 'M-66 40L-32 11L-29-25L-6-3L25-32L21 2L68 7L30 27L65 62L18 42L-3 83L-13 46L-56 69Z', fill: siyah }, patlama);
      [[-91,14,-54,20],[10,-103,-3,-45],[80,-69,32,-26],[101,28,58,25],[70,95,36,63],[-79,-57,-43,-21]].forEach(([a,b,d,e]) => cizgi(c,patlama,`M${a} ${b}L${d} ${e}`,siyah,4));
      c.S('path', { d:'M60-76L73-92L80-75ZM-94 63L-75 58L-83 78ZM42 102L52 82L64 98Z', fill:siyah },patlama);
    } else if (i === 1) {
      cizgi(c,g,'M-85-66L-12-30L-3-48L-76-84ZM26-83L82-48L93-66L37-101Z',siyah,5);
      c.S('path',{d:'M-12-14Q-26 7-12 12Q2 7-12-14ZM64-21Q50 0 64 5Q78 0 64-21Z',fill:siyah},g);
      c.S('path',{d:'M-95 66H-23V80H-95ZM15 74V24H-16Q-23 12-31 17L-41 35H-84V49H-43L-21 61H15Z',fill:siyah},g);
      cizgi(c,g,'M48 37H96V69H48M57 37L66 47L73 39L82 50',siyah,9);
    } else if (i === 2) {
      cizgi(c,g,'M-72 57L72-5M-72-5L72 57',siyah,14);
      const tete=c.S('g',{},g);
      c.S('path',{d:'M-48-26C-52-100 53-100 48-26L30 0V25H-30V0Z',fill:'#fff',stroke:siyah,'stroke-width':5},tete);
      [-22,22].forEach(cx=>c.S('circle',{cx,cy:-32,r:15,fill:siyah},tete));
      c.S('path',{d:'M0-17L-8-4H8Z',fill:siyah},tete);
      cizgi(c,tete,'M-24 12H24M-12 4V24M0 4V24M12 4V24',siyah,4);
    } else if (i === 3) {
      cizgi(c,g,'M-49 79V-55M-49-9L-82-47M-49-5L-17-59M-49 20L-88-9M-49 29L-7-12M-49-44L-63-80M-96 82H84',siyah,8);
      c.S('path',{d:'M0 47Q34 8 65 44L90 31L83 56L93 72L66 64Q35 94 0 47Z',fill:siyah},g);
      c.S('circle',{cx:18,cy:49,r:4,fill:'#fff'},g);
    } else if (i === 4) {
      alev(c,g,0,-30,0.85);
      c.S('circle',{cx:0,cy:33,r:44,fill:'#fff',stroke:siyah,'stroke-width':10},g);
      cizgi(c,g,'M-62 85H62',siyah,8);
    } else if (i === 5) {
      c.S('path',{d:'M-18-80Q0-95 18-80L11 32H-11Z',fill:siyah},g);
      c.S('circle',{cx:0,cy:66,r:17,fill:siyah},g);
    } else if (i === 6) {
      alev(c,g,0,10,1);
      cizgi(c,g,'M-63 83H63',siyah,8);
    } else if (i === 7) {
      c.S('ellipse',{cx:0,cy:-49,rx:29,ry:37,fill:siyah},g);
      c.S('path',{d:'M-18-15L-18 2Q-75 7-68 42L-20 91H20L68 42Q75 7 18 2V-15Z',fill:siyah},g);
      c.S('path',{d:'M0 11L9 29L29 18L20 40L40 46L20 53L31 75L9 65L0 85L-8 64L-29 76L-20 53L-40 46L-21 40L-30 18L-10 28Z',fill:'#fff'},g);
    } else if (i === 8) {
      const gaz=c.S('g',{transform:'rotate(-18)'},g);
      c.S('rect',{x:-92,y:-24,width:161,height:48,rx:23,fill:siyah},gaz);
      c.S('rect',{x:62,y:-13,width:33,height:26,fill:siyah},gaz);
      cizgi(c,gaz,'M95-18V18',siyah,7);
    } else if (i === 9) {
      const rady=c.S('g',{transform:'translate(0 30)'},g);
      c.S('circle',{cx:0,cy:0,r:12,fill:siyah},rady);
      [0,120,240].forEach(a=>c.S('path',{d:'M-16-9L-60-35A70 70 0 0 1 0-70L0-19A19 19 0 0 0-16-9Z',fill:siyah,transform:`rotate(${a})`},rady));
    } else {
      const bio=c.S('g',{transform:'translate(0 35) scale(1.3)'},g);
      [0,120,240].forEach(a=>c.S('path',{d:'M-7-13C-37-14-40-43-25-60C-62-43-58-1-26 8C-12 11-9 2-7-13ZM7-13C37-14 40-43 25-60C62-43 58-1 26 8C12 11 9 2 7-13Z',fill:siyah,transform:`rotate(${a})`},bio));
      c.S('circle',{cx:0,cy:0,r:21,fill:'none',stroke:siyah,'stroke-width':5},bio);
      c.S('circle',{cx:0,cy:0,r:7,fill:'#f7e41b'},bio);
    }
    return kapsayici;
  }
  function ok(c,p,x1,y,x2) { cizgi(c,p,`M${x1} ${y}H${x2}M${x2-18} ${y-13}L${x2} ${y}L${x2-18} ${y+13}`,yesil,5); }
  function kuralGorseli(c,p,i) {
    const g=c.S('g',{transform:'translate(500 250)'},p);
    const en=9;
    if(i===0) {
      cizgi(c,g,'M-117-30H-12Q0-16 12-30H117V35H30Q0 12-30 35H-117Z',yesil,en);
      cizgi(c,g,'M-117-8H-150M117-8H150M-85 5H-50M50 5H85',yesil,en);
      cizgi(c,g,'M-42 138V93Q-61 56-45 43L-25 75V39Q-25 26-12 28V68V26Q-10 15 2 20V69V34Q8 20 18 31V81Q34 56 44 69L36 116L27 140Z',yesil,en);
    } else if(i===1) {
      c.S('circle',{cx:-70,cy:-45,r:32,fill:'none',stroke:yesil,'stroke-width':en},g);
      cizgi(c,g,'M-128 89V30Q-70-11-12 30V89M22 9H125V107H22ZM42 9V-19Q74-56 106-19V9',yesil,en);
    } else if(i===2) {
      cizgi(c,g,'M-11-85L-32-15Q-62 5-19 17L3 15M-22 62Q4 44 23 57M-86 2Q-114 19-86 38M-118-19Q-167 19-118 60',yesil,en);
      cizgi(c,g,'M-135 117L135-117','var(--bad)',12);
    } else if(i===3) {
      c.S('ellipse',{cx:0,cy:-60,rx:42,ry:55,fill:'#233d43',stroke:yesil,'stroke-width':en},g);
      cizgi(c,g,'M-12-5V81L0 123L12 81V-5M-12 35H12M-12 60H12',yesil,en);
      yazi(c,g,145,-45,'Puar',{size:34,renk:yesil});
    } else if(i===4) {
      cizgi(c,g,'M-90-90V100H90V-90M-48-90L-24-25L-54 10L-8 49L-18 100',yesil,en);
      cizgi(c,g,'M-125 132L125-125','var(--bad)',12);
    } else {
      c.S('ellipse',{cx:-25,cy:20,rx:85,ry:34,fill:'none',stroke:yesil,'stroke-width':en},g);
      cizgi(c,g,'M87-70H137L126 38H98ZM-118 111L145-111','var(--bad)',12);
    }
    return g;
  }
  async function onlem(c) {
    const svg=c.svg();
    yazi(c,svg,500,65,'Kaza olmadan önce',{size:36});
    piktogram(c,svg,5,255,265,0.85);
    const etiket=c.S('g',{},svg);
    c.S('rect',{x:545,y:130,width:340,height:260,rx:10,fill:'#162038',stroke:yesil,'stroke-width':3},etiket);
    yazi(c,etiket,715,195,'Etiket',{size:36,renk:yesil});
    ['Madde adı','Uyarılar','Kullanım yönergesi'].forEach((s,i)=>yazi(c,etiket,715,255+i*50,s,{size:32}));
    yazi(c,svg,500,505,'Kitap s. 36–38',{size:30,renk:soluk});
    await c.say('Etiket, ürünün kimliğini ve uyarılarını birlikte taşır.');
    await c.say('Çalışma yönergesi dikkatle okunur; farklı bir yöntem izlenmez.');
    await c.say('Kimyasal maddeler koklanmaz; birbirleriyle gelişigüzel karıştırılmaz.');
    await c.say('Sorumlu izin vermedikçe kimyasal maddelere dokunulmaz.');
    await c.choice({q:'Etiketi silinmiş şişe için hangi karar bilgiye dayanır?',options:['Koklayarak içeriğini seçmek','Sorumluya danışıp kimliği belirlenmeden kullanmamak','Başka bir ürünle karıştırmak'],answer:1,
      hints:['Koku, güvenli bir tanıma yolu değildir.','','Karıştırma, kimliği belirsiz ürünün riskini gidermemiş olur.'],right:'Madde kimliği ve yönerge bilinmeden uygun kullanım değerlendirilemez.'});
    const bag=c.S('g',{},svg);ok(c,bag,405,265,515);await belir(c,bag);
    await c.say('İşaret, uyarılar ve yönerge birlikte okunur.');
    c.note('<b>Önlem bilgiye dayanır.</b><br>Örnek: önce etiketi oku.', 'Önlem');
  }
  async function isaretler(c) {
    const svg=c.svg();
    const ciz=(i)=>{
      svg.replaceChildren();
      yazi(c,svg,500,63,adlar[i],{size:36});
      piktogram(c,svg,i);
      yazi(c,svg,500,462,`${i+1} / 11`,{size:32,renk:yesil});
      yazi(c,svg,500,517,'Şematik çizim · kitap s. 38',{size:30,renk:soluk});
    };
    const aciklamalar=[
      'Patlayıcı madde, patlama biçimindeki sembolle gösterilir.',
      'Korozif madde işaretinde, aşınan el ve yüzey görülür.',
      'Zehirli madde işaretinde, kafatası ve çapraz kemikler vardır.',
      'Çevreye zararlı madde, ağaç ve balık sembolüyle gösterilir.',
      'Oksitleyici madde işaretindeki alevin altında bir halka vardır.',
      'Tahriş edici madde, ünlem işaretiyle gösterilir.',
      'Yanıcı, parlayıcı madde işaretinde, halkasız bir alev vardır.',
      'Sağlık etkisi işaretinde, insanın göğsünde yıldız biçimi görülür.',
      'Gaz işareti, basınç altında gaz içeren kapları belirtir.',
      'Radyoaktif maddeler radyasyon yayar; işaret sarı üçgendir.',
      'Tıbbi atık işareti, sağlık işlemlerinin riskli atıklarını gösterir.',
    ];
    for(let i=0;i<adlar.length;i++) {
      ciz(i);await c.say(aciklamalar[i]);
      if(i<adlar.length-1)await c.cont('Sonraki işaret ›');
    }
    ciz(9);
    await c.choice({tag:'Uygula',q:'Bir etikette kırmızı elmas yerine sarı üçgen varsa nasıl değerlendirilir?',options:['Uyarı yoktur; yalnız kırmızı elmas geçerlidir.','Üçgen de tehlike işareti olabilir; etiket birlikte okunur.','İşaretler yalnızca süstür.'],answer:1,
      hints:['Radyoaktif ve tıbbi atık işaretleri sarı üçgendir.','','İşaretler, sağlık ve güvenlik amacıyla kullanılan uyarılardır.'],right:'İşaretin çerçevesi değişebilir; uygun önlem için bütün etiket okunur.'});
    const sl=c.slider({label:'11 işaretin tümünü incele',min:0,max:10,step:1,value:0,fmt:(i)=>adlar[i],onInput:ciz});
    const inp=sl.el.querySelector('input');
    if(inp) inp.setAttribute('aria-label','Risk işareti kartı; ok tuşlarıyla 11 işaret arasında geç');
    await c.say('Kaydırıcıyı veya ok tuşlarını kullanarak bütün işaretleri incele.',{noWait:true});
    await c.cont();
  }
  async function davranis(c) {
    const svg=c.svg();
    const kurallar=[
      ['Koruyucu ekipman','Gözlük, eldiven ve uygun kıyafet',
        ['Koruyucu ekipman, gözlük ve eldivenle birlikte uygun kıyafet içerir.','Eldiven, kimyasal maddelerle çalışırken kullanılan koruyucu ekipmandır.'],
        'Gözlük takan öğrenci eldivensiz çalışıyor.',1,'Gözlük kullanmak, eldiven kuralını ortadan kaldırmaz.'],
      ['Sorumlunun izni','İzin almadan malzemeye dokunma',
        ['Sorumlu izin vermedikçe kimyasal ve malzemelere dokunulmaz.','Verilmiş yönerge dikkatle okunur ve izlenir.'],
        'Öğrenci önce sorumludan izin alıyor.',0,'Sorumlunun iznini almak, çalışma kuralına uygundur.'],
      ['Maddeyi tanıma','Kimyasal madde koklanmaz',
        ['Kimyasal maddeler yakından veya uzaktan koklanmaz.','Maddeyi kullanmadan önce etiketi dikkatle okunur.'],
        'Öğrenci, koklamadan şişenin etiketini okuyor.',0,'Etiketten bilgi almak, koklama yasağına ve etiket kuralına uygundur.'],
      ['Pipet kullanımı','Puar kullan; ağızla çekme',
        ['Puar, sıvıyı pipete çekmek için kullanılan araçtır.','Bu işlemde sıvı kesinlikle ağızla çekilmez.'],
        'Öğrenci, pipeti ağzıyla dolduruyor.',1,'Ağızla çekme yasaktır; sıvı aktarımında puar kullanılır.'],
      ['Cam malzeme','Kırık, çatlak cam kullanılmaz',
        ['Kırık, çatlak veya kirli cam malzeme kullanılmaz.','Kırılan cam malzemeler elle toplanmaz.'],
        'Öğrenci çatlamış cam kabı kullanıyor.',1,'Çatlak cam, kullanılması yasaklanan malzemeler arasındadır.'],
      ['Yiyecek ve tatma','Yemek, içmek ve tatmak yasak',
        ['Laboratuvarda yemek yenmez ve içecek tüketilmez.','Kimyasal maddelerin tadına bakılmaz.'],
        'Öğrenci laboratuvarda içecek tüketiyor.',1,'İçecek tüketmek de laboratuvar güvenlik kuralına aykırıdır.'],
    ];
    for(let i=0;i<kurallar.length;i++) {
      const k=kurallar[i];svg.replaceChildren();
      yazi(c,svg,500,65,k[0],{size:36});kuralGorseli(c,svg,i);
      yazi(c,svg,500,485,`Durum ${i+1} / ${kurallar.length} · kitap s. 36–37`,{size:30,renk:soluk});
      const kural=yazi(c,svg,500,420,k[1],{size:32,renk:yesil});
      for(const metin of k[2])await c.say(metin);
      kural.remove();
      const ornek=yazi(c,svg,500,420,k[3],{size:30});
      await c.choice({tag:'Sınıflandır',q:'Bu yeni davranışı öğretilen kurala göre değerlendir.',options:['Kurala uygun','Kurala aykırı'],answer:k[4],hints:k[4]===0?['',k[5]]:[k[5],''],right:k[5]});
      ornek.remove();
      const sonuc=yazi(c,svg,500,420,k[1],{size:32,renk:yesil});await belir(c,sonuc);
      if(i<kurallar.length-1) await c.cont('Sonraki durum ›');
    }
    await c.say('Kuralı, verilen davranışın gerekçesi olarak kullan.');
  }
  async function degerlendir(c) {
    const svg=c.svg();
    yazi(c,svg,500,65,'İşaretten davranışa',{size:36});
    piktogram(c,svg,5,200,255,0.72);
    const bag=c.S('g',{opacity:0},svg);
    ok(c,bag,330,255,425);
    c.S('rect',{x:450,y:140,width:450,height:230,rx:12,fill:'#162038',stroke:yesil,'stroke-width':3},bag);
    ['Etiket + yönerge','İzin + koruyucu ekipman'].forEach((s,i)=>yazi(c,bag,675,225+i*72,s,{size:34,renk:i?'var(--text)':yesil}));
    await c.say('Bir işaretin adını bilmek, güvenli davranış için yeterli midir?');
    await c.choice({q:'Öğrenci işareti tanıyor, fakat yönergeyi okumuyor. Çözümü yeterli mi?',options:['Yeterli; işaretin adı tek başına yeter.','Yetersiz; yönerge ve çalışma kuralları da değerlendirilir.','Yeterli; ürünün görünüşü güvenliği gösterir.'],answer:1,
      hints:['Adı bilmek davranışın güvenli olduğunu göstermez.','','Görünüş, yönergenin yerini tutmaz.'],right:'Önlem, işaretin yanında kullanım yönergesi ve çalışma kurallarıyla değerlendirilir.'});
    await c.tween(750,(e)=>bag.setAttribute('opacity',e));
    yazi(c,svg,500,480,'Bilgi → uygun önlem → değerlendirme',{size:32});
    await c.say('Önerinin neden uygun olduğunu kaynak kuralıyla açıkla.');
    c.note('<b>İşaret ve kural birlikte değerlendirilir.</b><br>Etiket: uygun koruyucu ekipman.', 'Değerlendirme');
  }
  async function cevre(c) {
    const svg=c.svg();
    function atik() {
      svg.replaceChildren();yazi(c,svg,500,65,'Kimyasal atık nereye?',{size:36});
      c.S('path',{d:'M95 235H315V285H95ZM135 285V355H275V285M205 355V410H275',fill:'none',stroke:soluk,'stroke-width':9},svg);
      yazi(c,svg,205,485,'Lavabo',{size:34});
      c.S('path',{d:'M610 190H860M635 210L650 415H820L835 210M685 177V157H785V177',fill:'none',stroke:yesil,'stroke-width':9},svg);
      yazi(c,svg,735,485,'Uygun atık kabı',{size:34,renk:yesil});
    }
    atik();yazi(c,svg,500,535,'Kitap s. 36',{size:30,renk:soluk});
    await c.say('Kullanılmış kimyasallar doğrudan lavaboya dökülmez.');
    await c.say('Bu maddeler uygun atık kaplarına yönlendirilir.');
    await c.choice({q:'Kullanılmış kimyasal, berrak göründüğü için lavaboya dökülebilir mi?',options:['Evet; görünüşü güvenliği gösterir.','Hayır; uygun atık kabına yönlendirilir.','Evet; yeniden temizleyici olarak kullanılır.'],answer:1,
      hints:['Atık kuralı, görünüşe bağlı değildir.','','Görünüş, atık madde için yeni bir kullanım önerisini desteklemez.'],right:'Madde berrak görünse de uygun atık kabı kuralı geçerlidir.'});
    const bag=c.S('g',{},svg);ok(c,bag,375,305,555);await belir(c,bag);
    await c.cont('Kurum örnekleri ›');
    const kart=(i)=>{
      svg.replaceChildren();
      const g=c.S('g',{},svg);
      c.S('path',{d:'M500 105L610 145V245Q600 310 500 360Q400 310 390 245V145Z',fill:'#162038',stroke:yesil,'stroke-width':5},g);
      cizgi(c,g,'M448 224L485 260L555 180',yesil,10);
      const satirlar=i===0?['Çevre, Şehircilik ve','İklim Değişikliği Bakanlığı','Kimyasal yönetimi ve güvenlik düzenlemeleri']:['KBRN Tespit ve Teşhis Sistemi Projesi','Türk savaş gemileri','Kimyasal, biyolojik, radyoaktif, nükleer tehditler'];
      satirlar.forEach((s,j)=>yazi(c,svg,500,420+j*47,s,{size:30,renk:j===0?yesil:'var(--text)'}));
    };
    kart(0);
    const sl=c.slider({label:'Programdaki kurum örneği',min:0,max:1,step:1,value:0,fmt:(i)=>i?'KBRN projesi':'Bakanlık',onInput:kart});
    const inp=sl.el.querySelector('input');if(inp)inp.setAttribute('aria-label','Kurum örneğini seç');
    await c.say('Program, düzenlemelere ve tehditleri tespit eden projeye dikkat çeker.',{noWait:true});
    await c.cont();
  }
  Ders.start({
    id:'etkilesim-b2',kicker:'Konu B · Kimyasal maddeler ve güvenlik',title:'Önlem kanıtla seçilir',accent:yesil,back:'index.html',
    intro:{title:'Önlem kanıtla seçilir',hook:'Şişedeki uyarı işareti hangi davranışını değiştirir?',button:'Derse başla ›'},
    scenes:[
      {title:'Önlemi tahmin et',goal:'Kazayı önleyen bilgiyi seç.',run:onlem},
      {title:'On bir işaret',goal:'Piktogramları adlarıyla eşleştir.',run:isaretler},
      {title:'Güvenli davranışı seç',goal:'Laboratuvar kurallarını gerekçelendir.',run:davranis},
      {title:'Çözümü değerlendir',goal:'Öneriyi etiket ve kuralla sına.',run:degerlendir},
      {title:'Çevre ve sorumluluk',goal:'Atık önlemini ve kurum örneklerini ilişkilendir.',run:cevre},
    ],quizTitle:'Çıkış soruları',
    quiz:[
      {q:'Kullanılmış kimyasal atık nereye yönlendirilir?',options:['Doğrudan lavaboya','Uygun atık kabına','Yemek kabına'],answer:1,
        why:['Kitap, doğrudan lavaboya dökmeyi yasaklar.','Atık yönetiminde uygun atık kabı kullanılır.','Yemek kabı, kimyasal atık kabı değildir.'],scene:4},
      {q:'Laboratuvarda doğru davranış hangisidir?',options:['Maddeyi koklayarak tanımak','Sıvıyı ağızla pipete çekmek','Etiketi okumak ve sorumlunun yönergesini izlemek'],answer:2,
        why:['Kimyasal maddeler koklanmaz.','Sıvı aktarımında puar kullanılır; ağızla çekilmez.','Etiket ve yönerge, güvenli davranışın dayanağıdır.'],scene:2},
    ],summary:['<b>Önce etiket, sonra uygun önlem.</b>','Önerini piktogram, yönerge ve çalışma kuralıyla değerlendir.'],
    nextLesson:{href:'c1-atom-modelleri.html',label:'Sonraki: Atom bilgisi veriyle değişti ›'},
  });
})();
