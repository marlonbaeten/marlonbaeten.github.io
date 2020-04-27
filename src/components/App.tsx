import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import '../style.scss';
import useTimer, { Mode } from './useTimer';
import Config from './Config';
import Countdown from './Countdown';
import Actions from './Actions';

const App = () => {
  const { state, dispatch } = useTimer();
  const action = state.actions[state.actionCounter];

  const [style, setStyle] = useState<object>({});

  useEffect(() => {
    if (state.running && !state.done && state.actions[state.actionCounter].mode === Mode.ACTIVE) {
      setStyle({
        animation: 'colorchange',
        animationDuration: `${state.actions[state.actionCounter].duration}s`,
      });
    } else {
      setStyle({});
    }
  }, [state.actionCounter]);

  return (
    <div className="page" style={style}>
      <div className="container">
        <h1>Robo Mark 0.1</h1>
        {(state.running || !state.done) ? (
          <div className={`timer ${action.mode === Mode.ACTIVE && 'active'} ${action.mode === Mode.REST && 'rest'} ${action.mode === Mode.PASSIVE && 'passive'}`}>
            <div className="action">
              {action.mode === Mode.ACTIVE && 'Work!'}
              {action.mode === Mode.REST && '... Rest ..'}
              {action.mode === Mode.PASSIVE && 'Chill'}
            </div>
            <div className="time">
              <span className="label">Time</span>
              <Countdown duration={state.actionTime} running={state.running} />
            </div>
            {action.mode !== Mode.REST && (
              <div className="set">
                <span className="label">Set</span>
                <span>{action.set}/{state.sets}</span>
              </div>
            )}
            <div className="round">
              <span className="label">Round</span>
              <span>{action.round}/{state.rounds}</span>
            </div>
          </div>
        ) : (
          <div className="not-running">
            <Config state={state} dispatch={dispatch} />
            {action && (<h2>Done!</h2>)}
            {!action && (<h2>Ready?!</h2>)}
          </div>
        )}
        <Actions state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);