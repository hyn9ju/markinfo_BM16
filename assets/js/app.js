/* ============================================================
   브랜드 스타일 매트릭스 16 — 애플리케이션
   데이터는 assets/data/bsm-data.js 의 window.BSM_DATA 에서 읽는다.
   ============================================================ */
if(!window.BSM_DATA){
  document.addEventListener('DOMContentLoaded',()=>{
    document.body.innerHTML='<div style="padding:60px 24px;font-family:sans-serif;max-width:620px;margin:0 auto">'
      +'<h2 style="margin-bottom:12px">데이터 파일을 불러오지 못했습니다</h2>'
      +'<p style="line-height:1.7;color:#5B6A70">assets/data/bsm-data.js 가 index.html 과 같은 구조로 함께 업로드됐는지 확인해 주세요.</p></div>';
  });
  throw new Error('BSM_DATA missing');
}
const BSM_DATA=window.BSM_DATA;

/* ================= DATA ================= */
/* ===== 폰트 통합 데이터 (560종 · 16유형 알고리즘) ===== */
const FONT_DB=BSM_DATA.FONT_DB;
const ALGO16=BSM_DATA.ALGO16;
const ALGO_META=BSM_DATA.ALGO_META;
const STY16=BSM_DATA.STY16;
const CLS_AXES={type:{label:'형태',opts:['고딕','바탕','손글씨','장식체','픽셀체','고전체','탈네모','캘리폰트','코딩체','영문']},mood:{label:'인상',opts:['진지한','부드러운','중립(본문)','귀여운','강한'],multi:true,max:2},weight:{label:'웨이트',opts:['얇은','보통','두꺼운']}};
const FONTMAP=BSM_DATA.FONTMAP;

const AXES = [
 {key:0,name:"무게감",easy:"어떤 이미지일까",L:{c:"G",t:"진지함",s:"격식 · 신뢰 · 정중"},R:{c:"L",t:"친근함",s:"편안 · 유머 · 다정"}},
 {key:1,name:"에너지",easy:"목소리를 얼마나 크게 낼까",L:{c:"B",t:"강렬함",s:"진하게 · 눈에 띄게"},R:{c:"S",t:"부드러움",s:"은은하게 · 섬세하게"}},
 {key:2,name:"설득 방식",easy:"마음으로 vs 근거로",L:{c:"E",t:"감성적",s:"이야기 · 온기"},R:{c:"R",t:"이성적",s:"숫자 · 정확함"}},
 {key:3,name:"스타일",easy:"어제의 멋 vs 오늘의 멋",L:{c:"C",t:"클래식",s:"전통 · 손맛 · 유산"},R:{c:"M",t:"모던",s:"동시대 · 깔끔 · 기술"}},
];

const QUESTIONS = [
 // 무게감
 {axis:0,q:"손님이 우리 브랜드를 처음 만났을 때, 어떤 인상이면 좋을까요?",A:{t:"믿음직하고 진중한 인상",side:"L"},B:{t:"편하고 친구 같은 인상",side:"R"}},
 {axis:0,q:"우리 일에서 '가벼운 농담'은 어느 쪽에 가깝나요?",A:{t:"있어서는 안 될 일 — 신뢰가 생명",side:"L"},B:{t:"오히려 매력 — 딱딱하면 손해",side:"R"}},
 {axis:0,q:"브랜드가 사람이라면, 손님에게 어떤 말투를 쓸까요?",A:{t:"정중한 존댓말",side:"L"},B:{t:"친근하게, 가끔은 장난도",side:"R"}},
 // 에너지
 {axis:1,q:"간판이나 첫 화면의 느낌, 어느 쪽이 우리다운가요?",A:{t:"멀리서도 확 띄게, 진하게",side:"L"},B:{t:"은은하고 편안하게",side:"R"}},
 {axis:1,q:"브랜드의 목소리 크기를 고른다면?",A:{t:"크고 자신 있게 외치는 쪽",side:"L"},B:{t:"낮고 차분하게 말하는 쪽",side:"R"}},
 {axis:1,q:"우리 브랜드를 운동에 비유한다면?",A:{t:"복싱 · 크로스핏 같은 강한 운동",side:"L"},B:{t:"요가 · 산책 같은 잔잔한 운동",side:"R"}},
 // 설득
 {axis:2,q:"손님의 마음을 얻는 우리의 무기는 무엇인가요?",A:{t:"이야기와 감동 — 마음이 먼저 움직이게",side:"L"},B:{t:"숫자와 근거 — 따져보면 우리가 맞게",side:"R"}},
 {axis:2,q:"광고 문구를 하나 고른다면?",A:{t:"“당신의 하루가 조금 더 따뜻해지도록”",side:"L"},B:{t:"“만족도 98%, 선택엔 이유가 있습니다”",side:"R"}},
 {axis:2,q:"손님이 우리를 선택하는 순간은 언제인가요?",A:{t:"마음이 움직였을 때",side:"L"},B:{t:"비교해 보니 합리적일 때",side:"R"}},
 // 시대감
 {axis:3,q:"매장(사무실) 인테리어를 고른다면?",A:{t:"원목과 앤티크, 손때 묻은 물건",side:"L"},B:{t:"metal과 화이트, 미니멀한 가구",side:"R"}},
 {axis:3,q:"브랜드 소개 첫 문장으로 어울리는 것은?",A:{t:"“1988년부터 한길을 걸어온…”",side:"L"},B:{t:"“지금까지 없던 새로운 방식…”",side:"R"}},
 {axis:3,q:"로고에 손글씨 느낌 vs 반듯한 느낌, 어느 쪽?",A:{t:"손맛이 느껴지는 쪽",side:"L"},B:{t:"반듯하고 깔끔한 쪽",side:"R"}},
];

/* 16 styles — hue/sat/bri: 허용 범위(가드레일), scheme: 기본 배색 방식 */
/* 스타일별 큐레이션 샘플 이미지 (관리자에서 등록 · 3칸) */
const STYLE_SAMPLES=BSM_DATA.STYLE_SAMPLES;
function styleSamples(code){
  const arr=STYLE_SAMPLES[code]||[];
  return [0,1,2].map(i=>arr[i]||null);
}
const STYLES=BSM_DATA.STYLES;

/* ================= 브랜드 MBTI 레이어 (v11.3) — 좌표 코드를 키로 스튜디오·로고·인테리어를 연결 ================= */
const BRAND_MBTI={
studios:{
 maison:{name:"Studio Maison",tone:"클래식 & 고급",intro:"시간이 흘러도 변하지 않는 가치를 디자인합니다.",desc:"절제된 아름다움과 신뢰를 바탕으로 고급 브랜드 정체성을 시각화합니다.",values:["품격","신뢰","전통"]},
 formvoid:{name:"Form & Void",tone:"모던 & 미니멀",intro:"덜어낼수록 본질이 보입니다.",desc:"군더더기 없는 구조적 디자인으로 브랜드의 본질을 간결하게 표현합니다.",values:["단순함","세련됨","본질"]},
 moss:{name:"Moss Lab",tone:"내추럴 & 웰니스",intro:"사람과 자연 사이, 조화로운 브랜드를 만듭니다.",desc:"편안하고 건강한 브랜드를 위한 자연친화적 디자인을 제안합니다.",values:["편안함","자연","조화"]},
 blush:{name:"Studio Blush",tone:"러블리 & 페미닌",intro:"사랑스러운 디테일이 브랜드를 감동으로 만듭니다.",desc:"감성적이고 섬세한 디자인으로 부드러운 브랜드 이미지를 구축합니다.",values:["부드러움","사랑스러움","감성"]},
 bang:{name:"Bang! Studio",tone:"에너지틱 & 액티브",intro:"에너지 넘치는 브랜드엔 박력 있는 디자인이 필요합니다.",desc:"강렬하고 역동적인 시각 언어로 브랜드의 힘을 전합니다.",values:["역동성","활력","열정"]},
 yellow:{name:"Yellow Noise",tone:"유니크 & 크리에이티브",intro:"세상에 없던 감각, 우리만의 언어로 만듭니다.",desc:"독창성과 실험정신으로 차별화된 브랜드 정체성을 설계합니다.",values:["창의성","실험성","독특함"]},
 nostalgia:{name:"Studio Nostalgia",tone:"레트로 & 빈티지",intro:"추억의 감성, 오늘의 브랜드로.",desc:"과거의 감성을 현대적으로 재해석한 따뜻한 브랜딩을 만듭니다.",values:["감성","향수","따뜻함"]},
 hello:{name:"Hello Hello Studio",tone:"프렌들리 & 웜",intro:"반가운 인사처럼 친근한 브랜드를 디자인합니다.",desc:"포근하고 유쾌한 디자인으로 누구에게나 다가가는 브랜딩을 지향합니다.",values:["친근함","다정함","일상성"]},
 proto:{name:"Proto Studio",tone:"테크 & 인더스트리얼",intro:"기술과 구조의 언어로 브랜드를 설계합니다.",desc:"기능성과 논리성을 강조하는 기술 기반 브랜드를 위한 디자인을 제공합니다.",values:["기술","실용성","논리"]},
 tonestudio:{name:"TONE Studio",tone:"젠더뉴트럴 & 인클루시브",intro:"모두를 위한 디자인, 누구도 배제하지 않는 브랜드.",desc:"다양성과 포용을 시각 언어로 풀어내는 균형 잡힌 디자인을 제공합니다.",values:["균형","포용","다양성"]}
},
byCode:{
 GBEC:{s1:"maison",s2:"nostalgia",interior:{ko:"럭셔리",en:"luxury",mat:["marble","glass"]}},
 GBEM:{s1:"yellow",s2:"proto",interior:{ko:"인더스트리얼",en:"industrial",mat:["concrete","metal"]}},
 GBRC:{s1:"maison",s2:"formvoid",interior:{ko:"클래식",en:"classic",mat:["marble","wood"]}},
 GBRM:{s1:"proto",s2:"formvoid",interior:{ko:"모던",en:"modern",mat:["metal","glass"]}},
 GSEC:{s1:"moss",s2:"maison",interior:{ko:"아시안",en:"Asian",mat:["wood","pottery"]}},
 GSEM:{s1:"moss",s2:"tonestudio",interior:{ko:"내추럴",en:"natural",mat:["wood","ceramic"]}},
 GSRC:{s1:"tonestudio",s2:"maison",interior:{ko:"클래식",en:"classic",mat:["marble","wood"]}},
 GSRM:{s1:"formvoid",s2:"proto",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}},
 LBEC:{s1:"nostalgia",s2:"hello",interior:{ko:"빈티지",en:"vintage",mat:["wood","synthetic leather"]}},
 LBEM:{s1:"yellow",s2:"bang",interior:{ko:"인더스트리얼 · 네온 연출",en:"industrial",mat:["concrete","metal"]}},
 LBRC:{s1:"bang",s2:"hello",interior:{ko:"모던 · 팀 컬러 적용",en:"modern",mat:["metal","glass"]}},
 LBRM:{s1:"bang",s2:"proto",interior:{ko:"모던",en:"modern",mat:["metal","glass"]}},
 LSEC:{s1:"hello",s2:"nostalgia",interior:{ko:"북유럽",en:"Scandinavian",mat:["wood","fabric"]}},
 LSEM:{s1:"blush",s2:"hello",interior:{ko:"북유럽 · 파스텔 적용",en:"Scandinavian",mat:["wood","fabric"]}},
 LSRC:{s1:"formvoid",s2:"tonestudio",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}},
 LSRM:{s1:"proto",s2:"formvoid",interior:{ko:"미니멀",en:"minimal",mat:["wood","glass"]}}
}/*__MBTI_END__*/};
/* 로고 타입 상세값 — 스튜디오별 고정값 대신 축 조합으로 결정 (16좌표 자동 차별화) */
function mbtiLogoDetails(code){
  const g=code[0],e=code[1],p=code[2],s=code[3]; // 무게감·에너지·설득·스타일
  const symbol=p==='R'?'abstract geometric':(e==='S'?'organic abstract':'dynamic abstract');
  return [
    ["워드마크", s==='C'?(p==='E'?'handwritten':'serif'):(p==='R'?'geometric sans':'rounded sans')],
    ["레터마크", s==='C'?'classic monogram':'geometric initial'],
    ["심볼", symbol],
    ["일러스트", e==='S'?'minimal line illustration':'bold flat illustration'],
    ["마스코트", g==='L'?'friendly animal character':'emblem-style animal'],
    ["복합형", 'text + '+symbol+' symbol']
  ];
}
function mbtiHTML(code){
  const bc=BRAND_MBTI.byCode[code]; if(!bc)return '';
  const s1=BRAND_MBTI.studios[bc.s1], s2=BRAND_MBTI.studios[bc.s2];
  const logos=mbtiLogoDetails(code);
  return `
  <div class="mbti-grid">
    <div class="mbti-studio mb1">
      <div class="mbti-rank">1순위 스튜디오</div>
      <div class="mbti-name">${s1.name} <span class="mbti-tone">${s1.tone}</span></div>
      <div class="mbti-quote">“${s1.intro}”</div>
      <div class="mbti-desc">${s1.desc}</div>
      <div class="mbti-values">${s1.values.map(v=>`<span class="mbti-chip">${v}</span>`).join('')}</div>
    </div>
    <div class="mbti-side">
      <div class="mbti-studio mb2">
        <div class="mbti-rank">이런 스튜디오도 어울려요</div>
        <div class="mbti-name">${s2.name} <span class="mbti-tone">${s2.tone}</span></div>
        <div class="mbti-quote sm">“${s2.intro}”</div>
      </div>
      <div class="mbti-studio mbint">
        <div class="mbti-rank">공간 · 인테리어 가이드</div>
        <div class="mbti-interior"><b>${bc.interior.ko}</b><span class="mbti-mat">${bc.interior.mat.join(' · ')}</span></div>
      </div>
    </div>
  </div>
  <div class="mbti-g-col mbfull">
    <div class="mbti-g-title">로고 타입 가이드 <span>타입을 고르면 이 상세값이 제작 방향이 돼요</span></div>
    <div class="mbti-logo-grid">${logos.map(([k,v])=>`<div class="mbti-logo-item"><b>${k}</b><span>${v}</span></div>`).join('')}</div>
  </div>`;
}

/* ================= 브랜드 MBTI 전체 가이드 모달 ================= */
function openMbtiGuide(){
  let m=$('mbtiModal');
  if(!m){
    m=document.createElement('div');m.id='mbtiModal';m.className='mbti-modal hidden';
    m.innerHTML=`<div class="mm-bg" onclick="closeMbtiGuide()"></div>
      <div class="mm-card" role="dialog" aria-modal="true" aria-label="브랜드 MBTI 전체 가이드">
        <div class="mm-head"><div><div class="mm-title">브랜드 MBTI 전체 가이드</div>
          <div class="mm-sub">16가지 스타일 좌표 × 추천 스튜디오 × 로고 · 인테리어 가이드 — 행을 누르면 해당 스타일 결과로 이동해요</div></div>
          <button class="mm-x" onclick="closeMbtiGuide()" aria-label="닫기">×</button></div>
        <div class="mm-body"><table class="mm-tbl"><thead><tr>
          <th>코드</th><th>스타일</th><th>1순위 스튜디오</th><th>2순위</th><th>워드마크</th><th>심볼</th><th>인테리어 · 소재</th>
        </tr></thead><tbody id="mmRows"></tbody></table></div>
      </div>`;
    document.body.appendChild(m);
  }
  $('mmRows').innerHTML=Object.keys(STYLES).map(code=>{
    const st=STYLES[code],bc=BRAND_MBTI.byCode[code];
    const s1=BRAND_MBTI.studios[bc.s1],s2=BRAND_MBTI.studios[bc.s2];
    const lg=mbtiLogoDetails(code);
    return `<tr data-code="${code}" class="${code===curCode?'cur':''}">
      <td class="mm-code">${code.split('').join('·')}</td>
      <td class="mm-adj">${st.adj}${st.en?`<i class="mm-en">${st.en}</i>`:''}<small>${st.sub}</small></td>
      <td><b>${s1.name}</b><br><span class="mm-en">${s1.tone}</span></td>
      <td class="mm-s2">${s2.name}</td>
      <td class="mm-en">${lg[0][1]}</td>
      <td class="mm-en">${lg[2][1]}</td>
      <td><b>${bc.interior.ko}</b><br><span class="mm-en">${bc.interior.mat.join(' · ')}</span></td></tr>`;
  }).join('');
  $('mmRows').querySelectorAll('tr[data-code]').forEach(tr=>tr.onclick=()=>{gotoStyle(tr.dataset.code);closeMbtiGuide();});
  m.classList.remove('hidden');
}
function closeMbtiGuide(){const m=$('mbtiModal');if(m)m.classList.add('hidden');}
function gotoStyle(code){
  [...code].forEach((ch,i)=>{sliders[i].value=AXES[i].L.c===ch?1:5;});
  showApp();render();
  setTimeout(()=>$('result').scrollIntoView({behavior:'smooth',block:'start'}),60);
}
document.addEventListener('keydown',e=>{
  const m=$('mbtiModal');
  if(e.key==='Escape'&&m&&!m.classList.contains('hidden')){closeMbtiGuide();e.stopImmediatePropagation();}
},true);

/* ================= 업종 코드 + 목업 (canvas 합성) ================= */
const BIZ_LIST=[["fnb","식음료"],["beauty","뷰티"],["fashion","패션"],["life","라이프"],["tech","테크"],["finance","금융"],["medical","의료"],["edu","교육"],["retail","유통"],["mfg","산업"],["estate","공간"],["pro","전문 서비스"],["media","콘텐츠"],["travel","여행"],["public","공공"]];
/* v0.16.0 업종 태그 — 아이콘과 호버 설명. 코드(첫 값)는 데이터 호환을 위해 유지한다. */
const BIZ_META={fnb:{icon:"🍽️",desc:"외식, 카페, 식품"},beauty:{icon:"💄",desc:"화장품, 헤어, 에스테틱"},fashion:{icon:"👗",desc:"의류, 잡화, 주얼리"},life:{icon:"🏡",desc:"가구, 반려동물, 취미"},tech:{icon:"💻",desc:"소프트웨어, 플랫폼, 전자기기"},finance:{icon:"💳",desc:"은행, 투자, 핀테크"},medical:{icon:"🏥",desc:"병원, 제약, 의료기기"},edu:{icon:"🎓",desc:"학교, 학원, 에듀테크"},retail:{icon:"🛍️",desc:"쇼핑몰, 편집숍, 물류"},mfg:{icon:"🏭",desc:"제조, 소재, 에너지"},estate:{icon:"🏢",desc:"건축, 인테리어, 부동산"},pro:{icon:"💼",desc:"법률, 회계, 컨설팅"},media:{icon:"🎬",desc:"미디어, 엔터테인먼트, 출판"},travel:{icon:"✈️",desc:"여행사, 숙박, 관광"},public:{icon:"🏛️",desc:"공공기관, 비영리, 협회"}};
const bizIcon=k=>(BIZ_META[bizNorm(k)]||{}).icon||"";
const bizDesc=k=>(BIZ_META[bizNorm(k)]||{}).desc||"";
/* v0.15.0: 미디어·콘텐츠 + 문화·예술 → 하나의 태그로 통합. 옛 코드(culture)는 media로 흡수한다. */
const BIZ_ALIAS={culture:'media'};
function bizNorm(b){return b?(BIZ_ALIAS[b]||b):b;}
const BIZ_SCENE={fnb:'sign',fashion:'sign',retail:'sign',travel:'sign',
 beauty:'package',life:'package',mfg:'package',medical:'package',
 tech:'screen',media:'screen',
 finance:'card',edu:'card',estate:'card',pro:'card',public:'card'};
/* 목업 이미지 라이브러리 — 이미지마다 로고 영역(비율)·합성 방식·적용 업종을 갖는다. 업종당 최대 3개 노출 */
const MOCKUP_IMGS=BSM_DATA.MOCKUP_IMGS;
const MOCK_BIZ_MAX=Infinity;   // v13.5: 업종별 목업 개수 제한 해제
function mocksForBiz(b){b=bizNorm(b);if(!b||b==='_online')return[];const l=Object.entries(MOCKUP_IMGS).filter(([,v])=>(v.biz||[]).map(bizNorm).includes(b));return MOCK_BIZ_MAX===Infinity?l:l.slice(0,MOCK_BIZ_MAX);}
let mockImgSel=null;   // 결과 화면에서 선택한 목업 이미지 id
let bizCode=null;
let bizRandom=null;   // v13.11: 공통(미선택)일 때 무작위로 보여줄 업종
function bizWithMocks(){return BIZ_LIST.map(([k])=>k).filter(k=>mocksForBiz(k).length);}
function rerollBizRandom(){
  const c=bizWithMocks();
  bizRandom=c.length?c[Math.floor(Math.random()*c.length)]:null;
  return bizRandom;
}
/* 실제로 그릴 업종 — 사용자가 고른 업종이 없으면 목업이 등록된 업종 중 하나를 무작위로 */
function effBiz(){
  if(bizCode)return bizCode;
  if(!bizRandom||!mocksForBiz(bizRandom).length)rerollBizRandom();
  return bizRandom;
}
const bizLabel=()=>{if(bizCode==='_online')return '온라인 · SNS';const f=BIZ_LIST.find(b=>b[0]===bizCode);return f?f[1]:'공통';};
function initBizChips(){
  const box=$('bizChips'); if(!box)return;
  box.innerHTML=BIZ_LIST.map(([k,l])=>`<button type="button" class="biz-chip${k===bizCode?' on':''}" data-biz="${k}" title="${bizDesc(k)}" aria-label="${l} — ${bizDesc(k)}"><span class="bc-ico" aria-hidden="true">${bizIcon(k)}</span><span class="bc-name">${l}</span><span class="bc-desc">${bizDesc(k)}</span></button>`).join('');
  box.querySelectorAll('.biz-chip').forEach(b=>b.onclick=()=>{
    bizCode=(bizCode===b.dataset.biz)?null:b.dataset.biz;mockImgSel=null;   // 다시 누르면 해제
    box.querySelectorAll('.biz-chip').forEach(c=>c.classList.toggle('on',c.dataset.biz===bizCode));
    const sel=$('mockBiz'); if(sel)sel.value=bizCode||'';
  });
}
function bindMockupUI(){
  const sel=$('mockBiz'); if(!sel)return;
  if(!sel.dataset.ready){
    sel.innerHTML='<option value="">공통 (업종 미선택)</option>'+BIZ_LIST.map(([k,l])=>`<option value="${k}">${bizIcon(k)} ${l}</option>`).join('')+'<option value="_online">온라인 · SNS 프로필</option>';
    sel.dataset.ready='1';
    sel.onchange=()=>{bizCode=sel.value||null;mockImgSel=null;
      const box=$('bizChips');if(box)box.querySelectorAll('.biz-chip').forEach(c=>c.classList.toggle('on',c.dataset.biz===bizCode));
      drawMockup();};
    $('mockRefresh').onclick=()=>{
      if(!bizCode){rerollBizRandom();mockImgSel=null;}   // v13.11: 공통이면 다른 업종을 무작위로
      drawMockup();
    };
    const ex=$('mockExport');
    if(ex)ex.onchange=()=>{const v=ex.value;ex.value='';if(v)exportMock(v);};
    const up=$('ulPick'), uf=$('ulFile');
    if(up)up.onclick=()=>uf.click();
    if(uf)uf.onchange=()=>{
      const f=uf.files&&uf.files[0]; uf.value='';
      if(!f)return;
      if(f.size>8*1024*1024){toast('8MB 이하 이미지를 올려 주세요');return;}
      const r=new FileReader();
      r.onload=()=>{
        const im=new Image();
        im.onload=()=>{
          userLogo={src:r.result,img:im,scale:(+$('ulScale').value||100)/100,name:f.name,
                    vector:/svg/i.test(f.type)||/\.svg$/i.test(f.name),pair:!!($('ulPair')&&$('ulPair').checked)};
          $('ulName').textContent=f.name;
          $('ulCtl').classList.remove('hidden');
          $('ulNote').textContent=userLogo.vector
            ? 'SVG를 올렸습니다 · 목업에는 이미지로 합성되며, 원본 SVG를 그대로 쓰시면 인쇄·간판에 가장 좋습니다'
            : '올린 로고는 이 화면에서만 쓰이고 저장되지 않습니다 · 새로고침하면 사라집니다';
          drawMockup(); toast('로고를 얹었어요 — 크기를 조절해 보세요');
        };
        im.onerror=()=>toast('이미지를 읽지 못했어요');
        im.src=r.result;
      };
      r.readAsDataURL(f);
    };
    const us=$('ulScale');
    if(us)us.oninput=()=>{if(userLogo){userLogo.scale=(+us.value||100)/100;drawMockup();}};
    const up2=$('ulPair');
    if(up2)up2.onchange=()=>{if(userLogo){userLogo.pair=up2.checked;drawMockup();}};
    // 스타일을 바꾸면 결과 영역이 다시 그려지므로, 이미 올려 둔 로고의 UI 상태를 복구한다
    if(userLogoActive()){
      $('ulName').textContent=userLogo.name||'내 로고';
      $('ulScale').value=Math.round((userLogo.scale||1)*100);
      if(up2)up2.checked=!!userLogo.pair;
      $('ulCtl').classList.remove('hidden');
      $('ulNote').textContent='올린 로고는 이 화면에서만 쓰이고 저장되지 않습니다 · 새로고침하면 사라집니다';
    }
    const uc=$('ulClear');
    if(uc)uc.onclick=()=>{userLogo=null;$('ulCtl').classList.add('hidden');
      $('ulNote').textContent='배경이 투명한 PNG를 권장합니다 · 올린 파일은 이 화면에서만 쓰이고 저장되지 않습니다';
      drawMockup();toast('로고를 내렸어요');};
  }
  sel.value=bizCode||'';
}
/* ---- v13: 크로마키 레이어 목업 ----
   초록(그린스크린) 영역을 투명 처리한 RGBA 레이어를 만들어,
   로고 - 레이어이미지 - 배경색(제품색) 3층 구조로 합성한다.
   원본은 초록이 포함된 이미지 그대로 저장(용량 절약), 키잉은 런타임 1회 후 캐시. */
const chromaCache=new Map();
function chromaKeyCanvas(im,cacheKey){
  if(cacheKey&&chromaCache.has(cacheKey))return chromaCache.get(cacheKey);
  const cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;
  const x=cv.getContext('2d',{willReadFrequently:true});
  x.drawImage(im,0,0);
  try{
    const d=x.getImageData(0,0,cv.width,cv.height),p=d.data;
    for(let i=0;i<p.length;i+=4){
      const r=p[i],g=p[i+1],b=p[i+2],m=Math.max(r,b);
      if(g>40&&g>m*1.15){
        const k=(g-m)/(g||1);
        if(k>0.25){p[i+3]=0;p[i+1]=m;}                                   // 완전 키잉
        else if(k>0.12){p[i+3]=Math.round(p[i+3]*(1-(k-0.12)/0.13));p[i+1]=m;} // 소프트 엣지
      }else if(g>m&&g>60){p[i+1]=Math.round((g+m)/2);}                    // 엣지 despill
    }
    x.putImageData(d,0,0);
  }catch(e){console.warn('크로마키 처리 실패(CORS 등) — 원본으로 표시',e);}
  if(cacheKey)chromaCache.set(cacheKey,cv);
  return cv;
}
/* 목업의 실효 제품색: 색상 잠금이면 고정색, 아니면 브랜드 팔레트 메인 컬러 */
function mockBgColor(v,pal){
  if(v&&v.bgLock&&v.bgColor)return v.bgColor;
  const i=Math.max(0,Math.min(4,+(v&&v.bgRole)||0));   // v13.11: 팔레트 5색 중 지정 톤
  return (pal&&pal[i]&&pal[i].hex)||(pal&&pal[0]&&pal[0].hex)||(v&&v.bgColor)||'#12B97E';
}
/* v13.11 상대 명도 대비비(WCAG) — 글자색이 배경에 묻히는 사고 방지 */
function relLum(hex){
  const n=parseInt(hex.slice(1),16);
  const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
  return 0.2126*f(n>>16)+0.7152*f((n>>8)&255)+0.0722*(n&255);
}
function contrastRatio(a,b){
  const l1=relLum(a),l2=relLum(b);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
}
/* 목업 글자색 결정: 지정 역할색을 쓰되 대비가 모자라면 자동 대비색으로 강제 교체.
   반환 {color, blend} — 지정색은 원색을 살리려 normal, 자동은 명암 합성. */
function mockInkColor(v,pal,bgHex){
  const auto=()=>{
    const light=yiq(bgHex)>150;
    return {color:light?'#22302C':'#FFFFFF', blend:light?'multiply':'screen'};
  };
  // v0.19.0: 종이류로 지정된 목업은 배경이 항상 흰색·밝은 색이라는 사실이 이미 확정돼 있으므로,
  // 표면 밝기 자동 판정(가끔 실패해 흰 바탕에 흰 글자가 얹히는 사고의 원인)이나 지정 역할색을
  // 거치지 않고 곧바로 밝은 배경용 어두운 글자로 고정한다.
  if(v&&v.isPaper)return {color:'#22302C', blend:'multiply'};
  const r=v&&v.inkRole;
  if(r===undefined||r===null||r==='auto')return auto();
  const i=Math.max(0,Math.min(4,+r));
  const hex=(pal&&pal[i]&&pal[i].hex)||null;
  if(!hex)return auto();
  if(contrastRatio(hex,bgHex)<2.2)return auto();   // 배경과 너무 비슷하면 대비색으로
  return {color:hex, blend:'normal'};
}
/* 이미지 목업(레이어 아님)의 로고 영역 평균 밝기 — 흰 봉투에 밝은 글자가 얹히는 사고 방지 */
function sampleAreaHex(x,px,py,pw,ph){
  try{
    const d=x.getImageData(Math.max(0,Math.round(px)),Math.max(0,Math.round(py)),
      Math.max(1,Math.round(pw)),Math.max(1,Math.round(ph))).data;
    let r=0,g=0,b=0,n=0;
    for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];n++;}
    if(!n)return '#FFFFFF';
    const h=v=>Math.round(v/n).toString(16).padStart(2,'0');
    return '#'+h(r)+h(g)+h(b);
  }catch(e){return '#FFFFFF';}
}
/* ============================================================
   v14.0 로고 워프 엔진 — 평면 / 기울기·원근 / 원통·곡면
   로고(텍스트 또는 업로드 이미지)를 투명 오프스크린에 그린 뒤,
   목적 형태로 변형해 한 장으로 합성한다. 합성 방식(multiply 등)은
   변형이 끝난 뒤 한 번만 적용해 삼각형 이음새가 겹쳐 어두워지는 것을 막는다.
   ============================================================ */
const WARP_DEFAULT={mode:'flat',yaw:0,pitch:0,roll:0,curve:45,bow:0,shade:35};
function warpOf(v){return Object.assign({},WARP_DEFAULT,(v&&v.warp)||{});}

/* 로고 내용을 투명 배경 캔버스로 렌더 (ss=슈퍼샘플 배율) */
function renderLogoLayer(o){
  const ss=o.ss||2;
  const W=Math.max(2,Math.round(o.w*ss)), H=Math.max(2,Math.round(o.h*ss));
  const cv=document.createElement('canvas'); cv.width=W; cv.height=H;
  const x=cv.getContext('2d');
  const al=o.align||'center';
  const drawText=(t,tx0,tw,fs0)=>{
    const fw=o.fw||700; let fs=fs0;
    const set=()=>x.font=`${fw} ${fs}px ${o.fam}, Pretendard, sans-serif`;
    set(); while(x.measureText(t).width>tw*.98&&fs>8){fs-=2;set();}
    x.fillStyle=o.color||'#111'; x.textBaseline='middle';
    if(al==='left'){x.textAlign='left';x.fillText(t,tx0,H/2);}
    else if(al==='right'){x.textAlign='right';x.fillText(t,tx0+tw,H/2);}
    else{x.textAlign='center';x.fillText(t,tx0+tw/2,H/2);}
  };
  if(o.img&&o.pair&&o.text){
    /* v0.17.0: 심볼(업로드 이미지) + 추천 로고타입(텍스트)을 한 박스 안에 나란히 배치 —
       업로드한 심볼이 이 스타일의 한글 워드마크와 어떻게 어울리는지 함께 볼 수 있게 한다 */
    const gap=H*.22, symW=Math.min(H,W*.4), textW=Math.max(1,W-symW-gap);
    const sc=Math.max(.2,Math.min(1.6,o.imgScale||1));
    const f=Math.min(symW/o.img.width,H/o.img.height)*sc;
    const dw=o.img.width*f, dh=o.img.height*f;
    let x0;
    if(al==='left')x0=0; else if(al==='right')x0=W-(symW+gap+textW); else x0=(W-(symW+gap+textW))/2;
    x.drawImage(o.img,x0+(symW-dw)/2,(H-dh)/2,dw,dh);
    drawText(o.text,x0+symW+gap,textW,Math.floor(H*.68));
  }else if(o.img){                              // 업로드 로고 이미지만
    const sc=Math.max(.2,Math.min(1.6,o.imgScale||1));
    const f=Math.min(W/o.img.width,H/o.img.height)*sc;
    const dw=o.img.width*f, dh=o.img.height*f;
    const dx=al==='left'?0:al==='right'?(W-dw):(W-dw)/2;
    x.drawImage(o.img,dx,(H-dh)/2,dw,dh);
    if(o.tint){                                // 단색 지정 시 실루엣으로 색 입힘
      x.globalCompositeOperation='source-in';
      x.fillStyle=o.tint; x.fillRect(0,0,W,H);
      x.globalCompositeOperation='source-over';
    }
  }else{                                       // 텍스트 로고만
    drawText(o.text||'',0,W,Math.floor(H*.75));
  }
  return cv;
}

