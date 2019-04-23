import React, { memo } from 'react';

import { useApi } from '../../../api/useApi';
import { cards } from '../constants';

export const Cards: React.FunctionComponent = memo(() => {
  const api = useApi();

  return (
    <ul>
      {cards.fibonacci.map(number => (
        <li key={number}>
          <button onClick={() => api.playCard(number)}>{number}</button>
        </li>
      ))}

      {Object.entries(cards.misc).map(([key, copy]) => (
        <li key={key}>
          <button onClick={() => api.playCard(key)}>{copy}</button>
        </li>
      ))}
    </ul>
  );
});
