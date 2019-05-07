import { State } from '../types';

import { Actions } from './actions';

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ROOM_CREATED':
      return { ...state, roomId: action.payload };

    case 'ROOM_JOINED':
      return { ...state, player: action.payload };

    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: action.payload.value,
        },
      };

    case 'UPDATE_STATE':
      return { ...state, ...action.payload };

    case 'UPDATE_PLAYERS':
      if (state.player && state.player.id) {
        const updatedCurrentPlayer = action.payload.find(
          p => p.id === state.player!.id,
        );

        // todo: also update choices
        if (updatedCurrentPlayer) {
          return {
            ...state,
            players: action.payload,
            player: updatedCurrentPlayer,
          };
        }
      }

      return { ...state, players: action.payload };

    case 'UPDATE_CHOICES':
      return { ...state, choices: action.payload };

    case 'START_ROUND':
      return {
        ...state,
        choices: action.payload.choices,
        hasChosen: action.payload.hasChosen,
      };

    default:
      return state;
  }
};
