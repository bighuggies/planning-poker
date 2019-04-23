import { navigate } from '@reach/router';
import React, { createContext, PureComponent } from 'react';

import { client } from '../../../socket';
import * as actions from '../../../state/actions';
import { StateContext } from '../../../state/StateContext';
import { Choices, Player, State } from '../../../types';

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
const { Provider, Consumer } = createContext(actionEmitter);

export class ActionsProvider extends PureComponent {
  static contextType = StateContext;

  componentDidMount() {
    const [, dispatch] = this.context as React.ContextType<typeof StateContext>;

    client.on('SESSION_STARTED', () => {
      navigate('/poker');
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
  }

  render() {
    return <Provider value={actionEmitter}>{this.props.children}</Provider>;
  }
}

export const Actions = Consumer;
