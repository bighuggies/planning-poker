import React, { createContext, PureComponent } from 'react'
import { reducers } from '../../reducers'

export const StateContext = createContext()

export class StateProvider extends PureComponent {
  state = {
    roomId: 0,
    player: {},
    players: [],
    fields: {
      roomId: '',
      playerName: '',
    },
    dispatch: this.dispatch.bind(this),
  }

  dispatch(action) {
    this.setState((state) => {
      const { dispatch, ...stateValues } = this.state
      return reducers(stateValues, action)
    })
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        { this.props.children }
      </StateContext.Provider>
    )
  }
}

export const State = StateContext.Consumer

export const withState = (WrappedComponent) => (props) => (
  <State>
    { (state) => <WrappedComponent {...props} {...state} /> }
  </State>
)
