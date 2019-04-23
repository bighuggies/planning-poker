import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';

import { useApi } from '../../api/useApi';
import { updateField } from '../../state/actions';
import { useAppState } from '../../state/useAppState';

const isDisabled = (playerName: string) => playerName.length <= 2;

export const Name: React.FunctionComponent<RouteComponentProps> = () => {
  const [state, dispatch] = useAppState();
  const api = useApi();

  if (state.roomId === 0) return <Redirect noThrow={true} to="/" />;
  if (state.player && state.player.id) {
    return <Redirect noThrow={true} to="/lobby" />;
  }

  const changeHandler = (dispatch: Function) => (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const value = event.currentTarget.value;
    dispatch(updateField('playerName', value));
  };

  return (
    <section>
      <div>
        <span>Your pin!</span>
        <span>{state.roomId}</span>
      </div>

      <form onSubmit={event => event.preventDefault()}>
        <fieldset>
          <legend>Let others know who you are.</legend>

          <label>
            <span>Your name</span>
            <input
              type="text"
              onChange={changeHandler(dispatch)}
              value={state.fields.playerName}
            />
          </label>

          <button
            onClick={() => api.joinRoom(state.roomId, state.fields.playerName)}
            disabled={isDisabled(state.fields.playerName)}
          >
            Let’s go!
          </button>
        </fieldset>
      </form>
    </section>
  );
};
