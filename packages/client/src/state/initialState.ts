import { State } from '../types';

const storedName = sessionStorage.getItem('playerName');

export const initialState: State = {
  hasChosen: false,
  isWaiting: false,
  roomId: '',
  players: [],
  choices: {},
  fields: {
    playerName: storedName != null ? storedName : undefined,
  },
};
