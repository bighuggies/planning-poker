import produce from 'immer';

import { AllActions } from './actions';
import { countPlayers, newRoom } from './helpers';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  NEW_ROUND,
  PLAY_CARD,
  PLAYER_DISCONNECT,
} from './types';

export type Choices = number[]; // array of player ids
export type Player = { id: number; host: boolean; playerName: string };
export type Room = {
  id: number;
  players: { [playerId: number]: Player | undefined };
  choices: { [cardId: string]: Choices | undefined };
};
export type AppState = {
  [roomId: number]: Room | undefined;
};

const initialState: AppState = {};

const rootReducers = (state = initialState, action: AllActions) => {
  return produce(state, draft => {
    switch (action.type) {
      case CREATE_ROOM: {
        const { roomId } = action.payload;

        draft[roomId] = newRoom(roomId);

        break;
      }

      case PLAYER_DISCONNECT: {
        const { roomId, playerId } = action.payload;
        const room = draft[roomId];

        if (room) {
          delete room.players[playerId];

          if (countPlayers(room.players) === 0) {
            delete draft[roomId];
          } else {
            const firstPlayer = Object.values(room.players)[0]!;
            firstPlayer.host = true;
          }
        }

        break;
      }

      case JOIN_ROOM: {
        const { roomId, playerId, playerName } = action.payload;
        const room = draft[roomId] || (draft[roomId] = newRoom(roomId));
        const players = room.players || (room.players = {});

        players[playerId] = {
          id: playerId,
          playerName,
          host: countPlayers(players) === 0,
        };

        break;
      }

      case PLAY_CARD: {
        const { roomId, cardId, playerId } = action.payload;

        const room = draft[roomId] || (draft[roomId] = newRoom(roomId));
        const choices = room.choices || (room.choices = {});
        const cardChoices = choices[cardId] || (choices[cardId] = []);

        cardChoices.push(playerId);

        break;
      }

      case NEW_ROUND: {
        const { roomId } = action.payload;
        const room = draft[roomId] || (draft[roomId] = newRoom(roomId));

        room.choices = {};

        break;
      }
    }
  });
};

export { rootReducers as reducers };
