
/* ═══ DATA ═══════════════════════════════════════ */
const NEED_E=['🏠','⚡','🛒','🧴','🚌','💊','📞','🍳','🌊','🔧'];
const WANT_E=['🚗','✈️','🎉','👗','📱','🏖️','🎮','🍕','🎸','💍','🖥️','👟'];
let data={
  needs:[
    {id:1,emoji:'🏠',name:'שכירות',amount:3200},
    {id:2,emoji:'⚡',name:'חשבונות',amount:500},
    {id:3,emoji:'🛒',name:'מזון',amount:1200},
    {id:4,emoji:'🧴',name:'היגיינה',amount:250},
    {id:5,emoji:'🚌',name:'תחבורה',amount:400},
  ],
  wants:[
    {id:6,emoji:'🚗',name:'רכב',amount:60000},
    {id:7,emoji:'✈️',name:'טיסה לחו"ל',amount:8000},
    {id:8,emoji:'🎉',name:'מסיבות',amount:2000},
    {id:9,emoji:'👗',name:'קניית בגדים',amount:1500},
    {id:10,emoji:'📱',name:'טלפון חדש',amount:4000},
  ]
};
let nextId=20,savingsPct=20,selEmoji={need:'🏠',want:'🌟'};
let appBootstrapped=false;
let compoundBootstrapped=false;
let indexInvestingBootstrapped=false;
const compoundState={
  status:'struggling',
  targetAge:30,
  lastSavingsRate:10,
  lastStartAge:22,
  timelineBalances:[]
};
const INDEX_INITIAL_CASH=10000;
const indexState={
  seed:123456,
  startCash:INDEX_INITIAL_CASH,
  cash:INDEX_INITIAL_CASH,
  totalSkippedYears:0,
  assets:[]
};
const indexAssetDefs=[
  {id:'sp500',name:'S&P 500',icon:'🇺🇸',type:'מדד',price:420,drift:0.07,volatility:0.09},
  {id:'nasdaq',name:'נאסד"ק',icon:'💻',type:'מדד',price:320,drift:0.08,volatility:0.12},
  {id:'ta35',name:'ת"א 35',icon:'🇮🇱',type:'מדד',price:180,drift:0.05,volatility:0.08},
  {id:'ta125',name:'ת"א 125',icon:'📈',type:'מדד',price:205,drift:0.055,volatility:0.085},
  {id:'banks',name:'מדד הבנקים',icon:'🏦',type:'מדד',price:150,drift:0.06,volatility:0.1},
  {id:'amazon',name:'Amazon',icon:'📦',type:'מניה',price:165,drift:0.09,volatility:0.2},
  {id:'google',name:'Google',icon:'🔎',type:'מניה',price:145,drift:0.085,volatility:0.18}
];
const indexModalState={open:false,mode:'buy',assetId:''};

const ROUTES={
  '#/wants-vs-needs':'page-wants-vs-needs',
  '#/compound-savings-investment-age':'page-compound-savings-investment-age',
  '#/index-investing':'page-index-investing',
  '#/ikigai-personality-onboarding':'page-ikigai-personality-onboarding',
  '#/cv-template-israeli':'page-cv-template-israeli'
};
const ROUTE_TITLES={
  '#/wants-vs-needs':'רצונות מול צרכים',
  '#/compound-savings-investment-age':'ריבית דריבית - חיסכון - השקעה',
  '#/index-investing':'השקעה במדדים',
  '#/ikigai-personality-onboarding':'איקיאגי + שאלון אישיות',
  '#/cv-template-israeli':'עבודה: פורמט קורות חיים'
};
const A11Y_KEY='paamonim_a11y_prefs_v1';
const a11yState={fontScale:100,contrast:false,underline:false,readable:false,noMotion:false};

function closeMenu(){document.body.classList.remove('menu-open')}
function openMenu(){document.body.classList.add('menu-open')}
function closeA11y(){document.getElementById('a11y-panel').classList.remove('open')}
function openA11y(){document.getElementById('a11y-panel').classList.add('open')}

