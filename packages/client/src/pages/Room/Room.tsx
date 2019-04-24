import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';

import { useApi } from '../../api/useApi';
import { useAppState } from '../../state/useAppState';

const isDisabled = (roomId?: number) =>
  roomId != null && roomId.toString().length !== 3;

export const Room: React.FunctionComponent<RouteComponentProps> = ({
  navigate,
}) => {
  const [state] = useAppState();
  const api = useApi();
  const isCreatingRoom = React.useRef(false);
  const [roomId, setRoomId] = React.useState<number | undefined>();

  if (state.fields.playerName == null) {
    return <Redirect noThrow={true} to="/name" />;
  }

  if (isCreatingRoom.current && state.roomId && navigate) {
    isCreatingRoom.current = false;

    navigate(`/room/${state.roomId}`);

    return <>Navigating...</>;
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const roomIdInput = parseInt(event.currentTarget.value, 10);

    if (roomIdInput) {
      setRoomId(roomIdInput);
    }
  };

  const handleSubmit: React.ReactEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    navigate && navigate(`/room/${roomId}`);
  };

  const createRoom = () => {
    isCreatingRoom.current = true;

    api.createRoom();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Session Pin</label>
        <input type="text" onChange={handleChange} value={roomId || ''} />

        <button disabled={isDisabled(roomId)}>Join session</button>
      </form>

      <p>
        If you don’t have a session, you can host one for you and your team.
      </p>

      <button onClick={createRoom}>Host session</button>
    </>
  );
};
