import { createStore } from 'redux';
import * as Server from 'socket.io';

import { actions } from './actions';
import {
  countChoices,
  countPlayers,
  createPlayerId,
  createRoomId,
} from './helpers';
import { reducers } from './reducers';
import * as types from './types';

const store = createStore(reducers);
const io = Server(8000, { origins: '*:3000' });

io.on('connect', (socket: Server.Socket & { [key: string]: any }) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState());
    const roomId = createRoomId(roomIds);

    socket.join(roomId);
    socket.roomId = roomId;
    socket.actions = actions(roomId);
    store.dispatch(socket.actions.createRoom());
    socket.emit(types.ROOM_CREATED, { roomId });
  });

  socket.on(types.JOIN_ROOM, ({ roomId, playerName }) => {
    const players = store.getState()[roomId].players;
    const playerIds = Object.keys(players || {});

    socket.join(roomId);
    socket.roomId = roomId;
    socket.actions = actions(roomId);
    socket.playerId = createPlayerId(playerIds);
    store.dispatch(socket.actions.joinRoom(socket.playerId, playerName));

    const updatedPlayers = store.getState()[roomId].players;

    io.to(roomId).emit(types.UPDATE_PLAYERS, {
      players: Object.values(updatedPlayers),
    });
    socket.emit(types.ROOM_JOINED, { player: updatedPlayers[socket.playerId] });
  });

  socket.on(types.START_SESSION, () => {
    io.to(socket.roomId).emit(types.SESSION_STARTED);
  });

  socket.on(types.PLAY_CARD, ({ cardId }) => {
    store.dispatch(socket.actions.playCard(socket.playerId, cardId));
    socket.emit(types.UPDATE_STATE, { hasChosen: true, isWaiting: true });

    const { players, choices } = store.getState()[socket.roomId];

    io.to(socket.roomId).emit(types.UPDATE_CHOICES, { choices });

    if (countPlayers(players) === countChoices(choices)) {
      io.to(socket.roomId).emit(types.UPDATE_STATE, { isWaiting: false });
    }
  });

  socket.on(types.NEW_ROUND, () => {
    store.dispatch(socket.actions.newRound());

    const choices = store.getState()[socket.roomId].choices;

    io.to(socket.roomId).emit(types.START_ROUND, {
      choices,
      hasChosen: false,
    });
  });

  socket.on('disconnect', () => {
    if (socket.roomId) store.dispatch(socket.actions.removeRoom());
  });
});

console.log('Server running on 8000');
