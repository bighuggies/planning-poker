import React, { memo, Fragment } from 'react'
import { Redirect } from '@reach/router'
import { compose } from '../../helpers'
import { updateField } from '../../action-creators'
import { withState } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

const isDisabled = (roomId) => roomId.length !== 3

export const Start = compose(
  memo,
  withState,
)((props) => {
  if (props.roomId !== 0) return <Redirect noThrow to="/name" />

  const changeHandler = (dispatch) => (event) => {
    const value = event.target.value
    dispatch(updateField(value))
  }

  return (
    <Fragment>
      <form>
        <fieldset>
          <legend>Join a planning poker session</legend>

          <label>
            <span>Session Pin</span>
            <input
              type="text"
              onChange={changeHandler(props.dispatch)}
              value={props.fields.roomId} />
          </label>

          <Actions>
            { ({ joinRoom }) => (
              <button
                onClick={joinRoom}
                disabled={isDisabled(props.fields.roomId)}>
                Join session
              </button>
            ) }
          </Actions>
        </fieldset>
      </form>

      <Fragment>
        <p>
          If you don’t have a session, you can host one for you and your team.
        </p>

        <Actions>
          { ({ createRoom }) => (
            <button onClick={createRoom}>
              Host session
            </button>
          ) }
        </Actions>
      </Fragment>
    </Fragment>
  )
})
