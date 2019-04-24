import { navigate } from '@reach/router';
import React from 'react';

import * as actions from '../state/actions';
import { useAppState } from '../state/useAppState';
import { Choices, Player, State } from '../types';

import { client } from './socket';

const actionEmitter = {
  createRoom() {
    client.emit('CREATE_ROOM');
  },

  joinRoom(roomId: number, playerName: string) {
    client.emit('JOIN_ROOM', { roomId, playerName });
  },

  playCard(cardId: string) {
    client.emit('PLAY_CARD', { cardId });
  },

  startSession() {
    client.emit('START_SESSION');
  },

  newRound() {
    client.emit('NEW_ROUND');
  },
};

export const ApiContext = React.createContext(actionEmitter);

export const ApiProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useAppState();

  React.useEffect(() => {
    client.on('SESSION_STARTED', () => {
      // todo: this is a bit gross
      navigate(`/room/${state.roomId}/poker`);
    });

    client.on('ROOM_CREATED', ({ roomId }: { roomId: number }) => {
      dispatch(actions.roomCreated(roomId));
    });

    client.on('ROOM_JOINED', ({ player }: { player: Player }) => {
      dispatch(actions.roomJoined(player));
    });

    client.on('UPDATE_STATE', (newState: Partial<State>) => {
      dispatch(actions.updateState(newState));
    });

    client.on('UPDATE_PLAYERS', ({ players }: { players: Player[] }) => {
      dispatch(actions.updatePlayers(players));
    });

    client.on('UPDATE_CHOICES', ({ choices }: { choices: Choices }) => {
      dispatch(actions.updateChoices(choices));
    });

    client.on(
      'START_ROUND',
      ({ choices, hasChosen }: { choices: Choices; hasChosen: boolean }) => {
        dispatch(actions.startRound(choices, hasChosen));
      },
    );

    return () => {
      client.removeAllListeners();
    };
  }, [dispatch, state.roomId]);

  return (
    <ApiContext.Provider value={actionEmitter}>{children}</ApiContext.Provider>
  );
};
