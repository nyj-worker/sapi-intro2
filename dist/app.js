const projects = [
['어르신 키오스크 연습센터','일상 속 디지털 기기를 더 편하게. 어르신을 위한 키오스크 연습 공간입니다.','시민 서비스','https://senior-keyosk.vercel.app/','보건소 · 스마트경로당','kiosk'],
['스마트 화물팀 업무 대시보드','화물팀의 업무 정보를 한곳에서 살펴보는 통합 대시보드입니다.','업무 혁신','','자동차관리과 · 화물팀','dashboard'],
['남양주시 맛집지도','“우리 오늘 뭐 먹지?” 남양주시의 맛집을 지도로 만나보세요.','시민 서비스','https://nyj-go-to2.vercel.app/','지역 정보','map'],
['고유가 피해지원금 시스템 매뉴얼','피해지원금 시스템 사용 방법을 쉽게 찾아볼 수 있는 온라인 안내서입니다.','업무 혁신','https://sites.google.com/view/nyj-manual/%ED%99%88','복지행정과','book'],
['남양주시 공장등록현황','남양주시 공장등록 정보를 살펴볼 수 있는 현황 사이트입니다.','업무 혁신','https://factory-sigma-mauve.vercel.app/','공장 정보','factory'],
['금연캠페인','건강한 일상을 위한 남양주보건소의 금연캠페인 안내 사이트입니다.','시민 서비스','https://nyj-nosmoke.vercel.app/','보건소 · 건강증진과','health'],
['1페이지 보고서 작성 비법','신규 공직자를 위한 간결하고 명확한 보고서 작성 학습 자료입니다.','학습·공유','https://nyj-1page.vercel.app/','신규자 업무 학습','book'],
['업무활용 단축키','반복 작업을 가볍게 만드는 업무용 단축키를 배우는 학습 사이트입니다.','학습·공유','https://nyj-shortcut.vercel.app/','신규자 업무 학습','keyboard'],
['AI 활용 프롬프트','업무에 AI를 활용하기 위한 프롬프트 학습 사이트입니다.','학습·공유','https://nyj-shortcut.vercel.app/','신규자 업무 학습 · 원문 주소 동일','ai'],
['인포그래픽 & 대시보드 만들기','공공 인포그래픽과 대시보드를 5분 만에 만드는 방법을 소개합니다.','학습·공유','https://nyj-sapi.vercel.app/','데이터 시각화','dashboard'],
['시민주권위원회 시정백서','민선9기 남양주시 시민주권위원회의 시정백서 사이트입니다.','시민 서비스','https://civil-one-flame.vercel.app/','민선9기 · 시민주권위원회','book'],
['시민주권위원회 시민보고회','민선9기 남양주시 시민주권위원회 시민보고회 영상 제작 성과입니다.','영상·홍보','https://www.youtube.com/live/Zxz1c1drLGU?si=alo_F6krP5Ytv4ts&t=2152','민선9기 · 보고회 영상','video'],
['2026년 조직개편 입법예고','남양주시 조직개편 관련 자치법규 입법예고를 안내합니다.','업무 혁신','https://reorg-nu.vercel.app/','자치법규 · 입법예고','factory'],
['여성기업 공공구매 상담회','2026년 여성기업 공공구매 상담회 참여기업을 소개합니다.','시민 서비스','https://2026-wcom.netlify.app/','기업 지원','map'],
['시무식 · 다산 정약용 위대한 도약','AI를 활용해 제작한 2026년 남양주시 시무식 영상입니다.','영상·홍보','','2026 시무식 · AI 영상','video'],
['신년인사회 · 다산이 전하는 새해 인사','AI를 활용해 제작한 2026년 신년인사회 홍보 영상입니다.','영상·홍보','','2026 신년인사회 · AI 영상','video'],
['교통국 정책 홍보 웹툰 · 시정 소식지','AI를 활용해 시정 소식지에 담는 교통국 정책 홍보 웹툰을 제작했습니다.','영상·홍보','','자동차관리과 · 화물팀','book'],
['기본사회 정책교육 요약 자료','2026.09.14 기본사회위원회 강남훈 부위원장 강의 내용을 정리한 정책교육 요약 자료입니다.','학습·공유','https://basic-society.vercel.app/','2026.09.14 · 기본사회위원회 강남훈 부위원장 강의','book'],
['화물 인허가 스마트 AI 상담관','화물 인허가 업무에 관한 궁금증을 상담할 수 있는 AI 서비스입니다.','시민 서비스','https://cargo-chatbot.vercel.app/','자동차관리과 · 화물팀','ai'],
['우리동네 화물주차장 2.0','우리동네 화물주차장 2.0을 소개하는 홍보 사이트입니다.','시민 서비스','https://nyj-garage2.vercel.app/','자동차관리과 · 화물팀','map'],
['유가보조금 2회추경 설명 자료','유가보조금 2회 추가경정예산 설명을 위한 온라인 자료입니다.','업무 혁신','https://tr-subsidy.vercel.app/','자동차관리과 · 화물팀','dashboard'],
['스마트 교통국 현황 대시보드','교통국 현황을 한눈에 살펴볼 수 있도록 구성한 대시보드입니다.','업무 혁신','','교통국','dashboard'],
['교통국 정책 홍보 웹툰','교통국의 정책을 보다 친근한 웹툰 형식으로 알리는 홍보 성과물입니다.','영상·홍보','','교통국','book'],
['화물팀 민원서비스 안내','화물팀 민원서비스와 이용 방법을 안내하는 온라인 가이드입니다.','시민 서비스','https://handbook1.vercel.app/','자동차관리과 · 화물팀','book']
];
const members=[['김상수','부시장','지방이사관','고문'],['송성희','건축관리과','시설사무관','회원'],['유종형','자동차관리과','행정주사','학습리더','화물팀'],['이기정','교통정책과','방송통신주사','회원','교통시설1팀'],['권태준','지역경제과','시설주사','회원','기업SOS팀'],['김동겸','토지정보과','시설주사','부리더','토지민원1팀'],['김세화','남양주보건소 건강증진과','간호주사','회원','건강증진팀'],['정호진','문화예술과','행정주사보','회원','문화정책팀'],['한지수','지역경제과','행정서기','회원','소비자경제팀'],['최유관','주차관리과','행정서기보','회원','주차관리팀'],['신우철','자동차관리과','공업서기보','회원','화물팀']];
const drawings={kiosk:'<rect x="74" y="18" width="82" height="107" rx="9"/><rect x="83" y="28" width="64" height="72" rx="4"/><path d="M98 125v18h35v-18M91 144h49"/><rect x="91" y="40" width="48" height="12" rx="2"/><path d="M93 65h15m12 0h17M93 78h15m12 0h17"/>',dashboard:'<rect x="36" y="29" width="157" height="105" rx="7"/><path d="M36 49h157M88 49v85M48 62h26M48 74h21M48 86h25M48 98h18M104 116V93h17v23m12 0V76h17v40m13 0V65h17v51"/><circle cx="47" cy="39" r="2"/>',map:'<path d="m34 47 49-15 62 17 51-18v95l-51 19-62-18-49 16zM83 32v95m62-78v96M38 107l44-25 28 9 37-29 45 20"/><path d="M141 68c0 17-22 34-22 34s-22-17-22-34a22 22 0 1 1 44 0Z"/><circle cx="119" cy="67" r="7"/>',book:'<path d="M49 30h59l14 9 14-9h50v108h-50l-14 8-14-8H49zM122 39v107M64 51h31M64 64h37M64 77h32M64 90h36M141 53h29M141 67h29M141 81h22"/>',factory:'<path d="M33 136V76l42-25v25l42-25v25l43-25v85zM160 136V27h22v109M47 95h14v17H47zm41 0h14v17H88zm41 0h14v17h-14zM33 136h162"/>',health:'<path d="M116 138s-76-43-76-83c0-35 51-44 76-9 25-35 76-26 76 9 0 40-76 83-76 83Z"/><path d="M61 83h29l14-27 17 52 16-25h35"/>',keyboard:'<rect x="25" y="45" width="181" height="90" rx="9"/><path d="M41 61h17v13H41zm29 0h17v13H70zm29 0h17v13H99zm29 0h17v13h-17zm29 0h30v13h-30zM41 87h26v13H41zm37 0h17v13H78zm29 0h17v13h-17zm29 0h17v13h-17zm29 0h22v13h-22zM72 112h89v10H72z"/>',ai:'<rect x="68" y="35" width="96" height="96" rx="16"/><rect x="84" y="51" width="64" height="64" rx="9"/><path d="M94 20v15m22-15v15m22-15v15M94 131v15m22-15v15m22-15v15M53 61h15m-15 22h15m-15 22h15m96-44h15m-15 22h15m-15 22h15"/><path d="m99 98 17-30 17 30m-27-10h20"/>',video:'<rect x="38" y="31" width="158" height="108" rx="8"/><path d="m102 59 40 25-40 25zM38 119h158M52 129h61"/>'};
const grid=document.querySelector('#project-grid');
projects.forEach((p,i)=>{const el=document.createElement('article');el.className='project-card '+(i===0?'featured':'');el.dataset.category=p[2];el.dataset.search=p.join(' ').toLowerCase();el.innerHTML=`<div class="card-art art-${p[5]}"><span class="project-no">P / ${String(i+1).padStart(2,'0')}</span><svg viewBox="0 0 230 165" aria-hidden="true">${drawings[p[5]]}</svg><span class="art-corner">+</span>${i===0?'<span class="featured-label">FEATURED PROJECT</span>':''}</div><div class="card-body"><span class="category">${p[2]}</span><h3>${p[0]}</h3><p>${p[1]}</p><div class="card-bottom"><span>${p[4]}</span>${p[3]?`<a href="${p[3]}" target="_blank" rel="noopener noreferrer" aria-label="${p[0]} 사이트 열기 (새 탭)">사이트 보기 <b>↗</b></a>`:'<span class="pending">링크 준비 중</span>'}</div>${p[3]?`<span class="print-url">${p[3]}</span>`:''}</div>`;grid.append(el)});
// Highlight working services immediately after the research approach.
const aboutProjects=document.createElement('div');
aboutProjects.className='about-projects';
aboutProjects.setAttribute('aria-labelledby','field-ideas-title');
document.querySelector('.about-grid').after(aboutProjects);
const fieldIdeasTitle=document.createElement('h3');
fieldIdeasTitle.id='field-ideas-title';
fieldIdeasTitle.className='field-ideas-title scroll-highlight';
fieldIdeasTitle.textContent='현장의 아이디어를 구현합니다';
aboutProjects.before(fieldIdeasTitle);
const fieldIdeasHint=document.createElement('p');
fieldIdeasHint.id='field-ideas-hint';
fieldIdeasHint.className='field-ideas-hint';
fieldIdeasHint.textContent='각 카드를 클릭하시면 아이디어를 확인하실 수 있습니다.';
fieldIdeasTitle.after(fieldIdeasHint);
aboutProjects.setAttribute('aria-describedby',fieldIdeasHint.id);
function addAboutCards(container,titles){
  titles.forEach(title=>{
    const index=projects.findIndex(project=>project[0]===title);
    if(index<0)return;
    const card=grid.children[index].cloneNode(true);
    card.classList.remove('featured');
    card.querySelector('.featured-label')?.remove();
    container.append(card);
  });
}
addAboutCards(aboutProjects,['화물 인허가 스마트 AI 상담관','우리동네 화물주차장 2.0','남양주시 공장등록현황','금연캠페인','고유가 피해지원금 시스템 매뉴얼','어르신 키오스크 연습센터']);
const efficiencyTitle=document.createElement('h3');
efficiencyTitle.id='efficiency-title';
efficiencyTitle.className='field-ideas-title scroll-highlight';
efficiencyTitle.textContent='업무효율을 높여드립니다';
const efficiencyProjects=document.createElement('div');
efficiencyProjects.className='about-projects efficiency-projects';
efficiencyProjects.setAttribute('aria-labelledby','efficiency-title');
aboutProjects.after(efficiencyTitle,efficiencyProjects);
// Place the purpose statement between field ideas and productivity tools.
const purposeStatement=document.querySelector('#about .mission');
if(purposeStatement)aboutProjects.after(purposeStatement);
addAboutCards(efficiencyProjects,['AI 활용 프롬프트','인포그래픽 & 대시보드 만들기','1페이지 보고서 작성 비법','업무활용 단축키']);
const adminTitle=document.createElement('h3');
adminTitle.id='admin-guide-title';
adminTitle.className='field-ideas-title scroll-highlight';
adminTitle.textContent='행정을 알기 쉽게 설명해드립니다';
const adminProjects=document.createElement('div');
adminProjects.className='about-projects efficiency-projects admin-projects';
adminProjects.setAttribute('aria-labelledby','admin-guide-title');
efficiencyProjects.after(adminTitle,adminProjects);
[[efficiencyTitle,efficiencyProjects,'efficiency-hint'],[adminTitle,adminProjects,'admin-guide-hint']].forEach(([title,cards,id])=>{
  const hint=document.createElement('p');
  hint.id=id;
  hint.className='field-ideas-hint';
  hint.textContent='각 카드를 클릭하시면 아이디어를 확인하실 수 있습니다.';
  title.after(hint);
  cards.setAttribute('aria-describedby',id);
});
addAboutCards(adminProjects,['기본사회 정책교육 요약 자료','화물팀 민원서비스 안내','교통국 정책 홍보 웹툰 · 시정 소식지','2026년 조직개편 입법예고']);
['기본사회 정책교육 요약 자료','화물팀 민원서비스 안내','시정소식지(교통국 정책홍보 웹툰)','2026년 조직개편 입법예고 설명자료'].forEach((title,index)=>{
  const card=adminProjects.children[index];
  card.querySelector('h3').textContent=title;
  card.querySelector('a')?.setAttribute('aria-label',`${title} 사이트 열기 (새 탭)`);
});
// Move the legislative notice card into the productivity grid.
efficiencyProjects.append(adminProjects.lastElementChild);
addAboutCards(efficiencyProjects,['유가보조금 2회추경 설명 자료']);
document.querySelectorAll('.project-card').forEach(card=>{
  card.title='카드를 클릭시 아이디어를 확인하실 수 있습니다.';
});
document.querySelector('#member-rows').innerHTML=members.map((m,i)=>`<tr><td>${String(i+1).padStart(2,'0')}</td><th scope="row">${m[0]}</th><td>${m[1]}${m[4]?`<span class="team">${m[4]}</span>`:''}</td><td>${m[2]}</td><td><span class="role ${m[3]==='회원'?'':'role-special'}">${m[3]}</span></td></tr>`).join('');
let filter='전체';const search=document.querySelector('input[type="search"]');function updateProjects(){let count=0;grid.querySelectorAll('.project-card').forEach(c=>{c.hidden=!((filter==='전체'||c.dataset.category===filter)&&c.dataset.search.includes(search.value.trim().toLowerCase()));if(!c.hidden)count++});document.querySelector('#result-count').textContent=`${filter} ${count}개의 성과물`;document.querySelector('.empty').hidden=count>0;grid.classList.toggle('filtered',filter!=='전체'||search.value.length>0)}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});updateProjects()}));search.addEventListener('input',updateProjects);
const menu=document.querySelector('.menu-toggle'),backdrop=document.querySelector('.backdrop');function closeMenu(){document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');backdrop.hidden=true}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');backdrop.hidden=!open});backdrop.addEventListener('click',closeMenu);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.querySelectorAll('#sidebar a').forEach(a=>a.addEventListener('click',closeMenu));document.querySelector('.print-button').addEventListener('click',()=>window.print());
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}})},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('main>section').forEach(s=>observer.observe(s));

