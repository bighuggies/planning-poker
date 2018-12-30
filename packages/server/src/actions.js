const types = require('./types')

const actions = (roomId) => ({
  /**
   * create room action for making a unique room for you and your team.
   * @return {object}
   */
  createRoom: () => ({
    type: types.CREATE_ROOM,
    payload: { roomId },
  }),

  /**
   * remove a room if there are no more players.
   * @return {object}
   */
  removeRoom: () => ({
    type: types.REMOVE_ROOM,
    payload: { roomId },
  }),

  /**
   * adds a new player to a room.
   * @param   {string} playerName a player's name
   * @return  {object}
   */
  addPlayer: (playerName) => ({
    type: types.ADD_PLAYER,
    payload: { roomId, playerName },
  }),

  /**
   * an action for when a player has chosen a planning poker card.
   * @param  {string} card card value
   * @return {object}
   */
  pickCard: (card) => ({
    type: types.PICK_CARD,
    payload: { roomId, card },
  }),

  /**
   * reset the cards to go again.
   * @return {object}
   */
  newRound: () => ({
    type: types.NEW_ROUND,
    payload: { roomId },
  }),
})

module.exports = actions
