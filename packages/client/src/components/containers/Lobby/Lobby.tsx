import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { compose } from '../../../helpers'
import { Player } from '../../../interfaces'
import { withState } from '../../utils/WithState/WithState'
import { Actions } from '../../utils/WithActions/WithActions'

interface Props {
  player: Player
  players: Player[]
}

export const Lobby = compose(
  memo,
  withState,
)(
  ({ player, players }: Props): React.ReactElement<Props> => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        {player.host && <Actions>
            {({ startSession }: any): any => (
              <button onClick={startSession}>Start session</button>
            )}
          </Actions>}

        <ul>
          {players.map((player: Player) => (
            <li key={player.id}>{player.playerName}</li>
          ))}
        </ul>
      </section>
    )
  },
)