function saveA11y(){
  localStorage.setItem(A11Y_KEY,JSON.stringify(a11yState));
}
function loadA11y(){
  try{
    const raw=localStorage.getItem(A11Y_KEY);
    if(!raw) return;
    const parsed=JSON.parse(raw);
    Object.assign(a11yState,parsed||{});
  }catch{}
}
function syncA11yButtons(){
  const setActive=(id,val)=>{
    const btn=document.getElementById(id);
    if(!btn) return;
    btn.classList.toggle('active',!!val);
    btn.setAttribute('aria-pressed',val?'true':'false');
  };
  const fontBtn=document.getElementById('a11y-font');
  if(fontBtn){
    fontBtn.textContent=a11yState.fontScale===100?'A+ הגדלת טקסט':`A ${a11yState.fontScale}%`;
    fontBtn.classList.toggle('active',a11yState.fontScale>100);
    fontBtn.setAttribute('aria-pressed',a11yState.fontScale>100?'true':'false');
  }
  setActive('a11y-contrast',a11yState.contrast);
  setActive('a11y-underline',a11yState.underline);
  setActive('a11y-readable',a11yState.readable);
  setActive('a11y-motion',a11yState.noMotion);
}
function applyA11y(){
  document.body.style.zoom=String(a11yState.fontScale/100);
  document.body.classList.toggle('a11y-contrast',a11yState.contrast);
  document.body.classList.toggle('a11y-underline',a11yState.underline);
  document.body.classList.toggle('a11y-readable',a11yState.readable);
  document.body.classList.toggle('a11y-no-motion',a11yState.noMotion);
  syncA11yButtons();
}
function resetA11y(){
  a11yState.fontScale=100;
  a11yState.contrast=false;
  a11yState.underline=false;
  a11yState.readable=false;
  a11yState.noMotion=false;
  applyA11y();
  saveA11y();
}
function initA11y(){
  loadA11y();
  applyA11y();
  document.getElementById('a11y-fab').addEventListener('click',()=>{
    const panel=document.getElementById('a11y-panel');
    panel.classList.contains('open')?closeA11y():openA11y();
  });
  document.getElementById('a11y-close').addEventListener('click',closeA11y);
  document.getElementById('a11y-font').addEventListener('click',()=>{
    a11yState.fontScale=a11yState.fontScale===100?112:(a11yState.fontScale===112?125:100);
    applyA11y();saveA11y();
  });
  document.getElementById('a11y-contrast').addEventListener('click',()=>{
    a11yState.contrast=!a11yState.contrast;applyA11y();saveA11y();
  });
  document.getElementById('a11y-underline').addEventListener('click',()=>{
    a11yState.underline=!a11yState.underline;applyA11y();saveA11y();
  });
  document.getElementById('a11y-readable').addEventListener('click',()=>{
    a11yState.readable=!a11yState.readable;applyA11y();saveA11y();
  });
  document.getElementById('a11y-motion').addEventListener('click',()=>{
    a11yState.noMotion=!a11yState.noMotion;applyA11y();saveA11y();
  });
  document.getElementById('a11y-reset').addEventListener('click',resetA11y);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeA11y();}});
}

function bootstrapMainPage(){
  if(appBootstrapped) return;
  renderItems('need');renderItems('want');initSortable();onSlider(20);
  appBootstrapped=true;
}

function bootstrapCompoundPage(){
  if(compoundBootstrapped) return;
  const ids=[
    'cmp-person-name','cmp-current-age','cmp-income','cmp-saving-rate','cmp-return',
    'cmp-start-age','cmp-timeline-age','cmp-user-age','cmp-user-monthly'
  ];
  ids.forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('input',recalcCompound);
  });
  document.querySelectorAll('#cmp-status-chips .status-chip').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#cmp-status-chips .status-chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      compoundState.status=btn.dataset.status;
      recalcCompound();
    });
  });
  document.querySelectorAll('#cmp-target-chips .target-chip').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#cmp-target-chips .target-chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      compoundState.targetAge=parseInt(btn.dataset.targetAge,10);
      recalcCompound();
    });
  });
  recalcCompound();
  compoundBootstrapped=true;
}

function bootstrapIndexInvestingPage(){
  if(indexInvestingBootstrapped) return;
  resetIndexInvestingState();
  document.getElementById('idx-reset-btn').addEventListener('click',resetIndexInvestingState);
  document.getElementById('idx-no-touch-btn').addEventListener('click',showNoTouchComparison);
  document.querySelectorAll('[data-skip-years]').forEach(btn=>{
    btn.addEventListener('click',()=>skipIndexYears(parseInt(btn.dataset.skipYears,10)||1));
  });
  document.getElementById('idx-modal-amount').addEventListener('input',renderTradePreview);
  document.getElementById('idx-modal-cancel').addEventListener('click',closeIndexModal);
  document.getElementById('idx-modal-confirm').addEventListener('click',confirmTradeAction);
  document.getElementById('index-trade-modal').addEventListener('click',e=>{
    if(e.target.id==='index-trade-modal') closeIndexModal();
  });
  indexInvestingBootstrapped=true;
}

function bootstrapIkigaiPage(){
  if(window.IkigaiOnboarding&&typeof window.IkigaiOnboarding.bootstrap==='function'){
    window.IkigaiOnboarding.bootstrap();
  }
}

function setRoute(){
  if(!ROUTES[window.location.hash]){
    window.location.hash='#/wants-vs-needs';
    return;
  }
  const activeHash=window.location.hash;
  const activeId=ROUTES[window.location.hash];
  document.querySelectorAll('.app-page').forEach(page=>{page.hidden=page.id!==activeId});
  document.querySelectorAll('#hamburger-nav a').forEach(link=>{
    link.classList.toggle('active',link.getAttribute('href')===activeHash);
  });
  document.title=`${ROUTE_TITLES[activeHash]} | פעמונים`;
  if(activeId==='page-wants-vs-needs') bootstrapMainPage();
  if(activeId==='page-compound-savings-investment-age') bootstrapCompoundPage();
  if(activeId==='page-index-investing') bootstrapIndexInvestingPage();
  if(activeId==='page-ikigai-personality-onboarding') bootstrapIkigaiPage();
  closeMenu();
}

