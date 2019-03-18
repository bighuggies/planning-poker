import { navigate } from "@reach/router";
import React, { createContext, PureComponent } from "react";

import * as actions from "../../../actions";
import { Choices, Player } from "../../../interfaces";
import { client } from "../../../socket";
import { types } from "../../../types";
import { AppState, StateContext } from "../WithState/WithState";

const actionEmitter = {
  createRoom() {
    client.emit(types.CREATE_ROOM);
  },

  joinRoom(roomId: number, playerName: string) {
    client.emit(types.JOIN_ROOM, { roomId, playerName });
  },

  playCard(cardId: number) {
    client.emit(types.PLAY_CARD, { cardId });
  },

  startSession() {
    client.emit(types.START_SESSION);
  },

  newRound() {
    client.emit(types.NEW_ROUND);
  }
};
const { Provider, Consumer } = createContext(actionEmitter);

export class ActionsProvider extends PureComponent {
  static contextType = StateContext;

  componentDidMount() {
    client.on(types.SESSION_STARTED, () => {
      navigate("/poker");
    });

    client.on(types.ROOM_CREATED, ({ roomId }: { roomId: number }) => {
      this.context.dispatch(actions.roomCreated(roomId));
    });

    client.on(types.ROOM_JOINED, ({ player }: { player: Player }) => {
      this.context.dispatch(actions.roomJoined(player));
    });

    client.on(types.UPDATE_STATE, (newState: Partial<AppState>) => {
      this.context.dispatch(actions.updateState(newState));
    });

    client.on(types.UPDATE_PLAYERS, ({ players }: { players: Player[] }) => {
      this.context.dispatch(actions.updatePlayers(players));
    });

    client.on(types.UPDATE_CHOICES, ({ choices }: { choices: Choices[] }) => {
      this.context.dispatch(actions.updateChoices(choices));
    });

    client.on(
      types.START_ROUND,
      ({ choices, hasChosen }: { choices: Choices[]; hasChosen: boolean }) => {
        this.context.dispatch(actions.startRound(choices, hasChosen));
      }
    );
  }

  render() {
    return <Provider value={actionEmitter}>{this.props.children}</Provider>;
  }
}

export const Actions = Consumer;
