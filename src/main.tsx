import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'
import { BrowserRouter, Router } from 'react-router-dom'
import { customHistory } from './server/history'
import { UserContextProvider } from './context/userContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Router history={customHistory}> */}
      <UserContextProvider>
        <App />
      </UserContextProvider>
    {/* </Router> */}
  </BrowserRouter>
  // </React.StrictMode>
)
