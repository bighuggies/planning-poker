import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';

import { useAppState } from '../../../state/useAppState';
import { Cards } from '../Cards/Cards';
import { Results } from '../Results/Results';
import { Waiting } from '../Waiting/Waiting';

export const Poker: React.FunctionComponent<RouteComponentProps> = () => {
  const [state] = useAppState();
  const { player, players, choices, hasChosen, isWaiting } = state;

  if (!player || !player.id) return <Redirect noThrow={true} to="/" />;

  return (
    <section>
      {(() => {
        if (!hasChosen && !isWaiting) return <Cards />;
        if (hasChosen && isWaiting) {
          return <Waiting players={players} choices={choices} />;
        }
        if (hasChosen && !isWaiting) {
          return (
            <Results player={player} players={players} choices={choices} />
          );
        }

        return null;
      })()}
    </section>
  );
};
