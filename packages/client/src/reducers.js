import { types } from './types'

export const reducers = (state, action) => {
  switch (action.type) {
    case types.ROOM_CREATED:
      return { roomId: action.payload }

    case types.UPDATE_ROOM_ID_FIELD:
      return {
        fields: {
          ...state.fields,
          roomId: action.payload,
        },
      }

    default:
      return state
  }
}
