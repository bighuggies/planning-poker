import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { updateField } from '../../state/actions';
import { useAppState } from '../../state/useAppState';

const isDisabled = (playerName?: string): boolean =>
  Boolean(playerName && playerName.length <= 2);

export const Name: React.FunctionComponent<RouteComponentProps> = ({
  navigate,
}) => {
  const [state, dispatch] = useAppState();

  const handleChange = (dispatch: Function) => (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const value = event.currentTarget.value;
    dispatch(updateField('playerName', value));
  };

  const handleSubmit: React.ReactEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (state.fields.playerName != null && navigate) {
      sessionStorage.setItem('playerName', state.fields.playerName);

      navigate('/room');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Let others know who you are.</legend>

        <label>
          <span>Your name</span>
          <input
            type="text"
            onChange={handleChange(dispatch)}
            value={state.fields.playerName || ''}
          />
        </label>

        <button disabled={isDisabled(state.fields.playerName)}>
          Let’s go!
        </button>
      </fieldset>
    </form>
  );
};
