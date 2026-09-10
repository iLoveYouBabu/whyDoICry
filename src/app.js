(() => {
  'use strict';
  const { SCENES, ENDINGS, MEMORIES, createState, currentFrame, snapshot, advance, choose, rewind, retry, frameKey, isValidState, resumeSnapshot, transcript, NovelAudio } = WDIC;
  const $ = selector => document.querySelector(selector);
  const app = $('#app');
  const dialog = $('#dialog');
  const dialogContent = $('#dialog-content');
  const audio = new NovelAudio();
  const STORAGE_KEY = 'wdic-mobile-v4';
  const FORMAT = 'why-do-i-cry-mobile';
  const ART = {
    'b-meeting': { file: 'b-meeting.webp' },
    'b-winter': { file: 'b-winter.webp' },
    'b-coffee': { file: 'b-coffee.webp' },
    'b-summer': { file: 'b-summer.webp' },
    'b-farewell': { file: 'b-farewell.webp' },
    'b-alone': { file: 'b-alone.webp' },
    'b-friends': { file: 'b-friends.webp' },
    'b-keys': { file: 'b-keys.webp' },
    'b-reunion': { file: 'b-reunion.webp' },
    'b-friend-end': { file: 'b-friend-end.webp' },
    'b-stay': { file: 'b-stay.webp' },
    'b-together': { file: 'b-together.webp' },
    'bus-stop': { file: 'bus-stop.webp' },
    'bus-inside': { file: 'bus-inside.webp' },
    'bus-collapse': { file: 'bus-collapse.webp' },
    'airport-tears': { file: 'airport-tears.webp' },
    'tunnel-night': { file: 'tunnel-night.webp' },
    'reunion-night': { file: 'reunion-night.webp' },
    'cabin-last-morning': { file: 'cabin-last-morning.webp' },
    'together-collapse': { file: 'together-collapse.webp' },

    airport: { file: 'airport.webp', wide: true }, cabin: { file: 'cabin.webp', wide: true },
    'airport-her': { file: 'airport-her.webp' }, 'lake-empty': { file: 'lake-empty.webp' },
    'lake-meeting': { file: 'lake-meeting.webp' }, 'cabin-winter': { file: 'cabin-winter.webp' },
    'guitar-spring': { file: 'guitar-spring.webp' }, 'lake-rain': { file: 'lake-rain.webp' }, birthday: { file: 'birthday.webp' },
  };
  const svg = {
    arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>', back: '<path d="M20 12H5m5-5-5 5 5 5"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>', pause: '<path d="M8 5v14M16 5v14"/>',
    skip: '<path d="m4 6 8 6-8 6Zm9 0 8 6-8 6Z"/>', menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>', save: '<path d="M5 3h12l4 4v14H3V3Zm2 0v6h10V3M7 21v-8h10v8"/>',
    sound: '<path d="m11 4-6 5H2v6h3l6 5Zm4 4q4 4 0 8m3-11q7 7 0 14"/>',
    mute: '<path d="m11 4-6 5H2v6h3l6 5Zm5 5 6 6m0-6-6 6"/>',
    book: '<path d="M12 5Q7 2 2 4v16q5-2 10 1 5-3 10-1V4q-5-2-10 1Zm0 0v16"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${svg[name] || svg.arrow}</svg>`;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const copy = value => JSON.parse(JSON.stringify(value));
  const freshProgress = () => ({ format: FORMAT, version: WDIC.STORY_VERSION, saves: {}, endings: {}, bookmarks: {}, seen: [], prefs: { speed: 18, font: 18 } });
  const { validProgress } = WDIC;
  let storageOkay = true;
  let recoveryNotice = '';
  let progress = freshProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw && (localStorage.getItem('wdic-mobile-v3') || localStorage.getItem('wdic-mobile-v2'))) recoveryNotice = '친구의 이야기가 추가되어 이번 판은 새로 시작합니다. 이전 판의 저장 데이터는 삭제하지 않았어요.';
    if (raw) {
      const parsed = JSON.parse(raw);
      if (validProgress(parsed)) progress = parsed;
      else { storageOkay = false; recoveryNotice = '저장 데이터를 읽지 못했습니다. 기존 데이터는 덮어쓰지 않았어요. 백업 파일을 불러오거나 새 브라우저에서 시작해 주세요.'; }
    }
  } catch {
    storageOkay = false;
    recoveryNotice = '브라우저 저장 공간을 사용할 수 없습니다. 진행을 남기려면 메뉴에서 백업 파일을 내려받아 주세요.';
  }
  let seen = new Set(progress.seen);
  let state = progress.saves.auto ? copy(progress.saves.auto.state) : null;
  let offset = progress.saves.auto?.offset || 0;
  let screen = 'title';
  let typing = false;
  let fullPage = '';
  let pages = [];
  let pageIndex = 0;
  let auto = false;
  let skipping = false;
  let typeTimer, playTimer, toastTimer, resizeTimer;
  let choiceReadyAt = 0;
  let currentArt = '';
  let originFocus;
  let importCandidate = null;
  let galleryEnding = null;
  let pointer = null;
  let lastStepAt = 0;
  function writeProgress() {
    progress.seen = [...seen];
    if (!storageOkay) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { storageOkay = false; toast('자동 저장 공간이 부족합니다. 메뉴에서 백업 파일을 내려받아 주세요.'); }
  }
  function persist() {
    if (state) progress.saves.auto = { state: copy(state), offset };
    writeProgress();
  }
  function stopTimers() { clearTimeout(typeTimer); clearTimeout(playTimer); typing = false; }
  function stopPlayback() { auto = false; skipping = false; clearTimeout(playTimer); }
  function toast(text) {
    clearTimeout(toastTimer);
    $('#toast').textContent = text;
    $('#toast').classList.add('visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3600);
  }
  function setArt(key, mood = '') {
    const art = ART[key] || ART['lake-empty'];
    $('#scene').dataset.mood = mood;
    $('#scene').dataset.art = key;
    $('#scene').dataset.wide = String(!!art.wide);
    if (currentArt === key) return;
    currentArt = key;
    const url = `assets/${art.file}`;
    $('#scene-art').src = url;
    $('#scene-wash').style.backgroundImage = `url("${url}")`;
  }
  $('#scene-art').addEventListener('error', () => { $('#scene-art').style.opacity = '0'; toast('장면 파일이 없습니다. ZIP을 모두 압축 해제했는지 확인해 주세요.'); });
  $('#scene-art').addEventListener('load', () => { $('#scene-art').style.opacity = '1'; });
  const totalEndings = type => Object.values(ENDINGS).filter(ending => ending.type === type).length;
  const countEndings = type => Object.keys(progress.endings).filter(key => ENDINGS[key].type === type).length;
  const soundButton = () => `<button class="utility" data-action="sound" aria-label="소리 ${audio.enabled ? '끄기' : '켜기'}" aria-pressed="${audio.enabled}">${icon(audio.enabled ? 'sound' : 'mute')}<span>소리</span></button>`;
  function applyPrefs() { document.documentElement.style.setProperty('--prose-size', `${progress.prefs.font}px`); }
  function renderTitle() {
    stopTimers(); stopPlayback();
    screen = 'title'; galleryEnding = null;
    document.body.classList.remove('peeking');
    setArt('lake-empty');
    app.innerHTML = `<section class="title-screen"><header class="title-header"><span class="wordmark">Why do I cry?</span>${soundButton()}</header>
      <div class="title-main"><p class="eyebrow">A story across time</p><h1>Why do<br>I cry?</h1><p class="title-caption">“혹시 저를 아세요?”<br>“아직이요.”</p><div class="title-actions">
      ${progress.saves.auto ? `<button class="solid-button" data-action="continue">이어서 읽기 ${icon('arrow')}</button><button class="plain-button" data-action="new">처음부터</button>` : `<button class="solid-button" data-action="new">이야기 시작 ${icon('arrow')}</button>`}
      </div></div><footer class="title-footer"><div><button data-action="gallery">엔딩 보관함</button><span> · ${countEndings('main')} / ${totalEndings('main')}</span></div><div><button data-action="saves">저장</button><button data-action="settings">설정</button><button data-action="about">작품 안내</button></div></footer></section>`;
  }
  function renderGame({ instant = false, lastPage = false, focusChoices = false } = {}) {
    stopTimers();
    if (!state) return renderTitle();
    if (state.ending) return renderEnding(state.ending);
    screen = 'game'; galleryEnding = null;
    const f = currentFrame(state);
    const { scene, line, text, isChoice } = f;
    setArt(f.art, scene.mood);
    if (skipping && (isChoice || !seen.has(frameKey(state)))) {
      skipping = false;
      if (!isChoice) toast('처음 보는 문장에서 멈췄어요.');
    }
    if (isChoice) {
      pages = []; pageIndex = 0; offset = 0;
      choiceReadyAt = performance.now() + 450;
      progress.bookmarks[state.node] = snapshot(state);
      persist();
    } else {
      pages = WDIC.paginate(text, innerWidth, progress.prefs.font);
      pageIndex = lastPage ? pages.length - 1 : Math.max(0, pages.findLastIndex(page => page.start <= offset));
      offset = pages[pageIndex].start;
      fullPage = pages[pageIndex].text;
    }
    const reading = isChoice ? null : WDIC.readingProgress(state, offset, innerWidth, progress.prefs.font);
    app.innerHTML = `<section class="game-screen"><header class="game-header"><div class="chapter"><span class="chapter-num">${scene.chapter}</span><div><p class="eyebrow">${scene.pov ? 'Her side' : 'His side'}</p><h1>${escape(scene.title)}</h1></div></div><div class="header-tools">${soundButton()}<button class="utility" data-action="memories" aria-label="남겨 둔 기록">${icon('phone')}<span>기록</span></button></div></header>
      <div class="location"><span>${escape(scene.place)}</span><time>${escape(scene.date)}</time></div>${scene.pov ? `<p class="pov-label">${escape(scene.pov)}의 시점</p>` : ''}<div class="art-space"></div>
      <div class="reader-area">${isChoice ? `<section class="reader-panel choice-panel" aria-labelledby="choice-prompt"><p class="eyebrow">Your choice</p><h2 class="choice-heading" id="choice-prompt">${escape(scene.prompt)}</h2><div class="choices">${scene.choices.map((choice, i) => `<button class="choice" data-action="choose" data-index="${i}"><span class="choice-number">0${i + 1}</span><span>${escape(choice.text)}</span>${icon('arrow')}</button>`).join('')}</div><p class="choice-note">선택 직전에 자동으로 저장됩니다.</p></section>` : `<section class="reader-panel" aria-label="이야기"><div class="speaker-row"><span class="speaker">${escape(line.speaker || (scene.pov ? `${scene.pov}의 기억` : '나의 기억'))}</span><span class="page-count" aria-label="이 장면의 읽기 진행">${reading.current} / ${reading.total}</span></div><div class="copybox" tabindex="0" aria-label="대사 내용"><p class="prose prose-ghost" aria-hidden="true">${escape(fullPage)}</p><p class="prose prose-live" id="prose" aria-hidden="true"></p><p class="sr-only" role="status" aria-live="polite" aria-atomic="true">${escape(fullPage)}</p></div><div class="dialogue-bottom"><span class="reading-hint">화면을 눌러 계속 · 드래그는 스크롤</span><button class="next-button" data-action="next">계속 ${icon('arrow')}</button></div></section>`}
      <nav class="reader-toolbar" aria-label="읽기 도구"><button data-action="back" ${!state.trail.length && !offset ? 'disabled' : ''}>${icon('back')}이전</button><button data-action="auto" class="${auto ? 'active' : ''}" aria-pressed="${auto}">${icon(auto ? 'pause' : 'play')}자동</button><button data-action="skip" class="${skipping ? 'active' : ''}" aria-pressed="${skipping}">${icon('skip')}읽은 글</button><button data-action="saves">${icon('save')}저장</button><button data-action="menu">${icon('menu')}메뉴</button></nav></div><button class="peek-exit" data-action="peek-exit">이야기로 돌아가기</button></section>`;
    if (!isChoice) startTyping(instant || skipping);
    else if (focusChoices) $('.choice')?.focus({ preventScroll: true });
  }
  function startTyping(instant) {
    const target = $('#prose');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || reduced || progress.prefs.speed === 0) { target.textContent = fullPage; pageFinished(); return; }
    typing = true;
    const chars = Array.from(fullPage);
    let count = 0;
    const tick = () => {
      if (!target.isConnected) return;
      target.textContent = chars.slice(0, ++count).join('');
      if (count < chars.length) typeTimer = setTimeout(tick, progress.prefs.speed);
      else { typing = false; pageFinished(); }
    };
    tick();
  }
  function pageFinished() {
    if (pageIndex === pages.length - 1) { seen.add(frameKey(state)); writeProgress(); }
    schedulePlayback();
  }
  function reveal() {
    if (!typing) return;
    clearTimeout(typeTimer); typing = false;
    if ($('#prose')) $('#prose').textContent = fullPage;
    pageFinished();
  }
  function schedulePlayback() {
    clearTimeout(playTimer);
    if (screen !== 'game' || dialog.open || document.hidden || typing || document.body.classList.contains('peeking') || currentFrame(state).isChoice) return;
    if (skipping) playTimer = setTimeout(nextBeat, 180);
    else if (auto) playTimer = setTimeout(nextBeat, Math.max(2200, fullPage.length * 85));
  }
  function nextBeat() {
    if (screen !== 'game' || dialog.open || document.body.classList.contains('peeking')) return;
    if (typing) return reveal();
    if (performance.now() - lastStepAt < 120) return;
    if (currentFrame(state).isChoice) return;
    lastStepAt = performance.now();
    if (pageIndex < pages.length - 1) {
      offset = pages[pageIndex + 1].start;
      persist(); renderGame(); return;
    }
    state = advance(state); offset = 0;
    persist(); renderGame({ focusChoices: currentFrame(state).isChoice });
  }
  function stepBack() {
    if (screen !== 'game' || dialog.open) return;
    stopPlayback();
    if (pageIndex > 0 && !currentFrame(state).isChoice) {
      offset = pages[pageIndex - 1].start; persist(); renderGame({ instant: true }); return;
    }
    const previous = rewind(state);
    if (previous === state) return;
    state = previous; offset = 0;
    renderGame({ instant: true, lastPage: true }); persist();
  }
  function selectChoice(index, event) {
    if (screen !== 'game' || dialog.open || !currentFrame(state).isChoice) return;
    if (performance.now() < choiceReadyAt) return;
    const next = choose(state, index);
    if (next === state) return;
    state = next; offset = 0; skipping = false;
    persist(); renderGame();
  }
  function renderEnding(id, fromGallery = false) {
    stopTimers(); stopPlayback();
    screen = 'ending'; galleryEnding = fromGallery ? id : null;
    const last = fromGallery ? progress.endings[id] : state;
    const ending = WDIC.endingFor(id, last?.flags);
    if (!fromGallery && state?.ending === id) { progress.endings[id] = snapshot(state); persist(); }
    setArt(ending.art, ending.type === 'collapse' || ['stay', 'together'].includes(id) ? 'fracture' : '');
    app.innerHTML = `<section class="ending-screen"><header class="title-header"><button class="wordmark" data-action="title">Why do I cry?</button>${soundButton()}</header><div class="ending-content"><p class="eyebrow">${ending.label} · ${ending.order} / ${String(totalEndings(ending.type)).padStart(2, '0')}</p><span class="ending-rule"></span><h1>${ending.name}</h1><p class="ending-subtitle">${ending.subtitle}</p><p class="ending-quote">${escape(ending.quote)}</p><p class="ending-note">${ending.note}</p><div class="ending-actions"><button class="solid-button" data-action="retry" ${last?.checkpoint ? '' : 'disabled'}>직전 선택으로 ${icon('back')}</button><button class="plain-button" data-action="bookmarks">지나온 분기에서 다시 읽기</button></div><button class="text-link" data-action="route">내가 지나온 선택 ${last?.decisions.length || 0}</button></div><footer class="ending-footer"><span>메인 ${countEndings('main')} / ${totalEndings('main')} · 세계 붕괴 ${countEndings('collapse')} / ${totalEndings('collapse')}</span><button data-action="gallery">엔딩 보관함</button><button data-action="title">처음 화면</button></footer></section>`;
  }
  function openDialog(title, body) {
    reveal(); clearTimeout(playTimer);
    if (!dialog.open) originFocus = document.activeElement;
    dialogContent.innerHTML = `<header class="dialog-header"><h2 id="dialog-title">${escape(title)}</h2><button class="icon-button" data-action="close" aria-label="닫기">${icon('close')}</button></header>${body}`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  function closeDialog() { if (dialog.open) dialog.close(); }
  dialog.addEventListener('close', () => { audio.stopMemory(); if (originFocus?.isConnected) originFocus.focus({ preventScroll: true }); schedulePlayback(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  });
  function showMenu() {
    openDialog('잠시 쉬어 가기', `<div class="menu-grid"><button data-action="close">이야기 계속하기 ${icon('play')}</button><button data-action="history">대화 다시 보기 ${icon('book')}</button><button data-action="memories">남겨 둔 기록 ${icon('phone')}</button><button data-action="bookmarks">지나온 분기</button><button data-action="gallery">엔딩 보관함 <span>${countEndings('main')} / ${totalEndings('main')}</span></button><button data-action="settings">읽기 설정</button><button data-action="peek">장면만 보기</button><button data-action="title">처음 화면으로</button></div><p class="fine-print">${storageOkay ? '진행은 이 브라우저에 자동으로 저장됩니다.' : '자동 저장을 사용할 수 없습니다. 저장 메뉴에서 백업을 내려받아 주세요.'}</p>`);
  }
  function showMemories() {
    const ids = state?.memories || [];
    openDialog('남겨 둔 기록', ids.length ? [...ids].reverse().map(id => {
      const m = MEMORIES[id];
      return `<article class="memory-card"><div class="memory-meta"><span>${m.kind}</span><time>${m.date}</time></div><h3>${m.title}</h3><p>${escape(m.body)}</p>${m.audio ? `<button class="audio-memory" data-action="song">${icon('play')}<span>기타 선율 듣기 · 00:18</span></button>` : ''}</article>`;
    }).join('') : '<p class="empty-note">이야기 속 기억과 약속이 여기에 남습니다.</p>');
  }
  function showHistory() {
    openDialog('지나온 대화', transcript(state).map(row => `<div class="history-row ${row.speaker === '선택' ? 'decision' : ''}"><span>${escape(row.speaker)}</span><p>${escape(row.text)}</p></div>`).join('') || '<p class="empty-note">아직 남은 대화가 없어요.</p>');
    dialog.scrollTop = dialog.scrollHeight;
  }
  function showBookmarks() {
    const entries = Object.entries(progress.bookmarks);
    openDialog('지나온 분기', `<p class="fine-print">도착한 적 있는 선택에서 다시 시작할 수 있습니다. 각 장소에 마지막으로 도착했을 때의 약속과 기록을 함께 불러옵니다.</p>${entries.map(([id, saved]) => `<button class="bookmark" data-action="bookmark" data-key="${id}"><small>${SCENES[id].chapter} · ${SCENES[id].title} · ${saved.decisions.length}번의 선택 뒤</small><span>${escape(SCENES[id].prompt)}</span></button>`).join('') || '<p class="empty-note">첫 선택에 도착하면 분기가 기록됩니다.</p>'}`);
  }
  function showGallery() {
    openDialog('엔딩 보관함', ['main', 'collapse'].map(type => `<h3 class="dialog-section-title">${type === 'main' ? '메인 엔딩' : '세계 붕괴'} · ${countEndings(type)} / ${totalEndings(type)}</h3>${Object.entries(ENDINGS).filter(([, e]) => e.type === type).map(([id, e]) => progress.endings[id] ? `<button class="ending-card" data-action="ending" data-key="${id}"><small>${e.label} ${e.order}</small><strong>${e.name}</strong><span>${e.subtitle}</span></button>` : `<div class="ending-card locked"><small>${type === 'main' ? 'ENDING' : 'WORLD COLLAPSE'} ${e.order}</small><strong>아직 닿지 않은 이야기</strong></div>`).join('')}`).join(''));
  }
  function saveDescription(save) {
    if (!save) return '비어 있는 저장칸';
    const sc = SCENES[save.state.node];
    return `${sc.chapter} · ${sc.title} / ${sc.date}${save.state.ending ? ' · 엔딩 도달' : ''}`;
  }
  function showSaves() {
    openDialog('저장과 불러오기', `<p class="fine-print">${storageOkay ? '이 브라우저에 저장됩니다. 다른 기기로 옮기거나 오래 보관하려면 백업 파일을 내려받아 주세요.' : '브라우저 저장을 사용할 수 없습니다. 아래 백업 기능으로 현재 진행을 파일에 남겨 주세요.'}</p>
      ${['auto', 'slot1', 'slot2', 'slot3'].map((key, i) => `<article class="save-card"><h3>${i ? `저장 ${i}` : '자동 저장'}</h3><p>${escape(saveDescription(progress.saves[key]))}</p><div class="save-buttons">${i ? `<button data-action="save-slot" data-key="${key}" ${state ? '' : 'disabled'}>여기에 저장</button>` : ''}<button class="primary" data-action="load-slot" data-key="${key}" ${progress.saves[key] ? '' : 'disabled'}>불러오기</button></div></article>`).join('')}
      <h3 class="dialog-section-title">백업 파일</h3><div class="backup-buttons"><button class="plain-button" data-action="export">전체 진행 내려받기 ${icon('save')}</button><button class="plain-button" data-action="import">백업 파일 불러오기 ${icon('arrow')}</button></div><p class="fine-print">저장칸, 엔딩, 지나온 분기와 읽은 문장을 함께 옮깁니다. 이름이나 연락처는 입력받지 않습니다.</p>`);
  }
  function showSettings() {
    openDialog('읽기 설정', `<div class="settings-row"><label>글자 크기</label><div class="segmented">${[18, 20, 23, 26].map((size, i) => `<button data-action="font" data-value="${size}" class="${progress.prefs.font === size ? 'selected' : ''}" aria-pressed="${progress.prefs.font === size}">${['기본', '크게', '더 크게', '아주 크게'][i]}</button>`).join('')}</div></div><div class="settings-row"><label>글자가 나타나는 속도</label><div class="segmented">${[[32, '천천히'], [18, '보통'], [0, '즉시']].map(([speed, label]) => `<button data-action="speed" data-value="${speed}" class="${progress.prefs.speed === speed ? 'selected' : ''}" aria-pressed="${progress.prefs.speed === speed}">${label}</button>`).join('')}</div></div><div class="settings-row"><label>배경 선율</label>${soundButton()}</div><p class="fine-print">한 번 누르면 문장을 모두 표시하고, 한 번 더 누르면 다음으로 넘어갑니다. ‘읽은 글’은 처음 보는 문장과 선택지에서 멈춥니다.\n키보드: Space / → 다음 · ← 이전 · A 자동 · S 읽은 글 · Esc 메뉴\n장면을 크게 보고 싶으면 메뉴에서 ‘장면만 보기’를 선택해 주세요.</p>`);
  }
  function showAbout() {
    openDialog('작품 안내', `<p class="fine-print">공항의 낯선 인사에서 시작되는 시간여행 로맨스입니다. 인물의 이름은 정해져 있지 않습니다. 2023~2024년 그의 선택이 결말을 결정합니다. 산장의 그녀와 친구, 두 갈래의 이야기가 있습니다. 두 사람의 기억은 선택 없이 이어집니다.\n메인 엔딩 ${totalEndings('main')}개, 짧은 세계 붕괴 엔딩 ${totalEndings('collapse')}개가 있습니다. 보지 않은 결말의 제목은 숨겨 둡니다.\n2023년부터 2024년까지 함께 보낸 일 년, 이별 뒤 2026년까지 흐른 두 해를 구분해 읽어 주세요.</p><h3 class="dialog-section-title">소리와 장면</h3><p class="fine-print">사진을 참고해 만든 게임용 장면과 직접 합성한 선율을 사용합니다. 실제 가수의 음원이나 음성을 재생하지 않습니다.</p><h3 class="dialog-section-title">저장 안내</h3><p class="fine-print">선택과 진행은 이 브라우저에만 저장됩니다. 계정, 이름, 연락처를 받지 않으며 외부 분석·광고·추적 기능이 없습니다. 브라우저 데이터를 지우기 전에는 저장 메뉴에서 백업해 주세요.</p>`);
  }
  function showRoute() {
    const saved = galleryEnding ? progress.endings[galleryEnding] : state;
    openDialog('내가 지나온 선택', `<ol class="route-list">${(saved?.decisions || []).map(d => `<li>${escape(SCENES[d.node].choices.find(c => c.id === d.choice).text)}</li>`).join('')}</ol>`);
  }
  function loadSave(save) {
    if (!save || !isValidState(save.state)) { toast('이 저장 파일을 읽을 수 없습니다.'); return; }
    closeDialog(); stopPlayback();
    state = copy(save.state); offset = save.offset || 0;
    document.body.classList.remove('peeking');
    renderGame({ instant: true }); persist();
  }
  function askLoad(save, label) {
    const index = ['auto', 'slot1', 'slot2', 'slot3'].indexOf(label);
    openDialog('이어서 읽을까요?', `<p class="fine-print">${escape(saveDescription(save))}\n현재의 자동 저장은 불러온 진행으로 바뀝니다.</p><div class="save-buttons"><button class="primary" data-action="load-confirm" data-key="${index >= 0 ? label : ''}">불러오기</button><button data-action="saves">취소</button></div>`);
  }
  function exportBackup() {
    persist();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'why-do-i-cry-save.json';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('백업 파일을 내려받았습니다.');
  }
  $('#import-file').addEventListener('change', async event => {
    const file = event.target.files[0]; event.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast('5MB 이하의 게임 백업 파일을 선택해 주세요.');
    try {
      const parsed = JSON.parse(await file.text());
      if (!validProgress(parsed)) throw new Error('invalid');
      importCandidate = parsed;
      openDialog('백업을 불러올까요?', `<p class="fine-print">저장칸 ${Object.keys(parsed.saves).length}개, 엔딩 ${Object.keys(parsed.endings).length}개가 있습니다.\n이 브라우저의 현재 V4 진행을 백업 내용으로 교체합니다.</p><div class="backup-buttons"><button class="plain-button" data-action="export">현재 진행 먼저 내려받기</button><button class="solid-button" data-action="import-confirm">백업으로 교체하기</button><button class="plain-button" data-action="saves">취소</button></div>`);
    } catch { importCandidate = null; toast('호환되는 V4 백업이 아닙니다. 현재 진행은 그대로 두었어요.'); }
  });
  async function handleAction(action, button, event) {
    switch (action) {
      case 'next': nextBeat(); break;
      case 'back': stepBack(); break;
      case 'choose': selectChoice(Number(button.dataset.index), event); break;
      case 'auto': auto = !auto; skipping = false; renderGame({ instant: !typing }); break;
      case 'skip':
        if (!state || currentFrame(state).isChoice) return toast('선택한 뒤 읽은 문장을 건너뛸 수 있어요.');
        if (!seen.has(frameKey(state)) && !skipping) return toast('처음 보는 문장은 건너뛰지 않습니다.');
        skipping = !skipping; auto = false; renderGame({ instant: true }); break;
      case 'sound': {
        try {
          if (!await audio.toggle()) return toast('이 브라우저에서는 소리를 사용할 수 없습니다.');
          document.querySelectorAll('[data-action="sound"]').forEach(b => { b.innerHTML = `${icon(audio.enabled ? 'sound' : 'mute')}<span>소리</span>`; b.setAttribute('aria-pressed', String(audio.enabled)); b.setAttribute('aria-label', `소리 ${audio.enabled ? '끄기' : '켜기'}`); });
        } catch { toast('소리를 켜지 못했습니다. 한 번 더 눌러 주세요.'); }
        break;
      }
      case 'new':
        if (progress.saves.auto) openDialog('처음부터 읽을까요?', '<p class="fine-print">자동 저장을 새 이야기로 바꿉니다. 수동 저장칸과 엔딩 보관함은 유지됩니다.</p><div class="save-buttons"><button class="primary" data-action="new-confirm">처음부터</button><button data-action="close">취소</button></div>');
        else await handleAction('new-confirm', button, event);
        break;
      case 'new-confirm': closeDialog(); stopPlayback(); state = createState(); offset = 0; persist(); renderGame(); break;
      case 'continue': loadSave(progress.saves.auto); break;
      case 'title': closeDialog(); persist(); renderTitle(); break;
      case 'close': closeDialog(); break;
      case 'menu': showMenu(); break;
      case 'memories': showMemories(); break;
      case 'history': showHistory(); break;
      case 'bookmarks': showBookmarks(); break;
      case 'gallery': showGallery(); break;
      case 'settings': showSettings(); break;
      case 'about': showAbout(); break;
      case 'saves': showSaves(); break;
      case 'route': showRoute(); break;
      case 'peek': closeDialog(); stopTimers(); document.body.classList.add('peeking'); $('.peek-exit')?.focus(); break;
      case 'peek-exit': document.body.classList.remove('peeking'); renderGame({ instant: true }); break;
      case 'retry': {
        const source = galleryEnding ? progress.endings[galleryEnding] : state;
        const retried = retry(source);
        if (retried) loadSave({ state: retried, offset: 0 });
        break;
      }
      case 'bookmark': {
        const saved = progress.bookmarks[button.dataset.key];
        if (saved) loadSave({ state: resumeSnapshot(saved), offset: 0 });
        break;
      }
      case 'ending': {
        const id = button.dataset.key;
        if (progress.endings[id]) { closeDialog(); renderEnding(id, true); }
        break;
      }
      case 'save-slot': {
        const key = button.dataset.key;
        if (!['slot1', 'slot2', 'slot3'].includes(key) || !state) break;
        if (progress.saves[key]) openDialog('저장을 덮어쓸까요?', `<p class="fine-print">${escape(saveDescription(progress.saves[key]))}\n이 칸을 현재 진행으로 바꿉니다.</p><div class="save-buttons"><button class="primary" data-action="save-confirm" data-key="${key}">덮어쓰기</button><button data-action="saves">취소</button></div>`);
        else await handleAction('save-confirm', button, event);
        break;
      }
      case 'save-confirm': {
        const key = button.dataset.key;
        if (['slot1', 'slot2', 'slot3'].includes(key) && state) {
          progress.saves[key] = { state: copy(state), offset }; writeProgress(); showSaves(); toast(storageOkay ? '저장했어요.' : '이번 실행에 보관했어요. 파일 백업도 내려받아 주세요.');
        }
        break;
      }
      case 'load-slot': {
        const saved = progress.saves[button.dataset.key]; if (saved) askLoad(saved, button.dataset.key); break;
      }
      case 'load-confirm': loadSave(progress.saves[button.dataset.key]); break;
      case 'export': exportBackup(); break;
      case 'import': $('#import-file').click(); break;
      case 'import-confirm': {
        if (!importCandidate) break;
        progress = importCandidate; importCandidate = null; seen = new Set(progress.seen);
        state = progress.saves.auto ? copy(progress.saves.auto.state) : null; offset = progress.saves.auto?.offset || 0;
        storageOkay = true; applyPrefs(); writeProgress(); closeDialog(); renderTitle(); toast('백업을 불러왔어요.'); break;
      }
      case 'font': case 'speed': {
        const value = Number(button.dataset.value);
        if (action === 'font' && [18, 20, 23, 26].includes(value)) progress.prefs.font = value;
        if (action === 'speed' && [0, 18, 32].includes(value)) progress.prefs.speed = value;
        applyPrefs(); writeProgress();
        if (screen === 'game') { renderGame({ instant: true }); persist(); }
        showSettings(); break;
      }
      case 'song': {
        try {
          if (audio.memoryActive) { audio.stopMemory(); button.innerHTML = `${icon('play')}<span>기타 선율 듣기 · 00:18</span>`; break; }
          const okay = await audio.playMemory(() => { if (button.isConnected) button.innerHTML = `${icon('play')}<span>기타 선율 듣기 · 00:18</span>`; });
          if (okay) button.innerHTML = `${icon('pause')}<span>선율 멈추기</span>`;
          else toast('이 브라우저에서는 소리를 사용할 수 없습니다.');
        } catch { toast('선율을 재생하지 못했습니다.'); }
        break;
      }
    }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button || button.disabled) return;
    handleAction(button.dataset.action, button, event).catch(() => toast('작업을 마치지 못했습니다. 저장 메뉴에서 진행을 백업해 주세요.'));
  });
  app.addEventListener('pointerdown', event => {
    if (screen !== 'game' || dialog.open || event.target.closest('button,a,input,select,nav,header') || event.button !== 0) return;
    pointer = { x: event.clientX, y: event.clientY, id: event.pointerId, at: performance.now(), moved: false };
  });
  app.addEventListener('pointermove', event => { if (pointer && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 8) pointer.moved = true; });
  app.addEventListener('pointerup', event => {
    if (pointer?.id === event.pointerId && !pointer.moved && performance.now() - pointer.at < 650 && !event.target.closest('button,a,input,select,nav,header')) nextBeat();
    pointer = null;
  });
  app.addEventListener('pointercancel', () => { pointer = null; });
  document.addEventListener('keydown', event => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select')) return;
    if (dialog.open) return;
    if (document.body.classList.contains('peeking')) {
      if (event.key === 'Escape') { event.preventDefault(); document.body.classList.remove('peeking'); renderGame({ instant: true }); }
      return;
    }
    if (screen !== 'game') return;
    if (event.target.closest('button') && [' ', 'Enter'].includes(event.key)) return;
    if ([' ', 'ArrowRight', 'ArrowLeft', 'a', 'A', 's', 'S', 'Escape'].includes(event.key)) event.preventDefault();
    if ([' ', 'ArrowRight'].includes(event.key)) nextBeat();
    if (event.key === 'ArrowLeft') stepBack();
    if (event.key.toLowerCase() === 'a') { auto = !auto; skipping = false; renderGame({ instant: true }); }
    if (event.key.toLowerCase() === 's') handleAction('skip', {}, { detail: 0 });
    if (event.key === 'Escape') showMenu();
  });
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (screen === 'game' && !document.body.classList.contains('peeking')) { renderGame({ instant: true }); persist(); } }, 180);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(playTimer); audio.clearNotes(); persist(); }
    else schedulePlayback();
  });
  addEventListener('pagehide', persist);
  applyPrefs(); renderTitle();
  if (recoveryNotice) openDialog('저장 안내', `<p class="fine-print">${escape(recoveryNotice)}</p><div class="save-buttons"><button data-action="saves">저장 메뉴</button><button data-action="close">닫기</button></div>`);
  // Pure validation hooks for the dependency-free verification script.
  Object.assign(WDIC, { ART });
})();
