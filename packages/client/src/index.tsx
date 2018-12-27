import React, { createContext } from 'react'
import { render } from 'react-dom'
import App from './components/App/App'
import { StateProvider } from './components/WithState/WithState'

render((
  <StateProvider>
    <App />
  </StateProvider>
), document.getElementById('root'))
