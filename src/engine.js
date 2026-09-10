(() => {
  'use strict';
  const { STORY_VERSION, START_NODE, FLAG_RULES, SCENES, MEMORIES, ENDINGS, lineText } = WDIC;
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const clone = value => JSON.parse(JSON.stringify(value));
  const core = state => {
    const { trail, checkpoint, ...rest } = state;
    return clone(rest);
  };
  function createState() {
    return { version: STORY_VERSION, node: START_NODE, index: 0, flags: {}, memories: [], decisions: [], ending: null, checkpoint: null, trail: [] };
  }
  function currentFrame(state) {
    const scene = SCENES[state.node];
    const line = scene.lines[state.index];
    const art = [...scene.lines.slice(0, state.index + 1)].reverse().find(l => l.art)?.art || scene.art;
    return { scene, line, art, text: line ? lineText(line, state.flags) : '', isChoice: !line && !!scene.choices, ending: state.ending };
  }
  function collectMemory(state) {
    const { line } = currentFrame(state);
    const extra = line?.memoryIf;
    const id = line?.memory || (extra && state.flags[extra.flag] === extra.equals ? extra.id : null);
    if (id && !state.memories.includes(id)) state.memories.push(id);
    return state;
  }
  function snapshot(state) {
    const { trail, ...rest } = state;
    return clone(rest);
  }
  function withHistory(state) {
    const next = clone(state);
    next.trail.push(snapshot(state));
    if (next.trail.length > 100) next.trail.shift();
    return next;
  }
  function resolveNext(next, flags) {
    if (typeof next === 'string') return next;
    if (next.route === 'outcome') return next.to[WDIC.outcomeFor(flags)];
    return next.find(route => !route.when || Object.entries(route.when).every(([key, value]) => flags[key] === value)).to;
  }
  function enter(state, node) {
    state.node = node;
    state.index = 0;
    return collectMemory(state);
  }
  function advance(state) {
    const { scene, isChoice } = currentFrame(state);
    if (state.ending || isChoice) return state;
    const next = withHistory(state);
    if (state.index < scene.lines.length - 1) {
      next.index++;
      return collectMemory(next);
    }
    if (scene.choices) { next.index++; return next; }
    if (scene.ending) { next.ending = scene.ending; return next; }
    return enter(next, resolveNext(scene.next, next.flags));
  }
  function choose(state, index) {
    if (!currentFrame(state).isChoice || !Number.isInteger(index)) return state;
    const choice = SCENES[state.node].choices[index];
    if (!choice) return state;
    const next = withHistory(state);
    next.checkpoint = core(state);
    Object.assign(next.flags, choice.set);
    next.decisions.push({ node: state.node, choice: choice.id });
    return enter(next, choice.next);
  }
  function rewind(state) {
    if (!state.trail.length) return state;
    const trail = clone(state.trail);
    return { ...trail.pop(), trail };
  }
  function retry(state) {
    if (!state?.checkpoint) return null;
    return { ...clone(state.checkpoint), checkpoint: null, trail: [] };
  }
  function frameKey(state) {
    const f = currentFrame(state);
    return `${state.node}:${state.index}:${f.line?.speaker || f.scene.pov || ''}:${f.text}`;
  }
  const object = value => !!value && typeof value === 'object' && !Array.isArray(value);
  function validCore(s) {
    if (!object(s) || s.version !== STORY_VERSION || !own(SCENES, s.node) || !Number.isInteger(s.index)) return false;
    if (Object.keys(s).some(k => !['version', 'node', 'index', 'flags', 'memories', 'decisions', 'ending'].includes(k))) return false;
    const scene = SCENES[s.node];
    if (s.index < 0 || s.index > scene.lines.length || (s.index === scene.lines.length && !scene.choices)) return false;
    if (!object(s.flags) || Object.keys(s.flags).length > Object.keys(FLAG_RULES).length) return false;
    if (!Object.entries(s.flags).every(([k, v]) => own(FLAG_RULES, k) && FLAG_RULES[k].includes(v))) return false;
    if (!Array.isArray(s.memories) || s.memories.length > Object.keys(MEMORIES).length || !s.memories.every(id => own(MEMORIES, id))) return false;
    if (!Array.isArray(s.decisions) || s.decisions.length > 40 || !s.decisions.every(d => object(d) && Object.keys(d).length === 2 && own(SCENES, d.node) && SCENES[d.node].choices?.some(c => c.id === d.choice))) return false;
    return s.ending === null || (own(ENDINGS, s.ending) && scene.ending === s.ending && s.index === scene.lines.length - 1);
  }
  function validSnapshot(s) {
    if (!object(s)) return false;
    const { checkpoint, ...rest } = s;
    return validCore(rest) && (checkpoint === null || (validCore(checkpoint) && currentFrame(checkpoint).isChoice));
  }
  function isValidState(s) {
    if (!object(s)) return false;
    const { trail, ...rest } = s;
    return validSnapshot(rest) && Array.isArray(trail) && trail.length <= 100 && trail.every(validSnapshot);
  }
  function resumeSnapshot(s) { return validSnapshot(s) ? { ...clone(s), trail: [] } : null; }
  function transcript(state) {
    if (!state) return [];
    let cursor = createState();
    const rows = [];
    let decisionIndex = 0;
    for (let count = 0; count < 1200; count++) {
      const f = currentFrame(cursor);
      if (cursor.node === state.node && cursor.index === state.index && decisionIndex === state.decisions.length) {
        if (f.line) rows.push({ speaker: f.line.speaker || (f.scene.pov ? `${f.scene.pov}의 기억` : '나의 기억'), text: f.text });
        break;
      }
      if (f.isChoice) {
        const decision = state.decisions[decisionIndex++];
        const index = f.scene.choices.findIndex(c => c.id === decision?.choice && cursor.node === decision.node);
        if (index < 0) break;
        rows.push({ speaker: '선택', text: f.scene.choices[index].text });
        cursor = choose(cursor, index);
      } else {
        rows.push({ speaker: f.line.speaker || (f.scene.pov ? `${f.scene.pov}의 기억` : '나의 기억'), text: f.text });
        if (cursor.ending) break;
        cursor = advance(cursor);
      }
      cursor.trail = [];
    }
    return rows;
  }
  function validProgress(data) {
    if (!object(data) || data.format !== 'why-do-i-cry-mobile' || data.version !== STORY_VERSION) return false;
    if (Object.keys(data).some(k => !['format', 'version', 'saves', 'endings', 'bookmarks', 'seen', 'prefs'].includes(k))) return false;
    if (!object(data.prefs) || Object.keys(data.prefs).length !== 2 || ![0, 18, 32].includes(data.prefs.speed) || ![18, 20, 23, 26].includes(data.prefs.font)) return false;
    if (!object(data.saves) || Object.keys(data.saves).length > 4 || !Object.entries(data.saves).every(([key, save]) => ['auto', 'slot1', 'slot2', 'slot3'].includes(key) && object(save) && Object.keys(save).length === 2 && isValidState(save.state) && validOffset(save))) return false;
    if (!object(data.endings) || Object.keys(data.endings).length > Object.keys(ENDINGS).length || !Object.entries(data.endings).every(([key, value]) => own(ENDINGS, key) && resumeSnapshot(value)?.ending === key)) return false;
    if (!object(data.bookmarks) || Object.keys(data.bookmarks).length > 40 || !Object.entries(data.bookmarks).every(([key, value]) => own(SCENES, key) && object(value) && value.node === key && resumeSnapshot(value) && currentFrame(value).isChoice)) return false;
    return Array.isArray(data.seen) && data.seen.length <= 5000 && data.seen.every(key => typeof key === 'string' && key.length <= 1200 && own(SCENES, key.split(':')[0]));
  }
  function validOffset(save) {
    const f = currentFrame(save.state);
    return Number.isInteger(save.offset) && save.offset >= 0 && (f.text ? save.offset < f.text.length : save.offset === 0);
  }
  function paginate(text, viewportWidth, fontSize) {
    const width = Math.min(viewportWidth - (viewportWidth <= 600 ? 56 : 112), 720);
    const columns = Math.max(8, Math.floor(width / fontSize));
    const result = [];
    let start = 0;
    while (start < text.length) {
      let end = start, row = 1, used = 0, sentences = 0;
      while (end < text.length) {
        const char = text[end];
        if (char === '\n') { end++; row++; used = 0; sentences++; if (row > 4 || sentences >= 2) break; }
        else { const units = /[\x00-\x7F]/.test(char) ? .6 : 1; if (used + units > columns) { row++; used = 0; } if (row > 4) break; used += units; end++; }
      }
      if (end < text.length && text[end - 1] !== '\n') {
        const segment = text.slice(start, end);
        const boundary = Math.max(segment.lastIndexOf(' '), segment.lastIndexOf('\n'));
        if (boundary > segment.length * .55) end = start + boundary + 1;
      }
      if (end === start) end++;
      result.push({ start, text: text.slice(start, end) });
      start = end;
    }
    return result;
  }
  function readingProgress(state, offset, viewportWidth, fontSize) {
    const scene = SCENES[state.node];
    let current = 0, total = 0;
    scene.lines.forEach((line, index) => {
      const pages = paginate(lineText(line, state.flags), viewportWidth, fontSize);
      if (index < state.index) current += pages.length;
      else if (index === state.index) current += Math.max(0, pages.findLastIndex(page => page.start <= offset)) + 1;
      total += pages.length;
    });
    return { current, total };
  }
  Object.assign(WDIC, { readingProgress, validProgress, paginate, createState, currentFrame, collectMemory, snapshot, advance, choose, rewind, retry, frameKey, isValidState, resumeSnapshot, transcript });
})();
