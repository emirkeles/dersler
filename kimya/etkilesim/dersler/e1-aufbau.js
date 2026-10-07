/* E1 · KİM.9.1.5 a,b · Kitap s.58–62,65,68. H/He s.59, Be s.62, Li s.68.
   Enerji yüksekliği ve hareket yolu temsili; gerçek elektron yörüngesi değildir. */
(() => {
  'use strict';
  const { yazi } = KIT, renk = '#6ea8ff';
  const atomlar = [
    { ad: 'H', diz: '1s¹', dolu: [1,0,0], kaynak: '59' },
    { ad: 'He', diz: '1s²', dolu: [2,0,0], kaynak: '59' },
    { ad: 'Li', diz: '1s² 2s¹', dolu: [2,1,0], kaynak: '68' },
    { ad: 'Be', diz: '1s² 2s²', dolu: [2,2,0], kaynak: '62' },
  ];
  const ok = (c, p, x, y, yon, r = renk) => KIT.elektronOku(c, p, x, y, yon, { renk: r, alt: 58 });
  function tahta(c, svg, a, doldur = true) {
    svg.replaceChildren();
    yazi(c, svg, 500, 65, a.ad + ' · ' + a.diz, { size:44 });
    c.S('path', { d:'M 175 455 L 175 120 M 163 140 L 175 120 L 187 140', fill:'none',stroke:renk,'stroke-width':4 }, svg);
    yazi(c, svg, 175, 492, 'Enerji', { size:32 });
    const yerler = [];
    ['1s','2s','2p'].forEach((ad,i) => {
      const y = 370-i*120, n=i===2?3:1;
      yazi(c, svg, 330, y+49, ad, { size:38 });
      for(let j=0;j<n;j++) {
        const x=425+j*100;
        c.S('rect', {x,y,width:76,height:78,rx:4,fill:'none',stroke:renk,'stroke-width':3},svg);
        yerler.push({i,j,x,y});
        if(doldur && j===0) for(let k=0;k<a.dolu[i];k++) ok(c,svg,x+23+k*29,y,k===0?1:-1);
      }
    });
    yazi(c,svg,500,540,'Kitap s. '+a.kaynak+' · yükseklik temsili',{size:30,renk:'var(--muted)'});
    return yerler;
  }
  async function yerlestir(c,svg,a) {
    const yerler=tahta(c,svg,a,false);
    for(let i=0;i<3;i++) for(let k=0;k<a.dolu[i];k++) {
      const b=yerler.find(v=>v.i===i && v.j===0), x=b.x+23+k*29;
      const g=ok(c,svg,x,b.y,k===0?1:-1);
      await c.tween(500,e=>g.setAttribute('transform',`translate(${(800-x)*(1-e)} ${(-b.y+60)*(1-e)})`));
    }
  }
  async function ornek(c) {
    const svg=c.svg(); tahta(c,svg,atomlar[0],false);
    await c.say('Elektron dağılımı, pigment tasarımı ve elektronik cihazlarla ilişkilidir.');
    await c.say('Kutular orbitaldir; oklar elektronları temsil eder.');
    await c.choice({tag:'Tahmin et',q:'H elektronunu hangi orbitale yerleştirir?',options:['1s','2s','2p'],answer:0,hints:['','Daha düşük enerjili 1s boş.','Daha düşük enerjili 1s boş.'],right:'Kaynak H örneğinde önce 1s dolar.'});
    await yerlestir(c,svg,atomlar[0]);
    await c.say('H için 1s¹; He için aynı orbitalde iki elektron.');
    await c.cont('He örneğini gör ›');
    await yerlestir(c,svg,atomlar[1]);
    await c.say('He dizilimi 1s²: düşük enerjili orbital doldu.');
  }
  async function tahmin(c) {
    const svg=c.svg();tahta(c,svg,atomlar[1]);
    await c.say('Bir sonraki atomda üçüncü elektronun yerini kuralla tahmin et.');
    await c.choice({tag:'Tahmin et',q:'Li’nin üçüncü elektronu için hangi yer uygundur?',options:['2p','2s','3s'],answer:1,hints:['2s, 2p’den düşük enerjili.','','2s dolmadan 3s’ye geçilmez.'],right:'1s dolu; sıradaki düşük enerjili orbital 2s.'});
    await yerlestir(c,svg,atomlar[2]);
    await c.say('Kitabın Li örneğinde üçüncü elektron 2s’ye yerleşir.');
    await c.choice({q:'Be için dördüncü elektron nereye yerleşir?',options:['2s','2p'],answer:0,hints:['','2s henüz dolmadı.'],right:'Kitaptaki Be örneğinde 2s de dolar.'});
    await yerlestir(c,svg,atomlar[3]);
    await c.say('Be: 1s² 2s²; önce düşük enerjili yerler doldu.');
  }
  async function adlandir(c) {
    const svg=c.svg();tahta(c,svg,atomlar[3]);
    await c.say('Örüntüyü genelleştir: elektronlar düşük enerjiliden başlayarak yerleşir.');
    await c.choice({q:'Bu örneklerden hangi genelleme çıkar?',options:['Boş olan her orbital aynı önceliktedir.','Önce düşük enerjili uygun orbital dolar.'],answer:1,hints:['1s ve 2s örnekleri rastgele dolmadı.',''],right:'Bu yerleşim sırası Aufbau ilkesi olarak adlandırılır.'});
    yazi(c,svg,780,280,'Aufbau',{size:42,renk});
    await c.say('Aufbau ilkesi, düşükten yükseğe dolma sırasını düzenler.');
    c.note('<b>Önce düşük enerjili uygun orbital.</b><br>Be: 1s² 2s²','Aufbau');
    await c.cont();
  }
  async function dene(c) {
    const svg=c.svg();tahta(c,svg,atomlar[0]);
    c.slider({label:'Atomu seç',min:0,max:3,step:1,value:0,fmt:i=>atomlar[i].ad,onInput:i=>tahta(c,svg,atomlar[i])});
    await c.say('Atomları değiştir; dizilimle orbital kutularını birlikte oku.',{noWait:true});
    await c.cont('Sırayı sınayalım ›');
    c.clearAct(); tahta(c,svg,atomlar[1]);
    await c.choice({tag:'Yanlışı ayıkla',q:'Li için 1s² 2p¹ yazılması hangi açıdan hatalı?',options:['Daha düşük enerjili 2s atlanmış.','Bir orbitalde iki elektron bulunamaz.','Li’nin ilk elektronu 2p’de olmalı.'],answer:0,hints:['','1s’de iki elektron bulunabilir.','İlk elektron düşük enerjili 1s’ye yerleşir.'],right:'Dizilimi enerji sırasıyla karşılaştır: 1s → 2s → 2p.'});
    await yerlestir(c,svg,atomlar[2]);
    await c.say('Önce en düşük enerjili uygun orbital.');
  }
  Ders.start({id:'etkilesim-e1',kicker:'Konu E · Elektron dizilimi',title:'Önce düşük enerji',accent:renk,back:'index.html',
    intro:{title:'Önce düşük enerji',hook:'Atomdaki elektronlar boş yerleri hangi sırayla doldurur?',button:'Derse başla ›'},
    scenes:[{title:'Örnekleri gör',goal:'Dizilimi kutu-ok şemasıyla oku.',run:ornek},{title:'Örüntüyü tahmin et',goal:'Li ve Be için düşük enerjili yeri seç.',run:tahmin},{title:'Aufbau diye adlandır',goal:'Örüntüden yerleşim kuralına ulaş.',run:adlandir},{title:'Dizilimi kur',goal:'Yeni dizilimi enerji sırasıyla denetle.',run:dene}],quizTitle:'Çıkış soruları',
    quiz:[{q:'Li’nin üçüncü elektronu nereye yerleşir?',options:['2p','2s','3s'],answer:1,why:['2s daha düşük enerjilidir.','1s dolunca sıradaki düşük enerjili orbital 2s’dir.','2s dolmadan 3s’ye geçilmez.'],scene:1},{q:'Aufbau ilkesi neyi düzenler?',options:['Düşükten yükseğe yerleşim sırasını','Atomların renk sırasını','Proton keşif yılını'],answer:0,why:['Elektronlar önce düşük enerjili uygun orbitale yerleşir.','Renk sıralaması Aufbau’nun konusu değildir.','Keşif tarihi yerleşim kuralı değildir.'],scene:2}],
    summary:['<b>Önce en düşük enerjili uygun orbital.</b>','Dizilimi orbital şeması ve enerji sırasıyla birlikte denetle.'],nextLesson:{href:'e2-pauli-ve-hund.html',label:'Sonraki: Eş enerjiye önce tek tek ›'}});
})();
