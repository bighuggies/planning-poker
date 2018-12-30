import React, { memo } from 'react'
import { types } from '../../types'
import { State } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

export const Start = memo(() => {
  const changeHandler = (dispatch) => (event) => {
    const value = event.target.value
    dispatch({ type: types.UPDATE_ROOM_ID_FIELD, payload: value })
  }

  return (
    <State>
      { ({ fields, dispatch }) => {
        const roomIdValue = fields ? fields.roomId : ''
        return (
          <div>
            <input
              type="text"
              onChange={changeHandler(dispatch)}
              value={roomIdValue} />
            <Actions>
              { ({ createRoom }) => <button onClick={createRoom}>Host</button> }
            </Actions>
          </div>
        )
      } }
    </State>
  )
})
