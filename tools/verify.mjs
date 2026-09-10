// Run with Node.js: node tools/verify.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({});
for (const file of ['story.js', 'engine.js']) vm.runInContext(fs.readFileSync(path.join(root, 'src', file), 'utf8'), context);
const game = context.WDIC;
const clean = obj => JSON.parse(JSON.stringify(obj));
const { SCENES, MEMORIES, ENDINGS, createState, currentFrame, snapshot, advance, choose, rewind, retry, isValidState, validProgress, frameKey, paginate } = game;
const visited = new Set();
const edges = new Set();
const outcomes = new Set();
let transitions = 0;
let widestSave = 0;
const fixtures = [
  ['reunion', {}],
  ['reunion', { rendezvous: 1, birthday_plan: 2 }],
  ['reunion', { meeting: 1, winter_truth: 0, autumn: 1 }],
  ['reunion', { rendezvous: 2, birthday_plan: 1 }],
  ['reunion', { first_path: 1, village: 1, leave_warning: 0 }],
  ['reunion', { cabin: 1, first_path: 1, village: 0, winter: 1, winter_truth: 1, spring: 1, summer: 1, birthday: 1, birthday_plan: 2 }],
  ['departure', { meeting: 1, winter_truth: 1 }],
  ['departure', { storm: 1 }],
  ['departure', { winter: 1, storm: 1, summer: 1, birthday: 1 }],
  ['missed', { autumn: 1, birthday_plan: 2 }],
  ['missed', { rendezvous: 2, birthday_plan: 2 }],
  ['missed', { autumn: 1, rendezvous: 2, birthday_plan: 0 }],
  ['missed', { autumn: 1, rendezvous: 2, birthday_plan: 1 }],
  ['stay', { storm: 2 }], ['stay', { call: 2 }], ['together', { call: 1 }],
  ['collapse_meeting', { first_path: 1, village: 1, leave_warning: 1 }],
  ['b_reunion', { two_paths: 1 }],
  ['b_reunion', { two_paths: 1, b_winter: 1 }],
  ['b_reunion', { two_paths: 1, b_promise: 1 }],
  ['b_reunion', { two_paths: 1, b_first_days: 1, b_autumn_plan: 1 }],
  ['b_friend', { two_paths: 1, b_winter: 1, b_spring_question: 1 }],
  ['b_friend', { two_paths: 1, b_spring_question: 1 }],
  ['b_friend', { two_paths: 1, b_promise: 1, b_autumn_plan: 1 }],
  ['b_friend', { two_paths: 1, b_storm: 1 }],
  ['stay', { two_paths: 1, b_storm: 2 }],
  ['stay', { two_paths: 1, b_call: 2 }],
  ['together', { two_paths: 1, b_call: 1 }],
];
let truthTableCases = 0;
for (const honest of [false,true]) for (const winterTruth of [false,true])
for (const research of [false,true]) for (const prepared of [false,true])
for (const rendezvous of ['lake','cabin','unspecified']) for (const departure of ['call','message']) {
  const flags = {route:'a',honest,winterTruth,research,prepared,rendezvous,departure};
  const expected = !(honest || winterTruth) || departure !== 'call' ? 'departure' :
    (research || prepared) && rendezvous !== 'unspecified' ? 'reunion' : 'missed';
  assert.equal(game.outcomeFor(flags),expected);
  for (const recorded of [false,true]) for (const contact of [false,true]) for (const free of [false,true])
    assert.equal(game.outcomeFor({...flags,recorded,contact,free}),expected,'flavor choices never gate true ending');
  truthTableCases++;
}
let friendTruthTableCases = 0;
for (const bCommitted of [false,true]) for (const bPromise of [false,true])
for (const departure of ['call','message']) {
  const expected = bCommitted && bPromise && departure === 'call' ? 'b_reunion' : 'b_friend';
  for (const bConfessed of [false,true]) for (const bTaste of ['ask','remember'])
  for (const honest of [false,true]) for (const research of [false,true]) {
    assert.equal(game.outcomeFor({route:'b',bCommitted,bPromise,departure,bConfessed,bTaste,honest,research}),expected,'friend route has only its three stated gates');
    friendTruthTableCases++;
  }
}
assert.equal(createState().node, 'prologue', 'start with the friend who lends the cabin');
assert.equal(game.sentenceLines('안녕. 다음 문장. 마지막! 좋아? 응.'),'안녕.\n다음 문장.\n마지막!\n좋아?\n응.');
assert.equal(game.sentenceLines('2026. 09. 29 · 23:41 / 3.14 / ... 그대로'),'2026. 09. 29 · 23:41 / 3.14 / ... 그대로');
assert.equal(game.sentenceLines('“괜찮아.” 그녀가 말했다.'),'“괜찮아.”\n그녀가 말했다.');
assert.equal(SCENES.arrival.lines[2].art,'airport-her','male airport image remains unchanged');
for (const scene of Object.values(SCENES)) if (scene.pov || scene.chapter === '07') assert.ok(!scene.choices,'no heroine or final-present choices');
let example;
const endingStates = [];
for (const [expected, route] of fixtures) {
  let state = createState();
  let steps = 0;
  const routeScenes = new Set();
  while (!state.ending && steps++ < 1000) {
    assert.ok(isValidState(state), `valid state at ${state.node}:${state.index}`);
    visited.add(state.node);
    routeScenes.add(state.node);
    if (currentFrame(state).isChoice && state.node !== 'cabin') {
      assert.ok(SCENES[state.node].date.startsWith('2023') || SCENES[state.node].date.startsWith('2024'), 'ending choices stay in the shared past');
    }
    const f = currentFrame(state);
    const prior = snapshot(state);
    let next;
    if (f.isChoice) {
      const index = route[state.node] ?? 0;
      edges.add(`${state.node}:${index}`);
      assert.deepEqual(clean(choose(state, -1)), clean(state), 'negative choice rejected');
      next = choose(state, index);
      assert.deepEqual(clean(snapshot(retry(next))), { ...clean(prior), checkpoint: null }, 'retry restores the decision and its exact flags');
    } else {
      assert.equal(typeof f.text, 'string');
      assert.ok(f.text.length, 'non-empty dialogue');
      next = advance(state);
    }
    assert.deepEqual(clean(snapshot(rewind(next))), clean(prior), 'one-step undo restores every state field');
    assert.deepEqual(clean(snapshot(state)), clean(prior), 'transitions do not mutate inputs');
    assert.ok(isValidState(clean(next)), 'save survives JSON serialization');
    assert.ok(next.trail.length <= 100, 'bounded undo history');
    transitions++;
    state = next;
  }
  assert.ok(steps < 1000, 'route terminates');
  assert.equal(state.ending, expected);
  assert.ok(isValidState(state));
  assert.deepEqual(clean(advance(state)), clean(state), 'ending cannot advance');
  assert.ok(currentFrame(retry(state)).isChoice, 'ending has a usable retry');
  outcomes.add(state.ending);
  endingStates.push(clean(state));
  if (route.two_paths === 1) {
    assert.ok(routeScenes.has('meeting'), 'B still shares the necessary first lake meeting');
    for (const id of ['winter','spring','rendezvous','her_waiting','returned']) assert.ok(!routeScenes.has(id),'no A romance scenes in B route');
    if (route.b_spring_question === 1) assert.equal(state.flags.bCommitted, false, 'spring friendship supersedes a winter confession');
    if (route.b_promise === 1 && route.b_autumn_plan !== 1) assert.ok(state.memories.includes('friend_plan'),'autumn repair collects the promise');
    if (state.ending === 'b_reunion' || state.ending === 'b_friend') {
      for (const id of ['b_year_2025','b_house_sale','b_lending','b_airport_a','b_airport_departure']) assert.ok(routeScenes.has(id), 'the loop closes before the B outcome');
      const history = game.transcript(state);
      assert.ok(history.some(row => row.speaker === '친구의 기억'), 'B narration labeled correctly');
      assert.ok(history.some(row => row.speaker === '그녀의 기억'), 'airport A narration remains distinct');
    }
  } else assert.ok(![...routeScenes].some(id=>id.startsWith('b_')), 'A never enters the B route');
  if (['stay','together'].includes(state.ending)) {
    const expectedArt = route.two_paths === 1 ? {stay:'b-stay',together:'b-together'} : {stay:'cabin-last-morning',together:'together-collapse'};
    assert.equal(game.endingFor(state.ending,clean(snapshot(state)).flags).art,expectedArt[state.ending],'gallery snapshots retain the correct heroine');
  }
  widestSave = Math.max(widestSave, Buffer.byteLength(JSON.stringify(state)));
  if (!example && expected === 'reunion') example = state;
}
assert.deepEqual([...outcomes].sort(), Object.keys(ENDINGS).sort(), 'all eight endings are reachable');
assert.deepEqual([...visited].sort(), Object.keys(SCENES).sort(), 'every authored scene is exercised');
for (const [id, scene] of Object.entries(SCENES)) {
  assert.ok(scene.lines.length, `scene has dialogue: ${id}`);
  (scene.choices || []).forEach((choice, i) => {
    assert.ok(edges.has(`${id}:${i}`), `choice exercised: ${id}:${i}`);
    assert.ok(SCENES[choice.next], `choice target exists: ${choice.id}`);
  });
  for (const line of scene.lines) {
    if (line.memory) assert.ok(MEMORIES[line.memory]);
    if (line.memoryIf) assert.ok(MEMORIES[line.memoryIf.id]);
    for (const text of [line.text, line.yes, line.no].filter(Boolean)) {
      for (const width of [320, 390, 600, 1024]) for (const font of [18, 20, 23, 26]) {
        const formatted = game.sentenceLines(text);
        const pages = paginate(formatted, width, font);
        assert.equal(pages.map(p => p.text).join(''), formatted, 'pagination loses no text at any size');
        assert.ok(pages.every(p => p.text.length > 0));
        assert.equal(pages[0].start, 0);
        pages.slice(1).forEach((p, i) => assert.equal(p.start, pages[i].start + pages[i].text.length));
      }
    }
  }
}
const readVariant = createState();
readVariant.node = 'returned'; readVariant.index = 2; readVariant.flags.recorded = true;
const readKey = frameKey(readVariant);
readVariant.flags.recorded = false;
assert.notEqual(frameKey(readVariant), readKey, 'read-only skip treats changed conditional dialogue as unread');
const backup = { format: 'why-do-i-cry-mobile', version: game.STORY_VERSION, saves: { auto: { state: clean(example), offset: 0 } }, endings: { reunion: clean(snapshot(example)) }, bookmarks: {}, seen: [readKey], prefs: { speed: 18, font: 18 } };
assert.ok(validProgress(backup), 'valid backup accepted');
for (const state of endingStates) {
  const data = clean(backup);
  data.saves.auto = {state, offset:0};
  data.endings = {[state.ending]:clean(snapshot(state))};
  assert.ok(validProgress(data), 'each route can be exported and restored');
}
for (const mutate of [
  x => { x.version = 1; },
  x => { x.version = 2; },
  x => { x.version = 3; },
  x => { x.saves.auto.state.node = '__proto__'; },
  x => { x.saves.auto.state.flags.unrecognized = true; },
  x => { x.saves.auto.state.flags.recorded = 'yes'; },
  x => { x.saves.auto.state.ending = 'stay'; },
  x => { x.saves.auto.offset = 999999; },
  x => { x.saves.auto.state.trail = Array(101).fill(x.saves.auto.state.trail[0]); },
  x => { x.saves.auto.state.checkpoint = { node: 'unknown' }; },
  x => { x.bookmarks.airport_before = null; },
  x => { x.prefs.font = 400; },
  x => { x.seen = ['not-a-scene:0:<script>']; },
  x => { x.endings.departure = x.endings.reunion; },
  x => { x.extra = 'unknown field'; },
]) {
  const bad = clean(backup); mutate(bad);
  assert.equal(validProgress(bad), false, 'malformed backup rejected without throwing');
}
for (const value of [null, [], '', 7, {}, { version: 3 }]) assert.equal(validProgress(value), false);
const prototypePayload = JSON.parse(JSON.stringify(backup).replace('"flags":{', '"flags":{"__proto__":{"polluted":true},'));
assert.equal(validProgress(prototypePayload), false);
assert.equal({}.polluted, undefined);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  assert.ok(!/^https?:/.test(match[1]), 'entrypoint is self-contained');
  assert.ok(fs.existsSync(path.join(root, match[1])), `entrypoint reference exists: ${match[1]}`);
}
const source = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const artNames = [...source.matchAll(/file: '([^']+)'/g)].map(m => m[1]);
const artKeys = new Set(artNames.map(name => name.replace('.webp', '')));
for (const name of artNames) assert.ok(fs.existsSync(path.join(root, 'assets', name)), `art exists: ${name}`);
for (const scene of Object.values(SCENES)) {
  assert.ok(artKeys.has(scene.art));
  for (const line of scene.lines) if (line.art) assert.ok(artKeys.has(line.art));
}
assert.ok(!/\b(fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(/.test(source), 'no external data transmission API');
// A single scene-wide counter must advance across both split and unsplit lines.
let readingCounterCases = 0;
for (const width of [320, 390, 768, 1100]) {
  for (const font of [18, 20, 23, 26]) {
    for (const [node, scene] of Object.entries(SCENES)) {
      const state = createState(); state.node = node;
      let expected = 0, total = null;
      scene.lines.forEach((line, index) => {
        state.index = index;
        const pages = paginate(game.lineText(line, state.flags), width, font);
        for (const page of pages) {
          const reading = game.readingProgress(state, page.start, width, font);
          assert.equal(reading.current, ++expected, 'counter advances once per displayed page');
          total ??= reading.total;
          assert.equal(reading.total, total, 'scene total remains stable');
          assert.ok(reading.current <= reading.total);
          readingCounterCases++;
        }
      });
      assert.equal(expected, total, 'last page reaches the scene total');
    }
  }
}
const report = {
  result: 'PASS', scenes: visited.size, choicePoints: Object.values(SCENES).filter(s => s.choices).length,
  choiceEdges: edges.size, mainEndings: Object.values(ENDINGS).filter(e=>e.type==='main').length, collapseEndings: Object.values(ENDINGS).filter(e=>e.type==='collapse').length, routeFixtures: fixtures.length, truthTableCases, friendTruthTableCases,
  validatedTransitions: transitions, largestExampleSaveBytes: widestSave, assets: artNames.length, readingCounterCases,
  browserTesting: 'Not performed; verification covers story, save data, pagination and static asset references.'
};
console.log(JSON.stringify(report, null, 2));
