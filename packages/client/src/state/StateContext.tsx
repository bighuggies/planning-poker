import React from 'react';

import { State } from '../types';

import { Actions } from './actions';
import { initialState } from './initialState';
import { reducer } from './reducer';

type StateContext = readonly [State, React.Dispatch<Actions>];

export const StateContext = React.createContext<StateContext>([
  initialState,
  () => undefined,
]);

export const StateProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo<StateContext>(() => [state, dispatch], [state]);

  if (process.env.NODE_ENV === 'development') {
    (window as any)['__ppState'] = state;
  }

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