/* 삼각형 텍스처 매핑 — 목적 삼각형을 아주 살짝 넓혀 이음새 실선을 없앤다 */
function texTri(x,img,s0,s1,s2,d0,d1,d2){
  const cx=(d0[0]+d1[0]+d2[0])/3, cy=(d0[1]+d1[1]+d2[1])/3, E=0.6;
  const ex=p=>{const vx=p[0]-cx,vy=p[1]-cy,l=Math.hypot(vx,vy)||1;return [p[0]+vx/l*E,p[1]+vy/l*E];};
  const e0=ex(d0),e1=ex(d1),e2=ex(d2);
  const den=s0[0]*(s2[1]-s1[1])-s1[0]*s2[1]+s2[0]*s1[1]+(s1[0]-s2[0])*s0[1];
  if(!den)return;
  const m11=-(s0[1]*(e2[0]-e1[0])-s1[1]*e2[0]+s2[1]*e1[0]+(s1[1]-s2[1])*e0[0])/den;
  const m12= (s1[1]*e2[1]+s0[1]*(e1[1]-e2[1])-s2[1]*e1[1]+(s2[1]-s1[1])*e0[1])/den;
  const m21= (s0[0]*(e2[0]-e1[0])-s1[0]*e2[0]+s2[0]*e1[0]+(s1[0]-s2[0])*e0[0])/den;
  const m22=-(s1[0]*e2[1]+s0[0]*(e1[1]-e2[1])-s2[0]*e1[1]+(s2[0]-s1[0])*e0[1])/den;
  const dx=(s0[0]*(s2[1]*e1[0]-s1[1]*e2[0])+s0[1]*(s1[0]*e2[0]-s2[0]*e1[0])+(s2[0]*s1[1]-s1[0]*s2[1])*e0[0])/den;
  const dy=(s0[0]*(s2[1]*e1[1]-s1[1]*e2[1])+s0[1]*(s1[0]*e2[1]-s2[0]*e1[1])+(s2[0]*s1[1]-s1[0]*s2[1])*e0[1])/den;
  x.save();
  x.beginPath();x.moveTo(e0[0],e0[1]);x.lineTo(e1[0],e1[1]);x.lineTo(e2[0],e2[1]);x.closePath();x.clip();
  x.transform(m11,m12,m21,m22,dx,dy);
  x.drawImage(img,0,0);
  x.restore();
}

/* 기울기·원근: 3D 회전 후 투영해 네 꼭짓점을 구한다 */
function tiltQuad(p,wp){
  const w=p.w,h=p.h,cx=p.x+w/2,cy=p.y+h/2;
  const ry=(wp.yaw||0)*Math.PI/180, rx=(wp.pitch||0)*Math.PI/180, rz=(wp.roll||0)*Math.PI/180;
  const f=Math.max(w,h)*2.6;
  return [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]].map(([X,Y])=>{
    let x1=X*Math.cos(rz)-Y*Math.sin(rz), y1=X*Math.sin(rz)+Y*Math.cos(rz);
    let x2=x1*Math.cos(ry), z2=-x1*Math.sin(ry);
    let y3=y1*Math.cos(rx)-z2*Math.sin(rx), z3=y1*Math.sin(rx)+z2*Math.cos(rx);
    const s=f/Math.max(f*0.35,(f-z3));
    return [cx+x2*s, cy+y3*s];
  });
}
/* 단위 정사각형 → 사각형 호모그래피 (원근 보정) */
function quadMap(q){
  const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const sx=x0-x1+x2-x3, sy=y0-y1+y2-y3;
  let a,b,c,d,e,f,g,hh;
  if(Math.abs(sx)<1e-9&&Math.abs(sy)<1e-9){
    a=x1-x0;b=x3-x0;c=x0;d=y1-y0;e=y3-y0;f=y0;g=0;hh=0;
  }else{
    const dx1=x1-x2,dx2=x3-x2,dy1=y1-y2,dy2=y3-y2;
    const den=dx1*dy2-dy1*dx2; if(!den)return null;
    g=(sx*dy2-sy*dx2)/den; hh=(dx1*sy-dy1*sx)/den;
    a=x1-x0+g*x1; b=x3-x0+hh*x3; c=x0;
    d=y1-y0+g*y1; e=y3-y0+hh*y3; f=y0;
  }
  return (u,v)=>{const w=g*u+hh*v+1; return [(a*u+b*v+c)/w,(d*u+e*v+f)/w];};
}

/* 변형된 로고를 임시 캔버스에 그려 반환 — {cv,ox,oy} */
function buildWarpedLogo(layer,p,wp){
  const pad=Math.ceil(Math.max(p.w,p.h)*0.6)+8;
  const bx=Math.floor(p.x-pad), by=Math.floor(p.y-pad);
  const bw=Math.ceil(p.w+pad*2), bh=Math.ceil(p.h+pad*2);
  const cv=document.createElement('canvas'); cv.width=Math.max(2,bw); cv.height=Math.max(2,bh);
  const x=cv.getContext('2d');
  const lp={x:p.x-bx,y:p.y-by,w:p.w,h:p.h};
  const mode=wp.mode||'flat';

  if(mode==='cyl'){
    const N=Math.max(24,Math.min(220,Math.round(p.w/3)));
    const k=Math.max(0,Math.min(100,wp.curve==null?45:wp.curve))/100;
    const arc=Math.max(0.001,k*Math.PI*0.92);              // 감싸는 각도
    const R=(lp.w/2)/Math.max(1e-6,Math.sin(arc/2));
    const bow=(wp.bow||0)/100*lp.h*0.5;
    const cx=lp.x+lp.w/2, sw=layer.width/N;
    const rz=(wp.roll||0)*Math.PI/180;
    x.save();
    if(rz){x.translate(lp.x+lp.w/2,lp.y+lp.h/2);x.rotate(rz);x.translate(-(lp.x+lp.w/2),-(lp.y+lp.h/2));}
    for(let i=0;i<N;i++){
      const u0=i/N,u1=(i+1)/N;
      const t0=(u0-.5)*arc, t1=(u1-.5)*arc;
      const X0=cx+R*Math.sin(t0), X1=cx+R*Math.sin(t1);
      const dw=X1-X0; if(dw<=0.01)continue;
      const tm=(t0+t1)/2;
      const yo=bow*(Math.cos(tm)-Math.cos(arc/2))/Math.max(1e-6,(1-Math.cos(arc/2)));
      x.drawImage(layer, i*sw,0,sw,layer.height, X0, lp.y+yo, dw+0.7, lp.h);
    }
    x.restore();
    const sh=Math.max(0,Math.min(80,wp.shade==null?35:wp.shade))/100;
    if(sh>0){                                              // 원통 음영 — 로고 픽셀에만
      x.globalCompositeOperation='source-atop';
      const g=x.createLinearGradient(lp.x,0,lp.x+lp.w,0);
      g.addColorStop(0,`rgba(0,0,0,${sh})`);
      g.addColorStop(.28,'rgba(0,0,0,0)');
      g.addColorStop(.72,'rgba(0,0,0,0)');
      g.addColorStop(1,`rgba(0,0,0,${sh})`);
      x.fillStyle=g; x.fillRect(lp.x-2,lp.y-2,lp.w+4,lp.h+4);
      x.globalCompositeOperation='source-over';
    }
  }else if(mode==='tilt'){
    const q=tiltQuad(lp,wp), map=quadMap(q);
    if(!map)return null;
    const N=18, LW=layer.width, LH=layer.height;
    for(let i=0;i<N;i++)for(let j=0;j<N;j++){
      const u0=i/N,u1=(i+1)/N,v0=j/N,v1=(j+1)/N;
      const A=map(u0,v0),B=map(u1,v0),C=map(u1,v1),D=map(u0,v1);
      const a=[u0*LW,v0*LH],b=[u1*LW,v0*LH],c=[u1*LW,v1*LH],d=[u0*LW,v1*LH];
      texTri(x,layer,a,b,c,A,B,C);
      texTri(x,layer,a,c,d,A,C,D);
    }
  }else{
    const rz=(wp.roll||0)*Math.PI/180;
    x.save();
    if(rz){x.translate(lp.x+lp.w/2,lp.y+lp.h/2);x.rotate(rz);x.translate(-(lp.x+lp.w/2),-(lp.y+lp.h/2));}
    x.drawImage(layer,lp.x,lp.y,lp.w,lp.h);
    x.restore();
  }
  return {cv,ox:bx,oy:by};
}

/* 최종 합성 — 변형이 끝난 한 장에만 blend를 적용한다 */
function compositeLogo(x,layer,p,wp,blend,alpha){
  const r=buildWarpedLogo(layer,p,warpOf({warp:wp}));
  if(!r)return;
  x.save();
  x.globalCompositeOperation=(blend==='normal'||!blend)?'source-over':blend;
  x.globalAlpha=alpha==null?.94:alpha;
  x.drawImage(r.cv,r.ox,r.oy);
  x.restore();
}
/* 변형된 로고 영역의 외곽선 (관리자 가이드용) */
function warpGuidePath(x,p,wp){
  const mode=wp.mode||'flat';
  x.beginPath();
  if(mode==='tilt'){
    const q=tiltQuad(p,wp);
    x.moveTo(q[0][0],q[0][1]);for(let i=1;i<4;i++)x.lineTo(q[i][0],q[i][1]);x.closePath();
  }else if(mode==='cyl'){
    const k=Math.max(0,Math.min(100,wp.curve==null?45:wp.curve))/100;
    const arc=Math.max(0.001,k*Math.PI*0.92), R=(p.w/2)/Math.max(1e-6,Math.sin(arc/2));
    const bow=(wp.bow||0)/100*p.h*0.5, cx=p.x+p.w/2, N=40;
    const yOf=t=>bow*(Math.cos(t)-Math.cos(arc/2))/Math.max(1e-6,(1-Math.cos(arc/2)));
    for(let i=0;i<=N;i++){const t=(i/N-.5)*arc;const px=cx+R*Math.sin(t);
      i?x.lineTo(px,p.y+yOf(t)):x.moveTo(px,p.y+yOf(t));}
    for(let i=N;i>=0;i--){const t=(i/N-.5)*arc;x.lineTo(cx+R*Math.sin(t),p.y+p.h+yOf(t));}
    x.closePath();
  }else{ x.rect(p.x,p.y,p.w,p.h); }
}

/* ---- v14.0 사용자 업로드 로고 (세션 한정 · 저장되지 않음) ---- */
let userLogo=null;   // {src, img, scale, name, vector}
function userLogoActive(){return !!(userLogo&&userLogo.img);}

/* ============================================================
   v14.0 내보내기 — PNG · JPG(목업 전체) / SVG(로고 단독)
   SVG는 간판·시트커팅용이므로 변형(원근·곡면) 없이 반듯한 원본을 낸다.
   ============================================================ */
