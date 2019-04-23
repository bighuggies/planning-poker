import { State } from '../types';

export const initialState: State = {
  hasChosen: false,
  isWaiting: false,
  roomId: 0,
  players: [],
  choices: {},
  fields: {
    roomId: '',
    playerName: '',
  },
};
