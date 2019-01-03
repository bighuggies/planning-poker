function generateId(min = 100, max = 999) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function collectionContainsKey(collection, key) {
  return collection.includes(key)
}

function createRoomId(rooms) {
  const id = generateId()
  return !collectionContainsKey(rooms, id)
    ? id
    : createRoomId(rooms)
}

function createPlayerId(players) {
  const id = generateId(0)
  return !collectionContainsKey(players, id)
    ? id
    : createPlayerId(players)
}

module.exports = {
  generateId,
  collectionContainsKey,
  createRoomId,
  createPlayerId,
}
