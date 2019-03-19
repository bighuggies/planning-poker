import { AllActions } from './actions';
import { countPlayers } from './helpers';
import { choices } from './reducers/choices';
import { players } from './reducers/players';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  NEW_ROUND,
  PLAY_CARD,
  REMOVE_ROOM,
} from './types';

export type Choices = number[]; // array of player ids
export type Player = { id: number; host: boolean; playerName: string };
export type Room = {
  id: number;
  players?: { [playerId: number]: Player };
  choices?: { [cardId: string]: Choices };
};
export type AppState = {
  [roomId: number]: Room;
};

const initialState: AppState = {};

const rootReducers = (state = initialState, action: AllActions) => {
  switch (action.type) {
    case CREATE_ROOM: {
      const roomId = action.payload.roomId;
      return {
        ...state,
        [roomId]: {
          id: roomId,
        },
      };
    }

    case REMOVE_ROOM: {
      const roomId = action.payload.roomId;
      if (!roomId) return state;
      if (roomId && countPlayers(state[roomId].players) === 0) {
        delete state[roomId];
      }
      return state;
    }

    case JOIN_ROOM: {
      const roomId = action.payload.roomId;
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          players: players(state[roomId].players, action),
        },
      };
    }

    case PLAY_CARD: {
      const roomId = action.payload.roomId;
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          choices: choices(state[roomId].choices, action),
        },
      };
    }

    case NEW_ROUND: {
      const roomId = action.payload.roomId;
      return {
        ...state,
        [roomId]: {
          ...state[roomId],
          choices: {},
        },
      };
    }

    default:
      return state;
  }
};

export { rootReducers as reducers };
