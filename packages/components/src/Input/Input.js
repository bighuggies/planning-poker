import React, { memo } from 'react'

import './styles.css'

export const Input = memo(({ label, placeholder, onChange, value}) => {
  return (
    <label className="input">
      { label && (
        <span className="input__label">{label}</span>
      ) }

      <input className="input__input" type="text" placeholder={placeholder} onChange={onChange} value={value} />
    </label>
  )
})