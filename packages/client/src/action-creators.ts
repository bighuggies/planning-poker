import { types } from './types'

interface Action {
  type: string,
  payload?: any,
}

interface Player {
  id: string,
  host: boolean,
  name: string,
}

export const updateField = (field: string, value: string): Action => ({
  type: types.UPDATE_FIELD,
  payload: { field, value },
})

export const roomCreated = (roomId: number): Action => ({
  type: types.ROOM_CREATED,
  payload: roomId,
})

export const roomJoined = (player: Player): Action => ({
  type: types.ROOM_JOINED,
  payload: player,
})

export const updatePlayers = (players: Player[]): Action => ({
  type: types.UPDATE_PLAYERS,
  payload: players,
})

export const updateState = (newState: any): Action => ({
  type: types.UPDATE_STATE,
  payload: newState,
})
