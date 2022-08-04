import React from 'react'
import { useVisibility, useToggleVisibility } from '../../../hooks/visibilityContext'
import PropTypes from 'prop-types'

export default function Toggable({ buttonLabel, children }) {

  const visible = useVisibility()
  const toggleVisibility = useToggleVisibility()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id='toggle-visibility-button'>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}