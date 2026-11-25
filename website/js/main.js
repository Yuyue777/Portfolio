// Yuyue Zhou portfolio: covers, routing, score viewer, video chapters, code copy.
{
const G=["..XXXX..",".XXXXXX.","XXXXXXXX","XX.XX.XX","XXXXXXXX","XXXXXXXX","XXXXXXXX","X.XX.XX."];
document.getElementById('ghostpx').innerHTML=G.map((r,y)=>[...r].map((c,x)=>c==='X'?`<rect x="${x}" y="${y}" width="1" height="1"/>`:'').join('')).join('');

let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;

const covers=[
 {href:'#lost-and-sound',t:'Lost & Sound',d:'Close your eyes and walk home by ear.',draw(){
  seed=7;let s=`<rect width="1200" height="500" fill="#24102f"/>`;
  for(let i=0;i<90;i++)s+=`<rect x="${(rnd()*1200)|0}" y="${(rnd()*360)|0}" width="3" height="3" fill="#7a4f96" opacity="${(.3+rnd()*.5).toFixed(2)}"/>`;
  s+=`<rect y="370" width="1200" height="130" fill="#341a45"/><rect y="370" width="1200" height="4" fill="#4b2763"/>`;
  const hx=960,hy=170;
  s+=[110,74,42].map((r,i)=>`<circle cx="${hx}" cy="${hy}" r="${r}" fill="${['#5b2b7d','#a3489b','#ff8cc4'][i]}" opacity="${[.35,.45,.9][i]}"/>`).join('');
  s+=`<g transform="translate(${hx-16} ${hy-18})" fill="#2a1338"><rect x="4" y="13" width="24" height="20"/><path d="M0 15 L16 0 L32 15Z"/><rect x="13" y="22" width="7" height="11" fill="#ffd1e6"/></g>`;
  const lx=430,ly=290;
  for(let i=0;i<3;i++)s+=`<circle class="ring" cx="${lx}" cy="${ly}" r="330" fill="none" stroke="#c9a7ff" stroke-width="2" style="transform-origin:${lx}px ${ly}px;animation-delay:${i*1.5}s" opacity=".5"/>`;
  [150,90].forEach(r=>s+=`<circle cx="${lx}" cy="${ly}" r="${r}" fill="none" stroke="#6d4290" stroke-width="1.5" stroke-dasharray="4 6"/>`);
  s+=`<ellipse cx="${lx}" cy="${ly+32}" rx="28" ry="7" fill="#170a20" opacity=".6"/><circle cx="${lx}" cy="${ly}" r="24" fill="#f6eefa"/><path d="M${lx-28} ${ly+4} a28 28 0 0 1 56 0" fill="none" stroke="#ff5fa8" stroke-width="7"/><rect x="${lx-34}" y="${ly-2}" width="12" height="20" rx="4" fill="#ff5fa8"/><rect x="${lx+22}" y="${ly-2}" width="12" height="20" rx="4" fill="#ff5fa8"/>`;
  [[150,200,7,'#ff5fa8'],[640,230,5,'#d9b6ff'],[240,390,5,'#d9b6ff'],[700,390,6,'#ff5fa8'],[60,60,4,'#d9b6ff']].forEach(([x,y,k,c])=>{
   s+=`<ellipse cx="${x+4*k}" cy="${y+9*k}" rx="${3.5*k}" ry="${k*.7}" fill="#140819" opacity=".5"/><use href="#ghost" x="${x}" y="${y}" width="${8*k}" height="${8*k}" fill="${c}"/>`});
  return s}},
 {href:'#scamp-pieces',t:'SCAMP Piano Pieces',d:'Musical gestures written as Python functions. Code from “Clown”.',fit:'meet',draw(){
  const code=['def drop_down(start_pitch, repeats=1, rise=1):','    for x in range(repeats):','        piano.play_note(start_pitch + rise*x, 1.0, 2 / 3)','        piano.play_note(start_pitch + 1 + rise*x, 1.0, 1 / 6)','        piano.play_note(start_pitch + 3 + rise*x, 1.0, 1 / 6)','','    piano.play_note(start_pitch - 2, 1.0, 1.0)','','drop_down(60, repeats=4, rise=2)'];
  const C={kw:'#ff5fa8',bi:'#c9a7ff',str:'#ffb3d6',num:'#ffd1e6',fn:'#9fd8ff',tx:'#f0e4ff'};
  const re=/(\b(?:from|import|def|for|in)\b)|(\b(?:range|Session)\b)|("[^"]*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*(?=\())|([^]?)/g;
  const X=60,lh=34,y0=100,cw=10.9,fs=18.2;
  let s=`<rect width="1200" height="500" fill="#2b1438"/>`;
  code.forEach((ln,n)=>{const y=y0+n*lh;let col=0;
   ln.replace(re,(m,kw,bi,st,nu,fn)=>{const c=kw?C.kw:bi?C.bi:st?C.str:nu?C.num:fn?C.fn:C.tx;
    for(const ch of m){if(ch!==' ')s+=`<text class="ch" x="${(X+col*cw).toFixed(1)}" y="${y}" font-size="${fs}" fill="${c}" font-family="'JetBrains Mono',monospace">${ch}</text>`;else s+=`<text class="ch" x="${(X+col*cw).toFixed(1)}" y="${y}"></text>`;col++}return m});
   s+=`<text class="ch nl" x="${(X+col*cw).toFixed(1)}" y="${y}"></text>`});
  s+=`<rect id="cur" x="${(X+code[8].length*cw+2).toFixed(1)}" y="${y0+8*lh-16}" width="10" height="21" fill="#ff5fa8"/>`;
  const sy=210,sp=16,x0=790,x1=1150;
  for(let l=0;l<5;l++)s+=`<line x1="${x0-20}" x2="${x1}" y1="${sy+l*sp}" y2="${sy+l*sp}" stroke="#6d4290" stroke-width="2"/>`;
  const notes=[];for(let x=0;x<4;x++)notes.push([60+2*x,2/3,x],[61+2*x,1/6,x],[63+2*x,1/6,x]);notes.push([58,1,4]);
  const bx=(x1-x0)/5.2;let t=0;
  notes.forEach(([p,d,g])=>{const x=x0+t*bx,y=sy+4*sp+12-(p-60)*5,col=g===4?'#ff5fa8':'#f0e4ff';
   s+=`<g class="nt"><ellipse cx="${x.toFixed(1)}" cy="${y}" rx="${d<.5?6.5:8}" ry="${d<.5?5:6}" transform="rotate(-20 ${x.toFixed(1)} ${y})" fill="${col}"/><line x1="${(x+(d<.5?5.5:7)).toFixed(1)}" x2="${(x+(d<.5?5.5:7)).toFixed(1)}" y1="${y}" y2="${y-40}" stroke="${col}" stroke-width="2"/></g>`;t+=d});
  return s},
  anim(svg){const ch=[...svg.querySelectorAll('.ch')],nt=[...svg.querySelectorAll('.nt')],cur=svg.querySelector('#cur');
   let t=null,stop=false;const set=(els,v)=>els.forEach(e=>e.style.opacity=v);
   const run=()=>{if(stop)return;set(ch,0);set(nt,0);let i=0;
    const type=()=>{if(stop)return;if(i<ch.length){const e=ch[i];e.style.opacity=1;const b=e.getAttribute('x');cur.setAttribute('x',(+b+(e.classList.contains('nl')?0:12.6)).toFixed(1));cur.setAttribute('y',+e.getAttribute('y')-18);i++;t=setTimeout(type,e.classList.contains('nl')?90:22)}else{let k=0;const play=()=>{if(stop)return;if(k<nt.length){nt[k++].style.opacity=1;t=setTimeout(play,140)}else t=setTimeout(run,2600)};play()}};
    type()};
   run();return()=>{stop=true;clearTimeout(t)}}},
 {href:'#flowing-light',t:'Flowing Light',d:'Piano music and video about the Yangtze.',draw(){
  seed=5;const raw=[[-20,25],[100,18],[200,30],[240,38],[275,58],[300,110],[345,160],[370,195],[425,310],[455,390],[490,470],[550,300],[625,275],[695,205],[765,195],[835,285],[875,215],[955,275],[1005,155],[1080,120],[1220,150]];
  const pts=[];for(let k=0;k<raw.length-1;k++){const[a,b]=[raw[k],raw[k+1]];for(let t=0;t<3;t++){const f=t/3;pts.push([a[0]+(b[0]-a[0])*f+(t?(rnd()-.5)*10:0),a[1]+(b[1]-a[1])*f+(t?(rnd()-.5)*10:0)])}}pts.push(raw[raw.length-1]);
  const N=pts.length,L=[],R=[];
  for(let k=0;k<N;k++){const a=pts[Math.max(0,k-1)],b=pts[Math.min(N-1,k+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const m=Math.hypot(dx,dy)||1;dx/=m;dy/=m;const w=20+12*Math.sin(k*.9)+rnd()*8;
   L.push([pts[k][0]-dy*w,pts[k][1]+dx*w]);R.push([pts[k][0]+dy*w,pts[k][1]-dx*w])}
  const P=q=>q.map(v=>v[0].toFixed(1)+','+v[1].toFixed(1)).join(' ');
  const outline=P(L)+' '+P(R.slice().reverse());
  let s=`<rect width="1200" height="500" fill="#050307"/>`;
  s+=`<polygon points="${outline}" fill="#ff2a3c" opacity=".75" transform="translate(5 3)"/><polygon points="${outline}" fill="#2a3cff" opacity=".85" transform="translate(-5 -2)"/>`;
  const pal=['#f4fbf8','#c9f5e4','#9fe9ff','#d9dde0','#b7f0d2','#ffffff','#a9b3b8'];
  for(let k=0;k<N-1;k++){const wire=k<N*.22,mid=[(L[k][0]+R[k+1][0])/2,(L[k][1]+R[k+1][1])/2];
   const tris=[[L[k],L[k+1],mid],[L[k+1],R[k+1],mid],[R[k+1],R[k],mid],[R[k],L[k],mid]];
   tris.forEach(t=>{if(wire)s+=`<polygon points="${P(t)}" fill="#141414" stroke="#f2f2f2" stroke-width="2.2" stroke-linejoin="round"/>`;
    else{const c=pal[(rnd()*pal.length)|0];s+=`<polygon points="${P(t)}" fill="${c}" opacity="${(.9+rnd()*.1).toFixed(2)}" stroke="${c}" stroke-width=".6"/>`}})}
  s+=`<polyline class="flow" points="${P(pts)}" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="8 92" opacity=".9"/>`;
  return s}}
];

const covsvg=document.getElementById('covsvg'),cover=document.getElementById('cover'),cap=document.getElementById('cap');
let stopAnim=null;const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const show=i=>{const c=covers[i];if(stopAnim){stopAnim();stopAnim=null}covsvg.setAttribute('preserveAspectRatio','xMidYMid '+(c.fit||'slice'));covsvg.innerHTML=c.draw();if(c.anim&&!still)stopAnim=c.anim(covsvg);cover.href=c.href;cap.innerHTML=`<b>${c.t}</b>${c.d}`;
 document.querySelectorAll('.proj').forEach(p=>p.classList.toggle('on',+p.dataset.cov===i))};
document.querySelectorAll('.proj').forEach(p=>{const i=+p.dataset.cov;p.addEventListener('mouseenter',()=>show(i));p.addEventListener('focus',()=>show(i))});
show(1);

document.querySelectorAll('svg.mini').forEach(m=>{seed=+m.dataset.seed;let s='';
 for(let l=0;l<5;l++)s+=`<line x1="0" x2="300" y1="${25+l*10}" y2="${25+l*10}" stroke="var(--line)" stroke-width="1.2"/>`;
 let p=3;for(let x=30;x<290;x+=40){p+=Math.round((rnd()-.5)*4);p=Math.max(0,Math.min(8,p));s+=`<ellipse cx="${x}" cy="${65-p*5}" rx="6" ry="4.4" fill="var(--plum)"/>`}
 m.setAttribute('viewBox','0 0 300 90');m.innerHTML=s});

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
