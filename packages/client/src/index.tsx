import React from 'react'
import { render } from 'react-dom'
import App from './components/App/App'
import { StateProvider } from './components/WithState/WithState'
import { ActionsProvider } from './components/WithActions/WithActions'

render((
  <StateProvider>
    <ActionsProvider>
      <App />
    </ActionsProvider>
  </StateProvider>
), document.getElementById('root'))
