import React from 'react';
import { ActionType } from './useTimer';

export default function Config({ state, dispatch }) {
  return (
    <div className="config">
      <div className="group">
        <label htmlFor="active">Active</label>
        <input
          type="number"
          id="active"
          value={state.active}
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE,
              active: parseInt(e.target.value, 10),
            })
          }}
        />
      </div>
      <div className="group">
        <label htmlFor="passive">Passive</label>
        <input
          type="number"
          id="passive"
          value={state.passive}
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE,
              passive: parseInt(e.target.value, 10),
            })
          }}
        />
      </div>
      <div className="group">
        <label htmlFor="sets">Sets</label>
        <input
          type="number"
          id="sets"
          value={state.sets}
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE,
              sets: parseInt(e.target.value, 10),
            })
          }}
        />
      </div>
      <div className="group">
        <label htmlFor="rest">Rest</label>
        <input
          type="number"
          id="rest"
          value={state.rest}
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE,
              rest: parseInt(e.target.value, 10),
            })
          }}
        />
      </div>
      <div className="group">
        <label htmlFor="rounds">Rounds</label>
        <input
          type="number"
          id="rounds"
          value={state.rounds}
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE,
              rounds: parseInt(e.target.value, 10),
            })
          }}
        />
      </div>
    </div>
  );
}
