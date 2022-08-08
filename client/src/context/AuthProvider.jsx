import {createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {/* Components that will be nested inside the AuthProvider */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext