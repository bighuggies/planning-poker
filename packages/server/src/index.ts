import Joi from 'joi';
import { createStore } from 'redux';
import Server from 'socket.io';

import {
  createRoom,
  joinRoom,
  newRound,
  playCard,
  playerDisconnect,
} from './actions';
import {
  countChoices,
  countPlayers,
  createPlayerId,
  createRoomId,
} from './helpers';
import { reducers } from './reducers';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  NEW_ROUND,
  PLAY_CARD,
  ROOM_CREATED,
  ROOM_JOINED,
  SESSION_STARTED,
  START_ROUND,
  START_SESSION,
  UPDATE_CHOICES,
  UPDATE_PLAYERS,
  UPDATE_STATE,
} from './types';
import { joinRoomEventSchema, playCardEventSchema } from './validators';

const store = createStore(reducers);
const io = Server(8000, { origins: '*:3000' });

io.on('connect', (socket: Server.Socket) => {
  let room: ReturnType<typeof socket.join> | undefined = undefined;
  let playerId: number | undefined = undefined;

  socket.on(CREATE_ROOM, () => {
    const roomIds = Object.keys(store.getState());
    const roomId = createRoomId(roomIds);

    room = socket.join(roomId.toString());
    store.dispatch(createRoom(roomId));
    socket.emit(ROOM_CREATED, { roomId });
  });

  socket.on(JOIN_ROOM, args => {
    const { error, value } = Joi.validate<{
      roomId: string;
      playerName: string;
    }>(args, joinRoomEventSchema);

    if (error) {
      socket.emit('BAD_REQUEST', error);
      return;
    }

    const { roomId, playerName } = value;

    const currentRoom = store.getState()[roomId];
    const players = currentRoom && currentRoom.players;
    const playerIds = Object.keys(players || {});

    room = socket.join(roomId.toString());
    playerId = createPlayerId(playerIds.map(i => parseInt(i, 10)));
    store.dispatch(joinRoom(roomId, playerId, playerName));

    const updatedPlayers = store.getState()[roomId]!.players;

    io.to(room.id).emit(UPDATE_PLAYERS, {
      players: Object.values(updatedPlayers),
    });
    socket.emit(ROOM_JOINED, {
      player: updatedPlayers[playerId],
    });
  });

  socket.on(START_SESSION, () => {
    if (room) {
      io.to(room.id).emit(SESSION_STARTED);
    }
  });

  socket.on(PLAY_CARD, args => {
    const { error, value } = Joi.validate<{
      cardId: string;
    }>(args, playCardEventSchema);

    if (error) {
      socket.emit('BAD_REQUEST', error);
      return;
    }

    if (!room) {
      socket.emit('BAD_REQUEST', new Error('ROOM_NOT_JOINED'));
      return;
    }

    if (!playerId) {
      socket.emit('BAD_REQUEST', new Error('PLAYER_NOT_CREATED'));
      return;
    }

    const currentRoom = store.getState()[room.id];

    if (currentRoom) {
      const { cardId } = value;

      store.dispatch(playCard(room.id, playerId, cardId));
      socket.emit(UPDATE_STATE, { hasChosen: true, isWaiting: true });

      const { players, choices } = currentRoom;

      io.to(room.id).emit(UPDATE_CHOICES, { choices });

      if (countPlayers(players) === countChoices(choices)) {
        io.to(room.id).emit(UPDATE_STATE, {
          isWaiting: false,
        });
      }
    }
  });

  socket.on(NEW_ROUND, () => {
    if (!room) {
      socket.emit('BAD_REQUEST', new Error('ROOM_NOT_JOINED'));
      return;
    }

    store.dispatch(newRound(room.id));

    const currentRoom = store.getState()[room.id];
    const choices = currentRoom && currentRoom.choices;

    io.to(room.id.toString()).emit(START_ROUND, {
      choices,
      hasChosen: false,
    });
  });

  socket.on('disconnect', () => {
    if (!room) {
      socket.emit('BAD_REQUEST', new Error('ROOM_NOT_JOINED'));
      return;
    }

    if (!playerId) {
      socket.emit('BAD_REQUEST', new Error('PLAYER_NOT_CREATED'));
      return;
    }

    store.dispatch(playerDisconnect(room.id, playerId));

    const currentRoom = store.getState()[room.id];

    if (currentRoom) {
      io.to(room.id).emit(UPDATE_PLAYERS, {
        players: Object.values(currentRoom.players),
      });
    }
  });
});

console.log('Server running on 8000');
