import { AllActions } from '../actions';
import { Room } from '../reducers';
import { JOIN_ROOM } from '../types';

const newPlayer = (
  id: number,
  isHost: boolean,
  state = {
    id,
    host: isHost,
    playerName: '',
  },
  action: AllActions,
) => {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, playerName: action.payload.playerName };

    default:
      return state;
  }
};

const players = (state: Room['players'] = {}, action: AllActions) => {
  switch (action.type) {
    case JOIN_ROOM:
      const id = action.payload.playerId;
      const isHost = Object.keys(state).length === 0;
      return {
        ...state,
        [id]: { ...newPlayer(id, isHost, state[id], action) },
      };

    default:
      return state;
  }
};

export { players };
