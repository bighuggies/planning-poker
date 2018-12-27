const { combineReducers } = require('redux')
const { CREATE_ROOM, REMOVE_ROOM } = require('./types')

const reducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      return { ...state, [action.payload.roomId]: {} }

    case REMOVE_ROOM:
      delete state[action.payload.roomId]
      return state

    default:
      return state
  }
}

module.exports = { reducers }
