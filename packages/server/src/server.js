const Server = require('socket.io')
const { createStore } = require('redux')
const types = require('./types')
const { createRoom, removeRoom } = require('./actions')
const { reducers } = require('./reducers')
const { createUniqueId } = require('./helpers')

const store = createStore(reducers)
const io = new Server(8000, { origins: '*:3000' })

io.on('connect', (socket) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState())
    const roomId = createUniqueId(roomIds)

    socket.roomId = roomId
    store.dispatch(createRoom(roomId))
    socket.emit(types.ROOM_CREATED, { roomId })
  })

  socket.on('disconnect', () => {
    store.dispatch(removeRoom(socket.roomId))
  })
})

console.log('Server running on 8000')
