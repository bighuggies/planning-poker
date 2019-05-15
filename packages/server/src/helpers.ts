import { Room } from './reducers';

function flatMap<T, K>(collection: K[], cb: (value: K) => T[]): T[] {
  return collection.reduce<T[]>((prev, curr) => prev.concat(cb(curr)), []);
}

function generateId(min = 100, max = 999) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function collectionContainsKey<T>(collection: T[], key: T) {
  return collection.includes(key);
}

function countPlayers(players: Room['players'] = {}) {
  return Object.keys(players).length;
}

function countChoices(choices: Room['choices'] = {}) {
  const entries = Object.entries(choices);
  return flatMap(entries, ([_, playerIds]) => playerIds || []).length;
}

function createRoomId(roomIds: string[]): string {
  const id = generateId().toString();
  return !collectionContainsKey(roomIds, id) ? id : createRoomId(roomIds);
}

function createPlayerId(playerIds: number[]): number {
  const id = generateId(0);
  return !collectionContainsKey(playerIds, id) ? id : createPlayerId(playerIds);
}

function newRoom(roomId: string): Room {
  return { id: roomId, players: {}, choices: {} };
}

export {
  generateId,
  collectionContainsKey,
  countPlayers,
  countChoices,
  createRoomId,
  createPlayerId,
  newRoom,
};
