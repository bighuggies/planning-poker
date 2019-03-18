import React, { memo } from "react";

import { filterIds, getPlayerIdsFromChoices, prop } from "../../../helpers";
import { Choices, Player } from "../../../interfaces";

interface Props {
  players: Player[];
  choices: Choices;
}

export const Waiting: React.FunctionComponent<Props> = memo(
  ({ players, choices }) => (
    <div>
      <p>Waiting on the following people to choose a card.</p>

      <ul>
        {filterIds(prop(players, "id"), getPlayerIdsFromChoices(choices)).map(
          (playerId: string) => {
            const { playerName } = players.find(
              player => player.id === playerId
            )!;

            return <span key={playerId}>{playerName}</span>;
          }
        )}
      </ul>
    </div>
  )
);
