import { navigate } from '@reach/router';
import React, { createContext, PureComponent } from 'react';

import * as actions from '../../../actions';
import { Choices, Player } from '../../../interfaces';
import { client } from '../../../socket';
import { AppState, StateContext } from '../WithState/WithState';

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
    client.on('SESSION_STARTED', () => {
      navigate('/poker');
    });

    client.on('ROOM_CREATED', ({ roomId }: { roomId: number }) => {
      this.context.dispatch(actions.roomCreated(roomId));
    });

    client.on('ROOM_JOINED', ({ player }: { player: Player }) => {
      this.context.dispatch(actions.roomJoined(player));
    });

    client.on('UPDATE_STATE', (newState: Partial<AppState>) => {
      this.context.dispatch(actions.updateState(newState));
    });

    client.on('UPDATE_PLAYERS', ({ players }: { players: Player[] }) => {
      this.context.dispatch(actions.updatePlayers(players));
    });

    client.on('UPDATE_CHOICES', ({ choices }: { choices: Choices[] }) => {
      this.context.dispatch(actions.updateChoices(choices));
    });

    client.on(
      'START_ROUND',
      ({ choices, hasChosen }: { choices: Choices[]; hasChosen: boolean }) => {
        this.context.dispatch(actions.startRound(choices, hasChosen));
      },
    );
  }

  render() {
    return <Provider value={actionEmitter}>{this.props.children}</Provider>;
  }
}

export const Actions = Consumer;
