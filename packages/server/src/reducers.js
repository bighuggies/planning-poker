const { combineReducers } = require('redux')
const { CREATE_ROOM, REMOVE_ROOM } = require('./types')

const reducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOM: {
      const roomId = action.payload.roomId
      return { ...state, [roomId]: {} }
    }

    case REMOVE_ROOM: {
      const roomId = action.payload.roomId
      if (state[roomId].players.length === 0) delete state[roomId]
      return state
    }

    default:
      return state
  }
}

module.exports = { reducers }
