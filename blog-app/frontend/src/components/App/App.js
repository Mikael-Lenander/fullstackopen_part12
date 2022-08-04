import React from 'react'
import { UserProvider } from '../../hooks/userContext'
import { NotificationProvider } from '../../hooks/notificationContext'
import Dashboard from '../Dashboard/Dashboard'
import LoginForm from '../Login/LoginForm'

const App = () => {

  return (
    <UserProvider>
      <NotificationProvider>
        <LoginForm />
        <Dashboard />
      </NotificationProvider>
    </UserProvider>
  )
}

export default App