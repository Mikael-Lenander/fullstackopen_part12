import React, { useContext } from 'react'
import useLocalStorage from './useLocalStorage'

const UserContext = React.createContext()
const SetUserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useSetUser() {
  return useContext(SetUserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null)

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  )
}