function dl(name,href){const a=document.createElement('a');a.download=name;a.href=href;a.click();}
function safeName(){return (brandName||(curCode&&STYLES[curCode]?STYLES[curCode].adj:'브랜드')).replace(/[\\\/:*?"<>|]/g,'_');}
function curLogoFont(){
  const hf=(FONTMAP[curCode]&&FONTMAP[curCode].fonts)?FONTMAP[curCode].fonts[curFontIdx]:null;
  return {fam:hf?hf.family:'Pretendard', fw:hf?nearestWeight(hf.css,700):700, name:hf?hf.name:'Pretendard'};
}
/* 알파 채널 경계를 마칭스퀘어로 따서 닫힌 외곽선 목록을 만든다 */
function traceAlpha(cv,thresh){
  const w=cv.width,h=cv.height;
  const d=cv.getContext('2d').getImageData(0,0,w,h).data;
  const A=(x,y)=>(x<0||y<0||x>=w||y>=h)?0:d[(y*w+x)*4+3];
  const segs=[];
  const ip=(x1,y1,v1,x2,y2,v2)=>{const t=(thresh-v1)/((v2-v1)||1);return [x1+(x2-x1)*t,y1+(y2-y1)*t];};
  for(let y=-1;y<h;y++)for(let x=-1;x<w;x++){
    const v0=A(x,y),v1=A(x+1,y),v2=A(x+1,y+1),v3=A(x,y+1);
    const id=(v0>=thresh?8:0)|(v1>=thresh?4:0)|(v2>=thresh?2:0)|(v3>=thresh?1:0);
    if(id===0||id===15)continue;
    const T=()=>ip(x,y,v0,x+1,y,v1), R=()=>ip(x+1,y,v1,x+1,y+1,v2),
          B=()=>ip(x+1,y+1,v2,x,y+1,v3), L=()=>ip(x,y+1,v3,x,y,v0);
    const put=(a,b)=>segs.push([a,b]);
    switch(id){
      case 1: put(L(),B()); break;
      case 2: put(B(),R()); break;
      case 3: put(L(),R()); break;
      case 4: put(R(),T()); break;
      case 5: put(L(),T()); put(R(),B()); break;
      case 6: put(B(),T()); break;
      case 7: put(L(),T()); break;
      case 8: put(T(),L()); break;
      case 9: put(T(),B()); break;
      case 10: put(T(),R()); put(B(),L()); break;
      case 11: put(T(),R()); break;
      case 12: put(R(),L()); break;
      case 13: put(R(),B()); break;
      case 14: put(B(),L()); break;
    }
  }
  // 끝점을 격자에 반올림해 이어 붙인다
  const key=p=>Math.round(p[0]*8)+','+Math.round(p[1]*8);
  const from=new Map();
  segs.forEach(sg=>{const k=key(sg[0]);(from.get(k)||from.set(k,[]).get(k)).push(sg);});
  const used=new Set(), loops=[];
  segs.forEach((sg,i)=>{
    if(used.has(sg))return;
    const loop=[sg[0]]; let cur=sg, guard=0;
    while(cur&&!used.has(cur)&&guard++<200000){
      used.add(cur); loop.push(cur[1]);
      const nx=(from.get(key(cur[1]))||[]).find(t=>!used.has(t));
      cur=nx;
    }
    if(loop.length>3)loops.push(loop);
  });
  return loops;
}
/* 더글라스–포이커 단순화 */
function rdp(pts,eps){
  if(pts.length<3)return pts;
  const d=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=dx*dx+dy*dy;
    if(!L)return Math.hypot(p[0]-a[0],p[1]-a[1]);
    let t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/L; t=Math.max(0,Math.min(1,t));
    return Math.hypot(p[0]-(a[0]+t*dx),p[1]-(a[1]+t*dy));};
  const rec=(s,e)=>{
    let mi=-1,md=0;
    for(let i=s+1;i<e;i++){const dd=d(pts[i],pts[s],pts[e]);if(dd>md){md=dd;mi=i;}}
    if(md>eps){return rec(s,mi).concat(rec(mi,e).slice(1));}
    return [pts[s],pts[e]];
  };
  return rec(0,pts.length-1);
}
/* v0.17.0: 곡선이 직선 조각으로 끊겨 보이던 문제 — 단순화된 점들을 이어 SVG 패스를 만들 때
   급격히 꺾이는 지점(진짜 모서리)만 직선(L)으로 남기고, 완만하게 휘는 지점은
   카트뮬-롬 스플라인을 3차 베지어(C)로 바꿔 매끄러운 곡선으로 잇는다. */
function pathFromPoints(pts){
  const r2=v=>Math.round(v*100)/100;
  const n=pts.length;
  if(n<4)return pts.map((p,i)=>(i?'L':'')+r2(p[0])+' '+r2(p[1])).join(' ');
  const turnAngle=(a,b,c)=>{                       // b에서 꺾이는 각도 — 180=직선, 작을수록 급함
    const v1=[a[0]-b[0],a[1]-b[1]], v2=[c[0]-b[0],c[1]-b[1]];
    const m1=Math.hypot(v1[0],v1[1]), m2=Math.hypot(v2[0],v2[1]);
    if(!m1||!m2)return 180;
    const cos=Math.max(-1,Math.min(1,(v1[0]*v2[0]+v1[1]*v2[1])/(m1*m2)));
    return Math.acos(cos)*180/Math.PI;
  };
  const SMOOTH_MIN=150;   // 이 각도 이상(완만함)이면 곡선으로, 더 급하게 꺾이면 모서리로 보고 직선 유지
  let d='';
  for(let i=0;i<n;i++){
    const p0=pts[(i-1+n)%n], p1=pts[i], p2=pts[(i+1)%n], p3=pts[(i+2)%n];
    if(turnAngle(p0,p1,p2)>=SMOOTH_MIN){
      const c1x=p1[0]+(p2[0]-p0[0])/6, c1y=p1[1]+(p2[1]-p0[1])/6;
      const c2x=p2[0]-(p3[0]-p1[0])/6, c2y=p2[1]-(p3[1]-p1[1])/6;
      d+=`C${r2(c1x)} ${r2(c1y)},${r2(c2x)} ${r2(c2y)},${r2(p2[0])} ${r2(p2[1])} `;
    }else{
      d+=`L${r2(p2[0])} ${r2(p2[1])} `;
    }
  }
  return d;
}
/* 로고 원본(변형 없음)을 고해상도 투명 캔버스로 렌더 후 여백을 잘라낸다 */
function logoArtwork(color){
  const BW=1800,BH=560;
  const f=curLogoFont();
  const cv=document.createElement('canvas');cv.width=BW;cv.height=BH;
  const x=cv.getContext('2d');
  if(userLogoActive()){
    const im=userLogo.img, sc=Math.min(BW/im.width,BH/im.height)*0.94;
    x.drawImage(im,(BW-im.width*sc)/2,(BH-im.height*sc)/2,im.width*sc,im.height*sc);
  }else{
    const t=brandName||(STYLES[curCode]?STYLES[curCode].adj:'BRAND');
    let fs=Math.floor(BH*0.62);
    const set=()=>x.font=`${f.fw} ${fs}px ${f.fam}, Pretendard, sans-serif`;
    set(); while(x.measureText(t).width>BW*0.94&&fs>16){fs-=4;set();}
    x.fillStyle=color;x.textAlign='center';x.textBaseline='middle';
    x.fillText(t,BW/2,BH/2);
  }
  // 알파 경계로 트림
  const d=x.getImageData(0,0,BW,BH).data;
  let x0=BW,y0=BH,x1=0,y1=0,any=false;
  for(let y=0;y<BH;y++)for(let xx=0;xx<BW;xx++){
    if(d[(y*BW+xx)*4+3]>8){any=true;if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(y<y0)y0=y;if(y>y1)y1=y;}
  }
  if(!any)return null;
  const pad=6;
  x0=Math.max(0,x0-pad);y0=Math.max(0,y0-pad);x1=Math.min(BW-1,x1+pad);y1=Math.min(BH-1,y1+pad);
  const tw=x1-x0+1, th=y1-y0+1;
  const out=document.createElement('canvas');out.width=tw;out.height=th;
  out.getContext('2d').drawImage(cv,x0,y0,tw,th,0,0,tw,th);
  return {cv:out,w:tw,h:th,font:f};
}
function exportMock(kind){
  const cv=$('mockCanvas');
  const base=safeName()+'_'+(curCode||'BSM');
  if(kind==='png'||kind==='jpg'){
    if(!cv){toast('목업 화면을 먼저 열어 주세요');return;}
    if(kind==='png'){dl(base+'_목업.png',cv.toDataURL('image/png'));toast('PNG로 저장했어요');return;}
    const t=document.createElement('canvas');t.width=cv.width;t.height=cv.height;
    const tx=t.getContext('2d');tx.fillStyle='#FFFFFF';tx.fillRect(0,0,t.width,t.height);tx.drawImage(cv,0,0);
    dl(base+'_목업.jpg',t.toDataURL('image/jpeg',0.92));toast('JPG로 저장했어요');return;
  }
  const color=(curPal&&curPal[0]&&curPal[0].hex)||'#111111';
  if(kind==='svg-text'){
    if(userLogoActive()){
      // 업로드 이미지는 글자가 아니므로 텍스트 SVG를 만들 수 없다 — 이미지를 담고 한계를 명시
      const im=userLogo.img, W=im.width, H=im.height;
      const svg=`<?xml version="1.0" encoding="UTF-8"?>
<!-- 마크인포 브랜드 스타일 매트릭스 16 · ${curCode} -->
<!-- 주의: 업로드한 비트맵 로고가 그대로 들어 있습니다. 벡터가 아니므로 확대하면 깨지고,
     시트 커팅·간판 제작에는 쓸 수 없습니다. 원본 AI/SVG 파일을 사용하세요. -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <desc>업로드 이미지 포함 · 벡터 아님</desc>
  <image x="0" y="0" width="${W}" height="${H}" xlink:href="${userLogo.src}"/>
</svg>`;
      dl(base+'_로고(이미지포함).svg','data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
      alert('업로드한 로고는 비트맵 이미지입니다.\n\nSVG 안에 이미지를 그대로 담아 저장했지만 벡터가 아니므로 확대하면 깨지고, 시트 커팅·간판 제작에는 쓸 수 없습니다. 간판용으로는 로고 원본 AI·SVG 파일을 사용해 주세요.');
      return;
    }
    const f=curLogoFont();
    const t=brandName||(STYLES[curCode]?STYLES[curCode].adj:'BRAND');
    const mc=document.createElement('canvas').getContext('2d');
    const fs=200; mc.font=`${f.fw} ${fs}px ${f.fam}, Pretendard, sans-serif`;
    const tw=Math.ceil(mc.measureText(t).width)+40, th=Math.ceil(fs*1.45);
    const fam=(f.fam||'').replace(/["']/g,'');
    const svg=`<?xml version="1.0" encoding="UTF-8"?>
<!-- 마크인포 브랜드 스타일 매트릭스 16 · ${curCode} · 글꼴 ${f.name} -->
<!-- 이 파일의 글자는 텍스트로 남아 있습니다. 여는 컴퓨터에 같은 글꼴이 없으면 다른 모양으로 보입니다.
     간판·시트 커팅용으로는 [SVG · 로고 윤곽선]을 쓰거나, 일러스트레이터에서 윤곽선 만들기(Ctrl+Shift+O)를 하세요. -->
<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}" viewBox="0 0 ${tw} ${th}">
  <text x="${tw/2}" y="${th/2}" text-anchor="middle" dominant-baseline="central"
        font-family="${fam}, Pretendard, sans-serif" font-size="${fs}" font-weight="${f.fw}" fill="${color}">${t.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text>
</svg>`;
    dl(base+'_로고(텍스트).svg','data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
    toast('텍스트 SVG로 저장했어요 · 같은 글꼴이 있어야 제대로 보입니다');
    return;
  }
  if(kind==='svg-outline'){
    const art=logoArtwork(color);
    if(!art){toast('내보낼 로고가 없어요');return;}
    const loops=traceAlpha(art.cv,128);
    if(!loops.length){toast('윤곽선을 찾지 못했어요');return;}
    const r2=v=>Math.round(v*100)/100;
    const d=loops.map(lp=>{
      const sp=rdp(lp,0.7);
      // v0.17.0: 직선(L)만 쓰던 방식 → 완만한 굴곡은 3차 베지어(C)로, 급한 모서리만 직선으로
      return 'M'+r2(sp[0][0])+' '+r2(sp[0][1])+pathFromPoints(sp)+'Z';
    }).join(' ');
    const note=userLogoActive()
      ? `<!-- 주의: 업로드 이미지의 '실루엣'만 벡터로 딴 것입니다. 색 구분과 세밀한 디테일은 사라집니다.
     정확한 간판 제작에는 로고 원본 AI·SVG 파일을 사용하세요. -->`
      : `<!-- 글자를 윤곽선(패스)으로 변환했습니다. 글꼴 설치 없이 어디서나 같은 모양으로 열립니다. -->`;
    const svg=`<?xml version="1.0" encoding="UTF-8"?>
<!-- 마크인포 브랜드 스타일 매트릭스 16 · ${curCode} · 글꼴 ${art.font.name} -->
${note}
<svg xmlns="http://www.w3.org/2000/svg" width="${art.w}" height="${art.h}" viewBox="0 0 ${art.w} ${art.h}">
  <path fill="${color}" fill-rule="evenodd" d="${d}"/>
</svg>`;
    dl(base+'_로고(윤곽선).svg','data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
    if(userLogoActive())alert('업로드한 로고의 실루엣만 벡터로 변환했습니다.\n\n색 구분과 세밀한 디테일은 사라집니다. 정확한 간판 제작에는 로고 원본 AI·SVG 파일을 사용해 주세요.');
    else toast('윤곽선 SVG로 저장했어요 · 글꼴 없이도 열립니다');
    return;
  }
}

function renderMockThumbs(avail,selId){
  const box=$('mockThumbs'); if(!box)return;
  if(!avail.length){box.innerHTML=bizCode==='_online'?'':'<span class="mock-none">등록된 목업 이미지가 없어요 · 관리자 → 업종 목업에서 추가할 수 있어요</span>';return;}
  if(!bizCode&&bizRandom){
    const lb=(BIZ_LIST.find(b=>b[0]===bizRandom)||[,bizRandom])[1];
    box.innerHTML=`<span class="mock-none" style="width:100%">업종을 고르지 않아 <b>${lb}</b> 목업을 무작위로 보여주고 있어요 · 「↺ 다시 그리기」로 다른 업종을 볼 수 있어요</span>`;
  }else{box.innerHTML='';}
  box.innerHTML+=avail.map(([id,v])=>`<button type="button" class="mock-thumb${id===selId?' on':''}" data-mid="${id}" title="${v.name||id}">
    <img src="${v.src}" alt="" data-thumb="${id}"><span>${v.name||id}</span></button>`).join('');
  box.querySelectorAll('.mock-thumb').forEach(b=>b.onclick=()=>{mockImgSel=b.dataset.mid;drawMockup();});
  // v13.1: 레이어 목업 썸네일은 배경색이 합성된 미리보기로 교체
  avail.forEach(([id,v])=>{
    if(!(v.layerMode||v.chroma))return;
    const el=box.querySelector(`img[data-thumb="${id}"]`); if(!el)return;
    const bgc=mockBgColor(v,curPal);
    const srcs=(v.layers&&v.layers.some(Boolean))?v.layers.slice(0,3):[v.src];
    Promise.all(srcs.map(u=>u?new Promise(res=>{
      const im=new Image();im.crossOrigin='anonymous';
      im.onload=()=>res(im);im.onerror=()=>res(null);im.src=u;
    }):Promise.resolve(null))).then(imgs=>{
      const ref=imgs.find(Boolean); if(!ref)return;
      const tw=160,th=Math.round(160*ref.height/ref.width);
      const cv=document.createElement('canvas');cv.width=tw;cv.height=th;
      const tx=cv.getContext('2d');
      tx.fillStyle=bgc;tx.fillRect(0,0,tw,th);
      imgs.forEach(im=>{if(!im)return;
        tx.drawImage((v.chroma&&!v.layerMode)?chromaKeyCanvas(im,id):im,0,0,tw,th);});
      try{el.src=cv.toDataURL('image/png');}catch(e){}
    });
  });
}
function fitFont(x,text,fam,maxW,base,weight){
  let s=base; const w=weight||700;
  do{x.font=`${w} ${s}px ${fam}, Pretendard, sans-serif`;if(x.measureText(text).width<=maxW)break;s-=4;}while(s>22);
  return s;
}
async function drawMockup(){
  const cv=$('mockCanvas'); if(!cv||!curCode||!curPal)return;
  const st=STYLES[curCode];
  const W=1000,H=750; cv.width=W; cv.height=H;   // 4:3
  const x=cv.getContext('2d');
  const c={main:curPal[0].hex,sub:curPal[1].hex,acc:curPal[2].hex,bg:curPal[3].hex,ink:curPal[4].hex};
  const name=brandName||st.adj;
  const hf=(FONTMAP[curCode]?.fonts||[])[curFontIdx];
  const fam=hf?hf.family:'Pretendard';
  const fw=hf?nearestWeight(hf.css,700):700;   // 선언 웨이트 중 700에 가장 가까운 것
  try{await Promise.race([document.fonts.load(`${fw} 90px ${fam}`,'가나다'),new Promise(r=>setTimeout(r,900))]);}catch(e){}
  const onC=h=>yiq(h)>150?'#22302C':'#FFFFFF';
  const rr=(px,py,pw,ph,r)=>{x.beginPath();if(x.roundRect)x.roundRect(px,py,pw,ph,r);else x.rect(px,py,pw,ph);};
  const eb=effBiz();   // v13.11: 공통(미선택)이면 목업이 있는 업종 중 무작위
  const scene=eb==='_online'?'online':(bizCode?(BIZ_SCENE[bizCode]||'sign'):'none');
  const avail=mocksForBiz(eb);
  if(mockImgSel&&!avail.find(([id])=>id===mockImgSel))mockImgSel=null;
  const pick=avail.find(([id])=>id===mockImgSel)||avail[0]||null;
  const base=pick?pick[1]:null;
  renderMockThumbs(avail,pick?pick[0]:null);

  if(scene==='online'){ /* 온라인 · SNS 프로필 목업 */
    x.fillStyle='#F2F3F5';x.fillRect(0,0,W,H);
    x.fillStyle='#FFFFFF';rr(240,34,520,H-68,26);x.fill();
    x.strokeStyle='rgba(0,0,0,.08)';x.lineWidth=1.5;rr(240,34,520,H-68,26);x.stroke();
    x.fillStyle='#FFFFFF';x.fillRect(242,36,516,54);
    x.fillStyle=c.ink;x.font='800 17px Pretendard, sans-serif';x.textAlign='center';
    const handle='@'+(name.replace(/\s+/g,'').toLowerCase().slice(0,14)||'brand');
    x.fillText(handle,W/2,70);x.textAlign='left';
    x.strokeStyle='rgba(0,0,0,.07)';x.beginPath();x.moveTo(242,92);x.lineTo(758,92);x.stroke();
    x.fillStyle=c.main;x.beginPath();x.arc(340,168,52,0,Math.PI*2);x.fill();   // 프로필 원 = 로고
    x.strokeStyle=c.acc;x.lineWidth=3.5;x.beginPath();x.arc(340,168,60,0,Math.PI*2);x.stroke();
    x.fillStyle=onC(c.main);
    const initial=name.trim().slice(0,2);
    let ifs=44;x.font=`${fw} ${ifs}px ${fam}, Pretendard, sans-serif`;
    while(x.measureText(initial).width>86&&ifs>18){ifs-=3;x.font=`${fw} ${ifs}px ${fam}, Pretendard, sans-serif`;}
    x.textAlign='center';x.textBaseline='middle';x.fillText(initial,340,170);x.textBaseline='alphabetic';
    x.fillStyle=c.ink;x.font='800 20px Pretendard, sans-serif';
    [['128','게시물',478],['5.4천','팔로워',588],['312','팔로잉',698]].forEach(([n,l,px])=>{
      x.fillText(n,px,158);x.font='600 12.5px Pretendard, sans-serif';x.globalAlpha=.62;
      x.fillText(l,px,180);x.globalAlpha=1;x.font='800 20px Pretendard, sans-serif';});
    x.textAlign='left';
    const nfs=fitFont(x,name,fam,300,26,fw);
    x.fillStyle=c.ink;x.fillText(name,280,264+nfs*.1);
    x.font='500 14px Pretendard, sans-serif';x.globalAlpha=.66;
    x.fillText(st.sub,280,292);x.globalAlpha=1;
    x.fillStyle=c.acc;rr(280,312,200,40,10);x.fill();
    x.fillStyle=onC(c.acc);x.font='800 15px Pretendard, sans-serif';x.textAlign='center';
    x.fillText('팔로우',380,338);x.textAlign='left';
    x.fillStyle=c.sub;x.globalAlpha=.9;rr(494,312,110,40,10);x.fill();x.globalAlpha=1;
    x.fillStyle=onC(c.sub);x.font='700 14px Pretendard, sans-serif';x.textAlign='center';
    x.fillText('메시지',549,338);x.textAlign='left';
    const gs=(520-8)/3, gy=378;
    [c.main,c.sub,c.acc,c.bg,c.main,c.sub].forEach((hex,i)=>{
      const gx=240+(i%3)*(gs+4)+2, gyy=gy+Math.floor(i/3)*(gs*0.55+4);
      x.fillStyle=hex;x.globalAlpha=i>2?.78:1;x.fillRect(gx,gyy,gs,gs*0.55);x.globalAlpha=1;});
  }
  else if(base&&(base.src||(base.layers||[]).some(Boolean))){ /* 목업 라이브러리 이미지 */
    const isLayer=!!(base.layerMode||base.chroma);
    const bgc=isLayer?mockBgColor(base,curPal):null;   // 배경색: 잠금이면 고정색, 아니면 팔레트 메인
    const pr=base.logo||{x:.28,y:.32,w:.44,h:.2};
    const p={x:pr.x*W,y:pr.y*H,w:pr.w*W,h:pr.h*H};
    let bl=base.blend||'multiply', logoColor=c.main;
    const applyInk=(bgHex)=>{const r=mockInkColor(base,curPal,bgHex);logoColor=r.color;bl=r.blend;};
    const drawLogo=()=>{
      // v14.0: 텍스트든 업로드 로고든 한 장으로 렌더한 뒤 표면 형태에 맞춰 변형해 합성
      const pairOn=userLogoActive()&&userLogo.pair;
      const layer=renderLogoLayer({w:p.w,h:p.h,ss:2,
        text:name,fam,fw,color:logoColor,align:base.align||'center',
        img:userLogoActive()?userLogo.img:null, imgScale:userLogo?userLogo.scale:1,
        pair:pairOn});
      // 업로드한 로고는 브랜드 고유색이므로 합성 모드를 타지 않고 원색 그대로 얹는다.
      // 심볼+로고타입 병기 모드는 텍스트도 함께 그려지므로 살짝 배경에 눌리는 합성이 더 자연스럽다.
      compositeLogo(x,layer,p,base.warp, (userLogoActive()&&!pairOn)?'normal':bl, (userLogoActive()&&!pairOn)?1:.94);
    };
    if(isLayer){
      const srcs=(base.layers&&base.layers.some(Boolean))?base.layers.slice(0,3):[base.src];
      const above=base.layerAbove||[false,false,false];
      const imgs=await Promise.all(srcs.map(u=>u?new Promise(res=>{
        const im=new Image();im.crossOrigin='anonymous';
        im.onload=()=>res(im);im.onerror=()=>res(null);im.src=u;
      }):Promise.resolve(null)));
      const box=layerFitBox(imgs,W,H);
      x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
      if(box){
        x.fillStyle=bgc;x.fillRect(box.dx,box.dy,box.dw,box.dh);                       // ① 배경색(팔레트 자동/잠금)
        const put=im=>{
          if(base.chroma&&!base.layerMode)im=chromaKeyCanvas(im,pick?pick[0]:null);     // v13.0 크로마 항목 하위 호환
          x.drawImage(im,box.dx,box.dy,box.dw,box.dh);
        };
        imgs.forEach((im,i)=>{if(im&&!above[i])put(im);});                              // ② 로고 아래 레이어
        applyInk(bgc);                                                                  // v13.11: 글자색 = 지정 역할색(대비 부족 시 자동)
        drawLogo();                                                                     // ③ 로고
        imgs.forEach((im,i)=>{if(im&&above[i])put(im);});                                // ④ 로고 위 레이어(그림자·광택)
      }
    }else{
      await new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';
        im.onload=()=>{const s=Math.min(W/im.width,H/im.height);
          const dw=im.width*s,dh=im.height*s;
          x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
          x.drawImage(im,(W-dw)/2,(H-dh)/2,dw,dh);res();};
        im.onerror=res;im.src=base.src;});
      // v13.11: 레이어가 아닌 실사 이미지는 로고가 놓일 자리의 실제 밝기를 읽어 글자색을 정한다
      applyInk(sampleAreaHex(x,p.x,p.y,p.w,p.h));
      drawLogo();
    }
  }
  else if(scene==='none'){ /* v13.11: 공통(미선택)인데 등록된 목업 이미지가 없을 때 — 가상 샘플 장면은 그리지 않는다 */
    x.fillStyle='#F1F4F2';x.fillRect(0,0,W,H);
    x.fillStyle='#8A9A93';x.font='700 20px Pretendard, sans-serif';x.textAlign='center';
    x.fillText('표시할 목업 이미지가 없어요',W/2,H/2-14);
    x.font='500 14px Pretendard, sans-serif';
    x.fillText('관리자 → 업종 목업에서 이미지를 등록하면 이곳에 합성됩니다',W/2,H/2+16);
    x.textAlign='left';
  }
  else if(scene==='sign'){ /* 매장 간판 */
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#E9E4DC');g.addColorStop(1,'#CFC8BD');
    x.fillStyle=g;x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(0,0,0,.06)';x.lineWidth=2;
    for(let i=1;i<9;i++){x.beginPath();x.moveTo(i*(W/9),0);x.lineTo(i*(W/9),H);x.stroke();}
    x.save();x.translate(0,(H-620)/2);   // 620 기준 설계 콘텐츠를 세로 중앙에
    x.fillStyle='rgba(0,0,0,.16)';rr(96,118,W-192,190,10);x.fill();          // 간판 그림자
    x.fillStyle=c.main;rr(88,104,W-176,190,10);x.fill();                      // 간판 패널
    x.strokeStyle='rgba(255,255,255,.22)';x.lineWidth=3;rr(102,118,W-204,162,7);x.stroke();
    x.fillStyle=onC(c.main);
    const fs=fitFont(x,name,fam,W-300,96,fw);
    x.textAlign='center';x.fillText(name,W/2,199+fs*.36);x.textAlign='left';
    x.fillStyle=c.acc;rr(W/2-40,318,80,7,4);x.fill();                          // 포인트 라인
    const lg=x.createLinearGradient(0,90,0,320);lg.addColorStop(0,'rgba(255,255,255,.16)');lg.addColorStop(1,'rgba(255,255,255,0)');
    x.fillStyle=lg;rr(88,104,W-176,190,10);x.fill();                           // 조명
    x.fillStyle=c.bg;rr(150,392,300,140,8);x.fill();                           // 쇼윈도 두 칸
    x.fillStyle=c.sub;rr(550,392,300,140,8);x.fill();
    x.fillStyle='rgba(255,255,255,.35)';
    x.beginPath();x.moveTo(190,392);x.lineTo(260,392);x.lineTo(210,532);x.lineTo(140,532);x.closePath();x.fill();
    x.restore();
  }
  else if(scene==='card'){ /* 명함 */
    const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#DDD7CE');g.addColorStop(1,'#C6BFB4');
    x.fillStyle=g;x.fillRect(0,0,W,H);
    x.save();x.translate(W/2,H/2+8);x.rotate(-.045);
    x.shadowColor='rgba(0,0,0,.28)';x.shadowBlur=34;x.shadowOffsetY=16;
    x.fillStyle=c.bg;rr(-330,-186,660,372,14);x.fill();x.shadowColor='transparent';
    x.fillStyle=c.main;rr(-330,-186,660,96,14);x.fillRect(-330,-118,660,28);x.fill(); // 상단 밴드
    x.fillStyle=c.acc;rr(-330,-92,660,8,0);x.fill();
    x.fillStyle=yiq(c.bg)>150?c.main:onC(c.bg);
    const fs=fitFont(x,name,fam,560,72,fw);
    x.textAlign='center';x.fillText(name,0,26+fs*.32);
    x.font='600 21px Pretendard, sans-serif';x.fillStyle=c.ink;x.globalAlpha=.75;
    x.fillText(bizLabel()+' · '+st.adj,0,118);x.globalAlpha=1;x.textAlign='left';
    x.restore();
  }
  else if(scene==='screen'){ /* 앱 · 웹 화면 */
    x.fillStyle='#20262B';x.fillRect(0,0,W,H);
    x.fillStyle='#0E1215';rr(120,58,W-240,H-116,18);x.fill();                  // 디바이스
    x.fillStyle=c.bg;rr(138,76,W-276,H-152,10);x.fill();                       // 스크린
    x.fillStyle=c.main;rr(138,76,W-276,72,10);x.fillRect(138,120,W-276,28);x.fill(); // 상단바
    x.fillStyle=onC(c.main);x.font='800 24px Pretendard, sans-serif';x.fillText(name,168,122);
    x.fillStyle=yiq(c.bg)>150?c.main:onC(c.bg);
    const fs=fitFont(x,name,fam,W-420,84,fw);
    x.textAlign='center';x.fillText(name,W/2,306+fs*.3);
    x.font='600 20px Pretendard, sans-serif';x.fillStyle=c.ink;x.globalAlpha=.7;
    x.fillText(st.sub,W/2,352);x.globalAlpha=1;x.textAlign='left';
    x.fillStyle=c.acc;rr(W/2-108,392,216,52,26);x.fill();
    x.fillStyle=onC(c.acc);x.font='800 19px Pretendard, sans-serif';x.textAlign='center';
    x.fillText('시작하기',W/2,425);x.textAlign='left';
    x.fillStyle=c.sub;rr(206,486,170,40,10);x.fill();x.globalAlpha=.55;rr(410,486,170,40,10);x.fill();rr(614,486,170,40,10);x.fill();x.globalAlpha=1;
  }
  else{ /* package: 패키지 박스 */
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#E7E2DA');g.addColorStop(1,'#CBC4B9');
    x.fillStyle=g;x.fillRect(0,0,W,H);
    x.save();x.translate(0,(H-620)/2);   // 620 기준 설계 콘텐츠를 세로 중앙에
    x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(W/2,522,300,26,0,0,Math.PI*2);x.fill();
    x.fillStyle=c.main;x.beginPath();x.moveTo(310,180);x.lineTo(620,180);x.lineTo(620,520);x.lineTo(310,520);x.closePath();x.fill();   // 정면
    x.fillStyle=yiq(c.main)>150?'rgba(0,0,0,.16)':'rgba(0,0,0,.3)';
    x.beginPath();x.moveTo(620,180);x.lineTo(730,128);x.lineTo(730,468);x.lineTo(620,520);x.closePath();x.fill();                      // 측면
    x.fillStyle=yiq(c.main)>150?'rgba(255,255,255,.5)':'rgba(255,255,255,.18)';
    x.beginPath();x.moveTo(310,180);x.lineTo(420,128);x.lineTo(730,128);x.lineTo(620,180);x.closePath();x.fill();                      // 윗면
    x.fillStyle=c.bg;rr(348,300,234,120,8);x.fill();                            // 라벨
    x.fillStyle=c.acc;rr(348,300,234,10,0);x.fill();
    x.fillStyle=yiq(c.bg)>150?c.main:onC(c.bg);
    const fs=fitFont(x,name,fam,206,46,fw);
    x.textAlign='center';x.fillText(name,465,368+fs*.3);
    x.font='600 14px Pretendard, sans-serif';x.fillStyle=c.ink;x.globalAlpha=.7;x.fillText(bizLabel(),465,402);x.globalAlpha=1;x.textAlign='left';
    x.restore();
  }

  /* ---- 이미지 레이어 위 정보 바: 이름 · 업종 · 글꼴 · 색상 ---- */
  const bh=56;
  x.fillStyle='rgba(16,24,22,.82)';x.fillRect(0,H-bh,W,bh);
  x.fillStyle='#FFFFFF';x.font='800 17px Pretendard, sans-serif';
  x.fillText(name,26,H-bh+35);
  const nw=x.measureText(name).width;
  x.font='600 13px Pretendard, sans-serif';x.fillStyle='rgba(255,255,255,.72)';
  x.fillText(`${bizLabel()} · ${hf?hf.name:'Pretendard'} · ${st.adj}`,26+nw+18,H-bh+34);
  let sx=W-26;
  [c.ink,c.bg,c.acc,c.sub,c.main].forEach(hex=>{sx-=30;
    x.fillStyle=hex;rr(sx,H-bh+16,24,24,6);x.fill();
    x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=1;rr(sx,H-bh+16,24,24,6);x.stroke();});
  x.font='700 11px Pretendard, sans-serif';x.fillStyle='rgba(255,255,255,.6)';
  x.textAlign='right';x.fillText(`${c.main} · ${c.acc}`,sx-12,H-bh+34);x.textAlign='left';
}

/* ================= 관리자: 목업 이미지 라이브러리 ================= */
let amCurId=null, amImg=null, amSrc=null;
const AM_LAYER_MAX=3;
let amLayers=[null,null,null];        // 레이어별 data URL / URL
let amLayerImgs=[null,null,null];     // 로드된 Image 객체
let amLayerAbove=[false,false,false]; // true면 로고 위에 얹음(그림자·광택 오버레이용)
function renderAdminMockup(){ amRenderList(); if(!amCurId){const ids=Object.keys(MOCKUP_IMGS); if(ids.length)amSelect(ids[0]); else amNew();} }
function amRenderList(){
  const box=$('amList'); if(!box)return;
  box.innerHTML=Object.entries(MOCKUP_IMGS).map(([id,v])=>`
    <button type="button" class="am-item${id===amCurId?' on':''}" data-id="${id}">
      <img src="${v.src}" alt=""><span>${v.name||id}<em>${(v.biz||[]).length}개 업종 · ${v.layerMode?`레이어 ${(v.layers||[]).filter(Boolean).length}장`:(v.blend||'multiply')}${v.bgLock?' · 색잠금':''}${v.align&&v.align!=='center'?` · ${v.align==='left'?'좌':'우'}정렬`:''}</em></span>
    </button>`).join('')||'<span class="mock-none">등록된 이미지가 없어요</span>';
  box.querySelectorAll('.am-item').forEach(b=>b.onclick=()=>amSelect(b.dataset.id));
}
function amSelect(id){
  amCurId=id; const v=MOCKUP_IMGS[id]; if(!v)return;
  amSrc=v.src;
  $('amName').value=v.name||'';
  $('amBlend').value=v.blend||'multiply';
  $('amAlign').value=v.align||'center';
  $('amInkRole').value=(v.inkRole===undefined||v.inkRole===null)?'auto':String(v.inkRole);
  $('amIsPaper').checked=!!v.isPaper; amPaperToggle(true);
  const wv=Object.assign({},WARP_DEFAULT,v.warp||{});
  $('amWarpMode').value=wv.mode||'flat';
  $('amYaw').value=wv.yaw;$('amPitch').value=wv.pitch;$('amRoll').value=wv.roll;$('amRoll2').value=wv.roll;
  $('amCurve').value=wv.curve;$('amBow').value=wv.bow;$('amShade').value=wv.shade;
  $('amWarpTilt').classList.toggle('hidden',wv.mode!=='tilt');
  $('amWarpCyl').classList.toggle('hidden',wv.mode!=='cyl');
  $('amBgRole').value=String(v.bgRole||0);
  const lm=!!(v.layerMode||v.chroma);   // v13.0의 chroma 항목도 레이어 목업으로 승계
  $('amLayerMode').checked=lm;
  $('amBgColor').value=v.bgColor||'#12B97E';
  $('amBgLock').checked=!!v.bgLock;
  $('amLayerOpts').classList.toggle('hidden',!lm);
  amLayers=[0,1,2].map(i=>(v.layers&&v.layers[i])||(i===0?(v.src||null):null));
  amLayerAbove=[0,1,2].map(i=>!!(v.layerAbove&&v.layerAbove[i]));
  amLoadLayers(); amRenderSlots(); amBgLockToggle(true);
  const L=v.logo||{x:.34,y:.44,w:.32,h:.13};
  $('amX').value=Math.round(L.x*100);$('amY').value=Math.round(L.y*100);
  $('amW').value=Math.round(L.w*100);$('amH').value=Math.round(L.h*100);
  amRenderBiz(v.biz||[]);
  amLoadImg(v.src);
  amRenderList();
}
function amNew(){
  amCurId='m'+Date.now().toString(36); amSrc=null; amImg=null;
  $('amName').value='';$('amBlend').value='multiply';$('amAlign').value='center';
  $('amInkRole').value='auto';$('amBgRole').value='0';
  $('amIsPaper').checked=false; amPaperToggle(true);
  $('amWarpMode').value='flat';
  $('amYaw').value=0;$('amPitch').value=0;$('amRoll').value=0;$('amRoll2').value=0;
  $('amCurve').value=45;$('amBow').value=0;$('amShade').value=35;
  $('amWarpTilt').classList.add('hidden');$('amWarpCyl').classList.add('hidden');
  $('amLayerMode').checked=false;$('amBgColor').value='#12B97E';$('amBgLock').checked=false;
  $('amLayerOpts').classList.add('hidden');
  amLayers=[null,null,null];amLayerImgs=[null,null,null];amLayerAbove=[false,false,false];
  amRenderSlots(); amBgLockToggle(true);
  $('amX').value=34;$('amY').value=44;$('amW').value=32;$('amH').value=13;
  amRenderBiz([]); amDraw(); amRenderList();
  toast('새 이미지 — 파일을 올리고 업종을 체크한 뒤 저장하세요');
}
function amRenderBiz(checked){
  const box=$('amBizChecks'); if(!box)return;
  // 업종별 현재 등록 수 (자기 자신 제외)
  const cnt={};
  Object.entries(MOCKUP_IMGS).forEach(([id,v])=>{if(id===amCurId)return;(v.biz||[]).forEach(b=>cnt[b]=(cnt[b]||0)+1);});
  box.innerHTML=BIZ_LIST.map(([k,l])=>{
    const on=checked.includes(k), n=cnt[k]||0, full=!on&&n>=MOCK_BIZ_MAX;
    return `<label class="am-bz${on?' on':''}${full?' full':''}" data-k="${k}" title="${n?`이 업종에 ${n}개 등록됨`:''}">
      <input type="checkbox" ${on?'checked':''} ${full?'disabled':''}>${l}${n?` <em style="font-style:normal;font-weight:600;color:var(--ink3)">${n}</em>`:''}</label>`;
  }).join('');
  box.querySelectorAll('.am-bz:not(.full)').forEach(lb=>{
    const cb=lb.querySelector('input');
    cb.onchange=()=>lb.classList.toggle('on',cb.checked);
  });
}
function amCheckedBiz(){return [...document.querySelectorAll('#amBizChecks input:checked')].map(cb=>cb.closest('.am-bz').dataset.k);}
function amLoadImg(u){
  amImg=null; if(!u){amDraw();return;}
  const im=new Image();im.crossOrigin='anonymous';
  im.onload=()=>{amImg=im;amDraw();};
  im.onerror=()=>{amImg=null;amDraw();toast('이미지를 불러오지 못했어요');};
  im.src=u;
}
function amFilePick(inp){
  const f=inp.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{amSrc=r.result;chromaCache.delete('am:'+amCurId);chromaCache.delete(amCurId);
    if(!$('amName').value)$('amName').value=f.name.replace(/\.[^.]+$/,'');
    if($('amLayerMode').checked){amLayers[0]=amSrc;amLoadLayers(()=>{amRenderSlots();amDraw();});}
    amLoadImg(amSrc);};
  r.readAsDataURL(f); inp.value='';
}
function amUrlAsk(){const u=prompt('이미지 URL을 붙여 넣으세요');if(u&&u.trim()){amSrc=u.trim();chromaCache.delete('am:'+amCurId);chromaCache.delete(amCurId);amLoadImg(amSrc);}}
/* ---- v13.1 레이어 시스템: 배경색(자동) → 레이어 1·2·3 → 로고 ---- */
function amLayerToggle(){
  const on=$('amLayerMode').checked;
  $('amLayerOpts').classList.toggle('hidden',!on);
  if(on&&!amLayers.some(Boolean)&&amSrc)amLayers[0]=amSrc;   // 기존 단일 이미지를 레이어1로 승계
  amLoadLayers(); amRenderSlots(); amDraw();
}
function amBgLockToggle(silent){
  const lock=$('amBgLock').checked;
  const tag=$('amBgAutoTag');
  if(tag){
    tag.classList.toggle('locked',lock);
    tag.textContent=lock?'이 이미지는 지정한 색으로 고정됩니다':'선택한 팔레트 톤이 결과 화면에서 자동 적용';
  }
  if(!silent)amDraw();
}
function amRenderSlots(){
  const box=$('amLayerSlots'); if(!box)return;
  box.innerHTML=[0,1,2].map(i=>{
    const src=amLayers[i];
    return `<div class="am-slot${src?' filled':''}" data-i="${i}">
      <div class="am-slot-head">레이어 ${i+1}${i===0?' (기본)':''}
        ${src?`<button type="button" class="rm" data-rm="${i}" title="이 레이어 비우기">비우기</button>`:''}</div>
      <div class="am-slot-thumb">${src?`<img src="${src}" alt="">`:'<i>비어 있음</i>'}</div>
      <div class="am-slot-acts">
        <button type="button" data-up="${i}">파일</button>
        <button type="button" data-url="${i}">URL</button>
      </div>
      <label class="am-chk" style="font-size:10.5px"><input type="checkbox" data-above="${i}" ${amLayerAbove[i]?'checked':''} ${src?'':'disabled'}><b style="font-weight:700">로고 위</b></label>
    </div>`;}).join('');
  box.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>amSlotPick(+b.dataset.up));
  box.querySelectorAll('[data-url]').forEach(b=>b.onclick=()=>amSlotUrl(+b.dataset.url));
  box.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>amSlotClear(+b.dataset.rm));
  box.querySelectorAll('[data-above]').forEach(cb=>cb.onchange=()=>{amLayerAbove[+cb.dataset.above]=cb.checked;amDraw();});
}
let amSlotTarget=0;
function amSlotPick(i){amSlotTarget=i;$('amLayerFile').click();}
function amLayerFilePick(inp){
  const f=inp.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    amLayers[amSlotTarget]=r.result;
    if(amSlotTarget===0&&!$('amName').value)$('amName').value=f.name.replace(/\.[^.]+$/,'');
    amLoadLayers(()=>{amRenderSlots();amDraw();});
  };
  r.readAsDataURL(f); inp.value='';
}
function amSlotUrl(i){
  const u=prompt(`레이어 ${i+1} 이미지 URL을 붙여 넣으세요 (배경이 투명한 PNG 권장)`);
  if(u&&u.trim()){amLayers[i]=u.trim();amLoadLayers(()=>{amRenderSlots();amDraw();});}
}
function amSlotClear(i){amLayers[i]=null;amLayerImgs[i]=null;amLayerAbove[i]=false;amRenderSlots();amDraw();}
function amLoadLayers(done){
  let pending=0, called=false;
  const finish=()=>{if(!called&&pending===0){called=true;if(done)done();else amDraw();}};
  [0,1,2].forEach(i=>{
    const u=amLayers[i];
    if(!u){amLayerImgs[i]=null;return;}
    pending++;
    const im=new Image();im.crossOrigin='anonymous';
    im.onload=()=>{amLayerImgs[i]=im;pending--;finish();};
    im.onerror=()=>{amLayerImgs[i]=null;pending--;toast(`레이어 ${i+1} 이미지를 불러오지 못했어요`);finish();};
    im.src=u;
  });
  if(pending===0)finish();
}
/* 레이어들의 공통 contain 배치 박스 — 첫 유효 레이어 기준(모든 레이어는 같은 크기로 준비) */
function layerFitBox(imgs,W,H){
  const ref=imgs.find(Boolean); if(!ref)return null;
  const s=Math.min(W/ref.width,H/ref.height);
  const dw=ref.width*s,dh=ref.height*s;
  return {dx:(W-dw)/2,dy:(H-dh)/2,dw,dh};
}
function amRect(){return {x:+$('amX').value/100,y:+$('amY').value/100,w:+$('amW').value/100,h:+$('amH').value/100};}
function amDraw(){
  const cv=$('amCanvas'); if(!cv)return;
  const W=cv.width,H=cv.height,x=cv.getContext('2d');
  x.clearRect(0,0,W,H);
  const lmOn=$('amLayerMode')&&$('amLayerMode').checked;
  // v13.11: 미리보기 배경색 — 잠금이면 지정색, 아니면 선택한 팔레트 톤(결과 화면과 동일 규칙)
  const bgRoleIdx=Math.max(0,Math.min(4,+($('amBgRole')?$('amBgRole').value:0)));
  const bgc=($('amBgLock')&&$('amBgLock').checked)
    ? ($('amBgColor').value||'#12B97E')
    : ((curPal&&curPal[bgRoleIdx]&&curPal[bgRoleIdx].hex)||$('amBgColor').value||'#12B97E');
  const p=amRect();
  let bl=$('amBlend').value, logoC='#2A3A46';

  const px={x:p.x*W,y:p.y*H,w:p.w*W,h:p.h*H};
  const drawLogo=()=>{
    const layer=renderLogoLayer({w:px.w,h:px.h,ss:2,text:'브랜드 이름',
      fam:'Pretendard',fw:700,color:logoC,align:$('amAlign').value||'center'});
    compositeLogo(x,layer,px,amWarp(),bl,.94);
  };

  if(lmOn){
    const box=layerFitBox(amLayerImgs,W,H);
    x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
    if(!box){
      x.fillStyle='#999';x.font='700 18px Pretendard, sans-serif';x.textAlign='center';
      x.fillText('레이어 1에 이미지를 올려 주세요 (배경 투명 PNG 권장)',W/2,H/2);x.textAlign='left';
    }else{
      x.fillStyle=bgc;x.fillRect(box.dx,box.dy,box.dw,box.dh);                   // ① 배경색
      [0,1,2].forEach(i=>{if(amLayerImgs[i]&&!amLayerAbove[i])x.drawImage(amLayerImgs[i],box.dx,box.dy,box.dw,box.dh);}); // ② 로고 아래 레이어
      if($('amIsPaper')&&$('amIsPaper').checked){bl='multiply';logoC='#22302C';}   // v0.19.0: 종이류 미리보기도 항상 어두운 글자로
      else{const light=yiq(bgc)>150; bl=light?'multiply':'screen'; logoC=light?'#22302C':'#FFFFFF';}
      drawLogo();                                                                // ③ 로고
      [0,1,2].forEach(i=>{if(amLayerImgs[i]&&amLayerAbove[i])x.drawImage(amLayerImgs[i],box.dx,box.dy,box.dw,box.dh);}); // ④ 로고 위 레이어(그림자·광택)
    }
  }else{
    if(amImg){const s=Math.min(W/amImg.width,H/amImg.height);
      const dw=amImg.width*s,dh=amImg.height*s;
      x.fillStyle='#ECEAE6';x.fillRect(0,0,W,H);
      x.drawImage(amImg,(W-dw)/2,(H-dh)/2,dw,dh);}
    else{x.fillStyle='#EEE';x.fillRect(0,0,W,H);
      x.fillStyle='#999';x.font='700 20px Pretendard, sans-serif';x.textAlign='center';
      x.fillText('파일 업로드 또는 URL 입력으로 이미지를 등록하세요',W/2,H/2);x.textAlign='left';}
    drawLogo();
  }
  // 가이드 외곽선 — 배경색과 같아 안 보이는 일이 없도록 흰 테두리를 깔고 초록 점선을 얹는다
  warpGuidePath(x,px,amWarp());
  x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=4.5;x.setLineDash([]);x.stroke();
  x.strokeStyle='#0B8A5D';x.lineWidth=2.2;x.setLineDash([8,6]);x.stroke();x.setLineDash([]);
}
/* 관리자 워프 컨트롤 값 */
function amWarp(){
  const g=id=>{const el=$(id);return el?+el.value:0;};
  const m=$('amWarpMode')?$('amWarpMode').value:'flat';
  return {mode:m,yaw:g('amYaw'),pitch:g('amPitch'),roll:g('amRoll'),
          curve:g('amCurve'),bow:g('amBow'),shade:g('amShade')};
}
function amRollSync(el){const r=$('amRoll');if(r)r.value=el.value;amDraw();}
/* v0.19.0: 종이류 체크 시 글자색을 '자동'으로 고정하고 선택을 잠근다 — 두 설정이
   동시에 다른 값을 주장하면 혼란스러우므로, 종이류가 우선한다는 것을 화면에서도 보여준다. */
function amPaperToggle(silent){
  const on=$('amIsPaper').checked, sel=$('amInkRole');
  if(on){sel.value='auto'; sel.disabled=true;} else{sel.disabled=false;}
  if(!silent)amDraw();
}
function amWarpToggle(){
  const m=$('amWarpMode')?$('amWarpMode').value:'flat';
  const t=$('amWarpTilt'), c=$('amWarpCyl');
  if(t)t.classList.toggle('hidden',m!=='tilt');
  if(c)c.classList.toggle('hidden',m!=='cyl');
  amDraw();
}
function amSave(){
  const lm=$('amLayerMode').checked;
  const layers=amLayers.filter(Boolean);
  if(lm&&!layers.length){toast('레이어 1에 이미지를 먼저 올려 주세요');return;}
  if(!lm&&!amSrc){toast('먼저 이미지를 등록하세요');return;}
  const name=($('amName').value||'').trim()||'이름 없는 목업';
  MOCKUP_IMGS[amCurId]={name,
    src:lm?(amLayers[0]||amSrc):amSrc,     // 목록 썸네일용 대표 이미지
    logo:amRect(),blend:$('amBlend').value,align:$('amAlign').value,biz:amCheckedBiz(),
    layerMode:lm,
    layers:lm?amLayers.slice(0,AM_LAYER_MAX):null,
    layerAbove:lm?amLayerAbove.slice(0,AM_LAYER_MAX):null,
    bgColor:$('amBgColor').value,bgLock:$('amBgLock').checked,
    bgRole:+$('amBgRole').value,
    inkRole:$('amInkRole').value==='auto'?'auto':+$('amInkRole').value,
    isPaper:$('amIsPaper').checked,
    warp:amWarp()};
  chromaCache.delete(amCurId);   // 이미지 교체 대비 캐시 무효화
  markDirty(); amRenderList(); amRenderBiz(amCheckedBiz());
  if(curCode)drawMockup();
  toast(`'${name}' 저장 — 「데이터 파일 내보내기」로 영구 반영하세요`);
}
function amDelete(){
  if(!MOCKUP_IMGS[amCurId]){amNew();return;}
  const v=MOCKUP_IMGS[amCurId];
  if(!confirm(`'${v.name}' 이미지를 라이브러리에서 삭제할까요?`))return;
  delete MOCKUP_IMGS[amCurId];
  amCurId=null; markDirty(); renderAdminMockup();
  if(curCode)drawMockup();
  toast('삭제했어요');
}

const SCHEMES = {
  tot:{name:"톤온톤",easy:"같은 색, 밝기만 다르게"},
  tit:{name:"톤인톤",easy:"이웃한 색을 나란히"},
  acc:{name:"포인트",easy:"차분한 바탕 + 강조 1색"},
  sep:{name:"세퍼레이션",easy:"두 색 사이에 중립색"},
};

/* ================= COLOR ENGINE ================= */
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
/* 16 스타일 맵 전용 카테고리 색 — 실제 브랜드 색과 별개로, 한눈에 구분되도록 색상환에 고르게 배치 */
const TAG_HUES = (()=>{const codes=["GBEC","GBEM","GBRC","GBRM","GSEC","GSEM","GSRC","GSRM","LBEC","LBEM","LBRC","LBRM","LSEC","LSEM","LSRC","LSRM"];
  const t={}; codes.forEach((c,i)=>t[c]=Math.round(i*(360/codes.length))); return t;})();
const rnd=(a,b)=>a+Math.random()*(b-a);
function hsb2hex(h,s,b){
  h=((h%360)+360)%360; s/=100; b/=100;
  const k=n=>(n+h/60)%6, f=n=>b*(1-s*Math.max(0,Math.min(k(n),4-k(n),1)));
  const to=v=>Math.round(v*255).toString(16).padStart(2,'0').toUpperCase();
  return '#'+to(f(5))+to(f(3))+to(f(1));
}
function tagHex(code){return hsb2hex(TAG_HUES[code],68,80);}
/* 16맵 전용: 매번 다른 무작위 대신, 항상 같은 대표 팔레트를 보여주는 결정론적 조색 */
function previewPalette(st,scheme){
  const S=st.sat,B=st.bri;
  const midS=(S[0]+S[1])/2, midB=(B[0]+B[1])/2;
  const dark=B[1]<=25;
  const h=(st.hue[0][0]<=st.hue[0][1])?(st.hue[0][0]+st.hue[0][1])/2:st.hue[0][0];
  let p;
  if(scheme==='tot'){
    const s0=midS,b0=(B[0]+midB)/2;
    p=[[h,s0,b0],[h,s0*.82,clamp(b0+22,B[0],Math.max(B[1],b0+22))],[h,clamp(s0*1.15,0,100),clamp(b0+40,0,92)],[h,clamp(s0*.16,0,14),96],[h,clamp(s0*.5,0,30),14]];
  }else if(scheme==='tit'){
    const off=27,s0=midS,b0=clamp(midB,60,B[1]);
    p=[[h,s0,b0],[h+off,s0*.92,clamp(b0+4,B[0],100)],[h-off,s0*.96,clamp(b0-4,B[0],100)],[h,clamp(s0*.15,0,12),97],[h,clamp(s0*.55,0,32),16]];
  }else if(scheme==='acc'){
    const s0=clamp(Math.max(midS,55),S[0],100);
    if(dark) p=[[h,8,8],[h,10,15],[h,s0,72],[h,6,72],[h,4,96]];
    else p=[[h,4,98],[h,7,92],[h,s0,clamp(midB,55,95)],[h,10,62],[h,18,13]];
  }else{
    const h2=st.hue.length>1?((st.hue[1][0]+st.hue[1][1])/2):h+160;
    const s0=midS,b0=clamp(midB,40,85);
    p=[[h,s0,b0],[h2,s0*.9,clamp(b0-6,25,85)],[h,clamp(s0*1.1,0,95),clamp(b0+14,0,90)],[42,14,94],[28,30,15]];
  }
  const roles=["주조색","보조색","포인트","바탕색","글자색"];
  const out=p.map(([hh,ss,bb],i)=>({h:((hh%360)+360)%360,s:clamp(ss,0,100),b:clamp(bb,0,100),hex:hsb2hex(hh,ss,bb),role:roles[i]}));
  return applyAvoid(st,out,scheme);
}
function pickHue(ranges){
  const spans=ranges.map(([a,b])=>a<=b?[a,b]:[a,b+360]);
  const total=spans.reduce((s,[a,b])=>s+(b-a),0);
  let r=Math.random()*total;
  for(const[a,b]of spans){ if(r<=b-a) return (a+r)%360; r-=(b-a); }
  return spans[0][0];
}
function inHue(h,ranges){
  h=((h%360)+360)%360;
  return ranges.some(([a,b])=>a<=b?(h>=a&&h<=b):(h>=a||h<=b));
}
/* 배색 생성기 — 스타일 범위(가드레일) 안에서 5개 역할 색을 만든다 */
/* 고정된 색을 기준으로 나머지를 조화롭게 다시 조색 */
function lockedAnchor(){
  // 잠긴 색 중 유채색(채도>12)을 우선 기준으로 삼는다
  const idx=curLocks.map((v,i)=>v?i:-1).filter(i=>i>=0);
  if(!idx.length||!curPal)return null;
  const chrom=idx.map(i=>curPal[i]).filter(c=>c.s>12);
  const base=(chrom.length?chrom:idx.map(i=>curPal[i]))
    .sort((a,b)=>b.s-a.s)[0];
  return base?{h:base.h,s:base.s,b:base.b,role:base.role}:null;
}
function harmonize(st,scheme){
  const anc=lockedAnchor();
  if(!anc)return genPalette(st,scheme,curAnchor);
  // 고정색의 색상을 축으로, 배색 방식에 맞는 관계색을 계산
  const S=st.sat,B=st.bri;
  const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
  const inR=h=>inHue(h,st.hue)?h:clampHueToRanges(h,st.hue);
  let hs;
  if(scheme==='tot')      hs=[anc.h,anc.h,anc.h];                          // 동일 색상, 명도차
  else if(scheme==='tit') hs=[anc.h,inR(anc.h+26),inR(anc.h-26)];          // 인접 색상
  else if(scheme==='acc') hs=[anc.h,anc.h,anc.h];                          // 무채 바탕 + 강조
  else                    hs=[anc.h,inR(anc.h+152),anc.h];                 // 보색 + 중립
  const roles=["주조색","보조색","포인트","바탕색","글자색"];
  const easy=["가장 많이 쓰는 색","곁들이는 색","눈길 끄는 색","배경","텍스트"];
  const dark=B[1]<=25;
  let p;
  if(scheme==='tot'){
    const b0=cl(anc.b,B[0],B[1]);
    p=[[hs[0],anc.s,b0],[hs[0],anc.s*.82,cl(b0+22,B[0],100)],[hs[0],cl(anc.s*1.15,0,100),cl(b0+40,0,92)],
       [hs[0],cl(anc.s*.16,0,14),96],[hs[0],cl(anc.s*.5,0,30),14]];
  }else if(scheme==='tit'){
    const b0=cl(anc.b,Math.max(B[0],55),B[1]);
    p=[[hs[0],anc.s,b0],[hs[1],anc.s*.92,cl(b0+4,B[0],100)],[hs[2],anc.s*.96,cl(b0-4,B[0],100)],
       [hs[0],cl(anc.s*.15,0,12),97],[hs[0],cl(anc.s*.55,0,32),16]];
  }else if(scheme==='acc'){
    if(dark) p=[[hs[0],8,8],[hs[0],10,15],[hs[0],cl(Math.max(anc.s,55),S[0],100),cl(anc.b,60,92)],[hs[0],6,72],[hs[0],4,96]];
    else     p=[[hs[0],4,98],[hs[0],7,92],[hs[0],cl(Math.max(anc.s,55),S[0],100),cl(anc.b,45,95)],[hs[0],10,62],[hs[0],18,13]];
  }else{
    const b0=cl(anc.b,Math.max(B[0],35),Math.min(B[1],88));
    p=[[hs[0],anc.s,b0],[hs[1],anc.s*.9,cl(b0-6,25,88)],[hs[0],cl(anc.s*1.1,0,95),cl(b0+14,0,92)],
       [42,14,94],[28,30,15]];
  }
  const out=p.map(([hh,ss,bb],i)=>{
    const H=((hh%360)+360)%360, Sv=cl(ss,0,100), Bv=cl(bb,0,100);
    return {h:H,s:Sv,b:Bv,hex:hsb2hex(H,Sv,Bv),role:roles[i],easy:easy[i]};
  });
  // 「피하세요」 규칙 적용 후, 잠긴 색은 원본 그대로 유지
  const safe=applyAvoid(st,out,scheme);
  return safe.map((c,i)=>curLocks[i]?curPal[i]:c);
}
/* 「피하세요」 규칙을 실제 조색에 강제 적용 */
function applyAvoid(st,pal,scheme){
  const av=st.avoid||{};
  const chromIdxs=(scheme==='acc')?[2]:[0,1,2];
  return pal.map((c,i)=>{
    let s=c.s, b=c.b;
    const isChrom=chromIdxs.includes(i);
    if(isChrom){
      if(av.satMax!=null) s=Math.min(s,av.satMax);
      if(av.satMin!=null) s=Math.max(s,av.satMin);
    }
    if(av.briMax!=null && i!==3 && i!==4) b=Math.min(b,av.briMax);
    if(av.briMin!=null && i!==4) b=Math.max(b,av.briMin);
    // 순백 금지: 바탕색을 크림 톤으로
    if(av.noWhite && i===3 && b>96){ b=94; s=Math.max(s,8); }
    if(s===c.s && b===c.b) return c;
    return {...c,s:clamp(s,0,100),b:clamp(b,0,100),hex:hsb2hex(c.h,clamp(s,0,100),clamp(b,0,100))};
  });
}
function genPalette(st,scheme,anchor){anchor=anchor||{};
  const S=st.sat,B=st.bri;
  const midS=()=>rnd(S[0],S[1]), midB=()=>rnd(B[0],B[1]);
  const dark=B[1]<=25;                 // 다크 계열 스타일(예: 다크 시네마)
  const h=(anchor.h!=null)?anchor.h:pickHue(st.hue);
  let p;
  if(scheme==='tot'){
    const s0=(anchor.s!=null)?anchor.s:midS(),b0=(anchor.b!=null)?anchor.b:rnd(B[0],(B[0]+B[1])/2);
    p=[[h,s0,b0],[h,s0*.82,clamp(b0+22,B[0],Math.max(B[1],b0+22))],[h,clamp(s0*1.15,0,100),clamp(b0+40,0,92)],
       [h,clamp(s0*.16,0,14),96],[h,clamp(s0*.5,0,30),14]];
  }else if(scheme==='tit'){
    const off=rnd(20,34), s0=(anchor.s!=null)?anchor.s:midS(), b0=(anchor.b!=null)?anchor.b:clamp(midB(),60,B[1]);
    p=[[h,s0,b0],[h+off,s0*.92,clamp(b0+4,B[0],100)],[h-off,s0*.96,clamp(b0-4,B[0],100)],
       [h,clamp(s0*.15,0,12),97],[h,clamp(s0*.55,0,32),16]];
  }else if(scheme==='acc'){
    const s0=(anchor.s!=null)?anchor.s:clamp(Math.max(midS(),55),S[0],100);const bAcc=(anchor.b!=null)?anchor.b:null;
    if(dark){ // 어두운 바탕 + 발광 포인트
      p=[[h,8,8],[h,10,15],[h,s0,bAcc!=null?bAcc:rnd(60,85)],[h,6,72],[h,4,96]];
    }else{
      p=[[h,4,98],[h,7,92],[h,s0,bAcc!=null?bAcc:clamp(midB(),55,95)],[h,10,62],[h,18,13]];
    }
  }else{ // sep — 두 색 + 크림 중립
    const h2=st.hue.length>1?pickHue([st.hue[1]]):h+rnd(140,180);
    const s0=(anchor.s!=null)?anchor.s:midS(), b0=(anchor.b!=null)?anchor.b:clamp(midB(),40,85);
    p=[[h,s0,b0],[h2,s0*.9,clamp(b0-6,25,85)],[h,clamp(s0*1.1,0,95),clamp(b0+14,0,90)],
       [42,14,94],[28,30,15]];
  }
  const roles=["주조색","보조색","포인트","바탕색","글자색"];
  const easy=["가장 많이 쓰는 색","곁들이는 색","눈길 끄는 색","배경","텍스트"];
  const out=p.map(([hh,ss,bb],i)=>({h:((hh%360)+360)%360,s:clamp(ss,0,100),b:clamp(bb,0,100),
    hex:hsb2hex(hh,ss,bb),role:roles[i],easy:easy[i]}));
  return applyAvoid(st,out,scheme);
}

/* ================= STATE ================= */
const sliders=[]; // input elements
let qIdx=0; const qAns=Array(12).fill(null);
let curCode=null, curScheme=null, curPal=null;
let brandName='', curFontIdx=0, fontTypeFilter='전체';
let curAnchor={h:null,s:null,b:null}, curLocks=[false,false,false,false,false];
const PRISM_URL='https://markinfo.kr/services/45';
const imgStore={}, cssInjected=new Set();
Object.keys(STYLES).forEach(c=>imgStore[c]=[null,null,null,null]);
const $=id=>document.getElementById(id);
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1800);}

