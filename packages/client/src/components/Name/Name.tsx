import React, { memo } from 'react'
import { Redirect } from '@reach/router'
import { compose, partial } from '../../helpers'
import { updateField } from '../../action-creators'
import { withState } from '../WithState/WithState'
import { Actions } from '../WithActions/WithActions'

interface FieldProps {
  playerName: string
}

interface Props {
  roomId: number,
  fields: FieldProps,
  dispatch: Function,
}

interface Target {
  value: string,
}

interface Event {
  target: Target,
}

const isDisabled = (playerName: string) => playerName.length <= 2

export const Name = compose(
  memo,
  withState,
)((props: Props) => {
  if (props.roomId === 0) return <Redirect noThrow to="/" />

  const changeHandler = (dispatch: Function) => (event: Event) => {
    const value = event.target.value
    props.dispatch(updateField('playerName', value))
  }

  return (
    <section>
      <div>
        <span>Your pin!</span>
        <span>{props.roomId}</span>
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend>Let other’s know who you are.</legend>

          <label>
            <span>Your name</span>
            <input
              type="text"
              onChange={changeHandler(props.dispatch)}
              value={props.fields.playerName} />
          </label>

          <Actions>
            { ({ joinRoom }: any) => (
              <button
                onClick={partial(
                  joinRoom, props.roomId, props.fields.playerName,
                )}
                disabled={isDisabled(props.fields.playerName)}>
                Let’s go!
              </button>
            ) }
          </Actions>
        </fieldset>
      </form>
    </section>
  )
})
