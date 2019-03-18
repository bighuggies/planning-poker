import { Redirect, RouteComponentProps } from "@reach/router";
import React, { memo } from "react";

import { Player } from "../../../interfaces";
import { Actions } from "../../utils/WithActions/WithActions";
import { withState, WithStateProps } from "../../utils/WithState/WithState";

const Lobby: React.FunctionComponent<WithStateProps & RouteComponentProps> = ({
  player,
  players
}) => {
  if (!player || !player.id) return <Redirect noThrow={true} to="/" />;

  return (
    <section>
      {player.host && (
        <Actions>
          {({ startSession }: any): any => (
            <button onClick={startSession}>Start session</button>
          )}
        </Actions>
      )}

      <ul>
        {players.map((player: Player) => (
          <li key={player.id}>{player.playerName}</li>
        ))}
      </ul>
    </section>
  );
};

const ContainedLobby = withState(memo(Lobby));

export { ContainedLobby as Lobby };
