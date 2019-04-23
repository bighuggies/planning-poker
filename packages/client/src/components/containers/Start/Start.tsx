import { Redirect, redirectTo, RouteComponentProps } from '@reach/router';
import React from 'react';

import { roomCreated, updateField } from '../../../state/actions';
import { useAppState } from '../../../state/useAppState';
import { Actions } from '../../utils/WithActions/WithActions';

const isDisabled = (roomId: string) => roomId.length !== 3;

export const Start: React.FunctionComponent<RouteComponentProps> = () => {
  const [state, dispatch] = useAppState();

  if (state.roomId !== 0) return <Redirect noThrow={true} to="/name" />;

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value;
    dispatch(updateField('roomId', value));
  };

  const navigateToName = () => {
    dispatch(roomCreated(Number(state.fields.roomId)));
    redirectTo('/name');
  };

  return (
    <>
      <form>
        <fieldset>
          <legend>Join a planning poker session</legend>

          <label>
            <span>Session Pin</span>
            <input
              type="text"
              onChange={changeHandler}
              value={state.fields.roomId}
            />
          </label>

          <Actions>
            {() => (
              <button
                onClick={navigateToName}
                disabled={isDisabled(state.fields.roomId)}
              >
                Join session
              </button>
            )}
          </Actions>
        </fieldset>
      </form>

      <>
        <p>
          If you don’t have a session, you can host one for you and your team.
        </p>

        <Actions>
          {({ createRoom }) => (
            <button onClick={createRoom}>Host session</button>
          )}
        </Actions>
      </>
    </>
  );
};
