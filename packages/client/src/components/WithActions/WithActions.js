import React, { createContext, PureComponent } from 'react'
import { client } from '../../socket'
import { types } from '../../types'
import { StateContext } from '../WithState/WithState'

const { Provider, Consumer } = createContext({})

export class WithActions extends PureComponent {
  static contextType = StateContext

  createRoom() {
    client.emit(types.CREATE_ROOM)
  }

  componentDidMount() {
    client.on(types.ROOM_CREATED, ({ roomId }) => {
      this.context.dispatch({ type: types.ROOM_CREATED, payload: roomId })
    })
  }

  render() {
    return (
      <Provider value={{ createRoom: this.createRoom }}>
        { this.props.children }
      </Provider>
    )
  }
}

export const Actions = Consumer
