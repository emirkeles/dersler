/* Tema içi geliştirme denetimi: gerçek tarayıcıda grafik kontrolleri. */
const assert=require('node:assert/strict');
const {dersiAc,dersDosyasi}=require('../../../araclar/tarayici');
async function sahne(code,index){
 const t=await dersiAc(dersDosyasi('biyoloji/yasam/'+code));
 await t.page.evaluate(i=>{Ders.current.state.speed=8;Ders.current.state.voice=false;Ders.current.go(i,true);},index);
 await t.page.waitForSelector('.act input[type=range]',{timeout:15000});
 return t;
}
(async()=>{
 let failures=0;
 if(process.argv.includes('--tema')){
  const path=require('node:path');
  const t=await dersiAc(dersDosyasi('biyoloji/yasam/a1'));
  try{
   await t.page.goto('file://'+path.join(process.cwd(),'biyoloji/yasam/index.html'));
   await t.page.waitForSelector('.topic-block');await t.page.evaluate(()=>document.fonts.ready);
   const counts=await t.page.evaluate(()=>({konu:document.querySelectorAll('.topic-block').length,ders:document.querySelectorAll('.lesson').length}));
   assert.equal(counts.konu,8);assert.equal(counts.ders,37);
   await t.page.screenshot({path:'/tmp/yasam-olc/tema.png'});
   for(const letter of 'abcdefgh'){
    const block=await t.page.$('#konu-'+letter);await block.evaluate(e=>e.open=true);
    await block.screenshot({path:'/tmp/yasam-olc/tema-'+letter+'.png'});
   }
   await t.page.screenshot({path:'/tmp/yasam-olc/tema-tum.png',fullPage:true});
   assert.equal(t.hatalar.length,0);console.log('Tema sayfası: 8 konu, 37 ders; konsol temiz.');
  }finally{await t.browser.close();}
  return;
 }
 for(const code of ['h2','h3']){
  const t=await sahne(code,code==='h2'?2:1);
  try{
   const result=await t.page.evaluate(code=>{
    const inp=document.querySelector('.act input[type=range]'), svg=document.querySelector('.stage svg');
    const min=+inp.min,max=+inp.max,step=+inp.step;
    const points=[];
    if(code==='h2'){
     const band=svg.querySelector('rect'),lo=+band.getAttribute('x'),hi=lo+(+band.getAttribute('width'));
     for(let v=min;v<=max;v+=step){inp.value=v;inp.dispatchEvent(new Event('input',{bubbles:true}));const n=svg.querySelector('circle');points.push({v,x:+n.getAttribute('cx'),y:+n.getAttribute('cy')});}
     return {values:points,bandReachable:points.some(p=>p.x>=lo&&p.x<=hi)};
    }
    const curves=[...svg.querySelectorAll('path')].filter(p=>['#3cc8e8','#ec9ec4'].includes(p.getAttribute('stroke')));
    const line=[...svg.querySelectorAll('line')].find(l=>l.getAttribute('stroke')==='#f5b04c');
    for(let v=min;v<=max;v+=step){inp.value=v;inp.dispatchEvent(new Event('input',{bubbles:true}));const x=+line.getAttribute('x1');for(const curve of curves){let best=null;for(let a=0;a<=500;a++){const p=curve.getPointAtLength(curve.getTotalLength()*a/500);if(!best||Math.abs(p.x-x)<Math.abs(best.x-x))best={x:p.x,y:p.y};}if(Math.abs(best.x-x)<2)points.push({v,curveY:best.y,visible:best.y>=+line.getAttribute('y1')&&best.y<=+line.getAttribute('y2')});}}
    return {points,coversCurves:points.every(p=>p.visible)};
   },code);
   assert.ok(code==='h2'?result.bandReachable:result.coversCurves,code+': '+JSON.stringify(result));
   assert.equal(t.hatalar.length,0,'Konsol hataları');console.log(code+': grafik kontrolü temiz');
  }catch(e){failures++;console.error(e.message);}finally{await t.browser.close();}
 }
 if(process.argv.includes('--girisler')){
  const fs=require('node:fs'),path=require('node:path');
  const files=fs.readdirSync(path.join(process.cwd(),'biyoloji/yasam')).filter(f=>/^[a-h]\d+-.*\.html$/.test(f));
  for(const file of files){
   const t=await dersiAc(path.join(process.cwd(),'biyoloji/yasam',file));
   try{
    await t.page.evaluate(()=>{window.__baslangic=[];window.__dersSay=x=>window.__baslangic.push(x);Ders.current.state.speed=8;Ders.current.state.voice=false;Ders.current.go(0,true);});
    await t.page.waitForSelector('.act .panel .q, .act > button.btn',{timeout:15000});
    // Bazı deney sahneleri ilk sorudan önce öğrencinin uygulama düğmesini bekler.
    while(!await t.page.$('.act .panel .q')){
      await t.page.click('.act > button.btn');
      await t.page.waitForSelector('.act .panel .q, .act > button.btn',{timeout:15000});
    }
    const r=await t.page.evaluate(()=>({id:Ders.current.id,captions:window.__baslangic.filter(x=>!x.noWait).map(x=>x.text),scenes:Ders.current.scenes.filter(s=>!s.internal).length,notebook:[...document.querySelectorAll('.notes .note')].map(x=>x.textContent)}));
    assert.ok(r.captions.length>=2&&r.captions.length<=3,file+': ilk soru öncesi '+r.captions.length+' altyazı');
    assert.ok(r.scenes>=3&&r.scenes<=5,file+': sahne sayısı '+r.scenes);
    await t.page.evaluate(i=>{Ders.current.go(i,true);},r.scenes);
    await t.page.waitForSelector('.stage .card .meta',{timeout:3000});
    const quizLabel=await t.page.$eval('.stage .card .meta',e=>e.textContent.trim());
    assert.equal(quizLabel,'Soru 1 / 2',file+': iki çıkış sorusu');
    assert.equal(t.hatalar.length,0,file+': konsol');
    console.log(r.id+': '+r.captions.length+' bağlam altyazısı, '+r.scenes+' sahne, 2 çıkış sorusu');
   }catch(e){failures++;console.error(e.message);}finally{await t.browser.close();}
  }
 }
 process.exitCode=failures?1:0;
})().catch(e=>{console.error(e);process.exitCode=1;});
