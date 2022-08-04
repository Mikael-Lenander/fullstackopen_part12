import React, { useState } from 'react'
import { useSetUser, useUser } from '../../hooks/userContext'
import { useAddNotification } from '../../hooks/notificationContext'
import Notification from '../Shared/Notification/Notification'
import authService from '../../services/auth'

export default function LoginForm() {

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const user = useUser()
  const setUser = useSetUser()
  const addNotification = useAddNotification()

  function setCredential(event, credential) {
    setCredentials({ ...credentials, [credential]: event.target.value })
  }

  async function login(event) {
    event.preventDefault()
    try {
      const user = await authService.login(credentials)
      setUser(user)
      addNotification('Login successful', 'green')
    } catch (error) {
      addNotification(error.response.data.error, 'red')
    }
  }

  return (
    <>
      {user == null &&
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <form onSubmit={login}>
            <div>
              <label htmlFor='username'>username</label>
              <input type='text' id='username' value={credentials.username} onChange={e => setCredential(e, 'username')}></input>
            </div>
            <div>
              <label htmlFor='password'>password</label>
              <input type='password' id='password' value={credentials.password} onChange={e => setCredential(e, 'password')}></input>
            </div>
            <button type='submit' id='login-button'>Login</button>
          </form>
        </div>
      }
    </>
  )
}
