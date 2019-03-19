import { AllActions } from '../actions';
import { Room } from '../reducers';
import { PLAY_CARD } from '../types';

const newChoice = (state: number[] = [], action: AllActions) => {
  switch (action.type) {
    case PLAY_CARD:
      return [...state, action.payload.playerId];

    default:
      return state;
  }
};

const choices = (state: Room['choices'] = {}, action: AllActions) => {
  switch (action.type) {
    case PLAY_CARD:
      const cardId = action.payload.cardId;
      return { ...state, [cardId]: [...newChoice(state[cardId], action)] };

    default:
      return state;
  }
};

export { choices };