/* ================= SLIDERS UI ================= */
function buildAxes(){
  const box=$('axes');
  box.innerHTML=''; sliders.length=0;   // 저장본에 남은 마크업 제거 후 재생성
  AXES.forEach((ax,i)=>{
    const d=document.createElement('div');
    d.className='axis';
    d.innerHTML=`
      <div class="axis-head"><span class="axis-name">${ax.name}</span><span class="axis-easy">${ax.easy}</span></div>
      <div class="poles">
        <span class="pole pl"><b>${ax.L.t}</b><small>${ax.L.s}</small></span>
        <span class="pole pr" style="text-align:right"><b>${ax.R.t}</b><small>${ax.R.s}</small></span>
      </div>
      <div class="srow">
        <input type="range" min="0" max="6" step="1" value="3" aria-label="${ax.name}: ${ax.L.t}에서 ${ax.R.t}">
        <span class="strength center">미정</span>
      </div>`;
    box.appendChild(d);
    const inp=d.querySelector('input');
    sliders.push(inp);
    inp.addEventListener('input',()=>render());
  });
}
const STR=["강함","보통","약간",null,"약간","보통","강함"];
function axisState(i){
  const v=+sliders[i].value;
  if(v===3) return {side:null,strength:null,v};
  return {side:v<3?'L':'R', strength:STR[v], v};
}
function currentCode(){
  let code='';
  for(let i=0;i<4;i++){const st=axisState(i);if(!st.side)return null;code+=AXES[i][st.side].c;}
  return code;
}
function syncAxisUI(){
  sliders.forEach((s,i)=>{
    const st=axisState(i), ax=s.closest('.axis');
    ax.querySelector('.pl').classList.toggle('on',st.side==='L');
    ax.querySelector('.pr').classList.toggle('on',st.side==='R');
    const lab=ax.querySelector('.strength');
    lab.textContent=st.side?st.strength:'미정';
    lab.classList.toggle('center',!st.side);
    s.classList.toggle('center',!st.side);
  });
}

