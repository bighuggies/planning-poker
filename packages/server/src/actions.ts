import {
  CREATE_ROOM,
  JOIN_ROOM,
  NEW_ROUND,
  PLAY_CARD,
  PLAYER_DISCONNECT,
} from './types';

/**
 * create room action for making a unique room for you and your team.
 */
export const createRoom = (roomId: string) => ({
  type: CREATE_ROOM,
  payload: { roomId },
});

/**
 * adds a new player to a room.
 */
export const joinRoom = (
  roomId: string,
  playerId: number,
  playerName: string,
) => ({
  type: JOIN_ROOM,
  payload: { roomId, playerId, playerName },
});

/**
 * an action for when a player has chosen a planning poker card.
 */
export const playCard = (roomId: string, playerId: number, cardId: string) => ({
  type: PLAY_CARD,
  payload: { roomId, playerId, cardId },
});

/**
 * reset the cards to go again.
 */
export const newRound = (roomId: string) => ({
  type: NEW_ROUND,
  payload: { roomId },
});

export const playerDisconnect = (roomId: string, playerId: number) => ({
  type: PLAYER_DISCONNECT,
  payload: { roomId, playerId },
});

export type Actions =
  | ReturnType<typeof createRoom>
  | ReturnType<typeof joinRoom>
  | ReturnType<typeof playCard>
  | ReturnType<typeof newRound>
  | ReturnType<typeof playerDisconnect>;
