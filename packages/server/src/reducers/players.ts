import { JOIN_ROOM } from "../types";

const newPlayer = (id, isHost, state = {
  id,
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
      const id = action.payload.playerId
      const isHost = Object.keys(state).length === 0
      return { ...state, [id]: { ...newPlayer(id, isHost, state[id], action) } }

    default:
      return state
  }
}

export { players };