/* ═══ RENDER ITEMS ═══════════════════════════════ */
function renderItems(type){
  const el=document.getElementById(type+'s-list');
  el.innerHTML='';
  data[type+'s'].forEach((item,idx)=>{
    const d=document.createElement('div');
    d.className='item';d.dataset.id=item.id;
    d.innerHTML=`
      <span class="drag-handle">⠿</span>
      <span class="item-emoji">${item.emoji}</span>
      <input class="item-name-input" value="${item.name}" oninput="updF('${type}s',${idx},'name',this.value)"/>
      <div class="amt-wrap">
        <input class="amt-input" type="number" value="${item.amount}" min="0" oninput="updF('${type}s',${idx},'amount',parseFloat(this.value)||0)"/>
        <span class="amt-cur">₪</span>
      </div>
      <button class="del-btn" onclick="delItem('${type}s',${idx})">✕</button>`;
    el.appendChild(d);
  });
}
function updF(k,i,f,v){data[k][i][f]=v;recalc()}
function delItem(k,i){data[k].splice(i,1);renderItems(k==='needs'?'need':'want');recalc()}

/* ═══ ADD ════════════════════════════════════════ */
function addItem(type){
  const nEl=document.getElementById('add-'+type+'-name');
  const aEl=document.getElementById('add-'+type+'-amount');
  const name=nEl.value.trim();
  if(!name){nEl.style.borderColor='var(--red)';nEl.focus();setTimeout(()=>nEl.style.borderColor='',1500);return}
  data[type+'s'].push({id:nextId++,emoji:selEmoji[type],name,amount:parseFloat(aEl.value)||0});
  nEl.value='';aEl.value='';nEl.focus();
  renderItems(type);recalc();
}
['need','want'].forEach(t=>{
  document.getElementById('add-'+t+'-name').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('add-'+t+'-amount').focus()}});
  document.getElementById('add-'+t+'-amount').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addItem(t)}});
});

/* ═══ EMOJI PICKER ═══════════════════════════════ */
function togglePicker(type){
  const p=document.getElementById('emoji-picker-'+type);
  const arr=type==='need'?NEED_E:WANT_E;
  if(p.classList.contains('open')){p.classList.remove('open');return}
  p.innerHTML=arr.map(e=>`<span class="e-opt" onclick="pickE('${type}','${e}')">${e}</span>`).join('');
  p.classList.add('open');
}
function pickE(type,e){selEmoji[type]=e;document.getElementById(type+'-emoji-btn').textContent=e;document.getElementById('emoji-picker-'+type).classList.remove('open')}

/* ═══ SORTABLE ═══════════════════════════════════ */
function initSortable(){
  ['needs','wants'].forEach(id=>{
    Sortable.create(document.getElementById(id+'-list'),{
      group:'shared',animation:200,handle:'.drag-handle',
      ghostClass:'sortable-ghost',chosenClass:'sortable-chosen',
      onEnd(e){
        const from=e.from.id==='needs-list'?'needs':'wants';
        const to=e.to.id==='needs-list'?'needs':'wants';
        const item=data[from].splice(e.oldIndex,1)[0];
        data[to].splice(e.newIndex,0,item);
        renderItems('need');renderItems('want');recalc();
      }
    });
  });
}

/* ═══ SLIDER ═════════════════════════════════════ */
function onSlider(val){
  savingsPct=parseInt(val);
  document.getElementById('savings-pct').textContent=val;
  document.getElementById('slider-fill').style.width=(val/60*100)+'%';
  recalc();
}

