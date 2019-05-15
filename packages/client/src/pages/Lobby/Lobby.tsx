import { RouteComponentProps } from '@reach/router';
import React from 'react';

import { useApi } from '../../api/useApi';
import { RequireRoom } from '../../components/RequireRoom/RequireRoom';
import { useAppState } from '../../state/useAppState';
import { Player } from '../../types';

export const Lobby: React.FunctionComponent<
  RouteComponentProps<{ roomId: string }>
> = props => {
  const [state] = useAppState();
  const api = useApi();

  return (
    <RequireRoom roomId={props.roomId}>
      <section>
        {state.player && state.player.host && (
          <button onClick={api.startSession}>Start session</button>
        )}

        <ul>
          {state.players.map((player: Player) => (
            <li key={player.id}>{player.playerName}</li>
          ))}
        </ul>
      </section>
    </RequireRoom>
  );
};
