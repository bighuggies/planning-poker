function generateId(min = 100, max = 999) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function collectionContainsKey(collection, key) {
  return collection.includes(key)
}

function createUniqueId(collection) {
  const id = generateId()
  return !collectionContainsKey(collection, id)
    ? id
    : createUniqueId(collection)
}

module.exports = {
  generateId,
  collectionContainsKey,
  createUniqueId,
}
