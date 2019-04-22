import React, { memo } from 'react';

import { Choices, Player } from '../../../interfaces';

interface Props {
  players: Player[];
  choices: Choices;
}

export const Waiting: React.FunctionComponent<Props> = memo(
  ({ players, choices }) => {
    const playersIdsWhoHaveChosen = Object.values(choices).flat();
    const playersWhoHaveNotChosen = players.filter(
      player => !playersIdsWhoHaveChosen.includes(player.id),
    );

    return (
      <div>
        <p>Waiting on the following people to choose a card.</p>

        <ul>
          {playersWhoHaveNotChosen.map(player => (
            <li key={player.id}>{player.playerName}</li>
          ))}
        </ul>
      </div>
    );
  },
);
