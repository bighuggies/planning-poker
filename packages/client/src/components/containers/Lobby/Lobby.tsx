import React, { memo } from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { Player } from "../../../interfaces";
import { withState, WithStateProps } from "../../utils/WithState/WithState";
import { Actions } from "../../utils/WithActions/WithActions";

const Lobby: React.FunctionComponent<WithStateProps & RouteComponentProps> = ({
  player,
  players
}) => {
  if (!player || !player.id) return <Redirect noThrow to="/" />;

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
