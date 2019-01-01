const Server = require('socket.io')
const { createStore } = require('redux')
const types = require('./types')
const actions = require('./actions')
const { reducers } = require('./reducers')
const { createUniqueId } = require('./helpers')

const store = createStore(reducers)
const io = new Server(8000, { origins: '*:3000' })

io.on('connect', (socket) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState())
    const roomId = createUniqueId(roomIds)

    socket.roomId = roomId
    socket.actions = actions(roomId)
    store.dispatch(socket.actions.createRoom())
    socket.emit(types.ROOM_CREATED, { roomId })
  })

  socket.on('JOIN_ROOM', ({ roomId, playerName }) => {
    socket.roomId = roomId
    socket.actions = actions(roomId)
    store.dispatch(socket.actions.joinRoom(playerName))
  })

  socket.on('disconnect', () => {
    if (socket.roomId) store.dispatch(socket.actions.removeRoom())
  })
})

console.log('Server running on 8000')