/* ================= QUESTIONS ================= */
function renderQ(){
  const q=QUESTIONS[qIdx];
  $('qBar').style.width=(qIdx/QUESTIONS.length*100)+'%';
  $('qNo').textContent=`질문 ${qIdx+1} / ${QUESTIONS.length} · ${AXES[q.axis].name}`;
  $('qText').textContent=q.q;
  $('optA').textContent=q.A.t; $('optB').textContent=q.B.t;
  $('qPrev').style.visibility=qIdx===0?'hidden':'visible';
}
function answer(side){
  qAns[qIdx]=side;
  if(qIdx<QUESTIONS.length-1){qIdx++;renderQ();}
  else finishQ();
}
function finishQ(){
  let vague=0;
  for(let a=0;a<4;a++){
    const ans=QUESTIONS.map((q,i)=>q.axis===a?qAns[i]:null).filter(x=>x!==null);
    const L=ans.filter(x=>x==='L').length, R=ans.filter(x=>x==='R').length;
    const diff=Math.abs(L-R);
    let v=3;
    if(diff>0){const side=L>R?-1:1;v=3+side*Math.min(diff,3);}
    else vague++;
    sliders[a].value=v;
  }
  switchTab('S');
  render();
  toast(vague>0?`애매했던 ${vague}개 기준은 미정으로 두었어요 — 슬라이더로 살짝만 기울여 보세요`:'답변을 좌표로 옮겼어요 — 슬라이더로 미세 조정할 수 있어요');
  $('result').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ================= RESULT RENDER ================= */
function render(){
  syncAxisUI();
  const code=currentCode();
  if(!code){renderPlaceholder();curCode=null;markMap();return;}
  if(code!==curCode){curCode=code;curScheme=STYLES[code].scheme;curAnchor={h:null,s:null,b:null};curLocks=[false,false,false,false,false];curFontIdx=0;fontTypeFilter='전체';curPal=genPalette(STYLES[code],curScheme);}
  renderStyle();
  markMap();
}
function renderPlaceholder(){
  const decided=AXES.map((ax,i)=>({ax,st:axisState(i)}));
  const n=decided.filter(d=>d.st.side).length;
  const chips=decided.map(d=>`<span class="achip ${d.st.side?'done':''}">${d.ax.name} · ${d.st.side?d.ax[d.st.side].t:'미정'}</span>`).join('');
  $('result').innerHTML=`
    <div class="placeholder">
      <div class="big">${n===0?'슬라이더를 움직여 스타일을 찾아보세요':`좋아요, ${n}개 기준이 정해졌어요`}</div>
      <p>${n===0?'네 개의 기준이 모두 한쪽으로 기울면 어울리는 스타일이 나타납니다.':`나머지 ${4-n}개 기준도 마음 가는 쪽으로 움직여 보세요.`}</p>
      <div class="axis-chips">${chips}</div>
    </div>`;
}
function sentenceBreak(t){
  // 문장 끝(다./요./까?/!) 뒤에서 줄을 나눈다
  return (t||'').replace(/([.!?])\s+/g,'$1<br>');
}
function fontTagsHTML(f,compact){
  if(!f)return '';
  const t=[];
  if(f.type)t.push(`<span class="ftag t">${f.type}</span>`);
  if(f.weight)t.push(`<span class="ftag">${f.weight}</span>`);
  (f.mood||[]).slice(0,compact?1:2).forEach(m=>t.push(`<span class="ftag">${m}</span>`));
  return t.join('');
}
function injectFonts(code){
  (FONTMAP[code]?.fonts||[]).forEach(f=>{
    if(cssInjected.has(f.name))return;
    const s=document.createElement('style');s.textContent=f.css;document.head.appendChild(s);
    cssInjected.add(f.name);
  });
}
function yiq(hex){const n=parseInt(hex.slice(1),16);return ((n>>16)*299+((n>>8)&255)*587+(n&255)*114)/1000;}
function heroColors(){
  const p=curPal, bg=p[0].hex, bgY=yiq(bg);
  // 배경과 대비가 가장 좋은 전경 후보 선택
  const cands=[p[4].hex,p[3].hex,'#FFFFFF','#232F34'];
  let fg=cands[0],best=-1;
  cands.forEach(c=>{const d=Math.abs(yiq(c)-bgY);if(d>best){best=d;fg=c;}});
  return{bg,fg};
}
function renderStyle(){
  const st=STYLES[curCode];
  injectFonts(curCode);
  const fonts=FONTMAP[curCode]?.fonts||[];
  const hero=heroColors();
  const schemeTabs=Object.entries(SCHEMES).map(([k,s])=>`
    <button class="scheme-tab ${k===curScheme?'on':''}" data-scheme="${k}">${s.name}<span style="font-weight:500;color:var(--ink3)"> · ${s.easy}</span>${k===st.scheme?'<span class="rec">추천</span>':''}</button>`).join('');
  const pal=curPal.map((c,i)=>`
    <div class="sw" data-i="${i}"><div class="c sw-chip" data-i="${i}" title="클릭하면 이 색을 잠가요" style="background:${c.hex};${c.b>93?'border-bottom:1px solid var(--line);':''}">${curLocks[i]?'<span class="lockmark">🔒</span>':''}</div>
    <div class="m"><div class="role">${c.role} <span style="font-weight:500">· ${c.easy}</span></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><button class="hex" data-hex="${c.hex}" title="눌러서 복사">${c.hex}</button>
    <button class="tune-btn" data-i="${i}" title="색상 피커 열기">✎ 조정</button></div></div></div>`).join('');
  if(curFontIdx>=fonts.length)curFontIdx=0;
  const heroFont=fonts[curFontIdx]||fonts[0]||null;   // v13.5: 오류 폰트 제외로 목록이 비어도 안전하게
  if(!heroFont){
    const box=$('styleWrap')||$('app');
    console.warn(`${curCode} 유형에 표시할 폰트가 없습니다 — 관리자에서 웹폰트 오류 플래그를 확인하세요`);
  }
  const types=['전체',...new Set(fonts.map(f=>f.type).filter(Boolean))];
  const typeChips=types.map(t=>`<button class="fchip ${t===fontTypeFilter?'on':''}" data-type="${t}">${t}${t==='전체'?` <em>${fonts.length}</em>`:` <em>${fonts.filter(f=>f.type===t).length}</em>`}</button>`).join('');
  const fontCards=fonts.map((f,i)=>{
    const hidden=(fontTypeFilter!=='전체'&&f.type!==fontTypeFilter)?' hidden':'';
    return `<button class="font-card${i===curFontIdx?' on':''}${hidden}" data-i="${i}">
      <div class="fc-sample" style="font-family:${f.family}" data-fsample>${(brandName||st.adj)}</div>
      <div class="fc-foot"><span class="fc-name">${f.name}</span>${i===0?'<span class="fc-rec">대표</span>':''}${f.added?'<span class="fc-add">추가</span>':''}</div>
      <div class="fc-tags">${fontTagsHTML(f,true)}</div>
    </button>`;}).join('')
    +`<button class="font-card fc-more" id="fcMore"><span class="fcm-ico">＋</span>
      <span class="fcm-t">폰트 더보기</span><span class="fcm-s">전체 폰트에서 직접 골라 추가</span></button>`;
  const kws=st.kw.map(([ko,en])=>`<button class="kw" data-q="${en}">#${ko}</button>`).join('');
  const samples=styleSamples(curCode);
  const sampleSlots=samples.map((s,i)=>s&&s.url
    ?`<div class="slot filled sample" tabindex="0" role="button" data-si="${i}" aria-label="참고 이미지 ${i+1} 크게 보기">
        <img src="${s.url}" alt="${st.adj} 참고 이미지 ${i+1}" loading="lazy" onerror="this.closest('.slot').classList.add('broken');this.remove()">
        <span class="slot-badge">예시</span>
        <span class="slot-zoom">⤢ 크게 보기</span>
      </div>`
    :`<div class="slot sample empty"><span style="font-size:10.5px;color:var(--ink3);font-weight:600">예시 준비 중</span></div>`).join('');
  const mySlot=(()=>{
    const src=imgStore[curCode][0];
    return src
    ?`<div class="slot filled" data-i="0"><img src="${src}" alt="내가 올린 이미지" onerror="this.closest('.slot').classList.add('broken');this.remove()"><span class="slot-badge mine">내 이미지</span><button class="del" data-i="0" aria-label="삭제">×</button></div>`
    :`<div class="slot" data-i="0"><span style="font-size:11px;color:var(--ink3);font-weight:700">내 이미지 추가</span><div class="acts"><button data-act="file" data-i="0">파일</button><button data-act="url" data-i="0">URL</button></div></div>`;
  })();
  const slots=sampleSlots+mySlot;

  $('result').innerHTML=`
  <div class="style-card">
    <div class="sc-hero" style="background:${hero.bg};color:${hero.fg}">
      <div class="sc-code">${curCode.split('').join(' · ')}</div>
      <div class="sc-adj">${st.adj}${st.en?`<span class="sc-en">${st.en}</span>`:''}</div>
      <div class="sc-sub">${st.sub}</div>
      <p class="sc-desc">${sentenceBreak(st.desc)}</p>
      <div class="sc-tags">${st.use.map(u=>`<span class="sc-tag">${u}</span>`).join('')}</div>
    </div>
    <div class="sc-body">

      <div class="sec sec-font">
        <div class="sec-head"><span class="sec-title">어울리는 글꼴 <span class="sec-badge">${fonts.length}종 추천</span></span><span class="sec-easy">560종 가운데 이 스타일에 맞는 것만 골랐어요</span>
          <div class="tools"><button class="chip-btn" id="fontPrev">‹ 이전</button><button class="chip-btn" id="fontNext">다음 ›</button><button class="chip-btn solid" id="fontMoreTop">＋ 더보기</button></div></div>

        <div class="font-hero" id="fontHero">
          <div class="fh-name" id="fhSample" data-fsample style="font-family:${heroFont?heroFont.family:'inherit'}">${(brandName||st.adj)}</div>
          <div class="fh-meta">
            <div class="fh-title"><b id="fhName">${heroFont?heroFont.name:'표시할 글꼴이 없어요'}</b><span class="fh-idx" id="fhIdx">${fonts.length?`${curFontIdx+1} / ${fonts.length}`:'0'}</span></div>
            <div class="fh-tags" id="fhTags">${heroFont?fontTagsHTML(heroFont):'<span class="fh-tag">관리자 → 폰트 리스트에서 이 유형의 웹폰트 오류를 확인해 주세요</span>'}</div>
          </div>
        </div>

        <div class="preview-row">
          <input class="preview-input" id="previewText" value="${(brandName||'').replace(/"/g,'&quot;')}" placeholder="브랜드 이름을 입력하면 모든 글꼴이 이 이름으로 바뀌어요" maxlength="30">
          <button type="button" class="pv-apply" id="pvApply" disabled>적용</button>
        </div>

        <div class="font-filter" id="fontFilter">${typeChips}</div>
        <div class="carousel">
          <button class="car-nav prev" id="carPrev" aria-label="이전 글꼴">‹</button>
          <div class="car-track" id="fontGrid">${fontCards}</div>
          <button class="car-nav next" id="carNext" aria-label="다음 글꼴">›</button>
        </div>
        <div class="car-dots" id="carDots"></div>
        <div class="font-note">상업용으로 사용이 가능한 무료폰트입니다.</div>
      </div>

      <div class="sec">
        <div class="sec-head"><span class="sec-title">색상 조합</span><span class="sec-easy">색을 클릭해 잠그고, 바를 클릭해 직접 조색해 보세요</span>
          <div class="tools"><button class="chip-btn solid" id="reroll">🎨 다른 조합 보기</button></div></div>
        <div class="scheme-tabs">${schemeTabs}</div>
        <div class="pal">${pal}</div>
        <div class="tuner" id="tuner"></div>

        <div class="apply-head"><span>적용해 본 모습</span>
          <div class="save-split">
            <button class="ss-main" id="saveMain">저장</button>
            <button class="ss-arrow" id="saveArrow" aria-label="저장 옵션">▾</button>
            <div class="ss-menu hidden" id="saveMenu">
              <button data-save="jpg">JPG로 저장</button>
              <button data-save="png-nobg">배경 없는 PNG</button>
              <button data-save="copy">이미지 복사</button>
              <button data-save="hex">색상 코드 복사</button>
            </div>
          </div>
        </div>
        <div class="apply-grid" id="applyPrev"></div>

        <button type="button" class="ranges-toggle" id="rangesToggle" aria-expanded="false" aria-controls="rangesWrap">
          <span>색상 범위 · 직접 조색</span><span class="rt-easy">색상 · 채도 · 명도 바를 클릭해 직접 조색</span><span class="rt-arrow">▾</span></button>
        <div class="ranges-wrap hidden" id="rangesWrap">
          <div class="ranges" id="ranges"></div>
          <div class="rb-note">${st.note}<br><b>피하세요 —</b> ${st.forbid}</div>
        </div>
      </div>

      <div class="sec">
        <div class="sec-head"><span class="sec-title">브랜드 목업 <span class="sec-badge">Canvas</span></span><span class="sec-easy">업종 목업 위에 이름 · 글꼴 · 색상이 실시간으로 합성돼요</span>
          <div class="tools"><select id="mockBiz" class="chip-btn" aria-label="업종 선택"></select><button class="chip-btn" id="mockRefresh">↺ 다시 그리기</button><select id="mockExport" class="chip-btn solid" aria-label="내보내기"><option value="">⬇ 내보내기</option><option value="png">PNG · 목업 전체</option><option value="jpg">JPG · 목업 전체</option><option value="svg-outline">SVG · 로고 윤곽선 (간판 제작용)</option><option value="svg-text">SVG · 로고 텍스트 (글꼴 필요)</option></select></div></div>
        <div class="ul-bar">
          <button class="chip-btn" id="ulPick">＋ 내 로고 올리기</button>
          <input type="file" id="ulFile" accept="image/png,image/svg+xml,image/*" hidden>
          <div id="ulCtl" class="ul-ctl hidden">
            <span class="ul-name" id="ulName">로고 파일</span>
            <label class="ul-sl"><b>크기</b><input type="range" id="ulScale" min="30" max="150" value="100"></label>
            <label class="ul-pair"><input type="checkbox" id="ulPair"><b>추천 한글 로고타입과 함께 보기</b></label>
            <button class="chip-btn" id="ulClear">제거</button>
          </div>
          <span class="ul-note" id="ulNote">배경이 투명한 PNG를 권장합니다 · 올린 파일은 이 화면에서만 쓰이고 저장되지 않습니다</span>
        </div>
        <div id="mockThumbs" class="mock-thumbs"></div>
        <div class="mock-wrap"><canvas id="mockCanvas" width="1000" height="750"></canvas></div>
        <div class="font-note">홈에서 고른 업종이 기본 적용됩니다 · 색을 다시 조합하거나 글꼴을 바꾸면 목업도 함께 바뀌어요.<br>
        <b>내보내기</b> — PNG·JPG는 목업 화면 전체를, SVG는 로고만 반듯한 원본으로 저장합니다. 간판·시트 커팅에는 <b>SVG · 로고 윤곽선</b>을 쓰세요(글꼴이 없는 컴퓨터에서도 같은 모양으로 열립니다). 직접 올린 로고는 비트맵이라 벡터로 완전히 바뀌지 않으니 원본 AI·SVG 파일을 함께 챙겨 주세요.</div>
      </div>

      <div class="sec">
        <div class="sec-head"><span class="sec-title">참고 이미지 가이드</span><span class="sec-easy">이런 사진을 모으면 스타일이 흔들리지 않아요</span></div>
        <div class="img-guide">${st.imgGuide}</div>
        <div class="kw-row">${kws}
          <button class="kw" id="openUnsplash" style="border-color:var(--green);color:var(--green-deep)">Unsplash에서 검색 ↗</button>
          <button class="kw" id="openPinterest" style="border-color:var(--green);color:var(--green-deep)">Pinterest에서 검색 ↗</button></div>
        <div class="slots" id="slots">${slots}</div>
        <div class="img-note">앞의 세 장은 이 스타일의 예시입니다 — 이미지를 누르면 <b>크게 보기</b>가 열리고, 좌우 화살표로 넘기거나 <b>출처</b>를 확인할 수 있어요. 마지막 칸에는 직접 찾은 이미지를 올려 비교해 보세요 (이 화면에서만 유지).</div>
      </div>

      <div class="sec">
        <div class="sec-head"><span class="sec-title">어울리는 디자인 스튜디오 <button type="button" class="sec-badge" onclick="openMbtiGuide()" title="16가지 스타일 전체 가이드 표 보기">브랜드 MBTI · 전체 가이드 ↗</button></span><span class="sec-easy">이 스타일과 결이 맞는 스튜디오, 로고 · 공간 제작 가이드예요</span></div>
        ${mbtiHTML(curCode)}
      </div>

      <div class="sec">
        <div class="cta-box">
          <div class="cta-top">
            <div>
              <div class="cta-eyebrow">다음 단계</div>
              <h3 class="cta-title">이 스타일로 로고까지 만들어 보세요</h3>
              <p class="cta-desc">진단 결과(스타일 · 색상 · 글꼴)를 그대로 디자인 의뢰서에 담아 전달할 수 있어요.<br>상표 등록까지 이어지는 마크인포 프리즘에서 이어서 진행하세요.</p>
            </div>
            <div class="cta-mini">
              <span class="cm-l">진단 완료</span>
              <b class="cm-code">${curCode.split('').join('·')}</b>
              <span class="cm-n">${st.adj}${st.en?` <em class="cm-en">${st.en}</em>`:''}</span>
            </div>
          </div>
          <div class="cta-actions">
            <button class="cta-primary" id="prismBtn">✦ 프리즘에 로고 의뢰하기 <em>↗</em></button>
            <button class="cta-second" id="copyBrief">📋 상담용 요약 복사</button>
          </div>
          <div class="cta-steps">
            <span><i>1</i>요약이 자동 복사됩니다</span><span class="cta-arrow">→</span>
            <span><i>2</i>프리즘 페이지가 열립니다</span><span class="cta-arrow">→</span>
            <span><i>3</i>의뢰서에 붙여 넣으면 끝</span>
          </div>
        </div>
        <div class="export-note">· 상담용 요약: 스타일 이름 · 설명 · 색상 코드 · 추천 글꼴 · 이미지 키워드가 텍스트로 복사됩니다.<br>
        · 프리즘 의뢰: 요약이 자동 복사된 뒤 프리즘 페이지가 열립니다 — 의뢰서에 붙여 넣으면 이 진단이 곧 디자인 브리프가 됩니다.</div>
      </div>
    </div>
  </div>`;
  renderRanges();
  renderApplyPreview();
  bindResultEvents();
  checkResultFonts();
  bindMockupUI();
  drawMockup();
}

/* ---------- 참고 이미지 뷰어 ---------- */
let ivIdx=0, ivList=[];
function openImgViewer(i){
  ivList=styleSamples(curCode).map((s,k)=>({...(s||{}),k})).filter(s=>s.url);
  if(!ivList.length)return;
  ivIdx=Math.max(0,ivList.findIndex(s=>s.k===i));
  if(ivIdx<0)ivIdx=0;
  let ov=$('ivOv');
  if(!ov){
    ov=document.createElement('div'); ov.id='ivOv'; ov.className='iv-ov';
    ov.innerHTML=`
      <button class="iv-close" id="ivClose" aria-label="닫기">×</button>
      <button class="iv-nav prev" id="ivPrev" aria-label="이전 이미지">‹</button>
      <figure class="iv-figure" id="ivFigure">
        <img id="ivImg" alt="">
        <figcaption class="iv-cap">
          <div class="iv-meta"><b id="ivTitle"></b><span id="ivCount"></span></div>
          <div class="iv-acts">
            <span id="ivCredit" class="iv-credit"></span>
            <a id="ivSrc" class="iv-src-btn" target="_blank" rel="noopener nofollow">출처</a>
          </div>
        </figcaption>
      </figure>
      <button class="iv-nav next" id="ivNext" aria-label="다음 이미지">›</button>`;
    document.body.appendChild(ov);
    // 바깥(오버레이·여백) 클릭 시 닫기 — 그림·캡션 내부 클릭은 유지
    ov.addEventListener('click',e=>{
      if(!e.target.closest('#ivFigure')&&!e.target.closest('.iv-nav'))closeImgViewer();
    });
    $('ivClose').onclick=closeImgViewer;
    $('ivPrev').onclick=e=>{e.stopPropagation();ivStep(-1);};
    $('ivNext').onclick=e=>{e.stopPropagation();ivStep(1);};
    document.addEventListener('keydown',e=>{
      const o=$('ivOv'); if(!o||o.style.display!=='flex')return;
      if(e.key==='Escape')closeImgViewer();
      if(e.key==='ArrowLeft')ivStep(-1);
      if(e.key==='ArrowRight')ivStep(1);
    });
  }
  ov.style.display='flex';
  document.body.style.overflow='hidden';
  renderImgViewer();
}
function ivStep(d){ ivIdx=(ivIdx+d+ivList.length)%ivList.length; renderImgViewer(); }
function renderImgViewer(){
  const s=ivList[ivIdx], st=STYLES[curCode];
  const img=$('ivImg');
  img.classList.remove('in'); img.src=s.url;
  img.alt=`${st.adj} 참고 이미지 ${ivIdx+1}`;
  requestAnimationFrame(()=>img.classList.add('in'));
  $('ivTitle').textContent=`${st.adj} · ${st.sub}`;
  $('ivCount').textContent=`${ivIdx+1} / ${ivList.length}`;
  $('ivCredit').textContent=s.credit||'';
  const a=$('ivSrc');
  if(s.src){a.style.display='';a.href=s.src;}else a.style.display='none';
  const multi=ivList.length>1;
  $('ivPrev').style.display=multi?'':'none';
  $('ivNext').style.display=multi?'':'none';
}
function closeImgViewer(){
  const o=$('ivOv'); if(o)o.style.display='none';
  document.body.style.overflow='';
}
/* ---------- 폰트 더보기: 둘러보기 팝업 ---------- */
let brFilter={type:'',mood:'',weight:'',q:''}, brShown=48, brOnlyStyle=true;
function openFontBrowse(){
  let ov=$('brOv');
  if(!ov){
    ov=document.createElement('div'); ov.id='brOv'; ov.className='br-ov';
    ov.innerHTML=`<div class="br-box" role="dialog" aria-label="폰트 둘러보기">
      <div class="br-head">
        <div><b>폰트 둘러보기</b><span id="brStat"></span></div>
        <button class="cp-x" id="brClose" aria-label="닫기">×</button>
      </div>
      <div class="br-bar">
        <input id="brQ" class="ad-search" placeholder="폰트 이름 검색…">
        <select id="brType"></select>
        <select id="brMood"></select>
        <select id="brWeight"></select>
        <label class="ad-check"><input type="checkbox" id="brOnly" checked> 이 스타일에 어울리는 것만</label>
      </div>
      <div class="br-grid" id="brGrid"></div>
      <div class="br-foot"><button class="chip-btn" id="brMore">더 보기</button>
        <span class="br-tip">고른 폰트는 결과 화면에 추가됩니다 · 「다시 고르기」를 누르면 사라져요</span></div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click',e=>{if(e.target===ov)closeFontBrowse();});
    $('brClose').onclick=closeFontBrowse;
    $('brType').innerHTML='<option value="">전체 형태</option>'+CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
    $('brMood').innerHTML='<option value="">전체 인상</option>'+CLS_AXES.mood.opts.map(t=>`<option>${t}</option>`).join('');
    $('brWeight').innerHTML='<option value="">전체 웨이트</option>'+CLS_AXES.weight.opts.map(t=>`<option>${t}</option>`).join('');
    ['brQ','brType','brMood','brWeight'].forEach(id=>$(id).oninput=()=>{brShown=48;renderBrowse();});
    $('brOnly').onchange=()=>{brOnlyStyle=$('brOnly').checked;brShown=48;renderBrowse();};
    $('brMore').onclick=()=>{brShown+=48;renderBrowse();};
  }
  ov.style.display='flex';
  brShown=48; renderBrowse();
}
function closeFontBrowse(){const o=$('brOv');if(o)o.style.display='none';}
function browseList(){
  const q=($('brQ').value||'').trim().toLowerCase();
  const ty=$('brType').value, mo=$('brMood').value, we=$('brWeight').value;
  const inUse=new Set((FONTMAP[curCode]?.fonts||[]).map(f=>f.family));
  const list=FONT_DB.filter(f=>{
    if(f.wfError||f.hideFromSearch||!f.css)return false;
    if(inUse.has(f.family))return false;
    if(q&&!f.name.toLowerCase().includes(q))return false;
    if(ty&&f.cls.type!==ty)return false;
    if(mo&&!(f.cls.mood||[]).includes(mo))return false;
    if(we&&f.cls.weight!==we)return false;
    if(brOnlyStyle&&!(f.style16||[]).includes(curCode))return false;
    return true;
  });
  if(!brOnlyStyle)return list;
  return list.map(f=>({f,r:fontRankFor(f,curCode),c:moodConflict(f.cls.mood||[])?1:0}))
    .sort((a,b)=>(a.r-b.r)||(a.c-b.c)||a.f.name.localeCompare(b.f.name)).map(x=>x.f);
}
function renderBrowse(){
  const list=browseList(), show=list.slice(0,brShown);
  show.forEach(injectFontCss);
  const st=STYLES[curCode];
  $('brStat').textContent=`${list.length}종${brOnlyStyle?` · ${st.adj} 기준`:' · 전체'}`;
  $('brMore').style.display=list.length>show.length?'':'none';
  $('brGrid').innerHTML=show.length?show.map(f=>`
    <button class="br-card" data-fam="${f.family.replace(/"/g,'&quot;')}">
      <div class="br-sample" style="font-family:${f.family}">${brandName||st.adj}</div>
      <div class="br-name">${f.name}</div>
      <div class="fc-tags">${fontTagsHTML(f,true)}</div>
    </button>`).join('')
    :`<div class="br-empty">조건에 맞는 폰트가 없어요. 필터를 풀거나 '이 스타일에 어울리는 것만'을 꺼 보세요.</div>`;
  $('brGrid').querySelectorAll('.br-card').forEach(c=>c.onclick=()=>addFontFromBrowse(c.dataset.fam));
}
function addFontFromBrowse(fam){
  const src=FONT_DB.find(f=>f.family===fam); if(!src)return;
  const arr=FONTMAP[curCode].fonts;
  if(arr.some(f=>f.family===fam)){toast('이미 목록에 있어요');return;}
  injectFontCss(src);
  arr.push({name:src.name,family:src.family,css:src.css,type:src.cls.type,weight:src.cls.weight,mood:(src.cls.mood||[]).slice(),added:true});
  curFontIdx=arr.length-1;
  closeFontBrowse();
  renderStyle();
  toast(src.name+' 을 추가했어요');
}
/* ---------- 적용 미리보기 + 이미지 저장 ---------- */
function roleColors(){
  const p=curPal;
  const byRole=r=>p.find(c=>c.role.indexOf(r)>-1)||p[0];
  return {main:byRole('주조'),sub:byRole('보조'),acc:byRole('포인트'),bg:byRole('바탕'),ink:byRole('글자')};
}
function renderApplyPreview(){
  const box=$('applyPrev'); if(!box)return;
  const c=roleColors(), st=STYLES[curCode];
  const fonts=FONTMAP[curCode].fonts, hf=fonts[curFontIdx]||fonts[0];
  const name=brandName||st.adj;
  const onBg=yiq(c.bg.hex)>150?c.ink.hex:'#FFFFFF';
  const btnText=yiq(c.acc.hex)>150?'#1B2A28':'#FFFFFF';
  box.innerHTML=`
    <div class="ap-card" id="apShot">
      <div class="ap-logo" style="background:${c.bg.hex};color:${onBg}">
        <span class="ap-eyebrow" style="background:${c.sub.hex};color:${yiq(c.sub.hex)>150?'#1B2A28':'#FFFFFF'}">${curCode.split('').join('·')}</span>
        <div class="lg" style="font-family:${hf?hf.family:'inherit'};color:${c.main.hex}">${name}</div>
        <div class="tag">${st.sub}</div>
        <div class="ap-rule" style="background:${c.sub.hex}"></div>
        <div class="ap-btnrow">
          <div class="btn" style="background:${c.acc.hex};color:${btnText}">브랜드 매트릭스</div>
          <div class="btn ghost" style="border:1.5px solid ${c.sub.hex};color:${c.sub.hex}">자세히 보기</div>
        </div>
      </div>
    </div>
    <div class="ap-card ap-card-mini">
      <div class="ap-mini" style="background:${c.main.hex};color:${yiq(c.main.hex)>150?'#1B2A28':'#FFFFFF'}">
        <span class="t" style="font-family:${hf?hf.family:'inherit'}">${name}</span>
        <span class="b">주조색을 배경으로 쓸 때의 모습입니다.</span>
        <span class="chipline"><i style="background:${c.acc.hex}"></i><i style="background:${c.sub.hex}"></i><i style="background:${c.bg.hex}"></i></span>
      </div>
      <div class="ap-mini" style="background:${c.bg.hex};color:${c.ink.hex};border-top:1px solid rgba(0,0,0,.07)">
        <span class="t" style="font-family:${hf?hf.family:'inherit'}">${name}</span>
        <span class="b">바탕색 위 본문 글자의 가독성을 확인하세요.</span>
      </div>
    </div>`;
  bindSaveMenu();
}
function bindSaveMenu(){
  const menu=$('saveMenu'); if(!menu)return;
  $('saveMain').onclick=()=>saveShot('png');
  $('saveArrow').onclick=e=>{e.stopPropagation();menu.classList.toggle('hidden');};
  menu.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{menu.classList.add('hidden');
    const k=b.dataset.save;
    if(k==='hex')return copyHexSet();
    if(k==='copy')return saveShot('copy');
    saveShot(k);});
  document.addEventListener('click',()=>menu.classList.add('hidden'),{once:true});
}
function copyHexSet(){
  const txt=curPal.map(c=>`${c.role} ${c.hex}`).join('\n');
  navigator.clipboard?.writeText(txt).then(()=>toast('색상 코드를 복사했어요'));
}
async function buildShotCanvas(transparent){
  const W=1200,H=1080,S=2;
  const cv=document.createElement('canvas'); cv.width=W*S; cv.height=H*S;
  const x=cv.getContext('2d'); x.scale(S,S);
  const c=roleColors(), st=STYLES[curCode];
  const fonts=FONTMAP[curCode].fonts, hf=fonts[curFontIdx]||fonts[0];
  const fam=(hf?hf.family:'sans-serif').replace(/^["']|["']$/g,'');
  const name=brandName||st.adj;
  if(!transparent){x.fillStyle=c.bg.hex;x.fillRect(0,0,W,H);}
  const shotW=hf?nearestWeight(hf.css,700):700;
  try{if(document.fonts)await document.fonts.load(`${shotW} 76px ${hf?hf.family:'sans-serif'}`,name);}catch(e){}
  // 로고 영역
  x.fillStyle=c.main.hex;
  x.font=`${shotW} 76px ${fam}, 'Pretendard', sans-serif`;
  x.textBaseline='alphabetic';
  x.fillText(name,90,268);
  x.fillStyle=transparent?c.main.hex:c.ink.hex;
  x.globalAlpha=.82;
  x.font=`600 24px 'Pretendard', sans-serif`;
  x.fillText(st.sub,90,312);
  x.globalAlpha=1;
  // 버튼
  const bw=196,bh=54,bx=90,by=352;
  x.fillStyle=c.acc.hex;
  if(x.roundRect){x.beginPath();x.roundRect(bx,by,bw,bh,27);x.fill();}else x.fillRect(bx,by,bw,bh);
  x.fillStyle=yiq(c.acc.hex)>150?'#1B2A28':'#FFFFFF';
  x.font=`800 19px 'Pretendard', sans-serif`;
  x.fillText('브랜드 매트릭스',bx+30,by+35);
  // 보조색: 코드 배지 + 구분선 + 아웃라인 버튼
  x.fillStyle=c.sub.hex;
  if(x.roundRect){x.beginPath();x.roundRect(90,166,150,30,15);x.fill();}else x.fillRect(90,166,150,30);
  x.fillStyle=yiq(c.sub.hex)>150?'#1B2A28':'#FFFFFF';
  x.font=`800 14px 'Pretendard', sans-serif`;
  x.fillText(curCode.split('').join(' · '),108,186);
  x.fillStyle=c.sub.hex; x.fillRect(90,330,72,4);
  x.strokeStyle=c.sub.hex; x.lineWidth=2;
  if(x.roundRect){x.beginPath();x.roundRect(bx+bw+14,by,168,bh,27);x.stroke();}
  x.fillStyle=c.sub.hex;
  x.font=`800 18px 'Pretendard', sans-serif`;
  x.fillText('자세히 보기',bx+bw+52,by+35);
  // 팔레트 스트립
  const sw=136,sh=136,sy=452,gap=14;
  curPal.forEach((col,i)=>{
    const sx=90+i*(sw+gap);
    x.fillStyle=col.hex;
    if(x.roundRect){x.beginPath();x.roundRect(sx,sy,sw,sh-40,12);x.fill();}else x.fillRect(sx,sy,sw,sh-40);
    x.fillStyle=transparent?c.main.hex:c.ink.hex;
    x.globalAlpha=.72;
    x.font=`700 15px 'Pretendard', sans-serif`;
    x.fillText(col.hex,sx+2,sy+118);
    x.globalAlpha=1;
  });
  // ---- 하단: 주조색 배경 시안 + 본문 가독성 시안 ----
  const rr=(px,py,pw,ph,r)=>{if(x.roundRect){x.beginPath();x.roundRect(px,py,pw,ph,r);x.fill();}else x.fillRect(px,py,pw,ph);};
  const cardY=608, cardH=252, cw=(W-180-24)/2;
  // (1) 주조색 배경
  x.fillStyle=c.main.hex; rr(90,cardY,cw,cardH,18);
  const onMain=yiq(c.main.hex)>150?'#1B2A28':'#FFFFFF';
  x.fillStyle=onMain;
  x.font=`800 40px ${fam}, 'Pretendard', sans-serif`;
  x.fillText(name,126,cardY+80);
  x.globalAlpha=.85;
  x.font=`600 17px 'Pretendard', sans-serif`;
  x.fillText('주조색을 배경으로 쓸 때의 모습',126,cardY+114);
  x.globalAlpha=1;
  [c.acc,c.sub,c.bg].forEach((col,i)=>{x.fillStyle=col.hex;rr(126+i*40,cardY+142,30,30,8);});
  x.fillStyle=onMain; x.globalAlpha=.6;
  x.font=`700 14px 'Pretendard', sans-serif`;
  x.fillText('포인트 · 보조 · 바탕',126,cardY+204);
  x.globalAlpha=1;
  // (2) 본문 가독성
  const bx2=90+cw+24;
  x.fillStyle=c.bg.hex; rr(bx2,cardY,cw,cardH,18);
  x.strokeStyle='rgba(0,0,0,.08)'; x.lineWidth=1;
  if(x.roundRect){x.beginPath();x.roundRect(bx2,cardY,cw,cardH,18);x.stroke();}
  x.fillStyle=c.main.hex;
  x.font=`800 30px ${fam}, 'Pretendard', sans-serif`;
  x.fillText(name,bx2+36,cardY+70);
  x.fillStyle=c.ink.hex;
  x.font=`400 17px 'Pretendard', sans-serif`;
  ['바탕색 위 본문 글자의 가독성을 확인하세요.','작은 글씨도 충분히 읽히는지 보는 것이','실제 적용 단계에서 가장 중요합니다.'].forEach((ln,i)=>{
    x.fillText(ln,bx2+36,cardY+112+i*30);
  });
  x.fillStyle=c.acc.hex; rr(bx2+36,cardY+196,168,42,21);
  x.fillStyle=yiq(c.acc.hex)>150?'#1B2A28':'#FFFFFF';
  x.font=`800 16px 'Pretendard', sans-serif`;
  x.fillText('브랜드 매트릭스',bx2+52,cardY+223);
  // 캡션
  x.fillStyle=transparent?c.main.hex:c.ink.hex;
  x.globalAlpha=.5;
  x.font=`600 16px 'Pretendard', sans-serif`;
  x.fillText(`${st.adj} · ${curCode.split('').join('·')} · ${hf?hf.name:''}  |  MARKINFO 브랜드 스타일 매트릭스 16`,90,1010);
  x.globalAlpha=1;
  return cv;
}
async function saveShot(kind){
  try{
    toast('이미지를 만들고 있어요…');
    const cv=await buildShotCanvas(kind==='png-nobg');
    const base=`${(brandName||STYLES[curCode].adj)}_${curCode}`;
    if(kind==='copy'){
      if(!navigator.clipboard||!window.ClipboardItem){toast('이 브라우저는 이미지 복사를 지원하지 않아요 — 저장을 이용해 주세요');return;}
      const blob=await new Promise(r=>cv.toBlob(r,'image/png'));
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      toast('이미지를 클립보드에 복사했어요');return;
    }
    const isJpg=kind==='jpg';
    let out=cv;
    if(isJpg){const f=document.createElement('canvas');f.width=cv.width;f.height=cv.height;
      const fx=f.getContext('2d');fx.fillStyle='#FFFFFF';fx.fillRect(0,0,f.width,f.height);fx.drawImage(cv,0,0);out=f;}
    const a=document.createElement('a');
    a.download=`${base}${kind==='png-nobg'?'_투명':''}.${isJpg?'jpg':'png'}`;
    a.href=out.toDataURL(isJpg?'image/jpeg':'image/png',isJpg?0.92:undefined);
    a.click();
    toast(`${a.download} 저장 완료`);
  }catch(e){toast('이미지 생성에 실패했어요');}
}
/* ---------- HSB 범위 시각화 ---------- */
function chromIdx(){return curScheme==='acc'?2:0;} // 배색 기준색(포인트 방식은 강조색)
function anchorSwatch(){return curPal[chromIdx()];}
function clampHueToRanges(h,ranges){
  h=((h%360)+360)%360;
  if(inHue(h,ranges))return h;
  let best=ranges[0][0],bd=1e9;
  ranges.forEach(([a,b])=>{[a,b].forEach(e=>{const d=Math.min(Math.abs(h-e),360-Math.abs(h-e));if(d<bd){bd=d;best=e;}});});
  return best;
}
function renderRanges(){
  const st=STYLES[curCode], box=$('ranges');
  const ref=anchorSwatch();                      // ★ 실제 팔레트 기준색과 동기화
  const mid=Math.round(ref.h);
  const hueStops=[]; for(let i=0;i<=36;i++) hueStops.push(`${hsb2hex(i*10,65,90)} ${(i/36*100).toFixed(1)}%`);
  const hueMasks=(()=>{
    const spans=st.hue.map(([a,b])=>a<=b?[[a,b]]:[[a,360],[0,b]]).flat().sort((x,y)=>x[0]-y[0]);
    let cur=0,out='';
    spans.forEach(([a,b])=>{if(a>cur)out+=`<span class="mask" style="left:${cur/3.6}%;width:${(a-cur)/3.6}%"></span>`;cur=b;});
    if(cur<360)out+=`<span class="mask" style="left:${cur/3.6}%;width:${(360-cur)/3.6}%"></span>`;
    return out+st.hue.map(([a,b])=>a<=b
      ?`<span class="win" style="left:${a/3.6}%;width:${(b-a)/3.6}%"></span>`
      :`<span class="win" style="left:${a/3.6}%;width:${(360-a)/3.6}%"></span><span class="win" style="left:0%;width:${b/3.6}%"></span>`).join('');
  })();
  const bar=(cls,grad,lo,hi,dots)=>`
    <div class="rb rb-live" data-bar="${cls}" title="클릭해서 조색" style="background:linear-gradient(90deg,${grad})">
      <span class="mask" style="left:0;width:${lo}%"></span>
      <span class="mask" style="left:${hi}%;width:${100-hi}%"></span>
      <span class="win" style="left:${lo}%;width:${hi-lo}%"></span>
      ${dots}
    </div>`;
  const sGrad=[0,25,50,75,100].map(v=>hsb2hex(mid,v,Math.max(ref.b,45))).join(',');
  const bGrad=[0,25,50,75,100].map(v=>hsb2hex(mid,Math.max(ref.s,30),v)).join(',');
  const hueRangeTxt=st.hue.map(([a,b])=>`${a}°–${b}°`).join(' · ');
  const roleName=curScheme==='acc'?'포인트':'주조색';
  box.innerHTML=`
    <div>
      <div class="rb-label"><span>색상 <span class="easy">어떤 색 계열인지 · 기준: ${roleName}</span></span><span class="val">허용 ${hueRangeTxt}</span></div>
      <div class="rb rb-live" data-bar="h" title="클릭해서 조색" style="background:linear-gradient(90deg,${hueStops.join(',')})">${hueMasks}
        <span class="dot" style="left:${ref.h/3.6}%;background:${ref.hex}"></span></div>
    </div>
    <div>
      <div class="rb-label"><span>채도 <span class="easy">색이 쨍한 정도</span></span><span class="val">허용 ${st.sat[0]}–${st.sat[1]}</span></div>
      ${bar('s',sGrad,st.sat[0],st.sat[1],`<span class="dot" style="left:${ref.s}%;background:${ref.hex}"></span>`)}
    </div>
    <div>
      <div class="rb-label"><span>명도 <span class="easy">색의 밝기</span></span><span class="val">허용 ${st.bri[0]}–${st.bri[1]}</span></div>
      ${bar('b',bGrad,st.bri[0],st.bri[1],`<span class="dot" style="left:${ref.b}%;background:${ref.hex}"></span>`)}
    </div>`;
  box.querySelectorAll('.rb-live').forEach(el=>{
    el.onclick=e=>{
      const r=el.getBoundingClientRect(), t=(e.clientX-r.left)/r.width;
      const st2=STYLES[curCode];
      if(el.dataset.bar==='h') curAnchor.h=clampHueToRanges(t*360,st2.hue);
      if(el.dataset.bar==='s') curAnchor.s=clamp(t*100,st2.sat[0],st2.sat[1]);
      if(el.dataset.bar==='b') curAnchor.b=clamp(t*100,st2.bri[0],st2.bri[1]);
      const np=genPalette(st2,curScheme,curAnchor);
      curPal=np.map((c,i)=>curLocks[i]?curPal[i]:c);
      renderStyle();
    };
  });
}
/* ----- 스와치 미세 조정 (어도비 컬러식 개별 편집 · 범위 이탈 즉시 경고) ----- */
let tuneIdx=null;
function updateSwatchDom(i){
  const c=curPal[i];
  const sw=document.querySelector(`.sw[data-i="${i}"]`); if(!sw)return;
  const chip=sw.querySelector('.sw-chip');
  chip.style.background=c.hex;
  chip.style.borderBottom=c.b>93?'1px solid var(--line)':'none';
  const hx=sw.querySelector('.hex'); hx.textContent=c.hex; hx.dataset.hex=c.hex;
}
function tuneWarn(i){
  const st=STYLES[curCode], c=curPal[i];
  const chrom=(i===0&&curScheme!=='acc')||(i===2);
  if(!chrom) return '';
  const out=[];
  if(!inHue(c.h,st.hue)) out.push('색상');
  if(c.s<st.sat[0]-0.5||c.s>st.sat[1]+0.5) out.push('채도');
  if(c.b<st.bri[0]-0.5||c.b>st.bri[1]+0.5) out.push('명도');
  return out.length?`⚠ ${out.join('·')}이(가) 이 스타일의 허용 범위를 벗어났어요 — 저장은 되지만 스타일에서 멀어집니다`:'✓ 허용 범위 안입니다';
}
function openTuner(i){
  if(tuneIdx===i){closeTuner();return;}
  tuneIdx=i;
  const c=curPal[i];
  let pop=$('cpPop');
  if(!pop){
    pop=document.createElement('div');
    pop.id='cpPop'; pop.className='cp-pop';
    document.body.appendChild(pop);
  }
  pop.innerHTML=`
    <div class="cp-head"><b>${c.role}</b><span class="cp-hex" id="cpHex">${c.hex}</span>
      <button class="cp-x" id="cpClose" aria-label="닫기">×</button></div>
    <div class="cp-sv" id="cpSV"><span class="cp-cursor" id="cpCur"></span></div>
    <div class="cp-band" id="cpBand"></div>
    <div class="cp-slider"><input type="range" min="0" max="360" value="${Math.round(c.h)}" id="cpH" aria-label="색상"></div>
    <label class="cp-hexrow"><span>HEX</span><input id="cpHexIn" value="${c.hex}" maxlength="7" spellcheck="false"></label>
    <div class="cp-nums">
      <label>S<input type="number" min="0" max="100" value="${Math.round(c.s)}" data-k="s"></label>
      <label>B<input type="number" min="0" max="100" value="${Math.round(c.b)}" data-k="b"></label>
    </div>
    <div class="cp-warn" id="cpWarn">${tuneWarn(i)}</div>
    <div class="cp-foot"><button class="chip-btn" id="cpReset">범위 안으로</button><button class="chip-btn solid" id="cpDone">완료</button></div>`;
  // 위치: 해당 스와치 아래
  const sw=document.querySelector(`.sw[data-i="${i}"]`);
  const r=sw?sw.getBoundingClientRect():{left:innerWidth/2-120,bottom:innerHeight/2,width:0};
  pop.style.display='block';
  const pw=248, left=Math.min(Math.max(8,r.left+r.width/2-pw/2),innerWidth-pw-8);
  pop.style.left=left+'px';
  pop.style.top=(r.bottom+window.scrollY+8)+'px';
  const paint=()=>{
    const cc=curPal[tuneIdx];
    $('cpSV').style.background=`linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,${hsb2hex(cc.h,100,100)})`;
    $('cpCur').style.left=cc.s+'%';
    $('cpCur').style.top=(100-cc.b)+'%';
    $('cpCur').style.background=cc.hex;
    $('cpHex').textContent=cc.hex;
    $('cpWarn').innerHTML=tuneWarn(tuneIdx);
    pop.querySelectorAll('.cp-nums input').forEach(inp=>{inp.value=Math.round(cc[inp.dataset.k]);});
    $('cpH').value=Math.round(cc.h);
    if(document.activeElement!==$('cpHexIn'))$('cpHexIn').value=cc.hex;
  };
  const commit=()=>{
    const cc=curPal[tuneIdx];
    cc.hex=hsb2hex(cc.h,cc.s,cc.b);
    curLocks[tuneIdx]=true;
    const chip=document.querySelector(`.sw-chip[data-i="${tuneIdx}"]`);
    if(chip&&!chip.querySelector('.lockmark'))chip.innerHTML='<span class="lockmark">🔒</span>';
    updateSwatchDom(tuneIdx);
    renderRanges(); renderApplyPreview();
    paint();
  };
  const sv=$('cpSV');
  const pick=e=>{
    const b=sv.getBoundingClientRect();
    const x=Math.min(1,Math.max(0,((e.touches?e.touches[0].clientX:e.clientX)-b.left)/b.width));
    const y=Math.min(1,Math.max(0,((e.touches?e.touches[0].clientY:e.clientY)-b.top)/b.height));
    const cc=curPal[tuneIdx]; cc.s=x*100; cc.b=(1-y)*100; commit();
  };
  let dragging=false;
  sv.onmousedown=e=>{dragging=true;pick(e);};
  window.addEventListener('mousemove',e=>{if(dragging)pick(e);});
  window.addEventListener('mouseup',()=>{dragging=false;});
  sv.ontouchstart=e=>{pick(e);e.preventDefault();};
  sv.ontouchmove=e=>{pick(e);e.preventDefault();};
  $('cpH').oninput=e=>{curPal[tuneIdx].h=+e.target.value;commit();};
  pop.querySelectorAll('.cp-nums input').forEach(inp=>inp.oninput=()=>{
    const k=inp.dataset.k, max=k==='h'?360:100;
    curPal[tuneIdx][k]=Math.min(max,Math.max(0,+inp.value||0));commit();});
  $('cpHexIn').oninput=e=>{
    const v=e.target.value.trim().replace(/^#?/,'#');
    if(!/^#[0-9a-fA-F]{6}$/.test(v))return;
    const n=parseInt(v.slice(1),16), r=(n>>16)/255, g=((n>>8)&255)/255, b=(n&255)/255;
    const mx=Math.max(r,g,b), mn=Math.min(r,g,b), df=mx-mn;
    let hh=0;
    if(df){ if(mx===r)hh=60*(((g-b)/df)%6); else if(mx===g)hh=60*((b-r)/df+2); else hh=60*((r-g)/df+4); }
    const cc=curPal[tuneIdx];
    cc.h=((hh%360)+360)%360; cc.s=mx?df/mx*100:0; cc.b=mx*100;
    commit();
  };
  $('cpClose').onclick=closeTuner;
  $('cpDone').onclick=closeTuner;
  $('cpReset').onclick=()=>{
    const st=STYLES[curCode], cc=curPal[tuneIdx];
    cc.h=clampHueToRanges(cc.h,st.hue);
    cc.s=clamp(cc.s,st.sat[0],st.sat[1]);
    cc.b=clamp(cc.b,st.bri[0],st.bri[1]);
    commit(); toast('허용 범위 안으로 맞췄어요');
  };
  paint();
  setTimeout(()=>document.addEventListener('mousedown',outsideClose),0);
}
function outsideClose(e){
  const pop=$('cpPop');
  if(!pop||pop.style.display==='none')return;
  if(pop.contains(e.target)||e.target.closest('.tune-btn'))return;
  closeTuner();
}
function closeTuner(){
  tuneIdx=null;
  const pop=$('cpPop');
  if(pop)pop.style.display='none';
  document.removeEventListener('mousedown',outsideClose);
}

/* ---------- result events ---------- */
function bindResultEvents(){
  const rt=$('rangesToggle');
  if(rt)rt.onclick=()=>{
    const w=$('rangesWrap'), open=w.classList.contains('hidden');
    w.classList.toggle('hidden',!open);
    rt.setAttribute('aria-expanded',open?'true':'false');
  };
  $('reroll').onclick=()=>{curAnchor={h:null,s:null,b:null};const anyLock=curLocks.some(x=>x);curPal=anyLock?harmonize(STYLES[curCode],curScheme):genPalette(STYLES[curCode],curScheme,curAnchor);renderStyle();toast(anyLock?'고정한 색에 어울리게 나머지를 다시 골랐어요':'허용 범위 안에서 새 조합을 만들었어요');};
  document.querySelectorAll('.scheme-tab').forEach(b=>b.onclick=()=>{
    if(b.dataset.scheme===curScheme)return;
    // v13.5: 배색 방식만 바꾸고 색은 유지 — 현재 기준색을 앵커로 잡아 결정적으로 재배치한다
    const st=STYLES[curCode], prev=curPal?curPal[chromIdx()]:null;
    if(prev){
      curAnchor={h:clampHueToRanges(prev.h,st.hue),
                 s:clamp(prev.s,st.sat[0],st.sat[1]),
                 b:clamp(prev.b,st.bri[0],st.bri[1])};
    }
    curScheme=b.dataset.scheme;
    curPal=curLocks.some(x=>x)?harmonize(st,curScheme):genPalette(st,curScheme,curAnchor);
    renderStyle();
    toast('같은 기준색으로 배색 방식만 바꿨어요 · 새 조합은 「다른 조합 보기」');});
  document.querySelectorAll('.sw .hex').forEach(b=>b.onclick=e=>{e.stopPropagation();
    navigator.clipboard?.writeText(b.dataset.hex).then(()=>toast(b.dataset.hex+' 복사됨'));});
  document.querySelectorAll('.sw-chip').forEach(ch=>ch.onclick=()=>{
    const i=+ch.dataset.i;curLocks[i]=!curLocks[i];
    ch.innerHTML=curLocks[i]?'<span class="lockmark">🔒</span>':'';
    toast(curLocks[i]?curPal[i].role+' 고정 — 이 색에 어울리게 나머지가 조색돼요':curPal[i].role+' 고정 해제');});
  document.querySelectorAll('.tune-btn').forEach(b=>b.onclick=()=>openTuner(+b.dataset.i));
  // v0.16.0: 입력 즉시 반영하지 않고 「적용」을 눌러야 반영한다.
  // 적용된 값과 같아지면 버튼은 다시 비활성으로 돌아간다.
  const pv=$('previewText'), pb=$('pvApply');
  const syncApplyBtn=()=>{ if(pb)pb.disabled = pv.value.trim()===(brandName||''); };
  const applyBrand=()=>{
    const v=pv.value.trim();
    if(v===(brandName||'')){syncApplyBtn();return;}
    brandName=v;
    const t=brandName||STYLES[curCode].adj;
    document.querySelectorAll('#result [data-fsample]').forEach(el=>{el.textContent=t;});
    const bi=$('brandNameInput'); if(bi)bi.value=brandName;
    renderApplyPreview();
    drawMockup();
    syncApplyBtn();
    toast(brandName?`'${brandName}'(으)로 미리보기를 바꿨어요`:'브랜드 이름을 지웠어요');
  };
  pv.oninput=syncApplyBtn;
  pv.onkeydown=e=>{ if(e.key==='Enter'){e.preventDefault();applyBrand();} };
  if(pb)pb.onclick=applyBrand;
  syncApplyBtn();
  // ---- 캐러셀: 선택 시 DOM 전체를 다시 만들지 않고 필요한 부분만 갱신 ----
  const track=$('fontGrid');
  const visibleCards=()=>[...track.querySelectorAll('.font-card:not(.fc-more):not(.hidden)')];
  const allSlots=()=>[...track.querySelectorAll('.font-card:not(.hidden)')]; // 더보기 카드까지 포함
  // 선택한 카드가 화면 밖일 때만 최소 거리로 스크롤 (제자리면 움직이지 않음)
  const revealCard=(i,smooth,el)=>{
    const t=el||track.querySelector(`.font-card[data-i="${i}"]`); if(!t)return;
    const tl=t.offsetLeft, tr=tl+t.offsetWidth;
    const vl=track.scrollLeft, vr=vl+track.clientWidth;
    let to=null;
    if(tl<vl+4) to=Math.max(0,tl-8);
    else if(tr>vr-4) to=Math.min(track.scrollWidth-track.clientWidth,tr-track.clientWidth+8);
    if(to!==null)track.scrollTo({left:to,behavior:smooth?'smooth':'auto'});
  };
  const syncCarUI=()=>{
    track.querySelectorAll('.font-card:not(.fc-more)').forEach(c=>c.classList.toggle('on',+c.dataset.i===curFontIdx));
    $('carDots').querySelectorAll('.car-dot').forEach(d=>d.classList.toggle('on',+d.dataset.i===curFontIdx));
    const f=FONTMAP[curCode].fonts[curFontIdx];
    if(!f)return;
    const total=FONTMAP[curCode].fonts.length;
    $('fhSample').style.fontFamily=f.family;
    $('fhName').textContent=f.name;
    $('fhIdx').textContent=`${curFontIdx+1} / ${total}`;
    $('fhTags').innerHTML=fontTagsHTML(f);
    renderApplyPreview();
  };
  const pickFont=(i,smooth)=>{
    const total=FONTMAP[curCode].fonts.length;
    curFontIdx=(i+total)%total;
    syncCarUI();
    revealCard(curFontIdx,smooth!==false);
    drawMockup();
  };
  window.__pickFont=pickFont;
  track.querySelectorAll('.font-card:not(.fc-more)').forEach(c=>c.onclick=()=>{atMore=false;pickFont(+c.dataset.i);});
  if($('fcMore'))$('fcMore').onclick=openFontBrowse;
  if($('fontMoreTop'))$('fontMoreTop').onclick=openFontBrowse;
  let atMore=false; // '더보기' 카드에 머무는 중인지
  const step=dir=>{
    const slots=allSlots(); if(!slots.length)return;
    const cs=visibleCards(); if(!cs.length)return;
    const idxs=cs.map(c=>+c.dataset.i);
    // 더보기에 머무는 상태에서 다음 → 첫 폰트로, 이전 → 마지막 폰트로
    if(atMore){ atMore=false; pickFont(dir>0?idxs[0]:idxs[idxs.length-1]); return; }
    let p=slots.findIndex(c=>!c.classList.contains('fc-more')&&+c.dataset.i===curFontIdx);
    if(p<0)p=0;
    const np=p+dir;
    // 마지막 폰트에서 '다음'을 누르면 더보기 카드를 먼저 보여준다
    if(np>=0&&np<slots.length&&slots[np].classList.contains('fc-more')){
      atMore=true;
      revealCard(null,true,slots[np]);
      slots[np].classList.add('pulse');
      setTimeout(()=>slots[np].classList.remove('pulse'),900);
      return;
    }
    let q=idxs.indexOf(curFontIdx); if(q<0)q=0;
    pickFont(idxs[(q+dir+idxs.length)%idxs.length]);};
  $('fontNext').onclick=()=>step(1);
  $('fontPrev').onclick=()=>step(-1);
  $('carPrev').onclick=()=>step(-1);
  $('carNext').onclick=()=>step(1);
  $('carDots').innerHTML=visibleCards().map(c=>`<button class="car-dot${+c.dataset.i===curFontIdx?' on':''}" data-i="${c.dataset.i}" aria-label="${+c.dataset.i+1}번째 글꼴"></button>`).join('');
  $('carDots').querySelectorAll('.car-dot').forEach(d=>d.onclick=()=>pickFont(+d.dataset.i));
  // 최초 렌더 직후엔 애니메이션 없이 위치만 맞춘다
  const carEl=track.closest('.carousel');
  const updEnd=()=>{if(carEl)carEl.classList.toggle('at-end',track.scrollLeft+track.clientWidth>=track.scrollWidth-4);};
  track.onscroll=updEnd;
  requestAnimationFrame(()=>{revealCard(curFontIdx,false);updEnd();});
  document.querySelectorAll('.fchip').forEach(c=>c.onclick=()=>{
    fontTypeFilter=c.dataset.type;
    const fs=FONTMAP[curCode].fonts;
    if(fontTypeFilter!=='전체'&&fs[curFontIdx]&&fs[curFontIdx].type!==fontTypeFilter){
      const ni=fs.findIndex(f=>f.type===fontTypeFilter);
      if(ni>=0)curFontIdx=ni;
    }
    renderStyle();});
  document.querySelectorAll('.kw[data-q]').forEach(b=>b.onclick=()=>window.open('https://unsplash.com/s/photos/'+encodeURIComponent(b.dataset.q),'_blank'));
  $('openUnsplash').onclick=()=>window.open('https://unsplash.com/s/photos/'+encodeURIComponent(STYLES[curCode].kw[0][1]),'_blank');
  $('openPinterest').onclick=()=>window.open('https://www.pinterest.com/search/pins/?q='+encodeURIComponent(STYLES[curCode].kw[0][1]),'_blank');
  // slots
  document.querySelectorAll('.slot.sample').forEach(s=>{
    const open=()=>openImgViewer(+s.dataset.si);
    s.onclick=open;
    s.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
  });
  document.querySelectorAll('.slot:not(.sample)').forEach(slot=>{
    const i=+slot.dataset.i;
    slot.querySelectorAll('[data-act]').forEach(btn=>btn.onclick=e=>{
      e.stopPropagation();
      if(btn.dataset.act==='file'){pendingSlot=i;const f=$('fileInput');f.value='';f.click();}
      else{const u=prompt('이미지 주소(URL)를 붙여 넣어 주세요');if(u){imgStore[curCode][i]=u.trim();renderStyle();}}
    });
    const del=slot.querySelector('.del');
    if(del)del.onclick=e=>{e.stopPropagation();imgStore[curCode][i]=null;renderStyle();};
    slot.ondragover=e=>{e.preventDefault();slot.classList.add('drag');};
    slot.ondragleave=()=>slot.classList.remove('drag');
    slot.ondrop=e=>{e.preventDefault();slot.classList.remove('drag');
      const f=[...e.dataTransfer.files].find(x=>x.type.startsWith('image/'));
      if(f){const r=new FileReader();r.onload=()=>{imgStore[curCode][i]=r.result;renderStyle();};r.readAsDataURL(f);}};
  });
  $('copyBrief').onclick=copyBrief;
  $('prismBtn').onclick=()=>{copyBrief();setTimeout(()=>window.open(PRISM_URL,'_blank'),150);toast('요약을 복사했어요 — 프리즘 의뢰서에 붙여 넣어 주세요');};
}
let pendingSlot=-1;
$('fileInput').onchange=function(){
  const f=this.files[0];
  if(f&&pendingSlot>-1&&curCode){const r=new FileReader();r.onload=()=>{imgStore[curCode][pendingSlot]=r.result;renderStyle();};r.readAsDataURL(f);}
};

/* ---------- exports ---------- */
function strengthLine(){
  return AXES.map((ax,i)=>{const st=axisState(i);return `${ax.name}: ${ax[st.side].t}(${st.strength})`;}).join(' / ');
}
function copyBrief(){
  const st=STYLES[curCode], fonts=(FONTMAP[curCode]?.fonts||[]).map(f=>f.name);
  const txt=
`[마크인포 브랜드 스타일 진단 결과]
스타일: ${st.adj} — ${st.sub} (${curCode})
좌표: ${strengthLine()}

