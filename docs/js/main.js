// Yuyue Zhou portfolio: routing, home-sound chart, score viewer, video chapters, code copy.
{
const gs=document.getElementById('gainsvg');
const layers=[{n:'Main loop',f:p=>1.5*(1-p**3),c:'var(--plum)'},{n:'Low (0.5×)',f:p=>.5*p,c:'#c46bd6'},{n:'Mid (1×)',f:p=>.35*p**3,c:'#8a6cff'},{n:'High (2×)',f:p=>.5*p**7,c:'var(--pink)'}];
const drawG=()=>{const W=gs.clientWidth,H=gs.clientHeight;if(!W)return;const narrow=W<420;const L=34,R=narrow?70:96,T=14,B=34;
 const x=p=>L+p*(W-L-R),y=v=>T+(1-v/1.6)*(H-T-B);let s='';
 [0,.5,1,1.5].forEach(v=>s+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="13" fill="var(--mut)">${v}</text>`);
 [0,.5,1].forEach(p=>s+=`<text x="${x(p)}" y="${H-12}" text-anchor="middle" font-size="13" fill="var(--mut)">${p===0?'far':p===1?'home':'0.5'}</text>`);
 const ends=[];layers.forEach(l=>{let d='';for(let i=0;i<=60;i++){const p=i/60;d+=(i?'L':'M')+x(p).toFixed(1)+' '+y(l.f(p)).toFixed(1)}
  s+=`<path d="${d}" fill="none" stroke="${l.c}" stroke-width="3" stroke-linecap="round"/>`;ends.push({l,yy:y(l.f(1))})});
 ends.sort((a,b)=>a.yy-b.yy);for(let i=1;i<ends.length;i++)if(ends[i].yy-ends[i-1].yy<16)ends[i].yy=ends[i-1].yy+16;
 ends.forEach(e=>s+=`<text x="${W-R+8}" y="${e.yy+4}" font-size="13" fill="${e.l.c}" font-weight="700">${narrow?e.l.n.split(' ')[0]:e.l.n}</text>`);
 gs.innerHTML=s};
const gro=new ResizeObserver(drawG);gro.observe(gs);


const sc=document.getElementById('score'),lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),lbc=document.getElementById('lbc');
let L=[],T='',cur=0,opener=null;
const fill=(el,cls)=>{const ps=el.dataset.pages.split(','),t=el.dataset.title;el.innerHTML=ps.map((s,i)=>`<button class="${cls}" data-i="${i}" type="button" aria-label="Open ${t} score, page ${i+1}"><img src="${s}" alt="${t} score, page ${i+1}" width="1105" height="1430" loading="lazy"></button>`).join('');
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(b){opener=b;openP(ps,t,+b.dataset.i)}})};
const openP=(ps,t,i)=>{L=ps;T=t;showPg(i);lb.hidden=false;document.getElementById('lbx').focus()};
const showPg=i=>{cur=(i+L.length)%L.length;lbimg.src=L[cur];lbimg.alt=`${T} score, page ${cur+1}`;lbc.textContent=`${T} · page ${cur+1} of ${L.length}`;document.getElementById('lbp').hidden=document.getElementById('lbn').hidden=L.length<2};
const closeP=()=>{lb.hidden=true;opener?.focus()};
fill(sc,'');document.querySelectorAll('.thumbs').forEach(el=>fill(el,'th'));
document.getElementById('lbx').onclick=closeP;document.getElementById('lbp').onclick=()=>showPg(cur-1);document.getElementById('lbn').onclick=()=>showPg(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeP()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeP();if(e.key==='ArrowLeft')showPg(cur-1);if(e.key==='ArrowRight')showPg(cur+1)});
const step=d=>sc.scrollBy({left:d*sc.clientWidth*.9,behavior:'smooth'});
document.getElementById('sprev').onclick=()=>step(-1);document.getElementById('snext').onclick=()=>step(1);
sc.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});

document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{const t=document.getElementById('code-'+b.dataset.c).textContent;try{await navigator.clipboard.writeText(t);b.textContent='Copied'}catch(e){b.textContent='Select the text to copy'}setTimeout(()=>b.textContent='Copy',1800)}));

const sv=document.getElementById('svid');
document.querySelectorAll('.ch-b').forEach(b=>b.addEventListener('click',()=>{sv.currentTime=+b.dataset.t;const p=sv.play();if(p)p.catch(()=>{})}));
const views=[...document.querySelectorAll('[data-view]')];
const route=()=>{let h=location.hash.slice(1);if(!views.some(v=>v.dataset.view===h))h='home';
 views.forEach(v=>v.hidden=v.dataset.view!==h);
 document.querySelectorAll('[data-nav]').forEach(a=>{const on=a.dataset.nav===h||(a.dataset.nav==='home'&&h!=='cv');on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
 window.scrollTo(0,0);if(h==='lost-and-sound')requestAnimationFrame(drawG)};
window.addEventListener('hashchange',route);route();
}
