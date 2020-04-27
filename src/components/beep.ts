const ctx = new AudioContext();

export function beep(duration: number = 300, frequency: number = 400) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'square';

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + (duration / 1000));
}
