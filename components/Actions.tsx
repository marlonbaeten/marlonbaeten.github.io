import React from 'react';
import { ActionType } from './useTimer';

export default function Actions({ state, dispatch }) {
  return (
    <div className="actions">
      <button
        id="start"
        disabled={state.running}
        onClick={() => {
          dispatch({
            type: ActionType.START,
          })
        }}
      >
        Start
      </button>
      <button
        id="pauze"
        disabled={!state.running}
        onClick={() => {
          dispatch({
            type: ActionType.PAUSE,
          })
        }}
      >
        Pause
      </button>
      <button
        id="stop"
        disabled={!state.running && state.done}
        onClick={() => {
          dispatch({
            type: ActionType.STOP,
          })
        }}
      >
        Stop
      </button>
    </div>
  );
}
