import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { RequireRoom } from '../../components/RequireRoom/RequireRoom';
import { useAppState } from '../../state/useAppState';

import { Cards } from './components/Cards';
import { Results } from './components/Results';
import { Waiting } from './components/Waiting';

export const Poker: React.FunctionComponent<
  RouteComponentProps<{ roomId: string }>
> = props => {
  const [state] = useAppState();
  const { player, players, choices, hasChosen, isWaiting } = state;

  return (
    <RequireRoom roomId={props.roomId}>
      <section>
        {(() => {
          if (!hasChosen && !isWaiting) return <Cards />;
          if (hasChosen && isWaiting) {
            return <Waiting players={players} choices={choices} />;
          }
          if (hasChosen && !isWaiting && player) {
            return (
              <Results player={player} players={players} choices={choices} />
            );
          }

          return null;
        })()}
      </section>
    </RequireRoom>
  );
};
