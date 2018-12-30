import React from 'react'
import { render } from 'react-dom'
import App from './components/App/App'
import { WithState } from './components/WithState/WithState'

render((
  <WithState>
    <App />
  </WithState>
), document.getElementById('root'))
