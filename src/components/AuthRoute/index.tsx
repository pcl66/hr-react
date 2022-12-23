import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import Layout from '../../layout'

type P = {
  component: any
  path: string
}

export const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const userInfo = useContext(UserContext)
  return (
    // <Route
    //   {...rest}
    //   render={() => {
    //     if (userInfo?.userInfo?.isLogin) {
    //       console.log('已经登录')
    //       return children
    //       // return <Redirect to={'/login'}/>
    //     } else {
    //       console.log('else')
    //       return <Redirect to={'/login'} />
    //     }
    //   }}></Route>
    <Route {...rest} render={() => (userInfo?.userInfo?.isLogin ? children as JSX.Element : <Redirect to={'login'} />)} />
  )
}

// export function AuthRoute({ children, ...rest }: RouteProps) {
//   const userInfo = useContext(UserContext)
//   return <Route {...rest} render={({location}) => (userInfo?.userInfo?.isLogin ? children : <Redirect to={'login'} />)} />
// }
