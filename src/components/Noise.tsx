import React from 'react';
import { AppState, Mode } from './useTimer';
import { beep } from './beep';
import { Howl } from 'howler';

const karamba = new Howl({
  src: require('../audio/karamba.mp4'),
});
const aiaia = new Howl({
  src: require('../audio/aiaia.mp4'),
});
const benga = new Howl({
  src: require('../audio/benga.mp4'),
});
const fat_lady = new Howl({
  src: require('../audio/fat_lady.mp4'),
});
const heftig = new Howl({
  src: require('../audio/heftig.mp4'),
});
const ik_ga_hard = new Howl({
  src: require('../audio/ik_ga_hard.mp4'),
});
const kut_training = new Howl({
  src: require('../audio/kut_training.mp4'),
});
const rust = new Howl({
  src: require('../audio/rust.mp4'),
});
const helft = new Howl({
  src: require('../audio/helft.mp4'),
});
const nog_even = new Howl({
  src: require('../audio/nog_even.mp4'),
});

const motivation = [
  aiaia,
  benga,
  fat_lady,
  heftig,
  ik_ga_hard,
  kut_training,
];

let currentMotivation = motivation.slice();

function playing() {
  return (
    rust.playing() ||
    helft.playing() ||
    nog_even.playing() ||
    karamba.playing() ||
    aiaia.playing() ||
    benga.playing() ||
    fat_lady.playing() ||
    heftig.playing() ||
    ik_ga_hard.playing() ||
    kut_training.playing()
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Noise({ state }: { state: AppState }) {
  if (state.actions.length === 0 || !state.running) {
    return null;
  }

  const current = state.actions[state.actionCounter];
  const active = current.mode === Mode.ACTIVE;

  if (state.actionTime === 0) {
    beep(
      active ? 800 : 600,
      active ? 200 : 500,
    );
    return null;
  }

  if (
    active &&
    state.actionTime === (Math.round(current.duration / 2) + 2) &&
    Math.random() > 0.7 &&
    current.duration >= 10 &&
    !playing()
  ) {
    helft.play();
  }

  if (
    active &&
    state.actionTime === 3 &&
    Math.random() > 0.75
  ) {
    if (Math.random() > 0.5) {
      rust.play();
    } else {
      nog_even.play();
    }

    return null;
  }

  if (
    !active &&
    state.actionTime === 3 &&
    Math.random() > 0.7
  ) {
    karamba.play();

    return null;
  }

  if (state.actionTime < 4 && !playing()) {
    beep(
      active ? 300 : 200,
      active ? 300 : 400,
    );
  }

  if (
    active &&
    state.actionTime > 5 &&
    state.actionTime < current.duration - 2 &&
    !playing() &&
    Math.random() > 0.97
  ) {
    shuffleArray(currentMotivation);
    currentMotivation.pop().play();

    if (currentMotivation.length === 0) {
      currentMotivation = motivation.slice();
    }
  }

  if (
    active &&
    state.actionTime === (Math.round(current.duration / 2) + 2)
  ) {
    beep(200, 700, 2000);
  }

  return null;
}
