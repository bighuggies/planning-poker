import React, { memo } from 'react'

import './styles.css'

export const Layout = memo(({ body, footer }) => {
  return (
    <div className="layout">
      <div className="layout__body">
        {body}
      </div>
      { footer && (
        <div className="layout__footer">{footer}</div>
      ) }
    </div>
  )
})