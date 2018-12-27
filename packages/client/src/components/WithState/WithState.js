import React, {
  createContext, cloneElement, PureComponent, Children,
} from 'react'
import { client } from '../../socket'

const { Provider, Consumer } = createContext({})

export class StateProvider extends PureComponent {
  state = {
    roomId: 0,
    players: [],
    field: '',
    update: this.update.bind(this),
    createRoom: this.createRoom,
  }

  update({ target: { value }}) {
    this.setState({ field: value })
  }

  createRoom() {
    client.emit('CREATE_ROOM')
  }

  componentDidMount() {
    client.on('ROOM_CREATED', ({ roomId }) => {
      this.setState({ roomId })
    })
  }

  render() {
    return (
      <Provider value={this.state}>
        { Children.map(this.props.children, (child) => {
          return cloneElement(child, this.props)
        }) }
      </Provider>
    )
  }
}

export const State = Consumer
