import React, { memo } from 'react';

import { cards } from '../../../constants';
import { Actions } from '../../utils/WithActions/WithActions';

export const Cards: React.FunctionComponent = memo(() => (
  <Actions>
    {({ playCard }) => (
      <ul>
        {cards.fibonacci.map(number => (
          <li key={number}>
            <button onClick={() => playCard(number)}>{number}</button>
          </li>
        ))}

        {Object.entries(cards.misc).map(([key, copy]) => (
          <li key={key}>
            <button onClick={() => playCard(key)}>{copy}</button>
          </li>
        ))}
      </ul>
    )}
  </Actions>
));
