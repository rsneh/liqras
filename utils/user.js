import React from 'react';

let userState

const User = React.createContext({ user: null, loading: false })

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState
  }

  const res = await fetch('/api/me')
  userState = res.ok && res.status === 200 ? await res.json() : null
  return userState
};

export const UserProvider = ({ value, children }) => {
  const { user } = value

  React.useEffect(() => {
    if (!userState && user) {
      userState = user
    }
  }, [])

  return <User.Provider value={value}>{children}</User.Provider>
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  })

  React.useEffect(() => {
    if (userState !== undefined) {
      return
    }

    let isMounted = true;
    fetchUser().then(user => isMounted && setUser({ user, loading: false }))

    return () => {
      isMounted = false
    }
  }, [userState])

  return data
}