설명: ${st.desc}
어울리는 업종: ${st.use.join(', ')}

색상 조합(${SCHEMES[curScheme].name} · 예시안):
${curPal.map(c=>`  ${c.role} ${c.hex}`).join('\n')}
색 허용 범위: 색상 ${st.hue.map(([a,b])=>a+'°–'+b+'°').join(', ')} / 채도 ${st.sat[0]}–${st.sat[1]} / 명도 ${st.bri[0]}–${st.bri[1]}

브랜드 이름: ${brandName||'(미입력)'}
업종: ${bizLabel()}
대표 글꼴: ${(FONTMAP[curCode]?.fonts||[])[curFontIdx]?.name||'-'}
추천 글꼴: ${fonts.join(', ')}
이미지 키워드: ${st.kw.map(k=>k[0]).join(', ')}

추천 스튜디오: ${BRAND_MBTI.studios[BRAND_MBTI.byCode[curCode].s1].name} (${BRAND_MBTI.studios[BRAND_MBTI.byCode[curCode].s1].tone}) / 2순위 ${BRAND_MBTI.studios[BRAND_MBTI.byCode[curCode].s2].name}
로고 타입 가이드: ${mbtiLogoDetails(curCode).map(l=>l[0]+' '+l[1]).join(' · ')}
인테리어 가이드: ${BRAND_MBTI.byCode[curCode].interior.ko} — ${BRAND_MBTI.byCode[curCode].interior.mat.join(', ')}

— 브랜드 스타일 매트릭스 16 · MARKINFO`;
  navigator.clipboard?.writeText(txt).then(()=>toast('상담용 요약이 복사됐어요'));
}
function copyPreset(){
  const st=STYLES[curCode], fm=FONTMAP[curCode];
  const preset={v:1,source:"brand-style-matrix-16",code:curCode,
    style:{adj:st.adj,sub:st.sub},
    fontFilter:fm.filter,           // 폰트 분류 스키마 (type/mood/weight)
    fonts:fm.fonts.map(f=>f.name),
    palette:curPal.map(c=>({role:c.role,hex:c.hex}))};
  navigator.clipboard?.writeText(JSON.stringify(preset,null,2)).then(()=>toast('스튜디오 프리셋(JSON)이 복사됐어요'));
}

/* ================= 16 MAP ================= */
function buildMap(){
  const g=$('grid16');
  g.innerHTML='';
  Object.entries(STYLES).forEach(([code,st])=>{
    const pal=previewPalette(st,st.scheme); // 고정 미리보기 — 새로고침해도 항상 같은 인상
    const cell=document.createElement('button');
    cell.className='cell';cell.dataset.code=code;
    cell.title=st.sub;
    cell.innerHTML=`<span class="c-top"><span class="c-code">${code.split('').join('·')}</span></span>
      <span class="c-adj">${st.adj}</span><span class="c-meta">${st.sub}</span>
      <span class="dots">${pal.slice(0,4).map(c=>`<span class="dot16" style="background:${c.hex}"></span>`).join('')}</span>`;
    cell.onclick=()=>{
      [...code].forEach((ch,i)=>{sliders[i].value=AXES[i].L.c===ch?1:5;});
      showApp();render();
      $('result').scrollIntoView({behavior:'smooth',block:'start'});
    };
    g.appendChild(cell);
  });
}
function markMap(){document.querySelectorAll('.cell').forEach(c=>c.classList.toggle('active',c.dataset.code===curCode));}

/* ================= NAV ================= */
function switchTab(which){
  $('tabQ').classList.toggle('on',which==='Q');
  $('tabS').classList.toggle('on',which==='S');
  $('qWrap').classList.toggle('hidden',which!=='Q');
  $('sWrap').classList.toggle('hidden',which!=='S');
}
function showApp(){$('intro').classList.add('hidden');$('app').classList.add('on');window.scrollTo(0,0);}
$('modeQ').onclick=()=>{brandName=($('brandNameInput').value||'').trim();showApp();switchTab('Q');qIdx=0;qAns.fill(null);renderQ();render();};
$('modeS').onclick=()=>{brandName=($('brandNameInput').value||'').trim();showApp();switchTab('S');render();};
$('tabQ').onclick=()=>{switchTab('Q');renderQ();};
$('tabS').onclick=()=>switchTab('S');
$('optA').onclick=()=>answer(QUESTIONS[qIdx].A.side);
$('optB').onclick=()=>answer(QUESTIONS[qIdx].B.side);
$('optC').onclick=()=>answer('N');
$('qPrev').onclick=()=>{if(qIdx>0){qIdx--;renderQ();}};
$('qSkip').onclick=()=>switchTab('S');
$('resetBtn').onclick=()=>{
  Object.keys(FONTMAP).forEach(c=>{FONTMAP[c].fonts=FONTMAP[c].fonts.filter(f=>!f.added);});
  curFontIdx=0;fontTypeFilter='전체';
  sliders.forEach(s=>s.value=3);render();toast('다시 골라 보세요 — 모든 기준을 미정으로 되돌렸어요');};

/* ================= HOME ================= */
function exitAdminMode(){
  document.body.classList.remove('admin-mode');
  const s=$('adminSec'); if(s)s.classList.add('hidden');
  ['brOv','afOv','ivOv'].forEach(id=>{const o=$(id);if(o)o.style.display='none';});
  document.body.style.overflow='';
  document.title='브랜드 스타일 매트릭스 16 — 마크인포';
  if(location.hash==='#admin')history.replaceState(null,'',location.pathname+location.search);
  window.scrollTo(0,0);
}
/* v0.17.0: 홈 이동은 새 상태로 완전히 초기화한다. 진단 중(입력한 데이터가 있는 상태)에는
   경고 후 확인·취소를 받는다 — 이미 있는 confirm() 패턴을 그대로 따른다. */
function hasProgress(){
  return $('app').classList.contains('on');   // 인트로를 벗어나 질문·직접조절·결과 화면에 있으면 진행 중으로 본다
}
function resetAllState(){
  qIdx=0; qAns.fill(null);
  curCode=null; curScheme=null; curPal=null;
  curAnchor={h:null,s:null,b:null}; curLocks=[false,false,false,false,false];
  curFontIdx=0; fontTypeFilter='전체';
  brandName=''; bizCode=null; bizRandom=null; mockImgSel=null;
  userLogo=null;
  const ulc=$('ulCtl'); if(ulc)ulc.classList.add('hidden');
  sliders.forEach(sl=>sl.value=3);
  const bi=$('brandNameInput'); if(bi)bi.value='';
  const pv=$('previewText'); if(pv)pv.value='';
  const box=$('bizChips'); if(box)box.querySelectorAll('.biz-chip').forEach(c=>c.classList.remove('on'));
  const sel=$('mockBiz'); if(sel){sel.dataset.ready='';sel.innerHTML='';}
  switchTab('Q');
}
function goHome(){
  if(document.body.classList.contains('admin-mode')){
    if(!guardLeave())return;
    exitAdminMode();
  }
  if(hasProgress()&&!confirm('현재까지 진행한 내용이 초기화됩니다.\n\n처음부터 다시 시작할까요?'))return;
  resetAllState();
  $('app').classList.remove('on');
  $('intro').classList.remove('hidden');
  $('intro').classList.remove('show');
  requestAnimationFrame(()=>requestAnimationFrame(()=>$('intro').classList.add('show')));
  window.scrollTo({top:0,behavior:'smooth'});
  window.scrollTo(0,0);
}
/* ================= 관리자 (스튜디오 통합 · 4탭) ================= */
let adminTab='fonts', flShown=60, clsIdx=0, adminDirty=false;
/* ===== 버전 체계 =====
   · 관리자에서 정보 수정 후 저장 → 마이너 +0.1
   · 코드 레벨의 큰 개편 → 메이저 +1.0 (APP_VERSION 직접 수정)      */
let APP_VERSION='0.19.0';
const BUILD_DATE='2026-09-05';
/* 표시용 버전·빌드일자를 화면에 반영 */
function paintVersion(){
  const v=document.getElementById('verLabel'); if(v)v.textContent='v'+APP_VERSION;
  const d=document.getElementById('buildDate'); if(d)d.textContent=BUILD_DATE;
}
document.addEventListener('DOMContentLoaded',paintVersion);
function bumpVersion(){
  const p=APP_VERSION.split('.').map(Number);
  while(p.length<3)p.push(0);
  p[2]=p[2]+1;                          // 웹 배포판은 패치 단위로 올린다
  APP_VERSION=p.join('.');
  const el=document.getElementById('verLabel');
  if(el)el.textContent='v'+APP_VERSION;
  return APP_VERSION;
}
function versionFileName(){return 'bsm-data.js';}
/* ===== 인상(무드) 상충 규칙 — 한글로고 스튜디오 기준 ===== */
const MOOD_CONFLICT=[['부드러운','강한'],['진지한','귀여운']];
function moodConflict(list){
  for(const [a,b] of MOOD_CONFLICT){
    if(list.includes(a)&&list.includes(b))return [a,b];
  }
  return null;
}
function moodBlockedBy(m,list){
  // m을 추가하면 상충이 생기는지 → 상대 무드 반환
  for(const [a,b] of MOOD_CONFLICT){
    if(m===a&&list.includes(b))return b;
    if(m===b&&list.includes(a))return a;
  }
  return null;
}
/* ===== 16유형 자동 산출 (알고리즘 결정표 기반) ===== */
function autoStyles(cls){
  const type=cls.type, weight=cls.weight, moods=(cls.mood||[]);
  if(!type||!weight||!moods.length)return {codes:[],primary:[],secondary:[]};
  const seen=new Set(), primary=[], secondary=[];
  moods.forEach((m,mi)=>{
    const hit=ALGO16[`${type}|${m}|${weight}`]||[];
    hit.forEach(c=>{
      if(seen.has(c))return;
      seen.add(c);
      (mi===0?primary:secondary).push(c);
    });
  });
  return {codes:[...primary,...secondary],primary,secondary};
}
/* 상충하지 않아도, 2번째 무드로만 들어온 유형은 '보조'로 취급해 추천 후순위 */
function fontRankFor(f,code){
  if((f.repStyles||[]).includes(code))return -1;  // 관리자가 고정한 대표체 — 항상 최우선
  const a=autoStyles(f.cls||{});
  if(a.primary.includes(code))return 0;   // 대표 후보
  if(a.secondary.includes(code))return 1; // 보조 후보 → 뒤로
  return 2;                               // 해당 없음
}
/* v0.19.0: 대표체로 고정한 유형의 FONTMAP을 즉시 맨 앞으로 옮긴다 — 다음 전체 재계산까지
   기다리지 않고 저장 즉시 결과 화면에 반영되게 한다. */
function pinRepFont(f){
  (f.repStyles||[]).forEach(code=>{
    const fm=FONTMAP[code]; if(!fm)return;
    fm.fonts=fm.fonts.filter(x=>x.family!==f.family);
    fm.fonts.unshift({name:f.name,family:f.family,type:f.cls.type,weight:f.cls.weight,mood:(f.cls.mood||[]).slice()});
  });
}
function applyAutoStyles(f){
  const a=autoStyles(f.cls||{});
  f.style16=a.codes.slice();
  f.style16p=a.primary.slice();
  return a;
}
const CLS_SAMPLE_DEFAULT={big:'다람쥐 헌 쳇바퀴에 타고파',lines:'브랜드의 첫인상은 글자에서 시작됩니다\nABCDEFG abcdefg 0123456789'};
let CLS_SAMPLE=BSM_DATA.CLS_SAMPLE;
function markDirty(){adminDirty=true;const b=$('adSaveBtn');if(b&&!b.classList.contains('dirty')){b.classList.add('dirty');b.textContent='● 데이터 파일 내보내기';}}
function clearDirty(){adminDirty=false;const b=$('adSaveBtn');if(b){b.classList.remove('dirty');b.textContent='데이터 파일 내보내기';}}
function guardLeave(){
  if(!adminDirty)return true;
  return confirm('저장하지 않은 변경사항이 있습니다.\n\n먼저 「데이터 파일 내보내기」를 눌러 bsm-data.js를 내려받으세요.\n\n그래도 나가시겠습니까? (변경 내용이 사라집니다)');
}
const CODES=Object.keys(STY16);
const codeName=c=>(STY16[c]?STY16[c].name:c);

/* v0.17.0: 스타일 이름이 바뀔 수 있으므로 코드 매핑 select는 매번 새로 채운다.
   정적 HTML에 예전 이름이 남아 있으면 길이 가드(!options.length) 때문에
   영원히 갱신되지 않는 문제가 있었다 — 항상 초기화하고 선택값만 보존한다. */
function initAdminSelects(){
  const sel=$('adminStyleSel');
  { const keep=sel.value;
    sel.innerHTML=Object.entries(STYLES).map(([c,st])=>`<option value="${c}">${st.adj} (${c})</option>`).join('');
    sel.value=curCode||keep||Object.keys(STYLES)[0]; }
  const fs=$('fFilterStyle');
  { const keep=fs.value;
    fs.innerHTML='<option value="">전체 16유형</option>'+CODES.map(c=>`<option value="${c}">${codeName(c)} (${c})</option>`).join('');
    fs.value=keep||''; }
  const ft=$('fFilterType');
  if(!ft.options.length){
    ft.innerHTML='<option value="">전체 형태</option>'+CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
  }
  const fm=$('fFilterMood');
  if(fm&&!fm.options.length){
    fm.innerHTML='<option value="">전체 인상</option>'+CLS_AXES.mood.opts.map(t=>`<option>${t}</option>`).join('');
  }
  const fw=$('fFilterWeight');
  if(fw&&!fw.options.length){
    fw.innerHTML='<option value="">전체 웨이트</option>'+CLS_AXES.weight.opts.map(t=>`<option>${t}</option>`).join('');
  }
  const at=$('algoType');
  if(!at.options.length){
    at.innerHTML=CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
  }
  const isel=$('imgStyleSel');
  if(isel){
    const keep=isel.value;
    isel.innerHTML=Object.entries(STYLES).map(([c,st])=>`<option value="${c}">${st.adj} (${c})</option>`).join('');
    isel.value=curCode||keep||Object.keys(STYLES)[0];
  }
}
function enterAdminMode(){
  document.body.classList.add('admin-mode');
  $('intro').classList.add('hidden');
  $('app').classList.remove('on');
  const veil=$('dimVeil'); if(veil)veil.remove();
  $('adminSec').classList.remove('hidden');
  document.title='관리자 — 브랜드 스타일 매트릭스 16';
  initAdminSelects(); setAdminTab('fonts');
  window.scrollTo(0,0);
}
function toggleAdmin(){const s=$('adminSec');s.classList.toggle('hidden');if(!s.classList.contains('hidden')){initAdminSelects();setAdminTab(adminTab);s.scrollIntoView({behavior:'smooth',block:'start'});}}
function setAdminTab(t){
  adminTab=t;
  document.querySelectorAll('.ad-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));
  [['fonts','panelFonts'],['classify','panelClassify'],['algorithm','panelAlgorithm'],['color','panelColor'],['image','panelImage'],['mockup','panelMockup']]
    .forEach(([k,id])=>{const p=$(id);if(p)p.classList.toggle('hidden',k!==t);});
  if(t==='fonts')renderFontList();
  if(t==='classify')renderClassify();
  if(t==='algorithm')renderAlgo();
  if(t==='color')renderAdminColor();
  if(t==='image')renderAdminImage();
  if(t==='mockup')renderAdminMockup();
  updateTabCounts();
}
function fontErrExclude(){
  // 오류/숨김 플래그가 켜진 폰트를 결과 추천 목록에서 자동 제거
  let removed=0;
  Object.keys(FONTMAP).forEach(code=>{
    const before=FONTMAP[code].fonts.length;
    FONTMAP[code].fonts=FONTMAP[code].fonts.filter(x=>{
      const src=FONT_DB.find(f=>f.family===x.family);
      return !src||(!src.wfError&&!src.hideFromSearch);
    });
    removed+=before-FONTMAP[code].fonts.length;
  });
  if(removed&&curCode){curFontIdx=0;renderStyle();}
  return removed;
}
function fontStatus(f){
  if(f.wfError)return{k:'err',t:'웹폰트 오류'};
  const noMood=!(f.cls.mood||[]).length, noTag=!(f.style16||[]).length;
  if(noMood||noTag||f.clsHold)return{k:'warn',t:f.clsHold?'분류 보류':(noTag?'유형 미지정':'인상 미지정')};
  return{k:'ok',t:'정상'};
}
function updateTabCounts(){
  const err=FONT_DB.filter(f=>f.wfError).length;
  const todo=FONT_DB.filter(f=>fontStatus(f).k!=='ok').length;
  const emptyAlgo=Object.values(ALGO16).filter(v=>!v.length).length;
  $('tabCntFonts').textContent=`${FONT_DB.length}`+(err?` · 오류 ${err}`:'');
  $('tabCntCls').textContent=todo?`미완 ${todo}`:'완료';
  $('tabCntAlgo').textContent=emptyAlgo?`빈칸 ${emptyAlgo}`:'135';
}
/* ---------- 탭1: 폰트 리스트 ---------- */
function flFiltered(){
  const q=($('fSearch').value||'').trim().toLowerCase();
  const st=$('fFilterStyle').value, ty=$('fFilterType').value, stt=$('fFilterState').value;
  const mo=$('fFilterMood')?$('fFilterMood').value:'', we=$('fFilterWeight')?$('fFilterWeight').value:'';
  return FONT_DB.filter(f=>{
    if(q&&!f.name.toLowerCase().includes(q))return false;
    if(st&&!(f.style16||[]).includes(st))return false;
    if(ty&&f.cls.type!==ty)return false;
    if(mo&&!(f.cls.mood||[]).includes(mo))return false;   // v0.17.0: 인상 필터
    if(we&&f.cls.weight!==we)return false;                 // v0.17.0: 웨이트 필터
    if(stt==='err'&&!f.wfError)return false;
    if(stt==='notag'&&(f.style16||[]).length)return false;
    if(stt==='nomood'&&(f.cls.mood||[]).length)return false;
    if(stt==='hold'&&!f.clsHold)return false;
    if(stt==='hide'&&!f.hideFromSearch)return false;
    return true;
  }).sort((a,b)=>(a.wfError?1:0)-(b.wfError?1:0));   // v12.2: 웹폰트 오류는 항상 리스트 맨 아래
}
function fontListMore(){flShown+=60;renderFontList(true);}
let flIO=null;
function setupInfiniteScroll(){
  const sent=$('flSentinel'); if(!sent)return;
  if(flIO)flIO.disconnect();
  flIO=new IntersectionObserver(es=>{
    if(es[0].isIntersecting && flFiltered().length>flShown) fontListMore();
  },{rootMargin:'240px'});
  flIO.observe(sent);
}
/* v0.17.0: 폰트 로드 현황 리포트 — 전체·표시(고객이 실제로 만날 수 있는 폰트)·검색 제외·오류를 한눈에 */
function renderFontReport(){
  const box=$('flReport'); if(!box)return;
  const total=FONT_DB.length;
  const err=FONT_DB.filter(f=>f.wfError).length;
  const hidden=FONT_DB.filter(f=>f.hideFromSearch&&!f.wfError).length;   // 오류이면서 검색제외인 경우는 오류로 집계
  const visible=total-err-hidden;
  const pct=n=>total?Math.round(n/total*100):0;
  box.innerHTML=`
    <div class="fr-card"><b>${total}</b><span>전체 폰트</span></div>
    <div class="fr-card ok"><b>${visible}</b><span>고객에게 표시됨 <i>${pct(visible)}%</i></span></div>
    <div class="fr-card warn"><b>${hidden}</b><span>검색 제외 <i>${pct(hidden)}%</i></span></div>
    <div class="fr-card err"><b>${err}</b><span>웹폰트 오류 <i>${pct(err)}%</i></span></div>`;
}
/* v0.17.0: 현재 필터·검색이 적용된 목록을 CSV로 내보낸다 — 사내 여러 사람이 스프레드시트로 다룰 수 있게 */
function csvCell(v){
  const s=String(v==null?'':v);
  return /[",\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s;
}
function exportFontListCsv(){
  const list=flFiltered();
  const head=['이름','글꼴군(family)','형태','인상','웨이트','16유형 매칭','상태','웹폰트오류','분류보류','검색제외'];
  const rows=list.map(f=>{
    const s=fontStatus(f);
    return [f.name, f.family, f.cls.type||'', (f.cls.mood||[]).join('/'), f.cls.weight||'',
            (f.style16||[]).join('/'), s.t, f.wfError?'Y':'N', f.clsHold?'Y':'N', f.hideFromSearch?'Y':'N'];
  });
  const csv='\uFEFF'+[head,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');
  const ts=new Date().toISOString().slice(0,10);
  a.download=`폰트리스트_${ts}_${list.length}종.csv`;
  a.href=URL.createObjectURL(blob); a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast(`${list.length}종을 CSV로 내려받았어요`);
}
function renderFontList(keep){
  if(!keep)flShown=60;
  renderFontReport();
  const list=flFiltered(), show=list.slice(0,flShown);
  show.forEach(f=>injectFontCss(f));
  const ld=$('flLoading'); if(ld)ld.style.display=list.length>show.length?'':'none';
  $('fontListRows').innerHTML=show.map((f,di)=>{
    const gi=FONT_DB.indexOf(f), s=fontStatus(f);
    return `<div class="fl-row${f.wfError?' is-err':''}" data-gi="${gi}">
      <div class="fl-idx">${di+1}</div>
      <div class="fl-main">
        <div class="fl-name">
          <button class="fl-nm" data-open-edit title="편집창 열기">${f.name}</button>
          <span class="fl-badge ${s.k}" data-badge>${s.t}</span>
          <span class="fl-row-acts">
            <button class="fl-act" data-open-edit>편집</button>
            <button class="fl-act" data-open-cls>분류</button>
          </span>
        </div>
        <div class="fl-sample" style="font-family:${f.family};font-weight:${f.weight||400}">가나다라 한글로고 Aa 123</div>
        <div class="fl-tags">${(f.style16||[]).map(c=>`<span class="fl-t code${(f.style16p||[]).includes(c)?'':' sub'}">${codeName(c)}</span>`).join('')||'<span class="fl-t">유형 없음 — 인상을 지정해 주세요</span>'}</div>
      </div>
      <div class="fl-sel">
        <select data-k="type">${CLS_AXES.type.opts.map(t=>`<option ${t===f.cls.type?'selected':''}>${t}</option>`).join('')}</select>
        <select data-k="weight">${CLS_AXES.weight.opts.map(t=>`<option ${t===f.cls.weight?'selected':''}>${t}</option>`).join('')}</select>
      </div>
      <div class="fl-moods">${CLS_AXES.mood.opts.map(m=>{
        const on=(f.cls.mood||[]).includes(m), blk=!on&&moodBlockedBy(m,f.cls.mood||[]);
        return `<label class="fl-mood${on?' on':''}${blk?' blocked':''}" ${blk?`title="'${blk}'과 함께 고를 수 없어요"`:''}><input type="checkbox" data-mood="${m}" ${on?'checked':''} ${blk?'disabled':''}>${m}</label>`;}).join('')}</div>
      <div class="fl-flags">
        <button class="fl-flag${f.wfError?' on':''}" data-flag="wfError"><span class="sw"></span>웹폰트 오류</button>
        <button class="fl-flag neutral${f.clsHold?' on':''}" data-flag="clsHold"><span class="sw"></span>분류 보류</button>
        <button class="fl-flag neutral${f.hideFromSearch?' on':''}" data-flag="hideFromSearch"><span class="sw"></span>검색 제외</button>
      </div>
    </div>`;}).join('');
  bindFontRows();
  setupInfiniteScroll();
  updateTabCounts();
}
function bindFontRows(){
  document.querySelectorAll('#fontListRows .fl-row').forEach(row=>{
    const f=FONT_DB[+row.dataset.gi];
    const refresh=()=>{const s=fontStatus(f);const b=row.querySelector('[data-badge]');b.className='fl-badge '+s.k;b.textContent=s.t;row.classList.toggle('is-err',!!f.wfError);};
    row.querySelectorAll('[data-open-edit]').forEach(b=>b.onclick=()=>openAddFont(FONT_DB.indexOf(f)));
    row.querySelector('[data-open-cls]').onclick=()=>{clsIdx=FONT_DB.indexOf(f);setAdminTab('classify');};
    const reclass=()=>{const a=applyAutoStyles(f);refresh();syncFontmapFrom(f);markDirty();
      const tg=row.querySelector('.fl-tags');
      if(tg)tg.innerHTML=(f.style16||[]).map(c=>`<span class="fl-t code${(f.style16p||[]).includes(c)?'':' sub'}">${codeName(c)}</span>`).join('')||'<span class="fl-t">유형 없음</span>';
      return a;};
    row.querySelector('[data-k="type"]').onchange=e=>{f.cls.type=e.target.value;reclass();};
    row.querySelector('[data-k="weight"]').onchange=e=>{f.cls.weight=e.target.value;reclass();};
    row.querySelectorAll('[data-mood]').forEach(cb=>cb.onchange=()=>{
      const picked=[...row.querySelectorAll('[data-mood]')].filter(x=>x.checked).map(x=>x.dataset.mood);
      if(cb.checked){
        const conf=moodBlockedBy(cb.dataset.mood,picked.filter(m=>m!==cb.dataset.mood));
        if(conf){cb.checked=false;toast(`'${cb.dataset.mood}'과 '${conf}'은 함께 고를 수 없어요`);return;}
        if(picked.length>CLS_AXES.mood.max){cb.checked=false;toast(`인상은 최대 ${CLS_AXES.mood.max}개까지예요`);return;}
      }
      f.cls.mood=[...row.querySelectorAll('[data-mood]')].filter(x=>x.checked).map(x=>x.dataset.mood);
      row.querySelectorAll('.fl-mood').forEach(l=>{
        const inp=l.querySelector('input'), m=inp.dataset.mood;
        l.classList.toggle('on',inp.checked);
        const blk=!inp.checked&&moodBlockedBy(m,f.cls.mood);
        inp.disabled=!!blk; l.classList.toggle('blocked',!!blk);
        l.title=blk?`'${blk}'과 함께 고를 수 없어요`:'';
      });
      reclass();
    });
    row.querySelectorAll('[data-flag]').forEach(btn=>btn.onclick=()=>{
      const k=btn.dataset.flag; f[k]=!f[k];
      if(k==='wfError')f.wfManual=!!f[k];   // 사용자가 직접 켠 오류 플래그는 자동검사가 못 지움
      btn.classList.toggle('on',f[k]);
      refresh(); markDirty();
      if(k==='wfError'||k==='hideFromSearch'){
        const n=f[k]?fontErrExclude():0;
        if(f[k])toast(f.name+` — ${k==='wfError'?'웹폰트 오류':'검색 제외'}로 표시${n?`하고 추천 ${n}곳에서 제외했어요`:'했어요'}`);
        else{const add=rebuildQuiet();toast(f.name+' — 플래그를 해제했어요'+(add?` (추천 ${add}종 보충)`:''));}
      }
    });
    row.querySelector('[data-badge]').onclick=()=>{
      const s=fontStatus(f);
      if(s.k==='err'){f.wfError=false;f.wfManual=false;row.querySelector('[data-flag="wfError"]').classList.remove('on');refresh();markDirty();toast('오류 플래그를 해제했어요');}
      else{setAdminTab('classify');clsIdx=FONT_DB.indexOf(f);renderClassify();}
    };
  });
}
function injectFontCss(f){
  if(!f||!f.css||cssInjected.has(f.name))return;
  const s=document.createElement('style');s.dataset.fontcss='1';s.textContent=f.css;document.head.appendChild(s);cssInjected.add(f.name);
}
/* ---- 폰트 로드 유틸 (v12): 선언된 웨이트를 존중해 로드·검사한다 ---- */
function famKey(fam){return (fam||'').replace(/["']/g,'').split(',')[0].trim();}
function declaredWeights(css){
  // @font-face에 선언된 모든 font-weight 수집 — 볼드·라이트 전용 패밀리 대응
  if(!css)return [400];
  const ws=new Set(); const re=/font-weight\s*:\s*([^;}{]+)/gi; let m;
  while((m=re.exec(css))){
    const v=m[1].trim().toLowerCase();
    if(v==='bold')ws.add(700); else if(v==='normal')ws.add(400);
    else{const nums=v.match(/\d{3}/g); if(nums)nums.forEach(n=>ws.add(+n));}
  }
  return ws.size?[...ws].sort((a,b)=>a-b):[400];
}
function nearestWeight(css,target){
  const ws=declaredWeights(css);
  return ws.reduce((p,c)=>Math.abs(c-target)<Math.abs(p-target)?c:p,ws[0]);
}
async function loadFontFaces(fam,css,sample){
  // 선언 웨이트 전부 로드 시도 — 하나라도 실제 로드되면 정상
  if(!document.fonts)return true;
  const key=famKey(fam), text=sample||'가나다한글Aa123';
  let ok=false;
  for(const w of declaredWeights(css)){
    try{
      await document.fonts.load(`${w} 16px "${key}"`,text);
      if(document.fonts.check(`${w} 16px "${key}"`,'가'))ok=true;
    }catch(e){}
  }
  return ok;
}
/* v14.0 네트워크 상태 판정 — 폰트 CDN이 막힌 환경에서 자동검사가 멀쩡한 폰트를
   무더기로 오류 처리하고, 그 상태로 저장되면 폰트 자산이 통째로 망가진다.
   그래서 (1) 오프라인이면 검사 자체를 건너뛰고 (2) 실패율이 비정상으로 높으면
   결과를 되돌린 뒤 경고만 남긴다. */
const NET_FAIL_RATIO=0.25, NET_FAIL_MIN=12;
async function autoFlagOnLoad(){
  // 결과창 추천 폰트 자동 검사 — 선언 웨이트 기준. 실패 시 플래그, 통과하면 과거 오탐도 자동 복구
  if(!document.fonts)return;
  if(navigator.onLine===false){
    console.warn('[웹폰트 자동검사] 오프라인 — 검사를 건너뜁니다 (기존 플래그 유지)');
    return;
  }
  const fams=new Set();
  Object.values(FONTMAP).forEach(v=>v.fonts.forEach(f=>fams.add(f.family)));
  FONT_DB.forEach(f=>{if(f.wfError&&f.css)fams.add(f.family);});   // 과거 오탐(웨이트 미인지 검사) 복구 대상 포함
  const newlyBad=[]; let healed=0, checked=0;
  for(const fam of fams){
    const src=FONT_DB.find(f=>f.family===fam); if(!src)continue;
    checked++;
    injectFontCss(src);
    const ok=await loadFontFaces(src.family,src.css);
    if(!ok&&!src.wfError){src.wfError=true;newlyBad.push(src);}
    else if(ok&&src.wfError&&!src.wfManual){src.wfError=false;healed++;}   // 자동 플래그만 복구 — 수동 플래그(wfManual)는 보존
  }
  // 실패가 비정상적으로 많으면 폰트가 아니라 네트워크 문제로 본다 → 되돌린다
  if(newlyBad.length>=NET_FAIL_MIN && checked && newlyBad.length/checked>NET_FAIL_RATIO){
    newlyBad.forEach(f=>f.wfError=false);
    console.warn(`[웹폰트 자동검사] ${checked}종 중 ${newlyBad.length}종 실패 — 네트워크 문제로 판단해 플래그를 적용하지 않았습니다`);
    toast('인터넷 연결이 불안정해 글꼴 검사 결과를 반영하지 않았어요');
    if(healed){rebuildQuiet();if(curCode)renderStyle();}
    return;
  }
  const bad=newlyBad.length;
  if(bad){const n=fontErrExclude();rebuildQuiet();}
  if(healed){rebuildQuiet();if(curCode)renderStyle();}
  if(bad||healed)console.info(`[웹폰트 자동검사] 오류 ${bad}종 · 복구 ${healed}종`);
}
async function checkAllWebfonts(){
  if(!document.fonts){toast('이 브라우저는 자동 검사를 지원하지 않아요');return;}
  if(navigator.onLine===false){toast('오프라인이라 검사할 수 없어요 — 기존 플래그를 유지합니다');return;}
  const list=flFiltered().slice(0,flShown);
  toast(`${list.length}종 검사 중…`);
  const newlyBad=[]; let healed=0;
  for(const f of list){
    injectFontCss(f);
    const ok=await loadFontFaces(f.family,f.css);
    if(!ok){if(!f.wfError){f.wfError=true;newlyBad.push(f);}}
    else if(f.wfError&&!f.wfManual){f.wfError=false;healed++;}   // 자동 플래그만 복구 — 수동 플래그는 보존
  }
  if(newlyBad.length>=NET_FAIL_MIN && list.length && newlyBad.length/list.length>NET_FAIL_RATIO){
    newlyBad.forEach(f=>f.wfError=false);
    renderFontList(true);
    alert(`${list.length}종 중 ${newlyBad.length}종이 실패했습니다.\n\n글꼴 문제라기보다 인터넷 연결이 끊겼거나 CDN이 막힌 상황으로 보입니다.\n폰트 데이터를 지키기 위해 이번 검사 결과는 반영하지 않았습니다.\n연결을 확인한 뒤 다시 시도해 주세요.`);
    return;
  }
  const bad=newlyBad.length;
  if(bad||healed){markDirty();fontErrExclude();rebuildQuiet();}
  renderFontList(true);
  toast(bad||healed?`오류 ${bad}종 · 복구 ${healed}종${bad?' — 오류는 추천에서 제외했어요':''}`:'모두 정상 로드됩니다');
}
/* ---------- 폰트 추가 / 편집 (동일 구성) ---------- */
let afEditIdx=-1;   // -1이면 신규 추가, 그 외엔 FONT_DB 인덱스
function openAddFont(editIdx){
  afEditIdx=(typeof editIdx==='number')?editIdx:-1;
  const isEdit=afEditIdx>=0;
  const f=isEdit?FONT_DB[afEditIdx]:null;
  let ov=$('afOv');
  if(ov&&!ov.dataset.bound){ov.remove();ov=null;}   // 저장본에 베이크된 팝업은 핸들러가 없으므로 재생성
  if(!ov){
    ov=document.createElement('div'); ov.id='afOv'; ov.className='br-ov'; ov.dataset.bound='1';
    ov.innerHTML=`<div class="br-box" style="width:min(660px,96vw)" role="dialog" aria-label="폰트 정보">
      <div class="br-head"><div><b id="afTitle">폰트 추가</b><span id="afSub"></span></div>
        <button class="cp-x" id="afClose" aria-label="닫기">×</button></div>
      <div style="padding:18px 20px;overflow-y:auto">
        <label class="af-l">@font-face CSS <em>붙여 넣으면 이름·family를 자동으로 읽어옵니다</em></label>
        <textarea id="afCss" class="af-ta" rows="7" spellcheck="false" placeholder="@font-face {
    font-family: 'MyFont';
    src: url('https://.../MyFont.woff2') format('woff2');
    font-weight: normal;
    font-display: swap;
}"></textarea>
        <div class="ad-row2" style="margin-top:12px">
          <div><label class="af-l">폰트 이름</label><input id="afName" class="af-in" placeholder="예: 마크인포 산스"></div>
          <div><label class="af-l">font-family</label><input id="afFam" class="af-in" placeholder="예: 'MyFont'"></div>
        </div>
        <div class="ad-row2" style="margin-top:10px">
          <div><label class="af-l">형태</label><select id="afType" class="af-in"></select></div>
          <div><label class="af-l">웨이트</label><select id="afWeight" class="af-in"></select></div>
        </div>
        <label class="af-l" style="margin-top:10px">인상 <em>최대 2개 · 부드러운↔강한, 진지한↔귀여운은 함께 고를 수 없어요</em></label>
        <div class="fl-moods" id="afMoods"></div>
        <div class="af-auto" id="afAuto"></div>
        <div class="af-rep" id="afRep"></div>
        <div class="af-flags" id="afFlags"></div>
        <div class="af-prev" id="afPrev">미리보기 — CSS를 붙여 넣으면 이곳에 표시됩니다</div>
        <div class="af-warn" id="afWarn"></div>
      </div>
      <div class="br-foot">
        <button class="chip-btn" id="afTest">로드 테스트</button>
        <button class="ad-mini danger" id="afDelete" style="display:none">이 폰트 삭제</button>
        <button class="chip-btn solid" id="afSave" style="margin-left:auto">추가하기</button>
      </div>
    </div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click',e=>{if(e.target===ov)ov.style.display='none';});
    $('afClose').onclick=()=>ov.style.display='none';
    $('afType').innerHTML=CLS_AXES.type.opts.map(t=>`<option>${t}</option>`).join('');
    $('afWeight').innerHTML=CLS_AXES.weight.opts.map(t=>`<option ${t==='보통'?'selected':''}>${t}</option>`).join('');
    $('afCss').oninput=parseAddFontCss;
    $('afTest').onclick=testAddFont;
    $('afSave').onclick=saveAddFont;
    $('afDelete').onclick=deleteEditFont;
  }
  // ---- 값 채우기 ----
  $('afTitle').textContent=isEdit?'폰트 편집':'폰트 추가';
  $('afSub').textContent=isEdit?`${f.name} · 웹폰트 CSS와 분류를 수정합니다`:'눈누 등에서 복사한 @font-face CSS를 붙여 넣으세요';
  $('afSave').textContent=isEdit?'변경 저장':'추가하기';
  $('afDelete').style.display=isEdit?'':'none';
  $('afCss').value=isEdit?(f.css||''):'';
  $('afName').value=isEdit?f.name:'';
  $('afFam').value=isEdit?f.family:'';
  $('afType').value=isEdit?(f.cls.type||'고딕'):'고딕';
  $('afWeight').value=isEdit?(f.cls.weight||'보통'):'보통';
  const mood=isEdit?(f.cls.mood||[]).slice():[];
  afRepWorking=isEdit?(f.repStyles||[]).slice():[];
  renderAfMoods(mood);
  renderAfFlags(isEdit?f:null);
  $('afWarn').textContent='';
  const pv=$('afPrev');
  if(isEdit){injectFontCss(f);pv.style.fontFamily=f.family;pv.style.fontWeight=f.weight||'';pv.textContent='가나다라 한글로고 Aa 123';}
  else{pv.style.fontFamily='';pv.style.fontWeight='';pv.textContent='미리보기 — CSS를 붙여 넣으면 이곳에 표시됩니다';}
  ov.style.display='flex';
  setTimeout(()=>$(isEdit?'afName':'afCss').focus(),40);
}
function afCurrentMoods(){
  return [...$('afMoods').querySelectorAll('input:checked')].map(x=>x.dataset.mood);
}
function renderAfMoods(sel){
  const cur=sel||afCurrentMoods();
  $('afMoods').innerHTML=CLS_AXES.mood.opts.map(m=>{
    const on=cur.includes(m);
    const blocked=!on&&moodBlockedBy(m,cur);
    return `<label class="fl-mood${on?' on':''}${blocked?' blocked':''}" ${blocked?`title="'${blocked}'과 함께 고를 수 없어요"`:''}>
      <input type="checkbox" data-mood="${m}" ${on?'checked':''} ${blocked?'disabled':''}>${m}</label>`;
  }).join('');
  $('afMoods').querySelectorAll('input').forEach(cb=>cb.onchange=()=>{
    let cur2=afCurrentMoods();
    if(cb.checked){
      const conf=moodBlockedBy(cb.dataset.mood,cur2.filter(m=>m!==cb.dataset.mood));
      if(conf){cb.checked=false;toast(`'${cb.dataset.mood}'과 '${conf}'은 함께 고를 수 없어요`);return;}
      if(cur2.length>CLS_AXES.mood.max){cb.checked=false;toast('인상은 최대 2개까지예요');return;}
    }
    renderAfMoods(afCurrentMoods());
    renderAfAuto();
  });
  renderAfAuto();
}
function renderAfAuto(){
  const cls={type:$('afType').value,weight:$('afWeight').value,mood:afCurrentMoods()};
  const a=autoStyles(cls);
  const box=$('afAuto');
  if(!cls.mood.length){
    box.innerHTML=`<div class="af-auto-empty">인상을 고르면 알고리즘이 어울리는 16유형을 자동으로 정합니다</div>`;
    return;
  }
  box.innerHTML=`
    <div class="af-auto-head">어울리는 16유형 <em>알고리즘 자동 판정 · 직접 고르지 않습니다</em></div>
    <div class="af-auto-tags">
      ${a.primary.map(c=>`<span class="af-at p">${codeName(c)}</span>`).join('')}
      ${a.secondary.map(c=>`<span class="af-at s" title="두 번째 인상으로 들어온 유형 — 추천에서 후순위입니다">${codeName(c)} <i>보조</i></span>`).join('')}
      ${a.codes.length?'':'<span class="af-auto-empty">이 조합에 지정된 유형이 없습니다 — 알고리즘 탭에서 조건을 확인해 주세요</span>'}
    </div>`;
  renderAfRep(a.codes);
}
/* v0.19.0: 스타일 대표체 — 이 폰트가 매칭된 유형 중, 결과 화면에서 항상 맨 앞(대표)으로
   보여줄 유형을 관리자가 직접 고정한다. 고정하지 않으면 기존처럼 알고리즘 순위로 정렬된다. */
