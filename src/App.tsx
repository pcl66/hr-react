import { useContext, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AdaptBody } from './components/adapt-body'
import { AdaptBox } from './components/adapt-box'
import { AdaptBoxFun } from './components/adapt-box-fun'
import { AuthRoute } from './components/AuthRoute'
import { UserContext } from './context/userContext'
import Layout from './layout'
import { Departments } from './pages/Departments'
import { List } from './pages/list'
import { Login } from './pages/Login'

const isLogin = true

function App() {
  const userInfo = useContext(UserContext)
  return (
    <>
      {/* {userInfo.userInfo.isLogin ? (
        <>
          <Route path={'/login'} component={Login}></Route>
          <Redirect path='/' to='/home' />
          <Route path={'/'} component={Layout}></Route>
        </>
      ) : (
        <Login />
      )} */}
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/list' component={List}/>
        <AuthRoute path='/'><Layout/></AuthRoute>

      </Switch>
    </>
    // <Departments />
  )
}

export default App
