import * as types from './types';

export const actions = (roomId: number) => ({
  /**
   * create room action for making a unique room for you and your team.
   */
  createRoom: () => ({
    type: types.CREATE_ROOM as typeof types.CREATE_ROOM,
    payload: { roomId },
  }),

  /**
   * remove a room if there are no more players.
   */
  removeRoom: () => ({
    type: types.REMOVE_ROOM as typeof types.REMOVE_ROOM,
    payload: { roomId },
  }),

  /**
   * adds a new player to a room.
   */
  joinRoom: (playerId: number, playerName: string) => ({
    type: types.JOIN_ROOM as typeof types.JOIN_ROOM,
    payload: { roomId, playerId, playerName },
  }),

  /**
   * an action for when a player has chosen a planning poker card.
   */
  playCard: (playerId: number, cardId: string) => ({
    type: types.PLAY_CARD as typeof types.PLAY_CARD,
    payload: { roomId, playerId, cardId },
  }),

  /**
   * reset the cards to go again.
   */
  newRound: () => ({
    type: types.NEW_ROUND as typeof types.NEW_ROUND,
    payload: { roomId },
  }),
});

type AR = ReturnType<typeof actions>;
type Actions = { [T in keyof AR]: ReturnType<AR[T]> };
export type AllActions = Actions[keyof Actions];
