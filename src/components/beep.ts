
class Beep {

  private ctx: AudioContext|null = null;

  createContext() {
    if (this.ctx === null) {
      // @ts-ignore
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  play(duration: number = 300, frequency: number = 400, offset: number = 0) {
    this.createContext();

    const oscillator = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    gainNode.gain.value = 0.3;

    oscillator.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'square';

    oscillator.start(this.ctx.currentTime + (offset / 1000));
    oscillator.stop(this.ctx.currentTime + (offset / 1000) + (duration / 1000));
  }

  bep() {
    this.play(150, 400);
  }

  beep() {
    this.play(400, 500);
  }

  bop() {
    this.play(150, 300);
  }

  boop() {
    this.play(600, 200);
  }

  peepPeep() {
    this.play(50, 700);
    this.play(50, 700, 200);
  }

  bobBobBob() {
    this.play(100, 300);
    this.play(100, 300, 300);
    this.play(100, 300, 600);
  }
}

export default new Beep();
