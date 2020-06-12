import { useReducer, useEffect, useRef, Dispatch } from 'react';

const getPersistedState = () => {
  if (window.localStorage.getItem('state')) {
    const stateJSON = window.localStorage.getItem('state');

    return JSON.parse(stateJSON);
  }

  return {};
};


const initialState = {
  active: 20,
  passive: 10,
  sets: 20,
  exercises: [],
  rest: 240,
  random: false,
  rounds: 3,
  totalTime: 0,
  totalCountdown: 0,
  running: false,
  done: true,
  actionCounter: 0,
  actionTime: 0,
  actions: [],
  ...getPersistedState(),
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
  exercise?: string,
  duration: number,
  set: number,
  round: number
}

export interface AppState {
  active: number,
  passive: number,
  sets: number,
  rest: number,
  random: boolean,
  rounds: number
  running: boolean,
  done: boolean,
  actionCounter: number,
  actionTime: number,
  totalTime: number,
  totalCountdown: number,
  actions: Action[],
  exercises: string[],
}

const timeSpec = /(\d{1,3})s\s(.*)/;

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
          let exercise = state.exercises[set - 1];

          if (state.random) {
            exercise = state.exercises[Math.floor(Math.random() * state.exercises.length)];
          }

          let duration = state.active;
          if (timeSpec.test(exercise)) {
            const result = timeSpec.exec(exercise);
            duration = parseInt(result[1], 10);
            exercise = result[2];
          }
          actions.push({
            mode: Mode.PASSIVE,
            duration: state.passive,
            exercise,
            set,
            round,
          });
          actions.push({
            mode: Mode.ACTIVE,
            duration,
            exercise,
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

      const totalTime = actions.reduce((sum, action) => sum+action.duration, 0);

      return {
        ...state,
        running: true,
        done: false,
        actions,
        totalTime,
        totalCountdown: totalTime,
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
      if (state.actionTime === 0) {
        const actionCounter = state.actionCounter + 1;

        if (actionCounter >= state.actions.length) {
          return {
            ...state,
            running: false,
            done: true,
            totalCountdown: 0,
          };
        }

        return {
          ...state,
          actionCounter,
          actionTime: state.actions[actionCounter].duration - 1,
          totalCountdown: state.totalCountdown - 1,
        };
      }

      return {
        ...state,
        actionTime: state.actionTime - 1,
        totalCountdown: state.totalCountdown - 1,
      };
    default:
      throw new Error();
  }
}

export default function useTimer(): { state: AppState, dispatch: Dispatch<object> } {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef<number>();
  const persist = {
    active: state.active,
    passive: state.passive,
    sets: state.sets,
    rest: state.rest,
    random: state.random,
    rounds: state.rounds,
    exercises: state.exercises,
  };
  const persistString = JSON.stringify(persist);

  useEffect(() => {
    window.localStorage.setItem('state', persistString);
  }, [persistString]);

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
