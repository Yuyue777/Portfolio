// Yuyue Zhou portfolio: covers, routing, score viewer, video chapters, code copy.
{
const G=["..XXXX..",".XXXXXX.","XXXXXXXX","XX.XX.XX","XXXXXXXX","XXXXXXXX","XXXXXXXX","X.XX.XX."];
document.getElementById('ghostpx').innerHTML=G.map((r,y)=>[...r].map((c,x)=>c==='X'?`<rect x="${x}" y="${y}" width="1" height="1"/>`:'').join('')).join('');

let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;

// Engraved notation of drop_down(60, repeats=4, rise=2): four triplets (quarter + two 16ths), then a quarter.
// Local coords: y=0 is the bottom staff line (E4), one staff space = 16.
const scampNotes=()=>{
 const I='#eadcf6',sp=16;
 const ln=(x1,y1,x2,y2,w=1.6)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${I}" stroke-width="${w}"/>`;
 const bar=(x,y,w,sl,th)=>`<polygon points="${x-w},${y+sl/2} ${x+w},${y-sl/2} ${x+w},${y-sl/2+th} ${x-w},${y+sl/2+th}"/>`;
 const acc={
  '#':(x,y)=>ln(x-3,y-17,x-3,y+19)+ln(x+3,y-19,x+3,y+17)+bar(x,y-7,7,4,4)+bar(x,y+3,7,4,4),
  'b':(x,y)=>ln(x-3,y-20,x-3,y+6)+`<path d="M${x-3} ${y-1}C${x+2} ${y-7} ${x+10} ${y-5} ${x+7} ${y}C${x+5} ${y+3} ${x+1} ${y+5} ${x-3} ${y+6}L${x-3} ${y+3.5}C${x+1} ${y+2} ${x+5} ${y-1} ${x+5} ${y-2.5}C${x+5} ${y-5} ${x+1} ${y-4} ${x-3} ${y+1.5}Z"/>`,
  'n':(x,y)=>ln(x-3,y-17,x-3,y+7)+ln(x+3,y-7,x+3,y+17)+bar(x,y-6,3,2,3.5)+bar(x,y+3,3,2,3.5)};
 let s='';for(let k=0;k<5;k++)s+=ln(-8,-k*sp,500,-k*sp,1.3);
 const note=(x,[l,o,a])=>{const y=-(o*7+'CDEFGAB'.indexOf(l)-30)*sp/2;
  s+=`<ellipse cx="${x}" cy="${y}" rx="9.4" ry="6.8" transform="rotate(-20 ${x} ${y})"/>`;
  for(let v=sp;v<=y;v+=sp)s+=ln(x-13,v,x+13,v);
  if(a)s+=acc[a](x-21,y);return y};
 const stem=(x,y,top)=>ln(x+8.6,y-1,x+8.6,top);
 const G=[[['C',4],['C',4,'#'],['E',4,'b']],[['D',4],['E',4],['F',4]],[['E',4,'n'],['F',4],['G',4]],[['F',4,'#'],['G',4],['A',4]]];
 G.forEach((g,i)=>{const gx=i*112;
  const q=note(gx+24,g[0]);s+=stem(gx+24,q,q-54);
  const y1=note(gx+68,g[1]),y2=note(gx+94,g[2]),top=Math.min(y1,y2)-50,sl=Math.sign(y1-y2)*3,b1=top+sl,b2=top-sl;
  s+=stem(gx+68,y1,b1)+stem(gx+94,y2,b2);
  [0,11].forEach(d=>s+=`<polygon points="${gx+75.8},${b1+d} ${gx+103.4},${b2+d} ${gx+103.4},${b2+d+7} ${gx+75.8},${b1+d+7}"/>`);
  const by=46,m=gx+57;
  s+=`<path d="M${gx+10} ${by-8}V${by}H${m-12}M${m+12} ${by}H${gx+104}V${by-8}" fill="none" stroke="${I}" stroke-width="1.6"/><text x="${m}" y="${by+7}" text-anchor="middle" font-size="22" font-style="italic" font-weight="700" font-family="Georgia,'Times New Roman',serif">3</text>`});
 const f=note(472,['B',3,'b']);s+=stem(472,f,f-54);
 return `<g fill="${I}">${s}</g>`};

const covers=[
 {href:'#lost-and-sound',t:'Lost & Sound',d:'Close your eyes and walk home by ear.',draw(){
  seed=7;let s=`<rect width="1200" height="500" fill="#24102f"/>`;
  for(let i=0;i<110;i++)s+=`<rect x="${(rnd()*1200)|0}" y="${(rnd()*500)|0}" width="3" height="3" fill="#7a4f96" opacity="${(.3+rnd()*.5).toFixed(2)}"/>`;
  const hx=960,hy=170;
  s+=[110,74,42].map((r,i)=>`<circle cx="${hx}" cy="${hy}" r="${r}" fill="${['#5b2b7d','#a3489b','#ff8cc4'][i]}" opacity="${[.35,.45,.9][i]}"/>`).join('');
  s+=`<g transform="translate(${hx-16} ${hy-18})" fill="#2a1338"><rect x="4" y="13" width="24" height="20"/><path d="M0 15 L16 0 L32 15Z"/><rect x="13" y="22" width="7" height="11" fill="#ffd1e6"/></g>`;
  const lx=430,ly=290;
  s+=`<ellipse cx="${lx}" cy="${ly+32}" rx="28" ry="7" fill="#170a20" opacity=".6"/><circle cx="${lx}" cy="${ly}" r="24" fill="#f6eefa"/><path d="M${lx-28} ${ly+4} a28 28 0 0 1 56 0" fill="none" stroke="#ff5fa8" stroke-width="7"/><rect x="${lx-34}" y="${ly-2}" width="12" height="20" rx="4" fill="#ff5fa8"/><rect x="${lx+22}" y="${ly-2}" width="12" height="20" rx="4" fill="#ff5fa8"/>`;
  [[150,200,7,'#ff5fa8'],[640,230,5,'#d9b6ff'],[240,390,5,'#d9b6ff'],[700,390,6,'#ff5fa8']].forEach(([x,y,k,c])=>{
   s+=`<ellipse cx="${x+4*k}" cy="${y+9*k}" rx="${3.5*k}" ry="${k*.7}" fill="#140819" opacity=".5"/><use href="#ghost" x="${x}" y="${y}" width="${8*k}" height="${8*k}" fill="${c}"/>`});
  return s}},
 {href:'#scamp-pieces',t:'SCAMP Piano Pieces',d:'Musical gestures written as Python functions. Code from “Clown”.',fit:'meet',draw(){
  const code=['def drop_down(start_pitch, repeats=1, rise=1):','    for x in range(repeats):','        piano.play_note(start_pitch + rise*x, 1.0, 2 / 3)','        piano.play_note(start_pitch + 1 + rise*x, 1.0, 1 / 6)','        piano.play_note(start_pitch + 3 + rise*x, 1.0, 1 / 6)','','    piano.play_note(start_pitch - 2, 1.0, 1.0)','','drop_down(60, repeats=4, rise=2)'];
  const C={kw:'#ff5fa8',bi:'#c9a7ff',str:'#ffb3d6',num:'#ffd1e6',fn:'#9fd8ff',tx:'#f0e4ff'};
  const re=/(\b(?:from|import|def|for|in)\b)|(\b(?:range|Session)\b)|("[^"]*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*(?=\())|([^])/g;
  let s=`<rect width="1200" height="500" fill="#2b1438"/>`;
  code.forEach((ln,n)=>{let t='';
   ln.replace(re,(m,kw,bi,st,nu,fn)=>{t+=`<tspan fill="${kw?C.kw:bi?C.bi:st?C.str:nu?C.num:fn?C.fn:C.tx}">${m}</tspan>`;return m});
   s+=`<text x="56" y="${104+n*31}" font-size="16" font-family="'JetBrains Mono',monospace" xml:space="preserve" style="white-space:pre">${t}</text>`});
  return s+`<g transform="translate(680 250)">${scampNotes()}</g>`}},
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
let curCov=1;
const show=i=>{const c=covers[i];curCov=i;covsvg.setAttribute('preserveAspectRatio','xMidYMid '+(c.fit||'slice'));covsvg.innerHTML=c.draw();cover.href=c.href;cap.innerHTML=`<b>${c.t}</b>${c.d}`;
 document.querySelectorAll('.proj').forEach(p=>p.classList.toggle('on',+p.dataset.cov===i))};
document.querySelectorAll('.proj').forEach(p=>{const i=+p.dataset.cov;p.addEventListener('mouseenter',()=>show(i));p.addEventListener('focus',()=>show(i))});
// Arrows step through covers in the project list's order.
const covOrder=[...document.querySelectorAll('.proj')].map(p=>+p.dataset.cov);
const stepCov=d=>show(covOrder[(covOrder.indexOf(curCov)+d+covOrder.length)%covOrder.length]);
document.getElementById('cvp').onclick=()=>stepCov(-1);document.getElementById('cvn').onclick=()=>stepCov(1);
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
