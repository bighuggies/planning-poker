import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Start } from '../Start/Start'
import { Name } from '../Name/Name'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Start path="/" />
          <Name path="/name" />
        </Router>
      </main>
    )
  }
}

export default App
