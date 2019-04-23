import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';

import { useAppState } from '../../../state/useAppState';
import { Player } from '../../../types';
import { Actions } from '../../utils/WithActions/WithActions';

export const Lobby: React.FunctionComponent<RouteComponentProps> = () => {
  const [{ player, players }] = useAppState();

  if (!player || !player.id) return <Redirect noThrow={true} to="/" />;

  return (
    <section>
      {player.host && (
        <Actions>
          {({ startSession }) => (
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