/* ═══ RECALC ═════════════════════════════════════ */
function recalc(){
  const salary=parseFloat(document.getElementById('salary').value)||0;
  const needsTotal=data.needs.reduce((s,i)=>s+i.amount,0);
  const savingsAmt=Math.round(salary*savingsPct/100);
  const leftover=salary-needsTotal-savingsAmt;
  const free=Math.max(0,leftover);

  document.getElementById('needs-total').textContent='₪'+needsTotal.toLocaleString();
  document.getElementById('wants-total').textContent='₪'+data.wants.reduce((s,i)=>s+i.amount,0).toLocaleString();

  // budget badges
  document.getElementById('budget-badges').innerHTML=`
    <span class="badge badge-green">🏠 צרכים: ₪${needsTotal.toLocaleString()}</span>
    <span class="badge badge-blue">💾 חיסכון: ₪${savingsAmt.toLocaleString()}</span>
    <span class="badge ${leftover>=0?'badge-green':'badge-red'}">${leftover>=0?'✅ פנוי':'❌ גרעון'}: ₪${leftover.toLocaleString()}</span>`;

  // savings summary
  document.getElementById('savings-summary').innerHTML=`
    <div class="savings-stat stat-needs"><div class="savings-stat-val">₪${needsTotal.toLocaleString()}</div><div class="savings-stat-label">צרכים</div></div>
    <div class="savings-stat stat-savings"><div class="savings-stat-val">₪${savingsAmt.toLocaleString()}</div><div class="savings-stat-label">חיסכון</div></div>
    <div class="savings-stat stat-free"><div class="savings-stat-val" style="color:${leftover>=0?'var(--primary-dark)':'var(--red)'}">₪${leftover.toLocaleString()}</div><div class="savings-stat-label">פנוי</div></div>`;

  // bar
  const total=Math.max(salary,needsTotal+savingsAmt+1);
  const nP=Math.min(100,needsTotal/total*100);
  const sP=Math.min(100-nP,savingsAmt/total*100);
  const rem=Math.max(0,100-nP-sP);
  const wP=Math.min(rem,(data.wants.length?Math.min(free,data.wants.reduce((s,i)=>s+i.amount,0)/(data.wants.length*12)):0)/total*100);
  const lP=Math.max(0,rem-wP);
  const sb=(id,pct,lbl)=>{const e=document.getElementById(id);e.style.width=pct.toFixed(1)+'%';e.textContent=pct>9?lbl:''};
  sb('seg-needs',nP,`צרכים ${Math.round(nP)}%`);
  sb('seg-savings',sP,`חיסכון ${Math.round(sP)}%`);
  sb('seg-wants',wP,'רצונות');
  sb('seg-free',lP,'פנוי');

  const alertEl=document.getElementById('bar-alert');
  if(leftover<0) alertEl.innerHTML=`<div class="alert-box alert-red">⚠️ הצרכים + חיסכון עוברים את המשכורת! חסרים ₪${Math.abs(leftover).toLocaleString()}.</div>`;
  else if(leftover<salary*0.08) alertEl.innerHTML=`<div class="alert-box alert-yellow">⚠️ נשאר מעט מאוד אחרי הצרכים.</div>`;
  else alertEl.innerHTML=`<div class="alert-box alert-green">✅ יש ₪${leftover.toLocaleString()} פנויים לאחר צרכים וחיסכון!</div>`;

  renderSim(salary,needsTotal,savingsAmt,free);
}

/* ═══ SIMULATOR ══════════════════════════════════ */
function months(cost,mo){return mo<=0?999:Math.ceil(cost/mo)}
function gcClass(m,free){
  if(free<=0) return{cls:'gc-red',lbl:'לא ניתן כרגע 😢'};
  if(m<=3)    return{cls:'gc-green',lbl:'מהר מאוד! 🎉'};
  if(m<=12)   return{cls:'gc-green',lbl:'השנה! 🙌'};
  if(m<=24)   return{cls:'gc-yellow',lbl:'בשנה-שנתיים'};
  if(m<=48)   return{cls:'gc-orange',lbl:'בשנים הקרובות'};
  return          {cls:'gc-red',lbl:'טווח ארוך'};
}

function renderSim(salary,needsTotal,savingsAmt,free){
  const grid=document.getElementById('sim-grid');
  if(!data.wants.length){
    grid.innerHTML='<p style="color:#94A3B8;grid-column:1/-1;text-align:center;padding:28px;font-size:15px">הוסף רצונות לרשימה כדי לראות את הסימולטור 👆</p>';
    return;
  }
  grid.innerHTML=data.wants.map((want,idx)=>{
    const m=months(want.amount,free);
    const{cls,lbl}=gcClass(m,free);
    const yrs=m>0&&m<999&&m>=18?` · ${(m/12).toFixed(1)} שנים`:'';
    return `
      <div class="goal-card ${cls}">
        <span class="goal-emoji">${want.emoji}</span>
        <div class="goal-name">${want.name}</div>
        <div class="goal-months-wrap">
          <span class="goal-months" id="gm-${idx}">${m>=999?'∞':m}</span>
          <span class="goal-months-unit">חודשים</span>
        </div>
        <div class="goal-label">${lbl}${yrs}</div>
        <div class="goal-cost">עלות: ₪${want.amount.toLocaleString()}</div>
        <div class="mini-slider-wrap">
          <div class="mini-slider-label">
            <span>מה אם אחסוך עוד?</span>
            <span id="ge-${idx}">+0%</span>
          </div>
          <input type="range" class="mini-slider" min="0" max="40" value="0" step="1"
            oninput="updGoal(${idx},${want.amount},${salary},${needsTotal},${savingsAmt},this.value,this)"/>
        </div>
        <div class="what-if" id="wi-${idx}"></div>
      </div>`;
  }).join('');
}

