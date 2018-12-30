import React, { createContext, PureComponent } from 'react'
import { client } from '../../socket'
import { types } from '../../types'
import { roomCreated, roomJoined } from '../../action-creators'
import { StateContext } from '../WithState/WithState'

const { Provider, Consumer } = createContext({})

export class WithActions extends PureComponent {
  static contextType = StateContext

  createRoom() {
    client.emit(types.CREATE_ROOM)
  }

  joinRoom(roomId, playerName) {
    client.emit(types.JOIN_ROOM, { roomId, playerName })
  }

  componentDidMount() {
    client.on(types.ROOM_CREATED, ({ roomId }) => {
      this.context.dispatch(roomCreated(roomId))
    })

    client.on(types.ROOM_JOINED, ({ player }) => {
      this.context.dispatch(roomJoined(player))
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
