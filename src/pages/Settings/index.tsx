import { Button, Card, Form, Input, Table, Tabs, Tag } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import styled from 'styled-components'

const SettingsStyled = styled.div``

interface DataType {
  id: string
  name: string
  description: string
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'id',
    title: '序号'
  },
  {
    dataIndex: 'name',
    title: '角色名称'
  },
  {
    dataIndex: 'description',
    title: '描述'
  },
  {
    dataIndex: 'handle',
    title: '操作',
    render: () => {
      return (
        <>
          <Tag>分配权限</Tag>
          <Tag>编辑</Tag>
          <Tag>删除</Tag>
        </>
      )
    }
  }
]

const data = [
  {
    id: '1',
    name: '系统管理员',
    description: '管理整合平台，可以操作企业所有功能'
  },
  {
    id: '2',
    name: '系统管理员',
    description: '管理整合平台，可以操作企业所有功能'
  }
]
export const Settings: React.FC = () => {
  const [form] = useForm()
  useEffect(() => {
    form.setFieldsValue({
      name: '江苏',
      address: '武汉',
      email: '1500371773@qq.com',
      remark: 'xxxx'
    })
  }, [])
  const renderTable = () => {
    return (
      <>
        <Button>添加角色</Button>
        <Table columns={columns} dataSource={data}></Table>
      </>
    )
  }

  const renderForm = () => {
    return (
    <>
      <Form labelCol={{span: 2}} wrapperCol={{span: 5}} form={form}>
        <Form.Item label='公司名称' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='公司地址' name='address'>
          <Input/>
        </Form.Item>
        <Form.Item label='邮箱' name='email'>
          <Input/>
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <TextArea />
        </Form.Item>
      </Form>
    </>
    )
  }
  return (
    <SettingsStyled>
      <Card>
        <Tabs
          defaultActiveKey='1'
          // onChange={onChange}
          items={[
            {
              label: `角色管理`,
              key: '1',
              children: renderTable()
            },
            {
              label: `公司信息`,
              key: '2',
              children: renderForm()
            }
          ]}
        />
      </Card>
    </SettingsStyled>
  )
}