function updGoal(idx,cost,salary,needsTotal,base,extra,slider){
  const pct=(extra/40*100).toFixed(1);
  slider.style.background=`linear-gradient(to left,var(--purple) ${pct}%,#E5E7EB ${pct}%)`;
  const origFree=Math.max(0,salary-needsTotal-base);
  const addedMonthly=Math.round(salary*extra/100);
  const newFree=origFree+addedMonthly;
  const newM=months(cost,newFree);
  const origM=months(cost,origFree);
  const diff=origM-newM;
  document.getElementById('ge-'+idx).textContent='+'+extra+'%';
  document.getElementById('gm-'+idx).textContent=newM>=999?'∞':newM;
  const wi=document.getElementById('wi-'+idx);
  if(extra>0){
    wi.style.display='block';
    wi.textContent=diff>0?`🚀 חסכת ${diff} חודשים!`:diff===0?'↔️ אותו זמן':'⚠️ לא צפוי - בדוק נתונים';
  } else wi.style.display='none';
}

/* ═══ SHARE IMAGE ════════════════════════════════ */
async function shareImage(){
  const panel=document.getElementById('sim-panel');
  const ch=document.getElementById('cap-header'),cf=document.getElementById('cap-footer');
  const ov=document.getElementById('snap-overlay');
  ov.style.display='flex';ch.style.display='block';cf.style.display='block';
  await new Promise(r=>setTimeout(r,150));
  try{
    const canvas=await html2canvas(panel,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false});
    ch.style.display='none';cf.style.display='none';ov.style.display='none';
    const url=canvas.toDataURL('image/png');
    if(navigator.canShare){
      const blob=await(await fetch(url)).blob();
      const file=new File([blob],'plan.png',{type:'image/png'});
      if(navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'התכנון הפיננסי שלי 💰'});return}
    }
    const a=document.createElement('a');a.href=url;a.download='financial-plan.png';a.click();
  }catch{ch.style.display='none';cf.style.display='none';ov.style.display='none';alert('שגיאה 😢')}
}

/* ═══ WHATSAPP SHARE ═════════════════════════════ */
function shareWA(){
  const siteUrl=window.location.href;
  window.open('https://wa.me/?text='+encodeURIComponent(siteUrl),'_blank');
}

/* ═══ INDEX INVESTING PAGE ═══════════════════════ */
function seededRandom(){
  indexState.seed=(indexState.seed*1664525+1013904223)>>>0;
  return indexState.seed/4294967296;
}

function randRange(min,max){
  return min+(max-min)*seededRandom();
}

function fmtIlsCompact(num){
  return '₪'+Math.round(num).toLocaleString('he-IL');
}

function resetIndexInvestingState(){
  indexState.seed=123456;
  indexState.cash=indexState.startCash;
  indexState.totalSkippedYears=0;
  indexState.assets=indexAssetDefs.map(def=>({
    ...def,
    currentPrice:def.price,
    dayChange:0,
    history:Array.from({length:20},()=>def.price),
    quantity:0,
    avgBuyPrice:0
  }));
  closeIndexModal();
  renderIndexInvesting();
}

function calcIndexPortfolioValue(){
  return indexState.assets.reduce((sum,asset)=>sum+(asset.quantity*asset.currentPrice),0)+indexState.cash;
}

function calcAssetPnL(asset){
  if(asset.quantity<=0) return 0;
  return (asset.currentPrice-asset.avgBuyPrice)*asset.quantity;
}

function renderSparkline(history){
  const min=Math.min(...history);
  const max=Math.max(...history);
  const spread=Math.max(1,max-min);
  const points=history.map((val,idx)=>{
    const x=(idx/(history.length-1))*100;
    const y=90-((val-min)/spread)*80;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg class="spark" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline fill="none" stroke="#4A9FD8" stroke-width="3" points="${points}"/></svg>`;
}

function renderIndexAssets(){
  const grid=document.getElementById('idx-asset-grid');
  grid.innerHTML=indexState.assets.map(asset=>{
    const dayPct=(asset.dayChange*100);
    const dayCls=dayPct>=0?'chg-pos':'chg-neg';
    const holdingInfo=asset.quantity>0?`מחזיק: ${asset.quantity.toFixed(2)} יח'`:'אין אחזקה כרגע';
    return `
      <div class="asset-card">
        <div class="asset-head">
          <div>
            <div class="asset-label"><span class="asset-icon">${asset.icon||'📊'}</span><div class="asset-name">${asset.name}</div></div>
            <div class="asset-type">${asset.type}</div>
          </div>
          <div class="${dayCls}">${dayPct>=0?'+':''}${dayPct.toFixed(1)}%</div>
        </div>
        <div class="asset-price">${fmtIlsCompact(asset.currentPrice)}</div>
        ${renderSparkline(asset.history)}
        <div style="font-size:12px;color:var(--text-muted)">${holdingInfo}</div>
        <div class="asset-actions">
          <button class="buy" type="button" onclick="openTradeModal('buy','${asset.id}')">קנה</button>
          <button class="sell" type="button" ${asset.quantity<=0?'disabled':''} onclick="openTradeModal('sell','${asset.id}')">מכור</button>
        </div>
      </div>`;
  }).join('');
}

