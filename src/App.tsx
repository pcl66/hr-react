import { useContext, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AdaptBody } from './components/adapt-body'
import { AdaptBox } from './components/adapt-box'
import { AdaptBoxFun } from './components/adapt-box-fun'
import { AuthRoute } from './components/AuthRoute'
import { UserContext } from './context/userContext'
import Layout from './layout'
import { Departments } from './pages/Departments'
import { Login } from './pages/Login'

const isLogin = true

function App() {
  const userInfo = useContext(UserContext)
  return (
    <AdaptBoxFun equalProportion={true}>
      {/* {userInfo.userInfo.isLogin ? (
        <>
          <Route path={'/login'} component={Login}></Route>
          <Redirect path='/' to='/home' />
          <Route path={'/'} component={Layout}></Route>
        </>
      ) : (
        <Login />
      )} */}
      <AuthRoute path='/'><Layout/></AuthRoute>
      <Route path='/login' component={Login}/>
    </AdaptBoxFun>
    // <Departments />
  )
}

export default App
