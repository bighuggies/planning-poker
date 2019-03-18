import { Redirect, redirectTo, RouteComponentProps } from '@reach/router';
import React, { memo } from 'react';

import { roomCreated, updateField } from '../../../actions';
import { Actions } from '../../utils/WithActions/WithActions';
import { withState, WithStateProps } from '../../utils/WithState/WithState';

const isDisabled = (roomId: string) => roomId.length !== 3;

const Start: React.FunctionComponent<
  WithStateProps & RouteComponentProps
> = props => {
  if (props.roomId !== 0) return <Redirect noThrow={true} to="/name" />;

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value;
    props.dispatch(updateField('roomId', value));
  };

  const navigateToName = () => {
    props.dispatch(roomCreated(Number(props.fields.roomId)));
    redirectTo('/name');
  };

  return (
    <Fragment>
      <form>
        <fieldset>
          <legend>Join a planning poker session</legend>

          <label>
            <span>Session Pin</span>
            <input
              type="text"
              onChange={changeHandler}
              value={props.fields.roomId}
            />
          </label>

          <Actions>
            {() => (
              <button
                onClick={navigateToName}
                disabled={isDisabled(props.fields.roomId)}
              >
                Join session
              </button>
            )}
          </Actions>
        </fieldset>
      </form>

      <Fragment>
        <p>
          If you don’t have a session, you can host one for you and your team.
        </p>

        <Actions>
          {({ createRoom }) => (
            <button onClick={createRoom}>Host session</button>
          )}
        </Actions>
      </Fragment>
    </Fragment>
  );
};

const ContainedStart = withState(memo(Start));

export { ContainedStart as Start };
