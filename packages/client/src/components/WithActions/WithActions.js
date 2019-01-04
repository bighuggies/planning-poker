import React, { createContext, PureComponent } from 'react'
import { navigate } from '@reach/router'
import { client } from '../../socket'
import { types } from '../../types'
import { roomCreated, roomJoined, updatePlayers } from '../../action-creators'
import { StateContext } from '../WithState/WithState'

const { Provider, Consumer } = createContext({})

export class ActionsProvider extends PureComponent {
  static contextType = StateContext

  createRoom() {
    client.emit(types.CREATE_ROOM)
  }

  joinRoom(roomId, playerName) {
    client.emit(types.JOIN_ROOM, { roomId, playerName })
  }

  startSession() {
    client.emit(types.START_SESSION)
  }

  componentDidMount() {
    client.on(types.ROOM_CREATED, ({ roomId }) => {
      this.context.dispatch(roomCreated(roomId))
    })

    client.on(types.ROOM_JOINED, ({ player }) => {
      this.context.dispatch(roomJoined(player))
    })

    client.on(types.UPDATE_STATE, ({ players }) => {
      this.context.dispatch(updatePlayers(players))
    })

    client.on(types.SESSION_STARTED, () => {
      navigate('/poker')
    })
  }

  render() {
    return (
      <Provider value={{
        createRoom: this.createRoom,
        joinRoom: this.joinRoom,
        startSession: this.startSession,
      }}>
        { this.props.children }
      </Provider>
    )
  }
}

export const Actions = Consumer
