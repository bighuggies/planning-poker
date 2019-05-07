import Joi from 'joi';
import { createStore } from 'redux';
import Server from 'socket.io';

import { actions } from './actions';
import {
  countChoices,
  countPlayers,
  createPlayerId,
  createRoomId,
} from './helpers';
import { reducers } from './reducers';
import * as types from './types';
import { joinRoomEventSchema, playCardEventSchema } from './validators';

const store = createStore(reducers);
const io = Server(8000, { origins: '*:3000' });

type PlanningPokerSocket = Server.Socket & {
  actions: ReturnType<typeof actions>;
  roomId: number;
  playerId: number;
};

io.on('connect', (socket: PlanningPokerSocket) => {
  socket.on(types.CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState());
    const roomId = createRoomId(roomIds.map(i => parseInt(i, 10)));

    socket.join(roomId.toString());
    socket.roomId = roomId;
    socket.actions = actions(roomId);
    store.dispatch(socket.actions.createRoom());
    socket.emit(types.ROOM_CREATED, { roomId });
  });

  socket.on(types.JOIN_ROOM, args => {
    const { error, value } = Joi.validate<{
      roomId: number;
      playerName: string;
    }>(args, joinRoomEventSchema);

    if (error) {
      socket.emit('BAD_REQUEST', error);
      return;
    }

    const { roomId, playerName } = value;

    const room = store.getState()[roomId];
    const players = room && room.players;
    const playerIds = Object.keys(players || {});

    socket.join(roomId.toString());
    socket.roomId = roomId;
    socket.actions = actions(roomId);
    socket.playerId = createPlayerId(playerIds.map(i => parseInt(i, 10)));
    store.dispatch(socket.actions.joinRoom(socket.playerId, playerName));

    const updatedPlayers = store.getState()[roomId]!.players;

    io.to(roomId.toString()).emit(types.UPDATE_PLAYERS, {
      players: Object.values(updatedPlayers),
    });
    socket.emit(types.ROOM_JOINED, {
      player: updatedPlayers[socket.playerId],
    });
  });

  socket.on(types.START_SESSION, () => {
    io.to(socket.roomId.toString()).emit(types.SESSION_STARTED);
  });

  socket.on(types.PLAY_CARD, args => {
    const { error, value } = Joi.validate<{
      cardId: string;
    }>(args, playCardEventSchema);

    if (error) {
      socket.emit('BAD_REQUEST', error);
      return;
    }

    const { cardId } = value;

    store.dispatch(socket.actions.playCard(socket.playerId, cardId));
    socket.emit(types.UPDATE_STATE, { hasChosen: true, isWaiting: true });

    const { players, choices } = store.getState()[socket.roomId]!;

    io.to(socket.roomId.toString()).emit(types.UPDATE_CHOICES, { choices });

    if (countPlayers(players) === countChoices(choices)) {
      io.to(socket.roomId.toString()).emit(types.UPDATE_STATE, {
        isWaiting: false,
      });
    }
  });

  socket.on(types.NEW_ROUND, () => {
    store.dispatch(socket.actions.newRound());

    const room = store.getState()[socket.roomId];
    const choices = room && room.choices;

    io.to(socket.roomId.toString()).emit(types.START_ROUND, {
      choices,
      hasChosen: false,
    });
  });

  socket.on('disconnect', () => {
    if (socket.roomId) {
      store.dispatch(socket.actions.playerDisconnect(socket.playerId));

      const room = store.getState()[socket.roomId];

      if (room) {
        io.to(socket.roomId.toString()).emit(types.UPDATE_PLAYERS, {
          players: Object.values(room.players),
        });
      }
    }
  });
});

console.log('Server running on 8000');
