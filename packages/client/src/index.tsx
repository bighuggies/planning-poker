import React from 'react';
import { render } from 'react-dom';

import { ApiProvider } from './api/ApiContext';
import App from './components/containers/App/App';
import { StateProvider } from './state/StateContext';

render(
  <StateProvider>
    <ApiProvider>
      <App />
    </ApiProvider>
  </StateProvider>,
  document.getElementById('root'),
);
