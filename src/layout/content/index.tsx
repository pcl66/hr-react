import { ContentStyled } from './style'
import { Route } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { Departments } from '../../pages/Departments'
import { Employee } from '../../pages/Employee'
import { Settings } from '../../pages/Settings'
import { Permission } from '../../pages/Permissions'
export const Content = () => {
  return (
    <ContentStyled>
      <Route path={'/home'} component={HomePage}></Route>
      <Route path={'/departments'} component={Departments}></Route>
      <Route path={'/employees'} component={Employee}></Route>
      <Route path={'/settings'} component={Settings}></Route>
      <Route path={'/permission'} component={Permission}></Route>
    </ContentStyled>
  )
}