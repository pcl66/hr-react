import { Menu } from 'antd'
import React, { Dispatch, useContext, useState } from 'react'
import { SideBarStyled } from './style'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, BarsOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { UserContext } from '../../context/userContext'
import { NavLink } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

interface P {
  setExpand: Dispatch<React.SetStateAction<boolean>>
}

// const router = {
//   'departments': '组织架构',
//   'employees': '员工管理',
//   'settings': '公司设置',
//   'permission': '权限管理',
//   'approvals': '审批'
// }

const router = [
  {
    path: '/departments',
    name: '组织架构',
    meta: {
      name: 'departments',
      icon: <AppstoreOutlined />
    }
  },
  {
    path: '/employees',
    name: '员工管理',
    meta: {
      name: 'employees',
      icon: <ContainerOutlined />
    }
  },
  {
    path: '/settings',
    name: '公司设置',
    meta: {
      name: 'settings',
      icon: <DesktopOutlined />
    }
  },
  {
    path: '/permission',
    name: '权限管理',
    meta: {
      name: 'permissions',
      icon: <MenuFoldOutlined />
    }
  }
]

const constRouter = [
  {
    path: '/home',
    name: '首页',
    meta: {
      name: 'home',
      icon: <MenuUnfoldOutlined />
    }
  },
]

export const SideBar = (p: P) => {
  const userInfo = useContext(UserContext)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const { setExpand } = p
  // const items: MenuItem[] = userInfo.userInfo.baseInfo?.roles.menus.map((v: string, i: number) => getItem(v, i))

  const items: MenuItem[] = router.filter(v => userInfo.userInfo.baseInfo?.roles?.menus?.includes(v.meta.name)).map((it: any, i:number) => getItem(<NavLink to={it.path} >{it.name}</NavLink>, it.meta.name, it.meta.icon))
  const items1: MenuItem[] = constRouter.map(it => getItem(<NavLink to={it.path}>{it.name}</NavLink>, it.meta.name, it.meta.icon))

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }
  return (
    <SideBarStyled>
      {userInfo.userInfo.baseInfo && <Menu style={{ height: '100%' }} defaultSelectedKeys={['home']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' items={[...items1,...items]} inlineCollapsed={isCollapsed} />}
      <div className='expand'>
        <BarsOutlined
          className='outlined'
          onClick={() => {
            setIsCollapsed(last => {
              setExpand(!last)
              return !last
            })
          }}
        />
      </div>
    </SideBarStyled>
  )
}
