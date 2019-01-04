import React, { memo, ButtonHTMLAttributes } from 'react'
import { Redirect } from '@reach/router'
import { compose } from '../../helpers'
import { Player } from '../../interfaces'
import { withState } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

interface Props {
  player: Player
  players: Player[]
}

export const Lobby = compose(
  memo,
  withState,
)(
  ({ player, players }: Props): React.ReactElement<Props> => {
    if (!player || !player.id) return <Redirect noThrow to="/start" />

    return (
      <section>
        {player.host && <Actions>
            {({ startSession }: any): any => (
              <button onClick={startSession}>Start session</button>
            )}
          </Actions>}

        <ul>
          {players.map((player: Player) => (
            <div key={player.id}>{player.playerName}</div>
          ))}
        </ul>
      </section>
    )
  },
)
