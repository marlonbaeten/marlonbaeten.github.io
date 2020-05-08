import React from 'react';
import { AppState, Mode } from './useTimer';
import beep from './beep';
import { motivation, Sound, SoundType } from './motivation';
import speak from './speak';

export default function Noise({ state }: { state: AppState }) {
  if (state.actions.length === 0 || !state.running) {
    return null;
  }

  const current = state.actions[state.actionCounter];

  // start / end beep
  if (state.actionTime === 0) {
    if (current.mode === Mode.ACTIVE) {
      beep.boop();
    } else if (current.mode === Mode.PASSIVE) {
      beep.beep();
    } else if (current.mode === Mode.REST) {
      beep.bobBobBob();
    }
    return null;
  }

  // halfway beep
  if (
    current.mode === Mode.ACTIVE &&
    state.actionTime === Math.round(current.duration / 2)
  ) {
    beep.peepPeep();
    return null;
  }

  // halfway motivation
  if (
    current.mode === Mode.ACTIVE &&
    state.actionTime === (Math.round(current.duration / 2) + 2) &&
    Math.random() > 0.9 &&
    current.duration >= 10 &&
    !motivation.playing()
  ) {
    motivation.play(Sound.helft);
    return null;
  }

  // next up tts
  if (
    current.mode === Mode.PASSIVE &&
    current.duration > 5 &&
    state.actionTime === current.duration - 2 &&
    current.exercise
  ) {
    speak(`Next up: ${current.exercise}`);
    return null;
  }

  // countdown to rest motivation
  if (
    current.mode === Mode.ACTIVE &&
    state.actionTime === 3 &&
    Math.random() > 0.8
  ) {
    if (Math.random() > 0.5) {
      motivation.play(Sound.rust);
    } else {
      motivation.play(Sound.nog_even);
    }
    return null;
  }

  // countdown to active motivation
  if (
    current.mode === Mode.PASSIVE &&
    state.actionTime === 3 &&
    Math.random() > 0.8
  ) {
    motivation.play(Sound.karamba);
    return null;
  }

  // countdown to active / passive
  if (
    state.actionTime < 4 &&
    !motivation.playing() &&
    current.mode !== Mode.REST
  ) {
    if (current.mode === Mode.ACTIVE) {
      beep.bop();
    } else if (current.mode === Mode.PASSIVE) {
      beep.bep();
    }
  }

  // motivational noises
  if (
    current.mode === Mode.ACTIVE &&
    state.actionTime > 5 &&
    state.actionTime < current.duration - 2 &&
    !motivation.playing()
  ) {
    if (Math.random() > 0.96) {
      motivation.playRandom(SoundType.motivation);
    } else if (Math.random() > 0.98) {
      motivation.playRandom(SoundType.weird);
    }
  }

  return null;
}
