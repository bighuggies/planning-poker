import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';

import { useApi } from '../../../api/useApi';
import { useAppState } from '../../../state/useAppState';
import { Player } from '../../../types';

export const Lobby: React.FunctionComponent<RouteComponentProps> = () => {
  const [{ player, players }] = useAppState();
  const api = useApi();

  if (!player || !player.id) return <Redirect noThrow={true} to="/" />;

  return (
    <section>
      {player.host && <button onClick={api.startSession}>Start session</button>}

      <ul>
        {players.map((player: Player) => (
          <li key={player.id}>{player.playerName}</li>
        ))}
      </ul>
    </section>
  );
};
