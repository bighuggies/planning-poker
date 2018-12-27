import React, { memo } from 'react'
import { State } from '../WithState/WithState'

export const Start = memo(() => {
  return (
    <State>
      { ({ createRoom }) => <button onClick={createRoom}>Host</button> }
    </State>
  )
})
