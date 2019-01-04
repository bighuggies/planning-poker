import { types } from './types'

export const reducers = (state, action) => {
  switch (action.type) {
    case types.ROOM_CREATED:
      return { roomId: action.payload }

    case types.ROOM_JOINED:
      return { player: action.payload }

    case types.UPDATE_FIELD:
      return {
        fields: {
          ...state.fields,
          [action.payload.field]: action.payload.value,
        },
      }
    
    case types.UPDATE_STATE:
      return { ...state, ...action.payload }

    case types.UPDATE_PLAYERS:
      return { players: action.payload }

    default:
      return state
  }
}
