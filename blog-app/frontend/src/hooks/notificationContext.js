import React, { useContext, useState } from 'react'

const NotificationContext = React.createContext()
const AddNotificationContext = React.createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export function useAddNotification() {
  return useContext(AddNotificationContext)
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  function addNotification(text, color) {
    setNotification({ text, color })
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  return (
    <NotificationContext.Provider value={notification}>
      <AddNotificationContext.Provider value={addNotification}>
        {children}
      </AddNotificationContext.Provider>
    </NotificationContext.Provider>
  )

}