let afRepWorking=[];
function renderAfRep(codes){
  const box=$('afRep'); if(!box)return;
  if(!codes.length){box.innerHTML='';return;}
  box.innerHTML=`<label class="af-l" style="margin-top:10px">스타일 대표체 <em>체크한 유형에서는 이 폰트를 결과 화면 맨 앞(대표)으로 고정합니다</em></label>
    <div class="af-rep-tags">${codes.map(c=>{
      const on=afRepWorking.includes(c);
      return `<label class="af-rep-tag${on?' on':''}"><input type="checkbox" data-rep="${c}" ${on?'checked':''}>${codeName(c)}</label>`;
    }).join('')}</div>`;
  box.querySelectorAll('[data-rep]').forEach(cb=>cb.onchange=()=>{
    const c=cb.dataset.rep;
    if(cb.checked){if(!afRepWorking.includes(c))afRepWorking.push(c);}
    else afRepWorking=afRepWorking.filter(x=>x!==c);
    cb.closest('.af-rep-tag').classList.toggle('on',cb.checked);
  });
}
function renderAfFlags(f){
  const flags=[['wfError','웹폰트 오류'],['clsHold','분류 보류'],['hideFromSearch','검색 제외']];
  $('afFlags').innerHTML=flags.map(([k,label])=>
    `<button class="fl-flag${f&&f[k]?' on':''}${k==='wfError'?'':' neutral'}" data-afflag="${k}"><span class="sw"></span>${label}</button>`).join('');
  $('afFlags').querySelectorAll('[data-afflag]').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
}
function parseAddFontCss(){
  let css=$('afCss').value;
  // http 웹폰트 URL은 https 페이지에서 차단되므로 자동 교정
  const fixed=css.replace(/url\('http:\/\//g,"url('https://").replace(/@import url\('http:\/\//g,"@import url('https://");
  if(fixed!==css){css=fixed;$('afCss').value=css;}
  const m=css.match(/font-family\s*:\s*(['"]?)([^;'"]+)\1/i);
  if(m){
    const fam=m[2].trim();
    if(!$('afFam').value)$('afFam').value=`'${fam}'`;
    if(!$('afName').value)$('afName').value=fam;
  }
  const ws=declaredWeights(css);
  const rep=ws.length>1?ws[Math.floor(ws.length/2)]:ws[0];   // 다중 웨이트면 중간값으로 분류
  $('afWeight').value=rep>=600?'두꺼운':(rep<=300?'얇은':'보통');
  if(ws.length>1)$('afWarn').innerHTML=`<span style="color:var(--ink2);font-size:11px">ⓘ 웨이트 ${ws.join('·')}가 한 패밀리로 감지됐어요 — 전부 로드되고, 분류는 중간 웨이트 기준입니다</span>`;
  renderAfAuto();
}
function testAddFont(){
  const css=$('afCss').value.trim(), fam=$('afFam').value.trim();
  if(!css||!fam){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ CSS와 font-family를 먼저 입력해 주세요</span>';return;}
  const s=document.createElement('style'); s.dataset.fontcss='1'; s.textContent=css.replace(/url\('http:\/\//g,"url('https://"); document.head.appendChild(s);
  const ws=declaredWeights(css);
  const pv=$('afPrev'); pv.style.fontFamily=fam; pv.style.fontWeight=nearestWeight(css,400);
  pv.textContent='가나다라 한글로고 Aa 123';
  if(document.fonts){
    loadFontFaces(fam,css).then(ok=>{
      $('afWarn').innerHTML=ok
        ?`<span style="color:var(--green-deep);font-size:11px;font-weight:700">✓ 정상 로드됩니다 · 감지된 웨이트: ${ws.join(' · ')}</span>`
        :'<span class="ad-warn-line">⚠ 로드되지 않아요 — URL이 정확한지, CORS가 허용되는지 확인해 주세요</span>';
    });
  }
}
function saveAddFont(){
  const name=$('afName').value.trim(), fam=$('afFam').value.trim(), css=$('afCss').value.trim();
  const isEdit=afEditIdx>=0;
  if(!name||!fam||!css){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ 이름 · family · CSS는 필수입니다</span>';return;}
  const dup=FONT_DB.findIndex(f=>f.name===name);
  if(dup>-1&&dup!==afEditIdx){$('afWarn').innerHTML='<span class="ad-warn-line">⚠ 같은 이름의 폰트가 이미 있어요</span>';return;}
  const mood=afCurrentMoods();
  const conf=moodConflict(mood);
  if(conf){$('afWarn').innerHTML=`<span class="ad-warn-line">⚠ '${conf[0]}'과 '${conf[1]}'은 함께 고를 수 없어요</span>`;return;}
  const flags={};
  $('afFlags').querySelectorAll('[data-afflag]').forEach(b=>flags[b.dataset.afflag]=b.classList.contains('on'));
  const target=isEdit?FONT_DB[afEditIdx]:{style:[],bici:false,embedRestrict:false};
  Object.assign(target,{name,family:fam,css,cat:$('afType').value,
    cls:{type:$('afType').value,mood,weight:$('afWeight').value},
    wfError:!!flags.wfError,clsHold:!!flags.clsHold,hideFromSearch:!!flags.hideFromSearch,wfManual:!!flags.wfError});
  const a=applyAutoStyles(target);
  // v0.19.0: 대표체로 체크한 유형은 이 폰트의 매칭 대상으로만 유효하다 (전에 대표였다가
  // 이번 분류 변경으로 더 이상 매칭되지 않는 유형은 자동으로 빠진다)
  target.repStyles=afRepWorking.filter(c=>a.codes.includes(c));
  if(!isEdit)FONT_DB.unshift(target);
  cssInjected.delete(name); injectFontCss(target);
  pinRepFont(target);
  markDirty();
  $('afOv').style.display='none';
  if(isEdit){
    syncFontmapFrom(target);
    if(target.wfError||target.hideFromSearch)fontErrExclude();
  }
  const add=rebuildQuiet();
  if(adminTab==='fonts'){
    if(isEdit){
      // v12.2: 편집 저장 시 검색어·필터·표시 개수·스크롤 위치 전부 유지
      const sy=window.scrollY;
      renderFontList(true);
      requestAnimationFrame(()=>window.scrollTo(0,sy));
    }else{$('fSearch').value=name;renderFontList();}
  }
  else renderClassify();
  toast(`${name} ${isEdit?'수정':'추가'} 완료 · 유형 ${a.codes.length}개 자동 지정${add?` · 추천 ${add}종 반영`:''}`);
}
function deleteEditFont(){
  if(afEditIdx<0)return;
  const f=FONT_DB[afEditIdx];
  if(!confirm(`'${f.name}' 을 목록에서 완전히 삭제할까요?\n\n추천 목록에서도 제거되고, 되돌릴 수 없습니다.`))return;
  const fam=f.family;
  FONT_DB.splice(afEditIdx,1);
  Object.keys(FONTMAP).forEach(code=>{
    FONTMAP[code].fonts=FONTMAP[code].fonts.filter(x=>x.family!==fam);
  });
  if(clsIdx>=FONT_DB.length)clsIdx=Math.max(0,FONT_DB.length-1);
  markDirty();
  $('afOv').style.display='none';
  const add=rebuildQuiet();
  if(curCode){curFontIdx=0;renderStyle();}
  if(adminTab==='fonts'){const sy=window.scrollY;renderFontList(true);requestAnimationFrame(()=>window.scrollTo(0,sy));}
  else renderClassify();
  toast(`${f.name} 삭제 완료${add?` · 추천 ${add}종 보충`:''}`);
}
/* ---------- 탭2: 폰트 분류 (한 종씩 집중) ---------- */
function algoSuggest(f){
  const key=`${f.cls.type}|${(f.cls.mood||[])[0]||''}|${f.cls.weight}`;
  return ALGO16[key]||[];
}
function clsNext(){const t=$('clsOnlyTodo').checked;for(let n=1;n<=FONT_DB.length;n++){const i=(clsIdx+n)%FONT_DB.length;if(!t||fontStatus(FONT_DB[i]).k!=='ok'){clsIdx=i;break;}}renderClassify();}
function clsPrev(){const t=$('clsOnlyTodo').checked;for(let n=1;n<=FONT_DB.length;n++){const i=(clsIdx-n+FONT_DB.length)%FONT_DB.length;if(!t||fontStatus(FONT_DB[i]).k!=='ok'){clsIdx=i;break;}}renderClassify();}
function clsJumpTodo(){if($('clsOnlyTodo').checked&&fontStatus(FONT_DB[clsIdx]).k==='ok')clsNext();else renderClassify();}
function renderClassify(){
  const f=FONT_DB[clsIdx]; if(!f)return;
  injectFontCss(f);
  const s=fontStatus(f), sug=algoSuggest(f);
  const todo=FONT_DB.filter(x=>fontStatus(x).k!=='ok').length;
  $('clsStat').textContent=`${clsIdx+1} / ${FONT_DB.length} · 미완료 ${todo}종`;
  $('clsCard').innerHTML=`
  <div class="cls-card">
    <div class="cls-name">${f.name}<span class="fl-badge ${s.k}">${s.t}</span>
      <button class="fl-flag${f.wfError?' on':''}" style="width:auto;margin-left:auto" data-flag="wfError"><span class="sw"></span>웹폰트 오류</button></div>
    <div class="cls-sample-wrap">
      <div class="cls-big" id="clsBig" style="font-family:${f.family};font-weight:${f.weight||400}" title="클릭하면 문구를 바꿀 수 있어요">${CLS_SAMPLE.big.replace(/</g,'&lt;')}</div>
      <div class="cls-lines" id="clsLines" style="font-family:${f.family};font-weight:${f.weight||400}" title="클릭하면 문구를 바꿀 수 있어요">${CLS_SAMPLE.lines.replace(/</g,'&lt;').replace(/\n/g,'<br>')}</div>
      <button class="cls-edit-btn" id="clsEditBtn">✎ 문구 수정</button>
      <div class="cls-edit hidden" id="clsEdit">
        <label>큰 문구</label><input id="clsBigIn" value="${CLS_SAMPLE.big.replace(/"/g,'&quot;')}" maxlength="40">
        <label>작은 문구 <span class="ad-optional">줄바꿈 가능</span></label><textarea id="clsLinesIn" rows="2">${CLS_SAMPLE.lines.replace(/</g,'&lt;')}</textarea>
        <div class="cls-edit-acts">
          <button class="ad-mini" id="clsSampleReset">초기화</button>
          <button class="ad-apply" id="clsSampleSave" style="width:auto;padding:8px 18px;margin:0">저장</button>
        </div>
      </div>
    </div>
    <div class="cls-axes">
      <div class="cls-ax"><label>형태 (계열)</label><div class="cls-opts">${CLS_AXES.type.opts.map(t=>`<button class="cls-opt${f.cls.type===t?' on':''}" data-ax="type" data-v="${t}">${t}</button>`).join('')}</div></div>
      <div class="cls-ax"><label>인상 (최대 ${CLS_AXES.mood.max}개) <span class="ad-optional">부드러운↔강한 · 진지한↔귀여운 동시 선택 불가</span></label><div class="cls-opts">${CLS_AXES.mood.opts.map(t=>{
        const on=(f.cls.mood||[]).includes(t), blk=!on&&moodBlockedBy(t,f.cls.mood||[]);
        return `<button class="cls-opt${on?' on':''}${blk?' blocked':''}" data-ax="mood" data-v="${t}" ${blk?`title="'${blk}'과 함께 고를 수 없어요"`:''}>${t}</button>`;}).join('')}</div></div>
      <div class="cls-ax"><label>웨이트</label><div class="cls-opts">${CLS_AXES.weight.opts.map(t=>`<button class="cls-opt${f.cls.weight===t?' on':''}" data-ax="weight" data-v="${t}">${t}</button>`).join('')}</div></div>
    </div>
    <div class="cls-codes">
      <span style="font-size:10.5px;font-weight:800;color:var(--ink3);align-self:center;margin-right:4px">어울리는 16유형 <em style="font-style:normal;font-weight:500">알고리즘 자동</em></span>
      <span class="cls-algo-key">${f.cls.type} · ${(f.cls.mood||[]).join('+')||'인상 미정'} · ${f.cls.weight}</span>
      ${(()=>{const a=autoStyles(f.cls||{});
        const key=`${f.cls.type}|${(f.cls.mood||[])[0]||''}|${f.cls.weight}`;
        const meta=(typeof ALGO_META!=='undefined'&&ALGO_META[key])||null;
        const sc=meta?meta.scores||{}:{};
        return CODES.map(c=>{
          const pri=a.primary.includes(c), sec=a.secondary.includes(c);
          const pt=sc[c]!=null?` · 적합도 ${Math.round(sc[c])}점`:'';
          const cls=pri?'on':(sec?'on sub':'off');
          return `<span class="cls-code auto ${cls}" title="${c}${sec?' · 두 번째 인상에서 온 보조 유형(추천 후순위)':''}${pt}">${codeName(c)}${sc[c]!=null?`<em>${Math.round(sc[c])}</em>`:''}</span>`;
        }).join('');})()}
    </div>
    <div class="cls-foot">
      <label class="ad-check"><input type="checkbox" id="clsHoldChk" ${f.clsHold?'checked':''}> 분류 보류 (판단이 어려운 폰트)</label>
      <div style="display:flex;gap:8px">
        <button class="chip-btn" id="clsOpenEdit">✎ 폰트 편집</button>
        <button class="chip-btn" id="clsGoAlgo">알고리즘 조건 보기</button>
        <button class="chip-btn solid" onclick="clsNext()">저장하고 다음 ›</button>
      </div>
    </div>
  </div>`;
  const card=$('clsCard');
  card.querySelectorAll('[data-ax]').forEach(b=>b.onclick=()=>{
    const ax=b.dataset.ax, v=b.dataset.v;
    if(ax==='mood'){
      const m=f.cls.mood||[];
      const i=m.indexOf(v);
      if(i>-1)m.splice(i,1);
      else{
        const conf=moodBlockedBy(v,m);
        if(conf){toast(`'${v}'과 '${conf}'은 함께 고를 수 없어요`);return;}
        if(m.length>=CLS_AXES.mood.max){toast(`인상은 최대 ${CLS_AXES.mood.max}개까지예요`);return;}
        m.push(v);
      }
      f.cls.mood=m;
    }else f.cls[ax]=v;
    applyAutoStyles(f); syncFontmapFrom(f); markDirty();
    renderClassify();
  });
  /* 16유형은 알고리즘이 정합니다 — 수동 토글 없음 */
  card.querySelector('[data-flag]').onclick=()=>{f.wfError=!f.wfError;f.wfManual=!!f.wfError;markDirty();renderClassify();};
  $('clsHoldChk').onchange=e=>{f.clsHold=e.target.checked;renderClassify();};
  const clsBind=()=>{
    const eb=$('clsEditBtn'), ed=$('clsEdit');
    const open=()=>{ed.classList.remove('hidden');$('clsBigIn').focus();};
    eb.onclick=open;
    $('clsBig').onclick=open; $('clsLines').onclick=open;
    $('clsSampleSave').onclick=()=>{
      const b=$('clsBigIn').value.trim(), l=$('clsLinesIn').value;
      if(!b){toast('큰 문구는 비울 수 없어요');return;}
      CLS_SAMPLE.big=b; CLS_SAMPLE.lines=l;
      markDirty(); renderClassify(); toast('샘플 문구를 저장했어요');
    };
    $('clsSampleReset').onclick=()=>{
      CLS_SAMPLE={...CLS_SAMPLE_DEFAULT};
      markDirty(); renderClassify(); toast('기본 문구로 되돌렸어요');
    };
  };
  clsBind();
  $('clsOpenEdit').onclick=()=>openAddFont(clsIdx);
  $('clsGoAlgo').onclick=()=>{
    setAdminTab('algorithm');
    const sel=$('algoType'); if(sel){sel.value=f.cls.type;renderAlgo();}
    toast(`${f.cls.type} 계열의 조건을 확인해 보세요`);
  };
  updateTabCounts();
}
/* ---------- 탭3: 알고리즘 ---------- */
const ALGO_SAMPLE_CAP=16;   // v13.5: 개수 제한 해제 · 웹폰트 과다 로드만 막는 상한
function algoSampleFonts(type,mood,weight){
  // 이 분류(형태·무드·웨이트)에 실제로 속하는 폰트 — 한 줄에 들어가는 만큼 표시(fitAlgoSamples)
  return FONT_DB.filter(f=>!f.wfError&&f.css&&f.cls&&f.cls.type===type&&f.cls.weight===weight&&(f.cls.mood||[]).includes(mood)).slice(0,ALGO_SAMPLE_CAP);
}
/* 한 줄을 넘치는 샘플은 숨기고 「+N」으로 요약 — 폰트 로드 후에도 다시 계산
   줄바꿈 판정은 offsetLeft 기준: 같은 줄에서는 좌표가 계속 커지고, 줄이 바뀌면 되돌아간다.
   (offsetTop은 폰트별 baseline 차이로 같은 줄에서도 값이 달라 쓸 수 없다) */
function fitAlgoSamples(root){
  (root||document).querySelectorAll('.algo-samples').forEach(box=>{
    const items=[...box.querySelectorAll('.algo-sample')].filter(e=>!e.classList.contains('none'));
    if(!items.length)return;
    items.forEach(e=>{e.style.display='';});
    const prevMore=box.querySelector('.algo-more'); if(prevMore)prevMore.remove();
    let vis=items.length;
    for(let i=1;i<items.length;i++){
      if(items[i].offsetLeft<=items[i-1].offsetLeft){vis=i;break;}
    }
    if(vis>=items.length)return;                       // 전부 한 줄에 들어감
    for(let i=vis;i<items.length;i++)items[i].style.display='none';
    const more=document.createElement('span');
    more.className='algo-more'; box.appendChild(more);
    const setN=()=>{more.textContent=`+${items.length-vis}`;
      more.title=items.slice(vis).map(e=>e.title).join(', ');};
    setN();
    // 「+N」 칩까지 줄을 넘기면 샘플을 하나씩 더 접는다
    while(vis>1&&more.offsetLeft<=items[vis-1].offsetLeft){
      items[--vis].style.display='none'; setN();
    }
  });
}
function renderAlgo(){
  const ty=$('algoType').value||CLS_AXES.type.opts[0];
  const keys=Object.keys(ALGO16).filter(k=>k.startsWith(ty+'|'));
  const empty=keys.filter(k=>!ALGO16[k].length).length;
  $('algoStat').textContent=`${ty} · ${keys.length}개 조합${empty?` · 미지정 ${empty}개`:''}`;
  $('algoRows').innerHTML=keys.map(k=>{
    const [,mood,weight]=k.split('|');
    const sel=ALGO16[k]||[];
    const samples=algoSampleFonts(ty,mood,weight);
    samples.forEach(injectFontCss);
    return `<div class="algo-row${sel.length?'':' empty'}" data-key="${k}">
      <div class="algo-key">${mood} · ${weight}<em>${sel.length?sel.length+'개 지정':'미지정'}</em>${(()=>{
        const m=(typeof ALGO_META!=='undefined'&&ALGO_META[k])||null;
        return m&&m.reason?`<span class="algo-reason" title="${m.reason.replace(/"/g,'&quot;')}">근거 ⓘ</span>`:'';})()}</div>
      <div class="algo-codes">${CODES.map(c=>`<button class="algo-c${sel.includes(c)?' on':''}" data-code="${c}" title="${c}">${codeName(c)}</button>`).join('')}
        <div class="algo-samples">${samples.length?samples.map(f=>`<span class="algo-sample" style="font-family:${f.family},Pretendard" title="${f.name}">${f.name}</span>`).join(''):'<span class="algo-sample none">이 분류에 해당하는 폰트가 아직 없어요</span>'}</div>
      </div>
    </div>`;}).join('');
  fitAlgoSamples($('algoRows'));
  requestAnimationFrame(()=>fitAlgoSamples($('algoRows')));           // 레이아웃 확정 후 1회 더
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>fitAlgoSamples($('algoRows')));  // 웹폰트 로드 후 재계산
  $('algoRows').querySelectorAll('.algo-row').forEach(row=>{
    const k=row.dataset.key;
    row.querySelectorAll('[data-code]').forEach(b=>b.onclick=()=>{
      const arr=ALGO16[k]||(ALGO16[k]=[]);
      const c=b.dataset.code, i=arr.indexOf(c);
      if(i>-1)arr.splice(i,1);else arr.push(c);
      b.classList.toggle('on');
      row.classList.toggle('empty',!arr.length);markDirty();
      row.querySelector('em').textContent=arr.length?arr.length+'개 지정':'미지정';
      updateTabCounts();
    });
  });
  updateTabCounts();
}
/* ---------- FONTMAP 동기화 (결과창 추천과 연결) ---------- */
function syncFontmapFrom(f){
  Object.entries(FONTMAP).forEach(([code,v])=>{
    const hit=v.fonts.find(x=>x.family===f.family);
    if(hit){hit.name=f.name;hit.type=f.cls.type;hit.weight=f.cls.weight;hit.mood=f.cls.mood.slice();}
  });
  if(curCode)renderStyle();
}
function poolFor(code){
  // 대표(primary) 우선 → 보조(secondary) 후순위. 상충 무드 조합은 자동으로 뒤로 밀린다
  return FONT_DB
    .filter(f=>!f.wfError&&!f.hideFromSearch&&f.css&&(f.style16||[]).includes(code))
    .map(f=>({f,r:fontRankFor(f,code),c:moodConflict(f.cls.mood||[])?1:0}))
    .sort((a,b)=>(a.r-b.r)||(a.c-b.c)||a.f.name.localeCompare(b.f.name))
    .map(x=>x.f);
}
function rebuildQuiet(){
  let added=0;
  Object.keys(FONTMAP).forEach(code=>{
    const arr=FONTMAP[code].fonts;
    if(arr.length>=8)return;
    const pool=poolFor(code);
    const fams=new Set(arr.map(x=>x.family));
    for(const f of pool){
      if(arr.length>=8)break;
      if(fams.has(f.family))continue;
      fams.add(f.family);
      arr.push({name:f.name,family:f.family,css:f.css,type:f.cls.type,weight:f.cls.weight,mood:(f.cls.mood||[]).slice()});
      added++;
    }
  });
  if(added&&curCode)renderStyle();
  return added;
}
function rebuildFontmapFromDB(){
  let changed=0;
  CODES.forEach(code=>{
    if(!FONTMAP[code])return;
    const pool=poolFor(code);
    const keep=FONTMAP[code].fonts.filter(x=>{
      const src=FONT_DB.find(f=>f.family===x.family);
      return src&&!src.wfError&&!src.hideFromSearch;
    });
    const fams=new Set(keep.map(x=>x.family));
    for(const f of pool){
      if(keep.length>=8)break;
      if(fams.has(f.family))continue;
      fams.add(f.family);
      keep.push({name:f.name,family:f.family,css:f.css,type:f.cls.type,weight:f.cls.weight,mood:f.cls.mood.slice()});
      changed++;
    }
    FONTMAP[code].fonts=keep.slice(0,8);
  });
  if(curCode){curFontIdx=0;renderStyle();}
  toast(changed?`추천 목록을 갱신했어요 (${changed}종 보충)`:'추천 목록이 최신 상태예요');
}
/* ---------- 탭5: 참고 이미지 관리 ---------- */
function renderAdminImage(){
  const code=$('imgStyleSel').value||Object.keys(STYLES)[0];
  const st=STYLES[code];
  st.kw=st.kw||[];
  const sm=styleSamples(code);
  $('imgStat').textContent=`${st.adj} · 키워드 ${st.kw.length}개 · 예시 이미지 ${sm.filter(s=>s&&s.url).length}/3`;
  $('adminImagePane').innerHTML=`
    <div class="ad-img-grid">
      <div class="ad-color-form">
        <label>가이드 문장 <span class="ad-optional">고객에게 보여줄 안내</span></label>
        <textarea data-ik="guide" rows="3">${(st.imgGuide||'').replace(/</g,'&lt;')}</textarea>
        <label style="margin-top:12px">검색 키워드 <span class="ad-optional">한글 표기 / 검색어(영문) 쌍</span></label>
        <div id="imgKws">${st.kw.map((k,i)=>`
          <div class="ad-kw-row" data-i="${i}">
            <input value="${(k[0]||'').replace(/"/g,'&quot;')}" data-kk="ko" placeholder="화면에 보일 이름">
            <input value="${(k[1]||'').replace(/"/g,'&quot;')}" data-kk="en" placeholder="검색어 (영문 권장)">
            <button class="ad-mini danger" data-kdel>삭제</button>
          </div>`).join('')}</div>
        <button class="ad-mini" id="imgKwAdd" style="margin-top:6px">＋ 키워드 추가</button>
        <button class="ad-apply" id="imgApply" style="margin-top:14px">이 스타일에 적용</button>
      </div>
      <div class="ad-color-preview">
        <div class="ad-prev-label">예시 이미지 3종 <span style="font-weight:500;color:var(--ink3)">· 결과 화면 앞 세 칸에 표시</span></div>
        <div class="ad-samp-list">${sm.map((s,i)=>`
          <div class="ad-samp" data-si="${i}">
            <div class="ad-samp-thumb${s&&s.url?' filled':''}">
              ${s&&s.url?`<img src="${s.url}" alt="예시 ${i+1}" onerror="this.style.display='none'">`:`<span>${i+1}</span>`}
            </div>
            <div class="ad-samp-fields">
              <input data-sk="url" value="${(s&&s.url||'').replace(/"/g,'&quot;')}" placeholder="이미지 주소 (https://…)">
              <input data-sk="src" value="${(s&&s.src||'').replace(/"/g,'&quot;')}" placeholder="출처 페이지 링크 (누르면 이동)">
              <input data-sk="credit" value="${(s&&s.credit||'').replace(/"/g,'&quot;')}" placeholder="출처 표기 (예: Unsplash · 작가명)">
            </div>
            <button class="ad-mini danger" data-sclear="${i}">비우기</button>
          </div>`).join('')}</div>
        <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-top:10px">
          이미지는 <b>주소(URL)</b>로 등록합니다. 저작권 확인이 끝난 이미지의 주소와 출처 페이지를 함께 넣어 주세요.
          입력 후 아래 <b>「예시 이미지 저장」</b> → 상단 <b>「수정된 HTML로 저장」</b>을 누르면 영구 반영됩니다.</p>
        <button class="ad-apply" id="sampApply" style="margin-top:10px">예시 이미지 저장</button>
        <div class="ad-prev-label" style="margin-top:18px">사용자 업로드 칸 <span style="font-weight:500;color:var(--ink3)">· 결과 화면 마지막 칸</span></div>
        <p style="font-size:11px;color:var(--ink2);line-height:1.6">고객이 직접 이미지를 올려 비교하는 자리입니다. 관리자가 채우지 않습니다.</p>
        <div class="ad-prev-label" style="margin-top:16px">고객 화면 미리보기</div>
        <div class="ad-img-prev">
          <div class="img-guide" style="margin:0 0 10px">${st.imgGuide||'가이드 문장이 없습니다'}</div>
          <div class="kw-row">${st.kw.map(k=>`<span class="kw">#${k[0]}</span>`).join('')||'<span style="font-size:11px;color:var(--ink3)">키워드가 없습니다</span>'}</div>
        </div>
      </div>
    </div>`;
  const pane=$('adminImagePane');
  const bindKwRows=()=>{
    pane.querySelectorAll('.ad-kw-row [data-kdel]').forEach(b=>b.onclick=()=>{
      b.closest('.ad-kw-row').remove();});
  };
  bindKwRows();
  $('imgKwAdd').onclick=()=>{
    const wrap=document.createElement('div');
    wrap.className='ad-kw-row';
    wrap.innerHTML=`<input data-kk="ko" placeholder="화면에 보일 이름"><input data-kk="en" placeholder="검색어 (영문 권장)"><button class="ad-mini danger" data-kdel>삭제</button>`;
    $('imgKws').appendChild(wrap);
    wrap.querySelector('[data-kdel]').onclick=()=>wrap.remove();
    wrap.querySelector('input').focus();
  };
  $('imgApply').onclick=()=>{
    st.imgGuide=pane.querySelector('[data-ik="guide"]').value.trim();
    st.kw=[...pane.querySelectorAll('.ad-kw-row')].map(r=>[
      r.querySelector('[data-kk="ko"]').value.trim(),
      r.querySelector('[data-kk="en"]').value.trim()
    ]).filter(k=>k[0]);
    markDirty();
    if(curCode===code)renderStyle();
    renderAdminImage();
    toast(st.adj+' 이미지 가이드를 적용했어요');
  };
  const readSamples=()=>[...pane.querySelectorAll('.ad-samp')].map(r=>({
    url:r.querySelector('[data-sk="url"]').value.trim(),
    src:r.querySelector('[data-sk="src"]').value.trim(),
    credit:r.querySelector('[data-sk="credit"]').value.trim()
  }));
  $('sampApply').onclick=()=>{
    const arr=readSamples();
    const bad=arr.find(s=>s.url&&!/^https?:\/\//i.test(s.url));
    if(bad){toast('이미지 주소는 http:// 또는 https:// 로 시작해야 해요');return;}
    STYLE_SAMPLES[code]=arr;
    markDirty();
    if(curCode===code)renderStyle();
    renderAdminImage();
    toast(`예시 이미지 ${arr.filter(s=>s.url).length}종을 저장했어요`);
  };
  pane.querySelectorAll('[data-sclear]').forEach(b=>b.onclick=()=>{
    const r=b.closest('.ad-samp');
    r.querySelectorAll('input').forEach(i=>i.value='');
    r.querySelector('.ad-samp-thumb').classList.remove('filled');
    r.querySelector('.ad-samp-thumb').innerHTML=`<span>${+b.dataset.sclear+1}</span>`;
  });
  pane.querySelectorAll('[data-sk="url"]').forEach(inp=>inp.onchange=()=>{
    const th=inp.closest('.ad-samp').querySelector('.ad-samp-thumb');
    const v=inp.value.trim();
    if(v){th.classList.add('filled');th.innerHTML=`<img src="${v}" alt="" onerror="this.style.display='none'">`;}
  });
}
/* ---------- 탭4: 색상 가이드라인 ---------- */
function adminRangeBarsHTML(v,ref){
  const mid=Math.round(ref.h);
  const hueStops=[]; for(let i=0;i<=36;i++) hueStops.push(`${hsb2hex(i*10,65,90)} ${(i/36*100).toFixed(1)}%`);
  const spans=v.hue.map(([a,b])=>a<=b?[[a,b]]:[[a,360],[0,b]]).flat().sort((x,y)=>x[0]-y[0]);
  let cur=0,hueMasks='';
  spans.forEach(([a,b])=>{if(a>cur)hueMasks+=`<span class="mask" style="left:${cur/3.6}%;width:${(a-cur)/3.6}%"></span>`;cur=b;});
  if(cur<360)hueMasks+=`<span class="mask" style="left:${cur/3.6}%;width:${(360-cur)/3.6}%"></span>`;
  hueMasks+=v.hue.map(([a,b])=>a<=b
    ?`<span class="win" style="left:${a/3.6}%;width:${(b-a)/3.6}%"></span>`
    :`<span class="win" style="left:${a/3.6}%;width:${(360-a)/3.6}%"></span><span class="win" style="left:0%;width:${b/3.6}%"></span>`).join('');
  const sGrad=[0,25,50,75,100].map(x=>hsb2hex(mid,x,Math.max(ref.b,45))).join(',');
  const bGrad=[0,25,50,75,100].map(x=>hsb2hex(mid,Math.max(ref.s,30),x)).join(',');
  const mini=(grad,lo,hi,dot)=>`<div class="rb" style="background:linear-gradient(90deg,${grad})">
    <span class="mask" style="left:0;width:${lo}%"></span><span class="mask" style="left:${hi}%;width:${100-hi}%"></span>
    <span class="win" style="left:${lo}%;width:${hi-lo}%"></span><span class="dot" style="left:${dot}%;background:${ref.hex}"></span></div>`;
  return `
    <div class="rb-label"><span>색상</span><span class="val">허용 ${v.hue.map(([a,b])=>a+'°–'+b+'°').join(' · ')}</span></div>
    <div class="rb" style="background:linear-gradient(90deg,${hueStops.join(',')})">${hueMasks}<span class="dot" style="left:${ref.h/3.6}%;background:${ref.hex}"></span></div>
    <div class="rb-label" style="margin-top:12px"><span>채도</span><span class="val">허용 ${v.sat[0]}–${v.sat[1]}</span></div>${mini(sGrad,v.sat[0],v.sat[1],ref.s)}
    <div class="rb-label" style="margin-top:12px"><span>명도</span><span class="val">허용 ${v.bri[0]}–${v.bri[1]}</span></div>${mini(bGrad,v.bri[0],v.bri[1],ref.b)}`;
}
function readColorForm(){
  const g=k=>document.querySelector(`#adminColorPane [data-k="${k}"]`).value;
  const hue=[[+g('h1a'),+g('h1b')]];
  if(g('h2a')!==''&&g('h2b')!=='') hue.push([+g('h2a'),+g('h2b')]);
  return {adj:g('adj'),sub:g('sub'),hue,sat:[+g('s0'),+g('s1')],bri:[+g('b0'),+g('b1')],scheme:g('scheme'),note:g('note'),forbid:g('forbid')};
}
function colorFormWarnings(v){
  const w=[],ok=n=>Number.isFinite(n)&&n>=0&&n<=360;
  if(!(ok(v.hue[0][0])&&ok(v.hue[0][1])))w.push('색상역 1의 값은 0~360 사이 숫자여야 해요');
  if(v.hue[1]&&!(ok(v.hue[1][0])&&ok(v.hue[1][1])))w.push('색상역 2의 값은 0~360 사이 숫자여야 해요');
  if(!(v.sat[0]>=0&&v.sat[1]<=100&&v.sat[0]<=v.sat[1]))w.push('채도는 0~100 사이, 최소가 최대보다 작아야 해요');
  if(!(v.bri[0]>=0&&v.bri[1]<=100&&v.bri[0]<=v.bri[1]))w.push('명도는 0~100 사이, 최소가 최대보다 작아야 해요');
  return w;
}
function renderColorPreview(v){
  const warns=colorFormWarnings(v);
  $('colorWarn').innerHTML=warns.map(x=>`<div class="ad-warn-line">⚠ ${x}</div>`).join('');
  if(warns.length){$('colorPrevRanges').innerHTML='';$('colorPrevPal').innerHTML='';return;}
  const pal=previewPalette(v,v.scheme), ref=pal[v.scheme==='acc'?2:0];
  $('colorPrevRanges').innerHTML=adminRangeBarsHTML(v,ref);
  $('colorPrevPal').innerHTML=pal.map(c=>`<div class="prev-chip-wrap"><span class="prev-chip" style="background:${c.hex}"></span><em>${c.hex}</em></div>`).join('');
}
function bindColorForm(code){
  document.querySelectorAll('#adminColorPane [data-k]').forEach(el=>el.oninput=()=>renderColorPreview(readColorForm()));
  $('colorApplyBtn').onclick=()=>{
    const v=readColorForm();
    if(colorFormWarnings(v).length){toast('경고를 먼저 해결해 주세요');return;}
    const st=STYLES[code];
    Object.assign(st,{adj:v.adj,sub:v.sub,hue:v.hue,sat:v.sat,bri:v.bri,scheme:v.scheme,note:v.note,forbid:v.forbid});
    if(STY16[code])STY16[code].name=v.adj;
    buildMap();
    const opt=[...$('adminStyleSel').options].find(o=>o.value===code);
    if(opt)opt.textContent=`${v.adj} (${code})`;
    if(curCode===code){curScheme=v.scheme;curAnchor={h:null,s:null,b:null};curLocks=[false,false,false,false,false];curPal=genPalette(STYLES[code],curScheme);renderStyle();}
    markDirty();toast(v.adj+' 색상 가이드라인이 적용됐어요');
  };
}
function renderAdminColor(){
  const code=$('adminStyleSel').value||Object.keys(STYLES)[0];
  const st=STYLES[code], h2=st.hue[1]||['',''];
  $('adminStat').textContent=`${st.adj} · 색상 가이드라인`;
  $('adminColorPane').innerHTML=`
    <div class="ad-color-grid">
      <div class="ad-color-form">
        <label>메인 이름</label><input data-k="adj" value="${st.adj.replace(/"/g,'&quot;')}">
        <label>보조 설명</label><input data-k="sub" value="${st.sub.replace(/"/g,'&quot;')}">
        <div class="ad-row2"><div><label>색상역 1 · 시작°</label><input type="number" min="0" max="360" data-k="h1a" value="${st.hue[0][0]}"></div>
        <div><label>색상역 1 · 끝°</label><input type="number" min="0" max="360" data-k="h1b" value="${st.hue[0][1]}"></div></div>
        <div class="ad-row2"><div><label>색상역 2 · 시작°<span class="ad-optional">선택</span></label><input type="number" min="0" max="360" data-k="h2a" value="${h2[0]}"></div>
        <div><label>색상역 2 · 끝°<span class="ad-optional">선택</span></label><input type="number" min="0" max="360" data-k="h2b" value="${h2[1]}"></div></div>
        <div class="ad-row2"><div><label>채도 최소</label><input type="number" min="0" max="100" data-k="s0" value="${st.sat[0]}"></div>
        <div><label>채도 최대</label><input type="number" min="0" max="100" data-k="s1" value="${st.sat[1]}"></div></div>
        <div class="ad-row2"><div><label>명도 최소</label><input type="number" min="0" max="100" data-k="b0" value="${st.bri[0]}"></div>
        <div><label>명도 최대</label><input type="number" min="0" max="100" data-k="b1" value="${st.bri[1]}"></div></div>
        <label>배색 방식</label>
        <select data-k="scheme">${Object.entries(SCHEMES).map(([k,s])=>`<option value="${k}" ${k===st.scheme?'selected':''}>${s.name} · ${s.easy}</option>`).join('')}</select>
        <label>이렇게 (운용 노트)</label><textarea data-k="note" rows="2">${st.note.replace(/</g,'&lt;')}</textarea>
        <label>피하세요</label><textarea data-k="forbid" rows="2">${(st.forbid||'').replace(/</g,'&lt;')}</textarea>
        <button class="ad-apply" id="colorApplyBtn" style="margin-top:14px">이 스타일에 적용</button>
        <div id="colorWarn"></div>
      </div>
      <div class="ad-color-preview">
        <div class="ad-prev-label">실시간 미리보기</div>
        <div id="colorPrevRanges"></div>
        <div id="colorPrevPal" class="ad-prev-pal"></div>
        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line)">
          <div class="ad-prev-label">추천 폰트 목록 재생성</div>
          <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-bottom:9px">폰트 리스트·분류 탭에서 16유형 태그나 오류 플래그를 바꾼 뒤 누르면, 결과창의 추천 8종을 다시 채웁니다.</p>
          <button class="ad-apply" onclick="rebuildFontmapFromDB()">추천 목록 갱신</button>
        </div>
      </div>
    </div>`;
  bindColorForm(code);
  renderColorPreview(readColorForm());
}
function adminClose(){
  if(!guardLeave())return;
  exitAdminMode();
  window.close();            // 새 창이면 닫히고, 같은 탭이면 진단 화면으로 복귀
  $('intro').classList.remove('hidden');
  requestAnimationFrame(()=>$('intro').classList.add('show'));
}
window.addEventListener('beforeunload',e=>{
  // v14.0: 관리자 미저장 변경 + 세션 한정 업로드 로고를 함께 경고
  const dirtyAdmin=document.body.classList.contains('admin-mode')&&adminDirty;
  if(dirtyAdmin||userLogoActive()){e.preventDefault();e.returnValue='';}
});
/* ============================================================
   v0.15.0 웹 배포판 — 데이터 저장 방식 전환
   단일 HTML을 다시 굽는 방식은 정적 호스팅에서 쓸 수 없다.
   대신 화면에서 편집한 데이터를 assets/data/bsm-data.js 와
   똑같은 형태로 내려받아, 서버의 같은 파일을 덮어쓰면 반영된다.
   ============================================================ */
function currentDataObject(){
  return {__meta:{version:APP_VERSION,exportedAt:new Date().toISOString(),
                  fonts:FONT_DB.length,mockups:Object.keys(MOCKUP_IMGS).length},
    FONT_DB,ALGO16,ALGO_META,STY16,STYLES,STYLE_SAMPLES,CLS_SAMPLE,FONTMAP,MOCKUP_IMGS};
}
function saveHtmlFile(){ exportDataFile(); }      // 기존 호출부 호환

/* v0.17.0: 깃허브 등 정적 호스팅에 그대로 올릴 수 있는 폴더 전체를 .zip으로 내보낸다.
   index.html · app.js · app.css · 기존 이미지는 서버에 이미 있는 원본을 그대로 담고,
   바뀌는 것(데이터·새로 올린 이미지·버전 표시)만 새로 만들어 넣는다. */
function loadJSZip(){
  // v0.17.0: CDN 의존을 없애기 위해 압축 라이브러리를 assets/js/에 함께 배포한다 (오프라인·사내망에서도 동작)
  if(window.JSZip)return Promise.resolve(window.JSZip);
  return new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='assets/js/jszip.min.js';
    s.onload=()=>res(window.JSZip);
    s.onerror=()=>rej(new Error('압축 라이브러리(assets/js/jszip.min.js)를 불러오지 못했어요'));
    document.head.appendChild(s);
  });
}
/* 세션 중 새로 올린 이미지(data: URI)를 실제 파일로 뽑아내고, 데이터의 참조를
   파일 경로로 바꿔 bsm-data.js가 커지지 않게 한다. */
function extractDataUris(obj){
  const files=[]; let n=0;
  const put=(uri)=>{
    const m=/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/.exec(uri);
    if(!m)return uri;
    const ext=m[1].replace('jpeg','jpg').replace('svg+xml','svg');
    const bin=atob(m[2]); const arr=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
    n++;
    const path=`assets/img/mockups/upload-${Date.now().toString(36)}-${n}.${ext}`;
    files.push({path,bytes:arr});
    return path;
  };
  Object.values(obj.MOCKUP_IMGS).forEach(v=>{
    if(v.src&&v.src.startsWith('data:'))v.src=put(v.src);
    if(Array.isArray(v.layers))v.layers=v.layers.map(u=>(u&&u.startsWith('data:'))?put(u):u);
  });
  return files;
}
/* v0.18.0: 파일을 그대로 열었을 때(file://)는 브라우저가 자신의 파일을 fetch()로
   읽는 것 자체를 막기 때문에 이 기능이 항상 실패한다 — 원인을 짐작하기 어려운
   "app.js를 담지 못했어요" 경고 대신, 원인과 해결책을 바로 알려준다. */
async function fetchWithRetry(url,tries){
  tries=tries||3; let lastErr=null;
  for(let i=0;i<tries;i++){
    try{
      const bust=url+(url.indexOf('?')>-1?'&':'?')+'_r='+Date.now()+i;
      const r=await fetch(bust,{cache:'no-store'});
      if(r.ok)return r;
      lastErr=new Error('HTTP '+r.status);
    }catch(e){ lastErr=e; }
    if(i<tries-1)await new Promise(res=>setTimeout(res,250*(i+1)));
  }
  throw lastErr||new Error('알 수 없는 오류');
}
async function exportSiteZip(){
  if(location.protocol==='file:'){
    alert('이 기능은 파일을 더블클릭해 열었을 때(file://)는 사용할 수 없습니다.\n\n'
      +'브라우저가 로컬 파일을 읽어오는 것을 막기 때문에 항상 실패합니다.\n\n'
      +'터미널에서 이 폴더 안에 들어가 아래 명령을 실행한 뒤,\n'
      +'python3 -m http.server 8080\n\n'
      +'http://localhost:8080 으로 접속해서 다시 시도해 주세요.');
    return;
  }
  let obj;
  try{ obj=currentDataObject(); }catch(e){ alert('데이터를 모으는 중 오류가 발생했습니다: '+e.message); return; }
  let back;
  try{ back=JSON.parse(JSON.stringify(obj)); }catch(e){ alert('데이터 직렬화에 실패했습니다: '+e.message); return; }
  const curErr=FONT_DB.filter(f=>f.wfError).length, bakErr=back.FONT_DB.filter(f=>f.wfError).length;
  if(back.FONT_DB.length!==FONT_DB.length||curErr!==bakErr||
     Object.keys(back.MOCKUP_IMGS).length!==Object.keys(MOCKUP_IMGS).length){
    alert(`내보내기 검증 실패 — 글꼴 ${FONT_DB.length}종/오류 ${curErr}건이 내보낼 데이터(${back.FONT_DB.length}종/${bakErr}건)와 다릅니다.\n저장을 중단했습니다.`);
    return;
  }
  toast('웹 업로드용 폴더를 준비하고 있어요…');
  let JSZipLib;
  try{ JSZipLib=await loadJSZip(); }
  catch(e){ alert('압축 라이브러리를 불러오지 못했어요. 인터넷 연결을 확인해 주세요.'); return; }
  // 필수 파일(app.js)을 먼저 확보한다 — 실패하면 버전을 올리지 않고 그대로 중단한다
  let appJsCode;
  try{
    const r=await fetchWithRetry('assets/js/app.js',3);
    appJsCode=await r.text();
  }catch(e){
    alert('app.js를 3번 재시도했지만 불러오지 못해 내보내기를 중단했습니다.\n\n'
      +'페이지를 새로고침한 뒤 다시 시도해 주세요. (같은 화면을 오래 열어 둔 경우 세션이 끊겼을 수 있어요)');
    return;
  }
  const newVer=bumpVersion();
  const today=new Date().toISOString().slice(0,10);
  obj.__meta.version=newVer; obj.__meta.exportedAt=new Date().toISOString();
  const newImgFiles=extractDataUris(obj);
  const zip=new JSZipLib(); const root='bsm16-web';
  appJsCode=appJsCode.replace(/let APP_VERSION='[\d.]+';/, `let APP_VERSION='${newVer}';`)
                     .replace(/const BUILD_DATE='[\d-]+';/, `const BUILD_DATE='${today}';`);
  zip.file(root+'/assets/js/app.js', appJsCode);
  const STATIC=['index.html','site.webmanifest','.htaccess','README.md','assets/css/app.css','assets/js/jszip.min.js'];
  const EXIST_IMGS=[...new Set(Object.values(MOCKUP_IMGS).flatMap(v=>[v.src,...(v.layers||[])])
    .filter(u=>u&&!u.startsWith('data:')))];
  EXIST_IMGS.push('assets/img/brand/markinfo-logo.webp','assets/img/brand/favicon.ico',
    'assets/img/brand/favicon-16.png','assets/img/brand/favicon-32.png','assets/img/brand/favicon-48.png',
    'assets/img/brand/favicon-180.png','assets/img/brand/favicon-192.png','assets/img/brand/favicon-512.png',
    'assets/img/brand/apple-touch-icon.png');
  let fetchFail=0; const failedFiles=[];
  for(const rel of [...STATIC,...new Set(EXIST_IMGS)]){
    try{
      const r=await fetchWithRetry(rel,2);
      zip.file(root+'/'+rel, await r.arrayBuffer());
    }catch(e){fetchFail++;failedFiles.push(rel);}
  }
  newImgFiles.forEach(f=>zip.file(root+'/'+f.path, f.bytes));
  const body='/* 브랜드 스타일 매트릭스 16 — 데이터 파일\n'
    +'   생성: '+new Date().toISOString()+' · 버전 v'+newVer+'\n'
    +'   글꼴 '+FONT_DB.length+'종 · 목업 '+Object.keys(MOCKUP_IMGS).length+'개 */\n'
    +'window.BSM_DATA = '+JSON.stringify(obj)+';\n';
  zip.file(root+'/assets/data/bsm-data.js', body);
  zip.file(root+'/version.json', JSON.stringify({version:newVer,buildDate:today,
    fonts:FONT_DB.length,mockups:Object.keys(MOCKUP_IMGS).length,styles:Object.keys(STYLES).length},null,2)+'\n');
  const blob=await zip.generateAsync({type:'blob'});
  const a=document.createElement('a');
  a.download=`bsm16-web_v${newVer}.zip`;
  a.href=URL.createObjectURL(blob); a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),8000);
  clearDirty();
  if(fetchFail){
    console.warn('[웹 업로드용 폴더 내보내기] 담지 못한 파일:',failedFiles);
    toast(`v${newVer} 폴더(.zip)를 내려받았어요 · 일부 파일 ${fetchFail}개는 담지 못했어요 (콘솔 확인)`);
  }else{
    toast(`v${newVer} 웹 업로드용 폴더(.zip)를 내려받았어요`);
  }
}
function exportDataFile(){
  let obj;
  try{ obj=currentDataObject(); }
  catch(e){ alert('데이터를 모으는 중 오류가 발생했습니다: '+e.message); return; }
  // 내보내기 검증 — 직렬화 후 되읽어 폰트 수·오류 플래그 수가 같은지 확인한다
  let text, back;
  try{
    text=JSON.stringify(obj);
    back=JSON.parse(text);
  }catch(e){ alert('데이터 직렬화에 실패했습니다: '+e.message); return; }
  const curErr=FONT_DB.filter(f=>f.wfError).length;
  const bakErr=back.FONT_DB.filter(f=>f.wfError).length;
  if(back.FONT_DB.length!==FONT_DB.length||curErr!==bakErr||
     Object.keys(back.MOCKUP_IMGS).length!==Object.keys(MOCKUP_IMGS).length){
    alert(`내보내기 검증 실패 — 글꼴 ${FONT_DB.length}종/오류 ${curErr}건이 내보낼 데이터(${back.FONT_DB.length}종/${bakErr}건)와 다릅니다.\n저장을 중단했습니다.`);
    return;
  }
  const newVer=bumpVersion();
  obj.__meta.version=newVer;
  const body='/* 브랜드 스타일 매트릭스 16 — 데이터 파일\n'
    +'   생성: '+new Date().toISOString()+' · 버전 v'+newVer+'\n'
    +'   이 파일을 서버의 assets/data/bsm-data.js 위에 덮어쓰면 반영됩니다.\n'
    +'   글꼴 '+FONT_DB.length+'종 · 목업 '+Object.keys(MOCKUP_IMGS).length+'개 */\n'
    +'window.BSM_DATA = '+JSON.stringify(obj)+';\n';
  const a=document.createElement('a');
  a.download='bsm-data.js';
  a.href=URL.createObjectURL(new Blob([body],{type:'text/javascript'}));
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  clearDirty();
  toast(`v${newVer} 데이터 파일을 내려받았어요 — 서버의 bsm-data.js를 덮어쓰세요`);
}
/* 내려받은 bsm-data.js(또는 JSON)를 현재 화면으로 되돌려 넣기 */
function importDataFile(inp){
  const f=inp.files&&inp.files[0]; inp.value='';
  if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    let txt=String(r.result).trim();
    try{
      const m=txt.match(/window\.BSM_DATA\s*=\s*([\s\S]*?);?\s*$/);
      const obj=JSON.parse(m?m[1]:txt);
      const need=['FONT_DB','STYLES','STY16','FONTMAP','MOCKUP_IMGS'];
      const miss=need.filter(k=>!obj[k]);
      if(miss.length){alert('데이터 파일이 아닙니다 — 없는 항목: '+miss.join(', '));return;}
      if(!confirm(`불러오면 현재 화면의 데이터를 덮어씁니다.\n\n글꼴 ${obj.FONT_DB.length}종 · 목업 ${Object.keys(obj.MOCKUP_IMGS).length}개\n버전 ${(obj.__meta&&obj.__meta.version)||'미기재'}\n\n계속할까요?`))return;
      Object.keys(BSM_DATA).forEach(k=>{ if(obj[k]!==undefined)replaceData(k,obj[k]); });
      alert('데이터를 불러왔습니다. 화면을 새로 그립니다.');
      location.hash=''; location.reload();
    }catch(e){ alert('읽을 수 없는 파일입니다: '+e.message); }
  };
  r.readAsText(f);
}
/* 데이터 객체는 const로 잡혀 있으므로 내용만 갈아 끼운다 */
function replaceData(key,val){
  const tgt=BSM_DATA[key];
  if(Array.isArray(tgt)&&Array.isArray(val)){tgt.length=0;val.forEach(v=>tgt.push(v));}
  else if(tgt&&typeof tgt==='object'){Object.keys(tgt).forEach(k=>delete tgt[k]);Object.assign(tgt,val);}
  else BSM_DATA[key]=val;
}
/* 결과 화면 글꼴 로드 상태 표시 */
async function checkResultFonts(){
  if(!document.fonts||!curCode)return;
  const fonts=FONTMAP[curCode]?.fonts||[];
  const rows=document.querySelectorAll('#result .font-row');
  for(let i=0;i<fonts.length&&i<rows.length;i++){
    const ok=await checkFontLoad(fontFamilyKey(fonts[i].family));
    if(ok===false&&!rows[i].querySelector('.wf-fail')){
      const s=document.createElement('span');
      s.className='font-name wf-fail';s.style.color='var(--warn)';
      s.textContent='⚠ 로드 실패';
      s.title='하단 관리자에서 수정할 수 있어요';
      rows[i].appendChild(s);
    }
  }
}

/* ================= INIT ================= */
(function initVer(){const el=document.getElementById('verLabel');if(el)el.textContent='v'+APP_VERSION;})();
buildAxes();
buildMap();
render();
/* 부팅 시 화면 상태 강제 정규화 — 저장본에 어떤 상태가 남아 있어도 항상 홈으로 */
(function(){
  document.body.classList.remove('admin-mode');
  $('intro').classList.remove('hidden');$('intro').classList.add('show');
  $('app').classList.remove('on');
  const s=$('adminSec'); if(s)s.classList.add('hidden');
})();
/* 관리자 스크롤 시 우하단 '맨 위로' 버튼 */
(function(){
  const b=document.createElement('button');b.id='toTopBtn';b.title='맨 위로';b.textContent='↑';
  b.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.body.appendChild(b);
  window.addEventListener('scroll',()=>{
    b.classList.toggle('show',document.body.classList.contains('admin-mode')&&window.scrollY>420);
  },{passive:true});
})();
initBizChips();
if(location.hash==='#admin'){ enterAdminMode(); }
(function normalizeAllStyles(){
  // 알고리즘 기준으로 16유형을 일괄 재산출 (사용자 주관 제거)
  let n=0;
  FONT_DB.forEach(f=>{
    if(!f.cls)f.cls={type:f.cat||'고딕',mood:[],weight:'보통'};
    // 상충 무드가 저장돼 있으면 두 번째를 제거
    const cf=moodConflict(f.cls.mood||[]);
    if(cf){f.cls.mood=f.cls.mood.filter(m=>m!==cf[1]);n++;}
    applyAutoStyles(f);
  });
  if(n)console.info(`[무드 상충 정리] ${n}종`);
  // 추천 목록도 알고리즘 순서로 재구성
  Object.keys(FONTMAP).forEach(code=>{
    const keep=FONTMAP[code].fonts.filter(x=>{
      const src=FONT_DB.find(f=>f.family===x.family);
      return src&&!src.wfError&&!src.hideFromSearch&&(src.style16||[]).includes(code);
    });
    const pool=poolFor(code), fams=new Set(keep.map(x=>x.family));
    for(const f of pool){
      if(keep.length>=8)break;
      if(fams.has(f.family))continue;
      fams.add(f.family);
      keep.push({name:f.name,family:f.family,css:f.css,type:f.cls.type,weight:f.cls.weight,mood:(f.cls.mood||[]).slice()});
    }
    // 대표(primary) → 보조(secondary) 순으로 최종 정렬
    keep.sort((a,b)=>{
      const sa=FONT_DB.find(f=>f.family===a.family), sb=FONT_DB.find(f=>f.family===b.family);
      const ra=sa?fontRankFor(sa,code):9, rb=sb?fontRankFor(sb,code):9;
      return ra-rb;
    });
    FONTMAP[code].fonts=keep.slice(0,8);
  });
})();
setTimeout(()=>{try{autoFlagOnLoad();}catch(e){}},1200);
window.addEventListener('hashchange',()=>{
  if(location.hash==='#admin')enterAdminMode();
  else if(document.body.classList.contains('admin-mode'))exitAdminMode();
});
/* 랜딩 디밍 연출 — 처음 열릴 때만 부드럽게 걷힘 */
requestAnimationFrame(()=>{
  requestAnimationFrame(()=>{
    const intro=$('intro'); if(intro)intro.classList.add('show');
    const veil=$('dimVeil');
    if(veil){veil.classList.add('hide');setTimeout(()=>veil.remove(),1300);}
  });
});


/* ---- 로컬 파일(file://)로 열었을 때 안내 ----
   목업 이미지가 별도 파일이라 file:// 에서는 캔버스가 오염되어
   합성 결과 저장(PNG·JPG·SVG)이 브라우저에서 차단된다. */
(function(){
  if(location.protocol!=='file:')return;
  document.addEventListener('DOMContentLoaded',()=>{
    const b=document.createElement('div');
    b.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#C2542F;color:#fff;'
      +'font:600 12.5px/1.55 Pretendard,sans-serif;padding:11px 16px;text-align:center';
    b.innerHTML='로컬 파일로 열려 있어 목업 이미지 합성과 내보내기가 브라우저에 의해 차단됩니다 · '
      +'폴더에서 <b>python3 -m http.server 8080</b> 실행 후 <b>localhost:8080</b> 으로 여세요 '
      +'<span style="opacity:.75">(웹에 업로드한 뒤에는 이 안내가 나오지 않습니다)</span>';
    document.body.appendChild(b);
  });
})();
