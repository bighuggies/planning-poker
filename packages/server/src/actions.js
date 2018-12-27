const types = require('./types')

module.exports = {
  createRoom: (roomId) => ({
    type: types.CREATE_ROOM,
    payload: { roomId },
  }),

  removeRoom: (roomId) => ({
    type: types.REMOVE_ROOM,
    payload: { roomId },
  }),
}
