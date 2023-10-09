import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({name: '', user: {}})
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const storedInUser = localStorage.getItem('loggedInUser')
  const parsedUser = JSON.parse(storedInUser) || {}

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser({name: '', user: {}})
    navigate('/')
  }

  useEffect(() => {
    if (parsedUser.user) {
      setLoggedInUser({ ...parsedUser })
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{logout, loggedInUser, setLoggedInUser, isLoading}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }