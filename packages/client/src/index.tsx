import React from 'react'
import { render } from 'react-dom'
import App from './components/App/App'
import { WithState } from './components/WithState/WithState'
import { WithActions } from './components/WithActions/WithActions'

render((
  <WithState>
    <WithActions>
      <App />
    </WithActions>
  </WithState>
), document.getElementById('root'))
