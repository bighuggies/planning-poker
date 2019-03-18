import { Actions } from "./actions";
import { AppState } from "./components/utils/WithState/WithState";
import { types } from "./types";

export const reducers = (state: AppState, action: Actions) => {
  switch (action.type) {
    case types.ROOM_CREATED:
      return { roomId: action.payload };

    case types.ROOM_JOINED:
      return { player: action.payload };

    case types.UPDATE_FIELD:
      return {
        fields: {
          ...state.fields,
          [action.payload.field]: action.payload.value
        }
      };

    case types.UPDATE_STATE:
      return { ...state, ...action.payload };

    case types.UPDATE_PLAYERS:
      return { players: action.payload };

    case types.UPDATE_CHOICES:
      return { choices: action.payload };

    case types.START_ROUND:
      return {
        choices: action.payload.choices,
        hasChosen: action.payload.hasChosen
      };

    default:
      return state;
  }
};
