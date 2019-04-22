import { Actions } from './actions';
import { AppState } from './components/utils/WithState/WithState';

export const reducers = (state: AppState, action: Actions) => {
  switch (action.type) {
    case 'ROOM_CREATED':
      return { roomId: action.payload };

    case 'ROOM_JOINED':
      return { player: action.payload };

    case 'UPDATE_FIELD':
      return {
        fields: {
          ...state.fields,
          [action.payload.field]: action.payload.value,
        },
      };

    case 'UPDATE_STATE':
      return { ...state, ...action.payload };

    case 'UPDATE_PLAYERS':
      return { players: action.payload };

    case 'UPDATE_CHOICES':
      return { choices: action.payload };

    case 'START_ROUND':
      return {
        choices: action.payload.choices,
        hasChosen: action.payload.hasChosen,
      };

    default:
      return state;
  }
};
