import React, { memo } from 'react'

import './styles.css'

export const Section = memo(({ children }) => {
  return (
    <section className="section">
      {children}
    </section>
  )
})