import { types } from './types'

interface Action {
  type: string,
  payload?: any,
}

interface Player {
  id: string,
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
