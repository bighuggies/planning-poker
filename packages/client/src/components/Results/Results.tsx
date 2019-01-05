import React, { memo, Fragment } from 'react'
import { Player, Choices } from '../../interfaces'
import {
  compose,
  partial,
  prop,
  filterIds,
  getPlayerIdsFromChoices,
} from '../../helpers'
import { Actions } from '../WithActions/WithActions'

interface Props {
  player: Player
  players: Player[]
  choices: Choices
}

export const Results = memo(({ player, players, choices }: Props) => {
  const cardIds = Object.keys(choices)

  return (
    <div>
      {cardIds.length === 1 ? (
        <Fragment>
          <h2>The team has reached align-tenment! 🥳</h2>
          <span>{cardIds.reduce((value, cardId) => cardId)}</span>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Choices</h2>
          <ul>
            {cardIds.map((cardId) => (
              <li key={cardId}>
                <span>{cardId}</span>

                <div>
                  {choices[cardId].map((playerId) => {
                    const { playerName } = players.find(
                      (player) => player.id === playerId,
                    )!

                    return <span key={playerId}>{playerName}</span>
                  })}
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      )}

      { player.host && (
        <Actions>
          {({ newRound }: any) => <button onClick={newRound}>New round</button>}
        </Actions>
      ) }
    </div>
  )
})
