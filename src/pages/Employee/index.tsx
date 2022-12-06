import { Avatar, Button, Card, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../../context/userContext'
import { employeeProvider } from '../../provider/employee-provider'

const EmployeeStyled = styled.div`
  .card1 {
    /* .ant-card-body { */
    display: flex;
    justify-content: space-between;
    /* } */
  }
  .handle {
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
    color: grey;
  }
  .isActive {
    color: rgb(22,119,255);
  }
`

interface DataType {
  id: string
  mobile: string
  username: string
  password: string
  timeOfEntry: string
  formOfEmployment: number
  workNumber: string
  correctionTime: string
  departmentName: string
  staffPhoto: string
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'key',
    title: '序号'
  },
  {
    dataIndex: 'staffPhoto',
    title: '头像',
    render: value => {
      return <Avatar src={value} />
    }
  },
  {
    dataIndex: 'username',
    title: '姓名'
  },
  {
    key: 'mobile',
    dataIndex: 'mobile',
    title: '手机号'
  },
  {
    dataIndex: 'workNumber',
    title: '工号'
  },
  {
    dataIndex: 'formOfEmployment',
    title: '聘用形式'
  },
  {
    dataIndex: 'departmentName',
    title: '部门'
  },
  {
    dataIndex: 'timeOfEntry',
    title: '入职时间'
  },
  {
    title: '操作',
    render: () => {
      return (
        <>
          <span className='handle isActive'>查看</span>
          <span className='handle'>转正</span>
          <span className='handle'>调岗</span>
          <span className='handle'>离职</span>
          <span className='handle'>角色</span>
          <span className='handle'>删除</span>
        </>
      )
    }
  }
]

const data = [
  {
    id: '604f764971f93f3ac8f365c2',
    mobile: '13800000002',
    username: '管理员',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    timeOfEntry: '2018-11-02',
    formOfEmployment: 1,
    workNumber: '9002',
    correctionTime: '2018-11-30',
    departmentName: '总裁办',
    staffPhoto: 'http://q6cu3t6jv.bkt.clouddn.com/1063705989926227968?t=1616204161907'
  },
  {
    id: '604f764971f93f3ac8f365c3',
    mobile: '13800000003',
    username: '孙财',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    timeOfEntry: '2018-11-04',
    formOfEmployment: 1,
    workNumber: '111',
    correctionTime: '2018-11-20',
    departmentName: '市场部',
    staffPhoto: 'http://q6cu3t6jv.bkt.clouddn.com/1063705989926227968?t=1616204161907'
  },
  {
    id: '604f764971f93f3ac8f365c4',
    mobile: '13800000004',
    username: '罗晓晓',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    timeOfEntry: '2018-12-02',
    formOfEmployment: 1,
    workNumber: '1111',
    correctionTime: '2018-12-31',
    departmentName: '人事部',
    staffPhoto: 'http://q6cu3t6jv.bkt.clouddn.com/1063705989926227968?t=1616204161907'
  },
  {
    id: '604f764971f93f3ac8f365c5',
    mobile: '13400000001',
    username: '文吉星',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    timeOfEntry: '2018-01-01',
    formOfEmployment: 1,
    workNumber: '1001',
    correctionTime: '1970-01-01',
    departmentName: '人事部',
    staffPhoto: ''
  },
  {
    id: '604f764971f93f3ac8f365c6',
    mobile: '13400000002',
    username: '巴思慧',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    timeOfEntry: '2018-01-01',
    formOfEmployment: 1,
    workNumber: '1002',
    correctionTime: '1970-01-01',
    departmentName: '人事部',
    staffPhoto: ''
  }
]

export const Employee: React.FC = () => {
  const [list, setList] = useState<any>(null)
  const [pageConfig, setPageConfig] = useState({
    total: 0,
    current: 1,
    pageSize: 5,
  })
  const userInfo = useContext(UserContext)
  useEffect(() => {
    employeeProvider.getUserList({page: pageConfig.current, size: pageConfig.pageSize}).then(res => {
      setList(res.rows)
      setPageConfig((last) => ({...last,total: res.total}))
    })
  }, [pageConfig.current, pageConfig.pageSize])
  const hPageChange = (page: number, pageSize: number) => {
    console.log("page", page)
    console.log('pageSize', pageSize)
    setPageConfig((last) => ({...last, current: page, pageSize}))
  }
  return (
    <EmployeeStyled>
      <Card>
        <div className='card1'>
          <Tag>xxx</Tag>
          {
            <Button type={`${userInfo.userInfo.baseInfo.roles.points.includes('aa1') ? 'primary' : 'default'}`}>新增员工</Button>
          }
          
        </div>
      </Card>
      <Card>
        <Table bordered columns={columns} dataSource={list && list.map((v: any, i: number) => ({ ...v, key: i + 1 }))} pagination={{showSizeChanger: true, defaultPageSize: 5, pageSizeOptions: [5, 10, 20, 30], size:"small",total: pageConfig.total, showTotal: (total) => `Total ${total} items`, onChange: hPageChange}}/>
      </Card>
    </EmployeeStyled>
  )
}
