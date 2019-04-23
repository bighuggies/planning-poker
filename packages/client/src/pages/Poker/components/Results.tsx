import React, { memo } from 'react';

import { useApi } from '../../../api/useApi';
import { Choices, Player } from '../../../types';

interface Props {
  player: Player;
  players: Player[];
  choices: Choices;
}

export const Results: React.FunctionComponent<Props> = memo(
  ({ player, players, choices }) => {
    const api = useApi();
    const cardIds = Object.keys(choices);

    return (
      <div>
        {cardIds.length === 1 ? (
          <>
            <h2>
              The team has reached align-tenment!{' '}
              <span role="img" aria-label="">
                🥳
              </span>
            </h2>
            <span>{cardIds.reduce((_, cardId) => cardId)}</span>
          </>
        ) : (
          <>
            <h2>Choices</h2>
            <ul>
              {cardIds.map(cardId => (
                <li key={cardId}>
                  <span>{cardId}</span>

                  <div>
                    {choices[cardId].map(playerId => {
                      const { playerName } = players.find(
                        player => player.id === playerId,
                      )!;

                      return <span key={playerId}>{playerName}</span>;
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {player.host && <button onClick={api.newRound}>New round</button>}
      </div>
    );
  },
);
