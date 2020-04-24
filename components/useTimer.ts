import { useReducer, useEffect, useRef, Dispatch } from 'react';
import { beep } from './beep';

const initialState = {
  active: 20,
  passive: 10,
  sets: 20,
  rest: 240,
  rounds: 3,
  running: false,
  done: true,
  actionCounter: 0,
  actionTime: 0,
  actions: [],
};

export enum ActionType {
  UPDATE,
  START,
  PAUSE,
  STOP,
  TICK,
}

export enum Mode {
  ACTIVE,
  PASSIVE,
  REST,
}

export interface Action {
  mode: Mode,
  duration: number,
  set: number,
  round: number
}

export interface AppState {
  active: number,
  passive: number,
  sets: number,
  rest: number,
  rounds: number
  running: boolean,
  done: boolean,
  actionCounter: number,
  actionTime: number,
  actions: Action[],
}

function reducer(state, action) {
  switch (action.type) {
    case ActionType.UPDATE:
      delete action.type;
      return {
        ...state,
        ...action,
      };
    case ActionType.START:
      if (!state.done) {
        return {
          ...state,
          running: true,
        };
      }
      const actions: Action[] = [];
      for (let round = 1; round <= state.rounds; round += 1) {
        for (let set = 1; set <= state.sets; set += 1) {
          actions.push({
            mode: Mode.PASSIVE,
            duration: state.passive,
            set,
            round,
          });
          actions.push({
            mode: Mode.ACTIVE,
            duration: state.active,
            set,
            round,
          });
        }
        if (round !== state.rounds) {
          actions.push({
            mode: Mode.REST,
            duration: state.rest,
            set: state.sets,
            round,
          });
        }
      }
      return {
        ...state,
        running: true,
        done: false,
        actions,
        actionTime: actions[0].duration - 1,
      };
    case ActionType.PAUSE:
      return {
        ...state,
        running: false,
      };
    case ActionType.STOP:
      return {
        ...state,
        running: false,
        done: true,
        actionCounter: 0,
        actionTime: 0,
      };
    case ActionType.TICK:
      const active = state.actions[state.actionCounter].mode === Mode.ACTIVE;

      if (state.actionTime === 0) {
        beep(
          active ? 1000 : 600,
          active ? 200 : 500,
        );
        const actionCounter = state.actionCounter + 1;

        if (actionCounter >= state.actions.length) {
          return {
            ...state,
            running: false,
            done: true,
          };
        }

        return {
          ...state,
          actionCounter,
          actionTime: state.actions[actionCounter].duration - 1,
        };
      }

      if (state.actionTime < 4) {
        beep(
          active ? 300 : 200,
          active ? 300 : 400,
        );
      }

      return {
        ...state,
        actionTime: state.actionTime - 1,
      };
    default:
      throw new Error();
  }
}

export default function useTimer(): { state: AppState, dispatch: Dispatch } {
  const [state, dispatch] = useReducer<AppState>(reducer, initialState);
  const timerRef = useRef();

  useEffect(() => {
    if (state.running) {
      timerRef.current = setInterval(() => {
        dispatch({ type: ActionType.TICK });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [state.running]);

  return {
    state,
    dispatch,
  };
}
