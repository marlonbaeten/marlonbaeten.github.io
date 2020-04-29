const ctx = new AudioContext();

export function beep(duration: number = 300, frequency: number = 400, offset: number = 0) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'square';

  oscillator.start(ctx.currentTime + (offset / 1000));
  oscillator.stop(ctx.currentTime + (offset / 1000) + (duration / 1000));
}
