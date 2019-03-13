import React, { memo } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { updateField } from "../../../actions";
import { withState, WithStateProps } from "../../utils/WithState/WithState";
import { Actions } from "../../utils/WithActions/WithActions";

const isDisabled = (playerName: string) => playerName.length <= 2;

const Name: React.FunctionComponent<
  WithStateProps & RouteComponentProps
> = props => {
  if (props.roomId === 0) return <Redirect noThrow to="/" />;
  if (props.player && props.player.id) return <Redirect noThrow to="/lobby" />;

  const changeHandler = (dispatch: Function) => (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const value = event.currentTarget.value;
    props.dispatch(updateField("playerName", value));
  };

  return (
    <section>
      <div>
        <span>Your pin!</span>
        <span>{props.roomId}</span>
      </div>

      <form onSubmit={event => event.preventDefault()}>
        <fieldset>
          <legend>Let others know who you are.</legend>

          <label>
            <span>Your name</span>
            <input
              type="text"
              onChange={changeHandler(props.dispatch)}
              value={props.fields.playerName}
            />
          </label>

          <Actions>
            {({ joinRoom }: any) => (
              <button
                onClick={() => joinRoom(props.roomId, props.fields.playerName)}
                disabled={isDisabled(props.fields.playerName)}
              >
                Let’s go!
              </button>
            )}
          </Actions>
        </fieldset>
      </form>
    </section>
  );
};

const ContainedName = withState(memo(Name));

export { ContainedName as Name };