// Reveal individual blocks rather than hiding entire, potentially long sections.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
  const revealTargets=document.querySelectorAll('.hero-band,.stats,.section-head,.about-intro,.about-grid article,.research-card,.field-ideas-title,.field-ideas-hint,.mission,.project-controls,.project-card,.table-wrap,.closing');
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting,boundingClientRect})=>{
      if(isIntersecting)target.classList.add('is-revealed');
      else if(boundingClientRect.bottom<=0||boundingClientRect.top>=innerHeight)target.classList.remove('is-revealed');
    });
  },{threshold:0,rootMargin:'0px 0px -28px 0px'});
  revealTargets.forEach(target=>{
    target.classList.add('reveal-item');
    if(target.matches('.project-card,.about-grid article')){
      const index=[...target.parentElement.children].indexOf(target);
      target.style.setProperty('--reveal-delay',`${index%3*65}ms`);
    }
    revealObserver.observe(target);
  });
  // Keyboard users can always see the element that receives focus.
  document.addEventListener('focusin',e=>e.target.closest('.reveal-item')?.classList.add('is-revealed'));
}

// Fill words in reading order, including sentences that wrap onto several lines.
const highlights=[...document.querySelectorAll('.scroll-highlight')].map(element=>{
  const text=element.textContent;
  const fragment=document.createDocumentFragment();
  let offset=0;
  const words=text.split(/(\s+)/).filter(Boolean).map(part=>{
    const start=offset;offset+=part.length;
    if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));return null}
    const span=document.createElement('span');span.className='highlight-word';span.textContent=part;
    fragment.append(span);return {span,start,end:offset};
  }).filter(Boolean);
  element.replaceChildren(fragment);
  return {element,words,length:text.length};
});
function updateHighlights(){
  highlights.forEach(({element,words,length})=>{
    const top=element.getBoundingClientRect().top;
    const progress=motionPreference.matches?1:Math.max(0,Math.min(1,(innerHeight*.82-top)/(innerHeight*.37)));
    words.forEach(({span,start,end})=>{
      const fill=Math.max(0,Math.min(1,(progress*length-start)/(end-start)));
      span.style.setProperty('--highlight-fill',`${(fill*100).toFixed(2)}%`);
    });
  });
}
motionPreference.addEventListener('change',()=>scheduleTopUpdate());