function renderIndexHoldings(){
  const body=document.getElementById('idx-holdings-body');
  const holdings=indexState.assets.filter(asset=>asset.quantity>0);
  if(!holdings.length){
    body.innerHTML='<tr><td colspan="5" style="color:#98A2B3">אין עדיין אחזקות. אפשר להתחיל מרכישה קטנה.</td></tr>';
    return;
  }
  body.innerHTML=holdings.map(asset=>{
    const pnl=calcAssetPnL(asset);
    return `<tr>
      <td>${asset.icon||'📊'} ${asset.name}</td>
      <td>${asset.quantity.toFixed(2)}</td>
      <td>${fmtIlsCompact(asset.avgBuyPrice)}</td>
      <td>${fmtIlsCompact(asset.currentPrice)}</td>
      <td style="color:${pnl>=0?'var(--green)':'var(--red)'}">${fmtIlsCompact(pnl)}</td>
    </tr>`;
  }).join('');
}

function renderIndexHeader(){
  const value=calcIndexPortfolioValue();
  const pnl=value-indexState.startCash;
  document.getElementById('idx-kpi-value').textContent=fmtIlsCompact(value);
  const plEl=document.getElementById('idx-kpi-pl');
  plEl.textContent=fmtIlsCompact(pnl);
  plEl.style.color=pnl>=0?'var(--green)':'var(--red)';
  document.getElementById('idx-kpi-cash').textContent=fmtIlsCompact(indexState.cash);
  const years=indexState.totalSkippedYears;
  document.getElementById('idx-time-summary').textContent=`התחלת עם: ${fmtIlsCompact(indexState.startCash)} · עכשיו: ${fmtIlsCompact(value)} · רווח: ${fmtIlsCompact(pnl)}${years>0?` · חלפו ${years} שנים`:''}`;
  const baseline=indexState.startCash*Math.pow(1.07,years);
  document.getElementById('idx-compare-summary').textContent=`אם הכסף היה גדל בקצב ממוצע של 7%: ${fmtIlsCompact(baseline)} · בפועל: ${fmtIlsCompact(value)}`;
}

function getEducationMessage(years,profit){
  if(years>=8) return 'ככל שנותנים יותר זמן - התנודות נהיות פחות משמעותיות.';
  if(profit>=0) return 'הזמן עבד לטובתך.';
  return 'בטווח קצר יש גם ירידות - זה חלק מהדרך.';
}

function renderIndexInvesting(){
  renderIndexHeader();
  renderIndexAssets();
  renderIndexHoldings();
  const profit=calcIndexPortfolioValue()-indexState.startCash;
  document.getElementById('idx-edu-msg').textContent=getEducationMessage(indexState.totalSkippedYears,profit);
}

function getAssetById(assetId){
  return indexState.assets.find(asset=>asset.id===assetId);
}

function openTradeModal(mode,assetId){
  indexModalState.open=true;
  indexModalState.mode=mode;
  indexModalState.assetId=assetId;
  const asset=getAssetById(assetId);
  if(!asset) return;
  document.getElementById('idx-modal-title').textContent=`${mode==='buy'?'קנייה':'מכירה'} · ${asset.name}`;
  document.getElementById('idx-modal-amount').value='1000';
  document.getElementById('index-trade-modal').classList.add('open');
  renderTradePreview();
}

function closeIndexModal(){
  indexModalState.open=false;
  document.getElementById('index-trade-modal').classList.remove('open');
}

function renderTradePreview(){
  if(!indexModalState.open) return;
  const asset=getAssetById(indexModalState.assetId);
  if(!asset) return;
  const amount=Math.max(0,parseFloat(document.getElementById('idx-modal-amount').value)||0);
  const units=asset.currentPrice>0?amount/asset.currentPrice:0;
  if(indexModalState.mode==='buy'){
    document.getElementById('idx-modal-preview').textContent=`בקנייה הזו יתקבלו בערך ${units.toFixed(2)} יחידות במחיר נוכחי.`;
    return;
  }
  const maxSellValue=asset.quantity*asset.currentPrice;
  const boundedAmount=Math.min(amount,maxSellValue);
  const sellUnits=asset.currentPrice>0?boundedAmount/asset.currentPrice:0;
  const tradePnl=(asset.currentPrice-asset.avgBuyPrice)*sellUnits;
  document.getElementById('idx-modal-preview').textContent=`מכירה של ${sellUnits.toFixed(2)} יחידות · רווח/הפסד משוער בעסקה: ${fmtIlsCompact(tradePnl)}.`;
}

