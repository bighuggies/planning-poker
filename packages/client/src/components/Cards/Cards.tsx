import React, { memo } from 'react'
import { partial } from '../../helpers'
import { cards } from '../../constants'
import { Actions } from '../WithActions/WithActions'

export const Cards = memo(() => (
  <Actions>
    {({ playCard }: any): any => (
      <ul>
        {cards.fibonacci.map((number) => (
          <li key={number} onClick={partial(playCard, number)}>
            {number}
          </li>
        ))}

        {Object.entries(cards.misc).map(([key, copy]) => (
          <li key={key}>
            <button onClick={partial(playCard, key)}>{copy}</button>
          </li>
        ))}
      </ul>
    )}
  </Actions>
))
