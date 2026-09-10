(() => {
// Original, synthesized ambience and melody. No external recordings.
class NovelAudio {
  context = null;
  master = null;
  timer = null;
  notes = [];
  enabled = false;
  memoryActive = false;
  memoryTimer = null;
  async init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    this.context ||= new AudioContext();
    if (!this.master) {
      this.master = this.context.createGain();
      this.master.gain.value = .55;
      this.master.connect(this.context.destination);
    }
    if (this.context.state === 'suspended') await this.context.resume();
    return true;
  }
  note(frequency, start, duration, volume = .08) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + .035);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + .08);
    this.notes.push(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); this.notes = this.notes.filter(n => n !== oscillator); };
  }
  phrase() {
    if (!this.enabled || this.memoryActive || this.context.state !== 'running' || document.hidden) return;
    const now = this.context.currentTime;
    [196, 246.94, 293.66, 369.99, 329.63, 293.66, 246.94, 220].forEach((f, i) => {
      this.note(f, now + i * 1.65, 3.7, .065);
      if (i % 4 === 0) this.note(f / 2, now + i * 1.65, 6, .045);
    });
  }
  clearNotes() {
    for (const node of [...this.notes]) { try { node.stop(); } catch {} }
    this.notes = [];
  }
  async toggle() {
    if (!await this.init()) return false;
    this.enabled = !this.enabled;
    clearInterval(this.timer);
    if (this.enabled) { this.phrase(); this.timer = setInterval(() => this.phrase(), 14000); }
    else if (!this.memoryActive) this.clearNotes();
    return true;
  }
  async playMemory(onEnd) {
    if (!await this.init()) return false;
    this.stopMemory();
    this.clearNotes();
    this.memoryActive = true;
    const now = this.context.currentTime;
    [293.66, 369.99, 440, 369.99, 329.63, 293.66, 246.94, 293.66, 293.66, 369.99, 440, 493.88, 440, 369.99, 329.63, 293.66].forEach((f, i) => this.note(f, now + i * 1.03, 2.15, .13));
    this.memoryTimer = setTimeout(() => { this.memoryActive = false; onEnd?.(); }, 18000);
    return true;
  }
  stopMemory() {
    clearTimeout(this.memoryTimer);
    if (this.memoryActive) this.clearNotes();
    this.memoryActive = false;
  }
}

WDIC.NovelAudio = NovelAudio;
})();
