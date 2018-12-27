import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Start } from '../Start/Start'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Start path="/" />
        </Router>
      </main>
    )
  }
}

export default App
