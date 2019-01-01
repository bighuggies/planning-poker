const { JOIN_ROOM } = require('../types')

const newPlayer = (isHost, state = {
  host: isHost,
  playerName: '',
}, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, playerName: action.payload.playerName }

    default:
      return state
  }
}

const players = (state = {}, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      const id = Object.keys(state).length
      const isHost = id === 0
      return { ...state, [id]: { ...newPlayer(isHost, state[id], action) } }

    default:
      return state
  }
}

module.exports = { players }
