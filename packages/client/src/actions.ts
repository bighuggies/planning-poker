import { AppState } from './components/utils/WithState/WithState';
import { Choices, Player } from './interfaces';

export const updateField = (field: string, value: string) => ({
  type: 'UPDATE_FIELD' as const,
  payload: { field, value },
});

export const roomCreated = (roomId: number) => ({
  type: 'ROOM_CREATED' as const,
  payload: roomId,
});

export const roomJoined = (player: Player) => ({
  type: 'ROOM_JOINED' as const,
  payload: player,
});

export const updatePlayers = (players: Player[]) => ({
  type: 'UPDATE_PLAYERS' as const,
  payload: players,
});

export const updateChoices = (choices: Choices[]) => ({
  type: 'UPDATE_CHOICES' as const,
  payload: choices,
});

export const updateState = (newState: Partial<AppState>) => ({
  type: 'UPDATE_STATE' as const,
  payload: newState,
});

export const startRound = (choices: Choices[], hasChosen: boolean) => ({
  type: 'START_ROUND' as const,
  payload: { choices, hasChosen },
});

export type Actions =
  | ReturnType<typeof updateField>
  | ReturnType<typeof roomCreated>
  | ReturnType<typeof roomJoined>
  | ReturnType<typeof updatePlayers>
  | ReturnType<typeof updateChoices>
  | ReturnType<typeof updateState>
  | ReturnType<typeof startRound>;
