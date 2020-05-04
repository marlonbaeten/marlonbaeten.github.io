import React, { useState } from 'react';
import { ActionType } from './useTimer';

export default function Config({ state, dispatch }) {
  const [showExercices, setShowExercices] = useState(state.exercises.length > 0);

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
        <button onClick={() => {
          if (!showExercices) {
            if (state.exercises.length === 0) {
              dispatch({
                type: ActionType.UPDATE,
                exercises: Array.from(Array(state.sets)).map((e, index) => `Exercise ${index + 1}`),
              });
            }
          }

          setShowExercices(!showExercices);
        }}>
          Exercices
        </button>
      </div>
      {showExercices && (
        <div className="group">
          <ul>
            {state.exercises.map((e, index) => (
              <li key={index}>{index + 1}</li>
            ))}
          </ul>
          <textarea
            rows={10}
            value={state.exercises.join("\n")}
            style={{height: `${state.exercises.length}rem`}}
            onChange={(e) => {
              const exercises = e.target.value.split("\n");
              dispatch({
                type: ActionType.UPDATE,
                sets: exercises.length,
                exercises,
              })
            }}
            onBlur={(e) => {
              const exercises = e.target.value.trim().split("\n");
              dispatch({
                type: ActionType.UPDATE,
                sets: exercises.length,
                exercises,
              })
            }}
          />
        </div>
      )}
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
