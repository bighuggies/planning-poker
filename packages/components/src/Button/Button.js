import React, { memo } from 'react'
import { classnames } from '../../helpers'

import './styles.css'

export const Button = memo(({ onClick, text, disabled, stretch }) => {
  const buttonClasses = classnames('button', {
    stretch,
  })

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>{text}</button>
  )
})