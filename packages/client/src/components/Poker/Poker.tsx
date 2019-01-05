import React, { memo, Fragment } from 'react'
import { Redirect } from '@reach/router'
import { compose, partial, prop, getPlayerIdsFromChoices, filterIds } from '../../helpers'
import { cards } from '../../constants'
import { Player, Choices } from '../../interfaces'
import { withState } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

interface Props {
  player: Player
  players: Player[]
  hasChosen: boolean
  isWaiting: boolean
  choices: Choices
}

export const Poker = compose(
  memo,
  withState,
)((props: Props) => {
  if (!props.player || !props.player.id) return <Redirect noThrow to="/" />

  const { fibonacci, misc } = cards

  return (
    <section>
      { !props.hasChosen && !props.isWaiting && (
        <Actions>
          { ({ playCard }: any): any => (
            <ul>
              { fibonacci.map((number) => (
                <li key={number} onClick={partial(playCard, number)}>
                  {number}
                </li>
              )) }

              { Object.entries(misc).map(([ key, copy ]) => (
                <li key={key}>
                  <button onClick={partial(playCard, key)}>
                    {copy}
                  </button>
                </li>
              )) }
            </ul>
          ) }
        </Actions>
      ) }

      { props.hasChosen && props.isWaiting && (
        <div>
          <p>Waiting on the following people to choose a card.</p>

          <ul>
            { compose(
                partial(filterIds, prop(props.players, 'id')),
                getPlayerIdsFromChoices,
            )(props.choices).map((playerId: string) => {
              const { playerName } = props.players.find((player) => player.id === playerId)!

              return <span key={playerId}>{playerName}</span>
            }) }
          </ul>
        </div>
      ) }

      { props.hasChosen && !props.isWaiting && (
        Object.keys(props.choices).length === 1 ? (
          <div>Alignment!</div>
        ) : (
          <Fragment>
            <h2>Choices</h2>
            <ul>
              {Object.keys(props.choices).map((cardId) => (
                <li key={cardId}>
                  <span>{cardId}</span>
                  
                  <div>
                    { props.choices[cardId].map((playerId) => {
                      const { playerName } = props.players.find((player) => player.id === playerId)!

                      return <span key={playerId}>{ playerName }</span>
                    }) }
                  </div>
                </li>
              ))}
            </ul>
          </Fragment>
        )
      ) }
    </section>
  )
})
