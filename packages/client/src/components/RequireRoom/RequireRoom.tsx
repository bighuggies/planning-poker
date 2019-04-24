import { Redirect } from '@reach/router';
import React from 'react';

import { useApi } from '../../api/useApi';
import { roomCreated } from '../../state/actions';
import { useAppState } from '../../state/useAppState';

type Props = {
  roomIdParam: string | undefined;
};

export const RequireRoom: React.FunctionComponent<Props> = ({
  children,
  roomIdParam,
}) => {
  const [state, dispatch] = useAppState();
  const api = useApi();

  // this ref keeps track of if we're waiting for the new player
  // to come back on the socket.
  // todo: remove this hack workaround
  const isJoiningRoom = React.useRef(false);

  if (!state.fields.playerName) {
    return <Redirect noThrow={true} to="/name" />;
  }

  const roomId = roomIdParam != null ? parseInt(roomIdParam, 10) : undefined;

  if (!roomId || Number.isNaN(roomId)) {
    return <Redirect noThrow={true} to="/room" />;
  }

  if (!state.roomId || state.roomId !== roomId) {
    dispatch(roomCreated(roomId));

    return <>Creating room...</>;
  }

  if (!state.player || state.player.playerName !== state.fields.playerName) {
    if (!isJoiningRoom.current) {
      api.joinRoom(state.roomId, state.fields.playerName);

      isJoiningRoom.current = true;
    }

    return <>Joining room...</>;
  }

  isJoiningRoom.current = false;

  return <>{children}</>;
};
