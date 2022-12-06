import React, { useState } from "react"

const defaultUserInfo = {
  userInfo: {
    isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),
    token: localStorage.getItem('token') || '',
    baseInfo: JSON.parse((localStorage.getItem('baseInfo')) || '{}')
  },
  setUserInfo: () => {}
}

export const UserContext = React.createContext(defaultUserInfo)

export const UserContextProvider: React.FC<{children: React.ReactElement}> = (p) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo.userInfo)
  //@ts-ignore
  return <UserContext.Provider value={{userInfo, setUserInfo}}>{p.children}</UserContext.Provider>
}