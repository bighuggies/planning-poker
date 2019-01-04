const Server = require('socket.io')
const { createStore } = require('redux')
const types = require('./types')
const actions = require('./actions')
const { reducers } = require('./reducers')
const { createRoomId, createPlayerId } = require('./helpers')

const store = createStore(reducers)
const io = new Server(8000, { origins: '*:3000' })

io.on('connect', (socket) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState())
    const roomId = createRoomId(roomIds)

    socket.join(roomId)
    socket.roomId = roomId
    socket.actions = actions(roomId)
    store.dispatch(socket.actions.createRoom())
    socket.emit(types.ROOM_CREATED, { roomId })
  })

  socket.on(types.JOIN_ROOM, ({ roomId, playerName }) => {
    const existingPlayers = Object.keys(store.getState()[roomId].players)

    socket.join(roomId)
    socket.roomId = roomId
    socket.actions = actions(roomId)
    socket.playerId = createPlayerId(existingPlayers)
    store.dispatch(socket.actions.joinRoom(socket.playerId, playerName))

    const players = store.getState()[roomId].players

    io.to(roomId).emit(types.UPDATE_STATE, { players: Object.values(players) })
    socket.emit(types.ROOM_JOINED, { player: players[socket.playerId] })
  })

  socket.on('START_SESSION', () => {
    io.to(socket.roomId).emit('SESSION_STARTED')
  })

  socket.on('disconnect', () => {
    if (socket.roomId) store.dispatch(socket.actions.removeRoom())
  })
})

console.log('Server running on 8000')
