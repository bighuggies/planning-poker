import { Router } from "@reach/router";
import React, { Component } from "react";

import { Lobby } from "../Lobby/Lobby";
import { Name } from "../Name/Name";
import { Poker } from "../Poker/Poker";
import { Start } from "../Start/Start";

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Start path="/" />
          <Name path="/name" />
          <Lobby path="/lobby" />
          <Poker path="/poker" />
        </Router>
      </main>
    );
  }
}

export default App;