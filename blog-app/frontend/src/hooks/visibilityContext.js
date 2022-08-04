import React, { useState, useContext } from 'react'
import Toggable from '../components/Shared/Toggable/Toggable'

const ToggleVisibilityContext = React.createContext()
const VisibilityContext = React.createContext()

export function useToggleVisibility() {
  return useContext(ToggleVisibilityContext)
}

export function useVisibility() {
  return useContext(VisibilityContext)
}

export function ToggleVisibilityProvider({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <ToggleVisibilityContext.Provider value={toggleVisibility}>
      <VisibilityContext.Provider value={visible}>
        <Toggable buttonLabel={buttonLabel}>
          {children}
        </Toggable>
      </VisibilityContext.Provider>
    </ToggleVisibilityContext.Provider>
  )
}