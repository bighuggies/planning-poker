import React, { memo } from 'react'

import './styles.css'

const submitHandler = (onSubmit = () => {}) => (event) => {
  event.preventDefault()
  onSubmit(event)
}

export const Form = memo(({ onSubmit, name, legend, fields }) => {
  return (
    <form className="form" name={name} onSubmit={submitHandler(onSubmit)}>
      <fieldset className="form__fieldset">
        { legend && (
          <legend className="form__legend">{legend}</legend>
        ) }

        <ul className="form__fields">
          { fields.map((field, index) => (
            <li className="form__field" key={index}>{field}</li>
          )) }
        </ul>
      </fieldset>
    </form>
  )
})