function confirmTradeAction(){
  const asset=getAssetById(indexModalState.assetId);
  if(!asset) return;
  const amount=Math.max(0,parseFloat(document.getElementById('idx-modal-amount').value)||0);
  if(amount<=0) return;
  if(indexModalState.mode==='buy'){
    const spend=Math.min(amount,indexState.cash);
    if(spend<=0) return;
    const buyUnits=spend/asset.currentPrice;
    const oldCost=asset.avgBuyPrice*asset.quantity;
    asset.quantity+=buyUnits;
    asset.avgBuyPrice=(oldCost+spend)/asset.quantity;
    indexState.cash-=spend;
  }else{
    const maxSell=asset.quantity*asset.currentPrice;
    const sellAmount=Math.min(amount,maxSell);
    if(sellAmount<=0) return;
    const sellUnits=sellAmount/asset.currentPrice;
    asset.quantity=Math.max(0,asset.quantity-sellUnits);
    if(asset.quantity===0) asset.avgBuyPrice=0;
    indexState.cash+=sellAmount;
  }
  closeIndexModal();
  renderIndexInvesting();
}

function advanceAssetYear(asset){
  const shock=randRange(-asset.volatility,asset.volatility*1.1);
  const yearlyReturn=asset.drift+shock;
  const nextPrice=Math.max(5,asset.currentPrice*(1+yearlyReturn));
  asset.dayChange=yearlyReturn;
  asset.currentPrice=nextPrice;
  asset.history.push(nextPrice);
  if(asset.history.length>20) asset.history.shift();
}

function skipIndexYears(years){
  const safeYears=Math.max(1,years);
  for(let i=0;i<safeYears;i++){
    indexState.assets.forEach(advanceAssetYear);
  }
  indexState.totalSkippedYears+=safeYears;
  renderIndexInvesting();
}

function showNoTouchComparison(){
  const years=Math.max(1,indexState.totalSkippedYears||5);
  let simValue=indexState.startCash;
  let localSeed=98765;
  const nextRnd=()=>{
    localSeed=(localSeed*1664525+1013904223)>>>0;
    return localSeed/4294967296;
  };
  for(let i=0;i<years;i++){
    const move=0.065+((nextRnd()*2-1)*0.09);
    simValue=Math.max(1000,simValue*(1+move));
  }
  const current=calcIndexPortfolioValue();
  document.getElementById('idx-compare-summary').textContent=`ללא נגיעה בתיק לאורך ${years} שנים: ${fmtIlsCompact(simValue)} · התיק בפועל: ${fmtIlsCompact(current)}`;
}

/* ═══ COMPOUND PAGE ═════════════════════════════ */
function fmtIls(num){
  return '₪'+Math.round(num).toLocaleString('he-IL');
}

function simulateCompound(monthlySavings,totalMonths,annualReturn){
  let balance=0;
  let contributed=0;
  const monthlyReturn=(annualReturn/100)/12;
  const byMonth=[0];
  for(let m=1;m<=totalMonths;m++){
    balance=(balance+monthlySavings)*(1+monthlyReturn);
    contributed+=monthlySavings;
    byMonth.push(balance);
  }
  return{
    balance,
    contributed,
    growth:balance-contributed,
    byMonth
  };
}

function statusCopy(status){
  if(status==='struggling') return 'לפעמים החלטות קטנות לאורך זמן יוצרות מרווח נשימה.';
  if(status==='managing') return 'זה מה שאתה מרגיש לגבי המצב שלו היום.';
  if(status==='good') return 'גם מי שמסתדר יכול לפספס כוח גדול של זמן.';
  return 'גם במצב מצוין, לזמן יש כוח עצום כשמתמידים.';
}

function milestoneText(age,startAge){
  const diff=age-startAge;
  if(diff<=3) return 'פה זה עדיין נראה קטן.';
  if(diff<=8) return 'כאן מתחילים לראות שינוי.';
  if(diff<=16) return 'כאן הזמן כבר עובד חזק.';
  return 'פה ריבית דריבית באמת מורגשת.';
}

function renderMilestones(startAge,currentAge){
  const box=document.getElementById('cmp-milestones');
  const span=currentAge-startAge;
  const points=[startAge+3,startAge+8,startAge+16,currentAge].filter((v,i,a)=>v<=currentAge&&a.indexOf(v)===i);
  if(span<4){box.innerHTML='';return;}
  box.innerHTML=points.map(age=>`<span class="milestone">גיל ${age}: ${milestoneText(age,startAge)}</span>`).join('');
}

