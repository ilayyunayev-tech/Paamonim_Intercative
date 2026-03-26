(function(){
  const ENABLE_OPTIONAL_Q7=false;

  const AXES={
    peopleVsTasks:{minLabel:'משימות',maxLabel:'אנשים'},
    creationVsOrder:{minLabel:'סדר',maxLabel:'יצירה'},
    stabilityVsChange:{minLabel:'יציבות',maxLabel:'שינוי'},
    speedVsDepth:{minLabel:'עומק',maxLabel:'מהירות'}
  };

  const QUESTIONS=[
    {
      id:'q1',
      axis:'peopleVsTasks',
      prompt:'מה יותר כיף לך?',
      options:{A:'לדבר עם אנשים, להבין אותם',B:'לפתור בעיה לבד עד שהיא מסתדרת'},
      map:{A:100,B:0}
    },
    {
      id:'q2',
      axis:'creationVsOrder',
      prompt:'מה מרגיש לך יותר טבעי?',
      options:{A:'להמציא משהו חדש',B:'לקחת משהו קיים ולשפר אותו'},
      map:{A:100,B:0}
    },
    {
      id:'q3',
      axis:'stabilityVsChange',
      prompt:'איזה יום עבודה נשמע יותר טוב?',
      options:{A:'דומה לאתמול, ברור, רגוע',B:'כל יום שונה, קצת בלגן'},
      map:{A:0,B:100}
    },
    {
      id:'q4',
      axis:'speedVsDepth',
      prompt:'איך אתה עובד יותר טוב?',
      options:{A:'מהר, לנסות דברים',B:'לאט, לחשוב לעומק'},
      map:{A:100,B:0}
    },
    {
      id:'q5',
      axis:'speedVsDepth',
      prompt:'כשיש בעיה:',
      options:{A:'אני ישר מנסה משהו',B:'אני קודם חושב ומנתח'},
      map:{A:100,B:0}
    },
    {
      id:'q6',
      axis:'speedVsDepth',
      prompt:'מה נותן לך יותר סיפוק?',
      options:{A:'לראות תוצאה עכשיו',B:'לבנות משהו שלוקח זמן'},
      map:{A:100,B:0}
    },
    {
      id:'q7',
      axis:'peopleVsTasks',
      optional:true,
      prompt:'באיזה סביבה אתה מרגיש הכי טוב?',
      options:{A:'סביבה עם הרבה אנשים וקשרים',B:'סביבה שקטה שמאפשרת התרכזות'},
      map:{A:100,B:0}
    }
  ];

  const DIRECTIONS=[
    {
      id:'people-dynamic',
      title:'עבודה עם אנשים + דינמיקה',
      description:'אתה נהנה מאינטראקציה אנושית ולא נלחץ משינויים.',
      jobs:['מכירות','שירות לקוחות','הדרכה','גיוס'],
      ideal:{peopleVsTasks:[70,100],stabilityVsChange:[60,100],speedVsDepth:[45,100],creationVsOrder:null}
    },
    {
      id:'field-execution',
      title:'עבודה משתנה + שטח',
      description:'מתאים לסביבה בתנועה עם תוצאות שנראות מהר.',
      jobs:['הפקה','לוגיסטיקה','תפעול','נהיגה מסחרית'],
      ideal:{peopleVsTasks:[30,80],stabilityVsChange:[65,100],speedVsDepth:[65,100],creationVsOrder:[30,80]}
    },
    {
      id:'creative-ideas',
      title:'יצירה + רעיונות',
      description:'משיכה לרעיונות חדשים ולעבודה פחות שגרתית.',
      jobs:['תוכן','עיצוב','שיווק','יזמות'],
      ideal:{creationVsOrder:[70,100],stabilityVsChange:[55,100],speedVsDepth:[40,90],peopleVsTasks:[30,90]}
    },
    {
      id:'order-systems',
      title:'סדר + מערכות',
      description:'חוזקה בסידור תהליכים ושיפור עקבי של מה שכבר עובד.',
      jobs:['הנהלת חשבונות','מנהל עבודה','בקרת איכות','אדמיניסטרציה'],
      ideal:{creationVsOrder:[0,35],stabilityVsChange:[0,55],speedVsDepth:[20,70],peopleVsTasks:[20,70]}
    },
    {
      id:'deep-task',
      title:'חשיבה עמוקה + משימות',
      description:'מתאים לעבודה ממוקדת שדורשת ריכוז והתעמקות.',
      jobs:['תכנות','מחקר','אנליזה','עריכה'],
      ideal:{peopleVsTasks:[0,40],speedVsDepth:[0,45],creationVsOrder:[20,85],stabilityVsChange:[20,75]}
    },
    {
      id:'people-stable',
      title:'אנשים + יציבות',
      description:'עבודה עם אנשים במסגרת יציבה וברורה.',
      jobs:['חינוך','סיעוד','שירותי ציבור','תמיכה קהילתית'],
      ideal:{peopleVsTasks:[65,100],stabilityVsChange:[0,45],speedVsDepth:[20,75],creationVsOrder:[20,80]}
    },
    {
      id:'builder-operator',
      title:'ביצוע מהיר + ארגון',
      description:'שילוב של קצב גבוה עם יכולת ליישם מסודר.',
      jobs:['ניהול משמרת','תפעול מוקד','רכש','אופרציה דיגיטלית'],
      ideal:{speedVsDepth:[65,100],creationVsOrder:[0,55],stabilityVsChange:[35,85],peopleVsTasks:[30,80]}
    },
    {
      id:'product-planner',
      title:'תכנון + עומק',
      description:'חשיבה שיטתית ארוכת טווח לפני שמבצעים.',
      jobs:['אפיון מוצר','תכנון פרויקטים','ניתוח נתונים','PMO'],
      ideal:{speedVsDepth:[0,45],creationVsOrder:[25,90],stabilityVsChange:[20,75],peopleVsTasks:[30,80]}
    }
  ];

  const state={
    bootstrapped:false,
    started:false,
    step:0,
    answers:{},
    scores:{
      peopleVsTasks:50,
      creationVsOrder:50,
      stabilityVsChange:50,
      speedVsDepth:50
    }
  };

  function activeQuestions(){
    return QUESTIONS.filter(q=>!q.optional||ENABLE_OPTIONAL_Q7);
  }

  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

  function axisLabel(axis,val){
    const meta=AXES[axis];
    return val>=50?meta.maxLabel:meta.minLabel;
  }

  function updateScoresFromAnswers(){
    const qList=activeQuestions();
    Object.keys(state.scores).forEach(axis=>{
      const axisQuestions=qList.filter(q=>q.axis===axis);
      const selected=axisQuestions
        .map(q=>state.answers[q.id])
        .filter(Boolean)
        .map(ans=>{
          const q=axisQuestions.find(item=>item.id===ans.qid);
          return q.map[ans.value];
        });
      if(!selected.length){
        state.scores[axis]=50;
      }else{
        const avg=selected.reduce((s,v)=>s+v,0)/selected.length;
        state.scores[axis]=Math.round(clamp(avg,0,100));
      }
    });
  }

  function renderProgress(){
    const qList=activeQuestions();
    const total=qList.length;
    const current=state.step+1;
    const pct=Math.round((current/total)*100);
    const txt=document.getElementById('ikg-progress-text');
    const pctEl=document.getElementById('ikg-progress-percent');
    const fill=document.getElementById('ikg-progress-fill');
    const dots=document.getElementById('ikg-progress-dots');
    if(!txt||!pctEl||!fill||!dots) return;
    txt.textContent=`שאלה ${current} מתוך ${total}`;
    pctEl.textContent=`${pct}%`;
    fill.style.width=`${pct}%`;
    dots.innerHTML=qList.map((_,idx)=>`<span class="ikg-dot ${idx<=state.step?'active':''}"></span>`).join('');
    dots.style.gridTemplateColumns=`repeat(${total}, minmax(0, 1fr))`;
  }

  function selectAnswer(questionId,val){
    state.answers[questionId]={qid:questionId,value:val};
    renderQuestion();
    setTimeout(()=>{
      const qList=activeQuestions();
      if(state.step<qList.length-1){
        state.step+=1;
        renderQuestion();
        return;
      }
      showResults();
    },140);
  }

  function goPrevQuestion(){
    if(state.step<=0) return;
    state.step-=1;
    renderQuestion();
  }

  function renderQuestion(){
    const card=document.getElementById('ikg-question-card');
    const qList=activeQuestions();
    const q=qList[state.step];
    if(!card||!q) return;
    const selected=state.answers[q.id]?.value||'';
    card.innerHTML=`
      <h3>${q.prompt}</h3>
      <div class="ikg-question-nav">
        <button type="button" class="ikg-btn-ghost ikg-prev-btn" ${state.step===0?'disabled':''} id="ikg-prev-btn">לשאלה הקודמת</button>
      </div>
      <div class="ikg-options">
        <button type="button" class="ikg-opt-btn ${selected==='A'?'selected':''}" data-answer="A">
          <span class="ikg-opt-key">A</span>${q.options.A}
        </button>
        <button type="button" class="ikg-opt-btn ${selected==='B'?'selected':''}" data-answer="B">
          <span class="ikg-opt-key">B</span>${q.options.B}
        </button>
      </div>
    `;
    card.querySelectorAll('[data-answer]').forEach(btn=>{
      btn.addEventListener('click',()=>selectAnswer(q.id,btn.dataset.answer));
    });
    const prevBtn=document.getElementById('ikg-prev-btn');
    if(prevBtn) prevBtn.addEventListener('click',goPrevQuestion);
    renderProgress();
  }

  function getProfileSummaryItems(scores){
    return [
      scores.peopleVsTasks>=60
        ?{text:'אוהב לעבוד עם אנשים',jobs:['מכירות','הדרכה','שירות לקוחות']}
        :{text:'מעדיף לעבוד לבד',jobs:['תכנות','עריכה','אנליזה']},
      scores.creationVsOrder>=60
        ?{text:'נמשך לדברים חדשים',jobs:['תוכן','שיווק','עיצוב']}
        :{text:'אוהב לשפר מה שקיים',jobs:['בקרת איכות','תפעול','הנהלת חשבונות']},
      scores.stabilityVsChange>=60
        ?{text:'מסתדר עם חוסר ודאות',jobs:['הפקה','לוגיסטיקה','עבודה בשטח']}
        :{text:'אוהב יציבות',jobs:['חינוך','שירות ציבורי','אדמיניסטרציה']},
      scores.speedVsDepth>=60
        ?{text:'עושה מהר ומתקדם תוך כדי',jobs:['תפעול מוקד','ניהול משמרת','מכירות שטח']}
        :{text:'יודע לחשוב לעומק',jobs:['מחקר','ניתוח נתונים','אפיון מוצר']}
    ];
  }

  function getIkigaiBlocks(scores){
    const pull=scores.peopleVsTasks>=55
      ?(scores.stabilityVsChange>=55?'עבודה משתנה עם אנשים':'ללוות אנשים במסגרת יציבה')
      :(scores.speedVsDepth<45?'פתרון בעיות לעומק':'משימות ביצועיות עם אחריות');
    const strength=scores.creationVsOrder>=55?'חשיבה יצירתית':'ארגון ושיטתיות';
    const whereNeeded=scores.stabilityVsChange>=55?'צוותים דינמיים וחברות צומחות':'ארגונים יציבים ותהליכים ארוכי טווח';
    const paid=scores.peopleVsTasks>=55?'מכירות, שירות, הדרכה':'טכנולוגיה, אנליזה, תפעול';
    return[
      {cls:'ikg-b1',title:'🧡 מה מושך אותך',text:pull},
      {cls:'ikg-b2',title:'💪 במה אתה טוב (משוער)',text:strength},
      {cls:'ikg-b3',title:'🌍 איפה צריך את זה',text:whereNeeded},
      {cls:'ikg-b4',title:'💰 איפה משלמים על זה',text:paid}
    ];
  }

  function axisDistance(value,idealRange){
    if(!idealRange) return 0;
    const min=idealRange[0];
    const max=idealRange[1];
    if(value<min) return (min-value)/100;
    if(value>max) return (value-max)/100;
    return 0;
  }

  function rankDirections(scores){
    return DIRECTIONS.map(direction=>{
      const dPeople=axisDistance(scores.peopleVsTasks,direction.ideal.peopleVsTasks);
      const dCreation=axisDistance(scores.creationVsOrder,direction.ideal.creationVsOrder);
      const dStability=axisDistance(scores.stabilityVsChange,direction.ideal.stabilityVsChange);
      const dSpeed=axisDistance(scores.speedVsDepth,direction.ideal.speedVsDepth);
      const distance=dPeople+dCreation+dStability+dSpeed;
      return{...direction,distance};
    }).sort((a,b)=>a.distance-b.distance);
  }

  function buildInsight(scores){
    if(scores.peopleVsTasks>=60&&scores.stabilityVsChange>=60){
      return 'אתה בנוי לסביבות שבהן אנשים צריכים מישהו שיכול להסתגל מהר.';
    }
    if(scores.creationVsOrder>=60&&scores.speedVsDepth>=60){
      return 'אתה בנוי למקומות שצריכים מישהו שחושב יצירתי ולא מפחד לנסות.';
    }
    if(scores.speedVsDepth<45&&scores.creationVsOrder<50){
      return 'אתה בנוי לעבודה שצריכה דיוק, סדר ומחשבה לעומק.';
    }
    if(scores.peopleVsTasks<45&&scores.speedVsDepth<45){
      return 'אתה בנוי לתפקידים שמעריכים עומק, ריכוז ועבודה עצמאית.';
    }
    return 'אתה בנוי לסביבה שמשלבת למידה, התקדמות וצוות שאפשר לגדול בו.';
  }

  function renderResults(scores){
    const summaryEl=document.getElementById('ikg-profile-summary');
    const ikgEl=document.getElementById('ikg-ikigai-blocks');
    const dirEl=document.getElementById('ikg-directions');
    const slidersEl=document.getElementById('ikg-sliders');
    const insightEl=document.getElementById('ikg-insight');
    if(!summaryEl||!ikgEl||!dirEl||!slidersEl||!insightEl) return;

    const summaryItems=getProfileSummaryItems(scores);
    summaryEl.innerHTML=summaryItems.map(item=>`
      <div class="ikg-check-item">
        <div>✔ ${item.text}</div>
        <div class="ikg-check-jobs">מקצועות לדוגמה: ${item.jobs.join(' · ')}</div>
      </div>
    `).join('');

    const blocks=getIkigaiBlocks(scores);
    ikgEl.innerHTML=blocks.map(b=>`<article class="ikg-block ${b.cls}"><h4>${b.title}</h4><p>${b.text}</p></article>`).join('');

    const ranked=rankDirections(scores).slice(0,6);
    const directions=ranked.slice(0,Math.max(4,Math.min(6,ranked.length)));
    dirEl.innerHTML=directions.map(d=>`
      <article class="ikg-direction">
        <h4>${d.title}</h4>
        <p>${d.description}</p>
        <div class="ikg-jobs">דוגמאות תפקידים: ${d.jobs.join(' · ')}</div>
      </article>
    `).join('');

    slidersEl.innerHTML=Object.keys(AXES).map(axis=>{
      const meta=AXES[axis];
      const val=scores[axis];
      return`
        <div class="ikg-slider">
          <div class="ikg-slider-head">
            <span>${meta.maxLabel} ↔ ${meta.minLabel}</span>
            <span>${axisLabel(axis,val)} (${val})</span>
          </div>
          <input type="range" min="0" max="100" step="1" value="${val}" data-axis="${axis}"/>
          <div class="ikg-slider-scale"><span>${meta.minLabel}</span><span>${meta.maxLabel}</span></div>
        </div>
      `;
    }).join('');

    slidersEl.querySelectorAll('input[type="range"]').forEach(input=>{
      input.addEventListener('input',()=>{
        const axis=input.dataset.axis;
        const next={...scores,[axis]:parseInt(input.value,10)||0};
        renderResults(next);
      });
    });

    insightEl.textContent=buildInsight(scores);
  }

  function showStage(name){
    const names=['landing','quiz','results'];
    names.forEach(n=>{
      const el=document.getElementById(`ikg-stage-${n}`);
      if(el) el.hidden=n!==name;
    });
  }

  function startQuiz(){
    state.started=true;
    state.step=0;
    state.answers={};
    showStage('quiz');
    renderQuestion();
  }

  function showResults(){
    updateScoresFromAnswers();
    showStage('results');
    renderResults({...state.scores});
  }

  function restartFlow(){
    state.started=false;
    state.step=0;
    state.answers={};
    state.scores={
      peopleVsTasks:50,
      creationVsOrder:50,
      stabilityVsChange:50,
      speedVsDepth:50
    };
    showStage('landing');
  }

  function bootstrap(){
    if(state.bootstrapped) return;
    const root=document.getElementById('ikg-root');
    if(!root) return;
    const startBtn=document.getElementById('ikg-start-btn');
    const restartBtn=document.getElementById('ikg-restart-btn');
    if(startBtn) startBtn.addEventListener('click',startQuiz);
    if(restartBtn) restartBtn.addEventListener('click',startQuiz);
    showStage('landing');
    state.bootstrapped=true;
  }

  window.IkigaiOnboarding={bootstrap,restart:restartFlow};
})();
