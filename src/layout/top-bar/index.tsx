import React from 'react'
import { TopBarStyled } from './style'
import { UpOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useHistory } from 'react-router-dom';


export default function TopBar() {
  const history = useHistory()
  const hLogout = () => {
    localStorage.removeItem('token')
    localStorage.setItem('isLogin', JSON.stringify(false))
    // history.push('/login')
    setTimeout(() => {
      window.location.reload()
    })
  }
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">首页</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">项目地址</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={hLogout}>退出登录</div>,
      key: '3',
    },
  ];
  return (
    <TopBarStyled>
      <div className='company-name'><span>江苏博古博古有限公司</span></div>
      <Dropdown menu={{items}} trigger={['click']}>

        <div className='user'>
          <div className='img'><img src="http://img0.bdstatic.com/img/image/wise/7%E5%8F%A4%E8%A3%85%E7%BE%8E%E5%A5%B3.jpg" alt="" /></div>
          <div className='name'>管理员</div>
          <UpOutlined/>
        </div>
      </Dropdown> 
    </TopBarStyled>
  )
}
