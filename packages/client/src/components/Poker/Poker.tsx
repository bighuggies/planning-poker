import React from 'react'
import { Redirect } from '@reach/router'
import { Player, Choices } from '../../interfaces'
import { withState } from '../WithState/WithState'
import { Cards } from '../Cards/Cards'
import { Waiting } from '../Waiting/Waiting'
import { Results } from '../Results/Results'

interface Props {
  player: Player
  players: Player[]
  hasChosen: boolean
  isWaiting: boolean
  choices: Choices
}

export const Poker = withState(
  ({ player, players, choices, hasChosen, isWaiting }: Props) => {
    if (!player || !player.id) return <Redirect noThrow to="/" />

    return (
      <section>
        {(() => {
          if (!hasChosen && !isWaiting) return <Cards />
          if (hasChosen && isWaiting)
            return <Waiting players={players} choices={choices} />
          if (hasChosen && !isWaiting)
            return (
              <Results player={player} players={players} choices={choices} />
            )
        })()}
      </section>
    )
  },
)
