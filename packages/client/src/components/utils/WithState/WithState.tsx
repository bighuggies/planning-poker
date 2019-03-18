import React, { createContext, PureComponent } from "react";

import { Actions } from "../../../actions";
import { Choices, Player } from "../../../interfaces";
import { reducers } from "../../../reducers";

const initialState = {
  hasChosen: false,
  isWaiting: false,
  roomId: 0,
  player: {} as Player,
  players: [] as Player[],
  choices: {} as Choices,
  fields: {
    roomId: "",
    playerName: ""
  }
};

export type Dispatch = (action: Actions) => void;
export type AppState = typeof initialState;

export const StateContext = createContext<{
  state: AppState;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => undefined
});

export class StateProvider extends PureComponent {
  state = initialState;

  dispatch = (action: Actions) => {
    this.setState(() => reducers(this.state, action));
  };

  render() {
    return (
      <StateContext.Provider
        value={{ state: this.state, dispatch: this.dispatch }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export const State = StateContext.Consumer;

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export type WithStateProps = AppState & { dispatch: Dispatch };

export const withState = <P extends WithStateProps>(
  WrappedComponent: React.ComponentType<P>
): React.FunctionComponent<Omit<P, keyof WithStateProps>> => props => (
  <State>
    {({ state, dispatch }) => {
      const p = { dispatch, ...state, ...props };

      return <WrappedComponent {...p as P} />;
    }}
  </State>
);