function recalcCompound(){
  const name=(document.getElementById('cmp-person-name').value||'אדם קרוב').trim()||'אדם קרוב';
  const currentAge=Math.max(14,parseInt(document.getElementById('cmp-current-age').value,10)||45);
  const income=parseFloat(document.getElementById('cmp-income').value)||15000;
  const savingsRate=parseFloat(document.getElementById('cmp-saving-rate').value)||0;
  const annualReturn=parseFloat(document.getElementById('cmp-return').value)||0;
  let startAge=parseInt(document.getElementById('cmp-start-age').value,10)||22;
  if(startAge>=currentAge){
    startAge=currentAge-1;
    document.getElementById('cmp-start-age').value=startAge;
  }
  document.getElementById('cmp-start-age').max=String(Math.max(15,currentAge-1));

  const monthlySavings=income*(savingsRate/100);
  const totalMonths=Math.max(0,(currentAge-startAge)*12);
  const withGrowth=simulateCompound(monthlySavings,totalMonths,annualReturn);
  const noGrowth=simulateCompound(monthlySavings,totalMonths,0);
  const gap=Math.max(0,withGrowth.balance-noGrowth.balance);

  compoundState.timelineBalances=withGrowth.byMonth;

  document.getElementById('cmp-income-label').textContent=fmtIls(income);
  document.getElementById('cmp-saving-rate-label').textContent=savingsRate+'%';
  document.getElementById('cmp-return-label').textContent=annualReturn+'%';
  document.getElementById('cmp-start-age-label').textContent=String(startAge);
  document.getElementById('cmp-saving-amount-label').textContent='כלומר: '+fmtIls(monthlySavings)+' בחודש';
  document.getElementById('cmp-title-name').textContent=name;
  document.getElementById('cmp-kpi-contrib').textContent=fmtIls(withGrowth.contributed);
  document.getElementById('cmp-kpi-final').textContent=fmtIls(withGrowth.balance);
  document.getElementById('cmp-kpi-growth').textContent=fmtIls(withGrowth.growth);
  document.getElementById('cmp-actual-value').textContent=fmtIls(noGrowth.balance);
  document.getElementById('cmp-potential-value').textContent=fmtIls(withGrowth.balance);
  document.getElementById('cmp-gap').textContent=fmtIls(gap);
  document.getElementById('cmp-potential-copy').textContent=`אם היה שם ${savingsRate}% בצד מגיל ${startAge}...`;
  document.getElementById('cmp-status-copy').textContent=statusCopy(compoundState.status);
  document.getElementById('cmp-story').textContent=`אם ${name} התחיל/ה בגיל ${startAge}, היום היו יכולים להיות לו ${fmtIls(withGrowth.balance)}. אבל זה לא מאוחר בשבילך.`;

  const timeline=document.getElementById('cmp-timeline-age');
  timeline.min=String(startAge);
  timeline.max=String(currentAge);
  const tAge=Math.min(currentAge,Math.max(startAge,parseInt(timeline.value,10)||startAge));
  timeline.value=String(tAge);
  const tMonths=(tAge-startAge)*12;
  const tBalance=compoundState.timelineBalances[tMonths]||0;
  document.getElementById('cmp-timeline-age-label').textContent='גיל '+tAge;
  document.getElementById('cmp-timeline-balance').textContent='בגיל הזה הסכום המשוער היה: '+fmtIls(tBalance)+' · '+milestoneText(tAge,startAge);
  renderMilestones(startAge,currentAge);

  const insightEl=document.getElementById('cmp-insight');
  let insight='';
  if(compoundState.lastSavingsRate<10&&savingsRate>=10){
    const oldBal=simulateCompound(income*(compoundState.lastSavingsRate/100),totalMonths,annualReturn).balance;
    insight=`רק השינוי הזה מוסיף בערך ${fmtIls(withGrowth.balance-oldBal)} עד היום.`;
  }else if(compoundState.lastStartAge-startAge>=4){
    const oldMonths=Math.max(0,(currentAge-compoundState.lastStartAge)*12);
    const oldBal=simulateCompound(monthlySavings,oldMonths,annualReturn).balance;
    insight=`התחלה ${compoundState.lastStartAge-startAge} שנים מוקדם יותר יוצרת פער של ${fmtIls(withGrowth.balance-oldBal)}.`;
  }else if(annualReturn===0&&withGrowth.balance>0){
    insight='בלי צמיחה הסכום נשאר קרוב להפקדות בלבד.';
  }
  if(savingsRate===0){
    insight='בלי לשים משהו בצד, הזמן לא יכול לעזור.';
  }
  if(insight){
    insightEl.style.display='block';
    insightEl.textContent='💥 '+insight;
  }else{
    insightEl.style.display='none';
  }
  compoundState.lastSavingsRate=savingsRate;
  compoundState.lastStartAge=startAge;

  const userAge=Math.max(14,parseInt(document.getElementById('cmp-user-age').value,10)||22);
  const userMonthly=Math.max(0,parseFloat(document.getElementById('cmp-user-monthly').value)||0);
  const targetAge=Math.max(userAge+1,compoundState.targetAge);
  const userMonths=(targetAge-userAge)*12;
  const userSim=simulateCompound(userMonthly,userMonths,annualReturn);
  document.getElementById('cmp-user-story').textContent=`אם תתחיל עכשיו עם ${fmtIls(userMonthly)} בחודש, בגיל ${targetAge} יכולים להיות לך ${fmtIls(userSim.balance)}.`;
}

/* ═══ INIT ═══════════════════════════════════════ */
document.getElementById('menu-toggle').addEventListener('click',()=>{
  document.body.classList.contains('menu-open')?closeMenu():openMenu();
});
document.getElementById('menu-overlay').addEventListener('click',closeMenu);
document.querySelectorAll('#hamburger-nav a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('hashchange',setRoute);
initA11y();
setRoute();
