import { AppState } from "./components/utils/WithState/WithState";
import { Choices, Player } from "./interfaces";
import { types } from "./types";

export const updateField = (field: string, value: string) => ({
  type: types.UPDATE_FIELD as types.UPDATE_FIELD,
  payload: { field, value }
});

export const roomCreated = (roomId: number) => ({
  type: types.ROOM_CREATED as types.ROOM_CREATED,
  payload: roomId
});

export const roomJoined = (player: Player) => ({
  type: types.ROOM_JOINED as types.ROOM_JOINED,
  payload: player
});

export const updatePlayers = (players: Player[]) => ({
  type: types.UPDATE_PLAYERS as types.UPDATE_PLAYERS,
  payload: players
});

export const updateChoices = (choices: Choices[]) => ({
  type: types.UPDATE_CHOICES as types.UPDATE_CHOICES,
  payload: choices
});

export const updateState = (newState: Partial<AppState>) => ({
  type: types.UPDATE_STATE as types.UPDATE_STATE,
  payload: newState
});

export const startRound = (choices: any[], hasChosen: boolean) => ({
  type: types.START_ROUND as types.START_ROUND,
  payload: { choices, hasChosen }
});

export type Actions =
  | ReturnType<typeof updateField>
  | ReturnType<typeof roomCreated>
  | ReturnType<typeof roomJoined>
  | ReturnType<typeof updatePlayers>
  | ReturnType<typeof updateChoices>
  | ReturnType<typeof updateState>
  | ReturnType<typeof startRound>;
