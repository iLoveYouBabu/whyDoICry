(() => {
  'use strict';
  const { SCENES, ENDINGS } = WDIC;
  const e = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chapters = [...new Set(Object.values(SCENES).map(scene => scene.chapter))];
  const labels = { '01':'빌려 온 휴가', '02':'시간을 건너다', '03':'첫 만남과 두 갈래 길', '04':'함께한 계절', '05':'폭풍우의 밤', '06':'두 사람의 기억', '07':'현재의 대답', '—':'세계 붕괴' };
  const endingNodes = id => Object.entries(SCENES).filter(([,s])=>s.ending===id);
  const count = type => Object.values(ENDINGS).filter(end=>end.type===type).length;
  const routeName = id => id.startsWith('b_') ? '친구의 이야기' : ['prologue','friend_meeting','two_paths'].includes(id) || ['01','02','03','—'].includes(SCENES[id].chapter) ? '공통' : '산장의 그녀';
  const target = (id,text) => `<a href="#scene-${id}">${e(text)} → ${e(SCENES[id].title)}</a>`;
  document.getElementById('counts').textContent = `${Object.keys(SCENES).length}개 장면 · ${Object.values(SCENES).filter(s=>s.choices).length}개 분기점 · 메인 엔딩 ${count('main')}개 · 세계 붕괴 ${count('collapse')}개`;
  document.getElementById('endings').innerHTML = Object.entries(ENDINGS).map(([id,end])=>`<tr><td>${e(end.label)}</td><td>${endingNodes(id).map(([node])=>target(node,`${end.order} · ${end.name} / ${routeName(node)}`)).join('<br>')}</td><td>${e(end.note)}${end.variants?.b ? `<br>친구 루트: ${e(end.variants.b.note)}` : ''}</td></tr>`).join('');
  document.getElementById('chapters').innerHTML = chapters.map((chapter,i)=>`<a href="#chapter-${i}">${chapter} ${labels[chapter]}</a>`).join('');
  const conditions = { reunion:'진실·준비·장소·마주한 작별 모두 충족',missed:'진실과 작별은 나눴지만 준비 또는 장소가 불완전',departure:'진실을 끝내 숨기거나 메시지만 남긴 작별',b_reunion:'봄의 고백·돌아온 뒤의 약속·마주한 작별 모두 충족',b_friend:'처음부터 친구로 남기로 정한 현재의 관계',b_late:'과거의 사랑은 남았지만 기다림 속 마음이 달라져 현재에는 친구를 선택' };
  function links(scene) {
    if(scene.ending) { const end=ENDINGS[scene.ending]; return `<p class="ending">${e(end.label)} · ${e(end.name)}</p>`; }
    if(scene.choices) return `<p class="prompt">${e(scene.prompt)}</p><div class="scene-links">${scene.choices.map((c,i)=>target(c.next,`${i+1}. ${c.text}`)).join('')}</div>`;
    if(scene.next?.route==='outcome') return `<div class="scene-links">${Object.entries(scene.next.to).map(([outcome,id])=>target(id,conditions[outcome])).join('')}</div>`;
    if(Array.isArray(scene.next)) return `<div class="scene-links">${scene.next.map(r=>target(r.to,r.when?Object.entries(r.when).map(([f,v])=>`${f} = ${v}`).join(' / '):'그 외')).join('')}</div>`;
    return `<div class="scene-links">${target(scene.next,'다음 장면')}</div>`;
  }
  const art = (key,place) => `<img loading="lazy" src="../assets/${key}.webp" alt="${e(place)} 장면">`;
  function dialogue(line,index) {
    const image=line.art?art(line.art,'장면 전환'):'';
    const speaker=`<span class="speaker">${index+1}. ${e(line.speaker||'서술')}</span>`;
    if(line.flag) return `${image}<div class="conditional"><small>${e(line.flag)} = ${e(line.equals??true)}</small><p>${speaker}${e(WDIC.sentenceLines(line.yes))}</p><small>다른 선택일 때</small><p>${e(WDIC.sentenceLines(line.no))}</p></div>`;
    return `${image}<p>${speaker}${e(WDIC.sentenceLines(line.text))}</p>`;
  }
  document.getElementById('scenes').innerHTML=chapters.map((chapter,i)=>`<section id="chapter-${i}"><h2 class="chapter-head">${chapter} · ${labels[chapter]}</h2><div class="scene-grid">${Object.entries(SCENES).filter(([,s])=>s.chapter===chapter).map(([id,scene])=>`<article class="scene-card" id="scene-${id}">${art(scene.art,scene.place)}<div class="scene-body"><small>${e(routeName(id))} · ${e(id)}</small><h3>${e(scene.title)}</h3><p class="scene-meta">${e(scene.place)}<br>${e(scene.date)} · ${e(scene.pov||'나')}의 시점</p><p class="scene-preview">${e(WDIC.sentenceLines(scene.lines[0].text||scene.lines[0].yes))}</p><details><summary>전체 대사 ${scene.lines.length}개</summary>${scene.lines.map(dialogue).join('')}</details>${links(scene)}</div></article>`).join('')}</div></section>`).join('');
  document.getElementById('expand').addEventListener('click',()=>document.querySelectorAll('details').forEach(d=>{d.open=true;}));
  document.getElementById('collapse').addEventListener('click',()=>document.querySelectorAll('details').forEach(d=>{d.open=false;}));
})();
