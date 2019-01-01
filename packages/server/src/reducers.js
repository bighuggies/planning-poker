const { CREATE_ROOM, REMOVE_ROOM, JOIN_ROOM } = require('./types')
const { players } = require('./reducers/players')
const { choices } = require('./reducers/choices')

const rootReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOM: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: {},
      }
    }

    case REMOVE_ROOM: {
      const roomId = action.payload.roomId
      const playersCount = Object.keys(state[roomId].players).length
      if (roomId && playersCount === 0) delete state[roomId]
      return state
    }

    case JOIN_ROOM: {
      const roomId = action.payload.roomId
      return {
        ...state,
        [roomId]: { players: players(state[roomId].players, action) },
      }
    }

    default:
      return state
  }
}

module.exports = { reducers: rootReducers }