const topButton=document.createElement('button');
topButton.className='floating-top';
topButton.type='button';
topButton.setAttribute('aria-label','페이지 맨 위로 이동');
topButton.setAttribute('aria-hidden','true');
topButton.tabIndex=-1;
topButton.innerHTML='<svg class="top-progress" viewBox="0 0 60 60" aria-hidden="true"><circle class="top-track" cx="30" cy="30" r="27"/><circle class="top-ring" cx="30" cy="30" r="27" pathLength="100"/></svg><span class="top-arrow" aria-hidden="true">↑</span><span class="top-label" aria-hidden="true">TOP</span>';
document.body.append(topButton);
let topUpdateFrame=0;
const heroCue=document.querySelector('.visual-bottom');
const heroVisual=document.querySelector('.hero-visual');
// A short scroll reveals the invitation; continuing past the hero fades it out.
function updateHeroCue(){
  if(!heroCue||!heroVisual)return;
  const distance=Math.max(0,window.scrollY);
  const fadeIn=Math.max(0,Math.min(1,distance/70));
  const fadeStart=Math.min(220,heroVisual.offsetHeight*.3);
  const fadeOut=1-Math.max(0,Math.min(1,(distance-fadeStart)/140));
  const opacity=fadeIn*fadeOut;
  heroCue.classList.add('scroll-cue-ready');
  heroCue.style.setProperty('--cue-opacity',opacity.toFixed(3));
  heroCue.style.setProperty('--cue-offset',`${((1-fadeIn)*14-(1-fadeOut)*10).toFixed(2)}px`);
  const hidden=opacity<.05;
  heroCue.inert=hidden;
  heroCue.setAttribute('aria-hidden',String(hidden));
}
function updateTopButton(){
  topUpdateFrame=0;
  const scrollY=Math.max(0,window.scrollY);
  const scrollable=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const progress=scrollable?Math.min(100,scrollY/scrollable*100):0;
  const visible=scrollY>250;
  topButton.style.setProperty('--scroll-progress',progress.toFixed(2));
  topButton.classList.toggle('is-visible',visible);
  topButton.setAttribute('aria-hidden',String(!visible));
  topButton.tabIndex=visible?0:-1;
  if(!visible&&document.activeElement===topButton)topButton.blur();
  updateHighlights();
  updateHeroCue();
}
function scheduleTopUpdate(){if(!topUpdateFrame)topUpdateFrame=requestAnimationFrame(updateTopButton)}
window.addEventListener('scroll',scheduleTopUpdate,{passive:true});
window.addEventListener('resize',scheduleTopUpdate,{passive:true});
if('ResizeObserver' in window)new ResizeObserver(scheduleTopUpdate).observe(document.body);
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:motionPreference.matches?'instant':'smooth'}));
updateTopButton();



