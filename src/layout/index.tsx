import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Content } from './content'
import {SideBar} from './side-bar'
import { LayoutStyled } from './style'
import TopBar from './top-bar'

export default function Layout():JSX.Element {
  const history = useHistory()
  console.log('history', history)
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <LayoutStyled>
      <div className={expand ? 'side-bar off' : 'side-bar'}>
        <SideBar setExpand={setExpand}/>
      </div>
      <div className='main'>
        <div className='top-bar'>
          <TopBar />
        </div>
        <div className='content'>
          <Content />
        </div>
      </div>
    </LayoutStyled>
  )
}
